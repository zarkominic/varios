// Fontanería y decorados del episodio 37 (La señal «Wow!»: setenta y dos segundos que nadie ha vuelto a oír) en el estilo
// canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A la gran oreja en su campo de Ohio
// (oreja), B la sala de la computadora en 1977 (sala), C la mesa de Ehman y el listado (listado), D el cielo (cielo),
// E otros telescopios (telescopios), F el archivo de papeles (archivo) y G hoy, con un despacho de 1959 (hoy).
// CUIDADO (es un misterio abierto y la gente lo cuenta con mucho ruido):
// · NADA DE EXTRATERRESTRES: ni platillos, ni hombrecillos verdes, ni ojos en el cielo, ni rayos que bajan. La señal se
//   dibuja como lo que es: una curva, una raya en un dial, una línea de cifras en papel.
// · SIN LETRAS: solo números (R.numero), rayas, iconos y pictogramas. Las DOS EXCEPCIONES, porque son el objeto de la
//   historia: la línea «6EQUJ5» del listado y la palabra «Wow!» escrita a mano en rojo (dibujadas píxel a píxel como
//   letras de impresora y de bolígrafo, con su propia rejilla; las da piezaListado() más abajo, que se comparte).
// · Las personas reales, por sus atributos y solo con hechos; nada de burla. Los gags van con objetos y animales.
// · Los objetos NO tienen cara (las bocinas, las impresoras, los telescopios no sonríen ni miran: se inclinan, tiemblan).
// · La esquina de Atom (x 278–318, y 4–44), siempre tranquila (cielo liso o pared en dos tonos casi iguales), y la barra
//   del año (x 20–170, y 0–14; las cifras del año bajan hasta y ≈ 20: nada con detalle en y 0–20 bajo x 20–170).
// Los personajes son los de ELENCO_WO (krausWO, cocconiWO, morrisonWO, ehmanWO, voluntario1WO, voluntaria2WO, grayWO,
// marvelWO, caballeroWO, abelWO, mendezWO) y los que ya existen en ELENCO_CHIBI (genéricos: EL.turista1…). Los escribe
// pixel-chibi.js (T.ELENCO_WO).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, barandillas)
// va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// Cada encuadre devuelve su geometría: { encuadre, camara, suelo, libre: [x0, x1] (dónde caben los actores de pie), y
// los puntos que nombra su cabecera; ninguno se llama 'camara' ni 'encuadre' }. Lo dibujado tiene que cuadrar con esos
// números (o se cambian aquí y en las escenas).
// LA BARRA DEL AÑO: tres tramos, 1956–1977 (la oreja), 1978–2000 (la antena) y 2001–2027 (el papel). 1959 cae en el
// primero.
//
// CANON COMPARTIDO (lo dibujan varios grupos a la vez: tiene que cuadrar entre decorados)
// · LA GRAN OREJA (Big Ear): en un campo llano de Ohio (hierba, maizales al fondo, una granja, un bosquecillo). Dos
//   MUROS DE METAL enfrentados: a la IZQUIERDA el reflector PLANO, alto e INCLINADO hacia atrás, una celosía de vigas
//   blancas con su chapa de aluminio gris; a la DERECHA el reflector CURVO (parabólico), más bajo, de chapa gris con
//   costillas. Entre los dos, el SUELO de aluminio, enorme, plano y brillante como un lago de metal (refleja el cielo),
//   con sus juntas en rejilla. Junto al reflector curvo, sobre el suelo, el CARRO de las bocinas: dos bocinas (dos
//   embudos rectangulares de metal, uno junto al otro, apuntando al reflector curvo) sobre un carrito con ruedas en un
//   raíl corto. A un lado, la CASETA de los receptores (de bloques, tejado plano, una puerta, una antena pequeña, un
//   coche de los setenta aparcado). De noche: estrellas, la Vía Láctea, el suelo de metal que refleja las estrellas.
// · EL LISTADO: papel continuo de impresora, blanco algo amarillento, con las bandas verdes claras alternas y los
//   agujeros de arrastre a los dos lados (las «orejas» perforadas). Columnas de caracteres de impresora: casi todo «1» y
//   espacios en blanco; en una columna, de arriba abajo, la secuencia 6, E, Q, U, J, 5. El círculo y el «Wow!» en el
//   margen izquierdo, en ROJO a mano. piezaListado(R, x, y, o) lo dibuja (abajo): úsala en los dos decorados que lo
//   enseñan (listado y archivo) para que sea el mismo papel.
// · LA SEÑAL COMO CURVA: una campana de seis escalones (las seis lecturas de 12 s) que sube y baja; la U arriba. Se
//   dibuja en ámbar sobre papel o en verde sobre pantalla de fósforo.
//
//   import * as T from '/atomo/plato/escenas/wo-comun.js';
//   const { E, R, M } = await T.preparar('wo-gancho');
//   T.rodar(E, R, [[0, (t) => T.oreja(R, t, { encuadre: 'campo', luz: 'noche' })]], { año: 1977 });
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
// el reparto del episodio (ELENCO_WO) lo crea pixel-chibi.js
export const ELENCO_WO = KIT.ELENCO_WO || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el aluminio de la gran oreja (tres tonos y el brillo), la celosía blanca, la hierba y el maíz de Ohio, el papel
    // del listado y sus bandas verdes, la tinta roja del bolígrafo, el fósforo verde y el ámbar de las pantallas, el
    // cielo de noche y la nube de hidrógeno
    alu: '#a8b0b8', aluS: '#6e7680', aluL: '#dce2e8', aluB: '#f4f8fc', celosia: '#eef0f0', hierba: '#6a9a3a', hierbaS: '#4a7228',
    maiz: '#c8b04a', papel: '#f4efe0', papelS: '#d8d0b8', banda: '#d8ecd0', rojo: '#d02a2a', fosforo: '#5aff8a', ambar: '#ffb43a',
    noche: '#0e1428', nocheL: '#24305a', hidrogeno: '#c06ae0', hidrogenoL: '#f0b8ff', magnetar: '#9ad8ff',
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
  const E = await escena(id, 'ep37');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1956–1977 (la gran oreja: se construye, escucha y oye el «Wow!»), 1978–2000 (las búsquedas y
  // el derribo), 2001–2027 (los papeles: las fotos, Puerto Rico, los cincuenta años)
  Object.assign(R.ICONOS, {
    oreja: ['#.....#', '##...##', '#.#.#.#', '#..#..#', '#.....#', '.#...#.', '..###..'],
    antena: ['#.....#', '.#...#.', '..#.#..', '...#...', '...#...', '..###..', '.#####.'],
    papel: ['#######', '#.....#', '#.###.#', '#.....#', '#.##..#', '#.....#', '#######'],
  });
  R.tramosTiempo([[1956, 1977, R.PALA.ORO, 'oreja'], [1978, 2000, R.PALA.AZUL ?? R.PALA.ROJO, 'antena'], [2001, 2027, R.PALA.ROJO, 'papel']]);
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

// EL LISTADO (canon, compartido por listado y archivo): papel continuo de impresora de ancho w (por omisión 150) y alto
// hh desde (x, y) arriba a la izquierda, con las bandas verdes alternas, los agujeros de arrastre a los dos lados y
// columnas de caracteres de impresora (3×5 píxeles): casi todo «1» y espacios. o.linea: la fila (0…) donde va la secuencia
// 6EQUJ5 en vertical en la columna o.col (por omisión, la segunda); o.rodea 0–1: el círculo rojo a mano que se cierra
// alrededor de la secuencia; o.wow 0–1: el «Wow!» rojo que se escribe en el margen izquierdo, trazo a trazo; o.desplaza:
// cuánto ha corrido el papel hacia arriba (para la impresora). ESQUELETO: lo escribe el grupo del listado (C). Devuelve
// { seq: [x, y] (el centro de la secuencia), wow: [x, y] (donde acaba el «Wow!») }.
export function piezaListado(R, x, y, o = {}) {
  const w = o.w ?? 150, hh = o.hh ?? 120;
  R.rect(x, y, x + w, y + hh, C.papel);
  return { seq: [x + 40, y + 50], wow: [x + 10, y + 50] };
}


// ── A · La gran oreja (Big Ear), en su campo de Ohio, de 1956 a 1998 ─────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Lo de delante de los personajes va en
// orejaDelante (se llama después de los actores). Opciones de todo el grupo: o.luz 'dia' (por omisión: sol de verano,
// cielo azul con cúmulos, la hierba que ondea) | 'tarde' (sol bajo, naranja, sombras largas de la celosía) | 'noche'
// (azul oscuro, estrellas y Vía Láctea, el suelo de metal que refleja el cielo, una luz en la caseta, luciérnagas).
// o.epoca 1958 (en obras: andamios, una grúa, chapas apiladas, la celosía a medio levantar) | 1977 (por omisión: entero) |
// 1998 (el derribo: máquinas amarillas, chapas arrancadas, un volquete) | 2000 (el campo de golf y casas nuevas donde
// estuvo, con una sola plancha olvidada al borde de un green).
//   'campo': LA GRAN OREJA entera (canon), vista en tres cuartos desde un poco alto: el reflector plano a la izquierda
//     (x 20–110, alto hasta y ≈ 40, NUNCA dentro de la barra del año en x 20–170 por encima de y 20), el curvo a la derecha
//     (x 220–300, hasta y ≈ 70: por debajo de la esquina de Atom), el suelo de aluminio entre los dos (x 60–260, y 90–150)
//     con sus juntas, brillos y el cielo reflejado, el carro de las bocinas junto al curvo (x 200–216, y 118–132), la
//     caseta a la izquierda abajo, la hierba y los maizales alrededor, una granja y un silo lejos. Vida: nubes que pasan,
//     su reflejo en el metal, un pájaro que se posa en la celosía, de noche estrellas que giran muy despacio. o.cinta
//     0–1 (el gag 2): el cielo del fondo corre de izquierda a derecha como una cinta de supermercado, con las estrellas
//     encima, y con o.cinta > 0,7 una estrella se cae de la cinta y rebota en el suelo de metal (un «clin»). Devuelve
//     suelo 158 (la hierba de delante), libre [20, 300], plano: [x0, y0, x1, y1], curvo: [x0, y0, x1, y1], bocinas: [x, y],
//     caseta: [x, y] (la puerta), estrella: [x, y] (donde cae). Cámara 'muros': A RAS DEL SUELO DE METAL, entre los dos
//     muros: la celosía del plano altísima a la izquierda en escorzo, el curvo enfrente con sus costillas, el suelo de
//     aluminio en perspectiva hasta el horizonte (las juntas que convergen), el reflejo de los muros y del cielo; una
//     persona (krausWO o un voluntario) muy pequeña de pie en el suelo, para la escala. o.epoca 1958: obreros y
//     estudiantes atornillando chapas, una carretilla, un nivel, un rollo de planos (sin letras) sobre una caja.
//     Devuelve suelo 160, libre [60, 250].
//   'caseta': la CASETA de los receptores al atardecer (o.luz 'tarde' por omisión aquí): bloques de hormigón pintados,
//     tejado plano con una antena pequeña, una puerta de metal abierta con luz amarilla dentro (recortada a la puerta: se
//     ve un banco de trabajo con aparatos y cables), una ventana, un letrero junto a la puerta con un pictograma de oreja
//     (sin letras), un coche de los setenta aparcado en la grava, un buzón; detrás asoma el borde del reflector curvo.
//     Voluntarios (voluntario1WO, voluntaria2WO) llegan después del trabajo con un termo y una fiambrera. o.coche 0–1: el
//     coche llega levantando polvo y se para. Devuelve suelo 156, libre [30, 240], puerta: [x0, y0, x1, y1]. Cámara
//     'bocinas': EL CARRO DE LAS BOCINAS de cerca (canon): las dos bocinas de metal una al lado de la otra, sobre el
//     carrito con ruedas en su raíl, los cables que bajan, el suelo de metal brillante detrás y el reflector curvo
//     enorme detrás de ellas. EL GAG 5: o.respingo 0–1: la bocina de la izquierda da un respingo (un temblor, una chispa
//     de luz, motas que saltan) y la de la derecha se queda quieta e INCLINADA como esperando (o.espera 0–1: se inclina
//     poco a poco hacia la izquierda); ninguna tiene cara. Devuelve suelo 170, libre [0, 0], bocinaE: [x, y] (la de la
//     izquierda, la que oye), bocinaO: [x, y].
//   'cinta': el ESQUEMA de la deriva (vista didáctica, al nivel de detalle de un decorado): la Tierra curva abajo
//     (un arco de horizonte con Ohio y la gran oreja diminuta encima), el cielo nocturno arriba que pasa de izquierda a
//     derecha mientras la Tierra gira (o.u 0–1: cuánto ha girado), y el HAZ de la gran oreja: un cono estrecho de luz
//     tenue que sube hacia el cielo. Un punto del cielo (una estrella marcada con un anillo) cruza el haz con o.u. Abajo
//     a la derecha, un reloj de arena con el número 72 (R.numero). Devuelve punto: [x, y] (dónde está el punto con ese
//     o.u), haz: [x0, x1] (dónde cruza el haz a la altura del punto). Cámara 'haz': EL CRUCE de cerca, como una gráfica
//     sobre papel milimetrado (canon «la señal como curva»): el eje del tiempo abajo con marcas cada 12 s (seis), la
//     campana de seis escalones que se va dibujando con o.u (la U arriba, ámbar), y a la derecha el haz en pequeño con
//     el punto cruzando. Devuelve curva: [x0, y0, x1, y1] (la caja de la gráfica).
//   'golf': EL FINAL (o.epoca 1998 por omisión aquí): las máquinas (una excavadora y un volquete amarillos) arrancan las
//     chapas del suelo de metal; el reflector plano a medio caer, sin chapas; polvo; y con o.epoca 2000, el mismo sitio
//     convertido en campo de golf con un green, una bandera (sin letras), un estanque, un carrito, y casas nuevas de
//     tejados iguales al fondo. Devuelve suelo 156, libre [40, 280]. Cámara 'plancha': EL GAG 6: lo último que queda,
//     una plancha de aluminio olvidada entre la hierba cortada del borde de un green, de cerca; una pelota de golf entra
//     botando (o.pelota 0–1) y rebota en la plancha (un destello y ondas de «tonk»), y se queda temblando. Devuelve suelo
//     150, plancha: [x, y], pelota: [x, y].
const V_OREJA = {
  campo: { cam: 'muros', general: { col: ['#9ec8ec', '#6a9a3a'], geo: { suelo: 158, libre: [20, 300], plano: [20, 40, 110, 140], curvo: [220, 70, 300, 140], bocinas: [208, 126], caseta: [40, 150], estrella: [160, 120] } }, muros: { col: ['#9ec8ec', '#a8b0b8'], geo: { suelo: 160, libre: [60, 250] } } },
  caseta: { cam: 'bocinas', general: { col: ['#f0a868', '#8a7a62'], geo: { suelo: 156, libre: [30, 240], puerta: [120, 96, 144, 148] } }, bocinas: { col: ['#b8c0c8', '#6e7680'], geo: { suelo: 170, libre: [0, 0], bocinaE: [130, 100], bocinaO: [190, 100] } } },
  cinta: { cam: 'haz', general: { col: ['#0e1428', '#24305a'], geo: { suelo: 180, libre: [0, 0], punto: [160, 60], haz: [150, 170] } }, haz: { col: ['#f4efe0', '#d8d0b8'], geo: { suelo: 180, libre: [0, 0], curva: [40, 40, 230, 150] } } },
  golf: { cam: 'plancha', general: { col: ['#9ec8ec', '#6a9a3a'], geo: { suelo: 156, libre: [40, 280] } }, plancha: { col: ['#9ec8ec', '#4a7228'], geo: { suelo: 150, plancha: [160, 140], pelota: [120, 130] } } },
};
export function oreja(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  return vista(R, t, o, V_OREJA);
}
// lo de delante de los personajes en cada encuadre de oreja(); se llama después de los actores, con las mismas opciones
export function orejaDelante(R, t, o = {}) {
  return {};
}

// ── B · La sala de la computadora, 1977 ──────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Opciones: o.luz 'noche' (por omisión: fluorescentes fríos, una lámpara de mesa ámbar, la
//   ventana negra con estrellas recortada a su hueco) | 'dia'. o.reloj: la hora del reloj de pared en horas (23,27 por
//   omisión: las once y cuarto pasadas).
//   'sala': la sala sin nadie, de noche: a la izquierda la COMPUTADORA IBM grande como un escritorio (una consola gris
//     azulada con su teclado, luces que parpadean en filas, una unidad de disco con su plato que gira), en el centro
//     la IMPRESORA DE LÍNEA (un mueble gris alto con la tapa de cristal) que escupe papel continuo (canon) a una caja
//     de cartón; armarios de cinta, una pizarra de corcho con papeles (rayas), un reloj de pared, una taza de café
//     olvidada con su vapor ya frío, una silla de oficina vacía, cables por el suelo. EL GAG 3: o.papel 0–1: el papel
//     continuo llena la caja, rebosa, cubre el suelo y sale por la puerta de la derecha (abierta, recortada) como una
//     ola. Devuelve suelo 158, libre [40, 250], impresora: [x, y] (la boca por donde sale el papel), puerta: [x0, y0, x1,
//     y1]. Cámara 'impresora': LA BOCA DE LA IMPRESORA de cerca: el cabezal que va y viene (o.t anima), el papel continuo
//     con sus agujeros de arrastre que sube línea a línea con columnas de «1» y espacios (canon del listado), la tapa de
//     cristal con un reflejo, polvo de papel en la luz, el piloto rojo encendido. o.linea 0–1: con > 0,5 la línea que sale
//     es la de la secuencia 6EQUJ5 (sin círculo: nadie la ha visto aún). Devuelve linea: [x, y].
const V_SALA = {
  sala: { cam: 'impresora', general: { col: ['#2a3040', '#4a5060'], geo: { suelo: 158, libre: [40, 250], impresora: [160, 104], puerta: [250, 60, 300, 158] } }, impresora: { col: ['#6a7080', '#f4efe0'], geo: { suelo: 180, libre: [0, 0], linea: [160, 110] } } },
};
export function sala(R, t, o = {}) {
  return vista(R, t, o, V_SALA);
}
export function salaDelante(R, t, o = {}) {
  return {};
}

// ── C · La mesa de Ehman y lo que dice el papel ────────────────────────────────────────────────────────────────────
// Opciones: o.luz 'noche' (por omisión: la lámpara de la cocina, ámbar, y la ventana oscura) | 'dia'.
//   'mesa': una COCINA de 1977 de noche: azulejos con dibujo, una nevera redondeada color aguacate, un tostador, un
//     calendario de pared con un paisaje (sin letras), una radio en la repisa, una ventana con la noche; la mesa de
//     formica con el LISTADO desplegado (canon, piezaListado) que cae por el borde hasta el suelo en pliegues, una taza,
//     una lámpara de pinza que ilumina el papel. ehmanWO sentado a la mesa (la mesa va en listadoDelante). Devuelve
//     suelo 160, libre [40, 220], mesa: [x0, y0, x1, y1] (el tablero), papel: [x, y] (donde mira Ehman). Cámara 'listado':
//     EL LISTADO DESDE ARRIBA, a pantalla casi completa (canon): las columnas de «1» y espacios, la secuencia 6EQUJ5 en
//     vertical, y EL GAG 4 Y EL GOLPE: o.boli 0–3 (una mano, T.mano, prueba primero un lápiz roto (1), luego un bolígrafo
//     azul que no pinta (2) y por fin el rojo (3)); o.rodea 0–1: el círculo rojo se cierra; o.wow 0–1: el «Wow!» rojo se
//     escribe en el margen, trazo a trazo. Bordes: la formica de la mesa alrededor del papel, una mancha de café, una
//     goma. Devuelve seq: [x, y], wow: [x, y], mano: [x, y].
//   'escala': LA ESCALA (vista didáctica, en papel milimetrado sobre la misma mesa): los seis caracteres 6 E Q U J 5
//     grandes en fila y, encima de cada uno, una barra que crece (o.u 0–1) hasta su altura (6, 14, 26, 30, 19, 5 en una
//     escala de 30), la U la más alta, y una línea punteada de «ruido de fondo» abajo, con el número 30 (R.numero) junto
//     a la U. Devuelve barras: [x0, y0, x1, y1]. Cámara 'curva': la CURVA de la señal (canon «la señal como curva») en una
//     pantalla verde de fósforo de los setenta (monitor con su marco de plástico beis), con el eje del tiempo y el 72
//     (R.numero) debajo; o.u 0–1 la dibuja; y, al lado, un dial de radio antiguo (lo hace el cielo 'sagitario' cámara
//     'dial': aquí solo la pantalla). Devuelve pantalla: [x0, y0, x1, y1].
const V_LISTADO = {
  mesa: { cam: 'listado', general: { col: ['#e8c890', '#6a5038'], geo: { suelo: 160, libre: [40, 220], mesa: [90, 118, 250, 126], papel: [170, 116] } }, listado: { col: ['#f4efe0', '#c8a878'], geo: { suelo: 180, libre: [0, 0], seq: [150, 90], wow: [80, 90], mano: [200, 120] } } },
  escala: { cam: 'curva', general: { col: ['#f4efe0', '#c8a878'], geo: { suelo: 180, libre: [0, 0], barras: [50, 40, 250, 150] } }, curva: { col: ['#0a2014', '#c8b898'], geo: { suelo: 180, libre: [0, 0], pantalla: [50, 34, 250, 150] } } },
};
export function listado(R, t, o = {}) {
  return vista(R, t, o, V_LISTADO);
}
export function listadoDelante(R, t, o = {}) {
  return {};
}

// ── D · El cielo ────────────────────────────────────────────────────────────────────────────────────────────────────
// Todo de noche o en el espacio: estrellas de varios tamaños que titilan, la Vía Láctea con su polvo, colores fríos.
//   'sagitario': EL CIELO DE VERANO desde Ohio: la Vía Láctea en diagonal, la constelación de Sagitario (la «tetera»,
//     sus estrellas unidas por líneas finas que se encienden con o.lineas 0–1), un horizonte bajo con la silueta del
//     maizal y de la gran oreja diminuta a la izquierda; o.puntos 0–1: los DOS PUNTOS POSIBLES de la señal, dos círculos
//     finos que se dibujan juntos (canon: muy cerca el uno del otro, a la derecha de la tetera). Devuelve punto1: [x, y],
//     punto2: [x, y]. Cámara 'dial': un DIAL DE RADIO ANTIGUO de cerca (madera y cristal, la escala con rayas y números
//     sin letras, la aguja roja): por la escala, muchas «emisoras» naturales como manchas anchas y borrosas (azules), y
//     una sola RAYA FINA y brillante en el hidrógeno (un icono de átomo de hidrógeno encima: un punto y una órbita);
//     o.aguja 0–1: la aguja va a la raya y se queda quieta. Devuelve raya: [x, y].
//   'hidrogeno': EL ESPACIO PROFUNDO: una NUBE fría de hidrógeno (violeta tenue, de borde blando, con filamentos) y,
//     lejos, una ESTRELLA MUERTA pequeña y muy magnética (un magnetar: un punto azul blanco con líneas de campo curvas);
//     o.destello 0–1: el magnetar destella (un anillo que se expande) y, cuando llega, la nube se ENCIENDE de golpe y
//     brilla mucho más un instante, y vuelve a apagarse. Devuelve nube: [x, y], magnetar: [x, y]. Cámara 'cometas': el
//     cielo con DOS COMETAS (núcleo, coma y cola, envueltos en un halo violeta de hidrógeno) que cruzan; o.u 0–1: lo que
//     han avanzado; o.trazas 0–1: un avión (luces que parpadean) y un satélite (punto que cruza recto) pasan con su
//     estela, por otro camino; o.candado 0–1: un candado (icono) aparece sobre una franja del cielo marcada (la banda
//     protegida). Devuelve cometa1: [x, y], cometa2: [x, y].
//   'caminos': TRES CAMINOS en el cielo (vista de cierre): desde la gran oreja diminuta abajo, tres senderos de luz suben
//     y se abren: a la izquierda hacia una nube de hidrógeno, en el centro hacia un «?» (R.icono o pictograma) y a la
//     derecha hacia una lucecita lejana que parpadea (sin nave, sin forma: una luz). o.u 0–1: los senderos se dibujan.
//     Devuelve nube: [x, y], duda: [x, y], luz: [x, y]. Cámara 'franja': la FRANJA de cielo que barre la gran oreja,
//     vista como una cinta horizontal de estrellas, con un CALENDARIO de taco grande delante (las hojas con números del 1
//     al 60, R.numero) que pasa hojas (o.dias 0–60): cada hoja que cae, la franja vuelve a pasar sin nada. Devuelve
//     calendario: [x, y].
const V_CIELO = {
  sagitario: { cam: 'dial', general: { col: ['#0e1428', '#24305a'], geo: { suelo: 168, libre: [0, 0], punto1: [200, 70], punto2: [214, 72] } }, dial: { col: ['#6a4428', '#f0e0b0'], geo: { suelo: 180, libre: [0, 0], raya: [180, 90] } } },
  hidrogeno: { cam: 'cometas', general: { col: ['#06081a', '#3a2a6a'], geo: { suelo: 180, libre: [0, 0], nube: [120, 100], magnetar: [250, 60] } }, cometas: { col: ['#0e1428', '#24305a'], geo: { suelo: 180, libre: [0, 0], cometa1: [100, 70], cometa2: [180, 100] } } },
  caminos: { cam: 'franja', general: { col: ['#0e1428', '#3a2a6a'], geo: { suelo: 168, libre: [0, 0], nube: [70, 60], duda: [160, 50], luz: [250, 60] } }, franja: { col: ['#0e1428', '#f4efe0'], geo: { suelo: 180, libre: [0, 0], calendario: [160, 110] } } },
};
export function cielo2(R, t, o = {}) {
  return vista(R, t, o, V_CIELO);
}
export function cielo2Delante(R, t, o = {}) {
  return {};
}

// ── E · Otros telescopios (1995–2022) ───────────────────────────────────────────────────────────────────────────────
//   'vla': EL GRAN CONJUNTO DE ANTENAS DEL DESIERTO DE NUEVO MÉXICO (1995–1996): una llanura de matorral seco, montañas
//     azuladas al fondo, las antenas parabólicas blancas (iguales, grandes, sobre su pedestal) en fila a lo largo de un
//     raíl que se pierde en el horizonte, todas apuntando al mismo sitio del cielo (o.giro 0–1: giran juntas); un
//     edificio de control bajo; una carretera con una furgoneta; grayWO (y marvelWO) de pie mirando arriba. Devuelve
//     suelo 156, libre [30, 250]. Cámara 'tasmania': UNA ANTENA en Tasmania (Australia), de cerca, entre colinas verdes
//     con eucaliptos, ovejas lejos y el mar al fondo; cielo de invierno austral con nubes; la antena gira despacio
//     (o.giro). Devuelve suelo 150, libre [30, 200].
//   'ata': LAS ANTENAS DEL NORTE DE CALIFORNIA (2020): un valle de montaña con pinos, un volcán nevado al fondo (sin
//     marcas reconocibles), muchas antenas pequeñas iguales en grupos sobre la pradera, un camino de tierra. Devuelve
//     suelo 152, libre [30, 250]. Cámara 'estrella': UN MAPA DE ESTRELLAS en una pantalla (2020, una mesa con un portátil
//     y una taza): puntos de estrellas y, en una zona marcada, una estrella AMARILLA parecida al Sol que se rodea
//     (o.rodea 0–1); caballeroWO de pie al lado (la mesa en telescopiosDelante). Devuelve suelo 156, libre [20, 120],
//     estrella: [x, y].
const V_TELESCOPIOS = {
  vla: { cam: 'tasmania', general: { col: ['#bcd8f0', '#c8a878'], geo: { suelo: 156, libre: [30, 250] } }, tasmania: { col: ['#a8c8e0', '#5a8a3a'], geo: { suelo: 150, libre: [30, 200] } } },
  ata: { cam: 'estrella', general: { col: ['#bcd8f0', '#4a7228'], geo: { suelo: 152, libre: [30, 250] } }, estrella: { col: ['#1a2034', '#5a4430'], geo: { suelo: 156, libre: [20, 120], estrella: [200, 80] } } },
};
export function telescopios(R, t, o = {}) {
  return vista(R, t, o, V_TELESCOPIOS);
}
export function telescopiosDelante(R, t, o = {}) {
  return {};
}

// ── F · El archivo: los papeles que vuelven (2006–2026) ───────────────────────────────────────────────────────────
//   'garaje': UN GARAJE de una casa de Ohio: estanterías de metal con cajas de cartón (sin letras), una bicicleta
//     colgada, herramientas en un tablero perforado, una lavadora vieja, la puerta basculante medio abierta con luz de
//     tarde; un antiguo voluntario (voluntario1WO, ya mayor: o.mayor) abre una caja. EL GAG 7: o.confeti 0–1: al abrir,
//     salen tarjetas perforadas (beis, con sus agujeros rectangulares) volando como confeti y caen girando; un gato duerme
//     encima de otra caja (T.gato) y se despierta con una tarjeta en la cabeza. Devuelve suelo 158, libre [40, 220],
//     caja: [x, y]. Cámara 'archivo': UN ARCHIVO DE HISTORIA: pasillos de estanterías altas con cajas grises iguales,
//     una mesa de consulta con una lámpara verde y guantes blancos, y el LISTADO del «Wow!» (canon, piezaListado con
//     o.rodea 1 y o.wow 1) en una carpeta abierta sobre la mesa, bajo un cristal. Devuelve suelo 158, libre [30, 200],
//     listado: [x, y].
//   'fotos': UN SÓTANO (2006–2017) con montañas de listados en cajas, un ATRIL DE FOTOS (una cámara en un brazo sobre una
//     mesa con dos focos) y abelWO que pasa página y dispara (o.flash 0–1: el destello; una pila de páginas hechas
//     crece a un lado, una pila por hacer mengua al otro, o.u 0–1). Devuelve suelo 156, libre [40, 220], foto: [x, y] (la
//     cámara del atril). Cámara 'laboratorio': EL LABORATORIO DE PUERTO RICO (2024–2026): un despacho de la
//     universidad con una ventana a palmeras y montañas verdes, pantallas con las fotos de los listados, una pizarra
//     blanca con la curva (canon) y rayas, plantas, un ventilador; mendezWO ante la pantalla. Devuelve suelo 156,
//     libre [30, 200], pantalla: [x0, y0, x1, y1].
//   'pantalla': LA PANTALLA de cerca: la foto del listado ampliada, con la secuencia; encima se dibuja la curva medida
//     de nuevo (canon) que crece al CUÁDRUPLE de la vieja (o.alto 0–1: la vieja curva, tenue, queda como sombra baja; la
//     nueva sube más alto) y, en una ventana pequeña a la derecha, una imitación de la consola de 1977 (luces que
//     parpadean en filas, en píxeles) con líneas de código como rayas que se escriben solas (o.codigo 0–1). Devuelve
//     curva: [x0, y0, x1, y1]. Cámara 'calendario': un CALENDARIO de agosto de 2027 (R.numero: 2027 arriba y los días)
//     en la pared del laboratorio, con el 15 rodeado (o.rodea 0–1), y delante una mesa con montañas de papel. Devuelve
//     dia: [x, y].
const V_ARCHIVO = {
  garaje: { cam: 'archivo', general: { col: ['#c8b8a0', '#6a5a48'], geo: { suelo: 158, libre: [40, 220], caja: [140, 120] } }, archivo: { col: ['#9aa0a8', '#5a6068'], geo: { suelo: 158, libre: [30, 200], listado: [230, 120] } } },
  fotos: { cam: 'laboratorio', general: { col: ['#8a8070', '#4a4438'], geo: { suelo: 156, libre: [40, 220], foto: [170, 90] } }, laboratorio: { col: ['#e8eef0', '#7a8a8a'], geo: { suelo: 156, libre: [30, 200], pantalla: [180, 60, 270, 120] } } },
  pantalla: { cam: 'calendario', general: { col: ['#0a1a20', '#2a4a5a'], geo: { suelo: 180, libre: [0, 0], curva: [40, 40, 220, 150] } }, calendario: { col: ['#e8eef0', '#c8b898'], geo: { suelo: 180, libre: [0, 0], dia: [180, 90] } } },
};
export function archivo(R, t, o = {}) {
  return vista(R, t, o, V_ARCHIVO);
}
export function archivoDelante(R, t, o = {}) {
  return {};
}

// ── G · Hoy (el estudio de Atom) y un despacho de 1959 ─────────────────────────────────────────────────────────────
//   'estudio': EL ESTUDIO DE ATOM (el de siempre, con su estantería, su lámpara y su ventana) con EL GAG 1 Y 8: la «gran
//     oreja» casera, un embudo de cocina grande con un vaso pegado, sujeto al TECHO con cinta (a la altura de un chibi
//     subido a una silla); o.oreja 0–1: alguien (la propia mano de la escena, T.mano) la acerca al techo; o.ruido: 0
//     (nada), 1 (la aspiradora del vecino de arriba: líneas de vibración en el techo, polvo de yeso que cae, un cuadro
//     que tiembla), 2 (tres golpecitos: tres ondas que bajan del techo, una tras otra, y la lámpara que se mece). Una
//     pizarra en la pared (o.pizarra 0–1: una sola marca de tiza, un palo, y nada con qué compararla; el espacio vacío al
//     lado). Devuelve suelo 158, libre [40, 240], embudo: [x, y], pizarra: [x0, y0, x1, y1]. Cámara 'techo': el embudo y
//     el vaso de cerca contra el techo (la cinta, el yeso con grietas, una telaraña), con las ondas de o.ruido.
//     Devuelve embudo: [x, y].
//   'despacho': UN DESPACHO DE 1959 de una universidad: madera oscura, una pizarra verde grande con un ÁTOMO DE
//     HIDRÓGENO dibujado con tiza (un punto y una órbita) y una onda, estanterías con libros (lomos de colores sin letras),
//     una lámpara de flexo, una ventana con árboles de otoño, un perchero con un sombrero; cocconiWO y morrisonWO
//     delante. Devuelve suelo 156, libre [40, 230], pizarra: [x0, y0, x1, y1]. Cámara 'pizarra': la pizarra de cerca: la
//     frase del final en ICONOS (una lupa, una flecha, un cero tachado: «si nunca buscamos, es cero») que se va escribiendo
//     con tiza (o.u 0–1), polvo de tiza, el borrador en la repisa. Devuelve tiza: [x, y].
const V_HOY = {
  estudio: { cam: 'techo', general: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 158, libre: [40, 240], embudo: [150, 30], pizarra: [40, 50, 110, 100] } }, techo: { col: ['#f0e8dc', '#c8b8a0'], geo: { suelo: 180, libre: [0, 0], embudo: [160, 60] } } },
  despacho: { cam: 'pizarra', general: { col: ['#6a4a30', '#2a3a2a'], geo: { suelo: 156, libre: [40, 230], pizarra: [60, 40, 220, 110] } }, pizarra: { col: ['#2a3a2a', '#6a4a30'], geo: { suelo: 180, libre: [0, 0], tiza: [160, 90] } } },
};
export function hoy(R, t, o = {}) {
  return vista(R, t, o, V_HOY);
}
export function hoyDelante(R, t, o = {}) {
  return {};
}

// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_WO = { oreja: V_OREJA, sala: V_SALA, listado: V_LISTADO, cielo2: V_CIELO, telescopios: V_TELESCOPIOS, archivo: V_ARCHIVO, hoy: V_HOY };
