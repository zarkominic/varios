// Fontanería y decorados del episodio 49 (Göbekli Tepe: el templo que unos cazadores levantaron antes de inventar la
// agricultura), con el canon del 43 (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris
// azulado), al nivel de episodios/ESTANDAR.md: el detalle de siempre. Reutiliza F el estudio de las pausas del 43
// (hm-comun.js: estudio) y añade: A la colina de Göbekli Tepe en 1963, 1994 y hoy (colina), B el recinto de pilares hace
// 11.600 años (recinto), C la cantera y el paisaje del Neolítico (neolitico), D los arqueólogos: la tienda de 1963, la
// casa de la excavación y el laboratorio del carbono 14 (arqueologos), E lo que se cuenta hoy: el salón con la tele, la
// piedra del buitre, Karahan Tepe y el mapa de Taş Tepeler (hoy), y las piezas (d_* y pausa).
// LOS PILARES EN T: caliza crema con vetas y desconchones; brazos en relieve que bajan por los costados y manos de dedos
// largos que se juntan sobre el vientre, cinturón y taparrabos de piel de zorro; SIN CARA (salvo el de Karahan Tepe de
// 2025). Los relieves de animales: zorros, jabalíes, serpientes en fila, escorpiones, grullas, buitres y algún uro.
// SIN LETRAS en pantalla (solo números y símbolos). NADA MORBOSO: ni cráneos ni huesos humanos ni tumbas a la vista;
// los enterramientos de 2026 se ven como un cuadro de excavación tapado con una lona y unas etiquetas con números.
// Personas reales (Klaus Schmidt), con respeto y sin parecidos inventados. Sin marcas: la tele es una tele cualquiera.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. La barra del tiempo (x 20–170, y 0–14) y la zona de Atom (x 278–318, y 4–44) se dejan tranquilas.
//
//   import * as T from '/atomo/plato/escenas/gb-comun.js';
//   const { E, R, M } = await T.preparar('gb-gancho');
//   T.rodar(E, R, [[0, (t) => T.recinto(R, t, { encuadre: 'construccion' })]], { año: -9500 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 49 por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores)
export { ELENCO_GB as GB } from '/atomo/plato/kits/pixel-chibi.js';
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
    // la caliza de los pilares y de la cantera, su sombra y sus vetas; el relieve más claro que el fondo
    caliza: '#d8c8a4', calizaL: '#ece0c4', calizaS: '#a8946e', calizaD: '#7a6a4e', veta: '#bca880',
    // la tierra roja de Şanlıurfa, la estepa seca, el trigo silvestre, el basalto de Karacadağ
    tierra: '#a8643e', tierraS: '#7a4428', tierraL: '#c8845a', estepa: '#c8b070', estepaS: '#9a8450', trigo: '#e0c070',
    trigoS: '#b0904a', basalto: '#3a3638', basaltoL: '#5a5458',
    // las pieles, el cuero, el sílex, el fuego de las antorchas y las hogueras
    piel: '#9a6a3e', cuero: '#6a4428', silex: '#5a5a62', silexL: '#9a9aa4', fuego: '#ffb040', fuegoL: '#fff0a0',
    // la excavación de hoy: la cubierta blanca, las lonas, los andamios, las cuerdas de la cuadrícula, las etiquetas
    cubierta: '#f0f0ec', lona: '#5a8ac8', andamio: '#c8c8cc', cuerda: '#e8e0c8', etiqueta: '#f4f0e4',
    // la tele y el laboratorio
    pantalla: '#4a8ac8', bata: '#f2f2ee', metal: '#9aa0a8',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep49');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: el pilar (9600–8000 a. C., los constructores), la lupa (1963–1994, los que pasaron de largo) y
  // la pala (1995–hoy, la excavación)
  Object.assign(R.ICONOS, {
    pilar: ['#######', '#######', '..###..', '..###..', '..###..', '..###..', '.#####.'],
    lupa: ['.###...', '#...#..', '#...#..', '#...#..', '.###...', '....##.', '.....##'],
    pala: ['......#', '.....#.', '....#..', '...#...', '.##....', '###....', '.#.....'],
  });
  R.tramosTiempo([[-9600, -8000, R.PALA.ORO, 'pilar'], [1963, 1995, R.PALA.AZUL ?? R.PALA.ROJO, 'lupa'], [1995, 2027, R.PALA.ROJO, 'pala']]);
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

// ── A · La colina de Göbekli Tepe (1963, 1994 y hoy) ─────────────────────────────────────────────────────────────────
// La meseta de Şanlıurfa: un cerro redondeado («el cerro de la barriga») de tierra rojiza en una llanura de campos
// arados y estepa, con la sierra lejana. Cada encuadre pinta los 320 × 180 en cada fotograma: lo fijo en un búfer (uno por
// encuadre, época y estación; en la excavación, uno por cada 1/32 de o.anos), y encima la vida: nubes de tres tonos a
// tres velocidades (solo sobre el cielo), pájaros, las hojas del moral, la hierba y los cardos al viento, polvo y gente
// pequeña de fondo (6–10 px) que trabaja o pasea. Sol arriba a la derecha (luz de la derecha, sombras a la izquierda).
// o.encuadre:
//   'cerro' (por omisión), o.camara 'general': EL CERRO DE LEJOS (cima x 172, y 72; falda x 56–288 hasta y ~134) con el
//     MORAL SOLITARIO en lo alto (tronco x 168, base y 72; copa x ~150–186, y ~42–70; en 1994, x ~146–190, y ~38–70);
//     la sierra azulada y un pueblo con su alminar en el horizonte (y 64), campos en perspectiva por parcelas (rastrojo,
//     arado, barbecho, verde) con muretes de piedra seca y pistacheros, terrazas de piedra en la falda, un camino de tierra
//     que sube desde abajo a la izquierda (x 30, y 180 → x 70, y 150 → cima), un pastor con su rebaño y su perro en la
//     llanura (x ~20–110, y ~100) y un remolino de polvo en verano. o.epoca: 1963 (por omisión: el cerro arado con LOSAS DE
//     CALIZA ROTAS asomando en la cima, x 120–230, y 74–88, y un JEEP de los sesenta aparcado en el camino, x 40–80, ruedas
//     en y 150), 1994 (el moral más grande, menos losas arriba y dos MONTONES DE LOSAS apartadas al pie, x ~66–92 y
//     ~262–290, y ~126; un TRACTOR rojo pequeño que ara de ida y vuelta por la falda, x 104–236, y ~100–106, con su polvo)
//     u 'hoy' (la GRAN CUBIERTA blanca de membrana sobre mástiles en la cima, x 100–232, picos y 50–58, borde y ~92, con sus
//     tirantes; la pasarela de madera alrededor, el centro de visitantes a la izquierda x 34–88, y 118–134, con banderín;
//     un aparcamiento con autobuses y coches x 206–300, y 124–140; visitantes diminutos que suben y bajan por el camino
//     asfaltado; el moral sigue en la cima pero a un lado, tronco x 246, base y ~88). o.estacion ('primavera' | 'verano'
//     | 'otono'; por omisión verano) cambia los campos, la falda y la hierba. Suelo y 150 (pies en y 150), libre x 30–250
//     delante (en 1963 el jeep ocupa x 40–80: los prospectores, de x 84 en adelante).
//     Cámara 'losas': EN LO ALTO DEL CERRO, DE CERCA: la tierra arada en surcos que se alejan, con terrones, piedrecitas,
//     sílex y rastrojo (o brotes verdes en primavera), los campos lejanos y la sierra (horizonte y 56); el MORAL cerca a
//     la izquierda (tronco x 18–34, base y 114; copa x 0–96, y 24–80) con su sombra; dos losas rotas pequeñas (x 88–118,
//     y 110–122, con una lagartija que toma el sol; x 226–264, y 102–116) y la LOSA GRANDE (x 150–192, y 118–130) que es
//     la cabeza de un pilar en T: o.cabeza 0–1 la va destapando (la tierra se abre en un hoyo, x ~140–204, y ~122–146,
//     sale la cara de delante de la cabeza con un ZORRO en relieve y, al final, el arranque del fuste; la tierra se amontona
//     a los lados y saltan terrones mientras 0 < cabeza < 1). Cardos que se mecen, un escarabajo que cruza. o.epoca igual
//     ('hoy': estepa sin arar, la cubierta blanca a lo lejos a la derecha x 186–262, y 46–64). Suelo y 150, libre x 30–140
//     y 200–260 (quien se agacha ante la losa, de pie en x ~132–146 o ~194–206, pies en y 150).
//   'excavacion': LOS RECINTOS EXCAVADOS, desde arriba en tres cuartos: los óvalos de muro de piedra seca con sus pilares en
//     T (el recinto D en el centro, óvalo x 93–233, y 56–116, con los DOS PILARES CENTRALES x 150 y 176, cabezas y ~84;
//     el C a la izquierda x 12–104, y 57–87; el B arriba a la derecha x 226–298, y 54–78; el A delante a la izquierda
//     x 18–86, y 105–127), la tierra de los testigos entre recintos con la cuadrícula de cuerdas y estacas, el moral arriba a la izquierda
//     (x 0–32, y 36–50), una estación topográfica (x 266, y 132), cajas y una manguera delante, montones de
//     tierra, carretillas, cubos, tamices y sacos, y trabajadores pequeños que cavan con el pico, llevan cubos y criban;
//     sendas pisadas, grietas de tierra seca, matas, guijarros, jalones, una lona azul (x 193–226, y 120–129), tablones y
//     un bidón; o.anos 0–1 hace crecer la excavación (0, 1995: LA COLINA CON LOS RECINTOS LLENOS HASTA ARRIBA, cada óvalo
//     una hondonada de tierra con la corona del muro a ras de suelo y solo las CABEZAS DE LOS PILARES asomando, las dos
//     centrales en (150, 90) y (176, 90); luego la tierra baja recinto a recinto: D desde 0,04, C desde 0,12, B desde
//     0,3, A desde 0,5, los muros y los pilares se destapan de arriba abajo y al final se ve el suelo de roca; a 1, 2017);
//     o.relleno false vuelve a lo de antes (los recintos sin abrir no se ven y cada uno se abre como un hoyo que crece);
//     o.cubierta (por omisión anos ≥ 0,85) pone arriba la membrana blanca (su borde festoneado y ~30–38) y sus pilares de
//     acero. Pasarela de madera delante (y 136–160): suelo y 150 (los personajes en la pasarela, libre x 10–310); el
//     barandal va en colinaDelante. Devuelve .centrales [[150, yCabeza], [176, yCabeza]] (lo alto de cada pilar central;
//     null mientras están enterrados).
//     Cámara 'corte': EL PERFIL DE TIERRA de un recinto, de cerca: el muro de piedra seca cortado a la izquierda (x 0–34),
//     el perfil con sus capas (mantillo con raíces, tierra rojiza, escombro de caliza, una lente de ceniza, tierra con
//     sílex, escombro grueso y la roca del suelo), etiquetas blancas con su número (1–6) clavadas en cada capa (x ~132–150
//     y ~282–300), un cordel de nivel; el PILAR en T INCLINADO a la derecha (base x 226, y 146; cabeza x ~236–270, y ~52–70)
//     con brazos, manos, cinturón y un zorro en relieve, apuntalado con dos vigas desde x ~288–304 y una cuña; cubos, paleta
//     y criba en el suelo. o.lluvia 0–1 anima siglos de lluvia: el cielo pasa del día a la noche deprisa con soles y lunas
//     que cruzan, cae la lluvia, bajan regueros de barro por el perfil, el barro resbala por la ladera de la izquierda,
//     los charcos hacen ondas y arriba se van depositando capas nuevas (hasta 10 px). o.puntales true añade dos peones que
//     empujan la viga y uno que mete la cuña a mazazos (x 270–304). Suelo y 150, libre x 30–120 (y hasta x 190).
//   'norte': LA ZONA NUEVA AL NORTE (2026): la ladera con la cuadrícula de catas en tres filas (testigos de tierra entre
//     ellas, cordeles y estacas) y EDIFICIOS RECTANGULARES de muros bajos de piedra con su banco corrido y algún pilar
//     pequeño, cajas de hallazgos, una mesa de dibujo con su lámina (x ~30–50, y ~114), dos sombrillas que se mecen, una
//     LONA AZUL sujeta con piedras sobre un cuadro (x 188–262, y 124–142: lo tapado no se ve; sus bordes ondean), cubos,
//     escaleras y una carretilla; la cubierta blanca pequeña a lo lejos a la izquierda; trabajadores pequeños que
//     raspan, cargan cubos, criban y dibujan. Suelo y 150 (el camino de delante, y 146–180); una LOSA medio enterrada
//     delante x 214–250, y 150–158 (la del bocadillo de Atom: quien la limpia, de rodillas en x ~200 o ~254).
//     Cámara 'muro': EL MURO ENTRE DOS RECINTOS (2025), de cerca: piedra seca a hiladas con mortero de barro (y 36–146),
//     encima la membrana de la cubierta y una cercha (y 0–30), y por detrás del muro las cabezas de dos pilares y la
//     pasarela con visitantes diminutos; un andamio de restauración a la derecha (tubos x 230–306, plataformas y 70 y 108,
//     con un restaurador que rejunta), y dentro del muro, en su hilada de abajo, la ESTATUA DE PIEDRA de una persona tumbada
//     boca arriba (x 150–282, y 120–142; cabeza a la izquierda): o.estatua 0–1 la va destapando de izquierda a derecha
//     (el barro que la tapa se retira y cae polvo del borde). Cubos, brochas, una lámpara de obra. Suelo y 150, libre x
//     30–200.
// Llama a colinaDelante(R, t, o) con las mismas opciones después de los actores: cardos y piedras en las esquinas de abajo
// ('cerro', las dos cámaras), el barandal de la pasarela (y 147–168, postes cada 40 px; 'excavacion'), la viga tumbada y
// el puntal de delante (x 214–320, y 156–180; 'corte'), cajas de hallazgos y un cubo abajo a la derecha (x 270–320,
// y 156–180; 'norte') y un cubo con una manguera abajo a la derecha ('muro'). Ninguna pieza de delante sube de y 147.
export function colina(R, t, o = {}) {
  const enc = o.encuadre ?? 'cerro', cam = o.camara ?? 'general';
  if (enc === 'excavacion') return cam === 'corte' ? a_corte(R, t, o) : a_excavacion(R, t, o);
  if (enc === 'norte') return cam === 'muro' ? a_muro(R, t, o) : a_norte(R, t, o);
  return cam === 'losas' ? a_losas(R, t, o) : a_cerro(R, t, o);
}
export function colinaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'cerro', cam = o.camara ?? 'general', est = a_est(o);
  if (enc === 'cerro') {
    // cardos y piedras en las dos esquinas de abajo, que se mecen
    a_piedra(R, 6, 176, 9, 5, 31); a_piedra(R, 20, 178, 6, 3, 32); a_piedra(R, 300, 177, 10, 5, 33);
    a_cardo(R, 12, 180, 26, t, 1, est); a_cardo(R, 30, 180, 17, t, 2, est); a_cardo(R, 296, 180, 22, t, 3, est); a_cardo(R, 312, 180, 15, t, 4, est);
    a_matas(R, t, [[44, 180, 7], [276, 180, 8], [2, 172, 6]], est);
  } else if (enc === 'excavacion' && cam !== 'corte') a_barandal(R);
  else if (enc === 'excavacion') a_puntalDelante(R);
  else if (enc === 'norte' && cam !== 'muro') a_cajasDelante(R, t);
  else if (enc === 'norte') a_cuboManguera(R);
}
// ── B · El recinto hace 11.600 años ──────────────────────────────────────────────────────────────────────────────────
// Luz rasante del alba desde la izquierda (sombras largas a la derecha); cada encuadre pinta los 320 × 180 en cada
// fotograma: el cielo tramado con nubes de tres tonos a tres velocidades (sin aviones: es el Neolítico), lo fijo en un
// búfer (R.nuevo) y encima la vida: gente pequeña que trabaja, hogueras con humo, grullas, polvo en la luz.
// o.encuadre:
//   'construccion' (por omisión), o.camara 'general': UN RECINTO EN CONSTRUCCIÓN al amanecer (sol bajo a la izquierda,
//     x 62, y 70). El muro circular de piedra seca a hiladas (su cara interior, en arco: base y ~100 en el centro, ~122 en
//     los bordes) a medio levantar, con un hueco sin terminar en x ~206–246 donde un obrero coloca piedras, y un banco
//     corrido al pie; cinco pilares en T del anillo delante del muro (x 22, 70, 160, 238, 300) con jabalí, serpientes,
//     grulla, escorpión y buitre. EL PILAR CENTRAL DE PIE en x 118 (base y 134, ~81 px de alto, brazos, manos, cinturón,
//     taparrabos de zorro y un zorro en el pecho) con un andamio de troncos atados a su izquierda (x 92–106) y un tallista
//     que golpea en lo alto (saltan lascas). EL OTRO CENTRAL, el que se levanta: base x 196, y 146, 90 px de alto, con un
//     uro en el pecho; o.levantar 0–1 lo lleva de tumbado a 64° (la cabeza apoyada en un castillete de troncos en x
//     254–292, y 117–146) a de pie, con dos palancas y sus dos obreros mientras está inclinado; dos CUERDAS DE CUERO van
//     de su cuello a la izquierda: pasan por (100, 139) y acaban en el suelo en (12, 146). Cestas de piedras, montones de
//     cascotes, lascas de sílex y percutores por el suelo; dos hogueras con humo (x 44, y 131 y x 306, y 137); un
//     porteador con una cesta en la cabeza que va y viene por lo alto del muro, otro que cruza la loma con un tronco al
//     hombro; grullas en uve; a lo lejos, por el hueco del muro, el campamento de tiendas con su humo y gacelas que cruzan
//     la loma; por el suelo la senda pisada de la fila, huellas, los surcos del arrastre, ocre, un rollo de cuerda y un
//     odre. o.atardecer true: la misma obra a la caída del sol (cielo de tarde, sol bajo a la izquierda en x 50, y 80,
//     todo teñido de luz cálida, sombras de los pilares el doble de largas y haces de luz por el suelo; las mismas
//     posiciones). o.noche true: de noche (luna, estrellas), antorchas en pértigas (x 52, 150, 246) y
//     las hogueras que tiemblan y tiñen de naranja la caliza y el suelo. Devuelve { cuerdas: [[x0, y0, x1, y1, x2, y2],
//     …], enCuerda(i, x) → y de la cuerda i en x (para poner las manos), cabeza: [x, y] del pilar que se levanta }.
//     Suelo y 150: la fila de los que tiran en x 20–110 (manos en enCuerda); x 130–300 libre delante (y 150–170).
//     Cámara 'pilar': EL PILAR CENTRAL DE CERCA (x 136–184 la cabeza, 18–150 de alto; base x 160, y 150, escala 2,2): la
//     cabeza en T, el collar con su colgante en creciente, los BRAZOS en relieve que bajan por los costados, las MANOS de
//     dedos largos que se juntan sobre el vientre, el cinturón con su hebilla y sus marcas, el taparrabos de piel de
//     zorro con la cola y un ZORRO que salta en el pecho; la luz rasante cálida marca los relieves; detrás el muro de
//     piedra seca con su banco y pilares más pequeños empotrados (paralaje a media velocidad), la loma y el cielo del
//     alba; el suelo de cal con guijarros, placas de roca con grietas, la senda pisada, lascas, huellas y ocre; al pie del
//     muro cestas de piedras, un odre en su estaca y cascotes; polvo que flota en la luz, una lagartija en el muro, un
//     porteador arriba, gacelas que cruzan la estepa lejana y el humo del campamento tras el muro.
//     o.recorrer 0–1 desliza la cámara de pilar en pilar a la derecha (cada 190 px): el central (zorro), jabalí y
//     serpientes, escorpión y grulla, buitre y uro (sin brazos: los animales ocupan el fuste, bien grandes). o.relieve
//     (nombre) enciende con una luz suave y un pulso el relieve de ese animal en el pilar que lo lleva; devuelve
//     .pilares [[x, y base], …] en pantalla y .recorrerDe(nombre) → el o.recorrer que centra el pilar de ese animal.
//     o.noche como arriba. Suelo y 150, libre x 20–120 y 200–300.
//   'banquete': EL BANQUETE junto al recinto, al atardecer (sol bajo en x 212, y 80, detrás del muro): el muro exterior
//     del recinto (y ~100–124) con las cabezas de los pilares asomando y los dos centrales más altos (x 140 y 178),
//     encendidos por el fuego; delante, en el término medio (y 126–140): dos hogueras (x 70 y 252) con humo, la de la
//     derecha con un espetón de carne de gacela que se asa y gotea; dos mujeres que muelen en sus piedras de moler (x 26 y
//     44), dos grandes cuencos de piedra con papilla humeante (x 118 y 206), cestas de espigas silvestres, pieles en el
//     suelo y gente pequeña sentada que come, charla y ríe; uno que llega con una cesta de espigas. Suelo y 150, libre x
//     40–260 (y 144–168).
// Llama a recintoDelante(R, t, o) con las mismas opciones después de los actores: un tronco descortezado abajo a la
// izquierda (x 0–56, y 166–180) y una cesta de piedras abajo a la derecha (x 284–320, y 158–180) en 'construccion';
// matas, un percutor y lascas en las esquinas en 'pilar'; la piedra de moler con su mano y grano (x 0–50, y 160–180) y
// una cesta de espigas (x 282–320, y 152–180) en 'banquete'.
export function recinto(R, t, o = {}) {
  const enc = o.encuadre ?? 'construccion';
  if (enc === 'banquete') return b_banquete(R, t, o);
  if ((o.camara ?? 'general') === 'pilar') return b_recintoPilar(R, t, o);
  return b_construccion(R, t, o);
}
export function recintoDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'construccion', pilar = (o.camara ?? 'general') === 'pilar', noche = !!o.noche, f = (c) => (noche ? b_mez(c, b_P.noche, 0.5) : c);
  if (enc === 'banquete') {
    b_moler(R, 26, 176, t, 1.6, false);
    b_cesta(R, 302, 178, 18, 14, 'espigas', t, f);
    for (let k = 0; k < 9; k++) { const x = 270 + k * 3, m = Math.round(Math.sin(t * 1.8 + k) * 1.2); R.linea(x, 180, x + m, 170 - (k % 3) * 2, f(k % 2 ? C.estepaS : C.estepa)); }
    return;
  }
  if (pilar) {
    // matas secas que se mecen, un percutor de piedra y lascas de sílex en las esquinas
    for (const [x0, n] of [[0, 14], [290, 12]]) for (let k = 0; k < n; k++) { const x = x0 + k * 2 + (k % 3), al = 5 + ((k * 7) % 6), m = Math.round(Math.sin(t * 2 + k * 0.7) * 1.4);
      R.linea(x, 180, x + m, 180 - al, f(k % 3 ? C.estepaS : C.estepa)); if (k % 4 === 0) R.pset(x + m, 179 - al, f(C.trigo)); }
    b_piedra(R, 34, 176, 5, 4, f); b_lasca(R, 46, 177, f); b_lasca(R, 278, 176, f); b_lasca(R, 270, 178, f);
    return;
  }
  // 'construccion': el tronco descortezado, una cuña y la cesta de piedras
  b_tronco(R, -4, 173, 52, 171, 5, f, { corte: true });
  b_piedra(R, 62, 178, 4, 3, f); b_lasca(R, 70, 177, f);
  b_cesta(R, 302, 178, 18, 16, 'piedras', t, f);
}
// ── C · La cantera y el paisaje del Neolítico ────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'estepa' (por omisión), o.camara 'general': LA ESTEPA HACE 11.600 AÑOS, en tres términos. Cielo tramado con cúmulos
//     de tres tonos a tres velocidades, jirones altos y una bandada de GRULLAS que cruza en uve (y 46–62, por debajo de
//     Atom). Al fondo los MONTES KARACADAĞ (x 150–320, cumbre y ≈ 50 en x ≈ 300, conos de escoria y coladas de basalto
//     oscuro con bruma al pie); a la izquierda lomas lejanas con EL CERRO DE LOS PILARES (x ≈ 40, y ≈ 66: mancha clara,
//     piedras de pie y un hilo de humo). En medio: la llanura lejana con UROS que pastan (x 150–200, pies y ≈ 92), la loma
//     de la izquierda con pistacheros y almendros, una manada de GACELAS que pastan y levantan la cabeza (x 30–110, pies
//     y 104–108) y un trío que cruza a la carrera cada 11 s, dos CAZADORES pequeños agazapados con arcos tras una mata
//     (x 176–190, pies y 108), el ARROYO que serpentea (y ≈ 106–114, con brillos que corren y cañas), tres grullas de pie
//     en el agua (x 128–150), JABALÍES y un jabato que hozan junto a un matorral (x 222–262, pies y 118). Delante el
//     TRIGO SILVESTRE (y 118–148) que se mece con rachas, y el sendero de tierra pisada (y 146–164) con guijarros y
//     lascas de sílex. o.hora: 'dia' (por omisión) | 'atardecer' (el sol bajo a la izquierda y todo en tonos cálidos;
//     vale para todos los encuadres). Suelo y 150 (los pies de los personajes, y 146–158), libre x 20–260.
//     Cámara 'trigo': EL TRIGO SILVESTRE DE CERCA: los Karacadağ grandes detrás (x 120–320, cumbre y ≈ 48), el cerro
//     lejos a la izquierda (x ≈ 45, y ≈ 78), un mar de trigo en tres términos con rachas de viento que lo recorren,
//     espigas grandes con barbas que se mecen, tres RECOLECTORAS pequeñas con hoces de sílex y cestas que siegan entre
//     el trigo, cada una en su claro ya segado (x 64, 150, 244, pies y 133–137), pistacheros sueltos. o.camino true dibuja una línea punteada luminosa
//     con chispas que corren desde las laderas (x ≈ 262, y ≈ 74) hasta el cerro (x ≈ 46, y ≈ 77) (devuelve .camino, la
//     lista de puntos). Suelo y 150, libre x 20–300.
//   'cantera': LA CANTERA DE CALIZA en la meseta: dos bancales escalonados a la izquierda (caras con estratos, marcas de
//     pico y huecos de bloques ya sacados) con canteros pequeños que golpean con percutores (el golpe, la lasca y el
//     polvo) y uno que acarrea un bloque; abajo a la derecha, en la llanura, EL CERRO DE LOS RECINTOS (x 228–316,
//     cima y ≈ 72) con sus muros redondos, pilares diminutos y humo. En el suelo de roca, EL PILAR SIN TERMINAR de siete
//     metros tumbado en su zanja (x 88–224, cara de arriba y 112–128, cara de delante y 127–141, la cabeza en T a la
//     derecha x 188–224), con su RAJA (x ≈ 146–153), cuñas de madera en la ranura de la izquierda, percutores y lascas
//     de sílex por el suelo, bloques ya cortados (x 16–40 y 254–286, y 113–127), una palanca apoyada en la zanja, una
//     cesta de lascas (x ≈ 36), un odre (x ≈ 266) y otra palanca tumbada; una lagartija cruza la roca. Dos buitres dan
//     vueltas. Suelo y 150, libre x 20–80 y 236–300 (y delante del pilar, que queda detrás de los pies).
//     Cámara 'troncos': EL TRANSPORTE: un pilar en T tumbado (84 px, la cabeza delante a la derecha, y 99–118) que
//     avanza sobre troncos por un camino de tierra clara (y 104–131); los troncos ruedan a la mitad de su velocidad y el que sale por
//     detrás vuelve a ponerse delante; dos filas de gente (7 y 7, figuras de 11 px) tiran de dos cuerdas a la vez, a
//     golpes (cada 1,3 s el tirón, con polvo), dos empujan con palancas por detrás, unos niños y mayores miran desde la
//     ladera (pies y ≈ 92), y al fondo a la derecha el cerro con los recintos a medio hacer (x 214–320, cima y ≈ 58);
//     delante, estepa con calvas de caliza, matas, un rollo de cuerda, una cesta y un odre (y 132–180). o.avance 0–1
//     mueve el pilar de izquierda a derecha (si no se da, avanza solo despacio con t). Suelo y 150, libre x 20–300.
// Devuelve { suelo, horizonte, ... }: 'estepa' .cerro, .monte; 'trigo' .camino; 'cantera' .pilar [x0, y0, x1, y1],
// .raja [x, y], .cabeza [x, y]; 'troncos' .pilar [x0, y0, x1, y1], .cuerda [x, y] (donde acaban las filas).
// o.gacela (en cualquier encuadre): true | { x, y, pose, dir, k } | una lista: LA GACELA GRANDE a la escala de los
//   personajes (≈17 × 19 px con los cuernos), por detrás de ellos: x el centro del cuerpo, y la línea de las pezuñas
//   (por omisión 250, 150), pose 'mira' | 'pasta' | 'anda' | 'corre', dir (por omisión −1, mira a la izquierda).
//   Devuelve .gacela: la cabeza de cada una [x, y].
// Además, en 'cantera': lajas con juntas, cazoletas, líquenes, escombreras, el hogar de los canteros con su fuego
// (x ≈ 64, y ≈ 110), gacelas lejanas al pie del cerro y la sombra de una nube que cruza; en 'troncos': los Karacadağ
// azulados al fondo, un campamento de chozas en la ladera (x 70–96), los surcos del arrastre, amapolas, cardos,
// matorrales, una rama seca, mariposas, un cernícalo y las sombras de las nubes.
// Llama a neoliticoDelante(R, t, o) después de los actores: matas de hierba, espigas, una roca y piedras en las
// esquinas de abajo (x 0–34 y 286–320), según el encuadre (en 'trigo', espigas altas que se mecen en los bordes).
// o.escanda: true | x | { x, y, alto, inclina } | una lista: ESPIGAS GRANDES DE ESCANDA SILVESTRE en primer plano,
//   delante de todo (por omisión x 300, pie y 182, alto 86, inclinadas hacia el centro); se mecen con el viento.
//   Entonces devuelve { escanda: [la punta [x, y] de cada una] }.
export function neolitico(R, t, o = {}) {
  const enc = o.encuadre === 'cantera' ? 'cantera' : 'estepa', hora = o.hora === 'atardecer' ? 'atardecer' : 'dia', P = c_P(hora);
  const r = enc === 'estepa' ? (o.camara === 'trigo' ? c_trigal(R, t, o, hora, P) : c_estepa(R, t, o, hora, P)) : (o.camara === 'troncos' ? c_troncos(R, t, o, hora, P) : c_cantera(R, t, o, hora, P));
  // la gacela grande (opcional), por detrás de los personajes
  if (o.gacela) { const lista = Array.isArray(o.gacela) ? o.gacela : [o.gacela === true ? {} : o.gacela];
    r.gacela = lista.map((g, k) => c_gacelaG(R, P, g.x ?? 250, g.y ?? 150, t, { dir: g.dir ?? -1, pose: g.pose ?? 'mira', k: g.k ?? k })); }
  return r;
}
// lo que va por delante de los personajes: hierba, espigas y piedras en las esquinas de abajo, según el encuadre
export function neoliticoDelante(R, t, o = {}) {
  c_neoDelante(R, t, o);
  // las espigas grandes de escanda (opcionales), delante de todo
  if (!o.escanda) return;
  const P = c_P(o.hora === 'atardecer' ? 'atardecer' : 'dia'), lista = Array.isArray(o.escanda) ? o.escanda : [o.escanda === true ? {} : typeof o.escanda === 'number' ? { x: o.escanda } : o.escanda];
  return { escanda: lista.map((e) => { const x = e.x ?? 300, alto = e.alto ?? 86, lean = e.inclina ?? (x > 160 ? -8 : 8);
    return c_escanda(R, P, x, e.y ?? 182, alto, lean + (Math.sin(t * 1.7 + x * 0.04) * 1.6 + Math.sin(t * 3.1 + x * 0.13) * 0.6) * alto / 30, t); }) };
}
// ── D · Los arqueólogos ──────────────────────────────────────────────────────────────────────────────────────────────
// Tres encuadres (o.encuadre). Cada uno pinta los 320 × 180 en cada fotograma: lo fijo va en un búfer (R.nuevo) que se
// copia, y encima la vida animada con t. SIN LETRAS: las etiquetas llevan números (cifras de 3 × 5) y pictogramas.
//   'tienda' (por omisión): EL CAMPAMENTO DE LA PROSPECCIÓN DE 1963 al pie del cerro, a pleno sol de verano: cielo tramado
//     con nubes de tres tonos a tres velocidades y pájaros, la sierra azulada, el CERRO de tierra arada con sus surcos,
//     losas de caliza rotas y el MORAL solitario en lo alto (copa x ~186–210, y ~28–52; pie del tronco x 198, y ~60),
//     un pastor con su rebaño y su perro en la ladera, campos de rastrojo y de arado con muretes de piedra seca, un pueblo
//     de casas de tejado plano a lo lejos, un camino de tierra que baja del cerro (y 100) al primer término (x ~250–270);
//     la TIENDA de lona caqui de cumbrera (x 2–92, puerta x 54–74, y 108–150; vientos y piquetas, el banderín que ondea,
//     un farol encendido dentro, una toalla colgada del viento), el HORNILLO sobre una caja con la CAFETERA humeante
//     (x 98–112, boca de la cafetera x ~108, y 128), la MESA PLEGABLE (tablero x 117–173, y 133–137) con el mapa colgando
//     por delante (sin letras: curvas de nivel y un punto rojo), una brújula, un cuaderno y la RADIO DE VÁLVULAS (x 152–168,
//     y 121–133, dial que brilla, antena que se mece), la CAJA DE HALLAZGOS con sílex y su número (x 176–196, y 139–150), el
//     JEEP de los sesenta verde oliva con la rueda de repuesto, pico y pala en el costado (x 222–306, ruedas x 240 y 290),
//     dos bidones de aceite junto a él (x 296–319) y dos garrafas (x 208–220); remolinos de polvo, hierba seca al viento.
//   'casa': LA CASA DE LA EXCAVACIÓN (por dentro), una casa de piedra de Urfa: muros de sillares de caliza con juntas,
//     techo de vigas y cañizo, suelo de losas con un kilim; a la izquierda la ESTANTERÍA METÁLICA de cajas numeradas y
//     cajas azules con piedras (x 2–66); los DIBUJOS DE PILARES clavados (un pilar en T con sus brazos, el zorro, una
//     planta; x 76–142, y 22–60) y el MAPA DE LA COLINA con los cuatro recintos (x 148–190, y 22–62); la VENTANA (hueco
//     x 203–247, y 29–77) con postigos, un geranio y un gato que duerme en el alféizar; fuera, el cerro con la CUBIERTA
//     BLANCA (o.anos ≥ 2017) o con las catas y los andamios, trabajadores diminutos, nubes y pájaros; el haz de sol que
//     entra con su polvo; la MESA DEL FONDO (tablero y 99–102, x 76–192) con el flexo encendido, bandejas, papeles y un
//     ventilador que gira la cabeza, cubos de goma, sacos con etiqueta y un tamiz debajo; dos tamices colgados (x ~262–280,
//     y 50–90), el reloj de pared (x 300, y 58), el escritorio con el ORDENADOR (x 270–319, y 70–103): un monitor de tubo
//     (o.anos < 2006) o una pantalla plana, que dibuja un pilar; el ventilador de techo (x 232) y una salamanquesa.
//     o.anos (1995–2026; por omisión 2022). La MESA DE DELANTE la pinta arqueologosDelante (después de los actores).
//   'laboratorio': EL LABORATORIO DEL CARBONO 14: paredes de paneles blancos, techo con plafones, la VENTANA con persiana
//     (x 66–104, y 24–60: árboles, un edificio, nubes, alguien en bici), la CAMPANA DE GASES (x 2–46) con un vaso que hierve
//     en la placa y el horno de tubo que brilla, el banco (x 48–104, tablero y 112) con el ORDENADOR que traza la curva de
//     calibración, la gradilla de VIALES DE CARBÓN NUMERADOS y la balanza; el ACELERADOR: la FUENTE DE IONES (x 106–148,
//     y 76–148) con la BOCA DE CARGA (x 120–134, y 124–134, a la altura del pecho de un personaje de pie en x ~112), el
//     tubo del haz con sus mirillas, el GRAN TANQUE verde (x 150–250, y 52–112) con el pictograma de radiación, el IMÁN
//     naranja (x 252–286, y 60–104) y el DETECTOR con sus luces (x 288–319, y 64–148); el PUPITRE de control bajo el
//     tanque (x 160–240, y 114–148) con la PANTALLA DEL RESULTADO (x 170–230, y 118–135). o.muestra 0–1: la muestra
//     (un portamuestras de metal) va de la gradilla a la boca de carga (0–0,3), entra y el haz recorre la máquina (las
//     mirillas se encienden, las agujas saltan; 0,3–0,85) y la pantalla se enciende (≥ 0,85).
// Devuelve, según el encuadre:
//   tienda: { suelo: 150, mesa: [145, 133], cafetera: [105, 128], radio: [160, 121], caja: [186, 139], jeep: [264, 150] }
//   casa: { suelo: 150, mesaFondo: [134, 99], ordenador: [292, 86], ventana: [225, 52] }
//   laboratorio: { suelo: 150, puerto: [127, 129], muestra: [x, y] (dónde va el portamuestras), listo (true si ya se ve
//     el resultado), numero: [200, 131] (la base, centrado, para R.numero('9500', x, y, { centro: true }) en tam 8; la
//     pantalla mide x 170–230, y 118–135) }
// Llama a arqueologosDelante(R, t, o) con las mismas opciones después de los actores.
export function arqueologos(R, t, o = {}) {
  const enc = o.encuadre ?? 'tienda';
  if (enc === 'casa') return d_casa(R, t, o);
  if (enc === 'laboratorio') return d_laboratorio(R, t, o);
  return d_tienda(R, t, o);
}
// Lo que va por delante de los personajes (se llama después de los actores, con las mismas opciones):
//   'tienda': dos cardos que se mecen y unas piedras en las esquinas de abajo (x 0–22 y 296–319, y 160–180).
//   'casa': LA MESA DE DELANTE (tablero x 24–296, y 146–162; faldón y 162–168; patas hasta abajo). Quien está detrás con
//     los pies en y 150 asoma cabeza, hombros y pecho. Encima, tres BANDEJAS con su etiqueta numerada: puntas de flecha de
//     sílex (x 40–98, etiqueta 117), piedras de moler de basalto (x 104–152, etiqueta 43) y huesos de gacela con un
//     cuerno (x 158–214, etiqueta 27); a la derecha un montón de piezas sin ordenar (x ~226–246), una paleta, una
//     brocha, una lupa, una regla de escala, un cuaderno y un vaso de té que humea. o.ordena 0–1: cinco puntas pasan una
//     a una del montón a su hueco en la bandeja de sílex; devuelve { pieza: [x, y] } (la que se mueve, para la mano).
//     o.mesa false: sin mesa.
//   'laboratorio': nada (devuelve {}).
export function arqueologosDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'tienda';
  if (enc === 'casa') return o.mesa === false ? {} : d_casaMesa(R, t, o);
  if (enc === 'tienda') d_tiendaDelante(R, t);
  return {};
}
// ── E · Lo que se cuenta hoy ─────────────────────────────────────────────────────────────────────────────────────────
// Cada encuadre pinta los 320 × 180 en cada fotograma: lo fijo en un búfer de R.nuevo() (uno por encuadre) y encima la
// vida. Devuelve la geometría útil del encuadre (suelo, tele, sitios…). o.encuadre:
//   'salon' (por omisión): UN SALÓN DE NOCHE. Papel pintado a rayas con rombos y la luz cálida de la LÁMPARA DE PIE
//     (x 156, pantalla y 46–60); la VENTANA (x 22–86, y 28–100) con la ciudad de noche recortada a su hueco (ventanas
//     que se encienden, coches por el puente, la antena que parpadea, un avión) y sus cortinas que se mecen; la
//     ESTANTERÍA (x 94–136, y 36–124) con libros, una pirámide de recuerdo, un globo y una PECERA con peces y burbujas;
//     la balda con dos velas que titilan, una foto y un reloj de arena (x 178–262, y 22–36); la TELE grande sin marcas
//     (marco x 170–290, y 50–114; imagen x 174–286, y 54–110) sobre su mueble (x 162–300, y 116–138, con el router que
//     parpadea) que emite el documental de «civilización perdida»: cambia cada 3,2 s con un chispazo de nieve entre
//     programas (0 un barco antiguo atrapado en el hielo con aurora y nieve, 1 una ciudad de pirámides y columnas que se
//     hunde en el mar al atardecer, con relámpago, 2 un pilar en T bajo focos con niebla y figuritas al pie, 3 un cometa
//     que cruza y estalla en el horizonte), con su rótulo de barras (sin letras); o.programa 0–3 fija uno. La luz de la
//     tele, del color del programa, baila en paredes, suelo y muebles. A la izquierda, la mesita con la taza y el móvil
//     que se ilumina; la monstera a la derecha (x 298–318); suelo de tablas y alfombra con un GATO dormido (x 233–252, y 160–169) que respira y mueve la cola. El RESPALDO DEL SOFÁ (x 34–144,
//     y 110–140) va aquí; el asiento y los brazos, en hoyDelante, para que el espectador se siente detrás: con los pies
//     en y 150 y x 50–118 se le ven la cabeza y los hombros. o.movil true: el salón se apaga a la mitad y hoyDelante pone
//     en primer plano EL MÓVIL (x 128–192, y 36–176) con vídeos verticales que se deslizan hacia arriba cada 1,8 s
//     (iconos: el ojo en la pirámide, la pirámide con su rayo, el cometa; corazones y contadores con números), sujeto por
//     una mano canónica a la izquierda y otro brazo canónico cuyo dedo los va pasando. Suelo y 150; libre de pie x 160–280.
//   'buitre': LA PIEDRA DEL BUITRE (pilar 43) de cerca, dentro de su recinto: el muro de piedra seca a hiladas detrás, la
//     membrana blanca de la cubierta arriba, la pasarela del otro lado con visitantes pequeños que pasan, matas que se mecen en las juntas, una lagartija
//     que sube por el muro de la derecha (x 244–266, y 84–132), la telaraña (232, 62), la etiqueta «7» (35–45, 46–53), la lona que
//     ondea, un rayo de sol con motas, una golondrina. El pilar (cabeza x 90–232, y 24–58; fuste x 106–216, y 58–150) es
//     de caliza con vetas, grietas y desconchones, y sus relieves salen con luz rasante: arriba tres «bolsos» con un ave,
//     un sapo y un ave; en el fuste el BUITRE con las alas abiertas (cabeza 126, 74) y el DISCO sobre el ala (170, 66), la
//     serpiente que baja por la izquierda, dos aves zancudas a la derecha, un pájaro pequeño y el ESCORPIÓN (162, 126).
//     Al pie, la etiqueta «43», la regla de escala, el cubo y el foco de obra. o.constelaciones 0–1 va uniendo los
//     animales con líneas de estrellas y, desde 0,6, cae un cometa hacia el disco; o.borrar 0–1 lo deshace todo en
//     tramado. Suelo y 150, libre x 20–90 y 230–295. Devuelve .estrellas (los puntos) y .disco.
//   'karahan': KARAHAN TEPE: LA SALA TALLADA EN LA ROCA VIVA, abierta al cielo (franja de cielo con nubes arriba a la
//     izquierda; la roca sube a la derecha, tras la zona de Atom), con la escalera de mano a la izquierda, la pasarela
//     del borde con visitantes diminutos, el rayo de luz que entra desde arriba con sus motas, el banco corrido tallado
//     (y 90–98) donde corretea una lagartija, la CABEZA HUMANA esculpida que asoma de la pared (88, 54) y una docena de
//     PILARES LISOS Y REDONDEADOS que brotan del suelo de roca (de 40 a 62 px, x 130–300, bases y 104–126), con sus
//     sombras; un charco que tiembla (x 40–82, y 160–168); el material de la excavación (cordel con estacas y 160–175,
//     capazos x 146–172, carretilla x 221–268, y 147–169, paleta y brocha); un restaurador diminuto que barre el banco
//     (122, 89), un cuervo que salta entre lo alto de los pilares y sombras de nubes por el suelo. o.cara true añade en primer plano a la derecha EL PILAR EN T
//     CON CARA de 2025 (cabeza x 236–304, y 70–96; base y 174). Suelo y 150, libre x 20–120.
//     Cámara 'mapa': EL MAPA DE TAŞ TEPELER sobre una mesa: la meseta de Şanlıurfa en relieve sombreado con curvas de
//     nivel (el Éufrates y su embalse a la izquierda, las lomas de Germuş, el volcán basáltico de Karacadağ con su cráter
//     y sus rayas de pendiente (centro 242, 87), los campos de Harran al sur, la ciudad en (100, 112), la frontera de
//     Siria a raya y punto abajo (y ≈ 161)), rosa de flecha abajo a la derecha (250, 148), regla 0–10–20 y chinchetas
//     (papel x 8–270, y 20–172), y arriba a la derecha el MAPITA DE TURQUÍA (x 204–262, y 28–58: mares, vecinos, ríos, el
//     lago de Van y el recuadro rojo del sureste, con Şanlıurfa que parpadea); las sombras de las nubes pasan por encima
//     y una hormiga cruza la mesa por debajo del papel. o.encendidas 0–1 enciende las doce colinas una a una (primero
//     Göbekli Tepe (124, 96) y Karahan Tepe (214, 104), con su pilar en T dibujado; luego las demás) con un punto
//     luminoso que late y una línea de puntos desde Göbekli. A la derecha, en la mesa (x 274–318): el vaso de té que
//     humea, la libreta con bocetos, el lápiz y la paleta. Devuelve .sitios [[x, y], …] en ese orden.
// Llama a hoyDelante(R, t, o) con las mismas opciones después de los actores: el asiento y los brazos del sofá con su
// manta y su cojín (y el móvil con o.movil) en 'salon'; piedras y la esquina de la pasarela abajo en 'buitre' y
// 'karahan' (solo en y > 166 y en los bordes).
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon';
  if (enc === 'buitre') return e_buitre(R, t, o);
  if (enc === 'karahan') return o.camara === 'mapa' ? e_mapa(R, t, o) : e_karahan(R, t, o);
  return e_salon(R, t, o);
}
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon';
  if (enc === 'salon') return e_salonDelante(R, t, o);
  if (enc === 'buitre') return e_piedrasDelante(R, t, 0);
  if (enc === 'karahan' && o.camara !== 'mapa') return e_piedrasDelante(R, t, 1);
}
// ── Piezas ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// d_pilar(R, x, y, o): UN PILAR EN T (x, y: el CENTRO DE LA BASE), visto de frente con un poco de costado (la cara de la
//   derecha en sombra y lo alto de la cabeza encendido), con contorno oscuro: caliza con vetas onduladas, poros y
//   desconchones, bordes comidos, la sombra de la cabeza sobre el fuste y su sombra larga en el suelo hacia la derecha
//   (o.sombra false la quita; solo de pie). Con brazos (por omisión; o.brazos false los quita): el collar en V con su
//   colgante en creciente, los BRAZOS en relieve que bajan por los costados y doblan en el codo, las MANOS de cuatro dedos
//   largos (con ranuras de cerca) que se juntan sobre el vientre con los pulgares hacia arriba, el cinturón con hebilla y
//   marcas, y el taparrabos de piel de zorro con las patas y la cola. o.escala 0,5–3 (a escala 1, 22 × 62 px; los
//   detalles finos —ranuras de los dedos, marcas, pelo de la piel, ojos— salen desde escala ~1,4). o.relieves: animales
//   en relieve ('zorro', 'jabali', 'serpientes', 'escorpion', 'grulla', 'buitre', 'uro'): con brazos, el primero en el
//   pecho y el segundo en la cabeza; sin brazos, hasta tres por el fuste (grandes) y el cuarto en la cabeza. o.cara true:
//   la cara del de Karahan Tepe en la cabeza (cejas, nariz, ojos y boca). o.inclinado (grados; positivo, la cabeza a la
//   derecha; gira sobre el centro de la base). o.luz 0–1: luz rasante cálida desde la izquierda (en los filos de los
//   relieves y la cara izquierda). o.noche: la caliza azulada de noche (con o.luz, la de una antorcha a la izquierda).
//   o.brillo (nombre de animal) y o.t: ese relieve se enciende con un pulso cálido. o.sem varía vetas y desconchones.
//   o.largoSombra (por omisión 1): multiplica el largo de la sombra (2–2,5 al atardecer). De cerca (escala > 1,3) se ven
//   las marcas del picado del cincel. Respeta R.recorte (pinta con pset): recórtalo a una ventana o a un marco.
//   Devuelve { cabeza: [x, y] (lo alto, centro), arriba, manos: [x, y], base, ancho } ya girados.
// d_moler(R, x, y, o): UNA PIEDRA DE MOLER con su mano de piedra y grano. d_cuenco(R, x, y, o): UN GRAN CUENCO DE PIEDRA
//   con papilla (o.lleno 0–1, vapor). d_figuritas(R, x, y, o): EL CUENCO DE CLORITA con las tres figuritas (zorro,
//   jabalí y buitre). d_estatua(R, x, y, o): LA ESTATUA HUMANA de piedra tumbada (o.destapada 0–1). d_leopardo(R, x, y, o):
//   LA FIGURA SENTADA SOBRE UN LEOPARDO. d_relieve(R, x, y, o): EL RELIEVE DE SAYBURÇ (un hombre entre dos leopardos y otro
//   frente a un toro, en piedra).
// pausa(R, x, y, t, o): los objetos de las pausas (los saca Atom a color en el mundo congelado; pixel art limpio a escala
//   2 —o.s—, con contorno, luz y sombra, y su sombra en el suelo). x, y: el CENTRO DE LA BASE. o.cual:
//   'troncos' (~120 × 80): un pilar tumbado sobre troncos con dos palancas y una fila de seis figuritas que tiran de la
//     cuerda; «10 t» encima (o.numero); o.avance 0–1 lo hace rodar; con o.carretilla una carretilla a la que se le cae la
//     rueda (devuelve .rueda);
//   'reloj' (~100 × 90): un reloj de arena y una tarta que se parte por la mitad una y otra vez (o.mitades 0–5) con
//     «5730» encima;
//   'banquete' (~120 × 80): piedras de moler, un cuenco de piedra con papilla humeante y unas espigas que se convierten en
//     un campo sembrado (o.campo 0–1);
//   'nube' (~120 × 90): un enchufe con cara y una nube que cambia de forma (o.forma 0–3: animal, buitre, cometa, Atom);
//   'balanza' (~110 × 90): una balanza con un libro de portada de película (una mano que entierra algo) y otro con una
//     nube de lluvia; o.peso 0–1 la inclina hacia la película.
//   o.numero: sin poner, el número sale en su momento; true, siempre; false, nunca. Todas devuelven { arriba: [x, y] }.
export function d_pilar(R, x, y, o = {}) {
  const s = Math.max(0.5, o.escala ?? 1), p = 1 / s, ang = (o.inclinado ?? 0) * Math.PI / 180, ca = Math.cos(ang), sa = Math.sin(ang);
  const noche = !!o.noche, luz = o.luz ?? 0, ps = R.pset, pg = R.pget, G = b_pilarGeo(o, p), pulso = G.glow ? 0.65 + 0.35 * Math.sin((o.t ?? 0) * 3.2) : 0;
  const L = (u, v) => [x + (u * ca + v * sa) * s, y - (-u * sa + v * ca) * s], ramp = noche ? b_P.calN : b_P.cal;
  // la sombra larga en el suelo, hacia la derecha (la luz rasante viene de la izquierda)
  if (o.sombra !== false && Math.abs(ang) < 0.35) { const ls = Math.max(0.3, o.largoSombra ?? 1), largo = 34 * s * ls, lsA = ls > 1 ? Math.min(0.5, 0.3 + 0.12 * (ls - 1)) : 0.3, lsS = ls > 1 ? hex('#3a1a2a') : C.k, gr = Math.max(2, Math.round(2.4 * s));
    for (let i = Math.round(-3 * s); i < largo; i++) { const X = Math.round(x + 6 * s + i), e = gr + (i > largo * 0.6 ? Math.round(s) : 0); if (X < 0 || X > 319) continue;
      for (let j = -e; j <= 1; j++) { const Y = Math.round(y + j - i * 0.03); if (Y < 0 || Y > 179) continue; if (b_U(X, Y) < (1 - i / largo) * (ls > 1 ? 0.55 : 0.9) + (ls > 1 ? 0.45 : 0.1)) ps(X, Y, b_mez(pg(X, Y), lsS, lsA)); } } }
  let X0 = 1e9, X1 = -1e9, Y0 = 1e9, Y1 = -1e9;
  for (const [u, v] of [[-12, -1], [15, -1], [-12, 63], [15, 63]]) { const [a, b] = L(u, v); X0 = Math.min(X0, a); X1 = Math.max(X1, a); Y0 = Math.min(Y0, b); Y1 = Math.max(Y1, b); }
  X0 = Math.max(0, Math.floor(X0)); X1 = Math.min(319, Math.ceil(X1)); Y0 = Math.max(0, Math.floor(Y0)); Y1 = Math.min(179, Math.ceil(Y1));
  for (let Y = Y0; Y <= Y1; Y++) { const dyU = y - (Y + 0.5);
    for (let X = X0; X <= X1; X++) { const dx = X + 0.5 - x, u = (dx * ca - dyU * sa) * p, v = (dx * sa + dyU * ca) * p, cara = b_pilarCara(u, v, G);
      if (cara < 0) continue;
      // el contorno oscuro
      if (b_pilarCara(u - p, v, G) < 0 || b_pilarCara(u + p, v, G) < 0 || b_pilarCara(u, v + p, G) < 0 || b_pilarCara(u, v - p, G) < 0) { ps(X, Y, ramp[0]); continue; }
      let tn, lit = 0, glow = 0;
      if (cara === 0) { tn = (v > 47.5 ? 4.3 : 3.7) - u * 0.05; if (v <= 47.5 && v > 45) tn -= 1.3; if (v < 5) tn -= (5 - v) * 0.14; if (u < (v > 47.5 ? -10.2 : -6.3)) tn += 0.9; if (v > 47.5 && v < 48.4 && Math.abs(u) > 7) tn -= 1.2; }
      else if (cara === 1) tn = 1.5 + v * 0.008;
      else if (cara === 2) tn = 5.8;
      else tn = 1.7;
      // las vetas de la caliza y los poros
      tn += 0.3 * Math.sin(v * 0.85 + 2 * Math.sin(u * 0.21 + v * 0.07 + G.sem));
      const q = h(X, Y, G.sem + 7); if (q < 0.02) tn -= 0.8; else if (q > 0.98) tn += 0.5;
      if (cara === 0) {
        for (const [cu, cv, cr] of G.chips) { const dd = Math.hypot(u - cu, v - cv); if (dd < cr) { tn -= 0.7; if (dd > cr - 1.2 * p) tn += (u - cu) + (cv - v) > 0 ? 1.5 : -0.6; } }
        if (G.rel(u, v)) { tn += 1.25; if (!G.rel(u - p, v + p) || !G.rel(u - p, v)) { tn += 1.1; lit = 1; } else if (!G.rel(u + p, v - p) || !G.rel(u + p, v)) tn -= 2.1; }
        else if (G.rel(u - p, v + p) || G.rel(u - p, v) || (luz > 0.3 && (G.rel(u - 2 * p, v + p) || G.rel(u - 2 * p, v)))) tn -= 1.5;
        if (G.inc(u, v)) tn -= 1.8;
        // las marcas del picado del cincel (de cerca): rayas cortas en diagonal
        else if (s > 1.3 && ((u * 0.9 + v * 0.45 + G.sem * 1.7) % 2.6 + 2.6) % 2.6 < 0.42 * p + 0.12 && h(Math.floor(u * 0.5), Math.floor(v * 0.6), G.sem + 31) < 0.3) tn -= 0.55;
        if (pulso && u > G.glow[0] && u < G.glow[2] && v > G.glow[1] && v < G.glow[3]) { glow = pulso; tn += 0.7 * pulso; }
      }
      // la luz rasante cálida (más fuerte a la izquierda y en los filos encendidos) y el relieve que se enciende
      let w = luz * (cara === 0 ? Math.max(0, Math.min(1, 0.5 - u * 0.05 + lit * 0.5)) : cara === 2 ? 0.8 : 0.15);
      if (glow) w = Math.max(w, 0.95 * glow);
      if (noche) { ps(X, Y, w > 0.05 ? b_mez(b_tono(ramp, tn, X, Y), b_tono(b_P.calC, tn - 1.4, X, Y), Math.min(0.85, w)) : b_tono(ramp, tn, X, Y)); continue; }
      const warm = w > 0 && b_U(X + 2, Y + 1) < w;
      ps(X, Y, b_tono(warm ? b_P.calC : ramp, tn, X, Y));
    } }
  const r = (q) => q.map(Math.round);
  return { cabeza: r(L(0, 60)), manos: r(L(0, 21)), base: [x, y], arriba: r(L(0, 61.6)), ancho: Math.round(22 * s) };
}
// d_moler(R, x, y, o): UNA PIEDRA DE MOLER de basalto (la «de silla»: una losa larga con la cara de arriba gastada en
//   artesa, pulida y empolvada de harina, y la cara de delante picada de poros) con su MANO de piedra encima (una hogaza
//   alargada), granos de trigo sueltos y un montoncito de harina caído en el suelo a la derecha. x, y: el CENTRO DE LA
//   BASE (donde la losa toca el suelo). A escala 1 mide unos 41 × 15 px (o.escala 1–3, entera).
//   o.mano: dónde está la mano de piedra a lo largo de la losa (−1 a 1; por omisión 0.2); o.mano false: la losa sola.
//   o.moliendo true (con o.t): la mano va y viene sola y suelta polvo de harina en cada pasada (para que la mueva un
//   personaje, dale tú o.mano desde la escena). o.harina 0–1 (cuánta harina cubre la cara gastada; por omisión 0.6).
//   o.espigas true: dos espigas de trigo silvestre tumbadas delante a la izquierda. o.t: el tiempo (polvo, motas).
//   o.sombra false: sin sombra en el suelo. Devuelve { mano: [x, y] } (lo alto de la mano de piedra, donde se agarra) y
//   { arriba: [x, y] }.
export function d_moler(R, x, y, o = {}) {
  const s = Math.max(1, Math.round(o.escala ?? 1)), w = 41, hh = 15, t = o.t ?? 0;
  const X0 = Math.round(x - 18 * s), Y0 = Math.round(y - hh * s), harina = o.harina ?? 0.6;
  const p = o.mano === false ? null : o.moliendo ? Math.sin(t * 2.4) * 0.75 : (o.mano ?? 0.2);
  // la cara gastada: los dos extremos más altos que el centro (la artesa), y los extremos redondeados
  const arr = (u) => 4.2 + 2.0 * Math.sin(Math.PI * Math.max(0, Math.min(1, (u - 2) / 32)));
  const ux = p == null ? 0 : 18 + p * 9, yM = ux ? arr(ux) + 1.2 : 0;
  if (o.sombra !== false) f_sombra(R, x + 1 * s, y, 20 * s, 2.2 * s);
  f_pieza(R, X0, Y0, w, hh, s, (i, j) => {
    const u = i + 0.5, v = j + 0.5;
    // el montón de harina caído al suelo, a la derecha
    if (f_eli(i, j, 37.5, 14.2, 3.4, 1.9)) return [F_HARINA, 0.4, 0.4 - (v - 13) * 0.3];
    if (u > 36) return null;
    // la mano de piedra (va delante de la losa)
    if (p != null && f_eli(i, j, ux, yM - 2.0, 6.6, 2.5)) return [c_moler(), 2.2, 1.5 - (v - yM + 4) * 0.45 - Math.abs(u - ux) / 12 + (h(i, j, 9) > 0.9 ? -0.8 : 0)];
    const e = Math.max(0, 3 - Math.min(u, 36 - u)), top = arr(u) + e * e * 0.35, bot = 14.6 - e * e * 0.45, frente = arr(u) + 3.2;
    if (v < top || v > bot) return null;
    if (v < frente) { // la cara de arriba, pulida: harina, granos y el brillo del pulido
      const fl = harina * 13 + (h(0, j, 2) - 0.5) * 3 - (v - top < 1 ? 3 : 0);
      if (h(i, j, 5) > 0.93 && Math.abs(u - 18) < fl + 4) return [C.trigo, 1, 0];
      if (Math.abs(u - 18) < fl) return [F_HARINA, 1, 0.2 - (v - top) * 0.3 - Math.abs(u - 18) / 30];
      return [c_moler(), 1, 1.6 - (v - top) * 0.3 + (Math.abs(u - 18) < 9 ? 0.5 : 0)];
    }
    // la cara de delante, picada de poros, más oscura hacia abajo, con el filo de arriba claro
    const poro = h(i, j, 4) > 0.88 && v > frente + 1;
    return [c_moler(), poro ? 0.4 : 1, (v < frente + 1 ? 0.8 : -0.1) - (v - frente) * 0.2 - (u - 18) / 40];
  }, { contorno: hex('#0c0a0c'), semilla: 3 });
  // las espigas tumbadas delante
  if (o.espigas) { f_espiga(R, X0 - 4 * s, y + 1 * s, -0.18, s); f_espiga(R, X0 + 1 * s, y + 2 * s, -0.05, s); }
  const mx = Math.round(X0 + ux * s), my = Math.round(Y0 + (yM - 4.5) * s);
  // el polvo de harina al final de cada pasada
  if (o.moliendo && p != null) for (let k = 0; k < 7; k++) {
    const u = (t * 0.9 + k / 7) % 1, lado = k & 1 ? 1 : -1, bx = mx + lado * 7 * s;
    const px = Math.round(bx + lado * u * 5 * s + Math.sin(t * 3 + k) * s), py = Math.round(my + 3 * s - u * 9 * s);
    if (u < 0.85 && (k + Math.floor(t * 6)) % 3) R.pset(px, py, u < 0.4 ? hex('#f6f0e0') : hex('#d8d0c0'));
  }
  if (o.t != null) f_motas(R, t, X0, Y0 - 12 * s, X0 + 36 * s, y - 2, 5);
  return { mano: [mx, my], arriba: [x, Y0] };
}
// d_cuenco(R, x, y, o): UN GRAN CUENCO DE PIEDRA (las tinas de caliza de Göbekli Tepe): una tina ancha y baja con el
//   borde grueso, el cuerpo redondeado con luz a la izquierda y un friso tallado (dos líneas y un zigzag) y algún
//   desconchón; dentro, la papilla (o la cerveza) con remolinos. x, y: el CENTRO DE LA BASE. A escala 1, unos 42 × 28 px
//   (o.escala 1–3). o.lleno 0–1 (por omisión 1): hasta dónde llega la papilla (0: vacío, se ve el fondo en sombra).
//   o.t: el tiempo: burbujas que se hinchan y revientan en la papilla y VAPOR que sube en hilos ondulantes (o.vapor
//   false lo quita). o.cuchara true: una pala de madera clavada en la papilla que se mece. o.sombra false: sin sombra.
//   Devuelve { papilla: [x, y] } (el centro de la superficie, para meter una cuchara o un dedo), { borde: [x, y] } (el
//   centro del borde de delante) y { arriba: [x, y] }.
export function d_cuenco(R, x, y, o = {}) {
  const s = Math.max(1, Math.round(o.escala ?? 1)), w = 42, hh = 28, t = o.t ?? 0, lleno = Math.max(0, Math.min(1, o.lleno ?? 1));
  const X0 = Math.round(x - 21 * s), Y0 = Math.round(y - hh * s), cx = 21, rY = 5, ry = 4.6;
  const sup = rY + 0.3 - (ry - 1.4) + (1 - lleno) * 3.4 + 0.5;   // dónde empieza la papilla (de arriba abajo)
  if (o.sombra !== false) f_sombra(R, x + 2 * s, y, 22 * s, 2.5 * s);
  // las burbujas de este instante (en coordenadas lógicas)
  const burb = [];
  if (lleno > 0 && o.t != null) for (let k = 0; k < 3; k++) {
    const per = 1.3 + k * 0.4, c = Math.floor((t + k * 0.5) / per), f = ((t + k * 0.5) % per) / per;
    burb.push([cx - 10 + h(c, k, 1) * 20, sup + 0.8 + h(c, k, 2) * (rY + 2 - sup), f]);
  }
  f_pieza(R, X0, Y0, w, hh, s, (i, j) => {
    const u = i + 0.5, v = j + 0.5;
    const fuera = f_eli(i, j, cx, rY, 20, ry), dentro = f_eli(i, j, cx, rY + 0.3, 17, ry - 1.4);
    if (dentro) {
      if (lleno <= 0 || v < sup) return [F_CALIZA, 0.2, -2.2 + (v - (rY - 3)) * 0.25];   // la pared de dentro, en sombra
      for (const [bx, by, f] of burb) { const d = Math.hypot(u - bx, (v - by) * 1.6); if (f < 0.8 && Math.abs(d - f * 2) < 0.6) return [F_PAPILLA, 0.9, 1.6]; if (f >= 0.8 && d < 0.6) return [F_PAPILLA, 0.4, -1]; }
      const rem = Math.sin(u * 0.7 + v * 1.4 + Math.sin(u * 0.3) * 2 + t * 0.4);
      return [F_PAPILLA, 0.6, (rem > 0.75 ? 0.9 : rem < -0.8 ? -0.7 : 0) + (v - sup < 1 ? -1 : 0.2) - (u - cx) / 30];
    }
    if (fuera) return [F_CALIZA, 1.6, (v < rY ? 1.6 : 1.1) - (u - cx) / 28 + (Math.abs(u - cx + 9) < 3 && v > rY ? 0.5 : 0)];
    if (v < rY) return null;
    const hw = 20 - ((v - rY) / 22) ** 2 * 5, fondo = 27.6 - ((u - cx) / 20) ** 4 * 4;
    if (Math.abs(u - cx) > hw || v > fondo) return null;
    // el cuerpo: luz a la izquierda, sombra a la derecha y abajo; el friso tallado y los desconchones
    const m = (i + 600) % 6, zz = 14.5 + (m < 3 ? m - 1.5 : 4.5 - m);
    const tallado = j === 11 || j === 18 || (j > 11 && j < 18 && Math.abs(v - zz) < 0.6);
    const roto = h(i, j, 11) > 0.95;
    return [F_CALIZA, tallado ? 0.3 : roto ? 0.5 : 1, 0.5 - (u - cx) / 20 * 1.5 - (v - rY) / 22 * 0.8 + (Math.abs(u - cx + 11) < 2.5 ? 0.6 : 0)];
  }, { semilla: 6 });
  const px = Math.round(X0 + cx * s), py = Math.round(Y0 + (sup + 1.5) * s);
  // la pala de madera clavada en la papilla, que se mece
  if (o.cuchara && lleno > 0) {
    const a = Math.sin(t * 1.3) * 0.08, bx = X0 + (cx + 3) * s, by = Y0 + (sup + 1.2) * s, ex = bx + Math.sin(0.45 + a) * 20 * s, ey = by - Math.cos(0.45 + a) * 20 * s;
    for (let d = -s; d <= s; d++) R.linea(bx + d, by, ex + d, ey, d < 0 ? F_MADERA[5] : d > 0 ? F_MADERA[2] : F_MADERA[4]);
    R.linea(bx - s - 1, by, ex - s - 1, ey, F_MADERA[0]); R.linea(bx + s + 1, by, ex + s + 1, ey, F_MADERA[0]);
    R.disco(ex, ey, s + 1, F_MADERA[0]); R.disco(ex - 0.5, ey - 0.5, s, F_MADERA[4]);
  }
  // el vapor: hilos ondulantes que suben y se deshacen
  if (lleno > 0.15 && o.t != null && o.vapor !== false) for (let k = 0; k < 4; k++) {
    const bx = X0 + (cx - 9 + k * 6) * s, L = (22 + k % 2 * 8) * s, y0 = Y0 + (sup + 0.5) * s;
    for (let d = 0; d < L; d++) {
      const u = d / L, yy = Math.round(y0 - d), xx = Math.round(bx + Math.sin(d * 0.16 - t * 2.2 + k * 1.7) * (1 + u * 3.5) * s);
      if ((d + Math.floor(t * 14)) % 5 === 0 || u > 1 - F_B4[(yy & 3) * 4 + (xx & 3)] * 0.9) continue;
      const c = u < 0.4 ? hex('#fbf6ec') : u < 0.7 ? hex('#e8e2d8') : hex('#cfc8be');
      R.pset(xx, yy, c); if (u < 0.6 && s > 1) R.pset(xx + 1, yy, c);
    }
  }
  if (o.t != null) f_motas(R, t, X0, Y0 - 10 * s, X0 + 42 * s, y - 4, 4);
  return { papilla: [px, py], borde: [Math.round(X0 + cx * s), Math.round(Y0 + (rY + ry) * s)], arriba: [x, Y0] };
}
// d_figuritas(R, x, y, o): EL CUENCO DE CLORITA con las tres figuritas de caliza (zorro sentado que enseña los dientes,
//   jabalí con colmillo y cerdas, buitre encorvado con el pico ganchudo): el cuenco verde oscuro pulido, con el brillo
//   que se desliza, el labio con su filo de luz, un friso tallado en espiga entre dos líneas, una grieta fina, rayones y
//   el pie anillado; las figuritas (talladas al píxel en los planos cercanos: ojos, dientes, colmillo, cerdas, plumas)
//   asoman del cuenco, cada una con su tono para que se separen. x, y: el CENTRO DE LA BASE del cuenco. A escala 1 el
//   cuenco mide unos 30 × 16 px y las figuritas 9–13 px (para que se lean, mejor o.escala 2). o.fuera 0–1: las saca
//   una a una (en arco por encima del borde) y las deja en el suelo: el zorro a la izquierda (x − 21·s), el jabalí
//   delante (x, y + 3.5·s) y el buitre a la derecha (x + 21·s). o.tierra true: el lecho de TIERRA ROJA del hueco
//   sellado bajo el cuenco, con terrones, piedrecitas y raicillas. o.t: el tiempo (el brillo del pulido que se desliza,
//   motas). o.sombra false: sin sombras. Respeta R.recorte. Devuelve { cuenco: [x, y] } (el centro del borde),
//   { figuras: [[x, y] × 3] } (lo alto de zorro, jabalí y buitre) y { arriba: [x, y] }.
export function d_figuritas(R, x, y, o = {}) {
  const s = Math.max(1, Math.round(o.escala ?? 1)), t = o.t ?? 0, fuera = Math.max(0, Math.min(1, o.fuera ?? 0));
  const w = 46, hh = 27, cx = 23, rY = 12, X0 = Math.round(x - cx * s), Y0 = Math.round(y - 26 * s);
  const fil = (J, c) => J === Math.floor(c * s);   // una línea tallada de un píxel en la fila lógica c
  if (o.tierra) {   // el lecho de tierra roja del hueco sellado: terrones, piedrecitas, raicillas y la tierra más oscura abajo
    f_fina(R, X0 - 4 * s, Y0 + 20 * s, 54, 8, s, (u, v, I, J) => {
      const top = 1 + ((u - 27) / 26) ** 2 * 6.5 + (h(Math.floor(u / 2), 0, 3) - 0.5) * 1.2;
      if (v < top) return null;
      const iu = Math.floor(u), iv = Math.floor(v);
      if (h(iu, iv, 12) > 0.93) return [F_CALIZA, 0.9, 0.5];                                  // piedrecitas de caliza
      if (Math.abs(v - (top + 2 + Math.sin(u * 0.7) * 0.8)) < 0.5 / s && h(Math.floor(u / 5), 0, 16) > 0.6) return [F_MADERA, 0.4, -0.5];   // raicillas
      const terron = h(Math.floor(u / 2), Math.floor(v / 2), 13) > 0.72;
      return [F_TIERRA, terron ? 0.75 : 0.2, 0.8 - (v - top) * 0.35 + (terron && h(I, J, 14) > 0.6 ? 0.6 : 0)];
    }, { contorno: F_TIERRA[0], semilla: 14 });
  }
  if (o.sombra !== false) f_sombra(R, x + 1 * s, y, 15 * s, 2 * s);
  const brillo = cx - 8 + Math.sin(t * 0.5) * 2;
  const cuenco = (parte) => f_fina(R, X0, Y0, w, hh, s, (u, v, I, J) => {
    const ext = f_E(u, v, cx, rY, 14, 3.2), int = f_E(u, v, cx, rY + 0.2, 11.5, 2.1);
    if (parte === 'atras') {
      if (int) return [F_CLORITA, 0.2, -2.4 + (v - rY + 2) * 0.3 + (f_E(u, v, cx + 4, rY + 1, 3, 0.6) ? 0.9 : 0)];   // el fondo, con un reflejo
      return ext && v < rY ? [F_CLORITA, 1.5, 1.6 - (u - cx) / 20 + (fil(J, rY - 2.9) && u > cx - 9 && u < cx + 3 ? 1.4 : 0)] : null;
    }
    if (int) return null;
    if (ext) return v >= rY ? [F_CLORITA, 1.5, 1.2 - (u - cx) / 20 + (fil(J, rY + 2.9) ? -0.8 : 0)] : null;
    if (v < rY) return null;
    const hw = 14 - ((v - rY) / 13) ** 2 * 6;
    if (Math.abs(u - cx) > hw || v > 25.6) return null;
    // el pie anillado: más estrecho y en sombra
    if (v > 23.6) return Math.abs(u - cx) > 9.5 ? null : [F_CLORITA, 0.9, -0.8 - (u - cx) / 14 + (fil(J, 24.6) ? -0.7 : 0)];
    const seg = Math.floor((u + 100) / 4) & 1, banda = v > 15.9 && v < 21 && (((seg ? u + v : u - v + 99) % 3) < 1 / s);
    const linea = fil(J, 15.4) || fil(J, 21.4);
    const grieta = Math.abs(u - (12.3 + (v - rY) * 0.35 + Math.sin(v * 1.3) * 0.4)) < 0.5 / s && v < 19.5;
    const rayon = s > 1 && h(Math.floor(u / 3), Math.floor(v), 18) > 0.93 && (I + J) % 3 === 0;
    let tn = 0.6 - (u - cx) / 14 * 1.5 - (v - rY) / 13 * 0.7;
    if (Math.abs(u - brillo) < 0.9 && v > 13 && v < 23.4 && !banda) tn += 2.4;        // el brillo del pulido
    else if (Math.abs(u - brillo - 2.2) < 0.4 && v > 14 && v < 22) tn += 1;
    if (rayon) tn += 0.8;
    return [F_CLORITA, banda || linea || grieta ? 0.3 : 1, tn + (grieta ? -0.8 : 0)];
  }, { contorno: hex('#0a100c'), semilla: 15 });
  // las tres figuritas: dónde están dentro y dónde acaban fuera (u, v de la base), y su recorrido en arco
  const figs = [[f_figZorro, 12, 13, 15.5, 15.2, 2, 26], [f_figJabali, 14, 9, 23, 15, 23, 29.5], [f_figBuitre, 11, 13, 30.5, 15.2, 44, 26]].map(([fn, mw, mh, ui, vi, uf, vf], k) => {
    const f = R.easeIO(Math.max(0, Math.min(1, fuera * 1.7 - k * 0.35)));
    return { fn, mw, mh, f, k, u: lerp(ui, uf, f), v: lerp(vi, vf, f) - Math.sin(Math.PI * f) * 10 };
  });
  const figura = ({ fn, mw, mh, u, v, f, k }) => {
    const dt = [0.3, -0.5, 0][k];
    const fx = Math.round(X0 + (u - mw / 2) * s), fy = Math.round(Y0 + (v - mh) * s);
    if (f > 0.97 && o.sombra !== false) f_sombra(R, fx + mw * s / 2 + s, fy + mh * s, mw * s * 0.55, 1.4 * s);
    f_fina(R, fx, fy, mw, mh, s, (a, b) => {
      const r = fn(a, b); if (!r) return null;
      return r[1] > 1.5 ? [F_CALIZA, r[0], r[1]] : [F_CALIZA, r[0], dt + 0.3 - b / mh * 0.6 + r[1]];
    }, { semilla: 20 + mh });
    return [Math.round(fx + mw * s / 2), fy];
  };
  cuenco('atras');
  const tops = [];
  for (const k of [1, 0, 2]) if (figs[k].f < 0.5) tops[k] = figura(figs[k]);   // el jabalí detrás
  cuenco('delante');
  for (const k of [0, 2, 1]) if (figs[k].f >= 0.5) tops[k] = figura(figs[k]);   // el jabalí delante
  if (o.t != null) f_motas(R, t, X0, Y0 - 8 * s, X0 + 46 * s, y - 4, 4);
  return { cuenco: [x, Math.round(Y0 + rY * s)], figuras: tops, arriba: [x, Math.round(Y0 + (rY - 13) * s)] };
}
// d_estatua(R, x, y, o): LA ESTATUA HUMANA de piedra de tamaño natural, TUMBADA BOCA ARRIBA, vista en tres cuartos
//   desde arriba (la cabeza a la izquierda): la cara al cielo con las cuencas de los ojos, las cejas, la nariz y la boca
//   talladas, y las orejas; el cuello, los hombros, los dos brazos en relieve por los costados que se doblan hasta
//   juntar las manos (con sus dedos) sobre el vientre, como en los pilares; el cinturón con su zigzag inciso, el
//   faldellín con pliegues, las dos piernas con las rodillas y los pies con los dedos; rota en dos sitios (el cuello y
//   los muslos, con la grieta llena de tierra y desconchones en los cantos: o.rota false la deja entera), con manchas de
//   liquen y el canto de arriba mellado. x, y: el CENTRO DE LA BASE (donde apoya). A escala 1, unos 51 × 16 px
//   (o.escala 1–3; en los planos cercanos se talla al píxel). o.dir −1: la cabeza a la derecha. o.destapada 0–1 (por
//   omisión 1): lo que no está destapado sigue cubierto por el barro y las piedras a hiladas del muro, y se destapa de
//   la cabeza a los pies; con o.t, en el borde cae polvo y terrones. o.sombra false: sin sombra. Respeta R.recorte.
//   Devuelve { cabeza: [x, y], pies: [x, y], borde: [x, y] } (el borde de lo destapado, donde trabaja el cepillo).
export function d_estatua(R, x, y, o = {}) {
  const s = Math.max(1, Math.round(o.escala ?? 1)), t = o.t ?? 0, w = 51, hh = 16, dir = o.dir === -1 ? -1 : 1;
  const des = Math.max(0, Math.min(1, o.destapada ?? 1)), corte = -1 + des * (w + 3), rota = o.rota !== false;
  const X0 = Math.round(x - 25.5 * s), Y0 = Math.round(y - hh * s), fino = 0.5 / s + 0.1;
  if (o.sombra !== false) f_sombra(R, x, y, 26 * s, 1.8 * s);
  f_fina(R, X0, Y0, w, hh, s, (uu, v, I, J) => {
    const u = dir > 0 ? uu : w - uu, iu = Math.floor(u), iv = Math.floor(v);
    // lo que sigue tapado: el barro y las piedras del muro, a hiladas
    if (u > corte) {
      const top = 2 + (h(Math.floor(u / 2), 1, 4) - 0.5) * 2 + Math.max(0, corte + 3 - u) * -0.6; if (v < top) return null;
      const fila = Math.floor((v + 1) / 4), off = (fila & 1) * 4, col = Math.floor((u + off) / 8), junta = (u + off) % 8 < 1 / s || (v + 1) % 4 < 1 / s;
      if (!junta && h(col, fila, 5) > 0.35) return [F_CALIZA, 1.5, -0.2 + (h(col, fila, 6) - 0.5) * 1.2 + (h(iu, iv, 7) > 0.88 ? -0.7 : 0)];
      return [F_TIERRA, junta ? 0.9 : 1.2, 0.6 - (v - top) * 0.12 + (u - corte < 1.5 ? 1 : 0) + (h(iu, iv, 8) > 0.9 ? 0.8 : 0)];
    }
    const av = Math.abs(v - 8);   // la estatua es simétrica respecto a su eje (v = 8)
    const E = (a, b, rx, ry) => f_E(u, v, a, b, rx, ry), Es = (a, b, rx, ry) => f_E(u, av, a, b, rx, ry), Cs = (a, b, c, d, r) => f_C(u, av, a, b, c, d, r);
    let z = 0, tono = 0, rp = F_CALIZA;
    if (E(5.2, 8, 4.3, 4.8)) {   // la cabeza: la frente a la izquierda, la barbilla hacia el cuello
      z = 1.8; tono = 0.2;
      if (Es(4.7, 1.55, 1.05, 0.8)) { z = 1.05; tono = -1.8; }                        // las cuencas de los ojos
      else if (Es(3.55, 1.6, 0.55, 1.45)) z = 2.05;                                     // las cejas
      else if (av < 0.75 && u > 4.4 && u < 7.3) { z = 2.35; tono = 0.3; }              // la nariz
      else if (av < 1.0 && Math.abs(u - 8.15) < fino) { z = 1.3; tono = -0.9; }        // la boca
      else if (u > 8.4) z = 1.6;                                                        // la barbilla
    } else if (Es(5.4, 4.6, 0.9, 1.2)) { z = 1.4; tono = -0.3; }   // las orejas
    else if (Cs(9.3, 0, 11.8, 0, 2.3) && u < 12) { z = 1.35; tono = -0.6; }                             // el cuello
    else if (Cs(12.8, 5.0, 21.2, 5.3, 1.55) || Cs(21.2, 5.3, 24.6, 1.9, 1.4)) {         // los brazos: arriba y el antebrazo
      z = 2.5; tono = 0.5; if (Es(21.2, 5.3, 1.0, 1.0)) z = 2.65;                       // el codo
    } else if (Es(25.6, 1.25, 1.65, 1.3)) {                                             // las manos sobre el vientre, con los dedos
      z = 2.45; tono = 0.5; if (u > 24.4 && ((u - 24.4) % 0.9) < 0.3) { z = 1.9; tono = -0.6; }
    } else if (u > 27.2 && u < 29.3 && av < 5.0) {                                      // el cinturón con su zigzag
      z = 1.9; tono = 0.1; const zz = 27.5 + Math.abs(((v / 1.6) % 2) - 1) * 1.5; if (Math.abs(u - zz) < fino) { z = 1.5; tono = -0.5; }
    } else if (E(31.5, 8, 2.8, 3.4) && u > 29.2) { z = 1.7; tono = -0.3; if (((v * 0.8) % 1) < 0.22) { z = 1.45; tono = -1; } }   // el faldellín plisado
    else if (Es(13.4, 0, 2.6, 5.9) || (u > 13.4 && u < 30.4 && av < 5.9 - (u - 13.4) * 0.06)) {   // el pecho y el vientre
      z = 1.2; tono = -0.9; if (Math.abs(u - (17.2 + av * av * 0.09)) < fino && av < 3.6) { z = 1.0; tono = -1.6; }   // el pectoral
    } else if (Es(47.7, 2.4, 1.9, 2.3)) { z = 2.0; if (u > 48.4 && ((av * 2.2) % 1) < 0.3) z = 1.6; }   // los pies y sus dedos
    else if (Cs(32, 2.6, 45.6, 2.2, 2.45)) {                                            // las piernas, con las rodillas
      z = 1.35; tono = -0.4; if (Es(38.8, 2.5, 1.9, 2.2)) { z = 1.65; tono = 0.2; } if (av < 0.45) { z = 0.85; tono = -1.4; }
    }
    if (!z) return null;
    // las roturas: el cuello y los muslos, una grieta quebrada llena de tierra y el canto desconchado a su lado
    if (rota) for (const [b, k] of [[11, 7], [36.2, 9]]) {
      const pos = b + (h(k, Math.floor(v * 1.5), 7) - 0.5) * 1.3;
      if (Math.abs(u - pos) < fino) return [F_TIERRA, 0.1, -2.6];
      if (Math.abs(u - pos) < 1.4 && av > 4.2 - (b > 20 ? 2.6 : 0) && h(k, Math.floor(v), 11) > 0.45) return null;
    }
    if (v < 4.6 && h(iu, iv, 8) > 0.9) return null;                                     // desconchones del canto de arriba
    if (h(Math.floor(u / 2.5), Math.floor(v / 2.5), 31) > 0.93 && h(I, J, 32) > 0.5 && z < 2.1) rp = F_LIQUEN;   // el liquen
    if (z < 1.2 && tono > -1 && h(iu, iv, 33) > 0.55) { rp = F_TIERRA; tono -= 0.6; }   // tierra metida en las tallas
    return [rp, z, tono + 0.2 - (v - 4) * 0.12 + (h(Math.floor(u / 4), 0, 9) - 0.5) * 0.6];
  }, { semilla: 22 });
  const sx = (u) => Math.round(X0 + (dir > 0 ? u : w - u) * s);
  // el polvo y los terrones que caen del borde de lo que se destapa
  if (o.t != null && des > 0 && des < 1) for (let k = 0; k < 6; k++) {
    const u = ((t * 0.7 + k / 6) % 1), px = sx(corte) + Math.round((h(k, 3) - 0.5) * 4 * s), py = Math.round(Y0 + (2 + u * 11) * s);
    if (py < y) f_rect(R, px, py, px + (k % 3 ? 0 : s - 1), py + (k % 3 ? 0 : s - 1), k % 3 ? hex('#d8b890') : F_TIERRA[3]);
  }
  if (o.t != null) f_motas(R, t, X0, Y0 - 12 * s, X0 + w * s, y - 3, 5);
  return { cabeza: [sx(5), Math.round(Y0 + 3 * s)], pies: [sx(47.5), Math.round(Y0 + 3 * s)], borde: [sx(Math.max(0, Math.min(w, corte))), Math.round(Y0 + 4 * s)] };
}
// d_leopardo(R, x, y, o): LA FIGURA SENTADA SOBRE UN LEOPARDO (Karahan Tepe, 2026), en caliza: el leopardo agazapado de
//   perfil (mirando a la derecha) con las orejas redondas (con su hueco), el ojo almendrado, el hocico con la nariz, la
//   boca y los puntos de los bigotes, las patas con los dedos, la cola enroscada por el suelo con sus anillas y las
//   ROSETAS talladas (anillos abiertos) por el lomo, el hombro y el anca; encima, una persona sentada a horcajadas, de
//   perfil y en un tono más claro, con la cinta en la cabeza, el ojo, la nariz, la boca y la oreja, el pelo recogido
//   detrás, el cinturón, la mano (con sus dedos) agarrada al cuello del leopardo y la pierna que cuelga por su costado;
//   todo sobre una peana de roca con marcas de cincel y una grieta (o.peana false la quita), con algo de liquen.
//   x, y: el CENTRO DE LA BASE. A escala 1, unos 38 × 42 px (o.escala 1–3; en los planos cercanos se talla al píxel).
//   o.dir −1: mirando a la izquierda. o.manchas false: sin rosetas. o.t: motas de polvo en la luz. o.sombra false: sin
//   sombra. Respeta R.recorte. Devuelve { cabeza: [x, y] } (lo alto de la cabeza de la persona), { leopardo: [x, y] }
//   (la cabeza del leopardo) y { arriba: [x, y] }.
export function d_leopardo(R, x, y, o = {}) {
  const s = Math.max(1, Math.round(o.escala ?? 1)), t = o.t ?? 0, w = 38, hh = 42, dir = o.dir === -1 ? -1 : 1, peana = o.peana !== false;
  const X0 = Math.round(x - 19 * s), Y0 = Math.round(y - (peana ? hh : hh - 4) * s), fino = 0.5 / s + 0.1;
  if (o.sombra !== false) f_sombra(R, x + 2 * s, y, 21 * s, 2.2 * s);
  f_fina(R, X0, Y0, w, peana ? hh : hh - 4, s, (uu, v, I, J) => {
    const u = dir > 0 ? uu : w - uu, iu = Math.floor(u), iv = Math.floor(v);
    const E = (a, b, rx, ry) => f_E(u, v, a, b, rx, ry), Cp = (a, b, c, d, r) => f_C(u, v, a, b, c, d, r);
    const top = 0.03 * (20 - v), liq = h(Math.floor(u / 3), Math.floor(v / 3), 41) > 0.95 && h(I, J, 42) > 0.45 ? F_LIQUEN : F_CALIZA;
    // la persona (más clara que el leopardo, para que se separen)
    const P = (z, tn = 0) => [liq, z, top + 0.75 + tn];
    if (E(18.1, 5.3, 0.95, 0.7)) return P(1.5, -3.4);                                     // el ojo
    if (E(20.1, 6.6, 0.95, 1.25)) return P(2.6, 0.2);                                       // la nariz
    if (E(16, 6, 3.9, 4.3)) {
      if (Math.abs(v - 3.5) < 0.6) return P((u * 1.2) % 1 < 0.25 ? 2.1 : 2.45, 0.3);        // la cinta
      if (u > 18.4 && u < 19.8 && Math.abs(v - 8.4) < fino) return P(1.6, -0.9);             // la boca
      const de = Math.hypot((u - 15.1) / 1.0, (v - 6.6) / 1.3); if (de < 1) return P(de > 0.55 ? 1.8 : 2.1, -0.3);   // la oreja
      if (u < 13.6 && v > 3.5) return P((v * 1.4) % 1 < 0.3 ? 1.75 : 2.0, -0.2);             // el pelo recogido
      return P(2.0, 0.1);
    }
    if (E(25.6, 21.5, 1.8, 1.5)) return P(u > 24.6 && ((u - 24.6) % 0.85) < 0.28 ? 2.3 : 2.7, 0.2);   // la mano con los dedos
    if (Cp(17.6, 13.6, 20.1, 18.4, 1.45) || Cp(20.1, 18.4, 25, 21, 1.3)) return P(2.6, Cp(17.6, 13.6, 20.1, 18.4, 0.5) ? 0.3 : 0);
    if (E(22.6, 33, 2.4, 1.2)) return P(u > 23.6 && ((u - 23.6) % 0.8) < 0.28 ? 2.0 : 2.3, -0.1);   // el pie
    if (E(22, 25.5, 1.6, 1.6)) return P(2.55, 0.2);                                          // la rodilla
    if (E(15.5, 23.6, 4, 2.2) || Cp(16, 23.6, 22, 25.6, 2.5) || Cp(22, 25.6, 21.6, 32, 1.8)) return P(2.4, 0);
    if (Cp(16, 9.6, 16.4, 12, 1.8)) return P(1.9, -0.2);                                     // el cuello
    if (Cp(15.5, 13, 16, 22.5, 3.9) || E(16, 13.5, 4, 2.5)) {                                // el torso y el cinturón
      if (Math.abs(v - 21.4) < 0.55) return P(2.25, 0.2);
      if (Math.abs(v - 22.1) < fino) return P(1.7, -0.6);
      return P(2.0, -(u - 16) * 0.08);
    }
    // el leopardo
    const L = (z, tn = 0) => [liq, z, top - 0.35 + tn + (v > 34 ? -0.4 : 0)];
    if (E(32.7, 21.4, 1.1, 0.75)) return L(0.45, E(33.0, 21.3, 0.35, 0.35) ? 0.4 : -3.2);   // el ojo almendrado
    if (E(37.0, 23.3, 0.85, 0.7)) return L(1.6, -1.6);                                        // la nariz
    if (u > 33.2 && u < 37.2 && Math.abs(v - (25.7 - (u - 33) * 0.08)) < fino) return L(0.6, -2.4);   // la boca
    if (E(28.5, 18.7, 1.55, 1.65) || E(32.7, 18.4, 1.55, 1.65)) return L(E(28.6, 18.9, 0.7, 0.8) || E(32.8, 18.6, 0.7, 0.8) ? 0.55 : 1.1, 0);   // las orejas
    if (E(34.9, 24.3, 2.3, 1.9)) return L(1.25, (u > 34 && h(iu, iv, 43) > 0.8 && Math.abs(v - 24.6) < 0.9) ? -2 : 0.2);   // el hocico y los bigotes
    if (E(31, 22.5, 4.3, 3.9)) return L(Math.abs(v - 20.4 + (u - 31) * 0.05) < fino && u > 31.4 ? 0.85 : 1, 0);   // la cabeza y la ceja
    // las patas y la cola
    const pata = Cp(24.8, 32, 25.2, 37, 1.75) || Cp(28.6, 32, 29.4, 37, 1.55) || E(26.6, 37.3, 2.6, 1.15) || E(31, 37.3, 2.3, 1.1) || E(13.6, 37.3, 3.1, 1.1);
    if (pata) return L(v > 36.4 && (u % 1.1) < 0.32 ? 0.7 : 1, v > 36.4 ? -0.2 : 0);       // con los dedos
    if (Cp(3, 30, 1.5, 36, 1.2) || Cp(1.5, 36, 7, 37.3, 1.1) || Cp(7, 37.3, 8.6, 35.5, 0.9)) return L(1.1, ((u + v) % 2.2) < 0.55 ? -0.9 : 0);   // la cola con anillas
    let z = 0;
    if (E(25, 29.4, 4.4, 5.4) || E(7.3, 29.2, 5.2, 6)) z = 1.3;                              // el hombro y el anca
    else if (Cp(26.2, 27, 29.5, 24.5, 3.3)) z = 1.15;                                         // el cuello
    else if (E(16, 29.8, 12, 4.8) || E(17, 34, 10, 3.4) || E(9, 33.8, 5, 3.2)) z = 1;         // el cuerpo
    if (z) {
      if (o.manchas !== false && v < 35) {   // las rosetas: anillos abiertos con el centro algo más oscuro
        const fy = Math.round(v / 3.6), fx = Math.round((u - (fy & 1) * 2.4) / 4.8), qx = fx * 4.8 + (fy & 1) * 2.4 + (h(fx, fy, 3) - 0.5) * 0.9, qy = fy * 3.6 + (h(fx, fy, 4) - 0.5) * 0.6;
        const d = Math.hypot(u - qx, v - qy), ang = Math.atan2(v - qy, u - qx);
        if (d > 0.6 && d < 1.3 && Math.cos(ang * 2 + h(fx, fy, 5) * 6) < 0.75) return L(z - 0.5, -2.1);
        if (d <= 0.6) return L(z, -0.8);
      }
      if (z === 1.3 && Math.abs(Math.hypot((u - 7.3) / 5.2, (v - 29.2) / 6) - 0.9) < 0.05) return L(1.05, -0.5);   // el pliegue del anca
      return L(z);
    }
    // la peana de roca, con marcas de cincel y una grieta
    if (peana && v >= 38 && u > 0.5 + h(0, iv, 2) * 2 && u < 37 - h(1, iv, 2) * 2) {
      const grieta = Math.abs(u - (27 + (v - 38) * 0.8 + Math.sin(v * 2) * 0.3)) < fino;
      const cincel = ((I * 2 + J) % (4 + s)) === 0 && h(I >> 1, J >> 1, 6) > 0.5;
      return [liq, grieta ? 0.1 : 0.4, -0.7 - (v - 38) * 0.3 + (h(Math.floor(u / 4), iv, 5) - 0.5) * 0.6 + (cincel ? -0.45 : 0) + (grieta ? -0.8 : 0)];
    }
    return null;
  }, { semilla: 30 });
  const sx = (u) => Math.round(X0 + (dir > 0 ? u : w - u) * s);
  if (o.t != null) f_motas(R, t, X0 - 6 * s, Y0, X0 + 44 * s, y - 4, 6);
  return { cabeza: [sx(16), Math.round(Y0 + 1.6 * s)], leopardo: [sx(31.5), Math.round(Y0 + 19 * s)], arriba: [x, Y0] };
}
// d_relieve(R, x, y, o): EL RELIEVE DE SAYBURÇ en su pared de roca: un panel de caliza con el canto irregular y mellado,
//   las marcas del cincel en diagonal, dos grietas, chorreones oscuros de agua que bajan desde arriba y manchas de
//   liquen; tallados en relieve (con el surco que los rodea y su sombra abajo a la derecha): a la IZQUIERDA un hombre de
//   frente (ojos, nariz, boca, dedos sobre el vientre, cinturón y faldellín plisado) entre DOS LEOPARDOS que le miran,
//   con la cola levantada, el ojo, la boca, las zarpas y las rosetas; a la DERECHA otro hombre de perfil, con el brazo
//   en alto, frente a un TORO que baja los cuernos (anillados), con el ojo, el hollar, la papada y las pezuñas partidas;
//   un faldellín en los dos hombres (sin nada explícito). x, y: el CENTRO DE LA BASE del panel. A escala 1, unos
//   124 × 48 px (o.escala 1–2; a 2 llena el ancho y se talla al píxel). o.linterna: una luz que barre el panel en una
//   sala a oscuras (0–1: dónde está, de izquierda a derecha; true con o.t: va y viene sola); sin ella, el panel a luz
//   pareja. o.destaca: 'hombre' | 'leopardos' | 'toro' | 'cazador' | 'izquierda' | 'derecha': unas esquinas doradas
//   que laten (con o.t) alrededor de ese grupo. o.t: el tiempo (motas en la luz). Respeta R.recorte.
//   Devuelve { hombre: [x, y] } (la cabeza del de en medio), { leopardos: [[x, y], [x, y]] }, { cazador: [x, y] },
//   { toro: [x, y] } (las cabezas) y { arriba: [x, y] }.
export function d_relieve(R, x, y, o = {}) {
  const s = Math.max(1, Math.round(o.escala ?? 1)), t = o.t ?? 0, w = 124, hh = 48;
  const X0 = Math.round(x - 62 * s), Y0 = Math.round(y - hh * s), W = w * s, HH = hh * s, fino = 0.5 / s + 0.1;
  // las figuras: un mapa de alturas a la resolución de la pantalla (0 fuera), y el surco de alrededor
  const G = new Float32Array(W * HH);
  const pon = (ox, oy, fw, fh, f, espejo = false) => {
    for (let J = oy * s; J < (oy + fh) * s; J++) for (let I = ox * s; I < (ox + fw) * s; I++) {
      const a = (I + 0.5) / s - ox, b = (J + 0.5) / s - oy, z = f(espejo ? fw - a : a, b);
      if (z) G[J * W + I] = Math.max(G[J * W + I], z);
    }
  };
  pon(4, 28, 27, 16, f_leoRel);
  pon(31, 10, 15, 34, f_hombreRel);
  pon(46, 28, 27, 16, f_leoRel, true);
  pon(80, 10, 13, 34, f_cazadorRel);
  pon(90, 22, 32, 22, f_toroRel);
  let lx = null;
  if (o.linterna != null && o.linterna !== false) lx = o.linterna === true ? 62 + Math.sin(t * 0.5) * 50 : 4 + o.linterna * 116;
  if (o.sombra !== false) f_sombra(R, x, y, 64 * s, 2 * s, 0.7);
  f_fina(R, X0, Y0, w, hh, s, (u, v, I, J) => {
    if (v < 1 + h(Math.floor(u / 4), 0, 2) * 2.5 || u < 1 + h(0, Math.floor(v / 4), 3) * 2 || u > w - 1 - h(1, Math.floor(v / 4), 3) * 2 || v > 47) return null;
    const luz = lx == null ? 0 : 1.3 * Math.exp(-(((u - lx) / 16) ** 2) - (((v - 26) / 30) ** 2)) - 0.9;
    const z = G[J * W + I];
    if (z) return [F_CALIZA, z, 1 + luz + (z > 2.2 ? 0.3 : 0)];
    let surco = false;
    for (const [a, b] of [[-s, 0], [s, 0], [0, -s], [0, s], [-s, -s], [s, -s], [-s, s], [s, s]]) {
      const ii = I + a, jj = J + b; if (ii >= 0 && ii < W && jj >= 0 && jj < HH && G[jj * W + ii] > 0) { surco = true; break; }
    }
    if (surco) return [F_CALIZA, -0.6, -1.3 + luz];
    // el fondo: las marcas del cincel en diagonal, dos grietas, chorreones, liquen y la línea del suelo tallada
    const cincel = ((I * 2 + J) % (4 + s)) === 0 && h(I >> 1, J >> 1, 4) > 0.45;
    const grieta = (Math.abs(u - (108 - v * 0.6 + Math.sin(v * 0.5) * 2)) < fino && v < 22) || (Math.abs(u - (15 + v * 0.35 + Math.sin(v * 0.9) * 0.8)) < fino && v > 2 && v < 13);
    if (v > 44 && v < 45 && u > 3 && u < w - 3) return [F_CALIZA, -0.4, -0.6 + luz];
    let rp = F_CALIZA, tn = -0.6 + luz + (cincel ? -0.35 : 0) - (v > 44 ? 0.5 : 0);
    for (const [cx0, L] of [[22, 20], [58, 9], [74, 26], [118, 16]]) if (Math.abs(u - cx0 - Math.sin(v * 0.35 + cx0) * 0.8) < 0.9 && v < L) tn -= 0.35 * (1 - v / L);   // los chorreones de agua
    if (h(Math.floor(u / 3), Math.floor(v / 3), 44) > 0.88 && (v < 12 || u < 8 || u > 116 || v > 40) && h(I, J, 45) > 0.3) rp = F_LIQUEN;
    return [rp, grieta ? -0.8 : 0, tn + (grieta ? -0.4 : 0)];
  }, { semilla: 40 });
  const P = (u, v) => [Math.round(X0 + u * s), Math.round(Y0 + v * s)];
  // las esquinas doradas del grupo que se destaca
  const grupos = { hombre: [30, 8, 47, 45], leopardos: [2, 26, 75, 45], izquierda: [2, 8, 75, 45], cazador: [78, 8, 94, 45], toro: [89, 20, 123, 45], derecha: [78, 8, 123, 45] };
  const gr = grupos[o.destaca];
  if (gr) {
    const [a, b] = P(gr[0], gr[1]), [c, d] = P(gr[2], gr[3]), late = o.t != null ? Math.round((Math.sin(t * 5) + 1) * 1.2) : 1, L = 6 + 2 * s, col = hex('#ffd860'), col2 = hex('#a07818');
    for (const [qx, qy, sx, sy] of [[a - late, b - late, 1, 1], [c + late, b - late, -1, 1], [a - late, d + late, 1, -1], [c + late, d + late, -1, -1]]) {
      R.linea(qx + sx, qy + sy, qx + sx * L + sx, qy + sy, col2); R.linea(qx + sx, qy + sy, qx + sx, qy + sy * L + sy, col2);
      R.linea(qx, qy, qx + sx * L, qy, col); R.linea(qx, qy, qx, qy + sy * L, col);
    }
  }
  if (o.t != null) f_motas(R, t, lx == null ? X0 : X0 + (lx - 16) * s, Y0 + 4 * s, lx == null ? X0 + w * s : X0 + (lx + 16) * s, y - 6 * s, lx == null ? 5 : 8, hex('#fff0c8'));
  return { hombre: P(38, 10), leopardos: [P(28, 30), P(49, 30)], cazador: P(86, 10), toro: P(95, 30), arriba: [x, Y0] };
}
// pausa(R, x, y, t, o): los objetos de las pausas (la lista de o.cual y sus opciones, en la cabecera de arriba).
//   Respeta R.recorte: lo que la rejilla pinta con R.rect pasa por pset.
export function pausa(R, x, y, t, o = {}) {
  R = f_conRecorte(R);
  const s = o.s ?? 2, G = g_grilla(R, Math.round(x), Math.round(y), s), cual = o.cual || 'troncos';
  if (cual === 'reloj') return g_reloj(R, G, t, o, x, y, s);
  if (cual === 'banquete') return g_banquete(R, G, t, o, x, y, s);
  if (cual === 'nube') return g_nube(R, G, t, o, x, y, s);
  if (cual === 'balanza') return g_balanza(R, G, t, o, x, y, s);
  return g_troncos(R, G, t, o, x, y, s);
}
// la paleta de la colina: el cielo de verano de Anatolia (azul que se blanquea hacia la calima), las nubes, la sierra,
// el moral, las piedras de caliza, el camino, la membrana de la cubierta, los vehículos y la ropa de la gente pequeña
const AP = pal({
  c0: '#4a86c8', c1: '#5b95d2', c2: '#70a5da', c3: '#88b5e0', c4: '#a2c4e4', c5: '#bdd3e4', c6: '#d4dee0', c7: '#e4e4d8',
  n0: '#9eb6d0', n1: '#d2deea', n2: '#f8fafa', nS: '#8aa2bc',
  sol: '#fff4c8', solL: '#fffdf0', halo: '#e6ead6',
  s0: '#b2bccb', s1: '#9aa6b8', s2: '#8592a8', s3: '#c8ccd2', bruma: '#d6d6cc',
  h0: '#24442a', h1: '#305a30', h2: '#43733a', h3: '#5e8e48', h4: '#82ac58',
  tr: '#5c4232', trS: '#3a281e', trL: '#7e604a', sombra: '#5a4030',
  p0: '#6a665e', p1: '#8e887c', p2: '#b0aa9a', p3: '#d0cab8', p4: '#ece6d4',
  camino: '#c6a87e', caminoS: '#a88a62', caminoL: '#dcc49c', asfalto: '#7a7672', asfaltoL: '#9a9690',
  mem: '#f6f6f2', memM: '#e2e2de', memS: '#c4c6c8', memD: '#a4a8b0', mastil: '#6e727a', tirante: '#9a9ea6', bajo: '#4e463e',
  jeep: '#6a7048', jeepL: '#8a9060', jeepS: '#4a5032', lona: '#b4a478', lonaS: '#8e8058', rueda: '#242222', llanta: '#8a8a86',
  rojo: '#c8402e', rojoS: '#902a1e', rojoL: '#e86a4a', bus: '#ecece6', busS: '#b8bcc0', cristal: '#3a5068', cristalL: '#7aa0c0',
  oveja: '#ece6d8', ovejaS: '#bab2a0', perro: '#4a3a2c', ceniza: '#b8b4ac', cenizaL: '#d4d0c8', barro: '#7a5236', barroL: '#9a6a46',
  madera: '#9a7048', maderaS: '#6e4c30', maderaL: '#c09468', azul: '#3a6ec0', azulS: '#2a508e', azulL: '#6a9ae0',
  naranja: '#e07a2a', verdeC: '#3a8a5a', negro: '#26242a', blanco: '#f4f2ea', piel: '#c8946a', pielS: '#9a6a48',
});

// los campos por estación: [sombra, cuerpo, luz] de cada clase de parcela
const A_CAMPOS = Object.fromEntries(Object.entries({
  verano: { rastrojo: ['#b4924c', '#d0ac62', '#e8cc88'], arado: ['#86503a', '#a2663e', '#ba7e56'], barbecho: ['#a49666', '#bcac78', '#d2c492'], verde: ['#5a7a3a', '#729246', '#8eaa58'] },
  primavera: { rastrojo: ['#5a8634', '#729e40', '#92b856'], arado: ['#86503a', '#a2663e', '#ba7e56'], barbecho: ['#7a964a', '#94ac58', '#b0c06e'], verde: ['#467630', '#5a8c38', '#76a64a'] },
  otono: { rastrojo: ['#a48a58', '#bea26e', '#d4bc88'], arado: ['#70402a', '#8a5234', '#a46842'], barbecho: ['#968660', '#ae9e72', '#c4b488'], verde: ['#66863f', '#7e9c50', '#98b064'] },
}).map(([k, v]) => [k, Object.fromEntries(Object.entries(v).map(([q, c]) => [q, c.map(hex)]))]));

const A_PESOS = { verano: [['rastrojo', 0.42], ['arado', 0.26], ['barbecho', 0.22], ['verde', 0.1]], primavera: [['rastrojo', 0.44], ['verde', 0.2], ['arado', 0.14], ['barbecho', 0.22]], otono: [['arado', 0.5], ['rastrojo', 0.24], ['barbecho', 0.16], ['verde', 0.1]] };

// la estepa de primer término y de la falda por estación: [sombra, cuerpo, luz, brizna]
const A_ESTEPA = Object.fromEntries(Object.entries({ verano: ['#a08a52', '#c2aa6e', '#d8c48c', '#8a7442'], primavera: ['#6a8c3e', '#86a44c', '#a2bc62', '#557a32'], otono: ['#9a865a', '#b4a06e', '#ccb88a', '#7e6c48'] }).map(([k, v]) => [k, v.map(hex)]));

const A_CIELO = [AP.c0, AP.c1, AP.c2, AP.c3, AP.c4, AP.c5, AP.c6, AP.c7];

const a_est = (o) => (o.estacion === 'primavera' || o.estacion === 'otono' ? o.estacion : 'verano');

const a_lim = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

// trama ordenada 4 × 4 (umbral 0–1): para fundir dos colores sin franjas
const A_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const a_U = (x, y) => (A_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla dos colores empaquetados, canal a canal (a = 0: c1; a = 1: c2)
function a_mezcla(c1, c2, a) { const m = (s) => Math.round(((c1 >>> s) & 255) * (1 - a) + ((c2 >>> s) & 255) * a); return (0xff000000 | (m(16) << 16) | (m(8) << 8) | m(0)) >>> 0; }

// elige en una rampa de colores con trama (l 0–1)
const a_rampa = (P, l, x, y) => P[Math.max(0, Math.min(P.length - 1, Math.floor(l * (P.length - 0.01) + a_U(x, y) - 0.5)))];

// los búferes de lo fijo (uno por clave) y lo que la capa devuelve (máscara del cielo, puntos de las hojas…)
const A_CAPAS = new Map();

function a_capa(R, clave, dibuja) {
  let c = A_CAPAS.get(clave);
  if (!c) { const b = R.nuevo(), prev = R.usar(b); const info = dibuja(b); R.usar(prev); c = { b, info }; A_CAPAS.set(clave, c); }
  R.copiar(c.b); return c.info;
}

// el cielo tramado de y0 a y1 con vetas horizontales suaves (sin franjas lisas)
function a_cieloGrad(B, y0, y1, P) {
  const n = P.length - 1;
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) for (let x = 0; x < 320; x++) {
    const f = (y - y0) / (y1 - y0) * n + (h(x >> 4, y >> 1, 401) - 0.5) * 0.35 + Math.sin(x * 0.03 + y * 0.4) * 0.08;
    B[y * 320 + x] = P[Math.max(0, Math.min(n, Math.floor(f + a_U(x, y) - 0.5)))];
  }
}

// el sol con su halo tramado
function a_sol(R, cx, cy, r = 6) {
  for (let y = cy - r * 3; y <= cy + r * 3; y++) for (let x = cx - r * 3; x <= cx + r * 3; x++) {
    const d = Math.hypot(x - cx, y - cy); if (d > r * 3) continue;
    if (d <= r) R.pset(x, y, d < r * 0.55 ? AP.solL : AP.sol); else if (a_U(x, y) < (1 - (d - r) / (r * 2)) * 0.8) R.pset(x, y, d < r * 1.8 ? AP.solL : AP.halo);
  }
}

// la sierra lejana en dos planos, con crestas iluminadas y la calima al pie (hor: donde acaba)
function a_sierra(R, hor, sem) {
  for (let x = 0; x < 320; x++) {
    const y1 = Math.round(hor - 9 - 3 * Math.sin(x * 0.021 + sem) - 2 * Math.sin(x * 0.067 + 2 * sem) - h(x >> 3, 1, sem) * 2);
    const y2 = Math.round(hor - 5 - 2.5 * Math.sin(x * 0.035 + 1 + sem) - 1.5 * Math.sin(x * 0.11 + sem) - h(x >> 2, 2, sem) * 1.5);
    for (let y = y1; y < hor; y++) { const lejos = y < y2; let c = lejos ? (y === y1 ? AP.s3 : AP.s0) : (y === y2 ? AP.s0 : (h(x >> 1, y, 77) < 0.25 ? AP.s2 : AP.s1));
      if (y > hor - 3 && a_U(x, y) < (y - hor + 3) / 3) c = AP.bruma; R.pset(x, y, c); }
  }
}

// un pueblo pequeño en el horizonte: casas de techo plano, una con su alminar
function a_pueblo(R, x0, hor) {
  for (let k = 0; k < 9; k++) { const x = x0 + Math.round(h(k, 1, 41) * 44), w = 3 + Math.round(h(k, 2, 41) * 3), a = 2 + Math.round(h(k, 3, 41) * 2);
    R.rect(x, hor - a, x + w, hor, AP.p3); R.rect(x + w, hor - a, x + w, hor, AP.p2); R.pset(x + 1, hor - 1, AP.p0); }
  R.rect(x0 + 24, hor - 11, x0 + 24, hor - 3, AP.p4); R.pset(x0 + 25, hor - 10, AP.p2); R.pset(x0 + 24, hor - 12, AP.p1); R.rect(x0 + 23, hor - 8, x0 + 25, hor - 8, AP.p2);
}

// los campos en perspectiva de y0 a y1 (punto de fuga x 160, hor − 5): parcelas por filas con surcos que convergen,
// lindes, muretes de piedra, caminos entre filas y la calima que aclara lo lejano
function a_campos(B, hor, y0, y1, est, sem) {
  const CP = A_CAMPOS[est], PS = A_PESOS[est];
  for (let y = y0; y < y1; y++) {
    const d = y - hor + 5, fila = Math.floor(Math.log(d) * 4.2), filaA = Math.floor(Math.log(d - 1) * 4.2), bru = a_lim(1 - (d - 5) / 46) * 0.6;
    const pw = 2.6 + h(fila, 1, sem) * 4.2, off = h(fila, 2, sem) * 30;
    for (let x = 0; x < 320; x++) {
      const X = (x - 160) / d + off, pi = Math.floor(X / pw), fr = X / pw - pi;
      let q = h(fila, pi, 3 + sem), kind = PS[PS.length - 1][0]; for (const [k, p] of PS) { if (q < p) { kind = k; break; } q -= p; }
      const P = CP[kind], conv = h(fila, pi, 4 + sem) < 0.6;
      let c;
      const borde = fr * pw * d < 1 || (1 - fr) * pw * d < 0.6;
      if (fila !== filaA && h(fila, 5, sem) < 0.35) c = h(x, y, 6) < 0.3 ? AP.caminoS : AP.camino;
      else if (borde) c = h(fila, pi, 7 + sem) < 0.35 ? (h(x >> 1, y, 8) < 0.5 ? AP.p3 : AP.p1) : P[0];
      else {
        const sur = conv ? Math.floor(fr * (6 + d * 0.12)) : Math.floor(Math.log(d) * 26), l = (sur & 1 ? 0.35 : 0.65) + (h(x >> 1, y, 9) - 0.5) * 0.5 + (kind === 'arado' ? 0 : (h(x, y, 10) < 0.08 ? 0.4 : 0));
        c = a_rampa(P, l, x, y);
        if (est === 'primavera' && kind === 'verde' && h(x, y, 11) < 0.012 * (d / 20)) c = hex('#d83a2a');   // amapolas
      }
      if (bru > 0) c = a_U(x, y) < bru ? a_mezcla(c, AP.bruma, 0.55) : c;
      B[y * 320 + x] = c;
    }
  }
}

// pistacheros sueltos y en hilera por la llanura, más pequeños cuanto más lejos
function a_arbolitos(R, hor, y1, sem) {
  for (let k = 0; k < 46; k++) { const d = 6 + h(k, 1, sem) ** 1.6 * (y1 - hor), y = Math.round(hor - 5 + d), x = Math.round(h(k, 2, sem) * 330 - 5), r = 0.6 + d * 0.035;
    R.disco(x + 0.5, y - r + 0.5, r, AP.h1); if (r > 1.2) { R.pset(x + 1, y - Math.round(r * 1.4), AP.h3); R.pset(x - 1, y, AP.sombra); R.pset(x - 2, y, AP.sombra); } }
}

// una piedra de caliza suelta (cuerpo, luz arriba a la derecha y sombra a la izquierda)
function a_piedra(R, x, y, w, a, sem) {
  R.poligono([[x - w / 2, y], [x - w / 2 + 1, y - a + 1], [x - w / 4, y - a], [x + w / 3, y - a], [x + w / 2, y - a + 2], [x + w / 2, y]], (px, py) => (py <= y - a + 1 ? AP.p4 : px > x + w / 4 ? AP.p3 : h(px, py, sem) < 0.2 ? AP.p1 : AP.p2));
  R.linea(x - w / 2 - 2, y, x + w / 2 - 1, y, AP.sombra); R.pset(x - w / 2, y - 1, AP.p1);
}

// una losa de caliza rota tumbada: la cara de arriba clara, el canto en sombra, una grieta y algún liquen
function a_losa(R, x, y, w, sem) {
  const a = Math.max(2, Math.round(w * 0.3)), k = Math.round((h(sem, 1, 50) - 0.5) * 2);
  R.poligono([[x, y - a + k], [x + w * 0.4, y - a - 1], [x + w, y - a + 1 - k], [x + w - 1, y - 1], [x + 1, y - 1]], (px, py) => (py < y - a + 1 ? C.calizaL : h(px, py, sem) < 0.12 ? C.veta : C.caliza));
  R.rect(x + 1, y - 1, x + w - 1, y, C.calizaS); R.linea(x - 1, y + 1, x + w - 2, y + 1, AP.sombra);
  if (w > 5) { R.linea(x + Math.round(w * 0.55), y - a, x + Math.round(w * 0.45), y - 1, C.calizaS); R.pset(x + 2, y - a + 1, hex('#c8b860')); }
}

// el moral: tronco con ramas y una copa de grumos de hojas con luz a la derecha; deja en hojas[] los puntos del borde
// que tiemblan con el viento
function a_moral(R, cx, base, rx, ry, sem, hojas) {
  const cy = base - ry - Math.round(ry * 0.55);
  // tronco y ramas
  for (let y = cy + 2; y <= base; y++) { const w = 1 + Math.round((y - cy) / (base - cy) * 1.6); for (let i = -w; i <= w; i++) R.pset(cx + i + Math.round(Math.sin(y * 0.25) * 0.6), y, i === w ? AP.trL : i <= -w + 1 ? AP.trS : AP.tr); }
  R.linea(cx, cy + Math.round(ry * 0.5), cx - Math.round(rx * 0.5), cy, AP.trS); R.linea(cx + 1, cy + Math.round(ry * 0.6), cx + Math.round(rx * 0.55), cy - 1, AP.tr);
  // la copa: grumos
  const bolas = [];
  for (let k = 0; k < 11; k++) { const a = h(k, 1, sem) * 6.28, rr = Math.sqrt(h(k, 2, sem)) * 0.62; bolas.push([cx + Math.cos(a) * rx * rr, cy + Math.sin(a) * ry * rr * 0.9, (0.38 + h(k, 3, sem) * 0.22) * Math.min(rx, ry * 1.3)]); }
  bolas.push([cx, cy, Math.min(rx, ry) * 0.75]);
  const dentro = (x, y) => { for (const [bx, by, r] of bolas) if ((x - bx) ** 2 + ((y - by) * 1.1) ** 2 < r * r) return true; return false; };
  for (let y = Math.floor(cy - ry - 2); y <= Math.ceil(cy + ry + 2); y++) for (let x = Math.floor(cx - rx - 2); x <= Math.ceil(cx + rx + 2); x++) {
    if (!dentro(x, y)) continue;
    const borde = !dentro(x, y - 1) || !dentro(x + 1, y) || !dentro(x - 1, y) || !dentro(x, y + 1);
    const g = h(x >> 1, y >> 1, sem + 5), l = 0.5 + (x - cx) / rx * 0.28 - (y - cy) / ry * 0.32 + (g - 0.5) * 0.5 + (borde && !dentro(x, y - 1) ? 0.15 : 0);
    if (h(x, y, sem + 9) < 0.025 && !borde) { R.pset(x, y, AP.trS); continue; }   // un hueco entre las hojas
    R.pset(x, y, borde && !dentro(x, y + 1) ? AP.h0 : a_rampa([AP.h0, AP.h1, AP.h2, AP.h3, AP.h4], l, x, y));
    if (borde && h(x, y, sem + 3) < 0.35) hojas.push([x, y, !dentro(x, y - 1) ? -1 : !dentro(x + 1, y) ? 1 : 0]);
  }
}

// las hojas del borde del moral que se agitan con el viento (por fotograma)
function a_hojas(R, t, hojas, fuerza = 1) {
  for (let i = 0; i < hojas.length; i += 2) { const [x, y, lado] = hojas[i], s = Math.sin(t * 2.6 + x * 0.3 + y * 0.2) * fuerza;
    if (s > 0.55) R.pset(x + (lado || 1), y + (lado < 0 ? -1 : 0), i % 4 ? AP.h3 : AP.h4); else if (s < -0.7) R.pset(x, y, AP.h1); }
}

// la sombra del moral en el suelo: un óvalo tramado que oscurece lo que hay
function a_sombraOval(R, cx, cy, rx, ry, a = 0.45) {
  const B = R.buf;
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) {
    const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x >> 1, y, 61) - 0.5) * 0.3; if (e > 1) continue;
    if (e < 0.75 || a_U(x, y) < 0.5) B[y * 320 + x] = a_mezcla(B[y * 320 + x], AP.sombra, a); }
}

// cúmulo de tres tonos con la base plana que solo pinta donde m dice cielo
function a_nube(B, m, cx, cy, w, sem, cn, ap = 1) {
  const n = 3 + Math.round(w / 12), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.15 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06 * ap, r]); }
  const disco = (x0, y0, r, c) => { for (let y = Math.max(0, Math.floor(y0 - r)); y <= Math.min(179, Math.ceil(y0 + r)); y++) for (let x = Math.max(0, Math.floor(x0 - r)); x <= Math.min(319, Math.ceil(x0 + r)); x++) { const i = y * 320 + x; if (m[i] && (x + 0.5 - x0) ** 2 + (y + 0.5 - y0) ** 2 <= r * r) B[i] = c; } };
  for (const [x, y, r] of bolas) disco(x, y + 1, r, cn[0]);
  for (const [x, y, r] of bolas) disco(x, y, r, cn[1]);
  for (const [x, y, r] of bolas) disco(x + 1, y - 2, r * 0.66, cn[2]);
  const yb = Math.round(cy + w * 0.08 * ap); for (let x = Math.round(cx - w * 0.46); x <= Math.round(cx + w * 0.46); x++) for (const [yy, c] of [[yb, cn[0]], [yb + 1, cn[3] ?? cn[0]]]) { if (x < 0 || x > 319 || yy < 0 || yy > 179) continue; const i = yy * 320 + x; if (m[i]) B[i] = c; }
}

// el cielo que se mueve: cirros muy altos casi quietos, cúmulos medianos y bolitas bajas junto al horizonte, a tres
// velocidades; solo sobre el cielo (m), y nunca por encima de y 18
function a_nubes(R, t, m, hor, v = 1) {
  const B = R.buf, cn = [AP.n0, AP.n1, AP.n2, AP.nS];
  for (let k = 0; k < 4; k++) { const w = 46 + Math.round(h(k, 5, 622) * 40), x0 = ((h(k, 6, 622) * 440 + t * 0.7 * v) % 480) - 90, y = 20 + Math.round(h(k, 7, 622) * (hor * 0.3));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), e = Math.sin(i / w * Math.PI), yy = y - Math.round((i / w) ** 2 * 4); if (x < 0 || x > 319 || h(i >> 2, k, 623) < 0.22) continue; const j = yy * 320 + x; if (m[j]) B[j] = e > 0.45 ? cn[1] : a_mezcla(B[j], cn[1], 0.5); if (e > 0.6 && i % 3 && m[j - 318]) B[j - 318] = cn[2]; } }
  for (let k = 0; k < 3; k++) { const w = 30 + k * 9, y = Math.round(hor * 0.48) + k * 5, x = ((h(k, 8, 622) * 470 + t * (2.2 + k * 0.9) * v) % 520) - 100; a_nube(B, m, x, y, w, k + 3, cn); }
  for (let k = 0; k < 4; k++) { const w = 12 + (k * 5) % 9, y = hor - 9 + (k % 2) * 3, x = ((h(k, 9, 622) * 400 + t * 0.9 * v) % 440) - 60; a_nube(B, m, x, y, w, k + 13, cn, 0.6); }
}

// pájaros: una bandada que pasa y un cernícalo que se cierne (alas arriba y abajo)
function a_pajaros(R, t, x0, y0, n = 5, v = 9, sem = 1) {
  const c = hex('#3a3a46');
  for (let k = 0; k < n; k++) { const x = Math.round(((x0 + t * v + k * 9 + h(k, 1, sem) * 6) % 380) - 30), y = Math.round(y0 + (k % 3) * 3 + Math.sin(t * 1.3 + k) * 1.5), a = Math.floor(t * 7 + k * 1.7) % 2;
    R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 1 + a * 2 - a, c); R.pset(x + 2, y - 1 + a * 2 - a, c); }
}

// una persona pequeña (6–10 px) de fondo: acc 'anda', 'pie', 'cava' (con el pico), 'agacha' (con la paleta), 'cubo'
// (lleva un cubo), 'criba' (sacude un tamiz), 'empuja' (contra una viga), 'mazo' (golpea abajo), 'dibuja' (en una mesa)
const A_ROPA = ['#3a6ec0', '#e8e4d8', '#d86a3a', '#4a8a5a', '#b8a070', '#c8403a', '#6a5a8a'].map(hex);

function a_gente(R, x, s, t, k, acc = 'pie', dir = 1) {
  x = Math.round(x); s = Math.round(s);
  const ropa = A_ROPA[k % A_ROPA.length], ropaS = a_mezcla(ropa, AP.negro, 0.35), pant = [AP.cristal, hex('#5a4a3a'), hex('#3a3a44')][k % 3], piel = k % 3 === 1 ? AP.pielS : AP.piel;
  const sombrero = k % 4, f = Math.floor(t * 5 + k * 1.3) % 2, P = (i, j, c) => R.pset(x + i * dir, s + j, c);
  R.linea(x - 2, s + 1, x + 2, s + 1, a_mezcla(AP.sombra, AP.negro, 0.2));
  if (acc === 'agacha') {
    P(0, 0, pant); P(1, 0, pant); P(-1, 0, pant); P(0, -1, ropaS); P(0, -2, ropa); P(1, -2, ropa); P(1, -3, ropa); P(0, -3, ropa);
    P(2, -4, piel); P(1, -4, piel); P(2, -5, sombrero === 0 ? AP.lona : AP.trS); P(1, -5, sombrero === 0 ? AP.lona : AP.trS); if (sombrero === 0) { P(0, -5, AP.lona); P(3, -5, AP.lona); }
    const m = Math.round(Math.sin(t * 6 + k) * 1); P(2, -1, piel); P(3 + m, 0, AP.p1); return;
  }
  const doblado = acc === 'cava' && Math.sin(t * 4 + k) > 0.2 ? 1 : 0, cab = -9 + doblado, pierna = acc === 'anda' || acc === 'cubo' ? f : 0;
  P(0 - pierna, 0, pant); P(0 - pierna, -1, pant); P(1 + pierna, 0, pant); P(1 + pierna, -1, pant); P(0, -2, pant); P(1, -2, pant);
  for (let j = -6; j <= -3; j++) { P(-1 + doblado, j, ropaS); P(0 + doblado, j, ropa); P(1 + doblado, j, ropa); P(2 + doblado, j, j === -6 ? ropa : ropaS); }
  P(0 + doblado, cab + 1, piel); P(1 + doblado, cab + 1, piel); P(0 + doblado, cab + 2, piel); P(1 + doblado, cab + 2, piel); P(2 + doblado, cab + 2, piel);
  if (sombrero === 0) { for (let i = -1; i <= 3; i++) P(i + doblado, cab, AP.lona); P(0 + doblado, cab - 1, AP.lona); P(1 + doblado, cab - 1, AP.lona); }
  else if (sombrero === 1) { P(0 + doblado, cab, AP.blanco); P(1 + doblado, cab, AP.blanco); P(2 + doblado, cab, AP.blanco); P(3 + doblado, cab, AP.blanco); }
  else { P(0 + doblado, cab, AP.trS); P(1 + doblado, cab, AP.trS); P(-1 + doblado, cab + 1, AP.trS); }
  if (acc === 'cava') { const a = Math.sin(t * 4 + k), mx = 3 + doblado, my = -5 + Math.round(a * -2); R.linea(x + mx * dir, s + my, x + (mx + 3) * dir, s + my + 5 - Math.round(a * 3), AP.madera); R.linea(x + (mx + 2) * dir, s + my + 5 - Math.round(a * 3), x + (mx + 4) * dir, s + my + 4 - Math.round(a * 3), AP.p0); }
  else if (acc === 'cubo') { P(3, -4, piel); P(3, -3, AP.p1); P(3, -2, AP.negro); P(4, -2, AP.negro); P(3, -1, AP.negro); P(4, -1, AP.negro); }
  else if (acc === 'criba') { const m = Math.round(Math.sin(t * 14 + k)); P(3, -4, piel); for (let i = 3; i <= 8; i++) R.pset(x + (i + m) * dir, s - 4, i === 3 || i === 8 ? AP.madera : AP.p2); if (Math.floor(t * 9) % 2) R.pset(x + (5 + m) * dir, s - 2, AP.caminoS); }
  else if (acc === 'empuja') { const m = Math.round(Math.sin(t * 3 + k) * 0.8 + 0.4); P(3 + m, -5, piel); P(2 + m, -5, ropa); P(3 + m, -6, piel); }
  else if (acc === 'mazo') { const a = Math.sin(t * 5 + k); P(3, -5, piel); R.linea(x + 3 * dir, s - 5, x + (3 + Math.round(2 + a * 2)) * dir, s - 7 + Math.round(a * 5), AP.madera); R.rect(Math.min(x + (4 + Math.round(2 + a * 2)) * dir, x + (6 + Math.round(2 + a * 2)) * dir), s - 8 + Math.round(a * 5), Math.max(x + (4 + Math.round(2 + a * 2)) * dir, x + (6 + Math.round(2 + a * 2)) * dir), s - 7 + Math.round(a * 5), AP.maderaS); }
  else if (acc === 'dibuja') { const m = Math.round(Math.sin(t * 5 + k)); P(3 + m, -4, piel); P(4 + m, -4, AP.negro); }
  else { P(3, -4, piel); P(-1, -4, piel); }
}

// una oveja de lejos (3 × 2 px) que pace (baja la cabeza)
function a_oveja(R, x, y, t, k) { x = Math.round(x); const a = Math.sin(t * 0.9 + k * 2.1) > 0.3 ? 1 : 0; R.rect(x, y - 2, x + 3, y - 1, AP.oveja); R.pset(x, y - 1, AP.ovejaS); R.pset(x + 3, y - 2, AP.oveja); R.pset(x + 4, y - 2 + a, AP.p0); R.pset(x + 1, y, AP.p0); R.pset(x + 3, y, AP.p0); }

// el jeep de los sesenta (de lado, mirando a la derecha): ruedas en y suelo, x0 su trasera; 38 px de largo
function a_jeep(R, x0, s, t) {
  const L = (i, j, i2, j2, c) => R.rect(x0 + i, s + j, x0 + i2, s + j2, c);
  R.linea(x0 - 2, s + 1, x0 + 40, s + 1, AP.sombra); R.linea(x0, s + 2, x0 + 36, s + 2, a_mezcla(AP.sombra, AP.camino, 0.5));
  L(1, -11, 35, -4, AP.jeep); L(1, -11, 35, -11, AP.jeepL); L(1, -5, 35, -4, AP.jeepS);
  L(24, -14, 37, -11, AP.jeep); L(24, -14, 37, -14, AP.jeepL); L(36, -12, 38, -6, AP.jeepS);   // el capó y el morro
  L(37, -11, 38, -10, hex('#e8e0b0'));   // el faro
  L(2, -22, 22, -12, AP.lona); L(2, -22, 22, -21, hex('#cfc092')); L(2, -14, 22, -12, AP.lonaS);   // la capota de lona
  L(14, -20, 21, -15, AP.cristal); L(15, -19, 16, -18, AP.cristalL); L(4, -20, 11, -15, AP.cristal);
  R.linea(x0 + 23, s - 22, x0 + 25, s - 14, AP.jeepS); R.linea(x0 + 24, s - 21, x0 + 26, s - 15, AP.cristalL);   // el parabrisas
  for (let i = 3; i < 34; i += 6) R.pset(x0 + i, s - 8, AP.jeepS);
  L(-2, -16, 1, -8, AP.rueda); L(-1, -15, 0, -9, AP.llanta);   // la rueda de repuesto
  for (const wx of [8, 30]) { R.disco(x0 + wx + 0.5, s - 3.5, 4, AP.rueda); R.disco(x0 + wx + 0.5, s - 3.5, 1.8, AP.llanta); R.pset(x0 + wx, s - 4, AP.p4); L(wx - 5, -9, wx + 5, -8, AP.jeepS); }
  // el calor que tiembla sobre el capó
  for (let k = 0; k < 4; k++) if (Math.sin(t * 5 + k * 1.9) > 0.4) R.pset(x0 + 26 + k * 3, s - 16 - (Math.floor(t * 3 + k) % 3), AP.halo);
}

// el tractor rojo de 1994 (de lado): dir 1 a la derecha; con el arado detrás y su humo
function a_tractor(R, x, s, t, dir) {
  x = Math.round(x); const P = (i, j, c) => R.pset(x + i * dir, s + j, c), RR = (i0, j0, i1, j1, c) => { for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) P(i, j, c); };
  RR(-9, -1, -5, 0, AP.p0); P(-10, 1, AP.p1); P(-6, 1, AP.p1);   // el arado
  RR(-4, -7, 6, -3, AP.rojo); RR(-4, -7, 6, -7, AP.rojoL); RR(2, -9, 7, -5, AP.rojo); RR(2, -9, 7, -9, AP.rojoL); P(7, -6, hex('#f0e0a0'));
  RR(-3, -11, -2, -8, AP.p0); P(-2, -12, AP.negro); RR(0, -10, 1, -8, AP.cristal); P(0, -11, AP.piel); P(1, -11, AP.piel); P(0, -12, AP.blanco);
  for (const [cx, r] of [[-2, 3.2], [5, 1.8]]) { const X = x + cx * dir; R.disco(X + 0.5, s - r + 0.5, r, AP.rueda); R.pset(X, s - Math.round(r), AP.llanta); }
  for (let k = 0; k < 3; k++) { const u = (t * 1.6 + k / 3) % 1; R.pset(x + Math.round((-2 - u * 4) * dir), s - 13 - Math.round(u * 6), u < 0.5 ? AP.p1 : AP.p2); }
}

// la membrana de la cubierta de hoy (cuatro picos sobre mástiles, el borde que se levanta entre apoyos, costuras que
// bajan de cada pico, la sombra de debajo y los tirantes) entre x0 y x1, con el borde de abajo en yb
function a_cubierta(R, x0, x1, yb, alto, sem = 0) {
  const n = 4, paso = (x1 - x0) / n, picos = [...Array(n)].map((_, k) => [x0 + paso * (k + 0.5), yb - alto + (k === 0 || k === n - 1 ? 6 : 0)]);
  const sup = (x) => { let y = 999; for (const [px, py] of picos) y = Math.min(y, py + Math.abs(x - px) * 0.75 + (x - px) ** 2 * 0.012); return y; };
  const borde = (x) => yb - 4 * Math.sin(Math.PI * (((x - x0) / paso) % 1));
  // los tirantes y los anclajes (por detrás de la membrana)
  for (const [px, py] of picos) { for (const dx of [-1, 1]) { const ax = px + dx * paso * 0.9, ay = yb + 6; R.linea(px, py - 9, ax, ay, (x, y, k) => (k % 3 ? AP.tirante : null)); R.pset(Math.round(ax), ay, AP.p0); } }
  // la sombra de debajo (se ve el hueco bajo la membrana: muros y pilares en penumbra)
  for (let x = Math.ceil(x0 + 3); x <= x1 - 3; x++) { const e = Math.round(borde(x)); for (let y = e; y <= yb + 5; y++) R.pset(x, y, y > yb + 3 ? AP.p0 : h(x >> 1, y, 71) < 0.18 ? AP.p1 : AP.bajo); if (h(x >> 2, 1, 72) < 0.25) R.pset(x, yb + 2, C.caliza); }
  for (let x = Math.ceil(x0); x <= x1; x++) {
    const ys = Math.round(sup(x)), ye = Math.round(borde(x));
    for (let y = ys; y <= ye; y++) {
      let k = 0, dmin = 1e9; picos.forEach(([px], i) => { const d = Math.abs(x - px); if (d < dmin) { dmin = d; k = i; } });
      const [px, py] = picos[k], dx = x - px, ang = Math.atan2(y - py + 9, dx), cos = Math.floor((ang + 3.2) * 4.5);
      let l = 0.62 + (dx > 0 ? 0.25 : -0.12) * Math.min(1, Math.abs(dx) / 10) - (y - ys) / Math.max(4, ye - ys) * 0.2;
      if (cos !== Math.floor((Math.atan2(y - py + 9, dx + 1) + 3.2) * 4.5)) l -= 0.18;   // las costuras
      R.pset(x, y, y === ye ? AP.memS : y === ys ? AP.mem : a_rampa([AP.memD, AP.memS, AP.memM, AP.mem], l, x, y));
    }
  }
  for (const [px, py] of picos) { R.linea(px, py - 10, px, py + 1, AP.mastil); R.pset(px, py - 11, AP.memD); }
  for (let k = 0; k <= n; k++) { const sx = Math.round(x0 + k * paso); R.linea(sx, Math.round(borde(sx)), sx, yb + 5, AP.mastil); }
  return picos;
}

const A_YH = (x) => { const u = (x - 172) / 116; return 134 - 62 * Math.pow(Math.max(0, 1 - u * u), 0.55); };

// la altura de una curva de nivel c (0 la silueta, 1 el pie) en la columna x
const A_NIV = (x, c) => A_YH(x) + c * (138 - A_YH(x));

// el camino de tierra que sube al cerro (de abajo a la izquierda a la cima): su centro en cada y
const A_CAMINO = [[30, 180], [52, 162], [70, 150], [96, 138], [118, 128], [132, 116], [144, 100], [154, 86], [162, 76]];

function a_caminoX(y) { for (let i = 0; i + 1 < A_CAMINO.length; i++) { const [x0, y0] = A_CAMINO[i], [x1, y1] = A_CAMINO[i + 1]; if (y <= y0 && y >= y1) return x0 + (x1 - x0) * (y0 - y) / (y0 - y1); } return null; }

function a_cerroFijo(R, ep, est) {
  const B = R.buf, HOR = 64, hoy = ep === 'hoy', E = A_ESTEPA[est], CP = A_CAMPOS[est], info = { hojas: [] };
  a_cieloGrad(B, 0, HOR + 1, A_CIELO); a_sol(R, 234, 28);
  const S = B.slice(0, 320 * (HOR + 1));
  a_sierra(R, HOR, 1);
  a_campos(B, HOR, HOR, 140, est, 1);
  a_pueblo(R, 10, HOR); a_arbolitos(R, HOR, 136, 1);
  // los muretes de piedra seca entre las parcelas de delante (líneas de piedras que se alejan)
  for (const [xa, ya, xb, yb] of [[0, 112, 64, 96], [210, 124, 320, 104], [250, 92, 320, 84]]) R.linea(xa, ya, xb, yb, (x, y, k) => (k % 2 ? AP.p3 : h(x, y, 3) < 0.4 ? AP.p1 : AP.p2));
  // el cerro: la falda con estepa o rastrojo, la cima arada en surcos que siguen la curva, piedras de caliza sueltas
  const P = hoy ? [E[0], E[1], E[2]] : CP.arado, F = hoy ? [E[3], E[0], E[1], E[2]] : est === 'primavera' ? [E[3], E[0], E[1], E[2]] : [CP.rastrojo[0], CP.rastrojo[1], CP.rastrojo[2], E[2]];
  for (let x = 54; x <= 290; x++) { const u = (x - 172) / 116; if (Math.abs(u) > 1) continue; const yt = Math.ceil(A_YH(x)), yb = 134 + Math.round(Math.sin(x * 0.07) * 2 + h(x >> 2, 1, 5) * 2);
    for (let y = yt; y <= yb; y++) {
      const c = (y - yt) / Math.max(1, 138 - yt), falda = c > a_lindeC(x, u);
      const l0 = 0.48 + u * 0.4 - (u < 0 ? c * 0.12 : 0) + (h(x >> 1, y, 7) - 0.5) * 0.3 + (y - yt < 1 ? (u > -0.2 ? 0.45 : 0.15) : 0) - (c > 0.86 && u < 0.3 ? 0.18 : 0);
      let col;
      if (falda) col = a_rampa(F, l0 + (h(x, y >> 1, 8) < 0.1 ? 0.3 : 0), x, y);
      else { const sur = Math.floor(c * 26); col = a_rampa(P, l0 + (hoy ? (h(x, y, 9) < 0.1 ? -0.3 : 0) : (sur & 1 ? -0.22 : 0.12)), x, y); }
      if (!hoy && h(x, y, 10) < 0.03 * (1.2 - c)) col = h(x, y, 11) < 0.5 ? AP.p3 : AP.p4;   // cascotes de caliza
      if (y > yb - 2 && a_U(x, y) < 0.5) col = B[y * 320 + x];
      B[y * 320 + x] = col; } }
  // la linde entre lo arado y la falda: un caballón de tierra con piedras sacadas del campo, en luz arriba y sombra abajo
  for (let x = 56; x <= 288; x++) { const u = (x - 172) / 116; if (Math.abs(u) > 0.97) continue; const yt = Math.ceil(A_YH(x)), y = Math.round(yt + a_lindeC(x, u) * (138 - yt));
    R.pset(x, y - 1, hoy ? E[2] : CP.arado[2]); R.pset(x, y, h(x >> 1, 3, 14) < 0.35 ? (h(x, 1, 15) < 0.5 ? AP.p3 : AP.p4) : hoy ? E[0] : CP.arado[0]); R.pset(x, y + 1, a_mezcla(B[(y + 1) * 320 + x], AP.sombra, 0.5)); }
  // pistacheros sueltos y matorrales en la falda, con su sombra a la izquierda (el sol está a la derecha)
  for (const [u, cw, r] of [[-0.7, 0.72, 3], [-0.52, 0.86, 2], [0.62, 0.7, 3.5], [0.8, 0.84, 2.5], [0.3, 0.9, 2], [-0.2, 0.92, 2.5]]) { const x = Math.round(172 + u * 116), y = Math.round(A_NIV(x, cw));
    for (let i = 1; i <= r * 2 + 2; i++) R.pset(x - i, y, a_mezcla(B[y * 320 + x - i], AP.sombra, 0.5)); R.disco(x + 0.5, y - r + 0.5, r, AP.h1); R.disco(x + 1, y - r, r * 0.6, AP.h2); R.pset(Math.round(x + r * 0.5), Math.round(y - r * 1.5), AP.h3); R.pset(x, y, AP.tr); }
  // terrazas de piedra seca en la falda
  for (const cw of [0.3, 0.62]) for (let x = 66; x <= 280; x += 2) { if (h(x >> 3, cw * 10, 12) < 0.18) continue; const y = Math.round(A_NIV(x, cw));
    R.pset(x, y, AP.p3); R.pset(x + 1, y, h(x, y, 13) < 0.5 ? AP.p2 : AP.p4); R.pset(x, y + 1, AP.p0); R.pset(x + 1, y + 1, AP.p1); }
  // las losas de caliza rotas en la cima (1963 y, menos, 1994) y los montones apartados al pie (1994)
  if (!hoy) { const L = [[-0.42, 0.1, 7], [-0.28, 0.05, 9], [-0.12, 0.14, 6], [0.1, 0.03, 8], [0.22, 0.12, 7], [0.36, 0.06, 6], [0.46, 0.17, 5], [-0.04, 0.22, 5], [0.3, 0.24, 6]];
    L.forEach(([u, c, w], k) => { if (ep === 1994 && k % 2) return; a_losa(R, Math.round(172 + u * 116 - w / 2), Math.round(A_NIV(172 + u * 116, c * 1.3)) + 3, w, k + 1); });
    if (ep === 1994) for (const [mx, my] of [[68, 128], [264, 126]]) for (let k = 0; k < 9; k++) a_losa(R, mx + (k % 4) * 6 + (k >> 2) * 3, my - (k >> 2) * 3, 6 + (k % 2), k + 20); }
  // el primer término: estepa con matas, piedras y flores, que se funde con la llanura
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (y < 140 && a_U(x, y) > (y - 134) / 6) continue;
    const n = h(x >> 2, y >> 1, 20) * 0.55 + h(x >> 3, y >> 2, 21) * 0.45, l = 0.3 + n * 0.55 + (h(x, y >> 1, 22) < 0.1 ? -0.35 : 0);
    let col = a_rampa([E[3], E[0], E[1], E[2]], l, x, y);
    if (h(x, y, 23) < 0.012) col = AP.p3; else if (est === 'primavera' && h(x, y, 24) < 0.01) col = hex('#e8d040');
    B[y * 320 + x] = col; }
  for (let k = 0; k < 18; k++) a_piedra(R, Math.round(h(k, 1, 25) * 320), 142 + Math.round(h(k, 2, 25) * 36), 3 + Math.round(h(k, 3, 25) * 4), 2, k);
  // el camino: tierra clara con dos rodadas y la mediana con hierba (hoy, asfaltado)
  for (let y = 76; y < 180; y++) { const cx = a_caminoX(y); if (cx == null) continue; const w = 1 + (y - 70) * 0.085;
    for (let x = Math.floor(cx - w); x <= Math.ceil(cx + w); x++) { const f = Math.abs(x - cx) / w; let col = hoy ? (f > 0.85 ? AP.p2 : h(x, y, 26) < 0.1 ? AP.asfaltoL : AP.asfalto) : (f > 0.85 ? AP.caminoS : Math.abs(f - 0.5) < 0.16 && w > 4 ? AP.caminoS : h(x, y, 26) < 0.15 ? AP.caminoL : AP.camino);
      if (!hoy && f < 0.12 && w > 5 && h(x, y, 27) < 0.5) col = E[0]; R.pset(x, y, col); } }
  if (hoy) {
    // el centro de visitantes (muros de piedra, cubierta plana, ventanas), el aparcamiento con autobuses y coches
    R.rect(34, 118, 88, 134, C.caliza); for (let y = 119; y <= 134; y += 3) for (let x = 34; x <= 88; x++) if (h(x >> 2, y, 30) < 0.2 || x % 7 === (y % 2) * 3) R.pset(x, y, C.veta);
    R.rect(32, 115, 90, 117, AP.p4); R.rect(32, 118, 90, 118, AP.p1); R.rect(40, 124, 82, 128, AP.cristal); for (let x = 40; x <= 82; x += 6) R.linea(x, 124, x, 128, AP.p1); R.rect(41, 124, 50, 124, AP.cristalL);
    R.rect(60, 129, 66, 134, AP.cristal); R.linea(28, 134, 94, 134, AP.sombra); R.linea(96, 95, 96, 133, AP.p1);
    R.rect(206, 124, 300, 140, AP.asfalto); for (let y = 124; y <= 140; y++) for (let x = 206; x <= 300; x++) if (h(x, y, 31) < 0.12) R.pset(x, y, AP.asfaltoL);
    for (let x = 210; x <= 296; x += 8) { R.linea(x, 125, x, 129, AP.p4); R.linea(x - 1, 135, x - 1, 139, AP.p4); }
    for (const [bx, by] of [[212, 131], [236, 131], [262, 137]]) { R.rect(bx, by - 7, bx + 18, by - 1, AP.bus); R.rect(bx, by - 7, bx + 18, by - 7, AP.blanco); R.rect(bx + 1, by - 6, bx + 17, by - 4, AP.cristal); for (let x = bx + 3; x < bx + 17; x += 3) R.pset(x, by - 6, AP.cristalL); R.rect(bx, by - 2, bx + 18, by - 1, AP.busS); R.pset(bx + 3, by, AP.rueda); R.pset(bx + 4, by, AP.rueda); R.pset(bx + 14, by, AP.rueda); R.pset(bx + 15, by, AP.rueda); }
    [[284, 129, AP.rojo], [276, 136, AP.azul], [290, 136, AP.p4], [252, 129, hex('#4a4a52')]].forEach(([cx, cy, c]) => { R.rect(cx, cy - 3, cx + 6, cy - 1, c); R.rect(cx + 1, cy - 4, cx + 5, cy - 4, a_mezcla(c, AP.cristal, 0.5)); R.pset(cx + 1, cy, AP.rueda); R.pset(cx + 5, cy, AP.rueda); });
    // la cubierta sobre la cima, la pasarela de madera alrededor y el moral a un lado
    info.picos = a_cubierta(R, 100, 232, 92, 40);
    for (let x = 96; x <= 238; x++) { const y = 98 + Math.round(((x - 167) / 72) ** 2 * 6); R.pset(x, y, AP.maderaL); R.pset(x, y + 1, AP.maderaS); if (x % 8 === 0) R.linea(x, y - 2, x, y, AP.madera); }
    a_moral(R, 246, Math.round(A_YH(246)) + 1, 16, 13, 7, info.hojas);
  } else {
    if (ep === 1994) a_moral(R, 168, 72, 22, 17, 3, info.hojas); else a_moral(R, 168, 72, 18, 14, 3, info.hojas);
  }
  const m = new Uint8Array(320 * 180); for (let i = 0; i < S.length; i++) m[i] = B[i] === S[i] ? 1 : 0;
  info.m = m; return info;
}
function a_cerro(R, t, o) {
  const ep = o.epoca === 1994 || o.epoca === '1994' ? 1994 : o.epoca === 'hoy' ? 'hoy' : 1963, est = a_est(o), hoy = ep === 'hoy';
  const info = a_capa(R, 'cerro|' + ep + '|' + est, () => a_cerroFijo(R, ep, est));
  info.mc ??= a_calma(info.m); a_nubes(R, t, info.mc, 64);
  a_pajaros(R, t, 40, 30, 5, 7, 1);
  { const a = t * 0.5, x = 96 + Math.cos(a) * 18, y = 40 + Math.sin(a * 2) * 3; R.pset(Math.round(x), Math.round(y), AP.negro); R.pset(Math.round(x) - 1, Math.round(y) - (Math.floor(t * 4) % 2), AP.negro); R.pset(Math.round(x) + 1, Math.round(y) - (Math.floor(t * 4) % 2), AP.negro); }
  a_hojas(R, t, info.hojas);
  // el pastor, su perro y el rebaño en la llanura de la izquierda: pacen y avanzan muy despacio
  const ox = 22 + Math.sin(t * 0.15) * 6;
  for (let k = 0; k < 11; k++) a_oveja(R, ox + (k % 6) * 7 + h(k, 1, 90) * 5 + Math.sin(t * 0.4 + k) * 1.2, 100 + (k / 6 | 0) * 4 + Math.round(h(k, 2, 90) * 2), t, k);
  { const px = Math.round(ox + 50), py = 104; R.pset(px, py - 5, AP.piel); R.rect(px - 1, py - 4, px + 1, py - 1, hex('#5a4a3a')); R.pset(px, py, AP.negro); R.pset(px + 1, py, AP.negro); R.linea(px + 2, py - 7, px + 2, py, AP.trL); R.pset(px, py - 6, AP.trS); }
  { const dx = Math.round(ox + 40 + Math.sin(t * 1.3) * 8); R.rect(dx, 107, dx + 2, 108, AP.perro); R.pset(dx + 3, 106, AP.perro); R.pset(dx - 1, 106 + (Math.floor(t * 6) % 2), AP.perro); }
  // un remolino de polvo que cruza la llanura (verano y otoño)
  if (est !== 'primavera' && !hoy) { const x0 = ((t * 9) % 420) - 40, yb = 128; for (let j = 0; j < 22; j++) { const r = 1 + j * 0.18, a = t * 9 + j * 0.7; for (let s = 0; s < 2; s++) { const x = Math.round(x0 + Math.sin(j * 0.3 + t) * 2 + Math.cos(a + s * 3.1) * r), y = yb - j; if (y > 64 && h(j, s, Math.floor(t * 8)) < 0.7) R.pset(x, y, j < 6 ? AP.caminoS : AP.caminoL); } } }
  if (ep === 1994) {
    // el tractor ara la falda de ida y vuelta; detrás deja la tierra recién volteada y una nube de polvo
    const per = 16, u = (t % per) / per, ida = u < 0.5, f = ida ? u * 2 : (1 - u) * 2, x = 104 + f * 132, y = Math.round(A_NIV(x, 0.42));
    for (let k = 0; k < 7; k++) { const v = ((t * 1.1 + k / 7) % 1), px = Math.round(x - (ida ? 1 : -1) * (12 + v * 14)), py = y - 2 - Math.round(v * 6); if (h(k, Math.floor(t * 3), 91) < 0.8) { R.pset(px, py, v < 0.5 ? AP.caminoL : AP.halo); if (v < 0.4) R.pset(px + 1, py, AP.camino); } }
    a_tractor(R, x, y, t, ida ? 1 : -1);
  }
  if (hoy) {
    // los visitantes que suben y bajan por el camino asfaltado, y el banderín del centro de visitantes
    for (let k = 0; k < 7; k++) { const sube = k % 2 === 0, u = ((t * 0.035 * (sube ? 1 : -1) + h(k, 1, 92)) % 1 + 1) % 1, y = Math.round(150 - u * 56), x = a_caminoX(y) + (sube ? -1 : 2); a_gente(R, x, y, t, k + 1, 'anda', sube ? 1 : -1); }
    const fl = Math.sin(t * 5); R.linea(30, 100, 30, 117, AP.p1); for (let i = 0; i < 8; i++) for (let j = 0; j < 4 - (i >> 1); j++) R.pset(31 + i, 101 + j + (i >> 1) * 0 + Math.round(Math.sin(t * 6 + i * 0.8) * fl * 0.8), i > 5 ? AP.azulS : AP.azul);
  }
  a_matas(R, t, [[118, 152, 5], [214, 158, 6], [258, 146, 4], [6, 146, 5], [162, 170, 7], [300, 160, 5]], est);
  if (ep === 1963) a_jeep(R, 41, 150, t);
}
// matas de hierba seca que se mecen con el viento: [x, suelo, alto]
function a_matas(R, t, L, est) {
  const E = A_ESTEPA[est];
  for (const [x, s, a] of L) for (let b = -3; b <= 3; b++) { const v = Math.sin(t * 2.2 + x * 0.05 + b * 0.4) * (0.8 + a * 0.1), al = a - Math.abs(b) * 0.8; R.linea(x + b, s, x + b * 1.6 + v, s - al, b < 0 ? E[3] : b > 1 ? E[2] : E[1]); if (b === 0 && est !== 'primavera') R.pset(Math.round(x + v), Math.round(s - al - 1), E[2]); }
}

// un cardo: tallo, hojas de pinchos y la cabeza morada (seca en verano y otoño) que cabecea con el viento
function a_cardo(R, x, s, a, t, k, est) {
  const v = Math.sin(t * 1.8 + k * 1.3) * a * 0.06, tope = [x + v * 1.4, s - a], cab = est === 'primavera' ? hex('#a050b0') : est === 'verano' ? hex('#8a5a9a') : hex('#a08a6a'), tallo = est === 'primavera' ? hex('#5a8a4a') : hex('#7a8a5a');
  R.linea(x, s, Math.round(tope[0]), Math.round(tope[1]), tallo);
  for (let j = 0.25; j < 0.8; j += 0.22) { const yy = Math.round(s - a * j), xx = Math.round(x + v * j * 1.4); R.linea(xx, yy, xx - 3, yy - 2, tallo); R.linea(xx, yy, xx + 3, yy - 2, hex('#9aaa6a')); R.pset(xx - 4, yy - 3, hex('#c8d09a')); }
  const [cx, cy] = tope.map(Math.round); R.disco(cx + 0.5, cy - 1.5, 2.2, cab); R.pset(cx, cy - 3, hex('#d0a0e0')); R.pset(cx + 1, cy - 2, hex('#e8c8f0'));
  R.rect(cx - 1, cy, cx + 1, cy + 1, hex('#6a7a4a')); R.pset(cx - 2, cy - 1, hex('#9aaa6a')); R.pset(cx + 2, cy - 1, hex('#9aaa6a'));
}

function a_losasFijo(R, ep, est) {
  const B = R.buf, HOR = 56, hoy = ep === 'hoy', E = A_ESTEPA[est], CP = A_CAMPOS[est], info = { hojas: [] };
  a_cieloGrad(B, 0, HOR + 1, A_CIELO); a_sol(R, 252, 26, 5);
  const S = B.slice(0, 320 * (HOR + 1));
  a_sierra(R, HOR, 4); a_campos(B, HOR, HOR, 76, est, 4); a_arbolitos(R, HOR, 72, 4);
  if (hoy) { a_cubierta(R, 186, 262, 62, 18); }
  // la cima: tierra arada en surcos que se alejan hacia el punto de fuga (250, 18), con terrones que crecen al acercarse
  const AR = hoy ? [E[3], E[0], E[1], E[2]] : [hex('#6e3e28'), CP.arado[0], CP.arado[1], CP.arado[2], hex('#cc9670')];
  for (let x = 0; x < 320; x++) { const yc = Math.round(64 + ((x - 210) / 260) ** 2 * 14 + Math.sin(x * 0.09) * 1.2);
    for (let y = yc; y < 180; y++) {
      const d = y - 18, X = (x - 250) / d, sur = X * 26 + h(Math.floor(X * 26), 1, 40) * 0.4, fr = sur - Math.floor(sur), cs = 1 + Math.floor((y - 60) / 30);
      const tz = h(Math.floor(x / (cs * 2)), Math.floor(y / cs), 41), terron = tz < 0.16, yy = y % cs;
      let l = hoy ? 0.45 + (h(x >> 1, y >> 1, 42) - 0.5) * 0.5 : 0.5 + (fr < 0.45 ? 0.18 : -0.12) + (fr > 0.9 ? -0.2 : 0) + (h(x >> 1, y, 42) - 0.5) * 0.3;
      if (terron) l += yy === 0 ? 0.3 : yy === cs - 1 ? -0.3 : 0.1;
      if (y - yc < 2) l += 0.15;
      let col = a_rampa(AR, l, x, y);
      if (!hoy && est === 'primavera' && fr < 0.2 && h(x, y >> 1, 43) < 0.35) col = h(x, y, 44) < 0.5 ? hex('#6a9a3a') : hex('#8ab84a');
      else if ((!hoy && est !== 'primavera') && h(x, y, 45) < 0.035) col = CP.rastrojo[2];
      else if (hoy && h(x, y >> 1, 46) < 0.12) col = E[3];
      const pr = h(x >> 1, y >> 1, 47); if (pr < 0.012) col = AP.p3; else if (pr < 0.016) col = AP.p0;
      B[y * 320 + x] = col; } }
  // piedrecitas, cascotes de caliza y lascas de sílex con su brillo
  for (let k = 0; k < 60; k++) { const y = 72 + Math.round(h(k, 1, 48) ** 0.8 * 104), x = Math.round(h(k, 2, 48) * 320), s = 1 + Math.round((y - 70) / 34);
    if (k % 5 === 0) { R.rect(x, y - s, x + s, y, AP.negro); R.pset(x + s, y - s, AP.p2); R.pset(x, y - s, C.silexL); } else a_piedra(R, x, y, 2 + s * 2, 1 + s, k); }
  // el moral, cerca a la izquierda, y su sombra
  a_sombraOval(R, 34, 118, 46, 7, 0.4);
  a_moral(R, 26, 114, ep === 1994 ? 50 : 46, ep === 1994 ? 30 : 27, 9, info.hojas);
  // las dos losas pequeñas (la grande se pinta en cada fotograma)
  a_losa(R, 88, 120, 16, 51); a_losa(R, 104, 121, 13, 52); a_losa(R, 226, 114, 22, 53); a_losa(R, 248, 116, 16, 54);
  const m = new Uint8Array(320 * 180); for (let i = 0; i < S.length; i++) m[i] = B[i] === S[i] ? 1 : 0;
  info.m = m; return info;
}

// el zorro en relieve (14 × 7): 1 = su cuerpo, 2 = su lado en luz
const A_ZORRO = ['..............2', '.............12', '2....11111111.1', '12.1111111111..', '.111111111111..', '..1...1....1...', '..1....1....1..'];

function a_relieveZorro(R, x, y, c, cL, cS, dir = 1) {
  A_ZORRO.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const q = f[i]; if (q === '.') continue; const X = dir > 0 ? x + i : x + f.length - 1 - i; R.pset(X, y + j, q === '2' ? cL : c); if (j + 1 >= A_ZORRO.length || A_ZORRO[j + 1][i] === '.') R.pset(X, y + j + 1, cS); } });
}

function a_losas(R, t, o) {
  const ep = o.epoca === 1994 || o.epoca === '1994' ? 1994 : o.epoca === 'hoy' ? 'hoy' : 1963, est = a_est(o), cab = a_lim(o.cabeza ?? 0);
  const info = a_capa(R, 'losas|' + ep + '|' + est, () => a_losasFijo(R, ep, est));
  info.mc ??= a_calma(info.m); a_nubes(R, t, info.mc, 56, 1.2);
  a_pajaros(R, t, 160, 26, 4, 8, 3);
  a_hojas(R, t, info.hojas, 1.2);
  // la lagartija que toma el sol en la losa pequeña: mira a un lado y a otro, y de vez en cuando corre un poco
  { const sal = Math.floor(t / 4) % 2, lx = 96 + sal * 6, ly = 112, gi = Math.sin(t * 3) > 0.6 ? 1 : 0, cL = hex('#7a8a4a');
    R.linea(lx, ly, lx + 6, ly, cL); R.pset(lx + 7, ly - gi, cL); R.pset(lx + 8, ly - gi, hex('#5a6a3a')); R.linea(lx - 1, ly + 1, lx - 4, ly + 1, cL); R.pset(lx + 1, ly + 1, hex('#5a6a3a')); R.pset(lx + 5, ly + 1, hex('#5a6a3a')); R.pset(lx + 3, ly - 1, hex('#a8b870')); }
  // un escarabajo que cruza despacio por la tierra
  { const bx = Math.round(((t * 4) % 360) - 20), by = 164 + Math.round(Math.sin(t * 0.5) * 2); R.rect(bx, by - 1, bx + 2, by, AP.negro); R.pset(bx + 3, by, AP.negro); R.pset(bx + 1, by - 1, AP.p1); if (Math.floor(t * 8) % 2) { R.pset(bx, by + 1, AP.negro); R.pset(bx + 2, by + 1, AP.negro); } }
  // la losa grande: la cabeza de un pilar en T que la tierra va soltando
  a_cabezaPilar(R, t, cab);
  for (const [x, s, a, k] of [[70, 140, 16, 1], [132, 104, 11, 2], [212, 132, 14, 3], [276, 146, 18, 4], [302, 122, 12, 5], [180, 96, 9, 6]]) a_cardo(R, x, s, a, t, k, est);
  a_matas(R, t, [[158, 170, 6], [240, 160, 5], [8, 160, 6]], est);
}
// la cabeza del pilar en T de la cámara 'losas' (x 150–192, y 118–130) y el hoyo que la destapa (c 0–1)
function a_cabezaPilar(R, t, c) {
  const B = R.buf, cx = 172, cy = 132, rx = 22 + c * 12, ry = 6 + c * 9;
  // los montones de tierra que crecen a los lados
  if (c > 0) for (const [mx, sg] of [[cx - rx - 4, -1], [cx + rx + 6, 1]]) { const a = 2 + c * 9, w = 6 + c * 10;
    for (let x = Math.round(mx - w); x <= mx + w; x++) { const f = 1 - ((x - mx) / w) ** 2; if (f <= 0) continue; const top = Math.round(cy + 6 - a * f); for (let y = top; y <= cy + 8; y++) R.pset(x, y, y === top ? hex('#c08a64') : (x - mx) * sg > 0 ? hex('#8a5236') : h(x, y, 63) < 0.2 ? hex('#6e3e28') : hex('#a2663e')); } }
  // el hoyo: tierra húmeda y más oscura cuanto más hondo
  if (c > 0.02) for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
    const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x >> 1, y >> 1, 64) - 0.5) * 0.15; if (e > 1) continue;
    B[y * 320 + x] = e > 0.86 ? (y < cy ? hex('#c08a64') : hex('#5a3020')) : a_rampa([hex('#4a2818'), hex('#5e3420'), hex('#74422a'), hex('#8a5236')], 0.2 + (y - cy + ry) / (2 * ry) * 0.6 + (h(x, y, 65) - 0.5) * 0.3, x, y); }
  // la cara de delante de la cabeza (va saliendo) con el zorro en relieve, y el fuste debajo al final
  const caraH = Math.round(c * 14), y0 = 129;
  if (c > 0.7) { const fH = Math.round((c - 0.7) / 0.3 * 8); R.rect(164, y0 + caraH, 182, y0 + caraH + fH, C.caliza); R.rect(164, y0 + caraH, 165, y0 + caraH + fH, C.calizaL); R.rect(181, y0 + caraH, 182, y0 + caraH + fH, C.calizaS); R.rect(164, y0 + caraH, 182, y0 + caraH, C.calizaD); }
  if (caraH > 0) { for (let y = y0; y < y0 + caraH; y++) for (let x = 155; x <= 193; x++) { const sk = Math.round((x - 155) * -0.08); if (y + sk < y0 - 3) continue; R.pset(x, y + sk, x < 157 ? C.calizaL : x > 191 ? C.calizaS : h(x >> 1, y, 66) < 0.12 ? C.veta : y === y0 + caraH - 1 ? C.calizaS : C.caliza); }
    if (caraH > 9) a_relieveZorro(R, 165, y0 + 2, C.calizaL, hex('#fff6e0'), C.calizaD, 1); }
  // la cara de arriba (la que asomaba entre la tierra), con su grieta, el liquen y los bordes desconchados
  R.poligono([[150, 121], [186, 117], [194, 125], [156, 130]], (x, y) => (h(x >> 1, y, 67) < 0.1 ? C.veta : y < 121 + (x - 150) * -0.11 + 2 ? C.calizaL : C.caliza));
  R.linea(150, 121, 186, 117, C.calizaL); R.linea(156, 130, 194, 125, C.calizaS); R.linea(186, 117, 194, 125, C.calizaS); R.linea(170, 119, 174, 127, C.calizaS); R.pset(160, 123, hex('#c8b860')); R.pset(161, 123, hex('#a8a050')); R.pset(184, 122, hex('#c8b860'));
  // la tierra que todavía la tapa (se retira con c) y los terrones que saltan mientras se cava
  if (c < 1) for (let x = 150; x <= 194; x++) { const tapa = Math.round((1 - c) * (5 + h(x >> 2, 1, 68) * 6)); for (let j = 0; j < tapa; j++) { const y = 130 - Math.round((x - 150) * 0.12) - j; R.pset(x, y, j === tapa - 1 ? hex('#c08a64') : h(x, y, 69) < 0.3 ? hex('#8a5236') : hex('#a2663e')); } }
  if (c > 0 && c < 1) for (let k = 0; k < 5; k++) { const u = (t * 1.3 + k / 5) % 1, sg = k % 2 ? 1 : -1, x = Math.round(cx + sg * (8 + u * (rx + 8))), y = Math.round(cy - 4 - Math.sin(u * Math.PI) * 14); R.pset(x, y, hex('#8a5236')); R.pset(x + 1, y, hex('#a2663e')); }
}

// la piedra seca a hiladas: el color del píxel (x, y) de un muro de lajas de caliza con juntas de barro (alto: alto de
// la hilada; luz: −1 a 1, más clara o más en sombra; T: [junta, sombra, cuerpo, luz, brillo])
const A_MURO = [AP.barro, AP.p1, AP.p2, AP.p3, AP.p4];

function a_muroPx(x, y, sem, alto = 4, luz = 0, P = A_MURO) {
  const fila = Math.floor(y / alto), yy = y - fila * alto, largo = 5 + h(fila, 2, sem) * alto * 2.2, xs = x + h(fila, 1, sem) * 11, pi = Math.floor(xs / largo), xx = xs - pi * largo;
  if (yy === alto - 1 || xx < 1) return h(x, y, sem) < 0.3 ? AP.trS : P[0];
  const v = h(fila, pi, sem + 3), l = 0.45 + (v - 0.5) * 0.5 + luz * 0.25 + (yy === 0 ? 0.3 : yy === alto - 2 ? -0.25 : 0) + (xx < 2 ? 0.12 : xx > largo - 2 ? -0.15 : 0);
  return a_rampa([P[1], P[2], P[3], P[4]], l, x, y);
}

// un pilar en T pequeño de los recintos vistos desde arriba: fuste de ancho w y cabeza 4 px más ancha; se pinta de yt
// (lo alto de la cabeza) a yv (hasta donde llega la tierra que aún lo tapa), sin pasar de yClip(x) (el borde de delante)
function a_pilarMini(R, x, yt, yv, w, hc, central, yClip) {
  const x0 = Math.round(x - w / 2), x1 = x0 + w - 1, hw = central ? 3 : 2;
  for (let y = Math.round(yt); y <= Math.round(yv); y++) {
    const cab = y - yt < hc, a = cab ? x0 - hw : x0, b = cab ? x1 + hw : x1;
    for (let px = a; px <= b; px++) { if (y > yClip(px)) continue;
      let c = px >= b ? C.calizaS : px <= a ? C.calizaL : y === Math.round(yt) ? AP.p4 : h(px, y >> 1, 81) < 0.12 ? C.veta : C.caliza;
      if (cab && y - yt === hc - 1 && (px < x0 || px > x1)) c = C.calizaD;
      if (central && !cab && (px === x0 + 1 || px === x1 - 1) && y - yt > hc + 1) c = C.calizaL;   // los brazos en relieve
      if (central && !cab && y - yt === hc + Math.round((yv - yt) * 0.45) && px > x0 && px < x1) c = C.calizaD;   // las manos
      R.pset(px, y, c); }
    if (y > yt + 2 && y <= yClip(a - 1)) R.pset(a - 1, y, C.calizaD);
  }
}

// los recintos: centro, radios del óvalo, hondo (px), desde qué o.anos se abren, cuántos pilares en el anillo, su alto, y
// L: lo hondo que queda la tierra de relleno antes de excavar (justo por debajo de las cabezas de los pilares)
const A_RECINTOS = [
  { cx: 262, cy: 66, rx: 36, ry: 12, D: 20, ini: 0.3, n: 7, hp: 15, sem: 1, L: 9 },
  { cx: 58, cy: 72, rx: 46, ry: 15, D: 24, ini: 0.12, n: 8, hp: 18, sem: 2, L: 10 },
  { cx: 163, cy: 86, rx: 70, ry: 30, D: 34, ini: 0.04, n: 11, hp: 29, sem: 3, centrales: [150, 176], hc: 30, L: 9 },
  { cx: 52, cy: 116, rx: 34, ry: 11, D: 18, ini: 0.5, n: 6, hp: 13, sem: 4, L: 9 },
];
const a_estado = (r, A, rel = true) => { const e = a_lim((A - r.ini) / 0.5);
  if (rel) return { e, s: 1, Dc: r.L + (r.D - r.L) * a_suave(e * 1.15) };
  return { e, s: e > 0 ? 0.3 + 0.7 * Math.min(1, e * 1.5) : 0, Dc: e > 0 ? r.D * Math.min(1, 0.18 + e) : 0 }; };
function a_excavFijo(R, A, cub, rel) {
  const B = R.buf, HOR = 32, info = { centrales: null };
  a_cieloGrad(B, 0, HOR + 1, A_CIELO); a_sol(R, 236, 16, 4);
  const S = B.slice(0, 320 * (HOR + 1));
  a_sierra(R, HOR, 7); a_campos(B, HOR, HOR, 42, 'verano', 7);
  // la tierra del cerro: rojiza y polvorienta, con estepa en los bordes y piedras sueltas
  const T4 = [C.tierraS, C.tierra, C.tierraL, hex('#d4a47c')];
  for (let y = 38; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (y < 42 && a_U(x, y) > (y - 38) / 4) continue;
    const borde = Math.min(1, Math.min(x, 319 - x) / 30) * Math.min(1, (y - 38) / 14), n = h(x >> 2, y >> 1, 82) * 0.6 + h(x >> 3, y >> 2, 83) * 0.4;
    let c = borde < 0.6 && h(x >> 1, y >> 1, 84) > borde ? a_rampa(A_ESTEPA.verano, 0.3 + n * 0.6, x, y) : a_rampa(T4, 0.25 + n * 0.55, x, y);
    if (h(x, y, 85) < 0.02) c = AP.p3; B[y * 320 + x] = c; }
  // los primeros años: la tierra arada en surcos que se borran, losas rotas por la superficie y el moral (siempre)
  if (A < 0.5) for (let y = 46; y < 134; y++) for (let x = 0; x < 320; x++) if (Math.floor(y * 0.9 + Math.sin(x * 0.02) * 3) % 3 === 0 && a_U(x, y) < (0.5 - A) * 1.6) B[y * 320 + x] = a_mezcla(B[y * 320 + x], C.tierraS, 0.5);
  // las sendas pisadas entre los recintos (más claras, con pisadas), las grietas de la tierra seca, matas y guijarros
  for (const [x0, y0, x1, y1, x2, y2] of [[20, 134, 96, 98, 120, 50], [300, 134, 246, 96, 214, 50], [110, 134, 160, 124, 236, 132], [0, 92, 60, 96, 110, 92]]) {
    for (let i = 0; i <= 160; i++) { const u = i / 160, x = (1 - u) ** 2 * x0 + 2 * u * (1 - u) * x1 + u * u * x2, y = (1 - u) ** 2 * y0 + 2 * u * (1 - u) * y1 + u * u * y2, w = 1.5 + (y - 40) * 0.025;
      for (let dx = -Math.ceil(w); dx <= Math.ceil(w); dx++) { const px = Math.round(x + dx), py = Math.round(y); if (px < 0 || px > 319 || py < 42 || py > 135) continue; const j = py * 320 + px;
        B[j] = Math.abs(dx) > w - 0.6 ? a_mezcla(B[j], T4[3], 0.35) : h(px, py, 143) < 0.08 ? C.tierraS : a_rampa([C.tierra, C.tierraL, T4[3]], 0.55 + (h(px >> 1, py, 144) - 0.5) * 0.5, px, py); }
      if (i % 9 === 0) { const px = Math.round(x + (i % 18 ? 1 : -1)), py = Math.round(y); if (py > 42 && py < 135) R.pset(px, py, C.tierraS); } } }
  for (let k = 0; k < 150; k++) { let x = h(k, 1, 145) * 320, y = 46 + h(k, 2, 145) * 86, a = h(k, 3, 145) * 6.28;
    for (let j = 0; j < 4 + h(k, 4, 145) * 7; j++) { const px = Math.round(x), py = Math.round(y); if (px >= 0 && px < 320 && py > 42 && py < 134) { const i = py * 320 + px; B[i] = a_mezcla(B[i], hex('#6e3e28'), 0.55); if (py + 1 < 134) B[i + 320] = a_mezcla(B[i + 320], T4[3], 0.3); } a += (h(k, j, 146) - 0.5) * 1.4; x += Math.cos(a); y += Math.sin(a) * 0.5; } }
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 147) * 316), y = 46 + Math.round(h(k, 2, 147) * 86), E = A_ESTEPA.verano;
    if (k % 3) { R.pset(x, y, AP.p4); R.pset(x + 1, y, AP.p3); R.pset(x, y + 1, AP.sombra); R.pset(x + 1, y + 1, AP.sombra); continue; }
    R.pset(x, y, E[1]); R.pset(x - 1, y - 1, E[2]); R.pset(x + 1, y - 1, E[0]); R.pset(x, y - 2, E[2]); R.linea(x - 1, y + 1, x + 2, y + 1, AP.sombra); }
  for (let k = 0; k < 14 - Math.round(A * 10); k++) a_losa(R, 20 + Math.round(h(k, 1, 142) * 280), 50 + Math.round(h(k, 2, 142) * 80), 5 + Math.round(h(k, 3, 142) * 5), k + 60);
  { const hojas = []; a_sombraOval(R, 6, 52, 18, 3, 0.4); a_moral(R, 14, 50, 17, 12, 11, hojas); info.hojas = hojas; }
  // los montones de tierra sacada, que crecen con los años (lejos, detrás de los recintos)
  for (const [mx, my, w0] of [[30, 50, 22], [118, 48, 26], [206, 47, 20]]) { const w = w0 * (0.4 + A * 0.8), a = 4 + A * 8;
    for (let x = Math.round(mx - w); x <= mx + w; x++) { const f = 1 - ((x - mx) / w) ** 2; if (f <= 0) continue; const top = Math.round(my - a * Math.sqrt(f)); for (let y = top; y <= my + 2; y++) R.pset(x, y, y === top ? hex('#e0c098') : x > mx ? a_rampa(T4, 0.75, x, y) : a_rampa(T4, 0.45 + (h(x, y, 86) - 0.5) * 0.4, x, y)); } }
  // la cuadrícula de cuerdas con sus estacas sobre la tierra sin excavar
  for (let gy = 54; gy <= 132; gy += 26) R.linea(4, gy, 316, gy - 2, (x, y, k) => (k % 2 ? AP.cuerda ?? C.cuerda : null));
  for (let gx = 22; gx < 320; gx += 38) { R.linea(gx, 46, gx - 4, 134, (x, y, k) => (k % 2 ? C.cuerda : null)); for (let gy = 54; gy <= 132; gy += 26) { const yy = gy - Math.round(gx / 160), xx = gx - Math.round((gy - 46) / 22); R.pset(xx, yy - 1, C.etiqueta); R.pset(xx, yy, AP.madera); } }
  // los recintos, de atrás adelante: el hoyo (cara de muro de piedra seca detrás, el suelo de roca) y sus pilares
  for (const r of A_RECINTOS) {
    const { e, s, Dc } = a_estado(r, A, rel); if (e <= 0 && !rel) continue;
    const fondo = Dc >= r.D - 1.5, ex = rel ? a_lim((Dc - r.L) / (r.D - r.L)) : 1;   // ¿se ve ya el suelo de roca? ¿cuánto muro se ha destapado?
    const rx = r.rx * s, ry = r.ry * s, en = (x, y, dy) => ((x - r.cx) / rx) ** 2 + ((y - r.cy - dy) / ry) ** 2 + (h(x >> 2, y >> 2, r.sem) - 0.5) * 0.06 <= 1;
    const yClip = (x) => { const q = 1 - ((x - r.cx) / rx) ** 2; return q <= 0 ? -1 : r.cy + ry * Math.sqrt(q); };
    for (let y = Math.floor(r.cy - ry - 1); y <= Math.ceil(r.cy + ry + 1); y++) for (let x = Math.floor(r.cx - rx - 1); x <= Math.ceil(r.cx + rx + 1); x++) {
      if (x < 0 || x > 319 || y < 0 || y > 179 || !en(x, y, 0)) continue;
      let c;
      if (en(x, y, Dc)) { const cerca = !en(x, y - 2, Dc), l = 0.5 + (h(x >> 1, y, r.sem + 7) - 0.5) * 0.35 - (cerca && x > r.cx - rx * 0.3 ? 0.3 : 0);   // el suelo, en sombra junto al muro de la derecha
        if (fondo) { c = a_rampa([C.calizaD, C.calizaS, C.veta, C.caliza], l, x, y); if (h(x, y, r.sem + 8) < 0.03) c = AP.p3; }
        else {   // la tierra de relleno: más oscura y suelta, con cascotes de caliza, sílex y alguna mata
          const q = h(x >> 1, y >> 1, r.sem + 9); c = a_rampa([hex('#6e3e28'), C.tierraS, C.tierra, C.tierraL], l + 0.05 + (q - 0.5) * 0.3 - (cerca ? 0.22 : 0) - ex * 0.15, x, y);
          if (q < 0.035) c = (y & 1) ? AP.p3 : AP.p4; else if (h(x, y, r.sem + 10) < 0.012) c = AP.negro; else if (e <= 0 && h(x >> 1, y, r.sem + 11) < 0.06) c = A_ESTEPA.verano[h(x, y, 12) < 0.5 ? 0 : 3]; } }
      else { const prof = (y - (r.cy - ry * Math.sqrt(Math.max(0, 1 - ((x - r.cx) / rx) ** 2)))) / Math.max(1, Dc), luz = -(x - r.cx) / rx * 0.8 - 0.2;
        c = prof < 0.28 + 0.72 * (1 - ex) ? a_rampa(T4, 0.3 + luz * (0.1 + ex * 0.1) + (Math.floor(y * 0.8) % 3 === 0 ? -0.2 * ex : 0) + (h(x, y, 87) - 0.5) * 0.3 + (1 - ex) * 0.12, x, y) : a_muroPx(x, y, r.sem, 3, luz); }
      if (!en(x, y - 1, 0)) c = hex('#e0b48c');   // el borde de arriba, con luz
      // la corona del muro que asoma en el borde mientras el recinto sigue lleno: lajas de caliza a ras de tierra
      if (ex < 0.5 && !en(x, y - 2, 0) && h(x >> 2, y >> 1, r.sem + 13) < 0.55) c = !en(x, y - 1, 0) ? AP.p4 : AP.p2;
      B[y * 320 + x] = c; }
    // escaleras de mano que bajan al hoyo
    if (Dc > 10) { const lx = Math.round(r.cx - rx * 0.4), ly = Math.round(r.cy - ry * 0.86); for (const dx of [0, 3]) R.linea(lx + dx, ly - 2, lx + dx + 2, ly + Dc - 4, AP.maderaL); for (let k = 2; k < Dc - 4; k += 3) R.linea(lx + Math.round(k / Dc * 2), ly + k - 2, lx + 3 + Math.round(k / Dc * 2), ly + k - 2, AP.maderaS); }
    // los pilares: los del anillo (los de delante quedan bajo el borde) y los dos centrales
    const pil = [];
    for (let k = 0; k < r.n; k++) { const a = (k + 0.5) / r.n * Math.PI * 2 + 0.3, ux = Math.cos(a) * 0.82, uy = Math.sin(a) * 0.82; if (uy > 0.5 || ux * ux + uy * uy > s * s * 1.02) continue; pil.push([r.cx + ux * r.rx, r.cy + uy * r.ry, 5, r.hp, false]); }
    if (r.centrales) for (const cx of r.centrales) pil.push([cx, r.cy, 7, r.hc, true]);
    pil.sort((p, q) => p[1] - q[1]);
    for (const [px, py, w, hp, cen] of pil) { const yb = py + r.D, yt = yb - hp, yv = py + Dc; if (yv <= yt + 1) continue;
      // la sombra del pilar en el suelo, hacia la izquierda
      for (let k = 1; k <= 4; k++) for (let j = 0; j < 2; j++) { const sx = Math.round(px - w / 2 - k), sy = Math.round(Math.min(yv, yb) - j); if (en(sx, sy, Dc) && sy <= yClip(sx)) R.pset(sx, sy, C.calizaD); }
      a_pilarMini(R, px, yt, Math.min(yv, yb), w, cen ? 5 : 3, cen, yClip);
      if (cen) info.centrales = (info.centrales ?? []).concat([[Math.round(px), Math.round(yt)]]); }
  }
  // las catas del principio (1995): dos zanjas rectangulares con el tope de un pilar
  // (no hacen falta: el recinto D y el C ya se abren desde 0 como dos hoyos pequeños)
  // carretillas, cubos, tamices y sacos alrededor (más cuantos más años)
  const cosas = [[110, 58, 'carretilla'], [214, 60, 'sacos'], [98, 122, 'tamiz'], [238, 118, 'cubos'], [18, 96, 'sacos'], [284, 92, 'carretilla'], [190, 126, 'cubos'], [132, 128, 'tamiz'], [300, 120, 'sacos']];
  cosas.forEach(([x, y, q], k) => { if (k > 2 + A * 8) return; a_trasto(R, x, y, q); });
  // la estación topográfica sobre su trípode, una manguera enrollada y unas cajas de hallazgos en el testigo de delante
  R.linea(262, 132, 266, 122, AP.p0); R.linea(270, 132, 266, 122, AP.p0); R.linea(266, 132, 266, 122, AP.p1); R.rect(264, 118, 268, 121, hex('#e8c040')); R.rect(265, 119, 267, 119, AP.cristal); R.linea(261, 133, 271, 133, AP.sombra);
  for (let a = 0; a < 6.28 * 2; a += 0.08) { const r = 3 + a * 0.35; R.pset(Math.round(78 + Math.cos(a) * r), Math.round(130 + Math.sin(a) * r * 0.4), AP.verdeC); }
  for (let k = 0; k < 3; k++) { const cx = 146 + k * 9, cy = 134 - (k === 2 ? 0 : 0), col = k % 2 ? AP.naranja : AP.azul; R.rect(cx, cy - 4, cx + 7, cy, col); R.rect(cx, cy - 4, cx + 7, cy - 4, a_mezcla(col, AP.blanco, 0.4)); R.rect(cx + 2, cy - 2, cx + 5, cy - 1, C.etiqueta); R.linea(cx, cy + 1, cx + 8, cy + 1, AP.sombra); }
  // en el testigo de delante: una lona azul sujeta con piedras, tablones apilados, un bidón de agua y jalones de colores
  { for (let y = 120; y <= 128; y++) for (let x = 196; x <= 226; x++) { const l = 0.5 + Math.sin(x * 0.4 + y * 0.9) * 0.18 + (y === 120 ? 0.3 : 0) + (x === 226 ? -0.3 : 0); R.pset(x - Math.round((y - 120) * 0.3), y, a_rampa([AP.azulS, AP.azul, AP.azulL], l, x, y)); }
    R.linea(193, 129, 224, 129, AP.sombra); for (const [x, y] of [[198, 121], [224, 121], [195, 128], [221, 128]]) a_piedra(R, x, y, 4, 2, x); }
  for (let k = 0; k < 4; k++) { const y = 131 - k * 2; R.rect(276 + k, y - 1, 300 - k, y, k % 2 ? AP.maderaL : AP.madera); R.pset(300 - k, y, AP.maderaS); } R.linea(275, 132, 301, 132, AP.sombra);
  R.rect(110, 117, 116, 125, AP.azulS); R.rect(110, 117, 116, 118, AP.azulL); R.rect(110, 121, 116, 121, AP.azul); R.rect(112, 115, 114, 116, AP.p0); R.linea(109, 126, 118, 126, AP.sombra);
  for (const [x, y, c] of [[92, 104], [236, 82], [128, 56], [300, 104], [12, 118]].map(([x, y], k) => [x, y, k % 2 ? AP.rojo : hex('#e8d040')])) { for (let j = 0; j < 9; j++) R.pset(x, y - j, Math.floor(j / 2) % 2 ? c : AP.blanco); R.pset(x - 1, y + 1, AP.sombra); R.pset(x + 1, y + 1, AP.sombra); }
  // los toldos de lona sobre postes (antes de la cubierta)
  if (!cub && A > 0.1) for (const [x0, y0] of [[198, 40], [26, 58]]) { for (const dx of [0, 26]) R.linea(x0 + dx, y0, x0 + dx, y0 + 14, AP.maderaS); R.rect(x0 - 2, y0 - 3, x0 + 28, y0, AP.blanco); R.rect(x0 - 2, y0, x0 + 28, y0, AP.memS); for (let x = x0 - 2; x <= x0 + 28; x += 4) R.pset(x, y0 - 3, AP.memM); }
  // la pasarela de madera de delante (y 136–160) y la ladera de cascotes debajo
  for (let y = 136; y <= 160; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor((y - 136) / 3), yy = (y - 136) % 3, xs = x + fila * 17, tab = Math.floor(xs / 46);
    let c = yy === 2 ? AP.maderaS : (xs % 46 === 0 ? AP.trS : a_rampa([AP.maderaS, AP.madera, AP.maderaL], 0.5 + (h(tab, fila, 88) - 0.5) * 0.5 + (yy === 0 ? 0.2 : 0) + (h(x >> 2, y, 89) < 0.15 ? -0.3 : 0), x, y));
    if (y < 138) c = y === 136 ? AP.maderaL : AP.maderaS; if (y > 158) c = AP.trS; B[y * 320 + x] = c; }
  for (let x = 6; x < 320; x += 20) { R.pset(x, 137, AP.p2); R.pset(x + 10, 155, AP.p2); }
  for (let y = 161; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = h(x, y, 90) < 0.06 ? AP.p3 : a_rampa(T4, 0.2 + h(x >> 1, y >> 1, 91) * 0.5 + (y < 164 ? -0.25 : 0), x, y);
  for (let x = 0; x < 320; x++) { R.pset(x, 161, AP.sombra); if (h(x >> 1, 1, 149) < 0.5) R.pset(x, 162, AP.sombra); }   // la sombra de la pasarela
  for (let k = 0; k < 16; k++) a_piedra(R, Math.round(h(k, 1, 150) * 320), 167 + Math.round(h(k, 2, 150) * 12), 4 + Math.round(h(k, 3, 150) * 5), 2 + (k % 2), k + 80);
  // la cubierta: la membrana vista por debajo, con su borde festoneado, las costuras y los pilares de acero
  if (cub) {
    const borde = (x) => 30 + Math.round(6 * Math.sin(Math.PI * ((x / 80) % 1)));
    for (let x = 0; x < 320; x++) { const e = borde(x); for (let y = 0; y <= e; y++) { const cx = Math.floor(x / 80) * 80 + 40, ang = Math.atan2(y + 30, x - cx), cos = Math.floor((ang + 3.2) * 9) !== Math.floor((Math.atan2(y + 30, x + 1 - cx) + 3.2) * 9);
      const l = 0.55 + (y / e) * 0.25 - Math.abs(x - cx) / 80 * 0.2 + (cos ? -0.15 : 0); B[y * 320 + x] = y >= e - 1 ? AP.mem : a_rampa([AP.memD, AP.memS, AP.memM], l, x, y); } }
    for (const px of [22, 102, 182, 262]) { const e = borde(px); for (let y = e; y <= 58; y++) { R.pset(px, y, AP.mastil); R.pset(px + 1, y, AP.p2); R.pset(px - 1, y, AP.negro); } R.rect(px - 3, 57, px + 3, 59, AP.p1); R.linea(px - 3, 60, px + 3, 60, AP.sombra);
      R.linea(px, e + 2, px - 10, e - 3, AP.mastil); R.linea(px, e + 2, px + 10, e - 3, AP.mastil); }
    // la pasarela de atrás, bajo la cubierta, por donde pasan los visitantes
    for (let x = 0; x < 320; x++) { R.pset(x, 44 - Math.round(x / 160), AP.maderaL); R.pset(x, 45 - Math.round(x / 160), AP.maderaS); if (x % 10 === 0) R.linea(x, 40 - Math.round(x / 160), x, 44, AP.madera); }
    R.linea(0, 40, 319, 38, AP.madera);
  }
  const m = new Uint8Array(320 * 180); if (!cub) for (let i = 0; i < S.length; i++) m[i] = B[i] === S[i] ? 1 : 0;
  info.m = m; return info;
}
// los trastos de la excavación: una carretilla, cubos de goma, un tamiz sobre patas, sacos apilados
function a_trasto(R, x, y, q) {
  if (q === 'carretilla') { R.rect(x - 4, y - 4, x + 3, y - 2, AP.verdeC); R.rect(x - 4, y - 4, x + 3, y - 4, hex('#5aaa7a')); R.rect(x - 3, y - 5, x + 2, y - 5, hex('#c08a64')); R.disco(x + 4.5, y - 0.5, 1.5, AP.rueda); R.linea(x - 4, y - 2, x - 8, y - 1, AP.p0); R.pset(x - 3, y, AP.p0); R.linea(x - 5, y + 1, x + 6, y + 1, AP.sombra); }
  else if (q === 'cubos') for (const [dx, dy] of [[0, 0], [5, 1], [2, 3]]) { R.rect(x + dx, y + dy - 3, x + dx + 3, y + dy, AP.negro); R.rect(x + dx, y + dy - 3, x + dx + 3, y + dy - 3, AP.p0); R.pset(x + dx + 1, y + dy - 2, hex('#a2663e')); R.linea(x + dx - 1, y + dy + 1, x + dx + 3, y + dy + 1, AP.sombra); }
  else if (q === 'tamiz') { R.linea(x - 5, y, x - 3, y - 6, AP.madera); R.linea(x + 5, y, x + 3, y - 6, AP.madera); R.rect(x - 6, y - 7, x + 6, y - 6, AP.maderaL); for (let i = -5; i <= 5; i += 2) R.pset(x + i, y - 6, AP.p1); R.rect(x - 3, y - 1, x + 3, y, hex('#c08a64')); }
  else { for (const [dx, dy] of [[0, 0], [6, 0], [3, -3]]) { R.rect(x + dx, y + dy - 3, x + dx + 5, y + dy, AP.blanco); R.rect(x + dx, y + dy - 1, x + dx + 5, y + dy, AP.memS); R.pset(x + dx + 2, y + dy - 4, AP.memS); } R.linea(x - 1, y + 1, x + 11, y + 1, AP.sombra); }
}

function a_excavacion(R, t, o) {
  const A = Math.round(a_lim(o.anos ?? 1) * 32) / 32, cub = o.cubierta ?? A >= 0.85;
  const rel = o.relleno ?? true;
  const info = a_capa(R, 'exc|' + A + '|' + (cub ? 1 : 0) + '|' + (rel ? 1 : 0), () => a_excavFijo(R, A, cub, rel));
  if (!cub) { info.mc ??= a_calma(info.m); a_nubes(R, t, info.mc, 32, 1.3); a_pajaros(R, t, 90, 22, 3, 6, 5); }
  a_hojas(R, t, info.hojas);
  // los trabajadores: en el fondo de los hoyos (cavan, raspan, criban) y por los testigos (llevan cubos de ida y vuelta)
  let k = 0;
  for (const r of A_RECINTOS) { const { e, s, Dc } = a_estado(r, A, rel); if (e <= 0 || Dc < 7) continue;
    for (const [ux, uy, acc] of [[-0.45, -0.2, 'cava'], [0.35, -0.05, 'agacha'], [0.05, 0.25, 'criba']]) { if (r.rx * s < 20 && acc === 'criba') continue;
      const x = r.cx + ux * r.rx * s, y = r.cy + uy * r.ry * s + Dc - 1;
      a_gente(R, x, y, t, k++, acc, ux < 0 ? 1 : -1);
      if (acc === 'cava' && Math.sin(t * 4 + k) < -0.6) for (let j = 0; j < 3; j++) R.pset(Math.round(x + 6 + j), Math.round(y - 1 - j), hex('#c8946a')); } }
  for (let j = 0; j < (A > 0.3 ? 3 : 1); j++) { const per = 14 + j * 3, u = ((t + j * 5) % per) / per, ida = u < 0.5, f = ida ? u * 2 : 2 - u * 2, y = [128, 52, 130][j], x = [40, 60, 200][j] + f * [120, 140, 100][j];
    a_gente(R, x, y, t, 10 + j, ida ? 'cubo' : 'anda', ida ? 1 : -1); }
  if (cub) for (let j = 0; j < 4; j++) { const u = ((t * 0.04 + j * 0.27) % 1), x = j % 2 ? 320 - u * 340 : u * 340 - 20; a_gente(R, x, 43 - Math.round(x / 160), t, 20 + j, 'anda', j % 2 ? -1 : 1); }
  // el polvo fino que sueltan los tamices al cribar y que se lleva el viento a la derecha
  for (const [tx, ty] of A >= 0.625 ? [[98, 122], [132, 128]] : [[98, 122]]) for (let k = 0; k < 7; k++) { const v = (t * 0.6 + k / 7) % 1, x = Math.round(tx + v * 16 + Math.sin(t * 3 + k) * 1.5), y = Math.round(ty - 7 - v * 6); if (h(k, Math.floor(t * 4), 148) < 0.75) R.pset(x, y, v < 0.5 ? hex('#e0c098') : AP.halo); }
  // el banderín de la estación topográfica y los jalones que tiemblan con el viento
  { const fl = Math.sin(t * 5); for (let i = 0; i < 5; i++) for (let j = 0; j < 3 - (i >> 1); j++) R.pset(269 + i, 114 + j + Math.round(Math.sin(t * 7 + i) * fl * 0.6), i > 3 ? AP.rojo : hex('#ff6a4a')); R.linea(268, 113, 268, 118, AP.p0); }
  // los bordes de la lona que ondean
  for (let x = 196; x <= 226; x += 2) if (Math.sin(t * 4 + x * 0.5) > 0.4) R.pset(x, 119, AP.azulL);
  return { centrales: info.centrales };
}
// el barandal de la pasarela, por delante de los personajes (pasamanos en y 147, postes cada 40 px hasta y 168)
function a_barandal(R) {
  for (let x = 0; x < 320; x++) { R.pset(x, 147, AP.maderaL); R.pset(x, 148, AP.madera); R.pset(x, 149, AP.maderaS); R.pset(x, 157, AP.madera); R.pset(x, 158, AP.maderaS); }
  for (let x = 10; x < 320; x += 40) { R.rect(x, 146, x + 2, 168, AP.madera); R.rect(x, 146, x, 168, AP.maderaL); R.rect(x + 2, 146, x + 2, 168, AP.maderaS); R.rect(x - 1, 145, x + 3, 146, AP.maderaL); R.pset(x + 1, 152, AP.p1); }
}

// la superficie de la ladera (arriba del perfil): más alta a la izquierda, por donde baja el barro
const A_SUP = (x) => 34 + x * 0.045 + Math.sin(x * 0.05) * 2;

// los límites de las capas del perfil (y de abajo de cada una) en la columna x
const A_CAPAS_C = [
  (x) => A_SUP(x) + 5,
  (x) => 56 + x * 0.03 + Math.sin(x * 0.04 + 1) * 3,
  (x) => 78 + x * 0.02 + Math.sin(x * 0.03 + 2) * 4,
  (x) => (x > 54 && x < 236 ? 78 + x * 0.02 + Math.sin(x * 0.03 + 2) * 4 + 5 * Math.sin(Math.PI * (x - 54) / 182) : 78 + x * 0.02 + Math.sin(x * 0.03 + 2) * 4),
  (x) => 108 + Math.sin(x * 0.035) * 3 - x * 0.015,
  (x) => 130 + Math.sin(x * 0.06) * 2,
  () => 144,
];

const A_CAPA_COL = [[hex('#4a3020'), hex('#5e3e28'), hex('#7a5638')], [C.tierraS, C.tierra, C.tierraL], [hex('#8a5a3c'), hex('#a06a46'), hex('#b8845a')], [AP.ceniza, AP.cenizaL, hex('#e6e2da')], [hex('#6e4a34'), hex('#86603e'), hex('#9e7650')], [hex('#7a5a40'), hex('#94704e'), hex('#ac8a64')], [C.calizaS, C.caliza, C.calizaL]];

function a_capaDe(x, y) { for (let k = 0; k < A_CAPAS_C.length; k++) if (y < A_CAPAS_C[k](x)) return k; return A_CAPAS_C.length - 1; }

// el pilar inclinado del corte: coordenadas del pilar (u a lo ancho, v a lo alto desde la base) → color o null
const A_INC = 0.13;

function a_pilarCorte(u, v, x, y) {
  const cab = v > 76 && v <= 94, fuste = v >= 0 && v <= 76;
  if (!(cab && Math.abs(u) <= 17) && !(fuste && Math.abs(u) <= 9)) return null;
  const w = cab ? 17 : 9; let l = 0.55 - u / w * 0.3 + (h(Math.round(u) >> 1, Math.round(v) >> 1, 92) - 0.5) * 0.2;
  if (Math.abs(u) > w - 1) l -= 0.35; if (cab && v > 93) l += 0.3; if (cab && v < 78) l -= 0.3;
  if (fuste && Math.abs(Math.abs(u) - 6) < 1 && v > 30 && v < 72) l += Math.sign(-u) * 0.3 + 0.1;   // los brazos
  if (fuste && v > 27 && v < 31 && Math.abs(u) < 6 && Math.round(u) % 2 === 0) l -= 0.3;   // los dedos de las manos
  if (fuste && v > 20 && v < 25) l += v > 23 ? 0.3 : -0.3;   // el cinturón
  if (fuste && v > 8 && v < 20 && Math.abs(u) < 3 + (20 - v) * 0.2) l += 0.15;   // el taparrabos de piel de zorro
  if (fuste && v > 44 && v < 54 && u > -4 && u < 5 && (Math.round(u + v) % 3 !== 0 || v < 47)) l += (v > 52 ? -0.25 : 0.25);   // el zorro que salta
  return a_rampa([C.calizaD, C.calizaS, C.caliza, C.calizaL], l, x, y);
}

function a_corteFijo(R) {
  const B = R.buf;
  // el perfil: cada capa con su textura (raíces arriba, cascotes, ceniza en lente, sílex)
  for (let x = 0; x < 320; x++) { const ys = Math.round(A_SUP(x));
    for (let y = ys; y < 146; y++) { const k = a_capaDe(x, y), P = A_CAPA_COL[k];
      let l = 0.45 + (h(x >> 1, y, 93 + k) - 0.5) * 0.45 - (x > 180 ? (x - 180) / 400 : 0);
      if (k === 0 && h(x, y >> 1, 94) < 0.08) l = 0;
      if (k === 3) l += Math.sin(x * 0.2 + y) * 0.15;
      let c = a_rampa(P, l, x, y);
      if (k === 0 && y === ys) c = hex('#8a9a4a');
      if ((k === 4 || k === 1) && h(x, y, 95) < 0.012) c = AP.negro;
      B[y * 320 + x] = c; } }
  // raíces que bajan del mantillo
  for (let k = 0; k < 14; k++) { let x = h(k, 1, 96) * 320, y = A_SUP(x) + 2; for (let j = 0; j < 8 + h(k, 2, 96) * 14; j++) { R.pset(Math.round(x), Math.round(y), hex('#c8a880')); x += (h(k, j, 97) - 0.5) * 1.6; y += 1; } }
  // los cascotes de caliza de las capas de escombro y las lascas de sílex
  for (let k = 0; k < 170; k++) { const x = Math.round(h(k, 1, 98) * 320), y = Math.round(50 + h(k, 2, 98) * 92), cap = a_capaDe(x, y); if (cap !== 2 && cap !== 5 && !(cap === 4 && k % 3 === 0)) continue;
    const w = cap === 5 ? 3 + Math.round(h(k, 3, 98) * 4) : 2 + Math.round(h(k, 3, 98) * 3), a = Math.max(1, Math.round(w * 0.6));
    if (cap === 4) { R.rect(x, y, x + 2, y + 1, AP.negro); R.pset(x + 2, y, C.silexL); continue; }
    for (let j = 0; j <= a; j++) for (let i = 0; i <= w; i++) { if ((i === 0 || i === w) && (j === 0 || j === a)) continue; R.pset(x + i, y + j, j === 0 ? AP.p4 : j === a ? AP.p1 : i === w ? AP.p2 : AP.p3); }
    R.linea(x + 1, y + a + 1, x + w, y + a + 1, hex('#5a3a28')); }
  // el cordel de nivel con sus clavos y las etiquetas de cada capa, con su número
  R.linea(36, 66, 318, 63, (x, y, k) => (k % 7 === 0 ? null : C.cuerda)); for (const x of [40, 180, 314]) { R.pset(x, 65 - Math.round(x / 110), AP.llanta); R.pset(x, 66 - Math.round(x / 110), AP.p0); }
  for (const xe of [134, 284]) for (let k = 1; k < 7; k++) { const ya = Math.round((A_CAPAS_C[k - 1](xe) + A_CAPAS_C[k](xe)) / 2) - 2 + (k === 4 ? 2 : 0); if (xe > 250 && k === 4) continue;
    R.rect(xe, ya, xe + 8, ya + 6, C.etiqueta); R.rect(xe, ya + 6, xe + 8, ya + 6, AP.p1); R.pset(xe + 1, ya + 1, AP.llanta); a_cifras3(R, String(k), xe + 4, ya + 1, AP.negro); }
  // el muro de piedra seca cortado a la izquierda
  for (let y = 46; y < 146; y++) for (let x = 0; x <= 34 - Math.round((y - 46) * -0.02) + (h(y >> 2, 1, 99) < 0.4 ? 1 : 0); x++) B[y * 320 + x] = a_muroPx(x, y, 9, 5, x > 28 ? 0.6 : 0.1 - (34 - x) / 80);
  for (let x = 0; x <= 35; x++) { R.pset(x, 45, AP.p4); R.pset(x, 46, AP.p3); }
  // el suelo del recinto: tierra pisada clara, cascotes y pisadas
  for (let y = 144; y < 180; y++) for (let x = 0; x < 320; x++) { let c = a_rampa([C.calizaS, C.veta, C.caliza, C.calizaL], 0.3 + h(x >> 2, y >> 1, 100) * 0.5 + (y < 147 ? -0.3 : 0), x, y); if (h(x, y, 101) < 0.015) c = AP.p1; B[y * 320 + x] = c; }
  for (let k = 0; k < 8; k++) { const x = 40 + k * 18 + (k % 2) * 4, y = 158 + (k % 2) * 6; R.rect(x, y, x + 2, y + 1, C.calizaS); }
  // el pilar inclinado
  const bx = 226, by = 146, ca = Math.cos(A_INC), sa = Math.sin(A_INC);
  for (let y = 40; y < 147; y++) for (let x = 190; x < 290; x++) { const dx = x - bx, dy = y - by, u = dx * ca + dy * sa, v = dx * sa - dy * ca, c = a_pilarCorte(u, v, x, y); if (c != null) B[y * 320 + x] = c; }
  // la sombra del pilar en el suelo
  for (let x = 196; x < 222; x++) R.pset(x, 146 + (x % 3 === 0 ? 1 : 0), C.calizaD);
  // las vigas que lo apuntalan (por detrás de la gente) y la cuña de la base
  a_viga(R, 304, 150, 256, 70, 4); a_viga(R, 290, 150, 246, 104, 3);
  R.poligono([[236, 146], [246, 146], [246, 141]], AP.maderaL); R.linea(236, 147, 247, 147, AP.maderaS);
  // cubos, una paleta y la criba en el suelo
  a_trasto(R, 150, 154, 'cubos'); a_trasto(R, 174, 160, 'tamiz');
  R.linea(130, 162, 136, 160, AP.llanta); R.linea(136, 160, 139, 159, AP.maderaS); R.pset(129, 162, AP.p4);
  return {};
}

// una viga de madera con su veta, de (x0, y0) a (x1, y1), de grueso g
function a_viga(R, x0, y0, x1, y1, g) {
  const L = Math.hypot(x1 - x0, y1 - y0), nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
  for (let i = -g / 2; i <= g / 2; i += 0.5) R.linea(x0 + nx * i, y0 + ny * i, x1 + nx * i, y1 + ny * i, (x, y, k) => (i <= -g / 2 + 0.5 ? AP.maderaL : i >= g / 2 - 0.5 ? AP.maderaS : h(Math.round(i * 2), k >> 3, 102) < 0.25 ? AP.maderaS : AP.madera));
}

// cifras diminutas de 3 × 5 (solo dígitos)
const A_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function a_cifras3(R, txt, x, y, c) { for (const ch of String(txt)) { const g = A_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

function a_corte(R, t, o) {
  a_capa(R, 'corte', () => a_corteFijo(R));
  const B = R.buf, u = a_lim(o.lluvia ?? 0), llueve = u > 0;
  // el cielo (por encima de la ladera): de día con nubes; con lluvia, el tiempo corre: día y noche, soles y lunas
  const fase = llueve ? u * 9 + t * 0.35 : 0.25, f = fase % 1, dia = llueve ? 0.5 - 0.5 * Math.cos(f * Math.PI * 2) : 1;
  const CN = [hex('#0e1430'), hex('#1a2244'), hex('#2a3458')], CD = llueve ? [hex('#6a7a8e'), hex('#8090a2'), hex('#98a6b4')] : [AP.c1, AP.c3, AP.c5];
  // (día y noche se funden mezclando el color, sin trama: detrás de Atom y en la barra del año el cielo queda liso)
  const CM = [0, 1, 2].map((q) => (llueve ? a_mezcla(CN[q], CD[q], dia) : CD[q]));
  for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) { if (y >= A_SUP(x)) continue; const k = Math.min(2, Math.floor(y / 14 + a_U(x, y) - 0.3));
    B[y * 320 + x] = CM[Math.max(0, k)]; }
  if (llueve) { const fs = (f + 0.75) % 1, fl = (f + 0.25) % 1;
    // el sol y la luna cruzan bajos, entre la barra del año y Atom (x 186–266)
    const astro = (u, r, c, cL) => { const cx = 186 + u * 2 * 80, cy = 34 - Math.sin(u * 2 * Math.PI) * 13; for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy); if (d <= r && y < A_SUP(x) - 1) R.pset(x, y, d < r * 0.6 ? cL : c); } };
    if (fs < 0.5) astro(fs, 4, AP.sol, AP.solL);
    if (fl < 0.5) astro(fl, 3, hex('#c8c8d8'), hex('#e8e8f0'));
    // nubarrones de tres tonos a dos velocidades, que se deshacen antes de llegar a Atom y no suben a la barra del año
    const cn = [hex('#4a5262'), hex('#6a7282'), hex('#9098a6'), hex('#3a4252')].map((c) => a_mezcla(c, CN[1], (1 - dia) * 0.8));
    for (let k = 0; k < 5; k++) { const w = 34 + (k * 13) % 26, x = ((h(k, 1, 103) * 330 + t * (10 + (k % 2) * 9)) % 380) - 60; a_nube(B, a_mCorte(), x, 28 + (k % 3) * 4, w, k + 30, cn, 0.8); }
  } else { a_nubes(R, t, a_mCorte(), 40, 1); a_pajaros(R, t, 120, 22, 3, 6, 7); }
  // la ladera de arriba: la hierba del borde que se mece
  for (let x = 0; x < 320; x += 3) { const ys = Math.round(A_SUP(x)), v = Math.round(Math.sin(t * 2 + x * 0.1)); R.pset(x + v, ys - 1, hex('#9aaa5a')); R.pset(x + v, ys - 2, hex('#7a8a4a')); }
  if (llueve) {
    // las capas nuevas que se depositan arriba (hasta 10 px), con sus vetas
    const n = Math.floor(u * 10);
    for (let x = 0; x < 320; x++) { const ys = Math.round(A_SUP(x)); for (let j = 1; j <= n; j++) { const y = ys - j; R.pset(x, y, (j + Math.floor(x / 40)) % 3 === 0 ? hex('#8a6a4a') : j % 2 ? hex('#a07a54') : hex('#946e4c')); } if (n > 0) R.pset(x, ys - n - 1, hex('#8a9a4a')); }
    // el barro que resbala ladera abajo por la izquierda y los regueros que bajan por el perfil
    for (let k = 0; k < 7; k++) { const v = (t * 0.4 + k / 7) % 1, x = Math.round(4 + v * 70), y = Math.round(A_SUP(x) - n - 1); R.rect(x, y, x + 2, y + 1, AP.barro); R.pset(x + 1, y, AP.barroL); }
    for (const [rx0, largo] of [[60, 30], [104, 52], [168, 24], [292, 40], [316, 60]]) { const y0 = Math.round(A_SUP(rx0)); for (let j = 0; j < largo * a_lim(u * 3); j++) { const x = rx0 + Math.round(Math.sin((y0 + j) * 0.3 + rx0) * 1.2); R.pset(x, y0 + j, (j + Math.floor(t * 12)) % 4 === 0 ? AP.barroL : AP.barro); } }
    // la lluvia, inclinada, y los charcos del suelo con sus ondas
    const nl = Math.round(70 + 60 * Math.sin(fase * 2.3) ** 2);
    for (let k = 0; k < nl; k++) { const x = Math.round((h(k, 1, 104) * 340 + t * 30) % 340) - 10, y = Math.round((h(k, 2, 104) * 200 + t * 160) % 200) - 10;
      if ((x >= 272 && y <= 48) || (x >= 14 && x <= 176 && y <= 18)) continue;   // la lluvia no cruza detrás de Atom ni por la barra del año
      R.linea(x, y, x - 1, y + 3, dia > 0.5 ? hex('#c8d4e0') : hex('#6a7a9a')); }
    for (const [cx, cy, rx] of [[70, 168, 14], [200, 172, 18], [140, 154, 8]]) { for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - rx; x <= cx + rx; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / 2.5) ** 2 < 1) R.pset(x, y, y < cy ? hex('#8a9aaa') : hex('#6a7a8a'));
      for (let j = 0; j < 2; j++) { const r = ((t * 1.5 + j * 0.5 + cx * 0.01) % 1) * rx * 0.7, ox = cx + Math.round((h(j, Math.floor(t * 1.5 + j * 0.5), cx) - 0.5) * rx); for (let a = 0; a < 6.28; a += 0.5) R.pset(Math.round(ox + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.25), hex('#c8d4e0')); } }
  } else { for (let k = 0; k < 10; k++) { const x = Math.round(40 + ((h(k, 1, 105) * 280 + t * 3) % 280)), y = Math.round(70 + ((h(k, 2, 105) * 60 + t * 2) % 60)); if (Math.sin(t * 2 + k) > 0) R.pset(x, y, AP.halo); } }   // motas de polvo al sol
  if (o.puntales) { a_gente(R, 280, 150, t, 2, 'empuja', -1); a_gente(R, 296, 150, t, 4, 'empuja', -1); a_gente(R, 254, 150, t, 5, 'mazo', -1); if (Math.sin(t * 5 + 5) < -0.85) for (let j = 0; j < 3; j++) R.pset(246 + j, 145 - j, AP.halo); }
}
// la viga tumbada en el suelo y el puntal de delante (x 214–320, y 156–180), por delante de los personajes
function a_puntalDelante(R) {
  a_viga(R, 214, 170, 320, 166, 6); R.linea(214, 174, 320, 171, AP.sombra);
  a_viga(R, 330, 120, 296, 182, 6);
  R.rect(232, 164, 238, 172, AP.maderaS); R.rect(232, 164, 238, 164, AP.maderaL);
}

// las catas: [x0, y0, x1, y1] (el hoyo; el muro de atrás 6 px), y lo que hay dentro
const A_CATAS = [[18, 62, 96, 82], [106, 60, 182, 80], [192, 58, 262, 78], [8, 90, 98, 116], [110, 88, 200, 114], [210, 86, 306, 112], [6, 122, 84, 142], [96, 120, 176, 142]];

function a_norteFijo(R) {
  const B = R.buf, HOR = 46, info = {};
  a_cieloGrad(B, 0, HOR + 1, A_CIELO); a_sol(R, 240, 20, 5);
  const S = B.slice(0, 320 * (HOR + 1));
  a_sierra(R, HOR, 3); a_campos(B, HOR, HOR, 58, 'verano', 3); a_arbolitos(R, HOR, 56, 3);
  // lejos, a la izquierda: el cerro con la cubierta blanca
  for (let x = 20; x < 130; x++) { const u = (x - 74) / 54, yt = Math.round(54 - 8 * Math.sqrt(Math.max(0, 1 - u * u))); for (let y = yt; y < 56; y++) R.pset(x, y, a_rampa(A_ESTEPA.verano, 0.4 + u * 0.3, x, y)); }
  a_cubierta(R, 52, 98, 48, 10);
  // la ladera: tierra clara y estepa
  const T4 = [C.tierraS, C.tierra, C.tierraL, hex('#d4a47c')];
  for (let y = 56; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 60 && a_U(x, y) > (y - 56) / 4) continue; const n = h(x >> 2, y >> 1, 110) * 0.6 + h(x >> 3, y >> 2, 111) * 0.4;
    let c = a_rampa(T4, 0.3 + n * 0.5, x, y); if (h(x >> 1, y, 112) < 0.07) c = A_ESTEPA.verano[h(x, y, 113) < 0.5 ? 0 : 3]; if (h(x, y, 114) < 0.015) c = AP.p3; B[y * 320 + x] = c; }
  // las catas: el hoyo con el muro de tierra de atrás, el suelo, y dentro los edificios de muros bajos de piedra
  A_CATAS.forEach(([x0, y0, x1, y1], k) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c;
      if (y < y0 + 6) c = a_rampa(T4, 0.15 + (y - y0) * 0.04 + (Math.floor(y * 0.7) % 2 ? -0.1 : 0.1) + (h(x, y, 115) - 0.5) * 0.3, x, y);   // el corte de atrás, con sus capas
      else { c = a_rampa([C.calizaD, C.calizaS, C.veta, C.caliza], 0.45 + (h(x >> 1, y, 116) - 0.5) * 0.4 - (x > x1 - 3 ? 0.4 : 0) - (y < y0 + 8 ? 0.3 : 0), x, y); }
      B[y * 320 + x] = c; }
    R.linea(x0, y0 - 1, x1, y0 - 1, hex('#e0b48c')); R.linea(x0, y1 + 1, x1, y1 + 1, C.tierraS);
    // el suelo: piedrecitas con su sombra, lascas de sílex que brillan y alguna etiqueta clavada junto a un hallazgo
    for (let j = 0; j < 14; j++) { const px = x0 + 3 + Math.round(h(k, j, 151) * (x1 - x0 - 6)), py = y0 + 9 + Math.round(h(k, j, 152) * (y1 - y0 - 11));
      if (j % 4 === 0) { R.pset(px, py, AP.negro); R.pset(px + 1, py, C.silexL); } else { R.pset(px, py, AP.p3); R.pset(px + 1, py, AP.p4); R.pset(px, py + 1, C.calizaD); R.pset(px + 1, py + 1, C.calizaD); }
      if (j % 7 === 3) { R.rect(px + 3, py - 3, px + 5, py - 2, C.etiqueta); R.linea(px + 3, py - 1, px + 3, py, AP.madera); } }
    // un jalón de rojo y blanco tumbado en el borde, para la escala de las fotos
    if (k % 3 === 1) for (let i = 0; i < 14; i++) R.pset(x0 + 4 + i, y1 - 2, Math.floor(i / 3) % 2 ? AP.rojo : AP.blanco);
    // en las catas sin edificio: un hogar de piedras con su ceniza y una piedra de moler
    if (k === 5 || k === 7) { const hx = Math.round((x0 + x1) / 2) - 16, hy = Math.round((y0 + y1) / 2) + 3;
      for (let yy = -3; yy <= 3; yy++) for (let xx = -7; xx <= 7; xx++) { const e2 = (xx / 7) ** 2 + (yy / 3) ** 2; if (e2 <= 1) R.pset(hx + xx, hy + yy, e2 < 0.5 ? (h(xx, yy, 153) < 0.3 ? AP.cenizaL : AP.ceniza) : h(xx, yy, 154) < 0.5 ? AP.p3 : AP.p1); }
      R.pset(hx - 1, hy, AP.negro); R.pset(hx + 2, hy - 1, AP.negro);
      R.poligono([[hx + 18, hy + 3], [hx + 20, hy - 2], [hx + 34, hy - 3], [hx + 36, hy + 2]], (px, py) => (py < hy - 1 ? C.calizaL : C.caliza)); R.linea(hx + 18, hy + 4, hx + 36, hy + 3, C.calizaD); R.rect(hx + 24, hy - 4, hx + 28, hy - 3, AP.p2); }
    // los cordeles de la cuadrícula y las estacas de las esquinas
    R.linea(x0 - 2, y0 - 2, x1 + 2, y0 - 2, (x, y, i) => (i % 2 ? C.cuerda : null)); for (const [ex, ey] of [[x0 - 2, y0 - 2], [x1 + 2, y0 - 2], [x0 - 2, y1 + 2], [x1 + 2, y1 + 2]]) { R.pset(ex, ey - 1, C.etiqueta); R.pset(ex, ey, AP.madera); }
    // un edificio rectangular: muros bajos de piedra (cara de arriba y cara de delante), banco corrido y un pilar pequeño
    if (k !== 5 && k !== 7) { const a0 = x0 + 6 + (k % 3) * 2, a1 = x1 - 6, b0 = y0 + 8, b1 = y1 - 3;
      const muro = (xa, ya, xb, yb) => { for (let y = ya; y <= yb; y++) for (let x = xa; x <= xb; x++) R.pset(x, y, a_muroPx(x, y, k + 20, 2, y === ya ? 0.8 : 0)); };
      muro(a0, b0, a1, b0 + 2); muro(a0, b0, a0 + 2, b1); muro(a1 - 2, b0, a1, b1); muro(a0, b1 - 2, Math.round((a0 + a1) / 2) - 4, b1); muro(Math.round((a0 + a1) / 2) + 4, b1 - 2, a1, b1);
      for (let x = a0 + 3; x <= a1 - 3; x++) { R.pset(x, b0 + 3, C.calizaL); R.pset(x, b0 + 4, C.caliza); R.pset(x, b0 + 5, C.calizaS); }   // el banco corrido
      if (k % 2 === 0) { const px = a1 - 8; R.rect(px, b0 + 1, px + 6, b0 + 2, C.calizaL); R.rect(px + 2, b0 + 3, px + 4, b0 + 9, C.caliza); R.rect(px + 4, b0 + 3, px + 4, b0 + 9, C.calizaS); R.linea(px - 1, b0 + 10, px + 3, b0 + 10, C.calizaD); }
      R.linea(a0 - 1, b1 + 1, a1, b1 + 1, C.calizaD); }
  });
  // la lona azul sobre un cuadro (x 188–262, y 124–142): se pinta en cada fotograma; aquí el hoyo de debajo
  // escaleras, cubos, cajas de hallazgos apiladas y una carretilla
  for (const [lx, ly] of [[100, 62], [214, 88], [12, 92]]) { for (const dx of [0, 3]) R.linea(lx + dx, ly - 4, lx + dx + 1, ly + 10, AP.maderaL); for (let j = -2; j < 10; j += 3) R.linea(lx, ly + j, lx + 3, ly + j, AP.maderaS); }
  for (const [x, y] of [[60, 86], [178, 84], [120, 118], [270, 84], [300, 118]]) a_trasto(R, x, y, 'cubos');
  for (const [x, y] of [[274, 120], [292, 56]]) for (let k = 0; k < 4; k++) { const cx = x + (k % 2) * 8, cy = y - (k >> 1) * 5, col = k % 2 ? AP.naranja : AP.azul; R.rect(cx, cy - 4, cx + 7, cy, col); R.rect(cx, cy - 4, cx + 7, cy - 4, a_mezcla(col, AP.blanco, 0.4)); R.rect(cx + 2, cy - 3, cx + 5, cy - 3, AP.negro); R.rect(cx + 1, cy - 2, cx + 3, cy - 1, C.etiqueta); }
  a_trasto(R, 196, 86, 'carretilla'); a_trasto(R, 140, 86, 'sacos');
  // la mesa de dibujo con su lámina
  R.rect(28, 108, 48, 110, AP.maderaL); R.rect(28, 111, 48, 111, AP.maderaS); R.linea(30, 112, 30, 118, AP.maderaS); R.linea(46, 112, 46, 118, AP.maderaS);
  R.rect(31, 106, 45, 109, AP.blanco); for (let x = 32; x < 45; x += 3) R.linea(x, 106, x, 109, AP.memS); R.linea(33, 108, 40, 107, AP.cristal);
  // el camino de delante (y 146–180) donde se plantan los personajes, y la losa medio enterrada (x 214–250)
  for (let y = 144; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 148 && a_U(x, y) > (y - 144) / 4) continue; let c = a_rampa([AP.caminoS, AP.camino, AP.caminoL], 0.3 + h(x >> 2, y >> 1, 117) * 0.5, x, y); if (h(x, y, 118) < 0.02) c = AP.p3; B[y * 320 + x] = c; }
  for (let k = 0; k < 10; k++) a_piedra(R, Math.round(h(k, 1, 119) * 320), 160 + Math.round(h(k, 2, 119) * 18), 3 + (k % 3), 2, k + 40);
  R.poligono([[214, 156], [218, 150], [248, 149], [251, 157]], (x, y) => (y < 152 ? C.calizaL : h(x >> 1, y, 120) < 0.15 ? C.veta : C.caliza)); R.linea(214, 157, 251, 158, C.calizaS); R.linea(213, 159, 252, 159, hex('#8a5236'));
  for (let x = 212; x <= 253; x++) if (h(x, 1, 121) < 0.5) R.pset(x, 158 + (x % 2), hex('#a2663e'));
  R.linea(256, 160, 262, 158, AP.llanta); R.linea(262, 158, 266, 157, AP.maderaS);   // una paleta junto a la losa
  const m = new Uint8Array(320 * 180); for (let i = 0; i < S.length; i++) m[i] = B[i] === S[i] ? 1 : 0;
  info.m = m; return info;
}
function a_norte(R, t, o) {
  const info = a_capa(R, 'norte', () => a_norteFijo(R));
  info.mc ??= a_calma(info.m); a_nubes(R, t, info.mc, 46, 1); a_pajaros(R, t, 200, 22, 4, 7, 9);
  // la lona azul que tapa un cuadro: sus bordes ondean con el viento, sujeta con piedras en las esquinas
  for (let y = 124; y <= 142; y++) for (let x = 188; x <= 262; x++) { const borde = Math.min(x - 188, 262 - x, y - 124, 142 - y), w = borde < 4 ? Math.sin(t * 4 + x * 0.3 + y * 0.2) * (4 - borde) * 0.15 : 0;
    const l = 0.55 + Math.sin(x * 0.18 + y * 0.05 + t * 1.5) * 0.15 + w + (y === 124 ? 0.3 : 0); R.pset(x, y, a_rampa([AP.azulS, AP.azul, AP.azulL], l, x, y)); }
  R.linea(188, 143, 262, 143, AP.sombra); for (const [x, y] of [[190, 126], [258, 126], [190, 140], [258, 140], [224, 124]]) a_piedra(R, x, y, 6, 3, x);
  // las sombrillas que se mecen
  for (const [x, y, c1, c2] of [[150, 86, AP.rojo, AP.blanco], [252, 110, AP.verdeC, hex('#e8d040')]]) { const v = Math.round(Math.sin(t * 1.7 + x) * 1.2); R.linea(x, y, x + v, y - 16, AP.p0);
    for (let i = -11; i <= 11; i++) { const yy = y - 17 + Math.round(Math.abs(i) * 0.35) + (Math.abs(i) > 9 ? Math.round(Math.sin(t * 6 + i)) : 0); R.pset(x + v + i, yy, Math.floor((i + 11) / 4) % 2 ? c1 : c2); R.pset(x + v + i, yy - 1 + (Math.abs(i) < 8 ? 0 : 1), Math.floor((i + 11) / 4) % 2 ? c1 : c2); if (Math.abs(i) < 6) R.pset(x + v + i, yy - 2, Math.floor((i + 11) / 4) % 2 ? c1 : c2); }
    for (let k = 0; k < 8; k++) R.pset(x + v - 10 + k * 3, y - 15 + Math.round(k > 3 ? 7 - k : k) * 0, a_mezcla(c1, AP.negro, 0.3));
    R.linea(x - 8, y + 1, x + 10, y + 1, AP.sombra); }
  // los trabajadores: raspan dentro de las catas, uno criba, uno dibuja en la mesa, uno lleva cubos por el testigo
  a_gente(R, 52, 80, t, 0, 'agacha', 1); a_gente(R, 140, 78, t, 1, 'agacha', -1); a_gente(R, 230, 76, t, 2, 'cava', 1); a_gente(R, 60, 112, t, 3, 'agacha', 1);
  a_gente(R, 150, 112, t, 4, 'cava', -1); a_gente(R, 284, 110, t, 6, 'criba', -1); a_gente(R, 24, 118, t, 5, 'dibuja', 1); a_gente(R, 130, 140, t, 1, 'agacha', 1);
  { const per = 12, u = (t % per) / per, ida = u < 0.5, f = ida ? u * 2 : 2 - u * 2; a_gente(R, 104 + f * 100, 86, t, 7, ida ? 'cubo' : 'anda', ida ? 1 : -1); }
}
// las cajas de hallazgos y un cubo abajo a la derecha (por delante de los personajes)
function a_cajasDelante(R, t) {
  for (let k = 0; k < 5; k++) { const cx = 276 + (k % 3) * 15 - (k >> 1 ? 7 : 0), cy = 180 - (k >= 3 ? 9 : 0), col = k % 2 ? AP.naranja : AP.azul;
    R.rect(cx, cy - 9, cx + 14, cy - 1, col); R.rect(cx, cy - 9, cx + 14, cy - 9, a_mezcla(col, AP.blanco, 0.4)); R.rect(cx + 14, cy - 8, cx + 14, cy - 1, a_mezcla(col, AP.negro, 0.35));
    for (let x = cx + 2; x < cx + 13; x += 3) R.rect(x, cy - 7, x + 1, cy - 3, a_mezcla(col, AP.negro, 0.2)); R.rect(cx + 4, cy - 6, cx + 9, cy - 4, C.etiqueta); a_cifras3(R, String(k + 3), cx + 5, cy - 7 + 1, AP.negro); }
  R.rect(258, 168, 268, 179, AP.negro); R.rect(258, 168, 268, 169, AP.p0); R.rect(260, 170, 266, 171, hex('#a2663e')); R.linea(258, 167, 268, 164, AP.p1);
}

function a_cuboManguera(R) {
  R.rect(286, 166, 298, 179, AP.negro); R.rect(286, 166, 298, 167, AP.p0); R.rect(288, 168, 296, 169, hex('#a2663e'));
  for (let a = 0; a < 6.28 * 2; a += 0.05) { const r = 6 + a * 0.6; R.pset(Math.round(306 + Math.cos(a) * r), Math.round(174 + Math.sin(a) * r * 0.35), AP.verdeC); }
}

// un muro de lajas de caliza a hiladas irregulares (cada hilada de 4–8 px, lajas de 7–26 px con las esquinas romas,
// luz arriba a la izquierda y sombra abajo, tonos distintos, grietas y ripios en las juntas de barro), de x0,y0 a x1,y1
function a_lajas(R, x0, y0, x1, y1, sem) {
  const B = R.buf, PJ = [hex('#5a3e2a'), hex('#6e4e36')], PT = [[AP.p1, AP.p2, AP.p3, AP.p4], [C.calizaS, C.veta, C.caliza, C.calizaL], [hex('#8a8272'), hex('#a8a08c'), hex('#c4bca6'), hex('#ddd6c2')]];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = PJ[h(x, y, sem) < 0.5 ? 0 : 1];
  let y = y0, fila = 0;
  while (y < y1) { const alto = Math.min(y1 - y, 4 + Math.round(h(fila, 1, sem) * 3) + (y > y0 + (y1 - y0) * 0.6 ? 2 : 0)); let x = x0 - Math.round(h(fila, 2, sem) * 12), k = 0;
    while (x <= x1) { const L = 7 + Math.round(h(fila, k, sem + 1) * 19), P = PT[Math.floor(h(fila, k, sem + 2) * 2.99)], dy = Math.round((h(fila, k, sem + 3) - 0.5) * 1.5), sale = h(fila, k, sem + 4) < 0.15;
      for (let j = 0; j < alto - 1 + dy; j++) for (let i = 0; i < L - 1; i++) { const px = x + i, py = y + j; if (px < x0 || px > x1 || py < y0 || py > y1) continue;
        if ((i === 0 || i === L - 2) && (j === 0 || j === alto - 2 + dy)) continue;   // las esquinas romas
        let l = 0.5 + (h(fila, k, sem + 5) - 0.5) * 0.4 + (j === 0 ? 0.35 : j === alto - 2 + dy ? -0.35 : 0) + (i === 0 ? 0.15 : i === L - 2 ? -0.2 : 0) + (h(px >> 1, py, sem + 6) - 0.5) * 0.25 + (sale ? 0.15 : 0);
        let c = a_rampa(P, l, px, py); if (h(px, py, sem + 7) < 0.012) c = AP.p0; B[py * 320 + px] = c; }
      if (sale) for (let i = 1; i < L - 2; i++) { const px = x + i, py = y + alto - 1 + dy; if (px >= x0 && px <= x1 && py <= y1) B[py * 320 + px] = hex('#3a281c'); }
      if (h(fila, k, sem + 8) < 0.3) { const gx = x + Math.round(L * 0.3 + h(fila, k, sem + 9) * L * 0.4); for (let j = 1; j < alto - 2; j++) if (gx >= x0 && gx <= x1) B[(y + j) * 320 + gx] = P[0]; }
      if (h(fila, k, sem + 10) < 0.25 && x + L <= x1) { const rx = x + L - 1, ry = y + Math.round(alto / 2); B[ry * 320 + rx] = AP.p2; if (ry + 1 <= y1) B[(ry + 1) * 320 + rx] = AP.p0; }   // un ripio en la junta
      x += L; k++; }
    y += alto; fila++; }
}

function a_muroFijo(R) {
  const B = R.buf;
  // la membrana de la cubierta vista por debajo y una cercha de acero
  for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) { const ang = Math.atan2(y + 60, x - 120), cos = Math.floor((ang + 3.2) * 10) !== Math.floor((Math.atan2(y + 60, x + 1 - 120) + 3.2) * 10);
    B[y * 320 + x] = a_rampa([AP.memS, AP.memM, AP.mem], 0.5 + y / 60 + (cos ? -0.2 : 0) - Math.abs(x - 120) / 900, x, y); }
  for (let x = 0; x < 320; x++) { R.pset(x, 22, AP.memD); R.pset(x, 28, AP.memD); } for (let x = 0; x < 320; x += 12) { R.linea(x, 22, x + 6, 28, AP.memD); R.linea(x + 6, 28, x + 12, 22, AP.memD); }
  // detrás del muro: la luz del otro recinto, las cabezas de dos pilares y la pasarela con su barandal
  for (let y = 29; y < 40; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = a_rampa([AP.p1, AP.p2, hex('#d8c8a8')], 0.4 + h(x >> 2, y, 130) * 0.4, x, y);
  for (let x = 0; x < 320; x++) { R.pset(x, 30, AP.maderaL); if (x % 9 === 0) R.linea(x, 30, x, 35, AP.madera); }
  for (const px of [96, 188]) { R.rect(px - 9, 31, px + 9, 37, C.caliza); R.rect(px - 9, 31, px + 9, 31, C.calizaL); R.rect(px + 8, 32, px + 9, 37, C.calizaS); R.rect(px - 4, 38, px + 4, 40, C.calizaS); }
  // el muro: piedra seca a hiladas, más gruesas abajo, con mortero de barro y alguna laja más clara
  a_lajas(R, 0, 38, 319, 146, 131);
  for (let x = 0; x < 320; x++) { R.pset(x, 38, C.calizaL); if (h(x >> 2, 1, 139) < 0.5) R.pset(x, 39, AP.p4); }
  // regueros de tierra y manchas de humedad que bajan por el muro, y un nicho pequeño
  for (let k = 0; k < 9; k++) { const x0 = Math.round(h(k, 1, 140) * 310), y0 = 40 + Math.round(h(k, 2, 140) * 30), L = 14 + Math.round(h(k, 3, 140) * 40); for (let j = 0; j < L; j++) if (h(k, j >> 2, 141) < 0.7) { const x = x0 + Math.round(Math.sin(j * 0.2 + k) * 1.5), c = R.pget(x, y0 + j); R.pset(x, y0 + j, a_mezcla(c, hex('#8a6a4a'), 0.35)); } }
  R.rect(58, 70, 74, 82, hex('#3a281c')); R.rect(58, 70, 74, 71, hex('#2a1c14')); R.rect(57, 83, 75, 84, C.calizaL); R.rect(62, 78, 66, 82, C.caliza); R.pset(63, 79, C.calizaL);
  // la sombra al pie del muro y el suelo del recinto: tierra pisada clara, con pisadas y piedrecitas
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { let c = a_rampa([C.calizaS, C.veta, C.caliza, C.calizaL], 0.35 + h(x >> 2, y >> 1, 132) * 0.5 + (y < 150 ? -0.35 : 0), x, y); if (h(x, y, 133) < 0.015) c = AP.p1; B[y * 320 + x] = c; }
  // el andamio de restauración: tubos, plataformas de tablones, cubo y herramientas
  for (const x of [230, 268, 306]) { R.rect(x, 50, x + 1, 150, AP.tirante); R.rect(x, 50, x, 150, AP.p4); R.rect(x - 2, 149, x + 3, 150, AP.p0); }
  for (const y of [70, 108]) { R.rect(226, y, 312, y + 3, AP.madera); R.rect(226, y, 312, y, AP.maderaL); R.rect(226, y + 3, 312, y + 3, AP.maderaS); for (let x = 240; x < 312; x += 22) R.pset(x, y + 1, AP.maderaS); R.linea(226, y - 6, 312, y - 6, AP.tirante); }
  R.linea(232, 108, 266, 72, AP.tirante); R.linea(270, 108, 304, 72, AP.tirante);
  a_trasto(R, 290, 107, 'cubos'); R.rect(248, 66, 256, 69, AP.naranja); R.rect(248, 66, 256, 66, hex('#f0a060'));
  // una lámpara de obra sobre su trípode, unas brochas y un cubo en el suelo
  R.linea(18, 148, 24, 110, AP.p0); R.linea(30, 148, 24, 110, AP.p0); R.linea(24, 148, 24, 110, AP.p0); R.rect(19, 104, 29, 110, AP.p1); R.rect(20, 105, 28, 109, hex('#fff0b0')); R.rect(20, 105, 28, 105, AP.solL);
  a_trasto(R, 130, 160, 'cubos'); for (const [x, y] of [[112, 166], [118, 170]]) { R.linea(x, y, x + 6, y - 1, AP.maderaL); R.rect(x + 6, y - 2, x + 8, y, AP.trS); }
  R.rect(140, 170, 150, 172, AP.naranja);   // la almohadilla para arrodillarse
  // las lajas que se desmontaron para restaurar, en fila sobre una lona, cada una con su número
  for (let y = 164; y <= 178; y++) for (let x = 172; x <= 262; x++) R.pset(x - Math.round((y - 164) * 0.4), y, a_rampa([AP.memS, AP.memM, AP.mem], 0.55 + Math.sin(x * 0.15 + y * 0.6) * 0.2, x, y));
  for (let k = 0; k < 5; k++) { const x = 172 + k * 17, y = 170 + (k % 2) * 3, w = 11 + (k % 3) * 2; for (let j = 0; j < 4; j++) for (let i = 0; i < w; i++) R.pset(x + i, y + j, j === 0 ? C.calizaL : j === 3 ? C.calizaS : h(x + i, y + j, 143) < 0.15 ? C.veta : C.caliza); R.linea(x - 1, y + 4, x + w - 1, y + 4, AP.sombra); a_cifras3(R, String(k + 1), x + 3, y - 6, AP.rojo); }
  // pisadas en el polvo del suelo y la sombra del andamio
  for (let k = 0; k < 22; k++) { const x = 30 + k * 9 + (k % 2) * 3, y = 154 + (k % 2) * 3 + Math.round(Math.sin(k * 0.7) * 2); R.rect(x, y, x + 2, y, C.calizaS); R.pset(x + 1, y + 1, C.calizaS); }
  for (let y = 150; y < 160; y++) for (const x0 of [224, 262, 300]) for (let x = x0 - (y - 150); x < x0 - (y - 150) + 3; x++) if (x >= 0 && a_U(x, y) < 0.5) R.pset(x, y, a_mezcla(R.pget(x, y), AP.sombra, 0.4));
}
// la estatua tumbada boca arriba, de perfil, cabeza a la izquierda (x 150–282, y 120–142): su perfil de arriba (alto
// sobre la base en cada u) y el color del píxel (l 0–1) o null
const A_PERFIL = [[0, 6], [2, 12], [5, 15], [8, 16], [10, 19], [12, 16], [14, 13], [17, 10], [21, 14], [26, 17], [40, 16], [50, 15], [60, 13], [66, 12], [80, 11], [90, 11], [94, 10], [106, 9], [116, 8], [119, 9], [122, 15], [125, 17], [128, 15], [131, 8], [132, 2]];

function a_estatuaPx(x, y) {
  const u = x - 150, base = 141; if (u < 0 || u > 132) return null;
  let k = 0; while (k + 2 < A_PERFIL.length && A_PERFIL[k + 1][0] <= u) k++;
  const [u0, a0] = A_PERFIL[k], [u1, a1] = A_PERFIL[k + 1], top = Math.round(base - (a0 + (a1 - a0) * (u - u0) / Math.max(1, u1 - u0)));
  if (y < top || y > base) return null;
  let l = 0.72 - (y - top) / 40 + (h(x >> 1, y >> 1, 134) - 0.5) * 0.12 + (y === top ? 0.3 : y === top + 1 ? 0.12 : 0) - (y === base ? 0.3 : 0);
  if (u > 22 && u < 46 && y === top + 4) l -= 0.35;   // el brazo, en relieve
  if (u > 22 && u < 46 && y === top + 3) l += 0.15;
  if (u >= 44 && u <= 54 && y >= top + 2 && y <= top + 6 && u % 2 === 0) l -= 0.3;   // los dedos largos sobre el vientre
  if (u > 64 && u < 116 && y === base - 4) l -= 0.3;   // la separación entre las piernas
  if (u > 88 && u < 94 && y === top + 1) l += 0.2;   // la rodilla
  if (u === 9 && y === base - 13) l = 0;   // el ojo
  if (u >= 12 && u <= 14 && y === base - 11) l -= 0.25;   // la boca
  return l;
}

function a_muro(R, t, o) {
  a_capa(R, 'muro', () => a_muroFijo(R));
  const e = a_lim(o.estatua ?? 1), xr = 146 + Math.round(e * 140);
  // el hueco de la hilada de abajo donde yace la estatua, la estatua y el barro que aún la tapa (se retira con e)
  for (let y = 116; y <= 143; y++) for (let x = 146; x <= 286; x++) {
    const l = a_estatuaPx(x, y), tapa = x > xr + (h(y >> 1, 1, 135) - 0.5) * 6;
    if (tapa) { const cr = (xx, yy) => Math.abs(Math.sin(xx * 0.23 + Math.sin(yy * 0.31) * 2.2) * Math.sin(yy * 0.29 + Math.sin(xx * 0.19) * 2)) < 0.07;
      const seco = h(x >> 3, y >> 2, 144) * 0.6 + h(x >> 4, y >> 3, 145) * 0.4;   // costras secas más claras y manchas húmedas más oscuras
      let c = y === 116 ? AP.p1 : a_rampa([hex('#5e3e28'), AP.barro, AP.barroL, hex('#b08060'), hex('#c49a74')], 0.6 - (y - 116) / 50 + (seco - 0.5) * 0.9 + (h(x >> 1, y >> 1, 136) - 0.5) * 0.25 + ((x + y * 2) % 17 === 0 ? 0.3 : 0), x, y);
      if (y > 117 && cr(x, y)) c = hex('#3a2618');   // las grietas del barro seco
      else if (y > 117 && cr(x, y - 1)) c = hex('#c49a74');   // el filo de la grieta, con luz
      else if (h(x, y, 142) < 0.015) c = C.caliza;   // guijarros metidos en el barro
      if (x <= xr + 4 + (h(y >> 1, 1, 135) - 0.5) * 6) c = a_mezcla(c, hex('#3a281c'), 0.35);   // el canto recién cortado, en sombra
      R.pset(x, y, c); continue; }
    if (l == null) { R.pset(x, y, y > 140 ? hex('#4a3424') : y < 119 ? hex('#22180f') : h(x >> 2, y >> 1, 137) < 0.3 ? hex('#3e2c1e') : hex('#33241a')); continue; }
    const fuera = (xx, yy) => a_estatuaPx(xx, yy) == null;
    R.pset(x, y, (fuera(x - 1, y) || fuera(x + 1, y)) && !fuera(x, y - 1) ? C.calizaD : a_rampa([C.calizaD, C.calizaS, C.caliza, C.calizaL, hex('#fff6e0')], l, x, y)); }
  R.linea(146, 115, 286, 115, C.calizaD); R.linea(146, 144, 286, 144, AP.p1);
  // el polvo que cae del borde mientras se destapa
  if (e > 0 && e < 1) for (let k = 0; k < 10; k++) { const v = (t * 0.9 + k / 10) % 1; R.pset(xr + Math.round((h(k, 1, 138) - 0.5) * 6), 118 + Math.round(v * 30), v < 0.6 ? hex('#d8c4a0') : hex('#b8a080')); }
  // el restaurador en el andamio que rejunta, y los visitantes que pasan por la pasarela de detrás
  a_gente(R, 284, 70, t, 2, 'agacha', -1);
  for (let j = 0; j < 3; j++) { const u = (t * 0.05 + j * 0.33) % 1, x = j % 2 ? 330 - u * 350 : u * 350 - 20; a_gente(R, x, 30, t, 10 + j, 'anda', j % 2 ? -1 : 1); }
  // la luz de la lámpara que parpadea un poco
  if (Math.sin(t * 13) > 0.85) R.rect(20, 105, 28, 109, AP.solL);
}
const b_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// el umbral de tramado (Bayer 4 × 4)
const b_U = (x, y) => b_BAY[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a
function b_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// un tono tramado de una rampa: v (0 … n − 1, con decimales) en el píxel x, y
const b_tono = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b_U(x, y)) l++; return ramp[l < 0 ? 0 : l >= ramp.length ? ramp.length - 1 : l]; };

const b_ease = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));

// las rampas del recinto: la caliza de día, con luz cálida (alba, fuego) y de noche; la tierra, la estepa, el fuego
const b_P = {
  cal: ['#4a3e30', '#6a5a44', '#8a7858', '#a8946e', '#c2b08a', '#d8c8a4', '#ece0c4', '#faf2de'].map(hex),
  calC: ['#5a3a26', '#7e5434', '#a87448', '#c8925c', '#e0b072', '#f0ca8e', '#fae0ae', '#fff2d4'].map(hex),
  calN: ['#14162a', '#1c2036', '#262c44', '#323852', '#3e4662', '#4e5674', '#626a88', '#787f9c'].map(hex),
  tierra: ['#4e3424', '#6a4630', '#86583a', '#a06c48', '#b8845a', '#cc9a6e', '#dcb284'].map(hex),
  tierraN: ['#141224', '#1c1a2e', '#26223a', '#302a44', '#3a3250', '#463c5c', '#52466a'].map(hex),
  estepa: ['#5a4648', '#7a5e5a', '#9a7a66', '#b8946e', '#d0ac7c', '#e4c690'].map(hex),
  estepaT: ['#4a3036', '#6e4440', '#94604a', '#b87c54', '#d09a62', '#e8b878'].map(hex),
  fuego: ['#8a2a1a', '#d8502a', '#ff8a30', '#ffc040', '#fff0a0', '#ffffff'].map(hex),
  humo: ['#6a5a62', '#8a7a7e', '#a89a98', '#c8bab0'].map(hex),
  noche: hex('#141a3a'), calido: hex('#ff9a4a'), cuero: hex('#6a4428'), cueroL: hex('#a8784a'), cueroS: hex('#3e2816'),
  madera: hex('#8a6a46'), maderaL: hex('#c8a474'), maderaS: hex('#5a4228'), corte: hex('#e8cc98'), corteS: hex('#b8925e'),
  cesta: hex('#b08a4e'), cestaL: hex('#d8b46e'), cestaS: hex('#7a5a30'), silex: hex('#4a4a58'), silexL: hex('#9a9aae'),
};

const b_VACIO = 0x01020304;

const b_capas = new Map();

// un búfer fijo que se pinta una vez (lo que no está pintado queda VACIO y deja ver lo de debajo)
function b_capa(R, clave, dibuja) {
  let b = b_capas.get(clave); if (b) return b;
  b = R.nuevo(); b.fill(b_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); b_capas.set(clave, b); return b;
}

// pega un búfer fijo sobre el lienzo desde la fila y0 (salta lo VACIO)
function b_pegar(R, b, y0 = 0) { const B = R.buf; for (let i = y0 * 320; i < 57600; i++) { const c = b[i]; if (c !== b_VACIO) B[i] = c; } }

// el cielo (copia del cielo rico de th-comun.js, sin aviones porque es el Neolítico, y con el alba): bandas con
// transición tramada; el sol con su halo; cirros casi quietos y cúmulos de tres tonos a dos velocidades; de noche,
// estrellas que titilan, la luna en creciente con su halo y una fugaz de vez en cuando. o.hor, o.modo ('dia' | 'alba' |
// 'tarde' | 'noche'), o.sol [x, y, r] (null: sin sol), o.luna [x, y, r], o.cumulos (5)
const b_CIELOS = Object.fromEntries(Object.entries({
  alba: [[0, '#2c2c62'], [0.16, '#3e3e7a'], [0.32, '#5e4a88'], [0.48, '#94608e'], [0.62, '#cc7a86'], [0.76, '#ee9e7c'], [0.88, '#fac48a'], [0.96, '#fde0aa']],
  tarde: [[0, '#24225a'], [0.14, '#3a3a7a'], [0.3, '#5e3e82'], [0.45, '#a0507a'], [0.58, '#cc626a'], [0.7, '#e88a5a'], [0.83, '#f8c070'], [0.94, '#fde4a4']],
  noche: [[0, '#0c1030'], [0.3, '#141a3e'], [0.6, '#1e2650'], [0.84, '#2c3466'], [0.95, '#3a4274']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

const b_NUBES = Object.fromEntries(Object.entries({ alba: ['#7a4e7e', '#d88690', '#ffd0b0'], tarde: ['#7a4476', '#de8478', '#ffd4a4'], noche: ['#1a2048', '#262e58', '#343e6c'] }).map(([k, v]) => [k, v.map(hex)]));

// un cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana
function b_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

function b_cielo(R, t, o = {}) {
  const { pset } = R, hor = o.hor ?? 96, modo = o.modo ?? 'alba', B = R.buf, P = b_CIELOS[modo], tr = 3, lim = P.map(([f]) => Math.round(f * hor));
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = b_U(x, y) < p ? b : a;
  }
  const atom = (x, y) => x > 272 && y < 48;
  if (modo === 'noche') {
    for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 301) * 319), y = Math.round(h(k, 2, 301) ** 1.25 * (hor - 6)); if (atom(x, y)) continue; const tw = Math.sin(t * (1.4 + h(k, 3, 301) * 2.2) + k * 1.7);
      if (tw > -0.5) B[y * 320 + x] = tw > 0.45 ? C.blanco : hex('#8a94c0'); if (k % 11 === 0 && tw > 0.75) { const e = hex('#8a94c0'); pset(x - 1, y, e); pset(x + 1, y, e); pset(x, y - 1, e); pset(x, y + 1, e); } }
    const [lx, ly, lr] = o.luna ?? [212, 26, 6], luna = hex('#f4ecd0'), lunaS = hex('#c8c0a8');
    for (let y = ly - lr - 4; y <= ly + lr + 4; y++) for (let x = lx - lr - 4; x <= lx + lr + 4; x++) { if (y < 0 || y >= hor || x < 0 || x > 319) continue; const d = Math.hypot(x - lx, y - ly), d2 = Math.hypot(x - lx - lr * 0.55, y - ly + lr * 0.2);
      if (d <= lr && d2 > lr * 0.85) B[y * 320 + x] = d > lr - 1 || (x + y) % 5 === 0 ? lunaS : luna; else if (d > lr && d < lr + 4 && b_U(x, y) < (lr + 4 - d) / 8) B[y * 320 + x] = b_mez(B[y * 320 + x], luna, 0.25); }
    { const k = Math.floor(t / 7), u = (t % 7) / 0.7; if (u < 1) { const x0 = 30 + h(k, 1, 305) * 190, y0 = 18 + h(k, 2, 305) * hor * 0.3; for (let i = 0; i < 9; i++) { const x = Math.round(x0 + u * 60 - i * 1.7), y = Math.round(y0 + u * 22 - i * 0.6); if (y >= 0 && y < hor && !atom(x, y)) pset(x, y, i < 2 ? C.blanco : hex('#8a94c0')); } } }
  } else if (o.sol) {
    const [sx, sy, sr] = o.sol, gl = hex('#ffe6a0'), R2 = sr + 20;
    for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
      const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (b_U(x, y) < q * q) B[y * 320 + x] = b_mez(B[y * 320 + x], gl, 0.42); }
    R.disco(sx, sy, sr + 1, hex('#ffd890')); R.disco(sx, sy, sr, C.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec'));
  }
  const cn = b_NUBES[modo] ?? b_NUBES.alba;
  for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 302) * 46), x0 = ((h(k, 6, 302) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.max(18, Math.round(hor * (0.16 + k * 0.1)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 303) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) pset(x - 4, y + 1, cn[0]); } }
  const n = o.cumulos ?? 5;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(30, hor * 0.32) + k * hor * 0.12 : Math.max(26, hor * (0.42 + (k - 2) * 0.1))), x = ((h(k, 7, 302) * 470 + t * v) % 500) - 90;
    b_nube(R, Math.round(x), y, w, k, cn); }
}

// una cordillera o una loma lejana (de th-comun.js): la cresta entre y0 − amp e y0, rellena hasta yb con c y fundida
// abajo con la bruma; o.filo: el borde encendido; o.arboles: pistacheros y almendros sueltos. Devuelve la cresta
function b_colinas(R, y0, amp, yb, c, bruma, sem, o = {}) {
  const B = R.buf, cresta = new Int16Array(320);
  for (let x = 0; x < 320; x++) {
    const yc = Math.round(y0 - amp * (0.55 + 0.3 * Math.sin(x * 0.019 + sem) + 0.14 * Math.sin(x * 0.051 + sem * 2.3) + 0.06 * Math.sin(x * 0.13 + sem * 4.1))); cresta[x] = yc;
    for (let y = Math.max(0, yc); y <= yb; y++) { const p = (y - yb + 7) / 8; B[y * 320 + x] = p > 0 && b_U(x, y) < p ? bruma : c; }
    if (o.filo != null && yc >= 0 && (x * 7 + sem * 3) % 5) B[yc * 320 + x] = o.filo;
  }
  if (o.arboles != null) for (let k = 0; k < (o.n ?? 30); k++) { const x = Math.round(h(k, sem, 304) * 319), y = cresta[x] + 1 + Math.round(h(k, sem, 305) ** 1.6 * Math.max(1, yb - cresta[x] - 6)); if (y > yb - 2) continue;
    R.rect(x - 1, y - 1, x + 1, y, o.arboles); R.pset(x, y - 2, o.arboles); R.pset(x + 2, y, o.arboles); }
  return cresta;
}

// el tono de un píxel de muro de piedra seca: hiladas de lajas de caliza (altura ch px) de anchos distintos, con su
// cara de arriba encendida, la de abajo en sombra, juntas de barro oscuras y ripios en ellas. x (del mundo), yy (px
// sobre la base del muro), sc (escala de la hilada). Devuelve el tono (0–7) o −1 para la junta
function b_piedraTono(x, yy, sc, sem) {
  const ch = 3.4 * sc, r0 = Math.floor(yy / ch), yw = yy + Math.sin(x * 0.11 / sc + r0 * 1.7) * 0.8 * sc, row = Math.floor(yw / ch), fy = yw - row * ch;
  const sw = (6 + 8 * h(row, 1, sem)) * sc, off = h(row, 2, sem) * sw * 3, col = Math.floor((x + off) / sw), fx = x + off - col * sw, ancho = sw * (0.75 + 0.5 * h(col, row, sem + 1));
  if (fy < 0.9 || fx < 0.9 || fx > ancho) return h(col, row, sem + 5) < 0.18 || (fx > ancho && fy > 1.5 && h(col, row, sem + 6) < 0.5) ? 2.0 : -1;
  let v = 2.4 + h(col, row, sem) * 2.2 + (h(x >> 1, yy >> 1, sem + 2) - 0.5) * 0.5; if (h(col, row, sem + 9) < 0.12) v -= 1;
  if (fy > ch - 1.7) v += 1.3; else if (fy < 1.9) v -= 0.8; if (fx < 1.9) v += 0.5; else if (fx > ancho - 1.6) v -= 0.6;
  return v;
}

// ruido suave (interpolado) de escala e
const b_ruido = (x, y, e, k) => { const X = x / e, Y = y / e, i = Math.floor(X), j = Math.floor(Y), fx = X - i, fy = Y - j, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy), a = h(i, j, k), b = h(i + 1, j, k), c = h(i, j + 1, k), d = h(i + 1, j + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };

// una piedra suelta (cascote, percutor) con su luz y su sombra
function b_piedra(R, x, y, rx, ry, f = (c) => c) {
  for (let j = -ry; j <= 0; j++) for (let i = -rx; i <= rx; i++) { const d = (i * i) / (rx * rx) + ((j + ry * 0.4) ** 2) / (ry * ry); if (d > 1.05) continue; const v = 4 - (i + rx) / rx * 1.2 + j * 0.25 + (d > 0.8 ? -1.2 : 0);
    R.pset(x + i, y + j, f(b_tono(b_P.cal, v - 1, x + i, y + j))); }
  for (let i = -rx + 1; i <= rx + 2; i++) if (b_U(x + i, y + 1) < 0.6) R.pset(x + i, y + 1, f(b_mez(R.pget(x + i, y + 1), C.k, 0.35)));
}

// una lasca de sílex por el suelo, con su filo brillante
function b_lasca(R, x, y, f = (c) => c) { R.pset(x, y, f(b_P.silex)); R.pset(x + 1, y, f(b_P.silex)); R.pset(x + 1, y - 1, f(b_P.silexL)); R.pset(x - 1, y, f(b_mez(b_P.silex, C.k, 0.4))); }

// un tronco (palanca, andamio, rodillo): cilindro con la luz arriba, corteza a vetas y, con o.corte, el corte con anillos
function b_tronco(R, x0, y0, x1, y1, r, f = (c) => c, o = {}) {
  const L = Math.hypot(x1 - x0, y1 - y0) || 1, nx = -(y1 - y0) / L, ny = (x1 - x0) / L, sg = ny > 0 ? -1 : 1;
  for (let k = -r; k <= r; k++) { const q = k * sg / r, c = q < -0.55 ? b_P.maderaL : q < 0.2 ? b_P.madera : q < 0.75 ? b_P.maderaS : b_mez(b_P.maderaS, C.k, 0.4);
    R.linea(x0 + nx * k, y0 + ny * k, x1 + nx * k, y1 + ny * k, (x, y, i) => (h(i >> 1, k, 51) < 0.12 ? f(b_P.maderaS) : (i + k * 3) % 9 === 0 && Math.abs(q) < 0.6 ? f(b_mez(c, C.k, 0.2)) : f(c))); }
  if (o.corte) { R.disco(x1, y1, r + 0.4, f(b_P.maderaS)); R.disco(x1, y1, r - 0.6, f(b_P.corte)); R.anillo(x1, y1, Math.max(1, r * 0.55), f(b_P.corteS)); R.pset(x1, y1, f(b_P.corteS)); }
}

// un tronco visto de punta (el castillete): la corteza, el corte claro y sus anillos
function b_puntaTronco(R, x, y, r, f = (c) => c) { R.disco(x, y, r + 0.5, f(b_P.maderaS)); R.disco(x - 0.3, y - 0.3, r - 0.5, f(b_P.corte)); if (r > 2.4) R.anillo(x, y, r * 0.5, f(b_P.corteS)); R.pset(Math.round(x - r * 0.5), Math.round(y - r * 0.5), f(C.blanco)); }

// una cuerda de cuero trenzado con su comba (de x0, y0 a x1, y1)
function b_cuerda(R, x0, y0, x1, y1, comba, f = (c) => c) {
  const n = Math.max(2, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
  for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u + comba * 4 * u * (1 - u)); R.pset(x, y, f(i % 3 === 0 ? b_P.cueroS : b_P.cuero)); R.pset(x, y - 1, f(i % 3 === 1 ? b_P.cueroL : b_mez(b_P.cuero, b_P.cueroL, 0.4))); }
}

// la y de una cuerda en x (la misma comba que b_cuerda)
function b_yCuerda(x0, y0, x1, y1, comba, x) { const u = Math.max(0, Math.min(1, (x - x0) / ((x1 - x0) || 1))); return Math.round(y0 + (y1 - y0) * u + comba * 4 * u * (1 - u)); }

// una cesta de mimbre (x, y: el centro de la base) con trenzado, borde y contenido ('piedras' | 'espigas' | 'grano')
function b_cesta(R, x, y, w, hh, cont, t, f = (c) => c) {
  const x0 = Math.round(x - w / 2);
  if (cont === 'piedras') for (let k = 0; k < 7; k++) { const px = x0 + 3 + Math.round(h(k, 1, 61) * (w - 6)), py = y - hh - 1 + Math.round(h(k, 2, 61) * 2); R.disco(px, py, 2 + (k % 2), f(b_tono(b_P.cal, 2.4 + h(k, 3, 61) * 2, px, py))); R.pset(px - 1, py - 1, f(b_P.cal[6])); }
  if (cont === 'espigas') for (let k = 0; k < Math.round(w * 0.8); k++) { const bx = x0 + 2 + Math.round(k * (w - 4) / (w * 0.8)), m = Math.round(Math.sin(t * 1.6 + k) * 0.6), al = hh * 0.7 + (k % 3) * 2, tx = bx + Math.round((k - w * 0.4) * 0.25) + m, ty = Math.round(y - hh - al);
    R.linea(bx, y - hh + 1, tx, ty + 3, f(C.trigoS)); R.linea(tx, ty, tx, ty + 3, f(k % 2 ? C.trigo : hex('#f0d890'))); R.pset(tx - 1, ty + 1, f(C.trigoS)); R.pset(tx + 1, ty + 2, f(C.trigoS)); }
  if (cont === 'grano') for (let i = 1; i < w - 1; i++) R.pset(x0 + i, y - hh - 1 + (i % 2), f(i % 3 ? C.trigo : C.trigoS));
  for (let j = 0; j < hh; j++) { const ins = Math.round((hh - j) * 0.12); for (let i = ins; i < w - ins; i++) { const xx = x0 + i, yy = y - j; let c = ((i >> 1) + j) % 2 ? b_P.cesta : b_P.cestaS; if (i > w * 0.66) c = b_mez(c, C.k, 0.22); else if (i < w * 0.25 && ((i >> 1) + j) % 2) c = b_P.cestaL; R.pset(xx, yy, f(c)); } }
  R.linea(x0 - 1, y - hh, x0 + w, y - hh, f(b_P.cestaL)); R.linea(x0, y - hh + 1, x0 + w - 1, y - hh + 1, f(b_P.cestaS));
  for (let i = -1; i <= w + 1; i++) if (b_U(x0 + i, y + 1) < 0.55) R.pset(x0 + i, y + 1, f(b_mez(R.pget(x0 + i, y + 1), C.k, 0.4)));
}

// la luz cálida de un fuego o una antorcha sobre lo ya pintado (radio r, fuerza f)
function b_luz(R, cx, cy, r, f, c = b_P.calido) {
  const B = R.buf; for (let y = Math.max(0, Math.round(cy - r)); y <= Math.min(179, Math.round(cy + r)); y++) for (let x = Math.max(0, Math.round(cx - r)); x <= Math.min(319, Math.round(cx + r)); x++) {
    const d = Math.hypot(x - cx, (y - cy) * 1.25) / r; if (d >= 1) continue; const a = (1 - d) * (1 - d) * f; if (a > 0.02) B[y * 320 + x] = b_mez(B[y * 320 + x], c, Math.min(0.75, a)); }
}

// el humo que sube y se lo lleva el aire a la derecha (bocanadas tramadas que crecen y se aclaran)
function b_humo(R, x, y, t, o = {}) {
  const n = o.n ?? 7, alto = o.alto ?? 46, deriva = o.deriva ?? 16, f = o.f ?? ((c) => c);
  for (let k = 0; k < n; k++) { const u = ((t * (o.v ?? 0.22) + k / n) % 1), px = x + Math.sin(u * 5 + k) * 2 + u * u * deriva, py = y - u * alto, r = 1.5 + u * (o.r ?? 5), c = b_P.humo[Math.min(3, 1 + Math.floor(u * 3))];
    for (let j = -Math.ceil(r); j <= r; j++) for (let i = -Math.ceil(r); i <= r; i++) { const d = Math.hypot(i, j) / r; if (d > 1) continue; const xx = Math.round(px + i), yy = Math.round(py + j); if (b_U(xx, yy) < (1 - d) * (1 - u) * 1.3) R.pset(xx, yy, f(c)); } }
}

// una hoguera (x, y: el centro de la base): el círculo de piedras, los leños cruzados, las llamas que tiemblan con su
// núcleo blanco, las chispas que suben y el humo; o.s escala; o.f tinte; devuelve la altura de la llama
function b_hoguera(R, x, y, t, o = {}) {
  const s = o.s ?? 1, f = o.f ?? ((c) => c), F = b_P.fuego, fr = Math.floor(t * 11);
  b_humo(R, x, y - 8 * s, t, { n: 8, alto: 60 * s, deriva: 22, r: 6 * s, f });
  b_tronco(R, x - 6 * s, y, x + 5 * s, y - 3 * s, 1, f); b_tronco(R, x + 6 * s, y, x - 4 * s, y - 3 * s, 1, f);
  const w = Math.round(4 * s); let alto = 0;
  for (let k = -w; k <= w; k++) { const hh = Math.round((5 + 5 * h(k, fr, 71)) * s * (1 - Math.abs(k) / (w + 1.5))); alto = Math.max(alto, hh);
    for (let j = 0; j < hh; j++) { const q = j / hh, c = q > 0.82 ? F[1] : q > 0.55 ? F[2] : Math.abs(k) < w * 0.4 && q < 0.4 ? F[4] : F[3]; R.pset(x + k + (j > hh * 0.6 ? Math.round(Math.sin(t * 9 + k) * 0.6) : 0), y - 2 - j, c); } }
  for (let k = 0; k < 4; k++) { const u = ((t * 0.9 + k * 0.27) % 1), sx = Math.round(x + Math.sin(t * 3 + k * 2) * 3 + u * 4), sy = Math.round(y - 6 * s - u * 26 * s); if (u < 0.85) R.pset(sx, sy, u < 0.4 ? F[4] : F[2]); }
  for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, px = Math.round(x + Math.cos(a) * 7 * s), py = Math.round(y + Math.sin(a) * 2 * s); R.rect(px - 1, py - 1, px + 1, py, f(b_tono(b_P.cal, 2.2 + (Math.cos(a) < 0 ? 1.4 : 0), px, py))); R.pset(px - 1, py - 1, f(b_P.cal[5])); }
  return alto;
}

// una antorcha en su pértiga (x, y: la llama), con su halo
function b_antorcha(R, x, y, t, k = 0) {
  const F = b_P.fuego, fr = Math.floor(t * 12 + k * 3);
  R.rect(x - 1, y + 1, x + 1, y + 3, b_P.cueroS); R.pset(x - 1, y + 1, b_P.cuero);
  for (let i = -1; i <= 1; i++) { const hh = 3 + Math.round(3 * h(i, fr, 73)) - Math.abs(i); for (let j = 0; j < hh; j++) R.pset(x + i + (j > 2 ? Math.round(Math.sin(t * 10 + k + j) * 0.6) : 0), y - j, j > hh - 2 ? F[1] : j > 1 ? F[2] : F[4]); }
  if (h(k, fr, 74) < 0.5) R.pset(x + Math.round(Math.sin(t * 7 + k) * 2), y - 7, F[3]);
}

// gente pequeña de fondo (unos 9 px), con pieles; o.accion: 'quieto' | 'andar' | 'cesta' (andando con una cesta en la
// cabeza) | 'tronco' (con un tronco al hombro) | 'tallar' (de rodillas, golpeando con un percutor: devuelve el golpe) |
// 'moler' (de rodillas, empuja la mano de moler) | 'sentado' (come, charla y ríe) | 'palanca' (empuja hacia abajo una
// palanca) | 'tirar' | 'remover'; o.dir ±1; o.k varía la piel, el pelo y la ropa; o.f tinte (la noche)
function b_figura(R, x, y, t, o = {}) {
  const { pset, rect } = R, d = o.dir ?? 1, k = o.k ?? 0, acc = o.accion ?? 'quieto', f = o.f ?? ((c) => c);
  const piel = f([hex('#c8946a'), hex('#a8744a'), hex('#8a5a3a')][k % 3]), pielS = f([hex('#a87450'), hex('#86583a'), hex('#6a442c')][k % 3]), pelo = f([hex('#2a1e18'), hex('#4a3020'), hex('#3a2a22')][(k >> 1) % 3]);
  const ropa = f([hex('#9a6a3e'), hex('#7a5030'), hex('#b08458'), hex('#6a4a30')][k % 4]), ropaS = b_mez(ropa, C.k, 0.35), ropaL = b_mez(ropa, C.blanco, 0.2);
  x = Math.round(x); y = Math.round(y);
  for (let i = -3; i <= 3; i++) if ((i + y) % 2 === 0 || Math.abs(i) < 2) pset(x + i, y + 1, b_mez(R.pget(x + i, y + 1), C.k, 0.4));   // su sombra en el suelo
  const cabeza = (cx, cy) => { rect(cx - 1, cy - 2, cx + 1, cy, piel); pset(cx + d, cy - 1, b_mez(piel, C.k, 0.6)); rect(cx - 1, cy - 3, cx + 1, cy - 3, pelo); pset(cx - d, cy - 2, pelo); if (k % 2) { pset(cx - d, cy - 1, pelo); pset(cx - d * 2, cy - 1, pelo); } };
  const torso = (cx, cy, alto = 4) => { rect(cx - 1, cy - alto + 1, cx + 1, cy, ropa); rect(cx + 1, cy - alto + 1, cx + 1, cy, ropaS); pset(cx - 1, cy - alto + 1, ropaL); pset(cx - 1, cy, ropaS); };
  let golpe = false;
  if (acc === 'tallar' || acc === 'moler' || acc === 'remover') {
    // de rodillas: las piernas dobladas hacia atrás
    rect(x - d * 2, y - 1, x, y, ropaS); pset(x - d * 3, y, pielS);
    torso(x, y - 2, 4); cabeza(x + (acc === 'moler' ? d : 0), y - 6);
    if (acc === 'tallar') { const u = (t * 2.4 + k * 0.37) % 1; golpe = u > 0.5 && u < 0.62; const arriba = u < 0.45;
      if (arriba) { pset(x + d * 2, y - 6, piel); pset(x + d * 2, y - 8, piel); pset(x + d * 2, y - 7, piel); rect(x + d * 2 - 1, y - 10, x + d * 2, y - 9, f(b_P.cal[3])); }
      else { pset(x + d * 2, y - 4, piel); pset(x + d * 3, y - 3, piel); rect(x + d * 3, y - 3, x + d * 4, y - 2, f(b_P.cal[3])); } }
    else if (acc === 'moler') { const m = Math.round(Math.sin(t * 4 + k) * 1.5); pset(x + d * 2, y - 4, piel); pset(x + d * (3 + m), y - 3, piel); rect(x + d * (3 + m) - 1, y - 2, x + d * (3 + m) + 1, y - 2, f(b_P.cal[2])); }
    else { const m = Math.round(Math.sin(t * 3 + k) * 1); pset(x + d * 2, y - 4, piel); R.linea(x + d * 3, y - 4, x + d * (5 + m), y - 1, f(b_P.maderaS)); }
    return golpe;
  }
  if (acc === 'sentado') {
    rect(x - 2, y - 1, x + 2, y, ropaS); pset(x - 3, y, pielS); pset(x + 3, y, pielS);
    const risa = Math.sin(t * 3.1 + k * 2) > 0.82 ? 1 : 0; torso(x, y - 2, 4); cabeza(x, y - 6 - risa);
    if (Math.sin(t * 1.4 + k * 1.3) > 0.5) { pset(x + d * 2, y - 5, piel); pset(x + d, y - 7, piel); } else { pset(x + d * 2, y - 3, piel); pset(x + d * 3, y - 3, piel); }
    return false;
  }
  // de pie
  const anda = acc === 'andar' || acc === 'cesta' || acc === 'tronco', fase = anda ? Math.floor(t * 6 + k) % 2 : 0, incl = acc === 'tirar' ? -d : acc === 'palanca' ? d : 0;
  if (fase) { pset(x - 1, y, pielS); pset(x, y - 1, ropaS); pset(x + 1, y, pielS); } else { pset(x - 1, y, pielS); pset(x - 1, y - 1, ropaS); pset(x + 1, y, pielS); pset(x + 1, y - 1, ropaS); }
  torso(x + (incl > 0 ? incl : 0), y - 2, 4); if (incl < 0) torso(x - d, y - 3, 3);
  const hx = x + incl; cabeza(hx, y - 6 + (acc === 'palanca' ? 1 : 0));
  if (acc === 'cesta') { rect(hx - 2, y - 11, hx + 2, y - 10, f(b_P.cesta)); pset(hx - 2, y - 11, f(b_P.cestaL)); pset(hx + 2, y - 10, f(b_P.cestaS)); pset(hx - 1, y - 12, f(b_P.cal[4])); pset(hx + 1, y - 12, f(b_P.cal[3])); pset(hx + d * 2, y - 8, piel); pset(hx + d * 2, y - 9, piel); }
  else if (acc === 'tronco') { R.linea(x - d * 7, y - 9, x + d * 6, y - 10, f(b_P.madera)); R.linea(x - d * 7, y - 8, x + d * 6, y - 9, f(b_P.maderaS)); pset(x + d * 6, y - 10, f(b_P.corte)); pset(x + d, y - 7, piel); }
  else if (acc === 'palanca') { pset(x + d * 2, y - 4, piel); pset(x + d * 3, y - 3, piel); }
  else if (acc === 'tirar') { pset(hx + d * 2, y - 4, piel); pset(hx + d * 3, y - 4, piel); }
  else if (acc === 'antorcha') { R.linea(x + d * 2, y - 4, x + d * 2, y - 10, f(b_P.maderaS)); pset(x + d * 2, y - 4, piel); }
  else { pset(x - 2, y - 4, piel); pset(x + 2, y - 4, piel); }
  return false;
}

// una bandada de grullas en uve que cruza despacio (lejos, aleteando)
function b_grullas(R, t, y0, f = (c) => c) {
  const u = (t % 30) / 30, x0 = Math.round(-40 + u * 400), c = f(hex('#3a2e44'));
  for (let k = 0; k < 9; k++) { const n = Math.ceil(k / 2), lado = k % 2 ? 1 : -1, x = x0 - n * 7, y = y0 + lado * n * 3 - Math.round(u * 8), a = Math.sin(t * 6 + k) > 0 ? 1 : -1;
    if (x > 268 && y < 50) continue; R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x + 2, y, c); R.pset(x - 1, y - a, c); R.pset(x + 3, y - a, c); R.pset(x + 3, y + 1, c); }
}

// el muro del anillo de 'construccion': la base (y) y la altura en cada x
const b_yb = (x) => 150 - 50 * Math.sqrt(Math.max(0, 1 - ((x - 165) / 200) ** 2));

const b_cima = (x) => { const yb = b_yb(x), wh = 18 + (yb - 100) * 0.35; let a = wh * (0.84 + 0.16 * Math.sin(x * 0.09) * Math.sin(x * 0.023 + 1)); if (x > 204 && x < 248) a *= 0.55 + 0.1 * Math.sin(x * 0.4); return Math.round(yb - a); };

// lo fijo del encuadre 'construccion' (lomas, el muro, el banco, los pilares del anillo, el central de pie, el andamio,
// el castillete, el suelo y lo que hay por él)
function b_consFijo(R, noche, tarde = false) {
  const B = R.buf, f = (c) => (noche ? b_mez(c, b_P.noche, 0.62) : c), cal = noche ? b_P.calN : b_P.cal, lsom = tarde ? 2.3 : 1;
  // las lomas lejanas y la estepa que sube hacia el recinto
  b_colinas(R, 80, 9, 96, f(hex('#7a6a96')), f(hex('#c89aa6')), 2.1, { arboles: f(hex('#5e4e78')), n: 22 });
  b_colinas(R, 90, 7, 104, f(hex('#8a6a74')), f(hex('#b88a84')), 4.6, { arboles: f(hex('#5a4458')), n: 26, filo: f(hex('#f0b48c')) });
  // el campamento de los constructores en la loma, a lo lejos (tiendas de pieles con sus palos, visto por el hueco del muro)
  for (const [tx, ty, tw] of [[226, 90, 5], [237, 89, 6], [250, 90, 5], [262, 91, 4]]) { for (let j = 0; j <= tw; j++) for (let i = -j; i <= j; i++) R.pset(tx + i, ty - tw + j, f(i < 0 ? hex('#8a5a44') : i === 0 ? hex('#5a3a2e') : hex('#6e4836'))); R.pset(tx, ty - tw - 1, f(b_P.maderaS)); R.pset(tx - 1, ty - tw - 2, f(b_P.maderaS)); R.pset(tx + 1, ty - tw - 2, f(b_P.maderaS)); R.pset(tx, ty, f(hex('#2a1a16'))); }
  const ES = noche ? b_P.estepa.map(f) : b_P.estepa;
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) { if (B[y * 320 + x] !== b_VACIO && y < 105) continue; const v = 2.6 + (y - 96) * 0.03 - x * 0.004 + (h(x >> 1, y, 81) - 0.5) * 1.2 + (Math.sin(x * 0.07 + y * 0.3) > 0.85 ? 0.8 : 0); B[y * 320 + x] = b_tono(ES, v, x, y); }
  for (let k = 0; k < 140; k++) { const x = Math.round(h(k, 1, 82) * 319), y = 98 + Math.round(h(k, 2, 82) * 28); if (y > b_cima(x)) continue; R.pset(x, y, f(k % 3 ? b_P.estepa[1] : C.trigo)); R.pset(x, y - 1, f(b_P.estepa[k % 2 ? 4 : 2])); }
  // el suelo del recinto: la roca madre aplanada con tierra, guijarros y lascas
  const TI = noche ? b_P.tierraN : b_P.tierra;
  for (let x = 0; x < 320; x++) { const yb = Math.round(b_yb(x)); for (let y = yb; y < 180; y++) {
    const rn = b_ruido(x, y * 2.2, 16, 83) + b_ruido(x, y * 2.2, 5, 84) * 0.35, roca = rn > 0.98, grieta = roca && Math.abs(b_ruido(x, y * 2, 7, 88) - 0.5) < 0.025, n = h(x, y, 85);
    let v = 2.5 + (y - yb) * 0.014 - x * 0.003 + (rn - 0.6) * 1.2 + (h(x >> 1, y >> 1, 86) - 0.5) * 0.6; if (n < 0.035) v -= 1.2; else if (n > 0.97) v += 1.4;
    // la senda pisada por la fila que tira (más clara y lisa) y los dos surcos del arrastre que vienen de la derecha
    const ds = Math.abs(y - (151 + 2.5 * Math.sin(x * 0.06))); if (x < 150 && ds < 6 && !roca) v = v * 0.55 + 1.55 - ds * 0.05 + (h(x, y, 89) < 0.08 ? -0.7 : 0);
    if (x > 212) { const ys = 150 + (x - 212) * 0.085; for (const dy of [0, 7]) { const d = y - (ys + dy); if (d > -1.5 && d < -0.5) v -= 2.2; else if (d >= -0.5 && d < 0.5) v += 1.3; } }
    B[y * 320 + x] = grieta ? f(b_P.cal[1]) : roca ? b_tono(cal, v + 0.9 - (rn > 1.04 ? 0 : 0.5), x, y) : b_tono(TI, v, x, y); } }
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 87) * 319), y = Math.round(b_yb(x) + 6 + h(k, 2, 87) * (176 - b_yb(x))); if (k % 3) b_lasca(R, x, y, f); else R.pset(x, y, f(b_P.cal[5])); }
  // huellas de pies descalzos (pares) por la senda y hacia el pilar, y polvo de cal pisado alrededor de las cestas
  for (let k = 0; k < 46; k++) { const x = Math.round(8 + h(k, 1, 90) * 200), y = Math.round(144 + h(k, 2, 90) * 30); if (y < b_yb(x) + 3) continue; const c = f(b_mez(b_P.tierra[1], C.k, 0.2));
    R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x + 3, y - 1, c); R.pset(x + 4, y - 1, c); R.pset(x + 1, y + 1, f(b_P.tierra[4])); }
  // las manchas de ocre rojo donde se molió el pigmento, y el cerco de ceniza vieja de otra hoguera
  for (const [mx, my, r] of [[150, 166, 3], [156, 170, 2], [286, 154, 3]]) for (let j = -r; j <= r; j++) for (let i = -r * 2; i <= r * 2; i++) if ((i * i) / (4 * r * r) + (j * j) / (r * r) < 1 && b_U(mx + i, my + j) < 0.7) R.pset(mx + i, my + j, f(b_mez(hex('#a04a2a'), b_P.tierra[2], 0.3 + 0.4 * h(i, j, 93))));
  for (let i = -9; i <= 9; i++) for (let j = -3; j <= 3; j++) { const d = (i * i) / 81 + (j * j) / 9; if (d < 1 && b_U(232 + i, 172 + j) < 1 - d) R.pset(232 + i, 172 + j, f(d < 0.4 ? hex('#3a3436') : hex('#6a605a'))); }
  // un rollo de cuerda de repuesto y un odre de piel tumbados en el suelo, delante de la fila
  for (let r = 1; r <= 5; r++) for (let a = 0; a < 40; a++) { const q = a / 40 * Math.PI * 2; R.pset(Math.round(118 + Math.cos(q) * r * 1.6), Math.round(172 + Math.sin(q) * r * 0.6), f(r % 2 ? b_P.cuero : (a % 5 ? b_P.cueroL : b_P.cueroS))); }
  for (let j = -3; j <= 2; j++) for (let i = -6; i <= 6; i++) { if ((i * i) / 36 + (j * j) / 9 > 1) continue; R.pset(84 + i, 170 + j, f(j < -1 ? b_P.cueroL : j > 0 ? b_P.cueroS : b_P.cuero)); }
  R.pset(91, 168, f(b_P.cueroS)); R.pset(92, 167, f(b_P.cueroS)); R.pset(80, 167, f(C.blanco)); for (let i = -6; i <= 8; i++) R.pset(84 + i, 173, f(b_mez(b_P.tierra[1], C.k, 0.4)));
  // el muro de piedra seca, a hiladas (cara interior), y el banco a su pie
  for (let x = 0; x < 320; x++) { const yb = Math.round(b_yb(x)), top = b_cima(x), sc = 1 + (yb - 100) / 70;
    for (let y = top; y < yb; y++) { const v = b_piedraTono(x, yb - y, sc, 91); B[y * 320 + x] = v < 0 ? f(hex('#3e2a1e')) : b_tono(cal, v - 0.4 - (x - 60) * 0.002 + (y === top ? 1.2 : 0), x, y); }
    B[top * 320 + x] = b_tono(cal, 5.2, x, top); if (top > 0) B[(top - 1) * 320 + x] = (x * 7) % 11 < 6 ? b_tono(cal, 3.5, x, top - 1) : B[(top - 1) * 320 + x];
    for (let y = yb - 3; y <= yb; y++) B[y * 320 + x] = b_tono(cal, y === yb - 3 ? 5.6 : 3.2 - (y - yb + 3) * 0.4 + ((x + 3) % 13 === 0 ? -1.5 : 0), x, y);
    for (let y = yb + 1; y <= yb + 2; y++) if (b_U(x, y) < 0.7) B[y * 320 + x] = b_mez(B[y * 320 + x], C.k, 0.35); }
  // los cascotes del hueco sin terminar y las piedras apiladas para seguir
  for (let k = 0; k < 14; k++) { const x = 206 + Math.round(h(k, 1, 92) * 40), y = Math.round(b_yb(x)) + 2 + Math.round(h(k, 2, 92) * 6); b_piedra(R, x, y, 2 + (k % 3), 2, f); }
  // los pilares del anillo, delante del muro (los animales en el fuste)
  for (const [px, rel] of [[22, ['jabali']], [70, ['serpientes']], [160, ['grulla']], [238, ['escorpion']], [300, ['buitre']]]) { const yb = Math.round(b_yb(px)) + 2;
    d_pilar(R, px, yb, { escala: 0.84 + (yb - 100) / 60 * 0.2, relieves: rel, brazos: false, luz: noche ? 0 : tarde ? 0.75 : 0.5, noche, sem: px, sombra: true, largoSombra: lsom }); }
  // el central de pie: su zócalo tallado en la roca, el pilar, y el andamio de troncos atados a su izquierda
  for (let i = -16; i <= 16; i++) { const y = 134 + Math.round(Math.sqrt(Math.max(0, 1 - (i / 16) ** 2)) * 2); R.pset(118 + i, y, f(b_P.cal[2])); R.pset(118 + i, y + 1, f(b_mez(b_P.cal[1], C.k, 0.3))); }
  d_pilar(R, 118, 134, { escala: 1.35, relieves: ['zorro'], brazos: true, luz: noche ? 0 : tarde ? 0.8 : 0.6, noche, sem: 3, largoSombra: lsom });
  b_tronco(R, 92, 136, 93, 64, 1, f); b_tronco(R, 105, 136, 104, 66, 1, f); b_tronco(R, 90, 112, 108, 111, 1, f); b_tronco(R, 90, 88, 108, 87, 1, f); b_tronco(R, 92, 134, 105, 92, 0, f);
  for (const [lx, ly] of [[93, 112], [104, 111], [93, 88], [104, 87]]) { R.pset(lx - 1, ly - 1, f(b_P.cueroL)); R.pset(lx + 1, ly + 1, f(b_P.cueroL)); R.pset(lx, ly, f(b_P.cuero)); }
  // el castillete de troncos donde apoya la cabeza del que se levanta (capas cruzadas: de punta y a lo largo)
  for (let capa = 0; capa < 6; capa++) { const y = 143 - capa * 5;
    if (capa % 2 === 0) for (const cx of [258, 266, 274, 282, 290]) b_puntaTronco(R, cx, y, 2.6, f);
    else { b_tronco(R, 254, y + 1, 294, y, 2, f); } }
  // cestas de piedras, un montón de cascotes y percutores junto al muro; el círculo de la hoguera de la izquierda
  b_cesta(R, 150, 113, 12, 7, 'piedras', 0, f); b_cesta(R, 170, 112, 10, 6, 'piedras', 0, f);
  for (let k = 0; k < 9; k++) b_piedra(R, 36 + (k % 5) * 4 + (k > 4 ? 2 : 0), 141 - (k > 4 ? 3 : 0), 2, 2, f);
  if (noche) for (const [px, py] of [[52, 116], [150, 96], [246, 100]]) { b_tronco(R, px, py + 3, px + 1, py + 30, 0, f); }
  // al atardecer, todo lo fijo se tiñe de la luz cálida y baja (más en lo alto, que es lo que aún toca el sol)
  if (tarde) { const cal2 = hex('#ff8a4a'), som = hex('#4a2438'); for (let i = 60 * 320; i < 57600; i++) { const c = B[i]; if (c === b_VACIO) continue; const y = (i / 320) | 0;
    B[i] = b_mez(b_mez(c, cal2, 0.2 - Math.max(0, y - 120) * 0.0015), som, Math.max(0, y - 130) * 0.003); } }
}
// 'construccion' (ver la cabecera de recinto)
function b_construccion(R, t, o) {
  const noche = !!o.noche, tarde = !noche && !!o.atardecer, CAL = hex('#ff8a4a'), f = (c) => (noche ? b_mez(c, b_P.noche, 0.55) : tarde ? b_mez(c, CAL, 0.16) : c), hor = 90;
  b_cielo(R, t, { hor, modo: noche ? 'noche' : tarde ? 'tarde' : 'alba', sol: noche ? null : tarde ? [50, 80, 12] : [62, 70, 9], luna: [214, 30, 6], cumulos: 5 });
  if (!noche) b_grullas(R, t, tarde ? 46 : 40, tarde ? (c) => b_mez(c, hex('#2a1a2a'), 0.4) : undefined);
  b_pegar(R, b_capa(R, 'cons' + (noche ? 'N' : tarde ? 'T' : 'D'), () => b_consFijo(R, noche, tarde)), 60);
  // a lo lejos: el humo del campamento de la loma, una manada de gacelas que cruza la loma lejana y un cazador que vuelve
  if (!noche) b_humo(R, 244, 84, t, { n: 5, alto: 26, deriva: 12, r: 3, v: 0.12, f });
  for (let k = 0; k < 5; k++) { const x = Math.round(((t * 4 + k * 7 + (k % 2) * 3) % 420) - 60), y = 82 + (k % 3) - Math.round(Math.max(0, Math.sin(t * 7 + k * 1.3)) * 1.5);
    if (x < 0 || x > 104) continue; const c = f(noche ? hex('#3a3a5a') : hex('#8a5a3e')), cs = f(noche ? hex('#24243e') : hex('#5a3a2a'));
    R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x + 2, y - 1, cs); R.pset(x, y + 1, cs); R.pset(x + 2, y + 1, cs); R.pset(x + 2, y - 2, cs); }
  // el porteador que va y viene por lo alto del muro, el que cruza la loma con un tronco y el que coloca piedras en el hueco
  { const u = (t * 0.05) % 2, ida = u < 1, x = Math.round(ida ? 30 + u * 70 : 100 - (u - 1) * 70); b_figura(R, x, b_cima(x) - 1, t, { accion: 'cesta', dir: ida ? 1 : -1, k: 1, f }); }
  { const x = Math.round(330 - ((t * 7) % 380)); if (x > -10 && x < 268) b_figura(R, x, 99, t, { accion: 'tronco', dir: -1, k: 2, f }); }
  { const u = (t * 0.5) % 1, x = 226; b_figura(R, x, b_cima(x) + 1, t, { accion: u < 0.5 ? 'quieto' : 'cesta', dir: -1, k: 4, f }); if (u > 0.5) b_piedra(R, x - 3, b_cima(x) - 1, 2, 1, f); }
  // el tallista en el andamio: golpea la cabeza del central y saltan lascas y polvo
  if (b_figura(R, 99, 87, t, { accion: 'tallar', dir: 1, k: 3, f }) || true) { const u = (t * 2.4 + 3 * 0.37) % 1; if (u > 0.5 && u < 0.9) { const q = (u - 0.5) / 0.4; for (let k = 0; k < 4; k++) R.pset(Math.round(104 + q * (3 + k * 2)), Math.round(84 - q * (4 - k) + q * q * 10), f(k % 2 ? b_P.cal[6] : b_P.cal[4])); } }
  // las hogueras y su humo
  b_hoguera(R, 44, 131, t, { s: 0.9, f });
  b_hoguera(R, 306, 137, t + 1.3, { s: 0.8, f });
  b_figura(R, 56, 132, t, { accion: 'remover', dir: -1, k: 5, f });
  // EL PILAR QUE SE LEVANTA: el ángulo, las palancas con sus obreros, las cuerdas
  const lv = b_ease(o.levantar ?? 0), ang = 64 * (1 - lv), a = ang * Math.PI / 180, s = 1.5, X0 = 196, Y0 = 146;
  const P = (u, v) => [X0 + (u * Math.cos(a) + v * Math.sin(a)) * s, Y0 - (-u * Math.sin(a) + v * Math.cos(a)) * s];
  for (let i = -18; i <= 18; i++) { const y = Y0 + Math.round(Math.sqrt(Math.max(0, 1 - (i / 18) ** 2)) * 2); R.pset(X0 + i, y, f(b_P.cal[2])); R.pset(X0 + i, y + 1, f(b_mez(b_P.cal[1], C.k, 0.3))); }
  const pil = d_pilar(R, X0, Y0, { escala: s, inclinado: ang, relieves: ['uro'], brazos: true, luz: noche ? 0 : tarde ? 0.8 : 0.6, noche, sem: 7, sombra: ang < 20, largoSombra: tarde ? 2.3 : 1 });
  if (ang > 12) for (const [vv, k] of [[22, 0], [34, 1]]) { const [px, py] = P(-11.5, vv), fx = px - 8, fy = py + 12, ex = px - 18, ey = py + 30;
    b_piedra(R, Math.round(fx), Math.round(fy) + 3, 3, 2, f); b_tronco(R, Math.round(px), Math.round(py), Math.round(ex), Math.round(ey), 1, f);
    b_figura(R, Math.round(ex) - 2, Math.round(ey) + 4 + Math.round(Math.sin(t * 2 + k) * 0.5), t, { accion: 'palanca', dir: 1, k: 6 + k, f }); }
  // las dos cuerdas de cuero: del cuello a la izquierda, por la fila de los que tiran, hasta el suelo
  const cuerdas = [], cabeza = P(0, 60).map(Math.round);
  for (const [k, dv] of [[0, 0], [1, 1.6]]) { const [nx, ny] = P(-6 - k * 2, 51 - dv); const p1 = [100, 139 - k * 3], p2 = [12, 146 - k * 2];
    const comba = Math.max(1, Math.hypot(nx - p1[0], ny - p1[1]) * 0.03);
    b_cuerda(R, Math.round(nx), Math.round(ny), p1[0], p1[1], comba, f); b_cuerda(R, p1[0], p1[1], p2[0], p2[1], 1, f);
    cuerdas.push([Math.round(nx), Math.round(ny), p1[0], p1[1], p2[0], p2[1], comba]); }
  // el nudo en el cuello
  { const [nx, ny] = P(-6, 51); R.rect(Math.round(nx) - 1, Math.round(ny) - 1, Math.round(nx) + 1, Math.round(ny) + 1, f(b_P.cuero)); R.pset(Math.round(nx) - 1, Math.round(ny) - 1, f(b_P.cueroL)); }
  // de noche: las antorchas en sus pértigas y la luz del fuego sobre la caliza
  if (noche) {
    for (const [i, [px, py]] of [[52, 116], [150, 96], [246, 100]].entries()) { b_antorcha(R, px, py, t, i); b_luz(R, px, py, 46 + Math.sin(t * 9 + i) * 2, 0.55); }
    b_luz(R, 44, 126, 40 + Math.sin(t * 11) * 2, 0.6); b_luz(R, 306, 132, 36, 0.5);
  } else {
    // el polvo que flota en la luz rasante
    for (let k = 0; k < 18; k++) { const x = Math.round((h(k, 1, 95) * 320 + t * (3 + k % 4)) % 330) - 5, y = Math.round(96 + h(k, 2, 95) * 60 + Math.sin(t * 0.8 + k) * 4); if (Math.sin(t * 1.3 + k * 2.1) > -0.2) R.pset(x, y, tarde ? hex('#ffc080') : hex('#fff0c8')); }
    // al atardecer, los haces de luz baja que entran por los huecos del muro y cruzan el suelo, y que respiran despacio
    if (tarde) for (const [bx, w] of [[20, 22], [132, 14], [214, 26]]) { const a = 0.17 + 0.05 * Math.sin(t * 0.6 + bx); for (let y = 136; y < 180; y++) for (let i = 0; i < w; i++) { const X = Math.round(bx + i + (y - 136) * 1.6); if (X > 319) break; if (b_U(X, y) < 0.55) R.pset(X, y, b_mez(R.pget(X, y), hex('#ffc070'), a)); } }
  }
  const enCuerda = (i, x) => { const c = cuerdas[i] ?? cuerdas[0]; return x >= c[2] ? b_yCuerda(c[0], c[1], c[2], c[3], c[6], x) : b_yCuerda(c[2], c[3], c[4], c[5], 1, x); };
  return { cuerdas: cuerdas.map((c) => c.slice(0, 6)), enCuerda, cabeza, manos: pil.manos };
}
// los pilares de la cámara 'pilar', en fila cada 190 px (el central con brazos; los demás, solo animales)
const b_FILA = [{ brazos: true, rel: ['zorro'] }, { rel: ['jabali', 'serpientes'] }, { rel: ['escorpion', 'grulla'] }, { rel: ['buitre', 'uro'] }];

// el fondo de la cámara 'pilar' en dos búferes seguidos (x 0–639 del mundo), para la paralaje: la loma, el muro con su
// banco y pilares pequeños empotrados
function b_fondoPilar(R, noche, seg) {
  const B = R.buf, dx = seg * 320, f = (c) => (noche ? b_mez(c, b_P.noche, 0.62) : c), cal = noche ? b_P.calN : b_P.cal;
  b_colinas(R, 54, 7, 70, f(hex('#7a6a96')), f(hex('#c89aa6')), 2.1 + seg * 1.7, { arboles: f(hex('#5e4e78')), n: 16 });
  const ES = noche ? b_P.estepa.map(f) : b_P.estepa;
  for (let y = 64; y < 80; y++) for (let x = 0; x < 320; x++) { const v = 2.5 + (y - 64) * 0.06 + (h((x + dx) >> 1, y, 81) - 0.5) * 1.2; B[y * 320 + x] = b_tono(ES, v, x, y); }
  const cima = (wx) => Math.round(70 + 4 * Math.sin(wx * 0.05) * Math.sin(wx * 0.013 + 2) + 2 * h(wx >> 3, 1, 96));
  for (let x = 0; x < 320; x++) { const wx = x + dx, top = cima(wx);
    for (let y = top; y < 132; y++) { const v = b_piedraTono(wx, 132 - y, 1.5, 97); B[y * 320 + x] = v < 0 ? f(hex('#3e2a1e')) : b_tono(cal, v - 0.6 - (y - top) * 0.008, x, y); }
    B[top * 320 + x] = b_tono(cal, 5.3, x, top);
    for (let y = 132; y < 142; y++) B[y * 320 + x] = y < 134 ? b_tono(cal, 5.6, x, y) : b_tono(cal, 2.8 - (y - 134) * 0.15 + ((wx + 5) % 23 === 0 ? -1.6 : 0) + (h(wx >> 2, y >> 1, 98) - 0.5) * 0.8, x, y); }
  // los pilares empotrados en el muro (la cabeza asoma por arriba)
  const RELS = ['grulla', 'jabali', 'serpientes', 'zorro', 'buitre', 'escorpion', 'uro'];
  for (let i = -1; i < 6; i++) { const wx = 60 + i * 124, x = wx - dx; if (x < -40 || x > 360) continue; d_pilar(R, x, 133, { escala: 1.08, relieves: [RELS[(i + 7) % 7]], brazos: false, luz: noche ? 0 : 0.4, noche, sem: wx, sombra: false }); }
}

// 'pilar' (ver la cabecera de recinto)
function b_recintoPilar(R, t, o) {
  const noche = !!o.noche, B = R.buf, f = (c) => (noche ? b_mez(c, b_P.noche, 0.55) : c), cam = Math.round((o.recorrer ?? 0) * 570), off = Math.round(cam * 0.5);
  b_cielo(R, t, { hor: 66, modo: noche ? 'noche' : 'alba', sol: noche ? null : [40, 46, 8], luna: [210, 26, 6], cumulos: 4 });
  if (!noche) b_grullas(R, t + 9, 30);
  const segs = [0, 1].map((k) => b_capa(R, 'pil' + (noche ? 'N' : 'D') + k, () => b_fondoPilar(R, noche, k)));
  for (let y = 40; y < 142; y++) for (let x = 0; x < 320; x++) { const wx = x + off, b = segs[wx >= 320 ? 1 : 0], c = b[y * 320 + (wx % 320)]; if (c !== b_VACIO) B[y * 320 + x] = c; }
  // a lo lejos, por encima del muro: el humo de dos hogueras del campamento y una manada de gacelas que cruza la estepa
  for (const [wx0, k] of [[150, 0], [470, 1]]) { const x = wx0 - Math.round(off * 0.6); if (x > -20 && x < 300) b_humo(R, x, 62, t + k * 2, { n: 5, alto: 24, deriva: 10, r: 3, v: 0.12, f }); }
  for (let k = 0; k < 6; k++) { const x = Math.round(((t * 5 + k * 6 + (k % 2) * 2 - off * 0.6) % 460 + 460) % 460) - 70, y = 61 + (k % 3) - Math.round(Math.max(0, Math.sin(t * 7 + k * 1.3)) * 1.5);
    if (x < 0 || x > 270) continue; const c = f(noche ? hex('#3a3a5a') : hex('#8a5a3e')), cs = f(noche ? hex('#24243e') : hex('#5a3a2a'));
    R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x + 2, y - 1, cs); R.pset(x, y + 1, cs); R.pset(x + 2, y + 1, cs); R.pset(x + 2, y - 2, cs); }
  // vida en el muro (a media velocidad): un porteador por arriba y una lagartija que corre y se para
  { const wx = Math.round(40 + ((t * 9) % 520)), x = wx - off; if (x > -6 && x < 270) b_figura(R, x, Math.round(70 + 4 * Math.sin(wx * 0.05) * Math.sin(wx * 0.013 + 2)) - 1, t, { accion: 'cesta', dir: 1, k: 2, f }); }
  { const ciclo = t % 6, wx = 230 + (ciclo < 1 ? ciclo * 30 : ciclo < 3 ? 30 : 30 + (ciclo - 3) * 22), x = Math.round(wx - off), y = 104 + Math.round(ciclo < 3 ? 0 : -(ciclo - 3) * 3);
    if (x > 2 && x < 316) { const c = f(hex('#6a7a4a')), cs = f(hex('#4a5636')); R.rect(x - 2, y, x + 2, y, c); R.pset(x + 3, y, cs); R.pset(x - 3, y + 1, cs); R.pset(x - 4, y + 1, cs); R.pset(x - 1, y - 1, cs); R.pset(x + 1, y + 1, cs); R.pset(x + 2, y, f(C.k)); } }
  // el suelo de cal con guijarros (se mueve más deprisa cuanto más cerca)
  const SU = noche ? b_P.calN : b_P.cal;
  for (let y = 142; y < 180; y++) { const o2 = Math.round(cam * (0.5 + 0.5 * (y - 142) / 38)); for (let x = 0; x < 320; x++) { const wx = x + o2, n = h(wx, y, 99);
    let v = 3.3 + (y - 142) * 0.02 + (h(wx >> 2, y >> 1, 100) - 0.5) * 0.7 - (y < 145 ? (145 - y) * 0.4 : 0); if (n < 0.05) v -= 1.3; else if (n > 0.95) v += 1.2;
    // la roca madre aflora en placas con sus grietas, y la senda pisada (más lisa) que va de pilar en pilar
    const rn = b_ruido(wx, y * 2.4, 14, 103), ds = Math.abs(y - 160 - 3 * Math.sin(wx * 0.021)); if (rn > 0.7) v += (rn < 0.72 ? -1.6 : 1.1) + (Math.abs(b_ruido(wx, y * 2, 6, 104) - 0.5) < 0.03 ? -2.4 : 0); if (ds < 5) v = v * 0.6 + 1.6;
    const gu = h(wx >> 2, y >> 1, 101) < 0.07; B[y * 320 + x] = gu ? b_tono(noche ? b_P.tierraN : b_P.tierra, 3 + ((wx + y) & 1), x, y) : b_tono(SU, v, x, y); } }
  // por el suelo (a la velocidad de cada fila): lascas de sílex, huellas, astillas de caliza del tallado y manchas de ocre
  for (let k = 0; k < 90; k++) { const wy = 146 + Math.round(h(k, 2, 105) * 32), o2 = Math.round(cam * (0.5 + 0.5 * (wy - 142) / 38)), x = Math.round(((h(k, 1, 105) * 900 - o2) % 900 + 900) % 900) - 10; if (x < 0 || x > 319) continue;
    if (k % 4 === 0) b_lasca(R, x, wy, f); else if (k % 4 === 1) { const c = f(b_mez(b_P.cal[1], C.k, 0.15)); R.pset(x, wy, c); R.pset(x + 1, wy, c); R.pset(x + 3, wy - 1, c); R.pset(x + 4, wy - 1, c); }
    else if (k % 4 === 2) { R.pset(x, wy, f(b_P.cal[6])); R.pset(x + 1, wy, f(b_P.cal[4])); R.pset(x, wy + 1, f(b_P.cal[2])); }
    else if (k % 8 === 3) for (let i = -3; i <= 3; i++) for (let j = -1; j <= 1; j++) if (b_U(x + i, wy + j) < 0.6 - Math.abs(i) * 0.1) R.pset(x + i, wy + j, f(b_mez(hex('#a04a2a'), b_P.cal[3], 0.45))); }
  // piedras sueltas con su sombra, un mazo de madera y un pico de asta de ciervo tirados (el pico y el mazo de los tallistas)
  const enSuelo = (wx, wy) => wx - Math.round(cam * (0.5 + 0.5 * (wy - 142) / 38));
  for (let k = 0; k < 26; k++) { const wy = 154 + Math.round(h(k, 2, 106) * 24), x = Math.round(((h(k, 1, 106) * 980 - (cam * (0.5 + 0.5 * (wy - 142) / 38))) % 980 + 980) % 980) - 20;
    if (x > -6 && x < 326) b_piedra(R, x, wy, 2 + (k % 3), 1 + (k % 2) + (k % 5 === 0 ? 1 : 0), f); }
  for (const [wx, wy] of [[40, 170], [500, 166]]) { const x = enSuelo(wx, wy); if (x < -16 || x > 336) continue;
    b_tronco(R, x - 8, wy, x + 4, wy - 2, 0, f); for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (i * i + j * j <= 5) R.pset(x + 6 + i, wy - 3 + j, f(j < 0 ? b_P.maderaL : i > 0 ? b_P.maderaS : b_P.madera)); R.pset(x + 8, wy - 1, f(b_mez(C.k, b_P.tierra[2], 0.5))); }
  for (const [wx, wy] of [[318, 174], [700, 168]]) { const x = enSuelo(wx, wy); if (x < -16 || x > 336) continue; const c = f(hex('#e8dcc0')), cs = f(hex('#a8987a'));
    R.linea(x - 7, wy, x + 5, wy - 3, c); R.linea(x - 7, wy + 1, x + 5, wy - 2, cs); R.linea(x - 2, wy - 1, x - 4, wy - 6, c); R.linea(x + 2, wy - 2, x + 3, wy - 7, c); R.pset(x + 3, wy - 8, cs); R.pset(x - 5, wy - 7, cs);
    for (let i = -6; i <= 6; i++) R.pset(x + i, wy + 2, f(b_mez(b_P.cal[2], C.k, 0.3))); }
  // al pie del muro (a la velocidad del muro): cestas de piedras, un odre colgado de una estaca, percutores y un montón de cascotes
  for (const [wx0, q] of [[96, 0], [262, 1], [392, 2], [520, 0], [610, 1]]) { const x = wx0 - off; if (x < -20 || x > 340) continue;
    if (q === 0) b_cesta(R, x, 143, 10, 7, 'piedras', t, f);
    else if (q === 1) { b_tronco(R, x, 144, x + 1, 120, 1, f); R.linea(x - 2, 121, x + 3, 120, f(b_P.maderaS)); for (let j = -5; j <= 5; j++) for (let i = -4; i <= 4; i++) if (i * i / 16 + j * j / 25 <= 1 + (j > 2 ? 0.3 : 0)) R.pset(x + 6 + i, 129 + j, f(j < -3 ? b_P.cueroL : i > 1 ? b_P.cueroS : i < -2 ? b_P.cueroL : b_P.cuero));
      R.linea(x + 2, 122, x + 5, 124, f(b_P.cueroS)); R.pset(x + 4, 128, f(C.blanco)); for (let i = 0; i < 7; i++) R.pset(x + 3 + i, 135 + (i > 5 ? 1 : 0), f(b_mez(b_P.cueroS, C.k, 0.4))); }
    else for (let k = 0; k < 7; k++) b_piedra(R, x + (k % 4) * 4 - 6 + (k > 3 ? 2 : 0), 143 - (k > 3 ? 2 : 0), 2, 2, f); }
  // los rayos de luz rasante sobre el suelo
  if (!noche) for (const [bx, w] of [[30, 26], [150, 18], [250, 30]]) for (let y = 142; y < 180; y++) for (let x = 0; x < w; x++) { const xx = Math.round(bx + x + (y - 142) * 0.9 - (cam * 0.8) % 330); const X = ((xx % 340) + 340) % 340 - 10; if (X < 0 || X > 319) continue; if (b_U(X, y) < 0.5) B[y * 320 + X] = b_mez(B[y * 320 + X], hex('#ffd8a0'), 0.16); }
  // los pilares de delante
  const pilares = [];
  for (const [i, P] of b_FILA.entries()) { const x = 160 + i * 190 - cam; if (x < -70 || x > 390) { pilares.push([x, 150]); continue; }
    for (let k = -14; k <= 14; k++) { const yy = 150 + Math.round(Math.sqrt(1 - (k / 14.5) ** 2) * 3); b_piedra(R, x + k * 2, yy, 2, 2, f); }
    d_pilar(R, x, 150, { escala: 2.2, relieves: P.rel, brazos: !!P.brazos, luz: noche ? 0.65 : 0.8, noche, sem: 11 + i, brillo: o.relieve, t });
    pilares.push([x, 150]); }
  // el polvo dorado que flota en la luz
  for (let k = 0; k < 26; k++) { const x = Math.round((h(k, 1, 102) * 340 + t * (2 + k % 3)) % 340) - 10, y = Math.round(40 + h(k, 2, 102) * 120 + Math.sin(t * 0.7 + k) * 5); if (Math.sin(t * 1.1 + k * 1.7) > 0) R.pset(x, y, noche ? hex('#8a94c0') : hex('#fff0c8')); }
  if (noche) { b_tronco(R, 40, 150, 41, 116, 1, f); b_antorcha(R, 41, 112, t, 0); b_luz(R, 41, 112, 130 + Math.sin(t * 9) * 3, 0.6); b_tronco(R, 286, 150, 285, 120, 1, f); b_antorcha(R, 285, 116, t, 1); b_luz(R, 285, 116, 70 + Math.sin(t * 8) * 2, 0.45); }
  const recorrerDe = (nombre) => { const i = b_FILA.findIndex((p) => p.rel.includes(nombre)); return Math.max(0, i) * 190 / 570; };
  return { pilares, recorrerDe };
}
// lo fijo del banquete: las lomas, el muro exterior con las cabezas de los pilares, el suelo con pieles y esteras
const b_ybB = (x) => Math.round(110 - 5 * ((x - 160) / 170) ** 2);

function b_banqueteFijo(R) {
  const B = R.buf;
  b_colinas(R, 82, 8, 98, hex('#6a4a7a'), hex('#c87a84'), 3.3, { arboles: hex('#4a3460'), n: 24, filo: hex('#f8b878') });
  for (let y = 90; y < 112; y++) for (let x = 0; x < 320; x++) if (B[y * 320 + x] === b_VACIO || y > 97) B[y * 320 + x] = b_tono(b_P.estepaT, 2.2 + (y - 90) * 0.06 + (h(x >> 1, y, 108) - 0.5) * 1.1, x, y);
  // los pilares de dentro (antes que el muro, que los tapa por abajo), encendidos por el fuego
  for (const [px, s, rel] of [[36, 0.9, ['jabali']], [84, 0.95, ['grulla']], [136, 1.2, ['zorro']], [178, 1.2, ['uro']], [228, 0.95, ['buitre']], [270, 0.85, ['serpientes']]]) d_pilar(R, px, 106, { escala: s, relieves: rel, brazos: s > 1.1, luz: 0.85, sem: px, sombra: false });
  // el muro exterior, convexo, a hiladas
  const top = (x) => Math.round(b_ybB(x) - 15 + 2 * Math.sin(x * 0.11) * Math.sin(x * 0.03));
  for (let x = 0; x < 320; x++) { const b = b_ybB(x), tp = top(x); for (let y = tp; y <= b; y++) { const v = b_piedraTono(x, b - y, 1, 103); B[y * 320 + x] = v < 0 ? hex('#3a2418') : b_tono(b_P.calC, v - 1.3 - (b - y) * 0.02, x, y); } B[tp * 320 + x] = b_tono(b_P.calC, 5, x, tp); }
  // el suelo: tierra apisonada con paja y cáscaras, más oscura lejos del fuego
  for (let x = 0; x < 320; x++) for (let y = b_ybB(x) + 1; y < 180; y++) { const n = h(x, y, 104), rn = b_ruido(x, y * 2, 12, 109); let v = 2.2 + (y - 110) * 0.03 + (rn - 0.5) * 1.2 + (h(x >> 1, y >> 1, 105) - 0.5) * 0.6; if (n < 0.035) v -= 1.2; else if (n > 0.965) v += 1.3;
    B[y * 320 + x] = b_tono(b_P.tierra, v, x, y); if (h(x, y, 106) < 0.025) B[y * 320 + x] = h(x, y, 110) < 0.5 ? C.trigoS : C.trigo; }
  for (let x = 0; x < 320; x++) for (let y = b_ybB(x) + 1; y <= b_ybB(x) + 2; y++) if (b_U(x, y) < 0.6) B[y * 320 + x] = b_mez(B[y * 320 + x], C.k, 0.3);
  // el sendero que baja de la estepa, pieles tendidas y una estera de juncos
  for (let y = 111; y < 140; y++) { const cx = 300 - (y - 111) * 1.6, w = 3 + (y - 111) * 0.18; for (let x = Math.round(cx - w); x <= cx + w; x++) if (b_U(x, y) < 0.7) R.pset(x, y, b_tono(b_P.tierra, 4.4, x, y)); }
  for (const [px, py, w] of [[62, 134, 18], [238, 136, 18], [150, 131, 12]]) for (let j = 0; j < 5; j++) for (let i = Math.round(-w / 2 + Math.abs(j - 2)); i < w / 2 - Math.abs(j - 2); i++) { const c = (i + j) % 5 === 0 ? b_P.cueroS : j < 2 ? b_P.cueroL : b_P.cuero; R.pset(px + i, py + j - 2, c); }
  for (let j = 0; j < 4; j++) for (let i = 0; i < 16; i++) R.pset(104 + i + j, 139 + j, (i + j * 2) % 4 < 2 ? C.trigoS : hex('#c8a060'));
  // por el suelo de delante: guijarros, cáscaras de almendra y pistacho, espigas caídas, lascas, un cuenco roto y leña
  for (let k = 0; k < 150; k++) { const x = Math.round(h(k, 1, 111) * 319), y = 140 + Math.round(h(k, 2, 111) * 38), q = k % 5;
    if (q === 0) b_piedra(R, x, y, 2, 1); else if (q === 1) { R.pset(x, y, hex('#e8d8b0')); R.pset(x + 1, y, hex('#c8b088')); } else if (q === 2) { R.linea(x, y, x + 3, y - 1, C.trigoS); R.pset(x + 3, y - 2, C.trigo); } else if (q === 3) b_lasca(R, x, y); else R.pset(x, y, b_P.tierra[1]); }
  for (let i = 0; i < 7; i++) { const a = Math.PI * (0.1 + i * 0.12); R.pset(Math.round(160 + Math.cos(a) * 5), Math.round(166 - Math.sin(a) * 2), b_P.calC[5]); R.pset(Math.round(160 + Math.cos(a) * 5), Math.round(167 - Math.sin(a) * 2), b_P.calC[3]); }
  for (const [fila, n] of [[0, 4], [1, 3], [2, 2]]) for (let i = 0; i < n; i++) b_puntaTronco(R, 10 + fila * 3 + i * 6, 146 - fila * 5, 2.6);   // la leña apilada
  // el bastidor donde se seca una piel de gacela, con sus cuerdas
  { const fx = 160, fy = 128; b_tronco(R, fx - 9, fy, fx - 9, fy - 18, 0); b_tronco(R, fx + 9, fy, fx + 9, fy - 18, 0); b_tronco(R, fx - 11, fy - 17, fx + 11, fy - 17, 0);
    for (let j = 0; j < 12; j++) { const w = 6 - Math.abs(j - 5) * 0.5; for (let i = -Math.round(w); i <= w; i++) R.pset(fx + i, fy - 15 + j, (i + j) % 4 === 0 ? b_P.cueroL : i > w - 2 ? b_P.cueroS : hex('#b88a5a')); }
    for (const [a, b] of [[-8, -14], [8, -14], [-8, -4], [8, -4]]) R.linea(fx + a, fy + b, fx + Math.sign(a) * 5, fy + b + Math.sign(b + 9), b_P.cuero); }
}

// 'banquete' (ver la cabecera de recinto)
function b_banquete(R, t, o) {
  b_cielo(R, t, { hor: 92, modo: 'tarde', sol: [212, 76, 13], cumulos: 5 });
  b_grullas(R, t + 4, 44);
  b_pegar(R, b_capa(R, 'banq', () => b_banqueteFijo(R)), 40);
  // uno que baja por el sendero con una cesta de espigas, y un niño que corre de un corro a otro
  { const u = (t * 0.08) % 1, y = Math.round(112 + u * 24), x = Math.round(300 - u * 38); b_figura(R, x, y, t, { accion: 'cesta', dir: -1, k: 3 }); }
  { const u = (t * 0.12) % 2, x = Math.round(u < 1 ? 96 + u * 110 : 206 - (u - 1) * 110); b_figura(R, x, 140, t * 1.6, { accion: 'andar', dir: u < 1 ? 1 : -1, k: 7 }); }
  // las piedras de moler con sus molineras
  for (const [i, mx] of [18, 38].entries()) { b_moler(R, mx + 6, 128, t + i, 0.8, true); b_figura(R, mx, 128, t + i * 0.7, { accion: 'moler', dir: 1, k: i + 2 }); }
  b_cesta(R, 12, 132, 8, 5, 'grano', t);
  // los grandes cuencos de piedra con papilla humeante y las cestas
  b_cuenco(R, 116, 130, t, 1); b_cuenco(R, 204, 131, t + 1, 1.1);
  b_cesta(R, 134, 131, 9, 5, 'espigas', t); b_cesta(R, 188, 132, 8, 5, 'grano', t);
  b_figura(R, 104, 129, t + 0.5, { accion: 'remover', dir: 1, k: 6 });
  // la hoguera de la izquierda con su corro, y la de la derecha con el espetón de gacela
  b_hoguera(R, 66, 127, t, { s: 1.4 });
  for (const [k, [fx, fy, d]] of [[50, 132, 1], [82, 133, -1], [58, 121, 1], [76, 121, -1]].entries()) b_figura(R, fx, fy, t, { accion: 'sentado', dir: d, k: k + 1 });
  b_hoguera(R, 252, 129, t + 2, { s: 1.4 });
  { const yy = 116; R.linea(237, 130, 239, yy, b_P.maderaS); R.linea(267, 130, 265, yy, b_P.maderaS); R.linea(236, yy - 1, 241, yy + 3, b_P.maderaS); R.linea(268, yy - 1, 263, yy + 3, b_P.maderaS);
    const g = Math.round(Math.sin(t * 0.8)); R.disco(246, yy + 1 + g, 4, hex('#7a3a1e')); R.disco(257, yy + 1 - g, 3.6, hex('#8a4422')); R.pset(244, yy - 1 + g, hex('#d0884a')); R.pset(255, yy - 1 - g, hex('#d0884a')); R.pset(247, yy + 3 + g, hex('#5a2a14'));
    R.linea(232, yy, 272, yy, b_P.madera); R.linea(232, yy - 1, 272, yy - 1, b_P.maderaL); R.disco(272, yy, 1.5, b_P.maderaS);
    for (let k = 0; k < 3; k++) { const u = ((t * 1.3 + k / 3) % 1); R.pset(247 + k * 4, yy + 5 + Math.round(u * 6), u < 0.6 ? hex('#e8a040') : b_P.fuego[2]); }
    b_figura(R, 276, 131, t, { accion: 'remover', dir: -1, k: 0 }); }
  for (const [k, [fx, fy, d]] of [[226, 136, 1], [228, 124, 1], [292, 128, -1]].entries()) b_figura(R, fx, fy, t + k, { accion: 'sentado', dir: d, k: k + 5 });
  b_luz(R, 66, 121, 62 + Math.sin(t * 10) * 2, 0.55); b_luz(R, 252, 122, 64 + Math.sin(t * 9 + 1) * 2, 0.55);
}

// una piedra de moler de basalto con su mano y el grano (x, y: el centro de la base); con viva, la mano se mueve
function b_moler(R, x, y, t, s, viva) {
  const w = Math.round(11 * s), hh = Math.round(4 * s), m = viva ? Math.round(Math.sin(t * 4) * 2 * s) : 0;
  for (let j = 0; j < hh; j++) for (let i = -w; i <= w; i++) { const e = Math.abs(i) / w; if (e > 1 - j * 0.04) continue; const v = 2 + (j === 0 ? 2 : 0) - (i > w * 0.5 ? 0.8 : 0) + (j === hh - 1 ? -0.8 : 0); R.pset(x + i, y - j, b_tono([hex('#22201e'), C.basalto, hex('#4a4446'), C.basaltoL, hex('#7a7276')], v, x + i, y - j)); }
  for (let i = -w + 3; i <= w - 3; i++) R.pset(x + i, y - hh + 1 + (Math.abs(i) < w * 0.5 ? 1 : 0), C.basaltoL);
  for (let i = -w + 4; i <= w - 4; i += 2) R.pset(x + i, y - hh, C.trigo);
  R.disco(x + m, y - hh - Math.round(1.5 * s), 2 * s, C.basaltoL); R.pset(x + m - 1, y - hh - Math.round(2.5 * s), hex('#8a8288'));
  for (let i = -w - 1; i <= w + 2; i++) if (b_U(x + i, y + 1) < 0.6) R.pset(x + i, y + 1, b_mez(R.pget(x + i, y + 1), C.k, 0.35));
}

// un gran cuenco de caliza tallada (x, y: el centro de la base) lleno de papilla, con la cuchara de hueso y el vapor
function b_cuenco(R, x, y, t, s) {
  const w = Math.round(9 * s), hh = Math.round(7 * s);
  for (let j = 0; j < hh; j++) { const e = Math.sqrt(1 - (j / hh) ** 2) * 0.25 + 0.75, ww = Math.round(w * e); for (let i = -ww; i <= ww; i++) { const v = 4.4 - (i + ww) / (2 * ww) * 2.2 + (Math.abs(i) === ww ? -1.4 : 0) + (j === 0 ? -0.8 : 0) + (h(x + i, y - j, 107) < 0.06 ? -1 : 0); R.pset(x + i, y - j, b_tono(b_P.calC, v, x + i, y - j)); } }
  for (let i = -w; i <= w; i++) { R.pset(x + i, y - hh, b_tono(b_P.calC, 6, x + i, y - hh)); if (Math.abs(i) < w - 1) R.pset(x + i, y - hh + 1, i % 3 ? hex('#e8d8a8') : hex('#d8c088')); }
  R.linea(x + 3, y - hh, x + 6, y - hh - 4, hex('#f0e8d0'));
  for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k / 4) % 1), px = Math.round(x - 4 + k * 3 + Math.sin(t * 2 + k + u * 6) * 1.5), py = Math.round(y - hh - 2 - u * 16); if (b_U(px, py) < 1 - u) R.pset(px, py, u < 0.5 ? hex('#f8f0e8') : hex('#d8c8c8')); }
  for (let i = -w - 1; i <= w + 2; i++) if (b_U(x + i, y + 1) < 0.6) R.pset(x + i, y + 1, b_mez(R.pget(x + i, y + 1), C.k, 0.35));
}

// la forma del pilar en sus unidades (u: −11…14, v: 0 la base … 60 lo alto de la cabeza): 0 la cara de delante, 1 la
// del costado (en sombra), 2 lo alto de la cabeza, 3 un borde comido; −1 fuera
function b_pilarCara(u, v, G) {
  if (v < 0 || v > 62 || u < -11.5 || u > 14.5) return -1;
  let fr = false;
  if (v <= 47.5) fr = u >= -7 && u <= 7;
  else if (v <= 60) { fr = u >= -11 && u <= 11; if (fr && v > 58.2 && Math.abs(u) > 9.2) fr = (Math.abs(u) - 9.2) ** 2 + (v - 58.2) ** 2 <= 3.4; }
  if (fr) { const e = v <= 47.5 ? 7 - Math.abs(u) : Math.min(11 - Math.abs(u), 60 - v, Math.abs(u) <= 7 ? 99 : v - 47.5);
    return e < 0.8 && h(Math.floor(u * 1.5), Math.floor(v * 1.5), G.sem + 3) < 0.22 ? 3 : 0; }
  if (u > 11 && u <= 14) { const vv = v - (u - 11) * 0.55; if (vv > 47.5 && vv <= 60) return 1; }
  if (v > 60) { const uu = u - (v - 60) / 0.55; if (v <= 61.65 && uu >= -10.2 && uu <= 11) return 2; }
  if (u > 7 && u <= 10) { const vv = v - (u - 7) * 0.55; if (vv >= 0 && vv <= 47.5) return 1; }
  return -1;
}

// los relieves de animales, en su caja (an × al unidades, y hacia arriba): [x0, y0, x1, y1, r] son trazos redondeados;
// neg, las ranuras; finos, las que solo se ven de cerca; ojo, el ojo inciso
const b_ANIM = {
  zorro: { an: 16, al: 10, ojo: [-4.7, 2.3], c: [[-3, 0.8, 3, -0.2, 1.7], [-5.2, 2.0, -3.4, 1.4, 1.25], [-7.4, 1.5, -5.4, 1.9, 0.55], [-4.6, 3.0, -4.3, 4.6, 0.45], [-3.7, 2.9, -3.2, 4.4, 0.45],
    [-2.6, 0.2, -5.6, -2.6, 0.5], [-1.8, -0.2, -4.4, -3.6, 0.5], [2.4, -0.8, 4.6, -3.8, 0.55], [3.0, -1.0, 5.8, -3.0, 0.5], [3.6, 0.4, 7.4, 2.6, 1.05], [6.6, 2.2, 7.8, 3.4, 0.6]], neg: [[-7.2, 1.1, -5.8, 1.4, 0.16]], finos: [[4.2, 0.9, 6.8, 2.4, 0.14]] },
  jabali: { an: 16, al: 10, ojo: [-4.4, 1.6], c: [[-2, 0.6, 3.2, 0.6, 2.6], [-5.6, -0.2, -2.8, 1.0, 1.7], [-7.4, -0.6, -5.8, -0.4, 0.8], [-2.6, -1.4, -2.9, -4.4, 0.6], [-1.0, -1.6, -1.1, -4.4, 0.6], [2.2, -1.4, 2.4, -4.4, 0.6], [3.6, -1.2, 4.0, -4.2, 0.6],
    [-3.0, 2.2, -2.4, 3.6, 0.5], [-1.6, 3.0, -1.2, 3.9, 0.35], [-0.4, 3.1, -0.1, 4.0, 0.35], [0.8, 3.1, 1.0, 3.9, 0.35], [2.0, 2.9, 2.2, 3.7, 0.35], [5.6, 1.4, 6.6, 0.4, 0.3]], neg: [[-6.6, -1.0, -5.2, -0.6, 0.16]], finos: [[-1.5, -0.6, 2.5, -0.6, 0.12], [-1.2, 1.4, 2.8, 1.5, 0.12]] },
  serpientes: { an: 13, al: 12, ojo: null, c: [], neg: [], finos: [] },
  escorpion: { an: 9, al: 13, ojo: null, c: [[0, 1.2, 0, -2.4, 1.5], [0, -2.2, -2.4, -3.6, 0.45], [0, -2.2, 2.4, -3.6, 0.45], [-2.4, -3.6, -3.0, -5.6, 0.6], [-2.4, -3.6, -1.5, -5.3, 0.45], [2.4, -3.6, 3.0, -5.6, 0.6], [2.4, -3.6, 1.5, -5.3, 0.45],
    [-1.2, 0.8, -3.4, -0.1, 0.32], [1.2, 0.8, 3.4, -0.1, 0.32], [-1.2, -0.2, -3.4, -1.1, 0.32], [1.2, -0.2, 3.4, -1.1, 0.32], [-1.2, -1.2, -3.4, -2.1, 0.32], [1.2, -1.2, 3.4, -2.1, 0.32],
    [0, 1.6, 0, 3.4, 0.65], [0, 3.4, 0.9, 5.0, 0.58], [0.9, 5.0, 2.3, 5.4, 0.52], [2.3, 5.4, 2.9, 4.2, 0.45], [2.9, 4.2, 2.5, 3.6, 0.3]], neg: [], finos: [[-1.4, 0.2, 1.4, 0.2, 0.12], [-1.4, -1.0, 1.4, -1.0, 0.12]] },
  grulla: { an: 12, al: 13, ojo: [-2.9, 5.6], c: [[-0.6, 1.4, 2.8, 0.9, 1.7], [2.8, 1.0, 4.8, -0.2, 0.8], [-1.6, 2.0, -2.6, 5.0, 0.5], [-2.6, 5.2, -3.0, 5.5, 0.7], [-3.4, 5.3, -5.6, 4.7, 0.28], [0.4, -0.2, 0.0, -6.0, 0.3], [1.4, -0.2, 2.0, -6.0, 0.3], [0, -6, -1.2, -6.2, 0.25], [2, -6, 0.8, -6.2, 0.25]],
    neg: [], finos: [[-0.4, 1.0, 2.6, 0.6, 0.12]] },
  buitre: { an: 16, al: 10, ojo: [-1.2, 3.3], c: [[0, 0.6, 0, -2.8, 1.5], [-0.8, 1.2, -6.6, 3.2, 1.3], [0.8, 1.2, 6.6, 3.2, 1.3], [-6.6, 3.2, -7.6, 1.6, 0.45], [-5.6, 2.6, -6.4, 1.0, 0.45], [6.6, 3.2, 7.6, 1.6, 0.45], [5.6, 2.6, 6.4, 1.0, 0.45],
    [-0.4, 2.2, -1.6, 3.8, 0.75], [-1.6, 3.8, -2.4, 3.2, 0.32], [-0.6, -2.8, -1.0, -4.6, 0.35], [0.6, -2.8, 1.0, -4.6, 0.35], [0, -2.6, 0, -4.2, 0.9]], neg: [], finos: [[-2.0, 1.4, -6.0, 2.9, 0.12], [2.0, 1.4, 6.0, 2.9, 0.12]] },
  uro: { an: 16, al: 11, ojo: [-4.4, 0.7], c: [[-1.8, 0.4, 3.4, 0.6, 2.5], [-1.4, 2.2, 0.6, 2.6, 1.2], [-5.6, -0.6, -3.0, 0.9, 1.4], [-6.6, -1.2, -5.8, -0.9, 0.9], [-3.8, 1.8, -5.6, 3.6, 0.38], [-5.6, 3.6, -4.4, 5.0, 0.36], [-3.0, 1.8, -2.0, 3.8, 0.38], [-2.0, 3.8, -2.8, 5.0, 0.34],
    [-2.6, -1.6, -2.8, -4.6, 0.6], [-0.8, -1.6, -0.8, -4.6, 0.6], [2.4, -1.6, 2.6, -4.6, 0.6], [3.8, -1.4, 4.2, -4.4, 0.6], [5.6, 1.6, 6.4, -1.6, 0.3], [6.4, -1.6, 6.6, -2.4, 0.45]], neg: [], finos: [] },
};
// las tres serpientes en fila, bajando, con la cabeza abajo
for (let i = 0; i < 3; i++) { const x0 = -4 + i * 4; for (let j = 0; j < 6; j++) b_ANIM.serpientes.c.push([x0 + (j % 2 ? 0.9 : -0.9), 5.5 - j * 1.8, x0 + (j % 2 ? -0.9 : 0.9), 5.5 - (j + 1) * 1.8, 0.5]); b_ANIM.serpientes.c.push([x0 - 0.9, -5.3, x0 - 0.9, -5.9, 0.85]); }

// cada primitiva: 0 trazo redondeado (a, b → c, d; r), 1 caja, 2 disco, 3 anillo
function b_dentro(q, u, v) {
  if (q.k === 0) { const dx = q.c - q.a, dy = q.d - q.b; let k = ((u - q.a) * dx + (v - q.b) * dy) / (dx * dx + dy * dy || 1); k = k < 0 ? 0 : k > 1 ? 1 : k; const ex = u - q.a - k * dx, ey = v - q.b - k * dy; return ex * ex + ey * ey <= q.r * q.r; }
  if (q.k === 1) return u >= q.a && u <= q.c && v >= q.b && v <= q.d;
  const d = Math.hypot(u - q.a, v - q.b); return q.k === 2 ? d <= q.r : d >= q.r && d <= q.r2;
}

// la geometría de los relieves de un pilar (brazos, manos, cinturón, taparrabos, collar, animales, cara), en caché
const b_geos = new Map();

function b_pilarGeo(o, p) {
  const rels = o.relieves ?? [], brazos = o.brazos !== false, cara = !!o.cara, sem = o.sem ?? 0, fino = p < 0.6;
  const clave = [rels.join(','), brazos, cara, sem, fino, Math.round(p * 20), o.brillo ?? ''].join('|');
  if (b_geos.has(clave)) return b_geos.get(clave);
  const mr = 0.55 * p, cap = (a, b, c, d, r) => ({ k: 0, a, b, c, d, r: Math.max(r, mr) }), box = (a, b, c, d) => ({ k: 1, a, b, c, d }), disc = (a, b, r) => ({ k: 2, a, b, r: Math.max(r, mr) }), ring = (a, b, r, r2) => ({ k: 3, a, b, r, r2 });
  const grupos = [], incs = [];
  const caja = (q) => q.k === 0 ? [Math.min(q.a, q.c) - q.r, Math.min(q.b, q.d) - q.r, Math.max(q.a, q.c) + q.r, Math.max(q.b, q.d) + q.r] : q.k === 1 ? [q.a, q.b, q.c, q.d] : [q.a - (q.r2 ?? q.r), q.b - (q.r2 ?? q.r), q.a + (q.r2 ?? q.r), q.b + (q.r2 ?? q.r)];
  const grupo = (pos, neg = []) => { const g = { pos, neg, x0: 1e9, y0: 1e9, x1: -1e9, y1: -1e9 }; for (const q of pos) { const [a, b, c, d] = caja(q); g.x0 = Math.min(g.x0, a); g.y0 = Math.min(g.y0, b); g.x1 = Math.max(g.x1, c); g.y1 = Math.max(g.y1, d); } grupos.push(g); };
  let slots;
  if (brazos) {
    const arm = [];
    const ran = [];
    for (const sg of [-1, 1]) { arm.push(cap(sg * 5.5, 45.6, sg * 5.75, 26.5, 1.2), cap(sg * 5.75, 26.5, sg * 4.2, 22.4, 1.15), cap(sg * 4.4, 22.6, sg * 3.4, 20.4, 1.2));
      for (const fv of [23.0, 21.7, 20.4, 19.1]) arm.push(cap(sg * 3.9, fv, sg * 0.5, fv, 0.55));
      arm.push(cap(sg * 3.0, 23.8, sg * 1.8, 25.4, 0.45));
      if (p < 0.8) for (const fv of [22.35, 21.05, 19.75]) ran.push(cap(sg * 3.5, fv, sg * 0.3, fv, 0.13));
      if (p < 0.8) ran.push(cap(0, 18.4, 0, 23.7, 0.16)); }
    grupo(arm, ran);
    grupo([cap(-5, 46.4, 0, 42.8, 0.42), cap(5, 46.4, 0, 42.8, 0.42)]);
    grupo([disc(0, 41.2, 1.15)], [disc(0, 41.9, 0.82)]);   // el colgante en creciente
    grupo([box(-7, 15.2, 7, 17.5)], fino ? [2.6, 5.0, -2.6, -5.0].map((m) => box(m - 0.3, 15.8, m + 0.3, 16.9)) : []);   // el cinturón con sus marcas
    if (p < 0.8) incs.push(ring(0, 16.35, 0.55, 1.05));   // la hebilla
    grupo([cap(0, 14.4, 0, 10, 2.1), cap(0, 10, 0, 5.6, 1.4), cap(0, 5.6, 0.7, 2.6, 0.95), cap(-1.2, 9.4, -2.8, 6.6, 0.5), cap(1.2, 9.4, 2.8, 6.6, 0.5)],
      fino ? [7.6, 9.4, 11.2, 13.0].flatMap((fv) => [cap(0, fv, -1.5, fv + 0.9, 0.16), cap(0, fv, 1.5, fv + 0.9, 0.16)]) : []);   // el taparrabos de piel de zorro con la cola
    slots = [[0, 34.2, 8.2, 12]];
  } else slots = [[0, 37.6, 12.6, 15], [0, 22, 12.6, 13.5], [0, 8.2, 12.6, 11]];
  if (!cara) slots.push([0, 53.8, 19, 9.6]);
  else { grupo([cap(-6.4, 57.4, 6.4, 57.4, 0.8), cap(0, 56.8, 0, 52.4, 1.05), cap(-1.4, 52.1, 1.4, 52.1, 0.6)]);
    incs.push(cap(-4.8, 55.3, -2.4, 55.3, 0.45), cap(2.4, 55.3, 4.8, 55.3, 0.45), cap(-2.6, 50.0, 2.6, 50.0, 0.38), disc(-0.6, 51.6, 0.3), disc(0.6, 51.6, 0.3)); }
  let glow = null;
  rels.slice(0, slots.length).forEach((nombre, i) => { const an = b_ANIM[nombre]; if (!an) return; const [cx, cy, w, hh] = slots[i], k = Math.min(w / an.an, hh / an.al);
    const tr = (c) => cap(cx + c[0] * k, cy + c[1] * k, cx + c[2] * k, cy + c[3] * k, c[4] * k);
    grupo(an.c.map(tr), [...an.neg.map(tr), ...(fino ? an.finos.map(tr) : [])]);
    if (an.ojo && k / p > 0.85) incs.push(disc(cx + an.ojo[0] * k, cy + an.ojo[1] * k, Math.max(0.32 * k, 0.5 * p)));
    if (o.brillo === nombre) glow = [cx - w / 2 - 1.2, cy - hh / 2 - 1.2, cx + w / 2 + 1.2, cy + hh / 2 + 1.2]; });
  const chips = []; for (let k = 0; k < 3; k++) chips.push([(h(k, sem, 41) - 0.5) * 11, 4 + h(k, sem, 42) * 52, 0.7 + h(k, sem, 43) * 1.1]);
  const G = { sem, chips, glow,
    rel: (u, v) => { for (const g of grupos) { if (u < g.x0 || u > g.x1 || v < g.y0 || v > g.y1) continue; let n = false; for (const q of g.neg) if (b_dentro(q, u, v)) { n = true; break; } if (n) continue; for (const q of g.pos) if (b_dentro(q, u, v)) return true; } return false; },
    inc: (u, v) => { for (const q of incs) if (b_dentro(q, u, v)) return true; return false; } };
  b_geos.set(clave, G); return G;
}

// las capas fijas de C: lo que no se mueve se pinta una vez en un búfer aparte y se copia en cada fotograma
const c_capas = new Map();

function c_capa(R, clave, dibuja) {
  let b = c_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); c_capas.set(clave, b); }
  return b;
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function c_mezcla(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// la trama de Bayer 4×4 (0–1) y la rampa tramada: l 0–1 elige el tono de P con el paso tramado entre vecinos
const c_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_um = (x, y) => (c_BAY[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const c_ram = (P, l, x, y) => P[Math.max(0, Math.min(P.length - 1, Math.floor(l * (P.length - 1) + c_um(x, y))))];

const c_lim = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

// los colores del Neolítico; con la luz de la tarde, todos más cálidos (c_P los da ya convertidos)
const c_BASE = {
  k: '#1a1410',
  m0: '#2a2834', m1: '#38343f', m2: '#4a4452', m3: '#5e5866', m4: '#78727c', bruma: '#b4b8bc', mVerde: '#4a5040',
  l0: '#9a9078', l1: '#aea48a', l2: '#c2b89c', l3: '#d6ceb2',
  e0: '#6e6038', e1: '#8e7c4a', e2: '#ac985a', e3: '#c4ae6c', e4: '#dac888', v0: '#4e5c30', v1: '#6e7c3e', v2: '#8e9a50', v3: '#aab468',
  t0: '#7a5c28', t1: '#a28440', t2: '#c4a052', t3: '#dcbc68', t4: '#f0da96', t5: '#fff0c0',
  r0: '#4e2e1c', r1: '#6e4026', r2: '#8e5634', r3: '#a87048', r4: '#c08c60', r5: '#d4a878',
  z0: '#5a4c38', z1: '#7a6a50', z2: '#9a8868', z3: '#b8a682', z4: '#d0c09c', z5: '#e6dabc', z6: '#f6eedc',
  a0: '#34546e', a1: '#4e7ca0', a2: '#7aaccc', a3: '#c8e6f4',
  h0: '#28321c', h1: '#3e4c26', h2: '#566a32', h3: '#748a42', h4: '#94a858', flor: '#f0d8dc', tronco: '#4a3424',
  gB: '#c08850', gL: '#dcac70', gS: '#7a4a28', gW: '#f4ecdc', gD: '#4a2c18', cuerno: '#2a1c14',
  uN: '#2a1c16', un: '#4a3020', ud: '#9a7a54', uH: '#e8dcc0', uR: '#6e3820',
  jG: '#3a3028', jg: '#5a4a3a', jm: '#241a14', js: '#9a7a68', jw: '#f0e8d8', jl: '#a08050', jL: '#d8c098',
  gr0: '#5a5e66', gr1: '#9aa0a8', gr2: '#c8ccd0', gr3: '#eceef0', grN: '#1a1a1e', grR: '#c83a2a',
  bu0: '#2a2420', bu1: '#5a4a3e', bu2: '#c8b8a0',
  p0: '#c08a60', p1: '#a8704a', p2: '#8a5a3a', pelo: '#2a1c14', pelo2: '#4a2c1c', pi0: '#8a5a32', pi1: '#6a4428', pi2: '#a07040', pi3: '#5a3a24', pL: '#c8a070',
  madera: '#7a5434', maderaL: '#a07848', maderaS: '#4a3220', cuerda: '#c8b080', cuerdaS: '#8a7450',
  silex: '#5a5a62', silexL: '#a4a4ae', basalto: '#3a3638', basaltoL: '#5e585c', cesta: '#b08a4c', cestaS: '#7a5a30', cuero: '#6a4428', cueroL: '#8a5e3a',
  humo: '#d8d4cc', humoS: '#aaa6a0', polvo: '#e4d8bc', fuego: '#ffb040', fuegoL: '#fff0a0', oro: '#ffe070', oroL: '#fff8d0',
  amapola: '#d63a2a', amapolaL: '#f2704e', amapolaS: '#8a2018', cardo: '#8a5aa8', cardoL: '#b88ad0', liquen: '#d89a3a', liquenG: '#a8aa88',
  nieve: '#eef0f2', nieveS: '#c4ccd8', mariposa: '#f4d050', mariposaS: '#c08a28',
};
function c_calido(s) {
  const n = parseInt(s.slice(1), 16), f = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return hex('#' + f((n >> 16) * 0.92 + 30) + f(((n >> 8) & 255) * 0.78 + 12) + f((n & 255) * 0.66 + 16));
}

const c_PALS = {};

function c_P(hora) { return (c_PALS[hora] ??= Object.fromEntries(Object.entries(c_BASE).map(([k, v]) => [k, hora === 'atardecer' ? c_calido(v) : hex(v)]))); }

// el cielo fijo: un degradado tramado con ondas suaves (sin franjas lisas) y el sol con su halo
const c_CIELO = { dia: ['#4a78c0', '#6290d0', '#7ea8dc', '#9cbee4', '#bcd2e8', '#d8dcd6'], atardecer: ['#3a4682', '#5a5894', '#8c628c', '#c47678', '#e8966a', '#f6c27c'] };

function c_cieloFijo(R, hora, hor, sol) {
  const S = c_CIELO[hora].map(hex), B = R.buf;
  for (let y = 0; y < hor; y++) for (let x = 0; x < 320; x++) {
    const l = y / (hor - 1) + (h(x >> 4, y >> 2, 41) - 0.5) * 0.06 + Math.sin(x * 0.021 + y * 0.13) * 0.018;
    B[y * 320 + x] = c_ram(S, l, x, y);
  }
  if (!sol) return;
  const [sx, sy, sr] = sol, cs = (hora === 'atardecer' ? ['#f49a58', '#ffcf80', '#fff0c8'] : ['#f0e8c4', '#fff6d8', '#ffffff']).map(hex);
  for (let y = Math.max(0, sy - sr * 4); y < Math.min(hor, sy + sr * 4); y++) for (let x = Math.max(0, sx - sr * 4); x < Math.min(320, sx + sr * 4); x++) {
    const d = Math.hypot(x + 0.5 - sx, y + 0.5 - sy), i = y * 320 + x;
    if (d < sr) B[i] = d > sr - 1.3 ? cs[1] : (x - sx + y - sy < -sr * 0.6 ? cs[2] : cs[1]);
    else { const a = Math.pow(1 - (d - sr) / (sr * 3), 2); if (a > 0 && c_um(x, y) < a * 0.9) B[i] = c_mezcla(B[i], cs[0], 0.45 + a * 0.3); }
  }
}

// una nube de bolas sobre una base plana, a tres tonos (luz arriba a la izquierda, sombra en la panza); dentro de la
// zona de Atom se funde con el cielo para que quede tranquila
function c_nube(R, cx, cy, w, sem, T3, hor) {
  const n = 3 + Math.floor(w / 9), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, r = (0.4 + 0.6 * Math.sin(u * Math.PI)) * w * 0.27 + h(i, sem, 51) * 2.2; bolas.push([cx - w / 2 + u * w, cy - r * 0.45 + h(i, sem, 52) * 1.5, r]); }
  const base = Math.round(cy + 1), B = R.buf, top = Math.floor(cy - w * 0.42);
  for (let y = Math.max(0, top); y <= Math.min(hor - 1, base); y++) for (let x = Math.max(0, Math.floor(cx - w / 2 - 6)); x <= Math.min(319, Math.ceil(cx + w / 2 + 6)); x++) {
    let l = -9;
    for (const [bx, by, r] of bolas) { const dx = x + 0.5 - bx, dy = y + 0.5 - by; if (dx * dx + dy * dy > r * r) continue; l = Math.max(l, 0.95 - (dy / r + 1) * 0.42 - dx / r * 0.16); }
    if (l < -8) continue;
    l -= c_lim((y - (base - 3)) / 3) * 0.35;
    const c = l > 0.62 + (c_um(x, y) - 0.5) * 0.2 ? T3[2] : l > 0.3 + (c_um(x, y) - 0.5) * 0.2 ? T3[1] : T3[0], i = y * 320 + x;
    B[i] = x >= 270 && y <= 48 ? c_mezcla(c, B[i], 0.6) : c;
  }
}

// el cielo animado: cúmulos grandes despacio, medianos más deprisa, jirones altos y pequeños cúmulos lejanos junto al
// horizonte; los altos, por debajo de la barra del año
function c_nubes(R, t, hora, hor, lista) {
  const at = hora === 'atardecer', T3 = (at ? ['#a0687c', '#e0987c', '#ffd4a4'] : ['#a8b8cc', '#dae2ec', '#fafaf6']).map(hex), TL = (at ? ['#b47a84', '#e8ae90', '#f8cca8'] : ['#b8c6d6', '#d2dce6', '#e8eef2']).map(hex);
  for (const [x0, y, w, v, s, lejos] of lista) { const x = (((x0 + t * v) % 380) + 380) % 380 - 30; c_nube(R, x, y, w, s, lejos ? TL : T3, hor); }
  // jirones altos (cirros) que se deshilachan, a otra velocidad
  const B = R.buf, cj = (at ? '#f0c0a0' : '#eef2f6');
  for (let k = 0; k < 3; k++) { const y0 = 20 + k * 7, xc = (((h(k, 1, 53) * 300 + t * (0.6 + k * 0.25)) % 400) + 400) % 400 - 40, lar = 50 + k * 14;
    for (let x = Math.max(0, Math.round(xc - lar / 2)); x <= Math.min(319, Math.round(xc + lar / 2)); x++) { const e = 1 - Math.abs(2 * (x - xc) / lar), yy = Math.round(y0 + (x - xc) * -0.06 + Math.sin(x * 0.12 + k) * 0.8);
      if (yy < 0 || yy >= hor || (x >= 270 && yy <= 48) || c_um(x + k, yy) > e * 0.75 - (h(x >> 1, k, 54) < 0.3 ? 0.3 : 0)) continue; B[yy * 320 + x] = c_mezcla(B[yy * 320 + x], hex(cj), 0.55); } }
}

// los montes Karacadağ: un volcán en escudo ancho y bajo, de basalto oscuro, con conos de escoria en el lomo, coladas
// que bajan (vetas oscuras y crestas con luz), manchas de matorral y la bruma que lo aclara hacia el pie
function c_karacadag(R, P, xc, ancho, yTop, yBase, conos, hor, lejos = 0) {
  const B = R.buf, M = [P.m0, P.m1, P.m2, P.m3, P.m4];
  const perfil = (x) => { const s = Math.abs(x - xc) / ancho; let y = s >= 1 ? yBase : yBase - (yBase - yTop) * (1 - Math.pow(s, 1.3));
    for (const [cx, r, a] of conos) { const q = Math.abs(x - cx) / r; if (q < 1) y -= a * (q < 0.3 ? 0.82 + (q < 0.15 ? -0.1 : 0) : (1 - q) / 0.7 * 0.82); }
    return y + Math.sin(x * 0.7) * 0.4; };
  const liso = (x) => perfil(x) - Math.sin(x * 0.7) * 0.4;
  for (let x = 0; x < 320; x++) { const top = Math.round(perfil(x)), pend = liso(x + 3) - liso(x - 3);
    for (let y = Math.max(0, top); y < hor; y++) {
      const prof = y - top, xs = x - prof * pend * 0.6, alto = yBase - top + 1;
      let l = 0.5 + pend * 0.07 - prof * 0.004 + (h(x >> 1, y, 61) - 0.5) * 0.12;
      // los barrancos que bajan por la ladera siguiendo la pendiente: el surco en sombra y el canto de luz a su izquierda
      const bq = Math.sin(xs * 0.36 + Math.sin(y * 0.13 + x * 0.021) * 1.4 + h(Math.floor(xs / 11), 0, 64) * 6);
      if (bq > 0.8) l -= 0.2; else if (bq > 0.52 && bq < 0.66) l += 0.13;
      const g = h(Math.floor(xs / 7), Math.floor(y / 3), 62); if (g < 0.15) l -= 0.07; else if (g > 0.88) l += 0.07;
      if (Math.sin(xs * 0.09 + y * 0.55 + Math.sin(x * 0.05) * 2) > 0.9) l -= 0.1;   // las lenguas de las coladas
      l += prof * 0.006;   // más claro hacia el pie (la bruma)
      if (prof === 0) l += pend < 0 ? 0.28 : 0.12;
      let c = c_ram(M, l, x, y);
      if (h(x >> 1, y >> 1, 63) < 0.07 && prof > 3) c = P.mVerde;
      // los neveros de lo alto: la nieve que queda en los barrancos cerca de las cumbres, con su sombra
      if (prof < alto * 0.16 && bq > 0.72 && h(x, y, 65) < 0.8 - prof / (alto * 0.16) * 0.7) c = bq > 0.9 || prof === 0 ? P.nieveS : P.nieve;
      // la matorral de las faldas: puntos oscuros que se espesan hacia el pie
      else if (prof > alto * 0.55 && h(x, y, 66) < 0.05) c = P.m0;
      B[y * 320 + x] = c_mezcla(c, P.bruma, c_lim(0.2 + prof / alto * 0.18 + lejos));
    } }
  // el cráter de cada cono: una muesca oscura en lo alto con el borde de luz
  for (const [cx, r, a] of conos) { if (a < 4) continue; const yc = Math.round(perfil(cx));
    for (let i = -2; i <= 2; i++) { const x = Math.round(cx + i), y = yc + (Math.abs(i) < 2 ? 1 : 0); if (x < 0 || x > 319 || y < 0 || y >= hor) continue; B[y * 320 + x] = c_mezcla(P.m0, P.bruma, 0.25 + lejos); }
    if (yc - 1 >= 0) { R.pset(Math.round(cx - 3), yc, c_mezcla(P.m4, P.bruma, 0.3 + lejos)); R.pset(Math.round(cx + 3), yc, c_mezcla(P.m3, P.bruma, 0.3 + lejos)); } }
  return perfil;
}
// un árbol pequeño de la estepa (pistachero salvaje 0 / almendro 1): tronco torcido, copa de bolas con luz arriba a la
// izquierda y sombra abajo, y su sombra en el suelo
function c_arbolito(R, P, x, base, tam, tipo, sem) {
  const B = R.buf, cop = tipo ? [P.h1, P.h2, P.h3, P.h4] : [P.h0, P.h1, P.h2, P.h3];
  for (let i = -tam - 2; i <= tam + 4; i++) { const xx = Math.round(x + i + 2); if (xx >= 0 && xx < 320 && c_um(xx, base) < 0.7) B[base * 320 + xx] = c_mezcla(B[base * 320 + xx], P.k, 0.35); }
  R.linea(x, base, x + 1, base - tam, P.tronco); R.linea(x + 1, base - tam * 0.6, x - 2, base - tam, P.tronco);
  const bolas = [[x - tam * 0.5, base - tam * 1.15, tam * 0.6], [x + tam * 0.5, base - tam * 1.1, tam * 0.65], [x, base - tam * 1.5, tam * 0.7]];
  for (let y = Math.floor(base - tam * 2.3); y <= base - tam * 0.5; y++) for (let xx = Math.floor(x - tam * 1.3); xx <= Math.ceil(x + tam * 1.3); xx++) {
    if (xx < 0 || xx > 319 || y < 0) continue; let l = -9;
    for (const [bx, by, r] of bolas) { const dx = xx + 0.5 - bx, dy = y + 0.5 - by; if (dx * dx + dy * dy <= r * r) l = Math.max(l, 0.8 - (dy + dx * 0.6) / r * 0.45); }
    if (l < -8) continue; l += (h(xx, y, sem) - 0.5) * 0.35;
    B[y * 320 + xx] = tipo && h(xx, y, sem + 1) < 0.06 ? P.flor : c_ram(cop, l, xx, y);
  }
}

// una espiga de trigo silvestre: el tallo, la espiga de granos alternos en dos tonos y las barbas largas hacia arriba;
// grande: más gruesa (primer plano); oscura: a contraluz
function c_espiga(R, x, y, alto, inc, P, grande = false, oscura = false) {
  const tx = x + inc, ty = y - alto, n = grande ? 7 : 4, cT = oscura ? P.t0 : P.t1, c1 = oscura ? P.t1 : P.t2, c2 = oscura ? P.t2 : P.t3, cb = oscura ? P.t2 : P.t4;
  R.linea(Math.round(x), Math.round(y), Math.round(tx), Math.round(ty + n), cT);
  if (grande) R.linea(Math.round(x) + 1, Math.round(y), Math.round(tx) + 1, Math.round(ty + n + 2), oscura ? P.t0 : P.t1);
  for (let j = 0; j < n; j++) { const ex = Math.round(tx + inc * 0.05 * j), ey = Math.round(ty + n - j);
    R.pset(ex + (j % 2 ? 1 : -1) * (grande ? 1 : 0), ey, j % 2 ? c2 : c1); R.pset(ex, ey, j % 2 ? c1 : c2);
    if (grande && j % 2 === 0) { R.pset(ex - 2, ey - 1, cb); R.pset(ex + 2, ey - 2, cb); } }
  R.linea(Math.round(tx), Math.round(ty), Math.round(tx + inc * 0.4 - 1), Math.round(ty - (grande ? 5 : 2)), cb);
  if (grande) R.linea(Math.round(tx) + 1, Math.round(ty + 1), Math.round(tx + inc * 0.4 + 2), Math.round(ty - 4), cb);
}

// un sprite de filas de caracteres (mirando a la derecha; dir −1 lo voltea): x el borde de la izquierda, y la fila de abajo
function c_filas(R, filas, x, y, dir, pal) {
  const w = filas[0].length, n = filas.length; x = Math.round(x); y = Math.round(y);
  for (let j = 0; j < n; j++) { const f = filas[j]; for (let i = 0; i < w; i++) { const ch = f[i]; if (ch === '.' || ch === undefined) continue; const c = pal[ch]; if (c != null) R.pset(dir > 0 ? x + i : x + w - 1 - i, y - n + 1 + j, c); } }
}

// la gacela (Gazella): el lomo claro, la franja oscura del costado, el vientre blanco y los cuernos en lira; poses
// 'mira' (cabeza alta), 'pasta' (cabeza en la hierba), 'corre' (f 0/1: recogida y estirada); el rabo se mueve
const c_GAC = {
  mira: ['........hh..', '.........h..', '.........LL.', '.........BBe', '........LB..', '.LLLLLLLB...', 'eBBBBBBBB...', '.SSSSSSSW...', '.WWWWWWW....'],
  pasta: ['............', '............', '............', '............', '............', '.LLLLLLLL...', 'eBBBBBBBBB..', '.SSSSSSSWBh.', '.WWWWWWW.BBh'],
  corre0: ['..........hh..', '...........h..', '..........LLB.', '.........LBBBe', '.LLLLLLLLB....', 'eBBBBBBBBB....', '.SSSSSSSW.....', '..WWWWWWW.....', '...DD..DD.....', '....DD.DD.....'],
  corre1: ['...........h..', '...........hh.', '..........LLB.', '.........LBBBe', '.LLLLLLLLB....', 'eBBBBBBBBB....', '.SSSSSSSW.....', '.DWWWWWWWD....', 'D.........D...', 'D..........D..'],
};

function c_gacela(R, P, x, y, t, dir, pose, k) {
  const pal = { B: P.gB, L: P.gL, S: P.gS, W: P.gW, D: P.gD, h: P.cuerno, e: P.k };
  if (pose === 'corre') { const f = Math.floor(t * 8 + k) % 2; c_filas(R, c_GAC['corre' + f], x, y - (f ? 3 : 1), dir, pal); return; }
  c_filas(R, c_GAC[pose], x, y - 3, dir, pal);
  const X = (i) => (dir > 0 ? x + i : x + 11 - i), paso = Math.floor(t * 1.3 + k * 0.7) % 4 === 0 ? 1 : 0;
  for (const [i, q] of [[1, 0], [3, paso], [7, 0], [9, -paso]]) { R.linea(X(i), y - 2, X(i + q), y, P.gD); R.pset(X(i), y - 2, P.gB); }
  if (Math.sin(t * 5 + k * 3) > 0.7) R.pset(X(0), y - 4, P.gW);   // el rabo que espanta las moscas
}

// el uro lejano (Bos primigenius): negro pardo con la raya clara del lomo y los cuernos pálidos hacia delante; la vaca, rojiza
const c_URO = ['.......HH', '.ddddd.Hn', 'nNNNNNNNN', 'NNNNNNNNM', '.NNNNNN..'];

function c_uro(R, P, x, y, t, dir, k) {
  const vaca = k % 3 === 2, pal = { N: vaca ? P.uR : P.uN, n: P.un, d: vaca ? P.r3 : P.ud, H: P.uH, M: P.ud };
  const baja = Math.sin(t * 0.7 + k * 2) > 0.2;   // pasta: baja la cabeza
  c_filas(R, baja ? ['.........', '.ddddd...', 'nNNNNNNN.', 'NNNNNNNNH', '.NNNNNNNM'] : c_URO, x, y - 2, dir, pal);
  const X = (i) => (dir > 0 ? x + i : x + 8 - i), p = Math.floor(t * 1.5 + k) % 2;
  for (const i of [1, 3, 5, 7]) { R.pset(X(i + (i < 4 ? p : -p) * 0), y - 1, pal.N); R.pset(X(i), y, pal.n); }
}

// el jabalí: lomo cerdoso con crin, hocico claro y colmillo; hoza (baja el hocico y lo levanta); el jabato, rayado
const c_JAB = { a: ['..m.m.m.....', '.mgggggmg...', 'gGGGGGGGGgg.', 'GGGGGGGGGGGs', '.GGGGGGGGGws'], b: ['..m.m.m.....', '.mgggggmg...', 'gGGGGGGGGg..', 'GGGGGGGGGGg.', '.GGGGGGGGGGs'] };

function c_jabali(R, P, x, y, t, dir, k, cria = false) {
  const X = (i) => (dir > 0 ? x + i : x + (cria ? 6 : 11) - i);
  if (cria) { c_filas(R, ['.lllll.', 'lLlLlLls', '.lllll.'], x, y - 2, dir, { l: P.jl, L: P.jL, s: P.js }); for (const i of [1, 4]) { R.pset(X(i), y - 1, P.jg); R.pset(X(i + (Math.floor(t * 6 + k) % 2)), y, P.jg); } return; }
  const hoz = Math.floor(t * 2.2 + k) % 3 === 0;
  c_filas(R, hoz ? c_JAB.b : c_JAB.a, x, y - 2, dir, { m: P.jm, g: P.jg, G: P.jG, s: P.js, w: P.jw });
  if (hoz) { R.pset(X(11), y - 1, P.js); R.pset(X(11), y - 2, P.jw); }
  for (const i of [1, 3, 7, 9]) { R.pset(X(i), y - 1, P.jG); R.pset(X(i), y, P.jm); }
  if (hoz && Math.floor(t * 8) % 2) R.pset(X(12), y, P.r2);   // la tierra que levanta
}

// la grulla común: de pie (cuello negro con la mejilla blanca, el píleo rojo, el penacho de la cola) o en vuelo (cuello
// y patas estirados, las alas que baten)
function c_grulla(R, P, x, y, t, dir, k, vuela) {
  x = Math.round(x); y = Math.round(y); const X = (i) => x + i * dir;
  if (vuela) { const a = Math.sin(t * 5.2 + k * 1.3);
    R.linea(X(-2), y, X(2), y, P.gr1); R.linea(X(3), y, X(6), y - 1, P.grN); R.pset(X(7), y - 1, P.gr0); R.pset(X(5), y - 2, P.grR);
    R.linea(X(-3), y, X(-7), y + 1, P.grN);
    const wy = Math.round(a * 4); R.linea(X(0), y, X(-2), y - wy, P.gr1); R.linea(X(-2), y - wy, X(-4), y - wy * 1.3, P.grN); R.pset(X(1), y - 1, P.gr2); return; }
  const come = Math.sin(t * 0.9 + k * 2.1) > 0.55;
  R.linea(X(-1), y, X(-1), y - 4, P.grN); R.linea(X(1), y, X(1), y - 4, P.grN);
  R.rect(Math.min(X(-2), X(2)), y - 7, Math.max(X(-2), X(2)), y - 5, P.gr1); R.linea(X(-2), y - 7, X(2), y - 7, P.gr2); R.pset(X(-3), y - 5, P.gr0); R.pset(X(-3), y - 6, P.grN); R.pset(X(-4), y - 5, P.gr0);
  if (come) { R.linea(X(2), y - 6, X(4), y - 2, P.grN); R.pset(X(4), y - 1, P.gr0); R.pset(X(3), y - 3, P.gr3); }
  else { R.linea(X(2), y - 7, X(2), y - 11, P.grN); R.pset(X(3), y - 9, P.gr3); R.pset(X(2), y - 12, P.grR); R.pset(X(3), y - 11, P.gr0); R.pset(X(4), y - 11, P.gr0); }
}

// el buitre leonado que planea en círculos: alas largas y rectas con las puntas abiertas, cuerpo pardo y cabeza clara
function c_buitre(R, P, cx, cy, t, k) {
  const a = t * 0.5 + k * 3, x = Math.round(cx + Math.cos(a) * 26), y = Math.round(cy + Math.sin(a) * 7), b = Math.sin(t * 1.3 + k) > 0.9 ? 1 : 0;
  R.linea(x - 7, y - b, x + 7, y - b, P.bu1); R.linea(x - 6, y + 1 - b, x + 6, y + 1 - b, P.bu0); R.pset(x - 8, y - 1 - b, P.bu0); R.pset(x + 8, y - 1 - b, P.bu0);
  R.rect(x - 1, y, x + 1, y + 1, P.bu0); R.pset(x, y - 1, P.bu2); R.pset(x, y + 2, P.bu1);
}

// una figura pequeña de fondo (≈11 px) con pieles: poses 'quieto', 'anda', 'tira' (inclinada, con las manos delante),
// 'siega' (doblada, con la hoz de sílex), 'talla' (de rodillas, el percutor arriba y abajo), 'arco' (agazapada, tensa
// el arco), 'palanca' (empuja hacia abajo), 'carga' (un bloque al hombro), 'mira' (sentada mirando); f 0–1 la fase de su
// gesto; devuelve la mano
function c_fig(R, P, x, y, o = {}) {
  const d = o.dir ?? 1, k = o.k ?? 0, pose = o.pose ?? 'quieto', f = o.fase ?? 0, { pset, linea, rect } = R;
  x = Math.round(x); y = Math.round(y); const X = (i) => x + i * d;
  const piel = [P.p0, P.p1, P.p2][k % 3], ropa = [P.pi0, P.pi1, P.pi2, P.pi3][k % 4], pelo = k % 2 ? P.pelo : P.pelo2;
  const sent = pose === 'mira', rod = pose === 'talla' || pose === 'arco', inc = pose === 'tira' ? 2 : pose === 'siega' ? 2 + Math.round(f) : pose === 'palanca' ? 1 : 0;
  let cy = y - 3;   // la fila de abajo del torso
  if (rod || sent) { cy = y - 1; pset(X(-1), y, ropa); pset(X(0), y, piel); pset(X(1), y, piel); pset(X(2), y, P.k); if (sent) { pset(X(2), y - 1, piel); } }
  else { const a = pose === 'anda' || pose === 'tira' || pose === 'carga' ? Math.round(Math.sin(f * Math.PI * 2) * 1.4) : 0;
    linea(X(-1), y - 2, X(-1 - a), y, piel); linea(X(1), y - 2, X(1 + a), y, piel); pset(X(-1 - a), y, P.k); pset(X(1 + a), y, P.k); }
  // el torso de piel (4 filas) con la luz delante y el borde de pelo abajo, inclinado hacia delante
  for (let j = 0; j < 4; j++) { const s = Math.round(inc * j / 3); for (let i = -1; i <= 1; i++) pset(X(i + s), cy - j, j === 0 ? P.pL : i === 1 ? c_mezcla(ropa, P.pL, 0.25) : ropa); }
  // la cabeza: tres por tres, el pelo arriba y detrás
  const hx = inc + (rod ? 0 : 0), hy = cy - 4 - (pose === 'siega' ? -1 - Math.round(f) : 0);
  for (let j = 0; j < 3; j++) for (let i = -1; i <= 1; i++) pset(X(i + hx), hy - j, j === 2 || i === -1 ? pelo : piel);
  if (k % 4 === 1) pset(X(-2 + hx), hy - 1, pelo);   // la melena
  // los brazos y lo que llevan
  const sx = X(inc), sy = cy - 3; let m = [X(1), cy];
  if (pose === 'tira') m = [X(inc + 3), sy + 1];
  else if (pose === 'siega') { m = [X(inc + 2), y - 2 + Math.round(f)]; pset(m[0] + d, m[1] + 1, P.silexL); pset(m[0] + 2 * d, m[1], P.silex); }
  else if (pose === 'talla') { const arriba = f < 0.6; m = arriba ? [X(2), sy - 3] : [X(3), y - 1]; rect(Math.min(m[0], m[0] + d), m[1] - 1, Math.max(m[0], m[0] + d), m[1], P.basaltoL); }
  else if (pose === 'arco') { const ten = Math.round(f * 2); m = [X(1 - ten), sy + 1]; linea(X(3), sy - 4, X(4), sy + 1, P.madera); linea(X(4), sy + 1, X(3), y - 1, P.madera); linea(X(3), sy - 4, X(2 - ten), sy + 1, P.cuerda); linea(X(2 - ten), sy + 1, X(3), y - 1, P.cuerda); if (ten) linea(X(2 - ten), sy + 1, X(6), sy + 1, P.maderaL); }
  else if (pose === 'palanca') m = [X(inc + 2), sy - 1 + Math.round(f * 2)];
  else if (pose === 'carga') { m = [X(inc), sy - 2]; rect(Math.min(X(-2), X(3)), sy - 5, Math.max(X(-2), X(3)), sy - 3, P.z4); rect(Math.min(X(-2), X(3)), sy - 3, Math.max(X(-2), X(3)), sy - 3, P.z2); }
  else if (pose === 'mira') m = [X(2), cy - 1];
  linea(sx, sy, m[0], m[1], piel);
  return { mano: m, cabeza: [X(hx), hy - 2] };
}

// una nube de polvo o una bocanada de humo que sube y se deshace (u 0–1 su vida)
function c_soplo(R, P, x, y, u, r0, col) {
  if (u <= 0 || u >= 1) return; const r = r0 * (0.5 + u), B = R.buf;
  for (let j = -Math.ceil(r); j <= Math.ceil(r); j++) for (let i = -Math.ceil(r); i <= Math.ceil(r); i++) { const xx = Math.round(x + i), yy = Math.round(y + j - u * r0); if (xx < 0 || xx > 319 || yy < 0 || yy > 179) continue;
    const dd = Math.hypot(i, j * 1.3) / r; if (dd > 1 || c_um(xx, yy) > (1 - dd) * (1 - u) * 1.6) continue; B[yy * 320 + xx] = c_mezcla(B[yy * 320 + xx], col, 0.7); }
}

// el hilo de humo de un hogar: bocanadas que suben y se tuercen con el viento
function c_humo(R, P, x, y, t, alto, n = 5) {
  for (let k = 0; k < n; k++) { const u = ((t * 0.18 + k / n) % 1), r = 1 + u * 2.4; c_soplo(R, P, x + u * alto * 0.7 + Math.sin(t + k) * 1, y - u * alto, 0.35 + u * 0.3, r, u < 0.4 ? P.humo : P.humoS); }
}

// la bandada de grullas en uve que cruza el cielo (cada «cada» segundos), entre y0 e y0 + 10
function c_bandada(R, P, t, y0, cada, dir = 1) {
  const u = (t % cada) / cada, x0 = dir > 0 ? -60 + u * 440 : 380 - u * 440;
  for (let k = 0; k < 7; k++) { const n = Math.ceil(k / 2), lado = k % 2 ? 1 : -1; c_grulla(R, P, x0 - n * 9 * dir, y0 + lado * n * 3 + Math.sin(t + k) * 0.6, t, dir, k, true); }
}

function c_estepaFijo(R, P, hora, HOR) {
  const B = R.buf, at = hora === 'atardecer';
  c_cieloFijo(R, hora, 100, at ? [64, 66, 12] : [228, 26, 7]);
  // los Karacadağ
  c_karacadag(R, P, 304, 260, 50, 86, [[200, 13, 5], [236, 11, 5], [262, 8, 3]], 100);
  // las lomas lejanas de la izquierda con el cerro de los pilares (x ≈ 40)
  const lom = (x) => 76 - 3 * Math.sin(x * 0.035) - 2 * Math.sin(x * 0.09 + 1) - 9 * Math.exp(-Math.pow((x - 40) / 15, 2)) + c_lim((x - 170) / 60) * 5;
  for (let x = 0; x < 320; x++) { const top = Math.round(lom(x)), cerro = Math.exp(-Math.pow((x - 40) / 13, 2));
    for (let y = top; y < 96; y++) { let l = 0.55 - (lom(x + 1) - lom(x - 1)) * 0.25 + (h(x >> 1, y, 71) - 0.5) * 0.2 - (y - top) * 0.01 + (y === top ? 0.25 : 0);
      let c = c_ram([P.l0, P.l1, P.l2, P.l3], l, x, y); if (cerro > 0.35 && y < top + 6) c = c_ram([P.z3, P.z4, P.z5], l + 0.1, x, y);
      B[y * 320 + x] = c_mezcla(c, P.bruma, 0.25 * c_lim((200 - x) / 200 + 0.4)); } }
  // en lo alto del cerro: piedras de pie diminutas (los pilares) y un muro redondo
  for (const px of [33, 36, 39, 42, 45, 48]) { const top = Math.round(lom(px)); R.pset(px, top - 1, P.z6); R.pset(px, top, P.z2); }
  // la llanura lejana: tramos de hierba seca, manchas más verdes y matorrales en puntos
  for (let y = 78; y < 110; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x;
    if (y < lom(x) + 4) continue;
    const l = 0.55 + (y - 82) * 0.008 + Math.sin(x * 0.05 + y * 0.6) * 0.06 + (h(x >> 2, y, 72) - 0.5) * 0.18;
    let c = h(x >> 3, y >> 1, 73) < 0.25 ? c_ram([P.v1, P.v2, P.v3], l, x, y) : c_ram([P.e2, P.e3, P.e4], l, x, y);
    if (h(x, y, 74) < 0.025) c = P.h1;
    B[i] = c_mezcla(c, P.bruma, c_lim(0.35 - (y - 80) * 0.02)); }
  // la loma de enmedio (izquierda) y la de la derecha, con hierba en trazos, luz arriba y sombra en la falda
  const yB = (x) => 98 - 12 * Math.exp(-Math.pow((x - 55) / 60, 2)) - 7 * Math.exp(-Math.pow((x - 275) / 45, 2));
  for (let x = 0; x < 320; x++) { const top = Math.round(yB(x)), pend = yB(x + 2) - yB(x - 2);
    for (let y = top; y < 120; y++) { let l = 0.62 + pend * 0.18 - (y - top) * 0.012 + (h(x >> 1, y >> 1, 75) - 0.5) * 0.2 + (y === top ? 0.2 : 0);
      if (h(x, y >> 1, 76) < 0.1) l -= 0.3;   // los trazos de la hierba seca
      B[y * 320 + x] = c_ram([P.e0, P.e1, P.e2, P.e3, P.e4], l, x, y); } }
  // la vega del arroyo: más verde, con el cauce que serpentea (más ancho a la izquierda, que está más cerca)
  const ys = (x) => 110 + 2.5 * Math.sin(x * 0.035 + 0.5) + Math.sin(x * 0.11) * 0.8, an = (x) => 1.4 + (320 - x) / 120;
  for (let y = 102; y < 122; y++) for (let x = 0; x < 320; x++) { const dy = y + 0.5 - ys(x), w = an(x); if (y < yB(x) + 3) continue;
    let c; if (Math.abs(dy) < w) c = dy < -w + 1 ? P.a0 : c_ram([P.a0, P.a1, P.a2], 0.55 + dy / w * 0.3 + (h(x >> 2, y, 77) - 0.5) * 0.3, x, y);
    else if (dy < -w && dy > -w - 1.2) c = P.r1;   // la orilla de enfrente, en sombra
    else if (dy > w && dy < w + 1.3) c = P.r3;    // la orilla de este lado, mojada
    else { const l = 0.55 - Math.abs(dy) * 0.02 + (h(x >> 1, y, 78) - 0.5) * 0.3; c = Math.abs(dy) < 8 ? c_ram([P.v0, P.v1, P.v2, P.v3], l, x, y) : c_ram([P.e1, P.e2, P.e3], l, x, y); }
    B[y * 320 + x] = c; }
  // las cañas de las orillas
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 79) * 320), y0 = Math.round(ys(x) + (k % 2 ? an(x) + 1 : -an(x) - 1)), a = 2 + Math.round(h(k, 2, 79) * 3);
    R.linea(x, y0, x + (k % 3 - 1), y0 - a, k % 2 ? P.v0 : P.v1); R.pset(x + (k % 3 - 1), y0 - a, P.t1); }
  // árboles: pistacheros y almendros en la loma, y uno junto al arroyo
  for (const [x, b, s, tp] of [[16, 92, 4, 0], [70, 88, 3, 1], [96, 90, 3, 0], [128, 95, 2, 0], [292, 93, 3, 1], [312, 94, 2, 0], [262, 96, 2, 0], [8, 104, 5, 1]]) c_arbolito(R, P, x, b, s, tp, 80 + x);
  // la mata tras la que se esconden los cazadores y el matorral de los jabalíes
  const matorral = (x0, x1, yb, alto, sem) => { for (let k = 0; k < (x1 - x0) / 3; k++) { const cx = x0 + k * 3 + h(k, 1, sem) * 3, r = alto * (0.4 + h(k, 2, sem) * 0.5);
    R.disco(cx, yb - r * 0.8, r, (xx, yy, d) => c_ram([P.h0, P.h1, P.h2, P.h3], 0.85 - d * 0.5 - (yy - yb + r) / (r * 4) + (h(xx, yy, sem) - 0.5) * 0.4, xx, yy)); } };
  matorral(192, 210, 108, 5, 81); matorral(218, 266, 118, 8, 82);
  // el campo de trigo silvestre (la base fija; las espigas se mecen encima)
  for (let y = 114; y < 150; y++) for (let x = 0; x < 320; x++) { const top = 118 + Math.sin(x * 0.07) * 1.5 + h(x, 0, 83) * 2; if (y < top) continue;
    const l = 0.75 - (y - 118) * 0.012 + (h(x, y >> 2, 84) - 0.5) * 0.35 + (h(x >> 1, 7, 85) < 0.2 ? -0.25 : 0); B[y * 320 + x] = c_ram([P.t0, P.t1, P.t2, P.t3], l, x, y); }
  // el sendero de tierra pisada, con su borde tramado, guijarros, lascas de sílex y grietas
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) {
    const b0 = 146 + Math.sin(x * 0.05) * 1.5 + h(x >> 1, 1, 86) * 1.5, b1 = 164 + Math.sin(x * 0.03 + 1) * 2 + h(x >> 1, 2, 86) * 2;
    if (y < b0 - 1) continue;
    if (y < b1) { const l = 0.6 - (y - b0) * 0.012 + (h(x >> 1, y, 87) - 0.5) * 0.25 + (h(x >> 2, y >> 1, 88) < 0.08 ? -0.3 : 0); B[y * 320 + x] = y < b0 ? P.r1 : c_ram([P.r1, P.r2, P.r3, P.r4, P.r5], l, x, y); }
    else { let l = 0.5 + (h(x >> 1, y >> 1, 89) - 0.5) * 0.4; if (h(x, y >> 1, 90) < 0.16) l -= 0.35; B[y * 320 + x] = c_ram([P.e0, P.e1, P.e2, P.e3], l, x, y); } }
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 91) * 316), y = Math.round(149 + h(k, 2, 91) * 14), r = 1 + h(k, 3, 91) * 1.2;
    if (k % 3 === 0) { R.pset(x, y, P.silexL); R.pset(x + 1, y, P.silex); R.pset(x, y + 1, P.silex); }
    else { R.disco(x + 1, y + 1, r, P.r1); R.disco(x, y, r, (xx, yy, d) => d < 0.5 && xx <= x ? P.z5 : P.z3); } }
  // las huellas de pezuña en el barro del sendero
  for (let k = 0; k < 10; k++) { const x = 40 + k * 22 + Math.round(h(k, 4, 92) * 6), y = 152 + (k % 3) * 3; R.pset(x, y, P.r1); R.pset(x + 2, y, P.r1); }
}

function c_estepa(R, t, o, hora, P) {
  const HOR = 100, at = hora === 'atardecer';
  R.copiar(c_capa(R, 'estepa|' + hora, () => c_estepaFijo(R, P, hora, HOR)));
  c_nubes(R, t, hora, 84, [[30, 40, 44, 1.1, 1], [170, 30, 54, 0.7, 2], [250, 54, 30, 1.6, 3], [100, 60, 20, 2.1, 4, true], [300, 66, 16, 2.4, 5, true]]);
  c_humo(R, P, 41, 64, t, 16);
  c_bandada(R, P, t, 52, 16);
  // los uros que pastan en la llanura lejana
  for (let k = 0; k < 4; k++) c_uro(R, P, 150 + k * 13 + Math.sin(t * 0.08 + k) * 4, 92 + (k % 2), t, k % 2 ? -1 : 1, k);
  // las gacelas que pastan, levantan la cabeza y mueven el rabo
  for (let k = 0; k < 6; k++) { const x = 28 + k * 15 + Math.round(h(k, 1, 93) * 6), y = 104 + (k % 3) * 2, mira = Math.sin(t * 0.8 + k * 1.9) > 0.45; c_gacela(R, P, x, y, t, k % 3 === 1 ? -1 : 1, mira ? 'mira' : 'pasta', k); }
  // el trío que cruza a la carrera por la loma (cada 11 s)
  { const u = (t % 11) / 11; if (u < 0.45) for (let k = 0; k < 3; k++) { const x = 330 - u / 0.45 * 380 + k * 16; c_gacela(R, P, x, 97 + k * 2 + (k === 1 ? -1 : 0), t, -1, 'corre', k); } }
  // las grullas de pie en el arroyo, con sus ondas
  for (let k = 0; k < 3; k++) { const x = 128 + k * 10, y = 112 + (k === 1 ? 1 : 0); c_grulla(R, P, x, y, t, k === 2 ? -1 : 1, k, false);
    const u = (t * 0.7 + k * 0.33) % 1; R.pset(Math.round(x - 2 - u * 3), y + 1, P.a3); R.pset(Math.round(x + 2 + u * 3), y + 1, P.a3); }
  // los brillos que corren por el arroyo
  for (let k = 0; k < 18; k++) { const x = Math.round(((h(k, 1, 94) * 320 - t * (6 + k % 3 * 3)) % 320 + 320) % 320), y = Math.round(110 + 2.5 * Math.sin(x * 0.035 + 0.5) + Math.sin(x * 0.11) * 0.8 + (k % 3 - 1) * 0.5);
    if (Math.sin(t * 3 + k) > -0.3 && R.pget(x, y) !== P.r3) { R.pset(x, y, P.a3); if (k % 2) R.pset(x + 1, y, P.a2); } }
  // los cazadores agazapados con los arcos, mirando a las gacelas; uno tensa el arco despacio
  c_fig(R, P, 182, 108, { pose: 'arco', dir: -1, k: 0, fase: c_lim(Math.sin(t * 0.6) * 1.2) });
  c_fig(R, P, 191, 109, { pose: 'arco', dir: -1, k: 3, fase: 0 });
  // los jabalíes y el jabato que hozan junto al matorral
  c_jabali(R, P, 224 + Math.sin(t * 0.3) * 3, 118, t, 1, 0); c_jabali(R, P, 246 + Math.sin(t * 0.25 + 2) * 3, 119, t, -1, 1);
  c_jabali(R, P, 238 + Math.sin(t * 0.9) * 4, 120, t, Math.cos(t * 0.9) > 0 ? 1 : -1, 2, true);
  // el trigo silvestre que se mece: hileras de espigas cada vez más grandes hacia delante, con las rachas que pasan
  for (let k = 0; k < 300; k++) { const y = 120 + Math.floor(k / 300 * 28) + (h(k, 1, 95) < 0.5 ? 1 : 0), x = h(k, 2, 95) * 324 - 2;
    const racha = Math.sin(x * 0.03 - t * 1.6) * 0.5 + 0.5, alto = 5 + (y - 120) * 0.25 + h(k, 3, 95) * 3, inc = (Math.sin(t * 2.1 + x * 0.09 + k) * 0.6 + racha * 2.2 - 0.6) * alto / 9;
    c_espiga(R, x, y, alto, inc, P, false, at && h(k, 4, 95) < 0.3); }
  // la hierba de delante que se mueve
  for (let k = 0; k < 50; k++) { const x = Math.round(h(k, 1, 96) * 320), y = 166 + Math.round(h(k, 2, 96) * 14), a = 3 + h(k, 3, 96) * 4, w = Math.sin(t * 1.9 + x * 0.05) * 1.5;
    R.linea(x, y, Math.round(x + w), Math.round(y - a), k % 2 ? P.e1 : P.e3); }
  return { suelo: 150, horizonte: 84, cerro: [40, 66], monte: [304, 50] };
}

function c_trigalFijo(R, P, hora) {
  const B = R.buf, at = hora === 'atardecer';
  c_cieloFijo(R, hora, 104, at ? [60, 74, 12] : [186, 26, 7]);
  c_karacadag(R, P, 270, 260, 48, 98, [[150, 15, 5], [192, 12, 6], [312, 12, 4]], 104);
  const lom = (x) => 86 - 2.5 * Math.sin(x * 0.04) - 10 * Math.exp(-Math.pow((x - 46) / 16, 2)) + c_lim((x - 150) / 80) * 2;
  for (let x = 0; x < 320; x++) { const top = Math.round(lom(x)), cerro = Math.exp(-Math.pow((x - 46) / 14, 2));
    for (let y = top; y < 104; y++) { const l = 0.55 - (lom(x + 1) - lom(x - 1)) * 0.25 + (h(x >> 1, y, 101) - 0.5) * 0.2 + (y === top ? 0.25 : 0);
      let c = c_ram([P.l0, P.l1, P.l2, P.l3], l, x, y); if (cerro > 0.35 && y < top + 7) c = c_ram([P.z3, P.z4, P.z5], l + 0.1, x, y); B[y * 320 + x] = c_mezcla(c, P.bruma, 0.3); } }
  for (const px of [38, 41, 44, 47, 50, 53]) { const top = Math.round(lom(px)); R.pset(px, top - 1, P.z6); R.pset(px, top, P.z2); }
  // el mar de trigo lejano: bandas de espigas tramadas, más finas y pálidas hacia el fondo
  for (let y = 88; y < 150; y++) for (let x = 0; x < 320; x++) { const top = 92 + Math.sin(x * 0.02) * 2; if (y < top) continue;
    const prof = (y - 92) / 58, l = 0.78 - prof * 0.35 + Math.sin(x * 0.4 + y * 1.7) * 0.08 * prof + (h(x >> (prof < 0.3 ? 2 : 1), y, 102) - 0.5) * (0.15 + prof * 0.3) + (h(x, y >> 1, 103) < prof * 0.18 ? -0.35 : 0);
    let c = c_ram([P.t0, P.t1, P.t2, P.t3, P.t4], l, x, y); if (prof < 0.25) c = c_mezcla(c, P.bruma, 0.3 - prof); B[y * 320 + x] = c; }
  // pistacheros sueltos en el trigal lejano
  for (const [x, b, s] of [[96, 96, 3], [132, 94, 2], [214, 99, 4], [300, 101, 3]]) c_arbolito(R, P, x, b, s, x % 2, 110 + x);
  // el sendero pisado entre el trigo, con rastrojo, y la tierra de delante
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const b0 = 146 + Math.sin(x * 0.04) * 1.6 + h(x >> 1, 1, 104) * 1.4; if (y < b0) continue;
    let l = 0.62 - (y - b0) * 0.008 + (h(x >> 1, y, 105) - 0.5) * 0.3; if (h(x, y >> 1, 106) < 0.1) l -= 0.3;
    B[y * 320 + x] = y < b0 + 1 ? P.r1 : h(x, y, 107) < 0.05 ? P.t3 : c_ram([P.r1, P.r2, P.r3, P.r4, P.r5], l, x, y); }
  for (let k = 0; k < 20; k++) { const x = Math.round(h(k, 1, 108) * 316), y = Math.round(152 + h(k, 2, 108) * 24); R.disco(x + 1, y + 1, 1.3, P.r1); R.disco(x, y, 1.3, k % 3 ? P.z3 : P.silexL); }
  // los claros ya segados donde trabajan las recolectoras: un claro redondeado de rastrojo pajizo (los tallos cortados
  // en hileras, con la tierra parda entre ellos) y un pasillo segado que baja hasta el sendero
  const enClaro = (x, y, gx, gy) => ((x - gx) / 12) ** 2 + ((y - gy + 1) / 7) ** 2 < 1 + (h(x, y, 115) - 0.5) * 0.25 || (y >= gy && y < 148 && Math.abs(x - gx) < 5 + (h(x, y, 115) < 0.3 ? 1 : 0));
  for (const [gx, gy] of c_RECO) for (let y = gy - 9; y < 148; y++) for (let x = gx - 13; x <= gx + 13; x++) { if (!enClaro(x, y, gx, gy)) continue;
    const fila = (y - gy) & 1, l = 0.55 + (h(x >> 1, y, 118) - 0.5) * 0.45 - (y - gy + 8) * 0.01;
    B[y * 320 + x] = h(x, y, 116) < 0.12 ? c_ram([P.r2, P.r3], l, x, y) : fila && h(x, y, 117) < 0.55 ? P.t4 : c_ram([P.t1, P.t2, P.t3], l, x, y); }
  // una gavilla atada en cada claro, al otro lado de la cesta: los tallos abiertos arriba con las espigas y la atadura
  c_RECO.forEach(([gx, gy], k) => { const d = k === 1 ? -1 : 1, x = gx + d * 9, y = gy + 2;
    for (let i = -2; i <= 2; i++) { R.linea(Math.round(x + i * 0.5), y, Math.round(x + i * 1.2), y - 8, i < 0 ? P.t3 : i > 0 ? P.t1 : P.t2); R.pset(Math.round(x + i * 1.2), y - 9, i % 2 ? P.t4 : P.t3); R.pset(Math.round(x + i * 1.4), y - 10, P.t2); }
    R.linea(x - 1, y - 3, x + 1, y - 3, P.cuerdaS); R.linea(x - 3, y + 1, x + 3, y + 1, P.r1); });
  // espigas caídas y rastrojo cortado en el sendero
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 3, 108) * 320), y = Math.round(150 + h(k, 4, 108) * 28); R.linea(x, y, x + 2 + (k % 3), y - (k % 2), k % 2 ? P.t2 : P.t3); }
}
const c_RECO = [[64, 136], [150, 133], [244, 137]];   // dónde siegan las recolectoras (pies)

function c_trigal(R, t, o, hora, P) {
  const at = hora === 'atardecer';
  R.copiar(c_capa(R, 'trigo|' + hora, () => c_trigalFijo(R, P, hora)));
  c_nubes(R, t, hora, 86, [[60, 36, 48, 0.9, 11], [200, 26, 40, 0.6, 12], [130, 58, 24, 1.7, 13], [20, 70, 18, 2.3, 14, true]]);
  c_humo(R, P, 47, 75, t, 14);
  c_bandada(R, P, t + 6, 54, 15, -1);
  // las rachas de viento que recorren el trigal lejano (bandas que aclaran las espigas)
  const B = R.buf;
  for (let y = 94; y < 124; y++) for (let x = 0; x < 320; x++) { const w = Math.sin(x * 0.045 - t * 1.4 + y * 0.12) + Math.sin(x * 0.017 - t * 0.6) * 0.5;
    if (w > 1.05 && c_um(x, y) < (w - 1.05) * 1.6) B[y * 320 + x] = c_mezcla(B[y * 320 + x], P.t4, 0.45); }
  // la línea punteada luminosa que une las laderas de los montes con el cerro
  let camino = null;
  if (o.camino) { camino = [[262, 74], [226, 80], [182, 84], [134, 86], [92, 84], [60, 80], [46, 77]];
    let acum = 0;
    for (let i = 0; i + 1 < camino.length; i++) { const [ax, ay] = camino[i], [bx, by] = camino[i + 1], lar = Math.hypot(bx - ax, by - ay);
      for (let s = 0; s < lar; s += 1) { const u = s / lar, x = Math.round(ax + (bx - ax) * u), y = Math.round(ay + (by - ay) * u), q = (acum + s) | 0;
        if (q % 4 < 2) { const brillo = Math.sin((acum + s) * 0.18 - t * 5) > 0.6; R.pset(x, y, brillo ? P.oroL : P.oro); if (brillo) { R.pset(x, y - 1, c_mezcla(R.pget(x, y - 1), P.oroL, 0.5)); R.pset(x, y + 1, c_mezcla(R.pget(x, y + 1), P.oro, 0.5)); } } }
      acum += lar; }
    const [ex, ey] = camino[camino.length - 1]; if (Math.sin(t * 4) > 0) R.anillo(ex, ey - 1, 3, P.oroL); }
  // las espigas que se mecen y las recolectoras entre ellas (se pintan de atrás adelante, así el trigo las tapa)
  const reco = c_RECO.map(([x, y], k) => [x, y, k === 1 ? -1 : 1, k]);
  let ri = 0;
  const pintaReco = (hasta) => { while (ri < reco.length && reco[ri][1] <= hasta) { const [x, y, d, k] = reco[ri++], f = (Math.sin(t * 2.2 + k * 2) + 1) / 2;
    const m = c_fig(R, P, x, y, { pose: 'siega', dir: d, k: [3, 7, 11][k], fase: f });
    // la cesta a su lado, con espigas dentro
    const cx = x - d * 6; R.rect(cx - 2, y - 4, cx + 2, y, P.cesta); R.linea(cx - 2, y - 2, cx + 2, y - 2, P.cestaS); R.pset(cx - 1, y - 5, P.t3); R.pset(cx + 1, y - 6, P.t4); R.pset(cx, y - 5, P.t2);
    if (f > 0.8) { R.pset(m.mano[0] + d * 3, m.mano[1] - 2, P.t4); } } };
  ri = 0; reco.sort((a, b) => a[1] - b[1]);
  for (let k = 0; k < 420; k++) { const y = 104 + Math.floor(k / 420 * 46), x = h(k, 2, 109) * 326 - 3;
    pintaReco(y - 1);
    const racha = Math.sin(x * 0.03 - t * 1.5) * 0.5 + 0.5, alto = 4 + (y - 104) * 0.3 + h(k, 3, 109) * 4, inc = (Math.sin(t * 2.3 + x * 0.1 + k) * 0.7 + racha * 2.4 - 0.7) * alto / 10;
    if (reco.some(([gx, gy]) => y > gy - 10 && y < 148 && (Math.abs(x - gx) < (y < gy + 5 ? 13 : 6) || Math.abs(x + inc - gx) < (y < gy + 5 ? 13 : 6)))) continue;   // el claro ya segado, hasta el sendero
    c_espiga(R, x, y, alto, inc, P, y > 138, at && h(k, 4, 109) < 0.35); }
  pintaReco(999);
  return { suelo: 150, horizonte: 92, cerro: [46, 76], monte: [262, 48], camino };
}
// el pilar sin terminar: la zanja, la cara de arriba (rugosa, con las marcas del pico), la cara de delante en sombra,
// la cabeza en T a la derecha y la raja
const c_PIL = { x0: 88, x1: 188, xc: 224, yA: 116, yB: 127, yC: 141, yHa: 112, yHb: 131 };

function c_canteraFijo(R, P, hora) {
  const B = R.buf, at = hora === 'atardecer';
  c_cieloFijo(R, hora, 100, at ? [70, 50, 12] : [196, 26, 7]);
  // el horizonte lejano y la llanura de Harrán, abajo a la derecha, con su bruma
  for (let y = 54; y < 106; y++) for (let x = 0; x < 320; x++) { const top = 58 + Math.sin(x * 0.04) * 1.5 + Math.sin(x * 0.13) * 0.7; if (y < top) continue;
    const l = 0.4 + (y - 58) * 0.009 + Math.sin(x * 0.06 + y * 0.9) * 0.05 + (h(x >> 2, y, 111) - 0.5) * 0.2;
    let c = y < top + 3 ? c_ram([P.l0, P.l1], l, x, y) : (h(x >> 3, y >> 1, 112) < 0.3 ? c_ram([P.v1, P.v2, P.v3], l, x, y) : c_ram([P.e1, P.e2, P.e3, P.e4], l, x, y));
    B[y * 320 + x] = c_mezcla(c, P.bruma, c_lim(0.55 - (y - 58) * 0.012)); }
  // el cerro de los recintos (abajo a la derecha): una loma de tierra y caliza con muros redondos y pilares diminutos
  const cerro = (x) => 96 - 24 * Math.exp(-Math.pow((x - 272) / 34, 2));
  for (let x = 220; x < 320; x++) { const top = Math.round(cerro(x)); for (let y = top; y < 104; y++) { const l = 0.6 - (cerro(x + 1) - cerro(x - 1)) * 0.3 - (y - top) * 0.015 + (h(x >> 1, y, 113) - 0.5) * 0.25 + (y === top ? 0.2 : 0);
    B[y * 320 + x] = c_mezcla(c_ram([P.r2, P.r3, P.z2, P.z3, P.z4], l, x, y), P.bruma, 0.18); } }
  for (const [cx, cy, rx, ry] of [[258, 80, 9, 3], [282, 78, 8, 3], [270, 86, 7, 2.5]]) {
    for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2, x = Math.round(cx + Math.cos(an) * rx), y = Math.round(cy + Math.sin(an) * ry); R.pset(x, y, Math.sin(an) < 0 ? P.z2 : P.z5); }
    for (let a = 0; a < 8; a++) { const an = a / 8 * Math.PI * 2, x = Math.round(cx + Math.cos(an) * (rx - 1)), y = Math.round(cy + Math.sin(an) * (ry - 0.5)); R.pset(x, y - 1, P.z6); R.pset(x, y - 2, P.z5); R.pset(x + 1, y - 2, P.z5); }
    R.pset(cx, cy - 2, P.z6); R.pset(cx, cy - 1, P.z6); R.pset(cx + 2, cy - 2, P.z6); R.pset(cx + 2, cy - 1, P.z6); R.pset(cx - 1, cy - 2, P.z6); R.pset(cx + 3, cy - 2, P.z6); }
  // los bancales de la cantera (izquierda): superficie, cara con estratos y marcas de pico, huecos de bloques sacados
  const bancal = (yS, yF, yE, xFin, sem) => {
    const fin = (y) => xFin - (y - yS) * 0.5 + h(0, y >> 1, sem) * 3;
    for (let y = yS; y < yE; y++) for (let x = 0; x < fin(y); x++) { const i = y * 320 + x;
      if (y < yF) { let l = 0.72 + (h(x >> 1, y, sem + 1) - 0.5) * 0.25 + (y === yS ? 0.2 : 0); if (h(x >> 2, y, sem + 2) < 0.06) l -= 0.35; B[i] = c_ram([P.z2, P.z3, P.z4, P.z5, P.z6], l, x, y); }
      else { const v = (y - yF) / (yE - yF); let l = 0.62 - v * 0.25 + (h(x >> 1, y >> 2, sem + 3) - 0.5) * 0.2;
        if ((y - yF) % 6 === 0) l -= 0.22;   // los estratos
        if (h(x, y >> 1, sem + 4) < 0.12) l -= 0.18;   // las marcas de pico
        if (y === yF) l -= 0.3; if (y === yE - 1) l -= 0.4;
        B[i] = c_ram([P.z0, P.z1, P.z2, P.z3, P.z4], l, x, y); } }
    // el canto en luz donde acaba el bancal
    for (let y = yS; y < yE; y++) { const x = Math.round(fin(y)); R.pset(x, y, y < yF ? P.z6 : P.z1); R.pset(x + 1, y, P.z0); }
    // las muescas del borde, donde ya se sacaron bloques: la pared del fondo en sombra y el suelo de la muesca con luz
    for (let k = 0; k < 5; k++) { const hx = Math.round(10 + k * (xFin / 5) + h(k, sem, 114) * 12), hw = Math.round(9 + h(k, 2, sem) * 12), hd = 4 + Math.round(h(k, 3, sem) * 4); if (hx + hw > fin(yF) - 8) continue;
      for (let y = yF - 2; y <= yF + hd; y++) for (let x = hx; x <= hx + hw; x++) { const i = y * 320 + x;
        B[i] = y >= yF + hd - 1 ? c_ram([P.z3, P.z4, P.z5], 0.65 + (h(x, y, sem + 5) - 0.5) * 0.4, x, y)
          : x >= hx + hw - 1 ? P.z4 : c_ram([P.z1, P.z2, P.z3], 0.3 + (y - yF + 2) / (hd + 2) * 0.45 + (x - hx) / hw * 0.25 + (h(x, y >> 1, sem + 6) - 0.5) * 0.3, x, y); }
      R.linea(hx, yF - 2, hx, yF + hd, P.z1); R.linea(hx, yF + hd + 1, hx + hw, yF + hd + 1, P.z1); }
    // juntas verticales (diaclasas) en la cara y matas en las juntas de arriba
    for (let k = 0; k < 7; k++) { const x = Math.round(h(k, 4, sem) * (xFin - 20)) + 6; R.linea(x, yF + 1, x + (k % 3) - 1, yE - 2, P.z0); R.linea(x + 1, yF + 1, x + (k % 3), yE - 2, P.z3); }
    for (let k = 0; k < 6; k++) { const x = Math.round(h(k, 5, sem) * (xFin - 30)) + 8; for (let j = 0; j < 4; j++) R.linea(x + j, yF - 1, x + j + (j % 2) - 1, yF - 3 - (j % 3), j % 2 ? P.e1 : P.e3); }
  };
  bancal(58, 64, 82, 196, 120); bancal(82, 88, 104, 214, 130);
  // el suelo de roca de la meseta: caliza con grietas, pozas pequeñas y hierba seca en las juntas
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, prof = (y - 104) / 76;
    let l = 0.68 - prof * 0.12 + (h(x >> 1, y >> 1, 140) - 0.5) * 0.22 + Math.sin(x * 0.07 + y * 0.3) * 0.04;
    if (h(x >> 2, y >> 1, 141) < 0.05) l -= 0.25;
    B[i] = c_ram([P.z1, P.z2, P.z3, P.z4, P.z5], l, x, y);
    if (h(x, y, 142) < 0.04 && h(x >> 3, y >> 2, 143) < 0.4) B[i] = h(x, y, 144) < 0.5 ? P.e2 : P.e1; }
  // las grietas de la roca (líneas quebradas con el borde de luz)
  for (let k = 0; k < 9; k++) { let x = h(k, 1, 145) * 320, y = 106 + h(k, 2, 145) * 70; for (let s = 0; s < 22; s++) { const nx = x + 2 + h(k, s, 146) * 3, ny = y + (h(k, s, 147) - 0.5) * 3; R.linea(Math.round(x), Math.round(y), Math.round(nx), Math.round(ny), P.z1); R.pset(Math.round(x), Math.round(y) + 1, P.z5); x = nx; y = ny; } }
  // las lajas de la roca: juntas transversales que se abren hacia delante (la perspectiva) y juntas que fugan hacia el
  // fondo; cada laja con su canto de luz arriba y un leve escalón de sombra
  for (const [yj, sem] of [[112, 1], [122, 2], [135, 3], [151, 4], [169, 5]]) { let x = -2, y = yj;
    while (x < 322) { const tramo = 14 + h(x | 0, sem, 187) * 30, nx = x + tramo, ny = yj + (h(nx | 0, sem, 188) - 0.5) * 3;
      if (h(x | 0, sem, 189) > 0.18) { R.linea(Math.round(x), Math.round(y), Math.round(nx), Math.round(ny), P.z1); R.linea(Math.round(x), Math.round(y) + 1, Math.round(nx), Math.round(ny) + 1, P.z5);
        // la junta que fuga hacia el fondo, desde este punto hasta la junta de atrás
        if (h(x | 0, sem, 190) < 0.55) { const fx = Math.round(nx), fy = Math.round(ny), dx = (fx - 160) * 0.08; R.linea(fx, fy, Math.round(fx - dx), fy - (yj > 140 ? 13 : 9), P.z1); R.linea(fx + 1, fy, Math.round(fx - dx + 1), fy - (yj > 140 ? 13 : 9), P.z4); } }
      x = nx; y = ny; } }
  // cazoletas talladas en la roca (los hoyitos de Göbekli Tepe), líquenes naranjas y grises en manchas
  for (const [x, y, r] of [[30, 136, 2.4], [52, 166, 3], [270, 140, 2.6], [306, 158, 2.2], [214, 172, 2.8], [8, 120, 2]]) {
    R.disco(x, y, r, (xx, yy, d) => (yy < y ? P.z0 : d > 0.7 ? P.z2 : P.z1)); R.linea(Math.round(x - r + 1), Math.round(y + r * 0.6), Math.round(x + r - 1), Math.round(y + r * 0.6), P.z6); }
  for (let k = 0; k < 34; k++) { const cx = h(k, 1, 191) * 320, cy = 106 + h(k, 2, 191) * 72, r = 1 + h(k, 3, 191) * 2.2, c = k % 3 ? P.liquenG : P.liquen;
    if (cx > 80 && cx < 232 && cy > 106 && cy < 146) continue;
    for (let j = -3; j <= 3; j++) for (let i = -4; i <= 4; i++) { const xx = Math.round(cx + i), yy = Math.round(cy + j * 0.6); if (xx < 0 || xx > 319 || yy > 179 || Math.hypot(i, j) > r || h(xx, yy, 192) < 0.35) continue; B[yy * 320 + xx] = c_mezcla(B[yy * 320 + xx], c, 0.55); } }
  // la sombra que echa el bancal de abajo sobre el suelo, al pie de su cara
  for (let x = 0; x < 240; x++) for (let y = 104; y < 108; y++) { const fin = 214 - (y - 82) * 0.5 + 3; if (x > fin + (y - 104) * 3) continue; if (c_um(x, y) < 0.75 - (y - 104) * 0.18) B[y * 320 + x] = c_mezcla(B[y * 320 + x], P.k, 0.35); }
  // las escombreras: montones de cascajo y lascas que se tiran a un lado, con su sombra
  for (const [mx, my, w, al] of [[8, 116, 14, 8], [302, 112, 18, 7]]) { for (let j = 0; j < al; j++) for (let i = -w; i <= w; i++) { const e = 1 - (j / al) - Math.abs(i) / w * (1 - j / al) * 0.2; if (Math.abs(i) > w * (1 - j / al) + h(i, j, 193) * 2) continue;
    const x = mx + i, y = my - j; if (x < 0 || x > 319) continue; B[y * 320 + x] = h(x, y, 194) < 0.3 ? P.z1 : c_ram([P.z1, P.z2, P.z3, P.z4, P.z5, P.z6], 0.45 + e * 0.1 - i / w * 0.25 + (h(x, y, 195) - 0.5) * 0.6, x, y); }
    R.linea(mx - w, my + 1, mx + w + 3, my + 1, P.z0); }
  // el hogar de los canteros: un cerco de piedras con ceniza y un tronco a medio arder (el fuego se anima)
  for (let a = 0; a < 9; a++) { const an = a / 9 * Math.PI * 2, x = Math.round(64 + Math.cos(an) * 6), y = Math.round(110 + Math.sin(an) * 2.4); R.disco(x, y, 1.4, (xx, yy, d) => (d < 0.5 && xx <= x ? P.basaltoL : P.basalto)); }
  R.rect(60, 109, 68, 111, P.humoS); R.linea(61, 110, 67, 110, P.humo); R.linea(58, 112, 70, 112, P.z1);
  // la llanura de la derecha: árboles sueltos, un sendero que sube al cerro y manchas de cultivo silvestre
  for (const [x, b, sz, tp] of [[206, 70, 2, 1], [226, 66, 2, 0], [304, 66, 2, 0], [214, 99, 3, 1], [316, 100, 2, 0]]) c_arbolito(R, P, x, b, sz, tp, 196 + x);
  for (let k = 0; k < 60; k++) { const u = k / 60, x = Math.round(230 + u * 40 + Math.sin(u * 7) * 6), y = Math.round(103 - u * 12); if (k % 3) R.pset(x, y, P.z5); }
  // la zanja alrededor del pilar, de borde irregular: la pared del fondo (de cara a nosotros, con luz y marcas del
  // pico), el suelo de la zanja delante del pilar en sombra y el canto de arriba con luz
  const { x0, x1, xc, yA, yB, yC, yHa, yHb } = c_PIL, j = (i, k) => Math.round((h(i, k, 149) - 0.5) * 3);
  const zanja = [[x0 - 5, yA - 3 + j(1, 1)], [x0 + 40, yA - 4], [x1 + 2, yA - 3 + j(4, 1)], [x1 + 3, yHa - 3], [xc + 4, yHa - 4 + j(5, 1)], [xc + 6, yHa], [xc + 6, yC + 4 + j(6, 1)], [xc - 40, yC + 5], [x0 + 30, yC + 4 + j(7, 1)], [x0 - 5, yC + 4], [x0 - 6, yA + 2]];
  R.poligono(zanja, (x, y) => { if (y < yA || (x > x1 && y < yHa)) return c_ram([P.z1, P.z2, P.z3], 0.75 - (y - (x > x1 ? yHa - 4 : yA - 4)) / 4 * 0.5 + (h(x >> 1, y, 150) < 0.2 ? -0.3 : 0), x, y);
    if (y > yC) return c_ram([P.z0, P.z1, P.z2], 0.1 + (y - yC) / 5 * 0.55 + (h(x, y, 151) - 0.5) * 0.3, x, y);
    return c_ram([P.z0, P.z1, P.z2], 0.3 + (h(x, y, 152) - 0.5) * 0.4, x, y); });
  for (let i = 0; i < zanja.length; i++) { const [ax, ay] = zanja[i], [bx, by] = zanja[(i + 1) % zanja.length]; if (ay > yC && by > yC) R.linea(ax, ay, bx, by, P.z5); else if (ay < yA && by < yA) R.linea(ax, ay, bx, by, P.z5); }
  // la cara de arriba: rugosa, con las marcas del pico en tandas oblicuas, la luz desde la izquierda y un leve lomo
  const arriba = (x, y) => { const cab = x > x1, v = cab ? (y - yHa) / (yHb - yHa) : (y - yA) / (yB - yA);
    let l = 0.78 - (x - x0) / (xc - x0) * 0.12 - Math.abs(v - 0.35) * 0.3 + (h(x >> 1, y, 153) - 0.5) * 0.22 + (cab ? 0.05 : 0);
    if ((x * 2 + y * 3) % 9 === 0 && h(x >> 2, y >> 1, 154) < 0.6) l -= 0.28; if (h(x, y, 155) < 0.06) l -= 0.3; return c_ram([P.z2, P.z3, P.z4, P.z5, P.z6], l, x, y); };
  R.poligono([[x0, yA], [x1 + 1, yA], [x1 + 1, yHa], [xc, yHa], [xc, yHb], [x1 + 1, yHb], [x1 + 1, yB], [x0, yB]], arriba);
  // la cara de delante, en sombra, con las marcas del pico; y el extremo de la cabeza
  const delante = (x, y) => { let l = 0.5 - (y - yB) / (yC - yB) * 0.3 + (h(x >> 1, y >> 1, 156) - 0.5) * 0.25; if ((x + y * 2) % 7 === 0) l -= 0.15; return c_ram([P.z0, P.z1, P.z2, P.z3], l, x, y); };
  R.poligono([[x0, yB], [x1 + 1, yB], [x1 + 1, yHb], [xc, yHb], [xc, yC], [x0, yC]], delante);
  R.linea(x0, yA, x1, yA, P.z6); R.linea(x1 + 1, yHa, xc - 1, yHa, P.z6); R.linea(x0, yB, x1, yB, P.z5); R.linea(x1 + 1, yHb, xc - 1, yHb, P.z5);
  R.linea(x1 + 1, yHa, x1 + 1, yA, P.z3); R.linea(x1 + 2, yHa + 1, x1 + 2, yA - 1, P.z4); R.linea(x1 + 1, yB + 1, x1 + 1, yHb, P.z1);
  R.linea(xc, yHa, xc, yC, P.z0); R.linea(xc - 1, yHa + 1, xc - 1, yHb, P.z4); R.linea(x0, yC, xc, yC, P.z0);
  // el extremo izquierdo, aún pegado a la roca (sin despegar), con la ranura de las cuñas de madera
  R.linea(x0 + 6, yA + 1, x0 + 6, yC - 1, P.z0); R.linea(x0 + 7, yA + 1, x0 + 7, yC - 1, P.z5);
  for (const y of [yA + 2, yA + 7, yB + 3, yB + 8]) { R.rect(x0 + 5, y, x0 + 7, y + 2, P.madera); R.pset(x0 + 5, y, P.maderaL); R.pset(x0 + 7, y + 2, P.maderaS); }
  // unos bloques ya cortados, tumbados a un lado, y una palanca apoyada en la zanja
  const bloque = (bx, by, w, hh) => { R.rect(bx, by - hh, bx + w, by, P.z2); R.rect(bx, by - hh - 3, bx + w, by - hh - 1, P.z5); R.rect(bx + w + 1, by - hh - 2, bx + w + 2, by, P.z1); R.linea(bx, by + 1, bx + w + 2, by + 1, P.z0);
    for (let k = 0; k < w; k += 3) R.pset(bx + k + 1, by - hh - 2, P.z4); };
  bloque(16, 126, 14, 7); bloque(30, 118, 10, 5); bloque(254, 124, 16, 8); bloque(276, 120, 9, 5);
  R.linea(x0 + 2, yC + 2, x0 - 24, yA - 10, P.maderaS); R.linea(x0 + 3, yC + 2, x0 - 23, yA - 10, P.madera); R.linea(x0 + 3, yC + 1, x0 - 22, yA - 10, P.maderaL);
  // la raja que cruza el pilar (cara de arriba y de delante), quebrada, con el canto de luz
  const raja = [[146, yA], [148, yA + 3], [147, yA + 6], [150, yA + 9], [151, yB], [153, yB + 4], [151, yB + 8], [152, yC]];
  for (let i = 0; i + 1 < raja.length; i++) { R.linea(raja[i][0], raja[i][1], raja[i + 1][0], raja[i + 1][1], P.k); R.linea(raja[i][0] + 1, raja[i][1], raja[i + 1][0] + 1, raja[i + 1][1], P.z0); R.pset(raja[i][0] - 1, raja[i][1], P.z6); }
  R.linea(162, yA + 2, 166, yA + 5, P.z1);   // otra fisura menor
  // percutores (bolas de basalto y nódulos de sílex) y lascas por el suelo
  for (const [x, y, r] of [[74, 146, 2.5], [232, 148, 2.5], [240, 151, 2], [60, 160, 2], [208, 160, 1.8]]) { R.disco(x + 1, y + 1, r, P.z1); R.disco(x, y, r, (xx, yy, d) => d < 0.45 && xx < x ? P.basaltoL : P.basalto); }
  for (let k = 0; k < 40; k++) { const x = Math.round(46 + h(k, 1, 154) * 220), y = Math.round(144 + h(k, 2, 154) * 30); if (x > 80 && x < 228 && y < 146) continue; R.pset(x, y, k % 2 ? P.silexL : P.z6); R.pset(x + 1, y, P.silex); }
  // la cesta de lascas, el odre de cuero y la palanca tumbada
  R.poligono([[28, 160], [44, 160], [42, 170], [30, 170]], (x, y) => ((x + y) % 3 === 0 ? P.cestaS : y < 162 ? P.cesta : c_mezcla(P.cesta, P.cestaS, 0.3)));
  R.linea(28, 160, 44, 160, P.cestaS); for (let i = 0; i < 6; i++) R.pset(31 + i * 2, 159, i % 2 ? P.silexL : P.silex);
  R.disco(267, 150, 4, (x, y, d) => (d < 0.5 && x < 267 ? P.cueroL : P.cuero)); R.rect(266, 144, 268, 146, P.cuero); R.pset(267, 143, P.cuerda); R.linea(263, 155, 272, 155, P.z1);
  R.linea(236, 174, 300, 168, P.maderaS); R.linea(236, 173, 300, 167, P.madera); R.linea(240, 172, 296, 167, P.maderaL);
}
function c_cantera(R, t, o, hora, P) {
  R.copiar(c_capa(R, 'cantera|' + hora, () => c_canteraFijo(R, P, hora)));
  c_nubes(R, t, hora, 58, [[40, 34, 46, 0.9, 21], [190, 24, 38, 0.6, 22], [120, 48, 22, 1.6, 23, true], [260, 52, 18, 2.1, 24, true], [330, 40, 30, 1.1, 25]]);
  c_buitre(R, P, 150, 30, t, 0); c_buitre(R, P, 180, 38, t, 1.7); c_bandada(R, P, t + 9, 50, 20, -1);
  // gacelas que pastan en la llanura, lejos, al pie del cerro
  for (let k = 0; k < 3; k++) c_gacela(R, P, 206 + k * 10 + Math.round(Math.sin(t * 0.09 + k) * 3), 71 - (k % 2), t, k % 2 ? -1 : 1, Math.sin(t * 0.8 + k * 1.7) > 0.4 ? 'mira' : 'pasta', k);
  // el fuego del hogar y su humo
  for (let k = 0; k < 5; k++) { const f = Math.sin(t * 9 + k * 2.1), x = 62 + k, al = 2 + Math.round((f + 1) * 1.2) - Math.abs(k - 2) * 0.5; R.linea(x, 109, x, Math.round(109 - al), k === 2 ? P.fuegoL : P.fuego); if (f > 0.6) R.pset(x, Math.round(108 - al), P.fuegoL); }
  c_humo(R, P, 64, 105, t, 14, 4);
  c_sombraNube(R, P, t, 120, 160, 52, 10, 3.6, 104, 179);
  c_humo(R, P, 266, 82, t, 18); c_humo(R, P, 286, 80, t + 2.3, 14, 4);
  // gente diminuta que va y viene por el cerro
  for (let k = 0; k < 3; k++) { const x = 248 + ((t * (2 + k) + k * 17) % 40), y = 84 + k * 2; R.pset(Math.round(x), y - 1, P.pi1); R.pset(Math.round(x), y - 2, P.p1); }
  // los canteros de los bancales: golpean con el percutor (polvo y lasca en cada golpe); uno acarrea un bloque
  const canteros = [[44, 64, 1, 0], [122, 64, -1, 1], [70, 88, 1, 2], [164, 88, 1, 3]];
  for (const [x, y, d, k] of canteros) { const per = 0.8 + k * 0.13, u = ((t + k * 0.37) % per) / per; c_fig(R, P, x, y, { pose: 'talla', dir: d, k, fase: u });
    if (u >= 0.6) { const g = (u - 0.6) / 0.4; c_soplo(R, P, x + d * 4, y - 1, g, 2.4, P.polvo); if (g < 0.5) R.pset(Math.round(x + d * (5 + g * 8)), Math.round(y - 3 - g * 4), P.z6); } }
  { const u = (t / 14) % 1, x = 10 + u * 180, d = 1; c_fig(R, P, x, 88, { pose: 'carga', dir: d, k: 5, fase: t * 1.6 }); }
  // una lagartija que cruza la roca a ratos, y las matas de las grietas que se mueven
  { const u = (t % 9) / 9; if (u < 0.5) { const x = Math.round(300 - u / 0.5 * 90 + Math.sin(u * 60) * 1), y = 166 + Math.round(Math.sin(u * 9) * 2), f = Math.floor(t * 12) % 2;
    R.linea(x, y, x + 6, y, P.e0); R.linea(x + 6, y, x + 9, y + 1, P.e1); R.pset(x - 1, y, P.e1); R.pset(x + 1 + f, y - 1, P.e0); R.pset(x + 1 + f, y + 1, P.e0); R.pset(x + 4 - f, y - 1, P.e0); R.pset(x + 4 - f, y + 1, P.e0); R.pset(x, y, P.k); } }
  for (let k = 0; k < 24; k++) { const x = Math.round(h(k, 1, 178) * 320), y = 108 + Math.round(h(k, 2, 178) * 70); if (x > 80 && x < 234 && y > 102 && y < 148) continue;
    const w = Math.sin(t * 1.7 + x * 0.06) * 1.2; for (let j = 0; j < 3; j++) R.linea(x + j, y, Math.round(x + j - 1 + j + w), y - 2 - (j % 2) * 2, j === 1 ? P.e3 : P.e1); }
  const { x0, xc, yA, yHa, yC } = c_PIL;
  return { suelo: 150, horizonte: 58, pilar: [x0, yHa, xc, yC], raja: [149, yA + 6], cabeza: [206, yHa], cerro: [272, 72] };
}
function c_troncosFijo(R, P, hora) {
  const B = R.buf, at = hora === 'atardecer';
  c_cieloFijo(R, hora, 100, at ? [56, 58, 12] : [150, 24, 7]);
  // muy al fondo, a la izquierda, el lomo de los Karacadağ azulado por la bruma (el término más lejano)
  c_karacadag(R, P, 74, 150, 50, 72, [[34, 9, 4], [104, 8, 4]], 72, 0.32);
  // lomas lejanas azuladas y la llanura
  for (let y = 60; y < 100; y++) for (let x = 0; x < 320; x++) { const top = 66 + 3 * Math.sin(x * 0.03 + 2) + 1.5 * Math.sin(x * 0.11); if (y < top) continue;
    const l = 0.5 + (y - 66) * 0.01 + (h(x >> 2, y, 161) - 0.5) * 0.2 + (y < top + 1 ? 0.25 : 0);
    B[y * 320 + x] = c_mezcla(y < top + 6 ? c_ram([P.l0, P.l1, P.l2], l, x, y) : c_ram([P.e1, P.e2, P.e3], l, x, y), P.bruma, c_lim(0.5 - (y - 66) * 0.02)); }
  // el cerro de los recintos a la derecha, con los muros a medio hacer y los pilares de pie
  const cerro = (x) => 92 - 34 * Math.exp(-Math.pow((x - 286) / 42, 2));
  for (let x = 200; x < 320; x++) { const top = Math.round(cerro(x)); for (let y = top; y < 100; y++) { const l = 0.62 - (cerro(x + 1) - cerro(x - 1)) * 0.3 - (y - top) * 0.012 + (h(x >> 1, y, 162) - 0.5) * 0.25 + (y === top ? 0.2 : 0);
    B[y * 320 + x] = c_ram([P.r2, P.r3, P.z2, P.z3, P.z4], l, x, y); } }
  for (const [cx, cy, rx, ry] of [[270, 72, 13, 4], [298, 70, 11, 4]]) {
    for (let a = 0; a < 60; a++) { const an = a / 60 * Math.PI * 2, x = Math.round(cx + Math.cos(an) * rx), y = Math.round(cy + Math.sin(an) * ry); if (an > 3.6 && an < 4.6) continue; R.pset(x, y, Math.sin(an) < 0 ? P.z2 : P.z4); R.pset(x, y - 1, P.z3); }
    for (let a = 0; a < 7; a++) { const an = a / 7 * Math.PI * 2 + 0.3, x = Math.round(cx + Math.cos(an) * (rx - 1)), y = Math.round(cy + Math.sin(an) * (ry - 0.5)); R.rect(x, y - 5, x + 1, y - 1, P.z5); R.rect(x - 1, y - 5, x + 2, y - 5, P.z6); R.pset(x + 1, y - 1, P.z2); }
    R.rect(cx - 1, cy - 7, cx, cy - 1, P.z6); R.rect(cx - 2, cy - 7, cx + 1, cy - 7, P.z6); R.rect(cx + 3, cy - 7, cx + 4, cy - 1, P.z5); R.rect(cx + 2, cy - 7, cx + 5, cy - 7, P.z6); }
  // la ladera de enmedio: estepa con matas, rocas de caliza que asoman y unos árboles
  for (let y = 76; y < 108; y++) for (let x = 0; x < 320; x++) { const top = 80 + Math.sin(x * 0.025) * 3; if (y < top || (x > 200 && y < cerro(x) + 2)) continue;
    let l = 0.6 - (y - top) * 0.006 + (h(x >> 1, y >> 1, 163) - 0.5) * 0.25 + (y < top + 1 ? 0.2 : 0); if (h(x, y >> 1, 164) < 0.1) l -= 0.3;
    B[y * 320 + x] = c_ram([P.e0, P.e1, P.e2, P.e3, P.e4], l, x, y); }
  for (let k = 0; k < 7; k++) { const x = 10 + k * 30 + h(k, 1, 165) * 14, y = 86 + h(k, 2, 165) * 8, w = 5 + h(k, 3, 165) * 5;
    R.poligono([[x - w, y + 2], [x - w + 2, y - 2], [x + w * 0.4, y - 3], [x + w, y + 2]], (xx, yy) => c_ram([P.z2, P.z3, P.z4, P.z5], 0.8 - (xx - x + w) / (2 * w) * 0.5 + (h(xx, yy, 166) - 0.5) * 0.3, xx, yy)); R.linea(x - w, y + 2, x + w, y + 2, P.z1); }
  for (const [x, b, s, tp] of [[30, 84, 4, 0], [118, 82, 3, 1], [176, 85, 3, 0]]) c_arbolito(R, P, x, b, s, tp, 170 + x);
  // el camino de tierra pisada con las rodadas transversales de los troncos
  for (let y = 100; y < 134; y++) for (let x = 0; x < 320; x++) { const b0 = 104 + Math.sin(x * 0.04) * 1.2, b1 = 131 + Math.sin(x * 0.05 + 1) * 1.5; if (y < b0 || y > b1) continue;
    let l = 0.58 - (y - b0) * 0.006 + (h(x, y, 167) - 0.5) * 0.2 + Math.sin(x * 0.08 + y * 0.4) * 0.05; if ((x + Math.round(y * 0.2)) % 18 < 2) l -= 0.15; if (y < b0 + 1) l -= 0.25; if (y > b1 - 1) l -= 0.12;
    B[y * 320 + x] = h(x, y, 173) < 0.06 ? P.r3 : c_ram([P.z2, P.z3, P.z4, P.z5], l + 0.1 + (h(x >> 3, y >> 2, 179) - 0.5) * 0.25, x, y); }
  // las huellas del arrastre: dos surcos largos que dejaron otros pilares (sombra arriba, canto de luz abajo), las
  // pisadas de los que tiran, tiras de corteza y astillas de los troncos, y la tierra suelta que levantan
  for (const ys of [109, 123]) for (let x = 0; x < 320; x++) { if (h(x >> 3, ys, 180) < 0.12) continue;
    const y = Math.round(ys + Math.sin(x * 0.04) * 1.2 + Math.sin(x * 0.013 + ys) * 1.5);
    B[y * 320 + x] = P.z1; B[(y + 1) * 320 + x] = c_um(x, y) < 0.5 ? P.z2 : P.z1; B[(y + 2) * 320 + x] = P.z5; }
  for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 181) * 317), y = Math.round(106 + h(k, 2, 181) * 23); B[y * 320 + x] = P.z1; B[y * 320 + x + 1] = P.z2; B[(y - 1) * 320 + x + 1] = P.z5; }
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 182) * 306), y = Math.round(107 + h(k, 2, 182) * 22), l = 3 + Math.round(h(k, 3, 182) * 4), dy = k % 3 - 1;
    R.linea(x, y + 1, x + l, y + 1 + dy, P.z1); R.linea(x, y, x + l, y + dy, k % 2 ? P.maderaL : P.madera); R.pset(x + l, y + dy, P.maderaS); }
  // los bordes del camino: piedras que se apartaron al pasar y matas
  for (let k = 0; k < 46; k++) { const arriba = k % 2 === 0, x = Math.round(h(k, 1, 183) * 320), y = Math.round(arriba ? 103 + Math.sin(x * 0.04) * 1.2 : 132 + Math.sin(x * 0.05 + 1) * 1.5), r = 0.8 + h(k, 2, 183) * 1.4;
    if (k % 4 === 1) { for (let j = 0; j < 5; j++) R.linea(x + j, y, x + j - 1 + (j % 2) * 2, y - 2 - (j % 3), j % 2 ? P.e1 : P.e3); continue; }
    R.disco(x + 1, y + 1, r, P.z1); R.disco(x, y, r, (xx, yy, d) => (d < 0.5 && xx <= x ? P.z6 : P.z4)); }
  // la estepa de delante (donde van los personajes), con hierba, piedras y lascas
  for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) { const b1 = 131 + Math.sin(x * 0.05 + 1) * 1.5; if (y <= b1) continue;
    let l = 0.58 + (h(x >> 1, y >> 1, 168) - 0.5) * 0.3 - (y - 132) * 0.004; if (h(x, y >> 1, 169) < 0.13) l -= 0.32;
    // manchas de hierba aún verde en las hondonadas y de hierba seca en los altos, a trozos grandes
    const verde = Math.sin(x * 0.03 + Math.sin(y * 0.08) * 2) + Math.sin(x * 0.011 - y * 0.05) * 0.8 + (h(x >> 3, y >> 2, 184) - 0.5) * 0.5;
    B[y * 320 + x] = verde > 0.95 + (c_um(x, y) - 0.5) * 0.5 ? c_ram([P.v0, P.v1, P.v2, P.v3], l, x, y) : c_ram([P.e0, P.e1, P.e2, P.e3, P.e4], l + (verde < -1 ? 0.12 : 0), x, y); }
  for (let k = 0; k < 22; k++) { const x = Math.round(h(k, 1, 170) * 316), y = Math.round(132 + h(k, 2, 170) * 46), r = 1 + h(k, 3, 170) * 1.5; R.disco(x + 1, y + 1, r, P.e0); R.disco(x, y, r, (xx, yy, d) => (d < 0.5 && xx <= x ? P.z5 : P.z3)); }
  // calvas de caliza en la hierba, matas oscuras y florecillas
  for (let k = 0; k < 9; k++) { const cx = 20 + h(k, 1, 174) * 280, cy = 142 + h(k, 2, 174) * 34, w = 8 + h(k, 3, 174) * 12;
    R.poligono([[cx - w, cy], [cx - w * 0.6, cy - 3], [cx + w * 0.5, cy - 3.5], [cx + w, cy + 1], [cx + w * 0.3, cy + 3], [cx - w * 0.7, cy + 2.5]], (x, y) => c_ram([P.z2, P.z3, P.z4, P.z5], 0.7 - (y - cy + 3) / 7 * 0.35 + (h(x, y, 175) - 0.5) * 0.35, x, y)); }
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 176) * 318), y = Math.round(138 + h(k, 2, 176) * 40); R.disco(x, y, 1.6, (xx, yy, dd) => (dd < 0.5 ? P.v1 : P.v0)); if (k % 3 === 0) { R.pset(x + 2, y - 2, P.flor); R.pset(x - 2, y - 1, P.fuegoL); } }
  // un rollo de cuerda, una cesta con comida y un odre, junto al camino
  R.disco(108, 139, 4, (x, y, dd) => (Math.round(dd * 6) % 2 ? P.cuerdaS : P.cuerda)); R.pset(108, 139, P.maderaS);
  R.poligono([[194, 137], [206, 137], [204, 144], [196, 144]], (x, y) => ((x + y) % 3 === 0 ? P.cestaS : P.cesta)); R.linea(194, 137, 206, 137, P.cestaS); R.disco(198, 136, 1.5, P.r4); R.disco(202, 136, 1.5, P.e3);
  R.disco(214, 141, 3, (x, y, dd) => (dd < 0.5 && x < 214 ? P.cueroL : P.cuero)); R.rect(213, 137, 215, 138, P.cuero);
  // troncos de repuesto apilados junto al camino, a la izquierda
  for (const [x, y] of [[8, 96], [16, 96], [12, 92]]) { R.rect(x - 14, y - 2, x, y + 2, P.madera); R.rect(x - 14, y - 2, x, y - 2, P.maderaL); R.disco(x, y, 2.5, P.maderaL); R.pset(x, y, P.maderaS); }
  // un campamento pequeño en la ladera de la izquierda: dos chozas de ramas con su piel tendida
  for (const [cx, cb] of [[74, 90], [86, 91]]) { R.poligono([[cx - 5, cb], [cx, cb - 7], [cx + 5, cb]], (x, y) => ((x * 3 + y) % 4 === 0 ? P.maderaS : x < cx ? P.maderaL : P.madera));
    R.linea(cx, cb - 7, cx - 1, cb - 9, P.maderaS); R.linea(cx, cb - 7, cx + 1, cb - 9, P.maderaS); R.rect(cx - 1, cb - 2, cx + 1, cb, P.k); }
  R.rect(92, 87, 96, 89, P.pL); R.linea(91, 86, 97, 86, P.maderaS);
  // matorrales grandes, con luz arriba a la izquierda y su sombra
  for (const [mx, my, r] of [[262, 146, 7], [272, 148, 5], [24, 140, 5], [150, 176, 6]]) { for (let i = -r - 1; i <= r + 3; i++) { const xx = Math.round(mx + i + 2); if (xx >= 0 && xx < 320 && c_um(xx, my) < 0.8) B[my * 320 + xx] = c_mezcla(B[my * 320 + xx], P.k, 0.35); }
    R.disco(mx, my - r * 0.7, r, (xx, yy, d) => c_ram([P.h0, P.h1, P.h2, P.h3], 0.85 - d * 0.45 - (yy - my + r) / (r * 4) - (xx - mx) / (r * 5) + (h(xx, yy, 185) - 0.5) * 0.45, xx, yy)); }
  // una rama seca caída, gris de sol, con su sombra
  R.linea(44, 171, 86, 166, P.e0); R.linea(44, 170, 86, 165, P.z3); R.linea(46, 169, 84, 164, P.z5); R.linea(60, 168, 66, 161, P.z3); R.linea(74, 166, 79, 160, P.z4); R.pset(79, 159, P.z5);
  // amapolas y cardos: manchas de color en la hierba
  for (let k = 0; k < 26; k++) { const g = k % 3, cx = [118, 226, 300][g] + (h(k, 1, 186) - 0.5) * 26, cy = [168, 160, 176][g] + (h(k, 2, 186) - 0.5) * 10, x = Math.round(cx), y = Math.round(cy);
    R.linea(x, y, x, y - 3, P.v0); R.pset(x, y - 4, P.amapola); R.pset(x + 1, y - 4, P.amapolaS); R.pset(x, y - 5, P.amapolaL); }
  for (const [x, y] of [[40, 152], [196, 172], [244, 166], [312, 150]]) { R.linea(x, y, x, y - 6, P.v0); R.linea(x - 2, y - 3, x + 2, y - 4, P.v1);
    R.rect(x - 1, y - 8, x + 1, y - 7, P.cardo); R.pset(x, y - 9, P.cardoL); R.pset(x - 1, y - 6, P.v1); R.pset(x + 1, y - 6, P.v1); }
}
function c_troncos(R, t, o, hora, P) {
  R.copiar(c_capa(R, 'troncos|' + hora, () => c_troncosFijo(R, P, hora)));
  c_nubes(R, t, hora, 66, [[20, 34, 42, 0.8, 31], [160, 28, 50, 0.55, 32], [250, 52, 22, 1.5, 33, true], [90, 58, 18, 2.0, 34, true], [320, 44, 28, 1.1, 35], [200, 62, 14, 2.6, 36, true]]);
  c_humo(R, P, 283, 62, t, 16); c_humo(R, P, 80, 82, t + 1.4, 12, 4); c_bandada(R, P, t + 3, 48, 18);
  // las sombras de las nubes que corren por la estepa y por el camino
  c_sombraNube(R, P, t, 40, 156, 46, 9, 4.5, 133, 179); c_sombraNube(R, P, t, 260, 92, 34, 5, 3.2, 80, 104);
  // gacelas lejanas en la ladera, que pastan y levantan la cabeza
  for (let k = 0; k < 3; k++) { const x = 190 + k * 9 + Math.round(Math.sin(t * 0.1 + k) * 3); c_gacela(R, P, x, 96 + (k % 2), t, k === 1 ? 1 : -1, Math.sin(t * 0.7 + k * 2) > 0.3 ? 'mira' : 'pasta', k); }
  c_cernicalo(R, P, t, 120, 58);
  for (let k = 0; k < 3; k++) c_mariposa(R, P, t, [120, 228, 300][k], [160, 152, 168][k], k);
  // la hierba de delante, que se mueve con el viento
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 177) * 320), y = 136 + Math.round(h(k, 2, 177) * 44), a = 2 + h(k, 3, 177) * 3 + (y - 136) * 0.06, w = Math.sin(t * 1.8 + x * 0.05) * 1.3;
    R.linea(x, y, Math.round(x + w), Math.round(y - a), k % 2 ? P.e1 : P.e3); R.linea(x + 1, y, Math.round(x + 1 + w * 0.6), Math.round(y - a * 0.7), P.e2); }
  // el tirón: todos a la vez cada 1,3 s; el pilar avanza a golpes (o con o.avance)
  const per = 1.3, ph = (t % per) / per, tiron = ph < 0.35 ? Math.sin(ph / 0.35 * Math.PI) : 0;
  const av = o.avance ?? c_lim((Math.floor(t / per) + Math.min(1, ph / 0.35)) * 0.012), d = av * 116, X0 = Math.round(16 + d), L = 84;
  const yT = 99, yM = 105, yS = 111, yL = 118;   // arriba de la cabeza, arriba del fuste, cara de delante, troncos
  // los que miran desde la ladera
  const mir = [[46, 92, 0], [55, 93, 1], [63, 91, 2], [150, 94, 3], [159, 93, 4]];
  mir.forEach(([x, y, k]) => { const m = c_fig(R, P, x, y, { pose: k % 2 ? 'mira' : 'quieto', dir: 1, k, fase: 0 }); if (tiron > 0.6 && k === 2) R.pset(m.mano[0], m.mano[1] - 3, P.p1); });
  // los troncos que esperan delante, en el camino
  const tronco = (x, y, ang) => { R.rect(x - 2, y - 7, x + 2, y - 3, P.madera); R.disco(x, y - 5, 3.2, (xx, yy, dd) => (dd > 0.75 ? P.maderaS : dd > 0.4 ? P.maderaL : P.cuerda));
    R.linea(Math.round(x + Math.cos(ang) * 2.4), Math.round(y - 5 + Math.sin(ang) * 2.4), Math.round(x - Math.cos(ang) * 2.4), Math.round(y - 5 - Math.sin(ang) * 2.4), P.maderaS); };
  for (const x of [X0 + L + 30, X0 + L + 48, X0 + L + 66]) if (x < 330) tronco(x, yL + 8, 0.3);
  // las dos filas de los que tiran (la de atrás antes que el pilar, la de delante después)
  const filas = (yF, desf, kf) => { const pts = []; for (let i = 0; i < 7; i++) { const x = X0 + L + 10 + i * 9 + desf, m = c_fig(R, P, x - tiron * 1.5, yF, { pose: 'tira', dir: 1, k: kf + i, fase: (t * 0.8 + i * 0.13) % 1 }); pts.push(m.mano); } return pts; };
  const ropaAt = filas(yS + 1, 4, 0);
  const cuerda = (pts, y0) => { let [px, py] = [X0 + L - 2, y0]; for (const [mx, my] of pts) { R.linea(px, py - 1, mx, my - 1, P.cuerda); R.linea(px, py, mx, my, P.maderaL); R.linea(px, py + 1, mx, my + 1, P.maderaS); [px, py] = [mx, my]; } R.linea(px, py, px + 6, py + 4, P.cuerda); };
  cuerda(ropaAt, yM + 2);
  // los troncos bajo el pilar: ruedan a la mitad de su velocidad; el que sale por detrás reaparece delante
  for (let i = 0; i < 5; i++) { const rel = ((((i * 17 - d / 2) % 85) + 85) % 85) - 4, x = X0 + rel; if (rel < -3 || rel > L + 3) continue; tronco(x, yL + 8, -(x / 3.2)); }
  // el pilar: la cara de arriba (fuste y cabeza en T, más ancha), la de delante en sombra y el canto de luz
  const pilarL = (x, y) => c_ram([P.z2, P.z3, P.z4, P.z5, P.z6], 0.75 + (h(x - X0, y, 171) - 0.5) * 0.3 - (x - X0) / L * 0.1, x, y);
  R.poligono([[X0 - 1, yM - 1], [X0 + L - 19, yM - 1], [X0 + L - 19, yT - 1], [X0 + L + 1, yT - 1], [X0 + L + 1, yL + 1], [X0 - 1, yL + 1]], P.z0);
  R.poligono([[X0, yM], [X0 + L - 20, yM], [X0 + L - 20, yT], [X0 + L, yT], [X0 + L, yS], [X0, yS]], pilarL);
  R.poligono([[X0, yS], [X0 + L, yS], [X0 + L, yL], [X0, yL]], (x, y) => c_ram([P.z0, P.z1, P.z2, P.z3], 0.6 - (y - yS) / 7 * 0.35 + (h(x - X0, y >> 1, 172) - 0.5) * 0.25, x, y));
  R.linea(X0, yM, X0 + L - 21, yM, P.z6); R.linea(X0 + L - 20, yT, X0 + L - 1, yT, P.z6); R.linea(X0 + L - 20, yT, X0 + L - 20, yM, P.z3); R.linea(X0 + L - 19, yT + 1, X0 + L - 19, yM - 1, P.z5); R.linea(X0, yS, X0 + L, yS, P.z5); R.linea(X0 + L, yT, X0 + L, yL, P.z1); R.linea(X0, yL, X0 + L, yL, P.z0);
  // la cuerda atada a la cabeza
  R.linea(X0 + L - 4, yT, X0 + L - 4, yL, P.cuerdaS); R.linea(X0 + L - 3, yT, X0 + L - 3, yL, P.cuerda);
  // las palancas de detrás: dos que empujan hacia abajo, a la vez que el tirón
  for (let i = 0; i < 2; i++) { const bx = X0 - 2 + i * 6, yb = yL + 2, px = X0 - 16 + i * 6, py = yS - 10 + Math.round(tiron * 4);
    R.linea(bx, yb, px, py, P.madera); R.linea(bx, yb - 1, px, py - 1, P.maderaL); c_fig(R, P, px - 3, yL + 9 + i, { pose: 'palanca', dir: 1, k: 6 + i, fase: tiron }); }
  // el polvo de los troncos con cada tirón
  if (tiron > 0) for (let i = 0; i < 3; i++) c_soplo(R, P, X0 + 10 + i * 34, yL + 6, ph / 0.35, 3, P.polvo);
  const ropaDe = filas(yL + 10, 0, 7);
  cuerda(ropaDe, yS + 4);
  return { suelo: 150, horizonte: 66, pilar: [X0, yT, X0 + L, yL], cabeza: [X0 + L, yT], cuerda: ropaDe[ropaDe.length - 1], tiron, avance: av, cerro: [286, 60] };
}
// la paleta de los arqueólogos (tienda, casa y laboratorio)
const DP = pal({
  cA: '#4c8cd6', cB: '#62a0e0', cC: '#80b4e8', cD: '#a2caee', cE: '#c8dcea', cF: '#e4e2d0',
  nubS: '#a8bcd8', nub: '#dfe8f4', nubL: '#ffffff', lejS: '#9cb2d0', lej: '#c2d4ea', lejL: '#e0eaf6',
  sol: '#fff8dc', solH: '#f8eab0',
  sierraL: '#a6acca', sierra: '#9096b8', sierraS: '#7a80a2', loma: '#bca48a', lomaS: '#a08a72', lomaL: '#d0ba9c',
  arado: '#a05e3a', aradoS: '#7e452a', aradoL: '#bc7a4e', aradoD: '#643420',
  rastrojo: '#d6b676', rastrojoS: '#b29250', rastrojoL: '#e8d096',
  suelo: '#c0a46e', sueloS: '#a08654', sueloL: '#d6bc88', sueloD: '#7e6844', camino: '#dcc49a', caminoS: '#bca478', caminoL: '#ecd8b0',
  hierba: '#a8a052', hierbaS: '#7e7a3a', hierbaL: '#ccc276',
  moral: '#3e6c32', moralS: '#2a4c24', moralL: '#5e8e42', moralLL: '#7eaa52', tronco: '#5e4230', troncoS: '#3a2a1e',
  lona: '#b2a26e', lonaL: '#ccbc88', lonaS: '#8e7e52', lonaD: '#5e5232', dentro: '#2e2418', cuerda: '#e0d4b2',
  jeep: '#66784a', jeepL: '#86985e', jeepS: '#4a5834', jeepD: '#2e3620', rueda: '#26262a', ruedaL: '#46464e', llanta: '#8e9284',
  bidon: '#4a6a8a', bidonL: '#6e8eae', bidonS: '#2e4a66', oxido: '#8e5a36', garrafa: '#5a6a3e', garrafaL: '#7a8a56',
  radio: '#4e5a44', radioL: '#6e7a60', radioS: '#30382a', dial: '#ffcc66', dialS: '#b8782a',
  mapaP: '#efe4c6', mapaS: '#c8b48a', mapaL: '#9a7a52', oveja: '#eee8da', ovejaS: '#c4bcaa', pastor: '#6a4a3a',
  // la casa
  muro: '#d8c8a4', muroL: '#e8dcbc', muroS: '#bcaa84', muroD: '#9a8a66', junta: '#a8987a',
  viga: '#6a4a30', vigaS: '#4a3222', vigaL: '#8a6444', cana: '#b49866', canaS: '#957a4c',
  losa: '#aa9e8a', losaL: '#beb29c', losaS: '#8e826e', losaJ: '#6e6456',
  kilR: '#9a5a48', kilA: '#5a6078', kilC: '#c8b48c', kilN: '#7a4a3a',
  estante: '#80868e', estanteL: '#aab0b8', estanteS: '#565c64', caja: '#b88a58', cajaL: '#d2a874', cajaS: '#8e6640',
  azul: '#3a6aa8', azulL: '#5a8ac8', azulS: '#284a7a', papel: '#f2ead6', papelS: '#d4c8ae', lapiz: '#6a6a74',
  postigo: '#4a7e86', postigoL: '#6a9ea4', postigoS: '#30585e', marco: '#7a5a3c', marcoL: '#9a7a54',
  barro: '#b8643e', barroS: '#8a4428', geranio: '#e0403a', hojaV: '#4a8a3a',
  gato: '#c88a4a', gatoS: '#9a6430', gatoL: '#e8b070',
  mesa: '#a8784a', mesaL: '#c6945e', mesaS: '#805632', mesaD: '#4e3420',
  bandeja: '#eeece4', bandejaS: '#c6c2b4', bandejaD: '#a29e90', silex: '#6a6e7c', silexL: '#a4a8b6', silexS: '#4a4e5a',
  hueso: '#e6dab8', huesoS: '#bcac82', huesoD: '#8e7e58', te: '#b8381e', teL: '#e0683a', cristal: '#dcecf0',
  goma: '#2e2e32', gomaL: '#4e4e56', saco: '#c4a874', sacoS: '#9a8050',
  // el laboratorio
  pared: '#e4e7ea', paredS: '#cdd2d8', paredL: '#f4f6f8', panel: '#bcc2ca', techo: '#d6dade', techoS: '#b8bec6',
  tanque: '#4a9a8a', tanqueL: '#6ebcac', tanqueS: '#327264', tanqueD: '#1e4c44',
  iman: '#d8662a', imanL: '#f28c4c', imanS: '#a44a1c', cobre: '#c8843a', cobreS: '#8e5420', cobreL: '#e8a85a',
  gris: '#9ca3ad', grisL: '#c6ccd4', grisS: '#767e8a', grisD: '#4e5560',
  sueloLab: '#d2d6da', sueloLabS: '#bcc2c8', sueloLabJ: '#a8aeb6', sueloLabL: '#e6e9ec',
  haz: '#8a7aff', hazL: '#e0d8ff', ambar: '#ffb030', ambarS: '#7a5220', pantO: '#0c1820', curva: '#7ae0a0', curvaS: '#2e6a48',
  campana: '#e8ece8', vidrioL: '#cfe6f0', vidrioS: '#a8c8d8', horno: '#ff8a2a', hornoL: '#ffd27a', carbon: '#26222a',
});

// un fondo fijo que se pinta una vez por lienzo y por clave y luego se copia entero en cada fotograma
const d_CACHE = new WeakMap();

function d_fijo(R, clave, dibuja) {
  let m = d_CACHE.get(R); if (!m) d_CACHE.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// la máscara del cielo de un fondo fijo (1 donde el píxel es cielo: ahí pasan las nubes), guardada con su clave
const d_MASC = new WeakMap();

function d_mascara(R, clave, cols) {
  let m = d_MASC.get(R); if (!m) d_MASC.set(R, (m = new Map()));
  let k = m.get(clave); if (!k) { const set = new Set(cols), B = R.buf; k = new Uint8Array(320 * 180); for (let i = 0; i < k.length; i++) k[i] = set.has(B[i]) ? 1 : 0; m.set(clave, k); }
  return k;
}

// trama ordenada 4 × 4: el umbral de cada píxel (0–1)
const d_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const d_umbral = (x, y) => (d_BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// un degradado vertical tramado entre varios colores en el rectángulo [x0, x1] × [y0, y1] (respeta R.recorte)
function d_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), p = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, d_umbral(x, y) < p ? cols[i + 1] : cols[i]); }
}

// mezcla dos colores (k = 0: el primero; 1: el segundo)
function d_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// aclara u oscurece lo ya pintado dentro de un polígono convexo (luz de una ventana, de un flexo; una sombra); trama: la
// fracción de píxeles tocados (1: todos)
function d_tinte(R, pts, c, k, trama = 1) { R.poligono(pts, (x, y) => (trama >= 1 || d_umbral(x, y) < trama ? d_mezcla(R.pget(x, y), c, k) : R.pget(x, y))); }

// un disco que pinta con la función ps y solo hasta yMax (la base plana de las nubes)
function d_disco(ps, cx, cy, r, c, yMax = 999) { const r2 = r * r; for (let j = Math.floor(-r); j <= Math.ceil(r); j++) { if (cy + j > yMax) break; for (let i = Math.floor(-r); i <= Math.ceil(r); i++) if (i * i + j * j <= r2) ps(Math.round(cx + i), Math.round(cy + j), c); } }

// un cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba a la izquierda) con la base plana; ps pinta solo en el cielo
function d_nube(ps, cx, cy, w, sem, c) {
  const n = 3 + Math.round(w / 9), bolas = [], base = Math.round(cy + w * 0.1);
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.12 + 0.15 * Math.cos(u * Math.PI) + 0.06 * h(i, sem, 7)); bolas.push([cx + u * w * 0.86, cy - r * 0.35 + (h(i, sem, 8) - 0.5) * 2, r]); }
  for (const [x, y, r] of bolas) d_disco(ps, x, y + 1, r, c[0], base);
  for (const [x, y, r] of bolas) d_disco(ps, x, y - 0.5, r - 0.7, c[1], base - 2);
  for (const [x, y, r] of bolas) d_disco(ps, x - 1, y - 2, r * 0.55, c[2], base - 4);
}

// cifras de 3 × 5 para las etiquetas (solo dígitos)
const d_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function d_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = d_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// una etiqueta blanca con su número (x, y: arriba a la izquierda; ancho según las cifras), con sombra y un agujero
function d_etiqueta(R, x, y, n, tinta = C.k, fondo = DP.papel) {
  const w = String(n).length * 4 + 3;
  R.rect(x + 1, y + 1, x + w + 1, y + 8, d_mezcla(DP.papelS, C.k, 0.45)); R.rect(x, y, x + w, y + 7, fondo); R.rect(x, y + 7, x + w, y + 7, DP.papelS);
  d_cifras(R, n, x + 2, y + 1, tinta);
}

// un pájaro lejano que bate las alas
function d_pajaro(R, x, y, t, k, c) { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 11 + k * 1.7) > 0; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : -1), c); R.pset(x + 2, y - (a ? 2 : -1), c); }

// una persona pequeña de fondo (unos 8 px; c = [ropa, piel, pelo, pantalón]); anda: piernas que se alternan
function d_figura(R, x, y, t, c, anda = true, k = 0) {
  x = Math.round(x); y = Math.round(y); const p = anda ? Math.floor(t * 5 + k) % 2 : 0;
  R.rect(x - 1, y - 8, x, y - 7, c[1]); R.rect(x - 1, y - 8, x, y - 8, c[2]); R.rect(x - 1, y - 6, x + 1, y - 3, c[0]); R.pset(x + 1, y - 6, c[0]);
  R.pset(x - 1, y - 2, c[3] ?? C.k); R.pset(x + 1, y - 2, c[3] ?? C.k); R.pset(x - 1 - p, y - 1, c[3] ?? C.k); R.pset(x + 1 + p, y - 1, c[3] ?? C.k);
}

// el perfil del cerro (la «barriga»): y de la cima en cada x; la cima x 196, y 60, y la base en el horizonte (y 100)
const d_cerroY = (x) => 100 - 40 * Math.exp(-(((x - 196) / 58) ** 2)) - 3 * Math.exp(-(((x - 120) / 26) ** 2));

const d_sierraY = (x) => 84 + Math.round(4 * Math.sin(x * 0.031 + 0.6) + 3 * Math.sin(x * 0.077 + 2) + 1.5 * Math.sin(x * 0.19));

// el centro y el medio ancho del camino de tierra a la altura y (baja del cerro al primer término)
function d_camino(y) { const P = [[100, 186, 1], [118, 206, 4], [134, 232, 8], [150, 252, 12], [180, 266, 20]]; for (let i = 0; i < P.length - 1; i++) if (y <= P[i + 1][0]) { const u = (y - P[i][0]) / (P[i + 1][0] - P[i][0]); return [P[i][1] + (P[i + 1][1] - P[i][1]) * u, P[i][2] + (P[i + 1][2] - P[i][2]) * u]; } return [266, 20]; }

const d_TIENDA_CIELO = () => [DP.cA, DP.cB, DP.cC, DP.cD, DP.cE, DP.cF, DP.sol, DP.solH];

function d_tiendaFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, P = DP;
  // el cielo tramado, más pálido y cálido abajo (la calima del verano), y el sol con su halo tramado
  d_degradado(R, 0, 0, 319, 100, [P.cA, P.cB, P.cC, P.cD, P.cE, P.cF]);
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j); if (d < 14 && d >= 6 && d_umbral(240 + i, 40 + j) < (14 - d) / 10) pset(240 + i, 40 + j, P.solH); }
  disco(240, 40, 6, P.sol);
  // la sierra lejana, azulada, con las laderas de cara al sol más claras
  for (let x = 0; x < 320; x++) { const y0 = d_sierraY(x), luz = d_sierraY(x + 2) - d_sierraY(x - 2) > 0; for (let y = y0; y <= 100; y++) { const f = (y - y0) / 14; pset(x, y, y === y0 ? P.sierraL : luz && f < 0.5 ? P.sierraL : d_umbral(x, y) < f * 0.9 ? P.sierraS : P.sierra); } }
  // las lomas ocres de delante de la sierra
  for (let x = 0; x < 320; x++) { const y0 = 93 + Math.round(2.5 * Math.sin(x * 0.045 + 1.3) + 1.5 * Math.sin(x * 0.12)); for (let y = y0; y <= 101; y++) pset(x, y, y === y0 ? P.lomaL : h(x >> 1, y, 21) < 0.2 ? P.lomaS : d_umbral(x, y) < (y - y0) / 10 ? P.lomaS : P.loma); }
  // un pueblo de casas de tejado plano a lo lejos, con un minarete pequeño y unos álamos
  for (let k = 0; k < 9; k++) { const x = 14 + k * 7 + Math.round(h(k, 1, 22) * 3), w = 4 + Math.round(h(k, 2, 22) * 3), hh = 3 + Math.round(h(k, 3, 22) * 2); rect(x, 98 - hh, x + w, 98, P.lomaL); rect(x + w, 98 - hh, x + w, 98, P.lomaS); rect(x, 98 - hh, x + w, 98 - hh, P.muroL); pset(x + 1, 97 - Math.floor(hh / 2), P.dentro); }
  rect(50, 88, 50, 95, P.muroL); pset(50, 87, P.lomaS); for (const x of [10, 74, 80]) { rect(x, 90, x + 1, 98, P.moralS); pset(x, 89, P.moral); rect(x, 92, x, 96, P.moral); }
  // los campos: bandas de arado (surcos), rastrojo (tramado de pajas) y estepa, con muretes de piedra seca
  const bandas = [[100, 104, 'r'], [104, 108, 'a'], [108, 113, 'r'], [113, 119, 'e'], [119, 126, 'a'], [126, 134, 'r']];
  for (const [y0, y1, tipo] of bandas) for (let y = y0; y < y1; y++) for (let x = 0; x < 320; x++) {
    let c; const n = h(x >> 1, y, 23);
    if (tipo === 'a') c = (y - y0) % 2 === 0 ? (n < 0.3 ? P.aradoD : P.aradoS) : n < 0.15 ? P.aradoL : P.arado;
    else if (tipo === 'r') c = (x + y * 2) % 4 === 0 && n < 0.6 ? P.rastrojoS : n > 0.92 ? P.rastrojoL : P.rastrojo;
    else c = n < 0.25 ? P.hierbaS : n > 0.85 ? P.hierbaL : P.hierba;
    pset(x, y, c);
  }
  // los muretes de piedra seca entre campos (piedras de caliza con su sombra) y unos majanos de piedras apartadas
  for (const [y, x0, x1] of [[108, 0, 150], [119, 140, 319], [126, 0, 110]]) for (let x = x0; x < x1; x += 3) { const c = h(x, y, 24) < 0.5 ? C.caliza : C.calizaS; rect(x, y - 2, x + 2, y, c); pset(x, y - 2, C.calizaL); pset(x + 2, y, C.calizaD); }
  for (const [x, y, n] of [[34, 116, 5], [160, 110, 4], [292, 125, 5]]) for (let k = 0; k < n; k++) { const px = x + (k % 3) * 3 - (k > 2 ? -1 : 0), py = y - (k > 2 ? 2 : 0); rect(px, py, px + 2, py + 1, C.caliza); pset(px, py, C.calizaL); pset(px + 2, py + 1, C.calizaD); }
  // el cerro de tierra arada: surcos que siguen la curva, la ladera de cara al sol más clara, hierba seca en lo alto
  for (let x = 92; x < 310; x++) {
    const yt = d_cerroY(x); if (yt > 99.5) continue; const pend = d_cerroY(x + 2) - d_cerroY(x - 2);
    for (let y = Math.round(yt); y <= 101; y++) {
      const dd = y - yt, surco = Math.floor((dd * 1.3 + h(x >> 3, 0, 25) * 1.5)) % 2 === 0, n = h(x, y, 26);
      const ti = Math.max(0, Math.min(2, Math.round(1 + pend * 0.7 + (d_umbral(x, y) - 0.5) * 0.9 - (surco ? 0.8 : 0) - Math.max(0, (y - 92) / 12))));
      let c = [P.aradoS, P.arado, P.aradoL][ti]; if (surco && ti === 0) c = P.aradoD;
      if (dd < 2.5 && n < 0.6) c = n < 0.3 ? P.rastrojoS : P.rastrojo;
      if (n > 0.988) c = C.calizaL;
      pset(x, y, c);
    }
  }
  // la sombra del moral sobre la ladera y el moral: tronco nudoso, ramas y la copa en tres verdes con la luz a la derecha
  d_tinte(R, [[176, 62], [196, 60], [194, 64], [172, 66]], P.aradoD, 0.5);
  linea(198, 61, 197, 52, P.tronco); linea(199, 61, 199, 50, P.troncoS); linea(197, 52, 192, 46, P.tronco); linea(199, 52, 205, 45, P.tronco); rect(197, 59, 200, 61, P.troncoS);
  for (const [x, y, r, c] of [[190, 44, 7, P.moralS], [206, 43, 7, P.moralS], [198, 38, 9, P.moralS], [189, 41, 6, P.moral], [205, 40, 6, P.moral], [198, 35, 8, P.moral], [202, 34, 5, P.moralL], [208, 39, 3, P.moralL], [195, 31, 3, P.moralL], [204, 31, 2, P.moralLL]]) disco(x, y, r, c);
  for (let k = 0; k < 40; k++) { const x = 184 + Math.round(h(k, 1, 27) * 28), y = 30 + Math.round(h(k, 2, 27) * 20), p = R.pget(x, y); if (p === P.moral || p === P.moralS) pset(x, y, h(k, 3, 27) < 0.5 ? P.moralL : P.moralS); }
  // las losas de caliza rotas que asoman entre la tierra arada (con su sombra), y alguna apartada en el borde
  for (let k = 0; k < 11; k++) { const x = 156 + k * 8 + Math.round(h(k, 1, 28) * 4), y = Math.round(d_cerroY(x) + 3 + h(k, 2, 28) * 7), w = 3 + Math.round(h(k, 3, 28) * 3);
    if (y > 98) continue; rect(x, y, x + w, y + 1, C.caliza); rect(x, y, x + w - 1, y, C.calizaL); rect(x + 1, y + 2, x + w + 1, y + 2, P.aradoD); pset(x + w, y + 1, C.calizaS); }
  // la tierra del primer término: polvo, guijarros, grietas, tramado más oscuro hacia abajo
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) {
    const n = h(x >> 1, y >> 1, 29), m = h(x, y, 30);
    let c = n < 0.18 ? P.sueloS : n > 0.88 ? P.sueloL : P.suelo; if (y > 160 && d_umbral(x, y) < (y - 160) / 40) c = c === P.sueloL ? P.suelo : P.sueloS; if (m < 0.012) c = P.sueloD;
    pset(x, y, c);
  }
  for (let k = 0; k < 14; k++) { let x = Math.round(h(k, 1, 31) * 300), y = 140 + Math.round(h(k, 2, 31) * 38); for (let i = 0; i < 6; i++) { const nx = x + (h(k, i, 32) < 0.5 ? 1 : 2), ny = y + (h(k, i, 33) < 0.5 ? 0 : 1); linea(x, y, nx, ny, P.sueloD); x = nx; y = ny; } }
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 4, 34) * 319), y = 136 + Math.round(h(k, 5, 34) * 43); rect(x, y, x + 1, y, C.calizaS); pset(x, y, C.calizaL); pset(x + 1, y + 1, P.sueloD); }
  // el camino de tierra con sus rodadas y su borde, desde el cerro hasta el primer término
  for (let y = 100; y < 180; y++) { const [cx, w] = d_camino(y); for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) { const u = Math.abs(x - cx) / Math.max(1, w); let c = u > 0.85 ? P.caminoS : h(x, y, 35) < 0.1 ? P.caminoS : h(x, y, 36) > 0.93 ? P.caminoL : P.camino; if (w > 4 && Math.abs(u - 0.5) < 0.09) c = P.caminoS; pset(x, y, c); } }
  // las rodadas del jeep en el polvo, que vienen del camino
  for (const dy of [0, 7]) for (let x = 150; x < 236; x++) { const y = Math.round(160 + dy + (x - 236) * -0.12 + Math.sin(x * 0.05) * 1.5); if (h(x, dy, 51) < 0.8) { pset(x, y, P.sueloS); if (x % 3 === 0) pset(x, y + 1, P.sueloD); } }
  // el jalón de topógrafo clavado, a franjas rojas y blancas
  for (let y = 112; y < 152; y++) pset(204, y, Math.floor((y - 112) / 5) % 2 ? C.blanco : C.rojo); for (let y = 112; y < 152; y++) pset(205, y, Math.floor((y - 112) / 5) % 2 ? hex('#c8c0b0') : C.rojoS); rect(203, 151, 206, 152, P.sueloD);
  // las sombras (el sol está alto a la derecha: caen a la izquierda): de la tienda, del jeep, de los bidones y de la mesa
  d_tinte(R, [[2, 146], [38, 150], [44, 154], [0, 154]], P.sueloD, 0.45);
  d_tinte(R, [[214, 149], [308, 149], [304, 155], [210, 155]], P.sueloD, 0.5);
  d_tinte(R, [[112, 150], [174, 150], [170, 153], [108, 153]], P.sueloD, 0.35);
  // LA TIENDA: el faldón de la izquierda (de lado, a la sombra), la cara de delante al sol con la puerta abierta
  const A = [64, 98], A2 = [26, 93], BL = [38, 150], BR = [92, 150], BL2 = [2, 146];
  poligono([A, A2, BL2, BL], (x, y) => { const f = (y - 93) / 57; return (x * 2 + y) % 5 === 0 ? P.lonaS : d_umbral(x, y) < f * 0.5 + (x < 20 ? 0.2 : 0) ? P.lonaS : P.lona; });
  for (const u of [0.33, 0.66]) linea(A[0] + (A2[0] - A[0]) * u, A[1] + (A2[1] - A[1]) * u, BL[0] + (BL2[0] - BL[0]) * u, BL[1] + (BL2[1] - BL[1]) * u, P.lonaD);
  poligono([[BL2[0], BL2[1] - 4], [BL[0], BL[1] - 4], BL, BL2], P.lonaD);
  poligono([A, BL, BR], (x, y) => ((x + y * 3) % 7 === 0 ? P.lona : (y - 98) < 6 && d_umbral(x, y) < 0.5 ? P.cuerda : P.lonaL));
  poligono([[64, 108], [54, 150], [74, 150]], (x, y) => (y > 141 ? P.lonaD : P.dentro));
  for (let j = -9; j <= 9; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i, j); if (d < 9 && d_umbral(64 + i, 133 + j) < (9 - d) / 12) { const x = 64 + i, y = 133 + j; if (R.pget(x, y) === P.dentro) pset(x, y, hex('#5a4024')); } }
  rect(62, 130, 66, 136, C.k); rect(63, 131, 65, 135, hex('#ffd27a')); pset(64, 129, C.k); rect(57, 142, 72, 143, hex('#6a5a3a')); rect(57, 144, 58, 147, hex('#4a3a24'));
  poligono([[64, 108], [54, 150], [47, 150]], P.lonaS); poligono([[64, 108], [74, 150], [82, 150]], P.lonaS);
  for (const [x, y] of [[52, 128], [76, 128]]) { rect(x - 1, y, x + 1, y + 1, P.cuerda); pset(x, y + 2, P.lonaD); }
  linea(A[0], A[1], BL[0], BL[1], P.lonaD); linea(A[0], A[1], BR[0], BR[1], P.lonaD); linea(A[0], A[1], A2[0], A2[1], P.lonaD); linea(A2[0], A2[1], BL2[0], BL2[1], P.lonaD);
  rect(63, 90, 64, 98, C.maderaS); pset(63, 90, C.maderaL);
  // los vientos con sus piquetas
  linea(64, 98, 108, 151, P.cuerda); linea(26, 93, 0, 116, P.cuerda); linea(46, 120, 8, 152, P.cuerda); linea(16, 120, 0, 132, P.cuerda);
  for (const [x, y] of [[108, 151], [8, 152], [92, 151], [38, 151]]) { rect(x, y - 2, x, y, C.maderaS); pset(x, y - 3, C.maderaL); }
  // una garrafa de agua y una esterilla enrollada junto a la tienda
  rect(84, 142, 90, 150, C.k); rect(85, 143, 89, 149, P.garrafa); rect(85, 143, 85, 149, P.garrafaL); rect(86, 141, 88, 142, C.k);
  rect(26, 146, 38, 150, C.k); rect(27, 147, 37, 149, hex('#8a4a3a')); for (let x = 29; x < 37; x += 3) pset(x, 148, hex('#c8a060'));
  // el hornillo sobre una caja de madera; la cafetera de campaña
  rect(98, 142, 112, 150, C.k); rect(99, 143, 111, 149, C.madera); rect(99, 143, 111, 143, C.maderaL); rect(99, 146, 111, 146, C.maderaS); pset(101, 145, C.maderaD); pset(109, 148, C.maderaD);
  rect(100, 138, 110, 142, C.k); rect(101, 139, 109, 141, C.metal); rect(101, 139, 109, 139, C.metalL); rect(102, 136, 103, 138, C.k); rect(107, 136, 108, 138, C.k);
  rect(101, 127, 109, 137, C.k); rect(102, 128, 108, 136, C.metalL); rect(107, 128, 108, 136, C.metal); rect(102, 128, 102, 136, C.blanco); rect(102, 131, 108, 131, C.metalS);
  rect(103, 125, 107, 127, C.k); rect(104, 125, 106, 126, hex('#c8e8f0')); pset(105, 124, C.k);
  linea(110, 130, 112, 128, C.k); pset(112, 127, C.k); rect(99, 129, 100, 134, C.k);
  // LA MESA PLEGABLE: tablero visto un poco desde arriba, el mapa extendido que cuelga por delante, patas en X
  poligono([[120, 133], [170, 133], [173, 137], [117, 137]], C.maderaL); rect(120, 133, 170, 133, hex('#d8a868'));
  poligono([[124, 133], [150, 133], [151, 137], [123, 137]], P.mapaP); rect(117, 137, 173, 139, C.k); rect(118, 138, 172, 138, C.madera);
  rect(124, 137, 150, 146, C.k); rect(125, 137, 149, 145, P.mapaP); rect(125, 145, 149, 145, P.mapaS);
  for (const [cx, cy, r] of [[134, 141, 5], [134, 141, 3], [143, 140, 2]]) for (let a = 0; a < 6.3; a += 0.25) pset(Math.round(cx + Math.cos(a) * r * 1.4), Math.round(cy + Math.sin(a) * r * 0.7), P.mapaL);
  linea(125, 143, 149, 139, hex('#6a8ac0')); disco(134, 141, 1, C.rojo); for (let x = 125; x < 150; x += 6) pset(x, 137, P.mapaS);
  for (const x0 of [121, 157]) { linea(x0, 140, x0 + 12, 150, C.metalD); linea(x0 + 12, 140, x0, 150, C.metalD); linea(x0 + 1, 140, x0 + 13, 150, C.metalS); }
  // la brújula, el cuaderno con su lápiz y una piedra de muestra sobre el mapa
  rect(138, 134, 143, 136, C.k); rect(139, 134, 142, 135, hex('#e8e8e0')); pset(140, 134, C.rojo);
  rect(126, 134, 132, 136, hex('#3a4a6a')); rect(127, 134, 131, 134, hex('#e8e0c8')); linea(131, 133, 135, 133, C.amarillo);
  rect(146, 133, 149, 134, C.silex); pset(146, 133, C.silexL);
  // LA RADIO DE VÁLVULAS (caja verde militar con asa, rejilla, dial y dos mandos)
  rect(152, 121, 168, 133, C.k); rect(153, 122, 167, 132, P.radio); rect(153, 122, 167, 122, P.radioL); rect(166, 123, 167, 132, P.radioS);
  rect(156, 118, 164, 119, C.k); rect(156, 119, 156, 121, C.k); rect(164, 119, 164, 121, C.k);
  for (let y = 128; y < 132; y += 2) for (let x = 155; x < 162; x += 2) pset(x, y, P.radioS);
  rect(155, 124, 163, 126, C.k); disco(164, 129, 1, C.metalL); pset(165, 129, C.k); rect(166, 120, 166, 121, C.metalD);
  // LA CAJA DE HALLAZGOS: madera con vetas, sílex dentro y su etiqueta numerada
  rect(176, 139, 196, 150, C.k); rect(177, 140, 195, 149, C.madera); rect(177, 140, 195, 141, P.dentro);
  for (let k = 0; k < 7; k++) { const x = 178 + k * 2 + Math.round(h(k, 1, 37) * 2), y = 139 + Math.round(h(k, 2, 37)); rect(x, y, x + 1, y, k % 2 ? C.silexL : C.silex); }
  for (const y of [144, 147]) rect(177, y, 195, y, C.maderaS); pset(181, 145, C.maderaD); pset(191, 148, C.maderaD); d_etiqueta(R, 182, 142, 14);
  // LAS GARRAFAS junto al jeep
  for (const [x, c, cL] of [[208, P.garrafa, P.garrafaL], [214, C.rojoS, C.rojo]]) { rect(x, 138, x + 6, 150, C.k); rect(x + 1, 139, x + 5, 149, c); rect(x + 1, 139, x + 1, 149, cL); linea(x + 1, 140, x + 5, 148, cL); linea(x + 5, 140, x + 1, 148, cL); rect(x + 2, 136, x + 4, 138, C.k); }
  // EL JEEP DE LOS SESENTA (de perfil, mirando a la derecha): la caja de atrás, el capó, el parabrisas, la rueda de
  // repuesto, pico y pala en el costado, el polvo en las aletas
  rect(226, 124, 306, 144, C.k);
  rect(227, 125, 262, 143, P.jeep); rect(227, 125, 262, 126, P.jeepL); rect(227, 132, 262, 132, P.jeepS); rect(262, 125, 262, 143, P.jeepS);
  poligono([[263, 127], [302, 128], [305, 130], [305, 143], [263, 143]], P.jeep); rect(263, 127, 302, 128, P.jeepL); rect(263, 135, 305, 135, P.jeepS);
  for (let x = 300; x <= 305; x++) for (let y = 130; y < 143; y += 2) pset(x, y, x % 2 ? P.jeepD : P.jeepS);
  disco(301, 129, 2, C.k); disco(301, 129, 1, hex('#fff4c8'));
  for (let x = 266; x < 298; x += 5) pset(x, 131, P.jeepS);
  for (let y = 136; y < 143; y++) for (let x = 227; x < 305; x++) if (d_umbral(x, y) < (y - 136) / 12) pset(x, y, d_mezcla(R.pget(x, y), P.suelo, 0.35));
  poligono([[262, 126], [265, 107], [269, 107], [267, 126]], C.k); poligono([[263, 125], [266, 109], [268, 109], [266, 125]], hex('#a8d0e8')); linea(265, 123, 267, 111, C.blanco);
  rect(250, 115, 253, 124, C.k); linea(252, 116, 258, 113, C.k); disco(258, 117, 2, C.k);
  rect(236, 117, 248, 124, C.k); rect(237, 118, 247, 123, hex('#5a4a3a')); rect(237, 118, 247, 118, hex('#7a6a52'));
  rect(229, 119, 244, 124, C.k); rect(230, 120, 243, 123, P.lonaS); rect(230, 120, 243, 120, P.lona);
  linea(232, 129, 258, 129, C.maderaL); linea(232, 130, 258, 130, C.madera); rect(256, 128, 261, 131, C.metalS); linea(234, 127, 254, 127, C.metalD);
  for (const xr of [240, 290]) { rect(xr - 9, 135, xr + 9, 138, P.jeepD); disco(xr, 145, 7, C.k); disco(xr, 145, 6, P.rueda); disco(xr, 145, 3, P.llanta); disco(xr, 145, 1, P.ruedaL); for (let a = 0; a < 6.28; a += 0.5) pset(Math.round(xr + Math.cos(a) * 5), Math.round(145 + Math.sin(a) * 5), P.ruedaL); pset(xr - 2, 143, C.blanco); }
  disco(223, 130, 7, C.k); disco(223, 130, 6, P.rueda); disco(223, 130, 3, P.llanta); disco(223, 130, 1, C.k); rect(221, 121, 222, 139, P.ruedaL);
  // los bidones de aceite junto al morro (oxidados, con sus aros y brillo)
  for (const [x0, c, cL, cS] of [[306, P.bidonS, P.bidonL, P.bidon], [296, P.bidon, P.bidonL, P.bidonS]]) {
    rect(x0, 127, x0 + 13, 151, C.k); rect(x0 + 1, 128, x0 + 12, 150, c); rect(x0 + 3, 129, x0 + 4, 149, cL); rect(x0 + 10, 129, x0 + 12, 149, cS);
    for (const y of [135, 143]) rect(x0 + 1, y, x0 + 12, y, cS); rect(x0 + 1, 127, x0 + 12, 128, cL);
    for (let k = 0; k < 6; k++) pset(x0 + 2 + Math.round(h(k, x0, 38) * 9), 130 + Math.round(h(k, x0, 39) * 18), P.oxido);
  }
}

// la vida de la tienda: nubes a tres velocidades (solo en el cielo), pájaros, el rebaño y el pastor, un remolino de polvo,
// el banderín, la toalla, el humo de la cafetera, la llama, el dial de la radio y la antena, la hierba al viento
function d_tiendaVida(R, t) {
  const P = DP, m = d_mascara(R, 'tienda', d_TIENDA_CIELO()), B = R.buf;
  const ps = (x, y, c) => { if (x >= 0 && x < 320 && y >= 0 && y < 180 && m[y * 320 + x]) B[y * 320 + x] = c; };
  for (let k = 0; k < 4; k++) d_nube(ps, ((k * 97 + 20 + t * 1.1) % 380) - 30, 74 - (k % 2) * 3, 16 + k * 3, k + 1, [P.lejS, P.lej, P.lejL]);
  for (let k = 0; k < 3; k++) d_nube(ps, ((k * 131 + 60 + t * 2.4) % 400) - 40, 56 + (k % 2) * 6, 26 + k * 4, k + 5, [P.nubS, P.nub, P.nubL]);
  for (let k = 0; k < 2; k++) d_nube(ps, ((k * 200 + 10 + t * 4.2) % 440) - 60, 34 + k * 8, 40 + k * 6, k + 9, [P.nubS, P.nub, P.nubL]);
  for (let k = 0; k < 3; k++) { const u = ((t + k * 4.3) / 16) % 1; d_pajaro(R, -10 + u * 340, 62 + k * 5 + Math.sin(t * 1.3 + k) * 2, t, k, hex('#3a3a48')); }
  { const a = t * 0.5, x = Math.round(78 + Math.cos(a) * 24), y = Math.round(48 + Math.sin(a) * 6), c = hex('#4a3a34'); R.rect(x - 1, y, x + 1, y, c); R.linea(x - 5, y - 1 - (Math.sin(t * 2) > 0.8 ? 1 : 0), x - 1, y, c); R.linea(x + 1, y, x + 5, y - 1 - (Math.sin(t * 2) > 0.8 ? 1 : 0), c); R.pset(x + (Math.sin(a) > 0 ? -2 : 2), y + 1, c); }
  // el rebaño en la ladera de la izquierda: ovejas que pastan (bajan la cabeza), el pastor con su cayado y el perro
  for (let k = 0; k < 8; k++) { const x = Math.round(122 + k * 4 + Math.sin(t * 0.25 + k * 1.3) * 2 + (k % 3)), y = Math.round(d_cerroY(x) + 3 + (k % 3) * 2), baja = Math.sin(t * 1.1 + k * 2) > 0.3;
    R.rect(x, y, x + 2, y + 1, P.oveja); R.rect(x, y + 1, x + 2, y + 1, P.ovejaS); R.pset(x + 3, y + (baja ? 1 : 0), C.k); R.pset(x, y + 2, C.k); R.pset(x + 2, y + 2, C.k); }
  { const x = Math.round(114 + Math.sin(t * 0.2) * 2), y = Math.round(d_cerroY(114) + 9); d_figura(R, x, y, t, [P.pastor, hex('#c89068'), C.k, hex('#4a3a2a')], false); R.linea(x + 2, y - 9, x + 2, y - 1, C.maderaS); R.pset(x + 3, y - 9, C.maderaS); }
  { const x = Math.round(150 + Math.sin(t * 0.7) * 12), y = Math.round(d_cerroY(150) + 9); R.rect(x, y, x + 2, y, hex('#3a2a22')); R.pset(x + (Math.cos(t * 0.7) > 0 ? 3 : -1), y - 1, hex('#3a2a22')); R.pset(x + Math.floor(t * 6) % 2, y + 1, hex('#3a2a22')); R.pset(x + 2 - Math.floor(t * 6) % 2, y + 1, hex('#3a2a22')); }
  // un remolino de polvo que cruza los campos de vez en cuando
  { const u = (t / 9) % 1, x0 = 20 + u * 140; if (u < 0.7) for (let k = 0; k < 18; k++) { const a = t * 7 + k, y = 128 - k * 1.2, r = 1 + k * 0.25; R.pset(Math.round(x0 + Math.cos(a) * r + k * 0.2), Math.round(y), k % 3 ? P.caminoL : P.sueloL); } }
  // el banderín en lo alto del mástil de la tienda y la toalla colgada del viento, que ondean
  { const f = Math.sin(t * 6), g = Math.sin(t * 6 + 1.2); R.poligono([[65, 89], [72, 89 + Math.round(f)], [77, 91 + Math.round(g)], [65, 94]], C.naranja); R.linea(65, 89, 72, 89 + Math.round(f), C.amarillo); R.pset(77, 91 + Math.round(g), C.naranjaS); }
  { const x0 = 84, y0 = 129, ond = (i) => Math.round(Math.sin(t * 4 + i * 0.7) * 1); for (let i = 0; i < 6; i++) { const yy = y0 + Math.round(i * 0.9); R.rect(x0 + i + ond(i), yy, x0 + i + ond(i), yy + 7, i % 2 ? hex('#e8e0d0') : hex('#d04a3a')); } }
  // la llama azul del hornillo y el vapor de la cafetera (se lo lleva el viento a la derecha)
  for (let i = 0; i < 4; i++) R.pset(103 + i * 1.5, 137 - (Math.floor(t * 12 + i) % 2), i % 2 ? hex('#5a8aff') : hex('#ffb040'));
  for (let k = 0; k < 9; k++) { const u = (t * 0.7 + k / 9) % 1, x = Math.round(105 + u * 9 + Math.sin(t * 2.5 + k) * 1.5 * u), y = Math.round(123 - u * 20); if (u > 0.75 && (k % 2)) continue; R.pset(x, y, u < 0.5 ? C.blanco : hex('#dfe6ea')); if (u < 0.4) R.pset(x + 1, y, hex('#eef2f4')); }
  // el dial de la radio que brilla (la aguja busca) y la antena que se mece
  { const b = 0.75 + 0.25 * Math.sin(t * 3) * Math.sin(t * 1.7), x = 156 + Math.round((Math.sin(t * 0.6) * 0.5 + 0.5) * 6); R.rect(156, 125, 162, 125, b > 0.8 ? P.dial : P.dialS); R.rect(156, 125, 162, 125, P.dial); R.pset(x, 125, C.rojo); R.pset(158, 125, b > 0.9 ? C.blanco : P.dial);
    const ax = 166 + Math.round(Math.sin(t * 2.1) * 2); R.linea(166, 120, ax + 3, 98, C.metalL); R.pset(ax + 3, 97, C.k); }
  // el perro del campamento, dormido a la sombra de la tienda: respira y mueve la cola
  { const r = Math.sin(t * 2.2) > 0 ? 1 : 0, c = Math.round(Math.sin(t * 7) * 1.5) * (Math.sin(t * 0.8) > 0.4 ? 1 : 0), x = 14, y = 152;
    R.rect(x, y - 4 - r, x + 9, y, C.k); R.rect(x + 1, y - 3 - r, x + 8, y - 1, hex('#b8844a')); R.rect(x + 1, y - 3 - r, x + 8, y - 3 - r, hex('#d8a46a')); R.rect(x + 7, y - 6, x + 12, y - 1, C.k); R.rect(x + 8, y - 5, x + 11, y - 2, hex('#b8844a')); R.pset(x + 8, y - 6, hex('#7a4a2a')); R.pset(x + 10, y - 3, C.k); R.pset(x + 12, y - 2, C.k);
    R.linea(x, y - 2, x - 4, y - 3 + c, C.k); R.linea(x, y - 1, x - 3, y - 2 + c, hex('#b8844a')); }
  // la hierba seca del primer término, que se mece con el viento
  for (let k = 0; k < 34; k++) {
    const x = Math.round(h(k, 1, 40) * 318), y = 153 + Math.round(h(k, 2, 40) * 25); if (x > 244 && x < 288 && y < 158) continue;
    const n = 3 + Math.round(h(k, 3, 40) * 2), w = Math.sin(t * 2.2 + x * 0.05) * 1.6;
    for (let i = 0; i < n; i++) { const hh = 3 + ((i * 7 + k) % 4), dx = i - (n >> 1); R.linea(x + dx, y, Math.round(x + dx * 1.6 + w), y - hh, i % 2 ? P.hierbaS : P.hierbaL); }
  }
}

// los cardos y las piedras de las esquinas de abajo (van por delante de los personajes)
function d_tiendaDelante(R, t) {
  const P = DP;
  for (const [x, y, s] of [[10, 178, 1], [306, 176, -1]]) {
    const w = Math.sin(t * 1.9 + x) * 1.5;
    R.rect(x - 9, y - 2, x + 9, y + 1, C.calizaS); R.rect(x - 8, y - 3, x + 4, y - 2, C.caliza); R.rect(x - 7, y - 3, x + 1, y - 3, C.calizaL);
    for (const [dx, hh] of [[-3, 16], [2, 20], [6, 13]]) {
      const tx = Math.round(x + dx * s + w), ty = y - hh; R.linea(x + dx * s, y - 2, tx, ty, P.hierbaS); R.linea(x + dx * s + 1, y - 2, tx + 1, ty, P.hierba);
      for (const k of [0.4, 0.7]) { const lx = Math.round(x + dx * s + (tx - x - dx * s) * k), ly = Math.round(y - 2 - hh * k); R.linea(lx, ly, lx - 3, ly - 2, P.hierbaS); R.linea(lx, ly, lx + 3, ly - 2, P.hierbaS); }
      R.disco(tx, ty - 1, 2, hex('#7a5aa8')); R.pset(tx - 1, ty - 2, hex('#a888d0')); R.rect(tx - 1, ty + 1, tx + 1, ty + 1, P.hierbaL);
    }
  }
}

function d_tienda(R, t, o) {
  d_fijo(R, 'tienda', () => d_tiendaFijo(R));
  d_tiendaVida(R, t);
  return { suelo: 150, mesa: [145, 133], cafetera: [105, 128], radio: [160, 121], caja: [186, 139], jeep: [264, 150] };
}

function d_casaFijo(R, anos) {
  const { rect, pset, linea, poligono, disco } = R, P = DP, cubierta = anos >= 2017, plana = anos >= 2006;
  // el muro de sillares de caliza: hiladas de 9 px a soga, juntas de mortero, cantos con luz arriba y sombra abajo
  for (let y = 14; y < 128; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor((y - 14) / 9), yy = (y - 14) % 9, off = (fila % 2) * 15 + ((fila * 7) % 11), bx = Math.floor((x + off) / 30), xx = (x + off) % 30;
    let c; if (yy === 8 || xx === 29) c = P.junta; else { const n = h(bx, fila, 11); c = n < 0.2 ? P.muroS : n > 0.82 ? P.muroL : P.muro; if (h(x, y, 12) < 0.07) c = P.muroS; if (h(x, y, 13) < 0.02) c = P.muroD; if (yy === 0 || xx === 0) c = P.muroL; if (yy === 7) c = P.muroS; }
    // la luz: más oscuro arriba y a la izquierda (la ventana está a la derecha), y la humedad abajo
    const sombra = Math.max(0, (30 - y) / 30) * 0.5 + Math.max(0, (120 - x) / 120) * 0.45 + Math.max(0, (y - 116) / 12) * 0.4;
    if (d_umbral(x, y) < sombra * 0.7) c = c === P.muroL ? P.muro : c === P.muro ? P.muroS : P.muroD;
    pset(x, y, c);
  }
  // el techo de vigas y cañizo (tranquilo: debajo de la barra del año)
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) { let c = ((x + (y % 2) * 2) % 4 === 0) ? P.canaS : P.cana; if (y < 2 || (y > 9 && y < 13)) c = y === 10 ? P.vigaL : h(x >> 2, y, 14) < 0.3 ? P.vigaS : P.viga; if (y === 13) c = P.vigaS; pset(x, y, c); }
  for (let x = 6; x < 320; x += 38) { rect(x, 10, x + 5, 13, P.vigaS); rect(x + 1, 10, x + 4, 10, P.viga); }
  rect(0, 14, 319, 14, P.muroD);
  // el suelo de losas en perspectiva (fuga en x 160, y 40) con juntas y desgaste
  const filas = [128, 132, 137, 143, 150, 158, 167, 180];
  for (let y = 128; y < 180; y++) { let f = 0; while (filas[f + 1] <= y) f++; const ky = 100 / (y - 40);
    for (let x = 0; x < 320; x++) { const X = (x - 160) * ky + f * 13, col = Math.floor(X / 24), col1 = Math.floor(((x - 1 - 160) * ky + f * 13) / 24);
      let c = h(col, f, 15) < 0.3 ? P.losaS : h(col, f, 15) > 0.8 ? P.losaL : P.losa; if (h(x, y, 16) < 0.06) c = P.losaS; if (h(x, y, 17) > 0.97) c = P.losaL;
      if (col !== col1 || y === filas[f]) c = P.losaJ; else if (y === filas[f] + 1) c = P.losaL;
      pset(x, y, c); } }
  rect(0, 127, 319, 127, P.muroD);
  // el kilim (rombos y franjas rojo, añil y crema, con flecos)
  poligono([[100, 131], [210, 131], [222, 146], [90, 146]], (x, y) => { const a = Math.abs(((x - 155) % 12 + 12) % 12 - 6) + Math.abs(((y - 131) % 8) - 4); const borde = y < 133 || y > 143; return borde ? (x % 4 < 2 ? P.kilA : P.kilC) : a < 3 ? P.kilC : a < 5 ? P.kilA : (y + x) % 9 === 0 ? P.kilN : P.kilR; });
  for (let x = 92; x < 220; x += 2) { pset(x, 147, P.kilC); }
  // LA ESTANTERÍA METÁLICA de la izquierda con cajas numeradas, cajas azules con piedras y planos enrollados
  rect(2, 24, 4, 127, P.estanteS); rect(64, 24, 66, 127, P.estanteS); rect(3, 24, 3, 127, P.estanteL); rect(65, 24, 65, 127, P.estanteL);
  for (let y = 26; y < 127; y += 3) { pset(3, y, C.k); pset(65, y, C.k); }
  const baldas = [24, 46, 68, 90, 112];
  for (let b = 0; b < baldas.length; b++) {
    const yb = baldas[b], ys = b < baldas.length - 1 ? baldas[b + 1] : 127;
    let x = 6; let k = 0;
    while (x < 60) {
      const w = 10 + Math.round(h(k, b, 41) * 7), hh = Math.min(ys - yb - 4, 12 + Math.round(h(k, b, 42) * 6)), x1 = Math.min(62, x + w), y1 = ys - 1, y0 = y1 - hh, tipo = h(k, b, 43);
      if (x1 - x < 6) break;
      if (tipo < 0.62) { rect(x, y0, x1, y1, C.k); rect(x + 1, y0 + 1, x1 - 1, y1 - 1, P.caja); rect(x + 1, y0 + 1, x1 - 1, y0 + 2, P.cajaL); rect(x1 - 2, y0 + 3, x1 - 1, y1 - 1, P.cajaS); rect(x + 1, y0 + 3, x1 - 1, y0 + 3, P.cajaS);
        d_etiqueta(R, x + 2, y0 + 5, String(10 + Math.floor(h(k, b, 44) * 89))); }
      else if (tipo < 0.85) { rect(x, y0 + 4, x1, y1, C.k); rect(x + 1, y0 + 5, x1 - 1, y1 - 1, P.azul); rect(x + 1, y0 + 5, x1 - 1, y0 + 5, P.azulL); rect(x + 3, y0 + 8, x1 - 3, y0 + 9, P.azulS);
        for (let i = 0; i < (x1 - x) / 3; i++) { const px = x + 2 + i * 3; rect(px, y0 + 2 + (i % 2), px + 2, y0 + 4, i % 2 ? C.caliza : C.basaltoL); pset(px, y0 + 2 + (i % 2), C.calizaL); } }
      else { for (let i = 0; i < 3; i++) { const yy = y1 - 2 - i * 3; rect(x, yy - 2, x1, yy, C.k); rect(x, yy - 1, x1 - 1, yy - 1, P.papel); pset(x1, yy - 1, P.papelS); } }
      x = x1 + 2; k++;
    }
    rect(2, ys, 66, ys + 1, C.k); rect(3, ys, 65, ys, P.estanteL); d_tinte(R, [[5, ys + 2], [63, ys + 2], [63, ys + 4], [5, ys + 4]], C.k, 0.25);
  }
  for (let i = 0; i < 2; i++) { rect(46 + i * 9, 18 + (i % 2), 54 + i * 9, 23, C.k); rect(47 + i * 9, 19 + (i % 2), 53 + i * 9, 22, P.papel); rect(53 + i * 9, 19 + (i % 2), 53 + i * 9, 22, P.papelS); }
  // LOS DIBUJOS clavados: el pilar en T con brazos, el zorro del relieve, la planta del recinto y una foto
  const hoja = (x0, y0, x1, y1, chin) => { rect(x0 + 1, y0 + 1, x1 + 1, y1 + 1, P.muroD); rect(x0, y0, x1, y1, P.papel); rect(x1, y0, x1, y1, P.papelS); rect(x0, y1, x1, y1, P.papelS); disco(Math.round((x0 + x1) / 2), y0 + 1, 1, chin); pset(Math.round((x0 + x1) / 2) - 1, y0, C.blanco); };
  hoja(76, 24, 97, 58, C.rojo);
  rect(81, 28, 93, 32, P.lapiz); rect(82, 29, 92, 31, P.papel); rect(84, 32, 90, 54, P.lapiz); rect(85, 33, 89, 53, P.papel);
  for (let y = 34; y < 53; y += 2) pset(89, y, P.papelS); linea(85, 37, 86, 44, P.lapiz); linea(89, 37, 88, 44, P.lapiz); linea(86, 44, 89, 45, P.lapiz); rect(85, 46, 89, 46, P.lapiz); for (let x = 85; x < 90; x += 2) pset(x, 47, P.lapiz);
  linea(78, 56, 95, 56, P.lapiz); d_cifras(R, '18', 92, 25, hex('#8a8a94'));
  hoja(100, 26, 121, 50, C.azulL);
  linea(104, 40, 116, 38, P.lapiz); linea(104, 41, 115, 41, P.lapiz); linea(116, 38, 119, 35, P.lapiz); pset(120, 35, P.lapiz); linea(104, 40, 101, 44, P.lapiz); for (const x of [106, 113]) linea(x, 41, x - 1, 46, P.lapiz); linea(118, 36, 118, 33, P.lapiz);
  for (let x = 103; x < 119; x += 3) pset(x, 47, P.papelS);
  hoja(124, 24, 142, 42, C.verdeL);
  for (let x = 126; x < 141; x += 4) linea(x, 26, x, 40, hex('#d8d0c0')); for (let y = 27; y < 41; y += 4) linea(125, y, 141, y, hex('#d8d0c0'));
  for (let a = 0; a < 6.3; a += 0.45) pset(Math.round(133 + Math.cos(a) * 6), Math.round(33 + Math.sin(a) * 5), P.lapiz); rect(132, 32, 132, 35, P.lapiz); rect(135, 32, 135, 35, P.lapiz);
  hoja(126, 45, 142, 60, C.amarillo); rect(128, 47, 140, 57, hex('#6a5a4a')); rect(128, 53, 140, 57, hex('#8a6a4a')); rect(133, 48, 135, 55, C.caliza); rect(131, 48, 137, 49, C.calizaL);
  // EL MAPA DE LA COLINA con curvas de nivel, la cuadrícula y los cuatro recintos (anillos de pilares)
  rect(147, 21, 191, 63, P.marco); rect(148, 22, 190, 62, P.mapaP); rect(148, 22, 190, 22, P.marcoL);
  for (let x = 152; x < 190; x += 6) for (let y = 23; y < 62; y += 2) pset(x, y, hex('#e0d4b0'));
  for (const r of [18, 14, 10]) for (let a = 0; a < 6.3; a += 0.12) pset(Math.round(169 + Math.cos(a) * r * 1.05 + Math.sin(a * 3) * 1.2), Math.round(42 + Math.sin(a) * r * 0.9), P.mapaL);
  for (const [cx, cy, r] of [[163, 37, 4], [174, 34, 4], [177, 45, 5], [164, 48, 5]]) { for (let a = 0; a < 6.3; a += 0.5) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), C.calizaD); rect(cx - 1, cy, cx - 1, cy + 1, C.k); rect(cx + 1, cy, cx + 1, cy + 1, C.k); }
  disco(164, 48, 1, C.rojo); pset(186, 26, C.k); linea(186, 26, 186, 29, C.k); pset(185, 28, C.k); pset(187, 28, C.k);
  // LA VENTANA: el hueco en el muro con su derrame, los postigos abiertos y el paisaje de fuera
  rect(198, 24, 252, 84, P.muroS); poligono([[198, 24], [203, 29], [203, 77], [198, 82]], P.muroL); poligono([[198, 82], [203, 77], [247, 77], [252, 82]], P.muroL);
  const W = [203, 29, 247, 77];
  d_degradado(R, W[0], W[1], W[2], 58, [P.cB, P.cC, P.cD, P.cE]);
  for (let x = W[0]; x <= W[2]; x++) { const y0 = 54 + Math.round(Math.sin(x * 0.2) * 1.5); for (let y = y0; y <= 66; y++) pset(x, y, y === y0 ? P.sierraL : P.sierra); }
  for (let x = W[0]; x <= W[2]; x++) { const y0 = Math.round(68 - 9 * Math.exp(-(((x - 222) / 15) ** 2))); for (let y = y0; y <= W[3]; y++) pset(x, y, y < y0 + 1 ? P.aradoL : h(x, y, 45) < 0.3 ? P.aradoS : y > 71 ? (h(x, y, 46) < 0.5 ? P.rastrojoS : P.rastrojo) : P.arado); }
  if (cubierta) {   // la gran membrana blanca sobre los recintos, con sus picos, su sombra debajo y los pies de acero
    for (let x = 205; x <= 241; x++) { const y = Math.round(59 - 4 * Math.abs(Math.sin((x - 205) * 0.175))), y1 = 63; rect(x, y, x, y1, C.cubierta); pset(x, y, C.blanco); rect(x, y1 - 1, x, y1, hex('#c8ccd4')); pset(x, y1 + 1, hex('#5a5048')); if ((x - 205) % 6 === 0) rect(x, y1 + 1, x, 67, C.metalS); }
    for (let x = 207; x < 241; x += 2) pset(x, 66, C.calizaS);
  } else { for (const x of [214, 224, 232]) { rect(x - 3, 61, x + 3, 63, P.aradoD); rect(x - 3, 61, x + 3, 61, C.calizaS); } linea(210, 57, 210, 64, C.metalL); linea(236, 57, 236, 64, C.metalL); linea(210, 57, 236, 57, C.metalL); linea(210, 60, 236, 60, C.metalL); }
  rect(241, 64, 242, 76, P.troncoS); disco(242, 62, 4, P.moralS); disco(243, 61, 3, P.moral);
  for (let x = W[0]; x <= W[2]; x += 3) { rect(x, 72, x + 1, 73, C.calizaS); pset(x, 72, C.calizaL); }
  // el marco de madera con el parteluz y el travesaño
  rect(201, 27, 249, 28, P.marco); rect(201, 77, 249, 78, P.marco); rect(201, 27, 202, 78, P.marco); rect(248, 27, 249, 78, P.marco); rect(224, 27, 226, 78, P.marco); rect(201, 51, 249, 52, P.marco);
  rect(201, 27, 249, 27, P.marcoL); rect(225, 28, 225, 77, P.marcoL); rect(202, 51, 248, 51, P.marcoL);
  // los postigos abiertos (tablillas pintadas, desconchadas) y el alféizar de piedra con el geranio
  for (const [x0, x1, s] of [[190, 197, -1], [253, 262, 1]]) { rect(x0, 24, x1, 84, C.k); for (let x = x0 + 1; x < x1; x++) for (let y = 25; y < 84; y++) pset(x, y, (y - 25) % 4 === 0 ? P.postigoS : x === x0 + 1 ? P.postigoL : h(x, y, 47) < 0.08 ? P.muroL : P.postigo); rect(s < 0 ? x1 : x0, 34, s < 0 ? x1 : x0, 36, C.metalD); rect(s < 0 ? x1 : x0, 70, s < 0 ? x1 : x0, 72, C.metalD); }
  rect(194, 82, 258, 86, C.k); rect(195, 82, 257, 84, C.caliza); rect(195, 82, 257, 82, C.calizaL); rect(195, 85, 257, 85, C.calizaS);
  rect(238, 74, 248, 82, C.k); rect(239, 75, 247, 81, P.barro); rect(239, 75, 247, 75, hex('#d8845a')); rect(245, 76, 247, 81, P.barroS);
  for (const [x, y, r] of [[240, 70, 3], [245, 69, 3], [243, 66, 3]]) disco(x, y, r, P.hojaV); for (const [x, y] of [[240, 66], [245, 64], [243, 62], [248, 67]]) { disco(x, y, 1, P.geranio); pset(x, y - 1, hex('#ff8a7a')); }
  // EL HAZ DE SOL que entra por la ventana y cae en el suelo (y la luz en el muro de debajo)
  d_tinte(R, [[203, 86], [247, 86], [204, 146], [146, 146]], hex('#fff0c8'), 0.14, 0.55);
  d_tinte(R, [[172, 130], [226, 130], [206, 146], [148, 146]], hex('#fff0c8'), 0.3);
  // LA MESA DEL FONDO: tablero, faldón, patas; debajo cubos de goma, sacos con etiqueta y un tamiz apoyado
  rect(76, 99, 192, 103, C.k); rect(77, 99, 191, 101, P.mesa); rect(77, 99, 191, 99, P.mesaL); rect(77, 102, 191, 102, P.mesaS);
  for (const x of [78, 134, 188]) { rect(x, 104, x + 2, 127, C.k); rect(x + 1, 104, x + 1, 127, P.mesaS); }
  for (const x of [84, 96]) { poligono([[x, 115], [x + 10, 115], [x + 9, 127], [x + 1, 127]], P.goma); rect(x, 115, x + 10, 116, P.gomaL); pset(x + 2, 118, P.gomaL); linea(x + 1, 114, x + 9, 114, C.k); }
  for (const x of [108, 120]) { poligono([[x, 112], [x + 10, 112], [x + 11, 127], [x - 1, 127]], P.saco); rect(x + 1, 110, x + 9, 113, P.sacoS); for (let y = 114; y < 126; y += 2) pset(x + 2 + (y % 4), y, P.sacoS); d_etiqueta(R, x + 2, 117, x === 108 ? '7' : '9'); }
  for (let a = 0; a < 6.3; a += 0.1) { const x = Math.round(158 + Math.cos(a) * 11), y = Math.round(117 + Math.sin(a) * 9); pset(x, y, C.maderaS); pset(x, y + 1, C.madera); }
  for (let y = 110; y < 125; y++) for (let x = 149; x < 168; x++) if (((x - 158) / 10) ** 2 + ((y - 117) / 8) ** 2 < 1 && (x + y) % 2 === 0) pset(x, y, C.metalS);
  // sobre la mesa: el flexo con su cono de luz, una bandeja de sílex, una caja con tapa, papeles, el bote de brochas
  linea(83, 98, 88, 86, C.k); linea(88, 86, 98, 80, C.k); linea(84, 98, 89, 86, C.metalD); rect(80, 97, 88, 98, C.k);
  poligono([[96, 77], [103, 75], [108, 81], [99, 83]], hex('#2e5a3a')); pset(97, 78, hex('#4a8a5a'));
  d_tinte(R, [[99, 83], [108, 81], [120, 98], [92, 98]], hex('#fff4c8'), 0.25, 0.6);
  rect(112, 95, 134, 98, C.k); rect(113, 95, 133, 97, P.bandeja); for (let i = 0; i < 6; i++) { rect(115 + i * 3, 95, 116 + i * 3, 96, i % 2 ? P.silexL : P.silex); }
  rect(140, 88, 158, 98, C.k); rect(141, 89, 157, 97, P.caja); rect(141, 89, 157, 90, P.cajaL); d_etiqueta(R, 144, 91, '205');
  for (let i = 0; i < 4; i++) rect(162 + i, 96 - i, 172 + i, 96 - i, i % 2 ? P.papelS : P.papel); rect(162, 97, 175, 98, P.papelS);
  rect(102, 90, 107, 98, C.k); rect(103, 91, 106, 97, hex('#c8d8e0')); for (const [x, c] of [[103, C.rojo], [105, C.amarillo]]) { linea(x, 90, x - 1, 85, C.maderaL); rect(x - 2, 83, x, 85, c); }
  // los dos tamices colgados de clavos a la derecha de la ventana
  for (const [cx, cy, r] of [[271, 60, 8], [272, 82, 7]]) { pset(cx, cy - r - 2, C.k); linea(cx, cy - r - 2, cx - 3, cy - r, C.maderaD); linea(cx, cy - r - 2, cx + 3, cy - r, C.maderaD);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.15); if (d > r) continue; pset(cx + i, cy + j, d > r - 1.5 ? (j < 0 ? C.maderaL : C.madera) : (i + j) % 2 === 0 ? C.metalS : P.muroS); } }
  // el reloj de pared
  disco(300, 58, 7, C.k); disco(300, 58, 6, C.madera); disco(300, 58, 5, P.papel); for (let k = 0; k < 12; k++) pset(Math.round(300 + Math.cos(k * 0.5236) * 4), Math.round(58 + Math.sin(k * 0.5236) * 4), P.lapiz);
  // EL ESCRITORIO con el ordenador (monitor de tubo o pantalla plana), el teclado, la torre y un archivador
  rect(268, 100, 319, 103, C.k); rect(269, 100, 319, 101, P.mesa); rect(269, 100, 319, 100, P.mesaL); for (const x of [270, 316]) rect(x, 104, x + 2, 127, C.k);
  if (plana) { rect(276, 70, 314, 94, C.k); rect(277, 71, 313, 93, hex('#26282e')); rect(293, 95, 297, 99, C.k); rect(288, 99, 302, 99, C.k); }
  else { rect(278, 72, 312, 99, C.k); rect(279, 73, 311, 98, hex('#d8d2c0')); rect(279, 73, 311, 73, C.blanco); rect(308, 74, 311, 98, hex('#b8b29e')); rect(282, 75, 304, 93, C.k); pset(306, 95, C.verdeL); }
  rect(282, 101, 302, 102, C.k); for (let x = 283; x < 302; x += 2) pset(x, 101, C.grisL);
  rect(276, 108, 288, 127, C.k); rect(277, 109, 287, 126, plana ? hex('#3a3c44') : hex('#d8d2c0')); rect(279, 111, 285, 112, C.k); pset(285, 123, C.verdeL);
  rect(294, 110, 314, 127, C.k); rect(295, 111, 313, 126, C.metalS); for (const y of [115, 121]) { rect(295, y, 313, y, C.k); rect(302, y - 3, 306, y - 2, C.metalL); }
  // sombras de los muebles en el suelo
  d_tinte(R, [[76, 127], [192, 127], [196, 131], [72, 131]], C.k, 0.22); d_tinte(R, [[2, 127], [66, 127], [68, 130], [0, 130]], C.k, 0.25); d_tinte(R, [[268, 127], [319, 127], [319, 130], [266, 130]], C.k, 0.22);
}

// la vida de la casa: nubes, pájaros y trabajadores al otro lado de la ventana, el gato que respira, el ventilador de
// techo, el ventilador de la mesa que gira la cabeza y levanta la esquina de un dibujo, el polvo en el haz de sol, la
// pantalla, el reloj y la salamanquesa
function d_casaVida(R, t, anos) {
  const P = DP, W = [203, 29, 247, 77];
  R.recorte([W[0], W[1], W[2], 54]);
  const ps = (x, y, c) => R.pset(x, y, c);
  for (let k = 0; k < 3; k++) d_nube(ps, W[0] - 20 + ((k * 31 + t * (1.5 + k)) % 80), 36 + k * 6, 14 + k * 3, k + 3, [P.nubS, P.nub, P.nubL]);
  { const u = (t / 9) % 1; d_pajaro(R, W[0] - 4 + u * 56, 42 + Math.sin(t * 1.5) * 2, t, 0, hex('#3a3a48')); }
  R.recorte([W[0], W[1], W[2], W[3]]);
  for (let k = 0; k < 3; k++) { const u = ((t * 0.05 + k / 3) % 1), x = 208 + Math.round(u * 32), y = 70 + (k % 2) * 3; R.pset(x, y - 2, hex('#e8e0d0')); R.pset(x, y - 1, k === 1 ? C.rojo : hex('#3a5a8a')); R.pset(x, y, hex('#3a3a48')); }
  R.recorte(null);
  // los reflejos del cristal
  for (const [x0, y0] of [[206, 48], [228, 74]]) for (let i = 0; i < 8; i++) R.pset(x0 + i, y0 - i, d_mezcla(R.pget(x0 + i, y0 - i), C.blanco, 0.35));
  // el gato que duerme en el alféizar: respira, y la cola se mueve de vez en cuando
  { const r = Math.sin(t * 2) > 0 ? 1 : 0, cola = Math.sin(t * 0.9) > 0.6 ? Math.round(Math.sin(t * 6) * 1.5) : 0;
    R.rect(208, 77 - r, 224, 81, C.k); R.rect(209, 78 - r, 223, 81, P.gato); R.rect(209, 78 - r, 223, 78 - r, P.gatoL); for (const x of [212, 216, 220]) R.pset(x, 79, P.gatoS);
    R.rect(204, 76, 210, 81, C.k); R.rect(205, 77, 209, 81, P.gato); R.pset(205, 75, C.k); R.pset(209, 75, C.k); R.pset(206, 79, C.k); R.pset(208, 79, C.k); R.pset(207, 80, hex('#e88a8a'));
    R.linea(224, 81, 230, 81 - cola, C.k); R.linea(224, 80, 229, 80 - cola, P.gatoS); }
  // el ventilador de techo: el tubo, el cubo y cuatro aspas que giran (vistas de canto)
  R.rect(231, 0, 233, 6, C.metalD); R.rect(228, 6, 236, 9, C.k); R.rect(229, 7, 235, 8, C.metal);
  for (let k = 0; k < 4; k++) { const a = t * 7 + k * Math.PI / 2, c = Math.cos(a), s = Math.sin(a); const x1 = Math.round(232 + c * 22), y1 = Math.round(9 + s * 3); R.linea(232, 9, x1, y1, s > 0 ? P.vigaL : P.vigaS); R.linea(232, 10, x1, y1 + 1, P.vigaS); }
  // el ventilador de la mesa del fondo: base, rejilla que gira de lado a lado, aspas borrosas
  { const g = Math.sin(t * 0.8), cx = 183 + Math.round(g * 1), w = Math.max(2, Math.round(6 * Math.abs(Math.cos(g * 0.9)))); R.rect(180, 96, 188, 98, C.k); R.rect(183, 89, 184, 96, C.metalD);
    for (let j = -6; j <= 6; j++) for (let i = -w; i <= w; i++) { if ((i / w) ** 2 + (j / 6) ** 2 > 1) continue; const e = (i / w) ** 2 + (j / 6) ** 2 > 0.7; R.pset(cx + i, 86 + j, e ? C.metalD : ((i + j + Math.floor(t * 20)) % 3 === 0 ? C.metalL : C.metal)); }
    R.disco(cx, 86, 1, C.k);
    // la esquina del dibujo del zorro se levanta cuando el ventilador apunta a la pared
    if (g < -0.3) { R.poligono([[119, 50], [121, 50], [121, 46]], P.papelS); R.pset(121, 50, P.muroS); } }
  // el polvo que flota en el haz de sol
  for (let k = 0; k < 16; k++) { const u = (t * 0.03 + h(k, 1, 48)) % 1, v = h(k, 2, 48), y = Math.round(90 + u * 54), x = Math.round(203 - (y - 86) * 0.95 + v * 40 + Math.sin(t * 0.7 + k) * 2); if (Math.floor(t * 2 + k) % 4) R.pset(x, y, hex('#fff6dc')); }
  // la pantalla: dibuja un pilar en T línea a línea; en el monitor de tubo, con sus líneas de barrido
  { const plana = anos >= 2006, [x0, y0, x1, y1] = plana ? [278, 72, 312, 92] : [283, 76, 303, 92];
    R.rect(x0, y0, x1, y1, plana ? hex('#1c3a5a') : hex('#14322a')); const tinta = plana ? hex('#9ad0f0') : hex('#7ae0a0'), cx = (x0 + x1) >> 1, u = (t * 0.25) % 1;
    const tramos = [[cx - 6, y0 + 3, cx + 6, y0 + 3], [cx + 6, y0 + 3, cx + 6, y0 + 6], [cx + 6, y0 + 6, cx + 3, y0 + 6], [cx + 3, y0 + 6, cx + 3, y1 - 2], [cx + 3, y1 - 2, cx - 3, y1 - 2], [cx - 3, y1 - 2, cx - 3, y0 + 6], [cx - 3, y0 + 6, cx - 6, y0 + 6], [cx - 6, y0 + 6, cx - 6, y0 + 3]];
    const n = Math.floor(u * 10); tramos.slice(0, n).forEach(([a, b, c, d]) => R.linea(a, b, c, d, tinta));
    for (let x = x0 + 2; x < x1; x += 5) R.pset(x, y1 - 1, plana ? hex('#3a6a9a') : hex('#2a5a3a'));
    if (!plana) for (let y = y0; y <= y1; y += 2) R.linea(x0, y, x1, y, (a) => d_mezcla(R.pget(a, y), C.k, 0.3));
    R.pset(x0 + 1 + Math.floor(t * 9) % (x1 - x0 - 2), y0 + 1, C.blanco); }
  // el reloj: el segundero da la vuelta, las agujas a las diez y diez
  R.linea(300, 58, 297, 56, C.k); R.linea(300, 58, 303, 55, C.k); { const a = t * 1.047 - Math.PI / 2; R.linea(300, 58, Math.round(300 + Math.cos(a) * 4), Math.round(58 + Math.sin(a) * 4), C.rojo); }
  // la salamanquesa que cruza el muro alto despacio (se para y sigue)
  { const u = (t * 0.035) % 1, x = Math.round(70 + u * 60 + (Math.sin(t * 1.3) > 0 ? 0 : 1)), y = 66 + Math.round(Math.sin(u * 6) * 2), p = Math.floor(t * 3) % 2;
    R.rect(x, y, x + 5, y, hex('#a89a7a')); R.pset(x + 6, y, hex('#a89a7a')); R.pset(x - 1, y + 1, hex('#a89a7a')); R.pset(x - 2, y + 1, hex('#a89a7a')); R.pset(x + 1, y - 1 - p, hex('#8a7a5a')); R.pset(x + 4, y + 1 + p, hex('#8a7a5a')); R.pset(x + 4, y - 1 - (1 - p), hex('#8a7a5a')); R.pset(x + 1, y + 1 + (1 - p), hex('#8a7a5a')); R.pset(x + 6, y, C.k); }
}

function d_casa(R, t, o) {
  const anos = o.anos ?? 2022, clave = 'casa' + (anos >= 2017 ? 'C' : '') + (anos >= 2006 ? 'P' : '');
  d_fijo(R, clave, () => d_casaFijo(R, anos));
  d_casaVida(R, t, anos);
  return { suelo: 150, mesaFondo: [134, 99], ordenador: [292, 86], ventana: [225, 52] };
}

// LA MESA DE DELANTE de la casa (va por delante de los personajes): tablero de madera visto desde arriba, bandejas con
// sus etiquetas, herramientas y el vaso de té; o.ordena 0–1 pasa cinco puntas del montón a la bandeja de sílex
function d_casaMesa(R, t, o) {
  const { rect, pset, linea, poligono, disco } = R, P = DP;
  // el tablero en perspectiva con sus tablas y vetas, el canto claro, el faldón y las patas
  poligono([[34, 146], [286, 146], [296, 162], [24, 162]], (x, y) => { const tabla = Math.floor((y - 146) / 4), v = h(x >> 3, tabla, 50); let c = (y - 146) % 4 === 3 ? P.mesaS : v < 0.25 ? P.mesaS : v > 0.85 ? P.mesaL : P.mesa; if (((x + tabla * 13) % 23) < 2 && (y - 146) % 4 === 1) c = P.mesaS; return c; });
  linea(34, 146, 286, 146, P.mesaS); rect(24, 162, 296, 163, P.mesaL); rect(24, 164, 296, 169, P.mesaS); rect(24, 169, 296, 169, P.mesaD); rect(22, 162, 22, 169, C.k); rect(298, 162, 298, 169, C.k); rect(23, 161, 297, 161, C.k);
  for (let x = 30; x < 296; x += 30) pset(x, 166, P.mesaD);
  for (const x of [30, 286]) { rect(x, 170, x + 5, 179, C.k); rect(x + 1, 170, x + 3, 179, P.mesaS); rect(x + 1, 170, x + 1, 179, P.mesa); }
  rect(36, 174, 284, 175, P.mesaD);
  // una bandeja: plástico blanco con su borde y su sombra
  const bandeja = (x0, y0, x1, y1) => { rect(x0 + 1, y1 + 1, x1 + 1, y1 + 1, P.mesaD); rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, P.bandeja); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, P.bandejaD); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, P.bandejaS); };
  // una punta de flecha de sílex (hoja con lascas: el filo claro y las facetas)
  const punta = (x, y, g = 0) => { x = Math.round(x); y = Math.round(y); const c = g % 3 === 1 ? [hex('#8a7a6a'), hex('#b8a894'), hex('#5e5246')] : [P.silex, P.silexL, P.silexS];
    poligono([[x, y - 4], [x + 3, y - 1], [x + 2, y + 2], [x, y + 3], [x - 2, y + 2], [x - 3, y - 1]], c[2]); poligono([[x, y - 3], [x + 2, y - 1], [x + 1, y + 1], [x, y + 2], [x - 1, y + 1], [x - 2, y - 1]], c[0]);
    pset(x - 1, y - 2, c[1]); pset(x - 2, y - 1, c[1]); pset(x, y - 3, c[1]); pset(x, y, c[1]); pset(x + 1, y - 1, c[2]); pset(x, y + 3, c[2]); pset(x, y + 4, c[2]); };
  // las tres bandejas con su etiqueta (número rojo sobre tarjeta blanca, bien grande para que se lea)
  bandeja(40, 148, 98, 159);
  const huecos = []; for (let f = 0; f < 2; f++) for (let c = 0; c < 5; c++) huecos.push([46 + c * 8 + f * 3, 152 + f * 4]);
  const u = Math.max(0, Math.min(1, o.ordena ?? 1)), nMov = 5, desde = [236, 152];
  let pieza = null;
  huecos.forEach(([x, y], i) => { const k = i - (huecos.length - nMov); if (k < 0) { punta(x, y + 1, i); return; } const a = k / nMov, b = (k + 1) / nMov; if (u >= b) punta(x, y + 1, i); else if (u > a) { const v = (u - a) / (b - a), px = desde[0] + (x - desde[0]) * v, py = desde[1] + (y + 1 - desde[1]) * v - Math.sin(v * Math.PI) * 10; punta(px, py, i); pieza = [Math.round(px), Math.round(py)]; } else { rect(x - 1, y, x + 1, y + 2, P.bandejaS); } });
  bandeja(104, 148, 152, 159);
  for (const [x, y, w] of [[112, 153, 7], [128, 152, 6], [142, 154, 5]]) { for (let j = -2; j <= 2; j++) for (let i = -w; i <= w; i++) if ((i / w) ** 2 + (j / 2.6) ** 2 <= 1) pset(x + i, y + j, j < -1 ? C.basaltoL : (i + j) % 5 === 0 ? hex('#4a4448') : C.basalto); pset(x - w + 2, y - 2, hex('#7a747a')); rect(x - w + 1, y + 3, x + w - 1, y + 3, P.bandejaS); }
  rect(120, 156, 124, 157, C.basaltoL); pset(120, 156, hex('#7a747a'));
  bandeja(158, 148, 214, 159);
  const hueso = (x0, y0, x1, y1) => { linea(x0, y0, x1, y1, P.huesoS); linea(x0, y0 - 1, x1, y1 - 1, P.hueso); disco(x0, y0, 1, P.hueso); disco(x1, y1, 1, P.hueso); pset(x0 - 1, y0 + 1, P.huesoD); pset(x1 + 1, y1 + 1, P.huesoD); };
  hueso(164, 152, 182, 151); hueso(166, 156, 180, 157); hueso(186, 155, 196, 152);
  for (let i = 0; i < 9; i++) { const x = 200 + Math.round(Math.sin(i * 0.35) * 4) + i, y = 157 - i; pset(x, y, P.huesoS); pset(x + 1, y, P.hueso); } pset(210, 148, P.huesoD);
  d_etiqueta(R, 82, 152, '117', C.rojo); d_etiqueta(R, 138, 147, '43', C.rojo); d_etiqueta(R, 200, 150, '27', C.rojo);
  // el montón de piezas sin ordenar, la paleta, la brocha, la lupa, la regla de escala, el cuaderno y el vaso de té
  for (let i = 0; i < Math.round((1 - u) * 5); i++) punta(229 + (i % 3) * 5, 151 + (i > 2 ? 4 : 0), i);
  for (let k = 0; k < 4; k++) { const x = 228 + k * 5, y = 157 + (k % 2); rect(x, y, x + 2, y, k % 2 ? C.calizaS : P.huesoS); }
  poligono([[220, 157], [228, 155], [230, 158], [222, 159]], C.metalL); linea(220, 157, 214, 159, C.maderaS); pset(229, 156, C.blanco);
  rect(246, 150, 256, 151, C.madera); rect(256, 149, 260, 152, hex('#3a3a3a')); for (let x = 256; x <= 260; x++) pset(x, 153, hex('#5a5a5a'));
  disco(268, 150, 4, C.k); disco(268, 150, 3, hex('#c8e8f8')); pset(267, 149, C.blanco); linea(271, 153, 276, 157, C.k);
  for (let i = 0; i < 6; i++) rect(240 + i * 4, 158, 243 + i * 4, 159, i % 2 ? C.blanco : C.k);
  rect(262, 156, 278, 160, C.k); rect(263, 156, 277, 159, P.papel); for (let y = 157; y < 160; y++) linea(265, y, 275, y, P.papelS); rect(270, 156, 270, 159, P.papelS);
  // el vaso de té turco (de tulipán) en su platillo, con el té rojo y el vapor
  rect(280, 156, 292, 157, C.k); rect(281, 156, 291, 156, C.blanco);
  poligono([[282, 146], [289, 146], [288, 150], [289, 155], [282, 155], [283, 150]], C.k); poligono([[283, 148], [288, 148], [287, 150], [288, 154], [283, 154], [284, 150]], P.te); rect(283, 147, 288, 147, P.cristal); pset(284, 149, P.teL); pset(284, 152, P.teL);
  for (let k = 0; k < 6; k++) { const v = (t * 0.6 + k / 6) % 1, x = Math.round(285 + Math.sin(t * 2 + k) * 1.5 * v), y = Math.round(144 - v * 14); if (v < 0.8) pset(x, y, v < 0.4 ? C.blanco : hex('#e4e8ea')); }
  return { pieza };
}

function d_labFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, P = DP;
  // la pared de paneles blancos con juntas, motas del vinilo y la guarda; el techo de placas con los plafones
  for (let y = 14; y < 141; y++) for (let x = 0; x < 320; x++) { let c = h(x, y, 60) < 0.05 ? P.paredS : P.pared; if (x % 40 === 0) c = P.panel; else if (x % 40 === 1) c = P.paredL; if (y < 24 && d_umbral(x, y) < (24 - y) / 20) c = P.paredS; pset(x, y, c); }
  rect(0, 96, 319, 98, P.panel); rect(0, 96, 319, 96, P.paredL);
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 32 === 8 || y === 6) ? P.techoS : P.techo);
  rect(0, 13, 319, 13, P.techoS); rect(0, 14, 319, 15, P.paredS);
  for (const [x0, x1] of [[184, 230], [238, 272]]) { rect(x0, 1, x1, 6, C.k); rect(x0 + 1, 2, x1 - 1, 5, C.blanco); for (let x = x0 + 5; x < x1; x += 5) rect(x, 2, x, 5, P.vidrioL); }
  // la bandeja de cables del techo con los cables que bajan a las máquinas
  rect(110, 18, 274, 21, C.k); rect(111, 19, 273, 20, P.grisL); for (let x = 114; x < 274; x += 6) pset(x, 21, P.grisS); rect(272, 17, 274, 22, P.grisD);
  for (const [x, c] of [[132, hex('#2a2e36')], [140, C.rojoS], [232, hex('#2a2e36')], [268, P.grisS]]) { linea(x, 22, x + 2, 34, c); linea(x + 2, 34, x + 1, 52, c); }
  // las grapas de los cables en la pared
  for (const x of [133, 141, 233, 269]) for (const y of [30, 44]) { pset(x + 1, y, P.grisD); pset(x + 2, y, P.grisD); }
  // LA VENTANA con la persiana a medio bajar: fuera, el cielo, árboles y un edificio del campus
  rect(64, 22, 106, 62, C.k); rect(65, 23, 105, 61, C.blanco);
  const W = [67, 25, 103, 59];
  d_degradado(R, W[0], W[1], W[2], W[3], [P.cB, P.cC, P.cD]);
  rect(80, 44, 103, 59, hex('#c8b8a0')); rect(80, 44, 103, 45, hex('#a89880')); for (let x = 83; x < 102; x += 5) for (const y of [48, 54]) rect(x, y, x + 2, y + 2, hex('#6a8aa8'));
  for (const [x, r] of [[72, 7], [94, 5]]) { rect(x, 50, x + 1, 59, P.tronco); disco(x, 47, r, P.moralS); disco(x - 1, 46, r - 2, P.moral); disco(x + 1, 44, 2, P.moralL); }
  rect(W[0], 58, W[2], 59, hex('#7a9a5a'));
  for (let y = W[1]; y < 34; y++) rect(W[0] - 1, y, W[2] + 1, y, y % 2 ? P.grisL : P.paredL); rect(W[0] - 1, 34, W[2] + 1, 35, P.grisS);
  rect(62, 62, 108, 64, C.k); rect(63, 62, 107, 63, P.paredL);
  // LA CAMPANA DE GASES: carcasa, ventilador, panel, el cristal de guillotina; dentro, la placa con el vaso y el horno
  rect(0, 28, 46, 140, C.k); rect(0, 29, 45, 44, P.campana); rect(0, 29, 45, 29, C.blanco); rect(0, 43, 45, 44, P.paredS);
  disco(10, 36, 6, C.k); disco(10, 36, 5, P.grisL); rect(24, 32, 42, 40, C.k); rect(25, 33, 41, 39, hex('#14261a'));
  rect(1, 45, 44, 104, hex('#dfe6ea')); rect(1, 45, 44, 46, C.blanco); rect(42, 45, 44, 104, P.paredS);
  rect(4, 92, 20, 98, C.k); rect(5, 93, 19, 97, P.grisL); rect(5, 93, 19, 93, C.blanco); pset(16, 95, C.rojo);
  rect(7, 79, 17, 92, C.k); rect(8, 80, 16, 91, P.vidrioL); rect(8, 84, 16, 91, hex('#c8d8a8')); rect(8, 80, 8, 91, C.blanco);
  rect(24, 82, 42, 98, C.k); rect(25, 83, 41, 97, P.grisS); rect(25, 83, 41, 84, P.grisL); rect(27, 88, 39, 92, C.k);
  rect(30, 98, 36, 104, C.k); rect(26, 60, 27, 82, P.grisD); linea(27, 62, 40, 62, P.grisD);
  rect(0, 50, 45, 51, P.grisS); for (let y = 52; y < 86; y++) for (let x = 1 + (y % 3); x < 43; x += 3) pset(x, y, d_mezcla(R.pget(x, y), P.vidrioS, 0.5));
  for (const d of [6, 22]) { linea(d, 85, d + 12, 53, C.blanco); }
  rect(0, 86, 45, 88, C.k); rect(1, 87, 44, 87, P.grisL);
  rect(0, 105, 46, 140, C.k); rect(1, 106, 45, 139, P.paredS); for (const x of [3, 24]) { rect(x, 108, x + 19, 136, P.paredL); rect(x + 8, 111, x + 12, 112, P.grisS); }
  // EL BANCO con el ordenador, la gradilla de viales de carbón numerados y la balanza
  rect(48, 112, 104, 115, C.k); rect(48, 112, 104, 113, P.grisL); rect(48, 112, 104, 112, C.blanco);
  rect(48, 116, 104, 140, P.paredS); for (const x of [50, 77]) { rect(x, 118, x + 24, 137, P.paredL); rect(x + 10, 121, x + 14, 122, P.grisS); }
  rect(50, 88, 78, 108, C.k); rect(51, 89, 77, 107, hex('#2a2e36')); rect(62, 109, 66, 111, C.k); rect(57, 111, 71, 111, C.k);
  rect(80, 104, 103, 111, C.k); rect(81, 105, 102, 110, hex('#e8e8e2'));
  for (let k = 0; k < 5; k++) { const x = 82 + k * 4; rect(x, 98, x + 2, 106, C.k); rect(x + 1, 99, x + 1, 105, P.vidrioL); rect(x + 1, 102, x + 1, 105, P.carbon); rect(x, 97, x + 2, 98, [C.rojo, C.azulL, C.amarillo, C.verdeL, hex('#a05ad8')][k]); }
  d_cifras(R, '12', 83, 106, C.k); d_cifras(R, '345', 91, 106, C.k);
  // los estantes de botellas sobre el banco (entre la ventana y el ordenador)
  rect(48, 70, 62, 71, P.grisS); for (let k = 0; k < 3; k++) { rect(49 + k * 4, 63, 51 + k * 4, 69, C.k); rect(50 + k * 4, 64, 50 + k * 4, 68, [hex('#8a5a3a'), hex('#c8d8e8'), hex('#5a8a5a')][k]); }
  // el reloj de pared sobre los estantes (las agujas, en la vida) y el dispensador de guantes junto al banco
  disco(55, 40, 7, C.k); disco(55, 40, 6, C.blanco); disco(55, 41, 6, P.paredL); disco(55, 40, 5, C.blanco); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(55 + Math.cos(a) * 5), Math.round(40 + Math.sin(a) * 5), k % 3 ? P.grisL : P.grisD); }
  rect(49, 76, 61, 84, C.k); rect(50, 77, 60, 83, hex('#5a8ac8')); rect(50, 77, 60, 77, hex('#8ab4e8')); rect(52, 76, 58, 77, hex('#eaf0f8')); pset(53, 75, hex('#eaf0f8')); pset(56, 75, hex('#eaf0f8'));
  // el extintor colgado entre la fuente de iones y el tanque, con su soporte y su manguera
  rect(149, 117, 157, 119, P.grisD); rect(150, 120, 156, 138, C.k); rect(151, 121, 155, 137, C.rojo); rect(151, 121, 151, 137, hex('#f07a6a')); rect(155, 121, 155, 137, C.rojoS);
  rect(151, 126, 155, 129, C.blanco); rect(152, 127, 154, 128, hex('#3a7ac8')); rect(152, 117, 154, 120, C.k); linea(155, 119, 158, 124, C.k); linea(158, 124, 157, 134, C.k);
  // LA FUENTE DE IONES: el armario gris con la boca de carga (portezuela con su mirilla), los manómetros y el tubo del haz
  rect(106, 74, 148, 148, C.k); rect(107, 75, 147, 147, P.gris); rect(107, 75, 147, 76, P.grisL); rect(142, 77, 147, 147, P.grisS); rect(107, 100, 141, 100, P.grisS);
  for (let y = 104; y < 118; y += 2) rect(110, y, 126, y, P.grisS);
  rect(118, 122, 136, 136, C.k); rect(119, 123, 135, 135, P.grisL); rect(121, 125, 133, 133, C.k); rect(122, 126, 132, 132, hex('#202630')); rect(119, 123, 135, 123, C.blanco);
  rect(129, 116, 140, 120, C.k); rect(130, 117, 139, 119, hex('#14261a'));
  for (const [cx, cy] of [[116, 86], [132, 86]]) { disco(cx, cy, 6, C.k); disco(cx, cy, 5, C.blanco); for (let a = 3.3; a < 6.2; a += 0.5) pset(Math.round(cx + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 4), P.grisS); }
  rect(110, 140, 145, 147, P.grisD); for (let x = 112; x < 144; x += 3) rect(x, 141, x + 1, 146, P.grisS);
  // el tubo del haz (de la fuente al tanque, y del tanque al imán y al detector), con bridas y mirillas
  const tubo = (x0, x1, y) => { rect(x0, y - 3, x1, y + 3, C.k); rect(x0, y - 2, x1, y + 2, P.grisL); rect(x0, y - 2, x1, y - 2, C.blanco); rect(x0, y + 2, x1, y + 2, P.grisS); };
  tubo(148, 152, 82); tubo(250, 254, 82); tubo(286, 290, 82);
  // EL GRAN TANQUE (el acelerador): un cilindro verde con aros, tornillos, el pictograma de radiación y sus patas
  for (let y = 52; y <= 112; y++) { const f = (y - 52) / 60, c = f < 0.12 ? P.tanqueL : f < 0.2 ? (d_umbral(0, y) < 0.5 ? P.tanqueL : P.tanque) : f > 0.82 ? P.tanqueD : f > 0.66 ? (d_umbral(1, y) < (f - 0.66) * 6 ? P.tanqueS : P.tanque) : P.tanque; rect(152, y, 248, y, c); }
  for (let y = 52; y <= 112; y++) { const r = Math.sqrt(Math.max(0, 1 - ((y - 82) / 30) ** 2)) * 5; rect(Math.round(152 - r), y, 152, y, P.tanqueS); rect(248, y, Math.round(248 + r), y, P.tanqueS); }
  linea(152, 52, 248, 52, C.k); linea(152, 112, 248, 112, C.k);
  for (const x of [160, 200, 240]) { rect(x, 51, x + 3, 113, C.k); rect(x + 1, 52, x + 2, 112, P.grisL); for (let y = 56; y < 112; y += 8) pset(x + 1, y, C.k); }
  poligono([[182, 74], [192, 74], [187, 66]], C.amarillo); for (const a of [-1.57, 0.52, 2.62]) { const cx = 187 + Math.cos(a) * 3, cy = 72 + Math.sin(a) * 3; disco(Math.round(cx), Math.round(cy), 1, C.k); } disco(187, 72, 1, C.k);
  for (let x = 153; x < 248; x++) { if (x % 40 > 6 || (x % 3)) pset(x, 58, P.tanqueL); if (x % 5 === 0) pset(x, 57, C.blanco); }
  rect(206, 92, 232, 104, C.k); rect(207, 93, 231, 103, P.grisL); rect(207, 93, 231, 93, C.blanco); for (const [x, y] of [[209, 95], [229, 95], [209, 101], [229, 101]]) pset(x, y, P.grisS); for (let y = 96; y < 101; y += 2) rect(212, y, 226, y, P.grisS);
  rect(170, 113, 172, 116, C.k); rect(228, 113, 230, 116, C.k);
  for (const x of [244, 249]) rect(x, 86, x, 140, P.grisD); for (let y = 90; y < 140; y += 6) rect(244, y, 249, y, P.grisS);
  // en la pared: la tabla de los elementos (cuadritos de colores, sin letras), la pizarra con la curva que baja (la
  // desintegración), los pictogramas de seguridad y el reloj
  rect(110, 26, 146, 56, C.k); rect(111, 27, 145, 55, C.blanco);
  for (let j = 0; j < 7; j++) for (let i = 0; i < 11; i++) { if (j === 0 && i > 0 && i < 10) continue; if ((j === 1 || j === 2) && i > 1 && i < 6) continue; const x = 112 + i * 3, y = 28 + j * 3; rect(x, y, x + 1, y + 1, [hex('#e8806a'), hex('#f0c060'), hex('#8ac0e0'), hex('#9ad08a'), hex('#c8a0e0')][(i + (j > 3 ? 2 : 0)) % 5]); }
  for (let i = 0; i < 8; i++) { rect(117 + i * 3, 50, 118 + i * 3, 51, hex('#f0a0b0')); rect(117 + i * 3, 53, 118 + i * 3, 54, hex('#a0d0c0')); }
  rect(158, 24, 236, 48, C.k); rect(159, 25, 235, 47, C.blanco); rect(159, 47, 235, 48, P.grisS); rect(164, 46, 230, 47, P.gris);
  linea(164, 28, 164, 43, P.grisD); linea(164, 43, 230, 43, P.grisD); for (let x = 165; x < 230; x++) { const y = Math.round(29 + 14 * (1 - Math.exp(-(x - 165) / 18))); pset(x, y, hex('#3a6ac8')); }
  for (const [x, y] of [[183, 38], [201, 41], [219, 42]]) { linea(x, y, x, 43, hex('#c84a4a'), 2); pset(x, y, hex('#c84a4a')); }
  for (let k = 0; k < 4; k++) { const x = 168 + k * 15; pset(x, 30 + k, hex('#4a8a4a')); pset(x + 1, 30 + k, hex('#4a8a4a')); }
  for (const [x, c] of [[242, C.amarillo], [254, hex('#3a7ac8')], [266, C.amarillo]]) { rect(x, 30, x + 9, 39, C.k); rect(x + 1, 31, x + 8, 38, c); }
  poligono([[245, 37], [247, 32], [249, 37]], C.k); disco(258, 34, 2, C.blanco); rect(257, 34, 259, 36, C.blanco); linea(270, 32, 268, 35, C.k); linea(268, 35, 271, 35, C.k); linea(271, 35, 269, 38, C.k);
  // EL PUPITRE DE CONTROL bajo el tanque, con la pantalla del resultado, botones y una palanca
  rect(160, 114, 240, 148, C.k); rect(161, 115, 239, 147, P.grisL); rect(161, 115, 239, 116, C.blanco); rect(236, 117, 239, 147, P.gris);
  rect(169, 117, 231, 136, C.k); rect(170, 118, 230, 135, P.pantO);
  for (let x = 165; x < 236; x += 10) rect(x, 140, x + 5, 143, x % 20 === 5 ? C.rojo : P.gris);
  rect(161, 147, 239, 147, P.grisS);
  // EL IMÁN que curva el haz (naranja, con las bobinas de cobre) y EL DETECTOR con su columna de luces
  rect(252, 60, 286, 104, C.k); rect(253, 61, 285, 103, P.iman); rect(253, 61, 285, 63, P.imanL); rect(281, 64, 285, 103, P.imanS);
  rect(258, 66, 280, 74, C.k); rect(259, 67, 279, 73, P.cobre); for (let x = 260; x < 279; x += 2) rect(x, 67, x, 73, P.cobreS); rect(259, 67, 279, 67, P.cobreL);
  rect(258, 90, 280, 98, C.k); rect(259, 91, 279, 97, P.cobre); for (let x = 260; x < 279; x += 2) rect(x, 91, x, 97, P.cobreS); rect(259, 91, 279, 91, P.cobreL);
  rect(262, 104, 276, 148, C.k); rect(263, 105, 275, 147, P.grisS); rect(263, 105, 263, 147, P.gris);
  rect(288, 64, 319, 148, C.k); rect(289, 65, 319, 147, P.grisL); rect(289, 65, 319, 66, C.blanco); rect(289, 100, 319, 100, P.grisS);
  rect(292, 70, 316, 86, C.k); rect(293, 71, 315, 85, hex('#0e1a14'));
  for (let y = 104; y < 140; y += 6) rect(292, y, 316, y + 3, P.gris);
  // EL SUELO de vinilo: juntas en perspectiva, reflejos de las máquinas, brillos de los plafones y la franja de seguridad
  // cada loseta de vinilo con su tono (unas más claras, otras más gastadas, tramado) y motas del material
  const filasL = [141, 149, 160, 174, 180];
  for (let y = 141; y < 180; y++) { const u = (y - 142) / 37; let f = 0; while (filasL[f + 1] <= y) f++;
    for (let x = 0; x < 320; x++) { const col = Math.floor((x + 144 * u) / (1 + 0.9 * u) / 28), n = h(col, f, 62);
      let c = (h(x >> 2, y >> 1, 61) < 0.15) ? P.sueloLabS : P.sueloLab;
      if (n > 0.72 && d_umbral(x, y) < 0.5) c = P.sueloLabL; else if (n < 0.25 && d_umbral(x, y) < 0.4) c = P.sueloLabS;
      if (h(x, y, 63) < 0.012) c = P.sueloLabJ; if (y === 141) c = P.sueloLabS; pset(x, y, c); } }
  for (const y of [149, 160, 174]) rect(0, y, 319, y, P.sueloLabJ);
  for (let k = -6; k <= 16; k++) { const xa = k * 28; linea(xa, 142, Math.round(160 + (xa - 160) * 1.9), 179, P.sueloLabJ); }
  for (const y of [144, 147, 152]) { rect(110, y, 144, y, P.grisS); rect(160, y, 240, y, P.grisL); rect(292, y, 319, y, P.grisL); rect(4, y + 1, 42, y + 1, P.paredS); }
  for (let y = 145; y < 156; y += 2) rect(156, y, 246, y, d_mezcla(P.sueloLab, P.tanque, 0.25));
  for (const [x, y, w] of [[188, 164, 26], [240, 168, 18], [60, 162, 22], [14, 172, 30], [120, 176, 24]]) { rect(x, y, x + w, y, P.sueloLabL); rect(x + 4, y + 2, x + w - 6, y + 2, P.sueloLabL); }
  for (let y = 141; y <= 142; y++) for (let x = 106; x < 320; x++) pset(x, y, ((x + y) >> 2) % 2 ? C.amarillo : C.k);
  d_labSuelo(R);
  // el carrito con el termo de nitrógeno líquido (dewar) a la derecha, delante del detector
  rect(250, 156, 284, 158, C.k); rect(251, 156, 283, 157, P.grisL); for (const x of [254, 280]) { disco(x, 162, 3, C.k); disco(x, 162, 1, P.gris); } rect(252, 152, 253, 156, P.grisD); rect(281, 140, 282, 156, P.grisD); rect(279, 140, 284, 141, C.k);
  rect(258, 130, 276, 156, C.k); rect(259, 131, 275, 155, P.grisL); rect(259, 131, 261, 155, C.blanco); rect(271, 131, 275, 155, P.gris); for (const y of [136, 150]) rect(259, y, 275, y, P.grisS);
  rect(263, 126, 271, 130, C.k); rect(264, 127, 270, 129, P.gris); rect(265, 123, 269, 126, C.k); rect(266, 124, 268, 125, C.azulL);
  rect(262, 140, 272, 146, C.k); rect(263, 141, 271, 145, C.azulL); poligono([[265, 145], [267, 142], [269, 145]], C.blanco);
  // la papelera de pedal a la izquierda
  rect(4, 152, 18, 172, C.k); rect(5, 153, 17, 171, P.grisL); rect(5, 153, 7, 171, C.blanco); rect(4, 150, 18, 153, C.k); rect(5, 151, 17, 152, P.gris); rect(8, 172, 14, 174, C.k);
}
// la vida del laboratorio: plafón que parpadea, nubes y una bici por la ventana, el ventilador de la campana, el vaso que
// hierve, el horno que brilla, la curva del ordenador, los manómetros, el haz por las mirillas, las luces del detector, el
// osciloscopio, la pantalla del resultado y el portamuestras que va a la boca de carga
function d_labVida(R, t, o) {
  const P = DP, u = Math.max(0, Math.min(1, o.muestra ?? 0)), corre = u > 0.3 && u < 0.85, listo = u >= 0.85, W = [67, 36, 103, 58];
  // el segundo plafón parpadea a ratos
  if ((t % 6.1) < 0.2 && Math.sin(t * 60) > 0) R.rect(239, 2, 271, 5, P.techoS);
  // por la ventana: nubes, un pájaro y alguien en bici que pasa
  R.recorte([W[0], W[1], W[2], W[3]]);
  const ps = (x, y, c) => R.pset(x, y, c);
  for (let k = 0; k < 2; k++) d_nube(ps, W[0] - 16 + ((k * 27 + t * (1.4 + k)) % 66), 40 + k * 4, 12 + k * 4, k + 12, [P.nubS, P.nub, P.nubL]);
  { const b = ((t / 7) % 1), bx = Math.round(W[0] - 6 + b * 48); d_figura(R, bx, 57, t, [hex('#d84a3a'), hex('#e0b090'), C.k, hex('#3a3a5a')], false); R.anillo(bx - 3, 58, 1.5, C.k); R.anillo(bx + 3, 58, 1.5, C.k); }
  R.recorte(null);
  // las agujas del reloj de pared (el minutero da la vuelta despacio)
  { const am = t * 0.5 - 1.57, ah = t * 0.04 + 0.4; R.linea(55, 40, Math.round(55 + Math.cos(am) * 4), Math.round(40 + Math.sin(am) * 4), C.k); R.linea(55, 40, Math.round(55 + Math.cos(ah) * 3), Math.round(40 + Math.sin(ah) * 3), C.k); const as = t * 6.28 / 6; R.pset(Math.round(55 + Math.cos(as) * 4), Math.round(40 + Math.sin(as) * 4), C.rojo); }
  // el ventilador de la campana y su pantalla verde
  for (let k = 0; k < 3; k++) { const a = t * 11 + k * 2.09; R.linea(10, 36, Math.round(10 + Math.cos(a) * 4), Math.round(36 + Math.sin(a) * 4), C.metalD); } R.disco(10, 36, 1, C.k);
  R.rect(26, 35, 26 + Math.round(9 + Math.sin(t * 1.7) * 3), 36, C.verdeL); R.pset(39, 34, Math.floor(t * 2) % 2 ? C.verdeL : hex('#2a4a2a'));
  // el vaso que hierve sobre la placa (burbujas que suben y revientan)
  for (let k = 0; k < 6; k++) { const v = (t * 1.2 + k / 6) % 1, x = 9 + ((k * 3) % 7), y = Math.round(91 - v * 7); R.pset(x, y, C.blanco); if (v > 0.85) { R.pset(x - 1, 84, C.blanco); R.pset(x + 1, 84, C.blanco); } }
  // el horno de tubo: el resplandor naranja que late en la ventanilla
  { const b = 0.6 + 0.4 * Math.sin(t * 3.1) * Math.sin(t * 1.3); R.rect(28, 89, 38, 91, b > 0.5 ? P.hornoL : P.horno); R.rect(28, 89, 38, 89, P.horno); for (let x = 28; x < 39; x += 3) R.pset(x, 91, P.horno); }
  // el ordenador del banco: la curva de calibración se dibuja punto a punto (sube) con su rejilla
  { R.rect(52, 90, 76, 106, P.pantO); for (let x = 56; x < 76; x += 5) for (let y = 91; y < 106; y += 2) R.pset(x, y, hex('#1a2c34')); const n = Math.floor((t * 6) % 26);
    for (let i = 0; i < n; i++) { const x = 52 + i, y = Math.round(104 - i * 0.45 - Math.sin(i * 0.5) * 1.5); R.pset(x, y, P.curva); R.pset(x, y + 1, P.curvaS); }
    R.rect(52, 90, 52, 106, P.curvaS); R.rect(52, 106, 76, 106, P.curvaS); }
  // los manómetros de la fuente: la aguja tiembla, y salta cuando la máquina corre
  for (const [cx, cy, k] of [[116, 86, 0], [132, 86, 1]]) { const a = 3.6 + (corre ? 1.6 + Math.sin(t * 9 + k) * 0.3 : 0.4 + Math.sin(t * 2 + k) * 0.08); R.linea(cx, cy, Math.round(cx + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 4), C.rojo); R.pset(cx, cy, C.k); }
  // la pantallita de la fuente (cifras que cambian) y la luz de la boca de carga
  d_cifras(R, String(100 + Math.floor(t * 3) % 900), 131, 118, C.verdeL);
  R.rect(122, 126, 132, 132, corre ? hex('#3a2e6a') : hex('#202630')); if (corre && Math.sin(t * 20) > 0) R.rect(125, 128, 129, 130, P.haz);
  // el haz: pulsos de luz violeta por las mirillas (dentro de los tubos y del tanque); quieto, un hilo tenue
  for (const [x0, x1] of [[148, 152], [250, 254], [286, 290]]) for (let x = x0; x <= x1; x++) R.pset(x, 82, corre ? (Math.floor(x - t * 40) % 6 < 3 ? P.hazL : P.haz) : P.grisL);
  for (const x of [176, 212]) { R.disco(x, 82, 3, C.k); R.disco(x, 82, 2, corre ? (Math.sin(t * 14 + x) > 0 ? P.hazL : P.haz) : hex('#3a4a5a')); R.pset(x - 1, 81, C.blanco); }
  // las luces del detector: columna de LED que sube y baja, el osciloscopio y su onda
  for (let k = 0; k < 6; k++) { const nivel = corre ? Math.floor((Math.sin(t * 7) * 0.5 + 0.5) * 6) : listo ? 6 : 1; R.rect(311, 136 - k * 6, 315, 138 - k * 6, k < nivel ? (k > 3 ? C.rojo : k > 1 ? P.ambar : C.verdeL) : P.grisS); }
  for (let x = 293; x < 316; x++) { const y = Math.round(78 + Math.sin(x * 0.6 + t * (corre ? 12 : 3)) * (corre ? 5 : 1.5)); R.pset(x, y, hex('#7af0a0')); }
  R.pset(299, 92, Math.floor(t * 2) % 2 ? C.verdeL : hex('#2a4a2a'));
  // la baliza sobre el imán: ámbar que gira cuando la máquina corre; el vaho frío que sale del termo y cae
  { R.rect(266, 57, 272, 59, C.k); R.rect(267, 52, 271, 57, C.k); const on = corre && Math.sin(t * 10) > 0; R.rect(268, 53, 270, 56, on ? P.ambar : P.ambarS); if (on) { R.pset(266, 54, P.ambar); R.pset(272, 54, P.ambar); } }
  for (let k = 0; k < 7; k++) { const v = (t * 0.5 + k / 7) % 1, x = Math.round(267 + Math.sin(t * 1.7 + k) * 2 + (k % 3 - 1) * v * 6), y = Math.round(122 - v * 8 + (v > 0.5 ? (v - 0.5) * 20 : 0)); if (v < 0.9) R.pset(x, y, v < 0.5 ? C.blanco : hex('#dfe8f0')); }
  // los pilotos del pupitre
  for (let k = 0; k < 4; k++) R.pset(166 + k * 4, 138, Math.floor(t * 3 + k) % 3 === 0 ? (corre ? P.ambar : C.verdeL) : P.grisS);
  // la pantalla del resultado: apagada (guiones que parpadean), en marcha (barra de progreso) o lista (verde clara)
  if (listo) { R.rect(170, 118, 230, 135, hex('#103a22')); for (let y = 118; y < 136; y += 2) R.rect(170, y, 230, y, hex('#0c3020')); R.rect(170, 118, 230, 118, hex('#2a6a44')); R.disco(224, 123, 1, Math.floor(t * 3) % 2 ? C.verdeL : hex('#2a6a44')); }
  else if (corre) { const p = (u - 0.3) / 0.55; R.rect(176, 126, 224, 128, hex('#1a2c34')); R.rect(176, 126, 176 + Math.round(48 * p), 128, P.ambar); }
  else for (let k = 0; k < 4; k++) if (Math.floor(t * 1.5) % 2) R.rect(180 + k * 11, 127, 186 + k * 11, 128, P.ambarS);
  // el portamuestras: sale de la gradilla, va a la boca de carga y entra
  let muestra = null;
  if (u < 0.3) { const v = u / 0.3, x = Math.round(92 + (127 - 92) * v), y = Math.round(100 + (129 - 100) * v - Math.sin(v * Math.PI) * 10); R.rect(x - 2, y - 2, x + 2, y + 2, C.k); R.rect(x - 1, y - 1, x + 1, y + 1, C.metalL); R.pset(x, y, P.carbon); muestra = [x, y]; }
  return { muestra, listo };
}
function d_laboratorio(R, t, o) {
  d_fijo(R, 'lab', () => d_labFijo(R));
  const v = d_labVida(R, t, o);
  return { suelo: 150, puerto: [127, 129], muestra: v.muestra, listo: v.listo, numero: [200, 131] };
}

// mezcla dos colores (a = 0: el primero; a = 1: el segundo)
const e_mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };

// umbral del tramado ordenado 4 × 4 (0–1)
const E_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_bayer = (x, y) => (E_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// degradado tramado: v 0–1 recorre la lista de colores
const e_grad = (v, cols, x, y) => { const s = Math.max(0, Math.min(0.999, v)) * (cols.length - 1), i = Math.floor(s); return (s - i) > e_bayer(x, y) ? cols[i + 1] : cols[i]; };

// ruido suave (interpolado) para relieves y manchas
const e_ruido = (x, y, k) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };

const e_sat = (v) => Math.max(0, Math.min(1, v));

const e_suave = (u) => { u = e_sat(u); return u * u * (3 - 2 * u); };

// las capas fijas de cada encuadre: se pintan una vez en un búfer de R.nuevo() y se copian en cada fotograma
const e_capas = new Map();

function e_capa(R, clave, dibuja) {
  let c = e_capas.get(clave);
  if (!c) { const b = R.nuevo(), prev = R.usar(b); const info = dibuja(); R.usar(prev); c = { b, info }; e_capas.set(clave, c); }
  R.copiar(c.b); return c.info;
}

// aclara (a > 0) u oscurece (a < 0) un píxel ya pintado
const e_tono = (R, x, y, a, col) => { const c = R.pget(x, y); if (c) R.pset(x, y, e_mez(c, col ?? (a > 0 ? 0xffffffff : 0xff000000), Math.abs(a))); };

// relieve: marca con R una máscara (dibuja con el color MK en un búfer aparte) y la saca de la piedra con luz rasante
// desde arriba a la izquierda: canto de luz, cara, canto de sombra y la sombra que arroja sobre la piedra
const E_MK = 0xff00ff01;

function e_relieve(R, x0, y0, x1, y1, dibuja, cara, luz, sombra, arroja = 0.35) {
  const m = R.nuevo(), prev = R.usar(m); dibuja(E_MK); R.usar(prev);
  const B = R.buf, en = (x, y) => x >= 0 && y >= 0 && x < 320 && y < 180 && m[y * 320 + x] === E_MK;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const i = y * 320 + x;
    if (en(x, y)) {
      const nb = !en(x - 1, y) || !en(x, y - 1), sb = !en(x + 1, y) || !en(x, y + 1);
      const sb2 = !sb && (!en(x + 2, y + 1) || !en(x + 1, y + 2));
      B[i] = nb && !sb ? luz : sb && !nb ? sombra : sb2 ? e_mez(cara, sombra, 0.45) : e_mez(cara, B[i], 0.25);
    } else if (en(x - 1, y - 1) || (arroja > 0.2 && (en(x - 2, y - 2) || en(x - 3, y - 2)))) B[i] = e_mez(B[i], 0xff000000, arroja);
  }
}

const E_TV = [174, 54, 286, 110];   // la imagen de la tele

const E_VENT = [26, 32, 82, 94];    // el cristal de la ventana

const e_luces = [];                 // las ventanas de la ciudad, para que se enciendan y apaguen

// lo fijo del salón: pared, ventana con la ciudad, estantería, lámpara, balda, tele apagada, mueble, planta, mesita,
// suelo, alfombra y el respaldo del sofá
function e_salonFijo(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf;
  const P0 = hex('#2a2842'), P1 = hex('#302d4a'), PM = hex('#3c3858'), PS = hex('#221f36'), CAL = hex('#6e5048'), CAL2 = hex('#a07a5c'), OSC = hex('#141224');
  // el papel pintado a rayas con rombos; la luz de la lámpara en abanico y las esquinas en penumbra
  for (let y = 0; y < 122; y++) for (let x = 0; x < 320; x++) {
    let c = ((x >> 3) & 1) ? P1 : P0; const mx = (x + (((y / 12) | 0) & 1) * 8) & 15, my = y % 12;
    if (Math.abs(mx - 8) + Math.abs(my - 6) === 3) c = PM; else if ((x & 7) === 0) c = PS;
    if (h(x >> 1, y >> 1, 900) < 0.04) c = PS;
    const dx = x - 156, dy = y - 54, d = Math.hypot(dx * 0.8, dy * 1.1); let l = Math.max(0, 1 - d / 74);
    if (dy < -4 && Math.abs(dx) > -dy * 0.7 + 10) l *= 0.35; if (dy > 6 && Math.abs(dx) > dy * 0.9 + 9) l *= 0.5;
    if (l > e_bayer(x, y) * 0.9 + 0.05) c = e_mez(c, l > 0.55 ? CAL2 : CAL, Math.min(0.55, l * 0.75));
    const os = Math.max(0, (14 - x) / 14, (x - 306) / 14, (8 - y) / 8) * 0.6; if (os > e_bayer(x, y) * 0.8) c = e_mez(c, OSC, 0.45);
    B[y * 320 + x] = c;
  }
  rect(0, 0, 319, 3, hex('#1a182c')); rect(0, 4, 319, 4, hex('#3a3656')); rect(0, 5, 319, 5, hex('#15132a'));   // la moldura
  rect(0, 116, 319, 121, hex('#3a3652')); rect(0, 116, 319, 116, hex('#56527a')); rect(0, 121, 319, 121, hex('#1a1828'));   // el rodapié
  // el suelo de tablas: hileras que se ensanchan hacia delante, juntas al tresbolillo, vetas y el reflejo de la lámpara
  const filas = [122, 126, 131, 137, 144, 152, 161, 171, 180], M = [hex('#3a2a26'), hex('#45322b'), hex('#4f3a30')], MJ = hex('#24181a'), MV = hex('#33241f'), ML = hex('#5e463a');
  for (let f = 0; f < filas.length - 1; f++) { const y0 = filas[f], y1 = filas[f + 1] - 1, w = 30 + f * 12; let x = -Math.round(h(f, 1, 901) * w), k = 0;
    while (x < 320) { const c = M[Math.floor(h(k, f, 902) * 3)]; rect(Math.max(0, x), y0, Math.min(319, x + w - 2), y1, c); rect(Math.max(0, x + w - 1), y0, Math.min(319, x + w - 1), y1, MJ);
      for (let g = 0; g < 2; g++) { const gy = y0 + 1 + Math.floor(h(k, g, 903 + f) * Math.max(1, y1 - y0 - 1)), gx = x + Math.floor(h(k, g, 904) * w * 0.5); rect(Math.max(0, gx), gy, Math.min(319, gx + 6 + f * 2, x + w - 3), gy, g ? MV : ML); }
      x += w; k++; }
    rect(0, y1, 319, y1, MJ); }
  for (let y = 122; y < 150; y++) for (let x = 146; x < 168; x++) if (h(x, y, 905) < 0.4 - (y - 122) / 80 && Math.abs(x - 156) < 4 + (y - 122) / 4) pset(x, y, e_mez(B[y * 320 + x], CAL2, 0.35));
  // la alfombra: un trapecio con cenefa, rombos y flecos
  const A0 = hex('#5a2430'), A1 = hex('#6e2e3a'), AB = hex('#232644'), AC = hex('#c8b48a');
  for (let y = 152; y < 180; y++) { const v = (y - 152) / 28, xa = Math.round(42 - v * 34), xb = Math.round(278 + v * 34);
    for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa), bord = u < 0.03 || u > 0.97 || y < 154 || y > 176, bord2 = !bord && (u < 0.06 || u > 0.94 || y < 157);
      const rx = Math.abs(((u * 12) % 1) - 0.5) * 2, ry = Math.abs(((v * 3) % 1) - 0.5) * 2, rombo = rx + ry < 0.7, rb = Math.abs(rx + ry - 0.7) < 0.12;
      B[y * 320 + x] = bord ? AB : bord2 ? ((x + y) & 1 ? AC : AB) : rb ? AC : rombo ? A1 : (h(x, y, 906) < 0.1 ? A1 : A0); } }
  for (let x = 44; x < 278; x += 2) pset(x, 151, AC);
  // ── la ventana: el cielo, las estrellas, la luna, tres capas de edificios, el puente y el agua
  const [vx0, vy0, vx1, vy1] = E_VENT, CIE = [hex('#0a0c24'), hex('#141a3a'), hex('#24244a'), hex('#3a2e56')];
  for (let y = vy0; y <= vy1; y++) for (let x = vx0; x <= vx1; x++) B[y * 320 + x] = e_grad((y - vy0) / 58, CIE, x, y);
  for (let k = 0; k < 16; k++) pset(vx0 + Math.floor(h(k, 1, 907) * 56), vy0 + Math.floor(h(k, 2, 907) * 20), k % 3 ? hex('#8a90c0') : hex('#e8e8ff'));
  for (let y = 36; y <= 44; y++) for (let x = 64; x <= 74; x++) { const d = Math.hypot(x - 69, y - 40), d2 = Math.hypot(x - 71.5, y - 39); if (d <= 4.3 && d2 > 3.7) pset(x, y, d > 3.4 ? hex('#c8c8a0') : hex('#f4f0d0')); }
  e_luces.length = 0;
  for (const [cap, base, col, ventana] of [[0, 78, hex('#1e2040'), hex('#4a4a6a')], [1, 84, hex('#161830'), hex('#e8b860')], [2, 88, hex('#0e1022'), hex('#f0c870')]]) {
    let x = vx0 - 2 - Math.floor(h(cap, 3, 908) * 6);
    while (x < vx1) { const w = 5 + Math.floor(h(x, cap, 909) * 7), al = 10 + Math.floor(h(x, cap, 910) * (cap === 0 ? 28 : cap === 1 ? 20 : 12)); const y0 = base - al;
      rect(Math.max(vx0, x), y0, Math.min(vx1, x + w), vy1, col);
      if (cap === 0 && h(x, 5, 911) < 0.35) { rect(x + (w >> 1), y0 - 4, x + (w >> 1), y0 - 1, col); }
      if (cap > 0) for (let wy = y0 + 2; wy < base - 1; wy += 3) for (let wx = x + 1; wx < x + w - 1; wx += 2) if (wx >= vx0 && wx <= vx1 && h(wx, wy, 912) < 0.4) { pset(wx, wy, h(wx, wy, 913) < 0.5 ? ventana : hex('#2a2c48')); e_luces.push([wx, wy, ventana]); }
      x += w + 1; } }
  rect(vx0, 86, vx1, 87, hex('#2a2c44')); for (let x = vx0; x <= vx1; x += 6) rect(x, 83, x, 86, hex('#2a2c44')); linea(vx0, 83, vx1, 83, hex('#3a3c58'));   // el puente
  for (let y = 88; y <= vy1; y++) for (let x = vx0; x <= vx1; x++) B[y * 320 + x] = (x + y * 3) % 7 === 0 ? hex('#2a3050') : hex('#10142a');   // el río
  // el marco blanco de noche, el parteluz, el alféizar con el cactus y una figurita
  const MA = hex('#8a88a6'), MAS = hex('#5a5878'), MAL = hex('#b0aec8');
  rect(22, 28, 86, 31, MA); rect(22, 95, 86, 99, MA); rect(22, 28, 25, 99, MA); rect(83, 28, 86, 99, MAS); rect(22, 28, 86, 28, MAL); rect(22, 28, 22, 99, MAL);
  rect(53, 32, 55, 94, MA); rect(26, 62, 82, 63, MA); rect(55, 32, 55, 94, MAS); rect(26, 63, 82, 63, MAS);
  rect(18, 99, 90, 102, hex('#a6a4be')); rect(18, 99, 90, 99, MAL); rect(18, 103, 90, 103, hex('#1a1828'));
  rect(30, 92, 37, 98, C.k); rect(31, 93, 36, 98, hex('#a0583a')); rect(32, 86, 35, 92, hex('#3a6a44')); rect(30, 88, 31, 90, hex('#3a6a44')); pset(33, 85, hex('#e87a9a'));
  poligono([[70, 98], [74, 89], [78, 98]], C.k); poligono([[71, 97], [74, 91], [77, 97]], hex('#c8a060')); pset(73, 93, hex('#e8c880'));   // la pirámide de recuerdo
  // la barra de las cortinas (las cortinas se mueven: van en cada fotograma)
  rect(10, 24, 98, 25, hex('#5a4a3a')); disco(10, 24, 2, hex('#8a6a4a')); disco(98, 24, 2, hex('#8a6a4a'));
  // ── la estantería: libros, una pirámide, un globo, la pecera y unas cajas
  const MD = hex('#4a3226'), MDL = hex('#6a4a34'), MDS = hex('#2e1e18');
  rect(94, 36, 136, 121, C.k); rect(95, 37, 135, 121, MD); rect(95, 37, 96, 121, MDL); rect(134, 37, 135, 121, MDS);
  const libros = [hex('#7a2a34'), hex('#2a4a7a'), hex('#8a7a3a'), hex('#2e5a44'), hex('#5a3a6a'), hex('#9a8a70'), hex('#8a4a2a')];
  for (const [y0, y1] of [[39, 54], [57, 72], [75, 92], [95, 108], [111, 119]]) { rect(97, y0, 133, y1, hex('#1a1218')); rect(97, y1 + 1, 133, y1 + 2, MDL); rect(97, y1 + 1, 133, y1 + 1, hex('#8a6448')); }
  for (const [yb, sem, x1] of [[54, 1, 133], [72, 2, 116], [108, 3, 133], [119, 4, 124]]) { let x = 98, k = 0;
    while (x < x1 - 2) { const w = 2 + Math.floor(h(k, sem, 914) * 3), al = 9 + Math.floor(h(k, sem, 915) * 5), c = libros[Math.floor(h(k, sem, 916) * 7)];
      rect(x, yb - al, x + w, yb, C.k); rect(x + 1, yb - al + 1, x + w - 1 + (w < 3 ? 1 : 0), yb, c); pset(x + 1, yb - al + 3, e_mez(c, C.blanco, 0.35)); pset(x + 1, yb - 3, e_mez(c, C.blanco, 0.25)); x += w + 1; k++; } }
  poligono([[118, 72], [125, 61], [132, 72]], C.k); poligono([[119, 71], [125, 63], [131, 71]], hex('#b89a5a')); for (let y = 65; y < 72; y += 2) linea(125 - (y - 63) * 0.7, y, 125 + (y - 63) * 0.7, y, hex('#8a7040'));   // la pirámide
  disco(128, 115, 4, C.k); disco(128, 115, 3, hex('#3a6a9a')); rect(126, 114, 128, 116, hex('#5a8a4a')); rect(127, 119, 129, 119, C.metalD);   // el globo
  // la pecera (el agua, la grava, las plantas; los peces y las burbujas, en cada fotograma)
  rect(99, 77, 131, 92, C.k); for (let y = 78; y <= 91; y++) for (let x = 100; x <= 130; x++) B[y * 320 + x] = y < 80 ? hex('#3a5a7a') : e_grad((y - 80) / 12, [hex('#2a6a8a'), hex('#1e4e6e'), hex('#163a56')], x, y);
  for (let x = 100; x <= 130; x++) { rect(x, 89 + (h(x, 1, 917) < 0.5 ? 0 : 1), x, 91, h(x, 2, 917) < 0.5 ? hex('#c8a870') : hex('#8a7050')); }
  for (const px of [104, 109, 126]) for (let y = 80; y < 90; y++) pset(px + Math.round(Math.sin(y * 0.8 + px) * 1), y, hex('#3a9a5a'));
  rect(99, 76, 131, 77, hex('#5a6a7a')); pset(100, 79, hex('#9ad0f0')); pset(101, 79, hex('#9ad0f0'));
  // ── la lámpara de pie: la base, el tubo y la pantalla encendida
  for (let j = -2; j <= 2; j++) rect(150 + Math.abs(j), 118 + j, 162 - Math.abs(j), 118 + j, j < 0 ? hex('#6a6a7a') : hex('#3a3a46'));
  rect(155, 60, 157, 116, hex('#2a2a34')); rect(155, 60, 155, 116, hex('#7a7a8a'));
  poligono([[146, 45], [166, 45], [170, 60], [142, 60]], hex('#5a4030')); poligono([[147, 46], [165, 46], [168, 59], [144, 59]], hex('#f0d49a'));
  for (let x = 148; x < 166; x += 3) linea(x, 47, x - Math.round((x - 156) * -0.2), 58, hex('#d8b47a'));
  rect(144, 59, 168, 60, hex('#fff0c0')); rect(147, 46, 165, 46, hex('#fff4d0'));
  // ── la balda sobre la tele: velas, una foto, un reloj de arena y un jarrón con espigas secas
  rect(178, 36, 262, 38, hex('#5a3e2c')); rect(178, 36, 262, 36, hex('#7a5a40')); rect(178, 39, 262, 39, hex('#1a1424'));
  for (const bx of [184, 256]) { rect(bx, 39, bx + 1, 43, hex('#3a2a22')); }
  for (const [cx, al] of [[188, 7], [196, 5]]) { rect(cx - 2, 36 - al, cx + 2, 35, C.k); rect(cx - 1, 37 - al, cx + 1, 35, hex('#e8dcc0')); pset(cx - 1, 37 - al, C.blanco); }
  rect(206, 22, 222, 35, C.k); rect(207, 23, 221, 34, hex('#c8a060')); rect(209, 25, 219, 32, hex('#5a7aa0')); rect(209, 29, 219, 32, hex('#7a9a6a')); disco(212, 28, 1, hex('#f0d0a0')); disco(216, 28, 1, hex('#f0d0a0'));
  rect(230, 26, 236, 27, hex('#6a4a30')); rect(230, 34, 236, 35, hex('#6a4a30')); poligono([[231, 28], [235, 28], [233, 31]], hex('#a8c8d8')); poligono([[233, 31], [231, 33], [235, 33]], hex('#a8c8d8')); pset(233, 32, hex('#e8c880')); rect(232, 33, 234, 33, hex('#e8c880'));
  rect(246, 28, 252, 35, C.k); rect(247, 29, 251, 35, hex('#4a6a8a')); rect(247, 29, 247, 35, hex('#7a9aba'));
  for (let k = 0; k < 5; k++) linea(249, 28, 245 + k * 2, 18 + (k % 2) * 2, hex('#b8945a'));
  // ── la tele: el marco con su brillo y sus patas, y el mueble de debajo
  rect(170, 50, 290, 114, hex('#0a0a10')); rect(171, 51, 289, 113, hex('#16161e')); rect(171, 51, 289, 51, hex('#3a3a48')); rect(172, 113, 288, 113, hex('#24242e'));
  rect(229, 112, 231, 112, hex('#5a5a6a'));   // el piloto
  for (const px of [192, 268]) { poligono([[px - 3, 118], [px, 114], [px + 3, 118]], hex('#2a2a34')); }
  const MU = hex('#5a3e2c'), MUL = hex('#7a5840'), MUS = hex('#3e2a20');
  rect(162, 118, 300, 138, C.k); rect(163, 119, 299, 137, MU); rect(163, 119, 299, 120, MUL); rect(163, 121, 299, 121, MUS);
  for (const [x0, x1] of [[166, 206], [256, 296]]) { rect(x0, 124, x1, 135, MUS); rect(x0 + 1, 125, x1 - 1, 134, MU); for (let y = 126; y < 134; y += 3) rect(x0 + 3, y, x1 - 3, y, hex('#4e3626')); rect(((x0 + x1) >> 1) - 3, 129, ((x0 + x1) >> 1) + 3, 130, hex('#c8a870')); }
  rect(210, 124, 252, 135, hex('#1a1216'));   // el hueco del centro
  rect(213, 129, 233, 134, hex('#1e1e26')); rect(213, 129, 233, 129, hex('#4a4a58')); rect(236, 130, 250, 134, hex('#e8e8ee')); rect(236, 130, 250, 130, C.blanco); rect(237, 134, 249, 134, hex('#a8a8b8'));   // la consola y el router
  for (let k = 0; k < 4; k++) rect(214 + k * 4, 125, 216 + k * 4, 128, [hex('#2a4a7a'), hex('#7a2a2a'), hex('#2a6a4a'), hex('#6a5a2a')][k]);   // cajas de juegos
  rect(166, 138, 168, 140, MUS); rect(294, 138, 296, 140, MUS);
  // ── la monstera en su maceta
  rect(300, 116, 316, 138, C.k); rect(301, 117, 315, 138, hex('#b0603a')); rect(301, 117, 315, 118, hex('#d07a4a')); rect(313, 119, 315, 138, hex('#8a4a2c'));
  for (const [ax, ay, r, k] of [[300, 82, 9, 0], [312, 72, 8, 1], [306, 96, 9, 2], [316, 100, 7, 3], [296, 104, 7, 4]]) { linea(308, 116, ax, ay, hex('#2a4a2a'));
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = i * i / (r * r) + j * j / (r * r * 0.55); if (d > 1) continue; const corte = Math.abs((Math.atan2(j, i) * 3 + k) % 1.2) < 0.18 && d > 0.3; if (corte) continue; pset(ax + i, ay + j, j < -r * 0.2 ? hex('#3a7a46') : d > 0.7 ? hex('#1e4a2a') : hex('#2e6a3a')); }
    linea(ax - r + 2, ay, ax + r - 2, ay, hex('#1e4a2a')); }
  // ── la mesita de la izquierda con la taza y el móvil boca arriba
  rect(2, 112, 22, 114, hex('#6a4a34')); rect(2, 112, 22, 112, hex('#8a6448')); rect(4, 115, 5, 138, hex('#4a3226')); rect(19, 115, 20, 138, hex('#4a3226')); rect(4, 128, 20, 129, hex('#4a3226'));
  rect(6, 105, 11, 111, C.k); rect(7, 106, 10, 111, hex('#c84a3a')); rect(7, 106, 10, 106, hex('#e87a5a')); rect(11, 107, 12, 109, C.k);
  rect(14, 110, 20, 111, hex('#101018'));
  // las sombras de los muebles en el suelo
  for (const [x0, x1, y0, y1] of [[160, 302, 139, 143], [26, 158, 158, 163], [0, 24, 139, 141]]) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0) pset(x, y, e_mez(B[y * 320 + x], C.k, 0.4));
  // ── el respaldo del sofá: tres cojines con su capitoné, la costura y la trama del tejido
  const F = hex('#2e4c5a'), FL = hex('#3e6270'), FS = hex('#203844'), FD = hex('#152836');
  rect(34, 112, 144, 140, C.k);
  for (let k = 0; k < 3; k++) { const x0 = 35 + k * 36, x1 = x0 + 35;
    for (let y = 110; y <= 140; y++) for (let x = x0; x <= x1; x++) { const ex = (x - x0) / 35, top = 110 + Math.round(4 * Math.pow(Math.abs(ex - 0.5) * 2, 2)); if (y < top) continue;
      let c = (x + y) & 1 ? F : e_mez(F, FS, 0.3); if (y < top + 2) c = FL; else if (ex < 0.08) c = FL; else if (ex > 0.92 || y > 136) c = FS; B[y * 320 + x] = c; }
    rect(x1, 113, x1, 140, FD); for (const [bx, by] of [[x0 + 10, 122], [x0 + 25, 122], [x0 + 17, 130]]) { pset(bx, by, FD); pset(bx - 1, by - 1, FS); pset(bx + 1, by + 1, FL); } }
  return { suelo: 150, tele: E_TV.slice(), ventana: E_VENT.slice(), sofa: [34, 110, 156, 160], lampara: [156, 52] };
}

// el brillo de la tele: cuánto le llega a cada píxel (se calcula una vez)
let e_brillo = null;

function e_brilloSalon() {
  if (e_brillo) return e_brillo; const I = [], W = [];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 170 && x <= 290 && y >= 50 && y <= 114) continue;
    const d = Math.hypot((x - 230) * 0.8, (y - 82) * (y > 120 ? 0.7 : 1)); let w = Math.pow(Math.max(0, 1 - d / 165), 1.6) * 0.42; if (y > 138 && x > 150 && x < 310) w += 0.06;
    if (w > 0.02) { I.push(y * 320 + x); W.push(w); } }
  return (e_brillo = { I: Int32Array.from(I), W: Float32Array.from(W) });
}

function e_salon(R, t, o) {
  const info = e_capa(R, 'salon', () => e_salonFijo(R));
  const { rect, pset, disco, linea, poligono } = R, B = R.buf;
  // la ciudad por la ventana: ventanas que se encienden y apagan, coches por el puente, la antena, un avión
  R.recorte(E_VENT);
  for (let k = 0; k < e_luces.length; k += 3) { const [x, y, c] = e_luces[k]; pset(x, y, h(k, Math.floor(t / 2.5 + k * 0.13), 918) < 0.55 ? c : hex('#22243e')); }
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * (9 + k * 5) + k * 40) % 80) + 14), dir = k % 2 ? -1 : 1, px = dir > 0 ? x : 108 - x; pset(px, 85, dir > 0 ? hex('#fff0b0') : hex('#ff5a4a')); pset(px + dir, 85, dir > 0 ? hex('#a89870') : hex('#8a2a2a')); }
  if (Math.floor(t * 1.5) % 2) pset(40, 39, hex('#ff4a4a'));
  { const ax = Math.round(90 - ((t * 6) % 90)); pset(ax, 38 + Math.round(ax * 0.05), Math.floor(t * 3) % 2 ? hex('#ff6a6a') : C.blanco); }
  for (let x = 26; x <= 82; x++) if (((x + Math.floor(t * 4)) % 9) < 2) pset(x, 90 + (x % 3), hex('#4a4a70'));   // el río se mueve
  R.recorte(null);
  rect(53, 32, 55, 94, hex('#8a88a6')); rect(55, 32, 55, 94, hex('#5a5878')); rect(26, 62, 82, 63, hex('#8a88a6')); rect(26, 63, 82, 63, hex('#5a5878'));
  for (const [gx, gy] of [[30, 50], [60, 40]]) for (let i = 0; i < 6; i++) e_tono(R, gx + i, gy - i, 0.15);   // reflejos en el cristal
  // las cortinas, que se mecen
  for (const [xa, lado] of [[12, 1], [96, -1]]) for (let y = 26; y < 108; y++) { const w = 12 + Math.round(Math.sin(t * 0.8 + y * 0.07 + lado) * 1.5 + (y - 26) * 0.03);
    for (let i = 0; i <= w; i++) { const x = xa + i * lado, f = (i + Math.round(Math.sin(y * 0.05 + t * 0.8) * 1.2)) % 4; pset(x, y, i === w ? C.k : f === 1 ? hex('#6a3a4a') : f === 3 ? hex('#3e2030') : hex('#552c3c')); } }
  // los peces y las burbujas de la pecera
  R.recorte([100, 80, 130, 88]);
  for (let k = 0; k < 3; k++) { const u = (t * (0.18 + k * 0.05) + k * 0.33) % 2, dir = u < 1 ? 1 : -1, fx = Math.round(101 + (u < 1 ? u : 2 - u) * 26), fy = 82 + k * 2 + Math.round(Math.sin(t * 2 + k) * 1);
    const col = [hex('#f08a3a'), hex('#f0d040'), hex('#e85a6a')][k]; rect(fx, fy, fx + 2, fy + 1, col); pset(fx + (dir > 0 ? -1 : 3), fy, col); pset(fx + (dir > 0 ? -1 : 3), fy + 1, col); pset(fx + (dir > 0 ? 2 : 0), fy, C.k); }
  for (let k = 0; k < 4; k++) { const y = 88 - Math.floor(((t * 6 + k * 3) % 9)); pset(122 + (k % 2), y, hex('#a8e0f8')); }
  R.recorte(null);
  // las velas que titilan
  for (const [cx, al] of [[188, 7], [196, 5]]) { const f = Math.sin(t * 9 + cx) > 0.2 ? 1 : 0; pset(cx, 35 - al - 1, C.k); pset(cx, 35 - al - 2, hex('#ffb040')); pset(cx, 35 - al - 3 - f, hex('#fff0a0'));
    for (let j = 0; j < 6; j++) for (let i = -3; i <= 3; i++) if (Math.abs(i) + j < 5 && (i + j + Math.floor(t * 6)) % 3 === 0) e_tono(R, cx + i, 35 - al - 2 + j - 3, 0.12, hex('#ffd080')); }
  // el router y la consola parpadean; el móvil de la mesita se enciende de vez en cuando
  for (let k = 0; k < 4; k++) if (h(k, Math.floor(t * 4), 919) < 0.6) pset(238 + k * 3, 132, k === 3 ? hex('#f0a040') : hex('#5af07a'));
  pset(231, 131, hex('#4a8af0'));
  if ((t % 6) < 1.4) { rect(14, 110, 20, 111, hex('#a0c8f8')); pset(17, 110, C.blanco); for (let i = -4; i <= 4; i++) e_tono(R, 17 + i, 109, 0.15, hex('#a0c8f8')); }
  // el gato dormido en la alfombra: respira, mueve una oreja y la punta de la cola
  e_gato(R, t, 244, 168);
  // la tele
  const col = e_tele(R, t, o);
  // la luz de la tele baila por la habitación
  const fl = 0.7 + 0.3 * Math.sin(t * 7.3) * Math.sin(t * 2.1 + 1) + (col.flash ?? 0), { I, W } = e_brilloSalon();
  for (let i = 0; i < I.length; i++) B[I[i]] = e_mez(B[I[i]], col.c, Math.min(0.75, W[i] * fl));
  // motas de polvo en la luz de la lámpara
  for (let k = 0; k < 9; k++) { const x = Math.round(146 + h(k, 1, 920) * 22 + Math.sin(t * 0.6 + k) * 3), y = Math.round(64 + ((h(k, 2, 920) * 50 + t * (1.5 + h(k, 3, 920))) % 50)); if (Math.sin(t * 1.7 + k * 2) > -0.3) e_tono(R, x, y, 0.4, hex('#ffe8b0')); }
  if (o.movil) for (let i = 0; i < 57600; i++) B[i] = e_mez(B[i], 0xff1a0808, 0.5);
  return { ...info, programa: col.p };
}
// la imagen de la tele: el documental de «civilización perdida» (devuelve el color de su luz y el programa)
function e_tele(R, t, o) {
  const { pset, disco, linea, poligono } = R, B = R.buf, [X0, Y0, X1, Y1] = E_TV, DUR = 3.2;
  const p = o.programa ?? Math.floor(t / DUR) % 4, f = (t % DUR) / DUR, fila = (y, a, b, c) => { for (let x = Math.max(X0, a); x <= Math.min(X1, b); x++) B[y * 320 + x] = c; };
  const llena = (fn) => { for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) B[y * 320 + x] = fn(x, y); };
  R.recorte(E_TV); let c = hex('#6aa8e0'), flash = 0;
  if (p === 0) {
    // un barco antiguo atrapado en el hielo, con la aurora y la nieve
    const S = [hex('#06102a'), hex('#0e2240'), hex('#1e4060'), hex('#4a7894')], HI = [hex('#e8f2f8'), hex('#c8dcea'), hex('#a0bcd2')];
    llena((x, y) => { const v = y - Y0; if (v < 30) return e_grad(v / 30, S, x, y);
      const n = e_ruido((x + t * 1.5) / 7, y / 3, 921); return n < 0.22 ? hex('#1e3a56') : n < 0.27 ? hex('#6a8aa8') : e_grad((v - 30) / 27 + (n - 0.5) * 0.4, HI, x, y); });
    for (let x = X0; x <= X1; x++) { const yb = Y0 + 6 + Math.round(3 * Math.sin(x * 0.07 + t * 0.9) + 2 * Math.sin(x * 0.19 - t * 0.6)); for (let j = 0; j < 10; j++) if (e_bayer(x, yb + j) < (1 - j / 10) * 0.75) pset(x, yb + j, j < 3 ? hex('#8af0c0') : hex('#3ab88a')); }
    for (let k = 0; k < 14; k++) pset(X0 + Math.floor(h(k, 1, 922) * 112), Y0 + 1 + Math.floor(h(k, 2, 922) * 14), Math.sin(t * 3 + k) > 0 ? C.blanco : hex('#8aa0c8'));
    for (let x = X0; x <= X1; x++) { const al = Math.round(3 + 3 * e_ruido(x / 5, 1, 923)); for (let j = 0; j < al; j++) pset(x, Y0 + 30 - j, j === al - 1 ? C.blanco : hex('#b8d0e4')); }
    const sx = X0 + 56 + Math.round(Math.sin(t * 0.4) * 3), sy = Y0 + 40, K = hex('#1e120c');
    poligono([[sx - 28, sy - 10], [sx + 20, sy - 12], [sx + 30, sy - 22], [sx + 26, sy + 2], [sx - 24, sy + 5]], K);
    poligono([[sx - 26, sy - 9], [sx + 20, sy - 11], [sx + 27, sy - 19], [sx + 24, sy + 1], [sx - 22, sy + 3]], hex('#5a3a24'));
    for (let j = 0; j < 3; j++) linea(sx - 24, sy - 5 + j * 3, sx + 24, sy - 7 + j * 3, hex('#3e2818')); linea(sx - 26, sy - 9, sx + 20, sy - 11, hex('#8a6040'));
    for (const [mx, al] of [[sx - 8, 34], [sx + 8, 28]]) { linea(mx, sy - 10, mx + 2, sy - 10 - al, K); linea(mx + 1, sy - 10, mx + 3, sy - 10 - al, K); linea(mx - 8, sy - 6 - al, mx + 12, sy - 8 - al, K);
      poligono([[mx - 6, sy - 5 - al], [mx + 10, sy - 7 - al], [mx + 8, sy - 22], [mx - 4, sy - 20]], hex('#b8ac90')); for (let k = 0; k < 4; k++) pset(mx - 2 + k * 3, sy - 14 - al / 3 + k, hex('#1e4060')); }
    for (let k = 0; k < 7; k++) disco(sx - 26 + k * 9, sy + 4 + (k % 2), 4, k % 2 ? hex('#e8f2f8') : hex('#c8dcea'));
    for (let k = 0; k < 30; k++) pset(X0 + Math.floor((h(k, 1, 924) * 113 + t * 6) % 113), Y0 + Math.floor((h(k, 2, 924) * 57 + t * 10) % 57), C.blanco);
    c = hex('#6aa0e8');
  } else if (p === 1) {
    // una ciudad de pirámides y columnas que se hunde en el mar, al atardecer
    const S = [hex('#2a1430'), hex('#5a2240'), hex('#b8484a'), hex('#f09a5a')], wy = Y0 + 34, s = Math.round(f * 16);
    llena((x, y) => y < wy ? e_grad((y - Y0) / 34, S, x, y) : e_grad((y - wy) / 23, [hex('#2a3a5a'), hex('#1a2844'), hex('#0e1830')], x, y));
    disco(X0 + 84, wy - 2, 9, hex('#f8d890')); disco(X0 + 84, wy - 2, 6, hex('#fff0c0'));
    for (const [cx, cy, w] of [[X0 + 20, Y0 + 10, 16], [X0 + 70, Y0 + 6, 22], [X0 + 100, Y0 + 16, 14]]) { const dx = Math.round((t * 2 + cx) % 130) - 10; for (let i = -w; i <= w; i++) { const al = Math.round(3 * Math.sqrt(1 - (i / w) ** 2)); for (let j = -al; j <= 0; j++) pset(cx + dx - 40 + i, cy + j, j === 0 ? hex('#7a2a40') : hex('#4a1a34')); } }
    const P = hex('#8a6058'), PL = hex('#c88a6a'), PS = hex('#5a3a3a'), bx = X0 + 36, by = wy + s;
    for (let k = 0; k < 5; k++) { const w = 22 - k * 4, y0 = by - (k + 1) * 4; for (let y = y0; y < y0 + 4; y++) for (let x = bx - w; x <= bx + w; x++) pset(x, y, x < bx - w + 2 ? PL : x > bx + w - 3 ? PS : P); }
    for (let k = 0; k < 5; k++) { const cx = X0 + 64 + k * 6; for (let y = by - 18; y < by; y++) { pset(cx, y, PL); pset(cx + 1, y, P); pset(cx + 2, y, PS); } }
    for (let x = X0 + 60; x < X0 + 94; x++) { pset(x, by - 19, P); pset(x, by - 20, PL); } for (let x = X0 + 62; x < X0 + 92; x++) pset(x, by - 21 - Math.round(4 * (1 - Math.abs((x - X0 - 77) / 15))), PS);
    for (let k = 0; k < 6; k++) if (h(k, Math.floor(t * 2), 925) < 0.6) pset(bx - 8 + k * 3, by - 6 - (k % 3) * 4, hex('#f8d060'));
    for (let y = wy; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const i = y * 320 + x; B[i] = e_grad((y - wy) / 23, [hex('#2a3a5a'), hex('#1a2844'), hex('#0e1830')], x, y);
      if (((x + Math.floor(t * 10) + (y - wy) * 5) % 11) < 2 && (y - wy) % 3 === 0) B[i] = hex('#5a7aa0');
      if (Math.abs(x - X0 - 84) < 6 - (y - wy) * 0.15 && ((x + y + Math.floor(t * 8)) % 3 === 0)) B[i] = hex('#f8c070'); }
    for (let x = bx - 26; x < X0 + 98; x++) if (h(x, Math.floor(t * 8), 926) < 0.5) pset(x, wy - (h(x, 3, 926) < 0.3 ? 1 : 0), C.blanco);
    if (f > 0.5 && f < 0.56) { flash = 0.5; linea(X0 + 30, Y0, X0 + 26, Y0 + 12, C.blanco); linea(X0 + 26, Y0 + 12, X0 + 32, Y0 + 22, C.blanco); for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) if ((x + y) & 1) B[y * 320 + x] = e_mez(B[y * 320 + x], C.blanco, 0.5); }
    c = hex('#e88a50');
  } else if (p === 2) {
    // un pilar en T bajo los focos, con niebla y unas figuritas al pie para la escala
    llena((x, y) => e_grad((y - Y0) / 57, [hex('#0c0806'), hex('#1a1008'), hex('#2e1e10')], x, y));
    for (const [ox, fase] of [[X0 + 14, 0], [X1 - 14, 2]]) { const a = Math.sin(t * 0.9 + fase) * 0.5; for (let y = Y0; y <= Y1; y++) { const d = y - Y0, cx = ox + d * Math.sin(a), w = 2 + d * 0.3; for (let x = Math.round(cx - w); x <= cx + w; x++) if (x >= X0 && x <= X1 && e_bayer(x, y) < 0.45) B[y * 320 + x] = e_mez(B[y * 320 + x], hex('#e8b870'), 0.3); } }
    const z = 1 + f * 0.25, cx = X0 + 56, base = Y1 - 5, sw = Math.round(8 * z), cw = Math.round(17 * z), alto = Math.round(38 * z), ct = base - alto;
    for (let y = ct; y <= base; y++) { const cab = y < ct + Math.round(8 * z), w = cab ? cw : sw; for (let x = cx - w; x <= cx + w; x++) pset(x, y, x === cx - w || x === cx + w || y === ct ? hex('#2a1608') : x < cx - w * 0.4 ? hex('#f0c070') : x < cx + w * 0.3 ? hex('#d09048') : hex('#7a4a20')); }
    for (let k = 0; k < 2; k++) { const ay = ct + Math.round((14 + k * 10) * z); linea(cx - sw + 2, ay, cx - 1, ay + 3, hex('#7a4a20')); linea(cx + sw - 2, ay, cx + 1, ay + 3, hex('#7a4a20')); }
    for (const fx of [cx - 22, cx + 20, cx + 26]) { pset(fx, base - 3, C.k); pset(fx, base - 2, C.k); pset(fx, base - 1, C.k); pset(fx, base - 4, hex('#3a2a20')); }
    for (let y = Y1 - 8; y <= Y1; y++) for (let x = X0; x <= X1; x++) if (e_ruido((x + t * 6) / 9, y / 3, 927) > 0.45 && e_bayer(x, y) < 0.6) B[y * 320 + x] = e_mez(B[y * 320 + x], hex('#8a6a4a'), 0.5);
    for (let k = 0; k < 12; k++) pset(X0 + Math.floor((h(k, 1, 928) * 113 + t * 3) % 113), Y0 + Math.floor((h(k, 2, 928) * 50 + Math.sin(t + k) * 3 + 57) % 50), hex('#f0d0a0'));
    c = hex('#e0a050');
  } else {
    // un cometa que cruza el cielo y estalla en el horizonte
    llena((x, y) => e_grad((y - Y0) / 57, [hex('#04060e'), hex('#0a1028'), hex('#18204a')], x, y));
    for (let k = 0; k < 24; k++) { const tw = Math.sin(t * (2 + h(k, 3, 929) * 3) + k); if (tw > -0.5) pset(X0 + Math.floor(h(k, 1, 929) * 113), Y0 + Math.floor(h(k, 2, 929) * 44), tw > 0.6 ? C.blanco : hex('#6a7ab0')); }
    const u = Math.min(1, f * 1.15), hx = Math.round(X1 + 6 - u * 92), hy = Math.round(Y0 + 2 + u * 42);
    for (let d = 40; d > 0; d--) { const x = hx + d, y = hy - Math.round(d * 0.46); const col = d < 6 ? hex('#ffffff') : d < 16 ? hex('#a8d8ff') : hex('#4a7ac8'); if (d < 18 || e_bayer(x, y) < 1 - d / 40) { pset(x, y, col); if (d < 24) pset(x, y + 1, col); } }
    disco(hx, hy, 2, hex('#e8f8ff')); pset(hx, hy, C.blanco);
    for (let k = 0; k < 3; k++) pset(hx + 6 + k * 5, hy - 4 - k * 2 + (k % 2) * 3, hex('#c8e8ff'));
    for (let x = X0; x <= X1; x++) { const al = Math.round(5 + 4 * e_ruido(x / 9, 2, 930)); for (let y = Y1 - al; y <= Y1; y++) pset(x, y, hex('#0a0e1c')); }
    if (u >= 0.92) { const g = (f - 0.92 / 1.15) * 12; flash = Math.max(0, 0.6 - g * 0.1); for (let y = Y0 + 30; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const d = Math.hypot(x - (X0 + 30), (y - (Y1 - 8)) * 1.6); if (d < 6 + g * 10) B[y * 320 + x] = e_mez(B[y * 320 + x], d < 4 + g * 4 ? hex('#fff0c0') : hex('#f08a3a'), 0.7); } }
    c = hex('#9ab8ff');
  }
  // el rótulo del documental (barras, sin letras), que entra de lado
  if (f > 0.1 && f < 0.8) { const dx = Math.round(-60 * (1 - e_suave((f - 0.1) / 0.08))), y0 = Y1 - 12;
    for (let y = y0; y <= y0 + 7; y++) for (let x = X0 + 4 + dx; x <= X0 + 62 + dx; x++) if (x >= X0) B[y * 320 + x] = x < X0 + 6 + dx ? hex('#c83a3a') : e_mez(B[y * 320 + x], hex('#0a0a12'), 0.75);
    for (const [px, py] of [[8, 3], [9, 2], [10, 2], [11, 2], [12, 3], [9, 4], [10, 4], [11, 4], [10, 3]]) pset(X0 + px + dx, y0 + py + 0, py === 3 && px === 10 ? hex('#c83a3a') : C.blanco);   // el ojo
    fila(y0 + 2, X0 + 16 + dx, X0 + 52 + dx, hex('#e8e8f0')); fila(y0 + 5, X0 + 16 + dx, X0 + 40 + dx, hex('#9a9ab0')); }
  // la nieve entre programa y programa
  if (f > 0.94) { const fr = Math.floor(t * 30); for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const v = h(x, y + fr * 7, 931); B[y * 320 + x] = v < 0.33 ? hex('#1a1a22') : v < 0.66 ? hex('#7a7a88') : hex('#d8d8e0'); } c = hex('#b0b0c0'); }
  R.recorte(null);
  // el reflejo del cristal
  for (let y = Y0; y <= Y1; y++) { const x0 = X0 + 66 + Math.round((y - Y0) * 0.55); for (let x = x0; x < x0 + 5; x++) if (x <= X1 && ((x + y) & 1)) B[y * 320 + x] = e_mez(B[y * 320 + x], C.blanco, 0.1); }
  return { c, flash, p };
}

// el asiento y los brazos del sofá (por delante del espectador), su manta y su cojín; con o.movil, el móvil en primer plano
function e_salonDelante(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R;
  const F = hex('#2e4c5a'), FL = hex('#3e6270'), FS = hex('#203844'), FD = hex('#152836');
  // el asiento: dos cojines con su cara de arriba, el frente con la trama, el ribete y las patas
  rect(38, 139, 140, 157, C.k);
  for (let k = 0; k < 2; k++) { const x0 = 39 + k * 51, x1 = x0 + 50;
    for (let y = 140; y <= 156; y++) for (let x = x0; x <= x1; x++) pset(x, y, y < 144 ? (y === 140 ? FL : (x + y) & 1 ? FL : F) : y === 144 ? FD : y > 153 ? FS : x === x0 ? FL : x === x1 ? FD : (x + y) & 1 ? F : e_mez(F, FS, 0.35)); }
  for (const px of [44, 134]) { rect(px - 1, 157, px + 2, 161, C.k); rect(px, 157, px + 1, 160, hex('#6a4a30')); }
  // los brazos, redondeados arriba
  for (const [x0, x1] of [[22, 38], [140, 156]]) { rect(x0, 120, x1, 157, C.k);
    for (let y = 117; y <= 156; y++) for (let x = x0 + 1; x <= x1 - 1; x++) { const ex = (x - x0) / (x1 - x0); if (y < 124 && Math.hypot((ex - 0.5) * 16, y - 124) > 8) continue;
      pset(x, y, y < 120 ? (ex < 0.5 ? FL : F) : ex < 0.2 ? FL : ex > 0.8 ? FS : y > 153 ? FS : (x + y) & 1 ? F : e_mez(F, FS, 0.3)); }
    for (let x = x0 + 2; x < x1 - 1; x++) pset(x, 125, FD); rect(x0 + 2, 154, x1 - 2, 154, FD); }
  for (let y = 117; y <= 125; y++) for (const x0 of [22, 140]) for (let x = x0; x <= x0 + 16; x++) { const ex = (x - x0) / 16; if (Math.abs(Math.hypot((ex - 0.5) * 16, y - 124) - 8) < 0.7 && y < 124) pset(x, y, C.k); }
  // la manta de rayas sobre el brazo izquierdo, con flecos que se mueven un poco
  for (let y = 118; y <= 150; y++) { const w = 7 + Math.round((y - 118) * 0.15); for (let x = 26 - Math.round((y - 118) * 0.1); x < 26 + w; x++) pset(x, y, ((y >> 2) & 1) ? hex('#d8b860') : hex('#e8dcc0')); pset(26 - Math.round((y - 118) * 0.1) - 1, y, C.k); }
  for (let x = 22; x < 37; x += 2) pset(x + Math.round(Math.sin(t * 2 + x) * 0.6), 151, hex('#d8b860'));
  // el cojín de mostaza en la esquina derecha
  poligono([[124, 127], [139, 125], [140, 141], [123, 142]], C.k); poligono([[125, 128], [138, 126], [139, 140], [124, 141]], hex('#c8902a'));
  for (let k = 0; k < 3; k++) linea(126, 131 + k * 3, 137, 130 + k * 3, hex('#a8721e')); pset(126, 129, hex('#e8b04a')); pset(127, 129, hex('#e8b04a'));
  // la luz de la tele en el lado derecho del sofá
  for (let y = 118; y < 157; y++) for (let x = 150; x <= 156; x++) if (((x + y) & 1) === 0) e_tono(R, x, y, 0.12, hex('#8ab0e0'));
  if (o.movil) e_movil(R, t, o);
}

// el móvil en primer plano con los vídeos verticales que se deslizan, sujeto por una mano y pasado por la otra
function e_movil(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, B = R.buf, X0 = 132, Y0 = 46, X1 = 188, Y1 = 166, HH = Y1 - Y0 + 1, PER = 1.8, PASA = 0.36;
  // la carcasa con su canto de luz, botones y altavoz
  rect(128, 36, 192, 179, C.k); rect(129, 37, 191, 179, hex('#24242e')); rect(130, 38, 190, 179, hex('#14141a')); rect(129, 37, 129, 179, hex('#5a5a6a')); rect(129, 37, 191, 37, hex('#5a5a6a'));
  rect(193, 64, 194, 78, hex('#3a3a46')); rect(193, 84, 194, 92, hex('#3a3a46')); rect(152, 40, 168, 41, hex('#2e2e3a')); disco(174, 41, 1, hex('#2a3a5a'));
  // el carrusel de vídeos
  const pos = t / PER, idx = Math.floor(pos), fr = pos - idx, s = fr < 1 - PASA / PER ? 0 : e_suave((fr - (1 - PASA / PER)) / (PASA / PER)), off = Math.round(s * HH);
  R.recorte([X0, Y0, X1, Y1]);
  for (const [k, y0] of [[idx, Y0 - off], [idx + 1, Y0 + HH - off]]) if (y0 < Y1 && y0 + HH > Y0) e_video(R, t, k, X0, y0, X1, y0 + HH - 1, k === idx ? fr : 0);
  R.recorte(null);
  // la barra de estado: cobertura y batería (símbolos)
  for (let k = 0; k < 4; k++) rect(X0 + 3 + k * 2, Y0 + 4 - k, X0 + 3 + k * 2, Y0 + 4, C.blanco); rect(X1 - 10, Y0 + 2, X1 - 3, Y0 + 5, C.blanco); rect(X1 - 9, Y0 + 3, X1 - 6, Y0 + 4, hex('#5af07a')); pset(X1 - 2, Y0 + 3, C.blanco); pset(X1 - 2, Y0 + 4, C.blanco);
  for (let y = Y0; y <= Y1; y++) { const x0 = X0 + 34 + Math.round((y - Y0) * 0.3); for (let x = x0; x < x0 + 4; x++) if (x <= X1 && (x + y) & 1) B[y * 320 + x] = e_mez(B[y * 320 + x], C.blanco, 0.07); }   // el reflejo
  // la mano que lo sujeta (a la izquierda) y el brazo cuyo dedo pasa los vídeos (a la derecha)
  brazo(R, 110, 188, 124, 156, '#3a5a7a', 1, { sombra: false });
  const sube = fr > 1 - PASA / PER ? Math.sin(s * Math.PI) : 0, yd = Math.round(150 - sube * 16 + Math.sin(t * 1.3) * 1.5);
  brazo(R, 216, 190, 202, yd, '#3a5a7a', -1, { sombra: false });
}

// un vídeo vertical del carrusel (k: cuál; fr: lo que lleva visto)
function e_video(R, t, k, x0, y0, x1, y1, fr) {
  const { pset, disco, linea, poligono } = R, B = R.buf, tipo = ((k % 3) + 3) % 3, cx = Math.round((x0 + x1) / 2) - 4, cy = y0 + 52;
  const FONDOS = [[hex('#1a0e2e'), hex('#3a1e5a'), hex('#6a3a8a')], [hex('#06141e'), hex('#0e2e3e'), hex('#1e5a6a')], [hex('#1e0a0a'), hex('#4a1a14'), hex('#9a4a24')]][tipo];
  for (let y = Math.max(y0, 0); y <= Math.min(y1, 179); y++) for (let x = x0; x <= x1; x++) if (y >= 46 && y <= 166) B[y * 320 + x] = e_grad((y - y0) / (y1 - y0), FONDOS, x, y);
  for (let j = 0; j < 10; j++) { const px = x0 + Math.floor(h(j, k, 932) * 56), py = y0 + Math.floor(h(j, k + 1, 932) * 70); if (Math.sin(t * 3 + j) > 0) pset(px, py, hex('#c8c8f0')); }
  if (tipo === 0) {   // el ojo dentro de la pirámide, con rayos
    for (let a = 0; a < 12; a++) { const an = a * Math.PI / 6 + t * 0.3; for (let d = 26; d < 34; d++) if (d % 2) pset(Math.round(cx + Math.cos(an) * d), Math.round(cy + Math.sin(an) * d), hex('#c8a0f0')); }
    poligono([[cx - 22, cy + 16], [cx, cy - 22], [cx + 22, cy + 16]], hex('#e8c870')); poligono([[cx - 18, cy + 14], [cx, cy - 17], [cx + 18, cy + 14]], hex('#b8903a'));
    for (let y = cy - 8; y < cy + 14; y += 4) linea(cx - (y - cy + 17) * 0.55, y, cx + (y - cy + 17) * 0.55, y, hex('#9a7430'));
    const parp = (t + k) % 3 < 0.12; for (let i = -7; i <= 7; i++) { const a = Math.round(Math.sqrt(1 - (i / 7.5) ** 2) * (parp ? 0 : 4)); for (let j = -a; j <= a; j++) pset(cx + i, cy + j, Math.abs(i) < 3 && Math.abs(j) < 3 ? C.k : C.blanco); pset(cx + i, cy - a - 1, C.k); pset(cx + i, cy + a + 1, C.k); }
    if (!parp) { disco(cx, cy, 2, hex('#6a2a9a')); pset(cx, cy, C.k); pset(cx - 1, cy - 1, C.blanco); }
  } else if (tipo === 1) {   // la pirámide de noche con su rayo al cielo
    linea(cx - 32, cy + 24, cx + 32, cy + 24, hex('#c8a060')); for (let y = cy + 25; y < cy + 34; y++) linea(cx - 32, y, cx + 32, y, hex('#5a4024'));
    for (let y = cy - 58; y < cy - 6; y++) { const w = 1 + (y - cy + 58) * 0.06; for (let x = Math.round(cx - w); x <= cx + w; x++) if (e_bayer(x, y) < 0.6 + Math.sin(t * 8) * 0.2) pset(x, y, hex('#a8f0ff')); }
    for (let y = cy - 6; y <= cy + 24; y++) { const w = (y - cy + 6) * 1.05; for (let x = Math.round(cx - w); x <= cx + w; x++) pset(x, y, x < cx ? hex('#d8b070') : hex('#9a7040')); }
    for (let y = cy; y < cy + 24; y += 4) linea(cx - (y - cy + 6) * 1.05, y, cx + (y - cy + 6) * 1.05, y, hex('#7a5630'));
    disco(cx, cy - 6, 2, hex('#e8ffff'));
  } else {   // el cometa que cae sobre una colina
    for (let d = 46; d > 0; d--) { const x = cx - 6 + d, y = cy - 6 - Math.round(d * 0.8); const col = d < 6 ? C.blanco : d < 18 ? hex('#ffd890') : hex('#e86a3a'); if (d < 18 || e_bayer(x, y) < 1 - d / 46) { pset(x, y, col); pset(x + 1, y, col); } }
    disco(cx - 6, cy - 6, 4, hex('#fff0c0')); disco(cx - 6, cy - 6, 2, C.blanco);
    for (let x = x0; x <= x1; x++) { const al = Math.round(10 + 8 * Math.sin((x - x0) * 0.06)); for (let y = cy + 30 - al; y <= cy + 34; y++) pset(x, y, y === cy + 30 - al ? hex('#7a3a2a') : hex('#2a1210')); }
    for (let a = 0; a < 8; a++) { const r = 6 + ((t * 10) % 8); pset(Math.round(cx - 6 + Math.cos(a) * r), Math.round(cy - 6 + Math.sin(a) * r), hex('#ffd890')); }
  }
  // la columna de la derecha: corazón que late, bocadillo, flecha, con sus números
  const rx = x1 - 10, late = Math.sin(t * 6 + k) > 0.6 ? 1 : 0;
  for (const [dx, dy] of [[-2, -1], [-1, -2], [0, -1], [1, -2], [2, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [0, 2]]) { pset(rx + dx * (1 + late * 0.2) + 1, y0 + 66 + dy, hex('#f04a6a')); }
  R.numero(String(400 + ((k * 7919) % 500) + Math.floor(t * 3)), rx + 1, y0 + 78, { color: C.blanco, centro: true, sombra: false, fina: true });
  for (let i = -3; i <= 3; i++) for (let j = -2; j <= 2; j++) if (Math.abs(i) + Math.abs(j) < 5) pset(rx + 1 + i, y0 + 86 + j, C.blanco); pset(rx - 1, y0 + 89, C.blanco);
  R.numero(String(20 + ((k * 131) % 70)), rx + 1, y0 + 98, { color: C.blanco, centro: true, sombra: false, fina: true });
  linea(rx - 2, y0 + 108, rx + 3, y0 + 104, C.blanco); linea(rx + 3, y0 + 104, rx + 3, y0 + 107, C.blanco); linea(rx + 3, y0 + 104, rx, y0 + 104, C.blanco);
  // abajo: el avatar, el rótulo en barras y la barra de progreso
  disco(x0 + 6, y1 - 16, 3, C.blanco); disco(x0 + 6, y1 - 16, 2, [hex('#e8a040'), hex('#40a8e8'), hex('#e84a6a')][tipo]);
  for (let x = x0 + 11; x < x0 + 34; x++) { pset(x, y1 - 17, C.blanco); } for (let x = x0 + 4; x < x0 + 40; x++) pset(x, y1 - 11, hex('#c8c8d8')); for (let x = x0 + 4; x < x0 + 28; x++) pset(x, y1 - 8, hex('#c8c8d8'));
  for (let x = x0; x <= x1; x++) pset(x, y1 - 2, x < x0 + (x1 - x0) * fr ? C.blanco : hex('#5a5a6a'));
}

// los puntos de las «constelaciones» sobre los relieves del pilar 43, y las líneas que los unen (por orden)
const E_ESTRELLAS = [[132, 76], [102, 66], [140, 94], [178, 66], [166, 62], [140, 113], [148, 126], [180, 118], [196, 70], [202, 98], [128, 40], [196, 40], [122, 122]];

const E_LINEAS = [[0, 1], [0, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 7], [3, 8], [8, 9], [9, 7], [1, 10], [10, 11], [11, 8], [5, 12]];

// el muro de piedra seca a hiladas, con luz arriba a la izquierda (y0–y1; k: la semilla)
function e_muroSeco(R, x0, y0, x1, y1, k, oscuro = 0) {
  const { rect, pset } = R, B = R.buf, J = hex('#4a3826'), PIE = [hex('#b8a47e'), hex('#a89470'), hex('#c4b08a'), hex('#988462'), hex('#ae9a74')];
  rect(x0, y0, x1, y1, J);
  for (let y = y0, f = 0; y < y1; f++) { const al = 5 + Math.floor(h(f, 1, 940 + k) * 4); let x = x0 - Math.floor(h(f, 2, 940 + k) * 12);
    while (x < x1) { const w = 9 + Math.floor(h(x, f, 941 + k) * 16), c = PIE[Math.floor(h(x, f, 942 + k) * 5)], r = 2;
      for (let j = 0; j < al - 1; j++) for (let i = 0; i < w - 1; i++) { const px = x + i, py = y + j; if (px < x0 || px > x1 || py > y1) continue;
        if ((i < r || i > w - 2 - r) && (j < 1 || j > al - 3) && h(px, py, 943) < 0.7) continue;   // las esquinas redondeadas
        const n = h(px >> 1, py, 944 + k); let col = n < 0.15 ? e_mez(c, J, 0.3) : n > 0.9 ? e_mez(c, C.blanco, 0.15) : c;
        if (j === 0) col = e_mez(c, C.blanco, 0.3); else if (j >= al - 3 || i >= w - 3) col = e_mez(c, J, 0.4); else if (i === 0) col = e_mez(c, C.blanco, 0.18);
        const sombra = oscuro + (py - y0) / (y1 - y0) * 0.25; if (sombra > 0 && e_bayer(px, py) < sombra * 1.6) col = e_mez(col, J, 0.25);
        B[py * 320 + px] = col; }
      if (h(x, f, 945 + k) < 0.3) { rect(x + w - 2, y + 1, x + w, y + 2, e_mez(PIE[1], J, 0.2)); pset(x + w - 1, y + 1, PIE[2]); }   // las cuñas
      x += w + 1; }
    y += al; }
}

// lo fijo de la piedra del buitre
function e_buitreFijo(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf;
  // la membrana blanca de la cubierta, con sus costuras curvas y una viga
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) { const s = Math.sin(x * 0.045) * 4 + y; B[y * 320 + x] = e_grad(s / 18 + 0.1, [hex('#d8d6cc'), hex('#c4c2b8'), hex('#aeaca2')], x, y); if (((x + 40) % 64) < 1 || Math.abs(y - 6 - Math.sin(x * 0.045) * 3) < 0.5) B[y * 320 + x] = hex('#bab8ae'); }
  linea(180, 0, 250, 13, hex('#8a8e96')); linea(181, 0, 251, 13, hex('#6a6e76'));
  // la pasarela del otro lado: la pared de tierra a la sombra, el tablado y la barandilla (los visitantes, en cada fotograma)
  for (let y = 14; y < 30; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = e_grad((y - 14) / 16 + (h(x >> 1, y, 946) - 0.5) * 0.3, [hex('#8a7a62'), hex('#7a6850'), hex('#5e4e3a')], x, y);
  rect(0, 25, 319, 27, hex('#8a6a48')); rect(0, 25, 319, 25, hex('#a8885e')); for (let x = 0; x < 320; x += 7) pset(x, 26, hex('#5a4430')); rect(0, 28, 319, 29, hex('#3a2e22'));
  // el muro del recinto, detrás del pilar
  e_muroSeco(R, 0, 30, 319, 150, 0, 0.05);
  // el rayo de sol que entra por un hueco de la cubierta
  for (let y = 0; y < 150; y++) { const x0 = 20 + y * 0.55; for (let x = Math.round(x0); x < x0 + 34; x++) if (x < 320 && e_bayer(x, y) < 0.5) B[y * 320 + x] = e_mez(B[y * 320 + x], hex('#fff4d8'), 0.14); }
  // el suelo excavado: tierra con piedrecitas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const n = e_ruido(x / 6, y / 3, 947); B[y * 320 + x] = e_grad((y - 150) / 40 + n * 0.5, [hex('#7a5c40'), hex('#8a6a4a'), hex('#9a7a56')], x, y); }
  for (let k = 0; k < 90; k++) { const x = Math.floor(h(k, 1, 948) * 320), y = 152 + Math.floor(h(k, 2, 948) * 27), r = h(k, 3, 948) < 0.2 ? 2 : 1; disco(x, y, r, hex('#6a5038')); pset(x - 1 + (r > 1 ? 0 : 1), y - r + 1, hex('#c8b08a')); }
  rect(0, 150, 319, 150, hex('#5a4430'));
  // el pilar 43: piedra con vetas, manchas, grietas y desconchones; cabeza (x 90–232, y 24–58) y fuste (x 106–216)
  const PI = [hex('#e2d0a6'), hex('#d2bf95'), hex('#bea97e'), hex('#a08a62')], dentro = (x, y) => (y >= 24 && y < 58 && x >= 90 && x <= 232) || (y >= 58 && y <= 150 && x >= 106 && x <= 216);
  for (let y = 24; y <= 150; y++) for (let x = 90; x <= 232; x++) { if (!dentro(x, y)) continue; const cab = y < 58, xa = cab ? 90 : 106, xb = cab ? 232 : 216;
    const borde = Math.min(x - xa, xb - x, y - 24, cab ? 58 - y : 999); if (borde < 2 && h(x, y, 949) < 0.35) continue;   // el canto mellado
    let v = 0.35 + (e_ruido(x / 9, y / 5, 950) - 0.5) * 0.45 + (h(x, y, 951) - 0.5) * 0.18;
    v += (x - xa) < 3 ? -0.25 : (xb - x) < 5 ? 0.35 : (x - xa) / (xb - xa) * 0.25;
    if (!cab && y < 63) v += 0.4; if (cab && y > 54) v += 0.3; if (y > 132) v += (y - 132) / 60;
    B[y * 320 + x] = e_grad(v, PI, x, y); }
  for (let y = 24; y < 58; y++) if (h(1, y, 952) < 0.5) pset(90, y, hex('#f0e2c0'));
  for (const [gx, gy, n, k] of [[214, 60, 30, 1], [96, 26, 16, 2], [186, 130, 18, 3], [118, 136, 14, 4]]) { let x = gx, y = gy; for (let i = 0; i < n; i++) { pset(x, y, hex('#7a6448')); pset(x + 1, y, hex('#efe2c4')); y++; x += h(i, k, 953) < 0.33 ? -1 : h(i, k, 953) > 0.66 ? 1 : 0; } }
  for (const [cx, cy, r] of [[230, 30, 4], [108, 146, 4], [214, 98, 3]]) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && h(i, j, 954) < 0.8) { const x = cx + i, y = cy + j; if (dentro(x, y)) pset(x, y, i + j < 0 ? hex('#9a8460') : hex('#e8d8b4')); }   // los desconchones
  // los relieves: la luz rasante los saca de la piedra
  e_relieve(R, 92, 26, 230, 148, (K) => {
    // los tres «bolsos» de la cabeza, con un ave, un sapo y un ave dentro
    for (const bx of [128, 162, 196]) { for (let a = Math.PI; a <= Math.PI * 2; a += 0.05) { pset(Math.round(bx + Math.cos(a) * 8), Math.round(36 + Math.sin(a) * 6), K); pset(Math.round(bx + Math.cos(a) * 7), Math.round(36 + Math.sin(a) * 6), K); }
      rect(bx - 13, 36, bx + 13, 37, K); rect(bx - 13, 36, bx - 12, 52, K); rect(bx + 12, 36, bx + 13, 52, K); rect(bx - 13, 51, bx + 13, 52, K); }
    for (const bx of [128, 196]) { disco(bx, 44, 3, K); disco(bx - 4, 41, 2, K); pset(bx - 7, 41, K); linea(bx + 2, 44, bx + 7, 47, K); linea(bx, 47, bx - 1, 49, K); linea(bx + 1, 47, bx + 2, 49, K); }
    disco(162, 45, 4, K); disco(162, 41, 2, K); linea(157, 47, 154, 49, K); linea(167, 47, 170, 49, K); linea(158, 42, 155, 40, K); linea(166, 42, 169, 40, K);
    // el buitre con las alas abiertas y el disco sobre el ala
    for (let j = -11; j <= 11; j++) for (let i = -7; i <= 7; i++) if ((i / 7.5) ** 2 + (j / 11.5) ** 2 <= 1) pset(140 + i, 94 + j, K);
    linea(138, 84, 134, 78, K); linea(139, 84, 135, 78, K); disco(133, 76, 3, K); poligono([[131, 74], [126, 77], [128, 80], [131, 78]], K);
    poligono([[134, 82], [118, 72], [102, 63], [100, 67], [107, 71], [102, 73], [109, 77], [104, 80], [113, 83], [109, 87], [122, 89], [134, 96]], K);
    poligono([[146, 82], [162, 72], [178, 63], [180, 67], [173, 71], [178, 73], [171, 77], [176, 80], [167, 83], [171, 87], [158, 89], [146, 96]], K);
    poligono([[134, 103], [146, 103], [151, 115], [147, 112], [144, 116], [140, 112], [136, 116], [133, 112], [129, 115]], K);
    disco(166, 62, 4, K);
    // la serpiente que baja por la izquierda
    for (let y = 62; y < 146; y++) { const x = Math.round(113 + Math.sin(y * 0.18) * 3); pset(x, y, K); pset(x + 1, y, K); } disco(114, 62, 2, K);
    // dos aves zancudas a la derecha y un pájaro pequeño
    for (const [ax, ay] of [[198, 74], [204, 102]]) { disco(ax, ay + 6, 4, K); linea(ax - 2, ay + 3, ax - 2, ay - 4, K); linea(ax - 1, ay + 3, ax - 1, ay - 4, K); disco(ax - 2, ay - 5, 2, K); linea(ax - 4, ay - 5, ax - 9, ay - 3, K); linea(ax + 3, ay + 6, ax + 8, ay + 9, K); linea(ax - 1, ay + 9, ax - 1, ay + 16, K); linea(ax + 1, ay + 9, ax + 2, ay + 16, K); }
    disco(122, 124, 3, K); disco(119, 121, 2, K); linea(124, 126, 128, 128, K);
    // el escorpión
    for (let k = 0; k < 4; k++) disco(158 + k * 4, 126, 3 - (k > 2 ? 1 : 0), K);
    for (const s of [-1, 1]) { linea(156, 126 + s * 2, 148, 124 + s * 6, K); linea(148, 124 + s * 6, 146, 122 + s * 4, K); linea(148, 124 + s * 6, 144, 126 + s * 6, K); for (let k = 0; k < 3; k++) linea(160 + k * 4, 126 + s * 2, 162 + k * 4, 126 + s * 6, K); }
    for (let a = 0; a < 3.4; a += 0.08) { const x = Math.round(176 + Math.sin(a) * 6 + a * 2), y = Math.round(126 - (1 - Math.cos(a)) * 6); pset(x, y, K); pset(x, y + 1, K); } disco(181, 116, 2, K); pset(179, 119, K);
  }, hex('#d8c69c'), hex('#f2e6c8'), hex('#7a6648'), 0.35);
  // la sombra del pilar en el suelo y bajo la cabeza
  for (let y = 150; y < 160; y++) for (let x = 216 + (y - 150); x < 250 + (y - 150) * 2; x++) if (((x + y) & 1) === 0) e_tono(R, x, y, -0.35);
  for (let y = 58; y < 62; y++) for (let x = 106; x <= 216; x++) if (((x + y) & 1) === 0) e_tono(R, x, y, -0.3);
  // al pie: la etiqueta «43», la regla de escala, el cubo y el foco de obra
  rect(92, 152, 114, 162, C.k); rect(93, 153, 113, 161, hex('#f4f0e4')); rect(93, 161, 113, 161, hex('#c8c0a8')); R.numero('43', 104, 161, { color: hex('#2a2a3a'), centro: true, sombra: false });
  linea(103, 151, 103, 146, hex('#6a6a6a'));
  for (let k = 0; k < 6; k++) rect(130 + k * 8, 164, 137 + k * 8, 166, k % 2 ? C.blanco : hex('#1a1a1a')); rect(130, 167, 177, 167, hex('#4a3826'));
  rect(4, 138, 18, 152, C.k); rect(5, 139, 17, 152, hex('#2a5a9a')); rect(5, 139, 17, 140, hex('#4a7ab8')); rect(14, 141, 16, 151, hex('#1e4a7a')); linea(4, 138, 11, 132, hex('#5a5a5a')); linea(11, 132, 18, 138, hex('#5a5a5a'));
  poligono([[20, 156], [30, 151], [32, 154], [22, 159]], hex('#9aa0a8')); linea(30, 152, 36, 148, hex('#6a4a2a'));   // la paleta
  for (const [a, b] of [[[306, 112], [298, 150]], [[306, 112], [314, 150]], [[306, 112], [306, 150]]]) linea(a[0], a[1], b[0], b[1], hex('#3a3a3a'));
  rect(298, 100, 314, 112, C.k); rect(299, 101, 313, 111, hex('#e8c040')); rect(301, 103, 311, 109, hex('#fff4c0'));
  // el cable del foco que trepa por el muro, la telaraña en un rincón y una etiqueta de cuadrícula clavada en una junta
  for (let y = 112; y < 150; y++) pset(306 + Math.round(Math.sin(y * 0.3) * 0.6), y, hex('#2a2a2a'));
  for (let x = 236; x < 298; x++) pset(x, 149 - Math.round(Math.sin((x - 236) / 62 * Math.PI) * 3), hex('#2a2a2a'));
  for (let a = 0; a < 5; a++) linea(232, 62, 232 + Math.round(Math.cos(a * 0.39) * 12), 62 + Math.round(Math.sin(a * 0.39) * 12), hex('#e8e0d0'));
  for (const r of [4, 8, 11]) for (let a = 0; a < 1.6; a += 0.08) if (h(r, a * 10, 1120) < 0.8) pset(232 + Math.round(Math.cos(a) * r), 62 + Math.round(Math.sin(a) * r), hex('#d8d0c0'));
  rect(35, 46, 45, 53, C.k); rect(36, 47, 44, 52, hex('#e8e4d8')); R.numero('7', 40, 52, { color: hex('#c83a2a'), centro: true, sombra: false, fina: true }); linea(40, 46, 40, 43, hex('#8a8a8a'));
  // la zona de Atom y la barra del año, tranquilas
  for (let y = 0; y < 46; y++) for (let x = 0; x < 320; x++) if ((x >= 274 && y >= 2) || (y < 16 && x >= 18 && x <= 172)) { const i = y * 320 + x; B[i] = e_mez(B[i], y < 14 ? hex('#c8c6bc') : hex('#9a8a6a'), 0.45); }
  return { suelo: 150, estrellas: E_ESTRELLAS.map((p) => p.slice()), disco: [166, 62], pilar: [90, 24, 232, 150] };
}
function e_buitre(R, t, o) {
  const info = e_capa(R, 'buitre', () => e_buitreFijo(R));
  const { rect, pset, linea, disco } = R, B = R.buf;
  // los visitantes que pasan por la pasarela del otro lado (por detrás de la barandilla y del pilar)
  for (let k = 0; k < 5; k++) { const v = 6 + (k % 3) * 2, dir = k % 2 ? -1 : 1, x = Math.round(((t * v + k * 70) % 380) - 30), px = dir > 0 ? x : 320 - x;
    if ((px > 86 && px < 236) || px > 270) continue; const col = [hex('#c84a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#4a8a5a'), hex('#e8e0d0')][k], pa = Math.floor(t * 5 + k) % 2;
    disco(px, 17, 1, hex('#d8a070')); rect(px - 1, 19, px + 1, 22, col); pset(px - 1 + pa, 23, hex('#2a2a3a')); pset(px + 1 - pa, 23, hex('#2a2a3a')); pset(px - 1, 24, hex('#2a2a3a')); pset(px + 1, 24, hex('#2a2a3a')); }
  for (const yb of [18, 21]) for (let x = 0; x < 320; x++) if (x < 89 || x > 233) pset(x, yb, hex('#6a5038'));
  for (let x = 2; x < 320; x += 12) if (x < 89 || x > 233) rect(x, 18, x, 25, hex('#5a4430'));
  // la lona azul en lo alto del muro, que ondea
  for (let x = 0; x < 44; x++) { const y0 = 30 + Math.round(Math.sin(x * 0.3 - t * 4) * (x / 22)); for (let y = y0; y < y0 + 4 + (x > 30 ? Math.round(Math.sin(x - t * 6)) : 0); y++) pset(x, y, ((x + Math.floor(t * 4)) % 6) < 3 ? hex('#4a7ac8') : hex('#3a62a8')); }
  // una golondrina bajo la cubierta y el foco que tiembla
  { const u = (t * 0.22) % 1, gx = Math.round(180 + u * 90), gy = Math.round(9 + Math.sin(u * 12) * 2), ala = Math.floor(t * 8) % 2; if (gx < 270) { pset(gx, gy, C.k); pset(gx - 1, gy - ala, C.k); pset(gx + 1, gy - ala, C.k); pset(gx - 2, gy - 1 + ala, C.k); pset(gx + 2, gy - 1 + ala, C.k); } }
  if (Math.sin(t * 23) > 0.85) rect(301, 103, 311, 109, hex('#f0e0a0'));
  for (let y = 112; y < 150; y++) for (let x = 296 - (y - 112) * 0.6; x < 306; x++) if (((Math.round(x) + y) & 1) && h(Math.round(x), y, 955) < 0.3) e_tono(R, Math.round(x), y, 0.1, hex('#fff0b0'));
  // las motas de polvo en el rayo de sol
  for (let k = 0; k < 16; k++) { const y = Math.round((h(k, 2, 956) * 150 + t * (2 + h(k, 3, 956) * 3)) % 150), x = Math.round(26 + y * 0.55 + h(k, 1, 956) * 30 + Math.sin(t + k) * 2); if (Math.sin(t * 2 + k) > -0.4 && !(x > 270 && y < 46)) e_tono(R, x, y, 0.5, hex('#fff8e0')); }
  // las matas que asoman entre las juntas del muro y se mecen con el aire
  for (const [mx, my, n] of [[22, 66, 4], [70, 124, 5], [250, 74, 4], [282, 118, 5], [36, 98, 3], [262, 132, 4]]) for (let j = 0; j < n; j++) {
    const m = Math.round(Math.sin(t * 2.4 + mx * 0.1 + j) * 1.2), dx = j - (n >> 1); linea(mx + dx, my, mx + dx * 2 + m, my - 4 - (j & 1) * 2, j & 1 ? hex('#7a8a3a') : hex('#9aa84a')); }
  // la lagartija que sube por el muro de la derecha, se para a tomar el sol y vuelve a bajar
  { const u = (t * 0.07) % 1, f = u < 0.5 ? e_suave(u * 2) : e_suave(2 - u * 2), lx = Math.round(244 + f * 20), ly = Math.round(128 - f * 40), sube = u < 0.5 ? -1 : 1, pa = Math.floor(t * 8) % 2 && Math.sin(t * 3) < 0.6 ? 1 : 0, L = hex('#5a6a3a');
    rect(lx, ly - 3, lx + 1, ly + 3, L); pset(lx, ly + 3 * sube, hex('#3a4a24')); pset(lx + 1, ly + 3 * sube, C.k);
    linea(lx, ly - 3 * sube, lx + (pa ? 1 : -1), ly - 8 * sube, L); pset(lx - 1, ly - 1 - pa, L); pset(lx + 2, ly - 1 + pa, L); pset(lx - 1, ly + 2 + pa, L); pset(lx + 2, ly + 2 - pa, L); pset(lx + 1, ly - 2, hex('#8a9a5a')); }
  // las constelaciones que unen los animales, el cometa que cae y, con o.borrar, todo se deshace en tramado
  const cn = e_sat(o.constelaciones ?? 0), bo = e_sat(o.borrar ?? 0);
  if (cn > 0 && bo < 1) {
    const vis = (x, y) => bo <= 0 || e_bayer(x, y) >= bo, CL = hex('#9ae8ff'), CG = hex('#3a8ab8'), n = cn * E_LINEAS.length;
    for (let l = 0; l < E_LINEAS.length; l++) { const u = e_sat(n - l); if (u <= 0) break; const [a, b] = E_LINEAS[l], [xa, ya] = E_ESTRELLAS[a], [xb, yb] = E_ESTRELLAS[b], xe = xa + (xb - xa) * u, ye = ya + (yb - ya) * u, pasos = Math.ceil(Math.hypot(xe - xa, ye - ya));
      for (let i = 0; i <= pasos; i++) { const x = Math.round(xa + (xe - xa) * i / Math.max(1, pasos)), y = Math.round(ya + (ye - ya) * i / Math.max(1, pasos)); if (!vis(x, y)) continue; pset(x, y, CL); if (((i + Math.floor(t * 10)) % 6) === 0) { e_tono(R, x + 1, y, 0.5, CG); e_tono(R, x, y + 1, 0.5, CG); } } }
    E_ESTRELLAS.forEach(([x, y], k) => { const usada = E_LINEAS.some(([a, b], l) => (a === k && l < n) || (b === k && l + 1 <= n)); if (!usada || !vis(x, y)) return; const tw = Math.sin(t * 4 + k * 1.7) > 0.3 ? 2 : 1;
      pset(x, y, C.blanco); for (let r = 1; r <= tw; r++) { pset(x + r, y, CL); pset(x - r, y, CL); pset(x, y + r, CL); pset(x, y - r, CL); } e_tono(R, x + 1, y + 1, 0.4, CL); e_tono(R, x - 1, y - 1, 0.4, CL); });
    const u = e_sat((cn - 0.6) / 0.4); if (u > 0) { const hx = Math.round(268 - u * 102), hy = Math.round(50 + u * 12);
      for (let d = 36; d > 0; d--) { const x = hx + d, y = hy - Math.round(d * 0.16); if (!vis(x, y) || (d > 14 && e_bayer(x, y) > 1 - d / 36)) continue; pset(x, y, d < 5 ? C.blanco : d < 14 ? hex('#ffe8a0') : hex('#f0903a')); if (d < 20) pset(x, y + 1, hex('#f0903a')); }
      if (vis(hx, hy)) { disco(hx, hy, 2, hex('#fff8d8')); pset(hx, hy, C.blanco); }
      if (u >= 1) for (let a = 0; a < 8; a++) { const r = 7 + ((t * 8) % 6); const x = Math.round(166 + Math.cos(a * 0.785) * r), y = Math.round(62 + Math.sin(a * 0.785) * r); if (vis(x, y)) pset(x, y, hex('#ffe8a0')); } }
  }
  return info;
}
// piedras y terrones en las esquinas de abajo, por delante de los personajes (k 0: el recinto; 1: Karahan Tepe)
function e_piedrasDelante(R, t, k) {
  const { disco, pset, linea } = R, base = k ? [hex('#a88a5e'), hex('#c8aa7a'), hex('#7a6040')] : [hex('#8a7456'), hex('#b8a07a'), hex('#5a4630')];
  for (const [x, y, r] of [[4, 178, 7], [16, 179, 4], [312, 177, 8], [298, 179, 5], [26, 180, 3]]) { disco(x, y, r + 1, C.k); disco(x, y, r, base[0]); disco(x - 1, y - 1, Math.max(1, r - 3), base[1]); pset(x + r - 2, y, base[2]); }
  for (let i = 0; i < 6; i++) { const x = 290 + i * 3, m = Math.round(Math.sin(t * 2 + i) * 1); linea(x, 179, x + m, 170 + (i % 3), k ? hex('#9a8a4a') : hex('#7a6a3a')); }
}

// un pilar liso y redondeado que brota de la roca (cx, base, alto, ancho), con su sombra en el suelo
function e_poste(R, cx, base, alto, an) {
  const { pset } = R, T5 = [hex('#f2dcb2'), hex('#d6b484'), hex('#b28c5c'), hex('#866640'), hex('#553e26')], r = an / 2;
  for (let y = base - 2; y < base + 6; y++) for (let x = cx + 2; x < cx + 2 + alto * 0.5; x++) if (((x + y) & 1) === 0 && x - cx < (y - base + 2) * 4 + an) e_tono(R, x, y, -0.3);   // la sombra
  for (let y = base - alto; y <= base; y++) { const fl = y > base - 4 ? (y - base + 4) * 0.7 : 0, rr = r + fl, top = base - alto + r;
    for (let x = Math.floor(cx - rr - 1); x <= cx + rr + 1; x++) { const dx = (x - cx) / rr; if (Math.abs(dx) > 1) continue; if (y < top && Math.hypot(x - cx, (y - top) * 1.2) > r) continue;
      const edge = Math.abs(dx) > 0.86 || (y < top && Math.hypot(x - cx, (y - top) * 1.2) > r - 1); let v = (dx + 1) / 2 * 0.95 + (h(x, y, 960) - 0.5) * 0.18 + (y > base - 6 ? 0.15 : 0);
      if (y < top) v -= 0.15; pset(x, y, edge ? T5[4] : e_grad(v, T5, x, y)); } }
  for (let j = 0; j < Math.floor(alto / 9); j++) { const y = base - alto + 8 + j * 9 + Math.floor(h(cx, j, 961) * 4); if (h(cx, j, 962) < 0.5) { pset(Math.round(cx + r * 0.3), y, T5[3]); pset(Math.round(cx + r * 0.3) + 1, y + 1, T5[3]); } }
  pset(Math.round(cx - r * 0.45), base - alto + Math.round(r * 0.6), C.blanco);
}

// lo fijo de Karahan Tepe
function e_karahanFijo(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf;
  const borde = (x) => x < 236 ? Math.round(16 + 2 * Math.sin(x * 0.05) + (h(x >> 2, 1, 963) - 0.5) * 2) : Math.max(0, Math.round(16 - (x - 236) * 0.45));
  const PA = [hex('#ecd4a2'), hex('#d0ae78'), hex('#b28e5c'), hex('#927044'), hex('#715232'), hex('#523a22')];
  // el rayo de luz que entra desde arriba: 1 dentro, 0 fuera, con el canto tramado
  const rayo = (x, y) => { const x0 = 30 + (y - 16) * 0.72, d = Math.min(x - x0, x0 + 58 - x); return d < 0 ? 0 : d > 6 ? 1 : d / 6; };
  for (let x = 0; x < 320; x++) { const yb = borde(x);
    for (let y = 0; y < 180; y++) { const i = y * 320 + x, ry = y >= yb ? rayo(x, y) : 0;
      if (y < yb) { B[i] = e_grad(y / 18, [hex('#5a90d0'), hex('#7aaee0'), hex('#a8cce8')], x, y); continue; }
      let v;
      if (y < 88) {   // la pared de roca: estratos ondulados con su junta y su labio de luz, marcas de pico, la sombra del borde
        const ond = Math.sin(x * 0.035 + 1) * 2.5 + Math.sin(x * 0.11) * 0.8, capa = Math.floor((y + ond) / 8), en = (y + ond) - capa * 8;
        v = 0.42 + (h(capa, 7, 990) - 0.5) * 0.28 + (e_ruido(x / 12, y / 5, 965) - 0.5) * 0.3 + (h(x, y, 991) - 0.5) * 0.1;
        if (en < 1) v -= 0.22; else if (en < 2) v += 0.16;
        if (((x * 2 + y * 3) % 11 === 0) && h(x >> 2, y >> 2, 964) < 0.55) v += 0.22;
        v += Math.max(0, 1 - (y - yb) / 16) * 0.45 + Math.pow(Math.abs(x - 160) / 160, 2) * 0.3;
        if (x > 270 && y < 46) v = 0.5 + (v - 0.5) * 0.3;   // la zona de Atom, tranquila
      } else if (y < 99) {   // el banco corrido tallado: la cara de arriba con luz, el frente y su sombra
        v = y < 90 ? 0.08 : y === 98 ? 0.95 : 0.5 + (y - 90) * 0.03 + (h(x, y, 966) - 0.5) * 0.2;
      } else {   // el suelo de roca: losas con sus grietas, marcas de pico, más oscuro al fondo y bajo el banco
        const d = (y - 99) / 81, gr = Math.abs(e_ruido(x / 16, y / 6, 992) - 0.5) < 0.02;
        v = 0.62 - d * 0.42 + (e_ruido(x / 8, y / 4, 967) - 0.5) * 0.3 + (y < 104 ? 0.35 : 0) + Math.pow(Math.abs(x - 160) / 160, 2) * 0.25 + (gr ? 0.4 : 0);
        if (((x * 3 + y * 5) % 13 === 0) && h(x, y, 968) < 0.4) v += 0.2;
      }
      v -= ry * 0.4; let c = e_grad(v, PA, x, y); if (ry > e_bayer(x, y)) c = e_mez(c, hex('#fff0c8'), 0.14);
      B[i] = c; } }
  // las grietas verticales de la pared, las raíces que cuelgan del borde y dos hornacinas
  for (let k = 0; k < 9; k++) { let x = 30 + Math.floor(h(k, 1, 993) * 260), y = borde(x) + 3; const fin = 50 + Math.floor(h(k, 2, 993) * 36);
    for (; y < fin; y++) { pset(x, y, PA[5]); pset(x - 1, y, PA[0]); if (h(k, y, 994) < 0.3) x += h(k, y, 995) < 0.5 ? -1 : 1; } }
  for (let k = 0; k < 20; k++) { const x = 30 + Math.floor(h(k, 1, 996) * 200), yb = borde(x), l = 3 + Math.floor(h(k, 2, 996) * 8); for (let j = 0; j < l; j++) pset(x + Math.round(Math.sin(j * 0.7 + k)), yb + j, hex('#4a3420')); }
  for (const [nx, ny] of [[152, 56], [226, 50]]) { rect(nx - 5, ny - 6, nx + 5, ny + 8, PA[4]); disco(nx, ny - 6, 5, PA[4]); rect(nx - 4, ny - 5, nx + 4, ny + 7, PA[5]); disco(nx, ny - 6, 4, PA[5]); rect(nx - 5, ny + 8, nx + 5, ny + 8, PA[0]); rect(nx + 5, ny - 6, nx + 5, ny + 8, PA[1]);
    rect(nx - 2, ny + 4, nx + 2, ny + 7, hex('#8a6a44')); pset(nx - 1, ny + 4, PA[0]); }
  // la hierba seca del borde, la pasarela con su barandilla y la escalera de mano
  for (let x = 0; x < 236; x += 2) { const yb = borde(x); linea(x, yb, x + (h(x, 1, 969) < 0.5 ? -1 : 1), yb - 2 - Math.floor(h(x, 2, 969) * 3), h(x, 3, 969) < 0.5 ? hex('#a89a50') : hex('#7a7a3a')); }
  for (let x = 30; x < 230; x += 14) rect(x, borde(x) - 7, x, borde(x), hex('#6a5040')); for (let x = 30; x < 230; x++) pset(x, borde(x) - 7, hex('#8a6a4a'));
  for (const [a, b] of [[[4, 150], [12, 14]], [[14, 150], [22, 14]]]) { linea(a[0], a[1], b[0], b[1], hex('#5a5e66')); linea(a[0] + 1, a[1], b[0] + 1, b[1], hex('#a8acb4')); }
  for (let k = 0; k < 13; k++) { const y = 146 - k * 10.5, xa = 4 + (150 - y) * 8 / 136; linea(Math.round(xa + 1), Math.round(y), Math.round(xa + 10), Math.round(y), hex('#8a8e96')); }
  // la cabeza humana esculpida que asoma de la pared, solemne, mirando a los pilares
  e_relieve(R, 62, 34, 114, 84, (K) => { poligono([[66, 46], [82, 42], [84, 68], [68, 70]], K); for (let j = -13; j <= 13; j++) for (let i = -10; i <= 10; i++) if ((i / 10.5) ** 2 + (j / 13.5) ** 2 <= 1) pset(90 + i, 55 + j, K); rect(86, 68, 94, 72, K); }, hex('#d8b884'), hex('#f4e0b2'), hex('#5a4028'), 0.5);
  for (let i = -8; i <= 8; i++) { pset(90 + i, 47 + Math.round(Math.abs(i) * 0.12), hex('#7a5a38')); pset(90 + i, 46 + Math.round(Math.abs(i) * 0.12), hex('#f0dcae')); }   // la frente y las cejas
  for (const ex of [85, 95]) { rect(ex - 3, 50, ex + 2, 52, hex('#3a2818')); rect(ex - 2, 51, ex + 1, 51, hex('#2a1c10')); rect(ex - 3, 49, ex + 2, 49, hex('#8a6a44')); rect(ex - 2, 53, ex + 1, 53, hex('#e8d0a0')); }
  linea(90, 50, 91, 59, hex('#f0dcae')); linea(92, 51, 93, 59, hex('#6a4e30')); rect(88, 60, 93, 60, hex('#5a4028')); pset(89, 61, hex('#3a2818')); pset(92, 61, hex('#3a2818'));
  rect(85, 64, 95, 64, hex('#4a3420')); rect(86, 65, 94, 65, hex('#e0c898')); rect(88, 67, 92, 68, hex('#ecd4a2'));   // la boca y la barbilla
  for (let j = 0; j < 12; j++) { pset(98 + Math.round(j * 0.15), 50 + j, hex('#6a4e30')); pset(97 + Math.round(j * 0.15), 50 + j, hex('#8a6a44')); }   // la mejilla en sombra
  // la sombra de la pared sobre el banco y los pilares, de atrás adelante
  for (let x = 0; x < 320; x++) { pset(x, 99, hex('#6a4e30')); if (x & 1) pset(x, 100, hex('#8a6a44')); }
  for (const [cx, base, al, an] of [[136, 104, 40, 9], [156, 105, 44, 9], [176, 104, 42, 9], [196, 106, 46, 9], [216, 104, 41, 9], [236, 105, 45, 9], [258, 104, 42, 9], [280, 106, 40, 9]]) e_poste(R, cx, base, al, an);
  for (const [cx, base, al, an] of [[146, 124, 54, 11], [178, 126, 60, 11], [212, 124, 56, 11], [246, 126, 62, 11], [290, 124, 52, 11]]) e_poste(R, cx, base, al, an);
  // piedras sueltas y grava, una criba y unas etiquetas con números
  for (let k = 0; k < 40; k++) { const x = 24 + Math.floor(h(k, 1, 997) * 290), y = 108 + Math.floor(h(k, 2, 997) * 70), r = h(k, 3, 997) < 0.25 ? 2 : 1; if (x > 36 && x < 86 && y > 156 && y < 172) continue; disco(x, y, r, hex('#6a4e30')); pset(x - 1, y - r + 1, hex('#e6cc98')); }
  for (let j = -3; j <= 3; j++) rect(108 - (3 - Math.abs(j)) * 3, 172 + j, 120 + (3 - Math.abs(j)) * 3, 172 + j, j === -3 || j === 3 ? hex('#5a3a20') : hex('#8a6a40'));
  for (let x = 102; x < 126; x += 2) for (let y = 170; y < 175; y += 2) pset(x, y, hex('#3a2a18'));
  // el material de la excavación: la línea de estacas con su cordel, dos capazos negros de goma con tierra, el montón
  // de tierra cribada, la carretilla, la paleta y la brocha
  e_karahanObra(R);
  // el charco y sus reflejos
  for (let y = 160; y <= 168; y++) for (let x = 40; x <= 82; x++) if (((x - 61) / 21) ** 2 + ((y - 164) / 4.5) ** 2 <= 1) B[y * 320 + x] = e_grad((y - 160) / 9, [hex('#8ab8e0'), hex('#5a88b8'), hex('#3a6a98')], x, y);
  for (const [x, y, n] of [[124, 112, '7'], [302, 130, '12']]) { rect(x - 5, y - 6, x + 5, y + 1, C.k); rect(x - 4, y - 5, x + 4, y, hex('#f4f0e4')); R.numero(n, x, y, { color: hex('#2a2a3a'), centro: true, sombra: false, fina: true }); }
  return { suelo: 150, cabeza: [90, 55], postes: [[136, 104], [156, 105], [176, 104], [196, 106], [216, 104], [236, 105], [258, 104], [280, 106], [146, 124], [178, 126], [212, 124], [246, 126], [290, 124]] };
}
// el pilar en T con cara (2025), en primer plano a la derecha (x: centro; base: el pie)
function e_pilarCara(R, cx, base) {
  const { rect, pset, poligono, linea } = R, B = R.buf, T5 = [hex('#f0dcb0'), hex('#dcc292'), hex('#c4a676'), hex('#a68658'), hex('#7a5e3c')];
  for (let y = base - 4; y < base + 4; y++) for (let x = cx - 30; x < cx + 30; x++) if (((x + y) & 1) === 0) e_tono(R, x, y, -0.35);
  const cab = [cx - 34, base - 104, cx + 34, base - 78], fus = [cx - 22, base - 78, cx + 22, base];
  for (const [x0, y0, x1, y1] of [fus, cab]) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if ((x === x0 || x === x1) && h(x, y, 970) < 0.3) continue;
    let v = (x - x0) / (x1 - x0) * 0.8 + (e_ruido(x / 6, y / 4, 971) - 0.5) * 0.4 + 0.1; if (x - x0 < 2) v = 0; if (x1 - x < 2) v = 0.95; if (y0 === cab[1] && y > y1 - 3) v += 0.3; if (y0 === fus[1] && y < y0 + 4) v += 0.35;
    B[y * 320 + x] = e_grad(v, T5, x, y); }
  rect(cab[0], cab[1], cab[2], cab[1], T5[0]); rect(cab[0], cab[1] - 1, cab[2], cab[1] - 1, C.k); rect(cab[0] - 1, cab[1], cab[0] - 1, cab[3], C.k); rect(cab[2] + 1, cab[1], cab[2] + 1, cab[3], C.k); rect(fus[0] - 1, fus[1], fus[0] - 1, base, C.k); rect(fus[2] + 1, fus[1], fus[2] + 1, base, C.k);
  // la cara en la cabeza del pilar y los brazos en el fuste, en relieve
  e_relieve(R, cab[0], cab[1], cab[2] + 2, base, (K) => {
    for (const ex of [cx - 10, cx + 10]) { for (let i = -5; i <= 5; i++) for (let j = -3; j <= 3; j++) if ((i / 5.5) ** 2 + (j / 3.5) ** 2 <= 1 && (i / 3) ** 2 + (j / 1.6) ** 2 > 1) pset(ex + i, cab[1] + 10 + j, K); }
    poligono([[cx - 2, cab[1] + 8], [cx + 2, cab[1] + 8], [cx + 4, cab[1] + 18], [cx - 4, cab[1] + 18]], K); rect(cx - 6, cab[1] + 21, cx + 6, cab[1] + 22, K);
    for (const s of [-1, 1]) { const x0 = cx + s * 18; linea(x0, fus[1] + 4, x0, fus[1] + 36, K); linea(x0 - s, fus[1] + 4, x0 - s, fus[1] + 36, K); linea(x0, fus[1] + 36, cx + s * 3, fus[1] + 44, K); linea(x0 - s, fus[1] + 37, cx + s * 3, fus[1] + 45, K);
      for (let d = 0; d < 4; d++) linea(cx + s * (3 + d * 2), fus[1] + 44 + (d & 1), cx + s * (1 + d * 2), fus[1] + 48, K); }
    rect(cx - 20, fus[1] + 52, cx + 20, fus[1] + 54, K);
  }, hex('#dcc294'), hex('#f6e6c0'), hex('#6a4e30'), 0.4);
  for (const ex of [cx - 10, cx + 10]) { rect(ex - 2, cab[1] + 9, ex + 2, cab[1] + 11, hex('#4a3420')); pset(ex - 1, cab[1] + 9, hex('#2a1c10')); }
  for (let k = 0; k < 16; k++) pset(cx - 18 + Math.floor(h(k, 1, 972) * 36), base - 60 + Math.floor(h(k, 2, 972) * 56), hex('#9a7a50'));
}

function e_karahan(R, t, o) {
  const info = e_capa(R, 'karahan', () => e_karahanFijo(R));
  const { rect, pset, disco, linea } = R, B = R.buf, borde = (x) => Math.round(16 + 2 * Math.sin(x * 0.05) + (h(x >> 2, 1, 963) - 0.5) * 2);
  // las nubes de tres tonos a tres velocidades y los pájaros, en la franja de cielo
  R.recorte([0, 0, 250, 15]);
  for (let k = 0; k < 5; k++) { const v = 2 + (k % 3) * 2.5, w = 10 + (k % 3) * 6, cx = Math.round(((h(k, 1, 973) * 300 + t * v) % 320) - 30), cy = 5 + (k % 3) * 3;
    for (const [dx, dy, r, c] of [[-w * 0.4, 1, w * 0.3, hex('#b8cce2')], [0, 0, w * 0.38, hex('#b8cce2')], [w * 0.4, 1, w * 0.28, hex('#b8cce2')], [-w * 0.4, 0, w * 0.27, hex('#e2ecf6')], [0, -1, w * 0.34, hex('#e2ecf6')], [w * 0.35, 0, w * 0.24, hex('#e2ecf6')], [-1, -2, w * 0.2, C.blanco]]) disco(Math.round(cx + dx), Math.round(cy + dy), Math.max(1, Math.round(r)), c); }
  for (let k = 0; k < 3; k++) { const x = Math.round((t * (14 + k * 4) + k * 90) % 260), y = 6 + k * 2 + Math.round(Math.sin(t * 2 + k)), a = Math.floor(t * 7 + k) % 2; pset(x, y, hex('#2a2a3a')); pset(x - 1, y - a, hex('#2a2a3a')); pset(x + 1, y - a, hex('#2a2a3a')); }
  R.recorte(null);

  // la hierba del borde al viento y los visitantes de la pasarela
  for (let x = 1; x < 236; x += 4) { const yb = borde(x), m = Math.round(Math.sin(t * 2.2 + x * 0.2)); linea(x, yb, x + m, yb - 3, hex('#c8b868')); }
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * (5 + k * 2) + k * 80) % 220) + 10), yb = borde(x), col = [hex('#c84a3a'), hex('#3a6ab8'), hex('#e8e0d0')][k], pa = Math.floor(t * 5 + k) % 2;
    disco(x, yb - 9, 1, hex('#d8a070')); rect(x - 1, yb - 7, x + 1, yb - 4, col); pset(x - 1 + pa, yb - 3, hex('#2a2a3a')); pset(x + 1 - pa, yb - 3, hex('#2a2a3a')); }
  for (let x = 30; x < 230; x++) pset(x, borde(x) - 7, hex('#8a6a4a'));
  // la lagartija que corretea por el banco
  { const u = (t * 0.09) % 1, lx = Math.round(30 + e_suave(u < 0.5 ? u * 2 : 2 - u * 2) * 90 + (Math.floor(t * 2) % 3 === 0 ? 0 : 0)), dir = u < 0.5 ? 1 : -1, pa = Math.floor(t * 8) % 2;
    rect(lx - 3, 89, lx + 3, 89, hex('#6a7a4a')); pset(lx + 4 * dir, 89, hex('#4a5a34')); linea(lx - 3 * dir, 89, lx - 8 * dir, 88 + pa, hex('#6a7a4a')); pset(lx - 2, 90 - pa, hex('#4a5a34')); pset(lx + 2, 89 + pa, hex('#4a5a34')); pset(lx + 3 * dir, 88, C.k); }
  // las ondas del charco y las motas en el rayo de luz
  for (let k = 0; k < 2; k++) { const r = ((t * 6 + k * 9) % 18); for (let a = 0; a < 6.28; a += 0.3) { const x = Math.round(61 + Math.cos(a) * r), y = Math.round(164 + Math.sin(a) * r * 0.2); if (((x - 61) / 21) ** 2 + ((y - 164) / 4.5) ** 2 <= 0.8) pset(x, y, hex('#c8e4f8')); } }
  for (let k = 0; k < 18; k++) { const y = Math.round(20 + (h(k, 2, 974) * 160 + t * (2 + h(k, 3, 974) * 3)) % 160), x = Math.round(42 + (y - 18) * 0.7 + h(k, 1, 974) * 42 + Math.sin(t + k) * 2); if (Math.sin(t * 2 + k) > -0.4) e_tono(R, x, y, 0.5, hex('#fff8e0')); }
  // las sombras de las nubes que cruzan el suelo de roca, despacio
  for (let k = 0; k < 2; k++) { const cx = Math.round(((t * (3 + k * 1.5) + k * 170) % 420) - 60), cy = 128 + k * 26, rx = 34 + k * 8, ry = 7 + k * 2;
    for (let y = Math.max(104, cy - ry); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, cx - rx); x <= Math.min(319, cx + rx); x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (e_ruido(x / 7, y / 3, 1110 + k) - 0.5) * 0.7; if (d < 1 && e_bayer(x, y) < 0.5) e_tono(R, x, y, -0.13); } }
  // el restaurador arrodillado en el banco, junto a la cabeza tallada, que barre el polvo con la brocha
  { const x = 122, y = 89, b = Math.round(Math.sin(t * 5) * 2), pa = Math.sin(t * 5) > 0;
    rect(x - 2, y - 2, x + 2, y - 1, hex('#5a4a3a')); rect(x - 3, y - 1, x - 1, y, hex('#3a3a4a'));   // las piernas dobladas
    rect(x - 1, y - 7, x + 2, y - 2, hex('#c8783a')); pset(x - 1, y - 7, hex('#e89a5a'));   // el chaleco
    disco(x + 1, y - 9, 1, hex('#d8a070')); rect(x - 1, y - 11, x + 3, y - 11, hex('#e8e0c8')); pset(x + 1, y - 12, hex('#e8e0c8'));   // la cabeza con el sombrero
    linea(x + 2, y - 5, x + 5 + b, y - 2, hex('#d8a070')); rect(x + 5 + b, y - 2, x + 6 + b, y - 1, hex('#8a6a44'));   // el brazo y la brocha
    if (pa) for (let k = 0; k < 3; k++) e_tono(R, x + 7 + b + k, y - 3 - k, 0.4, hex('#fff0c8')); }
  // el cuervo que se posa en lo alto de los pilares, mira a un lado y a otro, y salta de uno a otro
  { const P = [[178, 65], [212, 67], [246, 63]], c = (t / 6) % 3, i = Math.floor(c), u = c - i, [ax, ay] = P[i], [bx, by] = P[(i + 1) % 3], vuela = u > 0.78, v = vuela ? (u - 0.78) / 0.22 : 0;
    const x = Math.round(ax + (bx - ax) * e_suave(v)), y = Math.round(ay + (by - ay) * v - Math.sin(v * Math.PI) * 14), mira = vuela ? (bx > ax ? 1 : -1) : (Math.sin(t * 1.9 + i) > 0 ? 1 : -1), K = hex('#1a1a22');
    const pica = !vuela && Math.sin(t * 3.1 + i) > 0.8 ? 1 : 0;
    rect(x - 3, y - 5, x + 2, y - 1, K); rect(x - 2, y - 6, x + 1, y - 6, K); linea(x - 3 * mira, y - 3, x - 6 * mira, y - 5, K); linea(x - 3 * mira, y - 2, x - 6 * mira, y - 4, K);
    rect(x + 2 * mira - 1, y - 8 + pica, x + 2 * mira + 1, y - 6 + pica, K); pset(x + 4 * mira, y - 7 + pica, hex('#8a8a92')); pset(x + 5 * mira, y - 7 + pica, hex('#6a6a72')); pset(x + 2 * mira, y - 7 + pica, hex('#e8e8f0'));
    linea(x - 2, y - 4, x + 1, y - 4, hex('#3a3a4e'));
    if (vuela) { const a = Math.floor(t * 12) % 2; linea(x - 1, y - 5, x - 6, y - 10 + a * 9, K); linea(x, y - 5, x + 5, y - 10 + a * 9, K); linea(x - 2, y - 5, x - 5, y - 9 + a * 8, K); }
    else { pset(x - 1, y, hex('#3a3a3a')); pset(x + 1, y, hex('#3a3a3a')); } }
  if (o.cara) e_pilarCara(R, 270, 174);
  return { ...info, ...(o.cara ? { cara: [270, 80], caraBase: [270, 174] } : {}) };
}
// las colinas, por orden de encendido: Göbekli Tepe y Karahan Tepe primero (las dos con su pilar en T dibujado)
const E_SITIOS = [[124, 96], [214, 104], [52, 74], [176, 82], [196, 64], [186, 132], [234, 122], [84, 130], [154, 112], [140, 68], [160, 150], [104, 108]];

const E_MAPA = [14, 26, 264, 166];

// la altura del terreno del mapa (0–1) y si es basalto de Karacadağ
function e_altura(x, y) {
  let a = 0.34 + (e_ruido(x / 22, y / 22, 975) - 0.5) * 0.2 + (e_ruido(x / 7, y / 7, 976) - 0.5) * 0.08;
  a += 0.3 * Math.exp(-(((y - 80 - Math.sin(x * 0.05) * 6) / 11) ** 2)) * e_suave((x - 70) / 30) * e_suave((220 - x) / 30) * (0.6 + e_ruido(x / 9, 3, 977) * 0.8);   // las lomas de Germuş
  const dk = Math.hypot(x - 242, (y - 88) * 1.1); a += 0.36 * Math.exp(-((dk / 26) ** 2));   // Karacadağ (abajo a la derecha, lejos de la zona de Atom)
  a += 0.24 * Math.exp(-((Math.hypot(x - 226, y - 156) / 26) ** 2)) * (0.6 + e_ruido(x / 6, y / 6, 978) * 0.8);   // Tektek
  a -= 0.16 * e_suave((y - 122) / 14) * e_suave((x - 74) / 20) * e_suave((214 - x) / 20);   // la llanura de Harran
  const rx = 30 + Math.sin(y * 0.05) * 6 + Math.sin(y * 0.13) * 2; a -= 0.22 * Math.exp(-(((x - rx) / 12) ** 2));   // el valle del Éufrates
  return { a, basalto: dk < 22 + e_ruido(x / 6, y / 6, 979) * 9, rio: Math.abs(x - rx) < 1.6 || (y < 60 && Math.hypot((x - rx - 4) / 1.6, (y - 44) / 1) < 9 + e_ruido(x / 4, y / 4, 980) * 4) };
}
function e_mapaFijo(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf;
  // la mesa de madera
  const MD = [hex('#5a3a24'), hex('#4e321e'), hex('#664430')];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 22), veta = Math.sin(x * 0.08 + tabla * 3 + Math.sin(x * 0.02 + tabla) * 3 + y * 0.6);
    B[y * 320 + x] = y % 22 === 21 ? hex('#2e1e12') : veta > 0.75 ? MD[2] : veta < -0.8 ? MD[1] : (h(x >> 2, y, 981) < 0.06 ? MD[1] : MD[0]); }
  // el papel con su sombra, el margen y el doble filete
  for (let y = 23; y < 176; y++) for (let x = 11; x < 274; x++) if (((x + y) & 1) === 0) e_tono(R, x, y, -0.4);
  rect(8, 20, 270, 172, hex('#e8dcbc')); for (let k = 0; k < 400; k++) pset(8 + Math.floor(h(k, 1, 982) * 262), 20 + Math.floor(h(k, 2, 982) * 152), h(k, 3, 982) < 0.5 ? hex('#d8caa6') : hex('#f2e8cc'));
  rect(12, 24, 266, 168, hex('#3a2e22')); rect(13, 25, 265, 167, hex('#e8dcbc'));
  for (let x = 20; x < 266; x += 25) { pset(x, 23, hex('#3a2e22')); pset(x, 22, hex('#3a2e22')); pset(x, 169, hex('#3a2e22')); pset(x, 170, hex('#3a2e22')); }
  for (let y = 30; y < 168; y += 25) { pset(10, y, hex('#3a2e22')); pset(11, y, hex('#3a2e22')); pset(267, y, hex('#3a2e22')); pset(268, y, hex('#3a2e22')); }
  // el relieve: altura, color por cotas, sombreado desde el noroeste, curvas de nivel, el río y su embalse, los campos
  const [X0, Y0, X1, Y1] = E_MAPA, W = X1 - X0 + 1, Hh = Y1 - Y0 + 1, A = new Float32Array(W * Hh), BA = new Uint8Array(W * Hh), RI = new Uint8Array(W * Hh);
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { const r = e_altura(x + X0, y + Y0), i = y * W + x; A[i] = r.a; BA[i] = r.basalto ? 1 : 0; RI[i] = r.rio ? 1 : 0; }
  const HY = [hex('#b8b47a'), hex('#cdbd82'), hex('#c8a46a'), hex('#b08656'), hex('#dccaa2')], BS = [hex('#6e6462'), hex('#867a74'), hex('#9e928a')];
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { const i = y * W + x, px = x + X0, py = y + Y0, a = A[i];
    if (RI[i]) { B[py * 320 + px] = (x + y) % 5 === 0 ? hex('#7aa8d0') : hex('#4a7aa8'); continue; }
    const sx = x > 0 && y > 0 ? A[i] - A[i - W - 1] : 0, l = e_sat(0.5 + sx * 9);
    let c = BA[i] ? e_grad(a * 1.4 - 0.2, BS, px, py) : e_grad((a - 0.1) / 0.7, HY, px, py);
    if (!BA[i] && py > 128 && px > 80 && px < 210 && a < 0.3) { const cel = h(Math.floor(px / 7), Math.floor(py / 4), 983); c = cel < 0.3 ? hex('#a8b06a') : cel < 0.6 ? hex('#d8c47a') : cel < 0.75 ? hex('#b89a62') : c; if (px % 7 === 0 || py % 4 === 0) c = e_mez(c, hex('#8a7a50'), 0.3); }
    c = l > 0.6 ? e_mez(c, hex('#fff6dc'), (l - 0.6) * 0.9) : l < 0.4 ? e_mez(c, hex('#3a2a1a'), (0.4 - l) * 0.9) : c;
    const nv = Math.floor(a * 14); if (x + 1 < W && y + 1 < Hh && (Math.floor(A[i + 1] * 14) !== nv || Math.floor(A[i + W] * 14) !== nv)) c = e_mez(c, hex('#6a4a2a'), nv % 4 === 0 ? 0.45 : 0.22);
    B[py * 320 + px] = c; }
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) if (RI[(y - Y0) * W + x - X0] && !RI[(y - Y0) * W + x - X0 - 1]) pset(x, y, hex('#2a5a88'));
  // los arroyos y las carreteras
  for (const pts of [[[96, 140], [100, 150], [98, 166]], [[150, 90], [146, 110], [140, 130], [134, 166]]]) for (let k = 0; k < pts.length - 1; k++) linea(pts[k][0], pts[k][1], pts[k + 1][0], pts[k + 1][1], hex('#5a8ab8'));
  for (const [a, b] of [[[104, 112], [36, 100]], [[104, 112], [124, 96]], [[104, 112], [214, 104]], [[104, 112], [120, 166]], [[214, 104], [264, 98]], [[104, 112], [150, 40]]]) linea(a[0], a[1], b[0], b[1], hex('#b0503a'), 2);
  // la ciudad (Şanlıurfa): manzanas pequeñas alrededor del centro
  for (let k = 0; k < 46; k++) { const an = h(k, 1, 984) * 6.28, r = Math.sqrt(h(k, 2, 984)) * 11, x = Math.round(104 + Math.cos(an) * r * 1.3), y = Math.round(112 + Math.sin(an) * r); rect(x, y, x + 1, y + 1, h(k, 3, 984) < 0.5 ? hex('#8a8a92') : hex('#c8c4c0')); pset(x + 1, y + 1, hex('#4a4a52')); }
  // el filete de la cuadrícula, la rosa (solo flecha), la regla y la leyenda
  for (let x = 39; x < 266; x += 50) for (let y = 26; y < 168; y += 3) e_tono(R, x, y, -0.15);
  for (let y = 51; y < 168; y += 50) for (let x = 14; x < 266; x += 3) e_tono(R, x, y, -0.15);
  // la frontera con Siria al sur (raya y punto), con el otro lado un poco apagado
  for (let x = X0; x <= X1; x++) { const yf = Math.round(161 + Math.sin(x * 0.045) * 1.5 + Math.sin(x * 0.13) * 0.6);
    for (let y = yf + 2; y <= Y1; y++) if (((x + y) & 1) === 0) e_tono(R, x, y, 0.16, hex('#e8e0d0'));
    const m = x % 9; if (m < 5 || m === 7) { pset(x, yf, hex('#7a3a5a')); if (m < 5) pset(x, yf + 1, hex('#c88aa0')); } }
  // el cráter de Karacadağ y sus coladas de basalto
  for (let a = 0; a < 6.28; a += 0.2) { pset(Math.round(242 + Math.cos(a) * 4), Math.round(87 + Math.sin(a) * 3), a > 3.4 && a < 5.9 ? hex('#5e5658') : hex('#d8d0c8')); }
  for (let k = 0; k < 22; k++) { const an = k * 0.2856 + h(k, 1, 1102) * 0.12, r1 = 6 + h(k, 2, 1102) * 3, r2 = 15 + h(k, 3, 1102) * 9, sombra = Math.sin(an) > -0.2 && Math.cos(an) > -0.6;   // las rayas de pendiente
    for (let r = r1; r < r2; r += 1) { const x = Math.round(242 + Math.cos(an) * r), y = Math.round(87 + Math.sin(an) * r * 0.85); if (x < X1) pset(x, y, sombra ? hex('#4e4648') : hex('#6e6668')); } }
  for (const [dx, dy] of [[-1, 0.5], [0.6, 1]]) for (let s = 8; s < 26; s++) if (s % 4) pset(Math.round(242 + dx * s + Math.sin(s * 0.7)), Math.round(87 + dy * s * 0.8), hex('#3e3638'));   // dos coladas
  const urfa = e_mapaTurquia(R, 204, 28);
  { const rx = 250, ry = 148; disco(rx, ry, 9, hex('#3a2e22')); disco(rx, ry, 8, hex('#efe4c8')); poligono([[rx, ry - 12], [rx + 3, ry], [rx, ry + 2], [rx - 3, ry]], hex('#9a2a2a')); poligono([[rx, ry - 12], [rx, ry + 2], [rx - 3, ry]], hex('#c84a3a'));
    poligono([[rx, ry + 9], [rx + 3, ry], [rx - 3, ry]], hex('#3a2e22')); linea(rx - 8, ry, rx + 8, ry, hex('#3a2e22')); }
  rect(18, 150, 72, 164, hex('#3a2e22')); rect(19, 151, 71, 163, hex('#f2e8cc'));
  for (let k = 0; k < 4; k++) rect(22 + k * 10, 160, 31 + k * 10, 161, k % 2 ? hex('#f2e8cc') : hex('#2a2a2a')); rect(22, 159, 61, 159, hex('#2a2a2a')); rect(22, 162, 61, 162, hex('#2a2a2a'));
  R.numero('0', 22, 157, { color: hex('#2a2a2a'), centro: true, sombra: false, fina: true }); R.numero('10', 42, 157, { color: hex('#2a2a2a'), centro: true, sombra: false, fina: true }); R.numero('20', 62, 157, { color: hex('#2a2a2a'), centro: true, sombra: false, fina: true });
  // los pliegues del papel y las chinchetas
  for (let y = 21; y < 172; y++) { e_tono(R, 139, y, -0.12); e_tono(R, 140, y, 0.18); } for (let x = 9; x < 270; x++) { e_tono(R, x, 96, -0.12); e_tono(R, x, 97, 0.15); }
  for (const [x, y] of [[14, 26], [264, 26], [14, 166], [264, 166]]) { disco(x + 1, y + 2, 3, hex('#2a1a10')); disco(x, y, 3, hex('#a82a2a')); disco(x, y, 2, hex('#d84a3a')); pset(x - 1, y - 1, hex('#ffb0a0')); }
  // la mesa de la derecha: el vaso de té en su plato, la libreta con bocetos, el lápiz y la paleta
  disco(296, 74, 9, C.k); disco(296, 74, 8, hex('#e8e4dc')); disco(296, 73, 6, hex('#c8c4bc'));
  poligono([[290, 52], [302, 52], [299, 62], [302, 72], [290, 72], [293, 62]], C.k); poligono([[291, 53], [301, 53], [298, 62], [301, 71], [291, 71], [294, 62]], hex('#c86a2a'));
  poligono([[291, 53], [301, 53], [300, 56], [292, 56]], hex('#e8a060')); linea(292, 54, 292, 70, hex('#f8d0a0')); pset(296, 51, hex('#f0e8e0'));
  rect(278, 88, 316, 130, C.k); rect(279, 89, 315, 129, hex('#f2ecd8')); rect(296, 89, 297, 129, hex('#c8c0a8'));
  for (let y = 93; y < 128; y += 4) { linea(281, y, 294, y, hex('#c8d0e0')); linea(299, y, 313, y, hex('#c8d0e0')); }
  rect(283, 96, 291, 98, hex('#5a5a6a')); rect(286, 98, 288, 110, hex('#5a5a6a')); for (let y = 100; y < 112; y += 3) linea(301, y, 301 + (y % 9), y, hex('#5a5a6a'));
  linea(282, 136, 312, 124, C.k); linea(282, 137, 312, 125, hex('#e8b830')); pset(312, 124, hex('#f0a0a0')); pset(282, 137, hex('#3a3a3a'));
  poligono([[280, 168], [292, 150], [298, 156], [286, 172]], C.k); poligono([[282, 167], [292, 152], [296, 156], [286, 170]], hex('#a8aeb6')); linea(283, 166, 292, 153, hex('#e0e4ea'));
  linea(296, 155, 312, 143, hex('#6a4426')); linea(297, 156, 313, 144, hex('#8a5a32')); linea(296, 156, 312, 144, hex('#4a2e18'));
  return { sitios: E_SITIOS.map((p) => p.slice()), papel: [8, 20, 270, 172], turquia: [204, 28, 262, 58], urfa };
}
function e_mapa(R, t, o) {
  const info = e_capa(R, 'mapa', () => e_mapaFijo(R));
  const { pset, disco, linea, rect } = R, B = R.buf, [X0, Y0, X1, Y1] = E_MAPA;
  // las sombras de las nubes que pasan por el mapa
  for (let k = 0; k < 3; k++) { const cx = Math.round(((h(k, 1, 985) * 300 + t * (5 + k * 2)) % 340) - 30 + X0), cy = 40 + k * 44, rx = 26 + k * 6, ry = 12 + k * 2;
    for (let y = Math.max(Y0, cy - ry); y <= Math.min(Y1, cy + ry); y++) for (let x = Math.max(X0, cx - rx); x <= Math.min(X1, cx + rx); x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (e_ruido(x / 6, y / 6, 986 + k) - 0.5) * 0.6; if (d < 1 && e_bayer(x, y) < 0.6) B[y * 320 + x] = e_mez(B[y * 320 + x], hex('#2a2a3a'), 0.22); } }
  // las colinas: apagadas, un círculo oscuro; encendidas, un punto que late con su halo y la línea de puntos desde Göbekli
  const n = Math.round(e_sat(o.encendidas ?? 0) * E_SITIOS.length), [gx, gy] = E_SITIOS[0];
  R.recorte(E_MAPA);
  for (let k = 1; k < n; k++) { const [x, y] = E_SITIOS[k], m = Math.floor(t * 8) % 4; const pasos = Math.ceil(Math.hypot(x - gx, y - gy)); for (let i = 3; i < pasos - 3; i++) if ((i + m) % 4 < 2) pset(Math.round(gx + (x - gx) * i / pasos), Math.round(gy + (y - gy) * i / pasos), hex('#fff0a0')); }
  E_SITIOS.forEach(([x, y], k) => {
    if (k >= n) { disco(x, y, 3, hex('#3a2e22')); disco(x, y, 2, hex('#e8dcbc')); pset(x, y, hex('#3a2e22')); return; }
    const late = (t * 1.2 + k * 0.37) % 1, r = 3 + late * 8;
    for (let a = 0; a < 6.28; a += 0.5 / r) { const px = Math.round(x + Math.cos(a) * r), py = Math.round(y + Math.sin(a) * r); if (e_bayer(px, py) > late * 0.9) pset(px, py, hex('#ffd860')); }
    for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, j); if (d < 5 && e_bayer(x + i, y + j) < 0.5 - d / 12) e_tono(R, x + i, y + j, 0.5, hex('#fff0a0')); }
    disco(x, y, 3, hex('#7a2a10')); disco(x, y, 2, hex('#f08a2a')); pset(x, y, hex('#fff8d0')); pset(x - 1, y - 1, hex('#fff8d0'));
    if (k < 2) { const tx = x, ty = y - 8; rect(tx - 5, ty - 9, tx + 5, ty - 6, C.k); rect(tx - 2, ty - 6, tx + 2, ty, C.k); rect(tx - 4, ty - 8, tx + 4, ty - 7, hex('#f0dcb0')); rect(tx - 1, ty - 6, tx + 1, ty - 1, hex('#e0c898')); pset(tx + 1, ty - 5, hex('#b8a070')); }
  });
  R.recorte(null);
  // en el mapita de Turquía, Şanlıurfa late dentro de su recuadro
  if (info.urfa) { const [ux, uy] = info.urfa, on = Math.floor(t * 2.5) % 2; pset(ux, uy, on ? hex('#ffe070') : hex('#c83a2a')); if (on) { pset(ux - 1, uy, hex('#c83a2a')); pset(ux + 1, uy, hex('#c83a2a')); pset(ux, uy - 1, hex('#c83a2a')); pset(ux, uy + 1, hex('#c83a2a')); } }
  // una hormiga que cruza la mesa por debajo del papel, con sus paradas, y vuelve
  { const u = (t * 0.045) % 1, ida = u < 0.5, f = ida ? u * 2 : 2 - u * 2, para = Math.sin(t * 1.3) > 0.7, ax = Math.round(20 + e_suave(f) * 290), ay = 175 + Math.round(Math.sin(f * 9) * 1.2), d = ida ? 1 : -1, pa = para ? 0 : Math.floor(t * 10) % 2;
    pset(ax, ay, hex('#1a1210')); pset(ax + d, ay, hex('#1a1210')); pset(ax - d, ay, hex('#2a1a14')); pset(ax + 2 * d, ay - 1, hex('#1a1210')); pset(ax - 2 * d, ay, hex('#2a1a14'));
    pset(ax - pa, ay + 1, hex('#1a1210')); pset(ax + 1 - pa * 2 * d, ay + 1, hex('#1a1210')); pset(ax + 3 * d, ay - 2, hex('#3a2a20')); }
  // el té que tiembla en el vaso: un brillo que va y viene
  if (Math.sin(t * 1.7) > 0) pset(299, 55 + Math.round(Math.sin(t * 3) * 1), hex('#fff0d0'));
  // el vapor del té (sin entrar en la zona de Atom)
  for (let k = 0; k < 7; k++) { const u = ((t * 0.5 + k / 7) % 1), y = Math.round(50 - u * 4), x = Math.round(296 + Math.sin(u * 7 + k) * 2 + (k % 3) - 1); if (y > 45 && e_bayer(x, y) < 1 - u) e_tono(R, x, y, 0.35, C.blanco); }
  return info;
}
// las rampas de color (de oscuro a claro) y la trama ordenada de 4 × 4
const f_rampa = (l) => l.map(hex);

const F_CALIZA = f_rampa(['#4a3c2c', '#76664a', '#a08c68', '#c0ac86', '#d8c8a4', '#ece0c4', '#faf3e0']);

const F_BASALTO = f_rampa(['#121012', '#221e20', '#322e30', '#454042', '#5c5659', '#787175', '#958d92']);

const F_CLORITA = f_rampa(['#101814', '#1c2822', '#2a3c33', '#3a5246', '#4e6a5c', '#6a8a78', '#8eae9a']);

const F_TIERRA = f_rampa(['#3a1e12', '#5a3020', '#7a4428', '#925436', '#a8643e', '#c07a52', '#d8966c']);

const F_PAPILLA = f_rampa(['#6a4e2a', '#94743e', '#b8945a', '#d0ae74', '#e4c890', '#f2dcaa', '#fff0cc']);

const F_MADERA = f_rampa(['#2e1c10', '#4e3018', '#6e4626', '#8e5e34', '#ae7a48', '#c8965e', '#e0b47a']);

const F_HARINA = f_rampa(['#8a8272', '#a8a090', '#c4bcaa', '#d8d2c0', '#e8e2d2', '#f4f0e4', '#fffdf6']);

const F_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16);

// f_eli y f_cap: ¿cae la celda (i, j) dentro de una elipse o de una cápsula (un segmento con grosor r)?
const f_eli = (i, j, cx, cy, rx, ry) => ((i + 0.5 - cx) / rx) ** 2 + ((j + 0.5 - cy) / ry) ** 2 <= 1;

const f_cap = (i, j, ax, ay, bx, by, r) => {
  const px = i + 0.5 - ax, py = j + 0.5 - ay, dx = bx - ax, dy = by - ay;
  const u = Math.max(0, Math.min(1, (px * dx + py * dy) / (dx * dx + dy * dy || 1)));
  return (px - u * dx) ** 2 + (py - u * dy) ** 2 <= r * r;
};

// f_pieza: pinta una pieza de piedra a escala s (cada píxel lógico es un cuadrado de s × s) desde su esquina de arriba
// a la izquierda (X0, Y0), con w × hh píxeles lógicos. forma(i, j) devuelve null (vacío) o [rampa, z, tono]: la rampa
// de colores (de oscuro a claro, o un color suelto), la altura z (relieves y tallas: más alto, más cerca) y un ajuste de
// tono. La luz viene de arriba a la izquierda: lo que sube respecto a su vecino de arriba-izquierda se aclara, lo que baja
// queda en sombra (y lo alto echa una sombra de dos píxeles abajo a la derecha); contorno oscuro donde acaba la pieza;
// grano de piedra con h() y trama ordenada entre tonos. o.contorno (color), o.semilla (el grano), o.luz (suma al tono).
// Respeta R.recorte (pinta con pset).
function f_pieza(R, X0, Y0, w, hh, s, forma, o = {}) {
  const W2 = w + 4, N = W2 * (hh + 4), Z = new Float32Array(N).fill(NaN), RP = new Array(N), TN = new Float32Array(N);
  const id = (i, j) => (j + 2) * W2 + i + 2;
  for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) { const r = forma(i, j); if (r) { const k = id(i, j); Z[k] = r[1]; RP[k] = r[0]; TN[k] = r[2] || 0; } }
  const cont = o.contorno ?? hex('#1c1612'), sem = o.semilla ?? 0, luz = o.luz ?? 0;
  const pon = (i, j, c) => { const x = X0 + i * s, y = Y0 + j * s; for (let b = 0; b < s; b++) for (let a = 0; a < s; a++) R.pset(x + a, y + b, c); };
  for (let j = -1; j <= hh; j++) for (let i = -1; i <= w; i++) {
    const k = id(i, j), z = Z[k];
    if (Number.isNaN(z)) { if (!Number.isNaN(Z[k - 1]) || !Number.isNaN(Z[k + 1]) || !Number.isNaN(Z[k - W2]) || !Number.isNaN(Z[k + W2])) pon(i, j, cont); continue; }
    const rp = RP[k];
    if (typeof rp === 'number') { pon(i, j, rp); continue; }
    const zul = Z[k - W2 - 1], zul2 = Z[k - 2 * W2 - 2], zdr = Z[k + W2 + 1], n = rp.length;
    // el filo: lo que asoma sobre su vecino de arriba-izquierda brilla; lo que queda debajo de un escalón, raya oscura
    if (!Number.isNaN(zul) && zul - z > 0.6) { pon(i, j, rp[Math.min(1, n - 1)]); continue; }
    let l = Number.isNaN(zul) ? 0.6 : z - zul > 0.6 ? 0.9 : 0;
    if (!Number.isNaN(zul2) && zul2 - z > 0.9) l -= 0.6;
    // el volumen («almohada»): cuántos pasos hay hasta el borde de su parte hacia arriba-izquierda y hacia
    // abajo-derecha; cerca del borde de arriba-izquierda se aclara, cerca del de abajo-derecha se oscurece
    let a = 1, b = 1;
    for (; a < 5; a++) { const q = Z[k - a * (W2 + 1)]; if (!(q > z - 0.5)) break; }
    for (; b < 5; b++) { const q = Z[k + b * (W2 + 1)]; if (!(q > z - 0.5)) break; }
    l += Math.max(-1.1, Math.min(0.9, (b - a) * 0.3));
    if (Number.isNaN(zdr)) l -= 0.5;
    const v = (n - 1) / 2 + TN[k] + luz + l + (h(i, j, sem) - 0.5) * 0.35 + (h(i >> 2, j >> 2, sem + 3) - 0.5) * 0.4 + (F_B4[(j & 3) * 4 + (i & 3)] - 0.5) * 0.9;
    pon(i, j, rp[Math.max(0, Math.min(n - 1, Math.round(v)))]);
  }
}

// f_oscuro: un color oscurecido (f < 1) o aclarado (f > 1), canal a canal
const f_oscuro = (c, f) => (0xff000000 | (Math.min(255, Math.round(((c >> 16) & 255) * f)) << 16) | (Math.min(255, Math.round(((c >> 8) & 255) * f)) << 8) | Math.min(255, Math.round((c & 255) * f))) >>> 0;

// f_sombra: la sombra de una pieza en el suelo: una elipse tramada que oscurece lo que hay debajo (cx, cy: su centro)
function f_sombra(R, cx, cy, rx, ry, f = 0.6) {
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
    const d = ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2; if (d > 1 || (d > 0.55 && (x + y) & 1)) continue;
    R.pset(x, y, f_oscuro(R.pget(x, y), f));
  }
}

// f_motas: polvo que flota en la luz alrededor de una pieza (sube despacio y titila); x0..x1, y0..y1: la zona
function f_motas(R, t, x0, y0, x1, y1, n = 6, c = hex('#f4e8c8')) {
  for (let k = 0; k < n; k++) {
    const per = 5 + h(k, 8) * 4, u = ((t + h(k, 7) * 10) % per) / per;
    const x = Math.round(x0 + h(k, 9) * (x1 - x0) + Math.sin(t * 0.9 + k) * 3), y = Math.round(y1 - u * (y1 - y0));
    if (Math.sin(t * 3 + k * 1.7) > -0.3 && u > 0.05 && u < 0.95) R.pset(x, y, c);
  }
}

// f_espiga: una espiga de trigo silvestre tumbada (x, y: el pie del tallo; ang: hacia dónde apunta, en radianes; s: la
// escala): el tallo, los granos en dos filas alternas con su brillo y las barbas hacia delante
function f_espiga(R, x, y, ang, s) {
  const ca = Math.cos(ang), sa = Math.sin(ang), L = 9 * s, n = 6;
  R.linea(x, y, x + ca * L, y + sa * L, C.trigoS);
  for (let k = 0; k < n; k++) {
    const d = L + k * 1.6 * s, lado = k & 1 ? 1 : -1, px = x + ca * d - sa * lado * 0.9 * s, py = y + sa * d + ca * lado * 0.9 * s;
    R.linea(px, py, px + (ca - sa * lado * 0.7) * 4 * s, py + (sa + ca * lado * 0.7) * 4 * s, C.trigoS);
    for (let b = 0; b < s + 1; b++) for (let a = 0; a < s + 1; a++) R.pset(Math.round(px) + a, Math.round(py) + b, a + b === 0 ? hex('#f6e2a0') : a + b > s ? C.trigoS : C.trigo);
  }
}

// las figuritas en píxeles lógicos: # piedra, o ojo tallado, d detalle tallado (boca, plumas), t colmillo (brillante)
const F_ZORRO = ['.....#...#..', '.....##.##..', '.....######.', '.....#o#####', '......#####d', '......###dd.', '.....####...', '....######..', '...#######..', '...#######..', '..########..', '##.#######..', '############'];

const F_JABALI = ['....#.#.#.#...', '...##########.', '..############', '.#o###########', '##############', '#t###########.', '.t##########..', '..##.##..##...', '..##.##..##...'];

const F_BUITRE = ['.......###.', '......#o###', '......##.##', '.......#..d', '....#####..', '...#d#d##..', '..#d#d#d#..', '.#d#d#d##..', '#d#d#d##...', '#######....', '.######....', '..#..#.....', '.##.##.....'];

// los cinco relieves de Sayburç como mapas de alturas en coordenadas continuas (u, v: el centro del píxel dentro de su
// hueco, en píxeles lógicos; devuelven 0 fuera), para tallarlos al píxel a cualquier escala
// f_leoRel: el leopardo de perfil, mirando a la derecha (27 × 16): cabeza con orejas, ojo, nariz y boca, el lomo con
// rosetas, la línea del vientre, las cuatro patas con zarpas y la cola levantada en gancho con anillas
function f_leoRel(u, v) {
  const c = (ax, ay, bx, by, r) => f_C(u, v, ax, ay, bx, by, r), e = (a, b, rx, ry) => f_E(u, v, a, b, rx, ry);
  if (e(24.5, 4.4, 0.65, 0.45)) return 1.3;                                                 // el ojo
  if (e(27.2, 5.5, 0.5, 0.5)) return 2.6;                                                   // la nariz
  if (u > 25 && Math.abs(v - 6.9) < 0.3) return 1.5;                                        // la boca
  if (e(22, 2.3, 0.9, 1.1) || e(25.2, 2.2, 0.9, 1.1)) return e(22, 2.5, 0.4, 0.5) || e(25.2, 2.4, 0.4, 0.5) ? 1.8 : 2.3;
  if (e(23.8, 5, 3.2, 2.8) || e(26.3, 6, 1.4, 1.3)) return 2.3;
  if (e(13.5, 8.6, 9, 3.2) || e(20, 8.3, 3.2, 3.6) || e(6.5, 8.3, 3.4, 3.6)) {
    const fy = Math.round(v / 2.6), fx = Math.round((u - (fy & 1) * 1.6) / 3.2), d = Math.hypot(u - fx * 3.2 - (fy & 1) * 1.6, v - fy * 2.6);
    if (v > 5.4 && v < 10.6 && d > 0.45 && d < 1.0) return 1.3;                            // las rosetas
    if (v > 10.6 && u > 8 && u < 18 && Math.abs(v - 10.9) < 0.3) return 1.7;                 // la línea del vientre
    return 2;
  }
  if (c(19, 10, 19, 15.4, 1.1) || c(21.5, 10, 22, 15.4, 1.1) || c(5.5, 10, 4.5, 15.4, 1.2) || c(8.5, 10, 9, 15.4, 1.1)) return v > 14.7 && (u % 0.9) < 0.3 ? 1.5 : 1.9;   // las zarpas
  if (c(3.4, 7, 1.5, 5, 0.8) || c(1.5, 5, 1.5, 1.6, 0.8) || c(1.5, 1.6, 3.5, 0.5, 0.7)) return (v % 1.5) < 0.4 ? 1.55 : 1.9;   // la cola con anillas
  return 0;
}
// f_hombreRel: el hombre de en medio, de frente (15 × 34): cabeza con ojos, nariz y boca, brazos que bajan y se doblan
// con las manos (y sus dedos) sobre el vientre, cinturón, faldellín plisado, piernas con rodillas y pies
function f_hombreRel(u, v) {
  const c = (ax, ay, bx, by, r) => f_C(u, v, ax, ay, bx, by, r), e = (a, b, rx, ry) => f_E(u, v, a, b, rx, ry);
  if (e(6.2, 3.6, 0.6, 0.45) || e(8.8, 3.6, 0.6, 0.45)) return 1.5;                         // los ojos
  if (Math.abs(u - 7.5) < 0.45 && v > 3.8 && v < 5.4) return 2.55;                          // la nariz
  if (Math.abs(v - 6.1) < 0.3 && Math.abs(u - 7.5) < 1.1) return 1.6;                       // la boca
  if (e(7.5, 4, 3.2, 3.8)) return 2.2;
  if (c(2.4, 19.8, 6, 21.6, 1.3) || c(12.6, 19.8, 9, 21.6, 1.3)) return Math.abs(u - 7.5) < 3 && ((u + 0.2) % 0.9) < 0.3 ? 2.25 : 2.6;   // las manos con los dedos
  if (c(2.8, 11.5, 2.2, 19.5, 1.5) || c(12.2, 11.5, 12.8, 19.5, 1.5)) return 2.6;
  if (Math.abs(v - 22.4) < 0.5 && Math.abs(u - 7.5) < 4.2) return 2.45;                     // el cinturón
  if (e(7.5, 24.5, 4, 2.6)) return (u % 1.1) < 0.3 ? 2.05 : 2.3;                            // el faldellín plisado
  if (c(7.5, 7, 7.5, 9, 1.5) || e(7.5, 12.5, 5.6, 3) || c(7.5, 11, 7.5, 21.5, 4.1)) return Math.abs(v - 14.3 - Math.abs(u - 7.5) * 0.25) < 0.25 && Math.abs(u - 7.5) < 3.5 ? 1.75 : 2;   // el pecho
  if (e(5.6, 28.6, 1.3, 1.1) || e(9.4, 28.6, 1.3, 1.1)) return 2.2;                          // las rodillas
  if (c(5.6, 25, 5.4, 32.6, 1.8) || c(9.4, 25, 9.6, 32.6, 1.8) || c(5.4, 33, 3, 33.2, 1) || c(9.6, 33, 12, 33.2, 1)) return 2;
  return 0;
}
// f_cazadorRel: el hombre de la derecha, de perfil mirando al toro (13 × 34): ojo, nariz, un brazo en alto con un palo
// corto, el otro adelantado con la mano abierta, cinturón, faldellín plisado y las piernas en zancada
function f_cazadorRel(u, v) {
  const c = (ax, ay, bx, by, r) => f_C(u, v, ax, ay, bx, by, r), e = (a, b, rx, ry) => f_E(u, v, a, b, rx, ry);
  if (e(7.4, 3.7, 0.55, 0.45)) return 1.5;                                                  // el ojo
  if (Math.abs(v - 6.1) < 0.28 && u > 7.2 && u < 8.6) return 1.6;                           // la boca
  if (e(6, 4.2, 3, 3.6) || e(9.1, 4.6, 0.8, 1)) return 2.2;
  if (c(10.5, 7, 11.5, 2, 0.7)) return 2.75;                                                // el palo
  if (c(7, 11, 10.5, 7, 1.2) || c(6.5, 12.5, 11, 15.5, 1.2) || e(11.3, 15.8, 1.1, 0.9)) return 2.6;
  if (Math.abs(v - 21.2) < 0.5 && Math.abs(u - 6) < 3.4) return 2.45;                       // el cinturón
  if (e(6, 23, 3.6, 2.4)) return (u % 1.1) < 0.3 ? 2.05 : 2.3;                              // el faldellín plisado
  if (c(6, 8, 6, 10, 1.4) || c(6, 10, 6, 21, 3.1)) return 2;
  if (c(6, 23, 3.6, 32.6, 1.7) || c(6, 23, 9, 32.6, 1.7) || c(3.6, 33, 5.5, 33.2, 1) || c(9, 33, 11.4, 33.2, 1)) return 2;
  return 0;
}
// f_toroRel: el toro de perfil, mirando a la izquierda con la cabeza baja (32 × 22): cuernos grandes en lira con
// anillas, la oreja, el ojo, el hollar, la papada con pliegues, la giba, el músculo del hombro, las cuatro patas con las
// pezuñas partidas y la cola con su borla
function f_toroRel(u, v) {
  const c = (ax, ay, bx, by, r) => f_C(u, v, ax, ay, bx, by, r), e = (a, b, rx, ry) => f_E(u, v, a, b, rx, ry);
  if (c(6, 10, 3, 6, 0.9) || c(3, 6, 1.5, 2.5, 0.8) || c(7.5, 10, 9.5, 6, 0.8) || c(9.5, 6, 8.5, 2.5, 0.7)) return (v % 1.3) < 0.3 && v > 4.5 ? 2.25 : 2.6;   // los cuernos anillados
  if (e(5.5, 12.3, 0.65, 0.5)) return 1.4;                                                  // el ojo
  if (e(1.5, 16.3, 0.5, 0.45)) return 1.4;                                                  // el hollar
  if (e(8.4, 10.4, 1.1, 0.7)) return 2.6;                                                   // la oreja
  if (e(5.5, 13, 3.6, 3.6) || e(3, 15.8, 2.6, 2.2)) return Math.abs(v - 17.2) < 0.25 && u < 3.5 ? 1.8 : 2.4;
  if (e(9.6, 16.5, 2.2, 2.6)) return (v % 1.2) < 0.3 ? 1.85 : 2.1;                          // la papada con pliegues
  if (e(17, 11.5, 10, 5.5) || e(12.5, 7.2, 5, 2.6) || e(25, 10.5, 4, 5)) {
    if (Math.abs(u - (13.6 + (v - 9) * 0.3)) < 0.3 && v > 8 && v < 15) return 1.75;          // el músculo del hombro
    return Math.abs(v - 13.4) < 0.3 && u > 11 && u < 22 ? 1.8 : 2;
  }
  if (c(11, 15, 10, 21, 1.4) || c(14, 15, 14.5, 21, 1.4) || c(22, 15, 23, 21, 1.4) || c(25.5, 14, 26.5, 21, 1.4)) {
    const centro = [10.1, 14.5, 23, 26.5].some((q) => Math.abs(u - q) < 0.25);
    return v > 20 && centro ? 1.4 : v > 20 ? 2.2 : 1.9;                                     // las pezuñas partidas
  }
  if (c(28.5, 8, 30.5, 15, 0.7)) return 1.9;
  if (e(30.6, 16.2, 1, 1.6)) return (v % 0.9) < 0.3 ? 1.6 : 2;                              // la borla
  return 0;
}
// la paleta de los objetos de las pausas (madera, troncos, cuerda, cazadores, hierro, vidrio, arena, tarta, piedra de
// moler, papilla, trigo, cesta, enchufe, nube, libros)
const g_P = pal({
  mad: '#9a6a3a', madL: '#c48c52', madS: '#6a4424', madD: '#3e2814',
  tronco: '#8a6a44', troncoL: '#b8946a', troncoS: '#5e4428', corteza: '#4e3a26', corteL: '#e0c08a', corteM: '#c8a26a', anillo: '#a07848',
  cuerda: '#dcc48c', cuerdaS: '#a08a5a',
  pielA: '#e8b088', pielAS: '#b87a58', pielB: '#b07a50', pielBS: '#7e5232', pelo: '#3a2618', peloR: '#6a3a1e',
  pellejo: '#9a6a3e', pellejoL: '#c08a58', pellejoS: '#6a4428', zorro: '#d0702e', zorroL: '#f09a50',
  rojo: '#d23c30', rojoL: '#f47058', rojoS: '#8a2420', rojoD: '#58141a',
  hie: '#4c4c58', hieL: '#767684', hieS: '#33333c', goma: '#26262c', gomaL: '#4e4e58',
  plata: '#c8ccd8', plataL: '#f4f6fa', plataS: '#868a98',
  laton: '#c8a040', latonL: '#f0d478', latonS: '#8a6a24',
  vidrio: '#cfe8f0', vidrioL: '#f4fcff', vidrioS: '#7aa4b8',
  arena: '#e8c070', arenaL: '#f8e0a0', arenaS: '#b88e44',
  plato: '#f4f2ec', platoS: '#c4c6d2', platoA: '#4a7ac0', platoAL: '#7aa4e0',
  bizc: '#e8b860', bizcL: '#f8d488', bizcS: '#b8843a', merm: '#c8304a', mermL: '#f05a70', nata: '#fff6e8', nataS: '#e6d6c0',
  rosa: '#f4a8bc', rosaL: '#ffd0dc', rosaS: '#c8708a', cereza: '#d02838', cerezaL: '#ff8a98',
  basalto: '#4a4648', basaltoL: '#6e686a', basaltoS: '#2e2a2c', harina: '#f4efe4', harinaS: '#d8d0bc', grano: '#d8b060', granoS: '#a07e3a',
  papilla: '#e8d0a0', papillaL: '#f8ecc8', papillaS: '#c0a070', vapor: '#f4f8fc',
  tierra: '#8a5a38', tierraL: '#aa744a', tierraS: '#5e3a22', brote: '#6aa84a', broteL: '#9ad06a', broteS: '#3e7a34',
  trigo: '#e8c060', trigoL: '#fae08a', trigoS: '#b8903a',
  cesta: '#b8904e', cestaL: '#d8b46e', cestaS: '#7e5e2e',
  enchufe: '#efe8d6', enchufeL: '#fffaf0', enchufeS: '#c8bea4', enchufeD: '#9a9078', ranura: '#2a2630',
  nube: '#f2f5fb', nubeL: '#ffffff', nubeM: '#d6deec', nubeS: '#a8b4ca', nubeD: '#6e7c98', nubeK: '#3a4660',
  cometa: '#fff0a0', cometaS: '#ffd060', ojo: '#2a2a3a',
  cine: '#1c1830', cineL: '#3a2e52', cineR: '#d8502a', cineO: '#f0b040', cineOL: '#ffe48a',
  lluvia: '#7e9296', lluviaL: '#a8babc', lluviaS: '#566a6e', gota: '#8ad0f4', barro: '#7a5a3a', barroL: '#9a7650',
  hojas: '#f2ead6', hojasS: '#c8bc9e', blanco: '#fffaf0',
});

const g_cl = (v) => Math.max(0, Math.min(1, v));

// mezcla dos colores (a = 0, el primero; a = 1, el segundo)
const g_mez = (c, d, a) => { a = g_cl(a); const ch = (q) => Math.round(((c >>> q) & 255) * (1 - a) + ((d >>> q) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// la diferencia de dos ángulos, en −π…π
const g_dang = (a, b) => { let d = (a - b) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };

// la rejilla de las pausas (copiada de bl-comun.js): pinta en unidades lógicas de s × s píxeles con origen en (x0, y0),
// el centro de la base; P un punto, r un rectángulo, d un disco, l una línea, sombra la sombra tramada en el suelo
function g_grilla(R, x0, y0, s) {
  const P = (a, b, c) => R.rect(x0 + Math.round(a) * s, y0 + Math.round(b) * s, x0 + Math.round(a) * s + s - 1, y0 + Math.round(b) * s + s - 1, c);
  const r = (a0, b0, a1, b1, c) => R.rect(x0 + Math.round(Math.min(a0, a1)) * s, y0 + Math.round(Math.min(b0, b1)) * s, x0 + Math.round(Math.max(a0, a1)) * s + s - 1, y0 + Math.round(Math.max(b0, b1)) * s + s - 1, c);
  const d = (cx, cy, rr, c) => { for (let j = Math.floor(-rr); j <= rr; j++) for (let i = Math.floor(-rr); i <= rr; i++) if (i * i + j * j <= rr * rr + rr * 0.6) P(Math.round(cx) + i, Math.round(cy) + j, c); };
  const l = (a0, b0, a1, b1, c) => { a0 = Math.round(a0); b0 = Math.round(b0); a1 = Math.round(a1); b1 = Math.round(b1); const dx = Math.abs(a1 - a0), dy = -Math.abs(b1 - b0), sx = a0 < a1 ? 1 : -1, sy = b0 < b1 ? 1 : -1; let e = dx + dy; for (;;) { P(a0, b0, c); if (a0 === a1 && b0 === b1) break; const e2 = 2 * e; if (e2 >= dy) { e += dy; a0 += sx; } if (e2 <= dx) { e += dx; b0 += sy; } } };
  const sombra = (cx, w, hh = 2) => { for (let j = 0; j <= hh; j++) for (let i = -w; i <= w; i++) if ((i / w) ** 2 + (j / (hh + 0.5)) ** 2 <= 1) for (let q = 0; q < s * s; q++) { const px = x0 + (cx + i) * s + (q % s), py = y0 + j * s + Math.floor(q / s) - s; if (((px + py) & 1) === 0) R.pset(px, py, g_mez(R.pget(px, py), C.k, 0.45)); } };
  const X = (a) => x0 + a * s, Y = (b) => y0 + b * s;
  return { P, r, d, l, sombra, s, x0, y0, X, Y };
}

// un bloque de madera en la rejilla (contorno, veta ondulada con algún nudo, canto de arriba con luz, abajo y derecha en
// sombra); k cambia la veta
function g_madera(G, a0, b0, a1, b1, k = 0) {
  const P = g_P;
  G.r(a0, b0, a1, b1, C.k);
  for (let b = b0 + 1; b <= b1 - 1; b++) for (let a = a0 + 1; a <= a1 - 1; a++) {
    const v = Math.sin(a * 0.42 + b * 1.9 + Math.sin(a * 0.15 + k) * 2.4 + k * 1.3);
    let col = v > 0.84 ? P.madS : v < -0.92 ? P.madL : P.mad;
    if (h(a, b, 600 + k) > 0.965) col = P.madD;
    if (b === b0 + 1) col = P.madL; else if (b === b1 - 1) col = P.madS;
    if (a === a1 - 1 && b > b0 + 1) col = P.madS;
    G.P(a, b, col);
  }
}

// el número grande de la pausa (o.numero: sin poner, cuando llega su momento —auto—; true, siempre; false, nunca)
const g_numero = (R, o, auto, txt, x, y) => { if (o.numero === false || (o.numero !== true && !auto)) return false; R.numero(txt, Math.round(x), Math.round(y), { centro: true, tam: 16 }); return true; };

// un destello de cuatro puntas que parpadea
const g_destello = (G, a, b, t, k, c, cL) => { const f = Math.sin(t * 5 + k * 2.3); if (f < 0) return; G.P(a, b, cL); if (f > 0.5) { G.P(a - 1, b, c); G.P(a + 1, b, c); G.P(a, b - 1, c); G.P(a, b + 1, c); } };

// TRONCOS · el pilar tumbado sobre troncos, las palancas, la fila que tira de la cuerda y la carretilla (opcional)
function g_troncos(R, G, t, o, x, y, s) {
  const P = g_P, u = g_cl(o.avance ?? 0), dx = Math.round(u * 6);
  G.sombra(2, 38, 2);
  // las astillas de caliza y las piedrecitas que han quedado en el suelo
  for (let k = 0; k < 14; k++) { const a = Math.round(-36 + h(k, 1, 700) * 76), c = h(k, 2, 700) > 0.5 ? C.calizaL : C.calizaS; G.P(a, -1, c); if (k % 3 === 0) G.P(a + 1, -1, C.calizaD); }
  // los troncos, vistos de canto: corteza, la madera clara con sus anillos y una grieta que gira cuando rueda el pilar
  const tronco = (a, r, ang, k) => {
    for (let j = -r - 1; j <= r + 1; j++) for (let i = -r - 1; i <= r + 1; i++) { const d = Math.hypot(i, j); if (d > r + 0.6) continue;
      let c = d > r - 0.3 ? C.k : d > r - 1.2 ? (i + j < -1 ? P.troncoL : i + j > 1 ? P.corteza : P.tronco) : (Math.abs(d - r * 0.5) < 0.5 ? P.anillo : (i + j < 0 ? P.corteL : P.corteM));
      if (d < 0.6) c = P.anillo; G.P(a + i, -r + j - 0.4 + 0.4, c); }
    for (let q = 1; q < r - 0.5; q++) G.P(a + Math.round(Math.cos(ang) * q), -r + Math.round(Math.sin(ang) * q), P.troncoS);
    if (h(k, 0, 701) > 0.4) G.P(a + Math.round(Math.cos(ang + 2.2) * (r - 1.6)), -r + Math.round(Math.sin(ang + 2.2) * (r - 1.6)), P.troncoS);
  };
  // dos troncos de repuesto detrás, a la izquierda (más oscuros), y los tres de debajo del pilar
  for (const [a, k] of [[-40, 7], [-35, 8]]) tronco(a, 3, k, k);
  { const a = -37.5; G.l(a - 3, -8, a + 3, -8, C.k); }
  for (let k = 0; k < 3; k++) tronco(-24 + k * 11 + Math.round(u * 3), 3, u * 7 + k * 1.7, k);
  // la palanca de atrás (en el suelo, de repuesto) y la que trabaja: un palo de madera con la piedra que hace de punto de
  // apoyo, que mete la punta bajo el pilar y sube y baja
  G.l(-44, -1, -30, -2, P.madD); G.l(-44, -2, -30, -3, P.madL);
  const bob = Math.sin(t * 2.6), pa = -32 + dx, ph = -14 + Math.round(bob * 1.5);
  G.d(pa + 2, -1.5, 1.6, C.k); G.d(pa + 2, -1.5, 1, C.calizaS); G.P(pa + 1, -2, C.caliza);
  G.l(pa - 6, ph - 1, pa + 6, -6, C.k); G.l(pa - 6, ph, pa + 6, -5, P.mad); G.l(pa - 5, ph, pa + 5, -6, P.madL);
  // el pilar tumbado: fuste de caliza con vetas, desconchones y el brazo en relieve que corre por el costado; la cabeza de
  // la T a la derecha, más alta, con el cinturón y la piel de zorro cerca de la base
  const a0 = -28 + dx, a1 = 2 + dx, c0 = a1, c1 = 12 + dx;
  const caliza = (a, b, A0, A1, B0, B1, k) => {
    const r = h(a, b, 710 + k), v = Math.sin(a * 0.35 + Math.sin(b * 0.9 + k) * 1.3);
    let c = v > 0.92 ? C.veta : r > 0.93 ? C.calizaS : r < 0.05 ? C.calizaL : C.caliza;
    if (h(a >> 1, b >> 1, 712 + k) > 0.9 && r > 0.5) c = C.calizaS;            // un desconchón
    if (b === B0 + 1) c = C.calizaL; else if (b === B0 + 2 && r < 0.4) c = C.calizaL;
    if (b === B1 - 1) c = C.calizaS; else if (b === B1 - 2 && r > 0.6) c = C.calizaS;
    if (a === A1 - 1) c = C.calizaS; if (a === A0 + 1 && b > B0 + 1) c = C.calizaL;
    return c;
  };
  G.r(a0, -16, a1, -6, C.k);
  for (let b = -15; b <= -7; b++) for (let a = a0 + 1; a <= a1; a++) G.P(a, b, caliza(a, b, a0, a1 + 1, -16, -6, 0));
  G.r(c0, -22, c1, -2, C.k);
  for (let b = -21; b <= -3; b++) for (let a = c0 + 1; a <= c1 - 1; a++) G.P(a, b, caliza(a, b, c0, c1, -22, -2, 3));
  // el canto de la cabeza que mira arriba, más claro (la luz viene de arriba a la izquierda)
  G.r(c0 + 1, -21, c1 - 1, -21, C.calizaL); G.P(c1 - 1, -21, C.caliza);
  // el brazo en relieve: baja desde el hombro (en la cabeza) por el fuste hasta la mano de dedos largos
  for (let a = a0 + 9; a <= c0 + 2; a++) { G.P(a, -12, C.calizaL); G.P(a, -11, C.caliza); G.P(a, -10, C.calizaS); }
  G.P(c0 + 3, -13, C.calizaL); G.P(c0 + 3, -12, C.caliza); G.P(c0 + 3, -11, C.calizaS);
  for (let q = 0; q < 4; q++) { const a = a0 + 5 + q; G.P(a, -12 + (q % 2), C.calizaL); G.P(a, -9, C.calizaS); G.P(a, -10, C.caliza); G.P(a, -11, C.calizaL); }
  G.P(a0 + 4, -11, C.calizaS); G.P(a0 + 4, -10, C.calizaS);
  // el cinturón (una banda en relieve que cruza el fuste) y la piel de zorro que cuelga hacia el pie del pilar
  for (let b = -15; b <= -7; b++) { G.P(a0 + 3, b, C.calizaL); G.P(a0 + 2, b, C.calizaS); if (b % 3 === 0) G.P(a0 + 3, b, C.veta); }
  G.P(a0 + 1, -13, C.calizaS); G.P(a0 + 1, -12, C.calizaL); G.P(a0 + 1, -11, C.calizaS);
  // un zorro en relieve en el fuste, saltando hacia la cabeza: luz arriba a la izquierda, sombra abajo a la derecha
  { const fa = a0 + 13, fb = -13; const Z = ['.......##', 'XXXXXXX#.', '.XXXXXXX.', '.X.X.X.X.'], zr = ['##.......', '.......##'];
    Z.forEach((fila, q) => { for (let k = 0; k < fila.length; k++) if (fila[k] !== '.') { G.P(fa + k, fb + q, C.calizaL); G.P(fa + k + 1, fb + q + 1, C.calizaD); } });
    Z.forEach((fila, q) => { for (let k = 0; k < fila.length; k++) if (fila[k] !== '.') G.P(fa + k, fb + q, q === 0 ? C.calizaL : C.caliza); });
    G.P(fa - 1, fb, C.calizaL); G.P(fa - 2, fb - 1, C.calizaL); G.P(fa - 1, fb + 1, C.calizaD); G.P(fa + 8, fb, C.calizaD); }
  // la cuerda: vueltas alrededor del cuello de la cabeza y un tramo tenso que va a la fila de los que tiran
  const qy = (a) => -12 + (a - (c1 + 1)) * 0.16 + Math.sin(t * 9 + a) * 0.15;
  for (let b = -15; b <= -9; b++) G.P(c0 + 2 + ((b & 1) ? 0 : 0), b, (b & 1) ? P.cuerda : P.cuerdaS);
  for (let b = -15; b <= -9; b++) G.P(c0 + 4, b, (b & 1) ? P.cuerdaS : P.cuerda);
  const ultimo = 17 + 5 * 5 + 1 + dx;
  for (let a = c1; a <= ultimo + 1; a++) { const b = Math.round(qy(a)); G.P(a, b, ((a + Math.floor(t * 6)) & 1) ? P.cuerda : P.cuerdaS); }
  G.P(c1, -12, P.cuerda); G.P(c1, -13, P.cuerdaS);
  // la fila de seis que tira de la cuerda (inclinados hacia delante, con el paso que se mueve) y la que empuja la palanca
  for (let i = 0; i <= 5; i++) { const a = 17 + i * 5 + (i & 1) + dx; g_tirador(G, a, Math.round(qy(a + 4)), t, i, 1); }
  g_tirador(G, pa - 11, ph - 1, t, 9, 1, true);
  // el polvo que levanta el tronco de atrás al rodar
  for (let k = 0; k < 3; k++) { const f = (t * 0.7 + k / 3) % 1, a = -26 + dx - Math.round(f * 5), b = -1 - Math.round(f * 3);
    if (h(k, Math.floor(t * 0.7 + k / 3), 720) < 0.7) { G.P(a, b, g_mez(C.tierraL, C.calizaL, 0.5)); if (f < 0.6) G.P(a - 1, b, C.calizaL); } }
  // «10» y una pesa encima: las diez toneladas
  const nx = G.X(-6 + dx), ny = y - 30 * s;
  if (g_numero(R, o, u > 0.02, '10', nx - 7, ny)) g_pesa(R, nx + 13, ny - 1);
  const res = { arriba: [nx, ny - 18], cabeza: [G.X(c0 + 5), G.Y(-22)], cuerda: [G.X(ultimo + 1), G.Y(Math.round(qy(ultimo + 1)))], pilar: [G.X((a0 + c1) >> 1), G.Y(-16)] };
  if (o.carretilla != null && o.carretilla !== false) Object.assign(res, g_carretilla(R, Math.round(o.carretillaX ?? (x - 112)), Math.round(y), s, t, o.carretilla === true ? 0 : g_cl(o.carretilla)));
  return res;
}

// un cazador diminuto (10 unidades de alto, a la escala del pilar) que tira de una cuerda hacia la derecha, inclinado,
// con la cuerda al hombro: a es el pie de atrás; i cambia la piel, el pelo, el abrigo y la fase del paso; empuja: las
// manos abajo, sobre la palanca
const g_TIRA = ['.hhh.', '.hss.', '.hSs.', 'LvVaa', 'LvV..', '.vvV.', '.VvV.', '.s.s.'];

function g_tirador(G, a, bq, t, i, dir = 1, empuja = false) {
  const P = g_P, piel = i % 2 ? P.pielB : P.pielA, pielS = i % 2 ? P.pielBS : P.pielAS, pelo = i % 3 === 1 ? P.peloR : P.pelo;
  const ves = i % 3 === 2 ? P.zorro : P.pellejo, vesL = i % 3 === 2 ? P.zorroL : P.pellejoL, vesS = i % 3 === 2 ? P.rojoS : P.pellejoS;
  const paso = Math.sin(t * 3.2 + i * 1.1) > 0, col = { h: pelo, s: piel, S: pielS, v: ves, V: vesS, L: vesL, a: piel };
  g_TIRA.forEach((fila, q) => { const b = -10 + q, lean = empuja ? 0 : (q < 5 ? 1 : 0);
    for (let k = 0; k < 5; k++) { const ch = fila[k]; if (ch === '.') continue; if (empuja && ch === 'a') continue; G.P(a + k + lean, b, col[ch]); } });
  // las piernas con el paso y los pies
  if (paso) { G.P(a, -2, pielS); G.P(a + 4, -2, piel); G.P(a - 1, -1, C.k); G.P(a + 4, -1, C.k); }
  else { G.P(a + 1, -2, pielS); G.P(a + 3, -2, piel); G.P(a + 1, -1, C.k); G.P(a + 3, -1, C.k); }
  // el contorno de la cabeza y la espalda, para que se lea sobre el fondo gris
  const l0 = empuja ? 0 : 1; G.P(a + 1 + l0, -11, C.k); G.P(a + 2 + l0, -11, C.k); G.P(a + 3 + l0, -11, C.k); G.P(a + l0, -10, C.k); for (let b = -9; b <= -6; b++) G.P(a + (b < -7 ? l0 : l0 - 1), b, C.k); G.P(a - 1 + (paso ? 0 : 1), -4, C.k); G.P(a - 1 + (paso ? 0 : 1), -3, C.k);
  if (empuja) { G.P(a + 3, -6, piel); G.P(a + 4, -5, piel); G.P(a + 5, Math.min(bq, -4), pielS); }
}

// la pesa de hierro (el símbolo de la tonelada que acompaña al «10»), en píxeles, con su asa
function g_pesa(R, x, y) {
  const P = g_P, k = C.k;
  R.rect(x - 1, y - 14, x + 4, y - 13, k); R.rect(x - 2, y - 12, x - 1, y - 9, k); R.rect(x + 4, y - 12, x + 5, y - 9, k);
  R.rect(x - 6, y - 9, x + 9, y - 8, k); R.rect(x - 8, y - 7, x + 11, y + 1, k);
  R.rect(x - 5, y - 8, x + 8, y - 7, P.hieL); R.rect(x - 7, y - 6, x + 10, y, P.hie); R.rect(x - 7, y - 6, x - 5, y, P.hieL); R.rect(x + 7, y - 6, x + 10, y, P.hieS);
  R.rect(x - 4, y - 4, x + 7, y - 3, P.hieS); R.pset(x - 6, y - 5, P.plataL);
}

// LA CARRETILLA (el anacronismo de Atom): bandeja roja de chapa con remaches, ruedas de goma con radios, patas y varas;
// cx: la rueda, y: el suelo; f 0–1 la rueda se suelta y se va rodando y la bandeja se inclina hasta el suelo.
// Devuelve { rueda: [x, y] (el centro de la rueda), asas: [x, y] (donde van las manos) }.
function g_carretilla(R, cx, y, s, t, f) {
  const P = g_P, G = g_grilla(R, cx, y, s), tilt = 0.45 * g_cl(f / 0.3), off = (a) => Math.round((a + 6) * tilt);
  const Q = (a, b, c) => G.P(a, b + off(a), c);
  const L = (a0, b0, a1, b1, c) => { const n = Math.max(Math.abs(a1 - a0), Math.abs(b1 - b0)); for (let q = 0; q <= n; q++) { const a = Math.round(a0 + (a1 - a0) * q / Math.max(1, n)), b = Math.round(b0 + (b1 - b0) * q / Math.max(1, n)); Q(a, b, c); } };
  G.sombra(-4, 13, 1);
  // las varas y las patas de hierro
  L(-20, -10, -4, -6, C.k); L(-20, -11, -4, -7, P.hieL); L(-19, -10, -4, -6, P.hie);
  Q(-21, -11, P.goma); Q(-22, -11, P.goma); Q(-21, -12, P.gomaL); Q(-22, -12, P.gomaL);
  for (let b = -6; b <= -1; b++) { Q(-6, b, C.k); Q(-5, b, P.hieS); }
  Q(-7, 0, P.goma); Q(-6, 0, P.goma); Q(-5, 0, P.goma);
  L(-4, -6, 6, -4, C.k); L(-4, -5, 6, -3, P.hieS);
  // la bandeja: trapecio de chapa roja con el borde enrollado, luz a la izquierda y remaches
  for (let b = -13; b <= -5; b++) { const k = (b + 13) / 8, aL = Math.round(-10 + k * 5), aR = Math.round(10 - k * 3);
    for (let a = aL; a <= aR; a++) { let c = a === aL || a === aR || b === -5 ? C.k : a <= aL + 1 ? P.rojoL : a >= aR - 2 ? P.rojoS : P.rojo;
      if (b === -9 && (a - aL) % 4 === 2 && a < aR - 1) c = P.plata; if (b === -7 && a > aL && a < aR) c = c === C.k ? c : P.rojoS; Q(a, b, c); } }
  for (let a = -11; a <= 11; a++) { Q(a, -14, C.k); Q(a, -13, a < 0 ? P.rojoL : P.rojo); }
  Q(-11, -13, C.k); Q(11, -13, C.k); Q(-5, -13, P.plataL);
  // la rueda: goma con dibujo, llanta y radios que giran; se suelta y se va dando botes
  const rr = 4, e = g_cl((f - 0.05) / 0.95), wa = 7 + Math.round(e * 12), wb = -4 - Math.round(Math.abs(Math.sin(e * Math.PI * 3)) * (1 - e) * 5), gi = t * 2 + e * 12;
  for (let j = -rr - 1; j <= rr + 1; j++) for (let i = -rr - 1; i <= rr + 1; i++) { const d = Math.hypot(i, j); if (d > rr + 0.6) continue;
    const c = d > rr - 0.3 ? C.k : d > rr - 1.3 ? ((Math.round(Math.atan2(j, i) * 3 + gi * 3) & 1) ? P.goma : P.gomaL) : d < 1 ? P.plataL : P.plataS;
    if (f > 0) G.P(wa + i, wb + j, c); else Q(wa + i, wb + j, c); }
  for (let q = 0; q < 3; q++) { const an = gi + q * Math.PI / 3; for (let r = -2; r <= 2; r++) { const a = Math.round(Math.cos(an) * r), b = Math.round(Math.sin(an) * r); if (f > 0) G.P(wa + a, wb + b, P.plata); else Q(wa + a, wb + b, P.plata); } }
  if (f > 0) { G.P(wa, wb, P.rojo);
    // las dos tuercas que salen volando y el polvo del golpe de la bandeja
    for (let k = 0; k < 2; k++) { const v = g_cl((f - 0.04) / 0.4); if (v <= 0 || v >= 1) continue; G.P(6 + Math.round(v * (k ? 6 : -3)), -5 - Math.round(Math.sin(v * Math.PI) * 9), P.plata); }
    const p = g_cl((f - 0.25) / 0.35); if (p > 0 && p < 1) for (let k = 0; k < 6; k++) { const an = Math.PI + k / 5 * Math.PI; G.P(8 + Math.round(Math.cos(an) * p * 7), -1 + Math.round(Math.sin(an) * p * 3), h(k, 0, 730) > p ? C.calizaL : C.calizaS); } }
  return { rueda: [G.X(wa) + 1, G.Y(wb) + 1], asas: [G.X(-21), G.Y(-11 + off(-21))] };
}

// RELOJ · el reloj de arena (arriba queda la arena que dice la tarta) y la tarta que se parte por la mitad
function g_reloj(R, G, t, o, x, y, s) {
  const P = g_P, mit = Math.max(0, Math.min(5, o.mitades ?? 0)), queda = Math.pow(2, -mit);
  G.sombra(-18, 10, 1); G.sombra(16, 20, 2);
  // ── el reloj de arena: tapas de madera, tres columnas torneadas y el vidrio con la arena que cae
  const ha = -18;
  const w = (b) => { const v = b <= -19 ? (-19 - b) / 15 : (b + 19) / 15; return Math.round(1 + 5 * Math.sin(Math.min(1, v * 1.15) * Math.PI / 2)); };
  // la arena de arriba (queda) y el montón de abajo (se ha ido)
  const nArr = Math.round(queda * 11), nAb = Math.round((1 - queda) * 10);
  for (let b = -34; b <= -4; b++) { if (b === -19) continue; const ww = w(b);
    for (let a = -ww; a <= ww; a++) {
      let c = ((a + b) & 1) ? P.vidrio : g_mez(P.vidrio, P.vidrioS, 0.25);
      if (b < -19 && b >= -20 - nArr + 1 + (Math.abs(a) < 2 && b === -20 - nArr + 1 ? 1 : 0)) c = Math.abs(a) === ww ? P.arenaS : (b === -20 - nArr + 1 ? P.arenaL : P.arena);
      const cima = -4 - nAb + 1 + Math.round(Math.abs(a) * 0.4);
      if (b > -19 && nAb > 0 && b >= cima) c = b === cima ? P.arenaL : a > 1 ? P.arenaS : P.arena;
      if (a === -ww) c = g_mez(c, P.vidrioL, 0.5); if (a === -ww + 1 && (b & 3) === 0) c = P.vidrioL;
      G.P(ha + a, b, c); }
    G.P(ha - ww - 1, b, P.vidrioS); G.P(ha + ww + 1, b, P.vidrioS); }
  G.P(ha, -19, queda > 0.01 ? P.arena : P.vidrio); G.P(ha - 1, -19, P.vidrioS); G.P(ha + 1, -19, P.vidrioS);
  // el chorrito de arena que cae (con granos que bajan)
  if (queda > 0.02 && queda < 0.999) { const fin = -4 - nAb; for (let b = -18; b < fin; b++) G.P(ha, b, ((b + Math.floor(t * 14)) % 3) ? P.arena : P.arenaL); }
  else if (queda >= 0.999) G.P(ha, -18, P.arena);
  // las tapas y las columnas
  g_madera(G, ha - 9, -38, ha + 9, -35, 1); g_madera(G, ha - 9, -3, ha + 9, 0, 2);
  for (const a of [ha - 8, ha + 8]) { G.r(a - 1, -35, a + 1, -3, C.k);
    for (let b = -34; b <= -4; b++) { const bulto = (b === -33 || b === -19 || b === -5); G.P(a, b, bulto ? P.madL : P.mad); if (bulto) { G.P(a - 1, b, P.madL); G.P(a + 1, b, P.madS); } } }
  g_destello(G, ha - 3, -29, t, 1, P.vidrioL, P.blanco); g_destello(G, ha + 3, -10, t * 0.8, 4, P.vidrioL, P.blanco);
  // ── el plato y la tarta
  const tc = 16, pb = -6;
  for (let j = -6; j <= 6; j++) for (let i = -20; i <= 20; i++) { const e = (i / 20) ** 2 + (j / 6) ** 2; if (e > 1) continue;
    G.P(tc + i, pb + j, e > 0.82 ? (j > 0 ? C.k : P.platoS) : e > 0.62 ? (j < 0 ? P.platoAL : P.platoA) : (i < -6 && j < 0 ? P.blanco : P.plato)); }
  // las migas en el plato
  if (mit >= 1) for (let k = 0; k < Math.min(9, Math.floor(mit * 2)); k++) G.P(tc - 12 + Math.round(h(k, 3, 740) * 24), pb + 1 + Math.round(h(k, 4, 740) * 2), k % 2 ? P.bizc : P.bizcS);
  // la tarta, en vóxeles de atrás adelante: el bizcocho en capas con mermelada y nata, el glaseado rosa por fuera, la nata
  // por arriba con cerezas en el borde; se queda la cuña de atrás y la mitad que sobra se aparta y se deshace en migas
  const k = Math.floor(mit + 1e-6), f = mit - k, W = Math.PI * 2 / Math.pow(2, k), atras = -Math.PI / 2;
  const RT = 15, H = 10;
  const cuna = (cen, hw, da, db, borra) => {
    for (let c = -RT; c <= RT; c++) for (let a = -RT; a <= RT; a++) { const rr = Math.hypot(a, c); if (rr > RT + 0.4) continue;
      const th = Math.atan2(c, a), d = g_dang(th, cen); if (hw < Math.PI - 1e-6 && Math.abs(d) > hw) continue;
      for (let z = 0; z <= H + 1; z++) {
        if (borra > 0 && h(a + 40, c * 7 + z, 741) < borra) continue;
        let col;
        const borde = rr > RT - 1.2;
        if (z === H + 1) { const ang = Math.round((th + Math.PI) / (Math.PI / 4)) * (Math.PI / 4) - Math.PI, cer = Math.abs(g_dang(th, ang)) < 0.12 && Math.abs(rr - 10.5) < 1; if (!cer) continue; col = c < -1 ? P.cereza : P.cerezaL; }
        else if (z === H) col = borde ? P.rosa : (Math.abs(rr - 9) < 0.7 && ((a + c) & 1)) ? P.rosaL : (a < -4 && c < 0 ? P.blanco : P.nata);
        else if (borde) col = (a < -6 ? P.rosaL : a > 7 ? P.rosaS : P.rosa);
        else { const capa = (z === 2 || z === 6) ? 1 : (z === 4 || z === 8) ? 2 : 0; col = capa === 1 ? (d < 0 ? P.mermL : P.merm) : capa === 2 ? (d < 0 ? P.nata : P.nataS) : (h(a, c + z * 13, 742) > 0.85 ? P.bizcS : d < 0 ? P.bizcL : P.bizc); }
        if (borde && z < H && z === 0) col = P.rosaS;
        G.P(tc + a + da, pb - 1 + Math.round(c * 0.45) - z + db, col);
      }
    }
  };
  if (k >= 5) { // la última miga: un dadito de bizcocho con su pizca de nata
    G.r(tc - 2, pb - 5, tc + 2, pb - 1, C.k); G.r(tc - 1, pb - 4, tc + 1, pb - 2, P.bizc); G.P(tc - 1, pb - 4, P.nata); G.P(tc, pb - 4, P.rosa); G.P(tc + 1, pb - 2, P.bizcS); G.P(tc - 1, pb - 3, P.merm); }
  else if (f < 1e-3) cuna(atras, W / 2, 0, 0, 0);
  else {
    const corte = g_cl(f / 0.3), sale = g_cl((f - 0.3) / 0.45), borra = g_cl((f - 0.7) / 0.3);
    const giro = (W / 4) * (1 - g_cl((f - 0.45) / 0.5));
    cuna(atras - giro, W / 4, 0, 0, 0);
    if (borra < 1) cuna(atras + W / 4 + (1 - giro / (W / 4)) * 0, W / 4, Math.round(sale * 9), Math.round(sale * 3), borra);
    // las migas que caen del trozo que se deshace
    if (borra > 0) for (let q = 0; q < 8; q++) { const v = (borra * 1.3 + q * 0.11) % 1; G.P(tc + 9 + Math.round(h(q, 1, 743) * 10), pb - 8 + Math.round(v * 9), q & 1 ? P.bizc : P.rosa); }
    // el cuchillo baja por la línea del corte y vuelve a subir
    const cu = corte < 1 ? corte : 1 - g_cl((f - 0.3) / 0.15);
    if (cu > 0) { const pa = tc + 1, pbk = Math.round(pb - 1 - H - 7 - (1 - cu) * 12 + cu * 5);
      // la hoja en diagonal, con el filo claro y el lomo en sombra, y el mango de madera con sus remaches
      for (let q = 0; q <= 11; q++) { const a = pa + q, b = pbk - Math.round(q * 0.5); G.P(a, b - 1, C.k); G.P(a, b, q < 2 ? P.plataS : P.plataL); G.P(a, b + 1, P.plata); G.P(a, b + 2, C.k); }
      for (let q = 12; q <= 17; q++) { const a = pa + q, b = pbk - Math.round(q * 0.5); G.P(a, b - 1, C.k); G.P(a, b, P.madL); G.P(a, b + 1, q === 14 || q === 16 ? P.latonL : P.mad); G.P(a, b + 2, C.k); } }
  }
  g_destello(G, tc - 5, pb - 14, t * 0.7, 2, P.rosaL, P.blanco);
  const auto = mit >= 0.95;
  g_numero(R, o, auto, '5730', x, y - 44 * s);
  return { arriba: [x, y - 44 * s - 18], tarta: [G.X(tc), G.Y(pb - 9)], reloj: [G.X(ha), G.Y(-19)] };
}

// BANQUETE · la piedra de moler con su mano que va y viene, el gran cuenco de piedra con la papilla que humea, la cesta
// de espigas y, detrás, el campo sembrado que crece (o.campo)
function g_banquete(R, G, t, o, x, y, s) {
  const P = g_P, campo = g_cl(o.campo ?? 0);
  // el campo sembrado: tierra en surcos que aparece desde la cesta y unas plantas que crecen de brote a espiga dorada
  if (campo > 0) {
    for (let b = -25; b <= -6; b++) { const prof = Math.min(1, (b + 25) / 16), ancho = Math.round(26 + prof * 8);
      for (let a = -ancho; a <= ancho; a++) { const lleg = campo * 1.35 - (ancho - a) / (ancho * 2) - h(a, b, 750) * 0.12; if (lleg <= 0) continue;
        if (b === -25 && h(a, 1, 751) < 0.5) continue; if (Math.abs(a) === ancho && h(a, b, 752) < 0.5) continue;
        const surco = (b + 25) % 3; let c = surco === 0 ? P.tierraS : surco === 1 ? P.tierraL : P.tierra; if (h(a, b, 753) > 0.94) c = P.tierraS; if (h(a, b, 754) > 0.97) c = C.calizaL;
        // el canto de la parcela (la tierra en sección, como una maqueta) y su contorno
        if (b >= -8) c = b === -6 ? C.k : (h(a, b, 756) > 0.8 ? P.tierraL : P.tierraS); if (Math.abs(a) === ancho || (b === -25)) c = C.k;
        G.P(a, b, c); } }
    for (let fila = 0; fila < 6; fila++) { const b = -24 + fila * 3, prof = fila / 5, ancho = Math.round(26 + prof * 7), alto = 1.5 + prof * 2.5, paso = fila % 2 ? 3 : 2;
      for (let a = -ancho + 1 + (fila % 2); a <= ancho - 1; a += paso) { const g = g_cl((campo * 1.35 - (ancho - a) / (ancho * 2) - 0.08) * 2.4); if (g <= 0) continue;
        const hh = Math.max(1, Math.round(alto * g)), sw = Math.round(Math.sin(t * 2 + a * 0.35 + fila) * g * 0.9), madura = g > 0.92 && h(a, fila, 755) > 0.3;
        for (let q = 0; q < hh; q++) G.P(a + (q === hh - 1 ? sw : 0), b - q, madura ? (q === 0 ? P.trigoS : P.trigo) : (q === hh - 1 ? P.broteL : P.brote));
        if (madura) { G.P(a + sw, b - hh, P.trigoL); if (fila > 2) G.P(a + sw, b - hh - 1, P.trigoL); } } }
  }
  G.sombra(-22, 10, 1); G.sombra(0, 14, 2); G.sombra(21, 9, 1);
  // ── la piedra de moler (basalto poroso, cóncava) con la harina y el grano, y la mano de piedra que va y viene
  const qa0 = -32, qa1 = -15;
  for (let a = qa0; a <= qa1; a++) { const u = (a - qa0) / (qa1 - qa0), top = -6 + Math.round(Math.sin(u * Math.PI) * 1.4);
    for (let b = top; b <= 0; b++) { const r = h(a, b, 760); let c = b === top ? C.k : b === top + 1 ? P.basaltoL : b === 0 ? C.k : a === qa0 || a === qa1 ? C.k : r > 0.85 ? P.basaltoS : r < 0.12 ? P.basaltoL : P.basalto;
      if (b === -1 && a > qa0 && a < qa1) c = P.basaltoS; if (a === qa1 - 1 && b > top + 1 && b < 0) c = P.basaltoS; G.P(a, b, c); } }
  for (let k = 0; k < 7; k++) G.P(qa0 + 3 + Math.round(h(k, 5, 761) * 12), -5 + Math.round(Math.sin((h(k, 5, 761)) * Math.PI) * 1.4), k % 2 ? P.grano : P.harina);
  // el montoncito de harina delante
  for (let a = -17; a <= -12; a++) { const hh = 2 - Math.round(Math.abs(a + 14.5) * 0.7); for (let b = -hh; b <= 0; b++) G.P(a, b, b === -hh ? P.harina : P.harinaS); }
  const ma = Math.round(-24 + Math.sin(t * 2.4) * 3);
  G.r(ma - 4, -9, ma + 4, -6, C.k); G.r(ma - 3, -8, ma + 3, -7, P.basalto); G.r(ma - 3, -8, ma + 1, -8, P.basaltoL); G.P(ma + 3, -7, P.basaltoS); G.P(ma - 4, -9, P.basalto); G.P(ma + 4, -9, P.basalto);
  if (Math.abs(Math.cos(t * 2.4)) > 0.85) G.P(ma + (Math.cos(t * 2.4) > 0 ? 5 : -5), -6, P.harina);
  // ── el gran cuenco de piedra caliza con su banda tallada en zigzag; dentro, la papilla con burbujas
  const bt = -15;
  for (let b = bt; b <= 0; b++) { const u = (b - bt) / -bt, ww = Math.round(12 - u * u * 3.5);
    for (let a = -ww; a <= ww; a++) { const r = h(a, b, 770), v = Math.sin(a * 0.5 + Math.sin(b * 0.8) * 1.3);
      let c = a === -ww || a === ww || b === 0 ? C.k : v > 0.93 ? C.veta : r > 0.92 ? C.calizaS : (a < -ww + 3 ? C.calizaL : a > ww * 0.35 ? C.calizaS : C.caliza);
      if (a > ww - 3 && b > bt && a < ww) c = C.calizaD; if (b === -1 && a > -ww && a < ww) c = C.calizaD;
      // la banda tallada: zigzag en relieve con su luz arriba y su sombra abajo
      const zb = bt + 6 + Math.abs(((a + 40) % 4) - 2) - 1;
      if (b === zb && a > -ww && a < ww) c = C.calizaL; if (b === zb + 1 && a > -ww && a < ww) c = C.calizaD;
      if ((b === bt + 4 || b === bt + 10) && a > -ww && a < ww) c = C.calizaS;
      G.P(a, b, c); } }
  // el labio y la papilla (con burbujas que se hinchan y revientan)
  for (let j = -3; j <= 3; j++) for (let i = -13; i <= 13; i++) { const e = (i / 13) ** 2 + (j / 3.4) ** 2; if (e > 1) continue;
    const ein = (i / 10.5) ** 2 + ((j + 0.4) / 2.2) ** 2;
    let c = e > 0.78 ? (j < 0 ? C.calizaL : C.caliza) : ein <= 1 ? (j < -1 ? P.papillaS : (i < -4 ? P.papillaL : P.papilla)) : C.calizaS;
    if (e > 0.94) c = C.k; G.P(i, bt + j, c); }
  for (let k = 0; k < 5; k++) { const f = (t * 0.8 + k * 0.37) % 1, ba = Math.round(-7 + h(k, 0, 771) * 14), bb = bt + Math.round(-1 + h(k, 1, 771) * 2);
    if (f < 0.7) { G.P(ba, bb, P.papillaL); if (f > 0.35) G.P(ba + 1, bb, P.papillaS); } else if (f < 0.8) { G.P(ba - 1, bb, P.papillaL); G.P(ba + 1, bb, P.papillaL); } }
  // el cucharón de madera metido en la papilla
  G.l(6, bt - 1, 12, bt - 10, C.k); G.l(7, bt - 1, 13, bt - 10, P.madL); G.P(12, bt - 10, P.mad); G.P(13, bt - 11, P.madS);
  // el vapor: volutas que suben, se mecen y se deshacen (tramado, para que deje ver el fondo)
  for (let k = 0; k < 4; k++) for (let q = 0; q < 12; q++) { const f = ((t * 0.5 + k * 0.25) % 1), b = bt - 2 - q - Math.round(f * 6), a = Math.round(-6 + k * 4 + Math.sin(q * 0.6 + t * 1.5 + k) * 1.6);
    if (h(q, k, Math.floor(t * 4)) > 0.75 - q * 0.03 || ((a + b) & 1)) continue; G.P(a, b, q < 4 ? P.vapor : g_mez(P.vapor, P.nubeM, 0.5)); }
  // ── la cesta de mimbre con las espigas de trigo silvestre (barbas largas) que se mecen
  const ca0 = 14, ca1 = 28, cb = -9;
  for (let k = 0; k < 8; k++) { const a = ca0 + 2 + k * 1.6, base = cb, ang = -1.35 + (k - 3.5) * 0.12, sw = Math.sin(t * 1.8 + k * 0.7) * 0.06, L = 12 + (k % 3) * 2;
    for (let q = 0; q < L; q++) { const ax = Math.round(a + Math.cos(ang + sw * q * 0.15) * q * 0.25), by = Math.round(base - q); G.P(ax, by, q < L - 4 ? P.trigoS : (q & 1 ? P.trigoL : P.trigo)); if (q >= L - 4) G.P(ax + 1, by, P.trigoS); }
    const ta = Math.round(a + Math.cos(ang) * L * 0.25), tb = base - L; G.P(ta + 1, tb - 1, P.trigoL); G.P(ta + 2, tb - 2, P.trigoS); G.P(ta - 1, tb - 1, P.trigoS); }
  for (let b = cb; b <= 0; b++) { const ww = b === 0 ? 1 : 0;
    for (let a = ca0 + ww; a <= ca1 - ww; a++) { let c = a === ca0 + ww || a === ca1 - ww || b === 0 ? C.k : (b & 1) ? (((a + (b >> 1)) % 3 === 0) ? P.cestaS : P.cestaL) : ((a % 3 === 1) ? P.cestaS : P.cesta);
      if (b === cb) c = C.k; else if (b === cb + 1 && c !== C.k) c = P.cestaL; if (a > ca1 - 3 && c !== C.k) c = P.cestaS; G.P(a, b, c); } }
  // granos que vuelan de la cesta al campo mientras se siembra
  if (campo > 0 && campo < 1) for (let k = 0; k < 5; k++) { const v = (t * 0.9 + k * 0.2) % 1, a = Math.round(20 - v * 30), b = Math.round(cb - 4 - Math.sin(v * Math.PI) * 10); G.P(a, b, P.grano); }
  // un par de granos sueltos y una segunda mano de moler en el suelo
  G.r(-13, -2, -9, 0, C.k); G.r(-12, -1, -10, -1, P.basaltoL);
  return { arriba: [x, y - 36 * s], cuenco: [G.X(0), G.Y(bt)], muela: [G.X(ma), G.Y(-9)], cesta: [G.X(21), G.Y(cb)] };
}

// las formas de la nube: círculos [a, b, r] alrededor del centro (0 un conejo, 1 un buitre, 2 un cometa, 3 Atom)
const g_FORMAS = (() => {
  const conejo = [[-4, 4, 9], [5, 5, 7], [12, -2, 6], [9, -9, 2.4], [9, -13, 2.3], [9, -17, 2], [14, -9, 2.4], [15, -13, 2.2], [16, -17, 1.9], [-14, 2, 3.6], [15, 7, 2.6], [-7, 11, 3.2], [-1, 12, 2.6], [18, -1, 2.2]];
  const buitre = [[0, 2, 7], [0, -5, 4.6], [0, -10, 3.4], [2, -9, 2]];
  for (const sg of [-1, 1]) { for (let k = 0; k < 6; k++) buitre.push([sg * (6 + k * 3.6), -2 - k * 0.9, 5.6 - k * 0.55]); buitre.push([sg * 27, -4, 2.4], [sg * 25, 0, 2.4], [sg * 22, 2, 2.4], [sg * 19, 3, 2.2]); }
  buitre.push([0, 9, 3.6], [-2, 12, 2.6], [2, 12, 2.6]);
  const cometa = [[12, -2, 8], [5, 0, 6.6], [-2, 2, 5.6], [-9, 4, 4.6], [-16, 6, 3.6], [-22, 7, 2.6], [-27, 8, 1.8], [2, -6, 3.6], [-5, -7, 3], [-12, -8, 2.4], [-18, -8, 1.8], [4, 7, 3], [-4, 9, 2.4]];
  const atom = [[0, 0, 8.5]];
  for (const rot of [0, Math.PI / 3, -Math.PI / 3]) for (let k = 0; k < 18; k++) { const p = k / 18 * Math.PI * 2, ex = Math.cos(p) * 21, ey = Math.sin(p) * 6; atom.push([ex * Math.cos(rot) - ey * Math.sin(rot), (ex * Math.sin(rot) + ey * Math.cos(rot)) * 0.62, 2.4]); }
  return [conejo, buitre, cometa, atom];
})();

// el campo de una forma en (a, b): positivo dentro (lo que sobresale del círculo más cercano)
const g_campoForma = (L, a, b) => { let m = -99; for (const [ca, cb, r] of L) { const v = r - Math.hypot(a - ca, b - cb); if (v > m) m = v; } return m; };

// NUBE · el enchufe que parece una cara (dos ranuras de ojos y el agujero de la toma de tierra de boca) y la nube que
// cambia de forma (o.forma 0–3: conejo, buitre, cometa, Atom; con decimales se transforma de una a la siguiente)
function g_nube(R, G, t, o, x, y, s) {
  const P = g_P, fo = Math.max(0, Math.min(3, o.forma ?? 0)), i0 = Math.min(2, Math.floor(fo)), fr = fo - i0, m = fr * fr * (3 - 2 * fr);
  const wts = [0, 0, 0, 0]; wts[i0] += 1 - m; wts[Math.min(3, i0 + 1)] += m;
  // ── el enchufe: una placa de baquelita crema sobre un taco de madera, con su toma (ojos y boca) y el tornillo
  G.sombra(-24, 10, 1);
  g_madera(G, -33, -4, -15, 0, 4);
  const e0 = -31, e1 = -17, f0 = -27, f1 = -4;
  for (let b = f0; b <= f1; b++) for (let a = e0; a <= e1; a++) { const esq = (a === e0 || a === e1) && (b === f0 || b === f1); if (esq) continue;
    let c = a === e0 || a === e1 || b === f0 || b === f1 ? C.k : a === e0 + 1 || b === f0 + 1 ? P.enchufeL : a === e1 - 1 || b === f1 - 1 ? P.enchufeS : P.enchufe;
    if ((a === e0 + 1 && b === f0 + 1) || (a === e1 - 1 && b === f0 + 1) || (a === e0 + 1 && b === f1 - 1) || (a === e1 - 1 && b === f1 - 1)) c = C.k;
    G.P(a, b, c); }
  // la toma, un poco hundida: el óvalo con su sombra arriba y su luz abajo
  const ec = (e0 + e1) / 2;
  for (let b = -23; b <= -11; b++) for (let a = e0 + 3; a <= e1 - 3; a++) { const e = ((a - ec) / 4.6) ** 2 + ((b + 17) / 6.6) ** 2; if (e > 1) continue; G.P(a, b, e > 0.72 ? (b < -17 ? P.enchufeD : P.enchufeL) : (b < -20 ? P.enchufeS : P.enchufe)); }
  // los ojos (las dos ranuras, que parpadean y miran a la nube) y la boca (la toma de tierra, que se abre de asombro)
  const parp = (t % 3.4) < 0.14, mira = Math.sin(t * 0.7) > 0.3 ? 1 : 0;
  for (const a of [ec - 2, ec + 2]) { if (parp) G.P(a + mira, -18, P.ranura); else for (let b = -20; b <= -16; b++) G.P(a, b, b === -20 && mira ? P.enchufeS : P.ranura); }
  G.r(ec - 1, -13, ec + 1, -12, P.ranura); G.P(ec, -14, P.ranura); G.P(ec - 1, -12, P.ranura);
  // el tornillo del centro, abajo, con su ranura
  G.d(ec, -8, 1.2, C.k); G.P(ec, -8, P.plata); G.P(ec - 1, -8, P.plataS); G.P(ec + 1, -8, P.plataS); G.P(ec - 1, -9, P.plataL);
  // ── la nube: un campo de círculos que se mezcla de una forma a la siguiente, con borde que respira
  const nx = 13 + Math.round(Math.sin(t * 0.45) * 1.5), ny = -30 + Math.round(Math.sin(t * 0.7) * 0.8);
  const formas = g_FORMAS, A0 = -34, A1 = 34, B0 = -22, B1 = 18, WA = A1 - A0 + 1;
  const F = new Float32Array(WA * (B1 - B0 + 1));
  for (let b = B0; b <= B1; b++) for (let a = A0; a <= A1; a++) { let v = 0; for (let q = 0; q < 4; q++) if (wts[q] > 0) v += wts[q] * g_campoForma(formas[q], a, b);
    v += 0.35 * Math.sin(a * 0.55 + t * 1.3) * Math.cos(b * 0.6 - t * 0.9); F[(b - B0) * WA + (a - A0)] = v; }
  const Fv = (a, b) => (a < A0 || a > A1 || b < B0 || b > B1) ? -9 : F[(b - B0) * WA + (a - A0)];
  // la sombra de la nube en el suelo
  G.sombra(nx, 16, 1);
  for (let b = B0; b <= B1; b++) for (let a = A0; a <= A1; a++) { const v = Fv(a, b);
    if (v <= 0) { if (Fv(a + 1, b) > 0 || Fv(a - 1, b) > 0 || Fv(a, b + 1) > 0 || Fv(a, b - 1) > 0) G.P(nx + a, ny + b, P.nubeK); continue; }
    let c = Fv(a - 1, b - 1) <= 0 ? P.nubeL : Fv(a + 1, b + 1) <= 0 ? P.nubeS : Fv(a + 2, b + 2) <= 0 ? P.nubeM : P.nube;
    if (c === P.nube && b > 3 && ((a + b) & 1)) c = P.nubeM;
    if (c === P.nube && v < 0.9 && Fv(a + 2, b + 2) > v + 1.2) c = P.nubeM;     // los pliegues entre bollos
    G.P(nx + a, ny + b, c); }
  // los rasgos que hacen leer la forma: el ojo del conejo; el ojo y el pico ganchudo del buitre; el resplandor y las
  // chispas del cometa; la cara y los electrones de Atom
  const ver = (q) => wts[q] > 0.55;
  if (ver(0)) { G.P(nx + 13, ny - 3, P.nubeD); G.P(nx + 13, ny - 4, P.nubeD); G.P(nx + 18, ny - 1, P.nubeS); G.P(nx + 9, ny - 12, P.nubeM); G.P(nx + 14, ny - 12, P.nubeM); }
  if (ver(1)) { G.P(nx + 1, ny - 11, P.nubeD); G.P(nx + 4, ny - 10, P.nubeS); G.P(nx + 4, ny - 9, P.nubeD); for (let a = -20; a <= 20; a += 5) if (Math.abs(a) > 6) G.P(nx + a, ny - 1 + Math.round(Math.abs(a) * -0.06), P.nubeM); }
  if (ver(2)) { for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const d2 = i * i + j * j; if (d2 <= 17 && (d2 < 6 || ((i + j) & 1) === 0) && Fv(12 + i, -2 + j) > 1) G.P(nx + 12 + i, ny - 2 + j, d2 < 3 ? P.blanco : d2 < 8 ? P.cometa : P.cometaS); }
    for (let q = 0; q < 4; q++) g_destello(G, nx + 24 - q * 3, ny - 12 + q * 7, t, q, P.cometaS, P.cometa); }
  if (ver(3)) { G.P(nx - 3, ny - 2, P.ojo); G.P(nx - 3, ny - 1, P.ojo); G.P(nx + 3, ny - 2, P.ojo); G.P(nx + 3, ny - 1, P.ojo); G.P(nx - 2, ny + 3, P.nubeD); G.P(nx - 1, ny + 4, P.nubeD); G.P(nx, ny + 4, P.nubeD); G.P(nx + 1, ny + 4, P.nubeD); G.P(nx + 2, ny + 3, P.nubeD);
    for (let q = 0; q < 3; q++) { const rot = [0, Math.PI / 3, -Math.PI / 3][q], p = t * 1.4 + q * 2.1, ex = Math.cos(p) * 20, ey = Math.sin(p) * 6; G.P(nx + Math.round(ex * Math.cos(rot) - ey * Math.sin(rot)), ny + Math.round((ex * Math.sin(rot) + ey * Math.cos(rot)) * 0.62), P.cometaS); } }
  return { arriba: [G.X(nx), G.Y(ny + B0)], enchufe: [G.X(Math.round(ec)), G.Y(-16)], nube: [G.X(nx), G.Y(ny)] };
}

// BALANZA · la balanza de latón con el libro de película (oscuro, título dorado y una mano que entierra una caja que
// brilla) y el libro de la lluvia (más gordo: nube, gotas que caen y capas de barro); o.peso 0–1 la inclina a la película
function g_balanza(R, G, t, o, x, y, s) {
  const P = g_P, peso = g_cl(o.peso ?? 0), th = -0.1 + peso * 0.38 + Math.sin(t * 2.1) * 0.012 * (0.4 + peso);
  G.sombra(0, 32, 2);
  // el pie de nogal en dos escalones, la columna de latón con sus anillos y el remate
  g_madera(G, -16, -5, 16, 0, 1); g_madera(G, -11, -9, 11, -5, 2);
  G.r(-5, -4, 5, -2, C.k); G.r(-4, -3, 4, -3, P.laton); G.r(-4, -3, -2, -3, P.latonL);
  G.r(-3, -46, 3, -9, C.k); for (let b = -45; b <= -10; b++) { G.P(-2, b, P.latonL); G.P(-1, b, P.laton); G.P(0, b, P.laton); G.P(1, b, P.latonS); G.P(2, b, P.latonS); }
  for (const b of [-40, -28, -16]) { G.r(-4, b - 1, 4, b + 1, C.k); G.r(-3, b, 3, b, P.laton); G.r(-3, b, -2, b, P.latonL); G.P(3, b, P.latonS); }
  G.r(-6, -12, 6, -9, C.k); G.r(-5, -11, 5, -10, P.laton); G.r(-5, -11, -3, -11, P.latonL);
  // el fiel: la aguja sobre su cuadrante de esmalte
  for (let j = -7; j <= 0; j++) for (let i = -7; i <= 7; i++) { const d = i * i + j * j; if (d > 49) continue; G.P(i, -48 + j, d > 36 ? C.k : (j < -4 && i < -1 ? P.blanco : P.hojas)); }
  for (let q = -3; q <= 3; q++) { const an = -Math.PI / 2 + q * 0.32; G.P(Math.round(Math.cos(an) * 5), Math.round(-48 + Math.sin(an) * 5), q === 0 ? P.rojo : P.hojasS); }
  G.l(0, -48, Math.round(Math.sin(-th) * 5), Math.round(-48 - Math.cos(th) * 5), C.k);
  // la cruz que se inclina, con sus remates y el eje
  const ex = 27, cy = -46, [Lx, Ly] = [-ex * Math.cos(th), cy + ex * Math.sin(th)], [Rx, Ry] = [ex * Math.cos(th), cy - ex * Math.sin(th)];
  G.l(Lx, Ly - 1, Rx, Ry - 1, C.k); G.l(Lx, Ly + 1, Rx, Ry + 1, C.k); G.l(Lx, Ly, Rx, Ry, P.latonL);
  for (const [ax, ay] of [[Lx, Ly], [Rx, Ry]]) { G.d(ax, ay, 1.6, C.k); G.P(Math.round(ax), Math.round(ay), P.latonL); }
  G.d(0, cy, 2.6, C.k); G.d(0, cy, 1.6, P.laton); G.P(-1, cy - 1, P.latonL); G.P(1, cy + 1, P.latonS);
  // un plato colgado de tres cadenas, con un brillo que baja por los eslabones; devuelve la altura del plato
  const plato = (ax, ay, k0) => { const py = ay + 24;
    for (const dx of [-10, 10]) for (let k = 0; k <= 23; k++) { const a = ax + dx * k / 23, b = ay + k * 24 / 23; G.P(a, b, (k + Math.floor(t * 7) + k0) % 11 === 0 ? P.latonL : k % 2 === 0 ? P.latonS : P.laton); }
    G.P(ax - 12, py, C.k); G.P(ax + 12, py, C.k); G.r(ax - 11, py, ax + 11, py, P.latonL);
    G.r(ax - 11, py + 1, ax + 11, py + 1, C.k); G.r(ax - 10, py + 1, ax + 10, py + 1, P.laton); G.r(ax - 9, py + 1, ax - 7, py + 1, P.latonL);
    G.r(ax - 9, py + 2, ax + 9, py + 2, C.k); G.r(ax - 8, py + 2, ax + 8, py + 2, P.latonS); G.r(ax - 6, py + 3, ax + 6, py + 3, C.k);
    return py; };
  const pl = plato(Lx, Ly, 0), pr = plato(Rx, Ry, 5);
  // ── el libro de película, de pie en el plato izquierdo
  const la = Math.round(Lx), lb = Math.round(pl) - 1;
  { const a0 = la - 7, a1 = la + 6, b0 = lb - 18, b1 = lb;
    R.halo(G.X(la), G.Y(lb - 9), 14 * s, [P.cineR, P.cineO], 0.28 + 0.08 * Math.sin(t * 3));
    // el lomo (canto de hojas) a la derecha
    G.r(a1 + 1, b0 + 1, a1 + 2, b1, C.k); for (let b = b0 + 2; b <= b1 - 1; b++) G.P(a1 + 1, b, (b & 1) ? P.hojas : P.hojasS);
    G.r(a0, b0, a1, b1, C.k);
    for (let b = b0 + 1; b <= b1 - 1; b++) for (let a = a0 + 1; a <= a1 - 1; a++) { const u = (b - b0) / (b1 - b0);
      let c = u < 0.45 ? (((a + b) & 1) && u > 0.3 ? P.cineL : P.cine) : u < 0.7 ? (((a + b) & 1) ? P.cineL : g_mez(P.cineL, P.cineR, 0.35)) : (((a + b) & 1) ? P.cineR : g_mez(P.cineR, P.cineO, 0.4));
      if (a === a0 + 1) c = (b & 1) ? P.cine : P.hojasS;               // la tira de película del borde, con sus agujeros
      G.P(a, b, c); }
    // el título dorado (una barra gruesa) y la barra fina de debajo, sin letras
    G.r(a0 + 3, b0 + 2, a1 - 2, b0 + 3, P.cineOL); G.r(a0 + 3, b0 + 3, a1 - 2, b0 + 3, P.cineO); G.r(a0 + 4, b0 + 5, a1 - 3, b0 + 5, P.cineR);
    // la montañita de tierra con la caja que brilla medio enterrada y la mano que la empuja hacia abajo
    for (let a = a0 + 2; a <= a1 - 1; a++) { const hh = Math.round(3 - Math.abs(a - la) * 0.55); for (let q = 0; q <= hh; q++) G.P(a, b1 - 1 - q, q === hh ? P.barroL : P.barro); }
    G.r(la - 1, b1 - 6, la + 1, b1 - 4, P.cineOL); G.P(la, b1 - 5, P.blanco); if (Math.sin(t * 4) > 0) G.P(la + 2, b1 - 7, P.cineOL);
    const mb = b1 - 12 + Math.round(Math.max(0, Math.sin(t * 2.2)) * 1.5);
    G.r(la - 1, mb - 3, la + 2, mb, P.pielA); G.P(la - 1, mb + 1, P.pielA); G.P(la, mb + 1, P.pielA); G.P(la + 1, mb + 1, P.pielA); G.P(la + 2, mb, P.pielAS); G.P(la + 2, mb - 1, P.pielAS); G.P(la + 3, mb - 4, P.pielA); G.P(la + 3, mb - 5, P.pielAS);
    // el brillo de la portada satinada que la cruza en diagonal
    const g = Math.floor((t * 6) % 40) - 10; for (let q = 0; q < 6; q++) { const a = a0 + 1 + g + q, b = b0 + 1 + q * 3; if (a > a0 + 1 && a < a1) G.P(a, b, P.cineOL); }
  }
  // ── el libro de la lluvia, más gordo, de pie en el plato derecho
  const ra = Math.round(Rx), rb = Math.round(pr) - 1;
  { const a0 = ra - 7, a1 = ra + 5, b0 = rb - 19, b1 = rb;
    G.r(a1 + 1, b0 + 1, a1 + 4, b1, C.k); for (let b = b0 + 2; b <= b1 - 1; b++) for (let a = a1 + 1; a <= a1 + 3; a++) G.P(a, b, ((b + a) & 1) ? P.hojas : P.hojasS);
    G.r(a0, b0, a1, b1, C.k);
    for (let b = b0 + 1; b <= b1 - 1; b++) for (let a = a0 + 1; a <= a1 - 1; a++) { const r = h(a, b, 780); G.P(a, b, a === a0 + 1 ? P.lluviaL : a === a1 - 1 ? P.lluviaS : r > 0.9 ? P.lluviaS : P.lluvia); }
    G.r(a0 + 2, b0 + 2, a1 - 2, b0 + 2, P.lluviaL);
    // la nube gris, las gotas que caen y las capas de barro del fondo
    for (const [ca, cb, rr] of [[ra - 3, b0 + 6, 2], [ra, b0 + 5, 2.4], [ra + 2, b0 + 6, 1.8]]) G.d(ca, cb, rr, P.nubeS);
    G.r(ra - 4, b0 + 7, ra + 3, b0 + 7, P.nubeD); G.P(ra - 1, b0 + 4, P.nubeM);
    for (let k = 0; k < 4; k++) { const v = (t * 1.4 + k * 0.27) % 1, a = ra - 4 + k * 2 + (k > 1 ? 1 : 0), b = b0 + 9 + Math.round(v * 6); G.P(a, b, P.gota); }
    for (let a = a0 + 1; a <= a1 - 1; a++) { G.P(a, b1 - 3, P.barroL); G.P(a, b1 - 2, P.barro); G.P(a, b1 - 1, (a & 1) ? P.tierraS : P.barro); }
  }
  return { arriba: [x, G.Y(-56)], platos: [[G.X(la), G.Y(lb)], [G.X(ra), G.Y(rb)]], libros: [[G.X(la), G.Y(lb - 18)], [G.X(ra), G.Y(rb - 19)]] };
}

// una copia de la máscara del cielo m sin la zona de Atom (x 278–318, y 4–44) ni la barra del año (x 20–170, y 0–14):
// las nubes se deshacen en un borde tramado de 10 px antes de llegar, y ahí el cielo queda tranquilo (la franja del año,
// desde el borde izquierdo, para que no asome un trozo de nube cortado en la esquina)
function a_calma(m) {
  const r = new Uint8Array(m);
  for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!r[i]) continue;
    const dA = Math.max(268 - x, y - 50), dB = Math.max(x - 178, y - 20), d = Math.min(dA, dB);
    if (d <= 0 || (d < 10 && a_U(x, y) >= d / 10)) r[i] = 0; }
  return r;
}

// la linde entre la cima arada y la falda (en fracción de la ladera, 0 arriba y 1 al pie) en la columna x: ondulada y suave
const a_lindeC = (x, u) => 0.5 - Math.abs(u) * 0.15 + Math.sin(x * 0.11 + 1) * 0.03 + Math.sin(x * 0.037) * 0.045;

// el estado de un recinto en el año A: e (0–1, lo excavado), s (escala del óvalo) y Dc (hasta dónde se ha sacado la
// tierra); con rel (la colina rellena) el recinto se ve entero desde el principio, lleno hasta las cabezas de los
// pilares (Dc = L), y la excavación va bajando la tierra hasta el suelo de roca (a_suave: arranque y final suaves)
const a_suave = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));

// la máscara del cielo del corte de día (sin la zona de Atom ni la barra del año), que se calcula una vez
const A_CORTE_M = {};

function a_mCorte() { return (A_CORTE_M.m ??= (() => { const m = new Uint8Array(320 * 180); for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) if (y < A_SUP(x) - 1) m[y * 320 + x] = 1; return a_calma(m); })()); }

// el cuerpo de neoliticoDelante: hierba, espigas y piedras de las esquinas según el encuadre
function c_neoDelante(R, t, o) {
  const enc = o.encuadre === 'cantera' ? (o.camara === 'troncos' ? 'troncos' : 'cantera') : (o.camara === 'trigo' ? 'trigo' : 'estepa');
  const P = c_P(o.hora === 'atardecer' ? 'atardecer' : 'dia'), viento = (x) => Math.sin(t * 1.7 + x * 0.04) * 1.6 + Math.sin(t * 3.1 + x * 0.13) * 0.6;
  if (enc === 'trigo') {   // espigas altas en los bordes, en dos tonos (las de más cerca, más oscuras y grandes)
    for (let k = 0; k < 16; k++) { const izq = k < 8, i = k % 8, x = izq ? 2 + i * 4 + h(k, 1, 801) * 2 : 318 - i * 4 - h(k, 1, 801) * 2;
      const alto = 18 + Math.round(h(k, 2, 801) * 24) - i * 2, base = 181, inc = viento(x) * (alto / 30) + (izq ? 1 : -1) * 2;
      c_espiga(R, x, base, alto, inc, P, true, i % 2 === 0); }
    return;
  }
  // la roca de la esquina izquierda (caliza con su sombra y una veta) y las matas
  const roca = (x0, y0, w, hh) => { R.poligono([[x0, y0 + hh], [x0 + 2, y0 + 3], [x0 + w * 0.4, y0], [x0 + w - 3, y0 + 2], [x0 + w, y0 + hh]], (x, y) => {
    const u = (x - x0) / w, v = (y - y0) / hh, l = 0.85 - u * 0.45 - v * 0.35 + (h(x, y, 803) - 0.5) * 0.18; return c_ram([P.z1, P.z2, P.z3, P.z4, P.z5], l, x, y); });
    R.linea(x0 + w * 0.3, y0 + 4, x0 + w * 0.45, y0 + hh - 2, P.z1); R.linea(x0 + 2, y0 + hh, x0 + w, y0 + hh, P.z0); };
  const mata = (x, y, n, alto, col) => { for (let j = 0; j < n; j++) { const a = (j / (n - 1) - 0.5) * 1.6, al = alto * (0.6 + h(x, j, 805) * 0.5), w = viento(x + j) * al / 12;
    R.linea(x, y, Math.round(x + Math.sin(a) * al * 0.5 + w), Math.round(y - Math.cos(a) * al), j % 3 ? col[1] : col[0]); R.pset(Math.round(x + Math.sin(a) * al * 0.5 + w), Math.round(y - Math.cos(a) * al), col[2]); } };
  if (enc === 'cantera' || enc === 'troncos') {
    roca(-2, 160, 30, 21); roca(292, 166, 30, 15);
    for (const [x, y, r] of [[34, 176, 2], [286, 162, 2], [300, 163, 1.5]]) { R.disco(x + 1, y + 1, r, P.z1); R.disco(x, y, r, (xx, yy, d) => d < 0.5 ? P.basaltoL : P.basalto); }
    mata(30, 179, 7, 11, [P.e1, P.e2, P.e4]); mata(312, 167, 6, 9, [P.e1, P.e2, P.e4]); mata(288, 180, 5, 8, [P.e0, P.e2, P.e3]);
    return;
  }
  roca(-3, 163, 26, 18);
  mata(24, 180, 9, 13, [P.e1, P.e2, P.e4]); mata(8, 165, 6, 8, [P.e0, P.e2, P.e3]); mata(300, 180, 9, 14, [P.e1, P.e2, P.e4]); mata(316, 172, 6, 9, [P.e0, P.e2, P.e3]);
  for (let k = 0; k < 8; k++) { const x = k < 4 ? 28 + k * 2.5 : 284 + (k - 4) * 3; c_espiga(R, x, 181, 20 + h(k, 3, 806) * 10, viento(x) * 1.2, P, true, false); }
}

// el basalto de la piedra de moler: gris azulado y algo más claro que el de los relieves, para que la losa se lea como
// piedra (con sus poros y su pulido) y no como una mancha negra, también a escala 1
let c_molerR = null;

function c_moler() { return (c_molerR ??= ['#1c1a1e', '#2e2b30', '#433f45', '#5a555c', '#736d74', '#8f8990', '#aea8ae'].map(hex)); }

// la sombra de una nube que pasa por el suelo: una mancha alargada tramada que oscurece entre y0 e y1 y corre con el
// viento (v px/s); dentro, la hierba sigue viéndose
function c_sombraNube(R, P, t, x0, yc, w, hh, v, y0, y1) {
  const B = R.buf, cx = ((x0 + t * v) % (320 + w * 2) + 320 + w * 2) % (320 + w * 2) - w;
  for (let y = Math.max(y0, Math.round(yc - hh)); y <= Math.min(y1, Math.round(yc + hh)); y++) for (let x = Math.max(0, Math.round(cx - w)); x <= Math.min(319, Math.round(cx + w)); x++) {
    const d = ((x - cx) / w) ** 2 + ((y - yc) / hh) ** 2 + Math.sin(x * 0.2 + y * 0.7) * 0.08; if (d > 1) continue;
    if (d > 0.7 && c_um(x, y) < (d - 0.7) / 0.3) continue; B[y * 320 + x] = c_mezcla(B[y * 320 + x], P.k, 0.2); }
}

// una mariposa amarilla que revolotea sobre la hierba (dos alas que se abren y cierran)
function c_mariposa(R, P, t, x0, y0, k) {
  const x = Math.round(x0 + Math.sin(t * 0.7 + k) * 18 + Math.sin(t * 2.3 + k * 2) * 3), y = Math.round(y0 + Math.sin(t * 1.9 + k * 3) * 4 + Math.sin(t * 5 + k) * 1), a = Math.floor(t * 10 + k) % 2;
  R.pset(x, y, P.k); if (a) { R.pset(x - 1, y - 1, P.mariposa); R.pset(x + 1, y - 1, P.mariposa); R.pset(x - 1, y, P.mariposaS); R.pset(x + 1, y, P.mariposaS); } else { R.pset(x - 1, y, P.mariposa); R.pset(x + 1, y, P.mariposa); }
}

// el cernícalo que se cierne quieto en el aire batiendo las alas y a ratos se deja caer un poco
function c_cernicalo(R, P, t, x0, y0) {
  const x = Math.round(x0 + Math.sin(t * 0.13) * 30), y = Math.round(y0 + Math.max(0, Math.sin(t * 0.4)) * 3), a = Math.floor(t * 9) % 2;
  R.pset(x, y, P.r2); R.pset(x, y + 1, P.r1); R.pset(x, y - 1, P.r3);
  if (a) { R.linea(x - 4, y - 2, x - 1, y, P.r2); R.linea(x + 1, y, x + 4, y - 2, P.r2); } else { R.linea(x - 4, y + 1, x - 1, y, P.r2); R.linea(x + 1, y, x + 4, y + 1, P.r2); }
  R.pset(x, y + 2, P.r1); R.pset(x - 1, y + 3, P.r0); R.pset(x + 1, y + 3, P.r0);
}

// LA GACELA GRANDE, a la escala de los personajes (≈17 × 19 px con los cuernos): el lomo claro, la franja oscura del
// costado, el vientre y la grupa blancos, la cara con su lista blanca y los cuernos en lira; contorno oscuro y sombra
// en el suelo. x: el centro del cuerpo; y: la línea de las pezuñas. o.dir (1 mira a la derecha), o.pose 'mira' (cabeza
// alta, las orejas se mueven), 'pasta' (la cabeza en la hierba, mordisquea), 'anda' (paso tranquilo), 'corre' (galope,
// dos fases); o.k varía el ritmo. Devuelve la cabeza [x, y].
function c_gacelaG(R, P, x, y, t, o = {}) {
  const d = o.dir ?? 1, pose = o.pose ?? 'mira', k = o.k ?? 0, B = R.buf; x = Math.round(x); y = Math.round(y);
  const corre = pose === 'corre', f = Math.floor(t * 9 + k) % 2, sube = corre && f ? 2 : 0, cx = x, cy = y - 8 - sube, rx = 6, ry = 2.6;
  // la sombra en el suelo
  for (let i = -7; i <= 7; i++) for (let j = 0; j <= 1; j++) { const xx = x + i, yy = y + j; if (xx < 0 || xx > 319 || yy < 0 || yy > 179 || (Math.abs(i) > 5 && c_um(xx, yy) > 0.5)) continue; B[yy * 320 + xx] = c_mezcla(B[yy * 320 + xx], P.k, corre ? 0.18 : 0.3); }
  // las patas: las de detrás (lejos) más oscuras; al galope, recogidas o estiradas; al paso, se alternan
  const paso = pose === 'anda' ? Math.sin(t * 6 + k) : 0, patas = [[4, 1, 0.6], [-4, 1, -0.6], [3, 0, -0.6], [-5, 0, 0.6]];
  for (const [sx, cerca, fase] of patas) { const hx = cx + sx * d, hy = cy + 2;
    let fx = hx + Math.round(paso * fase * 2) * d, fy = y;
    if (corre) { const del = sx > 0; fx = hx + (f ? (del ? 5 : -5) : (del ? -2 : 2)) * d; fy = y - (f ? 3 : 1); }
    const mx = Math.round((hx + fx) / 2), my = Math.round((hy + fy) / 2) - (corre ? 0 : 0);
    R.linea(hx, hy, mx, my, cerca ? P.gB : P.gS); R.linea(mx, my, fx, fy, cerca ? P.gD : P.gS); R.pset(fx, fy, P.k); }
  // el cuerpo: contorno, lomo con luz, franja oscura, vientre y grupa blancos
  for (let j = -4; j <= 4; j++) for (let i = -8; i <= 8; i++) { const xx = cx + i, yy = cy + j, e = (i / (rx + 0.7)) ** 2 + (j / (ry + 0.7)) ** 2; if (e > 1 || xx < 0 || xx > 319 || yy < 0 || yy > 179) continue;
    const ein = (i / rx) ** 2 + (j / ry) ** 2, v = j / ry, atras = i * d < -rx * 0.62;
    B[yy * 320 + xx] = ein > 1 ? P.gD : v < -0.5 ? P.gL : atras && v > -0.4 ? P.gW : v < 0.2 ? P.gB : v < 0.6 ? P.gS : P.gW; }
  // el rabo: oscuro, que se agita a ratos
  const rx0 = cx - 7 * d; R.pset(rx0, cy - 1, P.k); R.pset(rx0, cy - (Math.sin(t * 6 + k * 3) > 0.6 ? 2 : 0), P.k);
  // el cuello y la cabeza según la pose
  const [hx, hy] = pose === 'pasta' ? [cx + 8 * d, y - 2 + (Math.sin(t * 3 + k) > 0.5 ? 1 : 0)] : corre ? [cx + 9 * d, cy - 4] : [cx + 7 * d, cy - 7];
  const nx = cx + 4 * d, ny = cy - 1;
  for (let w = 0; w < 2; w++) { R.linea(nx - w * d, ny, hx - d - w * d, hy + 1, w ? P.gL : P.gB); }
  R.linea(nx + d, ny + 1, hx, hy + 2, P.gD);
  // la cabeza: hocico alargado hacia delante, la lista blanca, el ojo y la nariz
  const mz = pose === 'pasta' ? 1 : 0;
  R.rect(Math.min(hx - d, hx + d), hy - 1, Math.max(hx - d, hx + d), hy + 1, P.gB); R.pset(hx + 2 * d, hy + mz, P.gB); R.pset(hx + 2 * d, hy + 1 + mz, P.gL); R.pset(hx + 3 * d, hy + 1 + mz, P.k);
  R.pset(hx, hy - 1, P.gW); R.pset(hx + d, hy, P.gW); R.pset(hx, hy, P.k); R.pset(hx - d, hy + 1, P.gS);
  // la oreja (se mueve) y los cuernos en lira, anillados
  const ore = Math.sin(t * 2.3 + k) > 0.8 ? 1 : 0; R.pset(hx - 2 * d, hy - 1 - ore, P.gL); R.pset(hx - 2 * d, hy - ore, P.gB);
  if (pose !== 'pasta') { for (const o2 of [0, 1]) { const bx = hx - d + o2 * d, pts = [[bx, hy - 2], [bx - d, hy - 4], [bx - d, hy - 6], [bx, hy - 7]]; for (let i = 0; i + 1 < pts.length; i++) R.linea(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], o2 ? P.cuerno : P.jg); } }
  else { R.linea(hx - d, hy - 2, hx - 3 * d, hy - 4, P.cuerno); R.linea(hx, hy - 2, hx - 2 * d, hy - 5, P.jg); }
  return [hx, hy];
}

// LA ESPIGA GRANDE DE ESCANDA SILVESTRE, en primer plano: el tallo que se curva con el viento, dos hojas, la espiga
// aplastada de espiguillas alternas (luz, sombra y brillo en cada grano) y las barbas largas que se abren hacia
// arriba. x, yb: el pie del tallo; alto: lo alto de la punta; inc: la inclinación de la punta (px). Devuelve la punta.
function c_escanda(R, P, x, yb, alto, inc, t) {
  const pt = (u) => { const a = 1 - u; return [x * a * a + 2 * x * a * u + (x + inc) * u * u, yb - alto * u]; };
  // el tallo, de dos píxeles con su lado de luz, y los nudos
  for (let i = 0; i < 40; i++) { const u0 = i / 40 * 0.7, u1 = (i + 1) / 40 * 0.7, [ax, ay] = pt(u0), [bx, by] = pt(u1);
    R.linea(Math.round(ax) - 1, Math.round(ay), Math.round(bx) - 1, Math.round(by), P.t0); R.linea(Math.round(ax), Math.round(ay), Math.round(bx), Math.round(by), P.t3); R.linea(Math.round(ax) + 1, Math.round(ay), Math.round(bx) + 1, Math.round(by), P.t1); R.linea(Math.round(ax) + 2, Math.round(ay), Math.round(bx) + 2, Math.round(by), P.t0); }
  for (const u of [0.22, 0.46]) { const [nx, ny] = pt(u); R.pset(Math.round(nx), Math.round(ny), P.t3); R.pset(Math.round(nx) + 1, Math.round(ny), P.t1); }
  // las hojas: largas y estrechas, que caen hacia los lados
  for (const [u, lado, lar] of [[0.24, -1, alto * 0.32], [0.48, 1, alto * 0.26]]) { const [ax, ay] = pt(u); let px = ax, py = ay;
    for (let s = 1; s <= 12; s++) { const q = s / 12, nx = ax + lado * lar * q, ny = ay - lar * 0.35 * Math.sin(q * 2.2) + lar * 0.2 * q * q + Math.sin(t * 2 + u * 9) * q;
      R.linea(Math.round(px), Math.round(py) + 1, Math.round(nx), Math.round(ny) + 1, P.t0); R.linea(Math.round(px), Math.round(py), Math.round(nx), Math.round(ny), q < 0.5 ? P.v2 : P.t2); if (q < 0.75) R.pset(Math.round(nx), Math.round(ny) - 1, q < 0.4 ? P.v3 : P.t3); px = nx; py = ny; } }
  // la espiga: espiguillas gruesas alternas a lo largo del raquis, de abajo arriba (primero el contorno oscuro de todas,
  // luego el grano con su luz a la izquierda, su sombra y un brillo), y de cada una su barba larga
  const n = Math.max(7, Math.round(alto * 0.13)), esp = [];
  for (let j = 0; j < n; j++) { const u = 0.68 + j / n * 0.31, [sx, sy] = pt(u), lado = j % 2 ? 1 : -1, r = 2.2 - j / n * 0.8; esp.push([sx + lado * 1.6, sy, r, lado, j]); }
  for (const [ex, ey, r] of esp) R.disco(ex, ey, r + 1, P.t0);
  for (const [ex, ey, r, lado, j] of esp) { R.disco(ex, ey, r, (xx, yy, dd) => (dd > 0.75 && (xx > ex || yy > ey) ? P.t1 : xx < ex && yy <= ey ? P.t4 : P.t3));
    R.linea(Math.round(ex - lado * r), Math.round(ey + r * 0.6), Math.round(ex + lado * r * 0.3), Math.round(ey + r * 0.6), P.t1); if (j % 2 === 0) R.pset(Math.round(ex - 1), Math.round(ey - 1), P.t5); }
  for (const [ex, ey, r, lado, j] of esp) { const ba = alto * 0.22 + (j % 3) * 3 - j * 0.5, w = Math.sin(t * 3.1 + j * 0.9) * 1.2, bx = ex + lado * (3 + j * 0.35) + inc * 0.1 + w, by = ey - r - ba;
    R.linea(Math.round(ex), Math.round(ey - r), Math.round(bx), Math.round(by), j % 2 ? P.t3 : P.t4); if (j % 2 === 0) R.pset(Math.round(bx), Math.round(by), P.t5); }
  const [tx, ty] = pt(1); R.linea(Math.round(tx), Math.round(ty), Math.round(tx + inc * 0.15), Math.round(ty - alto * 0.24), P.t4);
  return [Math.round(tx), Math.round(ty)];
}

// el suelo del laboratorio (sobre el vinilo ya pintado): la CINTA DE SEGURIDAD amarilla y negra que acota la zona del
// imán, del detector y del termo de nitrógeno (línea de delante en y 166, de x 244 al borde; pata que sube en perspectiva
// hasta el zócalo en x 250), el sumidero con su rejilla, rozaduras de ruedas, marcas de calzado y una etiqueta de suelo
function d_labSuelo(R) {
  const { rect, pset, linea, poligono } = R, P = DP, raya = (x, y) => (((x - y * 2) >> 2) & 1) ? C.amarillo : hex('#2a2a2a');
  // la cinta: dos dedos de ancho, con un filo de sombra debajo y desgaste (motas claras) donde se pisa
  poligono([[246, 165], [319, 165], [319, 169], [243, 169], [249, 143], [252, 143]], C.k);
  for (let y = 166; y <= 168; y++) for (let x = 245; x < 320; x++) pset(x, y, raya(x, y));
  for (let y = 143; y <= 166; y++) { const x0 = Math.round(250 - (y - 143) * 0.22); for (let x = x0; x <= x0 + 2; x++) pset(x, y, raya(x, y)); }
  for (let x = 245; x < 320; x += 9) pset(x + (x % 5), 167, hex('#f0e8b0')); rect(244, 169, 319, 169, P.sueloLabS);
  // la esquina de la cinta (un trozo despegado que asoma)
  pset(245, 165, C.amarillo); pset(244, 164, C.amarillo);
  // el sumidero del suelo con su rejilla
  rect(104, 164, 122, 169, C.k); rect(105, 165, 121, 168, P.grisS); for (let x = 106; x < 121; x += 2) rect(x, 165, x, 168, P.grisD); rect(105, 165, 121, 165, P.grisL);
  // rozaduras de las ruedas del carrito, marcas de calzado y el reflejo largo del imán naranja
  for (let k = 0; k < 3; k++) linea(150 + k * 3, 176 - k, 236 + k * 2, 171 - k, d_mezcla(P.sueloLab, P.sueloLabJ, 0.5));
  for (const [x, y] of [[36, 158], [44, 166], [138, 172], [210, 177], [76, 176]]) { rect(x, y, x + 3, y, P.sueloLabS); pset(x + 1, y + 1, P.sueloLabS); }
  for (let y = 144; y < 152; y += 2) rect(254, y, 284, y, d_mezcla(P.sueloLab, P.iman, 0.22));
  // la alfombrilla antifatiga de goma delante del pupitre (con su trama de puntos y el borde biselado)
  rect(162, 149, 238, 157, C.k); rect(163, 150, 237, 156, hex('#3a3e46')); rect(163, 150, 237, 150, hex('#5a606a'));
  for (let y = 152; y < 156; y += 2) for (let x = 165 + (y % 4); x < 236; x += 4) pset(x, y, hex('#2a2c32'));
  // el taburete del banco, con su aro para los pies y las ruedas
  rect(84, 124, 98, 126, C.k); rect(85, 124, 97, 125, hex('#3a4a6a')); rect(85, 124, 97, 124, hex('#5a6a8a')); rect(90, 127, 92, 146, C.k); rect(91, 127, 91, 145, P.grisL);
  rect(85, 136, 97, 137, P.grisD); rect(86, 147, 96, 148, d_mezcla(P.sueloLab, C.k, 0.25)); linea(91, 146, 85, 149, C.k); linea(91, 146, 97, 149, C.k); for (const x of [85, 97]) R.disco(x, 150, 1, C.k);
  // la etiqueta de suelo de la fuente de iones (un círculo azul con la flecha de entrada, sin letras)
  R.disco(127, 156, 4, C.k); R.disco(127, 156, 3, hex('#3a7ac8')); linea(125, 156, 129, 156, C.blanco); pset(128, 155, C.blanco); pset(128, 157, C.blanco);
}

// e_karahanObra: el material de la excavación en el suelo de Karahan Tepe (fuera del paso de los personajes, x > 128):
// la línea de estacas con su cordel, dos capazos negros de goma con tierra, el montón de tierra cribada, la carretilla
// con su rueda y su sombra, la paleta y la brocha
function e_karahanObra(R) {
  const { rect, pset, disco, poligono, linea } = R;
  // las estacas y el cordel que cuelga entre ellas
  const EST = [[136, 174], [178, 171], [220, 175], [264, 172]];
  for (let k = 0; k < EST.length - 1; k++) { const [a, b] = EST[k], [c, d] = EST[k + 1]; for (let x = a; x <= c; x++) { const u = (x - a) / (c - a); pset(x, Math.round(b - 6 + (d - b) * u + Math.sin(u * Math.PI) * 2), hex('#f0e8d0')); } }
  for (const [x, y] of EST) { rect(x - 1, y - 7, x, y, hex('#5a3a1e')); pset(x - 1, y - 7, hex('#c8a070')); rect(x - 1, y - 6, x, y - 5, hex('#e84a2a')); for (let i = 1; i < 5; i++) if (i & 1) pset(x + i, y + 1, hex('#6a4e30')); }
  // los capazos negros de goma (zembil) con su tierra y sus asas
  for (const [cx, by] of [[152, 160], [166, 164]]) {
    for (let i = 1; i < 9; i++) if (i & 1) pset(cx + i, by + 1, hex('#5a3e24'));
    for (let y = by - 9; y <= by; y++) { const w = 6 - Math.round((y - by + 9) * 0.12); for (let x = cx - w; x <= cx + w; x++) pset(x, y, x === cx - w || x === cx + w || y === by ? hex('#141212') : x < cx - w + 3 ? hex('#4a4442') : x > cx + w - 2 ? hex('#1e1a1a') : hex('#2e2a28')); }
    rect(cx - 6, by - 10, cx + 6, by - 9, hex('#4a4442')); for (let x = cx - 5; x <= cx + 5; x++) pset(x, by - 11 - (Math.abs(x - cx) < 3 ? 1 : 0), (x & 1) ? hex('#8a6a44') : hex('#a8865a'));
    for (const s of [-1, 1]) { pset(cx + s * 7, by - 9, hex('#141212')); pset(cx + s * 8, by - 8, hex('#141212')); pset(cx + s * 7, by - 7, hex('#141212')); } }
  // el montón de tierra cribada junto al pilar del fondo
  for (let y = 142; y <= 152; y++) for (let x = 268; x <= 304; x++) { const d = ((x - 286) / 18) ** 2 + ((y - 152) / 10) ** 2; if (d > 1) continue; const v = 0.6 - (y - 142) * 0.02 + (x < 286 ? 0.15 : -0.2) + (h(x, y, 1121) - 0.5) * 0.4; pset(x, y, e_grad(v, [hex('#6a4a2c'), hex('#8a6a42'), hex('#a8865a'), hex('#c8a678')], x, y)); }
  for (let x = 300; x < 318; x++) if ((x & 1) === 0) e_tono(R, x, 151 + (x - 300) * 0.1, -0.3);
  // la carretilla: la caja verde con tierra, la rueda, las patas, los mangos y su sombra
  for (let y = 166; y < 170; y++) for (let x = 224; x < 258; x++) if (((x + y) & 1) === 0) e_tono(R, x, y, -0.35);
  poligono([[221, 147], [255, 147], [250, 160], [228, 160]], C.k); poligono([[222, 148], [254, 148], [249, 159], [229, 159]], hex('#4a7a4a'));
  poligono([[223, 148], [253, 148], [252, 151], [224, 151]], hex('#6a9a5a')); linea(229, 158, 249, 158, hex('#2e4e30')); linea(232, 152, 234, 158, hex('#3a6a3a')); linea(246, 152, 244, 158, hex('#3a6a3a'));
  for (let x = 224; x < 253; x++) pset(x, 147 - (Math.abs(x - 238) < 9 ? 1 : 0) - (Math.abs(x - 236) < 4 ? 1 : 0), (x * 7) % 3 ? hex('#8a6a42') : hex('#b08a5a'));
  linea(250, 152, 266, 158, C.k); linea(250, 153, 266, 159, hex('#8a5a30')); rect(265, 157, 268, 159, hex('#2a2a2a'));
  linea(247, 159, 249, 167, C.k); linea(248, 159, 250, 167, hex('#4a4a4a'));
  disco(228, 164, 5, C.k); disco(228, 164, 4, hex('#2a2a2e')); disco(228, 164, 1, hex('#a8a8b0')); pset(226, 161, hex('#5a5a62')); pset(225, 162, hex('#5a5a62'));
  // la paleta y la brocha, en el suelo
  poligono([[190, 166], [196, 163], [199, 166], [193, 169]], C.k); poligono([[191, 166], [196, 164], [198, 166], [193, 168]], hex('#a8aeb6')); pset(193, 166, hex('#e0e4ea')); linea(199, 166, 205, 164, hex('#7a4a26')); linea(199, 167, 205, 165, hex('#5a3418'));
  rect(208, 168, 214, 169, hex('#8a5a32')); rect(214, 167, 217, 170, hex('#c8b890')); pset(208, 168, hex('#b07a48'));
}

// e_gato: un gato atigrado gris dormido en un ovillo (x, y: el centro de la base; 16 × 9 px), que respira, mueve una
// oreja de vez en cuando y la punta de la cola
function e_gato(R, t, x, y) {
  const { rect, pset } = R, G = [hex('#3a3a42'), hex('#5a5a64'), hex('#7a7a86'), hex('#9a9aa6')], res = Math.sin(t * 1.6) > 0.3 ? 1 : 0;
  for (let i = -9; i <= 9; i++) if (((x + i + y) & 1) === 0) e_tono(R, x + i, y + 1, -0.35);   // la sombra en la alfombra
  for (let j = -7 - res; j <= 0; j++) for (let i = -8; i <= 8; i++) { const d = (i / 8.5) ** 2 + ((j + 3.5) / (4 + res * 0.5)) ** 2; if (d > 1) continue;
    const raya = ((i + 20) % 4 === 0) && j < -2, v = d > 0.8 ? 0 : (j < -4 ? 3 : 2) - (i > 4 ? 1 : 0); pset(x + i, y + j, raya ? G[0] : G[Math.max(0, v)]); }
  // la cabeza metida en el ovillo, a la izquierda, con las orejas y los ojos cerrados
  for (let j = -5; j <= 0; j++) for (let i = -11; i <= -6; i++) if (((i + 8.5) / 3) ** 2 + ((j + 2.5) / 3) ** 2 <= 1) pset(x + i, y + j, j < -3 ? G[3] : G[2]);
  const oreja = Math.sin(t * 0.7) > 0.95 ? 1 : 0;
  pset(x - 10, y - 6 + oreja, G[1]); pset(x - 10, y - 7 + oreja, G[0]); pset(x - 7, y - 6, G[1]); pset(x - 7, y - 7, G[0]); pset(x - 10, y - 3, G[0]); pset(x - 9, y - 3, G[0]); pset(x - 11, y - 1, hex('#e8a0a8')); pset(x - 8, y - 1, hex('#e8e8ee')); pset(x - 7, y - 1, hex('#e8e8ee')); pset(x - 6, y - 2, hex('#d8d8e0'));
  // la cola que rodea el ovillo por delante, con la punta que se mueve
  rect(x - 6, y, x + 6, y, G[1]); rect(x - 6, y + 1, x + 6, y + 1, G[0]); const p = Math.round(Math.sin(t * 2.2) * 1.5); pset(x - 7, y + p * 0.5, G[3]); pset(x - 8, y - 1 + p, G[3]); pset(x - 8, y + p, G[0]);
}

// el contorno de Turquía en grados (longitud, latitud), de Tracia hacia el este por el mar Negro y de vuelta por el sur
const E_TURQUIA = [[26.0, 41.7], [27.4, 42.0], [28.0, 41.95], [29.1, 41.25], [30.4, 41.2], [31.4, 41.3], [32.5, 41.85], [33.6, 42.0], [35.1, 42.05], [35.5, 41.7],
  [36.4, 41.3], [37.4, 41.1], [38.4, 40.95], [39.6, 41.05], [40.6, 41.0], [41.5, 41.5], [42.8, 41.55], [43.5, 41.1], [43.7, 40.1], [44.8, 39.7], [44.3, 38.9],
  [44.5, 37.8], [44.8, 37.2], [42.4, 37.1], [41.2, 37.1], [40.0, 36.8], [38.0, 36.85], [36.7, 36.85], [36.5, 36.2], [36.0, 35.85], [35.9, 36.45], [36.2, 36.7],
  [35.6, 36.65], [34.7, 36.8], [33.7, 36.2], [32.6, 36.05], [31.6, 36.6], [30.6, 36.85], [30.4, 36.25], [29.6, 36.2], [28.6, 36.75], [27.6, 36.7], [27.3, 37.3],
  [27.2, 37.95], [26.4, 38.3], [26.9, 38.9], [26.2, 39.5], [26.7, 40.0], [26.6, 40.4], [26.2, 40.6], [26.1, 41.0], [26.5, 41.35], [26.2, 41.7]];

// e_mapaTurquia: el mapita de situación pegado en la esquina del mapa (x0, y0: arriba a la izquierda; 59 × 31 px): el
// papel con su sombra, los mares con su oleaje tramado, los países vecinos apagados, Turquía con su sombreado, el lago
// de Van, el Éufrates y el Tigris, y el recuadro rojo del sureste que muestra el mapa grande (con Şanlıurfa en su centro)
function e_mapaTurquia(R, x0, y0) {
  const { rect, pset } = R, X = (lon) => x0 + 3 + (lon - 25.6) * 2.72, Y = (lat) => y0 + 3 + (42.4 - lat) * 3.5;
  const P = E_TURQUIA.map(([lo, la]) => [X(lo), Y(la)]);
  const dentro = (px, py) => { let s = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) s = !s; } return s; };
  for (let y = y0 + 2; y <= y0 + 32; y++) for (let x = x0 + 2; x <= x0 + 60; x++) if (((x + y) & 1) === 0) e_tono(R, x, y, -0.35);   // la sombra en el papel
  rect(x0, y0, x0 + 58, y0 + 30, hex('#3a2e22')); rect(x0 + 1, y0 + 1, x0 + 57, y0 + 29, hex('#f2e8cc'));
  const T = new Uint8Array(59 * 31);
  for (let y = y0 + 2; y <= y0 + 28; y++) for (let x = x0 + 2; x <= x0 + 56; x++) {
    const lon = 25.6 + (x - x0 - 3) / 2.72, lat = 42.4 - (y - y0 - 3) / 3.5, tu = dentro(x + 0.5, y + 0.5);
    T[(y - y0) * 59 + x - x0] = tu ? 1 : 0;
    let c;
    if (tu) { const v = 0.45 + (e_ruido(x / 3, y / 3, 1101) - 0.5) * 0.5 + (lon > 38 ? 0.15 : 0) - (lat > 40.5 ? 0.12 : 0); c = e_grad(v, [hex('#c8a86a'), hex('#dcc08a'), hex('#ead6a4')], x, y); }
    else if ((lon > 36.4 && lat < 37.0) || (lon > 41.4 && lat > 40.9) || lon > 43.6 || (lon > 44.2 && lat < 39.5) || (lon < 28.1 && lat > 41.65) || (lon < 26.3 && lat > 40.55)) c = ((x * 3 + y) % 5 === 0) ? hex('#b8b0a0') : hex('#d4ccb8');   // los vecinos
    else c = ((x + Math.floor(y / 2) * 3) % 7 === 0 && y % 2 === 0) ? hex('#d8ecf4') : (e_bayer(x, y) < 0.3 ? hex('#7aa6c8') : hex('#8cb4d2'));   // el mar
    pset(x, y, c); }
  // la costa y las fronteras: un filo oscuro donde Turquía acaba, y su sombra hacia abajo a la derecha
  for (let y = y0 + 2; y <= y0 + 28; y++) for (let x = x0 + 2; x <= x0 + 56; x++) { const k = (y - y0) * 59 + x - x0; if (!T[k]) continue;
    if (!T[k - 1] || !T[k + 1] || !T[k - 59] || !T[k + 59]) pset(x, y, hex('#5a3a22')); else if (!T[k - 60]) pset(x, y, hex('#f4e4bc')); }
  // el lago de Van, el Éufrates y el Tigris
  for (const [i, j] of [[0, 0], [1, 0], [0, 1], [1, 1], [2, 0], [-1, 0]]) pset(Math.round(X(42.9)) + i, Math.round(Y(38.65)) + j, hex('#5a8ab8'));
  for (const ruta of [[[41.4, 39.9], [40.2, 39.3], [39.4, 38.8], [38.6, 38.3], [38.3, 37.6], [38.05, 36.9]], [[40.2, 38.5], [41.0, 37.9], [41.6, 37.5], [42.2, 37.2]]])
    for (let k = 0; k < ruta.length - 1; k++) R.linea(Math.round(X(ruta[k][0])), Math.round(Y(ruta[k][1])), Math.round(X(ruta[k + 1][0])), Math.round(Y(ruta[k + 1][1])), hex('#3a6aa0'));
  // las ciudades grandes, puntos; el recuadro del sureste en rojo
  for (const [lo, la] of [[29.0, 41.05], [32.85, 39.93], [27.15, 38.42]]) pset(Math.round(X(lo)), Math.round(Y(la)), hex('#3a2e22'));
  const ax = Math.round(X(37.9)), ay = Math.round(Y(37.85)), bx = Math.round(X(40.0)), by = Math.round(Y(36.85));
  for (let x = ax; x <= bx; x++) { pset(x, ay, hex('#c83a2a')); pset(x, by, hex('#c83a2a')); } for (let y = ay; y <= by; y++) { pset(ax, y, hex('#c83a2a')); pset(bx, y, hex('#c83a2a')); }
  return [Math.round(X(38.8)), Math.round(Y(37.15))];
}

// f_fina: como f_pieza, pero a escala s pinta cada píxel de la pantalla (no bloques de s × s): forma(u, v, I, J) recibe
//   el centro del píxel en píxeles lógicos (u de 0 a w, v de 0 a hh) y su índice en la pantalla dentro de la pieza (I, J:
//   para el grano y las incisiones de un píxel). Así, en los planos cercanos (escala 2–3), el contorno, el filo de luz,
//   las tallas, el grano y la trama quedan de un píxel, como el resto del dibujo. Respeta R.recorte (pinta con pset).
function f_fina(R, X0, Y0, w, hh, s, forma, o = {}) {
  f_pieza(R, X0, Y0, Math.round(w * s), Math.round(hh * s), 1, (I, J) => forma((I + 0.5) / s, (J + 0.5) / s, I, J), o);
}

// f_E y f_C: elipse y cápsula en coordenadas continuas (u, v: el centro del píxel, en píxeles lógicos)
const f_E = (u, v, cx, cy, rx, ry) => ((u - cx) / rx) ** 2 + ((v - cy) / ry) ** 2 <= 1;

const f_C = (u, v, ax, ay, bx, by, r) => f_cap(u - 0.5, v - 0.5, ax, ay, bx, by, r);

// f_rect: un rectángulo lleno (como R.rect, mismos bordes) que respeta R.recorte
function f_rect(R, x0, y0, x1, y1, c) { for (let y = y0 | 0; y <= (y1 | 0); y++) for (let x = x0 | 0; x <= (x1 | 0); x++) R.pset(x, y, c); }

// f_conRecorte: una vista de R en la que R.rect respeta R.recorte (para los dibujos de las pausas, que pintan con R.rect
// a través de la rejilla); todo lo demás es el mismo R
const F_RR = new WeakMap();

function f_conRecorte(R) {
  let q = F_RR.get(R);
  if (!q) { q = Object.create(R); q.rect = (x0, y0, x1, y1, c) => f_rect(R, x0, y0, x1, y1, c); F_RR.set(R, q); }
  return q;
}

// el liquen gris verdoso de la piedra a la intemperie (manchas en la caliza)
const F_LIQUEN = ['#3c4030', '#565a40', '#727654', '#8e9068', '#aaaa80', '#c4c298', '#dcdab2'].map(hex);

// f_figZorro, f_figJabali, f_figBuitre: las tres figuritas de caliza en coordenadas continuas (u, v dentro de su caja);
// devuelven null o [z, tono] (tono > 1.5: el colmillo o los dientes, que brillan)
// el zorro sentado de perfil (12 × 13), mirando a la derecha, con la boca abierta enseñando los dientes
function f_figZorro(u, v) {
  const E = (a, b, rx, ry) => f_E(u, v, a, b, rx, ry), Cp = (a, b, c, d, r) => f_C(u, v, a, b, c, d, r);
  if (E(8.8, 3.3, 0.55, 0.45)) return [0.5, -2.6];                                      // el ojo tallado
  if (u > 9.7 && u < 11.4 && v > 4.5 && v < 5.05) return Math.floor(u * 2) % 2 ? [1.7, 2.2] : [0.7, -1];   // los dientes
  if (u > 9.4 && u < 11.6 && Math.abs(v - 5.3) < 0.3) return [0.7, -1];                // la boca abierta
  if (Cp(7.0, 2.4, 6.3, 0.4, 0.8) || Cp(9.0, 2.2, 9.7, 0.3, 0.8)) return [1.35, 0.3];  // las orejas de punta
  if (E(8.4, 3.9, 2.4, 2.0) || Cp(9.0, 4.2, 11.6, 4.5, 1.05) || Cp(9.0, 5.4, 11.2, 5.7, 0.7)) return [1.3, 0.2];
  if (Cp(8.9, 7.6, 9.3, 12.4, 0.85)) return [1.45, 0.1];                               // la pata de delante
  if (Cp(1.5, 12.2, 0.9, 8.4, 1.15) || Cp(0.9, 8.4, 1.8, 6.6, 0.8)) return [1.25, (u + v) % 1.6 < 0.4 ? -0.6 : 0];   // la cola
  if (Cp(5.8, 10.2, 8.0, 5.6, 2.3)) return [1.1, Math.abs(u - 7.6 - (v - 8) * 0.3) < 0.3 ? -0.5 : 0];   // el pecho
  if (E(4.8, 10.6, 4.4, 2.5) || (v > 11.8 && u > 0.4 && u < 11.6)) return [0.95, v > 12.2 ? -0.4 : 0];
  return null;
}

// el jabalí de pie (14 × 9), mirando a la izquierda: hocico con su disco, colmillo curvo, cresta de cerdas y cuatro patas
function f_figJabali(u, v) {
  const E = (a, b, rx, ry) => f_E(u, v, a, b, rx, ry), Cp = (a, b, c, d, r) => f_C(u, v, a, b, c, d, r);
  if (Cp(1.9, 6.4, 1.0, 7.3, 0.45) || Cp(1.0, 7.3, 0.35, 6.2, 0.42)) return [1.7, 2.2];   // el colmillo
  if (E(3.0, 3.7, 0.5, 0.45)) return [0.5, -2.6];                                        // el ojo
  if (E(0.7, 5.6, 0.7, 1.15)) return [1.15, E(0.6, 5.6, 0.25, 0.5) ? -1.2 : -0.3];       // el disco del hocico
  if (E(4.6, 1.5, 0.8, 1.2)) return [1.35, 0.2];                                         // la oreja
  if (Cp(5.2, 1.5, 12.2, 1.3, 0.95)) return [1.3, (u * 1.3) % 1 < 0.35 ? -0.8 : 0.3];    // la cresta de cerdas
  if (Cp(4.2, 4.4, 1.4, 5.4, 2.2)) return [1.2, Math.abs(v - 6.1 + (u - 2) * 0.05) < 0.25 && u < 4 ? -0.8 : 0.1];
  if (Cp(3.4, 6.5, 3.3, 8.6, 0.8) || Cp(5.6, 6.5, 5.6, 8.6, 0.8) || Cp(10.2, 6.5, 10.4, 8.6, 0.8) || Cp(12.3, 6.3, 12.6, 8.6, 0.8)) return [1.15, v > 8.1 ? -0.6 : 0];
  if (Cp(13.4, 3.0, 13.9, 4.8, 0.45)) return [1.1, 0];                                    // el rabo
  if (E(8.4, 4.5, 5.6, 3.2)) return [1, Math.abs(u - 6.1 - (v - 4) * 0.25) < 0.25 || Math.abs(v - 6.6) < 0.25 ? -0.5 : 0];
  return null;
}

// el buitre encorvado (11 × 13), mirando a la derecha: pico ganchudo, cuello pelado con su gorguera y las alas plegadas
function f_figBuitre(u, v) {
  const E = (a, b, rx, ry) => f_E(u, v, a, b, rx, ry), Cp = (a, b, c, d, r) => f_C(u, v, a, b, c, d, r);
  if (E(8.3, 1.5, 0.45, 0.4)) return [0.5, -2.6];                                        // el ojo
  if (Cp(9.3, 1.7, 10.4, 2.3, 0.62) || Cp(10.4, 2.3, 10.1, 3.4, 0.42)) return [1.45, 0.6];   // el pico ganchudo
  if (E(8.2, 1.9, 1.6, 1.4)) return [1.3, 0.2];
  if (Cp(6.3, 4.4, 8.0, 2.4, 1.1)) return [1.2, 0];                                       // el cuello
  if (E(6.0, 4.7, 2.3, 1.1)) return [1.3, (u * 1.8) % 1 < 0.3 ? -0.7 : 0.3];               // la gorguera de plumas
  if (Cp(3.2, 11.3, 2.8, 12.6, 0.55) || Cp(5.6, 11.3, 6.0, 12.6, 0.55) || (v > 12.1 && v < 12.9 && u > 1.8 && u < 7)) return [1.2, -0.3];
  if (Cp(1.3, 10.2, 0.3, 12.2, 0.9)) return [1.05, -0.2];                                  // la cola
  if (E(4.6, 7.4, 4.3, 4.4)) return [1, v > 5.2 && ((u * 0.9 + v * 0.9) % 1.6) < 0.38 ? -0.9 : u < 2.4 ? 0.2 : 0];   // las alas
  return null;
}
