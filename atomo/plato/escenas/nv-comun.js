// Fontanería y decorados del episodio 22 (La Navidad estuvo prohibida: los mitos que todos creen) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el siglo XVII (Canterbury, el Parlamento, Boston y
// una calle escocesa de los años 50), B Roma (el scriptorium del calendario de 354, el templo del Sol, la calle en
// Saturnales, Mira de noche), C del siglo XVI al XIX (la imprenta de 1823, el estudio del dibujante, Windsor en 1848, el
// bosque de Alsacia, el robledal del druida y la cocina inglesa, el scriptorium del copista), D la vuelta al mundo
// (Filipinas, Gävle, Austria, Islandia, México, Cataluña, Japón, Australia, Italia) y E hoy y el cierre (el salón de Atom,
// la carrera de trineos de 1857, la cápsula Gemini 6A, la tierra de nadie de 1914).
// Los personajes son los de ELENCO_NV y PIEZAS_NV (pixel-chibi.js): dibujados por nosotros, reconocibles por sus atributos,
// SIN logos ni letras (ni KFC ni Coca-Cola en pantalla: cubetas y botellas sin etiqueta).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, barras, mostradores, bancos)
// va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
// Tono: respeto a las religiones; nada de violencia (el motín sin heridos, la cabra sin nadie quemándola, la tregua sin armas).
//
//   import * as T from '/atomo/plato/escenas/nv-comun.js';
//   const { E, R, M } = await T.preparar('nv-gancho');
//   T.rodar(E, R, [[0, (t) => T.siglo17(R, t, { encuadre: 'canterbury' })]], { año: 1647 });
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
// las piezas del episodio (PIEZAS_NV: la galleta de jengibre, la multa, el tronco, la cabra…), las crea el reparto
export const PIEZAS_NV = KIT.PIEZAS_NV || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // invierno: nieve, hielo, cielo nocturno
    nieve: '#eef4fa', nieveS: '#b8c8dc', hielo: '#cfe4f2', noche: '#141a3a',
    // la Navidad: acebo, rojo, oro de las velas
    acebo: '#1e6a3a', aceboS: '#0f4024', rojoN: '#b8202a', rojoNS: '#701018', oroN: '#f0c040', oroNS: '#a87a18', vela: '#ffe08a',
    // el siglo XVII puritano: negro, blanco de cuello, madera de entramado, yeso
    negroP: '#22222a', cuello: '#f2efe6', entramado: '#4a2e1c', yeso: '#e4d8bc',
    // Roma: mármol, terracota, púrpura
    marmol: '#e8e2d4', marmolS: '#b0a894', terracota: '#b8603a', purpura: '#6a2a6a',
    // la galleta de jengibre
    jengibre: '#b8743a', jengibreS: '#7a4620', glaseado: '#f8f4ec',
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
  const E = await escena(id, 'ep22');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 354 (el calendario), 1647 (la prohibición), 1823 (el poema), 1914 (la tregua) y 2026 (hoy)
  Object.assign(R.ICONOS, {
    estrella: ['...#...', '...#...', '#######', '.#####.', '..###..', '.##.##.', '##...##'],
    vela: ['...#...', '..###..', '...#...', '..###..', '..###..', '..###..', '.#####.'],
    regalo: ['.##.##.', '...#...', '#######', '#..#..#', '#######', '#..#..#', '#######'],
  });
  R.tramosTiempo([[354, 1647, R.PALA.ORO, 'estrella'], [1647, 1914, R.PALA.ROJO, 'vela'], [1914, 2026, R.PALA.AZUL ?? R.PALA.ROJO, 'regalo']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };


// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };


// ── A · El siglo XVII ───────────────────────────────────────────────────────────────────────────────────────
// Cada encuadre pinta los 320 × 180 en cada fotograma: un fondo fijo (en un búfer de R.nuevo(), con la máscara del cielo)
// y encima la vida (nubes de tres tonos a tres velocidades, nieve que cae, humo de las chimeneas, cuervos y gaviotas,
// gente pequeña de fondo, velas y faroles que parpadean, letreros que se mecen, agua que se mueve).
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'canterbury': Canterbury en la Navidad de 1647. Calle de cuatro casas de entramado con pisos volados (yeso ocre, blanco
//     y rosa, vigas con veta, ventanas emplomadas con nieve en el alféizar), tiendas abiertas con la contraventana de
//     arriba subida como toldo y la de abajo bajada como mostrador (velas colgadas, pan, paños), letreros de hierro con
//     pictograma que se mecen. Por el callejón del centro se ve una fila de casas más lejos, la catedral (la torre de Bell
//     Harry con sus pináculos y la nave) entre tejados, y un pozo con su cubo que se balancea. Adoquines con nieve sucia y
//     charcos helados que destellan; humo de chimeneas, cuervos que vuelan y uno que salta en un caballete, un gato en un
//     alféizar, paseantes pequeños por el callejón, nieve fina. o.aviso 0–1: el aviso del alguacil clavado en la puerta de
//     la casa rosa (pergamino con un acebo tachado con una cruz roja y renglones insinuados; crece de 0 a 1). o.motin 0–1:
//     gente enfadada al fondo del callejón con los puños en alto y coles y ramas de acebo que vuelan en arco y ruedan por
//     el suelo (sin heridos). o.ano 1660: coronas de acebo en las puertas, guirnaldas entre las casas y campanas que se
//     mecen en la torre con sus ondas; la gente del fondo celebra. o.nieve 0–1 (0,35 por omisión).
//     Cámara 'tienda': el escaparate de la panadería de cerca: dentro, estantes con hogazas y panes largos, cestos, sacos
//     de harina, la boca del horno que brilla al fondo, velas y ramilletes colgados de la viga; el toldo de tablas arriba,
//     el letrero que se mece, el piso volado encima; abajo la calle. El mostrador (la contraventana bajada, con pan) va en
//     siglo17Delante.
//   'parlamento': la sala de los Comunes (la capilla de San Esteban): paneles de roble con pliegues tallados, el gran
//     ventanal gótico emplomado con la luz de invierno (nieve que cae fuera, rayos de luz con motas), el sillón del
//     presidente con dosel en su estrado, tres gradas de bancos a cada lado, candelabros de hierro con velas que
//     parpadean, suelo de losas. Delante (siglo17Delante): los respaldos de las tres gradas y la mesa del escribano con el
//     paño, la maza de oro, el reloj de arena que corre, libros y velas.
//     Cámara 'escribano': el rincón del escribano: en la pared de roble, el calendario de un año (doce columnas de meses de
//     cuatro casillas, con el acebo de Navidad, el huevo de Pascua y la paloma de Pentecostés en las suyas); o.tacha 0–3
//     las tacha una a una con una cruz roja que se dibuja (Navidad, Pascua, Pentecostés); o.libres 0–1 marca con un
//     círculo verde un día libre en cada mes, mes a mes. Ventana emplomada con nieve, estante de legajos, candelabro. La
//     mesa (pluma en el tintero, papeles con renglones, salvadera, reloj de arena, vela) va en siglo17Delante. En la pared,
//     además, el perchero con el sombrero alto y la capa negra, y una palmatoria.
//   'boston': Boston nevado de 1659: la casa de reunión de tablas grises con tejado a cuatro aguas y campanario (la campana
//     se mece), una casa de tejado largo (saltbox) con su gran chimenea, el muelle con barriles y el puerto con un barco
//     fondeado que cabecea, la costa al fondo, lomas con pinos y una granja a la izquierda, la cerca de troncos, matas
//     secas, un trineo de mano con un barril, gaviotas, cielo de nieve y nieve que cae, humo, vecinos pequeños con
//     fardos. o.barco 0–1: el barco con la bandera real entra en el puerto desde la derecha hasta su sitio (1681).
//     o.ano 1870: la misma calle al anochecer: ventanas encendidas, faroles de gas con su halo, coronas en las puertas,
//     guirnaldas, raíles en la nieve y un tranvía de caballos que pasa; gente que celebra. El poste de avisos va en
//     siglo17Delante.
//     Cámara 'casa': la puerta de una casa de tablas de cerca: puerta de tablones con bisagras de hierro y aldaba, farol,
//     ventana emplomada con el pastel humeante (fuente de peltre, costra en celosía) en el alféizar, la ventanita del
//     desván, un manojo de maíz colgado, la escoba, leña apilada con nieve, carámbanos, pisadas en la nieve; o.ano 1870:
//     tablas pintadas, puerta verde con corona y guirnalda, farol encendido y en la ventana el árbol con velas y cortinas.
//   'escocia': una calle de Glasgow en los años 50, la mañana de Navidad: bloques de piedra gris (tenements) de cuatro
//     pisos con miradores, chimeneas con muchas ollas humeantes, tiendas cerradas abajo, farolas aún encendidas, escarcha
//     que brilla en la acera, cielo de amanecer de invierno, gente con abrigo y fiambrera que va a trabajar por la acera
//     de enfrente (y un perro), calzada de adoquines con raíles de tranvía, alcantarilla, charco helado, botellas de leche
//     en un portal, un periódico sin letras que arrastra el viento, y un autobús de dos pisos verde y crema (sin letras)
//     que cruza; o.bus 0–1 lo sitúa (de la derecha a la izquierda; si no, pasa solo cada 16 s).
//     Cámara 'parada': la parada de cerca: la marquesina de hierro y cristal (con reflejos que corren) y su banco, la
//     calzada detrás por donde llega el autobús (o.bus 0–1: de fuera a parado detrás de la marquesina; si no, pasa
//     solo), los bloques de enfrente, un buzón rojo sin letras y una paloma que picotea; el poste de la parada (placa con
//     un autobús dibujado y el horario de rayas) va en siglo17Delante.
// Devuelve { suelo, … } con la geometría de cada encuadre (ver cada a_<encuadre>). Lo de delante: siglo17Delante, con las
// mismas opciones, después de los actores (en 'parlamento', una grada cada vez con o.fila; ver su cabecera).
export function siglo17(R, t, o = {}) {
  const enc = o.encuadre ?? 'canterbury', cam = o.camara ?? 'general';
  if (enc === 'parlamento') return cam === 'escribano' ? a_escribano(R, t, o) : a_parlamento(R, t, o);
  if (enc === 'boston') return cam === 'casa' ? a_bostonCasa(R, t, o) : a_boston(R, t, o);
  if (enc === 'escocia') return cam === 'parada' ? a_parada(R, t, o) : a_escocia(R, t, o);
  return cam === 'tienda' ? a_tienda(R, t, o) : a_canterbury(R, t, o);
}
// lo que va delante de los personajes en el siglo XVII (se llama después de los actores, con las mismas opciones):
//   'canterbury': un barril con nieve en la tapa y una caja (la galleta se esconde detrás); 'tienda': el mostrador (la
//     contraventana bajada, con hogazas y una cesta) — en 'tienda', llámalo después del tendero y ANTES de los clientes
//     de la calle; 'parlamento': o.fila 0 | 1 | 2 pinta solo el respaldo de esa grada (pinta la grada 2, sus actores, la
//     1, sus actores, la 0…); sin o.fila pinta las tres y la mesa del escribano; o.fila 'mesa' solo la mesa;
//     'escribano': la mesa con la pluma, el tintero, papeles, salvadera, reloj de arena y vela; 'boston': el poste de
//     avisos (o.aviso false lo quita; o.cae 0–1, en 1870, el aviso se despega y cae girando al suelo); 'casa': la cerca de
//     abajo a la izquierda (x 0–44); 'escocia': la farola de esta acera (x 298) y un bolardo; 'parada': el poste de la parada (x 214).
export function siglo17Delante(R, t, o = {}) {
  const enc = o.encuadre ?? 'canterbury', cam = o.camara ?? 'general';
  if (enc === 'parlamento') return cam === 'escribano' ? a_escribanoMesa(R, t, o) : a_parlamentoDelante(R, t, o);
  if (enc === 'boston') return cam === 'casa' ? a_bostonCasaDelante(R, t, o) : a_postes(R, t, o);
  if (enc === 'escocia') return cam === 'parada' ? a_posteParada(R, t, o) : a_escociaDelante(R, t, o);
  return cam === 'tienda' ? a_mostrador(R, t, o) : a_barril(R, t, o);
}
// ── B · Roma ────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Cada encuadre devuelve su geometría (suelo, …).
//   'scriptorium': el scriptorium del calendario de 354 a media tarde: techo de vigas, cornisa, pared pompeyana (zona alta
//     de estuco, paneles rojos con filetes ocre entre bandas negras, zócalo negro con mármol fingido), el armario de rollos
//     abierto (casilleros con rollos de canto y sus etiquetas, una que se balancea; códices abajo; un busto encima), un
//     cuadrito pintado con una paloma, el ventanal en arco con Roma al fondo (anfiteatro, cúpula, columna, cipreses, tejados;
//     nubes de tres tonos a dos velocidades y golondrinas), postigos abiertos y un gato que mueve la cola en el alféizar,
//     la luz del ventanal en el suelo con motas de polvo, la lámpara de bronce colgada que se mece, el candelabro alto, el
//     pupitre inclinado con la hoja del calendario y el taburete, suelo de mosaico de rombos y un ratón que cruza a veces.
//     Suelo de los pies 158; el pupitre (x 116–166, tablero y 138–146) está detrás de los actores (el calígrafo se pone a su
//     derecha, x ≈ 180, mirando a la izquierda; el señor de toga a la izquierda, x ≈ 96). Delante: el cesto de rollos (x 0–34)
//     y la pila de códices con el ánfora (x 290–319).
//     Cámara 'mesa': el inserto del calendario sobre el tablero: la hoja de pergamino con su friso y las doce columnas (un
//     pictograma por mes y una raya de tinta por día), el tintero con el cálamo, las conchas de color, la tablilla de cera,
//     el rollo, la regla y la lucerna encendida (con su polilla). o.brilla 0–1: la casilla del 25 de diciembre se enciende
//     (una estrella y un sol con rayos, el halo y el «25» al lado). o.escrito 0–1 (1 por omisión): cuánto de la columna de
//     diciembre está ya escrito (para que la mano del calígrafo la vaya llenando).
//   'templo': el templo del Sol Invicto al amanecer: cielo tramado de alba con nubes de tres tonos a tres velocidades,
//     golondrinas, el sol que sale tras las colinas con el acueducto y los pinos; el frontón con el relieve dorado de un sol
//     con rayos, seis columnas corintias estriadas, la puerta del templo abierta con el disco del Sol dorado que brilla
//     dentro, un sacerdote pequeño que cruza el pórtico, la escalinata con palomas, dos braseros con fuego y humo y la plaza
//     de losas de travertino. Suelo 166 en la plaza.
//     Cámara 'altar': de cerca, en el pórtico: dos fustes enormes, la pared de mármoles de colores con un relieve del sol, dos
//     lámparas colgadas, el pebetero de incienso, el altar de mármol con su guirnalda y, encima, la balanza de bronce de dos
//     platillos (o.balanza -1–1: positivo, baja el de la derecha; o.tiembla 0–1: tiembla sin decidirse). Suelo 170.
//   'calle': una calle de Roma en Saturnales, de noche: cielo tramado con estrellas y la luna, la ínsula de la izquierda
//     (tres pisos, balcón de madera con macetas, ventanas que se encienden), la casa del medio con el arco por el que se ve
//     una calle del fondo con un banquete pequeño y el frontón de un templo, la ínsula de la derecha; abajo, el puesto de
//     regalitos de barro (sigillaria) con su toldo y el de velas y lucernas; guirnaldas de hiedra con farolillos que se
//     mecen, gente pequeña con píleo, un perro bajo el mostrador, el brasero de castañas, la acera y el empedrado de basalto
//     con reflejos. Suelo 162.
//     Cámara 'banquete': la mesa del banquete en el pórtico, de cerca: vigas, pared pompeyana con una ventana encendida y una
//     puerta con gente que baila, guirnaldas con lámparas; la mesa la pinta romaDelante (mantel con cenefa, pan, uvas, higos,
//     jarra, nueces, pasteles de miel, figuritas de barro, velas, un ave asada que humea). Los actores van DETRÁS de la mesa:
//     suelo 156 y se les ve cabeza y hombros por encima del mantel (y 152).
//   'mira': Mira, en Licia, de noche (siglo IV): cielo tramado con estrellas, nubes plateadas y la luna con su halo, el
//     monte con tumbas excavadas en la roca, el mar con el reflejo de la luna y una barca con farol, las casitas encaladas de
//     la ladera, la iglesia pequeña con la cruz (puerta y ventanas con luz), el olivo que se mece, la casa pobre con el
//     revoque caído, la ventana con luz tenue y una contraventana entornada, un gato en el tejado, el pozo, una lechuza.
//     Suelo 160; la ventana de la casa pobre en x 212–232, y 124–142 (alféizar y 142).
//     Cámara 'ventana': la ventana de cerca: pared encalada a la luz de la luna (grietas, piedras que asoman, la sombra de
//     una nube que pasa, una salamanquesa que trepa, una ristra de cebollas), una parra, el dintel de madera, los postigos abiertos y dentro la habitación pobre (lucerna en un
//     estante, esteras, ropa tendida, un cántaro). Hueco x 108–212, y 38–138. Las hermanas van DENTRO (suelo 142,
//     recortadas al hueco con R.recorte); romaDelante pinta el alféizar y la pared de debajo (las tapa de pecho para abajo).
// Delante: romaDelante (el cesto y los códices del scriptorium, la lucerna del inserto, los bordes de los platillos de la
// balanza, la mesa del banquete, el alféizar de la ventana): llama a romaDelante después de los actores, con las mismas opciones.
export function roma(R, t, o = {}) {
  const enc = o.encuadre ?? 'scriptorium', cam = o.camara ?? 'general';
  if (enc === 'templo') return cam === 'altar' ? b_altar(R, t, o) : b_templo(R, t, o);
  if (enc === 'calle') return cam === 'banquete' ? b_banquete(R, t, o) : b_calle(R, t, o);
  if (enc === 'mira') return cam === 'ventana' ? b_ventana(R, t, o) : b_mira(R, t, o);
  return cam === 'mesa' ? b_calendario(R, t, o) : b_scriptorium(R, t, o);
}
// lo que va delante de los personajes en roma (se llama después de los actores, con las mismas opciones)
export function romaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'scriptorium', cam = o.camara ?? 'general';
  if (enc === 'scriptorium') return cam === 'mesa' ? b_calendarioDelante(R, t, o) : b_scriptoriumDelante(R, t, o);
  if (enc === 'templo' && cam === 'altar') return b_platillos(R, t, o, true);
  if (enc === 'calle' && cam === 'banquete') return b_mesaBanquete(R, t, o);
  if (enc === 'mira' && cam === 'ventana') return b_alfeizar(R, t, o);
}
// ── C · Del siglo XVI al XIX ────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'imprenta': una imprenta de Nueva York de 1823: prensa de madera de tornillo, cajas de tipos, pliegos colgados secándose, ventana a una calle con coches de caballos y nieve; cámara 'prensa': la prensa de cerca con el pliego recién impreso (sin letras legibles).
//   'estudio': el estudio de un dibujante del siglo XIX: mesa inclinada, tinteros, láminas colgadas, una estufa de hierro, ventana nevada; cámara 'tablero': el tablero de cerca con el tendedero de postales de Santa de colores.
//   'windsor': el castillo de Windsor en la Navidad de 1848: un salón con chimenea de mármol, cortinajes, retratos, el árbol de Navidad sobre una mesa con velas, juguetes y dulces; cámara 'arbol': el árbol de cerca; o.grabado 0–1 lo convierte en una estampa de periódico en sepia.
//   'bosque': un bosque de abetos de Alsacia en 1521, de noche con nieve: abetos, una cabaña de guardas con fuego, el campanario de Sélestat al fondo; cámara 'guardas': los guardas con farol de cerca.
//   'robledal': un robledal antiguo con muérdago en las ramas, niebla y luz de luna, un altar de piedra; cámara 'cocina': una cocina inglesa del siglo XVIII con su fogón, ollas de cobre y una rama de muérdago colgada del techo.
//   'copista': un scriptorium medieval: atriles, un ventanal gótico, velas, manuscritos iluminados; cámara 'pagina': la página de cerca con la gran ji dorada (o.ji 0–1 la dibuja).
// Delante: epocaDelante (la mesa de la imprenta, la mesa del dibujante, el fogón de la cocina, el atril). Devuelve { suelo, … } con la geometría de cada encuadre.
export function epoca(R, t, o = {}) {
  const enc = o.encuadre ?? 'imprenta';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en del siglo xvi al xix (se llama después de los actores, con las mismas opciones)
export function epocaDelante(R, t, o = {}) {}

// ── D · La vuelta al mundo ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'filipinas': una calle de Filipinas en septiembre, al atardecer: casas con faroles parol de estrella de colores que se encienden, palmeras, un jeepney, un coro; cámara 'parol': un parol grande de cerca.
//   'gavle': la plaza de Gävle (Suecia) de noche con nieve: la cabra de paja gigante con lazos rojos, la valla, la caseta del vigilante, casas de madera de colores, aurora tenue; o.resplandor 0–1 (un brillo naranja detrás, sin nadie); cámara 'cabra': la cabra de cerca.
//   'austria': una calle nevada de un pueblo de Austria: casas alpinas con balcones de madera, el campanario de bulbo, montañas, farolillos; espacio para un desfile; cámara 'portal': un portal con un zapato en el escalón.
//   'islandia': una ladera de Islandia de noche con aurora boreal verde que se mueve, una granja de techo de césped, rocas de lava, un zapato en la ventana; cámara 'granja': la ventana de la granja de cerca.
//   'mexico': una calle de un pueblo de México de noche: casas de colores, faroles de papel, papel picado (sin letras), macetas de flor de Nochebuena, una piñata colgada; cámara 'puerta': la puerta de la posada de cerca.
//   'cataluna': una casa de Cataluña por dentro: chimenea de piedra, vigas, la mesa con mantel, el tronco Tió con su manta junto al fuego; cámara 'tio': el tronco de cerca.
//   'japon': una calle de Japón en Nochebuena: luces, tiendas con farolillos, una tienda de pollo frito con escaparate (sin letras ni logos), la cola de gente; cámara 'mostrador': el mostrador con cubetas rojas y blancas.
//   'australia': una playa de Australia en verano: arena, olas que rompen, sombrillas, socorristas, gaviotas, una parrilla; cámara 'parrilla': la parrilla de cerca.
//   'italia': los tejados de un pueblo de Italia de noche con luna: tejas, chimeneas, campanario; cámara 'chimenea': una chimenea por dentro con calcetines colgados.
// Delante: mundoDelante (barras y mostradores, la mesa catalana, la parrilla). Devuelve { suelo, … } con la geometría de cada encuadre.
export function mundo(R, t, o = {}) {
  const enc = o.encuadre ?? 'filipinas';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en la vuelta al mundo (se llama después de los actores, con las mismas opciones)
export function mundoDelante(R, t, o = {}) {}

// ── E · Hoy y el cierre ─────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'salon': el salón de Atom en Navidad: árbol con luces, chimenea con calcetines, sofá, mesa con el plato de galletas de jengibre, ventana nevada; cámara 'mesa': la mesa de cerca con las cuatro pistas o el álbum (o.album 0–1).
//   'trineos': una carrera de trineos de 1857 en la nieve de Nueva Inglaterra: camino nevado, cercas, casas al fondo, árboles; cámara 'meta': la meta de cerca con público.
//   'espacio': la cápsula Gemini 6A en órbita: la Tierra azul abajo, estrellas, el sol; cámara 'cabina': la cabina por dentro con los dos asientos y las ventanillas.
//   'tregua': tierra de nadie nevada en la Navidad de 1914 (sin armas, sin heridos): dos líneas de trincheras con sacos terreros, alambrada lejana, árboles pelados, velas y un arbolito en el parapeto; cámara 'cerca': el centro de tierra de nadie con el balón.
// Delante: hoyDelante (el sofá y la mesa, la cerca, el panel de la cabina, los sacos terreros). Devuelve { suelo, … } con la geometría de cada encuadre.
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en hoy y el cierre (se llama después de los actores, con las mismas opciones)
export function hoyDelante(R, t, o = {}) {}

// la galleta de jengibre con ojos, el gag del episodio (PIEZAS_NV.galleta)
export function galleta(R, x, y, t, o = {}) { if (PIEZAS_NV.galleta) PIEZAS_NV.galleta(R, x, y, { t, ...o }); }

// la paleta del siglo XVII (cielos, piedra, entramado, yeso, tejas, vidrio, nieve, adoquines, maderas, Boston, Glasgow)
const A = pal({
  k: '#1c1820',
  cie0: '#9aa8c0', cie1: '#b0bccc', cie2: '#c6ced8', cie3: '#d8dce0', cie4: '#e6e2da',
  nuS: '#a2acbc', nu: '#c2c8d4', nuL: '#e4e8ee',
  catL: '#d8d4cc', cat: '#b6b4b8', catS: '#8e90a2', catD: '#6c7086', plomoT: '#7c8498', plomoTS: '#5e667c',
  vigL: '#6a4630', vig: '#4a2e1c', vigS: '#2c1a10',
  tejL: '#b4664c', tej: '#8e4836', tejS: '#602e24',
  vid: '#5a6e88', vidL: '#a4b8ca', vidS: '#3c4a60', plomo: '#2a2832', luzV: '#f0b850', luzVL: '#ffe49a',
  niL: '#f8fafe', ni: '#e2e8f2', niS: '#b8c4d6', niD: '#8e9aae', sucia: '#b0a698', suciaS: '#847a6e',
  adL: '#968e82', ad: '#766e64', adS: '#56504a', barro: '#3a332c',
  hielo: '#c4d8e8', hieloL: '#f0f8ff', hieloS: '#8ca6c0',
  osc: '#2a1c16', oscL: '#4c3628', pan: '#c8904a', panL: '#ecc074', panS: '#8a5a2c', cera: '#f0e6c4', ceraS: '#c8b88c',
  rojo: '#a83a34', rojoS: '#702420', azul: '#3a5a8a', azulS: '#26405e', verde: '#4a7a4a', verdeS: '#2e5232', oro: '#e0b040', oroS: '#a87a20', oroL: '#fff0a0',
  hierro: '#3a3a44', hierroL: '#6a6a78', llama: '#ffd060', llamaL: '#fff4c0', llamaS: '#e07a20',
  piel: '#f0c8a0', pielS: '#c89a78', pur: '#22202a', purS: '#16141c', cuello: '#f4f0e6',
  madL: '#8a5a34', mad: '#64401f', madS: '#432a14', madD: '#2c1a0c', cojin: '#3e6a48', cojinS: '#2a4a32',
  losa: '#a49a8a', losaL: '#c0b6a4', losaS: '#847a6c',
  tabL: '#a29c92', tab: '#827c74', tabS: '#5e5a54', tabD: '#423e3a', marron: '#7a5e48', marronL: '#9a7a5e', marronS: '#54402e',
  ladr: '#9a4e3a', ladrS: '#74382a', ladrL: '#b46a50', mar: '#4a5e78', marS: '#3a4c64', marL: '#6a7e96', marB: '#a8bccc',
  costa: '#7a8496', costaS: '#68708a', pinoL: '#5a6e66', pino: '#44584e',
  arena: '#9a948e', arenaS: '#7c7672', arenaD: '#5e5856', arenaL: '#b8b2aa', pizL: '#6e7484', piz: '#4e5462', pizS: '#363a46',
  busV: '#2e6a3c', busVS: '#1e4a2a', busVL: '#4a8a54', busC: '#ece0b4', busCS: '#c8b888', asf: '#4a4a52', asfL: '#5e5e66', asfS: '#38383e',
  escarcha: '#dce8f4', escarchaL: '#ffffff',
});

const a_mez = (c1, c2, a) => {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
};

const a_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// umbral de trama 4 × 4 (0–1) para degradados y mezclas tramadas
const a_bay = (x, y) => (a_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

const a_lim = (u) => Math.max(0, Math.min(1, u));

// ruido de valor suave (para manchas de nieve, charcos, humedad)
const a_vn = (x, y, s) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy), a = h(xi, yi, s), b = h(xi + 1, yi, s), c = h(xi, yi + 1, s), d = h(xi + 1, yi + 1, s); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };

// el fondo fijo de cada encuadre: se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma; marca() guarda
// la foto de lo pintado hasta ese momento (el cielo) para la máscara m, donde van las nubes, la nieve lejana y los pájaros
const a_CACHE = new WeakMap();

function a_fijo(R, clave, dibuja) {
  let mm = a_CACHE.get(R); if (!mm) a_CACHE.set(R, (mm = new Map()));
  let e = mm.get(clave);
  if (!e) {
    const b = R.nuevo(), prev = R.usar(b); let foto = null;
    const info = dibuja(() => { foto = b.slice(); }) || {};
    R.recorte(null);
    const m = new Uint8Array(57600); if (foto) for (let i = 0; i < 57600; i++) m[i] = b[i] === foto[i] ? 1 : 0;
    R.usar(prev); e = { b, m, info }; mm.set(clave, e);
  }
  R.copiar(e.b); return e;
}

// cielo tramado de arriba abajo entre y0 e y1 con los colores de cols (trama de Bayer y un poco de ruido)
function a_cielo(R, y0, y1, cols, k = 0) {
  const B = R.buf, n = cols.length - 1;
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    const u = (y - y0) / (y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i, f0 = y * 320;
    for (let x = 0; x < 320; x++) B[f0 + x] = f + (h(x >> 3, y >> 2, k) - 0.5) * 0.16 > a_bay(x, y) ? cols[i + 1] : cols[i];
  }
}

// disco que solo pinta donde la máscara m es 1 (el cielo)
function a_discoM(B, m, cx, cy, r, c) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, Math.ceil(cy + r)), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, Math.ceil(cx + r)), r2 = r * r;
  for (let y = y0; y <= y1; y++) { const dy = y + 0.5 - cy, f = y * 320; for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx; if (dx * dx + dy * dy <= r2 && m[f + x]) B[f + x] = c; } }
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana, solo en el cielo
function a_nube(B, m, cx, cy, w, sem, c) {
  const n = 3 + Math.round(w / 12), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.13 + 0.15 * Math.cos(u * Math.PI) + 0.06 * h(i, sem, 611)); bolas.push([cx + u * w * 0.86, cy - r * 0.4 + (h(i, sem, 612) - 0.5) * w * 0.05, r]); }
  for (const [x, y, r] of bolas) a_discoM(B, m, x, y + 1, r, c[0]);
  for (const [x, y, r] of bolas) a_discoM(B, m, x, y, r * 0.92, c[1]);
  for (const [x, y, r] of bolas) a_discoM(B, m, x - 1, y - 2, r * 0.62, c[2]);
  const yb = Math.round(cy + w * 0.08); for (let x = Math.round(cx - w * 0.46); x <= Math.round(cx + w * 0.46); x++) if (x >= 0 && x < 320 && yb >= 0 && yb < 180 && m[yb * 320 + x]) B[yb * 320 + x] = c[0];
}

// las nubes que se mueven: lista de [x0, y, ancho, velocidad px/s, semilla]; las de arriba, más grandes y deprisa
function a_nubes(R, m, t, lista, c) {
  for (const [x0, y, w, v, sem] of lista) { const span = 320 + w * 2.2, x = (((x0 + t * v) % span) + span) % span - w * 1.1; a_nube(R.buf, m, x, y, w, sem, c); }
}

// la nieve que cae: n copos (uno de cada seis, cerca: más grande y más rápido); se aparta de Atom y de la barra del año
function a_nieve(R, t, n, o = {}) {
  const c = o.c ?? A.niL, c2 = o.c2 ?? A.niS, y1 = o.y1 ?? 180, v = o.viento ?? 5, m = o.m;
  for (let k = 0; k < n; k++) {
    const cerca = k % 6 === 0, vy = (cerca ? 20 : 8) + h(k, 1, 901) * 7, y = ((h(k, 2, 901) * 200 + t * vy) % 200) - 10;
    let x = h(k, 3, 901) * 340 + t * v * (cerca ? 1.6 : 1) + Math.sin(t * 1.3 + k) * (cerca ? 3 : 1.5); x = ((x % 340) + 340) % 340 - 10;
    const xi = Math.round(x), yi = Math.round(y);
    if (yi > y1 || (xi > 272 && yi < 48) || (yi < 16 && xi > 16 && xi < 174)) continue;
    if (m && !cerca && !m[Math.max(0, Math.min(57599, yi * 320 + xi))]) continue;
    if (o.clip && (xi < o.clip[0] || xi > o.clip[2] || yi < o.clip[1] || yi > o.clip[3])) continue;
    R.pset(xi, yi, cerca || k & 1 ? c : c2);
    if (cerca) { R.pset(xi + 1, yi, c2); R.pset(xi, yi + 1, c2); R.pset(xi + 1, yi + 1, c); }
  }
}

// humo de chimenea: bocanadas que suben, crecen y se deshacen (cs: tres grises del más denso al más claro)
function a_humo(R, x, y, t, k, cs, alto = 34, viento = 1) {
  for (let i = 0; i < 7; i++) {
    const u = (t * 0.2 + i / 7 + h(k, i, 902) * 0.08) % 1, px = x + u * 12 * viento + Math.sin(u * 5 + k + t * 0.6) * 2.2, py = y - u * alto, r = 1.2 + u * 3.6;
    if (px > 268 && py < 52) continue;
    const c = u < 0.3 ? cs[0] : u < 0.65 ? cs[1] : cs[2];
    for (let j = -Math.ceil(r); j <= r; j++) for (let ii = -Math.ceil(r); ii <= r; ii++) { if (ii * ii + j * j > r * r) continue; const xx = Math.round(px + ii), yy = Math.round(py + j); if (u > 0.55 && (xx + yy) % 2) continue; if (yy < 15 && xx > 16 && xx < 174) continue; R.pset(xx, yy, c); }
  }
}

// un pájaro que vuela (cuervo o gaviota) con el aleteo en cuatro tiempos
function a_ave(R, x, y, t, c, k = 0, punta = null) {
  x = Math.round(x); y = Math.round(y); const f = Math.floor(t * 7 + k * 1.7) % 4, al = [-2, -1, 1, 0][f], { pset } = R;
  pset(x, y, c); pset(x + 1, y, c); pset(x - 1, y + Math.min(0, al) + (al > 0 ? 1 : 0), c); pset(x + 2, y + Math.min(0, al) + (al > 0 ? 1 : 0), c);
  pset(x - 2, y + al, punta ?? c); pset(x + 3, y + al, punta ?? c);
}

// gente pequeña de fondo (unos 13 px): v = { a: abrigo, aS: su sombra, s: sombrero o pelo, p: piel, c: cuello, f: falda,
// g: 'alto' (sombrero puritano), 'cofia', 'plana' (gorra), 'pelo', 'bombin' }; o.anda, o.dir, o.puno (puños en alto, que
// se agitan), o.alegre (brazos arriba quietos), o.lleva (un fardo o fiambrera en la mano), o.escala (0,8 para más lejos)
function a_gente(R, x, suelo, t, k, v, o = {}) {
  const { pset, rect } = R, dir = o.dir ?? 1, anda = o.anda ?? true, fase = Math.floor(t * 6 + k * 2.3) % 2, lej = (o.escala ?? 1) < 1;
  x = Math.round(x); const y = Math.round(suelo) - (anda && fase ? 1 : 0);
  // piernas o falda
  if (v.f) { rect(x - 2, y - 4, x + 2, suelo - 1, v.f); rect(x + 2 * (dir > 0 ? -1 : 1), y - 4, x + 2 * (dir > 0 ? -1 : 1), suelo - 1, a_mez(v.f, A.k, 0.35)); }
  else { const d = anda ? fase : 0; rect(x - 1 - d, y - 3, x - 1 - d, suelo - 1, A.k); rect(x + 1 + d - 1, y - 3, x + 1 + d - 1, suelo - 1, a_mez(A.k, v.a, 0.3)); }
  // abrigo con su sombra y el cuello
  rect(x - 2, y - (lej ? 7 : 8), x + 2, y - 4, v.a); rect(dir > 0 ? x - 2 : x + 2, y - (lej ? 7 : 8), dir > 0 ? x - 2 : x + 2, y - 4, v.aS);
  if (v.c) rect(x - 1, y - (lej ? 7 : 8), x + 1, y - (lej ? 7 : 8), v.c);
  // brazos
  const hy = y - (lej ? 7 : 8);
  if (o.puno) { const s = fase ? 1 : 0; for (const sx of [-3, 3]) { rect(x + sx, hy - 3 + (sx > 0 ? s : 1 - s), x + sx, hy, v.a); pset(x + sx, hy - 4 + (sx > 0 ? s : 1 - s), v.p); } }
  else if (o.alegre) { for (const sx of [-3, 3]) { pset(x + sx, hy, v.a); pset(x + sx + Math.sign(sx), hy - 1, v.a); pset(x + sx + Math.sign(sx), hy - 2, v.p); } }
  else { const b = anda ? (fase ? 1 : -1) : 0; rect(x - 3, hy + 1, x - 3, y - 5 + b, v.aS); rect(x + 3, hy + 1, x + 3, y - 5 - b, v.aS); pset(x - 3, y - 4 + b, v.p); pset(x + 3, y - 4 - b, v.p);
    if (o.lleva) { const lx = x + 3 * dir; rect(lx - 1, y - 4, lx + 1, y - 2, o.lleva); pset(lx, y - 5, A.k); } }
  // cabeza
  rect(x - 1, hy - 3, x + 1, hy - 1, v.p); pset(x + dir, hy - 2, a_mez(v.p, A.k, 0.55)); pset(x - dir, hy - 1, a_mez(v.p, A.k, 0.2));
  // sombrero o pelo
  const g = v.g ?? 'pelo', s = v.s ?? A.k;
  if (g === 'alto') { rect(x - 3, hy - 4, x + 3, hy - 4, s); rect(x - 2, hy - 7, x + 2, hy - 5, s); rect(x - 2, hy - 5, x + 2, hy - 5, a_mez(s, A.oroS, 0.25)); }
  else if (g === 'cofia') { rect(x - 2, hy - 4, x + 2, hy - 3, A.cuello); pset(x - 2, hy - 2, A.cuello); pset(x + 2, hy - 2, A.cuello); }
  else if (g === 'plana') { rect(x - 2, hy - 4, x + 2, hy - 4, s); pset(x + 3 * dir, hy - 3, s); pset(x - 2 * dir, hy - 3, s); }
  else if (g === 'bombin') { rect(x - 3, hy - 4, x + 3, hy - 4, s); rect(x - 2, hy - 6, x + 2, hy - 5, s); }
  else { rect(x - 1, hy - 4, x + 1, hy - 4, s); pset(x - dir, hy - 3, s); }
}

// las ropas de la gente pequeña del siglo XVII y de los años 50
const a_ROPA = {
  puritano: { a: A.pur, aS: A.purS, s: A.pur, p: A.piel, c: A.cuello, g: 'alto' },
  puritana: { a: A.pur, aS: A.purS, p: A.piel, c: A.cuello, f: hex('#2e2a36'), g: 'cofia' },
  pardo: { a: A.marron, aS: A.marronS, s: hex('#3a2a1e'), p: A.piel, c: A.cuello, g: 'alto' },
  rojo: { a: A.rojo, aS: A.rojoS, s: hex('#5a3a22'), p: A.piel, g: 'pelo' },
  verde: { a: A.verde, aS: A.verdeS, p: A.pielS, f: hex('#6a4a3a'), g: 'cofia' },
  azul: { a: A.azul, aS: A.azulS, s: hex('#2a2018'), p: A.piel, g: 'plana' },
  obrero: { a: hex('#4a4e5a'), aS: hex('#33363e'), s: hex('#3a3a40'), p: A.piel, g: 'plana' },
  obrera: { a: hex('#7a4a4a'), aS: hex('#553232'), p: A.piel, f: hex('#3e3a4a'), g: 'pelo', s: hex('#5a3a22') },
  oficinista: { a: hex('#5a4a3a'), aS: hex('#3e3226'), s: hex('#22202a'), p: A.pielS, g: 'bombin' },
};

// ventana emplomada de rombos con su marco, el parteluz, el alféizar con nieve; o.luz 0–1 (encendida, para el anochecer)
function a_emplomado(R, x0, y0, x1, y1, o = {}) {
  const { pset, rect } = R, luz = o.luz ?? 0;
  rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, A.vigS);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d1 = (x - x0 + y - y0) % 4, d2 = (x - x0 - (y - y0) + 400) % 4;
    let c;
    if (d1 === 0 || d2 === 0) c = luz > 0.5 ? hex('#5a3a1a') : A.plomo;
    else if (luz > 0.5) c = h(x >> 1, y >> 1, 7) < 0.35 ? A.luzV : A.luzVL;
    else { const u = (x - x0) / (x1 - x0 + 1) * 0.6 + (y - y0) / (y1 - y0 + 1) * 0.6; c = u < 0.45 && h(x >> 1, y, 5) < 0.7 ? A.vidL : h(x >> 1, y >> 1, 5) < 0.3 ? A.vidS : A.vid; }
    pset(x, y, c);
  }
  if (x1 - x0 > 9) rect((x0 + x1) >> 1, y0, (x0 + x1) >> 1, y1, A.vigS);
  rect(x0 - 2, y1 + 2, x1 + 2, y1 + 2, o.nieve === false ? A.vigL : A.ni); rect(x0 - 2, y1 + 3, x1 + 2, y1 + 3, A.vigL); rect(x0 - 1, y1 + 4, x1 + 1, y1 + 4, A.vigS);
  if (o.nieve !== false) for (let x = x0 - 2; x <= x1 + 2; x++) if (h(x, y1, 33) < 0.4) pset(x, y1 + 1, A.niL);
}

// yeso con manchas, humedad que baja y grietas finas (col = [luz, base, sombra])
function a_yeso(R, x0, y0, x1, y1, col, sem) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const n = a_vn(x / 5, y / 4, sem), r = h(x, y, sem + 1);
    let c = n < 0.3 ? a_mez(col[1], col[2], 0.35) : n > 0.72 ? col[0] : col[1];
    if (r < 0.05) c = a_mez(c, col[2], 0.5); else if (r > 0.97) c = col[0];
    if (h(x >> 2, 1, sem + 2) < 0.2 && y - y0 < 4 + h(x >> 2, 2, sem + 2) * 9 && (x + y) % 2) c = a_mez(c, col[2], 0.45);
    B[y * 320 + x] = c;
  }
}

// una viga con su veta (vertical u horizontal), canto de luz y sombra
function a_viga(R, x0, y0, x1, y1, vert = true) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const v = vert ? h(x, y >> 2, 9) : h(x >> 2, y, 9); let c = v < 0.18 ? A.vigS : v > 0.88 ? A.vigL : A.vig;
    if (vert ? x === x0 : y === y0) c = A.vigL; else if (vert ? x === x1 : y === y1) c = A.vigS;
    B[y * 320 + x] = c;
  }
}

// una tornapunta en diagonal (2 px) de (xa, ya) a (xb, yb)
function a_tornapunta(R, xa, ya, xb, yb) { R.linea(xa, ya, xb, yb, A.vig); R.linea(xa + 1, ya, xb + 1, yb, A.vigS); }

// un piso de entramado: yeso, pies derechos cada «paso», un travesaño a media altura y tornapuntas en algunos paños
function a_piso(R, x0, y0, x1, y1, col, sem, paso = 9) {
  a_yeso(R, x0, y0, x1, y1, col, sem);
  const ym = Math.round((y0 + y1) / 2);
  a_viga(R, x0, ym, x1, ym + 1, false);
  for (let x = x0; x <= x1 - 1; x += paso) a_viga(R, x, y0, x + 1, y1, true);
  a_viga(R, x1 - 1, y0, x1, y1, true);
  for (let x = x0, i = 0; x + paso <= x1; x += paso, i++) if (h(i, sem, 41) < 0.4) { if (i % 2) a_tornapunta(R, x + 2, ym + 2, x + paso - 1, y1); else a_tornapunta(R, x + paso - 1, ym + 2, x + 2, y1); }
}

// la viga del vuelo de un piso, con las cabezas de las viguetas debajo y la sombra en la pared
function a_vuelo(R, x0, x1, y) {
  const { rect, pset } = R;
  for (let yy = y + 1; yy <= y + 3; yy++) for (let x = x0 + 2; x <= x1 - 2; x++) R.pset(x, yy, a_mez(R.pget(x, yy), A.k, yy === y + 1 ? 0.45 : 0.25));
  a_viga(R, x0, y - 2, x1, y, false);
  for (let x = x0 + 2; x < x1 - 1; x += 5) { rect(x, y + 1, x + 1, y + 2, A.vig); pset(x, y + 1, A.vigL); }
}

// tejado de tejas visto de frente (alero a la calle) con nieve arriba y su borde irregular, buhardilla y chimenea
function a_tejado(R, x0, x1, y0, y1, sem, o = {}) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / 3), r = (y - y0) % 3, ex = Math.round((y - y0) * 0.35);
    for (let x = x0 - ex; x <= x1 + ex; x++) { if (x < 0 || x > 319) continue;
      const tx = Math.floor((x + fila * 2) / 4), u = (x + fila * 2) % 4;
      let c = r === 2 || u === 0 ? A.tejS : r === 0 ? A.tejL : A.tej; if (h(tx, fila, sem) < 0.12 && r < 2 && u) c = a_mez(A.tej, hex('#5a5a4a'), 0.4);
      const capa = y0 + 4 + (y1 - y0) * 0.45 * a_vn(x / 7, sem, sem + 5);
      if (y < capa) c = y > capa - 2 ? A.niS : h(x, y, sem + 7) < 0.1 ? A.niS : y < y0 + 1 ? A.niL : A.ni;
      B[y * 320 + x] = c; } }
  const ex = Math.round((y1 - y0) * 0.35); R.rect(x0 - ex - 1, y1 + 1, x1 + ex + 1, y1 + 1, A.vigS);
  for (let x = x0 - ex; x <= x1 + ex; x += 3) R.pset(x, y1 + 2, A.niL);
}

// hastial de entramado (el piso alto en triángulo) con su ventanita, el pendolón, el collar y la nieve en las tablas
function a_hastial(R, cx, top, yb, hw, col, sem) {
  const { pset } = R;
  for (let y = top; y <= yb; y++) { const s = Math.round(hw * (y - top) / (yb - top));
    for (let x = cx - s; x <= cx + s; x++) { const borde = s - Math.abs(x - cx);
      let c; if (borde < 2) c = borde === 0 ? A.vigS : A.vig; else if (borde < 4 && y > top + 2) c = a_mez(col[1], col[2], 0.3); else { const n = a_vn(x / 5, y / 4, sem); c = n > 0.7 ? col[0] : n < 0.3 ? a_mez(col[1], col[2], 0.3) : col[1]; }
      pset(x, y, c); }
    // la nieve sobre las tablas del alero
    pset(cx - s - 1, y, A.niL); pset(cx + s + 1, y, A.ni); if (h(y, sem, 3) < 0.5) pset(cx - s - 2, y + 1, A.niS); }
  a_viga(R, cx - 1, top + 4, cx, yb, true);
  const ym = Math.round(top + (yb - top) * 0.55), sm = Math.round(hw * (ym - top) / (yb - top));
  a_viga(R, cx - sm + 2, ym, cx + sm - 2, ym + 1, false);
  a_tornapunta(R, cx - 2, ym + 2, cx - sm + 3, yb); a_tornapunta(R, cx + 1, ym + 2, cx + sm - 4, yb);
  a_emplomado(R, cx - 4, ym - 9, cx + 3, ym - 3);
  R.rect(cx, top - 3, cx, top - 1, A.vig); pset(cx, top - 4, A.niL);   // el remate
}

// la chimenea de ladrillo con sus dos ollas y la nieve encima
function a_chimenea(R, x, y0, y1, w = 7) {
  const { rect, pset } = R;
  for (let y = y0; y <= y1; y++) for (let xx = x; xx < x + w; xx++) { const f = (y - y0) % 3 === 2, j = (xx + ((Math.floor((y - y0) / 3)) % 2) * 2) % 4 === 0; pset(xx, y, f || j ? A.ladrS : xx === x ? A.ladrL : xx === x + w - 1 ? A.ladrS : A.ladr); }
  rect(x - 1, y0 - 2, x + w, y0 - 1, A.ladrS); rect(x - 1, y0 - 3, x + w, y0 - 3, A.niL);
  rect(x + 1, y0 - 6, x + 2, y0 - 4, A.tejS); rect(x + w - 3, y0 - 5, x + w - 2, y0 - 4, A.tejS); pset(x + 1, y0 - 6, A.tejL);
  return [x + 2, y0 - 7];
}

// una puerta de tablones con bisagras de hierro, aldaba y escalón con nieve
function a_puerta(R, x0, y0, x1, y1, o = {}) {
  const { rect, pset } = R;
  rect(x0 - 2, y0 - 2, x1 + 2, y0 - 1, A.vigS); rect(x0 - 2, y0, x0 - 1, y1, A.vig); rect(x1 + 1, y0, x1 + 2, y1, A.vigS);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const tabla = (x - x0) % 4 === 3; pset(x, y, tabla ? A.madS : h(x, y >> 2, 31) < 0.15 ? A.madS : (x - x0) % 4 === 0 ? A.madL : A.mad); }
  for (const yy of [y0 + 4, y1 - 5]) { rect(x0, yy, x0 + Math.round((x1 - x0) * 0.7), yy, A.hierro); pset(x0 + Math.round((x1 - x0) * 0.7) + 1, yy, A.hierroL); }
  R.disco(x1 - 3, Math.round((y0 + y1) / 2), 1.6, A.hierroL); pset(x1 - 3, Math.round((y0 + y1) / 2) + 2, A.hierro);
  rect(x0 - 3, y1 + 1, x1 + 3, y1 + 2, A.adS); rect(x0 - 3, y1 + 1, x1 + 3, y1 + 1, A.ni);
}

// la contraventana de arriba subida como toldo (tablas, la sombra debajo y las cadenas)
function a_toldo(R, x0, x1, y) {
  const { rect, pset, linea } = R;
  rect(x0 - 2, y - 5, x1 + 2, y - 1, A.mad); for (let x = x0 - 2; x <= x1 + 2; x += 5) rect(x, y - 5, x, y - 1, A.madS);
  rect(x0 - 2, y - 6, x1 + 2, y - 6, A.ni); for (let x = x0 - 2; x <= x1 + 2; x++) if (h(x, y, 77) < 0.3) pset(x, y - 7, A.niL);
  rect(x0 - 2, y, x1 + 2, y, A.madD); linea(x0 - 2, y - 5, x0 - 6, y - 14, A.hierro); linea(x1 + 2, y - 5, x1 + 6, y - 14, A.hierro);
}

// lo de dentro de una tienda abierta: el fondo oscuro con la luz de la vela y los géneros (pan, velas, paños)
function a_tiendaDentro(R, x0, y0, x1, y1, tipo, sem) {
  const { rect, pset, disco } = R;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y - y0) / (y1 - y0 + 1) + (h(x, y, sem) - 0.5) * 0.2 > 0.55 ? A.osc : A.oscL);
  const e1 = y0 + 6, e2 = y0 + 12; rect(x0, e1, x1, e1, A.madL); rect(x0, e1 + 1, x1, e1 + 1, A.madD); rect(x0, e2, x1, e2, A.madL); rect(x0, e2 + 1, x1, e2 + 1, A.madD);
  for (let x = x0 + 1; x < x1 - 1; x += 3 + Math.round(h(x, sem, 3) * 2)) {
    if (tipo === 'pan') { disco(x + 1, e1 - 1.5, 1.6, A.pan); pset(x, e1 - 2, A.panL); disco(x + 1, e2 - 1.5, 1.6, h(x, 1, sem) < 0.5 ? A.panS : A.pan); pset(x, e2 - 2, A.panL); }
    else if (tipo === 'pano') { const c = [A.rojo, A.azul, A.verde, A.oro, hex('#8a6a9a')][Math.floor(h(x, 2, sem) * 5)]; rect(x, e1 - 3, x + 1, e1 - 1, c); pset(x, e1 - 3, A.cuello); const c2 = [A.rojo, A.azul, A.verde, A.oro][Math.floor(h(x, 3, sem) * 4)]; rect(x, e2 - 3, x + 1, e2 - 1, c2); }
    else { rect(x, e1 - 3, x, e1 - 1, A.cera); rect(x + 1, e2 - 4, x + 1, e2 - 1, A.ceraS); pset(x + 1, e2 - 4, A.cera); }
  }
  if (tipo === 'velas') for (let x = x0 + 2; x < x1 - 1; x += 3) { const l = 4 + Math.round(h(x, 9, sem) * 3); rect(x, y0 + 1, x, y0 + l, A.cera); pset(x, y0, A.k); pset(x + 1, y0 + l, A.ceraS); }
  if (tipo === 'pano') for (let x = x0 + 3; x < x1 - 2; x += 7) { rect(x, y0 + 1, x + 2, y1 - 2, [A.rojoS, A.azulS, A.verdeS][Math.floor(x / 7) % 3]); rect(x, y0 + 1, x, y1 - 2, a_mez([A.rojo, A.azul, A.verde][Math.floor(x / 7) % 3], A.cuello, 0.2)); }
}

// el mostrador (la contraventana de abajo bajada) con sus escuadras y los géneros encima
function a_tablero(R, x0, x1, y, tipo, sem) {
  const { rect, pset, disco } = R;
  rect(x0 - 2, y, x1 + 2, y, A.madL); rect(x0 - 2, y + 1, x1 + 2, y + 3, A.mad); rect(x0 - 2, y + 4, x1 + 2, y + 4, A.madD);
  for (let x = x0 + 1; x <= x1; x += 9) { rect(x, y + 5, x, y + 8, A.hierro); pset(x + 1, y + 5, A.hierro); }
  for (let x = x0; x < x1 - 2; x += 5 + Math.round(h(x, 4, sem) * 2)) {
    if (tipo === 'pan') { disco(x + 2, y - 2, 2.2, A.pan); rect(x + 1, y - 3, x + 2, y - 3, A.panL); pset(x + 3, y - 1, A.panS); }
    else if (tipo === 'pano') { const c = [A.rojo, A.azul, A.verde, A.oro][Math.floor(h(x, 5, sem) * 4)]; rect(x, y - 3, x + 3, y - 1, c); rect(x, y - 3, x + 3, y - 3, a_mez(c, A.cuello, 0.4)); rect(x + 3, y - 3, x + 3, y - 1, a_mez(c, A.k, 0.3)); }
    else { rect(x + 1, y - 5, x + 1, y - 1, A.cera); rect(x, y - 1, x + 2, y - 1, A.hierro); pset(x + 1, y - 6, A.k); }
  }
}

// una casa de entramado de tres alturas: planta de tienda, primer piso volado y hastial (o alero con tejado); devuelve
// las chimeneas (para el humo), la puerta, el letrero y la ventana con alféizar
function a_casa(R, s) {
  const { x0, x1, base, sem } = s, col = s.col, gy = base - 36, f1 = base - 64, info = { humo: [] };
  // la chimenea va detrás del hastial
  if (s.tipo === 'hastial') { const ch = a_chimenea(R, s.chim ?? x1 - 12, s.top + 8, f1 - 20); info.humo.push(ch); }
  // planta baja
  a_yeso(R, x0, gy + 1, x1, base - 4, col, sem);
  R.rect(x0, base - 4, x1, base, A.adS); for (let x = x0; x <= x1; x += 4) R.pset(x, base - 3, A.ad);
  a_viga(R, x0, gy, x0 + 2, base - 4, true); a_viga(R, x1 - 2, gy, x1, base - 4, true); a_viga(R, x0, base - 6, x1, base - 5, false);
  const pu = s.puerta ?? null;
  let ox0 = x0 + 6, ox1 = x1 - 6;
  if (pu === 'izq') { a_puerta(R, x0 + 5, gy + 6, x0 + 17, base - 7); info.puerta = [x0 + 5, gy + 6, x0 + 17, base - 7]; ox0 = x0 + 23; }
  if (pu === 'der') { a_puerta(R, x1 - 17, gy + 6, x1 - 5, base - 7); info.puerta = [x1 - 17, gy + 6, x1 - 5, base - 7]; ox1 = x1 - 23; }
  if (s.tienda) { a_tiendaDentro(R, ox0, gy + 9, ox1, base - 15, s.tienda, sem); R.rect(ox0 - 1, gy + 8, ox1 + 1, gy + 8, A.vigS); a_toldo(R, ox0, ox1, gy + 8); a_tablero(R, ox0, ox1, base - 14, s.tienda, sem); info.tienda = [ox0, gy + 9, ox1, base - 15]; }
  // primer piso, volado
  a_piso(R, x0 - 2, f1, x1 + 2, gy - 3, col, sem + 10);
  const nv = Math.max(1, Math.floor((x1 - x0) / 26)), anv = Math.floor((x1 - x0 + 4) / nv);
  for (let i = 0; i < nv; i++) { const cx = x0 - 2 + Math.round(anv * (i + 0.5)); a_emplomado(R, cx - 8, f1 + 7, cx + 7, f1 + 18, { luz: s.luz }); if (i === 0) info.ventana = [cx - 8, f1 + 7, cx + 7, f1 + 18]; }
  a_vuelo(R, x0 - 2, x1 + 2, gy - 2);
  // segundo piso: hastial o tejado con alero
  if (s.tipo === 'hastial') {
    const yb = f1 - 22; a_piso(R, x0 - 4, yb + 1, x1 + 4, f1 - 3, col, sem + 20, 10);
    for (let i = 0; i < nv; i++) { const cx = x0 - 2 + Math.round(anv * (i + 0.5)); a_emplomado(R, cx - 6, yb + 7, cx + 5, yb + 15, { luz: s.luz }); }
    a_vuelo(R, x0 - 4, x1 + 4, f1 - 2);
    a_hastial(R, Math.round((x0 + x1) / 2), s.top, yb, Math.round((x1 - x0) / 2) + 6, col, sem + 30);
  } else {
    const ch = a_chimenea(R, s.chim ?? x0 + Math.round((x1 - x0) * 0.7), s.top - 4, s.top + 6); info.humo.push(ch);
    a_tejado(R, x0 + 2, x1 - 2, s.top, f1 - 3, sem);
    // la buhardilla
    const cx = Math.round((x0 + x1) / 2) - 8, by = f1 - 16;
    a_yeso(R, cx - 7, by, cx + 7, f1 - 4, col, sem + 40); a_emplomado(R, cx - 4, by + 3, cx + 4, f1 - 9, { luz: s.luz });
    for (let k = 0; k <= 8; k++) { R.rect(cx - 8 - k + 8 - k, by - 8 + k, cx + 8 - (8 - k) + k, by - 8 + k, k < 2 ? A.niL : k < 4 ? A.ni : A.tej); }
    R.rect(cx - 9, by, cx + 9, by, A.vigS);
    a_vuelo(R, x0 - 2, x1 + 2, f1 - 2);
  }
  info.letrero = [s.letrero ?? (pu === 'izq' ? x0 + 4 : x1 - 4), gy - 1, s.tienda];
  return info;
}

// la catedral de Canterbury a lo lejos: la nave con contrafuertes y pináculos, las torres del oeste y la torre de Bell
// Harry con sus cuatro pináculos y los ventanales gemelos; luz por la izquierda, nieve en los tejados
function a_catedral(R, cx, base) {
  const { rect, pset } = R;
  const piedra = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / Math.max(1, x1 - x0); let c = u < 0.3 ? A.catL : u < 0.75 ? A.cat : A.catS; if ((y - y0) % 4 === 3 && h(x >> 2, y, 51) < 0.6) c = a_mez(c, A.catD, 0.35); pset(x, y, c); } };
  // la nave y el coro
  const ny = base - 34; piedra(cx - 70, ny, cx + 70, base);
  for (let y = ny - 7; y < ny; y++) { const e = ny - y; rect(cx - 70 + e, y, cx + 70 - e, y, y === ny - 7 ? A.niL : e > 4 ? A.ni : A.plomoT); }
  rect(cx - 70, ny - 1, cx + 70, ny - 1, A.niS);
  for (let x = cx - 66; x <= cx + 66; x += 11) { rect(x, ny + 2, x + 2, base, A.catS); rect(x, ny + 2, x, base, A.catL); rect(x + 1, ny - 4, x + 1, ny - 1, A.cat); pset(x + 1, ny - 5, A.niL);
    if (x + 11 <= cx + 66) { rect(x + 5, ny + 6, x + 7, base - 6, A.catD); pset(x + 6, ny + 5, A.catD); rect(x + 6, ny + 6, x + 6, base - 6, a_mez(A.catD, A.vidL, 0.25)); } }
  // las torres del oeste (a la izquierda)
  for (const tx of [cx - 62, cx - 48]) { piedra(tx, ny - 22, tx + 9, base); rect(tx + 3, ny - 16, tx + 5, ny - 4, A.catD); rect(tx - 1, ny - 24, tx + 10, ny - 23, A.catS); for (const px of [tx - 1, tx + 4, tx + 9]) { rect(px, ny - 28, px + 1, ny - 25, A.cat); pset(px, ny - 29, A.niL); } }
  // Bell Harry
  const tx0 = cx - 14, tx1 = cx + 14, ty = base - 78;
  piedra(tx0, ty, tx1, ny);
  for (const [px0, px1] of [[tx0 - 2, tx0 + 2], [tx1 - 2, tx1 + 2]]) { piedra(px0, ty - 8, px1, ny); for (let y = ty - 14; y < ty - 8; y++) { const e = Math.floor((y - (ty - 14)) / 2); rect(px0 + 2 - e, y, px0 + 2 + e, y, A.cat); } pset(px0 + 2, ty - 15, A.catS); }
  for (let x = tx0 + 3; x <= tx1 - 3; x += 3) { rect(x, ty - 3, x + 1, ty - 1, A.cat); pset(x, ty - 3, A.catL); }
  rect(tx0, ty, tx1, ty, A.catS);
  for (const [y0, y1] of [[ty + 4, ty + 20], [ty + 25, ny - 4]]) for (const wx of [cx - 9, cx + 3]) {
    rect(wx, y0, wx + 5, y1, A.catD); rect(wx + 2, y0 + 1, wx + 3, y1, a_mez(A.catD, A.k, 0.3)); pset(wx + 1, y0, A.cat); pset(wx + 4, y0, A.cat); rect(wx - 1, y0 - 1, wx + 6, y0 - 1, A.catS); }
  rect(cx - 1, ty + 2, cx, ny, A.catS);
  return { torre: [cx, ty], campanas: [[cx - 6, ty + 12], [cx + 6, ty + 12]] };
}

// casas lejanas pequeñas (el callejón): fachadas de entramado sencillas, tejados con nieve, ventanas; con bruma
function a_casasLejos(R, x0, x1, base, sem, bruma) {
  const { rect, pset } = R; let x = x0; const humo = [];
  while (x < x1) {
    const w = 16 + Math.round(h(x, 1, sem) * 10), alto = 26 + Math.round(h(x, 2, sem) * 12);
    const cs = [[hex('#efe4c8'), hex('#ddcfac'), hex('#bba98a')], [hex('#ecd29c'), hex('#d8b878'), hex('#b08e58')], [hex('#e8c4ae'), hex('#d4a890'), hex('#ac866e')]][Math.floor(h(x, 3, sem) * 3)];
    const top = base - alto;
    a_yeso(R, x, top, x + w - 1, base, cs, sem + x);
    for (let xx = x; xx < x + w; xx += 5) rect(xx, top, xx, base, A.vig);
    rect(x, top + Math.round(alto * 0.45), x + w - 1, top + Math.round(alto * 0.45), A.vig);
    for (let xx = x + 2; xx < x + w - 4; xx += 7) { rect(xx, top + 4, xx + 3, top + 8, A.vid); pset(xx, top + 4, A.vidL); rect(xx, top + 9, xx + 3, top + 9, A.ni); }
    rect(x + 3, base - 9, x + 7, base, A.madS);
    // tejado a dos aguas visto de lado
    for (let k = 0; k < 9; k++) rect(x - 1 + k, top - 9 + k, x + w - k, top - 9 + k, k < 3 ? A.ni : k < 5 ? A.niS : A.tej);
    if (h(x, 4, sem) < 0.6) { rect(x + w - 6, top - 14, x + w - 3, top - 6, A.ladr); pset(x + w - 6, top - 15, A.niL); humo.push([x + w - 5, top - 15]); }
    x += w + 1;
  }
  if (bruma) for (let y = base - 60; y <= base; y++) for (let xx = x0 - 2; xx <= x1 + 2; xx++) { const c = R.pget(xx, y); if (c) pset(xx, y, a_mez(c, bruma[0], bruma[1])); }
  return humo;
}

// el suelo de adoquines en perspectiva con nieve sucia, roderas de barro y charcos helados (lista [cx, cy, rx, ry])
function a_adoquines(R, y0, y1, sem, charcos = [], o = {}) {
  const B = R.buf; let j = 0, yy = y0;
  const filas = []; while (yy <= y1) { const hgt = 2 + Math.floor((yy - y0) / 10); filas.push([yy, hgt, j]); yy += hgt; j++; }
  for (const [ya, hgt, fj] of filas) { const w = 4 + Math.floor(fj * 0.8), off = (fj % 2) * Math.floor(w / 2);
    for (let y = ya; y < Math.min(180, ya + hgt); y++) { const v = y - ya;
      for (let x = 0; x < 320; x++) { const i = Math.floor((x + off) / w), u = (x + off) % w;
        let c = v === hgt - 1 || u === w - 1 ? A.barro : h(i, fj, sem) < 0.33 ? A.adS : h(i, fj, sem) > 0.75 ? A.adL : A.ad;
        if (v === 0 && u < w - 1 && c !== A.barro) c = a_mez(c, A.adL, 0.5);
        // nieve sucia en manchas, más en los bordes de la calle
        const n = a_vn(x / 11, y / 4, sem + 3) * 0.72 + (h(x >> 1, y, sem + 4) - 0.5) * 0.08 + (o.nieveBorde ? Math.max(0, (y0 + 7 - y) / 7) * 0.4 + Math.max(0, (y - 172) / 8) * 0.2 : 0) + (o.roderas && Math.abs(y - o.roderas) < 2 ? 0.18 : 0);
        if (n > 0.62) c = n > 0.7 ? (h(x, y, sem) < 0.05 ? A.niL : A.ni) : (u === w - 1 || v === hgt - 1 ? A.suciaS : A.sucia);
        else if (n > 0.57) c = A.suciaS;
        B[y * 320 + x] = c; } } }
  // charcos helados que reflejan el cielo
  for (const [cx, cy, rx, ry] of charcos) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x >> 1, y, 61) - 0.5) * 0.3; if (e > 1 || x < 0 || x > 319 || y < 0 || y > 179) continue; B[y * 320 + x] = e > 0.8 ? A.hieloS : (x + y * 2) % 7 === 0 ? A.hieloL : y < cy ? A.hielo : a_mez(A.hielo, A.cie0, 0.4); }
}

// un letrero de hierro colgado de su escuadra, que se mece; pictograma: 'pan', 'velas', 'pano'
function a_letrero(R, x, y, t, tipo, k = 0, dir = 1) {
  const { rect, pset, linea, disco } = R, a = Math.sin(t * 1.6 + k) * 1.2, dx = Math.round(a);
  rect(x, y, x + 13 * dir, y, A.hierro); linea(x, y + 5, x + 9 * dir, y, A.hierro); pset(x + 13 * dir, y - 1, A.hierroL);
  const sx = x + 8 * dir + dx, sy = y + 3;
  linea(x + 4 * dir, y + 1, sx - 4, sy, A.hierro); linea(x + 12 * dir, y + 1, sx + 4, sy, A.hierro);
  rect(sx - 6, sy, sx + 6, sy + 10, A.k); rect(sx - 5, sy + 1, sx + 5, sy + 9, A.oroS); rect(sx - 5, sy + 1, sx + 5, sy + 1, A.oro); rect(sx - 4, sy + 2, sx + 4, sy + 8, hex('#2e3a4a'));
  if (tipo === 'pan') { disco(sx + 0.5, sy + 5.5, 3, A.pan); rect(sx - 2, sy + 4, sx + 1, sy + 4, A.panL); pset(sx - 1, sy + 6, A.panS); pset(sx + 1, sy + 6, A.panS); }
  else if (tipo === 'velas') { for (const vx of [sx - 2, sx, sx + 2]) { rect(vx, sy + 4, vx, sy + 8, A.cera); pset(vx, sy + 3, A.llama); } }
  else { rect(sx - 3, sy + 3, sx + 3, sy + 7, A.rojo); rect(sx - 3, sy + 3, sx + 3, sy + 3, hex('#d86a5a')); rect(sx + 2, sy + 4, sx + 3, sy + 7, A.azul); }
}

// el pozo de piedra con su armazón, la polea, la cuerda que se mece y el cubo
function a_pozo(R, x, suelo, t, fijo = true) {
  const { rect, pset, linea } = R;
  if (fijo) {
    for (let y = suelo - 9; y <= suelo; y++) for (let xx = x - 9; xx <= x + 9; xx++) { const fila = Math.floor((y - suelo + 9) / 3), j = (xx + fila * 2 + 30) % 6 === 0 || (y - suelo + 9) % 3 === 2; pset(xx, y, j ? A.adS : xx < x - 4 ? A.adL : xx > x + 5 ? A.adS : A.ad); }
    rect(x - 10, suelo - 10, x + 10, suelo - 10, A.ni); rect(x - 9, suelo - 11, x + 9, suelo - 11, A.niL);
    rect(x - 9, suelo - 26, x - 8, suelo - 10, A.vig); rect(x + 8, suelo - 26, x + 9, suelo - 10, A.vigS);
    for (let k = 0; k < 5; k++) rect(x - 12 + k, suelo - 28 - k, x + 12 - k, suelo - 28 - k, k === 4 ? A.niL : k > 1 ? A.ni : A.tej);
    rect(x - 7, suelo - 24, x + 7, suelo - 24, A.madL); R.disco(x, suelo - 24, 1.6, A.madS);
  } else {
    const a = Math.sin(t * 1.1) * 1.5, bx = Math.round(x + a), by = suelo - 15;
    linea(x, suelo - 23, bx, by - 2, hex('#a08a60'));
    rect(bx - 2, by - 1, bx + 2, by + 3, A.mad); rect(bx - 2, by - 1, bx + 2, by - 1, A.hierro); rect(bx - 2, by + 2, bx + 2, by + 2, A.hierro); pset(bx - 2, by, A.madL);
  }
}

// Devuelve { suelo: 164, horizonte, aviso: [x0, y0, x1, y1] (en la puerta de la casa rosa), puertas, pozo, barril,
// catedral, tiendas }.
const a_CANT = [
  { x0: -6, x1: 50, base: 150, col: [hex('#eed6a0'), hex('#dcbc7c'), hex('#b4925a')], tipo: 'hastial', top: 36, tienda: 'velas', sem: 11, chim: 34 },
  { x0: 54, x1: 114, base: 150, col: [hex('#f2e8d0'), hex('#e2d4b4'), hex('#c0ae8a')], tipo: 'alero', top: 52, tienda: 'pan', puerta: 'der', sem: 23 },
  { x0: 206, x1: 262, base: 150, col: [hex('#eecab4'), hex('#dcae96'), hex('#b48a74')], tipo: 'hastial', top: 40, tienda: 'pano', puerta: 'izq', sem: 37, chim: 244 },
  { x0: 266, x1: 326, base: 150, col: [hex('#f4f2ea'), hex('#e2e0d6'), hex('#bcbab0')], tipo: 'alero', top: 64, tienda: null, puerta: 'izq', sem: 49, chim: 300 },
];

function a_canterbury(R, t, o) {
  const ano = o.ano ?? 1647, motin = a_lim(o.motin ?? 0), fiesta = ano >= 1660;
  const F = a_fijo(R, 'cant', (marca) => {
    a_cielo(R, 0, 120, [A.cie0, A.cie1, A.cie2, A.cie3, A.cie4], 3);
    marca();
    // la ciudad lejana: tejados azulados junto al horizonte
    for (let x = 0; x < 320; x++) { const y = 104 - Math.round(a_vn(x / 9, 1, 71) * 8) - (h(x >> 3, 2, 71) < 0.3 ? 4 : 0); R.rect(x, y, x, 120, (x >> 3) % 2 ? hex('#a8aebc') : hex('#9ea4b4')); R.pset(x, y, hex('#d4dae4')); }
    const cat = a_catedral(R, 160, 120);
    const humoL = a_casasLejos(R, 112, 210, 142, 81, [hex('#c8d0dc'), 0.22]);
    R.rect(112, 142, 210, 150, A.adS); for (let x = 112; x <= 210; x++) if (h(x, 0, 83) < 0.5) R.pset(x, 142 + Math.floor(h(x, 1, 83) * 7), A.sucia);
    a_pozo(R, 176, 150, 0, true);
    const casas = a_CANT.map((s) => a_casa(R, s));
    a_adoquines(R, 150, 179, 91, [[96, 168, 14, 3], [186, 158, 9, 2], [292, 174, 12, 3]], { nieveBorde: true, roderas: 163 });
    // montones de nieve contra las casas y en primer término
    for (let x = 0; x < 320; x++) { if (x > 116 && x < 204) continue; const a = Math.round(a_vn(x / 6, 3, 97) * 4); for (let y = 150; y < 150 + a; y++) R.pset(x, y, y === 150 ? A.niL : A.ni); }
    for (let x = 0; x < 320; x++) { const a = Math.max(0, Math.round((a_vn(x / 10, 5, 99) - 0.45) * 14) - (x > 40 && x < 280 ? 6 : 0)); for (let y = 180 - a; y < 180; y++) R.pset(x, y, y === 180 - a ? A.niL : h(x, y, 98) < 0.15 ? A.niS : A.ni); }
    return { cat, casas, humo: [...casas.flatMap((c) => c.humo), ...humoL] };
  });
  const I = F.info;
  a_nubes(R, F.m, t, [[30, 70, 26, 1.0, 1], [190, 84, 20, 0.8, 2], [120, 40, 46, 2.2, 3], [-40, 26, 60, 3.4, 4], [250, 56, 36, 2.6, 5]], [A.nuS, A.nu, A.nuL]);
  // cuervos: dos que cruzan y uno en el caballete de la casa blanca que da saltitos
  for (let k = 0; k < 3; k++) { const x = ((t * (9 + k * 3) + k * 120) % 380) - 30, y = 50 + k * 9 + Math.sin(t * 1.5 + k) * 3; if (x > 270 && y < 48) continue; a_ave(R, x, y, t, A.k, k); }
  { const s = Math.floor(t / 1.7) % 3, cx = 286 + [0, 4, 9][s], salta = (t % 1.7) < 0.15 ? 1 : 0; R.rect(cx, 58 - salta, cx + 3, 60 - salta, A.k); R.pset(cx + (s === 1 ? -1 : 4), 58 - salta, A.k); R.pset(cx + (s === 1 ? -1 : 4), 59 - salta, hex('#e0a030')); R.pset(cx + 1, 61 - salta, A.k); R.pset(cx + 2, 61 - salta, A.k); }
  for (const [k, [x, y]] of I.humo.entries()) a_humo(R, x, y, t, k, [hex('#8a8c96'), hex('#a8acb6'), hex('#c4c8d0')], 30, 1.2);
  // las campanas de 1660 en la torre
  if (fiesta) for (const [i, [bx, by]] of I.cat.campanas.entries()) { const a = Math.round(Math.sin(t * 4 + i * 1.6) * 1.6); R.rect(bx - 1 + a, by - 2, bx + 1 + a, by + 1, A.oro); R.rect(bx - 2 + a, by + 2, bx + 2 + a, by + 2, A.oroS); R.pset(bx + a, by - 3, A.oroS);
    const u = ((t + i * 0.5) % 1.4) / 1.4; if (u < 0.8) for (let s = -1; s <= 1; s += 2) for (let j = -3; j <= 3; j++) R.pset(bx + s * Math.round(6 + u * 10) + i, by + j + Math.round(Math.abs(j) * 0.3), u < 0.4 ? A.oroL : A.oro); }
  // el cubo del pozo
  a_pozo(R, 176, 150, t, false);
  // la gente del callejón (recortada a su hueco)
  R.recorte([116, 100, 205, 151]);
  const nG = motin > 0 ? 3 + Math.round(motin * 7) : 3;
  for (let k = 0; k < nG; k++) {
    if (motin > 0 && k >= 1) { const x = 120 + k * 9 + Math.sin(t * 2 + k) * 2, ropa = [a_ROPA.rojo, a_ROPA.pardo, a_ROPA.verde, a_ROPA.azul, a_ROPA.rojo, a_ROPA.verde, a_ROPA.pardo][k % 7]; a_gente(R, x, 148 - (k % 2) * 2, t, k, ropa, { anda: false, puno: true, dir: k % 2 ? 1 : -1 }); continue; }
    const v = 6 + k * 2, dir = k % 2 ? 1 : -1, x = dir > 0 ? 110 + ((t * v + k * 40) % 110) : 214 - ((t * v + k * 50) % 110);
    a_gente(R, x, 146 + (k % 2) * 3, t, k, fiesta ? [a_ROPA.rojo, a_ROPA.verde, a_ROPA.azul][k % 3] : [a_ROPA.puritano, a_ROPA.puritana, a_ROPA.pardo][k % 3], { dir, alegre: fiesta && k === 0, lleva: k === 2 ? A.marronS : null });
  }
  R.recorte(null);
  // el motín: coles y ramas de acebo que vuelan en arco desde el callejón y ruedan por la calle (sin dar a nadie)
  if (motin > 0) for (let k = 0; k < Math.round(2 + motin * 7); k++) {
    const per = 1.6 + h(k, 1, 300) * 0.8, u = ((t + h(k, 2, 300) * per) % per) / per, x0 = 136 + h(k, 3, 300) * 50, x1 = x0 + (h(k, 4, 300) - 0.5) * 180, y0 = 132, y1 = 158 + h(k, 5, 300) * 16;
    const x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * 34;
    if (k % 2 === 0) { R.disco(x, y, 3.2, hex('#3e6a2e')); R.disco(x, y, 2.6, hex('#6a9a4a')); R.disco(x - 0.8, y - 0.8, 1.5, hex('#9ac86a')); R.pset(Math.round(x + 1), Math.round(y), hex('#3e6a2e')); }
    else { const a = u * 9; for (let i = -4; i <= 4; i++) { R.pset(Math.round(x + Math.cos(a) * i), Math.round(y + Math.sin(a) * i), C.acebo); if (i % 2) R.pset(Math.round(x + Math.cos(a) * i - Math.sin(a) * 1.5), Math.round(y + Math.sin(a) * i + Math.cos(a) * 1.5), C.aceboS); } R.pset(Math.round(x + Math.cos(a) * 3), Math.round(y + Math.sin(a) * 3 - 1), C.aceboS); R.pset(Math.round(x), Math.round(y - 1), C.rojoN); }
  }
  // letreros, gato, velas que brillan dentro de la cerería
  for (const [k, c] of I.casas.entries()) if (c.letrero[2]) a_letrero(R, c.letrero[0], c.letrero[1] - 14, t, c.letrero[2], k, k < 2 ? 1 : -1);
  { const v = I.casas[1].ventana, cx = v[0] + 3, cy = v[3] + 1, cola = Math.round(Math.sin(t * 2.2) * 2); R.rect(cx, cy - 4, cx + 3, cy, hex('#3a3236')); R.rect(cx, cy - 6, cx + 2, cy - 5, hex('#3a3236')); R.pset(cx, cy - 7, hex('#3a3236')); R.pset(cx + 2, cy - 7, hex('#3a3236')); R.pset(cx + 1, cy - 5, hex('#c8d040'));
    R.linea(cx + 3, cy, cx + 6, cy - 2 + cola, hex('#3a3236')); }
  { const ti = I.casas[0].tienda, f = 0.6 + 0.4 * Math.sin(t * 9) * Math.sin(t * 4.3); R.disco(ti[0] + 6, ti[3] - 3, 2 + f, hex('#6a4a2a')); R.pset(ti[0] + 6, ti[3] - 4, f > 0.7 ? A.llamaL : A.llama); R.pset(ti[0] + 6, ti[3] - 3, A.llamaS); }
  // 1660: coronas de acebo en las puertas y guirnaldas
  const aviso = I.casas[2].puerta ? [I.casas[2].puerta[0] + 1, I.casas[2].puerta[1] + 8, I.casas[2].puerta[2] - 1, I.casas[2].puerta[1] + 21] : null;
  if (fiesta) {
    for (const c of I.casas) if (c.puerta) { const p = c.puerta; a_corona(R, Math.round((p[0] + p[2]) / 2), p[1] + 7, t); }
    for (const [xa, xb, ya] of [[50, 54, 112], [114, 206, 112], [262, 266, 112]]) { for (let x = xa - 2; x <= xb + 2; x++) { const y = ya + Math.round(Math.sin((x - xa) / Math.max(1, xb - xa) * Math.PI) * (xb - xa > 20 ? 8 : 1)); R.pset(x, y, C.acebo); R.pset(x, y + 1, C.aceboS); if (x % 6 === 0) R.pset(x, y + 2, C.rojoN); } }
  } else if (aviso && (o.aviso ?? 0) > 0) a_aviso(R, aviso, a_lim(o.aviso), t);
  a_nieve(R, t, Math.round(80 * (o.nieve ?? 0.35)));
  return { suelo: 164, horizonte: 120, aviso, puertas: I.casas.filter((c) => c.puerta).map((c) => c.puerta), pozo: [176, 150], barril: [236, 168], catedral: [160, 42], tiendas: I.casas.filter((c) => c.tienda).map((c) => c.tienda), callejon: [116, 205, 148] };
}

// el aviso del alguacil (sin letras): pergamino clavado con un acebo tachado por una cruz roja y renglones insinuados;
// u 0–1 lo hace crecer desde el clavo
function a_aviso(R, [x0, y0, x1, y1], u, t, cruz = true) {
  const { rect, pset, linea } = R, cx = Math.round((x0 + x1) / 2), w = Math.round((x1 - x0) * u / 2), hh = Math.round((y1 - y0) * u);
  if (u <= 0) return;
  rect(cx - w - 1, y0 + 1, cx + w + 1, y0 + hh + 1, a_mez(A.k, A.mad, 0.5));
  for (let y = y0; y <= y0 + hh; y++) for (let x = cx - w; x <= cx + w; x++) pset(x, y, h(x, y, 401) < 0.12 ? hex('#d8c8a0') : y === y0 + hh && x % 2 ? hex('#c8b890') : hex('#f0e4c4'));
  if (u < 0.95) return;
  // el acebo
  pset(cx - 2, y0 + 5, C.acebo); pset(cx - 3, y0 + 4, C.acebo); pset(cx - 1, y0 + 4, C.aceboS); pset(cx + 1, y0 + 5, C.acebo); pset(cx + 2, y0 + 4, C.acebo); pset(cx + 1, y0 + 4, C.aceboS); pset(cx, y0 + 6, C.rojoN); pset(cx - 1, y0 + 6, C.rojoN);
  if (cruz) { linea(cx - 4, y0 + 2, cx + 4, y0 + 8, C.rojoN); linea(cx + 4, y0 + 2, cx - 4, y0 + 8, C.rojoN); linea(cx - 3, y0 + 2, cx + 5, y0 + 8, C.rojoNS); }
  for (let y = y0 + 10; y < y1 - 1; y += 2) for (let x = x0 + 2; x < x1 - 1; x++) if (h(x >> 1, y, 403) > 0.25) pset(x, y, hex('#7a6a58'));
  pset(cx, y0, A.hierroL); pset(cx, y0 + 1, A.hierro);
}

// una corona de acebo con bayas y lazo rojo (las de 1660 y las de 1870)
export function a_corona(R, cx, cy, t = 0) {
  const { pset, rect } = R;
  for (let a = 0; a < 24; a++) { const an = a / 24 * Math.PI * 2, x = Math.round(cx + Math.cos(an) * 4), y = Math.round(cy + Math.sin(an) * 4); pset(x, y, a % 3 ? C.acebo : C.aceboS); pset(Math.round(cx + Math.cos(an) * 3), Math.round(cy + Math.sin(an) * 3), a % 2 ? C.acebo : hex('#2e8a4e')); }
  for (const [dx, dy] of [[-3, -2], [2, -3], [3, 2], [-2, 3]]) pset(cx + dx, cy + dy, C.rojoN);
  rect(cx - 1, cy + 4, cx + 1, cy + 5, C.rojoN); pset(cx - 2, cy + 6, C.rojoN); pset(cx + 2, cy + 6, C.rojoNS);
}

// el barril de delante en Canterbury (duelas, aros de hierro, nieve en la tapa) y una caja de madera
function a_barril(R, t, o = {}) {
  const enc = o.encuadre ?? 'canterbury';
  if (enc !== 'canterbury') return;
  const { rect, pset } = R, x0 = 229, x1 = 243, yb = 168, y0 = yb - 17;
  for (let y = y0; y <= yb; y++) { const b = Math.round(Math.sin((y - y0) / (yb - y0) * Math.PI) * 1.5); for (let x = x0 - b; x <= x1 + b; x++) { const u = (x - x0 + b) / (x1 - x0 + 2 * b); const duela = (x - x0 + 30) % 4 === 0; pset(x, y, duela ? A.madD : u < 0.25 ? A.madL : u > 0.78 ? A.madS : A.mad); } }
  for (const y of [y0 + 3, yb - 3]) rect(x0 - 1, y, x1 + 1, y + 1, A.hierro); rect(x0 - 1, y0 + 3, x0 + 2, y0 + 3, A.hierroL);
  rect(x0, y0 - 1, x1, y0, A.ni); for (let x = x0 - 1; x <= x1 + 1; x++) if (h(x, 1, 501) < 0.6) pset(x, y0 - 2, A.niL);
  rect(x0 - 4, yb + 1, x1 + 5, yb + 2, a_mez(A.adS, A.k, 0.4));
  // la caja
  const cx0 = 245, cx1 = 259, cy0 = 160; rect(cx0, cy0, cx1, yb, A.madL); for (let y = cy0 + 2; y <= yb; y += 3) rect(cx0, y, cx1, y, A.madS); rect(cx0, cy0, cx0, yb, A.mad); rect(cx1, cy0, cx1, yb, A.madD);
  rect(cx0, cy0 - 1, cx1, cy0 - 1, A.niL); rect(cx0 + 2, cy0 - 3, cx0 + 6, cy0 - 2, hex('#6a9a4a')); pset(cx0 + 3, cy0 - 3, hex('#9ac86a'));
}

// Devuelve { suelo: 174 (la calle, clientes), sueloDentro: 152 (el tendero, detrás del mostrador), mostrador: [x0 40,
// y 142, x1 244], horno: [x, y], hueco: [x0, y0, x1, y1] }.
function a_tienda(R, t, o) {
  const fiesta = (o.ano ?? 1647) >= 1660;
  const F = a_fijo(R, 'tienda', () => {
    const { rect, pset, disco } = R, col = [hex('#f2e8d0'), hex('#e2d4b4'), hex('#c0ae8a')];
    // el piso de arriba, volado, y la planta baja
    a_piso(R, -4, 0, 324, 30, col, 501, 14);
    a_emplomado(R, 186, 6, 230, 22);
    a_vuelo(R, -4, 324, 33);
    a_yeso(R, 0, 34, 320, 160, col, 503);
    a_viga(R, 0, 34, 6, 160, true); a_viga(R, 36, 34, 41, 160, true); a_viga(R, 243, 34, 248, 160, true); a_viga(R, 314, 34, 320, 160, true);
    a_viga(R, 0, 34, 320, 37, false);
    // el hueco de la tienda: fondo, estantes con hogazas y panes largos, cestos, sacos, horno
    const x0 = 46, x1 = 238, y0 = 54, y1 = 141;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = Math.hypot((x - 200) / 80, (y - 100) / 50); pset(x, y, d < 0.6 && h(x, y, 5) < 0.5 ? hex('#5a3e2a') : (y - y0) / (y1 - y0) + (h(x >> 1, y >> 1, 504) - 0.5) * 0.25 > 0.5 ? A.osc : A.oscL); }
    // tablas de la pared del fondo
    for (let x = x0; x <= x1; x += 9) rect(x, y0, x, y1, hex('#21160f'));
    // el horno de ladrillo a la derecha del fondo
    for (let y = 70; y <= 120; y++) for (let x = 176; x <= 232; x++) { const fila = Math.floor((y - 70) / 3); const j = (y - 70) % 3 === 2 || (x + (fila % 2) * 3) % 6 === 0; pset(x, y, j ? hex('#4a2418') : hex('#8a4632')); }
    for (let y = 92; y <= 112; y++) for (let x = 188; x <= 220; x++) { const e = ((x - 204) / 16) ** 2 + ((y - 112) / 20) ** 2; if (e < 1) pset(x, y, e > 0.8 ? hex('#3a1a10') : hex('#2a120a')); }
    rect(184, 112, 224, 114, hex('#5a3a2a')); rect(184, 112, 224, 112, hex('#8a6a4a'));
    // la pala del horno apoyada
    R.linea(170, 86, 186, 132, A.madL); R.linea(171, 86, 187, 132, A.madS); rect(166, 80, 174, 86, A.madL);
    // estantes con pan
    for (const ys of [72, 92, 112]) { rect(x0 + 4, ys, 160, ys + 1, A.madL); rect(x0 + 4, ys + 2, 160, ys + 2, A.madD); for (let x = x0 + 8; x < 156; x += 7 + Math.round(h(x, ys, 505) * 3)) {
      if (h(x, ys, 506) < 0.5) { disco(x + 2, ys - 3, 3.2, A.pan); rect(x, ys - 5, x + 3, ys - 5, A.panL); pset(x + 1, ys - 3, A.panL); pset(x + 4, ys - 2, A.panS); R.linea(x, ys - 3, x + 3, ys - 4, A.panS); }
      else { rect(x - 1, ys - 3, x + 6, ys - 1, A.pan); rect(x, ys - 4, x + 5, ys - 4, A.panL); for (let k = 0; k < 3; k++) pset(x + 1 + k * 2, ys - 3, A.panS); rect(x - 1, ys - 1, x + 6, ys - 1, A.panS); } } }
    // la viga de dentro con velas y ramilletes de hierbas colgados
    rect(x0, 56, x1, 58, A.vig); rect(x0, 56, x1, 56, A.vigL);
    for (let x = x0 + 8; x < 170; x += 12) { if ((x / 12) % 2 < 1) { for (let k = 0; k < 3; k++) { rect(x + k * 2, 59, x + k * 2, 64 + k, A.cera); pset(x + k * 2, 59, A.k); } } else { R.linea(x + 2, 59, x + 2, 62, hex('#7a6a40')); disco(x + 2, 65, 2.4, hex('#6a7a3a')); pset(x + 1, 64, hex('#8a9a4a')); pset(x + 3, 67, hex('#4a5a2a')); } }
    // sacos de harina y cestos en el suelo de dentro
    for (const sx of [56, 72]) { disco(sx, 128, 7, hex('#d8ccb0')); rect(sx - 6, 128, sx + 6, 137, hex('#d8ccb0')); rect(sx - 2, 121, sx + 2, 122, hex('#a8987a')); rect(sx + 3, 124, sx + 6, 137, hex('#b4a888')); for (let y = 126; y < 137; y += 3) pset(sx - 4, y, hex('#f0e8d4')); }
    for (const [bx, by] of [[96, 130], [140, 132]]) { for (let y = by - 6; y <= by + 4; y++) for (let x = bx - 8; x <= bx + 8; x++) pset(x, y, (x + y) % 3 === 0 ? hex('#7a5a30') : hex('#a8803e')); rect(bx - 9, by - 7, bx + 9, by - 7, hex('#c8a060')); for (let k = -6; k <= 6; k += 4) { disco(bx + k, by - 8, 2, A.pan); pset(bx + k - 1, by - 9, A.panL); } }
    // la balanza colgada
    R.linea(120, 59, 120, 70, A.hierro); rect(112, 70, 128, 70, A.hierroL); for (const sx of [113, 127]) { R.linea(sx, 70, sx - 3, 78, A.hierro); R.linea(sx, 70, sx + 3, 78, A.hierro); rect(sx - 4, 78, sx + 4, 79, A.oroS); }
    // el marco del hueco y el toldo de tablas
    rect(x0 - 2, y0 - 2, x1 + 2, y0 - 1, A.vigS); rect(x0 - 2, y0, x0 - 1, y1, A.vigS); rect(x1 + 1, y0, x1 + 2, y1, A.vigS);
    for (let y = 38; y <= 52; y++) { const e = Math.round((52 - y) * 0.4); for (let x = x0 - 6 - e; x <= x1 + 6 + e; x++) pset(x, y, (x - x0 + 300) % 9 === 0 ? A.madS : y === 38 ? A.ni : y === 39 ? A.niS : y > 50 ? A.madD : A.mad); }
    for (let x = x0 - 12; x <= x1 + 12; x++) if (h(x, 2, 507) < 0.4) pset(x, 37, A.niL);
    // la puerta de la casa de al lado, a la derecha, y su ventana
    a_puerta(R, 258, 66, 284, 159);
    a_emplomado(R, 290, 70, 308, 98);
    a_emplomado(R, 10, 66, 30, 98);
    // la calle
    a_adoquines(R, 160, 179, 509, [[260, 172, 18, 3]], { nieveBorde: true });
    for (let x = 0; x < 320; x++) { const a = Math.round(a_vn(x / 5, 7, 511) * 5); for (let y = 160; y < 160 + a; y++) pset(x, y, y === 160 ? A.niL : A.ni); }
    return {};
  });
  // el horno brilla y parpadea
  { const f = 0.55 + 0.45 * Math.sin(t * 7) * Math.sin(t * 3.1 + 1); for (let y = 98; y <= 112; y++) for (let x = 192; x <= 216; x++) { const e = ((x - 204) / 12) ** 2 + ((y - 112) / 14) ** 2; if (e < 1 && h(x, y, Math.floor(t * 8)) < 0.6 + f * 0.3) R.pset(x, y, e < 0.35 ? A.llamaL : e < 0.7 ? A.llama : A.llamaS); } }
  // las velas de la viga se mecen apenas; motas de harina en la luz
  for (let k = 0; k < 14; k++) { const x = 60 + ((h(k, 1, 520) * 160 + t * (2 + k % 3)) % 160), y = 60 + ((h(k, 2, 520) * 70 + Math.sin(t + k) * 6) % 70); if ((Math.floor(t * 3) + k) % 4) R.pset(Math.round(x), Math.round(y), hex('#a89070')); }
  a_letrero(R, 12, 44, t, 'pan', 0, 1);
  if (fiesta) a_corona(R, 271, 80, t);
  a_nieve(R, t, Math.round(60 * (o.nieve ?? 0.35)), { y1: 52 });
  return { suelo: 174, sueloDentro: 152, mostrador: [40, 142, 244], horno: [204, 104], hueco: [46, 54, 238, 141], puerta: [258, 66, 284, 159] };
}

// el mostrador de la panadería: la contraventana bajada con sus escuadras, hogazas, un cesto y un paño
function a_mostrador(R, t, o) {
  const { rect, pset, disco, linea } = R, x0 = 40, x1 = 244, y = 142;
  for (let yy = y; yy <= y + 10; yy++) for (let x = x0; x <= x1; x++) pset(x, yy, yy === y ? A.madL : yy === y + 10 ? A.madD : (x - x0) % 18 === 0 ? A.madS : h(x >> 2, yy, 530) < 0.12 ? A.madS : A.mad);
  rect(x0, y + 1, x1, y + 1, a_mez(A.madL, A.mad, 0.5));
  for (const x of [50, 140, 232]) { linea(x, y + 11, x - 6, y + 18, A.hierro); rect(x - 1, y + 11, x + 1, y + 18, A.hierro); pset(x, y + 12, A.hierroL); }
  for (let x = 54; x < 200; x += 15 + Math.round(h(x, 1, 531) * 6)) { disco(x + 4, y - 3, 4.2, A.pan); rect(x + 2, y - 6, x + 5, y - 6, A.panL); pset(x + 3, y - 4, A.panL); linea(x + 1, y - 3, x + 6, y - 5, A.panS); rect(x, y - 1, x + 8, y - 1, A.panS); }
  // el cesto de panecillos y el paño
  for (let yy = y - 8; yy < y; yy++) for (let x = 204; x <= 226; x++) pset(x, yy, (x + yy) % 3 === 0 ? hex('#7a5a30') : hex('#a8803e')); rect(203, y - 9, 227, y - 9, hex('#c8a060'));
  for (let k = 0; k < 5; k++) { disco(207 + k * 4, y - 11, 2.2, A.pan); pset(206 + k * 4, y - 12, A.panL); }
  for (let yy = y + 1; yy <= y + 14; yy++) for (let x = 88; x <= 110 - Math.round((yy - y) * 0.3); x++) pset(x, yy, (x - 88) % 5 === 4 ? hex('#c8bca4') : (x - 88) % 5 === 0 ? hex('#fbf6ea') : hex('#ece4d2')); rect(88, y + 15, 106, y + 15, hex('#b8a888'));
  rect(x0 - 2, y + 22, x1 + 2, y + 22, a_mez(A.adS, A.k, 0.3));
}

// paneles de roble con pliegues tallados (linenfold): marco, pliegues verticales con luz y sombra, canto de arriba
function a_paneles(R, x0, y0, x1, y1, pw = 12, ph = 18, sem = 0) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const u = (x - x0) % pw, v = (y - y0) % ph; let c;
    if (u < 2 || v < 2) c = u === 0 || v === 0 ? A.madD : A.madS;
    else if (u === pw - 1 || v === ph - 1) c = A.madL;
    else if (v === 2 || v === ph - 2) c = A.mad;
    else { const f = (u - 2) % 3; c = f === 0 ? A.madL : f === 1 ? A.mad : A.madS; if (h(x >> 1, y >> 2, sem) < 0.1) c = a_mez(c, A.madD, 0.4); }
    B[y * 320 + x] = c;
  }
}

// una vela en su palmatoria con la llama que parpadea (y su halo tenue)
function a_vela(R, x, y, t, k = 0, alto = 6) {
  const { rect, pset } = R, f = Math.sin(t * 11 + k * 2.1) * Math.sin(t * 5.3 + k), a = Math.round(f * 0.8);
  for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const d = Math.hypot(i, j * 1.2); if (d < 4.2 && d > 1.5 && (i + j + 40) % 2 === 0) { const c = R.pget(x + i, y - alto - 2 + j); R.pset(x + i, y - alto - 2 + j, a_mez(c, A.llamaL, 0.22)); } }
  rect(x, y - alto, x + 1, y, A.cera); pset(x + 1, y - alto + 1, A.ceraS); pset(x, y - alto + 2, A.cera);
  pset(x + a, y - alto - 1, A.llama); pset(x + a, y - alto - 2, f > 0.3 ? A.llamaL : A.llama); pset(x + 1, y - alto - 1, A.llamaS); if (f > -0.4) pset(x + a, y - alto - 3, A.llama);
  rect(x - 2, y + 1, x + 3, y + 1, A.oroS); rect(x - 1, y + 1, x + 2, y + 1, A.oro);
}

// el ventanal gótico de San Esteban: la forma (true si x, y cae dentro del vidrio)
const a_VENT = { x0: 114, x1: 206, y0: 20, ya: 50, y1: 100 };

const a_enVentanal = (x, y) => { const { x0, x1, y0, ya, y1 } = a_VENT, cx = (x0 + x1) / 2, hw = (x1 - x0) / 2; if (y < y0 || y > y1 || x < x0 || x > x1) return false; if (y >= ya) return true; const v = (ya - y) / (ya - y0); return Math.abs(x - cx) <= hw * Math.pow(1 - v * v, 0.75) - v * 4; };

// las gradas de los Comunes: suelo de cada una (de delante a atrás) y hasta dónde llegan a cada lado
const a_GRADAS = { suelo: [174, 148, 122], izq: [102, 86, 70], der: [218, 234, 250] };

// Devuelve { suelo: 174 (la grada de delante), gradas: { suelo: [174, 148, 122], izq: [hasta x 102, 86, 70], der: [desde
// x 218, 234, 250] }, centro: { suelo: 150, x: [114, 206] } (detrás de la mesa), mesa: [120, 140, 200], presidente: [160,
// 118] (el estrado), ventanal: [114, 20, 206, 100] }.
function a_parlamento(R, t, o) {
  const G = a_GRADAS;
  const F = a_fijo(R, 'parl', () => {
    const { rect, pset, linea } = R;
    // el techo de vigas y la pared de paneles
    for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 40 < 6 ? (x % 40 === 0 ? A.madS : A.mad) : y % 6 === 5 ? A.madD : h(x >> 2, y, 601) < 0.15 ? A.madS : hex('#3a2616'));
    for (let x = 0; x < 320; x += 40) { rect(x, 16, x + 5, 19, A.madS); linea(x + 6, 18, x + 12, 24, A.madS); linea(x - 1, 18, x - 7, 24, A.madS); }
    rect(0, 18, 319, 19, A.madD);
    a_paneles(R, 0, 20, 319, 179, 12, 18, 603);
    // el ventanal: el vidrio emplomado con la luz pálida de fuera, parteluces, el travesaño y la tracería
    const { x0, x1, y0, y1 } = a_VENT;
    for (let y = y0 - 3; y <= y1 + 3; y++) for (let x = x0 - 3; x <= x1 + 3; x++) { if (a_enVentanal(x, y)) continue; let cerca = false; for (const [dx, dy] of [[-3, 0], [3, 0], [0, -3], [0, 3], [-2, -2], [2, -2]]) if (a_enVentanal(x + dx, y + dy)) cerca = true; if (cerca) pset(x, y, x < (x0 + x1) / 2 ? A.catL : A.catS); }
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (!a_enVentanal(x, y)) continue; const d1 = (x + y) % 5, d2 = (x - y + 500) % 5, u = (y - y0) / (y1 - y0); let c = d1 === 0 || d2 === 0 ? hex('#6a7080') : u + (h(x >> 1, y >> 1, 605) - 0.5) * 0.3 < 0.5 ? hex('#dfe6f0') : hex('#c4d0de'); if (d1 && d2 && h(x, y, 606) < 0.04) c = hex('#f4f0d8'); pset(x, y, c); }
    for (let x = x0 + 15; x < x1 - 4; x += 15) for (let y = y0; y <= y1; y++) if (a_enVentanal(x, y) || a_enVentanal(x + 1, y)) { pset(x, y, A.catL); pset(x + 1, y, A.catS); }
    for (let x = x0; x <= x1; x++) for (const y of [64, 65]) if (a_enVentanal(x, y)) pset(x, y, y === 64 ? A.catL : A.catS);
    for (const [cx, cy, r] of [[160, 38, 9], [137, 52, 6], [183, 52, 6]]) R.anillo(cx, cy, r, A.catL);
    rect(x0 - 4, y1 + 1, x1 + 4, y1 + 3, A.catL); rect(x0 - 4, y1 + 3, x1 + 4, y1 + 3, A.catS);
    // los rayos de luz de invierno que bajan hacia el suelo
    for (let y = y1 + 4; y < 178; y++) { const u = (y - y1) / 78, a0 = 120 - u * 16, a1 = 200 + u * 16; for (let x = Math.round(a0); x <= a1; x++) { const banda = Math.floor((x - a0) / ((a1 - a0) / 5)); if (banda % 2 === 0 && (x + y) % 2 === 0) pset(x, y, a_mez(R.pget(x, y), hex('#f4ecd4'), 0.18)); } }
    // el estrado y el sillón del presidente con su dosel
    for (let k = 0; k < 3; k++) { rect(126 + k * 4, 112 + k * 3, 194 - k * 4, 114 + k * 3, k % 2 ? A.madL : A.mad); rect(126 + k * 4, 115 + k * 3, 194 - k * 4, 115 + k * 3, A.madD); }
    rect(132, 106, 188, 111, A.mad); rect(132, 106, 188, 106, A.madL);
    rect(146, 58, 174, 106, A.madS); rect(148, 62, 172, 100, A.cojinS); for (let y = 63; y < 100; y++) for (let x = 149; x < 172; x++) if ((x + y) % 4 === 0) pset(x, y, A.cojin); for (let y = 64; y < 100; y += 6) for (const x of [149, 171]) pset(x, y, A.oro);
    rect(146, 58, 174, 59, A.madL); rect(143, 92, 149, 106, A.mad); rect(171, 92, 177, 106, A.mad); rect(143, 92, 149, 92, A.madL); rect(171, 92, 177, 92, A.madL);
    rect(140, 48, 180, 56, A.cojinS); rect(140, 48, 180, 48, A.cojin); for (let x = 140; x <= 180; x += 2) { pset(x, 57, A.oro); pset(x, 58, A.oroS); }
    rect(156, 40, 164, 47, A.mad); R.disco(160, 39, 3, A.oro); pset(159, 38, A.oroL); rect(144, 44, 146, 47, A.oroS); rect(174, 44, 176, 47, A.oroS);
    // las gradas: tarima, contrahuella de paneles, el banco con su cojín verde y el poste de la esquina
    for (let i = 2; i >= 0; i--) { const sy = G.suelo[i], ny = i > 0 ? G.suelo[i - 1] : 180;
      for (const lado of [0, 1]) { const xa = lado ? G.der[i] : 0, xb = lado ? 319 : G.izq[i];
        a_paneles(R, xa, sy, xb, ny, 10, 9, 610 + i); rect(xa, sy, xb, sy + 1, A.madL);
        rect(xa, sy - 12, xb, sy - 10, A.cojin); rect(xa, sy - 12, xb, sy - 12, hex('#5a8a62')); rect(xa, sy - 9, xb, sy - 7, A.mad); rect(xa, sy - 10, xb, sy - 10, A.cojinS);
        for (let x = xa; x <= xb; x++) if ((x - xa) % 16 === 8) rect(x, sy - 9, x, sy - 1, A.madS);
        const ex = lado ? xa : xb; rect(ex - 1, sy - 14, ex + 1, ny, A.madS); rect(ex - 1, sy - 14, ex - 1, ny, A.madL); R.disco(ex + 0.5, sy - 15, 2, A.madL); } }
    // el suelo del centro: losas con la estera de juncos
    for (let y = 118; y < 180; y++) { const u = (y - 118) / 62, a0 = Math.round(112 - u * 12), a1 = Math.round(208 + u * 12);
      for (let x = a0; x <= a1; x++) { if (x <= G.izq[0] && y >= G.suelo[0] - 12) continue; if (x >= G.der[0] && y >= G.suelo[0] - 12) continue;
        const fy = Math.floor((y - 118) / (4 + u * 6)), fx = Math.floor((x - 160) / (14 + u * 10) + 50); let c = (fx + fy) % 2 ? A.losa : A.losaS; if (h(fx, fy, 615) < 0.2) c = A.losaL;
        if (Math.abs(x - 160) < 14 + u * 10) c = (x + Math.floor(y / 2)) % 3 === 0 ? hex('#8a7a4a') : (y % 3 === 0 ? hex('#b4a066') : hex('#a08c58'));
        if ((y - 118) % Math.round(4 + u * 6) === 0 && Math.abs(x - 160) >= 14 + u * 10) c = A.losaS;
        pset(x, y, c); } }
    // los candelabros de hierro colgados (cadena, aro) y las velas de pared
    for (const cx of [64, 256]) { linea(cx, 20, cx, 32, A.hierro); for (let a = 0; a < 20; a++) { const an = a / 20 * Math.PI; pset(Math.round(cx + Math.cos(an) * 14), Math.round(36 + Math.sin(an) * 3), A.hierro); } rect(cx - 14, 36, cx + 14, 36, A.hierro); linea(cx, 32, cx - 13, 36, A.hierro); linea(cx, 32, cx + 13, 36, A.hierro); }
    for (const sx of [104, 214]) { rect(sx - 1, 66, sx + 2, 72, A.hierro); rect(sx - 3, 72, sx + 4, 73, A.hierroL); }
    return {};
  });
  // nieve que cae al otro lado del ventanal
  for (let k = 0; k < 40; k++) { const x = Math.round(a_VENT.x0 + ((h(k, 1, 620) * 92 + t * 6 + Math.sin(t + k) * 2) % 92)), y = Math.round(a_VENT.y0 + ((h(k, 2, 620) * 80 + t * (8 + k % 5 * 3)) % 80)); const c = F.b[y * 320 + x]; if (a_enVentanal(x, y) && c !== hex('#6a7080') && c !== A.catL && c !== A.catS) R.pset(x, y, k % 3 ? hex('#ffffff') : hex('#eef2f8')); }
  // motas de polvo en los rayos de luz
  for (let k = 0; k < 26; k++) { const y = 104 + ((h(k, 3, 621) * 70 + t * (1.5 + k % 3)) % 70), u = (y - 100) / 78, x = 124 + u * -14 + ((h(k, 4, 621) * (80 + u * 28) + Math.sin(t * 0.7 + k) * 4) % (80 + u * 28)); if ((Math.floor(t * 2) + k) % 5) R.pset(Math.round(x), Math.round(y), hex('#fff4d8')); }
  for (const [i, cx] of [64, 256].entries()) for (let k = -2; k <= 2; k++) a_vela(R, cx + k * 6, 35, t, i * 5 + k, 4);
  for (const [i, sx] of [104, 214].entries()) a_vela(R, sx, 71, t, 20 + i, 6);
  return { suelo: 174, gradas: G, centro: { suelo: 150, x: [114, 206] }, mesa: [120, 140, 200], presidente: [160, 118], ventanal: [a_VENT.x0, a_VENT.y0, a_VENT.x1, a_VENT.y1] };
}

// lo de delante en el Parlamento: los respaldos de las gradas (o.fila) y la mesa del escribano
function a_parlamentoDelante(R, t, o) {
  const G = a_GRADAS, { rect, pset } = R, fila = o.fila;
  const filas = fila === undefined || fila === null ? [2, 1, 0] : typeof fila === 'number' ? [fila] : [];
  for (const i of filas) { const sy = G.suelo[i];
    for (const lado of [0, 1]) { const xa = lado ? G.der[i] - 2 : 0, xb = lado ? 319 : G.izq[i] + 2;
      for (let y = sy - 9; y <= Math.min(179, sy + (i === 0 ? 6 : 0)); y++) for (let x = xa; x <= xb; x++) { const u = (x - xa) % 9; let c = y === sy - 9 ? A.madL : y === sy - 8 ? A.mad : u === 0 ? A.madD : u === 1 ? A.madL : (u + Math.floor(y / 2)) % 3 === 0 ? A.madS : A.mad; pset(x, y, c); }
      rect(xa, sy - 10, xb, sy - 10, A.madD);
      const ex = lado ? xa : xb; rect(ex - 1, sy - 13, ex + 1, sy + 1, A.madS); R.disco(ex + 0.5, sy - 14, 2, A.madL); pset(ex, sy - 15, hex('#b08050')); } }
  if (fila === undefined || fila === null || fila === 'mesa') {
    const x0 = 120, x1 = 200, y = 140;
    // el tablero, el paño verde con su fleco de oro y las patas torneadas
    rect(x0 - 2, y, x1 + 2, y + 2, A.madL); rect(x0 - 2, y + 3, x1 + 2, y + 3, A.madD);
    for (let yy = y + 4; yy <= y + 16; yy++) for (let x = x0; x <= x1; x++) pset(x, yy, (x + Math.floor(yy / 2)) % 5 === 0 ? A.cojinS : (x - x0) % 20 === 10 ? A.cojinS : A.cojin);
    for (let x = x0; x <= x1; x += 2) { pset(x, y + 17, A.oro); pset(x + 1, y + 17, A.oroS); }
    for (const lx of [x0 + 3, x1 - 3]) { rect(lx - 1, y + 18, lx + 1, 172, A.madS); R.disco(lx + 0.5, y + 22, 2, A.mad); R.disco(lx + 0.5, 168, 2, A.mad); }
    // la maza de oro tumbada, libros, el tintero, el reloj de arena y las velas
    rect(126, y - 3, 168, y - 2, A.oroS); rect(126, y - 3, 168, y - 3, A.oro); for (let x = 130; x < 166; x += 6) pset(x, y - 3, A.oroL);
    R.disco(170, y - 4, 3, A.oro); pset(169, y - 6, A.oroL); rect(169, y - 9, 171, y - 7, A.oro); pset(168, y - 9, A.oroS); pset(172, y - 9, A.oroS); pset(170, y - 10, A.rojo); R.disco(125, y - 3, 1.6, A.oro);
    for (const [bx, w, c] of [[178, 10, A.rojoS], [179, 8, hex('#3a2a4a')], [177, 11, A.madS]]) { const by = y - 2 - [178, 179, 177].indexOf(bx) * 3; rect(bx, by - 2, bx + w, by, c); rect(bx, by - 2, bx + w, by - 2, a_mez(c, A.cuello, 0.3)); rect(bx + w, by - 1, bx + w, by, A.cuello); }
    rect(146, y - 2, 152, y - 1, hex('#f0e8d0')); rect(156, y - 2, 162, y - 1, hex('#e8e0c4'));
    a_reloj(R, 194, y - 1, t);
    a_vela(R, 122, y - 2, t, 31, 7); a_vela(R, 198, y - 2, t, 32, 7);
  }
}

// un reloj de arena (la arena cae y el montón crece en un ciclo de 12 s)
function a_reloj(R, x, yb, t) {
  const { rect, pset } = R, u = (t % 12) / 12;
  rect(x - 3, yb, x + 3, yb, A.madS); rect(x - 3, yb - 10, x + 3, yb - 10, A.madS); rect(x - 3, yb - 9, x - 3, yb - 1, A.madL); rect(x + 3, yb - 9, x + 3, yb - 1, A.madL);
  for (let j = 0; j < 4; j++) { const w = 2 - Math.floor(j / 2); rect(x - w, yb - 9 + j, x + w, yb - 9 + j, hex('#c8dce8')); rect(x - w, yb - 1 - j, x + w, yb - 1 - j, hex('#c8dce8')); }
  pset(x, yb - 5, hex('#c8dce8'));
  const arr = Math.round((1 - u) * 3), aba = Math.round(u * 3);
  for (let j = 0; j < arr; j++) { const w = j < 2 ? 1 : 0; rect(x - w, yb - 6 - j, x + w, yb - 6 - j, A.oro); }
  for (let j = 0; j < aba; j++) rect(x - (j < 2 ? 1 : 0), yb - 1 - j, x + (j < 2 ? 1 : 0), yb - 1 - j, A.oroS);
  if (u < 0.97) { pset(x, yb - 5, A.oro); pset(x, yb - 4 + Math.floor(t * 8) % 2, A.oro); }
}

// Devuelve { suelo: 148 (detrás de la mesa, x 60–300), sueloLibre: 172 (delante, a la izquierda de la mesa, x 2–44), mesa: y 140,
// calendario: [x0, y0, x1, y1], casillas: { navidad, pascua, pentecostes } (cada una [x0, y0, x1, y1]), libres: los doce
// [x, y], pluma: [x, y] }.
const a_CAL = { x0: 34, y0: 26, cw: 14, ch: 17, top: 40 };

const a_casilla = (col, fila) => { const x = a_CAL.x0 + 4 + col * a_CAL.cw, y = a_CAL.top + fila * (a_CAL.ch + 2); return [x, y, x + a_CAL.cw - 3, y + a_CAL.ch - 1]; };

function a_escribano(R, t, o) {
  const NAV = a_casilla(11, 3), PAS = a_casilla(3, 2), PEN = a_casilla(5, 1);
  const F = a_fijo(R, 'escr', () => {
    const { rect, pset, disco } = R;
    a_paneles(R, 0, 0, 319, 179, 14, 20, 640);
    rect(0, 0, 319, 3, A.madD); rect(0, 4, 319, 5, A.madL);
    // la ventana emplomada con la nieve de fuera y su derrame de piedra
    rect(224, 20, 270, 104, A.catS); rect(226, 22, 268, 102, A.catL); a_emplomado(R, 229, 25, 265, 98, {});
    for (let y = 104; y < 112; y++) rect(222 - (y - 104), y, 272 + (y - 104), y, y === 104 ? A.catL : A.cat);
    // el estante de legajos y libros
    for (const ys of [70, 96, 122]) { rect(276, ys, 319, ys + 2, A.madL); rect(276, ys + 3, 319, ys + 3, A.madD);
      for (let x = 278; x < 318; ) { const w = 3 + Math.floor(h(x, ys, 641) * 3), hh = 12 + Math.floor(h(x, ys, 642) * 8), c = [A.rojoS, hex('#3a2a4a'), A.madS, A.verdeS, hex('#8a6a3a'), hex('#e8dcc0')][Math.floor(h(x, ys, 643) * 6)];
        rect(x, ys - hh, x + w - 1, ys - 1, c); pset(x, ys - hh, a_mez(c, A.cuello, 0.35)); rect(x + w - 1, ys - hh, x + w - 1, ys - 1, a_mez(c, A.k, 0.3)); if (h(x, ys, 644) < 0.4) rect(x, ys - hh + 3, x + w - 2, ys - hh + 3, A.oro); x += w; } }
    // un rollo atado con cinta en el estante de abajo
    rect(280, 116, 296, 120, hex('#e8dcc0')); R.disco(280, 118, 2.2, hex('#d8c8a0')); rect(287, 116, 288, 121, A.rojo);
    // el calendario de pared: el pergamino clavado, las doce columnas con su pictograma de estación y cuatro casillas
    const { x0, y0, cw } = a_CAL, x1 = x0 + 12 * cw + 8, y1 = a_CAL.top + 4 * (a_CAL.ch + 2) + 2;
    rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, A.madD);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const borde = Math.min(x - x0, x1 - x, y - y0, y1 - y); pset(x, y, borde < 2 && h(x, y, 645) < 0.5 ? hex('#d8c49a') : h(x >> 1, y >> 1, 646) < 0.1 ? hex('#e4d4ac') : hex('#f2e6c8')); }
    for (const [px, py] of [[x0 + 2, y0 + 2], [x1 - 2, y0 + 2], [x0 + 2, y1 - 2], [x1 - 2, y1 - 2]]) { pset(px, py, A.hierroL); pset(px + 1, py + 1, A.hierro); }
    // el número del año arriba (solo cifras) y una raya de adorno
    rect(x0 + 6, y0 + 9, x1 - 6, y0 + 9, hex('#a08a60'));
    for (let c = 0; c < 12; c++) { const mx = x0 + 4 + c * cw, est = c < 2 || c === 11 ? 0 : c < 5 ? 1 : c < 8 ? 2 : 3;
      // el pictograma de la estación: copo, flor, sol y hoja
      const px = mx + 5, py = a_CAL.top - 5;
      if (est === 0) { pset(px, py - 2, A.azul); pset(px, py + 2, A.azul); pset(px - 2, py, A.azul); pset(px + 2, py, A.azul); pset(px, py, A.azul); pset(px - 1, py - 1, A.azulS); pset(px + 1, py + 1, A.azulS); pset(px + 1, py - 1, A.azulS); pset(px - 1, py + 1, A.azulS); }
      else if (est === 1) { for (const [dx, dy] of [[0, -1], [-1, 0], [1, 0], [0, 1]]) pset(px + dx, py + dy, hex('#d86a8a')); pset(px, py, A.oro); pset(px, py + 2, A.verde); }
      else if (est === 2) { disco(px + 0.5, py + 0.5, 1.8, A.oro); pset(px, py - 2, A.oroS); pset(px, py + 2, A.oroS); pset(px - 2, py, A.oroS); pset(px + 2, py, A.oroS); }
      else { pset(px, py - 1, hex('#c8702a')); pset(px - 1, py, hex('#c8702a')); pset(px + 1, py, hex('#a8501e')); pset(px, py + 1, hex('#a8501e')); pset(px, py + 2, A.madS); }
      for (let f = 0; f < 4; f++) { const [bx0, by0, bx1, by1] = a_casilla(c, f); rect(bx0, by0, bx1, by1, hex('#8a7456')); rect(bx0 + 1, by0 + 1, bx1 - 1, by1 - 1, hex('#f8eed4'));
        // renglones de días, insinuados con puntos
        for (let y = by0 + 3; y < by1 - 1; y += 3) for (let x = bx0 + 2; x < bx1 - 1; x += 2) if (h(x, y, 647 + c) < 0.55) pset(x, y, hex('#b4a080')); } }
    // las tres fiestas: el acebo, el huevo y la paloma (dibujados encima de sus casillas)
    for (const [bx0, by0, bx1, by1] of [NAV, PAS, PEN]) rect(bx0 + 1, by0 + 1, bx1 - 1, by1 - 1, hex('#fff6dc'));
    { const cx = (NAV[0] + NAV[2]) >> 1, cy = (NAV[1] + NAV[3]) >> 1; for (const s of [-1, 1]) { R.poligono([[cx, cy], [cx + s * 5, cy - 3], [cx + s * 4, cy - 1], [cx + s * 5, cy + 1], [cx + s * 1, cy + 1]], C.acebo); pset(cx + s * 3, cy - 1, C.aceboS); } pset(cx, cy - 1, C.rojoN); pset(cx - 1, cy, C.rojoN); pset(cx + 1, cy, C.rojoN); pset(cx, cy - 2, hex('#ff6a6a')); }
    { const cx = (PAS[0] + PAS[2]) >> 1, cy = (PAS[1] + PAS[3]) >> 1; for (let j = -4; j <= 4; j++) for (let i = -3; i <= 3; i++) { const e = (i / 3) ** 2 + (j / (j < 0 ? 4.5 : 4)) ** 2; if (e <= 1) pset(cx + i, cy + j, e > 0.7 ? hex('#c8803a') : j === 0 ? hex('#4a8ac8') : j === 2 ? hex('#d84a6a') : i < 0 && j < 0 ? hex('#ffe0b0') : hex('#f4c070')); } }
    { const cx = (PEN[0] + PEN[2]) >> 1, cy = (PEN[1] + PEN[3]) >> 1, W = hex('#f8f8fc'), S = hex('#a8b4c8'); R.rect(cx - 3, cy, cx + 2, cy + 2, W); R.rect(cx + 2, cy - 1, cx + 4, cy, W); pset(cx + 5, cy, A.oro); pset(cx + 3, cy - 1, A.k); R.linea(cx - 1, cy, cx - 4, cy - 4, S); R.linea(cx, cy, cx - 2, cy - 5, W); R.linea(cx - 3, cy + 2, cx - 5, cy + 3, S); pset(cx + 1, cy + 3, A.verde); pset(cx + 2, cy + 4, A.verde); }
    // el perchero con el sombrero alto y la capa negra del escribano
    rect(2, 30, 30, 32, A.madL); rect(2, 33, 30, 33, A.madD); for (const px of [8, 22]) { rect(px, 34, px + 1, 36, A.madS); pset(px, 34, A.madL); }
    R.poligono([[12, 36], [24, 36], [28, 90], [20, 94], [8, 92], [6, 88]], A.pur); for (let y = 40; y < 90; y++) { pset(13 + Math.round((y - 28) * 0.08), y, A.purS); pset(19 + Math.round((y - 28) * 0.1), y, A.purS); pset(23 + Math.round((y - 28) * 0.07), y, hex('#3a3842')); }
    rect(12, 35, 24, 37, A.cuello); rect(13, 38, 23, 38, hex('#c8c4b8'));
    rect(17, 20, 25, 26, A.pur); rect(14, 27, 28, 28, A.pur); rect(17, 25, 25, 25, a_mez(A.pur, A.oroS, 0.3)); pset(18, 21, hex('#3a3842'));
    // la palmatoria de pared
    rect(10, 96, 13, 104, A.hierro); rect(8, 104, 15, 105, A.hierroL);
    return { cal: [x0, y0, x1, y1] };
  });
  // la nieve detrás de la ventana
  for (let k = 0; k < 22; k++) { const x = Math.round(230 + ((h(k, 1, 650) * 35 + t * 4 + Math.sin(t + k) * 1.5) % 35)), y = Math.round(26 + ((h(k, 2, 650) * 72 + t * (7 + k % 4 * 3)) % 72)); if (F.b[y * 320 + x] !== A.plomo && F.b[y * 320 + x] !== A.vigS) R.pset(x, y, k % 3 ? hex('#ffffff') : hex('#dde6f0')); }
  a_vela(R, 11, 103, t, 41, 7);
  // o.tacha: las cruces rojas se dibujan una tras otra (Navidad, Pascua, Pentecostés); o.libres: el círculo verde de cada mes
  const tacha = Math.max(0, Math.min(3, o.tacha ?? 0));
  [NAV, PAS, PEN].forEach(([bx0, by0, bx1, by1], i) => { const u = a_lim(tacha - i); if (u <= 0) return;
    const p1 = Math.min(1, u * 2), p2 = Math.max(0, u * 2 - 1);
    R.linea(bx0 + 1, by0 + 1, bx0 + 1 + (bx1 - bx0 - 2) * p1, by0 + 1 + (by1 - by0 - 2) * p1, C.rojoN); R.linea(bx0 + 2, by0 + 1, bx0 + 2 + (bx1 - bx0 - 2) * p1, by0 + 1 + (by1 - by0 - 2) * p1, C.rojoN);
    if (p2 > 0) { R.linea(bx1 - 1, by0 + 1, bx1 - 1 - (bx1 - bx0 - 2) * p2, by0 + 1 + (by1 - by0 - 2) * p2, C.rojoN); R.linea(bx1 - 2, by0 + 1, bx1 - 2 - (bx1 - bx0 - 2) * p2, by0 + 1 + (by1 - by0 - 2) * p2, C.rojoNS); } });
  const libres = [];
  for (let c = 0; c < 12; c++) { const [bx0, by0, bx1] = a_casilla(c, c === 3 ? 0 : 1), cx = (bx0 + bx1) >> 1, cy = by0 + 8; libres.push([cx, cy]);
    const u = a_lim((o.libres ?? 0) * 12 - c); if (u > 0) { const n = Math.round(u * 16); for (let a = 0; a < n; a++) { const an = a / 16 * Math.PI * 2 - Math.PI / 2; R.pset(Math.round(cx + Math.cos(an) * 4), Math.round(cy + Math.sin(an) * 4.5), hex('#2a8a3a')); } if (u >= 1) R.pset(cx, cy, hex('#2a8a3a')); } }
  return { suelo: 148, sueloLibre: 172, mesa: 140, calendario: F.info.cal, casillas: { navidad: NAV, pascua: PAS, pentecostes: PEN }, libres, pluma: [118, 126], ventana: [229, 25, 265, 98] };
}

// la mesa del escribano: tablero con su canto, frente de paneles, la pluma en el tintero, papeles, el libro abierto, la
// salvadera, el lacre, el reloj de arena y la vela
function a_escribanoMesa(R, t, o) {
  const { rect, pset, linea, disco } = R, y = 140;
  for (let yy = y; yy <= 179; yy++) for (let x = 56; x <= 304; x++) { let c; if (yy < y + 3) c = yy === y ? A.madL : A.mad; else if (yy === y + 3) c = A.madD; else { const u = (x - 56) % 36, v = yy - y - 4; c = u < 2 || v % 18 < 1 ? A.madS : u === 2 ? A.madL : (u + Math.floor(yy / 2)) % 4 === 0 ? A.madS : A.mad; if (u > 5 && u < 31 && (v % 18 === 3 || v % 18 === 15)) c = A.madD; } pset(x, yy, c); }
  // el libro grande abierto con renglones
  for (const [bx0, bx1] of [[60, 84], [86, 110]]) { rect(bx0, y - 3, bx1, y - 1, hex('#f2e8cc')); rect(bx0, y - 1, bx1, y - 1, hex('#c8b890')); for (let x = bx0 + 2; x < bx1 - 1; x += 2) pset(x, y - 2, hex('#8a7a60')); }
  rect(84, y - 4, 86, y - 1, hex('#d8c8a0')); rect(58, y - 1, 112, y, A.rojoS);
  // papeles sueltos
  rect(130, y - 2, 150, y - 1, hex('#f0e6c8')); rect(132, y - 3, 152, y - 3, hex('#e6dab8')); for (let x = 134; x < 150; x += 3) pset(x, y - 2, hex('#7a6a58'));
  // el tintero y la pluma que se mece
  rect(114, y - 5, 121, y - 1, A.k); rect(115, y - 6, 120, y - 6, A.hierroL); pset(115, y - 4, hex('#5a5a6a'));
  const a = Math.sin(t * 0.9) * 0.08, px = 118 + Math.round(Math.sin(-0.5 + a) * 18), py = y - 6 - Math.round(Math.cos(-0.5 + a) * 18);
  linea(118, y - 6, px, py, hex('#e8e4dc')); linea(119, y - 7, px + 1, py, hex('#c8c4bc')); linea(117, y - 9, px - 1, py + 3, hex('#f8f6f0')); pset(px, py - 1, hex('#ffffff'));
  // la salvadera, el lacre y el sello
  rect(160, y - 6, 165, y - 1, A.hierroL); rect(160, y - 6, 165, y - 6, A.hierro); for (const x of [161, 163]) pset(x, y - 7, A.k);
  rect(172, y - 2, 182, y - 1, A.rojo); pset(172, y - 2, hex('#e06a5a'));
  a_reloj(R, 196, y - 1, t);
  rect(214, y - 3, 236, y - 1, hex('#e8dcc0')); disco(214, y - 2, 2, hex('#d8c8a0')); rect(224, y - 4, 225, y, A.rojo);
  disco(250, y - 1, 3, A.oroS); a_vela(R, 249, y - 3, t, 51, 9);
  rect(56, y - 1, 304, y - 1, a_mez(A.madL, A.mad, 0.3));
}

// tablas solapadas (tingladillo) de una fachada de madera: cada tabla con su canto de luz, su sombra y alguna veta
function a_tablas(R, x0, y0, x1, y1, [cL, c, cS], sem, alto = 3) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor((y - y0) / alto), r = (y - y0) % alto;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { let col = r === alto - 1 ? cS : r === 0 ? cL : c; if (r > 0 && r < alto - 1 && h(x >> 3, fila, sem) < 0.14) col = a_mez(c, cS, 0.4); if (r !== alto - 1 && (x + fila * 13 + sem * 5) % 41 === 0) col = cS; B[y * 320 + x] = col; } }
}

// suelo nevado: blanco tramado con sombras azuladas, roderas, pisadas y montoncitos
function a_nevado(R, y0, y1, sem, o = {}) {
  const B = R.buf, tn = o.tn ?? ((c) => c), L = tn(A.niL), N = tn(A.ni), S = tn(A.niS), D = tn(A.niD);
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    const n = a_vn(x / 18, y / 6, sem) + (h(x, y, sem) - 0.5) * 0.12; let c = n > 0.62 ? L : n < 0.35 ? S : N;
    for (const ry of o.roderas ?? []) { const d = Math.abs(y - ry - Math.sin(x / 40 + sem) * 1.2); if (d < 1) c = D; else if (d < 2) c = S; }
    if (o.pisadas && Math.abs(y - (o.pisadas[1] + (x - o.pisadas[0]) * o.pisadas[2])) < 2 && (x % 7 === 0 || x % 7 === 3)) c = S;
    B[y * 320 + x] = c;
  }
}

// una ventana de cuarterones (guillotina en 1870) con su marco blanco y alféizar con nieve; luz 0–1
function a_cuarterones(R, x0, y0, x1, y1, luz, o = {}) {
  const { rect, pset } = R, nx = o.nx ?? 3, ny = o.ny ?? 4;
  rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, o.marco ?? hex('#e8e2d4')); rect(x0 - 2, y1 + 1, x1 + 2, y1 + 2, hex('#bcb6a8'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), v = (y - y0) / (y1 - y0); let c = luz > 0.5 ? (v * 0.8 + (h(x >> 1, y >> 1, 71) - 0.5) * 0.25 > a_bay(x, y) ? A.luzV : A.luzVL) : u + v < 0.7 && h(x, y >> 1, 72) < 0.6 ? A.vidL : v > 0.5 && h(x >> 1, y >> 1, 73) < 0.4 ? A.vidS : A.vid; if (luz > 0.5 && (x - x0) < 3) c = hex('#a83a34'); pset(x, y, c); }
  for (let i = 1; i < nx; i++) { const x = Math.round(x0 + (x1 - x0) * i / nx); rect(x, y0, x, y1, o.marco ?? hex('#e8e2d4')); }
  for (let j = 1; j < ny; j++) { const y = Math.round(y0 + (y1 - y0) * j / ny); rect(x0, y, x1, y, o.marco ?? hex('#e8e2d4')); }
  rect(x0 - 4, y1 + 3, x1 + 4, y1 + 4, hex('#a8a090')); rect(x0 - 4, y1 + 2, x1 + 4, y1 + 2, A.niL);
}

// el farol de gas de 1870 en su poste (encendido, con el halo y el parpadeo)
function a_farolGas(R, x, base, t, k = 0, enc = true) {
  const { rect, pset } = R;
  rect(x, base - 30, x + 1, base, A.hierro); rect(x - 1, base - 3, x + 2, base, A.hierro); rect(x - 2, base - 31, x + 3, base - 31, A.hierro);
  rect(x - 2, base - 38, x + 3, base - 32, A.hierro); rect(x - 1, base - 37, x + 2, base - 33, enc ? A.llamaL : A.vid); rect(x - 3, base - 39, x + 4, base - 39, A.hierro); pset(x, base - 40, A.hierro); pset(x + 1, base - 40, A.hierro);
  if (enc) { const f = 0.9 + 0.1 * Math.sin(t * 13 + k); for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d > 3 && d < 9 * f && (i + j + 40) % 2 === 0) { const xx = x + i, yy = base - 35 + j; pset(xx, yy, a_mez(R.pget(xx, yy), A.llama, 0.3 * (1 - d / 9))); } } }
}

// el barco (casco de madera, dos palos con vergas y velas aferradas o hinchadas, bauprés, faroles, la bandera de la cruz
// roja y el gallardete que ondea); cabecea con t
function a_barco(R, x, yAgua, t, o = {}) {
  const { rect, pset, linea, poligono } = R, cab = Math.sin(t * 1.3) * 1.2, y = Math.round(yAgua + cab * 0.6), velas = o.velas ?? false, tn = o.tn ?? ((c) => c);
  // casco
  poligono([[x - 24, y - 9], [x + 22, y - 11], [x + 18, y], [x - 20, y]], tn(A.madS)); rect(x - 22, y - 9, x + 20, y - 8, tn(A.mad)); rect(x - 22, y - 6, x + 19, y - 6, tn(hex('#c8a040')));
  for (let k = -16; k < 16; k += 6) pset(x + k, y - 4, tn(A.k));
  rect(x + 12, y - 15, x + 20, y - 11, tn(A.mad)); rect(x + 12, y - 15, x + 20, y - 15, tn(A.madL));
  linea(x - 24, y - 9, x - 36, y - 15, tn(A.madS));
  // palos, vergas y velas
  for (const [mx, alto] of [[x - 8, 50], [x + 8, 44]]) { rect(mx, y - alto, mx, y - 9, tn(A.madS)); pset(mx, y - alto - 1, tn(A.mad));
    for (const [vy, w] of [[y - alto + 6, 9], [y - alto + 20, 12]]) { rect(mx - w, vy, mx + w, vy, tn(A.madS));
      if (velas) { const hinch = 2 + Math.round(Math.sin(t * 2) * 0.5); for (let j = 1; j <= 12; j++) { const b = Math.round(Math.sin(j / 12 * Math.PI) * hinch); rect(mx - w + 1 + b, vy + j, mx + w - 1 + b, vy + j, tn(j < 3 ? hex('#f4f0e2') : hex('#e2dccc'))); pset(mx + w - 1 + b, vy + j, tn(hex('#b8b2a2'))); } }
      else { rect(mx - w + 1, vy + 1, mx + w - 1, vy + 2, tn(hex('#e2dccc'))); rect(mx - w + 1, vy + 3, mx + w - 1, vy + 3, tn(hex('#b8b2a2'))); } } }
  linea(x - 8, y - 50, x - 36, y - 15, tn(A.k)); linea(x + 8, y - 44, x + 20, y - 12, tn(A.k)); linea(x - 8, y - 50, x + 8, y - 44, tn(A.k));
  // la bandera de popa: cruz roja sobre blanco (y en el palo, el gallardete que ondea)
  const fx = x + 21, fy = y - 24; rect(fx, fy, fx, y - 12, tn(A.k));
  for (let j = 0; j < 6; j++) for (let i = 1; i <= 9; i++) { const ond = Math.round(Math.sin(t * 5 + i * 0.7) * 0.8); pset(fx + i, fy + j + ond, tn(i === 4 || i === 5 || j === 2 || j === 3 ? A.rojo : hex('#f4f2ea'))); }
  for (let i = 1; i < 12; i++) pset(x - 8 + i, y - 50 + Math.round(Math.sin(t * 6 + i * 0.6) * 1) + (i > 8 ? 0 : 0), tn(i % 2 ? A.rojo : hex('#f4f2ea')));
  // el reflejo en el agua
  for (let k = 0; k < 6; k++) { const yy = y + 2 + k * 2, w = 18 - k * 3; for (let xx = x - w; xx <= x + w; xx += 2) if ((xx + k + Math.floor(t * 3)) % 4 < 2) pset(xx, yy, tn(A.marS)); }
  if (o.luces) { pset(x + 16, y - 13, A.llamaL); pset(x - 30, y - 13, A.llama); }
}

// el tranvía de caballos de 1870 (caja roja y crema con ventanas encendidas, plataforma, el caballo que trota)
function a_tranvia(R, x, suelo, t, dir = -1) {
  const { rect, pset } = R, x0 = Math.round(x), y = suelo, paso = Math.floor(t * 8) % 2;
  rect(x0 - 22, y - 26, x0 + 22, y - 25, hex('#5a2a22')); rect(x0 - 20, y - 24, x0 + 20, y - 8, hex('#b8402e')); rect(x0 - 20, y - 24, x0 + 20, y - 23, hex('#d86a4a'));
  rect(x0 - 20, y - 14, x0 + 20, y - 12, hex('#e8d8a8')); for (let i = -18; i < 18; i += 6) { rect(x0 + i, y - 22, x0 + i + 4, y - 15, A.luzV); pset(x0 + i, y - 22, A.luzVL); pset(x0 + i + 2, y - 18, hex('#5a3a2a')); }
  rect(x0 - 20, y - 8, x0 + 20, y - 7, hex('#3a2a22'));
  for (const wx of [x0 - 13, x0 + 13]) { R.disco(wx, y - 3, 3.4, A.k); R.disco(wx, y - 3, 1.6, A.hierroL); pset(wx + (paso ? 1 : -1), y - 3, A.k); }
  // el caballo
  const hx = x0 + dir * 32; rect(hx - 6, y - 15, hx + 6, y - 9, hex('#6a4a32')); rect(hx + dir * 6, y - 20, hx + dir * 9, y - 13, hex('#6a4a32')); rect(hx + dir * 8, y - 20, hx + dir * 11, y - 17, hex('#6a4a32')); pset(hx + dir * 8, y - 21, hex('#3a2a1e')); rect(hx + dir * 5, y - 19, hx + dir * 5, y - 15, hex('#2a1a12'));
  for (const [lx, f] of [[hx - 5, paso], [hx - 3, 1 - paso], [hx + 3, paso], [hx + 5, 1 - paso]]) rect(lx + f * dir, y - 8, lx + f * dir, y - 1, hex('#4a3222'));
  pset(hx - dir * 7, y - 14, hex('#3a2a1e')); pset(hx - dir * 8, y - 12, hex('#3a2a1e'));
  R.linea(hx - dir * 6, y - 12, x0 + dir * 20, y - 10, A.k);
}

// Devuelve { suelo: 166, horizonte: 100, casaReunion: [24, 134, 128], puerta: [x0, y0, x1, y1] (la de la casa de reunión),
// casa: [140, 206] (la de tejado largo), muelle: [200, 128], barco: [x, y], poste: [52, 166] (el poste de avisos, en
// siglo17Delante), tranvia: y 152 }.
function a_boston(R, t, o) {
  const n70 = (o.ano ?? 1659) >= 1870;
  const tn = n70 ? (c) => a_mez(c, hex('#2a2a5a'), 0.32) : (c) => c;
  const F = a_fijo(R, n70 ? 'bos70' : 'bos', (marca) => {
    const { rect, pset, linea } = R, tn = (c) => c;
    a_cielo(R, 0, 104, n70 ? [hex('#1a1c3e'), hex('#262a54'), hex('#3e3a66'), hex('#6a5274'), hex('#a8707a'), hex('#d8987a')] : [hex('#7c869c'), hex('#8e98ac'), hex('#a2aaba'), hex('#b4bac6'), hex('#c6cad2')], 5);
    marca(); const cielo = R.buf.slice();
    // a la izquierda, lejos: lomas nevadas con pinos y una granja
    for (let x = 0; x < 150; x++) { const y = 96 - Math.round(a_vn(x / 16, 4, 704) * 9); rect(x, y, x, 135, (x + Math.floor(y / 2)) % 5 ? hex('#c4ccd8') : hex('#b0bac8')); pset(x, y, hex('#e4eaf2')); if (h(x, 5, 705) < 0.3) { const ph = 4 + Math.floor(h(x, 6, 705) * 5); for (let j = 0; j < ph; j++) { const w = Math.floor(j / 2); rect(x - w, y - ph + j, x + w, y - ph + j, j % 2 ? hex('#5a6a6a') : hex('#4a5a5a')); } pset(x, y - ph, hex('#e4eaf2')); } }
    rect(4, 104, 18, 114, hex('#8a7a6e')); for (let k = 0; k < 6; k++) rect(3 + k, 98 + k, 19 - k, 98 + k, k < 3 ? hex('#e4eaf2') : hex('#c4ccd8')); rect(8, 107, 11, 110, A.luzV);
    for (let y = 114; y < 135; y++) rect(0, y, 23, y, (y % 3) ? hex('#d4dce6') : hex('#c4ccd8'));
    // la costa de enfrente con pinos y la otra orilla
    for (let x = 150; x < 320; x++) { const y = 92 - Math.round(a_vn(x / 14, 2, 701) * 10); rect(x, y, x, 100, tn(x % 3 ? A.costa : A.costaS)); pset(x, y, tn(A.ni)); if (h(x, 1, 702) < 0.25) { rect(x, y - 3, x, y, tn(A.pino)); pset(x, y - 4, tn(A.pinoL)); } }
    // el agua del puerto
    for (let y = 100; y <= 132; y++) for (let x = 150; x < 320; x++) { const r = h(x >> 3, y, 703); pset(x, y, tn(y < 103 ? A.marL : r < 0.2 ? A.marS : r > 0.85 ? A.marL : A.mar)); }
    // el muelle: tablas, pilotes, barriles y cajas
    for (let y = 124; y <= 134; y++) for (let x = 196; x < 320; x++) pset(x, y, tn(y === 124 ? A.ni : y < 127 ? A.niS : (x % 6 === 0 ? A.madS : (y === 133 ? A.madD : A.mad))));
    for (let x = 200; x < 320; x += 12) rect(x, 135, x + 1, 140, tn(A.madD));
    for (const bx of [214, 226, 300]) { rect(bx, 116, bx + 7, 124, tn(A.mad)); rect(bx, 118, bx + 7, 118, tn(A.hierro)); rect(bx, 122, bx + 7, 122, tn(A.hierro)); rect(bx, 115, bx + 7, 115, tn(A.niL)); rect(bx + 6, 116, bx + 7, 124, tn(A.madS)); }
    rect(284, 112, 296, 124, tn(A.madL)); for (let y = 114; y < 124; y += 3) rect(284, y, 296, y, tn(A.madS)); rect(284, 111, 296, 111, tn(A.niL));
    // la casa de reunión: tablas grises, dos filas de ventanas, puerta con porche, tejado a cuatro aguas nevado, campanario
    const g = [tn(A.tabL), tn(A.tab), tn(A.tabS)];
    a_tablas(R, 24, 80, 128, 134, g, 711);
    for (const wy of [86, 110]) for (const wx of [32, 52, 92, 112]) { if (n70) a_cuarterones(R, wx, wy, wx + 9, wy + 12, 1, { nx: 2, ny: 3 }); else { a_emplomado(R, wx, wy, wx + 9, wy + 12); } }
    a_puerta(R, 69, 104, 83, 133); rect(64, 100, 88, 102, tn(A.tabS)); rect(62, 98, 90, 99, tn(A.niL));
    for (let y = 52; y <= 80; y++) { const e = Math.round((y - 52) * 1.15); for (let x = 46 - e; x <= 106 + e; x++) { const lado = x < 46 ? 0 : x > 106 ? 2 : 1; let c = (y + (lado === 1 ? 0 : x)) % 5 === 0 ? A.niS : lado === 0 ? A.niL : lado === 2 ? A.niS : A.ni; if (y > 76 && h(x, y, 712) < 0.3) c = A.tabS; pset(x, y, tn(c)); } }
    rect(13, 80, 139, 81, tn(A.tabD)); for (let x = 16; x <= 136; x += 4) { const l = 1 + Math.floor(h(x, 3, 713) * 4); rect(x, 82, x, 81 + l, tn(hex('#d8eaf8'))); }
    // el campanario
    a_tablas(R, 66, 38, 86, 52, g, 714, 2); rect(70, 41, 82, 50, tn(A.k)); rect(66, 36, 86, 37, tn(A.tabD));
    for (let y = 22; y <= 35; y++) { const e = Math.round((y - 22) * 0.85); rect(76 - e, y, 76 + e, y, tn(y < 26 ? A.niL : (y % 3 ? A.ni : A.niS))); }
    rect(76, 16, 76, 21, tn(A.hierro)); rect(73, 17, 79, 17, tn(A.hierro));
    // la casa de tejado largo (saltbox): hastial asimétrico de tablas pardas, chimenea grande central
    const p = [tn(hex('#8a7462')), tn(hex('#6e5a4a')), tn(hex('#4e4036'))];
    a_chimenea(R, 158, 64, 82, 10);
    a_tablas(R, 140, 98, 206, 134, p, 721);
    for (let y = 70; y <= 120; y++) { const xa = Math.round(164 - (y - 70) * 0.85), xb = Math.round(164 + (y - 70) * 0.9); for (let x = Math.max(140, xa); x <= Math.min(206, xb); x++) { if (y > 98 && x <= 206) continue; const r = (y - 70) % 3; pset(x, y, r === 2 ? p[2] : r === 0 ? p[0] : p[1]); } pset(xa - 1, y, tn(A.niL)); pset(xb + 1, y, tn(A.ni)); pset(xa, y, tn(A.vigS)); pset(xb, y, tn(A.vigS)); }
    for (const [wx, wy] of [[148, 104], [186, 104], [160, 82]]) { if (n70) a_cuarterones(R, wx, wy, wx + 9, wy + 11, 1, { nx: 2, ny: 3 }); else a_emplomado(R, wx, wy, wx + 9, wy + 11); }
    a_puerta(R, 167, 112, 179, 133);
    // el suelo nevado con roderas (y en 1870, los raíles del tranvía)
    a_nevado(R, 135, 179, 731, { tn: n70 ? (c) => a_mez(c, hex('#4a4a8a'), 0.3) : undefined, roderas: n70 ? [] : [150, 156], pisadas: [0, 170, -0.06] });
    if (n70) for (const ry of [150, 155]) { rect(0, ry, 319, ry, tn(A.hierroL)); rect(0, ry + 1, 319, ry + 1, tn(A.k)); }
    // la cerca de troncos, matas secas que asoman, un tocón y el trineo de mano con un barril
    for (let x = 140; x < 196; x += 9) { rect(x, 136, x + 1, 146, A.madS); rect(x, 135, x + 1, 135, A.niL); }
    rect(138, 139, 198, 139, A.mad); rect(138, 143, 198, 143, A.mad); rect(138, 138, 198, 138, A.niL);
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 735) * 318), y = 146 + Math.round(h(k, 2, 735) * 32); if (x < 70 && y > 150) continue; for (let j = 0; j < 3; j++) pset(x + j - 1, y - (j === 1 ? 3 : 2), hex('#a08a5a')); pset(x, y - 1, hex('#7a6a44')); }
    for (let y = 168; y <= 176; y++) rect(292, y, 306, y, y === 168 ? A.niL : y < 170 ? A.ni : (y % 3 ? A.madL : A.mad)); R.anillo(299, 172, 2, A.madS);
    rect(250, 170, 276, 171, A.madL); rect(250, 172, 276, 172, A.madS); rect(248, 173, 278, 173, A.hierro); pset(247, 172, A.hierro); pset(279, 172, A.hierro);
    for (let y = 158; y <= 169; y++) { const b = Math.round(Math.sin((y - 158) / 11 * Math.PI) * 1.5); rect(256 - b, y, 268 + b, y, (y - 158) % 4 === 0 ? A.hierro : A.mad); rect(256 - b, y, 257 - b, y, A.madL); } rect(256, 157, 268, 157, A.niL);
    linea(250, 171, 240, 162, A.madS);
    // montones contra las casas
    for (let x = 18; x < 210; x++) { const a = Math.round(a_vn(x / 5, 9, 732) * 5); for (let y = 134 - a; y <= 135; y++) pset(x, y, tn(y === 134 - a ? A.niL : A.ni)); }
    // 1870: las guirnaldas de la casa de reunión y los faroles (estáticos; el halo se pinta en cada fotograma)
    // 1870: el anochecer azula todo menos el cielo y las luces encendidas
    if (n70) { const B = R.buf, deja = new Set([A.luzV, A.luzVL, A.llama, A.llamaL, hex('#a83a34')]), az = hex('#262a5a'); for (let i = 0; i < 57600; i++) if (B[i] !== cielo[i] && !deja.has(B[i])) B[i] = a_mez(B[i], az, 0.38); }
    if (n70) { for (let x = 24; x <= 128; x++) { const y = 84 + Math.round(Math.abs(Math.sin((x - 24) / 26 * Math.PI)) * 4); pset(x, y, C.acebo); pset(x, y + 1, C.aceboS); if (x % 13 === 11) { rect(x - 1, y + 1, x + 1, y + 2, C.rojoN); } } }
    return {};
  });
  a_nubes(R, F.m, t, n70 ? [[40, 56, 30, 1.2, 11], [200, 40, 40, 2.4, 12], [-30, 22, 60, 3.2, 13]] : [[20, 70, 30, 1.4, 11], [160, 50, 44, 2.6, 12], [-60, 24, 70, 3.8, 13], [240, 80, 24, 1.0, 14]], n70 ? [hex('#2a2a4e'), hex('#3c3a62'), hex('#6a5478')] : [hex('#8a93a6'), hex('#9ea6b6'), hex('#b8bec8')]);
  if (n70) for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 740) * 260), y = Math.round(h(k, 2, 740) * 40) + 16; if (F.m[y * 320 + x] && Math.sin(t * 2 + k) > -0.3) R.pset(x, y, hex('#e8e8ff')); }
  // las olas del puerto
  for (let k = 0; k < 40; k++) { const y = 104 + (k % 14) * 2, x = 150 + ((h(k, 3, 741) * 170 + t * (4 + k % 3 * 2)) % 170); if (y > 123 && x > 196) continue; R.rect(Math.round(x), y, Math.round(x) + 2 + (k % 3), y, tn(A.marB)); }
  // el barco: fondeado y cabeceando, o entrando con las velas hinchadas (o.barco)
  let bx = 252; const vel = o.barco != null && o.barco < 0.9;
  if (o.barco != null) bx = Math.round(360 + (252 - 360) * Math.min(1, o.barco / 0.9));
  R.recorte([150, 0, 319, 123]); a_barco(R, bx, 117, t, { velas: vel, tn, luces: n70 }); R.recorte(null);
  // gaviotas
  for (let k = 0; k < 4; k++) { const x = ((t * (11 + k * 4) + k * 90) % 400) - 40, y = 40 + k * 10 + Math.sin(t * 1.3 + k * 2) * 4; if (x > 268 && y < 50) continue; a_ave(R, x, y, t, n70 ? hex('#c8c8d8') : hex('#f4f4f8'), k + 5, hex('#5a5a66')); }
  // el humo y la campana del campanario
  a_humo(R, 162, 57, t, 2, n70 ? [hex('#4a4a66'), hex('#5a5a78'), hex('#6e6a88')] : [hex('#7a7e8c'), hex('#959aa6'), hex('#b0b4be')], 32, 1.4);
  { const a = Math.round(Math.sin(t * (n70 ? 4 : 0.8)) * (n70 ? 2 : 0.6)); R.rect(74 + a, 43, 78 + a, 47, tn(A.oroS)); R.rect(73 + a, 47, 79 + a, 47, tn(A.oro)); R.pset(76 + a, 42, tn(A.hierro)); }
  // la gente de fondo por el camino del medio: con fardos en 1659; en 1870, celebrando con faroles y un trineo
  for (let k = 0; k < (n70 ? 5 : 3); k++) { const v = 5 + k * 1.5, dir = k % 2 ? 1 : -1, x = dir > 0 ? -10 + ((t * v + k * 70) % 340) : 330 - ((t * v + k * 90) % 340), y = 142 + (k % 3);
    const ropa = n70 ? [a_ROPA.rojo, a_ROPA.verde, a_ROPA.azul, a_ROPA.pardo, a_ROPA.obrera][k] : [a_ROPA.puritano, a_ROPA.puritana, a_ROPA.pardo][k];
    a_gente(R, x, y, t, k + 10, ropa, { dir, alegre: n70 && k === 2, anda: !(n70 && k === 2), lleva: !n70 ? A.marronS : k === 0 ? A.llama : null }); }
  // 1870: faroles, coronas, el tranvía
  if (n70) {
    for (const [i, fx] of [138, 214].entries()) a_farolGas(R, fx, 140, t, i);
    a_corona(R, 76, 100, t); a_corona(R, 173, 108, t);
    const tx = o.tranvia != null ? 360 - o.tranvia * 440 : 360 - ((t * 22) % 520);
    a_tranvia(R, tx, 155, t, -1);
  }
  a_nieve(R, t, n70 ? 50 : 130, { c: n70 ? hex('#e8e8ff') : A.niL, c2: n70 ? hex('#9aa0c8') : A.ni, viento: 7 });
  return { suelo: 166, horizonte: 100, casaReunion: [24, 134, 128], puerta: [69, 104, 83, 133], casa: [140, 206], muelle: [196, 124], barco: [bx, 117], poste: [52, 166], tranvia: 155 };
}

// el poste de avisos de Boston (delante): poste de roble con su tejadillo, el tablón con el aviso de la multa (un «5»
// y una moneda) y otros papeles; o.aviso false lo quita; o.cae 0–1 (1870): el aviso se despega y cae girando
function a_postes(R, t, o) {
  const { rect, pset, linea } = R, x = 52, yb = 168, n70 = (o.ano ?? 1659) >= 1870;
  for (let y = yb - 54; y <= yb; y++) for (let xx = x - 2; xx <= x + 2; xx++) pset(xx, y, xx === x - 2 ? A.madL : xx === x + 2 ? A.madD : h(xx, y >> 2, 760) < 0.2 ? A.madS : A.mad);
  for (let k = 0; k < 5; k++) rect(x - 16 + k, yb - 58 - k, x + 16 - k, yb - 58 - k, k === 4 ? A.niL : k > 1 ? A.ni : A.madS);
  rect(x - 14, yb - 54, x + 14, yb - 32, A.madS); rect(x - 13, yb - 53, x + 13, yb - 33, A.mad); for (let y = yb - 51; y < yb - 33; y += 4) rect(x - 13, y, x + 13, y, A.madS);
  // papeles viejos clavados
  rect(x - 12, yb - 50, x - 5, yb - 42, hex('#d8ccaa')); for (let y = yb - 48; y < yb - 43; y += 2) rect(x - 11, y, x - 6, y, hex('#8a7a60'));
  rect(x + 6, yb - 46, x + 12, yb - 36, hex('#e0d4b4')); for (let y = yb - 44; y < yb - 37; y += 2) rect(x + 7, y, x + 11, y, hex('#8a7a60'));
  rect(x - 9, yb - 4, x + 9, yb, A.ni); rect(x - 7, yb - 5, x + 7, yb - 5, A.niL);
  if (o.aviso === false) return;
  const cae = n70 ? a_lim(o.cae ?? 0) : 0;
  let ax = x - 4, ay = yb - 52, ang = 0;
  if (cae > 0) { ax += Math.sin(cae * 7) * 8 + cae * 14; ay += cae * cae * 48; ang = cae * 5; }
  const dib = (i, j, c) => { const ca = Math.cos(ang), sa = Math.sin(ang); pset(Math.round(ax + 4 + (i - 4) * ca - (j - 6) * sa), Math.round(ay + 6 + (i - 4) * sa + (j - 6) * ca), c); };
  for (let j = 0; j < 13; j++) for (let i = 0; i < 9; i++) dib(i, j, j === 12 ? hex('#c8b890') : hex('#f4e8c8'));
  // el «5» grande y la moneda
  for (const [i, j] of [[2, 2], [3, 2], [4, 2], [5, 2], [2, 3], [2, 4], [3, 4], [4, 4], [5, 5], [5, 6], [2, 7], [3, 7], [4, 7]]) dib(i, j, C.rojoN);
  for (const [i, j] of [[6, 8], [7, 8], [6, 9], [7, 9]]) dib(i, j, A.oro); dib(6, 8, A.oroL);
  for (let i = 1; i < 6; i += 1) if (i % 2) dib(i, 10, hex('#7a6a58'));
  if (cae === 0) pset(ax + 4, ay, A.hierroL);
}

// Devuelve { suelo: 164, puerta: [100, 70, 132, 150], ventana: [170, 82, 224, 122], pastel: [196, 120], farol: [86, 64] }.
function a_bostonCasa(R, t, o) {
  const n70 = (o.ano ?? 1659) >= 1870;
  const F = a_fijo(R, n70 ? 'bcasa70' : 'bcasa', () => {
    const { rect, pset } = R, p = n70 ? [hex('#c8c0b0'), hex('#aaa294'), hex('#7e786c')] : [hex('#8a7462'), hex('#6e5a4a'), hex('#4e4036')];
    a_tablas(R, 0, 0, 319, 160, p, 801, 5);
    // el alero de arriba (tranquilo) y los carámbanos a la izquierda
    rect(0, 0, 319, 4, A.madD); rect(0, 5, 319, 5, A.madS); for (let x = 178; x < 268; x += 5) { const l = 2 + Math.floor(h(x, 1, 802) * 6); rect(x, 6, x, 5 + l, hex('#d8eaf8')); pset(x, 5 + l, A.niL); }
    // la ventanita del desván, el manojo de maíz y hierbas colgado y la escoba apoyada
    if (n70) a_cuarterones(R, 30, 26, 52, 46, 1, { nx: 2, ny: 2 }); else { rect(26, 22, 56, 50, A.madS); a_emplomado(R, 30, 26, 52, 46); }
    rect(150, 36, 151, 38, A.hierro); for (let k = 0; k < 4; k++) { const cx = 146 + k * 3; rect(cx, 40, cx + 1, 56 + (k % 2) * 3, [hex('#e0b040'), hex('#c8702a'), hex('#e0b040'), hex('#a8503a')][k]); for (let y = 42; y < 56; y += 2) pset(cx, y, hex('#a87a20')); } R.linea(147, 39, 154, 39, hex('#a08a60')); for (let k = 0; k < 5; k++) R.linea(146 + k * 2, 39, 143 + k * 3, 34, hex('#c8b47a'));
    R.linea(150, 110, 156, 150, A.madL); R.linea(151, 110, 157, 150, A.madS); for (let k = -3; k <= 4; k++) R.linea(156, 144, 155 + k, 158, hex('#c8a860')); rect(152, 143, 159, 145, hex('#8a6a3a'));
    // la puerta con su marco, dintel, el montante de cristal y los dos escalones de piedra
    rect(94, 64, 138, 68, A.madS); rect(92, 62, 140, 63, n70 ? A.ni : A.madL);
    rect(96, 69, 99, 151, A.madS); rect(133, 69, 136, 151, A.madS);
    a_puerta(R, 100, 70, 132, 150);
    if (n70) { for (let x = 100; x <= 132; x++) for (let y = 70; y <= 150; y++) { const c = R.pget(x, y); pset(x, y, a_mez(c, hex('#3a5a3a'), 0.55)); } for (const [y0, y1] of [[74, 106], [112, 146]]) for (const [x0, x1] of [[103, 114], [118, 129]]) { rect(x0, y0, x1, y0, hex('#5a7a5a')); rect(x0, y0, x0, y1, hex('#5a7a5a')); rect(x1, y0, x1, y1, hex('#1e3a22')); rect(x0, y1, x1, y1, hex('#1e3a22')); } R.disco(128, 112, 1.6, A.oro); }
    for (let k = 0; k < 2; k++) { rect(90 - k * 4, 151 + k * 5, 142 + k * 4, 155 + k * 5, A.adS); rect(90 - k * 4, 151 + k * 5, 142 + k * 4, 151 + k * 5, A.niL); rect(90 - k * 4, 152 + k * 5, 142 + k * 4, 152 + k * 5, A.adL); }
    // la ventana con el alféizar ancho donde se enfría el pastel
    if (n70) { a_cuarterones(R, 170, 82, 224, 120, 1, { nx: 3, ny: 2 });
      // dentro, el árbol de Navidad con velas y la estrella, y las cortinas rojas recogidas
      for (let j = 0; j < 26; j++) { const w = Math.round(j * 0.45) + (j % 6 > 3 ? 1 : 0); for (let i = -w; i <= w; i++) pset(197 + i, 90 + j, (i + j) % 5 === 0 ? hex('#2e8a4e') : j % 6 === 5 ? C.aceboS : C.acebo); }
      rect(196, 116, 198, 119, A.madS); pset(197, 88, A.oroL); pset(196, 89, A.oro); pset(198, 89, A.oro); pset(197, 89, A.oro);
      for (const [cx, cy] of [[193, 98], [201, 101], [190, 107], [204, 108], [196, 104], [187, 113], [207, 113], [199, 111]]) { pset(cx, cy, A.llamaL); pset(cx, cy + 1, A.cera); }
      for (const [cx, cy] of [[195, 95], [199, 106], [192, 110], [203, 104]]) pset(cx, cy, C.rojoN);
      rect(171, 83, 175, 119, hex('#a83a34')); rect(219, 83, 223, 119, hex('#8a2a24')); rect(176, 83, 177, 119, hex('#701e1a')); rect(217, 83, 218, 119, hex('#701e1a'));
      for (const x of [188, 206]) rect(x, 82, x, 120, hex('#e8e2d4')); rect(170, 101, 224, 101, hex('#e8e2d4'));
      for (let x = 92; x <= 140; x++) { const y = 62 + Math.round(Math.sin((x - 92) / 48 * Math.PI) * 5); pset(x, y, C.acebo); pset(x, y + 1, C.aceboS); if (x % 8 === 4) { pset(x, y + 2, C.rojoN); pset(x + 1, y + 2, C.rojoN); } } }
    else { rect(166, 78, 228, 124, A.madS); a_emplomado(R, 170, 82, 196, 120); a_emplomado(R, 198, 82, 224, 120); }
    rect(162, 123, 232, 126, A.madL); rect(162, 127, 232, 128, A.madD); rect(162, 122, 232, 122, A.niL);
    // la leña apilada bajo la ventana, con la nieve encima
    for (let j = 0; j < 4; j++) for (let i = 0; i < 9 - (j % 2); i++) { const cx = 234 + i * 8 + (j % 2) * 4, cy = 152 - j * 7; if (cx > 304) continue; R.disco(cx, cy, 3.6, A.madS); R.disco(cx, cy, 2.8, hex('#c8a070')); R.anillo(cx, cy, 1.6, hex('#a8804e')); pset(cx, cy, hex('#8a6038')); }
    for (let x = 230; x < 306; x++) { const a = 2 + Math.round(a_vn(x / 5, 3, 803) * 3); for (let y = 126 - a; y < 126; y++) pset(x, y, y === 126 - a ? A.niL : A.ni); }
    // el suelo de nieve con las pisadas hasta la puerta
    a_nevado(R, 160, 179, 805, { pisadas: [0, 176, -0.12] });
    for (let x = 0; x < 320; x++) { const a = Math.round(a_vn(x / 6, 5, 806) * 4); for (let y = 160 - a; y <= 160; y++) pset(x, y, y === 160 - a ? A.niL : A.ni); }
    // el farol de pared junto a la puerta
    rect(80, 60, 92, 61, A.hierro); rect(84, 61, 85, 64, A.hierro); rect(80, 64, 89, 66, A.hierro); rect(81, 67, 88, 78, A.hierro); rect(82, 68, 87, 77, n70 ? A.llamaL : hex('#8a96a6')); rect(80, 79, 89, 80, A.hierro);
    return {};
  });
  // el pastel humeante en el alféizar: la fuente de peltre, la costra dorada en celosía y el vapor
  { const { rect, pset } = R, x = 184, y = 121; rect(x - 1, y - 2, x + 27, y, hex('#8a8e98')); rect(x - 1, y - 2, x + 27, y - 2, hex('#c8ccd4')); rect(x, y + 1, x + 26, y + 1, hex('#5a5e68'));
    for (let j = 0; j < 7; j++) { const e = Math.round(Math.sqrt(Math.max(0, 1 - ((6 - j) / 7) ** 2)) * 12); for (let i = 13 - e; i <= 13 + e; i++) pset(x + i, y - 3 - (6 - j), (i + j) % 4 === 0 || (i - j + 40) % 4 === 0 ? A.panS : j < 2 ? A.panL : A.pan); }
    rect(x + 8, y - 9, x + 11, y - 8, A.panL); pset(x + 17, y - 5, hex('#8a2a3a')); pset(x + 10, y - 4, hex('#8a2a3a'));
    for (let k = 0; k < 5; k++) { const u = ((t * 0.45 + k / 5) % 1), sx = x + 6 + k * 4 + Math.round(Math.sin(u * 6 + k + t) * 2.5), sy = y - 11 - Math.round(u * 26); if (u < 0.92) { const c = u < 0.5 ? hex('#ffffff') : hex('#dfe4ec'); pset(sx, sy, c); pset(sx + 1, sy, c); if (u < 0.7) { pset(sx, sy - 1, c); pset(sx + 1, sy - 1, hex('#eef2f6')); } } } }
  if (n70) { a_corona(R, 116, 92, t); const f = 0.8 + 0.2 * Math.sin(t * 9); for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j); if (d > 5 && d < 10 * f && (i + j) % 2 === 0) R.pset(84 + i, 72 + j, a_mez(R.pget(84 + i, 72 + j), A.llama, 0.25)); } }
  a_nieve(R, t, n70 ? 40 : 110, { viento: 6 });
  return { suelo: 164, puerta: [100, 70, 132, 150], ventana: [170, 82, 224, 122], pastel: [197, 116], farol: [84, 72] };
}

// delante de la puerta de Boston: un tocón con nieve y una cerca baja en la esquina de abajo a la izquierda
function a_bostonCasaDelante(R, t, o) {
  const { rect, pset } = R;
  for (let x = 0; x <= 40; x += 10) { rect(x, 150, x + 3, 179, A.madS); rect(x, 150, x, 179, A.madL); rect(x, 148, x + 3, 149, A.niL); }
  rect(0, 158, 44, 160, A.mad); rect(0, 157, 44, 157, A.niL); rect(0, 170, 44, 172, A.mad); rect(0, 169, 44, 169, A.ni);
}

// sillería de piedra arenisca gris de los tenements: hiladas, juntas, piedras de tono distinto y hollín que baja
function a_silleria(R, x0, y0, x1, y1, sem, s = 1) {
  const B = R.buf, al = Math.max(3, Math.round(5 * s)), an = Math.round(14 * s);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor((y - y0) / al), r = (y - y0) % al, off = (fila % 2) * Math.floor(an / 2);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const i = Math.floor((x + off) / an), u = (x + off) % an, n = h(i, fila, sem);
      let c = r === al - 1 || u === an - 1 ? A.arenaD : r === 0 ? A.arenaL : n < 0.3 ? A.arenaS : n > 0.85 ? A.arenaL : A.arena;
      if (h(x >> 2, 3, sem) < 0.25 && (y - y0) % 40 < 18 && (x + y) % 2) c = a_mez(c, A.arenaD, 0.4);
      B[y * 320 + x] = c; } }
}

// una ventana de guillotina de tenement (marco blanco, dos hojas, cortina o luz); luz 0–1
function a_ventanaTen(R, x0, y0, x1, y1, luz, sem, s = 1) {
  const { rect, pset } = R;
  rect(x0 - 1, y0 - 2, x1 + 1, y0 - 1, A.arenaL); rect(x0 - 2, y1 + 1, x1 + 2, y1 + 2, A.arenaL); rect(x0 - 2, y1 + 2, x1 + 2, y1 + 2, A.arenaS);
  rect(x0, y0, x1, y1, hex('#e8e4dc'));
  const ym = Math.round((y0 + y1) / 2);
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) { if (y === ym) continue; let c = luz ? (h(x >> 1, y >> 1, sem) < 0.3 ? A.luzV : A.luzVL) : (x - x0 + y - y0) < (x1 - x0) * 0.7 ? hex('#8a9ab0') : hex('#4a5468'); if (!luz && h(x, y >> 2, sem) < 0.15) c = hex('#a8b8cc'); pset(x, y, c); }
  // la cortina recogida a un lado
  const cc = [hex('#a84a4a'), hex('#4a6a8a'), hex('#c8a060'), hex('#6a8a5a')][Math.floor(h(x0, y0, sem) * 4)];
  rect(x0 + 1, y0 + 1, x0 + 2, y1 - 1, cc); rect(x1 - 2, y0 + 1, x1 - 1, y1 - 1, a_mez(cc, A.k, 0.25));
  rect(x0, ym, x1, ym, hex('#e8e4dc')); if (s > 1.2) rect(Math.round((x0 + x1) / 2), y0, Math.round((x0 + x1) / 2), y1, hex('#e8e4dc'));
  for (let x = x0 - 2; x <= x1 + 2; x++) if (h(x, y1, 851) < 0.5) pset(x, y1 + 1, A.escarcha);
}

// los tenements de Glasgow: cuatro pisos de sillería con miradores, cornisa, tejado de pizarra con buhardillas y
// chimeneas de muchas ollas; abajo tiendas cerradas con persiana y la entrada (close) en arco; devuelve las ollas
function a_tenements(R, x0, x1, base, top, sem, s = 1) {
  const { rect, pset } = R, piso = Math.round(20 * s), humo = [];
  a_silleria(R, x0, top, x1, base, sem, s);
  // cornisa, tejado de pizarra y buhardillas
  rect(x0, top - 2, x1, top, A.arenaL); rect(x0, top + 1, x1, top + 1, A.arenaD);
  for (let y = top - Math.round(10 * s); y < top - 2; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y - top) % 3 === 0 ? A.pizS : (x + Math.floor(y / 3) * 3) % 7 === 0 ? A.pizS : h(x >> 2, y, sem) < 0.12 ? A.pizL : A.piz);
  for (let x = x0; x <= x1; x++) if (h(x, 4, sem) < 0.7) pset(x, top - Math.round(10 * s), A.escarcha);
  for (let x = x0 + Math.round(30 * s); x < x1 - 20 * s; x += Math.round(64 * s)) {
    const w = Math.round(8 * s), y0 = top - Math.round(16 * s); rect(x - 2, y0, x + w + 2, top - 3, A.pizS); for (let k = 0; k < 4; k++) rect(x - 3 + k, y0 - 4 + k, x + w + 3 - k, y0 - 4 + k, k === 0 ? A.escarcha : A.piz); a_ventanaTen(R, x, y0 + 2, x + w, top - 5, 0, sem, s);
    // la chimenea medianera con su fila de ollas
    const cx = x + Math.round(30 * s); rect(cx, top - Math.round(22 * s), cx + Math.round(16 * s), top - 3, A.arenaS); rect(cx, top - Math.round(22 * s), cx + 1, top - 3, A.arena); rect(cx - 1, top - Math.round(23 * s), cx + Math.round(16 * s) + 1, top - Math.round(22 * s), A.arenaL);
    for (let k = 0; k < 5; k++) { const ox = cx + 1 + Math.round(k * 3 * s), oy = top - Math.round(23 * s); rect(ox, oy - 4, ox + 1, oy - 1, hex('#a8603a')); pset(ox, oy - 4, hex('#c8804a')); if (h(k, x, sem) < 0.5) humo.push([ox, oy - 5]); }
  }
  // miradores y ventanas por pisos
  for (let f = 0; f < 3; f++) { const y0 = top + 4 + f * piso;
    rect(x0, y0 + piso - 3, x1, y0 + piso - 3, A.arenaL);
    for (let x = x0 + Math.round(8 * s), i = 0; x < x1 - 14 * s; x += Math.round(32 * s), i++) {
      if (i % 2 === 0) { // mirador: tres ventanas en chaflán con su sombra a la derecha
        rect(x - 2, y0 - 1, x + Math.round(26 * s), y0 + piso - 4, A.arenaS);
        a_ventanaTen(R, x, y0 + 1, x + Math.round(5 * s), y0 + piso - 6, h(f, i, sem) < 0.25 ? 1 : 0, sem + 1, s);
        a_ventanaTen(R, x + Math.round(8 * s), y0 + 1, x + Math.round(17 * s), y0 + piso - 6, h(f, i, sem + 2) < 0.3 ? 1 : 0, sem + 2, s);
        a_ventanaTen(R, x + Math.round(20 * s), y0 + 1, x + Math.round(25 * s), y0 + piso - 6, 0, sem + 3, s);
        rect(x + Math.round(26 * s) + 1, y0, x + Math.round(26 * s) + 2, y0 + piso - 4, A.arenaD);
      } else a_ventanaTen(R, x + 2, y0 + 1, x + Math.round(12 * s), y0 + piso - 6, h(f, i, sem + 4) < 0.25 ? 1 : 0, sem + 4, s);
    }
  }
  // la planta baja: tiendas cerradas y las entradas
  const yb = top + 4 + 3 * piso; rect(x0, yb - 2, x1, yb - 1, A.arenaD);
  for (let x = x0 + 4, i = 0; x < x1 - 20 * s; x += Math.round(46 * s), i++) {
    if (i % 3 === 1) { const w = Math.round(12 * s); for (let y = yb + 2; y <= base; y++) for (let xx = x; xx <= x + w; xx++) { const e = y - (yb + 2) < w / 2 ? Math.hypot(xx - x - w / 2, y - yb - 2 - w / 2) > w / 2 : false; if (!e) pset(xx, y, y > base - 6 ? hex('#3a3632') : hex('#1e1c20')); } pset(x + Math.round(w / 2), yb + 6, A.luzV); continue; }
    const w = Math.round(38 * s), col = [hex('#2e5a3a'), hex('#6a2a2a'), hex('#2a3a5a')][i % 3];
    rect(x, yb + 1, x + w, yb + Math.round(6 * s), col); rect(x, yb + 1, x + w, yb + 1, a_mez(col, A.cuello, 0.3)); for (let xx = x + 3; xx < x + w - 2; xx += 4) pset(xx, yb + Math.round(3 * s), hex('#d8c890'));
    for (let y = yb + Math.round(7 * s); y <= base - 2; y++) rect(x + 1, y, x + w - 1, y, (y - yb) % 2 ? hex('#7a7a80') : hex('#5e5e66'));
    rect(x, yb + Math.round(7 * s), x, base, col); rect(x + w, yb + Math.round(7 * s), x + w, base, col);
  }
  return humo;
}

// el autobús de dos pisos de los años 50, verde y crema, de media cabina (sin letras ni anuncios): ventanas con gente,
// conductor, radiador, faros, ruedas que giran, la plataforma de atrás; dir -1 va hacia la izquierda; s escala
function a_bus(R, x, suelo, t, s = 1, dir = -1) {
  const { rect, pset } = R, L = Math.round(72 * s), H = Math.round(40 * s), x0 = Math.round(x - L / 2), x1 = x0 + L, y0 = suelo - H, yv = suelo - Math.round(6 * s);
  const fx = (u) => (dir < 0 ? x0 + Math.round(u * L) : x1 - Math.round(u * L));   // u 0 = delante
  const R2 = (ua, ya, ub, yb, c) => { const a = fx(ua), b = fx(ub); rect(Math.min(a, b), ya, Math.max(a, b), yb, c); };
  R2(0.02, y0 + 2, 1, yv, A.busV); R2(0, y0 + 2, 1, y0 + 3, A.busVL);
  // piso de arriba: la franja crema y las ventanas con viajeros
  R2(0, y0, 1, y0 + 1, A.busVS); R2(0.01, y0 + Math.round(4 * s), 1, y0 + Math.round(15 * s), A.busC);
  R2(0.01, y0 + Math.round(17 * s), 1, y0 + Math.round(20 * s), A.busC); R2(0.01, y0 + Math.round(20 * s), 1, y0 + Math.round(20 * s), A.busCS);
  for (let k = 0; k < 6; k++) { const ua = 0.04 + k * 0.155; R2(ua, y0 + Math.round(6 * s), ua + 0.13, y0 + Math.round(14 * s), hex('#2a3446')); R2(ua, y0 + Math.round(6 * s), ua + 0.13, y0 + Math.round(6 * s), hex('#8aa0b8'));
    if (h(k, 1, 870) < 0.6) { const px = fx(ua + 0.06); rect(px - 1, y0 + Math.round(9 * s), px + 1, y0 + Math.round(14 * s), [A.marron, hex('#4a4e5a'), A.rojoS][k % 3]); rect(px - 1, y0 + Math.round(8 * s), px + 1, y0 + Math.round(9 * s), A.piel); } }
  for (let k = 0; k < 5; k++) { const ua = 0.2 + k * 0.155; R2(ua, y0 + Math.round(23 * s), ua + 0.13, y0 + Math.round(30 * s), hex('#2a3446')); R2(ua, y0 + Math.round(23 * s), ua + 0.13, y0 + Math.round(23 * s), hex('#8aa0b8'));
    if (h(k, 2, 870) < 0.6) { const px = fx(ua + 0.07); rect(px - 1, y0 + Math.round(26 * s), px + 1, y0 + Math.round(30 * s), [hex('#5a4a3a'), A.azulS, hex('#4a4e5a')][k % 3]); rect(px - 1, y0 + Math.round(25 * s), px + 1, y0 + Math.round(26 * s), A.piel); } }
  // el letrero de destino vacío (solo el número de la línea) y la cabina del conductor
  R2(0.03, y0 + Math.round(1 * s), 0.16, y0 + Math.round(4 * s), A.k); { const nx = fx(0.12); rect(nx, y0 + 1, nx + 1, y0 + Math.round(3 * s), hex('#f0e8b0')); }
  R2(0.02, y0 + Math.round(22 * s), 0.15, y0 + Math.round(30 * s), hex('#3a4a5e')); { const cx = fx(0.09); rect(cx - 1, y0 + Math.round(25 * s), cx + 1, y0 + Math.round(30 * s), hex('#2a3a5a')); rect(cx - 1, y0 + Math.round(24 * s), cx + 1, y0 + Math.round(25 * s), A.piel); rect(cx - 2, y0 + Math.round(23 * s), cx + 2, y0 + Math.round(23 * s), hex('#2a3a5a')); }
  // el capó y el radiador, el faro, el parachoques
  R2(-0.04, yv - Math.round(10 * s), 0.02, yv, A.busV); R2(-0.05, yv - Math.round(9 * s), -0.04, yv - 1, hex('#b8bcc4')); for (let y = yv - Math.round(9 * s); y < yv; y += 2) { const a = fx(-0.05); pset(a, y, hex('#6a6e78')); }
  { const fxa = fx(-0.03); R.disco(fxa, yv - Math.round(4 * s), 1.6 * s, hex('#fff4c0')); }
  R2(-0.06, yv, 1, yv + 1, A.k);
  // la plataforma abierta de atrás y la barra
  R2(0.9, y0 + Math.round(22 * s), 0.98, yv - 1, hex('#2a2a30')); { const bx = fx(0.94); rect(bx, y0 + Math.round(22 * s), bx, yv - 1, hex('#c8c8d0')); }
  // la franja crema de abajo y las ruedas que giran
  R2(0.15, yv - Math.round(4 * s), 1, yv - Math.round(3 * s), A.busC);
  for (const u of [0.13, 0.8]) { const wx = fx(u), wy = suelo - Math.round(3 * s), r = 4.6 * s; R.disco(wx, wy, r, A.k); R.disco(wx, wy, r * 0.5, A.hierroL); const a = t * 6 * -dir; pset(Math.round(wx + Math.cos(a) * r * 0.5), Math.round(wy + Math.sin(a) * r * 0.5), A.k); R2(u - 0.07, yv - Math.round(2 * s), u + 0.07, yv - Math.round(2 * s), A.busVS); }
  rect(x0, suelo, x1, suelo + 1, a_mez(A.asfS, A.k, 0.4));
}

// la farola de los años 50: poste de hierro, brazo y la linterna encendida con su halo
function a_farola50(R, x, base, alto, t, enc = 1) {
  const { rect, pset } = R;
  rect(x - 1, base - alto, x + 1, base, hex('#2e4a3a')); rect(x - 2, base - 6, x + 2, base, hex('#2e4a3a')); rect(x - 1, base - alto, x - 1, base, hex('#4a6a5a'));
  rect(x - 3, base - alto - 2, x + 3, base - alto - 1, hex('#2e4a3a')); rect(x - 2, base - alto - 8, x + 2, base - alto - 3, enc ? A.llamaL : hex('#b8c0c8')); rect(x - 3, base - alto - 9, x + 3, base - alto - 9, hex('#2e4a3a')); pset(x, base - alto - 10, hex('#2e4a3a'));
  if (enc) for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i, j); if (d > 3 && d < 8 && (i + j + 40) % 2 === 0) pset(x + i, base - alto - 5 + j, a_mez(R.pget(x + i, base - alto - 5 + j), A.llama, 0.28 * (1 - d / 8) * enc)); }
}

// adoquines de granito (setts) de la calzada con los raíles del tranvía y escarcha
function a_setts(R, y0, y1, sem, rail) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / 3), r = (y - y0) % 3, off = (fila % 2) * 3;
    for (let x = 0; x < 320; x++) { const u = (x + off) % 6; let c = r === 2 || u === 5 ? A.asfS : h(Math.floor((x + off) / 6), fila, sem) < 0.3 ? A.asf : A.asfL; if (r === 0 && u < 5) c = a_mez(c, A.escarcha, 0.25); if (h(x, y, sem) < 0.03) c = A.escarcha; B[y * 320 + x] = c; } }
  for (const ry of rail ?? []) for (let x = 0; x < 320; x++) { B[ry * 320 + x] = hex('#9a9aa4'); B[(ry + 1) * 320 + x] = A.k; }
}

// las losas de la acera con la escarcha, el bordillo
function a_acera(R, y0, y1, sem, s = 1) {
  const B = R.buf, al = Math.round(6 * s), an = Math.round(16 * s);
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / al), r = (y - y0) % al, off = (fila % 2) * Math.floor(an / 3);
    for (let x = 0; x < 320; x++) { const u = (x + off) % an; let c = r === al - 1 || u === an - 1 ? hex('#6a6a70') : h(Math.floor((x + off) / an), fila, sem) < 0.35 ? hex('#8a8a90') : hex('#9a9aa0'); const n = a_vn(x / 9, y / 4, sem + 1); if (n > 0.55) c = a_mez(c, A.escarcha, 0.55); B[y * 320 + x] = c; } }
  for (let x = 0; x < 320; x++) { B[y0 * 320 + x] = hex('#b8b8c0'); B[(y0 + 1) * 320 + x] = hex('#a0a0a8'); }
}

// destellos de escarcha que aparecen y se apagan (zona [x0, y0, x1, y1])
function a_destellos(R, t, x0, y0, x1, y1, n, sem) {
  for (let k = 0; k < n; k++) { const per = 1.4 + h(k, 1, sem) * 1.6, u = ((t + h(k, 2, sem) * per) % per) / per; if (u > 0.25) continue; const x = Math.round(x0 + h(k, 3, sem) * (x1 - x0)), y = Math.round(y0 + h(k, 4, sem) * (y1 - y0));
    R.pset(x, y, A.escarchaL); if (u < 0.12) { R.pset(x - 1, y, A.escarcha); R.pset(x + 1, y, A.escarcha); R.pset(x, y - 1, A.escarcha); R.pset(x, y + 1, A.escarcha); } }
}

// Devuelve { suelo: 168 (la acera de delante), calzada: [134, 150] (el autobús rueda en y 150), aceraLejos: 130 (la gente
// pequeña), horizonte: 128, bus: x del autobús, farola: [298, 172] (en siglo17Delante), entradas de las tiendas }.
function a_escocia(R, t, o) {
  const F = a_fijo(R, 'esc', (marca) => {
    const { rect, pset } = R;
    a_cielo(R, 0, 130, [hex('#5a6a8e'), hex('#7a88a8'), hex('#a8a8bc'), hex('#d0b8b8'), hex('#eac4a8'), hex('#f4d8b0')], 7);
    marca();
    // la torre de una iglesia lejos, a la derecha, en la bruma
    for (let y = 56; y < 110; y++) { const e = y < 70 ? Math.round((y - 56) * 0.3) : 4; rect(300 - e, y, 300 + e, y, y < 70 ? hex('#8a8aa2') : hex('#9a98ac')); } rect(299, 52, 301, 56, hex('#8a8aa2'));
    for (let x = 250; x < 320; x++) { const y = 96 - Math.round(a_vn(x / 8, 1, 881) * 6); rect(x, y, x, 128, hex('#a8a2b0')); }
    const humo = a_tenements(R, -10, 252, 128, 44, 883, 1);
    // el edificio bajo de la derecha (una iglesia de piedra roja con su tejado y la puerta)
    for (let y = 84; y <= 128; y++) for (let x = 252; x < 320; x++) { const fila = Math.floor((y - 84) / 4), r = (y - 84) % 4, u = (x + (fila % 2) * 5) % 10; pset(x, y, r === 3 || u === 9 ? hex('#6a3a34') : h(Math.floor((x + (fila % 2) * 5) / 10), fila, 885) < 0.3 ? hex('#8a4a40') : hex('#a05a4c')); }
    for (let k = 0; k < 8; k++) rect(250 - k, 76 + k, 320, 76 + k, k < 2 ? A.escarcha : k % 3 ? A.piz : A.pizS);
    for (const wx of [262, 284, 306]) { rect(wx, 94, wx + 8, 116, hex('#4a3a3a')); R.disco(wx + 4, 94, 4, hex('#4a3a3a')); rect(wx + 1, 95, wx + 7, 115, hex('#6a7a9a')); R.disco(wx + 4, 95, 3, hex('#6a7a9a')); rect(wx + 4, 92, wx + 4, 115, hex('#3a2a2a')); rect(wx, 112, wx + 8, 112, hex('#3a2a2a')); }
    // la acera de enfrente, la calzada de adoquines con los raíles y la acera de delante
    a_acera(R, 128, 133, 887, 0.6);
    a_setts(R, 134, 151, 889, [140, 146]);
    a_acera(R, 152, 179, 891, 1.2);
    rect(0, 152, 319, 153, hex('#c8c8d0')); rect(0, 154, 319, 154, hex('#7a7a82'));
    // la rejilla de la alcantarilla, un charco helado y una caja de botellas de leche en un portal
    rect(132, 155, 146, 159, hex('#2a2a30')); for (let x = 134; x < 146; x += 2) rect(x, 156, x, 158, hex('#5a5a64'));
    for (let y = 168; y <= 176; y++) for (let x = 228; x <= 262; x++) { const e = ((x - 245) / 17) ** 2 + ((y - 172) / 4) ** 2; if (e < 1) pset(x, y, e > 0.75 ? A.hieloS : (x + y * 2) % 9 === 0 ? A.hieloL : A.hielo); }
    rect(84, 121, 94, 127, hex('#8a5a34')); for (const bx of [85, 88, 91]) { rect(bx, 117, bx + 1, 121, hex('#f4f4f0')); pset(bx, 116, hex('#c8a040')); }
    // las farolas de la acera de enfrente
    for (const fx of [64, 196]) a_farola50(R, fx, 131, 30, 0, 1);
    return { humo };
  });
  a_nubes(R, F.m, t, [[10, 26, 50, 3.0, 21], [200, 18, 36, 2.2, 22], [120, 34, 28, 1.2, 23]], [hex('#8a86a0'), hex('#b8a8b4'), hex('#e8c8bc')]);
  for (const [k, [x, y]] of F.info.humo.entries()) a_humo(R, x, y, t, k + 30, [hex('#8a8aa0'), hex('#a8a6b8'), hex('#c8c0c8')], 26, 1.6);
  // la gente pequeña que va a trabajar por la acera de enfrente
  for (let k = 0; k < 6; k++) { const v = 7 + (k % 3) * 2, dir = k % 2 ? 1 : -1, x = dir > 0 ? -10 + ((t * v + k * 57) % 340) : 330 - ((t * v + k * 61) % 340);
    a_gente(R, x, 131, t, k + 40, [a_ROPA.obrero, a_ROPA.obrera, a_ROPA.oficinista][k % 3], { dir, escala: 0.8, lleva: k % 3 === 0 ? hex('#8a8a94') : k % 3 === 2 ? hex('#3a2a1e') : null }); }
  // un perro que trota por la acera de enfrente y un periódico (sin letras) que el viento arrastra por esta acera
  { const dx = 330 - ((t * 16) % 380), p = Math.floor(t * 8) % 2; R.rect(dx, 126, dx + 6, 128, hex('#8a5a34')); R.rect(dx - 2, 124, dx, 126, hex('#8a5a34')); R.pset(dx - 3, 125, A.k); R.pset(dx + 7, 125, hex('#8a5a34')); R.pset(dx + 1 + p, 129, hex('#5a3a20')); R.pset(dx + 5 - p, 129, hex('#5a3a20')); R.pset(dx - 1, 123, hex('#5a3a20')); }
  { const per = 11, u = (t % per) / per, px = -20 + u * 360, py = 172 - Math.abs(Math.sin(u * 18)) * 8, f = Math.floor(t * 6) % 2; if (u < 0.96) { R.rect(px, py - (f ? 3 : 1), px + 6, py, hex('#e4e0d4')); for (let x = px + 1; x < px + 6; x += 2) R.pset(Math.round(x), Math.round(py - 1), hex('#8a8a90')); R.rect(px, py, px + 6, py, hex('#b8b4a8')); } }
  // un gorrión en la cornisa y las palomas que levantan el vuelo
  for (let k = 0; k < 3; k++) { const x = ((t * (12 + k * 5) + k * 110) % 360) - 20, y = 60 + k * 8 + Math.sin(t * 2 + k) * 3; a_ave(R, x, y, t, hex('#5a5a6a'), k + 20); }
  // el autobús: pasa solo o donde diga o.bus
  const bx = o.bus != null ? 360 - a_lim(o.bus) * 460 : 380 - ((t * 34) % 560);
  a_bus(R, bx, 150, t, 1, -1);
  a_destellos(R, t, 0, 156, 319, 179, 22, 893);
  return { suelo: 168, calzada: [134, 150], aceraLejos: 131, horizonte: 128, bus: bx, farola: [298, 172] };
}

// delante en Glasgow: la farola de esta acera (a la derecha, por debajo de Atom) y un bolardo
function a_escociaDelante(R, t, o) {
  a_farola50(R, 298, 172, 104, t, 1);
  const { rect, pset } = R; rect(8, 160, 13, 174, hex('#2e2e34')); rect(8, 160, 8, 174, hex('#5a5a64')); rect(7, 158, 14, 159, hex('#2e2e34')); pset(10, 157, A.escarcha);
}

// Devuelve { suelo: 168 (la cola, delante de la marquesina, x 30–200), marquesina: [36, 64, 184, 160], banco: y 140,
// bus: x del autobús (llega por la calzada de atrás, suelo 132), poste: [214, 170] (en siglo17Delante), buzon: [270, 166] }.
function a_parada(R, t, o) {
  const F = a_fijo(R, 'parada', (marca) => {
    const { rect, pset } = R;
    a_cielo(R, 0, 40, [hex('#7a88a8'), hex('#a8a8bc'), hex('#d0b8b8')], 9);
    marca();
    const humo = a_tenements(R, -20, 340, 100, 38, 901, 0.8);
    a_acera(R, 100, 104, 903, 0.6);
    a_setts(R, 105, 133, 905, [114, 124]);
    a_acera(R, 134, 179, 907, 1.4);
    rect(0, 134, 319, 135, hex('#c8c8d0')); rect(0, 136, 319, 136, hex('#7a7a82'));
    // el buzón rojo (sin letras): cuerpo cilíndrico, tapa, boca y su sombra
    for (let y = 136; y <= 166; y++) for (let x = 264; x <= 278; x++) { const u = (x - 264) / 14; pset(x, y, y < 140 ? (u < 0.3 ? hex('#d84a3a') : u > 0.8 ? hex('#7a1a14') : hex('#b8302a')) : u < 0.25 ? hex('#d84a3a') : u > 0.8 ? hex('#7a1a14') : hex('#b8302a')); }
    rect(262, 134, 280, 136, hex('#901e18')); rect(263, 133, 279, 133, A.escarcha); rect(266, 144, 276, 145, A.k); rect(262, 164, 280, 167, hex('#2a2a2e')); rect(268, 150, 274, 154, hex('#d8c890'));
    // una farola encendida al fondo, a la izquierda
    a_farola50(R, 16, 140, 70, 0, 1);
    return { humo };
  });
  // la gente pequeña de enfrente
  for (let k = 0; k < 4; k++) { const v = 6 + k * 2, dir = k % 2 ? 1 : -1, x = dir > 0 ? -10 + ((t * v + k * 70) % 340) : 330 - ((t * v + k * 80) % 340); a_gente(R, x, 103, t, k + 50, [a_ROPA.obrero, a_ROPA.oficinista, a_ROPA.obrera][k % 3], { dir, escala: 0.8 }); }
  for (const [k, [x, y]] of F.info.humo.entries()) a_humo(R, x, y, t, k + 60, [hex('#8a8aa0'), hex('#a8a6b8'), hex('#c8c0c8')], 16, 1.6);
  // el autobús que llega por la calzada de atrás y frena junto a la parada
  const u = o.bus != null ? a_lim(o.bus) : null;
  const bx = u != null ? Math.round(420 - (420 - 120) * (1 - (1 - u) * (1 - u))) : 440 - ((t * 40) % 640);
  a_bus(R, bx, 132, t, 1.35, -1);
  // la marquesina: postes de hierro verdes, techo con escarcha, cristales con reflejo, el banco
  { const { rect, pset } = R;
    for (const [x0, x1] of [[40, 86], [90, 136], [140, 180]]) for (let y = 70; y <= 128; y++) for (let x = x0; x <= x1; x++) { const c = R.pget(x, y), ref = (x - y * 0.6 + Math.floor(t * 4)) % 40; pset(x, y, ref > 2 && ref < 6 ? a_mez(c, hex('#ffffff'), 0.45) : a_mez(c, hex('#a8c0d0'), 0.32)); }
    for (const x of [36, 86, 136, 182]) { rect(x, 64, x + 3, 166, hex('#2e4a3a')); rect(x, 64, x, 166, hex('#4a6a5a')); rect(x - 1, 164, x + 4, 166, hex('#22382c')); }
    rect(30, 58, 192, 64, hex('#3a5a48')); rect(30, 58, 192, 58, A.escarcha); rect(30, 57, 192, 57, A.escarchaL); rect(30, 64, 192, 65, hex('#1e3a2a'));
    for (let x = 32; x < 190; x += 7) { const l = 1 + Math.floor(h(x, 1, 911) * 3); rect(x, 66, x, 65 + l, A.escarcha); }
    rect(36, 128, 186, 130, hex('#2e4a3a'));
    rect(44, 138, 178, 140, hex('#8a5a34')); rect(44, 138, 178, 138, hex('#b07a4a')); rect(44, 141, 178, 141, hex('#5a3a20')); for (const x of [50, 112, 172]) rect(x, 142, x + 1, 152, hex('#2e2e34'));
    // una paloma que picotea en la acera
    const pk = Math.floor(t * 2.5) % 3 === 0 ? 1 : 0, px = 230 + Math.round(Math.sin(t * 0.4) * 10); rect(px, 160, px + 4, 163, hex('#7a7a8a')); rect(px + 4 + 0, 158 + pk, px + 5, 160 + pk, hex('#6a6a7a')); pset(px + 6, 159 + pk, hex('#d8a040')); pset(px + 5, 158 + pk, A.k); rect(px - 1, 161, px, 162, hex('#4a4a5a')); pset(px + 2, 164, hex('#c86a5a')); pset(px + 3, 164, hex('#c86a5a'));
  }
  a_destellos(R, t, 0, 140, 319, 179, 26, 913);
  return { suelo: 168, marquesina: [36, 64, 184, 160], banco: 140, bus: bx, poste: [214, 170], buzon: [270, 166] };
}

// el poste de la parada (delante): disco sin letras (aro rojo con barra), la placa del horario con renglones
function a_posteParada(R, t, o) {
  const { rect, pset, disco } = R, x = 214;
  rect(x, 62, x + 2, 170, hex('#3a3a42')); rect(x, 62, x, 170, hex('#6a6a74')); rect(x - 2, 168, x + 4, 171, hex('#2a2a30'));
  rect(x - 9, 44, x + 12, 64, hex('#2a2a30')); rect(x - 8, 45, x + 11, 63, hex('#c8a020')); rect(x - 6, 47, x + 9, 61, hex('#f4f2ea'));
  // el pictograma del autobús de dos pisos
  rect(x - 4, 49, x + 7, 58, hex('#2e6a3c')); rect(x - 3, 50, x + 6, 51, hex('#d8e4f0')); rect(x - 3, 54, x + 6, 55, hex('#d8e4f0')); rect(x - 4, 52, x + 7, 52, hex('#ece0b4')); disco(x - 2, 59, 1.4, A.k); disco(x + 5, 59, 1.4, A.k);
  rect(x - 6, 96, x + 8, 118, hex('#2a2a30')); rect(x - 5, 97, x + 7, 117, hex('#f0ece0')); for (let y = 100; y < 116; y += 2) for (let xx = x - 4; xx < x + 6; xx++) if (h(xx >> 1, y, 921) > 0.25) pset(xx, y, hex('#5a5a66'));
  rect(x - 9, 43, x + 12, 43, A.escarchaL);
}

// los colores de Roma (estuco pompeyano, mármol, bronce, pergamino, cal a la luz de la luna)
const b_P = Object.fromEntries(Object.entries({
  k: '#1c1222', blanco: '#f6f2ea',
  estuco: '#dcbf8e', estucoS: '#bc9a6a', estucoL: '#eed6a8', estucoD: '#9c7a52',
  rojoP: '#9e2c22', rojoPS: '#74201a', rojoPL: '#b8402e', negroP: '#2a1e1c', negroPL: '#3e2e28', ocreP: '#d89a3a', verdeP: '#5a7a46',
  marmol: '#e8e2d4', marmolS: '#bab2a0', marmolL: '#faf6ec', marmolV: '#cec6b4', marmolD: '#8a8272',
  trav: '#dccfb2', travS: '#b4a586', travL: '#efe4ca', travJ: '#8e8064',
  teja: '#b8603a', tejaS: '#86402a', tejaL: '#d88050',
  madera: '#83552c', maderaS: '#5e3a1e', maderaL: '#a8743c', maderaD: '#3a2214',
  bronce: '#b8863a', bronceS: '#7a5424', bronceL: '#e8c070', bronceV: '#5a8a6a',
  oro: '#f0c040', oroS: '#a87a18', oroL: '#fff0a0',
  llama: '#ff9a30', llamaL: '#ffe08a', llamaB: '#fffbe8',
  perg: '#ecdcb4', pergS: '#cdb88a', pergL: '#f8ecd0', tinta: '#2a1e1a', minio: '#b8302a',
  barro: '#c0683a', barroS: '#8a4424', barroL: '#e08a58',
  hiedra: '#2e6a32', hiedraS: '#1a4420', hiedraL: '#5a9a4a',
  calN: '#a4aed0', calNS: '#727ca4', calNL: '#ccd4ec', calND: '#4e5680', piedraN: '#6a6a84', piedraNS: '#4a4a62',
  basalto: '#3e4250', basaltoS: '#2a2c38', basaltoL: '#5e6272',
}).map(([k, v]) => [k, hex(v)]));

const b_TUNICAS = ['#b84a3a', '#d8c8a0', '#4a6a9a', '#c89a3a', '#6a8a4a', '#8a4a7a', '#e0d8c8'].map(hex);

const b_PIELES = ['#e0aa80', '#c88a5a', '#f0c098', '#a86e48'].map(hex);

// el fondo fijo de un encuadre: se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma. dibuja(foto) puede
// llamar a foto('nombre') para guardar una máscara: los píxeles que ya no cambian después de ese momento (el cielo que
// queda a la vista, la pared que se ve entre columnas…), para pintar luego detrás de lo que se dibujó encima.
const b_CACHE = new WeakMap();

function b_fijo(R, clave, dibuja) {
  let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = {}));
  if (!m[clave]) {
    const b = R.nuevo(), prev = R.usar(b), fotos = {};
    dibuja((nombre) => { fotos[nombre] = b.slice(); });
    R.usar(prev);
    const mk = {}; for (const [n, f] of Object.entries(fotos)) { const a = new Uint8Array(320 * 180); for (let i = 0; i < a.length; i++) a[i] = b[i] === f[i] ? 1 : 0; mk[n] = a; }
    m[clave] = { b, mk };
  }
  R.copiar(m[clave].b); return m[clave];
}

// un pset que solo pinta donde la máscara lo deja (detrás de lo que se pintó después de la foto)
const b_ps = (R, a) => (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180 && a[y * 320 + x]) R.pset(x, y, c); };

// trama de Bayer 4×4 (para degradados y halos sin franjas)
const b_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_umbral = (x, y) => b_BAYER[(y & 3) * 4 + (x & 3)];

// mezcla de dos colores (a = cuánto del segundo)
const b_mezcla = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// degradado vertical tramado entre varias paradas de color
function b_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, f > b_umbral(x, y) ? cols[i + 1] : cols[i]); }
}

// elipse rellena con el pset que se le dé (para nubes recortadas por la máscara)
function b_elipse(ps, cx, cy, rx, ry, c) { for (let j = Math.floor(-ry); j <= ry; j++) for (let i = Math.floor(-rx); i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1) ps(cx + i, cy + j, c); }

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba), de ancho w
function b_nube(ps, cx, cy, w, [cS, c, cL]) {
  const L = [[-0.36, 0.1, 0.2], [-0.12, -0.05, 0.26], [0.16, -0.02, 0.25], [0.4, 0.1, 0.18], [0.02, -0.18, 0.18]];
  for (const [dx, dy, f] of L) b_elipse(ps, cx + dx * w, cy + dy * w + 1.5, f * w * 1.3, f * w * 0.7, cS);
  for (const [dx, dy, f] of L) b_elipse(ps, cx + dx * w, cy + dy * w, f * w * 1.2, f * w * 0.6, c);
  for (const [dx, dy, f] of L) if (dy < 0.05) b_elipse(ps, cx + dx * w - 1, cy + dy * w - 1.5, f * w * 0.7, f * w * 0.32, cL);
}

// estrellas que titilan (las de la esquina de Atom y de la barra del año, apagadas)
function b_estrellas(ps, t, n, y1, k, [c0, c1, c2]) {
  for (let i = 0; i < n; i++) { const x = Math.floor(h(i, 1, k) * 320), y = Math.floor(h(i, 2, k) * y1), calma = (x >= 268 && y <= 50) || (x >= 14 && x <= 178 && y <= 17);
    const b = Math.sin(t * (1.3 + h(i, 3, k) * 3) + i * 1.7), c = calma ? c0 : b > 0.55 ? c2 : b > -0.3 ? c1 : c0; ps(x, y, c);
    if (!calma && i % 5 === 0 && b > 0.8) { ps(x - 1, y, c1); ps(x + 1, y, c1); ps(x, y - 1, c1); ps(x, y + 1, c1); } }
}

// una llama pequeña que tiembla (x, y: su base; s: tamaño)
function b_llama(R, x, y, t, k = 0, s = 1) {
  const f = Math.sin(t * 11 + k * 2.3) * 0.5 + Math.sin(t * 17.3 + k) * 0.5, al = Math.max(2, Math.round((3 + f) * s)), sw = Math.sin(t * 6 + k * 1.7) * 0.8 * s;
  for (let j = 0; j <= al; j++) { const w = Math.round((1 - j / (al + 1)) * 1.3 * s), xx = Math.round(x + sw * j / al); R.rect(xx - w, y - j, xx + w, y - j, b_P.llama); if (j < al * 0.7 && w > 0) R.rect(xx - w + 1, y - j, xx + w - 1, y - j, b_P.llamaL); }
  R.pset(x, y - 1, b_P.llamaB); R.pset(Math.round(x + sw), y - al - 1, f > 0.3 ? b_P.llamaL : b_P.llama);
}

// halo de luz: aclara lo que hay debajo hacia el color col, con el borde tramado
function b_halo(R, cx, cy, r, col, a = 0.35) {
  cx = Math.round(cx); cy = Math.round(cy); r = Math.round(r);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.sqrt(i * i + j * j); if (d > r) continue; const u = 1 - d / r;
    if (b_umbral(cx + i, cy + j) < u * 1.4) { const c = R.pget(cx + i, cy + j); if (c) R.pset(cx + i, cy + j, b_mezcla(c, col, a * Math.min(1, u * 1.8))); } }
}

// humo que sube en bocanadas tramadas y se deshace (deriva: hacia dónde lo lleva el aire)
function b_humo(R, x, y, t, k, alto, deriva, col = hex('#b8b0b8')) {
  for (let i = 0; i < 8; i++) { const u = (t * 0.3 + i / 8 + k * 0.13) % 1, yy = y - u * alto, xx = x + Math.sin(u * 6 + t * 0.8 + k) * 2.5 + u * deriva, r = 1.2 + u * 4.5, a = 0.5 * (1 - u);
    for (let j = -Math.ceil(r); j <= r; j++) for (let ii = -Math.ceil(r); ii <= r; ii++) { if (ii * ii + j * j > r * r) continue; const px = Math.round(xx + ii), py = Math.round(yy + j); if (b_umbral(px, py) > a + 0.15) continue; const c = R.pget(px, py); if (c) R.pset(px, py, b_mezcla(c, col, a)); } }
}

// una figura pequeña de fondo (~10 px: túnica, piernas, cabeza; o.pileo: el gorro de fieltro de las Saturnales;
// o.anda: camina; o.brazo: levanta una copa; o.ps: un pset con recorte)
function b_figura(R, x, s, t, k, o = {}) {
  const ps = o.ps ?? R.pset; x = Math.round(x); s = Math.round(s);
  const tun = o.tun ?? b_TUNICAS[k % b_TUNICAS.length], tunS = b_mezcla(tun, b_P.k, 0.35), piel = b_PIELES[k % b_PIELES.length], pelo = [hex('#3a2418'), hex('#1c1424'), hex('#8a5a2a'), hex('#c8c8c8')][k % 4];
  const paso = o.anda ? (Math.floor(t * 6 + k) & 1) : 0, d = o.dir ?? 1, osc = o.oscuro ? (c) => b_mezcla(c, hex('#1a1a3a'), o.oscuro) : (c) => c;
  ps(x - 1 + paso, s, osc(b_P.k)); ps(x + 1 - paso, s, osc(b_P.k)); ps(x - 1 + paso, s - 1, osc(piel)); ps(x + 1 - paso, s - 1, osc(piel));
  for (let j = 2; j <= 6; j++) for (let i = -1; i <= 1; i++) ps(x + i, s - j, osc(i === 1 ? tunS : tun));
  ps(x - 2, s - 2, osc(tunS)); ps(x + 2, s - 2, osc(tunS));
  ps(x + 2 * d, s - 5, osc(piel)); if (o.brazo) { ps(x + 2 * d, s - 6, osc(piel)); ps(x + 2 * d, s - 7, osc(piel)); ps(x + 3 * d, s - 8, osc(b_P.bronceL)); }
  for (let j = 7; j <= 9; j++) for (let i = -1; i <= 1; i++) ps(x + i, s - j, osc(j === 9 ? pelo : piel));
  ps(x + d, s - 8, osc(b_P.k));
  if (o.pileo) { ps(x - 1, s - 10, osc(o.pileo)); ps(x, s - 10, osc(o.pileo)); ps(x + 1, s - 10, osc(o.pileo)); ps(x, s - 11, osc(o.pileo)); }
}

// un rollo visto de canto (la espiral del papiro) de radio r
function b_rollo(R, x, y, r, k) {
  R.disco(x, y, r, b_P.pergS); R.disco(x - 0.4, y - 0.4, r - 0.8, b_P.perg); if (r >= 3) R.anillo(x, y, r - 1.6, b_P.pergS); R.pset(Math.round(x - 0.5), Math.round(y - 0.5), b_P.tinta);
  if (h(k, 1, 410) < 0.35) R.pset(Math.round(x - r + 1), Math.round(y - r + 1), b_P.pergL);
}

// la lucerna de barro con su llama (x, y: el pico)
function b_lucerna(R, x, y, t, k) {
  const { rect, pset, disco } = R; disco(x - 6, y + 1, 4, b_P.barroS); disco(x - 6, y, 3.5, b_P.barro); rect(x - 3, y - 1, x, y + 2, b_P.barro); rect(x - 3, y + 2, x, y + 2, b_P.barroS); pset(x - 7, y - 2, b_P.barroL); pset(x - 6, y - 2, b_P.barroL);
  pset(x - 6, y - 1, b_P.barroS); rect(x - 12, y - 1, x - 10, y, b_P.barroS); pset(x, y - 1, b_P.k);
  b_llama(R, x, y - 2, t, k, 1);
}

// los pictogramas de los meses (sin letras: el frío, los peces, la flor, el trigo, la uva…), 5 × 5
const b_MESES = [
  ['#.#.#', '.###.', '##.##', '.###.', '#.#.#'], ['.....', '.##.#', '#####', '.##.#', '.....'], ['.###.', '#...#', '#.#.#', '#..#.', '.##..'],
  ['.#.#.', '##.##', '.#.#.', '..#..', '..#..'], ['...##', '..###', '.###.', '###..', '#....'], ['..#..', '.###.', '#####', '.###.', '..#..'],
  ['..#..', '.#.#.', '..#..', '.#.#.', '..#..'], ['..#..', '.###.', '#.#.#', '.###.', '..#..'], ['.....', '.#..#', '#.##.', '.....', '.#..#'],
  ['..#..', '.##..', '.###.', '#####', '.###.'], ['.##..', '#....', '#....', '#....', '.##..'], ['..#..', '#####', '.###.', '.#.#.', '#...#'],
];

const b_COLMES = ['#4a6a9a', '#3a7a8a', '#8a5a3a', '#b84a6a', '#4a8a3a', '#c89a2a', '#b8902a', '#7a3a7a', '#3a5a9a', '#c8602a', '#6a6a7a', '#b8302a'].map(hex);

const b_picto = (R, f, x, y, c) => f.forEach((fila, j) => { for (let i = 0; i < fila.length; i++) if (fila[i] === '#') R.pset(x + i, y + j, c); });

// la estrella de Belén (7 × 7) y el sol con rayos, para la casilla del 25
const b_ESTRELLA = ['...#...', '...#...', '#######', '.#####.', '..###..', '.##.##.', '##...##'];

function b_solRayos(R, cx, cy, r, t, c = b_P.oro, cS = b_P.oroS) {
  const n = 8; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2 + t * 0.3, l = r * (k % 2 ? 1.7 : 2.1); R.linea(cx + Math.cos(a) * (r + 1), cy + Math.sin(a) * (r + 1), cx + Math.cos(a) * l, cy + Math.sin(a) * l, k % 2 ? cS : c); }
  R.disco(cx, cy, r + 0.5, cS); R.disco(cx - 0.3, cy - 0.3, r, c); if (r >= 3) R.disco(cx - r * 0.35, cy - r * 0.35, r * 0.35, b_P.oroL);
}

const b_enVentanal = (x, y) => x >= 22 && x <= 84 && y <= 98 && (y >= 64 || (x - 53) ** 2 + (y - 64) ** 2 <= 961);

function b_scriptorium(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = b_P;
  const F = b_fijo(R, 'roma:scriptorium', (foto) => {
    // Roma por el ventanal, a media tarde
    b_degradado(R, 22, 33, 84, 98, [hex('#4a86cc'), hex('#6aa0d8'), hex('#9cc4e4'), hex('#e6d6b0')]);
    foto('cielo');
    for (let x = 22; x <= 84; x++) { const hy = Math.round(79 + Math.sin(x * 0.09) * 3 + Math.sin(x * 0.27 + 1) * 1.4); rect(x, hy, x, 98, hex('#98a4c0')); if (h(x, 3, 401) < 0.2) { disco(x, hy - 2, 2, hex('#7a88a6')); pset(x, hy - 1, hex('#7a88a6')); } }
    for (let y = 67; y <= 88; y++) for (let x = 27; x <= 52; x++) { const top = 67 + Math.round(((x - 39.5) / 12.5) ** 2 * 3); if (y < top) continue; const piso = (y - 67) % 6, arco = (x % 3 === 0) && piso >= 2 && piso <= 4;   // el anfiteatro
      pset(x, y, x === 27 || x === 52 ? hex('#a8906a') : y === top ? hex('#f0dcb4') : arco ? hex('#6e5640') : piso === 0 ? hex('#ecd4a8') : x > 46 ? hex('#c0a27a') : hex('#dcc094')); }
    { const cx = 69; for (let j = 0; j <= 9; j++) { const w = Math.round(Math.sqrt(1 - (j / 10) ** 2) * 11); rect(cx - w, 80 - j, cx + w, 80 - j, j > 7 ? hex('#a89c88') : hex('#c8baa2')); rect(cx + Math.round(w * 0.4), 80 - j, cx + w, 80 - j, hex('#a4967e')); }   // la cúpula
      pset(cx, 70, hex('#5a4a3a')); rect(cx - 13, 80, cx + 13, 88, hex('#d8c8ac')); for (let x = cx - 12; x <= cx + 12; x += 3) rect(x, 82, x, 87, hex('#9a8a70')); poligono([[cx - 14, 81], [cx, 76], [cx + 14, 81]], hex('#ece0c8')); }
    rect(58, 62, 59, 84, hex('#d8cab0')); rect(57, 61, 60, 62, hex('#a89a80')); pset(58, 60, hex('#8a6a4a'));   // la columna
    for (const [cx, y0] of [[24, 74], [55, 78], [83, 72], [44, 82]]) for (let y = y0; y <= 90; y++) { const w = Math.round(Math.min(2, (y - y0) / 4)); rect(cx - w, y, cx + w, y, hex('#2e4a2e')); if (w > 0) pset(cx - w, y, hex('#3e6a3a')); }   // cipreses
    for (let y = 86; y <= 98; y++) for (let x = 22; x <= 84; x++) { const fila = Math.floor((y - 86) / 4), u = (x + fila * 9) % 22, tejado = (y - 86) % 4 < 2;   // tejados y fachadas
      pset(x, y, tejado ? (u === 0 ? P.tejaS : (x & 1) ? P.teja : P.tejaL) : u === 7 || u === 15 ? hex('#5a3a2a') : hex(u > 11 ? '#d8b888' : '#e8c89a')); }
    // el techo de vigas
    for (let y = 0; y <= 10; y++) for (let x = 0; x < 320; x++) { const v = x % 40; pset(x, y, y === 10 ? P.k : v < 7 ? (v === 0 ? P.maderaD : P.maderaS) : (y & 3) === 0 && h(x >> 3, y, 402) < 0.3 ? hex('#4a2c18') : P.maderaD); }
    // la pared pompeyana (sin el hueco del ventanal): cornisa, zona alta de estuco, paneles rojos y zócalo de mármol fingido
    for (let y = 11; y <= 117; y++) for (let x = 0; x < 320; x++) { if (b_enVentanal(x, y)) continue; let c;
      if (y <= 16) c = [P.estucoL, P.estuco, (x & 3) < 2 ? P.estucoL : P.estucoD, P.estucoS, P.estucoL, P.estucoD][y - 11];
      else if (y <= 40) c = y === 40 ? P.ocreP : y === 39 ? P.estucoS : P.estucoL;
      else if (y <= 92) { const v = x % 64; c = v < 7 ? (v === 3 && y % 6 < 4 ? P.ocreP : P.negroP) : ((v === 12 || v === 58) && y >= 46 && y <= 87) || ((y === 46 || y === 87) && v >= 12 && v <= 58) ? P.ocreP : P.rojoP; }
      else if (y === 93) c = P.ocreP;
      else if (y >= 116) c = y === 116 ? P.estucoS : P.estucoD;
      else { const v = x % 44; c = v >= 5 && v <= 39 && y >= 97 && y <= 112 ? (Math.abs(Math.sin(x * 0.11 + y * 0.31 + Math.sin(y * 0.2) * 2)) < 0.12 ? hex('#8a5a2a') : (h(x >> 1, y >> 1, 403) < 0.5 ? hex('#c89a5a') : hex('#d4a868'))) : P.negroP; if (v === 5 || v === 39 || ((y === 97 || y === 112) && v >= 5 && v <= 39)) c = P.ocreP; }
      const n = h(x >> 2, y >> 2, 404); if (y > 16 && n < 0.22 && b_umbral(x, y) < 0.45) c = b_mezcla(c, P.k, 0.12); else if (y > 16 && n > 0.86 && b_umbral(x, y) < 0.3) c = b_mezcla(c, P.blanco, 0.1);
      pset(x, y, c); }
    for (const [x, y, n] of [[230, 42, 9], [12, 60, 7], [300, 96, 8]]) { let xx = x, yy = y; for (let i = 0; i < n * 2; i++) { pset(xx, yy, b_mezcla(R.pget(xx, yy), P.k, 0.35)); yy++; if (h(i, x, 405) < 0.4) xx += h(i, y, 406) < 0.5 ? -1 : 1; } }   // grietas
    for (let y = 18; y <= 38; y += 1) for (let x = 0; x < 268; x++) { const g = 26 + Math.sin(x * 0.2) * 4; if (Math.abs(y - g) < 1.2 && (x % 40) > 4) pset(x, y, b_mezcla(P.estucoL, P.verdeP, 0.45)); if (Math.abs(y - g) < 0.5 && x % 10 === 0) pset(x, y + 2, b_mezcla(P.estucoL, P.rojoP, 0.5)); }   // la guirnalda pintada (no llega a la esquina de Atom)
    // el marco del ventanal, el parteluz y los postigos abiertos
    for (let y = 30; y <= 99; y++) for (let x = 18; x <= 88; x++) { if (!b_enVentanal(x, y)) { if (b_enVentanal(x + 3, y) || b_enVentanal(x - 3, y) || b_enVentanal(x, y + 3)) pset(x, y, (x + y) % 5 === 0 ? P.estucoS : P.estucoL); continue; }
      if (!b_enVentanal(x - 2, y) || !b_enVentanal(x + 2, y) || !b_enVentanal(x, y - 2)) pset(x, y, !b_enVentanal(x - 1, y) || !b_enVentanal(x, y - 1) || !b_enVentanal(x + 1, y) ? P.maderaD : P.madera); }
    for (const x of [42, 63]) { rect(x, 34, x + 1, 98, P.madera); rect(x + 1, 34, x + 1, 98, P.maderaS); } rect(22, 64, 84, 65, P.madera); rect(22, 65, 84, 65, P.maderaS);
    for (const [x0, x1, d] of [[6, 17, -1], [89, 100, 1]]) { for (let y = 40; y <= 100; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) % 4; pset(x, y, x === x0 || x === x1 || y === 40 || y === 100 ? P.maderaD : u === 0 ? P.maderaS : (h(x, y >> 2, 407) < 0.12 ? P.maderaS : P.madera)); }
      rect(x0 + 2, 52, x1 - 2, 53, P.maderaD); rect(x0 + 2, 86, x1 - 2, 87, P.maderaD); pset(d < 0 ? x1 - 1 : x0 + 1, 70, P.bronceL); }
    rect(14, 98, 92, 101, P.marmolS); rect(14, 98, 92, 98, P.marmolL); rect(14, 99, 92, 99, P.marmol); rect(16, 102, 90, 103, b_mezcla(P.negroP, P.k, 0.4));   // el alféizar
    rect(26, 92, 33, 97, P.barroS); rect(27, 92, 32, 96, P.barro); rect(27, 92, 32, 92, P.barroL); for (const [dx, dy] of [[0, -3], [-2, -2], [2, -2], [1, -5], [-1, -4], [3, -4]]) pset(29 + dx, 91 + dy, dy < -3 ? P.hiedraL : P.hiedra);   // la maceta de albahaca
    // el armario de los rollos
    b_sombraR(R, 106, 30, 204, 116, 0.75);
    rect(100, 26, 200, 31, P.k); rect(101, 26, 199, 30, P.madera); rect(101, 26, 199, 26, P.maderaL); rect(101, 30, 199, 30, P.maderaS);
    rect(104, 31, 196, 115, P.k); rect(105, 31, 195, 114, P.maderaS);
    for (let c = 0; c < 4; c++) for (let f = 0; f < 3; f++) { const x0 = 108 + c * 22, y0 = 34 + f * 20, x1 = x0 + 19, y1 = y0 + 17;
      rect(x0, y0, x1, y1, P.maderaD); rect(x0, y0, x1, y0 + 1, P.k); rect(x0, y1 + 1, x1, y1 + 1, P.maderaL);
      const n = 3 + Math.floor(h(c, f, 408) * 3), pos = [[4, 13], [10, 13], [16, 13], [7, 8], [13, 8], [10, 3]];
      for (let i = 0; i < n; i++) { const [dx, dy] = pos[i]; b_rollo(R, x0 + dx, y0 + dy, 3, c * 7 + f * 3 + i); if (h(c * 7 + f, i, 409) < 0.3 && dy === 13) { rect(x0 + dx, y0 + dy + 3, x0 + dx + 1, y0 + dy + 5, [P.minio, P.ocreP, P.verdeP][i % 3]); } } }
    rect(108, 95, 193, 111, P.maderaD); rect(108, 111, 193, 112, P.maderaL);
    for (let x = 109, i = 0; x < 186; i++) { const w = 4 + Math.floor(h(i, 1, 411) * 3), al = 11 + Math.floor(h(i, 2, 411) * 5), col = [hex('#8a2a22'), hex('#5a3a22'), hex('#6a2a5a'), hex('#7a5a2a'), hex('#3a4a2a')][i % 5];   // códices
      if (i === 6) { rect(x, 108, x + 13, 110, P.k); rect(x, 108, x + 13, 109, col); rect(x + 1, 108, x + 12, 108, P.pergL); x += 15; continue; }
      rect(x, 111 - al, x + w - 1, 110, P.k); rect(x + 1, 112 - al, x + w - 2, 110, col); rect(x + 1, 113 - al, x + w - 2, 113 - al, P.oro); rect(x + 1, 107, x + w - 2, 107, P.oro); pset(x + 1, 114 - al, b_mezcla(col, P.blanco, 0.3)); x += w + (h(i, 3, 411) < 0.3 ? 2 : 0); }
    poligono([[94, 34], [104, 31], [104, 115], [94, 112]], P.k); poligono([[95, 35], [103, 32], [103, 114], [95, 111]], P.madera); linea(97, 40, 101, 39, P.maderaS); linea(97, 106, 101, 107, P.maderaS); rect(98, 44, 100, 100, P.maderaL);   // puertas abiertas
    poligono([[196, 31], [206, 34], [206, 112], [196, 115]], P.k); poligono([[197, 32], [205, 35], [205, 111], [197, 114]], P.maderaS); rect(200, 44, 202, 100, P.madera);
    rect(144, 21, 156, 25, P.marmolS); rect(145, 21, 155, 22, P.marmol); disco(150, 18, 3, P.marmol); pset(149, 16, P.marmolL); rect(147, 21, 153, 22, P.marmolL); pset(152, 18, P.marmolS);   // el busto
    // el cuadrito de la paloma
    rect(212, 52, 246, 80, P.k); rect(213, 53, 245, 79, P.estucoL); rect(215, 55, 243, 77, hex('#e8dcc0')); linea(218, 72, 240, 66, P.maderaS); for (const [x, y] of [[222, 70], [228, 69], [236, 67], [232, 66]]) { pset(x, y - 1, P.verdeP); pset(x + 1, y - 2, P.verdeP); }
    disco(229, 63, 3, hex('#f0ece4')); disco(232, 61, 2, hex('#f0ece4')); pset(234, 61, P.ocreP); pset(232, 60, P.k); linea(226, 64, 223, 62, hex('#c8c4bc')); pset(228, 66, hex('#c8a0a0'));
    // el suelo de mosaico (rombos de teselas negras sobre blanco, cenefa negra junto a la pared)
    for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const cx = Math.floor(x / 3), cy = Math.floor((y - 118) / 3), junta = x % 3 === 2 || (y - 118) % 3 === 2;
      let c = y < 124 ? (cy === 1 && cx % 2 ? hex('#e8dcc4') : P.negroP) : ((cx + cy) % 10 === 0 || ((cx - cy) % 10 + 10) % 10 === 0) ? hex('#3a2e2a') : (h(cx, cy, 412) < 0.1 ? hex('#d8c8ac') : hex('#e8dcc4'));
      if (junta && y >= 124) c = b_mezcla(c, hex('#b8a888'), 0.45); c = b_mezcla(c, P.k, Math.max(0, (y - 140) / 160)); pset(x, y, c); }
    // la luz del ventanal en el suelo y un rayo tenue en el aire
    b_luzR(R, 34, 104, 96, 124, 0.9, 0.07, hex('#fff0c8')); b_luzR(R, 52, 124, 128, 150, 0.9, 0.24, hex('#fff0c8'));
    // el candelabro alto
    rect(269, 80, 271, 151, P.bronceS); rect(269, 80, 269, 151, P.bronceL); for (const y of [100, 126]) rect(267, y, 273, y + 2, P.bronce);
    rect(263, 77, 277, 79, P.k); rect(264, 77, 276, 78, P.bronce); rect(264, 77, 276, 77, P.bronceL);
    for (const d of [-1, 1]) { linea(270, 150, 270 + d * 9, 157, P.bronceS); linea(270, 149, 270 + d * 9, 156, P.bronce); pset(270 + d * 10, 157, P.k); } linea(270, 150, 270, 157, P.bronceS);
    b_sombraR(R, 258, 156, 284, 159, 0.7);
    // el pupitre inclinado con la hoja, y el taburete
    b_sombraR(R, 112, 154, 172, 158, 0.72);
    for (const x of [124, 158]) rect(x, 140, x + 1, 154, P.maderaS); rect(122, 151, 162, 152, P.maderaS);
    poligono([[114, 147], [168, 147], [164, 138], [118, 138]], P.k); poligono([[115, 146], [167, 146], [163, 139], [119, 139]], P.madera); linea(115, 146, 167, 146, P.maderaL);
    poligono([[124, 145], [158, 145], [155, 140], [127, 140]], P.perg); for (let c = 0; c < 12; c++) for (let y = 141; y <= 144; y++) if ((c + y) % 2) pset(127 + c * 2.5 + (145 - y) * 0.3, y, c === 11 ? P.minio : P.tinta);
    for (const x of [117, 164]) { rect(x, 147, x + 2, 157, P.k); rect(x, 147, x + 1, 156, P.madera); rect(x - 1, 151, x + 3, 152, P.maderaL); }
    rect(160, 136, 166, 139, P.k); rect(161, 136, 165, 138, P.bronce); pset(162, 136, P.bronceL); linea(165, 136, 169, 130, P.pergS);   // tintero y cálamo
    rect(176, 145, 190, 147, P.k); rect(177, 145, 189, 146, P.maderaL); for (const x of [178, 188]) rect(x, 148, x + 1, 157, P.maderaS);
  });
  const cie = b_ps(R, F.mk.cielo);
  // nubes en el ventanal a dos velocidades y golondrinas
  for (const [x0, y, w, v] of [[0, 46, 22, 1.6], [40, 56, 16, 2.6], [70, 40, 14, 1.1]]) b_nube(cie, 18 + ((x0 + t * v) % 100), y, w, [hex('#c8d8ea'), hex('#eef4fa'), P.blanco]);
  for (let k = 0; k < 2; k++) { const u = (t * 0.09 + k * 0.45) % 1, x = 18 + u * 80, y = 50 + k * 12 + Math.sin(t * 2 + k) * 3, ala = Math.sin(t * 12 + k) > 0 ? -1 : 0; cie(x - 2, y + ala, P.k); cie(x - 1, y, P.k); cie(x, y + 1, P.k); cie(x + 1, y, P.k); cie(x + 2, y + ala, P.k); }
  // la lámpara de bronce colgada, que se mece, con sus tres llamas y su halo
  { const s = Math.sin(t * 0.9) * 1.6, lx = Math.round(256 + s), ly = 44; linea(256, 11, lx, ly - 3, P.bronceS); linea(256 + (lx > 256 ? 1 : 0), 11, lx, ly - 3, P.k);
    linea(lx, ly - 3, lx - 7, ly, P.bronceS); linea(lx, ly - 3, lx + 7, ly, P.bronceS);
    rect(lx - 9, ly, lx + 9, ly + 3, P.k); rect(lx - 8, ly, lx + 8, ly + 2, P.bronce); rect(lx - 8, ly, lx + 8, ly, P.bronceL); rect(lx - 5, ly + 3, lx + 5, ly + 4, P.bronceS); pset(lx, ly + 5, P.bronceS);
    for (const [dx, k] of [[-9, 0], [0, 1], [9, 2]]) b_llama(R, lx + dx, ly - 1, t, k, 1);
    b_halo(R, lx, ly + 2, 26 + Math.sin(t * 9) * 1.5, P.llamaL, 0.16); }
  b_llama(R, 270, 76, t, 4, 1.4); b_halo(R, 270, 72, 20 + Math.sin(t * 8 + 1), P.llamaL, 0.18);
  // la etiqueta de un rollo que se balancea, el gato del alféizar y las motas de polvo en la luz
  { const a = Math.sin(t * 2.2) * 1.2; linea(173, 66, 173 + Math.round(a), 70, P.minio); pset(174 + Math.round(a), 70, P.minio); }
  { const cx = 72, cy = 97, gr = hex('#6a6a7a'), grL = hex('#9a9aa8'); rect(cx - 6, cy - 3, cx + 4, cy, gr); rect(cx - 5, cy - 3, cx + 3, cy - 3, grL); disco(cx + 5, cy - 3, 2.5, gr); pset(cx + 4, cy - 6, gr); pset(cx + 7, cy - 6, Math.sin(t * 3) > 0.9 ? grL : gr); pset(cx + 5, cy - 3, P.k); pset(cx + 7, cy - 3, P.k);
    const c = Math.sin(t * 1.7); for (let i = 0; i < 6; i++) pset(cx - 7 - i, cy - 1 + Math.round(Math.sin(i * 0.8 + t * 2.4) * c * 1.4), gr); }
  for (let k = 0; k < 12; k++) { const u = ((h(k, 1, 413) + t * 0.02 * (1 + k % 3)) % 1), y = 106 + u * 40, x = 40 + (y - 104) * 0.9 + h(k, 2, 413) * 56 + Math.sin(t * 0.7 + k) * 2; if (Math.floor(t * 2 + k) % 3) pset(Math.round(x), Math.round(y), P.llamaB); }
  // el ratón que cruza por el pie de la pared
  { const u = (t % 14) / 3.2; if (u < 1) { const x = Math.round(330 - u * 360), y = 121, p = Math.floor(t * 14) & 1; rect(x, y - 2, x + 3, y, hex('#7a6a5e')); pset(x - 1, y - 1, hex('#7a6a5e')); pset(x, y - 3, hex('#a8968a')); pset(x - 1, y - 2, P.k); linea(x + 4, y - 1, x + 7, y - 2 + p, hex('#a8968a')); } }
  return { suelo: 158, pupitre: [114, 138, 168, 147], hoja: [124, 140, 158, 145], taburete: [176, 145, 190, 157], ventana: [22, 33, 84, 98], alfeizar: 98, gato: [72, 97], armario: [100, 26, 206, 115], lampara: [256, 44], candelabro: [270, 76], libre: [36, 288] };
}

// la sombra de un mueble sobre la pared o el suelo: oscurece un rectángulo (f: cuánto queda de la luz)
function b_sombraR(R, x0, y0, x1, y1, f = 0.8) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = R.pget(x, y); if (c) R.pset(x, y, b_mezcla(c, b_P.k, 1 - f)); } }

// una mancha de luz en paralelogramo, tramada (inclin: cuánto se tuerce por fila)
function b_luzR(R, x0, y0, x1, y1, inclin, a, col) { for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * inclin); for (let x = x0 + d; x <= x1 + d; x++) if (((x + y) & 1) === 0 || a > 0.2) { const c = R.pget(x, y); if (c) R.pset(x, y, b_mezcla(c, col, a)); } } }

// delante en el scriptorium: el cesto de rollos (capsa) a la izquierda y los códices con el ánfora a la derecha
function b_scriptoriumDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, P = b_P;
  b_sombraR(R, 2, 174, 38, 179, 0.7);
  for (const [x, y, r, k] of [[9, 151, 4, 1], [17, 149, 4, 2], [25, 152, 4, 3], [13, 155, 3, 4], [22, 156, 3, 5]]) { rect(x - 1, y, x + 1, y + 8, P.pergS); b_rollo(R, x, y, r, k); }
  rect(3, 156, 33, 179, P.k); for (let y = 157; y < 180; y++) for (let x = 4; x <= 32; x++) pset(x, y, x < 8 ? P.maderaD : x > 27 ? P.maderaS : ((x + (y >> 2)) % 6 === 0 ? P.maderaS : P.madera));
  rect(4, 157, 32, 158, P.maderaL); for (const y of [163, 173]) { rect(4, y, 32, y + 1, P.bronceS); rect(4, y, 32, y, P.bronceL); } rect(16, 166, 19, 169, P.bronce);
  // los códices apilados, la tablilla de cera y el ánfora
  for (const [y, w, c] of [[170, 26, hex('#7a2a22')], [164, 22, hex('#4a3a22')], [158, 24, hex('#5a2a5a')]]) { rect(294, y, 294 + w, y + 6, P.k); rect(295, y + 1, 293 + w, y + 5, c); rect(295, y + 1, 293 + w, y + 1, b_mezcla(c, P.blanco, 0.3)); rect(293 + w, y + 2, 293 + w, y + 4, P.pergL); pset(300, y + 3, P.oro); }
  rect(298, 154, 314, 157, P.k); rect(299, 154, 313, 156, P.madera); rect(300, 155, 312, 155, hex('#2a3a2a'));
  disco(313, 140, 6, P.k); disco(313, 140, 5, P.barro); disco(311, 138, 2, P.barroL); rect(311, 130, 315, 134, P.barroS); rect(310, 129, 316, 130, P.barro); linea(307, 133, 309, 137, P.barroS); linea(318, 133, 317, 137, P.barroS);
  rect(311, 145, 315, 152, P.barroS); rect(312, 145, 314, 151, P.barro);
}

function b_calendario(R, t, o) {
  const { rect, pset, linea, disco } = R, P = b_P, br = Math.max(0, Math.min(1, o.brilla ?? 0)), escrito = Math.max(0, Math.min(1, o.escrito ?? 1));
  const filaY = (c, r) => c < 11 ? 48 + r * 3 : r < 24 ? 48 + r * 3 : r === 24 ? 120 : 130 + (r - 25) * 3;
  b_fijo(R, 'roma:calendario', () => {
    // el tablero de madera, con vetas y la luz cálida de la lucerna (abajo a la izquierda)
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 30), yy = y % 30, veta = Math.sin(x * 0.05 + tabla * 3 + Math.sin(x * 0.013 + tabla) * 3 + yy * 0.6), luz = Math.max(0, 1 - Math.hypot(x - 30, y - 160) / 230);
      let c = yy === 29 ? P.maderaD : yy === 0 ? P.maderaL : veta > 0.86 ? P.maderaS : veta < -0.9 ? hex('#94622f') : P.madera;
      if (h(x >> 4, y >> 3, 420) < 0.04 && yy > 4 && yy < 25) c = P.maderaS;
      if (luz > b_umbral(x, y) * 0.8 + 0.25) c = b_mezcla(c, P.llamaL, 0.12); else if (luz < 0.15) c = b_mezcla(c, P.k, 0.18); pset(x, y, c); }
    // la sombra y la hoja de pergamino, con sus bordes gastados y la esquina doblada
    b_sombraR(R, 38, 22, 244, 160, 0.62);
    for (let y = 18; y <= 155; y++) for (let x = 34; x <= 239; x++) { const borde = Math.min(x - 34, 239 - x, y - 18, 155 - y), mella = h(x, y, 421) < 0.3 && borde === 0;
      if (mella || (x > 228 && y > 146 && (x - 228) + (y - 146) > 10)) continue; let c = borde < 2 ? P.pergS : h(x >> 1, y >> 1, 422) < 0.08 ? P.pergS : h(x, y, 423) < 0.05 ? P.pergL : P.perg; if (borde < 6 && h(x >> 2, y >> 2, 424) < 0.25) c = b_mezcla(c, P.pergS, 0.5); pset(x, y, c); }
    R.poligono([[229, 156], [240, 145], [233, 147]], P.pergS); linea(229, 155, 239, 145, P.estucoD);
    // el friso de arriba: cuadritos rojos y dorados y unas figuritas pintadas (sin letras)
    rect(40, 22, 233, 29, P.pergL); for (let x = 40; x <= 233; x += 4) { rect(x, 22, x + 1, 23, (x / 4) % 2 ? P.minio : P.oroS); rect(x + 2, 28, x + 3, 29, (x / 4) % 2 ? P.oroS : P.minio); }
    for (let k = 0; k < 6; k++) { const x = 60 + k * 32; rect(x, 25, x + 2, 26, b_TUNICAS[k]); pset(x + 1, 24, b_PIELES[k % 4]); linea(x + 6, 26, x + 14, 26, P.tinta); }
    // las doce columnas: la casilla del mes con su pictograma y una raya de tinta por día
    for (let c = 0; c < 12; c++) { const x0 = 40 + c * 16;
      linea(x0, 31, x0, 150, P.minio); rect(x0 + 2, 32, x0 + 13, 43, P.pergL); rect(x0 + 2, 43, x0 + 13, 43, P.pergS); b_picto(R, b_MESES[c], x0 + 5, 35, b_COLMES[c]);
      if (c === 11) continue;
      for (let r = 0; r < 31; r++) { const y = filaY(c, r), l = 3 + Math.floor(h(c, r, 425) * 7); linea(x0 + 2, y, x0 + 2 + l, y, P.tinta); if (h(c, r, 426) < 0.18) pset(x0 + 12, y, P.minio); if (h(c, r, 427) < 0.1) pset(x0 + 2 + l + 2, y, P.tinta); } }
    linea(232, 31, 232, 150, P.minio); linea(40, 46, 232, 46, P.minio);
    // los útiles: el tintero con el cálamo, las conchas de color, la tablilla de cera, el rollo y la regla
    disco(259, 37, 7, P.k); disco(259, 37, 6, P.bronceS); disco(258, 36, 5, P.bronce); disco(259, 37, 3, P.k); pset(256, 33, P.bronceL); pset(257, 33, P.bronceL);
    linea(260, 36, 272, 14, P.k); linea(261, 36, 273, 14, P.pergS); linea(262, 35, 273, 15, P.pergL);
    for (const [x, y, c] of [[256, 106, P.minio], [270, 112, P.tinta], [284, 104, P.oro]]) { disco(x, y, 6, P.k); disco(x, y, 5, hex('#f0e4d4')); disco(x, y, 3.5, c); pset(x - 2, y - 2, P.blanco); linea(x - 5, y + 3, x + 5, y + 3, hex('#c8b8a8')); }
    for (const x0 of [250, 279]) { rect(x0, 56, x0 + 27, 86, P.k); rect(x0 + 1, 57, x0 + 26, 85, P.maderaL); rect(x0 + 1, 57, x0 + 26, 57, hex('#d0a060')); rect(x0 + 3, 59, x0 + 24, 83, hex('#a0703a')); rect(x0 + 3, 59, x0 + 24, 59, hex('#6a4420'));
      for (let k = 0; k < 6; k++) linea(x0 + 5, 63 + k * 3, x0 + 5 + 4 + Math.floor(h(k, x0, 428) * 14), 63 + k * 3, hex('#e0b878')); }
    for (const y of [64, 78]) { rect(277, y, 280, y + 1, P.k); }
    linea(262, 90, 300, 96, P.k); linea(262, 89, 300, 95, P.bronceL);
    rect(2, 52, 14, 128, P.k); for (let y = 53; y <= 127; y++) for (let x = 3; x <= 13; x++) pset(x, y, x < 6 ? P.pergL : x > 10 ? P.pergS : P.perg); for (let y = 58; y < 127; y += 9) rect(3, y, 13, y, P.pergS); rect(1, 50, 15, 52, P.maderaD); rect(1, 128, 15, 130, P.maderaD);
    rect(18, 20, 22, 146, P.k); rect(19, 21, 21, 145, P.maderaL); for (let y = 24; y < 145; y += 6) pset(19, y, P.maderaD);
  });
  // diciembre: se va escribiendo
  { const x0 = 216, n = Math.round(escrito * 31); for (let r = 0; r < n; r++) { if (r === 24) continue; const y = filaY(11, r), l = 3 + Math.floor(h(11, r, 425) * 7); linea(x0 + 2, y, x0 + 2 + l, y, P.tinta); if (h(11, r, 426) < 0.18) pset(x0 + 12, y, P.minio); }
    // la casilla del 25: su marco siempre; al brillar, la estrella y el sol
    rect(217, 118, 230, 128, P.pergL); linea(217, 118, 230, 118, P.oroS); linea(217, 128, 230, 128, P.oroS); linea(217, 118, 217, 128, P.oroS); linea(230, 118, 230, 128, P.oroS);
    if (n > 24) { b_picto(R, b_ESTRELLA, 218, 120, br > 0 ? P.oro : P.tinta); b_solRayos(R, 226.5, 123.5, br > 0 ? 1.6 : 1.4, br > 0 ? t : 0, br > 0 ? P.oro : P.minio, br > 0 ? P.oroS : P.minio); }
    if (br > 0) { b_halo(R, 224, 123, 10 + br * 16 + Math.sin(t * 6) * 1.5, P.oroL, 0.45 * br);
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + t * 0.4, r0 = 10, r1 = 10 + br * (k % 2 ? 9 : 14); linea(224 + Math.cos(a) * r0, 123 + Math.sin(a) * r0 * 0.8, 224 + Math.cos(a) * r1, 123 + Math.sin(a) * r1 * 0.8, k % 2 ? P.oroL : P.oro); }
      b_picto(R, b_ESTRELLA, 218, 120, P.oro); b_solRayos(R, 226.5, 123.5, 1.6, t, P.oro, P.oroS);
      rect(217, 118, 230, 118, P.oro); rect(217, 128, 230, 128, P.oro);
      if (br > 0.4) R.numero('25', 238, 128, {}); }
  }
  // la polilla que ronda la lucerna
  { const a = t * 3.1, x = Math.round(34 + Math.cos(a) * 14), y = Math.round(148 + Math.sin(a * 1.3) * 9), al = Math.sin(t * 30) > 0; pset(x, y, hex('#c8b8a0')); pset(x - 1, y - (al ? 1 : 0), hex('#e8dcc8')); pset(x + 1, y - (al ? 1 : 0), hex('#e8dcc8')); }
  return { suelo: 180, hoja: [34, 18, 239, 155], columnas: [40, 232], diciembre: [216, 31, 232, 150], casilla: [217, 118, 230, 128], fila: (r) => filaY(11, r), tintero: [259, 37], conchas: [[256, 106], [270, 112], [284, 104]], lucerna: [34, 158] };
}

// delante en el inserto: la lucerna encendida abajo a la izquierda, con su halo sobre la hoja
function b_calendarioDelante(R, t, o) {
  b_halo(R, 36, 156, 34 + Math.sin(t * 9) * 2, b_P.llamaL, 0.18);
  const x = 44, y = 166, { rect, disco, pset } = R, P = b_P;
  b_sombraR(R, 22, 170, 52, 175, 0.7);
  disco(x - 12, y + 1, 10, P.k); disco(x - 12, y, 9, P.barroS); disco(x - 13, y - 1, 8, P.barro); disco(x - 12, y - 1, 4, P.barroS); disco(x - 12, y - 1, 2.5, P.k); pset(x - 17, y - 6, P.barroL); pset(x - 16, y - 7, P.barroL);
  rect(x - 4, y - 3, x + 2, y + 3, P.k); rect(x - 4, y - 2, x + 1, y + 2, P.barro); rect(x - 4, y - 2, x + 1, y - 2, P.barroL); rect(x - 26, y - 2, x - 21, y + 1, P.barroS);
  b_llama(R, x, y - 3, t, 7, 2);
}

const b_COLS = [92, 120, 148, 176, 204, 232];

function b_templo(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = b_P;
  const F = b_fijo(R, 'roma:templo', (foto) => {
    b_degradado(R, 0, 0, 319, 124, [hex('#3c3a76'), hex('#5a4682'), hex('#8e5282'), hex('#d0707a'), hex('#f0a070'), hex('#f8d494')]);
    disco(262, 104, 16, b_mezcla(hex('#f8d494'), P.blanco, 0.25)); disco(262, 104, 12, hex('#fff2c0')); disco(261, 103, 9, hex('#fffbe8'));   // el sol que sale
    foto('cielo');
    // las colinas con el acueducto, los pinos y los cipreses
    for (let x = 0; x < 320; x++) { const hy = Math.round(104 + Math.sin(x * 0.03 + 1) * 5 + Math.sin(x * 0.11) * 2); rect(x, hy, x, 124, hex('#7a5a8a')); rect(x, hy, x, hy, hex('#a0708a')); }
    for (let x = 0; x < 110; x++) { const y0 = 100 + Math.round(x * 0.04); if (x % 9 < 6) { rect(x, y0, x, y0 + 3, hex('#6a4a7a')); if (x % 9 > 0 && x % 9 < 5) rect(x, y0 + 4, x, y0 + 13 - (x % 9 === 1 || x % 9 === 4 ? 1 : 0), hex('#6a4a7a')); } else rect(x, y0, x, y0 + 16, hex('#6a4a7a')); rect(x, y0, x, y0, hex('#9a6a8a')); }   // el acueducto
    for (const [cx, y, r] of [[30, 106, 6], [258, 112, 7], [296, 108, 8], [12, 110, 5]]) { rect(cx, y, cx, y + 12, hex('#4a3a5a')); for (let i = -r; i <= r; i++) rect(cx + i, y - 2 + Math.round((i / r) ** 2 * 2), cx + i, y + 1, hex('#4a4a5a')); for (let i = -r + 1; i < r; i++) pset(cx + i, y - 2 + Math.round((i / r) ** 2 * 2), hex('#6a5a6a')); }
    for (const [cx, y0] of [[64, 98], [70, 102], [282, 96], [306, 100]]) for (let y = y0; y <= 122; y++) { const w = Math.round(Math.min(2, (y - y0) / 4)); rect(cx - w, y, cx + w, y, hex('#3a3a4e')); }
    // la pared del templo (la cella) con la puerta abierta y el disco del Sol dentro
    for (let y = 50; y <= 112; y++) for (let x = 84; x <= 246; x++) { const fila = Math.floor((y - 50) / 5), junta = (y - 50) % 5 === 4 || (x + fila * 7) % 14 === 0; pset(x, y, junta ? hex('#8a7c6c') : h(x >> 1, y >> 1, 430) < 0.1 ? hex('#a89a86') : hex('#b8ab96')); }
    rect(84, 50, 246, 56, hex('#6a5e52'));
    rect(144, 66, 186, 112, P.k); for (let y = 67; y <= 112; y++) for (let x = 145; x <= 185; x++) { const d = Math.hypot(x - 165, (y - 86) * 1.1); pset(x, y, d < 30 ? b_mezcla(hex('#ffcc6a'), hex('#7a3a1a'), Math.min(1, d / 30)) : hex('#4a2a1a')); }
    b_solRayos(R, 165, 86, 7, 0.2); disco(165, 86, 9.5, P.oroS); disco(165, 86, 8.5, P.oro); disco(163, 84, 3, P.oroL); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; linea(165 + Math.cos(a) * 10, 86 + Math.sin(a) * 10, 165 + Math.cos(a) * 16, 86 + Math.sin(a) * 16, k % 2 ? P.oroS : P.oro); }
    rect(160, 100, 170, 112, P.marmolS); rect(161, 100, 169, 101, P.marmol);
    for (const [x0, x1] of [[136, 144], [186, 194]]) { rect(x0, 66, x1, 112, P.k); rect(x0 + 1, 67, x1 - 1, 112, P.bronceS); for (let y = 70; y < 110; y += 10) { rect(x0 + 2, y, x1 - 2, y + 7, P.bronce); rect(x0 + 2, y, x1 - 2, y, P.bronceL); } }
    rect(142, 62, 188, 65, P.marmolS); rect(142, 62, 188, 62, P.marmol);
    b_sombraR(R, 84, 57, 246, 64, 0.7);
    foto('portico');
    // el frontón con el sol dorado en relieve, la cornisa con dentículos y el friso
    poligono([[76, 41], [165, 16], [254, 41]], P.k); poligono([[80, 40], [165, 18], [250, 40]], P.marmol); poligono([[88, 39], [165, 22], [242, 39]], P.marmolV);
    linea(80, 40, 165, 18, P.marmolL); linea(165, 18, 250, 40, P.marmolS);
    b_solRayos(R, 165, 31, 4.5, 0); for (let k = 0; k < 4; k++) { pset(130 - k * 8, 37 - k * 2 + 2, P.marmolS); pset(200 + k * 8, 37 - k * 2 + 2, P.marmolS); }
    rect(74, 41, 256, 43, P.k); rect(75, 41, 255, 42, P.marmolL); for (let x = 76; x <= 254; x += 3) rect(x, 44, x + 1, 45, P.marmol); rect(76, 44, 254, 44, P.marmolL); rect(76, 46, 254, 46, P.marmolS);
    rect(78, 47, 252, 50, P.marmol); for (let x = 82; x < 250; x += 12) { linea(x, 48, x + 6, 49, P.hiedra); pset(x + 3, 49, P.oro); } rect(78, 50, 252, 50, P.marmolS); rect(80, 51, 250, 54, P.marmolL); rect(80, 54, 250, 55, P.marmolS);
    for (const [x, y] of [[78, 38], [252, 38]]) { rect(x - 2, y - 4, x + 2, y + 1, P.oroS); pset(x, y - 6, P.oro); pset(x - 2, y - 5, P.oro); pset(x + 2, y - 5, P.oro); pset(x, y - 3, P.oroL); }
    // las seis columnas corintias (luz desde la derecha, donde sale el sol)
    for (const x0 of b_COLS) { const x1 = x0 + 11;
      for (let y = 62; y <= 108; y++) for (let x = x0; x <= x1; x++) { const i = x - x0; pset(x, y, i === 0 ? P.marmolD : i < 3 ? P.marmolS : (i % 2 ? P.marmolV : (i > 7 ? P.marmolL : P.marmol))); }
      rect(x0 - 2, 56, x1 + 2, 58, P.marmolL); for (let y = 58; y <= 61; y++) for (let x = x0 - 1; x <= x1 + 1; x++) pset(x, y, (x + y) % 3 === 0 ? P.marmolS : (x > x0 + 5 ? P.marmolL : P.marmol)); for (const dx of [-1, 4, 9]) { pset(x0 + dx, 59, hex('#9aa078')); pset(x0 + dx + 1, 60, hex('#9aa078')); }
      rect(x0 - 2, 109, x1 + 2, 110, P.marmol); rect(x0 - 3, 111, x1 + 3, 112, P.marmolS); rect(x0 - 2, 109, x1 + 2, 109, P.marmolL); }
    // el podio y la escalinata, las palomas, la plaza de travertino
    for (let y = 113; y <= 150; y++) for (let x = 0; x < 320; x++) { if (x < 80 || x > 250) continue; let c; const esc = x >= 92 && x <= 238;
      if (esc) { const p = (y - 113) % 3; c = p === 0 ? P.travL : p === 1 ? P.trav : P.travS; if (h(x >> 2, y, 431) < 0.06) c = P.travS; } else { c = (y - 113) % 8 === 7 || (x + Math.floor((y - 113) / 8) * 6) % 12 === 0 ? P.travJ : P.trav; if (x === 80 || x === 250) c = P.travJ; if (x > 238) c = b_mezcla(c, P.blanco, 0.1); }
      pset(x, y, c); }
    rect(80, 113, 92, 116, P.marmolL); rect(238, 113, 250, 116, P.marmolL);
    // el muro del recinto a los lados del podio: sillares con cornisa, nichos con estatuas y arbustos al pie
    for (const [x0, x1] of [[0, 79], [251, 319]]) { for (let y = 114; y <= 150; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - 114) / 6), junta = (y - 114) % 6 === 5 || (x + fila * 9) % 18 === 0; pset(x, y, y < 117 ? (y === 114 ? P.travL : P.travS) : junta ? P.travJ : h(x >> 1, y >> 1, 435) < 0.1 ? P.travS : P.trav); }
      for (let x = x0 + 14; x < x1 - 8; x += 34) { rect(x, 120, x + 10, 142, P.k); rect(x + 1, 121, x + 9, 142, b_mezcla(P.travS, P.k, 0.35)); disco(x + 5, 121, 5, b_mezcla(P.travS, P.k, 0.35)); rect(x + 3, 127, x + 7, 140, P.marmol); disco(x + 5, 125, 2, P.marmol); rect(x + 6, 127, x + 7, 140, P.marmolS); rect(x + 2, 140, x + 8, 142, P.marmolL); }
      for (let x = x0; x <= x1; x++) { const hb = 4 + Math.round(Math.abs(Math.sin(x * 0.3)) * 3); for (let y = 150 - hb; y <= 150; y++) pset(x, y, (x + y) % 4 === 0 ? hex('#4a6a3a') : (y === 150 - hb ? hex('#7a9a5a') : hex('#3a5a32'))); } }
    for (let x = 0; x < 320; x++) pset(x, 113, R.pget(x, 113) || P.travS);
    for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 151) / (4 + (y - 151) / 6)), ys = (y - 151) - [0, 4, 9, 15, 22].reduce((a, v, i) => (fila > i ? v : a), 0), w = 18 + fila * 6, junta = (x + fila * 11) % w === 0 || y === 151 || ys === 0;
      let c = junta ? P.travJ : h(Math.floor((x + fila * 11) / w), fila, 432) < 0.3 ? P.travS : P.trav; if (h(x, y, 433) < 0.04) c = P.travJ; else if (h(x, y, 434) < 0.03) c = P.travL; pset(x, y, c); }
    for (const x0 of b_COLS) b_sombraR(R, x0 - 6, 113, x0 + 4, 150, 0.82);   // sombras de las columnas hacia la izquierda
    // los braseros de trípode
    for (const bx of [56, 274]) { for (const d of [-1, 0, 1]) { linea(bx, 136, bx + d * 8, 162, P.bronceS); linea(bx + 1, 136, bx + d * 8 + 1, 162, P.bronce); pset(bx + d * 8, 163, P.k); }
      rect(bx - 9, 130, bx + 9, 136, P.k); rect(bx - 8, 130, bx + 8, 135, P.bronce); rect(bx - 8, 130, bx + 8, 130, P.bronceL); rect(bx + 3, 131, bx + 8, 135, P.bronceS); for (let i = -6; i <= 6; i += 3) pset(bx + i, 133, P.bronceV);
      b_sombraR(R, bx - 12, 163, bx + 6, 166, 0.75); }
  });
  const cie = b_ps(R, F.mk.cielo), por = b_ps(R, F.mk.portico);
  // nubes de alba a tres velocidades y golondrinas
  for (const [x0, y, w, v, k] of [[0, 60, 40, 1.2, 0], [150, 74, 30, 2.1, 1], [250, 88, 46, 3.0, 2], [90, 52, 22, 1.6, 3], [210, 96, 26, 2.6, 4]]) b_nube(cie, ((x0 + t * v) % 420) - 50, y, w, k % 2 ? [hex('#a05a7a'), hex('#e08a7a'), hex('#ffc8a0')] : [hex('#8a4e7a'), hex('#d47a7a'), hex('#ffd4a8')]);
  for (let k = 0; k < 4; k++) { const u = (t * 0.06 + k * 0.17) % 1, x = -10 + u * 340, y = 74 + k * 6 + Math.sin(t * 1.5 + k) * 4, ala = Math.sin(t * 11 + k * 2) > 0 ? -1 : 1; cie(x - 2, y + ala, P.k); cie(x - 1, y, P.k); cie(x, y + 1, P.k); cie(x + 1, y, P.k); cie(x + 2, y + ala, P.k); }
  // el brillo del Sol dentro, y el sacerdote que cruza el pórtico (detrás de las columnas)
  if (Math.sin(t * 2.3) > 0.7) { pset(161, 82, P.blanco); pset(169, 90, P.oroL); }
  { const u = (t % 16) / 16, x = 80 + u * 170; b_figura(R, x, 112, t, 6, { ps: por, anda: true, tun: P.marmolL, dir: 1 }); }
  // las palomas de la escalinata
  for (let k = 0; k < 3; k++) { const x = [110, 196, 224][k] + Math.round(Math.sin(t * 0.4 + k * 2) * 4), y = [125, 140, 119][k], pic = Math.sin(t * 5 + k * 3) > 0.5 ? 1 : 0, g = hex('#8a8a9a'); rect(x, y - 2, x + 3, y, g); rect(x + 1, y - 2, x + 2, y - 2, hex('#aaaab8')); pset(x + 3 + pic, y - 3 + pic, g); pset(x + 4 + pic, y - 3 + pic, P.barro); pset(x, y + 1, P.k); }
  // fuego y humo en los braseros, con su halo
  for (const [bx, k] of [[56, 0], [274, 1]]) { for (let i = -6; i <= 6; i += 3) b_llama(R, bx + i, 130, t, k * 5 + i, 1.6 - Math.abs(i) * 0.08); b_halo(R, bx, 128, 22 + Math.sin(t * 7 + k) * 2, P.llamaL, 0.2); b_humo(R, bx, 118, t, k, 50, -14); }
  return { suelo: 166, horizonte: 104, podio: 112, escalinata: [92, 113, 238, 150], puerta: [144, 66, 186, 112], solDentro: [165, 86], frontonSol: [165, 31], braseros: [[56, 130], [274, 130]], sol: [262, 104], columnas: b_COLS.map((x) => x + 5), libre: [70, 260] };
}

function b_balanza(o, t) { const a = Math.max(-1, Math.min(1, o.balanza ?? 0)) * 0.3 + (o.tiembla ?? 0) * 0.05 * Math.sin(t * 19) * (0.6 + 0.4 * Math.sin(t * 3.1)), L = 46;
  return { a, piv: [160, 56], izq: [160 - L * Math.cos(a), 56 - L * Math.sin(a)], der: [160 + L * Math.cos(a), 56 + L * Math.sin(a)] }; }

function b_altar(R, t, o) {
  const { rect, pset, linea, disco } = R, P = b_P;
  b_fijo(R, 'roma:altar', () => {
    // el techo del pórtico y la pared de mármoles de colores (pórfido, giallo, serpentina)
    for (let y = 0; y <= 12; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 12 ? P.k : (x % 32 < 3 ? hex('#4a4038') : (y & 1) && h(x >> 3, y, 440) < 0.3 ? hex('#3e3530') : hex('#463c34')));
    for (let y = 13; y <= 150; y++) for (let x = 0; x < 320; x++) { const pc = Math.floor(x / 40), pf = y < 60 ? 0 : y < 118 ? 1 : 2, bx = x % 40, by = pf === 0 ? y - 13 : pf === 1 ? y - 60 : y - 118, bh = pf === 0 ? 47 : pf === 1 ? 58 : 33;
      let c; const marco = bx < 3 || bx > 36 || by < 3 || by > bh - 4, tipo = (pc + pf) % 3;
      if (marco) c = (bx === 0 || by === 0) ? P.marmolD : P.marmol; else { const base = [hex('#7a2a2e'), hex('#d8b468'), hex('#3e6a52')][tipo], v = Math.abs(Math.sin(x * 0.13 + y * 0.07 + Math.sin(y * 0.3 + pc) * 1.8)); c = v < 0.1 ? b_mezcla(base, P.blanco, 0.35) : h(x, y, 441) < 0.12 ? b_mezcla(base, P.k, 0.25) : base; if (tipo === 0 && h(x, y, 442) < 0.08) c = hex('#c8a0a0'); }
      if (pf === 0 && by < 3) c = P.marmolS; pset(x, y, b_mezcla(c, P.k, 0.18)); }
    // el relieve del sol en la pared
    disco(56, 58, 13, P.marmolS); disco(56, 58, 12, b_mezcla(P.marmol, P.k, 0.15)); b_solRayos(R, 56, 58, 6, 0.15);
    // el suelo de mármol en damero con reflejos
    for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const u = Math.floor((x - 160) / (y - 120) * 3 + 100), v = Math.floor((y - 151) / (3 + (y - 151) * 0.2)); let c = (u + v) & 1 ? hex('#d8d0c0') : hex('#5a4a4a'); if (h(x, y, 443) < 0.05) c = b_mezcla(c, P.blanco, 0.2); pset(x, y, b_mezcla(c, P.k, (y - 151) / 120)); }
    // los dos fustes enormes en primer término de los lados, estriados
    for (const [x0, x1] of [[0, 30], [290, 319]]) { for (let y = 0; y < 180; y++) for (let x = x0; x <= x1; x++) { const i = x - x0; pset(x, y, i % 4 === 0 ? P.marmolS : x0 === 0 ? (i > 22 ? P.marmolL : P.marmol) : (i < 8 ? P.marmolS : P.marmol)); }
      rect(x0, 160, x1, 165, P.marmolL); rect(x0, 166, x1, 179, P.marmolS); }
    b_sombraR(R, 31, 13, 40, 179, 0.7);
    // el altar de mármol con la guirnalda
    b_sombraR(R, 104, 160, 216, 170, 0.6);
    rect(108, 106, 212, 114, P.k); rect(109, 106, 211, 113, P.marmol); rect(109, 106, 211, 107, P.marmolL); rect(109, 112, 211, 113, P.marmolS);
    rect(114, 114, 206, 158, P.k); for (let y = 115; y <= 158; y++) for (let x = 115; x <= 205; x++) pset(x, y, x > 196 ? P.marmolS : h(x >> 1, y >> 1, 444) < 0.07 ? P.marmolV : P.marmol);
    rect(110, 158, 210, 166, P.k); rect(111, 158, 209, 165, P.marmolV); rect(111, 158, 209, 158, P.marmolL);
    for (let k = 0; k < 2; k++) { const x0 = 120 + k * 42; for (let x = x0; x <= x0 + 36; x++) { const y = 122 + Math.round(Math.sin((x - x0) / 36 * Math.PI) * 12); disco(x, y, 2.5, P.hiedraS); if ((x - x0) % 3 === 0) { pset(x, y - 2, P.hiedraL); pset(x + 1, y + 1, P.hiedra); } if ((x - x0) % 9 === 4) disco(x, y + 2, 1.2, P.minio); } }
    for (const x of [120, 160, 200]) { disco(x, 121, 4, P.marmolS); disco(x, 121, 3, P.marmolL); pset(x, 121, P.oroS); linea(x, 125, x - 2, 134, P.minio); linea(x, 125, x + 2, 134, P.minio); }
    // la peana de la balanza y el poste
    rect(150, 101, 170, 106, P.k); rect(151, 101, 169, 105, P.bronce); rect(151, 101, 169, 101, P.bronceL); rect(158, 58, 162, 101, P.k); rect(159, 58, 161, 101, P.bronce); rect(159, 58, 159, 101, P.bronceL); rect(156, 80, 164, 82, P.bronceS);
    // ofrendas en las esquinas del altar: una piña y un pastel
    disco(118, 102, 3, hex('#8a5a2a')); for (let i = -2; i <= 2; i += 2) pset(118 + i, 102, hex('#5a3a1a')); rect(196, 101, 206, 105, hex('#d8a858')); rect(196, 101, 206, 101, hex('#f0c878'));
    // el pebetero de incienso
    rect(256, 150, 266, 152, P.bronceS); rect(260, 120, 262, 150, P.bronce); rect(254, 114, 268, 120, P.k); rect(255, 114, 267, 119, P.bronce); rect(255, 114, 267, 114, P.bronceL);
  });
  // la balanza, el humo, las lámparas colgadas, el brillo del relieve
  b_platillos(R, t, o, false);
  b_humo(R, 261, 112, t, 3, 60, 8, hex('#d8d0d8'));
  for (const [lx, k] of [[100, 0], [220, 1]]) { const s = Math.round(Math.sin(t * 1.1 + k) * 1.2); linea(lx, 13, lx + s, 26, P.k); rect(lx + s - 5, 27, lx + s + 5, 29, P.k); rect(lx + s - 4, 27, lx + s + 4, 28, P.bronce); b_llama(R, lx + s - 4, 26, t, k * 3, 1); b_llama(R, lx + s + 4, 26, t, k * 3 + 1, 1); b_halo(R, lx + s, 28, 22 + Math.sin(t * 8 + k) * 2, P.llamaL, 0.15); }
  { const a = t * 1.3; pset(Math.round(56 + Math.cos(a) * 6), Math.round(58 + Math.sin(a) * 6), P.oroL); if (Math.sin(t * 2.7) > 0.8) pset(52, 54, P.blanco); }
  { const u = (t % 9) / 9, x = Math.round(240 + Math.sin(u * Math.PI * 2) * 14), y = 174 - (Math.abs(Math.sin(t * 6)) > 0.85 ? 2 : 0), g = hex('#8a6a4a'); rect(x, y - 2, x + 3, y, g); pset(x + 4, y - 3, g); pset(x + 5, y - 3, P.oro); pset(x + 4, y - 4, P.k); pset(x - 1, y - 2, hex('#5a4a3a')); }   // un gorrión que salta
  const B = b_balanza(o, t);
  return { suelo: 170, altar: [108, 106, 212, 166], balanza: B.piv, platos: [[Math.round(B.izq[0]), Math.round(B.izq[1] + 27)], [Math.round(B.der[0]), Math.round(B.der[1] + 27)]], relieveSol: [56, 58], pebetero: [261, 112], libre: [[40, 104], [216, 288]] };
}

// la balanza de bronce: el fiel, la cruz que se inclina, las cadenas y los platillos (delante: solo el borde de delante
// de cada platillo, para que lo que se pone en ellos quede dentro)
function b_platillos(R, t, o, delante) {
  const { rect, pset, linea, disco } = R, P = b_P, B = b_balanza(o, t);
  for (const [ex, ey] of [B.izq, B.der]) { const px = Math.round(ex), py = Math.round(ey + 27);
    if (!delante) { for (const d of [-13, 0, 13]) linea(ex, ey + 1, px + d, py - 1, d === 0 ? P.bronceS : P.bronce);
      for (let i = -14; i <= 14; i++) { const p = Math.round(Math.sqrt(1 - (i / 15) ** 2) * 4); rect(px + i, py, px + i, py + p, P.k); if (p > 1) rect(px + i, py + 1, px + i, py + p - 1, i > 6 ? P.bronceS : P.bronce); }
      rect(px - 14, py - 1, px + 14, py - 1, P.bronceS); rect(px - 13, py, px + 13, py, P.bronceS); }
    else { rect(px - 14, py, px + 14, py, P.k); rect(px - 13, py + 1, px + 13, py + 1, P.bronceL); for (let i = -14; i <= 14; i++) { const p = Math.round(Math.sqrt(1 - (i / 15) ** 2) * 4); pset(px + i, py + p, P.k); if (p > 2) pset(px + i, py + 2, i > 6 ? P.bronceS : P.bronce); } } }
  if (delante) return;
  linea(B.izq[0], B.izq[1] - 1, B.der[0], B.der[1] - 1, P.k); linea(B.izq[0], B.izq[1], B.der[0], B.der[1], P.bronceL); linea(B.izq[0], B.izq[1] + 1, B.der[0], B.der[1] + 1, P.bronceS); linea(B.izq[0], B.izq[1] + 2, B.der[0], B.der[1] + 2, P.k);
  for (const [x, y] of [B.izq, B.der]) { disco(x, y, 2, P.k); disco(x, y, 1.2, P.bronceL); }
  const fx = 160 + Math.sin(B.a) * 12, fy = 56 - Math.cos(B.a) * 12; linea(160, 56, fx, fy, P.k); linea(161, 56, fx + 1, fy, P.bronceL); disco(160, 56, 3, P.k); disco(160, 56, 2, P.oro); pset(159, 55, P.oroL);
  for (let k = -3; k <= 3; k++) { const a = k * 0.1; pset(Math.round(160 + Math.sin(a) * 15), Math.round(56 - Math.cos(a) * 15), k === 0 ? P.oro : P.bronceS); }
}

function b_calle(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = b_P;
  const VENT = [[16, 40, 6, 8], [42, 40, 6, 8], [70, 40, 6, 8], [94, 42, 6, 7], [230, 58, 6, 8], [258, 58, 6, 8], [286, 60, 6, 8], [306, 58, 6, 8], [126, 82, 5, 7], [192, 82, 5, 7]];
  const F = b_fijo(R, 'roma:calle', (foto) => {
    b_degradado(R, 0, 0, 319, 100, [hex('#0c1030'), hex('#141a42'), hex('#1e2654'), hex('#2e3464'), hex('#3e3a6a')]);
    disco(198, 26, 8, hex('#2a3060')); disco(198, 26, 6, hex('#f0ecd8')); disco(200, 24, 1.4, hex('#d0ccbc')); disco(196, 28, 1, hex('#d0ccbc'));   // la luna
    foto('cielo');
    // el fondo por el arco: la calle del fondo y el frontón de un templo con antorchas
    for (let y = 60; y <= 128; y++) for (let x = 108; x <= 212; x++) pset(x, y, hex(y < 96 ? '#2a2e52' : '#3a344a'));
    R.poligono([[136, 92], [160, 82], [184, 92]], hex('#4a4a6a')); for (let x = 140; x <= 180; x += 8) rect(x, 93, x + 2, 112, hex('#5a5878')); rect(134, 112, 186, 114, hex('#4a4866'));
    for (let y = 114; y <= 128; y++) for (let x = 108; x <= 212; x++) pset(x, y, (x + y * 3) % 9 === 0 ? hex('#2a2838') : hex('#4a4250'));
    rect(138, 118, 182, 120, hex('#d8c8a0')); rect(138, 121, 182, 123, hex('#a89870')); for (const x of [140, 180]) rect(x, 121, x, 126, hex('#5a4a3a'));   // la mesa del banquete del fondo
    foto('fondo');
    // la casa del medio, con el arco
    for (let y = 70; y <= 128; y++) for (let x = 108; x <= 212; x++) { if (y >= 90 && x >= 130 && x <= 190 && (y >= 104 || (x - 160) ** 2 + (y - 104) ** 2 <= 900)) continue;
      const fila = Math.floor((y - 70) / 4), junta = (y - 70) % 4 === 3 || (x + fila * 5) % 10 === 0; pset(x, y, junta ? hex('#7a5a4a') : h(x >> 1, y, 450) < 0.15 ? hex('#a8705a') : hex('#b8806a')); }
    for (let a = Math.PI; a <= Math.PI * 2; a += 0.012) for (let r = 30; r <= 33; r++) pset(Math.round(160 + Math.cos(a) * r), Math.round(104 + Math.sin(a) * r), r === 30 ? hex('#5a3a2a') : (Math.floor(a * 30) % 4 === 0 ? hex('#8a5a44') : hex('#d8b088')));
    rect(104, 66, 216, 70, P.k); rect(105, 66, 215, 69, P.tejaS); for (let x = 105; x < 215; x += 3) pset(x, 66, P.tejaL);
    // las dos ínsulas: estuco ocre con desconchones de ladrillo, ventanas con postigos, el balcón de madera
    const insula = (x0, x1, y0) => { for (let y = y0; y <= 128; y++) for (let x = x0; x <= x1; x++) { const pis = (y - y0) % 30 === 0, n = h(x >> 3, y >> 3, 451 + x0); let c = pis ? hex('#8a6a4a') : n < 0.12 ? ((x + (y >> 2) * 3) % 6 === 0 || (y & 3) === 0 ? hex('#6a3a2a') : hex('#9a4a32')) : (h(x >> 1, y >> 1, 452) < 0.1 ? hex('#a88458') : hex('#c09868'));
      c = b_mezcla(c, hex('#1a1a40'), 0.45); pset(x, y, c); } rect(x0 - 2, y0 - 5, x1 + 2, y0 - 1, P.k); rect(x0 - 1, y0 - 5, x1 + 1, y0 - 2, b_mezcla(P.teja, P.k, 0.4)); for (let x = x0; x < x1; x += 3) pset(x, y0 - 5, b_mezcla(P.tejaL, P.k, 0.3)); };
    insula(0, 106, 28); insula(214, 319, 50);
    for (const [x, y, w, hh] of VENT) { rect(x - 1, y - 1, x + w, y + hh, P.k); rect(x, y, x + w - 1, y + hh - 1, hex('#1a1424')); rect(x - 4, y, x - 2, y + hh - 1, b_mezcla(P.madera, P.k, 0.45)); rect(x + w + 1, y, x + w + 3, y + hh - 1, b_mezcla(P.madera, P.k, 0.45)); rect(x - 1, y + hh, x + w, y + hh, hex('#7a6a5a')); }
    rect(4, 74, 104, 76, P.k); rect(5, 74, 103, 75, b_mezcla(P.maderaL, P.k, 0.3)); for (let x = 6; x <= 102; x += 4) rect(x, 66, x, 73, b_mezcla(P.madera, P.k, 0.4)); rect(4, 65, 104, 66, b_mezcla(P.maderaL, P.k, 0.35));   // el balcón
    for (const x of [14, 50, 86]) { rect(x, 61, x + 6, 65, b_mezcla(P.barro, P.k, 0.3)); for (let i = 0; i < 8; i++) pset(x + Math.floor(h(i, x, 453) * 8) - 1, 57 + Math.floor(h(i, x, 454) * 4), i % 3 ? b_mezcla(P.hiedra, P.k, 0.2) : b_mezcla(P.hiedraL, P.k, 0.2)); }
    for (let y = 77; y <= 88; y++) for (const x of [10, 100]) pset(x, y, P.k);
    // los puestos: el de las figuritas de barro (izquierda) y el de velas y lucernas (derecha)
    const puesto = (x0, x1) => { rect(x0, 96, x1, 128, P.k); for (let y = 97; y <= 127; y++) for (let x = x0 + 1; x <= x1 - 1; x++) pset(x, y, y % 10 === 0 ? b_mezcla(P.maderaL, P.k, 0.2) : hex('#3a2418'));
      for (let x = x0 - 2; x <= x1 + 2; x++) { const r = Math.floor((x - x0 + 100) / 6) % 2, cae = 3 + Math.round(Math.abs(Math.sin((x - x0) * Math.PI / 6)) * 2); rect(x, 88, x, 88 + cae, r ? hex('#c84a3a') : hex('#e8dcc0')); pset(x, 89 + cae, P.k); } rect(x0 - 2, 87, x1 + 2, 87, P.k);
      rect(x0, 116, x1, 128, P.k); for (let y = 117; y <= 128; y++) for (let x = x0 + 1; x <= x1 - 1; x++) pset(x, y, y === 117 ? P.maderaL : (x % 12 === 0 ? P.maderaD : P.madera)); };
    puesto(8, 100); puesto(220, 312);
    for (const yb of [106, 116]) for (let x = 12; x <= 96; x += 6) { const k = (x * 7 + yb) % 5, c = [P.barro, P.barroL, hex('#d8a878'), P.barroS, hex('#c8784a')][k];   // figuritas de barro: muñecos, animales
      if (k === 1) { rect(x, yb - 4, x + 3, yb - 2, c); pset(x + 4, yb - 5, c); pset(x, yb - 1, P.barroS); pset(x + 3, yb - 1, P.barroS); } else { rect(x + 1, yb - 4, x + 2, yb - 1, c); disco(x + 1.5, yb - 6, 1.4, c); pset(x + 1, yb - 6, P.k); if (k === 3) pset(x + 1, yb - 8, P.minio); } }
    for (let x = 226; x <= 306; x += 7) { rect(x, 102, x + 4, 105, P.barro); rect(x, 102, x + 4, 102, P.barroL); pset(x + 5, 103, P.barroS); }
    for (let x = 228; x <= 300; x += 12) for (let i = 0; i < 4; i++) rect(x + i * 2, 108, x + i * 2, 115, i % 2 ? hex('#f0e0b0') : hex('#e8d098'));
    // la acera con su bordillo y el empedrado de basalto
    for (let y = 129; y <= 137; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 137 ? P.k : y === 136 ? hex('#7a7884') : (x + (y > 132 ? 6 : 0)) % 14 === 0 || y === 133 ? hex('#5a5866') : h(x, y, 455) < 0.06 ? hex('#6a6876') : hex('#8a8896'));
    for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { const gx = Math.floor(x / 13 + Math.sin(y * 0.3) * 0.3), gy = Math.floor((y - 138) / 7 + Math.sin(x * 0.2) * 0.25), sx = x - (gx * 13), sy = y - 138 - gy * 7;
      let c = (sx === 0 || sy === 0) ? P.basaltoS : h(gx, gy, 456) < 0.3 ? P.basaltoL : P.basalto; if (sy === 1 && sx > 1) c = b_mezcla(c, P.blanco, 0.12); if (Math.abs(y - 156) < 1 || Math.abs(y - 170) < 1) c = b_mezcla(c, P.k, 0.25); pset(x, y, c); }
    for (const [x0, y0] of [[300, 150]]) { for (const d of [-1, 1]) linea(x0, y0, x0 + d * 6, y0 + 10, P.k); rect(x0 - 7, y0 - 4, x0 + 7, y0, P.k); rect(x0 - 6, y0 - 4, x0 + 6, y0 - 1, b_mezcla(P.bronce, P.k, 0.3)); }   // el brasero de castañas
    // la puerta de la ínsula de la derecha, cerrada
    rect(204, 98, 216, 128, P.k); rect(205, 99, 215, 128, b_mezcla(P.madera, P.k, 0.5)); pset(213, 114, P.bronceL);
  });
  const cie = b_ps(R, F.mk.cielo), fon = b_ps(R, F.mk.fondo);
  b_estrellas(cie, t, 70, 70, 460, [hex('#3a4274'), hex('#8a92c0'), hex('#f0f0ff')]);
  for (const [x0, y, w, v] of [[0, 18, 34, 1.1], [180, 40, 26, 1.9]]) b_nube(cie, ((x0 + t * v) % 400) - 40, y, w, [hex('#1e2450'), hex('#2e3666'), hex('#4a5084')]);
  // las ventanas que se encienden y se apagan, con su luz cálida
  VENT.forEach(([x, y, w, hh], k) => { const on = Math.sin(t * 0.4 + k * 2.1) > -0.4 && k !== 3; if (!on) return; const f = Math.sin(t * 7 + k) > 0.6 ? P.llamaL : P.llama; rect(x, y, x + w - 1, y + hh - 1, b_mezcla(f, P.k, 0.25)); rect(x, y + hh - 2, x + w - 1, y + hh - 1, f); if (k % 3 === 0) { pset(x + 2, y + 3, P.k); pset(x + 2, y + 4, P.k); } });
  // en la calle del fondo: la gente del banquete que brinda, y paseantes con antorchas
  for (let k = 0; k < 5; k++) b_figura(R, 142 + k * 9, 118, t + k, k, { ps: fon, brazo: Math.sin(t * 1.5 + k * 1.3) > 0.4, pileo: k % 2 ? P.oroS : P.rojoP, oscuro: 0.2 });
  rect(138, 118, 182, 120, hex('#d8c8a0')); rect(138, 117, 182, 117, hex('#f0e4c4')); for (let k = 0; k < 4; k++) { const x = 146 + k * 10; pset(x, 116, P.llamaL); pset(x, 115, Math.sin(t * 9 + k) > 0 ? P.llamaB : P.llama); }
  for (let k = 0; k < 2; k++) { const u = (t * 0.05 + k * 0.5) % 1, x = k ? 214 - u * 108 : 106 + u * 108; b_figura(R, x, 127, t, k + 3, { ps: fon, anda: true, dir: k ? -1 : 1, oscuro: 0.4, pileo: P.rojoP }); fon(x + (k ? -3 : 3), 115, P.llama); fon(x + (k ? -3 : 3), 114, P.llamaL); }
  // las guirnaldas de hiedra con farolillos, que se mecen
  for (const [x0, y0, x1, y1, ca, k] of [[0, 84, 106, 82, 8, 0], [106, 64, 214, 72, 14, 1], [214, 86, 320, 86, 8, 2]]) { const sw = Math.sin(t * 1.2 + k) * 1.5;
    for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), y = Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * (ca + sw)); pset(x, y, P.hiedraS); pset(x, y - 1, (x & 1) ? P.hiedra : P.hiedraS); if (x % 3 === 0) pset(x, y + 1, P.hiedraL); if (x % 5 === 0) pset(x + 1, y - 2, P.hiedra);
      if ((x - x0) % 26 === 13) { const lx = x + Math.round(sw), ly = y + 3; linea(x, y, lx, ly, P.k); rect(lx - 1, ly, lx + 1, ly + 3, b_mezcla(P.barro, P.k, 0.2)); pset(lx, ly + 1, Math.sin(t * 9 + x) > 0 ? P.llamaB : P.llamaL); b_halo(R, lx, ly + 1, 9, P.llamaL, 0.25); } } }
  // las velas del puesto de la derecha y su halo, y el resplandor del de las figuritas
  for (let k = 0; k < 6; k++) { const x = 232 + k * 13; rect(x, 110, x + 1, 116, hex('#f0e0b0')); b_llama(R, x, 109, t, k, 1); } b_halo(R, 266, 108, 40, P.llamaL, 0.22); b_halo(R, 54, 104, 44, P.llamaL, 0.16);
  b_llama(R, 54, 96, t, 9, 1.2);
  // el brasero de castañas con chispas y humo; reflejos en el empedrado
  for (let i = -4; i <= 4; i += 2) pset(300 + i, 146, Math.sin(t * 8 + i) > 0 ? P.llama : P.minio); b_halo(R, 300, 146, 16, P.llama, 0.22); b_humo(R, 300, 140, t, 5, 36, -6, hex('#6a6a80'));
  for (let k = 0; k < 4; k++) { const u = (t * 1.3 + k * 0.25) % 1; pset(Math.round(300 + Math.sin(k * 7 + t) * 3), Math.round(144 - u * 18), u < 0.6 ? P.llamaL : P.llama); }
  for (const [x, y] of [[54, 146], [266, 150], [160, 166]]) for (let i = 0; i < 5; i++) { const xx = x + Math.round(Math.sin(t * 2 + i * 1.7) * 10), yy = y + i * 3; if (Math.sin(t * 3 + i * 2) > 0) pset(xx, yy, hex('#a88a6a')); }
  // el perro bajo el mostrador, que mueve la cola
  { const x = 108, y = 136, g = hex('#8a6a4a'), gS = hex('#5a4430'); rect(x, y - 5, x + 8, y - 2, g); rect(x, y - 2, x + 8, y - 2, gS); disco(x + 10, y - 6, 2.5, g); pset(x + 12, y - 5, P.k); pset(x + 11, y - 7, P.k); pset(x + 9, y - 9, gS); for (const dx of [1, 7]) rect(x + dx, y - 1, x + dx, y, gS); const c = Math.round(Math.sin(t * 9) * 2); linea(x - 1, y - 5, x - 3, y - 7 + c, gS); }
  return { suelo: 162, acera: [129, 137], puestoFiguritas: [8, 96, 100, 128], puestoVelas: [220, 96, 312, 128], arco: [130, 74, 190, 128], puerta: [204, 98, 216, 128], brasero: [300, 146], luna: [198, 26], libre: [20, 290] };
}

function b_banquete(R, t, o) {
  const { rect, pset, linea, disco } = R, P = b_P;
  b_fijo(R, 'roma:banquete', () => {
    for (let y = 0; y <= 14; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 14 ? P.k : x % 36 < 6 ? (y === 13 ? P.maderaS : hex('#3a2418')) : (y & 3) === 1 && h(x >> 2, y, 470) < 0.4 ? hex('#2e1c12') : hex('#2a1810'));
    // la pared pompeyana del pórtico, de noche (zona alta, paneles rojos y negros, zócalo)
    for (let y = 15; y <= 152; y++) for (let x = 0; x < 320; x++) { let c; const v = x % 80;
      if (y <= 18) c = [P.estucoL, P.estuco, P.estucoS, P.estucoD][y - 15]; else if (y <= 44) c = y === 44 ? P.ocreP : P.estucoL;
      else if (y <= 128) c = v < 10 ? (v === 5 && y % 8 < 5 ? P.ocreP : P.negroP) : ((v === 16 || v === 74) && y >= 52 && y <= 120) || ((y === 52 || y === 120) && v >= 16 && v <= 74) ? P.ocreP : P.rojoP;
      else c = y === 129 ? P.ocreP : P.negroP;
      const n = h(x >> 2, y >> 2, 471); if (n < 0.22 && b_umbral(x, y) < 0.45) c = b_mezcla(c, P.k, 0.15); pset(x, y, b_mezcla(c, hex('#1a1430'), 0.35)); }
    // la ventana encendida (izquierda) y la puerta con luz (derecha)
    rect(34, 58, 64, 92, P.k); for (let y = 59; y <= 91; y++) for (let x = 35; x <= 63; x++) pset(x, y, b_mezcla(P.llamaL, P.llama, (y - 59) / 40)); rect(49, 59, 49, 91, P.k); rect(35, 75, 63, 75, P.k); rect(32, 92, 66, 95, P.marmolS);
    for (const x of [28, 66]) { rect(x - 3, 58, x + 3, 92, b_mezcla(P.verdeP, P.k, 0.3)); for (let y = 60; y < 92; y += 4) rect(x - 2, y, x + 2, y, b_mezcla(P.verdeP, P.k, 0.55)); }
    rect(250, 54, 286, 152, P.k); for (let y = 55; y <= 152; y++) for (let x = 251; x <= 285; x++) pset(x, y, y > 140 ? hex('#8a5a3a') : b_mezcla(hex('#ffd890'), hex('#c87840'), Math.min(1, Math.hypot(x - 268, y - 100) / 50)));
    rect(248, 50, 288, 54, P.marmolS); rect(248, 50, 288, 50, P.marmol);
    for (const x of [251, 285]) rect(x, 55, x, 152, b_mezcla(P.madera, P.k, 0.4));
    // cuadritos pintados en el centro de los paneles (un pájaro, un jarrón, una guirnalda) y la hornacina del lárario
    for (const [cx, k] of [[120, 0], [200, 1], [40, 2]]) { if (k === 2) continue; rect(cx - 13, 92, cx + 13, 112, P.k); rect(cx - 12, 93, cx + 12, 111, b_mezcla(P.estucoL, hex('#1a1430'), 0.3));
      if (k === 0) { R.linea(cx - 9, 106, cx + 9, 101, b_mezcla(P.maderaS, hex('#1a1430'), 0.3)); disco(cx, 100, 3, b_mezcla(hex('#4a7aa8'), hex('#1a1430'), 0.3)); pset(cx + 3, 99, P.ocreP); pset(cx - 4, 101, b_mezcla(hex('#4a7aa8'), hex('#1a1430'), 0.3)); for (const d of [-6, 5]) pset(cx + d, 104, P.verdeP); }
      else { rect(cx - 3, 98, cx + 3, 107, b_mezcla(P.barro, hex('#1a1430'), 0.3)); rect(cx - 2, 96, cx + 2, 98, b_mezcla(P.barro, hex('#1a1430'), 0.3)); for (const d of [-5, 5]) { pset(cx + d, 100, P.verdeP); pset(cx + d, 102, b_mezcla(P.rojoPL, hex('#1a1430'), 0.2)); } } }
    rect(160 - 15, 74, 160 + 15, 110, P.k); for (let y = 75; y <= 110; y++) for (let x = 146; x <= 174; x++) if (y > 86 || (x - 160) ** 2 + (y - 86) ** 2 <= 196) pset(x, y, b_mezcla(hex('#5a3a2a'), hex('#1a1430'), 0.4));
    R.poligono([[142, 76], [160, 66], [178, 76]], b_mezcla(P.marmolS, hex('#1a1430'), 0.3)); rect(142, 110, 178, 113, b_mezcla(P.marmolS, hex('#1a1430'), 0.3));
    for (const [x, c] of [[152, P.bronce], [160, P.bronceL], [168, P.bronce]]) { rect(x - 1, 100, x + 1, 109, c); disco(x, 98, 1.6, c); }
    // una antorcha en la pared y un estante con jarras
    rect(212, 70, 214, 92, P.maderaD); rect(209, 66, 217, 70, P.bronceS);
    rect(96, 66, 150, 68, P.k); rect(97, 66, 149, 67, b_mezcla(P.maderaL, P.k, 0.2)); for (const [x, c] of [[102, P.barro], [114, P.barroL], [128, P.bronce], [140, P.barroS]]) { rect(x, 58, x + 7, 65, P.k); rect(x + 1, 59, x + 6, 65, c); rect(x + 2, 56, x + 5, 58, c); pset(x + 2, 60, P.blanco); }
  });
  // las guirnaldas con lámparas que se mecen
  for (const [x0, x1, k] of [[0, 120, 0], [120, 250, 1], [250, 320, 2]]) { const sw = Math.sin(t * 1.1 + k) * 1.4;
    for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), y = Math.round(22 + Math.sin(u * Math.PI) * (14 + sw)); pset(x, y, P.hiedraS); pset(x, y - 1, (x & 1) ? P.hiedra : P.hiedraS); pset(x, y + 1, x % 3 ? P.hiedra : P.hiedraL); if (x % 7 === 0) { pset(x, y + 2, P.minio); } }
    const lx = Math.round((x0 + x1) / 2 + sw * 2), ly = 22 + 14 + Math.round(sw) + 3; linea((x0 + x1) / 2, ly - 3, lx, ly, P.k); rect(lx - 3, ly, lx + 3, ly + 2, P.bronce); rect(lx - 3, ly, lx + 3, ly, P.bronceL); b_llama(R, lx + 3, ly - 1, t, k * 2, 1); b_halo(R, lx, ly, 20, P.llamaL, 0.2); }
  b_llama(R, 213, 65, t, 8, 2); b_halo(R, 213, 62, 26 + Math.sin(t * 7) * 2, P.llamaL, 0.22);
  // la gente que baila en la puerta encendida (siluetas)
  R.recorte([251, 55, 285, 152]);
  for (let k = 0; k < 3; k++) { const x = 258 + k * 10 + Math.round(Math.sin(t * 2 + k * 2) * 3), y = 140 - (Math.abs(Math.sin(t * 4 + k)) > 0.7 ? 2 : 0); b_figura(R, x, y, t, k, { tun: hex('#5a3022'), brazo: Math.sin(t * 3 + k) > 0, oscuro: 0.75 }); }
  R.recorte(null);
  b_llama(R, 160, 104, t, 12, 0.8); b_halo(R, 160, 100, 12, P.llamaL, 0.25);
  return { suelo: 156, mesa: 152, sitios: [110, 160, 210], ventana: [34, 58, 64, 92], puerta: [251, 55, 285, 152], antorcha: [213, 62] };
}

// delante en el banquete: la mesa con el mantel y la comida (lo alto queda entre los sitios x 110, 160 y 210)
function b_mesaBanquete(R, t, o) {
  const { rect, pset, linea, disco } = R, P = b_P;
  rect(0, 151, 319, 151, P.k);
  for (let y = 152; y <= 160; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 152 ? P.blanco : (x + y * 2) % 23 === 0 ? hex('#d8ccb4') : hex('#ece2cc'));
  for (let y = 161; y < 180; y++) for (let x = 0; x < 320; x++) { const pl = Math.sin(x * 0.25 + Math.sin(x * 0.05) * 2); let c = y === 161 ? hex('#c8bca4') : pl > 0.7 ? hex('#f4ecd8') : pl < -0.6 ? hex('#c8bca4') : hex('#e4d8c0');
    if (y >= 167 && y <= 171) c = y === 167 || y === 171 ? P.oroS : (x % 6 < 3 ? P.purpura ?? hex('#6a2a6a') : hex('#8a3a8a')); if (y >= 177 && x % 3 === 0) c = hex('#b8ac94'); pset(x, y, c); }
  // velas altas (izquierda y derecha)
  for (const [x, k] of [[38, 0], [44, 1], [296, 2]]) { rect(x - 1, 130 + k * 3, x + 1, 152, hex('#f0e0b0')); rect(x - 1, 130 + k * 3, x - 1, 152, P.blanco); b_llama(R, x, 129 + k * 3, t, k + 10, 1.2); b_halo(R, x, 126, 18, P.llamaL, 0.2); } rect(34, 150, 48, 153, P.bronceS); rect(292, 150, 300, 153, P.bronceS);
  // pan, uvas, higos
  for (const x of [62, 78]) { disco(x, 150, 7, P.k); disco(x, 150, 6, hex('#c88a3a')); disco(x - 1, 148, 4, hex('#e0a858')); for (let a = 0; a < 8; a++) linea(x, 150, x + Math.cos(a * 0.785) * 6, 150 + Math.sin(a * 0.785) * 5, hex('#9a5e24')); }
  rect(86, 152, 102, 154, P.bronceS); for (let k = 0; k < 9; k++) disco(90 + (k % 3) * 3 + (k > 5 ? 1 : 0), 146 + Math.floor(k / 3) * 2, 1.6, k % 2 ? hex('#5a2a6a') : hex('#7a3a8a')); pset(92, 143, P.hiedra); disco(98, 151, 2, hex('#6a3a2a'));
  // la jarra de bronce (entre los sitios 110 y 160) y una copa
  { const x = 135; disco(x, 146, 5, P.k); disco(x, 146, 4, P.bronce); rect(x - 2, 136, x + 2, 142, P.k); rect(x - 1, 136, x + 1, 142, P.bronce); rect(x - 3, 134, x + 3, 136, P.bronce); pset(x - 1, 144, P.bronceL); pset(x - 2, 145, P.bronceL); linea(x + 3, 138, x + 6, 144, P.bronceS); rect(x - 4, 151, x + 4, 152, P.bronceS); }
  // nueces, pasteles de miel y las figuritas de barro (bajo, delante del sitio 160)
  rect(146, 152, 176, 154, P.bronceS); for (let k = 0; k < 7; k++) disco(150 + k * 4, 150, 1.6, k % 2 ? hex('#8a5a2a') : hex('#a8743c')); for (const x of [168, 173]) { rect(x - 2, 148, x + 2, 151, hex('#d8a040')); pset(x, 148, P.oroL); }
  for (const [x, k] of [[184, 0], [190, 1], [196, 2]]) { const c = [P.barro, P.barroL, hex('#d8a878')][k]; rect(x, 148, x + 2, 152, c); disco(x + 1, 146, 1.5, c); pset(x + 1, 146, P.k); if (k === 1) { rect(x - 1, 150, x + 3, 151, c); } }
  // un ánfora pequeña y copas (entre 160 y 210, y a la derecha)
  { const x = 236; disco(x, 144, 6, P.k); disco(x, 144, 5, P.barro); disco(x - 2, 142, 2, P.barroL); rect(x - 2, 134, x + 2, 139, P.barro); rect(x - 3, 133, x + 3, 134, P.barroS); linea(x - 4, 136, x - 5, 141, P.barroS); linea(x + 4, 136, x + 5, 141, P.barroS); rect(x - 2, 150, x + 2, 153, P.barroS); }
  for (const x of [120, 222, 280]) { rect(x - 2, 146, x + 2, 148, P.bronce); rect(x - 2, 146, x + 2, 146, P.bronceL); rect(x, 149, x, 151, P.bronceS); rect(x - 2, 152, x + 2, 152, P.bronceS); }
  // el ave asada que humea
  { const x = 260; rect(x - 10, 152, x + 10, 154, P.marmolS); disco(x, 148, 6, P.k); disco(x, 148, 5, hex('#b8743a')); disco(x - 2, 146, 2.5, hex('#d8944a')); linea(x + 5, 148, x + 8, 144, hex('#b8743a')); pset(x + 8, 143, P.blanco); b_humo(R, x, 140, t, 6, 18, 2, hex('#e8e4e0')); }
  // el gato que asoma bajo el mantel
  { const v = Math.sin(t * 0.7); if (v > 0.2) { const y = 180 - Math.round(Math.min(1, (v - 0.2) * 3) * 5), g = hex('#6a6a7a'); disco(10, y, 3, g); pset(8, y - 3, g); pset(12, y - 3, g); pset(9, y - 1, P.oro); pset(11, y - 1, P.oro); } }
}

function b_mira(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = b_P;
  const F = b_fijo(R, 'roma:mira', (foto) => {
    b_degradado(R, 0, 0, 319, 100, [hex('#0a0e2a'), hex('#121a40'), hex('#1c2652'), hex('#2a3464'), hex('#3a4274')]);
    for (let j = -18; j <= 18; j++) for (let i = -18; i <= 18; i++) { const d = Math.hypot(i, j); if (d > 9 && d < 18 && b_umbral(150 + i, 34 + j) < (18 - d) / 14) pset(150 + i, 34 + j, hex('#3a4680')); }
    disco(150, 34, 8, hex('#f4f0dc')); disco(152, 32, 1.6, hex('#d4d0bc')); disco(147, 36, 1.2, hex('#d4d0bc')); disco(153, 37, 0.8, hex('#d4d0bc'));
    foto('cielo');
    // el monte con las tumbas licias excavadas en la roca
    for (let x = 0; x < 320; x++) { const hy = x < 120 ? Math.round(62 + Math.abs(Math.sin(x * 0.045)) * 4 + x * 0.22) : Math.round(88 + Math.sin(x * 0.05) * 3); for (let y = hy; y <= 100; y++) pset(x, y, y === hy ? hex('#5a628a') : (h(x >> 1, y >> 1, 480) < 0.15 ? hex('#3a4064') : hex('#444a70'))); }
    for (const [x, y] of [[14, 74], [30, 70], [46, 76], [62, 80]]) { rect(x, y, x + 10, y + 9, hex('#2a2e4a')); R.poligono([[x - 1, y], [x + 5, y - 4], [x + 12, y]], hex('#6a7298')); rect(x + 1, y + 1, x + 9, y + 1, hex('#6a7298')); for (const c of [x + 1, x + 8]) rect(c, y + 1, c + 1, y + 9, hex('#7a82a8')); rect(x + 4, y + 3, x + 6, y + 9, hex('#181a30')); }
    // el mar con su reflejo
    for (let y = 100; y <= 124; y++) for (let x = 0; x < 320; x++) pset(x, y, ((x * 3 + y * 7) % 17 === 0) ? hex('#2e3a6a') : y < 104 ? hex('#1e2a56') : hex('#18224a'));
    foto('mar');
    // casitas encaladas de la ladera, con alguna ventana
    for (const [x0, y0, w, hh] of [[96, 104, 18, 12], [116, 108, 14, 10], [176, 106, 16, 12], [132, 112, 20, 12], [156, 110, 12, 10], [104, 114, 14, 12]]) { rect(x0, y0, x0 + w, y0 + hh, P.calNS); rect(x0, y0, x0 + w - 3, y0 + hh, P.calN); rect(x0 - 1, y0 - 1, x0 + w + 1, y0, P.calNL); rect(x0 + 3, y0 + 4, x0 + 5, y0 + 7, P.k); }
    // el olivo
    rect(166, 114, 169, 150, hex('#3a3040')); linea(168, 124, 160, 116, hex('#3a3040')); linea(168, 120, 176, 112, hex('#3a3040'));
    // la iglesia pequeña: muro de sillares encalado, el tejado, la cruz, la puerta y las ventanas
    for (let y = 72; y <= 150; y++) for (let x = 18; x <= 110; x++) { const fila = Math.floor((y - 72) / 6), junta = (y - 72) % 6 === 5 || (x + fila * 8) % 16 === 0; pset(x, y, x > 98 ? P.calNS : junta ? hex('#8890b8') : h(x >> 1, y >> 1, 481) < 0.1 ? hex('#b8c0dc') : P.calN); }
    poligono([[12, 74], [64, 48], [116, 74]], P.k); poligono([[16, 73], [64, 51], [112, 73]], hex('#6a3a3a')); for (let y = 54; y < 73; y += 3) linea(64 - (y - 51) * 2.2, y, 64 + (y - 51) * 2.2, y, hex('#4a2a2e')); poligono([[24, 72], [64, 56], [104, 72]], P.calNL);
    poligono([[30, 71], [64, 58], [98, 71]], P.calN); disco(64, 64, 3, P.k); disco(64, 64, 2, hex('#e8b860'));
    rect(63, 38, 65, 50, P.k); rect(59, 41, 69, 43, P.k); rect(64, 39, 64, 49, P.calNL); rect(60, 42, 68, 42, P.calNL);
    rect(52, 116, 76, 150, P.k); disco(64, 116, 12, P.k); for (let y = 105; y <= 150; y++) for (let x = 53; x <= 75; x++) if (y >= 116 || (x - 64) ** 2 + (y - 116) ** 2 <= 121) pset(x, y, x < 64 ? b_mezcla(P.madera, P.k, 0.35) : hex('#e8a850'));
    linea(64, 105, 64, 150, P.k);
    for (const x of [30, 90]) { rect(x - 3, 92, x + 3, 106, P.k); disco(x, 92, 3, P.k); }
    rect(14, 150, 114, 152, P.calNS);
    // el pozo
    disco(132, 146, 9, P.k); rect(123, 140, 141, 152, P.k); rect(124, 141, 140, 151, P.piedraN); for (let x = 124; x < 141; x += 4) rect(x, 141, x, 151, P.piedraNS); rect(124, 141, 140, 141, P.calNL); rect(126, 124, 127, 140, P.maderaD); rect(137, 124, 138, 140, P.maderaD); rect(125, 123, 140, 124, P.maderaD);
    // la casa pobre: revoque caído con piedras, vigas que asoman, la puerta torcida y la ventana
    for (let y = 92; y <= 160; y++) for (let x = 186; x <= 296; x++) { const n = h(x >> 3, y >> 3, 482), piedra = n < 0.2 || (n < 0.3 && h(x >> 2, y >> 2, 483) < 0.5);
      let c = piedra ? (((x + (y >> 2) * 5) % 8 === 0 || (y & 3) === 0) ? P.piedraNS : P.piedraN) : (h(x >> 1, y >> 1, 484) < 0.12 ? P.calNS : P.calN); if (x > 288) c = b_mezcla(c, P.k, 0.25); if (y > 152 && b_umbral(x, y) < 0.4) c = b_mezcla(c, hex('#4a4a5a'), 0.4); pset(x, y, c); }
    rect(184, 89, 298, 92, P.calNL); rect(184, 92, 298, 92, P.calNS); for (let x = 192; x < 296; x += 14) { rect(x, 93, x + 3, 95, P.maderaD); pset(x, 93, P.madera); }
    rect(200, 82, 214, 89, b_mezcla(P.barro, P.k, 0.4)); disco(207, 82, 4, b_mezcla(P.barro, P.k, 0.4)); rect(240, 84, 270, 89, b_mezcla(P.paja ?? hex('#c8a85a'), P.k, 0.5));
    rect(261, 126, 281, 160, P.k); for (let y = 127; y <= 160; y++) for (let x = 262; x <= 280; x++) pset(x, y, (x - 262) % 5 === 0 ? P.maderaD : b_mezcla(P.madera, P.k, 0.4)); linea(262, 140, 280, 138, P.maderaD); pset(276, 144, P.bronce);
    rect(211, 123, 233, 142, P.k); for (let y = 124; y <= 141; y++) for (let x = 212; x <= 232; x++) pset(x, y, hex('#2a1a14'));
    rect(209, 142, 235, 145, P.k); rect(210, 142, 234, 143, P.calNL); rect(210, 144, 234, 144, P.calNS);
    poligono([[200, 122], [211, 124], [211, 142], [200, 145]], P.k); poligono([[201, 124], [210, 125], [210, 141], [201, 143]], b_mezcla(P.madera, P.k, 0.35)); linea(204, 126, 204, 141, P.maderaD);
    // la casa de la derecha, más alta (deja la esquina de Atom al cielo)
    for (let y = 60; y <= 160; y++) for (let x = 298; x < 320; x++) pset(x, y, (y - 60) % 7 === 6 ? P.calNS : P.calN); rect(296, 58, 319, 60, P.calNL); rect(304, 80, 310, 88, P.k);
    // la calle de tierra y piedras a la luz de la luna, y el murete con la pita
    for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { if (y <= 160 && x >= 186) continue; const n = h(x >> 2, y >> 1, 485); pset(x, y, n < 0.15 ? hex('#5a5870') : n > 0.9 ? hex('#8a88a0') : (x + y) % 11 === 0 ? hex('#3e3c52') : hex('#4e4c64')); }
    for (let y = 164; y < 180; y++) for (let x = 0; x <= 28 - (179 - y); x++) pset(x, y, (y % 4 === 0 || (x + (y >> 2) * 5) % 9 === 0) ? P.piedraNS : P.piedraN);
  });
  const cie = b_ps(R, F.mk.cielo), mar = b_ps(R, F.mk.mar);
  b_estrellas(cie, t, 90, 96, 486, [hex('#2a3264'), hex('#8a92c8'), hex('#ffffff')]);
  for (const [x0, y, w, v] of [[0, 22, 40, 1.3], [200, 50, 30, 2.2], [100, 70, 22, 3.1]]) b_nube(cie, ((x0 + t * v) % 420) - 50, y, w, [hex('#232c5a'), hex('#3a4476'), hex('#7a84b8')]);
  // el reflejo de la luna en el mar, que riela, y la barca con su farol
  for (let y = 101; y <= 124; y++) { const w = 2 + (y - 100) * 0.35; for (let i = -Math.round(w); i <= w; i++) if (Math.sin(t * 3 + y * 1.7 + i * 0.9) > 0.35) mar(150 + i + Math.round(Math.sin(t * 2 + y) * 1.5), y, (y & 1) ? hex('#c8d0f0') : hex('#8a96d0')); }
  for (let k = 0; k < 18; k++) { const x = Math.floor(h(k, 1, 487) * 320), y = 101 + Math.floor(h(k, 2, 487) * 22), u = Math.sin(t * 1.4 + k); if (u > 0.3) { mar(x, y, hex('#3a4a80')); mar(x + 1, y, hex('#3a4a80')); } }
  { const bx = Math.round(118 + Math.sin(t * 0.15) * 20), by = 108 + Math.round(Math.sin(t * 1.6) * 0.6); mar(bx - 5, by, P.k); for (let i = -4; i <= 4; i++) mar(bx + i, by + 1, hex('#3a2a2a')); for (let i = -3; i <= 3; i++) mar(bx + i, by + 2, hex('#2a1e1e')); mar(bx, by - 1, P.k); mar(bx, by - 2, P.k); mar(bx + 1, by - 3, Math.sin(t * 8) > -0.5 ? P.llamaL : P.llama); mar(bx + 1, by + 3, hex('#8a6a3a')); }
  // la copa del olivo, que se mece (plata por arriba)
  for (let k = 0; k < 60; k++) { const a = h(k, 1, 488) * Math.PI * 2, r = Math.sqrt(h(k, 2, 488)) * 15, sw = Math.round(Math.sin(t * 1.4 + k * 0.4) * 1.2 * (r / 13)), x = Math.round(168 + Math.cos(a) * r * 1.3 + sw), y = Math.round(112 + Math.sin(a) * r * 0.7);
    rect(x - 2, y - 1, x + 2, y + 1, hex('#2e3e3e')); pset(x - 1, y - 1, k % 3 ? hex('#5a6e6a') : hex('#8a9ca0')); }
  // las luces: la puerta de la iglesia, sus ventanas, la ventana de la casa pobre (tenue, temblorosa)
  { const f = 0.85 + Math.sin(t * 7) * 0.1 + Math.sin(t * 13) * 0.05; for (const x of [30, 90]) { rect(x - 2, 92, x + 2, 106, b_mezcla(hex('#e8a850'), P.k, 1 - f * 0.8)); pset(x, 90, b_mezcla(hex('#e8a850'), P.k, 1 - f * 0.8)); }
    b_halo(R, 68, 132, 22 * f, hex('#ffd890'), 0.22); }
  { const f = 0.5 + Math.sin(t * 5.3) * 0.15 + Math.sin(t * 11) * 0.08; for (let y = 124; y <= 141; y++) for (let x = 212; x <= 232; x++) { const d = Math.hypot(x - 226, y - 136) / 18; if (b_umbral(x, y) < f * (1 - d) * 1.4) pset(x, y, d < 0.35 ? hex('#c88a44') : hex('#7a4a2a')); } pset(226, 135, Math.sin(t * 9) > 0 ? P.llamaL : P.llama); b_halo(R, 222, 150, 14, hex('#c88a44'), 0.12 * f * 2); }
  // el gato del tejado, la lechuza de la iglesia
  { const u = (t % 18) / 18, x = Math.round(190 + u * 100), y = 88, p = Math.floor(t * 4) & 1, g = hex('#2a2a3a'); if (u < 1) { rect(x, y - 3, x + 5, y - 1, g); rect(x + 5, y - 5, x + 7, y - 3, g); pset(x + 5, y - 6, g); pset(x + 7, y - 6, g); pset(x + 6, y - 4, P.oro); pset(x + (p ? 1 : 0), y, g); pset(x + (p ? 4 : 5), y, g); linea(x - 1, y - 3, x - 3, y - 6 + p, g); } }
  { const g = hex('#6a5a5a'), y = 44; rect(70, y - 4, 73, y, g); pset(70, y - 5, g); pset(73, y - 5, g); const parp = Math.sin(t * 0.9) > 0.95; pset(71, y - 3, parp ? g : P.oro); pset(72, y - 3, parp ? g : P.oro); }
  return { suelo: 160, ventana: [212, 124, 232, 141], alfeizar: 142, puertaCasa: [262, 127, 280, 160], iglesia: [12, 38, 116, 152], puertaIglesia: [53, 105, 75, 150], pozo: [132, 140], olivo: [168, 112], luna: [150, 34], horizonte: 100, mar: [0, 100, 319, 124], libre: [140, 300] };
}

function b_ventana(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = b_P;
  b_fijo(R, 'roma:ventana', () => {
    // la habitación pobre por dentro: pared de adobe en penumbra, el estante con la lucerna, ropa tendida, esteras, el cántaro
    for (let y = 38; y <= 138; y++) for (let x = 108; x <= 212; x++) { const d = Math.hypot(x - 186, y - 76) / 90; let c = b_mezcla(hex('#8a5a3a'), hex('#1e1418'), Math.min(1, d * 1.3)); if (h(x >> 2, y >> 2, 490) < 0.12) c = b_mezcla(c, P.k, 0.2); pset(x, y, c); }
    rect(170, 84, 206, 86, P.maderaD); rect(170, 84, 206, 84, P.madera);
    rect(176, 78, 181, 83, b_mezcla(P.barro, P.k, 0.3)); disco(196, 80, 4, b_mezcla(P.barroS, P.k, 0.3));
    linea(108, 58, 212, 62, hex('#3a2a20'));
    for (const [x, c, l] of [[124, '#6a4a6a', 14], [136, '#6a7a8a', 12], [150, '#8a6a3a', 16]]) { rect(x, 59, x + 6, 59 + l, b_mezcla(hex(c), P.k, 0.45)); rect(x + 1, 59 + l, x + 4, 61 + l, b_mezcla(hex(c), P.k, 0.55)); }
    rect(112, 112, 160, 120, b_mezcla(hex('#a8885a'), P.k, 0.55)); for (let x = 112; x < 160; x += 3) rect(x, 112, x, 120, b_mezcla(hex('#a8885a'), P.k, 0.7));
    disco(198, 124, 8, b_mezcla(P.barro, P.k, 0.5)); rect(195, 112, 201, 116, b_mezcla(P.barro, P.k, 0.5));
    // la pared encalada a la luz de la luna (con grietas, piedras que asoman y la mancha de humedad)
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 108 && x <= 212 && y >= 38 && y <= 138) continue; const n = h(x >> 3, y >> 3, 491), m = h(x >> 2, y >> 2, 492); let c;
      const cae = b_desconchon(x, y), fila = Math.floor(y / 5), junta = y % 5 === 4 || (x + fila * 6 + Math.floor(h(fila, x >> 3, 498) * 3)) % 11 === 0;
      if (cae > 0) c = cae < 0.12 ? P.calND : junta ? hex('#3e4262') : h(Math.floor((x + fila * 6) / 11), fila, 499) < 0.4 ? P.piedraNS : P.piedraN;
      else { c = m < 0.18 && b_umbral(x, y) < 0.5 ? b_mezcla(P.calN, P.calNS, 0.5) : (h(x, y, 493) < 0.03 ? P.calNL : P.calN); if (h(x >> 1, 0, 500) < 0.08 && h(x >> 1, y >> 4, 501) < 0.5) c = b_mezcla(c, P.calNS, 0.35); if (cae > -0.1) c = P.calNL; }
      c = b_mezcla(c, P.k, Math.min(0.5, Math.max(0, (x - 220) / 260) + Math.max(0, (166 - y) < 0 ? 0.2 : 0))); if (y >= 166) c = (x + y) % 7 === 0 ? hex('#3e3c52') : hex('#4e4c64'); pset(x, y, c); }
    for (const [x, y, n] of [[60, 20, 18], [250, 100, 14], [90, 150, 10]]) { let xx = x, yy = y; for (let i = 0; i < n * 2; i++) { pset(xx, yy, P.calND); yy++; if (h(i, x, 494) < 0.45) xx += h(i, y, 495) < 0.5 ? -1 : 1; } }
    // el dintel de madera, las jambas y los postigos abiertos
    rect(98, 28, 222, 37, P.k); for (let y = 29; y <= 36; y++) for (let x = 99; x <= 221; x++) pset(x, y, y === 29 ? P.maderaL : (x + y * 7) % 13 === 0 ? P.maderaD : b_mezcla(P.madera, hex('#2a2a4a'), 0.3));
    for (const [x0, x1] of [[104, 107], [213, 216]]) rect(x0, 38, x1, 138, P.calNL);
    for (const [pts, d] of [[[[80, 34], [104, 40], [104, 136], [80, 144]], -1], [[[216, 40], [240, 34], [240, 144], [216, 136]], 1]]) { poligono(pts, P.k); const [a, b, c2, e] = pts; poligono([[a[0] + 1, a[1] + 2], [b[0] - 1, b[1] + 1], [c2[0] - 1, c2[1] - 1], [e[0] + 1, e[1] - 2]], b_mezcla(P.madera, hex('#2a2a4a'), 0.35));
      for (let k = 1; k < 4; k++) { const x = a[0] + (b[0] - a[0]) * k / 4; linea(x, Math.min(a[1], b[1]) + 4, x, Math.max(e[1], c2[1]) - 4, P.maderaD); } linea(a[0] + 2, 70 + d, b[0] - 2, 72, P.maderaD); linea(a[0] + 2, 110, b[0] - 2, 108, P.maderaD); }
    // la ristra de cebollas colgada de un clavo
    pset(262, 48, P.k); linea(262, 49, 262, 82, hex('#8a7a5a')); for (let k = 0; k < 7; k++) { const y = 54 + k * 4, x = 262 + (k % 2 ? 2 : -2); disco(x, y, 2.6, P.k); disco(x, y, 2, hex('#b8784a')); pset(x - 1, y - 1, hex('#e0a878')); }
    // la parra que sube por la izquierda
    linea(30, 179, 40, 120, hex('#4a3a2a')); linea(40, 120, 56, 60, hex('#4a3a2a')); linea(56, 60, 92, 30, hex('#4a3a2a'));
  });
  // la luz de la lucerna de dentro (tenue, temblorosa) y las hojas de la parra con el viento
  { const f = 0.7 + Math.sin(t * 5.3) * 0.15 + Math.sin(t * 11) * 0.08; R.recorte([108, 38, 212, 138]); b_halo(R, 179, 76, 46 * f, hex('#ffc070'), 0.3); R.recorte(null); b_lucerna(R, 184, 83, t, 3); }
  for (let k = 0; k < 22; k++) { const u = k / 22, bx = u < 0.5 ? 40 + (56 - 40) * u * 2 : 56 + (92 - 56) * (u - 0.5) * 2, by = u < 0.5 ? 120 - 60 * u * 2 : 60 - 30 * (u - 0.5) * 2, sw = Math.round(Math.sin(t * 1.8 + k * 0.7) * 1.5), x = Math.round(bx + (k % 2 ? 5 : -5) + sw), y = Math.round(by + (k % 3) * 2);
    rect(x - 2, y - 1, x + 2, y + 1, hex('#2e4a3a')); pset(x - 1, y - 1, hex('#4a6a4a')); pset(x, y - 2, hex('#2e4a3a')); if (k % 5 === 2) { disco(x + 1, y + 3, 1.5, hex('#4a2a5a')); pset(x, y + 2, hex('#7a5a8a')); } }
  // la sombra de una nube que pasa por la pared, y una polilla
  { const cx = ((t * 9) % 520) - 100; for (let y = 0; y < 166; y += 1) for (let x = Math.max(0, Math.round(cx - 40)); x <= Math.min(319, cx + 40); x++) { if (x >= 104 && x <= 216 && y >= 28 && y <= 144) continue; const d = Math.abs(x - cx) / 40 + Math.abs(y - 60) / 200; if (d < 1 && b_umbral(x, y) < (1 - d) * 0.6) { const c = R.pget(x, y); R.pset(x, y, b_mezcla(c, P.k, 0.12)); } } }
  { const u = (t % 20) / 20, x = Math.round(290 - u * 40), y = Math.round(150 - u * 70 + Math.sin(u * 12) * 3), p = Math.floor(t * 5) & 1, g = hex('#6a7a5a'); if (u < 1) { rect(x, y - 1, x + 4, y, g); pset(x - 1, y, g); pset(x - 2, y, P.k); linea(x + 5, y, x + 8, y + 2, g); pset(x + 1, y + 1 + p, g); pset(x + 3, y - 2 - p, g); pset(x + 1, y - 2 + p, g); pset(x + 3, y + 1 - p, g); } }   // una salamanquesa que sube por la pared
  { const a = t * 2.4, x = Math.round(176 + Math.cos(a) * 9), y = Math.round(72 + Math.sin(a * 1.4) * 6); pset(x, y, hex('#c8b8a0')); pset(x + (Math.sin(t * 30) > 0 ? 1 : -1), y - 1, hex('#e8dcc8')); }
  return { suelo: 142, hueco: [108, 38, 212, 138], alfeizar: 138, lucerna: [184, 83], estante: [170, 84, 206], fuera: { suelo: 180 }, postigos: [[80, 104], [216, 240]] };
}

// dónde se ha caído el revoque en la pared de la ventana: > 0 dentro de un desconchón (cerca de 0, su borde)
const b_DESC = [[40, 40, 26, 16], [262, 120, 30, 20], [70, 132, 22, 12], [300, 84, 12, 8], [150, 160, 30, 6]];

function b_desconchon(x, y) { let m = -9; for (const [cx, cy, rx, ry] of b_DESC) { const d = 1 - Math.hypot((x - cx) / rx, (y - cy) / ry) + (h(x >> 1, y >> 1, 502) - 0.5) * 0.25; if (d > m) m = d; } return m; }

// delante en la ventana: el alféizar de piedra con su maceta de albahaca y la pared de debajo (tapan a las hermanas de
// pecho para abajo); lo que se deje en el alféizar va DESPUÉS, encima (en y 138)
function b_alfeizar(R, t, o) {
  const { rect, pset, disco } = R, P = b_P, F = b_CACHE.get(R)?.['roma:ventana'];
  if (F) for (let y = 139; y < 180; y++) for (let x = 96; x <= 224; x++) R.pset(x, y, F.b[y * 320 + x]);
  rect(96, 136, 224, 148, P.k); for (let y = 137; y <= 147; y++) for (let x = 97; x <= 223; x++) pset(x, y, y <= 139 ? P.calNL : y === 147 ? P.calND : h(x >> 1, y, 496) < 0.12 ? P.calNS : P.piedraN);
  b_sombraR(R, 98, 148, 222, 151, 0.7);
  rect(198, 128, 210, 137, P.k); rect(199, 129, 209, 136, P.barro); rect(199, 129, 209, 129, P.barroL); rect(206, 130, 209, 136, P.barroS);
  for (let k = 0; k < 9; k++) { const x = 200 + Math.floor(h(k, 1, 497) * 9), y = 120 + Math.floor(h(k, 2, 497) * 8), s = Math.round(Math.sin(t * 2 + k) * 0.6); pset(x + s, y, k % 3 ? hex('#3a6a3a') : hex('#5a8a4a')); pset(x + s + 1, y, hex('#3a6a3a')); }
}
