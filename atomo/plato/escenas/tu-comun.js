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
// actores). Opciones de todo el grupo: o.luz 'dia' (por omisión: sol duro, sombras cortas y azuladas, calima que tiembla
// sobre la roca) | 'tarde' (sol bajo, rosa y naranja, sombras largas) | 'noche' (azul, estrellas, un farol);
// o.epoca 1922 (por omisión) | 2014 | 2026.
//   'valle': EL VALLE (canon) al sol, en 1922: el cauce seco de piedras en el centro, los acantilados escalonados, el
//     pico de pirámide al fondo a la izquierda, conos de escombro claro de otras excavaciones, cestas de esparto, una
//     criba en un caballete, un raíl de vagonetas con una vagoneta, y a la derecha los montones de arena que mira Carter
//     (carterTU, de pie en libre). Polvo que levanta el viento (T.viento), un milano que planea (T.halcon) lejos de
//     Atom. o.epoca 2026: el mismo valle hoy (sendero asfaltado, un toldo, un autobús diminuto) y, arriba en la ladera
//     de la derecha (x 220–260, y 50–70), la perforadora pequeña ESPERANDO bajo el sol con su lona (tu-permiso), sin
//     nadie. (tu-carter, tu-permiso.) Devuelve suelo 150, libre, arena: [x, y] (el montón que mira Carter), y en 2026
//     perforadora: [x, y]. Cámara 'arena': los montones de arena de cerca, a la altura de Carter: la pala clavada, una
//     criba con piedrecitas, una cesta volcada, huellas, un termo y el sombrero de Carter en el suelo (o.sombrero
//     false: lo lleva puesto); arena que resbala del montón (o.resbala 0–1). Devuelve suelo y pala: [x, y].
//   'tienda': el campamento de Carter a la entrada del valle: una casa de trabajo de adobe con toldo de lona a rayas
//     (sin letras), una mesa plegable con un mapa enrollado, un quinqué, sillas de lona, cajas de embalaje, un burro
//     atado a la sombra, un botijo que gotea. carnarvonTU sentado a la mesa cuenta billetes y suspira (o.billetes 0–1:
//     el fajo que mengua). La mesa plegable y su mantel van en valleDelante. Cámara 'mesa' (inserto): la mesa DESDE
//     ARRIBA: billetes de libra (rayas y un número: R.numero), un monedero abierto y vacío, la libreta de cuentas con
//     columnas de rayas que suman (o.suma 0–1), una pluma, una taza de té con su vapor, y un CALENDARIO de mesa con la
//     ÚLTIMA temporada: una hoja con 1922 (R.numero) rodeada en rojo (o.rodea 0–1). (tu-carter.) Devuelve mesa:
//     [x0, y0, x1, y1] y, en la cámara, calendario: [x, y], billetes: [x, y].
//   'chozas': el pie del acantilado con los restos de las CHOZAS de obreros antiguos (muretes bajos de piedra seca,
//     esquinas de habitaciones de un palmo, cascos de cerámica, una piedra de moler) y los obreros (obrero1TU,
//     obrero2TU) que retiran piedras a cestas; detrás, la boca de la tumba de otro rey (un hueco negro grande en la
//     roca, a la izquierda, sin nada dentro). o.limpio 0–1: los muretes van desapareciendo; o.escalones 0–3: van
//     apareciendo los escalones tallados en la roca, de arriba abajo, en x 150–200 (polvo que sale al barrer). La
//     cesta grande de delante va en valleDelante. Cámara 'escalon': A RAS DE SUELO, el primer escalón de cerca: la
//     arena que una mano (T.mano) barre (o.barre 0–1) y deja ver el filo tallado, recto, de la piedra; detrás se adivina
//     el segundo (o.escalones). (tu-carter.) Devuelve escalon: [x, y] (el filo del primero) y, en la cámara, mano: [x, y].
//   'escalera': LOS DIECISÉIS ESCALONES bajando hacia la puerta (vista desde arriba en tres cuartos, desde el borde): la
//     zanja tallada en la roca, los escalones, y al fondo la PUERTA tapiada (canon «la segunda puerta», aquí la
//     primera: igual, más clara) con sus sellos intactos; Carter (carterTU) baja; obreros arriba con cestas. o.tapada
//     0–1: la zanja se vuelve a llenar de arena hasta taparla (Carter la vuelve a tapar). Cámara 'sellos' (inserto): la
//     puerta de cerca: piedras enlucidas, filas de sellos ovales (el chacal sobre nueve arcos, nuestro) en relieve, una
//     cuerda vieja, la luz de un farol que barre (o.farol 0–1). (tu-carter.) Devuelve suelo (el rellano de abajo),
//     puerta: [x0, y0, x1, y1] y, en la cámara, sello: [x, y] (el más claro, para el dedo).
//   'telegrafo': la oficina del telégrafo del pueblo (Luxor, 1922): paredes encaladas, un ventilador de techo, un
//     mapa sin letras, un reloj de pared, la mesa del telegrafista (telegrafistaTU) con el manipulador de latón y el
//     aparato de cinta, del que SALE LA CINTA de papel (PIEZAS_TU.cintaTelegrafo) que no se acaba nunca: cae al suelo,
//     se enrolla y sale por la puerta abierta de la derecha (fuera, la calle al sol, recortada a la puerta), donde un
//     BURRO asoma la cabeza y se la empieza a comer (o.cinta 0–1: lo larga que es; o.burro 0–1: el burro entra en la
//     puerta y mastica). El mostrador de madera va en valleDelante. Cámara 'cinta' (inserto): la cinta de cerca,
//     saliendo del aparato con sus PUNTOS Y RAYAS (morse, sin letras) y corriendo (o.corre: velocidad), con los bucles
//     que caen hasta el suelo y, a la derecha, el morro del burro que mordisquea la punta (o.burro 0–1). (tu-carter.)
//     Devuelve mostrador: y del tablero, aparato: [x, y], puerta: [x0, y0, x1, y1] y, en la cámara, boca: [x, y].
//   'entrada': la ENTRADA de la tumba en el valle HOY (o.epoca 2014 por omisión; 2015 y 2020 igual): la boca con su
//     barandilla de metal y un toldo de lona, el muro de contención de piedra, una caseta de vigilante, un banco, y una
//     COLA de turistas (EL.turista1, EL.turista2 y siluetas pequeñas) con gorras, abanicos y botellas de agua que
//     baja hasta el valle; un letrero solo con rayas y un pictograma de cámara tachada. o.cola 0–1: lo larga que es la
//     cola. La barandilla de delante va en valleDelante. Cámara 'cola': la cola de cerca y de lado, a la altura de
//     las cabezas: abanicos, sudor (gotitas), móviles en alto, el aliento como nubecillas que entran por la boca de la
//     tumba (o.aliento 0–1), y un guarda que cuenta con los dedos. (tu-escaneo.) Devuelve suelo, libre, boca:
//     [x0, y0, x1, y1] y, en la cámara, cola: [x0, x1].
const V_VALLE = {
  valle: { cam: 'arena', general: { col: ['#f0dcb4', '#a8865c'], geo: { suelo: 150, libre: [150, 270], arena: [236, 136], perforadora: [240, 62] } }, arena: { col: ['#e8cc98', '#c4a46c'], geo: { suelo: 156, libre: [40, 200], pala: [230, 124] } } },
  tienda: { cam: 'mesa', general: { col: ['#e8d8b0', '#8a6a48'], geo: { suelo: 154, libre: [40, 250], mesa: [96, 128, 210, 134] } }, mesa: { col: ['#c8a070', '#6e5034'], geo: { suelo: 180, libre: [0, 0], calendario: [232, 76], billetes: [130, 104] } } },
  chozas: { cam: 'escalon', general: { col: ['#e0c49a', '#a07a50'], geo: { suelo: 150, libre: [30, 280], escalon: [174, 150] } }, escalon: { col: ['#e8cc98', '#9a7448'], geo: { suelo: 132, libre: [20, 300], escalon: [160, 120], mano: [176, 112] } } },
  escalera: { cam: 'sellos', general: { col: ['#d8b88a', '#7a5a3a'], geo: { suelo: 158, libre: [110, 230], puerta: [136, 96, 192, 150] } }, sellos: { col: ['#d0bc98', '#8a6a48'], geo: { suelo: 176, libre: [0, 0], sello: [164, 92] } } },
  telegrafo: { cam: 'cinta', general: { col: ['#ece4d4', '#8a7a62'], geo: { suelo: 156, libre: [30, 230], mostrador: 132, aparato: [118, 122], puerta: [244, 58, 296, 156] } }, cinta: { col: ['#f4ecd8', '#6a5a48'], geo: { suelo: 170, libre: [0, 0], boca: [270, 128] } } },
  entrada: { cam: 'cola', general: { col: ['#ecd8b0', '#8a7058'], geo: { suelo: 152, libre: [20, 300], boca: [120, 92, 180, 152] } }, cola: { col: ['#e4d0a8', '#7a6048'], geo: { suelo: 166, libre: [20, 300], cola: [30, 250] } } },
};
export function valle(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  return vista(R, t, o, V_VALLE);
}
// lo de delante de los personajes en cada encuadre de valle(); se llama después de los actores, con las mismas opciones
export function valleDelante(R, t, o = {}) {
  return {};
}

// ── B · Dentro de la tumba (la antecámara, la cámara pintada NUESTRA, el sarcófago CERRADO) ───────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en tumbaDelante (se llama después de los
// actores). CUIDADO: la momia NO se ve nunca (el sarcófago, CERRADO; ningún ataúd abierto; nada envuelto en vendas); el
// ajuar, la máscara, el trono, los carros y las capillas, NUESTROS. Opciones de todo el grupo: o.vela 0–1 (la luz de una
// vela que tiembla: charco ámbar, sombras que bailan, el resto en azul oscuro; con 0, la luz que diga la época);
// o.epoca 1922 (por omisión: farol y vela) | 'antigua' (hacia 1323 a. C.: lámparas de aceite, obreros y escribas
// antiguos) | 2015 (luz eléctrica blanca, barandilla de madera y pasarela, turistas).
//   'pasillo': el pasillo de bajada, en 1922 y de noche: paredes de roca tallada sin pintar, escombro de piedras a los
//     lados, la escalera al fondo a la izquierda con un trozo de cielo estrellado (recortado a la boca), y a la derecha
//     LA SEGUNDA PUERTA (canon) enlucida con sus sellos; Carter (carterTU) con la vela, Carnarvon (carnarvonTU), su hija
//     y un ayudante detrás (siluetas). El farol del suelo y las piedras de delante van en tumbaDelante. Cámara 'hueco':
//     LA SEGUNDA PUERTA DE CERCA (inserto): los sellos, el hueco pequeño recién abierto (x 120–136, y 70–82, negro con
//     un brillo dorado dentro: o.oro 0–1; o.abierta 0–1: el hueco se va abriendo, piedra a piedra, con polvo y un
//     cincel; con 0, la puerta entera) y la VELA (PIEZAS_TU.vela) en una mano (T.mano) que se acerca (o.acerca 0–1);
//     o.soplo 0–1: el aire de la tumba dobla la llama hacia fuera hasta APAGARLA (un hilo de humo) y o.enciende 0–1 la
//     vuelve a encender (una cerilla). (tu-gancho, tu-vela.) Devuelve suelo, libre, puerta: [x0, y0, x1, y1], hueco:
//     [x, y] y, en la cámara, vela: [x, y] (dónde va la llama).
//   'antecamara': LA ANTECÁMARA ABARROTADA, vista desde el hueco de la puerta (como la ve Carter): carros dorados
//     desmontados apilados, tres camas rituales con cabezas de animal (vaca, león, hipopótamo: nuestras, chibis), cofres
//     pintados, cestas, jarras de alabastro, el TRONO de respaldo dorado, dos estatuas guardianas negras y doradas a los
//     lados de una puerta tapiada, todo amontonado como en un trastero; destellos de oro (o.oro 0–1: con la vela se
//     encienden poco a poco, golpe en «cosas maravillosas»). o.vela 1 por omisión (con 0, el farol eléctrico de 1923,
//     blanco). Sin suelo libre: los actores no entran (libre vacío). Cámara 'ajuar': de cerca, un montón de ajuar a la
//     luz de la vela: el trono de lado, un cofre con su tapa pintada (pictogramas de caza), una rueda de carro, un
//     abanico de plumas, un vaso en forma de loto, brillos que corren por el oro con la llama. (tu-vela.) Devuelve suelo
//     y trono: [x, y] (y en la cámara, brillo: [x, y]).
//   'plano': el PLANO DE LA TUMBA desde arriba sobre papel de calco cuadriculado (PIEZAS_TU.planoTumba, grande): la
//     escalera, el pasillo y los CUATRO cuartos (antecámara, anexo, cámara pintada en ocre y tesoro), cada uno en su
//     contorno; o.contar 0–4: los cuartos se encienden uno a uno con un número (R.numero); o.comparar 0–1: a la derecha
//     se desenrolla el plano de la TUMBA DE UN REY GRANDE, larguísima, con pasillos, pozos y diez cuartos, que deja la
//     de Tutankamón chiquita; una regla, un lápiz, una escuadra. Cámara 'apretado' (inserto): LA ANTECÁMARA EN PLANTA,
//     desde arriba, llenándose de cajitas y siluetas de objetos (o.objetos 0–1: caen uno tras otro hasta que no cabe
//     ni una aguja) y un contador grande que sube hasta 5000 (o.cuenta 0–1, R.numero) en una etiqueta de cartón.
//     (tu-pequena.) Devuelve hoja: [x0, y0, x1, y1], cuartos: [[x, y] ×4] y, en la cámara, contador: [x, y].
//   'capillas': la cámara del sarcófago en la ÉPOCA ANTIGUA (o.epoca 'antigua' por omisión): a la luz de lámparas de
//     aceite, obreros antiguos (EL.campesino, obrero1TU vestido de antiguo) montan las CAPILLAS DORADAS una dentro de
//     otra (cajas doradas con relieves de pictogramas y techo curvo) alrededor del sarcófago CERRADO; cuerdas, rodillos
//     de madera, un capataz que señala; las paredes ya pintadas (canon). o.panel 0–1: un panel (PIEZAS_TU.panelCapilla)
//     sube por las cuerdas y se encaja AL REVÉS (los pictogramas quedan cabeza abajo y una flecha de dirección apunta
//     al lado contrario). Cámara 'panel' (inserto): el panel dorado de cerca, con sus relieves (un pájaro con alas
//     abiertas, un ojo, un sol) cabeza abajo, dos manos de obrero que lo empujan (T.mano) y una flecha pintada que
//     apunta mal; el obrero se rasca la cabeza (o.duda 0–1). (tu-pequena.) Devuelve suelo, libre, sarcofago:
//     [x0, y0, x1, y1] y, en la cámara, panel: [x0, y0, x1, y1].
//   'pintada': LA CÁMARA PINTADA en tres cuartos (canon): la pared norte de frente a la derecha y la oeste en escorzo a
//     la izquierda, el sarcófago CERRADO en el centro (canon), el techo oscuro, una lámpara. o.epoca 2015 por omisión:
//     luz eléctrica, una pasarela de madera con barandilla y turistas (EL.turista1, EL.turista2); o.aliento 0–1: el
//     aliento de los visitantes, nubecillas blancas que suben y dejan MANCHAS de humedad en el yeso (gotitas, un velo
//     verdoso); o.epoca 1922: sin pasarela, a la luz del farol, cajas de embalaje. La barandilla de la pasarela va en
//     tumbaDelante. Cámara 'pared' (inserto): LA PARED NORTE DE FRENTE (canon: x 24–270, y 26–148), grande, con sus tres
//     escenas; o.raya 0–1: una LÍNEA RECTA que asoma bajo la pintura, el borde de arriba de la puerta escondida (golpe
//     del gancho), como una arruga en el yeso; o.mazo 0–1: un mazo de cantero entra por la derecha, se acerca a la pared
//     y SE DETIENE a un palmo (o.para: tiembla y se retira); o.grietas 0–1: las grietas finas del yeso (para «tan
//     delicado»). (tu-pequena, tu-agujero; la cámara, tu-gancho y tu-agujero.) Devuelve suelo, libre, sarcofago:
//     [x0, y0, x1, y1], pared: [x0, y0, x1, y1] y, en la cámara, puerta: [x0, y0, x1, y1] (la escondida) y mazo: [x, y].
//   'escriba': un TALLER ANTIGUO de la necrópolis (o.epoca 'antigua'): un patio con toldo de cañas, cofres y vasos a
//     medio pintar en estantes, botes de pigmento (ocre, azul, verde, negro), pinceles de junco, un escriba sentado
//     (EL.escriba) ante un cofre (PIEZAS_TU.cofre) con un cartucho en la tapa; un aprendiz (obrero2TU) muele pigmento.
//     La mesa baja con los botes va en tumbaDelante. Cámara 'cartucho' (inserto): el cartucho de la tapa de cerca, un
//     óvalo con iconos (una pluma, un sol y un escarabajo: el nombre de OTRA persona); o.raspa 0–1: una cuchilla de
//     cobre lo raspa (virutas, el yeso blanco que queda); o.pinta 0–1: un pincel pinta encima otros iconos (un sol, un
//     ankh, una cesta: el de Tutankamón) y se nota el borde del anterior. (tu-pequena.) Devuelve suelo, libre, cofre:
//     [x, y] y, en la cámara, cartucho: [x0, y0, x1, y1].
//   'mascara': la MÁSCARA DE ORO (NUESTRA: PIEZAS_TU.mascara, grande y de frente) sobre un paño azul oscuro en una
//     vitrina de museo, con focos que le sacan brillo, rayas de lapislázuli en el tocado, el reflejo del cristal que
//     pasa (o.brillo); al fondo, la sala del museo en penumbra. Sin nada dentro ni detrás de la máscara. Cámara
//     'sarcofago': EL SARCÓFAGO CERRADO (canon) de lado, con su tapa, las diosas de las esquinas con las alas abiertas
//     y unas flores secas encima (una guirnalda pequeña); la luz de la vela (o.vela). (tu-pequena: «murió hacia los
//     diecinueve».) Devuelve mascara: [x, y] (el centro de la cara) y, en la cámara, sarcofago: [x0, y0, x1, y1].
const V_TUMBA = {
  pasillo: { cam: 'hueco', general: { col: ['#6a5038', '#2a1c14'], geo: { suelo: 156, libre: [40, 190], puerta: [200, 56, 286, 156], hueco: [228, 84] } }, hueco: { col: ['#c8b08a', '#3a2a1c'], geo: { suelo: 180, libre: [0, 0], puerta: [40, 30, 270, 180], hueco: [128, 76], vela: [126, 104] } } },
  antecamara: { cam: 'ajuar', general: { col: ['#8a6030', '#2a1808'], geo: { suelo: 160, libre: [0, 0], trono: [170, 110] } }, ajuar: { col: ['#c89038', '#3a2410'], geo: { suelo: 170, libre: [0, 0], brillo: [150, 90] } } },
  plano: { cam: 'apretado', general: { col: ['#e8e4d4', '#8a9aa8'], geo: { suelo: 180, libre: [0, 0], hoja: [20, 30, 300, 170], cuartos: [[80, 90], [110, 120], [140, 90], [165, 92]] } }, apretado: { col: ['#ece4cc', '#a08a60'], geo: { suelo: 180, libre: [0, 0], contador: [250, 150] } } },
  capillas: { cam: 'panel', general: { col: ['#a07038', '#3a2410'], geo: { suelo: 152, libre: [20, 300], sarcofago: [120, 112, 200, 152] } }, panel: { col: ['#e0b040', '#7a5018'], geo: { suelo: 180, libre: [0, 0], panel: [70, 36, 250, 160] } } },
  pintada: { cam: 'pared', general: { col: ['#e0a848', '#5a3a1c'], geo: { suelo: 152, libre: [30, 290], sarcofago: [124, 116, 204, 154], pared: [150, 30, 300, 148] } }, pared: { col: ['#f4cc78', '#b07a2c'], geo: { suelo: 149, libre: [30, 270], pared: [24, 26, 270, 148], puerta: [150, 52, 224, 148], mazo: [262, 96] } } },
  escriba: { cam: 'cartucho', general: { col: ['#e8d0a0', '#8a6038'], geo: { suelo: 154, libre: [30, 280], cofre: [150, 132] } }, cartucho: { col: ['#d8a860', '#6a4420'], geo: { suelo: 180, libre: [0, 0], cartucho: [100, 50, 220, 140] } } },
  mascara: { cam: 'sarcofago', general: { col: ['#1e2850', '#0c1030'], geo: { suelo: 180, libre: [0, 0], mascara: [160, 86] } }, sarcofago: { col: ['#7a4a3a', '#2a1810'], geo: { suelo: 156, libre: [20, 300], sarcofago: [70, 90, 250, 156] } } },
};
export function tumba(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  return vista(R, t, o, V_TUMBA);
}
// lo de delante de los personajes en cada encuadre de tumba(); se llama después de los actores, con las mismas opciones
export function tumbaDelante(R, t, o = {}) {
  return {};
}

// ── C · El Cairo, 1923, y Londres, 1939 ───────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en cairoDelante (se llama después de los
// actores). CUIDADO: la «maldición» es un INVENTO DE PERIÓDICO: titulares de rayas gruesas, signos de exclamación,
// gente que se encoge de hombros; SIN calaveras, sin momias que asustan, sin sombras ni rayos. Carnarvon murió de una
// infección: nada de cama ni de enfermo; basta una ventana que se apaga.
//   'calle': una calle de El Cairo en abril de 1923, de día: fachadas de tres pisos con balcones de celosía de madera
//     (mashrabiya), toldos, un minarete y una cúpula al fondo (no bajo Atom), un tranvía amarillo pálido que pasa (no
//     amarillo puro), un coche de época, carros de burro, gente con fez, palmeras; dos VENDEDORES DE PERIÓDICOS
//     (vendedorTU y otro pequeño) con fajos bajo el brazo que gritan (bocas abiertas, burbujas con «!»); un gato
//     egipcio flaco y digno sentado en un escalón (T.gato o el suyo). o.gente 0–1. Cámara 'vendedor': el vendedor de
//     cerca, gritando, con el periódico abierto en alto (PIEZAS_TU.periodico: columnas de rayas y un titular de rayas
//     gruesas, con un pictograma CÓMICO de la maldición: un ataúd de dibujo sonriente con un «!», nada de momia), y en el
//     escalón el GATO egipcio, muy digno, que se sube y SE SIENTA ENCIMA del periódico tirado (o.gato 0–1: su recorrido;
//     con 1, sentado y lamiéndose una pata). (tu-maldicion; la cámara, también tu-gancho.) Devuelve suelo, libre,
//     vendedor: [x, y] y, en la cámara, periodico: [x0, y0, x1, y1] (el del suelo) y gato: [x, y].
//   'hotel': la fachada de un hotel elegante de El Cairo en 1923, de tarde: columnas, una terraza con veladores y
//     sombrillas, palmeras en macetas, un portero con fez, un coche negro que espera, la luz dorada; ventanas altas con
//     contraventanas verdes. Las barandillas de la terraza van en cairoDelante. Cámara 'ventana': UNA ventana del hotel
//     de NOCHE, de cerca, con su contraventana, la cortina y una lámpara encendida detrás; o.apaga 0–1: la lámpara se
//     apaga y queda la luna en el cristal (el único modo de contar la muerte de Carnarvon: tranquilo, sin nada más);
//     abajo, en el alféizar, un telegrama doblado (PIEZAS_TU.telegrama). (tu-maldicion.) Devuelve suelo, libre, puerta:
//     [x, y] y, en la cámara, ventana: [x0, y0, x1, y1].
//   'redaccion': la redacción de un periódico en 1923: mesas con máquinas de escribir, montones de papel, teléfonos de
//     candelero, un tubo neumático, lámparas verdes colgantes, y al fondo, tras un cristal, la ROTATIVA que gira y
//     escupe periódicos (o.rotativa 0–1: cuántos salen; vuelan por la sala). Un redactor (EL.periodista2025 vestido de
//     época, o figura de fondo) teclea con prisa. La mesa de delante va en cairoDelante. Cámara 'periodico' (inserto):
//     el periódico DESDE ARRIBA sobre una mesa con café: columnas de rayas, el titular de rayas gruesas que crece
//     (o.titular 0–1) y el pictograma CÓMICO (el ataúd sonriente con «!», como en 'calle'), y o.copias 0–1: otros
//     periódicos (de otros países: otras cabeceras de rayas, otros colores) caen encima uno tras otro con el mismo
//     pictograma. (tu-maldicion.) Devuelve suelo, libre, rotativa: [x0, y0, x1, y1] y, en la cámara, titular:
//     [x0, y0, x1, y1].
//   'londres': una calle de Londres en marzo de 1939: casas adosadas de ladrillo oscuro con escaleras y verjas negras,
//     farolas de gas, niebla fina, un buzón rojo, un autobús de dos pisos al fondo, árboles sin hojas, un taxi negro;
//     Carter mayor (carterMayorTU) con su bastón, abrigo y sombrero, paseando despacio. o.niebla 0–1. La verja de
//     delante va en cairoDelante. Cámara 'puerta': la puerta de su casa de cerca, con su escalón, la aldaba, el número
//     (R.numero), la ventana con macetas de geranios, y hojas secas que el viento mueve (o.hojas 0–1); el bastón
//     apoyado en la jamba. (tu-maldicion.) Devuelve suelo, libre y, en la cámara, puerta: [x0, y0, x1, y1].
const V_CAIRO = {
  calle: { cam: 'vendedor', general: { col: ['#e8d0a0', '#8a6a48'], geo: { suelo: 154, libre: [20, 300], vendedor: [110, 154] } }, vendedor: { col: ['#e0c898', '#7a5a3a'], geo: { suelo: 166, libre: [20, 200], periodico: [210, 150, 270, 166], gato: [240, 148] } } },
  hotel: { cam: 'ventana', general: { col: ['#f0dcb0', '#9a7a52'], geo: { suelo: 156, libre: [20, 300], puerta: [160, 156] } }, ventana: { col: ['#2a3460', '#141828'], geo: { suelo: 180, libre: [0, 0], ventana: [90, 30, 230, 160] } } },
  redaccion: { cam: 'periodico', general: { col: ['#c8b898', '#5a4a38'], geo: { suelo: 154, libre: [20, 240], rotativa: [200, 40, 300, 130] } }, periodico: { col: ['#ece4cc', '#7a6a50'], geo: { suelo: 180, libre: [0, 0], titular: [70, 30, 250, 60] } } },
  londres: { cam: 'puerta', general: { col: ['#9aa4b0', '#4a4040'], geo: { suelo: 156, libre: [20, 300] } }, puerta: { col: ['#8a8a92', '#3a2a28'], geo: { suelo: 166, libre: [20, 120], puerta: [130, 40, 210, 166] } } },
};
export function cairo(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  return vista(R, t, o, V_CAIRO);
}
// lo de delante de los personajes en cada encuadre de cairo(); se llama después de los actores, con las mismas opciones
export function cairoDelante(R, t, o = {}) {
  return {};
}

// ── D · El escaneo y la copia (2009–2015) ─────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en escaneoDelante (se llama después de los
// actores). La cámara pintada y su pared norte, las del CANON (x 24–270, y 26–148 de frente; la puerta escondida en
// x 150–224, y 52–148).
//   'escaner': la cámara pintada (canon, la pared norte casi de frente) con EL ESCÁNER en su raíl: un raíl de aluminio
//     sobre patas a lo largo de la pared, un carro con un cabezal de luz y cámaras, cables a un portátil en una mesita,
//     focos de luz fría, técnicos con guantes blancos (figuras); el sarcófago cerrado a un lado, cubierto con una tela
//     (o al fondo). o.pasada 0–1: el carro avanza por el raíl y deja detrás una franja de pared ya escaneada, que se ve
//     como una MALLA azul fina sobre la pintura. El raíl y la mesita van en escaneoDelante. Cámara 'cabezal': el
//     cabezal de cerca contra la pintura (un trozo de una escena: la mano del faraón y la de la diosa), con su línea de
//     luz roja de barrido que baja (o.barrido 0–1) y, en una pantallita, el relieve en grises que se va llenando.
//     (tu-escaneo.) Devuelve suelo, libre, rail: [x0, x1, y], carro: [x, y] y, en la cámara, linea: y.
//   'taller': el taller de Madrid (Factum Arte, sin letras): una nave con lucernarios, una IMPRESORA ENORME de cama
//     plana con su pórtico, rollos de material, paneles impresos apoyados en la pared (trozos de la cámara pintada, a
//     escala real), tornos, botes de pintura, operarios con bata (figuras); fuera de las ventanas, tejados de Madrid
//     (recortados). o.imprime 0–1: el pórtico va y viene y el panel crece. La mesa de trabajo de delante va en
//     escaneoDelante. Cámara 'impresora': la impresora de cerca: el cabezal que deposita capas finas (o.capas 0–1) y
//     el relieve de la pintura que sube capa a capa, con el color que aparece al final; un operario con lupa (T.mano).
//     (tu-escaneo.) Devuelve suelo, libre, impresora: [x0, y0, x1, y1] y, en la cámara, panel: [x0, y0, x1, y1].
//   'replica': la CASA DE CARTER (una casa de adobe con cúpula, en lo alto de una loma a la entrada del valle, palmeras,
//     una galería con arcos) y, AL LADO, el pabellón bajo de la réplica (un edificio de piedra clara, medio enterrado,
//     con su rampa de bajada), un aparcamiento con un autobús, turistas que bajan (EL.turista1, EL.turista2). o.epoca
//     2014. Cámara 'dentro': DENTRO DE LA RÉPLICA: la copia de la cámara pintada (canon, idéntica), iluminada, con
//     turistas que miran de cerca y una vitrina con el escáner retirado; la barandilla va en escaneoDelante.
//     (tu-escaneo.) Devuelve suelo, libre, casa: [x, y], pabellon: [x, y] y, en la cámara, pared: [x0, y0, x1, y1].
//   'rasante': LAS DOS PAREDES ESCANEADAS BAJO LUZ RASANTE, de frente, como dos pliegos colgados (su propia
//     disposición, no la del canon frontal): a la izquierda el de la pared OESTE, más pequeño (x 8–90, y 40–148; su
//     rectángulo, x 30–70, y 82–148) y a la derecha el de la pared NORTE (x 98–270, y 26–148; su puerta escondida,
//     x 168–232, y 52–148). El relieve, en grises (sin color: el modelo del escáner), con las figuras como bultos
//     suaves y sombras largas hacia la derecha; o.luzRasante 0–1: la luz pasa de frontal (casi plano) a rasante (todo
//     en relieve); o.rectangulos 0–1: aparecen los DOS RECTÁNGULOS rectos debajo de la pintura, con su sombra fina;
//     Reeves (reevesTU) delante, de perfil, mira. El
//     atril con el portátil va en escaneoDelante. Cámara 'linea': el borde del rectángulo grande DE CERCA (x 60–260):
//     la arista recta en relieve, y el DEDO de Reeves (T.mano) que la repasa (o.dedo 0–1 su recorrido: devuelve el
//     punto); a la vez, la pintura vuelve en transparencia (o.color 0–1). (tu-escaneo.) Devuelve suelo, libre, norte:
//     [x0, y0, x1, y1], oeste: [x0, y0, x1, y1] y, en la cámara, arista: [[x, y], [x, y]] y dedo: [x, y].
const V_ESCANEO = {
  escaner: { cam: 'cabezal', general: { col: ['#e0a848', '#4a3a2a'], geo: { suelo: 152, libre: [20, 300], rail: [30, 270, 120], carro: [90, 110] } }, cabezal: { col: ['#f4cc78', '#7a5a30'], geo: { suelo: 180, libre: [0, 0], linea: 60 } } },
  taller: { cam: 'impresora', general: { col: ['#d8dce0', '#5a6068'], geo: { suelo: 154, libre: [20, 290], impresora: [80, 70, 240, 140] } }, impresora: { col: ['#c8ccd0', '#4a5058'], geo: { suelo: 180, libre: [0, 0], panel: [50, 90, 270, 160] } } },
  replica: { cam: 'dentro', general: { col: ['#f0dcb4', '#a88660'], geo: { suelo: 156, libre: [20, 300], casa: [90, 80], pabellon: [220, 130] } }, dentro: { col: ['#e0a848', '#5a3a1c'], geo: { suelo: 154, libre: [20, 300], pared: [24, 26, 270, 148] } } },
  rasante: { cam: 'linea', general: { col: ['#b8b8b8', '#4a4a4e'], geo: { suelo: 166, libre: [96, 270], norte: [168, 52, 232, 148], oeste: [30, 82, 70, 148] } }, linea: { col: ['#a8a8ac', '#3a3a3e'], geo: { suelo: 180, libre: [0, 0], arista: [[60, 70], [260, 70]], dedo: [120, 72] } } },
};
export function escaneo(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  return vista(R, t, o, V_ESCANEO);
}
// lo de delante de los personajes en cada encuadre de escaneo(); se llama después de los actores, con las mismas opciones
export function escaneoDelante(R, t, o = {}) {
  return {};
}

// ── E · Los radares, el busto de una reina y la ciudad del disco solar ────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en radaresDelante (se llama después de
// los actores). CUIDADO: NADA de National Geographic (ni el rectángulo amarillo, ni amarillo en cajas, chalecos o
// pantallas); el busto, la ciudad y el templo, NUESTROS; la pared, la del CANON.
//   'pared': la cámara pintada (canon) a finales de 2015, por la noche: Watanabe (watanabeTU) pasa el RADAR DE MANO
//     (PIEZAS_TU.radarMano: una caja con asa) por la pared norte a la altura de la puerta escondida; cables a un
//     portátil en una caja de herramientas, un trípode con un foco, un ayudante que apunta en una libreta, la cinta
//     métrica pegada a la pared. o.pasada 0–1: el radar avanza a lo largo de la pared (devuelve radar). Las cajas de
//     herramientas de delante van en radaresDelante. Cámara 'pantalla' (inserto): la pantalla del portátil a cuadro
//     casi completo: el RADARGRAMA (franjas horizontales grises que bajan con la profundidad, en R.numero los metros), y
//     o.eco 0–1: aparecen unas hipérbolas brillantes (los ecos), que se encienden en rojo. (tu-radar.) Devuelve suelo,
//     libre, radar: [x, y] y, en la cámara, eco: [x, y].
//   'segundo': la MISMA pared vista desde la esquina opuesta (escorzo, el sarcófago en primer plano a la izquierda),
//     unos meses después, con OTRO equipo (natgeoTU y dos técnicos): otro aparato, más grande, con dos antenas en un
//     carro de ruedas pequeñas y un ordenador de campaña (gris y azul, nada amarillo); luz de focos de LED. La caja del
//     equipo de delante va en radaresDelante. Cámara 'plana' (inserto): la pantalla del segundo aparato: un radargrama
//     LIMPIO, plano, sin ecos (o.barrido 0–1 lo recorre una línea), y al lado, en la mesa, una PIZARRITA con dos
//     marcadores: el primero con ✓ (verde) y el segundo con ✗ (rojo), cada uno con un icono de radar (o.marcas 0–2).
//     (tu-turin.) Devuelve suelo, libre, aparato: [x, y] y, en la cámara, marcas: [[x, y], [x, y]].
//   'prensa': una rueda de prensa en Luxor (finales de 2015): una mesa larga con micrófonos y botellas de agua, un
//     telón azul oscuro con un pictograma de la máscara (nuestra, sin letras), y detrás una PANTALLA GRANDE con un
//     «90 %» gigante (R.numero y un signo de porcentaje dibujado: o.cifra 0–1 lo hace subir de 0 a 90); Eldamaty
//     (eldamatyTU) en la mesa; periodistas de espaldas con cámaras y FLASHES (o.flash). La mesa va en radaresDelante.
//     Cámara 'publico': DESDE LA MESA, las filas de periodistas de frente, con cámaras, grabadoras en alto, micros de
//     pértiga y flashes que estallan (o.flash), la luz de la pantalla en sus caras. (tu-radar.) Devuelve suelo, libre,
//     pantalla: [x0, y0, x1, y1] y mesa: y.
//   'canon': LA EXPLICACIÓN DEL ECO: un cañón de roca roja muy hondo, de día; en una repisa, una figura chibi (sin
//     nombre: un excursionista) que grita con las manos en la boca; arcos de onda que salen (o.onda 0–1), chocan con la
//     pared de enfrente y vuelven (o.vuelve 0–1) más débiles; un eco de burbuja. Cámara 'roca' (inserto): UN CORTE DE
//     ROCA en capas (el rayado del canon del monte): arriba, el radar (PIEZAS_TU.radarMano) en la superficie; la onda
//     baja como un arco (o.onda 0–1), REBOTA en el cambio de material (una franja de aire oscuro y otra de escombro
//     punteado, o.material 'aire' | 'escombro') y vuelve; a un lado, un CRONÓMETRO grande que cuenta la ida y vuelta
//     (R.numero, en nanosegundos o simplemente números que corren) y una regla de profundidad. (tu-radar.) Devuelve
//     suelo, libre, eco: [x, y] y, en la cámara, superficie: y, cambio: y, reloj: [x, y].
//   'turin': el LABORATORIO de Turín (2018): una nave con un radar más grande en un carro (antenas en abanico),
//     estanterías con aparatos, una pared de prueba de bloques con una ventana a los Alpes (recortada), pantallas con
//     radargramas, Porcelli (porcelliTU) y dos técnicos; una LATA DE REFRESCO (PIEZAS_TU.lata) olvidada en un saliente
//     DELANTE de la pared de prueba; o.pita 0–1: la pantalla pita «¡cuarto!» (un icono de puerta con «!») y el
//     radar apunta… a la lata (una línea de puntos de la lata a la pantalla). Las mesas van en radaresDelante. Cámara
//     'carpeta' (inserto): una mesa con una CARPETA gruesa (rayas, un número 2018); o.sello 0–1: un sello de goma
//     grande (PIEZAS_TU.sello) cae y estampa un icono de CANDADO cerrado («caso cerrado», sin letras); o.cerrada 0–1:
//     la carpeta se cierra (en tu-turin: 1; si otra escena la quiere a medio cerrar, 0.5). (tu-turin.) Devuelve suelo,
//     libre, lata: [x, y], pantalla: [x, y] y, en la cámara, carpeta: [x0, y0, x1, y1].
//   'museo': una SALA DE MUSEO tranquila (Berlín, sin letras): paredes oscuras azul verdoso, una VITRINA en el centro
//     con el BUSTO DE UNA REINA (NUESTRO: PIEZAS_TU.bustoReina; corona alta y plana, cuello largo, colores vivos: azul,
//     oro, rojo y verde), focos desde arriba, visitantes en silencio, un banco, un guarda sentado. El cordón de delante
//     va en radaresDelante. Cámara 'busto': el busto de cerca en su vitrina, con el reflejo del cristal, y o.duda 0–1:
//     un «?» grande que aparece encima (para «puede que no sean de Nefertiti»). (tu-reina; la cámara, también
//     tu-medir.) Devuelve suelo, libre, busto: [x, y] (la cara).
//   'amarna': LA CIUDAD DEL DISCO SOLAR, hace unos 3350 años: una ciudad de adobe blanco junto al río Nilo (azul,
//     barcas con vela, palmeras, campos verdes), un templo abierto con patios llenos de mesas de ofrendas al sol, y
//     arriba un GRAN DISCO SOLAR cuyos rayos acaban en manitas (o.disco 0–1 su brillo; los rayos se mueven con t);
//     Nefertiti (nefertitiTU) y Akenatón (akenatonTU) en un balcón. Cámara 'templo': LA PARED DE UN TEMPLO de cerca con
//     relieves (las figuras de la reina y el rey bajo el disco, sus cartuchos con iconos); o.borra 0–1: un CINCEL
//     (T.mano con cincel) raspa los cartuchos y las caras, que quedan en blanco con esquirlas; o.corona 0–1: en un
//     segundo relieve, una corona de faraón pasa de una cabeza a otra (de la reina a un rey niño). (tu-reina.)
//     Devuelve suelo, libre, balcon: [x, y] y, en la cámara, cartucho: [x, y].
const V_RADARES = {
  pared: { cam: 'pantalla', general: { col: ['#e0a848', '#4a3420'], geo: { suelo: 152, libre: [20, 300], radar: [190, 100] } }, pantalla: { col: ['#20282e', '#5a6870'], geo: { suelo: 180, libre: [0, 0], eco: [168, 104] } } },
  segundo: { cam: 'plana', general: { col: ['#d89a40', '#3a2a1a'], geo: { suelo: 154, libre: [60, 300], aparato: [190, 130] } }, plana: { col: ['#283038', '#6a7880'], geo: { suelo: 180, libre: [0, 0], marcas: [[236, 110], [266, 110]] } } },
  prensa: { cam: 'publico', general: { col: ['#2a3460', '#141828'], geo: { suelo: 156, libre: [40, 280], pantalla: [100, 30, 240, 100], mesa: 128 } }, publico: { col: ['#3a3a4a', '#1a1a24'], geo: { suelo: 170, libre: [10, 310] } } },
  canon: { cam: 'roca', general: { col: ['#e0805a', '#7a3a28'], geo: { suelo: 150, libre: [40, 110], eco: [250, 100] } }, roca: { col: ['#d8b88a', '#7a5a3a'], geo: { suelo: 180, libre: [0, 0], superficie: 48, cambio: 120, reloj: [262, 120] } } },
  turin: { cam: 'carpeta', general: { col: ['#d8dce4', '#5a6070'], geo: { suelo: 154, libre: [20, 290], lata: [214, 118], pantalla: [80, 80] } }, carpeta: { col: ['#c8a878', '#5a4028'], geo: { suelo: 180, libre: [0, 0], carpeta: [80, 50, 240, 150] } } },
  museo: { cam: 'busto', general: { col: ['#2a4a4a', '#0e1e22'], geo: { suelo: 156, libre: [20, 300], busto: [160, 82] } }, busto: { col: ['#2a4448', '#10201e'], geo: { suelo: 180, libre: [0, 0], busto: [160, 72] } } },
  amarna: { cam: 'templo', general: { col: ['#f4e8c8', '#6aa0c8'], geo: { suelo: 150, libre: [40, 280], balcon: [200, 96] } }, templo: { col: ['#e8d0a0', '#9a7a50'], geo: { suelo: 180, libre: [0, 0], cartucho: [180, 70] } } },
};
export function radares(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  return vista(R, t, o, V_RADARES);
}
// lo de delante de los personajes en cada encuadre de radares(); se llama después de los actores, con las mismas opciones
export function radaresDelante(R, t, o = {}) {
  return {};
}

// ── F · La ladera sobre la tumba y el corte del monte (2020–2026) ─────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en laderaDelante (se llama después de los
// actores). CUIDADO: en el corte y en el mapa, las anomalías son MANCHAS difusas (tramadas, de borde blando), nunca
// cuartos; solo el trazo azul a rayas de 'trazo' (o.reeves) y de su cámara 'posibles' dibuja formas de cuarto, y se
// nota que es un dibujo encima. El corte, el del CANON (norte a la derecha; tumba, manchas y broca en sus coordenadas).
// Opciones de todo el grupo: o.epoca 2020 | 2024 | 2026 (por omisión 2026); o.luz 'dia' | 'tarde'.
//   'ladera': EL MONTE SOBRE LA TUMBA al sol: una ladera de caliza suelta y piedras, la cumbre a la derecha, abajo a la
//     izquierda el VALLE (canon, más pequeño) con la entrada de la tumba y su toldo; jalones con banderitas, un
//     todoterreno blanco, sombrillas, cajas de aparatos. o.carrito 0–1: el RADAR DE CARRITO (PIEZAS_TU.radarCarrito)
//     empujado ladera arriba por un técnico (devuelve carrito) (o.epoca 2020); o.geofisicos true: geofísicos
//     (geofisico1TU, geofisica2TU) que discuten con una libreta y señalan (o.epoca 2026, tu-dudas); con 2020 también
//     cabe Eldamaty (eldamatyTU). Las cajas de delante van en laderaDelante. Cámara 'carrito': el radar de carrito de
//     cerca: las ruedas sobre la piedra, el asa, la pantallita con el radargrama que corre (o.eco 0–1), la cinta
//     métrica en el suelo y la sombra del técnico. (tu-este, tu-dudas.) Devuelve suelo (la y media de la ladera)
//     y pendiente (dy/dx: el suelo en x es suelo + pendiente · (x − 160)), libre, carrito: [x, y] y valle: [x, y].
//   'corte': EL CORTE DEL MONTE (canon), grande, con la tumba dentro y las MANCHAS (o.anomalias 0–1: la fuerte al
//     norte y las débiles; el tramado se espesa); arriba, en la cumbre (x ≈ 256, y ≈ 48), la perforadora diminuta y
//     o.broca 0–1: la BROCA baja por x 256 hasta la mancha fuerte (con 0 espera arriba: gancho; un hilo de polvo); la
//     cámara pintada con su filo amarillo. Cámara 'mancha' (inserto): de cerca la PARED NORTE de la cámara (a la
//     izquierda, el filo pintado) y la mancha fuerte (a la derecha), con la roca entre las dos; o.broca 0–1: el agujero
//     de ocho centímetros que llega desde arriba, LEJOS de la pared pintada (una cota con R.numero: los metros), y
//     o.camarita 0–1: la CAMARITA (PIEZAS_TU.camarita) que cuelga de su cable y baja, gira, enciende su lucecita, y
//     o.murcielago 0–1: un MURCIÉLAGO (PIEZAS_TU.murcielago) colgado que abre un ojo y la mira (gag 7). (tu-gancho,
//     tu-agujero.) Devuelve tumba: { pintada: [x0, y0, x1, y1], norte: x }, mancha: [x0, y0, x1, y1], broca: [x, y] (la
//     punta) y, en la cámara, camarita: [x, y], murcielago: [x, y].
//   'trazo': EL MISMO CORTE (canon) con o.reeves 0–1: detrás de la pared norte, un CONTORNO AZUL A RAYAS (C.trazoAzul,
//     discontinuo, sin relleno) de una tumba más grande que sigue hacia la derecha (pasillo, escalones y cuartos
//     grandes, x 214–316, y 70–150, por debajo de la esquina de Atom) con una coronita de reina como icono; al lado, una
//     mano dibujada con lápiz azul que traza (o.traza 0–1). Cámara 'posibles' (inserto, tu-medir): el corte de cerca al
//     norte de la cámara con TRES POSIBILIDADES en trazo azul a rayas, cada una en su recuadro y con su icono: un
//     almacén (jarras), otra tumba de la familia (dos coronitas) y un pasillo que se corta a medias (una flecha que
//     acaba en un muro); o.posibles 0–3 las enciende; un «?» en cada una. (tu-reina, tu-medir.) Devuelve tumba (como en
//     'corte'), grande: [x0, y0, x1, y1] y, en la cámara, posibles: [[x, y] ×3].
//   'este': EL CORTE en 2020, visto desde arriba de la ladera hacia abajo (más ancho y menos hondo que 'corte'): en la
//     superficie, el radar de carrito (pequeño) y su recorrido punteado; en la roca, junto a la tumba, aparece el
//     ESPACIO ALARGADO del este, como MANCHA alargada paralela al pasillo de entrada (o.pasillo 0–1), con una cota de
//     2 m de alto y 10 m de largo (R.numero y flechas); o.duda 0–1: la mancha PARPADEA y le sale un «?» que se queda.
//     Cámara 'radargrama' (inserto): la pantalla del radar de carrito: franjas y una banda brillante alargada a cierta
//     profundidad (o.eco 0–1), con la escala de metros. (tu-este.) Devuelve tumba: { pasillo: [x0, y0, x1, y1] },
//     espacio: [x0, y0, x1, y1] y, en la cámara, eco: [x, y].
//   'gravedad': LA EXPLICACIÓN DE LA GRAVEDAD, como lámina de laboratorio sobre la ladera (un tablero de corcho
//     apoyado en el todoterreno): un bloque de roca en corte con un HUECO (un cuadrado vacío) y, encima, una fila de
//     FLECHAS hacia abajo (la gravedad) de la misma longitud, salvo las que están justo sobre el hueco, un poco más
//     cortas (o.flechas 0–1: crecen; o.hueco 0–1: el hueco aparece y las flechas de encima menguan). Cámara 'flechas'
//     (inserto): las flechas de cerca sobre el hueco, con una regla y la diferencia marcada (un número diminuto: R.numero
//     «0,00000001» si cabe, si no unas rayas), y una pesa que cuelga de un muelle que se estira un pelo menos (o.hueco).
//     (tu-gravedad.) Devuelve suelo, libre, lamina: [x0, y0, x1, y1] y, en la cámara, hueco: [x0, y0, x1, y1].
//   'gravimetro': EL GRAVÍMETRO (PIEZAS_TU.gravimetro: un cilindro con su pantalla en un TRÍPODE) sobre un punto de la
//     rejilla de la ladera, con su sombrilla; los geofísicos (geofisico1TU, geofisica2TU) que leen y apuntan; estacas
//     con banderitas en fila; o.escarabajo 0–1: un ESCARABAJO (PIEZAS_TU.escarabajo) pasa empujando su bola por delante
//     del trípode, y o.tiembla 0–1 la aguja del aparato tiembla y todos contienen el aire (gag 6). La sombrilla y la caja
//     de delante van en laderaDelante. Cámara 'muelle' (inserto): EL GRAVÍMETRO POR DENTRO, como un dibujo de
//     corte en una lámina sobre la mesa de campaña:
//     una PESA colgada de un MUELLE finísimo dentro del cilindro, una escala con una aguja (o.aguja −1..1) y una lupa;
//     la pesa sube un pelo cuando debajo hay hueco (o.hueco 0–1). (tu-gancho, tu-gravedad.) Devuelve suelo, libre,
//     gravimetro: [x, y] (la pantalla), escarabajo: [x, y] y, en la cámara, aguja: [x, y].
//   'mapa': EL MAPA DE DENSIDAD (PIEZAS_TU.mapaDensidad, grande, en planta), sobre la mesa de campaña: el contorno de la
//     tumba en planta (escalera, pasillo, antecámara, cámara y tesoro, la PLANTA del canon;
//     NORTE ARRIBA, con una flecha), la REJILLA de más de mil puntos (o.rejilla 0–1: se van marcando uno a uno), y
//     o.manchas 0–1: los colores de menos densidad (azul y morado, C.mancha) que se extienden; la más fuerte, al norte
//     de la pared norte, con DOS ESQUINAS RECTAS (golpe de tu-gravedad); un lápiz, un compás, una piedrecita de peso.
//     Cámara 'esquinas' (inserto): la mancha fuerte de cerca junto a la pared norte de la cámara, con las dos esquinas
//     rectas marcadas con una escuadra (o.escuadra 0–1) y una cota de 35 (R.numero, m²). (tu-gravedad.) Devuelve
//     mapa: [x0, y0, x1, y1], pintada: [x0, y0, x1, y1] (la cámara pintada en planta), mancha: [x0, y0, x1, y1].
//   'cortes': una lámina de laboratorio grande clavada en el tablero de corcho del campamento (fondo: la lona de la
//     tienda y la ladera al sol por un lado) con TRES CORTES PEQUEÑOS de roca en fila, iguales por fuera (x 14–100,
//     117–203 y 220–306, y 50–130: por debajo de la esquina de Atom): en el primero un cuarto vacío, en el segundo un pasillo LLENO DE
//     CASCOTES y en el tercero roca AGRIETADA; debajo de cada uno, un aparato con aguja que APENAS se mueve (en el
//     límite: las tres casi iguales). o.engana 'radar' | 'gravedad': encima de dos de ellos, un icono de radar y uno
//     de gravedad (una pesa) con ✓ en uno y ✗ en otro (para tu-medir: «el escombro engaña a uno y no al otro»).
//     Cámara 'aguja' (inserto): la escala de UN aparato de cerca: una banda gris de «ruido» y la aguja que tiembla
//     dentro de ella sin salir (o.aguja 0–1: lo que se asoma), con números (R.numero). (tu-dudas, tu-medir.) Devuelve
//     cortes: [[x0, y0, x1, y1] ×3], agujas: [[x, y] ×3] y, en la cámara, aguja: [x, y].
//   'perforadora': LO ALTO DE LA LADERA, en 2026: la PERFORADORA pequeña (PIEZAS_TU.perforadora: una torre de patas,
//     un motor, el tubo) sobre una plataforma de tablones, con su generador, mangueras, cajas, una lona; los técnicos con
//     casco; el valle abajo a la izquierda (lejos); o.broca 0–1: el tubo gira y baja (polvo blanco, tiembla el suelo).
//     Las cajas de delante van en laderaDelante. Cámara 'camarita': DENTRO DEL AGUJERO, de arriba abajo: el tubo
//     estrecho de roca, la CAMARITA que baja por su cable (o.baja 0–1), su lucecita que barre, y al salir a un hueco
//     oscuro gira (o.gira 0–1) y se encuentra de frente con un MURCIÉLAGO que también mira (o.murcielago 0–1).
//     (tu-agujero.) Devuelve suelo, libre, perforadora: [x, y] (la boca del tubo) y, en la cámara, luz: [x, y].
//   'permiso': LA MESA OFICIAL en un despacho del Consejo de Antigüedades (El Cairo, hoy): una mesa grande de madera
//     oscura con montones de carpetas, un SELLO de goma (PIEZAS_TU.sello) en alto que NO BAJA (o.sello 0–1: baja un
//     poco, duda, vuelve a subir), una bandeja con papeles, un ventilador de techo, una ventana con la ciudad y un
//     minarete (recortada), un banderín sin letras, un calendario de pared; o.carpeta 0–1: una carpeta que se queda a
//     medio cerrar (tu-este); o.epoca 2020: EL.hawass de pie junto a la mesa niega con la cabeza. La mesa va en
//     laderaDelante. Cámara 'calendario' (inserto): EL CALENDARIO de pared de NOVIEMBRE DE 2026 (R.numero: 2026 y los
//     días en cuadrícula, sin el nombre del mes: un icono de hoja seca), con las hojas de días que pasan y se tachan
//     (o.dias 0–1) y el sello que sigue esperando al lado. (tu-este, tu-permiso.) Devuelve suelo, libre, mesa: y,
//     sello: [x, y] y, en la cámara, dia: [x, y] (el de hoy).
//   'luces': EL CIERRE A DOS: la pantalla partida por una raya vertical de piedra en x 160: a la izquierda, la segunda
//     puerta de 1922 con su hueco y la VELA de Carter (canon; la mano con la vela, luz ámbar); a la derecha, el corte del
//     monte de 2026 (canon) con el agujero de la broca y la CAMARITA con su luz blanca; dos agujeros pequeños y dos luces
//     a la misma altura (y ≈ 96). o.vela 0–1 y o.luz 0–1 las encienden. Cámara 'cerca': las DOS LUCES DE CERCA, lado a
//     lado: la llama de la vela (que tiembla) y el ledito de la camarita (que late), con su halo; entre las dos, la
//     misma raya de piedra. (tu-cierre.) Devuelve vela: [x, y], camarita: [x, y].
const V_LADERA = {
  ladera: { cam: 'carrito', general: { col: ['#f0dcb4', '#b08858'], geo: { suelo: 140, pendiente: -0.12, libre: [90, 300], carrito: [200, 128], valle: [60, 150] } }, carrito: { col: ['#e8cc98', '#9a7448'], geo: { suelo: 158, libre: [20, 300] } } },
  corte: { cam: 'mancha', general: { col: ['#d8b88a', '#a8865c'], geo: { suelo: 180, libre: [0, 0], tumba: { pintada: [174, 96, 214, 130], norte: 214 }, mancha: [238, 88, 276, 128], broca: [256, 48] } }, mancha: { col: ['#c8a878', '#8a6a48'], geo: { suelo: 180, libre: [0, 0], camarita: [200, 120], murcielago: [232, 112] } } },
  trazo: { cam: 'posibles', general: { col: ['#d8b88a', '#a8865c'], geo: { suelo: 180, libre: [0, 0], tumba: { pintada: [174, 96, 214, 130], norte: 214 }, grande: [214, 70, 316, 150] } }, posibles: { col: ['#d0b088', '#9a7a52'], geo: { suelo: 180, libre: [0, 0], posibles: [[70, 100], [160, 100], [250, 110]] } } },
  este: { cam: 'radargrama', general: { col: ['#dcc090', '#a08050'], geo: { suelo: 180, libre: [0, 0], tumba: { pasillo: [62, 98, 112, 110] }, espacio: [60, 80, 150, 90] } }, radargrama: { col: ['#20282e', '#5a6870'], geo: { suelo: 180, libre: [0, 0], eco: [160, 100] } } },
  gravedad: { cam: 'flechas', general: { col: ['#e8dcc0', '#9a8462'], geo: { suelo: 162, libre: [20, 70], lamina: [80, 28, 270, 150] } }, flechas: { col: ['#ece4cc', '#8a7a5a'], geo: { suelo: 180, libre: [0, 0], hueco: [130, 110, 190, 150] } } },
  gravimetro: { cam: 'muelle', general: { col: ['#f0dcb4', '#a88660'], geo: { suelo: 150, libre: [20, 300], gravimetro: [160, 100], escarabajo: [120, 152] } }, muelle: { col: ['#d8dce0', '#5a6068'], geo: { suelo: 180, libre: [0, 0], aguja: [210, 100] } } },
  mapa: { cam: 'esquinas', general: { col: ['#e8e4d4', '#7a8aa0'], geo: { suelo: 180, libre: [0, 0], mapa: [30, 26, 270, 170], pintada: [150, 100, 180, 124], mancha: [150, 64, 200, 98] } }, esquinas: { col: ['#ddd8c8', '#6a5a90'], geo: { suelo: 180, libre: [0, 0], mancha: [110, 40, 230, 120] } } },
  cortes: { cam: 'aguja', general: { col: ['#d8c8a8', '#7a6a50'], geo: { suelo: 180, libre: [0, 0], cortes: [[14, 50, 100, 130], [117, 50, 203, 130], [220, 50, 306, 130]], agujas: [[57, 152], [160, 152], [263, 152]] } }, aguja: { col: ['#e0e0d8', '#5a5a58'], geo: { suelo: 180, libre: [0, 0], aguja: [160, 110] } } },
  perforadora: { cam: 'camarita', general: { col: ['#f0dcb4', '#a88660'], geo: { suelo: 146, libre: [20, 300], perforadora: [170, 146] } }, camarita: { col: ['#4a3a2a', '#141010'], geo: { suelo: 180, libre: [0, 0], luz: [160, 100] } } },
  permiso: { cam: 'calendario', general: { col: ['#c8b090', '#5a4028'], geo: { suelo: 156, libre: [20, 300], mesa: 128, sello: [180, 96] } }, calendario: { col: ['#ece8dc', '#8a7a62'], geo: { suelo: 180, libre: [0, 0], dia: [180, 110] } } },
  luces: { cam: 'cerca', general: { col: ['#3a2a1c', '#d8b88a'], geo: { suelo: 180, libre: [0, 0], vela: [96, 96], camarita: [236, 96] } }, cerca: { col: ['#2a1c14', '#8a6a48'], geo: { suelo: 180, libre: [0, 0], vela: [96, 100], camarita: [224, 100] } } },
};
export function ladera(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  return vista(R, t, o, V_LADERA);
}
// lo de delante de los personajes en cada encuadre de ladera(); se llama después de los actores, con las mismas opciones
export function laderaDelante(R, t, o = {}) {
  return {};
}

// ── G · Hoy: el estudio de Atom con papel pintado egipcio ─────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en hoyDelante (se llama después de los
// actores). EL MISMO CUARTO QUE EN EL 33, EL 34 Y EL 35: se parte del estudio de hoy() de jm-comun.js (g_estudioFijo en
// la línea ≈ 8221, g_estudio ≈ 8302, g_estudioDelanteFijo ≈ 8342, g_estudioDelante ≈ 8456 y la mesa desde arriba,
// g_mesa ≈ 8558; búscalos con grep): la misma moldura, friso, tarima, alfombra, ventana con el parque, librería, globo,
// reloj y sillón con el gato; CAMBIA EL PAPEL PINTADO: ahora es EGIPCIO, de los de casa (no de tumba): fondo arena
// claro con una trama pequeña de lotos, ojos, escarabajos y palmeritas en ocre y azul apagados, en rombos (tranquilo
// tras Atom y bajo el año: en esas zonas, dos tonos casi iguales), con una cenefa de rayas de colores bajo la moldura.
// En la librería, una pirámide de recuerdo y un gato de escayola; el estetoscopio (PIEZAS_TU.estetoscopio) colgado.
//   'estudio': el estudio, de día (suelo 162). o.golpe 0–1 (gag 1): en la pared de papel pintado a la izquierda de la
//     ventana (x 60–110, y 60–100) suenan unos golpecitos DESDE EL OTRO LADO: el papel tiembla, cae una pizca de polvo
//     del friso, un cuadro se tuerce y unas ondas de «toc» salen de la pared (devuelve toc); o.lluvia 0–1 como en el
//     35. En hoyDelante: el escritorio con la lupa, un libro de Egipto abierto (pictogramas), la caja de cartón
//     cerrada (PIEZAS_TU.caja) y la linterna (o.caja false). Cámara 'pared': LA PARED de papel pintado de cerca
//     (x 0–319, y 0–150), a la altura del estetoscopio: el papel egipcio grande y detallado, una grieta del yeso junto
//     al rodapié, un enchufe, y el punto donde Atom apoya el estetoscopio (devuelve punto); o.golpe 0–1: el papel vibra,
//     ondas de «toc» desde detrás y una lámina enmarcada que da un saltito. (tu-hola; la general, también tu-cierre.)
//     Devuelve suelo, libre, toc: [x, y] y, en la cámara, punto: [x, y].
//   'mesa' (inserto): LA MESA DE ATOM DESDE ARRIBA: el nogal, el estetoscopio enrollado, una lupa, un libro de Egipto
//     abierto (columnas de rayas y un dibujo de pirámide), un cuaderno con una regla, una taza con vapor, y una MANZANA
//     roja junto al borde. o.rueda 0–1: la manzana rueda hacia el borde. Cámara 'manzana': LA MANZANA QUE CAE desde el
//     borde de la mesa al suelo de tarima, de lado (o.cae 0–1: su caída, con rayitas de velocidad y una flecha hacia
//     abajo que crece), y el gato que la mira caer. (tu-gravedad.) Devuelve manzana: [x, y] (y en la cámara, suelo).
//   'pizarra': la PIZARRA BLANCA del estudio, sobre un caballete delante de la librería (pizarra x 50–270, y 30–140;
//     suelo 162): o.n 3–5: los ESTUDIOS EN FILA, cada uno con su icono grande dibujado a rotulador (radar de mano ×3,
//     radar de carrito, gravímetro) y encima su respuesta (o.respuestas: lista de '✓' | '✗' | '?': por omisión, con 3,
//     ['✓', '✗', '✗'] (gancho); con 5, ['✓', '✗', '✗', '?', '?']); o.traza 0–1: aparecen uno a uno. El borrador, los
//     rotuladores y el caballete delante van en hoyDelante. Cámara 'final': el final de la fila de cerca: el último
//     estudio y, después, una CAMARITA dibujada con un ojo y un recuadro vacío para su respuesta, que parpadea (o.ojo
//     0–1): «medir no es lo mismo que mirar». (tu-gancho, tu-medir.) Devuelve suelo, libre, pizarra: [x0, y0, x1, y1],
//     iconos: [[x, y] ×5] y, en la cámara, camarita: [x, y].
//   'caja': el ESTUDIO A MEDIA TARDE (luz más cálida) y, en el centro, la mesa baja con la CAJA de cartón grande
//     (PIEZAS_TU.caja: cinta de embalar, una flecha de «arriba» pintada); Atom no sale de su esquina, la escena pone la
//     mano (T.mano) que hace un AGUJERITO con un lápiz (o.agujero 0–1) y la LINTERNA (PIEZAS_TU.linterna) que apunta.
//     La mesa baja va en hoyDelante. Cámara 'dentro' (gag 8): DENTRO DE LA CAJA: oscuridad de cartón, un rayito de
//     linterna que entra por el agujerito (o.luz 0–1) y descubre… OTRA CAJA más pequeña, igual, con su propio
//     agujerito (o.otra 0–1; y si se quiere, dentro de esa, otra más). (tu-cierre.) Devuelve suelo, libre, caja:
//     [x0, y0, x1, y1], agujero: [x, y] y, en la cámara, otra: [x0, y0, x1, y1].
const V_HOY = {
  estudio: { cam: 'pared', general: { col: ['#e8d8b0', '#5a7a6a'], geo: { suelo: 162, libre: [20, 250], toc: [86, 80] } }, pared: { col: ['#ecdcb4', '#b08a50'], geo: { suelo: 160, libre: [20, 300], punto: [150, 92] } } },
  mesa: { cam: 'manzana', general: { col: ['#7a4a2a', '#54301a'], geo: { suelo: 180, libre: [0, 0], manzana: [250, 120] } }, manzana: { col: ['#e8d8b0', '#86623c'], geo: { suelo: 160, libre: [20, 300], manzana: [180, 70] } } },
  pizarra: { cam: 'final', general: { col: ['#f4f4f0', '#5a7a6a'], geo: { suelo: 162, libre: [20, 300], pizarra: [50, 30, 270, 140], iconos: [[74, 100], [116, 100], [158, 100], [200, 100], [242, 100]] } }, final: { col: ['#f8f8f4', '#8a8a86'], geo: { suelo: 180, libre: [0, 0], camarita: [210, 100] } } },
  caja: { cam: 'dentro', general: { col: ['#f0c890', '#6a5a48'], geo: { suelo: 162, libre: [20, 300], caja: [120, 90, 200, 140], agujero: [150, 106] } }, dentro: { col: ['#5a4028', '#1c140c'], geo: { suelo: 180, libre: [0, 0], otra: [120, 80, 200, 150] } } },
};
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  return vista(R, t, o, V_HOY);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}

// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_TU = { valle: V_VALLE, tumba: V_TUMBA, cairo: V_CAIRO, escaneo: V_ESCANEO, radares: V_RADARES, ladera: V_LADERA, hoy: V_HOY };
