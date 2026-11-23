// Fontanería y decorados del episodio 46 (Leto II: el hijo de Paul que eligió convertirse en monstruo), con el canon del
// 43 (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris azulado), al nivel de
// episodios/ESTANDAR.md: el detalle de siempre. Reutiliza A el planeta de arena NUESTRO del 33 (du-comun.js: planeta),
// B la ciudadela de Arrakeen y el sietch del 44 (pa-comun.js: ciudadela, sietch) y F el estudio de las pausas del 43
// (hm-comun.js: estudio), y añade: C Jacurutu y el trance (jacurutu), D el imperio de Leto 3.500 años después (imperio),
// E el puente sobre el río (puente) y las piezas: Leto gusano en su carro (letoGusano), los tigres (tigres), las
// truchas de arena (truchas) y los objetos de las pausas (pausa).
// DERECHOS: NADA de las películas de Dune ni de ilustraciones de los libros (ni actores, ni vestuario, ni naves, ni
// arquitectura, ni el diseño de sus gusanos): todo es NUESTRO, a partir de lo que dice el libro. Leto gusano: diseño
// propio. Sin letras (solo números y símbolos). Personajes: ELENCO_LT y ELENCO_PA (pixel-chibi.js). LA VIOLENCIA NUNCA
// SE VE (los tigres acechan pero no atacan; la muerte del predicador, un destello entre la multitud; la de Alia, una luz
// que se apaga de lejos; el puente cae de lejos, con polvo; nada de armas en uso, cuerpos ni sangre).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. La barra del tiempo (x 20–170, y 0–14) se deja libre.
//
//   import * as T from '/atomo/plato/escenas/lt-comun.js';
//   const { E, R, M } = await T.preparar('lt-gancho');
//   T.rodar(E, R, [[0, (t) => T.puente(R, t, { encuadre: 'boda' })]], { año: 3521 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 46 (y el del 44, que reutiliza) por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores)
export { ELENCO_LT as LT, ELENCO_PA as PA } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';
import * as AT from '/atomo/plato/escenas/atom-personaje.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras, AT };
// A · el planeta de arena NUESTRO (del 33), B · la ciudadela de Arrakeen y el sietch (del 44) y F · el estudio de las
// pausas (del 43): se usan tal cual
export { planeta, planetaDelante } from '/atomo/plato/escenas/du-comun.js';
export { ciudadela, ciudadelaDelante, sietch, sietchDelante } from '/atomo/plato/escenas/pa-comun.js';
export { estudio, estudioDelante } from '/atomo/plato/escenas/hm-comun.js';

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el desierto: arena, sombra de duna, roca
    arena: '#d8a868', arenaS: '#a8784a', roca: '#6a4a3a', rocaS: '#3e2a24',
    // la ciudadela: piedra de arenisca pulida, bronce, sombra fresca, los estandartes verde y negro
    piedra: '#c8b088', piedraS: '#8a7458', bronce: '#b88a3a', bronceL: '#e8c060', estandarte: '#2a4a3a', estandarteN: '#1a1620',
    // Jacurutu (el sietch abandonado) y el trance: roca oscura, el azul de la especia y el oro del Sendero
    rocaJ: '#4a3a34', rocaJS: '#2a2024', sendero: '#f0c848', senderoL: '#fff0a8',
    // el imperio de Leto: el Arrakis verde (bosque, río, lluvia), la Ciudadela del dios (piedra rosada) y el Sareer
    bosque: '#2e5a3a', bosqueS: '#1e4028', rio: '#3a6a8a', rioL: '#8ab8d0', lluvia: '#a8b8c8', ciudadelaD: '#b8908a',
    // el puente: la piedra del puente, el río del atardecer y el carro del dios
    piedraP: '#a89a88', piedraPS: '#6a5e52', ocaso: '#e88a5a', oroCarro: '#d8a840',
    // el gusano: la piel de anillos gris plata y la cara humana
    gusano: '#8a8478', gusanoS: '#5a564e', gusanoL: '#b8b2a4', verdeAt: '#2e6a4a',
    // la especia: el azul de los ojos y el naranja del polvo
    especiaAzul: '#5a8ae8', especia: '#e88a3a',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep46');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo, como en el 44, en años desde la llegada a Arrakis: la duna (los gemelos, 21–22: nueve años
  // después de El Mesías) y el gusano (el dios emperador, 3.500 años después)
  Object.assign(R.ICONOS, {
    duna: ['.......', '.......', '...##..', '..####.', '.######', '#######', '#######'],
    gusano: ['..###..', '.#####.', '##.#.##', '#######', '.#####.', '..###..', '...#...'],
  });
  R.tramosTiempo([[20, 23, R.PALA.ORO, 'duna'], [3500, 3530, R.PALA.ROJO, 'gusano']]);
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


// ── C · Jacurutu y el trance ─────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'cueva' (por omisión): JACURUTU, UN SIETCH ABANDONADO, de noche, por dentro: una caverna de roca tallada a mano (marcas
//     de cincel en hileras, juntas, grietas con su filo de luz) y medio abandonada: bóveda baja con costillas y grietas;
//     a la IZQUIERDA una escalera tallada que sube a un paso oscuro (x 0–46) con dos peldaños hundidos y cascotes; AL
//     FONDO la BOCA de la cueva (x 54–106, y 52–128) con el desierto de noche, la luna, nubes que pasan, estrellas que
//     titilan, y un vigía fremen pequeño en silueta en el umbral; un haz de luna que entra y cruza el suelo con motas de
//     polvo; arena que se ha colado y forma una lengua desde el umbral; a la DERECHA tres NICHOS tallados (x 178–254,
//     y 62–92) con cántaros rotos, un cuenco y telarañas, una canaleta seca al pie de la pared, un paso lateral (x
//     270–302, y 58–138) tapado por TELAS VIEJAS ROTAS que se mecen en la corriente; un hilo de arena que cae de una
//     grieta del techo (x 134) y hace un montoncito; cántaros secos volcados y pedazos (x 238–264); el LECHO DE ROCA
//     (x 150–230: la cara de arriba en y 127–131, el frente hasta el suelo) con una manta vieja deshilachada y una piedra
//     de almohada a la izquierda; un braserillo (x 124, y 142) con dos fremen proscritos pequeños, embozados, sentados en
//     los peldaños, con los ojos azules que brillan; murciélagos que cruzan bajo la bóveda.
//     o.especia 0–1: una luz AZUL que crece desde el lecho y lo baña todo (motas azules que suben); con 1, la cueva
//     entera azul. Suelo y 150 (los pies), libre x 40–260. Devuelve .lecho { x0, x1, y } (y: donde apoya el cuerpo
//     tumbado, 131), .boca [x, y] (el umbral), .brasero [x, y].
//     Cámara 'boca': la boca de Jacurutu desde fuera, al atardecer: un risco enorme de roca negra en columnas con la
//     entrada tallada (x 78–116, y 96–150, dintel de piedra) y escalones que bajan dentro, los restos de una trampa de
//     viento (las aletas rotas, x 136–172, y 52–76), un muro caído de sillares (x 122–196, y 136–150) con bloques sueltos,
//     un poste con un trapo que ondea, el desierto con dunas y el sol que se pone tras ellas (x 246, y 108), un cielo
//     tramado con nubes de tres tonos a tres velocidades, halcones que planean, arena que vuela de las crestas y un
//     ratón canguro que cruza a saltos. Suelo y 150, libre x 30–250 (la entrada en x 78–116: se entra andando).
//   'trance': LA VISIÓN: un vacío azul de especia sin suelo (nebulosa tramada, estrellas en dos capas, galaxias), con
//     UN HAZ DE HILOS DE LUZ FINOS (≈ 70, más sus ramitas) que nacen juntos de un punto abajo en el centro (x 160, y 170:
//     el ojo de la especia, con ondas que se abren) y se abren en curva como un manojo de fibras hasta las puntas, cada
//     una con un PLANETA o una CIUDAD diminutos (los futuros); pulsos de luz corren por ellos. No es el laberinto del 44
//     (caminos dorados sobre arena con horizonte): aquí son hilos AZULES en el vacío, sin suelo, y el oro es uno solo.
//     o.apaga 0–1: se apagan de fuera adentro, con un parpadeo, se vuelven ceniza gris y su planeta se desmorona en
//     granos que caen; con 1 solo queda UNO. o.dorado 0–1: ese uno se vuelve DORADO y ENSANCHA (1 → 5 px) y sube en S
//     hasta una LUZ al fondo (x 210, y 34) que crece y echa rayos. Con o.apaga el vacío se oscurece. Un niño de pie en el
//     origen cabe (suelo 170). Devuelve { origen: [x, y], dorado: [[x, y]…] (el camino dorado, del origen a la luz),
//     luz: [x, y], encendidos, total, suelo: 170 }.
//     Cámara 'cerca': de cerca, el lecho de roca en la cueva bañada de azul (la cara de arriba en y 134–140, el frente
//     tallado con un friso hasta y 168, la piedra de almohada x 112–126), la pared con un nicho grande y cántaros, la
//     taza de la dosis volcada con su resto azul en el suelo (x 236, y 172); alrededor de la cabeza del niño tumbado
//     (o.cabeza [x, y], por omisión [130, 131]) los CAMINOS REFLEJADOS EN EL AIRE: decenas de arcos finos que giran y
//     se apagan con o.apaga, y el dorado que sube de su frente hacia arriba a la derecha con o.dorado. El niño lo pinta
//     la escena (T.c_jTumbado(R, LT.letoNinoLT, 118, 140, t)). Devuelve .lecho { x0: 108, x1: 238, y: 140 }, .cabeza.
// Llama a jacurutuDelante después de los actores (con las mismas o): en 'cueva', peñas caídas y arena en las esquinas de
// abajo y un cántaro roto (y las motas azules que suben con o.especia); en 'boca', una peña y matas secas al viento; en
// 'trance', motas de luz desenfocadas que pasan por delante; en 'cerca', un cascote y las motas.
export function jacurutu(R, t, o = {}) {
  const enc = o.encuadre ?? 'cueva', cam = o.camara ?? 'general';
  if (enc === 'trance') return cam === 'cerca' ? c_jCerca(R, t, o) : c_jTrance(R, t, o);
  return cam === 'boca' ? c_jBoca(R, t, o) : c_jCueva(R, t, o);
}
export function jacurutuDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'cueva', cam = o.camara ?? 'general';
  if (enc === 'trance') return c_jTranceDelante(R, t, o, cam === 'cerca');
  return cam === 'boca' ? c_jBocaDelante(R, t, o) : c_jCuevaDelante(R, t, o);
}
// ·· piezas comunes de C (prefijo c_j) ··
// ── D · El imperio de Leto, 3.500 años después ───────────────────────────────────────────────────────────────────────
// Arrakis ya no es un desierto: el planeta verde de Leto, con un orden muy estricto. Piedra rosada, estandartes con el
// símbolo del gusano en anillo (sin letras), las Habladoras de Pez como guardia.
// o.encuadre:
//   'verde' (por omisión): ARRAKIS VERDE, de día con lluvia fina: colinas cubiertas de bosque (tres términos), un RÍO
//     ancho que serpentea con reflejos y barquitas, una aldea ordenada de casas iguales en filas, campos en terrazas, la
//     lluvia en diagonal (tres capas; o.lluvia 0–1), un arcoíris tenue, y al fondo, en el horizonte, una franja ocre:
//     EL SAREER, el último desierto, con su muro (x 200–300, y 70–80). Suelo y 150, libre x 30–280; devuelve .gota
//     [66, 106]: el alero de la casa de la izquierda (tejado x 0–69, alero y 104) del que cae una gota grande cada 2 s
//     (engorda 1,44 s y cae 0,56 s hasta el suelo; .gotaFase 0–1, cae desde 0,72) para el gag de Atom; o.gota: false
//     no la pinta (para que la escena pinte la suya). Además: niebla en las laderas, una noria, dos barcas, humo, vecinos
//     con paraguas, una patrulla de Habladoras, pájaros, charcos con ondas y un mojón con el anillo del gusano (x 300).
//     imperioDelante pinta la lluvia gruesa de primer término y las salpicaduras (también con o.lluvia).
//     Cámara 'sareer': EL SAREER por dentro, al atardecer: el último pedazo de desierto, dunas anaranjadas (más pequeñas
//     que las del 33), el muro alto que lo rodea con bosque detrás, una torre de vigía de las Habladoras, el cielo de
//     ocaso; suelo y 150, libre x 30–280. Hecho: sol en (118, 76) sobre el muro (y 77–104), torre x 232–256 con
//     estandarte y una guardiana que hace la ronda, cuatro pendones con el anillo, dos peñascos, polvo en las crestas,
//     pájaros, un ratón canguro que cruza cada 9 s; devuelve .loma (crestas donde poner a Leto lejos, a escala pequeña).
//     imperioDelante: velos de arena a ras de suelo (y 156–180).
//   'ciudadela': LA CIUDADELA DEL DIOS EMPERADOR por dentro (d_ciudadela): una nave enorme de piedra rosada en
//     perspectiva (fuga en x 160, y 96): suelo de losas de mármol pulido con vetas, juntas y el reflejo de las columnas
//     y del rosetón; una ALFOMBRA verde con cenefa de oro y anillos del gusano que va del primer término al estrado;
//     paredes de sillares con zócalo y cornisa; columnas acanaladas (tres por lado) con capitel de bronce; en la pared
//     izquierda tres VENTANALES ojivales con su tracería por los que pasan nubes (tres tonos, a dos velocidades), copas de
//     árboles y pájaros, y de ellos bajan HACES DE LUZ con motas de polvo que flotan hasta el suelo; en la derecha, una
//     hornacina con un ánfora y una PUERTA lateral por la que a ratos pasa una Habladora; techo de casetones en penumbra;
//     al fondo, el ROSETÓN de vidriera (el anillo del gusano en oro, con destellos) entre dos ESTANDARTES verde y negro
//     que ondean, y debajo el ESTRADO de dos peldaños con la alfombra morada y la cenefa de anillos; dos braseros de
//     bronce con su fuego y su humo; DOS FILAS DE HABLADORAS DE PEZ (figuritas de 7–10 px, uniforme gris azulado y capa
//     morada, de perfil hacia la alfombra) firmes a los dos lados, que respiran y de vez en cuando giran la cabeza.
//     EL CARRO de Leto va en el estrado: devuelve .carro [160, 124] y .carroS 0.75 (la escala para T.letoGusano).
//     Suelo y 150, libre x 40–280. o.luz 0–1 (por omisión 1): la fuerza de los haces.
//     Cámara 'audiencia' (d_audiencia): lateral, más cerca: la pared de sillares de frente con su friso de dentículos; a la
//     izquierda un VENTANAL ojival (x 34–92, y 22–114) con el Arrakis verde (colinas con bosque, el río con brillos, la
//     aldea de casas iguales, nubes a dos velocidades y pájaros) y su haz de luz con motas que cae al suelo; un
//     ESTANDARTE que ondea (x 112–128); una COLUMNA acanalada (x 150–176) con una Habladora de guardia con su vara al
//     lado (x 140, de pie en y 131, ~14 px); a la derecha el ESTRADO de dos peldaños (x 180–320, plataforma en y 140) con
//     alfombra morada, y detrás un gran ANILLO DEL GUSANO de bronce en relieve (x 214–274, y 46–106) entre dos apliques con
//     llama. Suelo de losas en perspectiva con una alfombra verde que lleva al estrado (y 148–166). EL CARRO a la
//     derecha: devuelve .carro [248, 140] (escala 1, x ~193–303); el hueco para quien habla con él, x 40–150, suelo 150.
//   'diario': LA CÁMARA DEL DIARIO, de noche (d_diario): una sala pequeña excavada en roca bajo la Ciudadela (marcas de
//     cincel, grietas, bóveda oscura), con UNA SOLA LUZ cálida (un farol de bronce colgado de su cadena en x 172, y 30,
//     que titila y tiñe la roca), NICHOS enormes tallados en la roca con estantes de madera llenos de CRISTALES (que
//     destellan) y ROLLOS: o.diario 0–1 (por omisión 0.7) llena los estantes; un panal de rollos a la derecha (x 282–314,
//     y 52–132); LA MÁQUINA DE GRABAR (x 150–182, y 90–134): un armario de metal con un cristal que se graba en lo alto
//     (brilla al ritmo del dictado: o.dicta, por omisión true), filas de lucecitas y dos indicadores que parpadean; el
//     suelo de losas con una alfombra morada. EL CARRO de Leto a la izquierda: devuelve .carro [95, 145] (escala 1,
//     x 40–150). LA MESA y EL DIARIO GORDÍSIMO van en imperioDelante (por delante de quien esté detrás de la mesa):
//     mesa x 194–268 (tablero y 142, patas hasta y 156), libro x 204–256, y 120–142; devuelve .libro [230, 131] (el
//     centro del libro) y .mesa [194, 142, 268]. Libre x 160–280 (suelo 150; detrás de la mesa asoman cabeza y hombros).
//     Cámara 'ventana' (d_ventana): la misma sala de cara a su VENTANAL ojival tallado en la roca (x 70–200, y 14–118, con
//     jambas hondas iluminadas por la luna), y fuera el ARRAKIS VERDE DE NOCHE: cielo tramado con estrellas que titilan,
//     la luna con sus mares y su halo, nubes de tres tonos a dos velocidades, colinas de bosque en tres términos, el río
//     con el reflejo de la luna que tiembla, la aldea en filas con ventanitas que se encienden y apagan, una torre de vigía
//     con su luz y murciélagos. Dentro: estantes con cristales a la izquierda, la máquina de grabar en el rincón
//     izquierdo, un nicho de rollos sobre el carro, un aplique cálido a la derecha (x 296, y 74), el haz de luna en el
//     suelo. EL CARRO a la derecha, mirando a la ventana: devuelve .carro [246, 148] (escala 1, o.dir −1); libre x 30–170,
//     suelo 150.
//   'dispersion': EL FIN: desde lo alto, el bosque que se vuelve desierto (o.desierto 0–1: el verde se tiñe de arena
//     desde un punto, x 160, en ondas) con miles de puntitos de luz (las perlas de conciencia de las truchas) que se
//     dispersan por la arena; cielo de crepúsculo con estrellas. Hecho: la onda llega a los bordes con o.desierto ≈ 0,9;
//     el centro está en (160, 118); un mirador de roca con un pino abajo a la izquierda (suelo y 150, x 6–96; o.mirador:
//     false lo quita); luces de aldeas que se apagan al llegar la arena. imperioDelante: perlas grandes que suben (con
//     o.desierto ≥ 0,3). Cámara 'estrellas': el cielo nocturno sobre el planeta
//     (el limbo del planeta abajo, y 150) del que salen NAVES DIMINUTAS (o.naves 0–1) en todas direcciones dejando
//     estelas finas, cada vez más; constelaciones; suelo y 150 (el horizonte), libre x 30–280. Hecho: Vía Láctea,
//     nebulosa, luna (64, 44), estrella fugaz cada 5,5 s, luces de ciudades; el limbo baja a y 157 en los bordes
//     (devuelve .limbo(x)); hasta 70 naves con o.naves = 1; no pinta nada en la zona de Atom ni en la barra del año.
// Llama a imperioDelante después de los actores (la lluvia de primer término en 'verde'; en 'ciudadela', dos Habladoras
// de espaldas en las esquinas de abajo y motas de polvo de primer término; en 'audiencia', el canto de una columna en el
// borde izquierdo y un pebetero con su humo en x 20; en 'diario', la mesa con el diario (o.libro false: sin el libro, para
// que la escena lo pinte en manos de quien lo levanta, con T.d2_libro) y un cesto de rollos en la esquina izquierda; en
// 'ventana', un cesto de rollos y el canto de la estantería en la esquina izquierda).
export function imperio(R, t, o = {}) {
  const enc = o.encuadre ?? 'verde', cam = o.camara ?? 'general';
  if (enc === 'verde') return cam === 'sareer' ? d_sareer(R, t, o) : d_verde(R, t, o);
  if (enc === 'dispersion') return cam === 'estrellas' ? d_estrellas(R, t, o) : d_dispersion(R, t, o);
  // los encuadres del grupo D2 (ciudadela y diario), si ya están; si no, el relleno provisional
  /* global d_ciudadela, d_audiencia, d_diario, d_ventana */
  if (enc === 'ciudadela') { if (cam === 'audiencia' && typeof d_audiencia === 'function') return d_audiencia(R, t, o); if (typeof d_ciudadela === 'function') return d_ciudadela(R, t, o); }
  if (enc === 'diario') { if (cam === 'ventana' && typeof d_ventana === 'function') return d_ventana(R, t, o); if (typeof d_diario === 'function') return d_diario(R, t, o); }
  provisional(R, t, C.bosqueS, C.ciudadelaD); return { suelo: 150, libre: [30, 280] };
}
export function imperioDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'verde', cam = o.camara ?? 'general';
  if (enc === 'verde') return cam === 'sareer' ? d_sareerDelante(R, t, o) : d_verdeDelante(R, t, o);
  if (enc === 'dispersion') return cam === 'estrellas' ? {} : d_dispersionDelante(R, t, o);
  /* global d_ciudadelaDelante, d_audienciaDelante, d_diarioDelante, d_ventanaDelante */
  if (enc === 'ciudadela') { if (cam === 'audiencia' && typeof d_audienciaDelante === 'function') return d_audienciaDelante(R, t, o); if (typeof d_ciudadelaDelante === 'function') return d_ciudadelaDelante(R, t, o); }
  if (enc === 'diario') { if (cam === 'ventana' && typeof d_ventanaDelante === 'function') return d_ventanaDelante(R, t, o); if (typeof d_diarioDelante === 'function') return d_diarioDelante(R, t, o); }
  return {};
}
// ── E · El puente sobre el río ───────────────────────────────────────────────────────────────────────────────────────
// El puente de la boda (el día que cae Leto). Un puente romano altísimo de piedra (cinco arcos de medio punto, cuatro
// OJOS redondos en los tímpanos, tajamares, balaustrada con pilastras, cornisa con dentículos, juntas de sillería,
// musgo y humedad junto al agua) sobre una garganta verde con un río, al atardecer. Todo el fondo fijo va en búferes.
// o.encuadre:
//   'boda' (por omisión): EL PUENTE DE LADO Y DE LEJOS, AL ATARDECER. Cielo tramado violeta → naranja con cirros, el sol
//     bajo (x 190, y 60) medio hundido tras los montes, nubes de tres tonos a tres velocidades, pájaros; montes en dos
//     capas, la garganta de bosque (copas con el filo dorado del ocaso) que baja en V hasta el río lejano, que se ve por
//     el arco central; una cascada animada por el cuarto arco; dos acantilados con árboles en los estribos. El tablero:
//     pretil de atrás (albardilla y 82, balaustres con el cielo entre ellos), losas y 89–93, la BALAUSTRADA de delante
//     (albardilla y 94) con guirnaldas, cornisa hasta y 104. Astas con BANDEROLAS al viento y faroles que titilan en
//     x 18, 62, 106, 214, 258, 302 (y 58–82). GENTE ASOMADA (figuritas de 8 px de colores, alguna saluda) en el pretil de
//     atrás y unas cabezas en el de delante (x < 56 y x > 262); PÉTALOS que caen del tablero al río. LA PROCESIÓN
//     (figuritas de 10 px que andan: Habladoras de Pez con capa morada, abanderados con el estandarte verde y negro del
//     anillo de oro, músicos con tambor, damas de oro) con un hueco para EL CARRO; o.avance 0–1 la lleva de izquierda a
//     derecha: el carro va en x = 40 + 240·avance (0.5 → x 160, encima de la rotura); devuelve .carro [x, 96] (pies de
//     las ruedas, a T.letoGusano s 0.5; la balaustrada de puenteDelante le tapa 2 px de rueda). El río de abajo (y 160–180)
//     refleja el puente y el cielo, con ondas, el brillo del sol que titila y dos barcas lejos del centro (x 96, x 262).
//     Delante a la izquierda, UN MIRADOR DE ROCA con hierba (suelo y 166, x 6–50) para un chibi que mira.
//     o.roto 0–1: 0–0.2 grietas que corren y polvillo; desde 0.2 se abre EL HUECO en el centro (x ~145–177, de la
//     albardilla de atrás a la clave del arco central) y tres trozos de tablero caen girando por el arco hasta el agua,
//     con piedras sueltas, salpicaduras pequeñas y una NUBE DE POLVO de tres tonos que crece y se queda flotando con el
//     viento (con o.roto 1 sigue viva con t); la gente y la procesión cerca del hueco se apartan (nadie cae).
//     o.caida 0–1: 0–0.6 el carro cae (lo dibuja la escena en .cae [160, y], de y 96 a y 182: el agua de puenteDelante
//     se lo traga), 0.6–1 la SALPICADURA grande (columna de gotas, corona, espuma) y tres CÍRCULOS que se abren en el
//     agua con motas oscuras (truchas); con o.caida 1 los círculos siguen moviéndose con t.
//     Devuelve { suelo: 96, libre: [20, 300], carro, cae, agua: 160, rotura: [160, 94], mirador: [6, 50, 166], sol }.
//     Cámara 'tablero': SOBRE EL PUENTE, a ras del tablero, en perspectiva hacia el sol (fuga x 160, horizonte y 84):
//     losas con juntas y pétalos, una alfombra púrpura con orillas de oro por el centro, los dos pretiles con pilastras y
//     paneles que se van al fondo, astas con banderolas (z 2.4–6.8) y GUIRNALDAS de flores colgadas de lado a lado que se
//     mecen, al fondo la PUERTA de dos torres (x 136–184, y 50–94) con el sol posado en su dintel y la ciudad detrás con
//     ventanas que se encienden; fuera de los pretiles, la garganta en bruma. GENTE ASOMADA a los dos pretiles (de 12 a
//     4 px según la distancia, saludan), LA PROCESIÓN que sale de la puerta y viene de frente (o.avance 0–1: de z 9.4 a z
//     3.8; nunca pasa de 10 px), pétalos en el aire. Suelo y 150 (el tablero mide ahí x 36–284), libre x 40–280;
//     devuelve .carro [220, 150] (T.letoGusano s 1), .sol [160, 64], .puerta [160, 93].
//   'rio': EL RÍO DESDE LA ORILLA, después: la garganta entre dos paredes de bosque, el PUENTE al fondo (x 80–240, y 30–63,
//     a media escala) CON SU HUECO (o.roto false: entero), por cuyo arco central se ve el sol del ocaso (o.hora 'ocaso',
//     por omisión, o 'manana': cielo claro, el sol en x 210, y 34); el agua (y 63–146) ancha que refleja el puente, las
//     paredes y el cielo, con ondas que bajan hacia nosotros, el brillo del sol y peces que saltan; la orilla de delante
//     de arena y guijarros (y 146–180) con un tronco varado y matas. o.manchas 0–1: MANCHAS DE ARENA OSCURA (las truchas)
//     que salen del pie del hueco y se dispersan río abajo creciendo, cada una con puntitos de luz que titilan. Suelo y
//     152 (la orilla), libre x 30–280.
//     Cámara 'vacio': EL PUENTE ENTERO Y VACÍO al atardecer, desde la orilla y EN ESCORZO: entra grande por la izquierda
//     (albardilla y 22) y se aleja hacia el acantilado de la derecha (x 300, y 52), con los arcos que menguan, el intradós
//     en sombra y el sol bajo (x 232, y 60) entre sus arcos; el río tranquilo lo refleja; pájaros que vuelven a casa,
//     luciérnagas, una barca vacía amarrada a un poste (x 262–290) que se mece. La orilla de delante es un prado con una
//     playita de arena (y 146–162, x 96–224): suelo y 152, el sitio del niño x 100–220 (devuelve .nino [160, 152]).
// Llama a puenteDelante después de los actores: en 'boda', la balaustrada de delante (sin el hueco), las cabezas del
// pretil de delante, el agua que se traga el carro y la salpicadura; en 'tablero', pétalos grandes y dos guirnaldas que
// cuelgan por los bordes (x 0–16 y x 304–320); en 'rio' y 'vacio', juncos y espadañas que se mecen en las esquinas
// (x 0–36 y x 284–320) y libélulas.
export function puente(R, t, o = {}) {
  const enc = o.encuadre ?? 'boda', cam = o.camara ?? 'general';
  if (enc === 'rio') return cam === 'vacio' ? e_vacio(R, t, o) : e_rio(R, t, o);
  return cam === 'tablero' ? e_tablero(R, t, o) : e_boda(R, t, o);
}
export function puenteDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'boda', cam = o.camara ?? 'general';
  if (enc === 'rio') return e_juncos(R, t, cam === 'vacio' ? E_PAL.ocaso : E_PAL[o.hora === 'manana' ? 'manana' : 'ocaso']);
  return cam === 'tablero' ? e_tableroDelante(R, t, o) : e_bodaDelante(R, t, o);
}
// ── Piezas ─────────────────────────────────────────────────────────────────────────────────────────────────────────────
// LETO GUSANO EN SU CARRO (diseño NUESTRO, por el libro: «un gusano de arena de siete metros con cara y manos humanas»):
// asombro y pena, nunca miedo ni asco. Un cuerpo largo y grueso de 15 ANILLOS gris plata (cada anillo con su cresta
// clara, su pliegue oscuro, poros y granos de arena en los pliegues; luz de arriba a la izquierda y contorno oscuro)
// tumbado sobre cojines morados con borlas, en un CARRO bajo y ancho de madera lacada granate con remates y medallones
// de oro (el anillo del gusano, sin letras), tres ruedas de oro con radios, una proa curva de oro delante y un mástil
// con un banderín verde y negro detrás que ondea. La parte delantera se alza como un capuchón y en él va la CARA HUMANA
// pequeña y serena (rasgos finos, sin pelo, cejas tristes, párpados medio caídos y los ojos AZUL de especia con un
// brillo; parpadea cada ~4 s), metida en un rebajo de piel con su pliegue; DOS MANOS humanas pequeñas salen de dos
// bracitos grises anillados y se apoyan en la proa. El cuerpo respira (una ola lenta que hincha los anillos de la cola
// a la cabeza), la cola se mece y suelta granitos de arena, y el banderín ondea.
// x, y: el centro de la rueda del medio en el suelo. o.s escala (1 por omisión: carro de ~116 px, gusano de ~64 px de
// alto, cara de 11 × 13 px; 0.5 de lejos, en el puente). o.dir 1 (la cabeza a la derecha, por omisión) | −1.
// o.mira [x, y]: los ojos miran ahí. o.habla true: la boca se abre y se cierra y una mano gesticula. o.giro: el ángulo
// de las ruedas (en radianes; la escena lo hace crecer si el carro rueda). o.sombra false: sin la sombra del suelo.
// o.agua 0–1 (el final en el río): 0–0,5 la piel se llena de truchas (manchas oscuras de filo claro) que se despegan y
// caen; 0,3–0,9 el gris se deshace a pellizcos y deja ver debajo una silueta más pequeña, pálida y luminosa; 0,6–1 esa
// silueta y la cara se deshacen en MOTAS DE LUZ que suben (los ojos azules son lo último que se apaga). Nada morboso.
// Devuelve { cara: [x, y] (centro de la cara), manos: [[x, y], [x, y]], cabeza: [x, y] (centro del capuchón),
// alto (px por encima de y), largo: [x0, x1] }.
export function letoGusano(R, x, y, t, o = {}) {
  const s = o.s ?? 1, d = (o.dir ?? 1) < 0 ? -1 : 1, ag = Math.max(0, Math.min(1, o.agua ?? 0));
  const X = (u) => Math.round(x + u * s * d), Y = (v) => Math.round(y + v * s);
  const { pset, pget } = R, GR = p_GUS, ORO = p_ORO, MAD = p_LACA, COJ = p_COJIN;
  if (o.sombra !== false) p_sombra(R, x - 2 * s * d, y, 66 * s, 4 * s + 1, 0.5);
  // el mástil de atrás con el banderín verde y negro (detrás del cuerpo)
  { const mx = X(-56), my0 = Y(-14), my1 = Y(-50);
    for (let v = my1; v <= my0; v++) { pset(mx, v, ORO[1]); if (s >= 0.8) pset(mx + d, v, ORO[2]); }
    p_puntoS(R, mx, my1 - 1, s, ORO[3]);
    const L = 16 * s, A = 7 * s;
    for (let i = 0; i <= L; i++) { const ond = Math.sin(t * 4.2 - i / (3.2 * s)) * 1.6 * s * (i / L), hh = A * (1 - i / L * 0.75);
      for (let j = 0; j <= hh; j++) { const xx = Math.round(mx - d * (i + 1)), yy = Math.round(my1 + 1 + j + ond);
        const franja = j > hh * 0.45 ? p_ESTN : p_ESTV, luz = Math.sin(t * 4.2 - i / (3.2 * s) + 1.2) > 0.4;
        pset(xx, yy, j === 0 || j >= Math.floor(hh) ? p_TINTA : luz ? p_mez(franja, p_BLANCO, 0.18) : franja); } }
    // el anillo del gusano en el banderín (un aro de oro)
    if (s >= 0.8) R.anillo(mx - d * 6 * s, my1 + 4 * s + Math.sin(t * 4.2 - 1.8) * 1.2 * s, 2 * s, ORO[3]);
  }
  // el carro: la caja lacada con su moldura de oro, los paneles y los medallones
  const cx0 = Math.min(X(-58), X(54)), cx1 = Math.max(X(-58), X(54)), cTop = Y(-16), cBot = Y(-6);
  for (let v = cTop; v <= cBot; v++) for (let u = cx0; u <= cx1; u++) {
    const k = v - cTop, lx = (u - x) * d / s;
    let c = k <= Math.max(1, s) ? ORO[k === 0 ? 3 : 2] : v >= cBot - Math.max(0, Math.round(s) - 1) ? ORO[1] : MAD[1 + ((h(u >> 1, v, 3) > 0.82) ? 1 : 0)];
    const panel = Math.abs(((lx + 58) % 24) - 12) < 9 && k > 2 * s + 1 && v < cBot - 1.5 * s;
    if (panel) c = MAD[k === Math.round(2 * s + 2) ? 0 : 2];
    if (u === cx0 || u === cx1) c = p_TINTA;
    pset(u, v, c);
  }
  // medallones de oro (el anillo) en los paneles
  for (let k = 0; k < 5; k++) { const lx = -46 + k * 24; if (lx > 50) break; const mx = X(lx), my = Y(-11);
    if (s >= 0.8) { R.anillo(mx + 0.5, my + 0.5, 2.6 * s, ORO[2]); pset(mx - 1, my - 2, ORO[3]); } else pset(mx, my, ORO[2]); }
  // la proa curva de oro (delante) y el remate de atrás
  { const pts = [[50, -16], [54, -18], [57, -22], [56, -26], [53, -27], [52, -25]];
    for (let i = 0; i + 1 < pts.length; i++) { R.linea(X(pts[i][0]), Y(pts[i][1]), X(pts[i + 1][0]), Y(pts[i + 1][1]), ORO[1]);
      if (s >= 0.8) R.linea(X(pts[i][0]) - d, Y(pts[i][1]) - 1, X(pts[i + 1][0]) - d, Y(pts[i + 1][1]) - 1, ORO[3]); }
    R.linea(X(50), Y(-16), X(50), Y(-21), ORO[2]);
    p_puntoS(R, X(-58), Y(-18), s, ORO[2]); }
  // los cojines morados con sus borlas, asomando por debajo del cuerpo
  for (let k = 0; k < 6; k++) { const lx = -52 + k * 18, cx = X(lx), cy = Y(-18), rx = 9.5 * s, ry = 3 * s + 0.6;
    for (let j = Math.floor(-ry); j <= Math.ceil(ry); j++) for (let i = Math.floor(-rx); i <= Math.ceil(rx); i++) {
      const e = (i / rx) ** 2 + (j / ry) ** 2; if (e > 1) continue;
      const v = 2.2 - j / ry * 1.1 + (i * d < 0 ? 0.3 : -0.2) + (e > 0.75 ? -1 : 0) + (p_b4(cx + i, cy + j) - 0.5) * 0.8;
      pset(cx + i, cy + j, COJ[Math.max(0, Math.min(3, Math.round(v)))]); }
    if (s >= 0.8) { const bx = Math.round(cx - rx * d), by = Math.round(cy + ry); pset(bx, by, ORO[2]); pset(bx, by + 1, ORO[3]); pset(bx, by + 2, ORO[1]); } }
  // las ruedas de oro (tres, en el lado de cámara), con radios que giran
  const gir = o.giro ?? 0;
  for (const lx of [-42, -4, 36]) p_rueda(R, X(lx), Y(-7), 7 * s, gir * d);
  // el cuerpo: la línea central (Catmull-Rom) y el radio de cada punto (cola fina, cuerpo grueso, capuchón)
  const wag = Math.sin(t * 0.9) * 3, wag2 = Math.sin(t * 0.9 - 0.8) * 1.2;
  const P = [[-75, -37 + wag], [-68, -31 + wag2], [-55, -27], [-33, -31], [-9, -30], [13, -28], [29, -31], [36, -41], [38, -51]];
  const RA = [1.4, 4.6, 9.6, 12.2, 13, 13, 12.6, 12.6, 13.6];
  const MUE = [];
  for (let i = 0; i + 1 < P.length; i++) {
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
    const n = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) * s * 1.3));
    for (let k = 0; k < n; k++) { const q = k / n, q2 = q * q, q3 = q2 * q;
      const cr = (a, b, c, e) => 0.5 * (2 * b + (-a + c) * q + (2 * a - 5 * b + 4 * c - e) * q2 + (-a + 3 * b - 3 * c + e) * q3);
      MUE.push([cr(p0[0], p1[0], p2[0], p3[0]), cr(p0[1], p1[1], p2[1], p3[1]), RA[i] + (RA[i + 1] - RA[i]) * q, (i + q) / (P.length - 1)]); }
  }
  MUE.push([...P[P.length - 1], RA[RA.length - 1], 1]);
  // la silueta pálida de debajo (solo con o.agua): más pequeña, luminosa, que se deshace en motas de luz
  if (ag > 0.25) {
    const ap = Math.min(1, (ag - 0.25) / 0.25), fuera = Math.max(0, (ag - 0.55) / 0.4);
    for (const [lx, ly, r, u] of MUE) { if (u < 0.12) continue; const cx = x + lx * s * d, cy = y + (ly + 4) * s, rr = r * 0.62 * s;
      for (let j = Math.floor(-rr); j <= Math.ceil(rr); j++) for (let i = Math.floor(-rr); i <= Math.ceil(rr); i++) {
        if (i * i + j * j > rr * rr) continue; const px = Math.round(cx + i), py = Math.round(cy + j);
        if (u * 0.6 + h(px >> 1, py >> 1, 11) * 0.4 < fuera * 1.05 || p_b4(px, py) > ap) continue;
        const dd = Math.hypot(i, j) / rr, lu = 1.6 - j / rr * 1.1 - dd * 0.6 + (p_b4(px, py) - 0.5) * 0.7 + (Math.sin(t * 6 + px * 0.7 + py) > 0.97 ? 2 : 0);
        if (dd > 0.86) { if (p_b4(px, py) < 0.5) pset(px, py, p_LUZ[0]); continue; }
        pset(px, py, lu > 2.4 ? p_LUZ[2] : p_PALIDO[Math.max(0, Math.min(2, Math.round(lu)))]); } }
  }
  // el cuerpo, en una rejilla local: cada píxel guarda el punto de la línea central que lo pinta (el último gana)
  const bx0 = Math.floor(x - 80 * s), by0 = Math.floor(y - 70 * s), BW = Math.ceil(160 * s) + 2, BH = Math.ceil(60 * s) + 2;
  const own = new Int16Array(BW * BH).fill(-1);
  const resp = (u) => 1 + 0.045 * Math.sin(t * 1.3 - u * 5);
  MUE.forEach(([lx, ly, r], k) => { const cx = x + lx * s * d - bx0, cy = y + ly * s - by0, rr = r * s * resp(MUE[k][3]);
    for (let j = Math.floor(cy - rr); j <= Math.ceil(cy + rr); j++) for (let i = Math.floor(cx - rr); i <= Math.ceil(cx + rr); i++) {
      if (i < 0 || j < 0 || i >= BW || j >= BH) continue; const dx = i + 0.5 - cx, dy = j + 0.5 - cy; if (dx * dx + dy * dy <= rr * rr) own[j * BW + i] = k; } });
  const NA = 15, anillo = (u) => Math.floor(u * NA), cresta = MUE.map((m, k) => k > 0 && anillo(m[3]) !== anillo(MUE[k - 1][3]));
  // las crestas se ensanchan (el filo de cada anillo) y se marcan
  const quita = Math.max(0, Math.min(1, (ag - 0.28) / 0.6)), manchas = Math.min(1, ag * 2.4) * (ag < 0.9 ? 1 : 0);
  for (let j = 0; j < BH; j++) for (let i = 0; i < BW; i++) {
    const k = own[j * BW + i]; if (k < 0) continue;
    const px = bx0 + i, py = by0 + j;
    if (quita > 0 && MUE[k][3] * 0.6 + h(px >> 1, py >> 1, 7) * 0.4 < quita * 1.05) continue;
    const [lx, ly, r, u] = MUE[k], cx = x + lx * s * d, cy = y + ly * s, rr = r * s * resp(u);
    const ny = (py + 0.5 - cy) / rr, nx = (px + 0.5 - cx) / rr, dd = Math.hypot(nx, ny);
    const borde = (i === 0 || own[j * BW + i - 1] < 0) || (i === BW - 1 || own[j * BW + i + 1] < 0) || (j === 0 || own[(j - 1) * BW + i] < 0) || (j === BH - 1 || own[(j + 1) * BW + i] < 0);
    // el pliegue: el borde de cada anillo que queda a la vista (el punto que pinta es la cresta o el vecino es de otro anillo)
    const kv = own[j * BW + i - d] ?? -1, pliegue = kv >= 0 && anillo(MUE[kv][3]) !== anillo(u);
    const kv2 = own[j * BW + i - 2 * d] ?? -1, tras = !pliegue && kv2 >= 0 && anillo(MUE[kv2][3]) !== anillo(u);
    // cada anillo abombado: más claro en su centro y más oscuro hacia sus pliegues
    const fr = u * NA - Math.floor(u * NA), bul = Math.sin(Math.PI * fr);
    let v = 3.9 - ny * 2.3 - nx * 0.45 + (bul - 0.55) * 1.3 + (h(px >> 1, py >> 1, 2) - 0.5) * 0.35 + (p_b4(px, py) - 0.5) * 0.55;
    if (tras && ny < 0.35) v += 1.2;                         // el filo claro de la cresta, justo después del pliegue
    if (pliegue) v = ny < -0.55 ? 3 : 1.4 + (ny > 0.4 ? -0.4 : 0);
    if (u > 0.86) v = Math.min(v, 6);                        // el capuchón sin brillos blancos
    if (h(px, py, 5) > 0.955) v -= 1.4;                      // poros
    if (dd > 0.86) v -= 1.1;
    let c = borde ? GR[0] : GR[Math.max(1, Math.min(7, Math.round(v)))];
    // granos de arena en los pliegues de abajo
    if (!borde && pliegue && ny > 0.15 && h(px, py, 9) > 0.55) c = p_mez(C.arena, GR[3], 0.3);
    // las truchas: manchas oscuras con filo claro que se pegan a la piel
    if (manchas > 0 && !borde) { const n = p_ruido(px * 0.14 / s + t * 0.12, py * 0.22 / s, 4), lim = manchas * 0.42;
      if (n < lim) c = n > lim - 0.045 ? p_TRUCHA[3] : p_TRUCHA[n < lim * 0.6 ? 0 : 1]; }
    pset(px, py, c);
  }
  // la cara humana en el capuchón (hacia o.dir), con su rebajo de piel
  const hx = x + 38 * s * d, hy = y - 50 * s * resp(1), fcx = Math.round(hx + 3.5 * s * d), fcy = Math.round(hy + 2 * s);
  const fueraCara = Math.max(0, (ag - 0.72) * 3.6);
  c_caraLeto(R, fcx, fcy, s, d, t, o, fueraCara, ag);
  // los bracitos anillados y las manos en la proa
  const manos = [];
  const ges = o.habla ? Math.max(0, Math.sin(t * 2.6)) * 2.5 : 0;
  // cada mano sale de una muñeca gris corta pegada al cuerpo (sin brazo largo) y se apoya: una en la cubierta, otra en la proa
  [[39, -22, 45, -18, 0], [44, -27, 51, -22, ges]].forEach(([ax, ay, mx, my, alza], n) => {
    if (fueraCara > 0.9) return;
    const x0 = X(ax), y0 = Y(ay), x1 = X(mx), y1 = Math.round(Y(my) - alza * s), m = Math.max(3, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
    for (let q = 0; q <= m; q++) { const px = Math.round(x0 + (x1 - x0) * q / m), py = Math.round(y0 + (y1 - y0) * q / m);
      pset(px, py - 1, GR[n ? 5 : 4]); pset(px, py, GR[3]); if (s >= 0.8) pset(px, py + 1, GR[1]); if (q === m - 1 && s >= 0.8) pset(px, py, GR[2]); }
    p_manita(R, x1, y1, s, d, n ? 1 : 0.85, fueraCara);
    manos.push([x1, y1]);
  });
  // granitos de arena que caen de la cola y los pliegues; con o.agua, truchas que se despegan y motas de luz que suben
  for (let k = 0; k < 4; k++) { const f = (t * 0.6 + k * 0.37) % 1, lx = -60 + k * 26, gx = X(lx) + Math.round(Math.sin(k * 3 + t) * 1), gy = Math.round(Y(-30) + f * 18 * s);
    if (f < 0.85 && ag < 0.6) pset(gx, gy, p_mez(C.arena, p_BLANCO, 0.2)); }
  if (ag > 0) {
    const nt = Math.round(26 * Math.sin(Math.PI * Math.min(1, ag * 1.3)));
    for (let k = 0; k < nt; k++) { const m = MUE[Math.floor(h(k, 3) * (MUE.length - 1))], f = (t * (0.25 + h(k, 4) * 0.2) + h(k, 5)) % 1;
      const px = Math.round(x + (m[0] + (h(k, 6) - 0.5) * 14) * s * d + Math.sin(t * 2 + k) * 2), py = Math.round(y + m[1] * s + f * 34 * s);
      if (py > y + 2) continue; pset(px, py, p_TRUCHA[0]); pset(px + 1, py, p_TRUCHA[1]); pset(px, py - 1, p_TRUCHA[3]); }
    if (ag > 0.35) { const nl = Math.round(70 * Math.min(1, (ag - 0.35) * 2));
      for (let k = 0; k < nl; k++) { const m = MUE[Math.floor(12 + h(k, 13) * (MUE.length - 13))], f = (t * (0.18 + h(k, 14) * 0.2) + h(k, 15)) % 1;
        const px = Math.round(x + (m[0] + (h(k, 16) - 0.5) * 16) * s * d + Math.sin(t * 1.4 + k) * 3 * f), py = Math.round(y + m[1] * s - f * 46 * s);
        const tw = Math.sin(t * 5 + k * 2.1) > -0.2; if (!tw || f > 0.92) continue;
        pset(px, py, f < 0.5 ? p_LUZ[2] : p_LUZ[1]); if (h(k, 17) > 0.7 && f < 0.6) { pset(px + 1, py, p_LUZ[0]); pset(px - 1, py, p_LUZ[0]); pset(px, py - 1, p_LUZ[0]); pset(px, py + 1, p_LUZ[0]); } } }
  }
  return { cara: [fcx, fcy], manos, cabeza: [Math.round(hx), Math.round(hy)], alto: Math.round(64 * s), largo: [Math.min(X(-76), X(58)), Math.max(X(-76), X(58))] };
}
// LOS DOS TIGRES DE LAZA (de noche, al acecho; NUNCA atacan): grandes (~50 px de la cola al hocico a s 1, 22 de alto),
// pelaje naranja con rayas negras irregulares, vientre y hocico crema, contorno oscuro, agazapados con la cabeza baja y
// los omóplatos altos, la cola que se mece con la punta que da latigazos, las orejas que se mueven, ojos verdosos que
// brillan en la oscuridad y parpadean, y un COLLAR DE MANDO con una lucecita roja que parpadea. Respiran.
// x, y: los pies del tigre de delante; el segundo va detrás y un poco más arriba (x − dir·30, y − 5), algo más oscuro.
// o.dir 1 (miran a la derecha, por omisión) | −1. o.anda 0–1: lo que han avanzado (hasta 36 px hacia dir); mientras
// avanzan (0 < anda < 1, o o.paso true) caminan sigilosos, una pata cada vez. o.noche true (por omisión): los tiñe de
// la luz de luna. o.uno true: solo el de delante. o.s escala (1). o.gatito true | [x, y]: UN GATITO naranja de ~9 px
// sentado (por omisión en x + dir·44, y), que mira a los tigres, mueve la cola y las orejas, parpadea y maúlla (abre la
// boca cada ~2,5 s), para el gag de Atom. Devuelve { cabezas: [[x, y]…] (los hocicos), gatito: [x, y] | null }.
export function tigres(R, x, y, t, o = {}) {
  const d = (o.dir ?? 1) < 0 ? -1 : 1, s = o.s ?? 1, an = Math.max(0, Math.min(1, o.anda ?? 0));
  const paso = o.paso ?? (an > 0 && an < 1), off = Math.round(d * 36 * an * s), noche = o.noche ?? true;
  const cabezas = [];
  if (!o.uno) cabezas.push(a_tigreVivo(R, x - d * 40 * s + off, y - 6 * s, t, d, s * 0.92, 1.7, paso, noche, 0.22));
  cabezas.push(a_tigreVivo(R, x + off, y, t, d, s, 0, paso, noche, 0));
  let gat = null;
  if (o.gatito) { const [gx, gy] = Array.isArray(o.gatito) ? o.gatito : [x + d * 44 * s, y]; gat = p_gatito(R, Math.round(gx), Math.round(gy), t, -d, noche); }
  return { cabezas, gatito: gat };
}
// LAS TRUCHAS DE ARENA: manchas planas y blandas (4–8 px) de color tierra oscura con un FILO CLARO arriba y un brillo
// que corre por el lomo, que reptan a tirones como orugas (se estiran y se encogen) dejando un rastro tenue en la arena.
// o.n cuántas (12), en la zona o.zona [x0, y0, x1, y1] (por omisión el suelo de delante, [40, 150, 280, 172]); o.vel
// la rapidez (1). o.sube [x, y, alto]: un GUANTE VIVO que sube por algo vertical (los brazos de Leto: x el centro, y el
// suelo, alto lo que sube): una columna de ~7 px de ancho de truchas apretadas que bullen, con o.cubre 0–1 lo que ya
// cubre (1 por omisión), una que trepa en la punta y varias que llegan reptando desde la zona hacia el pie. o.pegada
// [x, y]: una sola trucha pegada ahí (la mano de Atom), que se retuerce. o.perlas true: cada una lleva una perla de luz
// que late (el final). Devuelve { pos: [[x, y]…] } (las de la zona).
export function truchas(R, t, o = {}) {
  const n = o.n ?? 12, [x0, y0, x1, y1] = o.zona ?? [40, 150, 280, 172], vel = o.vel ?? 1, per = !!o.perlas;
  const pos = [];
  const w = x1 - x0, hh = Math.max(1, y1 - y0);
  for (let k = 0; k < n; k++) {
    const ph = t * vel * (0.55 + h(k, 3) * 0.5) + h(k, 4) * 10, ci = Math.floor(ph), tir = ph - ci;
    const av = (ci + Math.min(1, tir * 1.8) ** 2 * (3 - 2 * Math.min(1, tir * 1.8))) * 3.2;
    const ang = h(k, 5) * Math.PI * 2 + Math.sin(t * 0.15 + k) * 0.5;
    let px, py;
    if (o.sube) {   // reptan hacia el pie del guante
      const [sx, sy] = o.sube, f = ((t * vel * 0.08 + h(k, 6)) % 1), bx = x0 + h(k, 1) * w, by = y0 + h(k, 2) * hh;
      px = bx + (sx - bx) * f; py = by + (sy - by) * f;
    } else { px = x0 + (((h(k, 1) * w + Math.cos(ang) * av) % w) + w) % w; py = y0 + (((h(k, 2) * hh + Math.sin(ang) * av * 0.4) % hh) + hh) % hh; }
    const L = 6 + h(k, 7) * 4, est = 1 + 0.3 * Math.sin(tir * Math.PI);
    const a = o.sube ? Math.atan2(o.sube[1] - py, o.sube[0] - px) : ang;
    // el rastro tenue detrás
    if (!o.sube) for (let q = 2; q < 7; q += 2) { const rx = Math.round(px - Math.cos(a) * (L / 2 + q)), ry = Math.round(py - Math.sin(a) * (L / 2 + q) * 0.5); if (p_b4(rx, ry) < 0.5) R.pset(rx, ry, p_mez(R.pget(rx, ry), p_TRUCHA[1], 0.25)); }
    a_trucha(R, px, py, L * est, (3.4 + h(k, 8) * 1.2) / Math.sqrt(est), a, t, k, per);
    pos.push([Math.round(px), Math.round(py)]);
  }
  if (o.sube) {   // el guante: truchas apretadas que bullen columna arriba
    const [sx, sy, alto] = o.sube, cub = Math.max(0, Math.min(1, o.cubre ?? 1)), top = sy - alto * cub, m = Math.ceil(alto * cub / 2.2);
    for (let j = 0; j < m; j++) { const yy = sy - 1 - j * 2.2, lado = (j % 2 ? -1 : 1) * 1.8 + Math.sin(t * 3 + j * 1.7) * 0.7;
      a_trucha(R, sx + lado, yy, 5.4 + h(j, 21) * 1.6, 3.4, -Math.PI / 2 + (j % 2 ? 0.5 : -0.5) + Math.sin(t * 2.4 + j) * 0.3, t, j + 50, per, false); }
    if (cub > 0.05 && cub < 1) { const yy = top - 1 - Math.abs(Math.sin(t * 3)) * 1.5; a_trucha(R, sx, yy, 5 + Math.sin(t * 6) * 1.2, 3, -Math.PI / 2, t, 99, per, false); }
  }
  if (o.pegada) { const [gx, gy] = o.pegada; a_trucha(R, gx + Math.sin(t * 5) * 0.8, gy, 6 + Math.sin(t * 7) * 1.5, 3, Math.sin(t * 4) * 0.7, t, 77, per, false); }
  return { pos };
}
// LOS OBJETOS DE LAS PAUSAS (los saca Atom a color en el estudio congelado): pixel art limpio dibujado en su rejilla con
// contorno oscuro de 1 px y ampliado a o.s (2 por omisión: cada píxel del dibujo, 2 × 2), con su sombra tramada en el
// suelo y su vida. x, y: el centro de la base (lo que mide cada uno, a s 2, va entre corchetes). o.cual:
//   'mochila' [72 × 88]: un niño chibi pequeño (pelo castaño, camiseta verde) que camina encorvado, con una gota de sudor,
//     cargando una mochila roja enorme con hebillas y bolsillo y una CASITA encima (tejado rojo, puerta, ventana
//     encendida y chimenea que echa humo); cada paso lo hace botar (parentificación).
//   'balanza' [104 × 88]: una balanza de latón de dos platos con cadenas: en el de la izquierda una MONEDA de oro grande
//     con un rombo grabado que destella; en el de la derecha un COFRE pequeño y lejano (más pálido, con un halo de
//     distancia). o.inclina −1..1 (0,6 por omisión: gana la moneda; positivo baja la moneda), con un leve balanceo.
//   'planeta' [80 × 84]: un planeta azul y verde que gira, con un RELOJ en la cara (doce marcas, agujas que corren) y un
//     anillo de órbita, flotando sobre su sombra (el «y un planeta con un reloj» de la pausa 2).
//   'tranvia' [120 × 80]: unas vías con traviesas que se bifurcan (una sigue recta, otra sube a la derecha), la palanca
//     del cambio con su pomo rojo (o.palanca −1 la rama de arriba, 1 la recta; por omisión oscila despacio), un
//     TRANVÍA de juguete amarillo y rojo con ventanas y trole que avanza y retrocede un poco, y un PUENTECITO de madera
//     con barandilla sobre la rama recta (el dilema).
//   'mesa' [128 × 72]: una mesa larga de madera con mantel; en el extremo izquierdo UNA SILLA SOLA y vacía (con un
//     vaso solo delante); en el derecho TRES AMIGOS chibi detrás de la mesa que se ríen (botan, abren la boca, chispas
//     de risa), con platos y vasos.
//   'jaula' [120 × 92]: una señal redonda de PROHIBIDO en su poste (aro rojo y barra cruzada sobre un pajarito gris,
//     sin letras) y una JAULA dorada con la puerta abierta de la que sale un PÁJARO amarillo y azul batiendo las alas;
//     o.vuela 0–1: su vuelo, de la puerta hacia arriba a la derecha (por omisión, en bucle de 6 s).
// Devuelve { caja: [x0, y0, x1, y1] (lo que ocupa en pantalla), punto: [x, y] (lo que señala Atom: la casita, la
// moneda, el reloj, la palanca, la silla, el pájaro) }.
export function pausa(R, x, y, t, o = {}) {
  const s = o.s ?? 2, cual = o.cual ?? 'mochila';
  const P = p_PAUSA[cual] ?? p_PAUSA.mochila;
  const L = p_lienzo(P.w, P.h);
  const extra = P.dibuja(L, t, o) || {};
  const X0 = Math.round(x - P.w * s / 2), Y0 = Math.round(y - P.h * s + (extra.bota ?? 0) * s);
  p_sombra(R, x, y + 1, P.w * s * 0.42, 2.5 * s, 0.45);
  p_volcar(R, L, X0, Y0, s);
  const aP = (p) => [X0 + p[0] * s, Y0 + p[1] * s];
  if (extra.despues) extra.despues((lx, ly, c) => R.rect(X0 + lx * s, Y0 + ly * s, X0 + lx * s + s - 1, Y0 + ly * s + s - 1, c), (spr, lx, ly) => { const L2 = p_lienzo(spr.w, spr.h); spr.dibuja(L2); p_volcar(R, L2, X0 + Math.round(lx * s), Y0 + Math.round(ly * s), s); });
  return { caja: [X0, Y0, X0 + P.w * s, Y0 + P.h * s], punto: aP(extra.punto ?? [P.w / 2, P.h / 2]) };
}
// los búferes fijos de C, por clave (se pintan una vez y se copian en cada fotograma)
const c_jCapas = new Map();

// un fondo fijo en su búfer: lo pinta la primera vez y luego solo lo devuelve
function c_jCapa(R, k, f) { let b = c_jCapas.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); c_jCapas.set(k, b); } return b; }

// mezcla dos colores: a = 0 deja c, a = 1 da d
function c_jMez(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// mezcla un píxel de la pantalla con un color (respeta el recorte)
function c_jMezP(R, x, y, col, a) { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, c_jMez(R.pget(x, y), col, a)); }

// tramado ordenado 4×4 (0–1)
const c_jBAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral del tramado en (x, y)
const c_jB4 = (x, y) => (c_jBAYER[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// un tono de una rampa con tramado entre dos escalones
function c_jTono(rampa, v, x, y) { const n = rampa.length - 1; if (v <= 0) return rampa[0]; if (v >= n) return rampa[n]; const i = Math.floor(v); return rampa[(v - i) > c_jB4(x, y) ? i + 1 : i]; }

// la roca tallada a mano (≈ −1…1): estratos, manchas, y las MARCAS DE CINCEL en hileras (surco oscuro con su filo claro)
function c_jTex(x, y, k = 0) {
  const est = Math.sin(y * 0.5 + Math.sin(x * 0.05 + k) * 2 + Math.sin(x * 0.13) * 0.5);
  let v = est * 0.25 + (h(x >> 1, y >> 1, k) - 0.5) * 0.6 + (h(x >> 3, y >> 2, k + 3) - 0.5) * 0.7;
  const fila = Math.floor(y / 6), gy = y - fila * 6, m = (x + fila * 5 - gy * 2) % 7;
  if (h(x >> 3, fila, k + 5) > 0.3) { if (m === 0) v -= 1; else if (m === 1) v += 0.5; }
  if (h(x >> 2, y, k + 7) > 0.95) v -= 0.7;
  if (h(x, y >> 1, k + 9) > 0.975) v += 0.5;
  return v;
}

// un halo de luz que se MEZCLA con lo que hay (la textura sigue viéndose debajo); recortado a la pantalla
function c_jBrillo(R, cx, cy, r, col, a) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, cy + r), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, cx + r);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r; if (d >= 1) continue;
    const q = Math.round(((1 - d) * (1 - d) * a + (c_jB4(x, y) - 0.5) * 0.08) * 10) / 10; if (q > 0) c_jMezP(R, x, y, col, Math.min(1, q));
  }
}

const c_jhx = (a) => a.map(hex);

// una nube de tres tonos (tonos[0] sombra … tonos[3] el filo de luz de abajo); puede(x, y) dice dónde se puede pintar
function c_jNube(R, cx, cy, w, k, tonos, puede) {
  const n = 4 + (k % 3);
  for (let p = 0; p < n; p++) {
    const f = (p + 0.5) / n, r = w * (0.13 + 0.13 * Math.sin(f * Math.PI)) * (0.8 + h(p, k, 12) * 0.4);
    const px = cx + (f - 0.5) * w * 0.85 + (h(p, k, 11) - 0.5) * 6, py = cy - Math.sin(f * Math.PI) * r * 0.45 + (h(p, k, 13) - 0.5) * 3;
    for (let y = Math.floor(py - r * 0.75); y <= cy + 2; y++) for (let x = Math.floor(px - r); x <= px + r; x++) {
      const dx = (x - px) / r, dy = (y - py) / (r * 0.75), d = dx * dx + dy * dy; if (d > 1) continue;
      if (!puede(x, y)) continue;
      if (d > 0.78 && c_jB4(x, y) > 0.5) continue;
      let v = dy > 0.5 ? 2.6 : dy > 0.05 ? 1.8 : dy > -0.5 ? 1.1 : 0.3;
      v += (h(x >> 1, y, k + 14) - 0.5) * 0.9;
      if (y >= cy + 1) v = 3;
      R.pset(x, y, tonos[Math.max(0, Math.min(3, Math.round(v)))]);
    }
  }
}

// las rampas de C: la roca de Jacurutu (de noche), la arena de dentro, la noche de fuera, las dunas a la luna, la roca
// al ocaso, el cielo del ocaso, la arena del ocaso y el vacío de la visión
const c_jROCA = c_jhx(['#0c0a0e', '#151017', '#1e171e', '#2a2026', '#382b2e', '#483936', '#5c4a42', '#755e50', '#927660']);

const c_jARENA = c_jhx(['#1c171e', '#2a2228', '#3a3034', '#4e4040', '#66544c', '#806a5a', '#9a826a', '#b49a7c']);

const c_jNOCHE = c_jhx(['#05060e', '#090c1a', '#0e1426', '#141c34', '#1c2844', '#283858', '#3a4c70']);

const c_jDUNA = c_jhx(['#10121e', '#181c2c', '#22283c', '#2e364e', '#3e4862', '#52607a', '#6e7c96', '#909cb4']);

const c_jROCA_O = c_jhx(['#0a080e', '#120e16', '#1c141e', '#281a24', '#36222a', '#4a2c2e', '#623a32', '#804c38', '#a4643e', '#c8844a']);

const c_jOCASO = c_jhx(['#1a1430', '#261a3c', '#361e46', '#4c244c', '#682c4e', '#88384e', '#a8484c', '#c45e48', '#dc7a48', '#ec9a56', '#f6bc70', '#fcd890']);

const c_jARENA_O = c_jhx(['#2a1a24', '#40242a', '#5a3030', '#7a4434', '#9a5a3a', '#b87244', '#d08c50', '#e4a862', '#f2c47c']);

const c_jVACIO = c_jhx(['#02030a', '#050816', '#080e22', '#0c1630', '#121f42', '#182a56', '#20386c', '#2c4a86', '#3c62a4']);

const c_jAZUL = hex('#5a8ae8'), c_jAZUL_L = hex('#a8d0ff'), c_jAZUL_B = hex('#e0f0ff'), c_jORO = hex('#f0c848'), c_jORO_L = hex('#fff0a8'), c_jORO_S = hex('#b07820');

const c_jTELA = c_jhx(['#2a1c1a', '#4a302a', '#6a4436', '#8a5c44']), c_jTELA2 = c_jhx(['#1a2228', '#2a363c', '#3e4e52', '#56686a']);

// un cántaro de barro (de pie, rajado) con la base en (x, y); o: tumbado (volcado, la boca rota a la derecha), roto
// (solo la mitad de abajo con el filo mellado), s (escala), luz (−1…1, de qué lado le da la luz)
function c_jCantaro(R, x, y, o = {}) {
  const s = o.s ?? 1, B = c_jhx(['#1e120e', '#3a2418', '#5a3a26', '#7a5236', '#9a6c48', '#b88a60']), L = o.luz ?? -1;
  if (o.tumbado) {
    const w = 11 * s, hh = 6 * s;
    for (let j = -hh; j <= hh; j++) for (let i = -w; i <= w; i++) {
      const e = (i / w) ** 2 + (j / hh) ** 2; if (e > 1) continue;
      R.pset(Math.round(x + i), Math.round(y - hh + j), c_jTono(B, 2.8 - j / hh * 1.1 + (i * L > 0 ? 0.4 : 0) + (h(x + i, y + j, 81) - 0.5) * 0.6 - (e > 0.8 ? 1.1 : 0), x + i, y + j));
    }
    // la boca rota (un hueco oscuro mellado) y una raja
    for (let j = -3 * s; j <= 3 * s; j++) { R.pset(Math.round(x + w), Math.round(y - hh + j), B[0]); R.pset(Math.round(x + w - 1), Math.round(y - hh + j), h(j, x, 82) > 0.4 ? B[0] : B[1]); }
    R.linea(x - 3, y - hh - 4, x + 1, y - hh + 2, B[1]);
    for (let i = -w + 2; i < w - 2; i++) R.pset(Math.round(x + i), y, B[0]);
    return;
  }
  const alto = Math.round(16 * s), roto = !!o.roto;
  for (let j = 0; j < alto; j++) {
    const u = j / alto, r = (u < 0.15 ? 2.5 + u * 8 : u < 0.75 ? 5.5 + Math.sin((u - 0.15) / 0.6 * Math.PI) * 1.8 : 4.2 - (u - 0.75) * 6) * s;
    const yy = y - j; if (roto && u > 0.55 + (h(j, x, 83) - 0.5) * 0.2) continue;
    for (let i = -Math.round(r); i <= Math.round(r); i++) {
      const lado = i / Math.max(1, r);
      const v = 2.6 + lado * L * -1.3 + (h(x + i, yy, 84) - 0.5) * 0.7 - (Math.abs(lado) > 0.85 ? 0.9 : 0) + (u > 0.3 && u < 0.36 ? -0.6 : 0);
      R.pset(x + i, yy, c_jTono(B, v, x + i, yy));
    }
  }
  if (!roto) { R.rect(x - Math.round(2 * s), y - alto - 1, x + Math.round(2 * s), y - alto, B[1]); R.pset(x, y - alto, B[0]); }
  else for (let i = -4; i <= 4; i++) if (h(i, x, 85) > 0.5) R.pset(x + i, y - Math.round(alto * 0.55) - 1, B[0]);
  // la raja del barro seco
  let cx = x + 1, cy = y - Math.round(alto * 0.7); for (let k = 0; k < 7 && !roto; k++) { R.pset(cx, cy, B[0]); cy++; cx += h(k, x, 86) > 0.5 ? 1 : 0; }
  for (let i = -5; i <= 5; i++) if (Math.abs(i) > 1) R.pset(x + i, y + 1, c_jMez(R.pget(x + i, y + 1), B[0], 0.5));
}

// unos pedazos de barro sueltos en el suelo alrededor de (x, y)
function c_jPedazos(R, x, y, n, k) {
  const B = c_jhx(['#2a1a12', '#6a462e', '#9a6c48']);
  for (let i = 0; i < n; i++) { const px = Math.round(x + (h(i, k, 87) - 0.5) * 26), py = Math.round(y + (h(i, k, 88) - 0.5) * 5), w = 1 + Math.floor(h(i, k, 89) * 3);
    R.linea(px, py, px + w, py - (h(i, k, 90) > 0.5 ? 1 : 0), B[1]); R.pset(px, py - 1, B[2]); R.pset(px + w, py + 1, B[0]); }
}

// una figura pequeña embozada (un fremen proscrito de fondo, 9–11 px) con los pies (o la base, si está sentada) en
// (x, y); o.sentado, o.dir, o.luz (el color del filo de luz que le da), k (su fase)
function c_jFigura(R, x, y, t, k, o = {}) {
  const sent = !!o.sentado, dir = o.dir ?? 1, H = sent ? 8 : 11, resp = Math.sin(t * 2.2 + k * 1.7) > 0.7 ? 1 : 0;
  const capa = hex('#3a302a'), capaS = hex('#221a18'), capaL = o.luz ?? hex('#6a5444'), cara = hex('#140e10');
  const top = y - H + resp;
  // el cuerpo: un trapecio de capa con los pliegues
  for (let j = 4; j <= H; j++) { const yy = top + j, w = Math.round(2 + (j - 4) * (sent ? 0.7 : 0.38));
    for (let i = -w; i <= w; i++) R.pset(x + i, yy, i * dir === w ? capaL : i * dir === -w ? capaS : (i + j) % 4 === 0 ? capaS : capa); }
  if (sent) { R.rect(x - 4 + dir * 2, y - 1, x + 3 + dir * 3, y, capaS); R.pset(x + dir * 5, y, capa); }
  // la capucha y la cara en sombra con los OJOS AZULES de la especia (parpadean)
  R.rect(x - 2, top, x + 2, top + 4, capa); R.pset(x - 2, top, capaS); R.pset(x + 2, top, capaS); R.pset(x + dir * 2, top + 1, capaL);
  R.rect(x - 1 + dir, top + 2, x + 1 + dir, top + 3, cara);
  if ((t * 0.7 + k * 0.37) % 3 > 0.12) { R.pset(x + dir, top + 2, hex('#6aa8ff')); R.pset(x + dir * 2 - (dir > 0 ? 0 : 0), top + 2, hex('#4a78d0')); }
  if (!sent) { const p = Math.floor(t * 1.5 + k) % 2; R.pset(x - 1, y, capaS); R.pset(x + 1, y, capaS); if (o.anda) R.pset(x + (p ? 1 : -1), y - 1, capa); }
}

// un murciélago pequeño que aletea en (x, y)
function c_jMurcielago(R, x, y, t, k) {
  const a = Math.sin(t * 22 + k) > 0, c = hex('#0a080c'), x0 = Math.round(x), y0 = Math.round(y);
  R.pset(x0, y0, c); R.pset(x0, y0 + 1, c);
  for (const s of [-1, 1]) { R.pset(x0 + s, y0 - (a ? 1 : 0), c); R.pset(x0 + s * 2, y0 - (a ? 2 : -1), c); R.pset(x0 + s * 3, y0 - (a ? 1 : -1), c); }
}

// el hueco de la boca de la cueva (con los bordes mellados): x 54–106, y 52–128
function c_jEnBoca(x, y) {
  if (y > 128 || y < 50) return false;
  const dx = Math.abs(x - 80);
  if (y >= 78) return dx < 25 + (h(y >> 1, x < 80 ? 1 : 2, 61) - 0.5) * 3;
  return Math.hypot(dx, (y - 78) * 1.08) < 25 + (h(x >> 1, 0, 62) - 0.5) * 2.5;
}

// la costura de la bóveda con la pared y el pie de la pared, por columnas
const c_jBoveda = (x) => 22 + ((x - 160) / 160) ** 2 * 30 + Math.sin(x * 0.09) * 1.5;

const c_jPie = (x) => 138 + Math.round(Math.sin(x * 0.05) * 1.2);

// la cueva fija (todo lo que no se mueve), en su búfer
function c_jCuevaFijo(R) {
  const { pset, linea, rect } = R;
  // 1 · la roca: bóveda, pared del fondo y suelo, con la luz de la luna que entra por la boca
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const yv = c_jBoveda(x), yp = c_jPie(x);
    let v, c;
    if (c_jEnBoca(x, y)) {
      // fuera: la noche, las dunas a la luna (la luna y las nubes van aparte)
      const hd = 108 + Math.round(Math.sin(x * 0.08) * 3 + Math.sin(x * 0.21 + 1) * 1.5), hd2 = 118 + Math.round(Math.sin(x * 0.05 + 2) * 2);
      if (y < hd) { c = c_jTono(c_jNOCHE, 1 + (y - 50) / 58 * 4.4 + (h(x >> 1, y >> 1, 63) - 0.5) * 0.3, x, y); const st = h(x, y, 64); if (st > 0.985) c = st > 0.995 ? hex('#e8ecff') : hex('#7a84b0'); }
      else if (y < hd2) c = c_jTono(c_jDUNA, (y === hd ? 6 : 3.2) + (x - 80) * -0.03 + Math.sin(x * 0.4 + y) * 0.3, x, y);
      else c = c_jTono(c_jDUNA, 2.2 + (y - hd2) * 0.15 + Math.sin(x * 0.5 + y * 0.8) * 0.5 + (y === hd2 ? 2 : 0), x, y);
      pset(x, y, c); continue;
    }
    const dB = Math.hypot((x - 80) * 0.9, (y - 92) * 1.2);   // distancia a la boca
    if (y < yv) {
      // la bóveda: oscura, con costillas talladas cada 24 px y la piedra vista de abajo
      const cost = Math.abs(((x + (yv - y) * 0.6) % 24) - 12);
      v = 1.1 + (y / yv) * 1.1 + c_jTex(x, y, 1) * 0.45 + (cost < 1.2 ? 0.9 : cost < 2.2 ? -0.5 : 0) + Math.max(0, 1 - dB / 70) * 1.2;
      if (x > 260 && y < 48) v = Math.min(v, 1.6);       // el rincón de Atom, tranquilo
      if (x > 18 && x < 172 && y < 21) v = Math.min(v, 1.8);   // y la barra del año
    } else if (y < yp) {
      // la pared del fondo, tallada a mano, más clara cerca de la boca y oscura en los rincones
      v = 3.1 + c_jTex(x, y, 2) * 0.95 + Math.max(0, 1 - dB / 64) * 2.4 - Math.abs(x - 170) / 170 * 1.1 - (y < yv + 3 ? 0.8 : 0);
      if (Math.abs(dB - 30) < 2.5) v += 0.8;    // el filo de la boca, gastado y con luz
    } else {
      // el suelo: piedra alisada con juntas en perspectiva, más claro en el haz de luna
      const z = (y - 136) / 44, fila = Math.floor(Math.pow(Math.max(0, y - 136), 0.75)), jx = (x - 160) / (0.6 + z * 0.9);
      v = 2.7 + z * 1.0 + c_jTex(x, y, 3) * 0.5 + Math.max(0, 1 - Math.hypot(x - 124, (y - 146) * 2.2) / 70) * 1.4;
      if (Math.pow(Math.max(0, y - 136), 0.75) - fila < 0.12) v -= 0.9;
      if (Math.abs(((jx + fila * 17) % 34 + 34) % 34) < 0.8) v -= 0.7;
      const xa = 52 + (y - 128) * 1.6, xb = 108 + (y - 128) * 2.5;
      if (x > xa && x < xb) v += 1.5 * Math.min(1, Math.min(x - xa, xb - x) / 6);
    }
    v -= Math.max(0, (Math.abs(x - 160) - 120) / 40) * 1.2;   // los lados, en penumbra
    pset(x, y, c_jTono(c_jROCA, v, x, y));
  }
  // la luna, en el hueco de la boca, con sus mares
  R.disco(70, 66, 5, hex('#eef0ff')); R.disco(68, 65, 1.6, hex('#c8cce0')); R.pset(72, 68, hex('#c8cce0')); R.pset(71, 64, hex('#d8dcf0'));
  c_jBrillo(R, 70, 66, 14, hex('#8a9ac8'), 0.35);
  // la jamba de la boca: un umbral tallado (el escalón) y el filo de luz de la izquierda
  for (let x = 52; x <= 108; x++) { pset(x, 129, c_jROCA[6]); pset(x, 130, c_jROCA[4]); pset(x, 131, c_jROCA[2]); }
  // 2 · la lengua de arena que entra desde el umbral, con ondas y el filo de luna
  for (let y = 126; y < 152; y++) for (let x = 30; x < 150; x++) {
    const cx = 82 + (y - 126) * 0.9, w = 26 + (y - 126) * 1.6 - Math.max(0, y - 140) * 3.2, d = Math.abs(x - cx) / Math.max(1, w);
    if (d > 1 || (y < 129 && !c_jEnBoca(x, y + 2))) continue;
    if (d > 0.85 && c_jB4(x, y) > 1 - (1 - d) / 0.15) continue;
    const on = Math.sin(x * 0.5 - y * 1.3 + Math.sin(y * 0.3) * 2);
    let v = 3.6 - d * 1.6 + (on > 0.6 ? 0.8 : on < -0.6 ? -0.5 : 0) + (h(x, y, 65) - 0.5) * 0.5;
    const xa = 52 + (y - 128) * 1.6, xb = 108 + (y - 128) * 2.5; if (x > xa && x < xb) v += 1.6;
    pset(x, y, c_jTono(c_jARENA, v, x, y));
  }
  // huellas viejas en la arena (de quienes entran)
  for (let k = 0; k < 7; k++) { const fx = 70 + k * 7 + (k % 2) * 2, fy = 133 + k * 2; pset(fx, fy, c_jARENA[2]); pset(fx + 1, fy, c_jARENA[2]); }
  // 3 · la escalera tallada de la izquierda: peldaños que suben hacia un paso oscuro, dos hundidos con cascotes
  rect(0, 50, 17, 76, c_jROCA[0]);
  for (let y = 50; y <= 76; y++) { pset(18, y, c_jROCA[5]); pset(19, y, c_jROCA[3]); }
  for (let j = 52; j < 76; j += 5) pset(6 + (j % 3), j, c_jROCA[1]);
  for (let k = 0; k < 9; k++) {
    const yT = 132 - k * 7, xL = 0, xR = 46 - k * 3, roto = k === 4 || k === 5;
    if (roto) {
      // el hueco del peldaño caído: oscuro, con cascotes
      rect(xL, yT, xR, yT + 6, c_jROCA[1]);
      for (let i = 0; i < 6; i++) { const bx = xL + 3 + h(i, k, 79) * (xR - 6), by = yT + 3 + h(i, k, 80) * 3, r = 1.2 + h(i, k, 81) * 1.8; R.disco(bx, by, r, c_jROCA[3]); pset(Math.round(bx - r * 0.4), Math.round(by - r * 0.5), c_jROCA[6]); }
      for (let x = xL; x <= xR; x += 2) if (h(x, k, 82) > 0.5) pset(x, yT, c_jROCA[4]);
      continue;
    }
    for (let x = xL; x <= xR; x++) {
      const mella = h(x >> 1, k, 66) > 0.82 ? 1 : 0;
      for (let y = yT + mella; y < yT + 2; y++) pset(x, y, c_jTono(c_jROCA, 5.2 + c_jTex(x, y, 4) * 0.4 - (x < 10 ? 1 : 0) + (y === yT + mella ? 0.6 : 0), x, y));
      for (let y = yT + 2; y < yT + 7; y++) pset(x, y, c_jTono(c_jROCA, 2.2 + c_jTex(x, y, 5) * 0.5 - (x < 10 ? 0.8 : 0) - (y - yT) * 0.12, x, y));
    }
    for (let y = yT; y < yT + 7; y++) { pset(xR + 1, y, c_jROCA[1]); pset(xR + 2, y, c_jROCA[2]); }
    // polvo en la huella del peldaño
    for (let x = 4; x < xR - 2; x += 3) if (h(x, k, 67) > 0.55) pset(x, yT, c_jARENA[4]);
  }
  // 4 · las grietas de la bóveda y de la pared (oscuras, con el filo de luz a la derecha)
  const grieta = (x0, y0, n, k, dx0) => { let x = x0, y = y0; for (let i = 0; i < n; i++) { pset(x, y, c_jROCA[0]); pset(x + 1, y, c_jROCA[5]); y++; x += h(i, k, 68) > 0.6 ? dx0 : h(i, k, 69) > 0.8 ? -dx0 : 0; if (h(i, k, 70) > 0.93) { let bx = x, by = y; for (let j = 0; j < 6; j++) { pset(bx, by, c_jROCA[1]); bx -= dx0; by++; } } } };
  grieta(134, 22, 30, 1, 1); grieta(196, 30, 26, 2, -1); grieta(240, 40, 22, 3, 1); grieta(36, 40, 16, 4, 1); grieta(150, 92, 22, 5, -1); grieta(118, 60, 18, 6, 1);
  // 5 · los nichos de la derecha (tallados, con el arco de arriba), con polvo, cántaros rotos y telarañas
  for (let n = 0; n < 3; n++) {
    const x0 = 178 + n * 28, x1 = x0 + 20, y0 = 62, y1 = 90;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      if (y < y0 + 10 && Math.hypot(x - (x0 + 10), (y - (y0 + 10)) * 1.0) > 10) continue;
      const fondo = 0.6 + (x - x0) / 20 * 0.5 + (y - y0) / 28 * 0.4 + (h(x >> 1, y >> 1, 71) - 0.5) * 0.4;
      pset(x, y, c_jTono(c_jROCA, x < x0 + 2 ? 2.6 : y > y1 - 2 ? 3.4 : fondo, x, y));
    }
    for (let x = x0 - 1; x <= x1 + 1; x++) { pset(x, y1 + 1, c_jROCA[6]); pset(x, y1 + 2, c_jROCA[3]); if (h(x, n, 72) > 0.4) pset(x, y1, c_jARENA[3]); }
    for (let y = y0 + 10; y <= y1; y++) pset(x1 + 1, y, c_jROCA[6]);
  }
  c_jCantaro(R, 186, 89, { s: 0.75, roto: true, luz: -1 }); c_jPedazos(R, 192, 89, 3, 1);
  c_jCantaro(R, 248, 89, { s: 0.6, tumbado: true });
  // el cuenco del nicho del medio y su telaraña en la esquina
  for (let i = -3; i <= 3; i++) { pset(214 + i, 89, c_jhx(['#5a3a26'])[0]); if (Math.abs(i) < 3) pset(214 + i, 88, hex('#7a5236')); }
  for (let k = 0; k < 6; k++) { linea(206, 72, 206 + k * 1.6, 72 + (6 - k) * 1.4, hex('#5a5258')); }
  linea(207, 75, 210, 72, hex('#5a5258')); linea(207, 78, 214, 72, hex('#4a4248'));
  linea(176, 96, 260, 96, c_jROCA[5]); linea(176, 97, 260, 97, c_jROCA[2]);
  // 6 · el paso lateral de la derecha, oscuro, con el palo atravesado de donde cuelgan las telas
  for (let y = 58; y <= 138; y++) for (let x = 270; x <= 302; x++) {
    if (y < 66 && Math.hypot(x - 286, (y - 66) * 1.6) > 16) continue;
    pset(x, y, c_jTono(c_jROCA, 0.4 + (x - 270) / 32 * 0.6 + (y > 128 ? 0.8 : 0), x, y));
  }
  for (let y = 66; y < 138; y++) { pset(269, y, c_jROCA[6]); pset(303, y, c_jROCA[2]); }
  for (let x = 264; x <= 308; x++) { pset(x, 56, hex('#3a2a1e')); pset(x, 57, hex('#5a4030')); pset(x, 58, hex('#2a1c14')); }
  pset(264, 55, hex('#5a4030')); pset(308, 55, hex('#5a4030'));
  // las clavijas de madera en la pared (x 144–170) con un odre de cuero viejo, seco y arrugado, y un rollo de cuerda
  for (const px of [146, 162]) { pset(px, 74, hex('#7a5a3a')); pset(px + 1, 74, hex('#5a4028')); pset(px, 75, hex('#2a1c10')); }
  for (let y = 75; y <= 98; y++) for (let x = 138; x <= 154; x++) { const u = (y - 75) / 23, w = 2 + Math.sin(u * Math.PI * 0.9) * 6; if (Math.abs(x - 146) > w) continue;
    pset(x, y, c_jTono(c_jhx(['#1e120c', '#3a2416', '#5a3a22', '#7a5434', '#9a6e48']), 2.2 + (x < 146 ? 0.9 : -0.6) + Math.sin(y * 1.3 + x * 0.4) * 0.6 + (Math.abs(x - 146) > w - 1 ? -1 : 0), x, y)); }
  for (let y = 75; y <= 92; y++) for (let x = 155; x <= 169; x++) { const d = Math.hypot(x - 162, (y - 84) * 1.1); if (d > 7 || d < 3) continue; pset(x, y, ((d * 2) | 0) % 2 ? hex('#8a7050') : hex('#5a4630')); }
  linea(162, 75, 162, 77, hex('#8a7050'));
  // 7 · la canaleta seca al pie de la pared (un surco tallado para el agua, con polvo)
  for (let x = 116; x <= 268; x++) { const y = c_jPie(x) - 2; pset(x, y, c_jROCA[1]); pset(x, y + 1, c_jROCA[2]); pset(x, y - 1, c_jROCA[5]); if (h(x, 0, 73) > 0.7) pset(x, y + 1, c_jARENA[3]); }
  // el hollín viejo de un fuego sobre el sitio del brasero
  for (let y = 98; y < 136; y++) for (let x = 108; x < 140; x++) { const d = Math.hypot((x - 124) / 14, (y - 136) / 38); if (d < 1 && c_jB4(x, y) < (1 - d) * 0.8) pset(x, y, c_jMez(R.pget(x, y), hex('#08060a'), 0.45)); }
  // 8 · el lecho de roca (x 150–230): la cara de arriba gastada, el frente con su friso tallado y la sombra en el suelo
  for (let x = 146; x <= 234; x++) for (let y = 150; y <= 153; y++) pset(x, y, c_jMez(R.pget(x, y), hex('#08060a'), 0.5 - (y - 150) * 0.1));
  for (let y = 127; y <= 150; y++) for (let x = 150; x <= 230; x++) {
    let v;
    if (y <= 131) v = 4.6 + c_jTex(x, y, 6) * 0.35 - (y === 127 ? -0.6 : 0) - Math.abs(x - 188) / 90;
    else { v = 2.8 + c_jTex(x, y, 7) * 0.6 - (y - 132) * 0.05; if (y === 132) v = 5.4; if (y === 136 || y === 146) v -= 0.9; if (y === 137 || y === 147) v += 0.6;
      if (y > 137 && y < 146 && ((x - 150) % 10 === 0 || (x - 145 - (y - 138)) % 10 === 0)) v -= 0.7; }
    if (x === 150 || x === 230) v -= 0.8;
    pset(x, y, c_jTono(c_jROCA, v, x, y));
  }
  // la manta vieja: rayas desvaídas, un pico que cuelga por el frente con los flecos deshilachados
  for (let y = 126; y <= 144; y++) for (let x = 182; x <= 222; x++) {
    if (y > 131 && (x < 196 || x > 214 || y > 138 + Math.round(Math.sin(x * 0.9) * 2 + h(x, 0, 74) * 3))) continue;
    if (y < 129 && x > 218) continue;
    const raya = Math.floor((x - 182) / 4) % 3, v = (raya === 0 ? 2 : raya === 1 ? 1.3 : 2.4) + (y > 131 ? -0.5 : 0) + (h(x, y, 75) - 0.5) * 0.7;
    pset(x, y, c_jTono(raya === 1 ? c_jTELA2 : c_jTELA, v, x, y));
  }
  for (let x = 196; x <= 214; x += 2) { const yb = 139 + Math.round(Math.sin(x * 0.9) * 2 + h(x, 0, 74) * 3); pset(x, yb, c_jTELA[1]); pset(x, yb + 1, c_jTELA[0]); }
  // un agujero en la manta y la almohada de piedra a la izquierda
  pset(205, 128, c_jROCA[3]); pset(206, 128, c_jROCA[3]); pset(205, 129, c_jROCA[2]);
  for (let y = 122; y <= 131; y++) for (let x = 152; x <= 164; x++) { if (y < 124 && (x < 154 || x > 162)) continue; pset(x, y, c_jTono(c_jROCA, (y < 125 ? 5.2 : 3.6) + c_jTex(x, y, 8) * 0.4 + (x < 155 ? 0.6 : 0), x, y)); }
  // 9 · los cántaros secos volcados junto a la pared (x 238–264) y sus pedazos
  c_jCantaro(R, 244, 147, { s: 1.05, luz: -1 });
  c_jCantaro(R, 262, 150, { tumbado: true, s: 0.9 });
  c_jCantaro(R, 228, 151, { roto: true, s: 0.7 }); c_jPedazos(R, 250, 152, 7, 2);
  // 10 · piedrecitas y cascotes por el suelo
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 76) * 320), y = Math.round(140 + h(k, 2, 76) * 38); if (x > 140 && x < 236 && y < 154) continue; pset(x, y, c_jROCA[6]); pset(x + 1, y, c_jROCA[2]); if (k % 4 === 0) { pset(x, y - 1, c_jROCA[7]); pset(x - 1, y, c_jROCA[3]); } }
  // ondas de arena por el suelo (manchas que ha traído el viento) y huellas que van de la boca al lecho
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const m = Math.sin(x * 0.021 + y * 0.05) + Math.sin(x * 0.047 - y * 0.08 + 2) * 0.7; if (m < 0.9 || (x > 146 && x < 236 && y < 156)) continue;
    const on = Math.sin(x * 0.55 - y * 1.4 + Math.sin(y * 0.2) * 2); if (m < 1.1 && c_jB4(x, y) > (m - 0.9) * 5) continue; pset(x, y, c_jTono(c_jARENA, 3 + (on > 0.5 ? 0.9 : on < -0.5 ? -0.5 : 0) + (h(x, y, 77) - 0.5) * 0.5, x, y)); }
  for (let k = 0; k < 9; k++) { const fx = 118 + k * 9, fy = 158 - k * 0.6 + (k % 2) * 3; pset(fx, fy, c_jROCA[2]); pset(fx + 1, fy, c_jROCA[2]); pset(fx, fy - 1, c_jARENA[2]); }
  // una viga de madera vieja caída del techo, partida, y una estera enrollada y comida
  for (let i = 0; i < 52; i++) { const x = 246 + i, y = Math.round(170 - i * 0.18); if (i > 30 && i < 33) continue; pset(x, y - 2, hex('#7a5a3a')); pset(x, y - 1, hex('#5a4028')); pset(x, y, hex('#3a2818')); if (i % 7 === 0) pset(x, y - 1, hex('#2a1c10')); pset(x, y + 1, c_jMez(R.pget(x, y + 1), hex('#08060a'), 0.5)); }
  for (let y = 157; y <= 165; y++) for (let x = 40; x <= 69; x++) { const r = (y - 161) / 4.5; if (Math.abs(r) > 1) continue; pset(x, y, c_jTono(c_jTELA, 2.3 - r * 1.3 + ((x + y) % 4 === 0 ? -0.5 : 0) + (h(x, y, 78) > 0.93 ? -1.4 : 0) - (x > 62 && x < 65 ? 0.8 : 0), x, y)); }
  for (let y = 156; y <= 166; y++) for (let x = 66; x <= 75; x++) { const d = Math.hypot((x - 70) * 1.6, y - 161); if (d > 5) continue; const an = Math.atan2(y - 161, (x - 70) * 1.6), sp = (d - an * 0.8 + 20) % 2.2; pset(x, y, d > 4.4 ? c_jTELA[1] : sp < 0.8 ? c_jTELA[0] : c_jTELA[3]); }
  for (let x = 40; x <= 72; x++) pset(x, 166, c_jMez(R.pget(x, 166), hex('#08060a'), 0.5));
  // el brasero de piedra (una taza baja con sus tres patas), apagado en el búfer: las brasas van aparte
  for (let y = 136; y <= 142; y++) for (let x = 118; x <= 130; x++) { const w = y < 139 ? 6 : 4; if (Math.abs(x - 124) > w) continue; pset(x, y, c_jTono(c_jROCA, y === 136 ? 5 : 2.4 + (x < 124 ? 0.5 : -0.3), x, y)); }
}

// la cueva de noche por dentro (cámara 'general')
function c_jCueva(R, t, o) {
  R.copiar(c_jCapa(R, 'cueva', () => c_jCuevaFijo(R)));
  const { pset } = R, esp = Math.max(0, Math.min(1, o.especia ?? 0));
  // fuera, por la boca: nubes de noche que pasan (dos velocidades), estrellas que titilan y arena que vuela de la cresta
  const enHueco = (x, y) => c_jEnBoca(x, y) && y < 108;
  for (const [x0, y, w, v, k] of [[20, 62, 34, 1.1, 3], [90, 84, 26, 2.2, 4], [60, 74, 20, 3.1, 5]]) { const cx = ((x0 + t * v) % 110 + 110) % 110 + 30; c_jNube(R, cx, y, w, k, c_jhx(['#0c1020', '#161e34', '#26324e', '#46587a']), enHueco); }
  for (let k = 0; k < 9; k++) { const x = 58 + Math.round(h(k, 0, 91) * 44), y = 54 + Math.round(h(k, 1, 91) * 44); if (!enHueco(x, y)) continue; if (Math.sin(t * (2 + k % 3) + k * 2.3) > 0.6) pset(x, y, hex('#dce4ff')); }
  for (let k = 0; k < 10; k++) { const f = (t * 0.6 + k / 10) % 1, x = Math.round(66 + f * 36 + k % 3), y = Math.round(106 - f * 6 - (k % 2)); if (c_jEnBoca(x, y)) R.pset(x, y, c_jDUNA[5]); }
  // el vigía en el umbral, en silueta contra la noche, con la capa que se mueve al viento
  c_jFigura(R, 92, 128, t, 3, { dir: -1, luz: hex('#5a6a8a') });
  if (Math.sin(t * 3) > 0) { R.pset(94, 122, hex('#3a302a')); R.pset(95, 123, hex('#3a302a')); } else R.pset(94, 124, hex('#3a302a'));
  // el haz de luna: motas de polvo que flotan en él
  for (let k = 0; k < 26; k++) { const u = h(k, 3, 92), y = 132 + ((h(k, 4, 92) * 46 + Math.sin(t * 0.5 + k) * 3 - t * 1.2 * (0.3 + u)) % 46 + 46) % 46, xa = 52 + (y - 128) * 1.6, xb = 108 + (y - 128) * 2.5, x = xa + (xb - xa) * ((u + t * 0.02 * (k % 3 - 1)) % 1 + 1) % 1;
    if ((k + Math.floor(t * 3)) % 5) c_jMezP(R, x, y - 30 + (k % 7) * 4, hex('#c8d0f0'), 0.5); }
  // el hilo de arena que cae de la grieta del techo (x 134) y el montoncito que hace en el suelo
  for (let y = 26; y < 147; y++) { const g = ((y * 0.23 - t * 7) % 1 + 1) % 1, gx = 134 + (h(y, Math.floor(t * 12), 93) > 0.8 ? (y & 1 ? 1 : -1) : 0); if (g < 0.3 || h(y, Math.floor(t * 20), 94) > 0.9) c_jMezP(R, gx, y, c_jARENA[6], 0.55 + (y % 3 === 0 ? 0.3 : 0)); }
  for (let k = 0; k < 4; k++) { const f = (t * 0.9 + k / 4) % 1; c_jMezP(R, 134 + (k - 1.5) * f * 4, 25 + f * 3, c_jARENA[5], 0.5 * (1 - f)); }
  for (let y = 143; y <= 150; y++) for (let x = 126; x <= 142; x++) { const d = Math.abs(x - 134) / (1 + (y - 142) * 1.1); if (d > 1) continue; pset(x, y, c_jTono(c_jARENA, 4.6 - d * 1.5 + (x < 134 ? 0.4 : 0) + (h(x, y, 94) - 0.5) * 0.5, x, y)); }
  for (let k = 0; k < 3; k++) { const f = (t * 1.7 + k / 3) % 1; pset(134 + Math.round((k - 1) * f * 6), 144 - Math.round(Math.sin(f * Math.PI) * 3), c_jARENA[6]); }
  // las telas viejas rotas que tapan el paso de la derecha y se mecen con la corriente
  for (let c = 0; c < 3; c++) {
    const x0 = 268 + c * 13, w = 12, largo = [62, 46, 70][c];
    for (let i = 0; i < w; i++) {
      const fin = largo - Math.round(h(i, c, 95) * 9) - (i % 4 === 0 ? 4 : 0);
      for (let j = 0; j < fin; j++) {
        const sw = Math.sin(t * 1.6 + c * 1.3 + j * 0.06) * (j / 60) * 4 + Math.sin(t * 4.1 + i * 0.5 + c) * (j / 70);
        const x = Math.round(x0 + i + sw), y = 58 + j;
        if (c === 1 && j > 20 && j < 30 && i > 3 && i < 8) continue;   // un roto
        const pl = Math.sin((i + sw * 0.6) * 1.1 + c) * 0.8;
        pset(x, y, c_jTono(c === 1 ? c_jTELA2 : c_jTELA, 1.5 + pl + (i === 0 ? -0.6 : 0) - j / 90 + (h(i, j >> 2, 96 + c) - 0.5) * 0.5, x, y));
      }
    }
  }
  // el brasero: brasas que laten, llamitas, el humo que sube y su luz cálida (los fremen proscritos se calientan)
  const fl = 0.75 + 0.25 * Math.sin(t * 13) * Math.sin(t * 7.3 + 1);
  c_jBrillo(R, 124, 140, 46 + fl * 5, hex('#d0703a'), 0.34 * fl * (1 - esp * 0.6));
  for (let i = -4; i <= 4; i++) pset(124 + i, 136, h(i, Math.floor(t * 8), 97) > 0.5 ? hex('#ff9a3a') : hex('#c84a1a'));
  for (let k = 0; k < 3; k++) { const hh = 4 + Math.round((Math.sin(t * 11 + k * 2) + 1) * 1.6) - (k === 1 ? -1 : 0), bx = 121 + k * 3, lad = Math.round(Math.sin(t * 9 + k * 3) * 0.8);
    for (let j = 1; j <= hh; j++) { const w = j < hh * 0.4 ? 1 : 0, cx = bx + (j > hh * 0.6 ? lad : 0), c = j > hh - 2 ? hex('#ffe08a') : j > hh * 0.4 ? hex('#ffb040') : hex('#e05a20');
      for (let i = -w; i <= w; i++) pset(cx + i, 136 - j, i === 0 && j < hh - 1 ? (j > 1 ? hex('#fff0b0') : c) : c); } }
  for (let k = 0; k < 8; k++) { const f = (t * 0.25 + k / 8) % 1, x = 124 + Math.sin(f * 7 + k) * (2 + f * 6), y = 132 - f * 40; c_jMezP(R, x, y, hex('#5a5058'), 0.5 * (1 - f)); c_jMezP(R, x + 1, y, hex('#4a4048'), 0.35 * (1 - f)); }
  // los dos fremen proscritos sentados en los peldaños, al borde de la luz
  c_jFigura(R, 30, 132, t, 1, { sentado: true, dir: 1, luz: hex('#a0603a') });
  c_jFigura(R, 14, 125, t, 2, { sentado: true, dir: 1, luz: hex('#7a4a30') });
  // los murciélagos que cruzan bajo la bóveda
  for (let k = 0; k < 2; k++) { const f = ((t * 0.09 + k * 0.5) % 1), x = 180 + f * 100 * (k ? -1 : 1) + (k ? 90 : 0), y = 32 + Math.sin(f * 20 + k) * 5 + k * 6; if (f < 0.8) c_jMurcielago(R, x, y, t, k); }
  // LA ESPECIA: una luz azul que crece desde el lecho y lo baña todo
  if (esp > 0) {
    if (esp > 0.35) { const a = (esp - 0.35) / 0.65 * 0.42; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { R.pset(x, y, c_jMez(R.pget(x, y), hex('#1a3a8a'), a * (0.6 + 0.4 * c_jB4(x, y)))); } }
    c_jBrillo(R, 190, 126, 20 + esp * 150, c_jAZUL, 0.25 + esp * 0.45);
    c_jBrillo(R, 190, 124, 10 + esp * 26, c_jAZUL_L, 0.3 + esp * 0.4);
    for (let k = 0; k < Math.round(12 + esp * 40); k++) { const f = (t * (0.15 + h(k, 0, 98) * 0.2) + h(k, 1, 98)) % 1, x = 190 + (h(k, 2, 98) - 0.5) * (40 + esp * 160) + Math.sin(t + k) * 3, y = 130 - f * (40 + esp * 80);
      c_jMezP(R, x, y, f < 0.7 ? c_jAZUL_L : c_jAZUL, 0.9 * (1 - f)); }
  }
  return { encuadre: 'cueva', camara: 'general', suelo: 150, libre: [40, 260], lecho: { x0: 150, x1: 230, y: 131 }, boca: [80, 128], brasero: [124, 142], hilo: [134, 150] };
}

// lo que va delante de los actores en la cueva: peñas caídas y arena en las esquinas de abajo, un cántaro roto, motas
function c_jCuevaDelante(R, t, o) {
  const esp = Math.max(0, Math.min(1, o.especia ?? 0));
  const b = c_jCapa(R, 'cueva-delante', () => {
    R.llenar(0);
    const pena = (cx, cy, rx, ry, k) => { for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
      const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x >> 2, y >> 2, k) - 0.5) * 0.35; if (d > 1) continue;
      const v = 2.2 - (x - cx) / rx * 0.9 - (y - cy) / ry * 0.9 + c_jTex(x, y, k) * 0.5 - (d > 0.82 ? 1.1 : 0);
      R.pset(x, y, c_jTono(c_jROCA, v, x, y)); } };
    pena(10, 172, 22, 14, 11); pena(32, 176, 12, 7, 12); pena(304, 170, 22, 16, 13); pena(284, 177, 12, 6, 14);
    for (let y = 172; y < 180; y++) for (let x = 0; x < 320; x++) { const yy = 173 + Math.sin(x * 0.03) * 2 + Math.sin(x * 0.11) * 1; if (y < yy || R.pget(x, y)) continue; R.pset(x, y, c_jTono(c_jARENA, 2.2 + Math.sin(x * 0.4 + y) * 0.5 + (y < yy + 1 ? 1 : 0), x, y)); }
    c_jCantaro(R, 300, 160, { roto: true, s: 1.2, luz: -1 }); c_jPedazos(R, 278, 168, 5, 3);
  });
  for (let i = 320 * 146; i < 57600; i++) { const c = b[i]; if (c) R.pset(i % 320, (i / 320) | 0, esp > 0 ? c_jMez(c, hex('#2a4a9a'), esp * 0.4) : c); }
  if (esp > 0) for (let k = 0; k < Math.round(esp * 16); k++) { const f = (t * (0.2 + h(k, 0, 99) * 0.15) + h(k, 1, 99)) % 1, x = h(k, 2, 99) * 320 + Math.sin(t * 0.7 + k) * 5, y = 182 - f * 120;
    c_jMezP(R, x, y, c_jAZUL_L, 0.8 * (1 - f)); c_jMezP(R, x + 1, y, c_jAZUL, 0.5 * (1 - f)); }
  return {};
}

// la boca de Jacurutu desde fuera, al atardecer (cámara 'boca'): lo fijo
const c_jRisco = (x) => x < 148 ? 32 + Math.sin(x * 0.07) * 5 + Math.sin(x * 0.23 + 1) * 2.5 + (h(x >> 2, 0, 41) - 0.5) * 3 : 32 + Math.pow((x - 148) / 58, 1.4) * 112 + Math.sin(x * 0.3) * 2;

let c_jBocaCielo = null;

function c_jBocaFijo(R) {
  const { pset, rect } = R;
  c_jBocaCielo = new Uint8Array(320 * 180);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const yr = c_jRisco(x), hzL = 112 + Math.round(Math.sin(x * 0.045) * 4 + Math.sin(x * 0.13 + 1) * 1.5), hzC = 124 + Math.round(Math.sin(x * 0.03 + 2) * 3);
    let c;
    const pieR = 143 + Math.round(Math.sin(x * 0.21) * 2 + Math.sin(x * 0.07) * 2);
    if (x < 206 && y >= yr && y < pieR) {
      // el risco de roca negra en COLUMNAS (de ancho desigual), en estratos con su repisa de luz, con la luz del sol
      // poniente en las caras de la derecha y en el filo de arriba
      const xw = x + Math.sin(y * 0.08) * 2 + Math.sin(y * 0.021 + x * 0.013) * 5, col = Math.floor(xw / 8), anc = 6 + Math.floor(h(col, 0, 37) * 6), cx = ((xw % 8) + 8) % 8 * anc / 8;
      const est = (y - 30 + Math.sin(x * 0.04) * 6) % 26;
      let v = 1.5 + (cx > anc - 2 ? 1.3 : cx < 1 ? -0.8 : 0) + c_jTex(x, y, 20 + col) * 0.55 + (y - yr < 3 ? 2.4 : y - yr < 6 ? 1 : 0) + (x > 150 ? (x - 150) / 56 * 0.8 : 0) - (y > 120 ? (y - 120) / 30 * 0.4 : 0);
      if (est < 1.2 && y - yr > 8) v += 2.2; else if (est < 3.5 && y - yr > 8) v -= 1.1;   // las repisas de los estratos
      if (Math.abs(((y + col * 13) % 23) - 11) < 0.6) v -= 0.9;     // las juntas de las columnas
      c = c_jTono(c_jROCA_O, v, x, y);
    } else if (x < 206 && y >= yr) {
      // la arena al pie del risco, en su sombra, con ondas
      const on = Math.sin(x * 0.5 + y * 1.1 + Math.sin(x * 0.03) * 3);
      c = c_jTono(c_jARENA_O, 2.6 + (y - pieR) * 0.08 + (on > 0.5 ? 0.8 : on < -0.6 ? -0.5 : 0) + (h(x, y, 39) - 0.5) * 0.5 + (y === pieR ? -1 : 0) + Math.max(0, (x - 150) / 56) * 1.2, x, y);
    } else if (y < hzL) {
      // el cielo del ocaso, tramado, más encendido junto al sol
      const ds = Math.hypot(x - 246, (y - 108) * 1.6);
      let v = (y / hzL) * 8.4 + Math.max(0, 1 - ds / 120) * 2.4 + (h(x >> 1, y >> 1, 42) - 0.5) * 0.35 + Math.sin(x * 0.02 + y * 0.05) * 0.25;
      if (x > 270 && y < 48) v = Math.min(v, 3.2);
      c = c_jTono(c_jOCASO, v, x, y); c_jBocaCielo[y * 320 + x] = 1;
    } else if (y < hzC) {
      // las dunas lejanas, violetas, con el filo encendido
      c = c_jTono(c_jARENA_O, (y === hzL ? 6.6 : 2.6) + Math.sin(x * 0.2 + y * 0.5) * 0.4 + (y - hzL) * 0.06, x, y);
    } else {
      // la arena cercana: ondas, las sombras largas de las dunas y los granos
      const z = (y - hzC) / (180 - hzC), on = Math.sin(x * 0.35 / (0.5 + z) + y * 0.9 + Math.sin(x * 0.02) * 3);
      let v = 4.6 + z * 1.4 + (on > 0.55 ? 1 : on < -0.6 ? -0.8 : 0) + Math.sin(x * 0.012 + z * 4) * 0.9 + (h(x, y, 43) - 0.5) * 0.5 + (y === hzC ? 1.6 : 0);
      if (x < 230) v -= Math.max(0, 1 - Math.abs(y - 148) / 14) * 1.2 * Math.max(0, (230 - x) / 230);   // la sombra del risco
      c = c_jTono(c_jARENA_O, v, x, y);
    }
    pset(x, y, c);
  }
  // el sol que se pone tras la duna (x 246, y 108) con su halo
  for (let y = 96; y <= 120; y++) for (let x = 234; x <= 258; x++) { const d = Math.hypot(x - 246, y - 108); if (d > 11 || !c_jBocaCielo[y * 320 + x]) continue; pset(x, y, d < 8 ? hex('#fff2c0') : d < 10 ? hex('#ffd890') : hex('#f8b870')); }
  for (let y = 70; y < 124; y++) for (let x = 200; x < 300; x++) { const d = Math.hypot(x - 246, (y - 108) * 1.3) / 52; if (d < 1 && c_jBocaCielo[y * 320 + x] && c_jB4(x, y) < (1 - d) * 0.35) pset(x, y, c_jMez(R.pget(x, y), hex('#ffe0a0'), 0.35)); }
  // la entrada tallada: jambas y dintel de sillares, dentro oscuro con escalones que bajan
  for (let y = 92; y <= 150; y++) for (let x = 74; x <= 120; x++) {
    const dentro = x >= 80 && x <= 114 && y >= 100 && !(y < 106 && Math.hypot(x - 97, (y - 106) * 2.4) > 17);
    if (dentro) { let v = 0.2 + (y - 100) / 50 * 0.8 + (x > 108 ? 0.5 : 0); if (y > 132 && (y - 132) % 5 === 0) v += 1.2; pset(x, y, c_jTono(c_jROCA_O, v, x, y)); continue; }
    const sill = (y < 100) || x < 80 || x > 114 ? 1 : 0; if (!sill) continue;
    const jy = (y - 92) % 8, bloque = (Math.floor((y - 92) / 8) + (x < 97 ? 0 : 1)) % 2;
    let v = 3.4 + (x > 114 ? 1.4 : x < 80 ? -0.4 : 0.6) + c_jTex(x, y, 30) * 0.4 + (jy === 0 ? -1.4 : 0) + ((x - 74 + bloque * 4) % 12 === 0 && y > 100 ? -1.2 : 0) + (y === 92 ? 1.6 : 0);
    if (h(x >> 1, y >> 1, 31) > 0.9) v -= 1.2;    // mellas
    pset(x, y, c_jTono(c_jROCA_O, v, x, y));
  }
  // la arena que se ha metido por el umbral
  for (let y = 140; y <= 150; y++) for (let x = 80; x <= 114; x++) { const top = 150 - (8 - Math.abs(x - 97) * 0.35); if (y >= top) pset(x, y, c_jTono(c_jARENA_O, 3.6 + (y - top) * 0.2 + (h(x, y, 32) - 0.5) * 0.6, x, y)); }
  // los restos de la trampa de viento: aletas talladas en la roca, unas rotas, y el conducto caído debajo
  rect(134, 52, 174, 78, c_jROCA_O[3]); rect(137, 55, 171, 76, c_jROCA_O[0]);
  for (let y = 55; y <= 76; y++) { pset(136, y, c_jROCA_O[1]); pset(172, y, c_jROCA_O[6]); pset(173, y, c_jROCA_O[4]); }
  for (let r = 0; r < 6; r++) {
    const y0 = 57 + r * 3.6, x1 = r === 2 ? 152 : r === 4 ? 160 : 171;
    for (let x = 137; x <= x1; x++) { const y = Math.round(y0 + (x - 137) * 0.05); pset(x, y, c_jROCA_O[7]); pset(x, y + 1, c_jROCA_O[4]); pset(x, y + 2, c_jROCA_O[1]); }
    if (r === 4) for (let k = 0; k < 9; k++) { pset(160 + k, Math.round(y0 + 1 + k * 0.9), c_jROCA_O[6]); pset(160 + k, Math.round(y0 + 2 + k * 0.9), c_jROCA_O[2]); }
  }
  for (let x = 133; x <= 175; x++) { pset(x, 51, c_jROCA_O[9]); pset(x, 52, c_jROCA_O[7]); pset(x, 79, c_jROCA_O[6]); pset(x, 80, c_jROCA_O[2]); }
  // los huecos de las cuevitas del risco (con su labio de luz) y el sendero de peldaños tallados que sube a la trampa
  for (const [cx, cy, rx, ry] of [[36, 74, 7, 5], [112, 58, 5, 4], [22, 112, 6, 4], [60, 46, 4, 3]]) for (let y = cy - ry; y <= cy + ry + 1; y++) for (let x = cx - rx; x <= cx + rx; x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d > 1.15) continue; pset(x, y, d > 0.8 && y > cy ? c_jROCA_O[6] : d > 0.8 ? c_jROCA_O[1] : c_jROCA_O[0]); }
  for (let k = 0; k < 12; k++) { const x = 122 + k * 2.6 + (k > 5 ? (k - 5) * 0.8 : 0), y = 134 - k * 4.6; rect(x, y, x + 4, y, c_jROCA_O[8]); rect(x, y + 1, x + 4, y + 1, c_jROCA_O[3]); }
  for (let y = 78; y < 128; y++) { const x = 152 + Math.round(Math.sin(y * 0.2) * 1.5); if (y > 96 && y < 104) continue; pset(x, y, c_jROCA_O[1]); pset(x + 1, y, c_jROCA_O[3]); }
  for (let y = 78; y < 120; y++) if (h(y, 0, 33) > 0.4) pset(160 + Math.round(Math.sin(y * 0.15)), y, c_jROCA_O[2]);   // la mancha del agua de antes
  // el pedregal al pie del risco
  for (let k = 0; k < 26; k++) { const x = 4 + h(k, 0, 34) * 200, y = 140 + h(k, 1, 34) * 10, r = 1.2 + h(k, 2, 34) * 3; if (x > 74 && x < 122) continue;
    R.disco(x, y, r, c_jROCA_O[2]); R.disco(x + 0.6, y - 0.6, r * 0.6, c_jROCA_O[5]); pset(Math.round(x + r * 0.5), Math.round(y - r * 0.6), c_jROCA_O[7]); }
  // el muro caído de sillares (x 122–196) y los bloques sueltos por la arena
  for (let y = 136; y <= 150; y++) for (let x = 122; x <= 196; x++) {
    const tope = 136 + Math.round(Math.abs(Math.sin(x * 0.06)) * 6 + (x > 170 ? (x - 170) * 0.3 : 0)); if (y < tope) continue;
    const fila = Math.floor((y - 136) / 4), jx = (x + fila * 5) % 10;
    pset(x, y, c_jTono(c_jROCA_O, (y === tope ? 7 : 4.6) + (jx === 0 ? -1.6 : jx === 9 ? -0.6 : 0) + ((y - 136) % 4 === 0 ? -1.2 : 0) + c_jTex(x, y, 35) * 0.4, x, y));
  }
  for (const [bx, by, w] of [[200, 148, 7], [214, 151, 5], [190, 153, 6], [128, 154, 5]]) { rect(bx, by - 4, bx + w, by, c_jROCA_O[5]); rect(bx, by - 4, bx + w, by - 4, c_jROCA_O[8]); rect(bx + w, by - 3, bx + w, by, c_jROCA_O[3]); for (let x = bx - 1; x <= bx + w + 4; x++) pset(x, by + 1, c_jMez(R.pget(x, by + 1), hex('#1a0e14'), 0.5)); }
  // el poste del trapo (clavado en la arena)
  for (let y = 108; y <= 150; y++) { pset(226, y, hex('#3a2418')); pset(227, y, hex('#6a4430')); }
  for (let x = 223; x <= 230; x++) pset(x, 151, c_jMez(R.pget(x, 151), hex('#1a0e14'), 0.5));
  a_bocaDetalle(R);
}
function c_jBoca(R, t, o) {
  R.copiar(c_jCapa(R, 'boca', () => c_jBocaFijo(R)));
  const { pset } = R, cielo = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && c_jBocaCielo[y * 320 + x] === 1 && !(x > 268 && y < 50);
  // las nubes del ocaso, tres tonos, a tres velocidades
  const T3 = [c_jhx(['#3a2240', '#5a2e4a', '#9a4a4e', '#f09860']), c_jhx(['#4a2a48', '#7a3a50', '#c05a50', '#f8b870']), c_jhx(['#2a1a38', '#40223e', '#6a2e48', '#c8604c'])];
  // las primeras estrellas, arriba, que titilan (fuera de la barra del año y de la esquina de Atom)
  for (let k = 0; k < 26; k++) { const x = Math.round(150 + h(k, 0, 84) * 118), y = Math.round(4 + h(k, 1, 84) * 34); if (!cielo(x, y) || (x < 176 && y < 21)) continue;
    const b = 0.5 + 0.5 * Math.sin(t * (1.5 + h(k, 2, 84) * 2) + k * 2.3); if (b > 0.25) c_jMezP(R, x, y, hex('#fff0f0'), 0.25 + b * 0.5); }
  for (const [x0, y, w, v, k, tn] of [[200, 40, 60, 0.8, 0, 2], [300, 64, 48, 1.6, 1, 0], [240, 86, 40, 2.6, 2, 1], [120, 56, 50, 1.2, 3, 0], [40, 74, 34, 0.5, 4, 2], [170, 98, 26, 3.2, 5, 1]]) { const cx = ((x0 + t * v) % 400 + 400) % 400 - 40; c_jNube(R, cx, y, w, k, T3[tn], cielo); }
  // halcones que planean en círculos lentos
  for (let k = 0; k < 3; k++) { const a = t * (0.35 + k * 0.07) + k * 2.1, x = 236 + Math.cos(a) * (18 + k * 8), y = 62 + k * 7 + Math.sin(a) * 6, al = Math.sin(t * 5 + k) > 0.3; const c = hex('#2a1420');
    R.pset(x, y, c); R.pset(x - 1, y - (al ? 1 : 0), c); R.pset(x + 1, y - (al ? 1 : 0), c); R.pset(x - 2, y - (al ? 1 : 0), c); R.pset(x + 2, y - (al ? 1 : 0), c); }
  // la arena que vuela de las crestas de las dunas lejanas
  for (let k = 0; k < 24; k++) { const f = (t * 0.5 + h(k, 0, 44)) % 1, x0 = 210 + h(k, 1, 44) * 110, y0 = 112 + Math.round(Math.sin(x0 * 0.045) * 4 + Math.sin(x0 * 0.13 + 1) * 1.5); c_jMezP(R, x0 - f * 26, y0 - f * 5 - Math.sin(f * 6 + k) * 1.5, hex('#f6c88a'), 0.6 * (1 - f)); }
  // el trapo del poste que ondea
  for (let i = 0; i < 16; i++) for (let j = 0; j < 7 - Math.floor(i / 5); j++) { const y = 109 + j + Math.round(Math.sin(t * 6 - i * 0.6) * (i / 6)); const x = 228 + i; if (i > 11 && (j + i) % 3 === 0) continue; pset(x, y, c_jTono(c_jTELA, 2 + Math.sin(t * 6 - i * 0.6 + 1) * 0.9 - (j === 0 ? -0.4 : 0), x, y)); }
  // la arena que el viento arrastra por el suelo (finas rachas) y el polvo que sale de la entrada
  for (let k = 0; k < 30; k++) { const f = (t * (0.4 + h(k, 0, 45) * 0.3) + h(k, 1, 45)) % 1, x = 330 - f * 360, y = 128 + h(k, 2, 45) * 50; c_jMezP(R, x, y, hex('#f8d098'), 0.45); c_jMezP(R, x + 1, y, hex('#f8d098'), 0.25); }
  // una caravana de tres fremen diminutos que cruza despacio por la cresta de las dunas lejanas, con su sombra larga
  for (let q = 0; q < 3; q++) { const x = Math.round(326 - ((t * 2.4 + 30) % 150) + q * 7); if (x < 204 || x > 318) continue; const yb = 112 + Math.round(Math.sin(x * 0.045) * 4 + Math.sin(x * 0.13 + 1) * 1.5) - 1;
    const pas = Math.floor(t * 4 + q) % 2, c = hex('#2a1424'); pset(x, yb - 4, c); pset(x, yb - 3, c); pset(x + 1, yb - 3, c); pset(x, yb - 2, c); pset(x + 1, yb - 2, hex('#4a2430')); pset(x - pas, yb - 1, c); pset(x + 1 + pas, yb - 1, c);
    if (q === 1) { pset(x - 1, yb - 3, hex('#5a3030')); pset(x - 1, yb - 2, hex('#5a3030')); }
    for (let i = 2; i < 6; i++) c_jMezP(R, x - i, yb, hex('#3a1a28'), 0.35); }
  // un remolino de arena que avanza despacio por el llano lejano (granos que giran y suben)
  { const bx = 330 - (t * 3.2) % 150, by = 136; if (bx > 214 && bx < 318) for (let k = 0; k < 26; k++) { const f = ((t * 0.9 + k / 26) % 1), an = t * 7 + k * 2.4, r = 1 + f * 5;
      c_jMezP(R, bx + Math.cos(an) * r + f * 3, by - f * 16, hex('#f4c890'), 0.55 * (1 - f * 0.7)); } }
  // los murciélagos que salen al anochecer de la cuevita del risco (x 112, y 58) y se van aleteando hacia el cielo
  for (let k = 0; k < 4; k++) { const f = ((t * 0.16 + k * 0.27) % 1); if (f > 0.85) continue; const x = 112 + f * 150 + Math.sin(f * 12 + k) * 6, y = 58 - f * 30 + Math.sin(f * 20 + k * 2) * 4, al = Math.sin(t * 16 + k) > 0;
    if (x > 266 && y < 50) continue; const c = hex('#1a0c14'); pset(x, y, c); pset(x + 1, y, c); pset(x - 1, y + (al ? -1 : 1), c); pset(x + 2, y + (al ? -1 : 1), c); pset(x - 2, y + (al ? -2 : 1), c); pset(x + 3, y + (al ? -2 : 1), c); }
  // un jirón de tela vieja que cuelga de la trampa de viento y se agita
  for (let j = 0; j < 16; j++) for (let i = 0; i < 4 - (j > 11 ? 2 : 0); i++) { const x = 166 + i + Math.round(Math.sin(t * 4.2 - j * 0.35) * j * 0.18), y = 81 + j; pset(x, y, c_jTono(c_jTELA, 1.4 + (i === 0 ? 0.8 : 0) + Math.sin(t * 4.2 - j * 0.35 + 1) * 0.6, x, y)); }
  // el ratón canguro (un muad'dib pequeño) que cruza a saltos cada ~10 s
  { const f = (t % 10) / 10, x = 300 - f * 320, salto = Math.abs(Math.sin(t * 6)) * 5, y = 164 - salto, c = hex('#c89a6a'), cs = hex('#7a5838');
    if (x > -6) { R.rect(x, y - 3, x + 3, y, c); R.pset(x - 1, y - 3, c); R.pset(x - 1, y - 4, cs); R.pset(x, y - 5, c); R.pset(x + 1, y - 5, c); R.pset(x - 1, y - 2, hex('#1a0e10'));
      R.linea(x + 4, y - 1, x + 9, y - 4, cs); R.pset(x + 2, y + 1, cs); R.pset(x + 3, y + 1, cs);
      for (let i = 0; i < 3; i++) c_jMezP(R, x + 4 + i, 165, hex('#2a1a1a'), 0.3 * (1 - salto / 5)); } }
  return { encuadre: 'cueva', camara: 'boca', suelo: 150, libre: [30, 250], entrada: [97, 150], puerta: [80, 100, 114, 150], sol: [246, 108], horizonte: 112, muro: [122, 196], poste: [226, 108] };
}
function c_jBocaDelante(R, t, o) {
  // la peña de primer término (abajo a la derecha) con su filo de luz y matas secas que se mecen abajo a la izquierda
  for (let y = 150; y < 180; y++) for (let x = 266; x < 320; x++) { const yy = 156 + Math.pow(Math.max(0, 300 - x) / 34, 2) * 22 + Math.sin(x * 0.3) * 1.5; if (y < yy) continue;
    R.pset(x, y, c_jTono(c_jROCA_O, 1.4 + (y - yy < 2 ? 3.4 : 0) + c_jTex(x, y, 36) * 0.5 - (x > 300 ? 0.4 : 0), x, y)); }
  for (let k = 0; k < 7; k++) { const bx = 6 + k * 5 + (k % 2) * 2, by = 179, alto = 8 + (k * 7) % 6;
    for (let j = 0; j < alto; j++) { const x = bx + Math.round(Math.sin(t * 3 + k + j * 0.2) * (j / alto) * 2 + (k % 3 - 1) * j * 0.3); R.pset(x, by - j, j > alto - 3 ? hex('#c8a060') : hex('#7a5a34')); }
    R.pset(bx - 2, by - 2, hex('#5a4024')); R.pset(bx + 2, by - 3, hex('#8a6a3a')); }
  return {};
}

// ·· el trance ··
// los hilos de la visión (fijos: los mismos en todas las tomas). Cada uno: los puntos de su curva, su punta, su
// planeta o ciudad, su ramita y su rango (en qué orden se apaga). El dorado es aparte.
let c_jHilosMem = null;

function c_jHilos() {
  if (c_jHilosMem) return c_jHilosMem;
  let sem = 4646; const rnd = () => { sem = (sem * 16807) % 2147483647; return sem / 2147483647; };
  const O = [160, 170], hilos = [];
  const bez = (p0, p1, p2, p3, n) => { const pts = []; for (let i = 0; i <= n; i++) { const u = i / n, a = (1 - u) ** 3, b = 3 * u * (1 - u) ** 2, c = 3 * u * u * (1 - u), d = u ** 3; pts.push([a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]); } return pts; };
  let intentos = 0;
  while (hilos.length < 74 && intentos++ < 2000) {
    const a = -Math.PI * (0.04 + rnd() * 0.92), r = 0.45 + rnd() * 0.55, tip = [O[0] + Math.cos(a) * 172 * r, O[1] + Math.sin(a) * 160 * r];
    if (tip[1] < 22 || tip[0] < 6 || tip[0] > 314 || tip[1] > 150) continue;
    if (tip[0] > 268 && tip[1] < 52) continue;              // el rincón de Atom
    if (tip[0] < 178 && tip[1] < 26) continue;              // la barra del año
    if (Math.hypot(tip[0] - 210, tip[1] - 34) < 26) continue;   // la luz del final, despejada
    const len = Math.hypot(tip[0] - O[0], tip[1] - O[1]), per = [-(tip[1] - O[1]) / len, (tip[0] - O[0]) / len], curl = (rnd() - 0.5) * 0.7 * len;
    const p1 = [O[0] + (rnd() - 0.5) * 10, O[1] - 26 - rnd() * 16], p2 = [O[0] + (tip[0] - O[0]) * 0.6 + per[0] * curl, O[1] + (tip[1] - O[1]) * 0.6 + per[1] * curl];
    const pts = bez(O, p1, p2, tip, Math.ceil(len * 1.3));
    const ramita = rnd() < 0.7 ? (() => { const i0 = Math.floor(pts.length * (0.55 + rnd() * 0.3)), [bx, by] = pts[i0], [cx, cy] = pts[Math.min(pts.length - 1, i0 + 3)], dx = cx - bx, dy = cy - by, l = Math.hypot(dx, dy) || 1, s = rnd() < 0.5 ? 1 : -1, L = 8 + rnd() * 14;
      const fin = [bx + (dx / l) * L * 0.6 + (-dy / l) * s * L * 0.8, by + (dy / l) * L * 0.6 + (dx / l) * s * L * 0.8]; return bez([bx, by], [bx + dx / l * 4, by + dy / l * 4], [(bx + fin[0]) / 2 + (-dy / l) * s * 3, (by + fin[1]) / 2 + (dx / l) * s * 3], fin, Math.ceil(L * 1.4)); })() : null;
    hilos.push({ pts, tip, ramita, tipo: rnd() < 0.62 ? 'planeta' : 'ciudad', r: 1 + Math.floor(rnd() * 2.6), anillo: rnd() < 0.25, col: Math.floor(rnd() * 4), fase: rnd() * 6, dist: len + rnd() * 30 });
  }
  // el orden en que se apagan: de fuera adentro (los más lejanos antes), con un poco de azar
  const orden = hilos.map((s, i) => [i, -s.dist]).sort((a, b) => a[1] - b[1]).map((p) => p[0]);
  orden.forEach((i, k) => { hilos[i].rango = k; });
  // el DORADO: del origen, en S, hasta la luz del fondo
  const dorado = bez(O, [150, 124], [252, 92], [210, 34], 220);
  c_jHilosMem = { O, hilos, dorado, luz: [210, 34] };
  return c_jHilosMem;
}

// el vacío de la visión (fijo): nebulosa tramada en bandas, estrellas, dos galaxias pequeñas
function c_jTranceFijo(R) {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const banda = Math.exp(-(((y - 150 + x * 0.55 + Math.sin(x * 0.03) * 14) / 40) ** 2));
    const nub = Math.sin(x * 0.035 + Math.sin(y * 0.04) * 2) * 0.5 + Math.sin(y * 0.05 - x * 0.012 + 1) * 0.5;
    let v = 1.2 + banda * (2.2 + nub * 1.2) + (h(x >> 2, y >> 2, 47) - 0.5) * 0.6 + (h(x >> 1, y >> 1, 48) - 0.5) * 0.3 + Math.max(0, 1 - Math.hypot(x - 160, (y - 170) * 1.4) / 120) * 2 + Math.max(0, 1 - Math.hypot(x - 210, y - 34) / 90) * 1.2;
    if (x > 268 && y < 50) v = Math.min(v, 2);
    if (x > 18 && x < 176 && y < 22) v = Math.min(v, 2.2);
    let c = c_jTono(c_jVACIO, v, x, y);
    const st = h(x, y, 49); if (st > 0.993 && !(x > 268 && y < 50)) c = st > 0.998 ? hex('#e8f0ff') : hex('#6a80c0');
    R.pset(x, y, c);
  }
  // dos galaxias pequeñas (espirales tramadas)
  for (const [gx, gy, rr, k] of [[48, 54, 9, 1], [262, 118, 7, 2]]) for (let a = 0; a < 12; a += 0.05) { const r = a * rr / 12, x = gx + Math.cos(a + k) * r * 1.6, y = gy + Math.sin(a + k) * r * 0.7; if (h(Math.round(x), Math.round(y), 50) > 0.35) R.pset(x, y, r < 2 ? hex('#c8d4ff') : hex('#4a5a96')); R.pset(gx + 0.5, gy, hex('#e8eeff')); }
}

// un hilo (sus puntos) con brillo b 0–1: núcleo claro, halo azul; apagado, ceniza gris punteada
function c_jHilo(R, pts, b, t, fase, sin = false) {
  if (b <= 0.04) { for (let i = 0; i < pts.length; i += 1) if ((i >> 1) % 3 !== 2) c_jMezP(R, pts[i][0], pts[i][1], hex('#2a3048'), 0.75); return; }
  for (let i = 0; i < pts.length; i++) { const [x, y] = pts[i]; const u = i / pts.length, fin = 1 - u * 0.35;
    c_jMezP(R, x + 1, y, c_jAZUL, 0.28 * b * fin); c_jMezP(R, x - 1, y, c_jAZUL, 0.28 * b * fin);
    c_jMezP(R, x, y, u < 0.25 ? c_jAZUL_B : c_jAZUL_L, Math.min(1, b * (0.9 - u * 0.25))); }
  if (sin) return;
  // pulsos que corren hacia fuera
  for (let k = 0; k < 2; k++) { const f = ((t * 0.32 + fase * 0.37 + k * 0.5) % 1), i = Math.floor(f * (pts.length - 1)), [x, y] = pts[i]; R.pset(Math.round(x), Math.round(y), hex('#ffffff')); c_jMezP(R, x + 1, y, c_jAZUL_L, 0.7 * b); c_jMezP(R, x, y + 1, c_jAZUL_L, 0.7 * b); }
}

// la punta de un hilo: un planeta (con su luz, su sombra y a veces un anillo) o una ciudad diminuta con luces
function c_jPunta(R, s, b, t) {
  const [x, y] = s.tip.map(Math.round), vivo = b > 0.04;
  const PL = [c_jhx(['#1a2a5a', '#3a6ac8', '#9ac8ff']), c_jhx(['#3a2a5a', '#8a5ac8', '#d8b0ff']), c_jhx(['#1a4a4a', '#3aa0a0', '#a8f0e8']), c_jhx(['#4a3020', '#c8804a', '#ffd0a0'])][s.col];
  const MU = c_jhx(['#14161e', '#2a2e3e', '#40465a']);
  const P = vivo ? PL.map((c) => c_jMez(MU[1], c, Math.min(1, b + 0.1))) : MU;
  if (s.tipo === 'planeta') {
    const r = s.r + 0.6; R.disco(x, y, r, P[1]); R.disco(x - r * 0.3, y - r * 0.3, r * 0.55, P[2]); R.pset(x + Math.round(r * 0.6), y + Math.round(r * 0.5), P[0]);
    if (s.anillo) R.linea(x - r - 2, y + 1, x + r + 2, y - 1, P[2]);
    if (vivo && b > 0.6) c_jBrillo(R, x, y, r + 4, PL[2], 0.25 * b);
  } else {
    // la ciudad: tres o cuatro torres en una isla de roca, con ventanitas que se encienden
    R.rect(x - 4, y + 1, x + 4, y + 2, P[0]);
    for (let k = 0; k < 4; k++) { const tx = x - 3 + k * 2, th = 2 + ((k * 7 + s.col) % 4); R.rect(tx, y + 1 - th, tx, y, P[1]); if (vivo && Math.sin(t * 2 + k + s.fase) > -0.3) R.pset(tx, y + 1 - th + 1, hex('#fff0b0')); }
    if (vivo && b > 0.6) c_jBrillo(R, x, y, 6, PL[2], 0.2 * b);
  }
}

// el vacío con los hilos de la visión (cámara 'general' del trance)
function c_jTrance(R, t, o) {
  R.copiar(c_jCapa(R, 'trance', () => c_jTranceFijo(R)));
  const A = c_jHilos(), N = A.hilos.length, ap = Math.max(0, Math.min(1, o.apaga ?? 0)), dor = Math.max(0, Math.min(1, o.dorado ?? 0));
  // el vacío se oscurece al apagarse los futuros
  if (ap > 0.05) { const a = ap * 0.5; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (c_jB4(x, y) < 0.75 + ap * 0.25) R.pset(x, y, c_jMez(R.pget(x, y), hex('#01020a'), a)); }
  // estrellas cercanas que derivan despacio (la capa de delante) y titilan
  for (let k = 0; k < 30; k++) { const x = ((h(k, 0, 51) * 340 - t * (1.5 + (k % 3))) % 340 + 340) % 340 - 10, y = h(k, 1, 51) * 180; if ((x > 268 && y < 50) || (x < 176 && y < 22)) continue; const tw = Math.sin(t * (2 + k % 4) + k) > 0.2;
    R.pset(x, y, tw ? hex('#c8d8ff') : hex('#5a6aa0')); if (k % 7 === 0 && tw) { c_jMezP(R, x + 1, y, hex('#8aa0e0'), 0.6); c_jMezP(R, x - 1, y, hex('#8aa0e0'), 0.6); c_jMezP(R, x, y - 1, hex('#8aa0e0'), 0.6); c_jMezP(R, x, y + 1, hex('#8aa0e0'), 0.6); } }
  // las ondas del tiempo que salen del origen
  for (let k = 0; k < 3; k++) { const f = (t * 0.25 + k / 3) % 1, r = 8 + f * 110; for (let a = Math.PI; a < Math.PI * 2; a += 1.2 / r) { const x = 160 + Math.cos(a) * r * 1.3, y = 170 + Math.sin(a) * r * 0.55; if (((a * r) | 0) % 3 === 0) c_jMezP(R, x, y, c_jAZUL, 0.35 * (1 - f) * (1 - ap * 0.7)); } }
  // los hilos: cada uno con su brillo (1 encendido, 0 ceniza); el paso de uno a otro dura tres rangos y parpadea
  const q = ap * (N + 2); let enc = 0;
  const brillo = A.hilos.map((s) => { let b = Math.max(0, Math.min(1, (s.rango + 3 - q) / 3)); if (b > 0 && b < 1) b *= 0.4 + 0.6 * Math.abs(Math.sin(t * 19 + s.fase * 3)); if (b > 0.5) enc++; return b; });
  for (let pas = 0; pas < 2; pas++) A.hilos.forEach((s, i) => { const b = brillo[i]; if ((pas === 0) !== (b <= 0.04)) return; c_jHilo(R, s.pts, b, t, s.fase); if (s.ramita) c_jHilo(R, s.ramita, b * 0.8, t, s.fase + 1, true); });
  // las puntas: planetas y ciudades; las que mueren se desmoronan en granos que caen
  A.hilos.forEach((s, i) => { const b = brillo[i]; c_jPunta(R, s, b, t);
    const muere = Math.max(0, Math.min(1, (s.rango + 5 - q) / 5)); if (muere > 0 && muere < 1) for (let k = 0; k < 6; k++) { const f = ((t * 0.8 + k / 6 + s.fase) % 1); c_jMezP(R, s.tip[0] + (h(k, i, 52) - 0.5) * 6 + Math.sin(f * 4 + k) * 1.5, s.tip[1] + f * 18, hex('#7a84a8'), 0.8 * (1 - f)); }
    if (s.ramita && b > 0.04) { const [rx, ry] = s.ramita[s.ramita.length - 1]; R.pset(Math.round(rx), Math.round(ry), hex('#c8e0ff')); } });
  // el DORADO: un hilo más (al principio cálido y fino) que se ensancha y brilla, y la luz del fondo
  const D = A.dorado, w = 0.6 + dor * 2.4, [lx, ly] = A.luz;
  c_jBrillo(R, lx, ly, 10 + dor * 30 + Math.sin(t * 2) * 2, c_jORO, 0.25 + dor * 0.55);
  if (dor > 0.2) for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + t * 0.15, L = (14 + dor * 26) * (0.7 + 0.3 * Math.sin(t * 3 + k)); R.linea(lx + Math.cos(a) * 8, ly + Math.sin(a) * 8, lx + Math.cos(a) * L, ly + Math.sin(a) * L, (x, y) => { c_jMezP(R, x, y, c_jORO_L, 0.4 * dor); return null; }); }
  if (dor > 0.3) for (let i = 10; i < D.length; i += 22) c_jBrillo(R, D[i][0], D[i][1], 4 + dor * 5, c_jORO, 0.22 * dor);
  for (let i = 0; i < D.length; i++) { const [x, y] = D[i], u = i / D.length, ww = w * (1 - u * 0.25);
    for (let j = -Math.ceil(ww); j <= Math.ceil(ww); j++) { const e = Math.abs(j) / Math.max(0.6, ww); if (e > 1) continue; c_jMezP(R, x + j, y, e > 0.66 ? c_jORO_S : e > 0.3 ? c_jORO : c_jORO_L, (0.55 + dor * 0.45) * (e > 0.66 ? 0.7 : 1)); } }
  R.disco(lx, ly, 3 + dor * 4, c_jORO_L); R.disco(lx, ly, 1.5 + dor * 2, hex('#ffffff'));
  for (let k = 0; k < 3; k++) { const f = ((t * 0.4 + k / 3) % 1), i = Math.floor(f * (D.length - 1)), [x, y] = D[i]; R.disco(x, y, 1 + dor, hex('#ffffff')); c_jBrillo(R, x, y, 5, c_jORO_L, 0.5); }
  // el ojo de la especia en el origen: el punto de luz y su halo
  c_jBrillo(R, 160, 170, 22 + Math.sin(t * 3) * 2, c_jAZUL, 0.45 * (1 - ap * 0.4)); c_jBrillo(R, 160, 170, 9, c_jAZUL_B, 0.7);
  return { encuadre: 'trance', camara: 'general', suelo: 170, libre: [40, 280], origen: A.O.slice(), dorado: D.filter((_, i) => i % 10 === 0).map((p) => p.map(Math.round)), luz: A.luz.slice(), encendidos: enc, total: N };
}

// el trance de cerca: el lecho en la cueva bañada de azul y los caminos reflejados en el aire alrededor de la cabeza
function c_jCercaFijo(R) {
  const { pset } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let v;
    if (y < 168) {
      // la pared tallada, de cerca: hileras de cincel más grandes, una costilla de bóveda arriba
      v = 3.1 + c_jTex(x >> 0, y, 40) * 0.8 + c_jTex(x >> 1, y >> 1, 41) * 0.4 - (y < 26 ? (26 - y) / 26 * 1.2 : 0) - Math.abs(x - 170) / 200;
      if (Math.abs(y - 24 - Math.sin(x * 0.02) * 3) < 1) v += 1.2;
      if (x > 268 && y < 50) v = Math.min(v, 2);
      if (x > 18 && x < 172 && y < 22) v = Math.min(v, 2.2);
    } else v = 2.2 + (y - 168) * 0.1 + c_jTex(x, y, 42) * 0.5 + (Math.abs((x + (y - 168) * 3) % 40 - 20) < 0.6 ? -0.8 : 0);
    pset(x, y, c_jTono(c_jROCA, v, x, y));
  }
  a_cercaPared(R);
  // un nicho grande a la derecha con dos cántaros y una lámpara de barro vieja
  for (let y = 46; y <= 104; y++) for (let x = 244; x <= 296; x++) { if (y < 66 && Math.hypot(x - 270, y - 66) > 26) continue; pset(x, y, c_jTono(c_jROCA, x < 248 ? 3 : y > 101 ? 4 : 0.6 + (x - 244) / 52 * 0.8 + (y - 46) / 58 * 0.5, x, y)); }
  for (let x = 242; x <= 298; x++) { pset(x, 105, c_jROCA[7]); pset(x, 106, c_jROCA[3]); }
  c_jCantaro(R, 258, 101, { s: 1.4 }); c_jCantaro(R, 282, 102, { tumbado: true, s: 1.2 }); c_jPedazos(R, 272, 103, 4, 5);
  // el arco de un paso a la izquierda (x 18–66, y 64–168), oscuro, con sus dovelas talladas (ahí miran los proscritos)
  for (let y = 60; y <= 168; y++) for (let x = 12; x <= 72; x++) {
    const dA = y < 88 ? Math.hypot(x - 42, (y - 88) * 1.1) : Math.abs(x - 42);
    if (dA < 24) pset(x, y, c_jTono(c_jROCA, 0.3 + (x - 18) / 48 * 0.7 + (y > 160 ? 1 : 0), x, y));
    else if (dA < 30) { const dov = y < 88 ? Math.floor(Math.atan2(y - 88, x - 42) * 5) : Math.floor(y / 9); pset(x, y, c_jTono(c_jROCA, 3.6 + (x > 42 ? -0.6 : 0.6) + c_jTex(x, y, 48) * 0.4 + ((y < 88 ? ((Math.atan2(y - 88, x - 42) * 5) % 1 + 1) % 1 : (y / 9) % 1) < 0.15 ? -1.4 : 0) + (dA > 29 ? -0.8 : 0) + (Math.abs(dov) % 2) * 0.3, x, y)); }
  }
  // el medallón tallado del sietch (anillos y radios, gastado y partido), sin letras
  for (let y = 40; y <= 100; y++) for (let x = 150; x <= 210; x++) { const d = Math.hypot(x - 180, y - 70); if (d > 27) continue;
    const an = Math.atan2(y - 70, x - 180), anillo = d > 24 || (d > 15 && d < 17) || d < 5, radio = d > 6 && d < 15 && Math.abs(((an * 12 / Math.PI) % 2 + 2) % 2 - 1) < 0.18;
    let v = 3.2 + c_jTex(x, y, 49) * 0.5 + (anillo || radio ? ((x - 180) * 0.6 - (y - 70) > 0 ? -1.3 : 1.1) : 0); if (h(x >> 2, y >> 2, 50) > 0.86) v -= 1; pset(x, y, c_jTono(c_jROCA, v, x, y)); }
  // grietas
  const grieta = (x0, y0, n, k, dx0) => { let x = x0, y = y0; for (let i = 0; i < n; i++) { pset(x, y, c_jROCA[0]); pset(x + 1, y, c_jROCA[5]); y++; x += h(i, k, 68) > 0.6 ? dx0 : h(i, k, 69) > 0.8 ? -dx0 : 0; } };
  grieta(96, 26, 40, 7, 1); grieta(222, 30, 50, 8, -1); grieta(188, 74, 30, 9, 1);
  // el lecho de cerca (x 108–238): la cara de arriba (y 134–140), el frente tallado con un friso de rombos hasta y 168
  for (let y = 134; y <= 170; y++) for (let x = 104; x <= 242; x++) {
    let v;
    if (y <= 140) v = 4.8 + c_jTex(x, y, 43) * 0.35 - (y === 134 ? -0.6 : 0);
    else { v = 3 + c_jTex(x, y, 44) * 0.55; if (y === 141) v = 5.6; if (y === 146 || y === 162) v -= 1; if (y === 147 || y === 163) v += 0.7;
      if (y > 147 && y < 162) { const dx = (x - 104) % 16, dy = y - 154.5; if (Math.abs(Math.abs(dx - 8) + Math.abs(dy) * 1.1 - 6) < 0.7) v -= 0.9; if (Math.abs(Math.abs(dx - 8) + Math.abs(dy) * 1.1 - 5) < 0.6) v += 0.6; } }
    if (y > 166) v -= 1;
    if (x < 106 || x > 240) v -= 0.9;
    pset(x, y, c_jTono(c_jROCA, v, x, y));
  }
  // la manta vieja (rayas desvaídas) y su pico que cuelga, deshilachado; la almohada de piedra a la izquierda
  for (let y = 133; y <= 160; y++) for (let x = 150; x <= 232; x++) { if (y > 140 && (x < 196 || x > 228 || y > 150 + Math.round(Math.sin(x * 0.7) * 3 + h(x, 0, 45) * 5))) continue;
    const raya = Math.floor((x - 150) / 6) % 3; pset(x, y, c_jTono(raya === 1 ? c_jTELA2 : c_jTELA, (raya === 0 ? 2 : raya === 1 ? 1.4 : 2.5) - (y > 140 ? 0.5 : 0) + (h(x, y, 46) - 0.5) * 0.7, x, y)); }
  for (let y = 127; y <= 140; y++) for (let x = 110; x <= 128; x++) { if (y < 130 && (x < 112 || x > 126)) continue; pset(x, y, c_jTono(c_jROCA, (y < 131 ? 5.6 : 3.8) + c_jTex(x, y, 47) * 0.4, x, y)); }
  // la taza de la dosis, volcada en el suelo (x 236, y 172)
  for (let j = -4; j <= 4; j++) for (let i = -6; i <= 6; i++) { if ((i / 6) ** 2 + (j / 4) ** 2 > 1) continue; pset(236 + i, 170 + j, c_jTono(c_jhx(['#2a1a12', '#5a3a26', '#8a5c3a', '#b07a50']), 2 - j * 0.25 + (i < 0 ? 0.5 : 0), 236 + i, 170 + j)); }
  for (let j = -3; j <= 3; j++) pset(242, 170 + j, hex('#140c0a'));
  a_cercaObjetos(R);
}
function c_jCerca(R, t, o) {
  R.copiar(c_jCapa(R, 'cerca', () => c_jCercaFijo(R)));
  const ap = Math.max(0, Math.min(1, o.apaga ?? 0)), dor = Math.max(0, Math.min(1, o.dorado ?? 0)), esp = o.especia ?? 1, [hx, hy] = o.cabeza ?? [130, 131];
  // todo bañado de azul (un recorrido), con un latido
  const late = 0.5 + 0.5 * Math.sin(t * 1.8);
  { const a = 0.27 * esp + late * 0.05; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, c_jMez(R.pget(x, y), hex('#1a3a8a'), a * (0.7 + 0.3 * c_jB4(x, y)))); }
  c_jBrillo(R, hx, hy, 90 + late * 8, c_jAZUL, 0.35 * esp);
  // el resto de la especia que brilla en la taza y el charquito
  for (let i = 0; i < 9; i++) R.pset(243 + i, 173 + (i > 5 ? 1 : 0), i % 3 ? hex('#5a8ae8') : hex('#a8d0ff'));
  c_jBrillo(R, 246, 173, 10 + late * 2, c_jAZUL_L, 0.5);
  // el candil del nichito: la llama que tiembla, su luz cálida en el nicho y una polilla que le da vueltas
  { const fl = 0.75 + 0.25 * Math.sin(t * 13) * Math.sin(t * 7.3 + 1), lx = 303 + Math.round(Math.sin(t * 9) * 0.6);
    c_jBrillo(R, 303, 128, 16 + fl * 4, hex('#ffb060'), 0.32 * fl);
    R.pset(lx, 131, hex('#fff0c0')); R.pset(lx, 130, hex('#ffd070')); if (fl > 0.7) R.pset(lx, 129, hex('#ff9a40')); R.pset(lx - 1, 131, hex('#ff9a40')); R.pset(lx + 1, 131, hex('#ffb050'));
    const pa = t * 2.6, px = 303 + Math.cos(pa) * 8, py = 124 + Math.sin(pa * 1.7) * 5, al = Math.sin(t * 30) > 0; c_jMezP(R, px, py, hex('#d8c8a8'), 0.9); c_jMezP(R, px + (al ? 1 : -1), py - (al ? 1 : 0), hex('#a89878'), 0.8); }
  // motas de polvo que flotan despacio en la luz azul
  for (let k = 0; k < 22; k++) { const f = (t * (0.03 + h(k, 0, 96) * 0.04) + h(k, 1, 96)) % 1, x = 60 + h(k, 2, 96) * 200 + Math.sin(t * 0.5 + k) * 5, y = 160 - f * 130; if (x > 262 && y < 54) continue;
    c_jMezP(R, x, y, c_jAZUL_B, 0.5 * Math.sin(f * Math.PI)); }
  // dos proscritos que miran desde el paso oscuro, con los ojos azules que brillan
  c_jFigura(R, 34, 160, t, 5, { dir: 1, luz: hex('#4a6aa8') }); c_jFigura(R, 50, 162, t, 6, { dir: 1, luz: hex('#4a6aa8') });
  // polvo que cae de la grieta del techo, en granos
  for (let k = 0; k < 16; k++) { const f = (t * 0.35 + k / 16) % 1; c_jMezP(R, 222 + Math.sin(f * 9 + k) * 2, 24 + f * 108, c_jARENA[6], 0.6 * (1 - f * 0.5)); }
  // los caminos reflejados en el aire alrededor de la cabeza: arcos que giran y se apagan; el dorado sube
  const N = 56, q = ap * (N + 2);
  for (let k = 0; k < N; k++) {
    const r = 14 + h(k, 0, 54) * 62, a0 = h(k, 1, 54) * Math.PI * 2 + t * (0.15 + h(k, 2, 54) * 0.25) * (k % 2 ? 1 : -1), largo = 0.5 + h(k, 3, 54) * 1.3, rango = Math.floor((1 - (r - 14) / 62) * (N - 4) + h(k, 4, 54) * 4);
    let b = Math.max(0, Math.min(1, (Math.min(N - 1, rango) + 3 - q) / 3)); if (b > 0 && b < 1) b *= 0.4 + 0.6 * Math.abs(Math.sin(t * 17 + k));
    for (let s = 0; s < largo * r; s += 0.8) { const a = a0 + s / r, x = hx + Math.cos(a) * r * 1.25, y = hy - 4 + Math.sin(a) * r * 0.75; if (y > 139) continue;
      if (b <= 0.04) { if ((s | 0) % 3 === 0) c_jMezP(R, x, y, hex('#3a4468'), 0.5); continue; }
      c_jMezP(R, x, y, s < 2 ? c_jAZUL_B : c_jAZUL_L, 0.8 * b * (1 - s / (largo * r) * 0.6)); }
    { const a = a0 + largo, x = Math.round(hx + Math.cos(a) * r * 1.25), y = Math.round(hy - 4 + Math.sin(a) * r * 0.75); if (y < 138 && y > 24) {
      const PC = [hex('#9ac8ff'), hex('#d8b0ff'), hex('#a8f0e8'), hex('#ffd0a0')][k % 4];
      if (b > 0.04) { R.disco(x, y, 1.6, c_jMez(hex('#2a3048'), PC, b)); R.pset(x - 1, y - 1, hex('#ffffff')); }
      else { R.disco(x, y, 1.2, hex('#2a3048')); const f = (t * 0.7 + k * 0.13) % 1; c_jMezP(R, x, y + f * 10, hex('#6a7498'), 0.6 * (1 - f)); } } }
  }
  // el dorado: de la frente hacia arriba a la derecha, en S, cada vez más ancho
  if (dor > 0) { const L = 30 + dor * 120; for (let s = 0; s < L; s += 0.5) { const u = s / 150, x = hx + 4 + s * 0.9 + Math.sin(u * 7) * 10, y = hy - 8 - s * 0.62; if (y < 22 || (x > 268 && y < 50)) break; const w = 0.6 + dor * 2.2;
      for (let j = -Math.ceil(w); j <= Math.ceil(w); j++) { const e = Math.abs(j) / w; if (e > 1) continue; c_jMezP(R, x + j, y, e > 0.6 ? c_jORO_S : e > 0.25 ? c_jORO : c_jORO_L, 0.85); } }
    c_jBrillo(R, hx + 4, hy - 8, 10 + dor * 8, c_jORO, 0.4 * dor); }
  c_jBrillo(R, hx, hy, 16, c_jAZUL_L, 0.3 + late * 0.15);
  return { encuadre: 'trance', camara: 'cerca', suelo: 172, libre: [40, 280], lecho: { x0: 108, x1: 238, y: 140 }, cabeza: [hx, hy], taza: [236, 172] };
}
function c_jTranceDelante(R, t, o, cerca) {
  // motas de luz desenfocadas que pasan por delante (azules y, con el dorado, alguna de oro)
  const dor = o.dorado ?? 0;
  for (let k = 0; k < 7; k++) { const f = (t * (0.04 + h(k, 0, 55) * 0.04) + h(k, 1, 55)) % 1, x = -20 + f * 360, y = 40 + h(k, 2, 55) * 130 + Math.sin(t * 0.6 + k) * 6, r = 2 + h(k, 3, 55) * 3;
    if ((x > 262 && y < 56) || (x < 180 && y < 26)) continue;
    R.disco(x, y, r, (x2, y2, d) => { const c = k < Math.round(dor * 3) ? c_jORO_L : c_jAZUL_L; c_jMezP(R, x2, y2, c, 0.28 * (1 - d * 0.6)); return R.pget(x2, y2); }); }
  if (cerca) for (let y = 164; y < 180; y++) for (let x = 0; x < 30; x++) { const d = Math.hypot((x - 6) / 26, (y - 182) / 18); if (d < 1) R.pset(x, y, c_jTono(c_jROCA, 1.6 + c_jTex(x, y, 56) * 0.5 + (d > 0.85 ? -0.8 : 0) + (y < 168 ? 1 : 0), x, y)); }
  return {};
}

// un personaje del elenco TUMBADO boca arriba (para el lecho y el trance), con la cabeza a la izquierda y la cara hacia
// arriba: lo pinta R.actor de pie en un búfer aparte y lo copia girado un cuarto de vuelta. x: donde empieza la cabeza,
// y: la línea donde apoya la espalda (el lecho: 131 en 'cueva', 140 en 'cerca'). o.cabezaDerecha: la cabeza a la derecha;
// el resto de o va a R.actor (sorpresa, sonrisa, habla…). Devuelve { cabeza: [x, y], pies: [x, y] }.
let c_jTmp = null;

export function c_jTumbado(R, def, x, y, t, o = {}) {
  if (!c_jTmp) c_jTmp = R.nuevo();
  c_jTmp.fill(0);
  const prev = R.usar(c_jTmp);
  R.actor(def, 100, 100, t, { quieto: true, dir: 1, ...o });
  R.usar(prev);
  let i0 = 999, i1 = -1, j0 = 999, j1 = -1;
  for (let j = 50; j <= 104; j++) for (let i = 84; i <= 132; i++) if (c_jTmp[j * 320 + i]) { i0 = Math.min(i0, i); i1 = Math.max(i1, i); j0 = Math.min(j0, j); j1 = Math.max(j1, j); }
  if (i1 < 0) return { cabeza: [x, y], pies: [x, y] };
  const der = !!o.cabezaDerecha, L = j1 - j0;
  for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) { const c = c_jTmp[j * 320 + i]; if (!c) continue;
    R.pset(der ? x + (L - (j - j0)) : x + (j - j0), y - (i - i0), c); }
  // la sombra bajo el cuerpo
  for (let k = 0; k <= L; k++) R.pset(x + k, y + 1, c_jMez(R.pget(x + k, y + 1), hex('#08060a'), 0.4));
  return { cabeza: der ? [x + L - 6, y - 8] : [x + 6, y - 8], pies: der ? [x, y] : [x + L, y] };
}

// un búfer fijo por lienzo y clave: se pinta una sola vez (dibuja) y luego se copia o se lee en cada fotograma
const d1_CACHE = new WeakMap();

function d1_capa(R, clave, dibuja) {
  let m = d1_CACHE.get(R); if (!m) d1_CACHE.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(b); R.usar(prev); m.set(clave, b); }
  return b;
}

// datos que se calculan una vez por lienzo (máscaras, listas de píxeles, distancias)
function d1_dato(R, clave, f) { let m = d1_CACHE.get(R); if (!m) d1_CACHE.set(R, (m = new Map())); if (!m.has('§' + clave)) m.set('§' + clave, f()); return m.get('§' + clave); }

// el píxel «vacío» de las capas con hueco (por donde se ve lo de detrás)
const d1_VACIO = 0x01020304;

// mezcla de dos colores (en el formato de hex(): ABGR) en la proporción u
const d1_mez = (a, b, u) => { u = u < 0 ? 0 : u > 1 ? 1 : u;
  const r = (a & 255) + ((b & 255) - (a & 255)) * u, g = ((a >>> 8) & 255) + (((b >>> 8) & 255) - ((a >>> 8) & 255)) * u, bl = ((a >>> 16) & 255) + (((b >>> 16) & 255) - ((a >>> 16) & 255)) * u;
  return (0xff000000 | (Math.round(bl) << 16) | (Math.round(g) << 8) | Math.round(r)) >>> 0; };

// umbral de Bayer 4×4 (0–1) para las tramas
const d1_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const d1_u = (x, y) => (d1_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// un color de la rampa P con el valor v (0–1), tramado entre los dos vecinos
const d1_rampa = (P, v, x, y) => P[Math.max(0, Math.min(P.length - 1, Math.floor(v * (P.length - 1) + d1_u(x, y))))];

// ruido suave (interpolado) a partir de h
const d1_ruido = (x, y, k = 0) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };

// un píxel si está dentro del lienzo y fuera de las zonas tranquilas (Atom y la barra del año)
const d1_tranquilo = (x, y) => (x >= 276 && y <= 46) || (x >= 18 && x <= 172 && y <= 16) || (x >= 18 && x <= 47 && y <= 21);

// calma la zona de Atom (x 276–319, y 0–46): mezcla lo pintado con el cielo fijo del búfer S para que quede tranquila
function d1_calma(R, S, a = 0.6) { const B = R.buf; for (let y = 0; y < 47; y++) for (let x = 276; x < 320; x++) { const i = y * 320 + x; B[i] = d1_mez(B[i], S[i], a); } }

// una bola llena (sin pasar de la fila yMax), para nubes y copas
function d1_bola(R, cx, cy, r, c, yMax = 999) { for (let y = Math.floor(cy - r); y <= Math.min(yMax, Math.ceil(cy + r)); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) { const dx = x + 0.5 - cx, dy = y + 0.5 - cy; if (dx * dx + dy * dy <= r * r) R.pset(x, y, c); } }

// una nube de tres tonos (P = [sombra, cuerpo, luz]) hecha de bolas, con la panza plana; sem la hace única
function d1_nube(R, cx, cy, w, sem, P) {
  const n = 3 + Math.floor(w / 9), bolas = [], base = Math.round(cy + w * 0.1);
  for (let i = 0; i < n; i++) { const u = i / (n - 1), r = (w * 0.13 + w * 0.13 * Math.sin(u * Math.PI)) * (0.8 + h(sem, i, 3) * 0.4);
    bolas.push([cx + (u - 0.5) * w * 0.82, cy - Math.sin(u * Math.PI) * w * 0.07 - h(sem, i, 4) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) d1_bola(R, x, y + 1, r, P[0], base);
  for (const [x, y, r] of bolas) d1_bola(R, x - 0.5, y - 0.4, r - 0.8, P[1], base - 2);
  for (const [x, y, r] of bolas) d1_bola(R, x - r * 0.28, y - r * 0.38, r * 0.55, P[2], base - 3);
}

// una figurilla de fondo (6–9 px): cabeza, cuerpo y piernas que se alternan al andar; c = [cuerpo, capa o null]
function d1_figura(R, x, y, t, c, anda = true, paraguas = null) {
  x = Math.round(x); y = Math.round(y); const p = anda ? Math.floor(t * 6) % 2 : 0;
  R.pset(x, y - 1, C.k); R.pset(x + 1, y - 1 - p, C.k); R.pset(x - 1 + p, y - 1, C.k);
  R.rect(x - 1, y - 5, x + 1, y - 2, c[0]); if (c[1]) { R.pset(x - 2, y - 4, c[1]); R.pset(x - 2, y - 3, c[1]); R.pset(x - 2, y - 2, c[1]); }
  R.pset(x, y - 6, hex('#e0b090')); R.pset(x, y - 7, hex('#4a3020'));
  if (paraguas) { R.linea(x + 1, y - 7, x + 1, y - 4, C.k); R.rect(x - 2, y - 9, x + 4, y - 9, paraguas); R.rect(x - 1, y - 10, x + 3, y - 10, paraguas); R.pset(x - 2, y - 8, paraguas); R.pset(x + 4, y - 8, paraguas); }
}

// Lo de detrás (el cielo, las colinas, el Sareer, el valle, la aldea, la casa del alero y el prado) va en dos búferes; en
// cada fotograma se mueven las nubes (tres capas), el río (reflejos, ondas de lluvia, dos barcas y la noria), el humo,
// la gente pequeña (vecinos con paraguas y una patrulla de Habladoras), los pájaros, la hierba, los charcos y la lluvia.
const d1_RIO = [[170, 81, 0.7], [166, 85, 1.1], [159, 90, 1.6], [152, 95, 2.2], [156, 100, 2.8], [174, 104, 3.4], [202, 108, 4.2], [234, 113, 5.2], [264, 119, 6.4], [294, 126, 7.8], [336, 133, 9.4]];

const d1_colIzq = (x) => 80 + x * 0.12 + Math.sin(x * 0.07) * 3 + (x > 120 ? (x - 120) * 0.35 : 0);         // la cresta de la colina de la izquierda

const d1_colDer = (x) => 90 - (x - 200) * 0.06 + Math.sin(x * 0.09 + 1) * 2.5 + (x < 222 ? (222 - x) * 0.45 : 0);   // la de la derecha

const d1_lejos = (x) => 69 + Math.sin(x * 0.045) * 2.5 + Math.sin(x * 0.13 + 2) * 1.2;                          // las colinas lejanas

const d1_prado = (x) => 137 + Math.sin(x * 0.045 + 1) * 1.6 + Math.sin(x * 0.16) * 0.8;                         // el borde del prado

const d1_P = {
  cielo: ['#6c8096', '#7a8ea2', '#8a9cae', '#9aaab8', '#aab8c2', '#bac6cc', '#cad2d4'].map(hex),
  nubeLejos: ['#9eacb8', '#b4c0ca', '#cdd6dc'].map(hex), nubeMedia: ['#7e8e9e', '#a0aebb', '#c8d2da'].map(hex), nubeCerca: ['#5e6c7c', '#808e9c', '#aab6c0'].map(hex),
  lejos: ['#6e8a8e', '#7a9696', '#88a2a0', '#97aeaa'].map(hex), bosque: ['#1e4028', '#2a5434', '#3a6a40', '#4e824c', '#6a9a58'].map(hex),
  campo: ['#5a8a44', '#6e9a4c', '#86aa56', '#a2b862', '#bcc070', '#c8b868'].map(hex), seto: hex('#33562e'),
  prado: ['#2e5a2c', '#3c6c34', '#4c7e3c', '#5e9046', '#74a250'].map(hex),
  rio: ['#2e5470', '#3a6a8a', '#4e7e9c', '#6a96b0', '#8ab8d0', '#c4dce6'].map(hex),
  ocre: ['#b8884e', '#cc9c5c', '#dcb06c', '#e8c482'].map(hex), muro: ['#9a7a72', '#b8968a', '#d0b0a0'].map(hex),
  casa: ['#9a7c70', '#b89486', '#cfac9c', '#e2c4b2'].map(hex), teja: ['#5a2a24', '#7a3a30', '#96503c', '#b06a4c'].map(hex),
  piedra: ['#5a5652', '#767068', '#928a7e', '#aea596'].map(hex), madera: ['#3e2a1e', '#5a3e2a', '#76543a'].map(hex),
};

function d1_verdeCielo(R) {
  const P = d1_P;
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) {
    let v = y / 80 + (d1_ruido(x * 0.03, y * 0.08, 41) - 0.5) * 0.18;
    const s = Math.hypot((x - 246) / 70, (y - 46) / 30); v += Math.max(0, 1 - s) * 0.3;   // el sol que se adivina detrás de las nubes
    R.pset(x, y, d1_rampa(P.cielo, v, x, y));
  }
  // el arcoíris tenue: siete bandas mezcladas con el cielo, que se apagan hacia los pies
  const AR = ['#c86a6a', '#d89a5a', '#e0d070', '#8ac078', '#6a9ac8', '#7a78b8', '#9a78b0'].map(hex);
  for (let y = 30; y < 78; y++) for (let x = 90; x < 300; x++) { const d = Math.hypot(x - 204, (y - 152) * 1.02), b = Math.floor(110 - d); if (b < 0 || b > 6) continue;
    const a = 0.34 * Math.min(1, (78 - y) / 22) * (0.7 + 0.3 * Math.sin(x * 0.05)); if (d1_u(x, y) > 0.85) continue; R.pset(x, y, d1_mez(R.pget(x, y), AR[b], a)); }
}

function d1_verdeTierra(R, B) {
  const P = d1_P, { pset, rect, linea, poligono } = R; B.fill(d1_VACIO);
  // colinas lejanas, azuladas por la bruma, con copas diminutas
  for (let x = 0; x < 320; x++) { const c = Math.round(d1_lejos(x)); for (let y = c; y < 100; y++) { const v = 0.2 + (y - c) / 18 + (h(x, y, 7) < 0.25 ? -0.15 : 0) + (d1_ruido(x * 0.2, y * 0.3, 8) - 0.5) * 0.3; pset(x, y, d1_rampa(P.lejos, v, x, y)); }
    if (h(x, 1, 9) < 0.5) pset(x, c - 1, P.lejos[1]); }
  // EL SAREER: la franja ocre en el horizonte (x 200–300), con dunitas y su muro (el de atrás fino; el de delante con torres)
  for (let x = 196; x <= 304; x++) { const ed = Math.min(x - 196, 304 - x), top = 72 + (ed < 6 ? 6 - ed : 0) * 0.5;
    for (let y = Math.round(top); y <= 79; y++) { const v = 0.55 + Math.sin(x * 0.5 + y * 1.4 + Math.sin(x * 0.11) * 3) * 0.3 - (y - 72) * 0.04; pset(x, y, d1_mez(d1_rampa(P.ocre, v, x, y), P.cielo[6], 0.22)); } }
  for (let x = 198; x <= 302; x++) { pset(x, 71, d1_mez(P.muro[1], P.cielo[6], 0.3)); pset(x, 79, P.muro[2]); pset(x, 80, P.muro[1]); pset(x, 81, d1_mez(P.muro[0], P.lejos[1], 0.4)); }
  for (let x = 200; x <= 300; x += 14) { rect(x, 76, x + 2, 80, P.muro[1]); rect(x, 76, x, 80, P.muro[2]); pset(x + 1, 75, P.muro[0]); }
  // el valle: un mosaico de campos en perspectiva, con setos y surcos
  for (let y = 78; y < 140; y++) { const z = (y - 78) / 62, ch = 3 + z * 9; for (let x = 0; x < 320; x++) { if (y < d1_lejos(x) + 5) continue;
    const u = (x - 160) / (0.4 + z) + 400, cx = Math.floor(u / 34), cy = Math.floor((y - 78) / ch + h(cx, 2, 11) * 0.8), id = h(cx, cy, 12);
    const fu = (u / 34) % 1, fy = ((y - 78) / ch + h(cx, 2, 11) * 0.8) % 1;
    let c = d1_rampa(P.campo, id * 0.9 + (Math.sin(u * 0.9 + y * 0.2) > 0.6 ? 0.12 : 0) + (h(x, y, 13) - 0.5) * 0.12, x, y);
    if (fu < 0.05 || fy < 0.12) c = h(x, y, 14) < 0.6 ? P.seto : P.bosque[2];
    pset(x, y, d1_mez(c, P.lejos[3], (1 - z) * 0.35)); } }
  // las dos colinas del medio, cubiertas de bosque (copas con luz arriba a la izquierda) hasta su pie
  const copas = (cresta, x0, x1, pie) => {
    for (let x = x0; x <= x1; x++) { const c = Math.round(cresta(x)), p = pie(x); for (let y = c + 1; y <= p; y++) pset(x, y, d1_rampa(P.bosque, 0.15 + (h(x >> 1, y >> 1, 15) * 0.25), x, y)); }
    for (let yy = 70; yy <= 140; yy += 4) for (let xx = x0 - 2; xx <= x1 + 2; xx += 6) { const x = xx + (yy % 8 ? 3 : 0) + (h(xx, yy, 16) - 0.5) * 2, c = cresta(x), p = pie(x); if (yy < c || yy > p - 1) continue;
      const r = 2.8 + h(xx, yy, 17) * 1.1, d = Math.min(1, (yy - c) / 30);
      const nv = d1_ruido(x * 0.045, yy * 0.09, 44) - d * 0.25, ic = nv > 0.6 ? 3 : nv < 0.3 ? 1 : 2;   // claros de otras especies y vaguadas en sombra
      d1_bola(R, x + 0.8, yy + 0.8, r, P.bosque[0], p); d1_bola(R, x - 0.2, yy - 0.2, r - 0.9, P.bosque[ic], p); d1_bola(R, x - 1, yy - 1.1, r * 0.45, P.bosque[Math.min(4, ic + 1)], p);
      if (h(xx, yy, 45) < 0.12) { const cx = Math.round(x + 1), cy = Math.round(yy + 1); for (let j = 0; j < 6; j++) for (let i = -Math.floor(j / 2); i <= Math.floor(j / 2); i++) if (cy - 5 + j <= p) pset(cx + i, cy - 5 + j, i < 0 ? P.bosque[2] : P.bosque[0]); } } };
  copas(d1_colIzq, -4, 158, (x) => 128 - x * 0.1);
  copas(d1_colDer, 206, 324, (x) => 103 + (x - 206) * 0.16);
  // terrazas de cultivo en el flanco de la colina de la izquierda: bandas curvas con su murete oscuro y las matas
  for (let y = 92; y < 124; y++) for (let x = 64; x < 156; x++) { if (y < d1_colIzq(x) + 5 || y > 128 - x * 0.1 - 1 || x < 64 + (124 - y) * 0.9) continue;
    const b = (y - x * 0.16 + Math.sin(x * 0.08) * 2), k = Math.floor(b / 3.4), f = b / 3.4 - k;
    pset(x, y, f < 0.24 ? P.seto : d1_rampa(P.campo, 0.25 + h(k, 0, 19) * 0.6 + ((x + k * 3) % 4 === 0 ? 0.15 : 0), x, y)); }
  // el río: la máscara se guarda para animarlo; aquí, la orilla húmeda (un filo oscuro) y un fondo de agua
  const M = d1_dato(R, 'verde:rio', () => { const m = new Uint8Array(320 * 180);
    for (let i = 0; i < d1_RIO.length - 1; i++) { const [ax, ay, ar] = d1_RIO[i], [bx, by, br] = d1_RIO[i + 1], n = Math.ceil(Math.hypot(bx - ax, by - ay));
      for (let s = 0; s <= n; s++) { const u = s / n, cx = ax + (bx - ax) * u, cy = ay + (by - ay) * u, r = ar + (br - ar) * u;
        for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r * 2.6); x <= Math.ceil(cx + r * 2.6); x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue; const dx = (x + 0.5 - cx) / (r * 2.6), dy = (y + 0.5 - cy) / r; if (dx * dx + dy * dy <= 1) m[y * 320 + x] = 1; } } }
    return m; });
  for (let y = 78; y < 145; y++) for (let x = 0; x < 320; x++) { if (!M[y * 320 + x]) continue; pset(x, y, P.rio[1]); if (!M[(y + 1) * 320 + x]) pset(x, y + 1, P.bosque[0]); if (!M[(y - 1) * 320 + x] && h(x, y, 20) < 0.7) pset(x, y - 1, P.seto); }
  // álamos en fila junto a la orilla de delante (columnas de copa estrecha con luz a la izquierda)
  for (const [x, y, a] of [[184, 114, 14], [196, 116, 15], [226, 120, 16], [238, 122, 15], [276, 131, 17]]) { for (let j = 0; j < a; j++) { const w = Math.round(Math.sin((j + 1) / (a + 1) * Math.PI) * 2.4);
      for (let i = -w; i <= w; i++) pset(x + i, y - 2 - j, P.bosque[i < 0 ? 3 : i === 0 ? 2 : 1 - (j % 3 === 0 ? 1 : 0)]); }
    linea(x, y, x, y - 2, P.madera[0]); }
  // la aldea: casas iguales en filas, de piedra rosada y tejado rojo, con su ventanita y su puerta, y un camino
  for (let y = 120; y < 136; y += 1) for (let x = 92; x < 232; x++) if (Math.abs(y - (124.5 + (x - 92) * 0.02)) < 0.6) pset(x, y, P.campo[5]);
  const casa = (x, y) => { rect(x, y - 5, x + 6, y, P.casa[2]); rect(x + 5, y - 5, x + 6, y, P.casa[0]); rect(x, y - 5, x + 6, y - 5, P.casa[1]);
    poligono([[x - 1, y - 5], [x + 3.5, y - 9], [x + 8, y - 5]], P.teja[2]); linea(x - 1, y - 5, x + 7, y - 5, P.teja[0]); linea(x + 3, y - 8, x + 6, y - 6, P.teja[1]); pset(x + 3, y - 9, P.teja[3]);
    pset(x + 1, y - 3, hex('#3a3040')); pset(x + 4, y - 2, P.madera[1]); pset(x + 4, y - 1, P.madera[1]); pset(x + 6, y - 10, P.piedra[1]); pset(x + 6, y - 9, P.piedra[1]); };
  for (const [y, x0, x1] of [[120, 112, 196], [128, 100, 214], [135, 92, 226]]) for (let x = x0; x <= x1; x += 11) { if (M[(y - 4) * 320 + x + 3]) continue; casa(x, y); }
  // el molino con su rueda (la rueda gira en cada fotograma), en la orilla de enfrente
  rect(246, 104, 258, 112, P.casa[2]); rect(255, 104, 258, 112, P.casa[0]); poligono([[244, 104], [252, 98], [260, 104]], P.teja[2]); linea(244, 104, 260, 104, P.teja[0]); rect(249, 107, 251, 109, hex('#3a3040')); rect(253, 108, 254, 112, P.madera[1]);
  // el prado de delante: hierba con matas y flores, un camino de losas mojadas y charcos que reflejan el cielo
  for (let x = 0; x < 320; x++) { const c = Math.round(d1_prado(x)); for (let y = c; y < 180; y++) { const z = (y - c) / 44;
    let v = 0.35 + z * 0.35 + (d1_ruido(x * 0.12, y * 0.25, 21) - 0.5) * 0.5; if (h(x, y, 22) < 0.12 + z * 0.1) v -= 0.3; if (((x * 3 + y * 7) % 11) === 0 && h(x, y, 23) < 0.5) v += 0.25;
    pset(x, y, d1_rampa(P.prado, v, x, y)); }
    if (h(x, 2, 24) < 0.4) pset(x, c - 1, P.prado[2]); }
  // matas oscuras y flores (amarillas, blancas, moradas)
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 25) * 320), y = Math.round(d1_prado(x) + 3 + h(k, 2, 25) * 40); for (let j = 0; j < 3 + (y - 137) / 10; j++) { pset(x - 1 + (j % 3), y - j, P.prado[j % 2]); } }
  const FL = ['#e8d060', '#f0ece0', '#b088c8', '#e89a6a'].map(hex);
  for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 3, 26) * 320), y = Math.round(d1_prado(x) + 2 + h(k, 4, 26) * 42); pset(x, y, FL[k % 4]); pset(x, y + 1, P.prado[0]); }
  // el camino de losas: de la puerta de la casa hacia abajo a la derecha, losas irregulares con junta y brillo de mojado
  for (let y = 144; y < 180; y++) { const cx = 46 + (y - 144) * 2.6 + Math.sin(y * 0.15) * 3, w = 9 + (y - 144) * 0.45;
    for (let x = Math.floor(cx - w); x <= cx + w; x++) { const u = (x + Math.floor((y - 144) / 5) * 4) % 9, lo = (y - 144) % 6 === 0 || u === 0, ed = Math.abs(x - cx) > w - 1;
      if (ed && h(x, y, 27) < 0.5) continue; pset(x, y, lo ? P.piedra[0] : d1_rampa(P.piedra, 0.45 + (h(x >> 2, y >> 2, 28) - 0.5) * 0.5 + ((x + y) % 7 === 0 ? 0.3 : 0), x, y)); } }
  // la valla de madera a la derecha, por detrás de los personajes (base y 146)
  for (let x = 214; x < 322; x += 13) { rect(x, 132, x + 1, 146, P.madera[1]); pset(x, 132, P.madera[2]); rect(x + 2, 133, x + 2, 146, P.madera[0]); }
  for (const y of [135, 141]) { linea(214, y, 320, y - 2, P.madera[2]); linea(214, y + 1, 320, y - 1, P.madera[0]); }
  // el mojón del imperio junto al camino: un poste de piedra con el anillo del gusano (sin letras)
  rect(296, 128, 305, 150, P.casa[1]); rect(303, 128, 305, 150, P.casa[0]); rect(296, 128, 305, 129, P.casa[3]); rect(294, 148, 307, 150, P.piedra[1]);
  R.anillo(300.5, 137.5, 3, C.bronce); pset(300, 134, C.bronceL); pset(304, 137, C.bronce);
  // LA CASA DEL ALERO (izquierda, x 0–60): pared de piedra rosada con hiladas, ventana con luz cálida y jardinera,
  // puerta de tablas, zócalo de piedra, tonel de lluvia, y el tejado de tejas que acaba en el alero (x 66, y 104)
  for (let y = 104; y <= 150; y++) for (let x = 0; x <= 60; x++) { const fila = Math.floor((y - 104) / 4), u = (x + (fila % 2) * 5) % 10, junta = (y - 104) % 4 === 3 || u === 0;
    let v = 0.55 + (h(fila, Math.floor((x + (fila % 2) * 5) / 10), 29) - 0.5) * 0.35 - (y < 112 ? (112 - y) * 0.06 : 0) - (x > 56 ? 0.3 : 0);
    pset(x, y, junta ? P.casa[0] : d1_rampa(P.casa, v, x, y)); }
  for (let y = 140; y <= 150; y++) for (let x = 0; x <= 61; x++) pset(x, y, (y - 140) % 5 === 4 || (x + (y > 144 ? 4 : 0)) % 9 === 0 ? P.piedra[0] : d1_rampa(P.piedra, 0.5 + (h(x >> 2, y, 30) - 0.5) * 0.4, x, y));
  rect(8, 116, 24, 130, P.madera[0]); rect(9, 117, 23, 129, hex('#f0c070')); rect(9, 117, 23, 120, hex('#f8dc98')); rect(16, 117, 16, 129, P.madera[1]); rect(9, 123, 23, 123, P.madera[1]);
  pset(11, 125, hex('#c88a48')); pset(20, 126, hex('#c88a48')); rect(7, 130, 25, 132, P.madera[1]); rect(7, 130, 25, 130, P.madera[2]);
  for (let x = 8; x <= 24; x += 2) { pset(x, 129, P.bosque[3]); pset(x + 1, 128, x % 4 ? FL[0] : FL[3]); }
  rect(34, 120, 48, 150, P.madera[0]); for (let x = 35; x <= 47; x++) for (let y = 121; y <= 150; y++) pset(x, y, (x - 35) % 4 === 3 ? P.madera[0] : d1_rampa(P.madera, 0.55 + (h(x, y >> 3, 31) - 0.5) * 0.4, x, y));
  rect(35, 121, 47, 121, P.madera[2]); pset(45, 136, C.bronceL); pset(45, 137, C.bronce); rect(33, 150, 49, 151, P.piedra[0]);
  // el tonel de lluvia junto a la puerta (x 50–58): duelas, aros y agua arriba
  for (let y = 134; y <= 150; y++) { const w = 4 + (y > 137 && y < 147 ? 1 : 0); for (let x = 54 - w; x <= 54 + w; x++) pset(x, y, (x - 54 + w) % 3 === 0 ? P.madera[0] : x > 55 ? P.madera[1] : P.madera[2]); }
  for (const y of [137, 146]) rect(49, y, 59, y, P.piedra[0]); rect(50, 134, 58, 134, P.rio[3]); pset(52, 134, P.rio[5]);
  // el tejado: tejas en hileras, más oscuras bajo el canto, con el borde del alero
  poligono([[0, 80], [54, 80], [69, 104], [0, 104]], (x, y) => { const fila = Math.floor((y - 80) / 3), u = (x + (fila % 2) * 3) % 6;
    return (y - 80) % 3 === 2 ? P.teja[0] : u === 0 ? P.teja[1] : d1_rampa(P.teja, 0.62 + (h(fila, x >> 2, 32) - 0.5) * 0.3 - (y - 80) * 0.012, x, y); });
  linea(54, 80, 69, 104, P.teja[0]); linea(55, 80, 70, 104, P.teja[1]); rect(0, 104, 69, 105, P.teja[0]); rect(0, 106, 60, 108, d1_mez(P.casa[0], hex('#2a2024'), 0.4));
  rect(0, 79, 54, 79, P.teja[3]);
  // la chimenea de la casa (el humo, en cada fotograma)
  rect(14, 70, 21, 82, P.piedra[2]); rect(19, 70, 21, 82, P.piedra[0]); rect(13, 69, 22, 70, P.piedra[1]); for (let y = 72; y < 82; y += 3) linea(14, y, 18, y, P.piedra[1]);
}

function d_verde(R, t, o = {}) {
  const P = d1_P, lluvia = o.lluvia ?? 0.6, { pset } = R;
  const CI = d1_capa(R, 'verde:cielo', () => d1_verdeCielo(R)); R.copiar(CI);
  // las nubes, en tres capas a tres velocidades (las de cerca, más oscuras, cargadas de lluvia, y más deprisa)
  const capa = (n, y0, w0, v, P3, sem) => { for (let k = 0; k < n; k++) { const w = w0 + h(k, sem, 1) * w0 * 0.5, per = 320 + w * 2, x = ((h(k, sem, 2) * per + t * v) % per) - w, y = y0 + h(k, sem, 3) * 10; d1_nube(R, x, y, w, k + sem * 10, P3); } };
  capa(5, 58, 18, 0.9, P.nubeLejos, 1); capa(4, 36, 30, 1.7, P.nubeMedia, 2); capa(3, 12, 46, 2.8, P.nubeCerca, 3); d1_calma(R, CI);
  // la tierra encima (lo que no es cielo)
  const T2 = d1_capa(R, 'verde:tierra', (b) => d1_verdeTierra(R, b)), B = R.buf;
  for (let i = 60 * 320; i < 112 * 320; i++) { const c = T2[i]; if (c !== d1_VACIO) B[i] = c; }
  B.set(T2.subarray(112 * 320), 112 * 320);
  // la lluvia lejana: cortinas grises que cuelgan de las nubes sobre las colinas (tramadas, se mueven con el viento)
  for (let y = 40; y < 98; y++) for (let x = 0; x < 320; x++) { const xs = x + (98 - y) * 0.35 - t * 6, d = Math.sin(xs * 0.035) * 0.5 + Math.sin(xs * 0.011 + 1) * 0.5;
    if (d < 0.35 || d1_u(x, y + Math.floor(t * 30)) > (d - 0.35) * 0.9 * lluvia) continue; pset(x, y, d1_mez(B[y * 320 + x], P.cielo[3], 0.45)); }
  // jirones de niebla que se arrastran por las laderas del bosque (dos bandas, a distinta velocidad)
  for (const [y0, v, sem] of [[88, 3, 1], [100, -2, 2], [80, 1.5, 3]]) for (let k = 0; k < 3; k++) { const w = 40 + h(k, sem, 42) * 30, x0 = ((h(k, sem, 43) * 400 + t * v) % 400 + 400) % 400 - 60;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), e = Math.sin(i / w * Math.PI); if (x < 0 || x > 319) continue; for (let j = -2; j <= 2; j++) { const y = y0 + j + Math.round(Math.sin((x + k * 30) * 0.08) * 2); if (h(x, y + Math.floor(t * 3), 46) > e * (1 - Math.abs(j) * 0.3) * 0.7) continue; pset(x, y, d1_mez(B[y * 320 + x], P.cielo[6], 0.4)); } } }
  // el río: el agua que corre (vetas que bajan hacia la derecha), el cielo reflejado y los anillos de las gotas
  const M = d1_dato(R, 'verde:rio', () => null), L = d1_dato(R, 'verde:rioL', () => { const l = []; for (let i = 0; i < 320 * 180; i++) if (M[i]) l.push(i); return Int32Array.from(l); });
  for (const i of L) { const x = i % 320, y = (i / 320) | 0, z = (y - 80) / 55;
    let v = 0.3 + z * 0.15 + Math.sin(x * 0.35 - t * 2.2 + Math.sin(y * 0.9) * 2) * 0.18 + (Math.sin(x * 0.08 + y * 0.6 - t * 1.3) > 0.85 ? 0.35 : 0);
    if (!M[i - 320]) v -= 0.2; B[i] = d1_rampa(P.rio, v, x, y); }
  for (let k = 0; k < 14; k++) { const per = 1.3, u = ((t + h(k, 1, 33) * per) % per) / per, j = L[Math.floor(h(k, Math.floor((t + h(k, 1, 33) * per) / per), 34) * L.length)], x = j % 320, y = (j / 320) | 0, r = 0.5 + u * 2.5;
    if (u < 0.85) for (let a = 0; a < 12; a++) { const xx = Math.round(x + Math.cos(a * 0.52) * r * 2), yy = Math.round(y + Math.sin(a * 0.52) * r * 0.7); if (M[yy * 320 + xx]) pset(xx, yy, P.rio[u < 0.4 ? 5 : 4]); } }
  // dos barcas que bajan por el río (casco, un barquero con pértiga, la estela)
  const enRio = (s) => { const f = s * (d1_RIO.length - 1), i = Math.min(d1_RIO.length - 2, Math.floor(f)), u = f - i; return [d1_RIO[i][0] + (d1_RIO[i + 1][0] - d1_RIO[i][0]) * u, d1_RIO[i][1] + (d1_RIO[i + 1][1] - d1_RIO[i][1]) * u, d1_RIO[i][2] + (d1_RIO[i + 1][2] - d1_RIO[i][2]) * u]; };
  for (let k = 0; k < 2; k++) { const s = (0.35 + k * 0.33 + t * 0.012) % 1, [bx, by, br] = enRio(s), x = Math.round(bx), y = Math.round(by + br * 0.2), l = Math.max(2, Math.round(br * 0.9));
    for (let i = 1; i < 5 + l; i++) if (M[(y + 1) * 320 + x - i * 2] && (i + Math.floor(t * 4)) % 2) pset(x - l - i * 2, y + 1, P.rio[4]);
    R.rect(x - l, y - 1, x + l, y, P.madera[1]); R.rect(x - l + 1, y + 1, x + l - 1, y + 1, P.madera[0]); R.rect(x - l, y - 1, x + l, y - 1, P.madera[2]);
    if (br > 3) { d1_figura(R, x, y - 1, t, [hex('#6a5a48'), null], false); R.linea(x + 2, y - 7, x + 4 + Math.round(Math.sin(t * 1.5)), y + 1, P.madera[0]); } }
  // la noria del molino (centro x 262, y 110), que gira y salpica
  { const cx = 262, cy = 110, a0 = t * 1.6; for (let r = 4; r <= 5; r++) R.anillo(cx + 0.5, cy + 0.5, r, P.madera[r === 5 ? 0 : 1]);
    for (let k = 0; k < 8; k++) { const a = a0 + k * Math.PI / 4; R.linea(cx, cy, cx + Math.round(Math.cos(a) * 5), cy + Math.round(Math.sin(a) * 5), P.madera[2]); }
    pset(cx, cy, P.madera[0]); for (let k = 0; k < 3; k++) { const f = (t * 2 + k / 3) % 1; pset(cx + 5 + Math.round(f * 3), cy + 4 + Math.round(f * f * 3), P.rio[5]); } }
  // el humo de las chimeneas, que el viento tumba hacia la derecha
  for (const [x0, y0, n] of [[17, 68, 9], [118, 110, 5], [151, 117, 5], [184, 110, 5]]) for (let k = 0; k < n; k++) { const f = ((t * 0.5 + k / n) % 1), x = x0 + f * f * 22 + Math.sin(t * 1.2 + k) * 1.2, y = y0 - f * (n * 2.2);
    const c = d1_mez(P.cielo[5], P.cielo[2], f); if (n > 6) d1_bola(R, x, y, 1.2 + f * 2.2, c); else { pset(Math.round(x), Math.round(y), c); if (f < 0.6) pset(Math.round(x) + 1, Math.round(y), c); } }
  // la gente pequeña: vecinos con paraguas por el camino de la aldea y una patrulla de Habladoras por la orilla
  const PAR = ['#a83a3a', '#3a5a8a', '#d8b040'].map(hex);
  for (let k = 0; k < 3; k++) { const per = 70, f = ((t * (3 + k) / per + h(k, 1, 35)) % 1), dir = k % 2 ? -1 : 1, x = dir > 0 ? 92 + f * 140 : 232 - f * 140, y = 125 + (x - 92) * 0.02;
    d1_figura(R, x, y, t + k, [d1_mez(PAR[(k + 1) % 3], P.casa[1], 0.5), null], true, PAR[k]); }
  for (let k = 0; k < 2; k++) { const f = (t * 0.035) % 2, g = f < 1 ? f : 2 - f, x = 186 + g * 70 + k * 5, y = 101 + (x - 186) * 0.08;
    d1_figura(R, x, y, t, [hex('#5a6a80'), hex('#6a3a7a')], true); }
  // pájaros que cruzan el valle bajo las nubes
  for (let k = 0; k < 3; k++) { const x = ((h(k, 4, 36) * 360 + t * (14 + k * 3)) % 360) - 20, y = 64 + k * 5 + Math.sin(t * 2 + k) * 2, a = Math.sin(t * 9 + k * 2) > 0 ? 1 : 0;
    if (d1_tranquilo(x, y)) continue; pset(x, y, C.k); pset(x - 1, y - a, C.k); pset(x + 1, y - a, C.k); pset(x - 2, y - 1 + a, C.k); pset(x + 2, y - 1 + a, C.k); }
  // matas altas en el borde del prado que el viento mece
  for (let k = 0; k < 26; k++) { const x0 = Math.round(h(k, 5, 37) * 300 + 10), y0 = Math.round(d1_prado(x0)) + 1, a = 4 + Math.round(h(k, 6, 37) * 3), s = Math.sin(t * 2.2 + x0 * 0.1) * 1.3;
    if (x0 < 70 || (x0 > 286 && x0 < 308)) continue; for (let j = 0; j < a; j++) { const xx = Math.round(x0 + s * j / a); pset(xx, y0 - j, P.prado[j > a - 2 ? 4 : 2]); pset(xx + 2, y0 - j + 1, P.prado[3]); } }
  // charcos en el prado: el cielo reflejado y los anillos de las gotas que caen
  for (const [cx, cy, w] of [[118, 166, 10], [210, 158, 8], [258, 172, 12], [150, 176, 7]]) { for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - w; x <= cx + w; x++) { const d = ((x - cx) / w) ** 2 + ((y - cy) / 2.4) ** 2; if (d > 1) continue; pset(x, y, d1_rampa(P.rio, 0.6 + (cy - y) * 0.1 + Math.sin(x * 0.6 + t) * 0.1, x, y)); }
    const per = 0.9, u = ((t + cx * 0.01) % per) / per, rx = Math.round(cx + (h(cx, Math.floor((t + cx * 0.01) / per), 38) - 0.5) * w), r = u * 4;
    for (let a = 0; a < 10; a++) { const xx = Math.round(rx + Math.cos(a * 0.63) * r), yy = Math.round(cy + Math.sin(a * 0.63) * r * 0.4); if (((xx - cx) / w) ** 2 + ((yy - cy) / 2.4) ** 2 < 1) pset(xx, yy, P.rio[5]); } }
  // la luz de la ventana, que tiembla un poco (una lámpara de aceite)
  if (Math.sin(t * 7) + Math.sin(t * 11.3) > 1.2) { R.pset(12, 126, hex('#fff0c0')); R.pset(19, 127, hex('#fff0c0')); }
  // las gotas que gotean por el alero (unas pequeñas) y LA GOTA grande del gag, cada 2 s en (66, 105)
  for (const x of [12, 30, 48]) { const f = ((t * 0.9 + x * 0.07) % 1); if (f > 0.7) pset(x, Math.round(106 + (f - 0.7) / 0.3 * 44), P.rio[5]); else pset(x, 106, P.rio[4]); }
  let fase = 0;
  if (o.gota !== false) { fase = (t % 2) / 2; const gx = 66;
    const gota = (x, y, r) => { d1_bola(R, x + 0.5, y, r, P.rio[2]); d1_bola(R, x + 0.2, y - 0.3, r - 0.6, P.rio[4]); pset(x, Math.round(y - r) - 1, P.rio[3]); pset(x - 1 + Math.round(r * 0.3), Math.round(y - r * 0.4), P.rio[5]); };
    if (fase < 0.72) gota(gx, 106 + fase * 2.4, 0.8 + fase * 1.8);   // la gota que engorda colgada del alero
    else { const g = (fase - 0.72) / 0.28, y = 109 + g * g * 41; gota(gx, y, 2.1); if (g > 0.9) { pset(gx - 3, 149, P.rio[5]); pset(gx + 4, 149, P.rio[5]); pset(gx - 2, 148, P.rio[4]); pset(gx + 3, 148, P.rio[4]); } }
  }
  // la lluvia, en dos capas por detrás de los personajes (fina y lejana; media), en diagonal
  const gotas = (n, lar, vel, col, sem, y0) => { for (let k = 0; k < n; k++) { const x0 = h(k, sem, 1) * 360, y = ((h(k, sem, 2) * 200 + t * vel) % 200) - 20 + y0 * 0, x = Math.round(x0 - y * 0.3 - 10);
      if (y < -lar || d1_tranquilo(x, y)) continue; for (let j = 0; j < lar; j++) pset(x + Math.round(j * 0.3), Math.round(y + j), col); } };
  gotas(Math.round(160 * lluvia), 2, 140, d1_mez(P.cielo[5], P.rio[3], 0.3), 5, 0);
  gotas(Math.round(90 * lluvia), 4, 210, hex('#b8c8d4'), 6, 0);
  return { suelo: 150, libre: [30, 280], gota: [66, 106], gotaFase: fase, alero: [0, 69, 104], puerta: [34, 48, 150], ventana: [8, 116, 24, 130], tonel: [54, 150], mojon: [300, 150], sareer: [200, 300, 71, 81], rio: [[152, 95], [234, 113], [320, 132]], molino: [262, 110], valla: [214, 320, 146], aldea: [92, 226, 118, 136] };
}

// la lluvia de primer término (gruesa, rápida y clara) y las salpicaduras en el suelo, por delante de los personajes
function d_verdeDelante(R, t, o = {}) {
  const lluvia = o.lluvia ?? 0.6, c = hex('#d4e0e8'), c2 = hex('#9ab0c0');
  for (let k = 0; k < Math.round(46 * lluvia); k++) { const x0 = h(k, 7, 1) * 380, y = ((h(k, 7, 2) * 220 + t * 300) % 220) - 30, x = Math.round(x0 - y * 0.3 - 20);
    if (d1_tranquilo(x, y)) continue; for (let j = 0; j < 7; j++) R.pset(x + Math.round(j * 0.3), Math.round(y + j), j < 2 ? c2 : c); }
  for (let k = 0; k < Math.round(16 * lluvia); k++) { const per = 0.5, f = ((t + h(k, 8, 1) * per) % per) / per, n = Math.floor((t + h(k, 8, 1) * per) / per), x = Math.round(h(k, n, 39) * 320), y = Math.round(152 + h(k, n, 40) * 26);
    if (f < 0.5) { R.pset(x, y - 1 - Math.round(f * 4), c); R.pset(x - 1 - Math.round(f * 2), y - Math.round(f * 3), c); R.pset(x + 1 + Math.round(f * 2), y - Math.round(f * 3), c); } }
  return {};
}

// El último desierto: dunas anaranjadas en tres términos (con su cara al sol y su cara de sombra y las ondas del viento),
// el muro alto que lo rodea con el bosque asomando detrás, la torre de vigía de las Habladoras (x 232–256) con su
// estandarte del anillo y una guardiana que hace la ronda, el sol que se pone sobre el muro (x 118, y 76) y el cielo de
// ocaso con nubes largas encendidas por debajo; en cada fotograma: nubes, estandarte, ronda, polvo que vuela de las
// crestas, pájaros que vuelven al bosque y el farol de la torre.
const d1_PS = {
  cielo: ['#2e2450', '#4a2e5e', '#723a66', '#a04a66', '#c85e5e', '#e07a52', '#f09a58', '#f8bc6a', '#fcd888'].map(hex),
  nube: ['#6a3a5e', '#c25e62', '#f4a070'].map(hex), nube2: ['#52305a', '#9a4a66', '#e08a6a'].map(hex),
  muro: ['#4a2a40', '#5e3448', '#744456', '#8a5462'].map(hex), filo: hex('#f6a870'), bosque: ['#1e2430', '#2a3036', '#3a3a3a', '#58483e'].map(hex),
  luz: ['#c8703e', '#dc8648', '#eaa056', '#f4ba6a', '#fad28a'].map(hex), sombra: ['#6a3040', '#843c42', '#9e4c46', '#b45e4a'].map(hex),
  torre: ['#4a2a3a', '#6a3a46', '#8e5050', '#c27060', '#e89070'].map(hex),
};

// las dunas de un término: [x del pico, y del pico, ancho a barlovento (izquierda, al sol), ancho de sotavento, alto]
const d1_DUNAS = [
  [[8, 99, 28, 20, 9], [58, 97, 34, 24, 10], [126, 100, 28, 20, 8], [184, 98, 32, 26, 10], [268, 99, 36, 22, 9], [318, 97, 30, 20, 9]],
  [[-12, 111, 40, 30, 16], [72, 108, 50, 36, 18], [158, 113, 44, 30, 14], [232, 107, 50, 40, 18], [326, 110, 40, 30, 16]],
  [[34, 130, 70, 56, 26], [196, 133, 80, 64, 24], [336, 128, 60, 40, 26]],
];

// la cresta de un término en x: la duna más alta allí, de qué lado de su pico cae (1 = al sol) y la duna
const d1_duna = (L, x) => { let best = 999, lado = 0, pk = null;
  for (const d of L) { const [px, py, wl, wr, al] = d, iz = x < px, s = iz ? (px - x) / wl : (x - px) / wr, y = py + al * (1 - 1 / (1 + Math.pow(s, 1.5) * (iz ? 1.3 : 2.6)));
    if (y < best) { best = y; lado = iz ? 1 : -1; pk = d; } }
  return [best, lado, pk]; };

function d1_sareerCielo(R) {
  const P = d1_PS;
  for (let y = 0; y < 110; y++) for (let x = 0; x < 320; x++) { const s = Math.hypot((x - 118) / 1.6, y - 76); let v = y / 84 + Math.max(0, 1 - s / 120) * 0.35 + (d1_ruido(x * 0.02, y * 0.1, 51) - 0.5) * 0.1; R.pset(x, y, d1_rampa(P.cielo, v, x, y)); }
  R.halo(118, 76, 30, [P.cielo[7], P.cielo[8]], 1.1);
  d1_bola(R, 118.5, 76.5, 9, hex('#fff0b0')); d1_bola(R, 117, 75, 6, hex('#fffbe0'));
  for (let y = 68; y < 86; y += 3) for (let x = 108; x < 130; x++) if (Math.abs(x - 118) < 9 && y > 72 && (x + y) % 2) R.pset(x, y, hex('#f8d890'));
}

function d1_sareerTierra(R, B) {
  const P = d1_PS, { pset, rect, linea } = R; B.fill(d1_VACIO);
  // el bosque que asoma por encima del muro: copas redondas en contraluz con el filo encendido
  for (let k = 0; k < 64; k++) { const x = k * 5.2 + h(k, 1, 52) * 3 - 4, r = 3 + h(k, 2, 52) * 3, y = 79 - r * 0.6 - h(k, 3, 52) * 3; if (x > 104 && x < 134) continue;
    d1_bola(R, x, y, r, P.bosque[1]); d1_bola(R, x - 0.6, y - 0.5, r - 1, P.bosque[2]); for (let a = -2; a <= 1; a++) pset(Math.round(x + a), Math.round(y - r + 0.6 + Math.abs(a) * 0.4), P.bosque[3]); }
  // el muro alto: sillares en sombra (está a contraluz), contrafuertes cada 40 px, la albardilla encendida por el sol
  for (let y = 78; y <= 104; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 78) / 4), u = (x + (fila % 2) * 6) % 12, junta = (y - 78) % 4 === 3 || u === 0, cf = (x % 40) < 6;
    let v = 0.5 + (h(fila, Math.floor((x + (fila % 2) * 6) / 12), 53) - 0.5) * 0.4 - (y - 78) * 0.012 + (cf ? (x % 40 < 2 ? 0.35 : -0.25) : 0) + Math.max(0, 1 - Math.abs(x - 118) / 60) * 0.3;
    pset(x, y, junta ? P.muro[0] : d1_rampa(P.muro, v, x, y)); }
  for (let x = 0; x < 320; x++) { pset(x, 77, d1_mez(P.filo, P.muro[3], Math.min(1, Math.abs(x - 118) / 160))); pset(x, 78, P.muro[1]); if (x % 40 < 6) { pset(x, 76, P.muro[2]); if (x % 40 < 2) pset(x, 76, P.filo); } }
  // pendones verdes con el anillo del gusano colgados del muro (se mecen en cada fotograma: aquí, la barra que los sujeta)
  for (const x of [20, 100, 180, 300]) { rect(x - 1, 80, x + 9, 80, C.bronce); pset(x - 1, 79, C.bronceL); pset(x + 9, 79, C.bronceL); }
  // manchas de humedad y desconchones en el muro
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 57) * 320), y = Math.round(82 + h(k, 2, 57) * 18); if ((x - 118) ** 2 < 100) continue; pset(x, y, P.muro[0]); pset(x + 1, y, P.muro[k % 2 ? 0 : 3]); if (k % 3 === 0) pset(x, y + 1, P.muro[0]); }
  // la torre de vigía de las Habladoras (x 232–256, de y 36 a 104): sillares, almenas, una saetera con luz y la puerta
  for (let y = 40; y <= 106; y++) for (let x = 232; x <= 256; x++) { const fila = Math.floor((y - 40) / 4), u = (x + (fila % 2) * 4) % 8, junta = (y - 40) % 4 === 3 || u === 0;
    const v = (x < 236 ? 0.85 : x > 250 ? 0.15 : 0.45) + (h(fila, (x + (fila % 2) * 4) >> 3, 54) - 0.5) * 0.3; pset(x, y, junta ? P.torre[0] : d1_rampa(P.torre, v, x, y)); }
  for (let x = 230; x <= 258; x++) { pset(x, 40, P.torre[x < 236 ? 4 : 2]); pset(x, 41, P.torre[0]); }
  for (let x = 230; x <= 256; x += 6) { rect(x, 35, x + 2, 39, P.torre[2]); rect(x, 35, x, 39, P.torre[4]); rect(x + 2, 36, x + 2, 39, P.torre[1]); }
  rect(242, 56, 244, 64, P.torre[0]); rect(243, 58, 243, 63, hex('#f8c060'));
  rect(240, 92, 247, 106, P.torre[0]); rect(241, 93, 246, 106, hex('#2a1a24')); pset(243, 92, P.torre[3]); pset(244, 92, P.torre[3]);
  rect(256, 46, 257, 104, P.muro[0]);   // la sombra de la torre sobre el muro
  // las dunas en tres términos (cada término pinta desde su cresta hasta abajo y el de delante lo tapa): la cara al sol,
  // a la izquierda de la arista, más clara cerca de la cresta; la cara de sotavento en sombra, con la arista curva que
  // baja del pico y la luz rebotada al pie; las ondas del viento en líneas finas; el filo de la cresta encendido
  for (let n = 0; n < 3; n++) { const L = d1_DUNAS[n], haze = [0.38, 0.16, 0][n], esc = [0.6, 0.8, 1][n];
    if (n === 2) { d1_penasco(R, 6, 50, 124, 22, 0); d1_penasco(R, 268, 300, 118, 14, 0.12); }   // dos peñascos entre el término medio y el de delante
    for (let x = 0; x < 320; x++) { const cs = L.map((d) => d1_duna([d], x)[0]), y0 = Math.round(Math.min(...cs));
      // cada píxel es de la duna cuya silueta tiene justo encima (la de cresta más baja de las que lo cubren): así la cara
      // de sombra de una duna baja hasta el valle por detrás de la ladera al sol de la siguiente, sin costuras verticales
      for (let y = y0; y < 180; y++) { let ib = 0, mb = -1; for (let i = 0; i < cs.length; i++) if (cs[i] <= y + 0.5 && cs[i] > mb) { mb = cs[i]; ib = i; }
        const pk = L[ib], yc = cs[ib], [px, py, wl, wr] = pk, lado = x < px ? 1 : -1, yTop = Math.round(yc);
        const dy = y - py, al = pk[4], prof = (y - yc) / al, arista = px + dy * 0.45 + dy * dy * 0.03;
        const ond = Math.sin((x * 0.42 + (y - yc) * 1.5 * (1 - Math.min(0.6, prof * 0.3)) + Math.sin(x * 0.06 + y * 0.1 + n) * 3) / esc), ondaO = ond > 0.86, ondaL = ond < -0.9, rr = (d1_ruido(x * 0.2, y * 0.3, 59 + n) - 0.5) * 0.15;
        // el valle entre dunas, al pie: arena media con sus ondas (así no hay costuras entre una duna y la siguiente)
        const valle = d1_rampa(P.luz, 0.35 + (ondaO ? -0.25 : ondaL ? 0.12 : 0) + rr, x, y), pie = Math.max(0, Math.min(1, (prof - 1) / 0.8));
        let c;
        if (x > arista) { const r = Math.min(1, (x - arista) / (wr * 1.1)); c = d1_rampa(P.sombra, 0.15 + r * 0.5 + prof * 0.2 + (ondaO ? -0.2 : 0), x, y); c = d1_mez(c, valle, Math.max(pie, (r - 0.45) * 1.8)); }
        else { const cerca = Math.max(0, 1 - (arista - x) / (wl * 0.9)); c = d1_rampa(P.luz, 0.5 + cerca * 0.35 - prof * 0.25 + (ondaO ? -0.28 : ondaL ? 0.14 : 0) + rr, x, y); if (pie > d1_u(x, y)) c = valle; }
        if (y === y0) c = lado > 0 || x < arista ? P.luz[4] : P.sombra[3];
        else if (y === y0 + 1 && x <= arista) c = d1_mez(c, P.luz[4], 0.4);
        pset(x, y, d1_mez(c, P.cielo[5], haze)); } } }
  // en la arena de delante: piedras con su sombra, matojos secos y una hilera de huellas que vienen de la izquierda
  for (const [x, y, r] of [[16, 170, 6], [30, 174, 3], [298, 166, 7], [284, 172, 3], [150, 178, 4]]) { d1_bola(R, x + 1.5, y + 0.5, r, P.sombra[0], y + 1); d1_bola(R, x, y - r * 0.4, r, P.torre[1], y); d1_bola(R, x - r * 0.3, y - r * 0.7, r * 0.55, P.torre[3], y); pset(Math.round(x - r * 0.4), Math.round(y - r), P.torre[4]); }
  for (const [x, y] of [[60, 160], [266, 156], [120, 168]]) for (let k = 0; k < 7; k++) linea(x, y, x + Math.round((k - 3) * 1.4), y - 3 - (k % 3) * 2, k % 2 ? P.sombra[2] : P.luz[0]);
  for (let k = 0; k < 9; k++) { const x = 4 + k * 9, y = 156 + Math.round(k * 0.4) + (k % 2) * 3; rect(x, y, x + 1, y, P.sombra[1]); pset(x, y + 1, P.luz[3]); }
}

// un peñasco de arenisca a contraluz del ocaso: mesa con estratos, la cara izquierda encendida, la derecha en sombra, el
// filo de arriba con luz y la arena amontonada al pie; x0–x1 de ancho, base y alto; haze lo funde con el cielo
function d1_penasco(R, x0, x1, base, alto, haze) {
  const P = d1_PS, w = x1 - x0;
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / w, top = Math.round(base - alto * Math.min(1, Math.min(u, 1 - u) * 5) + (h(x >> 1, 1, 91) - 0.5) * 2 + (u > 0.55 && u < 0.7 ? 3 : 0));
    for (let y = top; y <= base; y++) { const est = (y + Math.round(Math.sin(x * 0.3) * 0.8)) % 4 === 0, v = 0.75 - u * 0.75 + (y === top ? 0.35 : 0) + (est ? -0.25 : 0) + (h(x, y, 92) - 0.5) * 0.15;
      R.pset(x, y, d1_mez(d1_rampa(P.torre, v, x, y), P.cielo[5], haze)); } }
  for (let x = x0 - 8; x <= x1 + 10; x++) { const u = x < x0 ? (x0 - x) / 8 : x > x1 ? (x - x1) / 10 : 0, a = Math.round(4 * (1 - u)); for (let y = base - a; y <= base + 1; y++) R.pset(x, y, d1_mez(d1_rampa(P.luz, 0.45 + (y - base + a) * 0.04 - (x > x1 ? 0.2 : 0), x, y), P.cielo[5], haze)); }
}

function d_sareer(R, t, o = {}) {
  const P = d1_PS, { pset } = R;
  const CI = d1_capa(R, 'sareer:cielo', () => d1_sareerCielo(R)); R.copiar(CI);
  // nubes largas en tres capas, encendidas por debajo
  const capa = (n, y0, w0, v, P3, sem) => { for (let k = 0; k < n; k++) { const w = w0 + h(k, sem, 1) * w0 * 0.6, per = 320 + w * 2, x = ((h(k, sem, 2) * per + t * v) % per) - w, y = y0 + h(k, sem, 3) * 8;
      d1_nube(R, x, y, w, k + sem * 10, [P3[2], P3[1], P3[0]]); } };
  capa(4, 22, 44, 1.1, P.nube2, 4); capa(5, 46, 30, 2, P.nube, 5); capa(4, 64, 20, 3, P.nube, 6); d1_calma(R, CI);
  const T2 = d1_capa(R, 'sareer:tierra', (b) => { d1_sareerTierra(R, b); b_sareerFijo(R); }), B = R.buf;
  for (let i = 30 * 320; i < 106 * 320; i++) { const c = T2[i]; if (c !== d1_VACIO) B[i] = c; }
  B.set(T2.subarray(106 * 320), 106 * 320);
  // los pendones del muro, que el viento mece por abajo (paño verde con orla oscura y el anillo de bronce)
  for (const x0 of [20, 100, 180, 300]) for (let j = 0; j < 16; j++) { const off = Math.round(Math.sin(t * 2.2 + x0 * 0.1) * j / 15 * 1.5);
    for (let i = 0; i < 9; i++) { if (j === 15 && (i === 4)) continue; pset(x0 + i + off, 81 + j, i === 0 || i === 8 ? C.estandarteN : i < 3 ? hex('#3a5e48') : C.estandarte); } }
  for (const x0 of [20, 100, 180, 300]) { const off = Math.round(Math.sin(t * 2.2 + x0 * 0.1) * 0.6); R.anillo(x0 + 4.5 + off, 88.5, 2, C.bronceL); }
  // el estandarte del anillo en lo alto de la torre (mástil x 252, paño ondeando hacia la derecha) y el farol que tiembla
  R.linea(252, 22, 252, 35, P.torre[0]); pset(252, 21, C.bronceL);
  for (let i = 0; i < 13; i++) { const ond = Math.round(Math.sin(t * 5 - i * 0.6) * 1.2 * i / 12); for (let j = 0; j < 7; j++) pset(253 + i, 23 + j + ond, j === 0 ? hex('#4a6a54') : (i + j) % 5 === 0 ? C.estandarteN : C.estandarte); }
  { const ond = Math.round(Math.sin(t * 5 - 3.6) * 0.6); R.anillo(259.5, 26.5 + ond, 2, C.bronceL); }
  if (Math.sin(t * 6) + Math.sin(t * 9.7) > -1.2) { pset(243, 59, hex('#fff0a0')); pset(243, 61, hex('#fff0a0')); }
  // la guardiana que hace la ronda en lo alto de la torre (se ve de cintura arriba entre las almenas)
  { const f = (t * 0.12) % 2, g = f < 1 ? f : 2 - f, x = Math.round(234 + g * 18); R.rect(x - 1, 31, x + 1, 35, hex('#5a6a80')); pset(x - 2, 32, hex('#6a3a7a')); pset(x - 2, 33, hex('#6a3a7a')); pset(x - 2, 34, hex('#6a3a7a')); pset(x, 30, hex('#e0b090')); pset(x, 29, hex('#2a1e28')); }
  // pájaros que vuelven al bosque por encima del muro
  for (let k = 0; k < 4; k++) { const x = ((h(k, 4, 55) * 360 + t * (10 + k * 2)) % 360) - 20, y = 58 + k * 4 + Math.sin(t * 1.4 + k) * 2, a = Math.sin(t * 8 + k * 2) > 0 ? 1 : 0;
    if (d1_tranquilo(x, y)) continue; pset(x, y, P.muro[0]); pset(x - 1, y - a, P.muro[0]); pset(x + 1, y - a, P.muro[0]); pset(x - 2, y - 1 + a, P.muro[0]); pset(x + 2, y - 1 + a, P.muro[0]); }
  // el polvo que el viento arranca de las crestas: hilos claros que vuelan hacia la derecha y se deshacen
  for (let n = 0; n < 3; n++) for (const [px, py] of d1_DUNAS[n]) for (let k = 0; k < 9; k++) { const f = ((t * (0.5 + n * 0.2) + k / 9 + h(px, k, 56)) % 1), x = px + f * (14 + n * 10), y = py - 1 + f * (3 + n * 2) - Math.sin(f * 3) * 2;
    if (x < 0 || x > 319 || h(k, Math.floor(t * 8), px) < f * 0.8) continue; pset(Math.round(x), Math.round(y), n === 2 ? P.luz[4] : d1_mez(P.luz[4], P.cielo[6], 0.3)); }
  // el temblor del calor sobre la arena de delante: un brillo que sube y se va
  for (let k = 0; k < 10; k++) { const f = (t * 0.6 + k * 0.1) % 1, x = Math.round(30 + h(k, 9, 57) * 260), y = Math.round(150 - f * 10); if (f < 0.6) pset(x + Math.round(Math.sin(t * 6 + k) * 1), y, d1_mez(B[y * 320 + x], P.luz[4], 0.5)); }
  // un ratón canguro (un muad'dib) que cruza la arena de delante a saltitos cada 9 s y se para a mirar
  { const per = 9, f = (t % per) / per; if (f < 0.75) { const g = f / 0.75, x = Math.round(-6 + g * 336), salto = Math.abs(Math.sin(g * 40)) * (g > 0.45 && g < 0.52 ? 0 : 3), y = Math.round(172 - salto), cM = hex('#c89060'), cS = hex('#7a4a30');
      R.rect(x, y - 2, x + 2, y, cM); R.pset(x + 3, y - 3, cM); R.pset(x + 3, y - 5, cS); R.pset(x + 2, y - 5, cS); R.pset(x + 4, y - 3, C.k); R.linea(x - 1, y - 1, x - 5, y - 3, cS); R.pset(x + 1, y + 1, cS); R.pset(x + 1, 174, d1_PS.sombra[1]); R.pset(x + 2, 174, d1_PS.sombra[1]); } }
  b_sareerVida(R, t);
  return { suelo: 150, libre: [30, 280], sol: [118, 76], horizonte: 77, muro: [77, 104], torre: [232, 256, 36, 106], estandarte: [252, 22], loma: [[70, 110], [230, 109], [196, 134]] };
}
// por delante de los personajes: velos de arena que corren a ras de suelo (bajo y 156) empujados por el viento
function d_sareerDelante(R, t, o = {}) {
  const c = hex('#f4c27a');
  for (let k = 0; k < 5; k++) { const v = 26 + k * 7, x0 = ((h(k, 1, 58) * 400 + t * v) % 400) - 60, y0 = 160 + k * 4;
    for (let i = 0; i < 46; i++) { const x = Math.round(x0 + i), y = Math.round(y0 + Math.sin(i * 0.2 + t * 3 + k) * 1.5); if (x < 0 || x > 319) continue; if (d1_u(x, y) > Math.sin(i / 46 * Math.PI) * 0.55) continue; R.pset(x, y, d1_mez(R.pget(x, y), c, 0.55)); } }
  return {};
}

// Desde muy arriba, al crepúsculo: el planeta verde (bosque en perspectiva, ríos, lagos, claros y luces de aldeas) que
// se vuelve DESIERTO desde un punto (x 160, y 118) en ondas: o.desierto 0–1 (el radio de la arena; con 1 lo cubre todo
// menos el mirador). El frente de la onda brilla dorado y por la arena se dispersan MILES DE PUNTITOS DE LUZ (las perlas
// de conciencia) que salen hacia fuera y titilan. Cielo de ocaso con estrellas arriba y nubes finas. Abajo a la
// izquierda, un MIRADOR de roca con un pino (o.mirador: false lo quita) para quien mira la escena: suelo y 150, x 6–96.
const d1_PD = {
  cielo: ['#141634', '#1e1e44', '#30285a', '#4a3468', '#6e4070', '#9a5070', '#c86c66', '#e89068', '#f4b878'].map(hex),
  bosque: ['#14281e', '#1c3626', '#26462e', '#325a38', '#4a6e40', '#7a7a48'].map(hex),
  arena: ['#7a4a3a', '#a0603e', '#c47e4a', '#dca060', '#ecc07a', '#f8dc9a'].map(hex),
  agua: ['#2a3a5a', '#4a5a7a', '#8a7a8a', '#e0a07a'].map(hex), roca: ['#1e1824', '#2e2430', '#42343c', '#5c4a4a', '#7a6458'].map(hex),
};

const d1_hor = (x) => 50 + ((x - 160) / 160) ** 2 * 4;

function d1_dispCielo(R) {
  const P = d1_PD;
  for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) { const v = Math.pow(y / 54, 1.4) + (d1_ruido(x * 0.03, y * 0.1, 61) - 0.5) * 0.08 + Math.max(0, 1 - Math.hypot((x - 80) / 120, (y - 54) / 30)) * 0.15; R.pset(x, y, d1_rampa(P.cielo, v, x, y)); }
  for (let k = 0; k < 140; k++) { const x = Math.round(h(k, 1, 62) * 320), y = Math.round(Math.pow(h(k, 2, 62), 1.6) * 34); if (d1_tranquilo(x, y)) continue; R.pset(x, y, d1_mez(R.pget(x, y), hex('#f0eaff'), 0.3 + h(k, 3, 62) * 0.5)); }
}

function d1_dispTierra(R, B, desierto) {
  const P = d1_PD, { pset } = R; B.fill(d1_VACIO);
  for (let y = 46; y < 180; y++) for (let x = 0; x < 320; x++) { const yh = d1_hor(x); if (y < yh) continue;
    const z = (y - yh) / (180 - yh), D = 1 / (z + 0.07), X = (x - 160) * D / 160, haze = Math.pow(1 - z, 3) * 0.75, luzO = Math.max(0, -X) * 0.04;
    let c;
    if (!desierto) {
      const rioX = Math.sin(D * 0.7) * 0.9 + Math.sin(D * 1.9 + 1) * 0.25, rio2 = -1.4 + Math.sin(D * 1.1 + 2) * 0.5, lago = d1_ruido(X * 2.4 + 30, D * 1.1, 63);
      const cel = d1_ruido(X * 9, D * 5.5, 64), cop = d1_ruido(X * 30, D * 17, 65), loma = d1_ruido(X * 1.6, D * 0.8, 66);
      if (Math.abs(X - rioX) < 0.035 + 0.01 * z || Math.abs(X - rio2) < 0.025) c = d1_rampa(P.agua, 0.5 + (1 - z) * 0.5 + (h(x, y, 67) - 0.5) * 0.4, x, y);
      else if (lago > 0.74) c = d1_rampa(P.agua, lago > 0.76 ? 0.45 + (1 - z) * 0.4 : 0.2, x, y);
      else if (cel > 0.7) c = d1_rampa(P.bosque, 0.75 + (h(x, y, 68) - 0.5) * 0.4, x, y);   // claros y campos
      else c = d1_rampa(P.bosque, 0.15 + cop * 0.45 + (loma - 0.5) * 0.5 + luzO, x, y);
    } else {
      const cr = (D * 2.6 + Math.sin(X * 3.1) * 0.5 + d1_ruido(X * 2, D * 0.6, 69) * 0.6) % 1, onda = Math.sin(X * 60 + D * 22) > 0.7;
      c = d1_rampa(P.arena, cr < 0.12 ? 0.18 : 0.42 + cr * 0.45 + (onda ? 0.08 : 0) + luzO * 2, x, y);
      if (cr > 0.97) c = P.arena[5];
    }
    pset(x, y, d1_mez(c, P.cielo[7], haze)); }
  // el mirador de roca (abajo a la izquierda) con su pino, en los dos búferes igual
  d1_mirador(R);
}

// el mirador: una roca con estratos y matas, cortada en vertical hacia el valle, y un pino retorcido a la izquierda
function d1_mirador(R) {
  const P = d1_PD, { pset } = R, borde = (y) => 98 + (y - 150) * 0.9 + Math.sin(y * 0.4) * 2;
  for (let y = 147; y < 180; y++) for (let x = 0; x < 140; x++) { const top = 150 + Math.sin(x * 0.12) * 1.2 - (x < 10 ? 2 : 0); if (y < top || x > borde(y)) continue;
    const est = (y + Math.sin(x * 0.2) * 2) % 6 < 1, v = 0.5 + (h(x >> 2, y >> 1, 70) - 0.5) * 0.4 - (x > borde(y) - 4 ? 0.35 : 0) + (y < top + 2 ? 0.35 : 0);
    pset(x, y, est ? P.roca[1] : d1_rampa(P.roca, v, x, y)); }
  for (let k = 0; k < 24; k++) { const x = Math.round(h(k, 1, 71) * 92), y = Math.round(150 + Math.sin(x * 0.12) * 1.2); for (let j = 0; j < 3; j++) pset(x + (j % 2), y - j, j ? P.bosque[3] : P.bosque[1]); }
  // el pino: tronco que se tuerce, ramas, y copas en pisos caídos (dentados, con la luz del ocaso por la izquierda)
  for (let y = 104; y <= 150; y++) { const x = Math.round(13 + Math.sin((150 - y) * 0.07) * 3 - (150 - y) * 0.04), w = y > 140 ? 2 : 1; for (let i = -w; i <= w; i++) pset(x + i, y, i < 0 ? P.roca[3] : i > 0 ? P.roca[0] : P.roca[2]); }
  R.linea(12, 128, 26, 118, P.roca[1]); R.linea(12, 118, 2, 110, P.roca[1]); R.linea(13, 138, 24, 132, P.roca[1]);
  for (const [x, y, w] of [[13, 135, 13], [20, 124, 12], [5, 114, 10], [14, 106, 9], [12, 99, 5]]) for (let j = -2; j <= 3; j++) for (let i = -w; i <= w; i++) {
    const caida = Math.round(Math.abs(i) * 0.25), yy = y + j + caida, dent = h(x + i, y, 79) < 0.3 ? 1 : 0; if (j < -1 + dent || (j > 1 && Math.abs(i) > w - 3) || (Math.abs(i) > w - 1 && j < 1)) continue;
    pset(x + i, yy, j === -1 + dent ? (i < 0 ? P.bosque[5] : P.bosque[4]) : j >= 2 ? P.bosque[0] : (i < -w / 3 ? P.bosque[3] : P.bosque[(i + j) % 3 === 0 ? 1 : 2])); }
}

function d_dispersion(R, t, o = {}) {
  const P = d1_PD, des = Math.max(0, Math.min(1, o.desierto ?? 0.5)), B = R.buf, { pset } = R;
  const CI = d1_capa(R, 'disp:cielo', () => { d1_dispCielo(R); b_dispCielo(R); }); R.copiar(CI);
  // las estrellas que titilan y las nubes finas que pasan
  for (let k = 0; k < 24; k++) { const x = Math.round(h(k, 5, 72) * 320), y = Math.round(h(k, 6, 72) * 30); if (d1_tranquilo(x, y) || Math.sin(t * 3 + k * 1.7) < 0.3) continue; pset(x, y, hex('#fff6e0')); if (k % 4 === 0) { pset(x - 1, y, P.cielo[4]); pset(x + 1, y, P.cielo[4]); } }
  for (let k = 0; k < 5; k++) { const w = 30 + h(k, 1, 73) * 40, per = 320 + w * 2, x0 = ((h(k, 2, 73) * per + t * (1.5 + k * 0.6)) % per) - w, y = 26 + k * 5;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || d1_tranquilo(x, y)) continue; const e = Math.sin(i / w * Math.PI); pset(x, y, d1_mez(B[y * 320 + x], k > 2 ? P.cielo[8] : P.cielo[6], 0.5 * e)); if (e > 0.5) pset(x, y + 1, d1_mez(B[(y + 1) * 320 + x], P.cielo[3], 0.4 * e)); } }
  const V = d1_capa(R, 'disp:verde', (b) => { d1_dispTierra(R, b, false); b_dispVerde(R); }), A = d1_capa(R, 'disp:arena', (b) => { d1_dispTierra(R, b, true); b_dispArena(R); });
  // la distancia de cada píxel al punto de donde sale el desierto (con su perspectiva y un borde irregular), una vez
  const DI = d1_dato(R, 'disp:dist', () => { const d = new Float32Array(320 * 180); for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) d[y * 320 + x] = Math.hypot(x - 160, (y - 118) * 2.4) + (d1_ruido(x * 0.06, y * 0.12, 74) - 0.5) * 34; return d; });
  const MI = o.mirador === false ? null : d1_dato(R, 'disp:mir', () => { const m = new Uint8Array(320 * 180), b = R.nuevo(), prev = R.usar(b); b.fill(d1_VACIO); d1_mirador(R); R.usar(prev); for (let i = 0; i < m.length; i++) m[i] = b[i] !== d1_VACIO ? 1 : 0; return m; });
  const Rd = des * 420, oro = hex('#ffe08a'), oroS = hex('#f0a860');
  for (let i = 46 * 320; i < 180 * 320; i++) { const v = V[i]; if (v === d1_VACIO) continue;
    if (MI && MI[i]) { B[i] = v; continue; }
    const d = DI[i], f = Rd - d;
    if (f <= 0) { B[i] = v; continue; }
    if (f < 3) B[i] = oro; else if (f < 7) B[i] = d1_mez(A[i], oroS, 0.5);
    else { const w = Math.sin((d - t * 26) * 0.18); B[i] = w > 0.93 ? d1_mez(A[i], oro, 0.35) : A[i]; } }
  if (o.mirador === false) for (let y = 140; y < 180; y++) for (let x = 0; x < 140; x++) { const i = y * 320 + x; if (B[i] === V[i] && DI[i] < Rd) B[i] = A[i]; }
  b_dispVida(R, t, DI, Rd); d1_calma(R, CI, 0.5);
  // las luces de las aldeas en el bosque (se apagan cuando llega la arena)
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 75) * 320), y = Math.round(58 + Math.pow(h(k, 2, 75), 0.8) * 110), i = y * 320 + x; if (DI[i] < Rd || (MI && MI[i]) || V[i] === d1_VACIO) continue; if (Math.sin(t * 2 + k) > -0.6) pset(x, y, hex('#ffd890')); }
  // las perlas de conciencia: miles de puntitos que salen del centro por la arena, titilan y serpentean
  const n = Math.round(900 * Math.min(1, des * 1.6));
  for (let k = 0; k < n; k++) { const a = h(k, 1, 76) * Math.PI * 2, f = (h(k, 2, 76) + t * 0.02 * (0.5 + h(k, 3, 76))) % 1, r = Math.sqrt(f) * Rd * 0.97;
    const x = Math.round(160 + Math.cos(a) * r + Math.sin(t * 3 + k) * 0.8), y = Math.round(118 + Math.sin(a) * r / 2.4); if (x < 0 || x > 319 || y < 52 || y > 179) continue; const i = y * 320 + x;
    if (DI[i] >= Rd || (MI && MI[i])) continue; const s = Math.sin(t * 4 + k * 2.3); if (s < -0.5) continue;
    pset(x, y, k % 3 ? hex('#d8f0ff') : hex('#fff0b0')); if (s > 0.9 && y > 90) { pset(x - 1, y, hex('#8ab0d8')); pset(x + 1, y, hex('#8ab0d8')); pset(x, y - 1, hex('#8ab0d8')); } }
  // el pino del mirador mece la punta
  if (MI) { const s = Math.round(Math.sin(t * 1.3)); pset(12 + s, 96, P.bosque[2]); pset(12 + s, 95, P.bosque[4]); }
  return { suelo: 150, libre: [6, 96], centro: [160, 118], radio: Rd, horizonte: 50, mirador: [6, 96, 150], pino: [14, 150] };
}
// por delante: unas pocas perlas grandes que suben cerca de la cámara (solo con desierto)
function d_dispersionDelante(R, t, o = {}) {
  const des = o.desierto ?? 0.5; if (des < 0.3) return {};
  for (let k = 0; k < 6; k++) { const f = (t * 0.08 + k / 6) % 1, x = Math.round(120 + h(k, 1, 77) * 190 + Math.sin(t + k) * 4), y = Math.round(180 - f * 120); if (d1_tranquilo(x, y)) continue;
    R.pset(x, y, hex('#fff6d0')); R.pset(x - 1, y, hex('#b0d0f0')); R.pset(x + 1, y, hex('#b0d0f0')); R.pset(x, y - 1, hex('#b0d0f0')); R.pset(x, y + 1, hex('#b0d0f0')); }
  return {};
}

// La noche con la Vía Láctea en diagonal, una nebulosa, estrellas de tres tamaños que titilan, tres constelaciones
// (líneas tenues) y la luna creciente (x 64, y 44); abajo, el limbo del planeta (y 150 en el centro, se curva hasta
// y 157 en los bordes) con su atmósfera azul, manchas de bosque y de arena, nubes y luces de ciudades que parpadean.
// Del limbo salen NAVES DIMINUTAS en todas direcciones con estelas finas: o.naves 0–1 (de ninguna a unas 70 a la vez).
const d1_limbo = (x) => 150 + ((x - 160) / 160) ** 2 * 7;

function d1_estrellasFijo(R) {
  const { pset } = R, CI = ['#06081a', '#0a0e24', '#10142e', '#161a3a', '#1e2246'].map(hex), VL = ['#2a2a54', '#3a3a66', '#504c78', '#6a6488'].map(hex);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 0.15 + y / 200 + (d1_ruido(x * 0.05, y * 0.05, 81) - 0.5) * 0.15;
    // la Vía Láctea: una banda diagonal de polvo con nudos más claros y una grieta oscura
    const d = (y - (120 - x * 0.42)) / 26, g = Math.exp(-d * d) * (0.4 + d1_ruido(x * 0.08, y * 0.08, 82) * 0.9) - (Math.abs(d + 0.1) < 0.12 ? 0.25 : 0);
    let c = d1_rampa(CI, v, x, y); const gg = d1_tranquilo(x, y) ? 0.25 + (g - 0.25) * 0.35 : g; if (gg > 0.25) c = d1_rampa(VL, (gg - 0.25) * 0.9, x, y);
    // la nebulosa rosada, pequeña, a la izquierda
    const nb = Math.max(0, 1 - Math.hypot((x - 150) / 30, (y - 70) / 16)) * d1_ruido(x * 0.15, y * 0.15, 83); if (nb > 0.25) c = d1_mez(c, hex('#8a4a7a'), (nb - 0.25) * 1.2);
    pset(x, y, c); }
  for (let k = 0; k < 420; k++) { const x = Math.round(h(k, 1, 84) * 320), y = Math.round(h(k, 2, 84) * 150); if (d1_tranquilo(x, y) && k % 4) continue; const b = h(k, 3, 84); pset(x, y, b > 0.8 ? hex('#ffffff') : b > 0.5 ? hex('#a8b4d8') : hex('#5a6490')); }
  // tres constelaciones: estrellas brillantes unidas por líneas tenues punteadas
  for (const pts of [[[40, 30], [58, 38], [72, 34], [86, 46], [76, 60]], [[190, 26], [204, 40], [222, 36], [236, 52], [214, 62]], [[110, 96], [128, 88], [146, 100], [160, 92]]]) {
    for (let i = 0; i < pts.length - 1; i++) R.linea(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], hex('#2e3866'), 3);
    for (const [x, y] of pts) { pset(x, y, hex('#ffffff')); pset(x - 1, y, hex('#8a9ad0')); pset(x + 1, y, hex('#8a9ad0')); pset(x, y - 1, hex('#8a9ad0')); pset(x, y + 1, hex('#8a9ad0')); } }
  // la luna creciente
  d1_bola(R, 64.5, 44.5, 7, hex('#e8e4d0')); d1_bola(R, 67.5, 42.5, 6.4, hex('#10142e')); pset(60, 44, hex('#c8c4b0')); pset(61, 47, hex('#c8c4b0'));
  // el planeta: el limbo y la atmósfera (una franja azul tramada que se funde hacia arriba)
  for (let x = 0; x < 320; x++) { const yl = d1_limbo(x);
    for (let y = Math.floor(yl - 7); y < yl; y++) { const a = 1 - (yl - y) / 7; if (d1_u(x, y) < a * 0.9) pset(x, y, d1_mez(R.pget(x, y), hex('#3a7ac8'), a * 0.8)); }
    for (let y = Math.ceil(yl); y < 180; y++) { const z = (y - yl) / 30, D = 1 / (z + 0.1), X = (x - 160) * D / 160;
      const m = d1_ruido(X * 3 + 9, D * 1.2, 85), nub = d1_ruido(X * 6, D * 3, 86);
      let c = m > 0.55 ? d1_rampa(['#3a3a2e', '#5a4a34', '#7a5e3e'].map(hex), (m - 0.55) * 3, x, y) : d1_rampa(['#14261e', '#1e3626', '#2a4630'].map(hex), m * 1.6, x, y);
      if (nub > 0.62) c = d1_mez(c, hex('#7a8aa8'), (nub - 0.62) * 2.4);
      if (y - yl < 1.5) c = hex('#8ac8f0'); else if (y - yl < 3) c = d1_mez(c, hex('#4a8ad0'), 0.6);
      pset(x, y, c); } }
}

function d_estrellas(R, t, o = {}) {
  const naves = Math.max(0, Math.min(1, o.naves ?? 0.5)), { pset } = R, B = R.buf;
  R.copiar(d1_capa(R, 'estrellas', () => { d1_estrellasFijo(R); b_estrellasFijo(R); }));
  // estrellas que titilan y una fugaz de vez en cuando
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 87) * 320), y = Math.round(h(k, 2, 87) * 140); if (d1_tranquilo(x, y)) continue; const s = Math.sin(t * (2 + k % 3) + k);
    if (s > 0.6) { pset(x, y, hex('#ffffff')); pset(x - 1, y, hex('#6a78b0')); pset(x + 1, y, hex('#6a78b0')); pset(x, y - 1, hex('#6a78b0')); pset(x, y + 1, hex('#6a78b0')); } else if (s > -0.2) pset(x, y, hex('#a8b4d8')); }
  { const per = 5.5, f = (t % per) / per, n = Math.floor(t / per); if (f < 0.12) { const x0 = 40 + h(n, 1, 88) * 180, y0 = 60 + h(n, 2, 88) * 30, u = f / 0.12; for (let j = 0; j < 10; j++) { const x = Math.round(x0 + (u * 40) - j * 1.6), y = Math.round(y0 + u * 14 - j * 0.55); if (!d1_tranquilo(x, y)) pset(x, y, d1_mez(B[y * 320 + x], hex('#ffffff'), 1 - j / 10)); } } }
  // las luces de las ciudades del planeta, que parpadean
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 89) * 320), y = Math.round(d1_limbo(x) + 3 + Math.pow(h(k, 2, 89), 0.7) * 26); if (y > 179) continue; if (Math.sin(t * 1.5 + k * 2.1) > -0.4) pset(x, y, k % 5 ? hex('#ffd078') : hex('#fff0c0')); }
  b_estrellasVida(R, t);
  // LAS NAVES: salen del limbo en abanico (a izquierda, derecha y arriba), aceleran y dejan una estela fina
  const n = Math.round(naves * 70), per = 9;
  for (let k = 0; k < n; k++) { const a = (t + h(k, 1, 90) * per) % per; if (a > 7.5) continue;
    const x0 = 14 + h(k, 2, 90) * 292, y0 = d1_limbo(x0) - 1, th = -Math.PI / 2 + (h(k, 3, 90) - 0.5) * 2.9, dx = Math.cos(th), dy = Math.sin(th), d = 3 * a + 2.4 * a * a;
    const x = x0 + dx * d, y = y0 + dy * d; if (x < -10 || x > 330 || y < -10) continue;
    const L = Math.min(d, 6 + a * 7);
    for (let j = 1; j < L; j += 1) { const xx = Math.round(x - dx * j), yy = Math.round(y - dy * j); if (xx < 0 || xx > 319 || yy < 0 || yy > 179 || d1_tranquilo(xx, yy)) continue; const u = 1 - j / L; if (d1_u(xx, yy) > u) continue; pset(xx, yy, d1_mez(B[yy * 320 + xx], hex('#9ad0ff'), 0.25 + u * 0.5)); }
    const xi = Math.round(x), yi = Math.round(y); if (d1_tranquilo(xi, yi)) continue;
    pset(xi, yi, hex('#ffffff')); pset(Math.round(x - dx), Math.round(y - dy), (Math.floor(t * 10) + k) % 2 ? hex('#ffc860') : hex('#ff8a40')); pset(Math.round(x + dy * 0.9), Math.round(y - dx * 0.9), hex('#c8d4e8')); }
  return { suelo: 150, libre: [30, 280], limbo: d1_limbo, luna: [64, 44], horizonte: 150 };
}
// la paleta propia: piedra rosada, mármol, alfombra, bronce, Habladoras, fuego, cielo de día y de noche, roca del diario
const D2 = pal({
  k: '#16121c',
  r0: '#3c2830', r1: '#62444a', r2: '#8a6866', r3: '#ae8c84', r4: '#cfae9e', r5: '#ead0ba',
  m0: '#5e4a4c', m1: '#8e7470', m2: '#b89a8e', m3: '#d4bcac', m4: '#eedac8',
  alf: '#2a5a40', alfS: '#18382a', alfL: '#3e7656', oro: '#d0a040', oroL: '#f4d47a', oroS: '#86601e',
  mor: '#5a2a70', morS: '#3a1a4a', morL: '#7e48a0',
  uni: '#66789a', uniS: '#434f6a', uniL: '#90a2c0', capa: '#6c3a8e', capaS: '#45225e', capaL: '#9260b4',
  pi1: '#eab896', pi2: '#c08460', pi3: '#7c4c36', pelo: '#241a1c', pelo2: '#5a3424',
  est: '#2a4a3a', estS: '#18301f', estL: '#3e6650', estN: '#1a1620',
  fuego: '#e86a2a', fuegoL: '#f8c040', fuegoB: '#fff4c0', humo: '#8a7e80', humoL: '#b8aca8',
  bron: '#a87a34', bronL: '#e0b860', bronS: '#5e401c',
  v0: '#78acd8', v1: '#9cc4e4', v2: '#c6daea', v3: '#f0e2c8', nb0: '#bcbcd0', nb1: '#e2e0ea', nb2: '#fbfaf6',
  bq0: '#1c3628', bq1: '#2c5236', bq2: '#467442', bq3: '#6a9450',
  luz: '#ffe0a0', luna: '#b8d0f0',
  q0: '#120e12', q1: '#221a1e', q2: '#34282a', q3: '#4a3a36', q4: '#64504a', q5: '#86705e',
  mad: '#6a4026', madS: '#3e2414', madL: '#9a6a3e', papel: '#e8d8b0', papelS: '#b8a47c',
  cr0: '#3a6ab8', cr1: '#5ab0e8', cr2: '#a8e8ff', cv0: '#6a3aa8', cv1: '#a070e0',
  n0: '#070a1c', n1: '#0e1430', n2: '#18234a', n3: '#24345e', nn0: '#2a3456', nn1: '#46527a', nn2: '#7c88b0',
  nb: '#060e0c', nb1b: '#0c1c16', nb2b: '#163024', lunaL: '#f6f2dc', lunaS: '#c8c4b0',
});

const D2_PIEDRA = [D2.r0, D2.r1, D2.r2, D2.r3, D2.r4, D2.r5];

const D2_MARMOL = [D2.m0, D2.m1, D2.m2, D2.m3, D2.m4];

const D2_ROCA = [D2.q0, D2.q1, D2.q2, D2.q3, D2.q4, D2.q5];

const D2_CIELO = [D2.v0, D2.v1, D2.v2, D2.v3];

const D2_NOCHE = [D2.n0, D2.n1, D2.n2, D2.n3];

// la trama de Bayer 4×4: un umbral por píxel para pasar de un tono a otro sin bandas
const D2_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const d2_bay = (x, y) => (D2_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// un tono de una rampa con trama: v es el índice (con decimales) y la parte decimal decide con la trama
const d2_tono = (ramp, v, x, y) => { const n = ramp.length - 1; v = Math.max(0, Math.min(n, v)); const i = Math.floor(v); return ramp[Math.min(n, i + (v - i > d2_bay(x, y) ? 1 : 0))]; };

// mezcla dos colores (a: cuánto del segundo) y multiplica un color por una luz (f) con un tinte (r, g, b de 0 a 1)
const d2_mezcla = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

const d2_luz = (c, f, tr = 1, tg = 1, tb = 1) => { const ch = (s, k) => Math.max(0, Math.min(255, Math.round(((c >>> s) & 255) * f * k))); return ((255 << 24) | (ch(16, tb) << 16) | (ch(8, tg) << 8) | ch(0, tr)) >>> 0; };

// aclara (o tiñe) el píxel que ya hay
function d2_aclara(R, x, y, a, col = D2.luz) { x |= 0; y |= 0; if (x < 0 || y < 0 || x > 319 || y > 179) return; R.pset(x, y, d2_mezcla(R.pget(x, y), col, a)); }

// ruido de valor suave (bilineal con suavizado) a partir de h
function d2_ruido(x, y, k = 0) {
  const ix = Math.floor(x), iy = Math.floor(y); let fx = x - ix, fy = y - iy; fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  const a = h(ix, iy, k), b = h(ix + 1, iy, k), c = h(ix, iy + 1, k), d = h(ix + 1, iy + 1, k);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

// un fondo fijo que se pinta una sola vez por lienzo (y por clave) en un búfer de R.nuevo() y se copia en cada fotograma;
// devuelve el objeto guardado (con lo que dibuja() le haya colgado: listas de píxeles, posiciones…)
const d2_CACHE = new WeakMap();

function d2_fijo(R, clave, dibuja) {
  let m = d2_CACHE.get(R); if (!m) d2_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b), datos = {}; dibuja(datos); R.usar(prev); m[clave] = { b, datos }; }
  R.copiar(m[clave].b); return m[clave].datos;
}

// la envolvente convexa de unos puntos (para los haces de luz)
function d2_envolvente(p) {
  p = p.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]); const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], hi = []; for (const q of p) { while (lo.length > 1 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (hi.length > 1 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
}

// un haz de luz tramado: aclara lo que hay dentro del polígono (a: la fuerza; col: el color de la luz)
function d2_haz(R, pts, a, col = D2.luz) { R.poligono(pts, (x, y) => d2_mezcla(R.pget(x, y), col, (x + y) & 1 ? a : a * 0.55)); }

// UNA HABLADORA DE PEZ pequeña (figurita de fondo de 7–14 px: o.alto): pelo corto oscuro, uniforme gris azulado con
// cinturón y hebilla de bronce, capa morada larga; o.dir 1 | −1 (de perfil a la derecha o a la izquierda), 0 (de
// frente), 2 (de espaldas); respira (los hombros suben un píxel, cada una a su ritmo: o.fase); o.anda: camina; o.baston:
// lleva la vara ceremonial de bronce; o.mira: gira la cabeza (de perfil, mira al otro lado); o.piel 0–2. (x, y): el
// centro de los pies.
export function d2_habladora(R, x, y, t, o = {}) {
  const { pset } = R, al = Math.max(7, Math.min(14, Math.round(o.alto ?? 9))), dir = o.dir ?? 0, f = o.fase ?? 0;
  x = Math.round(x); y = Math.round(y);
  const hd = al >= 12 ? 4 : 3, ll = al >= 12 ? 3 : 2, to = al - hd - ll, w = al >= 12 ? 2 : 1;
  const sube = !o.anda && Math.sin(t * 1.7 + f * 2.3) > 0.6 ? 1 : 0, paso = o.anda ? Math.floor(t * 6 + f) % 2 : 0;
  const piel = [D2.pi1, D2.pi2, D2.pi3][(o.piel ?? Math.floor(h(f, 3) * 3)) % 3], perfil = dir === 1 || dir === -1;
  const yT = y - ll - to + 1 - sube, yH = yT - hd;
  const caraDir = perfil ? (o.mira ? -dir : dir) : 0;
  // las piezas, de atrás adelante; mono: si hay color, se pinta todo de ese color desplazado (el contorno)
  const dib = (dx, dy, mono) => {
    const P = (px, py, c) => pset(px + dx, py + dy, mono ?? c);
    // la capa por detrás
    if (perfil) { for (let j = yT; j < y; j++) { P(x - dir * (w + 1), j, j === yT ? D2.capaL : D2.capa); if (j > y - 3) P(x - dir * (w + 2), j, D2.capaS); } }
    else for (let j = yT; j < y; j++) { P(x - w - 1, j, D2.capa); P(x + w + 1, j, D2.capaS); }
    // las piernas y las botas
    if (perfil) { const a = paso ? 1 : 0; for (let j = y - ll + 1; j <= y; j++) { P(x - a * dir, j, j === y ? D2.k : D2.uniS); P(x + a * dir, j, j === y ? D2.k : D2.uniS); } }
    else for (let j = y - ll + 1; j <= y; j++) { P(x - 1 + (paso && j === y ? -1 : 0), j, j === y ? D2.k : D2.uniS); P(x + 1, j, j === y ? D2.k : D2.uniS); if (w > 1) P(x, j, D2.k); }
    // el torso: luz a la izquierda, sombra a la derecha, el cinturón con su hebilla
    const ancho = perfil ? 1 : w;
    for (let j = yT; j <= y - ll; j++) for (let i = -ancho; i <= ancho; i++) {
      const cin = j === yT + Math.floor(to * 0.6);
      P(x + i, j, cin ? (i === 0 ? D2.bronL : D2.uniS) : j === yT ? D2.uniL : i === -ancho ? D2.uniL : i === ancho && !perfil ? D2.uniS : D2.uni);
    }
    if (dir === 2) for (let j = yT; j < y - 1; j++) for (let i = -w; i <= w; i++) P(x + i, j, i === w ? D2.capaS : j === yT ? D2.capaL : D2.capa);
    // la cabeza: pelo corto arriba (y detrás, de perfil), la cara
    for (let j = 0; j < hd; j++) for (let i = -1; i <= 1; i++) {
      let c = piel; if (j === 0 || dir === 2) c = D2.pelo; else if (perfil && i === -caraDir) c = D2.pelo; else if (hd === 4 && j === 1 && !perfil && i !== 0) c = D2.pelo;
      P(x + i, yH + j, c);
    }
    if (hd === 4 && !mono && dir !== 2) { if (perfil) P(x + caraDir, yH + 2, D2.k); else { P(x - 1, yH + 2, D2.k); P(x + 1, yH + 2, D2.k); } }
    if (o.baston) { const bx = x + (perfil ? dir * 2 : w + 2); for (let j = y; j >= yH - 3; j--) P(bx, j, j < yH - 1 ? D2.bronL : D2.bron); }
  };
  dib(-1, 0, D2.k); dib(1, 0, D2.k); dib(0, -1, D2.k); dib(0, 0);
}

// EL ANILLO DEL GUSANO (el emblema de Leto, sin letras): un aro grueso que se muerde la cola, con la boca redonda de
// dientes arriba; (cx, cy) el centro, r el radio; cols [sombra, cuerpo, luz]; o.dientes: los dientes de la boca.
function d2_anillo(R, cx, cy, r, cols, o = {}) {
  const g = Math.max(1.5, r * 0.28);
  R.disco(cx, cy, r + 1, (x, y, d) => {
    const dd = d * (r + 1); if (dd < r - g - 1) return R.pget(x, y);
    const a = Math.atan2(y + 0.5 - cy, x + 0.5 - cx);
    if (dd < r - g) return cols[0];
    if (dd > r) return D2.k;
    // la cabeza del gusano arriba: un hueco con dientes; los anillos del cuerpo marcados
    const ang = ((a + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2));
    if (ang < 0.32 || ang > Math.PI * 2 - 0.12) return (o.dientes !== false && Math.round(dd) % 2 === 0) ? cols[2] : D2.k;
    const seg = Math.sin(ang * Math.max(8, r * 1.2)) > 0.75;
    const luz = -Math.cos(a + 0.8) * 0.5 + 0.5;
    return seg ? cols[0] : luz > 0.68 ? cols[2] : luz < 0.3 ? cols[0] : cols[1];
  });
}

// UN ESTANDARTE que cuelga de su barra de bronce y ondea: paño verde con franja negra, cenefa de oro, cola de golondrina
// y el anillo del gusano bordado; (x, y0) arriba a la izquierda, w × alto, t el tiempo, fase.
function d2_estandarte(R, x, y0, w, alto, t, fase = 0) {
  const { pset, rect } = R;
  rect(x - 2, y0 - 2, x + w + 2, y0 - 1, D2.bronS); rect(x - 2, y0 - 2, x + w + 2, y0 - 2, D2.bronL); pset(x - 3, y0 - 2, D2.bronL); pset(x + w + 3, y0 - 2, D2.bronL);
  const yR = y0 + Math.round(alto * 0.3), r = Math.max(2, Math.round(w * 0.3));
  for (let j = 0; j < alto; j++) {
    const k = j / alto, sx = Math.round(Math.sin(t * 1.4 + j * 0.11 + fase) * 1.6 * k), corte = j > alto - w / 2 ? Math.abs(j - alto + w / 2) : -1;
    for (let i = 0; i < w; i++) {
      if (corte >= 0 && Math.abs(i - (w - 1) / 2) < corte * 0.9 + 0.1) continue;   // la cola de golondrina
      const pl = Math.sin(i * 1.3 + t * 1.4 + fase + j * 0.05);
      let c = i === 0 || i === w - 1 ? D2.oro : Math.abs(i - (w - 1) / 2) < w * 0.16 ? D2.estN : pl > 0.5 ? D2.estL : pl < -0.5 ? D2.estS : D2.est;
      if (j < 2) c = D2.oroS;
      pset(x + i + sx, y0 + j, c);
    }
    if (corte < 0 && j === alto - Math.round(w / 2) - 1) for (let i = 0; i < w; i += 2) pset(x + i + sx, y0 + j + 1, D2.oroL);
  }
  const sx = Math.round(Math.sin(t * 1.4 + (yR - y0) * 0.11 + fase) * 1.6 * 0.3);
  d2_anillo(R, x + (w - 1) / 2 + 0.5 + sx, yR, r, [D2.oroS, D2.oro, D2.oroL], { dientes: r > 3 });
}

// UNA LLAMA viva (brasero, aplique, farol): tres tonos que titilan; (x, y) la base, s la escala
function d2_llama(R, x, y, t, s = 1, fase = 0) {
  const { pset } = R, a = Math.round((3 + Math.sin(t * 9 + fase) + Math.sin(t * 13.7 + fase * 2)) * s);
  for (let j = 0; j < a + 2; j++) {
    const w = Math.max(0, Math.round((1 - j / (a + 2)) * 2.2 * s)), dx = Math.round(Math.sin(t * 7 + j * 0.7 + fase) * (j / (a + 2)) * 1.4);
    for (let i = -w; i <= w; i++) pset(x + i + dx, y - j, Math.abs(i) === w ? D2.fuego : j < a * 0.5 && Math.abs(i) < w * 0.5 ? D2.fuegoB : D2.fuegoL);
  }
}

// EL HUMO que sube y se deshace (de un brasero o un pebetero): puntitos de dos tonos que suben ondulando
function d2_humo(R, x, y, t, n = 8, alto = 30, fase = 0) {
  for (let k = 0; k < n; k++) {
    const u = ((t * 0.22 + k / n + fase) % 1), yy = y - u * alto, xx = x + Math.sin(u * 7 + k + t * 0.8) * (2 + u * 4) + u * 3;
    if (h(k, Math.floor(t * 0.22 + k / n + fase), 9) < 0.15) continue;
    R.pset(Math.round(xx), Math.round(yy), u < 0.5 ? D2.humoL : D2.humo); if (u < 0.65) R.pset(Math.round(xx) + 1, Math.round(yy), D2.humo);
  }
}

// UN BRASERO de bronce en su trípode con su fuego y su humo; (x, y) el pie
function d2_brasero(R, x, y, t, fase = 0) {
  const { rect, linea, pset } = R;
  linea(x - 4, y, x - 1, y - 9, D2.k); linea(x + 4, y, x + 1, y - 9, D2.k); linea(x - 3, y, x, y - 9, D2.bronS); linea(x + 3, y, x, y - 9, D2.bron); rect(x - 5, y, x - 3, y, D2.k); rect(x + 3, y, x + 5, y, D2.k);
  rect(x - 6, y - 14, x + 6, y - 10, D2.k); rect(x - 5, y - 13, x + 5, y - 11, D2.bron); rect(x - 5, y - 13, x + 5, y - 13, D2.bronL); rect(x + 3, y - 12, x + 5, y - 11, D2.bronS);
  for (let i = -4; i <= 4; i += 2) pset(x + i, y - 14, D2.fuego);
  d2_llama(R, x, y - 14, t, 1.2, fase); d2_humo(R, x, y - 20, t, 9, 34, fase);
  // el resplandor tramado alrededor
  for (let j = -12; j <= 6; j++) for (let i = -12; i <= 12; i++) if ((i + j) & 1 && i * i + j * j < 140 && i * i + j * j > 30) d2_aclara(R, x + i, y - 16 + j, 0.07 + 0.03 * Math.sin(t * 9 + fase), D2.fuegoL);
}

// la geometría: fuga (160, 96); pared lateral en wx ±84; techo en wy −78; suelo en wy 26; la escala s = 1 en la pared
// del fondo y crece hacia la cámara
const D2_CIU = { FX: 160, FY: 96, PW: 84, TE: -78, SU: 26, BAYS: [[1.0, 1.22], [1.22, 1.5], [1.5, 1.9], [1.9, 2.4]], COLS: [1.22, 1.5, 1.9] };

const d2_P = (s, wx, wy) => [D2_CIU.FX + wx * s, D2_CIU.FY + wy * s];

// el arco ojival de un ventanal lateral: la altura (wy) de su remate según u (0–1 a lo ancho)
const d2_remate = (u) => -60 - 8 * Math.pow(Math.max(0, 1 - Math.abs(2 * u - 1)), 0.7);

// el color de una losa de mármol del suelo de la nave
function d2_suelo(x, y, s, wx, z) {
  const { FX, FY } = D2_CIU, aw = Math.abs(wx);
  if (aw < 15) {   // la alfombra verde: cenefa de oro, banda oscura y el anillo del gusano cada tanto
    if (aw > 14.2) return D2.alfS; if (aw > 12.9) return (Math.floor(z * 90) & 1) ? D2.oro : D2.oroS; if (aw > 11.6) return D2.alfS;
    const zz = (z * 12) % 1, rr = Math.hypot(wx / 5.5, (zz - 0.5) * 2.2);
    if (rr > 0.72 && rr < 1) return D2.oroS; if (rr < 0.3) return D2.alfL;
    return d2_tono([D2.alfS, D2.alf, D2.alfL], 1.1 + (1 - aw / 12) * 0.5 + (d2_ruido(wx * 0.4, z * 60, 4) - 0.5) * 0.8, x, y);
  }
  const iu = Math.floor(wx / 13), iv = Math.floor(z / 0.075);
  const s2 = (y + 1.5 - FY) / 26, jv = Math.floor((1 / s2) / 0.075) !== iv, ju = Math.floor((x + 1.5 - FX) / s / 13) !== iu;
  if (jv || ju) return D2.m1;
  let v = ((iu + iv) & 1 ? 2.5 : 3.1) + (h(iu, iv, 3) - 0.5) * 0.5;
  const ve = d2_ruido(wx * 0.22 + iu * 3.1, z * 26 + iv, 5); if (Math.abs(ve - 0.5) < 0.025) v -= 0.9; else if (Math.abs(ve - 0.5) < 0.05) v -= 0.4;
  const rf = Math.abs(x - FX); if (rf < 26) v += (1 - rf / 26) * 0.9 * Math.max(0, 1.6 - s * 0.45);   // el reflejo del rosetón
  v -= (s - 1) * 0.22 + Math.max(0, aw - 15) / 69 * 0.7;
  return d2_tono(D2_MARMOL, v, x, y);
}

// el color de la pared lateral (sillares, zócalo, cornisa); lado −1 izquierda, 1 derecha
function d2_pared(x, y, s, wy, d, lado) {
  const row = Math.floor((wy + 400) / 8), wy2 = (y + 1.5 - D2_CIU.FY) / s;
  if (wy > -72 && wy < -69) return wy < -70.5 ? D2.r4 : D2.r1;   // la cornisa
  if (wy > 11 && wy < 12.6) return D2.bronS;                       // el filete de bronce del zócalo
  const col = Math.floor((d + (row & 1) * 0.026) / 0.052);
  const dn = D2_CIU.PW / Math.max(0.5, Math.abs(x + 0.5 + lado - D2_CIU.FX));
  const jh = Math.floor((wy2 + 400) / 8) !== row, jvv = Math.floor((dn + (row & 1) * 0.026) / 0.052) !== col;
  let v = (lado < 0 ? 2.35 : 2.85) + (h(col, row, 5 + lado) - 0.5) * 0.55 + (h(x, y, 7) - 0.5) * 0.35;
  if (wy > 12) v -= 0.55 + (wy - 12) / 14 * 0.4;           // el zócalo, más oscuro, y la sombra junto al suelo
  if (wy < -40) v -= (-40 - wy) / 32 * 0.7;                 // la penumbra de arriba
  if (jh || jvv) v -= 0.9;
  if (x > 268 && y < 50) v = 2.4 + (v - 2.4) * 0.35;        // la esquina de Atom, tranquila
  return d2_tono(D2_PIEDRA, v, x, y);
}

// pinta el fondo fijo de la nave y apunta los píxeles de cielo de los ventanales (datos.ven) y los haces (datos.haces)
function d2_ciudadelaFijo(R, datos) {
  const { pset, rect, poligono, linea, disco } = R, { FX, FY, PW, TE, SU, BAYS, COLS } = D2_CIU, B = R.buf;
  const ven = [];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const ax = Math.abs(x + 0.5 - FX), lado = x < FX ? -1 : 1;
    let c;
    if (ax <= PW && y >= 18 && y < 122) {   // la pared del fondo: sillares en pantalla, con la luz del rosetón
      const row = Math.floor((y - 18) / 8), col = Math.floor((x - 76 + (row & 1) * 8) / 16);
      const jt = (y - 18) % 8 === 7 || (x - 76 + (row & 1) * 8) % 16 === 15;
      const gl = Math.max(0, 1 - Math.hypot((x - 160) / 70, (y - 62) / 60));
      let v = 2.6 + (h(col, row, 11) - 0.5) * 0.5 + (h(x, y, 12) - 0.5) * 0.3 + gl * 1.3 - (y < 30 ? (30 - y) / 12 * 0.6 : 0);
      if (jt) v -= 0.9;
      if (y > 112) v -= 0.5;
      c = d2_tono(D2_PIEDRA, v, x, y);
    } else {
      const s = ax / PW, yfl = ax <= PW ? 122 : FY + SU * s;
      if (y + 0.5 >= yfl) { const sf = (y + 0.5 - FY) / SU; c = d2_suelo(x, y, sf, (x + 0.5 - FX) / sf, 1 / sf); }
      else if (ax > PW && y + 0.5 >= FY + TE * s) {   // la pared lateral, con los ventanales a la izquierda
        const wy = (y + 0.5 - FY) / s, d = 1 / s;
        c = d2_pared(x, y, s, wy, d, lado);
        for (let b = 0; b < BAYS.length; b++) {
          const [sa, sb] = BAYS[b], da = 1 / sb, db = 1 / sa, m = (db - da) * 0.2, d0 = da + m, d1 = db - m;
          if (d < da || d > db) continue;
          if (lado < 0 && b < 3) {
            const u = (d - d0) / (d1 - d0), top = d2_remate(Math.max(0, Math.min(1, u)));
            if (u >= -0.12 && u <= 1.06 && wy >= top - 2 && wy <= -12) {
              if (u < 0 || u > 1 || wy < top) c = d2_tono(D2_PIEDRA, u < 0 ? 4.2 : 1.6, x, y);   // el marco: el derrame lejano, iluminado
              else if (wy > -16) c = wy > -14 ? D2.r1 : D2.r5;                                  // el alféizar
              else {
                const v = (wy - top) / (-16 - top);
                if (u < 0.1) c = d2_tono(D2_PIEDRA, 3.6 - u * 8, x, y);                       // el derrame del hueco
                else if (Math.abs(u - 0.55) < 0.05 || Math.abs(v - 0.42) < 0.018) c = D2.r2;  // el parteluz y el travesaño
                else { c = 0x01020305; ven.push(y * 320 + x, u, v, b); }
              }
            }
          }
          if (lado > 0 && b === 2) {   // la puerta lateral de la derecha, con su luz dentro
            const u = (d - d0) / (d1 - d0), top = -10 - 6 * Math.sqrt(Math.max(0, 1 - (2 * u - 1) ** 2));
            if (u >= -0.08 && u <= 1.08 && wy >= top - 3 && wy < SU) {
              if (u < 0 || u > 1 || wy < top) c = (u < 0 || u > 1) ? D2.bronS : D2.bron;
              else c = d2_tono([D2.k, D2.r0, D2.r1, D2.luz], 0.4 + Math.max(0, (wy - 4) / 22) * 1.6 + (u < 0.15 ? 0.5 : 0), x, y);
            }
          }
          if (lado > 0 && b === 1) {   // la hornacina de la derecha con su ánfora (bajo la esquina de Atom)
            const u = (d - d0) / (d1 - d0), top = -18 - 5 * Math.sqrt(Math.max(0, 1 - (2 * u - 1) ** 2));
            if (u >= 0.1 && u <= 0.9 && wy >= top && wy < 8) c = d2_tono(D2_PIEDRA, 0.8 + (wy - top) / 26 * 0.8 + (u > 0.7 ? 0.6 : 0), x, y);
          }
        }
      } else {   // el techo de casetones en penumbra (tranquilo: va detrás de la barra del año)
        const sc = (FY - y - 0.5) / -TE, wx = (x + 0.5 - FX) / sc, d = 1 / sc;
        const cu = (wx / 18 + 50) % 1, cv = (d / 0.09) % 1, borde = cu < 0.14 || cv < 0.16;
        c = d2_tono(D2_PIEDRA, (borde ? 1.4 : 0.8) + (h(x, y, 13) - 0.5) * 0.4 + Math.max(0, d - 0.5) * 0.7, x, y);
      }
    }
    B[y * 320 + x] = c;
  }
  datos.ven = ven;
  // las pilastras y el friso de la pared del fondo
  for (const px of [76, 236]) { rect(px, 18, px + 7, 121, D2.r2); rect(px + 1, 18, px + 2, 121, D2.r4); rect(px + 6, 18, px + 7, 121, D2.r1); for (let k = 0; k < 2; k++) linea(px + 3 + k * 2, 22, px + 3 + k * 2, 118, D2.r1); }
  rect(76, 18, 243, 23, D2.r1); rect(76, 18, 243, 18, D2.r4); for (let x = 78; x < 243; x += 4) rect(x, 20, x + 1, 22, D2.r3);
  // el rosetón y las dos lancetas de vidriera, con su plomo
  const vid = [D2.oroL, D2.oro, D2.capaL, D2.alfL, hex('#7ab0e0'), D2.fuegoL, D2.capa];
  const dentroArco = (x, y) => { if (x < 132 || x > 188 || y < 26 || y > 102) return false; if (y >= 46) return true; const dx = Math.abs(x + 0.5 - 160); return dx < 28 * Math.sqrt(Math.max(0, (y - 26) / 20)) + 0.5; };
  for (let y = 24; y < 104; y++) for (let x = 130; x < 191; x++) {
    if (!dentroArco(x, y)) { if (dentroArco(x - 1, y) || dentroArco(x + 1, y) || dentroArco(x, y + 1)) pset(x, y, D2.r1); continue; }
    const dr = Math.hypot(x + 0.5 - 160, y + 0.5 - 48), a = Math.atan2(y + 0.5 - 48, x + 0.5 - 160);
    let c;
    if (dr < 17) {   // el rosetón: doce pétalos alternos (morado y verde) sobre ámbar, con su plomo
      const fs = ((a + Math.PI) / (Math.PI * 2) * 12), sg = Math.floor(fs), lado = Math.abs(fs % 1 - 0.5);
      if (dr > 15.6) c = D2.r1; else if (dr > 14.6 || (dr > 9 && lado > 0.45)) c = D2.k;
      else if (dr >= 9) { const pet = lado < 0.5 - (dr - 9) / 14; c = pet ? (sg & 1 ? D2.capaL : D2.alfL) : d2_tono([D2.fuego, D2.fuegoL, D2.luz], 1 + (15 - dr) / 6, x, y); if (pet && lado < 0.12) c = sg & 1 ? hex('#c8a0e0') : hex('#8ac8a0'); }
      else c = d2_tono([D2.fuegoL, D2.luz, D2.fuegoB], 2.2 - dr / 6, x, y);
    } else if (y >= 66 && Math.abs(x + 0.5 - 160) < 2) c = D2.r2;   // el parteluz de las lancetas
    else if (y === 64 || y === 65) c = D2.r2;
    else {   // las lancetas: ámbar en rombos de plomo, cenefa morada y dos medallones verdes con el anillo
      const lx = x < 160 ? x - 132 : x - 162, ly = y - 66, borde = x <= 134 || x >= 186 || Math.abs(x + 0.5 - 160) < 4 || (y < 66 && dr < 19);
      const med = y >= 66 && (Math.hypot(lx - 12.5, ly - 10) < 6.5 || Math.hypot(lx - 12.5, ly - 26) < 6.5);
      if (borde) c = (y & 1) ? D2.capa : D2.capaL;
      else if (((lx + ly) % 6 + 6) % 6 === 0 || ((lx - ly) % 6 + 6) % 6 === 0) c = D2.oroS;
      else if (med) c = (Math.hypot(lx - 12.5, (ly - 10) % 16) < 3) ? D2.oroL : D2.alfL;
      else c = d2_tono([D2.fuego, D2.fuegoL, D2.luz, D2.fuegoB], 2.6 - (y - 30) / 60 + (h(Math.floor((lx + ly) / 6), Math.floor((lx - ly) / 6), 22) - 0.5) * 0.9, x, y);
    }
    pset(x, y, c);
  }
  d2_anillo(R, 160, 48, 7.5, [D2.oroS, D2.oro, D2.oroL]);
  // el resplandor tramado del rosetón sobre la pared
  for (let y = 20; y < 121; y++) for (let x = 96; x < 225; x++) { if (dentroArco(x, y)) continue; const d = Math.hypot((x - 160) / 62, (y - 60) / 52); if (d < 1 && ((x + y) & 1)) d2_aclara(R, x, y, (1 - d) * 0.22); }
  // las columnas: fuste acanalado, basa y capitel con su anillo de bronce, y el reflejo en el suelo pulido
  for (const s of COLS) for (const lado of [-1, 1]) {
    const cx = FX + lado * (PW - 5) * s, w2 = 4.6 * s, yb = FY + SU * s, yc = FY - 62 * s, calma = lado > 0 && s > 1.4;
    for (let y = Math.max(0, Math.floor(yc)); y < yb; y++) for (let x = Math.round(cx - w2); x <= Math.round(cx + w2); x++) {
      const u = (x + 0.5 - (cx - w2)) / (2 * w2);
      if (u < 0 || u > 1) continue;
      let v = 1.4 + Math.sin(u * Math.PI) * 1.6 + (lado < 0 ? (u - 0.5) * 1.2 : (0.5 - u) * 0.6) + (h(x, y, 31) - 0.5) * 0.3;
      if (!calma && Math.round((x - cx) / Math.max(2, s * 1.6)) % 2 === 0 && (x - Math.round(cx)) % Math.max(2, Math.round(s * 1.6)) === 0) v -= 0.6;
      if (calma && y < 52) v = 2.3 + (v - 2.3) * 0.4;
      if (y > yb - 4 * s) v = 2.4 + (y > yb - 1.5 * s ? -0.8 : 0.6);
      pset(x, y, u < 0.04 || u > 0.96 ? D2.r0 : d2_tono(D2_PIEDRA, v, x, y));
    }
    // la basa, un poco más ancha
    for (let y = Math.round(yb - 4 * s); y < yb; y++) { const ww = w2 + 1.4 * s; for (let x = Math.round(cx - ww); x <= Math.round(cx + ww); x++) pset(x, y, y === Math.round(yb - 4 * s) ? D2.r4 : x > cx + ww * 0.4 ? D2.r1 : D2.r3); }
    // el capitel (si se ve) con el anillo de bronce
    if (yc > -3 * s) { const ww = w2 + 2 * s; for (let y = Math.round(yc - 3 * s); y <= Math.round(yc); y++) for (let x = Math.round(cx - ww); x <= Math.round(cx + ww); x++) pset(x, y, y === Math.round(yc) ? D2.bronL : y === Math.round(yc) - 1 ? D2.bron : d2_tono(D2_PIEDRA, calma ? 2.4 : 3, x, y)); }
    for (let x = Math.round(cx - w2); x <= Math.round(cx + w2); x++) { const yy = Math.round(FY + 8 * s); if (!(calma && yy < 52)) { pset(x, yy, D2.bron); pset(x, yy + 1, D2.bronS); } }
    // el reflejo en el mármol
    for (let y = Math.ceil(yb); y < Math.min(180, yb + 18 * s); y++) for (let x = Math.round(cx - w2); x <= Math.round(cx + w2); x++) {
      const sf = (y + 0.5 - FY) / SU; if (Math.abs((x + 0.5 - FX) / sf) < 15) continue; const k = 1 - (y - yb) / (18 * s);
      if (((x + y) & 1) && k > 0) pset(x, y, d2_mezcla(R.pget(x, y), D2.r2, 0.35 * k));
    }
  }
  // el estrado: dos peldaños de piedra con el filete de bronce, la alfombra morada con su cenefa y los anillos del frente
  const q = (pts) => pts.map(([s, wx, wy]) => d2_P(s, wx, wy));
  poligono(q([[1.0, -54, 24], [1.0, 54, 24], [1.42, 54, 24], [1.42, -54, 24]]), (x, y) => d2_tono(D2_PIEDRA, 3.6 + (h(x, y, 40) - 0.5) * 0.5, x, y));
  poligono(q([[1.42, -54, 24], [1.42, 54, 24], [1.42, 54, 26], [1.42, -54, 26]]), (x, y) => (y === Math.round(FY + 24 * 1.42) ? D2.r4 : D2.r1));
  poligono(q([[1.0, -48, 22], [1.0, 48, 22], [1.32, 48, 22], [1.32, -48, 22]]), (x, y) => d2_tono(D2_PIEDRA, 3.9 + (h(x, y, 41) - 0.5) * 0.4, x, y));
  poligono(q([[1.0, -38, 22], [1.0, 38, 22], [1.3, 38, 22], [1.3, -38, 22]]), (x, y) => { const sf = (y + 0.5 - FY) / 22, wx = Math.abs((x + 0.5 - FX) / sf); return wx > 35 ? D2.oro : wx > 33 ? D2.morS : d2_tono([D2.morS, D2.mor, D2.morL], 1.2 + (h(x, y, 42) - 0.5) * 0.6, x, y); });
  { const [x0, yt] = d2_P(1.32, -48, 22), [x1, yb] = d2_P(1.32, 48, 24);
    rect(Math.round(x0), Math.round(yt), Math.round(x1), Math.round(yb) + 1, D2.r2); rect(Math.round(x0), Math.round(yt), Math.round(x1), Math.round(yt), D2.bronL);
    rect(Math.round(x0), Math.round(yt) + 1, Math.round(x1), Math.round(yt) + 1, D2.bronS);
    for (let x = Math.round(x0) + 8; x < x1 - 4; x += 16) { R.disco(x, Math.round(yt) + 3.5, 1.8, D2.bron); pset(x - 1, Math.round(yt) + 3, D2.bronL); pset(x, Math.round(yt) + 3, D2.r2); } }
  { const [x0, y0] = d2_P(1.42, -54, 24), [x1] = d2_P(1.42, 54, 24); for (let x = Math.round(x0); x <= Math.round(x1); x += 9) pset(x, Math.round(y0) + 1, D2.r0); }
  // los pies de los braseros (el fuego va en cada fotograma)
  datos.braseros = [d2_P(1.5, -42, 26), d2_P(1.5, 42, 26)].map(([x, y]) => [Math.round(x), Math.round(y)]);
  // los haces de luz de los ventanales de la izquierda, hasta el suelo, y la mancha de sol donde caen
  const haces = [];
  for (let b = 0; b < 3; b++) {
    const [sa, sb] = BAYS[b], da = 1 / sb, db = 1 / sa, m = (db - da) * 0.2, sA = 1 / (db - m), sB = 1 / (da + m);
    const pts = [], suelo = [];
    for (const s of [sA, sB]) for (const wy of [-64, -16]) { pts.push(d2_P(s, -PW, wy)); const p = d2_P(s, -PW + (SU - wy) * 1.1, SU); pts.push(p); suelo.push(p); }
    haces.push({ sA, sB, env: d2_envolvente(pts), suelo: d2_envolvente(suelo) });
  }
  for (const hz of haces) { d2_haz(R, hz.env, 0.15); d2_haz(R, hz.suelo, 0.3); }
  datos.haces = haces;
  // la mancha morada de la alfombra del estrado pisada de luz y el borde del techo
  for (let x = 0; x < 320; x++) { const y = Math.round(FY + TE * Math.abs(x + 0.5 - FX) / PW); if (y >= 0 && y < 180 && Math.abs(x - FX) > PW) { pset(x, y, D2.r1); pset(x, y + 1, D2.r3); } }
}

// el cielo de día visto por un hueco (ventanal), en coordenadas del hueco: u, v de 0 a 1 (ancho y alto), k: qué hueco;
// nubes de tres tonos a dos velocidades, copas de árboles abajo y algún pájaro
function d2_cieloHueco(u, v, k, t, x, y, esc = 1) {
  const px = u * 14 * esc + k * 9.3, py = v * 30;
  const pj = ((t * 0.05 + k * 0.37) % 1.6) - 0.3, pv = 0.3 + 0.06 * Math.sin(t * 0.7 + k);
  if (Math.abs(u - pj) < 0.06 && Math.abs(v - pv + (Math.abs(u - pj) < 0.025 ? 0.012 * Math.sin(t * 12) : 0.012)) < 0.012) return D2.k;
  if (v > 0.8 + 0.07 * d2_ruido(px * 0.6, 3, k + 40)) return d2_tono([D2.bq0, D2.bq1, D2.bq2, D2.bq3], 1.2 + d2_ruido(px * 1.4, py * 0.8, k + 41) * 1.6 - (v - 0.8) * 3, x, y);
  const n1 = d2_ruido(px * 0.32 - t * 0.12, py * 0.16, k + 30), n2 = d2_ruido(px * 0.6 - t * 0.3, py * 0.3, k + 31);
  const n = n1 * 0.6 + n2 * 0.4 - v * 0.18;
  if (n > 0.5) { const nb = d2_ruido(px * 0.32 - t * 0.12, (py + 1.6) * 0.16, k + 30) * 0.6 + d2_ruido(px * 0.6 - t * 0.3, (py + 1.6) * 0.3, k + 31) * 0.4 - (v + 0.05) * 0.18; return n > 0.58 && nb < n ? D2.nb2 : n > 0.54 ? D2.nb1 : D2.nb0; }
  return d2_tono(D2_CIELO, v * 3.2 + 0.2, x, y);
}

function d_ciudadela(R, t, o = {}) {
  const { pset } = R, luz = o.luz ?? 1;
  const datos = d2_fijo(R, 'ciudadela', (d) => d2_ciudadelaFijo(R, d)), B = R.buf, ven = datos.ven;
  // el cielo de los ventanales, vivo (nubes, pájaros)
  for (let i = 0; i < ven.length; i += 4) { const p = ven[i]; B[p] = d2_cieloHueco(ven[i + 1], ven[i + 2], ven[i + 3], t, p % 320, (p / 320) | 0, 0.6); }
  // los destellos del rosetón
  for (let k = 0; k < 6; k++) { const a = h(k, Math.floor(t * 1.5), 50) * Math.PI * 2, r = 10 + h(k, Math.floor(t * 1.5), 51) * 5; if (h(k, Math.floor(t * 3), 52) > 0.5) pset(Math.round(160 + Math.cos(a) * r), Math.round(48 + Math.sin(a) * r), 0xffffffff); }
  // los estandartes del fondo, a los lados del rosetón
  d2_estandarte(R, 98, 28, 14, 74, t, 0); d2_estandarte(R, 208, 28, 14, 74, t, 1.7);
  // la Habladora que a ratos cruza la puerta de la derecha (recortada a su hueco)
  { const u = (t % 14) / 6; if (u < 1) { const [x0, y0] = d2_P(1.565, D2_CIU.PW, -16), [x1, y1] = d2_P(1.8, D2_CIU.PW, 26); R.recorte([Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1) - 1]);
      d2_habladora(R, lerp(x0 - 4, x1 + 4, u), y1 - 1, t, { alto: 14, dir: 1, anda: true, fase: 3 }); R.recorte(null); } }
  // las motas de polvo que flotan en los haces
  for (let hz = 0; hz < datos.haces.length; hz++) { const { sA, sB } = datos.haces[hz];
    for (let k = 0; k < 16; k++) { const s = lerp(sA, sB, h(k, hz, 60)), wy0 = lerp(-60, -20, h(k, hz, 61)), kk = (h(k, hz, 62) + t * 0.015 * (0.5 + h(k, hz, 63))) % 1;
      const wy = wy0 + kk * (26 - wy0), wx = -84 + kk * (26 - wy0) * 1.1 + Math.sin(t * 0.6 + k) * 2, [x, y] = d2_P(s, wx, wy);
      if (Math.sin(t * 2 + k * 1.7) > -0.3 * luz) d2_aclara(R, x, y, 0.55 * luz, 0xfffff4e0); } }
  // los braseros con su fuego y su humo
  datos.braseros.forEach(([x, y], i) => d2_brasero(R, x, y, t, i * 2.1));
  // las dos filas de Habladoras a cada lado de la alfombra, de perfil hacia ella: respiran y alguna gira la cabeza
  const filas = [];
  for (let k = 0; k < 8; k++) filas.push([1.06 + k * 0.12, 66]);
  for (let k = 0; k < 4; k++) filas.push([1.52 + k * 0.12, 55]);
  filas.sort((a, b) => a[0] - b[0]);
  for (const [s, wx] of filas) for (const lado of [-1, 1]) {
    const [x, y] = d2_P(s, lado * wx, 26), f = s * 7 + lado * 3 + wx;
    d2_habladora(R, x, y, t, { alto: 4.2 + 3 * s, dir: -lado, fase: f, mira: Math.sin(t * 0.4 + f) > 0.93, baston: wx === 66 && Math.round(s * 100) % 24 === 6 });
  }
  b_ciudadelaVida(R, t);
  return { suelo: 150, libre: [40, 280], carro: [160, 124], carroS: 0.75, estrado: [96, 125, 224] };
}
// por delante de los actores en la nave: dos Habladoras de espaldas en las esquinas de abajo y motas de primer término
function d_ciudadelaDelante(R, t, o = {}) {
  d2_habladora(R, 18, 177, t, { alto: 14, dir: 2, fase: 1, baston: true }); d2_habladora(R, 302, 177, t, { alto: 14, dir: 2, fase: 4, baston: true });
  for (let k = 0; k < 7; k++) { const x = (h(k, 70) * 360 + t * (3 + k % 3)) % 340 - 10, y = 60 + h(k, 71) * 100 + Math.sin(t * 0.5 + k) * 6; if (Math.sin(t * 1.3 + k * 2) > 0.2) d2_aclara(R, x, y, 0.3, 0xfffff4e0); }
  return {};
}

function d2_audienciaFijo(R, datos) {
  const { pset, rect, linea, poligono, disco } = R, B = R.buf;
  const PIE = 128, FX = 110, FY = 70;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (y < PIE) {   // la pared de sillares: hiladas de 10 px, juntas, cincel y la penumbra de arriba
      const row = Math.floor(y / 10), off = (row & 1) * 13, col = Math.floor((x + off) / 26), jt = y % 10 === 9 || (x + off) % 26 === 25;
      let v = 2.9 + (h(col, row, 80) - 0.5) * 0.6 + (h(x, y, 81) - 0.5) * 0.35 - Math.max(0, 30 - y) / 30 * 0.8 - (y > PIE - 14 ? (y - PIE + 14) / 14 * 0.6 : 0);
      if (jt) v -= 0.95; else if ((y % 10 === 0)) v += 0.35;
      if (x > 270 && y < 50) v = 2.5 + (v - 2.5) * 0.35;
      c = d2_tono(D2_PIEDRA, v, x, y);
    } else {   // el suelo de losas en perspectiva, con el brillo del ventanal y la alfombra verde que va al estrado
      const s = (y + 0.5 - FY) / (PIE - FY), wx = (x + 0.5 - FX) / s, z = 1 / s, s2 = (y + 1.5 - FY) / (PIE - FY);
      const iu = Math.floor(wx / 22), iv = Math.floor(z / 0.1), j = Math.floor((1 / s2) / 0.1) !== iv || Math.floor((x + 1.5 - FX) / s / 22) !== iu;
      if (y >= 148 && y <= 166 && x < 186) {
        const b = y <= 149 || y >= 165 ? 0 : y <= 151 || y >= 163 ? 1 : 2;
        c = b === 0 ? D2.alfS : b === 1 ? ((x >> 1) & 1 ? D2.oro : D2.oroS) : ((Math.floor(x / 14) & 1) && Math.abs(y - 157) < 3 && Math.abs((x % 14) - 7) < 3 ? D2.oroS : d2_tono([D2.alfS, D2.alf, D2.alfL], 1.2 + (d2_ruido(x * 0.3, y * 0.5, 82) - 0.5) * 1.1, x, y));
      } else if (j) c = D2.m1;
      else { let v = ((iu + iv) & 1 ? 2.4 : 3) + (h(iu, iv, 83) - 0.5) * 0.5 - (s - 1) * 0.4; const ve = d2_ruido(wx * 0.2 + iu * 2, z * 20 + iv, 84); if (Math.abs(ve - 0.5) < 0.03) v -= 0.8; c = d2_tono(D2_MARMOL, v, x, y); }
    }
    B[y * 320 + x] = c;
  }
  // el friso de dentículos arriba y el zócalo de bronce abajo
  rect(0, 16, 319, 21, D2.r2); rect(0, 16, 319, 16, D2.r4); rect(0, 21, 319, 21, D2.r1); for (let x = 1; x < 320; x += 5) if (!(x > 270)) rect(x, 18, x + 2, 20, D2.r4);
  rect(0, PIE - 4, 319, PIE - 1, D2.r1); rect(0, PIE - 4, 319, PIE - 4, D2.bronL); rect(0, PIE - 3, 319, PIE - 3, D2.bron);
  b_audienciaPared(R);
  // el ventanal ojival: marco, derrame iluminado a la derecha, alféizar; el hueco se pinta en cada fotograma
  const dentro = (x, y) => x >= 38 && x <= 88 && y >= 22 && y <= 110 && (y >= 44 || Math.abs(x + 0.5 - 63) < 25.5 * Math.sqrt(Math.max(0, (y - 22) / 22)) + 0.3);
  for (let y = 16; y < 120; y++) for (let x = 30; x < 98; x++) {
    if (dentro(x, y)) continue;
    const cerca = dentro(x - 4, y) || dentro(x + 4, y) || dentro(x, y + 4) || dentro(x - 3, y + 3) || dentro(x + 3, y + 3);
    if (cerca) pset(x, y, dentro(x - 4, y) && !dentro(x + 4, y) ? d2_tono(D2_PIEDRA, 4.3 + (h(x, y, 85) - 0.5) * 0.4, x, y) : d2_tono(D2_PIEDRA, 1.5, x, y));
  }
  rect(32, 110, 94, 115, D2.r4); rect(32, 110, 94, 110, D2.r5); rect(32, 115, 94, 116, D2.r1);
  datos.dentro = dentro;
  // el haz del ventanal y la mancha de sol en el suelo
  d2_haz(R, [[44, 30], [88, 30], [88, 110], [176, 172], [112, 176], [40, 110]], 0.09);
  d2_haz(R, [[96, 150], [150, 146], [182, 170], [118, 176]], 0.18);
  // la columna acanalada con basa y capitel, y su sombra en la pared
  for (let y = 22; y < 140; y++) for (let x = 176; x < 186; x++) if (((x + y) & 1) && x - 176 < (140 - y) * 0.2 + 2) pset(x, y, d2_mezcla(R.pget(x, y), D2.r0, 0.35));
  for (let y = 22; y < 136; y++) for (let x = 150; x <= 176; x++) {
    const u = (x - 150) / 26; let v = 1.3 + Math.sin(u * Math.PI) * 1.8 - u * 0.6 + (h(x, y, 86) - 0.5) * 0.3;
    if ((x - 151) % 4 === 0 && x > 151 && x < 175) v -= 0.6;
    pset(x, y, u < 0.03 || u > 0.97 ? D2.r0 : d2_tono(D2_PIEDRA, v, x, y));
  }
  rect(146, 22, 180, 28, D2.r3); rect(146, 22, 180, 22, D2.r5); rect(146, 27, 180, 28, D2.r1); rect(148, 29, 178, 30, D2.bron); rect(148, 30, 178, 30, D2.bronS);
  rect(146, 130, 180, 137, D2.r3); rect(146, 130, 180, 130, D2.r5); rect(171, 131, 180, 137, D2.r2); rect(144, 136, 182, 139, D2.r2); rect(144, 136, 182, 136, D2.r4);
  // el anillo del gusano de bronce en relieve, con su sombra, y los dos apliques
  disco(246, 78, 31, (x, y) => (((x + y) & 1) ? d2_mezcla(R.pget(x, y), D2.r0, 0.45) : R.pget(x, y)));
  d2_anillo(R, 244, 76, 29, [D2.bronS, D2.bron, D2.bronL]);
  disco(244, 76, 13, (x, y, d) => (d > 0.86 ? D2.bronS : d2_tono(D2_PIEDRA, 1.6 + (1 - d) * 0.8, x, y)));
  d2_anillo(R, 244, 76, 7, [D2.oroS, D2.oro, D2.oroL]);
  for (const ax of [200, 290]) { rect(ax - 3, 94, ax + 3, 96, D2.k); rect(ax - 2, 94, ax + 2, 95, D2.bron); rect(ax - 1, 96, ax + 1, 102, D2.bronS); rect(ax - 3, 91, ax + 3, 93, D2.bronL); }
  // el estrado: dos peldaños con el filete de bronce, la plataforma con alfombra morada y anillos en el frente
  rect(186, 132, 319, 140, D2.r4); for (let x = 186; x < 320; x++) for (let y = 132; y < 140; y++) pset(x, y, d2_tono(D2_PIEDRA, 3.7 + (h(x, y, 87) - 0.5) * 0.5 - (y - 132) * 0.05, x, y));
  for (let x = 200; x < 320; x++) for (let y = 133; y < 139; y++) pset(x, y, y === 133 || y === 138 ? D2.oro : d2_tono([D2.morS, D2.mor, D2.morL], 1.1 + (h(x, y, 88) - 0.5) * 0.7, x, y));
  rect(186, 140, 319, 145, D2.r2); rect(186, 140, 319, 140, D2.bronL); rect(186, 141, 319, 141, D2.bronS); for (let x = 196; x < 320; x += 18) { disco(x, 143, 1.6, D2.bron); pset(x - 1, 142, D2.bronL); }
  rect(180, 145, 319, 146, D2.r4); rect(180, 147, 319, 150, D2.r1); rect(180, 147, 319, 147, D2.r3); for (let x = 184; x < 320; x += 11) rect(x, 148, x, 150, D2.r0);
  rect(184, 133, 186, 145, D2.r1);
  b_audienciaFijo(R);
}
function d_audiencia(R, t, o = {}) {
  const { pset } = R;
  const datos = d2_fijo(R, 'audiencia', (d) => d2_audienciaFijo(R, d)), B = R.buf, dentro = datos.dentro;
  // el Arrakis verde por el ventanal: cielo con nubes, colinas de bosque en tres términos, el río con brillos, la aldea
  for (let y = 22; y <= 110; y++) for (let x = 38; x <= 88; x++) {
    if (!dentro(x, y)) continue;
    if (Math.abs(x - 63) < 1 || y === 70) { B[y * 320 + x] = y === 70 ? D2.r3 : D2.r2; continue; }   // el parteluz y el travesaño
    const u = (x - 38) / 50, v = (y - 22) / 88; let c;
    const c1 = 72 + Math.sin(x * 0.11 + 1) * 4 + d2_ruido(x * 0.2, 1, 90) * 3, c2 = 82 + Math.sin(x * 0.08 + 3) * 5 + d2_ruido(x * 0.3, 2, 91) * 3, c3 = 96 + Math.sin(x * 0.06) * 4;
    if (y > c3) { const rio = Math.abs(y - (102 + Math.sin(x * 0.12 + 0.5) * 3)) < 2.4;
      c = rio ? (Math.sin(x * 1.3 + t * 3 + y) > 0.6 ? D2.v3 : D2.v1) : d2_tono([D2.bq0, D2.bq1, D2.bq2, D2.bq3], 1.8 + d2_ruido(x * 0.7, y * 0.7, 92) * 1.4 - (y - c3) * 0.03, x, y); }
    else if (y > c2) { c = d2_tono([D2.bq0, D2.bq1, D2.bq2], 0.9 + d2_ruido(x * 0.9, y * 0.9, 93) * 1.4, x, y);
      const cx = Math.floor((x - 44) / 5); if (x > 44 && x < 84 && y > c2 + 3 && y < c2 + 8 && (x - 44) % 5 < 3) c = (y < c2 + 5) ? hex('#a85a3a') : y === Math.round(c2) + 6 && h(cx, 1, 94) > 0.5 && Math.sin(t * 0.5 + cx) > 0 ? D2.luz : D2.r4; }
    else if (y > c1) c = d2_tono([D2.bq1, D2.bq2, D2.v2], 1 + (c1 + 6 - y) / 6 * 0.6 + d2_ruido(x * 0.6, y * 0.6, 95) * 0.5, x, y);
    else c = d2_cieloHueco(u, v * 0.95, 7, t, x, y, 1.6);
    B[y * 320 + x] = c;
  }
  // las motas del haz
  for (let k = 0; k < 18; k++) { const kk = (h(k, 96) + t * 0.02 * (0.5 + h(k, 97))) % 1, a = h(k, 98); const x = lerp(44, 88, a) + kk * 90 + Math.sin(t * 0.7 + k) * 2, y = lerp(30, 108, h(k, 99)) * (1 - kk) + 170 * kk;
    if (Math.sin(t * 2.1 + k * 1.3) > -0.2) d2_aclara(R, x, y, 0.5, 0xfffff4e0); }
  // el estandarte que ondea y las llamas de los apliques
  d2_estandarte(R, 112, 30, 16, 76, t, 0.6);
  d2_llama(R, 200, 90, t, 1, 0); d2_llama(R, 290, 90, t, 1, 1.3);
  for (const ax of [200, 290]) for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) if (((i + j) & 1) && i * i + j * j < 80) d2_aclara(R, ax + i, 88 + j, 0.06 + 0.02 * Math.sin(t * 8 + ax), D2.fuegoL);
  // el brillo que recorre el anillo de bronce
  { const g = (t % 6) / 1.2; if (g < 1) { const a = -2.2 + g * Math.PI * 2; for (let r = 24; r <= 28; r++) pset(Math.round(244 + Math.cos(a) * r), Math.round(76 + Math.sin(a) * r), r === 26 ? 0xffffffff : D2.bronL); } }
  b_audienciaVida(R, t);
  // la Habladora de guardia junto a la columna (y otra al fondo del estrado)
  d2_habladora(R, 140, 131, t, { alto: 14, dir: 1, fase: 2, baston: true, mira: Math.sin(t * 0.5) > 0.9 });
  d2_habladora(R, 312, 131, t, { alto: 13, dir: -1, fase: 5, baston: true });
  return { suelo: 150, libre: [40, 150], carro: [248, 140], carroS: 1, estrado: [180, 140, 319] };
}
// por delante en la audiencia: el canto de una columna en el borde izquierdo y un pebetero con su humo
function d_audienciaDelante(R, t, o = {}) {
  const { rect, pset } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 11; x++) { const u = x / 11; pset(x, y, d2_tono(D2_PIEDRA, 0.4 + Math.sin(u * Math.PI * 0.5) * 1.1 + (x % 4 === 2 ? -0.5 : 0), x, y)); }
  rect(11, 0, 11, 179, D2.k);
  rect(0, 168, 13, 179, D2.r1); rect(0, 168, 13, 168, D2.r3);
  rect(15, 172, 27, 179, D2.k); rect(16, 168, 26, 176, D2.bron); rect(16, 168, 26, 168, D2.bronL); rect(23, 169, 26, 176, D2.bronS); rect(18, 177, 24, 179, D2.bronS);
  for (let i = 17; i < 26; i += 2) pset(i, 167, D2.fuego);
  d2_humo(R, 21, 165, t, 10, 40, 0.3);
  return {};
}

// un cristal de memoria de pie en un estante (prisma azul o morado con su brillo) y un rollo tumbado
function d2_cristal(R, x, y, alto, k) { const { pset } = R, mor = h(k, 1, 100) > 0.7, c0 = mor ? D2.cv0 : D2.cr0, c1 = mor ? D2.cv1 : D2.cr1;
  for (let j = 0; j < alto; j++) { const w = j === 0 ? 0 : 1; for (let i = -w; i <= w; i++) pset(x + i, y - j, i < 0 ? c1 : i > 0 ? c0 : j > alto - 3 ? D2.cr2 : c1); } pset(x, y - alto, D2.cr2); }

function d2_rollo(R, x, y, w, k) { const { rect, pset } = R; rect(x, y - 3, x + w, y, D2.papelS); rect(x, y - 3, x + w, y - 3, D2.papel); rect(x + 1, y - 2, x + w - 1, y - 2, D2.papel); pset(x, y - 2, D2.madS); pset(x + w, y - 2, D2.madS); if (h(k, 2, 101) > 0.5) rect(x + (w >> 1), y - 3, x + (w >> 1), y, D2.capa); }

// un nicho tallado con estantes de madera llenos de cristales y rollos; lleno 0–1; apunta los cristales en lista
function d2_nicho(R, x0, y0, x1, y1, baldas, lleno, lista, sem) {
  const { rect, pset } = R;
  rect(x0 - 2, y0 - 2, x1 + 2, y1 + 1, D2.q1); rect(x0, y0, x1, y1, D2.q0);
  for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) if (h(x, y, 102) > 0.7) pset(x, y, D2.q1);
  const alto = (y1 - y0) / baldas;
  for (let b = 1; b <= baldas; b++) {
    const yb = Math.round(y0 + b * alto) - 1;
    let x = x0 + 2;
    while (x < x1 - 4) {
      const k = sem + b * 97 + x, r = h(k, 3, 103), lleno_ = h(k, 4, 104) < 0.2 + 0.8 * lleno;
      if (!lleno_) { x += 4; continue; }
      if (r < 0.5) { const a = 5 + Math.floor(h(k, 5, 105) * 4); if (yb - a > yb - alto + 2) { d2_cristal(R, x + 1, yb - 1, a, k); lista.push([x + 1, yb - a, k]); } x += 4; }
      else if (r < 0.8) { const w = 6 + Math.floor(h(k, 6, 106) * 5); d2_rollo(R, x, yb - 1, w, k); if (h(k, 7, 107) > 0.5 && alto > 10) d2_rollo(R, x + 1, yb - 5, w - 2, k + 1); x += w + 2; }
      else { const w = 3 + Math.floor(h(k, 8, 108) * 3); for (let i = 0; i < w; i++) { const a = Math.round(alto * 0.6 + h(k, i, 109) * 2); rect(x + i * 2, yb - a, x + i * 2 + 1, yb - 1, [D2.mad, D2.capaS, D2.alfS, D2.oroS][Math.floor(h(k, i, 110) * 4)]); pset(x + i * 2, yb - a, D2.papel); } x += w * 2 + 2; }
    }
    rect(x0, yb, x1, yb + 1, D2.mad); rect(x0, yb, x1, yb, D2.madL); rect(x0, yb + 2, x1, yb + 2, D2.madS);
  }
}

// la roca tallada: tono por ruido, marcas de cincel en diagonal y grietas
const d2_roca = (x, y, base) => { let v = base + (d2_ruido(x * 0.12, y * 0.12, 111) - 0.5) * 1.4 + (h(x, y, 112) - 0.5) * 0.5; if ((x + y * 2) % 7 === 0 && h(Math.floor(x / 6), Math.floor(y / 5), 113) > 0.55) v -= 0.7; const g = d2_ruido(x * 0.05, y * 0.4, 114); if (Math.abs(g - 0.5) < 0.012) v -= 1.2; return v; };

function d2_diarioFijo(R, datos, lleno) {
  const { rect, pset, linea, poligono, disco } = R, B = R.buf;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    const boveda = 34 - Math.sqrt(Math.max(0, 1 - ((x - 160) / 200) ** 2)) * 30;
    if (y < 134) c = d2_tono(D2_ROCA, d2_roca(x, y, y < boveda ? 1.7 : 3.1) + (y < boveda + 2 && y >= boveda ? 1 : 0), x, y);
    else { // el suelo de losas irregulares, gastadas
      const filas = [134, 139, 145, 152, 160, 169, 181]; let f = 0; while (y >= filas[f + 1]) f++;
      const lw = 20 + f * 7, off = h(f, 0, 115) * lw, iu = Math.floor((x + off) / lw), j = y === filas[f] || Math.floor((x + 1 + off) / lw) !== iu;
      c = j ? D2.q1 : d2_tono(D2_ROCA, 3.3 + (h(iu, f, 116) - 0.5) * 0.7 + (d2_ruido(x * 0.2, y * 0.3, 117) - 0.5) * 0.7, x, y);
    }
    B[y * 320 + x] = c;
  }
  // el arranque de la bóveda (una arista de roca más clara) y el zócalo
  for (let x = 0; x < 320; x++) { const y = Math.round(34 - Math.sqrt(Math.max(0, 1 - ((x - 160) / 200) ** 2)) * 30); pset(x, y, D2.q4); pset(x, y + 1, D2.q5); pset(x, y - 1, D2.q0); }
  rect(0, 130, 319, 133, D2.q2); rect(0, 130, 319, 130, D2.q4);
  // los nichos con estantes, el panal de rollos y la máquina de grabar
  const cristales = [];
  d2_nicho(R, 8, 24, 146, 110, 4, lleno, cristales, 1);
  d2_nicho(R, 192, 52, 272, 124, 3, lleno, cristales, 2);
  rect(280, 50, 316, 133, D2.q1); rect(282, 52, 314, 132, D2.q0);
  // el botellero de rollos: una celosía de madera en rombos y en cada hueco un rollo visto de canto (papel con su lazo)
  for (let y = 52; y <= 132; y++) for (let x = 282; x <= 314; x++) { const a = ((x - 282 + y) % 10 + 10) % 10, b = ((x - 282 - y) % 10 + 10) % 10; if (a === 0 || b === 0) pset(x, y, D2.mad); else if (a === 1 || b === 1) pset(x, y, D2.madS); }
  for (let j = 0; j < 16; j++) for (let i = 0; i < 4; i++) { const x = 287 + i * 10 + (j & 1 ? 5 : 0), y = 57 + j * 5; if (x > 311 || y > 128 || h(i, j, 118) > 0.25 + 0.75 * lleno) continue;
    rect(x - 2, y - 1, x + 2, y + 1, D2.papelS); rect(x - 1, y - 2, x + 1, y + 2, D2.papelS); rect(x - 1, y - 1, x + 1, y + 1, D2.papel); pset(x - 1, y - 1, 0xfffff8e8); if (h(i, j, 119) > 0.6) pset(x + 2, y, D2.capa); }
  // la máquina de grabar: el armario de metal, el cristal en su ranura, las filas de lucecitas, dos indicadores y los cables
  rect(150, 90, 182, 134, D2.k); rect(151, 91, 181, 133, hex('#3a3e4a')); rect(151, 91, 181, 92, hex('#6a7080')); rect(179, 93, 181, 133, hex('#262a34'));
  for (let y = 96; y < 132; y += 9) { rect(153, y, 177, y, hex('#22252e')); rect(153, y + 1, 177, y + 1, hex('#545a68')); }
  rect(160, 82, 172, 90, D2.k); rect(161, 83, 171, 89, hex('#4a5060')); rect(163, 76, 169, 82, D2.k);
  rect(154, 112, 162, 120, D2.k); rect(155, 113, 161, 119, hex('#1a2030')); rect(166, 112, 176, 120, D2.k); rect(167, 113, 175, 119, hex('#1a2030'));
  linea(150, 124, 130, 132, D2.k); linea(150, 126, 128, 133, hex('#2a2a30'));
  datos.cristales = cristales;
  // la alfombra morada del suelo con su cenefa
  poligono([[160, 150], [300, 150], [316, 176], [146, 176]], (x, y) => (y === 150 || y === 176) ? D2.oro : d2_tono([D2.morS, D2.mor, D2.morL], 1 + (h(x, y, 119) - 0.5) * 0.8 + ((Math.floor(x / 10) + Math.floor(y / 6)) & 1 ? 0.25 : 0), x, y));
  linea(160, 151, 300, 151, D2.oroS); linea(147, 175, 315, 175, D2.oroS);
  b_diarioFijo(R);
  // la luz del farol: la roca se tiñe de cálido cerca y se apaga lejos (una sola vez, en el búfer)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d = Math.hypot(x - 172, (y - 34) * 1.15), f = Math.max(0.3, Math.min(1.2, 1.32 - d / 165));
    B[y * 320 + x] = d2_luz(B[y * 320 + x], f, f > 0.75 ? 1.08 : 0.92, 1, f > 0.75 ? 0.86 : 1.06);
  }
  // el farol con su cadena (después de la luz: no se apaga)
  for (let y = 0; y < 26; y += 2) { pset(172, y, D2.bronS); pset(172, y + 1, D2.bron); }
  rect(167, 25, 177, 27, D2.k); rect(168, 25, 176, 26, D2.bronL); rect(166, 27, 178, 38, D2.k); rect(168, 28, 176, 37, D2.luz); rect(171, 28, 173, 37, D2.bronS); rect(165, 38, 179, 40, D2.k); rect(166, 38, 178, 39, D2.bron); rect(169, 41, 175, 42, D2.bronS);
}
function d_diario(R, t, o = {}) {
  const { pset, rect } = R, lleno = Math.max(0, Math.min(1, o.diario ?? 0.7)), clave = 'diario' + Math.round(lleno * 8);
  const datos = d2_fijo(R, clave, (d) => d2_diarioFijo(R, d, Math.round(lleno * 8) / 8));
  const dicta = o.dicta !== false, voz = dicta ? Math.max(0, Math.sin(t * 7.3) * Math.sin(t * 2.1 + 1) + 0.2 * Math.sin(t * 17)) : 0;
  // el farol que titila: el halo tramado y la llama
  const fl = 0.5 + 0.25 * Math.sin(t * 9.1) + 0.25 * Math.sin(t * 13.3);
  for (let j = -26; j <= 26; j++) for (let i = -30; i <= 30; i++) { const d = i * i + j * j * 1.2; if (d < 900 && d > 90 && ((i + j) & 1)) d2_aclara(R, 172 + i, 33 + j, (1 - d / 900) * 0.12 * fl); }
  d2_llama(R, 172, 36, t, 0.9, 0);
  // los cristales que destellan en los estantes
  const cr = datos.cristales; for (let k = 0; k < cr.length; k++) { const [x, y, s] = cr[k]; const g = Math.sin(t * 1.3 + s * 0.7); if (g > 0.92) { pset(x, y, 0xffffffff); pset(x, y + 1, D2.cr2); } else if (g > 0.7) pset(x, y + 1, D2.cr2); }
  // la máquina: el cristal que se graba (brilla con la voz), las lucecitas y las agujas de los indicadores
  { const c = voz > 0.35 ? D2.cr2 : voz > 0.1 ? D2.cr1 : D2.cr0; rect(165, 70, 167, 81, c); pset(166, 69, D2.cr2); if (voz > 0.35) for (let k = 0; k < 6; k++) d2_aclara(R, 162 + (k * 3) % 9, 68 + ((k * 5) % 14), 0.4, D2.cr2); }
  for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) { const on = h(i, r, Math.floor(t * (dicta ? 6 : 1)) + 120) < 0.35 + voz * 0.5; pset(154 + i * 4, 97 + r * 9 - 1, on ? [D2.fuegoL, hex('#6ae88a'), D2.cr1, hex('#ff6a5a')][(i + r) % 4] : hex('#2a2e38')); }
  for (const [cx, k] of [[158, 0], [171, 1]]) { const a = -Math.PI * 0.8 + (k ? voz : 0.4 + 0.1 * Math.sin(t)) * Math.PI * 0.6; R.linea(cx, 119, Math.round(cx + Math.cos(a) * 3.5), Math.round(119 + Math.sin(a) * 3.5), D2.fuegoL); }
  // el polvo que flota en la luz del farol
  for (let k = 0; k < 10; k++) { const x = 140 + h(k, 130) * 80 + Math.sin(t * 0.4 + k) * 6, y = 40 + ((h(k, 131) * 90 + t * 2) % 90); d2_aclara(R, x, y, 0.35 * (Math.sin(t + k) > 0 ? 1 : 0.4)); }
  b_diarioVida(R, t);
  return { suelo: 150, libre: [160, 280], carro: [95, 145], carroS: 1, libro: [230, 131], mesa: [194, 142, 268], maquina: [166, 76] };
}
// EL DIARIO GORDÍSIMO de Leto (exportado: la escena lo pinta en otra parte cuando Atom lo levanta): un tomo enorme de
// tapas de cuero morado con cantoneras de bronce, el anillo del gusano en la tapa y cientos de hojas en el canto;
// (x, y): el centro de abajo; o.s escala (1 = 52 × 22 px); o.inclina −1–1: lo ladea (un poco) al levantarlo.
export function d2_libro(R, x, y, o = {}) {
  const { rect, pset, poligono } = R, s = o.s ?? 1, w = Math.round(26 * s), a = Math.round(22 * s), inc = o.inclina ?? 0, x0 = Math.round(x - w), x1 = Math.round(x + w);
  const dy = (xx) => Math.round(((xx - x) / w) * inc * 3);
  for (let xx = x0; xx <= x1; xx++) {
    const yb = y + dy(xx), yt = yb - a;
    for (let yy = yt; yy <= yb; yy++) {
      let c;
      if (yy <= yt + 2 || yy >= yb - 2) c = yy === yt || yy === yb ? D2.k : (yy === yt + 1 ? D2.morL : D2.mor);
      else if (xx < x0 + 3) c = xx === x0 ? D2.k : D2.morS;
      else c = ((yy - yt) % 2 === 0) ? D2.papelS : D2.papel;   // el canto de las hojas
      if ((xx < x0 + 5 || xx > x1 - 5) && (yy <= yt + 2 || yy >= yb - 2)) c = yy === yt || yy === yb ? D2.k : D2.bron;
      if (xx === x1) c = D2.k;
      pset(xx, yy, c);
    }
  }
  // la tapa de arriba vista un poco desde arriba, con el anillo
  const yt = y - a + dy(x);
  rect(x0 + 2, yt - 4, x1 - 2, yt - 1, D2.mor); rect(x0 + 2, yt - 4, x1 - 2, yt - 4, D2.morL); rect(x0 + 2, yt - 5, x1 - 2, yt - 5, D2.k);
  for (const cx of [x0 + 3, x1 - 4]) rect(cx, yt - 4, cx + 1, yt - 2, D2.bronL);
  rect(x - 4, yt - 4, x + 4, yt - 2, D2.oroS); rect(x - 3, yt - 3, x + 3, yt - 3, D2.oro);
  // las cintas de los marcapáginas que asoman
  for (const [i, c] of [[-10, D2.capaL], [-6, D2.alfL], [8, D2.oro]]) { pset(x + i, y + dy(x + i) + 1, c); pset(x + i, y + dy(x + i) + 2, c); }
}

// por delante en el diario: la mesa (tablero, faldón con la moldura, patas torneadas) con el diario gordísimo, y un cesto
// de rollos en la esquina izquierda; o.libro false: sin el libro (la escena lo pinta con T.d2_libro donde haga falta)
function d_diarioDelante(R, t, o = {}) {
  const { rect, pset } = R, x0 = 194, x1 = 268;
  rect(x0 - 1, 140, x1 + 1, 147, D2.k);
  for (let x = x0; x <= x1; x++) for (let y = 141; y <= 146; y++) pset(x, y, y === 141 ? D2.madL : y < 144 ? d2_tono([D2.madS, D2.mad, D2.madL], 1.6 + (h(x >> 2, y, 140) - 0.5) * 0.8, x, y) : y === 144 ? D2.madS : D2.mad);
  for (let x = x0 + 4; x < x1 - 2; x += 8) pset(x, 145, D2.bronL);
  for (const lx of [x0 + 3, x1 - 6]) { rect(lx - 1, 147, lx + 4, 156, D2.k); rect(lx, 147, lx + 3, 155, D2.mad); rect(lx, 147, lx, 155, D2.madL); rect(lx, 150, lx + 3, 151, D2.madS); rect(lx - 1, 155, lx + 4, 156, D2.madS); }
  rect(x0 + 10, 147, x1 - 10, 148, D2.madS);
  if (o.libro !== false) d2_libro(R, 230, 141, {});
  // el tintero y la pluma junto al libro, y un cristal suelto
  rect(260, 136, 264, 140, D2.k); rect(261, 137, 263, 139, hex('#2a2a3a')); R.linea(263, 136, 267, 129, D2.papel);
  d2_cristal(R, 199, 140, 6, 3);
  // el cesto de rollos en la esquina
  rect(2, 160, 34, 179, D2.k); for (let x = 3; x < 34; x++) for (let y = 161; y < 180; y++) pset(x, y, ((x + (y >> 1)) % 4 === 0) ? D2.madS : (y & 1 ? D2.mad : D2.madL));
  for (let k = 0; k < 6; k++) { const x = 6 + k * 5, y = 158 - (k % 2) * 3; R.linea(x, 162, x + 2, y - 6, D2.papelS); R.disco(x + 2, y - 7, 2, D2.papel); pset(x + 2, y - 7, D2.madS); }
  return { libro: [230, 131] };
}

function d2_ventanaFijo(R, datos) {
  const { rect, pset, poligono, disco } = R, B = R.buf;
  const dentro = (x, y) => x >= 82 && x <= 188 && y >= 22 && y <= 110 && (y >= 50 || Math.abs(x + 0.5 - 135) < 53.5 * Math.sqrt(Math.max(0, (y - 22) / 28)) + 0.3);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (y < 132) c = d2_tono(D2_ROCA, d2_roca(x, y, 2.5), x, y);
    else { const filas = [132, 138, 145, 153, 162, 172, 181]; let f = 0; while (y >= filas[f + 1]) f++;
      const lw = 22 + f * 8, off = h(f, 9, 115) * lw, iu = Math.floor((x + off) / lw), j = y === filas[f] || Math.floor((x + 1 + off) / lw) !== iu;
      c = j ? D2.q1 : d2_tono(D2_ROCA, 3.1 + (h(iu, f, 119) - 0.5) * 0.7 + (d2_ruido(x * 0.2, y * 0.3, 120) - 0.5) * 0.7, x, y); }
    B[y * 320 + x] = c;
  }
  // las jambas hondas del ventanal: la izquierda, de cara a la luna (clara y azulada); la derecha en sombra; el alféizar
  for (let y = 12; y < 122; y++) for (let x = 66; x < 206; x++) {
    if (dentro(x, y)) continue;
    const izq = dentro(x + 12, y) && x < 135, der = dentro(x - 12, y) && x > 135, arr = dentro(x, y + 10);
    if (izq) pset(x, y, d2_mezcla(d2_tono(D2_ROCA, d2_roca(x, y, 4.2), x, y), D2.luna, 0.35));
    else if (der) pset(x, y, d2_tono(D2_ROCA, d2_roca(x, y, 1.4), x, y));
    else if (arr) pset(x, y, d2_tono(D2_ROCA, d2_roca(x, y, 2), x, y));
  }
  for (let y = 110; y < 120; y++) for (let x = 70 + (y - 110); x < 202 - (y - 110); x++) pset(x, y, y < 112 ? D2.q1 : d2_mezcla(d2_tono(D2_ROCA, 4 - (y - 112) * 0.2, x, y), D2.luna, 0.3));
  rect(70, 120, 201, 121, D2.q1);
  datos.dentro = dentro;
  // los estantes con cristales a la izquierda y el nicho de rollos sobre el carro
  const cristales = [];
  d2_nicho(R, 6, 30, 56, 124, 4, 0.9, cristales, 7);
  d2_nicho(R, 214, 50, 272, 104, 2, 0.8, cristales, 8);
  datos.cristales = cristales;
  // la máquina de grabar en el rincón izquierdo (más pequeña, de lado)
  rect(18, 128, 44, 150, D2.k); rect(19, 129, 43, 149, hex('#3a3e4a')); rect(19, 129, 43, 129, hex('#6a7080')); rect(40, 130, 43, 149, hex('#262a34'));
  rect(27, 122, 35, 128, D2.k); rect(28, 123, 34, 127, hex('#4a5060'));
  // la alfombra ovalada bajo el ventanal, con su cenefa
  disco(150, 160, 1, D2.q1);
  for (let y = 146; y < 176; y++) for (let x = 60; x < 220; x++) { const e = ((x - 140) / 78) ** 2 + ((y - 161) / 14) ** 2; if (e > 1) continue; pset(x, y, e > 0.86 ? D2.k : e > 0.72 ? ((x >> 1) & 1 ? D2.oro : D2.oroS) : d2_tono([D2.morS, D2.mor, D2.morL], 1 + (h(x, y, 121) - 0.5) * 0.8 + (Math.abs(e - 0.4) < 0.05 ? 0.8 : 0), x, y)); }
  b_ventanaFijo(R);
  // el haz de la luna en el suelo y en el aire
  d2_haz(R, [[84, 50], [188, 50], [236, 176], [120, 178]], 0.07, D2.luna);
  d2_haz(R, [[104, 136], [196, 134], [226, 170], [118, 172]], 0.14, D2.luna);
  // la penumbra: la roca de los lados más oscura, el rincón del aplique cálido
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const dl = Math.hypot(x - 296, (y - 76) * 1.1), dv = Math.hypot((x - 135) / 1.3, y - 80);
    const f = Math.max(0.35, Math.min(1.15, 0.55 + Math.max(0, 1 - dl / 90) * 0.6 + Math.max(0, 1 - dv / 150) * 0.35));
    const cal = Math.max(0, 1 - dl / 90);
    B[y * 320 + x] = d2_luz(B[y * 320 + x], f, 0.92 + cal * 0.2, 0.96 + cal * 0.04, 1.08 - cal * 0.22);
  }
  // el aplique de bronce de la derecha
  rect(292, 78, 300, 80, D2.k); rect(293, 78, 299, 79, D2.bron); rect(295, 80, 297, 88, D2.bronS); rect(291, 75, 301, 77, D2.bronL);
}
// el Arrakis verde de noche por el ventanal (x, y en pantalla)
function d2_nocheFuera(x, y, t) {
  // la luna con sus mares y su halo
  const dl = Math.hypot(x + 0.5 - 112, y + 0.5 - 40);
  if (dl < 8) { const dx = x + 0.5 - 112, dy = y + 0.5 - 40; return dl > 7.2 || dx < -5.5 ? D2.lunaS : (Math.hypot(dx - 2.5, dy + 1.5) < 2.2 || Math.hypot(dx - 1, dy - 3) < 1.6) ? D2.lunaS : D2.lunaL; }
  const c1 = 80 + Math.sin(x * 0.07 + 1) * 4 + d2_ruido(x * 0.15, 1, 151) * 4, c2 = 88 + Math.sin(x * 0.05 + 2.5) * 5, c3 = 98 + Math.sin(x * 0.09) * 3;
  if (y > c3) {
    const rio = Math.abs(y - (104 + Math.sin(x * 0.1) * 2.5)) < 2.6;
    if (rio) { const br = Math.abs(x - 112) < 10 - Math.abs(y - 104) * 1.5 && Math.sin(x * 0.45 + t * 3 + y * 2.1) > 0.1; return br ? D2.lunaL : d2_tono([D2.n2, D2.n3, D2.nn1], 1 + Math.sin(x * 0.6 + t * 2) * 0.6, x, y); }
    return d2_tono([D2.nb, D2.nb1b, D2.nb2b], 0.6 + d2_ruido(x * 0.8, y * 0.8, 152) * 1.4, x, y);
  }
  if (y > c2) {   // la aldea en filas sobre la colina media, con ventanitas que se encienden
    let c = d2_tono([D2.nb, D2.nb1b, D2.nb2b], 0.8 + d2_ruido(x * 0.9, y * 0.9, 153) * 1.2, x, y);
    if (x > 140 && x < 186) { const lx = (x - 140) % 7, cx = Math.floor((x - 140) / 7), yy = y - Math.round(88 + Math.sin(140 * 0.05 + 2.5) * 5) - 1; if (lx < 5 && yy >= 0 && yy < 6) { if (yy < 2) { if (!(yy === 0 && (lx === 0 || lx === 4))) c = D2.nn1; } else c = yy === 3 && lx === 2 && Math.sin(t * 0.6 + cx * 1.7) > -0.3 ? D2.luz : D2.n3; } }
    return c;
  }
  if (y > c1) return d2_tono([D2.nb, D2.nb1b, D2.nn0], 1 + d2_ruido(x * 0.6, y * 0.6, 154) * 0.8 + (c1 + 5 - y) / 5 * 0.5, x, y);
  // la torre de vigía con su luz
  if (x >= 165 && x <= 171 && y > c1 - 13 && y <= c1) { const yy = y - (c1 - 13); if (yy < 4 && Math.abs(x - 168) > yy * 0.8) return d2_tono(D2_NOCHE, (y - 22) / 70 * 2.6 + 0.3, x, y); if (x === 165 || x === 171) return yy < 6 ? D2.nn0 : D2.nb; return yy >= 5 && yy <= 6 && Math.abs(x - 168) < 2 && Math.sin(t * 3) > -0.5 ? D2.fuegoL : x < 168 ? D2.nn0 : D2.nb1b; }
  // las nubes de tres tonos iluminadas por la luna, a dos velocidades
  const n = d2_ruido(x * 0.06 - t * 0.25, y * 0.12, 155) * 0.6 + d2_ruido(x * 0.12 - t * 0.6, y * 0.22, 156) * 0.4 - (y - 22) / 70 * 0.25;
  if (n > 0.52) { const nb = d2_ruido(x * 0.06 - t * 0.25, (y + 2) * 0.12, 155) * 0.6 + d2_ruido(x * 0.12 - t * 0.6, (y + 2) * 0.22, 156) * 0.4; return n > 0.6 && nb < n ? D2.nn2 : n > 0.56 ? D2.nn1 : D2.nn0; }
  // las estrellas que titilan, el halo de la luna y el cielo tramado
  if (h(x, y, 157) > 0.985 && Math.sin(t * 2 + x * y) > -0.4) return h(x, y, 158) > 0.5 ? D2.lunaL : D2.nn2;
  const v = (y - 22) / 70 * 2.6 + (dl < 20 ? (1 - dl / 20) * 1.4 : 0);
  return d2_tono(D2_NOCHE, v + 0.3, x, y);
}

function d_ventana(R, t, o = {}) {
  const { pset } = R;
  const datos = d2_fijo(R, 'ventana', (d) => d2_ventanaFijo(R, d)), B = R.buf, dentro = datos.dentro;
  for (let y = 22; y <= 110; y++) for (let x = 82; x <= 188; x++) {
    if (!dentro(x, y)) continue;
    if (Math.abs(x - 135) < 1) { B[y * 320 + x] = D2.q2; continue; }
    B[y * 320 + x] = d2_nocheFuera(x, y, t);
  }
  // los murciélagos que cruzan (recortados al hueco)
  R.recorte([82, 22, 188, 110]);
  for (let k = 0; k < 3; k++) { const u = ((t * 0.09 + k * 0.33) % 1.3) - 0.15, x = 82 + u * 106, y = 46 + k * 9 + Math.sin(t * 2 + k) * 4, a = Math.sin(t * 14 + k * 2) > 0 ? -1 : 1;
    if (dentro(Math.round(x), Math.round(y))) { pset(x, y, D2.k); pset(x - 1, y + a, D2.k); pset(x + 1, y + a, D2.k); pset(x - 2, y + a * 0, D2.k); pset(x + 2, y, D2.k); } }
  R.recorte(null);
  // los cristales que destellan, la llama del aplique y su halo, las lucecitas de la máquina
  const cr = datos.cristales; for (let k = 0; k < cr.length; k++) { const [x, y, s] = cr[k]; const g = Math.sin(t * 1.1 + s * 0.9); if (g > 0.9) pset(x, y, 0xffffffff); else if (g > 0.6) pset(x, y + 1, D2.cr2); }
  d2_llama(R, 296, 74, t, 0.9, 2);
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = i * i + j * j; if (d < 196 && d > 20 && ((i + j) & 1)) d2_aclara(R, 296 + i, 72 + j, (1 - d / 196) * (0.1 + 0.04 * Math.sin(t * 9)), D2.fuegoL); }
  for (let i = 0; i < 5; i++) pset(22 + i * 4, 134, h(i, Math.floor(t * 4), 160) > 0.5 ? [D2.fuegoL, hex('#6ae88a'), D2.cr1][i % 3] : hex('#2a2e38'));
  { const v = Math.max(0, Math.sin(t * 5)); R.rect(30, 118, 32, 122, v > 0.5 ? D2.cr2 : D2.cr1); }
  b_ventanaVida(R, t);
  // motas de polvo en el haz de luna
  for (let k = 0; k < 12; k++) { const kk = (h(k, 161) + t * 0.02) % 1, x = lerp(88, 186, h(k, 162)) + kk * 40, y = lerp(50, 176, kk); if (Math.sin(t * 2 + k) > 0) d2_aclara(R, x, y, 0.4, D2.luna); }
  return { suelo: 150, libre: [30, 170], carro: [246, 148], carroS: 1, carroDir: -1, alfeizar: [72, 112, 200] };
}
// por delante en la vista del ventanal: el canto de la estantería y un cesto de rollos en la esquina izquierda de abajo
function d_ventanaDelante(R, t, o = {}) {
  const { rect, pset } = R;
  rect(0, 156, 26, 179, D2.k); for (let x = 1; x < 26; x++) for (let y = 157; y < 180; y++) pset(x, y, d2_luz(((x + (y >> 1)) % 4 === 0) ? D2.madS : (y & 1 ? D2.mad : D2.madL), 0.6));
  for (let k = 0; k < 5; k++) { const x = 4 + k * 4, y = 154 - (k % 2) * 3; R.linea(x, 158, x + 2, y - 5, D2.papelS); R.disco(x + 2, y - 6, 1.8, d2_luz(D2.papel, 0.7)); }
  return {};
}

// las dos luces del puente: el ocaso (la boda, el cierre) y la mañana (el río después)
const e_hex = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : hex(v)]));

const E_PAL = {
  ocaso: e_hex({
    cielo: ['#262658', '#363270', '#4c3c80', '#6a4488', '#8e4c88', '#b45882', '#d4687a', '#ea806c', '#f49c62', '#f8b866', '#fcd282'],
    sol: '#fff8d8', solM: '#ffe6a0', halo: ['#f4a868', '#f8bc74', '#fcd088'],
    nS: '#5c4278', nC: '#8e5084', nM: '#c4647c', nL: '#f49c6c', nF: '#ffd690',
    monte: ['#b47c94', '#946690', '#74507e'], bruma: '#d88a8a',
    vL: '#a89a50', vM: '#4e6a48', vS: '#34503e', vD: '#22363a', vF: '#f0a858',
    pL: '#f6c494', pM: '#d8a078', pS: '#b07c6c', pD: '#845a64', pK: '#523a4e', pJ: '#74505c', pMusgo: '#5e6450',
    roca: '#8a6060', rocaL: '#c88a70', rocaS: '#5a3c4c', arena: '#c8946c', arenaL: '#e8b88a', arenaS: '#8a6058',
    agua: ['#f8c070', '#e88a6a', '#b8607a', '#7a4a7a', '#463a6a', '#2e2a56'], aguaB: '#fff0c0', aguaO: '#f8c890', aguaD: '#2a2450',
    ave: '#3a2840',
  }),
  manana: e_hex({
    cielo: ['#4a7ab8', '#5a88c0', '#6c98c8', '#80a8d0', '#96b8d8', '#acc6dc', '#c2d2dc', '#d8dcd4', '#ead8c4', '#f4dcc0', '#f8e4c8'],
    sol: '#fffef0', solM: '#fff4c8', halo: ['#e8e4d0', '#f0ecd8', '#f8f4e4'],
    nS: '#8a9ab8', nC: '#b4c0d4', nM: '#d0d6e0', nL: '#eef0f0', nF: '#ffffff',
    monte: ['#a8bcd0', '#86a0b8', '#62829c'], bruma: '#c8d4dc',
    vL: '#9ab858', vM: '#4e8048', vS: '#2e5a3a', vD: '#1e3e30', vF: '#d8e070',
    pL: '#ece2cc', pM: '#d0c2a8', pS: '#a89884', pD: '#7e7062', pK: '#4e4640', pJ: '#8a7c6c', pMusgo: '#5e6e4e',
    roca: '#8a7a6a', rocaL: '#b8a890', rocaS: '#5a4e46', arena: '#d8c49c', arenaL: '#f0e0bc', arenaS: '#a8946e',
    agua: ['#e8e4d8', '#b8ccd8', '#88a8c4', '#5e86a8', '#3e6688', '#2a4a6a'], aguaB: '#ffffff', aguaO: '#d8e8f0', aguaD: '#1e3a58',
    ave: '#2a3040',
  }),
};

// la gente de fondo: ropas [base, luz, sombra], pieles y pelos; las Habladoras de Pez; el estandarte del gusano
const E_ROPA = [['#c84a4a', '#e86a5a', '#8a2e3a'], ['#e0a038', '#f4c860', '#a8702a'], ['#4a8a6a', '#6aaa82', '#2e5a4a'], ['#4a68a8', '#6a88c8', '#2e4478'],
  ['#e0d4c0', '#f8eee0', '#a89a88'], ['#9a4a8a', '#ba6aa8', '#6a2e5e'], ['#7a5a3a', '#9a7a52', '#523a26'], ['#2a7a8a', '#4a9aaa', '#1a4e5a']].map((a) => a.map(hex));

const E_PIEL = ['#f0c8a0', '#d8a07a', '#b07850', '#8a5a3a', '#f4d0b0'].map(hex);

const E_PELO = ['#2a1e1a', '#5a3420', '#c89848', '#a03a20', '#3a2a2a', '#8a8a8a', '#1a1a22'].map(hex);

const E_HAB = e_hex({ u: '#6a7a98', uL: '#8ea0bc', uS: '#4a5674', capa: '#6a3a7a', capaS: '#4a2858', pelo: '#2a1e22', pierna: '#2a2630' });

const E_EST = e_hex({ v: '#2a4a3a', vL: '#3e6a50', n: '#1a1620', oro: '#e8c060', asta: '#3a2a20' });

const E_FLOR = ['#f8b8c8', '#fff4f0', '#f0d070', '#e8708a'].map(hex);

const E_POLVO = e_hex({ L: '#f0d0a8', M: '#c8a080', S: '#94706a' });

// trama de Bayer 4 × 4 y un degradado tramado entre los tonos de st (u 0–1)
const E_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const e_bay = (x, y) => E_BAY[((y & 3) << 2) | (x & 3)];

const e_grad = (st, u, x, y) => { u = Math.max(0, Math.min(0.9999, u)) * (st.length - 1); const i = Math.floor(u); return (u - i) > e_bay(x, y) ? st[Math.min(st.length - 1, i + 1)] : st[i]; };

const e_cl = (u) => Math.max(0, Math.min(1, u));

const e_sig = (a, m) => ((a % m) + m) % m;

// las zonas tranquilas: la de Atom y la barra del año (con sus cifras)
const e_tranquila = (x, y) => (x >= 272 && y <= 48) || (y <= 19 && x <= 176);

// un fondo fijo por clave, pintado una vez en un búfer de R.nuevo() (con el R.usar(prev) de siempre)
const e_CACHE = new WeakMap();

function e_buf(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(b); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// el cielo tramado de y0 a y1 (u = y / hor), más claro junto al sol, con cirros finos
function e_cielo(R, P, y0, y1, hor, sx, sy) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    let u = y / hor; const d = Math.hypot(x - sx, (y - sy) * 1.6); u += Math.max(0, 1 - d / 150) * 0.16;
    const ci = Math.sin(y * 1.7 + Math.sin(x * 0.031 + y * 0.4) * 2.2) * 0.5 + 0.5;
    if (y > 20 && ci > 0.94 && h(x >> 3, y, 471) > 0.4 && !e_tranquila(x, y)) u += 0.07;
    B[y * 320 + x] = e_grad(P.cielo, u, x, y);
  }
}

// el sol bajo con su halo tramado y dos franjas de bruma que lo cruzan
function e_sol(R, P, x, y, r) {
  R.halo(x, y, r * 3.4, P.halo, 1.25); R.disco(x, y, r, P.solM); R.disco(x, y, r - 2, P.sol);
  for (const dy of [Math.round(r * 0.35), Math.round(r * 0.7)]) for (let i = -r; i <= r; i++) if (i * i + dy * dy < r * r) R.pset(x + i, y + dy, P.halo[2]);
}

// una sierra de montes (silueta con tres senos) rellena hasta y «hasta», con el filo claro y bruma tramada abajo
function e_montes(R, yb, amp, f, sem, c, filo, bruma, hasta, x0 = 0, x1 = 319) {
  for (let x = x0; x <= x1; x++) {
    const top = Math.round(yb - amp * (0.55 * Math.sin(x * f + sem) + 0.3 * Math.sin(x * f * 2.3 + sem * 2) + 0.15 * Math.sin(x * f * 5.1 + sem * 3)) - (h(x >> 1, sem, 472) < 0.4 ? 1 : 0));
    for (let y = Math.max(0, top); y <= hasta; y++) R.pset(x, y, y === top ? filo : (bruma && e_bay(x, y) < (y - top) / (hasta - top + 1) * 0.6 ? bruma : c));
  }
}

// las copas del bosque: celdas de árboles redondos con luz arriba a la derecha (luz 0–1: cuánto filo de sol)
function e_copas(x, y, P, luz = 0.5, k = 0) {
  const row = Math.floor(y / 4), col = Math.floor((x + (row & 1) * 2.5) / 5);
  let best = 9, bx = 0, by = 0;
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
    const rr = row + j, cc = col + i, cx = cc * 5 - (rr & 1) * 2.5 + 2.5 + (h(cc, rr, 473 + k) - 0.5) * 2, cy = rr * 4 + 2 + (h(cc, rr, 474 + k) - 0.5) * 2, d = Math.hypot(x - cx, (y - cy) * 1.2);
    if (d < best) { best = d; bx = x - cx; by = y - cy; }
  }
  if (best > 3.1) return P.vD;
  const s = bx * 0.6 - by * 0.8;
  if (s > 1.3) return luz > 0.6 ? P.vF : P.vL;
  if (s > 0.2) return luz > 0.35 ? P.vL : P.vM;
  return s < -1.2 ? P.vS : P.vM;
}

// el bosque lejano: copas más pequeñas cuanto más lejos (lej 0–1) y tramadas con la bruma de los montes
function e_lejos(x, y, P, luz, lej, k = 0) {
  const sc = 1 + lej * 0.9, c = e_copas(x * sc, y * sc, P, luz, k);
  return e_bay(x, y) < lej * 0.55 ? (c === P.vD || c === P.vS ? P.monte[2] : P.monte[1]) : c;
}

// una nube de tres tonos (sombra arriba, cuerpo, el vientre encendido por el sol bajo y el filo del lado del sol)
const e_NUBES = new Map();

function e_nube(R, P, cx, cy, w, hg, sem, sx) {
  let bl = e_NUBES.get(sem + ':' + w);
  if (!bl) { bl = []; const n = 4 + Math.floor(h(sem, 1, 480) * 3);
    for (let i = 0; i < n; i++) { const f = (i + 0.5) / n; bl.push([(f - 0.5) * w * 0.85, -h(sem, i, 481) * hg * 0.4 - (1 - Math.abs(f - 0.5) * 2) * hg * 0.35, w * (0.16 + h(sem, i, 482) * 0.12), hg * (0.4 + h(sem, i, 483) * 0.3)]); }
    e_NUBES.set(sem + ':' + w, bl); }
  const dentro = (x, y) => { if (y > cy) return false; for (const [dx, dy, rx, ry] of bl) { const a = (x - cx - dx) / rx, b = (y - cy - dy) / ry; if (a * a + b * b < 1) return true; } return false; };
  const lado0 = Math.sign(sx - cx) || 1;
  for (let y = Math.floor(cy - hg * 1.4); y <= Math.ceil(cy); y++) for (let x = Math.floor(cx - w * 0.75); x <= Math.ceil(cx + w * 0.75); x++) {
    if (x < 0 || x > 319 || y < 0 || e_tranquila(x, y) || !dentro(x, y)) continue;
    const lado = (x - cx) * lado0 / w, rel = (cy - y) / (hg * 1.2);
    let c;
    if (!dentro(x, y + 1)) c = lado > 0.1 ? P.nF : P.nL;
    else if (!dentro(x, y + 2)) c = e_bay(x, y) < 0.5 + lado ? P.nL : P.nM;
    else if (!dentro(x, y - 1)) c = lado > 0.2 ? P.nM : P.nC;
    else c = e_grad([P.nM, P.nC, P.nS], rel + 0.2 - lado * 0.4, x, y);
    R.pset(x, y, c);
  }
}

// un cielo de nubes: [x0, y, ancho, alto, velocidad, semilla]; van de izquierda a derecha y dan la vuelta
function e_nubes(R, t, P, lista, sx) { for (const [x0, y, w, hg, v, s] of lista) e_nube(R, P, e_sig(x0 + t * v, 420) - 50, y, w, hg, s, sx); }

// pájaros lejanos que aletean (n, entre y0 e y1)
function e_aves(R, t, P, n, y0, y1, k = 0) {
  for (let i = 0; i < n; i++) {
    const v = 6 + h(i, 1, 490 + k) * 8, x = Math.round(e_sig(h(i, 2, 490 + k) * 420 + t * v, 420) - 50), y = Math.round(y0 + h(i, 3, 490 + k) * (y1 - y0) + Math.sin(t * 0.8 + i) * 2), al = Math.floor(t * 5 + i * 1.7) % 3;
    if (x < 2 || x > 317 || e_tranquila(x, y)) continue;
    const a = al === 0 ? -1 : al === 1 ? 0 : 1;
    R.pset(x, y, P.ave); R.pset(x - 1, y + Math.min(0, a), P.ave); R.pset(x + 1, y + Math.min(0, a), P.ave); R.pset(x - 2, y + a, P.ave); R.pset(x + 2, y + a, P.ave);
  }
}

// ondas que corren por el agua y el brillo del sol que titila (enAgua(x, y) dice dónde hay agua)
function e_ondas(R, t, P, n, y0, y1, enAgua, sx, k = 0) {
  for (let i = 0; i < n; i++) {
    const y = Math.round(y0 + h(i, 1, 500 + k) * (y1 - y0)), p = (y - y0) / Math.max(1, y1 - y0), len = 2 + Math.round(p * 6 + h(i, 2, 500 + k) * 3), v = (3 + p * 5) * (i % 2 ? 1 : -0.6);
    const x = Math.round(e_sig(h(i, 3, 500 + k) * 360 + t * v, 360) - 20), cerca = Math.abs(x - sx) < 10 + p * 22, c = cerca ? P.aguaB : (i % 3 ? P.aguaO : P.aguaD);
    for (let j = 0; j < len; j++) if (enAgua(x + j, y)) R.pset(x + j, y, c);
  }
  const f = Math.floor(t * 6);
  for (let y = y0; y <= y1; y++) { const p = (y - y0) / Math.max(1, y1 - y0), an = 4 + p * 16;
    for (let x = Math.round(sx - an); x <= sx + an; x++) if (enAgua(x, y) && h(x, y, 510 + f) > 0.86 - (1 - Math.abs(x - sx) / an) * 0.1) R.pset(x, y, h(x, y, 511) < 0.5 ? P.aguaB : P.aguaO); }
}

const E_ARCOS = [[30, 25], [92, 27], [160, 30], [228, 27], [290, 25]], E_ARR = 44, E_AGUA = 66, E_OJOS = [60, 124.5, 195.5, 260], E_PILAS = [[55, 65], [119, 130], [190, 201], [255, 265]];

// el material del puente en (u, v): un color o null (hueco: se ve lo de detrás). s = píxeles por unidad (las juntas
// y los balaustres se simplifican de lejos); obl: escorzo, con el intradós de los arcos en sombra
function e_mat(u, v, P, s = 1, obl = false) {
  if (v < 0 || v > E_AGUA || u < -8 || u > 328) return null;
  const jw = 1 / s, fv = Math.floor(v);
  if (v < 2) return fv < 1 ? P.pL : (e_sig(u, 24) < jw ? P.pS : P.pM);                // la albardilla
  if (v < 7) {                                                                         // la balaustrada con sus pilastras
    const m24 = e_sig(u + 2, 24);
    if (m24 < 4) return m24 < jw ? P.pL : m24 > 4 - jw ? P.pD : P.pM;
    if (fv >= 6) return P.pS;
    if (s < 0.75) return e_sig(u, 4) < 2 ? P.pM : P.pD;
    const m = e_sig(u, 4); if (m < 1) return P.pL; if (m < 2) return fv === 4 ? P.pD : P.pS; return null;
  }
  if (v < 10) return fv === 7 ? P.pL : fv === 8 ? P.pM : P.pS;                         // la cornisa
  if (v < 11) return e_sig(u, 3) < 1.5 ? P.pK : P.pD;                                  // los dentículos
  for (const [c, r] of E_ARCOS) {                                                      // los arcos y sus dovelas
    const dx = u - c; if (Math.abs(dx) > r + 5) continue;
    if (v >= E_ARR) { if (Math.abs(dx) < r) return obl && dx > r - 7 * jw * s ? (e_sig(v, 6) < jw ? P.pK : P.pD) : null; continue; }
    const d = Math.hypot(dx, v - E_ARR);
    if (d < r) return obl && d > r - 6 && dx > -r * 0.5 ? (e_sig(Math.atan2(E_ARR - v, dx) * 9, 1) < 0.12 ? P.pK : P.pD) : null;
    if (d < r + 4) {
      if (Math.abs(dx) < 2.4) return d < r + 1 ? P.pS : P.pL;                         // la clave
      const seg = e_sig(Math.atan2(E_ARR - v, dx) / (Math.PI / 15) + 0.5, 1);
      if (seg < 0.1 * jw * 2.4) return P.pK; if (d < r + 1) return P.pD; return d > r + 3 ? P.pS : dx > 0 ? P.pL : P.pM;
    }
  }
  for (const oc of E_OJOS) { const d = Math.hypot(u - oc, v - 24);                     // los ojos redondos
    if (d < 4) return obl ? (u - oc > 0 ? P.pD : null) : s < 0.75 ? P.pK : null;
    if (d < 6) return e_sig(Math.atan2(v - 24, u - oc) * 2.5, 1) < 0.18 ? P.pK : d < 4.8 ? P.pD : P.pM; }
  for (const [a, b] of E_PILAS) { const dx = u - (a + b) / 2, top = 32 + Math.abs(dx) * 1.5;   // los tajamares
    if (Math.abs(dx) <= 4.5 && v >= top) { if (v - top < jw) return P.pL; if (dx > 4.5 - jw) return P.pL; if (dx < -4.5 + jw) return P.pD;
      if (e_sig(v - 34, 4) < jw) return P.pJ; return v > 57 ? (e_bay(Math.floor(u * s), fv) < (v - 57) / 9 ? P.pMusgo : P.pS) : P.pM; } }
  const big = s < 0.75, rh = big ? 8 : 4, bw = big ? 18 : 10, row = Math.floor((v - 11) / rh), off = (row & 1) * bw / 2, col = Math.floor((u + off) / bw);
  if (e_sig(v - 11, rh) < jw * 0.999 || e_sig(u + off, bw) < jw * 0.999) return P.pJ;   // la sillería
  const n = h(col, row, 476);
  if (v < 13) return n < 0.5 ? P.pD : P.pS;                                            // la sombra de la cornisa
  for (const oc of E_OJOS) if (Math.abs(u - oc) < 1.6 && v > 30 && v < 40 + h(oc, 1, 477) * 10) return P.pS;   // churretes bajo los ojos
  if (v > 55 && e_bay(Math.floor(u * s), fv) < (v - 55) / 11 * 0.9) return P.pMusgo;   // el musgo y lo mojado
  const q = (v < 22 ? 0.2 : v < 40 ? 0.42 : 0.6) + (n - 0.5) * 0.36;
  return q < 0.17 ? P.pL : q < 0.5 ? P.pM : q < 0.72 ? P.pS : P.pD;
}

// pinta el puente con inv(x, y) → [u, v, s] dentro de la caja; o.hueco(u, v): lo que no se pinta; o.obl: escorzo
function e_pintaPuente(R, P, inv, [x0, y0, x1, y1], o = {}) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const [u, v, s] = inv(x, y); if (o.hueco && o.hueco(u, v)) continue;
    const c = e_mat(u, v, P, s, o.obl); if (c != null) B[y * 320 + x] = c;
  }
}

// el hueco de la rotura (en unidades del modelo; v negativo = el pretil de atrás y el tablero), bordes dentados
function e_hueco(u, v, roto = 1) {
  if (roto < 0.2 || v < -16 || v > 27) return false;
  const fila = Math.floor(v / 2), iz = 160 - 13 - h(fila, 1, 478) * 4, de = 160 + 12 + h(fila, 2, 478) * 4;
  if (u < iz || u > de) return false;
  return v < 18 + Math.abs(u - 160) * 0.3 + h(Math.floor(u / 2), 3, 478) * 3;
}

// una figurita de fondo de «al» px (4–20), con los pies en (x, yp). tipo: 'gente' | 'hab' (Habladora de Pez, capa
// morada) | 'est' (abanderado con el estandarte verde y negro del anillo) | 'mus' (músico con tambor) | 'dama' (vestido
// largo de oro). o.dir, o.anda, o.saluda, o.espalda (de espaldas: sin cara)
function e_gente(R, x, yp, al, t, k, tipo = 'gente', o = {}) {
  const { rect, pset } = R; x = Math.round(x); yp = Math.round(yp); al = Math.max(4, Math.round(al));
  const dir = o.dir ?? 1, R0 = E_ROPA[k % E_ROPA.length], hab = tipo === 'hab', dama = tipo === 'dama';
  const ropa = hab ? E_HAB.u : dama ? hex('#e8c060') : R0[0], ropaL = hab ? E_HAB.uL : dama ? hex('#fff0b0') : R0[1], ropaS = hab ? E_HAB.uS : dama ? hex('#b08a3a') : R0[2];
  const piel = E_PIEL[(k * 7 + 3) % E_PIEL.length], pelo = hab ? E_HAB.pelo : E_PELO[(k * 5 + 1) % E_PELO.length], pierna = hab ? E_HAB.pierna : hex('#3a2e30');
  const paso = o.anda ? Math.floor(t * 4.5 + k * 0.7) % 2 : 0, y0 = yp - al + 1 - (o.anda && paso ? 1 : 0);
  const hw = Math.max(2, Math.round(al * 0.3)), hh = Math.max(2, Math.round(al * 0.28)), tw = Math.max(2, Math.round(al * 0.38)), cad = yp - Math.max(1, Math.round(al * 0.28));
  const hx0 = x - (hw >> 1), tx0 = x - (tw >> 1), tx1 = tx0 + tw - 1, atras = dir > 0 ? tx0 - 1 : tx1 + 1, frente = dir > 0 ? tx1 + 1 : tx0 - 1;
  if (hab) { rect(Math.min(atras, atras + dir), y0 + hh, Math.max(atras, atras + dir), cad + 1, E_HAB.capa); pset(atras, cad + 1, E_HAB.capaS); }   // la capa
  if (dama) { for (let y = y0 + hh; y <= yp; y++) { const ens = Math.round((y - y0 - hh) / (yp - y0 - hh + 1) * 2); rect(tx0 - ens, y, tx1 + ens, y, y > cad ? ropaS : ropa); pset(tx1 + ens, y, ropaL); } }
  else {
    rect(tx0, y0 + hh, tx1, cad, ropa); rect(tx1, y0 + hh, tx1, cad, ropaL); rect(tx0, cad, tx1, cad, ropaS);       // el cuerpo, con luz y sombra
    const lw = Math.max(1, Math.round(al * 0.1));
    if (paso) { rect(tx0, cad + 1, tx0 + lw - 1, yp, pierna); rect(tx1 - lw + 1, cad + 1, tx1, yp, pierna); }
    else { rect(x - lw, cad + 1, x - 1, yp, pierna); rect(x, cad + 1, x + lw - 1, yp - 1, pierna); pset(x, yp, pierna); }
  }
  rect(hx0, y0, hx0 + hw - 1, y0 + hh - 1, piel); rect(hx0, y0, hx0 + hw - 1, y0, pelo);                            // la cabeza
  if (o.espalda) rect(hx0, y0, hx0 + hw - 1, y0 + hh - 2, pelo); else { pset(dir > 0 ? hx0 : hx0 + hw - 1, y0 + 1, pelo); if (al >= 9) pset(dir > 0 ? hx0 + hw - 1 : hx0, y0 + 1, hex('#2a2024')); }
  if (o.saluda) { const s = Math.floor(t * 6 + k) % 2; pset(frente, y0 + hh, ropa); pset(frente + (s ? dir : 0), y0 + hh - 1, piel); pset(frente + (s ? dir : 0), y0 + hh - 2, piel); }
  else pset(frente, y0 + hh + 1 + (o.anda ? paso : 0), ropaS);
  if (tipo === 'est') {                                                                   // el estandarte
    const ax = frente, top = y0 - Math.round(al * 0.9); rect(ax, top, ax, cad, E_EST.asta); pset(ax, top - 1, E_EST.oro);
    const bw = Math.max(4, Math.round(al * 0.55)), bh = Math.max(5, Math.round(al * 0.75));
    for (let i = 0; i < bw; i++) { const ond = Math.round(Math.sin(t * 5 - i * 0.9 + k) * 0.7), xx = ax + dir * (i + 1);
      for (let j = 0; j < bh - (i === bw - 1 ? 2 : 0); j++) pset(xx, top + 1 + j + ond, i === 0 || i === bw - 1 || j === 0 || j === bh - 1 ? E_EST.n : (j < 2 ? E_EST.vL : E_EST.v)); }
    const ox = ax + dir * Math.round((bw + 1) / 2), oy = top + 1 + Math.round(bh / 2) + Math.round(Math.sin(t * 5 - bw * 0.45 + k) * 0.7);
    pset(ox - 1, oy, E_EST.oro); pset(ox + 1, oy, E_EST.oro); pset(ox, oy - 1, E_EST.oro); pset(ox, oy + 1, E_EST.oro);
  }
  if (tipo === 'mus') { const g = Math.floor(t * 4 + k) % 2; rect(frente, cad - 3, frente + dir * 2, cad - 1, hex('#b83a3a')); pset(frente, cad - 3, E_EST.oro); pset(frente + dir * 2, cad - 3, E_EST.oro); pset(frente + dir, cad - 4 - g, hex('#e8d8b8')); }
}

const E_SOLB = [190, 60];

function e_bodaFondo(R, P) {
  const B = R.buf, [sx, sy] = E_SOLB;
  e_cielo(R, P, 0, 179, 86, sx, sy);
  for (let k = 0; k < 10; k++) { const x = Math.round(180 + h(k, 1, 520) * 90), y = Math.round(4 + h(k, 2, 520) * 16); if (!e_tranquila(x, y)) R.pset(x, y, P.cielo[3]); }   // primeras estrellas
  e_sol(R, P, sx, sy, 8);
  e_montes(R, 66, 6, 0.045, 1.1, P.monte[0], P.halo[0], P.bruma, 120);
  e_montes(R, 75, 7, 0.06, 2.7, P.monte[1], P.monte[0], P.monte[0], 120);
  // la garganta: dos laderas de bosque que bajan en V hasta el río lejano
  const eL = (x) => 74 + Math.pow(Math.max(0, x) / 150, 1.6) * 78, eR = (x) => 76 + Math.pow(Math.max(0, 320 - x) / 150, 1.6) * 78;
  for (let y = 70; y < 180; y++) for (let x = 0; x < 320; x++) {
    const a = eL(x), b = eR(x), i = y * 320 + x;
    if (y >= a && x < 160) B[i] = y < a + 1 ? P.vF : e_lejos(x, y, P, 1 - (y - a) / 26 + 0.2, x / 160, 0);
    else if (y >= b && x >= 160) B[i] = y < b + 1 ? P.vL : e_lejos(x, y, P, 0.75 - (y - b) / 22, (320 - x) / 160, 1);
    else if (y > 138) B[i] = Math.abs(x - 164) < 3 + (y - 138) * 0.6 && h(x, y, 521) < 0.5 ? P.aguaB : e_grad(P.agua, (y - 138) / 40 + 0.05, x, y);   // el río lejano
  }
  // los acantilados de los estribos, con estratos y árboles en lo alto
  for (let y = 66; y < 180; y++) for (let x = 0; x < 320; x++) {
    const izq = x < 9 + (y - 90) * 0.06 + h(0, y >> 2, 522) * 3 && y > 84, der = x > 309 - (y - 90) * 0.04 - h(1, y >> 2, 522) * 3 && y > 86;
    if (izq || der) { const est = e_sig(y + Math.round(x * 0.2), 6); R.pset(x, y, est === 0 ? P.rocaS : izq && x > 4 && h(x, y >> 1, 523) < 0.3 ? P.rocaL : h(x >> 1, y, 524) < 0.18 ? P.vS : P.roca); }
  }
  for (const [x0, x1, top] of [[0, 22, 60], [296, 319, 62]]) for (let x = x0; x <= x1; x++) { const tp = top + Math.round(Math.abs(Math.sin(x * 0.45)) * 6 + h(x, 1, 525) * 3) + (x0 ? Math.max(0, 300 - x) : Math.max(0, x - 18)) * 3;
    for (let y = tp; y < 92; y++) R.pset(x, y, y === tp ? P.vF : e_copas(x, y, P, 0.9 - (y - tp) / 14, 2)); }
}

const E_ASTAS = [18, 62, 106, 214, 258, 302];

function e_bodaPuente(R, P, F) {
  const B = R.buf, { rect, pset, linea } = R;
  for (let y = 82; y < 94; y++) for (let x = 0; x < 320; x++) {
    let c = null;
    if (y <= 83) c = y === 82 ? P.pL : P.pM;
    else if (y <= 88) { const m = e_sig(x + 2, 24); c = m < 3 ? (m === 0 ? P.pL : P.pM) : y === 88 ? P.pD : y === 84 ? P.pS : (e_sig(x, 3) === 0 ? P.pS : null); }
    else { const f = y - 89, j = f === 0 || e_sig(x + f * 7, 18) === 0; c = j ? P.pJ : Math.abs(x - E_SOLB[0]) < 40 - f * 4 && e_bay(x, y) < 0.5 ? P.pL : e_bay(x, y) < 0.25 + f * 0.1 ? P.pS : P.pM; }
    if (c != null) B[y * 320 + x] = c;
  }
  for (const ax of E_ASTAS) { rect(ax, 58, ax, 82, E_EST.asta); pset(ax, 57, E_EST.oro); pset(ax, 56, E_EST.oro); rect(ax - 2, 66, ax + 2, 66, E_EST.asta); rect(ax - 1, 67, ax + 1, 70, P.pK); }
  e_pintaPuente(R, P, (x, y) => [x, y - 94, 1], [0, 94, 319, 160]);
  for (let y = 96; y <= 100; y++) for (let x = 0; x < 320; x++) if (e_mat(x, y - 94, P) == null) B[y * 320 + x] = y === 96 ? P.pS : P.pD;   // entre los balaustres, el tablero en sombra
  for (let x = 0; x < 320; x += 24) for (let i = 1; i < 23; i++) { const yy = 101 + Math.round(Math.sin(i / 23 * Math.PI) * 3); pset(x + 2 + i, yy, i % 3 ? P.vM : E_FLOR[(x / 24 + i) % 4]); if (i % 4 === 1) pset(x + 2 + i, yy + 1, E_FLOR[(i + 1) % 4]); }   // guirnaldas
  // el río de abajo: refleja el puente y el fondo (ondulado) y se oscurece hacia nosotros
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) {
    const yr = 319 - y, xr = Math.max(0, Math.min(319, x + Math.round(Math.sin(y * 1.3) * 1.2))), c = e_mat(xr, yr - 94, P);
    let col = c != null ? (c === P.pL || c === P.pM ? P.agua[3] : P.agua[4]) : F[yr * 320 + xr];
    if (c == null && e_bay(x, y) < 0.3 + (y - 160) / 50) col = e_grad(P.agua, 0.35 + (y - 160) / 40, x, y);
    if (y === 160) col = P.aguaO; B[y * 320 + x] = col;
  }
  // el mirador de roca de delante, con hierba y flores
  for (let y = 162; y < 180; y++) for (let x = 0; x < 80; x++) {
    const borde = 54 + Math.max(0, y - 166) * 1.4 + h(0, y, 526) * 2, top = 166 + Math.round(Math.sin(x * 0.3) * 0.6) - (x < 20 ? 1 : 0);
    if (x > borde || y < top - 3) continue;
    let c; if (y < top) c = h(x, 1, 527) < 0.5 ? P.vM : P.vL; else if (y < top + 2) c = x > borde - 2 ? P.vS : (h(x, y, 528) < 0.3 ? P.vL : P.vM);
    else c = x > borde - 2 ? P.rocaS : e_sig(y + (x >> 2), 5) === 0 ? P.rocaS : h(x >> 1, y >> 1, 529) < 0.25 ? P.rocaL : P.roca;
    pset(x, y, c);
  }
  for (const [fx, fc] of [[12, 0], [27, 3], [40, 2], [47, 1]]) { pset(fx, 163, E_FLOR[fc]); pset(fx, 164, P.vS); }
  rect(4, 159, 13, 165, P.rocaS); rect(5, 158, 12, 164, P.roca); rect(6, 158, 11, 158, P.rocaL); pset(12, 160, P.rocaS);   // una piedra
}

// el carro sobre el puente según o.avance, y dónde va al caer (o.caida 0–0.6)
const e_carroX = (av) => Math.round(40 + 240 * e_cl(av));

const e_caeY = (c) => Math.round(96 + 86 * Math.pow(e_cl(c / 0.6), 2));

// el desfile alrededor del carro: [desplazamiento, tipo, fila de atrás]
const E_DESFILE = [[30, 'hab'], [38, 'hab'], [48, 'est'], [58, 'hab'], [66, 'hab'], [77, 'mus'], [85, 'mus'], [97, 'est'], [-32, 'hab'], [-40, 'hab'], [-51, 'est'], [-61, 'dama'], [-69, 'dama'], [-80, 'hab'], [-88, 'hab'], [-100, 'est'], [-110, 'hab']];

// la balaustrada de delante sacada de A (sin el hueco): va por delante del desfile y del carro
function e_pretilDelante(R, A, roto) {
  const B = R.buf, P = E_PAL.ocaso;
  for (let y = 94; y <= 104; y++) for (let x = 0; x < 320; x++) if (!e_hueco(x, y - 94, roto) && e_mat(x, y - 94, P) != null) B[y * 320 + x] = A[y * 320 + x];
}

// las cabezas asomadas al pretil de delante (en los extremos)
function e_cabezasDelante(R, t, roto) {
  for (const [x, k] of [[14, 3], [22, 6], [31, 1], [47, 4], [268, 2], [277, 5], [291, 0], [300, 7]]) {
    const R0 = E_ROPA[k], piel = E_PIEL[k % 5], pelo = E_PELO[k % 7], b = Math.sin(t * 2 + k) > 0.6 ? 1 : 0, y = 90 + b;
    R.rect(x - 2, y + 2, x + 2, 93, R0[0]); R.pset(x + 2, y + 2, R0[1]); R.rect(x - 1, y - 1, x + 1, y + 1, piel); R.rect(x - 1, y - 1, x + 1, y - 1, pelo); R.pset(x - 1, y, pelo);
    if (k % 3 === 0 && Math.sin(t * 3 + k) > 0.2) { R.pset(x + 3, y + 1, R0[0]); R.pset(x + 3, y, piel); R.pset(x + 4, y - 1 - (Math.floor(t * 5) % 2), E_FLOR[k % 4]); }
  }
}

function e_boda(R, t, o) {
  const P = E_PAL.ocaso, roto = e_cl(o.roto ?? 0), caida = e_cl(o.caida ?? 0), cx = e_carroX(o.avance ?? 0.5), { rect, pset, linea } = R;
  const F = e_buf(R, 'e-boda-fondo', () => e_bodaFondo(R, P));
  const A = e_buf(R, 'e-boda-puente', () => { R.copiar(F); e_bodaPuente(R, P, F); });
  R.copiar(A);
  const B = R.buf;
  if (roto >= 0.2) for (let y = 76; y <= 122; y++) for (let x = 136; x <= 186; x++) if (e_hueco(x, y - 94, roto)) B[y * 320 + x] = F[y * 320 + x];
  e_nubes(R, t, P, [[20, 30, 56, 9, 0.7, 1], [190, 24, 44, 7, 0.7, 2], [300, 40, 70, 10, 1.3, 3], [110, 48, 48, 8, 1.3, 4], [60, 54, 36, 5, 2.1, 5], [240, 50, 30, 5, 2.1, 6]], E_SOLB[0]);
  e_aves(R, t, P, 5, 24, 52, 0);
  // la cascada que se ve por el cuarto arco (solo donde se ve el fondo)
  for (let y = 112; y < 152; y++) for (let x = 236; x <= 240; x++) { const i = y * 320 + x; if (B[i] !== F[i]) continue; const q = h(x, Math.floor(y - t * 24), 530); B[i] = y > 148 ? (q < 0.5 ? P.aguaB : P.aguaO) : q < 0.35 ? P.aguaB : q < 0.7 ? P.agua[1] : P.agua[2]; }
  // la bruma del río, que pasa despacio bajo el puente (solo donde se ve el fondo)
  for (let y = 134; y < 160; y++) { const d = 1 - Math.abs(y - 150) / 16; for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (B[i] !== F[i]) continue; const n = Math.sin(x * 0.05 - t * 0.35 + Math.sin(y * 0.3 + x * 0.013) * 2) * 0.5 + 0.5; if (e_bay(x, y) < d * n * 0.6) B[i] = n > 0.75 ? P.nL : P.bruma; } }
  // banderolas al viento y faroles que titilan
  E_ASTAS.forEach((ax, k) => { const col = k % 3 === 0 ? [E_EST.v, E_EST.n] : k % 3 === 1 ? [hex('#e8c060'), hex('#b08a3a')] : [E_HAB.capa, E_HAB.capaS];
    for (let i = 1; i < 16; i++) { const yy = 58 + Math.round(Math.sin(t * 4 - i * 0.6 + k) * (i / 8)), al = Math.max(1, 4 - Math.floor(i / 4)); for (let j = 0; j < al; j++) pset(ax + i, yy + j, j === 0 ? col[0] : col[1]); }
    const fl = Math.sin(t * 9 + k * 2) > -0.6; rect(ax - 1, 67, ax + 1, 69, fl ? hex('#ffd890') : hex('#e8a058')); pset(ax, 68, fl ? hex('#fff8d8') : hex('#ffd890')); });
  // la gente asomada al pretil de atrás (se aparta del hueco)
  for (let i = 0, x = 3; x < 318; i++) {
    let xx = x + (h(i, 1, 531) - 0.5) * 2; x += 6 + Math.floor(h(i, 2, 531) * 4);
    if (E_ASTAS.some((a) => Math.abs(a - xx) < 3)) continue;
    if (roto >= 0.2) { const d = xx - 160; if (Math.abs(d) < 40) xx += Math.sign(d || 1) * (40 - Math.abs(d)) * e_cl((roto - 0.2) * 3); if (Math.abs(xx - 160) < 22) continue; }
    e_gente(R, xx, 89 + (i % 2), 7, t, i * 3 + 1, 'gente', { dir: xx < cx ? 1 : -1, saluda: h(i, 3, 531) < 0.35 && Math.sin(t * 2.2 + i) > -0.2 });
  }
  // la procesión (dos filas) con el hueco del carro
  for (const fila of [1, 0]) for (const [d, tipo] of E_DESFILE) {
    if (fila && tipo !== 'hab') continue;
    let x = cx + d + (fila ? 3 : 0);
    if (roto >= 0.2) { const dd = x - 160; if (Math.abs(dd) < 46) x += Math.sign(dd || 1) * (46 - Math.abs(dd)) * e_cl((roto - 0.2) * 2.5); if (Math.abs(x - 160) < 24) continue; }
    if (x < -8 || x > 328) continue;
    e_gente(R, x, fila ? 93 : 96, fila ? 10 : 11, t, Math.abs(d), tipo, { dir: roto >= 0.2 ? Math.sign(x - 160) || 1 : 1, anda: roto < 0.2 || Math.abs(x - 160) < 60 });
  }
  e_pretilDelante(R, A, roto);
  e_cabezasDelante(R, t, roto);
  // pétalos que caen del tablero al río
  for (let i = 0; i < 46; i++) { const x0 = 8 + h(i, 1, 532) * 304, sp = 7 + h(i, 2, 532) * 6, y = 86 + e_sig(h(i, 3, 532) * 74 + t * sp, 74), x = Math.round(x0 + Math.sin(t * 1.6 + i) * 3 + (y - 86) * 0.12);
    if (roto >= 0.2 && Math.abs(x - 160) < 18 && y < 120) continue; pset(x, Math.round(y), E_FLOR[i % 4]); if (i % 3 === 0) pset(x + 1, Math.round(y), E_FLOR[(i + 1) % 4]); }
  // el río: ondas, el brillo del sol y dos barcas
  const enAgua = (x, y) => y >= 161 && y < 180 && x >= 0 && x < 320 && !(x < 56 + Math.max(0, y - 166) * 1.4 && y >= 163);
  e_ondas(R, t, P, 40, 161, 179, enAgua, E_SOLB[0], 0);
  for (const [bx0, by, k] of [[96, 174, 0], [262, 170, 1]]) { const bx = Math.round(bx0 + Math.sin(t * 0.3 + k) * 5), bb = Math.round(Math.sin(t * 1.4 + k) * 0.6);
    rect(bx - 7, by + bb - 1, bx + 7, by + bb, hex('#5a3a2a')); rect(bx - 6, by + bb + 1, bx + 6, by + bb + 1, hex('#3a2420')); rect(bx - 7, by + bb - 1, bx + 7, by + bb - 1, hex('#8a5a3a'));
    rect(bx - 6, by + 3, bx + 6, by + 3, P.agua[4]); e_gente(R, bx, by + bb - 2, 6, t, 5 + k * 2, 'gente', { dir: -1 });
    const r = Math.floor(t * 2 + k) % 2; linea(bx + 2, by + bb - 3, bx + 8, by + bb + 1 + r, hex('#c8a070')); }
  // la rotura: grietas, trozos que caen girando, piedras, salpicaduras pequeñas y la nube de polvo
  if (roto > 0) e_rotura(R, t, P, A, F, roto);
  if (caida > 0.6) e_salpica(R, t, P, (caida - 0.6) / 0.4, false);
  return { suelo: 96, libre: [20, 300], carro: [cx, 96], cae: [160, e_caeY(caida)], agua: 160, rotura: [160, 94], mirador: [6, 50, 166], sol: E_SOLB };
}

const E_GRIETAS = [[[160, 82], [158, 90], [161, 97], [157, 106], [160, 114]], [[148, 83], [150, 92], [146, 101], [149, 112]], [[173, 82], [171, 93], [175, 102], [172, 113]], [[160, 97], [166, 100], [170, 104]]];

function e_rotura(R, t, P, A, F, roto) {
  const B = R.buf, { pset, linea } = R;
  if (roto < 0.22) { const p = e_cl(roto / 0.2);
    for (const g of E_GRIETAS) { const n = (g.length - 1) * p; for (let i = 0; i < Math.ceil(n); i++) { const f = Math.min(1, n - i), [a, b] = [g[i], g[i + 1]]; linea(a[0], a[1], a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, P.pK); } }
    for (let i = 0; i < 10; i++) { const u = e_sig(t * 1.5 + h(i, 1, 540), 1), x = 150 + h(i, 2, 540) * 22, y = 100 + u * 50; if (h(i, 3, 540) < p) pset(Math.round(x), Math.round(y), P.pS); }
  }
  const tau = e_cl((roto - 0.2) / 0.8);
  if (roto >= 0.2) {
    // los tres trozos: cada píxel del hueco que era puente cae con su trozo (giro y caída)
    const TROZOS = [[145, 160, 80, 104, -0.7, -5, 0], [160, 178, 80, 104, 0.6, 6, 0.06], [146, 176, 104, 122, 0.25, 0, 0.12]];
    for (const [x0, x1, y0, y1, gi, dx, ret] of TROZOS) {
      const u = e_cl((tau - ret) / (1 - ret)); if (u <= 0) continue;
      const cxp = (x0 + x1) / 2, cyp = (y0 + y1) / 2, a = gi * u * 1.6, ca = Math.cos(a), sa = Math.sin(a), ox = cxp + dx * u, oy = cyp + 92 * u * u;
      if (oy - 12 > 160) continue;
      const rr = Math.hypot(x1 - x0, y1 - y0) / 2 + 1;
      for (let y = Math.floor(oy - rr); y <= Math.ceil(oy + rr); y++) for (let x = Math.floor(ox - rr); x <= Math.ceil(ox + rr); x++) {
        if (x < 0 || x > 319 || y < 0 || y > 160) continue;
        const px = x - ox, py = y - oy, sxp = Math.round(cxp + px * ca + py * sa), syp = Math.round(cyp - px * sa + py * ca);
        if (sxp < x0 || sxp > x1 || syp < y0 || syp > y1 || !e_hueco(sxp, syp - 94, 1)) continue;
        const i = syp * 320 + sxp; if (A[i] === F[i]) continue;
        B[y * 320 + x] = A[i];
      }
      if (u > 0.82 && u < 1) for (let k = 0; k < 10; k++) { const f = (u - 0.82) / 0.18, an = (k / 10 - 0.5) * 2.4, r = f * 14; pset(Math.round(ox + Math.sin(an) * r), Math.round(160 - Math.cos(an) * r * 0.9 + f * f * 10), k % 2 ? P.aguaB : P.aguaO); }
    }
    // piedras sueltas
    for (let k = 0; k < 28; k++) { const b = h(k, 1, 541) * 0.5, u = (tau - b) * 1.6; if (u <= 0) continue; const x = Math.round(148 + h(k, 2, 541) * 24 + (h(k, 3, 541) - 0.5) * 24 * u), y = Math.round(86 + h(k, 4, 541) * 30 + 80 * u * u);
      if (y < 160) { pset(x, y, k % 3 ? P.pD : P.pS); if (k % 4 === 0) pset(x + 1, y, P.pK); } else if (y < 168) pset(x, 159, P.aguaB); }
  }
  // la nube de polvo: bocanadas de tres tonos que nacen en los BORDES del hueco, se abren hacia fuera, suben y se
  // aclaran pronto (el hueco se lee limpio casi toda la caída); en el hueco mismo, solo un velo ralo al principio
  const hx0 = 143, hx1 = 179, hy0 = 78, hy1 = 124, velo = 1 - e_cl((roto - 0.25) / 0.25);
  for (let k = 0; k < 22; k++) {
    const b = 0.04 + h(k, 1, 542) * 0.36, edad = e_cl((roto - b) / 0.45); if (edad <= 0) continue;
    const vive = roto >= 1 ? 0.3 + Math.sin(t * 0.7 + k) * 0.06 : Math.max(0.3, 1 - edad * 0.85);
    const lado = k % 2 ? 1 : -1, agua = k % 6 === 0;
    const x0 = 160 + lado * (13 + h(k, 2, 542) * 9), y0 = agua ? 150 + h(k, 3, 542) * 6 : 82 + h(k, 3, 542) * 36;
    const r = 2.5 + edad * (5 + h(k, 4, 542) * 4) + (roto >= 1 ? 1 : 0);
    const ox = x0 + lado * edad * (14 + h(k, 5, 542) * 14) + (roto >= 1 ? e_sig(t * 2 + k * 3, 16) : 0) + edad * 6, oy = y0 - edad * (10 + h(k, 6, 542) * 8) - (roto >= 1 ? Math.sin(t * 0.5 + k) * 2 : 0);
    for (let y = Math.floor(oy - r); y <= oy + r; y++) for (let x = Math.floor(ox - r); x <= ox + r; x++) {
      if (x < 0 || x > 319 || y < 0 || y > 179 || e_tranquila(x, y)) continue;
      const d = Math.hypot(x - ox, y - oy) / r; if (d > 1) continue;
      const enHueco = x > hx0 && x < hx1 && y > hy0 && y < hy1;
      if (e_bay(x, y) > (1 - d * d) * 1.15 * vive * (enHueco ? 0.35 * velo : 1)) continue;
      const rel = (y - oy) / r; B[y * 320 + x] = rel < -0.3 ? E_POLVO.L : rel < 0.35 ? E_POLVO.M : E_POLVO.S;
    }
  }
  // motas de polvo sueltas que flotan junto a los bordes del hueco (sin taparlo)
  for (let k = 0; k < 16; k++) { const f = e_sig(t * 0.4 + h(k, 7, 542), 1), lado = k % 2 ? 1 : -1, x = Math.round(160 + lado * (18 + h(k, 8, 542) * 14 + f * 10)), y = Math.round(118 - f * 40 + Math.sin(t * 2 + k) * 1.5);
    if (roto > 0.3 && f < 0.9 && !e_tranquila(x, y)) pset(x, y, f < 0.5 ? E_POLVO.L : E_POLVO.M); }
}
// la salpicadura del carro en (160, 160): columna de gotas, corona, espuma y tres círculos que se abren (u 0–1)
function e_salpica(R, t, P, u, delante) {
  const { pset } = R, x0 = 160, y0 = 160;
  for (let k = 0; k < 3; k++) { const f = e_cl(u * 1.3 - k * 0.18); if (f <= 0) continue; const rx = 8 + f * 40 + Math.sin(t * 2 + k) * 1.5, ry = rx * 0.2;
    for (let a = 0; a < Math.PI * 2; a += 1 / rx) { const x = Math.round(x0 + Math.cos(a) * rx), y = Math.round(y0 + 3 + Math.sin(a) * ry); if (y > 160 && y < 180 && (Math.floor(a * rx) + k) % 3) pset(x, y, k === 0 ? P.aguaB : P.aguaO); } }
  const ef = Math.max(0, 1 - u * 0.6);
  for (let y = 158; y < 168; y++) for (let x = x0 - 14; x <= x0 + 14; x++) { const d = Math.hypot((x - x0) / 14, (y - 162) / 5); if (d < ef && e_bay(x, y) < (ef - d) * 2) pset(x, y, d < ef * 0.5 ? hex('#ffffff') : P.aguaB); }
  if (u < 0.7) { const f = u / 0.7;
    for (let k = 0; k < 46; k++) { const an = (h(k, 1, 543) - 0.5) * 1.3, v = 34 + h(k, 2, 543) * 34, x = Math.round(x0 + Math.sin(an) * v * f * 0.8), y = Math.round(y0 - Math.cos(an) * v * f + 70 * f * f);
      if (y <= 162) { pset(x, y, k % 3 ? P.aguaB : hex('#ffffff')); if (k % 2) pset(x, y + 1, P.aguaO); } }
    for (let y = Math.round(y0 - 30 * Math.sin(f * Math.PI)); y < y0; y++) for (let x = x0 - 4; x <= x0 + 4; x++) if (e_bay(x, y) < 0.7 - Math.abs(x - x0) * 0.12) pset(x, y, (x + y) % 3 ? hex('#ffffff') : P.aguaB);
  }
  if (u > 0.5 && !delante) for (let k = 0; k < 12; k++) { const a = h(k, 1, 544) * 6.28, r = 6 + (u - 0.5) * 2 * (10 + h(k, 2, 544) * 26) + Math.sin(t + k) * 1.5; pset(Math.round(x0 + Math.cos(a) * r), Math.round(y0 + 4 + Math.sin(a) * r * 0.22), P.aguaD); }
}

function e_bodaDelante(R, t, o) {
  const P = E_PAL.ocaso, roto = e_cl(o.roto ?? 0), caida = e_cl(o.caida ?? 0), A = e_buf(R, 'e-boda-puente', () => {}), B = R.buf;
  e_pretilDelante(R, A, roto);
  e_cabezasDelante(R, t, roto);
  if (caida > 0.3) {   // el agua se traga el carro
    for (let y = 161; y < 180; y++) for (let x = 124; x <= 196; x++) B[y * 320 + x] = A[y * 320 + x];
    e_ondas(R, t, P, 12, 161, 179, (x, y) => x >= 124 && x <= 196 && y >= 161, E_SOLB[0], 1);
    if (caida > 0.6) e_salpica(R, t, P, (caida - 0.6) / 0.4, true);
    else if (caida > 0.5) e_salpica(R, t, P, 0, true);
  }
  return {};
}

const E_TZ = [2.4, 3.4, 4.8, 6.8];

function e_tableroFondo(R, P) {
  const B = R.buf, { rect, pset, disco } = R;
  e_cielo(R, P, 0, 84, 84, 160, 64);
  e_sol(R, P, 160, 64, 9);
  e_montes(R, 79, 8, 0.05, 0.4, P.monte[0], P.halo[0], P.bruma, 84, 0, 125);
  e_montes(R, 80, 7, 0.06, 2.2, P.monte[0], P.halo[0], P.bruma, 84, 195, 319);
  // la ciudad tras la puerta: cúpulas y torres en contraluz
  for (let x = 96; x <= 224; x++) { const k = Math.floor(x / 9), top = 74 + Math.round(h(k, 1, 550) * 6) - (k % 3 === 0 ? Math.round(Math.sqrt(Math.max(0, 16 - (x % 9 - 4) ** 2))) : 0); for (let y = top; y <= 84; y++) pset(x, y, y === top ? P.nM : P.monte[2]); }
  for (let y = 84; y < 180; y++) {
    const yy = y - 84 + 0.5, zd = 96 / yy, half = 180 / zd;
    for (let x = 0; x < 320; x++) {
      const dx = x - 160, i = y * 320 + x;
      if (Math.abs(dx) <= half) {   // el tablero: losas, la alfombra, pétalos y el brillo del sol
        if (zd > 10) { B[i] = e_bay(x, y) < 0.5 ? P.halo[1] : P.nF; continue; }
        const X = dx * zd, Zu = zd * 12, dZ = 12 * zd * zd / 96;
        let c;
        if (Math.abs(X) < 42) c = Math.abs(X) > 36 ? (Math.abs(X) < 36 + zd ? hex('#8a6a2a') : hex('#e8c060')) : (e_sig(Zu + Math.abs(X) * 0.12, 6) < 0.5 + dZ ? hex('#a84a6a') : (zd > 5 && e_bay(x, y) < (zd - 5) / 6 ? hex('#c8607a') : hex('#7a2a52')));
        else { const jX = e_sig(X, 48) < zd, jZ = dZ < 4 && e_sig(Zu, 10) < dZ, n = h(Math.floor(X / 48), Math.floor(Zu / 10), 551), g = (1 - Math.abs(dx) / half) * 0.22 + zd / 11;
          c = jX || jZ ? P.pJ : g + (n - 0.5) * 0.3 > 0.5 && e_bay(x, y) < 0.8 ? P.pL : n < 0.3 ? P.pS : P.pM;
          const m = h(x, y, 557); if (!jX && !jZ && m < 0.05) c = m < 0.02 ? P.pD : P.pS; else if (!jX && !jZ && zd < 2.2 && e_sig(X * 0.3 + Zu * 2, 7) < 0.4 && n > 0.6) c = P.pS; }
        if (h(x, y, 552) < 0.012) c = E_FLOR[Math.floor(h(x, y, 553) * 4)];
        B[i] = c; continue;
      }
      const zp = 180 / Math.abs(dx), top = 84 + 74 / zp;
      if (y >= top) {   // la cara del pretil: albardilla, pilastras, paneles y zócalo
        const hu = (84 + 96 / zp - y) * zp, fz = e_sig(zp, 0.9), post = fz < 0.16, lej = zp > 6 && e_bay(x, y) < (zp - 6) / 5;
        let c;
        if (hu > 20) c = P.pL; else if (hu > 18) c = P.pM; else if (hu < 2.5) c = P.pD;
        else if (post) c = fz < 0.03 || fz > 0.13 ? P.pS : P.pM;
        else if (hu > 4 && hu < 16 && fz > 0.22 && fz < 0.84) c = fz < 0.26 || hu > 15 ? P.pD : (e_sig(zp * 9, 1) < 0.3 ? P.pS : P.pM);
        else c = P.pS;
        B[i] = lej && c !== P.pL ? P.pM : c; continue;
      }
      const u = (y - 84) / Math.max(1, top - 84);   // fuera: la garganta en bruma
      B[i] = u < 0.22 ? e_grad([P.monte[0], P.monte[1], P.monte[2]], u * 4.5, x, y) : e_lejos(x, y, P, 0.75 - u, 1 - u * 0.75, 3);
    }
  }
  // la puerta de las dos torres, en contraluz con el filo de sol, y su dintel donde se posa el sol
  const OSC = hex('#3a2848'), OSC2 = hex('#2a1e3a');
  for (const [x0, x1] of [[136, 144], [176, 184]]) { rect(x0, 52, x1, 93, OSC); for (let x = x0; x <= x1; x += 3) rect(x, 49, x + 1, 51, OSC); rect(x0 <= 140 ? x1 : x0, 52, x0 <= 140 ? x1 : x0, 93, P.nF);
    for (let y = 58; y < 90; y += 9) rect(x0 + 3, y, x0 + 5, y + 3, OSC2); rect(x0 + 2, 60, x0 + 6, 74, E_EST.v); rect(x0 + 2, 60, x0 + 6, 60, E_EST.n); pset(x0 + 4, 67, E_EST.oro); }
  rect(145, 71, 175, 76, OSC); rect(145, 71, 175, 71, P.nF);
  for (let y = 77; y <= 93; y++) for (let x = 145; x <= 175; x++) { const ab = Math.abs(x - 160) < 9 - Math.max(0, 80 - y) * 1.5; if (!ab) pset(x, y, OSC); }
  // astas y travesaños
  for (const z of E_TZ) for (const sd of [-1, 1]) { const x = Math.round(160 + sd * 184 / z), yb = Math.round(84 + 74 / z), yt = Math.round(84 - 100 / z), w = Math.max(1, Math.round(5 / z));
    rect(x - (w >> 1), yt, x - (w >> 1) + w - 1, yb, E_EST.asta); rect(x + (sd > 0 ? -(w >> 1) : w - 1 - (w >> 1)), yt, x + (sd > 0 ? -(w >> 1) : w - 1 - (w >> 1)), yb, P.nL);
    disco(x, yt - 1, Math.max(1, 2.4 / z * 2), E_EST.oro); const xb = Math.round(160 + sd * 162 / z); rect(Math.min(x, xb), yt + 2, Math.max(x, xb), yt + 2 + Math.max(0, Math.round(2 / z)), E_EST.asta); }
}

// la gente asomada a los pretiles: [z, lado, k]
const E_PRET = [[3.0, -1, 0], [3.3, 1, 1], [3.9, -1, 2], [4.3, 1, 3], [4.6, -1, 11], [5.2, -1, 4], [5.6, 1, 5], [6.2, -1, 6], [6.6, 1, 12], [7.0, 1, 7], [7.6, -1, 8], [8.3, 1, 9], [9.0, -1, 10]];

function e_tablero(R, t, o) {
  const P = E_PAL.ocaso, av = e_cl(o.avance ?? 0.5), { pset, linea } = R;
  R.copiar(e_buf(R, 'e-tablero', () => e_tableroFondo(R, P)));
  e_nubes(R, t, P, [[10, 30, 60, 9, 0.6, 11], [170, 22, 48, 7, 0.6, 12], [290, 46, 64, 9, 1.2, 13], [90, 52, 42, 7, 1.2, 14], [230, 58, 30, 5, 2, 15]], 160);
  e_aves(R, t, P, 6, 26, 60, 1);
  for (let k = 0; k < 8; k++) { const x = 100 + Math.round(h(k, 1, 554) * 120), y = 76 + Math.round(h(k, 2, 554) * 7); if (Math.abs(x - 160) > 26 && Math.sin(t * 0.7 + k * 2) > 0) pset(x, y, hex('#ffd890')); }   // ventanas de la ciudad
  // banderolas de las astas y guirnaldas de lado a lado (de lejos a cerca)
  for (const z of [...E_TZ].reverse()) {
    const yt = 84 - 100 / z;
    for (const sd of [-1, 1]) { const xb = 160 + sd * 160 / z, bw = Math.max(2, Math.round(18 / z)), bl = Math.round(60 / z);
      for (let j = 0; j < bl; j++) { const ond = Math.round(Math.sin(t * 3 - j * 0.3 + z) * j * 0.06 * (4 / z)); for (let i = 0; i < bw; i++) { const x = Math.round(xb - sd * i + ond), y = Math.round(yt + 3 + j); pset(x, y, i === 0 || i === bw - 1 || j === bl - 1 ? E_EST.n : (j === Math.round(bl * 0.4) && Math.abs(i - bw / 2) < 1.2 ? E_EST.oro : j < 2 ? E_EST.vL : E_EST.v)); } } }
    const xa = 160 - 162 / z, xb = 160 + 162 / z, sag = (34 + 4 * Math.sin(t * 1.2 + z)) / z, n = Math.ceil(xb - xa), gr = z < 3 ? 1 : 0;
    for (let i = 0; i <= n; i++) { const s = i / n, x = Math.round(xa + (xb - xa) * s), y = Math.round(yt + 3 + sag * 4 * s * (1 - s) + Math.sin(t * 2 + i * 0.3) * 0.4 * (3 / z));
      pset(x, y, i % 3 === 0 ? E_FLOR[(i / 3) % 4] : P.vM); if (gr) pset(x, y + 1, i % 3 === 1 ? E_FLOR[(i + 2) % 4] : P.vS); }
  }
  // la gente asomada a los pretiles y la procesión que viene de frente, de lejos a cerca
  const zh = lerp(9.4, 3.8, av), figs = [];
  for (const [z, sd, k] of E_PRET) figs.push([z, () => e_gente(R, 160 + sd * 168 / z, 84 + 96 / z, 36 / z, t, k, 'gente', { dir: -sd, saluda: k % 3 === 0 && Math.sin(t * 2.5 + k) > 0.1 })]);
  for (let r = 0; r < 6; r++) { const z = zh + r * 1.15; if (z >= 10) continue;
    for (const X of [-46, 46]) figs.push([z, () => e_gente(R, 160 + X / z, 84 + 96 / z, 35 / z, t, r * 2 + (X > 0 ? 1 : 0), r === 2 ? 'dama' : 'hab', { dir: X > 0 ? -1 : 1, anda: true })]);
    if (r === 0 || r === 4) for (const X of [-80, 80]) figs.push([z + 0.01, () => e_gente(R, 160 + X / z, 84 + 96 / z, 35 / z, t, r + 9, 'est', { dir: X > 0 ? -1 : 1, anda: true })]);
    if (r === 1) for (const X of [-16, 16]) figs.push([z + 0.02, () => e_gente(R, 160 + X / z, 84 + 96 / z, 35 / z, t, r + 4 + (X > 0 ? 1 : 0), 'mus', { dir: X > 0 ? -1 : 1, anda: true })]); }
  figs.sort((a, b) => b[0] - a[0]).forEach(([, f]) => f());
  // pétalos en el aire
  for (let i = 0; i < 40; i++) { const sp = 6 + h(i, 1, 555) * 6, y = Math.round(e_sig(h(i, 2, 555) * 170 + t * sp, 170) + 10), x = Math.round(e_sig(h(i, 3, 555) * 320 + Math.sin(t * 1.3 + i) * 5 + t * 2, 320));
    if (!e_tranquila(x, y)) pset(x, y, E_FLOR[i % 4]); }
  return { suelo: 150, libre: [40, 280], carro: [220, 150], sol: [160, 64], puerta: [160, 93], horizonte: 84 };
}

// por delante en 'tablero': pétalos grandes cerca de la cámara y dos guirnaldas que cuelgan por los bordes
function e_tableroDelante(R, t, o) {
  const P = E_PAL.ocaso, { pset, rect } = R;
  for (let i = 0; i < 16; i++) { const sp = 18 + h(i, 1, 556) * 14, y = Math.round(e_sig(h(i, 2, 556) * 190 + t * sp, 190) - 5), x = Math.round(e_sig(h(i, 3, 556) * 320 + Math.sin(t * 2 + i) * 9 + t * 5, 320)), c = E_FLOR[i % 4], g = Math.floor(t * 4 + i) % 2;
    if (e_tranquila(x, y)) continue; rect(x, y, x + 1 + g, y + 1 - g, c); pset(x, y + 1 - g, E_FLOR[(i + 3) % 4]); }
  for (const [x0, y0, y1, sd] of [[4, 20, 74, 1], [314, 52, 100, -1]]) for (let y = y0; y <= y1; y++) {
    const s = (y - y0) / (y1 - y0), x = Math.round(x0 + Math.sin(t * 1.4 + y * 0.12) * (1 + s * 3) * sd);
    rect(x - 1, y, x + 1, y, P.vS); pset(x, y, P.vM); if (y % 3 === 0) { pset(x - 1, y, E_FLOR[(y / 3) % 4]); pset(x + 1, y - 1, E_FLOR[(y / 3 + 2) % 4]); }
    if (y % 5 === 0) { pset(x + 2 * sd, y, P.vL); pset(x + 3 * sd, y + 1, P.vM); }
  }
  return {};
}

const e_rioOrillaL = (y) => 86 - (y - 63) * (86 / 55) + Math.sin(y * 0.45) * 2 + Math.sin(y * 0.13) * 3, e_rioOrillaR = (y) => 236 + (y - 63) * (84 / 53) + Math.sin(y * 0.5 + 1) * 2 - Math.sin(y * 0.11) * 3;

const e_rioAgua = (x, y) => y >= 63 && y < 146 + Math.round(Math.sin(x * 0.07) * 2) && x > e_rioOrillaL(y) && x < e_rioOrillaR(y);

function e_rioFondo(R, P, hora, roto) {
  const B = R.buf, { rect, pset } = R, SOL = hora === 'manana' ? [210, 34] : [168, 50], hueco = roto ? (u, v) => e_hueco(u, v, 1) : null;
  e_cielo(R, P, 0, 179, 66, SOL[0], SOL[1]);
  e_sol(R, P, SOL[0], SOL[1], hora === 'manana' ? 6 : 7);
  e_montes(R, 52, 6, 0.05, 3.1, P.monte[0], P.halo[0], P.bruma, 66);
  e_montes(R, 58, 5, 0.08, 4.4, P.monte[1], P.monte[0], P.monte[0], 66);
  for (let y = 56; y < 66; y++) for (let x = 0; x < 320; x++) if (y > 60 + Math.abs(x - 160) * 0.06) pset(x, y, e_grad(P.agua, (y - 60) / 12, x, y));   // el río lejano
  // las dos paredes de la garganta, de bosque y roca, con el filo de luz
  for (let y = 14; y < 146; y++) for (let x = 0; x < 320; x++) {
    const topL = 18 + x * 0.14 + Math.sin(x * 0.2) * 1.5, topR = 36 + (320 - x) * -0.0 + (x - 236) * 0.24 + Math.sin(x * 0.25) * 1.5;
    const izq = x < (y < 63 ? 86 + h(0, y >> 2, 560) * 2 : e_rioOrillaL(y)) && y > topL, der = x > (y < 63 ? 234 - h(1, y >> 2, 560) * 2 : e_rioOrillaR(y)) && y > topR;
    if (!izq && !der) continue;
    const borde = izq ? (y < 63 ? 86 : e_rioOrillaL(y)) - x : x - (y < 63 ? 234 : e_rioOrillaR(y)), ttop = y - (izq ? topL : topR);
    let c = ttop < 1 ? P.vF : borde < 2 && y < 64 ? (izq ? P.rocaL : P.rocaS) : e_copas(x, y, P, (izq ? 0.6 : 0.3) - ttop / 60 + (borde < 8 ? 0.2 : 0), izq ? 4 : 5);
    if (borde < 13 - ttop * 0.04 + h(0, y >> 2, 561) * 4 && y < 66 && ttop > 6) { const est = e_sig(y + Math.round(x * (izq ? 0.25 : -0.25)), 5); c = est === 0 ? P.rocaS : est === 1 ? (izq ? P.rocaL : P.roca) : h(x >> 1, y, 561) < 0.15 ? P.vS : izq ? P.roca : P.rocaS; }
    if (y >= 63 && borde < 9 && ttop > 0) c = e_bay(x, y) < 0.5 ? P.vS : c;
    if (y >= 63 && borde < 2) c = P.aguaO;
    B[y * 320 + x] = c;
  }
  e_pintaPuente(R, P, (x, y) => [(x - 80) * 2, (y - 30) * 2, 0.5], [78, 30, 242, 63], { hueco });
  // el agua: refleja el puente, las paredes y el cielo, y se oscurece hacia nosotros
  for (let y = 63; y < 150; y++) for (let x = 0; x < 320; x++) {
    if (!e_rioAgua(x, y)) continue;
    const yr = 126 - y, xr = Math.max(0, Math.min(319, x + Math.round(Math.sin(y * 0.9) * 1.5))), p = (y - 63) / 83;
    let c;
    if (yr >= 30) { const m = e_mat((xr - 80) * 2, (yr - 30) * 2, P, 0.5); c = m != null && !(hueco && hueco((xr - 80) * 2, (yr - 30) * 2)) ? (m === P.pL || m === P.pM ? P.agua[3] : P.agua[4]) : null; }
    if (c == null) c = yr >= 0 ? B[yr * 320 + xr] : P.cielo[0];
    if (e_bay(x, y) < 0.25 + p * 0.5) c = e_grad(P.agua, 0.3 + p * 0.7, x, y);
    B[y * 320 + x] = c;
  }
  // la orilla de delante: arena, guijarros, un tronco varado y matas
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (e_rioAgua(x, y)) continue;
    const r = e_sig(y * 3 + Math.round(Math.sin(x * 0.08) * 4), 9) === 0, n = h(x >> 1, y >> 1, 562);
    B[y * 320 + x] = r ? P.arenaS : n < 0.12 ? P.arenaL : n > 0.9 ? P.arenaS : P.arena;
  }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 563) * 316), y = Math.round(150 + h(k, 2, 563) * 28), w = 1 + Math.floor(h(k, 3, 563) * 3);
    if (x > 40 && x < 280 && y < 158 && k % 2) continue; rect(x - w, y, x + w, y + 1, P.rocaS); rect(x - w, y, x + w - 1, y, k % 3 ? P.rocaL : P.roca); }
  rect(26, 160, 78, 164, hex('#5a3a2a')); rect(26, 160, 78, 160, hex('#8a6448')); for (let x = 30; x < 78; x += 7) pset(x, 162, hex('#3a2420')); rect(22, 158, 27, 165, hex('#4a3020')); pset(80, 161, hex('#5a3a2a')); pset(81, 160, hex('#5a3a2a'));   // el tronco
  for (const x0 of [8, 96, 214, 300]) for (let i = 0; i < 9; i++) { const x = x0 + i - 4, al = 3 + Math.round(Math.abs(Math.sin(i * 1.7)) * 4); for (let y = 0; y < al; y++) pset(x + (y > 2 ? (i < 4 ? -1 : 1) : 0), 149 - y, y > al - 2 ? P.vL : P.vM); }
}

function e_rio(R, t, o) {
  const hora = o.hora === 'manana' ? 'manana' : 'ocaso', P = E_PAL[hora], roto = o.roto !== false, man = e_cl(o.manchas ?? 0), SOL = hora === 'manana' ? [210, 34] : [168, 50], { pset } = R;
  R.copiar(e_buf(R, 'e-rio-' + hora + (roto ? '-roto' : ''), () => e_rioFondo(R, P, hora, roto)));
  e_nubes(R, t, P, [[30, 26, 50, 8, 0.6, 21], [200, 20, 40, 6, 0.6, 22], [120, 40, 36, 6, 1.2, 23], [300, 30, 44, 7, 1.2, 24]], SOL[0]);
  e_aves(R, t, P, 4, 22, 46, 2);
  const B = R.buf;
  // las ondas bajan hacia nosotros: líneas que se alargan con la distancia
  for (let i = 0; i < 46; i++) { const ph = e_sig(t * 0.06 + h(i, 1, 564), 1), y = Math.round(64 + ph * ph * 82), xc = e_rioOrillaL(y) + (e_rioOrillaR(y) - e_rioOrillaL(y)) * h(i, 2, 564), len = 2 + Math.round(ph * 9);
    for (let j = 0; j < len; j++) if (e_rioAgua(Math.round(xc + j), y)) pset(Math.round(xc + j), y, Math.abs(xc - SOL[0]) < 14 + ph * 20 ? P.aguaB : i % 3 ? P.aguaO : P.aguaD); }
  e_ondas(R, t, P, 0, 64, 140, e_rioAgua, SOL[0], 2);
  // un pez que salta y sus círculos
  { const ci = e_sig(t / 5, 1), k = Math.floor(t / 5), px = Math.round(120 + h(k, 1, 565) * 90), py = Math.round(90 + h(k, 2, 565) * 40);
    if (ci < 0.15) { const f = ci / 0.15; pset(px + Math.round(f * 4), Math.round(py - Math.sin(f * Math.PI) * 5), P.aguaB); pset(px + Math.round(f * 4) + 1, Math.round(py - Math.sin(f * Math.PI) * 5), hex('#c8d0d8')); }
    else if (ci < 0.6) { const r = (ci - 0.15) * 30; R.anillo(px + 4, py, r, P.aguaO, 3); } }
  // las manchas de arena oscura (las truchas) que se van río abajo, con sus puntitos de luz
  const n = Math.round(man * 16);
  for (let i = 0; i < n; i++) {
    const ph = e_sig(t * 0.045 + i / 16 + h(i, 1, 566) * 0.05, 1), y0 = 66 + ph * 76, x0 = 160 + (h(i, 2, 566) - 0.5) * ph * 230, r = 1.5 + ph * 7, fade = ph < 0.85 ? 1 : (1 - ph) / 0.15;
    for (let y = Math.floor(y0 - r * 0.45); y <= y0 + r * 0.45; y++) for (let x = Math.floor(x0 - r); x <= x0 + r; x++) {
      const d = Math.hypot((x - x0) / r, (y - y0) / (r * 0.45)) + (h(x, y, 567 + i) - 0.5) * 0.3; if (d > 1 || !e_rioAgua(x, y) || e_bay(x, y) > fade * 1.2) continue;
      B[y * 320 + x] = d > 0.75 ? hex('#8a6a48') : hex('#4a3428');
    }
    for (let k = 0; k < 2 + Math.round(ph * 3); k++) { const a = h(i, k, 568) * 6.28, px = Math.round(x0 + Math.cos(a) * r * 0.5), py = Math.round(y0 + Math.sin(a) * r * 0.2); if (Math.sin(t * 5 + i + k * 2) > -0.2 && e_rioAgua(px, py)) pset(px, py, k % 2 ? C.senderoL : C.especiaAzul); }
  }
  // la espuma que lame la orilla
  for (let x = 0; x < 320; x++) { const y = 146 + Math.round(Math.sin(x * 0.07) * 2) - 1 + Math.round(Math.sin(t * 1.5 + x * 0.05)); if (h(x, Math.floor(t * 2), 569) < 0.6 && x > 4 && x < 316) pset(x, y, P.aguaO); }
  return { suelo: 152, libre: [30, 280], agua: [63, 146], hueco: [160, 34], sol: SOL };
}

// z(x) = 540 / (520 − x), u = (z − 1)/0.004545, s = 0.9/z, v = 60 + (y − 76)/s
const e_vInv = (x, y) => { const z = 540 / (520 - x), s = 0.9 / z; return [(z - 1) / 0.004545, 60 + (y - 76) / s, s]; };

const e_vLinea = (x) => Math.round(76 + 6 * 0.9 * (520 - x) / 540);   // el agua al pie del puente

const e_vOrilla = (x) => Math.round(140 + Math.sin(x * 0.03) * 3 + (x < 70 ? (70 - x) * 0.4 : 0) - (x > 250 ? (x - 250) * 0.25 : 0));

function e_vacioFondo(R, P) {
  const B = R.buf, { rect, pset, linea } = R, SOL = [232, 60];
  e_cielo(R, P, 0, 179, 76, SOL[0], SOL[1]);
  e_sol(R, P, SOL[0], SOL[1], 8);
  e_montes(R, 68, 6, 0.04, 5.2, P.monte[0], P.halo[0], P.bruma, 76);
  e_montes(R, 73, 4, 0.07, 1.9, P.monte[1], P.monte[0], P.monte[0], 77);
  // el acantilado de la derecha donde acaba el puente
  for (let y = 44; y < 100; y++) for (let x = 284; x < 320; x++) { const top = 48 + (319 - x) * 0.35 + Math.sin(x * 0.4) * 1.5; if (y < top || x < 296 - (y - 60) * 0.3) continue; pset(x, y, y < top + 1 ? P.vF : x < 300 - (y - 60) * 0.3 ? P.rocaS : e_copas(x, y, P, 0.7 - (y - top) / 20, 6)); }
  // el agua lejos (detrás del puente) hasta el horizonte
  for (let y = 76; y < 100; y++) for (let x = 0; x < 296; x++) pset(x, y, Math.abs(x - SOL[0]) < 3 + (y - 76) * 0.3 && h(x, y, 570) < 0.5 ? P.aguaB : e_grad(P.agua, (y - 76) / 30, x, y));
  e_pintaPuente(R, P, e_vInv, [0, 18, 304, 84], { obl: true });
  // el agua de delante: refleja el puente y el cielo por columnas
  for (let x = 0; x < 320; x++) { const wl = e_vLinea(x), or = e_vOrilla(x);
    for (let y = Math.max(wl, 78); y < or; y++) { const yr = 2 * wl - y, xr = Math.max(0, Math.min(319, x + Math.round(Math.sin(y * 0.8) * 1.4))), p = (y - wl) / (or - wl);
      let c = yr >= 0 ? B[yr * 320 + xr] : P.cielo[0]; const m = yr >= 0 ? e_mat(...e_vInv(xr, yr).slice(0, 2), P, 0.5) : null;
      if (m != null) c = m === P.pL || m === P.pM ? P.agua[3] : P.agua[4];
      if (e_bay(x, y) < 0.2 + p * 0.55) c = e_grad(P.agua, 0.25 + p * 0.75, x, y);
      B[y * 320 + x] = c; } }
  // la orilla: prado con flores, la playita de arena del niño, piedras y el poste de amarre
  for (let x = 0; x < 320; x++) for (let y = e_vOrilla(x); y < 180; y++) {
    const playa = x > 92 + Math.sin(y) && x < 228 && y < 164 + Math.sin(x * 0.1) * 2, n = h(x >> 1, y >> 1, 571), i = y * 320 + x;
    if (y === e_vOrilla(x)) { B[i] = P.aguaO; continue; }
    if (playa) B[i] = n < 0.12 ? P.arenaL : n > 0.88 ? P.arenaS : P.arena;
    else { const lz = y < e_vOrilla(x) + 3; B[i] = lz ? (n < 0.5 ? P.vL : P.vF) : e_sig(x + Math.floor(y / 2) * 3, 5) === 0 ? P.vS : n < 0.18 ? P.vL : n > 0.8 ? P.vS : P.vM;
      if (!lz && h(x, y, 572) < 0.03) B[i] = E_FLOR[Math.floor(h(x, y, 573) * 4)]; }
  }
  for (const [x, y, w] of [[100, 158, 3], [222, 152, 2], [60, 168, 4], [250, 172, 3], [180, 166, 2]]) { rect(x - w, y, x + w, y + 2, P.rocaS); rect(x - w, y, x + w - 1, y + 1, P.roca); rect(x - w + 1, y, x, y, P.rocaL); }
  rect(262, 128, 264, 146, hex('#4a3020')); rect(262, 128, 262, 146, hex('#7a5638')); rect(261, 127, 265, 128, hex('#5a3a28'));
}

function e_vacio(R, t, o) {
  const P = E_PAL.ocaso, { rect, pset, linea } = R;
  R.copiar(e_buf(R, 'e-vacio', () => e_vacioFondo(R, P)));
  e_nubes(R, t, P, [[40, 30, 58, 9, 0.5, 31], [190, 26, 46, 7, 0.5, 32], [110, 46, 40, 6, 1.1, 33], [280, 52, 52, 7, 1.1, 34], [10, 56, 30, 5, 1.9, 35]], 232);
  // una bandada que vuelve a casa (en uve) y pájaros sueltos
  { const u = e_sig(t / 22, 1), bx = -30 + u * 380, by = 40 + Math.sin(u * 3) * 4;
    for (let k = 0; k < 7; k++) { const x = Math.round(bx - Math.ceil(k / 2) * 5), y = Math.round(by + Math.ceil(k / 2) * (k % 2 ? 3 : -3) * 0.7), al = Math.floor(t * 5 + k) % 2;
      if (x < 2 || x > 317 || e_tranquila(x, y)) continue; pset(x, y, P.ave); pset(x - 1, y - al, P.ave); pset(x + 1, y - al, P.ave); pset(x - 2, y - 1 + al * 0, P.ave); pset(x + 2, y - 1, P.ave); } }
  e_aves(R, t, P, 3, 30, 60, 3);
  const enAgua = (x, y) => x >= 0 && x < 320 && y >= Math.max(e_vLinea(x), 78) && y < e_vOrilla(x);
  e_ondas(R, t, P, 44, 80, 140, enAgua, 232, 3);
  // círculos de peces
  for (let k = 0; k < 3; k++) { const ci = e_sig(t / 4 + k / 3, 1), n = Math.floor(t / 4 + k / 3), px = Math.round(40 + h(n, k, 574) * 200), py = Math.round(96 + h(n, k + 5, 574) * 36); if (ci < 0.6) { const r = ci * 14; for (let a = 0; a < 6.28; a += 0.5 / Math.max(1, r)) { const x = Math.round(px + Math.cos(a) * r), y = Math.round(py + Math.sin(a) * r * 0.3); if (enAgua(x, y)) pset(x, y, P.aguaO); } } }
  // la barca vacía amarrada que se mece
  { const b = Math.sin(t * 1.3) * 0.8, bx = 284, by = Math.round(134 + b); linea(263, 131, bx - 8, by - 2, hex('#c8a878'));
    rect(bx - 10, by - 2, bx + 10, by, hex('#6a4430')); rect(bx - 9, by + 1, bx + 9, by + 1, hex('#3a2420')); rect(bx - 10, by - 2, bx + 10, by - 2, hex('#9a6a44')); rect(bx - 2, by - 3, bx + 1, by - 3, hex('#5a3a28'));
    pset(bx - 11, by - 3, hex('#6a4430')); pset(bx + 11, by - 3, hex('#6a4430')); rect(bx - 9, by + 2, bx + 9, by + 2, P.agua[4]); linea(bx + 3, by - 2, bx + 12, by + 3, hex('#c8a070')); }
  // luciérnagas sobre la orilla
  for (let k = 0; k < 12; k++) { const x = Math.round(20 + h(k, 1, 575) * 280 + Math.sin(t * 0.7 + k) * 6), y = Math.round(118 + h(k, 2, 575) * 40 + Math.sin(t * 1.1 + k * 2) * 4); if (Math.sin(t * 2.3 + k * 1.7) > 0.3) { pset(x, y, hex('#fff4a0')); if (Math.sin(t * 2.3 + k * 1.7) > 0.8) { pset(x + 1, y, hex('#d8c060')); pset(x - 1, y, hex('#d8c060')); } } }
  return { suelo: 152, libre: [30, 280], nino: [160, 152], playa: [96, 224], sol: [232, 60] };
}

// por delante en 'rio' y 'vacio': juncos y espadañas que se mecen en las dos esquinas, y dos libélulas
function e_juncos(R, t, P) {
  const { pset, linea } = R;
  for (let k = 0; k < 18; k++) {
    const izq = k < 9, x0 = izq ? 2 + (k * 4) % 34 : 286 + (k * 4) % 34, y0 = 180, alto = 34 + Math.round(h(k, 1, 576) * 28), sw = Math.sin(t * 1.4 + k * 0.7) * (2 + alto * 0.04), xt = x0 + (izq ? 1 : -1) * (h(k, 2, 576) * 6) + sw, yt = y0 - alto;
    linea(x0, y0, xt, yt, k % 3 ? P.vM : P.vS); linea(x0 + 1, y0, xt + 1, yt + 2, P.vS);
    if (k % 2 === 0) { R.rect(Math.round(xt) - 1, yt - 1, Math.round(xt) + 1, yt + 5, hex('#5a3a24')); pset(Math.round(xt), yt - 1, hex('#8a5a38')); pset(Math.round(xt), yt - 3, P.vM); }
    else linea(x0, y0 - 8, x0 + (izq ? 9 : -9) + sw * 1.5, y0 - 8 - alto * 0.6, P.vL);
  }
  for (let k = 0; k < 2; k++) { const x = Math.round(60 + k * 160 + Math.sin(t * 0.9 + k * 3) * 30), y = Math.round(128 + Math.sin(t * 1.7 + k) * 8), a = Math.floor(t * 12 + k) % 2;
    linea(x - 2, y, x + 2, y, hex('#2a6a8a')); pset(x + 2, y, hex('#4ab0d0')); pset(x - 1, y - 1 - a, hex('#d8e8f0')); pset(x + 1, y - 1 - a, hex('#d8e8f0')); }
  return {};
}

// los colores de Leto gusano: la piel gris plata (de la sombra al brillo), el oro del carro, la laca granate, los cojines,
// el verde y negro del banderín, la silueta pálida y la luz de las motas
const p_GUS = ['#26252b', '#3c3b41', '#55555b', '#717277', '#929396', '#b4b6b6', '#d6d9d8', '#f0f3f2'].map((c) => hex(c));

const p_ORO = ['#5a3c14', '#9a6a1c', '#d4a43c', '#f8e08a'].map((c) => hex(c));

const p_LACA = ['#2e1414', '#5a2222', '#74302a', '#8e4234'].map((c) => hex(c));

const p_COJIN = ['#2e1430', '#542050', '#76306a', '#9a4a8a'].map((c) => hex(c));

const p_TRUCHA = ['#241a16', '#3e2c22', '#6a4e36', '#c8a06a'].map((c) => hex(c));

const p_PALIDO = ['#c8c0b0', '#e8e2d4', '#fffaf0'].map((c) => hex(c));

const p_LUZ = ['#f0c860', '#fff0a8', '#ffffff'].map((c) => hex(c));

const p_PIEL = ['#b07a5a', '#d49c78', '#eabc96', '#f6d6b8'].map((c) => hex(c));

const p_OJO = ['#1e3a9a', '#3a6ae0', '#8ab4ff', '#d8e8ff'].map((c) => hex(c));

const p_ESTV = hex('#2a5a3a'), p_ESTN = hex('#18141c'), p_TINTA = hex('#16121a'), p_BLANCO = hex('#ffffff');

// mezcla dos colores (a = cuánto del segundo)
const p_mez = (c1, c2, a) => { const f = (sh) => Math.round(((c1 >>> sh) & 255) * (1 - a) + ((c2 >>> sh) & 255) * a);
  return ((255 << 24) | (f(16) << 16) | (f(8) << 8) | f(0)) >>> 0; };

// la trama de Bayer de 4 × 4 (0–1) para las transiciones tramadas
const p_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const p_b4 = (x, y) => (p_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// ruido de valor suave (0–1), para las manchas de las truchas
const p_ruido = (x, y, k = 0) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), e = h(xi + 1, yi + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + e) * sx * sy; };

// una sombra tramada en el suelo (elipse que oscurece lo que hay debajo)
function p_sombra(R, cx, cy, rx, ry, a) {
  for (let j = Math.floor(-ry); j <= Math.ceil(ry); j++) for (let i = Math.floor(-rx); i <= Math.ceil(rx); i++) {
    const e = (i / rx) ** 2 + (j / ry) ** 2; if (e > 1) continue; const px = Math.round(cx + i), py = Math.round(cy + j);
    if (p_b4(px, py) < (1 - e) * 1.8) R.pset(px, py, p_mez(R.pget(px, py), hex('#1e1820'), a * (e < 0.5 ? 1 : 0.7))); }
}

// un punto que crece con la escala (1 px, o 2 × 2 a escala ≥ 1,5)
const p_puntoS = (R, x, y, s, c) => { R.pset(x, y, c); if (s >= 1.5) { R.pset(x + 1, y, c); R.pset(x, y + 1, c); R.pset(x + 1, y + 1, c); } };

// una rueda de oro del carro (llanta, radios que giran, cubo)
function p_rueda(R, cx, cy, r, giro) {
  for (let j = Math.floor(-r - 1); j <= Math.ceil(r + 1); j++) for (let i = Math.floor(-r - 1); i <= Math.ceil(r + 1); i++) {
    const dd = Math.hypot(i + 0.5, j + 0.5); if (dd > r + 0.5) continue; let c = null;
    if (dd > r - 0.6) c = p_TINTA; else if (dd > r - 1.4 - (r > 5 ? 0.6 : 0)) c = (i + j < 0) ? p_ORO[3] : p_ORO[1];
    else if (dd < Math.max(1.2, r * 0.25)) c = dd < 0.8 ? p_ORO[3] : p_ORO[2];
    else { const a = Math.atan2(j + 0.5, i + 0.5) - giro, rad = Math.abs(((a * 3 / Math.PI) % 1 + 1) % 1 - 0.5) < 0.12 + 0.3 / r; c = rad ? p_ORO[2] : p_LACA[0]; }
    R.pset(cx + i, cy + j, c); }
}

// la cara humana de Leto gusano: un óvalo de piel en el rebajo del capuchón (pliegue oscuro y labio claro), cejas
// tristes, párpados medio caídos, ojos azul de especia con brillo, nariz y boca pequeñas; o.habla abre la boca; o.mira
// mueve los ojos; fuera 0–1: se deshace a pellizcos (los ojos aguantan hasta el final)
function p_caraLeto(R, fx, fy, s, d, t, o, fuera, ag) {
  const { pset } = R, rx = 5.6 * s, ry = 6.6 * s, parpa = (t % 4.3) < 0.14;
  for (let j = Math.floor(-ry * 1.75); j <= Math.ceil(ry * 1.35); j++) for (let i = Math.floor(-rx * 1.75); i <= Math.ceil(rx * 1.75); i++) {
    const e = Math.hypot(i / rx, j / ry), px = fx + i, py = fy + j;
    if (e > 1.72 || (e > 1.32 && j > ry * 0.35)) continue;
    if (fuera > 0 && h(px >> 1, py >> 1, 19) < fuera) continue;
    // el segundo pliegue del capuchón, por encima y a los lados (como los anillos de una boca de gusano)
    if (e > 1.58) { pset(px, py, (i * d < 0 && j < 0) ? p_GUS[5] : p_GUS[4]); continue; }
    if (e > 1.46) { pset(px, py, p_GUS[2]); continue; }
    if (e > 1.32) continue;
    if (e > 1.16) { if ((i * d < 0 && j < 0) || j < -ry * 0.6) pset(px, py, p_GUS[6]); continue; }   // el labio claro del rebajo
    if (e > 1) { pset(px, py, p_GUS[1]); continue; }                                                     // el pliegue oscuro
    const v = 2.3 - j / ry * 0.5 + (i * d > rx * 0.45 ? -0.9 : 0) + (i * d < -rx * 0.4 ? 0.5 : 0) + (p_b4(px, py) - 0.5) * 0.7 - (e > 0.85 ? 0.6 : 0);
    pset(px, py, p_PIEL[Math.max(0, Math.min(3, Math.round(v)))]);
  }
  // los rasgos (en unidades de cara; S = tamaño del píxel de los rasgos)
  const S = s >= 1.5 ? 2 : 1, q = (i, j, c) => { const px = fx + i * S * d, py = fy + j * S; if (fuera > 0 && h(px, py, 19) < fuera * 0.8) return; R.rect(Math.min(px, px + (S - 1) * d), py, Math.max(px, px + (S - 1) * d), py + S - 1, c); };
  const mi = o.mira ? Math.sign(Math.round((o.mira[0] - fx) / 14)) * d : 0, mj = o.mira && o.mira[1] > fy + 30 ? 1 : 0;
  if (s < 0.8) {   // de lejos: dos puntos azules, la boca
    q(-1, -1, parpa ? p_PIEL[0] : p_OJO[1]); q(1, -1, parpa ? p_PIEL[0] : p_OJO[1]); q(0, 2, p_PIEL[0]);
    return;
  }
  const ojoOn = !parpa || ag > 0.8;
  // cejas tristes (la punta de dentro más alta)
  q(-3, -4, p_PIEL[0]); q(-2, -5, p_PIEL[0]); q(2, -5, p_PIEL[0]); q(3, -4, p_PIEL[0]);
  // los párpados medio caídos, y los ojos azules (todo el ojo azul, como los fremen) con su brillo
  for (const ex of [-3, 2]) {
    q(ex, -3, p_PIEL[1]); q(ex + 1, -3, p_PIEL[1]);
    if (ojoOn) { q(ex, -2, p_OJO[mi < 0 ? 0 : 1]); q(ex + 1, -2, p_OJO[mi > 0 ? 0 : 1]); if (!mj) q(ex + (mi > 0 ? 0 : 1), -2, p_OJO[mi ? 1 : 2]); q(ex + (mi < 0 ? 0 : 1), -1 + mj - 1, p_OJO[0]); q(ex, -1, p_PIEL[1]); }
    else { q(ex, -2, p_PIEL[0]); q(ex + 1, -2, p_PIEL[0]); }
  }
  // el brillo de especia de los ojos (un punto claro que late)
  if (ojoOn && Math.sin(t * 1.7) > 0.3) q(-2, -2, p_OJO[3]);
  // la nariz y su sombra
  q(0, 0, p_PIEL[1]); q(0, 1, p_PIEL[0]);
  // la boca: serena y un poco triste; o.habla la abre
  const abre = o.habla && (Math.sin(t * 13) > -0.1 || Math.sin(t * 5.3) > 0.6);
  if (abre) { q(-1, 3, p_TINTA); q(0, 3, p_TINTA); q(1, 3, p_TINTA); q(0, 4, hex('#7a3a3a')); }
  else { q(-1, 3, hex('#9a5a50')); q(0, 3, hex('#9a5a50')); q(1, 3, hex('#9a5a50')); q(-2, 4, p_PIEL[1]); q(2, 4, p_PIEL[1]); }
  q(0, 5, p_PIEL[1]);
}

// una mano humana pequeña de Leto gusano, con los dedos doblados sobre la proa (luz 0–1 la aclara: la de delante más)
function p_manita(R, x, y, s, d, luz, fuera) {
  const S = s >= 1.5 ? 2 : 1, m = [' kkkk  ', 'kaaaak ', 'kabbbak', 'kbcbcbk', ' kkkkk '], col = { a: p_PIEL[3], b: p_PIEL[2], c: p_PIEL[1], k: p_TINTA };
  if (s < 0.8) { R.pset(x, y, p_PIEL[2]); R.pset(x + d, y, p_PIEL[1]); return; }
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) { const ch = m[j][i]; if (ch === ' ') continue;
    const px = x + (i - 2) * S * d, py = y + (j - 3) * S; if (fuera > 0 && h(px, py, 23) < fuera) continue;
    R.rect(Math.min(px, px + (S - 1) * d), py, Math.max(px, px + (S - 1) * d), py + S - 1, ch === 'k' ? col.k : luz < 0.9 ? p_mez(col[ch], p_PIEL[0], 0.3) : col[ch]); }
}

// un tigre agazapado (rejilla local con contorno); fase desfasa su animación; osc 0–1 lo oscurece (el de detrás)
function p_tigre(R, x, y, t, d, s, fase, paso, noche, osc) {
  const W = Math.ceil(62 * s), H = Math.ceil(30 * s), ox = Math.round(x - 31 * s * d), oy = Math.round(y - 27 * s);
  const g = new Uint8Array(W * H);   // 0 vacío, 1 cuerpo, 2 cabeza, 3 pata lejana, 4 pata cercana, 5 cola, 6 hocico, 7 oreja
  const L = (lx) => (31 + lx * d) * s, Vy = (ly) => (27 + ly) * s;
  const elip = (cx, cy, rx, ry, k) => { const X0 = L(cx), Y0 = Vy(cy), RX = rx * s, RY = ry * s;
    for (let j = Math.floor(Y0 - RY); j <= Math.ceil(Y0 + RY); j++) for (let i = Math.floor(X0 - RX); i <= Math.ceil(X0 + RX); i++) {
      if (i < 0 || j < 0 || i >= W || j >= H) continue; if (((i + 0.5 - X0) / RX) ** 2 + ((j + 0.5 - Y0) / RY) ** 2 <= 1) g[j * W + i] = k; } };
  const gruesa = (pts, gr, k) => { for (let n = 0; n + 1 < pts.length; n++) { const [a, b] = pts[n], [c, e] = pts[n + 1], m = Math.max(2, Math.ceil(Math.hypot(c - a, e - b) * s * 2));
    for (let q = 0; q <= m; q++) elip(a + (c - a) * q / m, b + (e - b) * q / m, gr, gr, k); } };
  const ph = t * 2.2 + fase, st = paso ? Math.sin(ph) * 2.4 : 0, st2 = paso ? Math.sin(ph + Math.PI) * 2.4 : 0;
  const alzaF = paso ? Math.max(0, Math.sin(ph)) * 1.6 : 0, alzaT = paso ? Math.max(0, Math.sin(ph + Math.PI)) * 1.4 : 0;
  const resp = Math.sin(t * 1.6 + fase) * 0.35, bob = paso ? Math.abs(Math.sin(ph)) * 0.6 : 0, peso = paso ? 0 : Math.sin(t * 0.7 + fase) * 0.8;
  // patas lejanas (más oscuras), luego la cola, el cuerpo, las patas cercanas y la cabeza
  gruesa([[5 + peso, -7], [6 + st2, -2 - alzaF * 0], [7 + st2, 0]], 1.7, 3);
  gruesa([[-12, -7], [-15 + st, -3], [-12 + st, 0]], 1.8, 3);
  const sw = Math.sin(t * 1.4 + fase), tip = Math.sin(t * 4.1 + fase) * (Math.sin(t * 0.5 + fase) > 0.3 ? 1 : 0.2);
  gruesa([[-15, -10], [-21, -11 + sw * 0.5], [-26, -14 + sw], [-28 + tip * 0.6, -19 + sw * 1.4 + tip]], 1.3, 5);
  elip(-1, -9.5 - bob, 13.5, 5.3 + resp, 1);              // el torso
  elip(-9, -10.5 - bob, 6.5, 5.6 + resp * 0.5, 1);        // las ancas
  elip(7 + peso * 0.3, -11.5 - bob, 6.2, 5.4, 1);         // los omóplatos, altos (al acecho)
  gruesa([[9, -8], [11 + st, -3 - alzaF], [12 + st, 0 - alzaF * 0.6]], 1.9, 4);
  gruesa([[-7, -7], [-10 + st2, -3 - alzaT], [-7 + st2, 0 - alzaT * 0.6]], 2, 4);
  const orej = Math.sin(t * 3 + fase * 3) > 0.92 ? 1 : 0;
  elip(15.2, -14.6 - orej, 1.8, 2, 7); elip(18.6, -14.8, 1.8, 2, 7);
  elip(17.4, -10, 5.6, 5, 2);                              // la cabeza, baja
  elip(22, -8.2, 3, 2.6, 6);                            // el hocico
  // pintar, con contorno
  const NOC = hex('#1a2040'), nm = (c) => { let r = noche ? p_mez(c, NOC, 0.26) : c; if (osc) r = p_mez(r, NOC, osc); return r; };
  const TG = p_TIGRE.map(nm), K = nm(p_TINTA), raya = TG[0];
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const k = g[j * W + i]; if (!k) continue;
    const px = ox + i, py = oy + j, lx = (i / s - 31) * d, ly = j / s - 27;
    const bord = i === 0 || j === 0 || i === W - 1 || j === H - 1 || !g[j * W + i - 1] || !g[j * W + i + 1] || !g[(j - 1) * W + i] || !g[(j + 1) * W + i];
    if (bord) { R.pset(px, py, K); continue; }
    let v = 3 - (ly + 11) * 0.28 + (p_b4(px, py) - 0.5) * 0.8;
    if (k === 3) v -= 1.3; if (k === 7) v -= 0.4;
    let c = TG[Math.max(1, Math.min(4, Math.round(v)))];
    const vientre = (k === 1 && ly > -7.2 + Math.sin(lx * 0.4) * 0.6) || (k === 2 && ly > -9 && lx < 19.5 && lx > 13) || k === 6;
    if (vientre) c = TG[(ly > -5.5 || k === 6) ? 6 : 5];
    // las rayas: bandas oblicuas irregulares, más finas abajo
    // las rayas: bandas casi verticales que se afinan hacia el vientre (en las patas, horizontales)
    const rw = 0.2 + (ly < -11 ? 0.06 : 0) - (ly > -7.5 ? 0.08 : 0), fr = ((lx * 0.3 + Math.sin(ly * 0.35 + lx * 0.2) * 0.2) % 1 + 1) % 1;
    if ((k === 1 || k === 5) && !vientre && fr < rw) c = raya;
    if ((k === 3 || k === 4) && ly < -2 && ((ly * 0.45 + lx * 0.1) % 1 + 1) % 1 < 0.22) c = raya;
    if (k === 2 && !vientre && ly < -11 && (((lx * 0.6) % 1 + 1) % 1) < 0.25) c = raya;
    if (k === 5 && lx < -26.5) c = raya;                  // la punta negra de la cola
    if (k === 7 && Math.abs(ly + 13.4) < 0.7) c = TG[0];
    R.pset(px, py, c);
  }
  // el collar de mando con su luz
  for (let j = -1; j <= 1; j++) for (let q = -3; q <= 4; q++) { const px = ox + Math.round(L(12.4 + q * 0.05) + j * 0.0), py = oy + Math.round(Vy(-12 + q * 1.15)); if (j === 0) { R.pset(px, py, nm(hex('#3a2a3a'))); R.pset(px + d, py, nm(hex('#5a4a5a'))); } }
  const luz = (t * 1.3 + fase) % 1 < 0.22; const lpx = ox + Math.round(L(13.2)), lpy = oy + Math.round(Vy(-8.6));
  R.pset(lpx, lpy, luz ? hex('#ff5a3a') : hex('#6a1a1a')); if (luz) { R.pset(lpx + 1, lpy, hex('#a82a20')); R.pset(lpx - 1, lpy, hex('#a82a20')); R.pset(lpx, lpy - 1, hex('#a82a20')); }
  // los ojos que brillan (verdes en la oscuridad), con parpadeo; la nariz y los bigotes
  const ojo = (t + fase * 2) % 5.1 > 0.16, ex = ox + Math.round(L(19.6)), ey = oy + Math.round(Vy(-11.6));
  if (ojo) { R.pset(ex, ey, hex('#e8ff8a')); R.pset(ex - d, ey, hex('#8ac84a')); } else R.pset(ex, ey, K);
  R.pset(ex, ey - 1, K);
  const nx = ox + Math.round(L(24.4)), ny = oy + Math.round(Vy(-9.2));
  R.pset(nx, ny, hex('#8a4a50')); R.pset(nx - d, ny, hex('#5a2a30'));
  R.pset(nx - 2 * d, ny + 1, K); R.pset(nx - 3 * d, ny + 2, nm(TG[5]));   // la boca cerrada y un bigote
  return [nx, ny];
}

// el pelaje del tigre: raya, sombra, medio, luz, brillo, vientre y crema
const p_TIGRE = ['#1a1210', '#9a4a18', '#c86a22', '#e88a30', '#f8aa48', '#e8d2b0', '#fff0dc'].map((c) => hex(c));

// el gatito naranja atigrado (~9 × 9 px) sentado, mirando hacia d: cola que se mece, orejas, parpadeo y maullido
function p_gatito(R, x, y, t, d, noche) {
  const NOC = hex('#1a2040'), nm = (c) => (noche ? p_mez(c, NOC, 0.15) : c);
  const c = { k: nm(p_TINTA), o: nm(hex('#e8902e')), O: nm(hex('#ffb85a')), r: nm(hex('#b05a1a')), b: nm(hex('#fff4e0')), p: hex('#ff9aaa'), e: hex('#a8ff6a') };
  const miau = (t % 2.5) < 0.45, parp = (t % 3.7) < 0.12, ore = Math.sin(t * 4) > 0.9;
  const S = [
    ore ? '.k...k...' : 'k...k....',
    'kOk.kOk..',
    'kOOOOOk..',
    parp ? 'kokOkok..' : 'keOOeOk..',
    miau ? 'kObpbOk..' : 'kObbbOk..',
    '.kOOOk...',
    '.kOrOrk..',
    'kOOrOOOk.',
    'kObbOOOk.',
    '.kkkkkk..',
  ];
  const w = 9, hh = S.length;
  for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) { const ch = S[j][i]; if (ch === '.') continue; R.pset(x + (i - 3) * d, y - hh + 1 + j, c[ch]); }
  // la cola que se mece
  const sw = Math.round(Math.sin(t * 2.4) * 2);
  [[4, -2], [5, -3], [6, -4 + Math.min(0, sw)], [6 + (sw > 0 ? 1 : 0), -5 + sw]].forEach(([i, j], n) => { R.pset(x - i * d, y + j, n === 3 ? c.r : c.o); R.pset(x - i * d, y + j + 1, c.k); });
  return [x, y - 6];
}

// una trucha: una mancha blanda orientada (largo L, ancho A, ángulo a) con su sombra, el lomo oscuro, el filo claro
// de arriba y un brillo que le recorre el lomo; con perla, un punto de luz que late con su halo
function p_trucha(R, cx, cy, L, A, a, t, k, perla, plana = true) {
  const ap = plana ? 0.55 : 1;
  const ca = Math.cos(a), sa = Math.sin(a), r = Math.ceil(L / 2 + 2), hl = L / 2, ha = A / 2, gl = ((t * 0.9 + h(k, 9)) % 1) * 2 - 1;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    const px = Math.round(cx) + i, py = Math.round(cy) + j, u = i * ca + j / ap * sa, v = -i * sa + j / ap * ca;
    const anch = ha * (1 - 0.25 * (u / hl)), e = (u / hl) ** 2 + (v / anch) ** 2;
    if (e > 1) { const es = (u / hl) ** 2 + ((v - ca * 1.2) / anch) ** 2; if (es <= 1 && j > 0) R.pset(px, py, p_mez(R.pget(px, py), p_TRUCHA[0], 0.35)); continue; }
    // dentro: el lomo oscuro y blando; arriba, el filo claro (el píxel de encima ya está fuera) y su segunda fila
    const fueraDe = (ii, jj) => { const uu = ii * ca + jj / ap * sa, vv = -ii * sa + jj / ap * ca, an = ha * (1 - 0.25 * (uu / hl)); return (uu / hl) ** 2 + (vv / an) ** 2 > 1; };
    let c = e > 0.6 ? p_TRUCHA[1] : p_TRUCHA[0];
    if (fueraDe(i, j - 1)) c = p_TRUCHA[3]; else if (fueraDe(i, j - 2)) c = p_TRUCHA[2];
    else if (Math.abs(u / hl - gl) < 0.2 && v < 0.3) c = p_TRUCHA[2];          // el brillo que recorre el lomo
    if (e < 0.3 && h(px, py, 3) > 0.75) c = p_TRUCHA[1];
    R.pset(px, py, c);
  }
  if (perla) { const b = 0.55 + 0.45 * Math.sin(t * 3 + k * 1.3), px = Math.round(cx), py = Math.round(cy) - 1;
    for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) { const g = 1 - Math.hypot(i, j) / 3.4; if (g > 0 && g * b * 1.3 > p_b4(px + i, py + j) + 0.25) R.pset(px + i, py + j, p_LUZ[0]); }
    R.pset(px, py, p_LUZ[2]); R.pset(px + 1, py, p_LUZ[1]); R.pset(px, py + 1, p_LUZ[1]); }
}

// una rejilla de dibujo pequeña (para los objetos de las pausas): p píxel, r rectángulo, d disco, e elipse, l línea
function p_lienzo(w, hh) {
  const g = new Uint32Array(w * hh), p = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < w && y < hh) g[y * w + x] = c; };
  return { w, h: hh, g, p,
    r: (a, b, c, e, col) => { for (let y = Math.round(b); y <= Math.round(e); y++) for (let x = Math.round(a); x <= Math.round(c); x++) p(x, y, col); },
    e: (cx, cy, rx, ry, col) => { for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) p(x, y, typeof col === 'function' ? col(x, y) : col); },
    l: (a, b, c, e, col) => { const n = Math.max(1, Math.ceil(Math.max(Math.abs(c - a), Math.abs(e - b)))); for (let q = 0; q <= n; q++) p(a + (c - a) * q / n, b + (e - b) * q / n, col); },
  };
}

// vuelca una rejilla a pantalla a escala s, con un contorno oscuro de 1 px (de la rejilla) alrededor de lo pintado
function p_volcar(R, L, X0, Y0, s) {
  const { w, h: hh, g } = L, K = p_TINTA;
  for (let y = -1; y <= hh; y++) for (let x = -1; x <= w; x++) {
    const c = x >= 0 && y >= 0 && x < w && y < hh ? g[y * w + x] : 0;
    let col = c;
    if (!c) { const v = (i, j) => i >= 0 && j >= 0 && i < w && j < hh && g[j * w + i] && g[j * w + i] !== K; if (v(x - 1, y) || v(x + 1, y) || v(x, y - 1) || v(x, y + 1)) col = K; else continue; }
    R.rect(X0 + x * s, Y0 + y * s, X0 + x * s + s - 1, Y0 + y * s + s - 1, col);
  }
}

const p_P = Object.fromEntries(Object.entries({
  piel: '#f2c8a0', pielS: '#d49a74', pelo: '#6a3a1e', peloL: '#8a5230', verde: '#4a9a4a', verdeS: '#2e6a34', azul: '#3a5a9a', azulS: '#28406e',
  rojo: '#d0503a', rojoS: '#963424', rojoL: '#f07a5a', crema: '#f4e6c8', cremaS: '#d4bc94', teja: '#b83a2a', tejaL: '#e05a3a', madera: '#a86a3a', maderaS: '#74461e', maderaL: '#cc8c50',
  oro: '#e8b438', oroS: '#a87818', oroL: '#fff0a0', laton: '#c89a40', latonS: '#8a6420', latonL: '#f0d080', gris: '#8a8a96', grisS: '#5a5a66', grisL: '#c0c0cc',
  cielo: '#8ad0ff', agua: '#3a7ad0', aguaS: '#2a54a0', tierra: '#5aa84a', tierraS: '#3a7a34', blanco: '#ffffff', luz: '#ffe070', amarillo: '#f0c838', amarilloS: '#c09018',
  mantel: '#e8eef4', mantelS: '#b8c4d4', humo: '#d8d8e0', rosa: '#f08a9a', morado: '#8a5ac8', naranja: '#f0902e', negro: '#26202a', vaso: '#bfe4f4',
}).map(([k, v]) => [k, hex(v)]));

const p_PAUSA = {
  mochila: { w: 36, h: 44, dibuja(L, t) {
    const c = p_P, ph = t * 3.2, pa = Math.sin(ph), bota = Math.abs(Math.sin(ph)) > 0.7 ? -1 : 0;
    // el niño, CHIBI como el elenco del episodio (cabeza grande y redonda, cuerpo corto, ojos de dos píxeles,
    // mejillas), visto de tres cuartos hacia la derecha y un poco encorvado bajo el peso
    // las piernas cortas que caminan (una adelante y otra atrás) y los zapatos
    const pi = Math.round(pa * 1.2);
    L.r(21 + pi, 37, 23 + pi, 41, c.azulS); L.r(20 + pi, 42, 23 + pi, 43, c.maderaS);
    L.r(25 - pi, 37, 27 - pi, 41, c.azul); L.r(25 - pi, 42, 28 - pi, 43, c.maderaS); L.p(27 - pi, 42, c.maderaL);
    // el cuerpo corto con la túnica verde, su sombra abajo y el cinto
    L.r(20, 28, 29, 37, c.verde); L.r(20, 35, 29, 37, c.verdeS); L.r(28, 28, 29, 34, c.verdeS); L.r(20, 33, 29, 33, c.maderaS); L.p(25, 33, c.oro);
    // la cabeza grande y redonda (adelantada), con la luz arriba y la sombra en la nuca y la barbilla
    L.e(27.5, 19.5, 7, 6.8, c.piel); L.e(25, 24.5, 5, 1.4, c.pielS); L.p(32, 24, c.pielS); L.p(33, 23, c.pielS);
    // el pelo de chibi: un casco que cubre arriba y la nuca, con su flequillo de mechones (nunca tapa los ojos)
    L.e(26, 15, 7, 4, c.pelo); L.r(20.5, 14, 23, 22, c.pelo); L.r(21, 20, 22, 23, c.pelo);
    for (const [fx, fy] of [[25, 19], [28, 19], [30, 18], [33, 17]]) L.p(fx, fy, c.pelo);
    L.p(25, 13, c.peloL); L.p(27, 12, c.peloL); L.p(29, 13, c.peloL); L.p(23, 15, c.peloL);
    // la oreja
    L.p(23, 20, c.pielS); L.p(23, 21, c.piel);
    // los ojos de chibi (dos píxeles de alto) que parpadean, las mejillas y la boca apretada por el esfuerzo
    const parp = (t % 3.1) < 0.12;
    if (parp) { L.p(27, 21, c.negro); L.p(32, 21, c.negro); }
    else { L.p(27, 20, c.negro); L.p(27, 21, c.negro); L.p(32, 20, c.negro); L.p(32, 21, c.negro); }
    L.p(26, 23, c.rosa); L.p(33, 23, c.rosa); L.p(29, 24, c.pielS); L.p(30, 24, c.pielS);
    // el brazo corto que agarra la correa, con su manita
    L.l(24, 29, 23, 33, c.verde); L.p(22, 34, c.piel); L.p(23, 34, c.piel); L.p(23, 35, c.pielS);
    // la mochila enorme: cuerpo, lado en sombra, bolsillo, hebillas y la correa
    L.r(4, 17, 20, 38, c.rojo); L.r(5, 16, 19, 16, c.rojo); L.r(4, 17, 7, 38, c.rojoS); L.r(17, 18, 18, 36, c.rojoL);
    L.r(5, 16, 19, 20, c.rojoS); L.r(6, 16, 18, 16, c.rojoL); L.p(12, 21, c.oro);   // la tapa con su cierre
    for (const [qx, qy] of [[4, 17], [4, 38], [20, 38], [5, 16], [19, 16]]) L.p(qx, qy, 0);   // esquinas redondeadas
    L.r(8, 29, 17, 36, c.rojoS); L.r(9, 29, 16, 29, c.rojoL); L.p(12, 32, c.oro);
    L.l(20, 18, 24, 28, c.rojoS); L.l(20, 19, 25, 28, c.maderaS);
    L.r(9, 21, 9, 27, c.rojoS); L.r(15, 21, 15, 27, c.rojoS); L.p(9, 24, c.oroS); L.p(15, 24, c.oroS);
    // la casita encima: paredes, tejado, puerta, ventana encendida y chimenea
    L.r(5, 15, 19, 15, c.maderaS);
    L.r(4, 9, 20, 14, c.crema); L.r(4, 13, 20, 14, c.cremaS); L.r(4, 9, 5, 14, c.cremaS);
    for (let k = 0; k <= 6; k++) L.r(1 + k * 1.5, 9 - k, 23 - k * 1.5, 9 - k, k % 2 ? c.teja : c.tejaL);
    L.r(17, 1, 18, 4, c.rojoS); L.r(7, 10, 9, 14, c.maderaS); L.p(9, 12, c.oro);
    const luz = Math.sin(t * 2.2) > -0.6; L.r(13, 10, 15, 12, luz ? c.luz : c.amarilloS); L.r(17, 10, 19, 12, luz ? c.amarilloS : c.luz); L.p(14, 11, c.maderaS); L.p(18, 11, c.maderaS);
    // la gota de sudor
    const gy = ((t * 0.9) % 1) * 4; L.p(33, 15 + gy, c.cielo); L.p(33, 16 + gy, c.blanco);
    return { bota, punto: [12, 7], despues: (q) => { for (let k = 0; k < 3; k++) { const f = (t * 0.5 + k / 3) % 1, hx = 17.5 + Math.sin(t * 2 + k * 2) * 1.5 + f * 3, hy = -1 - f * 9; if (f < 0.9) { q(Math.round(hx), Math.round(hy), p_P.humo); if (f < 0.6) q(Math.round(hx) + 1, Math.round(hy), p_P.grisL); } } } };
  } },
  balanza: { w: 52, h: 44, dibuja(L, t, o) {
    const c = p_P, inc = Math.max(-1, Math.min(1, o.inclina ?? 0.6)), a = inc * 0.28 + Math.sin(t * 1.8) * 0.03;
    // la peana y la columna de latón
    L.r(18, 40, 34, 43, c.latonS); L.r(19, 40, 33, 40, c.latonL); L.r(22, 37, 30, 39, c.laton); L.r(25, 9, 27, 37, c.laton); L.r(25, 9, 25, 37, c.latonL); L.r(27, 9, 27, 37, c.latonS);
    // el astil inclinado y el fiel
    const px = 26, py = 8, Lb = 21, lx = px - Math.cos(a) * Lb, ly = py + Math.sin(a) * Lb, rx = px + Math.cos(a) * Lb, ry = py - Math.sin(a) * Lb;
    L.l(lx, ly, rx, ry, c.laton); L.l(lx, ly - 1, rx, ry - 1, c.latonL); L.e(px, py, 2.4, 2.4, c.latonL); L.p(px, py, c.latonS);
    L.l(px, py - 1, px - Math.sin(a) * 5, py - 6, c.latonS);
    // las cadenas y los platos
    const plato = (ex, ey, k) => { for (let q = 1; q <= 13; q++) { L.p(ex - q * 0.6, ey + q, q % 2 ? c.latonS : c.laton); L.p(ex + q * 0.6, ey + q, q % 2 ? c.latonS : c.laton); }
      L.e(ex, ey + 15, 9, 2.4, c.latonS); L.r(ex - 8, ey + 14, ex + 8, ey + 14, c.latonL); return [ex, ey + 13]; };
    const [mx, my] = plato(lx, ly, 0), [cx2, cy2] = plato(rx, ry, 1);
    // la moneda de oro, de canto, con su rombo
    L.e(mx, my - 4, 4.6, 4.6, c.oroS); L.e(mx - 0.5, my - 4.5, 3.8, 3.8, c.oro); L.p(mx - 2, my - 7, c.oroL); L.p(mx - 3, my - 6, c.oroL);
    L.p(mx, my - 6, c.oroS); L.p(mx - 1, my - 5, c.oroS); L.p(mx + 1, my - 5, c.oroS); L.p(mx, my - 3, c.oroS); L.p(mx - 1, my - 4, c.oroS); L.p(mx + 1, my - 4, c.oroS);
    // el cofre pequeño y lejano (pálido)
    const pal = (k) => p_mez(k, c.mantel, 0.4);
    L.r(cx2 - 3, my * 0 + cy2 - 4, cx2 + 3, cy2 - 1, pal(c.maderaS)); L.r(cx2 - 3, cy2 - 6, cx2 + 3, cy2 - 5, pal(c.madera)); L.r(cx2 - 3, cy2 - 4, cx2 + 3, cy2 - 4, pal(c.oro)); L.p(cx2, cy2 - 3, pal(c.oroL));
    return { punto: [mx, my - 5], despues: (q) => {
      const b = (t * 0.8) % 1; if (b < 0.3) { const sx = Math.round(mx + 3), sy = Math.round(my - 9); q(sx, sy, c.blanco); if (b < 0.2) { q(sx + 1, sy, c.oroL); q(sx - 1, sy, c.oroL); q(sx, sy - 1, c.oroL); q(sx, sy + 1, c.oroL); } }
      // el halo de lejanía alrededor del cofre: puntos que titilan
      for (let k = 0; k < 6; k++) { const an = k / 6 * Math.PI * 2 + t * 0.6; if (Math.sin(t * 3 + k) > 0) q(Math.round(cx2 + Math.cos(an) * 6), Math.round(cy2 - 4 + Math.sin(an) * 4), c.mantelS); } } };
  } },
  planeta: { w: 40, h: 42, dibuja(L, t) {
    const c = p_P, cx = 20, cy = 18, r = 13, gir = t * 0.35, flota = Math.round(Math.sin(t * 1.6));
    const orbita = (delante) => { for (let k = 0; k < 60; k++) { const an = k / 60 * Math.PI * 2, ox = cx + Math.cos(an) * 19, oy = cy + flota + Math.sin(an) * 5 + Math.cos(an) * 2; if ((Math.sin(an) > -0.15) === delante) L.p(ox, oy, delante ? (k % 4 ? c.oro : c.oroL) : c.oroS); } };
    orbita(false);
    // el planeta: océanos y continentes que giran, luz de arriba a la izquierda
    L.e(cx, cy + flota, r, r, (x, y) => { const dx = x - cx, dy = y - cy - flota, lon = Math.atan2(dx, Math.sqrt(Math.max(0, r * r - dx * dx - dy * dy))) + gir, lat = dy / r;
      const tierra = Math.sin(lon * 3) * Math.cos(lat * 4) + Math.sin(lon * 5 + 1) * 0.5 > 0.35, sombra = dx + dy > r * 0.7;
      return tierra ? (sombra ? c.tierraS : c.tierra) : (sombra ? c.aguaS : c.agua); });
    L.p(cx - 7, cy - 7 + flota, c.blanco); L.p(cx - 6, cy - 8 + flota, c.cielo);
    // el reloj en la cara: esfera, marcas y agujas que corren
    const rx = cx + 2, ry = cy + 1 + flota; L.e(rx, ry, 6.5, 6.5, c.grisS); L.e(rx, ry, 5.5, 5.5, c.crema);
    for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2; L.p(rx + Math.cos(an) * 4.6, ry + Math.sin(an) * 4.6, k % 3 ? c.cremaS : c.negro); }
    const am = t * 2.4, ah = t * 0.2; L.l(rx, ry, rx + Math.sin(am) * 4, ry - Math.cos(am) * 4, c.rojo); L.l(rx, ry, rx + Math.sin(ah) * 2.6, ry - Math.cos(ah) * 2.6, c.negro); L.p(rx, ry, c.negro);
    // el anillo de la órbita (por delante, la mitad de abajo)
    orbita(true);
    const lu = t * 0.9, ux = cx + Math.cos(lu) * 19, uy = cy + flota + Math.sin(lu) * 5 + Math.cos(lu) * 2; if (Math.sin(lu) > -0.15) L.e(ux, uy, 1.6, 1.6, c.grisL);
    return { punto: [rx, ry] };
  } },
  tranvia: { w: 60, h: 40, dibuja(L, t, o) {
    const c = p_P, pal = o.palanca ?? (Math.sin(t * 0.6) > 0 ? 1 : -1);
    // las traviesas y los raíles: el tramo de la izquierda, la rama recta y la rama que sube
    for (let x = 1; x < 59; x += 3) { L.r(x, 33, x + 1, 38, c.maderaS); L.p(x, 33, c.madera); }
    for (let x = 32; x < 58; x += 3) { const yy = 33 - (x - 31) * 0.5; L.r(x, yy - 1, x + 1, yy + 4, c.maderaS); }
    L.r(0, 34, 59, 34, c.grisL); L.r(0, 37, 59, 37, c.grisL); L.r(0, 35, 59, 35, c.grisS); L.r(0, 38, 59, 38, c.grisS);
    L.l(30, 34, 59, 20, c.grisL); L.l(30, 37, 59, 23, c.grisL); L.l(30, 35, 59, 21, c.grisS); L.l(30, 38, 59, 24, c.grisS);
    // la aguja del cambio (brilla en la rama elegida)
    const brilla = Math.sin(t * 4) > 0; if (pal < 0) L.l(28, 34, 36, 30, brilla ? c.oroL : c.oro); else L.r(28, 34, 36, 34, brilla ? c.oroL : c.oro);
    // la palanca con su pomo rojo
    L.r(26, 39, 32, 39, c.grisS); const pa = pal * 0.5, kx = 29 + Math.sin(pa) * 7, ky = 39 - Math.cos(pa) * 7;
    L.l(29, 39, kx, ky, c.gris); L.e(kx, ky, 1.6, 1.6, c.rojo); L.p(kx - 0.5, ky - 0.6, c.rojoL);
    // el puentecito de madera sobre la rama recta, con barandilla
    L.r(42, 20, 58, 21, c.madera); L.r(42, 20, 58, 20, c.maderaL); L.r(43, 22, 44, 31, c.maderaS); L.r(56, 22, 57, 31, c.maderaS);
    L.r(42, 16, 58, 16, c.maderaL); for (let x = 42; x <= 58; x += 4) L.r(x, 16, x, 19, c.madera);
    // el tranvía de juguete que avanza y retrocede un poco
    const tx = 3 + Math.round(Math.sin(t * 1.1) * 2);
    L.r(tx, 21, tx + 20, 32, c.amarillo); L.r(tx, 29, tx + 20, 32, c.rojo); L.r(tx, 21, tx + 20, 21, c.blanco); L.r(tx + 1, 19, tx + 19, 20, c.rojoS);
    for (let k = 0; k < 4; k++) { L.r(tx + 2 + k * 5, 23, tx + 4 + k * 5, 26, c.cielo); L.p(tx + 2 + k * 5, 23, c.blanco); }
    L.r(tx, 21, tx, 32, c.amarilloS); L.l(tx + 10, 19, tx + 14, 13, c.negro); L.r(tx + 13, 13, tx + 16, 13, c.negro);
    const gw = t * 3; for (const wx of [tx + 4, tx + 16]) { L.e(wx, 33, 2, 2, c.negro); L.p(wx + Math.round(Math.cos(gw)), 33 + Math.round(Math.sin(gw)), c.grisL); }
    L.p(tx + 20, 27, c.luz); L.p(tx + 20, 28, c.luz);
    return { punto: [kx, ky] };
  } },
  mesa: { w: 64, h: 36, dibuja(L, t) {
    const c = p_P;
    // los tres amigos detrás de la mesa, riéndose (botan por turnos, boca abierta)
    const amigo = (ax, ropa, pelo, k) => { const b = Math.round(Math.max(0, Math.sin(t * 7 + k * 2)) * 1.5), y0 = 13 - b, rie = Math.sin(t * 7 + k * 2) > 0;
      L.r(ax - 3, y0 + 4, ax + 3, 19, ropa); L.r(ax - 3, y0 + 4, ax - 3, 19, p_mez(ropa, c.negro, 0.3));
      L.e(ax, y0, 3.6, 3.6, c.piel); L.r(ax - 3, y0 - 3, ax + 3, y0 - 2, pelo); L.p(ax - 3, y0 - 1, pelo); L.p(ax + 3, y0 - 1, pelo);
      L.p(ax - 1, y0, c.negro); L.p(ax + 1, y0, c.negro); if (rie) { L.p(ax, y0 + 2, c.negro); L.p(ax - 1, y0 + 2, c.rojoS); L.p(ax + 1, y0 + 2, c.rojoS); } else L.r(ax - 1, y0 + 2, ax + 1, y0 + 2, c.pielS);
      L.p(ax + 4, y0 + 6 - b, c.piel); };
    amigo(41, c.azul, c.pelo, 0); amigo(49, c.naranja, c.negro, 1); amigo(57, c.morado, c.amarilloS, 2);
    // la silla sola del extremo izquierdo (respaldo alto, vacía)
    L.r(2, 8, 3, 30, c.maderaS); L.r(2, 8, 8, 9, c.madera); L.r(4, 11, 7, 11, c.maderaL); L.r(2, 20, 10, 21, c.madera); L.r(9, 21, 10, 30, c.maderaS);
    // la mesa larga con mantel, platos y vasos
    L.r(9, 18, 62, 21, c.mantel); L.r(9, 21, 62, 23, c.mantelS); for (let x = 12; x < 62; x += 6) L.p(x, 23, c.mantel);
    L.r(11, 24, 12, 34, c.maderaS); L.r(59, 24, 60, 34, c.maderaS); L.r(13, 24, 58, 24, c.madera);
    for (const px of [40, 48, 56]) { L.r(px - 2, 17, px + 2, 17, c.grisL); L.p(px + 3, 15, c.vaso); L.p(px + 3, 16, c.vaso); }
    L.p(14, 15, c.vaso); L.p(14, 16, c.vaso); L.p(14, 17, c.vaso); L.p(15, 16, c.blanco);
    return { punto: [6, 18], despues: (q) => { for (let k = 0; k < 4; k++) { const f = (t * 1.2 + k / 4) % 1, sx = 38 + k * 6 + Math.round(Math.sin(k * 3 + t * 3) * 2), sy = Math.round(7 - f * 7); if (f < 0.7) { q(sx, sy, c.amarillo); if (f < 0.35) { q(sx + 1, sy - 1, c.oroL); q(sx - 1, sy - 1, c.oroL); } } } } };
  } },
  jaula: { w: 60, h: 46, dibuja(L, t, o) {
    const c = p_P, f = Math.max(0, Math.min(1, o.vuela ?? Math.min(1, (t % 6) / 4)));
    // la señal de prohibido en su poste: aro rojo, fondo blanco, el pajarito gris y la barra cruzada
    L.r(10, 22, 12, 45, c.grisS); L.r(10, 22, 10, 45, c.grisL); L.r(7, 44, 15, 45, c.grisS);
    L.e(11, 12, 10.5, 10.5, c.rojo); L.e(11, 12, 8, 8, c.blanco); L.e(10, 11, 7.5, 7.5, (x, y) => ((x + y) % 7 === 0 ? c.mantel : c.blanco));
    L.e(11, 13, 3, 2, c.gris); L.p(14, 12, c.gris); L.p(15, 12, c.grisS); L.p(8, 12, c.gris); L.l(9, 11, 11, 9, c.grisL); L.p(13, 12, c.negro);
    for (let k = -1; k <= 1; k++) L.l(5 + k, 6, 17 + k, 18, c.rojo); L.l(4, 7, 9, 12, c.rojoL);
    L.e(11, 12, 10.5, 10.5, (x, y) => { const dd = Math.hypot(x - 11, y - 12); return dd > 8.2 ? (x + y < 21 ? c.rojoL : c.rojoS) : L.g[y * L.w + x] || c.blanco; });
    // la jaula dorada: bandeja, barrotes, cúpula y gancho
    L.r(30, 40, 52, 44, c.latonS); L.r(30, 40, 52, 40, c.latonL); L.r(32, 45, 50, 45, c.latonS);
    for (let x = 31; x <= 51; x += 3) { const top = 22 - Math.sqrt(Math.max(0, 100 - (x - 41) ** 2)) * 0.9; L.l(x, top, x, 39, x < 41 ? c.latonL : c.laton); }
    for (let k = 0; k <= 40; k++) { const x = 30 + k * 0.55; L.p(x, 22 - Math.sqrt(Math.max(0, 121 - (x - 41) ** 2)) * 0.9, c.laton); }
    L.r(30, 30, 52, 30, c.laton); L.e(41, 11, 1.6, 1.6, c.laton); L.p(41, 10, c.latonL);
    // la puerta abierta (girada hacia fuera) y el columpio que se mece
    L.r(52, 26, 52, 37, c.latonS); for (let k = 0; k <= 3; k++) L.l(53 + k * 1.6, 26 - k * 0.4, 53 + k * 1.6, 37 - k * 0.4, c.laton); L.l(53, 26, 58, 24.8, c.laton); L.l(53, 37, 58, 35.8, c.laton);
    const sw = Math.sin(t * 2) * 1.5; L.l(38, 20, 38 + sw, 30, c.latonS); L.l(44, 20, 44 + sw, 30, c.latonS); L.r(38 + sw, 31, 44 + sw, 31, c.maderaS);
    // el pájaro: posado en la puerta (f = 0) y luego volando arriba a la derecha
    const bx = 55 + f * 14 + Math.sin(f * 7) * 2 * f, by = 23 - f * 34 + Math.sin(t * 9) * f, aleteo = f > 0.02 ? Math.sin(t * 16) > 0 : false;
    const pajaro = { w: 9, h: 7, dibuja(B) { B.e(4, 4, 3, 2, c.amarillo); B.e(6.5, 2.6, 1.8, 1.8, c.amarillo); B.p(7, 2, c.negro); B.p(8.5, 3, c.naranja); B.p(9, 3, c.naranja);
      B.r(0, 4, 1, 4, c.azul); B.r(0, 5, 0, 5, c.azulS); B.l(5, 5, 4, 6, c.naranja);
      if (aleteo) { B.r(2, 0, 4, 1, c.azul); B.p(3, 2, c.azulS); } else { B.r(2, 4, 5, 5, c.azul); B.p(3, 6, c.azulS); } } };
    return { punto: [bx + 4, by + 3], despues: (q, spr) => { spr(pajaro, bx, by);
      if (f > 0.1) for (let k = 1; k <= 3; k++) { const ff = Math.max(0, f - k * 0.05); q(Math.round(55 + ff * 14 + 2), Math.round(26 - ff * 34 + 3), k === 1 ? c.grisL : c.mantelS); } } };
  } },
};
// un tigre de tigres() con su luz y su vida: lo pinta p_tigre (mismos argumentos, misma posición) y luego, solo donde
// ha pintado, le pone el FILO DE LUZ de la luna (o del sol) por el lomo; debajo, su sombra blanda en el suelo; los ojos
// con un halo verde cuando están abiertos; el vaho que echa por el hocico en la noche fría y, mientras anda, el polvo
// que levantan las patas. Devuelve el hocico, como p_tigre.
function a_tigreVivo(R, x, y, t, d, s, fase, paso, noche, osc) {
  const W = Math.ceil(62 * s), H = Math.ceil(30 * s), ox = Math.round(x - 31 * s * d), oy = Math.round(y - 27 * s);
  const X0 = ox - 1, Y0 = oy - 1, w = W + 2, hh = H + 2, antes = new Uint32Array(w * hh);
  for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) antes[j * w + i] = R.pget(X0 + i, Y0 + j) >>> 0;
  const nariz = p_tigre(R, x, y, t, d, s, fase, paso, noche, osc);
  const pinto = (i, j) => i >= 0 && j >= 0 && i < w && j < hh && (R.pget(X0 + i, Y0 + j) >>> 0) !== antes[j * w + i];
  let mx0 = 999, mx1 = -1, base = -1;
  const luz = noche ? hex('#c8d4ff') : hex('#fff0c0'), fuerza = (osc ? 0.3 : 0.5) * (noche ? 1 : 0.8);
  for (let i = 0; i < w; i++) { let j0 = -1; for (let j = 0; j < hh; j++) if (pinto(i, j)) { j0 = j; break; } if (j0 < 0) continue;
    mx0 = Math.min(mx0, i); mx1 = Math.max(mx1, i); for (let j = hh - 1; j >= 0; j--) if (pinto(i, j)) { base = Math.max(base, j); break; }
    // el filo de luz: el primer píxel de pelo bajo el contorno de arriba, y medio el siguiente
    if (pinto(i, j0 + 1)) R.pset(X0 + i, Y0 + j0 + 1, p_mez(R.pget(X0 + i, Y0 + j0 + 1), luz, fuerza));
    if (pinto(i, j0 + 2) && p_b4(X0 + i, Y0 + j0 + 2) < 0.5) R.pset(X0 + i, Y0 + j0 + 2, p_mez(R.pget(X0 + i, Y0 + j0 + 2), luz, fuerza * 0.4)); }
  if (mx1 < 0) return nariz;
  // la sombra en el suelo (solo fuera del tigre)
  const cx = X0 + (mx0 + mx1) / 2, rx = (mx1 - mx0) / 2 + 2, gy = Y0 + base, sc = noche ? hex('#0a0c22') : hex('#4a2410');
  for (let j = -1; j <= 2; j++) for (let i = Math.floor(-rx); i <= rx; i++) { const e = (i / rx) ** 2 + (j / 2.4) ** 2; if (e > 1) continue; const px = Math.round(cx + i), py = gy + j;
    if (pinto(px - X0, py - Y0)) continue; R.pset(px, py, p_mez(R.pget(px, py), sc, 0.45 * (1 - e * 0.6))); }
  const [nx, ny] = nariz;
  // el halo de los ojos (con el mismo parpadeo que p_tigre)
  if ((t + fase * 2) % 5.1 > 0.16) { const ex = nx - d * Math.round(4.8 * s), ey = ny - Math.round(2.4 * s);
    for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) { const dd = Math.hypot(i, j); if (dd < 0.5 || dd > 2.2) continue; R.pset(ex + i, ey + j, p_mez(R.pget(ex + i, ey + j), hex('#a8ff6a'), 0.3 * (1 - dd / 2.4))); } }
  // el vaho por el hocico, de noche
  if (noche) { const f = (t * 0.4 + fase * 0.3) % 1; if (f < 0.6) { const u = f / 0.6, vx = nx + d * (2 + u * 9 * s), vy = ny - u * 4 * s, r = 1 + u * 2.6 * s;
    for (let j = -3; j <= 3; j++) for (let i = -4; i <= 4; i++) { const dd = Math.hypot(i, j) / r; if (dd > 1) continue; const px = Math.round(vx + i), py = Math.round(vy + j); if (p_b4(px, py) > 0.65 - u * 0.3) continue;
      R.pset(px, py, p_mez(R.pget(px, py), hex('#c8d4f0'), 0.4 * (1 - u) * (1 - dd * 0.5))); } } }
  // el polvo que levantan las patas al andar
  if (paso) for (let q = 0; q < 6; q++) { const f = (t * 1.3 + q / 6 + fase) % 1, px = cx + d * rx * (q % 2 ? 0.55 : -0.45) - d * f * 10 * s, py = gy - f * 4 * s;
    R.pset(Math.round(px), Math.round(py), p_mez(R.pget(Math.round(px), Math.round(py)), noche ? hex('#9a90b8') : hex('#e8c890'), 0.5 * (1 - f))); }
  return nariz;
}

// una trucha de arena para truchas(), legible a 640 px: (sobre la arena, plana) un 30 % más grande que p_trucha, con un
// CONTORNO oscuro de 1 px, el cuerpo en ANILLOS (surcos oscuros que se mueven con el reptar), el lomo húmedo con su
// brillo que corre, la punta de delante más clara y, en el suelo, los granos que empuja y que saltan delante de ella.
// Con plana false (el guante, la pegada) va a su tamaño, de pie, sin granos. Mismos argumentos que p_trucha.
function a_trucha(R, cx, cy, L, A, a, t, k, perla, plana = true) {
  if (plana) { L *= 1.3; A *= 1.25; }
  const ap = plana ? 0.55 : 1, ca = Math.cos(a), sa = Math.sin(a), r = Math.ceil(L / 2 + 3), hl = L / 2, ha = A / 2, gl = ((t * 0.9 + h(k, 9)) % 1) * 2 - 1;
  const E = (i, j) => { const u = i * ca + j / ap * sa, v = -i * sa + j / ap * ca, an = ha * (1 - 0.25 * (u / hl)); return [(u / hl) ** 2 + (v / an) ** 2, u, v]; };
  const TR = [hex('#140c08'), hex('#2a1c14'), hex('#4a3424'), hex('#6e5038'), hex('#d4ac74'), hex('#9a6e50')];
  const fase = t * 3 + k;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    const px = Math.round(cx) + i, py = Math.round(cy) + j, [e, u, v] = E(i, j);
    if (e > 1) {
      if (E(i - 1, j)[0] <= 1 || E(i + 1, j)[0] <= 1 || E(i, j - 1)[0] <= 1 || E(i, j + 1)[0] <= 1) R.pset(px, py, TR[0]);
      else if (j > 0 && E(i, j - 2)[0] <= 1) R.pset(px, py, p_mez(R.pget(px, py), TR[0], 0.4));   // la sombra de debajo
      continue; }
    let c = e > 0.55 ? TR[1] : TR[2];
    if (E(i, j - 1)[0] > 1) c = TR[4]; else if (E(i, j - 2)[0] > 1) c = TR[3];         // el filo claro de arriba
    const an = ((u / hl + 1) * 3.2 + fase * 0.25) % 1;
    if (an < 0.2 && e < 0.85) c = TR[0];                                                 // los anillos
    else if (Math.abs(u / hl - gl) < 0.18 && v < 0.2 && e < 0.7) c = TR[4];              // el brillo húmedo que corre
    if (u / hl > 0.72 && e < 0.8) c = TR[5];                                             // la punta de delante
    R.pset(px, py, c);
  }
  if (plana) for (let q = 0; q < 3; q++) { const f = ((t * 2.2 + k * 0.37 + q / 3) % 1), d = hl + 1.5 + f * 3;
    const gx = cx + ca * d + (q - 1) * 1.4 * -sa, gy = cy + sa * d * ap - Math.sin(f * Math.PI) * 2.5; R.pset(Math.round(gx), Math.round(gy), f < 0.5 ? hex('#fff0c8') : hex('#e8c48a')); }
  if (perla) { const b = 0.55 + 0.45 * Math.sin(t * 3 + k * 1.3), px = Math.round(cx), py = Math.round(cy) - 1;
    for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) { const g = 1 - Math.hypot(i, j) / 3.4; if (g > 0 && g * b * 1.3 > p_b4(px + i, py + j) + 0.25) R.pset(px + i, py + j, p_LUZ[0]); }
    R.pset(px, py, p_LUZ[2]); R.pset(px + 1, py, p_LUZ[1]); R.pset(px, py + 1, p_LUZ[1]); }
}

// el detalle fijo de la boca de Jacurutu (encima de lo de c_jBocaFijo): la luna creciente y los cirros del ocaso, dos
// mesetas violetas en el horizonte, las grietas verticales del risco con su filo de luz, la arena acumulada en las
// repisas, el signo tallado sobre el dintel, matas secas al pie, un martillo de llamada viejo e inclinado clavado en la
// arena (x 262), las huellas que llegan a la entrada y piedrecitas por el llano. No toca la entrada, el muro ni el poste.
function a_bocaDetalle(R) {
  const { pset } = R, cielo = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && c_jBocaCielo[y * 320 + x] === 1;
  const hzL = (x) => 112 + Math.round(Math.sin(x * 0.045) * 4 + Math.sin(x * 0.13 + 1) * 1.5);
  // los cirros: vetas largas y finas, tramadas, más rosadas cerca del sol
  for (const [y0, xa, xb, k] of [[24, 176, 262, 1], [36, 150, 250, 2], [50, 200, 300, 3], [66, 150, 230, 4], [80, 260, 320, 5], [92, 196, 250, 6]]) {
    for (let x = xa; x <= xb; x++) { const f = (x - xa) / (xb - xa), gr = Math.sin(f * Math.PI) * (1.6 + h(k, 0, 70) * 1.2), yc = y0 + Math.sin(x * 0.05 + k) * 2.2;
      for (let y = Math.floor(yc - gr); y <= yc + gr; y++) { if (!cielo(x, y) || (x > 268 && y < 50)) continue; const e = Math.abs(y - yc) / Math.max(0.6, gr);
        if (c_jB4(x, y) < (1 - e) * 0.55 + (h(x >> 2, k, 71) - 0.5) * 0.3) pset(x, y, c_jMez(R.pget(x, y), y0 > 60 ? hex('#ffc890') : hex('#e88a8a'), 0.45)); } } }
  // la primera luna, un creciente pálido (x 192, y 24)
  for (let y = 17; y <= 31; y++) for (let x = 185; x <= 199; x++) { const d = Math.hypot(x - 192, y - 24), d2 = Math.hypot(x - 195, y - 22); if (d > 6 || !cielo(x, y)) continue;
    if (d2 < 5.2) { if (d > 5) pset(x, y, c_jMez(R.pget(x, y), hex('#f8e0d0'), 0.25)); continue; }
    pset(x, y, d > 5 ? hex('#d8b0b0') : (h(x, y, 72) > 0.8 ? hex('#e8c8c0') : hex('#fff0e4'))); }
  for (let y = 14; y <= 34; y++) for (let x = 182; x <= 202; x++) { const d = Math.hypot(x - 192, y - 24) / 10; if (d < 1 && d > 0.6 && cielo(x, y) && c_jB4(x, y) < (1 - d) * 0.6) pset(x, y, c_jMez(R.pget(x, y), hex('#f8d8d0'), 0.3)); }
  // dos mesetas lejanas en el horizonte (violetas, con el canto de arriba encendido); dejan de ser cielo
  const meseta = (xa, xb, top, k) => { for (let x = xa - 4; x <= xb + 4; x++) { const fuera = Math.max(0, xa - x, x - xb), tp = top + (fuera > 0 ? 2 + fuera * 2 : 0) + (h(x >> 1, 0, k) > 0.75 ? 1 : 0), hz = hzL(x);
    for (let y = Math.floor(tp); y < hz; y++) { if (x < 0 || x > 319 || !cielo(x, y)) continue;
      // la cara en sombra con columnas verticales; la pared de la derecha recibe el sol; el canto de arriba, encendido
      let v = 1.6 + (y - tp) * 0.05 + (y - tp < 1 ? 4.6 : y - tp < 2 ? 2 : 0) + ((x - xa) % 4 === 0 ? -0.6 : 0) + (x > xb - 3 ? 1.4 : 0) + (Math.abs(y - tp - 5) < 0.6 ? 0.8 : 0) + (h(x, y, k + 1) - 0.5) * 0.4;
      pset(x, y, c_jTono(c_jROCA_O, v, x, y)); c_jBocaCielo[y * 320 + x] = 2; } } };
  meseta(290, 312, 100, 73); meseta(208, 220, 104, 75);
  // las grietas verticales del risco, con el filo de luz a la derecha, y manchas de óxido que bajan de ellas
  for (const [gx, ga, gl, k] of [[14, 60, 60, 1], [30, 44, 30, 2], [52, 84, 46, 3], [64, 40, 28, 4], [128, 40, 32, 5], [184, 100, 34, 6], [196, 124, 18, 7]]) {
    let x = gx; for (let i = 0; i < gl; i++) { const y = ga + i; if (y >= 143 || y < c_jRisco(x) + 4) continue; pset(x, y, c_jROCA_O[0]); pset(x + 1, y, c_jROCA_O[6]); if (i % 3 === 0) pset(x - 1, y, c_jROCA_O[1]);
      if (h(i, k, 76) > 0.78) x += h(i, k, 77) > 0.5 ? 1 : -1; }
    for (let y = ga + gl; y < Math.min(142, ga + gl + 10); y++) if (c_jB4(gx, y) < 0.5) pset(gx, y, c_jMez(R.pget(gx, y), hex('#7a3a24'), 0.4)); }
  // la luz del ocaso que lame la ladera de la derecha del risco (cuanto más cerca del filo, más naranja)
  for (let y = 40; y < 142; y++) for (let x = 150; x < 206; x++) { if (y < c_jRisco(x)) continue; let k = 1; while (k <= 7 && y >= c_jRisco(x + k) && x + k < 206) k++; if (k > 7) continue;
    if (k <= 2) pset(x, y, c_jMez(R.pget(x, y), hex('#f0904a'), k === 1 ? 0.55 : 0.35)); else if (c_jB4(x, y) < (8 - k) / 10) pset(x, y, c_jMez(R.pget(x, y), hex('#c86040'), 0.3)); }
  // vetas minerales de ocre que bajan en diagonal por la roca
  for (const [vx, vy, n, k] of [[8, 50, 40, 1], [70, 46, 30, 2], [112, 70, 22, 3], [186, 112, 22, 4]]) for (let i = 0; i < n; i++) { const x = vx + Math.round(i * 0.4 + Math.sin(i * 0.3 + k) * 1.5), y = vy + i;
    if (y < c_jRisco(x) + 3 || y > 140 || (x > 72 && x < 122 && y > 88)) continue; if (h(i, k, 85) > 0.25) pset(x, y, c_jMez(R.pget(x, y), hex('#8a5030'), 0.45)); }
  // dos ventanucos tallados del sietch viejo (huecos oscuros con su dintel y su alféizar de luz) y la senda con pretil
  for (const [wx, wy, ww, wh] of [[40, 90, 8, 11], [16, 58, 6, 9]]) { for (let y = wy; y < wy + wh; y++) for (let x = wx; x < wx + ww; x++) pset(x, y, y < wy + 2 ? c_jROCA_O[1] : c_jROCA_O[0]);
    for (let x = wx - 2; x < wx + ww + 2; x++) { pset(x, wy - 1, c_jROCA_O[5]); pset(x, wy - 2, c_jROCA_O[3]); pset(x, wy + wh, c_jROCA_O[7]); pset(x, wy + wh + 1, c_jROCA_O[2]); }
    pset(wx + ww - 1, wy + wh - 2, c_jROCA_O[3]); }
  for (let x = 4; x <= 66; x++) { const y = Math.round(132 - (x - 4) * 0.5); pset(x, y, c_jROCA_O[7]); pset(x, y + 1, c_jROCA_O[4]); pset(x, y + 2, c_jROCA_O[1]); if (x % 6 < 4) { pset(x, y - 1, c_jROCA_O[5]); pset(x, y - 2, c_jROCA_O[3]); } }
  // la arena acumulada en las repisas de los estratos (montoncitos claros)
  for (let k = 0; k < 14; k++) { const x0 = 4 + Math.floor(h(k, 0, 78) * 196); if (x0 > 66 && x0 < 126) continue; if (x0 > 130 && x0 < 178) continue;
    const m = 1 + Math.floor(h(k, 1, 78) * 4), y = Math.round(30 - Math.sin(x0 * 0.04) * 6 + 26 * m); if (y < c_jRisco(x0) + 10 || y > 136) continue; const w = 4 + Math.floor(h(k, 2, 78) * 7);
    for (let i = -w; i <= w; i++) { const alto = Math.round((1 - Math.abs(i) / (w + 1)) * 2.4); for (let j = 0; j < alto; j++) pset(x0 + i, y - 1 - j, c_jTono(c_jARENA_O, 2.2 + j * 0.9 + (i > 0 ? 0.6 : 0) + (h(x0 + i, j, 79) - 0.5) * 0.6, x0 + i, y - 1 - j)); } }
  // el signo tallado sobre el dintel (un sol de anillo con cuatro rayos, gastado): surco oscuro y labio de luz
  for (let y = 74; y <= 90; y++) for (let x = 88; x <= 106; x++) { const d = Math.hypot(x - 97, y - 82), an = Math.atan2(y - 82, x - 97);
    const ray = d > 5.5 && d < 8 && Math.abs(Math.sin(an * 2)) < 0.22, ani = Math.abs(d - 3.6) < 0.7; if (!(ray || ani) || h(x, y, 80) > 0.86) continue;
    pset(x, y, c_jROCA_O[0]); if (y + 1 <= 91) pset(x, y + 1, c_jROCA_O[6]); }
  // el martillo de llamada viejo (x 262, clavado en la arena e inclinado): la vara, el cuerpo de muelles y el trapo
  for (let i = 0; i <= 22; i++) { const x = 262 + Math.round(i * 0.22), y = 150 - i; pset(x, y, hex('#3a2a28')); pset(x + 1, y, hex('#8a6a58')); }
  for (let y = 126; y <= 132; y++) for (let x = 264; x <= 270; x++) { const v = 2 + (x === 264 ? -1.2 : x === 270 ? -0.6 : x === 265 ? 1.2 : 0) + ((y - 126) % 3 === 0 ? -1 : 0); pset(x, y, c_jTono(c_jhx(['#1a1214', '#3a2c2a', '#6a5448', '#9a826c', '#c8ae90']), v, x, y)); }
  pset(267, 125, hex('#c8ae90')); pset(266, 125, hex('#6a5448'));
  for (let x = 256; x <= 270; x++) pset(x, 151, c_jMez(R.pget(x, 151), hex('#3a1e18'), 0.45));
  for (let i = 0; i < 5; i++) { pset(259 - i, 149 - (i & 1), c_jTono(c_jARENA_O, 6, 259 - i, 149)); }
  // las huellas que llegan del llano a la entrada (hoyuelos con su sombra), y piedrecitas por la arena
  for (let s = 0; s < 34; s++) { const u = s / 33, x = Math.round(310 - u * 196 + Math.sin(u * 5) * 6 + (s & 1) * 2), y = Math.round(176 - u * 25 + Math.sin(u * 3) * 2 + ((s & 1) ? 1 : -1));
    if (x > 120 && x < 200 && y < 152) continue; pset(x, y, c_jTono(c_jARENA_O, 2.4, x, y)); pset(x + 1, y, c_jTono(c_jARENA_O, 3.2, x + 1, y)); pset(x, y + 1, c_jTono(c_jARENA_O, 7, x, y + 1)); }
  for (let k = 0; k < 40; k++) { const x = Math.round(206 + h(k, 0, 81) * 112), y = Math.round(126 + h(k, 1, 81) * 52); if (y < 152 && x < 230) continue; if (h(k, 2, 81) > 0.5) { pset(x, y, c_jARENA_O[1]); pset(x + 1, y, c_jARENA_O[3]); pset(x, y - 1, c_jARENA_O[6]); } else pset(x, y, c_jARENA_O[2]); }
  // matas secas al pie del risco (ramitas grises y doradas)
  for (const [mx, my, k] of [[26, 146, 1], [58, 147, 2], [204, 152, 3], [240, 154, 4], [300, 132, 5]]) for (let r = 0; r < 7; r++) { const an = -Math.PI / 2 + (r - 3) * 0.32 + (h(r, k, 82) - 0.5) * 0.3, l = 4 + h(r, k, 83) * 4;
    for (let q = 0; q <= l; q++) pset(Math.round(mx + Math.cos(an) * q), Math.round(my + Math.sin(an) * q), q > l - 2 ? hex('#d8a860') : hex('#6a4a2e')); }
}

// la pared del trance de cerca, tallada en HILADAS (como sillares sacados de la roca): juntas horizontales onduladas con
// su labio de luz, juntas verticales al tresbolillo, bloques un poco más claros o más oscuros, manchas de humedad
// vieja que bajan y una PILASTRA tallada entre el arco y el lecho (x 80–96) con capitel y basa. La esquina de Atom, lisa.
function a_cercaPared(R) {
  const { pset } = R, calma = (x, y) => x > 262 && y < 54;
  for (let y = 26; y < 168; y++) for (let x = 0; x < 320; x++) { if (calma(x, y)) continue;
    const yy = y - 26 + Math.sin(x * 0.03) * 2, fila = Math.floor(yy / 19), gy = yy - fila * 19, bx = (x + fila * 23) % 46;
    let d = 0; if (gy < 1) d = -1.3; else if (gy < 2) d = 0.7; else if (bx < 1 && gy > 2) d = -1; else if (bx < 2 && gy > 2) d = 0.5;
    d += (h(Math.floor((x + fila * 23) / 46), fila, 90) - 0.5) * 0.7;   // cada bloque, su tono
    if (d === 0) continue; const c = R.pget(x, y); let i = c_jROCA.indexOf(c); if (i < 0) continue; i = Math.round(Math.max(0, Math.min(8, i + d + (c_jB4(x, y) - 0.5) * 0.6)));
    pset(x, y, c_jROCA[i]); }
  // las manchas de humedad vieja (más oscuras, bajan en lenguas desde una junta)
  for (const [mx, my, n, k] of [[118, 46, 40, 1], [150, 26, 30, 2], [236, 108, 46, 3], [300, 60, 60, 4]]) for (let i = 0; i < n; i++) { const w = Math.max(1, Math.round((1 - i / n) * 4 + Math.sin(i * 0.4 + k))); for (let j = -w; j <= w; j++) { const x = mx + j + Math.round(Math.sin(i * 0.15 + k) * 2), y = my + i; if (c_jB4(x, y) < 0.6 - i / n * 0.4) c_jMezP(R, x, y, hex('#0a080c'), 0.3); } }
  // la pilastra tallada (x 80–96, de la bóveda al suelo)
  for (let y = 22; y < 168; y++) for (let x = 78; x <= 98; x++) {
    const cap = y < 34, basa = y > 156, w0 = cap || basa ? 78 : 81, w1 = cap || basa ? 98 : 95; if (x < w0 || x > w1) continue;
    let v = 3.6 + c_jTex(x, y, 91) * 0.4 + (x === w0 ? -1.6 : x === w0 + 1 ? 1.2 : x === w1 ? -1.8 : x === w1 - 1 ? -0.8 : 0) + ((x - 81) % 5 === 0 && !cap && !basa ? -0.7 : 0);
    if (y === 34 || y === 156 || y === 28 || y === 162) v -= 1.4; if (y === 35 || y === 157 || y === 29 || y === 163) v += 1; if (y === 22) v += 1.4;
    if (h(x >> 1, y >> 1, 92) > 0.9) v -= 1; pset(x, y, c_jTono(c_jROCA, v, x, y)); }
}

// los objetos del trance de cerca, encima de la pared: una cuerda enrollada y una sarta de anillos de agua colgados de
// dos clavijas (x 206–238, y 30–80), un candil de barro en un nichito (x 296–310, y 118–136; su llama la anima
// c_jCerca), una esterilla enrollada en el suelo de la derecha, arena acumulada y piedrecitas.
function a_cercaObjetos(R) {
  const { pset } = R, K = hex('#0e0a0e');
  // las clavijas de madera
  for (const [cx, cy] of [[210, 32], [234, 34]]) { pset(cx, cy, hex('#6a4a30')); pset(cx + 1, cy, hex('#9a7048')); pset(cx, cy + 1, hex('#3a2418')); pset(cx + 1, cy + 1, hex('#5a3a24')); }
  // la sarta de anillos de agua (aros de metal mate, uno con brillo)
  for (let i = 0; i < 9; i++) { const y = 35 + i * 4.4, x = 210 + Math.sin(i * 0.5) * 1.2; pset(Math.round(x), Math.round(y) - 1, hex('#3a2c24'));
    R.disco(x, y + 1, 1.8, i % 3 === 1 ? hex('#a89070') : hex('#6a5a4a')); pset(Math.round(x), Math.round(y + 1), K); if (i % 3 === 1) pset(Math.round(x - 1), Math.round(y), hex('#e8d0a0')); }
  // la cuerda enrollada (lazos de fibra trenzada) que cuelga de la otra clavija
  for (let l = 0; l < 4; l++) for (let a = 0; a < 64; a++) { const an = a / 64 * Math.PI * 2, x = 235 + Math.cos(an) * (5 - l * 0.5), y = 52 + l * 1.5 + Math.sin(an) * (16 - l), tr = (a + l * 3) % 4 < 2;
    pset(Math.round(x), Math.round(y), Math.sin(an) < -0.2 ? hex('#4a3220') : tr ? hex('#a07a4a') : hex('#7a5834')); }
  for (let i = 0; i < 10; i++) pset(236 + (i > 6 ? 1 : 0), 68 + i, i % 2 ? hex('#7a5834') : hex('#a07a4a'));
  // el nichito del candil (arco pequeño, con la pared de dentro tiznada de humo)
  for (let y = 116; y <= 136; y++) for (let x = 294; x <= 312; x++) { const dA = y < 124 ? Math.hypot(x - 303, (y - 124) * 1.1) : Math.abs(x - 303); if (dA > 9) continue;
    pset(x, y, dA > 8 ? c_jROCA[6] : c_jTono(c_jROCA, 0.6 + (y - 116) / 20 + (dA > 6 ? 0.8 : 0), x, y)); }
  for (let x = 292; x <= 314; x++) { pset(x, 137, c_jROCA[7]); pset(x, 138, c_jROCA[3]); }
  for (let j = 0; j < 4; j++) for (let i = -5 + j; i <= 5 - j; i++) pset(303 + i, 136 - j, c_jTono(c_jhx(['#2a1a12', '#5a3a26', '#8a5c3a', '#b07a50']), 1.4 + j * 0.5 + (i < 0 ? 0.6 : 0), 303 + i, 136 - j));
  pset(308, 133, hex('#5a3a26')); pset(309, 132, hex('#8a5c3a'));
  // la esterilla enrollada (rayas) en el suelo de la derecha
  for (let y = 168; y <= 176; y++) for (let x = 254; x <= 290; x++) { const e = (y - 172) / 4.5; if (Math.abs(e) > 1) continue; const raya = Math.floor((x - 254) / 4) % 3;
    pset(x, y, x === 254 || x === 290 ? hex('#3a2418') : c_jTono(raya === 1 ? c_jTELA2 : c_jTELA, 2.6 - (e + 1) * 0.9 + (h(x, y, 93) - 0.5) * 0.5, x, y)); }
  for (let j = -4; j <= 4; j++) for (let i = -2; i <= 2; i++) { const r = Math.hypot(i / 2.2, j / 4.5); if (r <= 1) pset(254 + i, 172 + j, r > 0.6 ? hex('#5a3a26') : hex('#8a5c3a')); }
  // arena acumulada contra la pared y piedrecitas por el suelo
  for (let x = 0; x < 320; x++) { if (x > 102 && x < 244) continue; const alto = Math.max(0, Math.round(2 + Math.sin(x * 0.11) * 1.5 + Math.sin(x * 0.37) * 0.8)); for (let j = 0; j < alto; j++) pset(x, 167 - j, c_jTono(c_jARENA, 2.6 + j * 0.6 + (h(x, j, 94) - 0.5) * 0.6, x, 167 - j)); }
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 0, 95) * 320), y = Math.round(170 + h(k, 1, 95) * 9); if (x > 104 && x < 244 && y < 171) continue; pset(x, y, c_jROCA[1]); pset(x + 1, y, c_jROCA[3]); pset(x, y - 1, c_jROCA[6]); }
}

// oscurece (o tiñe) un píxel con trama: solo en los píxeles pares del damero si par, para que no quede liso
function b_tinte(R, x, y, col, a, par = false) { x = Math.round(x); y = Math.round(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; if (par && ((x + y) & 1)) return; R.pset(x, y, d2_mezcla(R.pget(x, y), col, a)); }

// una grieta en la piedra: un trazo quebrado oscuro con el labio de abajo encendido; (x, y) el arranque, n pasos, sem
function b_grieta(R, x, y, n, sem, osc, luz, dir = 1) {
  for (let i = 0; i < n; i++) { const dx = dir, dy = h(i, sem, 201) < 0.45 ? 1 : h(i, sem, 202) < 0.2 ? -1 : 0; x += dx; y += dy;
    R.pset(x, y, osc); if (h(i, sem, 203) > 0.4) R.pset(x, y + 1, luz);
    if (h(i, sem, 204) > 0.93) { let bx = x, by = y; for (let j = 0; j < 4; j++) { bx += dir; by += 1; R.pset(bx, by, osc); } } }
}

// una polilla que revolotea alrededor de una luz (cx, cy), a r px, con su fase
function b_polilla(R, cx, cy, r, t, f, col) {
  const a = t * (1.9 + f * 0.3) + f * 2.1, x = Math.round(cx + Math.cos(a) * r + Math.sin(t * 7 + f) * 2), y = Math.round(cy + Math.sin(a * 1.3) * r * 0.6 + Math.sin(t * 11 + f) * 1.5);
  R.pset(x, y, col); if (Math.sin(t * 30 + f * 5) > 0) { R.pset(x - 1, y - 1, col); R.pset(x + 1, y - 1, col); } else { R.pset(x - 1, y, col); R.pset(x + 1, y, col); }
}

// un relieve del anillo del gusano tallado en la roca (rehundido, con el canto de arriba en sombra y el de abajo con luz)
function b_relieveAnillo(R, cx, cy, r, cols) {
  R.disco(cx, cy, r + 3, (x, y, d) => d > 0.93 ? cols[0] : d > 0.82 && y < cy ? cols[1] : d > 0.82 ? cols[3] : d2_tono(cols, 1.2 + (h(x, y, 205) - 0.5) * 0.6, x, y));
  d2_anillo(R, cx, cy, r, [cols[1], cols[2], cols[3]]);
}

// AUDIENCIA · la pared (antes del ventanal, la columna y el anillo, que se pintan encima): desconchones, marcas de
// cantero, grietas, manchas de humedad junto al suelo y las cabezas de las vigas del techo (fuera de la barra del año)
function b_audienciaPared(R) {
  const { pset, rect } = R, PIE = 128;
  for (let row = 2; row < 12; row++) for (let col = -1; col < 14; col++) {
    const off = (row & 1) * 13, x0 = col * 26 - off, y0 = row * 10, k = h(col, row, 210);
    if (x0 > 262 && y0 < 50) continue;
    if (k > 0.72) { const cx = k > 0.86 ? x0 + 1 : x0 + 22, cy = y0 + (k > 0.8 ? 1 : 6);   // un desconchón en una esquina
      for (let j = 0; j < 3; j++) for (let i = 0; i < 3 - j; i++) pset(cx + (cx > x0 + 10 ? 2 - i : i), cy + j, j === 0 && i === 0 ? D2.r1 : D2.r2); pset(cx + 1, cy + 1, D2.r4); }
    if (h(col, row, 211) > 0.9) { const mx = x0 + 11, my = y0 + 3;   // la marca del cantero: un triángulo, una cruz o un aro
      const m = Math.floor(h(col, row, 212) * 3);
      if (m === 0) { pset(mx, my, D2.r1); pset(mx - 1, my + 2, D2.r1); pset(mx + 1, my + 2, D2.r1); pset(mx, my + 2, D2.r1); pset(mx - 1, my + 1, D2.r1); pset(mx + 1, my + 1, D2.r1); }
      else if (m === 1) { pset(mx, my, D2.r1); pset(mx, my + 1, D2.r1); pset(mx, my + 2, D2.r1); pset(mx - 1, my + 1, D2.r1); pset(mx + 1, my + 1, D2.r1); }
      else { pset(mx, my, D2.r1); pset(mx - 1, my + 1, D2.r1); pset(mx + 1, my + 1, D2.r1); pset(mx, my + 2, D2.r1); }
      pset(mx + 1, my + 3, D2.r4); }
  }
  // las grietas y la humedad que sube del suelo
  b_grieta(R, 100, 40, 18, 1, D2.r0, D2.r4); b_grieta(R, 134, 84, 12, 2, D2.r0, D2.r4, -1); b_grieta(R, 12, 60, 14, 3, D2.r0, D2.r4); b_grieta(R, 200, 112, 16, 4, D2.r0, D2.r4);
  for (let y = 96; y < PIE - 4; y++) for (let x = 0; x < 320; x++) { const n = d2_ruido(x * 0.08, y * 0.2, 213) - (PIE - 4 - y) / 40; if (n > 0.32 && ((x + y) & 1)) b_tinte(R, x, y, D2.r0, 0.22); }
  // las cabezas de las vigas del techo, en la penumbra de arriba (solo a la derecha de la barra del año)
  for (let x = 184; x < 268; x += 21) { rect(x, 5, x + 6, 15, D2.k); rect(x + 1, 6, x + 5, 14, D2.madS); rect(x + 1, 6, x + 1, 14, D2.mad); rect(x + 1, 14, x + 5, 14, D2.mad); pset(x + 3, 10, D2.bronS);
    for (let j = 16; j < 22; j++) b_tinte(R, x + 7, j, D2.r0, 0.3); }
}

// AUDIENCIA · por encima del fondo fijo: el banco de piedra con su cojín y el pebetero bajo el estandarte, el reflejo de
// la columna y del ventanal en el mármol, las incrustaciones de bronce en los cruces de las losas y unos pétalos
function b_audienciaFijo(R) {
  const { rect, pset, linea } = R, FX = 110, FY = 70, PIE = 128;
  // el reflejo del ventanal (cielo claro) y el de la columna (una franja más oscura que tiembla) en el suelo pulido
  for (let y = 129; y < 147; y++) for (let x = 38; x <= 88; x++) { const a = (1 - (y - 129) / 18) * 0.28; if (x === 63) continue; b_tinte(R, x + Math.round(Math.sin(y * 0.9) * 0.6), y, D2.v1, a, true); }
  for (let y = 140; y < 180; y++) { if (y >= 148 && y <= 166) continue; const a = 0.3 * (1 - (y - 140) / 42), w = Math.round(Math.sin(y * 0.7) * 0.7); for (let x = 152; x <= 174; x++) b_tinte(R, x + w, y, x < 158 ? D2.r3 : D2.r1, a, true); }
  // las incrustaciones de bronce donde se cruzan las juntas
  for (let iv = 6; iv <= 9; iv++) { const s = 1 / (iv * 0.1), y = Math.round(FY + s * (PIE - FY)); if (y > 178) continue;
    for (let iu = -8; iu <= 10; iu++) { const x = Math.round(FX + iu * 22 * s); if (x < 1 || x > 318) continue; if (y >= 147 && y <= 167 && x < 188) continue; if (x >= 178 && y < 152) continue;
      const r = s > 1.5 ? 2 : 1; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (Math.abs(i) + Math.abs(j) <= r) pset(x + i, y + j, Math.abs(i) + Math.abs(j) === r ? D2.bronS : D2.bron); pset(x - (r > 1 ? 1 : 0), y - 1, D2.bronL); } }
  // unos pétalos morados y blancos caídos delante del estrado y un desgaste en el paso de la alfombra
  for (let k = 0; k < 14; k++) { const x = Math.round(190 + h(k, 1, 214) * 124), y = Math.round(154 + h(k, 2, 214) * 24); pset(x, y, k % 3 ? D2.morL : D2.m4); if (k % 2) pset(x + 1, y, k % 3 ? D2.mor : D2.m3); }
  for (let y = 167; y < 180; y++) for (let x = 60; x < 186; x++) if (d2_ruido(x * 0.1, y * 0.3, 215) > 0.62 && ((x + y) & 1)) b_tinte(R, x, y, D2.m1, 0.25);
  // el banco de piedra contra la pared: su sombra, la losa del asiento, dos patas y el hueco en sombra
  for (let y = 110; y < 128; y++) for (let x = 99; x < 150; x++) b_tinte(R, x, y, D2.r0, 0.28, true);
  for (let x = 96; x <= 147; x++) for (let y = 114; y <= 118; y++) pset(x, y, x === 96 || x === 147 || y === 118 ? D2.r1 : y === 114 ? D2.r5 : d2_tono(D2_PIEDRA, 3.7 + (h(x, y, 216) - 0.5) * 0.6 - (y - 114) * 0.25, x, y));
  for (let y = 119; y <= 130; y++) for (let x = 98; x <= 146; x++) b_tinte(R, x, y, D2.r0, 0.55);
  for (const lx of [99, 139]) { for (let y = 119; y <= 130; y++) for (let x = lx; x <= lx + 6; x++) pset(x, y, x === lx ? D2.r4 : x === lx + 6 ? D2.r1 : y === 130 ? D2.r2 : d2_tono(D2_PIEDRA, 3.1 + (h(x, y, 217) - 0.5) * 0.5, x, y));
    rect(lx + 1, 122, lx + 5, 122, D2.r2); pset(lx + 3, 125, D2.r2); }
  rect(97, 131, 148, 131, D2.m0);
  // el cojín verde con su cordón de oro y sus borlas
  for (let x = 102; x <= 124; x++) for (let y = 109; y <= 113; y++) { const e = Math.abs(x - 113) / 11.5; if (y === 109 && e > 0.85) continue; pset(x, y, y === 113 ? D2.alfS : y === 109 ? D2.alfL : e > 0.92 ? D2.alfS : d2_tono([D2.alfS, D2.alf, D2.alfL], 1.6 - (y - 109) * 0.3 + (x < 108 ? 0.4 : 0), x, y)); }
  linea(103, 111, 123, 111, D2.oroS); pset(113, 111, D2.oroL); pset(102, 114, D2.oro); pset(102, 115, D2.oroS); pset(124, 114, D2.oro); pset(124, 115, D2.oroS);
  // el pebetero de bronce en el asiento (el humo, en cada fotograma) y un rollo
  rect(129, 110, 137, 113, D2.k); rect(130, 110, 136, 112, D2.bron); rect(130, 110, 136, 110, D2.bronL); rect(132, 113, 134, 113, D2.bronS); for (let i = 130; i < 137; i += 2) pset(i, 109, D2.fuego);
  rect(140, 110, 146, 113, D2.papelS); rect(140, 110, 146, 110, D2.papel); pset(139, 111, D2.madS); pset(147, 111, D2.madS); rect(143, 110, 143, 113, D2.capa);
}

// AUDIENCIA · la vida: el humo del pebetero, las sombras de los pájaros que cruzan la mancha de sol del suelo y una
// lagartija que sube por la pared a carreritas entre el ventanal y el estandarte
function b_audienciaVida(R, t) {
  d2_humo(R, 133, 108, t, 8, 28, 0.5);
  for (let k = 0; k < 2; k++) { const per = 7, f = ((t + k * 3.1) % per) / 1.6; if (f > 1) continue;
    const x = lerp(96, 184, f) + k * 6, y = lerp(150, 166, f) + Math.sin(f * 9 + k) * 2, a = Math.sin(t * 16 + k) > 0 ? 1 : 0;
    for (const [i, j] of [[0, 0], [-1, -a], [1, -a], [-2, -1 + a], [2, -1 + a], [-3, -1], [3, -1]]) b_tinte(R, x + i, y + j, D2.m0, 0.35); }
  { const per = 13, f = (t % per) / per, paso = Math.floor(f * 6), g = f * 6 - paso, sube = Math.min(1, g * 3), y = Math.round(104 - (paso + sube) * 11), x = 101 + Math.round(Math.sin(paso * 2.1) * 3);
    const c = hex('#7a8a52'), cs = hex('#4a5636'), cola = Math.round(Math.sin(t * 6) * (sube < 1 ? 1 : 0.3));
    if (y > 34) { R.pset(x, y, cs); R.pset(x, y + 1, c); R.pset(x, y + 2, c); R.pset(x, y + 3, c); R.pset(x, y - 1, c); R.pset(x, y - 2, cs);
      R.pset(x - 1, y, cs); R.pset(x + 1, y + (paso & 1), cs); R.pset(x - 1, y + 3 - (paso & 1), cs); R.pset(x + 1, y + 3, cs);
      R.pset(x + cola, y + 4, cs); R.pset(x + cola * 2, y + 5, cs); R.pset(x + cola * 2 + 1, y + 6, cs); R.pset(x - 1, y - 2, D2.k); } }
}

// DIARIO · la roca (antes de la luz del farol, que la tiñe): grietas y vetas, el anillo del gusano tallado en lo alto
// de la derecha, un cofre con flejes bajo los estantes, el candil colgado de su cadena (la llama, en cada fotograma), el
// corro de velas a los pies del panal, el borde gastado de cada losa y los flecos y el medallón de la alfombra
function b_diarioFijo(R) {
  const { rect, pset, linea } = R;
  // vetas claras y grietas por la roca que se ve
  for (const [x, y, n, s, d] of [[150, 30, 26, 5, 1], [186, 40, 14, 6, -1], [196, 10, 30, 7, 1], [272, 60, 10, 8, 1], [150, 118, 30, 9, -1], [274, 100, 8, 10, 1], [30, 8, 40, 11, 1]]) b_grieta(R, x, y, n, s, D2.q0, D2.q4, d);
  for (let y = 0; y < 130; y++) for (let x = 0; x < 320; x++) { const v = d2_ruido(x * 0.02, y * 0.25 + Math.sin(x * 0.03) * 2, 220); if (Math.abs(v - 0.5) < 0.012) b_tinte(R, x, y, D2.q4, 0.35); }
  // el anillo del gusano tallado en la roca
  b_relieveAnillo(R, 226, 30, 10, [D2.q0, D2.q1, D2.q3, D2.q5]);
  // el cofre con flejes de bronce bajo el nicho de la izquierda
  rect(4, 116, 36, 130, D2.k); for (let x = 5; x < 36; x++) for (let y = 117; y < 130; y++) pset(x, y, y === 117 ? D2.madL : y === 121 ? D2.madS : d2_tono([D2.madS, D2.mad, D2.madL], 1.2 + (h(x >> 2, y, 221) - 0.5) * 0.8 - (x > 30 ? 0.6 : 0), x, y));
  for (const fx of [9, 31]) rect(fx, 117, fx + 1, 129, D2.bron); rect(18, 122, 22, 126, D2.bronS); rect(19, 123, 21, 124, D2.bronL);
  // el candil colgado del techo, con su cadena
  for (let y = 9; y < 36; y += 2) { pset(264, y, D2.bronS); pset(264, y + 1, D2.bron); }
  rect(260, 36, 268, 37, D2.bronL); rect(259, 38, 269, 41, D2.k); rect(260, 38, 268, 40, D2.bron); rect(260, 38, 268, 38, D2.bronL); rect(263, 42, 265, 43, D2.bronS);
  // el corro de velas a los pies del panal: cabos de alturas distintas con su cera derretida
  for (const [x, a] of [[286, 7], [290, 4], [294, 9], [298, 5], [302, 8], [306, 3], [310, 6]]) { rect(x - 1, 140 - a, x + 1, 140, D2.papel); rect(x + 1, 140 - a, x + 1, 140, D2.papelS); pset(x, 140 - a - 1, D2.k); pset(x - 1, 141, D2.papelS); pset(x + 2, 141, D2.papel); }
  rect(283, 141, 313, 142, D2.papelS);
  // el borde gastado de cada losa (más claro arriba) y unas esquirlas de cristal en el suelo
  const filas = [134, 139, 145, 152, 160, 169];
  for (let f = 0; f < filas.length; f++) { const y = filas[f] + 1; for (let x = 0; x < 320; x++) if (h(x >> 2, f, 222) > 0.35 && R.pget(x, y) !== D2.q1) b_tinte(R, x, y, D2.q5, 0.35); }
  for (let k = 0; k < 9; k++) { const x = Math.round(150 + h(k, 1, 223) * 160), y = Math.round(140 + h(k, 2, 223) * 36); pset(x, y, D2.cr1); pset(x + 1, y, D2.cr0); }
  // los flecos de la alfombra a los lados y el medallón del centro (un óvalo de oro con el anillo)
  for (let y = 151; y < 176; y += 2) { const u = (y - 150) / 26, xl = Math.round(160 - u * 14), xr = Math.round(300 + u * 16); pset(xl - 1, y, D2.papelS); pset(xl - 2, y, D2.papel); pset(xr + 1, y, D2.papelS); pset(xr + 2, y, D2.papel); }
  for (let y = 154; y <= 172; y++) for (let x = 196; x <= 266; x++) { const e = ((x - 231) / 34) ** 2 + ((y - 163) / 9) ** 2; if (e > 0.78 && e <= 1) pset(x, y, e > 0.9 ? D2.oroS : D2.oro); else if (e < 0.25) pset(x, y, ((x + y) & 1) ? D2.morL : D2.mor); }
}

// DIARIO · la vida: la llama del candil y su halo, las velas que titilan y dos polillas alrededor del farol
function b_diarioVida(R, t) {
  d2_llama(R, 264, 38, t, 0.6, 3.1);
  for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const d = i * i + j * j; if (d < 100 && d > 12 && ((i + j) & 1)) d2_aclara(R, 264 + i, 38 + j, (1 - d / 100) * 0.12 * (0.8 + 0.2 * Math.sin(t * 11)), D2.fuegoL); }
  [[286, 7], [290, 4], [294, 9], [298, 5], [302, 8], [306, 3], [310, 6]].forEach(([x, a], i) => { const y = 140 - a - 2, s = Math.sin(t * 9 + i * 2.3) + Math.sin(t * 14 + i); R.pset(x, y, D2.fuegoB); R.pset(x, y - 1, s > -0.5 ? D2.fuegoL : D2.fuego); if (s > 0.6) R.pset(x + (i & 1 ? 1 : -1), y - 2, D2.fuego);
    for (let j = -4; j <= 2; j++) for (let k = -3; k <= 3; k++) if ((k + j) & 1) d2_aclara(R, x + k, y + j, 0.08, D2.fuegoL); });
  b_polilla(R, 172, 34, 16, t, 0, D2.papel); b_polilla(R, 172, 36, 22, t, 1.7, D2.papelS);
}

// VENTANA · la roca de la sala (antes del haz de luna y de la penumbra): dos pilastras talladas a los lados del ventanal,
// el anillo tallado en lo alto de la derecha, grietas y vetas, el canto gastado de las losas y el dibujo de la alfombra
function b_ventanaFijo(R) {
  const { rect, pset } = R;
  for (const [x, y, n, s, d] of [[210, 54, 30, 12, 1], [276, 50, 30, 13, 1], [0, 20, 6, 14, 1], [212, 100, 16, 15, 1], [60, 6, 10, 16, 1]]) b_grieta(R, x, y, n, s, D2.q0, D2.q4, d);
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const v = d2_ruido(x * 0.02, y * 0.25 + Math.sin(x * 0.03) * 2, 224); if (Math.abs(v - 0.5) < 0.012) b_tinte(R, x, y, D2.q4, 0.35); }
  // las pilastras: fuste con estrías, basa y capitel de roca
  for (const px of [58, 204]) { for (let y = 16; y < 128; y++) for (let x = px; x <= px + 8; x++) { const u = (x - px) / 8; let v = 1.6 + Math.sin(u * Math.PI) * 1.8 - u * 0.4 + (h(x, y, 225) - 0.5) * 0.3; if ((x - px) % 3 === 1) v -= 0.7; pset(x, y, x === px || x === px + 8 ? D2.q1 : d2_tono(D2_ROCA, v, x, y)); }
    rect(px - 2, 12, px + 10, 16, D2.q3); rect(px - 2, 12, px + 10, 12, D2.q5); rect(px - 1, 16, px + 9, 17, D2.q1);
    rect(px - 2, 126, px + 10, 131, D2.q3); rect(px - 2, 126, px + 10, 126, D2.q4); rect(px - 2, 131, px + 10, 131, D2.q1); }
  b_relieveAnillo(R, 244, 28, 10, [D2.q0, D2.q1, D2.q3, D2.q5]);
  // el canto gastado de las losas
  const filas = [132, 138, 145, 153, 162, 172];
  for (let f = 0; f < filas.length; f++) { const y = filas[f] + 1; for (let x = 0; x < 320; x++) if (h(x >> 2, f, 226) > 0.35 && R.pget(x, y) !== D2.q1) b_tinte(R, x, y, D2.q5, 0.35); }
  // la alfombra: una orla interior, el medallón con el anillo y los flecos de los extremos
  for (let y = 146; y < 176; y++) for (let x = 60; x < 220; x++) { const e = ((x - 140) / 78) ** 2 + ((y - 161) / 14) ** 2, m = ((x - 140) / 24) ** 2 + ((y - 161) / 5.5) ** 2;
    if (e > 0.5 && e < 0.56) pset(x, y, D2.oroS); else if (m > 0.7 && m <= 1) pset(x, y, m > 0.88 ? D2.oroS : D2.oro); else if (m < 0.35 && ((x + y) & 1)) pset(x, y, D2.morL);
    else if (e < 0.5 && m > 1 && Math.abs(((Math.atan2((y - 161) * 5.6, x - 140) + 7) % 0.7) - 0.35) < 0.05) pset(x, y, D2.morS); }
  for (let y = 154; y <= 168; y += 2) { const dx = Math.round(78 * Math.sqrt(Math.max(0, 1 - ((y - 161) / 14) ** 2))); pset(140 - dx - 1, y, D2.papelS); pset(140 - dx - 2, y, D2.papel); pset(140 + dx + 1, y, D2.papelS); pset(140 + dx + 2, y, D2.papel); }
}

// VENTANA · las cortinas de terciopelo morado a los lados del ventanal, con su barra, recogidas con un cordón de oro;
// la brisa de la noche las mece por abajo (en cada fotograma; la luz de la luna en la izquierda, la del aplique en la otra)
function b_ventanaCortinas(R, t) {
  const { rect, pset } = R;
  rect(52, 15, 218, 16, D2.k); rect(53, 15, 217, 15, d2_luz(D2.bron, 0.6)); for (const x of [51, 219]) { rect(x - 1, 14, x + 1, 17, d2_luz(D2.bronL, 0.6)); }
  for (const [cx, lado, f] of [[63, -1, 0.75], [209, 1, 0.55]]) {
    for (let y = 17; y < 130; y++) {
      const w = y < 74 ? 7 - (y - 17) / 57 * 4 : 3 + Math.min(1, (y - 74) / 30) * 5, bri = y > 76 ? Math.sin(t * 1.3 + y * 0.06 + cx) * (y - 76) / 54 * 1.6 : 0, x0 = Math.round(cx - w + bri), x1 = Math.round(cx + w + bri);
      for (let x = x0; x <= x1; x++) { const u = (x - x0) / Math.max(1, x1 - x0), pl = Math.sin(u * Math.PI * 3 + (y < 74 ? 0 : y * 0.02)); let c = pl > 0.55 ? D2.morL : pl < -0.55 ? D2.morS : D2.mor; if (x === x0 || x === x1) c = D2.morS;
        if (y === 129) c = (x & 1) ? D2.oro : D2.oroS; pset(x, y, d2_luz(c, lado < 0 && u < 0.4 ? f + 0.15 : f)); } }
    // el cordón y la borla
    rect(cx - 4, 73, cx + 4, 75, d2_luz(D2.oroS, 0.8)); rect(cx - 3, 74, cx + 3, 74, d2_luz(D2.oro, 0.8)); const bx = cx + lado * 5; rect(bx, 75, bx, 80, d2_luz(D2.oro, 0.8)); rect(bx - 1, 81, bx + 1, 83, d2_luz(D2.oroS, 0.8));
  }
}

// VENTANA · la vida: las cortinas, un gato en el alféizar (silueta contra la noche, mueve la cola y parpadea) y dos
// polillas en el aplique
function b_ventanaVida(R, t) {
  b_ventanaCortinas(R, t);
  const { pset } = R, x = 100, y = 111, c = hex('#0e0c14'), l = hex('#5a6488'), cola = Math.sin(t * 1.7) * 2.2;
  for (let j = 0; j < 7; j++) { const w = j < 2 ? 2 : j < 5 ? 3 : 2; for (let i = -w; i <= w; i++) pset(x + i, y - j, c); pset(x - w, y - j, l); }
  for (let j = 7; j < 11; j++) for (let i = -2; i <= 2; i++) pset(x + i + 1, y - j, c);
  const oreja = Math.sin(t * 0.7) > 0.95 ? 1 : 0; pset(x - 1, y - 11 - oreja, c); pset(x + 3, y - 11, c); pset(x - 1, y - 10, l); pset(x - 1, y - 9, l);
  if (Math.sin(t * 0.9) < 0.96) { pset(x, y - 8, hex('#c8d860')); pset(x + 2, y - 8, hex('#c8d860')); }
  for (let i = 0; i < 9; i++) { const u = i / 8, cxx = Math.round(x + 3 + i * 0.9), cyy = Math.round(y - Math.sin(u * Math.PI) * (2 + cola) + u * 0.5); pset(cxx, cyy, c); }
  b_polilla(R, 296, 72, 9, t, 0.4, D2.papel); b_polilla(R, 296, 74, 13, t, 2.2, D2.papelS);
}

// DISPERSIÓN · el cielo: dos sierras lejanas sobre el horizonte, en bruma de ocaso, con el filo encendido
function b_dispCielo(R) {
  const P = d1_PD;
  for (let x = 0; x < 320; x++) {
    const yh = d1_hor(x), m1 = 39 + (1 - d1_ruido(x * 0.035, 1, 230)) * 9 - Math.max(0, 1 - Math.abs(x - 214) / 40) * 5, m2 = 45 + (1 - d1_ruido(x * 0.06, 2, 231)) * 5;
    const t1 = x >= 272 ? Math.max(m1, 47) : x >= 18 && x <= 172 ? Math.max(m1, 17) : m1;
    for (let y = Math.floor(t1); y < yh + 1; y++) R.pset(x, y, y === Math.floor(t1) ? P.cielo[7] : d1_rampa([P.cielo[3], P.cielo[4], P.cielo[5]], 0.75 - (y - t1) * 0.05 + (d1_ruido(x * 0.3, y * 0.3, 232) - 0.5) * 0.3, x, y));
    for (let y = Math.floor(m2); y < yh + 1; y++) R.pset(x, y, y === Math.floor(m2) ? d1_mez(P.cielo[6], P.cielo[3], 0.3) : d1_rampa([P.cielo[1], P.cielo[2], P.cielo[3]], 0.7 - (y - m2) * 0.08, x, y));
  }
}

// DISPERSIÓN · el bosque visto desde lo alto: copas de árboles (con la luz del ocaso por la izquierda), surcos en los
// campos, aldeas de tejadillos rojos donde luego se encienden las luces y caminos; el mirador se repinta encima
function b_dispVerde(R) {
  const P = d1_PD, { pset } = R, tej = hex('#a04a38'), tejL = hex('#d07050'), muro = hex('#c8b498');
  for (let y = 56; y < 180; y++) { const z0 = (y - 52) / 128, paso = Math.max(1, Math.round(1 + z0 * 4));
    for (let x = (y * 7) % paso; x < 320; x += paso) { const yh = d1_hor(x); if (y < yh + 2) continue;
      const z = (y - yh) / (180 - yh), D = 1 / (z + 0.07), X = (x - 160) * D / 160;
      const rioX = Math.sin(D * 0.7) * 0.9 + Math.sin(D * 1.9 + 1) * 0.25, rio2 = -1.4 + Math.sin(D * 1.1 + 2) * 0.5, lago = d1_ruido(X * 2.4 + 30, D * 1.1, 63), cel = d1_ruido(X * 9, D * 5.5, 64);
      if (Math.abs(X - rioX) < 0.05 + 0.01 * z || Math.abs(X - rio2) < 0.04 || lago > 0.72) continue;
      const haze = Math.pow(1 - z, 3) * 0.75, f = (c) => d1_mez(c, P.cielo[7], haze);
      if (cel > 0.7) { if (Math.floor(X * 80 + D * 3) % 3 === 0) pset(x, y, f(P.bosque[3])); continue; }   // los surcos de los campos
      if (h(x, y, 232) > 0.55) continue;
      const jx = x + Math.round((h(x, y, 233) - 0.5) * paso);
      if (z > 0.25) { pset(jx - 1, y, f(P.bosque[4])); pset(jx, y - 1, f(P.bosque[4])); pset(jx, y, f(P.bosque[3])); pset(jx + 1, y + 1, f(P.bosque[0])); if (z > 0.6) { pset(jx + 1, y, f(P.bosque[2])); pset(jx, y + 1, f(P.bosque[1])); } }
      else pset(jx, y, f(h(x, y, 234) > 0.5 ? P.bosque[4] : P.bosque[0]));
    } }
  // las aldeas: en el sitio de cada luz, un corro de casitas (más grandes cuanto más cerca) y su camino
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 75) * 320), y = Math.round(58 + Math.pow(h(k, 2, 75), 0.8) * 110), z = (y - 50) / 130, s = z > 0.5 ? 2 : 1;
    for (let c = 0; c < 4; c++) { const hx = x + Math.round((h(k, c, 235) - 0.5) * 10 * s), hy = y + Math.round((h(k, c, 236) - 0.5) * 4 * s); if (hx < 1 || hx > 316) continue;
      if (s > 1) { R.rect(hx, hy - 1, hx + 3, hy + 1, muro); R.rect(hx, hy - 2, hx + 3, hy - 2, tej); pset(hx, hy - 2, tejL); pset(hx + 1, hy - 3, tej); pset(hx + 2, hy - 3, tej); }
      else { pset(hx, hy, tej); pset(hx + 1, hy, muro); pset(hx, hy - 1, tejL); } }
    R.linea(x, y + 1, x + Math.round((h(k, 3, 237) - 0.5) * 30), y + 4 + Math.round(z * 10), d1_mez(hex('#a08a68'), P.cielo[7], Math.pow(1 - z, 3) * 0.6), 2); }
  d1_mirador(R);
}

// DISPERSIÓN · la arena que deja la onda: crestas con su filo de luz y su cara en sombra, tocones secos de los árboles,
// las ruinas de las aldeas y piedras sueltas; el mirador se repinta encima
function b_dispArena(R) {
  const P = d1_PD, { pset, rect } = R;
  for (let y = 58; y < 180; y++) for (let x = 0; x < 320; x++) { const yh = d1_hor(x); if (y < yh + 2) continue; const z = (y - yh) / (180 - yh), D = 1 / (z + 0.07), X = (x - 160) * D / 160;
    const cr = (D * 2.6 + Math.sin(X * 3.1) * 0.5 + d1_ruido(X * 2, D * 0.6, 69) * 0.6) % 1, haze = Math.pow(1 - z, 3) * 0.75;
    if (cr > 0.94 && cr < 0.97) pset(x, y, d1_mez(P.arena[0], P.cielo[7], haze)); else if (cr > 0.12 && cr < 0.16) pset(x, y, d1_mez(P.arena[4], P.cielo[7], haze)); }
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 238) * 320), y = Math.round(64 + Math.pow(h(k, 2, 238), 0.7) * 114), z = (y - 50) / 130, a = Math.round(1 + z * 6);
    if (k % 3 === 0) { pset(x + 1, y, P.arena[1]); pset(x, y, P.roca[3]); pset(x, y - 1, P.roca[4]); if (z > 0.5) { pset(x - 1, y, P.roca[3]); pset(x, y - 2, P.roca[3]); } }
    else { for (let j = 0; j < a; j++) pset(x, y - j, j === a - 1 ? P.roca[4] : P.roca[2]); pset(x + 1, y, P.arena[1]); pset(x + 2, y, P.arena[1]); if (z > 0.5) { pset(x - 1, y - a + 1, P.roca[2]); pset(x + 1, y - a + 2, P.roca[2]); } } }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 75) * 320), y = Math.round(58 + Math.pow(h(k, 2, 75), 0.8) * 110), z = (y - 50) / 130;
    if (z > 0.45) { rect(x - 2, y - 1, x - 2, y, P.roca[3]); rect(x - 2, y - 2, x + 2, y - 2, P.roca[4]); rect(x + 2, y - 1, x + 2, y, P.roca[2]); pset(x + 3, y, P.arena[1]); } else { pset(x, y, P.roca[3]); pset(x + 1, y, P.roca[4]); } }
  d1_mirador(R);
}

// DISPERSIÓN · la vida del cielo: nubes de tres tonos encendidas por debajo a dos velocidades, una bandada en uve que
// cruza y el humo de las chimeneas de las aldeas que aún no ha alcanzado la arena
function b_dispVida(R, t, DI, Rd) {
  const P = d1_PD, tonos = [[P.cielo[2], P.cielo[5], P.cielo[8]], [P.cielo[1], P.cielo[3], P.cielo[6]]];
  for (let k = 0; k < 7; k++) { const w = 16 + h(k, 1, 240) * 20, per = 320 + w * 2, x = ((h(k, 2, 240) * per + t * (1 + (k % 3) * 1.1)) % per) - w, y = 26 + h(k, 3, 240) * 14;
    d1_nube(R, x, y, w, k + 40, tonos[k % 2]); }
  for (let k = 0; k < 7; k++) { const f = ((t * 0.045 + 0.3) % 1.2) - 0.1, cx = -10 + f * 340, cy = 30 + Math.sin(t * 0.5) * 3, row = Math.ceil(k / 2), lado = k & 1 ? 1 : -1, x = Math.round(cx - row * 4), y = Math.round(cy + lado * row * 2.5), a = Math.sin(t * 9 + k) > 0 ? 1 : 0;
    if (d1_tranquilo(x, y) || x < 1 || x > 318) continue; R.pset(x, y, P.cielo[1]); R.pset(x - 1, y - a, P.cielo[1]); R.pset(x + 1, y - a, P.cielo[1]); }
  for (let k = 0; k < 40; k += 3) { const x0 = Math.round(h(k, 1, 75) * 320), y0 = Math.round(58 + Math.pow(h(k, 2, 75), 0.8) * 110), i = y0 * 320 + x0; if (DI[i] < Rd + 8 || (x0 < 140 && y0 > 140)) continue;
    for (let j = 0; j < 8; j++) { const u = ((t * 0.3 + j / 8) % 1), y = Math.round(y0 - 2 - u * 10), x = Math.round(x0 + Math.sin(u * 5 + t) * 1.5 + u * 4); if (y < 50) continue; b_tinte(R, x, y, hex('#b8a8b0'), 0.5 * (1 - u)); } }
}

// ESTRELLAS · el planeta y el cielo (una vez): una galaxia lejana en espiral, las sierras del planeta con su luz y su
// sombra, ciudades como manchas de luz cálida tramada, y un ciclón de nubes
function b_estrellasFijo(R) {
  const { pset } = R;
  for (let j = -6; j <= 6; j++) for (let i = -14; i <= 14; i++) { const u = (i * 0.92 + j * 0.4) / 14, v = (j * 0.92 - i * 0.4) / 5, d = u * u + v * v; if (d > 1) continue; const a = Math.atan2(v, u) + Math.sqrt(d) * 5, br = (Math.cos(a * 2) * 0.5 + 0.5) * (1 - d);
    if (br > 0.25 || d < 0.05) b_tinte(R, 250 + i, 96 + j, d < 0.05 ? hex('#fff0d8') : hex('#a898c8'), d < 0.05 ? 0.9 : br * 0.6, d > 0.05); }
  for (let x = 0; x < 320; x++) { const yl = d1_limbo(x); for (let y = Math.ceil(yl) + 2; y < 180; y++) { const z = (y - yl) / 30, D = 1 / (z + 0.1), X = (x - 160) * D / 160, m = d1_ruido(X * 3 + 9, D * 1.2, 85), sie = d1_ruido(X * 14, D * 4, 241);
    if (m > 0.55 && Math.abs(sie - 0.5) < 0.04) pset(x, y, sie > 0.5 ? hex('#9a7a52') : hex('#2a2418'));
    if (m < 0.5 && m > 0.46) pset(x, y, hex('#3a5a4a'));   // la costa
    const ci = d1_ruido(X * 10 + 3, D * 3, 242); if (ci > 0.8 && ((x + y) & 1)) pset(x, y, d1_mez(R.pget(x, y), hex('#ffb860'), (ci - 0.8) * 3)); } }
  for (let j = -6; j <= 6; j++) for (let i = -16; i <= 16; i++) { const u = i / 16, v = j / 6, d = Math.sqrt(u * u + v * v); if (d > 1) continue; const a = Math.atan2(v, u) - d * 7;
    if (Math.cos(a * 2) > 0.3) b_tinte(R, 236 + i, 168 + j, hex('#c8d0e0'), 0.55 * (1 - d) + 0.1); }
}

// ESTRELLAS · la vida: una aurora verde que ondea sobre el limbo, las nubes del planeta que se mueven despacio y una
// estación orbital que cruza con sus paneles al sol
function b_estrellasVida(R, t) {
  for (let x = 30; x < 290; x++) { if (x > 140 && x < 200) continue; const yl = d1_limbo(x), a = Math.sin(x * 0.11 + t * 0.9) * 0.5 + Math.sin(x * 0.031 - t * 0.4) * 0.5, alto = 6 + a * 7;
    if (a < -0.3) continue; for (let j = 2; j < alto; j++) { const y = Math.round(yl - 4 - j); if (d1_u(x, y) > (1 - j / alto) * 0.8) continue; b_tinte(R, x, y, j > alto * 0.6 ? hex('#9a6ac8') : hex('#5ae0a0'), 0.35 * (1 - j / alto) + 0.1); } }
  for (let k = 0; k < 28; k++) { const z = h(k, 1, 243), y = Math.round(d1_limbo(160) + 4 + z * 24), v = 0.5 + z * 2.5, w = Math.round(3 + z * 9), x0 = ((h(k, 2, 243) * 360 + t * v) % 360) - 20;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), yy = y + Math.round(Math.sin(i * 0.5 + k) * 0.6); if (x < 0 || x > 319 || yy > 179 || yy < d1_limbo(x) + 2) continue; b_tinte(R, x, yy, hex('#c8d4e8'), 0.35 * Math.sin(i / w * Math.PI)); } }
  { const f = (t % 40) / 40, x = Math.round(-10 + f * 340), y = Math.round(128 - Math.sin(f * Math.PI) * 6);
    if (x > 0 && x < 319) { R.pset(x, y, hex('#ffffff')); R.pset(x - 1, y, hex('#8a9ab8')); R.pset(x + 1, y, hex('#8a9ab8')); for (const d of [-3, -2, 2, 3]) R.pset(x + d, y, hex('#4a6ab8')); if (Math.sin(t * 4) > 0.7) R.pset(x, y - 1, hex('#ff6a5a')); } }
}

// SAREER · el muro y la arena (una vez, en la capa de la tierra): almenas sobre la albardilla, la hiedra que cuelga,
// una puerta en arco con su rastrillo, los soportes de las antorchas y, delante, un golpeador fremen medio enterrado
function b_sareerFijo(R) {
  const P = d1_PS, { pset, rect } = R;
  for (let x = 2; x < 320; x += 8) { if ((x > 226 && x < 262) || Math.abs(x - 118) < 14) continue; rect(x, 73, x + 3, 76, P.muro[1]); rect(x, 73, x + 3, 73, d1_mez(P.filo, P.muro[3], Math.min(1, Math.abs(x - 118) / 160))); rect(x + 3, 74, x + 3, 76, P.muro[0]); }
  for (const [x0, n] of [[30, 9], [72, 6], [196, 8], [270, 7], [148, 4]]) for (let i = 0; i < n; i++) { const x = x0 + i, l = 3 + Math.round(h(i, x0, 250) * 10); for (let j = 0; j < l; j++) pset(x, 79 + j, (j + i) % 3 === 0 ? hex('#4a6a3a') : hex('#2e4430')); pset(x, 79 + l, hex('#5a7a44')); }
  // la puerta en arco con el rastrillo de bronce y la luz de dentro
  for (let y = 86; y <= 104; y++) for (let x = 138; x <= 154; x++) { const dx = Math.abs(x - 146); if (y < 92 && dx * dx + (y - 92) * (y - 92) * 1.4 > 64) continue;
    const borde = dx > 6 || (y < 92 && dx * dx + (y - 92) * (y - 92) * 1.4 > 40); pset(x, y, borde ? P.torre[3] : (x - 138) % 3 === 1 || (y - 86) % 4 === 0 ? hex('#3a2418') : d1_mez(hex('#f8b860'), hex('#7a3a2a'), (y - 86) / 24)); }
  for (const bx of [44, 84, 204, 284]) { rect(bx, 88, bx + 1, 90, hex('#2a1a24')); rect(bx - 1, 86, bx + 2, 87, C.bronce); }
  // el golpeador fremen medio enterrado, ladeado: el mástil de metal oscuro con su filo de luz, el muelle de bronce, la
  // cabeza con su asa en T y el montoncito de arena que lo sujeta
  for (let j = 0; j < 26; j++) { const x = 278 + Math.round(j * 0.22), y = 167 - j; pset(x - 1, y, P.torre[0]); pset(x, y, j > 9 && j < 17 ? (j % 2 ? C.bronceL : C.bronce) : P.torre[1]); pset(x + 1, y, j > 9 && j < 17 ? C.bronce : P.torre[0]); if (j < 10 || j > 16) pset(x - 1, y, P.torre[3]); }
  rect(280, 138, 286, 141, P.torre[0]); rect(281, 138, 285, 139, P.torre[2]); rect(281, 138, 285, 138, P.torre[4]); rect(278, 136, 288, 137, P.torre[0]); rect(279, 136, 287, 136, P.torre[3]);
  for (let i = -9; i <= 10; i++) { const a = Math.round(3 * (1 - Math.abs(i) / 10)); for (let y = 167 - a; y <= 167; y++) pset(278 + i, y, i < 0 ? (y === 167 - a ? P.luz[4] : P.luz[3]) : (y === 167 - a ? P.luz[2] : P.sombra[2])); }
}

// SAREER · la vida: el fuego de las antorchas del muro, la luz de la puerta que tiembla y una guardiana que hace la ronda
// por el camino de ronda (se le ve la cabeza y los hombros entre las almenas)
function b_sareerVida(R, t) {
  const P = d1_PS;
  for (const [i, bx] of [44, 84, 204, 284].entries()) { const x = bx, s = Math.sin(t * 10 + i * 2) + Math.sin(t * 15.3 + i); R.pset(x, 85, hex('#fff0a0')); R.pset(x + 1, 85, hex('#f8b048')); R.pset(x, 84, s > -0.4 ? hex('#f8b048') : hex('#e86a2a')); if (s > 0.5) R.pset(x + (i & 1), 83, hex('#e86a2a'));
    for (let j = -4; j <= 3; j++) for (let k = -4; k <= 4; k++) if ((k + j) & 1) b_tinte(R, x + k, 86 + j, hex('#f8b048'), 0.12); }
  for (let y = 92; y <= 104; y++) for (let x = 140; x <= 152; x++) if (((x + y) & 1) && Math.sin(t * 7 + x * 0.3) > 0.4) b_tinte(R, x, y, hex('#ffd890'), 0.12);
  { const f = (t * 0.035) % 2, g = f < 1 ? f : 2 - f, x = Math.round(20 + g * 190), d = f < 1 ? 1 : -1, paso = Math.floor(t * 4) & 1;
    if (!(x > 100 && x < 136)) { const P2 = (px, py, c) => { if (py <= 72) R.pset(px, py, c); };
      for (let y = 67; y <= 72; y++) { P2(x - 1, y, hex('#6a7a98')); P2(x, y, y === 70 ? C.bronceL : hex('#8a9ab8')); P2(x - d * 2, y, hex('#6a3a7a')); }
      P2(x + 1, 68 + paso, hex('#6a7a98')); P2(x, 66, hex('#e0b090')); P2(x - 1, 66, hex('#2a1e28')); P2(x, 65, hex('#2a1e28')); P2(x - 1, 65, hex('#2a1e28'));
      for (let y = 59; y <= 72; y++) P2(x + d * 2, y, y < 61 ? C.bronceL : C.bronce); } }
}

// CIUDADELA · la vida del suelo: tres palomas que picotean en la luz junto a la alfombra; cada tanto una sale volando
function b_ciudadelaVida(R, t) {
  const c = hex('#9a9aa8'), cL = hex('#d0d0dc'), cS = hex('#5a5a6a'), pico = hex('#e8a060');
  for (let k = 0; k < 3; k++) {
    const per = 11, f = ((t + k * 3.7) % per), vuela = k === 1 && f > 8.5, u = vuela ? (f - 8.5) / 2.5 : 0;
    let x = 106 + k * 9 + Math.round(Math.sin(t * 0.3 + k * 2) * 3), y = 174 - (k & 1) * 3; const d = Math.cos(t * 0.3 + k * 2) > 0 ? 1 : -1;
    if (vuela) { x += Math.round(u * 60); y -= Math.round(u * 70); if (y < 60) continue; const a = Math.sin(t * 20) > 0 ? -1 : 1; R.rect(x - 1, y, x + 1, y, c); R.pset(x - 2, y + a, cS); R.pset(x + 2, y + a, cS); R.pset(x - 3, y + a * 2, cS); R.pset(x + 3, y + a * 2, cS); continue; }
    const pica = Math.sin(t * 5 + k * 1.9) > 0.5 ? 1 : 0;
    R.rect(x - 2, y - 2, x + 1, y, c); R.rect(x - 2, y - 2, x + 1, y - 2, cL); R.pset(x - 2 * d - (d < 0 ? 1 : 0), y - 1, cS);
    const hx = x + (d > 0 ? 2 : -3), hy = y - 3 + pica * 2; R.pset(hx, hy, c); R.pset(hx, hy - 1, cL); R.pset(hx + d, hy, pico); R.pset(x + (d > 0 ? 1 : -2), y - 2, hex('#6a9a8a'));
    R.pset(x - 1, y + 1, pico); R.pset(x, y + 1, pico); R.pset(x - 1, y + 2, d2_mezcla(R.pget(x - 1, y + 2), D2.m0, 0.4)); R.pset(x + 1, y + 2, d2_mezcla(R.pget(x + 1, y + 2), D2.m0, 0.4));
  }
}

// la cara de Leto gusano AL ESTILO CHIBI del elenco (para que conviva con los chibis en el mismo plano): un óvalo casi
// redondo de piel lisa en el rebajo del capuchón (pliegue oscuro y labio claro), con luz arriba y sombra en el lado de
// fuera; ojos de chibi (dos píxeles de alto) pero AZUL de especia con su pupila oscura y un brillo que late; cejas
// cortas tristes (la punta de dentro más alta), mejillas sonrosadas, sin nariz; la boca pequeña y serena. o.habla
// abre la boca; o.mira mueve las pupilas; fuera 0–1: se deshace a pellizcos (los ojos aguantan hasta el final)
function c_caraLeto(R, fx, fy, s, d, t, o, fuera, ag) {
  const { pset } = R, rx = 5.6 * s, ry = 6.0 * s, parpa = (t % 4.3) < 0.14;
  for (let j = Math.floor(-ry * 1.75); j <= Math.ceil(ry * 1.35); j++) for (let i = Math.floor(-rx * 1.75); i <= Math.ceil(rx * 1.75); i++) {
    const e = Math.hypot(i / rx, j / ry), px = fx + i, py = fy + j;
    if (e > 1.72 || (e > 1.32 && j > ry * 0.35)) continue;
    if (fuera > 0 && h(px >> 1, py >> 1, 19) < fuera) continue;
    // el segundo pliegue del capuchón, por encima y a los lados (como los anillos de una boca de gusano)
    if (e > 1.58) { pset(px, py, (i * d < 0 && j < 0) ? p_GUS[5] : p_GUS[4]); continue; }
    if (e > 1.46) { pset(px, py, p_GUS[2]); continue; }
    if (e > 1.32) continue;
    if (e > 1.16) { if ((i * d < 0 && j < 0) || j < -ry * 0.6) pset(px, py, p_GUS[6]); continue; }   // el labio claro del rebajo
    if (e > 1) { pset(px, py, p_GUS[1]); continue; }                                                     // el pliegue oscuro
    // piel lisa de chibi: tono medio, la luz arriba hacia atrás y la sombra en el borde de fuera y abajo
    let v = 2;
    if (j < -ry * 0.35 && i * d < rx * 0.1 && e < 0.8) v = 3;
    if ((i * d > rx * 0.62 && e > 0.7) || (j > ry * 0.62 && e > 0.8)) v = 1;
    pset(px, py, p_PIEL[v]);
  }
  // los rasgos (en unidades de cara; S = tamaño del píxel de los rasgos)
  const S = s >= 1.5 ? 2 : 1, q = (i, j, c) => { const px = fx + i * S * d, py = fy + j * S; if (fuera > 0 && h(px, py, 19) < fuera * 0.8) return; R.rect(Math.min(px, px + (S - 1) * d), py, Math.max(px, px + (S - 1) * d), py + S - 1, c); };
  const mi = o.mira ? Math.sign(Math.round((o.mira[0] - fx) / 14)) * d : 0, mj = o.mira && o.mira[1] > fy + 30 ? 1 : 0;
  if (s < 0.8) {   // de lejos: dos puntos azules de chibi y la boca
    q(-2, -1, parpa ? p_PIEL[0] : p_OJO[0]); q(-2, 0, parpa ? p_PIEL[1] : p_OJO[1]); q(2, -1, parpa ? p_PIEL[0] : p_OJO[0]); q(2, 0, parpa ? p_PIEL[1] : p_OJO[1]); q(0, 2, p_PIEL[0]);
    return;
  }
  const ojoOn = !parpa || ag > 0.8, ROSA = hex('#f0a0a0');
  // cejas cortas y tristes (la punta de dentro más alta)
  q(-3, -4, p_PIEL[0]); q(-2, -5, p_PIEL[0]); q(2, -5, p_PIEL[0]); q(3, -4, p_PIEL[0]);
  // los ojos de chibi: dos píxeles de alto y dos de ancho, el iris azul de especia y la pupila oscura hacia donde mira
  for (const a of [-3, 2]) {
    if (!ojoOn) { q(a, -1, p_PIEL[0]); q(a + 1, -1, p_PIEL[0]); continue; }
    const pu = mi < 0 ? a : a + 1, ir = pu === a ? a + 1 : a;
    q(pu, -2 + mj, hex('#10184a')); q(pu, -1 + mj, p_OJO[0]);
    q(ir, -2 + mj, Math.sin(t * 1.7) > 0.3 ? p_OJO[3] : p_OJO[1]); q(ir, -1 + mj, p_OJO[2]);
  }
  // las mejillas sonrosadas
  q(-4, 1, ROSA); q(4, 1, ROSA);
  // la boca pequeña: serena y un poco triste; o.habla la abre
  const abre = o.habla && (Math.sin(t * 13) > -0.1 || Math.sin(t * 5.3) > 0.6);
  if (abre) { q(-1, 3, p_TINTA); q(0, 3, p_TINTA); q(1, 3, p_TINTA); q(0, 4, hex('#7a3a3a')); }
  else { q(-1, 3, hex('#9a5a50')); q(0, 3, hex('#9a5a50')); q(1, 3, hex('#9a5a50')); }
}
