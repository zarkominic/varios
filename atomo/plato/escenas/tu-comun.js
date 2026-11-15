// Fontanería y decorados del episodio 36 (Tutankamón: los cuartos que nadie ha abierto) en el estilo canónico pixel
// chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el Valle de los Reyes en 1922 (valle), B dentro de la
// tumba (tumba), C El Cairo y Londres, 1923–1939 (cairo), D el escaneo y la copia (escaneo), E los radares, el busto y la
// ciudad del disco solar (radares), F la ladera sobre la tumba y el corte del monte (ladera) y G hoy (hoy).
// CUIDADO (son restos humanos y es una historia con mucho ruido):
// · LA MOMIA NO SE ENSEÑA NUNCA: ni vendada, ni de perfil, ni en sombra, ni dentro de un ataúd abierto. Se ven el
//   sarcófago CERRADO (con su tapa puesta), la máscara de oro (sola, en su vitrina o sobre un paño) y el ajuar.
// · LA «MALDICIÓN» ES UN INVENTO DE PERIÓDICO: se cuenta con vendedores, rotativas, titulares de rayas y un gato digno.
//   Sin calaveras (ni el icono R.ICONOS.calavera), sin sombras amenazantes, sin sustos, sin rayos ni ojos que brillan.
// · LAS ANOMALÍAS SON MANCHAS: en el corte del monte y en el mapa, zonas difusas de color (tramadas, de borde blando),
//   NUNCA cuartos con paredes, puertas ni escaleras. Las únicas excepciones son el TRAZO AZUL a rayas «según Reeves»
//   (ladera 'trazo', o.reeves) y las posibilidades del acto 8 (ladera 'trazo', cámara 'posibles'), también a rayas azules:
//   se nota que son hipótesis dibujadas encima, no roca.
// · SIN LETRAS: solo números (R.numero), rayas, iconos y pictogramas. Los cartuchos de los nombres son óvalos con iconos
//   (un sol, un escarabajo, una pluma), nunca jeroglíficos copiados.
// · TODO LO EGIPCIO ES NUESTRO: el ajuar, la máscara, el sarcófago, las capillas, el trono, el busto de la reina y las
//   pinturas de la cámara están INSPIRADOS en lo egipcio pero dibujados por nosotros (no copias de fotos ni de las
//   piezas del museo): proporciones chibi, pictogramas simples, colores planos con tres tonos.
// · NADA DE LA MARCA DE NATIONAL GEOGRAPHIC: ni el rectángulo amarillo, ni su logotipo, ni su amarillo en cajas o marcos;
//   el segundo equipo se reconoce por su aparato distinto (natgeoTU), no por una marca.
// · Las personas reales, por sus atributos y solo con hechos; nada de burla.
// · La esquina de Atom (x 278–318, y 4–44), siempre tranquila (cielo liso o pared en dos tonos casi iguales), y la barra
//   del año (x 20–170, y 0–14; las cifras del año bajan hasta y ≈ 20: nada con detalle en y 0–20 bajo x 20–170).
// Los personajes son los de ELENCO_TU (carterTU, carnarvonTU, reevesTU, eldamatyTU, watanabeTU, porcelliTU, natgeoTU,
// geofisico1TU, geofisica2TU, obrero1TU, obrero2TU, telegrafistaTU, vendedorTU, carterMayorTU, nefertitiTU, akenatonTU,
// tutTU) y los que ya existen (EL.hawass, EL.turista1, EL.turista2, EL.periodista2025, EL.escriba, EL.campesino); las
// piezas, PIEZAS_TU (vela, telegrama, cintaTelegrafo, sello, panelCapilla, cofre, mascara, sarcofago, bustoReina,
// radarMano, radarCarrito, gravimetro, perforadora, camarita, estetoscopio, periodico, lata, escarabajo, murcielago,
// caja, linterna, planoTumba, mapaDensidad). Las dos las escribe pixel-chibi.js (T.PIEZAS_TU, T.ELENCO_TU).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, barandillas)
// va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// Cada encuadre devuelve su geometría: { encuadre, camara, suelo, libre: [x0, x1] (dónde caben los actores de pie), y
// los puntos que nombra su cabecera; ninguno se llama 'camara' ni 'encuadre' }. Lo dibujado tiene que cuadrar con esos números (o se cambian aquí y en las escenas).
// LA BARRA DEL AÑO: tres tramos, 1922–1939 (la vela), 2014–2018 (el radar) y 2019–2027 (la broca). Las escenas antiguas
// (el entierro hacia 1323 a. C., Nefertiti y Akenatón) ponen el año de la escena en que salen (1922, 2015…): la barra no
// tiene tramo antiguo.
//
// CANON COMPARTIDO (lo dibujan varios grupos a la vez: tiene que cuadrar entre decorados)
// · LA CÁMARA PINTADA (NUESTRA), la única sala pintada: fondo ocre amarillo (C.ocre, C.ocreS, C.ocreL), una cenefa
//   alta de rayas de colores (azul, rojo, verde) y un zócalo marrón; en la pared NORTE, tres escenas nuestras de
//   pictogramas grandes: el faraón (corona azul, faldellín blanco) ante una diosa con un disco en la cabeza, ante un
//   dios con cabeza de chacal y, a la derecha, dos figuras abrazadas; en la pared OESTE, doce babuinos sentados en
//   fila (chibis, iguales, en cuatro columnas). El techo, liso y oscuro (no pintado). VISTA FRONTAL de la pared norte
//   (tumba 'pintada' cámara 'pared', escaneo 'escaner' y 'rasante', radares 'pared' y 'segundo' en escorzo): la pared
//   ocupa x 24–270, y 26–148; el suelo de la cámara empieza en y 149. LA PUERTA ESCONDIDA de la pared norte (el
//   rectángulo recto bajo la pintura) está en x 150–224, y 52–148 (alto, con dintel); la de la pared oeste, más
//   pequeña, x 40–92, y 82–148 de su propia vista. Con luz normal NO se ven: solo bajo luz rasante (o.luzRasante) o
//   cuando lo pide la cabecera (o.raya, o.rectangulos).
// · EL SARCÓFAGO, siempre CERRADO: una caja de piedra rojiza de cuarcita (C.cuarcita) con la tapa puesta, diosas con
//   alas abiertas en las esquinas (pictogramas nuestros), sobre el suelo de la cámara. Dentro no se ve nada, nunca.
// · EL CORTE DEL MONTE (ladera 'corte', 'trazo', 'este', 'cortes' y 'luces'; radares 'canon' cámara 'roca' usa el
//   mismo rayado de roca): sección vertical vista desde el este, con el NORTE A LA DERECHA. La ladera sube de
//   izquierda a derecha: superficie en y ≈ 66 en x 0, y ≈ 50 en x 230 y la cumbre, casi plana, en x 240–319, y 46–50
//   (por debajo de la esquina de Atom: cielo liso encima). Roca de caliza en capas (C.caliza, C.calizaS, C.calizaL) con
//   vetas y alguna grieta. LA TUMBA, en ocre claro con su contorno oscuro: la escalera desde la superficie en x 30
//   (y 66) que baja hacia la derecha hasta x 62 (y 98), el pasillo de entrada x 62–112, y 98–110, la antecámara
//   x 112–168, y 92–128 (con su anexo, x 120–150, y 130–144), la CÁMARA PINTADA x 174–214, y 96–130 (con un filo
//   amarillo: es la pintada). El tesoro (al este de la cámara, hacia quien mira) NO se dibuja en el corte: entre la PARED
//   NORTE de la cámara (su lado derecho, x 214) y la mancha fuerte solo hay roca.
//   LAS MANCHAS (o.anomalias 0–1): la fuerte al norte, al otro lado de la pared norte, x 238–276, y 88–128, con dos
//   esquinas rectas en la parte de arriba (la única que tiene algo de recto: lo dice el estudio de 2026); otras dos
//   débiles: x 180–220, y 70–86 y x 90–130, y 74–88. El «pasillo del este» de 2020 (o.pasillo) es una mancha alargada
//   en x 60–150, y 80–90, paralela al pasillo de entrada. LA BROCA (o.broca 0–1) baja en vertical por x 256 desde la
//   superficie (y ≈ 48) hasta la mancha fuerte (y ≈ 96).
// · LA TUMBA EN PLANTA (tumba 'plano', ladera 'mapa'; NORTE ARRIBA): la escalera y el pasillo llegan desde la derecha
//   (el este) y entran por el lado sur-este de la ANTECÁMARA, alargada de este a oeste; el ANEXO, pequeño, sale por
//   abajo a la izquierda (al suroeste); la CÁMARA PINTADA queda ARRIBA de la antecámara (al norte), también alargada de
//   este a oeste, y el TESORO, a su derecha (al este). La pared norte de la cámara es su lado de arriba; la mancha fuerte
//   de 2026, encima de ella (más al norte), y el pasillo del este de 2020, paralelo al pasillo de entrada.
// · EL VALLE DE LOS REYES: un valle seco de caliza ocre y rosada, con acantilados escalonados, cauces de piedras, conos
//   de escombro claro de las excavaciones y, al fondo a la izquierda, el pico en forma de pirámide (cima en x ≈ 60,
//   y ≥ 24, para no pisar el año). Cielo liso de sol casi blanco arriba (la esquina de Atom, en cielo liso). El mismo
//   valle se ve desde la ladera (ladera 'ladera'), entonces más abajo y a la izquierda.
// · LA SEGUNDA PUERTA: un muro de piedras enlucido, con óvalos de sellos (un chacal tumbado sobre nueve arcos: icono
//   nuestro) en filas; el hueco de la vela, arriba a la izquierda (x 120–136, y 70–82 en tumba 'pasillo' cámara 'hueco').
//
//   import * as T from '/atomo/plato/escenas/tu-comun.js';
//   const { E, R, M } = await T.preparar('tu-gancho');
//   T.rodar(E, R, [[0, (t) => T.tumba(R, t, { encuadre: 'pintada', camara: 'pared', raya: 1 })]], { año: 2015 });
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
// el reparto y las piezas del episodio (ELENCO_TU y PIEZAS_TU), los crea pixel-chibi.js; mientras no estén, objetos vacíos
export const PIEZAS_TU = KIT.PIEZAS_TU || {};
export const ELENCO_TU = KIT.ELENCO_TU || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la caliza del valle y del monte (tres tonos y la arena), el ocre de la cámara pintada, el oro del ajuar, el azul
    // lapislázuli y la turquesa, la cuarcita rojiza del sarcófago, la luz de la vela, el azul del trazo «según Reeves» y
    // las manchas de menos densidad
    caliza: '#d8b88a', calizaS: '#a8865c', calizaL: '#f0dcb4', arena: '#e8cc98', arenaS: '#c4a46c', ocre: '#e0a848',
    ocreS: '#b07a2c', ocreL: '#f4cc78', oro: '#f0c040', oroS: '#b07a18', oroL: '#fff0a0', lapis: '#2a4a9a', lapisL: '#4a78c8',
    turquesa: '#3ab0a8', cuarcita: '#a8584a', cuarcitaS: '#783a30', vela: '#ffd27a', velaL: '#fff4c8', trazoAzul: '#4aa8ff',
    mancha: '#5a3a8a', manchaL: '#8a6ac0', adobe: '#c89a6a', noche: '#141828',
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
  const E = await escena(id, 'ep36');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1922–1939 (Carter, la vela, la maldición y Londres), 2014–2018 (la copia, las rayas y los tres
  // radares), 2019–2027 (el pasillo del este, la gravedad y la broca). Sin tramo antiguo: ver la cabecera
  Object.assign(R.ICONOS, {
    vela: ['...#...', '..##...', '...#...', '..###..', '..###..', '..###..', '.#####.'],
    radar: ['#.....#', '.#...#.', '#.#.#.#', '.#.#.#.', '...#...', '..###..', '.#####.'],
    broca: ['.#####.', '..###..', '...#...', '..##...', '...##..', '..##...', '...#...'],
  });
  R.tramosTiempo([[1922, 1939, R.PALA.ORO, 'vela'], [2014, 2018, R.PALA.AZUL ?? R.PALA.ROJO, 'radar'], [2019, 2027, R.PALA.ROJO, 'broca']]);
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


// ── A · El Valle de los Reyes, 1922 (y la entrada de la tumba hoy) ────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en valleDelante (se llama después de los
// actores, con las mismas opciones). Opciones de todo el grupo: o.luz 'dia' (por omisión: sol casi blanco arriba a la
// derecha, sombras azuladas, calima que tiembla sobre los conos) | 'tarde' (todo teñido de rosa y naranja, sol bajo) |
// 'noche' (azul, luna, estrellas que titilan, Vía Láctea, una fugaz; en el valle, un farol con su halo); solo en los
// exteriores (valle, arena, tienda, chozas, escalon, escalera, entrada, cola): los interiores y los insertos de mesa
// (mesa, sellos, telegrafo, cinta) no la usan. o.epoca 1922 (por omisión) | 2014 | 2026 (en el valle, ≥ 2000 es hoy).
// Todo el fondo fijo va en un búfer por vista y luz; lo vivo se pinta encima en cada fotograma.
//   'valle': EL VALLE (canon) al sol en 1922: el pico de pirámide lejano (cima x 60, y 26), acantilados escalonados
//     de caliza en capas a izquierda y derecha (con una terraza en la de la derecha, x 218–268, y 72), bocas de tumbas,
//     conos de escombro claro con obreros diminutos que suben cestas y bajan, otros que cavan al fondo, un burrito con
//     cestas que cruza; el cauce seco de guijarros que baja serpenteando; el raíl de vagonetas con la vagoneta que va y
//     viene empujada por un obrero; la criba en su caballete que otro sacude (cae la arena); cestas de esparto; un
//     toldo de cañas; a la derecha los montones de arena que mira Carter (arena [236, 136]); polvo que sopla, viento,
//     el milano que planea, nubes y cirros a tres velocidades. o.epoca 2026: el sendero asfaltado, el toldo con bancos,
//     papelera, el autobús diminuto, turistas pequeños por el sendero y, en la terraza, la perforadora ESPERANDO
//     (PIEZAS_TU.perforadora, base [242, 72]) con su lona que se agita y una cinta de obra. Devuelve suelo 150, libre
//     [150, 270], arena y (en 2026) perforadora [242, 72]. valleDelante: piedras en las esquinas de abajo y (1922) un
//     pico apoyado. Cámara 'arena': el montón grande de cerca (x 180–319) con la pala clavada (pala [230, 124]: donde
//     entra la hoja; el mango sube hasta y ≈ 92), la criba con piedrecitas (122, 164), la cesta volcada (290, 172), el
//     termo (62, 166), huellas y ondas en la arena, el acantilado detrás con una boca, obreros lejos; el sombrero de
//     Carter en el suelo (160, 170) salvo con o.sombrero false; arena que resbala por la ladera (o.resbala 0–1: de unos
//     granos a una lengua que cae). suelo 156, libre [40, 200].
//   'tienda': la casa de trabajo de adobe de Carter (muro enlucido con desconchones que enseñan el ladrillo, grietas,
//     pretil, cúpula de barro a la derecha, puerta en arco puerta [217, 86, 239, 150], ventana con contraventanas y una
//     maceta), el toldo de lona a rayas crudo y teja que ondea, su sombra, palas y pico apoyados, un rollo de cuerda,
//     tinajas, cajas de embalaje con números de lote, dos sillas de lona, el quinqué que cuelga y se mece (de noche,
//     encendido), el botijo en su trípode que gotea en un charco, el burro atado a la sombra (burro [290, 156]) que
//     masca, una gallina que picotea, moscas. La MESA PLEGABLE va en valleDelante: tablero en y 140 de x 96 a 210, el
//     mantel, el mapa enrollado, la libreta, el fajo de billetes que mengua (o.billetes 0–1) y la taza que humea. Quien
//     esté SENTADO o de pie DETRÁS de la mesa (carnarvonTU) pone los pies en detras = 145: asoman cabeza y hombros.
//     Devuelve suelo 154 (delante), detras 145, libre [40, 250], mesa [96, 140, 210, 144], puerta, burro.
//     Cámara 'mesa' (inserto, desde arriba): tablero de tablas con vetas y la sombra a rayas del toldo, el mantel de
//     cuadros a la izquierda con la taza de té y su vapor (taza [34, 46]), la libreta de cuentas abierta (libreta
//     [94, 12, 194, 98]) cuyas columnas de rayas se van escribiendo con la pluma (o.suma 0–1; con 1, la doble raya y un
//     0 rojo), los billetes de una libra (rayas y un 1) que menguan (o.billetes), el monedero abierto y VACÍO (monedero
//     [224, 150]), la pluma, el tintero, la pipa, las cerillas, una mosca, y el CALENDARIO de mesa con 1922 (calendario
//     [238, 76]) que un trazo rojo va rodeando (o.rodea 0–1). billetes [134, 124].
//   'chozas': el acantilado cerca y alto (casi sin cielo), la boca negra de la tumba de OTRO rey a la izquierda (boca
//     [18, 58, 74, 108]), conos de escombro con una cadena de obreros diminutos y su polvo, un lagarto, cascotes de
//     cerámica, piedras, la piedra de moler (molino [244, 160]) y CUATRO CUARTOS de choza en tres cuartos (muretes de
//     piedra seca de un palmo, suelos de tierra apisonada, hueco de puerta). o.limpio 0–1: las piedras de los muretes
//     se van quitando; o.escalones 0–3 (con decimales): la choza del medio se quita sola y van saliendo los escalones
//     tallados en x 150–200 desde y 150 (diez píxeles cada uno, el que sale aún medio tapado de arena y con polvo).
//     valleDelante: la cesta grande con piedras (x 30, base 178). Devuelve suelo 150, libre [30, 280], escalon [174, 150].
//     Cámara 'escalon' (a ras de suelo): el pico y el valle al fondo, la otra pared de la zanja en sombra, los escalones
//     de detrás que se adivinan (o.escalones), y el primer escalón: roca tallada con marcas de cincel donde ya se ha
//     barrido y arena (con su caballón y la que cae por el filo) donde no. o.barre 0–1: el borde de lo barrido va de
//     x 10 a x 300; el decorado pinta el BRAZO con la mano canónica (T.brazo, manga o.manga, por omisión '#d8c8a8') en
//     ese borde, solo según o.barre (o.mano false lo quita). Devuelve escalon [160, 120] (el filo) y mano [x, 140].
//   'escalera': LOS DIECISÉIS ESCALONES de frente y desde arriba: la zanja que baja alejándose desde el borde de abajo de
//     la pantalla hasta la PUERTA tapiada del fondo (puerta [136, 70, 184, 112]: enlucido claro, dintel de madera, cuatro
//     filas de sellos ovales), la pared izquierda al sol, la derecha en sombra azulada que cae sobre los escalones, el
//     rellano (suelo 117, libre [124, 196]); arriba, el suelo del valle con montones, cestas, una escalera de mano, un
//     rollo de cuerda, un pico, obreros diminutos que pasan con cestas. o.tapada 0–1: la arena vuelve a llenar la zanja
//     desde la puerta hacia la cámara (con 1, tapada del todo; arena que cae de los bordes). Devuelve escalones: 16
//     puntos [x, y] donde poner los pies, del de arriba (junto a la cámara, y ≈ 179) al de abajo (y ≈ 121), y borde
//     [[50, 150], [270, 150]] (sitios para obreros a los lados). Cámara 'sellos' (inserto): el enlucido de la puerta con
//     grietas y desconchones, tres filas de sellos (PIEZAS_TU.sello al doble; uno roto), el más claro en sello
//     [164, 92], la cuerda vieja que se mece, cascotes abajo; la luz de un farol que barre (o.farol 0–1: su x de 30 a
//     290; sin o.farol va y viene) y el resto en penumbra. Devuelve farol [x, y].
//   'telegrafo': la oficina del telégrafo de Luxor (1922): techo de yeso tranquilo y viga, pared encalada con brochazos y
//     manchas de humedad, zócalo azul, el reloj de pared con péndulo y agujas que se mueven, el mapa sin letras (el
//     Nilo y el delta), el casillero de impresos, las pilas de vidrio con sus cables, el ventilador de techo que gira,
//     una salamanquesa, el banco y la tinaja, el suelo de baldosas hidráulicas con la luz de la puerta y motas de polvo;
//     la PUERTA abierta (puerta [244, 58, 296, 156]) con la calle al sol recortada (la casa de enfrente, una palmera,
//     gente que pasa). LA CINTA sale del aparato, corre por el mostrador, cae por su punta y se enrosca por el suelo
//     hasta la puerta (o.cinta 0–1: lo larga que es; devuelve punta [x, y]); EL BURRO (o.burro 0–1) entra por la puerta
//     y, pasada la mitad, masca la punta (devuelve burro: su boca [x, 140]). valleDelante: el MOSTRADOR (x 24–154,
//     tablero en y 141 hasta y 158) con el aparato de cinta de latón (aparato [96, 135]) y sus ruedas que giran, el
//     manipulador que pica, impresos, el sello de goma y el trozo de cinta de encima. El telegrafista (detrás del
//     mostrador) pone los pies en detras = 146. Devuelve suelo 162 (delante), libre [160, 240], mostrador 141.
//     Cámara 'cinta' (inserto): el aparato grande de latón (aparato [70, 90]) con el carrete de papel y las ruedas
//     dentadas que giran, la cinta con sus PUNTOS Y RAYAS que corre (o.corre: velocidad, 1 por omisión), cae en bucles
//     por el canto de la mesa y sube hasta la cabeza del BURRO, que entra por la derecha (o.burro 0–1) y la masca con la
//     oreja que se mueve; detrás, el marco de la puerta y la calle. Devuelve boca [268, 128].
//   'entrada': la ENTRADA de la tumba HOY (2014): el acantilado con otras bocas, la ladera de escombro, el muro de
//     sillares, la boca con su marco, la rampa de escalones y la luz de dentro (boca [120, 92, 180, 152]), el toldo de
//     lona en palos de metal con su sombra, la caseta del guarda (caseta [26, 104, 66, 150]: puerta verde, ventanilla
//     con la tele que cambia, el aire acondicionado que gotea, su silla), el letrero de rayas con la cámara tachada,
//     un banco de piedra, el enlosado, un gato que mueve la cola y la COLA de turistas pequeños que baja en zigzag por
//     el sendero hasta el valle y avanza a ratos (o.cola 0–1: cuántos). valleDelante: la barandilla de metal a los dos
//     lados de la rampa (x 100–120 y 180–200, y 138–156). Devuelve suelo 152, libre [20, 300], cola (el sendero).
//     Cámara 'cola' (de lado, a la altura de las cabezas): la lona del toldo arriba, el muro de sillares con el sol que
//     entra en diagonal, el termómetro (40), el letrero de la cámara tachada, la cámara de vigilancia con su piloto, el
//     extintor, el cable de la luz, botellas de agua en el poyete, el pasamanos, el suelo de losas y, a la derecha, la
//     BOCA con su reja abierta y los escalones que bajan (boca [258, 30, 319, 166]); el ALIENTO de la cola (o.aliento
//     0–1): nubecillas que suben de las bocas y la tumba se traga. Devuelve suelo 166, libre [20, 250], cola [30, 250].
const V_VALLE = {
  valle: { cam: 'arena', general: { col: ['#f0dcb4', '#a8865c'], geo: { suelo: 150, libre: [150, 270], arena: [236, 136] } }, arena: { col: ['#e8cc98', '#c4a46c'], geo: { suelo: 156, libre: [40, 200], pala: [230, 124] } } },
  tienda: { cam: 'mesa', general: { col: ['#e8d8b0', '#8a6a48'], geo: { suelo: 154, detras: 145, libre: [40, 250], mesa: [96, 140, 210, 144] } }, mesa: { col: ['#c8a070', '#6e5034'], geo: { suelo: 180, libre: [0, 0], calendario: [238, 76], billetes: [134, 124] } } },
  chozas: { cam: 'escalon', general: { col: ['#e0c49a', '#a07a50'], geo: { suelo: 150, libre: [30, 280], escalon: [174, 150] } }, escalon: { col: ['#e8cc98', '#9a7448'], geo: { suelo: 132, libre: [0, 0], escalon: [160, 120], mano: [176, 140] } } },
  escalera: { cam: 'sellos', general: { col: ['#d8b88a', '#7a5a3a'], geo: { suelo: 117, libre: [124, 196], puerta: [136, 70, 184, 112] } }, sellos: { col: ['#d0bc98', '#8a6a48'], geo: { suelo: 176, libre: [0, 0], sello: [164, 92] } } },
  telegrafo: { cam: 'cinta', general: { col: ['#ece4d4', '#8a7a62'], geo: { suelo: 162, detras: 146, libre: [160, 240], mostrador: 141, aparato: [96, 135], puerta: [244, 58, 296, 156] } }, cinta: { col: ['#f4ecd8', '#6a5a48'], geo: { suelo: 170, libre: [0, 0], boca: [268, 128] } } },
  entrada: { cam: 'cola', general: { col: ['#ecd8b0', '#8a7058'], geo: { suelo: 152, libre: [20, 300], boca: [120, 92, 180, 152] } }, cola: { col: ['#e4d0a8', '#7a6048'], geo: { suelo: 166, libre: [20, 250], cola: [30, 250] } } },
};
export function valle(R, t, o = {}) {
  const enc = V_VALLE[o.encuadre] ? o.encuadre : 'valle', e = V_VALLE[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const f = A_VISTAS[enc + '|' + cam];
  if (!f) return vista(R, t, { ...o, encuadre: enc, camara: cam }, V_VALLE);
  const geo = f(R, t, o) || {};
  return { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)), ...geo };
}
// lo de delante de los personajes en cada encuadre de valle(); se llama después de los actores, con las mismas opciones
export function valleDelante(R, t, o = {}) {
  const enc = V_VALLE[o.encuadre] ? o.encuadre : 'valle', e = V_VALLE[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const f = A_DELANTE[enc + '|' + cam];
  return f ? f(R, t, o) || {} : {};
}
// ── B · Dentro de la tumba (la antecámara, la cámara pintada NUESTRA, el sarcófago CERRADO) ───────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (la de
// V_TUMBA más lo que diga cada uno). Lo de delante de los personajes va en tumbaDelante (se llama después de los
// actores, con las mismas opciones; lo pintan 'pasillo', 'capillas', 'pintada' de 2015 y 'escriba'). CUIDADO: la momia
// NO se ve nunca (el sarcófago, CERRADO; ningún ataúd abierto; nada envuelto en vendas); el ajuar, la máscara, el trono,
// los carros, las camas, las estatuas y las capillas son NUESTROS y SIN CARA (siluetas: las cabezas de animal de las
// camas, las estatuas guardianas, las figuras de las pinturas y las diosas del sarcófago no llevan ojos ni boca; la
// única cara es la de la máscara de oro, PIEZAS_TU.mascara). Cada vista pinta lo fijo una vez en un búfer y encima la
// LUZ en una sola pasada (b_luz): la llama (cálida, tiembla, el resto se va al azul de la noche) o la bombilla (blanca).
// Opciones del grupo: o.vela 0–1 (la luz de la vela: 1 por omisión en 'pasillo', 'antecamara' y 'mascara' cámara
// 'sarcofago'; en 'pintada', 0 por omisión, suma una vela a la luz de la época); o.llama [x, y] (dónde está la llama
// de la vela, en 'pasillo', 'antecamara' y 'pintada'); o.epoca 1922 | 2015 (en 'pintada': 2015 por omisión, luz eléctrica y pasarela;
// 1922: farol, cajones de embalaje y una escalera de mano). 'capillas' y 'escriba' son siempre de la época antigua.
//   'pasillo': el pasillo de bajada en 1922, de noche: techo de roca bajo, la pared de roca picada a cincel (tajos,
//     vetas, grietas, nichos), la escalera de perfil al fondo a la izquierda que sube a su boca con la noche estrellada
//     (estrellas que titilan y alguna fugaz, recortadas a la boca), la hija de Carnarvon y un ayudante esperando en la
//     escalera (siluetas que se mecen; o.siluetas false las quita), montones de cascotes, un pico, una cesta de
//     esparto, una tabla y una cuerda; a la derecha LA SEGUNDA PUERTA (canon) con su dintel de madera, el enlucido, las
//     filas de sellos (PIEZAS_TU.sello) y la cuerda vieja, con el hueco abierto (o.abierta 0–1, 1 por omisión; o.oro
//     0–1: los destellos de dentro). Arenilla que cae del techo, motas en la luz. o.murcielago: un murciélago simpático
//     que sale de la boca (no sale si no se pide). Luz: la vela de Carter en o.llama (por omisión [214, 126]) y el farol
//     del suelo. En tumbaDelante: el farol (latón y cristal, con su llama) en farol y piedras en primer término.
//     Cámara 'hueco' (inserto): LA SEGUNDA PUERTA DE CERCA: piedras enlucidas, sellos grandes, el dintel; el hueco que se
//     abre piedra a piedra (o.abierta 0–1, en cuatro golpes, con polvo; mientras se abre, un cincel clavado en la grieta
//     que da un respingo con cada golpe) y el oro de dentro (o.oro); la VELA (PIEZAS_TU.vela, s 2) en la mano de Carter
//     (T.brazo desde abajo) que se acerca (o.acerca 0–1; con 1, la llama en vela); o.soplo 0–1: la llama se dobla y se
//     acorta y, pasado 0,8, se apaga (hilo de humo); o.enciende 0–1: la otra mano trae una cerilla encendida y, pasado
//     0,55, la vela vuelve a arder. (tu-gancho, tu-vela.)
//   'antecamara': LA ANTECÁMARA ABARROTADA vista por el hueco (el filo de piedra rota alrededor): los carros
//     desmontados (ruedas de seis radios, la caja volcada, las varas), las tres camas rituales en fila (vaca con manchas,
//     cuernos de lira y disco; león; hipopótamo: siluetas doradas sin cara), cajas y cofres apilados hasta arriba, el
//     TRONO, la puerta tapiada con sus sellos entre las dos estatuas guardianas negras y doradas, cofres pintados
//     (PIEZAS_TU.cofre), cestas, jarras de alabastro, cajas ovaladas, un taburete, un escabel y un fardo de arcos.
//     o.oro 0–1: los destellos del oro se encienden poco a poco (golpe en «cosas maravillosas»). o.vela 1 por omisión
//     (la llama entra por el hueco, abajo en medio; con 0, el foco eléctrico blanco de 1923). Sin suelo libre: los
//     actores no entran. Cámara 'ajuar': de cerca, a la luz de la vela: el trono grande en tres cuartos (patas de león,
//     cojín rojo, alas en el brazo, respaldo de lapislázuli con un sol), el cofre con la tapa pintada (un carro con su
//     caballo, gacelas que huyen, flechas), el vaso de loto encima, una rueda de carro detrás, el abanico de plumas,
//     cuentas por el suelo; brillos que corren por el oro con la llama (alrededor de brillo). (tu-vela.)
//   'plano': el PLANO DE LA TUMBA (NUESTRO, canon en planta) sobre papel de calco cuadriculado en la mesa de dibujo: la
//     escalera y el pasillo desde la derecha, la antecámara, el anexo, la cámara pintada en ocre con el sarcófago y el
//     tesoro; la rosa de los vientos (flecha), la escala (0 y 10), cotas, regla, escuadra, lápiz que rueda, goma, una
//     mosca que se pasea y la esquina del papel que se levanta. o.contar 0–4: los cuartos se encienden uno a uno con su
//     número (1 antecámara, 2 anexo, 3 cámara pintada, 4 tesoro); o.comparar 0–1: de arriba abajo se desenrolla otra
//     hoja con el plano rojo de la TUMBA DE UN REY GRANDE (escaleras, pasillos, pozo, salas de pilares, cripta y diez
//     cuartos) en grande, mientras la de Tutankamón se encoge a la mitad hacia la esquina de abajo a la izquierda
//     (tutChica; sin números cuando se encoge). Cámara 'apretado' (inserto): LA ANTECÁMARA EN PLANTA (muros de
//     tinta y roca rayada, sus puertas) llenándose de objetos vistos desde arriba (cajas, cofres, camas con su cabeza,
//     ruedas, jarras, cestas: o.objetos 0–1, caen uno tras otro hasta no caber una aguja) y la etiqueta de cartón que
//     se mece con el contador que sube hasta 5000 (o.cuenta 0–1, R.numero). (tu-pequena.)
//   'capillas': la cámara del sarcófago en la ÉPOCA ANTIGUA, a la luz de tres lámparas de aceite: la pared norte
//     pintada (canon) al fondo, la capilla dorada a medio montar (el panel de atrás con relieves, el poste, la viga
//     curva) alrededor del sarcófago CERRADO, paneles de repuesto apoyados, rodillos de madera, el andamio de dos palos
//     con la polea, cestos y cuerdas. o.panel 0–1: un panel (PIEZAS_TU.panelCapilla, s 2, AL REVÉS: la flecha apunta
//     abajo) sube por las cuerdas (hasta 0,6) y se encaja a la derecha de la capilla; la cuerda baja hasta cuerda, donde
//     tira un obrero. En tumbaDelante: la lámpara del suelo. Cámara 'panel' (inserto): el panel dorado de cerca y AL
//     REVÉS (el pájaro con las alas abiertas, el ojo y el sol cabeza abajo, la flecha roja apuntando abajo) entre los
//     paneles ya montados al derecho (su flecha, arriba), colgado de dos cuerdas, con las dos manos del obrero que lo
//     empujan (T.brazo); o.duda 0–1: la mano derecha se va (a rascarse) y sale una «?» (R.icono). (tu-pequena.)
//   'pintada': LA CÁMARA PINTADA en tres cuartos (canon): la pared norte de frente a la derecha, la oeste en escorzo a
//     la izquierda con los doce babuinos, el sarcófago CERRADO en el centro, el techo oscuro, el suelo de losas. Con
//     2015: la pasarela de madera, dos focos colgados con su cable y un cartelito de cámara tachada (pictograma);
//     o.aliento 0–1: nubecillas blancas que suben de las bocas (o.bocas [[x, y]…], por omisión las de x 70 y 250) y las
//     manchas de humedad verdosas con gotitas en el yeso. Con 1922: farol sobre un cajón, cajones y escalera. La
//     barandilla de la pasarela (2015) va en tumbaDelante (pasamanos en y 160–164 y tabla baja: tapa las piernas, no
//     las caras). Cámara 'pared' (inserto): LA PARED NORTE DE FRENTE (canon: x 24–270, y 26–148) con sus tres escenas,
//     las columnas de signos que no se leen, la cenefa, el zócalo y las manchitas marrones del tiempo; a los lados las
//     esquinas de las paredes oeste (babuinos) y este (en sombra, sin cenefa: la esquina de Atom queda en el techo);
//     el suelo de losas con un cepillo y una regla; una polilla revolotea en la luz del foco. o.raya 0–1: la LÍNEA RECTA del dintel de la puerta escondida (y 52,
//     x 150–224) que asoma desde el centro como una arruga; o.luzRasante 0–1: un foco bajo desde la izquierda y la
//     puerta escondida entera en luz y sombra; o.rectangulos 0–1: su contorno recto, fino; o.grietas 0–1: grietas finas
//     del yeso; o.mazo 0–1: un mazo de cantero en la mano (T.brazo) entra por la derecha y SE DETIENE a un palmo (su
//     sombra en la pared se afina al acercarse); o.para 0–1: tiembla y se retira. (tu-gancho, tu-pequena, tu-agujero.)
//   'escriba': un TALLER ANTIGUO de la necrópolis, al sol: el cielo tramado con nubes de tres tonos y pájaros, los
//     acantilados con el pico de pirámide, el muro de adobe con su puerta a la calle (una cabra pasa, recortada), el
//     toldo de cañas que el viento mece y su sombra con puntos de sol, estantes con jarras, cajas y cofres a medio
//     pintar, botes de pigmento, la tinaja de agua, una escoba, cacharros secándose, la piedra de moler del aprendiz
//     (molino) y, en cofre, el cofre del escriba (PIEZAS_TU.cofre) en su soporte bajo (o.cartucho: 'sol' por omisión,
//     'ankh', 'raspado', 'nuevo' o false; o.cofre false: sin cofre, lo pinta la escena). En tumbaDelante: la mesa baja
//     con los botes, los pinceles y una paleta. Cámara 'cartucho' (inserto): la tapa del cofre de cerca (estuco, cenefas,
//     lotos, el sol con alas) y el CARTUCHO (óvalo de oro) con los iconos de OTRA persona (pluma, sol, escarabajo);
//     o.raspa 0–1: una cuchilla de cobre en la mano lo raspa de izquierda a derecha (virutas, el yeso blanco rayado y el
//     borde de lo que había); o.pinta 0–1: un pincel de junco pinta encima sol, ankh y cesta, uno tras otro. Las
//     sombras de las cañas del toldo se mecen. (tu-pequena.)
//   'mascara': la MÁSCARA DE ORO (NUESTRA: PIEZAS_TU.mascara, s 3) sobre un paño azul en su peana, dentro de una
//     vitrina con marco de latón, dos focos con sus conos de luz; o.brillo 0–1: el reflejo que cruza el cristal (por
//     omisión pasa solo, despacio); al fondo, la sala del museo en penumbra (columnas, vitrinas con jarras, la puerta a
//     la sala de al lado por la que cruza un visitante, recortado), un vigilante que pasea y el suelo pulido. Cámara
//     'sarcofago': EL SARCÓFAGO CERRADO de lado y grande, con su tapa, las diosas aladas de las esquinas (solo alas y
//     silueta) y el disco con alas, una guirnalda de flores secas encima, la pared pintada al fondo y una vela en su
//     candelero en el suelo (o.vela 1 por omisión). (tu-pequena.)
// NOTA: el sarcófago grande de estas vistas es de C.cuarcita (rojizo, como dice el canon); la pieza PIEZAS_TU.sarcofago
// del kit es más clara (#d6ae7a): si sale al lado de una de estas vistas, que la escena lo tenga en cuenta.
const V_TUMBA = {
  pasillo: { cam: 'hueco', general: { col: ['#6a5038', '#2a1c14'], geo: { suelo: 156, libre: [40, 190], puerta: [200, 56, 286, 156], hueco: [228, 84], farol: [118, 176], llama: [214, 126], escalera: [0, 24, 66, 150] } }, hueco: { col: ['#c8b08a', '#3a2a1c'], geo: { suelo: 180, libre: [0, 0], puerta: [40, 30, 270, 180], hueco: [128, 76], vela: [126, 104] } } },
  antecamara: { cam: 'ajuar', general: { col: ['#8a6030', '#2a1808'], geo: { suelo: 160, libre: [0, 0], trono: [172, 108], puerta: [238, 54, 272, 114], estatuas: [[224, 116], [290, 116]], camas: [[114, 70], [148, 76], [182, 82]], carros: [10, 60, 120, 134] } }, ajuar: { col: ['#c89038', '#3a2410'], geo: { suelo: 170, libre: [0, 0], brillo: [150, 90], trono: [196, 120], cofre: [18, 108, 132, 170], rueda: [82, 82], abanico: [258, 100] } } },
  plano: { cam: 'apretado', general: { col: ['#e8e4d4', '#8a9aa8'], geo: { suelo: 180, libre: [0, 0], hoja: [16, 40, 272, 172], cuartos: [[78, 116], [63, 140], [72, 86], [112, 86]], plano: [40, 66, 170, 150], grande: [104, 48, 268, 175], tutChica: [26, 116, 92, 160] } }, apretado: { col: ['#ece4cc', '#a08a60'], geo: { suelo: 180, libre: [0, 0], contador: [274, 150], sala: [26, 38, 228, 162] } } },
  capillas: { cam: 'panel', general: { col: ['#a07038', '#3a2410'], geo: { suelo: 160, libre: [20, 300], sarcofago: [120, 112, 200, 150], capilla: [104, 74, 216, 152] } }, panel: { col: ['#e0b040', '#7a5018'], geo: { suelo: 180, libre: [0, 0], panel: [70, 36, 250, 160] } } },
  pintada: { cam: 'pared', general: { col: ['#e0a848', '#5a3a1c'], geo: { suelo: 170, libre: [24, 296], sarcofago: [122, 118, 206, 156], pared: [146, 50, 304, 148] } }, pared: { col: ['#f4cc78', '#b07a2c'], geo: { suelo: 172, libre: [30, 270], pared: [24, 26, 270, 148], puerta: [150, 52, 224, 148], mazo: [262, 96] } } },
  escriba: { cam: 'cartucho', general: { col: ['#e8d0a0', '#8a6038'], geo: { suelo: 154, libre: [30, 280], cofre: [150, 132], mesa: [56, 150, 118, 176], molino: [250, 156], puerta: [28, 92, 56, 134] } }, cartucho: { col: ['#d8a860', '#6a4420'], geo: { suelo: 180, libre: [0, 0], cartucho: [100, 50, 220, 140] } } },
  mascara: { cam: 'sarcofago', general: { col: ['#1e2850', '#0c1030'], geo: { suelo: 180, libre: [0, 0], mascara: [160, 86], vitrina: [100, 24, 220, 136] } }, sarcofago: { col: ['#7a4a3a', '#2a1810'], geo: { suelo: 166, libre: [20, 300], sarcofago: [70, 90, 250, 156], vela: [278, 147] } } },
};
export function tumba(R, t, o = {}) {
  const enc = V_TUMBA[o.encuadre] ? o.encuadre : 'pasillo', e = V_TUMBA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const geo = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) };
  const pinta = B_VISTAS[enc + '.' + cam];
  if (!pinta) return vista(R, t, o, V_TUMBA);
  const extra = pinta(R, t, o, geo);
  return Object.assign(geo, extra || {});
}
// lo de delante de los personajes en cada encuadre de tumba(); se llama después de los actores, con las mismas opciones
export function tumbaDelante(R, t, o = {}) {
  const enc = V_TUMBA[o.encuadre] ? o.encuadre : 'pasillo', e = V_TUMBA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const pinta = B_DELANTE[enc + '.' + cam];
  return pinta ? pinta(R, t, o) || {} : {};
}
// ── C · El Cairo, 1923, y Londres, 1939 ───────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno; un encuadre que no existe cae en 'calle'). Pinta
// los 320 × 180 y devuelve la geometría del encuadre ({ encuadre, camara, suelo, libre: [x0, x1], y sus puntos, abajo }).
// Lo de delante de los personajes va en cairoDelante (se llama DESPUÉS de los actores, con las mismas opciones). CUIDADO:
// la «maldición» es un INVENTO DE PERIÓDICO: titulares de rayas gruesas, el pictograma (una pirámide lisa SIN OJO y
// un «!» rojo), gente que grita y un gato digno; SIN calaveras, momias, ataúdes, sombras ni rayos.
// Carnarvon murió de una infección: nada de cama ni de enfermo; basta una ventana que se apaga. Nada tiene letras.
//   'calle' (general, de día; año 1923): el cielo tramado con nubes de tres tonos a tres velocidades, dos milanos que
//     planean, palomas alrededor del palomar; al fondo, en la calima, la ciudad y la mezquita (cúpula y dos alminares de
//     lápiz, x 156–212, cimas en y 28) y la bocacalle con la palmera que se mece (x 176). Tres casas: A (x 0–70, estuco
//     arena, celosía grande y el CAFÉ de tres arcos con mesas en la acera, parroquianos con fez, pipa de agua que humea y
//     el camarero con bandeja que va y viene), B (x 72–146, rosada, palomar de listones en la azotea, humo de un fogón,
//     balcón de hierro con ropa tendida que se mueve, tienda de cacharros de cobre y tienda de alfombras con toldos rojo y
//     verde que ondean), C (x 206–319, ocre, almenas, celosía alta, confitería con toldo verde y la puerta verde de arco
//     con el GATO sentado en el escalón, x 296, y 119, que a ratos se lame). La acera de enfrente (y 118–125) con gente
//     pequeña que pasa (o.gente 0–1: cuánta) y el VENDEDOR PEQUEÑO de la esquina (x 200) que grita con su «!»; la calzada
//     (y 126–146) con el carro del burro (carril de enfrente, y 133), el TRANVÍA crema (rieles y 137–140, de izquierda a
//     derecha, con su trole al hilo de y 100) y el coche de 1923 (carril de este lado, y 146); la acera de este lado (y
//     150–179) de losas grandes, la farola de hierro (x 12), la reja (x 232–250, y 163–168), un papel que corre con el aire
//     y el CARRITO DE LAS NARANJAS (x 258–312, ruedas en y 168, sombrilla a rayas y balanza que se balancea). Cámara
//     'vendedor' (de cerca): la pared alta tranquila; el CAFÉ (x 0–140): toldo grande a rayas con fleco que ondea,
//     rótulo verde de rayas con dos tazas, el escaparate con el dentro vivo (azulejos, espejo, estantes, lámparas de
//     latón que se mecen, la cafetera que humea, cuatro parroquianos que juegan al tablero y el reflejo del tranvía que
//     pasa); el pilar a franjas rojas y crema, la pared de sillares con dos carteles de rayas (uno con el pictograma),
//     el farol que se mece (x 208), el cajón con los fajos atados (x 150–196, y 125–166; la hoja de arriba se levanta) y
//     la casa de la derecha: arco de dovelas rojas y crema con celosía en el tímpano, puerta claveteada (x 224–276,
//     y 71–138) y el ESCALÓN (x 206–319, y 138–150). En la acera (y 150–179), el PERIÓDICO TIRADO (x 204–276, y 160–177)
//     con su titular y el pictograma, y una paloma que picotea. o.gato 0–1: el gato sentado en el escalón (x 300) → anda
//     por él hacia la izquierda (0,12–0,55) → salta a la acera (0,55–0,68) → da una vuelta (0,68–0,84) → SE SIENTA
//     ENCIMA del periódico (x 244, y 170) y, con 1, se lame una pata. (tu-maldicion; la cámara, también tu-gancho.)
//     Devuelve suelo 154, libre, vendedor, tranvia, gatoCalle, carrito…; en la cámara, suelo 166, periodico, gato: [x, y]
//     (dónde está ahora), escalon, puertaCasa y pila.
//   'hotel' (general, de tarde; 1923): cielo malva y naranja con nubes rosadas y vencejos, el sol bajo a la izquierda
//     (x 12, y 70) tras una palmera; la fachada (x 30–270): balaustrada con jarrones, frontón, ventanas altas con
//     contraventanas verdes, balcones de hierro con toldillos a rayas (las ventanas se van encendiendo), la galería de
//     arcos con faroles que tiemblan; la entrada con marquesina, la PUERTA de cristales encendida (x 136–164, y 100–140)
//     y cuatro escalones con alfombra roja (x 128–172, y 140–155); la explanada de baldosas a cuadros con las sombras
//     largas; tres veladores con sombrilla y clientes que toman el té (x 34, 86, 216; y 146), el camarero que va y viene,
//     el PORTERO con fez (x 182) que se inclina, dos farolas (x 112 y 188) y el COCHE NEGRO que espera con el motor en
//     marcha y su chófer (x 238–300, ruedas en y 168). cairoDelante: la balaustrada de la terraza abajo a la izquierda
//     (x 0–66, y 136–179) con su jarrón de geranios y la palmera enana en maceta (x 300–319). Cámara 'ventana' (de
//     NOCHE): a la izquierda (x 0–56) el cielo con estrellas, la luna (x 34, y 52), una nube que la cruza y la ciudad en
//     sombra con ventanas encendidas; la pared con su esquina de sillares; la VENTANA (cristal x 100–220, y 42–148) de
//     dos hojas, con las contraventanas verdes abiertas, y dentro el cuarto: papel pintado, cortinas de encaje que se
//     mueven y la LÁMPARA sobre la mesita (x 160, y 112). o.apaga 0–1: la lámpara se apaga, el cuarto queda azul y
//     aparece el reflejo de la luna en el cristal (x 196, y 62); con luz, la luz cae en el alféizar y las contraventanas
//     y revolotean tres polillas. En el alféizar (y 150), el TELEGRAMA doblado (PIEZAS_TU.telegrama, x 182) y una maceta
//     de albahaca; a la derecha, la buganvilla que trepa, el bajante y la sombra de una palma que se mece. (tu-maldicion.)
//     Devuelve suelo 156, libre, puerta, escalones, coche, terraza; en la cámara, ventana, lampara, telegrama y luna.
//   'redaccion' (general, de día; 1923): techo con vigas, dos ventanales de arco con cielo y alminar, y la luz que entra
//     en diagonal con motas; el reloj de pared con su péndulo (x 100), un mapa sin letras, el TUBO NEUMÁTICO de latón
//     (x 178) por el que baja una cápsula cada 5 s, el zócalo de cuarterones, las mesas del fondo con máquinas de
//     escribir, teléfonos de candelero (uno suena), montones de papel y tres redactores pequeños que teclean o hablan;
//     las lámparas verdes colgantes que se mecen; el perchero; la MAMPARA de cristal (x 196–306, y 50–130) y tras ella la
//     ROTATIVA: seis rodillos que giran, la banda de papel con la impresión que corre, el engranaje, el operario que la
//     recorre y la pila de ejemplares. o.rotativa 0–1: la velocidad y cuántos periódicos salen por el montante y vuelan
//     por la sala hasta el suelo. cairoDelante: la MESA del redactor (tablero x 28–137 en y 145, frente hasta y 179) con
//     la máquina de escribir (x 36–62) cuyas teclas golpean, las cuartillas, el teléfono de candelero (x 90), el pincho y
//     sus cajones; el redactor (EL.periodista2025) va detrás, en x 100–124 (suelo 154), y asoma cabeza y hombros. Cámara
//     'periodico' (inserto desde arriba): la mesa de nogal, el tintero con la pluma, las gafas, las tijeras, el lápiz y
//     la taza de café que humea (x 292, y 130); el PERIÓDICO (x 58–262, y 24–174): cabecera negra de rayas, el TITULAR de
//     dos barras gordas que crece de izquierda a derecha (o.titular 0–1, x 72–248, y 39–57), el pictograma grande
//     (x 78–141, y 70–101) y las columnas de rayas; o.copias 0–1: tres periódicos de otros países (cabeceras granate,
//     azul y verde, nunca amarillo) caen encima uno tras otro, cada uno con su pictograma. (tu-maldicion.) Devuelve
//     suelo, libre, rotativa, mesa, redactor, tubo, reloj, mampara; en la cámara, titular, hoja, picto y taza.
//   'londres' (general, marzo de 1939): cielo de niebla con nubes grises y pájaros, otra fila de casas en sombra, la
//     FILA DE CASAS ADOSADAS (cuatro de 80 px): tejado de pizarra, chimeneas con humo que se tumba (ninguna bajo Atom),
//     ladrillo oscuro, ventanas de guillotina (algunas encendidas), balcones de hierro, planta baja estucada con puertas
//     de color, montantes, escalinatas y la verja de lanzas; gente con bombín, paraguas y gabardina que pasa (y 125) y un
//     guardia quieto (x 302); el AUTOBÚS rojo de dos pisos (sin rótulos, carril de enfrente, y 137) y el TAXI negro
//     (carril de este lado, y 146); la acera mojada (y 151–179) con charcos, el PLÁTANO sin hojas (x 236), el BUZÓN rojo
//     sin escudo (x 285–295, y 126–155) con dos palomas y la FAROLA DE GAS (x 52, farol en y 84–91) con su halo que tiembla.
//     o.niebla 0–1: los jirones de niebla que se arrastran (más espesos lejos). cairoDelante: la verja negra de lanzas en
//     la esquina de abajo a la izquierda (x 0–48, y 142–179). Cámara 'puerta': la pared de ladrillo en aparejo flamenco
//     (tranquila arriba a la derecha), la ventana de la planta baja de la izquierda y la fachada estucada con la ventanita
//     del sótano, la VERJA de lanzas (x 0–124, y 137–166) y la farola de gas encendida (x 18, farol y 50–63); el PÓRTICO
//     (pilastras x 126–208) con el montante en abanico y el número 9 (R.numero), la PUERTA negra de cuarterones (x 142–192,
//     y 106–158) con la aldaba (x 167, y 124), el buzón de cartas y el pomo de latón; dos escalones (x 128–206, y 158–165)
//     con dos botellas de leche y el limpiabarros; el BASTÓN apoyado en la jamba (x 198–207; o.baston false: no está); a
//     la derecha la ventana de guillotina encendida con visillos (x 218–298, y 69–128) y la jardinera de geranios que se
//     mecen; la acera mojada (y 166–179) con hojas secas en el rincón y otras que el viento arrastra (o.hojas 0–1:
//     cuántas) y un poco de niebla (o.niebla). cairoDelante: el poste de la verja con su pomo (x 0–8, y 129–179).
//     (tu-maldicion.) Devuelve suelo, libre, buzon, farola, calzada; en la cámara, puerta, escalon, aldaba y ventana.
const V_CAIRO = {
  calle: { cam: 'vendedor', general: { col: ['#e8d0a0', '#8a6a48'], geo: { suelo: 154, libre: [20, 252], vendedor: [110, 154], carrito: [258, 312, 168], acera: [150, 180], calzada: [126, 146], cafe: [4, 68], tranvia: 141, gatoCalle: [296, 119] } }, vendedor: { col: ['#e0c898', '#7a5a3a'], geo: { suelo: 166, libre: [20, 196], vendedor: [104, 166], periodico: [204, 160, 276, 177], gato: [300, 139], escalon: [206, 319, 139], puertaCasa: [224, 42, 276, 138], pila: [150, 125, 196, 166] } } },
  hotel: { cam: 'ventana', general: { col: ['#f0dcb0', '#9a7a52'], geo: { suelo: 156, libre: [72, 222], puerta: [150, 152], escalones: [134, 178, 140, 154], coche: [238, 300, 168], terraza: [0, 126, 146], sol: [12, 70] } }, ventana: { col: ['#2a3460', '#141828'], geo: { suelo: 180, libre: [0, 0], ventana: [100, 42, 220, 150], lampara: [160, 112], telegrama: [182, 152], luna: [34, 52] } } },
  redaccion: { cam: 'periodico', general: { col: ['#c8b898', '#5a4a38'], geo: { suelo: 154, libre: [142, 240], rotativa: [196, 50, 306, 128], mesa: [28, 145, 137, 179], redactor: [110, 154], tubo: [178, 0, 178, 108], reloj: [100, 34], mampara: [196, 50, 306, 130] } }, periodico: { col: ['#ece4cc', '#7a6a50'], geo: { suelo: 180, libre: [0, 0], titular: [72, 39, 248, 57], hoja: [58, 24, 262, 174], picto: [78, 70, 141, 101], taza: [292, 130] } } },
  londres: { cam: 'puerta', general: { col: ['#9aa4b0', '#4a4040'], geo: { suelo: 156, libre: [20, 270], arbol: [236, 152], buzon: [290, 155], farola: [52, 156], calzada: [126, 146] } }, puerta: { col: ['#8a8a92', '#3a2a28'], geo: { suelo: 166, libre: [20, 132], puerta: [142, 106, 192, 158], escalon: [128, 206, 158], aldaba: [167, 124], baston: [198, 124, 207, 158], ventana: [218, 70, 298, 128] } } },
};
export function cairo(R, t, o = {}) {
  const { enc, cam, geo } = c_vista(o);
  const f = { calle: { general: c_calle, vendedor: c_vendedor }, hotel: { general: c_hotel, ventana: c_ventana }, redaccion: { general: c_redaccion, periodico: c_periodico }, londres: { general: c_londres, puerta: c_puerta } }[enc][cam];
  return Object.assign(geo, f(R, t, o) || {});
}
// lo de delante de los personajes en cada encuadre de cairo(); se llama después de los actores, con las mismas opciones:
// 'hotel' (general): la balaustrada de piedra de la terraza con su jarrón y su geranio, en la esquina de abajo a la
// izquierda (x 0–58, y 146–180), y la maceta con la palmera enana de la derecha (x 300–319); 'redaccion' (general): la
// mesa del redactor (tablero x 28–132 en y 144, la máquina de escribir a la izquierda, x 36–62, el teléfono de
// candelero, la bandeja de papeles y el cenicero; el redactor se pone detrás, en x 96–124, y asoma cabeza y hombros);
// 'londres' (general): la verja negra de lanzas de la casa de delante, en las dos esquinas (x 0–40 y x 286–319,
// y 146–180); 'londres' cámara 'puerta': el poste de la verja con su pomo, a la izquierda (x 0–14). En los demás, nada.
export function cairoDelante(R, t, o = {}) {
  const { enc, cam } = c_vista(o);
  if (enc === 'hotel' && cam === 'general') return c_hotelDelante(R, t, o);
  if (enc === 'redaccion' && cam === 'general') return c_redaccionDelante(R, t, o);
  if (enc === 'londres') return c_londresDelante(R, t, o, cam);
  return {};
}
// ── D · El escaneo y la copia (2009–2015) ─────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en escaneoDelante (se llama después de los
// actores, con las mismas opciones). La cámara pintada y su pared norte, las del CANON (x 24–270, y 26–148 de frente; la
// puerta escondida en x 150–224, y 52–148), con las mismas figuras que la tumba del grupo B.
//   'escaner': la cámara pintada (canon, la pared norte de frente, la oeste con los babuinos en escorzo a la izquierda,
//     el techo oscuro, el suelo de losas con una pasarela de tablones) con EL ESCÁNER: un raíl de aluminio sobre patas
//     a lo largo de la pared (x 18–278, y 150–155, con topes), un carro con un mástil vertical y el CABEZAL que sube y
//     baja solo (con t) echando luz fría sobre la pintura; la cadena portacables; dos focos de LED en trípode en las
//     esquinas; un rollo de cable y una maleta junto al zócalo; a la derecha, el sarcófago (cerrado) tapado con una
//     sábana. o.pasada 0–1 (0.45 por omisión): el carro avanza por el raíl (x 40 → 252) y deja detrás una MALLA azul
//     fina sobre la pintura ya escaneada. escaneoDelante: la mesita plegable de la izquierda (x 2–62, tablero y 152) con
//     el portátil (la pared en grises que se completa con o.pasada), los guantes blancos y la cinta, y el cable al carro.
//     Los técnicos los pone la escena (el decorado no los dibuja). Devuelve suelo 170 (pies), libre [66, 268], rail:
//     [x0, x1, y], carro: [x, y] (el cabezal), portatil, mesa, sarcofago.
//     Cámara 'cabezal' (inserto): la pintura a ×4 (la mano del faraón y la de la diosa con su ankh, sin caras) con el
//     cabezal a la derecha (x 236–319: chapa, rejillas, dos ópticas y la ranura del láser); la LÍNEA ROJA del barrido
//     baja (o.barrido 0–1; sin él, se repite sola con t) y deja encima una malla fina; en la PANTALLITA (x 250–310,
//     y 110–152) el relieve en grises de lo ya barrido se va llenando. Devuelve linea: y, pantalla.
//   'taller': el taller de Madrid (sin letras): la nave de ladrillo encalado con pilares de hierro, cerchas y dos
//     lucernarios (sus haces de luz bajan al suelo), dos ventanas con los TEJADOS DE MADRID recortados (nubes, una grúa
//     que gira, una paloma), la estantería de botes, el tablero de herramientas, el extractor que gira, un reloj, los
//     rollos de material, la fresadora con chispas, tres PANELES ya impresos apoyados (trozos de la cámara pintada) y dos
//     operarios pequeños de bata (uno en la fresadora, otro retocando un panel); delante, LA IMPRESORA de cama plana
//     (x 64–266, cama y 100–123, frontal y 124–134, patas hasta y 160) con su armario de control. o.imprime 0–1 (0.5 por
//     omisión): la plancha blanca se va llenando de pintura de izquierda a derecha y el PÓRTICO va y viene sobre lo
//     impreso, con el cabezal que corre a lo hondo y su luz ultravioleta. escaneoDelante: la mesa de trabajo de la
//     derecha (x 248–319, tablero y 147) con brochas, botes, una muestra pintada, un trapo y la lámpara-lupa. Devuelve
//     suelo 168, libre [20, 244], impresora, panel, impreso: x, portico: [x, y], mesa.
//     Cámara 'impresora': la plancha de cerca vista desde arriba (x 16–304, y 88–164) bajo la viga del pórtico: el
//     CABEZAL corre por la viga con sus lámparas ultravioleta y deja caer gotitas; o.capas 0–1 (0.5 por omisión): del
//     yeso blanco al RELIEVE gris que sube (hasta 0.72) y al COLOR que aparece al final; en el canto se apilan las capas.
//     La mano canónica de un operario (manga de bata) sujeta una LUPA que se pasea. Devuelve panel, cabezal: [x, y],
//     lupa: [x, y].
//   'replica': LA CASA DE CARTER (adobe con cúpula, galería de cuatro arcos, contraventanas, tapia con buganvillas) en
//     su loma con el sendero en zigzag y dos palmeras que se mecen, y AL LADO el pabellón bajo de la réplica (piedra
//     clara medio enterrada, losa que vuela, rampa con barandilla y la puerta en sombra); detrás, el valle (acantilados
//     escalonados, el pico de pirámide en bruma); cielo tramado con sol, nubes de tres tonos a tres velocidades y
//     pájaros; el aparcamiento de asfalto con su autobús de turistas (x 254–319, sin letras, humo al ralentí); turistas
//     pequeños que bajan del autobús y entran por la rampa, y un guía con sombrilla junto a la casa. (Siempre 2014.)
//     Devuelve suelo 168, libre [16, 244], casa, pabellon, entrada, bus.
//     Cámara 'dentro': DENTRO DE LA RÉPLICA: la copia de la cámara pintada (canon: pared norte de frente en x 26–232,
//     y 30–132, la oeste en escorzo, con las juntas finas de los paneles de la copia) iluminada por tres focos de museo
//     con sus conos, la barandilla baja de latón al pie de la pared (DETRÁS de los actores), el suelo pulido que refleja
//     la pintura y, a la derecha, la vitrina con el cabezal retirado, un cuadro de pictogramas, una pantalla que repite
//     el escaneo y una cámara de seguridad. escaneoDelante: el cordón rojo entre dos postes que protege la vitrina
//     (x 242–314). Devuelve suelo 168, libre [16, 236], pared, vitrina.
//   'rasante': LAS DOS PAREDES ESCANEADAS como dos pliegos colgados de un cable con pinzas, ante una tela de estudio
//     oscura y sobre un suelo de tablas: a la izquierda la pared OESTE (x 8–90, y 40–148, los babuinos; su rectángulo,
//     x 30–70, y 82–148) y a la derecha la NORTE (x 98–270, y 26–148; su puerta escondida, x 168–232, y 52–148). El
//     relieve en grises (el modelo del escáner, sin color), con las figuras como bultos suaves; o.luzRasante 0–1: de la
//     luz frontal (casi plano) a la rasante desde la izquierda (todo en relieve, sombras hacia la derecha, un haz con
//     motas); o.rectangulos 0–1: aparecen los DOS RECTÁNGULOS (dintel y jambas con su luz y su sombra fina; con luz
//     frontal se ven poco). Las esquinas de abajo de los pliegos se levantan con el aire. escaneoDelante: el atril con
//     el portátil (x 278–316), con la pared en miniatura y los rectángulos que brillan. Reeves lo pone la escena.
//     Devuelve suelo 168, libre [96, 270], norte, oeste, hojaNorte, hojaOeste, atril.
//     Cámara 'linea': el borde del rectángulo grande DE CERCA (la pared a ×2,7): el DINTEL recto en x 60–260, y 140, y
//     las dos jambas que bajan; arriba, el margen del pliego con la carta de color, la regla y las pinzas. El brazo
//     canónico de Reeves (T.brazo, chaqueta gris azulada) entra por abajo y su DEDO repasa la arista (o.dedo 0–1; sin él,
//     se repite solo con t); lo ya repasado brilla un poco; o.color 0–1: la pintura vuelve en transparencia (tramada).
//     Devuelve arista: [[x, y], [x, y]] y dedo: [x, y].
const V_ESCANEO = {
  escaner: { cam: 'cabezal', general: { col: ['#e0a848', '#4a3a2a'], geo: { suelo: 170, libre: [66, 268], rail: [18, 278, 152], carro: [138, 88], portatil: [28, 140], mesa: [2, 152, 62, 179], sarcofago: [281, 120, 319, 172] } }, cabezal: { col: ['#f4cc78', '#7a5a30'], geo: { suelo: 180, libre: [0, 0], linea: 89, pantalla: [250, 110, 310, 152] } } },
  taller: { cam: 'impresora', general: { col: ['#d8dce0', '#5a6068'], geo: { suelo: 168, libre: [20, 244], impresora: [64, 74, 266, 160], panel: [72, 102, 240, 121], impreso: 159, portico: [110, 88], mesa: [248, 147, 319, 179] } }, impresora: { col: ['#c8ccd0', '#4a5058'], geo: { suelo: 180, libre: [0, 0], panel: [16, 88, 304, 164], cabezal: [160, 90], lupa: [252, 136] } } },
  replica: { cam: 'dentro', general: { col: ['#f0dcb4', '#a88660'], geo: { suelo: 168, libre: [16, 244], casa: [84, 70], pabellon: [220, 128], entrada: [247, 140], bus: [286, 160] } }, dentro: { col: ['#e0a848', '#5a3a1c'], geo: { suelo: 168, libre: [16, 236], pared: [26, 30, 232, 132], vitrina: [251, 92, 303, 127] } } },
  rasante: { cam: 'linea', general: { col: ['#b8b8b8', '#4a4a4e'], geo: { suelo: 168, libre: [96, 270], norte: [168, 52, 232, 148], oeste: [30, 82, 70, 148], hojaNorte: [98, 26, 270, 148], hojaOeste: [8, 40, 90, 148], atril: [296, 128] } }, linea: { col: ['#a8a8ac', '#3a3a3e'], geo: { suelo: 180, libre: [0, 0], arista: [[60, 140], [260, 140]], dedo: [160, 140] } } },
};
export function escaneo(R, t, o = {}) {
  const [enc, cam] = d_cual(o), geo = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(V_ESCANEO[enc][cam].geo)) };
  const pinta = D_VISTAS[enc + '.' + cam];
  if (!pinta) return vista(R, t, o, V_ESCANEO);
  return Object.assign(geo, pinta(R, t, o, geo) || {});
}
// lo de delante de los personajes en cada encuadre de escaneo(); se llama después de los actores, con las mismas opciones
// (lo pintan 'escaner', 'taller', 'replica' cámara 'dentro' y 'rasante'; los demás no tienen nada delante)
export function escaneoDelante(R, t, o = {}) {
  const [enc, cam] = d_cual(o), f = D_DELANTE[enc + '.' + cam];
  return f ? f(R, t, o) || {} : {};
}
// ── E · Los radares, el busto de una reina y la ciudad del disco solar ────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en radaresDelante (se llama después de
// los actores). CUIDADO: NADA de National Geographic (ni el rectángulo amarillo, ni amarillo en cajas, chalecos o
// pantallas); el busto, la ciudad y el templo, NUESTROS; la pared, la del CANON.
//   'pared': la cámara pintada (canon, la pared norte de frente en x 24–270, y 26–148) a finales de 2015, POR LA
//     NOCHE: todo en penumbra menos el círculo del foco sobre la puerta escondida; el techo liso y oscuro, la pared oeste
//     en escorzo con los babuinos y la del este con el paso al tesoro; el foco en su trípode (x 32–56), la caja de
//     herramientas con el portátil abierto (el radargrama pequeño corre), la cinta métrica pegada al zócalo (y 140–142),
//     motas de polvo en el haz. El RADAR DE MANO (PIEZAS_TU.radarMano) va contra la pared a la altura de la puerta
//     escondida, con su cable al portátil: o.pasada 0–1 lo lleva de x 152 a x 218 (devuelve radar: [x, y], la mano de
//     Watanabe); o.radar false: no se pinta (lo lleva la escena). o.ayudante (true por omisión): un técnico de fondo
//     (ELENCO_CHIBI.tecnico) apunta en una libreta a la derecha. En radaresDelante: la caja de herramientas roja y la
//     maleta negra de las esquinas y un rollo de cable. Cámara 'pantalla' (inserto): el portátil sobre la caja, a cuadro
//     casi completo, delante de la pared pintada en penumbra, con la libreta y la botella de agua: el RADARGRAMA (franjas
//     grises que se oscurecen con la profundidad, los metros 0–3 con R.numero, un cursor verde que lo recorre) y o.eco
//     0–1: aparecen dos hipérbolas (blanco, negro, blanco) que pasado 0.7 se encienden en rojo y laten. (tu-radar.)
//   'segundo': la MISMA pared en ESCORZO desde la esquina opuesta (de x 36, cerca, a x 262, lejos), unos meses después,
//     con luz fría de LED (dos paneles en sus pies que dejan dos charcos de luz en la pared): el carro del otro aparato
//     (gris y azul, NADA amarillo) con sus ruedas pequeñas y las DOS ANTENAS, y el ordenador de campaña en su soporte
//     plegable (su radargrama plano corre). En radaresDelante: el SARCÓFAGO cerrado en primer plano a la izquierda
//     (x 1–79, y 144–180) y la caja del equipo (x 250–316). Cámara 'plana' (inserto): la pantalla del segundo aparato: un
//     radargrama LIMPIO de rayas rectas que la línea verde va pintando de izquierda a derecha (o.barrido 0–1; sin él,
//     entero) y, en la mesa, la PIZARRITA con dos marcas, cada una bajo un icono de radar: o.marcas 0–2 traza primero el
//     ✓ verde y luego el ✗ rojo; con la botella, la cinta métrica y un bolígrafo. (tu-turin.)
//   'prensa': la rueda de prensa en Luxor (finales de 2015): el telón azul oscuro con sus pliegues y el pictograma de la
//     máscara (PIEZAS_TU.mascara, NUESTRA) a los dos lados, la PANTALLA GRANDE con el número que sube de 0 a 90
//     (o.cifra 0–1) y su signo % dibujado y una barra que se llena, las cámaras de televisión en trípodes con su luz
//     roja, cinco sillas tras la mesa. En radaresDelante: la MESA larga (el faldón azul; micrófonos y botellas entre los
//     asientos para no tapar caras; las tarjetas, sin letras, colgadas en el faldón) y la fila de periodistas DE ESPALDAS
//     abajo, con cámaras y grabadoras en alto y FLASHES (o.flash 0–1, 1 por omisión; 0 sin flashes). Los de la mesa se
//     sientan detrás; o.mesa (127 por omisión) es la y del tablero: con 131 asoman cabeza, hombros y pecho de los
//     sentados en suelo 136 (entonces el de pie va en suelo 125 y quien pasa detrás en 128). Cámara 'publico': DESDE LA MESA, cuatro filas de periodistas de
//     frente (pequeños detrás, más grandes delante) con cámaras, grabadoras y dos pértigas con micrófono que se mecen,
//     la luz azul de la pantalla en sus caras, la puerta con su luz de salida, los paneles acústicos, dos apliques con su luz y FLASHES (o.flash); en radaresDelante, el
//     borde de la mesa con los micrófonos de espaldas, una botella y papeles. (tu-radar.)
//   'canon': LA EXPLICACIÓN DEL ECO: un cañón de roca roja en estratos, de día (cielo tramado, nubes de tres tonos, dos
//     cuervos, mesetas lejanas en tres términos y el río al fondo); a la izquierda la REPISA (y 150, x 0–128) con un
//     hito de piedras y un enebro, donde la escena pone al excursionista que grita (no hay nadie del elenco: un chibi
//     cualquiera, p. ej. EL.turista1, con o.habla); o.boca [x, y] (por omisión [80, 136]) dice de dónde salen los arcos.
//     o.onda 0–1: cuatro arcos que salen de la boca y cruzan hasta la pared de enfrente (a 1, un destello donde chocan);
//     o.vuelve 0–1: vuelven más débiles y a trazos, y aparece la burbuja del eco (tres arquitos) junto a la pared. En
//     radaresDelante, una rama de enebro que se mece abajo a la derecha. Cámara 'roca' (inserto): UN CORTE DE ROCA en
//     capas (caliza, el rayado del corte del monte) bajo un cielo de desierto: el radar (PIEZAS_TU.radarMano) en la
//     superficie (y 56), la regla de metros a la izquierda; o.onda 0–1: la onda baja como un arco (0–0.5), REBOTA con un
//     chispazo en el cambio de material (y 124–139; o.material 'escombro', por omisión, punteado, o 'aire', una franja
//     oscura con polvo que flota) y vuelve más débil (0.5–1); el CRONÓMETRO grande cuenta (su aguja da la vuelta y la
//     cuenta de R.numero corre de 0 a 60). (tu-radar.)
//   'turin': el LABORATORIO de Turín (2018): la nave de paneles de hormigón y cerchas, la ventana alta a los Alpes
//     (recortada: nube y pájaro que pasan), la estantería de aparatos, el monitor en su carro (radargrama que corre), el
//     RADAR GRANDE en su carro con las antenas en abanico apuntando a la PARED DE PRUEBA de bloques, el SALIENTE de
//     tablón delante de ella con la LATA olvidada (PIEZAS_TU.lata), la persiana enrollable a medio subir (por debajo pasan unos pies al sol), los tubos
//     fluorescentes (uno parpadea), la canaleta, el cuadro eléctrico, el reloj, la señal de aviso, el extintor y el suelo de
//     resina. o.pita 0–1: en la pantalla sale una hipérbola roja y, pasado 0.4, el icono de una PUERTA con «!» que
//     parpadea; arcos de pitido y la línea de puntos roja de la LATA a la pantalla (el eco es la lata). En radaresDelante,
//     los dos bancos de trabajo de las esquinas. Cámara 'carpeta' (inserto): la mesa de madera desde arriba (café con
//     vapor, gafas, bolígrafo, una hoja con un radargrama, la foto del valle, la regla, el taco rosa, el lápiz, la goma, la
//     grapadora y clips; la veta, calmada bajo Atom y bajo el año) con una CARPETA gruesa (los papeles dentro, la tapa
//     de CARTÓN con textura en sus dos caras: fuera kraft con el lomo, cantos gastados y el cerco del café; dentro, el
//     bolsillo con su clip; la tapa
//     con los trazos del rótulo, la etiqueta del radar, la goma, las banderitas y el 2018 con R.numero): o.cerrada 0–1 (1 por omisión) la tapa gira sobre el lomo y se cierra; o.sello
//     0–1: un SELLO DE GOMA (el nuestro, de madera; PIEZAS_TU.sello es el de barro de la puerta y no vale aquí) baja
//     (0–0.5), estampa (0.5–0.7) y se va: queda un CANDADO rojo de tinta en la tapa («caso cerrado», sin letras; solo
//     si la carpeta está cerrada). (tu-turin.)
//   'museo': una SALA DE MUSEO tranquila (Berlín, sin letras): paredes de tela azul verdosa con su moldura, el carril de
//     focos y el haz sobre la VITRINA central con el BUSTO DE UNA REINA (PIEZAS_TU.bustoReina, NUESTRO, acabado fino) en
//     su pedestal; el CORDÓN de terciopelo entre dos postes, delante de la vitrina y DETRÁS de los personajes; la puerta
//     en arco a la sala siguiente (visitantes pequeños que pasan, recortados), una vitrina de pared con vasijas y un
//     escarabajo y el guarda sentado a la derecha (cabecea). En radaresDelante, el banco acolchado de la esquina. Cámara
//     'busto': el busto de cerca en su vitrina (marco de bronce oscuro, nada dorado), con los reflejos del cristal que se
//     deslizan, el piloto de la alarma, y a los lados la moldura, el zócalo de paneles, un relieve con papiros en su
//     ménsula y un papiro enmarcado con lotos; o.duda 0–1: una «?» grande que aparece encima y flota. (tu-reina; la cámara, también tu-medir.)
//   'amarna': LA CIUDAD DEL DISCO SOLAR, hace unos 3350 años: cielo tramado, los acantilados del este, el NILO en
//     diagonal (barcas de vela que bajan, brillos, juncos, un cigoñal que sube y baja), los campos verdes, la ciudad de
//     adobe blanco en filas (silos, puertas de colores, ropa tendida), el TEMPLO abierto (dos torres con banderolas que
//     ondean, el patio con filas de mesas de ofrendas), el PALACIO con el BALCÓN de las apariciones en el centro, y arriba
//     el GRAN DISCO SOLAR con los rayos que acaban en manitas (o.disco 0–1 su brillo; los rayos respiran con t); en el
//     camino de delante, un puesto de mercado, cántaros, una cabra, una mujer con un cesto y un hombre con un burrito. Los
//     reyes (nefertitiTU, akenatonTU) van EN EL BALCÓN (suelo 96, x de R.actor 186 y 203); su pretil va en
//     radaresDelante (les tapa los pies), con la palmera de la esquina. Cámara 'templo': LA PARED DE UN TEMPLO de cerca
//     (sillares de caliza, con grietas, chorreones y desconchones; en la arena, guijarros, esquirlas, pisadas y el polvo que
//     arrastra el viento): en cada panel el filete tallado, el friso de colores gastado y la banda de registro; el panel grande con el disco y sus manitas sobre el rey y la reina en relieve que ofrecen, sus
//     DOS CARTUCHOS con iconos (sol, escarabajo, pluma); o.borra 0–1: un CINCEL en la mano canónica (T.brazo, entra por
//     abajo a la derecha) raspa el primer cartucho, luego el segundo, y a partir de 0.7 las caras quedan en blanco con
//     esquirlas (o.mano false: sin la mano); en el panel pequeño, o.corona 0–1: la corona azul pasa en arco de la reina
//     al rey niño. (tu-reina.)
// Las coordenadas x de los personajes son las de R.actor (el borde izquierdo del sprite de ~15 px).
const V_RADARES = {
  pared: { cam: 'pantalla', general: { col: ['#e0a848', '#4a3420'], geo: { suelo: 162, libre: [58, 262] } }, pantalla: { col: ['#20282e', '#5a6870'], geo: { suelo: 180, libre: [0, 0] } } },
  segundo: { cam: 'plana', general: { col: ['#d89a40', '#3a2a1a'], geo: { suelo: 164, libre: [86, 236] } }, plana: { col: ['#283038', '#6a7880'], geo: { suelo: 180, libre: [0, 0] } } },
  prensa: { cam: 'publico', general: { col: ['#2a3460', '#141828'], geo: { suelo: 140, libre: [70, 250], asientos: [77, 113, 153, 193, 229] } }, publico: { col: ['#3a3a4a', '#1a1a24'], geo: { suelo: 168, libre: [10, 300] } } },
  canon: { cam: 'roca', general: { col: ['#e0805a', '#7a3a28'], geo: { suelo: 150, libre: [30, 112] } }, roca: { col: ['#d8b88a', '#7a5a3a'], geo: { suelo: 180, libre: [0, 0] } } },
  turin: { cam: 'carpeta', general: { col: ['#d8dce4', '#5a6070'], geo: { suelo: 158, libre: [48, 268] } }, carpeta: { col: ['#c8a878', '#5a4028'], geo: { suelo: 180, libre: [0, 0] } } },
  museo: { cam: 'busto', general: { col: ['#2a4a4a', '#0e1e22'], geo: { suelo: 166, libre: [60, 284] } }, busto: { col: ['#2a4448', '#10201e'], geo: { suelo: 180, libre: [0, 0] } } },
  amarna: { cam: 'templo', general: { col: ['#f4e8c8', '#6aa0c8'], geo: { suelo: 166, libre: [70, 290] } }, templo: { col: ['#e8d0a0', '#9a7a50'], geo: { suelo: 180, libre: [0, 0] } } },
};
export function radares(R, t, o = {}) {
  const enc = V_RADARES[o.encuadre] ? o.encuadre : 'pared', e = V_RADARES[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const extra = e_VISTAS[cam === 'general' ? enc : cam](R, t, o) || {};
  R.recorte(null);
  return { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)), ...extra };
}
// lo de delante de los personajes en cada encuadre de radares(); se llama después de los actores, con las mismas
// opciones: 'pared' las cajas de herramientas y el rollo de cable; 'segundo' el SARCÓFAGO cerrado (primer plano a la
// izquierda) y la caja del equipo; 'prensa' la MESA larga con micrófonos, botellas y tarjetas (sin letras) y la fila de
// periodistas de espaldas con cámaras y flashes (o.flash); 'publico' el borde de la mesa con los micrófonos; 'canon' la
// rama de enebro de la esquina; 'turin' los dos bancos de trabajo de las esquinas; 'museo' el banco acolchado de la
// esquina; 'amarna' el pretil del balcón (tapa los pies de los reyes) y la palmera de la esquina
export function radaresDelante(R, t, o = {}) {
  const enc = V_RADARES[o.encuadre] ? o.encuadre : 'pared', e = V_RADARES[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const f = e_DELANTE[cam === 'general' ? enc : cam];
  if (f) f(R, t, o);
  R.recorte(null);
  return {};
}
// ── F · La ladera sobre la tumba y el corte del monte (2020–2026) ─────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas; los que dependen de una opción, como carrito o broca, salen ya movidos). Lo de
// delante de los personajes va en laderaDelante (se llama después de los actores): 'ladera', 'gravimetro',
// 'perforadora' y 'permiso'. CUIDADO: en el corte y en el mapa, las anomalías son MANCHAS difusas (tramadas, de borde
// blando), nunca cuartos; solo el trazo azul a rayas de 'trazo' (o.reeves) y de su cámara 'posibles' dibuja formas de
// cuarto, y se nota que es un dibujo encima. El corte, el del CANON (norte a la derecha; tumba, manchas y broca en sus
// coordenadas). Opciones de todo el grupo: o.epoca 2020 | 2024 | 2026 (por omisión 2026: en el corte sale la
// perforadora de la cumbre; antes de 2014, sin autobús ni asfalto en el valle); o.luz 'dia' | 'tarde' (los exteriores
// y el corte: cielo malva y naranja y un tinte cálido). Cada fondo fijo va en su búfer (f_ldCapa); las nubes, los
// pájaros, la gente pequeña, los jalones, el polvo y lo de cada opción se pintan en vivo.
//   'ladera': EL MONTE SOBRE LA TUMBA al sol: la cresta sube a la cumbre por la derecha (y ≈ 52), abajo a la izquierda el
//     VALLE pequeño (sendero asfaltado, la entrada de la tumba con su muro, barandilla y toldo en [56, 104], la caseta,
//     un autobús diminuto y turistas que pasan), los riscos del fondo con el pico, el sendero en zigzag de los turistas
//     por el monte (con gente pequeña), jalones con banderitas, el todoterreno blanco arriba con una sombrilla y cajas,
//     polvo que levanta el viento, un milano y vencejos. o.carrito 0–1: el RADAR DE CARRITO (PIEZAS_TU.radarCarrito)
//     sube por la línea del suelo de x 110 a x 240 (devuelve carrito y asa: donde va la mano de quien empuja); la escena
//     pone al técnico, a los geofísicos o a Eldamaty. laderaDelante: dos cajas de aparatos y una mochila abajo a la
//     izquierda y una caja verde abajo a la derecha. Cámara 'carrito': el radar de carrito de cerca (escala 2) sobre las
//     piedras, la cinta métrica con sus cifras en el suelo, la sombra del técnico que lo empuja y, en la pantallita del
//     asa, el radargrama que corre (o.eco 0–1: la banda brillante); afloramientos de caliza, matas secas, las rodadas
//     detrás del carrito y una lagartija que asoma. o.avance (px, por omisión 0): el carrito, la pantallita, las rodadas
//     y la sombra se corren a la derecha y las ruedas giran con él (devuelve carrito y pantalla movidos); o.sombra false:
//     sin la sombra; o.sombra [x, suelo]: en vez de la sombra grande, la de un chibi con los pies ahí. El agarre de
//     arriba del asa (172, 116) no lo alcanza un chibi: devuelve agarre [192, 139] (+ avance), donde el asa se junta con
//     la caja, para su mano (R.actor … { sostiene: agarre }). Al fondo de las vistas de fuera, el QURN: cumbre natural de caliza, roma, torcida
//     y en escalones (no una pirámide). (tu-este, tu-dudas.) Devuelve suelo (en x = 160) y
//     pendiente (el suelo en x es suelo + pendiente · (x − 160)), libre, valle, todoterreno, carrito y asa (con o.carrito).
//   'corte': EL CORTE DEL MONTE (canon), con los riscos en calima detrás, la costra de piedras, la roca en capas con
//     juntas, sílex y grietas, la tumba en ocre claro (la escalera en escalones, el pasillo, la antecámara con el anexo,
//     la cámara pintada con su filo amarillo, su cenefa y pictogramas diminutos), el murete y la barandilla de la entrada
//     con turistas que bajan y un guarda, jalones en la ladera, la regla 0–10 y la flecha del norte (a la derecha).
//     o.anomalias 0–1 (por omisión 1): las MANCHAS (la fuerte de esquinas rectas arriba y las dos débiles); o.pasillo
//     0–1: la mancha del pasillo del este de 2020; o.broca 0–1: la BROCA baja por x 256 desde la perforadora diminuta de
//     la cumbre (que tiembla, con humo y polvillo en la boca) hasta y 96 (con 0, espera arriba). Cámara 'mancha'
//     (inserto, escala 2): a la izquierda el interior pintado de la cámara (x 0–40) y su PARED NORTE (filo en x 41–43), la
//     roca y la mancha fuerte a la derecha; la regla de la distancia de la pared al agujero (o.metros: la cifra, si se
//     da); o.broca (por omisión 1): el agujero por x 200; o.camarita 0–1: la CAMARITA baja por su cable, gira y enciende
//     su luz (> 0,75); o.murcielago 0–1: el MURCIÉLAGO colgado (x 262) abre un ojo (> 0,4); sin o.murcielago no sale
//     (devuelve murcielago igual). (tu-gancho, tu-agujero.)
//   'trazo': EL MISMO CORTE sin manchas (o.anomalias para ponerlas, aquí MÁS FUERTES: núcleo oscuro y borde tramado que
//     se deshace, para que se lean) ni perforadora (salvo con o.broca), con o.reeves 0–1:
//     el CONTORNO AZUL A RAYAS de una tumba más grande tras la pared norte (pasillo, escalera, sala grande con una
//     coronita, otra sala arriba y un cuarto debajo, x 214–314, y 72–150); o.traza 0–1: se va dibujando y una mano
//     (T.brazo corto, manga azul, abajo cerca del borde) con un rotulador largo sigue la punta (devuelve mano: la punta).
//     Cámara 'posibles' (inserto): la roca de cerca al
//     norte de la cámara (su pared, a la izquierda) sobre una mancha muy suave, con TRES POSIBILIDADES a rayas azules en
//     su recuadro con «?»: un almacén con jarras, otra tumba con dos coronas y un pasillo que acaba contra la roca;
//     o.posibles 0–3 las enciende. (tu-reina, tu-medir.)
//   'este': EL CORTE EN 2020 COMO UN BLOQUE DEL MONTE: arriba la ladera vista desde arriba (con las líneas punteadas del
//     recorrido, jalones, la boca de la escalera con su barandilla y un radar de carrito diminuto con su técnico que va y
//     viene), delante el corte (la tumba más ancha y menos honda) y a la derecha la cara en sombra. o.pasillo 0–1 (por
//     omisión 1): el ESPACIO ALARGADO como mancha paralela al pasillo de entrada, con las cotas 10 (largo) y 2 (alto);
//     o.duda 0–1: la mancha parpadea y sale un «?». Cámara 'radargrama' (inserto): la pantalla del radar en su marco de
//     goma, sobre el asa, con la ladera detrás: capas que ondulan, hipérbolas de piedras, el cursor que barre, la escala
//     0–4 y la banda brillante alargada (o.eco 0–1). (tu-este.)
//   'gravedad': LA LÁMINA DE LA GRAVEDAD en un tablero de corcho con patas apoyado en el todoterreno, sobre la ladera: el
//     bloque de roca en corte, la fila de FLECHAS rojas (o.flechas 0–1: crecen) y el HUECO cuadrado (o.hueco 0–1: aparece
//     y las tres flechas de encima menguan); la esquina del papel que levanta el viento. Un geofísico cabe a la
//     izquierda (libre) señalando. Cámara 'flechas' (inserto): las flechas de cerca sobre el hueco, la regla, las dos
//     rayas de la diferencia con la cifra 0,00000001 y la pesa que cuelga de un muelle que se estira un pelo menos
//     (o.hueco). (tu-gravedad.)
//   'gravimetro': LA CUMBRE CON LA REJILLA: cruces blancas pintadas en filas en perspectiva, jalones con banderitas, otro
//     equipo lejos con su trípode, una tienda de sombra y el todoterreno al fondo; en medio, el GRAVÍMETRO
//     (PIEZAS_TU.gravimetro) en su trípode sobre su cruz, con la aguja que deriva (o.tiembla 0–1: tiembla deprisa);
//     o.escarabajo 0–1: un ESCARABAJO con su bola cruza por delante del trípode (x 96 → 236, por y 160 y, pasada la
//     mitad, bajando hasta y 176; devuelve escarabajo): hasta x 192 lo pinta ladera (detrás de la gente) y desde ahí
//     laderaDelante (delante de la caja del portátil), así que la opción va en las dos llamadas.
//     laderaDelante: la sombrilla de gajos azules (palo en x 184) y la caja con el portátil de las lecturas (las cifras
//     bailan con o.tiembla). Cámara 'muelle' (inserto): el dibujo del gravímetro por dentro en una lámina sobre la mesa
//     de campaña (madera): el cilindro, el MUELLE finísimo, la PESA (sube un pelo con o.hueco 0–1), la palanca y la aguja
//     (o.aguja −1…1) con una lupa encima; la taza con vapor, el lápiz y unas piedras. (tu-gancho, tu-gravedad.)
//   'mapa': EL MAPA DE DENSIDAD grande sobre la mesa de campaña: la PLANTA de la tumba (canon, norte arriba, con la
//     flecha y su estrella), la REJILLA de 1.242 puntos (o.rejilla 0–1: se marcan uno a uno en zigzag, el último en
//     rojo) y o.manchas 0–1: los colores de densidad que se extienden (primero los azules y morados de las manchas: la
//     fuerte al norte de la pared norte, con dos esquinas rectas arriba; el pasillo del este y dos pequeñas); la taza
//     con vapor, el compás, el lápiz, la piedra que sujeta la esquina, una hormiga y la esquina que levanta el viento;
//     o.chincheta 0–1: la MANO sola (de cerca, el brazo hacia la cámara) entra por la derecha con una chincheta roja, la
//     clava en la mancha grande (172, 70) en 0,5 y se va (devuelve chincheta).
//     Cámara 'esquinas' (inserto): el mismo mapa a 2,4 aumentos: la mancha fuerte encima de la cámara pintada, con una
//     ESCUADRA de plástico que entra de lado y se posa en cada esquina recta (o.escuadra 0–1) y la cota 35 con el cuadrito
//     de los metros cuadrados (con o.escuadra > 0,6). (tu-gravedad.)
//   'cortes': la lámina grande clavada en el tablero de corcho del campamento (arriba, la lona de la tienda y, por la
//     abertura, la ladera al sol) con TRES CORTES en fila: un cuarto vacío, un pasillo lleno de cascotes y roca agrietada;
//     debajo de cada uno, un aparato con su aguja que apenas se mueve dentro de la banda gris. o.engana 'radar' (encima del
//     corte de los cascotes: el radar con ✗ y la pesa con ✓) | 'gravedad' (encima de la roca agrietada: el radar con ✓ y
//     la pesa con ✗) | 'ambos'. Cámara 'aguja' (inserto): la esfera grande de un aparato con la banda gris de «ruido» y
//     la aguja que tiembla dentro (o.aguja 0–1: lo que se asoma al borde), las cifras 0–3 y el reflejo del cristal.
//     (tu-dudas, tu-medir.)
//   'perforadora': LA CUMBRE EN 2026: la PERFORADORA (PIEZAS_TU.perforadora, escala 2) sobre la plataforma de tablones,
//     el generador con su humo y las mangueras, la lona con la nevera y una silla, dos técnicos pequeños, y el valle
//     abajo a la izquierda con turistas lejanos. o.broca 0–1: el motor baja, la broca gira, la máquina tiembla y sale
//     polvo blanco (devuelve punta). laderaDelante: dos cajas abajo a la izquierda y el carrete de cable a la derecha.
//     Cámara 'camarita' (inserto): DENTRO DEL AGUJERO: el tubo estrecho de roca (x 188–212) que sale a un hueco oscuro;
//     la CAMARITA (escala 3) baja por su cable (o.baja 0–1) con su haz de luz; o.gira 0–1: el haz gira hacia la
//     derecha, donde cuelga un MURCIÉLAGO que también mira (o.murcielago 0–1: abre un ojo). (tu-agujero.)
//   'permiso': EL DESPACHO OFICIAL (El Cairo, hoy): la pared encalada, el zócalo de madera, el suelo de baldosas, la
//     ventana con la ciudad (azoteas, minarete, ropa tendida y pájaros, recortados al hueco), el ventilador que gira, la
//     estantería de archivadores, el reloj, un cuadro nuestro, el calendario de pared, el archivador metálico, la fuente
//     de agua y el banderín de tres franjas que mueve el aire. laderaDelante: LA MESA (tablero en y 128–138, frente hasta
//     y 179, x 88–252) con montones de carpetas, la bandeja, el teléfono, la carpeta que se queda a medio cerrar
//     (o.carpeta 0–1) y el SELLO de goma en su soporte de palanca, que baja un poco, duda y vuelve a subir (o.sello 0–1;
//     devuelve sello). EL.hawass (o quien sea) va DETRÁS de la mesa con los pies en y 135 (asoman cabeza y hombros); delante, solo a los lados.
//     Cámara 'calendario' (inserto): el calendario de pared de 2026 (cifra grande y una hoja seca: noviembre sin el
//     nombre), con la cuadrícula del 1 al 30 (empieza en domingo), los días que se tachan en rojo hasta el de hoy (o.dias
//     0–1; o.hoy, por omisión 20, rodeado; devuelve dia, su centro), una hojita que cae y el sello que sigue esperando en
//     su balda; en la pared, el zócalo de madera, una grieta, la foto enmarcada del valle (nuestra), una hoja de avisos
//     con chinchetas (rayas), la luz de la ventana con la sombra del ventilador que gira y una mosca. (tu-este,
//     tu-permiso.)
//   'luces': EL CIERRE A DOS: la pantalla partida por una columna de piedra en x 157–162. A la izquierda, la segunda
//     puerta de 1922 (enlucido con filas de sellos) a oscuras, con el hueco (x 100–113, y 84–94) y la VELA de Carter en su
//     mano (T.brazo, manga de tweed): o.vela 0–1 la enciende y su luz descubre el muro (y el oro dentro del hueco). A la
//     derecha, el corte de 2026 al anochecer con la perforadora diminuta, el agujero y la CAMARITA colgada en un hueco
//     pequeño: o.luz 0–1 la enciende con su luz fría. Las dos luces a la misma altura (y ≈ 96), con motas de polvo.
//     Cámara 'cerca': las DOS LUCES DE CERCA: la llama grande que tiembla sobre el cabo de cera (o.vela 0: humo) y la
//     camarita grande con su ledito que late (o.luz), cada una con su halo; entre las dos, la misma columna. (tu-cierre.)
const V_LADERA = {
  ladera: { cam: 'carrito', general: { col: ['#f0dcb4', '#b08858'], geo: { suelo: 140, pendiente: -0.12, libre: [60, 300], carrito: [110, 153], asa: [96, 132], valle: [56, 104], todoterreno: [232, 104] } }, carrito: { col: ['#e8cc98', '#9a7448'], geo: { suelo: 158, libre: [20, 150], carrito: [200, 158], pantalla: [185, 124] } } },
  corte: { cam: 'mancha', general: { col: ['#d8b88a', '#a8865c'], geo: { suelo: 180, libre: [0, 0], entrada: [30, 66], tumba: { pasillo: [62, 98, 112, 110], ante: [112, 92, 168, 128], anexo: [120, 130, 150, 144], pintada: [174, 96, 214, 130], norte: 214 }, mancha: [238, 88, 276, 128], perforadora: [256, 48], broca: [256, 48] } }, mancha: { col: ['#c8a878', '#8a6a48'], geo: { suelo: 180, libre: [0, 0], pared: 43, agujero: [200, 64], mancha: [170, 60, 318, 178], camarita: [200, 120], murcielago: [262, 70] } } },
  trazo: { cam: 'posibles', general: { col: ['#d8b88a', '#a8865c'], geo: { suelo: 180, libre: [0, 0], tumba: { pintada: [174, 96, 214, 130], norte: 214 }, grande: [214, 72, 314, 150], corona: [282, 115] } }, posibles: { col: ['#d0b088', '#9a7a52'], geo: { suelo: 180, libre: [0, 0], posibles: [[70, 100], [160, 100], [250, 110]] } } },
  este: { cam: 'radargrama', general: { col: ['#dcc090', '#a08050'], geo: { suelo: 180, libre: [0, 0], tumba: { pasillo: [66, 100, 150, 110], ante: [150, 96, 200, 122], pintada: [206, 98, 240, 122] }, espacio: [70, 82, 160, 94], carrito: [70, 68] } }, radargrama: { col: ['#20282e', '#5a6870'], geo: { suelo: 180, libre: [0, 0], pantalla: [44, 34, 255, 149], eco: [190, 100] } } },
  gravedad: { cam: 'flechas', general: { col: ['#e8dcc0', '#9a8462'], geo: { suelo: 162, libre: [16, 66], lamina: [70, 30, 262, 146], papel: [80, 38, 252, 138], hueco: [150, 96, 180, 122] } }, flechas: { col: ['#ece4cc', '#8a7a5a'], geo: { suelo: 180, libre: [0, 0], hueco: [130, 126, 190, 176], pesa: [272, 90] } } },
  gravimetro: { cam: 'muelle', general: { col: ['#f0dcb4', '#a88660'], geo: { suelo: 151, libre: [20, 300], gravimetro: [160, 130], tripode: [148, 172], escarabajo: [96, 160] } }, muelle: { col: ['#d8dce0', '#5a6068'], geo: { suelo: 180, libre: [0, 0], aguja: [214, 100], pesa: [140, 104] } } },
  mapa: { cam: 'esquinas', general: { col: ['#e8e4d4', '#7a8aa0'], geo: { suelo: 180, libre: [0, 0], mapa: [30, 26, 270, 170], pintada: [140, 96, 178, 114], mancha: [136, 62, 186, 90] } }, esquinas: { col: ['#ddd8c8', '#6a5a90'], geo: { suelo: 180, libre: [0, 0], mancha: [126, 46, 246, 114] } } },
  cortes: { cam: 'aguja', general: { col: ['#d8c8a8', '#7a6a50'], geo: { suelo: 180, libre: [0, 0], cortes: [[14, 50, 100, 130], [117, 50, 203, 130], [220, 50, 306, 130]], agujas: [[57, 152], [160, 152], [263, 152]] } }, aguja: { col: ['#e0e0d8', '#5a5a58'], geo: { suelo: 180, libre: [0, 0], aguja: [160, 160] } } },
  perforadora: { cam: 'camarita', general: { col: ['#f0dcb4', '#a88660'], geo: { suelo: 146, libre: [20, 300], perforadora: [165, 148], punta: [165, 116], generador: [238, 146] } }, camarita: { col: ['#4a3a2a', '#141010'], geo: { suelo: 180, libre: [0, 0], luz: [200, 142], murcielago: [272, 140] } } },
  permiso: { cam: 'calendario', general: { col: ['#c8b090', '#5a4028'], geo: { suelo: 156, detras: 135, libre: [14, 86], mesa: 128, sello: [188, 102], ventana: [20, 32, 90, 94], calendario: [236, 50, 266, 88] } }, calendario: { col: ['#ece8dc', '#8a7a62'], geo: { suelo: 180, libre: [0, 0], dia: [187, 114], sello: [266, 127] } } },
  luces: { cam: 'cerca', general: { col: ['#3a2a1c', '#d8b88a'], geo: { suelo: 180, libre: [0, 0], vela: [96, 96], hueco: [100, 84, 113, 94], camarita: [236, 96], raya: 160 } }, cerca: { col: ['#2a1c14', '#8a6a48'], geo: { suelo: 180, libre: [0, 0], vela: [96, 100], camarita: [226, 98] } } },
};
export function ladera(R, t, o = {}) {
  const enc = V_LADERA[o.encuadre] ? o.encuadre : 'ladera', e = V_LADERA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const geo = JSON.parse(JSON.stringify(e[cam].geo)), q = { ep: o.epoca ?? 2026, luz: o.luz === 'tarde' ? 'tarde' : 'dia' };
  const extra = f_LD_VISTAS[enc][cam === 'general' ? 0 : 1](R, t, o, q, geo) || {};
  return { encuadre: enc, camara: cam, ...geo, ...extra };
}
// lo de delante de los personajes en cada encuadre de ladera(); se llama después de los actores, con las mismas
// opciones: 'ladera' (las cajas de aparatos y una mochila abajo a la izquierda), 'gravimetro' (la sombrilla y la caja con
// el portátil que da las lecturas), 'perforadora' (las cajas y el carrete de cable) y 'permiso' (la mesa oficial con las
// carpetas, la bandeja y el SELLO en su soporte de palanca). Devuelve lo mismo que su encuadre en ladera() añade
// (p. ej. sello: [x, y] en 'permiso'). En 'gravimetro', con o.escarabajo pinta el escarabajo desde x 192 (delante de la
// caja) y devuelve escarabajo.
export function laderaDelante(R, t, o = {}) {
  const enc = V_LADERA[o.encuadre] ? o.encuadre : 'ladera', e = V_LADERA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const d = f_LD_DELANTE[enc + '|' + cam];
  return d ? d(R, t, o, { ep: o.epoca ?? 2026, luz: o.luz === 'tarde' ? 'tarde' : 'dia' }) || {} : {};
}
// ── G · Hoy: el estudio de Atom con papel pintado egipcio ─────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en hoyDelante (se llama después de los
// actores, con las mismas opciones). EL MISMO CUARTO QUE EN EL 33, EL 34 Y EL 35 (copiado de hoy 'estudio' de
// jm-comun.js: moldura, cenefa lisa bajo el año, friso de cuarterones, tarima, alfombra, ventana con el parque,
// librería, globo, reloj de péndulo, lámpara de pie, sillón con el gato gris, el cuadro del monte) con EL PAPEL PINTADO
// EGIPCIO (de casa, no de tumba): fondo arena con una red de rombos punteada y, en cada rombo, una palmerita, un ojo
// pequeño, un escarabajo con su sol o un loto, en colores apagados (sin letras; tranquilo, solo rayado, tras Atom y bajo
// el año), tres rayas de colores bajo la cenefa y una GRECA de escarabajos y soles sobre el friso. En la librería, una
// pirámide de recuerdo y un gato de escayola; en lugar del mapa, una LÁMINA DE PIRÁMIDES (nuestra) que se tuerce con
// el golpe; el ESTETOSCOPIO (PIEZAS_TU.estetoscopio) colgado de un clavo a la derecha de la librería (o.estetoscopio
// false: no está, Atom lo tiene en la mano). o.gato false: sin gato. Las cámaras de cerca (estudio 'pared', mesa,
// mesa 'manzana', pizarra 'final', caja 'dentro') son insertos: libre [0, 0].
//   'estudio': el estudio de día (suelo 162). o.golpe 0–1 (gag 1): TRES TOQUES desde el otro lado (en 0,05, 0,35 y
//     0,65) en la pared de papel a la derecha del estetoscopio (zona x 78–114, y 64–100, centro toc): el papel tiembla,
//     salen anillos punteados y cuatro rayitas de impacto, cae polvo desde la cenefa, la lámina de las pirámides se
//     tuerce un poco más con cada toque (y se queda torcida) y el gato levanta las orejas; o.lluvia 0–1 como en el 35.
//     En hoyDelante: el escritorio de nogal (pila de libros con su manzana, flexo rojo con su luz) con el LIBRO DE
//     EGIPTO abierto y la LUPA, la CAJA de cartón cerrada (PIEZAS_TU.caja) y la LINTERNA (o.caja false quita las dos).
//     El escritorio tapa x 91–209 hasta el suelo: los personajes, en libre (x 212–262) o libre2 (x 10–88).
//     Cámara 'pared': LA PARED DE CERCA (papel a escala 2, y 31–111; greca y 112–133; friso y 134–159; tarima desde
//     160), con el canto de la librería a la izquierda, la LÁMINA DE LA BARCA (nuestra), una grieta del yeso que sube
//     del rodapié (x ≈ 118), un enchufe (x 214, y 146) con su cable, la mancha de sol de la ventana con la sombra de
//     sus barrotes y de las hojas, motas en la luz, y alrededor del punto del estetoscopio el papel liso (solo rayado);
//     o.golpe 0–1: los mismos tres toques, con la lámina que da un saltito en cada uno. En hoyDelante: la palmera de
//     interior en su maceta (x 246–294, y 147–179), que se mece. (tu-hola; la general, también tu-cierre.)
//     Devuelve suelo, libre, libre2, toc: [x, y], lamina, estetoscopio: [x, y] (la base de la pieza colgada), y en
//     hoyDelante mesa: [x0, y, x1, pie], caja, linterna; en la cámara, punto: [x, y] (donde apoyar la campana), toc.
//   'mesa' (inserto): LA MESA DE ATOM DESDE ARRIBA: el nogal con su veta, un cuaderno de cuadros abierto con apuntes y
//     una regla, un lápiz, el LIBRO DE EGIPTO abierto (un dibujo de pirámides con su sol; columnas de rayas y un
//     escarabajo), una postal de pirámides con su sello, un pisapapeles de escarabajo turquesa, la taza de té con su
//     vapor, el ESTETOSCOPIO enrollado (PIEZAS_TU.estetoscopio a escala 2; o.estetoscopio false lo quita), la LUPA (su
//     cristal agranda la veta; el reflejo se mueve) y la MANZANA roja; la mancha de sol con la sombra de una rama que
//     se mece; abajo, el canto de la mesa y, en la tarima, la cabeza del gato, que sigue la manzana con los ojos.
//     o.rueda 0–1: la manzana rueda hasta el borde (el rabito da vueltas). Devuelve manzana: [x, y] (donde está) y
//     borde: [x, y] (donde se para, en el filo). Cámara 'manzana': LA MANZANA QUE CAE, de lado y de cerca (a ≈ 2,5
//     veces la escala del estudio): el escritorio de lado (tablero en y 60–72 hasta x 197, cajonera, pata en
//     x 168–190), la pila de libros, el flexo y un portalápices encima, el papel a escala 2, la greca, el friso, la
//     tarima, la lámpara de pie encendida y el GATO a la misma escala (x ≈ 276), que la mira. o.cae 0–1: la manzana
//     rueda hasta el filo (hasta 0,12), cae acelerando con rayitas de velocidad, una FLECHA roja hacia abajo crece a
//     su derecha (x 232, desde y 72) y al final bota en la tarima y deja una nubecilla. (tu-gravedad.) Devuelve
//     manzana: [x, y] (la de ahora), suelo (160, donde toca), flecha.
//   'pizarra': la PIZARRA BLANCA del estudio sobre su caballete, delante de una librería ancha (pizarra x 48–272,
//     y 28–142, el blanco x 51–269, y 31–139; suelo 162): o.n 3–5 (por omisión 5): los ESTUDIOS EN FILA, cada uno con su
//     dibujo a rotulador a escala 3 (con 3, tres radares de mano; con 5, radar de mano ×3, radar de carrito y
//     gravímetro) y encima su respuesta (o.respuestas: lista de '✓' | '✗' | '?': por omisión, con 3, ['✓', '✗', '✗']
//     (gancho); con 5, ['✓', '✗', '✗', '?', '?']); o.traza 0–1 (por omisión 1): se van dibujando uno a uno, de arriba
//     abajo, con la punta del rotulador, y la respuesta sale al acabar cada uno. Encima, un «título» de barras (sin
//     letras) y debajo la raya de la fila. El caballete (patas, travesaño) y la bandeja con los rotuladores y el
//     borrador van en hoy(), POR DETRÁS de quien señala (hoyDelante no pinta nada; devuelve bandeja). A los lados, la
//     lámpara de pie encendida (x 12) y una planta (x 300–316). Cámara 'final': el final de la fila de cerca (pizarra
//     x 6–272, y 26–152; a la derecha, el canto de la librería): el cuarto estudio cortado por el borde, el último (el gravímetro, x 96) con su «?», una
//     flecha a trazos y una CAMARITA dibujada colgada de su cable, de perfil (el objetivo asoma a la derecha, el visor
//     arriba y un pilotito rojo que parpadea); o.ojo 0–1 (por omisión 0: sin ojo, ningún objeto con cara): le pinta
//     un OJO (un óvalo con la pupila) que se abre y parpadea de vez en cuando y encima el RECUADRO VACÍO de su respuesta, a trazos rojos que corren y laten:
//     «medir no es lo mismo que mirar». (tu-gancho, tu-medir.) Devuelve suelo, libre, pizarra: [x0, y0, x1, y1],
//     iconos: [[x, y] ×n] y, en la cámara, camarita: [x, y], recuadro: [x, y], ultimo: [x, y].
//   'caja': EL ESTUDIO A MEDIA TARDE, otro rincón (luz cálida en todo): la ventana de la izquierda (x 24–92,
//     y 34–104) con la tarde (cielo de melocotón a rosa, sol bajo, nubes de tres tonos, pájaros, tejados y árboles a
//     contraluz), la cortina recogida, el radiador, el haz de sol que cruza en diagonal hasta la tarima con sus motas,
//     la lámina de la barca, la lámpara de pie encendida (x 224), el sillón con el gato (que mira la caja) y la
//     alfombra redonda. En el centro, la mesa baja (su cara de arriba, y 133–140) con la CAJA de cartón grande
//     (PIEZAS_TU.caja a escala 3, x 126–188, y 93–140; cinta de embalar; en la cara de delante, a la izquierda del
//     agujero, una flecha de «arriba» y, abajo a la derecha, una etiqueta de envío con un recuadro rojo y barras, sin
//     letras) y su sombra larga.
//     o.agujero 0–1: el AGUJERITO se abre en la cara de delante (centro agujero); o.luz 0–1: luz dentro, que asoma por
//     él. Atom no sale de su esquina: la escena pone la mano (T.mano) y la LINTERNA (PIEZAS_TU.linterna). En
//     hoyDelante: el canto y las patas de la mesa baja (todo en y ≥ 141: no tapa la caja ni la mano). Cámara 'dentro'
//     (gag 8): DENTRO DE LA CAJA: cartón en perspectiva (fondo x 70–250, y 36–122) con su fibra y el canal de la
//     onda; arriba, las solapas con su junta y la rendija que respira; en el suelo, la junta de abajo con su cinta de
//     embalar y grapas; la pestaña de fábrica con su fila de grapas (izquierda), la etiqueta de envío sin letras y una
//     mancha de agua en el fondo, una telaraña en el rincón de arriba a la derecha, pelusas, migas, una bola de papel,
//     cacahuetes de embalar y un bramante; o.luz 0–1: el rayo de la linterna entra en cono desde arriba a la
//     izquierda, con motas que brillan, y deja un círculo de luz en el suelo que enciende el cartón de alrededor; o.otra 0–1: en ese círculo sale de la sombra OTRA CAJA más pequeña, igual, con su propio agujerito.
//     (tu-cierre.) Devuelve suelo, libre (x 14–92, delante del radiador), caja: [x0, y0, x1, y1], agujero: [x, y], mesa y, en la cámara,
//     otra: [x0, y0, x1, y1], otraAgujero: [x, y].
const V_HOY = {
  estudio: { cam: 'pared', general: { col: ['#e8d8b0', '#5a7a6a'], geo: { suelo: 162, libre: [212, 262], libre2: [10, 88], toc: [96, 82], lamina: [95, 46], estetoscopio: [70, 84] } }, pared: { col: ['#ecdcb4', '#b08a50'], geo: { suelo: 160, libre: [0, 0], punto: [150, 92], toc: [150, 92], lamina: [68, 66] } } },
  mesa: { cam: 'manzana', general: { col: ['#7a4a2a', '#54301a'], geo: { suelo: 180, libre: [0, 0], manzana: [244, 122], borde: [252, 150] } }, manzana: { col: ['#e8d8b0', '#86623c'], geo: { suelo: 160, libre: [0, 0], manzana: [184, 58], flecha: [232, 72] } } },
  pizarra: { cam: 'final', general: { col: ['#f4f4f0', '#5a7a6a'], geo: { suelo: 162, libre: [20, 300], pizarra: [48, 28, 272, 142], iconos: [[79, 98], [120, 98], [160, 98], [200, 98], [241, 98]] } }, final: { col: ['#f8f8f4', '#8a8a86'], geo: { suelo: 180, libre: [0, 0], camarita: [216, 100], recuadro: [216, 50], ultimo: [96, 100] } } },
  caja: { cam: 'dentro', general: { col: ['#f0c890', '#6a5a48'], geo: { suelo: 162, libre: [14, 92], caja: [126, 93, 188, 140], agujero: [151, 121], mesa: [96, 133, 224, 140] } }, dentro: { col: ['#5a4028', '#1c140c'], geo: { suelo: 180, libre: [0, 0], otra: [137, 110, 179, 144], otraAgujero: [154, 131] } } },
};
export function hoy(R, t, o = {}) {
  const [enc, cam] = g_hyVista(o), geo = JSON.parse(JSON.stringify(V_HOY[enc][cam].geo));
  const f = { estudio: { general: g_hyEstudio, pared: g_hyPared }, mesa: { general: g_hyMesa, manzana: g_hyManzana }, pizarra: { general: g_hyPizarra, final: g_hyFinal }, caja: { general: g_hyCaja, dentro: g_hyDentro } }[enc][cam];
  return { encuadre: enc, camara: cam, ...geo, ...(f(R, t, o) || {}) };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  const [enc, cam] = g_hyVista(o);
  const f = { estudio: { general: g_hyEstudioDelante, pared: g_hyParedDelante }, pizarra: { general: g_hyPizarraDelante }, caja: { general: g_hyCajaDelante } }[enc]?.[cam];
  return f ? f(R, t, o) || {} : {};
}
// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_TU = { valle: V_VALLE, tumba: V_TUMBA, cairo: V_CAIRO, escaneo: V_ESCANEO, radares: V_RADARES, ladera: V_LADERA, hoy: V_HOY };

// umbral de trama ordenada 4 × 4 (0–1), para pasar de un tono a otro sin bandas
const A_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const a_umb = (x, y) => (A_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla de dos colores (k = 0: a; k = 1: b)
function a_mez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// la esquina de Atom y la barra del año (con sus cifras): ahí no va nada vivo ni contrastado
const a_quieta = (x, y) => (x > 268 && y < 48) || (x > 14 && x < 178 && y < 22);

// la luz del exterior (o.luz) y la época (o.epoca)
const a_luz = (o) => (o.luz === 'tarde' || o.luz === 'noche' ? o.luz : 'dia');

// aplaca una zona quieta (la esquina de Atom o la barra del año): mezcla cada píxel con el tono medio de la zona
function a_calma(R, x0, y0, x1, y1, k = 0.75) {
  let r = 0, g = 0, b = 0, n = 0; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = R.pget(x, y); r += c & 255; g += (c >>> 8) & 255; b += (c >>> 16) & 255; n++; }
  const m = (0xff000000 | (Math.round(b / n) << 16) | (Math.round(g / n) << 8) | Math.round(r / n)) >>> 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, a_mez(R.pget(x, y), m, k));
}

// el tinte de la luz: la tarde, rosa y naranja; la noche, azul y oscura (memorizado por color)
// (multiplicativo, para que lo negro siga negro: los huecos de las tumbas no se aclaran)
const A_LUZ = { tarde: [[1.02, 0.84, 0.72], [22, 8, 0]], noche: [[0.36, 0.42, 0.7], [0, 2, 10]] };

const A_TINTES = new Map();

function a_tinte(c, luz) {
  if (!A_LUZ[luz]) return c; const k = luz + c; let v = A_TINTES.get(k);
  if (v === undefined) { const [f, s] = A_LUZ[luz], ch = [c & 255, (c >>> 8) & 255, (c >>> 16) & 255], l = (ch[0] + ch[1] + ch[2]) / 765, o = ch.map((q, i) => Math.max(0, Math.min(255, Math.round(q * f[i] + s[i] * l))));
    v = (0xff000000 | (o[2] << 16) | (o[1] << 8) | o[0]) >>> 0; A_TINTES.set(k, v); }
  return v;
}

// un color de la paleta de abajo, ya teñido por la luz
const A_P = {
  r0: '#f8e6c0', r1: '#ecd0a2', r2: '#ddb784', r3: '#c4985e', r4: '#9a7048', r5: '#6e4e38', rosa: '#e6b496', rosaS: '#c48c72', az: '#a8939a', azS: '#7c6a78',
  a0: '#f4e0b4', a1: '#e8cc98', a2: '#d8b47e', a3: '#c4a46c', a4: '#a08050', pie: '#fff4d8', guija: '#b4a090', guijaS: '#7a6a62', guijaL: '#e4d8c8',
  hueco: '#1e1410', huecoS: '#3a2a20', cesta: '#c89a50', cestaS: '#8a6430', cestaL: '#e8c078', madera: '#8a6038', maderaS: '#5a3e26', maderaL: '#b88a54',
  hierro: '#4a4652', hierroL: '#8a8696', lona: '#efe6d0', lonaS: '#c4b89c', galab: '#e8e4dc', galabS: '#b4aca4', azulG: '#6a86a8', azulGS: '#4a5e7c',
  piel: '#a8704a', pielS: '#7a4a30', turb: '#f4f0e8', negro: '#1a1418', oro: '#f0c040', oroS: '#b07a18', oroL: '#fff0a0', asfalto: '#7a7470', asfaltoS: '#5e5854', asfaltoL: '#9a948c', rojo: '#c84a3a', verde: '#5a8a4a',
};

const A_PC = new Map();

const a_c = (n, luz = 'dia') => { const k = n + luz; let v = A_PC.get(k); if (v === undefined) { v = a_tinte(hex(A_P[n] ?? n), luz); A_PC.set(k, v); } return v; };

// guarda en un búfer lo que se pinta una vez (clave: vista, luz y época): dibuja() pinta en colores de día y deja a 0 el
// cielo; después se tiñe con la luz y se pone el cielo de esa luz donde quedó a 0. Devuelve { buf, cielo } (cielo: la
// máscara de lo que es cielo, para que las nubes no pisen la roca)
const A_CAPAS = new Map();

function a_capa(R, clave, luz, dibuja, cieloO = {}) {
  const e = A_CAPAS.get(clave); if (e && e.R === R) return e;
  const buf = R.nuevo(); buf.fill(0); const prev = R.usar(buf); dibuja(buf); R.usar(prev);
  const cielo = new Uint8Array(320 * 180);
  for (let i = 0; i < buf.length; i++) { if (buf[i] === 0) cielo[i] = 1; else if (luz !== 'dia') buf[i] = a_tinte(buf[i], luz); }
  a_cieloFijo(buf, cielo, luz, cieloO);
  const v = { R, buf, cielo }; A_CAPAS.set(clave, v); return v;
}

// EL CIELO del valle (canon: liso y casi blanco de sol arriba, sin franjas: trama ordenada entre cinco tonos), el sol con
// su halo tramado (de tarde, bajo y naranja), o de noche la luna, estrellas fijas y un velo de Vía Láctea. Solo donde
// cielo = 1. o.hor: la altura a la que llega el degradado; o.sol: [x, y, r]
const A_CIELOS = {
  dia: ['#c6d6e2', '#d4e0e8', '#e2e8ea', '#eeeee6', '#f6f0de'], tarde: ['#6e7ab0', '#a088ae', '#d8949a', '#f2ae8a', '#fccc96'], noche: ['#0e1430', '#141a3e', '#1a2248', '#222c56', '#2c3662'],
};

function a_cieloFijo(B, cielo, luz, o = {}) {
  const cs = A_CIELOS[luz].map(hex), hor = o.hor ?? 100, n = cs.length;
  for (let y = 0; y < 180; y++) { const u = Math.min(0.999, y / hor) * (n - 1), i = Math.floor(u), p = u - i;
    for (let x = 0; x < 320; x++) { const q = y * 320 + x; if (!cielo[q]) continue; B[q] = i + 1 < n && a_umb(x, y) < p ? cs[i + 1] : cs[i]; } }
  const pon = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const q = y * 320 + x; if (cielo[q]) B[q] = c; };
  if (luz === 'noche') {
    const [lx, ly, lr] = o.luna ?? [214, 34, 6], cl = hex('#f4f0d8'), clS = hex('#c8c4b0');
    for (let k = 0; k < 140; k++) { const x = Math.round(h(k, 1, 701) * 319), y = Math.round(h(k, 2, 701) ** 1.4 * 110); if (a_quieta(x, y) || Math.hypot(x - lx, y - ly) < 12) continue; pon(x, y, h(k, 3, 701) < 0.3 ? hex('#9aa0d0') : hex('#5a6098')); }
    for (let y = 20; y < 110; y++) for (let x = 0; x < 320; x++) { const d = Math.abs((x - 20) * 0.4 - (y - 6) - 20); if (d > 12 || a_quieta(x, y)) continue; const q = (1 - d / 12) * (0.4 + h(x >> 2, y >> 2, 702) * 0.6); if (a_umb(x, y) < q * 0.5) { const i = y * 320 + x; if (cielo[i]) B[i] = a_mez(B[i], hex('#6a6aa8'), 0.3); } }
    for (let y = ly - lr - 7; y <= ly + lr + 7; y++) for (let x = lx - lr - 7; x <= lx + lr + 7; x++) { const d = Math.hypot(x - lx, y - ly), d2 = Math.hypot(x - lx - lr * 0.55, y - ly + lr * 0.25);
      if (d <= lr && d2 > lr * 0.85) pon(x, y, d > lr - 1 || (x * 3 + y) % 7 === 0 ? clS : cl); else if (d > lr && d < lr + 7 && a_umb(x, y) < (lr + 7 - d) / 14) { const i = y * 320 + x; if (cielo[i]) B[i] = a_mez(B[i], cl, 0.2); } }
    return;
  }
  const [sx, sy, sr] = o.sol ?? (luz === 'tarde' ? [238, 70, 9] : [232, 30, 6]), R2 = sr * 3.2;
  const sc = luz === 'tarde' ? ['#fff0c0', '#ffc86a', '#f89a50'] : ['#ffffff', '#fffcea', '#fff2c8'];
  for (let y = Math.floor(sy - R2); y <= sy + R2; y++) for (let x = Math.floor(sx - R2); x <= sx + R2; x++) {
    if (x < 0 || x > 319 || y < 0 || y > 179) continue; const d = Math.hypot(x - sx, y - sy), i = y * 320 + x; if (!cielo[i]) continue;
    if (d <= sr) B[i] = hex(d < sr * 0.6 ? sc[0] : d < sr - 1 ? sc[1] : sc[2]);
    else if (!a_quieta(x, y)) { const q = 1 - (d - sr) / (R2 - sr); if (a_umb(x, y) < q * q * 0.95) B[i] = a_mez(B[i], hex(sc[1]), 0.5); }
  }
}

// lo que se mueve en el cielo: estrellas que titilan (noche), velos de cirro lentos y cúmulos pequeños de tres tonos a
// tres velocidades (solo donde hay cielo y nunca en la esquina de Atom ni en la barra del año)
function a_cieloVivo(R, t, capa, luz, o = {}) {
  const B = R.buf, M = capa.cielo, pon = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179 || a_quieta(x, y)) return; const q = y * 320 + x; if (M[q]) B[q] = c; };
  if (luz === 'noche') {
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 4, 703) * 319), y = Math.round(h(k, 5, 703) ** 1.3 * 100), tw = Math.sin(t * (1.3 + h(k, 6, 703) * 2.4) + k * 1.9); if (tw > -0.2) pon(x, y, tw > 0.55 ? hex('#ffffff') : hex('#c0c6f0')); }
    const k = Math.floor(t / 7), u = (t % 7) / 0.6; if (u < 1) { const x0 = 40 + h(k, 1, 704) * 150, y0 = 26 + h(k, 2, 704) * 20; for (let i = 0; i < 9; i++) pon(x0 + u * 50 - i * 1.8, y0 + u * 16 - i * 0.6, i < 2 ? hex('#ffffff') : hex('#9aa0d8')); }
    return;
  }
  const tarde = luz === 'tarde', cir = tarde ? [hex('#f6c0a0'), hex('#fce0c0')] : [hex('#e8eef2'), hex('#fafcfc')];
  const nub = tarde ? [hex('#ffe8cc'), hex('#f4b896'), hex('#c88a90')] : [hex('#ffffff'), hex('#eef2f4'), hex('#c8d4de')];
  const y0 = o.y0 ?? 24, y1 = o.y1 ?? 60;
  for (let k = 0; k < 4; k++) { const w = 46 + Math.round(h(k, 5, 705) * 50), x0 = ((h(k, 6, 705) * 440 + t * (0.7 + k * 0.25)) % 480) - 90, y = Math.round(y0 + (y1 - y0) * (0.1 + k * 0.24));
    for (let i = 0; i < w; i++) { const x = x0 + i; if (h(i >> 2, k, 706) < 0.25) continue; const e = Math.sin(i / w * Math.PI); pon(x, y, e > 0.45 ? cir[1] : cir[0]); if (e > 0.6 && i % 3) pon(x + 2, y - 1, cir[0]); if (e > 0.5 && i % 5 === 0) pon(x - 3, y + 1, cir[0]); } }
  for (const [x0, yy, w, v] of o.nubes ?? [[20, 34, 22, 1.6], [150, 44, 16, 1.0], [260, 52, 28, 2.6], [90, 30, 14, 0.7]]) {
    const cx = ((x0 + t * v) % 400) - 40, cy = Math.max(yy, y0 + 6), n = 3 + Math.round(w / 10);
    if (cx > 236 && cy < 56) continue;   // nunca hacia la esquina de Atom
    const bolas = []; for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.16 + 0.13 * Math.cos(u * Math.PI)); bolas.push([cx + u * w * 0.86, cy - r * 0.35, r]); }
    const base = Math.round(cy + w * 0.06);
    for (const [c, dx, dy, f, lim] of [[nub[2], 0, 1, 1, base + 1], [nub[1], 0, 0, 0.94, base - 1], [nub[0], -1, -1.5, 0.58, base - 3]])
      for (const [bx, by, r] of bolas) { const rr = r * f; for (let j = -Math.ceil(rr); j <= rr; j++) for (let i = -Math.ceil(rr); i <= rr; i++) if (i * i + j * j <= rr * rr && by + dy + j <= lim) pon(bx + dx + i, by + dy + j, c); }
  }
}

// LA ROCA CALIZA (en capas): el color de un píxel de un cerro. y0: dónde empieza el cerro en esa columna; luzD: la luz
// viene de la derecha (canon del valle: sol arriba a la derecha); k: semilla. Estratos de 6–8 px que ondulan, aristas
// claras de cada estrato, costillas verticales (canales de la lluvia) con su lado en sombra azulada, grietas, picaduras,
// alguna capa rosada
function a_rocaCol(x, y, y0, k, inc = 0) {
  const sy = y + a_vn(x, y, 34, 20, k + 7) * 8 + Math.sin(x * 0.031 + k) * 3 + x * inc, t2 = sy / 8, u = t2 + 0.35 * Math.sin(t2 * 1.7 + k), banda = Math.floor(u), p = u - banda;
  const g = a_vn(x + y * 0.22, 0, 7, 1, k) * 0.55 + a_vn(x, y, 16, 44, k + 1) * 0.3 + h(x, y, k + 9) * 0.15, rosa = h(banda, 3, k + 2) < 0.3;
  if (y - y0 < 1) return 'r0';
  if (h(x, y, k + 3) < 0.015) return g < 0.4 ? 'r4' : 'r3';
  if (p < 0.11) return g > 0.38 ? 'r0' : 'r2';   // la arista del estrato, al sol
  if (p > 0.9) return g > 0.55 ? 'r3' : 'azS';   // la sombra bajo la arista
  if (g > 0.6) return rosa ? 'rosa' : 'r1';
  if (g > 0.45) return rosa && a_umb(x, y) < 0.5 ? 'rosa' : 'r2';
  if (g > 0.36) return a_umb(x, y) < 0.5 ? (rosa ? 'rosaS' : 'r3') : 'r2';
  return g < 0.27 ? 'azS' : 'az';
}

// ruido de valor suave (0–1) en una rejilla de sx × sy px, interpolado
function a_vn(x, y, sx, sy, k) {
  const gx = x / sx, gy = y / sy, x0 = Math.floor(gx), y0 = Math.floor(gy), fx = gx - x0, fy = gy - y0, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = h(x0, y0, k), b = h(x0 + 1, y0, k), c = h(x0, y0 + 1, k), d = h(x0 + 1, y0 + 1, k);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

// pinta un cerro: para cada x de x0 a x1, de top(x) hasta yb (o yb(x)); bruma 0–1 lo funde con el aire lejano
function a_cerro(R, x0, x1, top, yb, k, bruma = 0, inc = 0) {
  const aire = hex('#e8e2dc');
  for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const y0 = Math.round(top(x)), y1 = Math.round(typeof yb === 'function' ? yb(x) : yb);
    for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { let c = a_c(a_rocaCol(x, y, y0, k, inc)); if (bruma > 0) c = a_mez(c, aire, bruma * (0.85 + 0.15 * a_umb(x, y))); R.pset(x, y, c); } }
}

// un cono de escombro claro (canon: los conos de las excavaciones): cascotes de caliza blancuzca con su sombra a la izquierda
function a_cono(R, cx, base, w, alto, k, bruma = 0) {
  const aire = hex('#e8e2dc');
  for (let y = base - alto; y <= base; y++) { const u = (y - (base - alto)) / alto, hw = w * (0.12 + 0.88 * Math.pow(u, 0.8)) / 2;
    for (let x = Math.round(cx - hw); x <= Math.round(cx + hw); x++) { const s = (x - cx) / hw, q = h(x, y, k);
      let c = q < 0.1 ? 'r3' : q < 0.2 ? 'pie' : s < -0.35 ? (a_umb(x, y) < 0.5 ? 'r2' : 'az') : s > 0.3 ? 'r0' : 'r1';
      if (y === base - alto) c = 'pie'; let v = a_c(c); if (bruma) v = a_mez(v, aire, bruma); R.pset(x, y, v); } }
}

// el suelo del valle entre y0 e y1: arena tramada en tres tonos, guijas, chinos claros y ondas del viento
function a_arena(R, y0, y1, k = 0, x0 = 0, x1 = 319) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const q = h(x, y, 710 + k), o = Math.sin(x * 0.12 + y * 0.9 + h(x >> 4, y >> 2, 711 + k) * 3);
    R.pset(x, y, a_c(q < 0.012 ? 'guijaS' : q < 0.024 ? 'a4' : q < 0.045 ? 'pie' : o > 0.82 ? 'a0' : o < -0.86 ? 'a3' : (y + (x >> 3)) % 2 && a_umb(x, y) < 0.3 ? 'a2' : 'a1')); }
}

// una piedra redondeada (luz arriba a la derecha, sombra abajo)
function a_piedra(R, x, y, rx, ry, c = 'guija', luz = 'dia') {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d > 1) continue; const l = i / rx - j / ry; R.pset(x + i, y + j, a_c(d > 0.75 && j > 0 ? c + 'S' : l > 0.6 ? c + 'L' : c, luz)); }
  R.pset(x - rx, y + ry, a_c('a4', luz));
}

// una cesta de esparto (w de ancho): la boca oscura, el tejido a rayas y las asas; volcada: de lado
function a_cesta(R, x, base, w = 8, luz = 'dia', volcada = false) {
  const c = (n) => a_c(n, luz), hw = w >> 1;
  if (volcada) { for (let j = -3; j <= 3; j++) for (let i = 0; i <= w; i++) { const e = Math.abs(j) / 3.5; if (e > 1) continue; R.pset(x - hw + i, base - 3 + j, i === 0 ? c('maderaS') : (i + j) % 3 === 0 ? c('cestaS') : j < 0 ? c('cestaL') : c('cesta')); } R.rect(x - hw - 1, base - 5, x - hw, base - 1, c('hueco')); return; }
  R.rect(x - hw, base - 5, x + hw, base, c('cesta')); for (let i = -hw; i <= hw; i++) for (let j = 0; j < 5; j++) if ((i + j) % 3 === 0) R.pset(x + i, base - j, c('cestaS'));
  R.rect(x - hw, base - 6, x + hw, base - 6, c('cestaL')); R.rect(x - hw + 1, base - 6, x + hw - 1, base - 6, c('hueco')); R.pset(x - hw - 1, base - 5, c('cestaS')); R.pset(x + hw + 1, base - 5, c('cestaS')); R.rect(x - hw + 1, base, x + hw, base, c('a4'));
}

// un obrero pequeño de fondo (galabiya larga, turbante; 9–10 px): anda (o.anda), lleva una cesta en la cabeza (o.cesta),
// cava con la azada (o.cava) o criba (o.criba); k: el color de la ropa
function a_obrero(R, x, suelo, t, k = 0, o = {}) {
  const luz = o.luz ?? 'dia', c = (n) => a_c(n, luz), d = o.dir ?? 1, X = Math.round(x), p = o.anda ? Math.floor(t * 5 + k) % 2 : 0;
  const ropa = c(['galab', 'azulG', 'galab', 'r4'][k % 4]), ropaS = c(['galabS', 'azulGS', 'galabS', 'r5'][k % 4]);
  R.pset(X - 1 + p, suelo, c('pielS')); R.pset(X + 1 - p, suelo, c('pielS'));
  R.rect(X - 1, suelo - 6, X + 1, suelo - 1, ropa); R.rect(X - 1, suelo - 1, X + 1, suelo - 1, ropaS); R.pset(X + d, suelo - 4, ropaS);
  R.pset(X, suelo - 7, c('piel')); R.pset(X + d, suelo - 7, c('piel')); R.rect(X - 1, suelo - 9, X + 1, suelo - 8, c('turb')); R.pset(X - d, suelo - 8, c('galabS'));
  const b = o.cava ? Math.round(Math.sin(t * 5 + k) * 1.5) : 0;
  if (o.cesta) { R.rect(X - 2, suelo - 12, X + 2, suelo - 10, c('cesta')); R.rect(X - 2, suelo - 12, X + 2, suelo - 12, c('cestaL')); R.pset(X + d * 2, suelo - 9, c('piel')); R.pset(X + d * 2, suelo - 10, c('piel')); }
  else if (o.cava) { R.linea(X + d, suelo - 5, X + d * 4, suelo - 9 + b * 2, c('maderaS')); R.pset(X + d * 4, suelo - 9 + b * 2, c('hierro')); R.pset(X + d * 5, suelo - 8 + b * 2, c('hierro')); }
  else R.pset(X + d * 2, suelo - 5, c('piel'));
}

// un burrito lejano de fondo (8 px), con su carga de cestas y las patas que se cruzan al andar
function a_burrito(R, x, suelo, t, d, luz = 'dia') {
  const c = (n) => a_c(A_BURRO[n] ?? n, luz), X = (i) => Math.round(x + i * d), f = Math.floor(t * 5) % 2;
  for (let i = 0; i <= 6; i++) { R.pset(X(i), suelo - 4, c('a')); R.pset(X(i), suelo - 3, c('a')); } R.pset(X(7), suelo - 5, c('a')); R.pset(X(8), suelo - 5, c('a')); R.pset(X(8), suelo - 4, c('l')); R.pset(X(7), suelo - 6, c('s'));
  for (const [i, g] of [[0, f], [2, 1 - f], [5, f], [6, 1 - f]]) { R.pset(X(i + g), suelo - 1, c('s')); R.pset(X(i), suelo - 2, c('s')); R.pset(X(i + g), suelo, c('h')); }
  R.rect(Math.min(X(2), X(4)), suelo - 6, Math.max(X(2), X(4)), suelo - 5, c('cesta')); R.pset(X(-1), suelo - 4, c('n'));
}

// un burro chibi (a la escala de los personajes, ~22 px de largo): gris con el hocico claro, crin oscura y orejas
// largas que se mueven; dir: hacia dónde mira; o.masca: mastica; o.cabeza: solo cabeza y cuello (asoma por una puerta);
// o.ata: la cuerda hasta [x, y]; o.carga: alforjas
const A_BURRO = { a: '#8c8494', s: '#5e5866', l: '#b4acb8', m: '#e8e0e4', h: '#2a2430', n: '#3a3440' };

function a_burro(R, x, suelo, t, o = {}) {
  const luz = o.luz ?? 'dia', c = (n) => a_c(A_BURRO[n], luz), d = o.dir ?? 1, X = (i) => Math.round(x + i * d), Y = (j) => Math.round(suelo - j);
  const px = (i, j, n) => R.pset(X(i), Y(j), c(n)), fila = (i0, i1, j, n) => { for (let i = i0; i <= i1; i++) px(i, j, n); };
  const masca = o.masca ? Math.floor(t * 7) % 2 : 0, oreja = Math.sin(t * 1.7 + x) > 0.85 ? 1 : 0, cola = Math.round(Math.sin(t * 2.3 + x) * 1.5);
  if (!o.cabeza) {
    for (let j = 9; j <= 15; j++) fila(-10, 4, j, j === 15 ? 'l' : j < 11 ? 's' : 'a');   // el cuerpo
    for (let j = 9; j <= 14; j++) { px(-11, j, 's'); px(5, j, 'a'); } fila(-9, 3, 9, 's'); px(-8, 11, 'm'); px(-7, 10, 'm');
    for (const [i, f] of [[-9, 0], [-6, 1], [1, 1], [4, 0]]) for (let j = 0; j <= 8; j++) px(i + (j < 3 && o.anda && (Math.floor(t * 6) % 2) === f ? 1 : 0), j, j < 1 ? 'h' : j < 3 ? 's' : 'a');
    for (let j = 9; j <= 13; j++) px(-12 + (j < 11 ? cola : 0), j, 'n'); px(-12 + cola, 8, 'h');
    if (o.carga) { for (let j = 13; j <= 18; j++) fila(-6, 0, j, j === 18 ? 'm' : 'l'); R.rect(Math.min(X(-6), X(0)), Y(13), Math.max(X(-6), X(0)), Y(13), a_c('cestaS', luz)); }
  }
  // el cuello, la crin, la cabeza y el hocico (que se mueve al mascar)
  for (let j = 13; j <= 19; j++) fila(3, 6, j, j > 17 ? 'a' : 'a'); for (let j = 14; j <= 20; j++) px(3, j, 'n');
  for (let j = 16; j <= 21; j++) fila(6, 10, j, 'a'); fila(9, 12, 16 - masca, 'm'); fila(9, 12, 17, 'm'); fila(10, 12, 18, 'l'); px(12, 18 - masca, 'h'); px(11, 15 - masca, 'h');
  px(8, 20, 'h'); px(7, 19, 'l');   // el ojo y su brillo
  for (let j = 22; j <= 26; j++) { px(6 - (j > 24 ? oreja : 0), j, j === 26 ? 'h' : 'a'); px(8, j, j === 26 ? 'h' : 's'); } px(7, 22, 'a'); px(7, 23, 'm');
  if (o.ata) { const [ax, ay] = o.ata; R.linea(X(10), Y(16), ax, ay, a_c('maderaL', luz)); }
}

// el pico de pirámide (canon: cima en x ≈ 60, y 26), lejano y con bruma: la cara de la derecha al sol, la izquierda en
// sombra azulada, estratos finos y canales
function a_pico(R, bruma = 0.42) {
  const aire = hex('#e8e2dc'), top = (x) => x < 60 ? 26 + (60 - x) * 0.62 + Math.max(0, 22 - x) * 0.3 : 26 + (x - 60) * 0.5 + Math.sin(x * 0.2) * 0.8;
  for (let x = 0; x <= 150; x++) { const y0 = Math.round(top(x)); for (let y = y0; y <= 90; y++) {
    const sol = x >= 60, q = h(x, y, 720), estr = (y + Math.round(x * (sol ? 0.18 : -0.2))) % 5 === 0, canal = Math.sin(x * 0.5 + y * 0.08) > 0.75;
    let c = y - y0 < 1 ? (sol ? 'r0' : 'r2') : sol ? (estr ? 'r2' : canal ? 'r2' : q < 0.08 ? 'r3' : 'r1') : (estr ? 'azS' : canal ? 'azS' : q < 0.1 ? 'r3' : 'az');
    R.pset(x, y, a_mez(a_c(c), aire, bruma * (0.9 + 0.1 * a_umb(x, y)))); } }
}

// la boca de una tumba en la roca: el hueco negro con el dintel tallado, las jambas en sombra y los cascotes del umbral
function a_boca(R, x0, y0, w, alto, luz = 'dia') {
  const c = (n) => a_c(n, luz);
  R.rect(x0 - 2, y0 - 3, x0 + w + 2, y0 - 1, c('r3')); R.rect(x0 - 2, y0 - 3, x0 + w + 2, y0 - 3, c('r0'));
  R.rect(x0, y0, x0 + w, y0 + alto, c('hueco')); R.rect(x0, y0, x0 + 1, y0 + alto, c('huecoS')); R.rect(x0, y0, x0 + w, y0, c('huecoS'));
  for (let i = 0; i < w; i += 3) R.pset(x0 + 1 + i + (i % 2), y0 + alto, c(i % 2 ? 'r1' : 'pie'));
}

// los raíles de las vagonetas (Decauville) entre (x0, y0) y (x1, y1): traviesas de madera y dos carriles de hierro
function a_rail(R, x0, y0, x1, y1, luz = 'dia') {
  const c = (n) => a_c(n, luz), n = Math.ceil(Math.hypot(x1 - x0, y1 - y0));
  for (let i = 0; i <= n; i += 4) { const u = i / n, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u), w = Math.round(3 + u * -1 + (1 - u) * 2); R.rect(x - 1, y - w, x, y + w, c('maderaS')); R.pset(x - 1, y - w, c('madera')); }
  for (const dy of [-3, 3]) for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u + dy * (1 - u * 0.4)); R.pset(x, y, c('hierro')); R.pset(x, y - 1, c('hierroL')); }
}

// la vagoneta de volquete sobre el raíl (u 0–1: dónde va), cargada de cascotes
function a_vagoneta(R, x, y, luz = 'dia') {
  const c = (n) => a_c(n, luz); x = Math.round(x); y = Math.round(y);
  R.rect(x - 8, y - 9, x + 8, y - 3, c('hierro')); R.rect(x - 7, y - 8, x + 7, y - 4, c('r4')); R.rect(x - 8, y - 9, x + 8, y - 9, c('hierroL'));
  for (let i = -7; i <= 7; i++) R.pset(x + i, y - 10 - Math.round(Math.cos(i / 7 * 1.4) * 2), c(h(i, 1, 730) < 0.4 ? 'pie' : 'r1'));
  R.rect(x - 6, y - 2, x + 6, y - 2, c('negro')); for (const dx of [-5, 5]) { R.disco(x + dx, y, 2, c('negro')); R.pset(x + dx, y, c('hierroL')); }
}

// la criba de malla en su caballete de palos, con la arena que cae (s: lo que se mueve)
function a_criba(R, x, suelo, t, luz = 'dia', vivo = true) {
  const c = (n) => a_c(n, luz), s = vivo ? Math.round(Math.sin(t * 9) * 1) : 0;
  R.linea(x - 9, suelo, x - 5, suelo - 11, c('maderaS')); R.linea(x + 9, suelo, x + 5, suelo - 11, c('maderaS')); R.linea(x - 7, suelo, x - 3, suelo - 11, c('madera'));
  R.rect(x - 10 + s, suelo - 13, x + 10 + s, suelo - 11, c('madera')); R.rect(x - 10 + s, suelo - 13, x + 10 + s, suelo - 13, c('maderaL'));
  for (let i = -9; i <= 9; i += 2) R.pset(x + i + s, suelo - 12, c('hierro'));
  if (vivo) for (let k = 0; k < 6; k++) { const f = (t * 2.4 + k / 6) % 1; R.pset(x - 7 + k * 3 + s, suelo - 10 + Math.round(f * 9), c(k % 2 ? 'a2' : 'a0')); }
  R.rect(x - 8, suelo - 1, x + 8, suelo, c('a3')); R.rect(x - 5, suelo - 2, x + 5, suelo - 2, c('a2'));
}

// un montón de arena (cx, base, w de ancho, alto): la ladera al sol a la derecha, la de sombra azulada a la izquierda,
// granos y alguna piedra; devuelve la función de la cresta (y en cada x)
function a_monton(R, cx, base, w, alto, k = 0, luz = 'dia') {
  const c = (n) => a_c(n, luz), cresta = (x) => base - alto * Math.max(0, 1 - ((x - cx) / (w / 2)) ** 2) ** 0.75;
  for (let x = Math.round(cx - w / 2); x <= cx + w / 2; x++) { const y0 = Math.round(cresta(x)); for (let y = y0; y <= base; y++) { const s = (x - cx) / (w / 2), q = h(x, y, 740 + k);
    R.pset(x, y, c(y === y0 ? (s > -0.2 ? 'pie' : 'a1') : q < 0.02 ? 'a4' : q < 0.035 ? 'guija' : s < -0.25 ? (s < -0.6 && a_umb(x, y) < 0.35 ? 'az' : 'a3') : s < 0.05 ? 'a2' : s > 0.45 ? 'a0' : 'a1')); } }
  return cresta;
}

function a_valleGen(R, t, o) {
  const luz = a_luz(o), hoy = (o.epoca ?? 1922) >= 2000, c = (n) => a_c(n, luz), dia = luz === 'dia';
  const capa = a_capa(R, 'valle|' + luz + '|' + hoy, luz, () => {
    a_pico(R);
    // el fondo del valle que sigue lejos (centro), con bruma
    a_cerro(R, 96, 230, (x) => 74 + Math.sin(x * 0.07) * 3 + Math.abs(x - 160) * 0.06, 112, 750, 0.5);
    a_cono(R, 176, 104, 30, 9, 751, 0.35);
    // los acantilados de la izquierda, escalonados: el de arriba, la repisa y el de abajo
    a_cerro(R, 0, 132, (x) => 64 + Math.max(0, x - 70) * 0.35 + Math.sin(x * 0.11) * 2 + (h(x >> 2, 1, 752) < 0.2 ? 1 : 0), 92, 753, 0.15);
    for (let x = 0; x <= 140; x++) { const y = 92 + Math.round(Math.sin(x * 0.09) * 1.5); R.pset(x, y, c('r0')); R.pset(x, y + 1, c('pie')); }
    a_cerro(R, 0, 150, (x) => 94 + Math.max(0, x - 96) * 0.4 + Math.sin(x * 0.15) * 1.5, 120, 754, 0.05);
    // los acantilados de la derecha, más cerca y más altos, con la repisa de la perforadora (x 220–262)
    a_cerro(R, 184, 319, (x) => x < 214 ? 118 - (x - 184) * 2.2 : 52 - Math.min(2, (x - 214) * 0.1) + Math.sin(x * 0.2), 122, 755, 0, 0.02);
    for (let x = 218; x <= 268; x++) { const e = Math.min(x - 218, 268 - x), y0 = 72 - Math.min(3, e >> 2); for (let y = y0; y <= 73; y++) R.pset(x, y, c(y === y0 ? 'pie' : a_umb(x, y) < 0.5 ? 'r0' : 'a0')); R.pset(x, 74, c('r4')); R.pset(x, 75, c('azS')); R.pset(x, 76, c('az')); }   // la repisa (una terraza de la roca)
    // bocas de tumbas en la roca
    a_boca(R, 30, 101, 8, 9); a_boca(R, 112, 106, 6, 7); a_boca(R, 292, 102, 10, 13); a_boca(R, 206, 106, 7, 10);
    // conos de escombro claro de las excavaciones
    a_cono(R, 86, 124, 64, 18, 758); a_cono(R, 168, 122, 54, 20, 759); a_cono(R, 272, 128, 70, 14, 760);
    // el suelo del valle
    a_arena(R, 118, 179, 0, 0, 319);
    for (let x = 0; x < 320; x++) { const y = 118 + Math.round(Math.sin(x * 0.05) * 1.5) + (x > 184 ? 4 : 0); R.pset(x, y, c('a3')); }
    // el cauce seco: un río de guijarros que baja serpenteando del fondo hacia la izquierda
    for (let y = 120; y < 180; y++) { const u = (y - 120) / 60, cx = 150 - u * 80 + Math.sin(u * 5) * 18, w = 6 + u * 26;
      for (let x = Math.round(cx - w); x <= cx + w; x++) { const q = h(x, y, 761); R.pset(x, y, c(Math.abs(x - cx) > w - 2 ? 'a3' : Math.abs(x - cx) > w - 3 ? 'a0' : q < 0.08 ? 'guijaL' : q < 0.14 ? 'guija' : (x + y) % 7 === 0 ? 'a3' : 'a2')); } }
    for (let k = 0; k < 40; k++) { const u = h(k, 1, 762), y = Math.round(122 + u * 56), cx = 150 - u * 80 + Math.sin(u * 5) * 18, w = 6 + u * 26; a_piedra(R, Math.round(cx + (h(k, 2, 762) - 0.5) * w * 1.6), y, 1 + Math.round(u * 3), 1 + Math.round(u * 1.6)); }
    if (!hoy) {
      // los montones de arena que mira Carter, a la derecha
      a_monton(R, 222, 148, 56, 22, 1); a_monton(R, 262, 150, 50, 30, 2); a_monton(R, 300, 152, 44, 18, 3);
      a_rail(R, -4, 172, 150, 128);
      for (const [x, b, w, v] of [[34, 156, 9, 0], [58, 166, 8, 0], [122, 144, 7, 0], [192, 158, 8, 1], [16, 140, 7, 0]]) a_cesta(R, x, b, w, 'dia', !!v);
      // un toldo de cañas para la sombra de los obreros, a la izquierda
      R.rect(4, 120, 44, 122, c('cestaS')); for (let x = 4; x <= 44; x += 2) R.pset(x, 120, c('cestaL')); for (const x of [6, 42]) R.rect(x, 122, x, 136, c('maderaS'));
      for (let x = 6; x <= 42; x++) for (let y = 129; y <= 136; y++) if (a_umb(x, y) < 0.5) R.pset(x, y, a_mez(R.pget(x, y), hex('#6a5a70'), 0.35));
      R.rect(12, 132, 20, 136, c('maderaS')); R.pset(13, 131, c('r1')); R.pset(28, 135, c('cesta'));   // la jarra y un fardo
    } else {
      // hoy: el sendero asfaltado con bordillo, el toldo de las sombras, bancos y papeleras, y la repisa con la perforadora
      for (let y = 132; y < 180; y++) { const u = (y - 132) / 48, cx = 210 - u * 60 + Math.sin(u * 3) * 10, w = 10 + u * 22;
        for (let x = Math.round(cx - w); x <= cx + w; x++) { const b = Math.abs(x - cx) > w - 2; R.pset(x, y, c(b ? 'r0' : h(x, y, 763) < 0.06 ? 'asfaltoL' : h(x >> 1, y, 764) < 0.1 ? 'asfaltoS' : 'asfalto')); } }
      R.rect(14, 118, 92, 120, c('lona')); R.rect(14, 121, 92, 121, c('lonaS')); for (const x of [16, 52, 90]) R.rect(x, 121, x + 1, 140, c('hierro'));
      for (let x = 14; x <= 92; x++) for (let y = 135; y <= 142; y++) if (a_umb(x, y) < 0.55) R.pset(x, y, a_mez(R.pget(x, y), hex('#6a5a70'), 0.35));
      for (const x of [24, 62]) { R.rect(x, 136, x + 14, 137, c('madera')); R.rect(x, 138, x, 140, c('hierro')); R.rect(x + 14, 138, x + 14, 140, c('hierro')); }
      R.rect(102, 134, 105, 140, c('verde')); R.rect(102, 134, 105, 134, c('hierroL'));
      a_monton(R, 270, 150, 60, 10, 4);
    }
  }, { hor: 110 });
  R.copiar(capa.buf);
  a_cieloVivo(R, t, capa, luz, { y0: 24, y1: 56, nubes: [[10, 40, 20, 1.5], [140, 46, 14, 0.9], [210, 54, 22, 2.4], [70, 34, 12, 0.6]] });
  if (luz !== 'noche') halcon(R, t, 140, 40, 26);
  // la calima: las filas de encima de los conos tiemblan un píxel (solo de día)
  if (dia) { const B = R.buf; for (let y = 100; y < 118; y++) { const d = Math.round(Math.sin(t * 7 + y * 0.9) * 0.8); if (!d) continue; const f = y * 320, fila = B.slice(f, f + 320); for (let x = 1; x < 319; x++) B[f + x] = fila[x - d]; } }
  // los obreros diminutos que suben a los conos con cestas y bajan vacíos, y los que cavan al fondo
  for (let k = 0; k < 5; k++) { const u = ((t * 0.05 + k / 5) % 1), sube = u < 0.5, v = sube ? u * 2 : (1 - u) * 2, x = 120 + v * 40 + k * 2, y = 122 - v * 14;
    a_obrero(R, x, Math.round(y), t, k, { anda: true, cesta: sube, dir: sube ? 1 : -1, luz }); }
  for (let k = 0; k < 3; k++) a_obrero(R, 60 + k * 14, 118 + (k % 2), t, k + 1, { cava: true, dir: k % 2 ? -1 : 1, luz });
  { const u = (t * 0.03) % 1, x = Math.round(260 - u * 120), y = 106; if (!hoy) a_burrito(R, x, 120, t, -1, luz); }   // el burro de las cestas, al fondo
  if (!hoy) {
    // la vagoneta que va y viene por el raíl, empujada por un obrero, y la criba que sacude otro
    const u = 0.5 - 0.5 * Math.cos(t * 0.35), vx = -4 + 154 * (0.15 + u * 0.7), vy = 172 - 44 * (0.15 + u * 0.7); a_vagoneta(R, vx, vy - 1, luz);
    a_obrero(R, vx - 11, Math.round(vy + 6), t, 2, { anda: Math.sin(t * 0.35) !== 0, dir: 1, luz });
    a_criba(R, 108, 152, t, luz); a_obrero(R, 96, 152, t, 3, { dir: 1, luz });
    // la arena que sopla de los montones de la derecha
    for (let k = 0; k < 7; k++) { const f = (t * 0.8 + k / 7) % 1; R.pset(Math.round(262 + f * 40 + Math.sin(t * 3 + k) * 2), Math.round(120 - f * 6 + k), c('pie')); }
    if (luz === 'noche') a_farol(R, 42, 126, t, luz);
  } else {
    // el autobús diminuto aparcado, turistas que bajan por el sendero, y la perforadora esperando en su repisa con la lona
    a_bus(R, 132, 128, t, luz);
    for (let k = 0; k < 5; k++) { const u = ((t * 0.04 + k / 5) % 1), y = 134 + u * 40, x = 210 - u * 60 + Math.sin(u * 3) * 10 + (k % 2 ? -4 : 4); a_obrero(R, x, Math.round(y), t, k, { anda: true, dir: k % 2 ? 1 : -1, luz }); }
    PIEZAS_TU.perforadora?.(R, 242, 72, { t: 0, broca: 0 });
    a_lona(R, 236, 72, t, luz);
    for (const x of [224, 262]) { R.rect(x, 64, x, 72, c('rojo')); R.pset(x, 64, c('pie')); } for (let x = 224; x <= 262; x += 2) R.pset(x, 66 + Math.round(Math.sin(x * 0.3 + t * 2) * 0.5), c(x % 4 ? 'rojo' : 'pie'));
  }
  viento(R, t, { y0: 150, y1: 176, fuerza: 0.7, color: c('a0'), grano: c('a3') });
  return hoy ? { perforadora: [242, 72] } : {};
}

// la lona que tapa media perforadora y se agita con el aire
function a_lona(R, x, base, t, luz) {
  const c = (n) => a_c(n, luz), o = Math.round(Math.sin(t * 2.2) * 1.2);
  R.poligono([[x - 8, base - 22], [x + 4, base - 24], [x + 8 + o, base - 6], [x - 10, base - 4]], c('lonaS'));
  R.poligono([[x - 7, base - 22], [x + 3, base - 23], [x + 6 + o, base - 8], [x - 8, base - 6]], c('lona'));
  R.linea(x - 7, base - 15, x + 5 + o, base - 15, c('lonaS')); R.pset(x + 8 + o, base - 6, c('hierro'));
}

// el autobús diminuto de turistas (hoy), con el sol en los cristales
function a_bus(R, x, suelo, t, luz) {
  const c = (n) => a_c(n, luz); R.rect(x - 16, suelo - 9, x + 16, suelo - 2, c('lona')); R.rect(x - 16, suelo - 9, x + 16, suelo - 9, c('pie'));
  R.rect(x - 15, suelo - 7, x + 13, suelo - 5, hex('#3a4a5a')); for (let i = -14; i < 14; i += 4) R.pset(x + i, suelo - 6, c('asfaltoL')); R.rect(x - 16, suelo - 3, x + 16, suelo - 3, c('rojo'));
  for (const dx of [-10, 10]) { R.disco(x + dx, suelo - 1, 2, c('negro')); R.pset(x + dx, suelo - 1, c('hierroL')); }
  if (Math.sin(t * 1.5) > 0.7) R.pset(x + 16, suelo - 4, hex('#ffe080'));
}

// un farol de queroseno en su palo, con su halo cálido tramado (de noche)
function a_farol(R, x, y, t, luz) {
  const c = (n) => a_c(n, luz); R.rect(x, y, x, y + 12, c('maderaS')); R.rect(x - 2, y - 5, x + 2, y, c('negro')); R.rect(x - 1, y - 4, x + 1, y - 1, hex('#ffd27a'));
  const r = 14 + Math.sin(t * 9) * 0.6; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d < 4 || d > r) continue; if (a_umb(x + i, y + j) < (1 - d / r) * 0.6) { const px = Math.round(x + i), py = Math.round(y - 2 + j); R.pset(px, py, a_mez(R.pget(px, py), hex('#ffc860'), 0.35)); } }
}

function a_valleArena(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz);
  const capa = a_capa(R, 'arena|' + luz, luz, () => {
    // el acantilado de detrás, cerca, que llena la parte de arriba (más bajo hacia la izquierda, donde se ve lejos)
    a_cerro(R, 0, 120, (x) => 82 + Math.sin(x * 0.08) * 3 - x * 0.05, 112, 770, 0.4);
    a_cerro(R, 100, 319, (x) => Math.max(50, 96 - (x - 100) * 0.55 + Math.sin(x * 0.13) * 2), 118, 771, 0, -0.03);
    a_boca(R, 188, 92, 12, 16);
    a_cono(R, 60, 116, 70, 12, 772, 0.2);
    a_arena(R, 112, 179, 3);
    for (let x = 0; x < 320; x++) R.pset(x, 113 + Math.round(Math.sin(x * 0.04) * 1.5), c('a3'));
    // montones de detrás, pequeños, y el grande de la derecha
    a_monton(R, 40, 134, 70, 16, 5); a_monton(R, 120, 130, 60, 12, 6);
    a_monton(R, 252, 156, 150, 70, 7);
    // las huellas que van y vienen por la arena de delante
    for (let k = 0; k < 14; k++) { const x = 30 + k * 13 + (k % 2) * 3, y = 168 - k * 1.6 + (k % 2) * 4; R.rect(Math.round(x), Math.round(y), Math.round(x) + 2, Math.round(y) + 1, c('a3')); R.pset(Math.round(x) + 1, Math.round(y) + 2, c('a4')); R.pset(Math.round(x), Math.round(y) - 1, c('a0')); }
    // las ondas que el viento deja en la arena de delante
    for (let y = 158; y < 180; y += 4) for (let x = 0; x < 180; x++) if (Math.sin(x * 0.18 + y) > 0.3) R.pset(x, y + Math.round(Math.sin(x * 0.1) * 1), c('a3'));
  }, { hor: 120, sol: [236, 32, 6] });
  R.copiar(capa.buf);
  a_cieloVivo(R, t, capa, luz, { y0: 24, y1: 70, nubes: [[0, 46, 20, 1.4], [120, 56, 14, 0.8], [70, 36, 12, 0.5]] });
  // un obrero lejos que vacía su cesta en el cono, y otro que baja
  for (let k = 0; k < 2; k++) { const u = ((t * 0.07 + k * 0.5) % 1), sube = u < 0.5, v = sube ? u * 2 : (1 - u) * 2; a_obrero(R, 30 + v * 30, Math.round(118 - v * 4), t, k, { anda: true, cesta: sube, dir: sube ? 1 : -1, luz }); }
  // la arena que resbala por la ladera de sombra del montón grande (o.resbala 0–1) y los granos que caen siempre un poco
  const rb = o.resbala ?? 0.15, cr = (x) => 156 - 70 * Math.max(0, 1 - ((x - 252) / 75) ** 2) ** 0.75;
  for (let k = 0; k < Math.round(6 + rb * 40); k++) { const f = (t * (0.5 + h(k, 1, 773) * 0.6) + h(k, 2, 773)) % 1, x0 = 196 + h(k, 3, 773) * 40, x = x0 - f * 22, y = cr(x0) + f * (156 - cr(x0)) * 0.9 + 1;
    R.pset(Math.round(x), Math.round(y), c(k % 3 ? 'a0' : 'a2')); }
  if (rb > 0.3) { const lw = Math.round(rb * 26); for (let i = 0; i < lw; i++) { const x = 200 - i + Math.round(Math.sin(t * 6 + i) * 0.5), y = Math.round(cr(212 - i * 0.4) + i * 1.3); for (let j = 0; j < 3; j++) R.pset(x, y + j, c(j ? 'a2' : 'a0')); } R.pset(176 + Math.round(Math.sin(t * 9) * 2), 154, c('a0')); }
  // la pala clavada, la criba con sus piedrecitas, la cesta volcada, el termo y el sombrero de Carter (o.sombrero false: lo lleva)
  { const px = 230, py = 124; R.rect(px - 4, py - 1, px + 3, py + 5, c('hierro')); R.rect(px - 4, py - 1, px + 3, py - 1, c('hierroL')); R.rect(px - 3, py + 5, px + 2, py + 6, c('hierro'));
    R.linea(px - 1, py - 1, px - 5, py - 30, c('madera')); R.linea(px, py - 1, px - 4, py - 30, c('maderaS')); R.rect(px - 9, py - 32, px - 1, py - 31, c('madera')); R.rect(px - 9, py - 32, px - 1, py - 32, c('maderaL')); }
  { const x = 122, y = 164; R.disco(x, y, 9, c('maderaS')); R.disco(x, y, 8, c('madera')); for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j < 40) R.pset(x + i, y + j, (i + j) % 2 ? c('hierro') : c('a3'));
    for (let k = 0; k < 7; k++) a_piedra(R, x - 4 + Math.round(h(k, 1, 774) * 8), y - 3 + Math.round(h(k, 2, 774) * 6), 1, 1); R.rect(x - 8, y - 1, x - 8, y + 1, c('maderaL')); }
  a_cesta(R, 290, 172, 16, luz, true); for (let k = 0; k < 9; k++) a_piedra(R, 272 - k * 3, 171 + (k % 3), 1, 1);
  { const x = 62, b = 166; R.rect(x - 3, b - 14, x + 3, b, c('verde')); R.rect(x - 3, b - 14, x - 2, b, a_c('#7aaa6a', luz)); R.rect(x - 3, b - 17, x + 3, b - 15, c('hierroL')); R.rect(x - 2, b - 18, x + 2, b - 18, c('hierro')); R.rect(x - 3, b - 9, x + 3, b - 8, c('maderaS')); R.rect(x - 4, b + 1, x + 4, b + 1, c('a4')); }
  if (o.sombrero !== false) { const x = 160, b = 170; R.rect(x - 9, b - 1, x + 9, b, c('lonaS')); R.rect(x - 8, b - 2, x + 8, b - 2, c('lona')); R.rect(x - 5, b - 6, x + 5, b - 3, c('lona')); R.rect(x - 5, b - 4, x + 5, b - 4, c('negro')); R.rect(x - 4, b - 6, x + 4, b - 6, c('pie')); R.rect(x + 3, b - 6, x + 5, b - 5, c('lonaS')); }
  viento(R, t, { y0: 140, y1: 178, fuerza: 0.8, color: c('a0'), grano: c('a3') });
  return { suelo: 156, libre: [40, 200], pala: [230, 124] };
}

// lo de delante en el valle: dos piedras y una cesta en la esquina de abajo a la izquierda
function a_valleGenDelante(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz);
  a_piedra(R, 6, 176, 9, 6, 'guija', luz); a_piedra(R, 18, 178, 6, 4, 'guija', luz); a_piedra(R, 312, 177, 10, 6, 'guija', luz);
  if ((o.epoca ?? 1922) < 2000) { R.linea(284, 179, 300, 160, c('maderaS')); R.rect(298, 157, 304, 159, c('hierro')); R.pset(304, 160, c('hierroL')); }   // el pico apoyado
  return { piedras: [[0, 168, 26, 180], [300, 170, 320, 180]] };
}

// muro de adobe enlucido entre x0–x1 y y0–y1: el enlucido claro con desconchones que dejan ver los ladrillos de barro
// (hiladas y juntas), manchas de agua abajo, grietas finas y la arista de luz arriba
function a_adobe(R, x0, y0, x1, y1, k = 0, luz = 'dia') {
  const c = (n) => a_c(n, luz), enl = a_c('#ecd6ae', luz), enlS = a_c('#d4b88a', luz), lad = a_c('#b88a5c', luz), ladS = a_c('#8a6240', luz), jun = a_c('#cfae80', luz);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const des = a_vn(x, y, 9, 6, 780 + k) > 0.7, q = h(x, y, 781 + k);
    let v;
    if (des) { const fila = Math.floor((y - y0) / 4), jj = (y - y0) % 4 === 3 || (x + (fila % 2) * 5) % 10 === 0; v = jj ? jun : q < 0.15 ? ladS : lad; if (a_vn(x, y, 9, 6, 780 + k) < 0.72) v = ladS; }
    else v = q < 0.04 ? enlS : (y > y1 - 10 && a_umb(x, y) < (y - y1 + 10) / 14) ? enlS : a_vn(x, y, 20, 14, 782 + k) > 0.62 && a_umb(x, y) < 0.4 ? enlS : enl;
    R.pset(x, y, v);
  }
  for (let g = 0; g < 4; g++) { let x = x0 + 8 + Math.round(h(g, 1, 783 + k) * (x1 - x0 - 16)), y = y0 + 4 + Math.round(h(g, 2, 783 + k) * 10); for (let i = 0; i < 9; i++) { R.pset(x, y, c('r4')); y++; x += h(g, i, 784) < 0.5 ? 1 : -1; } }
  R.rect(x0, y0, x1, y0, c('r0'));
}

function a_tienda(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz);
  const capa = a_capa(R, 'tienda|' + luz, luz, () => {
    // detrás: el acantilado de la entrada del valle a la izquierda y cerros lejanos
    a_cerro(R, 0, 319, (x) => 70 + Math.sin(x * 0.04) * 6 + Math.max(0, x - 200) * 0.05, 104, 785, 0.45);
    a_cerro(R, 0, 90, (x) => 40 + x * 0.35 + Math.sin(x * 0.2) * 2, 110, 786, 0.05);
    a_arena(R, 104, 179, 5);
    // la casa: muro de adobe con su cornisa, la cúpula de barro a la derecha, la puerta en arco y una ventana con
    // contraventanas de madera
    a_adobe(R, 70, 58, 262, 150, 0);
    R.rect(68, 54, 264, 57, a_c('#d4b88a')); R.rect(68, 54, 264, 54, c('r0')); for (let x = 70; x < 262; x += 9) R.rect(x, 52, x + 4, 53, a_c('#d4b88a'));   // el pretil
    for (let j = 0; j <= 22; j++) { const w = Math.round(Math.sqrt(1 - (j / 23) ** 2) * 26); for (let x = 214 - w; x <= 214 + w; x++) { const s = (x - 214) / (w + 1), q = h(x, j, 787); R.pset(x, 52 - j, a_c(j === 22 ? '#f4e4c0' : s > 0.35 ? '#f4e2bc' : s < -0.45 ? '#c8a478' : q < 0.06 ? '#c8a478' : '#e6cc9c')); } }
    for (let x = 188; x <= 240; x++) R.pset(x, 52, a_c('#b8946a'));
    // la puerta en arco (oscura, con su marco de madera) y la ventana
    { const px = 228, py = 96; for (let y = py - 6; y <= 150; y++) for (let x = px - 11; x <= px + 11; x++) { const d = y < py ? Math.hypot(x - px, (y - py) * 1.8) : Math.abs(x - px); if (d > 11) continue; R.pset(x, y, d > 9.5 ? c('maderaS') : c(y > 140 ? 'huecoS' : 'hueco')); }
      R.rect(px - 9, 146, px + 9, 150, c('huecoS')); R.rect(px - 12, 150, px + 12, 151, c('r3')); }
    { const wx = 104, wy = 74; R.rect(wx - 1, wy - 1, wx + 21, wy + 19, c('maderaS')); R.rect(wx, wy, wx + 20, wy + 18, c('hueco')); R.rect(wx + 9, wy, wx + 11, wy + 18, c('maderaS'));
      for (const sx of [wx - 12, wx + 22]) { R.rect(sx, wy - 1, sx + 10, wy + 19, a_c('#5a7a8a')); for (let y = wy + 1; y < wy + 19; y += 3) R.rect(sx + 1, y, sx + 9, y, a_c('#3e5a6a')); R.rect(sx, wy - 1, sx + 10, wy - 1, a_c('#8aaab8')); }
      R.rect(wx - 2, wy + 20, wx + 22, wy + 21, c('r3')); R.rect(wx + 2, wy + 15, wx + 7, wy + 19, a_c('#c86a3a')); R.disco(wx + 4, wy + 13, 3, c('verde')); }
    // palas y un pico apoyados en el muro, un rollo de cuerda colgado y tres tinajas
    for (const [x, k] of [[176, 0], [182, 1], [190, 2]]) { R.linea(x, 150, x + 5, 112, c('madera')); R.linea(x + 1, 150, x + 6, 112, c('maderaS')); if (k < 2) { R.rect(x - 2, 144, x + 3, 150, c('hierro')); R.rect(x - 2, 144, x + 3, 144, c('hierroL')); } else { R.rect(x + 1, 111, x + 10, 112, c('hierro')); R.pset(x + 10, 113, c('hierroL')); } }
    for (let a = 0; a < 6.28; a += 0.08) for (const r of [6, 5, 4]) R.pset(Math.round(150 + Math.cos(a) * r), Math.round(118 + Math.sin(a) * r * 1.2), c(r === 5 ? 'cestaS' : 'cestaL'));
    for (const [x, r] of [[74, 7], [88, 6], [160, 5]]) { R.disco(x, 150 - r, r, a_c('#b87a4a')); R.disco(x - 2, 148 - r, r - 3, a_c('#d0946a')); R.rect(x - 2, 150 - 2 * r - 1, x + 2, 150 - 2 * r, a_c('#8a5a34')); }
    // vigas que asoman bajo el pretil
    for (let x = 80; x < 260; x += 22) { R.rect(x, 60, x + 3, 62, c('maderaS')); R.pset(x, 60, c('madera')); }
    // a la izquierda: cajas de embalaje apiladas, con flejes y números de lote
    for (const [x, y, w, al, n] of [[6, 152, 26, 20, 7], [34, 152, 24, 17, 3], [12, 131, 22, 17, 0], [38, 134, 14, 11, 0]]) {
      R.rect(x - 1, y - al - 1, x + w + 1, y, c('maderaS')); R.rect(x, y - al, x + w, y - 1, c('maderaL'));
      for (let yy = y - al + 4; yy < y - 1; yy += 5) R.rect(x, yy, x + w, yy, c('madera'));
      R.linea(x + 1, y - 2, x + w - 1, y - al + 1, c('madera')); R.rect(x, y - al, x + w, y - al, a_c('#e0bc84')); R.rect(x + w - 2, y - al, x + w, y - 1, c('madera'));
      if (n) R.numero(String(n), x + w / 2 - 2, y - 5, { sombra: false, color: c('maderaS') });
      R.rect(x + 1, y + 1, x + w + 3, y + 1, c('a3')); }
    // la sombra del toldo en el suelo (con las rayas de la lona)
    for (let y = 152; y <= 162; y++) for (let x = 86; x <= 240; x++) { const sx = x - (y - 152) * 0.6; if (sx < 84 || sx > 234) continue; R.pset(x, y, a_mez(R.pget(x, y), a_c('#7a6070'), 0.22 + 0.12 * a_umb(x, y))); }
    for (let x = 0; x < 320; x++) R.pset(x, 151, c('a3'));
  }, { hor: 100, sol: [250, 30, 6] });
  R.copiar(capa.buf);
  a_cieloVivo(R, t, capa, luz, { y0: 24, y1: 50, nubes: [[30, 34, 16, 1.2], [170, 44, 22, 2.2], [100, 28, 12, 0.6]] });
  if (luz !== 'noche') halcon(R, t, 120, 36, 22);
  // el toldo de lona a rayas (crudo y teja) que sale del muro: el faldón ondea con el aire; los palos y los vientos
  { const y0 = 72, y1 = 92, ond = (x) => Math.round(Math.sin(t * 3 + x * 0.15) * 1);
    for (let x = 84; x <= 240; x++) { const ya = y0, yb = y1 + ond(x), raya = Math.floor((x - 84) / 10) % 2; for (let y = ya; y <= yb; y++) R.pset(x, y, c(raya ? (y > yb - 2 ? 'lonaS' : 'lona') : (y > yb - 2 ? 'rosaS' : 'rojo'))); R.pset(x, yb + 1, c(raya ? 'lonaS' : 'r4')); if (x % 10 === 5) R.pset(x, yb + 2, c(raya ? 'lona' : 'rojo')); }
    for (let x = 84; x <= 240; x++) R.pset(x, y0, c('maderaS'));
    for (const px of [92, 232]) { R.rect(px, y1 + 1, px + 1, 152, c('maderaS')); R.pset(px, y1 + 1, c('madera')); R.linea(px, y1, px - 8, 152, c('lonaS')); } }
  // el botijo que cuelga de su trípode junto a la puerta y gotea en un charquito
  { const bx = 256, by = 118; R.linea(bx - 6, 150, bx, by - 10, c('maderaS')); R.linea(bx + 6, 150, bx, by - 10, c('maderaS')); R.linea(bx, by - 10, bx, by - 6, c('lonaS'));
    R.disco(bx, by, 5, a_c('#c8905c', luz)); R.disco(bx - 1, by - 1, 3, a_c('#dcaa74', luz)); R.rect(bx - 1, by - 8, bx + 1, by - 5, a_c('#b07a4a', luz)); R.pset(bx + 4, by + 2, a_c('#9a6a40', luz));
    const g = (t * 1.6) % 1; R.pset(bx, by + 6 + Math.round(g * 26), a_c('#9ad0e8', luz)); R.rect(bx - 4, 150, bx + 4, 150, a_c('#a88a6a', luz)); if (g > 0.92) { R.pset(bx - 2, 149, a_c('#c8e8f4', luz)); R.pset(bx + 2, 149, a_c('#c8e8f4', luz)); } }
  // el burro atado a la sombra, a la derecha, que mueve la cola y las orejas y mordisquea un poco de paja
  a_burro(R, 290, 156, t, { dir: -1, luz, masca: Math.sin(t * 0.8) > 0, ata: [264, 132] });
  for (let i = 0; i < 9; i++) R.pset(268 + i, 155 + (i % 2), c(i % 3 ? 'cestaL' : 'cesta'));
  // sillas de lona plegables y el quinqué colgado de la viga
  for (const [x, d] of [[60, 1], [250, -1]]) { R.linea(x - 5, 154, x + 5, 140, c('maderaS')); R.linea(x + 5, 154, x - 5, 140, c('madera')); R.rect(x - 6, 140, x + 6, 141, c('lonaS')); for (let j = 128; j < 140; j++) R.pset(x - 5 * d, j, c('maderaS')); R.rect(Math.min(x - 5 * d, x - 4 * d), 128, Math.max(x - 5 * d, x - 4 * d), 136, c('lona')); }
  { const qx = 150, sw = Math.round(Math.sin(t * 1.2) * 1); R.linea(qx, 92, qx + sw, 98, c('hierro')); R.rect(qx - 2 + sw, 99, qx + 2 + sw, 104, c('hierro')); R.rect(qx - 1 + sw, 100, qx + 1 + sw, 103, hex(luz === 'noche' ? '#ffe090' : '#f4e8c8')); if (luz === 'noche') a_halo(R, qx + sw, 101, 22, '#ffc860', 0.3); }
  // moscas (vida), y una gallina que picotea
  for (let k = 0; k < 2; k++) R.pset(Math.round(170 + Math.sin(t * 3.1 + k) * 14), Math.round(116 + Math.cos(t * 4.3 + k * 2) * 6), c('negro'));
  { const u = (t * 0.06) % 1, gx = Math.round(30 + Math.sin(u * 6.28) * 22 + 40), pic = Math.sin(t * 5) > 0.5 ? 1 : 0; R.rect(gx, 162, gx + 4, 165, c('lona')); R.pset(gx + 5, 161 + pic, c('lona')); R.pset(gx + 6, 162 + pic, c('rojo')); R.pset(gx + 5, 160 + pic, c('rojo')); R.pset(gx + 1, 166, c('rojo')); R.pset(gx + 3, 166, c('rojo')); R.pset(gx - 1, 161, c('lonaS')); }
  viento(R, t, { y0: 160, y1: 178, fuerza: 0.4, color: c('a0'), grano: c('a3') });
  return { suelo: 154, detras: 145, libre: [212, 272], libreIzq: [40, 92], mesa: [96, 140, 210, 144], puerta: [217, 86, 239, 150], burro: [290, 156] };
}

// un halo de luz tramado alrededor de (x, y)
function a_halo(R, x, y, r, col, a = 0.35) { const cc = hex(col); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; const k = a * (1 - d / r) ** 1.5 * 1.6; R.pset(x + i, y + j, a_mez(R.pget(x + i, y + j), cc, Math.min(0.7, k))); } }

// la mesa plegable con su mantel, el mapa enrollado, la libreta, el fajo de billetes que mengua (o.billetes), la taza y
// el quinqué (va DELANTE de Carnarvon, sentado detrás con los pies en detras = 146)
function a_tiendaDelante(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz), x0 = 96, x1 = 210, y = 140;
  R.linea(x0 + 6, y + 6, x0 + 20, 158, c('maderaS')); R.linea(x0 + 20, y + 6, x0 + 6, 158, c('madera')); R.linea(x1 - 6, y + 6, x1 - 20, 158, c('maderaS')); R.linea(x1 - 20, y + 6, x1 - 6, 158, c('madera'));
  R.rect(x0, y, x1, y + 2, c('maderaL')); R.rect(x0, y + 3, x1, y + 4, c('maderaS'));
  for (let x = x0 + 2; x <= x1 - 2; x++) { const l = 6 + Math.round(Math.sin(x * 0.4 + t * 2) * 0.6); for (let j = 0; j < l; j++) R.pset(x, y + 3 + j, c(j === l - 1 ? 'lonaS' : (x >> 2) % 2 ? 'lona' : 'galab')); }
  // sobre la mesa: el mapa enrollado, la libreta abierta, el fajo, la taza que humea
  R.rect(x0 + 8, y - 3, x0 + 34, y - 1, a_c('#e8dcc0', luz)); R.rect(x0 + 8, y - 1, x0 + 34, y - 1, a_c('#b8a888', luz)); R.disco(x0 + 34, y - 2, 1, a_c('#c8b898', luz));
  R.rect(x0 + 44, y - 2, x0 + 62, y - 1, c('galab')); R.rect(x0 + 53, y - 2, x0 + 53, y - 1, c('galabS')); for (let i = 0; i < 3; i++) R.rect(x0 + 46, y - 2 + i % 2, x0 + 51, y - 2 + i % 2, c('azulGS'));
  const n = Math.max(0, Math.round((1 - (o.billetes ?? 0)) * 5) + 1); for (let k = 0; k < n; k++) R.rect(x0 + 70, y - 1 - k, x0 + 82, y - 1 - k, a_c(k % 2 ? '#a8c898' : '#c8dcb4', luz));
  R.rect(x1 - 20, y - 4, x1 - 15, y - 1, c('galab')); R.pset(x1 - 14, y - 3, c('galab')); for (let k = 0; k < 3; k++) { const f = (t * 0.7 + k / 3) % 1; R.pset(x1 - 18 + Math.round(Math.sin(t * 2 + k * 2) * 1.5), y - 6 - Math.round(f * 9), a_mez(c('galab'), R.pget(x1 - 18, y - 6 - Math.round(f * 9)), f)); }
  return { mesa: [x0, y, x1, y + 4], billetes: [x0 + 76, y - 3] };
}

function a_mesaArriba(R, t, o) {
  const luz = 'dia', c = (n) => a_c(n, luz);
  const capa = a_capa(R, 'mesaArriba', luz, () => {
    // el tablero de madera plegable (tablas verticales vistas desde arriba) con un mantel de cuadros a la izquierda
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(x / 40), xx = x % 40, veta = Math.sin(xx * 0.9 + Math.sin(y * 0.05 + tabla * 2) * 3 + h(tabla, 1, 790) * 9) * 0.6 + a_vn(x, y, 2, 30, 791 + tabla) * 0.8 - 0.4;
      R.pset(x, y, xx === 0 ? c('maderaS') : xx === 1 ? a_c('#6e4a2c') : veta > 0.72 ? c('maderaL') : veta < -0.62 ? a_c('#7a5030') : a_c(tabla % 2 ? '#9a6c40' : '#946638')); }
    for (let y = 0; y < 180; y++) for (let x = 0; x < 60 - Math.round(y * 0.1); x++) { const a = ((x >> 3) + (y >> 3)) % 2, b = (x >> 3) % 2, d = (y >> 3) % 2; R.pset(x, y, a_c(a ? (b && d ? '#c86a5a' : '#e8d8c4') : b || d ? '#d89a8a' : '#f4ece0')); }
    for (let y = 0; y < 180; y++) R.pset(60 - Math.round(y * 0.1), y, a_c('#a85a4a'));
    // la sombra del toldo a rayas que cae sobre la mesa
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (Math.floor((x + y * 0.3) / 24) % 2 === 0 && a_umb(x, y) < 0.35) R.pset(x, y, a_mez(R.pget(x, y), hex('#3a2a40'), 0.25));
    // el monedero de cuero abierto y VACÍO
    { const mx = 224, my = 150; R.disco(mx, my, 13, a_c('#5a3420')); R.disco(mx, my, 12, a_c('#7a4a2a')); R.disco(mx, my + 1, 8, a_c('#2a1810')); R.rect(mx - 13, my - 2, mx + 13, my - 1, c('oro')); R.pset(mx - 12, my - 2, c('oroL')); R.disco(mx - 13, my - 3, 2, c('oroS')); R.disco(mx + 13, my - 3, 2, c('oroS')); R.pset(mx + 2, my + 4, a_c('#4a2a18')); }
    // la pluma estilográfica y el tintero
    R.linea(120, 160, 170, 146, a_c('#1a1a22')); R.linea(120, 161, 170, 147, a_c('#3a3a48')); R.rect(166, 145, 172, 147, c('oro')); R.pset(119, 161, c('oroL'));
    { const px = 70, py = 160; R.disco(px, py, 5, a_c('#5a3020')); R.disco(px, py, 3, a_c('#2a1810')); R.linea(px + 4, py - 2, px + 26, py - 10, a_c('#3a2418')); R.linea(px + 4, py - 1, px + 26, py - 9, a_c('#6a4028')); }   // la pipa
    R.rect(100, 164, 112, 171, a_c('#c84a3a')); R.rect(101, 165, 111, 166, a_c('#f0c040')); R.linea(114, 170, 122, 166, a_c('#e8dcc0')); R.pset(122, 166, a_c('#3a2a2a'));   // la caja de cerillas
    R.disco(284, 150, 9, a_c('#2a2a34'));
    a_calma(R, 270, 0, 319, 50); a_calma(R, 14, 0, 178, 22); R.disco(284, 150, 6, a_c('#14141c')); R.pset(281, 146, a_c('#8a8aa0'));
  });
  R.copiar(capa.buf);
  // la libreta de cuentas abierta: dos páginas con columnas de rayas que se van sumando (o.suma 0–1) y el total abajo
  { const lx = 94, ly = 24, s = o.suma ?? 0.4; R.rect(lx - 2, ly + 2, lx + 102, ly + 90, a_c('#4a3020')); R.rect(lx, ly, lx + 100, ly + 86, a_c('#f4ecd8')); R.rect(lx + 49, ly, lx + 51, ly + 86, a_c('#d8ccb0')); R.rect(lx, ly + 86, lx + 100, ly + 86, a_c('#c8b898'));
    for (let p = 0; p < 2; p++) { const px = lx + 5 + p * 52; R.rect(px + 30, ly + 4, px + 30, ly + 80, a_c('#e8a0a0'));
      for (let k = 0; k < 12; k++) { const yy = ly + 6 + k * 6; R.rect(px, yy + 4, px + 42, yy + 4, a_c('#c8d4e4')); if ((p * 12 + k) / 24 > s) continue; const w = 8 + Math.round(h(k, p, 792) * 16); R.rect(px + 1, yy + 2, px + w, yy + 2, a_c('#3a3a5a')); R.rect(px + 33, yy + 2, px + 33 + 3 + (k % 3) * 2, yy + 2, a_c('#3a3a5a')); } }
    if (s > 0.95) { R.rect(lx + 85, ly + 78, lx + 98, ly + 78, a_c('#3a3a5a')); R.rect(lx + 85, ly + 80, lx + 98, ly + 80, a_c('#3a3a5a')); R.numero('0', lx + 89, ly + 76, { sombra: false, color: hex('#c83a3a') }); }
    // la mano que escribe la siguiente línea: la punta de la pluma va y viene
    if (s < 0.95 && o.mano !== false) { const k = Math.floor(s * 24), p = k >= 12 ? 1 : 0, yy = ly + 6 + (k % 12) * 6 + 2, xx = lx + 6 + p * 52 + Math.round((Math.sin(t * 6) * 0.5 + 0.5) * 18); R.pset(xx, yy, a_c('#1a1a22')); R.linea(xx, yy, xx + 7, yy - 8, a_c('#1a1a22')); R.pset(xx + 7, yy - 8, c('oro'));
      brazo(R, xx + 34, yy + 34, xx + 8, yy - 2, o.manga ?? '#e8e0d0', -1, { codo: [xx + 26, yy + 16] }); } }
  // los billetes de una libra (rayas, un número, sin letras) que menguan (o.billetes 0–1: lo que se ha gastado)
  { const n = Math.max(1, Math.round((1 - (o.billetes ?? 0)) * 7)); for (let k = 0; k < n; k++) { const bx = 120 + Math.round(h(k, 1, 793) * 30) - 4, by = 114 + k * 3 + Math.round(h(k, 2, 793) * 6), sl = h(k, 3, 793) < 0.5 ? 0 : 1;
      R.rect(bx - 15, by - 8 + sl, bx + 15, by + 8 + sl, a_c('#5a7a4a')); R.rect(bx - 14, by - 7 + sl, bx + 14, by + 7 + sl, a_c('#c8dcb0')); R.rect(bx - 12, by - 5 + sl, bx + 12, by + 5 + sl, a_c('#a8c494'));
      for (let i = -10; i <= 2; i += 3) R.rect(bx + i, by - 2 + sl, bx + i + 1, by + 3 + sl, a_c('#7a9a68')); R.disco(bx + 8, by + sl, 4, a_c('#e0ecd0')); R.numero('1', bx + 6, by + 3 + sl, { sombra: false, color: a_c('#3a5a2a') }); } }
  // la taza de té con su plato y el vapor que sube y se tuerce
  { const tx = 34, ty = 46; R.disco(tx, ty, 16, a_c('#d8d4cc')); R.disco(tx, ty, 15, a_c('#f4f2ec')); R.disco(tx, ty, 10, a_c('#5a7aa8')); R.disco(tx, ty, 9, a_c('#f8f6f0')); R.disco(tx, ty, 7, a_c('#a8643a')); R.disco(tx - 2, ty - 2, 2, a_c('#c88a5a'));
    R.rect(tx + 10, ty - 2, tx + 14, ty + 2, a_c('#f4f2ec')); R.rect(tx + 11, ty - 1, tx + 13, ty + 1, a_c('#d8d4cc')); R.rect(tx - 2, ty + 18, tx + 18, ty + 19, a_c('#c8c4bc'));
    for (let k = 0; k < 14; k++) { const f = (t * 0.5 + k / 14) % 1, x = tx + Math.round(Math.sin(f * 7 + t) * 4 + f * 12), y = ty - Math.round(f * 30); if (a_umb(x, y) < 1 - f) R.pset(x, y, a_mez(R.pget(x, y), hex('#ffffff'), 0.6 * (1 - f))); } }
  // el CALENDARIO de mesa (hojas que se doblan sobre una base de latón): la hoja de 1922 y el círculo rojo que la rodea
  const [cx, cy] = [238, 76];
  { R.rect(cx - 30, cy + 26, cx + 30, cy + 32, c('oroS')); R.rect(cx - 30, cy + 26, cx + 30, cy + 26, c('oro'));
    for (let k = 3; k >= 1; k--) R.rect(cx - 26 + k * 2, cy - 30 - k * 2, cx + 26 + k * 2, cy + 24 - k * 2, a_c(k % 2 ? '#d8d0c0' : '#e8e0d0'));
    R.rect(cx - 26, cy - 30, cx + 26, cy + 24, a_c('#f8f4ea')); R.rect(cx - 26, cy - 30, cx + 26, cy - 22, a_c('#c84a3a')); for (let i = -22; i <= 22; i += 8) R.disco(cx + i, cy - 30, 1, c('hierro'));
    R.numero('1922', cx, cy + 4, { centro: true, c: a_c('#2a2a3a'), tam: 8 });
    for (let k = 0; k < 6; k++) R.rect(cx - 22 + k * 8, cy + 12, cx - 18 + k * 8, cy + 14, a_c('#c8c0b0'));
    const r = o.rodea ?? 0; if (r > 0) { const n = Math.round(r * 120); for (let i = 0; i < n; i++) { const a = -Math.PI * 0.6 + i / 120 * Math.PI * 2.15, rx = 24 + Math.sin(i * 0.3) * 0.6, ry = 11; const x = Math.round(cx + Math.cos(a) * rx), y = Math.round(cy + Math.sin(a) * ry); R.pset(x, y, c('rojo')); R.pset(x, y + 1, a_c('#e86a5a')); } } }
  // una mosca que se pasea por la mesa
  { const a = t * 0.9, fx = Math.round(130 + Math.cos(a) * 40), fy = Math.round(150 + Math.sin(a * 1.3) * 12); R.pset(fx, fy, a_c('#1a1a22')); R.pset(fx + 1, fy, a_c('#1a1a22')); if (Math.floor(t * 12) % 2) { R.pset(fx, fy - 1, a_c('#c8d0e0')); R.pset(fx + 1, fy - 1, a_c('#c8d0e0')); } }
  return { suelo: 180, libre: [0, 0], calendario: [cx, cy], billetes: [134, 124], libreta: [94, 24, 194, 110], taza: [34, 46], monedero: [224, 150] };
}

// un murete de piedra seca en tres cuartos entre (x0, y) y (x1, y) de alto al: la cara de delante con piedras de
// tamaños distintos (luz arriba, junta oscura), la cara de arriba clara; k: semilla; limpio 0–1: las piedras se van
function a_murete(R, x0, x1, y, al, k, limpio = 0, luz = 'dia') {
  const c = (n) => a_c(n, luz), T = ['#c8b498', '#b09878', '#9a8266', '#d8c8aa'];
  let x = x0, i = 0;
  while (x <= x1) { const w = 4 + Math.round(h(i, 1, 800 + k) * 4);
    for (let fila = 0; fila < Math.ceil(al / 4); fila++) { const id = i * 7 + fila; if (h(id, 2, 801 + k) < limpio) continue;
      const xa = x + (fila % 2) * 2, xb = Math.min(x1, xa + w - 1), yb = y - fila * 4, ya = yb - 3; if (xa > x1) continue;
      R.rect(xa, ya, xb, yb, a_c(T[Math.floor(h(id, 3, 802 + k) * 4)], luz)); R.rect(xa, ya, xb, ya, c('pie')); R.rect(xb, ya, xb, yb, a_c('#7a6450', luz)); R.rect(xa, yb, xb, yb, a_c('#5a4636', luz)); }
    x += w; i++; }
}

// un cuarto de choza en tres cuartos: el suelo de tierra apisonada y los cuatro muretes (el de detrás, los dos de los
// lados en escorzo y el de delante con su hueco de puerta)
function a_cuarto(R, x0, x1, y0, y1, al, k, limpio, luz) {
  const sl = (y1 - y0) * 0.35;
  for (let y = y0; y <= y1; y++) { const d = (y - y0) / (y1 - y0) * sl; for (let x = Math.round(x0 - d); x <= x1 - d; x++) if (h(x >> 1, y >> 1, 806 + k) >= limpio) R.pset(x, y, a_c(h(x, y, 805 + k) < 0.05 ? '#a08060' : (x + y) % 3 ? '#c8aa80' : '#bc9c74', luz)); }
  a_murete(R, x0, x1, y0, al, k * 5, limpio, luz);
  for (let y = y0 + 3; y <= y1; y += 3) { const d = Math.round((y - y0) / (y1 - y0) * sl); a_murete(R, x0 - d - 2, x0 - d + 2, y, al, k * 5 + y, limpio, luz); a_murete(R, x1 - d - 2, x1 - d + 2, y, al, k * 5 + y + 50, limpio, luz); }
  const m = Math.round((x0 + x1) / 2 - sl); a_murete(R, Math.round(x0 - sl), m - 7, y1, al, k * 5 + 3, limpio, luz); a_murete(R, m + 7, Math.round(x1 - sl), y1, al, k * 5 + 4, limpio, luz);
}

// los escalones tallados que van apareciendo en x 150–200 desde y 150 (n 0–3, con decimales: el que está saliendo,
// medio tapado de arena)
function a_escalones(R, t, n, luz = 'dia') {
  const c = (q) => a_c(q, luz); if (n <= 0) return;
  const xa = 150, xb = 200, paso = 10;
  for (let k = 0; k < 3; k++) { const v = Math.max(0, Math.min(1, n - k)); if (v <= 0) break; const y = 150 + k * paso;
    // las paredes de la zanja a los lados (en sombra azulada) y el fondo oscuro aún por limpiar
    R.rect(xa - 3, y, xa - 1, y + paso, c('azS')); R.rect(xb + 1, y, xb + 3, y + paso, c('r3'));
    R.rect(xa, y, xb, y + 3, c('r1')); R.rect(xa, y, xb, y, c('r0')); for (let x = xa; x <= xb; x += 5) R.pset(x + (k % 2) * 2, y + 2, c('r2'));   // la huella, con marcas de cincel
    R.rect(xa, y + 4, xb, y + paso - 1, c('az')); R.rect(xa, y + 4, xb, y + 4, c('r4')); for (let x = xa + 2; x < xb; x += 7) R.rect(x, y + 6, x + 2, y + 6, c('azS'));   // la tabica, en sombra
    if (v < 1) { const yy = y + Math.round(v * paso); for (let x = xa; x <= xb; x++) for (let j = y; j <= y + paso; j++) if (j > yy - Math.round(Math.sin(x * 0.3) * 1.5)) R.pset(x, j, c(h(x, j, 803) < 0.1 ? 'a3' : 'a1')); }
  }
  // el polvo que levantan al barrer el escalón que sale
  const f = n % 1; if (f > 0.02 && n < 3) for (let i = 0; i < 12; i++) { const a = h(i, 1, 804) * 6.28, r = ((t * 6 + i * 3) % 14), x = 175 + Math.cos(a) * r * 1.6, y = 150 + Math.floor(n) * 10 - Math.abs(Math.sin(a)) * r * 0.8; if (a_umb(Math.round(x), Math.round(y)) < 1 - r / 14) R.pset(Math.round(x), Math.round(y), c('pie')); }
}

function a_chozas(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz), limpio = o.limpio ?? 0, nEsc = o.escalones ?? 0;
  const capa = a_capa(R, 'chozas|' + luz, luz, () => {
    // el acantilado cerca, que llena media pantalla (la cumbre baja junto a Atom y deja cielo en la barra del año)
    const top = (x) => x < 268 ? 30 + Math.abs(x - 120) * 0.06 + Math.sin(x * 0.13) * 2 + (x > 230 ? (x - 230) * 0.6 : 0) : 54 + Math.sin(x * 0.2);
    a_cerro(R, 0, 319, top, 112, 805, 0, 0.01);
    // la boca de la tumba de OTRO rey: el gran hueco negro con su marco tallado, la rampa de escombro y un dintel
    { const x0 = 18, x1 = 74, y0 = 58, y1 = 108; R.rect(x0 - 6, y0 - 7, x1 + 6, y1, c('r3')); R.rect(x0 - 6, y0 - 7, x1 + 6, y0 - 6, c('r0')); R.rect(x0 - 4, y0 - 4, x1 + 4, y1, c('r1')); R.rect(x1 + 2, y0 - 4, x1 + 4, y1, c('r2'));
      R.rect(x0, y0, x1, y1, c('hueco')); R.rect(x0, y0, x0 + 3, y1, c('huecoS')); R.rect(x0, y0, x1, y0 + 2, c('huecoS'));
      for (let y = y0 + 4; y < y1; y += 4) R.pset(x1 - 2, y, c('huecoS')); }
    a_cono(R, 46, 116, 70, 10, 806); a_cono(R, 250, 114, 90, 16, 807);
    a_arena(R, 108, 179, 8);
    for (let x = 0; x < 320; x++) R.pset(x, 108 + Math.round(Math.sin(x * 0.07) * 1.2), c('a3'));
    // cascotes de cerámica (rojizos), una piedra de moler con su mano, y piedras sueltas
    for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 808) * 310 + 5), y = Math.round(118 + h(k, 2, 808) * 58); if (x > 140 && x < 210 && y > 140) continue; R.rect(x, y, x + 2, y + 1, a_c(k % 3 ? '#b8603a' : '#d88a5a')); R.pset(x, y + 1, a_c('#7a3a24')); }
    { const qx = 244, qy = 160; R.poligono([[qx - 14, qy], [qx - 10, qy - 6], [qx + 12, qy - 6], [qx + 14, qy]], c('r4')); R.poligono([[qx - 12, qy - 1], [qx - 9, qy - 5], [qx + 11, qy - 5], [qx + 12, qy - 1]], c('guija')); R.rect(qx - 8, qy - 5, qx + 8, qy - 5, c('guijaL')); R.disco(qx + 2, qy - 7, 3, c('guijaS')); R.disco(qx + 1, qy - 8, 2, c('guija')); }
    for (let k = 0; k < 12; k++) a_piedra(R, Math.round(h(k, 3, 809) * 300 + 10), Math.round(116 + h(k, 4, 809) * 60), 1 + (k % 3), 1 + (k % 2));
  }, { hor: 50, sol: [210, 14, 5] });
  R.copiar(capa.buf);
  a_cieloVivo(R, t, capa, luz, { y0: 6, y1: 26, nubes: [[0, 20, 12, 0.8], [150, 24, 10, 1.4]] });
  // LAS CHOZAS: muretes bajos que forman cuartos de un palmo (se van con o.limpio)
  const rooms = [[72, 136, 114, 132, 9, 0], [196, 262, 112, 130, 8, 1]];
  for (const [x0, x1, y0, y1, al, k] of rooms) a_cuarto(R, x0, x1, y0, y1, al, k, k === 2 ? Math.max(limpio, Math.min(1, nEsc * 1.5)) : limpio * 0.85, luz);
  // los escalones (debajo de la choza del medio: salen cuando se limpia)
  a_escalones(R, t, nEsc, luz);
  // la cadena de obreros diminutos que suben cestas al cono del fondo, y el polvo que levantan
  for (let k = 0; k < 4; k++) { const u = ((t * 0.06 + k / 4) % 1), sube = u < 0.5, v = sube ? u * 2 : (1 - u) * 2; a_obrero(R, 214 + v * 34, Math.round(116 - v * 14), t, k, { anda: true, cesta: sube, dir: sube ? 1 : -1, luz }); }
  for (let k = 0; k < 8; k++) { const f = (t * 0.6 + k / 8) % 1; R.pset(Math.round(250 + f * 30 + Math.sin(k + t) * 3), Math.round(100 - f * 10 + k), c('pie')); }
  // un lagarto que corre por la roca y se para
  { const u = (t % 9) / 9, lx = Math.round(100 + Math.min(1, u * 3) * 60 - Math.max(0, u - 0.66) * 3 * 60), ly = 92 + Math.round(Math.sin(u * 6.28) * 4); R.rect(lx, ly, lx + 4, ly, c('r5')); R.pset(lx + 5, ly - 1, c('r5')); R.pset(lx - 1, ly + 1, c('r5')); R.pset(lx + 1, ly + 1, c('r4')); R.pset(lx + 3, ly - 1, c('r4')); }
  viento(R, t, { y0: 112, y1: 176, fuerza: 0.5, color: c('a0'), grano: c('a3') });
  return { suelo: 150, libre: [30, 280], escalon: [174, 150], boca: [18, 58, 74, 108], molino: [244, 160] };
}

// lo de delante en las chozas: la cesta grande de esparto con piedras, abajo a la izquierda
function a_chozasDelante(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz), limpio = o.limpio ?? 0, nEsc = o.escalones ?? 0;
  // los dos cuartos de delante (por debajo de la línea de los pies): el de la derecha tapa los escalones hasta que se limpia
  a_cuarto(R, 160, 212, 160, 178, 8, 2, Math.max(limpio, Math.min(1, nEsc * 1.5)), luz); a_cuarto(R, 34, 80, 160, 176, 8, 3, limpio * 0.85, luz);
  const x = 296, b = 178;
  for (let j = 0; j < 16; j++) { const w = 15 - Math.round(Math.abs(j - 8) * 0.25); for (let i = -w; i <= w; i++) R.pset(x + i, b - j, c((i + j * 2) % 4 === 0 ? 'cestaS' : j > 13 ? 'cestaL' : i > w - 3 ? 'cestaS' : 'cesta')); }
  R.rect(x - 14, b - 16, x + 14, b - 16, c('cestaL')); for (let k = 0; k < 8; k++) a_piedra(R, x - 10 + k * 3, b - 17 - (k % 2) * 2, 2, 2, 'guija', luz);
  for (const s2 of [-1, 1]) R.linea(x + s2 * 14, b - 15, x + s2 * 10, b - 22, c('cestaS'));
  return { cesta: [x, b] };
}

function a_escalon(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz), barre = o.barre ?? 0.4, nEsc = o.escalones ?? 1;
  const capa = a_capa(R, 'escalon|' + luz, luz, () => {
    a_pico(R, 0.5);
    a_cerro(R, 0, 319, (x) => Math.max(x > 266 ? 52 : 0, 54 + Math.sin(x * 0.05) * 5 + (x > 150 ? -(x - 150) * 0.08 : 0)), 92, 810, 0.35);
    a_arena(R, 86, 98, 9);
    // la otra pared de la zanja, al fondo (roca tallada en sombra), y el hueco oscuro que baja
    for (let y = 92; y <= 118; y++) for (let x = 0; x < 320; x++) { const d = (y - 92) / 26, v = a_c(a_rocaCol(x, y, 92, 811)); R.pset(x, y, a_mez(v, a_c('#2a1c22'), Math.min(0.85, 0.3 + d * 0.7) * (a_umb(x, y) < 0.5 ? 1 : 0.9))); }
    for (let x = 0; x < 320; x++) { R.pset(x, 92, c('r0')); R.pset(x, 93, c('r1')); }
    // la huella del escalón: roca tallada lisa, con las marcas del cincel en diagonal
    for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 812), m = ((x + y * 2) % 9 === 0 || (x + y * 2) % 9 === 1) && h(x >> 3, y >> 2, 813) < 0.55; R.pset(x, y, c(q < 0.03 ? 'r3' : m ? (h(x, y, 819) < 0.5 ? 'r3' : 'r2') : y < 123 ? 'r0' : a_umb(x, y) < 0.15 ? 'r2' : 'r1')); }
    R.rect(0, 119, 319, 119, c('pie'));
  }, { hor: 90 });
  R.copiar(capa.buf);
  a_cieloVivo(R, t, capa, luz, { y0: 24, y1: 50, nubes: [[0, 36, 18, 1.2], [160, 42, 14, 0.7]] });
  // los escalones de detrás, más abajo (se adivinan en la sombra): el segundo y el tercero
  for (let k = 1; k < Math.min(3, Math.ceil(nEsc) + 1); k++) { const y = 118 - k * 8, v = Math.min(1, nEsc - k + 1); if (v <= 0) continue; for (let x = 0; x < 320; x++) { if (h(x >> 2, k, 814) > v) continue; R.pset(x, y, c(k === 1 ? 'r3' : 'r4')); R.pset(x, y + 1, c('r5')); } }
  // la arena que tapa el escalón: desde el borde de lo barrido (xb) hacia la derecha, con el caballón que empuja la mano
  const xb = Math.round(10 + barre * 290);
  for (let x = xb - 4; x < 320; x++) { const alto = x < xb + 6 ? 10 + Math.round((x - xb + 4) * 0.6) : 14 + Math.round(Math.sin(x * 0.07) * 3 + a_vn(x, 0, 12, 1, 815) * 6);
    const y0 = 120 - Math.round(alto * 0.35), ya = Math.max(100, y0); for (let y = ya; y < 180; y++) { if (y > 120 + alto * 2.6) break; const q = h(x, y, 816); R.pset(x, y, c(y === ya ? 'pie' : q < 0.06 ? 'a4' : q < 0.12 ? 'guija' : x < xb + 3 ? 'a0' : (x + y) % 5 === 0 ? 'a2' : 'a1')); }
    if (x > xb + 6) for (let y = 120; y < 124; y++) R.pset(x, y, c('a2')); }   // la arena cae por el filo
  // en lo barrido: lascas de piedra, una brocha de cerdas y un cazo de arena
  for (let k = 0; k < 10; k++) a_piedra(R, 8 + Math.round(h(k, 4, 820) * Math.max(10, xb - 40)), 150 + Math.round(h(k, 5, 820) * 26), 1 + (k % 3), 1 + (k % 2), 'guija', luz);
  if (xb > 70) { R.rect(20, 166, 34, 168, c('madera')); R.rect(20, 166, 34, 166, c('maderaL')); for (let i = 0; i < 9; i++) R.linea(35, 165 + (i % 3), 44, 163 + i, c(i % 2 ? 'cestaS' : 'cestaL')); }
  { const bx = 50, by = 140; R.disco(bx, by, 7, c('hierro')); R.disco(bx, by - 1, 6, c('hierroL')); R.disco(bx, by - 1, 5, c('a2')); R.rect(bx + 6, by - 2, bx + 16, by - 1, c('maderaS')); }
  // granos grandes sueltos en lo barrido, y el polvo que levanta la mano
  for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 817) * Math.max(1, xb - 20)), y = 124 + Math.round(h(k, 2, 817) * 54); R.pset(x, y, c('a2')); R.pset(x + 1, y, c('a3')); }
  for (let k = 0; k < 14; k++) { const f = (t * 1.3 + k / 14) % 1, x = xb + 4 + Math.round(f * 26 + Math.sin(t * 4 + k) * 3), y = 128 - Math.round(f * 26 * h(k, 3, 818) + Math.sin(k) * 4); if (a_umb(x, y) < 1 - f) R.pset(x, y, c('pie')); }
  // LA MANO que barre (la canónica de 14 px, con la manga de Carter), junto al caballón; o.mano false la quita
  const my = 140;
  if (o.mano !== false) brazo(R, xb - 30, 182, xb - 2, my, o.manga ?? '#d8c8a8', 1, { codo: [xb - 22, 162] });
  return { suelo: 132, libre: [0, 0], escalon: [160, 120], mano: [xb - 2, my] };
}

const A_ESC = { lim: 118, fin: 180, n: 16 };

const a_escY = (k) => Math.round(A_ESC.lim + (A_ESC.fin - A_ESC.lim) * Math.pow((A_ESC.n - k) / A_ESC.n, 1.25));   // el borde de delante del escalón k (0: el de arriba, junto a la cámara)

const a_bordeL = (y) => 118 - (y - 58) * (78 / 122), a_sueloL = (y) => 118 - (y - 118) * (66 / 62), a_bordeR = (y) => 202 + (y - 58) * (78 / 122), a_sueloR = (y) => 202 + (y - 118) * (66 / 62);

// los óvalos de sellos pequeños (6 × 4) del enlucido de una puerta
function a_sellito(R, x, y, luz = 'dia') { const c = (n) => a_c(n, luz); R.rect(x - 2, y - 2, x + 2, y + 2, a_c('#b89a74', luz)); R.rect(x - 3, y - 1, x + 3, y + 1, a_c('#b89a74', luz)); R.rect(x - 2, y - 1, x + 2, y, a_c('#8a6a4c', luz)); R.pset(x + 1, y - 2, a_c('#8a6a4c', luz)); R.pset(x - 3, y - 1, c('r0')); R.pset(x - 2, y - 2, c('r0')); }

function a_escalera(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz), tap = o.tapada ?? 0;
  const capa = a_capa(R, 'escalera|' + luz, luz, () => {
    a_cerro(R, 0, 319, (x) => Math.max(x > 266 ? 50 : 0, 30 + Math.sin(x * 0.06) * 4 + Math.abs(x - 140) * 0.05), 60, 820, 0.3);
    a_cono(R, 60, 62, 60, 10, 821, 0.1); a_cono(R, 270, 64, 70, 12, 822, 0.1);
    a_arena(R, 56, 179, 10);
    for (let x = 0; x < 320; x++) R.pset(x, 57 + Math.round(Math.sin(x * 0.05)), c('a3'));
    a_monton(R, 34, 112, 60, 14, 9); a_monton(R, 292, 118, 56, 18, 10); a_monton(R, 300, 164, 50, 12, 11);
    for (const [x, b, w, v] of [[64, 130, 9, 0], [76, 136, 8, 1], [252, 132, 9, 0], [20, 160, 9, 0], [236, 150, 8, 1]]) a_cesta(R, x, b, w, 'dia', !!v);
    R.linea(8, 140, 50, 128, c('maderaS')); R.linea(10, 144, 52, 132, c('maderaS')); for (let k = 0; k < 7; k++) R.linea(12 + k * 6, 140 - k * 1.7, 14 + k * 6, 144 - k * 1.7, c('madera'));   // una escalera de mano tumbada
    for (let a = 0; a < 6.28; a += 0.07) for (const r of [5, 4, 3]) R.pset(Math.round(270 + Math.cos(a) * r * 1.4), Math.round(170 + Math.sin(a) * r * 0.6), c(r === 4 ? 'cestaS' : 'cestaL'));   // un rollo de cuerda
    R.linea(96, 168, 112, 150, c('maderaS')); R.rect(108, 147, 116, 149, c('hierro'));   // un pico clavado
    // la zanja: la pared del fondo (la de la puerta), las dos paredes que se abren hacia la cámara y los escalones
    for (let y = 58; y < 180; y++) { const bl = Math.round(a_bordeL(y)), br = Math.round(a_bordeR(y)), sl = y >= 118 ? Math.round(a_sueloL(y)) : 118, sr = y >= 118 ? Math.round(a_sueloR(y)) : 202;
      for (let x = Math.max(0, bl); x <= Math.min(319, br); x++) {
        let q;
        if (y < 118 && x >= 118 && x <= 202) q = a_rocaCol(x, y, 58, 823);   // la pared del fondo
        else if (x < sl) { q = a_rocaCol(x, y, 0, 824); q = q === 'az' || q === 'azS' ? 'r3' : q; }   // la pared izquierda, al sol
        else if (x > sr) { const v = a_rocaCol(x, y, 0, 825); q = v === 'r0' ? 'r2' : v === 'r1' || v === 'rosa' ? 'az' : v === 'r2' ? 'azS' : v; }   // la derecha, en sombra
        else continue;
        R.pset(x, y, c(q)); }
      R.pset(bl, y, c('pie')); R.pset(bl + 1, y, c('r0')); R.pset(br, y, c('r1')); }
    for (let x = 118; x <= 202; x++) { R.pset(x, 58, c('pie')); R.pset(x, 59, c('r0')); }
    // los escalones: la huella clara, el filo de luz y la sombra del filo; la sombra de la pared derecha cae en diagonal
    for (let k = 0; k < A_ESC.n; k++) { const ya = a_escY(k + 1), yb = a_escY(k);
      for (let y = ya; y < yb; y++) { const xl = Math.round(a_sueloL(y)), xr = Math.round(a_sueloR(y)); for (let x = xl; x <= xr; x++) { const somb = x > xr - 6 - (yb - y) * 0.6, q = h(x, y, 826);
          R.pset(x, y, c(y === ya ? (somb ? 'r2' : 'pie') : y === ya + 1 ? (somb ? 'az' : 'r0') : y === yb - 1 ? (somb ? 'azS' : 'r3') : somb ? 'az' : q < 0.05 ? 'r2' : 'r1')); } } }
    // el rellano de abajo y LA PUERTA tapiada (canon «la segunda puerta», aquí la primera, más clara): el muro de
    // piedras enlucido, el dintel de madera, filas de sellos ovales
    for (let y = 112; y < 118; y++) for (let x = 118; x <= 202; x++) R.pset(x, y, c(y === 112 ? 'r0' : h(x, y, 827) < 0.06 ? 'a3' : 'a1'));
    { const x0 = 136, x1 = 184, y0 = 70, y1 = 112; R.rect(x0 - 3, y0 - 6, x1 + 3, y0 - 1, c('maderaS')); R.rect(x0 - 3, y0 - 6, x1 + 3, y0 - 6, c('maderaL')); for (let x = x0; x < x1; x += 7) R.pset(x, y0 - 4, c('madera'));
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const pied = a_vn(x, y, 6, 5, 828) > 0.68, q = h(x, y, 829); R.pset(x, y, a_c(pied ? (q < 0.3 ? '#b8a284' : '#ccb898') : q < 0.05 ? '#d8c8a8' : a_umb(x, y) < 0.12 ? '#e4d4b4' : '#f0e2c4')); }
      R.rect(x0, y0, x0, y1, c('r3')); R.rect(x1, y0, x1, y1, c('r4'));
      for (let f = 0; f < 4; f++) for (let i = 0; i < 4; i++) a_sellito(R, x0 + 8 + i * 11 + (f % 2) * 4, y0 + 8 + f * 9);
      for (let y = y1 - 6; y <= y1; y++) for (let x = x0; x <= x1; x++) if (a_umb(x, y) < 0.5) R.pset(x, y, a_c('#c8b494')); }
  }, { hor: 40, sol: [226, 18, 5] });
  R.copiar(capa.buf);
  a_cieloVivo(R, t, capa, luz, { y0: 4, y1: 22, nubes: [[0, 16, 12, 0.9], [120, 22, 10, 1.6]] });
  // la arena que vuelve a tapar la zanja (o.tapada 0–1): el nivel sube desde la puerta hacia la cámara
  if (tap > 0) { const yN = Math.round(118 + 62 * Math.pow(tap, 1.25)), yTop = Math.round(118 - 60 * tap);
    for (let y = yTop; y < Math.max(yN, 119); y++) { const bl = Math.round(a_bordeL(Math.max(58, y))), br = Math.round(a_bordeR(Math.max(58, y)));
      for (let x = bl; x <= br; x++) { if (y < yTop + Math.round(Math.abs(x - 160) * 0.06)) continue; const q = h(x, y, 830); R.pset(x, y, c(y === yN - 1 || y === yTop ? 'pie' : q < 0.04 ? 'a4' : q < 0.1 ? 'a0' : (x + y) % 6 === 0 ? 'a2' : 'a1')); } }
    for (let k = 0; k < 14; k++) { const f = (t * 1.2 + k / 14) % 1, s = k % 2 ? -1 : 1, x0 = s > 0 ? 70 : 250; R.pset(Math.round(x0 + s * f * 40), Math.round(140 - Math.sin(f * 3.14) * 20 + k), c(k % 3 ? 'a0' : 'a2')); } }
  // obreros diminutos en el borde, arriba, que pasan con cestas, y uno que mira hacia abajo
  for (let k = 0; k < 3; k++) { const u = ((t * 0.05 + k / 3) % 1), x = 10 + u * 90, d = 1; a_obrero(R, x, 70 + k * 3, t, k, { anda: true, cesta: k !== 1, dir: d, luz }); }
  for (let k = 0; k < 2; k++) { const u = ((t * 0.04 + k / 2) % 1), x = 310 - u * 80; a_obrero(R, x, 72 + k * 4, t, k + 2, { anda: true, cesta: true, dir: -1, luz }); }
  a_obrero(R, 214, 64, t, 1, { dir: -1, luz });
  if (luz === 'noche') a_farol(R, 128, 104, t, luz);
  const esc = []; for (let k = 0; k < A_ESC.n; k++) esc.push([160, a_escY(k) - 1]);
  return { suelo: 117, libre: [124, 196], puerta: [136, 70, 184, 112], escalones: esc, borde: [[50, 150], [270, 150]] };
}

function a_sellos(R, t, o) {
  const luz = 'dia', c = (n) => a_c(n, luz);
  const capa = a_capa(R, 'sellos', luz, () => {
    // el enlucido sobre las piedras: grietas, desconchones que dejan ver las piedras, la mano del albañil (barridos)
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const des = a_vn(x, y, 14, 10, 840) > 0.74, q = h(x, y, 841), bar = Math.sin(x * 0.05 + y * 0.2 + a_vn(x, y, 30, 30, 842) * 6) > 0.85;
      let v; if (des) { const p = a_vn(x, y, 7, 6, 843); v = p > 0.6 ? '#a88a66' : p > 0.35 ? '#bca07a' : '#7a6044'; } else v = q < 0.03 ? '#c4ae8c' : bar ? '#e8d8b8' : a_umb(x, y) < 0.18 ? '#d4c2a0' : '#dccaa8';
      R.pset(x, y, a_c(v)); }
    for (let g = 0; g < 7; g++) { let x = Math.round(h(g, 1, 844) * 300 + 10), y = Math.round(h(g, 2, 844) * 120 + 10); for (let i = 0; i < 26; i++) { R.pset(x, y, a_c('#8a7050')); R.pset(x + 1, y, a_c('#efe2c6')); y++; x += h(g, i, 845) < 0.5 ? 1 : -1; } }
    // el suelo de cascotes abajo y la jamba de roca a los lados
    for (let y = 166; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, c(h(x, y, 846) < 0.2 ? 'r3' : h(x, y, 846) < 0.4 ? 'r2' : 'a2'));
    for (let k = 0; k < 16; k++) a_piedra(R, Math.round(h(k, 1, 847) * 320), 168 + Math.round(h(k, 2, 847) * 10), 2 + (k % 3), 2, 'guija');
    for (const [xa, xb] of [[0, 14], [306, 319]]) for (let y = 0; y < 166; y++) for (let x = xa; x <= xb; x++) R.pset(x, y, c(a_rocaCol(x, y, -9, 848)));
    a_calma(R, 270, 0, 319, 50, 0.85); a_calma(R, 14, 0, 178, 22, 0.8);
  });
  R.copiar(capa.buf);
  // las filas de sellos (PIEZAS_TU.sello al doble), uno algo roto; el más claro en (164, 92)
  for (let f = 0; f < 3; f++) for (let i = 0; i < 5; i++) { const x = 44 + i * 58 + (f % 2) * 14 - 7, y = 52 + f * 46; if (x > 296 || (f === 0 && x > 240)) continue; PIEZAS_TU.sello?.(R, f === 1 && i === 2 ? 164 : x, f === 1 && i === 2 ? 106 : y, { s: 2, roto: f === 2 && i === 0 }); }
  // la cuerda vieja que cruzaba la puerta, colgando de dos clavijas, y que se mece un poco
  for (const [x, y] of [[40, 56], [290, 60]]) { R.rect(x - 2, y - 2, x + 2, y + 2, c('maderaS')); R.pset(x - 1, y - 1, c('madera')); }
  for (let x = 40; x <= 290; x++) { const u = (x - 40) / 250, y = Math.round(56 + 4 * u + Math.sin(u * Math.PI) * (18 + Math.sin(t * 1.3) * 1.5)); R.pset(x, y, a_c('#8a6a3a')); R.pset(x, y + 1, a_c('#5a4224')); if (x % 4 === 0) R.pset(x, y, a_c('#b8945a')); }
  // la luz del farol que barre la puerta (o.farol 0–1: dónde está su centro; sin o.farol, va y viene sola), y el resto en penumbra
  const fx = Math.round(30 + (o.farol ?? (0.5 + 0.5 * Math.sin(t * 0.5))) * 260), fy = 100, B = R.buf, osc = hex('#1a1424');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - fx) / 1.3, y - fy) + Math.sin(t * 11 + y * 0.1) * 0.8, i = y * 320 + x; if (d < 70) continue; const k = Math.min(0.7, (d - 70) / 90); if (a_quieta(x, y) ? true : a_umb(x, y) < 0.5 + k * 0.5) B[i] = a_mez(B[i], osc, a_quieta(x, y) ? 0.45 : k); }
  return { suelo: 176, libre: [0, 0], sello: [164, 92], farol: [fx, fy] };
}

// una tira de cinta de papel por una polilínea (pts), con el canto en sombra y los puntos y rayas que corren con t
// (corre: velocidad); hasta: la fracción del largo que se pinta. Devuelve la punta [x, y]
const A_MORSE = 'K.KKK..K.K..KKK.KKK.K...K.KKK.K..K.K.KKK..';

function a_cinta(R, pts, t, hasta = 1, corre = 1, ancho = 2) {
  let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); L += l; }
  const fin = L * Math.max(0, Math.min(1, hasta)), paso = ancho >= 6 ? 3 : 1, off = Math.floor(t * 12 * corre); let d = 0, punta = pts[0];
  for (let i = 1; i < pts.length && d < fin; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], l = seg[i - 1], n = Math.ceil(l);
    for (let s = 0; s <= n; s++) { const dd = d + l * s / n; if (dd > fin) break; const x = Math.round(ax + (bx - ax) * s / n), y = Math.round(ay + (by - ay) * s / n);
      const m = A_MORSE[((Math.floor(dd / paso) - off) % A_MORSE.length + A_MORSE.length * 99) % A_MORSE.length] === 'K', mid = ancho >> 1;
      for (let j = 0; j < ancho; j++) { const marca = ancho >= 6 ? Math.abs(j - mid) <= 1 : j === ancho - 2; R.pset(x, y + j, j === ancho - 1 ? hex('#c8c0b0') : j === 0 && ancho >= 6 ? hex('#ffffff') : m && marca ? hex('#2a2a34') : hex('#fbf8ee')); }
      punta = [x, y]; }
    d += l; }
  return punta;
}

// el camino de la cinta en la oficina: sale del aparato, corre por el mostrador, cae por su punta, se enrolla en el
// suelo y se va hacia la puerta (y fuera, hasta la boca del burro si ha entrado)
function a_cintaCamino(t, burro) {
  const p = [[110, 135], [150, 136], [156, 138], [157, 153], [160, 158], [176, 163], [186, 158], [178, 152], [168, 156], [172, 164], [196, 168], [214, 164], [208, 158], [200, 162], [222, 170], [246, 162], [254, 157]];
  if (burro > 0.45) { const bx = 318 - 50; p.push([262, 152], [bx - 13, 141]); } else p.push([276, 158], [300, 158]);
  return p;
}

function a_telegrafo(R, t, o) {
  const luz = 'dia', c = (n) => a_c(n, luz), cinta = o.cinta ?? 0.6, bur = o.burro ?? 0;
  const capa = a_capa(R, 'telegrafo', luz, () => {
    // el techo de yeso (tranquilo bajo la barra del año) y la viga
    for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) R.pset(x, y, a_c(a_umb(x, y) < y / 40 ? '#d8d0c0' : '#e4ddd0'));
    R.rect(178, 14, 268, 17, c('maderaS')); R.rect(178, 14, 268, 14, c('madera')); for (const [a, b] of [[0, 177], [269, 319]]) R.rect(a, 16, b, 17, a_c('#d4ccbc'));
    // la pared encalada con sus brochazos y manchas, y el zócalo azul de abajo
    for (let y = 18; y < 150; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 850), b = a_vn(x, y, 18, 6, 851), zoc = y > 124;
      R.pset(x, y, a_c(zoc ? (y === 125 ? '#3e5a80' : q < 0.05 ? '#4a6a90' : b > 0.66 ? '#6a8ab0' : '#5c7ca4') : q < 0.02 ? '#cfc8b8' : b > 0.7 ? '#ece6d8' : b < 0.25 && a_umb(x, y) < 0.3 ? '#e0d8c6' : '#f4f0e4')); }
    for (let x = 0; x < 320; x++) R.pset(x, 124, a_c('#c8c0b0'));
    for (let k = 0; k < 4; k++) { const x0 = 20 + k * 70; for (let y = 106; y < 124; y++) if (a_umb(x0 + (y % 3), y) < (y - 106) / 22) R.pset(x0 + Math.round(Math.sin(y) * 2), y, a_c('#ddd2bc')); }   // manchas de humedad
    // el reloj de pared redondo
    { const x = 54, y = 44; R.disco(x, y, 11, c('maderaS')); R.disco(x, y, 10, c('madera')); R.disco(x, y, 8, a_c('#f8f4e8')); for (let k = 0; k < 12; k++) R.pset(Math.round(x + Math.cos(k / 6 * Math.PI) * 7), Math.round(y + Math.sin(k / 6 * Math.PI) * 7), a_c('#3a3a44')); R.rect(x - 1, y + 11, x + 1, y + 22, c('maderaS')); }
    // el mapa sin letras (el Nilo azul, el delta verde, el desierto) en su marco
    { const x0 = 76, y0 = 28, x1 = 126, y1 = 76; R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, c('maderaS')); R.rect(x0, y0, x1, y1, a_c('#e8dcb8'));
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (h(x, y, 852) < 0.06) R.pset(x, y, a_c('#d8c8a0'));
      for (let y = y0 + 2; y <= y1; y++) { const x = Math.round(100 + Math.sin(y * 0.15) * 4 - (y - y0) * 0.15); R.pset(x, y, a_c('#3a6aa8')); R.pset(x + 1, y, a_c('#5a8ac8')); if (y < y0 + 12) for (let i = -(y0 + 12 - y); i <= y0 + 12 - y; i++) R.pset(x + i, y, a_c('#8ab070')); }
      R.rect(x0, y0, x1, y0 + 1, a_c('#7aa8d8')); R.disco(98, 58, 1, c('rojo')); R.rect(x0 + 4, y1 - 6, x0 + 18, y1 - 6, a_c('#5a4a3a')); for (let i = 0; i < 4; i++) R.pset(x0 + 4 + i * 4, y1 - 7, a_c('#5a4a3a')); }
    // el casillero de los impresos y las pilas de vidrio del telégrafo en su repisa, con sus cables
    { const x0 = 140, y0 = 30; R.rect(x0 - 1, y0 - 1, x0 + 45, y0 + 47, c('maderaS')); for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const xa = x0 + i * 11, ya = y0 + j * 11; R.rect(xa + 1, ya + 1, xa + 10, ya + 10, a_c('#5a3e26')); if (h(i, j, 853) < 0.7) { R.rect(xa + 2, ya + 5, xa + 9, ya + 10, a_c(h(i, j, 854) < 0.5 ? '#f0e8d0' : '#e4d8f0')); R.rect(xa + 2, ya + 5, xa + 9, ya + 5, a_c('#ffffff')); } } }
    { R.rect(194, 92, 240, 94, c('madera')); R.rect(194, 92, 240, 92, c('maderaL')); for (let k = 0; k < 5; k++) { const x = 198 + k * 9; R.rect(x, 80, x + 6, 91, a_c('#9ac0b8')); R.rect(x + 1, 81, x + 5, 85, a_c('#c8e0d8')); R.rect(x + 1, 86, x + 5, 91, a_c('#6a9a90')); R.rect(x + 2, 77, x + 2, 80, a_c('#3a3a44')); R.rect(x + 4, 77, x + 4, 80, a_c('#b87a3a')); }
      R.linea(200, 77, 120, 70, a_c('#3a3a44')); R.linea(120, 70, 100, 118, a_c('#3a3a44')); }
    // la puerta abierta a la derecha: el marco de madera y la hoja abierta hacia dentro
    { const [x0, y0, x1, y1] = [244, 58, 296, 156]; R.rect(x0 - 4, y0 - 5, x1 + 4, y1, c('maderaS')); R.rect(x0 - 3, y0 - 4, x1 + 3, y0 - 1, c('madera')); R.rect(x0 - 4, y0 - 5, x1 + 4, y0 - 5, c('maderaL'));
      R.rect(x0, y0, x1, y1, 0);   // el hueco (se pinta en vivo, con la calle)
      R.poligono([[x1 + 4, y0 - 2], [x1 + 18, y0 + 6], [x1 + 18, y1 - 4], [x1 + 4, y1]], c('maderaS')); R.poligono([[x1 + 5, y0], [x1 + 17, y0 + 7], [x1 + 17, y1 - 6], [x1 + 5, y1 - 2]], a_c('#5a7a8a'));
      for (let k = 0; k < 4; k++) R.linea(x1 + 7, y0 + 10 + k * 22, x1 + 15, y0 + 15 + k * 22, a_c('#3e5a6a')); }
    // el suelo de baldosas hidráulicas (ocre y crema con su dibujo), con la luz de la puerta
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const w = 12 + (y - 150) * 0.2, u = ((x - 160) / (1 + (y - 150) * 0.02)), bx = Math.floor(u / w), by = Math.floor((y - 150) / 6), fx = ((u % w) + w) % w, fy = (y - 150) % 6;
      const junta = fx < 1 || fy === 0, rombo = Math.abs(fx - w / 2) / w + Math.abs(fy - 3) / 6 < 0.35, sol = x > 170 + (y - 150) * -1.5 && x < 300 - (y - 150) * 0.6 && y > 156;
      let v = junta ? '#8a7a64' : rombo ? ((bx + by) % 2 ? '#b8603a' : '#c89a4a') : '#e8dcc4'; let cc = a_c(v); if (sol && !junta) cc = a_mez(cc, hex('#fff4d8'), 0.3); R.pset(x, y, cc); }
    for (let x = 0; x < 320; x++) { R.pset(x, 150, a_c('#4a3a2c')); R.pset(x, 151, a_c('#7a6a54')); }
    // el banco de madera de la izquierda y una tinaja
    R.rect(4, 136, 26, 138, c('madera')); R.rect(4, 136, 26, 136, c('maderaL')); for (const x of [6, 24]) R.rect(x, 139, x + 1, 152, c('maderaS'));
    R.disco(16, 146, 6, a_c('#b87a4a')); R.disco(14, 144, 3, a_c('#d0946a')); R.rect(13, 139, 19, 140, a_c('#8a5a34'));
  });
  R.copiar(capa.buf);
  // la calle al sol por la puerta (recortada a su hueco): cielo, la casa de enfrente, una palmera, gente que pasa
  { const [x0, y0, x1, y1] = [244, 58, 296, 156]; R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y < 96 ? a_c(a_umb(x, y) < (y - y0) / 40 ? '#e8eef0' : '#c8dce8') : y < 140 ? a_c(h(x, y, 855) < 0.04 ? '#c8a478' : (y - 96) % 7 === 6 ? '#d4b48a' : '#e4c8a0') : a_c(h(x, y, 856) < 0.08 ? '#d8b888' : '#f0dcb4'));
    R.rect(262, 112, 274, 140, a_c('#5a3a24')); for (let y = 96; y < 99; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, a_c('#c8a478'));
    a_palmera(R, 286, 112, t); for (let k = 0; k < 2; k++) { const u = ((t * 0.09 + k * 0.5) % 1), px = Math.round(330 - u * 120); if (px > 247 && px < 293) a_obrero(R, px, 150, t, k + 1, { anda: true, dir: -1, cesta: k === 0 }); }
    R.recorte(null); }
  // la cinta en el suelo (lo de encima del mostrador va en valleDelante): sale del aparato y no se acaba
  const camino = a_cintaCamino(t, bur), punta = a_cinta(R, camino.slice(3), t, bur > 0.45 ? 1 : cinta, 1);
  // EL BURRO que asoma por la puerta (o.burro 0–1: entra y, pasada la mitad, masca la punta de la cinta)
  if (bur > 0) { const u = Math.min(1, bur / 0.45); R.recorte([244, 40, 296, 157]); a_burro(R, Math.round(318 - u * 50), 157, t, { dir: -1, masca: bur > 0.5 }); R.recorte(null); }
  // el ventilador de techo que gira, y las motas de polvo en la luz de la puerta
  { const fx = 200, fy = 24, a = t * 9; R.rect(fx, 17, fx, fy - 2, c('hierro')); R.rect(fx - 2, fy - 2, fx + 2, fy, c('hierro'));
    for (let k = 0; k < 4; k++) { const an = a + k * Math.PI / 2, ex = Math.cos(an) * 16, ey = Math.sin(an) * 2.4; R.linea(fx, fy - 1, Math.round(fx + ex), Math.round(fy - 1 + ey), c('maderaS')); R.linea(fx, fy, Math.round(fx + ex * 0.9), Math.round(fy + ey * 0.9), c('madera')); } }
  motas(R, t, 196, 300, 96, 150, 16, hex('#fff8e0'));
  // el reloj marca la hora (las agujas se mueven), y una salamanquesa en la pared
  { const x = 54, y = 44, m = t * 0.6, hh = t * 0.05; R.linea(x, y, Math.round(x + Math.cos(m) * 6), Math.round(y + Math.sin(m) * 6), a_c('#2a2a34')); R.linea(x, y, Math.round(x + Math.cos(hh) * 4), Math.round(y + Math.sin(hh) * 4), a_c('#2a2a34')); R.pset(x, y, c('rojo'));
    R.rect(x - 1, y + 12 + Math.round(Math.sin(t * 2.5) * 3), x + 1, y + 16 + Math.round(Math.sin(t * 2.5) * 3), c('oro')); }
  { const u = (t % 11) / 11, gx = Math.round(170 + (u < 0.4 ? u / 0.4 : 1) * 12), gy = Math.round(100 - (u < 0.4 ? u / 0.4 : 1) * 30); R.rect(gx, gy, gx + 1, gy + 5, a_c('#8a9a6a')); R.pset(gx - 1, gy + 1, a_c('#8a9a6a')); R.pset(gx + 2, gy + 1, a_c('#8a9a6a')); R.pset(gx - 1, gy + 4, a_c('#8a9a6a')); R.pset(gx + 2, gy + 4, a_c('#8a9a6a')); R.pset(gx, gy + 6 + Math.round(Math.sin(t * 6)), a_c('#6a7a4a')); }
  return { suelo: 162, detras: 146, libre: [160, 240], mostrador: 141, aparato: [96, 135], puerta: [244, 58, 296, 156], punta, burro: bur > 0 ? [Math.round(318 - Math.min(1, bur / 0.45) * 50) - 12, 140] : undefined };
}

// lo de delante en el telégrafo: el mostrador de madera con su tablero, el aparato de cinta y el manipulador de latón,
// y la cinta que corre por el tablero y cae por la punta del mostrador
function a_telegrafoDelante(R, t, o) {
  const c = (n) => a_c(n), x0 = 24, x1 = 154, y = 141;
  a_tablero(R, x0, y, x1, 158);
  // el aparato de cinta (registro morse): la base de madera, el mecanismo de latón, el carrete con su rollo y las ruedas
  { const ax = 96; R.rect(ax - 14, y - 4, ax + 14, y - 1, c('maderaS')); R.rect(ax - 14, y - 4, ax + 14, y - 4, c('maderaL')); R.rect(ax - 10, y - 12, ax + 10, y - 5, c('oro')); R.rect(ax - 10, y - 12, ax + 10, y - 12, c('oroL')); R.rect(ax + 8, y - 12, ax + 10, y - 5, c('oroS'));
    R.disco(ax - 4, y - 16, 5, c('oroS')); R.disco(ax - 4, y - 16, 4, a_c('#f8f4e8')); R.disco(ax - 4, y - 16, 1, c('oroS')); const g = t * 4; R.pset(Math.round(ax - 4 + Math.cos(g) * 3), Math.round(y - 16 + Math.sin(g) * 3), a_c('#b8b0a0'));
    R.disco(ax + 6, y - 8, 2, c('hierro')); R.pset(Math.round(ax + 6 + Math.cos(-g * 2) * 2), Math.round(y - 8 + Math.sin(-g * 2) * 2), c('hierroL')); R.rect(ax + 10, y - 7, ax + 14, y - 6, c('hierroL')); }
  // el manipulador (la llave) de latón, que baja y sube
  { const kx = 64, p = Math.floor(t * 7) % 3 === 0 ? 1 : 0; R.rect(kx - 7, y - 2, kx + 7, y - 1, c('maderaS')); R.rect(kx - 6, y - 4 + p, kx + 5, y - 3 + p, c('oro')); R.rect(kx + 4, y - 6 + p, kx + 6, y - 4 + p, a_c('#2a2a34')); R.pset(kx - 6, y - 4, c('oroL')); }
  // un sello de goma, el tampón y un taco de impresos
  R.rect(36, y - 3, 46, y - 1, a_c('#f0e8d0')); R.rect(36, y - 3, 46, y - 3, a_c('#ffffff')); R.rect(128, y - 2, 136, y - 1, a_c('#3a3a5a')); R.rect(131, y - 6, 133, y - 3, c('madera'));
  const bur = o.burro ?? 0, cam = a_cintaCamino(t, bur);
  a_cinta(R, cam.slice(0, 4), t, 1, 1);
  return { mostrador: [x0, y, x1, 157], aparato: [96, y - 6] };
}

// un tablero de mostrador de madera visto de frente: el canto del tablero, los cuarterones con su moldura y el zócalo
function a_tablero(R, x0, y, x1, yb) {
  const c = (n) => a_c(n); R.rect(x0 - 2, y, x1 + 2, y + 3, c('maderaL')); R.rect(x0 - 2, y + 3, x1 + 2, y + 4, c('maderaS')); R.rect(x0 - 2, y, x1 + 2, y, a_c('#d8a868'));
  R.rect(x0, y + 5, x1, yb, c('madera')); for (let x = x0 + 3; x + 22 <= x1; x += 26) { R.rect(x, y + 8, x + 22, yb - 4, c('maderaS')); R.rect(x + 1, y + 9, x + 21, yb - 5, a_c('#9a6c40')); R.rect(x + 1, y + 9, x + 21, y + 9, c('maderaL')); for (let j = y + 12; j < yb - 6; j += 3) R.pset(x + 4 + (j % 7), j, c('maderaS')); }
  R.rect(x0, yb - 2, x1, yb, c('maderaS'));
}

function a_cintaCerca(R, t, o) {
  const c = (n) => a_c(n), bur = o.burro ?? 0.6, corre = o.corre ?? 1;
  const capa = a_capa(R, 'cintaCerca', 'dia', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const b = a_vn(x, y, 22, 8, 860), q = h(x, y, 861); R.pset(x, y, a_c(y > 96 ? (y === 97 ? '#3e5a80' : b > 0.6 ? '#6a8ab0' : '#5c7ca4') : q < 0.02 ? '#cfc8b8' : b > 0.68 ? '#ece6d8' : '#f4f0e4')); }
    // el marco de la puerta a la derecha y la calle al sol
    R.rect(244, 0, 252, 179, c('maderaS')); R.rect(245, 0, 246, 179, c('madera'));
    for (let y = 0; y < 180; y++) for (let x = 253; x < 320; x++) R.pset(x, y, a_c(y < 60 ? (a_umb(x, y) < y / 80 ? '#e8eef0' : '#c8dce8') : y < 150 ? ((y - 60) % 8 === 7 ? '#d4b48a' : h(x, y, 862) < 0.04 ? '#c8a478' : '#e4c8a0') : '#f0dcb4'));
    // la mesa del telegrafista (el tablero de madera con vetas) y su canto
    for (let y = 118; y < 180; y++) for (let x = 0; x < 236; x++) { const v = Math.sin(x * 0.07 + Math.sin(y * 0.3) * 2 + a_vn(x, y, 30, 3, 863) * 4); R.pset(x, y, c(y < 121 ? 'maderaL' : y > 170 ? 'maderaS' : v > 0.8 ? 'maderaL' : v < -0.8 ? 'maderaS' : 'madera')); }
    R.rect(236, 118, 240, 179, c('maderaS'));
    // EL APARATO grande: base de caoba, el mecanismo de latón con sus tornillos, el carrete con el rollo de papel
    R.rect(14, 110, 124, 124, a_c('#5a2e1e')); R.rect(14, 110, 124, 111, a_c('#8a4a30'));
    R.rect(30, 70, 110, 109, c('oroS')); R.rect(32, 72, 108, 107, c('oro')); R.rect(32, 72, 108, 74, c('oroL')); for (const [x, y] of [[36, 78], [104, 78], [36, 102], [104, 102]]) { R.disco(x, y, 2, c('oroS')); R.pset(x - 1, y - 1, c('oroL')); }
    R.disco(52, 52, 20, c('oroS')); R.disco(52, 52, 18, a_c('#f8f4e8')); for (let r = 4; r < 18; r += 2) for (let a = 0; a < 6.28; a += 0.05) if (h(r, 1, 864) < 0.5) R.pset(Math.round(52 + Math.cos(a) * r), Math.round(52 + Math.sin(a) * r), a_c('#e8e0cc')); R.disco(52, 52, 4, c('oroS'));
    R.rect(50, 72, 54, 76, c('oroS'));
  });
  R.copiar(capa.buf);
  // las ruedas dentadas que giran y el rodillo por donde sale la cinta
  for (const [x, y, r, v] of [[70, 90, 9, 1], [92, 96, 6, -1.5]]) { R.disco(x, y, r, c('oroS')); R.disco(x, y, r - 2, c('oro')); for (let k = 0; k < 10; k++) { const a = t * 3 * v * corre + k * 0.628; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), c('oroL')); } R.disco(x, y, 2, c('hierro')); }
  R.rect(108, 88, 126, 94, c('hierro')); R.rect(108, 88, 126, 88, c('hierroL'));
  { const g = t * 2 * corre; R.pset(Math.round(52 + Math.cos(g) * 14), Math.round(52 + Math.sin(g) * 14), a_c('#c8bca0')); }
  // la cinta: sale por el rodillo, corre por la mesa, cae en bucles por el canto y sube hasta el morro del burro
  const sw = Math.sin(t * 1.4) * 2, my = 128 + (bur > 0.5 ? Math.round(Math.sin(t * 7) * 1) : 0);
  const pts = [[126, 90], [170, 92], [214, 96], [232, 106], [238, 120]];
  for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 4, r = 9 + i * 0.12; pts.push([Math.round(232 + Math.sin(a) * r + i * 0.2), Math.round(138 + i * 0.5 - Math.cos(a) * r * 0.8 + sw * Math.sin(a))]); }
  if (bur > 0.3) pts.push([254, 150], [Math.round(lerp(330, 268, Math.min(1, bur / 0.6))), my]); else pts.push([262, 172], [300, 176]);
  a_cinta(R, pts, t, 1, corre, 9);
  // EL MORRO del burro, que entra por la derecha (o.burro 0–1) y masca la punta
  if (bur > 0) { const x = Math.round(lerp(352, 262, Math.min(1, bur / 0.6))), y = 128, mas = bur > 0.5 ? Math.floor(t * 7) % 2 : 0, P = (n) => a_c(A_BURRO[n] ?? n);
    // la cabeza del burro de perfil (mira a la izquierda): bolas de la cara gris que suben hacia la oreja, el hocico claro
    for (const [dx, dy, r, cc] of [[60, -34, 20, 'a'], [40, -20, 17, 'a'], [24, -8, 15, 'a'], [12, -2, 13, 'm']]) R.disco(x + dx, y + dy + 1, r, P('s'));
    for (const [dx, dy, r, cc] of [[60, -34, 19, 'a'], [40, -20, 16, 'a'], [24, -8, 14, 'a'], [12, -2, 12, 'm']]) R.disco(x + dx, y + dy, r, P(cc));
    R.disco(x + 10, y + 3, 9, P('l')); R.disco(x + 12, y - 6, 6, P('m'));
    for (const [dx, dy] of [[30, -26], [48, -38], [56, -18], [70, -40]]) R.pset(x + dx, y + dy, P('s'));
    R.rect(x + 2, y + 1 + mas, x + 18, y + 2 + mas, P('h')); R.rect(x + 3, y + 3 + mas, x + 15, y + 7 + mas, P('l')); R.rect(x + 4, y + 8 + mas, x + 14, y + 8 + mas, P('s'));   // la boca que masca
    R.disco(x + 5, y - 6, 2, P('h')); R.pset(x + 4, y - 7, P('l'));   // el ollar
    R.disco(x + 42, y - 26, 3, P('h')); R.pset(x + 41, y - 27, hex('#ffffff')); R.rect(x + 38, y - 30, x + 46, y - 30, P('s'));   // el ojo y la ceja
    const o2 = Math.sin(t * 1.6) > 0.6 ? 3 : 0; R.poligono([[x + 62, y - 46], [x + 70 + o2, y - 84], [x + 76, y - 48]], P('a')); R.poligono([[x + 66, y - 50], [x + 70 + o2, y - 78], [x + 72, y - 50]], P('m')); R.pset(x + 70 + o2, y - 84, P('h'));
    for (let k = 0; k < 40; k++) R.pset(x + 70 + Math.round(k * 0.4), y - 46 + k, P('n'));   // la crin
    for (let k = 0; k < 5; k++) R.pset(x + 2 + k * 3, y + 9 + (k % 2), P('s')); }   // los pelillos del morro
  return { suelo: 170, libre: [0, 0], boca: [268, 128], aparato: [70, 90] };
}

// un turista pequeño de fondo (7–8 px): gorra, camiseta de color, a veces abanico o botella que brilla
function a_turistita(R, x, suelo, t, k, luz) {
  const ropa = ['#e84a4a', '#3a8ac8', '#f0f0f0', '#e8b030', '#4aa060', '#a050a0', '#f08a3a'][k % 7], X = Math.round(x), p = Math.floor(t * 2 + k) % 4 === 0 ? 1 : 0;
  R.pset(X, suelo, a_c('#3a3a4a', luz)); R.pset(X + 2, suelo, a_c('#3a3a4a', luz)); R.rect(X, suelo - 2, X + 2, suelo - 1, a_c(k % 2 ? '#e8dcc0' : '#4a5a7a', luz));
  R.rect(X, suelo - 5, X + 2, suelo - 3, a_c(ropa, luz)); R.rect(X, suelo - 7, X + 2, suelo - 6, a_c(['#f0c8a0', '#c8906a', '#8a5a3a'][k % 3], luz)); R.rect(X - (k % 2), suelo - 8, X + 2, suelo - 8, a_c(['#ffffff', '#2a4a8a', '#c83a3a'][k % 3], luz));
  if (k % 3 === 0) R.rect(X + 3, suelo - 6 - p, X + 4, suelo - 5 - p, a_c('#f4e070', luz));   // el abanico
  else if (k % 3 === 1 && Math.sin(t * 2 + k) > 0.9) R.pset(X + 3, suelo - 5, hex('#ffffff'));   // la botella que brilla
}

function a_entrada(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz), cola = o.cola ?? 0.6;
  const capa = a_capa(R, 'entrada|' + luz, luz, () => {
    a_cerro(R, 0, 319, (x) => Math.max(x > 266 ? 52 : 0, 34 + Math.sin(x * 0.05) * 4 + Math.abs(x - 150) * 0.05), 100, 870, 0.15);
    a_boca(R, 40, 74, 9, 12); a_boca(R, 262, 78, 8, 10);
    // la ladera de escombro delante del acantilado, con el sendero en zigzag por el que baja la cola
    for (let y = 84; y < 180; y++) for (let x = 0; x < 320; x++) { const top = 84 + Math.abs(x - 150) * 0.12; if (y < top) continue; const q = h(x, y, 871); R.pset(x, y, c(q < 0.03 ? 'r3' : q < 0.05 ? 'pie' : y < top + 1 ? 'r0' : (x + y) % 9 === 0 ? 'a2' : 'a1')); }
    for (const [xa, ya, xb, yb] of [[0, 128, 96, 112], [96, 112, 30, 100], [30, 100, 104, 92]]) for (let i = 0; i <= 80; i++) { const x = Math.round(xa + (xb - xa) * i / 80), y = Math.round(ya + (yb - ya) * i / 80); R.rect(x, y, x, y + 2, c('asfaltoL')); R.pset(x, y + 3, c('r3')); }
    // el muro de contención de piedra labrada (moderno), a los lados de la boca
    for (let y = 104; y <= 152; y++) for (let x = 90; x <= 210; x++) { if (x > 116 && x < 184 && y > 92) continue; const fila = Math.floor((y - 104) / 6), bx = (x + fila * 7) % 14; R.pset(x, y, c(y === 104 ? 'pie' : (y - 104) % 6 === 5 || bx === 0 ? 'r3' : h(x >> 2, fila, 872) < 0.3 ? 'r2' : 'r1')); }
    // LA BOCA: el marco de piedra tallada, el hueco oscuro, la rampa que baja con sus escalones y la luz de dentro
    { const [x0, y0, x1, y1] = [120, 92, 180, 152]; R.rect(x0 - 4, y0 - 6, x1 + 4, y0 - 1, c('r2')); R.rect(x0 - 4, y0 - 6, x1 + 4, y0 - 6, c('pie')); R.rect(x0 - 4, y0, x0 - 1, y1, c('r1')); R.rect(x1 + 1, y0, x1 + 4, y1, c('r3'));
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = (y - y0) / (y1 - y0); R.pset(x, y, y > 124 ? c((y - 124) % 5 === 0 ? 'r0' : (y - 124) % 5 < 2 ? 'r2' : 'r3') : a_mez(c('hueco'), a_c('#e8c070', luz), Math.max(0, 0.25 - Math.abs(x - 150) / 120) * (1 - d))); }
      for (let y = 124; y <= y1; y++) { R.pset(x0, y, c('az')); R.pset(x1, y, c('azS')); }
      for (const lx of [136, 164]) R.rect(lx, 98, lx + 1, 100, a_c('#fff0b0', luz)); }
    // la caseta del guarda (blanca, puerta verde, ventanilla, aire acondicionado), con su silla y el vaso de té
    { const x0 = 26, x1 = 66, y0 = 104, y1 = 150; R.rect(x0, y0, x1, y1, a_c('#f0ece0')); R.rect(x0, y0 - 4, x1 + 3, y0 - 1, a_c('#c8c0b0')); R.rect(x0, y0 - 4, x1 + 3, y0 - 4, c('pie')); R.rect(x1 - 4, y0, x1, y1, a_c('#d4ccbc'));
      R.rect(x0 + 4, y0 + 14, x0 + 14, y1, c('verde')); R.rect(x0 + 5, y0 + 15, x0 + 13, y0 + 20, a_c('#3a5a3a')); R.pset(x0 + 12, y0 + 30, c('oro'));
      R.rect(x0 + 19, y0 + 10, x0 + 34, y0 + 22, a_c('#3a4a5a')); R.rect(x0 + 19, y0 + 10, x0 + 34, y0 + 10, a_c('#8aa0b0')); R.rect(x0 + 18, y0 + 23, x0 + 35, y0 + 24, c('r3'));
      R.rect(x0 + 22, y0 + 1, x0 + 32, y0 + 7, a_c('#e0dcd0')); for (let x = x0 + 23; x < x0 + 32; x += 2) R.rect(x, y0 + 3, x, y0 + 6, a_c('#a8a498'));
      R.linea(x1 + 4, y1, x1 + 10, y1 - 10, c('hierro')); R.rect(x1 + 2, y1 - 10, x1 + 12, y1 - 9, c('verde')); R.rect(x1 + 8, y1 - 18, x1 + 12, y1 - 10, c('verde')); }
    // el banco de piedra y el letrero (solo rayas y el pictograma de la cámara tachada)
    R.rect(214, 144, 252, 147, c('r1')); R.rect(214, 144, 252, 144, c('pie')); R.rect(218, 148, 222, 152, c('r3')); R.rect(244, 148, 248, 152, c('r3'));
    { const sx = 76, sy = 98; R.rect(sx + 10, sy + 24, sx + 11, 152, c('hierro')); R.rect(sx, sy, sx + 22, sy + 24, a_c('#6a4a2a')); R.rect(sx + 1, sy + 1, sx + 21, sy + 23, a_c('#f4ecd8'));
      for (let k = 0; k < 4; k++) R.rect(sx + 3, sy + 3 + k * 3, sx + 3 + 14 - k * 2, sy + 3 + k * 3, a_c('#3a3a44'));
      R.rect(sx + 6, sy + 15, sx + 14, sy + 20, a_c('#2a2a34')); R.rect(sx + 8, sy + 14, sx + 10, sy + 14, a_c('#2a2a34')); R.pset(sx + 10, sy + 17, a_c('#f4ecd8'));
      for (let a = 0; a < 6.28; a += 0.2) R.pset(Math.round(sx + 10 + Math.cos(a) * 6), Math.round(sy + 17 + Math.sin(a) * 5), c('rojo')); R.linea(sx + 5, sy + 13, sx + 15, sy + 21, c('rojo')); }
    a_arena(R, 152, 179, 11); for (let x = 0; x < 320; x++) R.pset(x, 152, c('a3'));
    for (let y = 153; y < 180; y++) for (let x = 100; x < 200; x++) if (Math.abs(x - 150) < 30 + (y - 152)) { const f = Math.floor((y - 152) / 7), jx = (x + f * 9) % 18; R.pset(x, y, c((y - 152) % 7 === 0 || jx === 0 ? 'r3' : h(Math.floor((x + f * 9) / 18), f, 873) < 0.3 ? 'r2' : 'r1')); }   // el enlosado de delante
  }, { hor: 70, sol: [230, 22, 5] });
  R.copiar(capa.buf);
  a_cieloVivo(R, t, capa, luz, { y0: 6, y1: 26, nubes: [[0, 18, 14, 1.0], [130, 24, 12, 1.8]] });
  if (luz !== 'noche') halcon(R, t, 200, 30, 20);
  // el toldo de lona sobre la boca, con su sombra, y los palos de metal; ondea el faldón
  { for (let x = 104; x <= 196; x++) { const yb = 82 + Math.round(Math.sin(t * 3 + x * 0.2) * 0.8); for (let y = 72; y <= yb; y++) R.pset(x, y, c(y === 72 ? 'lona' : y >= yb - 1 ? 'lonaS' : 'lona')); if (x % 6 === 0) R.pset(x, yb + 1, c('lonaS')); }
    for (const px of [106, 194]) R.rect(px, 83, px + 1, 152, c('hierro')); for (let y = 84; y < 92; y++) for (let x = 108; x < 194; x++) if (a_umb(x, y) < 0.5) R.pset(x, y, a_mez(R.pget(x, y), hex('#4a3a50'), 0.3)); }
  // LA COLA de pequeños: baja por el sendero en zigzag desde el valle (o.cola 0–1: lo larga que es); avanzan a ratos
  const tramos = [[0, 128, 96, 112], [96, 112, 30, 100], [30, 100, 104, 92]], n = Math.round(cola * 26), av = Math.floor(t / 2.5) * 0.6;
  for (let k = 0; k < n; k++) { const s = (k * 6 + av) % 240, tr = tramos[Math.min(2, Math.floor(s / 80))], u = (s % 80) / 80; a_turistita(R, tr[0] + (tr[2] - tr[0]) * u, Math.round(tr[1] + (tr[3] - tr[1]) * u) + 1, t, k, luz); }
  // a la derecha: el quiosco de agua con su sombrilla, un grupo con su guía y la bandera, las cuerdas de paso
  { const kx = 268, kb = 150; R.rect(kx - 12, kb - 14, kx + 12, kb, a_c('#3a7ac8', luz)); R.rect(kx - 12, kb - 14, kx + 12, kb - 13, a_c('#7ab0e8', luz)); for (let i = 0; i < 4; i++) R.rect(kx - 9 + i * 5, kb - 10, kx - 7 + i * 5, kb - 5, a_c('#a8d8f0', luz));
    R.rect(kx, kb - 36, kx, kb - 14, c('hierro')); for (let i = -16; i <= 16; i++) { const yy = kb - 36 + Math.round(Math.abs(i) * 0.3); R.pset(kx + i, yy, c(Math.floor((i + 16) / 4) % 2 ? 'lona' : 'rojo')); R.pset(kx + i, yy + 1, c(Math.floor((i + 16) / 4) % 2 ? 'lonaS' : 'r4')); } }
  for (let k = 0; k < 6; k++) a_turistita(R, 222 + k * 6 + Math.round(Math.sin(t * 0.7 + k) * 1), 128 + (k % 2) * 3, t, k + 3, luz);
  { const gx = 216, ond = Math.floor(t * 4) % 2; R.rect(gx, 112, gx, 131, c('hierro')); R.rect(gx + 1, 112 + ond, gx + 6, 115 + ond, a_c('#e8b030', luz)); a_turistita(R, gx - 3, 131, t, 9, luz); }
  for (let x = 206; x <= 300; x += 24) { R.rect(x, 140, x + 1, 151, c('hierro')); R.pset(x, 140, c('hierroL')); if (x + 24 <= 300) for (let i = 0; i <= 24; i++) R.pset(x + i, 143 + Math.round(Math.sin(i / 24 * Math.PI) * 3), a_c('#c83a3a', luz)); }
  // un gato que dormita a la sombra de la caseta y mueve la cola
  { const gx = 70, gy = 150, col = Math.round(Math.sin(t * 1.4) * 2); R.rect(gx, gy - 3, gx + 7, gy, a_c('#c87a3a', luz)); R.rect(gx + 6, gy - 5, gx + 9, gy - 2, a_c('#c87a3a', luz)); R.pset(gx + 6, gy - 6, a_c('#c87a3a', luz)); R.pset(gx + 9, gy - 6, a_c('#c87a3a', luz)); R.pset(gx + 8, gy - 4, a_c('#2a2a34', luz)); for (let i = 0; i < 4; i++) R.pset(gx - 1 - i, gy - 1 - Math.round(col * i / 4), a_c('#a85a2a', luz)); }
  // la luz de la ventanilla del guarda (la tele que cambia), y el aire acondicionado que gotea
  R.rect(46, 115, 59, 125, a_c(['#4a6a8a', '#6a8a6a', '#8a6a5a'][Math.floor(t / 1.7) % 3], luz)); { const g = (t * 1.3) % 1; R.pset(53, 112 + Math.round(g * 38), a_c('#9ad0e8', luz)); }
  return { suelo: 152, libre: [20, 300], boca: [120, 92, 180, 152], caseta: [26, 104, 66, 150], cola: [0, 128, 104, 92] };
}

// lo de delante en la entrada: la barandilla de metal de la rampa (delante de quien esté a la boca)
function a_entradaDelante(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz);
  for (const [x0, x1] of [[100, 120], [180, 200]]) { R.rect(x0, 138, x1, 139, c('hierroL')); R.rect(x0, 145, x1, 145, c('hierro')); for (let x = x0; x <= x1; x += 10) R.rect(x, 138, x + 1, 156, c('hierro')); }
  for (let x = 100; x <= 200; x += 1) if (((x + Math.floor(t * 8)) % 31) === 0) R.pset(x, 138, hex('#ffffff'));   // el sol que corre por el tubo
  return { barandilla: [100, 138, 200, 156] };
}

function a_cola(R, t, o) {
  const luz = a_luz(o), c = (n) => a_c(n, luz), al = o.aliento ?? 0.5;
  const capa = a_capa(R, 'cola|' + luz, luz, () => {
    // la lona del toldo arriba (lisa y clara: la barra del año), su faldón y su sombra
    for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) if (y < 30 || x >= 250) R.pset(x, y, a_c(x > 250 ? '#e2d6bc' : y > 24 ? '#d4c8ac' : a_umb(x, y) < y / 60 ? '#e4dcc4' : '#ece4cc'));
    // el muro de sillares de caliza moderno, con su junta y la luz del sol que entra por debajo del toldo
    for (let y = 30; y < 150; y++) for (let x = 0; x < 250; x++) { const fila = Math.floor((y - 30) / 12), bx = (x + fila * 17) % 34, jun = (y - 30) % 12 === 11 || bx === 0, q = h(x, y, 880), sol = y > 30 + (250 - x) * 0.12 + 40;
      let v = c(jun ? 'r3' : q < 0.03 ? 'r3' : (y - 30) % 12 === 0 ? 'r0' : h(Math.floor((x + fila * 17) / 34), fila, 881) < 0.35 ? 'r2' : 'r1'); if (!sol) v = a_mez(v, hex('#5a4a68'), 0.28); R.pset(x, y, v); }
    // la boca de la tumba a la derecha: el marco, la reja abierta y la oscuridad con la luz de dentro
    for (let y = 50; y < 166; y++) for (let x = 250; x < 320; x++) R.pset(x, y, x < 258 ? c(x === 250 ? 'r0' : 'r2') : a_mez(c('hueco'), a_c('#e0b060', luz), Math.max(0, 0.18 - Math.abs(y - 120) / 400) * (x - 258) / 62));
    for (let y = 64; y < 166; y += 6) R.rect(258, y, 266, y, c('hierro')); R.rect(258, 64, 259, 166, c('hierroL')); R.rect(266, 64, 266, 166, c('hierro'));
    // el letrero de la cámara tachada, el termómetro de la pared con 40 y el pasamanos de metal en el muro
    { const sx = 214, sy = 46; R.rect(sx, sy, sx + 20, sy + 16, a_c('#f4ecd8')); R.rect(sx, sy, sx + 20, sy, a_c('#6a4a2a')); R.rect(sx + 5, sy + 6, sx + 13, sy + 11, a_c('#2a2a34')); R.rect(sx + 7, sy + 5, sx + 9, sy + 5, a_c('#2a2a34'));
      for (let a = 0; a < 6.28; a += 0.2) R.pset(Math.round(sx + 10 + Math.cos(a) * 7), Math.round(sy + 8 + Math.sin(a) * 6), c('rojo')); R.linea(sx + 4, sy + 3, sx + 16, sy + 13, c('rojo')); }
    { const tx = 30, ty = 44; R.rect(tx, ty, tx + 6, ty + 30, a_c('#f4f4f0')); R.rect(tx + 2, ty + 4, tx + 3, ty + 24, a_c('#c8c8c8')); R.rect(tx + 2, ty + 8, tx + 3, ty + 26, c('rojo')); R.disco(tx + 3, ty + 26, 2, c('rojo')); R.numero('40', tx + 10, ty + 12, { sombra: false, color: c('rojo') }); }
    { R.rect(176, 92, 183, 108, c('rojo')); R.rect(177, 93, 178, 107, a_c('#e86a5a')); R.rect(178, 88, 181, 91, c('negro')); R.rect(174, 108, 185, 109, c('hierro')); }   // el extintor
    R.linea(0, 40, 250, 46, c('negro')); for (let x = 20; x < 250; x += 40) R.rect(x, 40 + Math.round(x * 0.024), x + 1, 42 + Math.round(x * 0.024), c('hierro'));   // el cable de la luz
    for (let k = 0; k < 3; k++) { const bx = 96 + k * 9; R.rect(bx, 114, bx + 3, 123, a_c('#a8d8f0')); R.rect(bx + 1, 112, bx + 2, 113, a_c('#3a8ac8')); R.pset(bx + 1, 116, hex('#ffffff')); }   // botellas de agua en el poyete
    R.rect(80, 124, 140, 125, c('r0')); R.rect(80, 126, 140, 126, c('r3'));
    for (let y = 70; y < 166; y += 7) R.rect(270, y, 300 - Math.round((166 - y) * 0.12), y + 1, a_c('#3a2a20'));   // los escalones de dentro, que bajan
    for (let x = 0; x < 250; x++) { R.pset(x, 128, c('hierroL')); R.pset(x, 129, c('hierro')); } for (let x = 10; x < 250; x += 48) { R.rect(x, 126, x + 3, 131, c('hierro')); }
    // el suelo de losas, en sombra al pie del muro
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const w = 22, bx = Math.floor((x + (Math.floor((y - 150) / 10) % 2) * 11) / w); R.pset(x, y, c((y - 150) % 10 === 0 || (x + (Math.floor((y - 150) / 10) % 2) * 11) % w === 0 ? 'r3' : h(bx, y >> 3, 882) < 0.3 ? 'r2' : y < 156 ? 'az' : 'r1')); }
  }, { hor: 0 });
  R.copiar(capa.buf);
  // la cámara de vigilancia con su piloto, una mosca y el borde del toldo que ondea
  { R.rect(232, 32, 240, 37, a_c('#e0e0e0', luz)); R.rect(238, 34, 241, 36, a_c('#3a3a44', luz)); if (Math.floor(t * 1.5) % 2) R.pset(233, 33, c('rojo')); }
  for (let x = 0; x < 250; x++) R.pset(x, 30 + Math.round(Math.sin(t * 3 + x * 0.15) * 0.8), c('lonaS'));
  { const a = t * 1.4; R.pset(Math.round(150 + Math.cos(a) * 30), Math.round(110 + Math.sin(a * 1.7) * 10), a_c('#1a1a22', luz)); }
  // EL ALIENTO de la cola (o.aliento 0–1): nubecillas blancas que salen a la altura de las bocas, se juntan y la boca
  // de la tumba se las traga (entran y se deshacen en la oscuridad)
  const n = Math.round(al * 16);
  for (let k = 0; k < n; k++) { const f = (t * 0.22 + k / n) % 1, x0 = 50 + (k % 6) * 36, x = Math.round(lerp(x0, 300, f * f)), y = Math.round(lerp(141, 112, f) + Math.sin(t * 2 + k) * 3), r = 1.5 + f * 4;
    if (f < 0.08 || x > 296) continue; const dentro = x > 262;
    for (const [dx, dy, rr, cc] of [[0, 1, r, '#c8d4e0'], [-r * 0.7, 0, r * 0.7, '#e4ecf4'], [r * 0.6, -0.5, r * 0.75, '#e4ecf4'], [0, -0.5, r * 0.8, '#f4f8fc'], [-0.5, -1.2, r * 0.45, '#ffffff']])
      R.disco(Math.round(x + dx), Math.round(y + dy), rr, dentro ? a_mez(hex(cc), c('hueco'), Math.min(0.9, (x - 262) / 36)) : hex(cc)); }
  return { suelo: 166, libre: [20, 250], cola: [30, 250], boca: [258, 50, 319, 166] };
}

// una palmera pequeña de la calle (se ve por la puerta): el tronco anillado y las hojas que se mecen
function a_palmera(R, x, suelo, t) {
  const m = Math.round(Math.sin(t * 1.2 + x) * 1.2);
  for (let j = 0; j < 30; j++) { const xx = Math.round(x + Math.sin(j / 30 * 1.6) * 3 + (j > 22 ? m * (j - 22) / 8 : 0)); R.rect(xx - 1, suelo - j, xx + 1, suelo - j, a_c(j % 3 ? '#8a6a44' : '#6a4e30')); }
  const cx = Math.round(x + 3 + m), cy = suelo - 30;
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.55 + Math.sin(t * 1.4 + k) * 0.06, L = 11 + (k % 2) * 3;
    for (let i = 0; i <= L; i++) { const px = Math.round(cx + Math.cos(a) * i), py = Math.round(cy + Math.sin(a) * i + i * i / (L * 2.2)); R.pset(px, py, a_c(k % 2 ? '#4a8a3a' : '#5aa046')); R.pset(px, py + 1, a_c('#2e5e2a')); } }
}

const A_VISTAS = {
  'valle|general': a_valleGen, 'valle|arena': a_valleArena, 'tienda|general': a_tienda, 'tienda|mesa': a_mesaArriba, 'chozas|general': a_chozas, 'chozas|escalon': a_escalon, 'escalera|general': a_escalera, 'escalera|sellos': a_sellos, 'telegrafo|general': a_telegrafo, 'telegrafo|cinta': a_cintaCerca, 'entrada|general': a_entrada, 'entrada|cola': a_cola,
};

const A_DELANTE = {
  'valle|general': a_valleGenDelante, 'tienda|general': a_tiendaDelante, 'chozas|general': a_chozasDelante, 'telegrafo|general': a_telegrafoDelante, 'entrada|general': a_entradaDelante,
};

// la capa fija de cada vista: se pinta una sola vez en un búfer y en cada fotograma se copia entera (una pasada)
const b_capas = new Map();

function b_capa(R, clave, dibuja) {
  let b = b_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); b_capas.set(clave, b); }
  R.copiar(b);
}

// el tramado ordenado 4 × 4 (umbral 0–1) y una rampa tramada: v entre 0 y rampa.length − 1
const B_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_d = (x, y) => B_BAYER[(y & 3) * 4 + (x & 3)];

const b_tono = (rp, v, x, y) => { const i = Math.floor(v) + (v - Math.floor(v) > b_d(x, y) ? 1 : 0); return rp[i < 0 ? 0 : i >= rp.length ? rp.length - 1 : i]; };

const b_rp = (...cs) => cs.map(hex);

// mezcla dos colores: a = 0 deja c, a = 1 da d
const b_mez = (c, d, a) => { const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0; };

// tiñe un rectángulo hacia un color (con paso 2, solo la mitad de los píxeles, tramado)
function b_velo(R, x0, y0, x1, y1, col, a, paso = 1) {
  for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) if (paso === 1 || (x + y) % paso === 0) R.pset(x, y, b_mez(R.pget(x, y), col, a));
}

// un polígono relleno con su contorno (los pictogramas de las pinturas y el ajuar)
function b_poli(R, pts, c, borde) { R.poligono(pts, c); if (borde != null) for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; R.linea(a[0], a[1], b[0], b[1], borde); } }

// LA LUZ de la vista, en una sola pasada por toda la pantalla: cada píxel va hacia la noche azul según lo lejos que esté
// de las luces (fuentes: [x, y, radio, fuerza, achatado]) y toma el tinte de la luz (cálido la llama, blanco la
// bombilla); los niveles van en sextos tramados, al estilo pixel. amb: la luz que queda en lo más oscuro.
const B_NOCHE = [14, 16, 32];

function b_luz(R, fuentes, amb, tinte) {
  const B = R.usar(null), n = fuentes.length;
  R.usar(B);
  const [tr, tg, tb] = tinte, [nr, ng, nb] = B_NOCHE;
  for (let y = 0; y < 180; y++) {
    const fila = y * 320;
    for (let x = 0; x < 320; x++) {
      let L = amb;
      for (let i = 0; i < n; i++) { const f = fuentes[i], dx = (x - f[0]) / f[2], dy = (y - f[1]) / (f[2] * (f[4] || 0.8)), d2 = dx * dx + dy * dy; if (d2 < 1) L += f[3] * (1 - d2) * (1 - d2 * 0.5); }
      const v = L * 6, fl = Math.floor(v), q = Math.min(7, fl + (v - fl > 0.5 + (B_BAYER[(y & 3) * 4 + (x & 3)] - 0.5) * 0.36 ? 1 : 0)) / 6;
      const p = B[fila + x], r = p & 255, g = (p >> 8) & 255, b = (p >> 16) & 255;
      // cuanto más luz, más tinte (lo de lejos se queda azul; lo de cerca, del color de la llama)
      const w = q > 1 ? 1 : q, cr = r * (1 + (tr - 1) * w), cg = g * (1 + (tg - 1) * w), cb = b * (1 + (tb - 1) * w);
      const rr = nr + (cr - nr) * q, gg = ng + (cg - ng) * q, bb = nb + (cb - nb) * q;
      B[fila + x] = (0xff000000 | ((bb > 255 ? 255 : bb < 0 ? 0 : bb) << 16) | ((gg > 255 ? 255 : gg < 0 ? 0 : gg) << 8) | (rr > 255 ? 255 : rr < 0 ? 0 : rr)) >>> 0;
    }
  }
}

// el temblor de una llama (para el radio de su luz y la sombra que baila)
const b_tiembla = (t, k = 0) => 1 + 0.05 * Math.sin(t * 13.1 + k) + 0.035 * Math.sin(t * 29.7 + k * 2) + 0.02 * Math.sin(t * 7.3 + k * 3);

// una llama pequeña (3–5 px) que tiembla, con su punta que se dobla (dobla: px hacia un lado) y su halo
function b_llama(R, x, y, t, k = 0, s = 1, dobla = 0) {
  const a = Math.round(Math.sin(t * 11 + k) * 0.8 + dobla), alto = Math.round((5 + Math.sin(t * 17 + k * 2)) * s);
  R.halo(x, y - alto / 2, 7 * s + 2, [hex('#5a3410'), hex('#9a6020'), hex('#e0a040')], 0.9);
  for (let j = 0; j < alto; j++) { const u = j / alto, w = Math.max(0, Math.round((1 - u) * 1.6 * s - 0.2)), cx = x + Math.round(a * u * u);
    for (let i = -w; i <= w; i++) R.pset(cx + i, y - j, u < 0.25 ? hex('#ffe9a0') : Math.abs(i) < w || w === 0 ? (u < 0.6 ? C.velaL : C.vela) : hex('#f08a28')); }
  R.pset(x, y + 1, hex('#3a2a20'));
}

// las motas de polvo que flotan dentro de la luz (lentas, suben y bajan)
function b_motas(R, t, x0, y0, x1, y1, n, col, k = 0) {
  for (let i = 0; i < n; i++) { const x = x0 + ((h(i, 1, k) * (x1 - x0) + t * (2 + h(i, 2, k) * 3)) % (x1 - x0)), y = y0 + ((h(i, 3, k) * (y1 - y0) + Math.sin(t * 0.7 + i) * 6 - t * 1.5 + 400) % (y1 - y0));
    if (Math.sin(t * 2 + i * 1.7) > -0.3) R.pset(Math.round(x), Math.round(y), col); }
}

// ROCA TALLADA: caliza picada a cincel (bloques de golpes, vetas, marcas de cincel en diagonal con su filo claro,
// grietas y lascas), en la rampa rp; luz de arriba (lu: cuánto aclara hacia arriba)
function b_roca(R, x0, y0, x1, y1, rp, k = 0, lu = 0.8) {
  const n = rp.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const g = h(x >> 3, y >> 3, k) * 0.9 + h((x + (y >> 3)) >> 1, y >> 1, k + 1) * 0.55 + h(x, y, k + 2) * 0.3;
    const veta = Math.abs(Math.sin(y * 0.19 + Math.sin(x * 0.031 + k) * 2.2)) < 0.07 ? -0.7 : 0;
    R.pset(x, y, b_tono(rp, n * 0.22 + g * 1.5 + veta + (1 - (y - y0) / Math.max(1, y1 - y0)) * lu, x, y));
  }
  // las marcas del cincel: tajos cortos en diagonal, en grupos, con el filo de luz debajo
  for (let i = 0; i < Math.round((x1 - x0) * (y1 - y0) / 60); i++) { const x = Math.round(x0 + h(i, 4, k) * (x1 - x0)), y = Math.round(y0 + h(i, 5, k) * (y1 - y0)), l = 2 + Math.floor(h(i, 6, k) * 3);
    for (let j = 0; j < l; j++) { if (x + j > x1 || y + j > y1) break; R.pset(x + j, y + j, rp[1]); if (y + j + 1 <= y1) R.pset(x + j, y + j + 1, rp[Math.min(n, n - 1)]); } }
  // las grietas finas y algunas lascas claras
  for (let i = 0; i < Math.round((x1 - x0) * (y1 - y0) / 1800); i++) { let x = x0 + h(i, 7, k) * (x1 - x0), y = y0 + h(i, 8, k) * (y1 - y0);
    for (let j = 0; j < 9 + h(i, 9, k) * 10; j++) { R.pset(Math.round(x), Math.round(y), rp[0]); x += h(i, j, k + 5) - 0.4; y += 0.9; if (y > y1 || x > x1) break; }
    R.pset(Math.round(x0 + h(i, 10, k) * (x1 - x0)), Math.round(y0 + h(i, 11, k) * (y1 - y0)), rp[n]); }
}

// un montón de cascotes de caliza (piedras de varios tamaños con su luz arriba y su sombra)
function b_cascotes(R, x0, x1, base, alto, rp, k = 0) {
  const n = rp.length - 1, cx = (x0 + x1) / 2, w = (x1 - x0) / 2;
  for (let i = 0; i < Math.round((x1 - x0) * alto / 14); i++) {
    const u = h(i, 1, k) * 2 - 1, techo = alto * (1 - u * u), y = base - h(i, 2, k) * techo, x = cx + u * w, r = 1 + h(i, 3, k) * 2.6;
    R.disco(x, y, r + 0.6, rp[0]); R.disco(x - 0.4, y - 0.4, r, rp[Math.max(1, n - 2)]); R.pset(Math.round(x - r * 0.4), Math.round(y - r * 0.5), rp[n]);
  }
}

// suelo de roca picada en perspectiva (filas que se juntan arriba), con polvo claro y piedrecillas
function b_sueloRoca(R, y0, y1, rp, k = 0) {
  const n = rp.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    const u = (y - y0) / Math.max(1, y1 - y0), g = h(x >> 2, y >> 1, k) * 0.8 + h(x, y, k + 1) * 0.4, surco = Math.abs(Math.sin(x * 0.09 + y * 0.02)) < 0.05 ? -0.5 : 0;
    R.pset(x, y, b_tono(rp, 1 + u * 1.2 + g + surco, x, y));
  }
  for (let i = 0; i < 70; i++) { const x = Math.round(h(i, 1, k + 9) * 319), y = Math.round(y0 + 2 + h(i, 2, k + 9) * (y1 - y0 - 2)); R.pset(x, y, rp[0]); R.pset(x, y - 1, rp[n]); }
}

// la caliza tallada por dentro (de la sombra a la luz), el enlucido de las puertas y el cielo de noche
const B_ROCA = b_rp('#2e231c', '#4a3a2c', '#6a5640', '#8a7356', '#a88e6a', '#c4a880', '#dcc49a');

const B_YESO = b_rp('#6e604c', '#8c7c64', '#a8987a', '#c2b292', '#d8caa8', '#ece0c0');

// LA SEGUNDA PUERTA (canon): piedras enlucidas (se adivinan los bloques bajo el yeso), grietas, filas de sellos ovales
// (PIEZAS_TU.sello) y la cuerda vieja; en [x0, y0, x1, y1], con los sellos a escala s. hx, hy: el hueco (sin sellos ahí)
function b_puertaSellada(R, x0, y0, x1, y1, s, hx, hy, k = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const bx = Math.floor((x - x0 + (Math.floor((y - y0) / (14 * s)) % 2) * 9 * s) / (18 * s)), by = Math.floor((y - y0) / (14 * s));
    const lx = (x - x0 + (by % 2) * 9 * s) % (18 * s), ly = (y - y0) % (14 * s), junta = (lx < s || ly < s) ? -0.55 : 0;
    const bulto = (ly < 3 * s ? 0.4 : ly > 11 * s ? -0.35 : 0) + (lx < 3 * s ? 0.25 : 0);
    R.pset(x, y, b_tono(B_YESO, 2.2 + h(bx, by, k) * 0.9 + h(x >> 1, y >> 1, k + 1) * 0.6 + junta + bulto + (x - x0 < 3 * s ? -0.8 : 0) + (y1 - y < 4 * s ? -0.6 : 0), x, y));
  }
  // las grietas del enlucido
  for (let i = 0; i < 6; i++) { let x = x0 + h(i, 1, k + 4) * (x1 - x0), y = y0 + h(i, 2, k + 4) * (y1 - y0); for (let j = 0; j < 14 * s; j++) { R.pset(Math.round(x), Math.round(y), B_YESO[0]); x += (h(i, j, k + 5) - 0.5) * 1.6; y += 0.8; } }
  // las filas de sellos (el chacal sobre los nueve arcos), menos donde va el hueco
  const sw = 24 * s, sh = 19 * s;
  for (let fy = y0 + sh + 2 * s; fy <= y1 - 4 * s; fy += sh + 3 * s) for (let fx = x0 + sw / 2 + 3 * s; fx <= x1 - sw / 2; fx += sw + 2 * s) {
    if (hx != null && Math.abs(fx - hx) < sw * 0.8 && hy > fy - sh - 6 * s && hy < fy + 6 * s) continue;
    PIEZAS_TU.sello(R, Math.round(fx), Math.round(fy), { s, roto: h(fx, fy, k) > 0.85 });
  }
  // la cuerda vieja que cruzaba la puerta, cogida con sellos (cuelga en curva)
  for (let x = x0 + 4; x <= x1 - 4; x++) { const y = Math.round(y0 + (y1 - y0) * 0.36 + Math.sin((x - x0) / (x1 - x0) * Math.PI) * 5 * s); R.pset(x, y, hex('#5a4024')); if (x % 3 === 0) R.pset(x, y + 1, hex('#8a6a3c')); }
}

// el hueco de la puerta: agujero negro con borde de piedra rota y, dentro, destellos de oro (oro 0–1)
function b_hueco(R, x0, y0, x1, y1, t, oro) {
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rx = (x1 - x0) / 2, ry = (y1 - y0) / 2;
  for (let y = Math.floor(y0 - 2); y <= y1 + 2; y++) for (let x = Math.floor(x0 - 2); x <= x1 + 2; x++) {
    const d = Math.hypot((x - cx) / rx, (y - cy) / ry) + (h(x, y, 61) - 0.5) * 0.25;
    if (d < 1) R.pset(x, y, d > 0.8 ? hex('#2a1e14') : hex('#08060a')); else if (d < 1.25) R.pset(x, y, y < cy ? B_YESO[1] : B_YESO[4]);
  }
  if (oro > 0) for (let i = 0; i < 9; i++) { const x = Math.round(cx + (h(i, 1, 62) - 0.5) * rx * 1.4), y = Math.round(cy + (h(i, 2, 62) - 0.3) * ry * 1.2), b = Math.sin(t * (2 + i % 3) + i * 1.7) * 0.5 + 0.5;
    if (h(i, 3, 62) < oro) { R.pset(x, y, b > 0.6 ? C.oroL : b > 0.25 ? C.oro : C.oroS); if (b > 0.85) { R.pset(x - 1, y, C.oroS); R.pset(x + 1, y, C.oroS); } } }
}

// ─ pasillo (general): el pasillo de bajada en 1922, de noche ─
const B_VISTAS = {}, B_DELANTE = {};
B_VISTAS['pasillo.general'] = (R, t, o, geo) => {
  const { rect, pset, linea, poligono, disco } = R, suelo = 156, [px0, py0, px1, py1] = geo.puerta, abierta = o.abierta ?? 1;
  b_capa(R, 'pasillo', () => {
    // el techo de roca, bajo y en pendiente (baja hacia la puerta), y la pared de roca tallada del fondo
    b_roca(R, 0, 0, 319, 179, B_ROCA, 3, 0.4);
    for (let x = 0; x < 320; x++) { const yt = Math.round(30 + x * 0.05 + Math.sin(x * 0.13) * 2 + h(x >> 2, 0, 4) * 3); for (let y = 0; y < yt; y++) pset(x, y, b_tono(B_ROCA, 0.6 + h(x >> 1, y >> 1, 5) * 1.1 + (y > yt - 3 ? 1.4 : 0), x, y)); pset(x, yt, B_ROCA[0]); }
    // la escalera de bajada al fondo a la izquierda, con su boca al cielo de la noche
    poligono([[0, 24], [54, 24], [54, 60], [0, 60]], hex('#0e1430'));
    for (let y = 24; y < 60; y++) for (let x = 0; x < 54; x++) pset(x, y, b_tono(b_rp('#0c1028', '#121a3a', '#1a2448'), (y - 24) / 18 + h(x >> 2, y >> 2, 6) * 0.5, x, y));
    // la ladera del valle a contraluz dentro de la boca
    for (let x = 0; x < 54; x++) { const yy = Math.round(50 + Math.sin(x * 0.12) * 3 - x * 0.08); rect(x, yy, x, 59, hex('#20202e')); pset(x, yy, hex('#3a3a52')); }
    // los escalones de perfil, que suben hacia la boca (huella clara, tabica en sombra, el borde gastado)
    for (let y = 60; y < 150; y++) for (let x = 0; x < 66; x++) pset(x, y, b_tono(B_ROCA, 0.4 + h(x >> 1, y >> 1, 15) * 0.8, x, y));
    for (let i = 0; i < 15; i++) { const y = 144 - i * 6, xe = 64 - i * 4; if (xe < 2) break; rect(0, y, xe, 149 - i * 6 > 149 ? 149 : y + 5, B_ROCA[3]);
      for (let x = 0; x <= xe; x++) { pset(x, y, x === xe ? B_ROCA[4] : B_ROCA[5]); pset(x, y + 1, B_ROCA[4]); if (h(x, i, 16) > 0.85) pset(x, y + 2, B_ROCA[2]); }
      rect(xe, y, xe, y + 5, B_ROCA[1]); for (let x = 0; x < xe; x += 4 + (i % 3)) pset(x + (i * 3) % 4, y + 3, B_ROCA[2]); }
    // las jambas de la boca de la escalera y el dintel de roca
    b_roca(R, 54, 22, 66, 150, B_ROCA, 7, 1.2); linea(54, 22, 54, 150, B_ROCA[0]); linea(66, 22, 66, 150, B_ROCA[1]);
    rect(0, 20, 66, 24, B_ROCA[1]); rect(0, 20, 66, 20, B_ROCA[0]);
    // nichos y golpes de pico en la pared del fondo
    for (const [x, y] of [[96, 70], [150, 96]]) { rect(x, y, x + 14, y + 18, B_ROCA[1]); rect(x + 1, y + 1, x + 13, y + 3, B_ROCA[0]); rect(x + 1, y + 17, x + 13, y + 17, B_ROCA[4]); }
    // el suelo de roca y los montones de cascotes contra la pared
    b_sueloRoca(R, 146, 179, B_ROCA, 8);
    rect(66, 145, 200, 146, B_ROCA[1]);
    b_cascotes(R, 70, 132, 150, 14, B_ROCA, 9); b_cascotes(R, 120, 196, 150, 9, B_ROCA, 10); b_cascotes(R, 286, 326, 158, 16, B_ROCA, 11);
    // la segunda puerta (canon) con su marco de roca, el dintel de madera y su sombra
    b_roca(R, px0 - 10, py0 - 12, px1 + 10, py1, B_ROCA, 12, 0.6);
    rect(px0 - 4, py0 - 9, px1 + 4, py0 - 2, hex('#5a3c22')); rect(px0 - 4, py0 - 9, px1 + 4, py0 - 9, hex('#8a6038')); rect(px0 - 4, py0 - 2, px1 + 4, py0 - 1, hex('#2a1a10'));
    for (let x = px0; x < px1; x += 6) pset(x, py0 - 6, hex('#3a2616'));
    b_puertaSellada(R, px0, py0, px1, py1, 1, (px0 + px1) / 2 + 28 > 0 ? geo.hueco[0] : null, geo.hueco[1], 13);
    linea(px0 - 1, py0, px0 - 1, py1, B_ROCA[0]); linea(px1 + 1, py0, px1 + 1, py1, B_ROCA[0]);
    // las herramientas: un pico apoyado, una cesta de esparto con cascotes, una tabla y la cuerda enrollada
    linea(186, 148, 196, 104, hex('#6a4a2a')); linea(187, 148, 197, 104, hex('#8a6a3a')); poligono([[189, 104], [204, 100], [205, 102], [190, 107]], hex('#5a5a62')); pset(203, 101, hex('#a8a8b0'));
    for (let j = 0; j < 12; j++) { const w = 11 - Math.abs(j - 7) * 0.5; for (let i = -w; i <= w; i++) pset(Math.round(84 + i), 146 - j, (Math.round(i) + j) % 3 === 0 ? hex('#7a5a30') : (j % 2 ? hex('#b08a50') : hex('#9a7440'))); }
    R.anillo(84, 133, 9, hex('#6a4a24')); b_cascotes(R, 76, 92, 136, 4, B_ROCA, 14);
    poligono([[112, 146], [118, 146], [146, 96], [140, 96]], hex('#8a6438')); linea(118, 146, 146, 96, hex('#5a3e22')); linea(112, 146, 140, 96, hex('#b08a58'));
    for (let a = 0; a < 3; a++) R.anillo(176, 152 - a, 6 - a, a % 2 ? hex('#a08050') : hex('#7a5a30'));
  });
  // el cielo de la boca: estrellas que titilan (recortadas a la boca)
  R.recorte([0, 25, 53, 49]);
  for (let i = 0; i < 16; i++) { const x = Math.round(h(i, 1, 70) * 53), y = Math.round(26 + h(i, 2, 70) * 22), b = Math.sin(t * (1.5 + i % 4) + i * 2); if (b > -0.3) pset(x, y, b > 0.6 ? hex('#f4f0d8') : hex('#8a8cc0')); }
  // una estrella fugaz de vez en cuando
  { const u = (t % 9) / 0.6; if (u < 1) for (let i = 0; i < 6; i++) pset(Math.round(8 + u * 40 - i), Math.round(28 + u * 10 - i * 0.25), i < 2 ? C.blanco : hex('#8a8cc0')); }
  R.recorte(null);
  // el hueco de la puerta (con o.abierta lo que esté abierto)
  if (abierta > 0) { const [hx, hy] = geo.hueco, w = 3 + abierta * 6, hh = 2 + abierta * 4; b_hueco(R, hx - w, hy - hh, hx + w, hy + hh, t, o.oro ?? 1); }
  // la arenilla que cae de vez en cuando del techo y de los montones
  for (let i = 0; i < 3; i++) { const x = [104, 160, 300][i], f = ((t * 0.6 + i * 0.37) % 1) * 3; if (f < 1) for (let j = 0; j < 3; j++) pset(x + (j % 2), Math.round(34 + f * (110) - j * 3), B_ROCA[5]); }
  // la hija de Carnarvon y un ayudante, siluetas que esperan en la escalera (se balancean un poco)
  if (o.siluetas !== false) for (const [x, y, a, k] of [[22, 84, 14, 0], [40, 108, 12, 1]]) { const b = Math.round(Math.sin(t * 1.3 + k * 2) * 0.6), col = hex('#1a1418');
    disco(x + b, y - a + 2, 2.6, col); rect(x - 3 + b, y - a + 5, x + 3 + b, y - 3, col); rect(x - 2, y - 3, x - 1, y, col); rect(x + 1, y - 3, x + 2, y, col); if (k === 0) rect(x - 4 + b, y - a + 1, x + 4 + b, y - a + 1, col); }
  // un murciélago (simpático) que sale de la boca y vuelve
  if (o.murcielago) { const u = (t % 14) / 14, x = Math.round(30 + Math.sin(u * Math.PI * 2) * 40 + u * 30), y = Math.round(70 + Math.sin(u * Math.PI * 4) * 14); if (u < 0.55) PIEZAS_TU.murcielago(R, x, y, { alas: Math.sin(t * 16) > 0 ? 1 : 0 }); }
  // la luz: la vela de Carter (o.llama [x, y]) y el farol del suelo (tumbaDelante), que tiemblan; un poco de luna por la boca
  const [lx, ly] = o.llama ?? [214, 126], vela = o.vela ?? 1, f = b_tiembla(t), g = b_tiembla(t, 3);
  b_luz(R, [[lx, ly, 96 * f, 0.75 * vela, 0.8], [118, 166, 150 * g, 0.72, 0.55], [26, 40, 60, 0.25, 1.2]], 0.27, [1.12, 0.92, 0.66]);
  // lo que brilla por sí mismo: las estrellas, el oro del hueco y las motas en la luz de la vela
  b_motas(R, t, lx - 50, ly - 60, lx + 40, ly + 10, 14, hex('#e8c890'), 1);
  if (abierta > 0 && (o.oro ?? 1) > 0) { const [hx, hy] = geo.hueco; for (let i = 0; i < 3; i++) { const b = Math.sin(t * 3 + i * 2); if (b > 0.5) pset(hx - 3 + i * 3, hy + (i % 2), C.oroL); } }
  return { llama: [lx, ly] };
};

// el ocre de la pared (de la sombra a la luz), la piel de los pictogramas y los colores de la cenefa
const B_OCRE = b_rp('#7a4c1c', '#9a6626', '#b07a2c', '#c89038', '#e0a848', '#ecbc60', '#f4cc78');

const B_PIC = { k: hex('#3a1c0c'), piel: hex('#a8502c'), pielL: hex('#c06a3c'), mujer: hex('#f0c070'), blanco: hex('#f6f0dc'), blancoS: hex('#cfc4a4'),
  azul: hex('#2c4ca8'), azulL: hex('#6a90e0'), rojo: hex('#b8382a'), verde: hex('#3a8a5a'), negro: hex('#1c1410'), oro: hex('#f0c040'), oroS: hex('#b07a18') };

// una figura de las pinturas (pictograma NUESTRO de perfil, sin cara: solo la silueta): tipo 'faraon' (corona azul,
// faldellín blanco), 'diosa' (vestido rojo, peluca negra y el disco entre cuernos), 'chacal' (el dios con cabeza de
// chacal y su cetro) o 'pareja' (la diosa vuelta hacia el faraón, abrazada). P(u, v): de las unidades de la pared a la
// pantalla; (cx, base): los pies; d: 1 mira a la derecha
function b_figura(R, P, cx, base, tipo, d) {
  const Q = (pts) => pts.map(([lx, ly]) => P(cx + lx * d, base - ly)), K = B_PIC.k;
  const poli = (pts, c) => b_poli(R, Q(pts), c, K);
  const ln = (a, b, c) => { const [x0, y0] = P(cx + a[0] * d, base - a[1]), [x1, y1] = P(cx + b[0] * d, base - b[1]); R.linea(x0, y0, x1, y1, c); };
  const varon = tipo !== 'diosa';
  if (varon) {
    const piel = tipo === 'chacal' ? B_PIC.pielL : B_PIC.piel;
    poli([[-6, 0], [-2, 0], [-2, 30], [-6, 30]], piel); poli([[3, 0], [7, 0], [5, 30], [1, 30]], piel);
    poli([[-7, 0], [0, 0], [0, 2], [-6, 2]], piel); poli([[2, 0], [10, 0], [9, 2], [2, 2]], piel);
    poli([[-9, 62], [-6, 62], [-6, 36], [-9, 36]], piel);
    poli([[-8, 28], [9, 28], [7, 45], [-6, 45]], B_PIC.blanco); for (let i = -4; i < 8; i += 3) ln([i, 30], [i - 2, 43], B_PIC.blancoS);
    poli([[1, 28], [5, 28], [4, 41], [2, 41]], B_PIC.oro);
    poli([[-6, 44], [7, 44], [7, 47], [-6, 47]], B_PIC.oro);
    poli([[-6, 47], [6, 47], [9, 62], [-9, 62]], piel);
    for (const [y, c] of [[58, B_PIC.azul], [59, B_PIC.oro], [60, B_PIC.rojo], [61, B_PIC.azul], [62, B_PIC.oro]]) ln([-8, y], [8, y], c);
    poli([[6, 60], [9, 62], [17, 55], [15, 52]], piel); poli([[15, 52], [17, 55], [18, 64], [16, 65]], piel);
    poli([[-2, 62], [2, 62], [2, 66], [-2, 66]], piel);
    if (tipo === 'chacal') {
      poli([[-4, 64], [3, 64], [11, 70], [12, 73], [4, 74], [5, 84], [2, 81], [0, 76], [-2, 84], [-4, 79], [-5, 70]], B_PIC.negro);
      ln([4, 73], [10, 72], B_PIC.oroS);
      // el cetro: el palo largo con la horquilla abajo y la cabeza torcida arriba
      ln([19, 0], [19, 70], B_PIC.oroS); ln([20, 0], [20, 70], B_PIC.oro); ln([19, 70], [23, 73], B_PIC.oro); ln([18, 0], [17, -2], B_PIC.oroS); ln([20, 0], [22, -2], B_PIC.oroS);
    } else {
      poli([[-5, 66], [6, 66], [7, 71], [5, 75], [-4, 75], [-5, 70]], piel);
      poli([[-6, 68], [-7, 76], [-3, 85], [5, 84], [8, 77], [6, 70], [2, 68]], B_PIC.azul);
      for (const [a, b] of [[-3, 74], [0, 79], [3, 74], [-1, 71], [4, 80]]) { const [x, y] = P(cx + a * d, base - b); R.pset(x, y, B_PIC.azulL); }
      poli([[7, 75], [9, 76], [9, 79], [7, 78]], B_PIC.oro);
    }
  }
  if (tipo === 'diosa' || tipo === 'pareja') {
    const dx = tipo === 'pareja' ? 13 : 0, e = tipo === 'pareja' ? -1 : 1, Z = (pts) => pts.map(([a, b]) => [dx + a * e, b]);
    poli(Z([[-5, 0], [5, 0], [5, 50], [-6, 50]]), B_PIC.rojo); ln([dx - 5 * e, 22], [dx + 5 * e, 22], B_PIC.blanco);
    poli(Z([[-5, 0], [4, 0], [4, 2], [-5, 2]]), B_PIC.mujer);
    poli(Z([[-5, 50], [5, 50], [6, 62], [-6, 62]]), B_PIC.mujer);
    for (const [y, c] of [[58, B_PIC.verde], [59, B_PIC.oro], [60, B_PIC.azul], [61, B_PIC.oro]]) ln([dx - 6 * e, y], [dx + 6 * e, y], c);
    poli(Z([[5, 60], [8, 61], [14, 50], [12, 48]]), B_PIC.mujer);
    poli(Z([[-2, 62], [2, 62], [2, 66], [-2, 66]]), B_PIC.mujer);
    poli(Z([[-6, 60], [-7, 72], [-2, 77], [5, 75], [6, 68], [4, 64], [2, 60]]), B_PIC.negro);
    if (tipo === 'diosa') {
      poli([[-6, 77], [-4, 79], [-2, 78], [2, 78], [4, 79], [6, 77], [5, 82], [3, 80], [-3, 80], [-5, 82]], B_PIC.negro);
      poli([[-4, 80], [4, 80], [5, 84], [3, 88], [-3, 88], [-5, 84]], B_PIC.rojo);
      // el ankh que ofrece (un signo, no una letra)
      ln([14, 46], [14, 38], B_PIC.azul); ln([12, 44], [16, 44], B_PIC.azul); const [ax, ay] = P(cx + 14 * d, base - 49); R.anillo(ax, ay, 2, B_PIC.azul);
    } else {
      // el brazo del faraón que rodea la espalda de la diosa
      poli([[7, 58], [10, 60], [19, 58], [18, 55]], B_PIC.piel);
    }
  }
}

// un babuino sentado de las pinturas de la pared oeste (pictograma chibi, de perfil y sin cara): el lomo curvo gris
// verdoso, la melena clara, el hocico, la cola enroscada y los brazos levantados (adoran al sol); (x, y): la base
function b_babuino(R, x, y) {
  const K = B_PIC.k, gr = hex('#6a7258'), grL = hex('#a4ac84'), grS = hex('#454a3a');
  b_poli(R, [[x - 5, y], [x + 3, y], [x + 4, y - 4], [x + 2, y - 8], [x - 2, y - 9], [x - 5, y - 6]], gr, K);
  R.linea(x - 4, y - 6, x - 1, y - 8, grL); R.pset(x - 3, y - 3, grS); R.pset(x - 2, y - 2, grS);
  R.disco(x + 2.5, y - 9.5, 2.6, grL); R.anillo(x + 2.5, y - 9.5, 2.8, K);
  b_poli(R, [[x + 4, y - 11], [x + 8, y - 10], [x + 8, y - 8], [x + 4, y - 8]], gr, K);
  R.linea(x + 4, y - 5, x + 8, y - 13, K); R.linea(x + 3, y - 5, x + 7, y - 13, grS);
  R.pset(x - 6, y - 1, K); R.pset(x - 7, y - 2, K); R.pset(x - 7, y - 3, K); R.pset(x - 6, y - 4, K);
}

// LA PARED NORTE (canon: x 24–270, y 26–148, en las unidades de la pared) pintada en el rectángulo [X0, Y0, X1, Y1]: el
// ocre con su estuco, las manchitas marrones del tiempo, la cenefa de rayas de colores arriba, el zócalo marrón, las
// columnas de signos que no se leen (rayas y puntos) y las tres escenas (faraón ante la diosa del disco, ante el dios
// chacal y, a la derecha, la pareja abrazada). Devuelve P(u, v)
function b_paredNorte(R, X0, Y0, X1, Y1, k = 0) {
  const sx = (X1 - X0) / 246, sy = (Y1 - Y0) / 122, P = (u, v) => [Math.round(X0 + (u - 24) * sx), Math.round(Y0 + (v - 26) * sy)];
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) {
    const v = 26 + (y - Y0) / sy, g = h(x >> 2, y >> 2, k) * 0.7 + h(x, y, k + 1) * 0.45 + Math.sin((x - X0) * 0.05 + h(x >> 4, y >> 4, k) * 3) * 0.15;
    R.pset(x, y, v > 132 ? b_tono(b_rp('#3a2010', '#5a3418', '#6e4420', '#84542a'), 1.2 + g * 1.6, x, y) : b_tono(B_OCRE, 3.4 + g * 1.4 - (v - 26) / 140, x, y));
  }
  // el filo de arriba, la cenefa de rayas (azul, rojo, verde con separadores blancos) y la línea negra
  const [, yc0] = P(0, 27), [, yc1] = P(0, 35);
  for (let x = X0; x <= X1; x++) { const u = (x - X0) / sx, c = [B_PIC.azul, B_PIC.blanco, B_PIC.rojo, B_PIC.blanco, B_PIC.verde, B_PIC.blanco][Math.floor(u / 4) % 6] ?? B_PIC.azul, ancho = Math.floor(u / 4) % 2 ? 1 : 3;
    for (let y = yc0; y <= yc1; y++) R.pset(x, y, (u % 4) < ancho + 1 || Math.floor(u / 4) % 2 === 0 ? (h(x, y, k + 3) > 0.92 ? B_PIC.blancoS : c) : B_PIC.blanco); R.pset(x, yc1 + 1, B_PIC.k); R.pset(x, yc0 - 1, B_PIC.k); }
  // las columnas de signos que no se leen (rayitas, puntos y ovalitos), encima y entre las escenas
  for (let u = 30; u < 266; u += 6) { if ((u > 96 && u < 104) || (u > 176 && u < 184)) continue; const [x0] = P(u, 0);
    for (let v = 39; v < 50; v += 3) { const [, y] = P(0, v), r = h(u, v, k + 4); if (r < 0.3) R.rect(x0, y, x0 + Math.max(1, Math.round(3 * sx)), y, B_PIC.k); else if (r < 0.55) R.pset(x0 + 1, y, B_PIC.azul); else if (r < 0.75) { R.pset(x0, y, B_PIC.k); R.pset(x0 + 2, y, B_PIC.k); } else R.pset(x0 + 1, y, B_PIC.rojo); }
    const [, ya] = P(0, 38), [, yb] = P(0, 51); if (u % 18 === 0) R.linea(x0 - 2, ya, x0 - 2, yb, B_PIC.k); }
  // la línea del suelo de las figuras y el filo del zócalo
  { const [xa, y] = P(26, 130), [xb] = P(268, 130); R.rect(xa, y, xb, y, B_PIC.k); const [, z] = P(0, 132); R.rect(X0, z, X1, z, B_PIC.k); R.rect(X0, z + 1, X1, z + 1, hex('#a06a30')); }
  // los separadores verticales entre escenas
  for (const u of [100, 180]) { const [x, ya] = P(u, 38), [, yb] = P(u, 130); R.rect(x, ya, x, yb, B_PIC.k); R.rect(x + 1, ya, x + 1, yb, B_PIC.azul); }
  // las tres escenas
  b_figura(R, P, 44, 130, 'faraon', 1); b_figura(R, P, 82, 130, 'diosa', -1);
  b_figura(R, P, 118, 130, 'faraon', 1); b_figura(R, P, 160, 130, 'chacal', -1);
  b_figura(R, P, 216, 130, 'faraon', 1); b_figura(R, P, 216, 130, 'pareja', 1);
  // las manchitas marrones del tiempo (las de verdad tiene la tumba), por toda la pintura
  for (let i = 0; i < 160 * sx * sy; i++) { const [x, y] = P(26 + h(i, 1, k + 7) * 242, 38 + h(i, 2, k + 7) * 92); R.pset(x, y, hex('#6a3a1a')); if (h(i, 3, k + 7) > 0.6) R.pset(x + 1, y, hex('#8a5224')); }
  return P;
}

// lo que se ve de LA PUERTA ESCONDIDA de la pared norte (canon x 150–224, y 52–148): raya 0–1 (la línea recta del
// dintel que asoma, desde el centro hacia los lados, como una arruga del yeso), rasante 0–1 (la luz que barre de lado:
// el escalón del dintel y las jambas se ven en luz y sombra) y rect (el contorno recto entero, fino)
function b_puertaEscondida(R, P, raya, rasante, rect) {
  const [x0, y0] = P(150, 52), [x1, y1] = P(224, 148), cx = (x0 + x1) / 2;
  if (raya > 0) { const w = (x1 - x0) / 2 * Math.min(1, raya * 1.3); for (let x = Math.round(cx - w); x <= cx + w; x++) { const c = h(x, 3, 80) > 0.15;
    R.pset(x, y0 - 1, b_mez(R.pget(x, y0 - 1), hex('#2a1404'), 0.25)); R.pset(x, y0, b_mez(R.pget(x, y0), hex('#2a1404'), c ? 0.8 : 0.5)); R.pset(x, y0 + 1, b_mez(R.pget(x, y0 + 1), hex('#fff4d0'), 0.6)); R.pset(x, y0 + 2, b_mez(R.pget(x, y0 + 2), hex('#fff4d0'), 0.25)); } }
  if (rasante > 0) { b_velo(R, x0, y0 - 1, x1, y0 + 1, hex('#fff2c8'), 0.55 * rasante); b_velo(R, x0, y0 + 2, x1, y0 + 4, hex('#2a1408'), 0.5 * rasante); b_velo(R, x0, y0 + 5, x0 + 1, y1, hex('#2a1408'), 0.5 * rasante); b_velo(R, x1 - 1, y0 + 5, x1, y1, hex('#fff2c8'), 0.5 * rasante); }
  if (rect > 0) for (const [a, b, c, d] of [[x0, y0, x1, y0], [x0, y0, x0, y1], [x1, y0, x1, y1]]) R.linea(a, b, c, d, (x, y) => b_mez(R.pget(x, y), hex('#3a1c08'), 0.5 * rect));
}

// el aliento de los visitantes: nubecillas blancas que salen de (bocas) y suben hacia la pared, y las manchas de humedad
// que dejan en el yeso (gotitas y un velo verdoso) en la zona [x0, y0, x1, y1]; a 0–1
function b_aliento(R, t, a, bocas, x0, y0, x1, y1) {
  if (a <= 0) return;
  for (let i = 0; i < Math.round(26 * a); i++) { const x = Math.round(x0 + h(i, 1, 90) * (x1 - x0)), y = Math.round(y0 + h(i, 2, 90) * (y1 - y0)), r = 2 + h(i, 3, 90) * 4;
    for (let j = -r; j <= r; j++) for (let k = -r; k <= r; k++) if (j * j + k * k <= r * r && (j + k) % 2 === 0) R.pset(x + k, y + j, b_mez(R.pget(x + k, y + j), hex('#5a7a4a'), 0.35));
    R.pset(x, y + Math.round(r) + 1, hex('#d8e8e0')); if (h(i, 4, 90) > 0.5) R.pset(x + 1, y + Math.round(r) + 3, hex('#b0c8c0')); }
  for (const [bx, by] of bocas) for (let k = 0; k < 4; k++) { const u = ((t * 0.35 + k * 0.25) % 1), x = bx + Math.sin(t + k) * 3 + u * (k % 2 ? 14 : -10), y = by - u * 46, r = 1.5 + u * 4;
    if (u * a > 0.02) R.disco(x, y, r, (px, py) => ((px + py) % 2 === 0 || u < 0.5) ? b_mez(R.pget(px, py), hex('#f4f8ff'), 0.7 - u * 0.5) : R.pget(px, py)); }
}

// EL SARCÓFAGO CERRADO (canon): caja de cuarcita rojiza con la tapa puesta (cornisa que sobresale), el friso de
// rayitas, el disco con alas en medio y las diosas aladas en las esquinas (solo las alas y la silueta, sin cara), sobre
// su zócalo; en [x0, y0, x1, y1] (y1, el suelo) con la cara de arriba de fondo (prof px) para verlo en tres cuartos
const B_CUARC = b_rp('#3a1a14', '#5a2a22', '#783a30', '#904838', '#a8584a', '#c07462', '#d89480');

function b_sarcofago(R, x0, y0, x1, y1, prof = 0, k = 0) {
  const w = x1 - x0, hh = y1 - y0, tapa = Math.round(hh * 0.22), zoc = Math.round(hh * 0.08), K = B_CUARC[0];
  const piedra = (a, b, c, d, v0) => { for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) R.pset(x, y, b_tono(B_CUARC, v0 + h(x >> 1, y >> 1, k) * 0.9 + h(x, y, k + 1) * 0.4 + (h(x >> 3, y >> 2, k + 2) > 0.8 ? 0.6 : 0), x, y)); };
  // la cara de arriba (la tapa vista desde arriba, en tres cuartos)
  if (prof > 0) { R.poligono([[x0 - 2, y0], [x1 + 2, y0], [x1 + 2 + prof, y0 - prof], [x0 - 2 + prof, y0 - prof]], (x, y) => b_tono(B_CUARC, 4.4 + h(x >> 1, y, k + 3) * 0.8, x, y));
    R.linea(x0 - 2 + prof, y0 - prof, x1 + 2 + prof, y0 - prof, K); R.poligono([[x1 + 2, y0], [x1 + 2 + prof, y0 - prof], [x1 + 2 + prof, y1 - prof - 2], [x1 + 2, y1]], (x, y) => b_tono(B_CUARC, 1.6 + h(x, y >> 1, k + 4) * 0.8, x, y)); }
  // el zócalo, la caja y la tapa con su cornisa
  piedra(x0 - 3, y1 - zoc, x1 + 3, y1, 1.6); R.rect(x0 - 3, y1 - zoc, x1 + 3, y1 - zoc, B_CUARC[5]);
  piedra(x0, y0 + tapa, x1, y1 - zoc - 1, 3.0);
  piedra(x0 - 2, y0, x1 + 2, y0 + tapa, 3.6); R.rect(x0 - 2, y0, x1 + 2, y0, B_CUARC[6]); R.rect(x0 - 2, y0 + tapa, x1 + 2, y0 + tapa, K); R.rect(x0, y0 + tapa + 1, x1, y0 + tapa + 1, B_CUARC[1]);
  // el friso de la tapa (rayitas grabadas) y la moldura
  for (let x = x0 + 2; x < x1 - 1; x += 3) R.rect(x, y0 + 2, x, y0 + tapa - 3, B_CUARC[2]);
  R.rect(x0 - 2, y0 + tapa - 2, x1 + 2, y0 + tapa - 2, B_CUARC[5]);
  // el disco con alas en medio de la caja y, en las esquinas, las diosas aladas (la silueta y las alas abiertas)
  const cx = Math.round((x0 + x1) / 2), cy = Math.round(y0 + tapa + (hh - tapa - zoc) * 0.4), ala = Math.max(8, Math.round(w * 0.18));
  for (let i = 1; i <= ala; i++) { const ya = Math.round(i * 0.25); for (let j = 0; j < Math.max(1, 4 - Math.floor(i / ala * 3)); j++) { R.pset(cx - 3 - i, cy - ya + j, (i + j) % 2 ? B_CUARC[1] : B_CUARC[6]); R.pset(cx + 3 + i, cy - ya + j, (i + j) % 2 ? B_CUARC[1] : B_CUARC[6]); } }
  R.disco(cx, cy, 3, B_CUARC[1]); R.disco(cx - 0.5, cy - 0.5, 2, B_CUARC[6]);
  for (const [ex, dir] of [[x0 + 2, 1], [x1 - 2, -1]]) { const ytop = y0 + tapa + 3, ybot = y1 - zoc - 2, alto = ybot - ytop;
    R.rect(ex, ytop, ex + dir * 2, ybot, B_CUARC[1]); R.disco(ex + dir, ytop + 2, 1.6, B_CUARC[1]);
    for (let f = 0; f < 5; f++) { const yy = ytop + 5 + f * Math.max(2, Math.round(alto / 9)), largo = Math.round(w * 0.16) - f * 2; R.linea(ex + dir * 3, yy, ex + dir * (3 + largo), yy + Math.round(largo * 0.2), B_CUARC[1]); R.linea(ex + dir * 3, yy + 1, ex + dir * (3 + largo), yy + 1 + Math.round(largo * 0.2), B_CUARC[5]); } }
  // las rayitas de signos (sin leerse) en una banda baja, el contorno y la sombra del suelo
  for (let x = x0 + Math.round(w * 0.3); x < x1 - w * 0.3; x += 3) R.rect(x, y1 - zoc - 6, x, y1 - zoc - 4 - (x % 2), B_CUARC[2]);
  R.linea(x0, y0 + tapa, x0, y1 - zoc, K); R.linea(x1, y0 + tapa, x1, y1 - zoc, K); R.linea(x0 - 2, y0, x0 - 2, y0 + tapa, K); R.linea(x1 + 2, y0, x1 + 2, y0 + tapa, K);
  for (let x = x0 - 4; x <= x1 + 6 + prof; x++) if (x % 2 === 0) R.pset(x, y1 + 1, b_mez(R.pget(x, y1 + 1), hex('#1a1010'), 0.5));
}

// el techo liso y oscuro de la cámara (sin pintar), con su estuco apenas marcado
const B_TECHO = b_rp('#120e0c', '#1a1512', '#231c16', '#2e241a');

function b_techo(R, pts, k = 0) { R.poligono(pts, (x, y) => b_tono(B_TECHO, 1 + h(x >> 2, y >> 2, k) * 0.9 + h(x, y, k + 1) * 0.3, x, y)); }

// una pared lateral pintada en escorzo (ocre con cenefa y zócalo) entre el filo cercano xa (de ya0 a ya1) y el lejano
// xb (de yb0 a yb1); osc: lo que se oscurece (está de lado); con babuinos, los doce en cuatro columnas (pared oeste)
function b_paredLado(R, xa, ya0, ya1, xb, yb0, yb1, osc, babuinos, k = 0, sinCenefa = false) {
  const paso = xa < xb ? 1 : -1;
  for (let x = xa; x !== xb + paso; x += paso) { const u = (x - xa) / (xb - xa), y0 = Math.round(ya0 + (yb0 - ya0) * u), y1 = Math.round(ya1 + (yb1 - ya1) * u), al = y1 - y0;
    for (let y = y0; y <= y1; y++) { const v = (y - y0) / al, g = h(x >> 1, y >> 2, k) * 0.8 + h(x, y, k + 1) * 0.4;
      let c = sinCenefa && v < 0.087 ? b_tono(B_OCRE, 2.6 + g, x, y) : v < 0.025 ? B_PIC.k : v < 0.075 ? [B_PIC.azul, B_PIC.blanco, B_PIC.rojo, B_PIC.blanco, B_PIC.verde, B_PIC.blanco][Math.floor(u * 40) % 6] : v < 0.085 ? B_PIC.k : v > 0.88 ? b_tono(b_rp('#3a2010', '#5a3418', '#6e4420'), 0.6 + g * 1.4, x, y) : v > 0.87 ? B_PIC.k : b_tono(B_OCRE, 3.2 + g * 1.5 - v * 0.8, x, y);
      if (v > 0.1 && v < 0.86 && h(x, y, k + 5) > 0.985) c = hex('#6a3a1a');
      R.pset(x, y, b_mez(c, hex('#2a1408'), osc)); } }
  if (babuinos) for (let col = 0; col < 4; col++) for (let fila = 0; fila < 3; fila++) {
    const u = 0.12 + col * 0.22, x = Math.round(xa + (xb - xa) * u), y0 = ya0 + (yb0 - ya0) * u, y1 = ya1 + (yb1 - ya1) * u, al = y1 - y0;
    const y = Math.round(y0 + al * (0.34 + fila * 0.2)); b_babuino(R, x, y); R.linea(x - 8, y + 1, x + 9, y + 1, B_PIC.k); }
}

// el suelo de losas de caliza de la cámara, en perspectiva hacia el punto (vx, vy)
function b_losas(R, y0, y1, vx, vy, k = 0) {
  const rp = b_rp('#5a4a3a', '#7a6650', '#988268', '#b29c7e', '#c8b494');
  for (let y = y0; y <= y1; y++) { const z = (y - vy) / (y1 - vy);
    for (let x = 0; x < 320; x++) { const xb = vx + (x - vx) / z, jv = Math.abs(((xb + 1000) % 46) - 23) > 22, jh = Math.abs(Math.sin(Math.log(z + 0.2) * 9)) < 0.08;
      R.pset(x, y, jv || jh ? rp[0] : b_tono(rp, 1.6 + h(Math.floor(xb / 46), Math.floor(Math.log(z + 0.2) * 3), k) * 1.2 + h(x, y, k + 1) * 0.5 + (y - y0) / (y1 - y0) * 0.6, x, y)); } }
}

// ─ pintada (cámara 'pared'): LA PARED NORTE DE FRENTE (canon) ─
B_VISTAS['pintada.pared'] = (R, t, o, geo) => {
  const P = (u, v) => [Math.round(u), Math.round(v)], vieja = o.epoca === 1922;
  b_capa(R, 'pared', () => {
    b_techo(R, [[0, 0], [319, 0], [319, 46], [270, 26], [24, 26], [0, 12]], 20);
    b_paredLado(R, 0, 12, 166, 23, 26, 148, 0.42, true, 21);
    b_paredLado(R, 319, 46, 166, 271, 26, 148, 0.66, false, 22, true);
    b_paredNorte(R, 24, 26, 270, 148, 0);
    // la arista de las esquinas y el suelo de losas
    R.linea(23, 26, 23, 148, hex('#3a2010')); R.linea(271, 26, 271, 148, hex('#2a1408'));
    R.poligono([[0, 166], [23, 149], [271, 149], [319, 166], [319, 179], [0, 179]], hex('#000000'));
    b_losas(R, 149, 179, 147, 100, 23);
    R.poligono([[0, 149], [23, 149], [0, 166]], hex('#5a4a3a')); R.poligono([[271, 149], [319, 149], [319, 166]], hex('#5a4a3a'));
    for (let y = 149; y <= 166; y++) { const xa = Math.round(23 - (y - 149) * 23 / 17), xb = Math.round(271 + (y - 149) * 48 / 17); R.rect(0, y, xa, y, b_mez(hex('#988268'), hex('#000000'), 0.55)); R.rect(xb, y, 319, y, b_mez(hex('#988268'), hex('#000000'), 0.7)); }
    R.rect(24, 149, 270, 149, hex('#3a2a1c'));
    // un cepillo de arqueólogo y una regla olvidados junto al zócalo, a la izquierda
    R.rect(40, 170, 52, 172, hex('#8a5a2a')); R.rect(40, 170, 52, 170, hex('#b07a3c')); for (let x = 52; x < 58; x++) R.rect(x, 169, x, 173, (x % 2) ? hex('#3a2a1c') : hex('#5a4a34'));
    R.rect(228, 172, 256, 173, hex('#e8d8a8')); for (let x = 230; x < 256; x += 3) R.pset(x, 172, hex('#5a4a34'));
  });
  // las grietas finas del yeso (para «tan delicado»): crecen con o.grietas
  const gr = o.grietas ?? 0;
  if (gr > 0) for (let i = 0; i < 9; i++) { let x = 40 + h(i, 1, 30) * 220, y = 40 + h(i, 2, 30) * 80; const n = Math.round(gr * (14 + h(i, 3, 30) * 18));
    for (let j = 0; j < n; j++) { R.pset(Math.round(x), Math.round(y), hex('#4a2810')); if (j % 4 === 0) R.pset(Math.round(x) + 1, Math.round(y), hex('#f8dc98')); x += (h(i, j, 31) - 0.5) * 2.2; y += 0.7 + h(i, j, 32) * 0.6; } }
  b_puertaEscondida(R, P, o.raya ?? 0, o.luzRasante ?? 0, o.rectangulos ?? 0);
  // la luz: eléctrica de hoy (dos focos que bañan la pared) o el farol de 1922 / la vela
  const vela = o.vela ?? 0, f = b_tiembla(t);
  const ras = o.luzRasante ?? 0;
  if (ras > 0) b_luz(R, [[-20, 130, 300, 0.9 * ras + 0.2, 0.5]], 0.55 - 0.25 * ras, [1.06, 1.0, 0.9]);
  else if (vieja || vela > 0) b_luz(R, [[150, 110, 170 * f, 0.9, 0.7], [o.llama?.[0] ?? 150, o.llama?.[1] ?? 140, 90 * f, 0.4 * vela, 0.8]], 0.3, [1.1, 0.94, 0.72]);
  else b_luz(R, [[96, 80, 170, 0.42, 0.75], [214, 84, 170, 0.42, 0.75]], 0.6 + 0.01 * Math.sin(t * 50), [1.03, 1.0, 0.95]);
  // la luz rasante: un foco de lado (barre la pared en diagonal) con su banda de luz
  b_motas(R, t, 30, 30, 270, 160, 22, hex('#fff2d0'), 2);
  // una polilla que revolotea alrededor de la luz del foco (arriba a la izquierda)
  { const a = t * 1.7, x = Math.round(96 + Math.cos(a) * 22 + Math.sin(a * 2.3) * 6), y = Math.round(58 + Math.sin(a) * 9), al = Math.sin(t * 30) > 0;
    R.pset(x, y, hex('#5a4a3a')); R.pset(x + 1, y, hex('#5a4a3a')); R.pset(x - 1, y - (al ? 1 : 0), hex('#c8b898')); R.pset(x + 2, y - (al ? 1 : 0), hex('#c8b898')); if (al) { R.pset(x - 1, y - 2, hex('#e8dcc0')); R.pset(x + 2, y - 2, hex('#e8dcc0')); } }
  // EL MAZO de cantero: entra por la derecha, se acerca a la pared y se para a un palmo (su sombra en el yeso se afina);
  // con o.para tiembla y se retira
  const mz = o.mazo ?? 0, pr = o.para ?? 0;
  if (mz > 0) { const e = 1 - (1 - Math.min(1, mz)) ** 3, tiembla = pr > 0 && pr < 0.4 ? Math.round(Math.sin(t * 46)) : 0;
    const hx = Math.round(360 - (360 - geo.mazo[0]) * e + pr * pr * 120) + tiembla, hy = Math.round(geo.mazo[1] + (1 - e) * 10 + pr * 20), lejos = 1 - e + pr;
    // la sombra en la pared (más blanda y más lejos cuanto más lejos está el mazo)
    for (let j = -6; j <= 6; j++) for (let i = -10; i <= 10; i++) { const x = hx + i + Math.round(8 + lejos * 16), y = hy + j + Math.round(6 + lejos * 10); if (y < 148 && ((x + y) % 2 === 0 || lejos < 0.3)) R.pset(x, y, b_mez(R.pget(x, y), hex('#3a1c08'), 0.35)); }
    const MZ = b_rp('#3a2410', '#5a3a1c', '#7a5028', '#9a6a38', '#b88850');
    b_mango(R, hx + 6, hy + 2, hx + 26, hy + 18);
    for (let j = -6; j <= 6; j++) for (let i = -9; i <= 9; i++) { const r = Math.abs(i) > 7 && Math.abs(j) > 4; if (r) continue; R.pset(hx + i, hy + j, Math.abs(i) === 9 || Math.abs(j) === 6 ? MZ[0] : b_tono(MZ, 2.4 - j * 0.18 + (Math.abs(Math.sin(i * 0.9 + j * 0.2)) < 0.15 ? -0.8 : 0), hx + i, hy + j)); }
    brazo(R, 340, 196, hx + 24, hy + 18, '#6a5a44', -1, { codo: [hx + 66, hy + 58] });
  }
  return { suelo: 172, libre: [30, 270], pared: [24, 26, 270, 148], puerta: [150, 52, 224, 148], mazo: [262, 96], paredBase: 148 };
};

// el mango de madera del mazo, de la cabeza a la mano
function b_mango(R, x0, y0, x1, y1) { R.linea(x0, y0, x1, y1, hex('#3a2410')); R.linea(x0, y0 + 1, x1, y1 + 1, hex('#9a6a38')); R.linea(x0, y0 + 2, x1, y1 + 2, hex('#5a3a1c')); }

// ─ pintada (general): LA CÁMARA PINTADA en tres cuartos (canon) ─
B_VISTAS['pintada.general'] = (R, t, o, geo) => {
  const vieja = o.epoca === 1922, NX0 = 146, NY0 = 50, NX1 = 304, NY1 = 148;
  b_capa(R, 'pintada' + (vieja ? 'v' : 'h'), () => {
    b_techo(R, [[0, 0], [319, 0], [319, 44], [NX1, NY0], [NX0, NY0], [16, 24], [0, 22]], 24);
    // las vigas de la estructura moderna del techo (2015) o el techo pelado (1922)
    b_roca(R, 0, 0, 15, 179, B_ROCA, 25, 0.2); R.linea(16, 0, 16, 179, B_ROCA[0]);
    b_paredLado(R, 16, 24, 170, NX0, NY0, NY1, 0.3, true, 26);
    b_paredLado(R, 319, 44, 154, NX1 + 1, NY0, NY1, 0.6, false, 27, true);
    const P = b_paredNorte(R, NX0, NY0, NX1, NY1, 1);
    R.linea(NX0, NY0, NX0, NY1, hex('#3a2010')); R.linea(NX1, NY0, NX1, NY1, hex('#2a1408'));
    // el suelo de losas de la cámara
    R.poligono([[16, 170], [NX0, NY1], [NX1, NY1], [319, 154], [319, 179], [16, 179]], hex('#7a6650'));
    for (let y = NY1 + 1; y < 180; y++) for (let x = 16; x < 320; x++) { const ya = Math.round(170 + (x - 16) * (NY1 - 170) / (NX0 - 16)); if (x < NX0 && y < ya) continue; if (x > NX1 && y < NY1 + (x - NX1) * 6 / 15) continue;
      const z = (y - 120) / 60, xb = 225 + (x - 225) / z; R.pset(x, y, Math.abs(((xb + 1000) % 40) - 20) > 19 || (y - NY1) % 7 === 0 ? hex('#5a4a3a') : b_tono(b_rp('#5a4a3a', '#7a6650', '#988268', '#b29c7e'), 1.5 + h(Math.floor(xb / 40), (y - NY1) / 7 | 0, 28) + h(x, y, 29) * 0.4, x, y)); }
    b_sarcofago(R, 122, 118, 206, 156, 5, 30);
    if (!vieja) {
      // la pasarela de madera (tablas con clavos y su canto) y, colgados del techo, los dos focos con su cable
      for (let y = 158; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor((y - 158) / 5); R.pset(x, y, (y - 158) % 5 === 0 ? hex('#3a2414') : b_tono(b_rp('#5a3a20', '#7a5230', '#946840', '#ae8250'), 1.5 + h(x >> 3, tb, 31) * 1.2 + h(x, y, 32) * 0.4 + (Math.abs(Math.sin(x * 0.2 + tb)) < 0.1 ? -0.8 : 0), x, y)); if ((x + tb * 17) % 41 === 0) R.pset(x, y - ((y - 158) % 5) + 2, hex('#c8c0a8')); }
      R.rect(0, 157, 319, 157, hex('#c8a070')); R.rect(0, 158, 319, 158, hex('#6a4428'));
      R.linea(60, 28, 280, 46, hex('#060606'));
      for (const [x, y] of [[100, 32], [228, 42]]) { R.rect(x - 3, y, x + 3, y + 5, hex('#2a2a30')); R.rect(x - 2, y + 1, x + 2, y + 1, hex('#6a6a74')); R.rect(x - 2, y + 5, x + 2, y + 6, hex('#fff6d8')); R.linea(x, y - 3, x, y, hex('#2a2a30')); }
      // el cartelito de pictogramas (cámara tachada) en un poste a la derecha
      R.rect(296, 120, 297, 157, hex('#3a3a40')); R.rect(288, 110, 306, 122, hex('#e8e4d8')); R.rect(288, 110, 306, 110, hex('#2a2a30'));
      R.rect(293, 114, 300, 119, hex('#2a2a30')); R.disco(296.5, 116.5, 1.6, hex('#e8e4d8')); R.linea(290, 120, 304, 112, hex('#c8302a'));
    } else {
      // 1922: el suelo con arenilla, las cajas de embalaje de Carter y una escalera de mano apoyada
      for (let i = 0; i < 90; i++) R.pset(Math.round(16 + h(i, 1, 33) * 300), Math.round(152 + h(i, 2, 33) * 27), hex('#c8b494'));
      b_cajon(R, 30, 158, 56, 176, 35); b_cajon(R, 52, 150, 76, 170, 36); b_cajon(R, 276, 156, 304, 177, 37);
      for (const x of [252, 266]) R.linea(x, 172, x + 10, 74, hex('#7a5028')); for (let k = 0; k < 9; k++) { const y = 164 - k * 11; R.linea(252 + (172 - y) / 9.8, y, 266 + (172 - y) / 9.8, y, hex('#9a6a38')); }
    }
  });
  // el aliento de los visitantes y sus manchas de humedad en el yeso
  b_aliento(R, t, o.aliento ?? 0, o.bocas ?? [[70, 146], [250, 146]], NX0 + 4, NY0 + 14, NX1 - 4, NY1 - 18);
  const f = b_tiembla(t);
  if (vieja) b_luz(R, [[54, 140, 190 * f, 0.9, 0.7], [o.llama?.[0] ?? 160, o.llama?.[1] ?? 140, 80 * f, 0.5 * (o.vela ?? 0), 0.8]], 0.26, [1.12, 0.92, 0.68]);
  else b_luz(R, [[110, 90, 130, 0.38, 0.8], [232, 100, 130, 0.4, 0.8]], 0.62 + 0.01 * Math.sin(t * 45), [1.03, 1.0, 0.95]);
  if (vieja) { // el farol sobre la caja, con su llama
    R.rect(58, 140, 66, 150, hex('#2a2a2a')); R.rect(59, 142, 65, 148, hex('#ffe8a0')); R.rect(57, 138, 67, 139, hex('#2a2a2a')); R.anillo(62, 135, 3, hex('#2a2a2a')); b_llama(R, 62, 147, t, 1, 0.8); }
  else for (const [x, y] of [[100, 37], [228, 47]]) R.rect(x - 2, y, x + 2, y, Math.sin(t * 30 + x) > -0.9 ? hex('#fffef0') : hex('#e8e0c0'));
  b_motas(R, t, 60, 50, 300, 150, 18, vieja ? hex('#f0d090') : hex('#fffaf0'), 3);
  return { suelo: vieja ? 166 : 170, libre: [24, 296], sarcofago: [122, 118, 206, 156], pared: [NX0, NY0, NX1, NY1], paredOeste: [16, 24, NX0, 170], puertaEscondida: [Math.round(NX0 + (150 - 24) * 158 / 246), NY0 + Math.round((52 - 26) * 98 / 122), Math.round(NX0 + (224 - 24) * 158 / 246), NY1] };
};
B_DELANTE['pintada.general'] = (R, t, o) => {
  if (o.epoca === 1922) return;
  // la barandilla de la pasarela: postes, pasamanos con su brillo y la tabla baja (tapa las piernas, no las caras)
  const M = b_rp('#3a2414', '#5a3a20', '#7a5230', '#9a6a3c', '#c8925a');
  for (let x = 0; x < 320; x++) { R.pset(x, 160, M[0]); R.pset(x, 161, M[4]); R.pset(x, 162, M[3]); R.pset(x, 163, M[2]); R.pset(x, 164, M[0]); for (let y = 172; y < 176; y++) R.pset(x, y, y === 172 ? M[3] : b_tono(M, 1.4 + h(x >> 3, y, 34) * 1.2, x, y)); }
  for (let x = 6; x < 320; x += 52) { R.rect(x, 158, x + 4, 179, M[2]); R.rect(x, 158, x, 179, M[0]); R.rect(x + 1, 158, x + 1, 179, M[4]); R.rect(x + 4, 158, x + 4, 179, M[0]); R.rect(x - 1, 157, x + 5, 158, M[1]); }
};

// un cajón de embalaje de madera de 1922 (tablas con vetas, listones en cruz, clavos y su sombra)
function b_cajon(R, x0, y0, x1, y1, k = 0) {
  const M = b_rp('#3a2414', '#6a4a2a', '#8a643a', '#a8804c', '#c49c64');
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (y - y0) % 6 === 0 ? M[1] : b_tono(M, 2.2 + h(x >> 3, (y - y0) / 6 | 0, k) * 0.9 + (Math.abs(Math.sin(x * 0.4 + y)) < 0.1 ? -0.8 : 0), x, y));
  R.linea(x0, y0, x1, y1, M[4]); R.linea(x0 + 1, y0, x1, y1 - 1, M[1]);
  for (const [a, b, c, d] of [[x0, y0, x1, y0], [x0, y1, x1, y1], [x0, y0, x0, y1], [x1, y0, x1, y1]]) R.linea(a, b, c, d, M[0]);
  R.rect(x0, y0 + 1, x1, y0 + 2, M[4]); R.pset(x0 + 2, y0 + 3, hex('#c8c8c8')); R.pset(x1 - 2, y0 + 3, hex('#c8c8c8'));
  for (let x = x0 + 1; x <= x1 + 3; x++) if (x % 2) R.pset(x, y1 + 1, b_mez(R.pget(x, y1 + 1), hex('#000000'), 0.5));
}

// el oro (de la sombra al brillo), el negro de las estatuas, el alabastro y la madera pintada
const B_ORO = b_rp('#4a2e0a', '#7a5010', '#a87418', '#d0a028', '#f0c040', '#f8dc70', '#fff4b8');

const B_NEGRO = b_rp('#0c0c10', '#1a1a22', '#2a2a36', '#3e3e50');

const B_ALAB = b_rp('#7a7058', '#a89c80', '#cfc4a6', '#e8e0c8', '#f8f4e6');

// una superficie de oro con su luz: v0 el tono base, con vetas de brillo en diagonal y puntitos de cincelado
const b_oro = (v0, k = 0) => (x, y) => b_tono(B_ORO, v0 + h(x >> 1, y >> 1, k) * 0.7 + (((x + y * 2) % 9) === 0 ? 0.9 : 0) - (((x * 3 + y) % 13) === 0 ? 0.7 : 0), x, y);

// una rueda de carro dorada (llanta gruesa, seis radios, el cubo) en (cx, cy), radio r; ey achata (perspectiva)
function b_rueda(R, cx, cy, r, ey = 1, k = 0) {
  for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) { const d = Math.hypot(i, j / ey); if (d > r + 0.5 || d < r - 3) continue; R.pset(cx + i, cy + j, d > r - 0.5 || d < r - 2.5 ? B_ORO[1] : b_tono(B_ORO, 3.5 - j / r * 1.4 + h(i, j, k) * 0.4, cx + i, cy + j)); }
  for (let a = 0; a < 6; a++) { const an = a * Math.PI / 3 + k, x1 = cx + Math.cos(an) * (r - 2), y1 = cy + Math.sin(an) * (r - 2) * ey; R.linea(cx, cy, x1, y1, B_ORO[2]); R.linea(cx + 1, cy, x1 + 1, y1, B_ORO[4]); }
  R.disco(cx, cy, 3, B_ORO[1]); R.disco(cx - 0.5, cy - 0.5, 2, B_ORO[5]);
}

// una cama ritual de lado (NUESTRA): el bastidor dorado con el cuerpo largo del animal, las patas y, delante a la
// izquierda, el cuello alto con la cabeza (silueta sin cara): 'vaca' (manchas, cuernos de lira y disco), 'leon'
// (cabeza redonda con la melena) o 'hipo' (el hocico grande); (x0, y0): la esquina de arriba a la izquierda del bastidor
function b_cama(R, x0, y0, largo, tipo, k = 0) {
  const K = B_ORO[0], fondo = y0 + 22;
  // las patas (de animal, con su garra) y el bastidor con el colchón de rejilla encima
  for (const x of [x0 + 4, x0 + largo - 6]) { R.poligono([[x, y0 + 6], [x + 4, y0 + 6], [x + 4, fondo - 2], [x + 6, fondo], [x - 1, fondo], [x, fondo - 3]], b_oro(2.6, k)); R.linea(x, y0 + 6, x, fondo, K); }
  R.poligono([[x0, y0], [x0 + largo, y0], [x0 + largo - 2, y0 + 8], [x0 + 2, y0 + 8]], b_oro(3.4, k + 1));
  for (let x = x0 + 2; x < x0 + largo; x += 3) R.pset(x, y0 + 1, B_ORO[6]);
  if (tipo === 'vaca') for (let i = 0; i < 6; i++) R.disco(x0 + 8 + h(i, 1, k) * (largo - 14), y0 + 3 + h(i, 2, k) * 3, 1.3, B_NEGRO[1]);
  if (tipo === 'leon') for (let x = x0 + 6; x < x0 + largo - 4; x += 5) R.linea(x, y0 + 2, x + 2, y0 + 6, B_ORO[2]);
  if (tipo === 'hipo') for (let x = x0 + 4; x < x0 + largo - 4; x += 4) R.pset(x, y0 + 4, B_ORO[1]);
  R.linea(x0, y0, x0 + largo, y0, B_ORO[5]); R.linea(x0 + 2, y0 + 8, x0 + largo - 2, y0 + 8, K);
  // el cuello y la cabeza delante
  const cx = x0 - 2, cy = y0 - 18;
  R.poligono([[x0, y0 + 2], [x0 + 6, y0 + 2], [cx + 4, cy + 6], [cx - 2, cy + 6]], b_oro(3.0, k + 2));
  if (tipo === 'vaca') { b_poli(R, [[cx - 6, cy + 6], [cx + 4, cy + 6], [cx + 3, cy - 2], [cx - 2, cy - 3], [cx - 9, cy + 3]], b_oro(3.8, k + 3), K);
    for (let i = 0; i < 3; i++) R.pset(cx - 1 + i * 2, cy + 2 + (i % 2), B_NEGRO[1]);
    R.linea(cx - 1, cy - 3, cx - 6, cy - 10, K); R.linea(cx + 2, cy - 3, cx + 7, cy - 10, K); R.disco(cx + 0.5, cy - 9, 3, hex('#c8402a')); R.anillo(cx + 0.5, cy - 9, 3, K); }
  if (tipo === 'leon') { R.disco(cx - 1, cy + 1, 6, b_oro(3.2, k + 3)); R.anillo(cx - 1, cy + 1, 6, K); R.disco(cx - 3, cy + 3, 3, b_oro(4.4, k + 4)); R.pset(cx + 2, cy - 4, K); R.pset(cx - 4, cy - 4, K); }
  if (tipo === 'hipo') { b_poli(R, [[cx - 12, cy + 2], [cx - 12, cy + 8], [cx + 4, cy + 7], [cx + 4, cy - 2], [cx - 2, cy - 4], [cx - 6, cy - 1]], b_oro(3.6, k + 3), K); R.pset(cx + 1, cy - 4, K); R.pset(cx - 1, cy - 5, K); R.linea(cx - 11, cy + 5, cx - 6, cy + 5, B_ORO[1]); }
}

// EL TRONO (NUESTRO) en tres cuartos: cuatro patas de león doradas (las de atrás en sombra) con su garra, el asiento
// con su cojín rojo, los brazos con alas (plumas en rayas de turquesa) y el respaldo de oro con el panel de
// lapislázuli y un sol con rayos (sin figuras); (cx, base), escala s
function b_trono(R, cx, base, s = 1, k = 0) {
  const P = (x, y) => [Math.round(cx + x * s), Math.round(base - y * s)], Q = (pts) => pts.map(([x, y]) => P(x, y)), K = B_ORO[0];
  const pata = (x, y0, v) => b_poli(R, Q([[x, y0 + 14], [x + 3, y0 + 14], [x + 3, y0 + 4], [x + 5, y0 + 1], [x + 5, y0], [x - 1, y0], [x - 1, y0 + 2], [x, y0 + 4]]), b_oro(v, k), K);
  // las patas de atrás, el respaldo (de lado y de cara) con su panel y el sol
  pata(-6, 5, 1.8); pata(13, 5, 1.8);
  b_poli(R, Q([[-6, 19], [16, 19], [16, 46], [-6, 46]]), b_oro(3.6, k + 3), K);
  b_poli(R, Q([[-3, 22], [13, 22], [13, 43], [-3, 43]]), hex('#2a4a9a'), K);
  { const [sx, sy] = P(5, 33); R.disco(sx, sy, 3.6 * s, hex('#e86a2a')); R.disco(sx - 0.5, sy - 0.5, 2.2 * s, hex('#f8a848')); for (let a = 0; a < 9; a++) { const an = Math.PI * (0.05 + a * 0.11); R.linea(sx + Math.cos(an) * 4.5 * s, sy + Math.sin(an) * 4.5 * s, sx + Math.cos(an) * 7.5 * s, sy + Math.sin(an) * 7.5 * s, B_ORO[5]); } }
  for (let y = 23; y < 27; y += 2) { const [x, yy] = P(-2, y), [x2] = P(12, y); R.linea(x, yy, x2, yy, hex('#3ab0a8')); }
  b_poli(R, Q([[-6, 46], [16, 46], [14, 49], [-4, 49]]), b_oro(4.6, k + 4), K);
  // el asiento (visto un poco desde arriba) con el cojín y las patas de delante
  b_poli(R, Q([[-11, 14], [10, 14], [16, 19], [-6, 19]]), b_oro(4.2, k + 5), K);
  b_poli(R, Q([[-9, 15], [9, 15], [13, 18], [-6, 18]]), hex('#c8402a'), K);
  b_poli(R, Q([[-11, 11], [10, 11], [10, 14], [-11, 14]]), b_oro(3.0, k + 6), K);
  pata(-11, 0, 3.2); pata(7, 0, 3.0);
  b_poli(R, Q([[-9, 4], [8, 4], [8, 6], [-9, 6]]), b_oro(2.4, k + 7), K);
  // el brazo de la izquierda con sus alas
  b_poli(R, Q([[-12, 14], [-6, 19], [-6, 30], [-12, 25]]), b_oro(3.0, k + 8), K);
  for (let i = 0; i < 4; i++) { const [a, b] = P(-11, 16 + i * 2.4), [c, d] = P(-7, 20 + i * 2.4); R.linea(a, b, c, d, i % 2 ? hex('#3ab0a8') : B_ORO[1]); }
}

// una estatua guardiana (NUESTRA): de tamaño de persona alta, negra y dorada, de lado y sin cara: el tocado dorado a
// rayas, el faldellín y las sandalias de oro, el bastón largo; (x, base) los pies, d mira a ese lado, al (alto)
function b_estatua(R, x, base, d, al = 62, k = 0) {
  const s = al / 62, P = (u, v) => [Math.round(x + u * s * d), Math.round(base - v * s)], Q = (pts) => pts.map(([u, v]) => P(u, v)), K = B_NEGRO[0];
  const negro = (v0) => (px, py) => b_tono(B_NEGRO, v0 + h(px, py, k) * 0.5 + ((px - x) * d < 0 ? 0.8 : 0), px, py);
  // el pedestal, las piernas (una adelantada), el faldellín, el torso, el brazo y la cabeza con el tocado
  b_poli(R, Q([[-9, 0], [11, 0], [11, 4], [-9, 4]]), negro(1.6), K);
  b_poli(R, Q([[-5, 4], [-1, 4], [-1, 24], [-5, 24]]), negro(1.8), K); b_poli(R, Q([[3, 4], [7, 4], [5, 24], [1, 24]]), negro(1.6), K);
  b_poli(R, Q([[-6, 4], [0, 4], [0, 6], [-6, 6]]), b_oro(4, k), K); b_poli(R, Q([[2, 4], [9, 4], [9, 6], [2, 6]]), b_oro(4, k), K);
  b_poli(R, Q([[-7, 22], [8, 22], [6, 36], [-6, 36]]), b_oro(3.6, k + 1), K); b_poli(R, Q([[0, 22], [4, 22], [3, 34], [1, 34]]), b_oro(5, k + 2), K);
  b_poli(R, Q([[-6, 36], [6, 36], [8, 50], [-8, 50]]), negro(2.2), K);
  b_poli(R, Q([[-4, 48], [4, 48], [8, 47], [8, 44], [-4, 44]]), b_oro(4.2, k + 3), K);
  b_poli(R, Q([[6, 48], [9, 48], [12, 34], [10, 33]]), negro(2), K);
  b_poli(R, Q([[-2, 50], [3, 50], [3, 53], [-2, 53]]), negro(2), K);
  b_poli(R, Q([[-4, 52], [5, 52], [6, 58], [3, 62], [-3, 62], [-6, 57]]), negro(2.4), K);
  b_poli(R, Q([[-6, 53], [-7, 60], [-2, 64], [5, 63], [6, 59], [3, 56], [-3, 56], [-4, 46], [-7, 46]]), b_oro(3.8, k + 4), K);
  for (let v = 47; v < 63; v += 2) { const [a, b] = P(-6, v), [c] = P(-3, v); R.linea(a, b, c, b, B_ORO[1]); }
  // el bastón largo de oro
  { const [a, b] = P(12, 0), [c, e] = P(12, 66); R.linea(a, b, c, e, B_ORO[2]); R.linea(a + d, b, c + d, e, B_ORO[5]); R.disco(c, e, 1.5 * s, B_ORO[4]); }
}

// una jarra de alabastro (NUESTRA): cuerpo de lirio, cuello y boca, y el brillo de la piedra translúcida; tipo 0–2
function b_jarra(R, cx, base, al, tipo = 0, k = 0) {
  const w = al * (tipo === 1 ? 0.32 : 0.26);
  for (let y = 0; y < al; y++) { const v = y / al, r = tipo === 2 ? w * (v < 0.15 ? 0.6 : v < 0.75 ? 1 - Math.abs(v - 0.45) * 0.8 : v > 0.88 ? 0.9 : 0.45) : w * (v < 0.1 ? 0.7 : v < 0.7 ? 0.6 + Math.sin((v - 0.1) / 0.6 * Math.PI) * 0.4 : v > 0.9 ? 0.85 : 0.4);
    for (let i = -Math.round(r); i <= Math.round(r); i++) R.pset(cx + i, base - y, Math.abs(i) === Math.round(r) ? B_ALAB[0] : b_tono(B_ALAB, 2.4 - i / r * 1.2 + h(cx + i, y, k) * 0.5 + (Math.abs(Math.sin(y * 0.5 + i * 0.3)) < 0.1 ? -0.7 : 0), cx + i, base - y)); }
  R.rect(cx - Math.round(w * 0.9), base - al, cx + Math.round(w * 0.9), base - al, B_ALAB[0]);
}

// una cesta de esparto con tapa (trenzado en espiga)
function b_cesta(R, cx, base, w, al, k = 0) {
  for (let y = 0; y < al; y++) { const r = w * (0.85 + Math.sin(y / al * Math.PI) * 0.15); for (let i = -Math.round(r); i <= Math.round(r); i++) R.pset(cx + i, base - y, Math.abs(i) >= Math.round(r) - 0 ? hex('#4a3418') : ((i + y * 2) % 4 < 2 ? hex('#b8904c') : hex('#8a6a34'))); }
  R.disco(cx, base - al, w * 0.95, hex('#9a7a40')); for (let i = -w; i <= w; i += 2) R.pset(cx + i, base - al, hex('#c8a060'));
}

// ─ antecámara (general): LA ANTECÁMARA ABARROTADA vista desde el hueco ─
B_VISTAS['antecamara.general'] = (R, t, o, geo) => {
  const vela = o.vela ?? 1, oro = o.oro ?? 1;
  b_capa(R, 'antecamara', () => {
    // la pared del fondo (enlucida sin pintar, con manchas) y el suelo
    b_roca(R, 0, 0, 319, 118, B_YESO, 40, 0.3);
    b_sueloRoca(R, 112, 179, B_ROCA, 41);
    // la puerta tapiada del fondo a la derecha, con sus sellos, entre las dos estatuas
    b_puertaSellada(R, 238, 54, 272, 114, 1, null, 0, 42);
    R.rect(236, 50, 274, 53, hex('#5a3c22')); R.rect(236, 50, 274, 50, hex('#8a6038'));
    b_estatua(R, 224, 116, 1, 62, 43); b_estatua(R, 290, 116, -1, 62, 44);
    // los carros desmontados a la izquierda: ruedas apoyadas, la caja del carro volcada y las varas
    R.linea(6, 70, 120, 116, B_ORO[1]); R.linea(6, 71, 120, 117, B_ORO[4]); R.linea(10, 112, 96, 62, B_ORO[2]); R.linea(11, 112, 97, 62, B_ORO[5]);
    b_rueda(R, 30, 92, 22, 1, 0.2); b_rueda(R, 58, 98, 20, 0.9, 0.7);
    R.poligono([[6, 104], [70, 102], [84, 118], [80, 132], [10, 134]], b_oro(3.4, 45)); R.linea(6, 104, 70, 102, B_ORO[6]);
    for (let x = 12; x < 78; x += 6) { R.disco(x, 118, 2, hex('#2a4a9a')); R.pset(x, 118, hex('#3ab0a8')); }
    R.linea(10, 134, 80, 132, B_ORO[0]); b_rueda(R, 98, 120, 16, 0.5, 1.1);
    // las tres camas rituales en fila contra la pared, con cofres y bultos encima
    b_cama(R, 116, 86, 52, 'vaca', 46); b_cama(R, 150, 92, 50, 'leon', 47); b_cama(R, 184, 98, 46, 'hipo', 48);
    PIEZAS_TU.cofre(R, 136, 86, { s: 1 }); b_cesta(R, 170, 92, 7, 8, 49); b_jarra(R, 200, 98, 14, 1, 50); b_cesta(R, 214, 98, 6, 6, 51);
    for (const [x, y, w, c] of [[124, 74, 12, '#e8e0c8'], [178, 84, 10, '#c8402a']]) { R.disco(x, y, w / 2, hex(c)); R.anillo(x, y, w / 2, hex('#3a2a18')); }
    // cajas y cofrecillos apilados hasta arriba sobre las camas y detrás del carro
    for (const [x, y, w, al, c] of [[96, 58, 18, 12, '#e8dcc0'], [100, 46, 12, 12, '#c8402a'], [140, 52, 16, 10, '#3a6a9a'], [158, 58, 20, 14, '#e8dcc0'], [196, 62, 18, 12, '#b07a3c'], [188, 50, 12, 12, '#e8dcc0'], [70, 62, 14, 10, '#b07a3c']]) {
      R.rect(x, y, x + w, y + al, hex(c)); R.rect(x, y, x + w, y, b_mez(hex(c), hex('#ffffff'), 0.4)); R.rect(x + w, y, x + w, y + al, b_mez(hex(c), hex('#000000'), 0.4)); R.rect(x, y + al, x + w, y + al, hex('#2a1a10'));
      for (let i = x + 2; i < x + w - 1; i += 3) R.pset(i, y + 2, B_ORO[4]); R.rect(x + 2, y + al - 3, x + w - 2, y + al - 3, B_ORO[3]); }
    // EL TRONO delante de las camas
    b_trono(R, 170, 132, 1, 52);
    // delante: cofres pintados, cestas, jarras de alabastro, cajas ovaladas, un taburete y arcos atados
    PIEZAS_TU.cofre(R, 104, 168, { s: 2 });
    b_cesta(R, 40, 160, 10, 12, 53); b_cesta(R, 62, 170, 9, 10, 54); b_cesta(R, 22, 176, 8, 9, 55);
    for (const [x, b, al, tp] of [[208, 156, 22, 0], [224, 160, 18, 2], [242, 152, 26, 1], [258, 162, 16, 0], [196, 170, 14, 2]]) b_jarra(R, x, b, al, tp, x);
    for (const [x, y] of [[284, 158], [300, 168]]) { R.disco(x, y, 9, hex('#e8e0c8')); R.disco(x, y - 1, 8, hex('#f4ecd8')); R.anillo(x, y, 9, hex('#7a6a50')); for (let i = -6; i <= 6; i += 3) R.pset(x + i, y - 2, hex('#c8402a')); }
    for (let i = 0; i < 4; i++) R.linea(132 + i * 3, 178, 172 + i * 2, 140, i % 2 ? B_ORO[3] : B_ORO[1]); R.rect(148, 160, 158, 162, hex('#c8402a'));
    PIEZAS_TU.cofre(R, 160, 176, { s: 1 }); b_cesta(R, 186, 178, 8, 9, 59); b_rueda(R, 140, 140, 10, 0.6, 2.1);
    // un taburete plegable, un escabel dorado y un fardo de bastones y arcos atados
    R.linea(200, 134, 214, 150, hex('#3a2414')); R.linea(214, 134, 200, 150, hex('#3a2414')); R.rect(198, 132, 216, 134, hex('#e8dcc0')); for (let x = 199; x < 216; x += 2) R.pset(x, 133, hex('#3a2414'));
    R.poligono([[120, 128], [140, 128], [138, 136], [122, 136]], b_oro(3.6, 69)); R.linea(120, 128, 140, 128, B_ORO[6]);
    R.poligono([[268, 140], [296, 140], [292, 146], [272, 146]], b_oro(3.6, 56)); R.rect(272, 146, 274, 156, B_ORO[1]); R.rect(290, 146, 292, 156, B_ORO[1]);
    // el filo del hueco por donde se mira: piedra rota y oscura alrededor
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const dx = (x - 160) / 168, dy = (y - 92) / 100, d = Math.max(Math.abs(dx) ** 3 + Math.abs(dy) ** 3, 0) + (h(x >> 2, y >> 2, 57) - 0.5) * 0.12; if (d > 0.82) R.pset(x, y, d > 0.92 ? hex('#0a0806') : b_tono(B_ROCA, 0.4 + h(x, y, 58) * 1.4, x, y)); }
  });
  // la luz: la vela que se mete por el hueco (abajo en medio) o el foco eléctrico de 1923
  const f = b_tiembla(t), [lx, ly] = o.llama ?? [160, 186];
  if (vela > 0) b_luz(R, [[lx + Math.sin(t * 7) * 2, ly, 250 * f, 1.0 * vela, 0.75]], 0.16 + (1 - vela) * 0.4, [1.14, 0.9, 0.62]);
  else b_luz(R, [[60, 20, 300, 0.6, 0.8]], 0.6, [1.02, 1.0, 0.98]);
  // los destellos del oro que se encienden poco a poco (o.oro) y corren con la llama
  const puntos = [[30, 74], [58, 82], [40, 108], [118, 70], [170, 96], [163, 112], [178, 90], [222, 58], [288, 58], [104, 140], [128, 150], [74, 118], [280, 142], [154, 86], [196, 94], [12, 96]];
  for (let i = 0; i < puntos.length; i++) { if (i / puntos.length >= oro) continue; const b = Math.sin(t * (2.6 + (i % 4) * 0.7) + i * 1.9); if (b < 0.55) continue; const [x, y] = puntos[i], r = b > 0.9 ? 2 : 1;
    R.pset(x, y, C.blanco); for (let j = 1; j <= r; j++) { R.pset(x - j, y, C.oroL); R.pset(x + j, y, C.oroL); R.pset(x, y - j, C.oroL); R.pset(x, y + j, C.oroL); } }
  b_motas(R, t, 60, 60, 260, 170, 16, hex('#f0d090'), 4);
  return {};
};

// ─ antecámara (cámara 'ajuar'): un montón de ajuar de cerca, a la luz de la vela ─
B_VISTAS['antecamara.ajuar'] = (R, t, o, geo) => {
  b_capa(R, 'ajuar', () => {
    b_roca(R, 0, 0, 319, 179, B_YESO, 60, 0.2);
    b_sueloRoca(R, 150, 179, B_ROCA, 61);
    // la rueda de carro grande apoyada detrás, el abanico de plumas y unas varas
    b_rueda(R, 82, 82, 46, 1, 0.3);
    R.linea(120, 30, 300, 150, B_ORO[1]); R.linea(120, 31, 300, 151, B_ORO[5]);
    { const cx = 258, cy = 100; R.rect(cx - 1, cy, cx + 1, 160, B_ORO[2]); R.rect(cx, cy, cx, 160, B_ORO[5]);
      for (let a = 0; a < 30; a++) { const an = Math.PI * (1.05 + a * 0.032); for (let r = 6; r < 46; r++) { const x = Math.round(cx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r * 0.95); if (y < 50) continue; R.pset(x, y, r > 42 ? hex('#5a4a3a') : (r + (a >> 1)) % 4 === 0 ? hex('#a89c88') : (a >> 1) % 2 ? hex('#f4eee0') : hex('#d8d0be')); } }
      R.poligono([[cx - 8, cy], [cx + 8, cy], [cx + 4, cy + 6], [cx - 4, cy + 6]], b_oro(3.6, 62)); }
    // EL TRONO de lado, grande
    b_trono(R, 192, 170, 2.4, 63);
    // el cofre de tapa pintada (escenas de caza en pictogramas: un carro, gacelas que corren, flechas)
    { const x0 = 18, y0 = 112, x1 = 132, y1 = 170; R.poligono([[x0, y0 + 10], [x1, y0 + 10], [x1, y1], [x0, y1]], (x, y) => b_tono(b_rp('#a88a5a', '#cdb486', '#e8d4a6', '#f4e6c4'), 1.8 + h(x >> 1, y >> 1, 64) * 0.8, x, y));
      R.poligono([[x0 - 4, y0 + 10], [x0 + 6, y0 - 4], [x1 - 6, y0 - 4], [x1 + 4, y0 + 10]], (x, y) => b_tono(b_rp('#b8a070', '#dcc898', '#f0e2bc'), 1.6 + h(x, y, 65) * 0.6, x, y));
      for (let x = x0; x <= x1; x++) { R.pset(x, y0 + 11, x % 4 < 2 ? hex('#2a4a9a') : hex('#c8402a')); R.pset(x, y0 + 12, B_ORO[4]); R.pset(x, y1 - 3, x % 4 < 2 ? hex('#3a8a5a') : B_ORO[4]); }
      const K = hex('#3a2414');
      // el carro con su caballo (siluetas planas), las gacelas que huyen y las flechas
      R.poligono([[34, 152], [52, 152], [52, 142], [44, 140]], hex('#c8402a')); R.anillo(42, 155, 4, K); R.linea(52, 146, 62, 144, K);
      R.poligono([[60, 146], [74, 144], [78, 138], [80, 142], [76, 148], [74, 156], [72, 156], [70, 150], [64, 150], [62, 156], [60, 156]], hex('#f4f0e4')); R.linea(60, 146, 74, 144, K);
      for (const [gx, gy] of [[92, 142], [108, 136], [104, 152], [120, 146]]) { R.poligono([[gx, gy], [gx + 8, gy - 1], [gx + 10, gy - 4], [gx + 11, gy - 2], [gx + 9, gy + 2], [gx + 10, gy + 6], [gx + 8, gy + 6], [gx + 6, gy + 3], [gx + 2, gy + 3], [gx, gy + 6], [gx - 2, gy + 6], [gx, gy + 2]], hex('#b07a3c')); R.linea(gx + 9, gy - 4, gx + 10, gy - 7, K); }
      for (const [ax, ay] of [[80, 132], [90, 150], [96, 132]]) { R.linea(ax, ay, ax + 8, ay - 2, K); R.pset(ax + 8, ay - 2, hex('#c8402a')); }
      R.linea(x0, y0 + 10, x0, y1, K); R.linea(x1, y0 + 10, x1, y1, K); R.linea(x0, y1, x1, y1, K);
      // el vaso en forma de loto encima del cofre
      b_jarra(R, 112, 106, 22, 2, 66); R.disco(112, 84, 6, B_ALAB[4]); R.anillo(112, 84, 6, B_ALAB[0]); for (let i = -5; i <= 5; i += 2) R.linea(112 + i, 84, 112 + i * 1.4, 79, B_ALAB[1]); }
    // cuentas y amuletos sueltos por el suelo
    for (let i = 0; i < 26; i++) R.pset(Math.round(140 + h(i, 1, 67) * 170), Math.round(168 + h(i, 2, 67) * 10), [hex('#3ab0a8'), hex('#c8402a'), C.oro, hex('#2a4a9a')][i % 4]);
  });
  // la vela, abajo a la izquierda (fuera de cuadro): su luz tiembla y mueve los brillos
  const f = b_tiembla(t), lx = 120 + Math.sin(t * 5) * 3;
  b_luz(R, [[lx, 200, 330 * f, 1.05, 0.75], [262, 96, 70, 0.35, 1]], 0.3, [1.14, 0.9, 0.62]);
  // los brillos que corren por el oro con la llama
  const [bx, by] = geo.brillo;
  for (let i = 0; i < 9; i++) { const u = ((t * 0.5 + i / 9) % 1), x = Math.round(bx - 60 + u * 150 + h(i, 1, 68) * 20), y = Math.round(by - 40 + h(i, 2, 68) * 90 - u * 10);
    const p = R.pget(x, y), g = (p >> 8) & 255, r = p & 255; if (r > 150 && g > 100 && (p >> 16 & 255) < 120) { R.pset(x, y, C.blanco); R.pset(x - 1, y, C.oroL); R.pset(x + 1, y, C.oroL); if (Math.sin(t * 6 + i) > 0.3) { R.pset(x, y - 1, C.oroL); R.pset(x, y + 1, C.oroL); } } }
  b_motas(R, t, 20, 30, 300, 170, 16, hex('#f0d090'), 5);
  return {};
};

// ─ pasillo (cámara 'hueco'): LA SEGUNDA PUERTA DE CERCA, el hueco y la vela ─
B_VISTAS['pasillo.hueco'] = (R, t, o, geo) => {
  const ab = Math.ceil(Math.min(1, Math.max(0, o.abierta ?? 1)) * 4) / 4, abRaw = o.abierta ?? 1, acerca = o.acerca ?? 1, soplo = o.soplo ?? 0, enc = o.enciende ?? 0;
  b_capa(R, 'hueco', () => {
    b_roca(R, 0, 0, 319, 179, B_ROCA, 70, 0.3);
    // las jambas de roca y el dintel de madera con su sombra
    b_puertaSellada(R, 40, 30, 270, 179, 2, 128, 76, 71);
    R.rect(34, 18, 276, 29, hex('#5a3c22')); for (let x = 34; x <= 276; x++) { R.pset(x, 18, hex('#8a6038')); if (h(x >> 3, 1, 72) > 0.5) R.pset(x, 22 + (x % 3), hex('#3a2616')); } R.rect(34, 29, 276, 30, hex('#1e140c'));
    R.linea(39, 30, 39, 179, B_ROCA[0]); R.linea(271, 30, 271, 179, B_ROCA[0]); R.linea(38, 30, 38, 179, B_ROCA[1]);
    // el yeso del borde del hueco ya picado: el sitio donde estaba el sello que no llega a tocarse
    for (let i = 0; i < 18; i++) R.pset(Math.round(112 + h(i, 1, 73) * 34), Math.round(64 + h(i, 2, 73) * 26), B_YESO[0]);
  });
  // el hueco, que se abre piedra a piedra (o.abierta), con el oro que brilla dentro (o.oro)
  const [hx, hy] = geo.hueco;
  if (ab > 0) b_hueco(R, hx - 8 * ab, hy - 6 * ab, hx + 8 * ab, hy + 6 * ab, t, o.oro ?? 1);
  // el polvo que sale con cada piedra
  const frac = abRaw * 4 - Math.floor(abRaw * 4);
  if (abRaw > 0 && abRaw < 1 && frac < 0.5) for (let i = 0; i < 14; i++) { const u = frac * 2, x = hx + (h(i, 1, 74) - 0.5) * 30 * u, y = hy + 8 + (h(i, 2, 74) - 0.2) * 24 * u; if (h(i, 3, 74) > u * 0.8) R.pset(Math.round(x), Math.round(y), B_YESO[5]); }
  // la luz de la vela (si está encendida) y la del farol del suelo, abajo
  const [vx0, vy0] = geo.vela, vx = Math.round(vx0 + (1 - acerca) * 90), vy = Math.round(vy0 + (1 - acerca) * 50);
  const encendida = soplo < 0.8 || enc >= 0.55, f = b_tiembla(t), dob = soplo < 0.8 ? soplo * 5 : 0;
  b_luz(R, [[vx + dob, vy - 4, (encendida ? 150 : 40) * f, encendida ? 0.85 : 0.2, 0.85], [160, 230, 220, 0.4, 0.6]], 0.2, [1.14, 0.92, 0.66]);
  // el cincel clavado en la grieta del hueco, que da un respingo con cada golpe (el martillo, fuera de cuadro)
  if (abRaw > 0 && abRaw < 1) { const g = Math.abs(Math.sin(t * 9)) > 0.85 ? 1 : 0, tx = Math.round(hx - 7 * ab - 2), ty = Math.round(hy + 4 * ab + 2);
    R.linea(tx, ty, tx - 22 - g, ty + 14 + g, hex('#3a3a42')); R.linea(tx, ty + 1, tx - 22 - g, ty + 15 + g, hex('#a8a8b4')); R.linea(tx - 1, ty + 2, tx - 21 - g, ty + 16 + g, hex('#5a5a66'));
    R.rect(tx - 25 - g, ty + 15 + g, tx - 21 - g, ty + 18 + g, hex('#7a7a86')); if (g) for (let i = 0; i < 5; i++) R.pset(tx - 26 - i, ty + 14 - (i % 2) * 2, C.blanco); }
  // LA VELA en su candelero, en la mano de Carter que se acerca (o.acerca)
  PIEZAS_TU.vela(R, vx, vy + 40, { s: 2, apagada: true, t });
  if (encendida) { const alto = soplo < 0.8 ? 1 - soplo * 0.6 : 1; b_llama(R, vx, vy + 1, t, 0, 1.4 * alto, dob); }
  else { // el hilo de humo que sube y se riza
    for (let j = 0; j < 30; j++) { const x = Math.round(vx + Math.sin(j * 0.3 - t * 3) * (j * 0.12) + j * 0.15), y = vy - j; if (j % 2 || h(j, 1, 75) > 0.3) R.pset(x, y, b_mez(R.pget(x, y), hex('#c8c8c8'), 0.6 - j / 60)); } }
  brazo(R, vx + 60, 240, vx + 10, vy + 30, '#c8b896', -1, { codo: [vx + 34, vy + 82] });
  // la cerilla que la vuelve a encender (o.enciende), en la otra mano
  if (enc > 0 && enc < 1) { const u = enc < 0.5 ? enc * 2 : 2 - enc * 2, mx = Math.round(vx - 32 - (1 - u) * 40), my = Math.round(vy + 28 + (1 - u) * 20);
    R.linea(mx + 12, my - 2, mx + 29, my - 25, hex('#a88a5a')); R.linea(mx + 13, my - 2, mx + 30, my - 25, hex('#e8d0a0')); R.pset(mx + 30, my - 26, hex('#c8402a')); b_llama(R, mx + 30, my - 27, t, 2, 0.7);
    brazo(R, mx - 40, 240, mx, my, '#c8b896', 1, { codo: [mx - 26, my + 76] }); }
  b_motas(R, t, vx - 60, vy - 60, vx + 50, vy + 20, 12, hex('#f0d8a0'), 6);
  return {};
};
// delante en el pasillo: el farol del suelo (latón, cristal con la llama, el asa) y piedras en primer término, ya en
// los tonos de la penumbra (se pintan después de la luz)
B_DELANTE['pasillo.general'] = (R, t, o) => {
  const x = 118, y = 176, D = b_rp('#120e0e', '#2a201a', '#3e3024', '#5a4632', '#7a5e40');
  for (const [cx, cy, r] of [[8, 178, 9], [26, 182, 7], [300, 180, 10], [282, 184, 6], [316, 172, 6]]) { R.disco(cx, cy, r + 1, D[0]); R.disco(cx - 0.5, cy - 0.5, r, (px, py) => b_tono(D, 1.6 + h(px >> 1, py >> 1, 76) * 1.2 - (py - cy) / r * 0.6, px, py)); }
  // el farol: el pie de latón, el cristal con su rejilla, la llama dentro, el sombrerete con agujeros y el asa
  const L = b_rp('#2a1c0c', '#4a3414', '#7a5a24', '#a8823c', '#d0a858');
  R.rect(x - 6, y - 3, x + 6, y, L[1]); R.rect(x - 6, y - 3, x + 6, y - 3, L[3]); R.rect(x - 5, y, x + 5, y, L[0]);
  R.rect(x - 4, y - 15, x + 4, y - 4, hex('#c88a3a')); R.rect(x - 3, y - 14, x + 3, y - 5, hex('#f8d888')); R.rect(x - 3, y - 14, x - 3, y - 5, hex('#fff2c8'));
  for (const xx of [x - 5, x, x + 5]) R.rect(xx, y - 16, xx, y - 4, xx === x ? L[1] : L[2]); R.rect(x - 5, y - 10, x + 5, y - 10, L[1]);
  R.poligono([[x - 6, y - 16], [x + 7, y - 16], [x + 3, y - 21], [x - 2, y - 21]], L[2]); R.linea(x - 6, y - 16, x + 6, y - 16, L[4]); R.pset(x - 1, y - 18, L[0]); R.pset(x + 2, y - 18, L[0]);
  R.rect(x - 1, y - 23, x + 1, y - 21, L[1]); R.anillo(x + 0.5, y - 25, 3.5, L[1]); b_llama(R, x, y - 6, t, 4, 1);
  // su resplandor sobre el suelo, a los lados
  for (let i = -26; i <= 26; i++) if ((i + Math.round(t * 8)) % 3 !== 0) { const px = x + i, py = y + 1 + (Math.abs(i) > 16 ? 1 : 0); R.pset(px, py, b_mez(R.pget(px, py), hex('#ffd27a'), 0.35 * (1 - Math.abs(i) / 28))); }
};

const B_MADERA = b_rp('#3a2414', '#5a3a20', '#7a5230', '#946840', '#ae8250', '#c49a64');

// la mesa de madera (tablones con vetas que ondulan, nudos y juntas)
function b_mesa(R, k = 0) {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(y / 30), veta = Math.sin(x * 0.05 + Math.sin(y * 0.3 + tb) * 1.5 + tb * 7) * 0.5 + Math.sin(y * 1.7 + x * 0.01) * 0.25;
    const calma = x > 270 && y < 48;
    R.pset(x, y, calma ? b_tono(B_MADERA, 2.6 + veta * 0.25 + h(x >> 4, tb, k) * 0.2, x, y) : y % 30 === 0 ? B_MADERA[0] : b_tono(B_MADERA, 2.4 + veta + h(x >> 4, tb, k) * 0.7 + h(x, y, k + 1) * 0.3, x, y)); }
  for (let i = 0; i < 5; i++) { const x = Math.round(h(i, 1, k + 2) * 260), y = Math.round(50 + h(i, 2, k + 2) * 130); R.disco(x, y, 3, B_MADERA[1]); R.disco(x, y, 1.5, B_MADERA[0]); }
}

// la hoja de papel de calco (blanco azulado, cuadriculada: fina cada 8 px, más marcada cada 40) con su sombra y la
// cinta de pintor en las esquinas
function b_papel(R, x0, y0, x1, y1, k = 0) {
  for (let y = y0 + 3; y <= y1 + 3; y++) for (let x = x0 + 3; x <= x1 + 3; x++) if ((x + y) % 2 === 0 || x > x1 || y > y1) R.pset(x, y, b_mez(R.pget(x, y), hex('#000000'), 0.4));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const gx = (x - x0) % 8 === 0, gy = (y - y0) % 8 === 0, GX = (x - x0) % 40 === 0, GY = (y - y0) % 40 === 0;
    R.pset(x, y, GX || GY ? hex('#9ab4cc') : gx || gy ? hex('#c4d4e0') : b_tono(b_rp('#d8dcd8', '#e4e8e4', '#eef0ea', '#f6f6f0'), 1.8 + h(x >> 2, y >> 2, k) * 0.8 + h(x, y, k + 1) * 0.3, x, y)); }
  for (const [x, y] of [[x0 - 4, y0 - 3], [x1 - 10, y0 - 3], [x0 - 4, y1 - 4], [x1 - 10, y1 - 4]]) { if (x > 262 && y < 46) continue; R.rect(x, y, x + 14, y + 6, hex('#e8d8a0')); R.rect(x, y, x + 14, y, hex('#f4e8c0')); for (let i = x; i <= x + 14; i += 3) R.pset(i, y + 6, hex('#c8b880')); }
}

// el plano NUESTRO de la tumba en planta (norte arriba, canon): la escalera y el pasillo desde la derecha, la ANTECÁMARA
// alargada, el ANEXO abajo a la izquierda, la CÁMARA PINTADA arriba (en ocre, con el sarcófago) y el TESORO a su
// derecha; luz: [4] lo encendido de cada cuarto (0–1)
const B_CUARTOS = [[44, 104, 112, 128], [50, 132, 76, 148], [48, 72, 96, 100], [100, 74, 124, 98]];

function b_planoTut(R, luz = [0, 0, 0, 0], ox = 40, oy = 64, s = 1) {
  const T = hex('#2a3a5a'), T2 = hex('#5a6a8a'), X = (x) => Math.round(ox + (x - 40) * s), Y = (y) => Math.round(oy + (y - 64) * s);
  const ps = (x, y, c) => R.pset(X(x), Y(y), c), ln = (a, b, c, d, col) => R.linea(X(a), Y(b), X(c), Y(d), col), rc = (a, b, c, d, col) => R.rect(X(a), Y(b), X(c), Y(d), col);
  B_CUARTOS.forEach(([a, b, c, d], i) => { const l = luz[i]; for (let y = b + 1; y < d; y++) for (let x = a + 1; x < c; x++) { let col = i === 2 ? (((x + y) % 2) ? hex('#e8b058') : hex('#f0c070')) : (x + y) % 3 === 0 ? hex('#c4cce0') : null;
    if (l > 0 && (h(x, y, 120) < l || l >= 1)) col = i === 2 ? hex('#f8d070') : hex('#fbe7a0'); if (col) ps(x, y, col); } });
  // las paredes de tinta, dobles, con las puertas como huecos
  const muro = (a, b, c, d, huecos = []) => { for (let x = a; x <= c; x++) for (const y of [b, d]) if (!huecos.some(([hx0, hy0, hx1, hy1]) => x >= hx0 && x <= hx1 && y >= hy0 && y <= hy1)) { ps(x, y, T); if (s > 0.8) ps(x, y + (y === b ? -1 : 1), T); }
    for (let y = b; y <= d; y++) for (const x of [a, c]) if (!huecos.some(([hx0, hy0, hx1, hy1]) => x >= hx0 && x <= hx1 && y >= hy0 && y <= hy1)) { ps(x, y, T); if (s > 0.8) ps(x + (x === a ? -1 : 1), y, T); } };
  muro(44, 104, 112, 128, [[60, 128, 64, 128], [72, 104, 84, 104], [112, 119, 112, 125]]);
  muro(50, 132, 76, 148, [[60, 132, 64, 132]]); ln(60, 129, 60, 131, T); ln(64, 129, 64, 131, T);
  muro(48, 72, 96, 100, [[72, 100, 84, 100], [96, 82, 96, 90]]); ln(72, 101, 72, 103, T); ln(84, 101, 84, 103, T);
  muro(100, 74, 124, 98, [[100, 82, 100, 90]]); ln(97, 82, 99, 82, T); ln(97, 90, 99, 90, T);
  // el pasillo y la escalera (peldaños rayados) que llegan desde el este
  ln(113, 118, 140, 118, T); ln(113, 126, 140, 126, T); ln(140, 116, 168, 116, T); ln(140, 128, 168, 128, T);
  for (let x = 142; x < 168; x += 3) ln(x, 117, x, 127, T2);
  // el sarcófago dentro de la cámara pintada y la pared norte (su lado de arriba) más gruesa
  rc(62, 80, 82, 92, hex('#a8584a')); ln(62, 80, 82, 80, T); ln(62, 92, 82, 92, T); ln(62, 80, 62, 92, T); ln(82, 80, 82, 92, T);
  rc(48, 70, 96, 71, T);
}

// el plano de LA TUMBA DE UN REY GRANDE (NUESTRO, larguísimo y quebrado para que quepa): escaleras, pasillos, el
// pozo, la sala de pilares con sus cuartos, otra bajada, la sala del fondo con su cripta y más cuartos (diez en
// total); en rojo de tinta, desde (x0, y0) hacia la derecha y luego hacia abajo y hacia la izquierda
function b_planoGrande(R, x0, y0) {
  const T = hex('#8a2a2a'), T2 = hex('#c06050'), caja = (a, b, c, d) => { R.linea(a, b, c, b, T); R.linea(a, d, c, d, T); R.linea(a, b, a, d, T); R.linea(c, b, c, d, T); };
  const pasH = (xa, xb, y, esc) => { R.linea(xa, y - 3, xb, y - 3, T); R.linea(xa, y + 3, xb, y + 3, T); if (esc) for (let i = xa + 2; i < xb; i += 3) R.linea(i, y - 2, i, y + 2, T2); };
  const pasV = (x, ya, yb, esc) => { R.linea(x - 3, ya, x - 3, yb, T); R.linea(x + 3, ya, x + 3, yb, T); if (esc) for (let i = ya + 2; i < yb; i += 3) R.linea(x - 2, i, x + 2, i, T2); };
  const pil = (a, b, c, d, n, m) => { caja(a, b, c, d); for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) { const px = Math.round(a + (c - a) * i / (n + 1)), py = Math.round(b + (d - b) * j / (m + 1)); R.rect(px - 1, py - 1, px + 1, py + 1, T); } };
  let x = x0, y = y0;
  pasH(x, x + 18, y, 1); pasH(x + 18, x + 40, y, 0); pasH(x + 40, x + 54, y, 1); pasH(x + 54, x + 74, y, 0); x += 74;
  caja(x, y - 7, x + 12, y + 7); for (let i = 0; i < 5; i++) R.linea(x + 2, y - 5 + i * 3, x + 10, y - 5 + i * 3, T2); x += 12;
  pil(x, y - 12, x + 26, y + 14, 2, 2); caja(x + 6, y - 24, x + 20, y - 13); x += 13;
  pasV(x, y + 14, y + 40, 1); y += 40; pasV(x, y, y + 18, 0); y += 18;
  pil(x - 30, y, x + 12, y + 30, 3, 2); caja(x + 13, y + 4, x + 26, y + 16); caja(x + 13, y + 18, x + 26, y + 30);
  R.rect(x - 22, y + 10, x - 6, y + 20, hex('#d8a090')); caja(x - 22, y + 10, x - 6, y + 20);
  caja(x - 46, y + 2, x - 31, y + 14); caja(x - 46, y + 16, x - 31, y + 28); pasH(x - 70, x - 46, y + 15, 0); caja(x - 86, y + 8, x - 70, y + 22); caja(x - 86, y - 8, x - 70, y + 6);
}
// ─ plano (general): el plano de la tumba sobre papel de calco ─
B_VISTAS['plano.general'] = (R, t, o, geo) => {
  const [x0, y0, x1, y1] = geo.hoja, contar = o.contar ?? 0, cmp = o.comparar ?? 0;
  b_capa(R, 'plano', () => {
    b_mesa(R, 80); b_papel(R, x0, y0, x1, y1, 81);
    // la rosa de los vientos (flecha al norte, sin letras), la escala con sus números y las cotas
    { const cx = 32, cy = 60; R.linea(cx, cy - 10, cx, cy + 10, hex('#2a3a5a')); R.linea(cx - 7, cy, cx + 7, cy, hex('#5a6a8a')); R.poligono([[cx - 3, cy - 4], [cx + 3, cy - 4], [cx, cy - 12]], hex('#c8402a')); R.anillo(cx, cy, 6, hex('#5a6a8a')); }
    R.rect(44, 160, 104, 161, hex('#2a3a5a')); for (let i = 0; i <= 4; i++) R.rect(44 + i * 15, 157, 44 + i * 15, 161, hex('#2a3a5a')); for (let i = 0; i < 4; i += 2) R.rect(44 + i * 15, 158, 59 + i * 15, 159, hex('#2a3a5a'));
    R.numero('0', 42, 168, { fina: true, rampa: [hex('#2a3a5a')] }); R.numero('10', 100, 168, { fina: true, rampa: [hex('#2a3a5a')] });
    R.linea(44, 98, 44, 64, hex('#9ab4cc'), 2); R.linea(170, 116, 170, 64, hex('#9ab4cc'), 2); R.linea(44, 62, 170, 62, hex('#5a6a8a')); R.pset(44, 61, hex('#5a6a8a')); R.pset(170, 61, hex('#5a6a8a'));
    // la regla de madera, la escuadra de plástico, el lápiz y la goma sobre la mesa a la derecha
    R.poligono([[278, 48], [288, 46], [300, 176], [290, 178]], (x, y) => b_tono(b_rp('#c8a868', '#dcc088', '#ecd4a0'), 1.2 + h(x, y >> 2, 82) * 0.6, x, y));
    for (let i = 0; i < 26; i++) { const y = 50 + i * 5, x = 279 + Math.round((y - 48) * 12 / 130); R.linea(x, y, x + (i % 2 ? 2 : 4), y, hex('#3a2a14')); }
    R.poligono([[190, 120], [262, 160], [190, 160]], (x, y) => (x + y) % 2 ? hex('#a8d0d8') : R.pget(x, y)); R.linea(190, 120, 262, 160, hex('#5a8a96')); R.linea(190, 120, 190, 160, hex('#5a8a96')); R.linea(190, 160, 262, 160, hex('#5a8a96'));
    R.poligono([[205, 145], [222, 154], [205, 154]], hex('#000000')); R.poligono([[205, 145], [222, 154], [205, 154]], (x, y) => b_papelEn(x, y, x0, y0));
    R.rect(300, 140, 318, 148, hex('#e87888')); R.rect(300, 140, 318, 141, hex('#f8a8b0')); R.rect(300, 147, 318, 148, hex('#a84858'));
    // las virutas de goma
    for (let i = 0; i < 10; i++) R.pset(Math.round(150 + h(i, 1, 83) * 30), Math.round(140 + h(i, 2, 83) * 14), hex('#d89aa0'));
  });
  // los cuartos se encienden uno a uno con su número (o.contar 0–4)
  // (con o.comparar la de Tutankamón se encoge hacia la esquina de abajo a la izquierda)
  const luz = [0, 1, 2, 3].map((i) => Math.max(0, Math.min(1, (contar - i) * 2))), e = cmp * cmp * (3 - 2 * cmp), s = 1 - 0.5 * e, ox = 40 - 14 * e, oy = 64 + 52 * e;
  b_planoTut(R, luz, ox, oy, s);
  B_CUARTOS.forEach(([a, b, c, d], i) => { if (luz[i] >= 1 && s > 0.8) { const cx = Math.round(ox + (((a + c) >> 1) - 40) * s), cy = Math.round(oy + (((b + d) >> 1) - 64) * s); R.numero(String(i + 1), cx, cy + 4, { centro: true, rampa: [hex('#c8402a')] }); } });
  // a la derecha se desenrolla el plano de la tumba grande (o.comparar): la hoja, el rollo que rueda y el plano rojo
  if (cmp > 0) { const xa = 104, xb = 268, ya = 48, yb = ya + Math.round(cmp * 120);
    for (let y = ya; y <= yb; y++) for (let x = xa; x <= xb; x++) R.pset(x, y, (x - xa) % 8 === 0 || (y - ya) % 8 === 0 ? hex('#e8d8c0') : b_tono(b_rp('#efe4cc', '#f6eedc', '#fbf6ea'), 1.4 + h(x >> 2, y >> 2, 84) * 0.8, x, y));
    for (let x = xa; x <= xb + 3; x++) if ((x + yb) % 2) R.pset(x, yb + 7, b_mez(R.pget(x, yb + 7), hex('#000000'), 0.4));
    R.recorte([xa + 1, ya, xb - 1, yb]); b_planoGrande(R, xa + 8, ya + 16); R.recorte(null);
    for (let x = xa - 2; x <= xb + 2; x++) for (let i = 0; i < 7; i++) R.pset(x, yb + i, [hex('#b8a888'), hex('#d8ccb0'), hex('#f0e8d4'), hex('#fbf6ea'), hex('#e0d4b8'), hex('#c4b494'), hex('#8a7a5a')][i]);
    for (let x = xa; x < xb; x += 6) R.pset(x + (Math.round(cmp * 40) % 6), yb + 3, hex('#a89878')); R.disco(xa - 3, yb + 3, 3, hex('#7a5a3a')); R.disco(xb + 3, yb + 3, 3, hex('#7a5a3a')); }
  // la vida: una mosca que se pasea por el papel, el lápiz que rueda un poco y la esquina del papel que se levanta
  { const u = (t * 0.07) % 1, mx = Math.round(60 + u * 200), my = Math.round(140 - Math.sin(u * 9) * 20 - u * 30), a = Math.sin(t * 40) > 0; R.pset(mx, my, hex('#1a1a1a')); R.pset(mx + 1, my, hex('#1a1a1a')); R.pset(mx, my - 1, a ? hex('#c8d8e8') : hex('#8a9aa8')); R.pset(mx + 1, my - 1, a ? hex('#8a9aa8') : hex('#c8d8e8')); }
  { const r = Math.round(Math.sin(t * 0.8) * 3), xp = 236 + r; R.linea(xp, 70, xp + 34, 92, hex('#2a2a2a')); R.linea(xp, 71, xp + 34, 93, hex('#e8b030')); R.linea(xp, 72, xp + 34, 94, hex('#c08818')); R.linea(xp + 34, 92, xp + 40, 96, hex('#e8c8a0')); R.pset(xp + 40, 96, hex('#3a3a3a')); R.linea(xp - 4, 68, xp, 71, hex('#e87888')); }
  { const l = Math.max(0, Math.sin(t * 1.3)) * 3; if (l > 0.5) { R.poligono([[x1 - 14, y1], [x1, y1], [x1, y1 - 14]], hex('#3a2414')); R.poligono([[x1 - 14 + l, y1 - l], [x1 - l, y1 - 14 + l], [x1 - 14, y1 - 14 + l * 0.5]], hex('#e0e4e0')); } }
  return { cuartos: B_CUARTOS.map(([a, b, c, d]) => [(a + c) >> 1, (b + d) >> 1]) };
};

// el color del papel en (x, y) (para lo que se ve a través de la escuadra)
const b_papelEn = (x, y, x0, y0) => ((x - x0) % 8 === 0 || (y - y0) % 8 === 0 ? hex('#a8c4d0') : hex('#cce0e4'));

// ─ plano (cámara 'apretado'): LA ANTECÁMARA EN PLANTA llenándose de objetos y el contador ─
// los objetos de la antecámara en planta, en una rejilla con un poco de desorden (cajas, cofres, camas con su
// cabeza, ruedas con radios, jarras, cestas, el trono, bastones): caen en un orden revuelto
const B_OBJ = (() => { const L = [], cols = [hex('#e8dcc0'), hex('#f0c040'), hex('#d8a038'), hex('#f4ecd8'), hex('#c8402a'), hex('#3a6a9a'), hex('#b07a3c'), hex('#8ab89a')];
  for (let gy = 0; gy < 9; gy++) for (let gx = 0; gx < 13; gx++) { const k = gy * 13 + gx, tipo = Math.floor(h(gx, gy, 131) * 8), w = tipo === 2 ? 28 : 9 + Math.floor(h(gx, gy, 132) * 6), hh = tipo === 2 ? 8 : 8 + Math.floor(h(gx, gy, 133) * 5);
    if (tipo === 2 && gx > 10) continue; L.push({ x: 30 + gx * 15 + Math.round(h(gx, gy, 134) * 3), y: 42 + gy * 13 + Math.round(h(gx, gy, 135) * 3), tipo, w, hh, c: cols[(tipo + gx) % 8], orden: h(gx, gy, 136) }); }
  return L.sort((a, b) => a.orden - b.orden); })();
B_VISTAS['plano.apretado'] = (R, t, o, geo) => {
  const ob = o.objetos ?? 1, cu = o.cuenta ?? 1;
  b_capa(R, 'apretado', () => {
    b_mesa(R, 85); b_papel(R, 8, 22, 312, 174, 86);
    // los muros de la antecámara en planta (tinta doble y rayado de roca alrededor), con sus puertas
    const T = hex('#2a3a5a');
    for (let y = 30; y <= 170; y++) for (let x = 18; x <= 236; x++) { const dentro = x > 26 && x < 228 && y > 38 && y < 162; if (!dentro && (x + y) % 4 === 0) R.pset(x, y, hex('#8a9ab4')); }
    for (const [a, b, c, d] of [[26, 38, 228, 38], [26, 162, 228, 162], [26, 38, 26, 162], [228, 38, 228, 162]]) { R.linea(a, b, c, d, T); R.linea(a + (a === c ? -1 : 0), b + (b === d ? (b === 38 ? -1 : 1) : 0), c + (a === c ? -1 : 0), d + (b === d ? (b === 38 ? -1 : 1) : 0), T); }
    R.rect(196, 160, 222, 164, hex('#e8ece8')); R.rect(40, 160, 56, 164, hex('#e8ece8')); R.rect(110, 36, 150, 40, hex('#e8ece8'));
    for (let x = 110; x <= 150; x += 2) R.linea(x, 36, x + 2, 40, T);
  });
  // los objetos que caen uno tras otro (cajas, cofres, camas, ruedas, jarras, el trono, bastones) con su sombra
  const n = Math.round(ob * B_OBJ.length);
  for (let i = 0; i < n; i++) { const b = B_OBJ[i], u = Math.min(1, (ob * B_OBJ.length - i) / 2), dy = Math.round((1 - u) * -10), K = hex('#2a3a5a');
    R.rect(b.x + 2, b.y + 2, b.x + b.w + 2, b.y + b.hh + 2, hex('#8a9ab4'));
    if (b.tipo === 3 || b.tipo === 5 || b.tipo === 7) { const cx = b.x + b.w / 2, cy = b.y + b.hh / 2 + dy, r = Math.min(b.w, b.hh) / 2; R.disco(cx, cy, r, b.c); R.anillo(cx, cy, r, K);
      if (b.tipo === 5) { R.linea(cx - r, cy, cx + r, cy, K); R.linea(cx, cy - r, cx, cy + r, K); } else if (b.tipo === 3) R.disco(cx, cy, 1.5, K); else for (let i = -r + 1; i < r; i += 2) R.pset(cx + i, cy, K); }
    else { R.rect(b.x, b.y + dy, b.x + b.w, b.y + b.hh + dy, b.c); for (const [a, c, d, e] of [[b.x, b.y, b.x + b.w, b.y], [b.x, b.y + b.hh, b.x + b.w, b.y + b.hh], [b.x, b.y, b.x, b.y + b.hh], [b.x + b.w, b.y, b.x + b.w, b.y + b.hh]]) R.linea(a, c + dy, d, e + dy, K);
      if (b.tipo === 1) R.rect(b.x + 2, b.y + 2 + dy, b.x + b.w - 2, b.y + 3 + dy, hex('#fff0a0')); if (b.tipo === 2) { for (let x = b.x + 5; x < b.x + b.w; x += 4) R.pset(x, b.y + 4 + dy, K); R.disco(b.x - 2, b.y + 4 + dy, 3, b.c); R.anillo(b.x - 2, b.y + 4 + dy, 3, K); } if (b.tipo === 6) R.linea(b.x, b.y + 3 + dy, b.x + b.w, b.y + 3 + dy, hex('#f0c040')); } }
  // la etiqueta de cartón colgada con su cordel, con el contador que sube hasta 5000 (o.cuenta)
  const [cx, cy] = geo.contador, a = Math.sin(t * 1.6) * 1.5;
  R.linea(cx, cy - 40, cx + Math.round(a), cy - 22, hex('#8a6a3a'));
  R.poligono([[cx - 38 + a, cy - 22], [cx + 38 + a, cy - 22], [cx + 38 + a, cy + 18], [cx - 30 + a, cy + 18], [cx - 38 + a, cy + 10]], (x, y) => b_tono(b_rp('#b08850', '#c8a068', '#dcb880'), 1.2 + h(x >> 1, y >> 1, 87) * 0.9, x, y));
  R.linea(cx - 38 + a, cy - 22, cx + 38 + a, cy - 22, hex('#e8c890')); R.anillo(cx + a, cy - 16, 2.5, hex('#5a3a1a'));
  R.numero(String(Math.round(Math.min(1, cu) * 5000)), Math.round(cx + a), cy + 10, { centro: true, tam: 16, rampa: [hex('#3a1a0a'), hex('#5a2a12')] });
  return {};
};

// una lámpara de aceite de barro sobre su pie (la llama la pone b_llama)
function b_lampara(R, x, y) {
  R.rect(x - 1, y + 2, x + 1, y + 12, hex('#6a4a2a')); R.rect(x - 4, y + 12, x + 4, y + 13, hex('#4a3018'));
  R.poligono([[x - 6, y], [x + 4, y], [x + 7, y - 2], [x + 4, y + 2], [x - 5, y + 2]], hex('#a0603a')); R.linea(x - 6, y, x + 4, y, hex('#c8804a')); R.pset(x - 2, y, hex('#3a2010'));
}

// un panel dorado de capilla, grande y con relieves (NUESTRO): marco de cuentas, el pájaro con las alas abiertas, el
// ojo, el sol y una flecha roja pintada de montaje; reves: dado la vuelta (los relieves cabeza abajo, la flecha mal)
function b_panelGrande(R, x0, y0, x1, y1, reves, k = 0) {
  const W = x1 - x0, H = y1 - y0, P = (u, v) => reves ? [Math.round(x1 - u * W), Math.round(y1 - v * H)] : [Math.round(x0 + u * W), Math.round(y0 + v * H)];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, b_tono(B_ORO, 3.6 + h(x >> 1, y >> 1, k) * 0.6 + (((x + y) % 11) === 0 ? 0.8 : 0) - (x - x0) / W * 0.6, x, y));
  // el marco de cuentas y la moldura
  for (let x = x0; x <= x1; x++) for (const y of [y0 + 2, y1 - 2]) R.pset(x, y, x % 3 ? B_ORO[6] : B_ORO[1]);
  for (let y = y0; y <= y1; y++) for (const x of [x0 + 2, x1 - 2]) R.pset(x, y, y % 3 ? B_ORO[6] : B_ORO[1]);
  for (const [a, b, c, d] of [[x0, y0, x1, y0], [x0, y1, x1, y1], [x0, y0, x0, y1], [x1, y0, x1, y1]]) R.linea(a, b, c, d, B_ORO[0]);
  // relieve: luz arriba a la izquierda y sombra abajo a la derecha (se da la vuelta con el panel)
  const rel = (pts, lado) => { const Q = pts.map(([u, v]) => P(u, v)); R.poligono(Q, b_oro(4.4, k + lado)); for (let i = 0; i < Q.length; i++) { const a = Q[i], b = Q[(i + 1) % Q.length]; R.linea(a[0], a[1], b[0], b[1], (a[1] + b[1]) / 2 < (Q.reduce((s, q) => s + q[1], 0) / Q.length) ? B_ORO[6] : B_ORO[1]); } };
  // el pájaro con las alas abiertas (arriba), el ojo (en medio) y el sol (abajo)
  rel([[0.5, 0.12], [0.56, 0.2], [0.9, 0.16], [0.86, 0.24], [0.58, 0.3], [0.54, 0.38], [0.46, 0.38], [0.42, 0.3], [0.14, 0.24], [0.1, 0.16], [0.44, 0.2]], 1);
  for (let i = 0; i < 6; i++) { const [a, b] = P(0.16 + i * 0.05, 0.19), [c, d] = P(0.2 + i * 0.05, 0.25); R.linea(a, b, c, d, B_ORO[1]); const [e, f] = P(0.84 - i * 0.05, 0.19), [g, j] = P(0.8 - i * 0.05, 0.25); R.linea(e, f, g, j, B_ORO[1]); }
  rel([[0.3, 0.55], [0.4, 0.48], [0.6, 0.48], [0.7, 0.55], [0.6, 0.6], [0.4, 0.6]], 2);
  { const [a, b] = P(0.5, 0.54); R.disco(a, b, Math.max(2, W * 0.035), hex('#2a4a9a')); R.disco(a, b, Math.max(1, W * 0.015), B_ORO[0]); const [c, d] = P(0.62, 0.6), [e, f] = P(0.64, 0.68); R.linea(c, d, e, f, B_ORO[1]); }
  { const [a, b] = P(0.5, 0.8); R.disco(a, b, W * 0.09, b_oro(4.6, k + 3)); R.anillo(a, b, W * 0.09, B_ORO[1]); for (let i = 0; i < 12; i++) { const an = i / 12 * Math.PI * 2; R.linea(a + Math.cos(an) * W * 0.11, b + Math.sin(an) * W * 0.11, a + Math.cos(an) * W * 0.14, b + Math.sin(an) * W * 0.14, B_ORO[2]); } }
  // la flecha roja de montaje (pintada por el carpintero: «esto va arriba»)
  { const [a, b] = P(0.92, 0.62), [c, d] = P(0.92, 0.36), [e, f] = P(0.89, 0.42), [g, j] = P(0.95, 0.42); R.linea(a, b, c, d, hex('#c8302a')); R.linea(a + 1, b, c + 1, d, hex('#c8302a')); R.linea(c, d, e, f, hex('#c8302a')); R.linea(c, d, g, j, hex('#c8302a')); }
}

// ─ capillas (general): obreros antiguos montan las capillas doradas alrededor del sarcófago ─
B_VISTAS['capillas.general'] = (R, t, o, geo) => {
  const pn = o.panel ?? 0;
  b_capa(R, 'capillas', () => {
    b_techo(R, [[0, 0], [319, 0], [319, 46], [0, 46]], 90);
    b_paredNorte(R, 0, 46, 319, 132, 2);
    b_losas(R, 133, 179, 160, 90, 91); R.rect(0, 132, 319, 132, hex('#3a2a1c'));
    // los paneles de repuesto apoyados en la pared izquierda (de canto, dorados) y los rodillos de madera en el suelo
    for (let i = 0; i < 4; i++) { const x = 14 + i * 7; R.poligono([[x, 152], [x + 6, 152], [x + 16, 96], [x + 10, 96]], b_oro(2.8 + i * 0.4, 92 + i)); R.linea(x + 6, 152, x + 16, 96, B_ORO[0]); }
    for (const [x, y] of [[48, 160], [76, 164], [100, 158]]) { R.rect(x, y - 3, x + 24, y + 3, hex('#7a5230')); R.rect(x, y - 3, x + 24, y - 3, hex('#a87a48')); R.disco(x + 24, y, 3.5, hex('#c49a64')); R.anillo(x + 24, y, 3.5, hex('#5a3a20')); R.pset(x + 24, y, hex('#5a3a20')); }
    // la capilla a medio montar: el panel de atrás, el poste de la izquierda y la viga curva del techo
    b_panelGrande(R, 108, 84, 212, 150, false, 93);
    R.rect(104, 80, 108, 152, B_ORO[3]); R.rect(104, 80, 104, 152, B_ORO[0]); R.rect(105, 80, 105, 152, B_ORO[6]);
    for (let x = 102; x <= 216; x++) { const y = Math.round(80 - Math.sin((x - 102) / 114 * Math.PI) * 6); R.rect(x, y, x, y + 3, B_ORO[4]); R.pset(x, y, B_ORO[6]); R.pset(x, y + 4, B_ORO[0]); }
    // EL SARCÓFAGO CERRADO dentro
    b_sarcofago(R, 120, 112, 200, 150, 0, 94);
    // el andamio de la polea a la derecha (dos palos atados y la rueda arriba)
    R.linea(236, 156, 268, 60, hex('#5a3a20')); R.linea(237, 156, 269, 60, hex('#8a6438')); R.linea(300, 156, 268, 60, hex('#5a3a20')); R.linea(301, 156, 269, 60, hex('#8a6438'));
    R.linea(250, 114, 286, 114, hex('#7a5230')); for (let i = 0; i < 4; i++) R.pset(267 + i, 62 + i, hex('#c8a060'));
    R.disco(268, 62, 5, hex('#6a4a2a')); R.disco(268, 62, 3, hex('#9a7040')); R.pset(268, 62, hex('#2a1a10'));
    // un cesto con cuerdas y un capazo de herramientas
    b_cesta(R, 304, 166, 10, 10, 95); for (let a = 0; a < 3; a++) R.anillo(224, 168 - a, 7 - a * 2, hex('#a08050'));
  });
  // EL PANEL que sube por las cuerdas y se encaja AL REVÉS a la derecha de la capilla (o.panel)
  const up = Math.min(1, pn / 0.6), lado = Math.max(0, (pn - 0.6) / 0.4), pw = 23 * 2, px = Math.round(268 - lado * 40), base = Math.round(154 - up * 40 + lado * 36 + (up < 1 ? Math.sin(t * 4) : 0));
  const top = base - 62;
  R.linea(268, 62, px - 10, top, hex('#c8a060')); R.linea(268, 62, px + 10, top, hex('#c8a060')); R.linea(272, 64, 296, 152, hex('#c8a060'));
  if (pn > 0) { R.linea(px - 10, top, px + 10, top, hex('#8a6a3a')); PIEZAS_TU.panelCapilla(R, px, base, { s: 2, reves: true }); }
  else PIEZAS_TU.panelCapilla(R, 268, 154, { s: 2, reves: true });
  // las lámparas de aceite y su luz que tiembla
  const f = b_tiembla(t), g = b_tiembla(t, 2), L = [[34, 136], [176, 168], [314, 140]];
  b_luz(R, [[34, 126, 140 * f, 0.7, 0.8], [160, 150, 170 * g, 0.75, 0.7], [300, 128, 120 * f, 0.6, 0.8]], 0.3, [1.12, 0.92, 0.66]);
  b_lampara(R, 34, 136); b_llama(R, 32, 135, t, 1, 0.9); b_lampara(R, 300, 140); b_llama(R, 298, 139, t, 3, 0.9);
  b_motas(R, t, 100, 70, 240, 150, 14, hex('#f0d090'), 7);
  return { panel: [px - pw / 2, top, px + pw / 2, base], polea: [268, 62], cuerda: [296, 152], lamparas: [[34, 136], [300, 140]] };
};
B_DELANTE['capillas.general'] = (R, t, o) => {
  // la lámpara del suelo en primer término, con su llama
  b_lampara(R, 160, 168); b_llama(R, 158, 167, t, 5, 1);
};

// ─ capillas (cámara 'panel'): el panel dorado de cerca, montado AL REVÉS ─
B_VISTAS['capillas.panel'] = (R, t, o, geo) => {
  const [x0, y0, x1, y1] = geo.panel, duda = o.duda ?? 0;
  b_capa(R, 'panelCerca', () => {
    // al fondo, los paneles ya montados (al derecho) y entre ellos la pared pintada en sombra
    b_paredNorte(R, -60, 20, 380, 220, 3);
    b_panelGrande(R, -120, 30, 50, 190, false, 96); b_panelGrande(R, 270, 30, 440, 190, false, 97);
    b_panelGrande(R, x0, y0, x1, y1, true, 98);
    b_velo(R, 256, 0, 319, 48, hex('#1a1210'), 0.7);
    for (let x = x0 + 2; x <= x1 + 6; x++) if (x % 2) R.pset(x, y1 + 2, hex('#2a1a10'));
  });
  // las cuerdas que lo sujetan desde arriba
  for (const x of [x0 + 20, x1 - 20]) R.linea(x, y0, x + Math.round(Math.sin(t * 1.2) * 2), 0, hex('#c8a060'));
  const f = b_tiembla(t);
  b_luz(R, [[40, 200, 260 * f, 0.9, 0.8], [300, 40, 160, 0.3, 0.8]], 0.32, [1.12, 0.92, 0.66]);
  // los brillos que corren por el relieve
  for (let i = 0; i < 6; i++) { const u = ((t * 0.4 + i / 6) % 1), x = Math.round(x0 + 20 + u * (x1 - x0 - 40)), y = Math.round(y0 + 20 + h(i, 1, 99) * (y1 - y0 - 40)); R.pset(x, y, C.blanco); R.pset(x - 1, y, C.oroL); R.pset(x + 1, y, C.oroL); }
  // las dos manos del obrero que lo empujan; con o.duda, la derecha se va (a rascarse la cabeza) y sale la «?»
  brazo(R, x0 - 10, 220, x0 + 6, y1 - 16, '#a0603a', 1, { codo: [x0 - 6, 184] });
  if (duda < 0.3) brazo(R, x1 + 10, 220, x1 - 6, y1 - 16, '#a0603a', -1, { codo: [x1 + 6, 184] });
  else { const u = Math.min(1, (duda - 0.3) / 0.3), wy = Math.round(y1 - 16 + u * 60); if (wy < 196) brazo(R, x1 + 30, 240, x1 + 20, wy, '#a0603a', -1, { codo: [x1 + 34, 210] }); }
  if (duda > 0.5) { const b = Math.round(Math.sin(t * 5) * 1.5); R.icono('?', x1 - 26, 18 + b, C.oroL, C.k, 3); }
  return {};
};

// el cielo tramado de mediodía con nubes de tres tonos a dos velocidades (la esquina de Atom, lisa) y los pájaros
const B_VACIO = hex('#010203');

function b_cieloDia(R, t, y1) {
  const libre = (x, y) => R.pget(x, y) === B_VACIO;
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) if (libre(x, y)) R.pset(x, y, b_tono(b_rp('#6aa8e0', '#84bae8', '#a0ccee', '#bcdcf2', '#d8eaf4'), y / y1 * 3.2 + 0.4, x, y));
  for (const [x0, y, w, v, k] of [[20, 30, 56, 1.4, 0], [150, 36, 44, 0.8, 1], [250, 52, 50, 1.1, 2], [90, 50, 30, 1.8, 3]]) { const cx = ((x0 + t * v) % 400) - 40;
    for (let i = 0; i < w; i++) { const e = Math.sin(i / w * Math.PI), al = Math.round(e * 6 + h(i >> 2, k, 140) * 2); for (let j = 0; j < al; j++) { const x = Math.round(cx + i), yy = y - j; if ((x > 268 && yy < 46) || x < 0 || x > 319 || !b_esCielo(R, x, yy)) continue; R.pset(x, yy, j === 0 ? hex('#b8cce0') : j < al - 2 ? hex('#e8f0f8') : hex('#ffffff')); } } }
  for (let k = 0; k < 3; k++) { const u = ((t * 0.04 + k * 0.33) % 1), x = Math.round(330 - u * 360), y = Math.round(50 + k * 6 + Math.sin(t + k) * 3), a = Math.sin(t * 8 + k) > 0 ? 1 : 0; if (y > 44 || x < 268) { R.pset(x, y, hex('#3a3a4a')); R.pset(x - 1, y - a, hex('#3a3a4a')); R.pset(x + 1, y - a, hex('#3a3a4a')); } }
}

// ¿es cielo? (el tono azul del degradado: lo que no es acantilado ni toldo)
const b_esCielo = (R, x, y) => { const p = R.pget(x, y), r = p & 255, b = (p >> 16) & 255; return b > r + 30; };

// los acantilados de la necrópolis al fondo (caliza ocre y rosada en estratos) con el pico de pirámide a la izquierda
function b_acantilados(R, y0, y1, k = 0) {
  const rp = b_rp('#a8805c', '#c49a70', '#d8b48a', '#e8c8a0', '#f4dcb8');
  for (let x = 0; x < 320; x++) { const top = Math.round(Math.min(y0 + 16 + Math.sin(x * 0.03) * 6 + h(x >> 3, 0, k) * 4, x < 120 ? y0 + Math.abs(x - 60) * 0.55 : 999));
    for (let y = top; y <= y1; y++) R.pset(x, y, b_tono(rp, 1.8 + (Math.sin(y * 0.6 + Math.sin(x * 0.05) * 2) > 0.7 ? -0.7 : 0) + h(x >> 1, y >> 2, k + 1) * 0.8 - (x > 60 && x < 120 && y < y0 + 40 ? 0.6 : 0) + (y - top < 2 ? 1 : 0), x, y)); }
}
B_VISTAS['escriba.general'] = (R, t, o, geo) => {
  b_capa(R, 'escriba', () => {
    R.llenar(B_VACIO);
    // el patio: el muro de adobe con su puerta, los estantes con vasos y cofres a medio pintar, el suelo de tierra
    b_acantilados(R, 34, 96, 100);
    for (let y = 80; y < 134; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 80) / 5), jh = (y - 80) % 5 === 0, jv = (x + (f % 2) * 6) % 12 === 0;
      R.pset(x, y, jh || jv ? hex('#8a6a48') : b_tono(b_rp('#a07a56', '#b88e66', '#cca276', '#dcb486'), 1.6 + h((x + (f % 2) * 6) / 12 | 0, f, 101) * 1.1 + h(x, y, 102) * 0.3, x, y)); }
    // la puerta del muro: fuera, la calle al sol (tierra clara, la casa de enfrente y su sombra)
    for (let y = 92; y <= 134; y++) for (let x = 28; x <= 56; x++) R.pset(x, y, y < 112 ? b_tono(b_rp('#c8a478', '#dcb88a', '#ecd0a4'), 1.2 + h(x >> 1, y >> 1, 107) * 0.8, x, y) : b_tono(b_rp('#d0b080', '#e4c898', '#f0dcb0'), 1.4 + h(x, y, 108) * 0.6, x, y));
    R.rect(28, 108, 56, 111, hex('#a88458')); R.rect(40, 96, 46, 107, hex('#6a4a30')); R.rect(28, 92, 56, 93, hex('#5a3a22'));
    R.rect(26, 90, 58, 91, hex('#7a5230')); R.rect(26, 90, 27, 134, hex('#7a5a3a')); R.rect(57, 90, 58, 134, hex('#5a3a22'));
    // la tinaja de agua en su soporte, una escoba de palma y cacharros secándose al sol junto al muro
    R.rect(66, 128, 84, 130, hex('#6a4a2a')); for (const x of [67, 82]) R.rect(x, 130, x + 1, 138, hex('#5a3a20'));
    b_jarra(R, 75, 128, 22, 1, 109); R.disco(75, 118, 7, b_mez(hex('#c8804a'), hex('#a0603a'), 0.5));
    for (let y = 106; y < 136; y++) { const r = Math.round(10 * Math.sin((y - 106) / 30 * Math.PI) * 0.7 + 4); for (let i = -r; i <= r; i++) R.pset(75 + i, y, Math.abs(i) === r ? hex('#6a3a1c') : b_tono(b_rp('#8a4a24', '#a8603a', '#c8804a', '#dca070'), 2.2 - i / r * 1.4, 75 + i, y)); }
    R.linea(8, 150, 18, 104, hex('#8a6a3a')); for (let i = 0; i < 7; i++) R.linea(7 + i, 152, 4 + i * 2, 160, hex('#c4a060'));
    for (const [x, b] of [[176, 152], [186, 154]]) { b_jarra(R, x, b, 12, 0, x); for (let y = b - 9; y < b - 4; y++) R.pset(x, y, hex('#c8402a')); }
    R.rect(0, 80, 319, 81, hex('#e8c8a0'));
    for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, b_tono(b_rp('#8a6a44', '#a88458', '#c09c6c', '#d4b282'), 1.6 + h(x >> 2, y >> 1, 103) * 0.8 + h(x, y, 104) * 0.4 + (y - 134) / 46 * 0.5, x, y));
    for (let i = 0; i < 60; i++) { const x = Math.round(h(i, 1, 105) * 319), y = Math.round(138 + h(i, 2, 105) * 40); R.linea(x, y, x + 3, y - 1, hex('#d8c070')); }
    // los estantes con los vasos y cofrecillos a medio pintar y los botes de pigmento
    for (const y of [104, 124]) { R.rect(196, y, 312, y + 2, hex('#7a5230')); R.rect(196, y, 312, y, hex('#a87a48')); for (const x of [200, 306]) R.rect(x, y + 3, x + 2, y + 6, hex('#5a3a20')); }
    for (const [x, y, al, tp] of [[206, 104, 14, 1], [222, 104, 12, 0], [270, 104, 16, 2]]) b_jarra(R, x, y, al, tp, x);
    R.rect(236, 94, 260, 104, hex('#e8dcc0')); R.rect(236, 94, 248, 104, hex('#c8402a')); R.rect(236, 94, 260, 94, hex('#f4ecd8')); R.linea(248, 94, 248, 104, hex('#7a6a50'));
    for (const [x, c] of [[206, '#e0a848'], [218, '#2a4a9a'], [230, '#3a8a5a'], [242, '#1a1a1a'], [254, '#c8402a'], [266, '#f4f0e4']]) { R.rect(x, 116, x + 8, 124, hex('#a0603a')); R.rect(x + 1, 116, x + 7, 117, hex(c)); R.rect(x, 116, x + 8, 116, hex('#c8804a')); }
    PIEZAS_TU.cofre(R, 292, 124, { s: 1, cartucho: false });
    // el soporte bajo del cofre y la piedra de moler del aprendiz
    R.rect(136, 142, 164, 145, hex('#7a5230')); R.rect(136, 142, 164, 142, hex('#a87a48')); R.rect(138, 146, 141, 154, hex('#5a3a20')); R.rect(159, 146, 162, 154, hex('#5a3a20'));
    R.poligono([[236, 156], [262, 152], [264, 158], [238, 160]], hex('#8a8478')); R.linea(236, 156, 262, 152, hex('#b8b0a0')); R.disco(250, 152, 3, hex('#6a6458'));
    // los postes del toldo de cañas
    for (const x of [96, 314]) { R.rect(x, 58, x + 3, 154, hex('#6a4a2a')); R.rect(x, 58, x, 154, hex('#9a7040')); }
  });
  b_cieloDia(R, t, 55);
  // el toldo de cañas (con su borde que el viento mece) y su sombra con puntitos de sol que se mueven
  const vt = Math.sin(t * 1.6) * 1.5;
  for (let x = 96; x < 320; x++) { for (let y = 56; y < 63; y++) R.pset(x, y, (x % 3 === 0) ? hex('#8a7040') : (y === 56 ? hex('#e8d090') : hex('#c4a860'))); const l = 63 + Math.round(Math.sin(x * 0.7 + t * 2) * vt * 0.5 + (x % 5 === 0 ? 2 : 0)); R.rect(x, 63, x, l, hex('#a88848')); }
  for (let y = 64; y < 154; y++) for (let x = 100; x < 320; x++) if ((x + y) % 2 === 0) { const sol = h((x + Math.round(t * 2)) >> 2, y >> 2, 106) > 0.94; R.pset(x, y, sol ? b_mez(R.pget(x, y), hex('#fff0c0'), 0.5) : b_mez(R.pget(x, y), hex('#2a1a20'), 0.28)); }
  // una cabra que pasa por la puerta del muro (recortada a la puerta)
  R.recorte([28, 92, 56, 133]); { const u = (t * 0.08) % 1, x = Math.round(20 + u * 50), y = 126; R.rect(x, y - 6, x + 9, y - 2, hex('#e8e0d0')); R.rect(x + 9, y - 9, x + 12, y - 5, hex('#e8e0d0')); R.pset(x + 11, y - 10, hex('#5a4a3a')); for (const lx of [x + 1, x + 7]) R.linea(lx, y - 2, lx + (Math.sin(t * 8) > 0 ? 1 : 0), y, hex('#5a4a3a')); } R.recorte(null);
  // el cofre del escriba con su cartucho (o.cartucho: 'sol' | 'ankh' | 'raspado' | 'nuevo' | false)
  if (o.cofre !== false) PIEZAS_TU.cofre(R, geo.cofre[0], 142, { s: 1, cartucho: o.cartucho ?? 'sol' });
  b_motas(R, t, 100, 70, 310, 150, 12, hex('#fff4d0'), 8);
  return {};
};
B_DELANTE['escriba.general'] = (R, t, o) => {
  // la mesa baja con los botes de pigmento (ocre, azul, verde, negro), los pinceles de junco y una paleta de piedra
  const M = b_rp('#3a2414', '#5a3a20', '#7a5230', '#9a6a3c', '#c8925a');
  R.rect(56, 160, 118, 164, M[2]); R.rect(56, 160, 118, 160, M[4]); R.rect(56, 164, 118, 165, M[0]); for (const x of [58, 114]) R.rect(x, 166, x + 2, 176, M[1]);
  for (const [x, c] of [[62, '#e0a848'], [72, '#2a4a9a'], [82, '#3a8a5a'], [92, '#1a1a1a']]) { R.rect(x, 153, x + 7, 160, hex('#a0603a')); R.rect(x + 1, 153, x + 6, 154, hex(c)); R.rect(x, 153, x + 7, 153, hex('#c8804a')); if (Math.sin(t * 2 + x) > 0.9) R.pset(x + 3, 153, C.blanco); }
  R.rect(100, 156, 114, 159, hex('#d8d0c0')); for (const [x, c] of [[102, '#c8402a'], [106, '#2a4a9a'], [110, '#e0a848']]) R.disco(x, 157, 1.2, hex(c));
  for (let i = 0; i < 3; i++) R.linea(64 + i * 4, 150, 70 + i * 5, 140 - i, hex('#c8a060'));
};

// ─ escriba (cámara 'cartucho'): el cartucho de la tapa de cerca, raspado y repintado ─
// los iconos de un cartucho (NUESTROS, sin letras), en (cx, cy) con tamaño s: 'pluma', 'sol', 'escarabajo', 'ankh', 'cesta'
function b_iconoCartucho(R, tipo, cx, cy, s, col) {
  const K = col ?? hex('#1a1a2a');
  if (tipo === 'pluma') { R.poligono([[cx - 2 * s, cy + 8 * s], [cx, cy - 8 * s], [cx + 3 * s, cy - 6 * s], [cx + 2 * s, cy + 8 * s]], col ?? hex('#3a8a5a')); R.linea(cx, cy - 8 * s, cx, cy + 9 * s, K); }
  if (tipo === 'sol') { R.disco(cx, cy, 5 * s, col ?? hex('#c8402a')); R.anillo(cx, cy, 5 * s, K); }
  if (tipo === 'escarabajo') { R.disco(cx, cy + s, 4 * s, col ?? hex('#2a4a9a')); R.disco(cx, cy - 4 * s, 2 * s, col ?? hex('#2a4a9a')); R.linea(cx, cy - 3 * s, cx, cy + 5 * s, K); for (const d of [-1, 1]) for (let i = 0; i < 3; i++) R.linea(cx + d * 4 * s, cy - 2 * s + i * 3 * s, cx + d * 7 * s, cy - 3 * s + i * 3 * s, K); }
  if (tipo === 'ankh') { R.anillo(cx, cy - 5 * s, 3 * s, col ?? hex('#2a4a9a')); R.anillo(cx, cy - 5 * s, 3 * s - 1, col ?? hex('#2a4a9a')); R.rect(cx - 1, cy - 2 * s, cx + 1, cy + 8 * s, col ?? hex('#2a4a9a')); R.rect(cx - 5 * s, cy - 1, cx + 5 * s, cy + 1, col ?? hex('#2a4a9a')); }
  if (tipo === 'cesta') { R.poligono([[cx - 6 * s, cy], [cx + 6 * s, cy], [cx + 4 * s, cy + 5 * s], [cx - 4 * s, cy + 5 * s]], col ?? hex('#3a8a5a')); R.linea(cx - 6 * s, cy, cx + 6 * s, cy, K); }
}
B_VISTAS['escriba.cartucho'] = (R, t, o, geo) => {
  const [x0, y0, x1, y1] = geo.cartucho, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rx = (x1 - x0) / 2, ry = (y1 - y0) / 2, ras = o.raspa ?? 0, pin = o.pinta ?? 0;
  b_capa(R, 'cartucho', () => {
    // la mesa de trabajo alrededor y la tapa del cofre: estuco crema con su cenefa de cuadritos y el oro del borde
    b_mesa(R, 110);
    R.rect(14, 12, 306, 168, hex('#3a2414'));
    for (let y = 14; y <= 166; y++) for (let x = 16; x <= 304; x++) R.pset(x, y, b_tono(b_rp('#c8b48a', '#dccaa2', '#ecdcb8', '#f6ead0'), 2 + h(x >> 1, y >> 1, 111) * 0.8 + h(x, y, 112) * 0.3 - (y - 14) / 152 * 0.4, x, y));
    for (let x = 16; x <= 304; x++) for (const y of [20, 21, 22, 158, 159, 160]) R.pset(x, y, ((x >> 2) + y) % 2 ? hex('#2a4a9a') : hex('#c8402a'));
    for (let x = 16; x <= 304; x++) { R.pset(x, 24, B_ORO[4]); R.pset(x, 156, B_ORO[4]); }
    // las flores de loto pintadas a los lados del cartucho y el sol con alas encima
    for (const [lx, d] of [[44, 1], [276, -1]]) for (let i = 0; i < 3; i++) { const by = 60 + i * 34; R.linea(lx, by + 22, lx, by + 6, hex('#3a8a5a')); R.poligono([[lx - 7, by + 6], [lx, by - 4], [lx + 7, by + 6]], hex('#2a4a9a')); R.poligono([[lx - 4, by + 6], [lx, by - 1], [lx + 4, by + 6]], hex('#6a90e0')); R.linea(lx - 7, by + 6, lx + 7, by + 6, hex('#1a2a5a')); R.disco(lx + d * 6, by + 18, 2, hex('#c8402a')); }
    R.disco(160, 38, 5, hex('#c8402a')); R.anillo(160, 38, 5, hex('#3a1a10')); for (let i = 1; i < 34; i++) { const yy = 37 + Math.round(i * 0.12); for (const d of [-1, 1]) { R.pset(160 + d * (6 + i), yy, i % 3 ? hex('#2a4a9a') : hex('#3ab0a8')); R.pset(160 + d * (6 + i), yy + 1, B_ORO[3]); R.pset(160 + d * (6 + i), yy + 2, i % 2 ? hex('#3a8a5a') : B_ORO[2]); } }
    // la esquina de Atom, gastada y tranquila (la pintura casi se ha ido)
    b_velo(R, 268, 16, 319, 27, hex('#e8d8b4'), 0.8);
    // el óvalo del cartucho: el anillo de oro grueso con su nudo abajo, el fondo de estuco
    for (let y = y0 - 6; y <= y1 + 6; y++) for (let x = x0 - 6; x <= x1 + 6; x++) { const d = Math.hypot((x - cx) / (rx + 4), (y - cy) / (ry + 4)); if (d <= 1) R.pset(x, y, d > 0.9 ? (d > 0.96 ? B_ORO[0] : b_tono(B_ORO, 4.5 - (y - cy) / ry, x, y)) : b_tono(b_rp('#e0d0a8', '#ecdfbc', '#f6ecd4'), 1.4 + h(x, y, 113) * 0.6, x, y)); }
    R.rect(cx - 30, y1 + 4, cx + 30, y1 + 8, B_ORO[3]); R.rect(cx - 30, y1 + 4, cx + 30, y1 + 4, B_ORO[5]);
    // un bote de pigmento y un pincel de junco en la mesa, abajo a la derecha
    R.rect(276, 170, 290, 179, hex('#a0603a')); R.rect(277, 170, 289, 171, hex('#2a4a9a'));
  });
  // los iconos del nombre de OTRA persona (pluma, sol, escarabajo), que la cuchilla raspa de izquierda a derecha
  const ix = [cx - 38, cx, cx + 38], xr = x0 + ras * (x1 - x0);
  R.recorte([Math.round(xr), 0, 319, 179]); ['pluma', 'sol', 'escarabajo'].forEach((n, i) => b_iconoCartucho(R, n, ix[i], cy, 2)); R.recorte(null);
  // lo raspado: el yeso blanco con los rayones y el borde de lo que había
  if (ras > 0) { for (let y = y0 + 6; y < y1 - 6; y++) for (let x = x0 + 8; x < Math.min(xr, x1 - 8); x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d < 0.86) R.pset(x, y, (x * 2 + y) % 7 === 0 ? hex('#d8d0c0') : (h(x, y, 114) > 0.9 ? hex('#c8bca4') : hex('#f8f6ee'))); }
    R.recorte([x0, 0, Math.round(xr), 179]); ['pluma', 'sol', 'escarabajo'].forEach((n, i) => { for (let k = 0; k < 40; k++) { const px = Math.round(ix[i] + (h(k, 1, 115 + i) - 0.5) * 22), py = Math.round(cy + (h(k, 2, 115 + i) - 0.5) * 30); if (h(k, 3, 115) > 0.4) R.pset(px, py, hex('#a89880')); } }); R.recorte(null); }
  // lo nuevo: sol, ankh y cesta (el nombre de Tutankamón) que el pincel pinta uno tras otro (o.pinta)
  ['sol', 'ankh', 'cesta'].forEach((n, i) => { const u = pin * 3 - i; if (u <= 0) return; R.recorte([0, 0, Math.round(ix[i] - 14 + Math.min(1, u) * 28), 179]); b_iconoCartucho(R, n, ix[i], cy - (n === 'cesta' ? 2 : 0), 2); R.recorte(null); });
  // la luz del toldo: franjas de sombra de las cañas que se mecen
  const m = Math.round(Math.sin(t * 0.9) * 3);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (((x + y * 0.6 + m) % 22) < 7 && (x + y) % 2 === 0) R.pset(x, y, b_mez(R.pget(x, y), hex('#3a2418'), 0.22));
  // la cuchilla de cobre que raspa (con la mano), las virutas que caen
  if (ras > 0 && ras < 1) { const bx = Math.round(xr), by = Math.round(cy + Math.sin(t * 14) * 14);
    for (let i = 0; i < 8; i++) { const u = ((t * 1.5 + i / 8) % 1), vx = bx - 4 + (h(i, 1, 116) - 0.5) * 16, vy = by + 6 + u * 60; R.pset(Math.round(vx), Math.round(vy), (i % 2) ? hex('#e0a848') : hex('#f4f0e4')); }
    R.poligono([[bx - 2, by - 8], [bx + 3, by - 8], [bx + 3, by + 8], [bx - 2, by + 6]], hex('#c87a3a')); R.linea(bx - 2, by - 8, bx - 2, by + 6, hex('#f0b070')); R.linea(bx + 3, by - 8, bx + 3, by + 8, hex('#7a4018'));
    // el mango de madera de la cuchilla, largo, hasta la mano
    R.linea(bx, by + 7, bx - 12, by + 30, hex('#3a2414')); R.linea(bx + 1, by + 7, bx - 11, by + 30, hex('#8a5a30')); R.linea(bx + 2, by + 7, bx - 10, by + 30, hex('#5a3a1c'));
    brazo(R, bx - 40, 236, bx - 26, by + 34, '#a0603a', 1, { codo: [bx - 46, by + 74] }); }
  // el pincel de junco con la punta mojada, que pinta
  if (pin > 0 && pin < 1) { const i = Math.min(2, Math.floor(pin * 3)), u = pin * 3 - i, px = Math.round(ix[i] - 14 + u * 28), py = Math.round(cy + Math.sin(t * 10) * 8);
    R.linea(px, py, px + 22, py + 30, hex('#c8a060')); R.linea(px + 1, py, px + 23, py + 30, hex('#8a6a3a')); R.rect(px - 1, py - 1, px + 1, py + 1, ['#c8402a', '#2a4a9a', '#3a8a5a'].map(hex)[i]);
    brazo(R, px + 70, 240, px + 30, py + 36, '#a0603a', -1, { codo: [px + 62, py + 80] }); }
  return {};
};

// ── EL MUSEO Y EL SARCÓFAGO ─────────────────────────────────────────────────────────────────────────────────────
// ─ máscara (general): LA MÁSCARA DE ORO en su vitrina, en la sala del museo en penumbra ─
B_VISTAS['mascara.general'] = (R, t, o, geo) => {
  const [mx, my] = geo.mascara, br = o.brillo ?? ((t * 0.12) % 1);
  b_capa(R, 'museo', () => {
    // la sala: pared de estuco azul oscuro con zócalo, columnas, la puerta a la sala de al lado y el suelo pulido
    for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, b_tono(b_rp('#0e1226', '#151a34', '#1c2242', '#242c52'), 1.2 + h(x >> 2, y >> 2, 120) * 0.7 + (y > 120 ? -0.8 : 0), x, y));
    for (const x of [8, 78, 236]) { R.rect(x, 20, x + 12, 132, hex('#2a3058')); R.rect(x, 20, x + 2, 132, hex('#3a4272')); R.rect(x + 11, 20, x + 12, 132, hex('#141830')); R.rect(x - 2, 128, x + 14, 132, hex('#3a4272')); R.rect(x - 2, 18, x + 14, 22, hex('#3a4272')); }
    R.rect(250, 60, 290, 132, hex('#3a2e24')); R.rect(253, 63, 287, 132, hex('#6a5038')); for (let y = 64; y < 132; y++) for (let x = 254; x < 287; x++) if ((x + y) % 3 === 0) R.pset(x, y, hex('#8a6a48'));
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, b_tono(b_rp('#0c0e1c', '#141830', '#1e2444', '#2a3258'), 1.4 + (y - 132) / 48 + h(x >> 3, y >> 1, 121) * 0.5 + (((x + (y - 132) * 2) % 40) < 1 ? -1 : 0), x, y));
    // las vitrinas pequeñas de los lados con jarras y cajitas (siluetas)
    for (const [x0, x1] of [[24, 70], [200, 232]]) { R.rect(x0, 112, x1, 150, hex('#2a2018')); R.rect(x0, 112, x1, 112, hex('#4a3a2a')); for (let y = 76; y < 112; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 2 === 0) R.pset(x, y, hex('#2a3a5a')); R.rect(x0, 76, x1, 76, hex('#8aa0c8'));
      b_jarra(R, x0 + 10, 111, 18, 1, x0); b_jarra(R, x0 + 24, 111, 12, 0, x0 + 1); R.rect(x1 - 12, 104, x1 - 4, 111, B_ORO[2]); }
    // el pedestal de la máscara: madera oscura con su peana de terciopelo azul
    R.rect(112, 136, 208, 178, hex('#2a1c14')); R.rect(112, 136, 208, 138, hex('#5a4030')); R.rect(114, 140, 206, 176, hex('#3a2a1e')); R.rect(116, 142, 204, 142, hex('#4a3626'));
  });
  // los focos del techo: conos de luz tramada y la luz en la sala
  for (const [fx, d] of [[124, 1], [196, -1]]) for (let y = 0; y < 132; y++) { const w = 3 + y * 0.18, cx = fx + (mx - fx) * y / 132; for (let x = Math.round(cx - w); x <= cx + w; x++) if ((x + y) % 3 === 0) R.pset(x, y, b_mez(R.pget(x, y), hex('#f8f0d0'), 0.12)); }
  b_luz(R, [[mx, my + 10, 120, 0.7, 0.9], [270, 100, 50, 0.3, 1.2]], 0.55, [1.06, 1.0, 0.92]);
  // el paño azul oscuro con sus pliegues y LA MÁSCARA (NUESTRA)
  for (let y = 112; y < 138; y++) { const w = 26 + (y - 112) * 1.2; for (let x = Math.round(mx - w); x <= mx + w; x++) R.pset(x, y, b_tono(b_rp('#0e1a3a', '#1a2a5a', '#2a3e7a', '#3a52a0'), 1.6 + Math.sin((x - mx) * 0.35 + y * 0.05) * 0.9, x, y)); }
  PIEZAS_TU.mascara(R, mx, 134, { s: 3, t });
  // la vitrina de cristal: el marco de latón, el reflejo que pasa (o.brillo) y la peana
  const vx0 = 100, vx1 = 220, vy0 = 24, vy1 = 136;
  for (const [a, b, c, d] of [[vx0, vy0, vx1, vy0], [vx0, vy0, vx0, vy1], [vx1, vy0, vx1, vy1]]) { R.linea(a, b, c, d, hex('#c8a868')); R.linea(a + (a === c ? 1 : 0), b + (b === d ? 1 : 0), c + (a === c ? 1 : 0), d + (b === d ? 1 : 0), hex('#6a5430')); }
  { const bxp = vx0 - 40 + br * (vx1 - vx0 + 80); for (let y = vy0 + 2; y < vy1; y++) for (let i = 0; i < 9; i++) { const x = Math.round(bxp + i - (y - vy0) * 0.35); if (x > vx0 + 1 && x < vx1 - 1 && (i < 3 || i > 6 || (x + y) % 2 === 0)) R.pset(x, y, b_mez(R.pget(x, y), hex('#ffffff'), i < 3 ? 0.35 : 0.18)); } }
  // el reflejo de la vitrina en el suelo pulido
  for (let y = 178; y > 160; y--) for (let x = vx0; x <= vx1; x++) if ((x + y) % 3 === 0) R.pset(x, y + 0, b_mez(R.pget(x, y), hex('#c8a868'), 0.08));
  // la vida: un vigilante que pasea al fondo y un visitante que cruza la puerta de al lado (recortado a la puerta)
  { const u = Math.sin(t * 0.25), gx = Math.round(46 + u * 18), gy = 130, a = Math.sin(t * 5) > 0; R.disco(gx, gy - 12, 2, hex('#c08a64')); R.rect(gx - 2, gy - 14, gx + 2, gy - 14, hex('#1a1a2a')); R.rect(gx - 2, gy - 10, gx + 2, gy - 3, hex('#2a2a4a')); R.rect(gx - 2, gy - 2, gx - 1, gy, hex('#1a1a2a')); R.rect(gx + 1, gy - 2 - (a ? 1 : 0), gx + 2, gy, hex('#1a1a2a')); }
  R.recorte([254, 63, 286, 131]); { const u = (t * 0.1) % 1, x = Math.round(240 + u * 60), y = 131; R.disco(x, y - 13, 2.2, hex('#3a2a20')); R.rect(x - 2, y - 11, x + 2, y - 3, hex('#4a3a2a')); R.rect(x - 2, y - 2, x - 1, y, hex('#2a2018')); R.rect(x + 1, y - 2, x + 2, y, hex('#2a2018')); } R.recorte(null);
  b_motas(R, t, 110, 30, 210, 130, 10, hex('#fff6e0'), 9);
  return {};
};

// ─ máscara (cámara 'sarcofago'): EL SARCÓFAGO CERRADO de lado, con la guirnalda, a la luz de la vela ─
B_VISTAS['mascara.sarcofago'] = (R, t, o, geo) => {
  const [x0, y0, x1, y1] = geo.sarcofago, vela = o.vela ?? 1;
  b_capa(R, 'sarcofagoCerca', () => {
    b_techo(R, [[0, 0], [319, 0], [319, 46], [0, 46]], 122);
    b_paredNorte(R, -40, 46, 360, 140, 4);
    b_losas(R, 141, 179, 160, 100, 123); R.rect(0, 140, 319, 140, hex('#3a2a1c'));
    b_sarcofago(R, x0, y0, x1, y1, 6, 124);
    // la guirnalda de flores secas encima de la tapa: hojas pardas, acianos azules y bayas
    for (let i = 0; i <= 40; i++) { const u = i / 40, x = Math.round(140 + u * 44), y = Math.round(y0 - 3 + Math.sin(u * Math.PI) * 3); R.pset(x, y, hex('#6a5a2a')); R.pset(x, y - 1, i % 3 ? hex('#8a7a3a') : hex('#4a6ab0')); if (i % 5 === 0) R.pset(x, y - 2, hex('#a84a2a')); }
    // el candelero en el suelo a la derecha
    PIEZAS_TU.vela(R, 278, 166, { s: 1, apagada: true });
  });
  const f = b_tiembla(t);
  b_luz(R, [[278, 146, 230 * f * (0.6 + 0.4 * vela), 0.95 * vela + 0.2, 0.7]], 0.22 + (1 - vela) * 0.35, [1.14, 0.9, 0.62]);
  if (vela > 0) b_llama(R, 278, 147, t, 0, 1);
  b_motas(R, t, x0, y0 - 40, x1, y1, 12, hex('#f0d090'), 10);
  return {};
};


// el encuadre y la cámara que piden las opciones (un encuadre que no existe cae en 'calle'; una cámara que no es la suya,
// en 'general') y una copia de su geometría
function c_vista(o) {
  const enc = V_CAIRO[o.encuadre] ? o.encuadre : 'calle', e = V_CAIRO[enc], cam = o.camara === e.cam ? e.cam : 'general';
  return { enc, cam, geo: { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) } };
}

// la paleta del grupo: el cielo y la calima de El Cairo, el estuco de las fachadas (tres casas, tres tonos), la madera
// de las celosías, las contraventanas verdes, los toldos, la piedra de las aceras, el tranvía crema, la gente; el
// ladrillo de Londres, la niebla, el hierro de las verjas, el autobús rojo y la luz de gas
const c_P = pal({
  cielo0: '#4a86d0', cielo1: '#5e9ade', cielo2: '#82b6e8', cielo3: '#aed0ec', calima: '#e4dcc4', calimaL: '#f0e6cc',
  nube0: '#b4c6dc', nube1: '#e2eaf2', nube2: '#ffffff',
  lejos: '#c4b49e', lejosS: '#ab9c88', lejosL: '#d8cab2', lejosD: '#968a7a',
  estuco: '#e2c69a', estucoS: '#b8986c', estucoL: '#f2dab0', estucoD: '#8a6c48',
  rosa: '#dcae8a', rosaS: '#ae8062', rosaL: '#eec6a2', rosaD: '#86604a',
  ocre: '#d6b878', ocreS: '#a88c52', ocreL: '#e8d098', ocreD: '#7e6638',
  madera: '#6e4628', maderaS: '#4a2c18', maderaL: '#90603a', maderaD: '#2e1c10', celosia: '#5a3a20',
  verde: '#3e6a4e', verdeS: '#2a4a36', verdeL: '#5e8e6a',
  toldoR: '#b84a3a', toldoRS: '#8a3226', toldoC: '#efe4c8', toldoCS: '#c8b898', toldoV: '#4a7a5c', toldoVS: '#335a42',
  acera: '#cdb898', aceraS: '#a8947a', aceraL: '#e0ceb0', junta: '#8a7860',
  calzada: '#b49c7c', calzadaS: '#967e62', calzadaL: '#c8b294', rodada: '#a08a6c',
  riel: '#5a5a62', rielL: '#c0c4cc',
  tranvia: '#e8dcbc', tranviaS: '#bcb092', tranviaL: '#f8f0dc', tranviaR: '#8a3a2e', tranviaRS: '#64281f',
  cristal: '#34485c', cristalL: '#7a9ab0', cristalS: '#24323e', hueco: '#2e2018', huecoL: '#4a3424',
  fez: '#b82a2a', fezS: '#861c1c', piel: '#c88a5a', pielS: '#9a6440', galabeya: '#ebe6da', galabeyaS: '#bab4a6',
  azulG: '#5a76a0', marron: '#7a5a3e', negro: '#2a2630', traje: '#3a3a48', trajeS: '#26262f', blancoT: '#ece8dc',
  laton: '#d0a040', latonL: '#f4d47a', latonS: '#8e6a24', cobre: '#b8683a', cobreL: '#e09060',
  hierba: '#4a8a3c', hierbaS: '#2e5e28', hierbaL: '#7ab65a', tronco: '#8a7258', troncoS: '#64503c', troncoL: '#aa9274',
  sandia: '#3a7a3a', sandiaL: '#6aaa4a', saco: '#c8b088', sacoS: '#9a845e',
  gatoA: '#c8a060', gatoS: '#8e6a38', gatoR: '#5a4024', gatoL: '#e4c890', gatoOjo: '#4a8a3a',
  papel: '#ece4cc', papelS: '#c4b898', papelL: '#faf6e8', tinta: '#2a2630', tintaS: '#6a6460',
  // Londres
  ladrillo: '#6e4234', ladrilloS: '#52302a', ladrilloL: '#86523e', ladrilloD: '#3e2420', mortero: '#8c7e74',
  estucoB: '#d6d2c6', estucoBS: '#aaa69a', estucoBL: '#ecE8de', pizarra: '#4a4e5a', pizarraS: '#363a44', pizarraL: '#62687a',
  niebla: '#b6b8b4', nieblaS: '#9a9e9c', nieblaL: '#d2d2ca', nieblaD: '#868a8a',
  asfalto: '#4c4c54', asfaltoS: '#3a3a42', asfaltoL: '#68686f', losa: '#8e8c88', losaS: '#6e6c6a', losaL: '#a8a6a0',
  hierro: '#1c1c22', hierroL: '#4a4a56', rojoB: '#b4282a', rojoBS: '#84191c', rojoBL: '#d84c42', crema: '#e8dcb4',
  luzGas: '#ffd890', luzGasL: '#fff4c8', luzGasS: '#e0a050', ventanaL: '#f0c070', ventanaLS: '#c08840',
  geranio: '#d8323a', geranioS: '#9a1e26', hoja: '#b07a30', hojaS: '#7a5020', hojaL: '#d8a050',
});

// mezcla dos colores (a = 0: c1; a = 1: c2)
function c_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// umbral del tramado ordenado 4 × 4 (entre 0 y 1) y el límite 0–1
const c_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const c_um = (x, y) => c_BAYER[((y & 3) << 2) | (x & 3)];

const c_lim = (u) => Math.max(0, Math.min(1, u));

// un rectángulo que respeta R.recorte (punto a punto: solo para cosas pequeñas)
function c_rc(R, x0, y0, x1, y1, c) { for (let y = Math.round(Math.min(y0, y1)); y <= Math.round(Math.max(y0, y1)); y++) for (let x = Math.round(Math.min(x0, x1)); x <= Math.round(Math.max(x0, x1)); x++) R.pset(x, y, c); }

// oscurece o aclara lo ya pintado en un rectángulo (sombras y luces), con el tramado si a < 1
function c_velo(R, x0, y0, x1, y1, c, a) {
  const B = R.buf; for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) { const i = y * 320 + x; B[i] = c_mez(B[i], c, a); }
}

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma. dibuja
// recibe marca(): lo pintado hasta entonces (el cielo) queda en la máscara m, para pintar nubes y pájaros solo detrás
const c_capas = new Map();

function c_capa(R, clave, dibuja) {
  let c = c_capas.get(clave);
  if (!c) {
    const b = R.nuevo(), prev = R.usar(b), m = new Uint8Array(57600); let foto = null;
    R.recorte(null);
    const info = dibuja(() => { foto = b.slice(); }) || {};
    if (foto) for (let i = 0; i < 57600; i++) m[i] = b[i] === foto[i] ? 1 : 0;
    R.usar(prev); c = { b, m, info }; c_capas.set(clave, c);
  }
  R.copiar(c.b);
  return c;
}

// degradado tramado de arriba abajo entre y0 e y1: P = [[fracción, color], …]
function c_degradado(R, y0, y1, P) {
  const B = R.buf, alto = y1 - y0, tr = 3, lim = P.map(([f]) => y0 + Math.round(f * alto));
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = c_um(x, y) < p ? b : a;
  }
}

// textura de estuco o de piedra en un rectángulo: el color, manchas grandes de sombra (humedad), motas de luz y sombra
function c_tex(R, x0, y0, x1, y1, c, cS, cL, k = 0, d = 0.1) {
  const B = R.buf, cM = c_mez(c, cS, 0.4);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const q = h(x, y, k), g = h(x >> 3, y >> 2, k + 1) + h((x + 3) >> 2, y >> 3, k + 2) * 0.5;
    B[y * 320 + x] = q < d * 0.5 ? cS : q > 1 - d * 0.6 ? cL : g > 1.25 ? cM : c;
  }
}

// disco y punto que solo pintan donde la máscara m dice cielo (nubes y pájaros por detrás de las casas); la esquina de
// Atom (x ≥ 272, y < 48) se respeta
function c_discoM(B, m, cx, cy, r, c) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, Math.ceil(cy + r)), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, Math.ceil(cx + r)), r2 = r * r;
  for (let y = y0; y <= y1; y++) { const dy = y + 0.5 - cy, f = y * 320; for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx; if (dx * dx + dy * dy <= r2 && m[f + x] && !(x >= 272 && y < 48)) B[f + x] = c; } }
}

const c_psM = (B, m, x, y, c) => { x |= 0; y |= 0; if (x >= 0 && x < 320 && y >= 0 && y < 180 && m[y * 320 + x] && !(x >= 272 && y < 48)) B[y * 320 + x] = c; };

// cúmulo de tres tonos con la base plana, solo en el cielo; ap < 1 lo aplasta
function c_nubeM(B, m, cx, cy, w, sem, c, ap = 1) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06 * ap, r]); }
  for (const [x, y, r] of bolas) c_discoM(B, m, x, y + 1, r, c[0]);
  for (const [x, y, r] of bolas) c_discoM(B, m, x, y, r, c[1]);
  for (const [x, y, r] of bolas) c_discoM(B, m, x - 1, y - 2, r * 0.68, c[2]);
  const y0 = Math.round(cy + w * 0.08 * ap); for (let x = Math.round(cx - w * 0.47); x <= Math.round(cx + w * 0.47); x++) { c_psM(B, m, x, y0, c[0]); c_psM(B, m, x, y0 + 1, c[0]); }
}

// nubes en tres capas a distinta velocidad (las de arriba, grandes y más deprisa) entre y0 e y1
function c_nubes(R, t, m, cols, y0, y1, n, vel, sem, ap = 1) {
  const B = R.buf;
  for (let k = 0; k < n; k++) { const capa = k % 3, w = 14 + capa * 13 + Math.round(h(k, sem, 1) * 12), v = vel * (0.5 + capa * 0.8), y = y0 + Math.round((capa / 2) * (y1 - y0) * 0.6 + h(k, sem, 2) * (y1 - y0) * 0.4), x = ((h(k, sem, 3) * 480 + t * v) % 480) - 80;
    c_nubeM(B, m, x, y, w, k + sem, capa === 0 ? [cols[0], cols[0], cols[1]] : cols, ap); }
}

// pájaros lejanos (una uve que aletea) que cruzan el cielo; solo en el cielo de la máscara
function c_pajaros(R, t, m, n, y0, y1, c, sem = 0, vel = 9) {
  const B = R.buf;
  for (let k = 0; k < n; k++) { const x = ((h(k, sem, 31) * 400 + t * vel * (0.7 + h(k, sem, 32) * 0.6)) % 400) - 40, y = y0 + h(k, sem, 33) * (y1 - y0) + Math.sin(t * 1.3 + k) * 3, ala = Math.sin(t * (9 + k) + k * 2) > 0 ? -1 : 0;
    const X = Math.round(x), Y = Math.round(y); c_psM(B, m, X, Y, c); c_psM(B, m, X - 1, Y + ala, c); c_psM(B, m, X + 1, Y + ala, c); c_psM(B, m, X - 2, Y + ala * 2 - (ala ? 0 : -0), c); c_psM(B, m, X + 2, Y + ala * 2, c); }
}

// la gente pequeña de fondo (unos 11 px), de pie o andando: tipo 'efendi' (traje y fez rojo), 'galabeya' (túnica clara
// y turbante), 'azul' (túnica azul y casquete), 'melaya' (manto negro, la cara al aire), 'nino' (túnica a rayas y fez),
// 'europeo' (traje blanco y salacot), 'camarero' (chaquetilla blanca, fez y bandeja), 'bombin' (abrigo oscuro y bombín),
// 'senora' (abrigo y sombrero con pluma), 'paraguas' (gabardina y paraguas abierto), 'gabardina' (gabardina y sombrero
// de fieltro), 'guardia' (el casco alto azul); k: su semilla; dir ±1; anda o quieto; c: tinte opcional (niebla)
const c_FIG = {
  efendi: { cu: '#3a3a48', cuS: '#26262f', pi: '#2e2e38', toc: 'fez' }, galabeya: { cu: '#ebe6da', cuS: '#bab4a6', larga: 1, toc: 'turbante' },
  azul: { cu: '#5a76a0', cuS: '#3e5678', larga: 1, toc: 'casquete' }, melaya: { cu: '#2a2630', cuS: '#1a1820', larga: 1, toc: 'manto' },
  nino: { cu: '#d8c8a0', cuS: '#a8946c', larga: 1, toc: 'fez', bajo: 3 }, europeo: { cu: '#e8e2d0', cuS: '#b8b2a0', pi: '#d8d2c0', toc: 'salacot' },
  camarero: { cu: '#f0ece0', cuS: '#c0bcb0', pi: '#2a2a30', toc: 'fez', bandeja: 1 }, bombin: { cu: '#2e2e36', cuS: '#1e1e24', pi: '#24242a', toc: 'bombin' },
  senora: { cu: '#7a3a3a', cuS: '#5a2a2a', larga: 1, toc: 'pluma' }, paraguas: { cu: '#4a4a3e', cuS: '#34342c', pi: '#2a2a2a', toc: 'bombin', paraguas: 1 },
  gabardina: { cu: '#a89a78', cuS: '#7e7258', pi: '#3a3a3a', toc: 'fieltro' }, guardia: { cu: '#22284a', cuS: '#161a34', pi: '#1a1e36', toc: 'casco' },
};

const c_FIGH = {};
for (const [k, v] of Object.entries(c_FIG)) c_FIGH[k] = Object.fromEntries(Object.entries(v).map(([a, b]) => [a, typeof b === 'string' ? hex(b) : b]));

function c_figura(R, x, suelo, t, tipo, k = 0, dir = 1, anda = true, tn = null) {
  const F = c_FIGH[tipo] || c_FIGH.efendi, T_ = tn || ((c) => c), X = (i) => Math.round(x + i * dir), P = c_P;
  const r = (a, b, y0, y1, c) => c_rc(R, X(a), y0, X(b), y1, T_(c)), ps = (i, y, c) => R.pset(X(i), y, T_(c));
  const paso = anda ? Math.floor(t * 5 + k * 0.7) % 2 : 0, bajo = F.bajo || 0, y = suelo - 11 + bajo, cu = F.cu, cuS = F.cuS;
  const piel = [P.piel, P.pielS, hex('#d8a070'), hex('#b07848')][k % 4];
  if (F.larga) { for (let j = 4; j <= 10 - bajo; j++) { const w = j < 7 ? 1 : 2; r(-w + 1, w, y + j, y + j, j === 10 - bajo ? cuS : cu); ps(w, y + j, cuS); } ps(paso ? -1 : 1, suelo, P.maderaD); }
  else { const pi = F.pi || cuS; r(0, 0, y + 8, suelo - (paso ? 1 : 0), pi); r(1, 1, y + 8, suelo - (paso ? 0 : 1), pi); ps(paso ? -1 : 2, suelo, hex('#1c1820')); ps(paso ? 1 : 0, suelo, hex('#1c1820')); }
  r(0, 1, y + 3, y + 7, cu); ps(-1, y + 4, cu); ps(2, y + 4, cuS); ps(1, y + 7, cuS);
  const br = anda ? (paso ? 1 : 0) : 0; ps(2, y + 5 + br, cuS); ps(-1, y + 6 - br, cuS);
  r(0, 1, y, y + 2, piel); ps(1, y + 1, P.pielS);
  const toc = F.toc;
  if (toc === 'fez') { r(0, 1, y - 2, y - 1, P.fez); ps(0, y - 2, P.fezS); ps(1, y - 3, hex('#1c1820')); }
  else if (toc === 'turbante') { r(-1, 2, y - 1, y, P.galabeya); ps(0, y - 2, P.galabeyaS); ps(1, y - 2, P.galabeya); }
  else if (toc === 'casquete') { r(0, 1, y - 1, y - 1, hex('#e8e0d0')); }
  else if (toc === 'manto') { r(-1, 2, y - 2, y + 3, cu); r(0, 1, y, y + 1, piel); ps(-1, y - 1, cuS); }
  else if (toc === 'salacot') { r(-1, 2, y - 1, y - 1, hex('#e8e0c8')); r(0, 1, y - 2, y - 2, hex('#d8d0b8')); }
  else if (toc === 'bombin') { r(-1, 2, y - 1, y - 1, hex('#1c1c22')); r(0, 1, y - 2, y - 2, hex('#26262c')); }
  else if (toc === 'fieltro') { r(-1, 2, y - 1, y - 1, hex('#4a4038')); r(0, 1, y - 3, y - 2, hex('#5a4e44')); }
  else if (toc === 'pluma') { r(-1, 2, y - 1, y - 1, hex('#3a2a3a')); r(0, 1, y - 2, y - 2, hex('#3a2a3a')); ps(2, y - 3, hex('#c8b070')); ps(3, y - 4, hex('#c8b070')); }
  else if (toc === 'casco') { r(0, 1, y - 3, y - 1, hex('#1a1e36')); ps(0, y - 4, hex('#1a1e36')); ps(1, y - 2, hex('#c8c8d0')); }
  if (F.bandeja) { const by = y + 2 + (anda ? (paso ? 0 : 1) : 0); r(2, 5, by, by, P.laton); ps(3, by - 1, P.cristalL); ps(4, by - 1, P.toldoR); ps(2, by + 1, P.piel); }
  if (F.paraguas) { const py = y - 5; r(-2, 3, py, py, hex('#1c1c22')); r(-1, 2, py - 1, py - 1, hex('#26262c')); ps(-3, py + 1, hex('#1c1c22')); ps(4, py + 1, hex('#1c1c22')); r(1, 1, py + 1, y + 4, hex('#3a3a40')); }
}

// el tranvía de El Cairo de 1923: caja crema pálido (no amarillo) con el zócalo granate, las ventanillas con pasajeros
// (fez y turbantes), el techo con su linternón, el trole hasta el hilo (hilo: su y) con alguna chispa, el conductor en su
// plataforma y las ruedas que giran; x es la trasera según dir
function c_tranvia(R, x, suelo, t, dir = 1, hilo = 90) {
  const P = c_P, X = (i) => Math.round(x + i * dir), r = (a, b, y0, y1, c) => R.rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c), L = 66, y0 = suelo - 27;
  R.linea(X(14), y0 - 2, X(-6), hilo + 1, C.k); R.linea(X(15), y0 - 2, X(-5), hilo + 1, hex('#5a5a62')); if (Math.sin(t * 19) > 0.88) { R.pset(X(-6), hilo + 2, hex('#e8f0ff')); R.pset(X(-7), hilo, hex('#9ab8ff')); R.pset(X(-5), hilo + 3, C.blanco); }
  r(-1, L + 1, y0 - 1, y0 + 1, C.k); r(0, L, y0, y0, P.tranviaS); r(10, L - 10, y0 - 4, y0 - 2, C.k); r(11, L - 11, y0 - 3, y0 - 3, P.tranviaL); for (let i = 13; i < L - 11; i += 4) R.pset(X(i), y0 - 3, P.cristal);
  r(0, L, y0 + 2, suelo - 6, C.k); r(1, L - 1, y0 + 2, suelo - 7, P.tranvia); r(1, L - 1, y0 + 2, y0 + 2, P.tranviaL); r(1, L - 1, suelo - 13, suelo - 7, P.tranviaR); r(1, L - 1, suelo - 13, suelo - 13, P.tranviaRS); r(1, L - 1, suelo - 8, suelo - 7, P.tranviaRS);
  for (let i = 6, kk = 0; i < L - 8; i += 8, kk++) { r(i, i + 5, y0 + 4, y0 + 11, P.cristalS); r(i, i + 5, y0 + 4, y0 + 4, P.cristal); R.pset(X(i + 5), y0 + 5, P.cristalL);
    const q = h(kk, 3, 701); if (q < 0.8) { const px = X(i + 2), bob = Math.sin(t * 6 + kk) > 0.9 ? 1 : 0; R.rect(px, y0 + 8 + bob, px + 1, y0 + 11, [P.traje, P.galabeya, P.azulG, P.marron][kk % 4]); R.rect(px, y0 + 6 + bob, px + 1, y0 + 7 + bob, P.piel); R.rect(px, y0 + 5 + bob, px + 1, y0 + 5 + bob, q < 0.45 ? P.fez : P.galabeya); } }
  r(L - 4, L - 1, y0 + 3, suelo - 7, P.tranviaS); R.rect(Math.min(X(L), X(L + 2)), suelo - 15, Math.max(X(L), X(L + 2)), suelo - 13, C.k); R.pset(X(L + 2), suelo - 14, hex('#fff6d0'));
  { const mx = X(L - 3); R.rect(mx - 1, y0 + 9, mx + 1, y0 + 16, hex('#24324a')); R.rect(mx - 1, y0 + 6, mx, y0 + 8, P.piel); R.rect(mx - 1, y0 + 4, mx, y0 + 5, P.fez); }
  r(-1, L + 1, suelo - 5, suelo - 4, hex('#3a3a40'));
  for (const wx of [10, 18, L - 18, L - 10]) { R.disco(X(wx), suelo - 2, 2.6, C.k); const a = t * 9 * dir; R.pset(Math.round(X(wx) + Math.cos(a) * 1.6), Math.round(suelo - 2 + Math.sin(a) * 1.6), C.metalL); }
}

// un coche de 1923 (un torpedo de capota plegable), de lado: el capó con su radiador, el parabrisas, las ruedas de
// radios que giran, el chófer con gorra; color: su carrocería; x es la trasera según dir
function c_coche(R, x, suelo, t, dir = 1, color = hex('#2a3a2e'), colorL = hex('#4a6a52')) {
  const P = c_P, X = (i) => Math.round(x + i * dir), r = (a, b, y0, y1, c) => R.rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c), tb = Math.sin(t * 30) > 0 ? 0 : 1;
  r(2, 30, suelo - 9 - tb, suelo - 4, C.k); r(3, 29, suelo - 8 - tb, suelo - 5, color); r(3, 29, suelo - 8 - tb, suelo - 8 - tb, colorL);
  r(20, 29, suelo - 11 - tb, suelo - 8 - tb, C.k); r(21, 28, suelo - 10 - tb, suelo - 9 - tb, color); r(29, 31, suelo - 12 - tb, suelo - 5, P.laton); R.pset(X(31), suelo - 10 - tb, P.latonL);
  r(4, 13, suelo - 15 - tb, suelo - 9 - tb, C.k); r(5, 12, suelo - 14 - tb, suelo - 10 - tb, hex('#3a2a20')); r(4, 6, suelo - 16 - tb, suelo - 15 - tb, C.k);
  R.linea(X(18), suelo - 10 - tb, X(16), suelo - 17 - tb, P.cristalL);
  { const cx = X(15); R.rect(cx, suelo - 14 - tb, cx + 1, suelo - 11 - tb, P.traje); R.rect(cx, suelo - 16 - tb, cx + 1, suelo - 15 - tb, P.piel); R.rect(cx - 1, suelo - 17 - tb, cx + 1, suelo - 17 - tb, hex('#2a2a30')); }
  r(0, 33, suelo - 4, suelo - 4, hex('#3a3a40')); R.pset(X(30), suelo - 7, P.latonL);
  for (const wx of [8, 25]) { R.disco(X(wx), suelo - 3, 3.4, C.k); R.disco(X(wx), suelo - 3, 2.2, hex('#c8b890')); R.pset(X(wx), suelo - 3, C.k); const a = t * 8 * dir; for (let s = 0; s < 2; s++) R.pset(Math.round(X(wx) + Math.cos(a + s * Math.PI) * 1.6), Math.round(suelo - 3 + Math.sin(a + s * Math.PI) * 1.6), hex('#5a4a30')); }
  if (Math.floor(t * 6) % 3 === 0) { R.pset(X(-2), suelo - 5, hex('#c8c4bc')); R.pset(X(-4), suelo - 6, hex('#d8d4cc')); }
}

// el carro del burro con su carga (sandías y sacos), el burro al paso con las orejas que se mueven y el carretero
// sentado con su vara; x es la trasera según dir
function c_burro(R, x, suelo, t, dir = 1) {
  const P = c_P, X = (i) => Math.round(x + i * dir), r = (a, b, y0, y1, c) => R.rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c), pa = Math.floor(t * 4) % 2;
  r(0, 18, suelo - 9, suelo - 7, P.madera); r(0, 18, suelo - 9, suelo - 9, P.maderaL); r(0, 0, suelo - 13, suelo - 7, P.maderaS); r(18, 30, suelo - 8, suelo - 8, P.maderaS);
  for (let i = 0; i < 4; i++) { R.disco(X(3 + i * 4), suelo - 11, 2, P.sandia); R.pset(X(3 + i * 4) - 1, suelo - 12, P.sandiaL); }
  r(10, 15, suelo - 15, suelo - 12, P.saco); r(10, 15, suelo - 12, suelo - 12, P.sacoS);
  { const cx = X(16); R.rect(cx, suelo - 15, cx + 1, suelo - 10, P.azulG); R.rect(cx, suelo - 17, cx + 1, suelo - 16, P.piel); R.rect(cx - 1, suelo - 18, cx + 1, suelo - 18, P.galabeya); R.linea(cx + dir, suelo - 14, X(26), suelo - 20 + pa, P.maderaS); }
  R.disco(X(9), suelo - 4, 4, C.k); R.disco(X(9), suelo - 4, 3, P.madera); R.pset(X(9), suelo - 4, P.maderaD); { const a = t * 5 * dir; R.linea(X(9), suelo - 4, Math.round(X(9) + Math.cos(a) * 3), Math.round(suelo - 4 + Math.sin(a) * 3), P.maderaD); }
  const bx = 22, g = hex('#8a8078'), gS = hex('#625a54'), gL = hex('#aaa098');
  r(bx, bx + 9, suelo - 11, suelo - 7, g); r(bx, bx + 9, suelo - 7, suelo - 7, gS); r(bx + 8, bx + 11, suelo - 14, suelo - 9, g); r(bx + 10, bx + 13, suelo - 12, suelo - 10, gL); R.pset(X(bx + 13), suelo - 11, C.k); R.pset(X(bx + 10), suelo - 13, C.k);
  R.pset(X(bx + 9), suelo - 15 - pa, gS); R.pset(X(bx + 9), suelo - 16 - pa, gS); R.pset(X(bx + 10), suelo - 15, gS);
  for (const [lx, ph] of [[bx + 1, 0], [bx + 3, 1], [bx + 7, 1], [bx + 9, 0]]) { const s = (pa + ph) % 2; R.rect(X(lx + (s ? dir * 0 : 0)), suelo - 6, X(lx), suelo - 1 + (s ? -1 : 0), gS); R.pset(X(lx + (s ? 1 : 0)), suelo, C.k); }
  R.pset(X(bx - 1), suelo - 10, gS); R.pset(X(bx - 2), suelo - 9 + pa, gS);
}

// una palmera datilera: el tronco con sus cicatrices y su lado de luz, la falda de hojas secas, los dátiles y la copa
// en tres tonos que se mece (copiada de hu-comun)
function c_palmera(R, x, base, alto, t, viento = 0.25, sem = 0) {
  const { pset } = R, P = c_P, m = Math.sin(t * (1.1 + viento * 2.2) + x * 0.7) * (1.2 + viento * 2), top = base - alto, dob = viento * 9;
  const lean = (u) => Math.round(u * (1.5 + m * 0.6) - dob * u * u);
  for (let y = base; y >= top; y--) { const u = (base - y) / alto, xx = x + lean(u), rr = (y + (xx & 1) + sem) % 4;
    for (let i = -2; i <= 2; i++) pset(xx + i, y, i === -2 ? P.troncoL : i === 2 ? P.troncoS : rr === 0 ? c_mez(P.tronco, C.k, 0.25) : P.tronco); pset(xx - 3, y, C.k); pset(xx + 3, y, C.k); }
  const cx = x + lean(1), cy = top, seca = hex('#9a7a44'), secaS = hex('#7a5a30');
  for (let j = 0; j < 9; j++) { const a = Math.PI / 2 + (j - 4) * 0.22, l = 5 + (j % 3); for (let d = 1; d < l; d++) pset(Math.round(cx + Math.cos(a) * d * 0.9), cy + 2 + d, d > l - 2 ? secaS : seca); }
  const palma = (a, l, c, cS, cL) => { for (let d = 1; d <= l; d++) { const f = d / l, xx = Math.round(cx + Math.cos(a) * d - viento * f * f * l * 0.55), yy = Math.round(cy + Math.sin(a) * d * 0.62 + f * f * l * (0.55 - viento * 0.3));
      pset(xx, yy, f > 0.82 ? cL : c); pset(xx, yy + 1, c); if (d > 2) { const fl = Math.max(1, Math.round((1 - f) * 4 + 0.5)); for (let j = 1; j <= fl; j++) pset(xx - Math.round(viento * j * 0.6), yy + j, j === fl ? cS : c); if (d % 2 === 0) pset(xx, yy - 1, cS); } } };
  const sw = (j) => Math.sin(t * (1.6 + viento * 3) + j * 0.9 + x) * (0.05 + viento * 0.08) + m * 0.02;
  for (let j = 0; j < 11; j++) palma(-Math.PI - 0.15 + j * ((Math.PI + 0.3) / 10) + sw(j), 15 + (j % 3) * 3, hex('#2e6a2a'), hex('#245a24'), P.hierbaS);
  R.disco(cx, cy + 1, 3, hex('#6a5a3a')); for (let j = 0; j < 5; j++) pset(cx - 2 + j, cy + 3 + (j % 2), hex('#c8702a'));
  for (let j = 0; j < 12; j++) palma(-Math.PI - 0.35 + j * ((Math.PI + 0.7) / 11) + sw(j + 9), 12 + ((j * 5) % 4) * 2, j % 2 ? P.hierba : P.hierbaL, P.hierbaS, hex('#a8d878'));
}

// el gato egipcio flaco y digno (NUESTRO), de perfil, mirando a dir, con su contorno oscuro (contorno false: sin él): modo 'sienta' (sentado, la cola que se mueve y el
// parpadeo), 'anda' (al paso, la cola en alto), 'lame' (sentado, levanta una pata y se la lame) o 'salta' (estirado en
// el aire); (x, suelo): donde apoya las patas
function c_gato(R, x, suelo, t, modo = 'sienta', dir = 1, contorno = true) {
  if (contorno) { const Rk = { ...R, rect: (a, b, c, d) => R.rect(a, b, c, d, C.k), pset: (a, b) => R.pset(a, b, C.k) }; for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1]]) c_gato(Rk, x + dx, suelo + dy, t, modo, dir, false); }
  const P = c_P, X = (i) => Math.round(x + i * dir), r = (a, b, y0, y1, c) => R.rect(Math.min(X(a), X(b)), Math.round(y0), Math.max(X(a), X(b)), Math.round(y1), c), ps = (i, y, c) => R.pset(X(i), Math.round(y), c);
  const a = P.gatoA, s = P.gatoS, k = P.gatoR, l = P.gatoL, parpa = (t % 3.1) < 0.14;
  if (modo === 'anda' || modo === 'salta') {
    const y = modo === 'salta' ? suelo - 3 : suelo, pa = Math.floor(t * 7) % 2;
    r(-5, 4, y - 7, y - 4, a); r(-5, 4, y - 4, y - 4, s); for (let i = -3; i <= 3; i += 3) ps(i, y - 6, k);
    if (modo === 'salta') { for (const [i, j] of [[-6, -3], [-7, -2], [5, -4], [6, -3]]) ps(i, y + j, a); }
    else for (const [i, ph] of [[-5, 0], [-3, 1], [2, 1], [4, 0]]) { const up = (pa + ph) % 2; r(i, i, y - 3, y - up, a); ps(i + (up ? 1 : 0), y - up, s); }
    r(4, 7, y - 10, y - 6, a); ps(8, y - 8, l); ps(8, y - 7, a); ps(4, y - 11, s); ps(7, y - 11, s); ps(4, y - 12, k); ps(7, y - 12, k); ps(6, y - 9, parpa ? k : P.gatoOjo); ps(7, y - 6, l);
    for (let i = 1; i <= 6; i++) ps(-5 - (i > 3 ? 1 : 0), y - 7 - i + Math.round(Math.sin(t * 3 + i * 0.5) * (i / 6)), i > 4 ? k : a);
    return;
  }
  for (let j = 0; j < 7; j++) r(-3, 3 - (j < 2 ? 1 : 0), suelo - j, suelo - j, j % 3 === 1 ? k : a);
  r(-3, -3, suelo - 6, suelo - 1, s); r(1, 1, suelo - 3, suelo, l);
  const lame = modo === 'lame', ph = lame ? Math.sin(t * 5) : 0, cab = lame ? (ph > 0 ? 1 : 0) : 0;
  r(0, 3, suelo - 11 + cab, suelo - 7 + cab, a); ps(4, suelo - 8 + cab, l); ps(4, suelo - 9 + cab, a);
  ps(0, suelo - 12 + cab, s); ps(3, suelo - 12 + cab, s); ps(0, suelo - 13 + cab, k); ps(3, suelo - 13 + cab, k);
  ps(2, suelo - 10 + cab, parpa || lame ? k : P.gatoOjo);
  if (lame) { r(3, 4, suelo - 7 + (ph > 0 ? 0 : 1), suelo - 3, a); ps(5, suelo - 7 + (ph > 0 ? 0 : 1), l); if (ph > 0.3) ps(5, suelo - 8 + cab, hex('#d86a7a')); }
  for (let i = 1; i <= 6; i++) ps(-3 - i, Math.round(suelo - Math.max(0, i - 2) * (0.6 + 0.5 * Math.sin(t * 2.2 + i * 0.4))), i > 4 ? k : a);
}

// EL PICTOGRAMA DE LA MALDICIÓN (NUESTRO): una pirámide lisa, SIN OJO (con ojo sería el símbolo de la conspiración), y un «!» rojo
// al lado; 16 × 8 celdas de s px; (x, y): su esquina de arriba a la izquierda; ap 0–1: el «!» aparece
const c_PICTO = ['......K.....R...', '.....KuK....R...', '....KuuuK...R...', '...KuuuuuK..R...', '..KuuuuuuuK.R...', '.KuuuuuuuuuK....', 'KuuuuuuuuuuuK.R.', 'KKKKKKKKKKKKK...'];

function c_picto(R, x, y, s = 1, o = {}) {
  const col = { K: o.k ?? hex('#2a2630'), u: o.u ?? hex('#e0b86a'), W: o.w ?? hex('#f6f2ea'), R: o.r ?? hex('#c83a3a') };
  c_PICTO.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = f[i]; if (c === '.' || (c === 'R' && o.sinExcl)) continue; for (let b = 0; b < s; b++) for (let a = 0; a < s; a++) R.pset(x + i * s + a, y + j * s + b, col[c]); } });
}

// un toldo de lona a rayas visto de frente (x0–x1, de y0 a y1), con el fleco de ondas que el viento mueve (sem: su fase)
function c_toldo(R, x0, x1, y0, y1, cA, cAS, cB, cBS, t, sem = 0, paso = 6) {
  const P = c_P, w = Math.sin(t * 2.3 + sem) * 0.8;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0);
    for (let x = x0; x <= x1; x++) { const raya = Math.floor((x - x0) / paso) % 2, osc = u < 0.25 || (u > 0.8 && h(x, y, sem) < 0.3);
      R.pset(x, y, raya ? (osc ? cBS : cB) : (osc ? cAS : cA)); } }
  R.rect(x0, y0, x1, y0, P.maderaS);
  for (let x = x0; x <= x1; x++) { const fase = (x - x0) % paso, raya = Math.floor((x - x0) / paso) % 2, d = Math.round(Math.sin((fase / paso) * Math.PI) * 2 + w * Math.sin(x * 0.4 + t * 3));
    for (let j = 1; j <= Math.max(1, d + 1); j++) R.pset(x, y1 + j, raya ? cBS : cAS); }
}

// una celosía de madera (mashrabiya) saliente: el marco, la red de listones torneados en diagonal con sus huecos, el
// tejadillo con canecillos arriba, la repisa y su sombra en la pared
function c_mashrabiya(R, x0, y0, x1, y1) {
  const P = c_P;
  c_velo(R, x1 + 1, y0 + 3, x1 + 3, y1 + 4, P.estucoD, 0.45); c_velo(R, x0 + 2, y1 + 1, x1 + 3, y1 + 4, P.estucoD, 0.45);
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, P.maderaD);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = (x + y) % 4 === 0, b = (x - y + 400) % 4 === 0, nudo = (x + y) % 4 === 0 && (x - y + 400) % 4 === 0;
    R.pset(x, y, nudo ? P.maderaL : a || b ? P.celosia : (y - y0) < (y1 - y0) * 0.5 ? hex('#1e140c') : hex('#2e2014')); }
  for (const yy of [y0 + Math.round((y1 - y0) * 0.35), y0 + Math.round((y1 - y0) * 0.7)]) { R.rect(x0, yy, x1, yy, P.madera); R.rect(x0, yy + 1, x1, yy + 1, P.maderaS); }
  for (let x = x0; x <= x1; x += Math.max(6, Math.round((x1 - x0) / 4))) R.rect(x, y0, x, y1, P.madera);
  R.rect(x0 - 3, y0 - 4, x1 + 3, y0 - 2, P.madera); R.rect(x0 - 3, y0 - 4, x1 + 3, y0 - 4, P.maderaL); R.rect(x0 - 2, y0 - 1, x1 + 2, y0 - 1, P.maderaD);
  for (let x = x0; x <= x1; x += 4) R.pset(x, y0 - 2, P.maderaD);
  R.rect(x0 - 2, y1 + 1, x1 + 2, y1 + 3, P.madera); R.rect(x0 - 2, y1 + 1, x1 + 2, y1 + 1, P.maderaL); for (let x = x0; x <= x1; x += 5) R.rect(x, y1 + 4, x + 1, y1 + 6, P.maderaS);
}

// una ventana de El Cairo con arco de medio punto, el hueco oscuro con la reja, las contraventanas verdes abiertas
// (abre 0–1) y el alféizar con su sombra
function c_ventanaC(R, x, y, w, alto, cS, abre = 1, k = 0) {
  const P = c_P, r = w >> 1, cx = x + r;
  c_velo(R, x - 1, y + alto + 1, x + w + 2, y + alto + 3, cS, 0.35);
  for (let j = 0; j <= alto; j++) for (let i = 0; i <= w; i++) { const dy = j - r; if (j < r && Math.hypot(i - r, dy) > r) continue; R.pset(x + i, y + j, j < r + 2 ? hex('#241a14') : hex('#30241a')); }
  for (let i = 2; i < w; i += 3) R.rect(x + i, y + r, x + i, y + alto, P.maderaD);
  R.rect(x, y + r + Math.round(alto * 0.35), x + w, y + r + Math.round(alto * 0.35), P.maderaD);
  if (h(k, 1, 77) < 0.5) R.rect(x + 2, y + alto - 3, x + w - 2, y + alto - 1, hex('#5a4a3a'));
  for (let j = 0; j <= r; j++) { const dx = Math.round(Math.sqrt(Math.max(0, r * r - (r - j) * (r - j)))); R.pset(cx - dx - 1, y + j, cS); R.pset(cx + dx + 1, y + j, cS); }
  const sw = Math.max(1, Math.round((w * 0.55) * abre));
  for (const s of [-1, 1]) { const xa = s < 0 ? x - 1 - sw : x + w + 1; R.rect(xa, y + r - 2, xa + sw, y + alto, P.verde); R.rect(s < 0 ? xa : xa + sw, y + r - 2, s < 0 ? xa : xa + sw, y + alto, P.verdeS);
    for (let yy = y + r; yy < y + alto; yy += 2) R.rect(xa + 1, yy, xa + sw - 1, yy, P.verdeL); }
  R.rect(x - 2, y + alto + 1, x + w + 2, y + alto + 1, hex('#f4e4c4')); R.rect(x - 2, y + alto + 2, x + w + 2, y + alto + 2, cS);
}

// un hombre sentado de fondo (unos 9 px), de perfil a dir: el cuerpo, la cabeza con su fez o su turbante y el brazo que
// sube la taza o mueve una ficha (mueve 0–1)
function c_sentado(R, x, suelo, t, k = 0, dir = 1) {
  const P = c_P, X = (i) => Math.round(x + i * dir), ps = (i, y, c) => R.pset(X(i), y, c), cu = [P.traje, P.galabeya, P.azulG, P.marron][k % 4];
  c_rc(R, X(0), suelo - 6, X(1), suelo - 2, cu); c_rc(R, X(1), suelo - 2, X(3), suelo - 1, k % 2 ? P.galabeyaS : P.trajeS); ps(3, suelo, C.k);
  c_rc(R, X(0), suelo - 9, X(1), suelo - 7, P.piel); ps(1, suelo - 8, P.pielS);
  if (k % 3 === 1) { c_rc(R, X(-1), suelo - 10, X(2), suelo - 9, P.galabeya); } else { c_rc(R, X(0), suelo - 11, X(1), suelo - 10, P.fez); ps(1, suelo - 12, C.k); }
  const sube = Math.sin(t * 0.9 + k * 2.1) > 0.55; ps(2, suelo - (sube ? 7 : 4), P.piel); if (sube) ps(3, suelo - 8, C.blanco);
}

// una taza de café humeante (pictograma de rótulo, 9 × 7) en el color c
function c_taza(R, x, y, c) { R.rect(x + 1, y + 2, x + 6, y + 5, c); R.rect(x + 2, y + 6, x + 5, y + 6, c); R.pset(x + 7, y + 3, c); R.pset(x + 8, y + 4, c); R.pset(x + 7, y + 5, c); R.pset(x + 2, y, c); R.pset(x + 4, y + 1, c); R.pset(x + 5, y, c); }

// el fondo fijo: el cielo, la ciudad lejana en la calima con la mezquita (su cúpula y dos alminares de lápiz), tres
// casas de tres pisos (estuco ocre, rosado y arena) con celosías, ventanas de arco, el palomar del tejado, el café con
// sus arcos y la tienda de cacharros y la de alfombras; la acera de enfrente, la calzada con las vías del tranvía y la
// acera de este lado, de losas grandes; el hilo del tranvía y la farola
function c_calleFijo(R, marca) {
  // (marca(): lo pintado hasta aquí, el cielo, queda en la máscara de las nubes)
  const P = c_P, { rect, pset, linea, disco } = R, B = R.buf;
  c_degradado(R, 0, 104, [[0, P.cielo0], [0.22, P.cielo1], [0.45, P.cielo2], [0.68, P.cielo3], [0.88, P.calima], [1, P.calimaL]]);
  marca();
  // la ciudad lejana en la calima: azoteas, cúpulas pequeñas y la mezquita grande con dos alminares
  for (let x = 140, k = 0; x < 222; k++) { const w = 6 + Math.round(h(k, 1, 801) * 10), top = 82 + Math.round(h(k, 2, 801) * 10);
    rect(x, top, x + w, 104, P.lejos); rect(x, top, x, 104, P.lejosL); rect(x + w, top, x + w, 104, P.lejosS); rect(x, top, x + w, top, P.lejosL);
    for (let y = top + 3; y < 102; y += 4) for (let i = 2; i < w - 1; i += 3) if (h(x + i, y, 802) < 0.4) pset(x + i, y, P.lejosD);
    if (h(k, 3, 801) < 0.35) { disco(x + (w >> 1), top, 3, P.lejos); pset(x + (w >> 1) - 1, top - 2, P.lejosL); } x += w + 1; }
  { const cx = 184; rect(170, 74, 198, 92, P.lejos); rect(170, 74, 171, 92, P.lejosL); rect(196, 74, 198, 92, P.lejosS); for (let i = 172; i < 196; i += 4) rect(i, 80, i + 1, 86, P.lejosS);
    for (let j = 0; j <= 14; j++) { const dx = Math.round(Math.sqrt(196 - (14 - j) * (14 - j))); for (let i = -dx; i <= dx; i++) pset(cx + i, 60 + j, i < -dx * 0.4 ? P.lejosL : i > dx * 0.5 ? P.lejosS : P.lejos); }
    rect(cx, 56, cx, 59, P.lejosS); pset(cx, 55, P.lejosL);
    for (const mx of [160, 208]) { rect(mx - 1, 36, mx + 1, 96, P.lejos); rect(mx - 1, 36, mx - 1, 96, P.lejosL); rect(mx + 1, 36, mx + 1, 96, P.lejosS);
      for (const by of [52, 68]) { rect(mx - 2, by, mx + 2, by + 1, P.lejosS); rect(mx - 2, by, mx + 2, by, P.lejosL); }
      for (let j = 0; j < 7; j++) rect(mx - (j > 3 ? 1 : 0), 29 + j, mx + (j > 3 ? 1 : 0), 29 + j, j > 4 ? P.lejosS : P.lejos); pset(mx, 28, P.lejosD); } }
  // la bocacalle del hueco (x 146–206): casas más cercanas que la ciudad, en la calima, y el suelo de la calle que se aleja
  for (let x = 146, k = 0; x < 208; k++) { const w = 9 + Math.round(h(k, 4, 803) * 8), top = 92 + Math.round(h(k, 5, 803) * 6), c = k % 2 ? P.lejosS : c_mez(P.lejos, P.estucoS, 0.3);
    rect(x, top, x + w, 113, c); rect(x, top, x + w, top, P.lejosL); rect(x + w, top, x + w, 113, P.lejosD);
    for (let y = top + 4; y < 108; y += 6) for (let i = 2; i < w - 2; i += 4) rect(x + i, y, x + i + 1, y + 2, P.lejosD);
    rect(x + (w >> 1) - 1, 106, x + (w >> 1) + 1, 113, hex('#6a5a48')); x += w + 1; }
  for (let y = 113; y < 118; y++) for (let x = 146; x < 208; x++) pset(x, y, h(x, y, 804) < 0.1 ? P.calzadaS : c_mez(P.calzada, P.calima, 0.35));
  for (let x = 140; x < 214; x++) { pset(x, 117, P.aceraS); }
  // CASA A (x 0–70): estuco arena, la cornisa, la celosía grande del primer piso y el café de tres arcos
  c_tex(R, 0, 38, 70, 118, P.estuco, P.estucoS, P.estucoL, 810);
  rect(0, 36, 72, 38, P.estucoL); rect(0, 39, 72, 39, P.estucoD); rect(0, 40, 70, 41, P.estucoS); rect(70, 38, 71, 118, P.estucoS);
  for (const y of [64, 90]) { rect(0, y, 70, y, P.estucoL); rect(0, y + 1, 70, y + 1, P.estucoD); }
  c_ventanaC(R, 12, 44, 10, 16, P.estucoD, 0.9, 1); c_ventanaC(R, 46, 44, 10, 16, P.estucoD, 0.3, 2);
  c_mashrabiya(R, 14, 68, 54, 86);
  rect(0, 92, 70, 95, P.verdeS); rect(1, 93, 69, 94, P.verde); for (let x = 4; x < 68; x += 7) { rect(x, 93, x + 3, 93, P.toldoC); pset(x + 1, 94, P.toldoC); }
  for (const ax of [2, 25, 48]) { for (let j = 0; j <= 22; j++) for (let i = 0; i <= 20; i++) { if (j < 10 && Math.hypot(i - 10, j - 10) > 10) continue; pset(ax + i, 96 + j, j < 6 ? P.hueco : (i + j) % 9 === 0 ? P.huecoL : P.hueco); }
    for (let j = 0; j <= 10; j++) { const dx = Math.round(Math.sqrt(Math.max(0, 100 - (10 - j) * (10 - j)))); pset(ax + 10 - dx - 1, 96 + j, P.estucoD); pset(ax + 10 + dx + 1, 96 + j, P.estucoL); }
    rect(ax + 4, 108, ax + 16, 118, hex('#3e2c20')); rect(ax + 3, 107, ax + 17, 107, P.madera); for (let i = ax + 4; i < ax + 17; i += 3) pset(i, 106, i % 2 ? P.cobre : P.cristalL);
    rect(ax + 10, 96, ax + 10, 100, P.latonS); disco(ax + 10, 102, 2, P.laton); pset(ax + 10, 104, P.latonL); }
  // CASA B (x 70–146): estuco rosado, el palomar de listones del tejado, tres ventanas, el balcón de hierro y las dos tiendas
  c_tex(R, 72, 46, 146, 118, P.rosa, P.rosaS, P.rosaL, 820);
  rect(72, 44, 148, 46, P.rosaL); rect(72, 47, 148, 47, P.rosaD); rect(146, 46, 148, 118, P.rosaS);
  for (let x = 74; x < 146; x += 6) rect(x, 41, x + 3, 43, P.rosa); rect(72, 43, 148, 43, P.rosaL);
  { const px = 114; rect(px, 26, px + 20, 43, P.maderaD); for (let y = 27; y < 43; y++) for (let x = px + 1; x < px + 20; x++) pset(x, y, (x + y) % 3 === 0 || (x - y) % 3 === 0 ? P.maderaL : hex('#3a2a1c'));
    rect(px - 2, 24, px + 22, 25, P.madera); rect(px - 2, 24, px + 22, 24, P.maderaL); rect(px + 9, 18, px + 11, 23, P.maderaS); rect(px + 3, 34, px + 7, 37, hex('#1a120c')); }
  rect(82, 34, 96, 43, C.metalS); rect(82, 34, 96, 34, C.metalL); rect(84, 33, 94, 33, C.metal);
  for (const wx of [80, 104, 128]) c_ventanaC(R, wx, 52, 10, 14, P.rosaD, wx === 104 ? 0.4 : 1, wx);
  for (const y of [70]) { rect(72, y, 146, y, P.rosaL); rect(72, y + 1, 146, y + 1, P.rosaD); }
  for (const wx of [84, 120]) { rect(wx, 73, wx + 14, 90, hex('#2e2218')); rect(wx + 7, 73, wx + 7, 90, P.maderaD); rect(wx - 1, 72, wx + 15, 72, P.rosaL); }
  rect(78, 84, 142, 84, C.k); rect(78, 90, 142, 90, C.k); for (let x = 78; x <= 142; x += 3) rect(x, 85, x, 89, x % 2 ? C.k : hex('#3a3a44')); rect(78, 91, 142, 92, P.rosaD);
  for (let x = 79; x < 142; x += 9) { pset(x, 93, P.rosaD); pset(x + 1, 94, P.rosaD); }
  for (const [sx, tipo] of [[74, 0], [111, 1]]) { rect(sx, 98, sx + 33, 118, P.hueco); rect(sx, 98, sx, 118, P.rosaD); rect(sx + 33, 98, sx + 34, 118, P.rosaL);
    if (tipo === 0) { for (let i = 0; i < 6; i++) { const jx = sx + 3 + i * 5, jy = 110 + (i % 2) * 2; disco(jx, jy, 2, i % 2 ? P.cobre : hex('#b07848')); pset(jx - 1, jy - 1, P.cobreL); rect(jx, jy - 4, jx, jy - 3, hex('#8a5a38')); }
      for (let i = 0; i < 3; i++) { disco(sx + 6 + i * 10, 104, 2, hex('#c88a5a')); pset(sx + 5 + i * 10, 103, hex('#e8b080')); } }
    else { const al = [P.toldoR, hex('#3a5a8a'), hex('#c8902a'), P.toldoV]; for (let i = 0; i < 4; i++) { const ax = sx + 2 + i * 8; rect(ax, 99, ax + 6, 116, al[i]); for (let y = 100; y < 116; y += 3) rect(ax + 1, y, ax + 5, y, c_mez(al[i], P.toldoC, 0.45)); rect(ax, 116, ax + 6, 117, c_mez(al[i], C.k, 0.3)); for (let x = ax; x <= ax + 6; x += 2) pset(x, 118, P.toldoC); } } }
  // CASA C (x 206–320): estuco ocre, el pretil de almenas, la celosía alta, la confitería con su toldo verde y la puerta
  c_tex(R, 206, 58, 319, 118, P.ocre, P.ocreS, P.ocreL, 830);
  rect(204, 56, 319, 58, P.ocreL); rect(204, 59, 319, 59, P.ocreD); rect(204, 58, 206, 118, P.ocreL);
  for (let x = 206; x < 320; x += 8) { rect(x, 52, x + 4, 55, P.ocre); rect(x, 52, x + 4, 52, P.ocreL); rect(x + 4, 53, x + 4, 55, P.ocreS); }
  c_mashrabiya(R, 238, 63, 274, 84); c_ventanaC(R, 214, 64, 10, 16, P.ocreD, 0.7, 4); c_ventanaC(R, 290, 64, 10, 16, P.ocreD, 1, 5);
  rect(206, 88, 319, 88, P.ocreL); rect(206, 89, 319, 89, P.ocreD);
  rect(212, 96, 272, 118, P.hueco); rect(211, 96, 211, 118, P.ocreD);
  for (let i = 0; i < 5; i++) { const tx = 216 + i * 11; rect(tx, 108, tx + 8, 109, P.laton); for (let j = 0; j < 4; j++) pset(tx + 1 + j * 2, 107, [hex('#f0d0a0'), hex('#e8a0a0'), hex('#d8b060'), hex('#a0c890')][(i + j) % 4]); }
  rect(214, 110, 270, 118, P.madera); rect(214, 110, 270, 110, P.maderaL); for (let x = 218; x < 270; x += 10) rect(x, 112, x + 6, 116, P.maderaS);
  { const dx0 = 284, dx1 = 308; for (let j = 0; j <= 26; j++) for (let i = 0; i <= dx1 - dx0; i++) { const r = (dx1 - dx0) / 2; if (j < r && Math.hypot(i - r, j - r) > r) continue; pset(dx0 + i, 92 + j, j < 4 ? P.ocreD : P.verde); }
    rect(296, 98, 296, 118, P.verdeS); for (let y = 100; y < 117; y += 4) { rect(dx0 + 2, y, 294, y, P.verdeL); rect(298, y, dx1 - 2, y, P.verdeL); } pset(294, 108, P.latonL); pset(298, 108, P.latonL);
    for (let k = 0; k < 9; k++) { const a = Math.PI + (k / 8) * Math.PI, rr = 14; pset(Math.round(296 + Math.cos(a) * rr), Math.round(104 + Math.sin(a) * rr), k % 2 ? P.toldoR : P.ocreL); } }
  // el hilo del tranvía y sus tirantes a las fachadas
  rect(0, 100, 319, 100, hex('#3a3a40')); for (const x of [36, 120, 236, 300]) { linea(x, 100, x - 6, x < 150 ? 66 : 76, hex('#5a5a62')); pset(x, 101, C.k); }
  // la acera de enfrente, el bordillo, la calzada (tierra pisada y adoquines) con las rodadas y los rieles
  for (let y = 118; y < 125; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y === 118 ? P.aceraS : (x + (y - 118) * 5) % 17 === 0 || y === 121 ? P.junta : h(x, y, 840) < 0.08 ? P.aceraS : P.acera;
  rect(0, 125, 319, 125, P.aceraL); rect(0, 126, 319, 126, P.estucoD);
  for (let y = 127; y < 146; y++) { const f = y * 320, rod = (y >= 129 && y <= 131) || (y >= 143 && y <= 145);
    for (let x = 0; x < 320; x++) { const q = h(x, y, 841), ad = ((x >> 2) + (y >> 1)) % 7 === 0; B[f + x] = q < 0.07 ? P.calzadaS : q > 0.94 ? P.calzadaL : ad ? P.calzadaS : rod && h(x >> 1, y, 842) < 0.6 ? P.rodada : P.calzada; } }
  for (const ry of [137, 140]) { rect(0, ry, 319, ry, P.riel); for (let x = 0; x < 320; x++) if ((x + ry) % 9 < 5) pset(x, ry, P.rielL); rect(0, ry + 1, 319, ry + 1, P.calzadaS); }
  for (const [mx, my] of [[58, 133], [214, 144], [262, 130], [130, 143]]) { pset(mx, my, hex('#7a6040')); pset(mx + 1, my, hex('#6a5030')); pset(mx, my - 1, hex('#8a7050')); }
  // el bordillo de este lado y la acera de losas grandes, cada fila más alta, con grietas, una reja y su desgaste
  rect(0, 146, 319, 146, P.aceraL); rect(0, 147, 319, 149, P.aceraS); for (let x = 0; x < 320; x += 23) rect(x, 147, x, 149, P.junta);
  const fil = [150, 155, 161, 168, 176, 186];
  for (let y = 150; y < 180; y++) { const f = y * 320, r = fil.findIndex((v) => y < v), y0 = fil[r - 1] ?? 150, L = 22 + r * 8;
    for (let x = 0; x < 320; x++) { const xx = x + (r & 1) * (L >> 1), k = Math.floor(xx / L), q = h(k, r, 843); let c = q < 0.3 ? P.acera : q < 0.6 ? c_mez(P.acera, P.aceraL, 0.4) : c_mez(P.acera, P.aceraS, 0.3);
      if (y === y0 || xx % L === 0) c = P.junta; else if (y === y0 + 1) c = c_mez(c, P.aceraL, 0.5); else if (h(x, y, 844) < 0.05) c = P.aceraS; B[f + x] = c; } }
  for (const [cx, cy, l] of [[88, 158, 9], [192, 171, 12], [272, 164, 7]]) { let x = cx, y = cy; for (let i = 0; i < l; i++) { pset(x, y, P.junta); x += 1; y += h(i, cx, 845) < 0.4 ? 1 : 0; } }
  rect(232, 163, 250, 168, C.k); for (let x = 234; x < 250; x += 3) rect(x, 164, x, 167, C.metalS); rect(232, 163, 250, 163, C.metal);
  // la farola de hierro de este lado (x 12), con su sombra en las losas
  for (let i = 0; i < 26; i++) pset(14 + i, 176 - Math.round(i * 0.12), c_mez(R.pget(14 + i, 176 - Math.round(i * 0.12)), C.k, 0.3));
  rect(10, 168, 15, 177, P.verdeS); rect(9, 176, 16, 177, C.k); rect(11, 78, 13, 168, P.verdeS); rect(11, 78, 11, 168, P.verde); for (const y of [100, 130, 150]) rect(10, y, 14, y + 1, P.verdeS);
  rect(7, 66, 17, 68, P.verdeS); rect(8, 69, 16, 76, C.k); rect(9, 70, 15, 75, hex('#f0e6c0')); rect(12, 69, 12, 76, C.k); rect(6, 76, 18, 77, P.verdeS); rect(11, 62, 13, 65, P.verdeS); pset(12, 61, C.k);
  return {};
}

// LA CALLE (general): ver la cabecera de cairo()
function c_calle(R, t, o) {
  const P = c_P, gente = c_lim(o.gente ?? 1), cap = c_capa(R, 'tu-calle', (marca) => c_calleFijo(R, marca)), m = cap.m, B = R.buf;
  c_nubes(R, t, m, [P.nube0, P.nube1, P.nube2], 14, 58, 8, 2.2, 7);
  c_pajaros(R, t, m, 5, 22, 60, hex('#4a4a58'), 3, 7);
  // dos milanos que planean en círculos sobre la ciudad, y las palomas alrededor del palomar
  for (let k = 0; k < 2; k++) { const a = t * (0.35 + k * 0.1) + k * 3, x = Math.round(200 + k * 40 + Math.cos(a) * 26), y = Math.round(30 + k * 6 + Math.sin(a) * 7), ala = Math.sin(t * 2 + k) > 0.6 ? -1 : 0;
    for (const [i, j] of [[0, 0], [-1, ala], [1, ala], [-2, ala], [2, ala], [-3, ala + 1], [3, ala + 1], [0, 1]]) c_psM(B, m, x + i, y + j, hex('#5a4434')); }
  for (let k = 0; k < 4; k++) { const a = t * 1.6 + k * 1.57, x = Math.round(124 + Math.cos(a) * (16 + k * 3)), y = Math.round(31 + Math.sin(a) * 4 + k), ala = Math.sin(t * 12 + k) > 0 ? -1 : 0;
    for (const [i, j] of [[0, 0], [-1, ala], [1, ala]]) c_psM(B, m, x + i, y + j, hex('#e8e8ec')); }
  // el humo de un fogón en la azotea de la casa B
  for (let k = 0; k < 8; k++) { const u = ((t * 0.4 + k / 8) % 1), x = Math.round(100 + Math.sin(t + k) * 2 + u * 10), y = Math.round(42 - u * 26); if (!(x >= 20 && x <= 170 && y < 22)) { R.pset(x, y, c_mez(R.pget(x, y), hex('#e8e4dc'), 0.6 - u * 0.4)); R.pset(x + 1, y, c_mez(R.pget(x + 1, y), hex('#e8e4dc'), 0.4 - u * 0.3)); } }
  // la ropa tendida en el balcón, que el viento mueve
  R.linea(80, 79, 140, 79, hex('#d8d0c0'));
  [[84, P.galabeya, 7], [94, P.toldoR, 5], [103, hex('#4a6aa0'), 6], [113, P.galabeya, 8], [124, hex('#c8a040'), 5], [132, P.galabeyaS, 6]].forEach(([x, c, l], k) => { const s = Math.sin(t * 2.4 + k * 0.9); for (let j = 0; j < l; j++) { const d = Math.round(s * j * 0.25); R.rect(x + d, 80 + j, x + 4 + d, 80 + j, j === l - 1 ? c_mez(c, C.k, 0.2) : c); } R.pset(x, 79, C.k); R.pset(x + 4, 79, C.k); });
  // los toldos de las tiendas (rojo, verde) con su sombra
  c_toldo(R, 72, 110, 94, 99, P.toldoR, P.toldoRS, P.toldoC, P.toldoCS, t, 1, 5); c_toldo(R, 110, 146, 94, 99, P.toldoV, P.toldoVS, P.toldoC, P.toldoCS, t, 2, 5);
  c_toldo(R, 208, 274, 90, 96, P.toldoV, P.toldoVS, P.toldoC, P.toldoCS, t, 3, 6);
  // la palmera de la esquina, que se mece
  c_palmera(R, 176, 121, 66, t, 0.3, 2);
  // el café: las mesas en la acera, los parroquianos, la pipa de agua con su humo y el camarero que va y viene
  for (const [mx, k] of [[14, 0], [50, 1]]) { R.rect(mx - 3, 116, mx + 3, 116, C.metalL); R.rect(mx, 117, mx, 121, C.metalS); R.rect(mx - 2, 121, mx + 2, 121, C.metalS); R.pset(mx - 1, 115, C.blanco); R.pset(mx + 1, 115, P.cobre);
    c_sentado(R, mx - 6, 121, t, k, 1); c_sentado(R, mx + 6, 121, t, k + 2, -1); }
  { R.rect(30, 113, 32, 120, hex('#3a6a8a')); R.disco(31, 118, 2, hex('#3a6a8a')); R.rect(31, 109, 31, 112, P.laton); R.pset(31, 108, hex('#e86a3a'));
    for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1, x = Math.round(31 + Math.sin(t * 1.5 + k) * 2 * u + u * 4), y = Math.round(107 - u * 16); R.pset(x, y, c_mez(R.pget(x, y), hex('#f0ece4'), 0.7 - u * 0.5)); } }
  { const u = (t % 9) / 9, x = u < 0.5 ? lerp(6, 64, u * 2) : lerp(64, 6, (u - 0.5) * 2); c_figura(R, x, 123, t, 'camarero', 3, u < 0.5 ? 1 : -1, true); }
  // el burro con su carro, por el carril de enfrente
  { const x = ((t * 13 + 60) % 420) - 40; c_burro(R, x, 133, t, 1); }
  // la gente de la acera de enfrente
  const tipos = ['efendi', 'galabeya', 'melaya', 'europeo', 'azul', 'nino', 'galabeya', 'efendi'], n = Math.round(2 + gente * 6);
  for (let k = 0; k < n; k++) { const v = 5 + h(k, 1, 850) * 7, d = h(k, 2, 850) < 0.5 ? 1 : -1, x = ((h(k, 3, 850) * 380 + t * v * d) % 380 + 380) % 380 - 30; c_figura(R, x, 123 + (k % 2), t, tipos[k], k, d, true); }
  // el vendedor pequeño de la esquina, con su fajo, que grita (un «!» cada poco)
  { const x = 200, s = Math.sin(t * 3.1); c_figura(R, x, 124, t, 'nino', 5, -1, false); R.rect(x + 1, 117, x + 4, 119, P.papel); R.rect(x + 1, 118, x + 4, 118, P.papelS); if (s > 0.2) R.pset(x - 1, 114, C.k); if ((t % 2.4) < 1.3) R.bocadillo(x - 4, 104, { icono: '!' }); }
  // el gato de la confitería, sentado en el escalón de la puerta verde
  c_gato(R, 296, 119, t, (t % 10) > 7 ? 'lame' : 'sienta', -1);
  // el tranvía crema (de izquierda a derecha) y el coche de 1923 (al revés) por el carril de este lado
  { const x = ((t * 24 + 140) % 560) - 110; c_tranvia(R, x, 141, t, 1, 100); }
  { const x = 400 - ((t * 38 + 90) % 520); c_coche(R, x, 146, t, -1, hex('#2a2a34'), hex('#4a4a5a')); }
  // el carrito de las naranjas en la acera de este lado (x 258–312): la pirámide de fruta, la sombrilla a rayas que
  // tiembla con el aire y la balanza de latón que se balancea
  { const x0 = 258, s = 168; R.rect(x0, s - 14, x0 + 50, s - 12, P.maderaL); R.rect(x0, s - 11, x0 + 50, s - 6, P.madera); R.rect(x0, s - 11, x0 + 50, s - 11, P.maderaL); for (let x = x0 + 4; x < x0 + 50; x += 10) R.rect(x, s - 10, x + 6, s - 7, P.maderaS);
    R.rect(x0 + 50, s - 12, x0 + 62, s - 12, P.maderaS); R.disco(x0 + 14, s - 4, 5, C.k); R.disco(x0 + 14, s - 4, 4, P.madera); R.disco(x0 + 14, s - 4, 1, P.maderaD); for (let a = 0; a < 4; a++) R.linea(x0 + 14, s - 4, Math.round(x0 + 14 + Math.cos(a * 0.8) * 4), Math.round(s - 4 + Math.sin(a * 0.8) * 4), P.maderaD);
    R.rect(x0 + 40, s - 6, x0 + 41, s, P.maderaS);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 9 - j * 2; i++) { const ox = x0 + 4 + j * 5 + i * 5, oy = s - 17 - j * 4; R.disco(ox, oy, 2.4, hex('#e8862a')); R.pset(ox - 1, oy - 1, hex('#f8b860')); R.pset(ox + 1, oy + 1, hex('#b85a1a')); }
    R.rect(x0 + 25, s - 46, x0 + 25, s - 14, P.maderaS); const fl = Math.round(Math.sin(t * 2.2) * 0.7);
    for (let j = 0; j < 7; j++) { const w = 6 + j * 3; for (let x = x0 + 25 - w; x <= x0 + 25 + w; x++) R.pset(x, s - 52 + j, Math.floor((x - x0 + 60) / 5) % 2 ? P.toldoC : P.toldoV); }
    for (let x = x0 + 1; x <= x0 + 49; x += 2) R.pset(x, s - 45 + (((x >> 1) % 2) ? fl : 0), P.toldoVS);
    const bal = Math.sin(t * 1.3) * 2; R.rect(x0 + 44, s - 26, x0 + 44, s - 14, P.latonS); R.linea(x0 + 38, Math.round(s - 25 + bal), x0 + 50, Math.round(s - 25 - bal), P.laton);
    for (const [bx, d] of [[x0 + 38, 1], [x0 + 50, -1]]) { const by = Math.round(s - 25 + bal * d); R.linea(bx, by, bx - 2, by + 4, P.latonS); R.linea(bx, by, bx + 2, by + 4, P.latonS); R.rect(bx - 3, by + 4, bx + 3, by + 4, P.laton); } }
  for (const [x, y] of [[214, 172], [150, 160], [70, 176]]) { R.pset(x, y, hex('#e8862a')); R.pset(x + 1, y, hex('#c86a1a')); }
  // un papel que el viento arrastra por la acera y las motas de la calima al sol
  { const u = (t * 0.07) % 1, x = Math.round(-20 + u * 360), y = Math.round(168 + Math.sin(t * 3) * 3 - Math.abs(Math.sin(t * 5)) * 3), g = Math.floor(t * 6) % 2; R.rect(x, y, x + 3 - g, y + 1 + g, P.papelL); R.pset(x + 1, y, P.papelS); }
  motas(R, t, 30, 290, 70, 150, 12, P.calimaL);
  return { tranvia: 141 };
}

function c_vendedorFijo(R) {
  const P = c_P, { rect, pset, linea, disco } = R, B = R.buf;
  // la pared de arriba (tranquila bajo el año y bajo Atom), con una grieta y el soporte de un farol
  c_tex(R, 0, 0, 319, 34, P.ocre, P.ocreS, P.ocreL, 860, 0.04);
  for (let i = 0; i < 18; i++) pset(196 + (i >> 1) + (h(i, 1, 861) < 0.5 ? 1 : 0), 6 + i, P.ocreD);
  // el café: el marco de madera, el rótulo de rayas con la taza, el escaparate (el dentro se pinta cada fotograma) y el zócalo
  rect(0, 34, 140, 150, P.madera); rect(0, 34, 140, 35, P.maderaL); rect(138, 34, 140, 150, P.maderaS);
  rect(4, 38, 136, 50, P.verdeS); rect(5, 39, 135, 49, P.verde); rect(5, 39, 135, 39, P.verdeL);
  for (let i = 0; i < 6; i++) rect(30 + i * 15, 43, 30 + i * 15 + 9, 45, P.toldoC); c_taza(R, 10, 41, P.toldoC); c_taza(R, 120, 41, P.toldoC);
  rect(4, 54, 136, 54, P.maderaD); rect(4, 138, 136, 140, P.maderaD);
  for (let x = 6; x < 136; x += 32) { rect(x, 141, x + 28, 148, P.maderaS); rect(x + 1, 142, x + 27, 147, P.madera); rect(x + 1, 142, x + 27, 142, P.maderaL); rect(x + 4, 144, x + 24, 145, P.maderaS); }
  // el pilar de piedra a franjas (rojo y crema) y la pared de sillares con los carteles de rayas
  for (let y = 34; y < 150; y++) for (let x = 140; x < 152; x++) pset(x, y, Math.floor((y - 34) / 8) % 2 ? (x === 140 ? P.rosaS : P.rosa) : (x === 140 ? P.estucoS : P.estucoL));
  for (let y = 34; y < 150; y++) for (let x = 152; x < 222; x++) { const fila = Math.floor((y - 34) / 10), L = 18, xx = x + (fila & 1) * 9; B[y * 320 + x] = (y - 34) % 10 === 0 || xx % L === 0 ? P.junta : h(Math.floor(xx / L), fila, 862) < 0.3 ? P.estucoS : h(x, y, 863) < 0.06 ? P.estucoD : P.estuco; }
  for (const [x0, y0, x1, y1, c] of [[158, 52, 186, 86, P.papel], [190, 60, 214, 92, hex('#d8c8a0')]]) { rect(x0, y0, x1, y1, c); rect(x1 + 1, y0 + 1, x1 + 1, y1 + 1, P.estucoD); rect(x0 + 3, y0 + 3, x1 - 3, y0 + 7, P.toldoR); for (let y = y0 + 11; y < y1 - 3; y += 3) rect(x0 + 3, y, x1 - (y % 2 ? 6 : 3), y, P.tintaS);
    pset(x1, y1, P.estuco); pset(x1 - 1, y1, P.estuco); pset(x1, y1 - 1, P.estuco); }
  c_picto(R, 164, 64, 1);
  // la casa de la derecha: el arco de dovelas rojas y crema, la celosía del tímpano, la puerta claveteada, el escalón
  c_tex(R, 222, 34, 319, 138, P.estuco, P.estucoS, P.estucoL, 864, 0.06);
  { const cx = 250, sp = 68, r = 26; for (let j = sp - r - 7; j <= sp; j++) for (let i = -r - 7; i <= r + 7; i++) { const d = Math.hypot(i, sp - j); if (d > r + 6 || d < r) continue; const a = Math.atan2(sp - j, i), dov = Math.floor((a / Math.PI) * 13);
      pset(cx + i, j, d > r + 5 || d < r + 1 ? P.estucoD : dov % 2 ? P.rosa : P.estucoL); }
    for (let j = sp - r; j <= sp; j++) for (let i = -r + 1; i <= r - 1; i++) { if (Math.hypot(i, sp - j) > r - 0.5) continue; pset(cx + i, j, (i + j) % 3 === 0 || (i - j + 99) % 3 === 0 ? P.madera : hex('#2a1c12')); }
    rect(cx - r - 7, sp, cx - r - 1, 138, P.estucoL); rect(cx - r - 7, sp, cx - r - 7, 138, P.estucoS); rect(cx + r + 1, sp, cx + r + 7, 138, P.estucoS); rect(cx + r + 7, sp, cx + r + 7, 138, P.estucoD);
    for (let y = sp + 4; y < 138; y += 9) { rect(cx - r - 7, y, cx - r - 1, y, P.estucoS); rect(cx + r + 1, y, cx + r + 7, y, P.estucoD); }
    rect(cx - r - 8, sp, cx + r + 8, sp + 1, P.estucoL); rect(cx - r - 8, sp + 2, cx + r + 8, sp + 2, P.estucoD);
    const x0 = cx - r, x1 = cx + r; rect(x0, sp + 3, x1, 138, P.maderaD); rect(x0 + 1, sp + 3, cx - 1, 138, P.madera); rect(cx + 1, sp + 3, x1 - 1, 138, P.madera);
    for (const [a0, a1] of [[x0 + 1, cx - 1], [cx + 1, x1 - 1]]) { for (const [y0, y1] of [[sp + 7, sp + 33], [sp + 37, 134]]) { rect(a0 + 3, y0, a1 - 3, y1, P.maderaS); rect(a0 + 4, y0 + 1, a1 - 4, y1 - 1, P.madera); rect(a0 + 4, y0 + 1, a1 - 4, y0 + 1, P.maderaL);
        const ccx = (a0 + a1) >> 1, ccy = (y0 + y1) >> 1; for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; linea(ccx, ccy, Math.round(ccx + Math.cos(an) * 6), Math.round(ccy + Math.sin(an) * 6), P.maderaS); } disco(ccx, ccy, 2, P.maderaL); }
      for (let y = sp + 5; y < 138; y += 7) for (const xx of [a0 + 1, a1 - 1]) { pset(xx, y, P.latonL); pset(xx, y + 1, P.latonS); } }
    R.anillo(cx - 4, sp + 36, 3, P.laton); pset(cx - 4, sp + 33, P.latonL); R.anillo(cx + 4, sp + 36, 3, P.laton); }
  rect(206, 138, 319, 140, P.aceraL); rect(206, 141, 319, 150, P.acera); rect(206, 141, 319, 141, P.aceraS); for (let x = 206; x < 320; x += 25) rect(x, 141, x, 150, P.junta); rect(205, 138, 205, 150, P.aceraS);
  c_velo(R, 207, 141, 319, 145, C.k, 0.18); for (let k = 0; k < 14; k++) pset(208 + Math.round(h(k, 1, 867) * 110), 139 + (k % 2), P.aceraS);
  // la acera de losas grandes
  const fil = [150, 156, 164, 174, 186];
  for (let y = 150; y < 180; y++) { const f = y * 320, r = fil.findIndex((v) => y < v), y0 = fil[r - 1] ?? 150, L = 34 + r * 10;
    for (let x = 0; x < 320; x++) { const xx = x + (r & 1) * (L >> 1), k = Math.floor(xx / L), q = h(k, r, 865); let c = q < 0.3 ? P.acera : q < 0.6 ? c_mez(P.acera, P.aceraL, 0.4) : c_mez(P.acera, P.aceraS, 0.3);
      if (y === y0 || xx % L === 0) c = P.junta; else if (y === y0 + 1) c = c_mez(c, P.aceraL, 0.5); else if (h(x, y, 866) < 0.05) c = P.aceraS; B[f + x] = c; } }
  c_velo(R, 0, 150, 212, 153, C.k, 0.2);
  // el cajón con los fajos de periódicos atados (rayas, sin letras) y la piedra que los sujeta
  rect(150, 146, 196, 166, P.maderaS); rect(151, 147, 195, 165, P.madera); for (let y = 151; y < 165; y += 5) rect(151, y, 195, y, P.maderaS); rect(151, 147, 195, 147, P.maderaL); rect(172, 147, 173, 165, P.maderaS);
  for (let k = 0; k < 4; k++) { const y0 = 140 - k * 4, x0 = 152 + (k % 2) * 2; rect(x0, y0, x0 + 40, y0 + 4, P.papelS); rect(x0, y0, x0 + 40, y0, P.papelL); for (let x = x0 + 2; x < x0 + 40; x += 4) pset(x, y0 + 2, P.tintaS); rect(x0 + 13, y0, x0 + 13, y0 + 4, P.maderaS); rect(x0 + 28, y0, x0 + 28, y0 + 4, P.maderaS); }
  disco(186, 125, 3, P.lejosD); pset(185, 124, P.lejosL);
  return {};
}

// el periódico abierto TIRADO en el suelo (NUESTRO, sin letras), visto en escorzo: la cabecera negra, el titular de dos
// barras gordas, el pictograma de la maldición, las columnas de rayas; la esquina de la derecha se levanta con el aire
function c_periodicoSuelo(R, x0, y0, x1, y1, t) {
  const P = c_P, alza = Math.max(0, Math.sin(t * 1.7)) * 2;
  R.poligono([[x0 + 4, y0], [x1 - 4, y0], [x1, y1], [x0, y1]], P.papelS);
  R.poligono([[x0 + 5, y0], [x1 - 5, y0], [x1 - 1, y1 - 1], [x0 + 1, y1 - 1]], P.papel);
  const L = (u, y) => Math.round(lerp(x0 + 5 - (y - y0) * 0.25, x1 - 5 + (y - y0) * 0.25, u));
  R.rect(L(0.08, y0 + 1), y0 + 1, L(0.92, y0 + 1), y0 + 2, P.tinta);
  R.rect(L(0.08, y0 + 4), y0 + 4, L(0.85, y0 + 4), y0 + 5, P.tinta); R.rect(L(0.08, y0 + 7), y0 + 7, L(0.6, y0 + 7), y0 + 7, P.tinta);
  c_picto(R, L(0.1, y0 + 9), y0 + 9, 1, { u: hex('#d8b070') });
  for (let y = y0 + 9; y < y1 - 1; y += 2) { R.rect(L(0.5, y), y, L(0.9, y), y, P.tintaS); }
  R.rect(L(0.49, y0 + 3), y0 + 3, L(0.49, y0 + 3), y1 - 2, P.papelS);
  if (alza > 0.5) { R.poligono([[x1 - 10, y0 + 1], [x1 - 2, y0 + 1], [x1 - 4, y0 - Math.round(alza)]], P.papelL); }
}

// LA CÁMARA 'vendedor': ver la cabecera de cairo()
function c_vendedor(R, t, o) {
  const P = c_P; c_capa(R, 'tu-vendedor', () => c_vendedorFijo(R));
  // el escaparate del café, por dentro (recortado a su hueco): la pared de azulejos, el espejo, los estantes, las
  // lámparas de latón, el mostrador con la cafetera que humea y los parroquianos que juegan al tablero
  R.recorte([5, 55, 135, 137]);
  for (let y = 55; y <= 137; y++) for (let x = 5; x <= 135; x++) { const az = y > 112; R.pset(x, y, az ? (((x >> 2) + (y >> 2)) % 2 ? hex('#3a5a7a') : hex('#c8c4b4')) : (h(x >> 1, y >> 1, 870) < 0.12 ? P.huecoL : P.hueco)); }
  for (let y = 112; y <= 137; y += 4) R.linea(5, y, 135, y, hex('#2a3a4a'));
  c_rc(R, 52, 64, 90, 92, P.maderaD); c_rc(R, 53, 65, 89, 91, P.maderaL); c_rc(R, 54, 66, 88, 90, hex('#4a5a5e')); R.linea(56, 88, 70, 68, hex('#6a7a7e')); R.linea(62, 88, 76, 68, hex('#5a6a6e'));
  for (const sy of [70, 84]) { c_rc(R, 96, sy, 132, sy, P.madera); for (let i = 0; i < 8; i++) { const gx = 98 + i * 4; c_rc(R, gx, sy - 3, gx + 1, sy - 1, i % 3 ? P.cristalL : P.cobre); } }
  c_rc(R, 98, 104, 135, 137, P.madera); c_rc(R, 98, 104, 135, 105, P.maderaL); c_rc(R, 100, 108, 133, 108, P.maderaS);
  R.disco(110, 100, 3, P.cobre); R.pset(109, 98, P.cobreL); c_rc(R, 113, 98, 115, 98, P.cobre); c_rc(R, 120, 96, 126, 103, P.cobre); c_rc(R, 120, 96, 120, 103, P.cobreL);
  for (let k = 0; k < 7; k++) { const u = (t * 0.6 + k / 7) % 1, x = Math.round(110 + Math.sin(t * 2 + k) * 2 * u), y = Math.round(95 - u * 22); R.pset(x, y, c_mez(R.pget(x, y), hex('#f0ece4'), 0.75 - u * 0.6)); }
  for (const [lx, f] of [[28, 0], [74, 1.7]]) { const sw = Math.round(Math.sin(t * 0.9 + f) * 1); R.linea(lx, 55, lx + sw, 64, P.latonS); R.disco(lx + sw, 66, 3, P.laton); R.pset(lx + sw - 1, 65, P.latonL);
    const luz = 0.85 + Math.sin(t * 13 + f) * 0.08; for (let j = 0; j < 16; j++) for (let i = -10 - j; i <= 10 + j; i += 2) { const x = lx + sw + i + (j & 1), y = 70 + j; if (c_um(x, y) < 0.5 * luz * (1 - j / 16)) R.pset(x, y, c_mez(R.pget(x, y), hex('#a8783c'), 0.35)); } R.pset(lx + sw, 69, hex('#fff0b0')); }
  // dos mesitas con el tablero y los cuatro parroquianos
  for (const [mx, k] of [[26, 0], [70, 2]]) { c_rc(R, mx - 7, 124, mx + 7, 125, P.maderaL); c_rc(R, mx, 126, mx, 136, P.maderaS); c_rc(R, mx - 5, 122, mx + 5, 123, hex('#c8a060')); c_rc(R, mx - 5, 122, mx - 5, 123, P.maderaS); c_rc(R, mx, 122, mx, 123, P.maderaS);
    if (Math.floor(t * 1.3 + k) % 4 === 0) { R.pset(mx - 2, 120 - (Math.floor(t * 8) % 2), C.blanco); R.pset(mx + 1, 120, C.blanco); }
    c_sentado(R, mx - 12, 136, t, k, 1); c_sentado(R, mx + 12, 136, t, k + 1, -1); }
  // el reflejo de la calle en el cristal: dos rayas de luz quietas y, cada poco, el tranvía que pasa reflejado
  for (let y = 55; y <= 137; y++) { const x = 20 + Math.round((137 - y) * 0.5); for (const d of [0, 1, 6]) R.pset(x + d, y, c_mez(R.pget(x + d, y), C.blanco, 0.22)); }
  { const u = (t % 11) / 11, x = Math.round(160 - u * 260); for (let y = 76; y < 96; y++) for (let i = 0; i < 46; i++) { const xx = x + i; if (xx < 5 || xx > 135) continue; R.pset(xx, y, c_mez(R.pget(xx, y), y > 89 ? P.tranviaR : P.tranvia, 0.18)); } }
  R.recorte(null);
  for (const x of [48, 92]) { R.rect(x, 55, x + 1, 137, P.maderaS); R.rect(x, 55, x, 137, P.maderaL); }
  // el toldo grande a rayas, con su sombra en el cristal y el fleco que ondea
  c_velo(R, 0, 50, 140, 60, C.k, 0.25);
  c_toldo(R, 0, 206, 28, 46, P.toldoR, P.toldoRS, P.toldoC, P.toldoCS, t, 4, 9);
  R.rect(0, 26, 206, 27, C.metalS); for (const x of [2, 100, 204]) R.linea(x, 46, x + 4, 20, C.metalD);
  // el farol de la puerta, que se mece
  { const sw = Math.round(Math.sin(t * 1.2) * 1.5); R.rect(206, 52, 216, 53, C.k); R.linea(208, 53, 208 + sw, 58, C.k); R.rect(205 + sw, 58, 211 + sw, 59, P.verdeS); R.rect(206 + sw, 60, 210 + sw, 66, hex('#f0e2b0')); R.rect(208 + sw, 60, 208 + sw, 66, P.verdeS); R.rect(205 + sw, 67, 211 + sw, 67, P.verdeS); }
  // la hoja de arriba del fajo, que el viento levanta, y un papel suelto que corre por la acera
  { const a = Math.max(0, Math.sin(t * 2.1)); R.poligono([[154, 128], [190, 128], [190 - Math.round(a * 6), 127 - Math.round(a * 7)], [154, 127 - Math.round(a * 3)]], P.papelL); }
  // el periódico tirado en el suelo y el gato egipcio que se sube encima (o.gato 0–1)
  c_periodicoSuelo(R, 204, 160, 276, 177, t);
  const g = c_lim(o.gato ?? 0); let gx, gy, modo = 'sienta', dir = -1;
  if (g < 0.12) { gx = 300; gy = 139; }
  else if (g < 0.55) { const u = (g - 0.12) / 0.43; gx = lerp(300, 230, u); gy = 139; modo = 'anda'; }
  else if (g < 0.68) { const u = (g - 0.55) / 0.13; gx = lerp(230, 244, u); gy = Math.round(lerp(139, 170, u) - Math.sin(u * Math.PI) * 10); modo = 'salta'; }
  else if (g < 0.84) { const u = (g - 0.68) / 0.16; gx = 244 + Math.round(Math.sin(u * Math.PI * 2) * 5); gy = 170; modo = 'anda'; dir = u < 0.5 ? 1 : -1; }
  else { gx = 244; gy = 170; modo = g >= 0.99 ? 'lame' : 'sienta'; }
  c_gato(R, Math.round(gx), Math.round(gy), t, modo, dir);
  // una paloma que picotea por la acera
  { const u = (t % 14) / 14, px = Math.round(u < 0.5 ? lerp(16, 60, u * 2) : lerp(60, 16, (u - 0.5) * 2)), py = 176, pi = Math.sin(t * 6) > 0.4 ? 1 : 0, d = u < 0.5 ? 1 : -1;
    R.rect(px - 2, py - 3, px + 2, py - 1, hex('#8a8a9a')); R.rect(px - 2, py - 1, px + 1, py - 1, hex('#6a6a7a')); R.rect(px + 2 * d, py - 5 + pi, px + 3 * d, py - 3 + pi, hex('#9a9aaa')); R.pset(px + 4 * d, py - 4 + pi, hex('#e8a040')); R.pset(px + 3 * d, py - 5 + pi, C.k); R.pset(px, py, hex('#c86a5a')); R.pset(px - 3 * d, py - 3, hex('#5a5a6a')); }
  motas(R, t, 150, 310, 60, 150, 8, P.calimaL);
  return { gato: [Math.round(gx), Math.round(gy)] };
}

// la paleta de la tarde: el cielo malva y naranja, las nubes rosadas, la fachada dorada por el sol bajo
const c_H = pal({
  c0: '#5a6aa8', c1: '#8a86b8', c2: '#c896a8', c3: '#eeb08a', c4: '#f8d6a0', n0: '#a87a90', n1: '#e2a4a0', n2: '#ffdcb8',
  f: '#eec894', fS: '#c49a66', fL: '#fadcae', fD: '#8e6a46', col: '#f4dcb0', colS: '#c8a274', sol: '#fff2c4', solL: '#ffe08a',
  baldosa: '#c8784e', baldosaS: '#a05a3a', crema: '#ecd8b0', cremaS: '#c8b08a', alfombra: '#a82a2e', alfombraL: '#c84a40',
  dentro: '#3a2418', dentroL: '#6a4024', vidrio: '#f0c878', vidrioS: '#c08a48', sombra: '#7a5a5a',
});

// el fondo fijo del hotel: el cielo de la tarde, el sol bajo, el pabellón del jardín, la fachada con sus tres pisos y
// la galería, la entrada con la escalinata, la explanada de baldosas con las sombras largas y las dos farolas
function c_hotelFijo(R, marca) {
  const P = c_P, H = c_H, { rect, pset, linea, disco } = R, B = R.buf;
  c_degradado(R, 0, 140, [[0, H.c0], [0.18, H.c1], [0.4, H.c2], [0.62, H.c3], [0.85, H.c4], [1, H.sol]]);
  marca();
  // el sol bajo, a la izquierda, con su halo, entre la palmera y el hotel
  for (let j = -22; j <= 22; j++) for (let i = -22; i <= 22; i++) { const d = Math.hypot(i, j), x = 12 + i, y = 70 + j; if (d < 9) pset(x, y, d < 6 ? H.sol : H.solL); else if (d < 22 && c_um(x, y) < (22 - d) / 26) pset(x, y, c_mez(R.pget(x, y), H.solL, 0.5)); }
  // el jardín de la derecha: el pabellón bajo, con su tejadillo, y las palmeras lejanas en la luz
  c_tex(R, 270, 70, 319, 140, H.fS, H.fD, H.f, 880, 0.08); rect(268, 66, 319, 69, H.fL); rect(268, 70, 319, 70, H.fD);
  for (const x of [278, 300]) { rect(x, 80, x + 10, 104, H.dentro); rect(x, 80, x + 10, 80, H.fD); rect(x + 5, 80, x + 5, 104, H.fD); rect(x - 1, 105, x + 11, 105, H.fL); }
  // EL HOTEL (x 30–270): la balaustrada del tejado con jarrones, el frontón central, la cornisa
  c_tex(R, 30, 30, 270, 140, H.f, H.fS, H.fL, 881, 0.08);
  rect(28, 30, 272, 33, H.fL); rect(28, 34, 272, 35, H.fD); rect(30, 36, 270, 36, H.fS);
  for (let x = 30; x <= 270; x += 4) { rect(x, 25, x + 1, 29, H.fL); pset(x + 1, 27, H.fS); } rect(28, 24, 272, 24, H.fL); rect(28, 29, 272, 29, H.fS);
  for (let x = 34; x <= 266; x += 24) { if (x < 186) continue; rect(x - 1, 21, x + 2, 23, H.fS); disco(x + 0.5, 19, 2, H.fL); pset(x, 16, H.fS); pset(x - 1, 18, H.fD + 0); }
  R.poligono([[116, 30], [150, 21], [184, 30]], H.fL); R.poligono([[122, 29], [150, 23], [178, 29]], H.fS); rect(116, 30, 184, 31, H.fD);
  disco(150, 27, 2, H.fD); pset(150, 26, H.fL);
  rect(30, 30, 31, 140, H.fL); rect(268, 30, 270, 140, H.fD);
  // piso alto: ventanas altas con contraventanas verdes (unas abiertas, otras entornadas)
  for (let i = 0; i < 10; i++) { const x = 38 + i * 24; if (x > 132 && x < 162) continue; const ab = h(i, 1, 882);
    rect(x - 1, 38, x + 11, 38, H.fL); rect(x, 40, x + 10, 54, H.dentro); rect(x + 5, 40, x + 5, 54, H.fD); rect(x, 47, x + 10, 47, H.fD);
    if (ab < 0.4) { rect(x, 40, x + 10, 54, P.verde); for (let y = 41; y < 54; y += 2) rect(x + 1, y, x + 9, y, P.verdeL); rect(x + 5, 40, x + 5, 54, P.verdeS); }
    else { rect(x - 5, 40, x - 1, 54, P.verde); rect(x + 11, 40, x + 15, 54, P.verde); for (let y = 41; y < 54; y += 2) { rect(x - 4, y, x - 2, y, P.verdeL); rect(x + 12, y, x + 14, y, P.verdeL); } rect(x + 11, 40, x + 11, 54, P.verdeS); }
    rect(x - 1, 55, x + 11, 56, H.fL); rect(x - 1, 57, x + 11, 57, H.fD); }
  // el ventanal del centro con su arco
  for (let j = 0; j < 18; j++) for (let i = 0; i <= 24; i++) { if (j < 12 && Math.hypot(i - 12, j - 12) > 12) continue; pset(138 + i, 38 + j, j < 12 ? (((i + j) % 4) ? H.dentroL : H.fD) : H.dentro); }
  // primer piso: balcones de hierro y toldillos a rayas naranja y crema sobre las ventanas
  rect(30, 59, 270, 59, H.fL); rect(30, 60, 270, 60, H.fD);
  for (let i = 0; i < 10; i++) { const x = 38 + i * 24;
    rect(x, 66, x + 10, 82, H.dentro); rect(x + 5, 66, x + 5, 82, H.fD); rect(x, 66, x + 10, 66, H.fD); for (let y = 68; y < 81; y += 4) rect(x + 1, y, x + 4, y, H.dentroL);
    for (let y = 62; y <= 66; y++) { const w = y - 62; for (let xx = x - 2 - (w >> 1); xx <= x + 12 + (w >> 1); xx++) pset(xx, y, (Math.floor((xx - x + 20) / 3) % 2) ? P.toldoC : hex('#d8783a')); }
    for (let xx = x - 4; xx <= x + 14; xx += 2) pset(xx, 67, hex('#d8783a'));
    rect(x - 4, 76, x + 14, 76, C.k); rect(x - 4, 82, x + 14, 82, C.k); for (let xx = x - 4; xx <= x + 14; xx += 2) rect(xx, 77, xx, 81, xx % 4 ? C.k : hex('#3a3440')); rect(x - 5, 83, x + 15, 84, H.fS); pset(x - 4, 85, H.fD); pset(x + 14, 85, H.fD);
    c_velo(R, x - 3, 85, x + 15, 87, H.fD, 0.35); }
  // la imposta y la galería de arcos de la planta baja, con las columnas, sus capiteles y el fondo oscuro
  rect(30, 88, 270, 89, H.fL); rect(30, 90, 270, 91, H.fD);
  for (let x = 32; x < 270; x++) for (let y = 92; y < 140; y++) { const k = Math.floor((x - 32) / 24), cx = 32 + k * 24 + 12, dx = Math.abs(x - cx); if (dx < 3) continue; const top = 104 - Math.round(Math.sqrt(Math.max(0, 81 - dx * dx)));
    if (y >= top + 3) pset(x, y, y < top + 6 ? H.dentro : (h(x >> 1, y >> 1, 883) < 0.15 ? H.dentroL : H.dentro)); else if (y >= top + 1) pset(x, y, H.fD); }
  for (let k = 0; k <= 10; k++) { const x = 32 + k * 24 - 3; if (x > 270) break; rect(x, 94, x + 5, 140, H.col); rect(x, 94, x, 140, H.fL); rect(x + 4, 94, x + 5, 140, H.colS); rect(x - 1, 92, x + 6, 94, H.fL); rect(x - 1, 95, x + 6, 95, H.fD); rect(x - 1, 137, x + 6, 140, H.fS); }
  for (let k = 0; k < 10; k++) { const x = 44 + k * 24; if (x > 132 && x < 170) continue; rect(x - 3, 130, x + 3, 139, P.toldoRS); rect(x - 2, 130, x + 2, 131, P.toldoR); for (let j = 0; j < 7; j++) pset(x - 3 + j, 128 - (j % 3), P.hierbaS); }
  // la entrada: el porche saliente con su marquesina de hierro y cristal, la puerta de cristales encendida y los escalones con alfombra roja
  rect(130, 92, 170, 140, H.dentro); rect(136, 100, 164, 140, H.vidrioS); for (let x = 137; x < 164; x++) for (let y = 101; y < 140; y++) pset(x, y, (x - 137) % 7 === 0 || (y - 101) % 9 === 0 ? H.fD : (y < 110 ? H.sol : H.vidrio));
  rect(150, 100, 150, 140, H.fD); pset(147, 122, P.latonL); pset(153, 122, P.latonL);
  rect(124, 84, 176, 86, C.k); rect(125, 84, 175, 84, H.fL); for (let x = 126; x < 176; x += 4) linea(x, 86, x + 2, 90, C.k); rect(124, 90, 176, 90, C.k);
  for (const x of [124, 174]) { rect(x, 91, x + 2, 140, H.col); rect(x + 2, 91, x + 2, 140, H.colS); }
  for (let s = 0; s < 4; s++) { const y = 140 + s * 4; rect(128 - s * 2, y, 172 + s * 2, y + 3, H.crema); rect(128 - s * 2, y, 172 + s * 2, y, H.fL); rect(128 - s * 2, y + 3, 172 + s * 2, y + 3, H.cremaS); }
  rect(142, 140, 158, 155, H.alfombra); for (let y = 141; y < 156; y += 4) rect(142, y, 158, y, H.alfombraL); rect(141, 140, 141, 155, P.laton); rect(159, 140, 159, 155, P.laton);
  // la explanada de baldosas a cuadros con su desgaste y las sombras largas de la tarde (hacia la derecha)
  for (let y = 140; y < 180; y++) { const f = y * 320, p = (y - 140) / 40, L = 6 + Math.round(p * 6);
    for (let x = 0; x < 320; x++) { const cx = Math.floor(x / L), cy = Math.floor((y - 140) / Math.max(3, Math.round(L * 0.5))), q = h(x, y, 884);
      let c = (cx + cy) % 2 ? H.baldosa : H.crema; if ((x % L === 0) || ((y - 140) % Math.max(3, Math.round(L * 0.5)) === 0)) c = (cx + cy) % 2 ? H.baldosaS : H.cremaS; if (q < 0.05) c = c_mez(c, C.k, 0.15);
      B[f + x] = c; } }
  for (let s = 0; s < 4; s++) { const y = 140 + s * 4; rect(128 - s * 2, y, 172 + s * 2, y + 3, H.crema); rect(128 - s * 2, y, 172 + s * 2, y, H.fL); rect(128 - s * 2, y + 3, 172 + s * 2, y + 3, H.cremaS); }
  rect(142, 140, 158, 155, H.alfombra); for (let y = 141; y < 156; y += 4) rect(142, y, 158, y, H.alfombraL); rect(141, 140, 141, 155, P.laton); rect(159, 140, 159, 155, P.laton);
  c_velo(R, 30, 140, 270, 142, H.fD, 0.35);
  for (let k = 0; k <= 10; k++) { const x = 32 + k * 24; for (let i = 0; i < 18; i++) { const y = 141 + (i >> 2); for (let w = 0; w < 4; w++) { const xx = x + i + w; if (xx < 320 && !(xx > 124 && xx < 176)) pset(xx, y, c_mez(R.pget(xx, y), H.sombra, 0.35)); } } }
  // las farolas de la explanada (dos), con su globo
  for (const x of [112, 188]) { rect(x - 2, 150, x + 2, 152, C.k); rect(x - 1, 108, x + 1, 150, hex('#2a2a30')); rect(x - 1, 108, x - 1, 150, hex('#4a4a54')); for (const y of [118, 132]) rect(x - 2, y, x + 2, y, hex('#2a2a30'));
    rect(x - 4, 104, x + 4, 105, hex('#2a2a30')); for (const s of [-4, 4]) { rect(x + s, 98, x + s, 104, hex('#2a2a30')); disco(x + s, 96, 2.5, hex('#fff0c8')); pset(x + s - 1, 95, C.blanco); }
    disco(x, 96, 3, hex('#fff0c8')); pset(x - 1, 94, C.blanco); rect(x, 91, x, 92, hex('#2a2a30'));
    for (let i = 0; i < 40; i++) { const xx = x + 2 + i, y = 152 - Math.round(i * 0.05); pset(xx, y, c_mez(R.pget(xx, y), H.sombra, 0.4)); } }
  return {};
}

// LA FACHADA DEL HOTEL (general): ver la cabecera de cairo()
function c_hotel(R, t, o) {
  const P = c_P, H = c_H, cap = c_capa(R, 'tu-hotel', (marca) => c_hotelFijo(R, marca)), m = cap.m, B = R.buf;
  c_nubes(R, t, m, [H.n0, H.n1, H.n2], 6, 56, 7, 1.6, 21, 0.7);
  c_pajaros(R, t, m, 6, 40, 70, hex('#3a2a3a'), 9, 12);
  // las palmeras del jardín de la derecha (por debajo de Atom) y la de la izquierda, junto al sol
  c_palmera(R, 296, 140, 72, t, 0.2, 1); c_palmera(R, 8, 140, 80, t, 0.25, 3);
  // las luces de la galería que tiemblan, y las ventanas que se van encendiendo
  for (let k = 0; k < 10; k++) { const x = 44 + k * 24; if (x > 120 && x < 180) continue; const l = 0.75 + 0.25 * Math.sin(t * 9 + k * 1.7) * Math.sin(t * 3.3 + k);
    R.rect(x, 98, x, 102, C.k); R.rect(x - 1, 103, x + 1, 106, l > 0.8 ? hex('#fff0b0') : hex('#f0c870')); R.pset(x, 107, C.k);
    for (let j = 0; j < 10; j++) for (let i = -j; i <= j; i += 2) { const xx = x + i + (j & 1), yy = 108 + j; if (c_um(xx, yy) < 0.5 * l * (1 - j / 10)) R.pset(xx, yy, c_mez(R.pget(xx, yy), H.vidrio, 0.4)); } }
  for (let i = 0; i < 10; i++) { const x = 38 + i * 24, on = ((t * 0.3 + h(i, 4, 885) * 7) % 7) < 3.5 && h(i, 5, 885) < 0.6; if (on) for (let y = 68; y < 82; y++) for (let xx = x + 1; xx < x + 10; xx++) if (xx !== x + 5 && (y - 68) % 4) R.pset(xx, y, y < 72 ? H.sol : H.vidrio); }
  // la terraza de la izquierda: dos veladores con sombrilla, los clientes que toman el té y el camarero
  for (const [mx, k] of [[34, 0], [86, 2], [216, 1]]) { const fl = Math.round(Math.sin(t * 2 + k) * 0.6);
    R.rect(mx - 4, 140, mx + 4, 140, P.galabeya); R.rect(mx, 141, mx, 146, C.metalS); R.rect(mx - 2, 146, mx + 2, 146, C.metalS); R.pset(mx - 2, 139, C.blanco); R.pset(mx + 1, 139, P.cobre);
    c_sentado(R, mx - 7, 146, t, k, 1); c_sentado(R, mx + 7, 146, t, k + 1, -1);
    R.rect(mx, 122, mx, 139, C.metalD); for (let j = 0; j < 6; j++) { const w = 4 + j * 2; R.rect(mx - w, 118 + j, mx + w, 118 + j, (j + Math.floor((mx + 99) / 7)) % 2 ? P.toldoC : P.toldoR); }
    for (let i = -14; i <= 14; i += 2) R.pset(mx + i, 124 + ((i >> 1) % 2 ? fl : 0), (i >> 1) % 2 ? P.toldoRS : P.toldoCS); }
  { const u = (t % 12) / 12, x = u < 0.5 ? lerp(20, 104, u * 2) : lerp(104, 20, (u - 0.5) * 2); c_figura(R, x, 148, t, 'camarero', 2, u < 0.5 ? 1 : -1, true); }
  // el portero con fez junto a la puerta, que saluda con una inclinación cada poco
  { const inc = (t % 6) < 0.8; c_figura(R, 182, 141 + (inc ? 1 : 0), t, 'efendi', 1, -1, false); if (inc) R.pset(181, 133, P.fez); }
  // el coche negro que espera a la derecha, con el motor en marcha y el chófer
  c_cocheGrande(R, 300, 168, t, -1);
  motas(R, t, 20, 260, 100, 170, 12, H.solL);
  return {};
}

// el coche negro grande (una berlina de 1923) de lado, parado con el motor en marcha: tiembla un poco, echa humo por
// detrás y el chófer de gorra espera dentro; x es la trasera según dir
function c_cocheGrande(R, x, suelo, t, dir = 1) {
  const P = c_P, X = (i) => Math.round(x + i * dir), r = (a, b, y0, y1, c) => R.rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c), tb = Math.sin(t * 25) > 0.3 ? 1 : 0, k = hex('#1a1a20'), kL = hex('#3a3a48'), kH = hex('#6a6a7a');
  for (let i = 0; i < 70; i++) R.pset(X(-4 + i), suelo, c_mez(R.pget(X(-4 + i), suelo), hex('#5a3a2a'), 0.5));
  r(0, 62, suelo - 14 - tb, suelo - 5, C.k); r(1, 61, suelo - 13 - tb, suelo - 6, k); r(1, 61, suelo - 13 - tb, suelo - 13 - tb, kL); r(1, 61, suelo - 9, suelo - 9, kL);
  r(6, 34, suelo - 26 - tb, suelo - 14 - tb, C.k); r(7, 33, suelo - 25 - tb, suelo - 14 - tb, k); r(7, 33, suelo - 25 - tb, suelo - 25 - tb, kH);
  for (const [a, b] of [[9, 18], [21, 31]]) { r(a, b, suelo - 23 - tb, suelo - 16 - tb, hex('#c89a6a')); r(a, a + 2, suelo - 23 - tb, suelo - 16 - tb, hex('#f0d0a0')); }
  { const cx = X(26); R.rect(Math.min(cx, cx + dir), suelo - 20 - tb, Math.max(cx, cx + dir), suelo - 17 - tb, P.piel); R.rect(Math.min(cx - dir, cx + 2 * dir), suelo - 22 - tb, Math.max(cx - dir, cx + 2 * dir), suelo - 21 - tb, hex('#2a2a40')); }
  r(34, 58, suelo - 18 - tb, suelo - 14 - tb, C.k); r(35, 57, suelo - 17 - tb, suelo - 14 - tb, k); for (let i = 38; i < 56; i += 3) R.pset(X(i), suelo - 16 - tb, kL);
  r(58, 62, suelo - 20 - tb, suelo - 9, P.laton); r(59, 61, suelo - 19 - tb, suelo - 10, hex('#7a7a80')); R.pset(X(59), suelo - 19 - tb, P.latonL);
  R.disco(X(55), suelo - 12 - tb, 2, P.latonL); R.linea(X(34), suelo - 14 - tb, X(31), suelo - 27 - tb, hex('#c8d8e8'));
  for (const wx of [12, 50]) { R.disco(X(wx), suelo - 4, 5, C.k); R.disco(X(wx), suelo - 4, 3.4, hex('#d8d0b8')); for (let a = 0; a < 6; a++) R.linea(X(wx), suelo - 4, Math.round(X(wx) + Math.cos(a) * 3), Math.round(suelo - 4 + Math.sin(a) * 3), hex('#8a8070')); R.disco(X(wx), suelo - 4, 1, P.laton); }
  r(14, 46, suelo - 6, suelo - 5, kL); r(-2, 0, suelo - 8, suelo - 6, C.metalS);
  for (let kk = 0; kk < 4; kk++) { const u = ((t * 0.9 + kk / 4) % 1), xx = X(-3 - u * 14), yy = Math.round(suelo - 7 - u * 6); if (u < 0.9) { R.pset(xx, yy, c_mez(R.pget(xx, yy), hex('#d8d4cc'), 0.6 - u * 0.5)); R.pset(xx + 1, yy - 1, c_mez(R.pget(xx + 1, yy - 1), hex('#d8d4cc'), 0.5 - u * 0.5)); } }
}

// lo de delante en el hotel: la balaustrada de piedra de la terraza, en la esquina de abajo a la izquierda, con su jarrón
// de geranios, y la maceta de la palmera enana a la derecha
function c_hotelDelante(R, t) {
  const P = c_P, H = c_H;
  R.rect(0, 154, 58, 157, H.fL); R.rect(0, 158, 58, 159, H.fD); R.rect(0, 174, 58, 179, H.fS); R.rect(0, 174, 58, 174, H.fL);
  for (let x = 2; x < 56; x += 7) { for (let y = 160; y < 174; y++) { const w = y < 163 || y > 170 ? 1 : 2; R.rect(x - w + 2, y, x + w + 2, y, y > 168 ? H.fS : H.col); R.pset(x + w + 2, y, H.colS); } }
  R.rect(52, 150, 60, 179, H.f); R.rect(52, 150, 52, 179, H.fL); R.rect(59, 150, 60, 179, H.fD); R.rect(50, 148, 62, 150, H.fL);
  R.rect(48, 140, 64, 147, H.fS); R.rect(49, 141, 63, 146, H.f); R.rect(49, 141, 63, 141, H.fL); R.rect(46, 139, 66, 139, H.fD);
  for (let k = 0; k < 9; k++) { const x = 47 + k * 2, y = 136 - (k % 3) - Math.round(Math.sin(t * 2 + k) * 0.6); R.rect(x, y, x + 1, 139, P.hierbaS); R.pset(x, y - 1, k % 2 ? P.geranio : P.hierba); R.pset(x + 1, y - 2, P.geranio); }
  R.rect(300, 162, 319, 179, P.cobre); R.rect(300, 162, 319, 164, P.cobreL); R.rect(300, 170, 319, 171, hex('#8a4a2a'));
  for (let k = 0; k < 7; k++) { const a = -Math.PI * 0.9 + k * 0.32 + Math.sin(t * 1.4 + k) * 0.05; for (let d = 2; d < 16; d++) R.pset(Math.round(312 + Math.cos(a) * d), Math.round(160 + Math.sin(a) * d * 0.8 + d * d * 0.03), d > 12 ? P.hierbaL : k % 2 ? P.hierba : P.hierbaS); }
  return {};
}

// el telegrama doblado de PIEZAS_TU (si el kit lo trae), con los pies en (x, y)
function c_telegrama(R, x, y) { if (PIEZAS_TU.telegrama) PIEZAS_TU.telegrama(R, x, y, {}); }

const c_N = pal({ m: '#5e5c7c', mS: '#46445e', mL: '#76749a', mD: '#323048', cielo0: '#0e1430', cielo1: '#18204a', cielo2: '#26305e', luna: '#f4f0d8', lunaS: '#c8c4b0',
  piedra: '#7a7898', piedraS: '#58567a', piedraL: '#9290b0', marco: '#c8c4d0', marcoS: '#8a88a0', papel: '#6a4a3a', papelL: '#8a5e44', luz: '#ffd890', luzL: '#fff2c8', cortina: '#f0e4c8', cortinaS: '#c8b898', noche: '#1e2a4a', nocheL: '#3a4a74' });

// el fondo fijo de la ventana de noche: el cielo y la ciudad en sombra a la izquierda, la pared con su esquina de
// sillares, el marco de piedra, el alféizar, las contraventanas abiertas y el bajante
function c_ventanaFijo(R, marca) {
  const P = c_P, N = c_N, { rect, pset, disco } = R;
  // a la izquierda, el cielo de noche con la luna, los alminares y las cúpulas en sombra y una palmera
  c_degradado(R, 0, 180, [[0, N.cielo0], [0.45, N.cielo1], [0.8, N.cielo2], [1, N.cielo2]]);
  marca();
  disco(34, 52, 7, N.luna); disco(36, 51, 6, N.luna); pset(31, 50, N.lunaS); pset(33, 55, N.lunaS); pset(35, 49, N.lunaS);
  const sil = hex('#141a34'), silL = hex('#22284a');
  rect(0, 128, 56, 180, sil); for (let j = 0; j <= 12; j++) { const dx = Math.round(Math.sqrt(144 - (12 - j) * (12 - j))); rect(26 - dx, 116 + j, 26 + dx, 116 + j, sil); } rect(26, 108, 26, 115, sil);
  rect(8, 76, 10, 128, sil); for (let j = 0; j < 6; j++) rect(9 - (j > 3 ? 1 : 0), 70 + j, 9 + (j > 3 ? 1 : 0), 70 + j, sil); rect(7, 96, 11, 97, silL); rect(7, 110, 11, 111, silL);
  rect(40, 120, 56, 128, sil); for (let y = 132; y < 176; y += 9) for (let x = 4; x < 54; x += 11) if (h(x, y, 890) < 0.4) rect(x, y, x + 2, y + 3, hex('#e8b060'));
  // la pared del hotel con la esquina de sillares, el estuco a la luz de la luna y la ventana
  c_tex(R, 56, 0, 319, 179, N.m, N.mS, N.mL, 891, 0.07);
  for (let y = 0; y < 180; y += 12) { const w = (y / 12) % 2 ? 10 : 16; rect(56, y, 56 + w, y + 10, N.piedra); rect(56, y, 56 + w, y, N.piedraL); rect(56 + w, y, 56 + w, y + 10, N.piedraS); rect(56, y + 11, 56 + w, y + 11, N.mD); }
  // el marco de piedra con su clave, el alféizar y las ménsulas
  rect(90, 32, 230, 152, N.piedraS); rect(92, 34, 228, 150, N.piedra); rect(92, 34, 228, 35, N.piedraL); rect(226, 36, 228, 150, N.piedraS);
  R.poligono([[152, 24], [168, 24], [164, 36], [156, 36]], N.piedraL); R.poligono([[156, 36], [164, 36], [166, 26], [168, 24]], N.piedra);
  rect(84, 150, 236, 156, N.piedra); rect(84, 150, 236, 150, N.piedraL); rect(84, 156, 236, 157, N.mD);
  for (const x of [96, 216]) { rect(x, 158, x + 8, 164, N.piedra); rect(x, 158, x + 8, 158, N.piedraL); rect(x + 2, 165, x + 6, 168, N.piedraS); }
  // las contraventanas abiertas, de lamas, contra la pared
  for (const [x0, x1] of [[60, 88], [232, 260]]) { rect(x0, 38, x1, 148, P.verdeS); rect(x0 + 1, 39, x1 - 1, 147, P.verde); for (let y = 41; y < 147; y += 3) { rect(x0 + 2, y, x1 - 2, y, P.verdeL); rect(x0 + 2, y + 1, x1 - 2, y + 1, P.verdeS); } rect(x0 + 1, 92, x1 - 1, 94, P.verdeS);
    for (const y of [50, 136]) { rect(x0 === 60 ? x1 : x0 - 3, y, x0 === 60 ? x1 + 3 : x0, y + 1, C.k); } }
  for (let y = 38; y < 150; y++) for (const x of [60, 88, 232, 260]) pset(x, y, c_mez(R.pget(x, y), C.k, 0.3));
  // el bajante de la derecha (empieza por debajo de Atom)
  rect(300, 54, 303, 179, N.mD); rect(300, 54, 300, 179, N.mL); for (let y = 70; y < 180; y += 30) rect(298, y, 305, y + 2, N.mS);
  rect(298, 50, 305, 54, N.mS);
  return {};
}

// LA CÁMARA 'ventana' (hotel de noche): ver la cabecera de cairo()
function c_ventana(R, t, o) {
  const P = c_P, N = c_N, ap = c_lim(o.apaga ?? 0), luz = 1 - ap, cap = c_capa(R, 'tu-ventana', (marca) => c_ventanaFijo(R, marca)), m = cap.m, B = R.buf;
  // las estrellas que titilan y una nube oscura que cruza despacio delante de la luna
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 892) * 54), y = Math.round(h(k, 2, 892) * 110); if (x >= 18 && y < 24) continue; const tw = Math.sin(t * (1.2 + h(k, 3, 892) * 2) + k); if (tw > -0.3) c_psM(B, m, x, y, tw > 0.6 ? C.blanco : hex('#8a94c0')); }
  { const x = ((t * 3 + 10) % 120) - 50; c_nubeM(B, m, x, 60, 30, 5, [hex('#1a2244'), hex('#28325c'), hex('#3a4672')], 0.6); }
  // el cristal: por dentro, el cuarto (la pared de papel pintado, la cortina de encaje y la lámpara sobre la mesita) que
  // se apaga con o.apaga; apagado, el reflejo de la luna en el cristal de arriba a la derecha
  const X0 = 100, Y0 = 42, X1 = 220, Y1 = 148;
  R.recorte([X0, Y0, X1, Y1]);
  const pp = c_mez(N.papel, N.noche, ap * 0.9), ppL = c_mez(N.papelL, N.nocheL, ap * 0.9);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const d = Math.hypot(x - 160, (y - 110) * 1.3), g = luz * Math.max(0, 1 - d / 90);
    let c = ((x >> 2) + (y >> 3)) % 3 === 0 && (y & 3) === 1 ? ppL : pp; if (g > 0) c = c_mez(c, N.luz, g * 0.55); B[y * 320 + x] = c; }
  for (const s of [1, -1]) { const sw = Math.sin(t * 0.8 + s) * 1.5; for (let y = Y0; y <= Y1; y++) { const w = 14 + Math.round((y - Y0) * 0.05 + sw * (y - Y0) / 106); for (let i = 0; i < w; i++) { const x = s > 0 ? X0 + i : X1 - i, pl = (i + Math.round(sw)) % 4 === 0, borde = i === w - 1;
        R.pset(x, y, c_mez(borde || pl ? N.cortinaS : ((x + y) % 3 ? N.cortina : c_mez(N.cortina, N.cortinaS, 0.5)), N.noche, ap * 0.8)); } } }
  { const lx = 160, ly = 112, sh = c_mez(hex('#e0a050'), hex('#3a3a5a'), ap), shL = c_mez(N.luzL, hex('#4a4a6a'), ap);
    c_rc(R, 146, 132, 174, 134, c_mez(P.madera, N.noche, ap * 0.7)); c_rc(R, 148, 135, 149, 148, c_mez(P.maderaS, N.noche, ap * 0.7)); c_rc(R, 171, 135, 172, 148, c_mez(P.maderaS, N.noche, ap * 0.7));
    c_rc(R, lx - 1, 118, lx + 1, 131, c_mez(P.laton, N.noche, ap * 0.6)); c_rc(R, lx - 4, 130, lx + 4, 131, c_mez(P.laton, N.noche, ap * 0.6));
    for (let j = 0; j < 10; j++) { const w = 5 + Math.round(j * 0.6); c_rc(R, lx - w, ly - 6 + j, lx + w, ly - 6 + j, j === 9 ? shL : sh); }
    if (luz > 0.05) { for (let j = 0; j < 4; j++) c_rc(R, lx - 3 + j, ly + 4 + j, lx + 3 - j, ly + 4 + j, c_mez(N.luzL, N.luz, j / 4)); } }
  if (ap > 0.3) { const a = (ap - 0.3) / 0.7; for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d > 6) continue; const x = 196 + i, y = 62 + j; R.pset(x, y, c_mez(R.pget(x, y), d > 4.5 ? N.lunaS : N.luna, a * 0.85)); } for (let i = 0; i < 14; i++) R.pset(186 + i, 52 + i, c_mez(R.pget(186 + i, 52 + i), C.blanco, a * 0.3)); }
  for (let y = Y0; y <= Y1; y++) { const x = 108 + Math.round((Y1 - y) * 0.4); R.pset(x, y, c_mez(R.pget(x, y), C.blanco, 0.12)); R.pset(x + 2, y, c_mez(R.pget(x + 2, y), C.blanco, 0.08)); }
  R.recorte(null);
  // los parteluces y el marco claro de las dos hojas, con la falleba de latón
  const mc = c_mez(N.marco, hex('#f0d8a8'), luz * 0.5), mS = N.marcoS;
  R.rect(X0 - 2, Y0 - 2, X1 + 2, Y0, mc); R.rect(X0 - 2, Y1, X1 + 2, Y1 + 2, mS); R.rect(X0 - 2, Y0, X0, Y1, mc); R.rect(X1, Y0, X1 + 2, Y1, mS); R.rect(159, Y0, 161, Y1, mc); R.rect(161, Y0, 161, Y1, mS);
  for (const y of [77, 112]) { R.rect(X0, y, X1, y + 1, mc); R.rect(X0, y + 1, X1, y + 1, mS); } for (const x of [130, 190]) { R.rect(x, Y0, x + 1, Y1, mc); R.rect(x + 1, Y0, x + 1, Y1, mS); }
  R.rect(162, 94, 164, 100, P.laton); R.pset(162, 94, P.latonL);
  // la luz que sale de la ventana y cae sobre el alféizar y las contraventanas (se va con la lámpara)
  if (luz > 0.02) { for (let y = 150; y < 176; y++) for (let x = 84 + (y - 150); x <= 236 - (y - 150); x++) { if (c_um(x, y) < luz * 0.6 * (1 - (y - 150) / 26)) B[y * 320 + x] = c_mez(B[y * 320 + x], N.luz, 0.3); }
    for (const [x0, x1] of [[62, 87], [233, 258]]) for (let y = 40; y < 148; y++) for (let x = x0; x <= x1; x++) if (c_um(x, y) < luz * 0.35 * (x0 < 100 ? (x - x0) / 25 : (x1 - x) / 25)) B[y * 320 + x] = c_mez(B[y * 320 + x], N.luz, 0.25); }
  // en el alféizar: el telegrama doblado y una maceta de albahaca
  c_telegrama(R, 182, 152);
  R.rect(110, 142, 120, 150, P.cobre); R.rect(110, 142, 120, 143, P.cobreL); R.rect(109, 141, 121, 141, hex('#8a4a2a'));
  for (let k = 0; k < 9; k++) { const x = 109 + k + (k % 2), y = 138 - (k % 3) - Math.round(Math.sin(t * 1.5 + k) * 0.6); R.rect(x, y, x, 140, P.hierbaS); R.pset(x, y - 1, P.hierbaL); R.pset(x + 1, y, P.hierba); }
  // las polillas que revolotean junto al cristal mientras hay luz, y la sombra de una palma que se mece en la pared
  for (let k = 0; k < 3; k++) { if (luz < 0.3) break; const a = t * (2 + k) + k * 2, x = Math.round(160 + Math.cos(a) * (40 + k * 10) + Math.sin(t * 7 + k) * 2), y = Math.round(96 + Math.sin(a * 1.3) * 30), al = Math.floor(t * 18 + k) % 2;
    R.pset(x, y, hex('#e8e0c8')); R.pset(x - 1, y - al, hex('#c8c0a8')); R.pset(x + 1, y - al, hex('#c8c0a8')); }
  for (let k = 0; k < 9; k++) { const a = -0.3 + k * 0.16 + Math.sin(t * 0.9) * 0.06; for (let d = 0; d < 40; d++) { const x = Math.round(318 - d * Math.cos(a)), y = Math.round(140 + d * Math.sin(a) * 1.2 - d * 0.2); if (x < 262 || y < 50 || y > 179) continue; B[y * 320 + x] = c_mez(B[y * 320 + x], N.mD, 0.45); if (d % 3 === 0) { const yy = y + 2; if (yy < 180) B[yy * 320 + x] = c_mez(B[yy * 320 + x], N.mD, 0.35); } } }
  // la buganvilla que trepa por la pared de la derecha, con sus flores magenta que el aire mueve
  for (let k = 0; k < 26; k++) { const y = 178 - k * 4.4, x = Math.round(272 + Math.sin(k * 0.7) * 8 + Math.sin(t * 1.1 + k * 0.3) * 0.8); R.rect(x, Math.round(y) - 4, x, Math.round(y), hex('#3a2a20'));
    for (let j = 0; j < 3; j++) { const fx = x + Math.round((h(k, j, 893) - 0.5) * 14 + Math.sin(t * 1.6 + k + j) * 0.8), fy = Math.round(y + (h(k, j, 894) - 0.5) * 6); if (fy < 50) continue;
      R.rect(fx, fy, fx + 1, fy + 1, j === 0 ? hex('#2a4a2a') : c_mez(hex('#c8287a'), N.noche, 0.35 + 0.25 * ap)); if (j === 1) R.pset(fx + 1, fy, c_mez(hex('#f05aa0'), N.noche, 0.3 + 0.3 * ap)); } }
  return { lampara: [160, 112] };
}

const c_RD = pal({ pared: '#cbbb94', paredS: '#a8986e', paredL: '#ddcda6', techo: '#b8a682', viga: '#5a3a20', vigaL: '#7a5430',
  zocalo: '#6a4226', zocaloS: '#4a2c18', zocaloL: '#8a5a34', tabla: '#8a5e36', tablaS: '#6a4426', tablaL: '#a8784a', tablaD: '#4e3220',
  verdeL: '#2e6a4a', verdeLL: '#5aa07a', luz: '#fff0c0', mapa: '#d8c89a', mapaA: '#6a9ac0', nave: '#3a3a40', naveS: '#2a2a30', naveL: '#5a5a62',
  rodillo: '#8a8e98', rodilloL: '#c8ccd4', rodilloS: '#4e525c', tintaN: '#1c1c22' });

// el fondo fijo de la redacción: techo, pared, ventanales, reloj, mapa, tubo neumático, zócalo, mampara, tarima, la
// luz que entra, las mesas del fondo y el perchero (la rotativa y la vida se pintan cada fotograma)
function c_redaccionFijo(R) {
  const P = c_P, D = c_RD, { rect, pset, linea, disco } = R, B = R.buf;
  // el techo con sus vigas (tranquilo bajo el año y bajo Atom) y la pared de yeso
  c_tex(R, 0, 0, 319, 14, D.techo, D.paredS, D.paredL, 900, 0.03); for (const x of [2, 180, 236]) { rect(x, 0, x + 6, 14, D.viga); rect(x, 0, x, 14, D.vigaL); } rect(0, 13, 19, 14, D.viga); rect(172, 13, 271, 14, D.viga);
  c_tex(R, 0, 15, 319, 112, D.pared, D.paredS, D.paredL, 901, 0.06);
  // los dos ventanales altos con su arco (el cielo y un alminar, recortados al hueco) y la luz que entra
  for (const wx of [14, 56]) { R.recorte([wx, 22, wx + 26, 66]); for (let y = 22; y <= 66; y++) for (let x = wx; x <= wx + 26; x++) { if (y < 35 && Math.hypot(x - wx - 13, y - 35) > 13) continue; R.pset(x, y, y < 46 ? c_P.cielo2 : c_P.cielo3); }
    for (let y = 48; y <= 66; y++) for (let x = wx; x <= wx + 26; x++) if (h(x >> 2, 0, wx) * 14 + 50 < y) R.pset(x, y, c_P.lejos); if (wx === 56) { c_rc(R, 66, 34, 67, 66, c_P.lejosS); c_rc(R, 65, 44, 68, 44, c_P.lejosS); }
    R.recorte(null);
    for (let j = 0; j <= 13; j++) { const dx = Math.round(Math.sqrt(169 - (13 - j) * (13 - j))); pset(wx + 13 - dx - 1, 22 + j, D.zocaloS); pset(wx + 13 + dx + 1, 22 + j, D.zocaloS); }
    rect(wx - 1, 35, wx - 1, 67, D.zocaloS); rect(wx + 27, 35, wx + 27, 67, D.zocaloS); rect(wx + 13, 22, wx + 13, 66, D.zocalo); for (const y of [40, 53]) rect(wx, y, wx + 26, y, D.zocalo); rect(wx - 2, 67, wx + 28, 69, D.paredL); rect(wx - 2, 70, wx + 28, 70, D.paredS); }
  // el reloj de pared, el mapa enmarcado (sin letras) y el tubo neumático de latón con su tramo de cristal
  disco(100, 34, 9, D.zocaloS); disco(100, 34, 8, D.zocalo); disco(100, 34, 6, hex('#f4ecd8')); for (let k = 0; k < 12; k++) pset(Math.round(100 + Math.cos(k * Math.PI / 6) * 5), Math.round(34 + Math.sin(k * Math.PI / 6) * 5), C.k);
  rect(98, 43, 102, 60, D.zocalo); disco(100, 56, 2, P.laton);
  rect(118, 24, 168, 58, D.zocaloS); rect(120, 26, 166, 56, D.mapa); for (let y = 26; y <= 56; y++) for (let x = 120; x <= 166; x++) { const costa = 30 + Math.sin(x * 0.2) * 3 + (x - 120) * 0.1; if (y < costa) pset(x, y, D.mapaA); else if (Math.abs(x - 140 - Math.sin(y * 0.3) * 2) < 1) pset(x, y, D.mapaA); else if (h(x, y, 902) < 0.05) pset(x, y, hex('#b8a878')); }
  pset(140, 44, P.toldoR); pset(141, 44, P.toldoR); pset(140, 45, P.toldoR);
  rect(176, 0, 180, 104, P.latonS); rect(177, 0, 178, 104, P.laton); rect(177, 0, 177, 104, P.latonL); for (const y of [20, 70]) rect(175, y, 181, y + 1, P.latonS);
  rect(176, 30, 180, 62, hex('#a8c8c8')); rect(177, 30, 177, 62, C.blanco); rect(176, 30, 180, 30, P.latonS); rect(176, 62, 180, 62, P.latonS);
  rect(172, 98, 184, 108, P.latonS); rect(173, 99, 183, 107, P.laton); rect(173, 99, 183, 99, P.latonL); rect(175, 102, 181, 105, P.latonS);
  // el zócalo de madera con sus cuarterones
  rect(0, 84, 196, 112, D.zocalo); rect(0, 84, 196, 85, D.zocaloL); rect(0, 86, 196, 86, D.zocaloS);
  for (let x = 4; x < 192; x += 24) { rect(x, 89, x + 20, 109, D.zocaloS); rect(x + 1, 90, x + 19, 108, D.zocalo); rect(x + 1, 90, x + 19, 90, D.zocaloL); for (let y = 92; y < 108; y += 3) if (h(x, y, 903) < 0.6) rect(x + 3, y, x + 17, y, c_mez(D.zocalo, D.zocaloS, 0.4)); }
  // la mampara de cristal de la sala de máquinas (x 196–306): el marco de roble, los cristales (la nave se pinta luego)
  rect(196, 50, 306, 130, D.zocaloS); rect(196, 50, 306, 52, D.zocaloL); rect(196, 112, 306, 130, D.zocalo); rect(196, 112, 306, 113, D.zocaloL);
  for (let x = 200; x < 304; x += 35) { rect(x, 116, x + 31, 127, D.zocaloS); rect(x + 1, 117, x + 30, 126, D.zocalo); rect(x + 1, 117, x + 30, 117, D.zocaloL); }
  rect(306, 15, 319, 130, D.pared); c_tex(R, 307, 50, 319, 130, D.pared, D.paredS, D.paredL, 904, 0.05);
  // el suelo de tarima, con sus vetas, las juntas y las manchas de tinta
  for (let y = 112; y < 180; y++) { const f = y * 320, fila = Math.floor((y - 112) / (4 + Math.floor((y - 112) / 16))), L = 40 + fila * 4;
    for (let x = 0; x < 320; x++) { const xx = x + (fila * 17) % L, k = Math.floor(xx / L), q = h(k, fila, 905); let c = q < 0.33 ? D.tabla : q < 0.66 ? c_mez(D.tabla, D.tablaL, 0.35) : c_mez(D.tabla, D.tablaS, 0.4);
      if (xx % L === 0) c = D.tablaD; else if (h(x >> 2, y, 906 + k) < 0.12) c = c_mez(c, D.tablaS, 0.5); else if (h(x, y, 907) < 0.03) c = D.tablaL; B[f + x] = c; } }
  for (let y = 112; y < 180; y++) { const fila = Math.floor((y - 112) / (4 + Math.floor((y - 112) / 16))), y0 = 112 + [0, 4, 8, 12, 16, 21, 26, 31, 36, 42, 48, 54, 60, 66][Math.min(13, fila)]; if (y === y0) rect(0, y, 319, y, D.tablaD); }
  c_velo(R, 0, 112, 319, 114, C.k, 0.3);
  for (const [x, y, r] of [[60, 168, 3], [236, 160, 2], [150, 176, 2]]) disco(x, y, r, c_mez(D.tabla, C.k, 0.45));
  // la luz de los ventanales que cae en diagonal sobre la pared y el suelo
  for (const wx of [14, 56]) for (let y = 70; y < 180; y++) { const off = (y - 66) * 0.7, x0 = Math.round(wx + off), x1 = Math.round(wx + 26 + off * 1.2); for (let x = x0; x <= x1; x++) if (x < 196 && c_um(x, y) < 0.16 * (1 - (y - 70) / 140)) B[y * 320 + x] = c_mez(B[y * 320 + x], D.luz, 0.3); }
  // las mesas del fondo, contra el zócalo: máquinas de escribir, teléfonos de candelero, montones de papel, el pincho
  for (const [x0, x1] of [[6, 74], [92, 166]]) { rect(x0, 104, x1, 106, D.tablaL); rect(x0, 107, x1, 108, D.tablaS); rect(x0 + 2, 109, x0 + 4, 124, D.tablaS); rect(x1 - 4, 109, x1 - 2, 124, D.tablaS); rect(x0 + 2, 109, x1 - 2, 116, D.tabla); for (let x = x0 + 6; x < x1 - 6; x += 14) { rect(x, 111, x + 10, 114, D.tablaS); pset(x + 5, 112, P.laton); } }
  for (const x of [20, 112]) { rect(x, 98, x + 14, 103, hex('#2a2a30')); rect(x + 1, 96, x + 13, 97, hex('#3a3a44')); rect(x - 1, 95, x + 15, 95, hex('#1c1c22')); for (let i = x + 1; i < x + 14; i += 2) pset(i, 101, C.metalL); rect(x + 2, 92, x + 12, 94, P.papelL); }
  for (const x of [60, 150]) { rect(x, 92, x, 103, C.k); rect(x - 2, 103, x + 2, 103, C.k); rect(x - 1, 90, x + 1, 91, C.k); rect(x + 1, 95, x + 3, 96, C.k); pset(x + 3, 94, C.k); }
  for (const [x, n] of [[40, 4], [130, 3], [86, 5]]) for (let k = 0; k < n; k++) { rect(x, 102 - k * 2, x + 9, 103 - k * 2, k % 2 ? P.papelS : P.papel); }
  rect(170, 96, 170, 103, C.metalS); for (let k = 0; k < 4; k++) rect(167, 101 - k, 173, 101 - k, P.papel);
  // el perchero de pie con un sombrero y una gabardina
  rect(188, 60, 189, 112, P.maderaS); rect(184, 112, 193, 113, P.maderaS); for (const s of [-1, 1]) linea(188, 62, 188 + s * 4, 58, P.maderaS);
  rect(183, 56, 187, 58, hex('#4a4038')); rect(184, 54, 186, 55, hex('#5a4e44')); rect(189, 62, 193, 84, hex('#a89a78')); rect(193, 62, 193, 84, hex('#7e7258'));
  return {};
}

// LA REDACCIÓN (general): ver la cabecera de cairo()
function c_redaccion(R, t, o) {
  const P = c_P, D = c_RD, rot = c_lim(o.rotativa ?? 0.4), B = R.buf; c_capa(R, 'tu-redaccion', () => c_redaccionFijo(R));
  // la sala de máquinas tras el cristal (recortada): la nave en penumbra, la ROTATIVA con sus rodillos que giran, la banda
  // de papel, los engranajes, el operario y la boca por la que salen los periódicos
  R.recorte([198, 54, 304, 110]);
  for (let y = 54; y <= 110; y++) for (let x = 198; x <= 304; x++) B[y * 320 + x] = ((x >> 3) + (y >> 2)) % 5 === 0 ? D.naveS : D.nave;
  for (let x = 198; x <= 304; x += 12) c_rc(R, x, 54, x, 70, D.naveL);
  const vel = 2 + rot * 8;
  c_rc(R, 206, 70, 296, 110, D.naveS); c_rc(R, 208, 72, 294, 108, hex('#4a4e58')); c_rc(R, 208, 72, 294, 72, D.naveL);
  for (const [cx, cy, r] of [[222, 84, 7], [246, 84, 7], [270, 84, 7], [234, 100, 6], [258, 100, 6], [282, 100, 6]]) { R.disco(cx, cy, r, D.rodilloS); R.disco(cx, cy, r - 1, D.rodillo);
    for (let k = 0; k < 4; k++) { const a = t * vel + k * Math.PI / 2; R.linea(cx, cy, Math.round(cx + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), D.rodilloS); } R.disco(cx, cy, 1.5, D.rodilloL); }
  for (let x = 210; x < 292; x++) { const y = Math.round(92 + Math.sin(x * 0.18) * 2); R.pset(x, y, ((x + Math.floor(t * vel * 6)) % 6) < 2 ? hex('#8a8a8a') : P.papelL); }
  { const gx = 300, gy = 76; R.disco(gx, gy, 6, D.naveL); for (let k = 0; k < 8; k++) { const a = -t * vel * 0.5 + k * Math.PI / 4; R.pset(Math.round(gx + Math.cos(a) * 6), Math.round(gy + Math.sin(a) * 6), D.rodilloL); } R.disco(gx, gy, 2, D.naveS); }
  { const u = (t % 10) / 10, x = Math.round(u < 0.5 ? lerp(212, 280, u * 2) : lerp(280, 212, (u - 0.5) * 2)); c_figura(R, x, 70, t, 'efendi', 4, u < 0.5 ? 1 : -1, (u % 0.5) < 0.42); }
  for (let k = 0; k < 6; k++) { const y = 106 - k * 2; c_rc(R, 210, y, 228, y + 1, k % 2 ? P.papelS : P.papel); }
  R.recorte(null);
  // los cristales de la mampara: los parteluces y los reflejos
  for (let x = 198; x <= 304; x++) { const y = 54 + Math.round((x - 198) * 0.5); for (let d = 0; d < 3; d++) if (y + d * 9 < 110) B[(y + d * 9) * 320 + x] = c_mez(B[(y + d * 9) * 320 + x], C.blanco, 0.1); }
  for (const x of [196, 232, 268, 304]) R.rect(x, 52, x + 2, 112, D.zocaloS); R.rect(196, 80, 306, 81, D.zocaloS);
  // el tubo neumático: cada pocos segundos baja una cápsula por el tramo de cristal y cae en la caja
  { const u = (t % 5) / 5; if (u < 0.3) { const y = Math.round(30 + u / 0.3 * 32); R.rect(176, y, 180, y + 4, P.cobre); R.pset(177, y + 1, P.cobreL); } }
  // el reloj: las agujas que corren
  { const a = t * 0.5 - Math.PI / 2, b = t * 0.04; R.linea(100, 34, Math.round(100 + Math.cos(a) * 5), Math.round(34 + Math.sin(a) * 5), C.k); R.linea(100, 34, Math.round(100 + Math.cos(b) * 3), Math.round(34 + Math.sin(b) * 3), C.k); }
  { const s = Math.round(Math.sin(t * 2.6) * 3); R.rect(99, 44, 101, 54, D.zocalo); R.pset(100 + s, 56, P.latonL); R.linea(100, 44, 100 + s, 55, P.latonS); }
  // las lámparas verdes colgantes, que se mecen un poco, con su cono de luz
  for (const [lx, f] of [[52, 0], [130, 1.4]]) { const sw = Math.round(Math.sin(t * 0.7 + f)); R.linea(lx, 15, lx + sw, 66, C.k);
    for (let j = 0; j < 4; j++) R.rect(lx + sw - 3 - j, 66 + j, lx + sw + 3 + j, 66 + j, j === 0 ? D.verdeLL : D.verdeL); R.rect(lx + sw - 2, 70, lx + sw + 2, 70, D.luz);
    for (let y = 71; y < 104; y++) { const w = (y - 70) * 0.55; for (let x = Math.round(lx + sw - w); x <= lx + sw + w; x++) if (c_um(x, y) < 0.22 * (1 - (y - 70) / 34)) B[y * 320 + x] = c_mez(B[y * 320 + x], D.luz, 0.4); } }
  // los redactores del fondo, sentados tras sus mesas: teclean (los hombros se mueven) o hablan por teléfono
  for (const [x, k] of [[27, 0], [119, 2], [66, 1]]) { const tec = Math.floor(t * 8 + k) % 2; c_rc(R, x, 94, x + 3, 103, [P.traje, hex('#5a4a3a'), P.galabeyaS][k]); c_rc(R, x, 89 - tec * 0, x + 3, 92, P.piel); c_rc(R, x, 88, x + 3, 88, k === 1 ? P.fez : hex('#3a2a20'));
    if (k === 1) { R.pset(x + 4, 90, C.k); R.pset(x + 4, 91, C.k); } else { R.pset(x - 1, 96 + tec, P.piel); R.pset(x + 4, 96 + (1 - tec), P.piel); } }
  // el teléfono que suena (tiembla el auricular) y la máquina que golpea (el carro avanza y vuelve)
  if ((t % 4) < 1.2) { const s = Math.floor(t * 20) % 2; R.pset(147 + s, 89, C.k); R.pset(153 - s, 89, C.k); }
  { const u = (t * 0.25) % 1; R.rect(Math.round(22 + u * 8), 94, Math.round(26 + u * 8), 95, C.metalL); }
  // los periódicos que escupe la rotativa (o.rotativa 0–1: cuántos) salen por el montante y vuelan por la sala
  const n = Math.round(rot * 7);
  for (let k = 0; k < n; k++) { const per = 3.2, u = ((t + k * per / Math.max(1, n)) % per) / per, x0 = 250, y0 = 50, x1 = 20 + h(k, 1, 908) * 170, y1 = 140 + h(k, 2, 908) * 30;
    const x = Math.round(lerp(x0, x1, u) + Math.sin(u * 9 + k) * 6), y = Math.round(lerp(y0, y1, u) - Math.sin(u * Math.PI) * 34), g = Math.floor(t * 8 + k) % 3;
    if (u > 0.92) { R.rect(Math.round(x1) - 4, Math.round(y1), Math.round(x1) + 4, Math.round(y1) + 1, P.papelS); continue; }
    if (g === 0) { R.rect(x - 4, y - 2, x + 4, y + 2, P.papel); R.rect(x - 3, y - 1, x + 1, y - 1, P.tinta); R.rect(x - 3, y + 1, x + 3, y + 1, P.tintaS); }
    else if (g === 1) { R.rect(x - 3, y - 1, x + 3, y + 1, P.papelL); R.rect(x - 3, y, x + 3, y, P.tintaS); }
    else { R.linea(x - 4, y + 2, x + 4, y - 2, P.papel); R.linea(x - 4, y + 3, x + 4, y - 1, P.papelS); } }
  motas(R, t, 20, 190, 70, 170, 14, D.luz);
  return {};
}

// lo de delante en la redacción: la mesa del redactor (tablero en y 145, la máquina de escribir a la izquierda, el
// montón de cuartillas, el teléfono de candelero, el pincho y el cenicero)
function c_redaccionDelante(R, t) {
  const P = c_P, D = c_RD, { rect, pset } = R;
  rect(28, 145, 137, 148, D.tablaL); rect(28, 145, 137, 145, hex('#c89a64')); rect(28, 149, 137, 150, D.tablaS);
  rect(30, 151, 135, 179, D.tabla); for (let y = 151; y < 180; y++) for (let x = 30; x <= 135; x++) if (h(x >> 3, y, 909) < 0.15) pset(x, y, c_mez(D.tabla, D.tablaS, 0.5));
  for (const x0 of [36, 84]) { rect(x0, 155, x0 + 40, 180, D.tablaS); rect(x0 + 1, 156, x0 + 39, 179, D.tabla); rect(x0 + 1, 156, x0 + 39, 156, D.tablaL); rect(x0 + 16, 163, x0 + 24, 164, P.laton); pset(x0 + 20, 162, P.latonL); }
  rect(30, 151, 31, 179, D.tablaL); rect(134, 151, 135, 179, D.tablaS);
  // la máquina de escribir negra, con el papel, las teclas y el carro
  rect(36, 135, 62, 144, hex('#1c1c22')); rect(37, 136, 61, 138, hex('#3a3a44')); rect(34, 132, 64, 133, hex('#2a2a30')); rect(33, 131, 35, 133, C.metalS); rect(63, 131, 65, 133, C.metalS);
  rect(41, 123, 57, 131, P.papelL); for (let y = 125; y < 131; y += 2) rect(43, y, 55 - (y % 4 ? 3 : 0), y, P.tintaS);
  for (let i = 38; i < 61; i += 2) { pset(i, 140, C.metalL); pset(i + 1, 142, C.metalL); }
  const tec = Math.floor(t * 9) % 4; if (tec < 2) pset(44 + tec * 5, 139, C.blanco);
  // las cuartillas, el teléfono de candelero, el pincho de las noticias y el cenicero
  for (let k = 0; k < 5; k++) rect(68 + (k % 2), 142 - k * 2, 84 + (k % 2), 143 - k * 2, k % 2 ? P.papelS : P.papel);
  rect(90, 129, 91, 144, C.k); rect(87, 144, 94, 145, C.k); rect(88, 126, 93, 128, C.k); pset(89, 125, C.k); rect(92, 133, 95, 135, C.k); rect(95, 131, 96, 136, C.k);
  rect(131, 133, 131, 144, C.metalS); for (let k = 0; k < 3; k++) rect(127, 139 - k * 2, 135, 140 - k * 2, P.papel);
  return { redactor: [110, 159] };
}

function c_periodicoFijo(R) {
  const P = c_P, D = c_RD, { rect, pset, disco, linea } = R, B = R.buf;
  // la mesa de nogal con sus vetas largas (más tranquilas arriba, bajo el año y bajo Atom) y la luz de la lámpara
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.55 + Math.sin(x * 0.03 + y * 0.02) * 3 + h(0, y >> 3, 910) * 4), d = Math.hypot(x - 160, (y - 100) * 1.4) / 200;
    let c = v > 0.75 ? D.tablaL : v < -0.8 ? D.tablaS : D.tabla; if ((y < 46 && (x > 270 || (x > 16 && x < 174))) && v > 0.75) c = D.tabla; c = c_mez(c, D.tablaD, Math.min(0.6, d * 0.7)); B[y * 320 + x] = c; }
  // el tintero con la pluma, las gafas redondas, las tijeras y el lápiz
  disco(26, 96, 7, hex('#2a3a4a')); disco(26, 96, 5, hex('#3a5a6a')); disco(26, 96, 3, C.k); pset(24, 93, C.blanco); linea(28, 92, 44, 70, P.maderaS); linea(29, 92, 45, 70, P.madera); pset(44, 70, P.laton);
  R.anillo(18, 150, 6, P.laton); R.anillo(34, 150, 6, P.laton); linea(24, 148, 28, 148, P.laton); linea(12, 148, 4, 144, P.laton); linea(40, 148, 50, 142, P.laton); pset(16, 147, C.blanco); pset(32, 147, C.blanco);
  for (let i = 0; i < 14; i++) { pset(20 + i, 40 + Math.round(i * 0.4), C.metalL); pset(20 + i, 44 - Math.round(i * 0.2), C.metalS); } R.anillo(17, 41, 3, C.k); R.anillo(17, 46, 3, C.k);
  for (let i = 0; i < 40; i++) { const x = 272 + i, y = 170 - Math.round(i * 0.5); pset(x, y, i < 4 ? P.madera : i > 36 ? hex('#e8a0a0') : hex('#d8a830')); pset(x, y + 1, i < 4 ? P.maderaS : hex('#a87818')); }
  // el platito y la taza de café, vistos desde arriba
  disco(292, 130, 14, hex('#c8c0b0')); disco(292, 130, 13, hex('#f0ece0')); R.anillo(292, 130, 10, hex('#d8d0c0')); disco(292, 130, 8, hex('#f6f2ea')); disco(292, 130, 6, hex('#3a2014')); disco(291, 129, 4, hex('#5a3420')); pset(289, 127, hex('#c89a6a'));
  rect(301, 128, 306, 131, hex('#f0ece0')); rect(302, 129, 305, 130, hex('#d8d0c0'));
  // la sombra del periódico y el periódico (NUESTRO, sin letras): la cabecera negra con sus rayas, la línea de la fecha,
  // las columnas de rayas, la caja de la foto (el pictograma se pinta encima) y los filetes
  c_velo(R, 62, 28, 266, 178, C.k, 0.35);
  rect(58, 24, 262, 174, P.papel); for (let y = 24; y <= 174; y++) for (let x = 58; x <= 262; x++) if (h(x, y, 911) < 0.04) pset(x, y, P.papelS); rect(58, 24, 262, 24, P.papelL); rect(262, 24, 262, 174, P.papelS); rect(160, 24, 160, 174, c_mez(P.papel, P.papelS, 0.6));
  rect(64, 27, 256, 33, P.tinta); for (let x = 72; x < 248; x += 9) rect(x, 29, x + 5, 31, P.papelL); rect(64, 35, 256, 35, P.tintaS); rect(64, 36, 256, 36, P.tinta);
  rect(68, 62, 150, 110, P.papelS); rect(69, 63, 149, 109, hex('#ddd2b4')); for (let y = 63; y <= 109; y++) for (let x = 69; x <= 149; x++) if ((x + y) % 4 === 0) pset(x, y, hex('#cfc2a2'));
  for (let y = 114; y < 170; y += 3) rect(68, y, (y % 9 === 0) ? 140 : 150, y, P.tintaS);
  for (const x0 of [156, 192, 228]) { if (x0 === 156) continue; for (let y = 64; y < 170; y += 3) rect(x0, y, x0 + (y % 15 === 0 ? 20 : 28), y, P.tintaS); }
  for (let y = 64; y < 170; y += 3) rect(162, y, 186, y, P.tintaS); rect(188, 62, 188, 170, P.papelS); rect(224, 62, 224, 170, P.papelS);
  rect(64, 60, 256, 60, P.tinta);
  return {};
}

// un periódico de otro país que cae sobre la mesa (sus rayas, otra cabecera de color y el mismo pictograma); u 0–1: la
// caída (grande y con la sombra lejos al principio, posado al final)
function c_copia(R, cx, cy, w, alto, col, u, k) {
  const P = c_P, e = 1 + (1 - u) * 0.35, sh = Math.round((1 - u) * 10) + 2, W = Math.round(w * e / 2), H = Math.round(alto * e / 2);
  c_velo(R, cx - W + sh, cy - H + sh, cx + W + sh, cy + H + sh, C.k, 0.3);
  R.rect(cx - W, cy - H, cx + W, cy + H, P.papelL); R.rect(cx - W, cy - H, cx + W, cy - H, C.blanco); R.rect(cx + W, cy - H, cx + W, cy + H, P.papelS);
  R.rect(cx - W + 3, cy - H + 3, cx + W - 3, cy - H + 8, col); for (let x = cx - W + 8; x < cx + W - 8; x += 7) R.rect(x, cy - H + 5, x + 3, cy - H + 6, P.papelL);
  R.rect(cx - W + 3, cy - H + 11, cx + W - 3, cy - H + 14, P.tinta); R.rect(cx - W + 3, cy - H + 16, cx + Math.round(W * 0.3), cy - H + 19, P.tinta);
  c_picto(R, cx - W + 4, cy - H + 23, 2, { u: hex('#d8b070') });
  for (let y = cy - H + 23; y < cy + H - 3; y += 3) R.rect(cx - W + 40, y, cx + W - 4 - ((y + k) % 6 === 0 ? 8 : 0), y, P.tintaS);
  for (let y = cy - H + 42; y < cy + H - 3; y += 3) R.rect(cx - W + 4, y, cx - W + 34, y, P.tintaS);
}

// LA CÁMARA 'periodico' (inserto): ver la cabecera de cairo()
function c_periodico(R, t, o) {
  const P = c_P, ti = c_lim(o.titular ?? 1), co = c_lim(o.copias ?? 0); c_capa(R, 'tu-periodico', () => c_periodicoFijo(R));
  // el titular de dos barras gordas que crece de izquierda a derecha, y el pictograma grande en la caja de la foto
  const a = Math.round(lerp(72, 248, ti)), b = Math.round(lerp(72, 200, ti));
  if (ti > 0) { R.rect(72, 39, a, 46, P.tinta); R.rect(72, 50, b, 57, P.tinta); R.rect(72, 39, a, 39, P.tintaS); }
  c_picto(R, 78, 70, 4, { u: hex('#d8b070') });
  for (let i = 0; i < 4; i++) R.rect(72, 104 + i * 0, 146, 104, P.tintaS);
  // el humo del café, que sube y se deshace
  for (let k = 0; k < 9; k++) { const u = (t * 0.35 + k / 9) % 1, x = Math.round(292 + Math.sin(t * 1.4 + k) * 3 * u - u * 6), y = Math.round(126 - u * 40); if (x >= 272 && y < 48) continue; R.pset(x, y, c_mez(R.pget(x, y), hex('#f4f0e8'), 0.5 - u * 0.45)); R.pset(x + 1, y + 1, c_mez(R.pget(x + 1, y + 1), hex('#f4f0e8'), 0.3 - u * 0.25)); }
  // los periódicos de otros países que caen encima, uno tras otro (o.copias 0–1)
  [[122, 104, 116, 84, hex('#8a2a2a')], [200, 92, 110, 90, hex('#2a3a6a')], [150, 128, 120, 80, hex('#2a5a3a')]].forEach(([cx, cy, w, al, col], k) => { const u = c_lim((co - k / 3) * 3 / 0.7); if (u > 0) c_copia(R, cx, cy, w, al, col, u, k); });
  return {};
}

// el ruido suave (de 8 px) para la niebla que se mueve: v(x, y) entre 0 y 1
function c_ruido(x, y, k) { const ix = Math.floor(x / 16), iy = Math.floor(y / 10), fx = x / 16 - ix, fy = y / 10 - iy, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(ix, iy, k), b = h(ix + 1, iy, k), c = h(ix, iy + 1, k), d = h(ix + 1, iy + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; }

// la niebla que pasa: jirones claros (a 0–1: lo espesa que es) que se arrastran despacio; más espesa lejos (arriba)
function c_niebla(R, t, a, y0 = 0, y1 = 180, col = c_P.nieblaL) {
  if (a <= 0) return; const B = R.buf, off = t * 5;
  for (let y = y0; y < y1; y++) { const f = y * 320, lejos = 1 - Math.min(1, Math.max(0, (y - 60) / 120)) * 0.6;
    for (let x = 0; x < 320; x++) { const v = c_ruido(x + off, y, 920) * 0.7 + c_ruido(x * 0.5 - off * 0.6, y * 0.5, 921) * 0.3, p = a * lejos * (v - 0.25) * 1.1; if (p > 0 && c_um(x, y) < p) B[f + x] = c_mez(B[f + x], col, 0.45); } }
}

const c_L = pal({ c0: '#8e9294', c1: '#a6a8a6', c2: '#bcbcb4', vent: '#f0c070', ventS: '#b88a48', puerta1: '#1e2a24', puerta2: '#4a1e22', puerta3: '#1c1c24', ladrillo2: '#7a4a38' });

// el fondo fijo de la calle de Londres: el cielo de niebla, la fila de casas adosadas, la verja, las aceras, la calzada
// mojada, el plátano sin hojas, el buzón y la farola (la niebla que se mueve, el tráfico y la gente, cada fotograma)
function c_londresFijo(R, marca) {
  const P = c_P, L = c_L, { rect, pset, linea, disco } = R, B = R.buf;
  c_degradado(R, 0, 124, [[0, L.c0], [0.5, L.c1], [1, L.c2]]);
  marca();
  // otra fila de casas detrás, apenas siluetas en la niebla, con sus chimeneas
  for (let x = 0, k = 0; x < 320; k++) { const w = 14 + Math.round(h(k, 1, 930) * 16), top = 34 + Math.round(h(k, 2, 930) * 10); rect(x, top, x + w, 60, c_mez(L.c1, P.nieblaD, 0.35)); if (h(k, 3, 930) < 0.6) { rect(x + 3, top - 6, x + 6, top, c_mez(L.c1, P.nieblaD, 0.45)); } x += w; }
  // LA FILA DE CASAS ADOSADAS (cuatro casas de 80 px): el tejado de pizarra con buhardillas, las chimeneas con sus
  // cañones, el ladrillo oscuro con sus hiladas, las ventanas de guillotina (algunas encendidas), los balcones, la
  // planta baja estucada con la puerta de color, el montante y la escalinata, y la verja del sótano
  for (let y = 46; y < 52; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (x + y) % 5 === 0 ? P.pizarraS : y === 46 ? P.pizarraL : P.pizarra;
  for (let k = 0; k < 4; k++) { const x0 = k * 80;
    if (k < 3) { const cx = x0 + 40; rect(cx - 8, 30, cx + 8, 46, P.ladrilloS); rect(cx - 9, 29, cx + 9, 30, P.estucoBS); for (let i = -6; i <= 6; i += 4) { rect(cx + i - 1, 24, cx + i + 1, 28, hex('#9a5a3a')); rect(cx + i - 1, 24, cx + i + 1, 24, hex('#b87a5a')); } for (let y = 31; y < 46; y += 3) rect(cx - 8, y, cx + 8, y, P.ladrilloD); }
    if (k === 3) { rect(x0 + 6, 40, x0 + 16, 46, P.pizarraS); rect(x0 + 7, 41, x0 + 15, 45, hex('#5a5e6a')); rect(x0 + 5, 39, x0 + 17, 39, P.pizarraL); }
    for (let y = 52; y < 100; y++) for (let x = x0; x < x0 + 80; x++) { const fila = (y - 52) >> 1, xx = x + (fila & 1) * 3; B[y * 320 + x] = (y & 1) === 0 ? P.mortero : xx % 6 === 0 ? P.mortero : h(Math.floor(xx / 6), fila, 931 + k) < 0.2 ? P.ladrilloL : h(Math.floor(xx / 6), fila, 932 + k) < 0.15 ? P.ladrilloS : (k % 2 ? P.ladrillo : L.ladrillo2); }
    rect(x0, 52, x0, 118, P.ladrilloD); rect(x0, 52, x0 + 80, 53, P.estucoBS);
    for (const wx of [x0 + 12, x0 + 52]) { const lit = h(wx, 1, 933) < 0.45;
      for (const [wy, al] of [[56, 14], [76, 18]]) { rect(wx - 1, wy - 1, wx + 15, wy + al + 1, P.estucoBL); rect(wx, wy, wx + 14, wy + al, lit && wy === 76 ? L.vent : hex('#3a3e4a')); rect(wx + 7, wy, wx + 7, wy + al, P.estucoBL); rect(wx, wy + (al >> 1), wx + 14, wy + (al >> 1), P.estucoBL);
        if (!(lit && wy === 76)) { pset(wx + 2, wy + 2, hex('#6a7080')); pset(wx + 9, wy + 2, hex('#6a7080')); } else { rect(wx + 1, wy + al - 2, wx + 13, wy + al - 1, L.ventS); }
        rect(wx - 2, wy + al + 2, wx + 16, wy + al + 2, P.estucoBS); }
      rect(wx - 3, 92, wx + 17, 92, P.hierro); rect(wx - 3, 96, wx + 17, 96, P.hierro); for (let x = wx - 3; x <= wx + 17; x += 2) rect(x, 93, x, 95, P.hierro); }
    // la planta baja estucada con sus juntas, la puerta y su montante, la ventana y la escalinata
    rect(x0, 100, x0 + 80, 118, P.estucoB); for (let y = 103; y < 118; y += 4) rect(x0, y, x0 + 80, y, P.estucoBS); rect(x0, 100, x0 + 80, 100, P.estucoBL);
    const dx = k % 2 ? x0 + 56 : x0 + 8, pc = [L.puerta1, L.puerta2, L.puerta3, L.puerta1][k];
    rect(dx - 2, 98, dx + 16, 118, P.estucoBS); rect(dx, 104, dx + 14, 118, pc); rect(dx, 104, dx + 14, 104, c_mez(pc, C.blanco, 0.2)); rect(dx + 7, 106, dx + 7, 118, c_mez(pc, C.k, 0.4)); pset(dx + 11, 111, P.laton);
    for (let i = 0; i <= 14; i++) { const hh = Math.round(Math.sqrt(Math.max(0, 49 - (i - 7) * (i - 7))) * 0.6); rect(dx + i, 103 - hh, dx + i, 103, i % 3 === 0 ? P.estucoBS : (c_lit2(k) ? L.vent : hex('#4a4e58'))); }
    const vx = k % 2 ? x0 + 12 : x0 + 40; rect(vx, 104, vx + 26, 116, hex('#3a3e4a')); rect(vx + 13, 104, vx + 13, 116, P.estucoBL); rect(vx, 110, vx + 26, 110, P.estucoBL); if (k === 2) rect(vx + 1, 105, vx + 12, 109, L.vent);
    for (let s = 0; s < 3; s++) rect(dx - 2 - s, 118 + s * 2, dx + 16 + s, 119 + s * 2, s % 2 ? P.estucoBS : P.estucoB); }
  // la verja negra de lanzas del patio inglés, a lo largo de la acera de enfrente
  for (let x = 0; x < 320; x++) { if ((x % 80 >= 6 && x % 80 <= 26 && Math.floor(x / 80) % 2 === 0) || (x % 80 >= 54 && x % 80 <= 74 && Math.floor(x / 80) % 2 === 1)) continue; if (x % 3 === 0) { rect(x, 112, x, 122, P.hierro); pset(x, 111, P.hierroL); } }
  rect(0, 114, 319, 114, P.hierro); rect(0, 121, 319, 121, P.hierro);
  // la acera de enfrente, el bordillo, la calzada mojada (con los reflejos de las ventanas) y la acera de este lado
  for (let y = 122; y < 127; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = x % 14 === 0 || y === 124 ? P.losaS : h(x, y, 934) < 0.08 ? P.losaL : P.losa;
  rect(0, 127, 319, 127, P.losaL); rect(0, 128, 319, 128, P.losaS);
  for (let y = 129; y < 147; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 935); B[y * 320 + x] = q < 0.06 ? P.asfaltoS : q > 0.95 ? P.asfaltoL : P.asfalto; }
  for (let k = 0; k < 4; k++) for (const wx of [k * 80 + 12, k * 80 + 52]) if (h(wx, 1, 933) < 0.45) for (let y = 130; y < 146; y += 2) if (h(wx, y, 936) < 0.7) rect(wx + 2, y, wx + 12, y, c_mez(P.asfalto, L.vent, 0.35));
  rect(0, 137, 319, 137, c_mez(P.asfalto, C.blanco, 0.08));
  rect(0, 147, 319, 147, P.losaL); rect(0, 148, 319, 150, P.losaS);
  const fil = [151, 157, 164, 172, 182];
  for (let y = 151; y < 180; y++) { const f = y * 320, r = fil.findIndex((v) => y < v), y0 = fil[r - 1] ?? 151, Lw = 26 + r * 8;
    for (let x = 0; x < 320; x++) { const xx = x + (r & 1) * (Lw >> 1), k = Math.floor(xx / Lw), q = h(k, r, 937); let c = q < 0.4 ? P.losa : q < 0.7 ? c_mez(P.losa, P.losaL, 0.35) : c_mez(P.losa, P.losaS, 0.35);
      if (y === y0 || xx % Lw === 0) c = P.losaS; else if (h(x >> 1, y, 938) < 0.06) c = c_mez(c, P.nieblaL, 0.4); B[f + x] = c; } }
  for (const [cx, cy, rx] of [[96, 166, 12], [196, 174, 16]]) for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - rx; x <= cx + rx; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / 2.5) ** 2 < 1) pset(x, y, c_mez(R.pget(x, y), P.nieblaL, 0.45));
  // el plátano de sombra sin hojas, con su corteza a manchas y las ramas finas
  { const bx = 236; for (let y = 104; y < 153; y++) { const w = y > 146 ? 3 : 2; for (let i = -w; i <= w; i++) pset(bx + i, y, i === -w ? hex('#a8a090') : h(i, y >> 2, 939) < 0.3 ? hex('#c8c0a8') : hex('#7a7468')); }
    const rama = (x, y, a, l, g) => { if (l < 3 || g > 5) return; const x1 = x + Math.cos(a) * l, y1 = y + Math.sin(a) * l; linea(Math.round(x), Math.round(y), Math.round(x1), Math.round(y1), g < 2 ? hex('#6a645a') : hex('#5a5650')); if (g < 2) linea(Math.round(x) + 1, Math.round(y), Math.round(x1) + 1, Math.round(y1), hex('#7a7468'));
      rama(x1, y1, a - 0.45 + h(g, l, 940) * 0.2, l * 0.72, g + 1); rama(x1, y1, a + 0.4 - h(l, g, 941) * 0.2, l * 0.68, g + 1); };
    rama(bx, 106, -Math.PI / 2 - 0.5, 20, 0); rama(bx, 106, -Math.PI / 2 + 0.45, 18, 0); rama(bx, 116, -Math.PI / 2 + 1.0, 12, 1); rama(bx, 112, -Math.PI / 2 - 1.1, 12, 1);
  }
  // el buzón rojo (sin escudo) y la farola de gas de este lado
  { const bx = 290; rect(bx - 5, 132, bx + 5, 154, P.rojoB); rect(bx - 5, 132, bx - 4, 154, P.rojoBL); rect(bx + 4, 132, bx + 5, 154, P.rojoBS); rect(bx - 6, 128, bx + 6, 131, P.rojoBS); rect(bx - 5, 127, bx + 5, 127, P.rojoB); rect(bx - 3, 126, bx + 3, 126, P.rojoBL);
    rect(bx - 3, 136, bx + 3, 137, C.k); rect(bx - 2, 142, bx + 2, 147, P.rojoBS); rect(bx - 6, 152, bx + 6, 155, C.k); for (let i = 0; i < 12; i++) pset(bx + 6 + i, 155, c_mez(R.pget(bx + 6 + i, 155), C.k, 0.3)); }
  { const lx = 52; rect(lx - 3, 150, lx + 3, 156, P.hierro); rect(lx - 1, 92, lx + 1, 150, P.hierro); rect(lx - 1, 92, lx - 1, 150, P.hierroL); rect(lx - 2, 120, lx + 2, 121, P.hierro); rect(lx - 6, 102, lx + 6, 103, P.hierro);
    rect(lx - 4, 84, lx + 4, 85, P.hierro); rect(lx - 3, 86, lx + 3, 91, P.luzGasL); rect(lx - 4, 86, lx - 4, 91, P.hierro); rect(lx + 4, 86, lx + 4, 91, P.hierro); rect(lx, 86, lx, 91, P.hierroL); R.poligono([[lx - 5, 84], [lx, 79], [lx + 5, 84]], P.hierro); pset(lx, 78, P.hierro); rect(lx - 4, 92, lx + 4, 92, P.hierro); }
  return {};
}

// qué casas tienen el montante encendido
const c_lit2 = (k) => k % 2 === 0;

// el autobús rojo de dos pisos de 1939 (sin rótulos ni escudos), de lado: los dos pisos de ventanillas con gente, la
// franja crema, el capó delante, las ruedas que giran y los faros que se encienden en la niebla; x es la trasera según dir
function c_bus(R, x, suelo, t, dir = 1) {
  const P = c_P, X = (i) => Math.round(x + i * dir), r = (a, b, y0, y1, c) => R.rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c), L = 58;
  r(0, L, suelo - 34, suelo - 5, C.k); r(1, L - 1, suelo - 33, suelo - 6, P.rojoB); r(1, L - 1, suelo - 33, suelo - 33, P.rojoBL); r(1, L - 1, suelo - 20, suelo - 18, P.crema);
  for (const [y0, y1] of [[suelo - 31, suelo - 23], [suelo - 16, suelo - 9]]) for (let i = 4, k = 0; i < L - 6; i += 8, k++) { r(i, i + 5, y0, y1, hex('#3a3a46')); r(i, i + 5, y0, y0, hex('#7a7a88'));
      if (h(k, y0, 950) < 0.7) { const px = X(i + 2); R.rect(Math.min(px, px + dir), y0 + 3, Math.max(px, px + dir), y1, hex('#2a2a32')); R.rect(Math.min(px, px + dir), y0 + 2, Math.max(px, px + dir), y0 + 3, P.piel); } }
  r(L - 4, L + 4, suelo - 14, suelo - 6, P.rojoBS); r(L + 4, L + 5, suelo - 12, suelo - 6, C.k); R.pset(X(L + 4), suelo - 10, P.luzGasL); r(-1, 3, suelo - 16, suelo - 6, hex('#3a3a46'));
  for (let i = 8; i < L - 6; i += 12) r(i, i + 8, suelo - 21, suelo - 21, P.rojoBS);
  for (const wx of [10, L - 6]) { R.disco(X(wx), suelo - 4, 4, C.k); R.disco(X(wx), suelo - 4, 2, C.metalS); const a = t * 6 * dir; R.pset(Math.round(X(wx) + Math.cos(a) * 2), Math.round(suelo - 4 + Math.sin(a) * 2), C.metalL); }
}

// el taxi negro de Londres (alto y cuadrado), de lado, con el taxista, el letrerito de libre (una luz sin letras) y las
// ruedas; x es la trasera según dir
function c_taxi(R, x, suelo, t, dir = 1) {
  const P = c_P, X = (i) => Math.round(x + i * dir), r = (a, b, y0, y1, c) => R.rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c), k = hex('#18181e'), kL = hex('#3a3a46');
  r(0, 34, suelo - 10, suelo - 4, C.k); r(1, 33, suelo - 9, suelo - 5, k); r(1, 33, suelo - 9, suelo - 9, kL);
  r(2, 22, suelo - 20, suelo - 10, C.k); r(3, 21, suelo - 19, suelo - 10, k); r(4, 10, suelo - 18, suelo - 13, hex('#5a6070')); r(13, 20, suelo - 18, suelo - 13, hex('#5a6070')); r(3, 21, suelo - 19, suelo - 19, kL);
  { const cx = X(17); R.rect(Math.min(cx, cx + dir), suelo - 17, Math.max(cx, cx + dir), suelo - 15, P.piel); R.rect(Math.min(cx - dir, cx + 2 * dir), suelo - 18, Math.max(cx - dir, cx + 2 * dir), suelo - 18, hex('#2a2a30')); }
  r(22, 33, suelo - 13, suelo - 10, k); r(32, 34, suelo - 13, suelo - 6, C.metalS); R.pset(X(33), suelo - 11, P.luzGasL); r(11, 13, suelo - 22, suelo - 21, hex('#e8a040'));
  for (const wx of [7, 28]) { R.disco(X(wx), suelo - 3, 3.4, C.k); R.disco(X(wx), suelo - 3, 1.6, C.metalS); const a = t * 9 * dir; R.pset(Math.round(X(wx) + Math.cos(a) * 1.6), Math.round(suelo - 3 + Math.sin(a) * 1.6), C.metalL); }
}

// LA CALLE DE LONDRES (general): ver la cabecera de cairo()
function c_londres(R, t, o) {
  const P = c_P, L = c_L, ni = c_lim(o.niebla ?? 0.5), cap = c_capa(R, 'tu-londres', (marca) => c_londresFijo(R, marca)), m = cap.m, B = R.buf;
  c_nubes(R, t, m, [hex('#9a9c9a'), hex('#b4b6b2'), hex('#c8c8c2')], 4, 30, 6, 1.2, 31, 0.6);
  c_pajaros(R, t, m, 3, 12, 40, hex('#5a5c60'), 5, 6);
  // el humo de las chimeneas, que sube y se tumba con el aire
  for (let c = 0; c < 4; c++) { const cx = c * 80 + 40; for (let k = 0; k < 10; k++) { const u = (t * 0.25 + k / 10 + c * 0.3) % 1, x = Math.round(cx + u * 26 + Math.sin(t + k + c) * 2), y = Math.round(22 - u * 18); if ((x >= 272 && y < 48) || (x >= 20 && x <= 170 && y < 21)) continue;
      for (const [i, j] of [[0, 0], [1, 0], [0, 1]]) R.pset(x + i, y + j, c_mez(R.pget(x + i, y + j), hex('#7a7c7e'), 0.55 - u * 0.5)); } }
  // la gente de la acera de enfrente (bombines, paraguas, gabardinas) y un guardia quieto en la esquina
  const tipos = ['bombin', 'paraguas', 'senora', 'gabardina', 'bombin', 'paraguas'];
  for (let k = 0; k < 5; k++) { const v = 5 + h(k, 1, 951) * 6, d = h(k, 2, 951) < 0.5 ? 1 : -1, x = ((h(k, 3, 951) * 380 + t * v * d) % 380 + 380) % 380 - 30; c_figura(R, x, 125, t, tipos[k], k, d, true); }
  c_figura(R, 302, 126, t, 'guardia', 2, -1, false);
  // el autobús rojo por el carril de enfrente y el taxi negro por el de este lado
  { const x = ((t * 22 + 50) % 520) - 90; c_bus(R, x, 137, t, 1); }
  { const x = 420 - ((t * 34 + 160) % 560); c_taxi(R, x, 146, t, -1); }
  // las palomas que picotean junto al buzón
  for (let k = 0; k < 2; k++) { const px = 270 + k * 8 + Math.round(Math.sin(t * 0.7 + k * 2) * 4), py = 156 - k, pi = Math.sin(t * 5 + k * 2) > 0.3 ? 1 : 0;
    R.rect(px - 2, py - 3, px + 1, py - 1, hex('#8a8a96')); R.rect(px + 1, py - 4 + pi, px + 2, py - 3 + pi, hex('#9a9aa8')); R.pset(px + 3, py - 3 + pi, hex('#c89040')); R.pset(px - 3, py - 2, hex('#5a5a66')); R.pset(px, py, hex('#c86a5a')); }
  // la niebla que se arrastra (o.niebla 0–1) y el halo de la farola de gas, que tiembla
  c_niebla(R, t, ni, 0, 180);
  { const lx = 52, ly = 88, f = 0.9 + Math.sin(t * 11) * 0.05 + Math.sin(t * 3.7) * 0.05; for (let j = -18; j <= 18; j++) for (let i = -18; i <= 18; i++) { const d = Math.hypot(i, j); if (d < 5 || d > 18) continue; const x = lx + i, y = ly + j; if (c_um(x, y) < f * (1 - d / 18) * 0.8) R.pset(x, y, c_mez(R.pget(x, y), P.luzGas, 0.45)); } R.rect(lx - 3, 86, lx + 3, 91, P.luzGasL); }
  return {};
}

// lo de delante en Londres: la verja negra de lanzas de la casa de delante, en la esquina de abajo a la izquierda
// (general), o el poste de la verja con su pomo (cámara 'puerta')
function c_londresDelante(R, t, o, cam) {
  const P = c_P;
  if (cam === 'puerta') { R.rect(0, 136, 7, 179, P.hierro); R.rect(7, 136, 7, 179, P.hierroL); R.disco(3, 133, 4, P.hierro); R.pset(1, 131, P.hierroL); R.pset(2, 130, P.hierroL); R.rect(0, 142, 8, 143, P.hierro); return {}; }
  R.rect(0, 158, 44, 159, P.hierro); R.rect(0, 174, 44, 175, P.hierro);
  for (let x = 2; x <= 44; x += 5) { R.rect(x, 150, x, 179, P.hierro); R.pset(x - 1, 151, P.hierro); R.pset(x + 1, 151, P.hierro); R.pset(x, 148, P.hierro); R.pset(x, 149, P.hierroL); }
  R.rect(44, 146, 48, 179, P.hierro); R.rect(44, 146, 44, 179, P.hierroL); R.disco(46, 144, 3, P.hierro); R.pset(45, 142, P.hierroL);
  return {};
}

function c_puertaFijo(R) {
  const P = c_P, L = c_L, { rect, pset, disco, linea } = R, B = R.buf;
  // el ladrillo en aparejo flamenco, con su llaga; más suave arriba a la derecha (Atom) y bajo el año
  for (let y = 0; y < 166; y++) for (let x = 0; x < 320; x++) { const fila = y >> 2, L2 = (fila & 1) ? 9 : 6, xx = x + (fila & 1) * 4, cal = (x >= 268 && y < 50) || (x >= 16 && x <= 174 && y < 24);
    let c = (y & 3) === 0 || xx % L2 === 0 ? P.mortero : h(Math.floor(xx / L2), fila, 960) < 0.2 ? P.ladrilloL : h(Math.floor(xx / L2), fila, 961) < 0.2 ? P.ladrilloS : P.ladrillo; if (cal) c = (y & 3) === 0 || xx % L2 === 0 ? c_mez(P.mortero, P.ladrillo, 0.5) : P.ladrillo; B[y * 320 + x] = c; }
  // la ventana de la planta baja de la izquierda, tras la verja, y el hueco del sótano
  rect(28, 54, 98, 108, P.estucoBL); rect(31, 57, 95, 105, hex('#3a3e4a')); rect(62, 57, 64, 105, P.estucoBL); rect(31, 80, 95, 81, P.estucoBL); for (const x of [46, 80]) rect(x, 57, x, 105, P.estucoBL); for (const y of [68, 93]) rect(31, y, 95, y, P.estucoBL);
  for (let y = 58; y < 105; y++) for (let x = 32; x < 95; x++) if (c_um(x, y) < 0.25) pset(x, y, hex('#5a6070')); rect(26, 108, 100, 112, P.estucoB); rect(26, 108, 100, 108, P.estucoBL); rect(26, 113, 100, 113, P.estucoBS);
  rect(0, 116, 126, 166, P.estucoB); for (let y = 120; y < 166; y += 5) rect(0, y, 126, y, P.estucoBS); rect(0, 116, 126, 116, P.estucoBL); rect(0, 117, 126, 117, P.estucoBS);
  for (let y = 117; y < 166; y++) for (let x = 0; x < 126; x++) if (h(x, y, 967) < 0.04) pset(x, y, P.estucoBS);
  rect(40, 146, 84, 166, hex('#2a2a32')); for (let x = 42; x < 84; x += 4) rect(x, 146, x, 166, P.hierro); rect(39, 145, 85, 145, P.estucoBS);
  // el pórtico: las dos pilastras estucadas, el entablamento, el montante en abanico, la puerta negra de cuarterones
  rect(124, 80, 210, 90, P.estucoB); rect(124, 80, 210, 81, P.estucoBL); rect(124, 89, 210, 90, P.estucoBS); rect(120, 76, 214, 79, P.estucoBL); rect(120, 79, 214, 79, P.estucoBS);
  for (const x of [126, 196]) { rect(x, 90, x + 12, 158, P.estucoB); rect(x, 90, x + 1, 158, P.estucoBL); rect(x + 11, 90, x + 12, 158, P.estucoBS); for (let y = 94; y < 156; y += 3) pset(x + 6, y, P.estucoBS); rect(x - 1, 90, x + 13, 92, P.estucoBL); rect(x - 1, 154, x + 13, 158, P.estucoBS); }
  rect(138, 90, 196, 104, P.estucoBS); for (let j = 0; j < 14; j++) for (let i = 0; i <= 50; i++) { const dx = i - 25, dy = 14 - j; if ((dx * dx) / 625 + (dy * dy) / 196 > 1) continue; pset(142 + i, 90 + j, h(i, j, 962) < 0.5 ? hex('#4a4a58') : hex('#5a5a6a')); }
  for (let k = 0; k <= 6; k++) { const a = Math.PI + k * Math.PI / 6; linea(167, 104, Math.round(167 + Math.cos(a) * 24), Math.round(104 + Math.sin(a) * 14), P.estucoBL); } rect(142, 103, 192, 104, P.estucoBL);
  rect(140, 104, 194, 158, hex('#121218')); rect(142, 106, 192, 158, L.puerta3);
  for (const [y0, y1] of [[110, 128], [132, 154]]) for (const [x0, x1] of [[146, 164], [170, 188]]) { rect(x0, y0, x1, y1, hex('#0c0c10')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#24242e')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#3e3e4c')); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, hex('#34343f')); }
  rect(142, 106, 144, 158, hex('#3a3a46'));
  // el buzón para cartas, el pomo y la aldaba de latón, el número (solo cifras)
  rect(158, 140, 176, 143, P.latonS); rect(159, 141, 175, 141, P.latonL); rect(159, 142, 175, 142, hex('#0c0c10'));
  disco(185, 132, 2, P.laton); pset(184, 131, P.latonL);
  R.anillo(167, 124, 4, P.laton); rect(165, 117, 169, 120, P.laton); pset(166, 117, P.latonL); pset(167, 128, P.latonS);
  R.numero('9', 168, 101, { centro: true, color: P.latonL, sombra: false });
  // los dos escalones de piedra, desgastados en el centro, y el limpiabarros
  rect(132, 158, 202, 161, P.estucoBS); rect(132, 158, 202, 158, P.estucoBL); rect(128, 162, 206, 165, P.estucoB); rect(128, 162, 206, 162, P.estucoBL); rect(128, 165, 206, 165, P.estucoBS);
  for (let x = 150; x < 186; x++) if (h(x, 1, 963) < 0.6) { pset(x, 159, c_mez(P.estucoBS, C.k, 0.15)); pset(x, 163, c_mez(P.estucoB, C.k, 0.12)); }
  rect(210, 154, 220, 155, P.hierro); rect(210, 155, 210, 165, P.hierro); rect(220, 155, 220, 165, P.hierro);
  // las botellas de leche en el escalón
  for (const x of [136, 141]) { rect(x, 150, x + 3, 157, hex('#f0f0f0')); rect(x + 3, 150, x + 3, 157, hex('#c8c8d0')); rect(x + 1, 148, x + 2, 149, hex('#e8e8f0')); rect(x, 147, x + 3, 147, hex('#c8a040')); }
  // la ventana de guillotina de la derecha, encendida por dentro, con su visillo, su dintel y la jardinera
  rect(214, 64, 302, 68, P.estucoB); rect(214, 64, 302, 64, P.estucoBL); rect(214, 68, 302, 68, P.estucoBS);
  rect(218, 69, 298, 128, P.estucoBL); rect(221, 72, 295, 125, L.vent); for (let y = 72; y <= 125; y++) for (let x = 221; x <= 295; x++) { const cort = x < 236 || x > 280; if (cort ? (x + y) % 3 !== 0 : c_um(x, y) < 0.2) pset(x, y, cort ? hex('#f4ecd8') : L.ventS); }
  rect(257, 72, 259, 125, P.estucoBL); rect(221, 97, 295, 99, P.estucoBL); for (const x of [233, 245, 270, 282]) rect(x, 72, x, 125, P.estucoBL); for (const y of [84, 111]) rect(221, y, 295, y, P.estucoBL);
  rect(214, 128, 302, 131, P.estucoB); rect(214, 128, 302, 128, P.estucoBL); rect(214, 131, 302, 132, P.estucoBS);
  rect(218, 134, 298, 146, P.verdeS); rect(219, 135, 297, 145, P.verde); rect(219, 135, 297, 135, P.verdeL); for (let x = 224; x < 296; x += 12) rect(x, 137, x + 8, 143, P.verdeS);
  // la acera de losas, mojada, con su brillo
  rect(0, 166, 319, 166, P.losaL);
  for (let y = 167; y < 180; y++) for (let x = 0; x < 320; x++) { const r = y < 173 ? 0 : 1, Lw = 40 + r * 10, xx = x + r * 20, k = Math.floor(xx / Lw), q = h(k, r, 964); let c = q < 0.5 ? P.losa : c_mez(P.losa, P.losaS, 0.4); if (y === 173 || xx % Lw === 0) c = P.losaS; else if (h(x >> 1, y, 965) < 0.07) c = c_mez(c, P.nieblaL, 0.5); B[y * 320 + x] = c; }
  c_velo(R, 0, 167, 319, 168, C.k, 0.25);
  return {};
}

// LA CÁMARA 'puerta' (Londres): ver la cabecera de cairo()
function c_puerta(R, t, o) {
  const P = c_P, L = c_L, ho = c_lim(o.hojas ?? 0.5); c_capa(R, 'tu-puerta', () => c_puertaFijo(R));
  // la verja del patio inglés (lanzas negras) con su puerta, delante del sótano
  for (let x = 2; x < 124; x += 5) { R.rect(x, 140, x, 166, P.hierro); R.pset(x, 138, P.hierro); R.pset(x - 1, 139, P.hierro); R.pset(x + 1, 139, P.hierro); R.pset(x, 137, P.hierroL); }
  R.rect(0, 143, 124, 143, P.hierro); R.rect(0, 162, 124, 162, P.hierro); R.rect(121, 132, 124, 166, P.hierro); R.rect(121, 132, 121, 166, P.hierroL); R.disco(122.5, 130, 2.5, P.hierro); R.pset(121, 129, P.hierroL);
  // la farola de gas de la izquierda (empieza por debajo del año), encendida y con su halo que tiembla
  { const lx = 18; R.rect(lx - 1, 64, lx + 1, 166, P.hierro); R.rect(lx - 1, 64, lx - 1, 166, P.hierroL); R.rect(lx - 3, 162, lx + 3, 166, P.hierro); R.rect(lx - 6, 70, lx + 6, 71, P.hierro);
    R.rect(lx - 5, 50, lx + 5, 51, P.hierro); R.rect(lx - 4, 52, lx + 4, 62, P.luzGasL); for (const x of [lx - 5, lx, lx + 5]) R.rect(x, 52, x, 62, P.hierro); R.poligono([[lx - 6, 50], [lx, 43], [lx + 6, 50]], P.hierro); R.rect(lx - 5, 63, lx + 5, 63, P.hierro);
    const f = 0.85 + Math.sin(t * 10) * 0.08 + Math.sin(t * 3.1) * 0.07; for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const d = Math.hypot(i, j); if (d < 7 || d > 20) continue; const x = lx + i, y = 57 + j; if (y < 26 && x >= 16 && x <= 174) continue; if (c_um(x, y) < f * (1 - d / 20) * 0.75) R.pset(x, y, c_mez(R.pget(x, y), P.luzGas, 0.4)); } }
  // los geranios rojos de la jardinera, que el aire mece
  for (let k = 0; k < 13; k++) { const x = 222 + k * 6, sw = Math.round(Math.sin(t * 1.8 + k) * 1), y = 128 - (k % 3) * 2;
    R.rect(x, y + 2, x, 134, P.hierbaS); R.rect(x - 2, y + 4, x - 1, y + 5, P.hierba); R.rect(x + 1, y + 5, x + 2, y + 6, P.hierbaS);
    R.disco(x + sw, y, 2, P.geranio); R.pset(x + sw - 1, y - 1, hex('#f05a5a')); R.pset(x + sw + 1, y + 1, P.geranioS); }
  // el bastón apoyado en la jamba (o.baston false: no está)
  if (o.baston !== false) { R.linea(198, 158, 203, 124, hex('#3a2416')); R.linea(199, 158, 204, 124, hex('#5a3a22')); R.rect(202, 121, 207, 122, hex('#3a2416')); R.pset(207, 123, hex('#3a2416')); R.pset(198, 158, P.laton); }
  // las hojas secas: unas quietas en el rincón del escalón y otras que el viento arrastra por la acera (o.hojas 0–1)
  for (let k = 0; k < 7; k++) { const x = 128 + (k % 4) * 3 + (k > 3 ? 74 : 0), y = 164 - (k % 2); R.pset(x, y, [P.hoja, P.hojaS, P.hojaL][k % 3]); R.pset(x + 1, y, P.hoja); }
  const nh = Math.round(ho * 12);
  for (let k = 0; k < nh; k++) { const v = 18 + h(k, 1, 966) * 26, u = ((t * v / 360) + h(k, 2, 966)) % 1, x = Math.round(-20 + u * 360), y = Math.round(170 + h(k, 3, 966) * 8 - Math.abs(Math.sin(t * 4 + k)) * (3 + h(k, 4, 966) * 5)), g = Math.floor(t * 7 + k) % 3, c = [P.hoja, P.hojaS, P.hojaL][k % 3];
    if (g === 0) { R.rect(x, y, x + 2, y, c); R.pset(x + 1, y - 1, c); } else if (g === 1) { R.rect(x, y - 1, x, y + 1, c); R.pset(x + 1, y, c); } else { R.pset(x, y, c); R.pset(x + 1, y + 1, c); R.pset(x + 2, y, c); } }
  // la niebla fina que pasa (aquí, de cerca, poca)
  c_niebla(R, t, 0.35 * c_lim(o.niebla ?? 0.6) / 0.6, 0, 180);
  return {};
}

// el encuadre y la cámara que piden las opciones (un encuadre que no existe cae en 'escaner'; una cámara que no es la
// suya, en 'general')
const d_cual = (o) => { const enc = V_ESCANEO[o.encuadre] ? o.encuadre : 'escaner', e = V_ESCANEO[enc]; return [enc, o.camara === e.cam ? e.cam : 'general']; };

// (d_tono, d_mez, d_velo, d_poli, d_luz, d_motas, d_figura, d_babuino, d_paredNorte, d_techo, d_paredLado y d_losas son
// COPIAS de las b_ del grupo B (la tumba), para que la cámara pintada sea la misma en los dos decorados: si se integran
// juntas, se pueden unificar)
// la capa fija de cada vista: se pinta una sola vez en un búfer y en cada fotograma se copia entera (una pasada)
const d_capas = new Map();

function d_capa(R, clave, dibuja) {
  let b = d_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); d_capas.set(clave, b); }
  R.copiar(b);
}

// el tramado ordenado 4 × 4 (umbral 0–1) y una rampa tramada: v entre 0 y rampa.length − 1
const D_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_d = (x, y) => D_BAYER[(y & 3) * 4 + (x & 3)];

const d_tono = (rp, v, x, y) => { const i = Math.floor(v) + (v - Math.floor(v) > d_d(x, y) ? 1 : 0); return rp[i < 0 ? 0 : i >= rp.length ? rp.length - 1 : i]; };

const d_rp = (...cs) => cs.map(hex);

// mezcla dos colores: a = 0 deja c, a = 1 da d
const d_mez = (c, d, a) => { const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0; };

// tiñe un rectángulo hacia un color (con paso 2, solo la mitad de los píxeles, tramado)
function d_velo(R, x0, y0, x1, y1, col, a, paso = 1) {
  for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) if (paso === 1 || (x + y) % paso === 0) R.pset(x, y, d_mez(R.pget(x, y), col, a));
}

// un polígono relleno con su contorno
function d_poli(R, pts, c, borde) { R.poligono(pts, c); if (borde != null) for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; R.linea(a[0], a[1], b[0], b[1], borde); } }

// LA LUZ de la vista, en una sola pasada por toda la pantalla: cada píxel va hacia la noche azul según lo lejos que esté
// de las luces (fuentes: [x, y, radio, fuerza, achatado]) y toma el tinte de la luz; amb: la luz que queda en lo más oscuro
const D_NOCHE = [14, 16, 32];

function d_luz(R, fuentes, amb, tinte) {
  const B = R.usar(null), n = fuentes.length;
  R.usar(B);
  const [tr, tg, tb] = tinte, [nr, ng, nb] = D_NOCHE;
  for (let y = 0; y < 180; y++) {
    const fila = y * 320;
    for (let x = 0; x < 320; x++) {
      let L = amb;
      for (let i = 0; i < n; i++) { const f = fuentes[i], dx = (x - f[0]) / f[2], dy = (y - f[1]) / (f[2] * (f[4] || 0.8)), d2 = dx * dx + dy * dy; if (d2 < 1) L += f[3] * (1 - d2) * (1 - d2 * 0.5); }
      const v = L * 6, fl = Math.floor(v), q = Math.min(7, fl + (v - fl > 0.5 + (D_BAYER[(y & 3) * 4 + (x & 3)] - 0.5) * 0.36 ? 1 : 0)) / 6;
      const p = B[fila + x], r = p & 255, g = (p >> 8) & 255, b = (p >> 16) & 255;
      const w = q > 1 ? 1 : q, cr = r * (1 + (tr - 1) * w), cg = g * (1 + (tg - 1) * w), cb = b * (1 + (tb - 1) * w);
      const rr = nr + (cr - nr) * q, gg = ng + (cg - ng) * q, bb = nb + (cb - nb) * q;
      B[fila + x] = (0xff000000 | ((bb > 255 ? 255 : bb < 0 ? 0 : bb) << 16) | ((gg > 255 ? 255 : gg < 0 ? 0 : gg) << 8) | (rr > 255 ? 255 : rr < 0 ? 0 : rr)) >>> 0;
    }
  }
}

// las motas de polvo que flotan dentro de la luz (lentas, suben y bajan)
function d_motas(R, t, x0, y0, x1, y1, n, col, k = 0) {
  for (let i = 0; i < n; i++) { const x = x0 + ((h(i, 1, k) * (x1 - x0) + t * (2 + h(i, 2, k) * 3)) % (x1 - x0)), y = y0 + ((h(i, 3, k) * (y1 - y0) + Math.sin(t * 0.7 + i) * 6 - t * 1.5 + 400) % (y1 - y0));
    if (Math.sin(t * 2 + i * 1.7) > -0.3) R.pset(Math.round(x), Math.round(y), col); }
}

// LA CÁMARA PINTADA (canon), NUESTRA: el ocre de la pared, la piel de los pictogramas y los colores de la cenefa
const D_OCRE = d_rp('#7a4c1c', '#9a6626', '#b07a2c', '#c89038', '#e0a848', '#ecbc60', '#f4cc78');

const D_PIC = { k: hex('#3a1c0c'), piel: hex('#a8502c'), pielL: hex('#c06a3c'), mujer: hex('#f0c070'), blanco: hex('#f6f0dc'), blancoS: hex('#cfc4a4'),
  azul: hex('#2c4ca8'), azulL: hex('#6a90e0'), rojo: hex('#b8382a'), verde: hex('#3a8a5a'), negro: hex('#1c1410'), oro: hex('#f0c040'), oroS: hex('#b07a18') };

// una figura de las pinturas (pictograma NUESTRO de perfil, sin cara): tipo 'faraon', 'diosa', 'chacal' o 'pareja';
// P(u, v): de las unidades de la pared a la pantalla; (cx, base): los pies; d: 1 mira a la derecha
function d_figura(R, P, cx, base, tipo, d) {
  const Q = (pts) => pts.map(([lx, ly]) => P(cx + lx * d, base - ly)), K = D_PIC.k;
  const poli = (pts, c) => d_poli(R, Q(pts), c, K);
  const ln = (a, b, c) => { const [x0, y0] = P(cx + a[0] * d, base - a[1]), [x1, y1] = P(cx + b[0] * d, base - b[1]); R.linea(x0, y0, x1, y1, c); };
  const varon = tipo !== 'diosa';
  if (varon) {
    const piel = tipo === 'chacal' ? D_PIC.pielL : D_PIC.piel;
    poli([[-6, 0], [-2, 0], [-2, 30], [-6, 30]], piel); poli([[3, 0], [7, 0], [5, 30], [1, 30]], piel);
    poli([[-7, 0], [0, 0], [0, 2], [-6, 2]], piel); poli([[2, 0], [10, 0], [9, 2], [2, 2]], piel);
    poli([[-9, 62], [-6, 62], [-6, 36], [-9, 36]], piel);
    poli([[-8, 28], [9, 28], [7, 45], [-6, 45]], D_PIC.blanco); for (let i = -4; i < 8; i += 3) ln([i, 30], [i - 2, 43], D_PIC.blancoS);
    poli([[1, 28], [5, 28], [4, 41], [2, 41]], D_PIC.oro);
    poli([[-6, 44], [7, 44], [7, 47], [-6, 47]], D_PIC.oro);
    poli([[-6, 47], [6, 47], [9, 62], [-9, 62]], piel);
    for (const [y, c] of [[58, D_PIC.azul], [59, D_PIC.oro], [60, D_PIC.rojo], [61, D_PIC.azul], [62, D_PIC.oro]]) ln([-8, y], [8, y], c);
    poli([[6, 60], [9, 62], [17, 55], [15, 52]], piel); poli([[15, 52], [17, 55], [18, 64], [16, 65]], piel);
    poli([[-2, 62], [2, 62], [2, 66], [-2, 66]], piel);
    if (tipo === 'chacal') {
      poli([[-4, 64], [3, 64], [11, 70], [12, 73], [4, 74], [5, 84], [2, 81], [0, 76], [-2, 84], [-4, 79], [-5, 70]], D_PIC.negro);
      ln([4, 73], [10, 72], D_PIC.oroS);
      ln([19, 0], [19, 70], D_PIC.oroS); ln([20, 0], [20, 70], D_PIC.oro); ln([19, 70], [23, 73], D_PIC.oro); ln([18, 0], [17, -2], D_PIC.oroS); ln([20, 0], [22, -2], D_PIC.oroS);
    } else {
      poli([[-5, 66], [6, 66], [7, 71], [5, 75], [-4, 75], [-5, 70]], piel);
      poli([[-6, 68], [-7, 76], [-3, 85], [5, 84], [8, 77], [6, 70], [2, 68]], D_PIC.azul);
      for (const [a, b] of [[-3, 74], [0, 79], [3, 74], [-1, 71], [4, 80]]) { const [x, y] = P(cx + a * d, base - b); R.pset(x, y, D_PIC.azulL); }
      poli([[7, 75], [9, 76], [9, 79], [7, 78]], D_PIC.oro);
    }
  }
  if (tipo === 'diosa' || tipo === 'pareja') {
    const dx = tipo === 'pareja' ? 13 : 0, e = tipo === 'pareja' ? -1 : 1, Z = (pts) => pts.map(([a, b]) => [dx + a * e, b]);
    poli(Z([[-5, 0], [5, 0], [5, 50], [-6, 50]]), D_PIC.rojo); ln([dx - 5 * e, 22], [dx + 5 * e, 22], D_PIC.blanco);
    poli(Z([[-5, 0], [4, 0], [4, 2], [-5, 2]]), D_PIC.mujer);
    poli(Z([[-5, 50], [5, 50], [6, 62], [-6, 62]]), D_PIC.mujer);
    for (const [y, c] of [[58, D_PIC.verde], [59, D_PIC.oro], [60, D_PIC.azul], [61, D_PIC.oro]]) ln([dx - 6 * e, y], [dx + 6 * e, y], c);
    poli(Z([[5, 60], [8, 61], [14, 50], [12, 48]]), D_PIC.mujer);
    poli(Z([[-2, 62], [2, 62], [2, 66], [-2, 66]]), D_PIC.mujer);
    poli(Z([[-6, 60], [-7, 72], [-2, 77], [5, 75], [6, 68], [4, 64], [2, 60]]), D_PIC.negro);
    if (tipo === 'diosa') {
      poli([[-6, 77], [-4, 79], [-2, 78], [2, 78], [4, 79], [6, 77], [5, 82], [3, 80], [-3, 80], [-5, 82]], D_PIC.negro);
      poli([[-4, 80], [4, 80], [5, 84], [3, 88], [-3, 88], [-5, 84]], D_PIC.rojo);
      ln([14, 46], [14, 38], D_PIC.azul); ln([12, 44], [16, 44], D_PIC.azul); const [ax, ay] = P(cx + 14 * d, base - 49); R.anillo(ax, ay, 2, D_PIC.azul);
    } else {
      poli([[7, 58], [10, 60], [19, 58], [18, 55]], D_PIC.piel);
    }
  }
}

// un babuino sentado de la pared oeste (pictograma chibi, de perfil y sin cara); (x, y): la base
function d_babuino(R, x, y) {
  const K = D_PIC.k, gr = hex('#6a7258'), grL = hex('#a4ac84'), grS = hex('#454a3a');
  d_poli(R, [[x - 5, y], [x + 3, y], [x + 4, y - 4], [x + 2, y - 8], [x - 2, y - 9], [x - 5, y - 6]], gr, K);
  R.linea(x - 4, y - 6, x - 1, y - 8, grL); R.pset(x - 3, y - 3, grS); R.pset(x - 2, y - 2, grS);
  R.disco(x + 2.5, y - 9.5, 2.6, grL); R.anillo(x + 2.5, y - 9.5, 2.8, K);
  d_poli(R, [[x + 4, y - 11], [x + 8, y - 10], [x + 8, y - 8], [x + 4, y - 8]], gr, K);
  R.linea(x + 4, y - 5, x + 8, y - 13, K); R.linea(x + 3, y - 5, x + 7, y - 13, grS);
  R.pset(x - 6, y - 1, K); R.pset(x - 7, y - 2, K); R.pset(x - 7, y - 3, K); R.pset(x - 6, y - 4, K);
}

// LA PARED NORTE (canon: x 24–270, y 26–148 en las unidades de la pared) pintada en el rectángulo [X0, Y0, X1, Y1]:
// el ocre con su estuco, la cenefa, el zócalo, las columnas de signos que no se leen y las tres escenas. Devuelve P(u, v)
function d_paredNorte(R, X0, Y0, X1, Y1, k = 0) {
  const sx = (X1 - X0) / 246, sy = (Y1 - Y0) / 122, P = (u, v) => [Math.round(X0 + (u - 24) * sx), Math.round(Y0 + (v - 26) * sy)];
  for (let y = Math.max(0, Y0); y <= Math.min(179, Y1); y++) for (let x = Math.max(0, X0); x <= Math.min(319, X1); x++) {
    const v = 26 + (y - Y0) / sy, g = h(x >> 2, y >> 2, k) * 0.7 + h(x, y, k + 1) * 0.45 + Math.sin((x - X0) * 0.05 + h(x >> 4, y >> 4, k) * 3) * 0.15;
    R.pset(x, y, v > 132 ? d_tono(d_rp('#3a2010', '#5a3418', '#6e4420', '#84542a'), 1.2 + g * 1.6, x, y) : d_tono(D_OCRE, 3.4 + g * 1.4 - (v - 26) / 140, x, y));
  }
  const [, yc0] = P(0, 27), [, yc1] = P(0, 35);
  for (let x = Math.max(0, X0); x <= Math.min(319, X1); x++) { const u = (x - X0) / sx, c = [D_PIC.azul, D_PIC.blanco, D_PIC.rojo, D_PIC.blanco, D_PIC.verde, D_PIC.blanco][Math.floor(u / 4) % 6] ?? D_PIC.azul, ancho = Math.floor(u / 4) % 2 ? 1 : 3;
    for (let y = yc0; y <= yc1; y++) R.pset(x, y, (u % 4) < ancho + 1 || Math.floor(u / 4) % 2 === 0 ? (h(x, y, k + 3) > 0.92 ? D_PIC.blancoS : c) : D_PIC.blanco); R.pset(x, yc1 + 1, D_PIC.k); R.pset(x, yc0 - 1, D_PIC.k); }
  for (let u = 30; u < 266; u += 6) { if ((u > 96 && u < 104) || (u > 176 && u < 184)) continue; const [x0] = P(u, 0);
    for (let v = 39; v < 50; v += 3) { const [, y] = P(0, v), r = h(u, v, k + 4); if (r < 0.3) R.rect(x0, y, x0 + Math.max(1, Math.round(3 * sx)), y + Math.max(0, Math.round(sy) - 1), D_PIC.k); else if (r < 0.55) R.pset(x0 + 1, y, D_PIC.azul); else if (r < 0.75) { R.pset(x0, y, D_PIC.k); R.pset(x0 + 2, y, D_PIC.k); } else R.pset(x0 + 1, y, D_PIC.rojo); }
    const [, ya] = P(0, 38), [, yb] = P(0, 51); if (u % 18 === 0) R.linea(x0 - 2, ya, x0 - 2, yb, D_PIC.k); }
  { const [xa, y] = P(26, 130), [xb] = P(268, 130); R.rect(xa, y, xb, y, D_PIC.k); const [, z] = P(0, 132); R.rect(X0, z, X1, z, D_PIC.k); R.rect(X0, z + 1, X1, z + 1, hex('#a06a30')); }
  for (const u of [100, 180]) { const [x, ya] = P(u, 38), [, yb] = P(u, 130); R.rect(x, ya, x, yb, D_PIC.k); R.rect(x + 1, ya, x + 1, yb, D_PIC.azul); }
  d_figura(R, P, 44, 130, 'faraon', 1); d_figura(R, P, 82, 130, 'diosa', -1);
  d_figura(R, P, 118, 130, 'faraon', 1); d_figura(R, P, 160, 130, 'chacal', -1);
  d_figura(R, P, 216, 130, 'faraon', 1); d_figura(R, P, 216, 130, 'pareja', 1);
  for (let i = 0; i < 160 * sx * sy; i++) { const [x, y] = P(26 + h(i, 1, k + 7) * 242, 38 + h(i, 2, k + 7) * 92); R.pset(x, y, hex('#6a3a1a')); if (h(i, 3, k + 7) > 0.6) R.pset(x + 1, y, hex('#8a5224')); }
  return P;
}

// LA PARED OESTE de frente (canon: los doce babuinos en cuatro columnas de tres, el ocre, la cenefa y el zócalo) en el
// rectángulo [X0, Y0, X1, Y1]
function d_paredOeste(R, X0, Y0, X1, Y1, k = 0) {
  const al = Y1 - Y0, an = X1 - X0;
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const v = (y - Y0) / al, g = h(x >> 2, y >> 2, k) * 0.7 + h(x, y, k + 1) * 0.45;
    R.pset(x, y, v < 0.02 ? D_PIC.k : v < 0.07 ? [D_PIC.azul, D_PIC.blanco, D_PIC.rojo, D_PIC.blanco, D_PIC.verde, D_PIC.blanco][Math.floor((x - X0) / 3) % 6] : v < 0.08 ? D_PIC.k
      : v > 0.89 ? d_tono(d_rp('#3a2010', '#5a3418', '#6e4420', '#84542a'), 1.2 + g * 1.6, x, y) : v > 0.88 ? D_PIC.k : d_tono(D_OCRE, 3.4 + g * 1.4 - v * 0.7, x, y)); }
  for (let col = 0; col < 4; col++) for (let fila = 0; fila < 3; fila++) {
    const x = Math.round(X0 + an * (0.15 + col * 0.235)), y = Math.round(Y0 + al * (0.36 + fila * 0.2)); d_babuino(R, x, y); R.linea(x - 8, y + 1, x + 9, y + 1, D_PIC.k); }
  for (let i = 0; i < an * al / 90; i++) R.pset(Math.round(X0 + h(i, 1, k + 9) * an), Math.round(Y0 + al * (0.1 + h(i, 2, k + 9) * 0.76)), hex('#6a3a1a'));
}

// el techo liso y oscuro de la cámara (sin pintar), con su estuco apenas marcado
const D_TECHO = d_rp('#120e0c', '#1a1512', '#231c16', '#2e241a');

function d_techo(R, pts, k = 0) { R.poligono(pts, (x, y) => d_tono(D_TECHO, 1 + h(x >> 2, y >> 2, k) * 0.9 + h(x, y, k + 1) * 0.3, x, y)); }

// una pared lateral pintada en escorzo entre el filo cercano xa (de ya0 a ya1) y el lejano xb (de yb0 a yb1); osc: lo
// que se oscurece; con babuinos, los doce en cuatro columnas (pared oeste)
function d_paredLado(R, xa, ya0, ya1, xb, yb0, yb1, osc, babuinos, k = 0, sinCenefa = false) {
  const paso = xa < xb ? 1 : -1;
  for (let x = xa; x !== xb + paso; x += paso) { const u = (x - xa) / (xb - xa), y0 = Math.round(ya0 + (yb0 - ya0) * u), y1 = Math.round(ya1 + (yb1 - ya1) * u), al = y1 - y0;
    for (let y = y0; y <= y1; y++) { const v = (y - y0) / al, g = h(x >> 1, y >> 2, k) * 0.8 + h(x, y, k + 1) * 0.4;
      let c = sinCenefa && v < 0.087 ? d_tono(D_OCRE, 2.6 + g, x, y) : v < 0.025 ? D_PIC.k : v < 0.075 ? [D_PIC.azul, D_PIC.blanco, D_PIC.rojo, D_PIC.blanco, D_PIC.verde, D_PIC.blanco][Math.floor(u * 40) % 6] : v < 0.085 ? D_PIC.k : v > 0.88 ? d_tono(d_rp('#3a2010', '#5a3418', '#6e4420'), 0.6 + g * 1.4, x, y) : v > 0.87 ? D_PIC.k : d_tono(D_OCRE, 3.2 + g * 1.5 - v * 0.8, x, y);
      if (v > 0.1 && v < 0.86 && h(x, y, k + 5) > 0.985) c = hex('#6a3a1a');
      R.pset(x, y, d_mez(c, hex('#2a1408'), osc)); } }
  if (babuinos) for (let col = 0; col < 4; col++) for (let fila = 0; fila < 3; fila++) {
    const u = 0.12 + col * 0.22, x = Math.round(xa + (xb - xa) * u), y0 = ya0 + (yb0 - ya0) * u, y1 = ya1 + (yb1 - ya1) * u, al = y1 - y0;
    const y = Math.round(y0 + al * (0.34 + fila * 0.2)); d_babuino(R, x, y); R.linea(x - 8, y + 1, x + 9, y + 1, D_PIC.k); }
}

// el suelo de losas de caliza de la cámara, en perspectiva hacia el punto (vx, vy)
function d_losas(R, y0, y1, vx, vy, k = 0, rp = d_rp('#5a4a3a', '#7a6650', '#988268', '#b29c7e', '#c8b494')) {
  for (let y = y0; y <= y1; y++) { const z = (y - vy) / (y1 - vy);
    for (let x = 0; x < 320; x++) { const xb = vx + (x - vx) / z, jv = Math.abs(((xb + 1000) % 46) - 23) > 22, jh = Math.abs(Math.sin(Math.log(z + 0.2) * 9)) < 0.08;
      R.pset(x, y, jv || jh ? rp[0] : d_tono(rp, 1.6 + h(Math.floor(xb / 46), Math.floor(Math.log(z + 0.2) * 3), k) * 1.2 + h(x, y, k + 1) * 0.5 + (y - y0) / (y1 - y0) * 0.6, x, y)); } }
}

// EL MODELO DEL ESCÁNER (el relieve en grises): pinta con dibuja() la pared en color en un búfer aparte, una sola vez, y
// de su rectángulo [X0, Y0, X1, Y1] saca la altura (las figuras y los signos abultan un poco sobre el yeso, suavizados) y
// dos versiones en grises: con luz frontal (casi plana) y con LUZ RASANTE desde la izquierda (los bultos en luz y
// sombra y sus sombras largas hacia la derecha). Devuelve { X0, Y0, W, H, b (el color), gF, gR }
const d_relieves = new Map();

function d_relieve(R, clave, X0, Y0, X1, Y1, dibuja) {
  let r = d_relieves.get(clave); if (r) return r;
  const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev);
  const W = X1 - X0 + 1, H = Y1 - Y0 + 1, N = W * H, L = new Float32Array(N), A = new Float32Array(N);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const x = X0 + i, y = Y0 + j, k = j * W + i;
    if (x < 0 || x > 319 || y < 0 || y > 179) { L[k] = 0.62; continue; }
    const p = b[y * 320 + x], r0 = p & 255, g0 = (p >> 8) & 255, b0 = (p >> 16) & 255, l = (0.3 * r0 + 0.59 * g0 + 0.11 * b0) / 255; L[k] = l;
    const ocre = r0 > 150 && r0 - b0 > 90 && g0 - b0 > 50; A[k] = ocre ? 0 : l < 0.25 ? 0.75 : 1; }
  const borra = (S) => { const D = new Float32Array(N); for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { let s = 0, n = 0;
    for (let b2 = -1; b2 <= 1; b2++) for (let a2 = -1; a2 <= 1; a2++) { const ii = i + a2, jj = j + b2; if (ii < 0 || jj < 0 || ii >= W || jj >= H) continue; s += S[jj * W + ii]; n++; } D[j * W + i] = s / n; } return D; };
  const Hh = borra(borra(borra(A))), gF = new Float32Array(N), gR = new Float32Array(N), en = (i, j) => Hh[Math.max(0, Math.min(H - 1, j)) * W + Math.max(0, Math.min(W - 1, i))];
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const k = j * W + i, hx = en(i + 1, j) - en(i - 1, j), hy = en(i, j + 1) - en(i, j - 1);
    let sombra = 0; for (let s = 2; s <= 9; s++) { if (en(i - s, j - (s >> 2)) - s * 0.03 > Hh[k] + 0.06) { sombra = 1 - s / 12; break; } }
    const ruido = h(i, j, 41) * 0.05 + h(i >> 2, j >> 2, 42) * 0.06 + (Math.abs(Math.sin(j * 0.21 + Math.sin(i * 0.05) * 1.6)) < 0.05 ? -0.05 : 0);
    gF[k] = 0.7 + (L[k] - 0.62) * 0.14 + hx * 0.3 + Hh[k] * 0.03 + ruido * 0.5;
    gR[k] = 0.5 + hx * 2.6 - hy * 0.7 - sombra * 0.24 + (L[k] - 0.62) * 0.1 + ruido * 1.3 + (1 - i / W) * 0.14; }
  r = { X0, Y0, W, H, b, gF, gR }; d_relieves.set(clave, r); return r;
}

// el gris del modelo: nueve tonos fríos (del hueco más hondo al filo con más luz)
const D_GRIS = d_rp('#18181e', '#2a2a32', '#3e3e48', '#54545e', '#6c6c76', '#86868e', '#a0a0a8', '#bcbcc2', '#d8d8dc', '#f0f0f2');

// pinta un relieve en pantalla: ras 0–1 (de la luz frontal a la rasante), col 0–1 (la pintura que vuelve en
// transparencia, tramada), dentro (opcional): (x, y) → si se pinta ese píxel
function d_pintaRelieve(R, r, ras, col = 0, dentro = null) {
  const B = R.usar(null); R.usar(B);
  for (let j = 0; j < r.H; j++) { const y = r.Y0 + j; if (y < 0 || y > 179) continue;
    for (let i = 0; i < r.W; i++) { const x = r.X0 + i; if (x < 0 || x > 319 || (dentro && !dentro(x, y))) continue; const k = j * r.W + i;
      B[y * 320 + x] = col > 0 && d_d(x, y) < col ? r.b[y * 320 + x] : d_tono(D_GRIS, (r.gF[k] + (r.gR[k] - r.gF[k]) * ras) * 9, x, y); } }
}

// las aristas de un rectángulo tapiado bajo el yeso (las «rayas»): el dintel y las dos jambas, con la luz a la izquierda
// de cada escalón y la sombra fina a la derecha; a 0–1 lo que se ven; sin el lado de abajo (llega al suelo)
function d_aristas(R, x0, y0, x1, y1, a) {
  if (a <= 0) return;
  const os = hex('#141418'), cl = hex('#fafaff'), m = (x, y, c, f) => R.pset(x, y, d_mez(R.pget(x, y), c, Math.min(1, f * a)));
  for (let x = x0; x <= x1; x++) { const q = 0.8 + h(x, 1, 57) * 0.2; m(x, y0 - 2, cl, 0.3 * q); m(x, y0 - 1, cl, 0.75 * q); m(x, y0, os, 0.95 * q); m(x, y0 + 1, os, 0.5 * q); m(x, y0 + 2, os, 0.2 * q); }
  for (let y = y0; y <= y1; y++) { const q = 0.8 + h(2, y, 57) * 0.2; m(x0 - 1, y, cl, 0.8 * q); m(x0, y, os, 0.9 * q); m(x0 + 1, y, os, 0.45 * q); m(x0 + 2, y, os, 0.15 * q);
    m(x1 - 1, y, cl, 0.35 * q); m(x1, y, cl, 0.85 * q); m(x1 + 1, y, os, 0.95 * q); m(x1 + 2, y, os, 0.6 * q); m(x1 + 3, y, os, 0.25 * q); }
}

// un búfer con la pared norte del canon en color a escala 1 (x 24–270, y 26–148), del que se sacan muestras (los paneles
// impresos del taller, la pantallita del cabezal)
let d_paredBuf = null;

function d_pared(R) { if (!d_paredBuf) { d_paredBuf = R.nuevo(); const prev = R.usar(d_paredBuf); R.rect(0, 0, 319, 179, hex('#3a2010')); d_paredNorte(R, 24, 26, 270, 148, 5); R.usar(prev); } return d_paredBuf; }

// copia un trozo de la pared del canon (desde la unidad (u0, v0), f unidades por píxel) en el rectángulo de pantalla
// [x0, y0, x1, y1]; osc 0–1 lo oscurece (un panel a la sombra); dentro: (x, y) → si se pinta
function d_muestra(R, u0, v0, f, x0, y0, x1, y1, osc = 0, dentro = null) {
  const src = d_pared(R), oscuro = hex('#1a1008');
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { if (dentro && !dentro(x, y)) continue;
    const su = Math.max(0, Math.min(319, Math.round(u0 + (x - x0) * f))), sv = Math.max(0, Math.min(179, Math.round(v0 + (y - y0) * f))), c = src[sv * 320 + su];
    R.pset(x, y, osc > 0 ? d_mez(c, oscuro, osc) : c); }
}

// una figurita de fondo (de 10–13 px: operarios, turistas, guías): cabeza, pelo, cuerpo con ropa, piernas que andan
// (o.anda), un brazo que trabaja (o.brazo 0–1 lo levanta); o.dir; o.lleva: un color de lo que carga en brazos
function d_figurita(R, x, suelo, t, o = {}) {
  const K = hex('#1a1418'), ropa = hex(o.ropa ?? '#eef0ee'), ropaS = d_mez(ropa, K, 0.3), piel = hex(o.piel ?? '#d09060'), pelo = hex(o.pelo ?? '#3a2a20'), pan = hex(o.pantalon ?? '#3a4458');
  const xs = Math.round(x), d = o.dir ?? 1, f = o.anda ? Math.sin(t * 9 + (o.k ?? 0)) : 0, p = Math.round(f * 1.4), s = suelo, al = o.alto ?? 12;
  R.rect(xs - 1 + p, s - 4, xs - 1 + p, s - 1, pan); R.rect(xs + 1 - p, s - 4, xs + 1 - p, s - 1, pan); R.pset(xs - 1 + p, s - 1, K); R.pset(xs + 1 - p, s - 1, K);
  const yc = s - al + 4;
  R.rect(xs - 2, yc, xs + 2, s - 5, ropa); R.rect(xs + (d > 0 ? -2 : 2), yc, xs + (d > 0 ? -2 : 2), s - 5, ropaS); R.rect(xs - 2, s - 5, xs + 2, s - 5, ropaS);
  R.pset(xs - 3, yc + 1, K); R.pset(xs + 3, yc + 1, K);
  const br = o.brazo ?? 0, bx = xs + 3 * d, by = Math.round(yc + 2 - br * 3 + (br > 0 ? Math.sin(t * 7 + (o.k ?? 0)) * br : 0));
  R.linea(xs + 2 * d, yc + 1, bx, by, ropaS); R.pset(bx, by, piel);
  if (o.lleva) { R.rect(xs + d * 2, yc + 1, xs + d * 5, yc + 3, hex(o.lleva)); R.rect(xs + d * 2, yc + 1, xs + d * 5, yc + 1, d_mez(hex(o.lleva), hex('#ffffff'), 0.4)); }
  R.disco(xs, yc - 3, 2, piel); R.rect(xs - 2, yc - 5, xs + 2, yc - 4, pelo); R.pset(xs - d * 2, yc - 3, pelo);
  if (o.gorra) { R.rect(xs - 2, yc - 6, xs + 2, yc - 5, hex(o.gorra)); R.rect(xs + d, yc - 5, xs + d * 4, yc - 5, hex(o.gorra)); }
}

// una nube de tres tonos (sombra, cuerpo y luz) hecha solo con discos: respeta R.recorte
function d_nube(R, cx, cy, w, cols) {
  const bolas = [[0, 0, 0.3], [-0.3, 0.08, 0.22], [0.3, 0.06, 0.24], [-0.1, -0.12, 0.24], [0.14, -0.08, 0.2]];
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), cols[0]);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w), cols[1]);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * 0.75), cols[2]);
}

// una palmera datilera que se mece con el viento: el tronco anillado (curvo) y las hojas en abanico con su sombra
function d_palmera(R, x, suelo, alto, t, k = 0) {
  const vx = Math.sin(t * 0.9 + k) * 1.5, tr = d_rp('#5a3a22', '#7a5434', '#9a7048');
  let px = x, py = suelo;
  for (let j = 0; j < alto; j++) { const u = j / alto, cx = Math.round(x + Math.sin(u * 1.4 + k) * 3 + u * u * vx), y = suelo - j;
    R.rect(cx - 1, y, cx + 1, y, j % 3 === 0 ? tr[0] : tr[1]); R.pset(cx - 1, y, tr[0]); R.pset(cx + 1, y, j % 3 === 0 ? tr[1] : tr[2]); px = cx; py = y; }
  const hojas = d_rp('#2a4a22', '#3e6a2c', '#5a8a3a', '#7aa648');
  for (let i = 0; i < 9; i++) { const a = -Math.PI + (i / 8) * Math.PI + Math.sin(t * 1.3 + i + k) * 0.08 + vx * 0.03, l = 12 + (i % 3) * 3;
    for (let s = 0; s <= l; s++) { const u = s / l, hx = Math.round(px + Math.cos(a) * s), hy = Math.round(py - 2 + Math.sin(a) * s * 0.6 + u * u * 7);
      R.pset(hx, hy, hojas[i % 2 ? 1 : 2]); R.pset(hx, hy + 1, hojas[0]); if (s % 2 === 0 && s > 2) R.pset(hx + (i < 4 ? -1 : 1), hy + 2, hojas[1]); if (s % 3 === 0) R.pset(hx, hy - 1, hojas[3]); } }
  R.disco(px, py, 2, hex('#7a4a1a')); R.pset(px + 1, py + 1, hex('#a86a28'));
}

// un cable que cuelga entre dos puntos (catenaria), con su brillo
function d_cable(R, x0, y0, x1, y1, comba, c = hex('#1a1a20'), cl = hex('#4a4a56')) {
  const n = Math.max(2, Math.ceil(Math.abs(x1 - x0) + Math.abs(y1 - y0)));
  for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * comba); R.pset(x, y, c); if (i % 4 === 0) R.pset(x, y - 1, cl); }
}

const D_VISTAS = {}, D_DELANTE = {};

const d_ac = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

// un vaivén de ida y vuelta (0 → 1 → 0) con los extremos suaves
const d_vaiven = (u) => 0.5 - 0.5 * Math.cos(u * Math.PI * 2);

// el aluminio de los raíles y pórticos (de la sombra al brillo)
const D_AL = d_rp('#33383f', '#4e5560', '#7a838f', '#a4adb8', '#ccd3db', '#eef1f4');

// ─ escaner (general): LA CÁMARA PINTADA, la pared norte de frente (canon), con EL ESCÁNER en su raíl ─
D_VISTAS['escaner.general'] = (R, t, o) => {
  const pas = d_ac(o.pasada ?? 0.45), AL = D_AL;
  d_capa(R, 'escaner', () => {
    d_techo(R, [[0, 0], [319, 0], [319, 46], [270, 26], [24, 26], [0, 12]], 20);
    d_paredLado(R, 0, 12, 166, 23, 26, 148, 0.42, true, 21);
    d_paredLado(R, 319, 46, 166, 271, 26, 148, 0.66, false, 22, true);
    d_paredNorte(R, 24, 26, 270, 148, 0);
    R.linea(23, 26, 23, 148, hex('#3a2010')); R.linea(271, 26, 271, 148, hex('#2a1408'));
    d_losas(R, 149, 179, 147, 100, 23);
    for (let y = 149; y <= 166; y++) { const xa = Math.round(23 - (y - 149) * 23 / 17), xb = Math.round(271 + (y - 149) * 48 / 17);
      for (let x = 0; x <= xa; x++) R.pset(x, y, d_mez(d_tono(d_rp('#7a6650', '#988268'), 0.6 + h(x, y, 24), x, y), hex('#000000'), 0.55));
      for (let x = xb; x <= 319; x++) R.pset(x, y, d_mez(d_tono(d_rp('#7a6650', '#988268'), 0.6 + h(x, y, 25), x, y), hex('#000000'), 0.7)); }
    R.rect(24, 149, 270, 149, hex('#3a2a1c'));
    // una pasarela de tablones de protección sobre las losas, junto a la pared (la tumba se pisa lo menos posible)
    for (let x = 22; x < 280; x++) for (let y = 158; y <= 163; y++) R.pset(x, y, (x % 38 === 0) ? hex('#3a2a1a') : d_tono(d_rp('#5a4430', '#7a5e40', '#96784e', '#b09060'), 1.6 + Math.sin(x * 0.3 + h(x >> 3, y, 26) * 4) * 0.5 + (y === 158 ? 1.2 : y === 163 ? -1 : 0), x, y));
    // EL RAÍL: perfil de aluminio sobre patas a lo largo de la pared (x 18–278), con su ranura, sus pies y los topes
    for (let x = 22; x <= 276; x += 32) { R.rect(x - 1, 155, x + 1, 160, AL[2]); R.pset(x - 1, 156, AL[4]); R.rect(x + 1, 155, x + 1, 160, AL[1]); R.rect(x - 3, 160, x + 3, 161, hex('#1a1a1e')); }
    R.rect(18, 150, 278, 150, AL[5]); R.rect(18, 151, 278, 152, AL[4]); R.rect(18, 153, 278, 154, AL[2]); R.rect(18, 155, 278, 155, AL[0]);
    for (let x = 19; x < 278; x += 3) R.pset(x, 153, AL[1]);
    for (const x of [16, 280]) { R.rect(x - 2, 146, x + 2, 156, hex('#24242a')); R.rect(x - 1, 147, x + 1, 149, hex('#c8502a')); R.pset(x - 1, 147, hex('#f08a5a')); }
    // los dos focos de luz fría en trípode, en las esquinas (paneles de LED con aletas)
    for (const [x, y, d] of [[8, 66, 1], [306, 70, -1]]) {
      for (const [a, b] of [[-7, 168], [0, 172], [7, 166]]) R.linea(x, y + 14, x + a, b, AL[1]);
      R.rect(x - 1, y + 6, x + 1, y + 30, AL[2]); R.pset(x - 1, y + 10, AL[4]);
      R.rect(x - 6, y - 6, x + 6, y + 7, hex('#1c1e22')); R.rect(x - 5, y - 5, x + 5, y + 6, hex('#2a2e34'));
      R.rect(x - 8, y - 7, x - 7, y + 8, hex('#3a3e46')); R.rect(x + 7, y - 7, x + 8, y + 8, hex('#3a3e46'));
    }
    // un rollo de cable naranja y una maleta de transporte junto al zócalo, a la izquierda
    for (let a = 0; a < 3; a++) R.anillo(46, 162 - a, 6 - a, hex('#d0602a')); R.anillo(46, 162, 6, hex('#8a3a18'), 2);
    R.rect(30, 152, 58, 158, hex('#2a2a30')); R.rect(30, 152, 58, 152, hex('#5a5a64')); for (const x of [30, 58]) { R.rect(x, 152, x, 158, AL[3]); } R.rect(42, 150, 46, 151, AL[2]);
    // el sarcófago (cerrado) tapado con una sábana blanca, a la derecha: pliegues, dobladillo y la piedra que asoma
    const TE = d_rp('#6e6e74', '#94949a', '#b8b8bc', '#d6d6d8', '#eeeeec', '#fafaf8');
    R.poligono([[284, 128], [296, 122], [319, 120], [319, 166], [286, 166], [281, 152]], (x, y) => d_tono(TE, 2.9 + Math.sin(x * 0.55 + Math.sin(y * 0.1) * 1.4) * 0.9 - Math.max(0, (y - 140)) / 40 + (x - 284) * 0.012 + h(x, y, 3) * 0.3, x, y));
    R.linea(284, 128, 281, 152, TE[1]); R.linea(281, 152, 286, 166, TE[1]); R.linea(284, 128, 296, 122, TE[5]); R.linea(296, 122, 319, 120, TE[5]);
    for (let x = 286; x < 320; x++) { const y = 166 + Math.round(Math.sin(x * 0.7) * 1.2); R.pset(x, y, TE[0]); R.pset(x, y - 1, TE[4]); }
    for (let x = 287; x < 320; x++) for (let y = 167; y <= 171; y++) R.pset(x, y, d_tono(d_rp('#3a1a14', '#5a2a22', '#783a30', '#a8584a'), 1.8 + h(x >> 1, y, 27) * 1.2 - (y - 167) * 0.25, x, y));
    for (let x = 286; x < 320; x++) R.pset(x, 172, hex('#1a1010'));
  });
  const cx = Math.round(lerp(40, 252, pas)), hy = Math.round(40 + d_vaiven(t * 0.2) * 96), az = hex('#5aa8ff');
  // LA MALLA azul de lo ya escaneado (todo lo que el carro ha dejado atrás): rejilla fina sobre la pintura; la franja
  // recién hecha, más viva
  for (let y = 27; y <= 147; y++) for (let x = 25; x < Math.min(270, cx - 10); x++) { const g = y % 4 === 0, v = x % 4 === 0; if (!g && !v) continue;
    const fresco = x > cx - 30 ? 0.16 : 0; R.pset(x, y, d_mez(R.pget(x, y), az, g && v ? 0.5 : 0.13 + fresco)); }
  // la luz fría del cabezal sobre la pared (una mancha alargada que sube y baja con él)
  for (let j = -14; j <= 14; j++) for (let i = -18; i <= 18; i++) { const d = (i * i) / 324 + (j * j) / 196; if (d > 1) continue; const x = cx + i, y = hy + j; if (y < 27 || y > 147) continue;
    if ((x + y) % 2 === 0 || d < 0.45) R.pset(x, y, d_mez(R.pget(x, y), hex('#f2f8ff'), 0.42 * (1 - d))); }
  // la cadena portacables tumbada delante del raíl, del tope izquierdo al carro
  for (let x = 20; x < cx - 9; x += 3) { R.rect(x, 156, x + 1, 158, hex('#1c1c22')); R.pset(x, 156, hex('#50505a')); }
  // EL CARRO: la base con ruedas sobre el raíl, el mástil vertical con sus agujeros y el CABEZAL que sube y baja
  R.rect(cx - 10, 143, cx + 10, 149, AL[2]); R.rect(cx - 10, 143, cx + 10, 143, AL[4]); R.rect(cx - 10, 149, cx + 10, 149, AL[0]); R.rect(cx + 8, 144, cx + 10, 148, AL[1]);
  for (const dx of [-6, 6]) { R.disco(cx + dx, 150, 2, hex('#16161a')); R.pset(cx + dx, 150, AL[3]); }
  R.pset(cx - 8, 145, Math.sin(t * 6) > 0 ? hex('#5aff8a') : hex('#1a5a2a'));
  R.rect(cx - 2, 28, cx + 2, 143, AL[3]); R.rect(cx - 2, 28, cx - 2, 143, AL[5]); R.rect(cx + 2, 28, cx + 2, 143, AL[1]); for (let y = 32; y < 142; y += 6) R.pset(cx, y, AL[1]);
  R.rect(cx - 4, 26, cx + 4, 28, AL[1]); R.rect(cx - 4, 26, cx + 4, 26, AL[4]);
  for (let y = hy + 7; y < 143; y++) R.pset(cx + 3, y + (y % 7 === 0 ? 1 : 0), hex('#18181c'));
  R.rect(cx - 9, hy - 6, cx + 9, hy + 6, hex('#2a2e36')); R.rect(cx - 9, hy - 6, cx + 9, hy - 6, hex('#6a727e')); R.rect(cx - 9, hy + 6, cx + 9, hy + 6, hex('#14161a'));
  R.rect(cx + 7, hy - 5, cx + 9, hy + 5, hex('#1e2026')); for (let y = hy - 3; y <= hy + 3; y += 2) R.rect(cx - 6, y, cx + 4, y, hex('#3a3e48'));
  R.pset(cx - 7, hy - 4, Math.sin(t * 9) > 0 ? hex('#ff4a3a') : hex('#5a1a14')); R.pset(cx - 5, hy - 4, hex('#5aff8a'));
  // la luz: los dos focos fríos de las esquinas y el destello del cabezal
  d_luz(R, [[14, 72, 200, 0.42, 0.9], [300, 76, 200, 0.38, 0.9], [cx, hy, 48, 0.3, 1.2]], 0.56, [0.97, 1.0, 1.07]);
  // las caras de los focos (encendidas) y las motas en su luz
  for (const [x, y, d] of [[8, 66, 1], [306, 70, -1]]) { R.rect(x - 4 + d, y - 4, x + 4 + d, y + 5, hex('#e8f2ff')); for (let j = y - 4; j <= y + 5; j += 2) R.rect(x - 4 + d, j, x + 4 + d, j, hex('#c8dcf4')); R.halo(x + d * 10, y, 16, [hex('#3a4458'), hex('#5a6a84')], 0.8); }
  d_motas(R, t, 20, 40, 120, 150, 12, hex('#e8f0ff'), 1); d_motas(R, t, 200, 40, 296, 150, 10, hex('#e8f0ff'), 2);
  return { carro: [cx, hy] };
};
// escaner (general), lo de delante: la mesita plegable de la izquierda con el portátil (la pared que se va llenando de
// gris al ritmo de o.pasada), los guantes blancos y la cinta
D_DELANTE['escaner.general'] = (R, t, o) => {
  const pas = d_ac(o.pasada ?? 0.45), cx = Math.round(lerp(40, 252, pas)), AL = D_AL;
  // el cable del portátil al carro, por el suelo
  d_cable(R, 40, 156, cx - 10, 152, 8);
  R.rect(8, 156, 9, 179, AL[2]); R.rect(9, 156, 9, 179, AL[1]); R.rect(56, 156, 57, 179, AL[1]); R.linea(9, 160, 56, 174, AL[1]); R.linea(9, 174, 56, 160, AL[0]);
  R.rect(12, 166, 52, 176, hex('#1e1e24')); R.rect(12, 166, 52, 166, hex('#4a4a54')); for (const x of [12, 52]) R.rect(x, 166, x, 176, AL[3]); R.rect(30, 164, 34, 165, AL[2]);
  R.rect(2, 152, 62, 155, AL[3]); R.rect(2, 152, 62, 152, AL[5]); R.rect(2, 155, 62, 155, AL[1]); R.rect(2, 156, 62, 156, hex('#16161a'));
  // el portátil: la base, la pantalla con la pared en grises que se completa por columnas y la línea del carro
  R.rect(12, 149, 44, 151, hex('#8a9098')); R.rect(12, 149, 44, 149, hex('#c4c8ce')); R.rect(20, 150, 36, 150, hex('#5a6068'));
  R.rect(14, 131, 42, 148, hex('#22242a')); R.rect(14, 131, 42, 131, hex('#4a4e56'));
  const src = d_pared(R), n = Math.round(pas * 25);
  for (let j = 0; j < 14; j++) for (let i = 0; i < 25; i++) { const x = 16 + i, y = 133 + j;
    if (i <= n) { const p = src[Math.round(26 + j * 122 / 14) * 320 + Math.round(24 + i * 246 / 25)], l = ((p & 255) * 0.3 + ((p >> 8) & 255) * 0.59 + ((p >> 16) & 255) * 0.11) / 255; R.pset(x, y, d_tono(D_GRIS, 2 + l * 6, x, y)); }
    else R.pset(x, y, (i + j + Math.floor(t * 4)) % 9 === 0 ? hex('#1a3a5a') : hex('#0c1620')); }
  R.rect(16 + n, 133, 16 + n, 146, hex('#7ac8ff'));
  // los guantes blancos de algodón y un rollo de cinta, sobre la mesa
  for (const [x, y] of [[48, 150], [53, 151]]) { R.rect(x, y, x + 4, y + 1, hex('#f4f4f0')); R.pset(x + 4, y - 1, hex('#f4f4f0')); R.pset(x, y + 1, hex('#c8c8c4')); }
  R.anillo(58, 150, 2, hex('#5a7ac8')); R.pset(58, 150, hex('#22242a'));
  return { portatil: [28, 140], mesa: [2, 152, 62, 179] };
};

// ─ escaner (cabezal): EL CABEZAL de cerca contra la pintura (la mano del faraón y la de la diosa con su ankh), la
// línea roja del barrido y la pantallita del relieve ─
D_VISTAS['escaner.cabezal'] = (R, t, o) => {
  const bar = d_ac(o.barrido ?? (t * 0.16) % 1), ly = Math.round(lerp(6, 172, bar)), AL = D_AL;
  d_capa(R, 'cabezal', () => {
    d_paredNorte(R, -48, -136, 936, 352, 3);
    // la caja del cabezal, a la derecha: chapa en dos tonos (la esquina de Atom, tranquila), tornillos y rejillas
    for (let y = 0; y < 180; y++) for (let x = 236; x < 320; x++) R.pset(x, y, d_tono(d_rp('#262a30', '#2c3037', '#32373e'), 1 + h(x >> 3, y >> 1, 30) * 0.5 + (x < 239 ? 1.2 : 0), x, y));
    R.rect(236, 0, 236, 179, hex('#5a626e')); R.rect(237, 0, 237, 179, hex('#14161a'));
    R.rect(244, 50, 319, 166, hex('#3c4149')); R.rect(244, 50, 319, 50, hex('#6e7682')); R.rect(244, 166, 319, 166, hex('#16181c')); R.rect(244, 50, 244, 166, hex('#5a626e'));
    for (let y = 58; y < 80; y += 3) R.rect(256, y, 310, y, hex('#22252b'));
    for (const [x, y] of [[248, 54], [314, 54], [248, 162], [314, 162]]) { R.pset(x, y, hex('#8a929e')); R.pset(x + 1, y + 1, hex('#1a1c20')); }
    for (const [x, c] of [[262, '#d84a3a'], [270, '#3a8ad8'], [278, '#d8d8dc']]) R.rect(x, 86, x + 5, 87, hex(c));
    // las dos ópticas que asoman hacia la pared, con sus anillos y el cristal azulado
    for (const y of [74, 132]) { for (let x = 214; x <= 244; x++) for (let j = -7; j <= 7; j++) R.pset(x, y + j, d_tono(AL, 2.4 - j * 0.28 + (x % 6 === 0 ? -1.2 : 0) + (Math.abs(j) === 7 ? -1.5 : 0), x, y + j));
      R.rect(211, y - 6, 213, y + 6, hex('#1a1c22')); R.rect(210, y - 4, 210, y + 4, hex('#2a4a7a')); R.pset(210, y - 3, hex('#9ad0ff')); R.pset(211, y - 5, hex('#8a929e')); }
    // la ranura del láser
    R.rect(238, 96, 242, 112, hex('#1a0a0a')); R.rect(239, 98, 240, 110, hex('#8a1a14'));
  });
  // arriba, bajo la barra del año, la pintura se apaga hacia la sombra (fondo tranquilo)
  for (let y = 0; y < 22; y++) for (let x = 0; x < 236; x++) if (d_d(x, y) < (22 - y) / 22) R.pset(x, y, d_mez(R.pget(x, y), hex('#1a1008'), 0.45));
  // lo ya barrido, con su malla fina
  for (let y = 0; y < ly - 2; y++) for (let x = 0; x < 210; x++) if (y % 5 === 0 || x % 5 === 0) R.pset(x, y, d_mez(R.pget(x, y), hex('#6ab0ff'), y % 5 === 0 && x % 5 === 0 ? 0.4 : 0.14));
  // la hoja del láser desde la ranura y la luz del cabezal sobre la pintura
  R.poligono([[240, 100], [240, 108], [0, ly + 1], [0, ly - 1]], (x, y) => ((x * 3 + y) % 7 === 0 ? d_mez(R.pget(x, y), hex('#ff5a3a'), 0.22) : R.pget(x, y)));
  d_luz(R, [[150, ly, 210, 0.42, 0.55], [226, 104, 70, 0.22, 1.2]], 0.44, [1.05, 1.0, 0.95]);
  // LA LÍNEA ROJA del barrido, con su resplandor y las chispitas del moteado del láser
  for (let x = 0; x < 238; x++) { R.pset(x, ly, h(x, Math.floor(t * 20), 31) > 0.85 ? hex('#fff0e8') : hex('#ff3a2a'));
    for (const [dy, a] of [[-1, 0.5], [1, 0.5], [-2, 0.16], [2, 0.16]]) if (ly + dy >= 0 && ly + dy < 180) R.pset(x, ly + dy, d_mez(R.pget(x, ly + dy), hex('#ff4a2a'), a)); }
  R.rect(239, 98, 240, 110, hex('#ff5a3a'));
  // la pantallita: el relieve en grises de lo que ya se ha barrido (sacado de la propia pared, con su relieve)
  R.rect(250, 110, 310, 152, hex('#16181c')); R.rect(250, 110, 310, 110, hex('#5a626e'));
  const src = d_capas.get('cabezal'), fil = Math.round(bar * 37);
  const lum = (x, y) => { const p = src[Math.max(0, Math.min(179, y)) * 320 + Math.max(0, Math.min(209, x))]; return ((p & 255) * 0.3 + ((p >> 8) & 255) * 0.59 + ((p >> 16) & 255) * 0.11) / 255; };
  for (let j = 0; j < 38; j++) for (let i = 0; i < 57; i++) { const x = 252 + i, y = 112 + j;
    if (j < fil) { const sx = Math.round(i * 210 / 57), sy = Math.round(j * 180 / 38), g = 0.55 + (lum(sx + 3, sy) - lum(sx - 3, sy)) * 1.6 + (lum(sx, sy) - 0.6) * 0.3; R.pset(x, y, d_tono(D_GRIS, g * 9, x, y)); }
    else R.pset(x, y, j === fil ? hex('#ff5a3a') : (i * 7 + j * 3 + Math.floor(t * 6)) % 23 === 0 ? hex('#1a2a3a') : hex('#0a1016')); }
  // los pilotos: verde fijo, ámbar que parpadea
  R.pset(300, 58 + 26, hex('#5aff8a')); R.pset(304, 84, Math.sin(t * 7) > 0 ? hex('#ffb03a') : hex('#4a3010'));
  d_motas(R, t, 20, Math.max(0, ly - 40), 210, Math.min(179, ly + 40), 14, hex('#fff2e0'), 3);
  return { linea: ly };
};

// ─ taller (general): EL TALLER DE MADRID: la nave con lucernarios, la IMPRESORA de cama plana con su pórtico, los
// paneles impresos apoyados, los rollos, la fresadora y los operarios ─
// los tejados de Madrid por una ventana [x0, y0, x1, y1] (recortados al hueco): cielo, nubes, una grúa que gira, tejados de
// teja con chimeneas, una cúpula lejana y una paloma
function d_madrid(R, t, x0, y0, x1, y1, k) {
  R.recorte([x0, y0, x1, y1]);
  R.poligono([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], (x, y) => d_tono(d_rp('#8ec0e6', '#a8d0ee', '#c4e0f4', '#dcecf6'), (y - y0) / (y1 - y0) * 3.4, x, y));
  for (const [cx, cy, w, v] of [[20, 8, 22, 1.2], [60, 16, 16, 2]]) d_nube(R, x0 + ((cx + t * v + k * 30) % 80) - 20, y0 + cy, w, [hex('#c4d4e2'), hex('#e6eef6'), hex('#ffffff')]);
  // la cúpula lejana y la grúa (su pluma gira despacio)
  R.disco(x0 + 26 - k * 8, y0 + 30, 6, hex('#8aa0b4')); R.poligono([[x0 + 20 - k * 8, y0 + 30], [x0 + 32 - k * 8, y0 + 30], [x0 + 32 - k * 8, y0 + 40], [x0 + 20 - k * 8, y0 + 40]], hex('#9aaabb')); R.linea(x0 + 26 - k * 8, y0 + 22, x0 + 26 - k * 8, y0 + 24, hex('#8aa0b4'));
  if (k === 1) { const gx = x0 + 22, a = Math.sin(t * 0.25) * 14; R.linea(gx, y0 + 40, gx, y0 + 6, hex('#d8a030')); R.linea(gx + 1, y0 + 40, gx + 1, y0 + 6, hex('#a87820')); R.linea(gx - 8, y0 + 7, gx + Math.round(a), y0 + 7, hex('#d8a030')); R.linea(gx + Math.round(a) - 1, y0 + 8, gx + Math.round(a) - 1, y0 + 14, hex('#5a5a5a')); }
  // los tejados de teja árabe (rayas de canales), los muros encalados y las chimeneas
  for (const [a, b, alto, c] of [[-4, 18, 34, '#b8603a'], [14, 34, 28, '#a85232'], [28, 50, 36, '#c06e44']]) { const xa = x0 + a, xb = x0 + b, yt = y0 + alto;
    R.poligono([[xa, yt + 4], [xa + 4, yt], [xb - 4, yt], [xb, yt + 4], [xb, y1], [xa, y1]], (x, y) => y < yt + 6 ? ((x % 2 === 0) ? hex(c) : d_mez(hex(c), hex('#4a2010'), 0.3)) : d_tono(d_rp('#c8b8a0', '#e0d4bc', '#f0e8d8'), 1.2 + h(x >> 1, y >> 1, k) * 1.2, x, y));
    R.poligono([[xa + 3, yt + 10], [xa + 6, yt + 10], [xa + 6, yt + 14], [xa + 3, yt + 14]], hex('#3a4a5a'));
    R.poligono([[xb - 7, yt - 5], [xb - 4, yt - 5], [xb - 4, yt], [xb - 7, yt]], hex('#9a5a3a')); R.linea(xb - 8, yt - 6, xb - 3, yt - 6, hex('#5a3a2a')); }
  // la paloma que cruza
  const u = ((t * 0.12 + k * 0.5) % 1), px = Math.round(x0 - 6 + u * (x1 - x0 + 12)), py = Math.round(y0 + 18 + Math.sin(u * 9) * 3), al = Math.sin(t * 14) > 0;
  R.pset(px, py, hex('#5a6270')); R.pset(px + 1, py, hex('#5a6270')); R.pset(px - 1, py - (al ? 1 : -1), hex('#7a8290')); R.pset(px + 2, py - (al ? 1 : -1), hex('#7a8290'));
  R.recorte(null);
  // el marco de hierro con sus cuarterones y el alféizar
  for (let x = x0; x <= x1; x++) for (const y of [y0, Math.round((y0 + y1) / 2), y1]) R.pset(x, y, hex('#2a3038'));
  for (let y = y0; y <= y1; y++) for (const x of [x0, x0 + Math.round((x1 - x0) / 3), x0 + Math.round((x1 - x0) * 2 / 3), x1]) R.pset(x, y, hex('#2a3038'));
}
D_VISTAS['taller.general'] = (R, t, o) => {
  const imp = d_ac(o.imprime ?? 0.5), AL = D_AL;
  d_capa(R, 'taller', () => {
    // el techo: chapa ondulada oscura, las cerchas de hierro y los LUCERNARIOS (lejos del año y de Atom)
    for (let y = 0; y <= 24; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_tono(d_rp('#2c3036', '#33373e', '#3a3f46'), 1 + (x % 4 < 2 ? 0.5 : -0.3) + h(x >> 3, y >> 2, 40) * 0.4, x, y));
    for (let x = 186; x <= 262; x++) for (let y = 3; y <= 15; y++) R.pset(x, y, (x - 186) % 13 === 0 || y === 3 || y === 15 ? hex('#4a545e') : d_tono(d_rp('#9ab8cc', '#b8d2e2', '#d4e6f2'), 1 + (y - 3) / 12 + ((x + y) % 9 === 0 ? 0.8 : 0), x, y));
    R.rect(0, 22, 319, 24, hex('#24282e')); R.rect(0, 22, 319, 22, hex('#4a525c'));
    for (let x = 0; x < 320; x += 20) { R.linea(x, 22, x + 10, 10, hex('#454c56')); R.linea(x + 10, 10, x + 20, 22, hex('#454c56')); }
    R.rect(0, 9, 319, 10, hex('#3e444c'));
    // la pared de ladrillo encalado, con la cal saltada, las juntas y la mugre de abajo
    for (let y = 25; y < 141; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 25) / 5), junta = (y - 25) % 5 === 4 || (x + (fila % 2) * 6) % 12 === 0;
      const pelado = h(x >> 2, y >> 2, 41) > 0.9 && h(x >> 3, y >> 3, 42) > 0.5;
      R.pset(x, y, pelado ? (junta ? hex('#8a6048') : d_tono(d_rp('#9a5a3e', '#b4704c', '#c8845a'), 1 + h(x, y, 43), x, y)) : junta ? hex('#b4ad9e') : d_tono(d_rp('#a8a294', '#bfb8a8', '#d2ccbc', '#e2dccc'), 2.4 + h(x >> 1, y >> 1, 44) * 0.7 - Math.max(0, y - 110) / 26, x, y)); }
    // las ventanas altas con los tejados (se pintan en cada fotograma) y su alféizar; la estantería de botes
    for (const x0 of [22, 64]) { R.rect(x0 - 2, 86, x0 + 38, 88, hex('#c8c0b0')); R.rect(x0 - 2, 88, x0 + 38, 88, hex('#8a8476')); }
    R.rect(16, 99, 104, 100, hex('#6a4a2e')); R.rect(16, 99, 104, 99, hex('#9a7048')); for (const x of [20, 100]) R.linea(x, 101, x - 4, 105, hex('#3a3a40'));
    for (let i = 0; i < 12; i++) { const x = 18 + i * 7, c = ['#c8902c', '#b8382a', '#2c4ca8', '#3a8a5a', '#f0ece0', '#1c1410'][i % 6], al = 5 + (i % 3);
      R.rect(x, 99 - al, x + 4, 98, hex(c)); R.rect(x, 99 - al, x + 4, 99 - al, hex('#8a8e96')); R.rect(x + 4, 99 - al, x + 4, 98, d_mez(hex(c), hex('#000000'), 0.35)); if (i % 2) R.pset(x + 1, 100 - al, d_mez(hex(c), hex('#ffffff'), 0.3)); }
    // el panel de herramientas (rayas de espátulas, brochas y reglas) sobre un tablero perforado
    for (let y = 34; y < 82; y++) for (let x = 120; x < 176; x++) R.pset(x, y, (x % 4 === 0 && y % 4 === 0) ? hex('#6a5034') : d_tono(d_rp('#a0805a', '#b8966a', '#c8a678'), 1 + h(x >> 2, y >> 2, 45), x, y));
    for (let i = 0; i < 9; i++) { const x = 124 + i * 6, l = 10 + (i % 4) * 4, c = ['#5a5e66', '#8a6a3a', '#c8ccd2', '#3a3a40'][i % 4]; R.rect(x, 38, x + 1, 38 + l, hex(c)); R.rect(x - 1, 38 + l, x + 2, 41 + l, hex(i % 2 ? '#d8d0b8' : '#2a2a30')); }
    R.rect(122, 72, 174, 73, hex('#e8e0c8')); for (let x = 123; x < 174; x += 3) R.pset(x, 72, hex('#3a3a40'));
    // los pilares de hierro (perfiles en I con roblones)
    for (const x of [8, 110, 214]) { R.rect(x - 3, 22, x + 3, 141, hex('#36404c')); R.rect(x - 3, 22, x - 3, 141, hex('#6a7a8e')); R.rect(x - 1, 22, x + 1, 141, hex('#2a323c')); R.rect(x + 3, 22, x + 3, 141, hex('#1e242c'));
      for (let y = 30; y < 140; y += 9) R.pset(x - 2, y, hex('#8a9aae')); R.rect(x - 5, 138, x + 5, 141, hex('#2a323c')); }
    // los rollos de material (lienzo y película) de pie, con su espiral
    for (const [x, w, c] of [[188, 8, '#ece6d6'], [197, 7, '#d8dcd8'], [205, 6, '#e8dcc0']]) { for (let y = 98; y < 141; y++) for (let i = 0; i < w; i++) R.pset(x + i, y, d_tono(d_rp('#9a9488', '#c0baa8', hex(c) ? c : c, '#fafaf4'), 1 + Math.sin(i / w * Math.PI) * 2.2 - (i > w * 0.7 ? 0.8 : 0), x + i, y));
      R.rect(x, 97, x + w - 1, 98, hex('#fafaf4')); R.pset(x + (w >> 1), 97, hex('#6a6458')); }
    // los PANELES ya impresos, apoyados en la pared: trozos de la cámara pintada a tamaño real (con su canto y su sombra)
    for (const [x0, x1, y0, u0, v0, f] of [[226, 252, 64, 30, 34, 1.2], [256, 288, 58, 112, 30, 1.05], [292, 318, 70, 196, 40, 1.15]]) {
      d_muestra(R, u0, v0, f, x0, y0, x1, 139, 0.08); R.rect(x1 + 1, y0 + 1, x1 + 2, 140, hex('#4a3a28')); R.rect(x0, y0, x1, y0, hex('#f0dcb0')); R.rect(x0, 140, x1 + 3, 141, hex('#3a3430'));
      for (let y = y0; y < 140; y++) R.pset(x0, y, d_mez(R.pget(x0, y), hex('#ffffff'), 0.25)); }
    // la fresadora (para los relieves) a la izquierda, bajo la estantería: la caja, su ventanilla y el cabezal
    R.rect(14, 108, 58, 141, hex('#5a6a64')); R.rect(14, 108, 58, 108, hex('#8a9a94')); R.rect(58, 108, 58, 141, hex('#3a4642')); R.rect(18, 112, 46, 132, hex('#1e2a2e')); R.rect(18, 112, 46, 112, hex('#4a5a5e'));
    for (let x = 19; x < 46; x += 5) R.linea(x, 113, x + 4, 131, hex('#2a3a40')); R.rect(48, 114, 55, 130, hex('#3e4a48')); R.rect(49, 116, 54, 120, hex('#0e1a1e'));
    // el suelo de hormigón pulido: juntas en perspectiva, manchas de pintura y aceite, el paso marcado
    for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 120) / 59, xb = 160 + (x - 160) / z, jv = Math.abs(((xb + 2000) % 64) - 32) > 31, jh = y === 152 || y === 168;
      const mancha = h(x >> 3, y >> 2, 46) > 0.88 ? -0.9 : 0;
      R.pset(x, y, jv || jh ? hex('#6a665e') : d_tono(d_rp('#6e6a64', '#82807a', '#9a968e', '#b0aca4', '#c4c0b8'), 2 + h(x >> 2, y >> 1, 47) * 0.8 + mancha + (y - 141) / 60, x, y)); }
    for (let i = 0; i < 40; i++) R.pset(Math.round(h(i, 1, 48) * 320), 142 + Math.round(h(i, 2, 48) * 37), hex(['#c8902c', '#b8382a', '#2c4ca8', '#3a8a5a'][i % 4]));
    for (let x = 0; x < 320; x++) if ((x >> 3) % 2 === 0) R.rect(x, 172, x, 173, hex('#c8a838'));
    R.rect(0, 141, 319, 141, hex('#4a4640'));
    // LA IMPRESORA: las patas, la cama perforada vista desde arriba, el frontal blanco con rejillas, el armario de control
    for (const x of [72, 118, 192, 238]) { R.rect(x, 134, x + 3, 158, hex('#2a2e34')); R.rect(x, 134, x, 158, hex('#4e545c')); R.rect(x - 2, 158, x + 5, 160, hex('#16161a')); }
    R.rect(72, 148, 241, 149, hex('#3a3e46'));
    for (let y = 100; y <= 123; y++) for (let x = 66; x <= 246; x++) R.pset(x, y, (x % 3 === 0 && y % 3 === 0) ? hex('#2a2e34') : d_tono(d_rp('#3e424a', '#4a4e56', '#565a62'), 1 + h(x >> 2, y >> 2, 49) * 0.6, x, y));
    R.rect(66, 98, 246, 99, AL[3]); R.rect(66, 98, 246, 98, AL[5]); R.rect(66, 123, 246, 123, AL[4]);
    for (let x = 66; x < 246; x += 4) { R.rect(x, 95, x + 2, 97, hex('#1c1c22')); R.pset(x, 95, hex('#4a4a52')); }
    for (let y = 124; y <= 134; y++) for (let x = 64; x <= 248; x++) R.pset(x, y, d_tono(d_rp('#9aa0a8', '#c0c6cc', '#d8dde2', '#eceff2'), 2.4 - (y - 124) * 0.14 + h(x >> 3, y, 50) * 0.3, x, y));
    R.rect(64, 124, 248, 124, hex('#f8fafc')); R.rect(64, 134, 248, 134, hex('#5a6068'));
    for (const x0 of [90, 150, 210]) for (let x = x0; x < x0 + 20; x += 2) R.rect(x, 127, x, 131, hex('#7a8088'));
    R.rect(64, 130, 248, 130, hex('#3a6a9a'));
    R.rect(248, 86, 266, 158, hex('#d4d8dc')); R.rect(248, 86, 266, 86, hex('#f2f4f6')); R.rect(264, 87, 266, 158, hex('#9aa0a8')); R.rect(248, 158, 266, 159, hex('#2a2e34'));
    R.rect(250, 92, 262, 104, hex('#1a1e24')); R.disco(256, 112, 4, hex('#e8c030')); R.disco(256, 112, 3, hex('#c82a1a')); R.pset(255, 111, hex('#ff7a5a')); R.pset(252, 120, hex('#3aaa5a')); R.pset(256, 120, hex('#d8a030')); R.pset(260, 120, hex('#d8d8dc'));
    for (let y = 24; y < 86; y++) { R.pset(257, y, hex('#1a1c22')); if (y % 12 === 0) R.rect(255, y, 259, y, hex('#5a626e')); }
  });
  // las ventanas (el cielo, la grúa, la paloma)
  d_madrid(R, t, 22, 34, 58, 84, 0); d_madrid(R, t, 64, 34, 100, 84, 1);
  // el extractor que gira y el reloj de pared (con sus agujas)
  { const cx = 186, cy = 52; R.disco(cx, cy, 10, hex('#2a2e34')); R.disco(cx, cy, 9, hex('#3e444c')); for (let a = 0; a < 4; a++) { const an = t * 5 + a * Math.PI / 2; R.linea(cx, cy, Math.round(cx + Math.cos(an) * 8), Math.round(cy + Math.sin(an) * 8), hex('#8a929e')); R.linea(cx, cy, Math.round(cx + Math.cos(an + 0.3) * 7), Math.round(cy + Math.sin(an + 0.3) * 7), hex('#6a727e')); }
    R.anillo(cx, cy, 9, hex('#1a1c20')); for (let j = -8; j <= 8; j += 3) R.linea(cx - 8, cy + j, cx + 8, cy + j, hex('#2a2e34')); R.disco(cx, cy, 1.5, hex('#c8ccd2')); }
  { const cx = 238, cy = 40; R.disco(cx, cy, 7, hex('#2a2a30')); R.disco(cx, cy, 6, hex('#f4f0e4')); for (let i = 0; i < 12; i++) R.pset(Math.round(cx + Math.cos(i * Math.PI / 6) * 5), Math.round(cy + Math.sin(i * Math.PI / 6) * 5), hex('#5a5a60'));
    const m = t * 0.4, s = t * Math.PI / 30 * 6; R.linea(cx, cy, Math.round(cx + Math.cos(m - Math.PI / 2) * 3), Math.round(cy + Math.sin(m - Math.PI / 2) * 3), hex('#1a1a20')); R.linea(cx, cy, Math.round(cx + Math.cos(s) * 4), Math.round(cy + Math.sin(s) * 4), hex('#c82a1a')); }
  // los operarios de bata (pequeños, al fondo): uno en la fresadora y otro que retoca un panel con el pincel
  d_figurita(R, 64, 141, t, { dir: -1, brazo: 0.6, k: 1, pelo: '#5a3a24', pantalon: '#3a3e48' });
  d_figurita(R, 272, 142, t, { dir: 1, brazo: 0.9, k: 2, pelo: '#1a1a1e', piel: '#b07a50', pantalon: '#2a3a5a' });
  R.pset(276, 128 + Math.round(Math.sin(t * 7 + 2) * 0.9), hex('#b8382a'));
  // las chispitas de la fresadora y su piloto
  if (Math.sin(t * 11) > 0.2) for (let i = 0; i < 3; i++) R.pset(30 + Math.round(h(i, Math.floor(t * 12), 51) * 10), 124 + Math.round(h(i, Math.floor(t * 12), 52) * 6), hex('#fff0a0'));
  R.pset(52, 118, Math.sin(t * 3) > 0 ? hex('#5aff8a') : hex('#1a4a2a'));
  // EL PANEL que se imprime: la plancha en blanco (yeso) y lo ya impreso (la pared tumbada, vista desde arriba)
  const px = Math.round(lerp(80, 238, imp));
  for (let y = 102; y <= 121; y++) for (let x = 72; x <= 240; x++) R.pset(x, y, d_tono(d_rp('#c8c4b8', '#dcd8cc', '#ece8dc', '#f8f6ee'), 1.8 + h(x >> 1, y, 53) * 0.8 + (y === 102 ? 1 : 0), x, y));
  d_muestraXY(R, 26, 26, 1.0, 6.1, 72, 102, px, 121);
  R.rect(72, 122, 240, 122, hex('#8a8478')); R.rect(72, 101, 240, 101, hex('#fafaf4'));
  // EL PÓRTICO que va y viene sobre la cama, con el cabezal que corre a lo hondo y su luz ultravioleta
  const gx = Math.round(72 + (px + 6 - 72) * d_vaiven(t * 0.3)), hd = d_vaiven(t * 1.1), hyb = Math.round(lerp(98, 78, hd));
  R.poligono([[gx - 4, hyb + 24], [gx + 10, hyb + 24], [gx + 14, hyb + 28], [gx - 2, hyb + 28]], (x, y) => d_mez(R.pget(x, y), hex('#8a5aff'), 0.45));
  R.rect(gx - 3, 101, gx + 2, 124, AL[3]); R.rect(gx - 3, 101, gx - 3, 124, AL[5]); R.rect(gx + 2, 101, gx + 2, 124, AL[1]);
  R.rect(gx + 2, 76, gx + 6, 99, AL[2]); R.rect(gx + 6, 76, gx + 6, 99, AL[0]);
  R.rect(gx - 4, 74, gx + 8, 101, AL[3]); R.rect(gx - 4, 74, gx + 8, 74, AL[5]); R.rect(gx - 4, 74, gx - 4, 101, AL[4]); R.rect(gx + 8, 74, gx + 8, 101, AL[0]); for (let y = 78; y < 100; y += 4) R.pset(gx + 2, y, AL[1]);
  R.rect(gx - 6, hyb - 4, gx + 10, hyb + 4, hex('#2a2e36')); R.rect(gx - 6, hyb - 4, gx + 10, hyb - 4, hex('#6a727e'));
  R.rect(gx - 6, hyb + 1, gx - 4, hyb + 3, Math.sin(t * 20) > 0 ? hex('#c8a8ff') : hex('#8a5aff')); R.rect(gx + 8, hyb + 1, gx + 10, hyb + 3, Math.sin(t * 20 + 1) > 0 ? hex('#c8a8ff') : hex('#8a5aff'));
  R.halo(gx + 2, hyb + 24, 9, [hex('#6a4ad8'), hex('#a88aff')], 0.7);
  // la pantalla del armario: la barra de lo impreso y la rejilla de capas
  R.rect(251, 93, 261, 103, hex('#0e1a24')); R.rect(252, 101, 252 + Math.round(imp * 8), 102, hex('#5ad8ff')); for (let i = 0; i < 4; i++) R.rect(252 + i * 2, 95 + (i % 2), 252 + i * 2, 99, (Math.floor(t * 3) + i) % 4 === 0 ? hex('#8affc8') : hex('#2a5a6a'));
  // la luz de los lucernarios: dos haces tramados que bajan hasta el suelo, con motas
  R.poligono([[188, 24], [262, 24], [226, 176], [146, 176]], (x, y) => ((x + y) % 2 === 0 ? d_mez(R.pget(x, y), hex('#fff8e8'), 0.12) : R.pget(x, y)));
  d_motas(R, t, 160, 30, 240, 160, 16, hex('#fff6dc'), 4);
  return { impreso: px, portico: [gx + 2, hyb] };
};

// copia un trozo de la pared con escalas distintas en x y en y (el panel tumbado, visto desde arriba)
function d_muestraXY(R, u0, v0, fx, fy, x0, y0, x1, y1) {
  const src = d_pared(R);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++)
    R.pset(x, y, src[Math.max(0, Math.min(179, Math.round(v0 + (y - y0) * fy))) * 320 + Math.max(0, Math.min(319, Math.round(u0 + (x - x0) * fx)))]);
}
// taller (general), lo de delante: la mesa de trabajo de la derecha (brochas en un bote, botes de pigmento, una
// muestra pintada, trapos y la lámpara-lupa de brazo)
D_DELANTE['taller.general'] = (R, t, o) => {
  const MD = d_rp('#3a2616', '#5a3e24', '#7a5634', '#9a7044', '#b88a58');
  R.rect(252, 153, 255, 179, MD[1]); R.rect(312, 153, 315, 179, MD[1]); R.rect(252, 153, 252, 179, MD[3]);
  R.rect(256, 168, 312, 170, MD[1]); R.rect(260, 160, 272, 167, hex('#5a6a7a')); R.rect(260, 160, 272, 160, hex('#8a9aaa')); R.rect(278, 162, 290, 167, hex('#c8c0a8'));
  for (let x = 248; x <= 319; x++) for (let y = 147; y <= 152; y++) R.pset(x, y, y === 147 ? MD[4] : y === 152 ? MD[0] : d_tono(MD, 2.2 + Math.sin(x * 0.35 + y) * 0.4 + h(x >> 2, y, 54) * 0.5, x, y));
  // el bote con brochas, los botes de pigmento, la muestra pintada (un trozo de la cenefa) y un trapo
  R.rect(256, 139, 262, 146, hex('#8a8e96')); R.rect(256, 139, 262, 139, hex('#c8ccd2')); for (let i = 0; i < 4; i++) { R.linea(257 + i * 2, 138, 255 + i * 3, 128 + (i % 2) * 2, hex('#8a6a3a')); R.pset(255 + i * 3, 127 + (i % 2) * 2, hex(['#c8902c', '#b8382a', '#2c4ca8', '#3a8a5a'][i])); }
  for (const [x, c] of [[266, '#c8902c'], [273, '#2c4ca8'], [280, '#b8382a']]) { R.rect(x, 142, x + 5, 146, hex(c)); R.rect(x, 141, x + 5, 141, hex('#e8e8ec')); R.rect(x + 5, 142, x + 5, 146, d_mez(hex(c), hex('#000000'), 0.35)); }
  d_muestra(R, 60, 27, 0.6, 288, 140, 304, 146); R.rect(288, 139, 304, 139, hex('#f4ead0'));
  R.poligono([[306, 146], [314, 143], [318, 146], [312, 147]], hex('#d8c8b0')); R.linea(307, 145, 313, 144, hex('#b8a890'));
  // la lámpara-lupa de brazo articulado
  R.linea(316, 146, 310, 124, hex('#3a3e46')); R.linea(310, 124, 296, 116, hex('#3a3e46')); R.disco(310, 124, 1.5, hex('#8a929e'));
  R.disco(292, 116, 6, hex('#2a2e34')); R.disco(292, 116, 4, hex('#c8e4f4')); R.pset(290, 114, hex('#ffffff'));
  return { mesa: [248, 147, 319, 179] };
};

// ─ taller (impresora): el cabezal de cerca depositando capas, el relieve que sube y el color al final; la lupa ─
D_VISTAS['taller.impresora'] = (R, t, o) => {
  const cap = d_ac(o.capas ?? 0.5), AL = D_AL;
  const dentro = (x, y) => { const u = (y - 88) / 76; return x >= Math.round(lerp(36, 16, u)) && x <= Math.round(lerp(284, 304, u)); };
  d_capa(R, 'impresora', () => {
    // el fondo de la nave, desenfocado (luces lejanas como manchas blandas) y la cama perforada
    for (let y = 0; y < 44; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_tono(d_rp('#1a1d22', '#20242a', '#262a31', '#2c3138'), 1.4 + h(x >> 4, y >> 3, 60) * 0.8 - y / 60, x, y));
    for (const [x, y, r] of [[40, 18, 9], [120, 12, 7], [196, 22, 10], [250, 10, 6]]) R.disco(x, y, r, (px, py) => d_mez(R.pget(px, py), hex('#5a5e58'), 0.35));
    for (let y = 44; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 4 === 0 && y % 4 === 0) ? hex('#1e2026') : d_tono(d_rp('#30343b', '#3a3e46', '#454a52'), 1 + h(x >> 3, y >> 3, 61) * 0.6 + (y - 44) / 200, x, y));
    // el canto de la plancha (las capas se ven aquí) y la sombra que hace sobre la cama
    for (let x = 16; x <= 304; x++) { R.pset(x + 2, 175, hex('#1a1c20')); R.pset(x + 2, 176, hex('#1a1c20')); }
    // la viga del pórtico (perfil de aluminio con su guía) que cruza arriba y la cadena portacables
    for (let y = 46; y <= 60; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 46 ? AL[5] : y === 60 ? AL[0] : y === 52 || y === 53 ? AL[1] : d_tono(AL, 3 - (y - 46) * 0.12 + (x % 40 === 0 ? -1 : 0), x, y));
    R.rect(0, 56, 319, 57, AL[5]); R.rect(0, 58, 319, 58, AL[2]);
    for (let x = 0; x < 320; x++) R.pset(x, 62, d_mez(R.pget(x, 62), hex('#000000'), 0.5));
  });
  // LA PLANCHA: del yeso blanco (capas 0) al relieve gris que sube (hasta 0.72) y al COLOR que llega al final
  const rel = d_relieve(R, 'impresora', 16, 88, 304, 164, () => { R.rect(0, 0, 319, 179, hex('#e0a848')); d_muestraXY(R, 40, 46, 0.42, 1.1, 16, 88, 304, 164); });
  const e = Math.min(1, cap / 0.72), cf = d_ac((cap - 0.72) / 0.28), B = R.usar(null); R.usar(B);
  for (let j = 0; j < rel.H; j++) { const y = rel.Y0 + j;
    for (let i = 0; i < rel.W; i++) { const x = rel.X0 + i; if (!dentro(x, y)) continue; const k = j * rel.W + i;
      const g = 0.86 + h(x, y, 62) * 0.04 + (rel.gR[k] * 0.9 + 0.12 - 0.86) * e - (j / rel.H) * 0.06;
      B[y * 320 + x] = cf > 0 && d_d(x, y) < cf ? rel.b[y * 320 + x] : d_tono(D_GRIS, g * 9, x, y); } }
  // el canto: las capas apiladas (crecen con o.capas) sobre el soporte
  const n = Math.round(cap * 9);
  for (let x = 16; x <= 304; x++) for (let y = 165; y <= 174; y++) { const capa = 174 - y; R.pset(x, y, capa < n ? (capa % 2 ? hex('#e8e4da') : hex('#cac6bc')) : capa === n ? hex('#f8f6f0') : d_tono(d_rp('#5a5448', '#6e6858', '#827a68'), 1 + h(x >> 2, y, 63), x, y)); }
  for (let y = 165; y <= 174; y++) { R.pset(16, y, hex('#2a2620')); R.pset(304, y, hex('#2a2620')); }
  // EL CABEZAL que corre por la viga: las lámparas ultravioleta, la placa de boquillas y las gotitas que caen
  const hx = Math.round(18 + 222 * d_vaiven(t * 0.22)), cy = 90;
  for (let x = Math.max(0, hx - 8); x < hx + 72; x++) for (let y = 40; y <= 44; y++) R.pset(x, y, (x % 3 === 0) ? hex('#1c1c22') : hex('#3a3a42'));
  R.disco(hx + 32, cy + 16, 1, hex('#000000'));
  for (let j = -8; j <= 8; j++) for (let i = -44; i <= 44; i++) { const d = (i * i) / 1936 + (j * j) / 64; if (d > 1) continue; const x = hx + 32 + i, y = cy + 14 + j; if (!dentro(x, y)) continue; if ((x + y) % 2 === 0 || d < 0.4) R.pset(x, y, d_mez(R.pget(x, y), hex('#9a6aff'), 0.4 * (1 - d))); }
  R.rect(hx, 50, hx + 64, 88, hex('#2c3038')); R.rect(hx, 50, hx + 64, 50, hex('#6e7682')); R.rect(hx, 50, hx, 88, hex('#545c68')); R.rect(hx + 64, 50, hx + 64, 88, hex('#16181c'));
  for (let y = 56; y < 70; y += 3) R.rect(hx + 14, y, hx + 50, y, hex('#1e2026'));
  for (const [x, c] of [[hx + 18, '#b8382a'], [hx + 24, '#2c4ca8'], [hx + 30, '#e0b040'], [hx + 36, '#f0f0ec'], [hx + 42, '#1c1410']]) { R.rect(x, 73, x + 3, 79, hex(c)); R.pset(x, 73, d_mez(hex(c), hex('#ffffff'), 0.4)); }
  const uv = Math.sin(t * 18) > -0.3;
  for (const x of [hx + 2, hx + 54]) { R.rect(x, 78, x + 8, 87, hex('#1a1424')); R.rect(x + 1, 84, x + 7, 87, uv ? hex('#c8a8ff') : hex('#7a4ad8')); }
  R.rect(hx + 12, 88, hx + 52, 90, hex('#121418')); for (let x = hx + 14; x < hx + 51; x += 3) R.pset(x, 90, hex('#5a626e'));
  for (let k = 0; k < 7; k++) { const x = hx + 15 + k * 6, y = 92 + Math.floor((t * 50 + k * 13) % 12); R.pset(x, y, k % 2 ? hex('#ffffff') : hex('#d8ecff')); }
  // LA LUPA del operario sobre el relieve (la mano canónica entra por la derecha y sujeta el mango)
  const lx = 252 + Math.round(Math.sin(t * 0.7) * 6), ly = 136 + Math.round(Math.cos(t * 0.5) * 3);
  R.disco(lx, ly, 11, (x, y) => d_mez(R.pget(x, y), hex('#e8f4ff'), 0.22)); R.anillo(lx, ly, 11, hex('#1a1a20')); R.anillo(lx, ly, 12, hex('#3a3a42'));
  R.linea(lx - 6, ly - 7, lx - 2, ly - 9, hex('#ffffff')); R.pset(lx - 7, ly - 5, hex('#ffffff'));
  R.linea(lx + 9, ly + 8, lx + 22, ly + 17, hex('#3a2416')); R.linea(lx + 9, ly + 9, lx + 22, ly + 18, hex('#6a4426')); R.linea(lx + 10, ly + 10, lx + 22, ly + 19, hex('#3a2416'));
  brazo(R, 340, 206, lx + 26, ly + 18, '#e6eaee', -1, { codo: [334, 186] });
  return { cabezal: [hx + 32, 90], lupa: [lx, ly] };
};

// ─ replica (general): LA CASA DE CARTER en su loma y, al lado, el pabellón bajo de la réplica, el aparcamiento y el
// autobús ─
let d_cieloRep = null;
D_VISTAS['replica.general'] = (R, t, o) => {
  d_capa(R, 'replica', () => {
    // el cielo tramado (del azul al blanco calizo del horizonte) y el sol
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_tono(d_rp('#5c9cd4', '#76b0de', '#92c2e6', '#aed2ec', '#c8e0ee', '#e2ecee', '#f2ece0'), y / 100 * 6.2 + h(x >> 3, y >> 2, 70) * 0.3, x, y));
    R.disco(222, 30, 10, (x, y) => (x + y) % 2 === 0 ? hex('#fff6dc') : R.pget(x, y)); R.disco(222, 30, 7, hex('#fffaf0'));
    // los acantilados lejanos del valle (bruma rosa) con el pico de pirámide a la izquierda
    const lejos = (x) => 62 + Math.round(Math.sin(x * 0.045) * 4 + Math.sin(x * 0.13) * 2 + (h(x >> 4, 1, 71) > 0.6 ? -3 : 0));
    for (let x = 0; x < 320; x++) { const pico = 42 + Math.abs(x - 64) * 0.75, top = Math.min(lejos(x), Math.round(pico));
      for (let y = top; y < 112; y++) R.pset(x, y, d_tono(d_rp('#c09a8a', '#d0ac98', '#dcbca4', '#e6c8ac'), 2.2 + h(x >> 2, y >> 3, 72) * 0.8 - (y - top) * 0.02 + ((y - top) % 9 === 0 ? -0.8 : 0) + (x > 64 && x < 100 && y > top + 2 ? -0.6 : 0), x, y)); }
    // los acantilados de en medio (ocre, escalonados, con barrancos en sombra y conos de escombro claro)
    for (let x = 140; x < 320; x++) { const top = 78 + Math.round(Math.sin(x * 0.06) * 5 + ((x >> 4) % 3) * 2);
      for (let y = top; y < 118; y++) { const barranco = Math.abs(Math.sin(x * 0.11 + y * 0.02)) < 0.12; R.pset(x, y, d_tono(d_rp('#9a7048', '#b88a5c', '#d0a470', '#e4bc86', '#f0d0a0'), 2.6 + h(x >> 2, y >> 2, 73) * 0.8 - (barranco ? 1.4 : 0) + ((y - top) % 7 === 0 ? -0.6 : 0) - (y - top) * 0.012, x, y)); }
      R.pset(x, top, hex('#f4dcb0')); }
    for (const [cx, w] of [[176, 14], [268, 18]]) for (let y = 104; y < 118; y++) for (let x = cx - w; x <= cx + w; x++) if (Math.abs(x - cx) < (y - 100) * w / 16) R.pset(x, y, d_tono(d_rp('#d8c4a0', '#e8d6b4', '#f4e6cc'), 1 + h(x, y, 74), x, y));
    // la llanura de arena con piedras y matas
    for (let y = 110; y < 152; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_tono(d_rp('#c4a06c', '#d4b07c', '#e2c290', '#ecd2a4'), 1.8 + h(x >> 1, y >> 1, 75) * 0.9 + (y - 110) / 60, x, y));
    for (let i = 0; i < 60; i++) { const x = Math.round(h(i, 1, 76) * 320), y = 112 + Math.round(h(i, 2, 76) * 38); R.pset(x, y, hex('#8a6a48')); R.pset(x + 1, y, hex('#f4e0bc')); }
    for (let i = 0; i < 10; i++) { const x = Math.round(h(i, 3, 76) * 320), y = 120 + Math.round(h(i, 4, 76) * 26); R.disco(x, y, 2, hex('#7a8a4a')); R.pset(x - 1, y - 1, hex('#9aaa5a')); }
    // LA LOMA con el sendero que sube en zigzag
    R.poligono([[0, 152], [0, 102], [14, 96], [34, 93], [136, 93], [152, 98], [176, 120], [196, 152]], (x, y) => d_tono(d_rp('#a07a52', '#b88e62', '#ccA274', '#dcb486', '#e8c69a'), 2.4 + h(x >> 2, y >> 2, 77) * 0.9 - Math.max(0, x - 140) * 0.02 + (h(x, y, 78) > 0.93 ? -1 : 0), x, y));
    for (const [a, b] of [[[150, 150], [120, 126]], [[120, 126], [150, 110]], [[150, 110], [118, 96]]]) { R.linea(a[0], a[1], b[0], b[1], hex('#f0dcb4')); R.linea(a[0], a[1] + 1, b[0], b[1] + 1, hex('#c8a47a')); }
    // el filo de la loma (luz arriba), su ladera de la derecha en sombra, piedras y matas secas

    for (const [a, b] of [[[0, 102], [14, 96]], [[14, 96], [34, 93]], [[136, 93], [152, 98]], [[152, 98], [176, 120]], [[176, 120], [196, 152]]]) { R.linea(a[0], a[1], b[0], b[1], hex('#f4dcb0')); R.linea(a[0], a[1] + 1, b[0], b[1] + 1, hex('#8a6440')); }
    R.poligono([[150, 100], [176, 121], [195, 151], [160, 151], [148, 120]], (x, y) => (x + y) % 2 ? d_mez(R.pget(x, y), hex('#5a3a22'), 0.35) : R.pget(x, y));
    for (let i = 0; i < 26; i++) { const x = 6 + Math.round(h(i, 1, 89) * 170), y = 100 + Math.round(h(i, 2, 89) * 48); if (y < 96 + Math.max(0, x - 150) * 0.9) continue;
      if (i % 3) { R.rect(x, y, x + 2, y + 1, hex('#7a5a3a')); R.pset(x, y, hex('#f0d4a8')); } else { R.pset(x, y, hex('#6a7a3a')); R.pset(x + 1, y - 1, hex('#8a9a4a')); R.pset(x - 1, y - 1, hex('#8a9a4a')); } }
    // la sombra de la casa sobre la loma
    for (let x = 44; x < 150; x++) for (let y = 94; y < 98; y++) if ((x + y) % 2) R.pset(x, y, d_mez(R.pget(x, y), hex('#4a2a14'), 0.3));
    // LA CASA DE CARTER: adobe encalado de ocre, cúpula con su tambor, galería de arcos, contraventanas y la tapia
    const AD = d_rp('#9a7452', '#b88e68', '#d0a880', '#e2c09a', '#f0d6b4');
    for (let y = 72; y <= 93; y++) for (let x = 42; x <= 126; x++) R.pset(x, y, d_tono(AD, 3 - (x > 112 ? 1.2 : 0) + h(x >> 1, y >> 1, 79) * 0.6 - (h(x, y, 80) > 0.96 ? 1 : 0), x, y));
    R.rect(40, 70, 128, 71, AD[4]); R.rect(40, 72, 128, 72, AD[1]);
    for (let y = 80; y <= 93; y++) for (let x = 126; x <= 146; x++) R.pset(x, y, d_tono(AD, 2.2 + h(x >> 1, y >> 1, 81) * 0.6, x, y)); R.rect(125, 78, 147, 79, AD[4]);
    R.rect(56, 64, 84, 71, AD[2]); R.rect(56, 64, 84, 64, AD[4]);
    for (let j = 0; j <= 13; j++) { const w = Math.round(Math.sqrt(169 - j * j)); for (let x = 70 - w; x <= 70 + w; x++) R.pset(x, 64 - j, d_tono(AD, 3.6 - (x - 70) / 6 + h(x, j, 82) * 0.4, x, 64 - j)); }
    R.rect(69, 48, 71, 51, AD[1]); R.pset(70, 47, AD[3]);
    for (let i = 0; i < 4; i++) { const x0 = 84 + i * 10; R.rect(x0, 82, x0 + 7, 93, hex('#4a3020')); R.disco(x0 + 3.5, 82, 3.5, hex('#4a3020')); R.rect(x0, 82, x0 + 7, 93, hex('#4a3020')); R.rect(x0 + 1, 88, x0 + 6, 93, hex('#6a4a30')); R.rect(x0 + 8, 78, x0 + 9, 93, AD[4]); }
    for (const x of [48, 60, 132, 140]) { R.rect(x, 76, x + 4, 82, hex('#2a3a3a')); R.rect(x - 1, 76, x - 1, 82, hex('#4a8a86')); R.rect(x + 5, 76, x + 5, 82, hex('#4a8a86')); }
    R.rect(30, 93, 156, 95, AD[2]); R.rect(30, 93, 156, 93, AD[4]);
    for (let i = 0; i < 24; i++) R.pset(32 + Math.round(h(i, 5, 83) * 120), 91 + Math.round(h(i, 6, 83) * 2), hex(i % 3 ? '#d84a8a' : '#3a7a3a'));
    // EL PABELLÓN DE LA RÉPLICA: piedra clara medio enterrada, la losa del tejado que vuela, la rampa que baja y su puerta
    const PI = d_rp('#a89c84', '#c4b89e', '#dcd0b6', '#ece2cc', '#f8f0e0');
    for (let y = 120; y <= 146; y++) for (let x = 178; x <= 262; x++) { const junta = (y - 120) % 6 === 5 || (x + Math.floor((y - 120) / 6) * 9) % 18 === 0; R.pset(x, y, junta ? PI[0] : d_tono(PI, 2.6 + h(x >> 1, y >> 1, 84) * 0.6 - (x > 250 ? 0.8 : 0), x, y)); }
    R.rect(174, 115, 266, 119, PI[4]); R.rect(174, 115, 266, 115, hex('#ffffff')); R.rect(174, 119, 266, 119, PI[1]); for (let x = 178; x < 263; x++) R.pset(x, 120, PI[0]);
    for (const x of [192, 208, 224]) { R.rect(x, 126, x + 6, 129, hex('#5a5448')); R.rect(x, 126, x + 6, 126, PI[0]); }
    // la rampa: el muro bajo de delante tapa casi todo el suelo de la rampa; al fondo, la puerta en sombra
    R.rect(238, 128, 256, 146, hex('#2a2018')); R.rect(238, 128, 256, 128, PI[0]); R.rect(240, 140, 254, 146, hex('#4a3a2a'));
    R.rect(236, 126, 237, 146, PI[3]); R.rect(257, 126, 258, 146, PI[1]);
    // el aparcamiento: asfalto con las rayas blancas, manchas de aceite y el bordillo de piedra
    for (let y = 147; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_tono(d_rp('#6e6a64', '#7e7a72', '#8e8a82', '#9e9a90'), 1.8 + h(x >> 1, y >> 1, 85) * 0.7 + (y - 147) / 50 - (h(x >> 3, y >> 2, 86) > 0.9 ? 1 : 0), x, y));
    for (let i = 0; i < 9; i++) { const x = 20 + i * 34; R.linea(x, 178, x + 12, 152, hex('#e8e4d8')); }
    R.rect(0, 147, 319, 147, hex('#d8ccb0')); R.rect(0, 148, 319, 148, hex('#8a8070'));
    for (let x = 174; x < 262; x++) for (let y = 146; y <= 151; y++) R.pset(x, y, y === 146 ? PI[4] : d_tono(PI, 2 + h(x >> 1, y, 87) * 0.6, x, y));
    R.linea(176, 140, 236, 146, hex('#8a929e')); for (const x of [180, 200, 220]) R.linea(x, 141 + Math.round((x - 176) / 10), x, 146, hex('#6a727e'));
    // el autobús de turistas aparcado a la derecha (sin letras: una franja turquesa inventada), con su sombra
    for (let x = 252; x < 320; x++) R.pset(x, 163, hex('#3a3834'));
    R.rect(254, 128, 319, 160, hex('#efeae0')); R.rect(254, 128, 319, 128, hex('#ffffff')); R.rect(254, 160, 319, 160, hex('#8a8478'));
    R.rect(256, 125, 300, 127, hex('#c8ccd0')); R.rect(256, 125, 300, 125, hex('#e8ecef'));
    for (let x = 262; x < 318; x += 11) { R.rect(x, 132, x + 9, 142, hex('#24405a')); R.linea(x + 1, 141, x + 6, 133, hex('#4a7090')); R.pset(x + 8, 133, hex('#8ab0cc')); }
    R.rect(254, 132, 260, 146, hex('#2a4a66')); R.linea(255, 145, 259, 134, hex('#6a90b0')); R.rect(252, 136, 253, 140, hex('#2a2a2e'));
    R.rect(254, 146, 319, 149, hex('#2a8a9a')); R.rect(254, 150, 319, 150, hex('#1a5a6a'));
    R.rect(264, 146, 270, 158, hex('#3a3e44')); R.rect(255, 154, 258, 156, hex('#ffe8a0'));
    for (const x of [270, 306]) { R.disco(x, 160, 5, hex('#1a1a1e')); R.disco(x, 160, 2.5, hex('#9aa0a8')); R.pset(x, 160, hex('#3a3a40')); }
    // el aparcamiento con su vida: grietas, una tapa de registro, el bordillo de grava y un coche pequeño aparcado
    for (let i = 0; i < 8; i++) { let x = 10 + h(i, 1, 94) * 230, y = 152 + h(i, 2, 94) * 24; for (let j = 0; j < 8; j++) { R.pset(Math.round(x), Math.round(y), hex('#5a5650')); x += h(i, j, 95) * 2 - 0.6; y += h(i, j, 96) - 0.5; } }
    R.disco(128, 172, 4, hex('#4a4640')); R.anillo(128, 172, 4, hex('#3a3632')); for (let j = -2; j <= 2; j += 2) R.linea(125, 172 + j, 131, 172 + j, hex('#5e5a52'));
    for (let x = 0; x < 320; x++) if (h(x, 3, 97) > 0.6) R.pset(x, 149, hex(h(x, 4, 97) > 0.5 ? '#c8b894' : '#9a8a6a'));
    { const x0 = 2, y0 = 148; for (let x = x0; x < x0 + 38; x++) R.pset(x, y0 + 14, hex('#3a3834'));
      R.rect(x0, y0 + 4, x0 + 36, y0 + 12, hex('#b8d0dc')); R.rect(x0, y0 + 4, x0 + 36, y0 + 4, hex('#e4f0f4')); R.rect(x0 + 6, y0 - 2, x0 + 26, y0 + 4, hex('#a4bccc'));
      R.rect(x0 + 8, y0 - 1, x0 + 15, y0 + 3, hex('#2a4058')); R.rect(x0 + 17, y0 - 1, x0 + 24, y0 + 3, hex('#2a4058')); R.pset(x0 + 9, y0, hex('#8ab0cc')); R.rect(x0, y0 + 8, x0 + 36, y0 + 8, hex('#7a98a8'));
      for (const dx of [7, 29]) { R.disco(x0 + dx, y0 + 12, 3, hex('#1a1a1e')); R.pset(x0 + dx, y0 + 12, hex('#9aa0a8')); } R.rect(x0 + 35, y0 + 6, x0 + 36, y0 + 7, hex('#ffd890')); }
    // el quiosco de recuerdos al pie de la loma (estantes con figuritas de colores y botellas de agua)
    R.rect(146, 128, 174, 148, hex('#8a6a48')); R.rect(146, 128, 174, 128, hex('#b08a60')); R.rect(148, 132, 172, 140, hex('#3a2a1e'));
    for (let i = 0; i < 8; i++) { R.rect(149 + i * 3, 135, 150 + i * 3, 139, hex(['#e0b040', '#2c6ac8', '#3ab0a8', '#e0b040', '#c84a3a', '#f0f0ec', '#3ab0a8', '#e0b040'][i])); }
    R.rect(146, 141, 174, 142, hex('#c8a070')); for (let i = 0; i < 5; i++) { R.rect(149 + i * 5, 143, 151 + i * 5, 147, hex('#bcdcec')); R.pset(150 + i * 5, 142, hex('#2a6aa8')); }
    for (const x of [146, 174]) R.rect(x, 120, x, 148, hex('#5a4030'));
  });
  if (!d_cieloRep) { d_cieloRep = new Uint8Array(320 * 180); const b = d_capas.get('replica'); for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const p = b[y * 320 + x]; d_cieloRep[y * 320 + x] = ((p >> 16) & 255) > (p & 255) + 8 ? 1 : 0; } }
  // las nubes de tres tonos a tres velocidades y los pájaros: solo sobre el cielo, lejos del año y de Atom
  const B = R.usar(null); R.usar(B);
  const nube = (cx, cy, w, k) => { const cols = [hex('#b8c8d8'), hex('#e2eaf2'), hex('#ffffff')]; for (let c = 0; c < 3; c++) for (const [dx, dy, r] of [[0, 0, 0.3], [-0.3, 0.08, 0.22], [0.3, 0.06, 0.24], [-0.1, -0.12, 0.24], [0.14, -0.08, 0.2]]) {
    const rr = r * w * (c === 2 ? 0.75 : 1), xx = cx + dx * w - (c === 2 ? 1 : 0), yy = cy + dy * w + (c === 0 ? 1 : c === 2 ? -2 : 0);
    for (let j = Math.floor(-rr); j <= rr; j++) for (let i = Math.floor(-rr); i <= rr; i++) { if (i * i + j * j > rr * rr) continue; const x = Math.round(xx + i), y = Math.round(yy + j); if (x < 0 || x > 268 || y < 22 || y > 99 || !d_cieloRep[y * 320 + x]) continue; B[y * 320 + x] = cols[c]; } } };
  nube(((t * 1.2 + 40) % 330) - 30, 30, 30, 0); nube(((t * 2.2 + 190) % 330) - 30, 44, 22, 1); nube(((t * 3.4 + 120) % 330) - 30, 56, 14, 2);
  for (let k = 0; k < 4; k++) { const x = Math.round(((t * (6 + k) + k * 70) % 300) - 10), y = Math.round(40 + k * 6 + Math.sin(t * 0.8 + k) * 3), a = Math.sin(t * 8 + k) > 0;
    if (x < 2 || x > 266) continue; R.pset(x, y, hex('#3a3a44')); R.pset(x - 1, y - (a ? 1 : 0), hex('#3a3a44')); R.pset(x + 1, y - (a ? 1 : 0), hex('#3a3a44')); R.pset(x - 2, y - (a ? 2 : 0), hex('#5a5a64')); R.pset(x + 2, y - (a ? 2 : 0), hex('#5a5a64')); }
  // las palmeras que se mecen junto a la casa
  d_palmera(R, 24, 100, 30, t, 0); d_palmera(R, 152, 100, 24, t, 2);
  // la calima que tiembla sobre el asfalto
  for (let i = 0; i < 30; i++) { const x = Math.round(h(i, 1, 88) * 250), y = 150 + Math.round(h(i, 2, 88) * 4); if (Math.sin(t * 6 + i) > 0.6) R.pset(x, y, hex('#b0aca4')); }
  // los turistas pequeños: bajan del autobús, cruzan y bajan por la rampa hasta la puerta (el muro de la rampa los tapa)
  const ropas = ['#e84a3a', '#3a7ad8', '#f0f0ec', '#5aaa5a', '#e8b030'];
  for (let k = 0; k < 5; k++) { const u = ((t * 0.045 + k * 0.2) % 1); let x, s;
    if (u < 0.5) { x = lerp(252, 176, u / 0.5); s = 147; } else { x = lerp(176, 244, (u - 0.5) / 0.5); s = Math.round(lerp(140, 150, (u - 0.5) / 0.5)); }
    d_figurita(R, x, s, t, { dir: u < 0.5 ? -1 : 1, anda: true, k, alto: 11, ropa: ropas[k], gorra: k % 2 ? '#f0f0ec' : null, pelo: ['#3a2a20', '#c8a060', '#1a1a1e', '#8a5a30', '#5a3a24'][k] }); }
  for (let x = 174; x < 236; x++) for (let y = 146; y <= 151; y++) R.pset(x, y, y === 146 ? hex('#f8f0e0') : d_tono(d_rp('#a89c84', '#c4b89e', '#dcd0b6', '#ece2cc'), 2 + h(x >> 1, y, 87) * 0.6, x, y));
  // el toldo a rayas del quiosco, que ondea, y el vendedor que se abanica
  for (let x = 143; x <= 177; x++) { const o2 = Math.round(Math.sin(t * 5 + x * 0.4) * 0.8); for (let y = 118; y <= 123; y++) R.pset(x, y + (y === 123 ? o2 : 0), ((x - 143) >> 2) % 2 ? hex('#f4f0e4') : hex('#c84a3a')); R.pset(x, 124 + o2, hex('#7a2a20')); }
  d_figurita(R, 160, 141, t, { dir: 1, brazo: 0.7, k: 9, ropa: '#e8e8e0', piel: '#9a6a44', pelo: '#2a2a2a', alto: 11 });
  // el guía con su paraguas para el sol, junto a la casa
  d_figurita(R, 112, 96, t, { dir: -1, brazo: 1, k: 7, ropa: '#e8d8b8', piel: '#9a6a44', pelo: '#1a1a1e', alto: 11 });
  { const ux = 115, uy = 80 + Math.round(Math.sin(t * 1.4)); R.linea(ux, uy, ux, uy + 7, hex('#3a3a40')); for (let i = -5; i <= 5; i++) R.pset(ux + i, uy - Math.round((25 - i * i) / 10), hex(i % 2 ? '#2a6a9a' : '#e8e8ec')); }
  // el humo del tubo de escape del autobús (al ralentí, tiembla un píxel)
  for (let k = 0; k < 3; k++) { const u = ((t * 0.7 + k / 3) % 1); R.disco(Math.round(318 - u * 6), Math.round(158 - u * 14), 1 + u * 3, (x, y) => (x + y) % 2 ? d_mez(R.pget(x, y), hex('#d8d8d8'), 0.5 - u * 0.4) : R.pget(x, y)); }
  return {};
};

// ─ replica (dentro): DENTRO DE LA RÉPLICA: la copia de la cámara pintada iluminada como un museo (con las juntas de sus
// paneles), la barandilla baja, el suelo pulido que la refleja y, a la derecha, la vitrina con el cabezal retirado ─
D_VISTAS['replica.dentro'] = (R, t, o) => {
  d_capa(R, 'dentro', () => {
    // la sala: pared de museo gris azulado con su textura y el techo oscuro con los carriles de focos
    for (let y = 0; y < 141; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_tono(d_rp('#1c2128', '#232a32', '#2a323c', '#323b46'), 1.6 + h(x >> 2, y >> 2, 90) * 0.6 - (y < 22 ? 1.2 : 0), x, y));
    R.rect(0, 20, 319, 21, hex('#14181c'));
    for (const y of [8, 14]) { R.rect(0, y, 270, y, hex('#3a424c')); R.rect(0, y + 1, 270, y + 1, hex('#101418')); }
    // la copia de la cámara: su techo liso, la pared oeste en escorzo (los babuinos) y la pared norte de frente
    d_techo(R, [[0, 24], [234, 24], [234, 30], [26, 30], [0, 26]], 91);
    d_paredLado(R, 0, 26, 140, 25, 30, 132, 0.4, true, 92);
    d_paredNorte(R, 26, 30, 232, 132, 1);
    R.linea(25, 30, 25, 132, hex('#3a2010'));
    // las juntas de los paneles de la copia (es una copia: se ven, finas)
    for (const x of [77, 129, 181]) for (let y = 30; y <= 132; y++) { R.pset(x, y, d_mez(R.pget(x, y), hex('#3a2010'), 0.45)); R.pset(x + 1, y, d_mez(R.pget(x + 1, y), hex('#fff0c8'), 0.25)); }
    R.rect(232, 24, 234, 140, hex('#1a1410')); R.rect(233, 24, 233, 140, hex('#4a3a2a'));
    // el suelo pulido oscuro con el reflejo de la pared (tramado, temblón)
    for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) { const base = d_tono(d_rp('#16181c', '#1e2126', '#262a30', '#2e333a'), 1.4 + h(x >> 3, y >> 1, 93) * 0.6 - (y - 141) / 60, x, y), ry = 2 * 133 - y + Math.round(Math.sin(y * 0.8) * 0.6);
      const refl = x < 234 && ry > 30 && ry < 133 && (y - 141) < 30 ? R.pget(x, ry) : 0; R.pset(x, y, refl && (x + y) % 2 === 0 ? d_mez(base, refl, 0.32 - (y - 141) / 110) : base); }
    R.rect(0, 141, 319, 141, hex('#0e1014'));
    // la vitrina: el pedestal, el cristal con sus cantos y reflejos, y dentro el cabezal retirado sobre un tramo de raíl
    R.rect(248, 128, 306, 162, hex('#2a2e36')); R.rect(248, 128, 306, 129, hex('#4a505a')); R.rect(304, 129, 306, 162, hex('#1a1c22')); R.rect(248, 162, 306, 163, hex('#0e1014'));
    R.rect(251, 92, 303, 127, hex('#1e2a34'));
    R.rect(258, 120, 296, 122, D_AL[4]); R.rect(258, 123, 296, 123, D_AL[1]);
    R.rect(276, 96, 278, 120, D_AL[3]); R.rect(268, 102, 286, 112, hex('#2a2e36')); R.rect(268, 102, 286, 102, hex('#6a727e')); R.disco(266, 105, 2, D_AL[3]); R.disco(266, 110, 2, D_AL[3]); R.pset(265, 105, hex('#9ad0ff')); R.pset(284, 104, hex('#ff4a3a'));
    for (const [a, b] of [[[251, 92], [303, 92]], [[251, 92], [251, 127]], [[303, 92], [303, 127]]]) R.linea(a[0], a[1], b[0], b[1], hex('#8aa4b8'));
    for (let i = 0; i < 3; i++) R.linea(256 + i * 16, 125, 266 + i * 16, 95, hex('#3a4e60'));
    // el cuadro de la pared: pictogramas sin letras (un cabezal, una flecha, la pared) y rayas
    R.rect(294, 54, 316, 84, hex('#d8d4c8')); R.rect(294, 54, 316, 54, hex('#f4f0e4')); R.rect(296, 58, 302, 64, hex('#3a3e46')); R.linea(304, 61, 309, 61, hex('#b8382a')); R.pset(308, 60, hex('#b8382a')); R.pset(308, 62, hex('#b8382a')); R.rect(311, 57, 314, 65, hex('#e0a848'));
    for (let y = 70; y < 82; y += 3) R.rect(297, y, 297 + 10 + (y % 2) * 6, y, hex('#7a7a80'));
    // la barandilla baja de latón delante de la pared (los visitantes no la tocan)
    R.rect(2, 134, 232, 135, hex('#c8a050')); R.rect(2, 134, 232, 134, hex('#f0d080')); R.rect(2, 136, 232, 136, hex('#5a4420'));
    for (let x = 8; x < 232; x += 36) { R.rect(x, 135, x + 1, 146, hex('#a88438')); R.pset(x, 136, hex('#f0d080')); R.rect(x - 2, 146, x + 3, 147, hex('#5a4420')); }
  });
  // los conos de luz de los focos sobre la pared (tramados) y la luz cálida de museo
  for (const [fx, ax] of [[60, 50], [130, 120], [200, 190]]) { R.disco(fx, 16, 3, hex('#0e1014')); R.rect(fx - 2, 18, fx + 2, 20, hex('#2a2e34'));
    R.poligono([[fx - 3, 20], [fx + 3, 20], [ax + 34, 132], [ax - 34, 132]], (x, y) => ((x + y) % 3 === 0 ? d_mez(R.pget(x, y), hex('#fff0d0'), 0.1) : R.pget(x, y))); }
  d_luz(R, [[56, 82, 104, 0.55, 0.95], [126, 82, 104, 0.55, 0.95], [196, 82, 104, 0.55, 0.95], [277, 108, 46, 0.5, 1.1], [150, 175, 120, 0.12, 0.4]], 0.48, [1.07, 1.0, 0.9]);
  // la luz de dentro de la vitrina, la cámara de seguridad que parpadea y la pantalla que repite el escaneo
  R.rect(253, 93, 301, 93, hex('#fff6e0'));
  R.rect(246, 24, 254, 28, hex('#2a2e34')); R.pset(248, 27, Math.sin(t * 4) > 0.6 ? hex('#ff3a2a') : hex('#3a1010'));
  { const x0 = 244, y0 = 48, x1 = 288, y1 = 76, u = (t * 0.2) % 1; R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#0e1014')); d_muestra(R, 24, 26, 246 / (x1 - x0), x0, y0, x1, y1, 0.15);
    const sx = Math.round(x0 + u * (x1 - x0)); for (let y = y0; y <= y1; y++) for (let x = x0; x < sx; x++) if (x % 3 === 0 || y % 3 === 0) R.pset(x, y, d_mez(R.pget(x, y), hex('#5aa8ff'), 0.35)); R.rect(sx, y0, sx, y1, hex('#ff5a3a'));
    R.linea(x0, y0, x0 + 10, y0 + 8, hex('#5a6470')); }
  d_motas(R, t, 30, 30, 230, 132, 18, hex('#fff2d8'), 5);
  return {};
};
// replica (dentro), lo de delante: el cordón rojo entre dos postes de latón que protege la vitrina
D_DELANTE['replica.dentro'] = (R, t, o) => {
  for (const x of [242, 314]) { R.rect(x - 1, 150, x + 1, 172, hex('#b08a3a')); R.rect(x - 1, 150, x - 1, 172, hex('#f0d080')); R.disco(x, 149, 2, hex('#d8b050')); R.rect(x - 4, 172, x + 4, 174, hex('#5a4420')); }
  for (let x = 243; x < 314; x++) { const y = Math.round(152 + Math.sin((x - 242) / 72 * Math.PI) * 7 + Math.sin(t * 1.5) * 0.4); R.pset(x, y, hex('#a82a2a')); R.pset(x, y + 1, hex('#5a1414')); if (x % 5 === 0) R.pset(x, y, hex('#e05a5a')); }
  return { cordon: [242, 314] };
};

// ─ rasante (general): LAS DOS PAREDES ESCANEADAS como dos pliegos colgados, en grises, bajo luz frontal o rasante ─
D_VISTAS['rasante.general'] = (R, t, o) => {
  const ras = d_ac(o.luzRasante ?? 0), rec = d_ac(o.rectangulos ?? 0);
  d_capa(R, 'rasante', () => {
    // el fondo del estudio: tela de pizarra con pliegues verticales blandos y el suelo de tablas oscuras
    for (let y = 0; y < 152; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_tono(d_rp('#181c24', '#1e232c', '#252b35', '#2c333e', '#343c48'), 2 + Math.sin(x * 0.07 + Math.sin(y * 0.02) * 0.8) * 0.7 + h(x >> 2, y >> 3, 100) * 0.4 - y / 300, x, y));
    for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 152) / 7), jn = (y - 152) % 7 === 6 || (x + tabla * 47) % 96 === 0;
      R.pset(x, y, jn ? hex('#140e0a') : d_tono(d_rp('#2a1e16', '#3a2a1e', '#4a3626', '#5a4430'), 1.6 + Math.sin(x * 0.12 + tabla * 2 + Math.sin(x * 0.03) * 2) * 0.5 + h(x >> 3, y, 101) * 0.4 - (y === 152 ? 1 : 0), x, y)); }
    R.rect(0, 151, 319, 151, hex('#3a3026'));
    // las sombras de los pliegos sobre la tela (desplazadas a la derecha y abajo)
    for (const [a, b, c, d] of [[8, 40, 90, 148], [98, 26, 270, 148]]) for (let y = b + 3; y <= d + 4; y++) for (let x = a + 4; x <= c + 5; x++) R.pset(x, y, d_mez(R.pget(x, y), hex('#06080c'), 0.5));
    // los cables con sus ganchos en la pared
    for (const [a, b, y] of [[2, 96, 37], [94, 276, 23]]) { for (let x = a; x <= b; x++) R.pset(x, y + Math.round(Math.sin((x - a) / (b - a) * Math.PI) * 1.5), hex('#8a8e96')); R.rect(a - 1, y - 1, a + 1, y + 1, hex('#5a5e66')); R.rect(b - 1, y - 1, b + 1, y + 1, hex('#5a5e66')); }
  });
  // LOS PLIEGOS: el relieve en grises (de la luz frontal a la rasante), su borde de papel y sus pinzas
  const rN = d_relieve(R, 'rasN', 98, 26, 270, 148, () => d_paredNorte(R, 98, 26, 270, 148, 0));
  const rW = d_relieve(R, 'rasW', 8, 40, 90, 148, () => d_paredOeste(R, 8, 40, 90, 148, 4));
  d_pintaRelieve(R, rN, ras); d_pintaRelieve(R, rW, ras);
  for (const [a, b, c, d] of [[8, 40, 90, 148], [98, 26, 270, 148]]) { R.rect(a, b, c, b, hex('#f4f4f6')); R.rect(a, b, a, d, hex('#e0e0e4')); R.rect(c, b, c, d, hex('#5a5a62')); R.rect(a, d, c, d, hex('#4a4a52'));
    for (let x = a + 6; x < c; x += 38) { R.rect(x, b - 3, x + 5, b + 2, hex('#16161a')); R.rect(x + 1, b - 3, x + 4, b - 3, hex('#6a6a74')); R.linea(x + 1, b - 5, x + 4, b - 3, hex('#9a9aa4')); }
    // la esquina de abajo que se levanta con el aire
    const lev = Math.round(1.5 + Math.sin(t * 1.3 + a) * 1.5); for (let i = 0; i <= lev + 2; i++) for (let j = 0; j <= lev + 2 - i; j++) R.pset(c - i, d - j, j + i === lev + 2 ? hex('#8a8a92') : hex('#f0f0f2')); }
  // LOS DOS RECTÁNGULOS rectos bajo la pintura (en la luz rasante se ven mucho más)
  const a = rec * (0.3 + 0.7 * ras);
  d_aristas(R, 30, 82, 70, 147, a); d_aristas(R, 168, 52, 232, 147, a);
  // la luz rasante: un haz que entra por la izquierda y barre el pliego (más ancho cuanto más rasante) y sus motas
  if (ras > 0) { R.poligono([[0, 20], [0, 160], [320, 156], [320, 110]], (x, y) => ((x * 2 + y) % 5 === 0 ? d_mez(R.pget(x, y), hex('#fff4dc'), 0.08 * ras) : R.pget(x, y)));
    d_motas(R, t, 4, 40, 300, 150, Math.round(24 * ras), hex('#fff0d0'), 6); }
  return {};
};
// rasante (general), lo de delante: el atril con el portátil (la pared norte en miniatura y los rectángulos que
// brillan con o.rectangulos)
D_DELANTE['rasante.general'] = (R, t, o) => {
  const rec = d_ac(o.rectangulos ?? 0), ras = d_ac(o.luzRasante ?? 0);
  for (const [a, b] of [[282, 179], [296, 179], [310, 179]]) R.linea(296, 150, a, b, hex('#2a2a30'));
  R.rect(295, 132, 297, 150, hex('#3a3a42')); R.pset(295, 140, hex('#6a6a74'));
  R.poligono([[278, 128], [314, 128], [316, 134], [280, 134]], hex('#1e1e24')); R.linea(278, 128, 314, 128, hex('#4a4a54'));
  R.rect(282, 124, 312, 127, hex('#8a9098')); R.rect(282, 124, 312, 124, hex('#c4c8ce'));
  R.rect(284, 104, 310, 123, hex('#22242a')); R.rect(284, 104, 310, 104, hex('#4a4e56'));
  const rN = d_relieves.get('rasN');
  for (let j = 0; j < 17; j++) for (let i = 0; i < 25; i++) { const x = 285 + i, y = 105 + j; if (!rN) { R.pset(x, y, hex('#0c1620')); continue; }
    const k = Math.round(j * (rN.H - 1) / 16) * rN.W + Math.round(i * (rN.W - 1) / 24); R.pset(x, y, d_tono(D_GRIS, (rN.gF[k] + (rN.gR[k] - rN.gF[k]) * Math.max(ras, 0.6)) * 9, x, y)); }
  if (rec > 0) { const c = Math.sin(t * 5) > 0 ? hex('#5affe0') : hex('#2ab8a0'); const x0 = 285 + Math.round((168 - 98) * 24 / 172), x1 = 285 + Math.round((232 - 98) * 24 / 172), y0 = 105 + Math.round((52 - 26) * 16 / 122);
    if (rec > 0.3) { R.rect(x0, y0, x1, y0, c); R.rect(x0, y0, x0, 121, c); R.rect(x1, y0, x1, 121, c); } }
  return { atril: [296, 128], portatil: [297, 114] };
};

// ─ rasante (linea): EL BORDE DEL RECTÁNGULO GRANDE DE CERCA, con el dedo de Reeves que lo repasa y la pintura que vuelve ─
D_VISTAS['rasante.linea'] = (R, t, o) => {
  const col = d_ac(o.color ?? 0), dd = d_ac(o.dedo ?? (t * 0.15) % 1);
  d_capa(R, 'linea', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_tono(d_rp('#181c24', '#1e232c', '#252b35', '#2c333e'), 1.8 + Math.sin(x * 0.07) * 0.6 + h(x >> 2, y >> 3, 102) * 0.4, x, y));
    // el margen de papel del pliego: la carta de color, la regla con sus marcas y las cruces de registro
    for (let y = 24; y < 70; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_tono(d_rp('#c4c4ca', '#d2d2d8', '#dedee2'), 1.6 + h(x >> 3, y >> 3, 103) * 0.3, x, y));
    R.rect(0, 24, 319, 24, hex('#f4f4f6'));
    for (let y = 26; y < 70; y++) for (let x = 0; x < 320; x++) if (x % 5 === 0 || y % 5 === 0) R.pset(x, y, d_mez(R.pget(x, y), hex('#7aa8c8'), x % 25 === 0 || y % 25 === 0 ? 0.35 : 0.14));
    // anotaciones a lápiz: cotas con flechas y unos números
    R.linea(96, 44, 160, 44, hex('#5a5a66')); R.linea(96, 42, 96, 46, hex('#5a5a66')); R.linea(160, 42, 160, 46, hex('#5a5a66')); R.numero('52', 120, 41, { fina: true, color: hex('#4a4a56'), sombra: false });
    R.linea(196, 36, 246, 36, hex('#b8382a')); R.linea(246, 34, 250, 36, hex('#b8382a')); R.linea(246, 38, 250, 36, hex('#b8382a')); R.numero('224', 210, 33, { fina: true, color: hex('#a83a2a'), sombra: false });
    for (let i = 0; i < 6; i++) { R.rect(20 + i * 9, 32, 27 + i * 9, 39, hex(['#1c1c20', '#5a5a60', '#9a9aa0', '#d8d8dc', '#ffffff', '#86868e'][i])); R.rect(20 + i * 9, 41, 27 + i * 9, 48, hex(['#b8382a', '#e0a848', '#3a8a5a', '#2c4ca8', '#d84a8a', '#3ab0a8'][i])); }
    R.rect(19, 31, 74, 31, hex('#2a2a30')); R.rect(19, 49, 74, 49, hex('#2a2a30'));
    for (let x = 90; x < 270; x++) { R.pset(x, 60, hex('#2a2a30')); if (x % 5 === 0) R.rect(x, 56, x, 59, hex('#2a2a30')); if (x % 25 === 0) R.rect(x, 52, x, 59, hex('#1a1a20')); }
    for (const [x, y] of [[84, 40], [290, 58]]) { R.rect(x - 4, y, x + 4, y, hex('#1a1a20')); R.rect(x, y - 4, x, y + 4, hex('#1a1a20')); R.anillo(x, y, 2, hex('#1a1a20')); }
    for (const x of [40, 150, 250]) { R.rect(x, 18, x + 7, 27, hex('#16161a')); R.rect(x + 1, 18, x + 6, 18, hex('#6a6a74')); }
  });
  // la pared a ×2,7 (la esquina de arriba a la izquierda de la puerta escondida en x 60, y 140; la de la derecha en x 260)
  const rL = d_relieve(R, 'linea', 0, 70, 319, 179, () => d_paredNorte(R, -280, 70, 384, 399, 0));
  d_pintaRelieve(R, rL, 1, col);
  // LA ARISTA recta en relieve (el dintel y las dos jambas), con más fuerza; lo ya repasado por el dedo brilla un poco
  d_aristas(R, 60, 140, 260, 179, 1); d_aristas(R, 60, 140, 260, 179, 0.6);
  const dx = Math.round(lerp(60, 260, dd));
  for (let x = 60; x <= dx; x++) { R.pset(x, 139, d_mez(R.pget(x, 139), hex('#e8fff8'), 0.55)); R.pset(x, 138, d_mez(R.pget(x, 138), hex('#e8fff8'), 0.2)); }
  // EL DEDO de Reeves: el brazo canónico que entra desde abajo y la mano que repasa la arista
  brazo(R, dx - 40, 192, dx - 12, 144, '#5a6478', 1, { codo: [dx - 30, 170] });
  return { dedo: [dx, 140] };
};

// la paleta propia de estos decorados (lo que no está en C)
const e_P = pal({
  techo: '#2a2018', techoS: '#1e160f', techoL: '#382a1e', noche: '#120c10', ocre2: '#d49a3c', mancha: '#7a4a28',
  zocalo: '#6a4424', zocaloS: '#4e3018', zocaloL: '#86583a', piel: '#a8502c', pielS: '#7a3a20', pielM: '#f2c870',
  trazo: '#5a2a14', blancoE: '#f4ecd8', blancoES: '#cfc4a8', rojoE: '#b83a2a', verdeE: '#3a8a5a', negro: '#1c1410',
  suelo: '#b89870', sueloS: '#8a6e4c', sueloL: '#d4b88e', grisA: '#3a4048', grisB: '#5a626e', grisC: '#8a94a0', grisD: '#c4ccd4',
  azulE: '#2a5a8a', azulEL: '#4a86c0', led: '#eef6ff', ledS: '#b8d0e8', pant: '#0e141a', pantL: '#1c2a34',
  verdeP: '#5ad08a', rojoP: '#ff4a3a', rojoPS: '#a8221a', telon: '#1c2850', telonS: '#121a38', telonL: '#2a3a6e',
  moqueta: '#5a2430', moquetaS: '#401820', moquetaL: '#743040', rocaR: '#c0603a', rocaRS: '#8a3a24', rocaRL: '#e08a5a',
  rocaRD: '#5e2818', bruma: '#f0c0a0', brumaS: '#d89a7a', enebro: '#4a6a3a', enebroS: '#2e4a26', rio: '#4a8ab0', rioL: '#9ad0e8',
  hormigon: '#a8a8a0', hormigonS: '#86867e', hormigonL: '#c4c4bc', bloque: '#9a9a94', bloqueS: '#76766e', bloqueL: '#b8b8b0',
  epoxi: '#7a8a84', epoxiS: '#5e6c66', epoxiL: '#9aaaa2', acero: '#4a525c', aceroL: '#7a8490', nieve: '#f4f8ff', alpes: '#7a8aa8', alpesS: '#5a6a88',
  madera: '#8a5a34', maderaS: '#6a4226', maderaL: '#a8744a', carpeta: '#d8c49a', carpetaS: '#b0996c', carpetaL: '#ece0c0', tinta: '#c0282a',
  museo: '#24484a', museoS: '#183436', museoL: '#30605e', parquet: '#6a4a30', parquetS: '#523822', parquetL: '#86603e', laton: '#d8b048', latonS: '#9a7424',
  terciopelo: '#9a1c2a', adobe: '#f2ead8', adobeS: '#cfc2a6', adobeL: '#fffaf0', campo: '#6aa04a', campoS: '#4a8036', campoL: '#9ac868',
  nilo: '#3a7ab8', niloS: '#2a5a90', niloL: '#8ac0e8', cielo0: '#9ccbe8', cielo1: '#bcdcf0', cielo2: '#dceef4', cielo3: '#f4f0dc',
  acantilado: '#d8a868', acantiladoS: '#b08048', piedraT: '#e4d0a8', piedraTS: '#c0a87c', piedraTL: '#f4e6c4', relieve: '#a88a5c',
});

// mezcla dos colores (a = 0 el primero, a = 1 el segundo)
const e_mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255, r2 = c2 & 255, g2 = (c2 >>> 8) & 255, b2 = (c2 >>> 16) & 255;
  return ((255 << 24) | (Math.round(b1 + (b2 - b1) * a) << 16) | (Math.round(g1 + (g2 - g1) * a) << 8) | Math.round(r1 + (r2 - r1) * a)) >>> 0; };

const e_cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

const e_HUECO = hex('#14101a');   // el fondo de cada búfer antes de pintarlo (no debe verse)

// un rectángulo con pset (respeta R.recorte, al contrario que R.rect)
const e_caja = (R, x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= y1; y++) for (let x = Math.round(x0); x <= x1; x++) R.pset(x, y, c); };

// los fondos fijos de cada vista, pintados una vez en un búfer de R.nuevo() y copiados en cada fotograma
const e_fijos = new WeakMap();

function e_fijo(R, clave, pinta) {
  let m = e_fijos.get(R); if (!m) e_fijos.set(R, m = {});
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); R.recorte(null); R.rect(0, 0, 319, 179, e_HUECO); pinta(); R.recorte(null); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// un búfer suelto (no se copia a la pantalla): la pared norte de frente, que el escorzo y los insertos muestrean
function e_bufPared(R) {
  let m = e_fijos.get(R); if (!m) e_fijos.set(R, m = {});
  if (!m.paredN) { const b = R.nuevo(), prev = R.usar(b); R.rect(0, 0, 319, 179, e_P.techo); e_paredNorte(R, 24, 26); R.usar(prev); m.paredN = b; }
  return m.paredN;
}

// oscurece (o aclara hacia `hacia`) cada píxel de una zona según luz(x, y) 0–1, tramado en cuatro pasos (una pasada)
function e_luz(R, x0, y0, x1, y1, luz, hacia = e_P.noche, fuerza = 0.7) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const a = (1 - e_cl(luz(x, y))) * fuerza, q = Math.floor(a * 4 + R.b4(x, y)) / 4;
    if (q > 0) R.pset(x, y, e_mez(R.pget(x, y), hacia, Math.min(1, q)));
  }
}

// cielo tramado en degradado (cols de arriba abajo) entre y0 e y1
function e_cieloT(R, y0, y1, cols, x0 = 0, x1 = 319) {
  for (let y = y0; y <= y1; y++) { const u = e_cl((y - y0) / Math.max(1, y1 - y0)) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, f > R.b4(x, y) ? cols[i + 1] : cols[i]); }
}

// una nube de tres tonos (la sombra abajo, el cuerpo y el brillo arriba a la izquierda), de ancho w
function e_nube(R, x, y, w, [cS, c, cL]) {
  const n = Math.max(3, Math.round(w / 7));
  for (let i = 0; i < n; i++) { const cx = x + (i + 0.5) * w / n, r = (w / n) * (0.7 + 0.5 * Math.sin(i * 2.1 + w)); R.disco(cx, y + 1, r, cS); }
  for (let i = 0; i < n; i++) { const cx = x + (i + 0.5) * w / n, r = (w / n) * (0.7 + 0.5 * Math.sin(i * 2.1 + w)); R.disco(cx, y - 0.5, r - 0.6, c); }
  for (let i = 0; i < n - 1; i++) { const cx = x + (i + 0.4) * w / n, r = (w / n) * (0.4 + 0.3 * Math.sin(i * 2.1 + w)); R.disco(cx, y - 2, r, cL); }
  R.linea(x + 2, Math.round(y + 2), x + w - 2, Math.round(y + 2), cS);
}

// nubes que pasan a tres velocidades (las lejanas, más lentas y más pequeñas), entre x0 y x1
function e_nubes(R, t, y0, cols, x0 = -40, x1 = 360, n = 5) {
  for (let k = 0; k < n; k++) { const v = 1.2 + (k % 3) * 1.1, w = 18 + (k % 3) * 9 + Math.round(h(k, 3, 91) * 8), L = x1 - x0 + w;
    const x = x0 + (((h(k, 1, 91) * L + t * v) % L) + L) % L - w, y = y0 + (k % 3) * 7 + Math.round(h(k, 2, 91) * 5); e_nube(R, Math.round(x), y, w, cols); }
}

// un pájaro lejano que aletea (una uve)
function e_ave(R, x, y, t, c, k = 0) {
  x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 9 + k * 1.7) > 0;
  R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 1 : -1), c); R.pset(x + 2, y - (a ? 1 : -1), c);
}

// una figurita de fondo (6–12 px): cabeza, cuerpo, piernas que andan; c = [ropa, piel, pelo]
function e_gentecilla(R, x, suelo, t, [ropa, piel, pelo], o = {}) {
  x = Math.round(x); const a = o.anda ? Math.floor(t * 6 + x) % 2 : 0, alto = o.alto ?? 10, dir = o.dir ?? 1;
  R.linea(x - 1, suelo, x - 1, suelo - 3 + a, C.k); R.linea(x + 1, suelo, x + 1, suelo - 3 + (1 - a), C.k);
  e_caja(R, x - 2, suelo - alto + 3, x + 2, suelo - 3, ropa); R.pset(x + 2 * dir, suelo - alto + 4, e_mez(ropa, C.k, 0.3));
  e_caja(R, x - 1, suelo - alto, x + 1, suelo - alto + 2, piel); e_caja(R, x - 1, suelo - alto - 1, x + 1, suelo - alto - 1, pelo); R.pset(x - dir, suelo - alto, pelo);
}

// LA PARED NORTE PINTADA (canon), de frente, con la esquina de arriba a la izquierda en (x0, y0): 247 × 123 px. La
// cenefa de rayas (azul, rojo, verde), el campo ocre con su moteado y las manchitas marrones, las tres escenas de
// pictogramas NUESTROS (el faraón ante la diosa del disco, ante el dios chacal y, a la derecha, las dos figuras
// abrazadas), con su contorno oscuro, y el zócalo marrón con grietas
function e_paredNorte(R, x0, y0) {
  const { rect, pset } = R, W = 246, H = 122;
  for (let y = 0; y <= H; y++) for (let x = 0; x <= W; x++) {
    const n = h(x >> 1, y >> 1, 7), m = R.vnoise((x0 + x) * 0.07, (y0 + y) * 0.09);
    let c = m > 0.58 + (R.b4(x, y) - 0.5) * 0.12 ? e_P.ocre2 : C.ocre; if (n > 0.95) c = C.ocreS; else if (n < 0.05) c = C.ocreL;
    if (h(x, y, 17) > 0.993) c = e_P.mancha;
    pset(x0 + x, y0 + y, c);
  }
  // la sombra del techo y la cenefa de rayas de colores entre dos filetes negros, con la franja roja de debajo
  rect(x0, y0, x0 + W, y0 + 1, C.ocreS);
  rect(x0, y0 + 2, x0 + W, y0 + 2, e_P.negro); rect(x0, y0 + 11, x0 + W, y0 + 11, e_P.negro); rect(x0, y0 + 12, x0 + W, y0 + 13, e_P.rojoE);
  const RAYAS = [C.lapis, e_P.rojoE, e_P.verdeE, C.ocreL];
  for (let x = 0; x <= W; x++) { const k = Math.floor(x / 4), c = (x % 4) === 3 ? e_P.negro : RAYAS[k % 4]; rect(x0 + x, y0 + 3, x0 + x, y0 + 10, c); if ((x % 4) !== 3 && h(x, 1, 5) > 0.8) pset(x0 + x, y0 + 4 + Math.floor(h(x, 2, 5) * 6), e_mez(c, C.ocreL, 0.4)); }
  // el zócalo: el filete, el marrón con su moteado y unas grietas
  rect(x0, y0 + 98, x0 + W, y0 + 98, e_P.negro); rect(x0, y0 + 99, x0 + W, y0 + 99, e_P.zocaloL);
  for (let y = 100; y <= H; y++) for (let x = 0; x <= W; x++) { const n = h(x >> 1, y, 9); pset(x0 + x, y0 + y, n > 0.9 ? e_P.zocaloS : n < 0.08 ? e_P.zocaloL : e_P.zocalo); }
  for (const [gx, gy] of [[30, 104], [118, 108], [206, 102]]) { let x = x0 + gx, y = y0 + gy; for (let i = 0; i < 9; i++) { pset(x, y, e_P.zocaloS); x += h(gx, i, 3) > 0.5 ? 1 : 0; y += 1; if (y > y0 + H) break; } }
  // las figuras se pintan en un búfer aparte y se pegan con su contorno (como el trazo de los pintores)
  const prev = R.usar(new Uint32Array(320 * 180)), suelo = y0 + 96;
  e_figuraEg(R, x0 + 26, suelo, 1, 'farao'); e_figuraEg(R, x0 + 54, suelo, -1, 'diosa');
  e_figuraEg(R, x0 + 98, suelo, 1, 'farao'); e_figuraEg(R, x0 + 126, suelo, -1, 'chacal');
  e_figuraEg(R, x0 + 178, suelo, 1, 'farao'); e_figuraEg(R, x0 + 190, suelo, -1, 'ka');
  // los iconos pequeños de arriba (soles y plumas, nuestros: ni jeroglíficos ni letras) entre las escenas
  for (const [ix, k] of [[40, 0], [112, 1], [184, 2], [70, 1], [150, 0], [226, 2]]) { const x = x0 + ix, y = y0 + 18;
    if (k === 0) { R.disco(x, y + 2, 2, e_P.rojoE); } else if (k === 1) { rect(x, y, x, y + 5, C.lapis); pset(x + 1, y, C.lapis); pset(x + 1, y + 1, C.lapis); } else { R.anillo(x + 0.5, y + 2.5, 2, e_P.verdeE); rect(x, y + 4, x, y + 6, e_P.verdeE); } }
  const F = R.usar(prev);
  for (let y = y0 + 14; y < y0 + 98; y++) for (let x = x0; x <= x0 + W; x++) {
    const v = F[y * 320 + x];
    if (v) pset(x, y, v);
    else if (F[y * 320 + x - 1] || F[y * 320 + x + 1] || F[(y - 1) * 320 + x] || F[(y + 1) * 320 + x]) pset(x, y, e_P.trazo);
  }
}

// una figura de la pintura (pictograma NUESTRO, ~58 px, de perfil, sin ojos): 'farao' (corona azul, faldellín blanco,
// ofrece con el brazo de delante), 'diosa' (vestido blanco ceñido, peluca negra, el disco rojo entre cuernos), 'chacal'
// (cabeza negra de orejas altas, el cetro) y 'ka' (peluca negra, abraza). dir: hacia dónde mira
function e_figuraEg(R, x, yb, dir, tipo) {
  const { rect, pset, disco, poligono, linea } = R, X = (d) => x + d * dir;
  const piel = tipo === 'diosa' ? e_P.pielM : e_P.piel, pielS = tipo === 'diosa' ? C.ocreS : e_P.pielS;
  if (tipo === 'diosa') {
    poligono([[X(-4), yb - 44], [X(4), yb - 44], [X(5), yb - 2], [X(-4), yb - 2]], e_P.blancoE);
    linea(X(3), yb - 40, X(3), yb - 4, e_P.blancoES); rect(Math.min(X(-4), X(5)), yb - 2, Math.max(X(-4), X(5)), yb, piel);
    rect(Math.min(X(-3), X(3)), yb - 46, Math.max(X(-3), X(3)), yb - 41, piel); rect(Math.min(X(-4), X(4)), yb - 30, Math.max(X(-4), X(4)), yb - 29, e_P.rojoE);
  } else {
    // las piernas en zancada y los pies
    poligono([[X(-3), yb - 24], [X(1), yb - 24], [X(-1), yb], [X(-4), yb]], piel); poligono([[X(1), yb - 24], [X(4), yb - 24], [X(9), yb - 1], [X(6), yb]], piel);
    linea(X(-4), yb, X(0), yb, pielS); linea(X(6), yb, X(11), yb, pielS);
    // el faldellín blanco con sus pliegues y el cinturón
    poligono([[X(-5), yb - 31], [X(6), yb - 31], [X(9), yb - 19], [X(-6), yb - 19]], e_P.blancoE);
    for (let k = 0; k < 4; k++) linea(X(-3 + k * 3), yb - 29, X(-3 + k * 3 + 1), yb - 20, e_P.blancoES);
    rect(Math.min(X(-5), X(6)), yb - 32, Math.max(X(-5), X(6)), yb - 31, tipo === 'chacal' ? C.lapis : C.oro);
    // el torso
    poligono([[X(-5), yb - 46], [X(6), yb - 46], [X(4), yb - 32], [X(-4), yb - 32]], piel); linea(X(-4), yb - 44, X(-3), yb - 33, pielS);
  }
  // el collar ancho de bandas
  for (const [d, c] of [[0, C.lapis], [1, e_P.verdeE], [2, e_P.rojoE]]) linea(X(-5 + d), yb - 45 + d, X(5 - d), yb - 45 + d, c);
  // los brazos: el de delante adelantado (ofrece o abraza) y el de detrás, abajo
  if (tipo === 'ka') { linea(X(4), yb - 44, X(-8), yb - 46, piel); linea(X(4), yb - 43, X(-8), yb - 45, piel); }
  else { linea(X(4), yb - 44, X(13), yb - 40, piel); linea(X(4), yb - 43, X(13), yb - 39, piel); rect(Math.min(X(13), X(15)), yb - 41, Math.max(X(13), X(15)), yb - 39, piel); }
  linea(X(-4), yb - 44, X(-6), yb - 30, piel); linea(X(-5), yb - 44, X(-7), yb - 30, piel);
  if (tipo === 'chacal') { linea(X(16), yb - 52, X(16), yb, e_P.negro); rect(Math.min(X(15), X(18)), yb - 54, Math.max(X(15), X(18)), yb - 53, e_P.negro); }
  if (tipo === 'farao') { R.anillo(X(15) + 0.5, yb - 42.5, 2, C.oro); linea(X(15), yb - 40, X(15), yb - 36, C.oro); }
  // la cabeza de perfil (sin ojos): el cuello, la cara con su nariz y lo que lleva encima
  rect(Math.min(X(-1), X(2)), yb - 49, Math.max(X(-1), X(2)), yb - 46, piel);
  if (tipo === 'chacal') {
    disco(X(0), yb - 52, 4, e_P.negro); poligono([[X(2), yb - 54], [X(10), yb - 51], [X(9), yb - 49], [X(2), yb - 49]], e_P.negro);
    poligono([[X(-2), yb - 55], [X(0), yb - 63], [X(2), yb - 55]], e_P.negro); poligono([[X(1), yb - 55], [X(3), yb - 62], [X(4), yb - 55]], e_P.negro);
    pset(X(5), yb - 53, C.oro); rect(Math.min(X(-5), X(-2)), yb - 52, Math.max(X(-5), X(-2)), yb - 45, C.lapis);
    return;
  }
  disco(X(0.5), yb - 52, 4, piel); poligono([[X(4), yb - 54], [X(6), yb - 52], [X(4), yb - 51]], piel); pset(X(4), yb - 49, piel);
  if (tipo === 'farao') {
    poligono([[X(-5), yb - 52], [X(-4), yb - 60], [X(0), yb - 63], [X(4), yb - 60], [X(4), yb - 55], [X(-1), yb - 53], [X(-2), yb - 48], [X(-6), yb - 48]], C.lapis);
    for (let k = 0; k < 5; k++) pset(X(-3 + (k % 3) * 2), yb - 58 + Math.floor(k / 2) * 2, C.lapisL); pset(X(4), yb - 57, C.oro); pset(X(5), yb - 58, C.oro);
  } else {
    poligono([[X(-6), yb - 56], [X(3), yb - 57], [X(3), yb - 53], [X(-1), yb - 52], [X(-1), yb - 44], [X(-6), yb - 44]], e_P.negro);
    for (let k = 0; k < 3; k++) linea(X(-5 + k * 2), yb - 54, X(-5 + k * 2), yb - 45, hex('#2e2a3a'));
    if (tipo === 'diosa') { linea(X(-4), yb - 58, X(-6), yb - 64, e_P.negro); linea(X(4), yb - 58, X(6), yb - 64, e_P.negro); disco(X(0), yb - 63, 4, e_P.rojoE); pset(X(-1), yb - 65, hex('#e86a4a')); }
  }
}

function e_pared(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = PIEZAS_TU;
  e_fijo(R, 'pared', () => {
    // el techo de roca, liso y oscuro (fondo tranquilo para el año y para Atom)
    for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 2, y >> 1, 11) > 0.92 ? e_P.techoL : y < 8 ? e_P.techoS : e_P.techo);
    e_paredNorte(R, 24, 26);
    // la pared oeste en escorzo (los babuinos, apretados) y la del este con el paso al tesoro
    poligono([[0, 6], [24, 26], [24, 149], [0, 174]], (x, y) => h(x >> 1, y >> 1, 4) > 0.9 ? C.ocreS : e_P.ocre2);
    for (let y = 40; y < 140; y += 26) for (let x = 3; x < 22; x += 7) { const yy = y + Math.round((24 - x) * 0.3); disco(x, yy, 2, e_P.trazo); rect(x - 2, yy + 2, x + 2, yy + 6, e_P.trazo); pset(x + 1, yy - 2, e_P.trazo); }
    rect(23, 26, 23, 148, C.ocreS);
    poligono([[271, 26], [320, 4], [320, 176], [271, 149]], (x, y) => (y < 46 ? (R.b4(x, y) > 0.8 ? e_P.ocre2 : C.ocreS) : h(x >> 1, y >> 1, 6) > 0.9 ? C.ocreS : e_P.ocre2));
    poligono([[290, 72], [312, 64], [312, 168], [290, 156]], e_P.negro); poligono([[292, 76], [310, 69], [310, 165], [292, 154]], hex('#2a1c14'));
    for (const y of [104, 126]) { linea(290, y, 312, y - 6, e_P.madera); linea(290, y + 1, 312, y - 5, e_P.maderaS); }
    rect(271, 26, 271, 148, C.ocreS);
    // el suelo de la cámara: losas de caliza en perspectiva, con polvo y una grieta
    poligono([[24, 149], [271, 149], [320, 176], [320, 180], [0, 180], [0, 174]], (x, y) => { const n = h(x >> 1, y, 21); return n > 0.88 ? e_P.sueloS : n < 0.1 ? e_P.sueloL : e_P.suelo; });
    for (const y of [153, 159, 167, 177]) linea(0, y, 319, y, e_P.sueloS);
    for (let k = -6; k <= 6; k++) linea(147 + k * 22, 149, 147 + k * 52, 180, e_P.sueloS);
    rect(24, 149, 271, 149, e_P.zocaloS);
    // la luz: de noche todo en penumbra, menos el círculo del foco sobre la puerta escondida
    e_luz(R, 0, 0, 319, 179, (x, y) => 1.35 - Math.hypot((x - 188) / 92, (y - 112) / 66) + (x < 60 && y > 100 ? 0.25 : 0), e_P.noche, 0.72);
    // el foco en su trípode (a la izquierda), con el cable al suelo
    linea(44, 120, 32, 170, C.k); linea(44, 120, 56, 170, C.k); linea(44, 120, 44, 168, C.k); linea(45, 121, 57, 170, e_P.grisB);
    rect(36, 104, 52, 118, C.k); rect(37, 105, 50, 117, e_P.grisA); rect(37, 105, 50, 106, e_P.grisB); rect(51, 106, 54, 116, e_P.grisB); rect(53, 107, 54, 115, C.blanco);
    rect(42, 118, 46, 121, e_P.grisA); for (let k = 0; k < 4; k++) pset(39 + k * 3, 110, e_P.grisC);
    // la caja de herramientas con el portátil abierto encima
    rect(62, 150, 104, 166, C.k); rect(63, 151, 103, 165, hex('#8a2a24')); rect(63, 151, 103, 152, hex('#b8423a')); rect(63, 158, 103, 158, hex('#5a1a16'));
    rect(80, 155, 86, 157, e_P.grisC); rect(64, 163, 102, 165, hex('#5a1a16'));
    poligono([[68, 150], [98, 150], [96, 146], [70, 146]], e_P.grisA); rect(70, 129, 96, 146, C.k); rect(71, 130, 95, 145, e_P.grisA);
  });
  // el haz del foco: motas de polvo que flotan en la luz
  for (let k = 0; k < 22; k++) { const u = ((h(k, 1, 33) + t * (0.03 + h(k, 2, 33) * 0.04)) % 1), x = Math.round(56 + u * 150), y = Math.round(110 + (h(k, 3, 33) - 0.5) * u * 70 + Math.sin(t + k) * 2);
    if (y > 30 && y < 170) pset(x, y, (k + Math.floor(t * 2)) % 3 ? hex('#f8e0a8') : hex('#c8a870')); }
  pset(54, 109 + (Math.floor(t * 3) % 6), C.blanco);
  // la cinta métrica pegada a la pared, a la altura del zócalo (marcas cada cuatro píxeles)
  rect(30, 140, 266, 142, hex('#e8e2cc')); rect(30, 142, 266, 142, hex('#a8a28c'));
  for (let x = 30; x <= 266; x += 4) pset(x, 140, x % 20 === 10 ? e_P.rojoE : C.k); for (let x = 30; x <= 266; x += 40) rect(x, 140, x, 141, e_P.rojoE);
  for (const x of [34, 150, 262]) rect(x - 1, 139, x + 1, 143, hex('#c8c0a8'));
  // el portátil: el radargrama pequeño que corre y su luz en la cara del que mire
  rect(72, 131, 94, 144, e_P.pant);
  for (let y = 132; y < 144; y++) for (let x = 73; x < 94; x++) { const v = Math.sin((y - 131) * 1.3 + Math.sin((x + t * 8) * 0.3) * 0.6); if (v > 0.3) pset(x, y, y < 136 ? e_P.grisD : e_P.grisC); }
  { const cx = 73 + Math.floor((t * 6) % 21); linea(cx, 132, cx, 143, e_P.verdeP); }
  if (Math.floor(t * 2) % 2) pset(92, 132, e_P.rojoP);
  // el radar: avanza por la pared con o.pasada, con el cable que cuelga hasta el portátil
  const px = o.pasada ?? 0.35, rx = Math.round(152 + px * 66), ry = 140;
  if (o.radar !== false) {
    const sag = 18 + Math.sin(t * 1.3) * 1.5; let ax = 96, ay = 152;
    for (let i = 1; i <= 16; i++) { const u = i / 16, bx = Math.round(96 + (rx - 6 - 96) * u), by = Math.round(152 + (ry + 4 - 152) * u + Math.sin(u * Math.PI) * sag); linea(ax, ay, bx, by, C.k); ax = bx; ay = by; }
    P.radarMano?.(R, rx, ry + 8, { t, dir: 1 });
    if (Math.floor(t * 4) % 2) pset(rx + 10, ry - 4, e_P.verdeP);
  }
  // el ayudante (de fondo, a la derecha) apunta en la libreta
  if (o.ayudante !== false) { const a = R.actor(ELENCO_CHIBI.tecnico, 250, 162, t, { dir: -1, sostiene: [240, 148] }); const m = a?.mano ?? [240, 148];
    rect(m[0] - 4, m[1] - 3, m[0] + 1, m[1] + 3, C.k); rect(m[0] - 3, m[1] - 2, m[0], m[1] + 2, C.blanco); pset(m[0] - 2 + (Math.floor(t * 5) % 2), m[1], C.k); }
  return { radar: [rx, ry], portatil: [83, 138], foco: [44, 110], ayudante: [250, 162] };
}

function e_pantalla(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  e_fijo(R, 'pantalla', () => {
    // detrás, la pared pintada de cerca y en penumbra (aumentada al doble), más oscura arriba
    const W = e_bufPared(R);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, W[(60 + (y >> 1)) * 320 + 110 + (x >> 1)]);
    e_luz(R, 0, 0, 319, 179, (x, y) => 0.25 + y / 400, e_P.noche, 0.95);
    e_tranquilo(R, hex('#1e1610'), hex('#241a12'));
    // la tapa del portátil (gris oscuro, con la bisagra) y la base con su teclado en perspectiva
    rect(30, 22, 266, 150, C.k); rect(31, 23, 265, 149, e_P.grisA); rect(31, 23, 265, 24, e_P.grisB); rect(38, 28, 258, 144, C.k);
    pset(148, 26, e_P.grisC); rect(31, 146, 265, 149, hex('#2e343c'));
    poligono([[22, 180], [276, 180], [268, 150], [28, 150]], e_P.grisB); poligono([[24, 180], [274, 180], [267, 153], [29, 153]], hex('#4e5660'));
    for (let r = 0; r < 4; r++) { const y = 156 + r * 5, sx = 34 - r * 1.5, ex = 262 + r * 1.5; for (let x = sx; x < ex - 8; x += 11) { rect(Math.round(x), y, Math.round(x) + 8, y + 3, hex('#2a2e34')); rect(Math.round(x), y, Math.round(x) + 8, y, hex('#3a4048')); } }
    rect(122, 177, 176, 179, hex('#3a4048'));
    // la libreta y el lápiz a la izquierda; la botella de agua a la derecha
    poligono([[0, 120], [26, 124], [22, 178], [0, 178]], hex('#d8d0b8')); for (let y = 128; y < 176; y += 4) linea(2, y, 22, y + 1, hex('#a8b8c8')); linea(4, 140, 20, 150, C.k); linea(5, 140, 21, 150, e_P.rojoE);
    rect(286, 92, 306, 176, C.k); rect(287, 98, 305, 175, hex('#9ac0d8')); rect(287, 120, 305, 150, hex('#d8e8f0')); rect(289, 99, 291, 174, hex('#e8f4fc'));
    rect(290, 86, 302, 92, C.k); rect(291, 87, 301, 91, hex('#2a6ab0')); for (let y = 100; y < 175; y += 3) pset(303, y, hex('#6a98b8'));
    // el radargrama: franjas grises que bajan con la profundidad (más oscuras abajo), algo onduladas
    for (let y = 38; y <= 141; y++) for (let x = 52; x <= 256; x++) {
      const d = (y - 38) / 103, v = 0.82 - d * 0.5 + 0.2 * Math.sin((y - 38) * 0.75 + R.vnoise(x * 0.05, y * 0.12) * 2.5) + (h(x, y, 5) - 0.5) * 0.15;
      const q = Math.floor(e_cl(v) * 5 + R.b4(x, y) - 0.5); pset(x, y, [hex('#14181c'), hex('#3a4046'), hex('#6a7076'), hex('#a0a6aa'), hex('#d8dcde'), hex('#f4f6f8')][e_cl(q, 0, 5)]);
    }
    for (let x = 52; x <= 256; x++) { pset(x, 38, C.blanco); pset(x, 39, C.k); pset(x, 40, C.blanco); }
    // la barra de arriba (cuadritos de color, la pila), el margen de la regla y las cifras de la profundidad
    rect(40, 30, 256, 36, hex('#1e2a3a')); for (let k = 0; k < 5; k++) rect(44 + k * 9, 32, 49 + k * 9, 34, [hex('#4a86c0'), hex('#5a6a7a'), hex('#5a6a7a'), hex('#5a6a7a'), hex('#3a8a5a')][k]);
    rect(236, 32, 248, 34, e_P.verdeP); rect(249, 33, 250, 33, e_P.verdeP);
    rect(40, 37, 51, 142, hex('#1e2a3a'));
    [['0', 46], ['1', 78], ['2', 110], ['3', 141]].forEach(([n, y]) => { R.numero(n, 43, y, { color: e_P.grisD }); linea(50, y - 4, 52, y - 4, e_P.grisD); });
    for (let y = 46; y < 142; y += 8) pset(51, y, e_P.grisC);
  });
  // el cursor que recorre la pasada y el punto rojo de grabar
  { const cx = 52 + Math.floor((t * 22) % 204); linea(cx, 41, cx, 141, e_P.verdeP); pset(cx - 1, 41, e_P.verdeP); pset(cx + 1, 41, e_P.verdeP); }
  if (Math.floor(t * 2) % 2) disco(229, 33, 2, e_P.rojoP);
  // los ecos: unas hipérbolas brillantes (blanco, negro, blanco) que con o.eco salen y se encienden en rojo
  const eco = o.eco ?? 0, ex = 168, ey = 104;
  if (eco > 0) {
    const rojo = eco > 0.7, late = rojo && Math.sin(t * 9) > 0;
    for (const [cx, cy, a, k, w] of [[ex, ey, 9, 0.45, 50], [118, 82, 6, 0.5, 30]]) for (let b = 0; b < 3; b++) for (let x = cx - w; x <= cx + w; x++) {
      const y = Math.round(cy + b * 3 + Math.sqrt(a * a + (x - cx) * (x - cx) * k) - a); if (y > 141 || h(x, b, 61) > eco * 1.6) continue;
      pset(x, y, b === 1 ? C.k : rojo ? (late ? e_P.rojoP : e_P.rojoPS) : C.blanco);
    }
    if (rojo) R.anillo(ex + 0.5, ey + 2.5, 9 + (t * 8) % 6, e_P.rojoP, 3);
  }
  return { eco: [ex, ey] };
}

// deja tranquilas la barra del año (y 0–21) y la esquina de Atom (x ≥ 272, y < 48): dos tonos casi iguales, tramados
function e_tranquilo(R, c0, c1) {
  for (let y = 0; y < 48; y++) for (let x = 0; x < 320; x++) { if (y > 21 && x < 272) continue; const f = y > 21 ? (y - 22) / 26 : 0; R.pset(x, y, R.b4(x, y) < 0.3 + f * 0.4 ? c1 : c0); }
  for (let x = 0; x < 272; x++) { R.pset(x, 22, e_mez(c1, R.pget(x, 23), 0.5)); }
}

// pinta una pieza escalada (o.s ≥ 2) con acabado de 1 px para que case con el dibujo fino del decorado: contorno oscuro,
// luz en los bordes de arriba y de la izquierda, sombra en los de abajo y de la derecha, una raya clara en cada cambio
// de color y un grano suave dentro de los bloques. caja = [x0, y0, x1, y1] donde cae la pieza
const e_tmp = new Uint32Array(320 * 180);

function e_piezaFina(R, caja, pinta) {
  e_tmp.fill(0); const prev = R.usar(e_tmp); pinta(); R.usar(prev);
  const x0 = Math.max(1, Math.round(caja[0]) - 1), y0 = Math.max(1, Math.round(caja[1]) - 1), x1 = Math.min(318, Math.round(caja[2]) + 1), y1 = Math.min(178, Math.round(caja[3]) + 1);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const i = y * 320 + x, v = e_tmp[i], l = e_tmp[i - 1], u = e_tmp[i - 320], r = e_tmp[i + 1], d = e_tmp[i + 320];
    if (!v) { if (l || u || r || d) R.pset(x, y, C.k); continue; }
    let c = v;
    if (!l || !u) c = e_mez(v, C.blanco, 0.3); else if (!r || !d) c = e_mez(v, C.k, 0.3);
    else if (l !== v || u !== v) c = e_mez(v, C.blanco, 0.14); else if (h(x, y, 140) > 0.82) c = e_mez(v, C.k, 0.1);
    R.pset(x, y, c);
  }
}

// la pared norte en escorzo: va de x 36 (cerca, y 6–160) a x 262 (lejos, y 46–128); la textura sale de la pared de frente
const e_ESC = { L: 36, Rr: 262, t0: 6, t1: 46, b0: 160, b1: 128 };

const e_escY = (x) => { const p = (x - e_ESC.L) / (e_ESC.Rr - e_ESC.L); return [e_ESC.t0 + (e_ESC.t1 - e_ESC.t0) * p, e_ESC.b0 + (e_ESC.b1 - e_ESC.b0) * p]; };

function e_segundo(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  e_fijo(R, 'segundo', () => {
    const W = e_bufPared(R), { L, Rr } = e_ESC, a = 1, b = 1 / 2.6;
    // el techo liso y oscuro
    for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 2, y >> 1, 12) > 0.93 ? e_P.techoL : e_P.techo);
    // la pared norte: cada columna lleva su trozo de la pared de frente (interpolación en perspectiva)
    for (let x = L; x <= Rr; x++) {
      const p = (x - L) / (Rr - L), u = p * b / ((1 - p) * a + p * b), [yt, yb] = e_escY(x), wx = 24 + Math.round(u * 246);
      for (let y = Math.ceil(yt); y <= Math.floor(yb); y++) { const v = (y - yt) / (yb - yt); pset(x, y, W[(26 + Math.round(v * 122)) * 320 + wx]); }
    }
    // la pared oeste, casi de canto a la izquierda (los babuinos apretados), y la del este, en sombra, con el paso al tesoro
    poligono([[0, 0], [L, 6], [L, 160], [0, 180]], (x, y) => (h(x >> 1, y >> 1, 4) > 0.9 ? C.ocreS : e_P.ocre2));
    for (let y = 30; y < 150; y += 24) for (let x = 6; x < 32; x += 9) { disco(x, y, 2, e_P.trazo); rect(x - 2, y + 2, x + 1, y + 7, e_P.trazo); }
    rect(L, 6, L, 160, C.ocreS);
    poligono([[Rr, 46], [320, 24], [320, 166], [Rr, 128]], (x, y) => (y < 50 ? (R.b4(x, y) > 0.85 ? e_P.ocre2 : C.ocreS) : h(x >> 1, y >> 1, 6) > 0.9 ? C.ocreS : e_P.ocre2));
    poligono([[282, 70], [306, 62], [306, 152], [282, 140]], e_P.negro); poligono([[284, 73], [304, 66], [304, 150], [284, 139]], hex('#2a1c14'));
    linea(Rr, 46, Rr, 128, C.ocreS);
    // el suelo de losas en perspectiva (las juntas van al punto de fuga de la derecha)
    poligono([[0, 180], [L, 160], [Rr, 128], [320, 166], [320, 180]], (x, y) => { const n = h(x >> 1, y, 22); return n > 0.88 ? e_P.sueloS : n < 0.1 ? e_P.sueloL : e_P.suelo; });
    for (let k = 0; k < 8; k++) linea(L + k * 34, e_escY(L + k * 34)[1], -40 + k * 70, 180, e_P.sueloS);
    for (const f of [0.25, 0.5, 0.75]) linea(0, 180 - f * 8, 319, 172 - f * 46, e_P.sueloS);
    // la luz de los LED: dos charcos blancos en la pared (sobre la puerta escondida) y el resto en penumbra fría
    e_luz(R, 0, 0, 319, 179, (x, y) => 1.4 - Math.min(Math.hypot((x - 110) / 70, (y - 92) / 56), Math.hypot((x - 214) / 50, (y - 92) / 42)) + (y > 150 ? 0.2 : 0), hex('#141822'), 0.7);
    e_luz(R, 60, 40, 250, 150, (x, y) => 1 - 0.25 * Math.max(0, 1 - Math.hypot((x - 120) / 60, (y - 92) / 40)), hex('#f4f8ff'), 1);
    // los dos paneles de LED en sus pies, mirando a la pared
    for (const [x, ys, yp] of [[70, 168, 70], [246, 152, 58]]) {
      R.halo(x - 1, yp + 8, 18, [hex('#4a5058'), hex('#6a7480'), hex('#9aa6b4')], 0.8);
      linea(x, yp + 14, x, ys - 4, C.k); linea(x, ys - 4, x - 7, ys, C.k); linea(x, ys - 4, x + 7, ys, C.k); linea(x, ys - 4, x, ys, C.k);
      poligono([[x - 10, yp], [x + 8, yp + 3], [x + 8, yp + 15], [x - 10, yp + 13]], C.k); poligono([[x - 9, yp + 1], [x + 7, yp + 4], [x + 7, yp + 14], [x - 9, yp + 12]], e_P.grisA);
      poligono([[x - 8, yp + 2], [x + 6, yp + 5], [x + 6, yp + 13], [x - 8, yp + 11]], e_P.ledS); for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) { pset(x - 7 + i * 3, yp + 3 + j * 3 + Math.round(i * 0.6), C.blanco); pset(x - 6 + i * 3, yp + 3 + j * 3 + Math.round(i * 0.6), e_P.led); }
      linea(x, ys, x + 30, ys + 4, C.k);
    }
    // el carro del aparato (gris y azul, nada amarillo): las ruedas pequeñas, el bastidor y las DOS ANTENAS
    rect(172, 146, 214, 149, C.k); rect(173, 146, 213, 148, e_P.grisB);
    for (const x of [176, 192, 210]) { disco(x, 151, 2.5, C.k); pset(x, 151, e_P.grisC); }
    rect(178, 112, 180, 146, e_P.grisA); rect(206, 112, 208, 146, e_P.grisA); rect(178, 130, 208, 132, e_P.grisA);
    for (const x0 of [176, 194]) { rect(x0, 104, x0 + 16, 128, C.k); rect(x0 + 1, 105, x0 + 15, 127, e_P.grisB); rect(x0 + 1, 105, x0 + 15, 106, e_P.grisC); rect(x0 + 13, 106, x0 + 15, 127, e_P.grisA);
      rect(x0 + 2, 116, x0 + 12, 118, e_P.azulE); for (let y = 108; y < 126; y += 3) pset(x0 + 4, y, e_P.grisA); }
    rect(184, 134, 202, 144, C.k); rect(185, 135, 201, 143, e_P.azulE); rect(185, 135, 201, 135, e_P.azulEL); pset(198, 138, e_P.grisD);
    // el ordenador de campaña en su soporte plegable, con el cable al carro
    linea(122, 132, 114, 158, C.k); linea(140, 132, 148, 158, C.k); linea(122, 132, 148, 158, e_P.grisA); linea(140, 132, 114, 158, e_P.grisA);
    rect(112, 129, 150, 132, C.k); rect(113, 129, 149, 131, e_P.grisB);
    rect(116, 112, 146, 129, C.k); rect(117, 113, 145, 128, e_P.azulE); rect(119, 115, 143, 126, e_P.pant);
    for (const [x, y] of [[117, 113], [145, 113], [117, 128], [145, 128]]) pset(x, y, e_P.azulEL);
    { let ax = 150, ay = 131; for (let i = 1; i <= 10; i++) { const u = i / 10, bx = Math.round(150 + 34 * u), by = Math.round(131 + 6 * u + Math.sin(u * Math.PI) * 10); linea(ax, ay, bx, by, C.k); ax = bx; ay = by; } }
  });
  // la pantalla del ordenador: el radargrama plano que corre (rayas rectas)
  for (let y = 116; y < 126; y++) { const on = Math.sin((y - 116) * 1.6) > 0; if (on) for (let x = 120; x < 143; x++) if ((x + Math.floor(t * 8)) % 23 < 20) pset(x, y, y < 119 ? e_P.grisD : e_P.grisC); }
  linea(120 + Math.floor((t * 5) % 23), 116, 120 + Math.floor((t * 5) % 23), 125, e_P.verdeP);
  // las lucecitas del carro y del panel, y el vaho de la cámara cerrada en la luz
  pset(188, 138, Math.floor(t * 3) % 2 ? e_P.verdeP : hex('#1a4a2a')); pset(192, 138, Math.floor(t * 2 + 1) % 3 ? e_P.azulEL : e_P.azulE);
  for (let k = 0; k < 18; k++) { const x = Math.round(70 + ((h(k, 1, 44) * 180 + t * (2 + k % 3)) % 180)), y = Math.round(60 + h(k, 2, 44) * 80 + Math.sin(t * 0.8 + k) * 3); if (R.pget(x, y) !== e_P.negro) pset(x, y, k % 3 ? hex('#fafcff') : e_P.ledS); }
  return { aparato: [194, 116], ordenador: [131, 120], led: [[70, 76], [246, 64]] };
}

function e_plana(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  e_fijo(R, 'plana', () => {
    // detrás, la pared pintada en penumbra (aumentada al doble y movida), más oscura arriba
    const W = e_bufPared(R);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, W[(40 + (y >> 1)) * 320 + 24 + (x >> 1)]);
    e_luz(R, 0, 0, 319, 179, (x, y) => 0.3 + y / 380, hex('#141822'), 0.92);
    e_tranquilo(R, hex('#1c1814'), hex('#221c16'));
    // la mesa plegable gris con su canto
    poligono([[0, 140], [320, 140], [320, 180], [0, 180]], (x, y) => (h(x >> 2, y, 31) > 0.9 ? e_P.grisC : e_P.grisB)); rect(0, 140, 319, 141, e_P.grisD); rect(0, 176, 319, 179, e_P.grisA);
    // el ordenador de campaña: el marco gris con las esquinas de goma azul, la pantalla y el teclado
    rect(14, 26, 200, 146, C.k); rect(15, 27, 199, 145, e_P.grisA); rect(15, 27, 199, 28, e_P.grisB);
    for (const [x, y] of [[15, 27], [191, 27], [15, 137], [191, 137]]) { rect(x, y, x + 8, y + 8, e_P.azulE); rect(x + 1, y + 1, x + 7, y + 2, e_P.azulEL); }
    rect(24, 34, 190, 138, C.k);
    poligono([[6, 180], [210, 180], [204, 146], [10, 146]], e_P.grisB); poligono([[8, 180], [208, 180], [203, 149], [12, 149]], hex('#4e5660'));
    for (let r = 0; r < 4; r++) { const y = 152 + r * 6; for (let x = 16 - r; x < 196 + r; x += 10) { rect(x, y, x + 7, y + 3, hex('#2a2e34')); rect(x, y, x + 7, y, hex('#3a4048')); } }
    // la barra de arriba y la regla de la profundidad
    rect(25, 35, 189, 41, hex('#1e2a3a')); for (let k = 0; k < 4; k++) rect(29 + k * 9, 37, 34 + k * 9, 39, k ? hex('#5a6a7a') : e_P.azulEL);
    rect(25, 42, 35, 137, hex('#1e2a3a')); [['0', 50], ['1', 80], ['2', 110], ['3', 136]].forEach(([n, y]) => R.numero(n, 27, y, { color: e_P.grisD }));
    // la pizarrita blanca en su caballete, con la bandeja y dos rotuladores
    poligono([[214, 150], [222, 150], [232, 120], [228, 120]], e_P.grisA); poligono([[290, 150], [298, 150], [286, 120], [282, 120]], e_P.grisA);
    rect(206, 62, 304, 140, C.k); rect(207, 63, 303, 139, e_P.grisC); rect(209, 65, 301, 137, hex('#f4f6f8'));
    for (let k = 0; k < 40; k++) pset(212 + Math.floor(h(k, 1, 7) * 86), 68 + Math.floor(h(k, 2, 7) * 66), hex('#dfe4ea'));
    linea(214, 128, 240, 128, hex('#c8d0dc')); linea(252, 70, 296, 72, hex('#d4dae2'));
    rect(208, 140, 302, 143, e_P.grisA); rect(208, 140, 302, 140, e_P.grisD);
    for (const [x, c] of [[226, hex('#2a8a4a')], [248, hex('#c02a2a')]]) { rect(x, 138, x + 14, 139, c); rect(x + 15, 138, x + 17, 139, C.k); }
    // en la mesa: la botella de agua, el rollo de cinta métrica y un bolígrafo
    rect(210, 148, 218, 176, C.k); rect(211, 152, 217, 175, hex('#9ac0d8')); rect(212, 153, 213, 174, hex('#e8f4fc')); rect(212, 145, 216, 148, hex('#2a6ab0'));
    disco(250, 164, 8, C.k); disco(250, 164, 7, e_P.grisA); disco(250, 164, 4, e_P.grisB); rect(256, 162, 270, 164, hex('#e8e2cc')); for (let x = 258; x < 270; x += 3) pset(x, 162, C.k);
    linea(280, 170, 306, 160, C.k); linea(280, 169, 305, 159, e_P.azulE); pset(306, 160, e_P.grisD);
  });
  // el radargrama LIMPIO: solo rayas rectas y paralelas; con o.barrido lo recorre la línea (a su izquierda ya pintado)
  const bx = 36 + Math.round((o.barrido ?? 1) * 153);
  for (let y = 42; y <= 137; y++) { const d = (y - 42) / 95, v = 0.78 - d * 0.42 + 0.22 * Math.sin((y - 42) * 0.7), q = e_cl(Math.floor(v * 4 + R.b4(0, y) * 0.6), 0, 4);
    const c = [hex('#14181c'), hex('#3a4046'), hex('#6a7076'), hex('#a0a6aa'), hex('#d8dcde')][q]; for (let x = 36; x <= Math.min(189, bx); x++) pset(x, y, c); }
  for (let x = 36; x <= Math.min(189, bx); x++) { pset(x, 42, C.blanco); pset(x, 43, C.k); }
  if (bx < 189) { for (let y = 42; y <= 137; y += 2) for (let x = bx + 4; x <= 189; x += 12) pset(x, y, hex('#1c2630')); linea(bx, 42, bx, 137, e_P.verdeP); linea(bx + 1, 42, bx + 1, 137, hex('#2a6a4a')); }
  if (Math.floor(t * 2) % 2) disco(180, 38, 1.5, e_P.rojoP);
  // las DOS MARCAS de la pizarra: cada una con su radar (icono) y, con o.marcas 0–2, el ✓ verde y luego el ✗ rojo
  const m = o.marcas ?? 2, M1 = [236, 110], M2 = [270, 110];
  for (const [x, y] of [M1, M2]) { R.icono('radar', x - 7, 76, e_P.grisA, hex('#c8d0dc'), 2); linea(x - 12, 98, x + 12, 98, hex('#c8d0dc')); }
  const trazo = (pts, f, c) => { let n = 0; const L = pts.length - 1; for (let i = 0; i < L; i++) { const u = e_cl(f * L - i); if (u <= 0) break; const [ax, ay] = pts[i], [bx2, by2] = pts[i + 1], ex = ax + (bx2 - ax) * u, ey = ay + (by2 - ay) * u;
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) linea(ax + dx, ay + dy, ex + dx, ey + dy, c); n++; } return n; };
  trazo([[M1[0] - 9, M1[1]], [M1[0] - 3, M1[1] + 7], [M1[0] + 9, M1[1] - 9]], e_cl(m), hex('#2a8a4a'));
  const m2 = e_cl(m - 1); trazo([[M2[0] - 8, M2[1] - 8], [M2[0] + 8, M2[1] + 8]], e_cl(m2 * 2), hex('#c02a2a')); trazo([[M2[0] + 8, M2[1] - 8], [M2[0] - 8, M2[1] + 8]], e_cl(m2 * 2 - 1), hex('#c02a2a'));
  return { marcas: [M1, M2], barrido: [bx, 90] };
}

// el signo de porcentaje dibujado (dos ceros y la barra), de alto a, con su contorno
function e_porciento(R, x, y, a, c, cS) {
  const r = Math.round(a * 0.2);
  for (const [cx, cy] of [[x + r + 1, y + r + 1], [x + a * 0.7 - r, y + a - r - 1]]) { R.disco(cx, cy, r + 1.5, C.k); R.disco(cx, cy, r + 0.5, c); R.disco(cx, cy, Math.max(1, r - 2), C.k); }
  for (let d = -2; d <= 2; d++) R.linea(x + a * 0.7 + d, y + 1, x + d, y + a - 1, Math.abs(d) === 2 ? C.k : d === 1 ? cS : c);
}

function e_prensa(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = PIEZAS_TU;
  e_fijo(R, 'prensa', () => {
    // el techo con el rail de focos (oscuro y tranquilo arriba)
    rect(0, 0, 319, 15, hex('#1a1a22')); for (let x = 0; x < 320; x += 8) pset(x, 6, hex('#24242e'));
    rect(0, 12, 319, 13, e_P.acero); for (const x of [40, 96, 224, 264]) { rect(x - 2, 14, x + 2, 18, C.k); rect(x - 1, 15, x + 1, 17, e_P.grisB); pset(x, 18, hex('#fff4d0')); }
    // el telón azul oscuro con sus pliegues (rayas de luz y sombra tramadas)
    for (let y = 16; y < 134; y++) for (let x = 0; x < 320; x++) { const f = Math.sin(x * 0.42 + Math.sin(y * 0.05) * 0.6), q = f > 0.55 ? 2 : f > -0.2 + (R.b4(x, y) - 0.5) * 0.3 ? 1 : 0;
      pset(x, y, [e_P.telonS, e_P.telon, e_P.telonL][q]); }
    for (let x = 0; x < 320; x++) { pset(x, 16, hex('#3a4a80')); pset(x, 17, e_P.telonS); }
    // los charcos de luz de los focos en el telón (óvalos tramados más claros) y el resplandor de la pantalla
    e_luz(R, 0, 18, 319, 133, (x, y) => { const a = Math.hypot((x - 46) / 34, (y - 80) / 46), b = Math.hypot((x - 268) / 34, (y - 80) / 46), c = Math.hypot((x - 170) / 110, (y - 66) / 56);
      return 1 - Math.max(0, 1 - Math.min(a, b)) * 0.9 - Math.max(0, 1 - c) * 0.5; }, hex('#4a5aa0'), 0.55);
    // la bambalina de arriba: terciopelo con sus ondas, el galón y el fleco dorado
    for (let y = 18; y < 27; y++) for (let x = 0; x < 320; x++) { const onda = 24 + Math.round(Math.abs(Math.sin(x * Math.PI / 32)) * 3); if (y > onda) continue;
      const f = Math.sin(x * 0.7) > 0.4; pset(x, y, y === 18 ? hex('#6a2a3a') : f ? hex('#5a1a28') : R.b4(x, y) > 0.8 ? hex('#7a2a3a') : hex('#4a1420')); }
    // (bajo Atom, x > 272, el galón y el fleco se apagan: esquina tranquila)
    for (let x = 0; x < 320; x++) { const onda = 24 + Math.round(Math.abs(Math.sin(x * Math.PI / 32)) * 3), q = x > 272;
      pset(x, onda + 1, q ? hex('#5a1a28') : x % 2 ? C.oro : hex('#a87a28')); if (x % 3 === 0 && !q) pset(x, onda + 2, hex('#8a6420')); pset(x, 20, q ? hex('#5a1a28') : x % 4 < 2 ? hex('#c89838') : hex('#8a6420')); }
    // el pictograma de la máscara en el telón, a los dos lados, con su halo dorado tenue
    for (const x of [46, 268]) { R.halo(x, 72, 22, [hex('#2a3460'), hex('#34406e')], 0.9); P.mascara?.(R, x, 88, {}); }
    // la pantalla grande: el marco negro, el fondo azul, la rejilla y la barra del 90 % de abajo
    rect(98, 26, 242, 104, C.k); rect(100, 28, 240, 102, hex('#14204a'));
    for (let y = 29; y < 102; y++) for (let x = 101; x < 240; x++) if (((x - 100) % 12 === 0 || (y - 28) % 12 === 0) && R.b4(x, y) > 0.4) pset(x, y, hex('#1e2c5a'));
    rect(112, 90, 228, 95, C.k); rect(113, 91, 227, 94, hex('#1e2c5a'));
    rect(160, 104, 180, 108, C.k); rect(166, 108, 174, 128, hex('#2a2a34'));
    // la tarima: moqueta con su dibujo, el canto y el suelo de la sala
    for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) { const n = (x + y * 2) % 12 < 2 || (x - y * 2 + 600) % 12 < 2; pset(x, y, n ? e_P.moquetaL : h(x >> 1, y, 3) > 0.9 ? e_P.moquetaS : e_P.moqueta); }
    rect(0, 134, 319, 135, e_P.moquetaS);
    // las cámaras de televisión en sus trípodes, a los lados
    for (const [x, d] of [[18, 1], [302, -1]]) { linea(x, 112, x - 8, 150, C.k); linea(x, 112, x + 8, 150, C.k); linea(x, 112, x, 148, C.k);
      rect(x - 8, 98, x + 8, 112, C.k); rect(x - 7, 99, x + 7, 111, e_P.grisA); rect(x - 7, 99, x + 7, 100, e_P.grisB); rect(x + d * 8, 101, x + d * 12, 109, C.k); rect(x + d * 9, 102, x + d * 11, 108, e_P.azulE); rect(x - 2, 95, x + 2, 98, C.k); }
    // las sillas de los ponentes, detrás de la mesa
    // (llegan a y 134: con la mesa más baja de o.mesa no queda hueco)
    for (const x of [84, 120, 160, 200, 236]) { rect(x - 7, 104, x + 7, 134, C.k); rect(x - 6, 105, x + 6, 133, hex('#2a2a3a')); rect(x - 6, 105, x + 6, 106, hex('#3e3e52'));
      for (let y = 109; y < 133; y += 4) { pset(x - 4, y, hex('#22222e')); pset(x + 4, y + 2, hex('#22222e')); } rect(x + 5, 107, x + 5, 132, hex('#1e1e28')); pset(x - 5, 106, hex('#5a5a70')); }
    rect(166, 128, 174, 134, hex('#2a2a34'));
    // los cables de las cámaras por la moqueta, con su cinta, y la luz roja de piloto de la tarima
    for (const [x0, x1] of [[18, 70], [302, 250]]) { let ax = x0, ay = 150; for (let i = 1; i <= 12; i++) { const u = i / 12, bx = Math.round(x0 + (x1 - x0) * u), by = Math.round(150 + u * 8 + Math.sin(u * 7) * 2); linea(ax, ay, bx, by, hex('#141018')); ax = bx; ay = by; }
      rect(Math.round((x0 + x1) / 2) - 2, 154, Math.round((x0 + x1) / 2) + 2, 156, hex('#4a4a52')); }
    for (let x = 0; x < 320; x += 2) pset(x, 136, hex('#6a2a38'));
  });
  // la cifra que sube (o.cifra 0–1: de 0 a 90) con su barra, y el brillo de la pantalla que respira
  const n = Math.round(90 * (o.cifra ?? 1));
  { const s = String(n), w = s.length * 32; R.numero(s, 162 - (w + 26) / 2 + 2, 82, { tam: 32, rampa: [hex('#fff8e0'), hex('#f8e8a8'), hex('#e8c860'), hex('#c89838')] }); e_porciento(R, 162 + (w - 26) / 2 + 8, 52, 30, hex('#f8e8a8'), hex('#c89838')); }
  rect(113, 91, 113 + Math.round(114 * n / 100), 94, n >= 90 && Math.sin(t * 6) > 0 ? hex('#7ad0ff') : hex('#4a9ae0'));
  for (let k = 0; k < 6; k++) pset(104 + Math.floor((t * 17 + k * 23) % 132), 31 + (k * 11) % 66, hex('#2a3a70'));
  // las lucecitas rojas de las cámaras de televisión
  for (const x of [14, 306]) if (Math.floor(t * 1.5 + x) % 2) pset(x, 100, e_P.rojoP);
  // las motas de polvo que flotan en los haces de los focos y el brillo que recorre el canto de la pantalla
  for (let k = 0; k < 14; k++) { const cx = k % 2 ? 268 : 46, x = Math.round(cx - 20 + ((h(k, 1, 57) * 40 + Math.sin(t * 0.7 + k) * 6) % 40)), y = Math.round(40 + ((h(k, 2, 57) * 80 + t * (2 + k % 3)) % 80));
    if (Math.floor(t * 2 + k) % 4) pset(x, y, hex('#8a9ad0')); }
  { const u = (t * 0.25) % 1.6; if (u < 1) pset(Math.round(99 + u * 142), 26, hex('#6a7ab8')); }
  return { mesa: o.mesa ?? 127, pantalla: [100, 28, 240, 102], sillas: [84, 120, 160, 200, 236] };
}
// los flashes: estrellas blancas que estallan en el tiempo (cada cámara, a su ritmo); f = intensidad de o.flash
function e_flashes(R, t, f, sitios) {
  if (!f) return;
  sitios.forEach(([x, y], k) => { const per = 1.1 + h(k, 4, 9) * 1.6, ph = ((t + h(k, 5, 9) * 3) % per) / per; if (ph > 0.14 * f) return;
    const r = Math.round((1 - ph / 0.14) * 6) + 2; R.halo(x, y, r + 4, [hex('#c8d8ff'), C.blanco], 1.3);
    R.linea(x - r, y, x + r, y, C.blanco); R.linea(x, y - r, x, y + r, C.blanco); R.linea(x - r / 2, y - r / 2, x + r / 2, y + r / 2, hex('#e8f0ff')); R.linea(x - r / 2, y + r / 2, x + r / 2, y - r / 2, hex('#e8f0ff')); R.disco(x, y, 1.5, C.blanco); });
}

function e_prensaDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, M = Math.round(o.mesa ?? 127), d = M - 127;
  // la mesa larga: el tablero (con el canto, la luz y el reflejo de las botellas), el faldón azul con su ribete y los
  // pliegues (luz y sombra tramadas, más oscuro abajo)
  rect(58, M, 262, M + 3, C.k); rect(59, M, 261, M + 1, hex('#e8e4dc')); rect(59, M + 2, 261, M + 2, hex('#b8b4ac'));
  for (let x = 62; x < 258; x += 9) pset(x, M + 1, hex('#f8f6f0'));
  for (let y = M + 4; y < 152; y++) for (let x = 60; x < 261; x++) { const f = Math.sin(x * 0.6), q = (y - M) / (152 - M);
    pset(x, y, f > 0.75 ? e_P.telonL : f > 0.5 ? (R.b4(x, y) > 0.5 ? e_P.telonL : e_P.telon) : f < -0.8 || q > 0.85 && R.b4(x, y) < q - 0.5 ? e_P.telonS : e_P.telon); }
  rect(60, M + 6, 260, M + 7, hex('#8aa8d8')); for (let x = 60; x < 261; x += 2) pset(x, M + 8, hex('#c89838'));
  rect(58, M + 4, 59, 152, C.k); rect(261, M + 4, 262, 152, C.k); rect(60, 151, 260, 152, e_P.telonS);
  // los micrófonos de cuello, las botellas de agua, los vasos y las tarjetas en blanco (sin letras)
  // (entre los asientos, para no tapar caras: el micrófono a la izquierda de cada uno, la botella a la derecha; las
  // tarjetas, colgadas en el faldón)
  for (const x of [84, 120, 160, 200, 236]) {
    linea(x - 10, 126 + d, x - 12, 116 + d, C.k); linea(x - 12, 116 + d, x - 10, 113 + d, C.k); disco(x - 10, 112 + d, 1.5, e_P.grisA); rect(x - 13, 125 + d, x - 8, 126 + d, C.k);
    pset(x - 10, 125 + d, Math.floor(t * 0.8 + x) % 3 ? hex('#3a8a4a') : e_P.verdeP);
    rect(x + 10, 119 + d, x + 13, 126 + d, hex('#8ac0e0')); rect(x + 10, 117 + d, x + 13, 118 + d, hex('#2a6ab0')); pset(x + 11, 121 + d, C.blanco); rect(x + 10, 124 + d, x + 13, 126 + d, hex('#6aa0c8'));
    rect(x + 15, 123 + d, x + 17, 126 + d, hex('#c8d8e4')); pset(x + 16, 124 + d, C.blanco);
    rect(x - 8, 136 + d, x + 8, 143 + d, C.k); rect(x - 7, 137 + d, x + 7, 142 + d, hex('#f4f4f0')); rect(x - 5, 139 + d, x + 5, 139 + d, hex('#b8b8b0')); rect(x - 5, 141 + d, x + 2, 141 + d, hex('#c8c8c0'));
    rect(x - 7, 143 + d, x + 7, 143 + d, e_P.telonS);
  }
  // los periodistas de espaldas (abajo): cabezas, hombros, cámaras en alto, con los flashes
  const sitios = [];
  for (let k = 0; k < 9; k++) {
    const x = 14 + k * 37 + Math.round(h(k, 1, 51) * 8), y = 168 + Math.round(h(k, 2, 51) * 6) + Math.round(Math.sin(t * 1.3 + k) * 0.6);
    const ropa = [hex('#3a4a6a'), hex('#5a3a3a'), hex('#3a5a4a'), hex('#4a4a52'), hex('#6a5a3a')][k % 5], pelo = [hex('#2a1c14'), hex('#5a3a1c'), hex('#1c1c24'), hex('#8a6a3a')][k % 4];
    disco(x, y + 12, 11, C.k); disco(x, y + 12, 10, ropa); rect(x - 10, y + 12, x + 10, 179, ropa);
    disco(x, y, 6, C.k); disco(x, y, 5, pelo); pset(x - 2, y - 3, e_mez(pelo, C.blanco, 0.25));
    if (k % 2 === 0) { const cx = x + (k % 4 ? -6 : 6), cy = y - 12; rect(cx - 6, cy - 4, cx + 6, cy + 4, C.k); rect(cx - 5, cy - 3, cx + 5, cy + 3, e_P.grisA); disco(cx, cy, 2.5, C.k); disco(cx, cy, 1.5, e_P.azulE); rect(cx - 3, cy - 6, cx + 1, cy - 4, C.k);
      linea(x + (k % 4 ? -4 : 4), y + 4, cx, cy + 4, ropa); sitios.push([cx - 2, cy - 6]); }
    else if (k % 3 === 1) { linea(x + 5, y + 6, x + 10, y - 6, ropa); rect(x + 9, y - 10, x + 12, y - 5, C.k); pset(x + 10, y - 9, e_P.rojoP); }
  }
  e_flashes(R, t, o.flash ?? 1, sitios);
}
// una cabecita de frente (6–9 px) con su pelo y su ropa; la luz azul de la pantalla en la cara
function e_cara(R, x, y, r, piel, pelo, ropa) {
  R.disco(x, y + r * 2 + 1, r * 1.6, ropa); R.disco(x, y, r + 0.5, C.k); R.disco(x, y, r - 0.4, piel);
  R.rect(x - r + 1, y - r + 1, x + r - 1, y - r + 2, pelo); R.pset(x - r + 1, y - r + 3, pelo); R.pset(x + r - 1, y - r + 3, pelo);
  if (r >= 3) { R.pset(x - 1, y, C.k); R.pset(x + 1, y, C.k); R.pset(x + r - 2, y - 1, hex('#bcd8ff')); }
}

function e_publico(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  e_fijo(R, 'publico', () => {
    // la pared del fondo de la sala (paneles de madera oscura con sus juntas) y la puerta con su luz verde de salida
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const j = x % 40 === 0 || y === 60; pset(x, y, j ? hex('#2a1e18') : h(x >> 1, y >> 2, 8) > 0.85 ? hex('#4a3426') : hex('#3e2c20')); }
    rect(0, 0, 319, 18, hex('#1e1a1e')); for (let x = 10; x < 320; x += 50) { rect(x, 16, x + 14, 18, hex('#3a3a44')); rect(x + 2, 18, x + 12, 18, hex('#fff4d0')); }
    rect(20, 40, 48, 100, C.k); rect(22, 42, 46, 100, hex('#5a4030')); rect(24, 44, 33, 98, hex('#6a4c38')); rect(35, 44, 44, 98, hex('#6a4c38')); pset(33, 72, C.oro); pset(35, 72, C.oro);
    rect(26, 32, 42, 37, C.k); rect(27, 33, 41, 36, hex('#2a8a4a')); R.icono('mano', 31, 33, C.blanco, hex('#1a5a2a'), 1);
    // los paneles acústicos (recuadros con su bisel), los apliques con su abanico de luz en la pared, la canaleta de
    // cables y la rejilla del aire (nada bajo Atom, x > 272 e y < 46)
    for (let x = 52; x < 320; x += 40) for (const y0 of [22, 62]) { if (x > 260 && y0 < 46) continue; const x1 = x + 32, y1 = y0 + (y0 < 40 ? 34 : 34);
      rect(x, y0, x1, y1, hex('#2e2018')); rect(x + 1, y0 + 1, x1 - 1, y1 - 1, hex('#4a3628')); rect(x + 1, y0 + 1, x1 - 1, y0 + 1, hex('#5a4434')); rect(x + 1, y0 + 1, x + 1, y1 - 1, hex('#5a4434'));
      for (let yy = y0 + 4; yy < y1 - 2; yy += 3) for (let xx = x + 4; xx < x1 - 3; xx += 3) pset(xx, yy, hex('#3a2a20')); }
    for (const x of [130, 210]) { for (let y = 20; y < 58; y++) { const hw = Math.round((44 - y) * 0.6); if (hw < 1 || y > 42) continue; for (let i = -hw; i <= hw; i++) if (R.b4(x + i, y) < 0.35 - Math.abs(i) / hw * 0.2) pset(x + i, y, hex('#7a5a40')); }
      for (let y = 46; y < 70; y++) { const hw = Math.round((y - 46) * 0.6); for (let i = -hw; i <= hw; i++) if (R.b4(x + i, y) < 0.3 - Math.abs(i) / Math.max(1, hw) * 0.2) pset(x + i, y, hex('#6a4c36')); }
      rect(x - 4, 42, x + 4, 47, C.k); rect(x - 3, 43, x + 3, 46, hex('#e8d0a0')); rect(x - 3, 43, x + 3, 43, hex('#fff4d0')); }
    rect(0, 58, 319, 60, hex('#1e1612')); rect(0, 58, 319, 58, hex('#4a3a2e'));
    rect(250, 84, 272, 94, C.k); for (let y = 85; y < 94; y += 2) rect(251, y, 271, y, hex('#5a5a62'));
    rect(0, 100, 319, 179, hex('#2a2430'));
    // el suelo de la sala en penumbra, la luz de la pantalla (azulada) sobre la gente
    e_luz(R, 0, 0, 319, 179, (x, y) => 0.5 + y / 300, hex('#0e1020'), 0.8);
  });
  // las filas de periodistas: los de atrás pequeños y quietos; los de delante más grandes, con cámaras, grabadoras y pértigas
  const sitios = [], PIEL = [hex('#f0c8a0'), hex('#c8906a'), hex('#8a5a3a'), hex('#e8b890')], PELO = [hex('#2a1c14'), hex('#5a3a1c'), hex('#1c1c24'), hex('#c8a060'), hex('#8a8a8a')], ROPA = [hex('#3a4a6a'), hex('#5a3a3a'), hex('#3a5a4a'), hex('#4a4a52'), hex('#6a5a3a'), hex('#2a3a5a')];
  const filas = [[74, 3, 15, 0], [96, 3, 14, 1], [120, 4, 12, 2], [146, 5, 10, 3]];
  filas.forEach(([y, r, n, f]) => { for (let k = 0; k < n; k++) {
    const x = Math.round(12 + (k + (f % 2) * 0.5) * (300 / n)), i = k * 7 + f * 3, by = y + Math.round(Math.sin(t * 1.1 + i) * (f > 1 ? 0.7 : 0.3));
    e_cara(R, x, by, r, PIEL[i % 4], PELO[i % 5], ROPA[i % 6]);
    if (f >= 2 && (k + f) % 3 === 0) { const cx = x + (k % 2 ? 4 : -4), cy = by - r - 5; rect(cx - 5, cy - 3, cx + 5, cy + 3, C.k); rect(cx - 4, cy - 2, cx + 4, cy + 2, e_P.grisA); disco(cx, cy, 2, C.k); disco(cx, cy, 1, e_P.azulEL); sitios.push([cx - 3, cy - 4]); }
    else if (f >= 1 && (k + f) % 4 === 1) { linea(x + r + 1, by + r, x + r + 4, by - r - 4, ROPA[i % 6]); rect(x + r + 3, by - r - 8, x + r + 5, by - r - 4, C.k); pset(x + r + 4, by - r - 7, e_P.rojoP); sitios.push([x + r + 4, by - r - 9]); }
    else if (f < 2 && (k + f) % 5 === 2) sitios.push([x, by - r - 2]);
  } });
  // las pértigas con micrófono de pelo que asoman por arriba y se mecen
  for (const [x0, k] of [[60, 0], [250, 1]]) { const sw = Math.sin(t * 0.9 + k * 2) * 4, x1 = 120 + k * 60 + sw, y1 = 40 + k * 6; linea(x0, 120, x1, y1, e_P.grisA); linea(x0 + 1, 120, x1 + 1, y1, e_P.grisB);
    disco(x1, y1 + 3, 5, C.k); disco(x1, y1 + 3, 4, hex('#8a8478')); for (let i = 0; i < 7; i++) pset(Math.round(x1 - 3 + i), Math.round(y1 + (i % 2 ? 0 : 1)), hex('#a8a090')); }
  e_flashes(R, t, o.flash ?? 1, sitios);
  return { filas: filas.map(([y]) => y) };
}
function e_publicoDelante(R, t, o) {
  const { rect, pset, disco, linea } = R;
  // el borde de la mesa con los micrófonos de espaldas, una botella y unos papeles
  rect(0, 170, 319, 179, C.k); rect(0, 171, 319, 179, hex('#d8d4cc')); rect(0, 171, 319, 171, C.blanco); for (let x = 3; x < 320; x += 7) pset(x, 176, hex('#c0bcb4'));
  for (const x of [70, 160, 250]) { linea(x, 171, x - 3, 156, C.k); linea(x + 1, 171, x - 2, 156, e_P.grisA); disco(x - 3, 155, 2.5, C.k); disco(x - 3, 155, 1.5, e_P.grisB); rect(x - 3, 169, x + 4, 171, C.k); }
  rect(110, 158, 116, 172, C.k); rect(111, 160, 115, 171, hex('#8ac0e0')); rect(111, 157, 115, 158, hex('#2a6ab0')); pset(112, 163, C.blanco);
  for (let k = 0; k < 3; k++) { rect(196 + k * 3, 166 - k, 230 + k * 2, 171, C.k); rect(197 + k * 3, 167 - k, 229 + k * 2, 170, k % 2 ? hex('#f4f4f0') : hex('#e8e8e0')); }
}

// lo de delante en 'pared': la caja de herramientas grande (roja, abierta, con llaves), la maleta negra y el rollo de cable
function e_paredDelante(R, t, o) {
  const { rect, pset, disco, linea } = R;
  rect(2, 160, 48, 179, C.k); rect(3, 161, 47, 179, hex('#6a1e1a')); rect(3, 161, 47, 162, hex('#8a2a24')); rect(3, 168, 47, 168, hex('#4a1410'));
  rect(4, 154, 46, 160, C.k); rect(5, 155, 45, 159, hex('#5a1a16')); for (let x = 8; x < 44; x += 6) { rect(x, 151, x + 1, 156, e_P.grisC); pset(x, 150, e_P.grisD); }
  rect(20, 171, 30, 173, e_P.grisB); rect(36, 150, 44, 152, e_P.grisC);
  rect(272, 162, 318, 179, C.k); rect(273, 163, 317, 179, hex('#24242a')); rect(273, 163, 317, 163, hex('#3a3a44')); for (const x of [282, 306]) { rect(x - 2, 166, x + 2, 169, e_P.grisC); pset(x, 167, C.k); }
  for (let y = 170; y < 180; y += 3) rect(274, y, 316, y, hex('#1c1c22'));
  for (let k = 0; k < 4; k++) R.anillo(232, 174, 10 - k * 1.6, k % 2 ? hex('#1a1a1a') : hex('#3a3a3a'));
  linea(222, 172, 200, 179, C.k);
}

// lo de delante en 'segundo': el SARCÓFAGO cerrado en primer plano (izquierda) y la caja del equipo (gris y azul)
function e_segundoDelante(R, t, o) {
  const { rect, pset } = R;
  e_piezaFina(R, [1, 144, 79, 182], () => PIEZAS_TU.sarcofago?.(R, 40, 182, { s: 2 }));
  rect(250, 160, 316, 179, C.k); rect(251, 161, 315, 179, e_P.grisA); rect(251, 161, 315, 162, e_P.grisB); rect(251, 170, 315, 171, hex('#2e343c'));
  for (const x of [262, 304]) { rect(x - 3, 164, x + 3, 168, C.k); rect(x - 2, 165, x + 2, 167, e_P.azulE); }
  rect(278, 156, 290, 160, C.k); rect(279, 157, 289, 159, e_P.grisB);
}

// el borde del cañón de enfrente: x de su cara a la altura y (la pared donde rebota la onda)
const e_caraCanon = (y) => 214 + Math.round(Math.sin(y * 0.11) * 4 + Math.sin(y * 0.31) * 2 + (y - 60) * 0.12);

// una mata de enebro (tres tonos), de radio r
function e_enebro(R, x, y, r, t = 0) {
  const sw = Math.round(Math.sin(t * 1.5 + x) * 0.6);
  R.disco(x, y, r, e_P.enebroS); R.disco(x - 1 + sw, y - 1, r - 1, e_P.enebro); R.disco(x - 2 + sw, y - 2, Math.max(1, r - 3), hex('#6a8a4a'));
  R.linea(x, y + r - 1, x, y + r + 2, hex('#5a3a24'));
}

function e_canon(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  e_fijo(R, 'canon', () => {
    // el cielo tramado (azul arriba, crema junto al horizonte)
    e_cieloT(R, 0, 96, [hex('#6aa8d8'), hex('#8ac0e4'), hex('#b4d6ec'), hex('#ead8c0')]); rect(0, 97, 319, 179, e_P.brumaS);
    // las mesetas lejanas (tres términos, cada vez más claras), con sus capas
    const capas = (y, cols, k) => { const n = R.vnoise(y * 0.3, k); return n > 0.62 ? cols[2] : n < 0.35 ? cols[0] : cols[1]; };
    poligono([[0, 96], [20, 74], [60, 72], [70, 80], [140, 78], [150, 66], [200, 64], [210, 76], [260, 76], [270, 70], [320, 70], [320, 120], [0, 120]], (x, y) => capas(y, [e_P.brumaS, e_P.bruma, hex('#f8d8bc')], 1));
    poligono([[90, 120], [96, 92], [130, 90], [136, 100], [180, 98], [186, 88], [214, 86], [250, 86], [250, 140], [90, 140]], (x, y) => capas(y, [hex('#c87858'), hex('#d89070'), hex('#e8a888')], 2));
    // el fondo del cañón: el río verde azulado entre peñas en sombra
    poligono([[110, 180], [118, 150], [150, 140], [250, 136], [250, 180]], (x, y) => capas(y, [e_P.rocaRD, hex('#7a3420'), e_P.rocaRS], 3));
    poligono([[132, 180], [150, 170], [170, 166], [196, 164], [214, 160], [214, 172], [190, 176], [170, 180]], (x, y) => (h(x >> 1, y, 4) > 0.8 ? e_P.rioL : e_P.rio));
    // la pared de enfrente (derecha): roca roja en capas con vetas, grietas y su cornisa; arriba, a y ≥ 50 bajo Atom
    poligono([[e_caraCanon(50), 50], [250, 52], [320, 48], [320, 180], [e_caraCanon(180), 180]], (x, y) => {
      let col = e_estrato(R, x, y, 13);
      if (x - e_caraCanon(y) < 3) col = e_P.rocaRL; else if (x - e_caraCanon(y) < 6) col = e_mez(col, e_P.rocaRL, 0.4);
      return col; });
    for (let y = 52; y < 180; y++) { const xe = e_caraCanon(y); pset(xe, y, C.k); }
    for (const [x, y, l] of [[250, 70, 30], [290, 96, 40], [236, 128, 26]]) { let xx = x; for (let i = 0; i < l; i++) { pset(xx, y + i, e_P.rocaRD); xx += h(x, i, 8) > 0.6 ? 1 : h(x, i, 9) > 0.7 ? -1 : 0; } }
    rect(220, 48, 319, 49, hex('#f0a070')); for (let x = 222; x < 320; x += 9) e_enebro(R, x + Math.round(h(x, 1) * 5), 47, 3);
    // la pared de este lado (izquierda) con la REPISA donde está el que grita
    poligono([[0, 34], [30, 40], [60, 52], [96, 70], [118, 96], [124, 140], [128, 150], [0, 150]], (x, y) => {
      const col = e_estrato(R, x, y, 14);
      return e_mez(col, e_P.rocaRD, 0.12 + Math.max(0, x - 80) / 400); });
    poligono([[0, 150], [128, 150], [132, 158], [120, 180], [0, 180]], (x, y) => (y < 153 ? hex('#f0a878') : h(x >> 1, y, 15) > 0.85 ? e_P.rocaRS : e_P.rocaR));
    for (let x = 0; x < 130; x++) pset(x, 150, e_P.rocaRL);
    linea(128, 150, 132, 158, C.k); linea(132, 158, 120, 180, e_P.rocaRD);
    // en la repisa: un hito de piedras, un enebro y unas piedras sueltas
    for (const [x, y, r] of [[22, 147, 4], [22, 141, 3], [21, 136, 2]]) { disco(x, y, r, e_P.rocaRS); disco(x - 1, y - 1, r - 1, e_P.rocaRL); }
    e_enebro(R, 112, 142, 6); for (const [x, y] of [[70, 152], [86, 156], [50, 158], [102, 162]]) { rect(x, y, x + 2, y + 1, e_P.rocaRS); pset(x, y, e_P.rocaRL); }
  });
  // las nubes de tres tonos a tres velocidades y dos cuervos que planean sobre el cañón
  R.recorte([0, 0, 272, 179]); e_nubes(R, t, 22, [hex('#c8d8e8'), hex('#eef4f8'), C.blanco], -40, 360, 5); R.recorte(null);
  for (let k = 0; k < 2; k++) { const a = t * 0.35 + k * 3; e_ave(R, 170 + Math.cos(a) * (30 + k * 10), 70 + Math.sin(a) * 10, t, hex('#2a2024'), k); }
  // el brillo del río que corre
  for (let k = 0; k < 6; k++) pset(150 + ((k * 13 + Math.floor(t * 6)) % 60), 168 + (k % 3) * 2, C.blanco);
  // la ONDA: arcos que salen de la boca (o.onda 0–1), chocan con la pared de enfrente y VUELVEN más débiles (o.vuelve)
  const boca = o.boca ?? [80, 136], eco = [e_caraCanon(118) - 2, 118], dist = eco[0] - boca[0];
  const arco = (cx, cy, r, a0, a1, c, punteo) => { for (let a = a0; a <= a1; a += 0.5 / r) { if (punteo && Math.floor(a * r / 3) % 2) continue; const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 1.1);
    if (x < eco[0] + 1) { pset(x + (cx < eco[0] ? 1 : -1), y, e_P.rocaRD); pset(x, y, c); pset(x - (cx < eco[0] ? 1 : -1), y, c); } } };
  const on = o.onda ?? 0, vu = o.vuelve ?? 0;
  if (on > 0 && on < 1.02 && vu <= 0) for (let i = 0; i < 4; i++) { const r = on * dist - i * 9; if (r > 4) arco(boca[0], boca[1], r, -0.55 + i * 0.05, 0.55 - i * 0.05, [C.blanco, hex('#fff4d8'), hex('#f8dcb8'), hex('#f0c8a0')][i], false); }
  if (on >= 0.95 && vu <= 0.05) { const f = Math.sin(t * 20) > 0; disco(eco[0], eco[1], 3, f ? C.blanco : hex('#ffe0b0')); }
  if (vu > 0) for (let i = 0; i < 3; i++) { const r = vu * dist - i * 10; if (r > 4) arco(eco[0], eco[1], r, Math.PI - 0.45, Math.PI + 0.45, [hex('#fff0c8'), hex('#f8dcb0'), hex('#f0c8a0')][i], true); }
  // la burbuja del eco junto a la pared: lo mismo, más pequeño (tres arquitos)
  if (vu > 0.15) { const bx = eco[0] - 26, by = eco[1] - 30 + Math.round(Math.sin(t * 3)), s = e_cl((vu - 0.15) * 4);
    if (s > 0) { R.disco(bx, by, 7 * s + 1, C.k); R.disco(bx, by, 7 * s, C.blanco); pset(bx + 3, by + 8, C.k); pset(bx + 4, by + 9, C.k);
      if (s >= 1) for (let i = 0; i < 3; i++) arco(bx - 4, by, 2 + i * 2, -0.7, 0.7, hex('#c86a4a'), false); } }
  return { boca, eco, rio: [174, 170] };
}

// lo de delante en 'canon': una rama de enebro que se mece en la esquina de abajo a la derecha
function e_canonDelante(R, t, o) {
  const sw = Math.round(Math.sin(t * 1.4) * 2);
  R.linea(319, 168, 296 + sw, 176, hex('#5a3a24')); R.linea(319, 169, 296 + sw, 177, hex('#3a2418'));
  for (const [x, y, r] of [[300, 172, 5], [308, 168, 6], [316, 172, 5], [296, 178, 4]]) e_enebro(R, x + sw, y, r, t);
}

function e_roca(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, SUP = 56, CAM = 124, mat = o.material === 'aire' ? 'aire' : 'escombro';
  e_fijo(R, 'roca', () => {
    // encima de la superficie: el cielo del desierto y unas colinas lejanas
    e_cieloT(R, 0, SUP, [hex('#8ac0e4'), hex('#b4d6ec'), hex('#f0e0c8')]);
    poligono([[0, SUP], [0, 46], [40, 42], [90, 46], [150, 40], [210, 44], [270, 46], [320, 44], [320, SUP]], (x, y) => (y < 47 ? hex('#e8c8a0') : hex('#dcb488')));
    // la caliza en capas (el rayado del corte del monte): vetas, fósiles, grietas
    for (let y = SUP; y < 180; y++) for (let x = 0; x < 320; x++) {
      const capa = Math.floor((y - SUP + Math.sin(x * 0.03) * 3) / 13), n = h(x >> 1, y, 40 + capa), base = [C.caliza, C.calizaL, C.caliza, C.calizaS, C.caliza, C.calizaL, C.caliza, C.calizaS, C.caliza, C.calizaL][capa % 10];
      let c = base; if (n > 0.94) c = C.calizaS; else if (n < 0.04) c = C.calizaL; if (((y - SUP + Math.round(Math.sin(x * 0.03) * 3)) % 13) === 0) c = C.calizaS; pset(x, y, c);
    }
    for (const [x, y] of [[40, 80], [210, 150], [290, 70], [70, 160]]) { R.anillo(x + 0.5, y + 0.5, 2.5, C.calizaS); pset(x, y, C.calizaS); }
    for (const [x, y, l] of [[100, 60, 18], [230, 100, 22], [180, 140, 20]]) { let xx = x; for (let i = 0; i < l; i++) { pset(xx, y + i, hex('#7a5a3a')); xx += h(x, i, 2) > 0.6 ? 1 : h(x, i, 3) > 0.7 ? -1 : 0; } }
    // la superficie (arena con piedrecitas)
    rect(0, SUP, 319, SUP + 2, C.arena); rect(0, SUP + 3, 319, SUP + 3, C.arenaS); for (let x = 3; x < 320; x += 11) pset(x + Math.floor(h(x, 1) * 6), SUP - 1, C.arenaS);
    // la regla de la profundidad (izquierda) con sus metros
    rect(8, SUP, 20, 178, C.k); rect(9, SUP, 19, 178, hex('#f4ecd0')); for (let y = SUP; y < 178; y += 4) rect(9, y, (y - SUP) % 20 ? 12 : 15, y, C.k);
    [['0', SUP + 9], ['1', SUP + 49], ['2', SUP + 89]].forEach(([n, y]) => R.numero(n, 13, y, { color: e_P.rojoE, sombra: false }));
  });
  // el CAMBIO DE MATERIAL: una franja de aire oscuro (o.material 'aire') o de escombro punteado ('escombro')
  for (let y = CAM; y < CAM + 16; y++) for (let x = 24; x < 320; x++) {
    if (mat === 'aire') pset(x, y, (y === CAM || y === CAM + 15) ? C.k : h(x >> 1, y >> 1, 66) > 0.94 ? hex('#3a3040') : hex('#1a1420'));
    else { const n = h(x >> 2, y >> 2, 67), m = h(x, y, 68); pset(x, y, (y === CAM || y === CAM + 15) ? hex('#5a3a24') : n > 0.6 ? (m > 0.5 ? C.calizaL : C.caliza) : n > 0.3 ? C.calizaS : hex('#6a4a30')); }
  }
  if (mat === 'aire') for (let k = 0; k < 8; k++) pset(30 + Math.floor((h(k, 1, 6) * 280 + t * 6) % 280), CAM + 3 + Math.floor(h(k, 2, 6) * 10), hex('#6a5a6a'));
  // el radar de mano en la superficie, con su lucecita
  const RX = 150; e_piezaFina(R, [131, 23, 169, 57], () => PIEZAS_TU.radarMano?.(R, RX, SUP + 1, { t, dir: 1, s: 2 }));
  // la ONDA (o.onda 0–1): baja como un arco hasta el cambio (0–0.5), rebota con un chispazo y vuelve más débil (0.5–1)
  const on = o.onda ?? 0, D = CAM - SUP - 2, y0 = SUP + 2;
  const arco = (cy, r, abajo, c, punteo) => { const s = abajo ? 1 : -1; for (let a = 0.35; a <= Math.PI - 0.35; a += 0.5 / r) { if (punteo && Math.floor(a * r / 3) % 2) continue; const x = Math.round(RX + Math.cos(a) * r * 1.3), y = Math.round(cy + s * Math.sin(a) * r); if (y >= SUP + 3 && y <= CAM) { pset(x, y - s, hex('#7a5a3a')); pset(x, y, c); pset(x, y + s, c); } } };
  linea(RX, y0, RX, CAM, (x, y, k) => (k % 4 < 2 ? hex('#fff8e0') : null));
  if (on > 0 && on <= 0.5) for (let i = 0; i < 3; i++) { const r = on * 2 * D - i * 6; if (r > 3) arco(y0, r, true, [C.blanco, hex('#fff0b0'), hex('#ffe08a')][i], false); }
  if (on > 0.46 && on < 0.6) { const f = 1 - Math.abs(on - 0.53) / 0.07; for (let a = 0; a < 6; a++) linea(RX, CAM, RX + Math.round(Math.cos(a * 1.05) * 8 * f), CAM + Math.round(Math.sin(a * 1.05) * 4 * f), C.blanco); disco(RX, CAM, 2, hex('#fff4a0')); }
  if (on > 0.5) for (let i = 0; i < 2; i++) { const r = (on - 0.5) * 2 * D - i * 8; if (r > 3) arco(CAM, r, false, i ? hex('#ffd890') : hex('#fff8d0'), true); }
  if (on >= 1) { const f = Math.sin(t * 12) > 0; disco(RX, SUP + 2, 2, f ? e_P.verdeP : C.blanco); }
  // el CRONÓMETRO grande: la esfera, las marcas, la aguja que da vueltas con la onda y la cuenta (números que corren)
  const [cx, cy] = [266, 104], r = 24, n = Math.round(e_cl(on) * 60);
  disco(cx + 3, cy + 3, r + 2, hex('#7a5a3a')); disco(cx, cy, r + 2, C.k); disco(cx, cy, r + 1, e_P.grisC); disco(cx, cy, r - 1, hex('#f8f4ec'));
  rect(cx - 3, cy - r - 8, cx + 3, cy - r - 2, C.k); rect(cx - 2, cy - r - 7, cx + 2, cy - r - 3, on > 0 && on < 1 ? e_P.rojoE : e_P.grisC); rect(cx - 5, cy - r - 9, cx + 5, cy - r - 8, C.k);
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; linea(cx + Math.cos(a) * (r - 3), cy + Math.sin(a) * (r - 3), cx + Math.cos(a) * (r - (k % 3 ? 5 : 7)), cy + Math.sin(a) * (r - (k % 3 ? 5 : 7)), C.k); }
  { const a = -Math.PI / 2 + e_cl(on) * Math.PI * 2; linea(cx, cy, cx + Math.cos(a) * (r - 6), cy + Math.sin(a) * (r - 6), e_P.rojoE); linea(cx + 1, cy, cx + 1 + Math.cos(a) * (r - 6), cy + Math.sin(a) * (r - 6), e_P.rojoE); disco(cx, cy, 2, C.k); }
  rect(cx - 18, cy + r + 6, cx + 18, cy + r + 18, C.k); rect(cx - 17, cy + r + 7, cx + 17, cy + r + 17, hex('#1c2a20'));
  R.numero(String(n), cx, cy + r + 16, { centro: true, color: e_P.verdeP, sombra: false });
  return { superficie: SUP, cambio: CAM, reloj: [cx, cy], radar: [RX, SUP] };
}

// la roca roja del cañón en estratos (bandas de 6 px de cinco tonos, que se juntan y dan grosores distintos), con la
// sombra bajo cada cornisa, el filo de luz encima, los chorreones oscuros de barniz del desierto y motas
const e_ROJAS = pal({ a: '#e08a5a', b: '#c0603a', c: '#b0522e', d: '#8a3a24', e: '#d27248' });

function e_estrato(R, x, y, k) {
  const yy = y + R.vnoise(x * 0.02, k) * 10 + Math.sin(x * 0.04 + k) * 2, b = Math.floor(yy / 6), f = yy - b * 6;
  const g = (n) => 'abcde'[Math.floor(h(n, k, 120) * 5)], gb = g(b);
  let c = e_ROJAS[gb];
  if (f < 1.2 && g(b - 1) !== gb) c = e_P.rocaRD; else if (f < 2.2 && g(b - 1) !== gb) c = e_mez(c, e_ROJAS.a, 0.45);
  const v = h(x >> 1, k, 121); if (v > 0.84 && R.b4(x, y) < 0.55 && (y + Math.floor(v * 40)) % 50 < 34) c = e_mez(c, e_P.rocaRD, 0.4);
  if (h(x >> 1, y >> 1, k + 1) > 0.95) c = e_mez(c, e_P.rocaRD, 0.5);
  return c;
}

function e_turin(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  e_fijo(R, 'turin', () => {
    // el techo de la nave: chapa, las cerchas de acero (tenues arriba a la izquierda y a la derecha) y su sombra
    for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 6 === 0) ? hex('#3a3e44') : hex('#464a52'));
    for (let x = 0; x < 320; x += 40) { linea(x, 21, x + 20, 8, hex('#5a5e66')); linea(x + 20, 8, x + 40, 21, hex('#5a5e66')); }
    rect(0, 20, 319, 22, e_P.acero); rect(0, 20, 319, 20, e_P.aceroL);
    // la pared del fondo: paneles de hormigón con sus juntas, manchas y los tacos de los anclajes
    for (let y = 23; y < 150; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 70), j = (x % 54 === 0) || (y - 23) % 42 === 0;
      pset(x, y, j ? e_P.hormigonS : n > 0.92 ? e_P.hormigonS : n < 0.06 ? e_P.hormigonL : e_P.hormigon); }
    for (let x = 0; x < 320; x += 54) for (let y = 23; y < 150; y += 42) { pset(x + 4, y + 4, e_P.hormigonS); pset(x + 50, y + 4, e_P.hormigonS); }
    // la canaleta de cables por la pared (con sus grapas), el cuadro eléctrico con el tubo que baja, el reloj de pared,
    // la señal de aviso (triángulo con «!») sobre la pared de prueba y el extintor junto a la persiana
    rect(56, 28, 270, 31, C.k); rect(56, 28, 270, 29, e_P.hormigonL); rect(56, 30, 270, 30, e_P.hormigonS); for (let x = 60; x < 270; x += 18) rect(x, 27, x + 1, 32, e_P.acero);
    rect(164, 32, 166, 150, e_P.acero); rect(164, 32, 164, 150, e_P.aceroL); for (let y = 40; y < 150; y += 22) rect(162, y, 168, y + 1, e_P.grisA);
    rect(150, 80, 166, 100, C.k); rect(151, 81, 165, 99, hex('#9aa0a8')); rect(151, 81, 165, 81, hex('#c4ccd4')); rect(158, 83, 158, 97, hex('#6a7078')); pset(153, 90, e_P.verdeP); pset(161, 90, hex('#e05a2a'));
    disco(78, 44, 8, C.k); disco(78, 44, 7, hex('#f4f4f0')); R.anillo(78.5, 44.5, 7, e_P.grisB); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(78 + Math.cos(a) * 5), Math.round(44 + Math.sin(a) * 5), e_P.grisA); }
    poligono([[219, 32], [229, 32], [224, 23]], C.k); poligono([[220, 31], [228, 31], [224, 25]], hex('#e8b830')); pset(224, 27, C.k); pset(224, 28, C.k); pset(224, 30, C.k);
    rect(268, 120, 274, 140, C.k); rect(269, 121, 273, 139, hex('#c8302a')); rect(269, 121, 269, 139, hex('#e86050')); rect(270, 117, 272, 120, C.k); linea(273, 118, 276, 122, C.k); rect(267, 141, 275, 143, e_P.acero);
    // la ventana alta a los Alpes (recortada a su hueco): el cielo, las cumbres nevadas y una nube que pasa
    rect(98, 30, 158, 72, C.k); rect(99, 31, 157, 71, e_P.acero);
    R.recorte([101, 33, 155, 69]);
    e_cieloT(R, 33, 69, [hex('#6aa8d8'), hex('#9cc8e8'), hex('#d8e8f4')], 101, 155);
    poligono([[101, 70], [101, 56], [112, 46], [120, 52], [132, 40], [144, 54], [150, 50], [156, 58], [156, 70]], (x, y) => (y < 52 + Math.sin(x) ? e_P.nieve : x > 130 ? e_P.alpesS : e_P.alpes));
    poligono([[101, 70], [101, 64], [120, 60], [140, 63], [156, 61], [156, 70]], hex('#4a6a5a'));
    R.recorte(null);
    rect(128, 31, 129, 71, e_P.acero); rect(99, 51, 157, 52, e_P.acero); rect(97, 72, 160, 74, C.k); rect(98, 72, 159, 73, e_P.aceroL);
    // la estantería metálica de la izquierda con aparatos, cajas, cables enrollados y un casco
    for (const x of [4, 50]) rect(x, 36, x + 2, 150, e_P.acero);
    for (const y of [62, 92, 122]) { rect(4, y, 52, y + 2, e_P.aceroL); rect(4, y + 2, 52, y + 2, e_P.acero); }
    for (const [x, y, w, hh, c] of [[8, 50, 14, 12, hex('#3a4a5a')], [24, 54, 20, 8, hex('#c8b890')], [8, 80, 18, 12, hex('#2a2e34')], [30, 82, 16, 10, hex('#5a6a3a')], [8, 110, 12, 12, hex('#c8b890')], [22, 112, 22, 10, hex('#3a4a5a')], [10, 140, 30, 10, hex('#4a4a52')]]) {
      rect(x, y, x + w, y + hh, C.k); rect(x + 1, y + 1, x + w - 1, y + hh - 1, c); rect(x + 1, y + 1, x + w - 1, y + 1, e_mez(c, C.blanco, 0.3)); }
    rect(10, 83, 22, 89, hex('#1a2a1a')); linea(11, 87, 21, 85, e_P.verdeP);
    R.anillo(38, 116, 4, hex('#2a2a2a')); R.anillo(38, 116, 2.5, hex('#4a4a4a'));
    disco(36, 47, 6, C.k); disco(36, 47, 5, hex('#e8e8e8')); rect(30, 47, 42, 49, C.k); rect(31, 47, 41, 48, hex('#f4f4f4'));
    // la PARED DE PRUEBA de bloques de hormigón (hiladas a matajunta, con su mortero y sombra) y el SALIENTE delante
    for (let y = 46; y < 152; y++) for (let x = 172; x < 266; x++) { const fila = Math.floor((y - 46) / 9), xo = (x - 172 + (fila % 2) * 10) % 20, j = xo === 0 || (y - 46) % 9 === 0;
      const n = h(x, y, 71); pset(x, y, j ? e_P.bloqueS : n > 0.9 ? e_P.bloqueS : n < 0.08 ? e_P.bloqueL : (xo === 1 || (y - 46) % 9 === 1) ? e_P.bloqueL : e_P.bloque); }
    rect(170, 44, 267, 45, C.k); rect(170, 46, 171, 152, C.k); rect(266, 46, 267, 152, C.k); rect(268, 50, 271, 152, hex('#6a6a64'));
    rect(198, 119, 236, 122, C.k); rect(199, 119, 235, 120, e_P.maderaL); rect(199, 121, 235, 121, e_P.maderaS);
    for (const x of [202, 230]) { rect(x - 3, 123, x + 3, 152, C.k); rect(x - 2, 123, x + 2, 151, e_P.bloque); rect(x - 2, 123, x + 2, 123, e_P.bloqueL); }
    // la persiana enrollable de la derecha, a medio subir (luz de día abajo) con su franja de aviso
    rect(276, 50, 318, 56, C.k); rect(277, 51, 317, 55, e_P.acero);
    for (let y = 57; y < 128; y++) for (let x = 278; x < 317; x++) pset(x, y, (y % 4 === 0) ? e_P.hormigonS : (y % 4 === 1) ? e_P.aceroL : hex('#9aa0a8'));
    for (let x = 278; x < 317; x++) for (let y = 126; y < 129; y++) pset(x, y, ((x + y) >> 2) % 2 ? hex('#e05a2a') : C.blanco);
    rect(278, 129, 316, 150, hex('#f4ecd4')); rect(278, 140, 316, 150, hex('#c8c0a8'));
    rect(276, 56, 277, 150, C.k); rect(317, 56, 318, 150, C.k);
    // el suelo de resina con sus juntas, el brillo y la línea de seguridad
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y, 72); pset(x, y, n > 0.92 ? e_P.epoxiS : n < 0.05 ? e_P.epoxiL : e_P.epoxi); }
    rect(0, 150, 319, 151, e_P.epoxiS); linea(0, 166, 319, 166, e_P.epoxiS); for (let x = 0; x < 320; x += 64) linea(x, 151, x - 20, 180, e_P.epoxiS);
    for (let x = 0; x < 168; x++) if ((x >> 3) % 2) pset(x, 158, hex('#e8e8e0'));
    for (let y = 152; y < 176; y++) for (let x = 180; x < 262; x++) if ((x + y) % 5 === 0 && y < 152 + (x - 180) * 0.2) pset(x, y, e_P.epoxiL);
    // el monitor en su carro con ruedas (la pantalla de los radargramas), con su cable al radar
    rect(70, 104, 74, 150, e_P.acero); rect(58, 148, 86, 150, e_P.acero); disco(60, 152, 2, C.k); disco(84, 152, 2, C.k);
    rect(48, 64, 108, 104, C.k); rect(49, 65, 107, 103, e_P.grisA); rect(52, 68, 104, 100, e_P.pant);
    rect(84, 104, 98, 112, C.k); rect(85, 105, 97, 111, e_P.grisB); pset(94, 108, e_P.verdeP);
    // el RADAR GRANDE en su carro: el bastidor, las ruedas y las antenas en abanico que miran a la pared
    rect(118, 146, 176, 149, C.k); rect(119, 146, 175, 148, e_P.grisB);
    for (const x of [122, 146, 172]) { disco(x, 151, 3, C.k); disco(x, 151, 1.5, e_P.grisC); }
    rect(128, 112, 131, 146, e_P.acero); rect(160, 112, 163, 146, e_P.acero); rect(126, 128, 166, 131, e_P.acero);
    rect(120, 132, 150, 146, C.k); rect(121, 133, 149, 145, hex('#2a5a8a')); rect(121, 133, 149, 134, hex('#4a86c0')); for (let x = 124; x < 148; x += 4) rect(x, 138, x + 1, 142, hex('#1a3a5a'));
    for (let k = 0; k < 4; k++) { const a = -0.45 + k * 0.3, cx = 160, cy = 114, L = 26;
      const x1 = cx + Math.cos(a) * L, y1 = cy + Math.sin(a) * L, px = -Math.sin(a) * 5, py = Math.cos(a) * 5;
      poligono([[cx + px * 0.4, cy + py * 0.4], [cx - px * 0.4, cy - py * 0.4], [x1 - px, y1 - py], [x1 + px, y1 + py]], C.k);
      poligono([[cx + px * 0.25, cy + py * 0.25], [cx - px * 0.25, cy - py * 0.25], [x1 - px * 0.8, y1 - py * 0.8], [x1 + px * 0.8, y1 + py * 0.8]], k % 2 ? e_P.grisC : e_P.grisD); }
    disco(160, 114, 4, C.k); disco(160, 114, 3, e_P.grisB);
    { let ax = 108, ay = 108; for (let i = 1; i <= 10; i++) { const u = i / 10, bx = Math.round(108 + 18 * u), by = Math.round(108 + 30 * u + Math.sin(u * Math.PI) * 6); linea(ax, ay, bx, by, C.k); ax = bx; ay = by; } }
  });
  // la pantalla: el radargrama que corre, y con o.pita: el icono de una PUERTA con «!» en rojo que parpadea
  const pita = o.pita ?? 0;
  for (let y = 70; y < 99; y++) { const v = Math.sin((y - 70) * 0.9 + Math.sin((y + t * 3) * 0.2)); for (let x = 53; x < 104; x++) if (v + Math.sin((x + t * 10) * 0.25) * 0.3 > 0.4) pset(x, y, y < 76 ? e_P.grisD : e_P.grisC); }
  { const cx = 53 + Math.floor((t * 9) % 51); linea(cx, 69, cx, 99, e_P.verdeP); }
  if (pita > 0) {
    const on = Math.sin(t * 10) > -0.3, x0 = 64, y0 = 72;
    for (let b = 0; b < 3; b++) for (let x = 54; x < 104; x++) { const y = Math.round(92 + b * 2 - Math.sqrt(16 + (x - 78) * (x - 78) * 0.4) + 4); if (y > 70) pset(x, y, b === 1 ? C.k : e_P.rojoP); }
    if (pita > 0.4) { rect(x0 - 2, y0 - 2, x0 + 30, y0 + 16, on ? e_P.rojoP : e_P.rojoPS); rect(x0, y0, x0 + 28, y0 + 14, hex('#3a0a0a'));
      rect(x0 + 4, y0 + 2, x0 + 13, y0 + 13, C.blanco); rect(x0 + 5, y0 + 3, x0 + 12, y0 + 13, hex('#8a5a34')); pset(x0 + 11, y0 + 8, C.oro); R.icono('!', x0 + 19, y0 + 4, C.blanco, C.k, 2); }
    // el pitido (arcos que salen de la pantalla) y la línea de puntos de la LATA a la pantalla: el eco es la lata
    for (let i = 0; i < 2; i++) { const r = 4 + i * 4 + (t * 12) % 4; for (let a = -0.7; a <= 0.7; a += 0.2) pset(Math.round(108 + Math.cos(a) * r), Math.round(70 + Math.sin(a) * r), e_P.rojoP); }
    const lx = 214, ly = 112, k = Math.floor(t * 8);
    for (let i = 0; i < 26; i++) { if ((i + k) % 3) continue; const u = i / 26; pset(Math.round(lx + (106 - lx) * u), Math.round(ly + (90 - ly) * u - Math.sin(u * Math.PI) * 14), e_P.rojoP); }
    R.anillo(lx + 0.5, ly + 0.5, 9 + (t * 10) % 4, e_P.rojoP, 3);
  }
  // la LATA de refresco olvidada en el saliente (con su brillo)
  PIEZAS_TU.lata?.(R, 214, 119, {}); if (Math.floor(t * 0.7) % 3 === 0) pset(212, 109, C.blanco);
  // los tubos fluorescentes colgados de las cerchas (uno parpadea) y la luz que dejan en la pared
  for (const [x, k] of [[40, 0], [120, 1], [200, 2]]) { linea(x + 2, 21, x + 2, 24, e_P.acero); linea(x + 26, 21, x + 26, 24, e_P.acero); rect(x, 25, x + 28, 27, C.k);
    const on = k !== 1 || Math.sin(t * 23) > -0.7 || Math.floor(t * 0.5) % 3; rect(x + 1, 26, x + 27, 26, on ? hex('#f4fbff') : hex('#8a9098')); }
  // por debajo de la persiana, al sol, pasan de vez en cuando los pies de alguien (recortados al hueco)
  { const u = (t * 0.12) % 1.4; if (u < 1) { const x = Math.round(322 - u * 52), a = Math.floor(t * 6) % 2; R.recorte([278, 129, 316, 150]);
    for (const [dx, up] of [[0, a], [4, 1 - a]]) { R.linea(x + dx, 136, x + dx, 147 - up, hex('#2a3a5a')); R.linea(x + dx + 1, 136, x + dx + 1, 147 - up, hex('#3a4a6a')); R.linea(x + dx - 1, 148 - up, x + dx + 2, 148 - up, C.k); }
    for (let i = -1; i <= 7; i++) R.pset(x + i, 151, hex('#c8c0a8')); R.recorte(null); } }
  // las agujas del reloj de pared
  { const am = t * 0.1, ah = am / 12; linea(78, 44, Math.round(78 + Math.sin(am) * 5), Math.round(44 - Math.cos(am) * 5), C.k); linea(78, 44, Math.round(78 + Math.sin(ah + 2) * 3), Math.round(44 - Math.cos(ah + 2) * 3), C.k); }
  // las luces del radar, el ventilador del armario y la nube que pasa por la ventana
  pset(124, 135, Math.floor(t * 3) % 2 ? e_P.verdeP : hex('#1a4a2a')); pset(146, 135, Math.floor(t * 2) % 2 ? e_P.rojoP : e_P.rojoPS);
  R.recorte([101, 33, 155, 50]); e_nube(R, Math.round(80 + ((t * 3) % 100)), 40, 18, [hex('#c8d8e8'), hex('#eef4f8'), C.blanco]); e_ave(R, 101 + ((t * 7) % 60), 44 + Math.sin(t) * 2, t, hex('#2a2a3a')); R.recorte(null);
  return { lata: [214, 119], pantalla: [78, 84], radar: [160, 114], saliente: [198, 236, 119], monitor: [78, 150] };
}
// lo de delante en 'turin': dos bancos de trabajo en las esquinas (multímetro, caja de herramientas, cables)
function e_turinDelante(R, t, o) {
  const { rect, pset, disco, linea } = R;
  rect(0, 160, 44, 163, C.k); rect(0, 160, 43, 161, e_P.maderaL); rect(0, 162, 43, 162, e_P.maderaS); rect(4, 164, 7, 179, e_P.acero); rect(38, 164, 41, 179, e_P.acero);
  rect(8, 150, 24, 160, C.k); rect(9, 151, 23, 159, hex('#c8582a')); rect(11, 152, 21, 155, hex('#1a2a1a')); pset(14 + (Math.floor(t * 2) % 5), 153, e_P.verdeP); disco(16, 157, 1.5, C.k);
  linea(24, 158, 34, 160, e_P.rojoE); linea(24, 159, 36, 160, C.k);
  rect(280, 164, 319, 167, C.k); rect(280, 164, 319, 165, e_P.maderaL); rect(284, 168, 287, 179, e_P.acero); rect(314, 168, 317, 179, e_P.acero);
  rect(288, 152, 312, 164, C.k); rect(289, 153, 311, 163, hex('#2a5a8a')); rect(289, 153, 311, 154, hex('#4a86c0')); rect(296, 149, 304, 152, C.k);
}

// el SELLO DE GOMA en tres cuartos (el nuestro): la goma roja abajo, el taco de madera con su filo de luz, el cuello y
// el pomo redondo con su brillo; (x, y) es el centro de abajo de la goma y s la escala (más grande = más cerca)
function e_selloGoma(R, x, y, s) {
  const { disco, rect } = R, X = (d) => Math.round(x + d * s), Y = (d) => Math.round(y - d * s);
  rect(X(-15), Y(4), X(15), Y(0), C.k); rect(X(-14), Y(3), X(14), Y(1), e_P.tinta); rect(X(-14), Y(1), X(14), Y(1), hex('#7a1418'));
  rect(X(-14), Y(13), X(14), Y(4), C.k); rect(X(-13), Y(12), X(13), Y(5), e_P.madera); rect(X(-13), Y(12), X(13), Y(11), e_P.maderaL); rect(X(10), Y(10), X(13), Y(5), e_P.maderaS);
  rect(X(-4), Y(21), X(4), Y(13), C.k); rect(X(-3), Y(20), X(3), Y(13), e_P.maderaS); rect(X(-3), Y(20), X(-2), Y(13), e_P.madera);
  disco(x, Y(27), 8 * s, C.k); disco(x, Y(27), 7 * s, e_P.madera); disco(X(-2), Y(29), 4 * s, e_P.maderaL); disco(X(-3), Y(30), 1.5 * s, hex('#e8b888'));
}

// el candado del «caso cerrado», estampado en tinta roja (con huecos de tinta)
function e_candado(R, x, y, a = 1) {
  const { pset } = R, F = R.ICONOS.candado, e = 4;
  for (let j = 0; j < F.length; j++) for (let i = 0; i < F[j].length; i++) if (F[j][i] === '#') for (let b = 0; b < e; b++) for (let c = 0; c < e; c++) { const px = x + i * e + c, py = y + j * e + b; if (h(px, py, 81) < 0.86 * a) pset(px, py, e_P.tinta); }
  for (let k = 0; k < 40; k++) { const an = k / 40 * Math.PI * 2, px = Math.round(x + 14 + Math.cos(an) * 20), py = Math.round(y + 14 + Math.sin(an) * 20); if (h(k, 1, 82) < 0.8 * a) { pset(px, py, e_P.tinta); pset(px + 1, py, e_P.tinta); } }
}

function e_carpeta(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, X0 = 100, X1 = 230, Y0 = 52, Y1 = 150;
  e_fijo(R, 'carpeta', () => {
    // la mesa de madera desde arriba: vetas largas, nudos, los tablones con su junta y su luz; bajo Atom (x > 270,
    // y < 48) y bajo la barra del año (y < 18, x < 176), la veta se calma
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.9 + Math.sin(x * 0.02 + y * 0.05) * 3 + R.vnoise(x * 0.03, y * 0.2) * 3), tabla = y % 45 === 0;
      const calma = (x > 268 && y < 50) || (y < 19 && x < 178);
      pset(x, y, calma ? (v > 0.85 && R.b4(x, y) > 0.5 ? e_P.maderaL : e_P.madera) : tabla ? e_P.maderaS : (y % 45 === 1) ? e_P.maderaL : v > 0.7 ? e_P.maderaL : v < -0.75 ? e_P.maderaS : e_P.madera); }
    for (const [x, y] of [[40, 30], [250, 140], [60, 160], [150, 172]]) { R.anillo(x + 0.5, y + 0.5, 4, e_P.maderaS); R.anillo(x + 0.5, y + 0.5, 2, e_P.maderaS); pset(x, y, hex('#4a2c18')); }
    // arañazos y un cerco viejo de vaso en la madera
    for (let k = 0; k < 14; k++) { const x0 = Math.round(h(k, 1, 88) * 300), y0 = 20 + Math.round(h(k, 2, 88) * 150); if ((x0 > 266 && y0 < 52) || (y0 < 22 && x0 < 180)) continue; linea(x0, y0, x0 + 5 + Math.round(h(k, 3, 88) * 7), y0 - 2, e_P.maderaL); }
    for (let a = 0; a < 60; a++) if (a % 11 < 8) { const an = a / 60 * Math.PI * 2; pset(Math.round(70 + Math.cos(an) * 10), Math.round(34 + Math.sin(an) * 10), e_P.maderaS); }
    e_luz(R, 0, 0, 319, 179, (x, y) => 1.3 - Math.hypot((x - 165) / 200, (y - 100) / 130), hex('#2a1810'), 0.8);
    // la taza de café (con su asa, su platillo y la cucharilla), las gafas, el bolígrafo y una hoja con un radargrama
    // impreso (a la derecha, donde no llega la tapa abierta)
    e_sombraMesa(R, 264, 68, 298, 98); disco(276, 80, 17, hex('#2a1810')); disco(276, 78, 17, C.k); disco(276, 78, 16, hex('#e8e4dc')); R.anillo(276.5, 78.5, 14, hex('#c8c4bc'));
    disco(276, 78, 14, C.k); disco(276, 78, 13, C.blanco); disco(276, 78, 10, hex('#e8e4dc')); disco(276, 78, 9, hex('#4a2a14')); disco(273, 75, 3, hex('#6a3a1c')); rect(289, 74, 294, 82, C.k); rect(290, 75, 292, 81, C.blanco);
    linea(258, 92, 268, 86, C.k); linea(258, 93, 268, 87, e_P.grisD); disco(257, 93, 1.5, e_P.grisC);
    for (const x of [32, 54]) { R.anillo(x + 0.5, 166.5, 8, C.k); R.anillo(x + 0.5, 166.5, 7, hex('#3a3a3a')); pset(x - 3, 162, hex('#c8d8e8')); pset(x - 2, 163, hex('#c8d8e8')); } linea(40, 166, 46, 166, C.k); linea(24, 164, 16, 156, C.k); linea(62, 164, 70, 156, C.k);
    e_sombraMesa(R, 246, 101, 302, 116, 0.25);
    linea(244, 112, 300, 98, C.k); linea(244, 113, 300, 99, e_P.azulE); linea(245, 114, 300, 100, C.k); rect(298, 96, 302, 100, e_P.grisC); pset(260, 108, e_P.azulEL); pset(270, 106, e_P.azulEL); linea(244, 112, 240, 114, e_P.grisD);
    e_sombraMesa(R, 243, 124, 316, 180, 0.3);
    poligono([[240, 126], [306, 120], [312, 178], [246, 180]], C.k); poligono([[241, 127], [305, 121], [311, 177], [247, 180]], hex('#f4f0e4'));
    for (let k = 0; k < 5; k++) linea(248, 134 + k * 8, 304, 128 + k * 8, hex('#9a9a9a'));
    for (let x = 252; x < 304; x++) { const y = Math.round(150 + Math.sqrt(9 + (x - 278) * (x - 278) * 0.5) - (x - 252) * 0.1); if (y < 176) pset(x, y, C.k); }
    linea(300, 122, 305, 121, hex('#d8d4c8')); linea(305, 121, 307, 128, hex('#d8d4c8'));
    // la FOTO del valle (una polaroid: el borde blanco, el cielo, los riscos, la ladera con el sendero y la puerta de la
    // tumba, pequeña), el clip
    e_sombraMesa(R, 22, 72, 58, 106); rect(18, 68, 54, 102, C.k); rect(19, 69, 53, 101, hex('#f4f2ea'));
    for (let y = 72; y < 93; y++) for (let x = 22; x < 51; x++) { const cr = 80 - Math.round(Math.abs(Math.sin(x * 0.35)) * 3 + (x - 22) * 0.12), sd = 88 - Math.round((x - 22) * 0.1);
      pset(x, y, y < cr ? (R.b4(x, y) > (y - 72) / 10 ? hex('#8ac0e8') : hex('#c8e0f0')) : y < sd ? (R.b4(x, y) > 0.5 ? hex('#d8a868') : hex('#b88a50')) : R.b4(x, y) > 0.3 ? hex('#e8cc98') : hex('#c8a870')); }
    for (let i = 0; i < 12; i++) pset(26 + i * 2, 90 - (i % 3), hex('#a8885a')); rect(40, 84, 41, 86, hex('#2a1a10')); pset(30, 74, hex('#3a3a4a')); pset(31, 75, hex('#3a3a4a'));
    rect(19, 101, 53, 101, hex('#d8d4c8'));
    rect(64, 118, 66, 128, hex('#8a8e96')); rect(64, 118, 68, 118, hex('#8a8e96')); rect(68, 118, 68, 126, hex('#c8ccd4')); pset(66, 120, hex('#e8ecf0'));
    e_sombraMesa(R, 30, 128, 46, 136); rect(28, 125, 44, 133, C.k); rect(29, 126, 43, 132, hex('#e8a0a8')); rect(29, 126, 36, 132, hex('#4a6ab0')); rect(29, 126, 43, 126, hex('#f8c8d0'));
    for (let i = 0; i < 46; i++) { const x = 10 + i, y = 150 - Math.round(i * 0.3); pset(x, y + 1, hex('#2a1810')); pset(x, y, i < 4 ? hex('#e8a0a8') : i < 6 ? e_P.grisC : i > 41 ? hex('#e8c8a0') : hex('#3a7a4a')); pset(x, y - 1, i < 4 ? hex('#c87080') : i < 6 ? e_P.grisD : i > 41 ? hex('#c8a078') : hex('#5aa06a')); }
    pset(56, 136, C.k); pset(57, 136, C.k);
    e_sombraMesa(R, 182, 30, 266, 38, 0.3); rect(180, 26, 264, 35, C.k); rect(181, 27, 263, 34, hex('#e8e0c8')); rect(181, 27, 263, 27, C.blanco);
    for (let x = 183; x < 263; x += 3) rect(x, 28, x, (x - 183) % 15 === 0 ? 32 : 29, hex('#5a4a3a'));
    e_sombraMesa(R, 238, 52, 258, 70); rect(236, 49, 255, 67, C.k); rect(237, 50, 254, 66, hex('#f4b8c8')); rect(237, 50, 254, 51, hex('#d890a8')); for (let y = 55; y < 65; y += 3) linea(240, y, 251 - (y % 2) * 3, y, hex('#c890a0'));
    // la grapadora y unos clips abajo, a la derecha de por donde entra la mano
    e_sombraMesa(R, 184, 162, 222, 176); rect(180, 158, 218, 172, C.k); rect(181, 159, 217, 171, hex('#3a3e46')); rect(181, 159, 217, 162, hex('#5a626e')); rect(181, 159, 217, 159, hex('#8a94a0')); rect(210, 163, 214, 168, hex('#2a2e34'));
    for (const [cx, cy] of [[160, 164], [168, 170], [228, 172]]) { R.anillo(cx + 0.5, cy + 0.5, 2.5, hex('#a8acb4')); pset(cx + 2, cy - 2, hex('#e8ecf0')); }
    // el bolígrafo de reserva de arriba a la izquierda (el clip de antes)
    rect(6, 36, 16, 38, e_P.grisC); rect(6, 36, 6, 42, e_P.grisC); rect(16, 36, 16, 40, e_P.grisC);
  });
  // el vapor del café (dos hilos), el brillo que se mueve en el café y las motas de polvo en la luz de la ventana
  for (let i = 0; i < 6; i++) pset(Math.round(276 + Math.sin(t * 2 + i) * 2), 64 - i * 3 - Math.floor(t * 4) % 3, hex('#d8c8b8'));
  for (let i = 0; i < 4; i++) pset(Math.round(280 + Math.sin(t * 1.6 + i * 1.3) * 2), 66 - i * 3 - Math.floor(t * 3 + 1) % 3, hex('#c8b8a8'));
  pset(Math.round(272 + Math.sin(t * 0.8) * 2), 76, hex('#9a6a44'));
  for (let k = 0; k < 8; k++) { const x = Math.round((h(k, 1, 89) * 160 + t * (3 + k % 3)) % 170) + 4, y = Math.round(60 + h(k, 2, 89) * 90 + Math.sin(t * 0.9 + k) * 4); if (Math.floor(t * 1.5 + k) % 3) pset(x, y, hex('#f0dcb0')); }
  // los papeles de dentro (radargramas, rayas, un clip) y LA CARPETA: la tapa gira sobre el lomo (o.cerrada 0–1)
  const cer = o.cerrada ?? 1;
  e_sombraMesa(R, X0 + 2, Y0 + 3, X1 + 4, Y1 + 4, 0.45);
  rect(X0, Y0, X1, Y1, C.k); rect(X0 + 1, Y0 + 1, X1 - 1, Y1 - 1, e_P.carpetaS);
  for (let k = 0; k < 5; k++) { rect(X0 + 6 + k, Y0 + 4 + k, X1 - 4 + k * 0.4, Y1 - 4, C.k); rect(X0 + 7 + k, Y0 + 5 + k, X1 - 5 + k * 0.4, Y1 - 5, k % 2 ? hex('#f4f0e4') : hex('#e8e4d8')); }
  for (let y = Y0 + 16; y < Y1 - 10; y += 6) linea(X0 + 18, y, X1 - 20 - (y % 4) * 6, y, hex('#a8a8a8'));
  for (let x = X0 + 30; x < X1 - 30; x++) { const y = Math.round(Y0 + 40 + Math.sqrt(16 + (x - 165) * (x - 165) * 0.6) - 4); if (y < Y1 - 8) { pset(x, y, C.k); pset(x, y + 2, C.k); } }
  rect(X0 + 20, Y0 + 3, X0 + 22, Y0 + 15, hex('#8a8e96')); rect(X0 + 24, Y0 + 5, X0 + 24, Y0 + 13, hex('#c8ccd4')); pset(X0 + 21, Y0 + 4, hex('#e8ecf0'));
  { const a = e_cl(cer) * Math.PI, w = (X1 - X0) * -Math.cos(a), x2 = X0 + w, dy = Math.sin(a) * 10, AW = X1 - X0, AH = Y1 - Y0;
    poligono([[X0, Y0], [x2, Y0 - dy], [x2, Y1 + dy], [X0, Y1]], C.k);
    // el cartón de la cara que se ve (fuera con la tapa a más de media vuelta), pegado a la tapa mientras gira
    if (Math.abs(w) >= 2) { const T = e_carton(R, cer > 0.5, AW, AH), xa = Math.max(0, Math.ceil(Math.min(X0, x2))), xb = Math.min(319, Math.floor(Math.max(X0, x2)));
      for (let x = xa; x <= xb; x++) { const u = (x - X0) / w; if (u < 0 || u > 1) continue; const top = Y0 - dy * u, bot = Y1 + dy * u, i = Math.min(AW - 1, Math.round(u * (AW - 1)));
        if (i < 1 || i > AW - 2) continue;
        for (let y = Math.ceil(top) + 1; y < bot - 1; y++) { const j = Math.min(AH - 2, Math.max(1, Math.round((y - top) / (bot - top) * (AH - 1)))); pset(x, y, T[j * AW + i]); } } }
    if (cer > 0.92) { rect(X0 + 1, Y0 + 1, X1 - 1, Y0 + 1, e_P.carpetaL);
      // los trazos del rótulo (a mano, sin letras), la pestaña roja, el 2018 y la etiqueta con el pictograma del radar
      for (let y = Y0 + 12; y < Y0 + 34; y += 5) for (let x = X0 + 14; x < X0 + 60 - (y % 3) * 8; x++) if (h(x >> 2, y, 90) > 0.15) pset(x, y + Math.round(Math.sin(x * 0.9 + y) * 0.6), hex('#5a4a3a'));
      rect(X1 - 2, Y0 + 20, X1 + 5, Y0 + 34, C.k); rect(X1 - 1, Y0 + 21, X1 + 4, Y0 + 33, hex('#c84a3a')); rect(X1 - 1, Y0 + 21, X1 + 4, Y0 + 22, hex('#e07060')); R.numero('2018', X0 + 100, Y1 - 10, { centro: true, color: hex('#5a4228') });
      const LX = X0 + 12, LY = Y0 + 50;
      rect(LX, LY, LX + 24, LY + 18, hex('#5a4228')); rect(LX + 1, LY + 1, LX + 23, LY + 17, hex('#f8f4e8')); rect(LX + 1, LY + 17, LX + 23, LY + 17, hex('#d8d0bc'));
      rect(LX + 6, LY + 10, LX + 10, LY + 14, hex('#2a3a5a')); linea(LX + 8, LY + 10, LX + 8, LY + 6, hex('#2a3a5a'));
      for (let r = 3; r <= 9; r += 3) for (let k = -3; k <= 3; k++) { const an = -Math.PI / 2 + k * 0.22; pset(Math.round(LX + 8 + Math.cos(an) * r + r * 0.6), Math.round(LY + 6 + Math.sin(an) * r * 0.5), hex('#3a6ab8')); }
      // la goma elástica que abraza la carpeta (con su brillo) y las banderitas de papel que asoman por el canto
      for (let y = Y0 - 1; y <= Y1 + 1; y++) { pset(X1 - 10, y, hex('#6a1e16')); pset(X1 - 9, y, hex('#a8382a')); pset(X1 - 8, y, (y & 3) === 0 ? hex('#e07060') : hex('#8a2a20')); }
      for (const [y, c1, c2] of [[Y0 + 48, '#f0d040', '#b89a20'], [Y0 + 60, '#5ac86a', '#2a8a3a']]) { rect(X1 - 1, y, X1 + 5, y + 6, hex(c2)); rect(X1, y + 1, X1 + 4, y + 5, hex(c1)); }
      for (let y = Y0 + 68; y < Y1 - 4; y++) pset(X1 + 1, y, (y % 5) ? hex('#f4f0e4') : hex('#b8b4a8')); } }
  // el SELLO de goma: baja (0–0.5), estampa (0.5–0.7) y se va (0.7–1); el candado rojo se queda en la tapa
  const s = o.sello ?? 0, SX = 172, SY = 96;
  if (s > 0.55 && cer > 0.92) e_candado(R, SX - 14, SY - 14, e_cl((s - 0.55) * 8));
  if (s > 0 && s < 1) { const alto = s < 0.5 ? (1 - s / 0.5) ** 2 : s < 0.7 ? 0 : ((s - 0.7) / 0.3) ** 2, sc = 1 + alto * 0.25, sy = SY + 14 - Math.round(alto * 70);
    for (let j = -6; j <= 6; j++) for (let i = -22; i <= 22; i++) if ((i * i) / 484 + (j * j) / 36 < 1 - alto * 0.5 && R.b4(SX + i, SY + 14 + j) < 0.6 - alto * 0.4) pset(SX + i + Math.round(alto * 8), SY + 14 + j, hex('#6a5a40'));
    e_selloGoma(R, SX, sy, sc); if (alto === 0) for (let k = 0; k < 6; k++) { const a = k * 1.05 + 0.3; linea(SX + Math.round(Math.cos(a) * 22), SY + 14 + Math.round(Math.sin(a) * 8), SX + Math.round(Math.cos(a) * 28), SY + 14 + Math.round(Math.sin(a) * 11), C.blanco); } }
  return { carpeta: [X0, Y0, X1, Y1], sello: [SX, SY] };
}
// un jarrón (o una vasija) de la colección, de alto a: cuerpo de tres tonos con su franja y el brillo
function e_vasija(R, x, yb, a, c, cS, cL, banda) {
  const r = Math.round(a * 0.32);
  R.disco(x, yb - r - 1, r + 1, C.k); R.disco(x, yb - r - 1, r, c); R.disco(x - r * 0.35, yb - r * 1.3, r * 0.45, cL);
  R.rect(x - Math.round(r * 0.45), yb - a, x + Math.round(r * 0.45), yb - r * 2 + 1, C.k); R.rect(x - Math.round(r * 0.45) + 1, yb - a + 1, x + Math.round(r * 0.45) - 1, yb - r * 2 + 1, c);
  R.rect(x - r + 1, yb - r - 2, x + r - 1, yb - r - 1, banda); for (let i = -r + 2; i < r; i += 3) R.pset(x + i, yb - r - 3, banda);
  R.linea(x + r - 1, yb - r * 1.6, x + r - 1, yb - r * 0.4, cS);
}

function e_museo(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = PIEZAS_TU;
  e_fijo(R, 'museo', () => {
    // el techo oscuro con el carril de focos (tranquilo arriba)
    rect(0, 0, 319, 17, hex('#121c1e')); for (let x = 0; x < 320; x += 4) pset(x, 10, hex('#182426'));
    rect(0, 16, 319, 17, hex('#2a3a3a')); for (const x of [60, 160, 250]) { rect(x - 3, 17, x + 3, 22, C.k); rect(x - 2, 18, x + 2, 21, e_P.grisB); rect(x - 1, 22, x + 1, 23, hex('#fff4d0')); }
    // las paredes azul verdoso: tela tramada, la moldura de los paneles y el zócalo de madera oscura
    for (let y = 18; y < 150; y++) for (let x = 0; x < 320; x++) { const n = ((x + y) & 3) === 0 ? 1 : 0, m = h(x >> 2, y >> 2, 90); pset(x, y, m > 0.9 ? e_P.museoS : n ? e_P.museoL : e_P.museo); }
    for (const [x0, x1] of [[86, 234]]) { rect(x0, 30, x1, 30, e_P.museoL); rect(x0, 31, x1, 31, e_P.museoS); rect(x0, 30, x0, 136, e_P.museoL); rect(x1, 30, x1, 136, e_P.museoS); rect(x0, 136, x1, 136, e_P.museoS); }
    rect(0, 136, 319, 150, hex('#2a1e18')); rect(0, 136, 319, 137, hex('#4a3426')); rect(0, 149, 319, 149, hex('#1a120e'));
    // el haz del foco central (cono tramado más claro sobre la pared) hacia la vitrina
    for (let y = 23; y < 136; y++) { const w = 6 + (y - 23) * 0.38; for (let x = Math.round(160 - w); x <= 160 + w; x++) if (R.b4(x, y) < 0.35) pset(x, y, e_mez(R.pget(x, y), hex('#a8d0c8'), 0.25)); }
    // la puerta en arco de la izquierda a la sala siguiente (más cálida), con una estatuilla sin cara y una vasija
    rect(18, 54, 72, 150, C.k); disco(45, 60, 27, C.k); rect(21, 60, 69, 150, hex('#8a7458')); disco(45, 61, 24, hex('#8a7458'));
    for (let y = 40; y < 150; y++) for (let x = 21; x < 70; x++) if (R.pget(x, y) === hex('#8a7458')) pset(x, y, y > 132 ? hex('#6a5038') : h(x >> 1, y >> 1, 3) > 0.85 ? hex('#7a6448') : hex('#9a8466'));
    rect(36, 112, 54, 132, hex('#5a4434')); rect(36, 112, 54, 113, hex('#7a5e48')); e_vasija(R, 45, 112, 18, hex('#3a7a8a'), hex('#24525e'), hex('#6ab0c0'), C.oro);
    // la vitrina de la pared derecha con vasijas y un escarabajo, iluminada desde arriba
    rect(240, 66, 300, 132, C.k); rect(241, 67, 299, 131, hex('#1c2c2e')); rect(241, 67, 299, 69, hex('#f4f0dc'));
    for (let y = 70; y < 131; y++) for (let x = 242; x < 299; x++) if (R.b4(x, y) < 0.25 * (1 - (y - 70) / 61)) pset(x, y, hex('#3a5a58'));
    rect(241, 108, 299, 110, hex('#5a4434')); e_vasija(R, 256, 108, 22, hex('#c87a3a'), hex('#9a5424'), hex('#e8a868'), C.k); e_vasija(R, 282, 108, 16, hex('#e8dcc0'), hex('#c0b090'), C.blanco, C.lapis);
    P.escarabajo?.(R, 270, 130, { paso: 0 }); for (let k = 0; k < 3; k++) linea(246 + k * 18, 72, 252 + k * 18, 128, hex('#2a4040'));
    rect(240, 132, 300, 150, hex('#2a1e18')); rect(240, 132, 300, 133, hex('#4a3426'));
    // la VITRINA central del busto: el pedestal de piedra, la base de madera, el cristal con sus brillos y su tapa
    rect(130, 116, 190, 150, C.k); rect(131, 117, 189, 149, hex('#3a3634')); rect(131, 117, 189, 118, hex('#5a5652')); rect(186, 118, 189, 149, hex('#2a2624'));
    for (let y = 122; y < 148; y += 6) linea(134, y, 184, y, hex('#34302e'));
    rect(126, 112, 194, 116, C.k); rect(127, 112, 193, 114, hex('#6a4a30'));
    rect(128, 42, 192, 112, C.k); rect(129, 43, 191, 111, hex('#20383a'));
    for (let y = 44; y < 111; y++) for (let x = 130; x < 191; x++) if (R.b4(x, y) < 0.18) pset(x, y, hex('#2c4a4a'));
    e_piezaFina(R, [139, 46, 181, 108], () => P.bustoReina?.(R, 160, 108, { s: 2 }));
    for (const [x0, y0, l] of [[132, 100, 30], [136, 102, 22], [178, 90, 30]]) linea(x0, y0, x0 + l * 0.4, y0 - l, hex('#a8d0d0'));
    rect(128, 40, 192, 43, C.k); rect(129, 40, 191, 41, hex('#c8c8c0'));
    // el suelo de piedra pulida: losas, vetas y el reflejo de la vitrina
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y, 91), j = x % 48 === 0 || y === 163; pset(x, y, j ? hex('#3a3a3c') : n > 0.94 ? hex('#3e3e42') : n < 0.05 ? hex('#6a6a70') : hex('#4c4c52')); }
    for (let y = 151; y < 172; y++) for (let x = 132; x < 189; x++) if (R.b4(x, y) < 0.4 - (y - 151) * 0.018) pset(x, y, hex('#6a7a7a'));
    // el cordón de terciopelo entre dos postes de latón, delante de la vitrina (detrás de los personajes)
    for (const x of [112, 208]) { rect(x - 1, 140, x + 1, 156, C.k); pset(x, 141, C.oroL); rect(x, 142, x, 155, e_P.laton); disco(x, 139, 2.5, C.k); disco(x, 139, 1.5, e_P.laton); rect(x - 4, 156, x + 4, 158, C.k); rect(x - 3, 156, x + 3, 157, e_P.latonS); }
    for (let x = 113; x < 208; x++) { const y = Math.round(142 + Math.sin((x - 112) / 96 * Math.PI) * 7); pset(x, y, e_P.terciopelo); pset(x, y + 1, hex('#6a1018')); }
    // el banco del guarda con su silla, a la derecha
    rect(296, 136, 310, 138, C.k); rect(297, 136, 309, 137, hex('#5a4434')); rect(298, 139, 299, 152, C.k); rect(307, 139, 308, 152, C.k); rect(306, 120, 309, 137, C.k); rect(307, 121, 308, 136, hex('#5a4434'));
  });
  // el guarda sentado (cabecea a ratos), los visitantes que pasan por la otra sala y la luz del foco que tiembla
  { const cab = Math.sin(t * 0.6) > 0.8 ? 1 : 0; rect(298, 124, 306, 136, hex('#24304a')); rect(296, 136, 300, 146, hex('#24304a')); rect(302, 136, 304, 146, hex('#24304a'));
    rect(299, 116 + cab, 305, 123 + cab, hex('#d8a880')); rect(298, 114 + cab, 306, 116 + cab, hex('#1a2238')); rect(305, 115 + cab, 308, 116 + cab, hex('#1a2238')); rect(295, 146, 300, 147, C.k); rect(301, 146, 305, 147, C.k); }
  R.recorte([21, 36, 69, 136]);
  for (let k = 0; k < 2; k++) { const u = ((t * 0.08 + k * 0.55) % 1), x = Math.round(10 + u * 70), d = k ? -1 : 1, px = d > 0 ? x : 80 - x;
    e_gentecilla(R, px, 132, t, [[hex('#6a3a4a'), hex('#d8b090'), hex('#3a2a1c')], [hex('#3a5a6a'), hex('#a87a5a'), hex('#1c1c24')]][k], { anda: true, alto: 12, dir: d }); }
  R.recorte(null);
  for (let k = 0; k < 4; k++) pset(150 + Math.round(Math.sin(t * 0.7 + k * 1.7) * 10), 30 + ((Math.floor(t * 3) + k * 17) % 90), hex('#5a7a78'));
  return { busto: [168, 70], vitrina: [128, 42, 192, 112], puerta: [21, 36, 69, 136], guarda: [302, 147] };
}

// lo de delante en 'museo': el banco acolchado de la sala, en la esquina de abajo a la izquierda
function e_museoDelante(R, t, o) {
  const { rect, pset } = R;
  rect(0, 162, 58, 170, C.k); rect(0, 163, 57, 168, hex('#3a2a24')); rect(0, 163, 57, 164, hex('#5a4234')); for (let x = 6; x < 56; x += 10) pset(x, 166, hex('#24180f'));
  rect(4, 170, 8, 179, C.k); rect(50, 170, 54, 179, C.k); rect(5, 170, 7, 179, hex('#8a8a90'));
}

function e_busto(R, t, o) {
  const { rect, pset, disco, linea } = R;
  e_fijo(R, 'busto', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = ((x + y) & 3) === 0 ? 1 : 0; pset(x, y, n ? e_P.museoL : h(x >> 2, y >> 2, 92) > 0.9 ? e_P.museoS : e_P.museo); }
    R.halo(160, 90, 90, [hex('#28504e'), hex('#2e5a58'), hex('#36666a')], 1.1);
    // la moldura de arriba (tenue bajo Atom), el zócalo de paneles con su moldura y, a los lados, un fragmento de
    // relieve en su ménsula (el disco y sus rayos tallados) y un trozo de papiro enmarcado con flores de loto
    for (let x = 0; x < 320; x++) { if (x > 272) continue; pset(x, 12, e_P.museoL); pset(x, 13, hex('#3e7270')); pset(x, 14, e_P.museoS); }
    for (const [x0, x1] of [[0, 77], [243, 319]]) { rect(x0, 126, x1, 128, hex('#3e7270')); rect(x0, 129, x1, 129, e_P.museoS); rect(x0, 130, x1, 179, hex('#1a3032'));
      for (let x = x0 + 4; x < x1 - 14; x += 24) { rect(x, 136, x + 18, 170, hex('#142628')); rect(x + 1, 137, x + 17, 169, hex('#20383a')); rect(x + 1, 137, x + 17, 137, hex('#2e4e4e')); rect(x + 17, 137, x + 17, 169, hex('#10201e')); } }
    R.poligono([[14, 62], [52, 58], [60, 70], [56, 98], [20, 102], [10, 84]], C.k); R.poligono([[15, 63], [51, 59], [59, 70], [55, 97], [21, 101], [11, 84]], hex('#b8a888'));
    for (let y = 60; y < 101; y++) for (let x = 11; x < 60; x++) if (R.pget(x, y) === hex('#b8a888') && h(x, y, 93) > 0.8) pset(x, y, hex('#9a8a6a'));
    // (tallado: dos líneas de registro y un ramo de tres papiros con su luz y su sombra)
    for (const y of [66, 96]) { linea(16, y, 56, y - 1, hex('#7a6a4a')); linea(16, y + 1, 56, y, hex('#d8ccb0')); }
    for (const [fx, top] of [[28, 74], [36, 70], [44, 74]]) { linea(fx, 94, fx, top + 4, hex('#7a6a4a')); linea(fx + 1, 94, fx + 1, top + 4, hex('#d8ccb0'));
      R.poligono([[fx - 4, top + 4], [fx, top - 2], [fx + 4, top + 4]], hex('#9a8a6a')); linea(fx - 4, top + 4, fx + 4, top + 4, hex('#7a6a4a')); pset(fx - 1, top + 1, hex('#d8ccb0')); }
    rect(18, 104, 56, 107, C.k); rect(19, 104, 55, 105, hex('#5a4a3a')); rect(30, 108, 44, 112, hex('#3a2e26'));
    rect(252, 58, 300, 104, C.k); rect(253, 59, 299, 103, hex('#6a5444')); rect(256, 62, 296, 100, hex('#d8c8a0'));
    for (let y = 62; y < 101; y++) for (let x = 256; x < 297; x++) if (h(x, y, 94) > 0.86) pset(x, y, hex('#c0ac80'));
    for (const fx of [264, 276, 288]) { linea(fx, 96, fx, 76, hex('#3a6a4a')); R.poligono([[fx - 4, 76], [fx, 68], [fx + 4, 76], [fx, 78]], hex('#4a86c0')); pset(fx, 71, hex('#c84a3a')); }
    for (let x = 256; x < 297; x++) { pset(x, 65, x % 4 < 2 ? hex('#c84a3a') : hex('#3a6ab0')); pset(x, 98, x % 4 < 2 ? hex('#3a6ab0') : hex('#c84a3a')); }
    rect(266, 112, 286, 118, C.k); rect(267, 113, 285, 117, hex('#5a5048')); linea(269, 115, 283, 115, hex('#a89a88'));
    e_luz(R, 0, 0, 319, 179, (x, y) => 1.4 - Math.hypot((x - 160) / 150, (y - 90) / 110), hex('#0c1618'), 0.8);
    // la vitrina: el marco de latón oscuro, el fondo y la peana de madera; la placa sin letras (rayas)
    rect(78, 18, 242, 160, C.k); rect(79, 19, 241, 159, hex('#20383a'));
    for (let y = 20; y < 159; y++) for (let x = 80; x < 241; x++) if (R.b4(x, y) < 0.2 + 0.15 * (1 - (y - 20) / 140)) pset(x, y, hex('#2e4e4e'));
    for (const [a, b, c, d] of [[78, 18, 242, 21], [78, 156, 242, 160], [78, 18, 81, 160], [239, 18, 242, 160]]) { rect(a, b, c, d, hex('#3a2e26')); }
    rect(79, 19, 241, 19, hex('#6a5444')); rect(79, 19, 79, 159, hex('#5a4638'));
    rect(110, 150, 210, 156, C.k); rect(111, 150, 209, 154, hex('#6a4a30')); rect(111, 150, 209, 150, hex('#8a6440'));
    rect(78, 160, 242, 179, C.k); rect(79, 161, 241, 179, hex('#3a3634')); rect(79, 161, 241, 162, hex('#5a5652'));
    rect(140, 166, 180, 174, C.k); rect(141, 167, 179, 173, hex('#5a5048')); for (const y of [169, 171]) linea(145, y, 175, y, hex('#a89a88'));
    e_piezaFina(R, [118, 26, 202, 150], () => PIEZAS_TU.bustoReina?.(R, 160, 150, { s: 4 }));
  });
  // los reflejos del cristal que se deslizan despacio y una mota de polvo en la luz
  const d = Math.round(Math.sin(t * 0.4) * 6);
  for (const [x0, l, c] of [[96, 70, hex('#5a8a8a')], [104, 46, hex('#4a7a7a')], [214, 60, hex('#5a8a8a')]]) for (let i = 0; i < l; i++) { const x = x0 + d + Math.round(i * 0.45), y = 150 - i * 1.6; if (R.b4(x, Math.round(y)) < 0.7) pset(x, Math.round(y), c); }
  pset(120 + Math.round(Math.sin(t * 0.5) * 30), 40 + Math.round((t * 4) % 100), hex('#8ab0b0'));
  // el piloto de la alarma de la vitrina, que parpadea despacio en el canto de abajo, y el brillo que recorre el marco
  pset(232, 157, Math.floor(t * 0.8) % 2 ? hex('#5ad08a') : hex('#1a4a2a'));
  { const u = (t * 0.2) % 1.5; if (u < 1) { const x = Math.round(80 + u * 160); pset(x, 19, hex('#a88a70')); pset(x + 1, 19, hex('#8a7058')); } }
  // la duda: una «?» grande que aparece encima y flota
  const du = o.duda ?? 0;
  if (du > 0) { const s = e_cl(du * 1.4), y = 26 + Math.round(Math.sin(t * 2.4) * 2), e = Math.max(1, Math.round(4 * s));
    R.halo(206, y + 12, 18 * s, [hex('#3a6a6a'), hex('#4a7a78')], 0.9); R.icono('?', 206 - Math.round(2.5 * e), y + Math.round(14 * (1 - s)), C.blanco, C.k, e); }
  return { busto: [176, 74], duda: [206, 40] };
}
// una casita de adobe blanco de techo plano (la cara al sol, la sombra, la puerta, las ventanitas y la escalera al techo)
function e_casa(R, x, yb, w, a, k) {
  const { rect, pset } = R;
  rect(x, yb - a, x + w, yb, C.k); rect(x + 1, yb - a + 1, x + w - 1, yb, e_P.adobe); rect(x + 1, yb - a + 1, x + w - 1, yb - a + 1, e_P.adobeL);
  rect(x + w - 2, yb - a + 2, x + w - 1, yb, e_P.adobeS);
  if (w > 7) { rect(x + 2, yb - 4, x + 3, yb, hex('#5a3a24')); rect(x + 5, yb - a + 3, x + 6, yb - a + 4, hex('#4a3a2a')); }
  if (k % 3 === 0 && w > 10) { rect(x + w - 6, yb - a - 3, x + w - 2, yb - a, C.k); rect(x + w - 5, yb - a - 2, x + w - 3, yb - a, hex('#c8a878')); }
  if (k % 4 === 1) for (let i = 0; i < 3; i++) pset(x + w - 3 + i, yb - a + 2 + i, e_P.adobeS);
}

// una palmera datilera (el tronco anillado y las hojas que se mecen con el viento)
function e_palmera(R, x, yb, a, t, k = 0) {
  const sw = Math.sin(t * 1.2 + k) * 1.5, tx = x + Math.round(sw * 0.5);
  for (let y = yb; y > yb - a; y--) { const xx = Math.round(x + (sw * 0.5) * (yb - y) / a); R.pset(xx, y, (y % 3) ? hex('#7a5a34') : hex('#5a3e22')); R.pset(xx + 1, y, hex('#5a3e22')); }
  const cx = tx, cy = yb - a;
  for (let i = 0; i < 7; i++) { const an = -Math.PI + i * Math.PI / 6 + Math.sin(t * 1.5 + i + k) * 0.08, L = a * 0.42;
    for (let s = 0; s < L; s++) { const u = s / L, px = Math.round(cx + Math.cos(an) * s), py = Math.round(cy + Math.sin(an) * s * 0.7 + u * u * L * 0.5); R.pset(px, py, u < 0.5 ? hex('#3a7a3a') : hex('#5a9a4a')); if (s % 2) R.pset(px, py + 1, hex('#2a5a2a')); } }
  R.disco(cx, cy + 1, 1.5, hex('#a86a2a'));
}

// el GRAN DISCO SOLAR con los rayos que acaban en manitas (los rayos respiran con t; b = brillo 0–1)
function e_disco(R, cx, cy, r, t, b, rayos = true) {
  const { disco, linea, pset } = R;
  R.halo(cx, cy, r * (2 + b * 1.2), [hex('#f8e8b0'), hex('#fcf0c8'), hex('#fff8e0')], 0.7 + b * 0.6);
  if (rayos) for (let i = 0; i < 9; i++) { const an = Math.PI * (0.22 + i * 0.07), L = r * 2.6 + Math.sin(t * 2 + i) * 2 + (i % 2) * 6;
    const x1 = cx + Math.cos(an) * L, y1 = cy + Math.sin(an) * L;
    linea(cx + Math.cos(an) * r, cy + Math.sin(an) * r, x1, y1, (x, y, k) => (k % 2 ? hex('#f0b030') : hex('#f8d060')));
    const hx = Math.round(x1), hy = Math.round(y1); pset(hx, hy, hex('#e8a020')); pset(hx - 1, hy + 1, hex('#e8a020')); pset(hx + 1, hy + 1, hex('#e8a020')); pset(hx, hy + 1, hex('#f8d060')); pset(hx, hy + 2, hex('#e8a020')); }
  disco(cx, cy, r + 1, hex('#c86a18')); disco(cx, cy, r, hex('#f0a028')); disco(cx - r * 0.25, cy - r * 0.25, r * 0.6, hex('#f8c848')); disco(cx - r * 0.4, cy - r * 0.4, r * 0.22, hex('#fff0a0'));
  if (b > 0.6) for (let i = 0; i < 8; i++) { const an = t * 0.5 + i * Math.PI / 4, rr = r + 3 + (b - 0.6) * 10; pset(Math.round(cx + Math.cos(an) * rr), Math.round(cy + Math.sin(an) * rr), hex('#fff4c0')); }
}

function e_amarna(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  e_fijo(R, 'amarna', () => {
    // el cielo tramado cálido y los acantilados del este al fondo (con sus capas y sus quebradas)
    e_cieloT(R, 0, 74, [e_P.cielo0, e_P.cielo1, e_P.cielo2, e_P.cielo3]);
    poligono([[0, 74], [0, 62], [30, 60], [44, 64], [80, 58], [120, 60], [150, 56], [176, 60], [220, 58], [260, 54], [290, 58], [320, 56], [320, 80], [0, 80]], (x, y) => (Math.sin(y * 0.9 + x * 0.02) > 0.5 ? e_P.acantiladoS : h(x >> 1, y, 93) > 0.9 ? e_P.acantiladoS : e_P.acantilado));
    for (const x of [40, 130, 210, 284]) for (let y = 60; y < 78; y++) pset(x + Math.round(Math.sin(y * 0.4) * 2), y, e_P.acantiladoS);
    // el desierto entre los acantilados y la ciudad, y los campos verdes junto al río (surcos y acequias)
    rect(0, 78, 319, 179, hex('#ead0a0')); for (let x = 0; x < 320; x += 3) pset(x + Math.floor(h(x, 1, 94) * 3), 80 + Math.floor(h(x, 2, 94) * 8), hex('#d8bc88'));
    poligono([[0, 88], [120, 86], [80, 120], [40, 180], [0, 180]], (x, y) => ((x + y * 2) % 9 < 2 ? e_P.campoS : (y % 5 === 0 ? e_P.campoL : e_P.campo)));
    // el NILO en diagonal (con su orilla de juncos) que baja por la izquierda
    poligono([[0, 118], [24, 110], [60, 96], [100, 88], [124, 88], [92, 104], [56, 130], [30, 160], [16, 180], [0, 180]], (x, y) => (h(x >> 1, y, 95) > 0.85 ? e_P.niloL : (y + x) % 7 === 0 ? e_P.niloS : e_P.nilo));
    for (let y = 92; y < 180; y += 3) { const x = Math.round(56 - (y - 130) * 0.8 + 30 * (y < 130 ? (130 - y) / 40 : 0)); pset(x, y, hex('#4a7a3a')); pset(x + 1, y - 1, hex('#6a9a4a')); }
    // la CIUDAD: filas de casas blancas que se apretan hacia el fondo, con patios, árboles y la calle real
    rect(100, 88, 319, 150, hex('#e8d8b8'));
    for (let fila = 0; fila < 5; fila++) { const yb = 98 + fila * 12, a = 6 + fila * 2; for (let x = 110 - fila * 6, k = fila * 7; x < 330; k++) { const w = 8 + Math.floor(h(k, fila, 96) * 9) + fila;
      if (!(x > 176 && x < 228 && fila < 3) && !(x > 232 && fila < 4)) e_casa(R, x, yb, w, a, k); if (h(k, 3, 96) > 0.8) { disco(x + w + 3, yb - a, 3, hex('#4a8a3a')); disco(x + w + 2, yb - a - 1, 2, hex('#6aaa4a')); } x += w + 2 + Math.floor(h(k, 2, 96) * 3); } }
    for (let x = 100; x < 320; x++) if (x % 2) pset(x, 147, hex('#d8c4a0'));
    for (let k = 0; k < 14; k++) { const x = 112 + Math.floor(h(k, 1, 130) * 200), y = 104 + Math.floor(h(k, 2, 130) * 40); if (x > 174 && x < 230 && y < 120) continue;
      if (k % 3 === 0) { disco(x, y, 3, C.k); disco(x, y, 2, hex('#d8c098')); pset(x - 1, y - 1, e_P.adobeL); }
      else if (k % 3 === 1) { rect(x, y, x + 2, y + 3, [C.lapis, e_P.rojoE, e_P.verdeE][k % 3]); rect(x, y - 1, x + 2, y - 1, C.oro); }
      else { linea(x, y, x + 10, y, hex('#8a6a4a')); for (let i = 0; i < 3; i++) rect(x + 2 + i * 3, y + 1, x + 3 + i * 3, y + 3, [C.blanco, hex('#c84a2a'), hex('#4a8ac0')][i]); } }
    // el puesto del mercado con su toldo de rayas, cestas de dátiles y cántaros, junto al camino
    rect(232, 140, 268, 150, hex('#8a6a4a')); for (let x = 230; x < 270; x++) { pset(x, 136, ((x >> 2) % 2) ? e_P.rojoE : C.blanco); pset(x, 137, ((x >> 2) % 2) ? hex('#8a2a1a') : hex('#d8d0c0')); }
    linea(232, 138, 232, 150, hex('#5a3a1c')); linea(267, 138, 267, 150, hex('#5a3a1c'));
    for (const [x, c] of [[238, hex('#7a3a2a')], [248, hex('#c89a3a')], [258, hex('#4a8a3a')]]) { disco(x, 141, 3, C.k); disco(x, 141, 2, c); }
    // el TEMPLO abierto del disco (derecha): las dos torres de la puerta con sus mástiles, los patios sin techo y las
    // filas de MESAS DE OFRENDAS al sol
    for (const x of [236, 268]) { poligono([[x, 116], [x + 3, 70], [x + 21, 70], [x + 24, 116]], (xx, yy) => (xx > x + 18 ? e_P.adobeS : h(xx >> 1, yy >> 1, 97) > 0.9 ? e_P.adobeS : e_P.adobe)); rect(x + 2, 68, x + 22, 70, C.k); rect(x + 3, 67, x + 21, 68, e_P.adobeL); }
    rect(260, 90, 268, 116, hex('#5a3a24')); rect(261, 90, 267, 92, hex('#c8a060'));
    rect(228, 116, 319, 132, hex('#f0e4c8')); rect(228, 116, 319, 117, e_P.adobeL); for (let x = 228; x < 320; x += 30) rect(x, 116, x + 1, 132, e_P.adobeS);
    for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) { const x = 232 + i * 7 + (j % 2) * 3, y = 120 + j * 4; rect(x, y, x + 3, y + 1, e_P.adobeS); pset(x + 1, y - 1, [hex('#c84a2a'), hex('#4a8a3a'), hex('#e8b030')][(i + j) % 3]); }
    // el PALACIO con el BALCÓN de las apariciones (la ventana grande con su dintel de colores) en el centro
    rect(176, 74, 228, 116, C.k); rect(177, 75, 227, 116, e_P.adobe); rect(177, 75, 227, 76, e_P.adobeL); rect(224, 77, 227, 116, e_P.adobeS);
    for (let x = 178; x < 227; x++) pset(x, 78, [C.lapis, e_P.rojoE, e_P.verdeE, C.oro][(x >> 1) % 4]);
    rect(184, 82, 220, 96, hex('#3a2a20')); rect(185, 83, 219, 95, hex('#5a4030')); for (const x of [190, 214]) { rect(x - 1, 83, x + 1, 96, e_P.adobeS); pset(x, 83, C.oro); }
    for (let y = 100; y < 116; y += 6) for (let x = 182; x < 226; x += 9) rect(x, y, x + 2, y + 2, hex('#4a3a2a'));
    rect(176, 116, 228, 118, C.k);
    // el camino de la orilla (primer término), con piedras, huellas y matas
    for (let y = 150; y < 180; y++) for (let x = 40; x < 320; x++) { const n = h(x >> 1, y, 98); pset(x, y, n > 0.9 ? hex('#c8a878') : n < 0.08 ? hex('#f4e0b8') : hex('#e4c898')); }
    poligono([[40, 150], [62, 150], [36, 180], [16, 180]], hex('#d8b888'));
    for (const [x, y] of [[90, 168], [180, 172], [260, 164], [300, 174]]) { rect(x, y, x + 3, y + 1, hex('#b89868')); pset(x + 1, y - 1, hex('#f8e8c8')); }
    for (let x = 0; x < 320; x += 3) { const y = 151 + Math.floor(h(x, 3, 131) * 3); pset(x, y, hex('#d0b080')); }
    for (let y = 152; y < 180; y += 5) for (let x = 60 + (y % 2) * 7; x < 320; x += 14) { pset(x, y, hex('#d8bc8c')); pset(x + 1, y, hex('#d8bc8c')); }
    rect(270, 168, 319, 179, C.k); for (let y = 169; y < 180; y++) for (let x = 271; x < 320; x++) pset(x, y, (y - 169) % 4 === 0 || ((x + ((y - 169) >> 2) * 4) % 9 === 0) ? hex('#b08a5a') : h(x, y, 132) > 0.85 ? hex('#c8a070') : hex('#d8b484'));
    rect(271, 168, 319, 168, hex('#f0dcb0'));
    for (const [x, a] of [[82, 9], [92, 7], [288, 8]]) { disco(x, 160 - a * 0.4, a * 0.45, C.k); disco(x, 160 - a * 0.4, a * 0.45 - 1, hex('#b8683a')); pset(x - 1, 158 - a * 0.5, hex('#d88a5a')); rect(x - 1, 160 - a, x + 1, 160 - a * 0.8, hex('#9a5a30')); }
    for (const x of [64, 110, 150, 204]) { for (let i = 0; i < 5; i++) linea(x + i - 2, 164, x + (i - 2) * 2, 158 - (i % 2) * 2, i % 2 ? hex('#6a8a3a') : hex('#4a6a2a')); }
    linea(30, 128, 30, 112, hex('#5a3a1c')); linea(31, 128, 31, 112, hex('#7a5a34'));
  });
  // las nubes finas, los pájaros (ibis) sobre el río y el GRAN DISCO SOLAR (o.disco 0–1 su brillo)
  R.recorte([0, 0, 272, 179]); e_nubes(R, t, 26, [hex('#d8e4ec'), hex('#f0f4f4'), C.blanco], -40, 360, 4); R.recorte(null);
  for (let k = 0; k < 3; k++) { const u = ((t * 0.04 + k * 0.33) % 1); e_ave(R, -10 + u * 160, 52 + k * 6 + Math.sin(t + k) * 2, t, hex('#2a2a2a'), k); }
  e_disco(R, 212, 36, 12, t, o.disco ?? 0.7);
  // las barcas de vela que bajan por el río, el brillo del agua y el humo de los hornos de pan
  for (let k = 0; k < 2; k++) { const u = ((t * 0.035 + k * 0.5) % 1), x = Math.round(110 - u * 100), y = Math.round(90 + u * 76);
    poligono([[x - 7, y], [x + 7, y], [x + 5, y + 3], [x - 5, y + 3]], hex('#7a4a24')); linea(x, y, x, y - 12, hex('#5a3a1c')); poligono([[x + 1, y - 12], [x + 8, y - 2], [x + 1, y - 2]], hex('#f4ecd8')); linea(x + 1, y - 2, x + 8, y - 2, hex('#c8b898')); }
  for (let k = 0; k < 10; k++) pset(20 + ((k * 23 + Math.floor(t * 5)) % 90), 100 + ((k * 31) % 70), C.blanco);
  for (const [x, y] of [[150, 104], [256, 108]]) for (let i = 0; i < 6; i++) pset(Math.round(x + Math.sin(t * 1.5 + i) * 1.5 + i * 0.6), y - i * 3 - Math.floor(t * 3) % 3, i % 2 ? hex('#d8d0c8') : hex('#f0ece8'));
  // las banderolas de los mástiles del templo, que ondean
  for (const x of [240, 292]) { linea(x, 70, x, 50, hex('#5a3a1c')); for (let i = 0; i < 8; i++) pset(x + 1 + i, 51 + Math.round(Math.sin(t * 5 + i * 0.8) * 1.2), i < 4 ? e_P.rojoE : C.blanco); }
  // la gente pequeña: una mujer con un cesto en la cabeza y un hombre con un burrito que pasan por el camino
  { const u = (t * 0.05) % 1, x = 300 - u * 260; e_gentecilla(R, x, 162, t, [hex('#f4ecd8'), hex('#a8643a'), hex('#1c1410')], { anda: true, alto: 11, dir: -1 }); disco(Math.round(x), 149, 2.5, hex('#c89a4a')); }
  { const u = ((t * 0.04) + 0.4) % 1, x = Math.round(60 + u * 240); e_gentecilla(R, x, 172, t, [hex('#e8dcc0'), hex('#8a4a2a'), hex('#1c1410')], { anda: true, alto: 11 });
    rect(x - 16, 164, x - 6, 169, hex('#8a8078')); rect(x - 6, 162, x - 3, 166, hex('#8a8078')); pset(x - 4, 161, hex('#6a6058')); linea(x - 15, 170, x - 15, 172 + (Math.floor(t * 6) % 2), hex('#5a504a')); linea(x - 7, 170, x - 7, 172 + (Math.floor(t * 6 + 1) % 2), hex('#5a504a')); }
  { const a = Math.sin(t * 0.9) * 0.35, x0 = 30 + Math.cos(-0.5 + a) * -14, y0 = 112 + Math.sin(-0.5 + a) * -14, x1 = 30 + Math.cos(-0.5 + a) * 18, y1 = 112 + Math.sin(-0.5 + a) * 18;
    linea(x0, y0, x1, y1, hex('#7a5a34')); disco(x0, y0, 2, hex('#8a7a6a')); linea(x1, y1, x1, y1 + 10, hex('#5a3a1c')); rect(x1 - 1, y1 + 10, x1 + 1, y1 + 12, hex('#9a5a30')); }
  { const p = Math.floor(t * 0.7) % 2; rect(176, 160, 186, 164, hex('#e8e0d0')); rect(176, 160, 186, 160, C.blanco); rect(186 - 0, 157 + p * 2, 189, 160 + p * 2, hex('#e8e0d0')); pset(189, 157 + p * 2, hex('#5a4a3a'));
    linea(177, 165, 177, 167, hex('#5a4a3a')); linea(185, 165, 185, 167, hex('#5a4a3a')); pset(175, 160, hex('#5a4a3a')); }
  for (const [x, a, k] of [[132, 34, 0], [150, 26, 1], [306, 40, 2]]) e_palmera(R, x, 150, a, t, k);
  return { balcon: [202, 96], reyes: [186, 203], disco: [212, 36], rio: [60, 130], templo: [236, 70, 319, 132] };
}

// lo de delante en 'amarna': el PRETIL del balcón (tapa los pies de los reyes) y una palmera en primer término
function e_amarnaDelante(R, t, o) {
  const { rect, pset } = R;
  rect(182, 88, 222, 97, C.k); rect(183, 89, 221, 96, e_P.adobe); rect(183, 89, 221, 89, e_P.adobeL);
  for (let x = 184; x < 221; x += 4) { pset(x, 92, [C.lapis, e_P.rojoE, e_P.verdeE, C.oro][(x >> 2) % 4]); pset(x + 1, 92, [C.lapis, e_P.rojoE, e_P.verdeE, C.oro][(x >> 2) % 4]); }
  rect(183, 95, 221, 96, e_P.adobeS);
  e_palmera(R, 14, 180, 60, t, 5);
}

// una figura en relieve rehundido (perfil, sin ojos): el contorno hundido en sombra, el cuerpo pintado algo gastado;
// tipo 'rey' | 'reina' | 'nino'; sin = sin cara (la han raspado)
function e_relieve(R, x, yb, dir, tipo, a, sin = 0) {
  const { poligono, disco, rect, linea, pset } = R, X = (d) => x + d * dir * a / 60, Y = (d) => yb - d * a / 60;
  const piel = tipo === 'reina' ? hex('#d8a060') : hex('#b8683a'), ropa = hex('#f4ecd8'), som = hex('#7a6040');
  const cuerpo = (c, o2) => { poligono([[X(-5 - o2), Y(46)], [X(6 + o2), Y(46)], [X(5 + o2), Y(30)], [X(-5 - o2), Y(30)]], c);
    poligono([[X(-6 - o2), Y(31)], [X(7 + o2), Y(31)], [X(9 + o2), Y(0)], [X(-6 - o2), Y(0)]], c); disco(X(0.5), Y(52), (4 + o2) * a / 60, c); };
  cuerpo(som, 1);
  poligono([[X(-5), Y(46)], [X(6), Y(46)], [X(5), Y(30)], [X(-5), Y(30)]], piel);
  poligono([[X(-6), Y(31)], [X(7), Y(31)], [X(9), Y(1)], [X(-6), Y(1)]], ropa); for (let k = 0; k < 4; k++) linea(X(-3 + k * 3), Y(29), X(-2 + k * 3), Y(3), hex('#d8ccb0'));
  linea(X(4), Y(44), X(16), Y(48), piel); linea(X(4), Y(43), X(16), Y(47), piel); disco(X(17), Y(48), 1.5 * a / 60, piel);
  if (!sin) { disco(X(0.5), Y(52), 4 * a / 60, piel); poligono([[X(4), Y(54)], [X(6.5), Y(52)], [X(4), Y(50.5)]], piel); }
  else { disco(X(0.5), Y(52), 4.5 * a / 60, hex('#e4d4b0')); for (let k = 0; k < 6; k++) pset(X(-2 + (k % 3) * 2), Y(54 - Math.floor(k / 3) * 3), hex('#b8a47c')); }
  if (tipo === 'reina') { poligono([[X(-4), Y(56)], [X(-3), Y(64)], [X(4), Y(64)], [X(4), Y(56)]], C.lapis); rect(Math.min(X(-4), X(4)), Y(57), Math.max(X(-4), X(4)), Y(56), C.oro); }
  else if (tipo === 'rey') { poligono([[X(-5), Y(52)], [X(-4), Y(60)], [X(0), Y(63)], [X(4), Y(60)], [X(4), Y(55)], [X(-1), Y(53)], [X(-2), Y(48)], [X(-6), Y(48)]], C.lapis); }
  else { poligono([[X(-5), Y(56)], [X(3), Y(57)], [X(3), Y(53)], [X(-1), Y(52)], [X(-1), Y(46)], [X(-5), Y(46)]], hex('#2a2420')); }
}

// un cartucho (óvalo con su cuerda) con iconos nuestros (sol, escarabajo, pluma); r = 0–1 lo raspado
function e_cartucho(R, x, y, w, hh, r, iconos) {
  const { rect, disco, pset, linea } = R;
  rect(x - w, y - hh, x + w, y + hh, hex('#7a6040')); rect(x - w + 1, y - hh + 1, x + w - 1, y + hh - 1, e_P.piedraTL);
  for (const yy of [y - hh, y + hh]) for (let i = -w + 2; i <= w - 2; i++) pset(x + i, yy, hex('#7a6040'));
  rect(x - w - 1, y + hh + 1, x + w + 1, y + hh + 2, hex('#7a6040'));
  iconos.forEach((k, i) => { const iy = y - hh + 5 + i * 9; if (i / iconos.length < r) { for (let j = 0; j < 12; j++) pset(x - 3 + Math.floor(h(i, j, 5) * 7), iy - 2 + Math.floor(h(j, i, 5) * 6), h(i, j, 6) > 0.5 ? hex('#c8b490') : hex('#fff8e8')); return; }
    if (k === 'sol') { disco(x, iy, 2.5, e_P.rojoE); pset(x - 1, iy - 1, hex('#e86a4a')); }
    else if (k === 'escarabajo') { disco(x, iy, 2.5, hex('#2a6a8a')); linea(x - 3, iy - 2, x + 3, iy + 2, hex('#1a4a6a')); linea(x - 3, iy + 2, x + 3, iy - 2, hex('#1a4a6a')); }
    else { linea(x, iy - 3, x, iy + 3, C.lapis); pset(x + 1, iy - 3, C.lapis); pset(x + 1, iy - 2, C.lapis); } });
}

function e_templo(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, bo = o.borra ?? 0, co = o.corona ?? 0;
  e_fijo(R, 'templo', () => {
    // los sillares de caliza a matajunta, con su textura, la cornisa arriba (tranquila) y el suelo de arena abajo
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 22), xo = (x + (fila % 2) * 30) % 60, j = xo === 0 || y % 22 === 0, n = h(x >> 1, y >> 1, 99);
      pset(x, y, j ? e_P.piedraTS : n > 0.92 ? e_P.piedraTS : n < 0.06 ? e_P.piedraTL : xo === 1 || y % 22 === 1 ? e_P.piedraTL : e_P.piedraT); }
    e_luz(R, 0, 0, 319, 179, (x, y) => 0.6 + (x + 180 - y) / 500, hex('#8a6a44'), 0.5);
    rect(0, 162, 319, 179, hex('#e4c898')); rect(0, 162, 319, 163, e_P.piedraTS); for (let x = 0; x < 320; x += 5) pset(x + Math.floor(h(x, 1) * 4), 166 + Math.floor(h(x, 2) * 12), hex('#c8a878'));
    // el panel grande (derecha, para que el cincel entre por el borde): el disco con rayos que acaban en manitas sobre
    // el rey y la reina que ofrecen; los dos cartuchos, junto a la reina
    rect(118, 46, 306, 156, hex('#b89a6c')); rect(120, 48, 304, 154, e_P.piedraTL);
    for (let y = 49; y < 154; y++) for (let x = 121; x < 304; x++) if (h(x >> 1, y >> 1, 100) > 0.9) pset(x, y, e_P.piedraT);
    e_disco(R, 202, 58, 9, 0, 0.3, true);
    e_relieve(R, 168, 150, 1, 'rey', 84); e_relieve(R, 232, 150, -1, 'reina', 78);
    rect(196, 118, 208, 120, hex('#7a6040')); rect(197, 116, 207, 118, hex('#c84a2a')); pset(200, 115, hex('#4a8a3a')); pset(204, 115, C.oro);
    // el panel pequeño (izquierda): la reina y el rey niño (la corona pasa de una a otro)
    rect(10, 56, 108, 156, hex('#b89a6c')); rect(12, 58, 106, 154, e_P.piedraTL);
    for (let y = 59; y < 154; y++) for (let x = 13; x < 106; x++) if (h(x >> 1, y >> 1, 101) > 0.9) pset(x, y, e_P.piedraT);
    // en los dos paneles: el filete tallado de dentro, el friso de arriba (bloques de color gastados), la línea de
    // suelo con su banda de registro y marcas de cincel; en la pared, grietas, chorreones de humedad y desconchones
    for (const [x0, y0, x1, y1] of [[120, 48, 304, 154], [12, 58, 106, 154]]) {
      for (let x = x0 + 3; x <= x1 - 3; x++) { pset(x, y0 + 3, e_P.piedraTS); pset(x, y1 - 3, e_P.piedraTS); pset(x, y0 + 4, C.blanco); }
      for (let y = y0 + 3; y <= y1 - 3; y++) { pset(x0 + 3, y, e_P.piedraTS); pset(x1 - 3, y, e_P.piedraTS); pset(x0 + 4, y, C.blanco); }
      for (let x = x0 + 5; x < x1 - 4; x++) { const k = Math.floor((x - x0) / 4) % 3, c = [hex('#4a7ab0'), hex('#b8503a'), hex('#4a8a5a')][k]; if (h(x, y0, 102) > 0.25) { pset(x, y0 + 6, c); if ((x - x0) % 4 && h(x, y0 + 7, 102) > 0.3) pset(x, y0 + 7, e_mez(c, e_P.piedraTL, 0.4)); } }
      for (let x = x0 + 5; x < x1 - 4; x++) { pset(x, 151, e_P.relieve); if (h(x, 152, 103) > 0.3) pset(x, 152, (x >> 2) % 2 ? hex('#6a8ab0') : hex('#c8805a')); }
      for (let k = 0; k < 40; k++) { const x = x0 + 6 + Math.round(h(k, 1, 104 + x0) * (x1 - x0 - 12)), y = y0 + 10 + Math.round(h(k, 2, 104 + x0) * (y1 - y0 - 20)); pset(x, y, e_P.piedraTS); pset(x + 1, y + 1, e_P.piedraT); } }
    for (const [x, y, L] of [[112, 22, 26], [4, 100, 40], [312, 54, 50], [60, 24, 18]]) { let cx = x; for (let i = 0; i < L; i++) { cx += Math.round(h(i, x, 105) * 2 - 1); pset(cx, y + i, e_P.piedraTS); if (i % 3 === 0) pset(cx + 1, y + i, e_P.piedraTL); } }
    for (const x of [8, 114, 310]) for (let y = 40; y < 162; y++) if (h(x, y >> 2, 106) > 0.35) pset(x + Math.round(Math.sin(y * 0.2)), y, e_mez(e_P.piedraT, hex('#8a7050'), 0.35));
    // la arena de abajo: guijarros con su sombra, esquirlas de piedra y pisadas
    for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 107) * 316), y = 166 + Math.round(h(k, 2, 107) * 12); rect(x, y, x + 2, y + 1, hex('#b89a6c')); pset(x, y, hex('#f4e6c4')); pset(x + 1, y + 2, hex('#a88a5c')); }
    for (let k = 0; k < 6; k++) { const x = 20 + k * 48 + Math.round(h(k, 3, 107) * 10), y = 168 + (k % 2) * 5; rect(x, y, x + 3, y + 1, hex('#d0b07c')); pset(x + 1, y - 1, hex('#d0b07c')); }
  });
  // los cartuchos (con o.borra: raspados) y las caras de los relieves que el cincel deja en blanco
  const CART = [[266, 80], [284, 80]];
  e_cartucho(R, CART[0][0], CART[0][1], 6, 15, e_cl(bo * 2.5), ['sol', 'escarabajo', 'pluma']); e_cartucho(R, CART[1][0], CART[1][1], 6, 15, e_cl((bo - 0.4) * 2.86), ['pluma', 'sol', 'escarabajo']);
  if (bo > 0.7) { e_relieve(R, 168, 150, 1, 'rey', 84, 1); e_relieve(R, 232, 150, -1, 'reina', 78, 1); }
  // la corona (o.corona 0–1) pasa en arco de la reina (izquierda) al rey niño (derecha)
  e_relieve(R, 36, 150, 1, 'reina', 70); e_relieve(R, 82, 150, -1, 'nino', 50);
  { const x0 = 37, y0 = 81, x1 = 83, y1 = 107, u = e_cl(co), x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * 18);
    if (co > 0 && co < 1) for (let k = 1; k < 5; k++) { const v = Math.max(0, u - k * 0.06); pset(Math.round(x0 + (x1 - x0) * v), Math.round(y0 + (y1 - y0) * v - Math.sin(v * Math.PI) * 18) + 4, hex('#c8b490')); }
    poligono([[x - 5, y + 4], [x - 4, y - 4], [x, y - 7], [x + 4, y - 4], [x + 4, y + 4]], C.k); poligono([[x - 4, y + 3], [x - 3, y - 4], [x, y - 6], [x + 3, y - 4], [x + 3, y + 3]], C.lapis);
    pset(x - 1, y - 2, C.lapisL); pset(x + 1, y, C.lapisL); pset(x + 3, y - 1, C.oro); if (co >= 1 && Math.sin(t * 4) > 0.6) pset(x - 2, y - 5, C.blanco); }
  // el polvo de arena que el viento arrastra por el suelo y las motas que brillan en el sol
  for (let k = 0; k < 10; k++) { const x = Math.round((h(k, 1, 108) * 340 + t * (14 + k % 4 * 5)) % 340) - 10, y = 164 + Math.round(h(k, 2, 108) * 14 + Math.sin(t * 3 + k) * 1.5); pset(x, y, hex('#f4e0b4')); if (k % 3 === 0) pset(x - 1, y, hex('#e4c898')); }
  for (let k = 0; k < 6; k++) { const x = Math.round(130 + h(k, 3, 108) * 160 + Math.sin(t * 0.6 + k) * 8), y = Math.round(60 + ((h(k, 4, 108) * 90 + t * 3) % 90)); if (Math.floor(t * 2 + k) % 3) pset(x, y, hex('#fff8e0')); }
  // el CINCEL: la mano canónica con el cincel que golpea el cartucho; esquirlas que saltan
  if (bo > 0 && bo < 0.75 && o.mano !== false) {
    const tgt = bo < 0.4 ? CART[0] : CART[1], gol = Math.abs(Math.sin(t * 9)), hx = tgt[0] + 12 + Math.round(gol * 3), hy = tgt[1] + 8 + Math.round(gol * 2);
    linea(hx - 4, hy - 4, hx - 13, hy - 13, hex('#5a5a62')); linea(hx - 3, hy - 4, hx - 12, hy - 13, hex('#8a8a92')); pset(hx - 13, hy - 14, hex('#c8c8d0'));
    brazo(R, 326, hy + 30, hx, hy, '#c8b898', -1);
    for (let k = 0; k < 6; k++) { const ph = (t * 3 + k * 0.17) % 1, a = -2.4 + k * 0.5; pset(Math.round(tgt[0] + Math.cos(a) * ph * 18), Math.round(tgt[1] + Math.sin(a) * ph * 14 + ph * ph * 16), k % 2 ? e_P.piedraTL : C.blanco); }
  }
  return { cartucho: CART[0], cartuchos: CART, corona: [[37, 81], [83, 107]], caras: [[168, 98], [232, 99]] };
}
// las vistas (encuadre o cámara) y lo de delante de cada una
const e_VISTAS = { pared: e_pared, pantalla: e_pantalla, segundo: e_segundo, plana: e_plana, prensa: e_prensa, publico: e_publico, canon: e_canon, roca: e_roca,
  turin: e_turin, carpeta: e_carpeta, museo: e_museo, busto: e_busto, amarna: e_amarna, templo: e_templo };

const e_DELANTE = { pared: e_paredDelante, segundo: e_segundoDelante, prensa: e_prensaDelante, publico: e_publicoDelante, canon: e_canonDelante,
  turin: e_turinDelante, museo: e_museoDelante, amarna: e_amarnaDelante };

// umbral de Bayer 4 × 4 (0–1): para tramar degradados y bordes blandos sin ruido
const f_ldU = (x, y) => [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5][((y & 3) << 2) | (x & 3)] / 16 + 1 / 32;

// mezcla dos colores: a = 0 deja c, a = 1 da d
function f_ldMez(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// un tono de una rampa (l 0–1), tramado entre los dos vecinos
const f_ldT = (rampa, l, x, y) => rampa[Math.max(0, Math.min(rampa.length - 1, Math.floor(l * (rampa.length - 1) + f_ldU(x, y))))];

// ruido suave en 1D (para perfiles de monte)
const f_ldR1 = (x, k, paso) => { const i = Math.floor(x / paso), f = x / paso - i, s = f * f * (3 - 2 * f); return h(i, 0, k) * (1 - s) + h(i + 1, 0, k) * s; };

// la capa fija de cada vista: se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma (con su máscara
// del cielo, para que las nubes pasen solo por el cielo y por detrás de los montes)
const f_ldCapas = new Map();

function f_ldBuf(R, clave, dibuja) {
  let c = f_ldCapas.get(clave);
  if (!c) { const b = R.nuevo(), prev = R.usar(b); const cielo = dibuja() || null; R.usar(prev); c = { b, m: null }; if (cielo) { c.m = new Uint8Array(320 * 180); const S = new Set(cielo); for (let i = 0; i < 57600; i++) if (S.has(b[i])) c.m[i] = 1; } f_ldCapas.set(clave, c); }
  return c;
}

function f_ldCapa(R, clave, dibuja) { const c = f_ldBuf(R, clave, dibuja); R.copiar(c.b); return c.m; }

const f_ldH = (a) => a.map((c) => hex(c));

const f_LDC = {
  cieloDia: f_ldH(['#86acd6', '#98bade', '#acc8e2', '#c0d6e8', '#d2e0ea', '#e2e8e8', '#eeeadc', '#f4e6cc']),
  cieloTarde: f_ldH(['#56609c', '#6e68a4', '#8c72a4', '#ac7e98', '#ca8e82', '#e2a276', '#f0bc7a', '#f6d494']),
  nubeDia: f_ldH(['#b8c6d4', '#dae2ea', '#f6f8f8']), nubeTarde: f_ldH(['#94708e', '#de9a88', '#ffd8aa']),
  roca: f_ldH(['#5a4430', '#72563c', '#8a6a4a', '#a28058', '#ba966a', '#d0ac80', '#e0c296', '#ecd6b0', '#f6e8cc']),
  estrato: f_ldH(['#4a3826', '#5e472f', '#735839', '#8a6a45', '#a07d53', '#b49062', '#c6a272', '#d6b486', '#e2c69c']),
  lejos: f_ldH(['#a88e80', '#b89c8c', '#c8ac98', '#d6bca6', '#e2cab4', '#ecd8c4']),
  tumba: f_ldH(['#3a2616', '#b48a58', '#d2ae7c', '#e6c898', '#f2dcb4']),
  pintada: f_ldH(['#b07a2c', '#e0a848', '#f4cc78']),
  mancha: f_ldH(['#3a2462', '#563886', '#7254a8', '#8c6cc2', '#a68ad6']),
  azul: f_ldH(['#1c56a4', '#4aa8ff', '#b4dcff']),
  madera: f_ldH(['#2e1c10', '#442a18', '#5a3a22', '#6e4a2c', '#865c38', '#9c7048']),
  metal: f_ldH(['#3a3e48', '#5a606c', '#7e8592', '#a6adb8', '#d0d6de']),
  blanco: f_ldH(['#8a8c90', '#b8bcc0', '#dadcdc', '#f2f2ee', '#ffffff']),
  lona: f_ldH(['#8a7a5a', '#a8966e', '#c4b088', '#d8c8a0', '#ebdcb8']),
  papel: f_ldH(['#b8ae98', '#d6ccb4', '#e8e0cc', '#f4eedf', '#fbf8ef']),
  corcho: f_ldH(['#7a5230', '#9a6a3e', '#b4824e', '#c89a62']),
  k: hex('#1e140c'), sombra: hex('#3a2a1c'), rojo: hex('#c83a2a'), rojoL: hex('#ee6a4a'), verde: hex('#4a9a4a'), verdeL: hex('#8ad06a'),
  naranja: hex('#e07a2a'), ambar: f_ldH(['#5a2a08', '#a8500e', '#e08a24', '#ffc860', '#fff0b8']), frio: f_ldH(['#1c2a3a', '#3a5a7a', '#7aa8d0', '#c8e6ff', '#ffffff']),
};

// el cielo de una vista: degradado tramado (con una ondulación suave para que no haga franjas), el sol con su halo y la
// calima del horizonte. Devuelve la rampa (para la máscara del cielo de f_ldCapa)
function f_ldCielo(R, y1, luz, sol = [236, 20]) {
  const S = luz === 'tarde' ? f_LDC.cieloTarde : f_LDC.cieloDia, n = S.length - 1;
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    const d = Math.hypot(x - sol[0], (y - sol[1]) * 1.3);
    let l = Math.pow(y / y1, 0.85) * 0.92 + Math.sin(x * 0.021 + y * 0.09) * 0.025 + (h(x >> 3, y >> 2, 81) - 0.5) * 0.03 + Math.max(0, 1 - d / 70) * 0.35;
    R.pset(x, y, S[Math.max(0, Math.min(n, Math.floor(l * n + f_ldU(x, y) * 0.9)))]);
  }
  const [sx, sy] = sol, cs = luz === 'tarde' ? [hex('#ffd890'), hex('#ffeec0')] : [hex('#fff8e4'), hex('#ffffff')];
  R.disco(sx, sy, 7, cs[0]); R.disco(sx - 1, sy - 1, 5, cs[1]);
  return S.concat(cs);
}

// las nubes que pasan (solo donde la máscara dice cielo): cada una, unas bolas de borde blando con tres tonos (la luz
// arriba, el cuerpo y la sombra abajo); lista: [[x, y, ancho, velocidad, semilla]]
function f_ldNubes(R, t, m, luz, lista) {
  const N = luz === 'tarde' ? f_LDC.nubeTarde : f_LDC.nubeDia;
  for (const [x0, y0, w, v, k] of lista) {
    const x = ((x0 + t * v) % 400 + 400) % 400 - 50, bolas = [];
    for (let i = 0; i < 5; i++) bolas.push([x + (i - 2) * w * 0.2 + (h(i, k, 82) - 0.5) * w * 0.15, y0 - (i === 1 || i === 2 ? w * 0.13 : 0) - h(i, k, 83) * w * 0.06, w * (0.17 + h(i, k, 84) * 0.1)]);
    const a = Math.floor(x - w * 0.7), b = Math.ceil(x + w * 0.7), top = Math.floor(y0 - w * 0.45), bot = Math.ceil(y0 + w * 0.2);
    for (let yy = Math.max(0, top); yy <= Math.min(179, bot); yy++) for (let xx = Math.max(0, a); xx <= Math.min(319, b); xx++) {
      if (!m || !m[yy * 320 + xx] || (xx >= 270 && yy <= 48)) continue;
      let v2 = 0; for (const [bx, by, r] of bolas) { const d = 1 - Math.hypot((xx - bx) / r, (yy - by) / (r * 0.7)); if (d > v2) v2 = d; }
      if (yy > y0 + w * 0.08) v2 *= 1 - (yy - y0 - w * 0.08) / (w * 0.12);   // la base, plana
      if (v2 <= f_ldU(xx, yy) * 0.45) continue;
      const u = (yy - top) / Math.max(1, bot - top);
      R.pset(xx, yy, u < 0.38 ? N[2] : u < 0.72 ? N[1] : N[0]);
    }
  }
}

// pájaros: vencejos que pasan aleteando y un milano que planea en círculos (lejos de Atom y del año)
function f_ldPajaros(R, t, zona, n = 3, milano = null) {
  const [x0, y0, x1, y1] = zona, c = hex('#3a2e2a');
  for (let k = 0; k < n; k++) {
    const x = Math.round(x0 + ((h(k, 1, 85) * (x1 - x0) + t * (14 + k * 5)) % (x1 - x0))), y = Math.round(y0 + h(k, 2, 85) * (y1 - y0) + Math.sin(t * 1.3 + k) * 3), a = Math.sin(t * 13 + k * 2) > 0;
    R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : -1) + (a ? 0 : -1), c); R.pset(x + 2, y - (a ? 2 : -1) + (a ? 0 : -1), c);
  }
  if (milano) { const [cx, cy, r] = milano, an = t * 0.5, x = Math.round(cx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r * 0.35), b = Math.sin(t * 2.2) > 0.85 ? 1 : 0, cm = hex('#5a3a26'), cl = hex('#8a6040');
    R.linea(x - 5, y - 1 - b, x - 1, y, cm); R.linea(x + 1, y, x + 5, y - 1 - b, cm); R.pset(x, y, cl); R.pset(x, y + 1, cm); R.pset(x - 1, y + 2, cm); R.pset(x + 1, y + 2, cm); R.pset(x - 6, y - 1 - b, cl); R.pset(x + 6, y - 1 - b, cl); }
}

// riscos lejanos de caliza (el valle al fondo), con calima: escalones, cornisas claras, caras en sombra y regueros
// verticales. top(x): la cresta; base: hasta dónde baja
function f_ldRiscos(R, x0, x1, top, base, k = 0, rampa = f_LDC.lejos, luz = 'dia') {
  for (let x = x0; x <= x1; x++) {
    const yt = Math.round(top(x)), pend = top(x + 1) - top(x - 1);
    for (let y = Math.max(0, yt); y <= base; y++) {
      const esc = (y - yt + Math.round(f_ldR1(x, k + 5, 9) * 6)) % 9, cara = pend > 0.6 ? -0.18 : pend < -0.6 ? 0.1 : 0;
      let l = 0.62 + cara - (esc === 0 ? -0.22 : esc < 3 ? 0.12 : 0) + (h(x >> 1, (y + x) >> 2, k) - 0.5) * 0.14 + (x % 7 === 0 && esc > 2 ? -0.08 : 0) + (y - yt) / (base - yt + 1) * 0.12;
      if (y === yt) l = 0.92;
      R.pset(x, y, f_ldT(rampa, Math.max(0, Math.min(1, l)), x, y));
    }
  }
}

// una piedra suelta en el suelo: el canto iluminado arriba a la izquierda, la sombra abajo a la derecha y la sombra que
// echa sobre el suelo
function f_ldPiedra(R, x, y, w, hh, rampa = f_LDC.roca, base = 0.55) {
  for (let j = -hh; j <= hh + 1; j++) for (let i = -w - 1; i <= w + 2; i++) {
    const d = Math.hypot(i / w, j / hh);
    if (d > 1) { if (j >= 0 && Math.hypot((i - 1.5) / w, (j - 0.8) / hh) <= 1.05) R.pset(x + i, y + j, rampa[1]); continue; }
    R.pset(x + i, y + j, f_ldT(rampa, base + 0.3 * (-(i / w) - (j / hh)) * 0.6 + (d > 0.8 && j > 0 ? -0.15 : 0), x + i, y + j));
  }
}

// el suelo de caliza suelta de la ladera, con grano, guijarros y alguna veta (l, la luz de base)
const f_ldGrano = (x, y, l) => l + (h(x, y, 86) - 0.5) * 0.1 + (h(x >> 1, y >> 1, 87) > 0.9 ? 0.14 : 0) + (h(x >> 1, y >> 1, 88) > 0.93 ? -0.18 : 0);

// el tinte de la tarde sobre lo ya pintado de una franja (solo en las capas fijas: una vez)
function f_ldTarde(R, y0, y1, a = 0.22) {
  const c = hex('#f08a4a'), s = hex('#5a3a6a');
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const p = R.pget(x, y), lum = ((p & 255) + ((p >> 8) & 255) + ((p >> 16) & 255)) / 765; R.pset(x, y, f_ldMez(p, lum > 0.45 ? c : s, a)); }
}

// la roca de caliza EN CORTE (canon): capas onduladas de tonos distintos, la junta oscura entre capas, nódulos de sílex,
// grietas en diagonal y un poco más oscura hacia abajo. e: escala (1 en los cortes, 2 en los insertos)
function f_ldEstrato(x, y, e = 1, prof = 0) {
  const xs = x / e, ys = y / e, ond = Math.sin(xs * 0.035) * 4 + Math.sin(xs * 0.11 + 1.3) * 1.2, yy = ys + ond, capa = Math.floor(yy / 8), dentro = yy - capa * 8;
  let l = 0.72 - prof * 0.32 + (h(capa, 0, 89) - 0.5) * 0.22 + (h(xs >> 1, ys >> 1, 90) - 0.5) * 0.12;
  if (dentro < 0.9) l -= 0.3; else if (dentro < 1.9) l += 0.1;
  if (h(Math.floor(xs / 5), capa, 91) > 0.86 && dentro > 3 && dentro < 6) { const dx = (xs % 5) - 2.5, dy = dentro - 4.5; if (dx * dx / 4 + dy * dy / 1.4 < 1) l = 0.12 + (dy < 0 ? 0.12 : 0); }
  const g = (xs + ys * 0.6) % 47; if (h(Math.floor((xs + ys * 0.6) / 47), capa >> 1, 92) > 0.7 && g < 0.9 && dentro > 1) l -= 0.32;
  return Math.max(0, Math.min(1, l));
}

// lo que importa del corte del canon: la superficie del monte (y de x) y la tumba (en coordenadas de la pantalla)
const f_ldSup = (x) => (x < 232 ? 66 - x * 16 / 232 : 48) + Math.round((f_ldR1(x, 93, 7) - 0.5) * 2.4);

const f_LD_TUMBA = { pasillo: [62, 98, 112, 110], ante: [112, 92, 168, 128], anexo: [120, 130, 150, 144], pintada: [174, 96, 214, 130] };

// la tumba en corte: la escalera (el suelo en escalones), el pasillo, la antecámara con su anexo y la cámara pintada con
// su filo amarillo, en ocre claro con el contorno oscuro; dx, dy, ex, ey: dónde y cuánto (1 = el canon)
function f_ldTumbaCorte(R, T = f_LD_TUMBA, esc = [30, 66, 40, 63], sup = f_ldSup) {
  const Tc = f_LDC.tumba, P = f_LDC.pintada;
  const hueco = (x0, y0, x1, y1, pint) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const u = (y - y0) / (y1 - y0);
      const som = y - y0 < 2 ? -0.35 : y - y0 < 4 ? -0.15 : 0, pie = y1 - y < 2 ? -0.2 : 0;
      R.pset(x, y, pint ? f_ldT(P, 0.95 - u * 0.4 + som + (h(x, y, 94) - 0.5) * 0.1, x, y) : f_ldT(Tc, 0.9 - u * 0.25 + som + pie + (h(x >> 1, y, 94) - 0.5) * 0.12, x, y));
    }
  };
  const [ex, ey, cx, cy] = esc, [px0, py0, px1, py1] = T.pasillo;
  // la escalera: el techo baja recto y el suelo en escalones
  for (let x = ex - 2; x <= px0; x++) {
    const techo = Math.round(cy + (x - cx) * (py0 - cy) / (px0 - cx)), paso = Math.floor((x - ex) / 4), suelo = Math.min(py1, Math.round(ey + 2 + paso * 4 * (py1 - ey) / (px0 - ex)));
    for (let y = Math.max(sup(x) + 1, x < cx ? sup(x) + 1 : techo); y <= suelo; y++) R.pset(x, y, f_ldT(Tc, 0.8 - (y - techo) * 0.01 + (h(x, y, 94) - 0.5) * 0.08, x, y));
    R.pset(x, suelo + 1, Tc[0]); if (x >= cx) R.pset(x, techo - 1, Tc[0]);
    if ((x - ex) % 4 === 0) for (let y = suelo - 4; y <= suelo; y++) if (y > techo) R.pset(x, y, Tc[0]);
  }
  hueco(px0, py0, px1, py1); hueco(...T.ante); hueco(...T.anexo); hueco(...T.pintada, true);
  // las puertas entre cuartos
  const [a0, a1, a2, a3] = T.ante, [p0, p1, p2, p3] = T.pintada, [n0, n1, n2, n3] = T.anexo;
  hueco(a2, Math.round(p3 - (p3 - p1) * 0.45), p0, p3); hueco(n0 + 8, a3, n0 + 14, n1);
  // el contorno oscuro de todo
  const borde = (x0, y0, x1, y1) => { R.linea(x0 - 1, y0 - 1, x1 + 1, y0 - 1, Tc[0]); R.linea(x0 - 1, y1 + 1, x1 + 1, y1 + 1, Tc[0]); R.linea(x0 - 1, y0 - 1, x0 - 1, y1 + 1, Tc[0]); R.linea(x1 + 1, y0 - 1, x1 + 1, y1 + 1, Tc[0]); };
  const pinta = (x, y, c) => R.pset(x, y, c);
  borde(px0, py0, px1, py1); borde(...T.ante); borde(...T.anexo); borde(...T.pintada);
  hueco(px1 - 1, py0, a0 + 1, py1); hueco(a2 - 1, Math.round(p3 - (p3 - p1) * 0.45), p0 + 1, p3); hueco(n0 + 8, a3 - 1, n0 + 14, n1 + 1);
  hueco(px0 - 1, py0, px0 + 1, py1);
  // el filo amarillo de la cámara pintada y su cenefa de rayas de colores
  for (let x = p0; x <= p2; x++) { pinta(x, p1, P[1]); pinta(x, p1 + 1, [hex('#2a4a9a'), hex('#c83a2a'), hex('#3a8a4a')][Math.floor(x / 2) % 3]); pinta(x, p3, P[0]); }
  for (let y = p1; y <= p3; y++) { pinta(p2, y, P[1]); if (y < p3 - (p3 - p1) * 0.45) pinta(p0, y, P[1]); }
  // la pared del fondo de la cámara pintada: pictogramas nuestros diminutos (figuras y un disco), sin letras
  for (let k = 0; k < 4; k++) { const fx = p0 + 6 + k * 9, fy = p3 - 4; R.rect(fx, fy - 9, fx + 1, fy - 4, k === 1 ? hex('#f2f0e4') : hex('#a8584a')); R.pset(fx, fy - 11, hex('#2a2a3a')); R.pset(fx + 1, fy - 11, k === 0 ? hex('#2a4a9a') : hex('#2a2a3a')); R.pset(fx, fy - 10, hex('#a8584a')); R.pset(fx, fy - 3, hex('#a8584a')); R.pset(fx + 1, fy - 3, hex('#a8584a')); if (k === 1) { R.pset(fx, fy - 13, hex('#c83a2a')); R.pset(fx + 1, fy - 13, hex('#c83a2a')); } }
  // el suelo de los cuartos, algo más oscuro
  for (const [x0, , x1, y1] of [T.pasillo, T.ante, T.anexo]) for (let x = x0; x <= x1; x++) pinta(x, y1, Tc[1]);
}

// las MANCHAS de menos densidad (canon): tramadas, de borde blando, que se espesan con a (0–1); la fuerte tiene las dos
// esquinas de arriba rectas. Laten un poco con t. lista: [[x0, y0, x1, y1, fuerza, recta]]
// fuerte: más contraste (el núcleo casi opaco y oscuro) y un borde ancho que se deshace en tramado (para el 'trazo',
// donde tienen que leerse a 640 px)
function f_ldManchas(R, t, a, lista, clip = null, fuerte = false) {
  if (a <= 0) return;
  const M = f_LDC.mancha;
  for (const [x0, y0, x1, y1, f, recta] of lista) {
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rx = (x1 - x0) / 2, ry = (y1 - y0) / 2, mx = fuerte ? Math.ceil(rx * 0.4) + 2 : 6, my = fuerte ? Math.ceil(ry * 0.4) + 2 : 4;
    for (let y = y0 - my; y <= y1 + my; y++) for (let x = x0 - mx; x <= x1 + mx; x++) {
      if (clip && (x < clip[0] || x > clip[2] || y < clip[1] || y > clip[3])) continue;
      const nx = (x - cx) / rx, ny = (y - cy) / ry;
      let d = recta && ny < 0 ? Math.max(Math.abs(nx), Math.abs(ny)) * 1.0 : Math.hypot(nx, ny * (recta ? 1 : 1));
      d += (h(x >> 1, y >> 1, 95) - 0.5) * (recta && ny < 0 ? 0.08 : 0.3) + Math.sin(t * 1.4 + x * 0.1) * 0.03;
      if (fuerte) {
        const s = Math.max(0, Math.min(1, (1.32 - d) / 0.62)) * Math.min(1, a * f * 1.6);
        if (s <= f_ldU(x, y) * 0.98 + 0.01) continue;
        const core = Math.max(0, Math.min(1, (0.85 - d) / 0.55)) * Math.min(1, a * 1.3), p = R.pget(x, y);
        R.pset(x, y, f_ldMez(p, core > 0.55 ? M[0] : core > 0.15 ? M[1] : M[2], 0.62 + 0.33 * core));
        continue;
      }
      const v = (1.15 - d) * 1.6 * a * f;
      if (v <= f_ldU(x, y)) continue;
      const p = R.pget(x, y);
      R.pset(x, y, f_ldMez(p, v > 1.1 ? M[1] : v > 0.7 ? M[2] : M[3], Math.min(0.85, 0.35 + v * 0.35)));
    }
  }
}
// la capa fija: el cielo con los riscos lejanos en calima, la costra de piedras de la superficie, la roca en capas, la
// tumba, el murete y la barandilla de la entrada (x 22–46), la flecha del norte (a la derecha) y la regla de la escala
function f_ldCorteFijo(R, luz) {
  const cielo = f_ldCielo(R, 66, luz, [206, 20]);
  f_ldRiscos(R, 0, 268, (x) => 40 + f_ldR1(x, 96, 23) * 9 + f_ldR1(x, 97, 7) * 2 + (x > 200 ? (x - 200) * 0.06 : 0), 66, 31, f_LDC.lejos, luz);
  for (let x = 0; x < 320; x++) {
    const s = f_ldSup(x);
    for (let y = s; y < 180; y++) {
      const d = y - s;
      if (d < 4) R.pset(x, y, f_ldT(f_LDC.roca, f_ldGrano(x, y, 0.62 - d * 0.06), x, y));
      else R.pset(x, y, f_ldT(f_LDC.estrato, f_ldEstrato(x, y, 1, Math.min(1, (y - s) / 120)), x, y));
    }
    if (d0(x)) R.pset(x, s, f_LDC.roca[7]);
  }
  function d0(x) { return f_ldSup(x - 1) >= f_ldSup(x); }
  // las piedras sueltas sobre la superficie
  for (let k = 0; k < 26; k++) { const x = Math.round(6 + h(k, 1, 98) * 308); if (x > 18 && x < 50) continue; f_ldPiedra(R, x, f_ldSup(x) - 1, 1 + Math.round(h(k, 2, 98) * 2), 1, f_LDC.roca, 0.6); }
  f_ldTumbaCorte(R);
  // el murete de contención y la barandilla de la entrada (en la superficie, a los dos lados de la escalera)
  for (const [a, b] of [[20, 27], [41, 47]]) for (let x = a; x <= b; x++) { const s = f_ldSup(x); for (let y = s - 5; y < s; y++) R.pset(x, y, f_ldT(f_LDC.roca, ((x + (y % 2) * 2) % 4 === 0 || y % 3 === 0) ? 0.35 : 0.7, x, y)); R.pset(x, s - 6, f_LDC.roca[7]); }
  R.linea(20, f_ldSup(20) - 10, 47, f_ldSup(47) - 10, f_LDC.metal[3]); for (const x of [20, 33, 47]) R.linea(x, f_ldSup(x) - 10, x, f_ldSup(x) - 6, f_LDC.metal[2]);
  // la regla de la escala (solo cifras) abajo a la izquierda y la flecha del norte (a la derecha, con la estrella)
  for (let x = 10; x <= 70; x++) { R.pset(x, 170, f_LDC.k); R.pset(x, 171, (Math.floor((x - 10) / 12) % 2) ? f_LDC.blanco[3] : f_LDC.k); }
  for (const x of [10, 34, 58]) R.linea(x, 167, x, 171, f_LDC.k);
  R.numero('0', 9, 166, { color: f_LDC.blanco[3] }); R.numero('10', 54, 166, { color: f_LDC.blanco[3] });
  R.linea(288, 168, 306, 168, f_LDC.blanco[3]); R.linea(288, 169, 306, 169, f_LDC.k); for (let i = 0; i < 4; i++) { R.linea(303 + i, 164 + i, 303 + i, 172 - i, f_LDC.blanco[3]); }
  R.pset(284, 166, f_LDC.blanco[4]); R.pset(283, 168, f_LDC.blanco[4]); R.pset(285, 168, f_LDC.blanco[4]); R.pset(284, 170, f_LDC.blanco[4]); R.pset(284, 168, f_LDC.blanco[3]);
  if (luz === 'tarde') f_ldTarde(R, 0, 179, 0.16);
  return cielo;
}

// la perforadora diminuta de la cumbre (para los cortes): las patas, el mástil, el motor naranja que tiembla mientras
// perfora, la lona y el generador con su humo
function f_ldTorre(R, x, y, t, activa) {
  const tb = activa ? (Math.floor(t * 20) % 2) : 0, M = f_LDC.metal;
  R.linea(x - 5, y, x - 1, y - 16, M[1]); R.linea(x + 5, y, x + 1, y - 16, M[1]); R.linea(x, y - 18, x, y, M[0]); R.linea(x - 3, y - 8, x + 3, y - 8, M[1]);
  R.rect(x - 1, y - 19, x + 1, y - 18, M[3]);
  R.rect(x - 4 + tb, y - 13, x - 1 + tb, y - 10, f_LDC.naranja); R.pset(x - 4 + tb, y - 13, hex('#ffb060')); R.pset(x - 1 + tb, y - 10, hex('#9a4a14'));
  R.rect(x - 7, y - 1, x + 7, y, f_LDC.madera[4]); R.linea(x - 7, y + 1, x + 7, y + 1, f_LDC.madera[1]);
  // el generador, al lado, con su humito
  R.rect(x + 9, y - 4, x + 15, y, hex('#7a2a24')); R.rect(x + 9, y - 4, x + 15, y - 4, hex('#b04a3a')); R.pset(x + 14, y - 5, M[0]);
  if (activa) for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1; R.pset(x + 14 + Math.round(u * 4 + Math.sin(t * 3 + k) * 1), y - 6 - Math.round(u * 8), f_ldMez(M[3], f_LDC.blanco[4], u)); }
  // la lona en dos palos
  R.linea(x - 16, y, x - 16, y - 8, f_LDC.madera[2]); R.linea(x - 8, y, x - 8, y - 7, f_LDC.madera[2]);
  for (let i = -17; i <= -7; i++) R.pset(x + i, y - 8 - (i < -12 ? 0 : 1) + (Math.sin(t * 3 + i) > 0.8 ? 1 : 0), f_LDC.lona[3]);
}

// gente pequeña de fondo (6–8 px): la cabeza, el cuerpo de un color, las piernas que se alternan al andar
function f_ldFigura(R, x, y, t, c, o = {}) {
  x = Math.round(x); y = Math.round(y);
  const p = o.anda ? Math.floor(t * 6 + x) % 2 : 0, piel = o.piel ?? hex('#c8925e'), alto = o.alto ?? 7;
  R.pset(x, y, f_LDC.k); R.pset(x + 1, y, f_LDC.k); if (p) { R.pset(x - 1, y - 1, f_LDC.k); R.pset(x + 2, y - 1, f_LDC.k); } else { R.pset(x, y - 1, f_LDC.k); R.pset(x + 1, y - 1, f_LDC.k); }
  R.rect(x, y - alto + 3, x + 1, y - 2, c); R.pset(x - 1, y - alto + 4, c); R.pset(x + 2, y - alto + 4, c);
  R.rect(x, y - alto + 1, x + 1, y - alto + 2, piel); if (o.gorro) { R.rect(x - 1, y - alto + 1, x + 2, y - alto + 1, o.gorro); R.pset(x, y - alto, o.gorro); R.pset(x + 1, y - alto, o.gorro); }
}

// la banderita de un jalón, que ondea
function f_ldJalon(R, x, y, t, alto = 10, c = f_LDC.rojo) {
  R.linea(x, y, x, y - alto, f_LDC.blanco[2]); for (let j = 0; j < alto; j += 3) R.pset(x, y - j, f_LDC.rojo);
  for (let i = 1; i <= 4; i++) { const o = Math.round(Math.sin(t * 6 + i * 0.9 + x) * 0.8); R.pset(x + i, y - alto + o, c); R.pset(x + i, y - alto + 1 + o, i < 4 ? c : f_ldMez(c, f_LDC.k, 0.3)); }
}

// el agujero de la broca en el corte: un tubo oscuro de dos píxeles con las paredes claras, la broca de metal en la
// punta y el polvillo que sube por la boca mientras perfora
function f_ldBroca(R, x, y0, y1, t, activa, e = 1) {
  for (let y = y0; y <= y1; y++) { R.pset(x - e, y, f_LDC.estrato[8]); for (let i = 0; i < 2 * e; i++) R.pset(x + i, y, f_LDC.k); R.pset(x + 2 * e, y, f_LDC.estrato[1]); }
  if (activa) { const g = Math.floor(t * 16) % 3; for (let j = 0; j < 4 * e; j++) for (let i = 0; i < 2 * e; i++) R.pset(x + i, y1 - j, (j + g) % 3 ? f_LDC.metal[3] : f_LDC.metal[1]); R.pset(x, y1 + 1, f_LDC.metal[4]);
    for (let k = 0; k < 6; k++) { const u = (t * 1.6 + k / 6) % 1; R.pset(x + Math.round(Math.sin(k * 2.3 + t * 2) * (2 + u * 5)), y0 - 1 - Math.round(u * 9), f_ldMez(f_LDC.roca[7], f_LDC.blanco[4], u)); } }
}

function f_ldCorte(R, t, o, q) {
  const m = f_ldCapa(R, 'corte|' + q.luz, () => f_ldCorteFijo(R, q.luz));
  f_ldNubes(R, t, m, q.luz, [[30, 28, 40, 1.6, 1], [190, 22, 30, 1.1, 2], [120, 34, 52, 2.4, 3]]);
  f_ldPajaros(R, t, [60, 24, 240, 40], 2, [150, 30, 30]);
  // los turistas que bajan por el camino hacia la entrada y el guarda junto a la barandilla
  for (let k = 0; k < 4; k++) { const u = (t * 0.06 + k * 0.27) % 1, x = 2 + u * 17; f_ldFigura(R, x, f_ldSup(Math.round(x)) - 1, t, [hex('#d84a4a'), hex('#4a7ad0'), hex('#f0f0e8'), hex('#3aa070')][k], { anda: true, gorro: k % 2 ? hex('#f0e0a0') : null }); }
  f_ldFigura(R, 50, f_ldSup(50) - 1, t, hex('#5a6a7a'), { gorro: hex('#3a4a5a') });
  // los jalones de la rejilla de medidas en la ladera y la perforadora en la cumbre (2026)
  for (const x of [120, 160, 200, 230]) f_ldJalon(R, x, f_ldSup(x) - 1, t, 7);
  const torre = q.ep >= 2026 || o.broca != null, b = Math.max(0, Math.min(1, o.broca ?? 0)), yb = Math.round(48 + (96 - 48) * b);
  if (torre) { f_ldTorre(R, 256, f_ldSup(256) - 1, t, b > 0 && b < 1); if (b > 0) f_ldBroca(R, 255, f_ldSup(256) + 1, yb, t, b < 1); }
  // las manchas (el pasillo del este de 2020, aparte)
  const a = Math.max(0, Math.min(1, o.anomalias ?? 1));
  f_ldManchas(R, t, a, [[238, 88, 276, 128, 1, true], [180, 70, 220, 86, 0.45, false], [90, 74, 130, 88, 0.4, false]], null, !!q.fuerte);
  if (o.pasillo) f_ldManchas(R, t, Math.min(1, o.pasillo), [[60, 80, 150, 90, 0.8, false]]);
  return { broca: [256, torre ? yb : 48] };
}
// el inserto 'mancha': la roca de cerca (escala 2) entre la PARED NORTE de la cámara pintada (a la izquierda, con su
// pintura asomando por el filo) y la mancha fuerte (a la derecha); el agujero que baja por x 200 desde arriba
function f_ldMancha(R, t, o, q) {
  f_ldCapa(R, 'mancha', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, f_ldT(f_LDC.estrato, f_ldEstrato(x + 140, y + 90, 2, 0.35), x, y));
    // el interior de la cámara (x 0–40): el ocre con la cenefa, un trozo de la escena pintada y el zócalo
    const P = f_LDC.pintada;
    for (let y = 0; y < 180; y++) for (let x = 0; x <= 40; x++) R.pset(x, y, f_ldT(P, 0.7 + (h(x >> 1, y >> 1, 99) - 0.5) * 0.18 - (x > 34 ? 0.25 : 0), x, y));
    for (let y = 18; y < 30; y++) for (let x = 0; x <= 38; x++) R.pset(x, y, [hex('#2a4a9a'), hex('#c83a2a'), hex('#3a8a4a'), hex('#f4cc78')][Math.floor((x + (y > 23 ? 3 : 0)) / 4) % 4]);
    R.rect(0, 30, 38, 31, f_LDC.k);
    for (let y = 150; y < 180; y++) for (let x = 0; x <= 38; x++) R.pset(x, y, f_ldT(f_LDC.madera, 0.55 + (h(x, y >> 2, 100) - 0.5) * 0.2, x, y));
    // un trozo de pintura: un brazo azul que sostiene un disco rojo y un pie
    R.disco(16, 68, 7, hex('#c83a2a')); R.disco(15, 67, 4, hex('#e85a3a')); R.rect(4, 82, 30, 85, hex('#2a4a9a')); R.rect(24, 86, 30, 120, hex('#a8584a')); R.rect(20, 120, 34, 132, hex('#f2f0e4')); R.rect(22, 133, 26, 146, hex('#a8584a'));
    for (let y = 0; y < 180; y++) { R.pset(41, y, P[1]); R.pset(42, y, P[0]); R.pset(43, y, f_LDC.k); }
    return null;
  });
  // la regla de la distancia (de la pared al agujero), con los metros si se dan
  for (let x = 46; x <= 196; x++) { R.pset(x, 40, f_LDC.blanco[3]); if ((x - 46) % 30 === 0) R.linea(x, 37, x, 43, f_LDC.blanco[3]); }
  for (let i = 0; i < 3; i++) { R.pset(46 + i, 40 - i, f_LDC.blanco[3]); R.pset(46 + i, 40 + i, f_LDC.blanco[3]); R.pset(196 - i, 40 - i, f_LDC.blanco[3]); R.pset(196 - i, 40 + i, f_LDC.blanco[3]); }
  if (o.metros != null) R.numero(String(o.metros), 121, 34, { centro: true, color: f_LDC.blanco[4] });
  // la mancha fuerte
  f_ldManchas(R, t, Math.max(0, Math.min(1, o.anomalias ?? 1)), [[170, 60, 318, 178, 1, true]]);
  // el agujero, la camarita y el murciélago
  const b = Math.max(0, Math.min(1, o.broca ?? 1)), yb = Math.round(b * 64);
  if (b > 0) f_ldBroca(R, 199, 0, yb, t, b < 1, 2);
  const c = o.camarita ?? 0, res = {};
  if (c > 0 && b >= 1) {
    const L = Math.round(4 + Math.min(1, c / 0.6) * 46), luz = c > 0.75, gira = c > 0.62 ? Math.sin(t * 2.2) : 0;
    const p = PIEZAS_TU.camarita(R, 200, 0, { cable: L, s: 2, t, luz, dir: gira < 0 ? -1 : 1 });
    if (luz) { const [lx, ly] = p.punta, dirx = 0.6 + gira * 0.5; for (let k = 0; k < 160; k++) { const r = 4 + (k % 40), an = (Math.floor(k / 40) - 1.5) * 0.12 + Math.atan2(1, dirx); const x = Math.round(lx + Math.cos(an) * r), y = Math.round(ly + Math.sin(an) * r * 0.9); if (f_ldU(x, y) > 0.3 + r / 60) continue; R.pset(x, y, f_ldMez(R.pget(x, y), f_LDC.frio[3], 0.5)); } }
    res.camarita = p.punta;
  }
  // el murciélago colgado, solo si se pide (o.murcielago): sin la opción no asoma (el gag es del plano siguiente)
  if (o.murcielago != null) { const mb = o.murcielago;
    PIEZAS_TU.murcielago(R, 262, 84, { colgado: true, s: 2 });
    // los ojillos: cerrados (una raya) hasta que abre uno y mira a la camarita
    R.rect(278 - 20, 70, 266, 71, R.pget(262, 66));
    if (mb > 0.4) { R.rect(258, 71, 259, 72, f_LDC.blanco[4]); R.pset(258, 72, f_LDC.k); } }
  res.murcielago = [262, 70];
  return res;
}
// el contorno azul a rayas (segmentos [x0, y0, x1, y1]): el pasillo que sigue tras la pared norte, la escalera, la sala
// grande, otra sala arriba a la derecha y un cuarto pequeño debajo (x 214–316, y 70–150)
const f_LD_REEVES = [[214, 102, 246, 102], [246, 102, 262, 116], [214, 114, 240, 114], [240, 114, 244, 114], [244, 114, 244, 118], [244, 118, 248, 118], [248, 118, 248, 122], [248, 122, 252, 122], [252, 122, 252, 126], [252, 126, 256, 126], [256, 126, 256, 130], [256, 130, 262, 130],
  [262, 116, 262, 96], [262, 96, 286, 96], [286, 96, 286, 72], [286, 72, 314, 72], [314, 72, 314, 120], [314, 120, 302, 120], [302, 120, 302, 142], [302, 142, 296, 142], [296, 142, 296, 150], [296, 150, 270, 150], [270, 150, 270, 142], [270, 142, 262, 142], [262, 142, 262, 130]];

// pinta segmentos a rayas en azul (con su sombra abajo para que se lea sobre la roca) hasta la fracción f del total;
// a (0–1) los va encendiendo en tramado. Devuelve la punta donde va el lápiz
function f_ldRayas(R, segs, f = 1, a = 1, fase = 0) {
  const A = f_LDC.azul, L = segs.reduce((s, [a0, b0, a1, b1]) => s + Math.max(Math.abs(a1 - a0), Math.abs(b1 - b0)), 0);
  let resto = f * L, k = 0, punta = null;
  for (const [x0, y0, x1, y1] of segs) {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
    for (let i = 0; i <= n && resto > 0; i++, resto--, k++) {
      const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); punta = [x, y];
      if (Math.floor((k + fase) / 3) % 2 || f_ldU(x, y) > a * 1.1) continue;
      R.pset(x, y + 1, A[0]); R.pset(x, y, A[1]);
    }
    if (resto <= 0) break;
  }
  return punta;
}

function f_ldTrazo(R, t, o, q) {
  const r = f_ldCorte(R, t, { anomalias: 0, ...o }, { ...q, fuerte: true, ep: o.broca != null ? q.ep : 2015 });
  const a = Math.max(0, Math.min(1, o.reeves ?? 1)), f = Math.max(0, Math.min(1, o.traza ?? 1));
  if (a > 0) {
    const p = f_ldRayas(R, f_LD_REEVES, f, a);
    if (f >= 0.6) R.icono('corona', 275, 112, f_LDC.azul[2], f_LDC.azul[0], 3);
    // la mano que traza con el lápiz azul, mientras dibuja
    // (la mano se queda abajo, cerca del borde, con un rotulador largo de dibujo: el brazo asoma corto, en diagonal)
    if (p && f < 1 && o.traza != null) {
      const [x, y] = p, hx = Math.max(150, Math.min(296, x + 26)), hy = Math.max(146, Math.min(160, y + 50)), fx = hx - 8, fy = hy - 1;
      const n = Math.max(1, Math.ceil(Math.hypot(fx - x, fy - y)));
      for (let i = 2; i <= n; i++) { const px = Math.round(x + (fx - x) * i / n), py = Math.round(y + (fy - y) * i / n); R.pset(px + 1, py + 1, f_LDC.k); R.pset(px, py, i < 6 ? f_LDC.metal[3] : f_LDC.azul[0]); R.pset(px + 1, py, i < 6 ? f_LDC.metal[1] : f_LDC.azul[1]); if (i > 6 && i % 9 === 0) R.pset(px, py - 1, f_LDC.azul[2]); }
      R.pset(x, y, f_LDC.azul[2]); R.pset(x + 1, y + 1, f_LDC.k);
      brazo(R, hx + 22, 200, hx, hy, '#4a5a7a', -1, { codo: [hx + 18, hy + 18] });
      r.mano = [x, y];
    }
  }
  return r;
}
// las tres posibilidades, de cerca al norte de la cámara: cada una en su recuadro azul a rayas con su icono y un «?»
function f_ldPosibles(R, t, o, q, g) {
  f_ldCapa(R, 'posibles|' + q.luz, () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, f_ldT(f_LDC.estrato, f_ldEstrato(x + 60, y + 40, 2, 0.3), x, y));
    // la pared norte de la cámara, a la izquierda (el ocre pintado y el filo amarillo)
    for (let y = 0; y < 180; y++) { for (let x = 0; x <= 14; x++) R.pset(x, y, f_ldT(f_LDC.pintada, 0.7 + (h(x, y >> 1, 101) - 0.5) * 0.2 - x * 0.02, x, y)); R.pset(15, y, f_LDC.pintada[1]); R.pset(16, y, f_LDC.k); }
    for (let y = 30; y < 38; y++) for (let x = 0; x <= 14; x++) R.pset(x, y, [hex('#2a4a9a'), hex('#c83a2a'), hex('#3a8a4a')][Math.floor(x / 3) % 3]);
    return null;
  });
  // la mancha de fondo, muy suave (de ella salen las hipótesis)
  f_ldManchas(R, t, 0.35, [[40, 60, 300, 160, 1, true]]);
  const n = Math.max(0, Math.min(3, o.posibles ?? 3)), A = f_LDC.azul;
  g.posibles.forEach(([cx, cy], i) => {
    const a = Math.max(0, Math.min(1, n - i)); if (a <= 0) return;
    const x0 = cx - 38, y0 = cy - 34, x1 = cx + 38, y1 = cy + 30;
    f_ldRayas(R, [[x0, y0, x1, y0], [x1, y0, x1, y1], [x1, y1, x0, y1], [x0, y1, x0, y0]], 1, a, Math.floor(t * 4));
    const sale = (x, y) => f_ldU(x, y) < a * 1.1;
    const px = (x, y, c) => { if (sale(x, y)) R.pset(x, y, c); };
    const fila = (x, y, f, c) => f.forEach((r, j) => { for (let k = 0; k < r.length; k++) if (r[k] === '#') { px(x + k, y + j + 1, A[0]); px(x + k, y + j, c); } });
    const fila2 = (x, y, f, c) => f.forEach((r, j) => { for (let k = 0; k < r.length; k++) if (r[k] === '#') for (let a2 = 0; a2 < 2; a2++) for (let b2 = 0; b2 < 2; b2++) { px(x + k * 2 + a2, y + j * 2 + b2 + 1, A[0]); } }) || f.forEach((r, j) => { for (let k = 0; k < r.length; k++) if (r[k] === '#') for (let a2 = 0; a2 < 2; a2++) for (let b2 = 0; b2 < 2; b2++) px(x + k * 2 + a2, y + j * 2 + b2, (j < 2 || k === 0) ? A[2] : A[1]); });
    if (i === 0) { // el almacén: un cuarto con tres jarras
      f_ldRayas(R, [[cx - 28, cy - 14, cx + 28, cy - 14], [cx + 28, cy - 14, cx + 28, cy + 20], [cx + 28, cy + 20, cx - 28, cy + 20], [cx - 28, cy + 20, cx - 28, cy - 14]], 1, a);
      for (let k = 0; k < 3; k++) fila2(cx - 23 + k * 17, cy - 10, ['.###.', '..#..', '.###.', '#####', '#####', '#####', '.###.', '..#..'], A[2]);
    } else if (i === 1) { // otra tumba de la familia: un cuarto con dos coronitas
      f_ldRayas(R, [[cx - 28, cy - 14, cx + 28, cy - 14], [cx + 28, cy - 14, cx + 28, cy + 20], [cx + 28, cy + 20, cx - 28, cy + 20], [cx - 28, cy + 20, cx - 28, cy - 14]], 1, a);
      if (a > 0.5) { R.icono('corona', cx - 18, cy, A[2], A[0], 3); R.icono('corona', cx + 3, cy, A[2], A[0], 3); }
    } else { // un pasillo que se corta a medias: la flecha acaba contra la roca
      f_ldRayas(R, [[cx - 32, cy - 4, cx + 6, cy - 4], [cx - 32, cy + 10, cx + 6, cy + 10], [cx - 32, cy - 4, cx - 32, cy + 10]], 1, a);
      for (let y = cy - 8; y <= cy + 14; y++) for (let x = cx + 7; x <= cx + 12; x++) px(x, y, (x + y) % 3 ? f_LDC.estrato[2] : A[0]);
      for (let x = cx - 26; x <= cx + 2; x++) px(x, cy + 3, A[2]); for (let j = 0; j < 4; j++) { px(cx + 2 - j, cy + 3 - j, A[2]); px(cx + 2 - j, cy + 3 + j, A[2]); }
    }
    if (a > 0.5) R.icono('?', x1 - 14, y0 + 4, f_LDC.blanco[4], A[0], 2);
  });
}

// de carrito diminuto y su recorrido; la de delante, el corte) ──
const f_LD_ESTE = { pasillo: [66, 100, 150, 110], ante: [150, 96, 200, 122], anexo: [156, 124, 182, 134], pintada: [206, 98, 240, 122] };

const f_ldSupEste = () => 76;

function f_ldEsteFijo(R, luz) {
  const cielo = f_ldCielo(R, 76, luz, [214, 18]);
  f_ldRiscos(R, 0, 319, (x) => 46 + f_ldR1(x, 102, 19) * 10 + (x > 260 ? 4 : 0), 76, 37, f_LDC.lejos, luz);
  // la cara de arriba: la ladera en perspectiva (más pequeña y más clara al fondo), con las líneas punteadas del radar
  for (let y = 50; y <= 76; y++) { const v = (y - 50) / 26, xr = 288 - v * 26;
    for (let x = 0; x <= xr; x++) { let l = f_ldGrano(x, y, 0.62 + v * 0.06) + (h(Math.floor(x / (1 + v * 2)), y, 103) > 0.94 ? -0.25 : 0);
      R.pset(x, y, f_ldT(f_LDC.roca, l, x, y)); }
    if (Math.round(v * 26) % 6 === 2) for (let x = 6; x <= xr - 6; x += 3) R.pset(x, y, f_LDC.roca[8]); }
  for (let k = 0; k < 9; k++) for (let y = 50; y <= 76; y += 2) { const v = (y - 50) / 26; R.pset(Math.round(30 + k * 30 + (1 - v) * 26), y, f_LDC.roca[7]); }
  // la boca de la escalera y su barandilla
  for (let y = 66; y <= 75; y++) for (let x = 36 + (y - 66) * 0.4; x <= 46 + (y - 66) * 0.4; x++) R.pset(x, y, y < 68 ? f_LDC.k : f_LDC.tumba[1]);
  R.linea(33, 63, 49, 63, f_LDC.metal[3]); R.linea(33, 63, 35, 75, f_LDC.metal[2]); R.linea(49, 63, 51, 75, f_LDC.metal[2]);
  // la cara de delante: el corte, y la de la derecha, en sombra
  for (let y = 76; y < 180; y++) for (let x = 0; x <= 262; x++) R.pset(x, y, f_ldT(f_LDC.estrato, f_ldEstrato(x, y, 1, (y - 76) / 130) + (y < 79 ? 0.1 : 0), x, y));
  for (let x = 262; x <= 288; x++) for (let y = 76 - (x - 262); y < 180 - (x - 262) * 0.0; y++) R.pset(x, y, f_ldT(f_LDC.estrato, f_ldEstrato(x * 2, y, 1, 0.6) - 0.22, x, y));
  for (let x = 289; x < 320; x++) for (let y = 50 + Math.round(f_ldR1(x, 118, 6) * 3); y < 180; y++) R.pset(x, y, f_ldT(f_LDC.roca, f_ldGrano(x, y, 0.5 + (y - 50) / 400), x, y));
  for (let k = 0; k < 40; k++) { const y = Math.round(52 + h(k, 1, 119) * 22), x = Math.round(h(k, 2, 119) * (288 - (y - 50))); f_ldPiedra(R, x, y, 1 + (y > 64 ? 1 : 0), 1, f_LDC.roca, 0.6); }
  for (let x = 0; x <= 262; x++) R.pset(x, 76, f_LDC.roca[8]);
  R.linea(262, 76, 288, 50, f_LDC.roca[7]); R.linea(262, 76, 262, 179, f_LDC.estrato[8]);
  f_ldTumbaCorte(R, f_LD_ESTE, [36, 76, 46, 76], f_ldSupEste);
  if (luz === 'tarde') f_ldTarde(R, 0, 179, 0.16);
  return cielo;
}

// el radar de carrito diminuto (para los planos de lejos) con quien lo empuja
function f_ldCarritoMini(R, x, y, t) {
  x = Math.round(x); y = Math.round(y);
  R.rect(x, y - 3, x + 5, y - 1, f_LDC.rojo); R.rect(x, y - 3, x + 5, y - 3, f_LDC.rojoL); R.pset(x + 1, y, f_LDC.k); R.pset(x + 4, y, f_LDC.k);
  R.linea(x, y - 2, x - 3, y - 6, f_LDC.metal[1]); R.pset(x - 2, y - 5, hex('#8ae0a0'));
  f_ldFigura(R, x - 6, y, t, hex('#e8e4d8'), { anda: true, gorro: hex('#f0f0e8') });
}

function f_ldEste(R, t, o, q) {
  const m = f_ldCapa(R, 'este|' + q.luz, () => f_ldEsteFijo(R, q.luz));
  f_ldNubes(R, t, m, q.luz, [[60, 26, 44, 1.5, 4], [250, 34, 30, 2.2, 5], [160, 40, 26, 3, 6]]);
  f_ldPajaros(R, t, [40, 22, 250, 40], 2);
  // el carrito recorre las líneas de un lado a otro; los jalones de las esquinas de la rejilla
  const u = (t * 0.07) % 2, ida = u < 1, x = ida ? 70 + u * 150 : 220 - (u - 1) * 150;
  for (const [jx, jy] of [[64, 58], [250, 58], [40, 72], [226, 72]]) f_ldJalon(R, jx, jy, t, 8);
  f_ldCarritoMini(R, x, 68, t);
  // el espacio alargado del este (mancha), su parpadeo de duda, el «?» y las cotas (2 de alto, 10 de largo)
  const p = Math.max(0, Math.min(1, o.pasillo ?? 1)), d = Math.max(0, Math.min(1, o.duda ?? 0));
  const parpa = d > 0 ? (Math.sin(t * 7) > 0 ? 1 : 0.45) : 1;
  f_ldManchas(R, t, p * parpa, [[70, 82, 160, 94, 1, false]]);
  if (p >= 0.6) {
    const c = f_LDC.blanco[4], s = f_LDC.k;
    for (let x = 70; x <= 160; x++) { R.pset(x, 80, s); R.pset(x, 79, c); } for (let j = 1; j <= 2; j++) { R.pset(70 + j, 79 - j, c); R.pset(70 + j, 79 + j, c); R.pset(160 - j, 79 - j, c); R.pset(160 - j, 79 + j, c); }
    R.linea(165, 82, 165, 94, c); for (let j = 1; j <= 2; j++) { R.pset(165 - j, 82 + j, c); R.pset(165 + j, 82 + j, c); R.pset(165 - j, 94 - j, c); R.pset(165 + j, 94 - j, c); }
    R.numero('10', 115, 76, { centro: true, color: c }); R.numero('2', 172, 92, { color: c });
  }
  if (d > 0.3) R.icono('?', 182, 78 + Math.round(Math.sin(t * 3) * 1.5), f_LDC.blanco[4], f_LDC.mancha[0], 2);
  return { carrito: [Math.round(x), 68] };
}

// el inserto 'radargrama': la pantalla del radar de carrito, con su marco de goma, en el asa, y la ladera detrás
const f_LD_GRIS = f_ldH(['#0e1216', '#1c242a', '#2e3a42', '#465660', '#62747e', '#8a9ca4', '#b8c8ce', '#e6f2f4']);

function f_ldRadargrama(R, t, o, q) {
  f_ldCapa(R, 'radargrama|' + q.luz, () => {
    f_ldCielo(R, 70, q.luz, [150, 66]);
    for (let y = 60; y < 180; y++) for (let x = 0; x < 320; x++) if (y > 66 + Math.sin(x * 0.02) * 6) R.pset(x, y, f_ldT(f_LDC.roca, f_ldGrano(x >> 1, y >> 1, 0.5 + (y - 60) / 300), x, y));
    // el asa (dos tubos que bajan) y el marco de goma con sus tornillos, botones y la batería
    for (const x0 of [16, 286]) for (let y = 40; y < 180; y++) for (let i = 0; i < 6; i++) R.pset(x0 + i, y + Math.round((x0 < 100 ? 1 : -1) * (y - 40) * 0.0), f_LDC.metal[i < 2 ? 3 : i < 4 ? 2 : 1]);
    for (let y = 24; y <= 166; y++) for (let x = 30; x <= 270; x++) { const b = Math.min(x - 30, 270 - x, y - 24, 166 - y); if (b < 0) continue;
      const esq = (x < 36 || x > 264) && (y < 30 || y > 160); if (esq && b < 2) continue;
      R.pset(x, y, b < 1 ? f_LDC.k : f_ldT(f_LD_GRIS, 0.22 + (b < 3 ? 0.12 : 0) + (h(x, y, 104) - 0.5) * 0.06, x, y)); }
    for (const [x, y] of [[35, 29], [265, 29], [35, 161], [265, 161]]) { R.disco(x, y, 2, f_LDC.metal[2]); R.pset(x, y, f_LDC.k); }
    for (let k = 0; k < 4; k++) { R.rect(84 + k * 30, 155, 104 + k * 30, 160, f_LD_GRIS[3]); R.rect(84 + k * 30, 155, 104 + k * 30, 155, f_LD_GRIS[5]); }
    R.rect(228, 155, 248, 160, f_LD_GRIS[1]); for (let k = 0; k < 4; k++) R.rect(230 + k * 4, 157, 232 + k * 4, 158, f_LDC.verdeL);
    return null;
  });
  // la imagen del radar: capas que ondulan, hipérbolas de piedras sueltas y la banda brillante del eco (o.eco)
  const X0 = 44, Y0 = 34, W = 212, H = 116, ec = Math.max(0, Math.min(1, o.eco ?? 1)), cur = Math.floor((t * 30) % W), G = f_LD_GRIS;
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const tr = i, z = j, cerca = ((cur - i + W) % W);
    let l = 0.3 + 0.16 * Math.sin(z * 0.55 + Math.sin(tr * 0.05) * 2 + tr * 0.01) * Math.exp(-z / 90) + (h(tr >> 1, z, 105) - 0.5) * 0.18 - z / H * 0.15;
    for (const [c, d] of [[40, 30], [150, 52], [190, 22]]) { const hy = d + Math.sqrt((tr - c) * (tr - c) * 0.6 + 16) - 4; if (Math.abs(z - hy) < 1.2 && Math.abs(tr - c) < 26) l += 0.3 * (1 - Math.abs(tr - c) / 26); }
    if (tr > 96 && tr < 196 && z > 62 && z < 70) l += ec * (0.55 - Math.abs(z - 66) * 0.08) * Math.min(1, Math.min(tr - 96, 196 - tr) / 10);
    if (cerca < 3) l += 0.25; else if (cerca > W - 40) l -= 0.12;
    R.pset(X0 + i, Y0 + j, f_ldT(G, Math.max(0, Math.min(1, l)), X0 + i, Y0 + j));
  }
  // la escala de metros a la izquierda y el ledito que late
  for (let m = 0; m <= 4; m++) { const y = Y0 + 4 + m * 26; R.linea(X0, y, X0 + 4, y, G[7]); R.numero(String(m), X0 + 7, y + 4, { color: G[7] }); }
  R.disco(258, 154, 2, Math.sin(t * 5) > 0 ? f_LDC.rojoL : f_LDC.rojo);
  return { eco: [X0 + 146, Y0 + 66] };
}

// las dos mitades se pintan dos veces, a oscuras y alumbradas, y en cada fotograma la luz descubre la versión alumbrada
// alrededor de cada llama (tramado, con el temblor de la vela y el latido del ledito)
function f_ldLucesMitades(R, oscuro) {
  const osc = (c) => c;
  // la izquierda: el muro enlucido de la segunda puerta con sus filas de sellos, el techo de roca y el suelo de cascotes
  for (let y = 0; y < 180; y++) for (let x = 0; x < 157; x++) {
    let c;
    if (y < 18) c = f_ldT(f_LDC.estrato, f_ldEstrato(x, y + 30, 1, 0.5) - 0.2, x, y);
    else if (y > 166) c = f_ldT(f_LDC.roca, f_ldGrano(x, y, 0.45) + (h(x >> 1, y >> 1, 106) > 0.8 ? 0.2 : 0), x, y);
    else c = f_ldT(f_LDC.papel, 0.55 + (h(x >> 1, y >> 1, 107) - 0.5) * 0.25 + (h(x >> 3, y >> 3, 108) - 0.5) * 0.2 + ((x * 3 + y * 7) % 41 === 0 ? -0.3 : 0), x, y);
    R.pset(x, y, osc(c, 0.86));
  }
  // el hueco: negro, con destellos de oro dentro cuando hay luz
  for (let y = 84; y <= 94; y++) for (let x = 100; x <= 113; x++) { const d = Math.hypot((x - 106.5) / 7, (y - 89) / 5.5) + (h(x, y, 109) - 0.5) * 0.25; if (d < 1) R.pset(x, y, !oscuro && h(x, y, 110) > 0.8 ? (h(x, y, 111) > 0.5 ? hex('#f0c040') : hex('#b07a18')) : hex('#0a0604')); }
  const prev = [];
  for (let fila = 0; fila < 5; fila++) for (let k = 0; k < 5; k++) { const x = 18 + k * 28 + (fila % 2) * 12, y = 40 + fila * 28; if (Math.abs(x - 104) < 22 && Math.abs(y - 90) < 20) continue; prev.push([x, y]); }
  for (const [x, y] of prev) PIEZAS_TU.sello(R, x, y);
  // la columna de piedra que parte la pantalla
  for (let y = 0; y < 180; y++) for (let x = 157; x <= 162; x++) R.pset(x, y, osc(f_ldT(f_LDC.roca, 0.55 + (x === 157 ? 0.2 : x === 162 ? -0.25 : 0) + (y % 22 === 0 ? -0.35 : 0) + (h(x, y, 112) - 0.5) * 0.15, x, y), 0.55));
  // la derecha: el corte de 2026 al anochecer: el cielo, la cumbre, la roca en capas y el hueco donde baja la camarita
  for (let y = 0; y < 180; y++) for (let x = 163; x < 320; x++) {
    const s = 48 + Math.round((f_ldR1(x, 113, 9) - 0.5) * 3);
    let c;
    if (y < s) c = f_ldT(f_LDC.cieloTarde, Math.min(0.3, y / 120), x, y);
    else c = osc(f_ldT(f_LDC.estrato, f_ldEstrato(x, y, 1, (y - s) / 140), x, y), 0.78);
    const dc = Math.hypot((x - 236) / 18, (y - 101) / 12) + (h(x >> 1, y >> 1, 114) - 0.5) * 0.3;
    if (dc < 1) c = f_ldMez(c, oscuro ? hex('#0a0810') : hex('#3a2a4a'), dc < 0.75 ? 0.9 : 0.5);
    R.pset(x, y, c);
  }
  // el agujero de la broca, de la cumbre al hueco
  for (let y = 49; y < 92; y++) { R.pset(235, y, hex('#0a0806')); R.pset(236, y, hex('#0a0806')); R.pset(234, y, f_LDC.estrato[7]); }
  // a oscuras: todo menos el cielo de la derecha, casi negro (cada lado con su tono: cálido el de la vela, frío el otro)
  if (oscuro) for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (x > 162 && y < 46 + Math.round((f_ldR1(x, 113, 9) - 0.5) * 3)) continue; R.pset(x, y, f_ldMez(R.pget(x, y), x < 160 ? hex('#0c0806') : hex('#06080e'), x >= 157 && x <= 162 ? 0.6 : 0.9)); }
  return null;
}

function f_ldLuces(R, t, o, q) {
  f_ldCapa(R, 'luces|osc', () => f_ldLucesMitades(R, true));
  const lit = f_ldBuf(R, 'luces|luz', () => f_ldLucesMitades(R, false)).b;
  const v = Math.max(0, Math.min(1, o.vela ?? 1)), l = Math.max(0, Math.min(1, o.luz ?? 1));
  const fl = 1 + Math.sin(t * 17) * 0.04 + Math.sin(t * 7.3) * 0.05, pu = 0.9 + Math.sin(t * 3) * 0.1;
  const descubre = (cx, cy, r, x0, x1, tinte, a) => {
    for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(x0, Math.floor(cx - r)); x <= Math.min(x1, cx + r); x++) {
      const g = 1 - Math.hypot(x - cx, (y - cy) * 1.1) / r; if (g <= 0) continue;
      const i = y * 320 + x; if (g * 1.6 > f_ldU(x, y) + 0.1) R.pset(x, y, f_ldMez(lit[i], tinte, (1 - g) * a)); else if (g * 2.6 > f_ldU(x, y)) R.pset(x, y, f_ldMez(R.pget(x, y), tinte, 0.25));
    }
  };
  if (v > 0) descubre(96, 94, 64 * v * fl, 0, 156, hex('#ff9a3a'), 0.35);
  if (l > 0) descubre(236, 98, 46 * l * pu, 163, 319, hex('#9ac8ff'), 0.3);
  // las motas de polvo que flotan en las dos luces
  for (let k = 0; k < 14; k++) { const izq = k < 7, cx = izq ? 96 : 236, a = (izq ? v : l); if (a <= 0) continue; const x = Math.round(cx + Math.sin(t * 0.4 + k * 2.1) * 26), y = Math.round(96 + Math.cos(t * 0.33 + k * 1.3) * 22 - ((t * 3 + k * 7) % 10)); if ((izq && x > 155) || (!izq && x < 165)) continue; R.pset(x, y, izq ? hex('#ffd890') : hex('#d8ecff')); }
  // la vela de Carter en su mano (T.brazo, la manga de tweed) y la camarita con su luz blanca
  brazo(R, 6, 196, 92, 116, '#7a6a4a', 1, { codo: [40, 170] });
  PIEZAS_TU.vela(R, 96, 117, { t, apagada: v <= 0.05 });
  PIEZAS_TU.camarita(R, 236, 49, { cable: 38, t, luz: l > 0.05 });
  if (l > 0.05) { R.pset(236, 96, f_LDC.frio[4]); R.pset(235, 97, f_LDC.frio[3]); R.pset(237, 97, f_LDC.frio[3]); }
  f_ldTorre(R, 236, 47, t, false);
  return {};
}

// el inserto 'cerca': las dos luces de cerca, la llama grande que tiembla y el ledito que late, cada uno con su halo
function f_ldCerca(R, t, o, q) {
  f_ldCapa(R, 'cerca', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      let c;
      if (x < 156) c = f_ldMez(f_ldT(f_LDC.papel, 0.5 + (h(x >> 2, y >> 2, 115) - 0.5) * 0.4 + (h(x, y, 116) - 0.5) * 0.12, x, y), hex('#120a06'), 0.78);
      else if (x > 164) c = f_ldMez(f_ldT(f_LDC.estrato, f_ldEstrato(x, y, 3, 0.3), x, y), hex('#080a12'), 0.72);
      else c = f_ldMez(f_ldT(f_LDC.roca, 0.55 + (x === 156 ? 0.25 : x === 164 ? -0.3 : 0) + (y % 30 === 0 ? -0.4 : 0) + (h(x, y, 117) - 0.5) * 0.2, x, y), hex('#0a0806'), 0.5);
      R.pset(x, y, c);
    }
    return null;
  });
  const v = Math.max(0, Math.min(1, o.vela ?? 1)), l = Math.max(0, Math.min(1, o.luz ?? 1));
  // los halos
  R.recorte([0, 0, 155, 179]); if (v > 0) R.halo(96, 96, 70 * v * (1 + Math.sin(t * 13) * 0.04), [hex('#3a1c0a'), hex('#6a3412'), hex('#a8581c'), hex('#e08a30')], 1.1);
  R.recorte([165, 0, 319, 179]); if (l > 0) R.halo(224, 104, 56 * l * (0.9 + Math.sin(t * 3) * 0.1), [hex('#101a2a'), hex('#22385a'), hex('#4a78a8'), hex('#9ac8f0')], 1.1); R.recorte(null);
  // la vela: el cabo de cera con su chorreón y la mecha, y la LLAMA grande que tiembla
  for (let y = 112; y < 180; y++) for (let x = 84; x <= 108; x++) { const sh = (x - 84) / 24; R.pset(x, y, f_ldMez(hex('#f4e8c8'), hex('#a8906a'), sh * 0.8 + (y > 170 ? 0.2 : 0))); }
  for (let y = 112; y < 132; y++) R.pset(88, y, hex('#fff8e4')); R.rect(84, 112, 108, 113, hex('#fff4d8')); R.linea(96, 104, 96, 112, f_LDC.k);
  if (v > 0.05) {
    const sw = Math.sin(t * 9) * 1.5 + Math.sin(t * 23) * 0.7, alto = 30 * (0.6 + 0.4 * v) * (1 + Math.sin(t * 15) * 0.05);
    for (let y = Math.floor(108 - alto); y <= 110; y++) { const u = (110 - y) / alto, w = Math.sin(Math.min(1, u * 1.15) * Math.PI) * 6 * (1 - u * 0.4) + 0.5, cx = 96 + sw * u * u;
      for (let x = Math.floor(cx - w); x <= cx + w; x++) { const d = Math.abs(x - cx) / w; R.pset(x, y, d < 0.35 && u < 0.7 ? hex('#fffef0') : d < 0.6 && u < 0.85 ? hex('#ffe890') : u > 0.85 ? hex('#ff8a2a') : hex('#ffb84a')); } }
    R.rect(94, 106, 98, 110, hex('#5a7ad0')); R.pset(96, 105, hex('#8aa8f0'));
  } else for (let k = 0; k < 8; k++) R.pset(96 + Math.round(Math.sin(t * 2 + k * 0.6) * k * 0.4), 102 - k * 3, hex('#8a8a90'));
  // la camarita grande con su ledito
  const cm = PIEZAS_TU.camarita(R, 224, 0, { cable: 15, s: 4, t, luz: l > 0.05 }).punta;
  if (l > 0.05) { const p = Math.sin(t * 3) > 0 ? 1 : 0; R.disco(cm[0] + 2, cm[1] - 2, 3 + p, f_LDC.frio[3]); R.disco(cm[0] + 2, cm[1] - 2, 2, f_LDC.frio[4]); }
  return {};
}

// el suelo de la ladera en la vista general: suelo(x) = 140 − 0,12 · (x − 160) (lo mismo que dice V_LADERA)
const f_ldPie = (x) => Math.round(140 - 0.12 * (x - 160));

// la cresta del monte (su contorno contra el valle y el cielo): baja a la izquierda hacia el valle y sube a la cumbre
const f_ldCresta = (x) => (x < 100 ? 118 + (100 - x) * 0.05 : x < 250 ? 118 - (x - 100) * 0.44 : 52) + Math.round((f_ldR1(x, 120, 8) - 0.5) * 3);

// el valle de abajo a la izquierda (canon, pequeño y lejos): el suelo claro con los caminos, el muro de la entrada
// de la tumba con su toldo, la caseta, y (desde 2014) el sendero asfaltado y un autobús diminuto
function f_ldValle(R, ep, x1 = 130) {
  for (let y = 88; y <= 126; y++) for (let x = 0; x <= x1; x++) R.pset(x, y, f_ldT(f_LDC.lejos, 0.78 + (h(x >> 1, y, 121) - 0.5) * 0.12 + (y - 88) / 200 - (Math.abs(((x * 0.4 + y) % 23) - 11) < 0.6 ? 0.25 : 0), x, y));
  // el sendero asfaltado y el camino de tierra
  for (let x = 0; x <= x1; x++) { const y = Math.round(110 - x * 0.06 + Math.sin(x * 0.07) * 2); R.pset(x, y, ep >= 2014 ? hex('#8a8680') : f_LDC.lejos[3]); R.pset(x, y + 1, ep >= 2014 ? hex('#6e6a66') : f_LDC.lejos[2]); }
  // los acantilados del valle, a los lados de la entrada
  f_ldRiscos(R, 0, 40, (x) => 86 + x * 0.3 + f_ldR1(x, 122, 5) * 3, 104, 41, f_LDC.lejos);
  // la entrada de la tumba: el muro de piedra, la boca, la barandilla y el toldo
  for (let y = 99; y <= 107; y++) for (let x = 46; x <= 68; x++) R.pset(x, y, f_ldT(f_LDC.roca, ((x + (y % 2) * 2) % 4 === 0 || y % 3 === 0) ? 0.4 : 0.72, x, y));
  R.rect(53, 102, 60, 107, hex('#2a1a10')); R.rect(53, 102, 60, 102, hex('#120a06'));
  R.linea(44, 98, 70, 98, f_LDC.metal[3]); for (const x of [44, 57, 70]) R.linea(x, 98, x, 101, f_LDC.metal[2]);
  for (const x of [45, 69]) R.linea(x, 91, x, 98, f_LDC.madera[3]); for (let x = 43; x <= 71; x++) { R.pset(x, 90, f_LDC.lona[4]); R.pset(x, 91, (x >> 1) % 2 ? f_LDC.lona[3] : f_LDC.lona[1]); }
  // la caseta del vigilante y un banco
  R.rect(90, 94, 104, 104, f_LDC.lona[3]); R.rect(90, 92, 105, 93, f_LDC.lona[1]); R.rect(94, 97, 98, 100, hex('#4a6a8a')); R.rect(100, 98, 102, 104, f_LDC.madera[3]); R.linea(78, 104, 86, 104, f_LDC.madera[2]);
  if (ep >= 2014) { R.rect(12, 104, 30, 109, hex('#e8e4dc')); R.rect(12, 104, 30, 104, hex('#ffffff')); for (let x = 14; x <= 28; x += 3) R.rect(x, 105, x + 1, 106, hex('#4a6a8a')); R.pset(15, 110, f_LDC.k); R.pset(27, 110, f_LDC.k); R.rect(31, 105, 32, 109, hex('#c8c4bc')); }
}

// los riscos del fondo y, detrás, la cumbre del Qurn (canon, más pequeña): f_ldQurn la pinta primero y los riscos le
// tapan el pie
function f_ldFondoValle(R, base, luz, pico = [58, 34]) {
  f_ldQurn(R, pico[0], pico[1], base + 6);
  f_ldRiscos(R, 0, 319, (x) => base - 22 - f_ldR1(x, 123, 21) * 12 - f_ldR1(x, 124, 6) * 3, base + 6, 47, f_LDC.lejos, luz);
}
function f_ldLaderaFijo(R, q) {
  const cielo = f_ldCielo(R, 100, q.luz, [228, 22]);
  f_ldFondoValle(R, 100, q.luz, [58, 44]);
  f_ldValle(R, q.ep);
  // el monte: la cresta, la cara al sol con grano, guijarros, regueros y piedras más grandes cuanto más cerca
  for (let x = 0; x < 320; x++) { const c = f_ldCresta(x), pend = f_ldCresta(x + 2) - f_ldCresta(x - 2);
    for (let y = c; y < 180; y++) { const d = y - c; let l = f_ldGrano(x, y, 0.66 + Math.min(0.12, d / 260) - (pend > 0.5 ? 0.06 : 0) + (d < 2 ? 0.16 : 0));
      if (Math.abs(((x * 0.5 - y * 0.9) % 37)) < 0.7 && d > 6) l -= 0.18;   // regueros de escorrentía
      R.pset(x, y, f_ldT(f_LDC.roca, l, x, y)); } }
  // el sendero de los turistas, en zigzag por el monte
  const S = [[0, 132], [70, 124], [128, 112], [92, 100], [150, 84], [196, 70], [240, 56]];
  for (let i = 0; i + 1 < S.length; i++) { const [a, b] = S[i], [c, d] = S[i + 1], n = Math.max(Math.abs(c - a), Math.abs(d - b)); for (let k = 0; k <= n; k++) { const x = Math.round(a + (c - a) * k / n), y = Math.round(b + (d - b) * k / n); if (y < f_ldCresta(x) + 1) continue; R.pset(x, y, f_LDC.roca[8]); R.pset(x, y + 1, f_LDC.roca[7]); if (k % 5 === 0) R.pset(x, y + 2, f_LDC.roca[3]); } }
  for (let k = 0; k < 120; k++) { const x = Math.round(h(k, 1, 125) * 320), y0 = f_ldCresta(x) + 3, y = Math.round(y0 + h(k, 2, 125) * (180 - y0)); if (y >= 180) continue; const s = (y - 60) / 120; f_ldPiedra(R, x, y, Math.max(1, Math.round(1 + s * 3 * h(k, 3, 125))), Math.max(1, Math.round(s * 2 * h(k, 3, 125) + 0.4)), f_LDC.roca, 0.55); }
  // los afloramientos de caliza y las matas secas (más grandes cuanto más cerca)
  for (const [x, y, w, hh, k] of [[150, 98, 9, 4, 1], [262, 76, 7, 3, 2], [92, 128, 6, 3, 3], [196, 126, 10, 4, 4], [24, 160, 12, 5, 5], [300, 112, 8, 4, 6], [128, 166, 9, 4, 7]]) if (y > f_ldCresta(x) + 4) f_ldLosa(R, x, y, w, hh, k);
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 151) * 320), y0 = f_ldCresta(x) + 6, y = Math.round(y0 + h(k, 2, 151) * (176 - y0)); if (y >= 177 || (x > 196 && x < 260 && y < 112)) continue; f_ldMata(R, x, y, y > 140 ? 2 : 1, k); }
  // el todoterreno blanco aparcado arriba, con sus sombrillas y cajas de aparatos
  f_ldTodoterreno(R, 214, 104, 1);
  f_ldSombrilla(R, 196, 108, 9, f_LDC.rojo);
  for (const [x, y, w] of [[262, 100, 8], [272, 98, 6], [186, 110, 6]]) { R.rect(x, y - 5, x + w, y, f_LDC.metal[3]); R.rect(x, y - 5, x + w, y - 5, f_LDC.metal[4]); R.rect(x + w, y - 4, x + w, y, f_LDC.metal[1]); R.pset(x + (w >> 1), y - 3, f_LDC.k); }
  if (q.luz === 'tarde') f_ldTarde(R, 0, 179, 0.18);
  return cielo;
}
// el todoterreno blanco (pequeño, de perfil): la carrocería con su luz y su sombra, las ventanillas, la rueda de repuesto
// atrás, la baca con una caja y las ruedas; (x, y): la rueda de atrás en el suelo; e: escala (1 lejos, 2 cerca)
function f_ldTodoterreno(R, x, y, e = 1, dir = 1) {
  const B = f_LDC.blanco, X = (i) => Math.round(dir > 0 ? x + i * e : x - i * e), r = (i0, j0, i1, j1, c) => { for (let j = j0 * e; j <= j1 * e + e - 1; j++) for (let i = i0 * e; i <= i1 * e + e - 1; i++) R.pset(dir > 0 ? x + i : x - i, y + j, c); };
  r(-2, -1, 38, 0, hex('#5a4a3a'));
  r(-3, -12, 38, -4, B[3]); r(-3, -4, 38, -3, B[1]); r(-3, -12, 38, -12, B[4]); r(28, -9, 38, -5, B[2]);
  r(0, -20, 26, -13, B[3]); r(0, -20, 26, -20, B[4]); r(1, -19, 8, -14, hex('#3a5a7a')); r(10, -19, 17, -14, hex('#3a5a7a')); r(19, -19, 25, -14, hex('#4a6a8a')); r(2, -19, 3, -16, hex('#8ab0d0'));
  r(2, -22, 20, -21, f_LDC.metal[1]); r(6, -25, 14, -23, f_LDC.lona[2]);
  r(-6, -11, -3, -4, f_LDC.metal[0]); r(38, -6, 39, -5, hex('#f0e0a0')); r(12, -8, 14, -7, f_LDC.metal[1]);
  for (const i of [4, 31]) { const cx = X(i), cy = y - 2 * e; R.disco(cx, cy, 4 * e, f_LDC.k); R.disco(cx, cy, 2 * e, f_LDC.metal[2]); R.pset(cx, cy, f_LDC.metal[4]); }
}

// una sombrilla de playa clavada (de lejos): el palo y la tela a gajos
function f_ldSombrilla(R, x, y, w, c, t = 0) {
  R.linea(x, y, x, y - w - 2, f_LDC.metal[2]);
  for (let i = -w; i <= w; i++) { const yy = y - w - 2 + Math.round(Math.abs(i) * 0.35); const gajo = Math.floor((i + w) / 4) % 2; R.pset(x + i, yy, gajo ? c : f_LDC.blanco[4]); R.pset(x + i, yy - 1, gajo ? c : f_LDC.blanco[3]); if (Math.abs(i) < w - 2) R.pset(x + i, yy - 2, gajo ? f_ldMez(c, f_LDC.blanco[4], 0.3) : f_LDC.blanco[4]); }
  R.pset(x, y - w - 5, f_LDC.metal[3]);
}

function f_ldLadera(R, t, o, q) {
  const m = f_ldCapa(R, 'ladera|' + q.luz + (q.ep >= 2014), () => f_ldLaderaFijo(R, q));
  f_ldNubes(R, t, m, q.luz, [[10, 30, 50, 1.4, 7], [170, 42, 36, 2.1, 8], [260, 60, 28, 3.2, 9], [90, 66, 22, 3.8, 10]]);
  f_ldPajaros(R, t, [20, 30, 250, 60], 3, [140, 52, 36]);
  // los turistas que pasan por el valle y por el sendero del monte
  for (let k = 0; k < 5; k++) { const u = (t * 0.03 + k * 0.21) % 1, x = 6 + u * 110; f_ldFigura(R, x, Math.round(110 - x * 0.06 + Math.sin(x * 0.07) * 2) - 1, t, [hex('#d84a4a'), hex('#4a7ad0'), hex('#f0f0e8'), hex('#3aa070'), hex('#e0a030')][k], { anda: true, alto: 5 }); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.025 + k * 0.33) % 1, x = 70 + u * 58, y = 124 - u * 12; f_ldFigura(R, x, y - 1, t, [hex('#f0f0e8'), hex('#c84a6a'), hex('#4a8ad0')][k], { anda: true, gorro: hex('#f0e0b0') }); }
  // los jalones de la rejilla de medidas y el polvo que levanta el viento
  for (const [x, y] of [[112, 122], [146, 116], [180, 110], [62, 152], [128, 145], [232, 132], [292, 124]]) f_ldJalon(R, x, y, t, y > 130 ? 13 : 9);
  for (let k = 0; k < 10; k++) { const x = Math.round(((h(k, 1, 126) * 340 + t * (22 + k * 3)) % 340) - 10), y = f_ldPie(Math.max(0, Math.min(319, x))) - 2 - Math.round(Math.abs(Math.sin(t * 2 + k)) * 4); R.pset(x, y, f_ldMez(f_LDC.roca[7], f_LDC.blanco[4], 0.4)); }
  const r = { carrito: null };
  if (o.carrito != null) { const c = Math.max(0, Math.min(1, o.carrito)), x = Math.round(110 + c * 130), y = f_ldPie(x); PIEZAS_TU.radarCarrito(R, x, y, { t: t * (c > 0 && c < 1 ? 1 : 0) }); r.carrito = [x, y]; r.asa = [x - 14, y - 21]; }
  else delete r.carrito;
  return r;
}

function f_ldLaderaDelante(R, t) {
  // las cajas de aparatos (de aluminio, con cierres y esquinas) y una mochila, abajo a los lados
  f_ldCaja(R, 2, 160, 34, 18); f_ldCaja(R, 26, 168, 22, 12, hex('#3a4a5a'));
  f_ldCaja(R, 288, 158, 30, 20, hex('#5a6a3a'));
  R.disco(52, 174, 6, hex('#6a3a2a')); R.disco(52, 172, 5, hex('#8a4a32')); R.rect(48, 176, 56, 179, hex('#5a2e20')); R.linea(49, 167, 55, 167, hex('#3a2014'));
  return {};
}

// una caja de aparatos: la tapa con su luz, los cantos de metal, los cierres y la sombra en el suelo
function f_ldCaja(R, x, y, w, hh, c = null) {
  const M = f_LDC.metal, b = c ?? M[3], bl = f_ldMez(b, f_LDC.blanco[4], 0.35), bs = f_ldMez(b, f_LDC.k, 0.35);
  R.rect(x + 2, y + hh, x + w + 2, y + hh + 1, f_ldMez(f_LDC.roca[2], f_LDC.k, 0.3));
  R.rect(x, y, x + w, y + hh, b); R.rect(x, y, x + w, y + 1, bl); R.rect(x + w - 1, y + 2, x + w, y + hh, bs); R.rect(x, y + hh, x + w, y + hh, bs);
  R.rect(x, y + 4, x + w, y + 4, bs); for (const i of [x + 4, x + w - 6]) { R.rect(i, y + 3, i + 2, y + 6, M[1]); R.pset(i + 1, y + 4, M[4]); }
  R.rect(x + (w >> 1) - 3, y - 1, x + (w >> 1) + 3, y - 1, M[0]);
}

// la cámara 'carrito': el radar de carrito de cerca (escala 2) sobre las piedras, la cinta métrica en el suelo, la
// sombra del técnico que lo empuja y, en la pantallita del asa, el radargrama que corre
function f_ldCarrito(R, t, o, q) {
  const m = f_ldCapa(R, 'carrito|' + q.luz, () => {
    const cielo = f_ldCielo(R, 82, q.luz, [250, 22]);
    f_ldFondoValle(R, 82, q.luz, [70, 40]);
    for (let x = 0; x < 320; x++) { const c = Math.round(78 - x * 0.05 + (f_ldR1(x, 127, 15) - 0.5) * 6);
      for (let y = c; y < 180; y++) R.pset(x, y, f_ldT(f_LDC.roca, f_ldGrano(x >> (y > 140 ? 1 : 0), y >> (y > 140 ? 1 : 0), 0.66 + (y - c) / 500 + (y - c < 2 ? 0.15 : 0)), x, y)); }
    for (let k = 0; k < 90; k++) { const y = Math.round(84 + Math.pow(h(k, 1, 128), 0.7) * 96), x = Math.round(h(k, 2, 128) * 320), s = (y - 80) / 100; f_ldPiedra(R, x, y, Math.max(1, Math.round(1 + s * 5 * h(k, 3, 128))), Math.max(1, Math.round(s * 3 * h(k, 3, 128) + 0.5)), f_LDC.roca, 0.55); }
    // la cinta métrica: blanca con rayas rojas cada palmo y cifras cada metro
    for (let x = 0; x < 320; x++) { const y = Math.round(168 - x * 0.03); R.pset(x, y, f_LDC.blanco[3]); R.pset(x, y + 1, f_LDC.blanco[3]); R.pset(x, y + 2, f_LDC.blanco[1]); if (x % 8 === 0) R.pset(x, y, f_LDC.rojo); if (x % 40 === 0) { R.pset(x, y + 1, f_LDC.rojo); } }
    for (let k = 1; k < 8; k++) R.numero(String(k), k * 40 - 3, Math.round(166 - k * 40 * 0.03) + 9, { color: f_LDC.k, sombra: false });
    // los afloramientos y las matas de la ladera de cerca
    for (const [x, y, w, hh, k] of [[104, 92, 10, 4, 11], [268, 100, 14, 5, 12], [300, 134, 16, 7, 13], [30, 118, 12, 5, 14]]) f_ldLosa(R, x, y, w, hh, k);
    for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 152) * 320), y = Math.round(90 + h(k, 2, 152) * 80); if (x > 150 && x < 250 && y > 100) continue; f_ldMata(R, x, y, y > 130 ? 2 : 1, k + 3); }
    // el todoterreno lejos y un jalón
    f_ldTodoterreno(R, 40, 92, 1, -1);
    if (q.luz === 'tarde') f_ldTarde(R, 0, 179, 0.18);
    return cielo;
  });
  f_ldNubes(R, t, m, q.luz, [[40, 30, 46, 1.6, 11], [220, 50, 30, 2.6, 12]]);
  f_ldPajaros(R, t, [30, 26, 240, 56], 2);
  f_ldJalon(R, 140, 96, t, 10); f_ldJalon(R, 262, 92, t, 9);
  // la lagartija que asoma de vez en cuando entre las piedras de la derecha y vuelve a esconderse
  { const c = (t * 0.23) % 1; if (c < 0.3) { const u = Math.sin(c / 0.3 * Math.PI), lx = Math.round(300 - u * 22), ly = 142 + Math.round(Math.sin(c * 40) * 0.6), cl = hex('#8a7a4a'), cs = hex('#5a4a2a');
    R.linea(lx, ly, lx + 6, ly, cl); R.linea(lx + 6, ly, lx + 10, ly + 1, cs); R.pset(lx - 1, ly, cs); R.pset(lx + 1, ly + 1, cs); R.pset(lx + 4, ly + 1, cs); R.pset(lx + 1, ly - 1, cs); R.pset(lx + 4, ly - 1, cs); R.pset(lx, ly - 1, f_LDC.k); } }
  // o.avance (px, por omisión 0): el carrito, su pantallita, la sombra y las rodadas se corren a la derecha (las ruedas
  // giran con él); o.sombra false: sin la sombra de quien empuja
  const av = Math.round(o.avance ?? 0);
  // las rodadas del carrito en la arena, detrás de él
  for (let x = 0; x <= 194 + av; x++) { if (h(x >> 1, 0, 131) > 0.85) continue; const y = Math.round(156 - x * 0.012); R.pset(x, y, f_ldMez(R.pget(x, y), f_LDC.sombra, 0.28)); R.pset(x, y + 3, f_ldMez(R.pget(x, y + 3), f_LDC.sombra, 0.22)); }
  // o.sombra [x, suelo]: la sombra de un chibi con los pies ahí (corta, hacia la izquierda: el sol está alto a la derecha)
  if (Array.isArray(o.sombra)) { const [fx, fy] = o.sombra; for (let y = fy - 5; y <= fy + 3; y++) for (let x = fx - 26; x <= fx + 4; x++) {
    if (Math.hypot((x - fx + 9) / 11, (y - fy - 0.5) / 2.6) > 1 && Math.hypot((x - fx + 21) / 4, (y - fy) / 2.2) > 1) continue; R.pset(x, y, f_ldMez(R.pget(x, y), hex('#4a3020'), 0.45)); } }
  // la sombra del técnico (en tramado sobre el suelo), que se mece al empujar
  const sw = Math.round(Math.sin(t * 2.4) * 2) + av;
  if (o.sombra == null || o.sombra === true) for (let y = 146; y <= 162; y++) for (let x = Math.max(0, sw); x <= Math.min(319, 168 + sw); x++) {
    const cuerpo = Math.hypot((x - 70 - sw) / 62, (y - 156) / 5) < 1, cabeza = Math.hypot((x - 136 - sw) / 7, (y - 152) / 5) < 1, brazo2 = y >= 149 && y <= 151 && x > 100 + sw && x < 168 + sw;
    if (cuerpo || cabeza || brazo2) R.pset(x, y, f_ldMez(R.pget(x, y), hex('#4a3020'), 0.5));
  }
  // el carrito, con el radargrama que corre en la pantallita
  const ec = Math.max(0, Math.min(1, o.eco ?? 1));
  PIEZAS_TU.radarCarrito(R, 200 + av, 158, { s: 2, t: o.avance != null ? o.avance * 0.12 : t });
  const x0 = 185 + av, y0 = 124;
  for (let j = 0; j < 8; j++) for (let i = 0; i < 10; i++) { const tr = i + Math.floor(t * 6); let l = 0.35 + 0.2 * Math.sin(j * 1.3 + Math.sin(tr * 0.3)) + (h(tr, j, 129) - 0.5) * 0.3; if (j === 5 && (tr % 30) > 10 && (tr % 30) < 26) l += 0.6 * ec; R.pset(x0 + i, y0 + j, f_ldT(f_LD_GRIS, Math.max(0, Math.min(1, l)), x0 + i, y0 + j)); }
  // agarre: donde el asa se junta con la caja (lo que alcanza la mano de un chibi en el suelo 158)
  return av ? { carrito: [200 + av, 158], pantalla: [185 + av, 124], agarre: [192 + av, 139] } : { agarre: [192, 139] };
}
// una chincheta (de lejos) con su sombra
const f_ldChin = (R, x, y, c) => { R.pset(x + 1, y + 1, hex('#5a4a3a')); R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x, y - 1, f_ldMez(c, f_LDC.blanco[4], 0.5)); };

// una flecha hacia abajo (la gravedad): el asta de dos píxeles y la punta
function f_ldFlecha(R, x, y0, L, c = f_LDC.rojo, cs = hex('#7a1a14'), ancho = 3) {
  if (L < 3) return;
  for (let y = y0; y < y0 + L - ancho; y++) { R.pset(x, y, c); R.pset(x + 1, y, cs); }
  for (let j = 0; j <= ancho; j++) for (let i = -ancho + j; i <= ancho + 1 - j; i++) R.pset(x + i, y0 + L - ancho + j, i > 0 ? cs : c);
}

function f_ldGravedad(R, t, o, q) {
  const m = f_ldCapa(R, 'gravedad|' + q.luz, () => {
    const cielo = f_ldCielo(R, 120, q.luz, [40, 30]);
    f_ldFondoValle(R, 120, q.luz, [300, 60]);
    for (let x = 0; x < 320; x++) { const c = Math.round(120 + (f_ldR1(x, 130, 20) - 0.5) * 6); for (let y = c; y < 180; y++) R.pset(x, y, f_ldT(f_LDC.roca, f_ldGrano(x, y, 0.64 + (y - c) / 400 + (y - c < 2 ? 0.15 : 0)), x, y)); }
    for (let k = 0; k < 50; k++) { const y = Math.round(128 + h(k, 1, 131) * 52), x = Math.round(h(k, 2, 131) * 320); if (x > 66 && x < 266 && y < 152) continue; const s = (y - 120) / 60; f_ldPiedra(R, x, y, Math.max(1, Math.round(1 + s * 3 * h(k, 3, 131))), Math.max(1, Math.round(s * 2 * h(k, 3, 131) + 0.5)), f_LDC.roca, 0.55); }
    // el todoterreno, detrás del tablero (asoma por la derecha)
    f_ldTodoterreno(R, 196, 154, 2);
    // el tablero de corcho con su marco y sus dos patas, apoyado en el coche
    for (const x of [92, 240]) { R.linea(x, 146, x - 4, 160, f_LDC.madera[2]); R.linea(x + 1, 146, x - 3, 160, f_LDC.madera[4]); }
    for (let y = 30; y <= 146; y++) for (let x = 70; x <= 262; x++) { const b = Math.min(x - 70, 262 - x, y - 30, 146 - y);
      R.pset(x, y, b < 4 ? f_ldT(f_LDC.madera, 0.75 - (b === 0 ? 0.4 : 0) - (y > 142 || x > 258 ? 0.25 : 0), x, y) : f_ldT(f_LDC.corcho, 0.5 + (h(x, y, 132) - 0.5) * 0.7, x, y)); }
    // la lámina: el papel con su sombra, la cabecera de rayas, el aparato dibujado y el bloque de roca en corte
    R.rect(82, 40, 254, 140, hex('#5a3a22'));
    for (let y = 38; y <= 138; y++) for (let x = 80; x <= 252; x++) R.pset(x, y, f_ldT(f_LDC.papel, 0.86 + (h(x, y, 133) - 0.5) * 0.08, x, y));
    R.rect(88, 44, 160, 46, f_LDC.k); R.rect(88, 49, 140, 49, f_LDC.papel[0]); R.rect(200, 44, 244, 45, f_LDC.papel[0]);
    for (let y = 82; y <= 132; y++) for (let x = 100; x <= 232; x++) R.pset(x, y, f_ldT(f_LDC.estrato, f_ldEstrato(x * 1.5, y * 1.5, 1, 0.1) + 0.05, x, y));
    R.rect(100, 82, 232, 82, f_LDC.k); R.rect(100, 132, 232, 132, f_LDC.k); R.rect(100, 82, 100, 132, f_LDC.k); R.rect(232, 82, 232, 132, f_LDC.k);
    for (let x = 101; x < 232; x += 3) R.pset(x, 81, f_LDC.verde);
    for (const [x, y] of [[84, 42], [248, 42], [84, 134], [248, 134]]) f_ldChin(R, x, y, [f_LDC.rojo, hex('#3a6ad0'), hex('#3aa060'), f_LDC.rojo][x > 100 ? (y > 100 ? 2 : 1) : (y > 100 ? 3 : 0)]);
    if (q.luz === 'tarde') f_ldTarde(R, 0, 179, 0.16);
    return cielo;
  });
  f_ldNubes(R, t, m, q.luz, [[0, 40, 40, 1.4, 13], [200, 24, 30, 2.2, 14], [120, 60, 24, 3, 15]]);
  f_ldPajaros(R, t, [180, 28, 270, 60], 2);
  const fl = Math.max(0, Math.min(1, o.flechas ?? 1)), hu = Math.max(0, Math.min(1, o.hueco ?? 1));
  // el hueco (un cuadrado vacío) que aparece en la roca
  if (hu > 0) for (let y = 96; y <= 122; y++) for (let x = 150; x <= 180; x++) { if (f_ldU(x, y) > hu * 1.2) continue; const b = x === 150 || x === 180 || y === 96 || y === 122; R.pset(x, y, b ? f_LDC.k : f_ldT(f_LDC.papel, 0.9, x, y)); }
  for (let i = 0; i < 11; i++) { const x = 106 + i * 12, sobre = x >= 148 && x <= 182; f_ldFlecha(R, x, 52, Math.round(28 * fl - (sobre ? 7 * hu * fl : 0))); }
  // la esquina de abajo de la lámina, que levanta el viento
  const v = Math.max(0, Math.sin(t * 1.7) + Math.sin(t * 3.1) * 0.5); for (let j = 0; j < Math.round(v * 4); j++) for (let i = 0; i <= j; i++) R.pset(252 - i, 138 - j + i, f_LDC.papel[1]);
  return {};
}

function f_ldFlechas(R, t, o, q) {
  f_ldCapa(R, 'flechas', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, f_ldT(f_LDC.corcho, 0.5 + (h(x >> 1, y >> 1, 134) - 0.5) * 0.7, x, y));
    R.rect(16, 12, 314, 178, hex('#5a3a22'));
    for (let y = 8; y <= 175; y++) for (let x = 12; x <= 310; x++) R.pset(x, y, f_ldT(f_LDC.papel, 0.86 + (h(x, y, 135) - 0.5) * 0.08 - (x > 270 && y < 48 ? 0 : 0), x, y));
    for (let y = 112; y <= 175; y++) for (let x = 12; x <= 310; x++) R.pset(x, y, f_ldT(f_LDC.estrato, f_ldEstrato(x, y, 2, 0.1) + 0.05, x, y));
    R.rect(12, 112, 310, 113, f_LDC.k); for (let x = 12; x <= 310; x += 3) { R.pset(x, 111, f_LDC.verde); R.pset(x + 1, 110, f_LDC.verdeL); }
    // la regla vertical
    for (let y = 40; y <= 108; y++) { R.pset(118, y, f_LDC.k); R.pset(119, y, hex('#e8d890')); R.pset(120, y, hex('#e8d890')); R.pset(121, y, hex('#b0a050')); if (y % 4 === 0) R.pset(120, y, f_LDC.k); if (y % 8 === 0) R.pset(119, y, f_LDC.k); }
    return null;
  });
  const hu = Math.max(0, Math.min(1, o.hueco ?? 1));
  if (hu > 0) for (let y = 126; y <= 175; y++) for (let x = 130; x <= 190; x++) { if (f_ldU(x, y) > hu * 1.2) continue; const b = x <= 131 || x >= 189 || y <= 127; R.pset(x, y, b ? f_LDC.k : f_ldT(f_LDC.papel, 0.92, x, y)); }
  const L = 60, d = Math.round(10 * hu);
  for (const x of [34, 62, 90, 214, 242]) f_ldFlecha(R, x, 40, L, f_LDC.rojo, hex('#7a1a14'), 5);
  for (const x of [140, 158, 176]) f_ldFlecha(R, x, 40, L - d, f_LDC.rojo, hex('#7a1a14'), 5);
  // la diferencia marcada: dos rayas finas y la cifra (la diferencia es diminuta)
  if (hu > 0.3) { R.linea(124, 100, 200, 100, C.lapis, 4); R.linea(124, 100 - d, 200, 100 - d, C.lapis, 4); R.linea(204, 100 - d, 204, 100, C.lapis); R.numero('0,00000001', 20, 124 - 18, { fina: true, color: C.lapis, sombra: false }); R.linea(66, 100, 122, 100 - Math.round(d / 2), C.lapis, 2); }
  // la pesa que cuelga del muelle finísimo (se estira un pelo menos sobre el hueco)
  const yM = 50, len = Math.round(40 - hu * 4);
  R.rect(262, 46, 282, 48, f_LDC.metal[1]); R.rect(262, 46, 282, 46, f_LDC.metal[3]);
  for (let j = 0; j < len; j++) R.pset(272 + ((Math.floor(j / 2) % 2) ? 3 : -3) * (j % 2 ? 0.5 : 1), yM + j, f_LDC.metal[0]);
  const yp = yM + len; R.rect(265, yp, 279, yp + 12, f_LDC.metal[2]); R.rect(265, yp, 279, yp + 1, f_LDC.metal[4]); R.rect(278, yp + 2, 279, yp + 12, f_LDC.metal[0]); R.linea(262, yp + 6, 258, yp + 6, f_LDC.k);
  for (let y = 66; y <= 100; y += 4) R.pset(256, y, f_LDC.k);
  return { hueco: [130, 126, 190, 176] };
}

// la meseta de la cumbre en perspectiva: el horizonte en y 92, la rejilla de puntos pintados (cruces blancas) en filas
// que se juntan al fondo, el equipo lejano con otro trípode, el todoterreno y una tienda de sombra al fondo
const f_LD_FILAS = [100, 106, 114, 124, 137, 152, 170];

function f_ldGravimetroFijo(R, q) {
  const cielo = f_ldCielo(R, 92, q.luz, [70, 24]);
  f_ldFondoValle(R, 92, q.luz, [196, 46]);
  for (let y = 88; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 88) / 92; if (y < 90 + Math.round(f_ldR1(x, 137, 30) * 3)) continue; R.pset(x, y, f_ldT(f_LDC.roca, f_ldGrano(Math.floor(x / (1 + v * 1.5)), Math.floor(y / (1 + v)), 0.68 + v * 0.04), x, y)); }
  for (let k = 0; k < 110; k++) { const y = Math.round(94 + Math.pow(h(k, 1, 138), 0.8) * 86), x = Math.round(h(k, 2, 138) * 320), s = (y - 88) / 92; f_ldPiedra(R, x, y, Math.max(1, Math.round(1 + s * 4 * h(k, 3, 138))), Math.max(1, Math.round(s * 2.4 * h(k, 3, 138) + 0.4)), f_LDC.roca, 0.55); }
  // las cruces de la rejilla
  f_LD_FILAS.forEach((y, j) => { const v = (y - 88) / 92, paso = 14 + v * 40; for (let x = 160 - Math.floor(160 / paso) * paso; x < 320; x += paso) { const xi = Math.round(x), a = v > 0.4 ? 2 : 1; for (let i = -a; i <= a; i++) { R.pset(xi + i, y, f_LDC.blanco[4]); R.pset(xi, y + i, f_LDC.blanco[4]); } } });
  f_ldTodoterreno(R, 262, 100, 1, -1);
  // la tienda de sombra del fondo, con una mesa
  for (let x = 20; x <= 58; x++) { R.pset(x, 88 + Math.round(Math.abs(x - 39) * 0.08), f_LDC.lona[4]); R.pset(x, 89 + Math.round(Math.abs(x - 39) * 0.08), f_LDC.lona[2]); }
  for (const x of [21, 57]) R.linea(x, 90, x, 102, f_LDC.madera[2]); R.rect(30, 97, 48, 98, f_LDC.madera[4]); R.linea(32, 99, 32, 102, f_LDC.madera[2]); R.linea(46, 99, 46, 102, f_LDC.madera[2]);
  if (q.luz === 'tarde') f_ldTarde(R, 0, 179, 0.18);
  return cielo;
}

function f_ldGravimetro(R, t, o, q) {
  const m = f_ldCapa(R, 'gravimetro|' + q.luz, () => f_ldGravimetroFijo(R, q));
  f_ldNubes(R, t, m, q.luz, [[0, 34, 46, 1.3, 16], [150, 48, 34, 2.2, 17], [240, 66, 26, 3.4, 18]]);
  f_ldPajaros(R, t, [40, 28, 250, 70], 3, [120, 50, 30]);
  // los jalones con banderitas y el equipo lejano que mide en otro punto
  for (const [x, y, a] of [[60, 106, 7], [104, 106, 7], [214, 106, 7], [36, 124, 9], [262, 124, 9], [14, 152, 13], [302, 152, 13]]) f_ldJalon(R, x, y, t, a);
  R.linea(88, 114, 85, 120, f_LDC.madera[3]); R.linea(88, 114, 91, 120, f_LDC.madera[3]); R.rect(86, 109, 90, 113, f_LDC.metal[3]);
  f_ldFigura(R, 78, 120, t, hex('#6a7e4a'), { gorro: hex('#d8c8a0') }); f_ldFigura(R, 96, 120, t + 1, hex('#a8583a'), { gorro: hex('#e8e0c8') });
  if (Math.sin(t * 0.8) > 0) R.pset(80, 114, f_LDC.blanco[4]);
  // el punto de medida bajo el trípode y el gravímetro con su aguja (o.tiembla: tiembla)
  const ti = Math.max(0, Math.min(1, o.tiembla ?? 0)), ag = ti > 0 ? Math.sin(t * 41) * 0.7 * ti : Math.sin(t * 0.6) * 0.12;
  for (let i = -3; i <= 3; i++) { R.pset(160 + i, 151, f_LDC.blanco[4]); R.pset(160, 151 + Math.round(i / 2), f_LDC.blanco[4]); }
  PIEZAS_TU.gravimetro(R, 160, 151, { aguja: ag });
  // el escarabajo que pasa con su bola por delante del trípode
  const r = {};
  // (hasta x 192 va aquí, detrás de la gente; desde ahí lo pinta gravimetro en laderaDelante, delante de la caja)
  if (o.escarabajo != null) { const p = f_ldEscarabajoPaso(o.escarabajo); if (p[0] < 192) f_ldEscarabajo(R, t, o.escarabajo); r.escarabajo = p; }
  return r;
}
function f_ldGravimetroDelante(R, t, o) {
  // la sombrilla (la tela a gajos con su luz, el palo clavado) y la caja con el portátil que da las lecturas
  const sw = Math.round(Math.sin(t * 1.3) * 1);
  R.linea(184, 156, 178 + sw, 98, f_LDC.metal[2]); R.linea(185, 156, 179 + sw, 98, f_LDC.metal[3]);
  for (let i = -30; i <= 30; i++) { const y0 = 92 + Math.round(i * i / 90) + sw * (i > 0 ? 1 : 0), g = Math.floor((i + 30) / 8) % 2; for (let j = 0; j < 4 - Math.round(Math.abs(i) / 14); j++) R.pset(178 + sw + i, y0 + j, j === 0 ? (g ? hex('#4a8ad0') : f_LDC.blanco[4]) : (g ? hex('#2e64a8') : f_LDC.blanco[2])); if (Math.abs(i) > 26) R.pset(178 + sw + i, y0 + 4 + (Math.floor(t * 5 + i) % 2), g ? hex('#2e64a8') : f_LDC.blanco[2]); }
  R.pset(178 + sw, 89, f_LDC.metal[3]); R.pset(178 + sw, 90, f_LDC.metal[3]);
  f_ldCaja(R, 214, 154, 36, 16, hex('#3a4a5a'));
  R.rect(216, 146, 248, 153, f_LDC.metal[0]); R.rect(217, 135, 247, 146, f_LDC.k); R.rect(218, 136, 246, 145, hex('#1a3a3a'));
  const n = 9812 + (o.tiembla ? Math.floor(t * 30) % 7 : Math.floor(t * 2) % 3);
  R.numero(String(n), 221, 144, { fina: true, color: hex('#8af0b0'), sombra: false });
  // el escarabajo, ya delante de la caja (desde x 192)
  if (o.escarabajo != null) { const p = f_ldEscarabajoPaso(o.escarabajo); if (p[0] >= 192) f_ldEscarabajo(R, t, o.escarabajo); return { escarabajo: p }; }
  return {};
}
// el inserto 'muelle': el dibujo del gravímetro POR DENTRO en una lámina sobre la mesa de campaña: la pesa colgada del
// muelle finísimo, la palanca, la escala con la aguja y una lupa encima; la taza con vapor, el lápiz y unas piedras
function f_ldMuelle(R, t, o, q) {
  f_ldCapa(R, 'muelle', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 30), j = y % 30; R.pset(x, y, j === 0 ? hex('#5a3a22') : f_ldT(f_LDC.madera, 0.82 + Math.sin(x * 0.05 + tabla * 2 + Math.sin(x * 0.013) * 3 + j * 0.2) * 0.06 + (h(x >> 2, y, 139) - 0.5) * 0.08 - (j === 1 ? -0.1 : 0) - (x > 270 && y < 48 ? 0.04 : 0), x, y)); }
    R.rect(62, 22, 264, 172, hex('#4a2e1a'));
    for (let y = 18; y <= 168; y++) for (let x = 58; x <= 260; x++) R.pset(x, y, f_ldT(f_LDC.papel, 0.86 + (h(x, y, 140) - 0.5) * 0.08, x, y));
    const A = C.lapis;
    // el cilindro en corte (dos paredes, la tapa y el pie)
    for (let y = 34; y <= 156; y++) { R.pset(100, y, A); R.pset(101, y, A); R.pset(178, y, A); R.pset(179, y, A); }
    R.rect(96, 30, 184, 33, A); R.rect(96, 157, 184, 160, A); for (let x = 102; x < 178; x += 4) R.linea(x, 157, x + 3, 160, f_LDC.papel[3]);
    for (let y = 36; y <= 154; y += 5) { R.pset(103, y, f_LDC.papel[1]); R.pset(176, y, f_LDC.papel[1]); }
    // la escala, a la derecha
    for (let y = 70; y <= 130; y++) R.pset(214, y, f_LDC.k); for (let k = 0; k <= 6; k++) { const y = 70 + k * 10; R.linea(214, y, k === 3 ? 222 : 219, y, f_LDC.k); }
    R.numero('0', 226, 104, { fina: true, color: f_LDC.k, sombra: false });
    // la taza, el lápiz y las piedras de la mesa
    R.disco(30, 140, 13, hex('#3a2a1a')); R.disco(28, 138, 13, f_LDC.blanco[3]); R.disco(28, 138, 10, hex('#5a3418')); R.disco(26, 136, 4, hex('#7a4a24')); R.rect(40, 134, 46, 142, f_LDC.blanco[2]);
    for (let i = 0; i < 42; i++) { R.pset(270 + i, 150 - Math.round(i * 0.5), i < 4 ? f_LDC.k : i < 8 ? hex('#e8c890') : i > 38 ? hex('#e88a8a') : hex('#e0b030')); R.pset(270 + i, 151 - Math.round(i * 0.5), i < 8 ? hex('#a88860') : hex('#a88020')); }
    f_ldPiedra(R, 290, 100, 6, 4, f_LDC.roca, 0.6); f_ldPiedra(R, 300, 112, 4, 3, f_LDC.estrato, 0.5); f_ldPiedra(R, 22, 50, 5, 4, f_LDC.roca, 0.65);
    return null;
  });
  const hu = Math.max(0, Math.min(1, o.hueco ?? 0)), a = Math.max(-1, Math.min(1, o.aguja ?? 0)), A = C.lapis;
  // el muelle y la pesa (sube un pelo con el hueco)
  const yp = Math.round(104 - hu * 4), n = 14;
  for (let j = 0; j <= yp - 36; j++) { const fase = (j / (yp - 36)) * n * Math.PI; R.pset(140 + Math.round(Math.sin(fase) * 6), 36 + j, A); }
  R.rect(124, yp, 156, yp + 22, f_LDC.metal[2]); R.rect(124, yp, 156, yp + 1, f_LDC.metal[4]); R.rect(155, yp + 2, 156, yp + 22, f_LDC.metal[0]); R.rect(124, yp + 22, 156, yp + 22, f_LDC.metal[0]);
  // la palanca que lleva el movimiento a la aguja
  const ang = a * 0.5 + Math.sin(t * 4) * 0.02, px = 214, py = 100, ax = px + Math.round(Math.cos(Math.PI + ang) * 0), ay = py + Math.round(-ang * 30);
  R.linea(157, yp + 10, 196, ay, A); R.linea(196, ay, 222, ay - Math.round(ang * 4), f_LDC.rojo); R.linea(196, ay + 1, 222, ay + 1 - Math.round(ang * 4), hex('#7a1a14'));
  // la lupa encima de la escala (aumenta la aguja)
  const lx = 214, ly = ay;
  for (let j = -15; j <= 15; j++) for (let i = -15; i <= 15; i++) { const d = Math.hypot(i, j); if (d > 15) continue; const x = lx + i, y = ly + j; if (d > 13) { R.pset(x, y, f_LDC.k); continue; } R.pset(x, y, f_ldMez(R.pget(lx + Math.round(i / 1.8), ly + Math.round(j / 1.8)), hex('#e8f4ff'), 0.15 + (i + j < -14 ? 0.3 : 0))); }
  R.linea(lx + 11, ly + 11, lx + 26, ly + 28, f_LDC.k); R.linea(lx + 12, ly + 11, lx + 27, ly + 28, f_LDC.madera[2]); R.linea(lx + 12, ly + 12, lx + 26, ly + 29, f_LDC.madera[1]);
  // el vapor de la taza
  for (let k = 0; k < 8; k++) { const u = (t * 0.5 + k / 8) % 1; R.pset(28 + Math.round(Math.sin(t * 2 + k + u * 5) * 3), 130 - Math.round(u * 28), f_ldMez(f_LDC.blanco[4], f_LDC.madera[4], u)); }
  return { aguja: [lx, ly] };
}

// la planta de la tumba en el mapa (canon: norte arriba; la escalera y el pasillo llegan por la derecha, el anexo abajo a
// la izquierda, la cámara pintada arriba y el tesoro a su derecha)
const f_LD_PLANTA = { ante: [108, 116, 188, 132], pintada: [140, 96, 178, 114], tesoro: [180, 98, 202, 114], anexo: [112, 134, 134, 148], pasillo: [188, 124, 236, 132], escalera: [236, 122, 258, 134] };

const f_LD_RAMPA_D = f_ldH(['#2e1c58', '#4a2e80', '#4a5ac8', '#5a9ad0', '#8ac89a', '#d8dc8a', '#f0b464', '#e0784a']);

// la densidad en el mapa (0 = poca masa, 1 = mucha): ondas suaves y las manchas (la fuerte al norte con dos esquinas
// rectas arriba, el pasillo del este junto al pasillo de entrada y dos pequeñas)
function f_ldDensidad(x, y) {
  let v = 0.62 + 0.14 * Math.sin(x / 19 + 0.8) * Math.cos(y / 23) + 0.08 * Math.sin((x + y) / 13) + (h(x >> 2, y >> 2, 141) - 0.5) * 0.06;
  const caja = (x0, y0, x1, y1, f, recta) => { const nx = (x - (x0 + x1) / 2) / ((x1 - x0) / 2), ny = (y - (y0 + y1) / 2) / ((y1 - y0) / 2); const d = recta && ny < 0 ? Math.max(Math.abs(nx), Math.abs(ny)) : Math.hypot(nx, ny); return Math.max(0, Math.min(1, (1.25 - d) * 2.5)) * f; };
  v -= caja(136, 62, 186, 90, 0.62, true) + caja(196, 112, 250, 119, 0.32, false) + caja(70, 60, 92, 74, 0.25, false) + caja(222, 54, 246, 70, 0.22, false);
  return Math.max(0, Math.min(1, v));
}

function f_ldPlanta(R, P = f_LD_PLANTA, c = f_LDC.k, e = 1, dx = 0, dy = 0) {
  const X = (x) => Math.round(dx + x * e), Y = (y) => Math.round(dy + y * e);
  const caja = ([x0, y0, x1, y1]) => { R.linea(X(x0), Y(y0), X(x1), Y(y0), c); R.linea(X(x0), Y(y1), X(x1), Y(y1), c); R.linea(X(x0), Y(y0), X(x0), Y(y1), c); R.linea(X(x1), Y(y0), X(x1), Y(y1), c); };
  for (const k of ['ante', 'pintada', 'tesoro', 'anexo', 'pasillo', 'escalera']) caja(P[k]);
  for (let x = P.escalera[0] + 3; x < P.escalera[2]; x += 3) R.linea(X(x), Y(P.escalera[1]), X(x), Y(P.escalera[3]), c);
  // la pared norte de la cámara pintada, más gruesa
  R.linea(X(P.pintada[0]), Y(P.pintada[1]) - 1, X(P.pintada[2]), Y(P.pintada[1]) - 1, c);
}

function f_ldMesaCampo(R) {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(x / 40), j = x % 40; R.pset(x, y, j === 0 ? hex('#4a2e1a') : f_ldT(f_LDC.madera, 0.78 + Math.sin(y * 0.06 + tabla * 2.3 + Math.sin(y * 0.017 + tabla) * 3 + j * 0.15) * (x > 270 && y < 48 ? 0.02 : 0.06) + (h(x, y >> 2, 142) - 0.5) * 0.08, x, y)); }
}

function f_ldMapa(R, t, o, q) {
  f_ldCapa(R, 'mapa', () => {
    f_ldMesaCampo(R);
    R.rect(34, 30, 274, 174, hex('#3a2414'));
    for (let y = 26; y <= 170; y++) for (let x = 30; x <= 270; x++) R.pset(x, y, f_ldT(f_LDC.papel, 0.88 + (h(x, y, 143) - 0.5) * 0.06 - (x < 34 || x > 266 || y < 30 || y > 166 ? 0.12 : 0), x, y));
    for (let x = 36; x <= 264; x += 20) for (let y = 32; y <= 164; y += 2) R.pset(x, y, f_LDC.papel[2]);
    for (let y = 32; y <= 164; y += 20) for (let x = 36; x <= 264; x += 2) R.pset(x, y, f_LDC.papel[2]);
    // la taza de café, el compás, la piedra de peso y el lápiz
    R.disco(14, 70, 10, hex('#3a2414')); R.disco(12, 68, 10, f_LDC.blanco[3]); R.disco(12, 68, 7, hex('#4a2a14')); R.disco(10, 66, 2, hex('#7a4a24'));
    for (let i = 0; i < 26; i++) { R.pset(284 + i * 0.4, 96 + i, f_LDC.metal[3]); R.pset(300 - i * 0.2, 96 + i, f_LDC.metal[2]); } R.disco(292, 95, 2, f_LDC.metal[4]);
    for (let i = 0; i < 40; i++) { R.pset(276 + Math.round(i * 0.3), 130 + i, i < 3 ? f_LDC.k : i < 7 ? hex('#e8c890') : hex('#3a8a4a')); R.pset(277 + Math.round(i * 0.3), 130 + i, i < 7 ? hex('#a88860') : hex('#2a6a3a')); }
    return null;
  });
  // los colores de menos densidad que se extienden (primero las manchas, luego el resto)
  const mn = Math.max(0, Math.min(1, o.manchas ?? 1));
  if (mn > 0) for (let y = 32; y <= 164; y++) for (let x = 36; x <= 264; x++) { const v = f_ldDensidad(x, y); if (mn * 1.6 - v * 1.1 + 0.2 < f_ldU(x, y)) continue; R.pset(x, y, f_LD_RAMPA_D[Math.max(0, Math.min(7, Math.floor(v * 7.99 + (f_ldU(x, y) - 0.5) * 0.9)))]); }
  f_ldPlanta(R, f_LD_PLANTA, mn > 0.3 ? f_LDC.blanco[4] : f_LDC.k);
  // la rejilla: más de mil puntos (46 × 27) que se marcan uno a uno, fila a fila en zigzag
  const rj = Math.max(0, Math.min(1, o.rejilla ?? 1)), N = 46 * 27, marcados = Math.floor(rj * N);
  for (let k = 0; k < N; k++) { const j = Math.floor(k / 46), i = j % 2 ? 45 - (k % 46) : k % 46, x = 38 + i * 5, y = 34 + j * 5;
    if (k < marcados) R.pset(x, y, f_LDC.k); else if ((i + j) % 2 === 0) R.pset(x, y, f_LDC.papel[0]);
    if (k === marcados && rj < 1) { R.pset(x - 1, y, f_LDC.rojo); R.pset(x + 1, y, f_LDC.rojo); R.pset(x, y - 1, f_LDC.rojo); R.pset(x, y + 1, f_LDC.rojo); } }
  // la flecha del norte (arriba, con su estrella) y la piedra que sujeta la esquina
  R.linea(252, 40, 252, 56, f_LDC.k); for (let i = 0; i < 4; i++) R.linea(252 - i, 40 + i, 252 + i, 40 + i, f_LDC.k); R.pset(252, 37, f_LDC.rojo); R.pset(251, 36, f_LDC.rojo); R.pset(253, 36, f_LDC.rojo); R.pset(252, 35, f_LDC.rojo);
  f_ldPiedra(R, 38, 160, 7, 5, f_LDC.roca, 0.6);
  // el vapor del café, una hormiga que pasea por la mesa y la esquina del mapa que levanta el viento
  for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1; R.pset(12 + Math.round(Math.sin(t * 2 + k + u * 5) * 3), 58 - Math.round(u * 22), f_ldMez(f_LDC.blanco[4], f_LDC.madera[4], u)); }
  const hx = Math.round(296 + Math.sin(t * 0.4) * 16), hy = Math.round(160 - ((t * 6) % 40)); R.pset(hx, hy, f_LDC.k); R.pset(hx, hy + 1, f_LDC.k); R.pset(hx, hy + 3, f_LDC.k);
  const v = Math.max(0, Math.sin(t * 1.5) + Math.sin(t * 2.7) * 0.5); for (let j = 0; j < Math.round(v * 5); j++) for (let i = 0; i <= j; i++) R.pset(270 - i, 170 - j + i, f_LDC.papel[1]);
  // o.chincheta 0–1: la mano (sola, de cerca: el brazo queda fuera, hacia la cámara) entra por la derecha con la
  // chincheta roja entre los dedos, la clava en la mancha grande (172, 70) en 0,5 y se va; la chincheta se queda
  if (o.chincheta != null) {
    const k = Math.max(0, Math.min(1, o.chincheta)), px = 172, py = 70, E = (u) => u * u * (3 - 2 * u);
    const ida = E(Math.min(1, k / 0.5)), vuelta = E(Math.max(0, (k - 0.62) / 0.38)), aprieta = k >= 0.5 && k < 0.62 ? 1 : 0;
    const hx = Math.round(px + 12 + (1 - ida) * 168 + vuelta * 168), hy = Math.round(py - 5 + (1 - ida) * 34 + vuelta * 30 + aprieta);
    if (k >= 0.5) chincheta(R, px, py, t, hex('#d83a2a'), { baja: 1 });
    if (hx < 334) {
      for (let j = -4; j <= 4; j++) for (let i = -9; i <= 9; i++) { const x = hx - 2 + i + 4, y = hy + 9 + j; if ((x + y) & 1 || (i * i) / 81 + (j * j) / 16 > 1 || x < 30 || x > 270 || y < 26 || y > 170) continue; R.pset(x, y, f_ldMez(R.pget(x, y), hex('#5a4a3a'), 0.35)); }
      if (k < 0.5) { const cx = hx - 11, cy = hy + 2; R.linea(cx, cy + 2, cx, cy + 6, f_LDC.metal[3]); R.disco(cx, cy, 3, f_LDC.k); R.disco(cx, cy, 2, hex('#d83a2a')); R.pset(cx - 1, cy - 1, f_LDC.blanco[4]); }
      mano(R, hx, hy, -1, '#4a6a8a', { sinManga: true });
    }
  }
  return o.chincheta != null ? { chincheta: [172, 70] } : {};
}
function f_ldEsquinas(R, t, o, q) {
  // el mismo mapa de cerca (cada punto del mapa, 2,4 píxeles): la cámara pintada abajo y la mancha fuerte encima
  const e = 2.4, dx = -150 * e + 160, dy = -76 * e + 80, mx = (x) => (x - dx) / e, my = (y) => (y - dy) / e;
  f_ldCapa(R, 'esquinas', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = f_ldDensidad(Math.round(mx(x)), Math.round(my(y))); R.pset(x, y, f_LD_RAMPA_D[Math.max(0, Math.min(7, Math.floor(v * 7.99 + (f_ldU(x, y) - 0.5) * 0.9)))]); }
    f_ldPlanta(R, f_LD_PLANTA, f_LDC.blanco[4], e, dx, dy);
    for (let j = 0; j < 40; j++) for (let i = 0; i < 70; i++) { const x = Math.round(dx + (38 + i * 5) * e), y = Math.round(dy + (34 + j * 5) * e); R.pset(x, y, f_LDC.k); R.pset(x + 1, y, f_LDC.k); }
    return null;
  });
  // la escuadra de plástico que se posa en las dos esquinas de arriba, y la cota de 35 (m²: el cuadrito)
  const es = Math.max(0, Math.min(1, o.escuadra ?? 1)), X0 = Math.round(dx + 136 * e), X1 = Math.round(dx + 186 * e), Y0 = Math.round(dy + 62 * e);
  if (es > 0) for (const [cx, s] of [[X0, 1], [X1, -1]]) { const off = Math.round((1 - es) * 40);
    for (let j = 0; j < 34; j++) for (let i = 0; i <= 34 - j; i++) { const x = cx + s * (i - off), y = Y0 + j; const b = i === 0 || j === 0 || i === 34 - j; R.pset(x, y, b ? hex('#2a6aa8') : f_ldMez(R.pget(x, y), hex('#d8f0ff'), 0.45)); if (j === 0 && i % 4 === 0) R.pset(x, y + 1, hex('#2a6aa8')); if (i === 0 && j % 4 === 0) R.pset(x + s, y, hex('#2a6aa8')); } }
  if (es > 0.6) { const cx = Math.round(dx + 161 * e), cy = Math.round(dy + 78 * e); R.numero('35', cx - 10, cy + 6, { tam: 16, color: f_LDC.blanco[4] }); R.rect(cx + 24, cy - 8, cx + 29, cy - 3, f_LDC.k); R.rect(cx + 25, cy - 7, cx + 28, cy - 4, f_LDC.blanco[4]); }
  return { mancha: [X0, Y0, X1, Math.round(dy + 90 * e)] };
}

function f_ldDial(R, cx, cy, r, ang, ruido, e = 1) {
  for (let j = -r; j <= 2; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r + 0.5 || j > 2) continue; const a = Math.atan2(i, -j);
    R.pset(cx + i, cy + j, d > r - 1.5 ? f_LDC.k : Math.abs(a) < ruido && d > r * 0.3 && d < r - 2 ? ((i + j) % 2 ? f_LDC.metal[2] : f_LDC.metal[3]) : f_LDC.blanco[4]); }
  for (let k = -4; k <= 4; k++) { const a = k * Math.PI / 10; R.linea(cx + Math.sin(a) * (r - 2), cy - Math.cos(a) * (r - 2), cx + Math.sin(a) * (r - 2 - 2 * e - (k === 0 ? 2 * e : 0)), cy - Math.cos(a) * (r - 2 - 2 * e - (k === 0 ? 2 * e : 0)), f_LDC.k); }
  for (let w = 0; w < e; w++) R.linea(cx + w, cy, cx + w + Math.sin(ang) * (r - 3), cy - Math.cos(ang) * (r - 3), f_LDC.rojo);
  R.disco(cx, cy, 1.5 * e, f_LDC.k);
}

function f_ldCortesFijo(R, q) {
  // arriba, la lona de la tienda con sus costuras y, por la abertura, la ladera al sol
  for (let y = 0; y < 48; y++) for (let x = 0; x < 320; x++) R.pset(x, y, f_ldT(f_LDC.lona, 0.62 + (x % 32 === 0 ? -0.3 : 0) + Math.sin(x * 0.2 + y * 0.05) * 0.04 + (h(x >> 1, y >> 1, 144) - 0.5) * 0.08 + (x > 270 ? 0.05 : 0), x, y));
  for (let y = 4; y < 46; y++) for (let x = 186; x <= 254; x++) { const b = Math.min(x - 186, 254 - x); if (b < 1) { R.pset(x, y, f_LDC.lona[0]); continue; } R.pset(x, y, y < 26 ? f_ldT(f_LDC.cieloDia, y / 30, x, y) : f_ldT(f_LDC.roca, f_ldGrano(x, y, 0.7), x, y)); }
  f_ldRiscos(R, 187, 253, (x) => 18 + f_ldR1(x, 145, 9) * 6, 27, 49, f_LDC.lejos);
  // el tablero de corcho y la lámina grande
  for (let y = 44; y < 180; y++) for (let x = 0; x < 320; x++) { const b = Math.min(x - 2, 317 - x, y - 44); R.pset(x, y, b < 3 ? f_ldT(f_LDC.madera, 0.7 - (b === 0 ? 0.4 : 0), x, y) : f_ldT(f_LDC.corcho, 0.5 + (h(x, y, 146) - 0.5) * 0.7, x, y)); }
  R.rect(10, 50, 312, 179, hex('#5a3a22'));
  for (let y = 47; y < 178; y++) for (let x = 7; x <= 310; x++) R.pset(x, y, f_ldT(f_LDC.papel, 0.87 + (h(x, y, 147) - 0.5) * 0.07, x, y));
  const C3 = V_LADERA.cortes.general.geo.cortes;
  C3.forEach(([x0, y0, x1, y1], n) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, f_ldT(f_LDC.estrato, f_ldEstrato(x * 1.3, y * 1.3, 1, 0.1) + 0.05, x, y));
    for (let x = x0; x <= x1; x++) { R.pset(x, y0, f_LDC.k); R.pset(x, y1, f_LDC.k); } for (let y = y0; y <= y1; y++) { R.pset(x0, y, f_LDC.k); R.pset(x1, y, f_LDC.k); }
    for (let x = x0 + 1; x < x1; x += 3) R.pset(x, y0 - 1, f_LDC.verde);
    const cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1;
    if (n === 0) { for (let y = cy - 12; y <= cy + 12; y++) for (let x = cx - 18; x <= cx + 18; x++) R.pset(x, y, Math.abs(y - cy) === 12 || Math.abs(x - cx) === 18 ? f_LDC.k : f_LDC.papel[4]); }
    else if (n === 1) { for (let y = cy - 7; y <= cy + 7; y++) for (let x = x0 + 1; x <= cx + 26; x++) R.pset(x, y, Math.abs(y - cy) === 7 ? f_LDC.k : f_LDC.papel[3]);
      for (let k = 0; k < 26; k++) f_ldPiedra(R, Math.round(x0 + 4 + h(k, 1, 148) * (cx + 20 - x0)), Math.round(cy - 4 + h(k, 2, 148) * 9), 2 + Math.round(h(k, 3, 148) * 2), 2, f_LDC.roca, 0.55); }
    else { const G = [[cx - 30, cy - 20, cx - 4, cy + 4], [cx - 4, cy + 4, cx + 10, cy - 8], [cx + 10, cy - 8, cx + 34, cy + 22], [cx - 4, cy + 4, cx - 12, cy + 30], [cx + 10, cy - 8, cx + 20, cy - 32], [cx - 20, cy - 10, cx - 34, cy - 4]];
      for (const [a, b, c, d] of G) { R.linea(a, b, c, d, f_LDC.k); R.linea(a + 1, b, c + 1, d, f_LDC.estrato[1]); } }
  });
  // la cabecera de rayas (sin letras) y las chinchetas
  R.rect(14, 54, 90, 56, f_LDC.k); R.rect(14, 60, 70, 60, f_LDC.papel[0]);
  for (const [x, y] of [[10, 49], [306, 49], [10, 174], [306, 174]]) f_ldChin(R, x, y, f_LDC.rojo);
  if (q.luz === 'tarde') f_ldTarde(R, 0, 47, 0.18);
  return null;
}

// la pesa (el icono de la gravedad)
const f_LD_PESA = ['..###..', '..#.#..', '.#####.', '#######', '#######', '#######'];

function f_ldCortes(R, t, o, q, g) {
  f_ldCapa(R, 'cortes|' + q.luz, () => f_ldCortesFijo(R, q));
  // la lona que se mueve un poco con el aire
  for (let x = 0; x < 320; x += 32) { const s = Math.round(Math.sin(t * 1.2 + x) * 1); if (s) R.linea(x + 16, 2, x + 16 + s, 44, f_LDC.lona[1]); }
  // los tres aparatos con su aguja que apenas se mueve (en el límite)
  g.agujas.forEach(([x, y], n) => { R.rect(x - 22, y - 18, x + 22, y + 8, f_LDC.k); R.rect(x - 21, y - 17, x + 21, y + 7, hex('#3a3a40')); R.rect(x - 21, y - 17, x + 21, y - 17, hex('#5a5a62'));
    f_ldDial(R, x, y + 2, 16, Math.sin(t * 9 + n * 2) * 0.12 + Math.sin(t * 23 + n) * 0.05, 0.32); R.pset(x + 18, y + 5, Math.sin(t * 4 + n) > 0 ? f_LDC.verdeL : f_LDC.verde); });
  // o.engana: el radar y la pesa encima del corte que engaña a uno y no al otro
  const en = o.engana, r = {};
  if (en === 'radar' || en === 'gravedad' || en === 'ambos') {
    const sitios = en === 'ambos' ? [[1, 'radar'], [2, 'gravedad']] : [[en === 'radar' ? 1 : 2, en]];
    for (const [n, falla] of sitios) { const [x0, y0] = g.cortes[n], cx = (x0 + g.cortes[n][2]) >> 1;
      R.rect(cx - 30, y0 - 2, cx + 30, y0 + 14, f_LDC.blanco[4]); R.rect(cx - 30, y0 - 2, cx + 30, y0 - 2, f_LDC.k); R.rect(cx - 30, y0 + 14, cx + 30, y0 + 14, f_LDC.k);
      R.icono('radar', cx - 26, y0 + 2, hex('#3a6ad0'), f_LDC.k, 1); R.icono(falla === 'radar' ? 'X' : 'X', cx - 16, y0 + 3, falla === 'radar' ? f_LDC.rojo : f_LDC.blanco[4], falla === 'radar' ? f_LDC.k : f_LDC.blanco[4]);
      if (falla !== 'radar') visto(R, cx - 16, y0 + 2, 1);
      for (let j = 0; j < f_LD_PESA.length; j++) for (let i = 0; i < 7; i++) if (f_LD_PESA[j][i] === '#') R.pset(cx + 4 + i, y0 + 3 + j, f_LDC.metal[0]);
      if (falla === 'gravedad') R.icono('X', cx + 15, y0 + 3, f_LDC.rojo, f_LDC.k); else visto(R, cx + 14, y0 + 2, 1);
      r.icono = [cx, y0 + 6]; }
  }
  return r;
}

function f_ldAguja(R, t, o, q) {
  f_ldCapa(R, 'aguja', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, f_ldT(f_LDC.papel, 0.86 + (h(x, y, 149) - 0.5) * 0.07, x, y));
    for (let y = 0; y < 180; y++) for (let x = 0; x < 30; x++) R.pset(x, y, f_ldT(f_LDC.estrato, f_ldEstrato(x * 2, y * 2, 1, 0.1), x, y));
    // la caja de baquelita del aparato, con sus tornillos y el cristal
    for (let y = 40; y < 180; y++) for (let x = 46; x <= 274; x++) { const b = Math.min(x - 46, 274 - x, y - 40); R.pset(x, y, b < 2 ? f_LDC.k : f_ldT(f_LD_GRIS, 0.25 + (b < 5 ? 0.12 : 0) + (h(x, y, 150) - 0.5) * 0.06, x, y)); }
    for (const [x, y] of [[54, 48], [266, 48], [54, 172], [266, 172]]) { R.disco(x, y, 3, f_LDC.metal[3]); R.linea(x - 2, y, x + 2, y, f_LDC.k); }
    return null;
  });
  const ag = Math.max(0, Math.min(1, o.aguja ?? 0.3)), ruido = 0.42, cx = 160, cy = 160, r = 104;
  const ang = (Math.sin(t * 7) * 0.7 + Math.sin(t * 19) * 0.3) * ruido * (0.6 + ag * 0.55);
  f_ldDial(R, cx, cy, r, ang, ruido, 3);
  // las cifras de la escala
  for (let k = -3; k <= 3; k++) { const a = k * Math.PI * 2 / 10 * 0.75, x = Math.round(cx + Math.sin(a) * (r - 22)), y = Math.round(cy - Math.cos(a) * (r - 22)); R.numero(String(Math.abs(k)), x - 3, y + 4, { color: f_LDC.k, sombra: false }); }
  // el reflejo del cristal
  for (let i = 0; i < 40; i++) { R.pset(90 + i, 80 - Math.round(i * 0.6), f_ldMez(R.pget(90 + i, 80 - Math.round(i * 0.6)), f_LDC.blanco[4], 0.6)); }
  return { aguja: [cx, cy] };
}

function f_ldPerforadoraFijo(R, q) {
  const cielo = f_ldCielo(R, 112, q.luz, [210, 22]);
  f_ldFondoValle(R, 104, q.luz, [40, 52]);
  // el llano lejano (a la derecha solo asoma entre el pie de los riscos, y 110, y la cumbre, y 118)
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) if (x < 130 || y > 110) R.pset(x, y, f_ldT(f_LDC.lejos, 0.55 + (h(x >> 1, y >> 1, 161) - 0.5) * 0.2 - (y - 100) / 300 + ((x * 0.7 + y) % 13 < 1 ? -0.15 : 0), x, y));
  f_ldValle(R, 2026, 120);
  // la ladera que cae hacia el valle, en sombra, y la cumbre: el borde que cae a la izquierda hacia el valle, la roca suelta, las piedras
  for (let x = 0; x < 320; x++) { const c = x > 110 ? 118 + Math.round((f_ldR1(x, 151, 9) - 0.5) * 3) : 118 + Math.round((110 - x) * 0.45);
    for (let y = c; y < 180; y++) R.pset(x, y, f_ldT(f_LDC.roca, f_ldGrano(x, y, 0.66 + (y - c) / 500 + (y - c < 2 ? 0.16 : 0)), x, y));
    if (x <= 110) for (let y = 127; y < c; y++) R.pset(x, y, f_ldT(f_LDC.roca, f_ldGrano(x, y, 0.38 + (c - y) / 200) + ((x + y * 2) % 11 === 0 ? -0.15 : 0), x, y)); }
  for (let k = 0; k < 70; k++) { const y = Math.round(122 + h(k, 1, 152) * 58), x = Math.round(h(k, 2, 152) * 320), s = (y - 118) / 62; if (x > 120 && x < 220 && y < 154) continue; f_ldPiedra(R, x, y, Math.max(1, Math.round(1 + s * 3 * h(k, 3, 152))), Math.max(1, Math.round(s * 2 * h(k, 3, 152) + 0.5)), f_LDC.roca, 0.55); }
  // la lona en cuatro palos (a la derecha), con la nevera, las sillas y el carrete de cable
  for (const x of [262, 316]) { R.linea(x, 104, x, 146, f_LDC.madera[2]); R.linea(x + 1, 104, x + 1, 146, f_LDC.madera[4]); }
  for (let x = 258; x <= 319; x++) for (let j = 0; j < 4; j++) R.pset(x, 101 + j + Math.round(Math.abs(x - 289) * 0.04), j === 0 ? f_LDC.lona[4] : (Math.floor(x / 6) % 2 ? f_LDC.lona[2] : f_LDC.lona[3]));
  for (let y = 105; y < 146; y++) for (let x = 263; x < 316; x++) if (f_ldU(x, y) < 0.5) R.pset(x, y, f_ldMez(R.pget(x, y), f_LDC.sombra, 0.35));
  R.rect(270, 130, 284, 145, hex('#3a7ac0')); R.rect(270, 130, 284, 131, hex('#8ac0f0')); R.rect(283, 132, 284, 145, hex('#2a5a90'));
  R.rect(290, 132, 302, 133, hex('#3a8a5a')); R.linea(291, 134, 291, 145, f_LDC.metal[1]); R.linea(301, 134, 301, 145, f_LDC.metal[1]); R.rect(290, 124, 291, 132, hex('#3a8a5a'));
  // la plataforma de tablones y el generador
  for (let y = 142; y <= 149; y++) for (let x = 126; x <= 214; x++) R.pset(x, y, y === 142 ? f_LDC.madera[5] : y > 147 ? f_LDC.madera[1] : (x - 126) % 14 === 0 ? f_LDC.madera[1] : f_ldT(f_LDC.madera, 0.6 + (h(x >> 2, y, 153) - 0.5) * 0.2, x, y));
  R.rect(222, 120, 254, 145, hex('#7a2a24')); R.rect(222, 120, 254, 122, hex('#b04a3a')); R.rect(252, 123, 254, 145, hex('#4a1a14'));
  for (let y = 126; y < 140; y += 3) R.linea(226, y, 246, y, hex('#4a1a14')); R.rect(248, 112, 250, 120, f_LDC.metal[1]); R.disco(228, 147, 3, f_LDC.k); R.disco(248, 147, 3, f_LDC.k);
  if (q.luz === 'tarde') f_ldTarde(R, 0, 179, 0.18);
  return cielo;
}
function f_ldPerforadora(R, t, o, q) {
  const m = f_ldCapa(R, 'perforadora|' + q.luz, () => f_ldPerforadoraFijo(R, q));
  f_ldNubes(R, t, m, q.luz, [[30, 30, 48, 1.4, 19], [190, 46, 34, 2.3, 20], [100, 66, 26, 3.4, 21]]);
  f_ldPajaros(R, t, [20, 28, 240, 70], 3, [80, 60, 30]);
  // los turistas lejanos del valle
  for (let k = 0; k < 4; k++) { const u = (t * 0.03 + k * 0.25) % 1, x = 6 + u * 100; f_ldFigura(R, x, Math.round(110 - x * 0.06 + Math.sin(x * 0.07) * 2) - 1, t, [hex('#d84a4a'), hex('#4a7ad0'), hex('#f0f0e8'), hex('#3aa070')][k], { anda: true, alto: 5 }); }
  const b = Math.max(0, Math.min(1, o.broca ?? 0)), va = b > 0 && b < 1, tb = va ? (Math.floor(t * 18) % 2) : 0;
  // las mangueras del generador a la máquina y el humo del escape
  for (let i = 0; i <= 50; i++) { const x = 222 - i, y = 146 + Math.round(Math.sin(i * 0.15) * 2); R.pset(x, y, f_LDC.k); R.pset(x, y - 1, hex('#2a2a2a')); }
  for (let k = 0; k < 6; k++) { const u = (t * (va ? 1.2 : 0.6) + k / 6) % 1; R.disco(249 + Math.round(u * 8 + Math.sin(t * 2 + k) * 2), 110 - Math.round(u * 24), 1 + u * 2.5, f_ldMez(f_LDC.metal[2], f_LDC.blanco[3], u)); }
  // la perforadora (escala 2 en este plano), que tiembla mientras perfora, y el polvo blanco de la boca
  const p = PIEZAS_TU.perforadora(R, 170 + tb, 148, { broca: b, t, s: 2 });
  if (va) for (let k = 0; k < 16; k++) { const u = (t * 1.5 + k / 16) % 1, a = k * 2.4; R.pset(165 + Math.round(Math.cos(a) * (2 + u * 16)), 147 - Math.round(u * 10 * Math.abs(Math.sin(a))), f_ldMez(f_LDC.blanco[4], f_LDC.roca[7], u)); }
  if (va) for (let k = 0; k < 12; k++) { const x = 100 + k * 14, y = 152 + (k % 4) * 6; if (Math.floor(t * 20 + k) % 2) R.pset(x, y - 1, f_LDC.roca[7]); }
  // dos técnicos pequeños al fondo, bajo la lona
  f_ldFigura(R, 296, 145, t, hex('#e07a2a'), { gorro: hex('#f0f0f0') }); f_ldFigura(R, 278, 145, t + 2, hex('#3a5a8a'), { gorro: hex('#f0d040') });
  return { perforadora: [165, 148], punta: p.punta };
}

function f_ldPerforadoraDelante(R, t) {
  f_ldCaja(R, 4, 156, 40, 22); f_ldCaja(R, 30, 166, 26, 14, hex('#8a3a2a'));
  // el carrete de cable
  R.disco(298, 166, 14, f_LDC.madera[1]); R.disco(298, 166, 12, f_LDC.madera[3]); R.disco(298, 166, 9, hex('#2a2a2a')); R.disco(298, 166, 4, f_LDC.madera[4]); R.disco(298, 166, 2, f_LDC.madera[1]);
  for (let a = 0; a < 6.28; a += 0.5) R.pset(298 + Math.round(Math.cos(a) * 7), 166 + Math.round(Math.sin(a) * 7), hex('#4a4a4a'));
  return {};
}

// el inserto 'camarita': dentro del agujero, el tubo de roca y el hueco oscuro de abajo con el murciélago
function f_ldCamarita(R, t, o, q) {
  f_ldCapa(R, 'camarita', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      let c = f_ldT(f_LDC.estrato, f_ldEstrato(x, y, 3, 0.5) - 0.15, x, y);
      const dh = Math.hypot((x - 200) / 150, (y - 158) / 46) + (h(x >> 2, y >> 2, 154) - 0.5) * 0.3;
      if (dh < 1 && y > 112) c = f_ldMez(c, hex('#0c0810'), Math.min(0.95, (1.1 - dh) * 2.2));
      if (x >= 188 && x <= 212 && y < 120) { const d = Math.abs(x - 200) / 12; c = x === 188 || x === 212 ? f_LDC.k : f_ldT(f_LDC.estrato, 0.25 + (1 - d) * 0.25 + (((y + x * 0.5) % 9) < 1 ? -0.15 : 0), x, y); }
      R.pset(x, y, c);
    }
    return null;
  });
  const ba = Math.max(0, Math.min(1, o.baja ?? 1)), gi = Math.max(0, Math.min(1, o.gira ?? 0)), mu = Math.max(0, Math.min(1, o.murcielago ?? 0));
  const yp = Math.round(30 + ba * 112), L = Math.max(2, Math.round(yp / 3) - 9);
  // el murciélago colgado del techo del hueco
  PIEZAS_TU.murcielago(R, 272, 152, { colgado: true, s: 3 });
  if (mu > 0.5) { R.rect(268, 143, 269, 144, f_LDC.blanco[4]); R.pset(269, 144, f_LDC.k); }
  const p = PIEZAS_TU.camarita(R, 200, 0, { cable: L, s: 3, t, dir: gi > 0.5 ? -1 : 1 }).punta;
  // el haz de luz: hacia abajo por el tubo y, al girar, hacia el murciélago
  const an0 = Math.PI / 2 * (1 - gi) + gi * 0.12 + Math.sin(t * 1.3) * 0.12 * (1 - gi);
  for (let k = 0; k < 900; k++) { const r = 3 + (k % 90), an = an0 + ((Math.floor(k / 90) - 4.5) / 4.5) * 0.28, x = Math.round(p[0] + Math.cos(an) * r), y = Math.round(p[1] + Math.sin(an) * r);
    if (y > 179 || (y < 120 && (x < 189 || x > 211))) continue; if (f_ldU(x, y) > 1 - r / 110) continue; R.pset(x, y, f_ldMez(R.pget(x, y), f_LDC.frio[3], 0.45 - r / 300)); }
  for (let k = 0; k < 10; k++) { const x = Math.round(p[0] + Math.cos(an0) * (10 + k * 7) + Math.sin(t * 2 + k) * 3), y = Math.round(p[1] + Math.sin(an0) * (10 + k * 7) + Math.cos(t + k) * 3); if (y < 180) R.pset(x, y, f_LDC.frio[4]); }
  return { luz: p, murcielago: [272, 140] };
}

function f_ldPermisoFijo(R) {
  // la pared encalada con su textura, el zócalo de madera y el suelo de baldosas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (y < 112) c = f_ldT(f_ldH(['#a89a7a', '#c4b896', '#d8cea8', '#e6dcb8', '#efe8cc']), 0.62 + (h(x >> 2, y >> 2, 155) - 0.5) * 0.1 + (h(x, y, 156) - 0.5) * 0.06 - (y < 6 ? 0.25 : 0) + (x > 270 && y < 48 ? 0.04 : 0), x, y);
    else if (y < 148) c = f_ldT(f_LDC.madera, 0.62 + ((x % 40) < 2 ? -0.35 : (x % 40) < 3 ? 0.2 : 0) + (y === 112 || y === 113 ? 0.35 : 0) + (y === 147 ? -0.3 : 0) + Math.sin(y * 0.4 + Math.floor(x / 40) * 3 + x * 0.02) * 0.06, x, y);
    else { const v = (y - 148) / 32, bx = Math.floor((x - 160) / (14 + v * 10) + 100), by = Math.floor((y - 148) / (5 + v * 4)); c = f_ldT(f_ldH(['#5a4a3a', '#8a7058', '#b09070', '#c8aa86']), ((bx + by) % 2 ? 0.6 : 0.85) + (h(bx, by, 157) - 0.5) * 0.15, x, y); }
    R.pset(x, y, c);
  }
  // la ventana (el marco de madera, la ciudad con el minarete se pinta en vivo, recortada)
  for (let y = 28; y <= 98; y++) for (let x = 16; x <= 94; x++) { const b = Math.min(x - 16, 94 - x, y - 28, 98 - y); if (b < 4 || (x >= 54 && x <= 56) || (y >= 61 && y <= 63)) R.pset(x, y, f_ldT(f_LDC.madera, 0.75 - (b === 0 ? 0.4 : 0) + (b === 3 ? -0.2 : 0), x, y)); }
  R.rect(12, 99, 98, 102, f_LDC.blanco[3]); R.rect(12, 102, 98, 103, f_LDC.blanco[1]);
  // la estantería de archivadores, el cuadro (nuestro: pirámide al sol), el reloj y el calendario de pared
  R.rect(132, 52, 224, 54, f_LDC.madera[2]); R.rect(132, 54, 224, 55, f_LDC.madera[0]);
  for (let k = 0; k < 22; k++) { const x = 134 + k * 4, hh = 14 + (k * 7) % 5; R.rect(x, 52 - hh, x + 3, 51, [hex('#2a4a8a'), hex('#8a2a2a'), hex('#3a6a3a'), hex('#c8a040'), hex('#5a5a5a')][k % 5]); R.pset(x + 1, 52 - hh + 3, f_LDC.blanco[3]); R.pset(x + 1, 52 - hh + 4, f_LDC.blanco[3]); R.pset(x + 3, 52 - hh, f_LDC.k); }
  for (let y = 62; y <= 92; y++) for (let x = 150; x <= 196; x++) { const b = Math.min(x - 150, 196 - x, y - 62, 92 - y); R.pset(x, y, b < 3 ? (b === 2 ? C.oro : hex('#8a6a20')) : y < 80 ? f_ldT(f_LDC.cieloDia, (y - 62) / 20, x, y) : f_ldT(f_LDC.roca, 0.75, x, y)); }
  R.poligono([[162, 84], [174, 68], [186, 84]], f_LDC.roca[6]); R.poligono([[174, 68], [186, 84], [178, 84]], f_LDC.roca[3]); R.disco(188, 68, 3, f_LDC.blanco[4]);
  R.disco(118, 40, 8, f_LDC.k); R.disco(118, 40, 7, f_LDC.blanco[4]); for (let k = 0; k < 12; k++) R.pset(118 + Math.round(Math.sin(k * 0.52) * 6), 40 - Math.round(Math.cos(k * 0.52) * 6), f_LDC.k);
  R.rect(236, 50, 266, 88, f_LDC.blanco[3]); R.rect(236, 50, 266, 58, f_LDC.rojo); R.rect(267, 51, 267, 89, f_LDC.blanco[1]); R.pset(251, 48, f_LDC.k);
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) R.rect(238 + i * 4, 61 + j * 5, 240 + i * 4, 63 + j * 5, f_LDC.blanco[1]);
  // el archivador metálico y la fuente de agua
  R.rect(98, 74, 126, 148, f_LDC.metal[2]); R.rect(98, 74, 126, 75, f_LDC.metal[4]); R.rect(125, 76, 126, 148, f_LDC.metal[0]);
  for (let k = 0; k < 4; k++) { R.rect(100, 78 + k * 17, 123, 78 + k * 17, f_LDC.metal[1]); R.rect(108, 84 + k * 17, 115, 85 + k * 17, f_LDC.metal[4]); }
  R.rect(290, 116, 308, 148, f_LDC.blanco[3]); R.rect(306, 116, 308, 148, f_LDC.blanco[1]); R.rect(293, 92, 305, 115, hex('#8ac0e8')); R.rect(293, 92, 295, 115, hex('#c8e4f8')); R.rect(296, 124, 300, 126, f_LDC.metal[1]);
  // el mástil del banderín (la bandera se mueve en vivo)
  R.linea(274, 64, 274, 148, f_LDC.metal[3]); R.linea(275, 64, 275, 148, f_LDC.metal[1]); R.rect(270, 146, 279, 149, f_LDC.metal[0]); R.disco(274, 63, 2, C.oro);
  return null;
}

function f_ldPermiso(R, t, o, q) {
  f_ldCapa(R, 'permiso', () => f_ldPermisoFijo(R));
  // la ciudad por la ventana (recortada al hueco): el cielo, las azoteas, el minarete, un pájaro y la ropa tendida
  const V = [20, 32, 90, 94];
  R.recorte(V);
  for (let y = 32; y <= 94; y++) for (let x = 20; x <= 90; x++) { if ((x >= 54 && x <= 56) || (y >= 61 && y <= 63)) continue; R.pset(x, y, f_ldT(f_LDC.cieloDia, (y - 32) / 50 + 0.2, x, y)); }
  for (const [x0, x1, top, c] of [[20, 38, 70, '#d8b890'], [36, 52, 64, '#c8a07a'], [58, 74, 72, '#e0c8a0'], [72, 90, 66, '#c09068'], [44, 60, 80, '#b88a60']]) for (let y = top; y <= 94; y++) for (let x = x0; x <= x1; x++) { if ((x >= 54 && x <= 56) || (y >= 61 && y <= 63)) continue; R.pset(x, y, f_ldT(f_ldH(['#8a6a4a', c, '#f0dcc0']), 0.5 + (y === top ? 0.4 : 0) + ((x * 3 + y * 5) % 11 === 0 ? -0.4 : 0), x, y)); }
  for (let y = 40; y <= 70; y++) { R.pset(66, y, hex('#e8d8b8')); R.pset(67, y, hex('#e8d8b8')); R.pset(68, y, hex('#b89a78')); } R.rect(64, 50, 70, 51, hex('#c8b090')); R.rect(65, 36, 68, 39, hex('#d8c8a8')); R.pset(66, 34, hex('#a89070')); R.pset(66, 35, hex('#a89070'));
  for (let k = 0; k < 2; k++) { const x = Math.round(20 + ((t * 9 + k * 37) % 70)), y = 44 + k * 7 + Math.round(Math.sin(t * 3 + k) * 2), a = Math.sin(t * 12 + k) > 0; R.pset(x, y, f_LDC.k); R.pset(x - 1, y - (a ? 1 : 0), f_LDC.k); R.pset(x + 1, y - (a ? 1 : 0), f_LDC.k); }
  R.linea(24, 76, 50, 74, f_LDC.k); for (let i = 0; i < 4; i++) R.rect(27 + i * 6, 76 - Math.round(i * 0.3), 30 + i * 6, 79 + Math.round(Math.sin(t * 2 + i)), [f_LDC.rojo, f_LDC.blanco[4], hex('#3a6ad0'), f_LDC.blanco[4]][i]);
  R.recorte(null);
  // el ventilador del techo que gira
  R.linea(214, 0, 214, 4, f_LDC.metal[1]); R.rect(211, 5, 217, 7, f_LDC.metal[0]);
  for (let k = 0; k < 3; k++) { const a = t * 7 + k * 2.094, c = Math.cos(a); R.linea(214, 7, 214 + Math.round(c * 22), 8 + Math.round(Math.sin(a) * 2), f_LDC.madera[2]); R.linea(214, 8, 214 + Math.round(c * 20), 9 + Math.round(Math.sin(a) * 2), f_LDC.madera[1]); }
  // el banderín (tres franjas y un escudito de oro sin letras) que mueve el aire del ventilador
  for (let i = 0; i < 22; i++) { const o2 = Math.round(Math.sin(t * 4 - i * 0.4) * 1.5 * (i / 22)); for (let j = 0; j < 15; j++) R.pset(276 + i, 66 + j + o2, j < 5 ? f_LDC.rojo : j < 10 ? f_LDC.blanco[4] : f_LDC.k); }
  R.rect(285, 72 + Math.round(Math.sin(t * 4 - 4) * 0.6), 287, 74 + Math.round(Math.sin(t * 4 - 4) * 0.6), C.oro);
  return {};
}

function f_ldPermisoDelante(R, t, o) {
  // todo lo de la mesa va 10 px más abajo que la línea de dibujo (el tablero queda en y 128–138)
  const R0 = R; R = { ...R0, rect: (a, b, c, d, e) => R0.rect(a, b + 10, c, d + 10, e), pset: (a, b, c) => R0.pset(a, b + 10, c), linea: (a, b, c, d, e) => R0.linea(a, b + 10, c, d + 10, e), disco: (a, b, r, c) => R0.disco(a, b + 10, r, c), poligono: (p, c) => R0.poligono(p.map(([x, y]) => [x, y + 10]), c) };
  // la mesa oficial de madera oscura: el tablero con su canto, el frente de cuarterones y las patas
  const M = f_LDC.madera;
  for (let y = 118; y <= 128; y++) for (let x = 88; x <= 252; x++) R.pset(x, y, f_ldT(M, 0.62 + (y === 118 ? 0.35 : 0) + (y >= 126 ? -0.25 : 0) + Math.sin(x * 0.08 + y * 0.9) * 0.05, x, y));
  for (let y = 129; y <= 169; y++) for (let x = 92; x <= 248; x++) { const p = (x - 92) % 52, b = Math.min(p, 52 - p, y - 129, 170 - y); R.pset(x, y, f_ldT(M, 0.42 + (b > 4 && b < 6 ? -0.15 : b >= 6 ? 0.08 : 0) + (x > 244 ? -0.15 : 0) + Math.sin(y * 0.3 + x * 0.05) * 0.04, x, y)); }
  for (const x of [92, 244]) R.rect(x, 166, x + 4, 169, M[0]);
  // los montones de carpetas, la bandeja con papeles, la lámpara verde y el teléfono
  for (let k = 0; k < 7; k++) { const y = 117 - k * 3, dx = Math.round(Math.sin(k * 1.7) * 2); R.rect(96 + dx, y - 2, 128 + dx, y, [hex('#c8a060'), hex('#8aa0c0'), hex('#d0b070'), hex('#a8c090'), hex('#c8a060'), hex('#e0c890'), hex('#8aa0c0')][k]); R.rect(96 + dx, y, 128 + dx, y, f_ldMez(f_LDC.k, M[3], 0.4)); R.rect(124 + dx, y - 3, 127 + dx, y - 2, f_LDC.rojo); }
  R.rect(220, 112, 246, 117, f_LDC.metal[1]); R.rect(221, 110, 245, 112, f_LDC.blanco[4]); R.rect(222, 108, 244, 109, f_LDC.blanco[3]);
  R.rect(132, 113, 146, 117, f_LDC.k); R.rect(133, 111, 145, 113, hex('#2a2a2a')); R.rect(134, 110, 136, 111, f_LDC.k); R.rect(142, 110, 144, 111, f_LDC.k);
  // la carpeta que se queda a medio cerrar (o.carpeta): la tapa que sube y baja sin cerrarse
  const ca = Math.max(0, Math.min(1, o.carpeta ?? 0)), tapa = Math.round(2 + Math.sin(ca * Math.PI) * 10 + (ca > 0 && ca < 1 ? Math.sin(t * 5) : 0));
  R.rect(150, 115, 176, 117, hex('#d8b878')); R.rect(152, 113, 174, 114, f_LDC.blanco[4]);
  R.poligono([[150, 115], [176, 115], [176, 115 - tapa], [150, 115 - tapa + 1]], hex('#e8c888')); R.linea(150, 115 - tapa + 1, 176, 115 - tapa, hex('#b08a50'));
  // el SELLO en su soporte de palanca: la base, el poste, el brazo y el sello que baja un poco, duda y vuelve a subir
  const se = Math.max(0, Math.min(1, o.sello ?? 0)), duda = se > 0.35 && se < 0.65 ? Math.round(Math.sin(t * 22)) : 0, baja = Math.round(Math.sin(se * Math.PI) * 9) + duda;
  R.rect(196, 114, 214, 117, f_LDC.metal[0]); R.rect(196, 114, 214, 114, f_LDC.metal[3]); R.rect(206, 82, 208, 114, f_LDC.metal[2]); R.pset(206, 82, f_LDC.metal[4]);
  const ys = 92 + baja; R.linea(207, 84, 188, ys - 6, f_LDC.metal[1]); R.linea(207, 85, 188, ys - 5, f_LDC.metal[3]); R.disco(207, 84, 2, f_LDC.k);
  R.rect(185, ys - 8, 191, ys - 2, hex('#7a4a24')); R.rect(185, ys - 8, 186, ys - 2, hex('#a86a34')); R.disco(188, ys - 10, 3, hex('#7a4a24')); R.pset(187, ys - 11, hex('#c88a50')); R.rect(183, ys - 1, 193, ys + 1, f_LDC.k); R.rect(184, ys + 2, 192, ys + 2, hex('#3a2a6a'));
  R.rect(180, 115, 198, 117, f_LDC.blanco[4]); R.rect(182, 116, 196, 116, f_LDC.blanco[2]); R.rect(176, 113, 182, 117, hex('#3a2a6a'));
  return { sello: [188, ys + 10] };
}

function f_ldCalendario(R, t, o, q) {
  f_ldCapa(R, 'calendario', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, f_ldT(f_ldH(['#a89a7a', '#c4b896', '#d8cea8', '#e6dcb8', '#efe8cc']), 0.62 + (h(x >> 2, y >> 2, 158) - 0.5) * 0.12 + (h(x, y, 159) - 0.5) * 0.06, x, y));
    // la balda con el sello en su soporte, a la derecha, y un enchufe
    R.rect(240, 146, 312, 149, f_LDC.madera[4]); R.rect(240, 149, 312, 151, f_LDC.madera[1]); R.linea(250, 151, 256, 160, f_LDC.metal[1]); R.linea(302, 151, 296, 160, f_LDC.metal[1]);
    R.rect(20, 150, 30, 162, f_LDC.blanco[3]); R.rect(23, 154, 24, 157, f_LDC.k); R.rect(26, 154, 27, 157, f_LDC.k);
    // el zócalo de madera con su moldura, una grieta del yeso, la foto enmarcada del valle (nuestra) y una hoja de avisos
    // clavada con chinchetas (rayas, sin letras)
    for (let y = 164; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 164 ? f_LDC.madera[5] : y === 165 ? f_LDC.madera[2] : f_ldT(f_LDC.madera, 0.5 + Math.sin(x * 0.09 + Math.sin(y * 0.7 + x * 0.01) * 2) * 0.08 + (h(x >> 3, y, 162) - 0.5) * 0.1 - (x % 64 === 0 ? 0.3 : 0), x, y));
    for (let x = 0; x < 320; x++) R.pset(x, 166, f_ldMez(R.pget(x, 166), f_LDC.k, 0.3));
    { let gx = 42, gy = 30; for (let i = 0; i < 40; i++) { gx += h(i, 1, 163) > 0.5 ? 1 : 0; gy += 1; R.pset(gx, gy, hex('#8a7c60')); if (i % 7 === 3) R.pset(gx - 1, gy + 1, hex('#8a7c60')); } }
    R.rect(12, 78, 50, 108, hex('#4a3020')); R.rect(13, 79, 49, 107, f_LDC.madera[4]); R.rect(14, 80, 48, 106, f_LDC.madera[2]); R.rect(16, 82, 46, 104, f_LDC.blanco[3]);
    for (let y = 84; y <= 102; y++) for (let x = 18; x <= 44; x++) R.pset(x, y, y < 92 ? f_ldT(f_LDC.cieloDia, (y - 84) / 9, x, y) : f_ldT(f_LDC.lejos, 0.5 + (h(x, y, 164) - 0.5) * 0.3 + (y - 92) * 0.04, x, y));
    for (let x = 18; x <= 44; x++) { const yt = 90 - Math.max(0, 6 - Math.abs(x - 30) * 0.5) + (x > 36 ? 1 : 0); for (let y = Math.round(yt); y < 94; y++) R.pset(x, y, f_LDC.lejos[1 + ((y + 1) % 3 === 0 ? 1 : 0)]); }
    R.rect(28, 98, 32, 100, f_LDC.lona[1]); R.linea(31, 74, 25, 78, hex('#5a4a3a')); R.linea(31, 74, 37, 78, hex('#5a4a3a')); R.pset(31, 73, f_LDC.metal[3]);
    R.rect(238, 54, 258, 78, hex('#a89a7a')); R.rect(236, 52, 256, 76, f_LDC.papel[3]); R.rect(236, 52, 256, 52, f_LDC.papel[4]);
    for (let j = 0; j < 6; j++) R.linea(239, 57 + j * 3, 239 + 6 + Math.round(h(j, 0, 165) * 9), 57 + j * 3, j === 0 ? f_LDC.rojo : f_LDC.papel[0]);
    R.rect(247, 70, 253, 74, f_LDC.papel[1]); R.disco(238, 54, 1, f_LDC.rojo); R.disco(254, 54, 1, hex('#3a6ad8'));
    // el calendario: la sombra, la hoja, la cabecera roja con 2026 y la hoja seca (noviembre, sin el nombre)
    R.rect(68, 28, 232, 172, hex('#7a6a50'));
    for (let y = 24; y <= 168; y++) for (let x = 64; x <= 228; x++) R.pset(x, y, f_ldT(f_LDC.papel, 0.92 + (h(x, y, 160) - 0.5) * 0.04, x, y));
    for (let y = 24; y <= 60; y++) for (let x = 64; x <= 228; x++) R.pset(x, y, f_ldT(f_ldH(['#8a1e16', '#b42a20', '#d84030']), 0.6 + (y < 27 ? 0.3 : 0), x, y));
    for (let k = 0; k < 9; k++) { R.disco(76 + k * 18, 24, 2, f_LDC.metal[3]); R.pset(76 + k * 18, 23, f_LDC.metal[4]); }
    R.numero('2026', 96, 52, { tam: 16, color: f_LDC.blanco[4] });
    const H = ['....##..', '...####.', '..#####.', '.####.#.', '.###.##.', '..#.##..', '.#......', '#.......'];
    H.forEach((f, j) => { for (let i = 0; i < 8; i++) if (f[i] === '#') R.rect(196 + i * 2, 32 + j * 2, 197 + i * 2, 33 + j * 2, hex('#e0a040')); });
    for (let i = 0; i < 6; i++) R.rect(200 + i * 2, 36 + i * 2, 201 + i * 2, 37 + i * 2, hex('#8a5a20'));
    for (let i = 0; i <= 7; i++) R.linea(66 + i * 22, 64, 66 + i * 22, 164, f_LDC.papel[0]);
    for (let j = 0; j <= 5; j++) R.linea(66, 64 + j * 20, 220, 64 + j * 20, f_LDC.papel[0]);
    for (let d = 1; d <= 30; d++) { const k = d - 1, c = k % 7, r = Math.floor(k / 7); R.numero(String(d), 68 + c * 22, 72 + r * 20, { fina: true, color: c === 0 ? f_LDC.rojo : f_LDC.k, sombra: false }); }
    return null;
  });
  // la luz de la ventana (fuera de cuadro, a la izquierda) en la pared, con la sombra del ventilador del techo que gira
  // y una mosca que da vueltas
  { const an = t * 5; for (let y = 60; y <= 150; y++) { const x0 = Math.round(2 + (y - 60) * 0.2), x1 = Math.min(60, x0 + 44);
      for (let x = x0; x <= x1; x++) { if (f_ldU(x, y) > 0.55) continue; const dx = x - 34, dy = (y - 98) * 1.3, a2 = Math.atan2(dy, dx) - an, aspa = Math.cos(a2 * 3) > 0.72 && Math.hypot(dx, dy) > 4;
        R.pset(x, y, f_ldMez(R.pget(x, y), aspa ? hex('#9a8a68') : hex('#fff6dc'), aspa ? 0.25 : 0.32)); } }
    const mx = Math.round(46 + Math.cos(t * 1.7) * 14 + Math.sin(t * 4.3) * 3), my = Math.round(140 + Math.sin(t * 2.3) * 8); R.pset(mx, my, f_LDC.k); R.pset(mx + (Math.floor(t * 20) % 2 ? 1 : -1), my - 1, f_LDC.blanco[2]); }
  const hoy = Math.max(1, Math.min(30, Math.round(o.hoy ?? 20))), di = Math.max(0, Math.min(1, o.dias ?? 1)), hasta = Math.floor(di * (hoy - 1) + 1e-6);
  const celda = (d) => { const k = d - 1; return [66 + (k % 7) * 22, 64 + Math.floor(k / 7) * 20]; };
  for (let d = 1; d <= hasta; d++) { const [x, y] = celda(d), n = d === hasta && di < 1 ? Math.min(1, ((di * (hoy - 1)) % 1) * 3 + 0.4) : 1; for (let i = 3; i <= Math.round(3 + 15 * n); i++) { R.pset(x + i, y + 2 + Math.round(i * 0.9), f_LDC.rojo); R.pset(x + i + 1, y + 2 + Math.round(i * 0.9), f_LDC.rojo); R.pset(x + 21 - i, y + 2 + Math.round(i * 0.9), f_LDC.rojo); R.pset(x + 20 - i, y + 2 + Math.round(i * 0.9), f_LDC.rojo); } }
  const [hx, hy] = celda(hoy); const pul = Math.sin(t * 4) > 0 ? 1 : 0;
  for (let a = 0; a < 6.28; a += 0.08) R.pset(hx + 11 + Math.round(Math.cos(a) * (11 + pul)), hy + 10 + Math.round(Math.sin(a) * (9 + pul)), f_LDC.rojo);
  // la hojita que cae cada vez que se tacha un día
  if (di > 0 && di < 1) { const u = (di * (hoy - 1)) % 1, x = Math.round(150 + Math.sin(u * 9) * 14), y = Math.round(40 + u * 130); R.rect(x, y, x + 8, y + 5, f_LDC.papel[3]); R.rect(x, y + 5, x + 8, y + 5, f_LDC.papel[1]); }
  // el sello que sigue esperando, en su soporte sobre la balda
  const b = Math.round(Math.sin(t * 1.3) * 1);
  R.rect(262, 141, 286, 145, f_LDC.metal[0]); R.rect(262, 141, 286, 141, f_LDC.metal[3]); R.rect(282, 96, 285, 141, f_LDC.metal[2]);
  R.linea(283, 98, 266, 108 + b, f_LDC.metal[1]); R.rect(260, 108 + b, 272, 122 + b, hex('#7a4a24')); R.rect(260, 108 + b, 262, 122 + b, hex('#a86a34')); R.disco(266, 105 + b, 5, hex('#7a4a24')); R.rect(257, 123 + b, 275, 126 + b, f_LDC.k); R.rect(258, 127 + b, 274, 127 + b, hex('#3a2a6a'));
  return { dia: [hx + 11, hy + 10] };
}
// cada encuadre: [la vista general, la de su segunda cámara]; y lo de delante de los personajes
const f_LD_VISTAS = {
  ladera: [f_ldLadera, f_ldCarrito], corte: [f_ldCorte, f_ldMancha], trazo: [f_ldTrazo, f_ldPosibles], este: [f_ldEste, f_ldRadargrama],
  gravedad: [f_ldGravedad, f_ldFlechas], gravimetro: [f_ldGravimetro, f_ldMuelle], mapa: [f_ldMapa, f_ldEsquinas], cortes: [f_ldCortes, f_ldAguja],
  perforadora: [f_ldPerforadora, f_ldCamarita], permiso: [f_ldPermiso, f_ldCalendario], luces: [f_ldLuces, f_ldCerca],
};

const f_LD_DELANTE = { 'ladera|general': f_ldLaderaDelante, 'gravimetro|general': f_ldGravimetroDelante, 'perforadora|general': f_ldPerforadoraDelante, 'permiso|general': f_ldPermisoDelante };

// el encuadre y la cámara que piden las opciones (un encuadre que no existe cae en el primero; una cámara que no es
// la suya, en 'general')
function g_hyVista(o) { const enc = V_HOY[o.encuadre] ? o.encuadre : Object.keys(V_HOY)[0], e = V_HOY[enc]; return [enc, o.camara === e.cam ? e.cam : 'general']; }

// la paleta de lo nuevo: el ocre, el azul, el rojo y el verde apagados del papel egipcio, la pizarra blanca y su marco
// de aluminio, los rotuladores, el cartón de la caja (con sus oscuros de dentro), la luz de la tarde, la escayola y la manzana
const g_hyE = pal({
  ocreA: '#c9965c', ocreAS: '#a87a48', azulA: '#8494aa', azulAS: '#64748c', rojoA: '#b9765c', verdeA: '#86a07c',
  pb: '#f8f7f2', pbS: '#e6e5de', pbD: '#c9c8c0', alu: '#b4bcc6', aluS: '#808a98', aluL: '#e8ecf0', aluD: '#565e6c',
  rotN: '#23232e', rotA: '#2c58c4', rotR: '#d2343a', rotV: '#22984a', fieltro: '#9aa0a8',
  carton: '#c89a62', cartonS: '#a07444', cartonL: '#e0b87e', cartonD: '#7a5432', cartonN: '#4a3018', cartonNN: '#24170b', cinta: '#d9bf86',
  tarde: '#ff9a50', tardeL: '#ffd29a', tarde0: '#f7a25a', tarde1: '#f8b870', tarde2: '#f9cc8a', tarde3: '#f6dca4', tarde4: '#e8a0a0', tarde5: '#c890b4',
  escayola: '#f2eee4', escayolaS: '#cfc8b8', manzana: '#d8302a', manzanaS: '#951c18', manzanaL: '#f47864',
});

// los motivos del papel egipcio (11 × 11, rellenos, «de casa», no de tumba, en colores apagados): una palmerita (V verde, m ocre),
// un ojo pequeño (ceja, ojo con su blanco w y su iris, la espiral y la lágrima; a azul), un escarabajo azul con su sol
// rojo (r) y un loto azul con su tallo verde
const G_HYMOT = [
  ['..VVv.vVV..', '.VvvVvVvvV.', 'VV..VVV..VV', 'V..vVmVv..V', '...V.m.V...', '.....m.....', '.....M.....', '.....m.....', '.....M.....', '....mMm....', '..MmmMmmM..'],
  ['...........', '..aaaaaaa..', '.a.......a.', '...aaaaa...', '..awwaawa..', '.awwaaaawa.', '..awwaawa..', '...aaaaa...', '.....a..a..', '.....a.aa..', '...........'],
  ['....rrr....', '...rrrrr...', '.m..rrr..m.', '..m.AAA.m..', '...AaAaA...', 'mmAAaAaAAmm', '..AaAAAaA..', 'mmAaAaAaAmm', '..AAaAaAA..', '...AAAAA...', '.m.m...m.m.'],
  ['.....A.....', '..A..A..A..', '..AA.A.AA..', 'A.AAAaAAA.A', 'AAAAAaAAAAA', '.AAAAaAAAA.', '..AAAAAAA..', '....VVV....', '.....V.....', '...V.V.....', '....VV.....'],
];

// un motivo (de 7 × 7 o 9 × 9) a escala e con su esquina en (x, y), recortado a [x0, x1]
function g_hyMotivo(R, g, x, y, e, P, x0 = 0, x1 = 319) {
  for (let j = 0; j < g.length; j++) for (let i = 0; i < g[j].length; i++) { const c = P[g[j][i]]; if (c == null) continue; for (let b = 0; b < e; b++) for (let a = 0; a < e; a++) { const px = x + i * e + a; if (px >= x0 && px <= x1) R.pset(px, y + j * e + b, c); } }
}

// EL PAPEL PINTADO EGIPCIO en [x0, x1] × [y0, y1] a escala e: fondo arena con una red de rombos punteada y, en el centro
// de cada rombo, un motivo (palmerita, ojo, escarabajo, loto, por turnos). Donde calma(x, y) es cierto (la esquina de
// Atom, el año, alrededor del punto del estetoscopio) solo queda el rayado fino tono sobre tono
function g_hyPapelEg(R, x0, y0, x1, y1, e = 1, calma = null) {
  const K = g_hyK, E = g_hyE, P = g_hyPalMot(), p = 16 * e;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const tq = calma && calma(x, y), d1 = (((x - y) % p) + p) % p, d2 = (x + y) % p; let c = K.pared;
    if (!tq && (d1 === 0 || d2 === 0) && ((Math.floor(x / e)) & 1)) c = K.paredS;
    else if (x % (8 * e) === 4 * e && y % 3 === 0) c = K.paredL;
    else if (h(x, y, 31) < 0.04) c = K.paredL;
    R.pset(x, y, c);
  }
  for (let cy = y0 - (y0 % (p / 2)); cy <= y1 + p; cy += p / 2) for (let cx = (cy / (p / 2)) & 1 ? 0 : p / 2; cx <= x1 + p; cx += p) {
    const ax = cx - Math.floor(11 * e / 2), ay = cy - Math.floor(11 * e / 2), bx = ax + 11 * e - 1, by = ay + 11 * e - 1;
    if (ay < y0 || by > y1 || bx < x0 || ax > x1) continue;
    if (calma && (calma(ax, ay) || calma(bx, ay) || calma(ax, by) || calma(bx, by) || calma(cx, cy))) continue;
    const i = Math.round(cx / (p / 2)), j = Math.round(cy / (p / 2)); g_hyMotivo(R, G_HYMOT[((Math.floor(i / 2) + j * 3) % 4 + 4) % 4], ax, ay, e, P, x0, x1);
  }
}

// EL GATO DE ESCAYOLA, sentado y de perfil (mira a la izquierda), sin ojos: orejas, cuello, el cuerpo de pera, la
// pata de delante y la cola enroscada; (x, base) el centro de su base
const G_HYGATOE = ['.k.k......', 'kwkwk.....', 'kwwwk.....', 'kwwwwk....', '.kwwk.....', '.kwwwk....', 'kwwwwwk...', 'kwwwwwsk..', 'kwkwwwsk..', 'kwkwwwskkk', 'kwkwwwsksk', 'kwkwwssk.k', 'kkkkkkkkkk'];

function g_hyGatoEscayola(R, x, base) { const E = g_hyE, P = { k: g_hyK.k, w: E.escayola, s: E.escayolaS }; G_HYGATOE.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = P[f[i]]; if (c != null) R.pset(x - 5 + i, base - G_HYGATOE.length + 1 + j, c); } }); }

// los colores de los motivos
const g_hyPalMot = () => { const K = g_hyK, E = g_hyE; return { A: hex('#8a9abc'), a: hex('#6a7aa0'), m: E.ocreA, M: E.ocreAS, V: hex('#7aa66a'), v: hex('#557e4c'), r: E.rojoA, w: hex('#f7ecd6') }; };

// la cenefa de rayas de colores bajo la moldura (azul, rojo y verde apagados, e px cada una) desde y; llega hasta x1 y
// se corta antes de la esquina de Atom
function g_hyRayas(R, y, e = 1, x1 = 255) {
  const E = g_hyE; [E.azulA, E.rojoA, E.verdeA].forEach((c, k) => { for (let b = 0; b < e; b++) for (let x = 0; x <= x1; x++) R.pset(x, y + k * e + b, (x === x1 && k !== 1) ? g_hyK.paredS : c); });
}

// el escarabajo pequeño de la greca (7 × 7)
const G_HYESC7 = ['.m...m.', '..mAm..', '.mAAAm.', 'mAaAaAm', '.mAaAm.', '.mAAAm.', '.m.m.m.'];

// LA GRECA DE ESCARABAJOS sobre el friso (11 × e px de alto desde y0): un filete azul y otro rojo arriba, uno verde y
// otro azul abajo, y en medio escarabajos que se turnan con soles pequeños
function g_hyGreca(R, y0, e = 1, x0 = 0, x1 = 319) {
  const K = g_hyK, E = g_hyE, P = g_hyPalMot();
  for (let y = y0; y < y0 + 11 * e; y++) { const j = Math.floor((y - y0) / e); for (let x = x0; x <= x1; x++) R.pset(x, y, j === 0 || j === 10 ? E.azulAS : j === 1 ? E.rojoA : j === 9 ? E.verdeA : (x + y) % 7 === 0 ? K.pared : K.paredL); }
  for (let k = 0, x = x0 + 2 * e; x + 7 * e <= x1; x += 12 * e, k++) {
    if (k & 1) { const cx = x + 3 * e + (e >> 1), cy = y0 + 5 * e + (e >> 1); R.disco(cx, cy, 2 * e, E.rojoA); R.disco(cx, cy, e, E.ocreA); R.pset(cx - 3 * e, cy, E.azulA); R.pset(cx + 3 * e, cy, E.azulA); }
    else g_hyMotivo(R, G_HYESC7, x, y0 + 2 * e, e, P, x0, x1);
  }
}

// LAS LÁMINAS ENMARCADAS (nuestras): 'piramides' (dos pirámides al atardecer con un sol y una palmera) y 'falucca' (el
// río con una barca de vela y palmeras en la orilla). Se pintan una vez en una tabla de w × h colores (0 = nada) para
// poder torcerlas y hacerlas saltar con el golpe
const g_hyLaminas = new Map();

function g_hyLamina(tipo, w, hh) {
  const k = tipo + w + 'x' + hh; if (g_hyLaminas.has(k)) return g_hyLaminas.get(k);
  const K = g_hyK, E = g_hyE, A = new Uint32Array(w * hh), P = (x, y, c) => { if (x >= 0 && x < w && y >= 0 && y < hh) A[y * w + x] = c; };
  for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) {
    let c; const bx = Math.min(x, w - 1 - x), by = Math.min(y, hh - 1 - y), b = Math.min(bx, by);
    if (b === 0) c = K.k; else if (b === 1) c = y === 1 || x === 1 ? K.nogalB : K.nogalS; else if (b === 2) c = K.nogal; else if (b === 3) c = K.papel;
    else { const u = (y - 4) / (hh - 8), xi = x - 4, W = w - 8;
      if (tipo === 'piramides') { const ar = 0.62 + Math.sin(xi * 0.4) * 0.02;
        if (u > ar) c = (x + y) % 5 === 0 ? K.oroS : u > 0.8 ? E.ocreA : K.oro;
        else { c = u < 0.25 ? E.tarde4 : u < 0.45 ? E.tarde1 : E.tarde2; if (g_hyB4(x, y) < 0.3 && u > 0.2 && u < 0.3) c = E.tarde1;
          const p1 = Math.abs(xi - W * 0.38) / (W * 0.24), p2 = Math.abs(xi - W * 0.7) / (W * 0.17), t1 = ar - (1 - p1) * 0.5, t2 = ar - (1 - p2) * 0.34;
          if (p1 < 1 && u > t1) c = xi < W * 0.38 ? K.oro : K.oroS; if (p2 < 1 && u > t2) c = xi < W * 0.7 ? K.oro : K.oroS;
          if (Math.hypot(xi - W * 0.84, (u - 0.3) * (hh - 8)) < 3) c = K.oroL; } }
      else { const ar = 0.46;
        if (u < ar) c = u < 0.2 ? K.cielo2 : u < 0.36 ? K.cielo3 : K.cielo4; else if (u < ar + 0.1) c = (x & 1) ? K.hojaS : K.hoja; else c = (x + y * 2) % 7 === 0 ? K.cielo4 : u > 0.82 ? K.cielo1 : K.cielo2; } }
    A[y * w + x] = c;
  }
  if (tipo === 'piramides') { const px = 7, py = hh - 6; for (let j = 0; j < 9; j++) P(px, py - j, K.troncoS); for (const [dx, dy] of [[-3, -9], [-2, -10], [-1, -10], [1, -10], [2, -10], [3, -9], [-4, -8], [4, -8], [0, -11]]) P(px + dx, py + dy, K.hojaS); }
  else { const by = Math.round(4 + (hh - 8) * 0.68), bx = Math.round(w * 0.5); for (let i = -6; i <= 6; i++) P(bx + i, by, K.nogal); for (let i = -5; i <= 5; i++) P(bx + i, by + 1, K.nogalS);
    for (let j = 1; j <= 11; j++) { P(bx, by - j, K.nogalS); for (let i = 1; i <= Math.round(j * 0.55); i++) P(bx + i, by - j, i === Math.round(j * 0.55) ? K.papelS : K.blanco); } P(bx - 1, by - 11, K.nogalS);
    for (const [px, a] of [[7, 9], [w - 9, 11], [w - 14, 7]]) { const py = Math.round(4 + (hh - 8) * 0.5); for (let j = 0; j < a; j++) P(px + (j > a - 3 ? 1 : 0), py - j, K.troncoS); for (const [dx, dy] of [[-3, -1], [-2, -2], [-1, -2], [1, -2], [2, -2], [3, -1], [0, -3]]) P(px + dx, py - a + dy, K.hojaS); } }
  g_hyLaminas.set(k, A); return A;
}

// pega una lámina (tabla w × hh) girada ang radianes alrededor de (cx, cy), con su sombra, su alambre y su clavo
function g_hyCuelga(R, A, w, hh, cx, cy, ang = 0) {
  const K = g_hyK, co = Math.cos(ang), si = Math.sin(ang), rr = Math.ceil(Math.hypot(w, hh) / 2) + 1, ny = Math.round(cy - hh / 2 - 6);
  const esq = (sx, sy) => [Math.round(cx + sx * co - sy * si), Math.round(cy + sx * si + sy * co)];
  const [ax, ay] = esq(-w / 2 + 4, -hh / 2), [bx, by] = esq(w / 2 - 4, -hh / 2); R.linea(cx, ny, ax, ay, K.k); R.linea(cx, ny, bx, by, K.k); R.pset(cx, ny, K.metalL); R.pset(cx, ny - 1, K.metalS);
  const src = (x, y) => { const dx = x - cx, dy = y - cy, sx = Math.round(dx * co + dy * si + w / 2 - 0.5), sy = Math.round(-dx * si + dy * co + hh / 2 - 0.5); return sx >= 0 && sx < w && sy >= 0 && sy < hh ? A[sy * w + sx] : 0; };
  for (let y = cy - rr; y <= cy + rr + 2; y++) for (let x = cx - rr; x <= cx + rr + 2; x++) if (!src(x, y) && src(x - 1, y - 2)) g_hyTinta(R, x, y, K.k, 0.28);
  for (let y = cy - rr; y <= cy + rr; y++) for (let x = cx - rr; x <= cx + rr; x++) { const c = src(x, y); if (c) R.pset(x, y, c); }
}

// EL GOLPE DESDE EL OTRO LADO (g 0–1: tres toques, en 0,05, 0,35 y 0,65): en cada toque la pared tiembla en la zona
// [x0, y0, x1, y1] (las filas se corren un píxel), salen anillos punteados desde (cx, cy) y cuatro rayitas de impacto,
// y cae una pizca de polvo desde ytecho. Devuelve la fuerza del toque en curso (0–1, para el saltito de la lámina)
const G_HYTOCS = [0.05, 0.35, 0.65];

function g_hyGolpe(R, t, g, cx, cy, zona, ytecho, e = 1) {
  const K = g_hyK, E = g_hyE; let fuerza = 0, activo = false;
  for (const g0 of G_HYTOCS) { const u = (g - g0) / 0.3; if (u < 0 || u >= 1) continue; activo = true; fuerza = Math.max(fuerza, u < 0.35 ? Math.sin(u / 0.35 * Math.PI) : 0);
    if (u < 0.3) { const [x0, y0, x1, y1] = zona, a = Math.round(Math.sin(u * 70) * (1 - u / 0.3) * 1.6);
      if (a) for (let y = y0; y <= y1; y++) { const s = ((y >> 1) & 1) ? a : -a, fila = []; for (let x = x0; x <= x1; x++) fila.push(R.pget(x, y)); for (let x = x0; x <= x1; x++) { const i = x - x0 - s; if (i >= 0 && i < fila.length) R.pset(x, y, fila[i]); } } }
    for (const [dr, c] of [[0, hex('#7a5430')], [-5 * e, E.ocreAS], [-10 * e, K.paredS]]) { const r = 4 * e + u * 30 * e + dr; if (r < 3) continue;
      for (let an = 0; an < Math.PI * 2; an += 0.7 / r) { const x = Math.round(cx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r * 0.9); if (g_hyB4(x, y) < (1 - u) * 1.1) { R.pset(x, y, c); if (dr === 0) R.pset(x + 1, y, c); } } }
    if (u < 0.45) for (let k = 0; k < 4; k++) { const an = -2.4 + k * 1.6 + (k > 1 ? 0.3 : 0), r0 = (6 + u * 10) * e, r1 = r0 + 4 * e; R.linea(Math.round(cx + Math.cos(an) * r0), Math.round(cy + Math.sin(an) * r0), Math.round(cx + Math.cos(an) * r1), Math.round(cy + Math.sin(an) * r1), hex('#6a4426')); } }
  if (activo) for (let k = 0; k < 9; k++) { const y = ytecho + ((t * (16 + k % 3 * 5) + h(k, 4, 120) * 60) % 64) * e * 0.6, x = cx - 12 * e + h(k, 5, 120) * 24 * e + Math.sin(t * 3 + k) * 2; R.pset(Math.round(x), Math.round(y), k % 2 ? K.paredL : K.papelS); }
  return fuerza;
}

// lo torcida que queda la lámina con el golpe g: un poco más con cada toque y un bamboleo en cada uno
const g_hyTuerce = (g) => { let a = 0; for (const g0 of G_HYTOCS) { const u = (g - g0) / 0.3; if (u < 0) continue; a -= 0.045; if (u < 0.7) a += Math.sin(u * 22) * 0.05 * (1 - u / 0.7); } return a; };

// EL ESTUDIO DE ATOM (general, encuadre 'estudio'): lo de jm (vista del parque, reloj, globo, gato, polilla, motas,
// lámpara) con la lámina de las pirámides, el estetoscopio colgado y el golpe
function g_hyEstudio(R, t, o = {}) {
  const K = g_hyK, { pset, linea, disco } = R, V = G_HYEST.ventana, ll = o.lluvia === true ? 1 : g_hyCl(o.lluvia || 0), g = g_hyCl(o.golpe || 0);
  g_hyVistaParque(R, t, ...V, ll);
  g_hyPegar(R, g_hyCapa(R, 'estudio', () => g_hyEstudioFijo(R)));
  if (ll > 0) {
    for (let k = 0; k < Math.round(ll * 9); k++) { const x = 180 + Math.round(h(k, 1, 76) * 68), v = 5 + h(k, 2, 76) * 9, y = 33 + ((h(k, 3, 76) * 64 + t * v) % 64), yy = Math.round(y); if ((x >= 213 && x <= 215) || (yy >= 60 && yy <= 62)) continue; pset(x, yy, K.blanco); pset(x, yy + 1, K.cristal); for (let j = 2; j < 7; j += 2) if (yy - j > 32 && yy - j !== 61) pset(x, yy - j, K.gris5); }
  } else {
    const u = ((t * 0.1) % 1) * 110 - 20; for (let j = 0; j < 67; j++) for (const d of [0, 8]) { const x = Math.round(178 + u + d - j * 0.5), y = 32 + j; if (x >= 178 && x <= 250 && (x < 213 || x > 215) && (y < 60 || y > 62) && (j + d) % 3 === 0) pset(x, y, hex('#eef6fa')); }
  }
  if (ll < 1) for (let y = 155; y <= 179; y++) { const u = (y - 155) / 24, xa = Math.round(204 - u * 40), xb = Math.round(264 - u * 30); for (let x = xa; x <= xb; x++) { const v = (x - xa) / (xb - xa); if (Math.abs(v - 0.5) < 0.03 || Math.abs(u - 0.45) < 0.04) continue; if (ll > 0 && g_hyB4(x, y) < ll) continue; g_hyTinta(R, x, y, K.solL, 0.42); } }
  { const cx = 146, cy = 50, as = Math.floor(t) * Math.PI / 30, am = t * 0.02 + 0.6, ah = 4.1; linea(cx, cy, cx + Math.round(Math.sin(ah) * 3), cy - Math.round(Math.cos(ah) * 3), K.k); linea(cx, cy, cx + Math.round(Math.sin(am) * 4), cy - Math.round(Math.cos(am) * 4), K.k); linea(cx, cy, cx + Math.round(Math.sin(as) * 5), cy - Math.round(Math.cos(as) * 5), K.rojo); pset(cx, cy, K.oro);
    const p = Math.sin(t * Math.PI), px = Math.round(146 + p * 2); linea(146, 62, px, 75, K.oroS); disco(px, 77, 2, K.oro); pset(px - 1, 76, K.oroL); }
  if (Math.sin(t * 1.3) > -0.2) { pset(270, 98, K.luz); pset(269, 99, K.luz); pset(271, 99, K.luz); }
  for (let k = 0; k < 3; k++) if (Math.sin(t * 2 + k * 2.1) > 0.6) pset(8 + k * 10, 30 + (k % 2) * 3, K.hojaL);
  { const gg = t * 1.6; for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { if (i * i + j * j > 17) continue; const lon = i * (1 + (j * j) * 0.04) + gg, tierra = Math.sin(lon * 0.75 + j * 0.9) + Math.sin(lon * 0.33 - j * 0.5) > 0.55; pset(49 + i, 48 + j, tierra ? (i + j < -1 ? K.hojaL : K.hoja) : i + j < -3 ? K.cielo3 : i + j > 4 ? K.azulS : K.azul); }
    linea(44, 44, 54, 52, K.oro); pset(47, 45, K.blanco);
    g_hyDestello(R, 26, 88, ((t * 0.3) % 1) * 2.4, K.oroL); }
  const LM = [[13, 44], [36, 66], [51, 88], [28, 110], [42, 131]], n = Math.floor(t * 0.6) % LM.length; g_hyDestello(R, LM[n][0], LM[n][1], (t * 0.6) % 1 * 1.6, K.oroL);
  // el golpe desde el otro lado (en la pared, a la derecha del estetoscopio), y la lámina de las pirámides, que se tuerce
  const [tx, ty] = G_HYEST.toc, f = g > 0 ? g_hyGolpe(R, t, g, tx, ty, [78, 64, 114, 100], 26) : 0, [lx, ly] = G_HYEST.lamina;
  g_hyCuelga(R, g_hyLamina('piramides', 46, 26), 46, 26, lx, ly - Math.round(f * 2), g > 0 ? g_hyTuerce(g) : 0);
  // el estetoscopio, colgado de su clavo a la derecha de la librería (o.estetoscopio false: Atom lo tiene en la mano)
  if (o.estetoscopio !== false) { const [ex, ey] = G_HYEST.estetoscopio; pset(ex, ey - 22, K.metalL); pset(ex, ey - 21, K.metalS); PIEZAS_TU.estetoscopio?.(R, ex, ey + 1 + Math.round(Math.sin(t * 1.1) * 0.4 + f), {}); }
  g_hyPolilla(R, 270, 74, t, 9, 5, 3);
  if (o.gato !== false) g_hyGato(R, G_HYEST.gato[0], G_HYEST.gato[1], t, { dir: -1 });
  for (let k = 0; k < 7; k++) { const x = 190 + Math.round(h(k, 1, 77) * 56 + Math.sin(t * 0.5 + k) * 3), y = 106 + Math.round((h(k, 2, 77) * 44 + t * (1.5 + k % 3)) % 44); if (Math.sin(t * 1.4 + k * 1.9) > 0.3 && ll < 0.5) pset(x, y, K.solL); }
  return { toc: [tx, ty], lamina: [lx, ly], estetoscopio: G_HYEST.estetoscopio };
}

// DELANTE EN EL ESTUDIO: el escritorio de nogal (pila de libros con su manzana y flexo rojo, de jm) con el LIBRO DE
// EGIPTO abierto y la LUPA encima, la CAJA de cartón cerrada y la LINTERNA (o.caja false quita las dos); la luz del
// flexo, que parpadea un poco
function g_hyEstudioDelante(R, t, o = {}) {
  const K = g_hyK, E = g_hyE, { rect, pset, linea, disco } = R;
  g_hyPegar(R, g_hyCapa(R, 'estudioDelante', () => g_hyEstudioDelanteFijo(R)), 96, 170);
  // el libro de Egipto, abierto y tumbado (las páginas se abren en uve), con la lupa encima
  rect(122, 128, 152, 130, K.k); rect(123, 128, 151, 129, K.azulS); for (let i = 0; i < 14; i++) { const y = 127 - Math.round(Math.sin(i / 13 * Math.PI) * 2); pset(124 + i, y, K.papel); pset(150 - i, y, K.papel); pset(124 + i, y + 1, i % 3 ? K.papelS : E.ocreA); pset(150 - i, y + 1, i % 4 ? K.papelS : E.azulA); }
  pset(137, 128, K.papelD); pset(137, 127, K.papelD); linea(142, 124, 149, 121, K.k); disco(141, 125, 3, K.k); disco(141, 125, 2, K.cristal); pset(140, 124, K.blanco); linea(146, 122, 149, 121, K.nogalL);
  if (o.caja !== false) { PIEZAS_TU.caja?.(R, 165, 132, {}); PIEZAS_TU.linterna?.(R, 189, 131, { dir: -1 }); }
  { const pp = Math.sin(t * 9) > 0.96 ? 0.2 : 0.28; for (let y = 107; y <= 130; y++) { const u = (y - 107) / 23, xa = Math.round(193 - u * 37), xb = Math.round(202 - u * 11); for (let x = xa; x <= xb; x++) if (g_hyB4(x, y) < pp) g_hyTinta(R, x, y, K.luz, 0.5); } }
  return { mesa: [G_HYEST.mesa.x0, G_HYEST.mesa.y, G_HYEST.mesa.x1, G_HYEST.mesa.pie], caja: o.caja !== false ? [153, 108, 177, 131] : null, linterna: [189, 127] };
}

const G_HYPAR = { suelo: 160, punto: [150, 92], lamina: [68, 66], zona: [108, 52, 192, 128], enchufe: [214, 146], grieta: [118, 158] };

function g_hyParedFijo(R) {
  const K = g_hyK, E = g_hyE, { rect, pset, linea, disco } = R, [px, py] = G_HYPAR.punto;
  rect(0, 0, 319, 3, K.moldura); rect(0, 4, 319, 4, K.molduraS); rect(0, 5, 319, 5, K.nogalL); for (let x = 0; x < 320; x++) if (x % 24 === 7) pset(x, 2, K.molduraS);
  // debajo de la cenefa, papel tranquilo sin motivos: asoma por sus huecos, por la trama con que se deshace en la esquina
  // de Atom y donde las rayas no llegan
  g_hyPapelEg(R, 0, 6, 319, 33, 2, () => true);
  g_hyCenefa(R, 6, 2); g_hyRayas(R, 25, 2);
  g_hyPapelEg(R, 0, 31, 319, 111, 2, (x, y) => (x >= 256 && y <= 58) || y <= 33 || Math.hypot(x - px, y - py) < 17);
  g_hyGreca(R, 112, 2);
  // el friso de cuarterones a escala 2 y el rodapié, con la sombra del techo de la greca
  rect(0, 134, 319, 159, K.friso); rect(0, 134, 319, 135, K.frisoL); rect(0, 136, 319, 137, K.frisoD);
  for (let x = 6; x < 320; x += 56) { rect(x, 140, x + 46, 153, K.frisoS); rect(x, 140, x + 46, 140, K.frisoD); rect(x, 140, x, 153, K.frisoD); rect(x + 46, 141, x + 46, 153, K.frisoL); rect(x + 3, 143, x + 43, 151, K.friso); rect(x + 3, 143, x + 43, 143, K.frisoL); rect(x + 43, 144, x + 43, 151, K.frisoD);
    for (let y = 144; y < 151; y++) for (let i = 4; i < 43; i++) if (h((x + i) >> 2, y >> 1, 132) < 0.1) pset(x + i, y, K.frisoS); }
  rect(0, 154, 319, 159, K.frisoS); rect(0, 154, 319, 154, K.frisoL); rect(0, 159, 319, 159, K.frisoD);
  g_hyTarima(R, 160, 179, [160, 164, 170, 177]); for (let x = 0; x < 320; x++) { pset(x, 160, K.tarimaD); if (!(x & 1)) pset(x, 161, K.tarimaD); }
  // la grieta del yeso, que sube del rodapié por el friso, con su labio claro y unas migas en la tarima
  { let x = G_HYPAR.grieta[0], y = 158; while (y > 128) { const nx = x + Math.round((h(x, y, 133) - 0.45) * 4), ny = y - 3 - Math.round(h(y, x, 134) * 3); linea(x, y, nx, ny, K.frisoD); linea(x + 1, y, nx + 1, ny, K.frisoL); if (h(x, y, 135) < 0.4) linea(nx, ny, nx - 3, ny - 2, K.frisoD); x = nx; y = ny; } }
  for (const [x, y] of [[114, 162], [117, 163], [121, 162], [119, 165]]) pset(x, y, K.papelS);
  // el enchufe en el friso, con su cable que corre por el rodapié
  { const [ex, ey] = G_HYPAR.enchufe; rect(ex - 5, ey - 6, ex + 5, ey + 6, K.k); rect(ex - 4, ey - 5, ex + 4, ey + 5, E.escayola); rect(ex - 4, ey + 5, ex + 4, ey + 5, E.escayolaS); rect(ex + 4, ey - 5, ex + 4, ey + 5, E.escayolaS); disco(ex, ey, 3, E.escayolaS); pset(ex - 1, ey, K.k); pset(ex + 1, ey, K.k); pset(ex, ey - 4, K.metalS);
    rect(ex + 6, ey + 1, ex + 8, ey + 3, K.k); linea(ex + 8, ey + 2, ex + 14, ey + 12, K.k); rect(ex + 14, 157, 319, 157, K.k); rect(ex + 14, 156, 319, 156, K.metalD); }
  // la librería de la esquina, de canto (x 0–28): el costado de nogal, las baldas y los lomos de los libros en escorzo
  rect(0, 30, 30, 179, K.k); rect(0, 31, 17, 179, K.nogalD); rect(18, 31, 29, 179, K.nogal); rect(18, 31, 19, 179, K.nogalL); rect(28, 31, 29, 179, K.nogalS);
  for (let y = 33; y < 179; y++) for (let x = 20; x < 28; x++) if (h(x >> 1, y >> 3, 136) < 0.18) pset(x, y, K.nogalS);
  [56, 88, 120, 152].forEach((by, b) => { rect(0, by, 17, by + 3, K.nogalL); rect(0, by + 3, 17, by + 4, K.nogalS);
    for (let x = 0, n = 0; x < 16; n++) { const w = 2 + Math.floor(h(x, b, 137) * 2), a = 18 + Math.floor(h(x, b, 138) * 8); g_hyLomo(R, x, by - 1, w, Math.min(a, by - (b ? [56, 88, 120][b - 1] + 6 : 36)), [K.rojo, K.azul, K.oroS, K.friso, K.cortina, K.verdeS][(n + b) % 6], n); x += w; } });
  // la lámpara de techo apagada que asoma arriba a la derecha, no: la esquina de Atom queda en papel liso
}
// LA PARED DE CERCA (cámara 'pared'): la mancha de sol de la ventana con la sombra de sus barrotes y de las hojas de la
// palmera que se mecen, motas en la luz, la lámina de la barca que da un saltito con cada toque y el golpe
function g_hyPared(R, t, o = {}) {
  const K = g_hyK, g = g_hyCl(o.golpe || 0), [px, py] = G_HYPAR.punto;
  g_hyPegar(R, g_hyCapa(R, 'pared', () => g_hyParedFijo(R)));
  // la mancha de sol, inclinada, con dos barrotes y la sombra de las hojas
  for (let y = 40; y <= 132; y++) { const u = (y - 40) / 92, xa = Math.round(170 + u * 26), xb = Math.round(244 + u * 26); for (let x = xa; x <= xb; x++) { const v = (x - xa) / (xb - xa); if (Math.abs(v - 0.5) < 0.035 || Math.abs(u - 0.48) < 0.03) continue;
      const s = Math.sin(x * 0.12 + y * 0.05 + Math.sin(t * 0.9) * 0.9) + Math.sin(x * 0.07 - y * 0.11 + t * 0.6); if (s > 1.1 && v > 0.55) { if (g_hyB4(x, y) < 0.3) g_hyTinta(R, x, y, K.k, 0.1); continue; } if (g_hyB4(x, y) < (v < 0.05 || v > 0.95 ? 0.35 : 0.75)) g_hyTinta(R, x, y, hex('#fff6dc'), 0.5); } }
  for (let k = 0; k < 8; k++) { const x = 180 + Math.round(h(k, 1, 139) * 80 + Math.sin(t * 0.5 + k) * 3), y = 50 + Math.round((h(k, 2, 139) * 80 + t * (2 + k % 3)) % 80); if (Math.sin(t * 1.3 + k * 1.7) > 0.2) R.pset(x, y, K.solL); }
  const f = g > 0 ? g_hyGolpe(R, t, g, px, py, G_HYPAR.zona, 34, 2) : 0;
  let salto = 0; for (const g0 of G_HYTOCS) { const u = (g - g0) / 0.3; if (u >= 0 && u < 0.5) salto = Math.max(salto, Math.sin(u / 0.5 * Math.PI)); }
  const [lx, ly] = G_HYPAR.lamina; g_hyCuelga(R, g_hyLamina('falucca', 52, 36), 52, 36, lx, ly - Math.round(salto * 4), g > 0 ? g_hyTuerce(g) * 0.6 : 0);
  return { punto: [px, py], toc: [px, py], lamina: [lx, ly] };
}
// DELANTE EN LA PARED: la palmera de interior en su maceta (primer término, a la derecha), que se mece
function g_hyParedDelante(R, t, o = {}) {
  const K = g_hyK, { rect, pset, linea, disco } = R, x0 = 270, y0 = 150;
  for (let y = y0; y <= 179; y++) { const w = 22 - Math.round((y - y0) * 0.18); for (let x = x0 - w; x <= x0 + w; x++) pset(x, y, x === x0 - w || x === x0 + w ? K.k : x < x0 - w + 4 ? K.barroL : x > x0 + w - 6 ? K.barroS : (y - y0) % 9 === 3 ? K.barroS : K.barro); }
  rect(x0 - 24, y0 - 3, x0 + 24, y0 + 1, K.k); rect(x0 - 23, y0 - 2, x0 + 23, y0, K.barroL); rect(x0 - 22, y0 - 1, x0 + 22, y0 - 1, K.troncoS);
  for (let k = 0; k < 9; k++) { const base = -2.9 + k * 0.33 + Math.sin(t * 0.8 + k) * 0.04, l = 46 + (k % 3) * 14, m = Math.sin(t * 1.1 + k * 0.7) * 0.03;
    let x = x0 - 2 + (k - 4), y = y0 - 4; linea(x, y, x, y - 6, K.hojaS);
    for (let i = 0; i < l; i++) { const a = base + m + i * 0.006 * (base < -1.57 ? -1 : 1), cx = x + Math.cos(a) * i, cy = y - 6 + Math.sin(a) * i + i * i * 0.011; const X = Math.round(cx), Y = Math.round(cy); if (Y < 62) continue; pset(X, Y, K.hojaD);
      if (i > 6) for (let d = 1; d <= 4 + Math.round(Math.sin(i / l * Math.PI) * 4); d++) { pset(X - Math.round(Math.sin(a) * d * 0.4) - (d >> 1), Y + d, d < 3 ? K.hoja : K.hojaS); pset(X + Math.round(Math.sin(a) * d * 0.4) + (d >> 1), Y + d, d < 2 ? K.hojaL : K.hoja); } } }
  return { maceta: [x0 - 24, y0 - 3, x0 + 24, 179] };
}

const G_HYMES = { taza: [40, 132], esteto: [98, 152], libro: [112, 28, 206, 92], cuaderno: [18, 32, 76, 94], lupa: [148, 124], postal: [222, 34, 262, 64], escarabajo: [292, 96], manzana: [244, 122], borde: [252, 150], gatoX: 214 };

function g_hyMesaFijo(R) {
  const K = g_hyK, E = g_hyE, { rect, pset, linea, disco } = R;
  g_hyTablero(R, 0, 155, 150, 90, (x, y) => Math.max(y < 26 && x < 184 ? 1 - Math.max(0, y - 18) / 8 : 0, x > 258 && y < 56 ? Math.min(1, (x - 258) / 10) * (1 - Math.max(0, y - 44) / 12) : 0));
  // el canto redondeado del tablero, su cara y el suelo de tarima de abajo, en la sombra de la mesa
  rect(0, 156, 319, 156, K.nogalB); rect(0, 157, 319, 157, K.nogalL); rect(0, 158, 319, 162, K.nogalS); for (let x = 0; x < 320; x++) { if (h(x >> 3, 1, 141) < 0.3) pset(x, 159, K.nogal); if (h(x >> 2, 2, 141) < 0.2) pset(x, 161, K.nogalD); } rect(0, 163, 319, 163, K.k);
  g_hyTarima(R, 164, 179, [164, 169, 175]); for (let y = 164; y <= 168; y++) for (let x = 0; x < 320; x++) if (g_hyB4(x, y) < 0.6 - (y - 164) * 0.12) g_hyTinta(R, x, y, K.k, 0.3);
  // la sombra de lo que está encima
  const sombra = (x0, y0, x1, y1) => { for (let y = y0 + 2; y <= y1 + 3; y++) for (let x = x0 + 3; x <= x1 + 3; x++) if (x > x1 || y > y1) g_hyTinta(R, x, y, K.k, 0.32); };
  // EL CUADERNO de cuadros, abierto, con su espiral y unos apuntes (rayas y un triángulo), y la REGLA de madera cruzada
  { const [x0, y0, x1, y1] = G_HYMES.cuaderno; sombra(x0, y0, x1, y1); rect(x0, y0, x1, y1, K.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, K.blanco);
    for (let y = y0 + 4; y < y1; y += 4) rect(x0 + 1, y, x1 - 1, y, K.cielo5); for (let x = x0 + 4; x < x1; x += 4) rect(x, y0 + 4, x, y1 - 1, K.cielo5); rect(x0 + 8, y0 + 1, x0 + 8, y1 - 1, K.rosa);
    for (let x = x0 + 3; x < x1 - 2; x += 5) { disco(x, y0, 1, K.metalD); pset(x, y0 - 1, K.metalL); }
    for (const [y, l] of [[y0 + 9, 30], [y0 + 13, 22], [y0 + 17, 34], [y0 + 21, 16]]) linea(x0 + 11, y, x0 + 11 + l, y, K.azulS);
    linea(x0 + 16, y1 - 8, x0 + 28, y1 - 26, K.k); linea(x0 + 28, y1 - 26, x0 + 40, y1 - 8, K.k); linea(x0 + 16, y1 - 8, x0 + 40, y1 - 8, K.k); linea(x0 + 28, y1 - 26, x0 + 34, y1 - 8, K.papelD); disco(x0 + 46, y1 - 24, 2, K.rojo);
    // la regla
    for (let i = 0; i <= 70; i++) { const x = 22 + i, y = 104 - Math.round(i * 0.42); for (let d = 0; d < 6; d++) pset(x, y + d, d === 0 ? K.k : d === 5 ? K.k : d === 1 ? K.oroL : K.oro); if (i % 4 === 0) pset(x, y + 1 + (i % 12 === 0 ? 1 : 0), K.nogalS); if (i % 12 === 0) pset(x, y + 2, K.nogalS); g_hyTinta(R, x + 2, y + 6, K.k, 0.3); } }
  // EL LIBRO DE EGIPTO abierto: tapa de tela roja, dos páginas con su lomo en sombra; a la izquierda, un dibujo de
  // pirámides con su sol; a la derecha, dos columnas de rayas y un escarabajo; la cinta roja que asoma
  { const [x0, y0, x1, y1] = G_HYMES.libro, cx = (x0 + x1) >> 1; sombra(x0, y0, x1, y1); rect(x0, y0, x1, y1, K.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, K.rojoS); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, K.rojo);
    for (let y = y0 + 3; y <= y1 - 3; y++) for (let x = x0 + 3; x <= x1 - 3; x++) { const d = Math.abs(x - cx); pset(x, y, d < 2 ? K.papelD : d < 5 ? K.papelS : (y === y0 + 3 || y === y1 - 3) ? K.papelS : (x - x0) % 47 < 2 ? K.papelS : K.papel); }
    for (let y = y0 + 3; y <= y1 - 3; y++) { pset(x0 + 3, y, K.papelD); pset(x1 - 3, y, K.papelD); }
    // la página de la izquierda: el dibujo
    { const bx = x0 + 8, by = y0 + 52; for (let j = 0; j <= 18; j++) { linea(bx + 6 + j, by - j, bx + 6 + j, by - j, K.oroS); for (let i = 6 + j; i <= 42 - j; i++) pset(bx + i, by - j, i < 24 ? E.ocreA : K.oroS); } linea(bx + 6, by, bx + 24, by - 18, K.k); linea(bx + 24, by - 18, bx + 42, by, K.k);
      for (let j = 0; j <= 10; j++) for (let i = 30 + j; i <= 52 - j && i < 39; i++) pset(bx + i, by - j, K.oroS); linea(bx, by + 1, bx + 38, by + 1, K.papelD);
      disco(bx + 10, by - 34, 4, K.oro); disco(bx + 10, by - 34, 2, K.oroL); for (let k = 0; k < 8; k++) pset(bx + 10 + Math.round(Math.cos(k * 0.785) * 6), by - 34 + Math.round(Math.sin(k * 0.785) * 6), K.oroS);
      for (const [y, l] of [[by + 4, 32], [by + 7, 26]]) linea(bx, y, bx + l, y, K.papelD); }
    // la de la derecha: rayas en dos columnas y un escarabajo
    for (let c = 0; c < 2; c++) for (let r = 0; r < 12; r++) { const y = y0 + 8 + r * 4, xa = cx + 7 + c * 20, l = 14 - Math.round(h(r, c, 142) * 6); if (c === 1 && r > 3 && r < 9) continue; linea(xa, y, xa + l, y, K.papelD); }
    g_hyMotivo(R, G_HYMOT[2], cx + 22, y0 + 20, 2, { A: K.azul, a: K.azulS, m: K.verdeS, M: K.hojaD, r: K.rojo });
    rect(cx + 10, y1, cx + 12, y1 + 9, K.k); rect(cx + 11, y1, cx + 11, y1 + 8, K.rojo); pset(cx + 10, y1 + 9, K.k); pset(cx + 12, y1 + 9, K.k); }
  // la taza de té con su plato
  { const [cx, cy] = G_HYMES.taza; for (let j = -15; j <= 18; j++) for (let i = -15; i <= 19; i++) if (Math.hypot(i - 3, j - 3) < 15.5 && Math.hypot(i, j) > 15) g_hyTinta(R, cx + i, cy + j, K.k, 0.35);
    disco(cx, cy, 16, K.k); disco(cx, cy, 15, K.frisoL); disco(cx, cy, 13, K.friso); disco(cx, cy, 12, K.frisoL); rect(cx + 9, cy - 3, cx + 17, cy + 3, K.k); rect(cx + 10, cy - 2, cx + 16, cy + 2, K.blanco); rect(cx + 11, cy - 1, cx + 14, cy + 1, K.frisoL);
    disco(cx, cy, 10, K.k); disco(cx, cy, 9, K.blanco); disco(cx, cy, 7, hex('#b8763a')); for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j); if (d < 7.5 && d > 5.6 && i + j > 2) pset(cx + i, cy + j, hex('#96582a')); } pset(cx - 6, cy - 6, K.marcoS); pset(cx - 7, cy - 5, K.marcoS); }
  // la POSTAL de las pirámides (nuestra, sin letras) con su sello, y el PISAPAPELES de escarabajo, azul turquesa
  { const [x0, y0, x1, y1] = G_HYMES.postal; sombra(x0, y0, x1, y1); rect(x0, y0, x1, y1, K.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, K.blanco);
    for (let y = y0 + 3; y <= y1 - 3; y++) for (let x = x0 + 3; x <= x1 - 3; x++) { const u = (y - y0 - 3) / (y1 - y0 - 6), xi = x - x0 - 3, ar = 0.66; let c = u < 0.3 ? E.tarde4 : u < ar ? E.tarde2 : (x + y) % 5 ? K.oro : K.oroS; const pp = Math.abs(xi - 14) / 11; if (u < ar && pp < 1 && u > ar - (1 - pp) * 0.55) c = xi < 14 ? K.oro : K.oroS; const p2 = Math.abs(xi - 27) / 7; if (u < ar && p2 < 1 && u > ar - (1 - p2) * 0.35) c = xi < 27 ? K.oro : K.oroS; pset(x, y, c); }
    rect(x1 - 9, y0 + 3, x1 - 3, y0 + 10, K.rojo); for (let x = x1 - 9; x <= x1 - 3; x += 2) { pset(x, y0 + 3, K.blanco); pset(x, y0 + 10, K.blanco); } pset(x1 - 6, y0 + 6, K.oroL); }
  { const [px, py] = G_HYMES.escarabajo; for (let j = -7; j <= 9; j++) for (let i = -6; i <= 9; i++) if (Math.hypot(i / 7, j / 9) < 1 && Math.hypot((i - 2) / 7, (j - 2) / 9) >= 1) g_hyTinta(R, px + i, py + j, K.k, 0.35);
    R.poligono([[px - 6, py - 2], [px - 4, py - 7], [px, py - 9], [px + 4, py - 7], [px + 6, py - 2], [px + 6, py + 4], [px + 3, py + 8], [px - 3, py + 8], [px - 6, py + 4]], K.k);
    for (let j = -8; j <= 7; j++) for (let i = -5; i <= 5; i++) if (Math.hypot(i / 5.6, j / 8) < 1) pset(px + i, py + j, i === 0 && j > -4 ? hex('#1e6a66') : j < -4 ? hex('#2a8a84') : i < -1 ? hex('#6ad0c8') : hex('#3ab0a8'));
    linea(px - 5, py - 4, px + 5, py - 4, hex('#1e6a66')); pset(px - 3, py - 6, K.blanco); pset(px - 2, py - 1, K.blanco); for (const d of [-1, 1]) { linea(px + d * 6, py - 1, px + d * 8, py - 3, K.k); linea(px + d * 6, py + 3, px + d * 8, py + 5, K.k); } }
  // el lápiz junto al cuaderno
  for (let i = 0; i < 26; i++) { const x = 84 + i, y = 70 - Math.round(i * 0.9); pset(x, y, i < 3 ? K.k : i < 6 ? hex('#e8c89a') : i > 22 ? K.rosa : K.amarillo); pset(x + 1, y, i < 6 ? K.papelS : K.oroS); g_hyTinta(R, x + 2, y + 2, K.k, 0.3); }
}

// LA MESA DESDE ARRIBA (encuadre 'mesa'): el estetoscopio enrollado, la lupa (su cristal agranda la veta), el vapor de
// la taza, la mancha de sol con la sombra de una rama que se mece, y LA MANZANA, que con o.rueda 0–1 rueda hasta el
// borde (gira: el rabito da vueltas); abajo, en la tarima, asoman las orejas del gato, que la sigue con los ojos
function g_hyMesa(R, t, o = {}) {
  const K = g_hyK, E = g_hyE, { pset, disco, linea } = R, G = G_HYMES;
  g_hyPegar(R, g_hyCapa(R, 'mesa', () => g_hyMesaFijo(R)));
  for (let y = 100; y <= 155; y++) { const u = (y - 100) / 55, xa = Math.round(236 - u * 30); for (let x = Math.max(xa, 222); x <= 319; x++) { const s = Math.sin(x * 0.11 + y * 0.07 + Math.sin(t * 0.8) * 0.8) + Math.sin(x * 0.05 - y * 0.13 + t * 0.5); if (s > 0.9) continue; if (g_hyB4(x, y) < (x - xa < 4 ? 0.2 : 0.45)) g_hyTinta(R, x, y, K.solL, 0.35); } }
  for (let k = 0; k < 3; k++) { const u = (t * 0.35 + k / 3) % 1, x = G.taza[0] - 3 + k * 3 + Math.sin(u * 7 + k * 2) * 3, y = G.taza[1] - 2 - u * 16; for (let i = 0; i < 4; i++) if (g_hyB4(Math.round(x) + i, Math.round(y)) < 0.8 * (1 - u)) g_hyTinta(R, Math.round(x + Math.sin(u * 9 + i) * 1.5), Math.round(y) - i, K.blanco, 0.5); }
  // el estetoscopio enrollado, grande
  if (o.estetoscopio !== false) { PIEZAS_TU.estetoscopio?.(R, G.esteto[0], G.esteto[1], { s: 2 }); }
  // la lupa: aro de latón, el cristal azulado que agranda la veta, su reflejo que se mueve y el mango de madera
  { const [cx, cy] = G.lupa, r = 16; for (let k = 0; k < 22; k++) g_hyTinta(R, cx + 15 + k, cy + 16 + k, K.k, 0.3);
    for (let k = 0; k < 22; k++) { R.rect(cx + 12 + k, cy + 11 + k, cx + 14 + k, cy + 12 + k, K.k); pset(cx + 13 + k, cy + 12 + k, k < 5 ? K.oroS : K.nogal); pset(cx + 13 + k, cy + 11 + k, k < 5 ? K.oroL : K.nogalB); }
    for (let j = -r - 1; j <= r + 1; j++) for (let i = -r - 1; i <= r + 1; i++) { const d = Math.hypot(i, j); if (d > r + 1.2) continue; if (d > r - 2) { pset(cx + i, cy + j, d > r + 0.4 ? K.k : i + j < -4 ? K.oroL : i + j > 6 ? K.oroS : K.oro); continue; }
      const X = cx + i * 0.55, Y = cy + j * 0.55, v = (Y + Math.sin(X * 0.035 + Y * 0.11) * 3 + Math.sin(X * 0.011 + 2) * 5), f = ((v % 9) + 9) % 9; pset(cx + i, cy + j, f < 1.2 ? K.nogalS : f > 7.4 ? K.nogalB : K.nogalL); if (g_hyB4(cx + i, cy + j) < 0.18) g_hyTinta(R, cx + i, cy + j, K.cristal, 0.35); }
    const a = t * 0.6; for (let k = -5; k <= 5; k++) for (const q of [0, 1]) { const x = Math.round(cx - 6 + Math.cos(a) * 2 + k * 0.7 + q), y = Math.round(cy - 6 + Math.sin(a) * 2 - k * 0.7); if (Math.hypot(x - cx, y - cy) < r - 3) g_hyTinta(R, x, y, K.blanco, 0.65); } }
  // la manzana: rueda hacia el borde
  const r = g_hyCl(o.rueda || 0), e = r * r * (3 - 2 * r), mx = Math.round(lerp(G.manzana[0], G.borde[0], e)), my = Math.round(lerp(G.manzana[1], G.borde[1], e)), giro = e * 4.2;
  { for (let j = -6; j <= 7; j++) for (let i = -6; i <= 8; i++) if (Math.hypot(i - 2, j - 2) < 7 && Math.hypot(i, j) > 6.5) g_hyTinta(R, mx + i, my + j, K.k, 0.4);
    disco(mx, my, 7, K.k); disco(mx, my, 6, E.manzanaS); disco(mx - 1, my - 1, 5, E.manzana); disco(mx - 2, my - 2, 2, E.manzanaL); pset(mx - 3, my - 3, K.blanco);
    const rx = Math.round(mx + Math.cos(giro - 1.2) * 2), ry = Math.round(my + Math.sin(giro - 1.2) * 2); pset(rx, ry, K.troncoS); pset(rx + Math.round(Math.cos(giro - 1.2) * 1.5), ry + Math.round(Math.sin(giro - 1.2) * 1.5), K.troncoS);
    const hx = Math.round(rx + Math.cos(giro) * 3), hy = Math.round(ry + Math.sin(giro) * 3); disco(hx, hy, 1, K.hoja); pset(hx, hy, K.hojaL); }
  // las orejas y los ojos del gato, que asoma por abajo y sigue la manzana
  { const gx = G.gatoX + Math.round(Math.sin(t * 0.4) * 2), gy = 178, mira = Math.max(-1, Math.min(1, Math.round((mx - gx) / 20))), oreja = (t % 3.3) < 0.15 ? 1 : 0;
    disco(gx, gy, 9, K.k); disco(gx, gy, 8, K.gato); R.poligono([[gx - 9, gy - 3], [gx - 7, gy - 13 - oreja], [gx - 2, gy - 7]], K.k); R.poligono([[gx + 2, gy - 7], [gx + 7, gy - 13], [gx + 9, gy - 3]], K.k); pset(gx - 6, gy - 9 - oreja, K.rosa); pset(gx + 6, gy - 9, K.rosa); R.poligono([[gx - 7, gy - 4], [gx - 6, gy - 10 - oreja], [gx - 3, gy - 7]], K.gato); R.poligono([[gx + 3, gy - 7], [gx + 6, gy - 10], [gx + 7, gy - 4]], K.gato);
    const cierra = (t % 4.1) > 3.95; for (const ex of [gx - 4, gx + 4]) { if (cierra) { pset(ex - 1, gy - 3, K.k); pset(ex, gy - 3, K.k); pset(ex + 1, gy - 3, K.k); } else { disco(ex, gy - 3, 2, K.amarillo); pset(ex + mira, gy - 4, K.k); pset(ex + mira, gy - 3, K.k); pset(ex - 1, gy - 4, K.blanco); } }
    R.rect(gx - 8, gy - 1, gx + 8, gy - 1, K.gatoL); }
  return { manzana: [mx, my], borde: G.borde };
}

const G_HYMZ = { suelo: 160, manzana: [184, 58], borde: 196, cae: [206, 154], flecha: 232, gato: [276, 160] };

function g_hyManzanaFijo(R) {
  const K = g_hyK, E = g_hyE, { rect, pset, linea, disco, poligono } = R;
  g_hyPapelEg(R, 0, 0, 319, 95, 2, (x, y) => (x >= 256 && y <= 56) || (y <= 32 && x <= 214));
  g_hyGreca(R, 96, 2);
  rect(0, 118, 319, 145, K.friso); rect(0, 118, 319, 119, K.frisoL); rect(0, 120, 319, 121, K.frisoD);
  for (let x = 10; x < 320; x += 56) { rect(x, 124, x + 46, 139, K.frisoS); rect(x, 124, x + 46, 124, K.frisoD); rect(x, 124, x, 139, K.frisoD); rect(x + 46, 125, x + 46, 139, K.frisoL); rect(x + 3, 127, x + 43, 137, K.friso); rect(x + 3, 127, x + 43, 127, K.frisoL); rect(x + 43, 128, x + 43, 137, K.frisoD);
    for (let y = 128; y < 137; y++) for (let i = 4; i < 43; i++) if (h((x + i) >> 2, y >> 1, 151) < 0.1) pset(x + i, y, K.frisoS); }
  rect(0, 140, 319, 145, K.frisoS); rect(0, 140, 319, 140, K.frisoL); rect(0, 145, 319, 145, K.frisoD);
  g_hyTarima(R, 146, 179, [146, 150, 155, 161, 168, 176]); for (let x = 0; x < 320; x++) pset(x, 146, K.tarimaD);
  // EL ESCRITORIO de nogal, de lado: el tablero (la cara de arriba en escorzo y el canto), la cajonera de la izquierda
  // con dos cajones y sus tiradores de latón, el hueco de las rodillas en sombra y la pata de delante
  for (let y = 70; y <= 146; y++) for (let x = 46; x <= 168; x++) g_hyTinta(R, x, y, K.k, y < 76 ? 0.5 : 0.38);
  for (let y = 146; y <= 156; y++) for (let x = 0; x <= 200; x++) if (g_hyB4(x, y) < 0.55 - (y - 146) * 0.05) g_hyTinta(R, x, y, K.k, 0.35);
  rect(0, 60, 197, 64, K.k); rect(0, 61, 196, 63, K.nogalB); rect(0, 61, 196, 61, hex('#d8a470')); for (let x = 0; x < 196; x++) if (h(x >> 3, 1, 152) < 0.35) pset(x, 62, K.nogalL);
  rect(0, 64, 198, 72, K.k); rect(0, 65, 197, 71, K.nogal); rect(0, 65, 197, 65, K.nogalL); rect(0, 71, 197, 71, K.nogalS); for (let x = 0; x < 197; x++) { if (h(x >> 2, 3, 153) < 0.3) pset(x, 67, K.nogalS); if (h(x >> 3, 4, 153) < 0.25) pset(x, 69, K.nogalL); } rect(197, 65, 197, 71, K.nogalS);
  rect(0, 72, 46, 152, K.k); rect(0, 73, 45, 151, K.nogal); rect(44, 73, 45, 151, K.nogalS);
  for (const [y0, y1] of [[76, 108], [112, 146]]) { rect(2, y0, 41, y1, K.nogalS); rect(3, y0 + 1, 40, y1 - 1, K.nogal); rect(3, y0 + 1, 40, y0 + 1, K.nogalL); rect(3, y1 - 1, 40, y1 - 1, K.nogalS); for (let y = y0 + 2; y < y1 - 1; y++) for (let x = 4; x < 40; x++) if (h(x >> 3, y, 154) < 0.12) pset(x, y, K.nogalS);
    const cy = (y0 + y1) >> 1; rect(14, cy - 2, 30, cy + 2, K.k); rect(15, cy - 1, 29, cy + 1, K.oro); rect(15, cy - 1, 29, cy - 1, K.oroL); rect(15, cy + 1, 29, cy + 1, K.oroS); }
  rect(0, 151, 46, 154, K.k); rect(1, 151, 45, 153, K.nogalD);
  rect(168, 72, 190, 158, K.k); rect(169, 72, 189, 157, K.nogal); rect(169, 72, 171, 157, K.nogalL); rect(186, 72, 189, 157, K.nogalS); for (let y = 74; y < 156; y++) for (let x = 172; x < 186; x++) if (h(x >> 2, y >> 3, 155) < 0.16) pset(x, y, K.nogalS);
  rect(166, 155, 192, 160, K.k); rect(167, 156, 191, 159, K.nogalD); rect(167, 156, 191, 156, K.nogal);
  // encima: la pila de libros, el flexo apagado y un portalápices
  { rect(14, 44, 64, 60, K.k); rect(15, 45, 63, 50, K.azulS); rect(15, 45, 63, 45, K.azul); rect(60, 46, 63, 49, K.papel); rect(18, 51, 60, 59, K.rojoS); rect(18, 51, 60, 51, K.rojo); rect(56, 52, 59, 58, K.papel); rect(30, 47, 44, 47, K.oro); rect(30, 55, 44, 55, K.oro);
    rect(22, 36, 58, 44, K.k); rect(23, 37, 57, 43, K.friso); rect(23, 37, 57, 37, K.frisoL); rect(54, 38, 57, 42, K.papel); }
  { rect(84, 56, 104, 60, K.k); rect(85, 56, 103, 59, K.metalS); rect(85, 56, 103, 56, K.metalL); linea(94, 55, 100, 34, K.k); linea(95, 55, 101, 34, K.metal); disco(101, 32, 3, K.k); pset(101, 32, K.oro); linea(100, 30, 86, 26, K.k); linea(100, 29, 86, 25, K.metal);
    poligono([[74, 40], [92, 40], [90, 28], [83, 25], [77, 28]], K.k); poligono([[76, 39], [90, 39], [88, 29], [83, 27], [78, 29]], K.rojoS); rect(78, 30, 79, 37, K.rojo); }
  { rect(120, 44, 132, 60, K.k); rect(121, 45, 131, 59, K.friso); rect(121, 45, 122, 59, K.frisoL); for (const [x, a, c] of [[123, 14, K.amarillo], [126, 18, K.rojo], [129, 12, K.azul]]) { linea(x, 44, x + 1, 44 - a, K.k); linea(x + 1, 44, x + 2, 44 - a, c); } }
  // a la derecha: la lámpara de pie (su pantalla, por debajo de la esquina de Atom) y el rodapié con su cable
  rect(300, 66, 302, 158, K.k); rect(301, 66, 301, 158, K.oroS); rect(292, 156, 310, 160, K.k); rect(293, 157, 309, 159, K.oroS); rect(293, 157, 309, 157, K.oroL);
  poligono([[286, 70], [316, 70], [311, 50], [291, 50]], K.k); poligono([[288, 69], [314, 69], [309, 51], [293, 51]], K.luz); rect(293, 51, 309, 51, K.blanco); for (let y = 54; y < 69; y += 3) rect(290, y, 312, y, K.sol);
}

// LA MANZANA QUE CAE (cámara 'manzana'): o.cae 0–1: la manzana rueda hasta el filo, cae acelerando con rayitas de
// velocidad, y una FLECHA roja hacia abajo crece a su lado (la gravedad); al final da un botecito en la tarima y deja
// una nubecilla de polvo. El gato (grande, a esta escala) la mira caer y mueve la cola. Vida: la luz de la lámpara y
// motas en el aire
function g_hyManzana(R, t, o = {}) {
  const K = g_hyK, E = g_hyE, { pset, disco, linea, poligono } = R, G = G_HYMZ, c = g_hyCl(o.cae || 0);
  g_hyPegar(R, g_hyCapa(R, 'manzana', () => g_hyManzanaFijo(R)));
  for (let y = 70; y <= 160; y++) { const w = (y - 70) * 0.35; for (let x = Math.round(301 - w); x <= Math.round(301 + w); x++) if (x > 196 && g_hyB4(x, y) < 0.18 + Math.sin(t * 1.3) * 0.03) g_hyTinta(R, x, y, K.luz, 0.3); }
  for (let k = 0; k < 8; k++) { const x = 210 + Math.round(h(k, 1, 156) * 90 + Math.sin(t * 0.5 + k) * 3), y = 70 + Math.round((h(k, 2, 156) * 80 + t * (2 + k % 3)) % 80); if (Math.sin(t * 1.3 + k * 1.7) > 0.2) pset(x, y, K.luz); }
  // la manzana
  const u = g_hyCl(c / 0.12), v = g_hyCl((c - 0.12) / 0.8), [ax, ay] = G.manzana; let mx, my, giro;
  if (c < 0.12) { mx = Math.round(lerp(ax, G.borde + 2, u * u)); my = ay; giro = u * 2; }
  else { mx = Math.round(lerp(G.borde + 2, G.cae[0], v)); my = Math.round(lerp(ay, G.cae[1], v * v)); giro = 2 + v * 5; }
  let bote = 0; if (c > 0.92) { const b = (c - 0.92) / 0.08; bote = Math.round(Math.sin(b * Math.PI) * 5); my = G.cae[1] - bote; }
  if (c > 0.12 && c < 0.92) for (let k = 0; k < 4; k++) { const x = mx - 4 + k * 3, l = 6 + Math.round(v * 14); linea(x, my - 9 - l, x, my - 9 - (k % 2) * 3, K.blanco); }
  const sx = mx + 4, sy = G.suelo - 1, sd = Math.max(2, Math.round(9 - Math.abs(sy - my) * 0.06)); if (my > 100) for (let i = -sd; i <= sd; i++) g_hyTinta(R, sx + i, sy, K.k, 0.4);
  disco(mx, my, 7, K.k); disco(mx, my, 6, E.manzanaS); disco(mx - 1, my - 1, 5, E.manzana); disco(mx - 3, my - 3, 1, E.manzanaL); pset(mx - 3, my - 4, K.blanco);
  { const a = -1.57 + giro, rx = Math.round(mx + Math.cos(a) * 6), ry = Math.round(my + Math.sin(a) * 6); linea(Math.round(mx + Math.cos(a) * 5), Math.round(my + Math.sin(a) * 5), rx, ry, K.troncoS); disco(Math.round(rx + Math.cos(a + 1) * 2), Math.round(ry + Math.sin(a + 1) * 2), 1, K.hoja); }
  if (c >= 0.95) { const p = (c - 0.95) / 0.05; for (let k = 0; k < 5; k++) { const dx = Math.round((k - 2) * (4 + p * 6)), dy = Math.round(-1 - Math.abs(k - 2) * p * 2); if (g_hyB4(sx + dx, sy + dy) < 0.8 - p * 0.3) pset(sx + dx, sy + dy, K.papelS); } }
  // la flecha de la gravedad: crece hacia abajo a la derecha de la manzana
  if (c > 0.12) { const x = G.flecha, y0 = 72, l = Math.round(10 + g_hyCl((c - 0.12) / 0.7) * 66), y1 = y0 + l;
    for (let y = y0; y <= y1; y++) for (let i = -3; i <= 3; i++) pset(x + i, y, Math.abs(i) === 3 ? K.k : i < 0 ? K.rojo : i === 2 ? K.rojoS : hex('#e8584a'));
    for (let j = 0; j <= 9; j++) for (let i = -9 + j; i <= 9 - j; i++) pset(x + i, y1 + j, Math.abs(i) >= 9 - j - 1 ? K.k : i < 0 ? K.rojo : K.rojoS); pset(x, y0, K.k); for (let i = -3; i <= 3; i++) pset(x + i, y0 - 1, K.k); }
  // el gato, a la escala del plano (el doble), que mira la manzana
  g_hyGatoGrande(R, ...G.gato, t, 2);
  return { manzana: [mx, my], suelo: G.suelo, flecha: [G.flecha, 72] };
}

// el gato de g_hyGato a escala e (lo pinta en un búfer aparte y lo pasa ampliado): (x, y) el centro de su base
let g_hyBufGato = null;

function g_hyGatoGrande(R, x, y, t, e = 2) {
  if (!g_hyBufGato) g_hyBufGato = R.nuevo(); const b = g_hyBufGato; for (let j = 20; j < 56; j++) b.fill(G_HYVACIO, j * 320, j * 320 + 60);
  const prev = R.usar(b); g_hyGato(R, 30, 52, t, { dir: -1 }); R.usar(prev);
  for (let j = 20; j < 56; j++) for (let i = 0; i < 60; i++) { const c = b[j * 320 + i]; if (c === G_HYVACIO) continue; R.rect(x + (i - 30) * e, y + (j - 52) * e - e, x + (i - 30) * e + e - 1, y + (j - 52) * e - 1, c); }
}

const G_HYPIZ = { suelo: 162, pizarra: [48, 28, 272, 142], blanca: [51, 31, 269, 139], fila: 124, iconoY: 98, respY: 62 };

// los dibujos a rotulador (13 × 11): K negro, B azul, G verde, R rojo
const G_HYDIB = {
  radarMano: ['....KKKKK....', '....K...K....', '.KKKKKKKKKK..', '.K........KB.', '.K.GGG....KB.', '.K.GGG..R.KB.', '.K........KB.', '.KKKKKKKKKKB.', '...K.......B.', '....KK.......', '......KKK....'],
  radarCarrito: ['KK...........', '.K...........', '..K..........', '...K.........', '....KKKKKKKK.', '....KGGG...K.', '....K....R.K.', '....KKKKKKKK.', '.....BB..BB..', '....B..BB..B.', '.....BB..BB..'],
  gravimetro: ['....KKKKK....', '....K.R.K....', '....K..RK....', '....KKKKK....', '....K...K....', '....KKKKK....', '......B......', '.....BBB.....', '....B.B.B....', '...B..B..B...', '..B...B...B..'],
  camarita: ['......K......', '......K......', '.KKKKKKKKKKK.', '.K.........K.', '.K.........K.', '.K.........K.', '.K.........K.', '.K.........K.', '.KKKKKKKKKKK.', '..K.......K..', '.............'],
};

const G_HYRESP = {
  '✓': ['......G', '.....GG', '....GG.', 'G..GG..', 'GGGG...', '.GG....', '.......'],
  '✗': ['R.....R', 'RR...RR', '.RR.RR.', '..RRR..', '.RR.RR.', 'RR...RR', 'R.....R'],
  '?': ['.BBBB..', 'BB..BB.', '....BB.', '...BB..', '...B...', '.......', '...B...'],
};

// un dibujo a rotulador a escala e centrado en (cx, cy), del que solo se ve la parte de arriba hasta la fracción f (se
// está dibujando); recortado a la caja c
function g_hyDibujo(R, g, cx, cy, e, f = 1, caja = null) {
  const E = g_hyE, P = { K: E.rotN, B: E.rotA, G: E.rotV, R: E.rotR }, w = g[0].length, hh = g.length, x0 = Math.round(cx - w * e / 2), y0 = Math.round(cy - hh * e / 2), nf = Math.ceil(hh * g_hyCl(f));
  for (let j = 0; j < nf; j++) for (let i = 0; i < w; i++) { const c = P[g[j][i]]; if (c == null) continue; for (let b = 0; b < e; b++) for (let a = 0; a < e; a++) { const x = x0 + i * e + a, y = y0 + j * e + b; if (caja && (x < caja[0] || x > caja[2] || y < caja[1] || y > caja[3])) continue; R.pset(x, y, c); } }
}

// la pizarra blanca en [x0, y0, x1, y1] (con su marco de aluminio): el blanco con un brillo en diagonal, sombras de
// rotulador mal borrado y los tornillos del marco
function g_hyBlanca(R, x0, y0, x1, y1) {
  const K = g_hyK, E = g_hyE, { rect, pset } = R;
  rect(x0, y0, x1, y1, K.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, E.alu); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, E.aluL); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, E.aluL); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, E.aluS); rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, E.aluS);
  rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, E.aluD);
  for (let y = y0 + 3; y <= y1 - 3; y++) for (let x = x0 + 3; x <= x1 - 3; x++) { const d = (x - x0) - (y - y0) * 1.4, b = ((d % 90) + 90) % 90; let c = E.pb; if (b < 26 && g_hyB4(x, y) < 0.35) c = E.pbS; if (h(x >> 3, y >> 3, 161) < 0.06 && h(x, y, 162) < 0.3) c = E.pbS; pset(x, y, c); }
  // sombras de dibujos borrados: unas curvas grises muy suaves
  for (let k = 0; k < 6; k++) { const cx = x0 + 20 + h(k, 1, 163) * (x1 - x0 - 40), cy = y0 + 14 + h(k, 2, 163) * (y1 - y0 - 28), r = 6 + h(k, 3, 163) * 10; for (let a = 0; a < 5; a += 0.08) { const x = Math.round(cx + Math.cos(a) * r * 1.4), y = Math.round(cy + Math.sin(a) * r * 0.7); if (g_hyB4(x, y) < 0.5) pset(x, y, E.pbD); } }
  for (const [x, y] of [[x0 + 1, y0 + 1], [x1 - 1, y0 + 1], [x0 + 1, y1 - 1], [x1 - 1, y1 - 1]]) { pset(x, y, E.aluD); }
}

function g_hyPizarraFijo(R) {
  const K = g_hyK, E = g_hyE, { rect, pset, linea, disco, poligono } = R;
  g_hyPapelEg(R, 0, 6, 319, 103, 1, (x, y) => (x >= 258 && y <= 54) || y <= 27);
  rect(0, 0, 319, 3, K.moldura); rect(0, 4, 319, 4, K.molduraS); rect(0, 5, 319, 5, K.nogalL); for (let x = 0; x < 320; x++) if (x % 12 === 3) pset(x, 2, K.molduraS);
  g_hyCenefa(R); g_hyRayas(R, 25); g_hyGreca(R, 104, 1);
  rect(0, 115, 319, 152, K.friso); rect(0, 115, 319, 115, K.frisoL); rect(0, 117, 319, 117, K.frisoD); rect(0, 149, 319, 152, K.frisoS); rect(0, 149, 319, 149, K.frisoL); rect(0, 152, 319, 152, K.frisoD);
  for (let x = 4; x < 320; x += 28) { rect(x, 120, x + 22, 146, K.frisoS); rect(x, 120, x, 146, K.frisoD); rect(x + 22, 121, x + 22, 146, K.frisoL); rect(x + 3, 123, x + 19, 143, K.friso); rect(x + 3, 123, x + 19, 123, K.frisoL); rect(x + 19, 124, x + 19, 143, K.frisoD); }
  g_hyTarima(R, 153, 179, [153, 157, 162, 168, 175]); for (let x = 0; x < 320; x++) { pset(x, 153, K.tarimaD); if (!(x & 1)) pset(x, 154, K.tarimaD); }
  // la alfombra (la misma del estudio), más cerca
  for (let y = 160; y <= 179; y++) for (let x = 40; x <= 280; x++) { const u = (y - 160) / 19, xa = 56 - u * 14, xb = 264 + u * 14; if (x < xa || x > xb) continue; const bx = Math.min(x - xa, xb - x), by = y - 160; pset(x, y, bx < 2 || by < 1 ? K.alfombraL : bx < 6 || by < 3 ? ((x + y) % 4 ? K.alfombraR : K.cortinaS) : bx < 8 || by < 4 ? K.alfombraL : (Math.abs(((x - xa) % 22) - 11) + Math.abs(by - 12) * 1.4) < 4 ? K.alfombraR : (x + y) % 2 && h(x, y, 164) < 0.3 ? K.alfombraS : K.alfombra); }
  // LA LIBRERÍA ancha detrás (x 24–296, y 46–152): se ve por los lados y por debajo de la pizarra
  rect(24, 46, 296, 152, K.k); rect(25, 50, 295, 151, K.nogal); rect(27, 52, 293, 147, K.nogalD); rect(22, 46, 298, 49, K.k); rect(23, 47, 297, 48, K.nogalL); rect(25, 50, 26, 151, K.nogalL); rect(294, 50, 295, 151, K.nogalS);
  { const COL = [K.rojo, K.azul, K.oroS, K.friso, K.cortina, K.noche, K.papelS, K.rojoS, K.azulS, K.hojaS, K.lila, K.sillon];
    [74, 98, 122, 146].forEach((by, b) => { rect(27, by, 293, by + 1, K.nogalL); rect(27, by + 1, 293, by + 1, K.nogalS);
      for (let x = 28, n = 0; x < 292; n++) { const w = 2 + Math.floor(h(x, b, 165) * 3), a = 12 + Math.floor(h(x, b, 166) * 8); if (x > 52 && x < 266 && by < 140) { x += w; continue; } if (h(x, b, 167) < 0.08) { x += 5; continue; } g_hyLomo(R, x, by - 1, w, a, COL[(n * 5 + b * 3) % 12], n); x += w; } });
    // la pirámide de recuerdo y el gato de escayola, en la balda de la izquierda
    for (let j = 0; j < 8; j++) { rect(31 + j, 97 - j, 45 - j, 97 - j, K.oro); pset(45 - j, 97 - j, K.oroS); pset(31 + j, 97 - j, K.oroL); } rect(30, 98, 46, 98, K.k);
    g_hyGatoEscayola(R, 282, 145);
    disco(285, 66, 5, K.k); disco(285, 66, 4, K.azul); pset(284, 64, K.hoja); pset(286, 66, K.hoja); pset(283, 67, K.hojaL); rect(282, 72, 288, 73, K.oroS); }
  // la lámpara de pie de la izquierda, encendida, y la planta de la derecha
  rect(11, 70, 12, 160, K.k); rect(12, 70, 12, 160, K.oroS); rect(5, 159, 18, 161, K.k); rect(6, 159, 17, 160, K.oroS); poligono([[2, 72], [22, 72], [18, 54], [6, 54]], K.k); poligono([[3, 71], [21, 71], [17, 55], [7, 55]], K.luz); rect(7, 55, 17, 55, K.blanco); for (let y = 58; y < 71; y += 3) rect(4, y, 20, y, K.sol);
  for (let y = 74; y <= 120; y++) for (let x = 0; x <= 30; x++) if (Math.abs(x - 12) < (y - 72) * 0.5 && g_hyB4(x, y) < 0.25 && R.pget(x, y) === K.pared) pset(x, y, K.paredL);
  rect(300, 140, 316, 160, K.k); rect(301, 141, 315, 159, K.barro); rect(301, 141, 315, 142, K.barroL); rect(311, 143, 315, 159, K.barroS);
  // la pizarra
  g_hyBlanca(R, ...G_HYPIZ.pizarra);
  // un «título» de barras (sin letras) y la raya de la fila
  { const [x0, y0] = G_HYPIZ.blanca; rect(x0 + 12, y0 + 7, x0 + 70, y0 + 9, E.rotA); rect(x0 + 13, y0 + 10, x0 + 70, y0 + 10, hex('#5a7ad8')); rect(x0 + 76, y0 + 7, x0 + 100, y0 + 9, E.rotA); rect(x0 + 12, y0 + 13, x0 + 54, y0 + 13, E.rotR); }
}

// LA PIZARRA (encuadre 'pizarra'): o.n 3–5 estudios en fila (por omisión 5), cada uno con su dibujo a rotulador (radar
// de mano ×3, radar de carrito, gravímetro) y encima su respuesta (o.respuestas; por omisión ✓ ✗ ✗ y, con 5, ? ?);
// o.traza 0–1: se van dibujando uno a uno (el dibujo crece de arriba abajo y la respuesta sale al acabarlo). Vida: el
// brillo del blanco que cruza, la luz de la lámpara, la polilla y las hojas de la planta
function g_hyPizarra(R, t, o = {}) {
  const K = g_hyK, E = g_hyE, { pset, linea } = R, G = G_HYPIZ, n = Math.max(3, Math.min(5, o.n ?? 5)), tr = o.traza == null ? 1 : g_hyCl(o.traza);
  g_hyPegar(R, g_hyCapa(R, 'pizarra', () => g_hyPizarraFijo(R)));
  const [bx0, by0, bx1, by1] = G.blanca, caja = [bx0 + 2, by0 + 2, bx1 - 2, by1 - 2];
  { const u = ((t * 0.07) % 1) * 1.6 - 0.3; for (let y = by0 + 2; y <= by1 - 2; y++) for (let d = 0; d < 14; d++) { const x = Math.round(bx0 + u * (bx1 - bx0) + d - (y - by0) * 0.6); if (x > bx0 + 1 && x < bx1 - 1 && g_hyB4(x, y) < (d > 3 && d < 10 ? 0.5 : 0.2)) g_hyTinta(R, x, y, K.blanco, 0.7); } }
  const tipos = n === 3 ? ['radarMano', 'radarMano', 'radarMano'] : ['radarMano', 'radarMano', 'radarMano', 'radarCarrito', 'gravimetro'].slice(0, n);
  const resp = o.respuestas ?? (n === 3 ? ['✓', '✗', '✗'] : ['✓', '✗', '✗', '?', '?']).slice(0, n), paso = (bx1 - bx0 - 16) / n, iconos = [];
  for (let x = bx0 + 8; x <= bx1 - 8; x += 3) if (((x / 3) | 0) % 2) pset(x, G.fila, E.rotN);
  for (let i = 0; i < n; i++) { const cx = Math.round(bx0 + 8 + paso * (i + 0.5)), f = g_hyCl(tr * n - i); iconos.push([cx, G.iconoY]); if (f <= 0) continue;
    g_hyDibujo(R, G_HYDIB[tipos[i]], cx, G.iconoY, 3, f / 0.8, caja);
    if (f >= 0.8 && G_HYRESP[resp[i]]) { const s = g_hyCl((f - 0.8) / 0.2); g_hyDibujo(R, G_HYRESP[resp[i]], cx, G.respY + Math.round((1 - s) * 4), 3, 1, caja); }
    for (let k = 0; k < 3; k++) pset(cx - 4 + k * 4, G.fila + 4, E.rotN); }
  // la punta del rotulador mientras dibuja
  if (tr > 0 && tr < 1) { const i = Math.min(n - 1, Math.floor(tr * n)), f = tr * n - i, cx = Math.round(bx0 + 8 + paso * (i + 0.5)) + Math.round(Math.sin(t * 14) * 8), cy = G.iconoY - 16 + Math.round(g_hyCl(f / 0.8) * 32); pset(cx, cy, E.rotN); pset(cx + 1, cy - 1, E.rotN); }
  g_hyCaballete(R, t);
  if (Math.sin(t * 1.3) > -0.2) { pset(12, 73, K.luz); pset(11, 74, K.luz); pset(13, 74, K.luz); }
  g_hyPolilla(R, 12, 82, t, 8, 5, 1);
  for (let k = 0; k < 7; k++) { const a = -2.6 + k * 0.38 + Math.sin(t * 1.2 + k) * 0.05, l = 16 + (k % 3) * 6; for (let i = 0; i < l; i++) { const x = Math.round(308 + Math.cos(a) * i), y = Math.round(139 + Math.sin(a) * i + i * i * 0.02); if (x < 320) pset(x, y, i % 4 ? K.hoja : K.hojaL); } }
  return { iconos, pizarra: G.pizarra.slice() };
}

// EL CABALLETE: las patas, el travesaño y la bandeja de aluminio con los cuatro rotuladores (uno rueda un poco) y el
// borrador; va en hoy(), por detrás de quien señala
function g_hyCaballete(R, t) {
  const K = g_hyK, E = g_hyE, { rect, pset, linea } = R, [x0, , x1, y1] = G_HYPIZ.pizarra;
  for (const [xa, xb] of [[70, 62], [250, 258]]) for (let y = y1; y <= 168; y++) { const x = Math.round(xa + (xb - xa) * (y - y1) / (168 - y1)); rect(x - 2, y, x + 2, y, K.k); rect(x - 1, y, x + 1, y, K.nogal); pset(x - 1, y, K.nogalL); }
  rect(66, 156, 254, 158, K.k); rect(67, 157, 253, 157, K.nogalL); for (const x of [62, 258]) { rect(x - 3, 167, x + 3, 169, K.k); }
  rect(x0 + 2, y1, x1 - 2, y1 + 4, K.k); rect(x0 + 3, y1 + 1, x1 - 3, y1 + 2, E.alu); rect(x0 + 3, y1 + 1, x1 - 3, y1 + 1, E.aluL); rect(x0 + 3, y1 + 3, x1 - 3, y1 + 3, E.aluS);
  const roda = Math.round(Math.sin(t * 0.9) * 3);
  for (const [x, c] of [[118, E.rotN], [128, E.rotA], [138 + roda, E.rotR], [148, E.rotV]]) { rect(x, y1 - 1, x + 7, y1, K.k); rect(x + 1, y1 - 1, x + 5, y1 - 1, E.aluL); rect(x + 6, y1 - 1, x + 7, y1, c); }
  rect(196, y1 - 4, 214, y1, K.k); rect(197, y1 - 3, 213, y1 - 2, E.rotA); rect(197, y1 - 1, 213, y1 - 1, E.fieltro); rect(197, y1 - 3, 213, y1 - 3, hex('#5a7ad8'));
}

// DELANTE DE LA PIZARRA: nada (quien la señala está delante del caballete); devuelve la bandeja
function g_hyPizarraDelante(R, t, o = {}) {
  const [x0, , x1, y1] = G_HYPIZ.pizarra;
  return { bandeja: [x0 + 2, y1, x1 - 2, y1 + 4] };
}

const G_HYFIN = { pizarra: [6, 26, 272, 152], fila: 134, ultimo: [96, 100], camarita: [216, 100], recuadro: [216, 50] };

function g_hyFinalFijo(R) {
  const K = g_hyK, E = g_hyE, { rect, pset, linea } = R, [x0, y0, x1, y1] = G_HYFIN.pizarra;
  g_hyPapelEg(R, 0, 0, 319, 179, 2, (x, y) => (x >= 256 && y <= 56) || (y <= 32 && x <= 214));
  // el friso de abajo con sus cuarterones (marco, tablero rehundido con su luz y su sombra, y el moteado de la pintura)
  rect(0, 158, 319, 179, K.friso); rect(0, 158, 319, 159, K.frisoL); rect(0, 160, 319, 160, K.frisoD); rect(0, 161, 319, 161, K.frisoS);
  for (let x = -22; x < 320; x += 56) { rect(x, 165, x + 46, 179, K.frisoS); rect(x, 165, x + 46, 165, K.frisoD); rect(x, 165, x, 179, K.frisoD); rect(x + 46, 166, x + 46, 179, K.frisoL);
    rect(x + 3, 168, x + 43, 179, K.friso); rect(x + 3, 168, x + 43, 168, K.frisoL); rect(x + 43, 169, x + 43, 179, K.frisoD);
    for (let y = 169; y < 180; y++) for (let i = 4; i < 43; i++) if (h((x + i) >> 2, y >> 1, 193) < 0.1) pset(x + i, y, K.frisoS); }
  for (let y = y0 + 4; y <= y1 + 6; y++) for (let x = x1; x <= x1 + 5; x++) if (x > x1) g_hyTinta(R, x, y, K.k, 0.3);
  g_hyBlanca(R, x0, y0, x1, y1);
  // la bandeja con los rotuladores y el borrador
  rect(x0 + 2, y1, x1 - 2, y1 + 6, K.k); rect(x0 + 3, y1 + 1, x1 - 3, y1 + 3, E.alu); rect(x0 + 3, y1 + 1, x1 - 3, y1 + 1, E.aluL); rect(x0 + 3, y1 + 4, x1 - 3, y1 + 5, E.aluS);
  for (const [x, c] of [[40, E.rotN], [60, E.rotA], [80, E.rotV]]) { rect(x, y1 - 2, x + 14, y1, K.k); rect(x + 1, y1 - 2, x + 10, y1 - 1, E.aluL); rect(x + 11, y1 - 2, x + 14, y1, c); }
  rect(222, y1 - 8, 256, y1, K.k); rect(223, y1 - 7, 255, y1 - 3, E.rotA); rect(223, y1 - 7, 255, y1 - 7, hex('#5a7ad8')); rect(223, y1 - 2, 255, y1 - 1, E.fieltro);
  // a la derecha, el canto de la librería (por debajo de la esquina de Atom), con sus baldas y lomos en escorzo
  rect(288, 60, 319, 159, K.k); rect(289, 61, 300, 159, K.nogal); rect(289, 61, 290, 159, K.nogalL); rect(301, 61, 319, 159, K.nogalD); rect(286, 58, 319, 61, K.k); rect(287, 59, 319, 60, K.nogalL);
  [88, 120, 152].forEach((by, b) => { rect(301, by, 319, by + 2, K.nogalL); rect(301, by + 3, 319, by + 3, K.nogalS); for (let x = 302, n = 0; x < 318; n++) { const w = 2 + Math.floor(h(x, b, 191) * 2); g_hyLomo(R, x, by - 1, w, 18 + Math.floor(h(x, b, 192) * 8), [K.rojo, K.azul, K.oroS, K.friso, K.cortina, K.verdeS][(n + b) % 6], n); x += w; } });
  // la raya de la fila y la flecha (a trazos) que va del último estudio a la camarita
  for (let x = x0 + 4; x <= x1 - 4; x += 3) if (((x / 3) | 0) % 2) { pset(x, G_HYFIN.fila, E.rotN); pset(x, G_HYFIN.fila + 1, E.rotN); }
  for (let x = 140; x <= 182; x++) if ((x >> 2) % 2) { pset(x, 100, E.rotN); pset(x, 101, E.rotN); } for (let j = 0; j < 7; j++) { pset(184 - j, 100 - j, E.rotN); pset(184 - j, 101 + j, E.rotN); pset(185 - j, 100 - j, E.rotN); pset(185 - j, 101 + j, E.rotN); }
}
// EL FINAL DE LA FILA (cámara 'final'): el cuarto estudio cortado por el borde, el último (el gravímetro) con su «?», la
// flecha y LA CAMARITA dibujada de perfil (o.ojo 0–1, por omisión 0: le pinta un ojo que se abre y parpadea) y, encima, el RECUADRO
// vacío de su respuesta, a trazos que corren y que late. Vida: el brillo que cruza y el rotulador azul que rueda
function g_hyFinal(R, t, o = {}) {
  const K = g_hyK, E = g_hyE, { pset, linea, disco } = R, G = G_HYFIN, [x0, y0, x1, y1] = G.pizarra, caja = [x0 + 3, y0 + 3, x1 - 3, y1 - 3], oj = o.ojo == null ? 0 : g_hyCl(o.ojo);
  g_hyPegar(R, g_hyCapa(R, 'final', () => g_hyFinalFijo(R)));
  { const u = ((t * 0.06) % 1) * 1.6 - 0.3; for (let y = y0 + 3; y <= y1 - 3; y++) for (let d = 0; d < 20; d++) { const x = Math.round(x0 + u * (x1 - x0) + d - (y - y0) * 0.6); if (x > x0 + 2 && x < x1 - 2 && g_hyB4(x, y) < (d > 5 && d < 14 ? 0.5 : 0.2)) g_hyTinta(R, x, y, K.blanco, 0.7); } }
  g_hyDibujo(R, G_HYDIB.radarCarrito, 10, 100, 3, 1, caja); g_hyDibujo(R, G_HYRESP['?'], 14, 50, 3, 1, caja);
  g_hyDibujo(R, G_HYDIB.gravimetro, ...G.ultimo, 3); g_hyDibujo(R, G_HYRESP['?'], G.ultimo[0], 50, 3);
  // la camarita, colgada de su cable, con el ojo (un óvalo con la pupila) que se abre y parpadea
  const [cx, cy] = G.camarita, mece = Math.round(Math.sin(t * 1.4) * 1.5); for (let y = y0 + 3; y < cy - 16; y++) { pset(cx + Math.round(mece * (y - y0) / (cy - y0)), y, E.rotN); }
  g_hyDibujo(R, G_HYDIB.camarita, cx + mece, cy, 3);
  // sin ojo, la camarita se lee de perfil: el objetivo que asoma a la derecha (con su brillo azul), el visor de arriba
  // y el pilotito rojo de grabar, que parpadea
  if (oj <= 0) { const X = cx + mece, rr = R.rect;
    for (let k = 0; k <= 9; k++) { const a = k < 4 ? 4 : 4 + ((k - 3) >> 1); rr(X + 17 + k, cy - 1 - a, X + 17 + k, cy + 1 + a, E.rotN); } rr(X + 22, cy - 4, X + 25, cy - 3, E.rotA); rr(X + 24, cy - 2, X + 24, cy - 2, E.rotA);
    rr(X - 13, cy - 16, X - 2, cy - 14, E.rotN); rr(X - 13, cy - 16, X - 11, cy - 11, E.rotN); rr(X - 4, cy - 16, X - 2, cy - 11, E.rotN);
    if ((t % 1.2) < 0.75) { rr(X + 8, cy - 7, X + 10, cy - 5, E.rotR); } }
  if (oj > 0) { const ex = cx + mece, ey = cy + 2, pp = (t % 3.7) > 3.55 ? 0 : oj, a = Math.round(pp * 6);
    for (let i = -11; i <= 11; i++) { const yy = Math.round(Math.sqrt(Math.max(0, 1 - (i / 11.5) ** 2)) * a); pset(ex + i, ey - yy, E.rotN); pset(ex + i, ey + yy, E.rotN); if (yy > 0) { pset(ex + i, ey - yy - 1, E.rotN); } }
    if (a > 2) { disco(ex + Math.round(Math.sin(t * 0.8) * 3), ey, Math.min(4, a - 1), E.rotA); disco(ex + Math.round(Math.sin(t * 0.8) * 3), ey, Math.min(2, a - 3), E.rotN); pset(ex + Math.round(Math.sin(t * 0.8) * 3) - 1, ey - 1, E.pb); } }
  // el recuadro vacío de la respuesta: trazos que corren y que laten
  { const [rx, ry] = G.recuadro, lado = 13 + Math.round((Math.sin(t * 3) + 1) * 0.8), fase = Math.floor(t * 6); for (let k = -lado; k <= lado; k++) for (const [x, y] of [[rx + k, ry - lado], [rx + k, ry + lado], [rx - lado, ry + k], [rx + lado, ry + k]]) if (((k + fase) >> 2) % 2 === 0) { pset(x, y, E.rotR); pset(x + (x === rx - lado ? 1 : x === rx + lado ? -1 : 0), y + (y === ry - lado ? 1 : y === ry + lado ? -1 : 0), E.rotR); } }
  // el rotulador azul de la bandeja, que rueda un poco
  { const x = 60 + Math.round(Math.sin(t * 0.8) * 4); R.rect(58, y1 - 2, 76, y1, E.alu); R.rect(x, y1 - 2, x + 14, y1, K.k); R.rect(x + 1, y1 - 2, x + 10, y1 - 1, E.aluL); R.rect(x + 11, y1 - 2, x + 14, y1, E.rotA); }
  return { camarita: [cx + mece, cy], recuadro: G.recuadro, ultimo: G.ultimo };
}
const G_HYCAJ = { suelo: 162, ventana: [24, 34, 92, 104], mesa: [96, 133, 224, 140], caja: [126, 93, 188, 140], agujero: [151, 121], cajaPie: [160, 144], sillon: [238, 300], gato: [270, 136], lamina: [160, 52], lampara: [224, 64] };

function g_hyCajaFijo(R) {
  const K = g_hyK, E = g_hyE, { rect, pset, linea, disco, poligono } = R, G = G_HYCAJ;
  g_hyPapelEg(R, 0, 6, 319, 103, 1, (x, y) => (x >= 258 && y <= 54) || y <= 27);
  rect(0, 0, 319, 3, K.moldura); rect(0, 4, 319, 4, K.molduraS); rect(0, 5, 319, 5, K.nogalL); for (let x = 0; x < 320; x++) if (x % 12 === 3) pset(x, 2, K.molduraS);
  g_hyCenefa(R); g_hyRayas(R, 25); g_hyGreca(R, 104, 1);
  rect(0, 115, 319, 152, K.friso); rect(0, 115, 319, 115, K.frisoL); rect(0, 117, 319, 117, K.frisoD); rect(0, 149, 319, 152, K.frisoS); rect(0, 149, 319, 149, K.frisoL); rect(0, 152, 319, 152, K.frisoD);
  for (let x = 4; x < 320; x += 28) { rect(x, 120, x + 22, 146, K.frisoS); rect(x, 120, x, 146, K.frisoD); rect(x + 22, 121, x + 22, 146, K.frisoL); rect(x + 3, 123, x + 19, 143, K.friso); rect(x + 3, 123, x + 19, 123, K.frisoL); rect(x + 19, 124, x + 19, 143, K.frisoD); for (let y = 124; y < 142; y++) for (let i = 5; i < 18; i++) if (h((x + i) >> 1, y >> 2, 171) < 0.12) pset(x + i, y, K.frisoS); }
  g_hyTarima(R, 153, 179, [153, 157, 162, 168, 175]); for (let x = 0; x < 320; x++) { pset(x, 153, K.tarimaD); if (!(x & 1)) pset(x, 154, K.tarimaD); }
  // la alfombra redonda bajo la mesa baja
  for (let y = 154; y <= 179; y++) for (let x = 70; x <= 250; x++) { const d = Math.hypot((x - 160) / 92, (y - 168) / 13); if (d > 1) continue; pset(x, y, d > 0.93 ? K.alfombraL : d > 0.84 ? ((x + y) % 4 ? K.alfombraR : K.cortinaS) : d > 0.78 ? K.alfombraL : (Math.abs(d - 0.45) < 0.05) ? K.alfombraR : d < 0.16 ? K.alfombraR : (x + y) % 2 && h(x, y, 172) < 0.3 ? K.alfombraS : K.alfombra); }
  // LA VENTANA (el cristal queda vacío para la tarde), con su alféizar, la cortina recogida y el radiador debajo
  { const [a, b, c, d] = G.ventana; rect(a - 5, b - 5, c + 5, d + 5, K.k); rect(a - 4, b - 4, c + 4, d + 4, K.marco); rect(a - 4, b - 4, c + 4, b - 4, K.blanco); rect(a - 1, b - 1, c + 1, d + 1, K.marcoS); rect(a, b, c, d, G_HYVACIO); rect(57, b, 59, d, K.marco); rect(59, b, 59, d, K.marcoS); rect(a, 66, c, 67, K.marco); rect(a, 68, c, 68, K.marcoS);
    rect(a - 9, d + 3, c + 9, d + 7, K.k); rect(a - 8, d + 4, c + 8, d + 5, K.blanco); rect(a - 8, d + 6, c + 8, d + 6, K.marcoS);
    rect(80, d - 5, 88, d, K.barro); rect(80, d - 5, 88, d - 5, K.barroL); for (let k = 0; k < 5; k++) linea(84, d - 6, 80 + k * 2, d - 13 + (k % 2) * 2, K.hoja);
    for (let y = b - 6; y <= 122; y++) { const at = Math.abs(y - 80) < 3, w = at ? 6 : y < 80 ? 13 - (y - b) * 0.04 : Math.max(7, 13 - (y - 80) * 0.15); for (let i = 0; i <= w; i++) { const x = c + 6 + i, f = Math.sin(i * 1.2 + y * 0.03); pset(x, y, at ? K.oroS : i === 0 || i >= w - 0.9 ? K.cortinaD : f > 0.5 ? K.cortinaL : f < -0.5 ? K.cortinaS : K.cortina); } }
    rect(a - 6, b - 8, c + 26, b - 7, K.k); rect(a - 5, b - 8, c + 25, b - 8, K.oro);
    rect(30, 120, 88, 146, K.k); for (let x = 31; x <= 87; x += 4) { rect(x, 121, x + 2, 145, K.metal); rect(x, 121, x, 145, K.metalL); rect(x + 2, 121, x + 2, 145, K.metalS); } rect(31, 121, 87, 122, K.metalL); rect(31, 144, 87, 145, K.metalS); disco(90, 140, 2, K.k); pset(90, 140, K.oro); }
  // la lámina de la barca sobre la mesa baja y la lámpara de pie, encendida
  // (la lámina se pega aquí, derecha)
  g_hyCuelga(R, g_hyLamina('falucca', 52, 32), 52, 32, ...G.lamina, 0);
  { const [lx, ly] = G.lampara; rect(lx - 1, ly, lx, 160, K.k); rect(lx, ly, lx, 160, K.oroS); rect(lx - 7, 159, lx + 6, 161, K.k); rect(lx - 6, 159, lx + 5, 160, K.oroS); poligono([[lx - 11, ly + 2], [lx + 10, ly + 2], [lx + 6, ly - 16], [lx - 7, ly - 16]], K.k); poligono([[lx - 10, ly + 1], [lx + 9, ly + 1], [lx + 5, ly - 15], [lx - 6, ly - 15]], K.luz); rect(lx - 6, ly - 15, lx + 5, ly - 15, K.blanco); for (let y = ly - 12; y < ly + 1; y += 3) rect(lx - 9, y, lx + 8, y, K.sol);
    for (let y = ly + 3; y <= ly + 40; y++) for (let x = lx - 30; x <= lx + 30; x++) if (Math.abs(x - lx) < (y - ly) * 0.8 && g_hyB4(x, y) < 0.3 && R.pget(x, y) === K.pared) pset(x, y, K.paredL); }
  // EL SILLÓN mostaza con su cojín (el gato lo pinta g_hyCaja)
  { const x0 = G.sillon[0], x1 = G.sillon[1]; rect(x0 + 3, 150, x0 + 5, 156, K.k); rect(x1 - 5, 150, x1 - 3, 156, K.k);
    rect(x0 + 4, 104, x1 - 4, 150, K.k); rect(x0 + 5, 105, x1 - 5, 149, K.sillon); rect(x0 + 5, 105, x1 - 5, 106, K.sillonL); for (let y = 108; y < 134; y++) for (let x = x0 + 6; x < x1 - 5; x++) if ((x + y) % 5 === 0 && h(x, y, 173) < 0.5) pset(x, y, K.sillonS); for (const bx of [x0 + 16, x0 + 30, x0 + 44]) pset(bx, 118, K.sillonD);
    rect(x0, 122, x0 + 9, 150, K.k); rect(x0 + 1, 123, x0 + 8, 149, K.sillon); rect(x0 + 1, 123, x0 + 8, 124, K.sillonL); rect(x0 + 8, 125, x0 + 8, 149, K.sillonS); rect(x1 - 9, 122, x1, 150, K.k); rect(x1 - 8, 123, x1 - 1, 149, K.sillon); rect(x1 - 8, 123, x1 - 1, 124, K.sillonL); rect(x1 - 8, 125, x1 - 8, 149, K.sillonS);
    rect(x0 + 10, 136, x1 - 10, 137, K.sillonL); rect(x0 + 10, 138, x1 - 10, 149, K.sillonS); rect(x0 + 10, 143, x1 - 10, 143, K.sillonD); for (let x = x0 + 11; x < x1 - 10; x += 2) pset(x, 149, K.sillonD);
    rect(x1 - 24, 116, x1 - 12, 130, K.k); rect(x1 - 23, 117, x1 - 13, 129, K.friso); for (let y = 117; y <= 129; y++) for (let x = x1 - 23; x <= x1 - 13; x++) if ((x - y) % 4 === 0) pset(x, y, K.alfombraL); }
  // la cara de arriba de la mesa baja (la caja se apoya en ella; el canto y las patas van en hoyDelante)
  { const [a, b, c, d] = G.mesa; rect(a, b, c, d, K.k); for (let y = b + 1; y <= d; y++) for (let x = a + 1; x < c; x++) { const v = Math.sin(x * 0.09 + y * 0.6) + (h(x >> 3, y, 174) - 0.5); pset(x, y, y === b + 1 ? K.nogalB : v > 0.8 ? K.nogalB : v < -0.6 ? K.nogal : K.nogalL); } }
  // un libro en la mesa baja
  rect(196, 129, 216, 134, K.k); rect(197, 130, 215, 131, K.verdeS); rect(197, 130, 215, 130, K.verde); rect(197, 132, 215, 133, K.papel);
  // LA LUZ DE LA TARDE: todo un poco más cálido (una vez, en la capa fija)
  for (let i = 0; i < 320 * 180; i++) { const c = R.buf[i]; if (c !== G_HYVACIO) R.buf[i] = g_hyMez(c, E.tarde, 0.13); }
}

// LA TARDE POR LA VENTANA, recortada a su hueco: el cielo de melocotón a rosa, el sol bajo con su halo, nubes de tres
// tonos cálidos a tres velocidades, pájaros, los tejados y los árboles a contraluz
function g_hyVistaTarde(R, t, x0, y0, x1, y1) {
  const K = g_hyK, E = g_hyE, hor = y0 + Math.round((y1 - y0) * 0.66);
  R.recorte([x0, y0, x1, y1]);
  g_hyDegradado(R, x0, y0, x1, hor, [E.tarde5, E.tarde4, E.tarde3, E.tarde2, E.tarde1, E.tarde0], 1.1);
  const sx = x0 + 44, sy = hor - 8; for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j); if (d < 4.5) R.pset(sx + i, sy + j, d < 3 ? hex('#fffbe8') : E.tardeL); else if (d < 13 && g_hyB4(sx + i, sy + j) < (13 - d) / 16) R.pset(sx + i, sy + j, E.tardeL); }
  const N = [hex('#fff0d8'), hex('#ffd8b0'), hex('#f0a888'), hex('#c87a88')];
  for (const [fy, s, v, n, kk] of [[0.3, 0.45, 1, 3, 0], [0.55, 0.65, 2.2, 2, 1], [0.8, 0.9, 3.6, 2, 2]]) for (let i = 0; i < n; i++) { const w = x1 - x0 + 70, cx = x0 - 35 + (((h(i, kk, 175) * w + t * v + i * w / n) % w) + w) % w; g_hyNube(R, Math.round(cx), Math.round(y0 + (hor - y0) * fy), Math.round((24 + h(i, kk, 176) * 18) * s), i * 5 + kk * 17, kk === 0 ? [N[1], N[1], N[2], N[3]] : N, x0, x1, y0); }
  for (let k = 0; k < 3; k++) { const u = ((t * (4 + k * 2) + k * 23) % (x1 - x0 + 30)); g_hyPajaro(R, Math.round(x1 + 10 - u), y0 + 10 + k * 7 + Math.round(Math.sin(t * 1.3 + k) * 2), t, k, hex('#5a3a4a'), x0, x1); }
  for (let x = x0; x <= x1; x++) { const b = Math.floor((x - x0) / 9), a = 4 + Math.round(h(b, 2, 177) * 7), te = (x - x0) % 9; for (let y = hor - a - 3; y <= hor; y++) R.pset(x, y, y === hor - a - 3 ? hex('#8a4a4a') : te === 0 ? hex('#7a5a6a') : (te === 3 || te === 6) && (y - hor + a) % 4 === 1 ? hex('#ffd890') : hex('#9a6a74')); }
  for (let y = hor + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, h(x, y, 178) < 0.12 ? hex('#6a8a48') : (y - hor) < 3 ? hex('#3e5a3a') : ((x + (y - hor) * 2) >> 3) & 1 ? hex('#56783e') : hex('#4a6a3a'));
  for (const [dx, r, k] of [[10, 9, 0], [58, 8, 1]]) { const m = Math.round(Math.sin(t * 0.9 + k * 2) * 1.2), cx = x0 + dx; R.linea(cx, hor - 2, cx, hor + 7, hex('#3a2a2a')); R.disco(cx + m, hor - r, r, hex('#2e3e34')); R.disco(cx + m - 2, hor - r - 2, r - 3, hex('#4a5a3a')); R.disco(cx + m + 2, hor - r - 3, Math.max(1, r - 6), hex('#c89a5a')); }
  R.recorte(null);
}

// EL ESTUDIO A MEDIA TARDE (encuadre 'caja'): la tarde por la ventana, el haz de sol que cruza en diagonal hasta el
// suelo con sus motas, LA CAJA grande sobre la mesa baja (o.agujero 0–1: el agujerito se abre; o.luz 0–1: luz dentro,
// que asoma por él), su sombra larga, la lámpara que respira y el gato en el sillón, que no le quita ojo a la caja
function g_hyCaja(R, t, o = {}) {
  const K = g_hyK, E = g_hyE, { pset, disco } = R, G = G_HYCAJ, ag = g_hyCl(o.agujero || 0), lu = g_hyCl(o.luz || 0);
  g_hyVistaTarde(R, t, ...G.ventana);
  g_hyPegar(R, g_hyCapa(R, 'caja', () => g_hyCajaFijo(R)));
  // el reflejo del cristal
  { const u = ((t * 0.08) % 1) * 100 - 20; for (let j = 0; j < 70; j++) for (const d of [0, 7]) { const x = Math.round(G.ventana[0] + u + d - j * 0.5), y = G.ventana[1] + j; if (x >= G.ventana[0] && x <= G.ventana[2] && (x < 57 || x > 59) && (y < 66 || y > 68) && (j + d) % 3 === 0) g_hyTinta(R, x, y, K.blanco, 0.4); } }
  // el haz de sol: sale de la ventana y cae en diagonal hasta la tarima, a la derecha, con la sombra de los barrotes
  for (let y = 112; y <= 179; y++) { const u = (y - 112) / 67, xa = Math.round(70 + u * 70), xb = Math.round(110 + u * 96); for (let x = xa; x <= xb; x++) { const v = (x - xa) / (xb - xa); if (Math.abs(v - 0.48) < 0.04) continue; if (g_hyB4(x, y) < (y > 153 ? 0.5 : 0.22)) g_hyTinta(R, x, y, E.tardeL, 0.33); } }
  for (let k = 0; k < 10; k++) { const x = 80 + Math.round(h(k, 1, 179) * 110 + Math.sin(t * 0.5 + k) * 3), y = 112 + Math.round((h(k, 2, 179) * 60 + t * (1.5 + k % 3)) % 60); if (Math.sin(t * 1.4 + k * 1.9) > 0.2) pset(x, y, E.tardeL); }
  // la caja, con su sombra larga hacia la derecha
  for (let y = 128; y <= 140; y++) for (let x = 186; x <= 222; x++) if (x - 186 < (y - 126) * 2.6 && g_hyB4(x, y) < 0.6) g_hyTinta(R, x, y, K.k, 0.35);
  PIEZAS_TU.caja?.(R, ...G.cajaPie, { s: 3 });
  { const ax = 136, ay = 110; for (let j = 0; j < 5; j++) { pset(ax - j, ay + j, E.cartonD); pset(ax + j, ay + j, E.cartonD); } for (let j = 1; j < 16; j++) { pset(ax, ay + j, E.cartonD); pset(ax + 1, ay + j, E.cartonS); } }   // la flecha de «arriba» impresa (sin letras)
  g_hyEtiquetaCaja(R, 159, 124);
  if (ag > 0) { const [hx, hy] = G.agujero, r = ag < 0.5 ? 1 : ag < 0.85 ? 2 : 3; disco(hx, hy, r + 1, E.cartonD); disco(hx, hy, r, lu > 0 ? E.tardeL : E.cartonNN); if (lu > 0.3 && r > 1) disco(hx, hy, r - 1, hex('#fffbe0')); pset(hx - r, hy - r, E.cartonL);
    if (ag < 1) for (let k = 0; k < 3; k++) { const a = t * 5 + k * 2.1; pset(Math.round(hx + Math.cos(a) * (r + 3)), Math.round(hy + 2 + Math.abs(Math.sin(a)) * 3), E.cartonS); } }
  if (Math.sin(t * 1.3) > -0.2) { const [lx, ly] = G.lampara; pset(lx, ly + 2, K.luz); pset(lx - 1, ly + 3, K.luz); pset(lx + 1, ly + 3, K.luz); }
  g_hyPolilla(R, G.lampara[0], G.lampara[1] - 4, t, 9, 5, 2);
  if (o.gato !== false) g_hyGato(R, ...G.gato, t, { dir: -1 });
  return { caja: G.caja.slice(), agujero: G.agujero.slice(), mesa: G.mesa.slice() };
}
// DELANTE EN LA CAJA: el canto y las patas de la mesa baja (la caja ya está apoyada en su cara de arriba), con su sombra
function g_hyCajaDelante(R, t, o = {}) {
  const K = g_hyK, { rect, pset } = R, [a, , c, d] = G_HYCAJ.mesa;
  for (let x = a; x <= c + 4; x++) for (let y = 162; y <= 166; y++) if (g_hyB4(x, y) < 0.5) g_hyTinta(R, x, y, K.k, 0.35);
  rect(a - 2, d + 1, c + 2, d + 8, K.k); rect(a - 1, d + 2, c + 1, d + 7, K.nogal); rect(a - 1, d + 2, c + 1, d + 2, K.nogalB); rect(a - 1, d + 7, c + 1, d + 7, K.nogalS); for (let x = a; x < c; x++) if (h(x >> 3, 1, 180) < 0.3) pset(x, d + 4, K.nogalS);
  for (const x of [a + 4, c - 10]) { rect(x, d + 8, x + 6, 164, K.k); rect(x + 1, d + 8, x + 5, 163, K.nogal); rect(x + 1, d + 8, x + 1, 163, K.nogalL); rect(x + 5, d + 8, x + 5, 163, K.nogalS); }
  return { mesa: G_HYCAJ.mesa.slice() };
}

const G_HYDEN = { fondo: [70, 36, 250, 122], otra: [137, 110, 179, 144], otraPie: [160, 146], otraAgujero: [154, 131], foco: [-30, 40], charco: [158, 146] };
function g_hyDentroFijo(R) {
  const K = g_hyK, E = g_hyE, { pset, linea } = R, [fx0, fy0, fx1, fy1] = G_HYDEN.fondo;
  // las cinco caras de cartón en perspectiva, con su canal (las líneas de la onda) y su ruido
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let cara, c;
    const techo = x < fx0 ? y < fy0 * x / fx0 : x > fx1 ? y < fy0 * (319 - x) / (319 - fx1) : y < fy0;
    const suelo = y > fy1 && (x < fx0 ? y > fy1 + (fx0 - x) * (179 - fy1) / (fx0 + 40) : x > fx1 ? y > fy1 + (x - fx1) * (179 - fy1) / (360 - fx1) : true);
    if (x >= fx0 && x <= fx1 && y >= fy0 && y <= fy1) cara = 0; else if (suelo) cara = 1; else if (techo) cara = 2; else cara = x < 160 ? 3 : 4;
    const n = h(x >> 1, y >> 2, 181), base = [E.cartonN, hex('#3a2612'), hex('#1c1208'), hex('#2e1e0e'), hex('#2a1a0c')][cara];
    if (cara === 0) c = x % 4 === 0 ? E.cartonNN : n < 0.1 ? E.cartonD : base;
    else if (cara === 1) { const k = Math.round((x - 160) * (fy1 - fy0) / (y - fy0 + 1)) ; c = (k % 7 === 0) ? E.cartonNN : n < 0.08 ? E.cartonN : base; }
    else if (cara === 2) c = x % 9 === 0 ? E.cartonNN : base;
    else c = y % 4 === 0 ? E.cartonNN : n < 0.08 ? E.cartonN : base;
    pset(x, y, c);
  }
  // las aristas de la caja (un poco más claras) y la junta de las solapas arriba, con su rendija de luz
  for (let i = 0; i <= 100; i++) { const u = i / 100, y = Math.round(fy0 * u); if (y < 22) continue; pset(Math.round(fx0 * u), y, E.cartonD); const xr = Math.round(319 + (fx1 - 319) * u); if (!(xr >= 274 && y <= 48)) pset(xr, y, E.cartonD); } linea(fx0, fy0, fx1, fy0, E.cartonD); linea(fx0, fy0, fx0, fy1, E.cartonD); linea(fx1, fy0, fx1, fy1, E.cartonD); linea(fx0, fy1, fx1, fy1, E.cartonD); linea(fx0, fy1, -40, 179, E.cartonD); linea(fx1, fy1, 360, 179, E.cartonD);
  for (let y = 24; y < fy0; y++) { const x = 160; pset(x, y, y % 5 === 0 ? hex('#6a4a28') : hex('#4a3018')); }
  // la cinta de embalar por dentro del fondo, una grapa y la flecha de «arriba» impresa (vista del revés, sin letras)
  for (let y = 70; y <= 78; y++) for (let x = fx0 + 1; x < fx1; x++) pset(x, y, y === 70 || y === 78 ? E.cartonN : (x + y) % 6 === 0 ? hex('#6a5030') : hex('#5a4228'));
  for (const [x, y] of [[96, 52], [224, 52], [96, 104], [224, 104]]) { pset(x, y, K.metalS); pset(x + 1, y, K.metalS); pset(x + 2, y, K.metalD); }
  { const ax = 200, ay = 92; for (let j = 0; j < 8; j++) { pset(ax - j, ay + j, hex('#5a3c1e')); pset(ax + j, ay + j, hex('#5a3c1e')); } for (let j = 2; j < 18; j++) pset(ax, ay + j, hex('#5a3c1e')); }
}

// DENTRO DE LA CAJA (cámara 'dentro'): el interior a oscuras, con la rendija de las solapas que respira y motas que
// flotan en su luz; o.luz 0–1: el rayo de la linterna entra por el agujerito (desde arriba a la izquierda, por detrás de
// la cámara) en cono, con motas de polvo que brillan en él, y deja un círculo de luz en el suelo que enciende el
// cartón de alrededor (la linterna tiembla un poco en la mano); o.otra 0–1: en ese círculo aparece OTRA CAJA más
// pequeña, igual, cerrada, con su propio agujerito y su sombra hacia el fondo (sale de la oscuridad: de 0, apagada,
// a 1, iluminada). Devuelve otra [x0, y0, x1, y1] y otraAgujero [x, y]
function g_hyDentro(R, t, o = {}) {
  const E = g_hyE, G = G_HYDEN, lu = g_hyCl(o.luz || 0), ot = g_hyCl(o.otra || 0), d = R.buf;
  const bO = g_hyCapa(R, 'dentro', () => g_hyDentroPinta(R, 0)), bL = g_hyCapa(R, 'dentroL', () => g_hyDentroPinta(R, 1));
  g_hyPegar(R, bO);
  // la rendija de las solapas, que respira, y motas que bajan despacio por su luz
  const rend = 0.5 + 0.5 * Math.sin(t * 0.7); for (let y = 23; y < G.fondo[1]; y++) if (g_hyB4(160, y) < 0.35 + rend * 0.5) R.pset(160, y, y % 4 ? hex('#8a6a3a') : hex('#b08c50'));
  for (let k = 0; k < 7; k++) { const x = 160 + Math.round(Math.sin(t * 0.6 + k * 1.9) * (6 + k * 2)), y = 40 + Math.round((h(k, 3, 201) * 60 + t * (1.2 + (k % 3) * 0.6)) % 60); if (Math.sin(t * 1.2 + k * 2.3) > -0.1) R.pset(x, y, hex('#7a5c34')); }
  if (lu > 0) {
    // la linterna tiembla un poco en la mano: el foco y el círculo se mueven a la vez
    const fx = G.foco[0] + Math.sin(t * 1.7) * 1.5, fy = G.foco[1] + Math.cos(t * 1.3) * 1.2, ox = G.charco[0] + Math.round(Math.sin(t * 1.7) * 1.2), oy = G.charco[1] + Math.round(Math.cos(t * 1.3) * 0.8);
    const vx = ox - fx, vy = oy - fy, Lh = Math.hypot(vx, vy), cal = hex('#ffe6a0');
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const i = y * 320 + x, b = g_hyB4(x, y);
      // el círculo en el suelo y la luz que rebota alrededor: ahí se ve el cartón encendido
      const pd = Math.hypot((x - ox) / 56, (y - oy) / 19), q = Math.max(g_hyCl((1.25 - pd) / 0.5), 0.5 * g_hyCl(1 - Math.hypot((x - ox) / 115, (y - oy) / 48))) * lu;
      if (q > b && y >= 22) d[i] = bL[i];
      // el cono por el aire, tramado y más ancho hacia el suelo
      const px = x - fx, py = y - fy, s = (px * vx + py * vy) / Lh; if (s < 0 || s > Lh) continue;
      const dd = Math.abs(px * vy - py * vx) / Lh, an = 5 + s / Lh * 34; if (dd > an) continue;
      const hz = (1 - dd / an) * lu; if (g_hyB4(x + 2, y + 1) < hz * 0.7) g_hyTinta(R, x, y, cal, hz > 0.6 ? 0.42 : 0.3); else if (dd > an - 1.2) g_hyTinta(R, x, y, cal, 0.2);
    }
    // las motas de polvo que flotan en el rayo (unas más grandes y brillantes que otras)
    for (let k = 0; k < 26; k++) { const u = (h(k, 1, 182) + t * (0.015 + h(k, 2, 182) * 0.03)) % 1, x = Math.round(fx + vx * u + Math.sin(t * 0.7 + k) * (4 + u * 12)), y = Math.round(fy + vy * u + Math.cos(t * 0.5 + k * 2) * (3 + u * 6));
      if (x < 0 || y < 22 || Math.sin(t * 1.6 + k) < -0.3) continue; const c = lu > 0.5 ? hex('#fff4c8') : E.cartonL; R.pset(x, y, c); if (k % 5 === 0 && lu > 0.5) { R.pset(x + 1, y, cal); R.pset(x, y + 1, cal); } }
  }
  // la otra caja: sale de la sombra al entrar la luz, con su sombra hacia el fondo a la derecha
  if (ot > 0) { const [x0, y0, x1, y1] = G.otra;
    for (let y = y1 - 14; y <= y1; y++) { const k = (y1 - y) * 1.7, a = Math.round(x0 + 6 + k), z = Math.round(x1 + k); for (let x = a; x <= z; x++) if (g_hyB4(x, y) < 0.75 * ot) g_hyTinta(R, x, y, E.cartonNN, 0.45); }
    PIEZAS_TU.caja?.(R, ...G.otraPie, { s: 2 }); const os = (1 - ot) * 0.85; if (os > 0.02) for (let y = y0 - 2; y <= y1 + 2; y++) for (let x = x0 - 2; x <= x1 + 2; x++) { if (g_hyB4(x, y) < os * 1.15) g_hyTinta(R, x, y, E.cartonNN, Math.round(Math.min(0.9, os) * 10) / 10); }
    const [hx, hy] = G.otraAgujero; R.disco(hx, hy, 2, E.cartonD); R.disco(hx, hy, 1, E.cartonNN); if (ot > 0.9 && Math.sin(t * 2) > 0) R.pset(hx, hy, hex('#ffe6a0')); }
  return { otra: G.otra.slice(), otraAgujero: G.otraAgujero.slice() };
}
// la paleta del cuarto de Atom (la misma del 33: pared arena, friso verde azulado, nogal, sillón mostaza) y lo nuevo:
// el cristal y el agua de la pecera, el pez naranja, el laboratorio, el corcho
const g_hyK = pal({
  k: '#1c1222', blanco: '#f6f2ea', pared: '#ecd2a8', paredS: '#dcbc8c', paredL: '#f6e2c0', motivo: '#cf9a68', motivoS: '#b87e52',
  moldura: '#f4ead6', molduraS: '#cdbfa2', friso: '#447674', frisoS: '#2f5a5a', frisoL: '#62948e', frisoD: '#1f3f42',
  tarima: '#b88450', tarimaS: '#93603a', tarimaL: '#d4a066', tarimaD: '#6c4426', sol: '#f2cf88', solL: '#fbe6b0',
  nogal: '#70462a', nogalS: '#50301a', nogalL: '#94623a', nogalD: '#321d10', nogalB: '#b88250',
  cortina: '#c2603a', cortinaS: '#93401f', cortinaL: '#e08a5a', cortinaD: '#6a2a14', marco: '#f4f0e6', marcoS: '#c4bcae',
  cielo0: '#3f8fd8', cielo1: '#58a4e4', cielo2: '#78baee', cielo3: '#9ccef4', cielo4: '#c0e0f6', cielo5: '#e2f0f4',
  gris0: '#6a7890', gris1: '#7e8ca2', gris2: '#94a2b4', gris3: '#aab6c4', gris4: '#c0cad4', gris5: '#d4dce0',
  nubeL: '#ffffff', nubeM: '#eef4fa', nubeS: '#c8d8ea', nubeD: '#a4b8d4', nubeG0: '#dfe4ea', nubeG1: '#b8c2d0', nubeG2: '#8e9aae', nubeG3: '#727e94',
  hoja: '#4c9a40', hojaL: '#74bc50', hojaB: '#a4d868', hojaS: '#347a38', hojaD: '#1e4a2c', tronco: '#6a4a30', troncoS: '#46301e',
  cesped: '#62ac48', cespedL: '#86c85a', cespedS: '#468a3a', cespedD: '#2f6a30', senda: '#dcc89a', sendaS: '#b8a070', sendaL: '#eedcb4',
  alfombra: '#2f5e6a', alfombraS: '#20444e', alfombraL: '#e8d4a4', alfombraR: '#c2603a',
  sillon: '#d0883a', sillonS: '#a4622a', sillonL: '#eca858', sillonD: '#6e3e1a', gato: '#8a8e9a', gatoS: '#5e626e', gatoL: '#c4c8d0',
  oro: '#e8b840', oroS: '#a87820', oroL: '#f8e080', rojo: '#d8423a', rojoS: '#96241e', azul: '#3a6ab0', azulS: '#24447a', papel: '#efe6d0', papelS: '#cfc4a8', papelD: '#a89c80',
  barro: '#c8683a', barroS: '#96442a', barroL: '#e89060', metal: '#9aa4b4', metalS: '#6c7688', metalL: '#d0d8e4', metalD: '#4a5262', luz: '#fff0b8',
  noche: '#1c2450', lila: '#9a6ad0', rosa: '#f08aa0', amarillo: '#f0c030', verde: '#3aa860', verdeL: '#7ae08a', verdeS: '#1e7040',
  cristal: '#cfe8f4', cristalL: '#f4fcff', cristalD: '#4a6e8e', agua0: '#a8e0ec', agua1: '#6cc0dc', agua2: '#4a9cc8', agua3: '#3478ac', aguaD: '#245a8c',
  grava: '#d8c090', gravaS: '#a88c5c', gravaL: '#f0e0b4', naranja: '#f08828', naranjaL: '#fcb850', naranjaS: '#c85a18', naranjaD: '#8a3610',
  barcoW: '#fbfaf4', barcoS: '#cdd4e2', barcoD: '#7a86a6',
  nieve: '#f0f4fa', nieveS: '#b8c8e0', monte: '#7a88a8', monteS: '#56648c', monteL: '#9aa8c4',
});

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() que empieza «vacío» y en cada fotograma
// se pega sobre lo que se mueve por detrás (lo que se ve por la ventana); una por encuadre y lienzo
const G_HYVACIO = 0x01020304, g_hyCapas = new WeakMap();

function g_hyCapa(R, clave, dibuja) {
  let m = g_hyCapas.get(R); if (!m) g_hyCapas.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); b.fill(G_HYVACIO); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  return b;
}

// pega una capa fija (solo las filas y0–y1, bajadas dy filas) sobre el búfer en uso, dejando ver lo de detrás por sus huecos
function g_hyPegar(R, b, y0 = 0, y1 = 179, dy = 0) { const d = R.buf, k = dy * 320; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c !== G_HYVACIO) d[i + k] = c; } }

// el umbral de la trama ordenada 4 × 4 (0–1), para degradados y luces tramados
const G_HYB4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const g_hyB4 = (x, y) => (G_HYB4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const g_hyCl = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

// mezcla dos colores (f = 0, el primero; f = 1, el segundo)
const g_hyMez = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// tiñe el píxel (x, y) hacia el color c con fuerza f, con memoria por color (para luces, cristales y sombras)
const g_hyTintes = new Map();

function g_hyTinta(R, x, y, c, f) {
  if (x < 0 || x > 319 || y < 0 || y > 179) return; const p = R.pget(x, y), k = c + ':' + f; let M = g_hyTintes.get(k); if (!M) g_hyTintes.set(k, (M = new Map()));
  let v = M.get(p); if (v === undefined) { v = g_hyMez(p, c, f); M.set(p, v); } R.pset(x, y, v);
}

// degradado vertical tramado en [x0, x1] × [y0, y1], de cols[0] arriba a cols[n] abajo (respeta R.recorte)
function g_hyDegradado(R, x0, y0, x1, y1, cols, curva = 1) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const v = ((y - y0) / alto) ** curva * n, l = Math.floor(v), f = v - l; for (let x = x0; x <= x1; x++) R.pset(x, y, cols[Math.min(n, f > g_hyB4(x, y) ? l + 1 : l)]); }
}

// una nube de bolas que se solapan, con la base plana: c = [luz, cuerpo, panza, filo de abajo]; (cx, cy) el centro de
// su base, w el ancho, k la semilla; se recorta a [rx0, rx1] y por arriba a ry0
function g_hyNube(R, cx, cy, w, k, c, rx0 = 0, rx1 = 319, ry0 = 0) {
  const n = 3 + Math.min(4, Math.floor(w / 16)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.78 + (h(k, i, 81) - 0.5) * 5, cy - 1 - m * (2 + h(k, i, 82) * 3), w * (0.13 + h(k, i, 83) * 0.09), 2 + m * 3.4 + h(k, i, 84) * 1.5]); }
  const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.max(rx0, Math.floor(cx - w * 0.62)), x1 = Math.min(rx1, Math.ceil(cx + w * 0.62));
  for (let y = Math.max(ry0, Math.floor(cy - 13)); y <= cy + 1; y++) for (let x = x0; x <= x1; x++) if (den(x, y)) R.pset(x, y, !den(x, y + 1) ? c[3] : !den(x, y + 2) ? c[2] : !den(x, y - 2) ? c[0] : c[1]);
}

// el cielo en [x0, x1] × [y0, hor]: degradado tramado y nubes de tres tonos a tres velocidades (lejanas pequeñas y
// lentas, medias, cercanas grandes y rápidas); o.esc: la escala de las nubes; o.gris 0–1: el cielo de lluvia (encapotado)
function g_hyCielo(R, t, x0, y0, x1, hor, o = {}) {
  const K = g_hyK, w = x1 - x0 + 90, esc = o.esc ?? 1, gr = (o.gris ?? 0) > 0.5, N = gr ? [K.nubeG0, K.nubeG1, K.nubeG2, K.nubeG3] : [K.nubeL, K.nubeM, K.nubeS, K.nubeD];
  g_hyDegradado(R, x0, y0, x1, hor, gr ? [K.gris0, K.gris1, K.gris2, K.gris3, K.gris4, K.gris5] : [K.cielo0, K.cielo1, K.cielo2, K.cielo3, K.cielo4, K.cielo5], 0.9);
  for (const [fy, s, v, n, kk] of (o.capas ?? [[0.82, 0.45, 2.2, 5, 0], [0.58, 0.7, 4.5, 4, 1], [0.3, 1, 8, 3, 2]])) for (let i = 0; i < n + (gr ? 2 : 0); i++) {
    const cx = x0 - 45 + (((h(i, kk, 61) * w + t * v + i * w / n) % w) + w) % w, cy = Math.round(y0 + (hor - y0) * (fy + (h(i, kk, 62) - 0.5) * 0.22)), an = Math.round((26 + h(i, kk, 63) * 30) * s * esc * (gr ? 1.4 : 1));
    g_hyNube(R, Math.round(cx), cy, an, i * 7 + kk * 31, kk === 0 ? [N[1], N[1], N[2], N[3]] : N, x0, x1, y0); }
}

// un pájaro pequeño (una uve que aletea), recortado a [x0, x1]
function g_hyPajaro(R, x, y, t, k, c, x0 = 0, x1 = 319) {
  const a = Math.sin(t * 9 + k * 2.1) > 0 ? 1 : -1; for (const [i, j] of [[0, 0], [-1, -a], [1, -a], [-2, -a * (a > 0 ? 2 : 1)], [2, -a * (a > 0 ? 2 : 1)]]) if (x + i >= x0 && x + i <= x1) R.pset(x + i, y + j, c);
}

// LA VISTA DE LA VENTANA del estudio, recortada a su hueco: cielo con nubes de tres tonos, pájaros, los tejados
// lejanos, los árboles del parque que se mecen, el césped con su sendero, una cometa, un paseante y una ciclista;
// ll 0–1: llueve (cielo encapotado, sin cometa, el paseante con paraguas, charcos con ondas y la lluvia fina)
function g_hyVistaParque(R, t, x0, y0, x1, y1, ll = 0) {
  const K = g_hyK, hor = y0 + Math.round((y1 - y0) * 0.62), llueve = ll > 0.5;
  R.recorte([x0, y0, x1, y1]);
  g_hyCielo(R, t, x0, y0, x1, hor, { esc: 0.55, gris: ll, capas: [[0.8, 0.5, 1.2, 3, 0], [0.5, 0.75, 2.4, 3, 1], [0.2, 1, 4.2, 2, 2]] });
  if (!llueve) {
    for (let k = 0; k < 3; k++) { const u = ((t * (5 + k * 2) + k * 31) % (x1 - x0 + 30)); g_hyPajaro(R, Math.round(x1 + 10 - u), y0 + 9 + k * 6 + Math.round(Math.sin(t * 1.3 + k) * 2), t, k, hex('#3a4a6a'), x0, x1); }
    // la cometa, con su cola
    const cx = x0 + 50 + Math.round(Math.sin(t * 0.7) * 6), cy = y0 + 22 + Math.round(Math.cos(t * 0.9) * 3); R.poligono([[cx, cy - 4], [cx + 3, cy], [cx, cy + 4], [cx - 3, cy]], K.rojo); R.linea(cx, cy - 3, cx, cy + 3, K.oro); for (let i = 1; i < 6; i++) R.pset(cx - i + Math.round(Math.sin(t * 5 + i) * 1), cy + 4 + i, i % 2 ? K.oro : K.rojo); R.linea(cx, cy + 4, x0 + 40, hor + 8, K.nubeD, 2);
  }
  // tejados lejanos y la hilera de árboles
  for (let x = x0; x <= x1; x++) { const b = Math.floor((x - x0) / 11), a = 5 + Math.round(h(b, 1, 71) * 7), te = (x - x0) % 11; for (let y = hor - a - 4; y <= hor; y++) R.pset(x, y, y === hor - a - 4 ? hex('#a86a5a') : te === 0 ? hex('#a8a4b8') : (te === 4 || te === 7) && (y - hor + a) % 4 === 1 ? hex('#f4e8b8') : llueve ? hex('#b0aec0') : hex('#c4c0d0')); }
  for (let x = x0; x <= x1; x++) { const a = Math.round(4 + 2.5 * Math.sin(x * 0.31) + 1.5 * Math.sin(x * 0.83 + 2)); R.linea(x, hor - a, x, hor, llueve ? hex('#4a8470') : hex('#5a9a7a')); R.pset(x, hor - a, llueve ? hex('#6ea08c') : hex('#86b89a')); }
  // el césped, el sendero y sus flores
  for (let y = hor + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, h(x, y, 51) < 0.12 ? (llueve ? K.cesped : K.cespedL) : (y - hor) < 3 ? K.cespedS : ((x + (y - hor) * 2) >> 3) & 1 ? (llueve ? K.cespedS : K.cesped) : (llueve ? hex('#4f9442') : hex('#6cb450')));
  for (let y = hor + 3; y <= y1; y++) { const cx = x0 + 24 + Math.round(Math.sin((y - hor) * 0.2) * 9), w = 2 + ((y - hor) >> 2); for (let x = cx - w; x <= cx + w; x++) R.pset(x, y, x === cx - w ? K.sendaS : (x + y) % 5 === 0 ? K.sendaL : llueve ? K.sendaS : K.senda); }
  for (let k = 0; k < 9; k++) R.pset(x0 + 3 + Math.round(h(k, 1, 72) * (x1 - x0 - 6)), hor + 5 + Math.round(h(k, 2, 72) * (y1 - hor - 6)), k % 3 ? K.blanco : K.amarillo);
  // los charcos, con sus ondas
  if (llueve) for (const [dx, dy, w] of [[40, 12, 6], [58, 19, 8], [12, 21, 5]]) { const px = x0 + dx, py = hor + dy; for (let i = -w; i <= w; i++) { R.pset(px + i, py, K.gris4); if (Math.abs(i) < w - 1) R.pset(px + i, py + 1, K.gris2); } const u = (t * 1.4 + dx) % 1, r = Math.round(u * (w - 1)); R.pset(px - r, py, K.blanco); R.pset(px + r, py, K.blanco); }
  // los árboles del parque, que se mecen
  for (const [dx, r, k] of [[8, 8, 0], [40, 10, 1], [64, 7, 2]]) { const m = Math.round(Math.sin(t * (llueve ? 1.7 : 0.9) + k * 2) * 1.2), cx = x0 + dx;
    R.linea(cx, hor - 2, cx, hor + 7, K.troncoS); R.linea(cx + 1, hor - 2, cx + 1, hor + 7, K.tronco); R.disco(cx + m, hor - r, r, K.hojaD); R.disco(cx + m - 1, hor - r - 1, r - 1, K.hojaS); R.disco(cx + m - 2, hor - r - 2, r - 3, llueve ? K.hojaS : K.hoja); R.disco(cx + m - 3, hor - r - 3, Math.max(1, r - 6), llueve ? K.hoja : K.hojaL);
    for (let j = 0; j < 5; j++) R.pset(cx + m + Math.round((h(k, j, 73) - 0.5) * r * 1.4), hor - r + Math.round((h(k, j, 74) - 0.5) * r * 1.2), llueve ? K.hoja : K.hojaB); }
  // el paseante (con paraguas si llueve) y la ciclista
  for (const [v, y, c, k] of [[4.5, hor + 9, '#c8423a', 0], [-9, hor + 15, '#3a5a9a', 1]]) { if (llueve && k === 1) continue; const an = x1 - x0 + 20, x = Math.round(x0 - 10 + ((((t * v + k * 40) % an) + an) % an)), p = Math.floor(t * 4 + k) % 2;
    R.linea(x, y - 5, x, y - 2, hex(c)); R.pset(x, y - 6, hex('#f0c8a0')); R.pset(x, y - 7, hex('#4a3020'));
    if (k === 0) { R.pset(x - p, y - 1, K.k); R.pset(x + 1 - p, y, K.k); if (llueve) { R.linea(x + 1, y - 4, x + 1, y - 10, K.k); R.linea(x - 3, y - 10, x + 5, y - 10, K.amarillo); R.linea(x - 2, y - 11, x + 4, y - 11, K.amarillo); R.linea(x, y - 12, x + 2, y - 12, K.oroL); } }
    else { R.disco(x - 3, y - 1, 2, K.k); R.disco(x + 3, y - 1, 2, K.k); R.pset(x - 3, y - 1, K.metalL); R.pset(x + 3, y - 1, K.metalL); R.linea(x - 3, y - 2, x + 3, y - 2, K.rojo); } }
  // la lluvia fina: trazos inclinados que caen, en dos planos
  if (ll > 0) { const n = Math.round(ll * 70), an = x1 - x0 + 12, al = y1 - y0 + 8;
    for (let k = 0; k < n; k++) { const v = 70 + (k % 3) * 24, x = x0 + ((h(k, 1, 75) * an - t * 9) % an + an) % an, y = y0 - 4 + ((h(k, 2, 75) * al + t * v) % al); R.linea(Math.round(x), Math.round(y), Math.round(x) - 1, Math.round(y) + (k % 3 ? 3 : 2), k % 3 ? K.gris5 : K.blanco); } }
  R.recorte(null);
}

// la cenefa del papel pintado, bajo la moldura (de y0 a y 23, de lado a lado; y0 = 6 en 'estudio', 'pizarra' y 'caja';
// en la cámara 'pared', con e = 2): una franja lisa de tono medio, más oscura que las cifras del año y sin
// motivos ni puntos claros, para que el año se lea entero sobre ella; lejos del año (x < 128 y x 212–254) lleva el
// mismo rayado fino del papel, tono sobre tono, y la cierra un filete oscuro. En la esquina de Atom (x ≥ 258) no hay
// filete: la franja se deshace en trama hacia el papel (y 16–29), sin ninguna línea que cruce por detrás de él
function g_hyCenefa(R, y0 = 6, e = 1) {
  const c = hex('#b98c62'), s = hex('#a67a52'), d = hex('#8e6442'), X1 = 257;
  for (let y = y0; y <= 21; y++) for (let x = 0; x <= X1; x++) { const lejos = x < 128 || (x > 211 && x < 255); R.pset(x, y, y === y0 || (y === y0 + 1 && (x & 1)) ? s : lejos && y > y0 + 2 && y < 20 && x % (8 * e) === 0 && (y & 1) ? s : c); }
  R.rect(0, 20, X1, 20, s); R.rect(0, 22, X1, 22, d); for (let x = 0; x <= X1; x++) { R.pset(x, 21, hex('#c69a6e')); R.pset(x, 23, g_hyK.paredS); if (x & 1) R.pset(x, 24, g_hyK.paredS); }
  for (let y = 20; y <= 23; y++) R.pset(X1, y, d);   // el remate del filete
  for (let y = y0; y <= 29; y++) for (let x = X1 + 1; x < 320; x++) { if (y > 15 && g_hyB4(x, y) < (y - 15) / 15) continue; R.pset(x, y, y === y0 || (y === y0 + 1 && (x & 1)) ? s : c); }
}

// la tarima: tablas a lo largo con las juntas al tresbolillo, vetas y nudos; las filas se ensanchan hacia la cámara
function g_hyTarima(R, y0, y1, filas, P = null) {
  const K = P ?? { c: g_hyK.tarima, s: g_hyK.tarimaS, l: g_hyK.tarimaL, d: g_hyK.tarimaD }; let f = 0;
  for (let y = y0; y <= y1; y++) { while (f + 1 < filas.length && y >= filas[f + 1]) f++; const junta = y === filas[f], an = 34 + f * 9, des = Math.round(h(f, 1, 41) * an);
    for (let x = 0; x < 320; x++) { const tb = Math.floor((x + des) / an), r = (x + des) % an, tono = h(tb, f, 42);
      let c = junta ? K.s : r === 0 ? K.d : tono < 0.3 ? K.l : tono > 0.8 ? g_hyMez(K.c, K.s, 0.5) : K.c;
      if (!junta && r > 0) { if (h(x >> 3, y, 43 + tb) < 0.16) c = K.s; else if (h((x + 3) >> 2, y, 44) < 0.07) c = K.l; if (Math.hypot(r - an * (0.3 + tono * 0.4), (y - filas[f] - 2) * 2) < 1.6 && tono > 0.55) c = K.d; }
      R.pset(x, y, c); } }
}

// un lomo de libro de pie en la balda: x, base y, ancho w, alto a, color c (con su tejuelo y su filo de luz)
function g_hyLomo(R, x, y, w, a, c, k) {
  R.rect(x, y - a, x + w - 1, y, c); R.rect(x, y - a, x, y, g_hyMez(c, g_hyK.blanco, 0.3)); R.rect(x + w - 1, y - a + 1, x + w - 1, y, g_hyMez(c, g_hyK.k, 0.4)); R.rect(x, y - a, x + w - 1, y - a, g_hyMez(c, g_hyK.blanco, 0.45));
  if (w > 2) { R.rect(x + 1, y - a + 3, x + w - 2, y - a + 3, g_hyK.oro); if (k % 2) R.rect(x + 1, y - 4, x + w - 2, y - 3, g_hyK.papel); else R.rect(x + 1, y - a + 5, x + w - 2, y - a + 5, g_hyK.oro); }
}

// EL GATO GRIS, despierto y sentado, que mira fijo (o.dir: hacia dónde, −1 por omisión: hacia la mesa): (x, y) el
// centro de su base. Mueve la punta de la cola, una oreja de vez en cuando, y parpadea
function g_hyGato(R, x, y, t, o = {}) {
  const K = g_hyK, d = o.dir ?? -1, { pset, rect, disco, linea, poligono } = R, hx = x + d * 3, hy = y - 13;
  // la cola, enroscada por detrás, con la punta que se mueve
  { const cl = Math.round(Math.sin(t * 2.4) * 1.6); linea(x - d * 4, y - 1, x - d * 9, y - 2, K.k); linea(x - d * 4, y - 2, x - d * 9, y - 3, K.gato); linea(x - d * 9, y - 3, x - d * 11, y - 5 - cl, K.gato); linea(x - d * 10, y - 2, x - d * 12, y - 4 - cl, K.k); pset(x - d * 11, y - 6 - cl, K.gatoL); }
  // el cuerpo de pera y el pecho claro
  for (let j = 0; j <= 10; j++) { const w = j < 3 ? 5 : j < 7 ? 5 - ((j - 2) >> 1) : 3; rect(x - w - 1, y - j, x + w + 1, y - j, K.k); rect(x - w, y - j, x + w, y - j, K.gato); pset(x - d * w, y - j, K.gatoS); if (j > 1 && j < 8) pset(x + d * (w - 1), y - j, K.gatoL); if (j % 3 === 1) pset(x - d * (w - 2), y - j, K.gatoS); }
  rect(x - 5, y, x + 5, y, K.k); rect(x + d * 2, y - 1, x + d * 5, y - 1, K.gatoL); pset(x + d * 3, y, K.gatoL);
  // la cabeza, las orejas (una se mueve) y la cara: dos ojos amarillos muy abiertos
  const or = (t % 4.7) < 0.18 ? 1 : 0, cierra = (t % 3.9) > 3.75;
  disco(hx, hy, 5, K.k); disco(hx, hy, 4, K.gato);
  poligono([[hx - 5, hy - 2], [hx - 4, hy - 7 - or], [hx - 1, hy - 4]], K.k); poligono([[hx + 1, hy - 4], [hx + 4, hy - 7], [hx + 5, hy - 2]], K.k); pset(hx - 4, hy - 5 - or, K.rosa); pset(hx + 4, hy - 5, K.rosa); pset(hx - 3, hy - 4, K.gato); pset(hx + 3, hy - 4, K.gato);
  rect(hx - 3, hy + 2, hx + 3, hy + 3, K.gatoL);
  for (const ex of [hx + d * 3, hx - d * 0]) { if (cierra) { pset(ex, hy, K.k); pset(ex - d, hy, K.k); } else { pset(ex, hy - 1, K.amarillo); pset(ex - d, hy - 1, K.amarillo); pset(ex, hy, K.k); pset(ex - d, hy, K.amarillo); } }
  pset(hx + d * 2, hy + 2, K.rosa); pset(hx + d * 5, hy + 2, K.gatoL); pset(hx + d * 6, hy + 1, K.gatoL);
}

// una polilla que ronda una luz en (cx, cy): rx, ry lo que se aleja; k la semilla del vuelo
function g_hyPolilla(R, cx, cy, t, rx = 8, ry = 6, k = 0) {
  const K = g_hyK, x = Math.round(cx + Math.sin(t * 1.7 + k) * rx + Math.sin(t * 4.1 + k * 2) * 2), y = Math.round(cy + Math.cos(t * 2.3 + k) * ry + Math.sin(t * 5.3 + k) * 1.5), al = Math.sin(t * 30) > 0 ? 1 : 0;
  R.pset(x, y, K.k); R.pset(x - 1, y - al, K.papel); R.pset(x + 1, y - al, K.papel);
}

// un destello de cuatro puntas que nace y se apaga (f 0–1; fuera de ese tramo no pinta nada)
function g_hyDestello(R, x, y, f, c = g_hyK.blanco) {
  if (f <= 0 || f >= 1) return; R.pset(x, y, c);
  if (f > 0.15 && f < 0.85) { R.pset(x - 1, y, c); R.pset(x + 1, y, c); R.pset(x, y - 1, c); R.pset(x, y + 1, c); }
  if (f > 0.35 && f < 0.65) { R.pset(x - 2, y, c); R.pset(x + 2, y, c); R.pset(x, y - 2, c); R.pset(x, y + 2, c); }
}

const G_HYEST = { suelo: 162, mesa: { x0: 92, x1: 208, y: 131, pie: 166 }, flexo: [197, 105], ventana: [178, 32, 250, 98], libreria: [6, 34, 60, 152], relojPared: [146, 50], sillon: [291, 136], gato: [291, 136], toc: [96, 82], lamina: [95, 46], estetoscopio: [70, 84] };

// LO FIJO DEL ESTUDIO (general, copiado de jm-comun.js con el papel egipcio): todo menos el hueco de la ventana, que
// queda vacío para la vista del parque, y la lámina de las pirámides, que se pinta en cada fotograma (se tuerce)
function g_hyEstudioFijo(R) {
  const K = g_hyK, { rect, pset, disco, linea, poligono } = R;
  // la pared: papel pintado (tranquilo detrás de Atom y bajo el año), moldura con su sombra
  g_hyPapelEg(R, 0, 6, 319, 113, 1, (x, y) => (x >= 258 && y <= 54) || y <= 28 || Math.hypot(x - 96, y - 82) < 14);
  rect(0, 0, 319, 3, K.moldura); rect(0, 4, 319, 4, K.molduraS); rect(0, 5, 319, 5, K.nogalL); for (let x = 0; x < 320; x++) if (x % 12 === 3) pset(x, 2, K.molduraS);
  g_hyCenefa(R);   // la franja lisa bajo la moldura: el año se lee entero
  g_hyRayas(R, 25); g_hyGreca(R, 104, 1);   // las rayas de colores bajo la cenefa (lejos de las cifras) y la greca de escarabajos
  // el friso de cuarterones verde azulado y el rodapié
  rect(0, 114, 319, 152, K.friso); rect(0, 114, 319, 114, K.frisoL); rect(0, 116, 319, 116, K.frisoD); rect(0, 149, 319, 152, K.frisoS); rect(0, 149, 319, 149, K.frisoL); rect(0, 152, 319, 152, K.frisoD);
  for (let x = 4; x < 320; x += 28) { rect(x, 119, x + 22, 146, K.frisoS); rect(x, 119, x + 22, 119, K.frisoD); rect(x, 119, x, 146, K.frisoD); rect(x + 22, 120, x + 22, 146, K.frisoL); rect(x + 1, 146, x + 22, 146, K.frisoL);
    rect(x + 3, 122, x + 19, 143, K.friso); rect(x + 3, 122, x + 19, 122, K.frisoL); rect(x + 3, 122, x + 3, 143, K.frisoL); rect(x + 19, 123, x + 19, 143, K.frisoD); rect(x + 4, 143, x + 19, 143, K.frisoD);
    for (let y = 124; y < 142; y++) for (let i = 5; i < 18; i++) if (h((x + i) >> 1, y >> 2, 32) < 0.12) pset(x + i, y, K.frisoS); }
  // la tarima y la alfombra (la mancha de sol va aparte: con lluvia no la hay)
  g_hyTarima(R, 153, 179, [153, 157, 162, 168, 175]); for (let x = 0; x < 320; x++) { pset(x, 153, K.tarimaD); if ((x & 1) === 0) pset(x, 154, K.tarimaD); }
  { const A = (x, y) => { const u = (y - 159) / 18, xa = 66 - u * 12, xb = 236 + u * 12; return x >= xa && x <= xb ? [(x - xa) / (xb - xa), u] : null; };
    for (let y = 159; y <= 177; y++) for (let x = 50; x <= 250; x++) { const p = A(x, y); if (!p) continue; const [v, u] = p, bx = Math.min(v, 1 - v) * 170, by = Math.min(u, 1 - u) * 18;
      let c = bx < 2 || by < 1 ? K.alfombraL : bx < 6 || by < 2.6 ? K.alfombraR : bx < 8 || by < 3.6 ? K.alfombraL : K.alfombra;
      if (c === K.alfombra) { const dx = (v * 170) % 20 - 10, dy = (u - 0.5) * 22; const d = Math.abs(dx) + Math.abs(dy) * 1.6; c = d < 2 ? K.alfombraL : d < 5 ? K.alfombraR : d < 6.2 ? K.alfombraL : (x + y) % 2 && h(x, y, 33) < 0.3 ? K.alfombraS : K.alfombra; }
      else if (c === K.alfombraR && (x + y) % 4 === 0) c = K.cortinaS;
      pset(x, y, c); }
    for (let y = 160; y <= 177; y += 2) { const u = (y - 159) / 18; pset(Math.round(66 - u * 12) - 1, y, K.alfombraL); pset(Math.round(66 - u * 12) - 2, y, K.papelS); pset(Math.round(236 + u * 12) + 1, y, K.alfombraL); pset(Math.round(236 + u * 12) + 2, y, K.papelS); } }
  // LA LIBRERÍA de nogal (x 6–60, y 34–152): cinco baldas con libros, un globo, la pirámide de recuerdo, el gato de escayola, cajas y, arriba, un helecho
  rect(6, 38, 60, 152, K.k); rect(7, 39, 59, 151, K.nogal); rect(9, 41, 57, 146, K.nogalD); rect(4, 34, 62, 37, K.k); rect(5, 35, 61, 36, K.nogalL); rect(5, 36, 61, 36, K.nogalS); rect(7, 39, 8, 151, K.nogalL); rect(58, 39, 59, 151, K.nogalS); rect(7, 147, 59, 151, K.nogal); rect(7, 147, 59, 147, K.nogalL);
  { const COL = [K.rojo, K.azul, K.oroS, K.friso, K.cortina, K.noche, K.papelS, K.rojoS, K.azulS, K.hojaS, K.lila, K.sillon];
    [59, 81, 103, 125, 146].forEach((by, b) => { if (b < 4) { rect(9, by, 57, by + 1, K.nogalL); rect(9, by + 1, 57, by + 1, K.nogalS); for (let x = 9; x <= 57; x++) if (x % 2) pset(x, by + 2, K.k); }
      let x = 10, n = 0; const y = by - 1;
      while (x < 56) { const hueco = (b === 0 && x > 40) || (b === 2 && x > 17 && x < 41) || (b === 3 && x < 26) || (b === 4 && x > 30); if (hueco) { x++; continue; }
        const w = 2 + Math.floor(h(x, b, 34) * 3), a = 11 + Math.floor(h(x, b, 35) * 7); if (x + w > 56) break;
        if (h(x, b, 36) < 0.1 && x + 6 < 56) { linea(x, y, x + 4, y - a, COL[(n * 5 + b) % 12]); linea(x + 1, y, x + 5, y - a, g_hyMez(COL[(n * 5 + b) % 12], K.k, 0.3)); x += 7; n++; continue; }
        g_hyLomo(R, x, y, w, a, COL[(n * 5 + b * 3) % 12], n); x += w; n++; } });
    // el globo terráqueo
    rect(46, 56, 52, 57, K.oroS); linea(49, 52, 49, 56, K.oroS); disco(49, 48, 5, K.k); disco(49, 48, 4, K.azul); pset(47, 46, K.cielo3); pset(48, 47, K.hoja); pset(49, 47, K.hoja); pset(50, 49, K.hoja); pset(51, 48, K.hoja); pset(48, 50, K.hojaL); linea(44, 44, 54, 52, K.oro);
    // LA PIRÁMIDE DE RECUERDO (dorada, con su cara en sombra) y EL GATO DE ESCAYOLA sentado, en la balda del medio
    for (let j = 0; j < 10; j++) { R.rect(18 + j, 102 - j, 38 - j, 102 - j, j === 9 ? K.oroL : K.oro); R.rect(28, 102 - j, 38 - j, 102 - j, K.oroS); pset(18 + j, 102 - j, K.k); pset(38 - j, 102 - j, K.k); } pset(28, 92, K.k); for (const y of [99, 96]) for (let x = 22; x < 35; x += 3) if (R.pget(x, y) === K.oro) pset(x, y, K.oroS);
    g_hyGatoEscayola(R, 45, 102);
    rect(10, 121, 24, 123, K.rojoS); rect(10, 121, 24, 121, K.rojo); rect(11, 118, 23, 120, K.papel); rect(11, 118, 23, 118, K.azul); rect(12, 115, 22, 117, K.oroS); rect(12, 115, 22, 115, K.oro); disco(17, 111, 3, K.metalS); disco(17, 111, 2, K.metalL); pset(16, 110, K.blanco);
    rect(32, 132, 44, 145, K.papelS); rect(32, 132, 44, 133, K.papel); rect(36, 137, 40, 139, K.nogalD); rect(46, 128, 56, 145, K.frisoS); rect(46, 128, 56, 129, K.frisoL); rect(49, 134, 53, 136, K.papel); }
  // el helecho de encima, con sus hojas que cuelgan
  rect(14, 28, 24, 33, K.barro); rect(13, 27, 25, 28, K.barroL); rect(14, 32, 24, 33, K.barroS);
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.52, l = 9 + (k % 3) * 3; for (let i = 0; i < l; i++) { const x = 19 + Math.cos(a) * i * 1.1, y = 27 + Math.sin(a) * i * 0.5 + i * i * 0.07 - 3; pset(Math.round(x), Math.round(y), i % 3 ? K.hoja : K.hojaL); if (i % 2) pset(Math.round(x), Math.round(y) + 1, K.hojaS); } }
  rect(38, 29, 58, 33, K.papelS); rect(38, 29, 58, 29, K.papel); rect(38, 29, 39, 33, K.nogalL); rect(57, 29, 58, 33, K.nogalL); rect(40, 26, 54, 28, K.cortinaS); rect(40, 26, 54, 26, K.cortina);
  // el cesto de mapas enrollados
  rect(66, 136, 78, 152, K.k); rect(67, 137, 77, 151, K.oroS); for (let y = 137; y <= 151; y++) for (let x = 67; x <= 77; x++) if ((x + (y >> 1)) % 3 === 0) pset(x, y, y % 2 ? K.nogalL : K.oro); rect(67, 137, 77, 137, K.oroL);
  for (const [x, a, c] of [[68, 14, K.papel], [71, 19, K.papelS], [74, 12, K.papel]]) { rect(x, 136 - a, x + 2, 136, c); rect(x + 2, 136 - a, x + 2, 136, K.papelD); rect(x, 136 - a, x + 2, 136 - a, K.k); pset(x + 1, 136 - a, K.rojo); }
  // EL RELOJ DE PÉNDULO (la esfera en 146, 50; la caja, y 59–82): las agujas y el péndulo van aparte
  rect(141, 58, 151, 83, K.k); rect(142, 59, 150, 82, K.nogal); rect(142, 59, 142, 82, K.nogalL); rect(144, 62, 148, 80, K.nogalD); poligono([[141, 84], [151, 84], [146, 88]], K.k); pset(146, 85, K.nogalL);
  disco(146, 50, 10, K.k); disco(146, 50, 9, K.nogal); disco(146, 50, 7, K.oroS); disco(146, 50, 6, K.blanco); for (let a = 0; a < 12; a++) pset(146 + Math.round(Math.sin(a * Math.PI / 6) * 5), 50 - Math.round(Math.cos(a * Math.PI / 6) * 5), a % 3 ? K.papelD : K.k); pset(140, 44, K.nogalB); pset(141, 43, K.nogalB);
  // LA VENTANA (los cristales, x 178–250, y 32–98, quedan vacíos): marco, barrotes, alféizar, barra y cortinas recogidas
  rect(173, 27, 255, 103, K.k); rect(174, 28, 254, 102, K.marco); rect(174, 28, 254, 28, K.blanco); rect(253, 29, 254, 102, K.marcoS); rect(177, 31, 251, 99, K.marcoS); rect(178, 32, 250, 98, G_HYVACIO);
  rect(213, 32, 215, 98, K.marco); rect(215, 32, 215, 98, K.marcoS); rect(178, 60, 250, 61, K.marco); rect(178, 62, 250, 62, K.marcoS);
  rect(169, 100, 259, 104, K.k); rect(170, 101, 258, 102, K.blanco); rect(170, 103, 258, 103, K.marcoS); for (let x = 172; x <= 256; x++) { pset(x, 105, K.paredS); if (x & 1) pset(x, 106, K.paredS); }
  // el cactus y los libritos del alféizar
  rect(238, 94, 244, 99, K.barro); rect(238, 94, 244, 94, K.barroL); rect(240, 86, 242, 93, K.hojaS); rect(240, 86, 240, 93, K.hoja); pset(243, 89, K.hojaS); pset(244, 88, K.hojaS); pset(244, 87, K.hojaS); pset(241, 85, K.amarillo);
  rect(184, 96, 196, 99, K.azulS); rect(184, 96, 196, 96, K.azul); rect(185, 93, 195, 95, K.papel); rect(185, 93, 195, 93, K.rojo);
  // la barra, por debajo de la cenefa (y 27–28: ni ella ni sus pomos tocan las cifras del año)
  rect(158, 27, 270, 28, K.k); rect(159, 27, 269, 27, K.oro); disco(158, 27, 2, K.k); pset(158, 27, K.oroL); disco(270, 27, 2, K.k); pset(270, 27, K.oroL);
  for (const [xa, xb, s] of [[161, 178, 1], [250, 267, -1]]) for (let y = 29; y <= 122; y++) { const rec = y < 84 ? 1 : Math.max(0.55, 1 - (y - 84) * 0.02), at = Math.abs(y - 84) < 3, w = (xb - xa) * (at ? 0.5 : y < 84 ? 1 - (y - 25) * 0.004 : rec);
    for (let i = 0; i <= w; i++) { const x = s > 0 ? xa + i : xb - i, f = Math.sin(i * 1.15 + y * 0.03) + (h(i, 2, 39) - 0.5) * 0.4; let c = at ? (y === 84 ? K.oro : K.oroS) : f > 0.55 ? K.cortinaL : f < -0.5 ? K.cortinaS : K.cortina; if (i === 0 || i >= w - 0.99 || y === 122) c = at ? K.oroS : K.cortinaD; if (y === 29) c = K.k; pset(x, y, c); }
    if (y % 9 === 7 && !at) for (let i = 1; i < w; i += 2) pset(s > 0 ? xa + i : xb - i, y, K.cortinaS); }
  // la lámpara de pie, el cuadro del monte nevado sobre el valle y EL SILLÓN mostaza con su cojín (el gato lo pinta hoy())
  rect(269, 96, 270, 152, K.k); rect(270, 96, 270, 152, K.oroS); rect(264, 151, 275, 153, K.k); rect(265, 151, 274, 152, K.oroS); poligono([[263, 97], [277, 97], [274, 80], [266, 80]], K.k); poligono([[264, 96], [276, 96], [273, 81], [267, 81]], K.luz); rect(267, 81, 273, 81, K.blanco); for (let y = 83; y < 96; y += 3) rect(265, y, 275, y, K.sol);
  for (let y = 98; y <= 112; y++) for (let x = 258; x <= 282; x++) if (Math.abs(x - 270) < (y - 96) * 0.9 && g_hyB4(x, y) < 0.3 && R.pget(x, y) === K.pared) pset(x, y, K.paredL);
  rect(280, 60, 314, 90, K.k); rect(281, 61, 313, 89, K.nogalL); rect(281, 61, 313, 61, K.nogalB); rect(283, 63, 311, 87, K.cielo3); linea(297, 56, 292, 60, K.k); linea(297, 56, 302, 60, K.k);
  for (let y = 63; y <= 87; y++) for (let x = 283; x <= 311; x++) { const m1 = 66 + Math.abs(x - 294) * 1.15 + Math.sin(x * 1.3) * 0.6, m2 = 72 + Math.abs(x - 305) * 1.3, m = Math.min(m1, m2), v = 81 + Math.round(Math.sin(x * 0.4) * 1.5);
    if (y >= v) pset(x, y, y === v ? K.cespedL : (x + y) % 3 === 0 ? K.cespedS : K.cesped); else if (y >= m) pset(x, y, y < m + 4 + (x % 3) ? (x > (m1 < m2 ? 294 : 305) ? K.nieveS : K.nieve) : x > (m1 < m2 ? 294 : 305) ? K.monteS : (x + y) % 4 === 0 ? K.monteL : K.monte); else if (y < 68 && g_hyB4(x, y) < 0.4) pset(x, y, K.cielo2); else if (y > 76 && g_hyB4(x, y) < 0.5) pset(x, y, K.cielo5); }
  rect(285, 70, 289, 70, K.blanco); rect(286, 69, 288, 69, K.blanco); rect(306, 66, 310, 66, K.blanco);
  { const x0 = 268, x1 = 314; rect(x0 + 3, 150, x0 + 5, 154, K.k); rect(x1 - 5, 150, x1 - 3, 154, K.k);
    rect(x0 + 4, 108, x1 - 4, 150, K.k); rect(x0 + 5, 109, x1 - 5, 149, K.sillon); rect(x0 + 5, 109, x1 - 5, 110, K.sillonL); for (let y = 112; y < 134; y++) for (let x = x0 + 6; x < x1 - 5; x++) if ((x + y) % 5 === 0 && h(x, y, 45) < 0.5) pset(x, y, K.sillonS); for (const bx of [x0 + 14, x0 + 23, x0 + 32]) pset(bx, 120, K.sillonD);
    rect(x0, 124, x0 + 8, 150, K.k); rect(x0 + 1, 125, x0 + 7, 149, K.sillon); rect(x0 + 1, 125, x0 + 7, 126, K.sillonL); rect(x0 + 7, 127, x0 + 7, 149, K.sillonS); rect(x1 - 8, 124, x1, 150, K.k); rect(x1 - 7, 125, x1 - 1, 149, K.sillon); rect(x1 - 7, 125, x1 - 1, 126, K.sillonL); rect(x1 - 7, 127, x1 - 7, 149, K.sillonS);
    rect(x0 + 9, 136, x1 - 9, 137, K.sillonL); rect(x0 + 9, 138, x1 - 9, 149, K.sillonS); rect(x0 + 9, 143, x1 - 9, 143, K.sillonD); for (let x = x0 + 10; x < x1 - 9; x += 2) pset(x, 149, K.sillonD);
    rect(x1 - 20, 118, x1 - 10, 130, K.k); rect(x1 - 19, 119, x1 - 11, 129, K.friso); for (let y = 119; y <= 129; y++) for (let x = x1 - 19; x <= x1 - 11; x++) if ((x - y) % 4 === 0) pset(x, y, K.alfombraL); }
}

// LO FIJO DE DELANTE EN EL ESTUDIO: el escritorio de nogal con la pila de libros y su manzana y el flexo rojo (el
// libro de Egipto, la lupa, la caja y la linterna los pone g_hyEstudioDelante, porque las escenas pueden quitarlos)
function g_hyEstudioDelanteFijo(R) {
  const K = g_hyK, { rect, pset, linea, disco } = R;
  for (let x = 90; x <= 212; x++) for (let y = 166; y <= 169; y++) if ((x + y) % 2 === 0 || y < 168) pset(x, y, K.alfombraS);
  rect(95, 135, 205, 166, K.k); rect(96, 136, 204, 165, K.nogal); rect(131, 144, 169, 165, K.nogalD); for (let y = 145; y <= 158; y++) for (let x = 132; x <= 168; x++) if ((x + y) % 2) pset(x, y, K.nogalS); rect(132, 159, 168, 165, K.k);
  for (let y = 136; y <= 165; y++) for (let x = 96; x <= 204; x++) if ((x < 131 || x > 169 || y < 144) && h(x >> 3, y, 49) < 0.14) pset(x, y, K.nogalS);
  for (const [x0, x1] of [[97, 129], [171, 203]]) for (const [y0, y1] of [[137, 145], [147, 155], [157, 164]]) { rect(x0, y0, x1, y1, K.nogalS); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, K.nogal); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, K.nogalL); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, K.nogalS); const cx = (x0 + x1) >> 1; rect(cx - 3, y0 + 4, cx + 3, y0 + 4, K.oro); pset(cx - 3, y0 + 5, K.oroS); pset(cx + 3, y0 + 5, K.oroS); for (let x = x0 + 3; x < x1 - 2; x += 5) if (h(x, y0, 50) < 0.5) pset(x, y0 + 3, K.nogalL); }
  rect(132, 137, 168, 143, K.nogalS); rect(133, 138, 167, 142, K.nogal); rect(133, 138, 167, 138, K.nogalL); disco(150, 140, 1, K.oro); pset(150, 141, K.k);
  rect(96, 165, 100, 167, K.k); rect(200, 165, 204, 167, K.k); rect(126, 165, 130, 167, K.k); rect(170, 165, 174, 167, K.k);
  // el tablero: canto, vetas y brillo
  rect(91, 130, 209, 135, K.k); rect(92, 131, 208, 133, K.nogalL); rect(92, 131, 208, 131, K.nogalB); rect(92, 134, 208, 134, K.nogalS); for (let x = 93; x < 208; x++) { if (h(x >> 2, 1, 51) < 0.3) pset(x, 132, K.nogal); if (h(x >> 3, 2, 51) < 0.25) pset(x, 133, K.nogal); }
  // la pila de libros con una manzana
  rect(96, 126, 120, 130, K.k); rect(97, 127, 119, 129, K.rojoS); rect(97, 127, 119, 127, K.rojo); rect(117, 128, 119, 129, K.papel); rect(98, 121, 121, 126, K.k); rect(99, 122, 120, 125, K.friso); rect(99, 122, 120, 122, K.frisoL); rect(118, 123, 120, 125, K.papel); rect(104, 123, 110, 123, K.oro);
  rect(97, 117, 117, 121, K.k); rect(98, 118, 116, 120, K.oroS); rect(98, 118, 116, 118, K.oro); rect(114, 119, 116, 120, K.papel); disco(107, 113, 3, K.k); disco(107, 113, 2, K.rojo); pset(106, 112, K.rosa); pset(107, 110, K.troncoS); pset(108, 109, K.hoja);
  // el flexo rojo: base, dos brazos con su codo y la pantalla, que mira al tablero
  rect(197, 128, 208, 130, K.k); rect(198, 128, 207, 129, K.metalS); rect(198, 128, 207, 128, K.metalL); linea(202, 127, 205, 107, K.k); linea(203, 127, 206, 107, K.metal); disco(206, 105, 2, K.k); pset(206, 105, K.oro); linea(205, 104, 197, 98, K.k); linea(205, 103, 197, 97, K.metal);
  R.poligono([[190, 106], [204, 106], [203, 97], [198, 94], [193, 97]], K.k); R.poligono([[192, 105], [203, 105], [202, 98], [198, 96], [194, 98]], K.rojoS); rect(194, 99, 195, 103, K.rojo); rect(192, 106, 203, 106, K.luz);
}

// el tablero de nogal de una mesa vista de cerca o desde arriba, de y0 a y1: vetas onduladas, nudos y un charco de luz
// en (lx, ly); calma(x, y) 0–1 apaga la veta donde haga falta (bajo el año y tras Atom)
function g_hyTablero(R, y0, y1, lx = 160, ly = 150, calma = null) {
  const K = g_hyK;
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const v = y + Math.sin(x * 0.035 + y * 0.11) * 3 + Math.sin(x * 0.011 + 2) * 5, f = ((v % 9) + 9) % 9, n1 = Math.hypot((x - 70) / 2.2, y - 126), n2 = Math.hypot((x - 250) / 2.4, y - 172);
    let c = f < 1 ? K.nogalS : f < 1.6 ? K.nogalD : f > 7.6 ? K.nogalL : K.nogal;
    if (n1 < 5) c = n1 < 2 ? K.nogalD : (Math.floor(n1) & 1) ? K.nogalS : K.nogal; if (n2 < 6) c = n2 < 2 ? K.nogalD : (Math.floor(n2) & 1) ? K.nogalS : K.nogal;
    if (h(x >> 2, y, 52) < 0.06) c = K.nogalS; else if (h((x + 2) >> 3, y, 53) < 0.05) c = K.nogalL;
    const d = Math.hypot((x - lx) / 150, (y - ly) / 46); if (d < 1 && g_hyB4(x, y) < (1 - d) * 0.75) c = c === K.nogal ? K.nogalL : c === K.nogalL ? K.nogalB : c === K.nogalS ? K.nogal : c;
    if (calma) { const q = calma(x, y); if (q > 0 && g_hyB4(x, y) < q) c = h(x >> 3, y >> 1, 57) < 0.07 ? K.nogalS : K.nogal; }
    R.pset(x, y, c); }
  R.rect(0, y0, 319, y0, K.nogalB); R.rect(0, y0 + 1, 319, y0 + 1, K.nogalL); for (let x = 0; x < 320; x++) if (h(x >> 2, 3, 54) < 0.3) R.pset(x, y0 + 1, K.nogal);
}

// la textura de cartón de una cara de la tapa de la carpeta (fuera, kraft claro con la luz de la ventana arriba a la
// izquierda; dentro, más oscuro, con el bolsillo y su clip), precalculada una vez en una tabla AW × AH: moteado de tres
// tonos, fibras claras y oscuras, el lomo doblado con su hendidura, cantos y esquinas gastados, rozaduras y, fuera, el
// cerco del café a medio borrar
const e_cartones = {};

function e_carton(R, fuera, AW, AH) {
  const k = (fuera ? 'f' : 'd') + AW + 'x' + AH; if (e_cartones[k]) return e_cartones[k];
  const T = new Uint32Array(AW * AH);
  const tonos = (fuera ? ['#a8905e', '#c4ac7e', '#d8c49a', '#e8dab4'] : ['#8a7450', '#9e8660', '#b49c72', '#c4ae84']).map(hex);
  const fibO = hex(fuera ? '#9a8258' : '#7a6444'), fibC = hex(fuera ? '#f2e6c6' : '#d4c094'), canto = hex(fuera ? '#ecdcb0' : '#c8b284'), cantoS = hex(fuera ? '#9a8458' : '#7a6444');
  for (let j = 0; j < AH; j++) for (let i = 0; i < AW; i++) {
    const n = R.vnoise(i * 0.09, j * 0.09) * 0.55 + R.vnoise(i * 0.3 + 7, j * 0.3) * 0.2, luz = fuera ? 0.35 - (i / AW + j / AH) * 0.22 : 0.05 - j / AH * 0.15;
    let q = Math.floor((n + luz) * 4 + R.b4(i, j) * 0.9 - 0.2); q = Math.max(0, Math.min(3, q));
    let c = tonos[q]; const hh = h(i, j, 85);
    if (hh < 0.035) c = fibO; else if (hh > 0.97) c = fibC;
    if (i >= 4 && i <= 6) c = i === 5 ? cantoS : i === 6 ? canto : e_mez(c, cantoS, 0.4);           // la hendidura del lomo
    else if (i < 4) c = e_mez(c, cantoS, 0.25 + (i & 1) * 0.1);                                       // el lomo doblado
    const bd = Math.min(i, AW - 1 - i, j, AH - 1 - j);
    if (bd < 3 && i > 6) c = hh < 0.5 ? canto : e_mez(c, cantoS, 0.3);                               // los cantos gastados
    const es = Math.min(Math.hypot(AW - 1 - i, j), Math.hypot(AW - 1 - i, AH - 1 - j));
    if (es < 7 && h(i >> 1, j >> 1, 86) < 0.6) c = e_mez(c, canto, 0.5);                             // las esquinas romas
    T[j * AW + i] = c;
  }
  const P = (i, j, c) => { i = Math.round(i); j = Math.round(j); if (i > 0 && j > 0 && i < AW - 1 && j < AH - 1) T[j * AW + i] = c; };
  // las rozaduras (rayitas claras en diagonal)
  for (let k = 0; k < 9; k++) { const i0 = 12 + h(k, 1, 87) * (AW - 30), j0 = 8 + h(k, 2, 87) * (AH - 20), L = 4 + h(k, 3, 87) * 8;
    for (let s = 0; s < L; s++) P(i0 + s, j0 + s * 0.35, fibC); }
  if (fuera) { // el cerco del café, a medio borrar, y la marca de la grapa del lomo
    for (let a = 0; a < 80; a++) { if (a % 13 > 9) continue; const an = a / 80 * Math.PI * 2; P(62 + Math.cos(an) * 9, AH - 16 + Math.sin(an) * 8, hex('#a8875a')); P(62 + Math.cos(an) * 8, AH - 16 + Math.sin(an) * 7, hex('#bea06e')); }
    for (const j of [20, AH - 20]) { P(2, j, hex('#8a8a90')); P(2, j + 1, hex('#c8ccd4')); P(2, j + 2, hex('#8a8a90')); }
  } else { // el bolsillo de dentro: la solapa más clara, su borde, la sombra de encima y un clip
    for (let i = 8; i < AW - 3; i++) { const jb = Math.round(AH * 0.7 + 4 * Math.sin((i - 8) / (AW - 11) * Math.PI));
      for (let j = jb; j < AH - 2; j++) T[j * AW + i] = e_mez(T[j * AW + i], hex('#d0bc90'), 0.35); P(i, jb, hex('#6a5638')); P(i, jb - 1, hex('#7a6444')); P(i, jb + 1, hex('#e0cca0')); }
    const ci = Math.round(AW * 0.5), cj = Math.round(AH * 0.66);
    for (let j = -6; j <= 4; j++) { P(ci - 1, cj + j, hex('#8a8e96')); P(ci + 1, cj + j, hex('#c8ccd4')); } P(ci, cj - 6, hex('#a8acb4')); P(ci, cj + 4, hex('#a8acb4')); P(ci, cj - 4, hex('#e8ecf0'));
  }
  return (e_cartones[k] = T);
}

// la sombra de un objeto sobre la mesa (oscurece lo que hay debajo)
function e_sombraMesa(R, x0, y0, x1, y1, a = 0.35) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (x >= 0 && y >= 0 && x < 320 && y < 180) R.pset(x, y, e_mez(R.pget(x, y), hex('#1a0e08'), a));
}

// el perfil del Qurn: una cumbre natural de caliza, ancha y torcida (la ladera de la izquierda más tendida, con un
// hombro; la de la derecha más brava), con la cima roma y en escalones (cada capa de roca deja una repisa en el perfil)
function f_ldQurnTop(x, cx, cy) {
  const d = x - cx, a = d < 0 ? -d : d;
  let v = d < 0 ? (a <= 16 ? a * 0.55 : a <= 30 ? 8.8 + (a - 16) * 0.15 : 10.9 + (a - 30) * 0.6)   // el hombro de la izquierda
    : a * 0.7 + (a > 10 ? Math.min(4, a - 10) : 0);                                                  // el tajo de la derecha
  if (a < 5) v = a * 0.25;                                            // la cima, roma
  const esc = v % 4.5; v = v - esc + Math.max(0, esc - 1.8) * 1.6;    // las repisas de cada capa
  return cy + v + (f_ldR1(x, 136, 3) - 0.5) * 1.6 + (f_ldR1(x, 139, 9) - 0.5) * 2.4;
}

// la cumbre del Qurn (detrás de los riscos, en calima): capas de caliza horizontales con su repisa clara arriba y la
// sombra debajo, chimeneas y regueros verticales oscuros, el filo de la cresta encendido y el pie en canchal
function f_ldQurn(R, cx, cy, base) {
  const L = f_LDC.lejos;
  for (let x = Math.max(0, cx - 80); x <= Math.min(319, cx + 70); x++) {
    const yt = Math.round(f_ldQurnTop(x, cx, cy)), d = x - cx, gully = h(Math.floor((x + 1) / 4), 0, 141) > 0.72, chim = h(Math.floor(x / 9), 1, 141) > 0.6 && (x % 9) < 2;
    for (let y = Math.max(0, yt); y <= base; y++) {
      const u = y - yt, capa = (y + Math.round(f_ldR1(x, 142, 14) * 3)) % 5;
      let l = 0.6 + (d < 0 ? 0.06 : -0.05) + (capa === 0 ? 0.2 : capa === 1 ? 0.06 : capa === 4 ? -0.16 : 0) + (h(x >> 1, y >> 1, 143) - 0.5) * 0.12;
      if (gully && u > 3) l -= 0.12; if (chim && u > 6) l -= 0.18;
      if (u > 18 && h(x, y >> 1, 144) > 0.55) l += 0.1;   // el canchal del pie, piedra suelta clara
      if (u === 0) l = 0.95; else if (u === 1) l += 0.12;
      R.pset(x, y, f_ldT(L, Math.max(0, Math.min(1, l)), x, y));
    }
  }
}

// un afloramiento de caliza en la ladera (la roca madre que asoma): la repisa de arriba clara, la cara con sus capas y
// grietas, la sombra debajo y unas piedras caídas al pie; (x, y): el pie, en el centro; w, hh: ancho y alto
function f_ldLosa(R, x, y, w, hh, k = 0) {
  for (let i = -w - 2; i <= w + 4; i++) { const yy = y + 1 + Math.round(Math.abs(i) * 0.08); for (let j = 0; j < 2; j++) R.pset(x + i, yy + j, f_ldMez(R.pget(x + i, yy + j), f_LDC.sombra, j ? 0.2 : 0.38)); }
  for (let i = -w; i <= w; i++) { const top = y - hh + Math.round(Math.abs(i) / w * hh * 0.45 + (h(i >> 1, k, 145) - 0.5) * 1.6);
    for (let yy = top; yy <= y; yy++) { const u = yy - top, capa = (yy + (k & 3)) % 3;
      let l = u === 0 ? 0.92 : 0.58 + (capa === 0 ? 0.1 : capa === 2 ? -0.1 : 0) - (i > w * 0.5 ? 0.14 : 0) - u / (hh * 6) + (h(i, yy, 146) - 0.5) * 0.1;
      if (h(Math.floor((i + w) / 5), k, 147) > 0.75 && (i + w) % 5 === 0 && u > 1) l -= 0.25;
      R.pset(x + i, yy, f_ldT(f_LDC.roca, Math.max(0, Math.min(1, l)), x + i, yy)); } }
  for (let n = 0; n < 3; n++) f_ldPiedra(R, x + Math.round((h(n, k, 148) - 0.3) * w * 1.6), y + 1 + n % 2, 1 + (n === 0 ? 1 : 0), 1, f_LDC.roca, 0.6);
}

// una mata seca de desierto (de lejos o de cerca, e): tallos finos en abanico, ocres y verde gris, con su sombrita
function f_ldMata(R, x, y, e = 1, k = 0) {
  const cs = [hex('#8a7a4a'), hex('#a8945a'), hex('#7a8058'), hex('#5a5a3a')];
  for (let i = -3 * e; i <= 4 * e; i++) R.pset(x + i, y + 1, f_ldMez(R.pget(x + i, y + 1), f_LDC.sombra, 0.3));
  for (let n = 0; n < 5 + e * 2; n++) { const an = -Math.PI / 2 + (n / (4 + e * 2) - 0.5) * 2.2 + (h(n, k, 149) - 0.5) * 0.3, L = (3 + h(n, k, 150) * 3) * e;
    for (let r = 0; r <= L; r++) R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), cs[(n + k) % 3]);
    R.pset(Math.round(x + Math.cos(an) * L), Math.round(y + Math.sin(an) * L), cs[3]); }
}

// el camino del escarabajo (o.escarabajo 0–1) en 'gravimetro': cruza por delante del trípode por y 160 y, pasada la
// mitad, baja hacia la cámara hasta y 176, por DELANTE de la caja del portátil
function f_ldEscarabajoPaso(e) {
  e = Math.max(0, Math.min(1, e)); const u = Math.max(0, (e - 0.45) / 0.55);
  return [Math.round(96 + 140 * e), Math.round(160 + 16 * (u * u * (3 - 2 * u)))];
}

// el escarabajo con su bola y el rastro que deja en la arena
function f_ldEscarabajo(R, t, e) {
  if (e <= 0) return;
  const [x, y] = f_ldEscarabajoPaso(e);
  for (let i = 1; i < 12; i++) if (i % 3) { const [, yy] = f_ldEscarabajoPaso(e - i * 0.022); R.pset(x - 10 - i * 3, yy, f_ldMez(f_LDC.roca[5], f_LDC.k, 0.25)); }
  PIEZAS_TU.escarabajo(R, x, y, { paso: t * 8, dir: -1 });
}

// LA ETIQUETA DE ENVÍO pegada en la cara de delante de la caja grande (16 × 9 px, esquina de arriba a la izquierda en
// x, y): papel con su filo, un recuadro rojo de «frágil», barras en lugar de letras, un código de barras y la
// esquina de abajo un poco levantada (sin letras)
function g_hyEtiquetaCaja(R, x, y) {
  const K = g_hyK, E = g_hyE, { rect, pset } = R, pa = hex('#f2ead6'), ps = hex('#cfc4a8'), ti = hex('#3a3430');
  rect(x + 1, y + 9, x + 16, y + 9, E.cartonS); rect(x + 16, y + 1, x + 16, y + 9, E.cartonS);   // su sombrita
  rect(x, y, x + 15, y + 8, ps); rect(x + 1, y + 1, x + 14, y + 7, pa);
  // el recuadro rojo de «frágil» (un bloque de color, sin letras ni dibujo)
  rect(x + 1, y + 1, x + 3, y + 5, E.rotR); rect(x + 1, y + 5, x + 3, y + 5, hex('#9a2428'));
  // las barras (en lugar de letras) y el código de barras
  rect(x + 5, y + 1, x + 13, y + 1, ti); rect(x + 5, y + 3, x + 10, y + 3, ps); rect(x + 5, y + 4, x + 12, y + 4, ps);
  for (let i = 5; i <= 13; i++) if (h(i, 3, 194) < 0.6) { pset(x + i, y + 6, ti); pset(x + i, y + 7, ti); }
  // la esquina levantada
  pset(x + 14, y + 7, ps); pset(x + 15, y + 8, E.cartonL); pset(x + 15, y + 7, ps);
}

// los colores del cartón por dentro, en dos juegos: [0] a oscuras (sin más luz que la rendija de las solapas) y [1] a la
// luz de la linterna. caras: fondo, suelo, techo, pared izquierda, pared derecha; luego las fibras, el canal de la onda,
// las aristas, la cinta, la etiqueta, las grapas, el polvo, la mancha de agua, la telaraña y el papel de embalar
const G_HYDENP = [
  { caras: ['#4e3620', '#5a3f22', '#24180c', '#382614', '#422d16'], fibraL: '#6a4a28', fibraD: '#2a1c0e', canal: '#3a2814', arista: '#74552e', sombra: '#1a1108',
    cinta: '#605032', cintaL: '#80704a', cintaD: '#3a3020', papel: '#9a8a6a', papelS: '#76684e', tinta: '#2a2620', rojo: '#5e2e28', grapa: '#646a74', grapaL: '#9aa0aa',
    polvo: '#625a4c', polvoL: '#7c7262', mancha: '#36261a', hilo: '#7a6e5a', bola: '#8e7e62', bolaS: '#665840' },
  { caras: ['#b4844c', '#c4965a', '#76512c', '#93683a', '#a57744'], fibraL: '#d6aa70', fibraD: '#865c32', canal: '#9a6c3c', arista: '#e2b878', sombra: '#5a3c1e',
    cinta: '#d4bc84', cintaL: '#f6e6b6', cintaD: '#a48a56', papel: '#f2ecda', papelS: '#cec4ac', tinta: '#2c2824', rojo: '#c83a34', grapa: '#a4acb8', grapaL: '#ffffff',
    polvo: '#a49c8c', polvoL: '#d0c8b6', mancha: '#93683a', hilo: '#eadcc0', bola: '#ece8dc', bolaS: '#b8b2a2' },
].map((p) => { const o = {}; for (const k in p) o[k] = Array.isArray(p[k]) ? p[k].map(hex) : hex(p[k]); return o; });

// la cara del interior de la caja en la que cae (x, y): 0 fondo, 1 suelo, 2 techo, 3 pared izquierda, 4 pared derecha
function g_hyDentroCara(x, y) {
  const [fx0, fy0, fx1, fy1] = G_HYDEN.fondo;
  if (x >= fx0 && x <= fx1 && y >= fy0 && y <= fy1) return 0;
  const techo = x < fx0 ? y < fy0 * x / fx0 : x > fx1 ? y < fy0 * (319 - x) / (319 - fx1) : y < fy0;
  const suelo = y > fy1 && (x < fx0 ? y > fy1 + (fx0 - x) * (179 - fy1) / (fx0 + 40) : x > fx1 ? y > fy1 + (x - fx1) * (179 - fy1) / (360 - fx1) : true);
  return suelo ? 1 : techo ? 2 : x < 160 ? 3 : 4;
}

// EL INTERIOR DE LA CAJA con el juego de colores L (0 a oscuras, 1 a la luz): el cartón de las cinco caras con su fibra,
// el canal de la onda (vertical en las paredes, hacia el fondo en el suelo y el techo) y la sombra de las aristas; las
// solapas de arriba con su junta y la solapa corta del fondo; en el suelo, la junta de las solapas de abajo con su
// cinta de embalar (brillo y arrugas) y cuatro grapas; en la pared izquierda, la pestaña de la junta de fábrica con su
// fila de grapas; en el fondo, la etiqueta de envío (barras y código, sin letras, con la esquina levantada) y una
// mancha de agua; una telaraña en la esquina de arriba a la derecha; polvo y pelusas en los rincones, migas, una bola
// de papel arrugado, cacahuetes de embalar y un hilo
function g_hyDentroPinta(R, L) {
  const P = G_HYDENP[L], { pset, linea, disco, rect } = R, [fx0, fy0, fx1, fy1] = G_HYDEN.fondo, cy = (fy0 + fy1) >> 1;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const cara = g_hyDentroCara(x, y), n = h(x, y, 181), b = g_hyB4(x, y);
    let c = P.caras[cara];
    // el canal de la onda, tramado para que se lea como cartón y no como tablas
    if (cara === 0 ? x % 5 === 0 && b < 0.45 : cara >= 3 ? x % 6 === 0 && b < 0.45 : Math.abs(Math.round((x - 160) * 34 / Math.max(1, Math.abs(y - cy))) % 9) === 0 && b < 0.4) c = P.canal;
    // la fibra del cartón
    if (n < 0.05) c = P.fibraL; else if (n > 0.95) c = P.fibraD;
    // la sombra de las aristas y los rincones
    const e = cara === 0 ? Math.min(x - fx0, fx1 - x, y - fy0, fy1 - y) : Math.max(fx0 - x, x - fx1, fy0 - y, y - fy1);
    if (e < 6 && b < (6 - e) / 9) c = P.sombra;
    // a oscuras, el resplandor de la rendija de arriba en el fondo y en el techo
    if (!L) { const g = 1 - Math.hypot((x - 160) / 70, (y - 34) / 34); if (g > 0 && b < g * 0.5 && cara !== 1) c = n < 0.5 ? P.fibraL : P.caras[1]; }
    pset(x, y, c);
  }
  // las aristas, un poco más claras (sin entrar en la barra del año ni en la esquina de Atom)
  const ar = (x, y) => { if (y >= 22 && !(x >= 272 && y <= 48) && x >= 0 && x <= 319 && y <= 179) pset(x, y, P.arista); };
  for (let i = 0; i <= 200; i++) { const u = i / 200; ar(Math.round(fx0 * u), Math.round(fy0 * u)); ar(Math.round(319 + (fx1 - 319) * u), Math.round(fy0 * u));
    ar(Math.round(fx0 + (-40 - fx0) * u), Math.round(fy1 + (179 - fy1) * u)); ar(Math.round(fx1 + (360 - fx1) * u), Math.round(fy1 + (179 - fy1) * u)); }
  for (let x = fx0; x <= fx1; x++) { ar(x, fy0); ar(x, fy1); } for (let y = fy0; y <= fy1; y++) { ar(fx0, y); ar(fx1, y); }
  // las solapas de arriba: la junta del centro con el canto de la onda a los dos lados, y la solapa corta del fondo
  for (let y = 22; y < fy0; y++) { pset(159, y, P.sombra); pset(161, y, P.sombra); if (y % 3) { pset(158, y, P.arista); pset(162, y, P.arista); } }
  for (let x = fx0 + 10; x <= fx1 - 10; x++) { pset(x, fy0 - 5, P.canal); if (!(x & 1)) pset(x, fy0 - 4, P.sombra); }
  // el suelo: la solapa corta de abajo, la junta de las solapas largas y la cinta que la cierra, que se ensancha hacia nosotros
  for (let x = 20; x <= 300; x++) { const yy = fy1 + 9; if (g_hyDentroCara(x, yy) === 1) { pset(x, yy, P.canal); if (x & 1) pset(x, yy + 1, P.sombra); } }
  for (let y = fy1 + 1; y <= 179; y++) { const hw = 3 + (y - fy1) * 0.22, a = Math.round(160 - hw), z = Math.round(160 + hw);
    for (let x = a; x <= z; x++) { const v = (x - a) / Math.max(1, z - a); let c = x === a || x === z ? P.cintaD : P.cinta;
      if (Math.abs(v - 0.3) < 0.07 && g_hyB4(x, y) < 0.6) c = P.cintaL; if (x === 160 && g_hyB4(x, y) < 0.5) c = P.cintaD;
      if ((y + Math.round(v * 9)) % 13 === 0 && v > 0.45 && v < 0.9) c = P.cintaD; pset(x, y, c); } }
  for (const [gy, gx] of [[146, 26], [168, 34]]) for (const s of [-1, 1]) { const x = 160 + s * gx, w = 3 + ((gy - 120) >> 4); linea(x - w, gy, x + w, gy, P.grapa); pset(x - w, gy, P.grapaL); pset(x - w, gy + 1, P.sombra); pset(x + w, gy + 1, P.sombra); }
  // la pestaña de la junta de fábrica en la pared izquierda, junto al rincón, con su fila de grapas
  for (let y = 30; y <= 127; y++) { if (g_hyDentroCara(61, y) !== 3) continue; pset(61, y, P.sombra); pset(62, y, P.arista); }
  for (let y = 40; y <= 118; y += 10) { rect(65, y, 65, y + 3, P.grapa); pset(65, y, P.grapaL); pset(64, y, P.sombra); pset(64, y + 3, P.sombra); pset(66, y + 4, P.sombra); }
  // la etiqueta de envío en el fondo (barras y código, sin letras), con la esquina de abajo levantada y su sombra
  { const x0 = 184, y0 = 46, x1 = 214, y1 = 68;
    rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, P.sombra); rect(x0, y0, x1, y1, P.papelS); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, P.papel);
    rect(x0 + 2, y0 + 2, x0 + 16, y0 + 4, P.tinta); rect(x1 - 6, y0 + 2, x1 - 2, y0 + 4, P.rojo);
    for (const [yy, l] of [[y0 + 7, 20], [y0 + 9, 14], [y0 + 11, 22]]) rect(x0 + 2, yy, x0 + 2 + l, yy, P.papelS);
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) if (h(i, j, 195) < 0.5 || (i < 2 && j < 2)) pset(x1 - 8 + i, y0 + 7 + j, P.tinta);
    for (let x = x0 + 2; x <= x0 + 19; x++) if (h(x, 4, 196) < 0.55) rect(x, y0 + 15, x, y1 - 3, P.tinta);
    for (let i = 0; i < 5; i++) for (let j = 0; j <= i; j++) pset(x1 - 4 + i, y1 - 4 + (4 - j), i === j ? P.sombra : P.papelS);
    pset(x1 - 5, y1 - 1, P.papelS); }
  // la mancha de agua del fondo: un cerco irregular y su velo
  for (let y = 84; y <= 112; y++) for (let x = 86; x <= 124; x++) { const d = Math.hypot((x - 104) / 15, (y - 98) / 10) + (h(x >> 1, y >> 1, 197) - 0.5) * 0.12; if (Math.abs(d - 1) < 0.06) pset(x, y, P.mancha); else if (d < 1 && g_hyB4(x, y) < 0.22) pset(x, y, P.mancha); }
  // la telaraña de la esquina de arriba a la derecha (hilos desde el rincón y dos vueltas)
  { const cx = fx1, cyy = fy0, R0 = [[-16, 0], [-12, -6], [0, -8], [8, 6], [6, 14], [-10, 10]];
    for (const [dx, dy] of R0) linea(cx, cyy, cx + dx, cyy + dy, P.hilo);
    for (const f of [0.45, 0.8]) for (let k = 0; k < R0.length - 1; k++) { const [a1, b1] = R0[k], [a2, b2] = R0[k + 1]; linea(Math.round(cx + a1 * f), Math.round(cyy + b1 * f), Math.round(cx + a2 * f), Math.round(cyy + b2 * f), P.hilo); } }
  // el polvo: pelusas en los dos rincones del fondo y migas por el suelo (fuera de la cinta)
  for (const [px, py, w] of [[82, 125, 9], [240, 126, 8], [50, 158, 6]]) for (let k = 0; k < 44; k++) { const a = h(k, px, 198) * 6.283, r = Math.sqrt(h(k, py, 199)), x = Math.round(px + Math.cos(a) * r * w), y = Math.round(py + Math.sin(a) * r * w * 0.38); pset(x, y, k % 3 ? P.polvo : P.polvoL); if (k % 5 === 0) pset(x + 1, y - 1, P.polvoL); }
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 200) * 319), y = fy1 + 3 + Math.round(h(k, 2, 200) * (176 - fy1)); if (g_hyDentroCara(x, y) === 1 && Math.abs(x - 160) > 4 + (y - fy1) * 0.24) pset(x, y, k % 4 ? P.polvo : P.polvoL); }
  // la bola de papel arrugado (delante, a la izquierda), con sus pliegues y su sombra
  { const bx = 84, by = 158; for (let y = -3; y <= 3; y++) for (let x = -11; x <= 11; x++) if (Math.hypot(x / 11, y / 3) < 1 && g_hyB4(bx + x, by + 6 + y) < 0.6) pset(bx + 3 + x, by + 6 + y, P.sombra);
    disco(bx, by, 8, P.bolaS); disco(bx - 1, by - 1, 7, P.bola);
    for (const [a, b, c2, d] of [[-6, -2, -1, 1], [-1, 1, 4, -3], [-3, 4, 3, 2], [1, -6, 3, -1], [-5, 3, -2, 6]]) linea(bx + a, by + b, bx + c2, by + d, P.bolaS); pset(bx - 4, by - 4, P.papel); pset(bx - 3, by - 5, P.papel); }
  // los cacahuetes de embalar (en forma de S tumbada) y su sombrita
  for (const [x, y] of [[112, 136], [121, 140], [206, 152], [222, 160]]) { rect(x, y + 3, x + 6, y + 3, P.sombra); rect(x, y, x + 2, y + 2, P.bola); rect(x + 3, y + 1, x + 5, y + 2, P.bola); pset(x + 6, y, P.bola); rect(x + 3, y + 2, x + 5, y + 2, P.bolaS); pset(x, y, P.papel); }
  // un hilo de bramante suelto que serpentea por el suelo, a la derecha
  for (let i = 0; i <= 60; i++) { const x = 196 + i, y = Math.round(168 - i * 0.18 + Math.sin(i * 0.22) * 3); pset(x, y, P.hilo); if (i % 7 === 0) pset(x, y + 1, P.sombra); }
}
