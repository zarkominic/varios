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
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Personajes de pie en y = suelo (lo devuelve).
//   'imprenta': una imprenta de Nueva York de 1823: techo de viguetas, pared de cal con entramado, la prensa de madera de
//     tornillo en el centro (con su barra, la platina, el carro y la manivela), la mesa de entintar con las balas, las cajas
//     de tipos con sus cajetines, la chimenea de ladrillo con fuego (y un gato que duerme en el hogar), dos cuerdas con
//     pliegos que se secan y se mecen, un quinqué colgado que parpadea, un reloj de péndulo y, por la ventana, una calle
//     nevada al anochecer con fachadas de ladrillo, ventanas encendidas, un farol, gente y un coche de caballos que pasa.
//     o.tira 0–1: el impresor tira de la barra (la barra gira y la platina baja). Cámara 'prensa': la prensa de cerca, con
//     el tímpano abierto a la izquierda y el periódico recién impreso, grande (cabecera de barras con una estrella,
//     columnas y, en medio, el poema enmarcado con su grabado del trineo; sin letras); o.tinta 0–1: el brillo de la tinta
//     fresca que recorre la hoja. o.hoja: false para quitar el pliego del tímpano (si la escena lo saca).
//   'estudio': el estudio de un dibujante de hacia 1870: papel pintado verde con rombos, arrimadero de cuarterones,
//     alfombra, ventana con cortinas a una calle nevada de noche con farol de gas y gente que pasa, bocetos clavados en la
//     pared (caras redondas, un tigre, un Santa), un grabado enmarcado, un reloj de pared con péndulo, la estantería con
//     libros y un busto, la estufa de hierro con el tubo, el carbón y la tetera que echa vapor, un aplique de gas, un
//     perrito que duerme junto a la estufa; el tablero inclinado con el boceto va en epocaDelante. o.gordo 0–1: lo gordo
//     y risueño que está el Santa del boceto. Cámara 'tablero': el tablero de cerca a la derecha, con el Santa grande a
//     tinta (o.gordo), y a la izquierda un tendedero de postales antiguas con Santas de colores que se mecen;
//     o.postales: los colores, por omisión ['verde', 'rojo', 'marron', 'azul', 'morado', 'blanco']; o.quita: índices de
//     las postales que faltan; o.carteles 0–1: los carteles de 1931 (Santa rojo y una botella sin etiqueta) que van
//     llenando la pared uno a uno, por detrás del tendedero.
//   'windsor': el salón del castillo de Windsor en la Navidad de 1848: techo con cornisa dorada, papel de damasco rojo,
//     arrimadero blanco, la chimenea de mármol con el espejo dorado, el reloj y los candelabros, el ventanal con
//     cortinajes y la nieve de fuera, un retrato y un paisaje, apliques con velas, alfombra con cenefa y, en el centro, el
//     árbol sobre una mesa con mantel, lleno de velas encendidas, bolas, guirnaldas, cestitas, hombrecitos de jengibre y
//     un ángel; juguetes al pie (tambor, muñeca, caballito, cajas); un perrito spaniel que mueve la cola. Cámara 'arbol':
//     el árbol de cerca, grande, con la mesa de los juguetes. o.grabado 0–1 (en epocaDelante, encima de todo, actores
//     incluidos): la escena se vuelve una estampa de periódico en sepia con trama de líneas y su página alrededor
//     (márgenes con columnas de barras y el pie); o.revista: la misma estampa en la revista americana (otro tono y
//     cenefa de puntos).
//   'bosque': un bosque de abetos de Alsacia en 1521, de noche con nieve: cielo tramado con estrellas que titilan, la
//     luna y nubes de tres tonos a dos velocidades, Sélestat al fondo en su loma (muralla, tejados y el campanario, con
//     ventanas encendidas), tres filas de abetos nevados, la cabaña de los guardas con humo y ventana encendida, la
//     hoguera con chispas y su luz en la nieve, la cerca de estacas de los abetos jóvenes que se vigilan, huellas, un
//     búho que parpadea y nieve que cae. Cámara 'guardas': junto a la cerca, más cerca: troncos grandes, ramas cargadas
//     de nieve que se mecen, un brasero de hierro con fuego y su círculo de luz, un banco de tronco y el pueblo lejos
//     entre los árboles. epocaDelante: copos grandes por delante y, en 'guardas', las puntas de las ramas en las esquinas
//     de abajo.
//   'robledal': un robledal antiguo de noche: cielo tramado con luna y nubes, robles desnudos enormes con bolas de
//     muérdago en las ramas (una rama baja con una mata al alcance del druida; o.cortado la quita), un dolmen y un círculo
//     de piedras al fondo, hierba con raíces, helechos y hojas, dos bancos de niebla que se mueven a distinta velocidad,
//     un búho y hojas que caen. Cámara 'cocina': una cocina inglesa del siglo XVIII: vigas con hierbas, ristras y un
//     jamón, el hogar de ladrillo con el fuego, el asador que gira, el caldero que humea en su llar, cazos de cobre, el
//     aparador con platos de loza azul, una ventanita emplomada con nieve, suelo de losas, un gato junto al fuego y la
//     rama de muérdago colgada del techo en el centro (con lazo rojo; o.baya: 0–1, una baya que se suelta y cae).
//   'copista': un scriptorium medieval: bóveda de crucería, muros de sillares, un ventanal gótico con tracería y
//     vidrieras de colores y su haz de luz con motas, estantes con códices encadenados, un monje pequeño al fondo que
//     copia a la luz de una vela, el suelo de losas con juncos y un ratón que cruza; el atril del copista va en
//     epocaDelante. Cámara 'pagina': la página de cerca: un códice abierto sobre el atril, pergamino con renglones de
//     barras (sin letras) y rúbricas rojas, la orla de hojas y flores con puntos de oro, una vela, el tintero y la
//     pluma; o.ji 0–1 traza la gran ji dorada (primero el trazo \, luego el /, con su recuadro azul y rojo y los nudos),
//     y al terminar brilla.
// Delante: epocaDelante (los fardos y el cesto de la imprenta, el tablero del dibujante, el atril del copista, la mesa de la
// cocina, copos y ramas del bosque, el grabado de Windsor). Llámala después de los actores, con las mismas opciones.
// Devuelve la geometría del encuadre: { suelo, … } (puntos clave en coordenadas de pantalla; ver cada encuadre).
export function epoca(R, t, o = {}) {
  const enc = o.encuadre ?? 'imprenta', cam = o.camara ?? 'general';
  const f = { imprenta: c_imprenta, estudio: c_estudio, windsor: c_windsor, bosque: c_bosque, robledal: c_robledal, copista: c_copista }[enc] ?? c_imprenta;
  return f(R, t, o, cam);
}
// lo que va delante de los personajes en del siglo xvi al xix (se llama después de los actores, con las mismas opciones):
// 'imprenta' general: los fardos de periódicos atados (abajo a la izquierda) y el cesto de recortes (abajo a la derecha);
// 'estudio' general: el tablero inclinado del dibujante (x 143–211, tablero y 118–146, patas hasta y 160) con el boceto
// del Santa (o.gordo), la lámpara y los tinteros; 'robledal' cámara 'cocina': la esquina de la mesa con el pan, la
// jarra y el pastel (abajo a la izquierda, x 0–74, y ≥ 160); 'bosque': copos grandes y, en 'guardas', ramas en las
// esquinas de abajo; 'copista' general: el atril (x 160–204, tablero y 128–142) con el libro abierto, el tintero y la
// vela; 'windsor': si o.grabado > 0, la estampa en sepia sobre todo (actores incluidos) con su página.
export function epocaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'imprenta', cam = o.camara ?? 'general';
  if (enc === 'imprenta' && cam === 'general') c_imprentaDelante(R, t);
  else if (enc === 'estudio' && cam === 'general') c_tableroDibujante(R, t, o);
  else if (enc === 'robledal' && cam === 'cocina') c_mesaCocina(R, t);
  else if (enc === 'bosque') c_bosqueDelante(R, t, cam);
  else if (enc === 'copista' && cam === 'general') c_atril(R, t, o);
  if (enc === 'windsor' && (o.grabado ?? 0) > 0) c_grabado(R, t, Math.min(1, o.grabado), !!o.revista);
}
// ── D · La vuelta al mundo ──────────────────────────────────────────────────────────────────────────────────
export function mundo(R, t, o = {}) {
  const enc = o.encuadre ?? 'filipinas', cam = o.camara ?? 'general', f = d_PAISESMu[enc] ?? d_PAISESMu.filipinas;
  return f(R, t, o, cam);
}
// lo que va delante de los personajes en la vuelta al mundo (se llama después de los actores, con las mismas opciones):
// la valla de Gävle (con o.vallaDelante), la colina de Islandia (con o.colinaDelante), las macetas del primer término de
// México, la mesa catalana, el mostrador de Japón (cámara 'mostrador') y la parrilla de Australia (cámara 'parrilla')
export function mundoDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'filipinas', cam = o.camara ?? 'general', f = d_DELANTEMu[enc];
  if (f) f(R, t, o, cam);
}
// ── E · Hoy y el cierre ─────────────────────────────────────────────────────────────────────────────────────
// Cuatro encuadres, cada uno con dos cámaras del mismo detalle (o.camara: 'general' por omisión o la segunda):
//   'salon' (general): el salón de Atom en Nochebuena. Techo con cornisa, papel pintado verde de rayas y rombos (tranquilo
//     en la esquina de Atom), zócalo de cuarterones; la ventana con cortinas rojas y escarcha, por la que se ve la calle
//     nevada de noche (casas con luz, una farola, nieve que cae y un vecino con su perro que pasa, todo recortado al hueco);
//     la lámpara de pie; el abeto con espumillón, bolas, la estrella que brilla y luces que parpadean, con los regalos
//     debajo; dos cuadritos; la chimenea de ladrillo con su repisa (guirnalda de acebo, dos velas, un reloj), un paisaje
//     nevado encima, cuatro calcetines que se mecen, el fuego vivo con chispas y su luz que tiembla en el suelo; el gato
//     que duerme y respira en la alfombra trenzada; la mesita con el globo terráqueo que gira; el suelo de tablas.
//     Cámara 'mesa': la mesa de cerca (fondo: el abeto grande a la izquierda, la ventana nevada en medio y la chimenea a la
//     derecha); en hoyDelante, el tablero con su camino de mesa, el plato de galletas, la taza que humea y las cuatro
//     pistas con su «?» que flota (el traje rojo, la hoja del calendario con el 25, el abeto diminuto y la partitura);
//     o.pistas (por omisión, sí mientras no haya álbum); o.album 0–1: el álbum se abre (en 1, abierto con siete estampas:
//     Canterbury, el trineo del poema, la ji dorada, la cabra de paja, el Krampus, la posada y la trinchera con su arbolito).
//   'trineos' (general): Nueva Inglaterra, 1857, de día: cielo tramado con nubes de tres tonos a tres velocidades y
//     cuervos, colinas con pinares, el granero rojo, la granja con humo, la iglesia blanca con campanario, muros de piedra,
//     el camino nevado con roderas donde corren dos trineos de caballos con cascabeles (o.carrera false los quita; la pieza
//     e_trineo está exportada), vecinos al otro lado que saludan y nieve que cae. Cámara 'meta': la tribuna de tablas con
//     el público que vitorea y los banderines al viento, los dos postes de la meta con la cinta (o.cinta 0–1: rota) y un
//     trineo que cruza (o.cruce 0–1: dónde va; por omisión, en bucle; null o false: ninguno).
//   'espacio' (general): la órbita en diciembre de 1965: estrellas que titilan, la Vía Láctea, el sol con su destello, la
//     Tierra que gira abajo (océanos, tierras, nubes que avanzan, el lado de noche con luces de ciudades y la atmósfera en
//     el borde), la Gemini 6A (módulo negro de reentrada con sus ventanillas y el adaptador blanco) que se mece y echa
//     chorritos de los propulsores, y a lo lejos la Gemini 7. o.capsula [x, y] la mueve. Cámara 'cabina': la cabina por
//     dentro: paredes acolchadas, las dos ventanillas con la Tierra y las estrellas que pasan (recortadas), el panel de
//     techo con luces, la lista de comprobación en su pinza, el lápiz que flota atado, y los dos asientos eyectables.
//   'tregua' (general): la tierra de nadie nevada en la Navidad de 1914, sin armas ni heridos: cielo de invierno con
//     nubes y cuervos, árboles pelados y una granja en ruinas al fondo, la trinchera de enfrente con sacos terreros, faroles,
//     humo de los braseros y el arbolito con velas en el parapeto, gente pequeña que asoma y saluda, la alambrada lejana
//     abierta, la nieve con hoyos blandos, charcos helados, matas secas y pisadas que van hacia el centro. o.luz 'dia' (por
//     omisión) o 'tarde' (atardecer con las primeras estrellas: las velas lucen más). Cámara 'cerca': el centro de la tierra
//     de nadie a ras de nieve, con las dos trincheras lejos a los lados, un tronco roto y el balón (o.balon [x, y]; false:
//     ninguno).
// Delante: hoyDelante, con las mismas opciones, después de los actores (el sofá y la mesita; el tablero de la mesa; la
// cerca de troncos; los postes de la meta; el panel de mandos de la cabina; los sacos terreros con velas y el arbolito;
// las matas y la estaca de la cámara 'cerca'). Devuelve { suelo, … } con la geometría de cada encuadre.
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon', cam = o.camara ?? 'general';
  if (enc === 'trineos') return cam === 'meta' ? e_meta(R, t, o) : e_trineos(R, t, o);
  if (enc === 'espacio') return cam === 'cabina' ? e_cabina(R, t, o) : e_espacio(R, t, o);
  if (enc === 'tregua') return cam === 'cerca' ? e_treguaCerca(R, t, o) : e_tregua(R, t, o);
  return cam === 'mesa' ? e_salonMesa(R, t, o) : e_salon(R, t, o);
}
// lo que va delante de los personajes en hoy y el cierre (se llama después de los actores, con las mismas opciones)
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon', cam = o.camara ?? 'general';
  if (enc === 'trineos') return cam === 'meta' ? e_metaDelante(R, t, o) : e_cerca(R, t, o);
  if (enc === 'espacio') return cam === 'cabina' ? e_panelCabina(R, t, o) : undefined;
  if (enc === 'tregua') return cam === 'cerca' ? e_matasDelante(R, t, o) : e_parapeto(R, t, o);
  return cam === 'mesa' ? e_tablero(R, t, o) : e_sofaMesita(R, t, o);
}
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

// la paleta de los seis decorados del siglo XVI al XIX
const c_P = pal({
  techo: '#3a2c24', viga: '#5c3c24', vigaS: '#3c2616', vigaL: '#7e5634', vigaD: '#2a1a10',
  cal: '#dccbaa', calS: '#c8b48e', calL: '#e8dcc0', calD: '#a8916e',
  tabla: '#8a5a32', tablaS: '#704628', tablaL: '#a26e3e', tablaD: '#4a2c16',
  hierro: '#3a3a46', hierroS: '#24242c', hierroL: '#6c6c7c',
  pliego: '#f2ead6', pliegoS: '#d8ccaa', tinta: '#2a2420', tintaG: '#8c8678', tintaC: '#b8b0a0',
  dusk0: '#1e2650', dusk1: '#34407a', dusk2: '#5a5e98', dusk3: '#9a86a8', farol: '#ffd27a', farolL: '#fff2c0',
  ladr: '#9a4a36', ladrS: '#763628', ladrL: '#b4604a', junta: '#5e4a40', hollin: '#2a2020',
  fuego0: '#9a2a12', fuego1: '#d8541a', fuego2: '#f8a030', fuego3: '#ffe488',
  laton: '#d8a840', latonS: '#9a7020', latonL: '#f8e090', peltre: '#9aa0a8', peltreS: '#6a707a',
  papV: '#3e5440', papVS: '#35493a', papVL: '#4e6849', papVO: '#6a7a4c',
  cortina: '#6a1e24', cortinaS: '#4a1218', cortinaL: '#8e2c32',
  alfom: '#7a2a24', alfomS: '#5a1c18', alfomL: '#c89a4a', alfomA: '#2a3a5a',
  dam: '#8a1e2a', damS: '#701824', damL: '#9e2a38', dorado: '#d8aa48', doradoS: '#9a7428', doradoL: '#f4dc8a',
  blancoW: '#ece6da', blancoWS: '#c8c0b0', blancoWL: '#f8f4ec', parq: '#9a6a3a', parqS: '#7a5028', parqL: '#b4824a',
  abeto: '#285a3a', abetoS: '#1a3e28', abetoL: '#3e7a4a', abetoD: '#12301e',
  n0: '#0a0e26', n1: '#10183a', n2: '#18244e', n3: '#243462', n4: '#34467a',
  nubeN0: '#1a2244', nubeN1: '#2a3660', nubeN2: '#56669a', luna: '#f4f0d8', lunaS: '#cfc8a8',
  nieveN: '#bccae6', nieveNS: '#8494bc', nieveNL: '#e6eefc', nieveND: '#5c6a98',
  abN0: '#10262a', abN1: '#183a38', abNL: '#2c5650', abF: '#1e2e4a', abFL: '#2e4266', abFF: '#26365a',
  tronco: '#4a4650', troncoS: '#2e2c36', troncoL: '#76727e',
  muerd: '#8aa040', muerdS: '#58702a', muerdL: '#bed070', baya: '#f6f4e4',
  hierbaN: '#2e4636', hierbaNS: '#1e3226', hierbaNL: '#4a6a4e', piedra: '#6a6878', piedraS: '#46445a', piedraL: '#9a98aa',
  enc: '#e6dcc8', encS: '#cdc1a8', encL: '#f2ead8', losa: '#8a8478', losaS: '#6a645a', losaL: '#a8a294',
  cobre: '#c8703a', cobreS: '#8a4422', cobreL: '#f4a868', loza: '#e8ecf4', lozaA: '#3a5aa8',
  sill: '#a89a82', sillS: '#887c66', sillL: '#c2b69c', sillJ: '#5e5446',
  perg: '#efe0bc', pergS: '#dcc8a0', pergL: '#f8eed4', pergD: '#b8a074', tintaM: '#3a2418', rubr: '#a82820', azulI: '#2a4a9a', verdeI: '#2a7a4a',
  vitR: '#b02830', vitA: '#2a4aa0', vitV: '#2a8a4a', vitM: '#e8c040',
  sepia0: '#3a2a1c', sepia1: '#6a4e36', sepia2: '#a08460', sepia3: '#d4c09a', sepia4: '#f0e4c6',
  sepiaR0: '#2e2a26', sepiaR4: '#f4ead2',
});

const c_CACHE = new WeakMap();

// un fondo fijo: se pinta una sola vez por lienzo y clave en un búfer de R.nuevo() y luego se copia entero en cada fotograma
function c_fijo(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// mezcla dos colores (a = 0: c; a = 1: d)
const c_mezcla = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// tiñe un píxel hacia un color (respeta R.recorte, porque usa pset)
function c_tinte(R, x, y, col, a) { const c = R.pget(x, y); if (c) R.pset(x, y, c_mezcla(c, col, a)); }

// la trama ordenada de 4 × 4 (umbral de 0 a 1) y un color de una rampa tramada (v de 0 a 1)
const c_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_um = (x, y) => (c_BAYER[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const c_grad = (cols, v, x, y) => { const f = Math.max(0, Math.min(0.9999, v)) * (cols.length - 1), i = Math.floor(f); return cols[Math.min(cols.length - 1, i + (f - i > c_um(x, y) ? 1 : 0))]; };

// ruido suave (valor interpolado) de escala s
function c_ruido(x, y, s, k) { const fx = x / s, fy = y / s, ix = Math.floor(fx), iy = Math.floor(fy), u = fx - ix, v = fy - iy, a = h(ix, iy, k), b = h(ix + 1, iy, k), c = h(ix, iy + 1, k), d = h(ix + 1, iy + 1, k), su = u * u * (3 - 2 * u), sv = v * v * (3 - 2 * v); return a + (b - a) * su + (c - a) * sv + (a - b - c + d) * su * sv; }

// una pared de cal, yeso o piedra lisa: manchas grandes y pequeñas tramadas en tres tonos, motas y unas grietas finas
function c_yeso(R, x0, y0, x1, y1, [c, cS, cL, cD], k = 0, grietas = 3) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const v = c_ruido(x, y, 14, k) * 0.6 + c_ruido(x, y, 4, k + 1) * 0.4 + (c_um(x, y) - 0.5) * 0.16;
    R.pset(x, y, v < 0.3 ? cS : v > 0.72 ? cL : h(x, y, k + 2) < 0.012 ? cD : c);
  }
  for (let g = 0; g < grietas; g++) { let x = x0 + 10 + h(g, 1, k + 3) * (x1 - x0 - 20), y = y0 + 4 + h(g, 2, k + 3) * (y1 - y0) * 0.5;
    for (let s = 0; s < 12 + g * 3; s++) { R.pset(Math.round(x), Math.round(y), cD); if (s % 4 === 2) R.pset(Math.round(x) + 1, Math.round(y), cS); x += (h(g, s, k + 4) - 0.5) * 1.6; y += 1; } }
}

// suelo de tablas en perspectiva (punto de fuga fx, fy, por encima de y0): juntas que convergen, testas a tresbolillo,
// tablas de tres tonos, vetas, clavos y un brillo de la luz
function c_tablas(R, x0, x1, y0, y1, fx, fy, [c, cS, cL, cD], k = 0, anchoT = 6) {
  for (let y = y0; y <= y1; y++) { const z = y - fy, d = 260 / z;
    for (let x = x0; x <= x1; x++) {
      const u = (x - fx) / z * anchoT, bi = Math.floor(u), ub = Math.floor((x - 1 - fx) / z * anchoT), ri = Math.floor(d + h(bi, 0, k) * 3), rp = Math.floor(260 / (z - 1) + h(bi, 0, k) * 3);
      let col = h(bi, ri, k + 1) < 0.25 ? cS : h(bi, ri, k + 1) > 0.86 ? cL : c;
      const fu = u - bi; if (h(Math.floor(fu * 7), Math.floor(d * 9), k + bi) > 0.9) col = col === cS ? cD : cS;
      if (bi !== ub || ri !== rp) col = cD; else if ((fu < 0.08 || fu > 0.92) && h(bi, ri, k + 2) < 0.5 && Math.abs((d % 1) - 0.5) < 0.04) col = cD;
      R.pset(x, y, col);
    } }
  R.rect(x0, y0, x1, y0, cD);
}

// una viga de madera tendida (x0–x1, y0–y1): canto de luz, sombra, vetas y alguna fenda
function c_viga(R, x0, x1, y0, y1, k = 0, cs = [c_P.viga, c_P.vigaS, c_P.vigaL, c_P.vigaD]) {
  const [c, cS, cL, cD] = cs; R.rect(x0, y0, x1, y1, c); R.rect(x0, y0, x1, y0, cL); R.rect(x0, y1, x1, y1, cD); if (y1 - y0 > 3) R.rect(x0, y1 - 1, x1, y1 - 1, cS);
  for (let y = y0 + 1; y < y1 - 1; y++) { let x = x0 - Math.floor(h(y, 0, k) * 30); while (x < x1) { const L = 6 + Math.floor(h(x, y, k + 1) * 28); if (h(x, y, k + 2) < 0.55) R.rect(Math.max(x0, x), y, Math.min(x1, x + L), y, h(x, y, k + 3) < 0.25 ? cL : cS); x += L + 4 + Math.floor(h(x, y, k + 4) * 14); } }
  for (let x = x0 + 20; x < x1; x += 37 + Math.floor(h(x, 1, k) * 40)) R.rect(x, y0 + 2, x + 5, y0 + 2, cD);
}

// un poste de madera de pie (x, y0–y1, w de ancho): canto de luz a la izquierda, sombra a la derecha, vetas y clavijas
function c_poste(R, x, y0, y1, w = 7, k = 0, cs = [c_P.viga, c_P.vigaS, c_P.vigaL, c_P.vigaD]) {
  const [c, cS, cL, cD] = cs; R.rect(x, y0, x + w - 1, y1, c); R.rect(x, y0, x, y1, cL); R.rect(x + w - 1, y0, x + w - 1, y1, cD); R.rect(x + w - 2, y0, x + w - 2, y1, cS);
  for (let i = 1; i < w - 2; i++) { let y = y0 - Math.floor(h(i, 0, k) * 20); while (y < y1) { const L = 5 + Math.floor(h(i, y, k + 1) * 22); if (h(i, y, k + 2) < 0.5) R.rect(x + i, Math.max(y0, y), x + i, Math.min(y1, y + L), cS); y += L + 3 + Math.floor(h(i, y, k + 3) * 10); } }
  for (let y = y0 + 12; y < y1 - 4; y += 34) { R.pset(x + (w >> 1), y, cD); R.pset(x + (w >> 1) - 1, y - 1, cL); }
}

// paredes de ladrillo (x0–x1, y0–y1) a matajunta, con el canto de luz y alguno quemado o más claro
function c_ladrillos(R, x0, y0, x1, y1, k = 0, [c, cS, cL, cJ] = [c_P.ladr, c_P.ladrS, c_P.ladrL, c_P.junta], w = 8, a = 4) {
  R.rect(x0, y0, x1, y1, cJ);
  for (let f = Math.floor(y0 / a); f * a <= y1; f++) { const y = f * a, dx = f & 1 ? w >> 1 : 0;
    for (let xx = Math.floor((x0 - dx) / w) * w + dx; xx <= x1; xx += w) { const xa = Math.max(x0, xx), xb = Math.min(x1, xx + w - 2), ya = Math.max(y0, y), yb = Math.min(y1, y + a - 2); if (xb < xa || yb < ya) continue;
      const r = h(xx, y, k); R.rect(xa, ya, xb, yb, r < 0.2 ? cS : r > 0.85 ? cL : c); if (ya === y) R.rect(xa, ya, xb, ya, r > 0.85 ? c_P.calL : cL); if (r < 0.06) R.pset(xa + 2, yb, c_P.hollin); } }
}

// una llama de vela o de mecha (base en x, y) que tiembla; s: tamaño
function c_llama(R, x, y, t, k = 0, s = 1) {
  const a = Math.sin(t * 11 + k * 3.1) + Math.sin(t * 17.3 + k), dx = a > 1.1 ? 1 : a < -1.1 ? -1 : 0, alto = 2 + s + (Math.sin(t * 23 + k * 5) > 0.3 ? 1 : 0);
  for (let j = 0; j < alto; j++) { const xx = x + (j > alto / 2 ? dx : 0), c = j === 0 ? c_P.fuego2 : j < alto - 1 ? C.vela : C.blanco;
    R.pset(xx, y - 1 - j, j === alto - 1 ? c_P.fuego3 : c); if (s > 1 && j < alto - 2) { R.pset(xx - 1, y - 1 - j, c_P.fuego2); R.pset(xx + 1, y - 1 - j, c_P.fuego1); } }
}

// el resplandor de una luz: tiñe tramado un óvalo (rx, ry) hacia col con fuerza a, que se apaga hacia fuera
function c_halo(R, cx, cy, rx, ry, col, a) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d >= 1) continue; const f = a * (1 - d); if (f > c_um(cx + i, cy + j) * 0.5) c_tinte(R, cx + i, cy + j, col, Math.min(0.6, f)); }
}

// el fuego de un hogar: lenguas que suben y bailan sobre los troncos (cx: el centro, base: abajo, w: medio ancho) y chispas
function c_fuego(R, cx, base, w, t, k = 0, alto = 1) {
  const cols = [c_P.fuego0, c_P.fuego1, c_P.fuego2, c_P.fuego3, C.blanco];
  for (let i = -w; i <= w; i++) { const e = 1 - Math.abs(i) / (w + 1), hh = Math.max(1, Math.round((e * w * 1.5 + Math.sin(t * 9 + i * 1.7 + k) * 2 + h(i, Math.floor(t * 12), k) * 3) * alto));
    for (let j = 0; j < hh; j++) { const v = (1 - j / hh) * e * 1.25; R.pset(cx + i + (j > hh * 0.6 ? Math.round(Math.sin(t * 7 + i) * 0.6) : 0), base - j, cols[Math.min(4, Math.floor(v * 4.2))] ); } }
  for (let s = 0; s < 4; s++) { const u = (t * 0.9 + h(s, 1, k)) % 1, x = Math.round(cx + (h(s, 2, k) - 0.5) * w * 1.6 + Math.sin(t * 3 + s) * 2), y = Math.round(base - w * 1.2 - u * 14 * alto); if (u < 0.8) R.pset(x, y, u < 0.4 ? c_P.fuego3 : c_P.fuego2); }
}

// los troncos del hogar y las brasas bajo el fuego
function c_troncos(R, cx, base, w) {
  for (const [dx, dy, L] of [[-w, 0, w * 2], [-w + 2, -2, w * 2 - 4]]) { R.rect(cx + dx, base + dy - 1, cx + dx + L, base + dy, c_P.vigaS); R.rect(cx + dx, base + dy - 1, cx + dx + L, base + dy - 1, c_P.viga); R.pset(cx + dx, base + dy, c_P.fuego1); R.pset(cx + dx + L, base + dy - 1, c_P.fuego2); }
  for (let i = -w; i <= w; i += 2) R.pset(cx + i, base + 1, (i & 2) ? c_P.fuego0 : c_P.fuego1);
}

// copos que caen dentro de un rectángulo (n copos, vel en px/s); grande: copos de 2 px con su sombra
function c_copos(R, t, n, x0, y0, x1, y1, k = 0, vel = 12, col = C.blanco, grande = false) {
  const w = x1 - x0 + 1, hh = y1 - y0 + 1;
  for (let i = 0; i < n; i++) { const v = vel * (0.6 + h(i, 3, k) * 0.7), y = y0 + (((h(i, 2, k) * hh + t * v) % hh) + hh) % hh, x = x0 + ((((h(i, 1, k) * w + Math.sin(t * 0.9 + i * 1.3) * 3 + t * v * 0.25) % w) + w) % w);
    R.pset(Math.round(x), Math.round(y), col); if (grande) { R.pset(Math.round(x) + 1, Math.round(y), col); R.pset(Math.round(x), Math.round(y) + 1, col); R.pset(Math.round(x) + 1, Math.round(y) + 1, c_P.nieveNS); } }
}

// humo que sube de (x, y), deshilachado, que se aclara y se ensancha
function c_humo(R, x, y, t, k = 0, col = C.grisL, alto = 30) {
  for (let i = 0; i < 9; i++) { const u = ((t * 0.22 + i / 9 + h(i, k, 7) * 0.05) % 1), yy = Math.round(y - u * alto), xx = Math.round(x + Math.sin(u * 5 + t * 0.7 + k) * (1 + u * 5) + u * 6), r = 1 + Math.round(u * 2.5);
    for (let j = -r; j <= r; j++) for (let ii = -r; ii <= r; ii++) if (ii * ii + j * j <= r * r && ((xx + ii + yy + j) & 1 || u < 0.4)) c_tinte(R, xx + ii, yy + j, col, 0.55 * (1 - u)); }
}

// un sprite de cadenas (cada carácter, un color del diccionario; '.' transparente), con pset (respeta R.recorte)
function c_sprite(R, filas, x, y, dic, espejo = false) {
  filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = dic[f[i]]; if (c) R.pset(espejo ? x + f.length - 1 - i : x + i, y + j, c); } });
}

// un cuarterón de madera en relieve (bisel con luz arriba a la izquierda, sombra abajo a la derecha, dos vetas)
function c_cuarteron(R, x0, y0, x1, y1, [c, cL, cS, cV], k = 0) {
  R.rect(x0, y0, x1, y1, cS); R.rect(x0, y0, x1 - 1, y1 - 1, cL); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 120) * (x1 - x0 - 6)); for (let y = y0 + 2; y < y1 - 1; y++) if (h(vx, y, 121 + i) > 0.1) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.07 + k * 1.7 + i * 2) * 1.4))), y, cV); }
}

// el contorno de una elipse (para los bocetos a tinta)
function c_elipse(R, cx, cy, rx, ry, col, a0 = 0, a1 = Math.PI * 2) {
  const n = Math.ceil((rx + ry) * 3); for (let s = 0; s <= n; s++) { const a = a0 + (a1 - a0) * s / n; R.pset(Math.round(cx + Math.cos(a) * rx), Math.round(cy + Math.sin(a) * ry), col); }
}

// una gente pequeña de fondo (7 px) que anda: sombrero de copa o gorro, abrigo, piernas que alternan
function c_paseante(R, x, suelo, t, col, dir = 1, k = 0) {
  const p = Math.floor(t * 4 + k) % 2, X = Math.round(x);
  R.pset(X, suelo - 7, C.k); R.pset(X + 1, suelo - 7, C.k); R.pset(X, suelo - 8, k % 2 ? C.k : col); R.pset(X + 1, suelo - 8, k % 2 ? C.k : col);
  R.pset(X, suelo - 6, hex('#e8b890')); R.pset(X + 1, suelo - 6, hex('#e8b890'));
  for (let j = 5; j >= 2; j--) { R.pset(X, suelo - j, col); R.pset(X + 1, suelo - j, col); } R.pset(X + (dir > 0 ? 2 : -1), suelo - 4, col);
  R.pset(X + p, suelo - 1, C.k); R.pset(X + 1 - p, suelo, C.k); R.pset(X + p, suelo, C.k);
}

// un coche de caballos pequeño (para las calles de fuera): caballo que trota y la caja con su farol
const c_COCHE = [
  '..........kkkkkk..',
  '..........kCCCCCk.',
  '..kk......kCwCwCk.',
  '.kHHk.....kCCCCCk.',
  'kHHHHHHHkkkkkkkkkk',
  '.kHHHHHk.k.kk..kk.',
];

function c_coche(R, x, suelo, t, dir = 1) {
  const p = Math.floor(t * 6) % 2, dic = { k: C.k, H: hex('#6a4026'), C: hex('#2a3a2a'), w: c_P.farol };
  c_sprite(R, c_COCHE, Math.round(x), suelo - 9, dic, dir < 0);
  const lx = (i) => Math.round(dir > 0 ? x + i : x + 17 - i);
  for (const [i, f] of [[2, p], [6, 1 - p]]) { R.pset(lx(i), suelo - 3, C.k); R.pset(lx(i + f), suelo - 2, C.k); R.pset(lx(i + (f ? 1 : 0)), suelo - 1, C.k); }
  for (const i of [11, 15]) { R.pset(lx(i), suelo - 2, C.k); R.pset(lx(i - 1), suelo - 1, C.k); R.pset(lx(i + 1), suelo - 1, C.k); R.pset(lx(i), suelo, C.k); R.pset(lx(i), suelo - 1, c_P.laton); }
}

// el péndulo de un reloj: un disco de latón que oscila colgado de (x, y) con largo L
function c_pendulo(R, x, y, L, t, per = 1.6) {
  const a = Math.sin(t * Math.PI * 2 / per) * 0.28, px = Math.round(x + Math.sin(a) * L), py = Math.round(y + Math.cos(a) * L);
  R.linea(x, y, px, py, c_P.latonS); R.disco(px, py, 2, c_P.latonS); R.disco(px, py, 1, c_P.laton); R.pset(px - 1, py - 1, c_P.latonL);
}

// una calle nevada vista por una ventana (x0–x1, y0–y1), al anochecer o de noche: cielo tramado, fachadas de ladrillo con
// cornisas nevadas y ventanas encendidas, la calzada con nieve y rodadas, un farol; la parte fija (en el búfer)
function c_calleFija(R, x0, y0, x1, y1, k = 0, noche = false) {
  const hor = y0 + Math.round((y1 - y0) * 0.32), suelo = y1 - Math.round((y1 - y0) * 0.16);
  const cielo = noche ? [c_P.n1, c_P.n2, c_P.n3, c_P.n4] : [c_P.dusk0, c_P.dusk1, c_P.dusk2, c_P.dusk3];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, c_grad(cielo, (y - y0) / (hor - y0 + 12), x, y));
  for (let i = 0; i < 8; i++) R.pset(x0 + Math.floor(h(i, 1, k) * (x1 - x0)), y0 + Math.floor(h(i, 2, k) * (hor - y0)), noche ? C.blanco : c_P.dusk3);
  // dos casas de ladrillo, una más alta, con cornisas nevadas, chimeneas y ventanas de guillotina (algunas encendidas)
  let xx = x0 - 4; let n = 0;
  while (xx < x1) { const w = 18 + Math.floor(h(n, 3, k) * 10), top = hor - 4 + Math.floor(h(n, 4, k) * 10), tono = n % 2 ? [hex('#7a3a30'), hex('#5e2c26'), hex('#94503e')] : [hex('#6a4a3e'), hex('#523830'), hex('#8a6050')];
    for (let y = top; y <= suelo; y++) for (let x = Math.max(x0, xx); x <= Math.min(x1, xx + w); x++) R.pset(x, y, (y % 3 === 0 || (x + (Math.floor(y / 3) % 2) * 2) % 5 === 0) ? tono[1] : tono[0]);
    for (let x = Math.max(x0, xx - 1); x <= Math.min(x1, xx + w + 1); x++) { R.pset(x, top - 1, C.nieve); R.pset(x, top, c_P.nieveNL); R.pset(x, top + 1, tono[2]); }
    const chx = xx + 4 + Math.floor(h(n, 5, k) * (w - 8)); for (let y = top - 6; y < top - 1; y++) for (let x = chx; x <= chx + 2; x++) if (x >= x0 && x <= x1) R.pset(x, y, tono[1]); for (let x = chx - 1; x <= chx + 3; x++) if (x >= x0 && x <= x1) R.pset(x, top - 7, C.nieve);
    for (let fy = top + 4; fy < suelo - 6; fy += 8) for (let fx = xx + 3; fx + 3 < xx + w; fx += 6) { const luz = h(fx, fy, k + 9) < 0.45;
      for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) { const X = fx + i, Y = fy + j; if (X < x0 || X > x1) continue; R.pset(X, Y, luz ? (j < 2 ? c_P.farolL : c_P.farol) : (j === 2 ? tono[1] : hex('#2a2a40'))); }
      for (let i = -1; i < 4; i++) if (fx + i >= x0 && fx + i <= x1) R.pset(fx + i, fy + 5, C.nieve); }
    xx += w + 2; n++; }
  // la calle: nieve con rodadas, la acera y el bordillo
  for (let y = suelo; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y === suelo ? c_P.nieveNS : (y - suelo === 3 || y - suelo === 5) && (x + y) % 3 ? c_P.nieveNS : (x + y * 3) % 7 === 0 ? c_P.nieveNL : C.nieve);
  return { hor, suelo };
}

// la parte viva de esa calle (recortada al hueco): nieve que cae, la gente que pasa, el coche de caballos y el farol
function c_calleViva(R, t, x0, y0, x1, y1, k = 0, farolX = null) {
  const suelo = y1 - Math.round((y1 - y0) * 0.16); R.recorte([x0, y0, x1, y1]);
  if (farolX !== null) { R.linea(farolX, suelo, farolX, suelo - 16, C.k); for (let j = -3; j <= 0; j++) for (let i = -2; i <= 2; i++) R.pset(farolX + i, suelo - 17 + j, Math.abs(i) === 2 || j === -3 ? C.k : (Math.sin(t * 13 + k) > 0.85 ? c_P.farol : c_P.farolL));
    for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j < 36 && (i + j + 64) % 2 === 0) c_tinte(R, farolX + i, suelo - 18 + j, c_P.farol, 0.25); }
  const w = x1 - x0 + 40;
  for (let p = 0; p < 2; p++) { const dir = p ? -1 : 1, u = ((t * (4 + p * 2) + h(p, 1, k) * w) % w), x = dir > 0 ? x0 - 20 + u : x1 + 20 - u; c_paseante(R, x, suelo + 3 + p * 2, t, p ? hex('#3a2a4a') : hex('#4a2a22'), dir, p + k); }
  const uc = (t + h(k, 2, 3) * 10) % 13; if (uc < 6) c_coche(R, x0 - 20 + uc / 6 * (x1 - x0 + 40), suelo + 6, t, 1);
  c_copos(R, t, Math.round((x1 - x0) * (y1 - y0) / 60), x0, y0, x1, y1, k, 9);
  R.recorte(null);
}

// los marcos de una ventana de guillotina: cerco, travesaños (cols × filas de vidrios), escarcha en las esquinas y el
// alféizar; dentro va lo que se ve (c_calleFija / c_calleViva)
function c_marcoVentana(R, x0, y0, x1, y1, cols, filas, [c, cS, cL], escarcha = true) {
  const { rect, pset } = R;
  rect(x0 - 3, y0 - 3, x1 + 3, y0 - 1, c); rect(x0 - 3, y1 + 1, x1 + 3, y1 + 3, c); rect(x0 - 3, y0 - 3, x0 - 1, y1 + 3, c); rect(x1 + 1, y0 - 3, x1 + 3, y1 + 3, c);
  rect(x0 - 3, y0 - 3, x1 + 3, y0 - 3, cL); rect(x0 - 3, y0 - 3, x0 - 3, y1 + 3, cL); rect(x1 + 3, y0 - 3, x1 + 3, y1 + 3, cS); rect(x0 - 1, y0, x0 - 1, y1, cS); rect(x0, y0 - 1, x1, y0 - 1, cS);
  const ym = Math.round((y0 + y1) / 2);
  for (let i = 1; i < cols; i++) { const x = Math.round(x0 + (x1 - x0) * i / cols); rect(x, y0, x, y1, c); pset(x, y0, cL); }
  for (let j = 1; j < filas; j++) { const y = Math.round(y0 + (y1 - y0) * j / filas); rect(x0, y, x1, y, y === ym ? c : c); if (Math.abs(y - ym) < 2) { rect(x0, y - 1, x1, y + 1, c); rect(x0, y - 1, x1, y - 1, cL); rect(x0, y + 1, x1, y + 1, cS); } }
  if (escarcha) for (let i = 0; i < cols; i++) for (let j = 0; j < filas; j++) { const a = Math.round(x0 + (x1 - x0) * i / cols) + 1, b = Math.round(y0 + (y1 - y0) * (j + 1) / filas) - 1;
    for (let q = 0; q < 5; q++) for (let p = 0; p < 5 - q; p++) if ((p + q) % 2 === 0 || p + q < 2) pset(a + p, b - q, q + p < 2 ? C.blanco : c_P.nieveNL); }
}

// un pliego impreso pequeño (x, y arriba a la izquierda, w × hh): papel con su sombra, cabecera de barras, columnas de
// renglones grises y, a veces, un grabado
function c_pliegoP(R, x, y, w, hh, k = 0) {
  const { rect, pset } = R; rect(x, y, x + w - 1, y + hh - 1, c_P.pliego); rect(x + w - 1, y + 1, x + w - 1, y + hh - 1, c_P.pliegoS); rect(x + 1, y + hh - 1, x + w - 1, y + hh - 1, c_P.pliegoS);
  rect(x + 2, y + 2, x + w - 3, y + 3, c_P.tinta); rect(x + 2, y + 5, x + w - 3, y + 5, c_P.tintaG);
  const cols = w > 13 ? 2 : 1, cw = Math.floor((w - 4) / cols);
  for (let cI = 0; cI < cols; cI++) for (let ry = y + 7; ry < y + hh - 2; ry += 2) { if (h(cI, ry, k) < 0.12) continue; const L = cw - 2 - Math.floor(h(ry, cI, k + 1) * 3); rect(x + 2 + cI * cw, ry, x + 2 + cI * cw + L, ry, c_P.tintaC); }
  if (h(k, 9, 1) < 0.5 && hh > 14) { const gx = x + 2, gy = y + 8; rect(gx, gy, gx + cw - 2, gy + 5, c_P.tintaG); for (let i = 0; i < cw - 2; i += 2) pset(gx + i, gy + 1 + (i % 4 ? 1 : 0), c_P.tinta); }
}

// la hoja del periódico de 1823 en su rejilla de 60 × 80 (0 papel, 1 tinta, 2 gris, 3 gris claro, 4 sombra del papel):
// la cabecera de barras con una estrella, la doble raya, tres columnas y, en medio, el poema enmarcado con el grabado
// del trineo y los renglones cortos de sus estrofas; se calcula una vez
let c_HOJA = null;

function c_hojaPeriodico() {
  if (c_HOJA) return c_HOJA; const W = 60, H = 80, a = new Uint8Array(W * H), r = (x0, y0, x1, y1, v) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (x >= 0 && x < W && y >= 0 && y < H) a[y * W + x] = v; };
  r(4, 3, 55, 8, 1); for (const [i, j] of [[29, 4], [30, 4], [28, 5], [29, 5], [30, 5], [31, 5], [29, 6], [30, 6], [28, 7], [31, 7]]) a[j * W + i] = 0; r(8, 5, 12, 6, 2); r(47, 5, 51, 6, 2);
  r(3, 10, 56, 10, 1); r(3, 12, 56, 12, 1);
  const col = (x0, x1, y0, y1, k) => { for (let y = y0; y <= y1; y += 2) { if (h(y, x0, k) < 0.1) continue; const fin = h(y, x0, k + 1) < 0.15 ? x0 + 4 + Math.floor(h(y, 1, k) * 6) : x1 - Math.floor(h(y, 2, k) * 2); r(x0 + (h(y, x0, k) < 0.18 ? 2 : 0), y, fin, y, 3); } };
  col(3, 18, 15, 77, 1); col(41, 56, 15, 77, 2); r(20, 15, 20, 77, 3); r(39, 15, 39, 77, 3);
  r(22, 15, 37, 15, 1); r(22, 62, 37, 62, 1); r(22, 15, 22, 62, 1); r(37, 15, 37, 62, 1);
  r(24, 17, 35, 27, 3); for (let x = 24; x <= 35; x += 2) a[19 * W + x] = 2; a[18 * W + 33] = 0; a[18 * W + 34] = 0; a[19 * W + 33] = 0;
  for (const [i, j] of [[25, 23], [27, 23], [29, 23], [31, 22], [25, 24], [26, 24], [27, 24], [28, 24], [29, 24], [30, 24], [31, 23], [32, 24], [33, 24], [34, 24], [33, 23], [34, 22], [25, 22], [27, 22], [29, 22]]) a[j * W + i] = 1;
  for (let s = 0; s < 4; s++) for (let l = 0; l < 4; l++) { const y = 30 + s * 8 + l * 2, L = 8 + Math.floor(h(s, l, 7) * 5) - (l % 2) * 2, x0 = 30 - (L >> 1); r(x0, y, x0 + L, y, 2); }
  col(22, 37, 64, 77, 3); c_HOJA = { W, H, a }; return c_HOJA;
}

function c_imprenta(R, t, o, cam) { return cam === 'prensa' ? c_imprentaPrensa(R, t, o) : c_imprentaGeneral(R, t, o); }

// la prensa de tornillo en pequeño (cámara general): x es su centro, base el pie; tira 0–1 gira la barra y baja la platina
function c_prensaFija(R, x, base) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, ro = [P.viga, P.vigaS, P.vigaL, P.vigaD];
  rect(x - 36, base - 4, x + 36, base, K); c_viga(R, x - 35, x + 35, base - 3, base, 41, ro);
  for (const dx of [-28, 21]) { rect(dx + x - 1, base - 66, dx + x + 8, base - 3, K); c_poste(R, dx + x, base - 65, base - 4, 8, 40 + dx, ro); }
  rect(x - 34, base - 70, x + 34, base - 58, K); c_viga(R, x - 33, x + 33, base - 69, base - 59, 42, ro); rect(x - 36, base - 73, x + 36, base - 70, K); rect(x - 35, base - 72, x + 35, base - 71, P.vigaL);
  for (const dx of [-24, 24]) { disco(x + dx, base - 64, 1, P.hierroL); pset(x + dx, base - 64, P.hierroS); }
  rect(x - 4, base - 58, x + 4, base - 46, K); rect(x - 3, base - 58, x + 3, base - 47, P.hierro); for (let y = base - 57; y < base - 47; y += 2) rect(x - 3, y, x + 3, y, P.hierroL); rect(x - 3, base - 58, x - 3, base - 47, P.hierroS);
  rect(x - 9, base - 50, x + 9, base - 44, K); c_viga(R, x - 8, x + 8, base - 49, base - 45, 43, ro);
  rect(x - 50, base - 32, x + 52, base - 27, K); rect(x - 49, base - 31, x + 51, base - 30, P.hierroL); rect(x - 49, base - 29, x + 51, base - 28, P.vigaS);
  rect(x - 20, base - 36, x + 18, base - 32, K); rect(x - 19, base - 35, x + 17, base - 33, P.hierro); for (let i = x - 18; i < x + 17; i += 2) pset(i, base - 34, P.hierroL);
  rect(x - 22, base - 22, x + 22, base - 17, K); c_viga(R, x - 21, x + 21, base - 21, base - 18, 44, ro);
  // el tímpano abierto en la cola del carro, con un pliego tendido
  rect(x - 50, base - 38, x - 24, base - 32, K); rect(x - 49, base - 37, x - 25, base - 33, P.pliego); for (let i = x - 47; i < x - 27; i += 3) rect(i, base - 36, i + 1, base - 34, P.tintaC); rect(x - 49, base - 33, x - 25, base - 33, P.pliegoS);
  // la manivela del carro, con su rueda de radios
  disco(x + 56, base - 29, 6, K); disco(x + 56, base - 29, 5, P.vigaS); disco(x + 56, base - 29, 3, K); for (let a = 0; a < 6; a++) linea(x + 56, base - 29, Math.round(x + 56 + Math.cos(a) * 5), Math.round(base - 29 + Math.sin(a) * 5), P.viga); disco(x + 56, base - 29, 1, P.hierroL);
}

function c_prensaViva(R, x, base, t, tira) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, baja = Math.round(tira * 3);
  rect(x - 16, base - 46 + baja, x + 16, base - 41 + baja, K); rect(x - 15, base - 45 + baja, x + 15, base - 42 + baja, P.hierro); rect(x - 15, base - 45 + baja, x + 15, base - 45 + baja, P.hierroL); pset(x - 10 + ((t * 8) % 20 | 0), base - 45 + baja, C.blanco);
  const a = -0.2 + tira * 1.15, bx = Math.round(x + 6 + Math.cos(a) * 36), by = Math.round(base - 52 + Math.sin(a) * 14);
  linea(x + 4, base - 53, bx, by, K); linea(x + 4, base - 52, bx, by + 1, K); linea(x + 4, base - 54, bx, by - 1, P.hierroL);
  rect(bx - 1, by - 2, bx + 4, by + 2, K); rect(bx, by - 1, bx + 3, by + 1, P.vigaL); pset(bx + 3, by + 1, P.vigaS);
  return [bx + 2, by];
}

function c_imprentaGeneral(R, t, o) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, PX = 140, PB = 152, VX0 = 15, VY0 = 44, VX1 = 63, VY1 = 98;
  c_fijo(R, 'nv-imp-g', () => {
    // el techo: tablazón entre viguetas y la viga maestra
    rect(0, 0, 319, 13, P.techo); for (let x = 0; x < 320; x += 2) if (h(x >> 2, 1, 3) < 0.5) rect(x, 0, x, 12, hex('#33261e'));
    for (let x = 4; x < 320; x += 26) { rect(x, 0, x + 6, 12, P.viga); rect(x, 0, x, 12, P.vigaL); rect(x + 6, 0, x + 6, 12, P.vigaD); rect(x - 1, 12, x + 7, 13, P.vigaS); }
    c_viga(R, 0, 319, 13, 19, 7);
    // la pared de cal y el entramado; el zócalo de tablas
    c_yeso(R, 0, 20, 319, 123, [P.cal, P.calS, P.calL, P.calD], 11);
    for (let x = 0; x < 320; x++) for (let y = 104; y < 124; y++) if (h(x >> 3, y >> 2, 12) < 0.25 && ((x + y) & 1)) pset(x, y, P.calS);
    rect(0, 124, 319, 139, P.tablaS); for (let x = 0; x < 320; x += 9) { rect(x, 124, x, 139, P.tablaD); rect(x + 1, 124, x + 1, 139, P.tabla); } rect(0, 123, 319, 124, P.vigaD); rect(0, 125, 319, 125, P.tablaL);
    for (const px of [80, 236]) { rect(px - 1, 20, px + 7, 123, P.vigaD); c_poste(R, px, 20, 123, 7, px); }
    // la ventana a la calle de 1823, con su alféizar
    c_calleFija(R, VX0, VY0, VX1, VY1, 5, false); c_marcoVentana(R, VX0, VY0, VX1, VY1, 3, 4, [P.viga, P.vigaD, P.vigaL]);
    rect(VX0 - 6, VY1 + 3, VX1 + 6, VY1 + 6, K); rect(VX0 - 5, VY1 + 4, VX1 + 5, VY1 + 5, P.vigaL); rect(VX0 - 5, VY1 + 6, VX1 + 5, VY1 + 6, P.vigaD);
    // en el alféizar: un candil apagado y un bote de plumas
    rect(20, VY1 + 0, 24, VY1 + 3, P.peltreS); rect(21, VY1 - 1, 23, VY1 + 2, P.peltre); rect(54, VY1 - 3, 58, VY1 + 3, K); rect(55, VY1 - 2, 57, VY1 + 3, hex('#4a6a8a')); pset(55, VY1 - 6, P.pliego); linea(56, VY1 - 3, 54, VY1 - 8, P.pliego); linea(57, VY1 - 3, 59, VY1 - 7, P.pliegoS);
    // la mesa de entintar bajo la ventana: tablero, patas, la losa de tinta, las dos balas y resmas debajo
    rect(6, 118, 76, 121, K); c_viga(R, 7, 75, 118, 121, 15, [C.madera, C.maderaS, C.maderaL, C.maderaD]);
    for (const lx of [9, 70]) { rect(lx, 122, lx + 3, 150, K); rect(lx + 1, 122, lx + 2, 150, C.maderaS); }
    rect(12, 140, 68, 142, K); rect(13, 141, 67, 141, C.maderaS);
    for (let k = 0; k < 3; k++) { rect(16 + k * 16, 143 - k % 2, 28 + k * 16, 150, K); rect(17 + k * 16, 144 - k % 2, 27 + k * 16, 150, P.pliego); for (let y = 145; y < 150; y += 2) rect(17 + k * 16, y, 27 + k * 16, y, P.pliegoS); }
    rect(12, 113, 34, 117, K); rect(13, 114, 33, 116, hex('#2a2a30')); rect(13, 114, 33, 114, hex('#4a4a56')); for (let i = 15; i < 32; i += 3) pset(i, 115, hex('#5a5a68'));
    for (const bx of [42, 54]) { disco(bx, 113, 4, K); disco(bx, 113, 3, hex('#3a2a20')); rect(bx - 3, 113, bx + 3, 116, K); rect(bx - 2, 113, bx + 2, 115, hex('#3a2a20')); pset(bx - 1, 111, hex('#6a5040')); rect(bx - 1, 106, bx + 1, 110, K); pset(bx, 107, C.maderaL); }
    rect(62, 112, 74, 117, K); rect(63, 113, 73, 116, P.pliego); rect(63, 114, 73, 114, P.pliegoS); rect(64, 111, 72, 112, K); rect(64, 111, 72, 111, P.pliego);
    // las perchas con el abrigo y la chistera del impresor junto al poste
    rect(90, 42, 110, 44, K); rect(91, 43, 109, 43, P.vigaL); for (const px of [94, 104]) { rect(px, 44, px + 1, 46, K); }
    { const cx = 104; rect(cx - 5, 47, cx + 5, 76, K); rect(cx - 4, 48, cx + 4, 76, hex('#2a3048')); rect(cx - 4, 48, cx - 3, 76, hex('#3a4260')); rect(cx, 52, cx, 74, hex('#1e2234')); pset(cx + 2, 56, P.laton); pset(cx + 2, 62, P.laton); }
    rect(90, 36, 99, 46, K); rect(91, 37, 98, 45, hex('#24242c')); rect(88, 45, 101, 47, K); rect(91, 43, 98, 43, hex('#5a2a2a')); rect(91, 37, 92, 44, hex('#3a3a46'));
    // un pliego de prueba clavado al poste y un aviso de la casa (barras, sin letras)
    c_pliegoP(R, 116, 30, 14, 18, 3); pset(122, 30, C.rojo);
    // el estante sobre las cajas: resmas, botes de tinta y un componedor; el reloj de pared
    rect(184, 72, 232, 75, K); c_viga(R, 185, 231, 72, 75, 21); for (const sx of [188, 226]) { rect(sx, 76, sx + 2, 80, K); }
    for (let k = 0; k < 4; k++) { rect(186 + k * 7, 62 - (k % 2) * 2, 191 + k * 7, 71, K); rect(187 + k * 7, 63 - (k % 2) * 2, 190 + k * 7, 71, k % 2 ? hex('#2a2a3a') : hex('#4a3020')); pset(187 + k * 7, 64, C.blanco); }
    rect(216, 64, 230, 71, K); rect(217, 65, 229, 70, P.pliego); for (let y = 66; y < 71; y += 2) rect(217, y, 229, y, P.pliegoS);
    rect(198, 26, 216, 58, K); rect(199, 27, 215, 57, C.maderaS); rect(200, 28, 214, 57, C.madera); disco(207, 35, 6, K); disco(207, 35, 5, P.pliego); for (let a = 0; a < 12; a++) pset(Math.round(207 + Math.cos(a / 12 * 6.283) * 4), Math.round(35 + Math.sin(a / 12 * 6.283) * 4), P.tintaG);
    linea(207, 35, 207, 31, K); linea(207, 35, 210, 36, K); rect(202, 43, 212, 55, K); rect(203, 44, 211, 54, hex('#2a1a10'));
    // las cajas de tipos: el chibalete con las dos cajas inclinadas llenas de cajetines y el cajonero
    rect(186, 102, 232, 104, K); rect(184, 104, 234, 116, K);
    for (let y = 105; y < 116; y++) for (let x = 185; x < 234; x++) pset(x, y, (x - 185) % 4 === 0 || (y - 105) % 3 === 0 ? C.maderaS : h(x, y, 31) < 0.55 ? hex('#7a7a86') : hex('#5a5a66'));
    rect(185, 105, 233, 105, C.maderaL); rect(184, 116, 234, 118, C.maderaD);
    rect(186, 118, 232, 152, K); rect(187, 119, 231, 151, C.maderaS);
    for (let y = 121; y < 150; y += 5) { rect(188, y, 230, y + 3, C.madera); rect(188, y, 230, y, C.maderaL); rect(188, y + 3, 230, y + 3, C.maderaD); disco(209, y + 2, 1, P.laton); }
    // la chimenea de ladrillo con su campana de cal, la repisa y el hogar
    rect(244, 20, 304, 110, P.calL); c_yeso(R, 245, 20, 303, 110, [P.cal, P.calS, P.calL, P.calD], 19, 1); rect(244, 20, 244, 110, P.calD); rect(303, 20, 304, 110, P.calS);
    for (let y = 22; y < 110; y++) if (((y * 7) % 11) < 3) pset(245, y, P.calS);
    c_ladrillos(R, 246, 110, 302, 152, 13);
    rect(256, 120, 292, 150, K); for (let y = 121; y < 150; y++) for (let x = 257; x < 292; x++) pset(x, y, c_grad([P.hollin, hex('#3a2a24'), P.ladrS], (y - 120) / 34 + (h(x >> 2, y >> 1, 3) - 0.5) * 0.2, x, y));
    for (let x = 258; x < 291; x++) { const yy = 120 - Math.round(Math.sqrt(Math.max(0, 1 - ((x - 274) / 18) ** 2)) * 4); rect(x, yy, x, 121, P.ladrS); } rect(256, 116, 292, 117, P.ladrS);
    rect(240, 104, 308, 110, K); c_viga(R, 241, 307, 104, 109, 27, [C.madera, C.maderaS, C.maderaL, C.maderaD]); rect(242, 110, 306, 111, P.vigaD);
    rect(248, 151, 300, 155, K); rect(249, 152, 299, 154, P.piedra); rect(249, 152, 299, 152, P.piedraL);
    for (const ax of [262, 286]) { rect(ax, 140, ax + 1, 151, K); rect(ax - 2, 150, ax + 3, 151, K); disco(ax + 1, 139, 2, P.laton); }
    rect(283, 122, 284, 132, K); rect(279, 132, 288, 140, K); rect(280, 133, 287, 139, hex('#2a2a30')); rect(280, 133, 287, 133, P.hierroL);
    // en la repisa: dos candeleros de latón, una jarra de peltre y un grabado de un barco enmarcado encima
    for (const cx of [250, 298]) { rect(cx - 2, 101, cx + 2, 103, K); rect(cx - 1, 95, cx + 1, 101, P.laton); pset(cx - 1, 95, P.latonL); rect(cx - 1, 90, cx + 1, 94, C.blanco); rect(cx + 1, 90, cx + 1, 94, P.pliegoS); }
    rect(264, 94, 271, 103, K); rect(265, 95, 270, 103, P.peltre); rect(265, 95, 265, 103, C.blanco); rect(271, 97, 273, 100, K);
    rect(256, 54, 292, 84, K); rect(257, 55, 291, 83, C.maderaS); rect(259, 57, 289, 81, P.pliego);
    for (let y = 58; y < 81; y++) for (let x = 260; x < 289; x++) if (y > 72 ? (x + y) % 3 === 0 : y > 66 && (x * 3 + y) % 5 === 0) pset(x, y, P.tintaG);
    for (let y = 60; y < 72; y++) pset(274, y, P.tinta); R.poligono([[266, 70], [282, 70], [279, 74], [269, 74]], P.tinta); R.poligono([[268, 62], [274, 62], [274, 69], [266, 69]], P.tintaC); R.poligono([[275, 61], [283, 68], [275, 68]], P.tintaC);
    // el suelo de tablas anchas, con manchas de tinta, recortes y la sombra de la prensa
    c_tablas(R, 0, 319, 140, 179, 160, 40, [P.tabla, P.tablaS, P.tablaL, P.tablaD], 3, 6);
    for (let k = 0; k < 9; k++) { const x = Math.floor(h(k, 1, 51) * 300) + 10, y = 146 + Math.floor(h(k, 2, 51) * 30); R.disco(x, y, 1 + (k % 2), hex('#2a2018')); }
    for (let k = 0; k < 6; k++) { const x = Math.floor(h(k, 3, 52) * 280) + 20, y = 150 + Math.floor(h(k, 4, 52) * 26); rect(x, y, x + 3, y + 1, P.pliego); pset(x + 3, y + 1, P.pliegoS); }
    for (let y = 150; y < 156; y++) for (let x = PX - 40; x < PX + 40; x++) if (((x - PX) / 40) ** 2 + ((y - 153) / 3.4) ** 2 < 1) c_tinte(R, x, y, K, 0.35);
    c_prensaFija(R, PX, PB);
  });
  // la calle de fuera (recortada a la ventana) y los marcos por encima
  c_calleViva(R, t, VX0, VY0, VX1, VY1, 5, 58); c_marcoVentana(R, VX0, VY0, VX1, VY1, 3, 4, [P.viga, P.vigaD, P.vigaL], false);
  // las cuerdas con los pliegos que se secan y se mecen
  const cuerdas = [[6, 26, 232, 30, [10, 28, 46, 64, 152, 172, 192, 212]], [86, 40, 230, 44, [92, 112, 132, 160, 180]]];
  cuerdas.forEach(([xa, ya, xb, yb, xs], ci) => { for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa); pset(x, Math.round(ya + (yb - ya) * u + Math.sin(u * Math.PI) * 4), hex('#8a7a60')); }
    xs.forEach((sx, i) => { const u = (sx + 7 - xa) / (xb - xa), y = Math.round(ya + (yb - ya) * u + Math.sin(u * Math.PI) * 4), m = Math.round(Math.sin(t * 1.4 + i * 1.7 + ci) * 0.8);
      c_pliegoP(R, sx + m, y + 1, 14, 17 + (i % 2) * 3, i * 7 + ci); rect(sx + 3 + m, y - 1, sx + 4 + m, y + 2, hex('#a8845a')); rect(sx + 10 + m, y - 1, sx + 11 + m, y + 2, hex('#a8845a')); }); });
  // el fuego del hogar, su luz en el suelo y el gato que duerme en la piedra
  c_troncos(R, 274, 147, 9); c_fuego(R, 274, 145, 9, t, 1);
  const vf = 0.22 + Math.sin(t * 7) * 0.03 + Math.sin(t * 13.1) * 0.02; c_halo(R, 274, 160, 44, 14, c_P.fuego2, vf); c_halo(R, 274, 136, 22, 16, c_P.fuego2, vf * 0.6);
  { const r = Math.sin(t * 2.2) > 0 ? 1 : 0, x = 291; c_sprite(R, ['...kk..kk', '..kOOkkOk', 'kkOOOOOOk', 'kOOOOOOOOk'.slice(0, 10), 'kkkkkkkkkk'], x, 145 - r, { k: K, O: hex('#c87a3a') }); rect(x + 1, 148 - r, x + 8, 148, hex('#c87a3a')); pset(x + 6, 146 - r, K); }
  // las velas de la repisa, el quinqué colgado y el péndulo del reloj
  c_llama(R, 250, 90, t, 1); c_llama(R, 298, 90, t, 2);
  { const lx = 156, ly = 46; linea(lx, 19, lx, ly - 7, K); rect(lx - 4, ly - 7, lx + 4, ly - 6, K); rect(lx - 3, ly - 5, lx + 3, ly + 1, K); rect(lx - 2, ly - 4, lx + 2, ly, hex('#f8e8b0')); rect(lx - 4, ly + 2, lx + 4, ly + 3, P.laton); c_llama(R, lx, ly, t, 4); c_halo(R, lx, ly - 2, 22, 16, c_P.farol, 0.18 + Math.sin(t * 9) * 0.02); }
  c_pendulo(R, 207, 44, 9, t);
  // la barra de la prensa, con o.tira
  const barra = c_prensaViva(R, PX, PB, t, o.tira ?? 0);
  return { suelo: 160, prensa: { x: PX, pie: PB, platina: [124, 106, 156, 111], barra, timpano: [90, 114, 116, 120], manivela: [196, 123] }, chimenea: { boca: [256, 120, 292, 150], fuego: [274, 145], repisa: 104, campana: [244, 20, 304, 104] },
    ventana: [VX0, VY0, VX1, VY1], mesa: { tablero: [6, 118, 76, 121], balas: [[42, 113], [54, 113]] }, cajas: [184, 102, 234, 152], cuerdas: cuerdas.map((c) => c.slice(0, 4)), quinque: [156, 46], libre: [[78, 104], [172, 244]] };
}

// lo de delante en la imprenta: los fardos de periódicos atados (x 0–42, y ≥ 160) y el cesto de recortes (x 290–319)
function c_imprentaDelante(R, t) {
  const { rect, pset } = R, P = c_P, K = C.k;
  for (let k = 0; k < 3; k++) { const x = 2 + (k % 2) * 10 + (k === 2 ? 4 : 0), y = 172 - k * 6, w = 30;
    rect(x - 1, y - 7, x + w + 1, y + 1, K); rect(x, y - 6, x + w, y, P.pliego); for (let j = y - 5; j <= y; j += 2) rect(x, j, x + w, j, P.pliegoS); rect(x, y - 6, x + w, y - 6, C.blanco);
    rect(x + 8, y - 7, x + 9, y + 1, hex('#8a6a3a')); rect(x + 22, y - 7, x + 23, y + 1, hex('#8a6a3a')); }
  rect(290, 162, 319, 179, K); for (let y = 163; y < 180; y++) for (let x = 291; x < 320; x++) pset(x, y, (x + (y >> 1)) % 4 === 0 ? hex('#7a5a30') : (y & 1) ? hex('#b08a50') : hex('#9a7440'));
  rect(289, 160, 319, 163, K); rect(290, 161, 319, 162, hex('#c8a060'));
  for (let k = 0; k < 4; k++) { const x = 294 + k * 6, y = 157 + (k % 2) * 2; R.disco(x, y, 3, K); R.disco(x, y, 2, P.pliego); pset(x - 1, y - 1, C.blanco); pset(x + 1, y, P.pliegoS); }
}

// la prensa de cerca: el tímpano abierto con el periódico, la platina, el tornillo, la barra y el carro
function c_imprentaPrensa(R, t, o) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, ro = [P.viga, P.vigaS, P.vigaL, P.vigaD], HX = 46, HY = 34;
  c_fijo(R, 'nv-imp-p', () => {
    rect(0, 0, 319, 8, P.techo); c_viga(R, 0, 319, 8, 14, 9);
    c_yeso(R, 0, 15, 319, 139, [P.cal, P.calS, P.calL, P.calD], 61, 2);
    rect(0, 136, 319, 151, P.tablaS); for (let x = 3; x < 320; x += 11) { rect(x, 136, x, 151, P.tablaD); rect(x + 1, 136, x + 1, 151, P.tabla); } rect(0, 135, 319, 136, P.vigaD);
    c_poste(R, 10, 15, 135, 8, 3); c_poste(R, 258, 15, 135, 8, 4);
    // la ventana de la derecha, con la luz que entra y la calle detrás del impresor
    c_calleFija(R, 274, 54, 312, 112, 8, false); c_marcoVentana(R, 274, 54, 312, 112, 2, 4, [P.viga, P.vigaD, P.vigaL]);
    rect(268, 115, 318, 118, K); rect(269, 116, 317, 117, P.vigaL);
    // las cajas de tipos al fondo y un estante de botes
    rect(226, 96, 256, 98, K); rect(224, 98, 258, 106, K); for (let y = 99; y < 106; y++) for (let x = 225; x < 258; x++) pset(x, y, (x % 4 === 0 || y % 3 === 0) ? C.maderaS : hex('#6a6a76')); rect(226, 106, 256, 150, K); rect(227, 107, 255, 150, C.maderaS);
    for (let y = 109; y < 148; y += 6) { rect(228, y, 254, y + 4, C.madera); rect(228, y, 254, y, C.maderaL); disco(241, y + 2, 1, P.laton); }
    rect(222, 70, 256, 72, K); rect(223, 70, 255, 70, P.vigaL); for (let k = 0; k < 4; k++) { rect(225 + k * 8, 60 + (k % 2) * 2, 230 + k * 8, 69, K); rect(226 + k * 8, 61 + (k % 2) * 2, 229 + k * 8, 69, [hex('#2a2a3a'), hex('#4a3020'), hex('#3a4a2a'), hex('#2a2a3a')][k]); pset(226 + k * 8, 62 + (k % 2) * 2, C.blanco); }
    c_tablas(R, 0, 319, 152, 179, 160, 60, [P.tabla, P.tablaS, P.tablaL, P.tablaD], 7, 5);
    for (let y = 156; y < 166; y++) for (let x = 70; x < 250; x++) if (((x - 160) / 90) ** 2 + ((y - 160) / 5) ** 2 < 1) c_tinte(R, x, y, K, 0.35);
    // la prensa: pies, cabezas, sombrero, tornillo, el carro con los raíles y la forma de tipos
    rect(96, 152, 236, 159, K); c_viga(R, 97, 235, 153, 158, 71, ro);
    for (const px of [116, 206]) { rect(px - 1, 56, px + 12, 153, K); c_poste(R, px, 57, 152, 12, px, ro); for (let y = 66; y < 150; y += 28) { disco(px + 6, y, 2, P.hierro); pset(px + 5, y - 1, P.hierroL); } }
    rect(106, 52, 228, 74, K); c_viga(R, 107, 227, 53, 73, 72, ro); rect(102, 46, 232, 52, K); rect(103, 47, 231, 50, P.vigaL); rect(103, 51, 231, 51, P.vigaS);
    for (let x = 108; x < 228; x += 6) { rect(x, 52, x + 2, 53, P.vigaS); }
    for (const bx of [122, 212]) { disco(bx, 63, 3, K); disco(bx, 63, 2, P.hierro); pset(bx - 1, 62, P.hierroL); }
    rect(158, 74, 174, 98, K); for (let y = 75; y < 98; y++) rect(159, y, 173, y, (y % 3) === 0 ? P.hierroS : (y % 3) === 1 ? P.hierroL : P.hierro);
    rect(150, 82, 182, 92, K); c_viga(R, 151, 181, 83, 91, 73, ro);
    rect(20, 118, 306, 128, K); c_viga(R, 21, 305, 119, 127, 74, ro); rect(21, 118, 305, 119, P.hierroL); rect(21, 120, 305, 120, P.hierroS);
    for (const lx of [30, 290]) { rect(lx - 2, 128, lx + 2, 152, K); rect(lx - 1, 128, lx + 1, 152, P.vigaS); }
    rect(128, 106, 204, 118, K); rect(129, 107, 203, 117, P.hierroS);
    for (let y = 108; y < 117; y++) for (let x = 130; x < 203; x++) pset(x, y, ((y - 108) % 3 === 2) ? P.hierroS : h(x, y, 77) < 0.5 ? hex('#7a7a88') : hex('#9a9aa8'));
    rect(130, 108, 202, 108, hex('#c8c8d4'));
    rect(120, 134, 212, 142, K); c_viga(R, 121, 211, 135, 141, 75, ro);
    // las balas de entintar descansando en el carro y la manivela con su rueda
    for (const bx of [216, 228]) { disco(bx, 112, 5, K); disco(bx, 112, 4, hex('#3a2a20')); disco(bx - 1, 111, 2, hex('#5a4434')); rect(bx - 4, 112, bx + 4, 117, K); rect(bx - 3, 112, bx + 3, 116, hex('#3a2a20')); rect(bx - 1, 103, bx + 1, 107, K); pset(bx, 104, C.maderaL); }
    disco(304, 124, 9, K); disco(304, 124, 8, P.vigaS); disco(304, 124, 5, K); for (let a = 0; a < 8; a++) linea(304, 124, Math.round(304 + Math.cos(a * 0.785) * 8), Math.round(124 + Math.sin(a * 0.785) * 8), P.viga); disco(304, 124, 2, P.hierroL);
    // el tímpano levantado: su marco de hierro y el pergamino; la bisagra en la cola del carro
    for (let j = 0; j <= 84; j++) { const y = HY + j, xo = HX + Math.round((84 - j) * -0.1); rect(xo - 3, y, xo + 64, y, K); rect(xo - 2, y, xo + 63, y, j < 2 || j > 82 ? P.hierroL : P.hierro); rect(xo + 1, y, xo + 60, y, j < 2 || j > 82 ? P.hierro : P.pliegoS); }
    rect(HX + 54, HY + 84, HX + 82, HY + 88, K); rect(HX + 55, HY + 85, HX + 81, HY + 87, P.hierro); disco(HX + 82, HY + 86, 3, K); disco(HX + 82, HY + 86, 2, P.hierroL);
  });
  // el periódico recién impreso en el tímpano, con el brillo de la tinta fresca
  const hoja = c_hojaPeriodico(), tinta = o.tinta ?? 0, cols = [P.pliego, P.tinta, P.tintaG, P.tintaC, P.pliegoS];
  if (o.hoja !== false) for (let j = 0; j < hoja.H; j++) { const xo = HX + 2 + Math.round((84 - j - 2) * -0.1), y = HY + 2 + j, mece = j > 60 ? Math.round(Math.sin(t * 2 + j * 0.1) * 0.4) : 0;
    for (let i = 0; i < hoja.W; i++) { const v = hoja.a[j * hoja.W + i]; let c = cols[v]; if (i === hoja.W - 1 || j === hoja.H - 1) c = P.pliegoS;
      if (tinta > 0 && v > 0 && v < 4) { const d = (i + j * 0.6) - tinta * 110; if (d > -4 && d < 0) c = v === 1 ? P.hierroL : C.blanco; }
      pset(xo + i + mece, y, c); } }
  // el tornillo y la platina (bajan con o.tira), la barra con su puño
  const tira = o.tira ?? 0, baja = Math.round(tira * 6);
  rect(138, 96 + baja, 194, 104 + baja, K); rect(139, 97 + baja, 193, 103 + baja, P.hierro); rect(139, 97 + baja, 193, 97 + baja, P.hierroL); rect(139, 103 + baja, 193, 103 + baja, P.hierroS);
  { const g = (t * 0.25) % 1; if (g < 0.5) { const gx = 139 + Math.round(g * 2 * 54); rect(gx, 98 + baja, gx + 2, 98 + baja, C.blanco); } }
  const a = 0.72 + tira * 0.2, bx = Math.round(176 + Math.cos(a) * 84), by = Math.round(86 + Math.sin(a) * 84);
  for (let d = -1; d <= 1; d++) linea(176, 86 + d, bx, by + d, d === -1 ? P.hierroL : d === 0 ? P.hierro : K);
  linea(176, 84, bx, by - 2, K); linea(176, 88, bx, by + 2, K);
  rect(bx - 2, by - 3, bx + 6, by + 3, K); rect(bx - 1, by - 2, bx + 5, by + 2, P.vigaL); rect(bx - 1, by + 1, bx + 5, by + 2, P.viga); pset(bx + 4, by - 2, C.blanco);
  disco(176, 86, 4, K); disco(176, 86, 3, P.hierroL); pset(175, 85, C.blanco);
  // la calle por la ventana, los pliegos que se secan arriba y las motas en la luz de la ventana
  c_calleViva(R, t, 274, 54, 312, 112, 8); c_marcoVentana(R, 274, 54, 312, 112, 2, 4, [P.viga, P.vigaD, P.vigaL], false);
  for (let i = 0; i < 6; i++) { const sx = 126 + i * 22, m = Math.round(Math.sin(t * 1.2 + i * 1.3)); if (sx > 252) break; linea(118, 22, 260, 26, hex('#8a7a60')); c_pliegoP(R, sx + m, 24 + Math.round(i * 0.6), 16, 20, 30 + i); rect(sx + 3 + m, 22, sx + 4 + m, 25, hex('#a8845a')); }
  for (let k = 0; k < 14; k++) { const u = (t * 0.05 + h(k, 1, 90)) % 1, x = Math.round(270 - u * 70 + Math.sin(t + k) * 3), y = Math.round(70 + h(k, 2, 90) * 70 + u * 20); if (Math.sin(t * 1.7 + k * 2) > -0.3) c_tinte(R, x, y, C.blanco, 0.6); }
  return { suelo: 166, hoja: { x: HX + 2, y: HY + 2, w: 60, h: 80, poema: [HX + 22, HY + 17, HX + 37, HY + 64], grabado: [HX + 24, HY + 19, HX + 35, HY + 29] }, barra: [bx + 2, by], platina: [138, 96 + baja, 194, 104 + baja], forma: [128, 106, 204, 118],
    ventana: [274, 54, 312, 112], impresor: [250, 166], libre: [[118, 250]] };
}

// papel pintado verde a rayas con rombos (más tranquilo en la esquina de Atom)
function c_papelPintado(R, x0, y0, x1, y1, k = 0) {
  const P = c_P;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const atom = x > 266 && y < 50, raya = (x % 12) < 6, v = c_ruido(x, y, 18, k) + (c_um(x, y) - 0.5) * 0.2;
    let c = raya ? P.papV : P.papVS; if (v < 0.28) c = P.papVS; else if (v > 0.78 && raya) c = P.papVL;
    if (!atom) { const mx = ((x + 6) % 24) - 12, my = (y % 20) - 10, d = Math.abs(mx) + Math.abs(my); if (d === 5 || (d < 2)) c = P.papVO; else if (d === 4 && (x + y) & 1) c = P.papVL; }
    R.pset(x, y, c);
  }
}

// un boceto a tinta clavado en la pared (x, y arriba a la izquierda): la hoja con su chincheta y su dibujo (tipo 0 caras
// redondas, 1 un tigre a rayas, 2 un Santa, 3 una caricatura de perfil)
function c_boceto(R, x, y, w, hh, tipo, k = 0) {
  const { rect, pset, linea } = R, P = c_P, T0 = P.tinta;
  rect(x + 1, y + 1, x + w, y + hh, P.papVS); rect(x, y, x + w - 1, y + hh - 1, P.pliego); rect(x + w - 1, y, x + w - 1, y + hh - 1, P.pliegoS); rect(x, y + hh - 1, x + w - 1, y + hh - 1, P.pliegoS);
  R.disco(x + (w >> 1), y + 1, 1, C.rojo); pset(x + (w >> 1), y + 1, C.blanco);
  const cx = x + (w >> 1), cy = y + (hh >> 1) + 1;
  if (tipo === 0) { c_elipse(R, cx - 4, cy - 2, 4, 4, T0); c_elipse(R, cx + 4, cy + 3, 3, 3, T0); pset(cx - 5, cy - 3, T0); pset(cx - 3, cy - 3, T0); linea(cx - 6, cy, cx - 2, cy, T0); pset(cx + 3, cy + 2, T0); pset(cx + 5, cy + 2, T0); }
  else if (tipo === 1) { c_elipse(R, cx, cy + 1, 8, 4, T0); c_elipse(R, cx - 8, cy - 2, 3, 3, T0); for (let i = -5; i <= 6; i += 3) linea(cx + i, cy - 3, cx + i - 1, cy + 4, T0); linea(cx + 8, cy, cx + 11, cy - 4, T0); for (const dx of [-6, -2, 3, 7]) linea(cx + dx, cy + 5, cx + dx, cy + 7, T0); }
  else if (tipo === 2) { c_elipse(R, cx, cy + 3, 5, 5, T0); c_elipse(R, cx, cy - 5, 3, 3, T0); linea(cx - 3, cy - 7, cx + 4, cy - 12, T0); linea(cx + 3, cy - 7, cx + 4, cy - 12, T0); pset(cx + 5, cy - 12, T0); for (let i = -3; i <= 3; i++) pset(cx + i, cy - 2 + (i & 1), T0); linea(cx - 5, cy + 3, cx + 5, cy + 3, T0); }
  else { linea(cx - 4, cy - 8, cx + 2, cy - 8, T0); c_elipse(R, cx, cy - 2, 5, 6, T0, -1.6, 1.6); linea(cx + 5, cy - 2, cx + 8, cy, T0); linea(cx + 8, cy, cx + 5, cy + 1, T0); pset(cx + 2, cy - 4, T0); linea(cx - 3, cy + 5, cx - 6, cy + 9, T0); linea(cx + 2, cy + 5, cx + 6, cy + 9, T0); }
  for (let i = 0; i < 4; i++) { const yy = y + hh - 3 - (i % 2); if (h(i, k, 3) < 0.6) rect(x + 2 + i * 4, yy, x + 4 + i * 4, yy, P.tintaC); }
}

// el Santa a tinta del tablero (pies en cx, base): o.gordo 0–1 lo hace más redondo y risueño (barriga, carrillos)
function c_santaTinta(R, cx, base, s, gordo, t) {
  const T0 = c_P.tinta, rx = Math.round((5 + 6 * gordo) * s), ry = Math.round((6 + 2 * gordo) * s), by = base - Math.round(5 * s) - ry, hy = by - ry - Math.round(4 * s);
  c_elipse(R, cx, by, rx, ry, T0); R.linea(cx - rx + 1, by + 1, cx + rx - 1, by + 1, T0); R.linea(cx - rx + 1, by + 2, cx + rx - 1, by + 2, T0); R.rect(cx - 1, by, cx + 1, by + 3, c_P.pliego); c_elipse(R, cx, by + 1, 1, 1, T0);
  c_elipse(R, cx, hy, Math.round(4 * s), Math.round(4 * s), T0); R.pset(cx - Math.round(1.5 * s), hy - 1, T0); R.pset(cx + Math.round(1.5 * s), hy - 1, T0);
  if (gordo > 0.4) { R.pset(cx - Math.round(3 * s), hy + 1, C.rojo); R.pset(cx + Math.round(3 * s), hy + 1, C.rojo); }
  const sonr = Math.round(1 + gordo * 2 * s); R.linea(cx - sonr, hy + Math.round(2 * s), cx + sonr, hy + Math.round(2 * s), T0); R.pset(cx - sonr - 1, hy + Math.round(1.5 * s), T0); R.pset(cx + sonr + 1, hy + Math.round(1.5 * s), T0);
  for (let i = -Math.round(4 * s); i <= Math.round(4 * s); i++) R.pset(cx + i, hy + Math.round(4 * s) + ((i & 1) ? 1 : 0), T0);
  R.linea(cx - Math.round(4 * s), hy - Math.round(3 * s), cx + Math.round(6 * s), hy - Math.round(9 * s), T0); R.linea(cx + Math.round(4 * s), hy - Math.round(3 * s), cx + Math.round(6 * s), hy - Math.round(9 * s), T0); R.disco(cx + Math.round(7 * s), hy - Math.round(9 * s), Math.max(1, Math.round(s)), T0);
  R.linea(cx - rx, by - 2, cx - rx - Math.round(3 * s), by + Math.round(3 * s), T0); R.linea(cx + rx, by - 2, cx + rx + Math.round(3 * s), by + Math.round(2 * s) + Math.round(Math.sin(t * 3) * s), T0);
  for (const dx of [-Math.round(2 * s), Math.round(2 * s)]) { R.linea(cx + dx, by + ry, cx + dx, base - 1, T0); R.linea(cx + dx - (dx < 0 ? Math.round(2 * s) : 0), base, cx + dx + (dx > 0 ? Math.round(2 * s) : 0), base, T0); }
}

// una postal antigua con un Santa del color dado (22 × 30): cenefa, fondo de nieve, el Santa con su barba y un abeto
const c_COLORES_SANTA = { rojo: ['#b8202a', '#7a1018'], verde: ['#2a7a3a', '#1a5028'], marron: ['#7a4a26', '#52301a'], azul: ['#2a4a9a', '#1a3068'], morado: ['#6a2a7a', '#481a54'], blanco: ['#d8d0c0', '#a8a090'] };

function c_postal(R, x, y, color, k = 0) {
  const { rect, pset } = R, [c, cS] = (c_COLORES_SANTA[color] ?? c_COLORES_SANTA.rojo).map(hex), P = c_P;
  rect(x - 1, y - 1, x + 22, y + 30, C.k); rect(x, y, x + 21, y + 29, hex('#efe2c4')); rect(x + 1, y + 1, x + 20, y + 28, c); rect(x + 2, y + 2, x + 19, y + 27, hex('#dfe8f0'));
  for (let j = 3; j < 18; j++) for (let i = 3; i < 19; i++) if (h(i, j, k) < 0.06) pset(x + i, y + j, C.blanco);
  rect(x + 2, y + 21, x + 19, y + 27, C.blanco); rect(x + 2, y + 21, x + 19, y + 21, hex('#c8d4e0'));
  R.poligono([[x + 16, y + 9], [x + 19, y + 20], [x + 13, y + 20]], hex('#2a6a3a')); pset(x + 16, y + 8, C.amarillo);
  const sx = x + 5, sy = y + 6;
  c_sprite(R, ['...cc.', '..cccw', '.WWWW.', '.SSSS.', '.WSSW.', 'WWWWWW', 'cWWWWc', 'ccWWcc', 'cccccc', 'kkokkk', 'cccccc', 'WWWWWW', '.k..k.'], sx, sy, { c, k: C.k, W: C.blanco, S: hex('#f0c8a0'), w: C.blanco, o: C.oro }, false);
  pset(sx + 2, sy + 4, C.k); pset(sx + 4, sy + 4, C.k); for (let i = 0; i < 6; i++) pset(sx + i, sy + 8, cS);
  rect(x + 2, y + 28, x + 19, y + 28, P.pliegoS);
}

// un cartel de 1931 (30 × 36): fondo crema con marco rojo, el Santa rojo y risueño y, a su lado, una botella sin etiqueta
function c_cartel(R, x, y, k = 0) {
  const { rect, pset } = R, rojo = hex('#c8202a'), rojoS = hex('#8a1018');
  rect(x - 1, y - 1, x + 30, y + 36, C.k); rect(x, y, x + 29, y + 35, rojo); rect(x + 2, y + 2, x + 27, y + 29, hex('#f4e8cc'));
  for (let j = 3; j < 29; j++) for (let i = 3; i < 27; i++) if ((i + j) % 7 === 0 && j < 12) pset(x + i, y + j, hex('#e8d8b4'));
  R.disco(x + 11, y + 20, 7, rojoS); R.disco(x + 11, y + 20, 6, rojo); rect(x + 5, y + 21, x + 17, y + 22, C.k); pset(x + 11, y + 21, C.oro);
  R.disco(x + 11, y + 11, 4, hex('#f0c8a0')); R.disco(x + 11, y + 14, 4, C.blanco); pset(x + 9, y + 10, C.k); pset(x + 13, y + 10, C.k); pset(x + 9, y + 12, C.rosa ?? C.rojo); pset(x + 13, y + 12, C.rosa ?? C.rojo);
  R.poligono([[x + 6, y + 8], [x + 16, y + 8], [x + 19, y + 3], [x + 12, y + 3]], rojo); rect(x + 6, y + 7, x + 16, y + 8, C.blanco); R.disco(x + 20, y + 3, 1, C.blanco);
  rect(x + 7, y + 26, x + 9, y + 28, C.k); rect(x + 13, y + 26, x + 15, y + 28, C.k);
  const bx = x + 22; rect(bx - 2, y + 12, bx + 2, y + 27, hex('#2a1a12')); rect(bx - 1, y + 8, bx + 1, y + 12, hex('#2a1a12')); rect(bx - 1, y + 7, bx + 1, y + 7, C.grisL); pset(bx - 1, y + 14, hex('#8a6a50')); pset(bx - 1, y + 15, hex('#8a6a50'));
  rect(x + 2, y + 31, x + 27, y + 33, C.blanco); rect(x + 5, y + 32, x + 24, y + 32, hex('#e8b0b0'));
}

function c_estudio(R, t, o, cam) {
  return cam === 'tablero' ? c_estudioTablero(R, t, o) : c_estudioGeneral(R, t, o);
}

function c_estudioGeneral(R, t, o) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, VX0 = 20, VY0 = 36, VX1 = 58, VY1 = 98, ro = [C.madera, C.maderaS, C.maderaL, C.maderaD];
  c_fijo(R, 'nv-est-g', () => {
    rect(0, 0, 319, 9, hex('#3e3a34')); for (let x = 0; x < 320; x += 3) if (h(x, 0, 5) < 0.4) rect(x, 0, x, 8, hex('#36322c'));
    rect(0, 9, 319, 16, hex('#cfc4ae')); rect(0, 9, 319, 9, hex('#e8e0cc')); rect(0, 12, 319, 12, hex('#a89c84')); for (let x = 1; x < 320; x += 4) rect(x, 13, x + 1, 14, hex('#b8ac94')); rect(0, 16, 319, 16, hex('#8a7e68'));
    c_papelPintado(R, 0, 17, 319, 117, 5);
    rect(0, 117, 319, 120, K); rect(0, 118, 319, 118, C.maderaL); rect(0, 119, 319, 119, C.madera);
    rect(0, 121, 319, 142, C.maderaS); for (let x = -8; x < 320; x += 26) c_cuarteron(R, x + 3, 124, x + 22, 138, [C.madera, C.maderaL, C.maderaD, C.maderaS], x);
    rect(0, 139, 319, 142, C.maderaD); rect(0, 139, 319, 139, C.maderaL);
    c_tablas(R, 0, 319, 143, 179, 160, 50, [hex('#6a4426'), hex('#56361c'), hex('#7e5432'), hex('#3a2412')], 9, 7);
    // la alfombra con cenefa, en perspectiva
    for (let y = 150; y <= 177; y++) { const u = (y - 150) / 27, xa = Math.round(70 - u * 26), xb = Math.round(250 + u * 26);
      for (let x = xa; x <= xb; x++) { const i = (x - xa) / (xb - xa), b = y < 153 || y > 174 || i < 0.06 || i > 0.94, bb = y < 152 || y > 175 || i < 0.03 || i > 0.97;
        let c = bb ? P.alfomS : b ? ((x + y) % 4 < 2 ? P.alfomL : P.alfom) : P.alfom; if (!b) { const mx = Math.abs(((x - 160) % 20) - 10 + 10) % 20 - 10, my = ((y - 150) % 8) - 4; if (Math.abs(mx) + Math.abs(my) * 2 === 6) c = P.alfomL; else if (Math.abs(mx) + Math.abs(my) * 2 < 3) c = P.alfomA; }
        pset(x, y, c); } }
    // la ventana con cortinas y su galería
    c_calleFija(R, VX0, VY0, VX1, VY1, 21, true); c_marcoVentana(R, VX0, VY0, VX1, VY1, 2, 4, [hex('#e8e0d0'), hex('#a8a090'), C.blanco]);
    rect(VX0 - 6, VY1 + 3, VX1 + 6, VY1 + 6, K); rect(VX0 - 5, VY1 + 4, VX1 + 5, VY1 + 5, hex('#e8e0d0'));
    for (const [a, b, s] of [[8, 19, 1], [59, 70, -1]]) { for (let x = a; x <= b; x++) for (let y = 30; y <= 116; y++) { const f = (x - a) % 4, ata = y > 84 && y < 90; pset(x + (y > 90 && s > 0 ? Math.round((y - 90) * 0.0) : 0), y, ata ? P.laton : f === 0 ? P.cortinaS : f === 2 ? P.cortinaL : P.cortina); } rect(a, 116, b, 117, P.cortinaS); }
    rect(4, 25, 74, 31, K); rect(5, 26, 73, 30, P.cortina); rect(5, 26, 73, 26, P.cortinaL); for (let x = 6; x < 73; x += 2) pset(x, 31, P.laton);
    // el reloj de pared con caja de péndulo
    rect(82, 28, 100, 72, K); rect(83, 29, 99, 71, C.maderaS); rect(84, 30, 98, 70, C.madera); disco(91, 38, 6, K); disco(91, 38, 5, P.pliego);
    for (let a = 0; a < 12; a++) pset(Math.round(91 + Math.cos(a * 0.524) * 4), Math.round(38 + Math.sin(a * 0.524) * 4), P.tintaG); linea(91, 38, 91, 35, K); linea(91, 38, 93, 39, K);
    rect(86, 47, 96, 67, K); rect(87, 48, 95, 66, hex('#2a1a10')); rect(82, 26, 100, 28, C.maderaD); rect(84, 72, 98, 74, C.maderaD);
    // los bocetos clavados (caras, el tigre, un Santa, un perfil) y el grabado enmarcado
    c_boceto(R, 106, 30, 20, 24, 0, 1); c_boceto(R, 130, 34, 24, 18, 1, 2); c_boceto(R, 108, 60, 18, 26, 2, 3); c_boceto(R, 130, 58, 18, 24, 3, 4); c_boceto(R, 152, 76, 16, 18, 0, 5);
    rect(160, 32, 198, 64, K); rect(161, 33, 197, 63, P.dorado); rect(162, 34, 196, 62, P.doradoS); rect(161, 33, 197, 33, P.doradoL); rect(164, 36, 194, 60, P.pliego);
    for (let y = 37; y < 60; y++) for (let x = 165; x < 194; x++) { const cielo = y < 48 - Math.round(Math.sin(x * 0.2) * 3); if (!cielo ? (x + y) % 2 === 0 : (y % 3 === 0 && x % 2 === 0)) pset(x, y, cielo ? P.tintaC : P.tintaG); }
    for (let y = 44; y < 58; y++) pset(185, y, P.tinta); R.disco(185, 44, 4, P.tintaG);
    // la estantería con libros y el busto de yeso encima
    rect(206, 50, 248, 142, K); rect(207, 51, 247, 141, C.maderaS); rect(207, 51, 247, 52, C.maderaL);
    for (const [sy, k] of [[56, 1], [76, 2], [96, 3], [116, 4]]) { let x = 209; while (x < 244) { const w = 2 + Math.floor(h(x, k, 33) * 3), al = 12 + Math.floor(h(x, k, 34) * 6), col = [hex('#6a2a2a'), hex('#2a3a5a'), hex('#3a5a3a'), hex('#7a5a2a'), hex('#4a2a4a'), hex('#8a3a2a')][Math.floor(h(x, k, 35) * 6)];
      if (h(x, k, 36) < 0.1) { x += 3; continue; } rect(x, sy + 18 - al, x + w - 1, sy + 17, col); pset(x, sy + 18 - al, C.blanco); rect(x, sy + 20 - al, x + w - 1, sy + 20 - al, P.laton); x += w + 1; }
      rect(207, sy + 18, 247, sy + 19, C.maderaL); rect(207, sy + 20, 247, sy + 20, C.maderaD); }
    disco(226, 40, 5, hex('#c8c0b0')); disco(225, 39, 4, hex('#e8e2d6')); rect(220, 44, 232, 50, hex('#c8c0b0')); rect(221, 44, 231, 45, hex('#e8e2d6')); pset(224, 39, hex('#a8a090')); pset(227, 39, hex('#a8a090'));
    // la estufa de hierro sobre sus patas, con el tubo que entra en la pared; el cubo del carbón
    rect(252, 104, 288, 108, K); rect(253, 105, 287, 107, P.hierroL);
    rect(254, 108, 286, 140, K); for (let y = 109; y < 140; y++) for (let x = 255; x < 286; x++) pset(x, y, x < 260 ? P.hierroL : x > 281 ? P.hierroS : (y % 6 === 0 ? P.hierroS : P.hierro));
    rect(262, 120, 278, 132, K); rect(263, 121, 277, 131, hex('#4a1a10')); for (let x = 264; x < 277; x += 3) rect(x, 121, x, 131, K);
    for (const lx of [256, 282]) { rect(lx, 140, lx + 2, 148, K); rect(lx - 1, 147, lx + 3, 148, K); }
    rect(266, 56, 274, 104, K); rect(267, 56, 273, 103, P.hierro); rect(267, 56, 268, 103, P.hierroL); for (let y = 66; y < 104; y += 14) rect(266, y, 274, y + 1, P.hierroS);
    rect(264, 52, 276, 57, K); rect(265, 53, 275, 56, P.hierroL);
    rect(292, 132, 306, 147, K); rect(293, 133, 305, 146, P.hierro); rect(293, 133, 305, 133, P.hierroL); for (let i = 0; i < 6; i++) disco(295 + i * 2, 131 + (i % 2), 1, hex('#1a1a20'));
    // el carpetón apoyado y la papelera con bolas de papel
    R.poligono([[76, 142], [94, 142], [98, 114], [80, 114]], K); R.poligono([[77, 141], [93, 141], [97, 115], [81, 115]], hex('#3a2a20')); linea(80, 128, 95, 128, hex('#8a3a2a'));
    rect(186, 128, 200, 142, K); for (let y = 129; y < 142; y++) for (let x = 187; x < 200; x++) pset(x, y, (x + y) % 3 ? hex('#a8844a') : hex('#7a5a2a'));
    for (const [bx, by] of [[190, 126], [196, 127], [193, 124]]) { disco(bx, by, 2, K); disco(bx, by, 1, P.pliego); }
    for (const [bx, by] of [[176, 150], [204, 152]]) { disco(bx, by, 2, K); disco(bx, by, 1, P.pliego); }
  });
  // la calle nevada de fuera con su farol de gas, recortada a la ventana
  c_calleViva(R, t, VX0, VY0, VX1, VY1, 21, 50); c_marcoVentana(R, VX0, VY0, VX1, VY1, 2, 4, [hex('#e8e0d0'), hex('#a8a090'), C.blanco], false);
  // el péndulo, el aplique de gas, el fuego de la estufa, la tetera que echa vapor y el perrito que respira
  c_pendulo(R, 91, 48, 14, t, 1.4);
  { const ax = 168, ay = 92; rect(ax - 1, ay, ax + 1, ay + 8, P.laton); linea(ax, ay + 8, ax + 6, ay + 4, P.latonS); rect(ax + 4, ay - 2, ax + 8, ay + 3, K); rect(ax + 5, ay - 1, ax + 7, ay + 2, hex('#f8f0d0')); c_llama(R, ax + 6, ay - 2, t, 7); c_halo(R, ax + 6, ay, 24, 18, c_P.farol, 0.16 + Math.sin(t * 8) * 0.02); }
  for (let y = 122; y < 131; y++) for (let x = 264; x < 277; x++) if ((x - 264) % 3) pset(x, y, c_grad([c_P.fuego0, c_P.fuego1, c_P.fuego2], (y - 122) / 9 + Math.sin(t * 8 + x) * 0.15, x, y));
  c_halo(R, 270, 150, 34, 8, c_P.fuego2, 0.18 + Math.sin(t * 6) * 0.03);
  { const kx = 270; rect(kx - 6, 96, kx + 4, 104, K); rect(kx - 5, 97, kx + 3, 103, P.peltre); rect(kx - 5, 97, kx + 3, 97, C.blanco); rect(kx + 4, 98, kx + 7, 99, K); rect(kx - 3, 94, kx + 1, 96, K); c_humo(R, kx + 8, 96, t, 3, C.blanco, 22); }
  { const r = Math.sin(t * 2.4) > 0 ? 1 : 0, x = 236, y = 156, cola = Math.floor(t * 3) % 2; rect(x, y - 4 - r, x + 12, y, K); rect(x + 1, y - 3 - r, x + 11, y - 1, hex('#e8e0d0')); rect(x + 6, y - 3 - r, x + 9, y - 2, hex('#8a5a3a')); rect(x + 10, y - 6, x + 15, y - 1, K); rect(x + 11, y - 5, x + 14, y - 2, hex('#e8e0d0')); rect(x + 13, y - 5, x + 14, y - 3, hex('#8a5a3a')); pset(x + 12, y - 4, K); pset(x - 1, y - 3 - cola, K); pset(x - 2, y - 4 - cola, K); }
  return { suelo: 160, ventana: [VX0, VY0, VX1, VY1], tablero: { x0: 143, x1: 211, arriba: 118, abajo: 146, hoja: [154, 120, 200, 142], boceto: [182, 140] }, dibujante: [126, 160], estufa: [252, 104, 288, 148], estanteria: [206, 50, 248, 142], reloj: [91, 38],
    bocetos: [104, 28, 170, 96], libre: [[100, 144], [212, 250]] };
}

// el tablero del dibujante, por delante de los actores: tablero inclinado con la hoja y el Santa a tinta (o.gordo), el
// listón con las plumas, la lámpara de aceite con su luz y las patas en tijera
function c_tableroDibujante(R, t, o) {
  const { rect, pset, linea } = R, P = c_P, K = C.k;
  for (const [a, b] of [[150, 160], [204, 194]]) { linea(a, 160, b, 146, K); linea(a + 1, 160, b + 1, 146, C.maderaS); linea(a + 2, 160, b + 2, 146, K); }
  rect(156, 152, 200, 154, K); rect(157, 153, 199, 153, C.maderaS);
  for (let y = 118; y <= 144; y++) { const u = (y - 118) / 26, xa = Math.round(146 - u * 3), xb = Math.round(208 + u * 3); rect(xa, y, xb, y, K); if (y > 118 && y < 144) rect(xa + 1, y, xb - 1, y, y < 121 ? C.maderaL : C.madera); }
  rect(154, 120, 200, 142, K); rect(155, 121, 199, 141, P.pliego); rect(155, 141, 199, 141, P.pliegoS); for (const cx of [155, 199]) pset(cx, 121, C.rojo);
  for (let y = 124; y < 140; y += 3) rect(157, y, 163, y, P.tintaC);
  c_santaTinta(R, 182, 140, 0.8, o.gordo ?? 0.3, t);
  rect(146, 144, 210, 146, K); rect(147, 145, 209, 145, C.maderaL); rect(152, 143, 164, 143, hex('#2a2a40')); pset(164, 143, P.laton); rect(168, 143, 176, 143, hex('#8a3a2a'));
  { const lx = 206, ly = 112; rect(lx - 3, ly + 6, lx + 3, ly + 8, K); rect(lx - 1, ly - 2, lx + 1, ly + 6, P.laton); rect(lx - 3, ly - 6, lx + 3, ly - 2, K); rect(lx - 2, ly - 5, lx + 2, ly - 3, hex('#f8f0d0')); c_llama(R, lx, ly - 6, t, 9); c_halo(R, lx, ly + 4, 28, 14, c_P.farol, 0.14); }
  rect(150, 140, 154, 143, K); rect(151, 141, 153, 142, hex('#1a1a2a'));
}

function c_estudioTablero(R, t, o) {
  const { rect, pset, linea } = R, P = c_P, K = C.k;
  c_fijo(R, 'nv-est-t', () => {
    rect(0, 0, 319, 6, hex('#cfc4ae')); rect(0, 6, 319, 7, hex('#8a7e68'));
    c_papelPintado(R, 0, 8, 319, 127, 9);
    rect(0, 127, 319, 130, K); rect(0, 128, 319, 128, C.maderaL); rect(0, 131, 319, 147, C.maderaS); for (let x = -4; x < 320; x += 30) c_cuarteron(R, x + 3, 133, x + 26, 145, [C.madera, C.maderaL, C.maderaD, C.maderaS], x + 3);
    c_tablas(R, 0, 319, 148, 179, 120, 60, [hex('#6a4426'), hex('#56361c'), hex('#7e5432'), hex('#3a2412')], 13, 6);
    // la mesa del tablero: patas en tijera, el travesaño y la balda con carpetas y botes de tinta
    for (const [a, b] of [[214, 236], [300, 278]]) { linea(a, 172, b, 132, K); linea(a + 1, 172, b + 1, 132, C.maderaS); linea(a + 2, 172, b + 2, 132, K); linea(a + 3, 172, b + 3, 132, C.maderaD); }
    rect(222, 156, 296, 159, K); rect(223, 157, 295, 158, C.madera); rect(232, 150, 270, 156, K); rect(233, 151, 269, 155, hex('#3a2a20')); rect(233, 151, 269, 151, hex('#5a4434'));
    for (const [bx, c] of [[276, hex('#1a1a2a')], [284, hex('#5a1a1a')]]) { rect(bx, 149, bx + 5, 156, K); rect(bx + 1, 150, bx + 4, 155, c); pset(bx + 1, 150, C.blanco); }
    // una silla de rejilla junto al tablero
    rect(188, 140, 192, 172, K); rect(189, 141, 191, 172, C.maderaS); rect(178, 148, 206, 152, K); rect(179, 149, 205, 151, hex('#c8a060')); for (let x = 180; x < 205; x += 2) pset(x, 150, hex('#a8844a')); rect(202, 152, 205, 172, K); rect(179, 152, 182, 172, K);
    // el suelo con papeles caídos y bolas de papel
    for (const [bx, by] of [[150, 168], [172, 174], [100, 172], [60, 166]]) { R.disco(bx, by, 2, K); R.disco(bx, by, 1, P.pliego); }
    R.poligono([[120, 170], [136, 166], [140, 172], [124, 176]], P.pliego); linea(124, 171, 134, 169, P.tintaC);
  });
  // los carteles de 1931 que llenan la pared (por detrás del tendedero)
  const POS = [[8, 16], [44, 16], [80, 16], [116, 16], [152, 16], [8, 58], [44, 58], [80, 58], [116, 58], [152, 58], [200, 16], [236, 16]], nC = Math.round((o.carteles ?? 0) * POS.length + 0.001);
  POS.slice(0, nC).forEach(([x, y], i) => c_cartel(R, x, y, i));
  // el tablero grande, inclinado, con la hoja y el Santa a tinta
  for (let y = 66; y <= 134; y++) { const u = (y - 66) / 68, xa = Math.round(206 - u * 6), xb = Math.round(312 + u * 2); rect(xa, y, xb, y, K); if (y > 66 && y < 134) { rect(xa + 1, y, xb - 1, y, y < 70 ? C.maderaL : C.madera); if ((y * 7) % 13 === 0) rect(xa + 2, y, xa + 6, y, C.maderaS); } }
  rect(214, 72, 304, 128, K); rect(215, 73, 303, 127, P.pliego); rect(215, 126, 303, 127, P.pliegoS); for (const [cx, cy] of [[215, 73], [303, 73], [215, 127], [303, 127]]) { R.disco(cx, cy, 1, C.rojo); pset(cx, cy, C.blanco); }
  for (let y = 76; y < 124; y += 3) if (h(y, 0, 4) < 0.5) rect(218, y, 226 + Math.floor(h(y, 1, 4) * 6), y, P.tintaC);
  c_santaTinta(R, 262, 124, 1.9, o.gordo ?? 0.5, t);
  rect(198, 134, 316, 137, K); rect(199, 135, 315, 136, C.maderaL); rect(206, 133, 226, 133, hex('#2a2a40')); pset(226, 133, P.laton); rect(232, 133, 244, 133, hex('#8a3a2a'));
  { const lx = 300, ly = 60; linea(lx + 8, 66, lx + 8, 52, K); linea(lx + 8, 52, lx, 52, K); rect(lx - 4, 52, lx + 3, 56, K); rect(lx - 3, 53, lx + 2, 55, P.latonL); c_halo(R, 262, 96, 54, 34, c_P.farol, 0.12 + Math.sin(t * 7) * 0.01); }
  // el tendedero con las postales que se mecen y sus pinzas
  const cols = o.postales ?? ['verde', 'rojo', 'marron', 'azul', 'morado', 'blanco'], quita = o.quita ?? [], XS = [14, 44, 74, 104, 134, 164];
  R.disco(8, 38, 1, P.laton); R.disco(200, 42, 1, P.laton);
  const yCuerda = (x) => Math.round(38 + (x - 8) / 192 * 4 + Math.sin((x - 8) / 192 * Math.PI) * 7);
  for (let x = 8; x <= 200; x++) pset(x, yCuerda(x), hex('#8a7a60'));
  const postales = [];
  XS.forEach((px, i) => { if (i >= cols.length) return; const y = yCuerda(px + 11) + 2, m = Math.round(Math.sin(t * 1.6 + i * 1.9) * 0.9); postales.push([px + m, y, px + m + 21, y + 29]);
    rect(px + 4, y - 3, px + 6, y + 1, hex('#c8a46a')); rect(px + 15, y - 3, px + 17, y + 1, hex('#c8a46a'));
    if (!quita.includes(i)) c_postal(R, px + m, y, cols[i], i); });
  return { suelo: 164, postales, cuerda: [8, 38, 200, 42], tablero: [200, 66, 316, 137], hoja: [214, 72, 304, 128], santa: [262, 124], carteles: POS.slice(0, nC).map(([x, y]) => [x, y, x + 29, y + 35]), libre: [[20, 196]] };
}

// el árbol de Navidad victoriano (cx, top: la punta, base: el pie de las ramas, hw: medio ancho abajo): pisos de ramas con
// luz y sombra, guirnaldas de cuentas, bolas, cestitas, hombrecitos de jengibre, el ángel; devuelve las velas
function c_arbolV(R, cx, top, base, hw, k = 0) {
  const { pset, disco, rect } = R, P = c_P, N = 6, alto = base - top, ancho = (y) => { const r = (y - top) / alto, tf = (r * N) % 1; return hw * (0.08 + 0.92 * r) * (0.6 + 0.4 * tf); };
  for (let y = top + 4; y <= base; y++) { const w = ancho(y), r = (y - top) / alto, tf = (r * N) % 1;
    for (let x = Math.round(cx - w - h(y, 1, k) * 2); x <= Math.round(cx + w + h(y, 2, k) * 2); x++) { const u = (x - cx) / (w + 1), n = h(x, y, k + 3);
      let c = u < -0.45 ? P.abetoL : u > 0.4 ? P.abetoS : P.abeto; if (tf > 0.82) c = c === P.abetoL ? P.abeto : P.abetoD; if (n < 0.14) c = P.abetoD; else if (n > 0.9 && u < 0.3) c = P.abetoL; pset(x, y, c); } }
  const velas = [];
  for (let i = 0; i < N; i++) { const y = Math.round(top + alto * (i + 0.9) / N), w = ancho(y);
    for (let x = cx - w + 2; x <= cx + w - 2; x++) { const yy = y - 3 - Math.round(Math.sin((x - cx + w) / (2 * w) * Math.PI) * -2) - 2; if ((x & 1) === 0) pset(x, yy, (x & 2) ? P.doradoL : P.dorado); }
    const nv = 2 + i; for (let v = 0; v < nv; v++) { const x = Math.round(cx - w * 0.85 + (2 * w * 0.85) * (v + 0.5) / nv), yv = y - 2; rect(x, yv - 3, x, yv, C.blanco); pset(x, yv - 3, c_P.blancoWS); pset(x - 1, yv + 1, P.dorado); pset(x + 1, yv + 1, P.dorado); velas.push([x, yv - 3]); } }
  const COLB = [[C.rojo, hex('#f08080')], [hex('#d8a840'), hex('#fff0a0')], [hex('#3a5ac8'), hex('#a0b8f0')], [hex('#c8c8d8'), C.blanco]];
  const nb = Math.round(alto / 3);
  for (let b = 0; b < nb; b++) { const y = Math.round(top + 8 + h(b, 1, k + 5) * (alto - 10)), w = ancho(y) * 0.8, x = Math.round(cx + (h(b, 2, k + 5) * 2 - 1) * w), tipo = Math.floor(h(b, 3, k + 5) * 6);
    if (tipo < 3) { const [c, cl] = COLB[tipo]; disco(x, y, 1, c); pset(x, y - 2, P.doradoS); pset(x - 1, y - 1, cl); }
    else if (tipo === 3) { const [c, cl] = COLB[3]; pset(x, y, cl); pset(x, y + 1, c); }
    else if (tipo === 4) { pset(x, y - 1, C.jengibre); rect(x - 1, y, x + 1, y, C.jengibre); pset(x, y + 1, C.jengibre); pset(x - 1, y + 2, C.jengibreS); pset(x + 1, y + 2, C.jengibreS); }
    else { pset(x - 1, y - 1, C.rojo); pset(x + 1, y - 1, C.rojo); rect(x - 1, y, x + 1, y, C.blanco); pset(x, y + 1, C.rojo); } }
  // el ángel de la punta
  const ay = top; rect(cx - 1, ay - 1, cx + 1, ay + 5, C.blanco); pset(cx, ay - 3, hex('#f0c8a0')); pset(cx - 1, ay - 3, hex('#f0c8a0')); rect(cx - 1, ay - 5, cx + 1, ay - 5, P.doradoL);
  for (const s of [-1, 1]) { pset(cx + 2 * s, ay, c_P.blancoW); pset(cx + 3 * s, ay - 1, c_P.blancoW); pset(cx + 3 * s, ay, c_P.blancoWS); pset(cx + 2 * s, ay + 1, c_P.blancoWS); }
  return velas;
}

// papel de damasco rojo con su red de rombos y flores (tranquilo en la esquina de Atom)
function c_damasco(R, x0, y0, x1, y1, k = 0) {
  const P = c_P;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const atom = x > 266 && y < 50, v = c_ruido(x, y, 16, k) + (c_um(x, y) - 0.5) * 0.18; let c = v < 0.3 ? P.damS : P.dam;
    if (!atom) { const mx = ((x + 8) % 16) - 8, my = ((y + 10) % 20) - 10, d = Math.abs(mx) * 1.25 + Math.abs(my); if (Math.abs(d - 9) < 0.6) c = P.damL; else if (d < 3 && (x + y) & 1) c = P.doradoS; else if (d < 2) c = P.damL; }
    R.pset(x, y, c); }
}

function c_windsor(R, t, o, cam) { return cam === 'arbol' ? c_windsorArbol(R, t, o) : c_windsorGeneral(R, t, o); }

// la cornisa dorada y el techo claro
function c_techoPalacio(R, y1) {
  const { rect, pset } = R, P = c_P; rect(0, 0, 319, y1 - 8, hex('#ddd2bc')); for (let x = 0; x < 320; x += 40) rect(x, 0, x + 1, y1 - 9, hex('#cfc4ac'));
  rect(0, y1 - 8, 319, y1, P.doradoS); rect(0, y1 - 7, 319, y1 - 6, P.dorado); rect(0, y1 - 7, 319, y1 - 7, P.doradoL); for (let x = 0; x < 320; x += 4) { pset(x + 1, y1 - 4, P.doradoL); pset(x + 1, y1 - 3, P.dorado); pset(x + 3, y1 - 3, hex('#5a3a18')); }
  rect(0, y1 - 1, 319, y1, hex('#5a3a18'));
}

function c_windsorGeneral(R, t, o) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, VX0 = 224, VY0 = 38, VX1 = 260, VY1 = 108;
  let velas = null;
  c_fijo(R, 'nv-win-g', () => {
    c_techoPalacio(R, 20); c_damasco(R, 0, 21, 319, 121, 3);
    rect(0, 121, 319, 124, K); rect(0, 122, 319, 122, P.doradoL); rect(0, 123, 319, 123, P.dorado);
    rect(0, 125, 319, 145, P.blancoW); for (let x = -6; x < 320; x += 30) { rect(x + 4, 128, x + 26, 142, P.blancoWS); rect(x + 5, 129, x + 25, 141, P.blancoW); rect(x + 5, 129, x + 25, 129, P.blancoWL); rect(x + 25, 130, x + 25, 141, P.blancoWS); }
    rect(0, 145, 319, 148, K); rect(0, 146, 319, 146, P.blancoWS);
    c_tablas(R, 0, 319, 149, 179, 160, 60, [P.parq, P.parqS, P.parqL, hex('#5a3a1c')], 17, 8);
    // la alfombra de cenefa dorada
    for (let y = 154; y <= 179; y++) { const u = (y - 154) / 25, xa = Math.round(52 - u * 30), xb = Math.round(268 + u * 30);
      for (let x = xa; x <= xb; x++) { const i = (x - xa) / (xb - xa), b = y < 157 || i < 0.05 || i > 0.95; let c = b ? ((x + y) % 4 < 2 ? P.dorado : P.alfomS) : hex('#3a2a5a'); if (!b) { const m = Math.abs(((x - 160 + 400) % 18) - 9) + Math.abs(((y - 154) % 10) - 5) * 1.6; if (m < 3) c = hex('#8a2a3a'); else if (Math.abs(m - 7) < 0.8) c = P.doradoS; } pset(x, y, c); } }
    // la chimenea de mármol blanco veteado, el hogar y el espejo dorado encima
    const marmol = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, Math.abs(Math.sin(x * 0.3 + y * 0.12 + Math.sin(y * 0.2) * 2)) < 0.08 ? hex('#a8a4a0') : x === x0 ? C.blanco : x === x1 ? hex('#c8c4bc') : hex('#ece8e0')); };
    rect(16, 104, 96, 147, K); marmol(17, 110, 29, 146); marmol(83, 110, 95, 146); marmol(17, 104, 95, 113); rect(12, 100, 100, 104, K); marmol(13, 101, 99, 103); rect(13, 104, 99, 104, hex('#a8a4a0'));
    rect(30, 114, 82, 146, K); for (let y = 115; y < 147; y++) for (let x = 31; x < 82; x++) pset(x, y, c_grad([c_P.hollin, hex('#3a2a24')], (y - 114) / 34, x, y));
    rect(36, 136, 76, 140, K); for (let x = 37; x < 76; x += 3) rect(x, 128, x, 140, P.hierro); rect(36, 128, 76, 129, P.hierroL);
    rect(20, 146, 92, 150, K); marmol(21, 147, 91, 149);
    rect(28, 38, 84, 98, K); rect(29, 39, 83, 97, P.dorado); rect(29, 39, 83, 40, P.doradoL); rect(82, 41, 83, 97, P.doradoS); for (let x = 30; x < 83; x += 3) { pset(x, 41, P.doradoL); pset(x, 95, P.doradoS); }
    rect(33, 43, 79, 93, hex('#4a3a48')); for (let y = 44; y < 93; y++) for (let x = 34; x < 79; x++) { const v = c_ruido(x, y, 12, 4); pset(x, y, v > 0.6 ? hex('#5a4a5a') : v < 0.3 ? hex('#3a2c3a') : hex('#4a3a48')); }
    for (let k = 0; k < 7; k++) linea(40 + k * 5, 44, 34 + k * 5, 92, hex('#6a5a6a'));
    R.poligono([[28, 38], [56, 30], [84, 38]], K); R.poligono([[31, 37], [56, 31], [81, 37]], P.dorado); pset(56, 32, P.doradoL);
    // la guirnalda de hoja perenne en la repisa, el reloj dorado y los candelabros
    for (let x = 14; x < 99; x++) { const y = 104 + Math.round(Math.abs(Math.sin((x - 14) / 85 * Math.PI * 3)) * 4); pset(x, y, P.abeto); pset(x, y + 1, P.abetoS); if (x % 5 === 0) pset(x, y - 1, P.abetoL); if (x % 14 === 0) { pset(x, y + 2, C.rojo); pset(x + 1, y + 2, C.rojo); } }
    rect(48, 86, 64, 100, K); rect(49, 87, 63, 99, P.dorado); rect(49, 87, 63, 87, P.doradoL); disco(56, 92, 4, K); disco(56, 92, 3, C.blanco); linea(56, 92, 56, 90, K); linea(56, 92, 58, 92, K);
    // el ventanal con cortinajes de terciopelo y su galería con flecos
    c_calleNoche(R, VX0, VY0, VX1, VY1);
    c_marcoVentana(R, VX0, VY0, VX1, VY1, 2, 5, [P.blancoW, P.blancoWS, P.blancoWL]);
    for (const [a, b, s] of [[208, 222, 1], [262, 276, -1]]) for (let y = 30; y <= 140; y++) { const tirante = y > 92 ? Math.round((y - 92) * 0.12 * s) : 0; for (let x = a; x <= b; x++) { const f = (x - a + y * 0) % 5; pset(x + tirante, y, f === 0 ? hex('#5a1018') : f === 3 ? hex('#a8303a') : hex('#821c26')); } if (y > 92 && y < 96) for (let x = a; x <= b; x++) pset(x + tirante, y, P.dorado); }
    rect(204, 24, 280, 31, K); rect(205, 25, 279, 30, hex('#821c26')); rect(205, 25, 279, 25, hex('#a8303a')); for (let x = 205; x < 280; x += 2) { pset(x, 31, P.dorado); pset(x, 32, P.doradoS); }
    // el retrato ovalado, el paisaje y los apliques
    rect(100, 40, 128, 76, K); for (let y = 41; y < 76; y++) for (let x = 101; x < 128; x++) { const d = ((x - 114.5) / 13) ** 2 + ((y - 58) / 17) ** 2; if (d < 1) pset(x, y, d > 0.78 ? (y < 58 ? P.doradoL : P.dorado) : hex('#2a2a3a')); else pset(x, y, P.dam); }
    rect(110, 54, 119, 72, hex('#1a1a26')); disco(114, 54, 4, hex('#e8c8a8')); rect(110, 50, 118, 52, hex('#4a3020')); rect(111, 60, 117, 61, C.blanco); rect(108, 64, 121, 72, hex('#3a1a2a'));
    rect(284, 58, 316, 84, K); rect(285, 59, 315, 83, P.dorado); rect(285, 59, 315, 59, P.doradoL); rect(288, 62, 312, 80, hex('#9ac0d8'));
    for (let y = 62; y < 81; y++) for (let x = 288; x < 313; x++) { if (y > 72 - Math.round(Math.sin(x * 0.3) * 2)) pset(x, y, y > 76 ? hex('#5a7a3a') : hex('#7a9a4a')); else if (y > 69 && (x % 7) < 4) pset(x, y, hex('#4a6a5a')); }
    // la mesa del árbol: patas torneadas, el mantel blanco con su encaje y el tiesto forrado de tela
    for (const lx of [132, 186]) { rect(lx, 132, lx + 3, 150, K); rect(lx + 1, 132, lx + 2, 150, P.parqL); rect(lx - 1, 140, lx + 4, 141, K); }
    rect(122, 118, 198, 121, K); rect(123, 119, 197, 120, C.blanco);
    for (let x = 122; x <= 198; x++) { const fin = 134 + ((x % 6) < 3 ? 1 : 0); for (let y = 121; y <= fin; y++) pset(x, y, x === 122 || x === 198 ? K : y === fin ? c_P.blancoWS : (y > 130 && (x + y) % 3 === 0) ? c_P.blancoWS : C.blanco); }
    rect(150, 110, 170, 118, K); rect(151, 111, 169, 117, C.rojoN); rect(151, 111, 169, 111, hex('#e04040')); for (let x = 152; x < 169; x += 3) pset(x, 114, P.dorado);
    velas = c_arbolV(R, 160, 46, 110, 32, 2);
    // los juguetes al pie: el tambor, la muñeca, el caballito y dos cajas con lazo
    rect(126, 109, 138, 118, K); rect(127, 110, 137, 117, C.rojo); rect(127, 110, 137, 111, C.blanco); for (let x = 128; x < 137; x += 2) { pset(x, 113 + (x % 4 ? 1 : 0), P.dorado); } rect(127, 116, 137, 117, C.blanco); linea(130, 108, 134, 104, P.parqL);
    rect(176, 106, 182, 118, K); rect(177, 111, 181, 117, hex('#6a8ac8')); disco(179, 108, 2, hex('#f0d0b0')); rect(177, 106, 181, 106, hex('#c89a4a'));
    c_sprite(R, ['.kkk....', 'kWWk....', '.kWWWWWk', '..WWWWW.', '..k...k.', '.kkkkkkk'], 184, 111, { k: K, W: hex('#e8d8c0') });
    for (const [bx, by, c] of [[140, 112, hex('#3a6ac8')], [166, 113, P.dorado]]) { rect(bx, by, bx + 8, by + 5, K); rect(bx + 1, by + 1, bx + 7, by + 5, c); rect(bx + 4, by, bx + 4, by + 5, C.rojo); pset(bx + 3, by - 1, C.rojo); pset(bx + 5, by - 1, C.rojo); }
  });
  if (!velas) velas = c_velasCache(R, 'nv-win-g', () => c_arbolVelas(160, 46, 110, 32));
  // la nieve de fuera (recortada), las velas del árbol y su luz, el fuego, los candelabros, los apliques y el perrito
  R.recorte([VX0, VY0, VX1, VY1]); c_copos(R, t, 26, VX0, VY0, VX1, VY1, 4, 10); R.recorte(null); c_marcoVentana(R, VX0, VY0, VX1, VY1, 2, 5, [P.blancoW, P.blancoWS, P.blancoWL], false);
  velas.forEach(([x, y], i) => c_llama(R, x, y, t, i));
  c_halo(R, 160, 84, 54, 44, c_P.farol, 0.13 + Math.sin(t * 5) * 0.015);
  c_troncos(R, 56, 140, 12); c_fuego(R, 56, 138, 12, t, 3); c_halo(R, 56, 156, 46, 10, c_P.fuego2, 0.2 + Math.sin(t * 7) * 0.03);
  for (const cx of [20, 92]) { rect(cx - 4, 98, cx + 4, 100, c_P.doradoS); rect(cx, 90, cx, 98, c_P.dorado); rect(cx - 4, 92, cx + 4, 92, c_P.dorado); for (const dx of [-4, 0, 4]) { rect(cx + dx, 86 + (dx ? 2 : 0), cx + dx, 90 + (dx ? 2 : 0), C.blanco); c_llama(R, cx + dx, 86 + (dx ? 2 : 0), t, cx + dx); } }
  for (const [sx, sy] of [[100, 92], [200, 70]]) { rect(sx - 1, sy, sx + 1, sy + 6, c_P.dorado); rect(sx - 4, sy - 1, sx + 4, sy, c_P.doradoS); for (const dx of [-4, 4]) { rect(sx + dx, sy - 5, sx + dx, sy - 2, C.blanco); c_llama(R, sx + dx, sy - 5, t, sx + dx); } c_halo(R, sx, sy - 6, 14, 10, c_P.farol, 0.12); }
  { const x = 274, y = 160, cola = Math.round(Math.sin(t * 9)); rect(x, y - 5, x + 12, y, K); rect(x + 1, y - 4, x + 11, y - 1, C.blanco); rect(x + 3, y - 4, x + 7, y - 2, hex('#a0522d')); rect(x + 9, y - 8, x + 15, y - 2, K); rect(x + 10, y - 7, x + 14, y - 3, hex('#a0522d')); rect(x + 13, y - 4, x + 14, y - 3, C.blanco); rect(x + 9, y - 7, x + 10, y - 2, hex('#7a3a1a')); pset(x + 13, y - 6, K);
    pset(x - 1, y - 4 + cola, K); pset(x - 2, y - 5 + cola * 2, K); for (const lx of [x + 1, x + 4, x + 8, x + 10]) pset(lx, y + 1, K); }
  return { suelo: 160, arbol: { x: 160, punta: 40, base: 118, mesa: [122, 118, 198, 134] }, chimenea: { boca: [30, 114, 82, 146], repisa: 100, espejo: [28, 38, 84, 98] }, ventana: [VX0, VY0, VX1, VY1], retrato: [100, 40, 128, 76],
    sitios: { reina: 112, alberto: 204, ninos: [88, 132, 188, 230] }, perro: [274, 160], libre: [[96, 250]] };
}

// lo de fuera del ventanal de Windsor de noche: el parque nevado, árboles oscuros, la luna y una torre lejana
function c_calleNoche(R, x0, y0, x1, y1) {
  const { pset } = R, P = c_P, hor = y0 + Math.round((y1 - y0) * 0.6);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y < hor ? c_grad([P.n1, P.n2, P.n3, P.n4], (y - y0) / (hor - y0), x, y) : c_grad([P.nieveNS, P.nieveN, P.nieveNL], (y - hor) / (y1 - hor), x, y));
  for (let i = 0; i < 10; i++) pset(x0 + Math.floor(h(i, 1, 9) * (x1 - x0)), y0 + Math.floor(h(i, 2, 9) * (hor - y0 - 6)), C.blanco);
  R.disco(x1 - 9, y0 + 9, 4, P.luna); R.disco(x1 - 8, y0 + 8, 2, C.blanco);
  for (let x = x0; x <= x1; x++) { const a = 4 + Math.round(Math.abs(Math.sin(x * 0.4)) * 6 + h(x, 1, 3) * 3); for (let j = 0; j < a; j++) pset(x, hor - j, j > a - 2 ? P.abFL : P.abN0); }
  for (let y = hor - 22; y < hor; y++) for (let x = x0 + 6; x < x0 + 11; x++) pset(x, y, y < hor - 19 && (x & 1) ? P.n2 : P.abFF); for (let y = hor - 18; y < hor - 4; y += 5) pset(x0 + 8, y, c_P.farol);
}

// las velas del árbol de Windsor cuando el búfer ya estaba hecho (mismo cálculo que c_arbolV, sin pintar)
const c_VELAS = new WeakMap();

function c_velasCache(R, clave, f) { let m = c_VELAS.get(R); if (!m) c_VELAS.set(R, (m = {})); return m[clave] ?? (m[clave] = f()); }

function c_arbolVelas(cx, top, base, hw) {
  const N = 6, alto = base - top, ancho = (y) => { const r = (y - top) / alto, tf = (r * N) % 1; return hw * (0.08 + 0.92 * r) * (0.6 + 0.4 * tf); }, velas = [];
  for (let i = 0; i < N; i++) { const y = Math.round(top + alto * (i + 0.9) / N), w = ancho(y), nv = 2 + i; for (let v = 0; v < nv; v++) velas.push([Math.round(cx - w * 0.85 + (2 * w * 0.85) * (v + 0.5) / nv), y - 5]); }
  return velas;
}

function c_windsorArbol(R, t, o) {
  const { rect, pset, linea } = R, P = c_P, K = C.k;
  c_fijo(R, 'nv-win-a', () => {
    c_techoPalacio(R, 8); c_damasco(R, 0, 9, 319, 119, 7);
    rect(0, 119, 319, 122, K); rect(0, 120, 319, 120, P.doradoL); rect(0, 121, 319, 121, P.dorado);
    rect(0, 123, 319, 141, P.blancoW); for (let x = -10; x < 320; x += 36) { rect(x + 4, 126, x + 32, 138, P.blancoWS); rect(x + 5, 127, x + 31, 137, P.blancoW); rect(x + 5, 127, x + 31, 127, P.blancoWL); }
    rect(0, 141, 319, 144, K); c_tablas(R, 0, 319, 145, 179, 160, 70, [P.parq, P.parqS, P.parqL, hex('#5a3a1c')], 23, 7);
    // los cortinajes que enmarcan el plano a los lados
    for (const [a, b] of [[0, 16], [304, 319]]) for (let y = 0; y <= 150; y++) for (let x = a; x <= b; x++) { if (b === 319 && y < 46) continue; const f = (x - a) % 5; pset(x, y, f === 0 ? hex('#5a1018') : f === 3 ? hex('#a8303a') : hex('#821c26')); }
    // la mesa con el mantel de encaje
    for (const lx of [84, 232]) { rect(lx, 148, lx + 4, 166, K); rect(lx + 1, 148, lx + 3, 166, P.parqL); rect(lx - 1, 156, lx + 5, 157, K); }
    rect(64, 124, 256, 128, K); rect(65, 125, 255, 127, C.blanco);
    for (let x = 64; x <= 256; x++) { const fin = 146 + ((x % 8) < 4 ? 2 : 0); for (let y = 128; y <= fin; y++) pset(x, y, x === 64 || x === 256 ? K : y >= fin - 1 ? ((x + y) & 1 ? c_P.blancoWS : C.blanco) : (y > 140 && (x + y) % 3 === 0) ? c_P.blancoWS : C.blanco); }
    rect(140, 112, 180, 124, K); rect(141, 113, 179, 123, C.rojoN); rect(141, 113, 179, 113, hex('#e04040')); for (let x = 143; x < 179; x += 4) { pset(x, 117, P.dorado); pset(x + 1, 118, P.dorado); }
    c_arbolV(R, 160, 22, 112, 70, 5);
    // los juguetes: el tambor, la muñeca, el caballito de madera, un barco, cajas con lazo y cucuruchos de dulces
    rect(74, 108, 98, 124, K); rect(75, 109, 97, 123, C.rojo); rect(75, 109, 97, 111, C.blanco); rect(75, 121, 97, 123, C.blanco); for (let x = 76; x < 97; x += 4) { linea(x, 112, x + 2, 120, P.dorado); } linea(80, 106, 88, 100, P.parqL); linea(92, 106, 98, 98, P.parqL);
    rect(222, 98, 236, 124, K); rect(223, 108, 235, 123, hex('#6a8ac8')); rect(223, 108, 235, 109, C.blanco); R.disco(229, 103, 5, K); R.disco(229, 103, 4, hex('#f0d0b0')); rect(225, 98, 233, 100, hex('#c89a4a')); pset(227, 103, K); pset(231, 103, K); pset(229, 105, C.rojo);
    c_sprite(R, ['..kkk.......', '.kWWWk......', 'kWkWWkkkkkk.', '.kkWWWWWWWWk', '...kWWWWWWk.', '...kk....kk.', '...kk....kk.', '.kkkkkkkkkkkk', 'kRRRRRRRRRRRk'], 102, 114, { k: K, W: hex('#e8d8c0'), R: C.rojo });
    for (const [bx, by, c, w] of [[196, 112, hex('#3a6ac8'), 12], [240, 114, P.dorado, 12], [116, 116, hex('#3a8a4a'), 9]]) { rect(bx, by, bx + w, by + 10, K); rect(bx + 1, by + 1, bx + w - 1, by + 10, c); rect(bx + (w >> 1), by, bx + (w >> 1), by + 10, C.rojo); rect(bx + 1, by + 4, bx + w - 1, by + 4, C.rojo); pset(bx + (w >> 1) - 1, by - 1, C.rojo); pset(bx + (w >> 1) + 1, by - 1, C.rojo); }
    for (const [cx, c] of [[212, hex('#e8a0c0')], [130, hex('#a0c0e8')]]) { R.poligono([[cx - 4, 112], [cx + 4, 112], [cx, 124]], K); R.poligono([[cx - 3, 113], [cx + 3, 113], [cx, 122]], c); pset(cx - 2, 111, C.rojo); pset(cx, 110, P.dorado); pset(cx + 2, 111, hex('#3a8a4a')); }
  });
  const velas = c_velasCache(R, 'nv-win-a', () => c_arbolVelas(160, 22, 112, 70));
  velas.forEach(([x, y], i) => c_llama(R, x, y, t, i));
  c_halo(R, 160, 70, 100, 56, c_P.farol, 0.12 + Math.sin(t * 5) * 0.012);
  // brillos que corren por las bolas y las guirnaldas
  for (let k = 0; k < 6; k++) { const u = (t * 0.7 + k / 6) % 1, y = Math.round(28 + h(k, 1, 77) * 80), w = 70 * (0.08 + 0.92 * (y - 22) / 90) * 0.7, x = Math.round(160 + (h(k, 2, 77) * 2 - 1) * w); if (u < 0.2) { pset(x, y, C.blanco); pset(x - 1, y, c_P.doradoL); pset(x + 1, y, c_P.doradoL); pset(x, y - 1, c_P.doradoL); pset(x, y + 1, c_P.doradoL); } }
  return { suelo: 166, arbol: { x: 160, punta: 16, base: 124, medioAncho: 70 }, mesa: [64, 124, 256, 146], juguetes: { tambor: [86, 116], muneca: [229, 110], caballito: [108, 118] }, sitios: [50, 270], libre: [[20, 62], [258, 300]] };
}

// la estampa de periódico en sepia (o.grabado): todo el lienzo pasa a una trama de líneas en sepia (g 0–1 la mezcla) y,
// alrededor, su página con márgenes de columnas de barras, la doble raya y el pie; revista: el tono y la cenefa de la
// revista americana de 1850
function c_grabado(R, t, g, revista) {
  const P = c_P, S = revista ? [P.sepiaR0, P.sepia1, P.sepia2, P.sepia3, P.sepiaR4] : [P.sepia0, P.sepia1, P.sepia2, P.sepia3, P.sepia4];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y), l0 = ((c & 255) * 0.62 + ((c >> 8) & 255) * 0.3 + ((c >> 16) & 255) * 0.08) / 255, l = Math.max(0, Math.min(1, (l0 - 0.12) * 1.45));
    let s; if (l < 0.16) s = S[0]; else if (l < 0.3) s = (x + y) % 4 === 0 ? S[2] : S[1]; else if (l < 0.45) s = y % 2 === 0 ? S[1] : S[2]; else if (l < 0.62) s = y % 3 === 0 ? S[2] : S[3]; else if (l < 0.8) s = (x + y * 2) % 7 === 0 ? S[2] : S[3]; else s = S[4];
    R.pset(x, y, g >= 1 ? s : c_mezcla(c, s, g)); }
  const m = Math.round(Math.min(1, g * 1.4) * 14); if (m < 2) return;
  const papel = S[4], tinta = S[1];
  R.rect(0, 0, 319, Math.max(1, m - 9), papel); R.rect(0, 0, m - 1, 179, papel); R.rect(320 - m, 0, 319, 179, papel); R.rect(0, 180 - m, 319, 179, papel);
  R.rect(m - 2, Math.max(2, m - 9) - 1, 321 - m, Math.max(2, m - 9) - 1, tinta); R.rect(m - 2, 180 - m + 1, 321 - m, 180 - m + 1, tinta); R.rect(m - 2, Math.max(2, m - 9) - 1, m - 2, 181 - m, tinta); R.rect(321 - m, Math.max(2, m - 9) - 1, 321 - m, 181 - m, tinta);
  if (m >= 10) {
    if (revista) { for (let y = 8; y < 172; y += 4) { R.pset(4, y, tinta); R.pset(315, y, tinta); R.pset(5, y + 2, S[2]); R.pset(314, y + 2, S[2]); } for (let x = 8; x < 312; x += 4) { R.pset(x, 176, tinta); } }
    else for (let y = 8; y < 168; y += 2) { if (h(y, 1, 5) < 0.15) continue; R.rect(1, y, 1 + Math.floor(3 + h(y, 2, 5) * 6), y, S[2]); R.rect(318 - Math.floor(3 + h(y, 3, 5) * 6), y, 318, y, S[2]); }
    for (let k = 0; k < 2; k++) { const w = 120 - k * 40; R.rect(160 - (w >> 1), 170 + k * 3, 160 + (w >> 1), 170 + k * 3, S[2]); }
  }
}

// el cielo de noche tramado (y0–hor) con estrellas fijas tenues; las que titilan, la luna y las nubes van aparte
function c_cieloNoche(R, hor, k = 0, cols = [c_P.n0, c_P.n1, c_P.n2, c_P.n3, c_P.n4]) {
  for (let y = 0; y <= hor; y++) for (let x = 0; x < 320; x++) R.pset(x, y, c_grad(cols, (y / hor) ** 1.2 + (c_ruido(x, y, 30, k) - 0.5) * 0.12, x, y));
  for (let i = 0; i < 90; i++) { const x = Math.floor(h(i, 1, k) * 320), y = Math.floor(h(i, 2, k) * hor * 0.85); if (x > 270 && y < 50) continue; if (x > 18 && x < 172 && y < 16) continue; R.pset(x, y, h(i, 3, k) < 0.3 ? c_P.nieveNS : c_P.n4); }
}

function c_estrellas(R, t, hor, k = 0) {
  for (let i = 0; i < 26; i++) { const x = Math.floor(h(i, 4, k) * 320), y = Math.floor(h(i, 5, k) * hor * 0.8); if ((x > 270 && y < 50) || (x > 18 && x < 172 && y < 16)) continue; const b = Math.sin(t * (1.5 + h(i, 6, k) * 2) + i * 2.3);
    R.pset(x, y, b > 0.3 ? C.blanco : c_P.nieveNS); if (b > 0.85 && i % 3 === 0) { R.pset(x - 1, y, c_P.n4); R.pset(x + 1, y, c_P.n4); R.pset(x, y - 1, c_P.n4); R.pset(x, y + 1, c_P.n4); } }
}

// la luna con sus manchas y el halo tramado
function c_luna(R, x, y, r) {
  for (let j = -r * 3; j <= r * 3; j++) for (let i = -r * 3; i <= r * 3; i++) { const d = Math.hypot(i, j) / r; if (d > 1 && d < 3 && (1 - (d - 1) / 2) * 0.35 > c_um(x + i, y + j)) c_tinte(R, x + i, y + j, c_P.nieveNL, 0.25); }
  R.disco(x, y, r, c_P.lunaS); R.disco(x - 1, y - 1, r - 1, c_P.luna); for (const [dx, dy, rr] of [[2, 1, 2], [-2, 3, 1], [-3, -2, 1]]) R.disco(x + dx, y + dy, rr, c_P.lunaS); R.pset(x - r + 2, y - r + 3, C.blanco);
}

// una nube de noche de tres tonos (sombra, cuerpo y el filo que ilumina la luna) en (cx, cy) de ancho w
function c_nubeNoche(R, cx, cy, w, k = 0) {
  const B = [[0, 0, 0.26], [-0.32, 0.08, 0.18], [0.3, 0.06, 0.2], [-0.12, -0.12, 0.2], [0.14, -0.08, 0.17], [0.46, 0.1, 0.12]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), c_P.nubeN0);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f * 0.9), c_P.nubeN1);
  for (const [dx, dy, f] of B) if (dy < 0.05) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.45), c_P.nubeN2);
}

// nubes que pasan a dos velocidades (no tocan la esquina de Atom ni la barra del año: se quedan en y ≥ 18)
function c_nubesNoche(R, t, k = 0, y0 = 22, y1 = 60) {
  for (let i = 0; i < 5; i++) { const v = i < 2 ? 2.2 : 1.1, w = 22 + h(i, 1, k) * 26, x = ((h(i, 2, k) * 400 + t * v) % 400) - 40, y = Math.round(y0 + h(i, 3, k) * (y1 - y0)); if (x > 240 && y < 50) continue; c_nubeNoche(R, x, y, w, i); }
}

// un abeto nevado (x: el eje, base: el pie, alto, ancho): pisos de ramas con el lado de la luna claro, nieve en lo alto de
// cada piso y el tronco; cols = [cuerpo, sombra, luz]
function c_abeto(R, x, base, alto, ancho, cols, nieve = [c_P.nieveN, c_P.nieveNL], k = 0) {
  const [c, cS, cL] = cols, top = base - alto, N = Math.max(3, Math.round(alto / 9));
  R.rect(x - 1, base - Math.round(alto * 0.14), x + 1, base, c_P.vigaD);
  for (let y = top; y < base - Math.round(alto * 0.1); y++) { const r = (y - top) / (alto * 0.9), tf = (r * N) % 1, w = ancho / 2 * (0.08 + 0.92 * r) * (0.55 + 0.45 * tf) + (h(y, 1, k) - 0.5) * 1.5;
    for (let xx = Math.round(x - w); xx <= Math.round(x + w); xx++) { const u = (xx - x) / (w + 0.5); let col = u < -0.35 ? cL : u > 0.35 ? cS : c; if (tf > 0.85) col = cS;
      if (tf < 0.3 && u < 0.6 && h(xx, y, k + 1) < 0.75 - tf * 1.5) col = u < -0.2 ? nieve[1] : nieve[0]; R.pset(xx, y, col); } }
}

function c_bosque(R, t, o, cam) { return cam === 'guardas' ? c_bosqueGuardas(R, t, o) : c_bosqueGeneral(R, t, o); }

// Sélestat en su loma, al fondo: muralla, tejados nevados, el campanario de San Jorge y la otra iglesia; ventanas
function c_selestat(R, x0, base, s = 1) {
  const { rect, pset } = R, P = { ...c_P, abF: hex('#2e4068'), abFL: hex('#4a5e8a'), abFF: hex('#26365a') }, ox = (v) => Math.round(x0 + v * s), oy = (v) => Math.round(base - v * s);
  for (let x = ox(-14); x <= ox(110); x++) { const a = Math.round((Math.sin((x - x0) / (124 * s) * Math.PI) * 10 + 4) * s); for (let j = 0; j < a; j++) pset(x, base - j, j > a - 2 ? P.nieveNS : P.abFF); }
  rect(ox(0), oy(18), ox(96), oy(12), P.abF); for (let x = ox(0); x <= ox(96); x += 3) pset(x, oy(19), P.abF);
  for (let i = 0; i < 9; i++) { const hx = 2 + i * 10 + Math.floor(h(i, 1, 3) * 3), hh = 6 + Math.floor(h(i, 2, 3) * 5); rect(ox(hx), oy(18 + hh), ox(hx + 7), oy(18), P.abF); R.poligono([[ox(hx - 1), oy(18 + hh)], [ox(hx + 8), oy(18 + hh)], [ox(hx + 3.5), oy(24 + hh)]], P.abFL); for (let x = ox(hx); x <= ox(hx + 6); x++) pset(x, oy(18 + hh) - 1, P.nieveNS); }
  rect(ox(36), oy(60), ox(44), oy(18), P.abF); R.poligono([[ox(35), oy(60)], [ox(45), oy(60)], [ox(40), oy(74)]], P.abFL); rect(ox(37), oy(46), ox(43), oy(46), P.nieveNS);
  rect(ox(62), oy(40), ox(66), oy(18), P.abF); rect(ox(72), oy(40), ox(76), oy(18), P.abF); rect(ox(62), oy(30), ox(76), oy(18), P.abF); R.poligono([[ox(61), oy(40)], [ox(67), oy(40)], [ox(64), oy(47)]], P.abFL); R.poligono([[ox(71), oy(40)], [ox(77), oy(40)], [ox(74), oy(47)]], P.abFL);
  return [[ox(39), oy(52)], [ox(40), oy(36)], [ox(64), oy(34)], [ox(74), oy(34)], [ox(12), oy(22)], [ox(28), oy(24)], [ox(52), oy(22)], [ox(86), oy(23)], [ox(20), oy(21)]];
}

function c_bosqueGeneral(R, t, o) {
  const { rect, pset, linea } = R, P = c_P, K = C.k, HOR = 104;
  let ventanas = null;
  c_fijo(R, 'nv-bos-g', () => {
    c_cieloNoche(R, HOR, 3);
    for (let x = 0; x < 320; x++) { const a = Math.round(8 + Math.sin(x * 0.02 + 1) * 5 + Math.sin(x * 0.07) * 2); for (let j = 0; j < a; j++) pset(x, HOR - j, j > a - 2 ? P.nieveNS : P.abFF); }
    ventanas = c_selestat(R, 118, HOR - 2, 0.85);
    // la fila lejana de abetos, la del medio y la nieve
    for (let i = 0; i < 34; i++) { const x = Math.round(i * 10 + h(i, 1, 5) * 6), a = 10 + Math.floor(h(i, 2, 5) * 12); if (x > 104 && x < 210) continue; c_abeto(R, x, HOR + 6, a, a * 0.55, [P.abF, P.abFF, P.abFL], [P.nieveNS, P.nieveN], i); }
    for (let y = HOR + 1; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - HOR) / 76 + (c_ruido(x, y, 22, 7) - 0.5) * 0.35; pset(x, y, c_grad([P.nieveND, P.nieveNS, P.nieveN, P.nieveN, P.nieveNL], 0.35 + v * 0.7, x, y)); }
    for (let i = 0; i < 14; i++) { const x = Math.round(h(i, 1, 6) * 330) - 5, a = 26 + Math.floor(h(i, 2, 6) * 22), b = HOR + 16 + Math.floor(h(i, 3, 6) * 8); if (x > 100 && x < 215) continue; c_abeto(R, x, b, a, a * 0.5, [P.abN1, P.abN0, P.abNL], [P.nieveN, P.nieveNL], i + 40);
      for (let j = 0; j < 4; j++) for (let ii = -a * 0.3; ii < a * 0.3; ii++) if ((ii + j) & 1) c_tinte(R, Math.round(x + ii + j * 2 + 3), b + 1 + j, P.nieveND, 0.4); }
    // la cerca de estacas con los abetos jóvenes que se vigilan
    for (let i = 0; i < 6; i++) c_abeto(R, 116 + i * 16 + (i % 2) * 4, 140 - (i % 2) * 3, 22 + (i % 3) * 4, 13, [P.abetoS, P.abetoD, P.abeto], [P.nieveN, P.nieveNL], 70 + i);
    for (let x = 108; x <= 214; x += 4) { const top = 132 + Math.round(h(x, 1, 8) * 3); rect(x, top, x + 2, 146, K); rect(x + 1, top + 1, x + 1, 145, P.viga); pset(x + 1, top, P.vigaL); pset(x, top - 1, P.nieveNL); pset(x + 1, top - 1, P.nieveNL); }
    rect(106, 136, 216, 137, K); rect(106, 142, 216, 143, K); rect(107, 136, 215, 136, P.vigaL); rect(107, 142, 215, 142, P.vigaS);
    for (let x = 104; x < 220; x++) pset(x, 146 + (x & 1), P.nieveND);
    // la cabaña de los guardas: troncos con sus testas, el tejado cargado de nieve, la chimenea de piedra, puerta y ventana
    rect(236, 116, 298, 152, K); for (let y = 117; y < 152; y++) { const tr = Math.floor((y - 117) / 5), f = (y - 117) % 5; rect(237, y, 297, y, f === 0 ? P.vigaL : f === 4 ? P.vigaD : (f === 3 ? P.vigaS : P.viga)); }
    for (let y = 119; y < 150; y += 5) for (const ex of [234, 298]) { R.disco(ex, y, 2, K); R.disco(ex, y, 1, P.tablaL); pset(ex, y, P.vigaS); }
    R.poligono([[228, 118], [306, 118], [292, 96], [242, 96]], K); R.poligono([[230, 117], [304, 117], [291, 97], [243, 97]], P.vigaS);
    for (let x = 230; x <= 304; x++) { const top = 96 + Math.round(Math.abs(x - 267) * 0 ) - 2 + Math.round(h(x, 1, 9) * 1.5); for (let y = top; y < top + 5; y++) pset(x, y, y < top + 2 ? P.nieveNL : P.nieveN); pset(x, 118 + (x % 5 === 0 ? 2 : 0), P.nieveNL); if (x % 7 === 0) { pset(x, 119, P.nieveN); pset(x, 120, P.nieveNL); } }
    rect(284, 86, 292, 100, K); for (let y = 87; y < 100; y++) for (let x = 285; x < 292; x++) pset(x, y, (y % 3 === 0 || (x + Math.floor(y / 3)) % 4 === 0) ? P.piedraS : P.piedra); rect(283, 84, 293, 86, P.nieveNL);
    rect(244, 128, 258, 152, K); rect(245, 129, 257, 152, hex('#ffcf70')); rect(245, 129, 249, 152, P.vigaS); rect(246, 130, 248, 151, P.viga);
    rect(270, 128, 284, 140, K); rect(271, 129, 283, 139, hex('#ffcf70')); rect(277, 129, 277, 139, K); rect(271, 134, 283, 134, K); rect(269, 140, 285, 141, P.nieveNL);
    for (let y = 152; y < 170; y++) for (let x = 240 - (y - 152); x < 262 + (y - 152) * 0.4; x++) if ((x + y) % 2 === 0 && ((x - 251) / 22) ** 2 < 1) c_tinte(R, x, y, hex('#ffcf70'), 0.18);
    // las huellas que van de la cabaña al bosque y unas rocas con nieve
    for (let i = 0; i < 14; i++) { const x = 240 - i * 9 + (i % 2) * 3, y = 160 + Math.round(Math.sin(i * 0.5) * 3) + (i % 2) * 2; rect(x, y, x + 1, y, P.nieveND); pset(x, y + 1, P.nieveNS); }
    for (const [rx, ry, rr] of [[30, 168, 7], [60, 158, 4], [300, 168, 6], [90, 174, 3]]) { R.disco(rx, ry, rr, P.piedraS); R.disco(rx - 1, ry - 1, rr - 1, P.piedra); for (let i = -rr; i <= rr; i++) pset(rx + i, ry - rr + Math.abs(i) * 0.3, P.nieveNL); }
    // el abeto grande de la izquierda, en primer término, con la rama del búho
    c_abeto(R, 22, 176, 128, 70, [P.abN1, P.abN0, P.abNL], [P.nieveN, P.nieveNL], 99);
    // las piedras de la hoguera
    for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2, x = Math.round(206 + Math.cos(a) * 10), y = Math.round(158 + Math.sin(a) * 3); R.disco(x, y, 2, P.piedraS); pset(x - 1, y - 1, P.piedraL); }
  });
  if (!ventanas) ventanas = c_velasCache(R, 'nv-bos-g', () => { const v = []; const s = 0.85, x0 = 118, base = HOR - 2, ox = (q) => Math.round(x0 + q * s), oy = (q) => Math.round(base - q * s); return [[ox(39), oy(52)], [ox(40), oy(36)], [ox(64), oy(34)], [ox(74), oy(34)], [ox(12), oy(22)], [ox(28), oy(24)], [ox(52), oy(22)], [ox(86), oy(23)], [ox(20), oy(21)]]; });
  // la luna, las nubes, las estrellas que titilan y las ventanas del pueblo
  c_estrellas(R, t, HOR - 10, 3); c_luna(R, 232, 30, 7); c_nubesNoche(R, t, 3, 22, 58);
  ventanas.forEach(([x, y], i) => pset(x, y, Math.sin(t * 2 + i * 3) > -0.6 ? c_P.farol : c_P.fuego1));
  // el humo de la chimenea, la hoguera con sus chispas y su luz en la nieve
  c_humo(R, 288, 82, t, 2, c_P.nieveNS, 40);
  c_troncos(R, 206, 158, 6); c_fuego(R, 206, 156, 6, t, 5, 1.2); c_halo(R, 206, 160, 50, 14, c_P.fuego2, 0.24 + Math.sin(t * 8) * 0.04); c_halo(R, 206, 146, 26, 20, c_P.fuego2, 0.12);
  // el búho en la rama del abeto grande, que parpadea y gira la cabeza
  { const bx = 42, by = 82, gira = Math.sin(t * 0.7) > 0.6 ? 1 : 0, ojo = (t % 3.3) < 0.15; rect(bx - 2, by - 3, bx + 2, by + 3, K); rect(bx - 1, by - 2, bx + 1, by + 2, hex('#8a7058')); pset(bx - 1 + gira, by - 1, ojo ? hex('#8a7058') : c_P.oroN ?? C.oro); pset(bx + 1 + gira, by - 1, ojo ? hex('#8a7058') : C.oroN ?? C.oro); pset(bx - 2, by - 4, K); pset(bx + 2, by - 4, K); rect(bx - 3, by + 4, bx + 6, by + 4, P.vigaD); }
  // la nieve que cae y los destellos de la nieve del suelo
  c_copos(R, t, 70, 0, 0, 319, 179, 11, 10);
  for (let i = 0; i < 12; i++) if (Math.sin(t * 3 + i * 1.7) > 0.8) pset(Math.floor(h(i, 1, 13) * 320), 150 + Math.floor(h(i, 2, 13) * 28), C.blanco);
  return { suelo: 162, horizonte: HOR, luna: [232, 30], pueblo: { x: 118, campanario: [152, 40], base: HOR - 2 }, cerca: [106, 132, 216, 146], hoguera: [206, 156], cabana: { muros: [236, 116, 298, 152], puerta: [244, 128, 258, 152], ventana: [270, 128, 284, 140], chimenea: [288, 84] }, buho: [42, 82],
    globo: [120, 40, 220, 100], libre: [[60, 236]] };
}

function c_bosqueGuardas(R, t, o) {
  const { rect, pset, linea } = R, P = c_P, K = C.k, HOR = 112;
  c_fijo(R, 'nv-bos-c', () => {
    c_cieloNoche(R, HOR, 8);
    for (let x = 0; x < 320; x++) { const a = Math.round(10 + Math.sin(x * 0.03) * 4); for (let j = 0; j < a; j++) pset(x, HOR - j, j > a - 2 ? P.nieveNS : P.abFF); }
    for (let i = 0; i < 6; i++) pset(130 + i * 8 + (i % 2) * 3, HOR - 6 - (i % 3), c_P.farol);
    for (let i = 0; i < 26; i++) { const x = Math.round(i * 13 + h(i, 1, 2) * 8), a = 30 + Math.floor(h(i, 2, 2) * 30); if (x > 118 && x < 186) continue; c_abeto(R, x, HOR + 14, a, a * 0.5, [P.abF, P.abFF, P.abFL], [P.nieveNS, P.nieveN], i + 100); }
    for (let y = HOR + 1; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - HOR) / 68 + (c_ruido(x, y, 18, 9) - 0.5) * 0.3; pset(x, y, c_grad([P.nieveND, P.nieveNS, P.nieveN, P.nieveNL], 0.3 + v * 0.7, x, y)); }
    // los abetos medianos del medio
    for (const [x, a] of [[70, 70], [100, 56], [210, 64], [250, 78]]) c_abeto(R, x, HOR + 30, a, a * 0.52, [P.abN1, P.abN0, P.abNL], [P.nieveN, P.nieveNL], x);
    // la cerca de estacas y los abetos jóvenes de dentro, a la izquierda
    for (let i = 0; i < 5; i++) c_abeto(R, 40 + i * 20, 146 - (i % 2) * 3, 28 + (i % 3) * 4, 16, [P.abetoS, P.abetoD, P.abeto], [P.nieveN, P.nieveNL], 200 + i);
    for (let x = 28; x <= 140; x += 5) { const top = 136 + Math.round(h(x, 1, 8) * 4); rect(x, top, x + 3, 154, K); rect(x + 1, top + 1, x + 2, 153, P.viga); rect(x + 1, top + 1, x + 1, 153, P.vigaL); pset(x + 1, top - 1, P.nieveNL); pset(x + 2, top - 1, P.nieveNL); }
    rect(26, 141, 142, 143, K); rect(26, 149, 142, 151, K); rect(27, 142, 141, 142, P.vigaL); rect(27, 150, 141, 150, P.vigaS);
    // los troncos grandes de los lados, con su corteza
    for (const [a, b] of [[0, 22], [298, 319]]) { rect(a, 0, b, 179, K); for (let y = 0; y < 180; y++) for (let x = a + (a ? 1 : 0); x < b; x++) { const u = (x - a) / (b - a); pset(x, y, ((x * 3 + Math.floor(y / 7) * 5) % 9 === 0 || h(x, y >> 2, 4) < 0.12) ? hex('#2a1e1a') : u < 0.3 ? hex('#6a4a3a') : u > 0.75 ? hex('#3a2a24') : hex('#523a2e')); } }
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) if ((x < 40 || x > 280) && ((x + y) & 1) && y > 160) c_tinte(R, x, y, P.nieveND, 0.3);
    // el banco de tronco y el poste con el farol colgado
    rect(234, 148, 284, 156, K); rect(235, 149, 283, 155, P.viga); rect(235, 149, 283, 150, P.vigaL); for (const ex of [234, 284]) { R.disco(ex, 152, 4, K); R.disco(ex, 152, 3, P.tablaL); R.disco(ex, 152, 1, P.vigaS); } rect(235, 147, 283, 148, P.nieveNL);
    rect(236, 156, 240, 162, K); rect(278, 156, 282, 162, K);
    rect(156, 104, 159, 160, K); rect(157, 104, 158, 160, P.viga); rect(156, 104, 170, 106, K); rect(157, 105, 169, 105, P.vigaL); pset(157, 103, P.nieveNL); pset(158, 103, P.nieveNL);
    // el brasero de hierro sobre su trípode
    for (const [a, b] of [[206, 196], [214, 214], [222, 232]]) { linea(a, 140, b, 160, K); linea(a + 1, 140, b + 1, 160, P.hierro); }
    rect(202, 132, 226, 142, K); for (let x = 203; x < 226; x += 3) rect(x, 133, x + 1, 141, P.hierro); rect(202, 132, 226, 133, P.hierroL);
  });
  // ramas cargadas de nieve que bajan de los troncos y se mecen con el viento
  for (const [x0, y0, dir, L, k] of [[22, 30, 1, 70, 1], [22, 66, 1, 52, 2], [298, 60, -1, 64, 3], [298, 98, -1, 46, 4]]) {
    const m = Math.sin(t * 1.3 + k) * 2;
    for (let i = 0; i < L; i++) { const x = x0 + dir * i, y = Math.round(y0 + i * 0.32 + (i / L) ** 2 * m * 2), cuelga = Math.round(4 + Math.sin(i * 0.5) * 2 + (i / L) * 3);
      if (x > 270 && y < 48) continue;
      for (let j = -2; j <= cuelga; j++) pset(x, y + j, j < 0 ? (j === -2 ? P.nieveNL : P.nieveN) : j === cuelga ? P.abN0 : (i + j) % 4 === 0 ? P.abNL : P.abN1); }
    for (let i = 0; i < L; i += 9) { const x = x0 + dir * i, y = Math.round(y0 + i * 0.32); if (!(x > 270 && y < 48)) pset(x, y - 3, P.nieveNL); } }
  // el pueblo lejos, las estrellas, la luna y las nubes
  c_estrellas(R, t, HOR - 20, 8); c_luna(R, 236, 26, 6); c_nubesNoche(R, t * 1.2, 8, 20, 50);
  // el fuego del brasero y su círculo de luz, el farol del poste
  c_fuego(R, 214, 132, 9, t, 7, 1); c_halo(R, 214, 158, 64, 18, c_P.fuego2, 0.24 + Math.sin(t * 8) * 0.04); c_halo(R, 214, 120, 30, 26, c_P.fuego2, 0.14);
  { const lx = 166, ly = 112, sw = Math.round(Math.sin(t * 1.5)); linea(lx, 106, lx + sw, ly - 3, K); rect(lx - 3 + sw, ly - 3, lx + 3 + sw, ly + 6, K); rect(lx - 2 + sw, ly - 2, lx + 2 + sw, ly + 5, hex('#ffd890')); rect(lx + sw, ly - 2, lx + sw, ly + 5, K); c_llama(R, lx + sw, ly + 3, t, 8); c_halo(R, lx, ly + 2, 26, 22, c_P.farol, 0.18); }
  c_copos(R, t, 60, 0, 0, 319, 179, 21, 11);
  return { suelo: 164, brasero: [214, 132], farol: [166, 112], cerca: [26, 136, 142, 154], banco: [234, 148, 284, 156], pueblo: [130, HOR - 6], libre: [[146, 290]] };
}

// lo de delante del bosque: copos grandes y, en la cámara de los guardas, puntas de ramas nevadas en las esquinas de abajo
function c_bosqueDelante(R, t, cam) {
  const P = c_P;
  c_copos(R, t, 14, 0, 0, 319, 179, 31, 22, C.blanco, true);
  if (cam !== 'guardas') return;
  for (const [x0, dir, k] of [[0, 1, 1], [319, -1, 2]]) { const m = Math.sin(t * 1.1 + k) * 1.5;
    for (let i = 0; i < 40; i++) { const x = x0 + dir * i, y = Math.round(170 - i * 0.4 + (i / 40) * m), cuelga = 5 + Math.round(Math.sin(i * 0.6) * 2);
      for (let j = -2; j <= cuelga; j++) R.pset(x, y + j, j < 0 ? P.nieveNL : j === cuelga ? P.abN0 : (i + j) % 3 === 0 ? P.abNL : P.abN1); } }
}

// una rama de roble desnuda: un trazo grueso que se estrecha y se abre en dos o tres (la luna la ilumina por arriba a la
// izquierda); guarda en matas los sitios donde cuelga muérdago
function c_rama(R, x, y, ang, len, gros, prof, k, matas) {
  const x1 = x + Math.cos(ang) * len, y1 = y + Math.sin(ang) * len, n = Math.ceil(len);
  for (let s = 0; s <= n; s++) { const u = s / n, px = x + (x1 - x) * u + Math.sin(u * 3 + k) * len * 0.04, py = y + (y1 - y) * u, r = Math.max(0.5, gros * (1 - u * 0.35) / 2);
    if ((px > 268 && py < 50) || (px > 14 && px < 176 && py < 17)) continue;
    if (r < 1) R.pset(Math.round(px), Math.round(py), c_P.troncoS); else { R.disco(Math.round(px), Math.round(py), r, c_P.troncoS); R.pset(Math.round(px - r * 0.6), Math.round(py - r * 0.6), c_P.troncoL); } }
  if (prof <= 0 || len < 3) return;
  const nh = 2 + (h(k, prof, 3) < 0.4 ? 1 : 0);
  for (let i = 0; i < nh; i++) { const a = ang + (i - (nh - 1) / 2) * (0.5 + h(k, i, 4) * 0.35) + (-Math.PI / 2 - ang) * 0.12; c_rama(R, x1, y1, a, len * (0.62 + h(k, i, 5) * 0.18), gros * 0.66, prof - 1, k * 3 + i + 1, matas); }
  if (prof === 2 && h(k, 7, 6) < 0.5 && matas) matas.push([Math.round(x1), Math.round(y1)]);
}

// una mata de muérdago (bola de hojitas de tres tonos con bayas blancas) en (x, y) de radio r
function c_muerdago(R, x, y, r, k = 0) {
  const P = c_P;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.15) / r; if (d > 1 || h(x + i, y + j, k) < (d - 0.7) * 2.5) continue; R.pset(x + i, y + j, i + j < -r * 0.4 ? P.muerdL : i + j > r * 0.5 ? P.muerdS : (i * 3 + j) % 4 === 0 ? P.muerdS : P.muerd); }
  for (let b = 0; b < r + 2; b++) R.pset(x + Math.round((h(b, 1, k) - 0.5) * r * 1.4), y + Math.round((h(b, 2, k) - 0.3) * r * 1.2), P.baya);
}

// un roble viejo y desnudo: el tronco ancho con corteza a surcos, las raíces y la copa de ramas (ang: hacia dónde se abre)
function c_roble(R, x, base, alto, gros, k, matas, ramas) {
  const P = c_P, top = base - alto;
  for (let y = top; y <= base; y++) { const u = (y - top) / alto, w = gros * (0.55 + 0.45 * u ** 2) + (u > 0.85 ? (u - 0.85) * gros * 3 : 0), cx = x + Math.sin(u * 2 + k) * 2;
    for (let xx = Math.round(cx - w / 2); xx <= Math.round(cx + w / 2); xx++) { const v = (xx - (cx - w / 2)) / w, surco = (Math.floor(xx * 0.7 + Math.sin(y * 0.15 + xx) * 1.2) % 4 === 0) || h(xx >> 1, y >> 2, k) < 0.1;
      R.pset(xx, y, surco ? P.troncoS : v < 0.25 ? P.troncoL : v > 0.8 ? P.troncoS : P.tronco); } }
  for (const s of [-1, 1]) for (let i = 0; i < 14; i++) { const xx = Math.round(x + s * (gros / 2 + i)), yy = base - 3 + Math.round(i * 0.3); R.rect(xx, yy, xx, base + 1, i < 10 ? P.troncoS : P.tronco); }
  for (const [ang, len, gr, pr] of ramas) c_rama(R, x, top + 4, ang, len, gr, pr, k * 7 + ang * 10, matas);
}

function c_robledal(R, t, o, cam) { return cam === 'cocina' ? c_cocina(R, t, o) : c_robledalGeneral(R, t, o); }

function c_robledalGeneral(R, t, o) {
  const { rect, pset, linea } = R, P = c_P, K = C.k, HOR = 118, MATA = [156, 124];
  let matas = null;
  c_fijo(R, 'nv-rob-g', () => {
    c_cieloNoche(R, HOR, 12, [hex('#0a1424'), hex('#10203a'), hex('#18304a'), hex('#24405a'), hex('#34546a')]);
    for (let x = 0; x < 320; x++) { const a = Math.round(12 + Math.sin(x * 0.025 + 2) * 6 + Math.sin(x * 0.09) * 2); for (let j = 0; j < a; j++) pset(x, HOR - j, j > a - 2 ? hex('#4a6474') : hex('#1c3038')); }
    // el círculo de piedras lejano y el dolmen
    for (let i = 0; i < 9; i++) { const x = 20 + i * 12, a = 6 + Math.floor(h(i, 1, 4) * 6); rect(x, HOR - a + 4, x + 4, HOR + 4, hex('#2a3a44')); rect(x, HOR - a + 4, x + 1, HOR + 4, hex('#4a5e68')); }
    for (let y = HOR; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - HOR) / 62 + (c_ruido(x, y, 10, 12) - 0.5) * 0.5; let c = c_grad([P.hierbaNS, P.hierbaN, P.hierbaNL], v * 0.9 + 0.1, x, y); if (h(x, y, 13) < 0.03) c = hex('#6a5a3a'); pset(x, y, c); }
    for (let i = 0; i < 260; i++) { const x = Math.floor(h(i, 1, 14) * 320), y = HOR + 6 + Math.floor(h(i, 2, 14) * 56), al = 1 + Math.floor((y - HOR) / 18); for (let j = 0; j < al; j++) pset(x + (j > 1 ? 1 : 0), y - j, j === al - 1 ? P.hierbaNL : P.hierbaN); }
    // el dolmen: dos piedras de pie y la losa encima, con musgo
    for (const [a, b] of [[92, 104], [124, 136]]) { rect(a, 120, b, 148, K); for (let y = 121; y < 148; y++) for (let x = a + 1; x < b; x++) pset(x, y, x < a + 4 ? P.piedraL : x > b - 3 ? P.piedraS : (h(x >> 1, y >> 1, 15) < 0.2 ? P.piedraS : P.piedra)); for (let x = a + 1; x < b; x++) if (h(x, 1, 16) < 0.6) pset(x, 147, hex('#3e5a3a')); }
    R.poligono([[84, 122], [146, 118], [148, 112], [88, 108]], K); R.poligono([[86, 121], [145, 117], [146, 113], [89, 110]], P.piedra); linea(89, 110, 146, 113, P.piedraL); linea(86, 121, 145, 117, P.piedraS);
    for (let x = 92; x < 140; x += 3) if (h(x, 2, 16) < 0.5) pset(x, 112 + Math.round((x - 92) * 0.06), hex('#5a7a4a'));
    // los robles: el grande del centro con la rama baja, uno a la izquierda y otro al fondo a la derecha
    matas = [];
    c_roble(R, 290, 132, 58, 10, 3, matas, [[-1.9, 34, 6, 4], [-1.4, 28, 5, 3], [-2.5, 30, 5, 4]]);
    c_roble(R, 30, 150, 82, 18, 5, matas, [[-1.2, 46, 9, 5], [-1.8, 40, 8, 4], [-0.6, 40, 7, 4]]);
    c_roble(R, 204, 156, 86, 22, 9, matas, [[-1.7, 46, 10, 5], [-2.3, 48, 9, 5], [-1.1, 44, 9, 5]]);
    // la rama baja que sale hacia la izquierda, con la mata que cortará el druida
    for (let s = 0; s <= 56; s++) { const u = s / 56, x = Math.round(196 - u * 56), y = Math.round(112 + u * 6 - Math.sin(u * 3) * 3), r = 3.2 - u * 2; R.disco(x, y, r, P.troncoS); pset(x, Math.round(y - r), P.troncoL); }
    for (const [dx, a, L] of [[-30, -1.2, 12], [-46, -2.0, 10], [-14, -1.6, 14]]) c_rama(R, 196 + dx, 112 + Math.round(-dx * 0.1), a, L, 2, 2, 50 + dx, null);
    linea(MATA[0], 118, MATA[0], MATA[1] - 4, P.troncoS);
    for (const [mx, my] of matas.filter(([x, y]) => !(x > 262 && y < 56) && !(x > 12 && x < 178 && y < 22)).slice(0, 9)) c_muerdago(R, mx, my, 4 + ((mx + my) % 3), mx);
    // raíces, helechos secos y hojas caídas
    for (let i = 0; i < 9; i++) { const x = 20 + Math.floor(h(i, 1, 17) * 290), y = 150 + Math.floor(h(i, 2, 17) * 26); if (x > 130 && x < 180 && y < 168) continue; for (let f = -3; f <= 3; f++) linea(x, y, x + f * 2, y - 5 + Math.abs(f), f % 2 ? hex('#7a5a2a') : hex('#5a4a24')); }
    for (let i = 0; i < 40; i++) { const x = Math.floor(h(i, 3, 17) * 320), y = 140 + Math.floor(h(i, 4, 17) * 40); pset(x, y, h(i, 5, 17) < 0.5 ? hex('#8a5a2a') : hex('#6a4220')); pset(x + 1, y, hex('#5a3a1a')); }
    for (let i = 0; i < 4; i++) { const x = 186 + i * 4, y = 159; pset(x, y - 1, hex('#e8d8c0')); rect(x - 1, y - 2, x + 1, y - 2, hex('#c84a3a')); }
  });
  if (!matas) matas = [];
  // la mata de la rama baja (o.cortado la quita), las nubes que pasan por la luna, las estrellas
  c_estrellas(R, t, HOR - 20, 12); c_luna(R, 62, 34, 9); c_nubesNoche(R, t * 0.9, 12, 26, 70);
  if (!o.cortado) c_muerdago(R, MATA[0], MATA[1], 6, 7);
  // la niebla en dos bancos que se mueven a distinta velocidad
  for (const [y0, y1, v, a] of [[112, 136, 3, 0.28], [146, 166, -5, 0.22]]) for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const n = c_ruido(x + t * v, y * 2, 26, y0) * (1 - Math.abs((y - (y0 + y1) / 2) / ((y1 - y0) / 2))); if (n * a * 2.6 > c_um(x, y) * 0.8 + 0.08) c_tinte(R, x, y, hex('#b8ccd8'), Math.min(0.55, n * a * 2)); }
  // el búho del roble de la izquierda y las hojas que caen
  { const bx = 48, by = 94, ojo = (t % 2.9) < 0.15; rect(bx - 2, by - 3, bx + 2, by + 3, K); rect(bx - 1, by - 2, bx + 1, by + 2, hex('#7a6050')); pset(bx - 1, by - 1, ojo ? hex('#7a6050') : C.oro); pset(bx + 1, by - 1, ojo ? hex('#7a6050') : C.oro); pset(bx - 2, by - 4, K); pset(bx + 2, by - 4, K); }
  for (let i = 0; i < 4; i++) { const u = (t * 0.12 + i / 4) % 1, x = Math.round(150 + i * 40 + Math.sin(u * 12 + i) * 8 - u * 30), y = Math.round(40 + u * 120); pset(x, y, i % 2 ? hex('#a86a2a') : hex('#8a5a24')); pset(x + 1, y, hex('#6a4220')); }
  return { suelo: 160, muerdago: { x: MATA[0], y: MATA[1], r: 6 }, rama: [140, 112, 196, 118], dolmen: [84, 108, 148, 148], luna: [62, 34], robles: [30, 204, 290], druida: [168, 160], libre: [[60, 190]] };
}

// la cocina inglesa del siglo XVIII
function c_cocina(R, t, o) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, MX = 160;
  c_fijo(R, 'nv-coc', () => {
    // el techo de tablas y la viga grande con lo que cuelga (hierbas, ristras de cebollas, un jamón)
    rect(0, 0, 319, 14, hex('#4a3a2e')); for (let x = 0; x < 320; x += 5) rect(x, 0, x, 13, hex('#3a2c22'));
    for (let x = 10; x < 320; x += 40) { rect(x, 0, x + 6, 14, P.viga); rect(x, 0, x, 14, P.vigaL); }
    c_viga(R, 0, 319, 14, 22, 31);
    c_yeso(R, 0, 23, 319, 140, [P.enc, P.encS, P.encL, P.calD], 33, 4);
    for (const [bx, by, w, hh] of [[150, 30, 22, 10], [270, 100, 26, 14], [132, 110, 18, 8]]) { c_ladrillos(R, bx, by, bx + w, by + hh, bx); for (let x = bx - 1; x <= bx + w + 1; x++) { pset(x, by - 1, P.encS); pset(x, by + hh + 1, P.encS); } }
    for (let x = 0; x < 320; x++) for (let y = 120; y < 140; y++) if (h(x >> 2, y >> 2, 34) < 0.35 && ((x + y) & 1)) pset(x, y, P.encS);
    rect(0, 140, 319, 144, P.vigaS); rect(0, 140, 319, 140, P.vigaL);
    // el suelo de losas irregulares
    for (let y = 145; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 145) / (5 + (y - 145) * 0.25)), off = h(fila, 0, 35) * 30, w = 16 + (y - 145) * 0.5, col = Math.floor((x + off) / w), fx = (x + off) % w, nf = Math.floor((y - 144) / (5 + (y - 144) * 0.25));
      const junta = fx < 1 || nf !== fila; const tono = h(col, fila, 36); pset(x, y, junta ? P.losaS : tono < 0.3 ? hex('#7a746a') : tono > 0.8 ? P.losaL : P.losa); }
    for (let i = 0; i < 30; i++) pset(Math.floor(h(i, 1, 37) * 320), 146 + Math.floor(h(i, 2, 37) * 32), P.losaL);
    // el hogar de ladrillo: arco, interior tiznado, la viga de la campana con su repisa y el asador
    c_ladrillos(R, 6, 40, 118, 144, 41);
    rect(18, 58, 106, 144, K); for (let y = 59; y < 145; y++) for (let x = 19; x < 106; x++) pset(x, y, c_grad([c_P.hollin, hex('#3a2a22'), P.ladrS], (y - 58) / 100 + (h(x >> 2, y >> 1, 4) - 0.5) * 0.25, x, y));
    for (let y = 100; y < 144; y += 4) for (let x = 24 + ((y >> 2) & 1) * 4; x < 102; x += 8) rect(x, y, x + 6, y + 2, hex('#4a2a22'));
    rect(2, 46, 122, 58, K); c_viga(R, 3, 121, 47, 57, 42); rect(0, 38, 124, 42, K); rect(1, 39, 123, 41, P.vigaL); rect(1, 42, 123, 46, P.vigaS);
    for (const [px, c] of [[12, P.peltre], [34, P.peltre], [96, P.peltre]]) { disco(px, 32, 5, K); disco(px, 32, 4, c); disco(px - 1, 31, 2, C.blanco); pset(px + 2, 34, P.peltreS); }
    for (const cx of [56, 76]) { rect(cx - 2, 35, cx + 2, 37, K); rect(cx - 1, 30, cx + 1, 35, P.laton); rect(cx - 1, 25, cx + 1, 29, C.blanco); }
    rect(20, 140, 104, 146, K); rect(21, 141, 103, 145, P.piedra); rect(21, 141, 103, 141, P.piedraL);
    for (const ax of [40, 84]) { rect(ax, 124, ax + 2, 140, K); rect(ax - 3, 138, ax + 5, 140, K); disco(ax + 1, 122, 3, K); disco(ax + 1, 122, 2, P.hierroL); }
    // el llar con su brazo y la cuerda del caldero
    rect(22, 64, 24, 120, K); linea(24, 70, 48, 70, K); linea(24, 71, 48, 71, P.hierro); linea(24, 88, 46, 72, K); rect(46, 70, 47, 92, K);
    // los cazos de cobre colgados a la derecha del hogar
    rect(124, 54, 152, 56, K); rect(125, 55, 151, 55, P.hierroL);
    for (const [cx, r, L] of [[130, 6, 8], [143, 5, 12], [128, 4, 22]]) { if (L === 22) continue; linea(cx, 56, cx, 56 + L - r, K); disco(cx, 56 + L, r + 1, K); disco(cx, 56 + L, r, P.cobre); disco(cx - 2, 56 + L - 2, Math.max(1, r - 3), P.cobreL); for (let i = -r; i <= r; i++) pset(cx + i, 56 + L + r - 1, P.cobreS); }
    // la ventanita emplomada con su derrame y un jarro
    rect(180, 50, 212, 92, P.encS); rect(182, 52, 210, 90, K);
    for (let y = 53; y < 90; y++) for (let x = 183; x < 210; x++) { const fuera = y > 80 ? (y > 84 ? C.nieve : hex('#dce6f0')) : c_grad([hex('#6a8ab0'), hex('#9ab4d0'), hex('#c8d8e8')], (y - 53) / 30, x, y); pset(x, y, ((x - 183 + y - 53) % 8 === 0 || (x - 183 - (y - 53) + 80) % 8 === 0) ? hex('#4a4a52') : fuera); }
    for (let x = 183; x < 210; x += 7) for (let y = 70; y < 80; y++) if (y > 80 - (x % 5)) pset(x + 2, y, hex('#3a4a3a'));
    rect(178, 90, 214, 94, K); rect(179, 91, 213, 93, P.encL); rect(198, 82, 206, 91, K); rect(199, 83, 205, 90, hex('#8a5a3a')); rect(199, 83, 200, 90, hex('#a8744a')); rect(206, 84, 208, 87, K);
    // el aparador con los platos de loza azul, las jarras colgadas y los armarios
    rect(218, 50, 276, 146, K); rect(216, 46, 278, 50, K); rect(217, 47, 277, 49, P.vigaL); rect(219, 51, 275, 100, P.vigaS);
    for (const sy of [70, 88]) { rect(219, sy, 275, sy + 2, P.viga); rect(219, sy, 275, sy, P.vigaL); }
    for (const [sy, n] of [[52, 5], [72, 5], [90, 0]]) for (let i = 0; i < n; i++) { const cx = 226 + i * 11, cy = sy + 9; disco(cx, cy, 5, K); disco(cx, cy, 4, P.loza); R.anillo?.(cx, cy, 3, P.lozaA); disco(cx, cy, 1, P.lozaA); pset(cx - 2, cy - 2, C.blanco); }
    for (let i = 0; i < 4; i++) { const jx = 226 + i * 14; linea(jx, 92, jx, 94, K); rect(jx - 3, 94, jx + 3, 99, K); rect(jx - 2, 95, jx + 2, 99, i % 2 ? P.loza : hex('#c8a060')); pset(jx - 2, 96, C.blanco); }
    rect(216, 100, 278, 104, K); rect(217, 101, 277, 103, C.maderaL);
    rect(219, 105, 275, 144, C.madera); for (const dx of [220, 248]) { c_cuarteron(R, dx + 2, 108, dx + 25, 140, [C.madera, C.maderaL, C.maderaD, C.maderaS], dx); disco(dx + 22, 124, 1, P.laton); }
    // la puerta de tablas con su pestillo de hierro
    rect(284, 64, 318, 144, K); for (let x = 285; x < 318; x++) for (let y = 65; y < 144; y++) pset(x, y, (x - 285) % 8 === 0 ? P.vigaD : (x - 285) % 8 === 1 ? P.vigaL : P.viga);
    rect(285, 78, 317, 82, P.vigaS); rect(285, 126, 317, 130, P.vigaS); linea(287, 126, 315, 82, P.vigaS); linea(288, 126, 316, 82, P.vigaS);
    for (const yy of [80, 128]) rect(285, yy, 302, yy + 1, K); rect(289, 104, 295, 106, K); disco(290, 108, 1, K);
  });
  // el fuego, el asador que gira con su pieza, el caldero que humea y el gato
  c_troncos(R, 62, 140, 16); c_fuego(R, 62, 138, 16, t, 2, 1.1);
  c_halo(R, 62, 128, 60, 30, c_P.fuego2, 0.18 + Math.sin(t * 7) * 0.03); c_halo(R, 62, 158, 70, 12, c_P.fuego2, 0.18);
  { const ay = 112, g = t * 1.4; linea(24, ay, 100, ay, K); linea(24, ay - 1, 100, ay - 1, P.hierroL); disco(102, ay, 4, K); disco(102, ay, 3, P.hierro); pset(Math.round(102 + Math.cos(g) * 3), Math.round(ay + Math.sin(g) * 3), C.blanco);
    for (let j = -6; j <= 6; j++) for (let i = -10; i <= 10; i++) { const d = (i / 10) ** 2 + (j / 6) ** 2; if (d > 1) continue; const band = Math.floor((i + 10 + g * 3) / 4) % 2; pset(70 + i, ay + j, d > 0.8 ? hex('#4a2410') : j < -2 ? (band ? hex('#c8784a') : hex('#b0603a')) : band ? hex('#9a4a24') : hex('#8a3e1e')); }
    if (Math.floor(t * 2) % 3 === 0) pset(72, ay + 7 + Math.floor((t * 6) % 6), hex('#e8b060')); }
  { const cx = 47, cy = 98; linea(47, 92, 41, cy - 4, K); linea(47, 92, 53, cy - 4, K); disco(cx, cy + 3, 8, K); rect(cx - 8, cy - 4, cx + 8, cy + 3, K); disco(cx, cy + 3, 7, hex('#2a2a30')); rect(cx - 7, cy - 3, cx + 7, cy + 3, hex('#2a2a30')); rect(cx - 7, cy - 3, cx + 7, cy - 3, P.hierroL); pset(cx - 5, cy, P.hierroL);
    c_humo(R, cx, cy - 6, t, 4, C.blanco, 34); }
  { const r = Math.sin(t * 2.1) > 0 ? 1 : 0, x = 108, y = 152; rect(x, y - 4 - r, x + 10, y, K); rect(x + 1, y - 3 - r, x + 9, y - 1, hex('#5a5a62')); for (let i = x + 2; i < x + 9; i += 2) pset(i, y - 3 - r, hex('#3a3a42')); rect(x + 8, y - 6, x + 12, y - 1, K); rect(x + 9, y - 5, x + 11, y - 2, hex('#5a5a62')); pset(x + 9, y - 7, K); pset(x + 11, y - 7, K); }
  // las hierbas, la ristra y el jamón de la viga, que se mecen un poco
  for (const [x, tipo, k] of [[186, 0, 1], [200, 0, 2], [222, 1, 3], [244, 2, 4], [118, 0, 5], [96, 1, 6]]) { const m = Math.round(Math.sin(t * 1.1 + k) * 1);
    if (tipo === 0) { linea(x, 22, x + m, 28, hex('#8a7a60')); for (let j = 0; j < 12; j++) for (let i = -2 + Math.floor(j / 4); i <= 2 - Math.floor(j / 5); i++) if ((i + j) % 2 === 0) pset(x + m + i, 28 + j, j > 9 ? hex('#5a6a3a') : (i + j) % 4 ? hex('#6a8a4a') : hex('#8aa85a')); }
    else if (tipo === 1) { linea(x, 22, x + m, 26, hex('#8a7a60')); for (let j = 0; j < 5; j++) { disco(x + m + (j % 2 ? 2 : -2), 28 + j * 4, 2, hex('#a8743a')); pset(x + m + (j % 2 ? 1 : -3), 27 + j * 4, hex('#e8c08a')); } }
    else { linea(x, 22, x + m, 26, hex('#8a7a60')); disco(x + m, 34, 6, K); disco(x + m, 34, 5, hex('#a85a3a')); disco(x + m - 2, 32, 2, hex('#d88a6a')); rect(x + m - 1, 26, x + m + 1, 29, hex('#e8d8c0')); } }
  // la rama de muérdago colgada en el centro, con su lazo rojo; o.baya: una baya que se suelta y cae (rebota en el suelo)
  { const sw = Math.sin(t * 0.9) * 1.5; linea(MX, 22, Math.round(MX + sw), 72, hex('#a8303a'));
    const bx = Math.round(MX + sw); for (let j = 0; j < 18; j++) for (let i = -9 + Math.abs(j - 9) * 0.4; i <= 9 - Math.abs(j - 9) * 0.4; i++) { const n = h(Math.round(i), j, 41); if (n < 0.35) continue; pset(bx + Math.round(i), 74 + j, n > 0.85 ? c_P.muerdL : (Math.round(i) + j) % 3 === 0 ? c_P.muerdS : c_P.muerd); }
    for (let b = 0; b < 9; b++) pset(bx + Math.round((h(b, 1, 42) - 0.5) * 12), 78 + Math.floor(h(b, 2, 42) * 12), c_P.baya);
    rect(bx - 3, 70, bx + 3, 73, C.rojoN); pset(bx - 4, 71, C.rojoN); pset(bx + 4, 71, C.rojoN); pset(bx - 3, 74, C.rojoN); pset(bx + 3, 75, C.rojoN); pset(bx, 71, hex('#e04040'));
    const u = o.baya ?? 0; if (u > 0 && u < 1) { const yb = u < 0.7 ? 92 + (u / 0.7) ** 2 * 66 : 158 - Math.sin((u - 0.7) / 0.3 * Math.PI) * 6; R.disco(bx + Math.round(u * 6), Math.round(yb), 1, c_P.baya); pset(bx + Math.round(u * 6) - 1, Math.round(yb) - 1, C.blanco); } }
  return { suelo: 160, muerdago: { x: MX, y: 74, abajo: 92, baya: [MX, 92] }, hogar: { boca: [18, 58, 106, 144], fuego: [62, 138], asador: [24, 112, 100, 112], caldero: [47, 101] }, ventana: [182, 52, 210, 90], aparador: [216, 46, 278, 146], puerta: [284, 64, 318, 144], gato: [108, 152],
    sitios: { criada: 142, criado: 178, galleta: 160 }, libre: [[118, 214]] };
}

// la esquina de la mesa de la cocina, por delante (x 0–74, y ≥ 160): pan, pastel, jarra y cuchillo
function c_mesaCocina(R, t) {
  const { rect, pset, disco } = R, P = c_P, K = C.k;
  rect(0, 164, 74, 168, K); c_viga(R, 0, 73, 165, 167, 51, [C.madera, C.maderaS, C.maderaL, C.maderaD]); rect(0, 169, 72, 179, C.maderaS); rect(0, 169, 72, 169, C.maderaD); rect(60, 169, 64, 179, K); rect(61, 169, 63, 179, C.madera);
  disco(16, 160, 6, K); disco(16, 160, 5, hex('#c88a4a')); rect(10, 160, 22, 164, K); rect(11, 160, 21, 163, hex('#c88a4a')); for (let i = 12; i < 21; i += 3) pset(i, 157, hex('#e8b070')); pset(13, 156, hex('#e8c890'));
  rect(30, 156, 46, 164, K); rect(31, 157, 45, 163, hex('#d8a060')); for (let i = 31; i < 46; i += 2) pset(i, 157, hex('#f0c890')); rect(31, 162, 45, 163, hex('#a87040'));
  rect(52, 152, 60, 164, K); rect(53, 153, 59, 164, hex('#c8c0b0')); rect(53, 153, 54, 164, C.blanco); rect(60, 155, 63, 160, K); rect(53, 157, 59, 158, P.lozaA);
  rect(36, 166, 52, 166, P.peltreS); rect(36, 165, 44, 165, P.peltre);
}

// sillares de piedra (bloques de w × a a matajunta, con su canto de luz, desconchones y marcas de cincel)
function c_sillares(R, x0, y0, x1, y1, k = 0, w = 16, a = 8) {
  const P = c_P; R.rect(x0, y0, x1, y1, P.sillJ);
  for (let f = Math.floor(y0 / a); f * a <= y1; f++) { const y = f * a, dx = f & 1 ? w >> 1 : 0;
    for (let xx = Math.floor((x0 - dx) / w) * w + dx; xx <= x1; xx += w) { const xa = Math.max(x0, xx), xb = Math.min(x1, xx + w - 2), ya = Math.max(y0, y), yb = Math.min(y1, y + a - 2); if (xb < xa || yb < ya) continue;
      const r = h(xx, y, k); for (let yy = ya; yy <= yb; yy++) for (let x = xa; x <= xb; x++) { const v = c_ruido(x, yy, 5, k + 1); R.pset(x, yy, yy === y ? P.sillL : x === xx + w - 2 || yy === y + a - 2 ? P.sillS : v < 0.25 || r < 0.15 ? P.sillS : v > 0.8 ? P.sillL : P.sill); }
      if (r > 0.8 && xb - xa > 6) { R.pset(xa + 3, ya + 3, P.sillJ); R.pset(xa + 4, ya + 3, P.sillS); } } }
}

function c_copista(R, t, o, cam) { return cam === 'pagina' ? c_pagina(R, t, o) : c_scriptorium(R, t, o); }

function c_scriptorium(R, t, o) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, WX0 = 26, WX1 = 72, WY0 = 40, WY1 = 116;
  c_fijo(R, 'nv-scr', () => {
    // la bóveda de crucería: plementos de piedra tramados y los nervios que bajan a las columnas
    for (let y = 0; y < 34; y++) for (let x = 0; x < 320; x++) pset(x, y, c_grad([hex('#4a4236'), hex('#5e5444'), hex('#6e6452')], y / 40 + (c_ruido(x, y, 8, 3) - 0.5) * 0.2, x, y));
    for (const cx of [88, 220]) for (const s of [-1, 1]) for (let i = 0; i < 70; i++) { const x = cx + s * i, y = Math.round(34 - Math.sqrt(Math.max(0, 1 - (i / 70) ** 2)) * 30); if ((x > 268 && y < 50) || (x > 16 && x < 174 && y < 16)) continue; rect(x, y, x, y + 2, hex('#8a7e68')); pset(x, y, hex('#a89c84')); }
    c_sillares(R, 0, 34, 319, 142, 5);
    for (let x = 0; x < 320; x++) for (let y = 34; y < 46; y++) if ((x + y) & 1) c_tinte(R, x, y, K, 0.25);
    // las columnas adosadas con sus capiteles
    for (const cx of [88, 220]) { rect(cx - 5, 34, cx + 5, 142, K); for (let y = 35; y < 142; y++) for (let x = cx - 4; x <= cx + 4; x++) pset(x, y, x < cx - 1 ? P.sillL : x > cx + 2 ? P.sillS : P.sill); rect(cx - 7, 32, cx + 7, 37, K); rect(cx - 6, 33, cx + 6, 35, P.sillL); rect(cx - 7, 138, cx + 7, 142, K); rect(cx - 6, 139, cx + 6, 141, P.sill); }
    // el ventanal gótico: derrame, dos lancetas con tracería y vidrieras de colores
    for (let y = WY0 - 26; y <= WY1 + 4; y++) for (let x = WX0 - 6; x <= WX1 + 6; x++) { const cx = (WX0 + WX1) / 2, dy = y - WY0, ok = dy >= 0 || (Math.hypot(x - (WX0 - 6), y - WY0) < (WX1 - WX0 + 12) && Math.hypot(x - (WX1 + 6), y - WY0) < (WX1 - WX0 + 12)); if (ok) pset(x, y, (x - cx) < 0 ? P.sillS : P.sill); }
    const dentro = (x, y) => { const dy = y - WY0; if (y > WY1 || x < WX0 || x > WX1) return false; return dy >= 0 || (Math.hypot(x - WX0, y - WY0) < (WX1 - WX0) && Math.hypot(x - WX1, y - WY0) < (WX1 - WX0)); };
    const VC = [P.vitR, P.vitA, hex('#e8e0c8'), hex('#d8dcc8'), P.vitM, hex('#e8e0c8'), hex('#c8d0d8'), P.vitV, hex('#e0dcc4'), hex('#d0d8e0')];
    for (let y = WY0 - 40; y <= WY1; y++) for (let x = WX0; x <= WX1; x++) { if (!dentro(x, y)) continue; const plomo = ((x - WX0 + y) % 7 === 0) || ((x - WX0 - y + 200) % 7 === 0); const c = VC[Math.floor(h(Math.floor((x - WX0 + y) / 7), Math.floor((x - WX0 - y + 200) / 7), 9) * VC.length)]; pset(x, y, plomo ? hex('#2a2a30') : c); }
    for (let y = WY0 - 40; y <= WY1; y++) { const xm = (WX0 + WX1) >> 1; if (dentro(xm, y)) rect(xm - 1, y, xm + 1, y, P.sill); }
    for (const cx of [38, 60]) { R.anillo?.(cx, 54, 6, P.sill); }
    for (let y = WY0 - 40; y <= WY1; y++) for (let x = WX0 - 1; x <= WX1 + 1; x++) if (dentro(x, y) !== dentro(x + 1, y) || dentro(x, y) !== dentro(x, y + 1)) pset(x, y, K);
    rect(WX0 - 6, WY1 + 1, WX1 + 6, WY1 + 4, K); rect(WX0 - 5, WY1 + 2, WX1 + 5, WY1 + 3, P.sillL);
    // el nicho con los códices encadenados
    rect(102, 58, 142, 130, K); for (let y = 59; y < 130; y++) for (let x = 103; x < 142; x++) pset(x, y, x < 108 ? hex('#3a3228') : hex('#2a241c'));
    R.poligono([[102, 58], [142, 58], [122, 46]], P.sill); linea(102, 58, 122, 46, P.sillL); linea(122, 46, 142, 58, P.sillS);
    for (const sy of [84, 108, 128]) { rect(102, sy, 142, sy + 2, C.maderaS); rect(102, sy, 142, sy, C.maderaL); }
    for (const [sy, k] of [[84, 1], [108, 2]]) { let x = 106; while (x < 138) { const w = 4 + Math.floor(h(x, k, 3) * 4), al = 12 + Math.floor(h(x, k, 4) * 8), c = [hex('#6a2a1a'), hex('#4a2a1a'), hex('#7a5a2a'), hex('#3a2a3a')][Math.floor(h(x, k, 5) * 4)];
      if (h(x, k, 6) < 0.3) { rect(x, sy - 5, x + 12, sy - 1, K); rect(x + 1, sy - 4, x + 11, sy - 2, c); rect(x + 1, sy - 4, x + 11, sy - 4, P.pergL); x += 14; continue; }
      rect(x, sy - al, x + w - 1, sy - 1, K); rect(x + 1, sy - al + 1, x + w - 2, sy - 1, c); pset(x + 1, sy - al + 3, C.oro); pset(x + 1, sy - al + 6, C.oro); x += w + 1; } }
    for (let i = 0; i < 18; i++) pset(108 + i * 1.6, 86 + Math.round(Math.sin(i * 0.4) * 2 + i * 0.4), i % 2 ? P.peltre : P.peltreS);
    rect(104, 116, 140, 128, hex('#2a241c')); for (let k = 0; k < 4; k++) { rect(106 + k * 9, 120, 113 + k * 9, 128, K); rect(107 + k * 9, 121, 112 + k * 9, 127, P.perg); }
    // la puerta de roble con arco de medio punto y sus herrajes
    for (let y = 66; y < 144; y++) for (let x = 266; x < 312; x++) { const dy = y - 88, r = Math.hypot(x - 289, dy); if (dy < 0 && r > 23) continue; pset(x, y, r > 21 && dy < 0 ? K : (x - 266) % 9 === 0 ? P.vigaD : (x - 266) % 9 === 1 ? P.vigaL : P.viga); }
    for (const yy of [96, 128]) { rect(268, yy, 306, yy + 2, K); rect(268, yy, 306, yy, P.hierroL); disco(304, yy + 1, 2, P.hierro); }
    disco(276, 114, 3, K); disco(276, 114, 2, P.hierro); R.anillo?.(276, 118, 3, P.hierro);
    for (let y = 64; y < 144; y++) { const dy = y - 88; if (dy < 0) { const x = Math.round(Math.sqrt(Math.max(0, 25 * 25 - dy * dy))); pset(289 - x, y, P.sillL); pset(289 + x, y, P.sillS); } else { pset(264, y, P.sillL); pset(314, y, P.sillS); } }
    // el pupitre del fondo con su banco
    rect(228, 118, 262, 122, K); rect(229, 119, 261, 121, C.madera); R.poligono([[232, 118], [258, 118], [256, 112], [234, 114]], K); R.poligono([[233, 117], [257, 117], [255, 113], [235, 115]], P.perg); rect(230, 122, 232, 140, K); rect(258, 122, 260, 140, K); rect(236, 132, 256, 134, K);
    // el suelo de losas con juncos
    for (let y = 143; y < 180; y++) for (let x = 0; x < 320; x++) { const z = y - 100, u = (x - 160) / z * 4, bi = Math.floor(u), ri = Math.floor(400 / z + h(bi, 0, 7) * 0.6); const junta = Math.floor((x - 1 - 160) / z * 4) !== bi || Math.floor(400 / (z - 1) + h(bi, 0, 7) * 0.6) !== ri;
      const tono = h(bi, ri, 8); pset(x, y, junta ? P.sillJ : tono < 0.3 ? P.sillS : tono > 0.85 ? P.sillL : P.sill); }
    rect(0, 142, 319, 143, P.sillJ);
    for (let i = 0; i < 70; i++) { const x = Math.floor(h(i, 1, 9) * 316), y = 148 + Math.floor(h(i, 2, 9) * 30), L = 3 + Math.floor(h(i, 3, 9) * 5); linea(x, y, x + L, y + (i % 3) - 1, i % 2 ? hex('#c8a85a') : hex('#a88a40')); }
    // el candelero alto de hierro (pie de trípode) junto al nicho
    rect(95, 104, 97, 150, K); rect(96, 104, 96, 150, P.hierroL); linea(96, 150, 90, 156, K); linea(96, 150, 102, 156, K); linea(96, 150, 96, 157, K); rect(91, 102, 101, 104, K); rect(94, 90, 98, 102, K); rect(95, 91, 97, 102, hex('#f0e8d0'));
  });
  // el haz de luz del ventanal con sus colores y las motas que flotan en él
  for (let y = WY1 - 10; y < 178; y++) { const d = (y - WY1 + 10) * 0.9, xa = Math.round(WX0 + 6 + d), xb = Math.round(WX1 - 2 + d * 1.4); for (let x = xa; x <= xb; x++) if (((x + y) & 1) === 0) c_tinte(R, x, y, (x - xa) / (xb - xa + 1) < 0.33 ? hex('#ffd8a0') : (x - xa) / (xb - xa + 1) < 0.66 ? hex('#ffe8c0') : hex('#d8e0ff'), 0.12 + Math.sin(t * 0.8) * 0.02); }
  for (let k = 0; k < 16; k++) { const u = (t * 0.04 + h(k, 1, 31)) % 1, y = Math.round(WY1 - 4 + u * 56), x = Math.round(WX0 + 10 + (y - WY1 + 10) * 0.9 + h(k, 2, 31) * 40 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 1.3 + k * 2) > -0.2) c_tinte(R, x, y, C.blanco, 0.7); }
  // las velas: la del candelero, la del pupitre del fondo, con su luz
  c_llama(R, 96, 90, t, 3, 2); c_halo(R, 96, 92, 30, 26, c_P.farol, 0.16 + Math.sin(t * 9) * 0.02);
  { rect(252, 106, 254, 112, C.blanco); c_llama(R, 253, 106, t, 6); c_halo(R, 250, 112, 18, 12, c_P.farol, 0.16); }
  // el monje pequeño del fondo, que copia: la cabeza baja y la mano que va y viene
  { const mx = 244, my = 124, mano = Math.round(Math.sin(t * 3) * 3); rect(mx - 4, my - 4, mx + 4, my + 14, K); rect(mx - 3, my - 3, mx + 3, my + 14, hex('#4a3a2a')); disco(mx, my - 6, 3, K); disco(mx, my - 6, 2, hex('#e8c0a0')); rect(mx - 2, my - 9, mx + 2, my - 8, hex('#4a3a2a'));
    rect(mx + 3, my - 1, mx + 6 + mano, my, hex('#4a3a2a')); pset(mx + 7 + mano, my - 1, hex('#e8c0a0')); linea(mx + 7 + mano, my - 2, mx + 9 + mano, my - 6, C.blanco); }
  // un ratón que cruza junto al muro de vez en cuando
  { const u = (t % 14) / 4; if (u < 1) { const x = Math.round(300 - u * 280); rect(x, 141, x + 3, 142, hex('#6a6070')); pset(x, 140, hex('#6a6070')); pset(x - 1, 141, K); linea(x + 4, 142, x + 7, 141 + (Math.floor(t * 8) % 2), hex('#8a7a80')); } }
  return { suelo: 160, ventana: [WX0, WY0 - 30, WX1, WY1], nicho: [102, 46, 142, 130], puerta: [266, 64, 312, 144], monje: [244, 124], atril: { x0: 160, x1: 204, tablero: [162, 128, 202, 142], libro: [166, 126, 198, 136] }, copista: [140, 160], candelero: [96, 90], libre: [[40, 158], [206, 262]] };
}

// el atril del copista, por delante: el pie torneado, el tablero inclinado con el libro abierto, el tintero y la vela
function c_atril(R, t, o) {
  const { rect, pset, linea } = R, P = c_P, K = C.k;
  rect(180, 140, 184, 160, K); rect(181, 140, 183, 160, C.maderaS); rect(181, 140, 181, 160, C.maderaL); rect(172, 158, 192, 161, K); rect(173, 159, 191, 160, C.madera); for (const r of [146, 152]) rect(179, r, 185, r + 1, K);
  for (let y = 126; y <= 142; y++) { const u = (y - 126) / 16, xa = Math.round(164 - u * 4), xb = Math.round(200 + u * 4); rect(xa, y, xb, y, K); if (y > 126 && y < 142) rect(xa + 1, y, xb - 1, y, y < 129 ? C.maderaL : C.madera); }
  rect(168, 127, 182, 139, K); rect(183, 127, 197, 139, K); rect(169, 128, 181, 138, P.perg); rect(184, 128, 196, 138, P.pergL); rect(182, 127, 183, 139, P.pergD);
  for (let y = 130; y < 138; y += 2) { rect(170, y, 170 + 6 + Math.floor(h(y, 1, 2) * 4), y, P.tintaM); if (y < 136) rect(185, y, 185 + 5 + Math.floor(h(y, 2, 2) * 5), y, y === 130 ? P.rubr : P.tintaM); }
  rect(170, 129, 172, 131, P.azulI); pset(171, 130, C.oro);
  rect(160, 140, 206, 142, K); rect(161, 141, 205, 141, C.maderaL);
  rect(200, 132, 204, 139, K); rect(201, 133, 203, 138, hex('#2a1a12')); linea(203, 132, 208, 122, P.pergL); linea(204, 132, 209, 123, P.pergS);
  rect(160, 132, 163, 139, K); rect(161, 133, 162, 139, C.blanco); c_llama(R, 161, 133, t, 11);
}

// la página de cerca: el códice abierto con la gran ji dorada que se traza con o.ji
function c_pagina(R, t, o) {
  const { rect, pset, linea, disco } = R, P = c_P, K = C.k, PX0 = 22, PX1 = 274, PY0 = 32, PY1 = 168, GX = 148;
  c_fijo(R, 'nv-pag', () => {
    // el tablero del atril, de madera oscura con vetas, alrededor del libro
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = c_ruido(x * 0.4, y * 3, 6, 2); pset(x, y, v < 0.3 ? hex('#3a2416') : v > 0.75 ? hex('#5e3c22') : hex('#4a2e1a')); }
    for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if ((x + y) & 1) c_tinte(R, x, y, K, 0.3);
    // las tapas de cuero que asoman y el lomo
    rect(PX0 - 6, PY0 - 3, PX1 + 6, PY1 + 6, K); rect(PX0 - 5, PY0 - 2, PX1 + 5, PY1 + 5, hex('#6a2a1a')); rect(PX0 - 5, PY1 + 3, PX1 + 5, PY1 + 5, hex('#4a1a10')); for (let x = PX0 - 4; x < PX1 + 4; x += 9) pset(x, PY1 + 4, C.oro);
    // las dos hojas de pergamino, con la curva del lomo y su sombra
    for (let y = PY0; y <= PY1; y++) for (let x = PX0; x <= PX1; x++) { const dg = Math.abs(x - GX), curva = Math.round((1 - Math.min(1, dg / 30)) * 4); if (y < PY0 + curva) continue; const v = c_ruido(x, y, 7, 5) + (c_um(x, y) - 0.5) * 0.15;
      let c = v < 0.3 ? P.pergS : v > 0.75 ? P.pergL : P.perg; if (dg < 10) c = c_grad([P.pergD, P.pergS, P.perg], dg / 10, x, y); if (x === PX0 || x === PX1) c = P.pergD; pset(x, y, c); }
    for (let k = 0; k < 3; k++) { rect(PX0 + 1, PY1 + 1 + k, PX1 - 1, PY1 + 1 + k, k % 2 ? P.pergS : P.pergL); }
    // la página de la izquierda: la inicial pintada, renglones de barras, rúbricas y la orla de hojas con oro
    const renglones = (x0, x1, y0, y1, k) => { for (let y = y0; y <= y1; y += 5) { let x = x0 + (h(y, 0, k) < 0.15 ? 6 : 0); const fin = x1 - Math.floor(h(y, 1, k) * 4); const roja = h(y, 2, k) < 0.12;
      while (x < fin) { const L = 2 + Math.floor(h(x, y, k) * 7); for (let i = 0; i < L && x + i < fin; i++) { pset(x + i, y, roja ? P.rubr : P.tintaM); if (h(x + i, y, k + 1) < 0.18) pset(x + i, y - 1 - (h(x + i, y, k + 2) < 0.5 ? 1 : 0), roja ? P.rubr : P.tintaM); if (h(x + i, y, k + 3) < 0.12) pset(x + i, y + 1, P.tintaM); } x += L + 2; } } };
    rect(40, 44, 58, 62, K); rect(41, 45, 57, 61, P.azulI); rect(43, 47, 55, 59, P.rubr); for (let i = 0; i < 8; i++) { pset(45 + i, 49 + i, C.oro); pset(53 - i, 49 + i, C.oro); } pset(49, 53, P.pergL);
    renglones(62, 132, 48, 62, 1); renglones(38, 132, 67, 158, 2);
    for (let y = PY0 + 8; y < PY1 - 6; y++) { const x = 30 + Math.round(Math.sin(y * 0.18) * 2); pset(x, y, P.verdeI); if (y % 9 === 0) { pset(x - 1, y - 1, P.verdeI); pset(x - 2, y - 1, P.verdeI); pset(x + 1, y + 1, P.verdeI); } if (y % 18 === 4) { disco(x, y, 1, P.rubr); pset(x, y, C.oro); } if (y % 12 === 7) pset(x + 2, y, C.oro); }
    // la página de la derecha: unos renglones arriba, el recuadro de la ji (campo azul con puntos y marco rojo) y más renglones
    renglones(160, 262, 44, 54, 3);
    rect(176, 60, 252, 136, K); rect(177, 61, 251, 135, P.rubr); rect(180, 64, 248, 132, K); rect(181, 65, 247, 131, P.azulI);
    for (let y = 67; y < 131; y += 4) for (let x = 183 + ((y >> 2) & 1) * 2; x < 247; x += 4) pset(x, y, hex('#5a7ad0'));
    for (let x = 178; x < 251; x += 3) { pset(x, 62, C.oro); pset(x, 134, C.oro); } for (let y = 62; y < 135; y += 3) { pset(178, y, C.oro); pset(250, y, C.oro); }
    renglones(160, 262, 142, 160, 4);
    for (let y = PY0 + 8; y < PY1 - 6; y++) { const x = 266 + Math.round(Math.sin(y * 0.2 + 1) * 2); pset(x, y, P.verdeI); if (y % 10 === 0) { pset(x + 1, y - 1, P.verdeI); pset(x + 2, y - 1, P.verdeI); } if (y % 16 === 2) { disco(x, y, 1, P.azulI); pset(x, y, C.oro); } }
    // el tintero de cuerno y la pluma que descansa, a la izquierda; el candelero a la derecha
    rect(4, 140, 16, 162, K); rect(5, 141, 15, 162, hex('#d8c8a0')); rect(5, 141, 15, 143, hex('#2a1a12')); rect(5, 141, 7, 162, hex('#f0e4c4'));
    rect(290, 150, 308, 154, K); rect(291, 151, 307, 153, C.oro); rect(296, 108, 302, 150, K); rect(297, 109, 301, 150, hex('#f0e8d0')); rect(297, 109, 298, 150, C.blanco); rect(297, 110, 301, 112, hex('#e0d4b8'));
  });
  // la ji: dos trazos de oro (\ y luego /) con contorno, luz y los nudos de los extremos; brilla al terminar
  const ji = Math.max(0, Math.min(1, o.ji ?? 0)), A = [[188, 72, 240, 124], [240, 72, 188, 124]];
  let punta = null;
  A.forEach(([x0, y0, x1, y1], s) => { const u = Math.max(0, Math.min(1, ji * 2 - s)); if (u <= 0) return; const n = Math.round(Math.hypot(x1 - x0, y1 - y0) * u);
    for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / Math.hypot(x1 - x0, y1 - y0), y = y0 + (y1 - y0) * i / Math.hypot(x1 - x0, y1 - y0), r = 4 + Math.sin(i / 74 * Math.PI) * 1.5; disco(Math.round(x), Math.round(y), r + 1, K); }
    for (let i = 0; i <= n; i++) { const L = Math.hypot(x1 - x0, y1 - y0), x = x0 + (x1 - x0) * i / L, y = y0 + (y1 - y0) * i / L, r = 4 + Math.sin(i / 74 * Math.PI) * 1.5; disco(Math.round(x), Math.round(y), r, c_P.dorado); disco(Math.round(x - 1), Math.round(y - 1), r - 2, c_P.doradoL); pset(Math.round(x + r - 1), Math.round(y + 1), c_P.doradoS); }
    if (u >= 1) for (const [ex, ey] of [[x0, y0], [x1, y1]]) { R.anillo?.(ex + (ex < 214 ? -6 : 6), ey + (ey < 98 ? -4 : 4), 3, c_P.rubr); disco(ex + (ex < 214 ? -6 : 6), ey + (ey < 98 ? -4 : 4), 1, c_P.doradoL); }
    if (u < 1) { const L = Math.hypot(x1 - x0, y1 - y0); punta = [Math.round(x0 + (x1 - x0) * n / L), Math.round(y0 + (y1 - y0) * n / L)]; } });
  if (ji >= 1) { const g = (t * 0.5) % 1; if (g < 0.4) { const u = g / 0.4, x = Math.round(188 + 52 * u), y = Math.round(72 + 52 * u); for (let r = 0; r < 3; r++) { pset(x + r, y - r, C.blanco); pset(x - r, y + r, C.blanco); } }
    if (Math.sin(t * 4) > 0.6) for (let r = 2; r < 6; r++) { pset(214, 98 - r, C.blanco); pset(214, 98 + r, c_P.doradoL); pset(214 - r, 98, c_P.doradoL); pset(214 + r, 98, c_P.doradoL); } }
  // la vela con su luz sobre la página
  c_llama(R, 299, 108, t, 2, 2); c_halo(R, 280, 110, 60, 50, c_P.farol, 0.12 + Math.sin(t * 9) * 0.015);
  return { suelo: 170, punta: punta ?? (ji <= 0 ? [188, 72] : null), ji: { centro: [214, 98], recuadro: [176, 60, 252, 136], trazos: A }, pagina: [PX0, PY0, PX1, PY1], vela: [299, 108], tintero: [10, 141], inserto: true };
}

// la paleta propia de hoy y el cierre
const EC = pal({
  pap: '#2c4a3a', papL: '#3e604a', papS: '#223a2e', papM: '#4c7056', techo: '#e6dcc4', techoS: '#c4b89c', cornisa: '#7a4a2a', cornisaL: '#b07a48',
  mad: '#7a4626', madS: '#552e18', madL: '#a2643a', madD: '#3a1e10', suelo: '#8a5430', sueloS: '#6c3e22', sueloL: '#b07a48', junta: '#40220f',
  lad: '#a24a34', ladS: '#7a3424', ladL: '#c86a4a', mortero: '#d0b8a0', piedra: '#b8ae9e', piedraS: '#8a8072', piedraL: '#dcd4c4',
  terc: '#6a1c26', tercL: '#9a3440', tercS: '#3e0e16', abeto: '#1e5a34', abetoS: '#0e3a22', abetoL: '#2f7a44', abetoB: '#5aa060',
  cielN0: '#0e1430', cielN1: '#1a2450', cielN2: '#2c3a6e', cielN3: '#3c4c80', luzV: '#ffd77a', luzVS: '#d89a40',
  inv0: '#6e9cd0', inv1: '#8cb4e0', inv2: '#b2d0ec', inv3: '#d6e6f4', colina: '#9cb2cc', colinaS: '#7a92b2', pino: '#2e4a40', pinoS: '#1e3430', pinoL: '#4a6a56',
  nv: '#eef3f8', nvS: '#c4d2e4', nvD: '#9aaccc', nvL: '#ffffff', camino: '#d6d6dc', rodera: '#aeb2c4', granero: '#a8322a', granS: '#782018',
  esp0: '#04050d', esp1: '#0a0e22', esp2: '#141a38', mar0: '#163a7a', mar1: '#1f56a8', mar2: '#3a7ac8', tierra0: '#3a6a34', tierra1: '#6a8a44', tierra2: '#a89a6a',
  nubeT: '#f0f4fa', atm: '#7ab8f0', atmL: '#bfe2ff', gem: '#262a32', gemL: '#4a505e', gemS: '#14161c', adap: '#e6e8ec', adapS: '#9aa2b0', adapL: '#ffffff',
  cab: '#5a625e', cabS: '#3e4542', cabL: '#7a8480', cabD: '#2a302e', asiento: '#bdb4a2', asientoS: '#8a8272', asientoL: '#dcd4c2', pan: '#2e3236', panL: '#4a5056',
  tre0: '#7e8a9e', tre1: '#9aa2b2', tre2: '#bcbec6', tre3: '#d8d2ca', sacos: '#b8a682', sacosS: '#8a7a5a', sacosL: '#d8c8a2', barro: '#6a5a48',
  tar0: '#28304e', tar1: '#4a4670', tar2: '#8a6a86', tar3: '#d89a7e',
});

const e_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral de la trama ordenada de 4 × 4
const e_b4 = (x, y) => (e_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla de dos colores (a: cuánto del segundo)
const e_mez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// ruido suave (interpolado) para manchas de tierra, nubes y vetas
const e_ruido = (x, y, k = 0) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy), a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };

// un degradado vertical tramado entre varios colores (f: desplazamiento opcional por píxel)
function e_degr(R, x0, y0, x1, y1, cols, f = null) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let v = (y - y0) / Math.max(1, y1 - y0) * n + (f ? f(x, y) : 0); v = Math.max(0, Math.min(n, v)); const i = Math.floor(v); R.pset(x, y, v - i > e_b4(x, y) && i < n ? cols[i + 1] : cols[i]); }
}

// un fondo fijo que se pinta una vez por lienzo y clave y se copia entero en cada fotograma
const e_CACHE = new WeakMap();

function e_capa(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba) con su base plana; cols = [sombra, cuerpo, luz]
function e_nube(R, cx, cy, w, k, cols) {
  const n = 3 + (k % 3), r0 = w / (n + 1);
  const B = []; for (let i = 0; i < n; i++) { const u = i / (n - 1) - 0.5; B.push([u * w * 0.78, -Math.cos(u * Math.PI) * r0 * 0.9 + (h(i, k, 701) - 0.5) * 2, r0 * (0.75 + Math.cos(u * Math.PI) * 0.5)]); }
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), cols[0]);
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx), Math.round(cy + dy - 0.5), Math.round(r * 0.88), cols[1]);
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx - r * 0.25), Math.round(cy + dy - r * 0.35), Math.max(1, Math.round(r * 0.5)), cols[2]);
  for (let x = Math.round(cx - w * 0.45); x <= cx + w * 0.45; x++) { R.pset(x, Math.round(cy + r0 * 0.55), cols[0]); if (h(x, k, 702) < 0.5) R.pset(x, Math.round(cy + r0 * 0.55) + 1, cols[0]); }
}

// copos que caen con un vaivén (n copos en la caja; los de i % 4 === 0, más gordos y cercanos)
function e_copos(R, t, x0, y0, x1, y1, n, k, c1, c2, vel = 10, viento = 4) {
  const W = x1 - x0 + 1, H = y1 - y0 + 1;
  for (let i = 0; i < n; i++) { const g = i % 4 === 0, v = vel * (0.6 + h(i, 3, k) * 0.7) * (g ? 1.5 : 1);
    const y = y0 + (((h(i, 2, k) * H + t * v) % H) + H) % H, x = x0 + (((h(i, 1, k) * W + t * viento * (g ? 1.4 : 1) + Math.sin(t * 1.3 + i) * 2.5) % W) + W) % W;
    R.pset(Math.round(x), Math.round(y), g ? c1 : c2); if (g) { R.pset(Math.round(x) + 1, Math.round(y), c2); R.pset(Math.round(x), Math.round(y) + 1, c2); } }
}

// humo que sube y se deshace desde (x, y)
function e_humo(R, x, y, t, k, col, alto = 26) {
  for (let i = 0; i < 9; i++) { const u = ((t * 0.35 + i / 9 + k * 0.13) % 1), yy = y - u * alto, xx = x + Math.sin(u * 5 + t * 0.8 + k) * (2 + u * 5) + u * 6, r = 1 + u * 3.2;
    if (u > 0.85 && (i & 1)) continue; for (let j = -r; j <= r; j++) for (let ii = -r; ii <= r; ii++) if (ii * ii + j * j <= r * r && e_b4(Math.round(xx + ii), Math.round(yy + j)) < 0.85 - u * 0.6) R.pset(Math.round(xx + ii), Math.round(yy + j), col); }
}

// un pájaro (o cuervo) en vuelo, de 5 px, que bate las alas
function e_pajaro(R, x, y, t, col, k = 0) { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 8 + k * 2) > 0; R.pset(x, y, col); R.pset(x - 1, y - (a ? 1 : 0), col); R.pset(x + 1, y - (a ? 1 : 0), col); R.pset(x - 2, y - (a ? 2 : -1), col); R.pset(x + 2, y - (a ? 2 : -1), col); }

// cifras de 3 × 5 (para el 25 del calendario y los diales)
const E_DIG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 3: ['###', '..#', '.##', '..#', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'] };

function e_cifras(R, txt, x, y, col, s = 1) { for (const ch of String(txt)) { const g = E_DIG[ch]; if (g) g.forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, col); }); x += 4 * s; } }

// una llama de vela de 1–2 px que tiembla, con su halo
function e_llama(R, x, y, t, k = 0, grande = false) {
  const f = Math.sin(t * 11 + k * 3.1) + Math.sin(t * 7.3 + k), dx = f > 1.1 ? 1 : f < -1.2 ? -1 : 0;
  if (grande) R.halo(x, y - 1, 6, [hex('#a86a30'), hex('#e8b060'), hex('#fde2a0')], 0.9);
  R.pset(x + dx, y - 2, hex('#fff2b0')); R.pset(x, y - 1, hex('#ffd060')); R.pset(x, y, hex('#f08a30')); if (grande) { R.pset(x + dx, y - 3, hex('#fff8d8')); R.pset(x - 1, y - 1, hex('#f0a040')); }
}

// el papel pintado del salón (rayas y rombos), más tranquilo en la esquina de Atom; esc: tamaño del dibujo
function e_papel(R, x0, y0, x1, y1, esc = 1) {
  const w = 16 * esc, a = 20 * esc;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const raya = Math.floor(x / w) & 1, lx = ((x % w) + w) % w, ly = (((y - y0) % a) + a) % a, cx = w / 2, cy = a / 2;
    const atom = x > 268 && y < 54, oscuro = (y - y0) / (y1 - y0 + 1) < 0.18 ? 0.5 : 0;
    let c = raya ? EC.pap : EC.papL;
    if (!atom && raya) { const d = Math.abs(lx - cx) / (w / 2) + Math.abs(ly - cy) / (a / 2); if (Math.abs(d - 0.62) < 0.09 * (esc > 1 ? 0.8 : 1.2)) c = EC.papM; else if (d < 0.14) c = EC.papM; }
    if (lx === 0) c = EC.papS;
    if (h(x, y, 703) < 0.06) c = e_mez(c, EC.papS, 0.5);
    if (oscuro && e_b4(x, y) < oscuro * (1 - (y - y0) / ((y1 - y0) * 0.18))) c = EC.papS;
    R.pset(x, y, c);
  }
}

// tablas de suelo en perspectiva entre y0 e y1 (punto de fuga muy alto); las tablas más claras cerca de la chimenea (xLuz)
function e_tablas(R, y0, y1, xLuz = 240, ancho = 12) {
  const fy = y0 - 170;
  for (let y = y0; y <= y1; y++) { const z = 1600 / (y - fy), zp = 1600 / (y - 1 - fy);
    for (let x = 0; x < 320; x++) { const u = 160 + (x - 160) * (y0 - fy) / (y - fy), id = Math.floor(u / ancho), idp = Math.floor((160 + (x - 1 - 160) * (y0 - fy) / (y - fy)) / ancho);
      const desf = h(id, 1, 704) * 6, j1 = Math.floor(z / 1.1 + desf), j0 = Math.floor(zp / 1.1 + desf);
      let c = h(id, j1, 705) < 0.33 ? EC.sueloS : h(id, j1, 705) > 0.8 ? e_mez(EC.suelo, EC.sueloL, 0.4) : EC.suelo;
      if (h(id, Math.floor(z * 4), 706) < 0.18 && ((x + y) & 1)) c = e_mez(c, EC.junta, 0.4);
      if (id !== idp) c = EC.junta; else if (j1 !== j0 && y > y0) c = EC.junta;
      const luz = 1 - Math.abs(x - xLuz) / 140; if (luz > 0 && luz * 0.5 > e_b4(x, y) + 0.1) c = e_mez(c, EC.sueloL, 0.35);
      if (y - y0 < 4 && e_b4(x, y) < 0.5) c = e_mez(c, EC.junta, 0.35);
      R.pset(x, y, c); } }
}

// un abeto de Navidad a capas (cx, base del follaje yb, alto, ancho de la capa de abajo); la luz le llega por la derecha
function e_abeto(R, cx, ytop, yb, w0, k = 0) {
  const n = 5, alto = yb - ytop;
  for (let i = n - 1; i >= 0; i--) { const ya = ytop + Math.round(alto * i / n * 0.86), yz = ytop + Math.round(alto * (i + 1) / n) + 2, wb = Math.round(w0 * (0.32 + 0.68 * (i + 1) / n));
    for (let y = ya; y <= yz; y++) { const f = (y - ya) / (yz - ya), ww = 1 + f * wb;
      for (let x = Math.round(cx - ww); x <= Math.round(cx + ww); x++) { const u = (x - cx) / ww, fest = y > yz - 3 && Math.abs(Math.sin((x - cx) * 0.55 + i)) > 0.5 + (yz - y) * 0.2; if (fest) continue;
        let c = u < -0.45 ? EC.abetoS : u < 0.25 ? EC.abeto : EC.abetoL; const n2 = h(x, y, 710 + k);
        if (n2 < 0.18) c = EC.abetoS; else if (n2 > 0.9 && u > -0.2) c = EC.abetoB; if (y >= yz - 1) c = EC.abetoS;
        R.pset(x, y, c); }
      // las puntas de las ramas, claras, en el borde de abajo
    }
    for (let x = Math.round(cx - wb); x <= cx + wb; x += 3) if (h(x, i, 711 + k) < 0.7) R.pset(x, yz - 2, x > cx ? EC.abetoB : EC.abetoL);
  }
}

// las luces de un abeto (posiciones fijas por k); parpadean por turnos en cuatro colores
function e_lucesAbeto(R, t, cx, ytop, yb, w0, n, k = 0, gordas = false) {
  const COL = [hex('#ff5a4a'), hex('#ffd050'), hex('#5ad0ff'), hex('#8aff7a')];
  for (let i = 0; i < n; i++) { const f = 0.12 + h(i, 1, 720 + k) * 0.86, y = Math.round(ytop + f * (yb - ytop)), ww = (0.15 + 0.8 * f) * w0, x = Math.round(cx + (h(i, 2, 720 + k) - 0.5) * 1.7 * ww);
    const on = Math.sin(t * (1.4 + (i % 3) * 0.5) + i * 1.7) > -0.3, c = COL[i % 4];
    if (on) { R.pset(x, y, c); if (gordas) { R.pset(x + 1, y, c); R.pset(x, y + 1, e_mez(c, C.k, 0.3)); R.pset(x - 1, y - 1, e_mez(c, C.blanco, 0.6)); } else R.pset(x, y - 1, e_mez(c, C.blanco, 0.5)); }
    else R.pset(x, y, e_mez(c, C.k, 0.55)); }
}

// las bolas y el espumillón de un abeto (fijos)
function e_adornosAbeto(R, cx, ytop, yb, w0, n, k = 0, r = 1) {
  const COL = [[EC.terc, hex('#e04050'), hex('#ffb0b8')], [hex('#a07820'), C.oroN, hex('#fff0b0')], [hex('#284a9a'), hex('#4a7ad8'), hex('#c8dcff')], [hex('#8a8aa0'), hex('#d0d4e0'), C.blanco]];
  for (let g = 0; g < 4; g++) { const y0 = ytop + (yb - ytop) * (0.25 + g * 0.19);
    for (let x = -w0; x <= w0; x++) { const f = (y0 - ytop) / (yb - ytop), ww = (0.15 + 0.85 * f) * w0; if (Math.abs(x) > ww * 0.95) continue; const y = Math.round(y0 + x * 0.32 + Math.sin(x * 0.3) * 1.5); if ((x + g) % 2 === 0) R.pset(cx + x, y, (x + g) % 6 === 0 ? hex('#fff6c0') : C.oroN); } }
  for (let i = 0; i < n; i++) { const f = 0.2 + h(i, 4, 730 + k) * 0.78, y = Math.round(ytop + f * (yb - ytop)), ww = (0.15 + 0.82 * f) * w0, x = Math.round(cx + (h(i, 5, 730 + k) - 0.5) * 1.6 * ww), c = COL[i % 4];
    R.pset(x, y - r - 1, hex('#c8b070')); if (r <= 1) { R.rect(x, y, x + 1, y + 1, c[1]); R.pset(x + 1, y + 1, c[0]); R.pset(x, y, c[2]); } else { R.disco(x, y, r, c[0]); R.disco(x - 0.5, y - 0.5, r - 1, c[1]); R.pset(x - 1, y - 1, c[2]); R.pset(x - 1, y - 2, c[2]); } }
}

// un regalo (caja con lazo) de w × a apoyado en (x, yb)
function e_regalo(R, x, yb, w, a, c, cS, cinta) {
  R.rect(x, yb - a, x + w, yb, C.k); R.rect(x + 1, yb - a + 1, x + w - 1, yb - 1, c); R.rect(x + 1, yb - a + 1, x + w - 1, yb - a + 2, e_mez(c, C.blanco, 0.3)); R.rect(x + w - 3, yb - a + 3, x + w - 1, yb - 1, cS);
  const mx = x + (w >> 1); R.rect(mx, yb - a + 1, mx + 1, yb - 1, cinta); R.rect(x + 1, yb - (a >> 1), x + w - 1, yb - (a >> 1), cinta);
  R.disco(mx - 2, yb - a - 1, 2, cinta); R.disco(mx + 3, yb - a - 1, 2, cinta); R.pset(mx - 2, yb - a - 2, C.blanco); R.pset(mx, yb - a, e_mez(cinta, C.k, 0.4));
}

// el fuego de la chimenea (base en yb, de x0 a x1): lenguas que suben a distinta fase, brasas y chispas
function e_fuego(R, t, x0, x1, yb, alto) {
  const COL = [hex('#8a1a10'), hex('#e0501e'), hex('#ffa030'), hex('#ffe070'), hex('#fff8d0')];
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), env = Math.sin(u * Math.PI), a = alto * env * (0.6 + 0.4 * Math.sin(t * 6 + x * 0.7) * Math.sin(t * 3.7 - x * 0.3) + 0.25 * Math.sin(t * 9 + x * 1.3));
    for (let y = 0; y < a; y++) { const f = 1 - y / a, c = COL[Math.min(4, Math.floor(f * 4.4 * (0.75 + env * 0.4)))]; if (y > a - 2 && ((x + Math.floor(t * 12)) & 1)) continue; R.pset(x, yb - y, c); } }
  for (let i = 0; i < 6; i++) { const u = ((t * 0.6 + i / 6) % 1), x = Math.round(x0 + (x1 - x0) * h(i, Math.floor(t * 0.6 + i / 6), 740) + Math.sin(t * 5 + i) * 2), y = Math.round(yb - alto * 0.6 - u * alto * 1.1); if (u < 0.8) R.pset(x, y, u < 0.4 ? hex('#ffe070') : hex('#e0501e')); }
}

function e_salon(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  e_capa(R, 'salon', () => {
    // el techo con la cornisa
    e_degr(R, 0, 0, 319, 6, [EC.techoS, EC.techo]); rect(0, 7, 319, 11, EC.cornisa); rect(0, 7, 319, 7, EC.cornisaL); rect(0, 9, 319, 9, EC.madS); for (let x = 2; x < 320; x += 5) pset(x, 10, EC.cornisaL); rect(0, 11, 319, 11, EC.madD);
    e_papel(R, 0, 12, 319, 89);
    // el zócalo de cuarterones con la moldura
    rect(0, 90, 319, 92, EC.madL); rect(0, 92, 319, 92, EC.madS); rect(0, 93, 319, 115, EC.mad);
    for (let x = 4; x < 320; x += 38) { rect(x, 96, x + 32, 112, EC.madS); rect(x + 1, 97, x + 31, 111, EC.mad); rect(x + 1, 97, x + 31, 97, EC.madD); rect(x + 1, 111, x + 31, 111, EC.madL); rect(x + 31, 97, x + 31, 111, EC.madL);
      for (let g = 0; g < 3; g++) { const gy = 100 + g * 4 + Math.round(h(x, g, 750) * 2); rect(x + 4 + Math.round(h(x, g, 751) * 8), gy, x + 14 + Math.round(h(x, g, 752) * 14), gy, EC.madS); } }
    rect(0, 115, 319, 118, EC.madD); rect(0, 115, 319, 115, EC.madL);
    e_tablas(R, 119, 179, 236);
    // la alfombra trenzada ovalada
    for (let y = 136; y <= 179; y++) for (let x = 40; x <= 290; x++) { const d = Math.hypot((x - 165) / 118, (y - 160) / 18); if (d > 1) continue;
      const anillo = Math.floor(d * 8), cs = [EC.terc, hex('#c8b890'), EC.abeto, EC.terc, hex('#c8b890'), hex('#8a3a2a'), EC.abetoS, EC.tercS][anillo]; let c = cs;
      if (((x + y * 2 + anillo) % 3) === 0) c = e_mez(c, C.k, 0.3); if (d > 0.96) c = EC.tercS; pset(x, y, c); }
    // la ventana: la calle nevada de noche, las casas de enfrente con luz, la farola
    const W0 = 21, W1 = 75, V0 = 31, V1 = 83;
    e_degr(R, W0, V0, W1, V1, [EC.cielN0, EC.cielN1, EC.cielN2, EC.cielN3]);
    for (let k = 0; k < 14; k++) pset(W0 + Math.round(h(k, 1, 753) * 54), V0 + Math.round(h(k, 2, 753) * 16), k % 3 ? hex('#8a94c8') : hex('#e8ecff'));
    for (const [x0, x1, yt, tc] of [[18, 44, 58, hex('#4a3a4a')], [42, 62, 54, hex('#3a3448')], [60, 80, 60, hex('#4a3e3a')]]) {
      const mx = (x0 + x1) >> 1; poligono([[x0 - 2, yt + 6], [mx, yt - 4], [x1 + 2, yt + 6]], EC.nv); poligono([[x0, yt + 6], [mx, yt - 2], [x1, yt + 6]], EC.nvS);
      rect(x0, yt + 6, x1, 80, tc); for (let y = yt + 8; y < 80; y += 2) rect(x0, y, x1, y, e_mez(tc, C.k, 0.2));
      for (let x = x0 + 3; x < x1 - 3; x += 7) { rect(x, yt + 10, x + 3, yt + 14, h(x, yt, 754) < 0.7 ? EC.luzV : hex('#2a2a3a')); rect(x, yt + 13, x + 3, yt + 14, EC.luzVS); } }
    rect(W0, 79, W1, V1, EC.nv); for (let x = W0; x <= W1; x++) if (h(x, 1, 755) < 0.3) pset(x, 79, EC.nvS);
    R.halo(68, 66, 9, [hex('#3a4a7a'), hex('#8a7a6a'), hex('#e8c880')], 1.0); rect(68, 66, 68, 80, hex('#1a1a26')); rect(66, 64, 70, 66, hex('#1a1a26')); pset(68, 66, hex('#fff2b0'));
    // la escarcha en las esquinas del cristal y los reflejos
    for (let y = V0; y <= V1; y++) for (let x = W0; x <= W1; x++) { const dx = Math.min(x - W0, W1 - x), dy = Math.min(y - V0, V1 - y), e = Math.min(Math.abs(x - 48), dx) ; const d = Math.min(dx + dy * 0.6, Math.abs(x - 48) + Math.abs(y - 57) * 2); if (d < 5 && e_b4(x, y) < (5 - d) / 6) pset(x, y, hex('#d8e4f4')); }
    for (let i = 0; i < 10; i++) { pset(W0 + 6 + i, V0 + 14 - i, hex('#5a6aa0')); pset(52 + i, V0 + 18 - i, hex('#4a5a90')); }
    // el marco blanco con los montantes y el alféizar
    rect(16, 26, 80, 30, hex('#e8e2d4')); rect(16, 26, 80, 26, C.blanco); rect(16, 26, 20, 88, hex('#e8e2d4')); rect(76, 26, 80, 88, hex('#c8c0b0')); rect(16, 84, 80, 88, hex('#d8d0c0'));
    rect(47, 31, 49, 83, hex('#e8e2d4')); rect(49, 31, 49, 83, hex('#a8a090')); rect(21, 56, 75, 58, hex('#e8e2d4')); rect(21, 58, 75, 58, hex('#a8a090'));
    rect(12, 88, 84, 91, hex('#f0eadc')); rect(12, 91, 84, 92, hex('#a89c88')); rect(12, 88, 84, 88, C.blanco);
    // la flor de Pascua en su maceta, sobre el alféizar
    rect(26, 82, 34, 87, C.k); rect(27, 83, 33, 87, hex('#c86a3a')); rect(27, 83, 33, 83, hex('#e8904a'));
    for (const [dx, dy] of [[-4, -1], [4, -1], [0, -4], [-3, -4], [3, -4], [0, 0]]) { disco(30 + dx, 80 + dy, 2, EC.rojoN ?? hex('#c02030')); pset(30 + dx - 1, 80 + dy - 1, hex('#f05060')); }
    pset(30, 77, C.oroN); pset(29, 78, C.oroN);
    // las cortinas de terciopelo con sus pliegues, la galería y los alzapaños
    rect(4, 18, 92, 20, EC.madD); rect(4, 18, 92, 18, C.oroN); disco(4, 19, 2, C.oroN); disco(92, 19, 2, C.oroN);
    for (const [a, b, lado] of [[6, 20, -1], [76, 90, 1]]) for (let y = 21; y <= 112; y++) { const cint = y > 64 && y < 70, w = cint ? 0.55 : 1;
      for (let x = a; x <= b; x++) { const m = lado < 0 ? a : b, u = (x - m) * -lado / (b - a); if (u > w) continue; const ph = Math.sin((x + (y > 70 ? (y - 70) * 0.08 * lado : 0)) * 1.1); pset(x, y, ph > 0.5 ? C.rojoN : ph > -0.3 ? EC.terc : EC.tercS); }
      if (cint) { rect(lado < 0 ? a : b - 8, 66, lado < 0 ? a + 8 : b, 67, C.oroN); } }
    // la lámpara de pie con su pantalla de flecos y el círculo de luz en la pared
    R.halo(94, 50, 22, [hex('#3a5a44'), hex('#4c6e52'), hex('#6a8a62')], 0.9);
    rect(93, 56, 94, 117, hex('#3a3026')); rect(93, 56, 93, 117, hex('#8a7a5a')); rect(88, 116, 99, 118, hex('#2a2018'));
    poligono([[84, 56], [104, 56], [100, 42], [88, 42]], hex('#e8c88a')); poligono([[96, 56], [104, 56], [100, 42], [96, 42]], hex('#c8a060')); rect(88, 42, 100, 42, hex('#f8e8c0')); for (let x = 84; x <= 104; x += 2) pset(x, 57, hex('#a8783a'));
    // los dos cuadritos entre el árbol y la chimenea: un paisaje nevado y la familia en círculos
    rect(160, 30, 186, 50, hex('#6a4a1a')); rect(161, 31, 185, 49, C.oroN); rect(163, 33, 183, 47, hex('#8ab0d8')); poligono([[163, 47], [172, 37], [180, 47]], EC.nvS); poligono([[170, 39], [172, 37], [174, 39]], C.blanco); rect(163, 45, 183, 47, EC.nv); disco(179, 37, 2, hex('#fff2b0'));
    rect(166, 56, 182, 70, hex('#4a2a14')); rect(167, 57, 181, 69, hex('#f0e6d0')); for (const [x, c] of [[170, EC.terc], [174, hex('#3a5a9a')], [178, EC.abeto]]) { disco(x, 62, 1, hex('#e8b890')); rect(x - 1, 64, x + 1, 68, c); }
    // la chimenea: repisa, ladrillo, boca con su hogar de piedra, los morillos y los troncos
    rect(198, 66, 268, 116, EC.lad);
    for (let y = 66; y <= 116; y++) for (let x = 198; x <= 268; x++) { const fila = Math.floor((y - 66) / 4), lx = (x - 198 + (fila & 1) * 5) % 10; let c = EC.lad;
      if ((y - 66) % 4 === 3 || lx === 9) c = EC.mortero; else { const n = h(Math.floor((x - 198 + (fila & 1) * 5) / 10), fila, 760); c = n < 0.25 ? EC.ladS : n > 0.85 ? EC.ladL : EC.lad; if ((y - 66) % 4 === 0 && lx < 8) c = e_mez(c, C.blanco, 0.15); }
      if (x > 260) c = e_mez(c, C.k, 0.25); pset(x, y, c); }
    rect(214, 82, 252, 116, C.k); rect(216, 84, 250, 116, hex('#1a1210')); disco(233, 86, 17, C.k); disco(233, 86, 15, hex('#1a1210')); rect(216, 86, 250, 116, hex('#1a1210'));
    for (let y = 86; y < 114; y += 4) for (let x = 218; x < 249; x += 8) rect(x + ((y >> 2) & 1) * 4, y, x + 4 + ((y >> 2) & 1) * 4, y, hex('#2a1c16'));
    rect(192, 60, 274, 65, EC.madD); rect(192, 60, 274, 61, EC.madL); rect(194, 65, 272, 66, EC.madS); for (let x = 196; x < 272; x += 9) pset(x, 63, EC.madS);
    rect(190, 116, 276, 122, EC.piedra); rect(190, 116, 276, 116, EC.piedraL); rect(190, 122, 276, 122, EC.piedraS); for (let x = 196; x < 276; x += 14) rect(x, 117, x, 121, EC.piedraS);
    // los morillos y los troncos
    rect(220, 110, 246, 112, hex('#2a2a2e')); rect(222, 104, 223, 112, hex('#2a2a2e')); rect(243, 104, 244, 112, hex('#2a2a2e'));
    for (const [x0, y0, x1, y1] of [[221, 108, 245, 105], [224, 104, 242, 108]]) { linea(x0, y0, x1, y1, hex('#5a3a22')); linea(x0, y0 + 1, x1, y1 + 1, hex('#3a2414')); linea(x0, y0 - 1, x1, y1 - 1, hex('#7a5232')); }
    // el cuadro nevado sobre la repisa (lejos de la esquina de Atom)
    rect(208, 20, 258, 54, hex('#5a3a12')); rect(209, 21, 257, 53, C.oroN); rect(210, 22, 256, 52, C.oroNS); rect(212, 24, 254, 50, hex('#a8c4e0'));
    e_degr(R, 212, 24, 254, 40, [hex('#7aa0d0'), hex('#c8dcf0')]); poligono([[212, 44], [226, 30], [238, 42], [248, 34], [254, 40], [254, 50], [212, 50]], hex('#8a9ab8')); poligono([[222, 34], [226, 30], [230, 34]], C.blanco); poligono([[245, 37], [248, 34], [251, 37]], C.blanco);
    rect(212, 46, 254, 50, EC.nv); for (const x of [218, 224, 244]) { poligono([[x - 3, 47], [x, 39], [x + 3, 47]], EC.pino); rect(x, 47, x, 48, EC.madS); } rect(232, 42, 238, 47, EC.granero); poligono([[231, 42], [235, 39], [239, 42]], C.blanco); pset(234, 45, EC.luzV);
    // la mesita con su tapete y el pie del globo terráqueo
    rect(280, 98, 314, 101, EC.madL); rect(280, 101, 314, 104, EC.madS); rect(282, 104, 284, 128, EC.madS); rect(310, 104, 312, 128, EC.madS); rect(283, 104, 283, 128, EC.madL); rect(286, 120, 308, 121, EC.madS);
    poligono([[284, 98], [310, 98], [306, 100], [288, 100]], hex('#f0e8d8')); for (let x = 286; x < 310; x += 3) pset(x, 101, hex('#f0e8d8'));
    rect(294, 92, 298, 97, hex('#8a6a2a')); rect(292, 96, 300, 97, C.oroNS); linea(286, 83, 296, 95, C.oroNS);
    // el aplique de pared, con luz suave (por debajo de la esquina de Atom)
    R.halo(298, 62, 9, [hex('#3a5a44'), hex('#5a7a5a'), hex('#8a9a6a')], 0.8); rect(297, 62, 299, 66, C.oroNS); rect(295, 58, 301, 61, hex('#f0dcaa')); rect(295, 58, 301, 58, hex('#fff4d8'));
    // los regalos y la falda del árbol; el árbol y su tronco
    for (let y = 120; y <= 128; y++) for (let x = 100; x <= 164; x++) { const d = Math.hypot((x - 132) / 32, (y - 124) / 4.5); if (d < 1) pset(x, y, d > 0.85 ? EC.terc : ((x + y) % 4 ? hex('#f0ece4') : hex('#d8d0c4'))); }
    rect(130, 112, 134, 124, EC.madS); rect(130, 112, 130, 124, EC.madL);
    e_abeto(R, 132, 36, 114, 30, 0); e_adornosAbeto(R, 132, 36, 114, 30, 18, 0, 1);
    e_regalo(R, 104, 128, 14, 10, EC.terc, EC.tercS, C.oroN); e_regalo(R, 120, 130, 10, 8, hex('#2a5aa8'), hex('#1a3a78'), hex('#f0f0f0')); e_regalo(R, 140, 129, 16, 12, hex('#e8e0c8'), hex('#b8ac90'), C.rojoN ?? EC.terc); e_regalo(R, 154, 127, 9, 7, EC.abeto, EC.abetoS, hex('#e04050'));
  });
  // vida: la ventana (nieve, una luz de enfrente que se enciende y se apaga, el vecino con su perro que pasa)
  R.recorte([21, 31, 75, 83]);
  { const on = Math.sin(t * 0.7) > 0; rect(51, 68, 54, 71, on ? EC.luzV : hex('#2a2a3a')); }
  { const u = (t / 12) % 1, x = Math.round(84 - u * 80), y = 81, a = Math.floor(t * 5) % 2; for (let j = 0; j < 6; j++) R.linea(x, y - 6 + j, x + 2, y - 6 + j, j < 2 ? hex('#5a3a2a') : hex('#2a3a5a')); pset(x + 1, y - 7, hex('#e8b890')); pset(x + a, y, C.k); pset(x + 2 - a, y, C.k); pset(x - 4, y - 1, hex('#6a4a2a')); pset(x - 5, y - 2, hex('#6a4a2a')); pset(x - 3, y - 1, hex('#6a4a2a')); pset(x - 3 + a, y, hex('#6a4a2a')); R.linea(x, y - 3, x - 3, y - 2, hex('#8a8a9a')); }
  e_copos(R, t, 21, 31, 75, 83, 28, 1, C.blanco, hex('#a8b4d8'), 9, 3);
  R.recorte(null);
  // la estrella del árbol y las luces
  { const b = 0.6 + 0.4 * Math.sin(t * 2.4); R.halo(132, 34, 7 + b * 2, [hex('#3e604a'), hex('#a89a4a'), hex('#f8e08a')], 1); const S = ['..#..', '.###.', '#####', '.###.', '.#.#.']; S.forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[i] === '#') pset(130 + i, 31 + j, j < 2 ? hex('#fff6c0') : C.oroN); }); if (b > 0.85) { pset(132, 28, C.blanco); pset(128, 33, C.blanco); pset(136, 33, C.blanco); } }
  e_lucesAbeto(R, t, 132, 36, 114, 30, 34, 0);
  // la repisa: guirnalda de acebo, velas, reloj; los calcetines que se mecen
  for (let x = 194; x <= 272; x++) { const y = 66 + Math.round(Math.abs(Math.sin((x - 194) / 78 * Math.PI * 3)) * 3); pset(x, y, EC.abetoS); pset(x, y - 1, EC.abeto); if (x % 3 === 0) pset(x, y + 1, EC.abetoL); if (x % 13 === 5) { pset(x, y, hex('#e02030')); pset(x + 1, y + 1, hex('#e02030')); } }
  for (const [x, k] of [[200, 0], [266, 1]]) { rect(x - 1, 52, x + 1, 59, hex('#f4ecd8')); pset(x + 1, 53, hex('#c8bca0')); rect(x - 2, 59, x + 2, 59, C.oroN); e_llama(R, x, 50, t, k, true); }
  { disco(233, 54, 5, C.k); disco(233, 54, 4, hex('#f4ecd8')); pset(233, 50, C.k); const a = t * 0.2; linea(233, 54, Math.round(233 + Math.cos(a) * 3), Math.round(54 + Math.sin(a) * 3), C.k); pset(233, 52, C.k); rect(228, 58, 238, 59, EC.madS); }
  [[203, C.rojoN ?? EC.terc, 'r'], [219, EC.abeto, 'l'], [235, hex('#2a5aa8'), 'r'], [251, hex('#e8e0c8'), 'r']].forEach(([x, c, p], i) => { const s = Math.round(Math.sin(t * 1.3 + i * 1.1) * 0.7);
    pset(x + 4, 66, C.oroN); rect(x + s, 67, x + 8 + s, 70, hex('#f6f2ea')); rect(x + s, 70, x + 8 + s, 70, hex('#c8c4b8'));
    for (let y = 71; y <= 82; y++) { const xa = x + 1 + s + (y > 78 ? 0 : 0), xb = x + 7 + s + (y > 78 ? 4 : 0); for (let xx = xa; xx <= xb; xx++) pset(xx, y, p === 'r' ? (((y >> 1) & 1) && i !== 3 ? e_mez(c, C.blanco, 0.75) : c) : ((xx + y) % 4 === 0 ? hex('#e04050') : c)); }
    rect(x + 1 + s, 82, x + 11 + s, 83, e_mez(c, C.k, 0.3)); rect(x + 9 + s, 79, x + 11 + s, 83, C.blanco); rect(x + 1 + s, 81, x + 3 + s, 83, C.blanco); });
  // el fuego, las chispas y su luz que tiembla en el suelo y el hogar
  e_fuego(R, t, 222, 244, 110, 20);
  { const f = 0.5 + 0.25 * Math.sin(t * 7) + 0.2 * Math.sin(t * 13.1);
    for (let y = 119; y <= 150; y++) for (let x = 190; x <= 288; x++) { const d = Math.hypot((x - 233) / 56, (y - 118) / 22); if (d > 1) continue; if ((1 - d) * f > e_b4(x, y) + 0.25) { const c = R.pget(x, y); pset(x, y, e_mez(c, hex('#ffb060'), 0.28)); } } }
  // el gato que duerme en la alfombra, junto al hogar (respira y mueve la cola)
  { const x = 262, y = 131, r = Math.sin(t * 1.8) > 0 ? 1 : 0;
    for (let j = -4 - r; j <= 0; j++) for (let i = -7; i <= 7; i++) if ((i / 7.5) ** 2 + ((j + 2) / (4 + r)) ** 2 < 1) pset(x + i, y + j, j < -3 ? hex('#f0a050') : i < -3 ? hex('#a85a20') : (i + 9) % 4 === 0 ? hex('#b86a28') : hex('#d8803a'));
    disco(x + 6, y - 3, 3, hex('#d8803a')); pset(x + 5, y - 6, hex('#c86a28')); pset(x + 8, y - 6, hex('#c86a28')); pset(x + 5, y - 3, C.k); pset(x + 7, y - 3, C.k); pset(x + 6, y - 2, hex('#f0a0a0'));
    const c = Math.round(Math.sin(t * 0.9) * 2); linea(x - 7, y, x - 11, y - 1 + c, hex('#a85a20')); pset(x - 12, y - 2 + c, hex('#a85a20'));
    for (let i = -7; i <= 7; i++) if (h(i, 1, 761) < 0.6) pset(x + i, y + 1, e_mez(R.pget(x + i, y + 1), C.k, 0.3)); }
  // el globo terráqueo que gira en la mesita
  { const cx = 296, cy = 84, r = 8;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d2 = i * i + j * j; if (d2 > r * r) continue; const z = Math.sqrt(r * r - d2), lon = Math.atan2(i, z) + t * 0.6, lat = j / r;
      const tierra = e_ruido(lon * 2.2 + 10, lat * 3 + 5, 762) > 0.55; let c = tierra ? hex('#c8b070') : hex('#3a7ac8'); if (i > 3) c = e_mez(c, C.k, 0.3); if (i < -4 && j < -2) c = e_mez(c, C.blanco, 0.35); pset(cx + i, cy + j, c); }
    pset(cx - 3, cy - 4, C.blanco); }
  return { suelo: 146, sueloDelante: 172, plato: [150, 154], mesa: [108, 218, 152], ventana: [21, 31, 75, 83], arbol: [132, 36, 128], chimenea: [214, 82, 252, 116], fuego: [233, 104], globo: [296, 84], sofa: [0, 70, 128], gato: [262, 131] };
}

// delante en el salón (general): el sofá de terciopelo (visto de espaldas) con su manta, y la mesita baja con el plato, la
// taza que humea y el centro de acebo con su vela
function e_sofaMesita(R, t, o) {
  const { rect, pset, disco, linea } = R;
  // el sofá (izquierda), con el respaldo capitoné, el brazo enrollado y la manta de cuadros caída
  for (let y = 130; y <= 179; y++) for (let x = 0; x <= 66; x++) { const top = 130 + Math.round(Math.max(0, x - 46) * 0.0 + (x > 54 ? (x - 54) * 0.6 : 0)); if (y < top) continue;
    let c = EC.terc; const u = (y - top); if (u < 3) c = EC.tercL; else if (u < 5) c = EC.terc; else c = (x + y) % 9 === 0 ? EC.tercS : EC.terc;
    if (x > 56) c = u < 3 ? EC.tercL : EC.tercS; if (x === 66 || (y === top)) c = C.k; pset(x, y, c); }
  for (let y = 142; y < 176; y += 11) for (let x = 6 + ((y / 11) & 1) * 6; x < 52; x += 12) { pset(x, y, EC.tercS); pset(x - 1, y - 1, EC.tercS); pset(x + 1, y + 1, EC.tercL); pset(x - 2, y - 2, EC.tercS); pset(x + 2, y + 2, EC.tercS); }
  disco(60, 140, 6, C.k); disco(60, 140, 5, EC.terc); disco(59, 139, 3, EC.tercL); pset(58, 137, hex('#d06070'));
  for (let y = 130; y <= 162; y++) for (let x = 14; x <= 40; x++) { const caida = 130 + (x - 14) * 0.15; if (y < caida) continue; const zz = ((Math.floor((x - 14) / 4) + Math.floor((y - 130) / 4)) & 1); let c = zz ? hex('#f0e8d8') : hex('#c83a3a'); if ((x - 14) % 4 === 0 || (y - 130) % 4 === 0) c = e_mez(c, C.k, 0.2); if (y === 162 || x === 14 || x === 40) c = e_mez(c, C.k, 0.45); pset(x, y + Math.round(Math.sin(x * 0.5) * 0.8), c); }
  for (let x = 15; x < 40; x += 2) pset(x, 164, hex('#f0e8d8'));
  // la mesita: tablero de nogal con vetas, canto, faldón y patas torneadas
  rect(108, 151, 218, 160, C.k); rect(109, 152, 217, 159, EC.mad); for (let g = 0; g < 5; g++) { const y = 153 + g * 1.4 | 0; for (let x = 110; x < 216; x++) if (h(x >> 3, g, 765) < 0.6 && ((x + g * 5) % 11) < 7) pset(x, y, g % 2 ? EC.madS : EC.madL); }
  rect(109, 152, 217, 152, EC.madL); rect(108, 160, 218, 163, EC.madS); rect(108, 163, 218, 163, C.k); rect(112, 164, 214, 167, EC.madD);
  for (const x of [112, 210]) { rect(x, 164, x + 4, 179, C.k); rect(x + 1, 164, x + 3, 179, EC.madS); rect(x + 1, 164, x + 1, 179, EC.madL); rect(x, 170, x + 4, 171, EC.madL); }
  // el plato con las galletas lisas (la de los ojos la pone la escena)
  for (let j = -3; j <= 3; j++) for (let i = -13; i <= 13; i++) { const d = (i / 13) ** 2 + (j / 3.4) ** 2; if (d < 1) pset(150 + i, 155 + j, d > 0.7 ? hex('#3a7a4a') : d > 0.55 ? C.blanco : hex('#e8e4dc')); }
  const n = o.galletas ?? 2; for (let k = 0; k < n; k++) { const x = 142 + k * 7, y = 154; disco(x, y, 2, C.jengibreS); disco(x, y - 0.5, 2, C.jengibre); pset(x - 1, y - 1, C.glaseado); pset(x + 1, y, C.glaseado); }
  // la taza de chocolate que humea
  rect(186, 149, 192, 156, C.k); rect(187, 150, 191, 155, hex('#c83a3a')); rect(187, 150, 191, 150, hex('#5a3020')); rect(192, 151, 194, 154, C.k); pset(193, 152, hex('#c83a3a')); pset(193, 153, hex('#c83a3a'));
  e_humo(R, 189, 147, t, 0, hex('#d8d0c8'), 12);
  // el centro de mesa: corona de acebo con la vela
  for (let a = 0; a < 18; a++) { const an = a / 18 * Math.PI * 2, x = Math.round(172 + Math.cos(an) * 6), y = Math.round(155 + Math.sin(an) * 2); pset(x, y, a % 2 ? EC.abeto : EC.abetoL); if (a % 5 === 0) pset(x, y - 1, hex('#e02030')); }
  rect(171, 147, 173, 154, hex('#f4ecd8')); pset(173, 148, hex('#c8bca0')); e_llama(R, 172, 145, t, 3, true);
}

function e_salonMesa(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R;
  e_capa(R, 'salonMesa', () => {
    e_papel(R, 0, 0, 319, 70, 2);
    rect(0, 70, 319, 73, EC.madL); rect(0, 73, 319, 73, EC.madS); rect(0, 74, 319, 100, EC.mad);
    for (let x = -10; x < 320; x += 62) { rect(x + 4, 78, x + 56, 96, EC.madS); rect(x + 5, 79, x + 55, 95, EC.mad); rect(x + 5, 79, x + 55, 79, EC.madD); rect(x + 5, 95, x + 55, 95, EC.madL); for (let g = 0; g < 3; g++) rect(x + 10 + g * 9, 83 + g * 4, x + 30 + g * 7, 83 + g * 4, EC.madS); }
    rect(0, 100, 319, 104, EC.madD); rect(0, 100, 319, 100, EC.madL);
    e_tablas(R, 105, 125, 270, 20);
    // la ventana grande en medio, con la calle nevada (el hueco: x 128–196, y 10–60)
    e_degr(R, 128, 10, 196, 60, [EC.cielN0, EC.cielN1, EC.cielN2, EC.cielN3]);
    for (let k = 0; k < 16; k++) pset(128 + Math.round(h(k, 1, 770) * 68), 10 + Math.round(h(k, 2, 770) * 18), k % 3 ? hex('#8a94c8') : hex('#e8ecff'));
    for (const [x0, x1, yt] of [[124, 150, 34], [148, 176, 30], [174, 200, 36]]) { const mx = (x0 + x1) >> 1; poligono([[x0 - 3, yt + 7], [mx, yt - 4], [x1 + 3, yt + 7]], EC.nv); rect(x0, yt + 7, x1, 56, hex('#3a3448')); for (let x = x0 + 3; x < x1 - 4; x += 8) { rect(x, yt + 11, x + 4, yt + 16, h(x, 3, 771) < 0.7 ? EC.luzV : hex('#24243a')); rect(x, yt + 15, x + 4, yt + 16, EC.luzVS); } }
    rect(128, 54, 196, 60, EC.nv);
    for (let y = 10; y <= 60; y++) for (let x = 128; x <= 196; x++) { const d = Math.min(x - 128, 196 - x, (y - 10) * 1.5, (60 - y) * 1.5); if (d < 6 && e_b4(x, y) < (6 - d) / 7) pset(x, y, hex('#d8e4f4')); }
    rect(124, 6, 200, 9, hex('#e8e2d4')); rect(124, 6, 127, 64, hex('#e8e2d4')); rect(197, 6, 200, 64, hex('#c8c0b0')); rect(161, 10, 163, 60, hex('#e8e2d4')); rect(128, 34, 196, 36, hex('#e8e2d4')); rect(120, 61, 204, 66, hex('#f0eadc')); rect(120, 66, 204, 67, hex('#a89c88'));
    // la guirnalda con lazo sobre la ventana
    for (let x = 122; x <= 202; x++) { const y = 6 + Math.round(Math.abs(Math.sin((x - 122) / 80 * Math.PI * 2)) * 5); pset(x, y, EC.abeto); pset(x, y + 1, EC.abetoS); if (x % 4 === 0) pset(x, y - 1, EC.abetoL); if (x % 11 === 3) pset(x, y + 1, hex('#e02030')); }
    disco(162, 7, 3, hex('#c02030')); disco(158, 6, 2, hex('#e04050')); disco(166, 6, 2, hex('#e04050')); linea(161, 9, 158, 15, hex('#c02030')); linea(163, 9, 166, 15, hex('#c02030'));
    // el abeto grande a la izquierda, con regalos al pie
    e_abeto(R, 52, -10, 100, 58, 3); e_adornosAbeto(R, 52, -10, 100, 58, 14, 3, 3);
    e_regalo(R, 70, 104, 26, 18, EC.terc, EC.tercS, C.oroN); e_regalo(R, 96, 106, 18, 12, hex('#2a5aa8'), hex('#1a3a78'), C.blanco); e_regalo(R, 10, 106, 30, 16, hex('#e8e0c8'), hex('#b8ac90'), hex('#c02030'));
    // la chimenea a la derecha: ladrillo, repisa, boca y troncos
    for (let y = 50; y <= 104; y++) for (let x = 226; x <= 319; x++) { const fila = Math.floor((y - 50) / 6), lx = (x - 226 + (fila & 1) * 8) % 16; let c; if ((y - 50) % 6 === 5 || lx === 15) c = EC.mortero; else { const n = h(Math.floor((x - 226 + (fila & 1) * 8) / 16), fila, 772); c = n < 0.25 ? EC.ladS : n > 0.85 ? EC.ladL : EC.lad; if ((y - 50) % 6 === 0) c = e_mez(c, C.blanco, 0.15); } pset(x, y, c); }
    rect(246, 68, 312, 104, C.k); rect(248, 70, 310, 104, hex('#1a1210')); for (let y = 72; y < 102; y += 6) for (let x = 250; x < 308; x += 12) rect(x + ((y / 6) & 1) * 6, y, x + 7 + ((y / 6) & 1) * 6, y, hex('#2a1c16'));
    rect(220, 44, 319, 50, EC.madD); rect(220, 44, 319, 45, EC.madL); rect(222, 50, 319, 51, EC.madS);
    rect(258, 96, 300, 99, hex('#2a2a2e')); for (const [x0, y0, x1, y1] of [[256, 95, 302, 91], [262, 90, 296, 95]]) for (let d = -2; d <= 2; d++) linea(x0, y0 + d, x1, y1 + d, d < -1 ? hex('#7a5232') : d > 1 ? hex('#3a2414') : hex('#5a3a22'));
    rect(220, 104, 319, 108, EC.piedra); rect(220, 104, 319, 104, EC.piedraL);
  });
  R.recorte([128, 10, 196, 60]); e_copos(R, t, 128, 10, 196, 60, 34, 4, C.blanco, hex('#a8b4d8'), 10, 3);
  { const u = (t / 14) % 1, x = Math.round(206 - u * 90), y = 56, a = Math.floor(t * 4) % 2; for (let j = 0; j < 8; j++) R.linea(x, y - 8 + j, x + 3, y - 8 + j, j < 3 ? hex('#7a2a2a') : hex('#2a3a5a')); disco(x + 1, y - 10, 1, hex('#e8b890')); pset(x + a, y, C.k); pset(x + 3 - a, y, C.k); R.linea(x + 5, y - 1, x + 12, y - 1, hex('#6a4a2a')); R.linea(x + 5, y, x + 12, y, hex('#3a2a1a')); }
  R.recorte(null);
  e_lucesAbeto(R, t, 52, -10, 100, 58, 26, 3, true);
  for (let x = 220; x <= 319; x++) { const y = 51 + Math.round(Math.abs(Math.sin((x - 220) / 100 * Math.PI * 2.5)) * 4); pset(x, y, EC.abeto); pset(x, y + 1, EC.abetoS); if (x % 3 === 0) pset(x, y - 1, EC.abetoL); if (x % 9 === 4) { pset(x, y + 1, hex('#e02030')); pset(x + 1, y + 2, hex('#e02030')); } }
  { rect(230, 32, 233, 43, hex('#f4ecd8')); rect(229, 43, 234, 43, C.oroN); e_llama(R, 231, 30, t, 4, true); }
  [[244, C.rojoN ?? EC.terc], [268, EC.abeto], [292, hex('#e8e0c8')]].forEach(([x, c], i) => { const s = Math.round(Math.sin(t * 1.2 + i) * 1);
    rect(x + s, 54, x + 12 + s, 59, C.blanco); rect(x + s, 59, x + 12 + s, 59, hex('#c8c4b8'));
    for (let y = 60; y <= 76; y++) for (let xx = x + 1 + s; xx <= x + 11 + s + (y > 70 ? 5 : 0); xx++) pset(xx, y, ((y >> 1) & 1) && i === 2 ? hex('#c83a3a') : (xx + y) % 5 === 0 ? e_mez(c, C.blanco, 0.4) : c);
    rect(x + 13 + s, 72, x + 17 + s, 76, C.blanco); });
  e_fuego(R, t, 258, 300, 92, 22);
  { const f = 0.5 + 0.3 * Math.sin(t * 7) + 0.2 * Math.sin(t * 12.7); for (let y = 105; y <= 125; y++) for (let x = 190; x <= 319; x++) { const d = Math.hypot((x - 279) / 80, (y - 104) / 18); if (d < 1 && (1 - d) * f > e_b4(x, y) + 0.2) pset(x, y, e_mez(R.pget(x, y), hex('#ffb060'), 0.3)); } }
  return { suelo: 121, zonaLibre: [104, 220], plato: [160, 146], album: [92, 124, 228, 170], pistas: { traje: [48, 140], calendario: [96, 138], abeto: [226, 140], partitura: [270, 142] }, ventana: [128, 10, 196, 60], fuego: [279, 90] };
}

// la estampa de una de las siete escenas del viaje, de 24 × 16, en (x, y)
function e_estampa(R, x, y, k, t) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(x - 1, y - 1, x + 24, y + 16, hex('#f8f4ec')); rect(x, y, x + 23, y + 15, hex('#a8c4e0'));
  if (k === 0) { rect(x, y + 12, x + 23, y + 15, EC.nv); for (const [a, w] of [[2, 9], [13, 9]]) { rect(x + a, y + 5, x + a + w, y + 12, EC.yeso ?? hex('#e4d8bc')); rect(x + a, y + 5, x + a, y + 12, hex('#4a2e1c')); rect(x + a + w, y + 5, x + a + w, y + 12, hex('#4a2e1c')); linea(x + a, y + 8, x + a + w, y + 8, hex('#4a2e1c')); linea(x + a, y + 5, x + a + w, y + 12, hex('#4a2e1c')); poligono([[x + a - 1, y + 5], [x + a + (w >> 1), y + 1], [x + a + w + 1, y + 5]], hex('#5a3a2a')); } }
  else if (k === 1) { rect(x, y, x + 23, y + 15, EC.cielN1); disco(x + 18, y + 4, 3, hex('#fff2c0')); disco(x + 19, y + 3, 2, EC.cielN1); for (let i = 0; i < 6; i++) pset(x + 3 + Math.round(h(i, 1, 780) * 18), y + 1 + Math.round(h(i, 2, 780) * 12), C.blanco); rect(x + 4, y + 10, x + 10, y + 11, hex('#c02030')); linea(x + 3, y + 12, x + 11, y + 12, C.oroN); for (let i = 0; i < 3; i++) { rect(x + 12 + i * 3, y + 8 - i, x + 13 + i * 3, y + 9 - i, hex('#8a5a2a')); pset(x + 13 + i * 3, y + 7 - i, hex('#5a3a1a')); } }
  else if (k === 2) { rect(x, y, x + 23, y + 15, hex('#4a1e4a')); const cx = x + 11, cy = y + 7; rect(cx, cy - 5, cx + 1, cy + 6, C.oroN); disco(cx + 2, cy - 3, 2, C.oroN); disco(cx + 2, cy - 3, 1, hex('#4a1e4a')); linea(cx - 5, cy - 3, cx + 6, cy + 5, C.oroN); linea(cx + 6, cy - 3, cx - 5, cy + 5, C.oroN); pset(cx - 1, cy - 5, hex('#fff2b0')); }
  else if (k === 3) { rect(x, y + 12, x + 23, y + 15, EC.nv); rect(x + 6, y + 6, x + 16, y + 9, hex('#d8a84a')); rect(x + 6, y + 9, x + 16, y + 9, hex('#a87a2a')); for (const dx of [7, 9, 13, 15]) rect(x + dx, y + 10, x + dx, y + 12, hex('#c8983a')); rect(x + 15, y + 2, x + 18, y + 6, hex('#d8a84a')); pset(x + 14, y + 1, hex('#a87a2a')); pset(x + 19, y + 1, hex('#a87a2a')); pset(x + 17, y + 3, C.k); rect(x + 6, y + 7, x + 16, y + 7, hex('#c02030')); }
  else if (k === 4) { rect(x, y, x + 23, y + 15, hex('#c84a2a')); rect(x, y + 12, x + 23, y + 15, EC.nv); disco(x + 12, y + 8, 5, hex('#3a2418')); poligono([[x + 7, y + 6], [x + 4, y], [x + 9, y + 4]], hex('#e8dcc0')); poligono([[x + 17, y + 6], [x + 20, y], [x + 15, y + 4]], hex('#e8dcc0')); pset(x + 10, y + 8, hex('#ffd040')); pset(x + 14, y + 8, hex('#ffd040')); rect(x + 11, y + 11, x + 13, y + 13, hex('#e04060')); }
  else if (k === 5) { rect(x, y, x + 23, y + 15, EC.cielN2); rect(x + 4, y + 5, x + 19, y + 15, hex('#d8a878')); rect(x + 9, y + 9, x + 14, y + 15, hex('#5a3a22')); poligono([[x + 3, y + 5], [x + 12, y + 1], [x + 20, y + 5]], hex('#b85a3a')); for (const dx of [2, 21]) { rect(x + dx, y + 12, x + dx + 1, y + 14, hex('#f0d080')); pset(x + dx, y + 11, hex('#fff6c0')); } }
  else { rect(x, y + 10, x + 23, y + 15, EC.nv); for (let i = 0; i < 6; i++) { rect(x + 1 + i * 4, y + 9, x + 4 + i * 4, y + 11, EC.sacos); pset(x + 1 + i * 4, y + 9, EC.sacosL); } poligono([[x + 9, y + 9], [x + 12, y + 1], [x + 15, y + 9]], EC.abeto); for (const [dx, dy] of [[11, 3], [13, 6], [10, 7]]) pset(x + dx, y + dy, Math.sin(t * 6 + dx) > 0 ? hex('#fff2b0') : C.oroN); }
  pset(x - 1, y - 1, hex('#c8c0b0')); pset(x + 24, y - 1, hex('#c8c0b0'));
  for (const [cx, cy] of [[x - 1, y - 1], [x + 22, y - 1], [x - 1, y + 14], [x + 22, y + 14]]) { pset(cx, cy, C.k); pset(cx + 1, cy, C.k); pset(cx, cy + 1, C.k); }
}

// delante en la mesa de cerca: el tablero con el camino de mesa, el plato, la taza, las pistas con su «?» y el álbum
function e_tablero(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R, al = Math.max(0, Math.min(1, o.album ?? 0)), pistas = o.pistas ?? al === 0;
  // el tablero visto un poco desde arriba: tablas largas con vetas, luz del fuego por la derecha
  for (let y = 122; y <= 179; y++) for (let x = 0; x < 320; x++) { let c; if (y === 122) c = C.k; else if (y < 166) { const tb = Math.floor((y - 123) / 11), n = h(Math.floor((x + tb * 37) / 60), tb, 790);
      c = n < 0.3 ? EC.madS : EC.mad; const v = e_ruido(x * 0.06 + tb * 7, (y - 123) * 0.5, 791); if (v > 0.68) c = EC.madL; else if (v < 0.26) c = EC.madS; if ((y - 123) % 11 === 10) c = EC.madD; if (y === 123) c = EC.madL;
      if (x > 220 && (x - 220) / 100 * 0.6 > e_b4(x, y) + 0.2) c = e_mez(c, hex('#ffb060'), 0.18); }
    else if (y < 172) c = y === 166 ? EC.madL : EC.madS; else c = y === 172 ? C.k : EC.madD; pset(x, y, c); }
  // el camino de mesa rojo con su cenefa dorada y ramitas de acebo bordadas
  for (let y = 132; y <= 156; y++) for (let x = 0; x < 320; x++) { const borde = y < 134 || y > 154; let c = borde ? C.oroN : (x + y) % 2 ? C.rojoN ?? EC.terc : EC.terc; if (y === 132 || y === 156) c = C.oroNS; if (!borde && (x % 40 === 20 || x % 40 === 21) && Math.abs(y - 144) < 4) c = EC.abeto; pset(x, y, c); }
  // el plato con galletas (estrellas y redondas) y la taza que humea
  const px = al > 0 ? 270 : 160, py = 146;
  for (let j = -7; j <= 8; j++) for (let i = -28; i <= 28; i++) { const d = (i / 28) ** 2 + (j / 7.5) ** 2; if (d < 1) pset(px + i, py + j, j > 6 && d > 0.8 ? e_mez(EC.madS, C.k, 0.4) : d > 0.86 ? hex('#3a7a4a') : d > 0.76 ? C.blanco : hex('#ece8e0')); }
  for (const [dx, dy, k] of [[-14, -1, 0], [10, 1, 1], [-2, 3, 2]]) { const x = px + dx, y = py + dy;
    if (k === 1) { poligono([[x - 5, y + 1], [x, y - 5], [x + 5, y + 1], [x + 3, y + 5], [x - 3, y + 5]], C.jengibreS); poligono([[x - 4, y + 1], [x, y - 4], [x + 4, y + 1], [x + 2, y + 4], [x - 2, y + 4]], C.jengibre); pset(x, y - 2, C.glaseado); pset(x - 2, y + 1, C.glaseado); pset(x + 2, y + 1, C.glaseado); }
    else { disco(x, y + 1, 5, C.jengibreS); disco(x, y, 5, C.jengibre); for (let a = 0; a < 10; a++) pset(Math.round(x + Math.cos(a * 0.63) * 3), Math.round(y + Math.sin(a * 0.63) * 3), C.glaseado); pset(x, y, hex('#e02030')); } }
  { const mx = al > 0 ? 220 : 300, my = 150; rect(mx - 6, my - 12, mx + 6, my + 2, C.k); rect(mx - 5, my - 11, mx + 5, my + 1, hex('#c83a3a')); rect(mx - 5, my - 11, mx - 4, my + 1, hex('#e86060')); rect(mx - 5, my - 11, mx + 5, my - 10, hex('#5a3020')); rect(mx + 6, my - 9, mx + 9, my - 2, C.k); rect(mx + 7, my - 8, mx + 8, my - 3, hex('#c83a3a')); for (let i = -4; i <= 4; i += 2) pset(mx + i, my - 5, C.blanco); e_humo(R, mx, my - 13, t, 2, hex('#e0d8d0'), 18); }
  // las cuatro pistas, cada una con su «?» que flota
  if (pistas) {
    const q = (x, y, k) => R.icono('?', x - 2, Math.round(y + Math.sin(t * 2.2 + k * 1.3) * 2), hex('#fff2b0'), C.k, 2);
    // el traje rojo de Santa, doblado, con el ribete blanco y el cinturón
    { const x = 48, y = 142; rect(x - 18, y - 8, x + 18, y + 8, C.k); rect(x - 17, y - 7, x + 17, y + 7, hex('#d23a3a')); rect(x - 17, y - 7, x + 17, y - 6, hex('#f06060')); rect(x + 10, y - 7, x + 17, y + 7, hex('#a02828')); rect(x - 17, y + 4, x + 17, y + 7, C.blanco); rect(x - 2, y - 7, x + 2, y + 7, C.blanco); for (let i = -17; i <= 17; i += 3) pset(x + i, y + 5, hex('#d8d8e0')); rect(x - 17, y - 1, x + 17, y + 1, C.k); rect(x - 3, y - 2, x + 3, y + 2, C.oroN); rect(x - 1, y - 1, x + 1, y + 1, C.k); q(x, y - 26, 0); }
    // la hoja del calendario con el 25
    { const x = 96, y = 140; rect(x - 13, y - 16, x + 13, y + 12, C.k); rect(x - 12, y - 15, x + 12, y + 11, hex('#f8f4ec')); rect(x - 12, y - 15, x + 12, y - 9, hex('#c02030')); for (const dx of [-7, 7]) rect(x + dx, y - 18, x + dx + 1, y - 13, hex('#8a8a9a')); e_cifras(R, '25', x - 7, y - 6, C.k, 2); rect(x - 12, y + 9, x + 12, y + 11, hex('#d8d0c0')); pset(x + 12, y + 11, hex('#a8a090')); q(x, y - 34, 1); }
    // el abeto diminuto en su maceta
    { const x = 226, y = 146; rect(x - 6, y - 2, x + 6, y + 6, C.k); rect(x - 5, y - 1, x + 5, y + 5, hex('#c86a3a')); rect(x - 5, y - 1, x + 5, y, hex('#e8904a')); e_abeto(R, x, y - 26, y - 2, 11, 5); pset(x, y - 27, C.oroN); pset(x - 1, y - 26, C.oroN); pset(x + 1, y - 26, C.oroN); e_lucesAbeto(R, t, x, y - 26, y - 2, 11, 7, 5); q(x, y - 40, 2); }
    // la partitura con las notas
    if (al === 0) { const x = 266, y = 144; poligono([[x - 14, y - 10], [x + 14, y - 12], [x + 15, y + 9], [x - 13, y + 10]], C.k); poligono([[x - 13, y - 9], [x + 13, y - 11], [x + 14, y + 8], [x - 12, y + 9]], hex('#f4eedc')); for (let k = 0; k < 5; k++) linea(x - 11, y - 6 + k * 3, x + 12, y - 8 + k * 3, hex('#8a8070'));
      for (const [dx, dy] of [[-7, 2], [-1, -1], [5, 1], [10, -3]]) { disco(x + dx, y + dy, 1, C.k); R.rect(x + dx + 1, y + dy - 5, x + dx + 1, y + dy, C.k); } pset(x - 6, y - 3, C.k); q(x, y - 30, 3); }
  }
  // el álbum: tapas verdes con esquinas doradas que se abren; dentro, las siete estampas del viaje
  if (al > 0) {
    const cx = 160, y0 = 126, y1 = 168, wd = Math.round(64 * Math.min(1, al * 1.4)), abierto = al > 0.7;
    rect(cx - 66, y0 + 2, cx + 66, y1 + 3, e_mez(EC.madS, C.k, 0.5));
    rect(cx, y0, cx + 64, y1, C.k); rect(cx + 1, y0 + 1, cx + 63, y1 - 1, abierto ? hex('#f4eedc') : hex('#2a5a3a'));
    if (al < 1) { rect(cx - wd, y0 - Math.round(Math.sin(al * Math.PI) * 6), cx, y1, C.k); rect(cx - wd + 1, y0 + 1 - Math.round(Math.sin(al * Math.PI) * 6), cx - 1, y1 - 1, al < 0.6 ? hex('#2a5a3a') : hex('#f4eedc')); }
    else { rect(cx - 64, y0, cx, y1, C.k); rect(cx - 63, y0 + 1, cx - 1, y1 - 1, hex('#f4eedc')); for (let y = y0 + 1; y < y1; y++) pset(cx - 1, y, hex('#c8c0a8')); }
    if (!abierto) { for (const [x, y] of [[cx + 60, y0 + 1], [cx + 60, y1 - 4]]) rect(x, y, x + 3, y + 3, C.oroN); disco(cx + 32, (y0 + y1) >> 1, 7, C.oroN); disco(cx + 32, (y0 + y1) >> 1, 5, hex('#2a5a3a')); pset(cx + 32, ((y0 + y1) >> 1) - 2, C.oroN); }
    if (al >= 1) { const P = [[cx - 60, y0 + 4], [cx - 30, y0 + 4], [cx - 60, y0 + 23], [cx - 30, y0 + 23], [cx + 5, y0 + 4], [cx + 35, y0 + 4], [cx + 20, y0 + 23]]; P.forEach(([x, y], k) => e_estampa(R, x, y, k, t)); for (let x = cx - 62; x < cx + 62; x += 2) pset(x, y1 + 1, hex('#e8e0c8')); }
  }
}

// un trineo de carreras con su caballo al trote, los cascabeles que brillan y la nieve que salta; x: la punta del caballo
// (dir 1, hacia la derecha), suelo: donde pisan los cascos; o.color de la caja, o.cochero false: sin cochero
export function e_trineo(R, x, suelo, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, d = o.dir ?? 1, X = (i) => Math.round(x - i * d), c = o.color ?? hex('#c0302a'), cS = e_mez(c, C.k, 0.4), cab = o.caballo ?? hex('#6a3e22'), cabS = e_mez(cab, C.k, 0.35), g = Math.floor(t * 9 + x * 0.1) % 2;
  // la nieve que levantan los patines
  for (let i = 0; i < 8; i++) { const u = ((t * 2.2 + i / 8) % 1); pset(X(40 + u * 14 + h(i, 1, 800) * 4), Math.round(suelo - 1 - Math.sin(u * Math.PI) * 4 - h(i, 2, 800) * 2), u < 0.6 ? C.blanco : EC.nvS); }
  // el caballo: cuerpo, cuello, cabeza con crin y penacho, patas que trotan y la cola
  const yb = suelo - 13;
  for (let j = 0; j < 7; j++) linea(X(3), yb + j, X(17), yb + j, j < 2 ? e_mez(cab, C.blanco, 0.2) : j > 4 ? cabS : cab);
  poligono([[X(2), yb + 1], [X(-2), yb - 7], [X(1), yb - 9], [X(5), yb + 2]].map(([a, b]) => [a, b]), cab);
  rect(Math.min(X(-1), X(-6)), yb - 9, Math.max(X(-1), X(-6)), yb - 6, cab); pset(X(-6), yb - 6, cabS); pset(X(-2), yb - 8, C.k); pset(X(0), yb - 11, cab); pset(X(1), yb - 11, cab);
  for (let j = 0; j < 7; j++) pset(X(3 + j * 0.3), yb - 7 + j, hex('#2a1810')); disco(X(1), yb - 12, 1, hex('#e02030'));
  const pat = g ? [[4, -2], [6, 2], [14, 2], [16, -2]] : [[4, 2], [6, -2], [14, -2], [16, 2]];
  for (const [px, dx] of pat) { linea(X(px), yb + 6, X(px + dx * 0.6), suelo - 1, cabS); pset(X(px + dx * 0.6), suelo, C.k); }
  linea(X(17), yb + 1, X(21), yb + 5 + g, hex('#2a1810')); linea(X(18), yb + 1, X(22), yb + 4 + g, hex('#2a1810'));
  // los arreos con los cascabeles
  linea(X(3), yb + 2, X(17), yb + 2, hex('#8a1a14')); for (let i = 4; i <= 16; i += 3) { const br = Math.sin(t * 14 + i) > 0.3; pset(X(i), yb + 3, br ? hex('#fff6c0') : C.oroN); }
  // las varas y el trineo (caja curva, el respaldo, los patines que se enroscan delante)
  linea(X(12), yb + 3, X(26), suelo - 7, hex('#3a2414'));
  const bx = 26; poligono([[X(bx), suelo - 4], [X(bx), suelo - 10], [X(bx + 6), suelo - 8], [X(bx + 14), suelo - 9], [X(bx + 18), suelo - 15], [X(bx + 20), suelo - 15], [X(bx + 19), suelo - 4]], C.k);
  poligono([[X(bx + 1), suelo - 5], [X(bx + 1), suelo - 9], [X(bx + 6), suelo - 7], [X(bx + 14), suelo - 8], [X(bx + 18), suelo - 14], [X(bx + 18), suelo - 5]], c);
  linea(X(bx + 2), suelo - 6, X(bx + 17), suelo - 6, C.oroN); linea(X(bx + 1), suelo - 9, X(bx + 6), suelo - 7, e_mez(c, C.blanco, 0.35)); rect(Math.min(X(bx + 15), X(bx + 18)), suelo - 13, Math.max(X(bx + 15), X(bx + 18)), suelo - 6, cS);
  linea(X(bx - 3), suelo - 1, X(bx + 21), suelo - 1, hex('#2a2a2e')); pset(X(bx - 4), suelo - 2, hex('#2a2a2e')); pset(X(bx - 4), suelo - 3, hex('#2a2a2e')); pset(X(bx - 3), suelo - 4, hex('#2a2a2e')); for (const s of [bx + 3, bx + 15]) linea(X(s), suelo - 4, X(s), suelo - 1, hex('#2a2a2e'));
  // el cochero (pequeño, de fondo): abrigo, bufanda al viento, chistera; las riendas
  if (o.cochero !== false) { const cx = X(bx + 10), ab = o.abrigo ?? hex('#2a3a5a'); rect(cx - 2, suelo - 15, cx + 2, suelo - 8, ab); disco(cx, suelo - 17, 2, hex('#e8b890')); rect(cx - 2, suelo - 21, cx + 2, suelo - 19, hex('#1c1c22')); rect(cx - 3, suelo - 19, cx + 3, suelo - 19, hex('#1c1c22'));
    const b = Math.floor(t * 6) % 2; linea(cx - 2 * d, suelo - 15, cx + (-5 - b) * d * -1 * -1, suelo - 14 - b, hex('#e04040')); linea(cx + 2 * d, suelo - 12, X(4), yb + 1, hex('#4a2a14')); }
}

function e_trineos(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R;
  e_capa(R, 'trineos', () => {
    e_degr(R, 0, 0, 319, 84, [EC.inv0, EC.inv1, EC.inv2, EC.inv3]);
    // las colinas lejanas con pinares y las de delante, nevadas
    for (let x = 0; x < 320; x++) { const y1 = Math.round(64 + 6 * Math.sin(x * 0.021 + 1) + 3 * Math.sin(x * 0.063)), y2 = Math.round(80 + 5 * Math.sin(x * 0.03 + 3) + 2 * Math.sin(x * 0.11));
      for (let y = y1; y <= 100; y++) pset(x, y, y < y1 + 2 ? hex('#d8e4f2') : h(x >> 1, y >> 1, 801) < 0.25 + (y - y1) * 0.02 ? EC.colinaS : EC.colina);
      for (let y = y2; y <= 104; y++) pset(x, y, y === y2 ? EC.nvL : (x + y) % 7 === 0 ? EC.nvS : EC.nv); }
    for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 802) * 320), base = Math.round(70 + 6 * Math.sin(x * 0.021 + 1) + 3 * Math.sin(x * 0.063)) + 6, s = 2 + Math.round(h(k, 2, 802) * 2); if (x > 270 && base < 50) continue; poligono([[x - s, base], [x, base - s * 2 - 1], [x + s, base]], EC.colinaS); }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 3, 802) * 320), base = Math.round(86 + 5 * Math.sin(x * 0.03 + 3) + 2 * Math.sin(x * 0.11)) + 2, s = 3 + Math.round(h(k, 4, 802) * 3); if (x > 40 && x < 108) continue;
      poligono([[x - s, base], [x, base - s * 3], [x + s, base]], EC.pino); poligono([[x, base], [x, base - s * 3], [x + s, base]], EC.pinoS); for (let j = 1; j < 3; j++) linea(x - s + j, base - j * s, x + s - j, base - j * s, EC.nvS); rect(x, base, x, base + 1, EC.madD); }
    // el granero rojo (techo de mansarda nevado, tablas, la cruz blanca de las puertas)
    { const x0 = 50, x1 = 98, yt = 72, yb = 100; rect(x0, yt, x1, yb, EC.granero); for (let x = x0 + 2; x < x1; x += 3) rect(x, yt, x, yb, EC.granS); rect(x1 - 6, yt, x1, yb, EC.granS);
      poligono([[x0 - 3, yt + 1], [x0 + 6, yt - 10], [x1 - 6, yt - 10], [x1 + 3, yt + 1]], EC.nv); poligono([[x0 + 6, yt - 10], [x0 + 14, yt - 16], [x1 - 14, yt - 16], [x1 - 6, yt - 10]], EC.nvL); linea(x0 - 3, yt + 1, x1 + 3, yt + 1, EC.nvD);
      rect(66, 84, 82, 100, C.blanco); rect(67, 85, 81, 100, EC.granS); linea(67, 85, 81, 100, C.blanco); linea(81, 85, 67, 100, C.blanco); rect(74, 85, 74, 100, C.blanco); rect(70, 66, 78, 70, C.blanco); rect(71, 67, 77, 69, hex('#3a1a14')); for (let x = x0 - 2; x <= x1 + 2; x += 2) pset(x, yt + 2, hex('#c8e0f4')); }
    // la granja amarilla con su chimenea y las ventanas
    { const x0 = 118, x1 = 152, yt = 82, yb = 102; rect(x0, yt, x1, yb, hex('#e0c47a')); for (let y = yt + 2; y < yb; y += 2) rect(x0, y, x1, y, hex('#c4a860')); rect(x1 - 4, yt, x1, yb, hex('#b49650'));
      poligono([[x0 - 3, yt], [(x0 + x1) >> 1, yt - 12], [x1 + 3, yt]], EC.nv); linea(x0 - 3, yt, (x0 + x1) >> 1, yt - 12, EC.nvL); linea(x0 - 3, yt + 1, x1 + 3, yt + 1, EC.nvD); rect(144, 66, 148, 76, hex('#7a3a2a')); rect(143, 65, 149, 66, EC.nv);
      for (const x of [122, 134, 144]) { rect(x, 88, x + 5, 94, C.k); rect(x + 1, 89, x + 4, 93, EC.luzV); rect(x + 1, 91, x + 4, 91, hex('#8a6a3a')); } rect(128, 94, 132, 102, hex('#5a2e1a')); }
    // la iglesia blanca de tablas con su campanario
    { const x0 = 196, x1 = 236, yt = 70, yb = 102; rect(x0, yt, x1, yb, hex('#f2f0ea')); for (let y = yt + 2; y < yb; y += 2) rect(x0, y, x1, y, hex('#d4d0c8')); rect(x1 - 4, yt, x1, yb, hex('#bcb8b0'));
      poligono([[x0 - 3, yt + 1], [(x0 + x1) >> 1, yt - 10], [x1 + 3, yt + 1]], EC.nv); linea(x0 - 3, yt + 1, x1 + 3, yt + 1, EC.nvD);
      rect(210, 46, 222, 70, hex('#f2f0ea')); rect(219, 46, 222, 70, hex('#bcb8b0')); rect(212, 52, 219, 58, hex('#3a3a4a')); disco(215, 54, 2, C.oroN); rect(208, 44, 224, 46, hex('#d4d0c8')); poligono([[209, 44], [216, 22], [223, 44]], hex('#f2f0ea')); poligono([[216, 22], [223, 44], [218, 44]], hex('#bcb8b0')); rect(216, 18, 216, 22, hex('#3a3a4a')); rect(214, 19, 218, 19, hex('#3a3a4a'));
      for (const x of [200, 228]) { rect(x, 78, x + 4, 92, C.k); rect(x + 1, 79, x + 3, 91, hex('#7a8ab0')); disco(x + 2, 79, 2, C.k); disco(x + 2, 80, 1, hex('#7a8ab0')); } rect(212, 86, 220, 102, hex('#5a3a22')); disco(216, 86, 4, hex('#5a3a22')); pset(218, 95, C.oroN); }
    // los muros de piedra y los arces pelados
    for (let x = 0; x < 320; x++) { const y = 104 + Math.round(Math.sin(x * 0.05) * 1); if ((x >> 2) % 9 === 8) continue; pset(x, y, (x >> 1) & 1 ? hex('#8a8a96') : hex('#6a6a78')); pset(x, y - 1, (x >> 2) & 1 ? hex('#a8a8b4') : EC.nv); }
    for (const [x, s] of [[18, 14], [110, 12], [174, 16], [252, 15], [300, 11]]) { const b = 108; linea(x, b, x, b - s, EC.madD); linea(x + 1, b, x + 1, b - s + 2, EC.madS);
      for (let k = 0; k < 6; k++) { const yy = b - s * (0.45 + k * 0.1), l = s * (0.5 - k * 0.05), dd = k & 1 ? 1 : -1; linea(x, Math.round(yy), Math.round(x + dd * l), Math.round(yy - l * 0.7), EC.madD); linea(Math.round(x + dd * l * 0.6), Math.round(yy - l * 0.42), Math.round(x + dd * l * 0.8), Math.round(yy - l * 0.95), EC.madS); pset(Math.round(x + dd * l), Math.round(yy - l * 0.7) - 1, EC.nvL); } }
    // el campo nevado, el camino con sus roderas y huellas, y los ventisqueros de delante
    for (let y = 105; y <= 179; y++) for (let x = 0; x < 320; x++) { let c;
      if (y < 116) c = (e_ruido(x * 0.05, y * 0.3, 803) < 0.35 && e_b4(x, y) < 0.5) ? EC.nvS : EC.nv;
      else if (y < 144) { c = EC.camino; const r = [121, 125, 131, 135]; for (const ry of r) if (Math.abs(y - ry - Math.round(Math.sin(x * 0.02 + ry) * 1.2)) < 1) c = EC.rodera; if (h(x >> 1, y, 804) < 0.04) c = hex('#b8a890'); if (y === 116 || y === 143) c = EC.nvD; }
      else { const dr = 150 + Math.sin(x * 0.04) * 4 + Math.sin(x * 0.13) * 2; c = y < dr ? (e_b4(x, y) < 0.5 ? EC.nvS : EC.nv) : EC.nv; if (Math.abs(y - dr) < 1) c = EC.nvL; if (y > dr && y < dr + 3) c = EC.nvD; if (e_ruido(x * 0.04, y * 0.12, 805) < 0.3 && e_b4(x, y) < 0.35) c = EC.nvS; }
      pset(x, y, c); }
    for (let x = 0; x < 320; x += 6) { const y = 115 + Math.round(Math.sin(x * 0.2)); pset(x, y, EC.nvL); pset(x + 1, y, EC.nvL); }
    // matas secas y una piedra en el ventisquero de delante
    for (let k = 0; k < 24; k++) { const x = Math.round(h(k, 1, 806) * 320), y = 150 + Math.round(h(k, 2, 806) * 28); for (let i = 0; i < 4; i++) linea(x + i - 2, y, x + i - 2 + (i - 2) * 0.6, y - 3 - Math.round(h(k, i, 807) * 4), i % 2 ? hex('#a8844a') : hex('#7a5a30')); }
    for (const [x, y] of [[288, 170], [40, 176]]) { disco(x, y, 5, hex('#6a6a78')); disco(x - 1, y - 1, 4, hex('#8a8a96')); rect(x - 5, y - 5, x + 3, y - 4, EC.nvL); }
  });
  // las nubes a tres velocidades y los cuervos
  for (const [x0, y, w, v, k] of [[30, 22, 50, 1.2, 0], [190, 30, 40, 2.0, 1], [120, 44, 34, 3.0, 2], [260, 52, 30, 2.6, 3]]) { const cx = ((x0 + t * v) % 400) - 40; e_nube(R, cx, y, w, k, [hex('#a8bed6'), hex('#dfe8f2'), C.blanco]); }
  for (let k = 0; k < 4; k++) { const u = ((t / 22 + k * 0.07) % 1); e_pajaro(R, 330 - u * 380 + k * 7, 40 + k % 2 * 4 + Math.sin(t + k) * 2, t, hex('#2a2a36'), k); }
  e_humo(R, 146, 64, t, 1, hex('#e8ecf2'), 24);
  // los vecinos al otro lado del camino que saludan (pequeños)
  for (let k = 0; k < 9; k++) { const x = 14 + k * 32 + Math.round(h(k, 1, 808) * 10), y = 115, a = Math.sin(t * 5 + k * 1.7) > 0, col = [hex('#2a3a5a'), hex('#7a2a2a'), hex('#3a5a3a'), hex('#5a3a6a')][k % 4]; if (x > 180 && x < 194) continue;
    rect(x - 1, y - 7, x + 1, y - 2, col); rect(x - 1, y - 1, x - 1, y, C.k); rect(x + 1, y - 1, x + 1, y, C.k); pset(x, y - 8, hex('#e8b890')); if (k % 3 === 0) { rect(x - 1, y - 10, x + 1, y - 9, C.k); rect(x - 2, y - 9, x + 2, y - 9, C.k); } else pset(x, y - 9, k % 2 ? hex('#c83a3a') : hex('#e8e0d0'));
    linea(x + 2, y - 6, x + 3, a ? y - 10 : y - 8, col); }
  // la carrera: dos trineos por el camino, en bucle
  if (o.carrera !== false) { const x1 = ((t * 38) % 460) - 60, x2 = ((t * 33 + 210) % 460) - 60; e_trineo(R, x2, 128, t, { color: hex('#2a5aa8'), abrigo: hex('#5a2a2a') }); e_trineo(R, x1, 139, t, { color: hex('#c0302a') }); }
  e_copos(R, t, 0, 16, 319, 179, 70, 2, C.blanco, hex('#dfe8f4'), 9, 5);
  return { suelo: 160, camino: [118, 142], carriles: [128, 139], horizonte: 64, iglesia: [216, 70], granero: [74, 100], cerca: [150, 172], zonaLibre: [0, 319], ventisquero: [146, 179] };
}

// delante en la carrera: la cerca de troncos con nieve encima (largueros a y 154 y 162; postes cada 52 px)
function e_cerca(R, t, o) {
  const { rect, pset } = R;
  for (const y of [153, 161]) { rect(0, y, 319, y + 3, C.k); rect(0, y + 1, 319, y + 2, hex('#7a5232')); rect(0, y + 1, 319, y + 1, hex('#a07648')); for (let x = 0; x < 320; x++) { if (h(x >> 2, y, 810) < 0.3) pset(x, y + 2, hex('#4a2e18')); if (h(x >> 1, y, 811) < 0.75) pset(x, y, EC.nvL); if (h(x >> 1, y, 812) < 0.4) pset(x, y - 1, EC.nv); } }
  for (let x = 10; x < 320; x += 52) { rect(x, 146, x + 4, 179, C.k); rect(x + 1, 147, x + 3, 179, hex('#6a4428')); rect(x + 1, 147, x + 1, 179, hex('#9a6c40')); rect(x, 144, x + 4, 146, EC.nvL); pset(x - 1, 146, EC.nv); pset(x + 5, 146, EC.nv); for (let y = 174; y < 180; y++) rect(x - 2, y, x + 6, y, y === 174 ? EC.nvL : EC.nv); }
  // un carámbano que gotea en un poste
  { const x = 115, y = 164, u = (t % 2) / 2; pset(x, y, hex('#d8ecfa')); pset(x, y + 1, hex('#d8ecfa')); pset(x, y + 2, hex('#a8c8e8')); if (u > 0.5) pset(x, Math.round(y + 3 + (u - 0.5) * 18), hex('#a8c8e8')); }
}

// la meta, de cerca: la tribuna con el público, los postes, la cinta y el trineo que gana
function e_meta(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R;
  e_capa(R, 'meta', () => {
    e_degr(R, 0, 0, 319, 104, [EC.inv0, EC.inv1, EC.inv2, EC.inv3, EC.inv3]);
    // la colina nevada y el bosque detrás de la tribuna (también a los lados)
    for (let x = 0; x < 320; x++) { const y1 = Math.round(60 + 4 * Math.sin(x * 0.03 + 2) + 2 * Math.sin(x * 0.09)); for (let y = y1; y <= 104; y++) pset(x, y, y === y1 ? EC.nvL : h(x >> 1, y >> 1, 826) < 0.2 ? EC.nvS : EC.nv); }
    for (let k = 0; k < 16; k++) { const x = k < 8 ? Math.round(h(k, 5, 820) * 16) : 264 + Math.round(h(k, 5, 820) * 56), s = 5 + Math.round(h(k, 6, 820) * 5), b = 84 + Math.round(h(k, 7, 820) * 18); poligono([[x - s, b], [x, b - s * 3], [x + s, b]], EC.pino); poligono([[x, b], [x, b - s * 3], [x + s, b]], EC.pinoS); for (let j = 1; j < 3; j++) linea(x - s + j * 2, b - j * s, x + s - j * 2, b - j * s, EC.nv); rect(x, b, x, b + 2, EC.madD); }
    // el cobertizo de los caballos a la derecha, con su tejado nevado, la puerta y un caballo con manta que asoma
    rect(270, 76, 316, 102, hex('#8a5a32')); for (let x = 272; x < 316; x += 3) rect(x, 76, x, 102, hex('#6a4428')); poligono([[266, 77], [293, 64], [320, 77]], EC.nv); linea(266, 77, 320, 77, EC.nvD); linea(266, 77, 293, 64, EC.nvL);
    rect(282, 84, 304, 102, hex('#2a1a10')); rect(282, 84, 292, 92, hex('#5a3a22')); linea(282, 84, 292, 92, hex('#8a6440')); linea(292, 84, 282, 92, hex('#8a6440'));
    rect(294, 88, 302, 94, hex('#5a3420')); rect(300, 86, 304, 90, hex('#5a3420')); pset(302, 87, C.k); rect(294, 90, 300, 93, hex('#2a5aa8'));
    for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 820) * 330), s = 6 + Math.round(h(k, 2, 820) * 6), b = 62 + Math.round(h(k, 3, 820) * 4); if (x > 268 && b - s * 3 < 48) continue; poligono([[x - s, b], [x, b - s * 3], [x + s, b]], EC.pino); poligono([[x, b], [x, b - s * 3], [x + s, b]], EC.pinoS); for (let j = 1; j < 3; j++) linea(x - s + j * 2, b - j * s, x + s - j * 2, b - j * s, EC.nv); }
    // la tribuna de tablas (tres gradas con su techo de lona a rayas)
    rect(18, 50, 262, 54, hex('#7a5232')); for (let x = 18; x <= 262; x++) { const y = 46 + (x % 20 < 10 ? 0 : 0); pset(x, y, x % 16 < 8 ? hex('#c8302a') : C.blanco); pset(x, y + 1, x % 16 < 8 ? hex('#c8302a') : C.blanco); pset(x, y + 2, x % 16 < 8 ? hex('#902018') : hex('#d8d4cc')); if (x % 16 === 8) pset(x, y + 3, hex('#902018')); }
    rect(18, 49, 262, 50, hex('#6a4428'));
    for (let g = 0; g < 3; g++) { const y = 66 + g * 12; rect(18, y, 262, y + 3, hex('#a07648')); rect(18, y, 262, y, hex('#c8a070')); rect(18, y + 3, 262, y + 3, hex('#5a3a22')); rect(18, y + 4, 262, y + 11, hex('#3a2616')); for (let x = 20; x < 262; x += 12) rect(x, y + 4, x, y + 11, hex('#2a1a10')); }
    for (const x of [18, 100, 180, 262]) { rect(x, 48, x + 2, 104, hex('#5a3a22')); rect(x, 48, x, 104, hex('#8a6440')); }
    // el suelo: la explanada nevada, el camino con sus roderas, la línea de meta pintada
    for (let y = 102; y <= 179; y++) for (let x = 0; x < 320; x++) { let c; if (y < 112) c = (e_b4(x, y) < 0.4 && e_ruido(x * 0.1, y * 0.3, 821) < 0.4) ? EC.nvS : EC.nv; else if (y < 146) { c = EC.camino; for (const ry of [118, 124, 133, 139]) if (Math.abs(y - ry - Math.round(Math.sin(x * 0.03 + ry) * 1.3)) < 1) c = EC.rodera; if (h(x >> 1, y, 822) < 0.03) c = hex('#b8a890'); if (y === 112 || y === 145) c = EC.nvD; }
      else { c = EC.nv; if (e_ruido(x * 0.05, y * 0.15, 823) < 0.32 && e_b4(x, y) < 0.4) c = EC.nvS; if (y < 149) c = EC.nvL; } pset(x, y, c); }
    for (let y = 112; y <= 145; y++) { const x = 176 + Math.round((y - 112) * 0.25); pset(x, y, hex('#c02030')); pset(x + 1, y, hex('#c02030')); if ((y & 3) === 0) pset(x + 2, y, hex('#e05050')); }
    // el barril con nieve, la campana del juez sobre su poste y una pala clavada
    { const x = 236, y = 162; rect(x - 7, y - 16, x + 7, y, C.k); rect(x - 6, y - 15, x + 6, y - 1, hex('#8a5a32')); for (const yy of [y - 13, y - 4]) rect(x - 7, yy, x + 7, yy + 1, hex('#4a4a52')); rect(x - 6, y - 15, x - 4, y - 1, hex('#a87a48')); rect(x - 7, y - 18, x + 7, y - 16, EC.nvL); }
    { rect(290, 140, 291, 168, hex('#5a3a22')); linea(284, 140, 298, 140, hex('#5a3a22')); disco(296, 144, 3, C.oroNS); disco(295, 143, 2, C.oroN); rect(287, 166, 294, 168, EC.nv); }
    { linea(20, 168, 26, 150, hex('#6a4428')); poligono([[24, 150], [30, 146], [32, 152], [26, 155]], hex('#8a8a9a')); }
  });
  // el público que vitorea en las gradas (sombreros, gorros, bufandas; los brazos arriba a turnos)
  for (let g = 0; g < 3; g++) for (let k = 0; k < 20; k++) { const x = 24 + k * 12 + (g & 1) * 6 + Math.round(h(k, g, 824) * 3); if (x > 258) continue; const y = 65 + g * 12, salta = Math.sin(t * 6 + k * 1.3 + g) > 0.6 ? 1 : 0, col = [hex('#2a3a5a'), hex('#7a2a2a'), hex('#3a5a3a'), hex('#5a3a6a'), hex('#6a5a3a')][(k + g) % 5];
    rect(x - 2, y - 6 - salta, x + 2, y - 1, col); disco(x, y - 8 - salta, 2, h(k, g, 825) < 0.2 ? hex('#a8704a') : hex('#e8b890')); const tp = (k + g * 2) % 4;
    if (tp === 0) { rect(x - 2, y - 13 - salta, x + 2, y - 10 - salta, C.k); rect(x - 3, y - 10 - salta, x + 3, y - 10 - salta, C.k); } else if (tp === 1) { rect(x - 2, y - 11 - salta, x + 2, y - 10 - salta, hex('#c83a3a')); pset(x, y - 12 - salta, C.blanco); } else if (tp === 2) { rect(x - 3, y - 10 - salta, x + 3, y - 9 - salta, hex('#e8d8b0')); }
    if (salta) { linea(x - 3, y - 6 - salta, x - 4, y - 11 - salta, col); linea(x + 3, y - 6 - salta, x + 4, y - 11 - salta, col); } if (k % 5 === 2) linea(x + 2, y - 4, x + 5, y - 4 + (Math.sin(t * 4 + k) > 0 ? 1 : 0), hex('#e04040')); }
  // los banderines al viento sobre el techo
  for (let k = 0; k < 7; k++) { const x = 30 + k * 36, w = Math.sin(t * 3 + k); rect(x, 30, x, 46, hex('#5a3a22')); poligono([[x + 1, 30], [x + 12, 33 + Math.round(w * 2)], [x + 1, 37]], k % 2 ? hex('#2a5aa8') : hex('#c8302a')); pset(x + 2, 31, C.blanco); }
  // las nubes y los pájaros
  for (const [x0, y, w, v, k] of [[60, 16, 46, 1.4, 0], [220, 24, 36, 2.4, 1], [150, 36, 28, 3.2, 2]]) e_nube(R, ((x0 + t * v) % 400) - 40, y, w, k, [hex('#a8bed6'), hex('#dfe8f2'), C.blanco]);
  for (let k = 0; k < 3; k++) e_pajaro(R, ((40 + t * 12 + k * 9) % 300), 22 + k * 3, t, hex('#2a2a36'), k);
  // el poste de lejos de la meta con su banderín rojo; la cinta, que se rompe cuando pasa el trineo
  const cr = o.cruce === false || o.cruce === null ? null : o.cruce ?? ((t / 6) % 1), tx = cr === null ? -999 : Math.round(-70 + cr * 420), rota = o.cinta ?? (tx > 186 ? 1 : 0);
  rect(174, 70, 176, 112, C.k); rect(175, 70, 175, 112, hex('#c8c0b0')); { const w = Math.sin(t * 4); poligono([[177, 70], [194, 74 + Math.round(w * 2)], [177, 80]], hex('#c02030')); for (let y = 72; y < 79; y += 2) pset(178, y, hex('#e05050')); }
  if (rota < 0.5) { linea(176, 106, 184, 150, hex('#e8e0d0')); linea(177, 106, 185, 150, hex('#c02030')); }
  else { const a = Math.sin(t * 6) * 2; linea(176, 106, 172 + a, 118, hex('#c02030')); linea(185, 150, 190 - a, 138, hex('#c02030')); }
  if (cr !== null) e_trineo(R, tx, 136, t, { color: hex('#c0302a') });
  e_copos(R, t, 0, 0, 319, 179, 40, 3, C.blanco, hex('#dfe8f4'), 8, 4);
  return { suelo: 168, camino: [112, 145], meta: [176, 112, 184, 150], trineo: [tx, 136], tribuna: [18, 50, 262, 102], zonaLibre: [[0, 160], [196, 282]] };
}

// delante en la meta: el poste de cerca de la meta (x 184) con su banderola y un montón de nieve en las esquinas
function e_metaDelante(R, t, o) {
  const { rect, pset, poligono, disco } = R;
  rect(183, 82, 186, 152, C.k); rect(184, 82, 185, 152, hex('#e8e0d0')); for (let y = 86; y < 152; y += 8) rect(184, y, 185, y + 3, hex('#c02030'));
  { const w = Math.sin(t * 4 + 1); poligono([[187, 82], [208, 86 + Math.round(w * 2)], [187, 94]], hex('#2a5aa8')); disco(194, 88, 2, C.oroN); }
  for (let y = 150; y <= 155; y++) rect(178, y, 192, y, y === 150 ? EC.nvL : EC.nv);
  for (const [x0, x1] of [[0, 20], [300, 319]]) for (let y = 166; y <= 179; y++) for (let x = x0; x <= x1; x++) { const top = 166 + Math.abs(x - (x0 + x1) / 2) * 0.5; if (y >= top) pset(x, y, y < top + 1 ? EC.nvL : e_b4(x, y) < 0.3 ? EC.nvS : EC.nv); }
}

// la cápsula Gemini (morro a la izquierda) centrada en (cx, cy), s: escala; con chorritos de los propulsores
export function e_gemini(R, cx, cy, t, s = 1) {
  const { pset, linea } = R, X = (u) => Math.round(cx + u * s), Y = (v) => Math.round(cy + v * s);
  // el adaptador blanco (tronco de cono que se abre hacia la derecha), con larguerillos y su sombra abajo
  for (let u = 0; u <= 34; u++) { const hh = 18 + u * 6 / 34; for (let v = -hh; v <= hh; v++) { const f = v / hh; let c = f < -0.55 ? EC.adapL : f < 0.35 ? EC.adap : EC.adapS; if (Math.round(u) % 7 === 3) c = e_mez(c, EC.adapS, 0.5); if (Math.abs(v) > hh - 1) c = C.k; if (u === 12 || u === 13) c = e_mez(c, C.k, 0.2); for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) pset(X(u) + a, Y(v) + b, c); } }
  // el escudo térmico y el módulo de reentrada negro (cono), con tablillas, las dos ventanillas y el morro
  for (let u = -30; u < 0; u++) { const hh = 7 + (u + 30) * 11 / 30; for (let v = -hh; v <= hh; v++) { const f = v / hh; let c = f < -0.6 ? EC.gemL : f < 0.4 ? EC.gem : EC.gemS; if ((u + 40) % 3 === 0) c = e_mez(c, EC.gemL, 0.35); if (Math.abs(v) > hh - 1) c = C.k; for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) pset(X(u) + a, Y(v) + b, c); } }
  for (let v = -18; v <= 18; v++) for (let a = 0; a < s; a++) pset(X(0) + a, Y(v), hex('#5a4a3a'));
  for (const u0 of [-20, -11]) for (let u = 0; u < 6; u++) for (let v = 0; v < 3; v++) { const c = v === 0 ? hex('#a8d0f0') : hex('#2a4a7a'); for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) pset(X(u0 + u) + a, Y(-(7 + (u0 + u + 30) * 11 / 30) + 1 + v) + b, c); }
  for (let u = -40; u < -30; u++) for (let v = -6; v <= 6; v++) { let c = v < -3 ? EC.gemL : v < 3 ? EC.gem : EC.gemS; if (Math.abs(v) === 6 || u === -40) c = C.k; for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) pset(X(u) + a, Y(v) + b, c); }
  // los chorritos de los propulsores (de vez en cuando, por turnos)
  for (const [u, v, dx, dy, k] of [[-40, -4, -1, -0.4, 0], [-36, 6, 0, 1, 1], [32, -22, 0.4, -1, 2]]) { const f = (t * 0.6 + k * 0.37) % 2; if (f > 0.35) continue; for (let i = 1; i < 7; i++) if (e_b4(i, k) < 1 - i / 7) pset(X(u + dx * i * 1.3), Y(v + dy * i * 1.3), i < 3 ? C.blanco : hex('#c8d8f0')); }
  linea(X(-40), Y(-6), X(-40), Y(6), C.k);
}

function e_espacio(R, t, o) {
  const { rect, pset, disco, linea } = R;
  e_capa(R, 'espacio', () => {
    e_degr(R, 0, 0, 319, 179, [EC.esp0, EC.esp1, EC.esp2]);
    // la Vía Láctea en diagonal, tramada, y las estrellas fijas
    for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const d = Math.abs((y - 10) - (x - 40) * 0.32) / 22, n = e_ruido(x * 0.08, y * 0.08, 830); if (d < 1 && (1 - d) * n > e_b4(x, y) + 0.25 && !(x > 274 && y < 48)) pset(x, y, n > 0.75 ? hex('#3a3a6a') : hex('#22264a')); }
    for (let k = 0; k < 240; k++) { const x = Math.round(h(k, 1, 831) * 319), y = Math.round(h(k, 2, 831) * 130), b = h(k, 3, 831); if (x > 274 && y < 48) continue; pset(x, y, b > 0.9 ? C.blanco : b > 0.6 ? hex('#aab0d0') : hex('#5a6088')); }
  });
  // el sol con su destello en cruz, que respira
  { const sx = 44, sy = 44, b = Math.sin(t * 1.5); R.halo(sx, sy, 22 + b, [hex('#1a1a3a'), hex('#3a3a5a'), hex('#8a8aa0'), hex('#e8e0c0')], 1.0); disco(sx, sy, 6, hex('#fff6d8')); disco(sx, sy, 4, C.blanco);
    for (let i = 7; i < 26 + b * 3; i++) { const c = i < 14 ? hex('#f0ecd8') : hex('#8a88a0'); if (e_b4(i, 1) < 1 - i / 28) { pset(sx + i, sy, c); pset(sx - i, sy, c); if (i < 18) { pset(sx, sy + i, c); pset(sx, sy - i, c); } } } }
  // las estrellas que titilan
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 5, 832) * 319), y = Math.round(h(k, 6, 832) * 100); if ((x > 274 && y < 48) || (x < 172 && y < 16)) continue; const s = Math.sin(t * (2 + k % 3) + k * 2); if (s > 0.4) { pset(x, y, C.blanco); if (s > 0.85) { pset(x + 1, y, hex('#8a90c0')); pset(x - 1, y, hex('#8a90c0')); pset(x, y + 1, hex('#8a90c0')); pset(x, y - 1, hex('#8a90c0')); } } }
  // la Tierra que gira abajo: océanos, tierras, nubes que avanzan, el lado de noche con ciudades y la atmósfera
  { const cx = 160, cy = 470, Rr = 390, L = [-0.55, -0.62, 0.56];
    for (let y = 76; y < 180; y++) for (let x = 0; x < 320; x++) { const dx = x - cx, dy = y - cy, d = Math.sqrt(dx * dx + dy * dy);
      if (d > Rr) { if (d < Rr + 5) { const g = 1 - (d - Rr) / 5; if (g > e_b4(x, y)) pset(x, y, g > 0.6 ? EC.atm : hex('#2a4a8a')); } continue; }
      const nx = dx / Rr, ny = dy / Rr, nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny)), luz = nx * L[0] + ny * L[1] + nz * L[2];
      const lon = Math.atan2(nx, nz) * 3.2 + t * 0.012, lat = Math.asin(Math.max(-1, Math.min(1, -ny))) * 6;
      const tierra = e_ruido(lon * 3 + 20, lat * 2.2, 833) * 0.7 + e_ruido(lon * 9, lat * 6, 834) * 0.3, nube = e_ruido(lon * 4 + t * 0.03, lat * 5, 835) * 0.65 + e_ruido(lon * 12 + t * 0.05, lat * 14, 836) * 0.35;
      let c = tierra > 0.56 ? (tierra > 0.68 ? EC.tierra2 : e_ruido(lon * 15, lat * 15, 837) > 0.5 ? EC.tierra1 : EC.tierra0) : (tierra > 0.5 ? EC.mar2 : nz < 0.25 ? EC.mar0 : EC.mar1);
      if (nube > 0.6) c = nube > 0.7 ? EC.nubeT : e_mez(c, EC.nubeT, 0.6);
      const sombra = 0.25 - luz; if (sombra > 0 && sombra * 3 > e_b4(x, y) * 0.9) c = e_mez(c, EC.esp0, Math.min(0.85, 0.5 + sombra));
      if (sombra > 0.2 && tierra > 0.58 && nube < 0.6 && h(x, y, 838) < 0.07) c = Math.sin(t * 3 + x) > -0.5 ? hex('#ffd880') : hex('#c8a050');
      if (Rr - d < 3 && luz > -0.1) c = e_mez(c, EC.atmL, 0.6);
      pset(x, y, c); } }
  // la Gemini 7, lejos, y la Gemini 6A que se mece
  e_gemini(R, Math.round(256 + Math.sin(t * 0.3) * 3), Math.round(66 + Math.cos(t * 0.4) * 2), t + 0.7, 0.34);
  const [gx, gy] = o.capsula ?? [168, 54]; e_gemini(R, Math.round(gx + Math.sin(t * 0.5) * 2), Math.round(gy + Math.sin(t * 0.7) * 2), t, 1);
  return { suelo: null, capsula: [168, 54], gemini7: [256, 66], sol: [44, 44], horizonte: 80, zonaNotas: [100, 20, 260, 76] };
}

// la cabina de la Gemini por dentro: paredes acolchadas, las dos ventanillas, el panel de techo y los asientos
function e_cabina(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  const VEN = [[64, 22, 132, 74], [188, 22, 256, 74]];
  e_capa(R, 'cabina', () => {
    // el acolchado gris verdoso con su pespunte en rombos, más oscuro hacia los bordes
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x + y * 0.8) % 12, v = (x - y * 0.8 + 600) % 12; let c = EC.cab; if (u < 1 || v < 1) c = EC.cabS; else if (u < 2.5 && v > 3) c = EC.cabL;
      const borde = Math.min(x, 319 - x) / 60; if (borde < 1 && e_b4(x, y) > borde) c = e_mez(c, C.k, 0.35); if (x > 274 && y < 48) c = (u < 1 || v < 1) ? e_mez(EC.cabS, EC.cab, 0.5) : EC.cabS; if (y < 12) c = e_mez(c, C.k, 0.3); pset(x, y, c); }
    // las cuadernas metálicas con remaches, los mazos de cables y las asas
    for (const x of [40, 280]) { rect(x - 3, 0, x + 3, 179, EC.cabD); rect(x - 2, 0, x - 2, 179, EC.cabL); for (let y = 4; y < 180; y += 8) pset(x, y, hex('#a8b0ac')); }
    for (const [x, c] of [[12, hex('#c8a040')], [16, hex('#8a2a2a')], [20, hex('#3a5a8a')], [300, hex('#c8a040')], [304, hex('#3a5a8a')]]) { for (let y = 50; y < 180; y++) pset(x + Math.round(Math.sin(y * 0.05) * 1.5), y, c); for (let y = 60; y < 180; y += 22) rect(x - 2, y, x + 3, y + 1, hex('#d8d8d0')); }
    for (const y of [70, 120]) { rect(26, y, 34, y + 2, hex('#c8c8c0')); rect(26, y, 27, y + 8, hex('#c8c8c0')); rect(33, y, 34, y + 8, hex('#c8c8c0')); }
    // las ventanillas (el marco grueso con tornillos; el cristal lo pinta la vida)
    for (const [x0, y0, x1, y1] of VEN) { rect(x0 - 5, y0 - 5, x1 + 5, y1 + 5, C.k); rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, hex('#6a7270')); rect(x0 - 4, y0 - 4, x1 + 4, y0 - 3, hex('#9aa4a0')); rect(x0 - 4, y1 + 3, x1 + 4, y1 + 4, hex('#3a403e')); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k);
      for (let x = x0; x <= x1; x += 10) { pset(x, y0 - 3, hex('#d0d8d4')); pset(x, y1 + 3, hex('#d0d8d4')); } for (let y = y0 + 4; y <= y1; y += 10) { pset(x0 - 3, y, hex('#d0d8d4')); pset(x1 + 3, y, hex('#d0d8d4')); } }
    // el panel de techo entre las ventanillas: interruptores, disyuntores y una pantallita
    rect(140, 14, 180, 104, C.k); rect(141, 15, 179, 103, EC.pan); rect(141, 15, 179, 15, EC.panL);
    for (let r = 0; r < 4; r++) for (let i = 0; i < 5; i++) { const x = 145 + i * 7, y = 22 + r * 9; rect(x, y, x + 3, y + 3, hex('#1a1c20')); rect(x + 1, y - 2 + ((i + r) % 3 === 0 ? 4 : 0), x + 2, y + 1 + ((i + r) % 3 === 0 ? 2 : 0), hex('#d8dcd8')); }
    for (let i = 0; i < 8; i++) { disco(146 + i * 4, 64, 1, hex('#1a1c20')); pset(146 + i * 4, 63, hex('#e8e8e0')); }
    rect(146, 72, 174, 84, C.k); rect(147, 73, 173, 83, hex('#0e2a1a')); rect(146, 90, 174, 100, hex('#3a3e44')); for (let x = 148; x < 173; x += 4) rect(x, 92, x + 2, 98, hex('#1a1c20'));
    // la lista de comprobación en su pinza (renglones sin letras) y una bolsa de comida con velcro
    rect(116, 80, 136, 102, C.k); rect(117, 81, 135, 101, hex('#f0ecd8')); rect(122, 78, 130, 82, hex('#8a8a92')); rect(117, 99, 135, 101, hex('#d0c8b0')); for (let k = 0; k < 6; k++) { rect(119, 85 + k * 2.6 | 0, 119, 85 + k * 2.6 | 0, hex('#c83a3a')); rect(121, 85 + k * 2.6 | 0, 131 - (k % 3) * 3, 85 + k * 2.6 | 0, hex('#7a7a80')); }
    rect(236, 80, 254, 100, hex('#c8c8b8')); rect(236, 80, 254, 82, hex('#e8e8d8')); rect(239, 86, 251, 96, hex('#e0b860')); rect(239, 86, 251, 86, hex('#f8d888')); rect(236, 100, 254, 100, hex('#8a8a7a')); rect(242, 76, 248, 80, hex('#5a5a52')); rect(254, 84, 254, 98, hex('#8a8a7a'));
    // las consolas de los lados (por debajo de la esquina de Atom): interruptores con guarda, disyuntores y un extintor
    for (const [x0, x1] of [[2, 34], [286, 318]]) { rect(x0, 94, x1, 146, C.k); rect(x0 + 1, 95, x1 - 1, 145, EC.pan); rect(x0 + 1, 95, x1 - 1, 95, EC.panL);
      for (let r = 0; r < 4; r++) for (let i = 0; i < 4; i++) { const x = x0 + 4 + i * 7, y = 100 + r * 9; rect(x, y, x + 3, y + 3, hex('#1a1c20')); rect(x + 1, y - 2 + ((i + r + x0) % 3 === 0 ? 4 : 0), x + 2, y + 1 + ((i + r + x0) % 3 === 0 ? 2 : 0), hex('#d8dcd8')); }
      rect(x0 + 4, 137, x0 + 12, 142, hex('#c02020')); rect(x0 + 4, 137, x0 + 12, 137, hex('#f05050')); rect(x0 + 16, 136, x1 - 4, 143, hex('#2a2e34')); for (let x = x0 + 18; x < x1 - 4; x += 3) pset(x, 139, hex('#e8c040')); }
    rect(48, 130, 54, 150, C.k); rect(49, 131, 53, 150, hex('#c02020')); rect(49, 131, 50, 150, hex('#e85050')); rect(49, 127, 53, 130, hex('#2a2a2e')); linea(53, 128, 57, 132, hex('#2a2a2e'));
    // las mangueras del oxígeno, anilladas, desde las paredes hasta los asientos
    for (const [x0, y0, x1, y1, xm, ym] of [[36, 112, 84, 132, 56, 140], [284, 112, 236, 132, 264, 140]]) for (let i = 0; i <= 40; i++) { const u = i / 40, x = Math.round((1 - u) ** 2 * x0 + 2 * u * (1 - u) * xm + u * u * x1), y = Math.round((1 - u) ** 2 * y0 + 2 * u * (1 - u) * ym + u * u * y1); R.rect(x - 1, y - 1, x + 1, y + 1, i % 3 ? hex('#8a948a') : hex('#5a625a')); pset(x - 1, y - 1, hex('#b4beb4')); }
    // los dos asientos eyectables: reposacabezas, respaldo con correas y los asideros amarillos y negros
    for (const cx of [100, 220]) { rect(cx - 13, 104, cx + 13, 116, C.k); rect(cx - 12, 105, cx + 12, 115, EC.asiento); rect(cx - 12, 105, cx + 12, 106, EC.asientoL); rect(cx + 8, 105, cx + 12, 115, EC.asientoS);
      rect(cx - 17, 114, cx + 17, 150, C.k); rect(cx - 16, 115, cx + 16, 150, EC.asiento); rect(cx - 16, 115, cx - 14, 150, EC.asientoL); rect(cx + 12, 115, cx + 16, 150, EC.asientoS); for (let y = 118; y < 150; y += 5) rect(cx - 13, y, cx + 11, y, e_mez(EC.asiento, EC.asientoS, 0.5));
      for (const dx of [-17, 15]) for (let y = 116; y < 150; y++) { pset(cx + dx, y, ((y >> 2) & 1) ? hex('#e8c030') : hex('#1a1a1a')); pset(cx + dx + 1, y, ((y >> 2) & 1) ? hex('#e8c030') : hex('#1a1a1a')); }
      linea(cx - 12, 116, cx - 4, 140, hex('#c8a060')); linea(cx + 12, 116, cx + 4, 140, hex('#c8a060'));
      rect(cx - 22, 120, cx - 19, 152, hex('#7a7e86')); rect(cx - 22, 120, cx - 22, 152, hex('#b4b8c0')); rect(cx + 19, 120, cx + 22, 152, hex('#5a5e66')); for (let y = 124; y < 152; y += 7) { pset(cx - 21, y, hex('#e0e4e8')); pset(cx + 20, y, hex('#9aa0a8')); }
      rect(cx - 24, 132, cx - 18, 135, hex('#4a4e56')); rect(cx + 18, 132, cx + 24, 135, hex('#4a4e56')); }
  });
  // por las ventanillas: estrellas, la Tierra que pasa y un destello de sol
  VEN.forEach(([x0, y0, x1, y1], k) => { R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, y < y0 + 20 ? EC.esp0 : EC.esp1);
    for (let i = 0; i < 18; i++) { const x = x0 + ((h(i, k, 840) * 70 + t * 4) % 70), y = y0 + h(i, k + 2, 840) * 52; pset(Math.round(x), Math.round(y), i % 4 ? hex('#8a90b0') : C.blanco); }
    const cy = y1 + 150 - Math.sin(t * 0.2 + k) * 4, off = t * 6 + k * 40;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = Math.hypot(x - (x0 + x1) / 2, y - cy); if (d > 170) { if (d < 173 && e_b4(x, y) < 0.6) pset(x, y, EC.atm); continue; } const n = e_ruido((x + off) * 0.06, y * 0.1, 841), nb = e_ruido((x + off * 1.6) * 0.08, y * 0.16, 842); let c = n > 0.58 ? EC.tierra1 : EC.mar1; if (nb > 0.62) c = EC.nubeT; if (170 - d < 2) c = EC.atmL; pset(x, y, c); }
    // el reflejo en el cristal
    for (let i = 0; i < 16; i++) { pset(x0 + 6 + i, y0 + 20 - i, hex('#9ab0c8')); if (i < 9) pset(x0 + 12 + i, y0 + 20 - i, hex('#6a7a98')); }
    R.recorte(null); });
  // un haz de sol que entra por la ventanilla izquierda y se mueve despacio
  { const s = Math.sin(t * 0.25) * 10; for (let y = 76; y < 150; y++) for (let x = 70 + Math.round((y - 76) * 0.3 + s); x < 110 + Math.round((y - 76) * 0.3 + s); x++) if (((x + y) & 3) === 0) pset(x, y, e_mez(R.pget(x, y), hex('#fff4d0'), 0.35)); }
  // la pantallita verde, las luces de aviso y el lápiz que flota atado
  { const v = Math.floor(t * 2) % 10; e_cifras(R, String(10 + v), 150, 75, hex('#4ae07a')); rect(162, 78, 162 + Math.round(4 + Math.sin(t * 2) * 4), 79, hex('#2a9a4a')); }
  for (let i = 0; i < 8; i++) if (Math.sin(t * (1 + i * 0.4) + i) > 0.2) pset(146 + i * 4, 64, [hex('#ff5a4a'), hex('#4ae07a'), hex('#ffd050')][i % 3]);
  { const a = Math.sin(t * 0.8) * 0.5, px = 160 + Math.round(Math.sin(a) * 20), py = 118 + Math.round(Math.cos(a) * 6); linea(160, 104, px, py, hex('#d8d8d0')); linea(px - 5, py + 2, px + 5, py - 2, hex('#e8b830')); pset(px + 5, py - 2, hex('#e8a090')); pset(px - 6, py + 2, hex('#2a2a2a')); }
  return { suelo: 142, asientos: [100, 220], actores: [92, 212], ventanillas: VEN, panel: [140, 14, 180, 104], lapiz: [160, 118], zonaNotas: [40, 80, 280, 140] };
}

// delante en la cabina: el panel de mandos de abajo, con diales cuyas agujas se mueven, interruptores, luces y la bola
function e_panelCabina(R, t, o) {
  const { rect, pset, disco, linea } = R;
  for (let y = 148; y <= 179; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 148 ? C.k : y === 149 ? EC.panL : (x + y) % 23 === 0 ? e_mez(EC.pan, C.k, 0.3) : EC.pan);
  for (let x = 0; x < 320; x += 40) rect(x, 150, x, 179, C.k);
  for (const [cx, k] of [[20, 0], [56, 1], [96, 2], [224, 3], [264, 4], [300, 5]]) { disco(cx, 164, 9, C.k); disco(cx, 164, 8, hex('#e8e4d8')); disco(cx, 164, 7, hex('#14161a')); for (let a = 0; a < 12; a++) pset(Math.round(cx + Math.cos(a * 0.52) * 6), Math.round(164 + Math.sin(a * 0.52) * 6), hex('#c8c8c0'));
    const an = -2.4 + (Math.sin(t * (0.5 + k * 0.23) + k) * 0.5 + 0.5) * 3.4; linea(cx, 164, Math.round(cx + Math.cos(an) * 5), Math.round(164 + Math.sin(an) * 5), hex('#ff7a3a')); pset(cx, 164, C.blanco); }
  // la bola de actitud (la «ocho») que gira, en el centro
  { const cx = 160, cy = 165, r = 12; disco(cx, cy, r + 2, C.k); disco(cx, cy, r + 1, hex('#8a8a92'));
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue; const hz = j + Math.sin(t * 0.6) * 4 + i * Math.sin(t * 0.3) * 0.2; let c = hz < 0 ? hex('#e8e4dc') : hex('#2a2a2e'); if (Math.abs(hz) < 0.6) c = hex('#ff7a3a'); if (i > 6 && j < 0) c = e_mez(c, C.k, 0.2); pset(cx + i, cy + j, c); }
    rect(cx - 6, cy, cx + 6, cy, hex('#ffd050')); pset(cx, cy - 1, hex('#ffd050')); pset(cx - 4, cy - 7, C.blanco); }
  for (let i = 0; i < 12; i++) { const x = 118 + i * 7 - (i > 5 ? -44 : 0), on = Math.sin(t * 1.7 + i * 1.9) > 0; if (x > 136 && x < 184) continue; rect(x, 154, x + 3, 156, on ? [hex('#ff5a4a'), hex('#4ae07a'), hex('#ffd050')][i % 3] : hex('#3a2a2a')); rect(x + 1, 160, x + 2, 168 - (i % 2) * 4, hex('#d8dcd8')); }
}

// un soldado pequeño de fondo (sin armas), de 9 px: o.saluda, o.lado (0: caqui; 1: gris), dir
function e_soldadito(R, x, y, t, lado, k, saluda = false) {
  const c = lado ? hex('#6a6e74') : hex('#7a6a44'), cS = e_mez(c, C.k, 0.3); R.rect(x - 1, y - 6, x + 1, y - 2, c); R.pset(x + 1, y - 6, cS); R.pset(x - 1, y - 1, C.k); R.pset(x + 1, y - 1, C.k); R.pset(x, y - 7, hex('#e8b890'));
  if (lado) { R.rect(x - 1, y - 8, x + 1, y - 8, hex('#4a4a52')); R.pset(x, y - 9, hex('#4a4a52')); } else { R.rect(x - 2, y - 8, x + 2, y - 8, hex('#6a5a3a')); R.pset(x, y - 9, hex('#6a5a3a')); }
  if (saluda) { const a = Math.sin(t * 5 + k) > 0; R.linea(x + 2, y - 5, x + 3, a ? y - 9 : y - 7, c); }
}

// el arbolito con velas (sobre un parapeto): cx, base yb, tamaño s
function e_arbolVelas(R, cx, yb, t, s, k = 0) {
  e_abeto(R, cx, yb - s * 2.4, yb - 1, s, 20 + k);
  for (let i = 0; i < Math.max(3, Math.round(s * 0.8)); i++) { const f = 0.25 + h(i, k, 850) * 0.7, x = Math.round(cx + (h(i, k + 1, 850) - 0.5) * 1.4 * s * f), y = Math.round(yb - s * 2.4 + f * s * 2.3); R.pset(x, y + 1, hex('#f4ecd8')); e_llama(R, x, y, t, i + k, s > 6); }
  R.rect(cx - 1, yb - 1, cx + 1, yb + 1, EC.madS);
}

// los sacos terreros de una fila (de x0 a x1, apoyados en yb), de w × a, con nieve encima
function e_sacos(R, x0, x1, yb, w, a, filas, k = 0, nieve = true) {
  for (let f = 0; f < filas; f++) { const y = yb - (f + 1) * a, dx = (f & 1) * (w >> 1);
    for (let x = x0 - dx; x < x1; x += w) { const xa = Math.max(x0, x), xb = Math.min(x1, x + w - 1); if (xb <= xa) continue;
      for (let yy = y; yy < y + a; yy++) for (let xx = xa; xx <= xb; xx++) { const u = (xx - x) / w, v = (yy - y) / a; let c = v < 0.3 ? EC.sacosL : v > 0.75 ? EC.sacosS : EC.sacos; if (u < 0.08 || u > 0.92 || v > 0.92) c = e_mez(EC.sacosS, C.k, 0.4); if (h(xx, yy, 860 + k) < 0.1) c = e_mez(c, EC.barro, 0.5); if ((xx + yy * 2) % 5 === 0 && v > 0.2) c = e_mez(c, EC.sacosS, 0.4); R.pset(xx, yy, c); }
      if (nieve && f === filas - 1) for (let xx = xa + 1; xx < xb; xx++) { R.pset(xx, y, EC.nvL); if (h(xx, k, 861) < 0.6) R.pset(xx, y + 1, EC.nv); } } }
}

// el cielo de la tregua: de día (gris de invierno) o de tarde (con las primeras estrellas)
function e_cieloTregua(R, tarde, y1) {
  e_degr(R, 0, 0, 319, y1, tarde ? [EC.tar0, EC.tar1, EC.tar2, EC.tar3] : [EC.tre0, EC.tre1, EC.tre2, EC.tre3]);
  if (tarde) for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 862) * 319), y = Math.round(h(k, 2, 862) * y1 * 0.5); if (x > 274 && y < 48) continue; R.pset(x, y, k % 3 ? hex('#8a8ab0') : hex('#f0eaff')); }
}

function e_nubesTregua(R, t, tarde, ys) {
  // los estratos: bandas largas tramadas que se desplazan despacio, por debajo de los cúmulos
  { const cS = tarde ? hex('#5a4a6a') : hex('#a4aab6'), cL = tarde ? hex('#c08a86') : hex('#cfd0d6');
    for (const [y0, k, v] of [[64, 0, 1.1], [76, 1, 0.6], [86, 2, 1.6]]) for (let y = y0; y < y0 + 4; y++) for (let x = 0; x < 320; x++) { const n = e_ruido((x + t * v * 6) * 0.025, k * 7, 866); if (n > 0.55 && e_b4(x, y) < (n - 0.55) * 4 * (1 - Math.abs(y - y0 - 1.5) / 3)) R.pset(x, y, y === y0 ? cL : cS); } }
  const cols = tarde ? [hex('#4a3e5e'), hex('#7a5a7a'), hex('#e0a08a')] : [hex('#8a92a2'), hex('#b4b8c2'), hex('#dcdce0')];
  ys.forEach(([x0, y, w, v, k]) => e_nube(R, ((x0 + t * v) % 420) - 50, y, w, k, cols));
}

function e_tregua(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, tarde = o.luz === 'tarde';
  e_capa(R, 'tregua' + (tarde ? 'T' : 'D'), () => {
    e_cieloTregua(R, tarde, 96);
    // la granja en ruinas y los árboles pelados en el horizonte, a contraluz
    const sil = tarde ? hex('#3a3046') : hex('#6a7080'), silS = tarde ? hex('#2a2236') : hex('#565c6c');
    for (let x = 0; x < 320; x++) { const yy = 94 + Math.round(Math.sin(x * 0.04) * 1.5); rect(x, yy, x, 96, sil); }
    { rect(36, 82, 70, 96, sil); poligono([[34, 82], [46, 72], [58, 80], [62, 76], [72, 82]], sil); rect(48, 72, 51, 82, silS); for (let x = 40; x < 68; x += 7) rect(x, 86, x + 3, 90, tarde ? hex('#1a1426') : hex('#8a90a0')); rect(60, 70, 63, 82, sil); }
    for (const [x, s] of [[14, 22], [96, 18], [128, 26], [176, 14], [250, 20], [300, 16]]) { const b = 96; linea(x, b, x, b - s, silS); linea(x + 1, b, x + 1, b - s + 3, silS); for (let k = 0; k < 4; k++) { const y = b - s * (0.5 + k * 0.13), dd = k & 1 ? 1 : -1; linea(x, Math.round(y), Math.round(x + dd * s * 0.3), Math.round(y - s * 0.25), silS); } }
    // la trinchera de enfrente: sacos con nieve, postes, el tablón del vigía
    for (let x = 0; x < 320; x++) rect(x, 97, x, 106, tarde ? hex('#5a4a5a') : hex('#8a8478'));
    e_sacos(R, 0, 319, 104, 8, 3, 2, 1);
    for (const x of [30, 120, 182, 258]) { rect(x, 84, x + 1, 98, EC.madD); rect(x - 4, 84, x + 5, 85, EC.madS); }
    // la alambrada lejana en piquetes en X, abierta en medio
    for (let x = 0; x < 320; x += 18) { if (x > 120 && x < 200) continue; linea(x - 3, 112, x + 3, 106, hex('#4a3e34')); linea(x + 3, 112, x - 3, 106, hex('#4a3e34')); }
    for (const yy of [107, 110]) for (let x = 0; x < 320; x++) { if (x > 124 && x < 196) continue; pset(x, yy + Math.round(Math.sin(x * 0.35) * 0.6), (x % 4 === 0) ? hex('#2e2620') : hex('#5a4e44')); }
    // la tierra de nadie: nieve con hoyos blandos, charcos helados, matas secas, una rueda de carro y pisadas
    for (let y = 106; y <= 179; y++) for (let x = 0; x < 320; x++) { let c = EC.nv; const n = e_ruido(x * 0.04, y * 0.1, 863); if (n < 0.35 && e_b4(x, y) < 0.5) c = EC.nvS; if (n > 0.75 && e_b4(x, y) < 0.25) c = EC.nvL; if (y < 112 && e_b4(x, y) < 0.5) c = EC.nvS;
      if (tarde) c = e_mez(c, hex('#d8a090'), 0.18 * (1 - (y - 106) / 74)) ; pset(x, y, c); }
    for (const [cx, cy, rx, ry] of [[70, 128, 22, 5], [236, 120, 18, 4], [150, 156, 26, 6], [292, 150, 16, 4]]) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d > 1) continue; if (j < 0 && d > 0.45) pset(cx + i, cy + j, e_b4(cx + i, cy + j) < 0.6 ? EC.nvD : EC.nvS); else if (j > 0 && d > 0.55) pset(cx + i, cy + j, EC.nvL); else if (d < 0.25) pset(cx + i, cy + j, (i + j) % 3 ? hex('#a8c8e0') : hex('#d8ecf8')); }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 864) * 320), y = 110 + Math.round(h(k, 2, 864) ** 0.8 * 50), s = 1 + (y - 110) / 18; for (let i = 0; i < 4; i++) linea(x + i - 2, y, Math.round(x + i - 2 + (i - 1.5) * 0.8), Math.round(y - 2 - h(k, i, 865) * 3 * s), i % 2 ? hex('#8a6a3a') : hex('#5a4428')); }
    // una rueda de carro tumbada, medio enterrada en la nieve (aro elíptico, radios y el cubo)
    { const cx = 36, cy = 126; for (let a = 0; a < 60; a++) { const an = a / 60 * Math.PI * 2, x = Math.round(cx + Math.cos(an) * 9), y = Math.round(cy + Math.sin(an) * 3); pset(x, y, an < Math.PI ? hex('#3a2414') : hex('#7a5232')); pset(x, y + 1, hex('#2a1a10')); }
      for (let a = 0; a < 8; a++) linea(cx, cy, Math.round(cx + Math.cos(a * 0.785) * 8), Math.round(cy + Math.sin(a * 0.785) * 2.6), hex('#6a4428')); rect(cx - 1, cy - 1, cx + 1, cy, hex('#2a1a10'));
      for (let x = cx - 12; x <= cx + 2; x++) { pset(x, cy + 2 + Math.round(Math.abs(x - cx + 5) * 0.1), EC.nvL); pset(x, cy + 3, EC.nv); } }
    for (let k = 0; k < 30; k++) { const u = k / 30; for (const [a, b] of [[[40, 158], [150, 128]], [[300, 112], [176, 128]]]) { const x = Math.round(a[0] + (b[0] - a[0]) * u + (k & 1) * 2), y = Math.round(a[1] + (b[1] - a[1]) * u); pset(x, y, EC.nvD); pset(x + 1, y, EC.nvS); } }
    // estacas sueltas
    for (const [x, y] of [[20, 120], [116, 116], [206, 124], [304, 128]]) { linea(x, y, x + 1, y - 8, EC.madD); pset(x + 1, y - 9, EC.nvL); }
  });
  e_nubesTregua(R, t, tarde, [[20, 20, 60, 0.8, 0], [180, 34, 50, 1.4, 1], [100, 52, 40, 2.1, 2], [280, 62, 36, 1.8, 3]]);
  for (let k = 0; k < 5; k++) { const u = ((t / 26 + k * 0.05) % 1); e_pajaro(R, -20 + u * 380 - k * 6, 46 + (k % 2) * 4 + Math.sin(t + k), t, hex('#26222a'), k); }
  // el humo de los braseros, los faroles y el arbolito con velas en el parapeto de enfrente
  for (const [x, k] of [[60, 0], [150, 1], [290, 2]]) e_humo(R, x, 96, t, k, tarde ? hex('#6a5a72') : hex('#c8c8cc'), 30);
  for (const x of [34, 186]) { const b = 0.5 + 0.5 * Math.sin(t * 5 + x); rect(x - 1, 86, x + 1, 89, hex('#2a2a2e')); pset(x, 87, b > 0.3 ? hex('#ffd060') : hex('#e09030')); if (tarde) R.halo(x, 87, 5, [hex('#7a5a5a'), hex('#e8b070')], 0.8); }
  e_arbolVelas(R, 214, 98, t, 6, 0);
  // gente pequeña en el parapeto de enfrente: asoma, saluda, uno camina por la tierra de nadie
  for (const [x, k, s] of [[96, 0, 1], [108, 1, 0], [240, 2, 1], [228, 3, 1], [272, 4, 0]]) e_soldadito(R, x, 98 + (s ? 0 : 3), t, 1, k, !!s);
  { const u = (t / 18) % 1, x = Math.round(260 - u * 70); e_soldadito(R, x, 118, t, 1, 7, false); }
  return { suelo: 150, horizonte: 96, trincheraEnfrente: [96, 106], arbolito: [214, 98], parapetoDelante: 160, zonaLibre: [20, 300], centro: [160, 130], salen: { nuestros: [40, 178], suyos: [200, 104] } };
}

// delante en la tregua (general): nuestro parapeto de sacos con nieve, velas en latas y un arbolito con velas
function e_parapeto(R, t, o) {
  const { rect, pset } = R;
  rect(0, 166, 319, 179, EC.barro); for (let x = 0; x < 320; x++) if (h(x, 1, 870) < 0.4) pset(x, 166 + Math.round(h(x, 2, 870) * 13), hex('#4a3e30'));
  e_sacos(R, 0, 319, 179, 18, 6, 3, 3);
  for (const [x, k] of [[46, 0], [132, 1], [196, 2]]) { rect(x - 2, 156, x + 2, 160, hex('#8a8a92')); rect(x - 2, 156, x + 2, 156, hex('#c8c8d0')); rect(x - 1, 152, x, 155, hex('#f4ecd8')); e_llama(R, x, 150, t, k + 10, true); }
  e_arbolVelas(R, 270, 161, t, 10, 2);
  return { tapa: 160 };
}

function e_treguaCerca(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, tarde = o.luz === 'tarde';
  e_capa(R, 'treguaC' + (tarde ? 'T' : 'D'), () => {
    e_cieloTregua(R, tarde, 104);
    const sil = tarde ? hex('#3a3046') : hex('#6a7080');
    for (let x = 0; x < 320; x++) { const yy = 102 + Math.round(Math.sin(x * 0.05) * 1.2); rect(x, yy, x, 104, sil); }
    // el tronco roto a la izquierda, con la corteza y sus astillas
    { for (let y = 64; y <= 118; y++) { const w = 4 + (y - 64) * 0.04; for (let x = Math.round(54 - w); x <= Math.round(54 + w); x++) pset(x, y, x < 52 ? hex('#6a5a4a') : x > 55 ? hex('#3a2e24') : (y % 5 === 0 ? hex('#3a2e24') : hex('#5a4a3a'))); }
      poligono([[49, 64], [51, 56], [54, 62], [56, 54], [59, 64]], hex('#5a4a3a')); linea(56, 78, 70, 68, hex('#4a3a2e')); linea(70, 68, 74, 70, hex('#4a3a2e')); rect(50, 63, 58, 64, EC.nvL); rect(57, 77, 66, 77, EC.nvL); }
    // las dos trincheras a lo lejos, a los lados, con sacos y la nieve
    for (let x = 0; x < 320; x++) { const izq = x < 116, der = x > 206; if (!izq && !der) continue; rect(x, 98, x, 108, tarde ? hex('#5a4a5a') : hex('#8a8478')); }
    e_sacos(R, 0, 116, 106, 6, 3, 2, 4); e_sacos(R, 206, 319, 106, 6, 3, 2, 5);
    for (let x = 0; x < 320; x += 22) { if (x > 110 && x < 214) continue; linea(x - 2, 114, x + 2, 109, hex('#4a3e34')); linea(x + 2, 114, x - 2, 109, hex('#4a3e34')); }
    // la nieve en primer plano: pisoteada en medio donde juegan, pisadas, una lata y una gorra caída
    for (let y = 105; y <= 179; y++) for (let x = 0; x < 320; x++) { let c = EC.nv; const n = e_ruido(x * 0.035, y * 0.08, 871); if (n < 0.33 && e_b4(x, y) < 0.5) c = EC.nvS; if (n > 0.78 && e_b4(x, y) < 0.3) c = EC.nvL;
      const d = Math.hypot((x - 170) / 90, (y - 150) / 18); if (d < 1 && e_ruido(x * 0.12, y * 0.35, 872) < 0.5 * (1 - d) && e_b4(x, y) < 0.5) c = EC.nvS; if (y < 112 && e_b4(x, y) < 0.4) c = EC.nvS; if (tarde) c = e_mez(c, hex('#d8a090'), 0.15 * (1 - (y - 105) / 74)); pset(x, y, c); }
    for (let k = 0; k < 50; k++) { const x = Math.round(80 + h(k, 1, 873) * 180), y = Math.round(126 + h(k, 2, 873) * 44); pset(x, y, EC.nvD); pset(x + 1, y, EC.nvD); pset(x, y + 1, EC.nvS); }
    for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 3, 874) * 320), y = 112 + Math.round(h(k, 4, 874) ** 0.7 * 64), s = 1 + (y - 110) / 22; if (Math.abs(x - 170) < 80 && y > 132) continue; for (let i = 0; i < 5; i++) linea(x + i - 2, y, Math.round(x + i - 2 + (i - 2) * 0.7), Math.round(y - 2 - h(k, i, 875) * 4 * s), i % 2 ? hex('#8a6a3a') : hex('#5a4428')); }
    { rect(240, 152, 245, 158, hex('#8a8a92')); rect(240, 152, 245, 152, hex('#c8c8d0')); rect(241, 154, 244, 155, hex('#c83a3a')); }
    { for (let i = -5; i <= 5; i++) pset(96 + i, 160 + Math.round((i * i) / 12), hex('#5a5a3a')); rect(92, 158, 100, 159, hex('#6a6a48')); }
  });
  e_nubesTregua(R, t, tarde, [[40, 24, 70, 0.9, 0], [200, 38, 54, 1.5, 1], [120, 58, 44, 2.2, 2], [290, 70, 38, 1.9, 3]]);
  for (let k = 0; k < 4; k++) { const u = ((t / 22 + k * 0.06) % 1); e_pajaro(R, 340 - u * 400 + k * 8, 50 + (k % 2) * 5 + Math.sin(t * 1.2 + k) * 2, t, hex('#26222a'), k); }
  e_arbolVelas(R, 262, 100, t, 6, 1);
  for (const [x, k] of [[30, 0], [290, 1]]) e_humo(R, x, 100, t, k + 3, tarde ? hex('#6a5a72') : hex('#c8c8cc'), 26);
  for (const [x, k, l] of [[20, 0, 0], [70, 1, 0], [96, 2, 0], [224, 3, 1], [246, 4, 1], [300, 5, 1]]) e_soldadito(R, x, 106, t, l, k, k % 2 === 0);
  // el balón de cuero (con su sombra y sus costuras)
  if (o.balon !== false) { const [bx, by] = o.balon ?? [168, 148]; for (let i = -4; i <= 4; i++) pset(bx + i, 150 + Math.max(0, by - 148) * 0 + 2, e_mez(EC.nvS, C.k, 0.2)); disco(bx, by - 3, 4, C.k); disco(bx, by - 3, 3, hex('#8a5a2a')); disco(bx - 1, by - 4, 1, hex('#c88a4a')); linea(bx - 3, by - 3, bx + 3, by - 3, hex('#5a3a1a')); pset(bx, by - 6, hex('#5a3a1a')); pset(bx, by, hex('#5a3a1a')); }
  return { suelo: 150, horizonte: 104, balon: o.balon ?? [168, 148], trincheras: { izq: [0, 116, 104], der: [206, 319, 104] }, arbolito: [262, 100], tronco: [54, 118], zonaLibre: [76, 300] };
}

// delante en la tregua de cerca: una estaca con nieve y matas secas en las esquinas de abajo
function e_matasDelante(R, t, o) {
  const { rect, pset, linea } = R;
  { rect(8, 140, 12, 179, C.k); rect(9, 141, 11, 179, hex('#5a4a3a')); rect(9, 141, 9, 179, hex('#7a6a52')); rect(6, 138, 14, 140, EC.nvL); const s = Math.sin(t * 1.5) * 2; linea(12, 148, 22 + s, 152, hex('#b83a3a')); linea(12, 149, 21 + s, 154, hex('#8a2a2a')); }
  for (const [x0, k] of [[24, 0], [300, 1], [280, 2]]) for (let i = 0; i < 7; i++) { const sw = Math.sin(t * 2 + i + k) * 1.2; linea(x0 + i * 2, 179, Math.round(x0 + i * 2 + (i - 3) * 1.4 + sw), 179 - 10 - Math.round(h(i, k, 880) * 8), i % 2 ? hex('#a8844a') : hex('#6a4a2a')); }
}

// umbral del tramado ordenado 4 × 4 (transiciones tramadas limpias) y mezcla de dos colores del lienzo (0xAABBGGRR)
const d_BAYERMu = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_umbralMu = (x, y) => d_BAYERMu[((y & 3) << 2) | (x & 3)];

function d_mezclaMu(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// mezcla un color sobre el píxel que ya hay (para halos, resplandores y tintes)
const d_tintaMu = (R, x, y, c, a) => { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, d_mezclaMu(R.pget(x, y), c, a)); };

// capas fijas: se pintan una vez por lienzo y clave en un búfer de R.nuevo() (las transparentes, rellenas de VACIO)
const d_VACIOMu = 0x01020304;

const d_CAPASMu = new WeakMap();

function d_capaMu(R, clave, dibuja, vacio = true) {
  let m = d_CAPASMu.get(R); if (!m) d_CAPASMu.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(); if (vacio) b.fill(d_VACIOMu); const prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// pega una capa transparente sobre lo que hay (un recorrido de la pantalla, o solo de las filas y0–y1)
function d_pegarMu(R, b, y0 = 0, y1 = 179) { const B = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c !== d_VACIOMu) B[i] = c; } }

// la zona de Atom y la barra del año: ahí solo cosas tranquilas
const d_quietoMu = (x, y) => (x > 272 && y < 48) || (y < 15 && x > 16 && x < 174);

// degradado vertical tramado de [fracción, color] entre y0 e y1
function d_degradadoMu(R, y0, y1, P) {
  const B = R.buf, tr = 3, lim = P.map(([f]) => Math.round(y0 + f * (y1 - y0)));
  for (let y = y0; y <= y1; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = d_umbralMu(x, y) < p ? b : a;
  }
}

// estrellas que titilan (n, hasta la altura hor), con alguna en cruz
function d_estrellasMu(R, t, n, hor, sem, c0, c1) {
  for (let k = 0; k < n; k++) { const x = Math.round(h(k, 1, sem) * 319), y = Math.round(h(k, 2, sem) ** 1.3 * (hor - 4)); if (d_quietoMu(x, y)) continue;
    const tw = Math.sin(t * (1.3 + h(k, 3, sem) * 2.4) + k * 1.7); if (tw < -0.55) continue; R.pset(x, y, tw > 0.5 ? c1 : c0);
    if (k % 13 === 0 && tw > 0.7) { R.pset(x - 1, y, c0); R.pset(x + 1, y, c0); R.pset(x, y - 1, c0); R.pset(x, y + 1, c0); } }
}

// la luna llena con sus mares y su halo tramado (va en la capa del cielo)
function d_lunaMu(R, x, y, r, c, cS, halo) {
  for (let j = -r - 7; j <= r + 7; j++) for (let i = -r - 7; i <= r + 7; i++) { const d = Math.hypot(i, j), xx = x + i, yy = y + j; if (xx < 0 || xx > 319 || yy < 0 || yy > 179) continue;
    if (d <= r) { const mar = h((i + 40) >> 1, (j + 40) >> 1, 77) < 0.3 && d < r - 1.5; R.pset(xx, yy, d > r - 1 ? cS : mar || (i > r * 0.35 && d > r * 0.7) ? cS : c); }
    else if (d < r + 7 && d_umbralMu(xx, yy) < (r + 7 - d) / 12) R.pset(xx, yy, d_mezclaMu(R.pget(xx, yy), halo, 0.35)); }
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = [sombra, cuerpo, luz]
function d_nubeMu(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// las nubes que pasan: velos lejanos casi quietos y cúmulos a tres velocidades (los cercanos, grandes y rápidos);
// la esquina de Atom queda libre (las nubes se recortan por debajo de ella)
function d_nubesMu(R, t, hor, c, n = 5, v = 1, sem = 0) {
  for (let k = 0; k < 3; k++) { const w = 30 + Math.round(h(k, 5, 302 + sem) * 40), x0 = ((h(k, 6, 302 + sem) * 440 + t * (0.6 + k * 0.3) * v) % 470) - 80, y = Math.max(18, Math.round(hor * (0.2 + k * 0.12)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || d_quietoMu(x, y) || h(i >> 2, k, 303 + sem) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      R.pset(x, y, e > 0.35 ? c[1] : c[0]); if (e > 0.6 && i % 4) R.pset(x + 3, y - 1, c[2]); if (e > 0.5 && i % 5 === 0) R.pset(x - 4, y + 1, c[0]); } }
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 28 + k * 10 : 13 + ((k * 7) % 9), vel = (cerca ? 3.4 + k * 1.3 : 1.2 + k * 0.35) * v,
      y = Math.round(cerca ? Math.max(34, hor * 0.34) + k * hor * 0.13 : Math.max(26, hor * (0.42 + (k - 2) * 0.1))), x = ((h(k, 7, 302 + sem) * 470 + t * vel) % 500) - 90;
    if (x > 230 && y < 60) continue;   // ninguna nube grande cruza por detrás de Atom
    d_nubeMu(R, Math.round(x), y, w, k + sem, c); }
}

// pájaros que cruzan (dos píxeles de ala que baten)
function d_avesMu(R, t, n, y, c, v = 14, sem = 0) {
  for (let k = 0; k < n; k++) { const x = Math.round(((h(k, 1, 91 + sem) * 400 + t * v * (0.8 + h(k, 2, 91) * 0.5)) % 420) - 50), yy = Math.round(y + h(k, 3, 91) * 24 + Math.sin(t * 0.8 + k) * 2); if (d_quietoMu(x, yy)) continue;
    const b = Math.floor(t * 6 + k * 3) % 2; R.pset(x, yy, c); R.pset(x - 1, yy - b, c); R.pset(x + 1, yy - b, c); R.pset(x - 2, yy - 1 + b, c); R.pset(x + 2, yy - 1 + b, c); }
}

// la aurora: cortinas de rayos verticales que ondulan; base en y0 (se apaga hacia arriba), colores [base, cuerpo, alto]
// y fuerza 0–1; se funde con lo que hay detrás y respeta la esquina de Atom
function d_auroraMu(R, t, y0, alto, cols, fuerza = 1, x0 = 0, x1 = 319, sem = 0) {
  for (let x = x0; x <= x1; x++) {
    const yb = y0 + Math.sin(x * 0.021 + t * 0.35 + sem) * 9 + Math.sin(x * 0.057 - t * 0.6 + sem * 2) * 4, ray = 0.55 + 0.45 * Math.sin(x * 0.31 + t * 1.3 + Math.sin(x * 0.07 + t * 0.4) * 3);
    const len = alto * (0.6 + 0.4 * Math.sin(x * 0.013 + t * 0.2 + sem)), bord = Math.min(1, (x - x0) / 30, (x1 - x) / 30);
    for (let j = 0; j < len; j++) { const y = Math.round(yb - j); if (y < 0 || y > 179) continue; let a = (1 - j / len) * ray * fuerza * bord * (j < 3 ? j / 3 : 1);
      if (d_quietoMu(x, y)) a *= 0.25; if (a <= 0.05 || d_umbralMu(x, y) > a * 1.3) continue;
      const c = j < len * 0.18 ? cols[0] : j < len * 0.65 ? cols[1] : cols[2]; d_tintaMu(R, x, y, c, Math.min(0.85, a)); }
  }
}

// copos de nieve que caen con algo de viento (los cercanos, de 2 píxeles y más rápidos)
function d_nieveMu(R, t, n, c, cL, v = 1, viento = 6, y1 = 179) {
  for (let k = 0; k < n; k++) { const cerca = k % 5 === 0, vel = (cerca ? 26 : 12 + h(k, 2, 81) * 8) * v, y = ((h(k, 1, 81) * 200 + t * vel) % 200) - 10;
    if (y > y1) continue; const x = Math.round(((h(k, 3, 81) * 340 + t * viento + Math.sin(t * 1.3 + k) * 3) % 340 + 340) % 340) - 10, yy = Math.round(y);
    if (d_quietoMu(x, yy)) continue; R.pset(x, yy, cerca ? cL : c); if (cerca) { R.pset(x + 1, yy, c); R.pset(x, yy + 1, c); } }
}

// humo de chimenea: bocanadas que suben, se ensanchan, derivan y se deshacen
function d_humoMu(R, x, y, t, c, cS, n = 7, deriva = 0.4) {
  for (let k = 0; k < n; k++) { const u = ((t * 0.35 + k / n) % 1), yy = Math.round(y - u * 30), xx = Math.round(x + u * u * 18 * deriva + Math.sin(t * 1.5 + k) * 1.5), r = 1 + u * 3.2;
    if (d_quietoMu(xx, yy)) continue;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && d_umbralMu(xx + i, yy + j) < 0.75 - u * 0.6) R.pset(xx + i, yy + j, j > 0 ? cS : c); }
}

// halo tramado alrededor de una luz (se funde con lo que hay)
function d_haloMu(R, cx, cy, r, c, a = 0.5) {
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d >= 1) continue; const x = cx + i, y = cy + j; if (d_umbralMu(x, y) < (1 - d) * 1.1) d_tintaMu(R, x, y, c, a * (1 - d * 0.6)); }
}

// una cresta de montes: devuelve la y de cada columna (suma de senos con la semilla sem)
function d_crestaMu(y0, amp, sem, pico = null) {
  const cr = new Int16Array(320);
  for (let x = 0; x < 320; x++) { let y = y0 - amp * (0.55 + 0.3 * Math.sin(x * 0.019 + sem) + 0.14 * Math.sin(x * 0.051 + sem * 2.3) + 0.08 * Math.sin(x * 0.13 + sem * 4.1));
    if (pico) for (const [px, py, an] of pico) y = Math.min(y, py + Math.abs(x - px) * an + Math.sin(x * 0.4) * 1.2); cr[x] = Math.round(y); }
  return cr;
}

// montes nevados con relieve: la ladera que mira a la luz, clara; la otra, en sombra; la nieve hasta la cota de nieve,
// con canales de roca; y abajo se funde con la bruma. P = { roca, rocaS, nieve, nieveS, nieveL, bruma }
function d_montesMu(R, cr, yb, P, cota = 18, sem = 0) {
  const B = R.buf;
  for (let x = 0; x < 320; x++) { const pend = cr[Math.min(319, x + 2)] - cr[Math.max(0, x - 2)];
    for (let y = Math.max(0, cr[x]); y <= yb; y++) { const d = y - cr[x], canal = h(x >> 1, (y + x * 0.6) >> 2, 61 + sem) < 0.18 + d / 90, luz = pend > 0 ? 1 : pend < -1 ? -1 : 0;
      let c = d < cota + Math.sin(x * 0.2 + sem) * 4 && !canal ? (luz > 0 ? (d < 2 ? P.nieveL : P.nieve) : luz < 0 ? P.nieveS : P.nieve) : (luz < 0 ? P.rocaS : P.roca);
      const p = (y - yb + 8) / 9; if (p > 0 && d_umbralMu(x, y) < p) c = P.bruma; B[y * 320 + x] = c; } }
}

// un abeto: pisos triangulares de ramas con nieve encima (cols = [oscuro, medio, nieve])
function d_abetoMu(R, x, base, alto, cols, nieve = true) {
  const pisos = Math.max(3, Math.round(alto / 5));
  R.rect(x, base - 2, x, base, cols[0]);
  for (let p = 0; p < pisos; p++) { const yt = base - 2 - alto + p * (alto / pisos), hh = alto / pisos + 2, w0 = 1 + p * (alto * 0.28 / pisos) + 1;
    for (let j = 0; j <= hh; j++) { const w = Math.round(w0 * j / hh), y = Math.round(yt + j); R.rect(x - w, y, x + w, y, j < 2 && nieve ? cols[2] : cols[(x + j) % 3 === 0 ? 0 : 1]); if (w > 1) R.pset(x + w, y, cols[0]); }
    if (nieve) { const y = Math.round(yt + hh * 0.35), w = Math.round(w0 * 0.35); R.rect(x - w, y, x + w - 1, y, cols[2]); } }
}

// tablas de madera (verticales u horizontales) con su junta, vetas y nudos, y la luz en un canto
function d_tablasMu(R, x0, y0, x1, y1, c, cS, cL, ancho = 4, vertical = true, sem = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = vertical ? x - x0 : y - y0, b = vertical ? y : x, k = Math.floor(a / ancho), m = a % ancho;
    let col = m === ancho - 1 ? cS : m === 0 ? cL : c; const v = h(k, b >> 2, 51 + sem);
    if (m > 0 && m < ancho - 1 && v < 0.12) col = cS; if (h(k, b, 52 + sem) < 0.012) col = cS;
    R.pset(x, y, col); }
}

// muro de sillares o mampostería: piedras de tamaño variable con junta, luz arriba y sombra abajo (cols = [base, sombra, luz, junta])
function d_piedrasMu(R, x0, y0, x1, y1, cols, alto = 6, largo = 11, sem = 0) {
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), dy = (y - y0) % alto;
    for (let x = x0; x <= x1; x++) { const off = Math.floor(h(fila, 0, 41 + sem) * largo), xx = x - x0 + off, pieza = Math.floor(xx / largo), dx = xx % largo, v = h(pieza, fila, 42 + sem);
      let c = dy === alto - 1 || dx === largo - 1 ? cols[3] : dy === 0 ? cols[2] : dy === alto - 2 ? cols[1] : v < 0.33 ? cols[1] : cols[0];
      if (h(x, y, 43 + sem) < 0.05) c = cols[1]; R.pset(x, y, c); } }
}

// enlucido con su textura: manchas suaves, poros y algún desconchón (cols = [base, sombra, luz])
function d_estucoMu(R, x0, y0, x1, y1, cols, sem = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const m = h(x >> 3, y >> 3, 31 + sem) * 0.6 + h(x >> 1, y >> 1, 32 + sem) * 0.4;
    R.pset(x, y, m > 0.8 ? cols[2] : m < 0.16 || h(x, y, 33 + sem) < 0.02 ? cols[1] : cols[0]); }
}

// una ventana iluminada: marco, interior cálido en degradado con el resplandor de una lámpara, cruz, alféizar (con nieve)
// o = { marco, marcoS, luz, luzS, cruz, nieve, cortina, adviento (candelabro de siete velas), estrella (de papel) }
function d_ventanaMu(R, x0, y0, x1, y1, o = {}) {
  const { rect, pset } = R, w = x1 - x0, hh = y1 - y0;
  rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, o.marcoS ?? C.k); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, o.marco ?? hex('#f2ece0'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const g = Math.hypot((x - x0 - w * 0.5) / w, (y - y1 + 2) / hh); pset(x, y, g < 0.45 ? (o.luzL ?? o.luz) : g < 0.75 ? o.luz : o.luzS); }
  if (o.cortina != null) for (let y = y0; y <= y1; y++) { const a = Math.round(2 + (y - y0) * 0.25); for (let i = 0; i < a && i < w / 3; i++) { pset(x0 + i, y, (i + y) % 3 ? o.cortina : o.cortinaS ?? o.cortina); pset(x1 - i, y, (i + y) % 3 ? o.cortina : o.cortinaS ?? o.cortina); } }
  if (o.adviento) { const cx = Math.round((x0 + x1) / 2), yb = y1 - 1; for (let k = -3; k <= 3; k++) { const yy = yb - 4 + Math.abs(k); rect(cx + k * 2, yy, cx + k * 2, yb, hex('#f4ecd8')); pset(cx + k * 2, yy - 1, hex('#fff6b0')); } rect(cx - 7, yb, cx + 7, yb, hex('#6a4a2a')); }
  if (o.estrella) { const cx = Math.round((x0 + x1) / 2), cy = y0 + 4; for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4; for (let d = 0; d <= 3; d++) { pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), hex('#fff0c0')); pset(Math.round(cx - Math.cos(a) * d), Math.round(cy - Math.sin(a) * d), hex('#fff0c0')); } } pset(cx, cy, hex('#ffffff')); rect(cx, y0, cx, cy - 3, hex('#8a7a5a')); }
  if (o.cruz !== false) { const mx = Math.round((x0 + x1) / 2), my = Math.round((y0 + y1) / 2); rect(mx, y0, mx, y1, o.marco ?? hex('#f2ece0')); rect(x0, my, x1, my, o.marco ?? hex('#f2ece0')); }
  rect(x0 - 3, y1 + 2, x1 + 3, y1 + 3, o.marcoS ?? C.k); rect(x0 - 3, y1 + 2, x1 + 3, y1 + 2, o.marco ?? hex('#f2ece0'));
  if (o.nieve) { rect(x0 - 3, y1 + 1, x1 + 3, y1 + 1, o.nieve); for (let x = x0 - 3; x <= x1 + 3; x++) if (h(x, y1, 21) < 0.4) pset(x, y1, o.nieve); }
}

// una persona pequeña de fondo (6–10 px): cabeza, gorro, cuerpo, piernas que andan; o = { c, cS, piel, gorro, dir, anda, alto }
function d_genteMu(R, x, suelo, t, o = {}) {
  const { pset } = R, al = o.alto ?? 9, paso = o.anda ? Math.floor(t * 6 + x) % 2 : 0, c = o.c ?? hex('#3a4a6a'), cS = o.cS ?? d_mezclaMu(c, C.k, 0.35), dir = o.dir ?? 1;
  pset(x - 1 + paso, suelo, C.k); pset(x + 1 - paso, suelo, C.k); pset(x - 1 + paso, suelo - 1, o.pierna ?? hex('#2a2a3a')); pset(x + 1 - paso, suelo - 1, o.pierna ?? hex('#2a2a3a'));
  const tb = suelo - 2, tt = suelo - al + 3; for (let y = tt; y <= tb; y++) for (let i = -1; i <= 1; i++) pset(x + i, y, i === dir ? cS : c);
  pset(x - 2, tt + 1, cS); pset(x + 2, tt + 1, cS);
  pset(x, tt - 1, o.piel ?? hex('#e8b890')); pset(x + dir, tt - 1, o.piel ?? hex('#e8b890')); pset(x - dir, tt - 1, o.pelo ?? hex('#3a2a1a'));
  if (o.gorro) { pset(x - 1, tt - 2, o.gorro); pset(x, tt - 2, o.gorro); pset(x + 1, tt - 2, o.gorro); pset(x, tt - 3, o.gorroL ?? o.gorro); } else { pset(x, tt - 2, o.pelo ?? hex('#3a2a1a')); pset(x - 1, tt - 2, o.pelo ?? hex('#3a2a1a')); }
}

// guirnalda de bombillas colgada entre dos puntos (con su comba), que titilan con t; cols = colores de las bombillas
function d_guirnaldaMu(R, x0, y0, x1, y1, comba, t, cols, paso = 6, cable = null, sem = 0) {
  const n = Math.max(2, Math.round(Math.abs(x1 - x0) / 1.5)), pt = (u) => [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * comba];
  if (cable != null) for (let i = 0; i <= n; i++) { const [x, y] = pt(i / n); if (!d_quietoMu(Math.round(x), Math.round(y))) R.pset(Math.round(x), Math.round(y), cable); }
  const m = Math.max(1, Math.round(Math.abs(x1 - x0) / paso));
  for (let k = 0; k <= m; k++) { const [x, y] = pt(k / m), xx = Math.round(x), yy = Math.round(y) + 1; if (d_quietoMu(xx, yy)) continue; const on = Math.sin(t * 2.2 + k * 1.9 + sem) > -0.3, c = cols[(k + sem) % cols.length];
    R.pset(xx, yy, on ? c : d_mezclaMu(c, C.k, 0.55)); if (on && k % 2 === 0) d_tintaMu(R, xx, yy + 1, c, 0.35); }
}

// una bota o zapato de lado (mira a la derecha): suela, tacón, punta redondeada con su brillo, caña (alta si o.cana),
// cordones o costura; x: talón, base: el suelo; s: escala (1 = 14 px de largo); cols = [cuero, sombra, luz, suela]
function d_botaMu(R, x, base, s, cols, o = {}) {
  const [c, cS, cL, su] = cols, X = (u) => Math.round(x + u * s), Y = (v) => Math.round(base + v * s), cana = o.cana ?? 9;
  const pts = [[0, -1], [0, -5 - cana], [6, -5 - cana], [6.5, -6], [10, -5], [13, -3.5], [14, -1.5], [14, -1], [0, -1]].map(([u, v]) => [X(u), Y(v)]);
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(pts.map(([a, b]) => [a + dx, b + dy]), C.k);
  R.poligono(pts, (xx, yy) => { const u = (xx - x) / s, v = (yy - base) / s; if (u > 5 && v > -4.5 && v < -3.4 && u < 12) return cL; if (u < 1.2) return cL; if (u > 4.6 && u < 6 && v < -5) return cS; if (v > -2) return cS; return c; });
  R.rect(X(-0.5), Y(-1), X(14.5), Y(0), su); R.rect(X(0), Y(-1.6), X(3), Y(0), su);
  R.rect(X(-0.4), Y(-5 - cana), X(6.4), Y(-4 - cana), cS);
  for (let v = -4 - cana + 2; v < -5; v += 2.2) { R.pset(X(4.8), Y(v), cL); R.pset(X(5.6), Y(v + 0.6), cL); }
}

const d_GVMu = pal({
  c0: '#060a20', c1: '#0c1434', c2: '#142246', c3: '#1c3256', c4: '#284860', est: '#7a88b8', estL: '#e8f0ff',
  au0: '#3ae0a0', au1: '#2aa880', au2: '#5a5ab0', bosque: '#0a1620', bosqueL: '#14263a', nieveB: '#a6b6d2',
  nieve: '#98a8c6', nieveS: '#7486aa', nieveSS: '#55658c', nieveL: '#dce6f4', huella: '#6a7aa0', adoquin: '#4a4a5a', adoquinL: '#6a6a7a',
  luz: '#ffd890', luzL: '#fff4c8', luzS: '#e89a48', calido: '#ffb060', marco: '#e8e2d4', k: '#10121c',
  tejadoS: '#8a9ab8', chimenea: '#4a3a3a', poste: '#24242e', posteL: '#4a4a5a', valla: '#9aa2b0', vallaS: '#5a6270', bloque: '#7a7a82', bloqueS: '#4a4a52',
  foco: '#e8e8f0', focoS: '#5a5a66', abeto: '#123a2a', abetoS: '#0a2418', abetoM: '#1a4a34',
});

const d_CASASGVMu = [
  // [x0, x1, alero, color, tejado: 'frontón' | 'faldón']
  [-6, 30, 92, '#8a2a22', 'fronton'], [30, 64, 98, '#c8963a', 'faldon'], [64, 98, 88, '#6a8296', 'fronton'], [98, 136, 96, '#d8c070', 'faldon'],
  [136, 170, 90, '#5a7a5a', 'fronton'], [170, 206, 96, '#8a2a22', 'faldon'], [206, 240, 90, '#c8a46a', 'fronton'], [240, 276, 98, '#6a5a7a', 'faldon'], [276, 326, 92, '#8a2a22', 'fronton'],
];

const d_PAJAMu = pal({ l: '#f4d890', m: '#d4aa5a', s: '#a07834', ss: '#64461c', k: '#22160c', rojo: '#c8202a', rojoL: '#f0605a', rojoS: '#701018' });

// la cabra de paja (mira a la izquierda): patas, cuerpo, cuello, cabeza con barba y orejas, cuernos curvos y rabo; la paja
// en hebras (horizontales en el cuerpo, verticales en las patas) con luz de los focos abajo a la izquierda y lazos rojos
// en las patas, el cuerpo y el cuello. cx: centro del cuerpo; base: el suelo de las pezuñas; s: escala (1 = 116 px de alto)
function d_cabraMu(R, cx, base, s) {
  const P = d_PAJAMu, X = (u) => cx + u * s, Y = (v) => base + v * s;
  const tono = (x, y, sh, vert) => { const ln = vert ? Math.floor((x + Math.sin(y * 0.45) * 1.2) / 2) : Math.floor((y + Math.sin(x * 0.4) * 1.3) / 2), val = h(ln, vert ? y >> 3 : x >> 3, 70), q = sh + (val - 0.5) * 0.4;
    if (h(vert ? x : x >> 2, vert ? y >> 2 : y, 71) < 0.06) return P.s; if (h(vert ? x : x >> 2, vert ? y >> 2 : y, 72) < 0.05 && sh < 0.6) return P.l; return q < 0.22 ? P.l : q < 0.52 ? P.m : q < 0.8 ? P.s : P.ss; };
  const cinta = (sh) => sh < 0.4 ? P.rojoL : sh < 0.72 ? P.rojo : P.rojoS;
  const forma = (pts, col) => { const q = pts.map(([u, v]) => [X(u), Y(v)]); for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(q.map(([x, y]) => [x + dx, y + dy]), P.k); R.poligono(q, col); };
  const pata = (lx, lejos) => forma([[lx - 4, -38], [lx + 4, -38], [lx + 3.4, 0], [lx - 3.4, 0]], (x, y) => { const u = (x - cx) / s, v = (y - base) / s, sh = Math.min(1, 0.2 + ((u - lx) / 8 + 0.5) * 0.45 + (lejos ? 0.35 : 0));
    if (v > -4) return lejos ? P.ss : P.s; if ((v > -15 && v < -11) || (v > -28 && v < -24.5)) return cinta(sh); return tono(x, y, sh, true); });
  pata(-12, true); pata(36, true);
  // el cuerno de atrás
  const cuerno = (du, dv, lejos) => { for (let a = 0; a <= 1.001; a += 0.02) { const u = -50 + 27 * a + du, v = -98 - 15 * Math.sin(a * Math.PI) - 3 * a + dv, r = (4.6 * (1 - a) + 1.6) * s * 0.5; R.disco(X(u), Y(v), r + 1, P.k); }
    for (let a = 0; a <= 1.001; a += 0.02) { const u = -50 + 27 * a + du, v = -98 - 15 * Math.sin(a * Math.PI) - 3 * a + dv, r = (4.6 * (1 - a) + 1.6) * s * 0.5;
      R.disco(X(u), Y(v), r, (x, y) => { const ar = Math.floor(a * 9) % 3 === 0 && a < 0.8; return ar ? (lejos ? P.rojoS : P.rojo) : tono(x, y, (lejos ? 0.5 : 0.15) + (y - Y(v)) / (r + 1) * 0.3, false); }); } };
  cuerno(7, -2, true);
  forma([[36, -62], [46, -73], [44, -60]], (x, y) => tono(x, y, 0.5, false));   // el rabo
  forma([[-36, -58], [-28, -67], [-8, -70], [18, -69], [34, -64], [40, -54], [38, -40], [30, -33], [-24, -32], [-34, -38], [-38, -48]], (x, y) => {
    const u = (x - cx) / s, v = (y - base) / s, sh = Math.max(0, Math.min(1, 0.45 * (u + 36) / 76 + 0.55 * (-32 - v) / 38));
    for (const b of [-20, 4, 26]) if (Math.abs(u - b - (v + 50) * 0.08) < 1.9) return cinta(sh);
    if (v > -35.5) return P.ss; return tono(x, y, sh, false); });
  pata(-26, false); pata(24, false);
  forma([[-24, -64], [-32, -44], [-50, -74], [-57, -88], [-44, -93], [-36, -80]], (x, y) => { const u = (x - cx) / s, v = (y - base) / s, sh = Math.max(0, Math.min(1, 0.25 + (u + 50) / 30 * 0.4 + (-v - 60) / 40 * 0.3)), d = v + 0.9 * (u + 40);
    if (Math.abs(d + 34) < 2.2) return cinta(sh); return tono(x, y, sh, false); });
  forma([[-58, -101], [-48, -105], [-40, -99], [-42, -88], [-54, -80], [-65, -76], [-71, -80], [-67, -89]], (x, y) => { const v = (y - base) / s, u = (x - cx) / s; return tono(x, y, Math.max(0, Math.min(1, 0.15 + (-v - 78) / 28 * 0.5 + (u + 70) / 30 * 0.2)), false); });
  forma([[-64, -79], [-57, -81], [-60, -66]], (x, y) => tono(x, y, 0.45, true));   // la barba
  forma([[-44, -97], [-33, -98], [-38, -92]], (x, y) => tono(x, y, 0.35, false));   // la oreja
  R.disco(X(-56), Y(-93), Math.max(1, s * 1.4), P.k); R.pset(Math.round(X(-56)) - 1, Math.round(Y(-93)) - 1, P.l);   // el ojo
  R.pset(Math.round(X(-69)), Math.round(Y(-80)), P.k);
  cuerno(0, 0, false);
}

// valla de obra (paneles de malla con marco, bloques de hormigón con nieve): base, alto, de x0 a x1, panel de w px
function d_vallaMu(R, x0, x1, base, alto, w, P) {
  for (let px = x0; px < x1; px += w) { const xa = px, xb = Math.min(x1, px + w - 1), yt = base - alto;
    for (let y = yt + 1; y < base - 2; y++) for (let x = xa + 1; x < xb; x++) if ((x - xa) % 3 === 0 || (y - yt) % 4 === 0) R.pset(x, y, (x + y) % 5 ? P.vallaS : P.valla);
    R.rect(xa, yt, xa, base - 2, P.valla); R.rect(xb, yt, xb, base - 2, P.vallaS); R.rect(xa, yt, xb, yt, P.valla); R.rect(xa, base - 3, xb, base - 3, P.vallaS);
    R.rect(xa - 3, base - 2, xa + 3, base, P.bloque); R.rect(xa - 3, base, xa + 3, base, P.bloqueS); R.rect(xa - 3, base - 3, xa + 3, base - 3, P.nieveL); }
  R.rect(x1 - 3, base - 2, x1 + 3, base, P.bloque); R.rect(x1, base - alto, x1, base - 2, P.vallaS);
}

// una casa de madera sueca: tablas verticales del color dado (apagado por la noche), esquineras blancas, ventanas con
// candelabros de Adviento o estrellas de papel, puerta, tejado nevado con chimenea; apunta las ventanas en vent
function d_casaGVMu(R, x0, x1, alero, col, tipo, base, P, vent, k) {
  const c = d_mezclaMu(hex(col), P.c2, 0.38), cS = d_mezclaMu(c, P.k, 0.35), cL = d_mezclaMu(c, P.luz, 0.12);
  d_tablasMu(R, x0, alero, x1, base, c, cS, cL, 3, true, k);
  R.rect(x0, alero, x0 + 1, base, P.marco); R.rect(x1 - 1, alero, x1, base, d_mezclaMu(P.marco, P.k, 0.3)); R.rect(x0, base - 2, x1, base, d_mezclaMu(c, P.k, 0.5));
  if (tipo === 'fronton') { const cx = (x0 + x1) / 2, top = alero - (x1 - x0) * 0.42;
    R.poligono([[x0 - 3, alero + 1], [cx, top - 2], [x1 + 3, alero + 1]], P.k); R.poligono([[x0 - 2, alero], [cx, top], [x1 + 2, alero]], (x, y) => (y - top) < 3 + Math.abs(x - cx) * 0.1 ? P.nieveL : (x < cx ? P.nieve : P.nieveS));
    R.poligono([[x0 + 4, alero - 1], [cx, top + 5], [x1 - 4, alero - 1]], (x, y) => d_mezclaMu(c, P.k, (y + x) % 3 ? 0.15 : 0.3)); d_ventanaMu(R, Math.round(cx) - 2, alero - 9, Math.round(cx) + 2, alero - 5, { luz: P.luz, luzS: P.luzS, marcoS: P.k, marco: P.marco }); vent.push([Math.round(cx) - 2, alero - 9, Math.round(cx) + 2, alero - 5]);
    for (let i = 0; i < 6; i++) R.pset(Math.round(x0 - 2 + i * (x1 - x0 + 4) / 5), alero + 1 + (i % 2), P.nieveL); }
  else { R.rect(x0 - 3, alero - 9, x1 + 3, alero, P.k); for (let y = alero - 8; y <= alero - 1; y++) for (let x = x0 - 2; x <= x1 + 2; x++) R.pset(x, y, y < alero - 6 ? P.nieveL : (x + y * 2) % 7 === 0 ? P.nieveS : y === alero - 1 ? P.nieveSS : P.nieve);
    const ch = x0 + Math.round((x1 - x0) * 0.7); R.rect(ch, alero - 16, ch + 4, alero - 8, P.chimenea); R.rect(ch - 1, alero - 17, ch + 5, alero - 16, P.nieveL); R.rect(ch + 3, alero - 15, ch + 4, alero - 9, P.k); }
  for (let y = alero + 1; y < alero + 4; y++) if (h(x0, y, 9) < 2) for (let x = x0 + 2; x < x1 - 1; x += 3 + (x % 2)) if (h(x, 1, 8) < 0.35) R.rect(x, alero + 1, x, alero + 1 + Math.round(h(x, 2, 8) * 3), P.nieveL);   // carámbanos
  const nv = Math.max(1, Math.floor((x1 - x0 - 6) / 13));
  for (let f = 0; f < 2; f++) for (let i = 0; i < nv; i++) { const wx = x0 + 5 + i * 13 + Math.round((x1 - x0 - 6 - nv * 13) / 2), wy = alero + 5 + f * 15; if (wy + 9 > base - 3) continue;
    if (f === 1 && i === nv - 1 && nv > 1) { R.rect(wx, wy - 1, wx + 7, base - 2, P.k); R.rect(wx + 1, wy, wx + 6, base - 2, d_mezclaMu(c, P.k, 0.45)); R.pset(wx + 5, wy + 6, P.luz); continue; }
    const on = h(wx, wy, k) < 0.8; d_ventanaMu(R, wx, wy, wx + 6, wy + 8, { luz: on ? P.luz : d_mezclaMu(P.c2, P.k, 0.3), luzS: on ? P.luzS : P.k, luzL: on ? P.luzL : P.c2, marco: P.marco, marcoS: P.k, nieve: P.nieveL, adviento: on && (i + f) % 2 === 0, estrella: on && (i + f) % 2 === 1 });
    if (on) vent.push([wx, wy, wx + 6, wy + 8]); }
}

function d_gavleMu(R, t, o, cam) {
  const P = d_GVMu, gen = cam !== 'cabra', hor = gen ? 100 : 140, vd = !!o.vallaDelante;
  R.copiar(d_capaMu(R, 'gv-cielo-' + cam, () => { d_degradadoMu(R, 0, 179, [[0, P.c0], [0.22, P.c1], [0.42, P.c2], [0.52, P.c3], [0.6, P.c4], [1, P.c4]]); }, false));
  d_estrellasMu(R, t, 90, hor, 401, P.est, P.estL);
  d_auroraMu(R, t, gen ? 64 : 56, gen ? 34 : 40, [P.au0, P.au1, P.au2], gen ? 0.32 : 0.42, 0, 319, 1.3);
  const res = o.resplandor ?? 0, [gx, gy] = gen ? [212, 92] : [190, 70];
  if (res > 0) { const fl = 0.85 + 0.15 * Math.sin(t * 9) * Math.sin(t * 5.3), r = Math.round((gen ? 70 : 110) * (0.6 + 0.4 * res));
    d_haloMu(R, gx, gy, r, hex('#ff7a2a'), 0.55 * res * fl); d_haloMu(R, gx, gy + 10, Math.round(r * 0.55), hex('#ffc060'), 0.5 * res * fl); }
  const V = [];
  const fr = d_capaMu(R, 'gv-' + cam + (vd ? '-vd' : ''), () => {
    if (gen) {
      // el bosque lejano y la aguja de la iglesia
      const cr = d_crestaMu(98, 6, 2.1); for (let x = 0; x < 320; x++) R.rect(x, cr[x], x, 100, P.bosque);
      for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 402) * 319); d_abetoMu(R, x, cr[x] + 3, 6 + Math.round(h(k, 2, 402) * 6), [P.bosque, P.bosqueL, d_mezclaMu(P.nieveSS, P.bosque, 0.3)]); }
      R.rect(30, 58, 38, 98, P.bosque); R.poligono([[29, 59], [34, 30], [39, 59]], P.bosque); R.rect(33, 26, 34, 31, P.bosque); R.rect(31, 28, 36, 28, P.bosque); R.disco(34, 66, 2, P.luzS); R.pset(34, 66, P.luz);
      for (const [x0, x1, al, col, tipo] of d_CASASGVMu) d_casaGVMu(R, x0, x1, al, col, tipo, 124, P, [], x0 + 9);
      // el suelo de la plaza: nieve pisada con calvas de adoquín, rodadas, huellas y los charcos de luz de las farolas
      for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (y - 124) / 56, calva = h(x >> 2, y >> 1, 403) < 0.06 + 0.04 * Math.sin(x * 0.05) && y > 128, rod = Math.abs(((x - 10 - (y - 124) * 1.6) % 70 + 70) % 70 - 4) < 2 && y > 140;
        let c = d < 0.08 ? P.nieveSS : h(x >> 1, y, 404) < 0.5 - d * 0.3 ? P.nieve : P.nieveB; if (calva) c = (x + y) % 4 ? P.adoquin : P.adoquinL; else if (rod) c = P.nieveS; else if (h(x, y, 405) < 0.02) c = P.nieveL;
        for (const [lx, ly] of [[22, 150], [300, 150], [128, 160]]) { const e = ((x - lx) / 38) ** 2 + ((y - ly) / 12) ** 2; if (e < 1 && d_umbralMu(x, y) < (1 - e) * 0.8) c = d_mezclaMu(c, P.luz, 0.3); }
        R.pset(x, y, c); }
      for (let k = 0; k < 9; k++) { const y0 = 140 + k * 5, a = h(k, 1, 407) * 300; for (let x = 0; x < 320; x++) { const y = Math.round(y0 + Math.sin(x * 0.05 + a) * 2 + Math.sin(x * 0.13 + k) * 1); if (h(x >> 3, k, 408) < 0.55) { R.pset(x, y, P.nieveL); if (h(x, k, 409) < 0.5) R.pset(x, y + 1, P.nieveS); } } }   // las ondas del viento en la nieve
      for (let k = 0; k < 30; k++) { const x = Math.round(20 + k * 9 + Math.sin(k) * 4), y = 168 - Math.round(k * 0.9) + (k % 2) * 2; R.pset(x, y, P.huella); R.pset(x + 1, y, P.huella); }
      for (let k = 0; k < 16; k++) { const x = 40 + k * 6, y = 132 + (k % 2) * 2; R.pset(x, y, P.huella); }
      // el abeto de la plaza (las luces van con t)
      d_abetoMu(R, 66, 128, 38, [P.abetoS, P.abetoM, P.nieveL]); R.rect(62, 128, 70, 130, P.chimenea);
      // un puesto del mercado de Navidad: tablas, tejadillo nevado, guirnalda, mercancía en el mostrador
      d_tablasMu(R, 4, 118, 40, 140, hex('#5a3a24'), hex('#3a2416'), hex('#7a5034'), 3, true, 11); R.rect(6, 122, 38, 131, hex('#2a1810')); for (let k = 0; k < 8; k++) { R.rect(8 + k * 4, 126, 10 + k * 4, 130, [hex('#c83a3a'), hex('#e8c060'), hex('#5a8a5a'), hex('#e8e0d0')][k % 4]); R.pset(9 + k * 4, 125, P.luzS); }
      R.rect(2, 131, 42, 133, hex('#7a5034')); R.rect(2, 133, 42, 133, hex('#3a2416')); R.poligono([[0, 119], [8, 110], [36, 110], [44, 119]], P.k); R.poligono([[1, 118], [8, 111], [36, 111], [43, 118]], (x, y) => y < 113 ? P.nieveL : (x + y) % 5 ? P.nieve : P.nieveS);
      R.rect(4, 133, 5, 140, hex('#3a2416')); R.rect(39, 133, 40, 140, hex('#3a2416'));
      // la caseta del vigilante, con su ventanilla y el poste de la cámara
      d_tablasMu(R, 90, 126, 120, 150, d_mezclaMu(hex('#8a2a22'), P.c2, 0.3), hex('#4a1a18'), hex('#a8443a'), 3, true, 7);
      R.rect(88, 120, 122, 125, P.k); R.rect(89, 119, 121, 122, P.nieveL); R.rect(89, 123, 121, 124, P.nieveS); R.rect(90, 126, 91, 150, P.marco); R.rect(119, 126, 120, 150, P.marco);
      d_ventanaMu(R, 106, 131, 116, 139, { luz: P.luz, luzS: P.luzS, luzL: P.luzL, marco: P.marco, marcoS: P.k }); R.rect(94, 132, 102, 150, P.k); R.rect(95, 133, 101, 150, hex('#5a2018')); R.pset(100, 142, P.luz);
      R.rect(116, 112, 117, 119, P.posteL);
      R.rect(134, 100, 135, 150, P.poste); R.rect(136, 100, 136, 150, P.posteL); R.rect(131, 96, 141, 101, P.k); R.rect(132, 97, 140, 100, P.posteL); R.rect(141, 98, 142, 99, P.foco); R.rect(132, 95, 140, 95, P.nieveL);
      // la valla de atrás, la cabra, los focos y la valla de delante
      d_vallaMu(R, 152, 284, 142, 16, 22, P);
      d_cabraMu(R, 215, 150, 0.8);
      for (const [fx, d] of [[158, 1], [280, -1]]) { R.linea(fx, 150, fx - 3, 156, P.poste); R.linea(fx, 150, fx + 3, 156, P.poste); R.rect(fx - 3, 144, fx + 3, 149, P.k); R.rect(fx - 2, 145, fx + 2, 148, P.focoS); R.rect(fx + (d > 0 ? 2 : -2), 145, fx + (d > 0 ? 3 : -3), 148, P.luzL); }
      if (!vd) d_vallaMu(R, 146, 288, 160, 22, 22, P);
      // las farolas
      for (const lx of [22, 300]) { R.rect(lx - 1, 106, lx + 1, 150, P.poste); R.rect(lx - 2, 146, lx + 2, 150, P.posteL); R.rect(lx - 3, 100, lx + 3, 106, P.k); R.rect(lx - 2, 101, lx + 2, 105, P.luz); R.rect(lx - 4, 99, lx + 4, 99, P.nieveL); R.pset(lx, 98, P.k); }
    } else {
      // de cerca: casas bajas al fondo a la izquierda, la plaza, la cabeza de la cabra y la valla
      const cr = d_crestaMu(132, 6, 3.3); for (let x = 0; x < 320; x++) R.rect(x, cr[x], x, 140, P.bosque);
      for (const [x0, x1, al, col, tipo] of [[-4, 30, 112, '#c8963a', 'faldon'], [30, 66, 106, '#8a2a22', 'fronton'], [66, 104, 114, '#6a8296', 'faldon'], [104, 140, 108, '#d8c070', 'fronton']]) d_casaGVMu(R, x0, x1, al, col, tipo, 140, P, [], x0 + 3);
      for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { let c = h(x >> 1, y, 404) < 0.5 ? P.nieve : P.nieveB; if (h(x >> 2, y >> 1, 403) < 0.05) c = P.adoquin; if (h(x, y, 405) < 0.02) c = P.nieveL; R.pset(x, y, c); }
      d_cabraMu(R, 262, 236, 1.9);
      for (let x = 0; x < 320; x++) { const yb = 179; for (let y = 150; y <= yb; y++) { const e = ((x - 40) / 70) ** 2 + ((y - 168) / 16) ** 2; if (e < 1 && d_umbralMu(x, y) < (1 - e) * 0.7) R.pset(x, y, d_mezclaMu(R.pget(x, y), P.luz, 0.25)); } }
      R.linea(20, 170, 16, 178, P.poste); R.linea(20, 170, 24, 178, P.poste); R.rect(15, 160, 25, 169, P.k); R.rect(16, 161, 24, 168, P.focoS); R.rect(24, 161, 26, 168, P.luzL);
      if (!vd) d_vallaMu(R, -10, 330, 182, 40, 30, P);
    }
  });
  d_pegarMu(R, fr);
  // la vida: humo de las chimeneas, las luces del abeto, las farolas, gente que pasa, la cámara que parpadea, la nieve
  if (gen) {
    for (const [x0, x1, al, , tipo] of d_CASASGVMu) if (tipo === 'faldon' && (x0 < 150 || x0 > 262)) d_humoMu(R, x0 + Math.round((x1 - x0) * 0.7) + 2, al - 18, t + x0, hex('#4a5878'), hex('#34405a'), 6, 0.6);
    for (let k = 0; k < 22; k++) { const a = k / 22, y = Math.round(94 + a * 32), w = Math.round(a * 11), x = 66 + Math.round(Math.sin(k * 2.4) * w), on = Math.sin(t * 3 + k * 1.7) > -0.2; R.pset(x, y, on ? [hex('#ff5050'), P.luz, hex('#60c0ff')][k % 3] : P.abetoS); }
    for (let k = 0; k < 7; k++) R.pset(4 + k * 6, 119 + (k % 2), Math.sin(t * 3 + k) > 0 ? P.luz : hex('#ff6060'));
    R.pset(66, 89, Math.sin(t * 4) > 0 ? P.luzL : P.luz); R.pset(65, 90, P.luz); R.pset(67, 90, P.luz);
    for (const lx of [22, 300]) d_haloMu(R, lx, 103, 12, P.luz, 0.35 + 0.05 * Math.sin(t * 7 + lx));
    if (Math.floor(t * 1.5) % 2) R.pset(132, 98, hex('#ff3030'));
    d_humoMu(R, 116, 110, t, hex('#5a6888'), hex('#3a4660'), 5, 0.8);
    R.recorte([0, 0, 150, 179]);
    for (let k = 0; k < 3; k++) { const dir = k % 2 ? -1 : 1, x = Math.round(dir > 0 ? ((t * (6 + k * 2) + k * 70) % 190) - 20 : 170 - ((t * (5 + k) + k * 50) % 190)); d_genteMu(R, x, 127 + k, t, { c: [hex('#2a3a5a'), hex('#5a2a2a'), hex('#3a4a3a')][k], gorro: [hex('#c83a3a'), hex('#e8e0d0'), hex('#3a6ab8')][k], dir, anda: true, alto: 8 }); }
    { const x = Math.round(((t * 9) % 200) - 30), y = 136; d_genteMu(R, x, y, t, { c: hex('#4a3a6a'), gorro: hex('#f0c040'), dir: 1, anda: Math.floor(t * 2) % 2 === 0, alto: 9 }); R.rect(x + 2, y - 4, x + 2, y, P.poste); R.rect(x + 2, y - 4, x + 4, y - 4, P.poste); R.rect(x + 3, y - 1, x + 7, y - 1, hex('#8a5a3a')); R.rect(x - 1, y + 1, x + 9, y + 1, P.posteL); }   // el trineo de empujar
    R.recorte(null);
  } else {
    d_haloMu(R, 26, 164, 14, P.luzL, 0.3);
  }
  if (res > 0) {   // chispas que suben y el humo oscuro (sin llamas a la vista, sin nadie)
    for (let k = 0; k < 18; k++) { const u = (t * 0.5 + k / 18) % 1, x = Math.round(gx - 30 + h(k, 1, 406) * 60 + Math.sin(t * 2 + k) * 4), y = Math.round(gy - u * (gen ? 50 : 70)); if (u < 0.85 * res && !d_quietoMu(x, y)) R.pset(x, y, u < 0.4 ? hex('#ffe080') : hex('#ff8a3a')); }
    d_humoMu(R, gx, gy - (gen ? 34 : 50), t, hex('#3a3440'), hex('#2a2632'), Math.round(8 * res), 1.4);
  }
  if ((o.obra ?? 0) > 0 && gen) {   // el andamio para levantarla otra vez
    const a = Math.min(1, o.obra), col = hex('#9aa2b0'), colS = hex('#5a6270');
    for (const px of [166, 196, 236, 262]) { const top = Math.round(150 - 92 * a); R.rect(px, top, px, 150, col); R.rect(px + 1, top, px + 1, 150, colS); }
    for (const py of [128, 104, 80]) if (py > 150 - 92 * a) { R.rect(164, py, 264, py, hex('#a87a4a')); R.rect(164, py + 1, 264, py + 1, hex('#6a4a2a')); }
  }
  d_nieveMu(R, t, gen ? 130 : 110, P.nieve, P.nieveL, 1, 5);
  return gen ? d_GEOMu.gavle : d_GEOMu.gavleCabra;
}

// la valla de Gävle por delante de los personajes (con o.vallaDelante)
function d_gavleDelanteMu(R, t, o, cam) {
  if (!o.vallaDelante) return;
  if (cam === 'cabra') d_vallaMu(R, -10, 330, 182, 40, 30, d_GVMu); else d_vallaMu(R, 146, 288, 160, 22, 22, d_GVMu);
}

const d_AUMu = pal({
  c0: '#141a46', c1: '#232a66', c2: '#34357a', c3: '#56428a', c4: '#8a5490', c5: '#c06a88', c6: '#e0907e',
  est: '#8a8ac8', estL: '#f0f0ff', luna: '#f4ecd0', lunaS: '#c8c0a8',
  roca: '#4a4870', rocaS: '#34325a', nieveM: '#c8b8d8', nieveMS: '#8a86b8', nieveML: '#f4c8cc', bruma: '#6a5a8e',
  bosque: '#1a2040', bosqueM: '#26304e', bosqueN: '#9a9ac0',
  yeso: '#cac2d2', yesoS: '#9a92b0', yesoL: '#e4dce6', madera: '#5a3a2a', maderaS: '#3a2418', maderaL: '#7a5238', k: '#120e1c',
  cobre: '#3a8a72', cobreS: '#22604e', cobreL: '#7ac8a8', oro: '#e8c060',
  nieve: '#a8acd0', nieveS: '#8086b0', nieveSS: '#5e6290', nieveL: '#ccd0ea', adoquin: '#4a4658', adoquinL: '#6a6478',
  luz: '#ffd080', luzL: '#fff0c0', luzS: '#e0884a', postigo: '#2e5a3a', postigoL: '#4a7a52', flor: '#c83a3a', hierro: '#22202a',
});

// los balaustres tallados de un balcón alpino (tablas con un hueco en forma de corazón o rombo), con nieve en la baranda
function d_balconMu(R, x0, x1, y0, y1, P) {
  R.rect(x0 - 1, y1 + 1, x1 + 1, y1 + 2, P.maderaS);
  for (let x = x0; x <= x1; x++) { const m = (x - x0) % 5; for (let y = y0 + 2; y <= y1; y++) { const cy = Math.round((y0 + y1) / 2) + 1, hueco = m === 2 && Math.abs(y - cy) <= 1 || (m >= 1 && m <= 3 && y === cy); if (m === 4 || hueco) { if (m === 4) R.pset(x, y, P.k); continue; } R.pset(x, y, m === 0 ? P.maderaL : y === y1 ? P.maderaS : P.madera); } }
  R.rect(x0 - 1, y0, x1 + 1, y0 + 1, P.madera); R.rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, P.nieveL); for (let x = x0; x <= x1; x += 2) if (h(x, y0, 3) < 0.5) R.pset(x, y0 - 2, P.nieveL);
}

// una casa alpina de frente (planta baja encalada, piso de madera con balcón, tejado a dos aguas muy volado y nevado)
// x0–x1, base, alto total; o.fronton (el hastial de madera mira hacia aquí); apunta las ventanas en vent
function d_alpinaMu(R, x0, x1, base, alto, P, vent, sem = 0, o = {}) {
  const w = x1 - x0, yP = base - Math.round(alto * 0.45), yR = base - Math.round(alto * 0.78), cx = (x0 + x1) / 2;
  d_estucoMu(R, x0, yP, x1, base, [P.yeso, P.yesoS, P.yesoL], sem);
  R.rect(x0, base - 3, x1, base, P.yesoS); for (let x = x0; x <= x1; x += 6) R.rect(x, base - 3, x, base, P.k);
  d_tablasMu(R, x0, yR, x1, yP - 1, P.madera, P.maderaS, P.maderaL, 3, false, sem);
  R.rect(x0, yP - 1, x1, yP, P.maderaS);
  const nv = Math.max(1, Math.floor(w / 18));
  for (let i = 0; i < nv; i++) { const wx = Math.round(x0 + (i + 0.5) * w / nv) - 3, on = h(i, sem, 5) < 0.85;
    // planta baja: ventanas con postigos verdes y jardinera nevada
    const wy = yP + Math.round((base - yP) * 0.25), wh = Math.max(6, Math.round((base - yP) * 0.32));
    d_ventanaMu(R, wx, wy, wx + 6, wy + wh, { luz: on ? P.luz : P.c2, luzS: on ? P.luzS : P.k, luzL: on ? P.luzL : P.c2, marco: P.yesoL, marcoS: P.k, cortina: on ? P.luzS : null });
    R.rect(wx - 4, wy - 1, wx - 3, wy + wh + 1, P.postigo); R.rect(wx + 9, wy - 1, wx + 10, wy + wh + 1, P.postigo); R.pset(wx - 4, wy + 1, P.postigoL); R.pset(wx + 9, wy + 1, P.postigoL);
    R.rect(wx - 2, wy + wh + 3, wx + 8, wy + wh + 5, P.madera); R.rect(wx - 2, wy + wh + 2, wx + 8, wy + wh + 2, P.nieveL); for (let k = 0; k < 4; k++) R.pset(wx - 1 + k * 3, wy + wh + 1, k % 2 ? P.flor : P.postigoL);
    if (on) vent.push([wx, wy, wx + 6, wy + wh]);
    // piso de madera
    const uy = yR + Math.round((yP - yR) * 0.2), uh = Math.max(5, Math.round((yP - yR) * 0.42));
    d_ventanaMu(R, wx, uy, wx + 6, uy + uh, { luz: on ? P.luz : P.c2, luzS: on ? P.luzS : P.k, luzL: on ? P.luzL : P.c2, marco: P.maderaL, marcoS: P.k });
    if (on) vent.push([wx, uy, wx + 6, uy + uh]); }
  d_balconMu(R, x0 + 2, x1 - 2, yP - Math.round((yP - yR) * 0.36), yP - 2, P);
  // el tejado: muy volado, nevado, con el canto de madera y carámbanos
  const top = yR - Math.round(alto * 0.22), vu = Math.round(w * 0.1);
  if (o.fronton !== false) {
    R.poligono([[x0 - vu - 1, yR + 2], [cx, top - 2], [x1 + vu + 1, yR + 2]], P.k);
    R.poligono([[x0 - vu, yR + 1], [cx, top], [x1 + vu, yR + 1]], (x, y) => { const d = y - (top + Math.abs(x - cx) * (yR + 1 - top) / (cx - x0 + vu)); return d < 3 ? P.nieveL : d < 5 ? (x < cx ? P.nieve : P.nieveS) : P.maderaS; });
    R.poligono([[x0 + 2, yR], [cx, top + 7], [x1 - 2, yR]], (x, y) => ((x - x0) % 3 === 0 ? P.maderaS : (y + x) % 7 === 0 ? P.madera : P.maderaL));
    R.rect(Math.round(cx) - 3, yR - 7, Math.round(cx) + 3, yR - 2, P.k); R.rect(Math.round(cx) - 2, yR - 6, Math.round(cx) + 2, yR - 3, h(sem, 1, 6) < 0.6 ? P.luz : P.c2);
    for (let x = x0 - vu; x <= x1 + vu; x++) if (h(x, sem, 7) < 0.3) R.rect(x, yR + 2, x, yR + 2 + Math.round(h(x, sem, 8) * 4), P.nieveL);
  } else {
    R.rect(x0 - vu, yR - 8, x1 + vu, yR + 1, P.k);
    for (let y = yR - 7; y <= yR; y++) for (let x = x0 - vu + 1; x < x1 + vu; x++) R.pset(x, y, y < yR - 4 ? P.nieveL : y === yR ? P.maderaS : (x * 3 + y) % 9 === 0 ? P.nieveS : P.nieve);
    for (let x = x0 - vu; x <= x1 + vu; x++) if (h(x, sem, 7) < 0.3) R.rect(x, yR + 1, x, yR + 1 + Math.round(h(x, sem, 8) * 4), P.nieveL);
  }
  return { yR, yP, top };
}

function d_austriaMu(R, t, o, cam) {
  const P = d_AUMu, gen = cam !== 'portal';
  R.copiar(d_capaMu(R, 'au-cielo-' + cam, () => { d_degradadoMu(R, 0, 179, gen ? [[0, P.c0], [0.12, P.c1], [0.25, P.c2], [0.36, P.c3], [0.46, P.c4], [0.53, P.c5], [0.58, P.c6], [1, P.c6]] : [[0, P.c1], [0.3, P.c2], [0.6, P.c3], [1, P.c4]]); d_lunaMu(R, 236, 24, 5, P.luna, P.lunaS, P.luna); }, false));
  if (gen) { d_estrellasMu(R, t, 50, 70, 411, P.est, P.estL); d_nubesMu(R, t, 96, d_NUBEAUMu, 4, 0.5, 7); }
  const V = gen ? d_VENTAUMu : d_VENTAU2Mu;
  const fr = d_capaMu(R, 'au-' + cam, () => {
    V.length = 0;
    if (gen) {
      const cr = d_crestaMu(74, 22, 0.7, [[96, 34, 0.85], [196, 44, 0.75]]);
      d_montesMu(R, cr, 104, { roca: P.roca, rocaS: P.rocaS, nieve: P.nieveM, nieveS: P.nieveMS, nieveL: P.nieveML, bruma: P.bruma }, 22, 1);
      const cb = d_crestaMu(100, 9, 4.2); for (let x = 0; x < 320; x++) R.rect(x, cb[x], x, 120, P.bosque);
      for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 412) * 319); d_abetoMu(R, x, cb[x] + 4 + Math.round(h(k, 3, 412) * 8), 7 + Math.round(h(k, 2, 412) * 7), [P.bosque, P.bosqueM, P.bosqueN]); }
      // la iglesia: la nave detrás y el campanario de bulbo con su reloj
      R.rect(150, 84, 196, 112, P.yesoS); R.poligono([[147, 85], [173, 74], [199, 85]], P.nieve); R.rect(148, 85, 198, 86, P.nieveS); for (let k = 0; k < 4; k++) { R.rect(176 + k * 6, 92, 178 + k * 6, 100, P.k); R.rect(176 + k * 6, 93, 178 + k * 6, 100, h(k, 1, 9) < 0.7 ? P.luzS : P.k); }
      d_estucoMu(R, 152, 56, 168, 112, [P.yeso, P.yesoS, P.yesoL], 4); R.rect(165, 56, 168, 112, P.yesoS); R.rect(151, 56, 151, 112, P.k); R.rect(169, 56, 169, 112, P.k);
      for (const bx of [155, 162]) { R.rect(bx, 60, bx + 3, 67, P.k); R.pset(bx + 1, 59, P.k); R.pset(bx + 2, 59, P.k); }
      R.disco(160, 75, 5, P.k); R.disco(160, 75, 4, P.yesoL); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(160 + Math.cos(a) * 3.4), Math.round(75 + Math.sin(a) * 3.4), P.yesoS); } R.linea(160, 75, 160, 72, P.k); R.linea(160, 75, 162, 76, P.k);
      R.rect(150, 54, 170, 56, P.k); R.rect(151, 54, 169, 54, P.nieveL);
      for (let y = 34; y <= 54; y++) { const u = (y - 34) / 20, rr = u < 0.25 ? 2 + u * 10 : u < 0.75 ? 4.5 + Math.sin((u - 0.25) / 0.5 * Math.PI) * 5.5 : 4.5 + (1 - u) * 6; const r = Math.round(rr);
        for (let x = -r; x <= r; x++) R.pset(160 + x, y, x === -r || x === r ? P.k : x < -r * 0.35 ? P.cobreL : x > r * 0.45 ? P.cobreS : P.cobre); if (y % 5 === 0) for (let x = -r + 1; x < r; x++) R.pset(160 + x, y, P.cobreS); }
      R.rect(159, 28, 161, 34, P.k); R.rect(160, 22, 160, 28, P.oro); R.rect(158, 24, 162, 24, P.oro); R.disco(160, 31, 1, P.oro);
      R.poligono([[151, 37], [160, 33], [169, 37]], () => P.nieveL);
      // las casas del medio y las dos grandes de delante
      d_alpinaMu(R, 92, 146, 120, 46, P, V, 3); d_alpinaMu(R, 176, 232, 120, 44, P, V, 5);
      // la calle: nieve pisada en perspectiva, rodadas, adoquines que asoman y los charcos de luz de los faroles
      for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (y - 118) / 62, mid = Math.abs(x - 160) < 18 + d * 90, rod = Math.abs(Math.abs(x - 160) - (8 + d * 60)) < 1 + d * 2;
        let c = mid ? (rod ? P.nieveS : h(x >> 3, y >> 1, 413) < 0.35 ? P.nieve : P.nieveL) : (h(x >> 3, y >> 2, 414) < 0.45 ? P.nieve : P.nieveL); if (y < 121) c = P.nieveSS;
        if (mid && h(x >> 2, y >> 1, 415) < 0.02 + d * 0.03) c = (x + y) % 3 ? P.adoquin : P.adoquinL; if (h(x, y, 416) < 0.006) c = P.estL; if (!mid && Math.abs(((y - 118) - Math.sin(x * 0.06) * 2) % 7 - 3) < 0.5 && h(x >> 3, y, 417) < 0.5) c = P.nieveS;
        for (const [lx, ly] of [[68, 146], [252, 146]]) { const e = ((x - lx) / 46) ** 2 + ((y - ly) / 13) ** 2; if (e < 1 && d_umbralMu(x, y) < (1 - e) * 0.85) c = d_mezclaMu(c, P.luz, 0.32); }
        R.pset(x, y, c); }
      const L = d_alpinaMu(R, -14, 90, 142, 104, P, V, 1), Rr = d_alpinaMu(R, 230, 334, 142, 98, P, V, 2, { fronton: false });
      // la leña apilada con nieve, el trineo apoyado y el banco
      for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) { const x = 236 + i * 4 + (j % 2) * 2, y = 140 - j * 3; R.disco(x, y, 1.6, P.maderaL); R.pset(x, y, P.madera); } R.rect(234, 128, 266, 129, P.nieveL);
      R.linea(84, 140, 88, 126, P.maderaL); R.linea(90, 140, 94, 126, P.maderaL); for (let y = 128; y < 140; y += 3) R.linea(85 + (128 - y) * -0.3, y, 92 + (128 - y) * -0.3, y, P.madera);
      // los faroles en sus postes
      for (const lx of [68, 252]) { R.rect(lx - 1, 110, lx, 148, P.hierro); R.rect(lx - 3, 146, lx + 2, 148, P.hierro); R.rect(lx - 4, 101, lx + 3, 110, P.k); R.rect(lx - 3, 102, lx + 2, 109, P.luz); R.rect(lx - 1, 102, lx, 109, P.luzL); R.poligono([[lx - 5, 102], [lx - 0.5, 97], [lx + 4, 102]], P.hierro); R.rect(lx - 4, 99, lx + 3, 100, P.nieveL); }
    } else {
      // el portal: pared encalada, la puerta tallada bajo su arco de piedra, el escalón con la bota, el farol y la ventana
      d_estucoMu(R, 0, 0, 319, 166, [P.yeso, d_mezclaMu(P.yeso, P.yesoS, 0.5), d_mezclaMu(P.yeso, P.yesoL, 0.6)], 9);
      for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y > 11 ? P.k : (x % 6 === 0 ? P.maderaS : P.madera));   // el alero de madera, tranquilo
      for (let x = 0; x < 320; x++) if (h(x, 1, 417) < 0.35) R.rect(x, 14, x, 14 + Math.round(h(x, 2, 417) * 5), P.nieveL);
      for (let y = 15; y < 167; y++) for (let x = 0; x < 320; x++) { const g = Math.abs(y - 15) / 40; if (g < 1 && d_umbralMu(x, y) < (1 - g) * 0.6) R.pset(x, y, d_mezclaMu(R.pget(x, y), P.k, 0.25)); }   // la sombra del alero
      d_piedrasMu(R, 0, 150, 319, 166, [P.yesoS, hex('#7a7090'), P.yeso, P.k], 5, 13, 3);
      // el arco de piedra y la puerta de dos hojas con rombos tallados, clavos y aldaba
      const cx = 160, x0 = 122, x1 = 198, ya = 62;
      for (let y = 40; y < 160; y++) for (let x = x0 - 10; x <= x1 + 10; x++) { const dx = x - cx, dyy = y - ya, r = Math.hypot(dx, dyy), dentro = (y >= ya && Math.abs(dx) <= 38) || (y < ya && r <= 38), marco = (y >= ya && Math.abs(dx) <= 47) || (y < ya && r <= 47);
        if (!marco || dentro) continue; const a = y < ya ? Math.atan2(-dyy, dx) : 0, dov = y < ya ? ((a / 0.26) % 1 + 1) % 1 < 0.12 : (y - 40) % 9 === 0; R.pset(x, y, dov || r > 46 || Math.abs(dx) > 46 ? P.k : (x + y) % 11 === 0 ? P.yesoS : hex('#b8b0c4')); }
      for (let y = 24; y < 160; y++) for (let x = cx - 38; x <= cx + 38; x++) { const dx = x - cx, dyy = y - ya; if (y < ya && Math.hypot(dx, dyy) > 38) continue;
        const hoja = dx < 0 ? -1 : 1, lx = Math.abs(dx), m = lx % 6, panel = Math.abs(((y - 70) % 30 + 30) % 30 - 15) + Math.abs(((lx - 19) % 38 + 38) % 38 - 0) * 0.6;
        let c = m === 0 ? P.maderaS : (y + lx * 3) % 13 === 0 ? P.maderaS : P.madera; if (y > 70 && y < 150 && Math.abs(Math.abs(((y - 70) % 26) - 13) + Math.abs(lx - 19)) < 10) c = Math.abs(Math.abs(((y - 70) % 26) - 13) + Math.abs(lx - 19)) > 8 ? P.maderaS : hoja * (dx) > 0 && (y % 26) < 13 ? P.maderaL : P.madera;
        if (lx < 1) c = P.k; if (Math.abs(dx) > 36) c = P.maderaS; R.pset(x, y, c); }
      for (let y = 74; y < 152; y += 13) for (const dx of [-30, -8, 8, 30]) { R.pset(cx + dx, y, P.k); R.pset(cx + dx, y - 1, P.oro); }
      R.disco(cx + 9, 112, 3, P.k); R.disco(cx + 9, 112, 2, P.oro); R.disco(cx + 9, 112, 1, P.k);
      R.rect(cx - 30, 108, cx - 20, 110, P.hierro); R.rect(cx + 20, 108, cx + 30, 110, P.hierro);
      // la corona de Adviento en la puerta
      for (let a = 0; a < 6.28; a += 0.08) { const r = 9 + Math.sin(a * 7) * 1.2; R.disco(cx + Math.round(Math.cos(a) * r), 88 + Math.round(Math.sin(a) * r), 2, (a * 10 | 0) % 3 ? hex('#1e5a32') : hex('#2e7a42')); }
      for (let k = 0; k < 6; k++) { const a = k * 1.05 + 0.3; R.pset(cx + Math.round(Math.cos(a) * 9), 88 + Math.round(Math.sin(a) * 9), P.flor); }
      R.poligono([[cx - 3, 97], [cx, 100], [cx - 5, 108]], P.flor); R.poligono([[cx + 3, 97], [cx, 100], [cx + 5, 108]], hex('#901820')); R.disco(cx, 98, 2, P.flor);
      // el escalón de piedra con nieve y la bota (la galleta se esconde dentro)
      R.rect(104, 158, 216, 167, P.k); R.rect(105, 159, 215, 166, hex('#8a84a0')); R.rect(105, 159, 215, 160, P.yesoL); for (let x = 106; x < 215; x += 14) R.rect(x, 161, x, 166, hex('#6a6480'));
      for (let x = 104; x < 132; x++) if (h(x, 3, 418) < 0.7) R.rect(x, 157, x, 158, P.nieveL); for (let x = 190; x < 217; x++) if (h(x, 4, 418) < 0.7) R.rect(x, 157, x, 158, P.nieveL);
      // la bota: caña alta, cordones, suela, punta redondeada (mira a la derecha)
      d_botaMu(R, 174, 158, 1.5, [hex('#7a4424'), hex('#4a2614'), hex('#a86a3a'), hex('#2a1810')], { cana: 8 });
      // el farol de pared con su brazo de forja
      R.linea(70, 60, 86, 60, P.hierro); R.linea(70, 66, 86, 60, P.hierro); R.rect(68, 56, 71, 70, P.k); R.poligono([[79, 64], [85, 58], [91, 64]], P.hierro);
      R.rect(80, 64, 90, 78, P.k); R.rect(81, 65, 89, 77, P.luz); R.rect(84, 66, 86, 76, P.luzL); R.rect(80, 70, 90, 70, P.hierro); R.rect(79, 78, 91, 79, P.hierro);
      // la ventana con visillo y jardinera de abeto, y el banco nevado
      d_ventanaMu(R, 236, 62, 284, 112, { luz: P.luz, luzS: P.luzS, luzL: P.luzL, marco: P.yesoL, marcoS: P.k, cortina: hex('#f4ecdc'), cortinaS: hex('#d8ccb8') });
      R.rect(225, 58, 231, 116, P.postigo); R.rect(289, 58, 295, 116, P.postigo); for (let y = 60; y < 115; y += 4) { R.rect(226, y, 230, y, P.postigoL); R.rect(290, y, 294, y, P.postigoL); }
      R.rect(232, 118, 288, 125, P.madera); R.rect(232, 125, 288, 125, P.maderaS); for (let k = 0; k < 12; k++) d_abetoMu(R, 236 + k * 4.5, 118, 6 + (k % 3), [P.bosque, hex('#2e5a3a'), P.nieveL]); R.rect(232, 117, 288, 117, P.nieveL);
      V.push([236, 62, 284, 112]);
      R.rect(14, 128, 66, 131, P.madera); R.rect(14, 127, 66, 127, P.nieveL); R.rect(14, 131, 66, 132, P.maderaS); R.rect(18, 132, 20, 150, P.maderaS); R.rect(60, 132, 62, 150, P.maderaS); R.rect(14, 118, 66, 120, P.madera); R.rect(14, 117, 66, 117, P.nieveL);
      // la calle: adoquines con nieve
      for (let y = 167; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = (y - 167) >> 2, piedra = ((x + fila * 4) % 9 === 0) || (y - 167) % 4 === 3; R.pset(x, y, h(x >> 1, y, 419) < 0.55 ? (y < 169 ? P.nieveL : P.nieve) : piedra ? P.k : (x + y) % 5 ? P.adoquin : P.adoquinL); }
    }
  });
  d_pegarMu(R, fr);
  // la vida: humo, ventanas en las que alguien pasa, la guirnalda, el titileo de los faroles, gente lejos y la nieve
  for (let k = 0; k < V.length; k += 3) { const [x0, y0, x1, y1] = V[k], u = ((t * 0.18 + k * 0.37) % 1.6) - 0.3; if (u < 0 || u > 1) continue; const px = Math.round(x0 + u * (x1 - x0)); R.recorte([x0, y0, x1, y1]); for (let y = y0 + Math.round((y1 - y0) * 0.35); y <= y1; y++) for (let i = -1; i <= 1; i++) R.pset(px + i, y, P.luzS); R.disco(px, y0 + Math.round((y1 - y0) * 0.3), 2, P.luzS); R.recorte(null); }
  if (gen) {
    for (const [x, y] of [[40, 32], [119, 72], [204, 76], [276, 40]]) if (!d_quietoMu(x, y)) d_humoMu(R, x, y, t + x, hex('#5a5a8a'), hex('#46467a'), 6, 0.5);
    d_guirnaldaMu(R, 90, 72, 232, 76, 12, t, [P.luz, P.luzL, hex('#ff7a50')], 6, P.k, 0);
    { const sx = 161, sy = 86 + Math.round(Math.sin(t * 1.2) * 1); R.linea(161, 84, sx, sy - 3, P.k); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; R.linea(sx, sy, Math.round(sx + Math.cos(a) * 4), Math.round(sy + Math.sin(a) * 4), P.oro); } R.pset(sx, sy, P.luzL); }
    for (const lx of [68, 252]) d_haloMu(R, lx - 1, 105, 13, P.luz, 0.32 + 0.06 * Math.sin(t * 8 + lx) * Math.sin(t * 3.1));
    for (let k = 0; k < 4; k++) { const dir = k % 2 ? -1 : 1, x = Math.round(dir > 0 ? 120 + ((t * 3 + k * 20) % 90) : 210 - ((t * 2.6 + k * 25) % 90)); d_genteMu(R, x, 121, t, { c: [hex('#3a2a4a'), hex('#5a2a2a'), hex('#2a3a4a'), hex('#4a4a2a')][k], gorro: k % 2 ? hex('#c83a3a') : null, dir, anda: true, alto: 7 }); }
    d_nieveMu(R, t, 70, P.nieve, P.nieveL, 0.7, 4);
  } else {
    d_haloMu(R, 85, 71, 26, P.luz, 0.28 + 0.05 * Math.sin(t * 9) * Math.sin(t * 2.3));
    R.rect(84, 69, 86, 73, Math.sin(t * 11) > 0 ? P.luzL : P.luz);
    d_nieveMu(R, t, 60, P.nieve, P.nieveL, 0.6, 3);
  }
  return gen ? d_GEOMu.austria : d_GEOMu.austriaPortal;
}

const d_NUBEAUMu = ['#3a3a78', '#6a4a88', '#b07090'].map(hex);

const d_VENTAUMu = [], d_VENTAU2Mu = [];

const d_ISMu = pal({
  c0: '#02060e', c1: '#061224', c2: '#0a1c30', c3: '#10283a', est: '#7a90b0', estL: '#f0fff8',
  au0: '#6affb0', au1: '#30d890', au2: '#8a4ac0', au3: '#ff6aa0',
  nieve: '#7a90b4', nieveS: '#4e6288', nieveSS: '#34466a', nieveL: '#b8cce4', nieveV: '#8ac0b0',
  roca: '#1a1a24', rocaS: '#0e0e16', rocaL: '#4a4a58', musgo: '#3a5a3a', musgoL: '#5a7a4a',
  cesped: '#3a4a2a', cespedS: '#26321c', cespedL: '#5a6a3a', tepe: '#5e4a34', tepeS: '#3a2c1e', tepeL: '#80684a',
  blanco: '#d8dce4', blancoS: '#9aa2b4', rojo: '#9a2a22', rojoS: '#6a1a16', marco: '#e8e8ee', k: '#06080e',
  luz: '#ffd080', luzL: '#fff4c8', luzS: '#e0884a', cuero: '#5a3a24', cueroS: '#3a2414',
});

// el sendero de la ladera (de la cumbre a la puerta de la granja): por aquí bajan los muchachos de Yule
const d_SENDAISMu = [[34, 62], [70, 70], [108, 80], [146, 92], [178, 104], [204, 118], [222, 132], [236, 146]];

function d_islandiaMu(R, t, o, cam) {
  const P = d_ISMu, gen = cam !== 'granja';
  R.copiar(d_capaMu(R, 'is-cielo-' + cam, () => { d_degradadoMu(R, 0, 179, [[0, P.c0], [0.25, P.c1], [0.5, P.c2], [0.7, P.c3], [1, P.c3]]); }, false));
  d_estrellasMu(R, t, 140, gen ? 120 : 60, 421, P.est, P.estL);
  // la aurora: dos cortinas, la de detrás violeta arriba y la de delante verde intensa con el borde rosa abajo
  d_auroraMu(R, t, gen ? 70 : 44, gen ? 52 : 38, [P.au1, P.au1, P.au2], 0.55, 0, 319, 4.1);
  d_auroraMu(R, t * 1.2, gen ? 92 : 58, gen ? 60 : 44, [P.au3, P.au0, P.au1], 0.85, 10, 300, 0.4);
  const fr = d_capaMu(R, 'is-' + cam, () => {
    if (gen) {
      // los montes del fondo, la gran montaña nevada con sus bandas de basalto y el sendero
      const cf = d_crestaMu(112, 14, 5.2); d_montesMu(R, cf, 140, { roca: P.rocaL, rocaS: P.roca, nieve: P.nieveS, nieveS: P.nieveSS, nieveL: P.nieve, bruma: P.c3 }, 10, 2);
      const cm = new Int16Array(320); for (let x = 0; x < 320; x++) cm[x] = Math.round(x < 60 ? 52 - Math.sin(x / 60 * Math.PI / 2) * 8 + Math.sin(x * 0.3) * 1.5 : 44 + (x - 60) * 0.46 + (x - 60) ** 2 * 0.0012 + Math.sin(x * 0.21) * 1.5);
      // la montaña modelada: crestas y canales (un relieve de senos) con su cara de luz y su cara de sombra, afloramientos
      // de basalto en las crestas más afiladas y la nieve que se acumula en los canales
      for (let x = 0; x < 320; x++) for (let y = Math.max(0, cm[x]); y < 180; y++) { const d = y - cm[x], f = Math.sin(x * 0.09 + y * 0.05) + Math.sin(x * 0.037 - y * 0.11) * 0.7 + Math.sin(x * 0.21 + y * 0.17) * 0.25, g = Math.cos(x * 0.09 + y * 0.05) * 0.09 + Math.cos(x * 0.037 - y * 0.11) * 0.026;
        const l = g * 6 + (d < 3 ? 0.6 : 0) + (d_umbralMu(x, y) - 0.5) * 0.35, roca = f > 1.35 && d > 6 && h(x >> 2, y >> 2, 422) < 0.7;
        let c = roca ? (g > 0 ? P.rocaL : h(x, y, 423) < 0.5 ? P.roca : P.rocaS) : l > 0.45 ? P.nieveL : l > 0.05 ? P.nieve : l > -0.35 ? d_mezclaMu(P.nieve, P.nieveS, 0.5) : P.nieveS;
        if (roca && g > 0 && (y + x) % 3 === 0 && f < 1.5) c = P.nieve; if (h(x, y, 425) < 0.006) c = P.nieveV; R.pset(x, y, c); }
      for (let i = 0; i + 1 < d_SENDAISMu.length; i++) { const [ax, ay] = d_SENDAISMu[i], [bx, by] = d_SENDAISMu[i + 1]; for (let u = 0; u <= 1; u += 0.02) { const x = Math.round(ax + (bx - ax) * u), y = Math.round(ay + (by - ay) * u); R.rect(x - 2, y + 1, x + 2, y + 1, P.nieveS); R.rect(x - 1, y + 2, x + 1, y + 2, P.nieveSS); R.pset(x - 3, y, P.nieveL); if ((x + y) % 5 === 0) R.pset(x, y + 1, P.rocaL); } }
      for (let i = 0; i < d_SENDAISMu.length; i += 1) { const [x, y] = d_SENDAISMu[i]; R.rect(x + 4, y - 7, x + 4, y + 1, P.cueroS); R.rect(x + 4, y - 8, x + 4, y - 6, hex('#d83a2a')); R.pset(x + 5, y + 1, P.nieveSS); }   // las estacas que marcan el sendero
      // la colina para el gato, la granja de tejados de césped, las rocas de lava con musgo
      d_colinaISMu(R, P);
      const base = 150;
      for (const [x0, x1, top, col] of [[200, 236, 118, 'blanco'], [236, 272, 112, 'rojo'], [272, 312, 116, 'blanco']]) {
        const cx = (x0 + x1) / 2, ya = base - 18, c = col === 'rojo' ? P.rojo : P.blanco, cS = col === 'rojo' ? P.rojoS : P.blancoS;
        R.poligono([[x0 - 4, ya + 2], [cx, top - 3], [x1 + 4, ya + 2], [x1 + 4, base], [x0 - 4, base]], P.k);
        R.poligono([[x0 - 3, ya + 1], [cx, top - 2], [x1 + 3, ya + 1], [x1 + 3, base], [x0 - 3, base]], (x, y) => { const d = y - (top - 2 + Math.abs(x - cx) * (ya + 1 - top + 2) / (cx - x0 + 3)); return d < 2 ? P.nieveL : d < 4 ? (h(x, y, 426) < 0.5 ? P.nieve : P.cespedL) : (h(x >> 1, y, 427) < 0.4 ? P.cespedS : P.cesped); });
        R.poligono([[x0, ya + 1], [cx, top + 4], [x1, ya + 1], [x1, base], [x0, base]], (x, y) => ((x - x0) % 4 === 3 ? cS : (x + y) % 9 === 0 ? cS : c));
        R.rect(x0, base - 1, x1, base, cS); R.rect(Math.round(cx) - 1, top + 3, Math.round(cx) + 1, top + 4, P.k); }
      d_piedrasMu(R, 196, 132, 200, 150, [P.tepe, P.tepeS, P.tepeL, P.k], 3, 4, 2); d_piedrasMu(R, 312, 132, 319, 150, [P.tepe, P.tepeS, P.tepeL, P.k], 3, 4, 2);
      R.rect(213, 134, 223, 150, P.k); R.rect(214, 135, 222, 150, hex('#4a3020')); for (let y = 136; y < 150; y += 3) R.rect(214, y, 222, y, hex('#3a2416')); R.pset(221, 143, P.luz);
      d_ventanaMu(R, 248, 126, 260, 136, { luz: P.luz, luzS: P.luzS, luzL: P.luzL, marco: P.marco, marcoS: P.k });
      d_zapatoISMu(R, 250, 138, 1); d_ventanaMu(R, 284, 128, 296, 137, { luz: P.luz, luzS: P.luzS, luzL: P.luzL, marco: P.marco, marcoS: P.k });
      for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 158 && x < 190 && y < 150) continue; const c = h(x >> 1, y, 428) < 0.4 ? P.nieve : h(x, y, 429) < 0.08 ? P.nieveS : d_mezclaMu(P.nieve, P.nieveL, 0.4); R.pset(x, y, c); }
      for (const [x, y, r] of [[18, 172, 9], [44, 178, 7], [292, 176, 10], [270, 180, 6], [120, 182, 8]]) d_lavaISMu(R, x, y, r, P);
      for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 430) * 319), y = 152 + Math.round(h(k, 2, 430) * 26); R.pset(x, y, P.cespedL); R.pset(x + 1, y - 1, P.cesped); }
      for (let k = 0; k < 7; k++) { const x = 140 + k * 9, y = 156 + k; R.rect(x, y - 6, x, y, P.cueroS); R.pset(x, y - 7, P.nieveL); if (k) R.linea(x - 9, y - 5, x, y - 4, P.rocaL); }   // los postes de la cerca
    } else {
      // de cerca: el tejado de césped nevado, el muro de tepes en espiga, la ventana con la vela y el zapato en el alféizar
      for (let y = 40; y < 64; y++) for (let x = 0; x < 320; x++) { const yy = 44 + Math.sin(x * 0.04) * 3 + Math.sin(x * 0.17) * 1.2; if (y < yy) continue; R.pset(x, y, y - yy < 3 ? P.nieveL : y - yy < 6 ? (h(x, y, 431) < 0.5 ? P.nieve : P.cespedL) : h(x >> 1, y, 432) < 0.35 ? P.cespedS : (x + y) % 5 ? P.cesped : P.cespedL); }
      for (let x = 0; x < 320; x++) if (h(x, 5, 433) < 0.45) R.rect(x, 62, x, 63 + Math.round(h(x, 6, 433) * 5), (x % 3) ? P.cesped : P.cespedS);
      for (let y = 64; y < 160; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 64) / 8), dy = (y - 64) % 8, inc = fila % 3 === 2, dir = fila % 2 ? 1 : -1;
        let c; if (inc) { const xx = (x + y) % 10; c = dy === 0 || dy === 7 ? P.tepeS : xx < 1 ? P.k : xx < 3 ? P.tepeL : P.tepe; } else { const xx = ((x + dir * dy * 1.3) % 6 + 6) % 6; c = xx < 1 ? P.k : xx < 2 ? P.tepeS : h(x >> 1, fila, 434) < 0.25 ? P.cespedS : xx < 3 ? P.tepeL : P.tepe; }
        if (h(x, y, 435) < 0.03) c = P.musgo; R.pset(x, y, c); }
      R.poligono([[118, 74], [202, 74], [202, 134], [118, 134]], P.k);
      d_ventanaMu(R, 126, 80, 194, 126, { luz: P.luz, luzS: P.luzS, luzL: P.luzL, marco: P.marco, marcoS: P.k, cortina: hex('#e8dcc8'), cortinaS: hex('#c8b8a0') });
      R.rect(156, 112, 164, 125, hex('#f4ecd8')); R.rect(155, 125, 165, 126, hex('#8a6a3a')); R.rect(160, 110, 160, 111, P.k);
      R.rect(112, 129, 208, 133, P.marco); R.rect(112, 134, 208, 135, P.blancoS); R.rect(112, 128, 208, 128, P.nieveL);
      d_zapatoISMu(R, 138, 128, 2.2);
      R.rect(232, 92, 268, 160, P.k); R.rect(234, 94, 266, 160, P.rojo); for (let x = 236; x < 266; x += 5) R.rect(x, 94, x, 160, P.rojoS); R.rect(234, 94, 266, 96, P.rojoS); R.disco(260, 128, 2, P.luz);
      for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 162 ? P.nieveS : h(x >> 1, y, 436) < 0.4 ? P.nieve : h(x, y, 437) < 0.03 ? P.nieveL : d_mezclaMu(P.nieve, P.nieveL, 0.4));
      for (const [x, y, r] of [[22, 178, 10], [300, 180, 9]]) d_lavaISMu(R, x, y, r, P);
      for (let x = 0; x < 320; x++) if (h(x, 7, 449) < 0.25) R.rect(x, 64, x, 64 + Math.round(h(x, 8, 449) * 6), P.nieveL);   // carámbanos
      for (let y = 136; y < 160; y++) for (let x = 0; x < 320; x++) if (y > 154 - Math.abs(Math.sin(x * 0.05)) * 4 && R.pget(x, y) !== P.rojo && R.pget(x, y) !== P.rojoS) R.pset(x, y, y < 157 ? P.nieveL : P.nieve);   // la nieve amontonada al pie del muro
      for (let y = 160; y < 178; y++) for (let x = 110; x < 210; x++) { const e = ((x - 160) / 52) ** 2 + ((y - 162) / 12) ** 2; if (e < 1 && d_umbralMu(x, y) < (1 - e) * 0.9) R.pset(x, y, d_mezclaMu(R.pget(x, y), P.luz, 0.3)); }
      R.rect(222, 92, 230, 106, P.k); R.rect(223, 93, 229, 105, P.luz); R.rect(225, 94, 227, 104, P.luzL); R.rect(221, 90, 231, 91, P.k); R.rect(225, 86, 227, 89, P.k);
      for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) { const x = 276 + i * 6 + (j % 2) * 3, y = 156 - j * 5; R.disco(x, y, 2.4, P.k); R.disco(x, y, 2, P.cuero); R.pset(x, y, hex('#c8a070')); } R.rect(274, 136, 306, 137, P.nieveL);
    }
  });
  d_pegarMu(R, fr);
  // el reflejo de la aurora en la nieve, la vela que tiembla, el humo de la granja, la nieve que levanta el viento
  if (gen) {
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 438) * 319), y = 152 + Math.round(h(k, 2, 438) * 26); if (Math.sin(t * 1.4 + x * 0.05) > 0.4) R.pset(x, y, P.nieveV); }
    d_humoMu(R, 254, 108, t, hex('#2a3a4a'), hex('#1e2a3a'), 6, 0.7);
    d_caballoISMu(R, 64, 170, t, hex('#8a5a34'), hex('#e8dcc8'), 1); d_caballoISMu(R, 96, 166, t + 1.7, hex('#d8d0c4'), hex('#4a3a2a'), -1);
    R.rect(253, 132, 255, 134, Math.sin(t * 9) > 0 ? P.luzL : P.luz);
    for (let k = 0; k < 24; k++) { const u = (t * 0.6 + k / 24) % 1, x = Math.round(u * 340 - 10), y = Math.round(150 + h(k, 1, 439) * 28 - Math.sin(u * 9 + k) * 2); R.pset(x, y, P.nieveL); }
  } else {
    d_haloMu(R, 160, 108, 24, P.luz, 0.3 + 0.08 * Math.sin(t * 7) * Math.sin(t * 2.7));
    d_haloMu(R, 226, 100, 10, P.luz, 0.35 + 0.05 * Math.sin(t * 9)); R.pset(160, 109 + (Math.sin(t * 10) > 0 ? 0 : -1), P.luzL); R.rect(159, 108, 161, 109, P.luz);
    for (let k = 0; k < 18; k++) { const u = (t * 0.5 + k / 18) % 1, x = Math.round(u * 340 - 10), y = Math.round(162 + h(k, 1, 440) * 16 - Math.sin(u * 9 + k) * 2); R.pset(x, y, P.nieveL); }
  }
  return gen ? d_GEOMu.islandia : d_GEOMu.islandiaGranja;
}

// un caballo islandés pequeño y peludo (cuerpo, patas, cuello que baja a pastar de vez en cuando, crin y cola que se
// mueve); x, base (los cascos), col (pelaje) y crin, dir
function d_caballoISMu(R, x, base, t, col, crin, dir = 1) {
  const cS = d_mezclaMu(col, d_ISMu.k, 0.35), pasta = Math.sin(t * 0.5) > 0.4, X = (u) => x + u * dir;
  for (const [u, s] of [[-4, 0], [-2, 1], [4, 0], [6, 1]]) R.rect(X(u), base - 4, X(u), base, s ? cS : col);
  R.rect(Math.min(X(-5), X(7)), base - 9, Math.max(X(-5), X(7)), base - 4, col); R.rect(Math.min(X(-5), X(7)), base - 4, Math.max(X(-5), X(7)), base - 4, cS); R.rect(Math.min(X(-5), X(7)), base - 9, Math.max(X(-5), X(7)), base - 9, d_mezclaMu(col, hex('#ffffff'), 0.2));
  const hx = X(9), hy = pasta ? base - 3 : base - 13;
  R.linea(X(6), base - 8, hx, hy + 1, col); R.linea(X(7), base - 8, hx + dir, hy + 1, col); R.rect(Math.min(hx, hx + 3 * dir), hy, Math.max(hx, hx + 3 * dir), hy + 2, col); R.pset(hx + 3 * dir, hy + 2, cS); R.pset(hx + dir, hy, d_ISMu.k);
  R.linea(X(5), base - 10, hx - dir, hy - 1, crin); R.pset(hx, hy - 1, crin);
  const cola = Math.round(Math.sin(t * 2.3) * 1.5); R.linea(X(-6), base - 9, X(-7) - cola * dir, base - 3, crin); R.pset(X(-6), base - 8, crin);
}

// la colina redonda (con su nieve y matas) detrás de la que asoma el gato de Yule
function d_colinaISMu(R, P) {
  for (let x = 54; x <= 182; x++) { const u = (x - 118) / 64, yc = Math.round(116 + u * u * 34 + Math.sin(x * 0.3) * 0.8); for (let y = yc; y < 158; y++) R.pset(x, y, y - yc < 2 ? P.nieveL : h(x >> 1, y, 441) < 0.2 ? P.nieveS : (x + y) % 23 === 0 ? P.cespedS : P.nieve); if (h(x, 1, 442) < 0.12) { R.pset(x, yc - 1, P.cespedS); R.pset(x, yc - 2, P.cesped); } }
}

// una roca de lava porosa con musgo y nieve encima
function d_lavaISMu(R, x, y, r, P) {
  R.disco(x, y, r + 1, P.k); R.disco(x, y, r, (xx, yy) => (h(xx, yy, 443) < 0.18 ? P.rocaS : yy < y - r * 0.45 ? (h(xx, yy, 444) < 0.5 ? P.musgoL : P.musgo) : xx < x - r * 0.2 ? (h(xx, yy, 446) < 0.3 ? P.musgo : P.rocaL) : h(xx, yy, 447) < 0.25 ? P.rocaL : P.roca));
  for (let i = -r + 1; i < r; i++) if (h(x + i, y, 448) < 0.5) R.pset(x + i, y - r + 1 + Math.round(Math.abs(i) * 0.5), P.nieve);
  for (let i = -r + 2; i < r - 1; i++) if (h(x + i, y, 445) < 0.7) R.pset(x + i, y - r + Math.round(Math.abs(i) * 0.4), P.nieveL);
}

// el zapato en el alféizar (de cuero, a la islandesa, con la punta cosida): x, base, escala s
function d_zapatoISMu(R, x, base, s) {
  const P = d_ISMu; d_botaMu(R, x, base, s * 0.8, [P.cuero, P.cueroS, hex('#8a5a34'), hex('#2a1810')], { cana: 2 });
}

const d_MXMu = pal({
  c0: '#0e0a2e', c1: '#1c1450', c2: '#2e1e66', c3: '#4a2a74', c4: '#6a3a6a', est: '#9a8ac8', estL: '#fff4e0', luna: '#f8ecd0', lunaS: '#d0c0a0',
  cerro: '#1a1236', cerroL: '#2a1c48', cantera: '#b88a6a', canteraS: '#8a5e48', canteraL: '#d8a888', k: '#140a14',
  luz: '#ffc870', luzL: '#fff0c0', luzS: '#e0703a', vela: '#ffe8a0', madera: '#6a3a1e', maderaS: '#42220e', maderaL: '#8a5430', hierro: '#1a1418',
  piedra: '#4a3a3e', piedraS: '#2e2228', piedraL: '#6a5658', barro: '#b0502e', barroS: '#7a3218', barroL: '#d0703e',
  noche: '#e01848', nocheS: '#9a0c30', nocheL: '#ff5a6a', hoja: '#1e5a2a', hojaS: '#103a1a', ama: '#f8d040', azulejo: '#2a5ab8', azulejoL: '#e8e4f0', cupula: '#e8b030', cupulaS: '#a87018',
});

const d_PICADOMu = ['#f04a8a', '#f8c020', '#3ac0e0', '#7ad040', '#f07a20', '#b060e0', '#f0f0f0'].map(hex);

const d_CASASMXMu = [[-4, 52, 92, '#d0407a'], [52, 104, 100, '#e0a830'], [104, 132, 96, '#3a9a7a'], [188, 222, 98, '#c0583a'], [222, 278, 90, '#2a5aa8'], [278, 326, 98, '#d0407a']];

// una tira de papel picado entre dos puntos: banderitas de colores con su calado (rombos y florecitas, sin letras) que
// ondean con t; recortadas a la pantalla
function d_picadoMu(R, x0, y0, x1, y1, comba, t, sem = 0) {
  const n = Math.round(Math.abs(x1 - x0) / 9), P = d_MXMu;
  for (let i = 0; i <= Math.abs(x1 - x0); i++) { const u = i / Math.abs(x1 - x0), x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * comba); if (!d_quietoMu(x, y)) R.pset(x, y, P.k); }
  for (let k = 0; k < n; k++) { const u = (k + 0.5) / n, x = Math.round(x0 + (x1 - x0) * u) - 3, y = Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * comba) + 1, col = d_PICADOMu[(k + sem) % d_PICADOMu.length], ond = Math.sin(t * 3 + k * 0.9 + sem), sk = Math.round(ond * 1.5);
    if (d_quietoMu(x, y) || d_quietoMu(x + 6, y)) continue;
    for (let j = 0; j < 8; j++) for (let i = 0; i < 7; i++) { const xx = x + i + Math.round(sk * j / 8), cal = (Math.abs(i - 3) + Math.abs(j - 3) === 2) || (i === 3 && j === 3) || (j === 6 && i % 2 === 1); if (cal) continue;
      R.pset(xx, y + j, j === 7 && i % 2 ? d_mezclaMu(col, P.k, 0.5) : ond > 0.5 && i < 2 ? d_mezclaMu(col, hex('#ffffff'), 0.3) : col); } }
}

// una maceta de barro con su flor de Nochebuena (brácteas rojas en estrella con el centro amarillo): x, base, escala
function d_nochebuenaMu(R, x, base, s, t = 0) {
  const P = d_MXMu, w = Math.round(5 * s), hh = Math.round(6 * s);
  R.poligono([[x - w - 1, base - hh - 1], [x + w + 1, base - hh - 1], [x + w * 0.75 + 1, base + 1], [x - w * 0.75 - 1, base + 1]], P.k);
  R.poligono([[x - w, base - hh], [x + w, base - hh], [x + w * 0.75, base], [x - w * 0.75, base]], (xx, yy) => (xx > x + w * 0.3 ? P.barroS : yy < base - hh + 2 ? P.barroL : P.barro));
  const cy = base - hh - Math.round(4 * s), sw = Math.sin(t * 1.5 + x) * 0.5;
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + 0.6; for (let d = 1; d < 6 * s; d++) R.pset(Math.round(x + Math.cos(a) * d), Math.round(cy + 2 * s + Math.sin(a) * d * 0.5), P.hoja); }
  for (let k = 0; k < 7; k++) { const a = k * Math.PI * 2 / 7 + sw * 0.1, L = (4 + (k % 2)) * s; for (let d = 0; d < L; d++) { const ww = Math.max(0, Math.round(Math.sin(d / L * Math.PI) * s * 1.3)); for (let q = -ww; q <= ww; q++) R.pset(Math.round(x + Math.cos(a) * d - Math.sin(a) * q), Math.round(cy + Math.sin(a) * d * 0.8 + Math.cos(a) * q), d > L - 1.5 ? P.nocheS : q < 0 ? P.nocheL : P.noche); } }
  R.disco(x, cy, Math.max(1, s * 0.9), P.ama); R.pset(x, cy, P.hoja);
}

// la piñata de siete picos (bola de colores con flecos y conos con borlas), colgada y meciéndose
function d_pinataMu(R, x, y, t, s = 1) {
  const P = d_MXMu, sw = Math.sin(t * 1.6) * 3 * s, cx = Math.round(x + sw), cy = Math.round(y), r = Math.round(7 * s);
  R.linea(x, y - 26 * s, cx, cy - r, P.k);
  const cols = [hex('#f04a8a'), hex('#f8c020'), hex('#3ac0e0'), hex('#7ad040'), hex('#f07a20'), hex('#b060e0'), hex('#f04a4a')];
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 7 + sw * 0.02, L = 12 * s, bx = cx + Math.cos(a) * r * 0.8, by = cy + Math.sin(a) * r * 0.8, tx = cx + Math.cos(a) * (r + L), ty = cy + Math.sin(a) * (r + L), px = -Math.sin(a) * 3 * s, py = Math.cos(a) * 3 * s;
    R.poligono([[bx - px - 1, by - py], [tx, ty], [bx + px + 1, by + py]], P.k); R.poligono([[bx - px, by - py], [tx, ty], [bx + px, by + py]], (xx, yy) => (Math.floor(Math.hypot(xx - cx, yy - cy) / 3) % 2 ? cols[k] : hex('#f8f0e0')));
    for (let q = 0; q < 4; q++) R.pset(Math.round(tx + Math.sin(t * 4 + q + k) * 1), Math.round(ty) + q, cols[(k + 3) % 7]); }
  R.disco(cx, cy, r + 1, P.k); R.disco(cx, cy, r, (xx, yy) => (yy - cy + 7) % 3 === 0 ? cols[((yy - cy + 9) / 3 | 0) % 7] : (xx < cx - 2 ? hex('#ffd0e0') : hex('#f8a0c0')));
}

function d_mexicoMu(R, t, o, cam) {
  const P = d_MXMu, gen = cam !== 'puerta';
  R.copiar(d_capaMu(R, 'mx-cielo-' + cam, () => { d_degradadoMu(R, 0, 179, [[0, P.c0], [0.2, P.c1], [0.36, P.c2], [0.48, P.c3], [0.58, P.c4], [1, P.c4]]); d_lunaMu(R, 228, 22, 6, P.luna, P.lunaS, P.luna); }, false));
  if (gen) d_estrellasMu(R, t, 70, 90, 451, P.est, P.estL);
  const V = gen ? d_VENTMXMu : d_VENTMX2Mu;
  const fr = d_capaMu(R, 'mx-' + cam, () => {
    V.length = 0;
    if (gen) {
      const cr = d_crestaMu(96, 14, 1.7); for (let x = 0; x < 320; x++) for (let y = cr[x]; y < 110; y++) R.pset(x, y, h(x >> 2, y >> 2, 452) < 0.2 ? P.cerroL : P.cerro);
      for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 453) * 319), y = cr[x] + 3 + Math.round(h(k, 2, 453) * 10); if (y < 108) R.pset(x, y, h(k, 3, 453) < 0.6 ? P.luz : P.luzS); }   // las luces de las casas del cerro
      // la parroquia: la cúpula de azulejos amarillos con su linterna y el campanario
      const cx = 160; d_estucoMu(R, 132, 66, 188, 112, [d_mezclaMu(P.cantera, P.c2, 0.3), d_mezclaMu(P.canteraS, P.c2, 0.3), d_mezclaMu(P.canteraL, P.c2, 0.3)], 3);
      for (let y = 46; y <= 70; y++) { const r = Math.round(Math.sqrt(Math.max(0, 1 - ((y - 70) / 24) ** 2)) * 22); for (let x = -r; x <= r; x++) { const gaj = Math.abs(Math.round(x / Math.max(1, r) * 6) - x / Math.max(1, r) * 6) < 0.12; R.pset(cx + x, y, x === -r || x === r ? P.k : gaj ? P.azulejo : ((x + y) % 4 === 0 ? P.azulejoL : x > r * 0.4 ? P.cupulaS : P.cupula)); } }
      R.rect(cx - 4, 38, cx + 4, 46, P.k); R.rect(cx - 3, 39, cx + 3, 46, P.canteraL); R.rect(cx - 1, 40, cx + 1, 44, P.luzS); R.poligono([[cx - 5, 39], [cx, 33], [cx + 5, 39]], P.cupula); R.rect(cx, 26, cx, 33, P.k); R.rect(cx - 2, 28, cx + 2, 28, P.k);
      R.rect(134, 36, 150, 112, P.k); d_estucoMu(R, 135, 37, 149, 112, [d_mezclaMu(P.canteraL, P.c2, 0.25), d_mezclaMu(P.canteraS, P.c2, 0.25), P.canteraL], 5);
      for (const by of [44, 60]) { R.rect(139, by, 145, by + 9, P.k); R.disco(142, by, 3, P.k); R.rect(141, by + 3, 143, by + 6, hex('#a87a3a')); } R.poligono([[133, 37], [142, 28], [151, 37]], P.cupulaS); R.rect(142, 22, 142, 28, P.k); R.rect(140, 24, 144, 24, P.k);
      R.rect(170, 84, 186, 112, P.k); R.disco(178, 84, 8, P.k); R.rect(172, 86, 184, 112, P.maderaS);
      // las casas: enlucido de color con su guardapolvo, pretil con gárgolas, ventanas con reja, puertas en arco
      for (const [x0, x1, top, col] of d_CASASMXMu) {
        const c = d_mezclaMu(hex(col), P.c1, 0.3), cS = d_mezclaMu(c, P.k, 0.3), cL = d_mezclaMu(c, P.luz, 0.18);
        d_estucoMu(R, x0, top, x1, 150, [c, cS, cL], x0); R.rect(x0, 138, x1, 150, cS); R.rect(x0, 137, x1, 137, d_mezclaMu(cS, P.k, 0.3));
        R.rect(x0, top - 4, x1, top, cL); R.rect(x0, top - 5, x1, top - 5, P.k); R.rect(x0, top + 1, x1, top + 1, cS); for (let x = x0 + 8; x < x1 - 4; x += 20) { R.rect(x, top - 1, x + 5, top + 1, P.barroS); R.rect(x + 5, top, x + 6, top + 1, P.k); }
        const n = Math.max(1, Math.floor((x1 - x0) / 26));
        for (let i = 0; i < n; i++) { const wx = Math.round(x0 + (i + 0.5) * (x1 - x0) / n) - 5, on = h(i, x0, 454) < 0.75;
          if (i === n - 1 && x1 - x0 > 40) { R.rect(wx - 1, 116, wx + 11, 150, P.k); R.disco(wx + 5, 117, 6, P.k); R.rect(wx, 118, wx + 10, 150, P.madera); R.disco(wx + 5, 118, 5, P.madera); for (let x = wx + 2; x < wx + 10; x += 3) R.rect(x, 116, x, 150, P.maderaS); R.pset(wx + 8, 134, P.ama); continue; }
          d_ventanaMu(R, wx, 112, wx + 10, 128, { luz: on ? P.luz : P.c1, luzS: on ? P.luzS : P.k, luzL: on ? P.luzL : P.c2, marco: P.canteraL, marcoS: P.k, cruz: false });
          for (let x = wx + 2; x < wx + 10; x += 3) R.rect(x, 112, x, 128, P.hierro); R.rect(wx, 118, wx + 10, 118, P.hierro);
          if (on) V.push([wx, 112, wx + 10, 128]);
          if (top < 98) { d_ventanaMu(R, wx + 1, top + 4, wx + 9, top + 14, { luz: on ? P.luzS : P.c1, luzS: P.k, luzL: on ? P.luz : P.c2, marco: P.canteraL, marcoS: P.k }); R.rect(wx - 2, top + 15, wx + 12, top + 16, P.hierro); for (let x = wx - 2; x <= wx + 12; x += 2) R.rect(x, top + 11, x, top + 15, P.hierro); R.rect(wx - 2, top + 11, wx + 12, top + 11, P.hierro); } }
        for (let k = 0; k < 3; k++) if (h(k, x0, 455) < 0.7) d_nochebuenaMu(R, x0 + 6 + Math.round(h(k, x0, 456) * (x1 - x0 - 12)), 150, 1); }
      // la calle empedrada de piedra bola con las velas de la procesión
      for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 150) / 4), cx2 = ((x + (fila % 2) * 3) % 6), dy = (y - 150) % 4; let c = dy === 3 || cx2 === 5 ? P.piedraS : dy === 0 && cx2 < 3 ? P.piedraL : h(x >> 1, y, 457) < 0.2 ? P.piedraS : P.piedra;
        for (const lx of [40, 160, 290]) { const e = ((x - lx) / 50) ** 2 + ((y - 156) / 12) ** 2; if (e < 1 && d_umbralMu(x, y) < (1 - e) * 0.8) c = d_mezclaMu(c, P.luz, 0.3); } R.pset(x, y, c); }
      R.rect(0, 150, 319, 151, P.canteraS);
      // faroles de pared
      for (const [lx, ly] of [[40, 106], [160, 104], [290, 106]]) { if (lx === 160) continue; R.rect(lx - 3, ly, lx + 3, ly + 8, P.k); R.rect(lx - 2, ly + 1, lx + 2, ly + 7, P.luz); R.rect(lx - 4, ly - 1, lx + 4, ly - 1, P.hierro); R.linea(lx, ly - 1, lx + 6, ly - 6, P.hierro); }
    } else {
      // la puerta de la posada: muro rosa, marco de cantera labrada, puerta de tablones con clavos, la ventana con reja
      const c = d_mezclaMu(hex('#d0407a'), P.c1, 0.28);
      d_estucoMu(R, 0, 0, 319, 162, [c, d_mezclaMu(c, P.k, 0.3), d_mezclaMu(c, P.luz, 0.2)], 11);
      R.rect(0, 140, 319, 162, d_mezclaMu(c, P.k, 0.35)); R.rect(0, 139, 319, 139, P.k);
      const x0 = 168, x1 = 252, y0 = 46;
      d_piedrasMu(R, x0 - 14, y0 - 16, x1 + 14, 162, [P.cantera, P.canteraS, P.canteraL, P.k], 7, 14, 4);
      R.rect(x0 - 16, y0 - 22, x1 + 16, y0 - 16, P.canteraL); R.rect(x0 - 16, y0 - 16, x1 + 16, y0 - 16, P.canteraS); for (let x = x0 - 12; x < x1 + 12; x += 8) { R.disco(x + 4, y0 - 19, 2, P.canteraS); R.pset(x + 4, y0 - 19, P.canteraL); }
      R.rect(x0 - 1, y0 - 1, x1 + 1, 162, P.k);
      for (let y = y0; y < 162; y++) for (let x = x0; x <= x1; x++) { const lx = (x - x0) % 42, m = lx % 7; let col = m === 6 ? P.maderaS : m === 0 ? P.maderaL : (h(x, y >> 2, 458) < 0.1 ? P.maderaS : P.madera); if (lx === 41 || lx === 0) col = P.k; if ((y - y0) % 30 < 3) col = P.maderaS; R.pset(x, y, col); }
      for (let y = y0 + 8; y < 160; y += 15) for (let x = x0 + 4; x < x1; x += 7) { R.pset(x, y, P.k); R.pset(x - 1, y - 1, P.canteraL); }
      R.disco(204, 108, 4, P.hierro); R.disco(204, 108, 3, P.k); R.disco(204, 108, 2, P.hierro); R.disco(216, 108, 4, P.hierro); R.disco(216, 108, 3, P.k); R.disco(216, 108, 2, P.hierro);
      R.rect(x0 - 2, 160, x1 + 2, 166, P.canteraS); R.rect(x0 - 2, 160, x1 + 2, 160, P.canteraL);
      d_ventanaMu(R, 40, 50, 100, 116, { luz: P.luz, luzS: P.luzS, luzL: P.luzL, marco: P.canteraL, marcoS: P.k, cruz: false, cortina: hex('#e8d8b8'), cortinaS: hex('#c8b090') });
      for (let x = 44; x < 100; x += 6) R.rect(x, 50, x + 1, 116, P.hierro); for (const y of [64, 90]) R.rect(40, y, 100, y + 1, P.hierro); for (let x = 46; x < 100; x += 12) { R.disco(x + 3, 58, 2, P.hierro); R.disco(x + 3, 58, 1, P.luz); }
      V.push([40, 50, 100, 116]);
      R.rect(32, 118, 108, 124, P.canteraL); R.rect(32, 124, 108, 125, P.canteraS);
      // el banco de azulejos
      for (let y = 140; y < 162; y++) for (let x = 20; x < 120; x++) { const tx = (x - 20) % 8, ty = (y - 140) % 8, dd = Math.abs(tx - 3.5) + Math.abs(ty - 3.5); R.pset(x, y, tx === 7 || ty === 7 ? P.k : dd < 2 ? P.azulejo : dd < 3 ? P.ama : P.azulejoL); }
      R.rect(18, 136, 122, 139, P.canteraL); R.rect(18, 139, 122, 140, P.canteraS);
      for (let y = 166; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 166) / 4), cx2 = ((x + (fila % 2) * 3) % 6), dy = (y - 166) % 4; R.pset(x, y, dy === 3 || cx2 === 5 ? P.piedraS : dy === 0 && cx2 < 3 ? P.piedraL : P.piedra); }
      R.rect(0, 162, 319, 165, P.canteraS); R.rect(0, 162, 319, 162, P.canteraL);
    }
  });
  d_pegarMu(R, fr);
  // la vida: el papel picado ondea, los faroles de papel se mecen y brillan, las velas tiemblan, la piñata se mece
  for (let k = 0; k < V.length; k += 2) { const [x0, y0, x1, y1] = V[k], u = ((t * 0.2 + k * 0.31) % 1.8) - 0.4; if (u < 0 || u > 1) continue; const px = Math.round(x0 + u * (x1 - x0)); R.recorte([x0, y0, x1, y1]); for (let y = Math.round((y0 + y1) / 2); y <= y1; y++) for (let i = -1; i <= 1; i++) R.pset(px + i, y, P.luzS); R.disco(px, Math.round((y0 + y1) / 2) - 2, 2, P.luzS); R.recorte(null); }
  if (gen) {
    for (const [lx, ly] of [[40, 110], [290, 110]]) d_haloMu(R, lx, ly, 16, P.luz, 0.3 + 0.05 * Math.sin(t * 8 + lx));
    d_picadoMu(R, 0, 54, 126, 60, 8, t, 0); d_picadoMu(R, 196, 58, 320, 54, 8, t, 3); d_picadoMu(R, 0, 82, 320, 80, 10, t, 5);
    for (let k = 0; k < 6; k++) { const lx = 24 + k * 54, ly = 96 + Math.round(Math.sin(k * 1.3) * 3), sw = Math.round(Math.sin(t * 1.4 + k) * 1.2), col = [hex('#f07a20'), hex('#f04a8a'), hex('#f8c020')][k % 3];
      R.linea(lx, ly - 6, lx + sw, ly - 3, P.k); R.disco(lx + sw, ly, 4, P.k); R.disco(lx + sw, ly, 3, col); R.rect(lx + sw - 3, ly, lx + sw + 3, ly, d_mezclaMu(col, P.k, 0.3)); R.disco(lx + sw - 1, ly - 1, 1, P.luzL); d_haloMu(R, lx + sw, ly, 9, col, 0.25); }
    if (o.pinata !== false) d_pinataMu(R, 246, 70, t, 1);
    for (let k = 0; k < 7; k++) { const x = 20 + k * 46, y = 166 + (k % 2) * 6; R.rect(x, y - 4, x + 1, y, hex('#f4ecd8')); R.pset(x, y - 5 - (Math.sin(t * 12 + k) > 0 ? 1 : 0), P.vela); R.pset(x + 1, y - 5, P.luz); d_haloMu(R, x, y - 5, 5, P.luz, 0.25); }
  } else {
    d_picadoMu(R, -4, 18, 270, 20, 10, t, 2); d_picadoMu(R, -4, 34, 150, 38, 6, t, 4);
    { const lx = 140, ly = 46, sw = Math.sin(t * 1.3) * 1.5; R.linea(lx, 30, lx + sw, ly - 8, P.k);   // el farol de hojalata con su estrella calada
      R.poligono([[lx - 7 + sw, ly - 6], [lx + 7 + sw, ly - 6], [lx + 9 + sw, ly + 6], [lx - 9 + sw, ly + 6]], P.k); R.poligono([[lx - 6 + sw, ly - 5], [lx + 6 + sw, ly - 5], [lx + 8 + sw, ly + 5], [lx - 8 + sw, ly + 5]], (x, y) => ((x + y) % 3 === 0 ? P.luzL : P.luz)); R.poligono([[lx - 8 + sw, ly - 6], [lx + sw, ly - 12], [lx + 8 + sw, ly - 6]], hex('#a0a4b0')); d_haloMu(R, Math.round(lx + sw), ly, 26, P.luz, 0.3 + 0.05 * Math.sin(t * 9)); }
    for (const [x, b, s] of [[150, 160, 1.8], [270, 160, 1.8], [128, 136, 1.2]]) d_nochebuenaMu(R, x, b, s, t);
    for (let k = 0; k < 4; k++) { const x = 160 + k * 30, y = 176; R.rect(x, y - 6, x + 1, y, hex('#f4ecd8')); R.pset(x, y - 7 - (Math.sin(t * 12 + k) > 0 ? 1 : 0), P.vela); d_haloMu(R, x, y - 7, 6, P.luz, 0.25); }
  }
  return gen ? d_GEOMu.mexico : d_GEOMu.mexicoPuerta;
}

const d_VENTMXMu = [], d_VENTMX2Mu = [];

// las macetas de Nochebuena del primer término (por delante de los personajes)
function d_mexicoDelanteMu(R, t, o, cam) {
  if (cam === 'puerta') { d_nochebuenaMu(R, 304, 182, 2.4, t); return; }
  d_nochebuenaMu(R, 10, 182, 2.2, t); d_nochebuenaMu(R, 312, 184, 2.4, t);
}

const d_JPMu = pal({
  c0: '#141026', c1: '#221a3a', c2: '#3a2a4e', c3: '#5a3a5c', c4: '#7a5068', est: '#8a7aa0', estL: '#e0d8f0',
  bloque: '#3a3e56', bloqueS: '#2a2c40', bloqueL: '#4e5470', vent: '#f0e8c0', ventA: '#a8d0f0', ventS: '#5a5e7a', k: '#0c0a14',
  rojo: '#d0202a', rojoS: '#8a1018', rojoL: '#f05a50', blanco: '#f4f0ea', blancoS: '#c8c4c0', acero: '#a8b0bc', aceroS: '#6a7280', aceroL: '#dce2ea',
  madera: '#4a2e1e', maderaS: '#2e1a10', maderaL: '#6a4630', indigo: '#22305a', indigoL: '#3a4a7a', papel: '#f0e4c8', luz: '#ffe0a0', luzL: '#fffae8', luzS: '#f0a050',
  acera: '#6a6878', aceraS: '#4e4c5a', aceraL: '#8a8898', asfalto: '#2a2834', asfaltoL: '#3a3846', raya: '#d8d4cc', led: '#e8f4ff', ledA: '#6ab8ff', ledS: '#2a4a6a',
  pollo: '#c87830', polloS: '#8a4a18', polloL: '#f0a850', tarta: '#f8f0f0', fresa: '#e83040',
});

// una cubeta de pollo a rayas rojas y blancas (sin letras), con la tapa y los muslos asomando: x (centro), base, escala
function d_cubetaMu(R, x, base, s, tapa = false) {
  const P = d_JPMu, wb = 5 * s, wt = 7 * s, hh = Math.round(10 * s);
  R.poligono([[x - wt - 1, base - hh - 1], [x + wt + 1, base - hh - 1], [x + wb + 1, base + 1], [x - wb - 1, base + 1]], P.k);
  R.poligono([[x - wt, base - hh], [x + wt, base - hh], [x + wb, base], [x - wb, base]], (xx, yy) => { const u = (xx - x) / (wb + (wt - wb) * (base - yy) / hh); const f = Math.floor((u + 1) * 3.5); return f % 2 ? (u > 0.5 ? P.rojoS : P.rojo) : (u > 0.5 ? P.blancoS : P.blanco); });
  R.rect(Math.round(x - wt), base - hh, Math.round(x + wt), base - hh + Math.max(1, Math.round(s * 0.8)), P.rojoS);
  if (tapa) { R.rect(Math.round(x - wt - 1), base - hh - Math.round(2 * s), Math.round(x + wt + 1), base - hh - 1, P.k); R.rect(Math.round(x - wt), base - hh - Math.round(2 * s) + 1, Math.round(x + wt), base - hh - 1, P.rojo); }
  else for (let k = 0; k < 3; k++) { const px = Math.round(x - wt * 0.5 + k * wt * 0.5); R.disco(px, base - hh - Math.round(s), Math.max(1.5, s * 1.6), P.polloS); R.disco(px, base - hh - Math.round(s * 1.2), Math.max(1, s * 1.2), k % 2 ? P.pollo : P.polloL); }
}

// el pictograma de la pata de pollo (sin letras)
function d_muslitoMu(R, x, y, s, c, cS) { R.disco(x, y, 3 * s, cS); R.disco(x - s * 0.5, y - s * 0.5, 2.6 * s, c); R.linea(x + 2 * s, y + 2 * s, x + 5 * s, y + 5 * s, cS); R.disco(x + 5.5 * s, y + 5.5 * s, s, d_JPMu.blanco); R.disco(x + 4.5 * s, y + 6 * s, s * 0.8, d_JPMu.blanco); }

function d_japonMu(R, t, o, cam) {
  const P = d_JPMu, gen = cam !== 'mostrador';
  const fr = d_capaMu(R, 'jp-' + cam, () => {
    if (gen) {
      d_degradadoMu(R, 0, 110, [[0, P.c0], [0.3, P.c1], [0.55, P.c2], [0.78, P.c3], [1, P.c4]]);
      // los bloques de pisos del fondo con su cuadrícula de ventanas, depósitos en la azotea y la torre de celosía
      for (const [x0, x1, top] of [[-4, 46, 52], [46, 92, 40], [92, 140, 58], [176, 226, 46], [226, 270, 60], [270, 324, 70]]) { R.rect(x0, top, x1, 110, P.bloqueS); R.rect(x0 + 1, top + 1, x1 - 1, 110, P.bloque); R.rect(x1 - 4, top + 1, x1 - 1, 110, P.bloqueS);
        for (let y = top + 4; y < 104; y += 6) { R.rect(x0 + 1, y + 4, x1 - 1, y + 4, P.bloqueL); for (let x = x0 + 3; x < x1 - 4; x += 5) { const v = h(x, y, 461); R.rect(x, y, x + 2, y + 2, v < 0.35 ? P.vent : v < 0.5 ? P.ventA : P.ventS); } }
        R.rect(x0 + 6, top - 5, x0 + 12, top, P.bloqueL); R.rect(x0 + 6, top - 5, x0 + 12, top - 5, P.aceroS); }
      for (let y = 20; y < 110; y++) { const w = Math.round(2 + (y - 20) * 0.08); for (let x = -w; x <= w; x++) if (Math.abs(x) === w || (y + x * 2) % 8 === 0 || (y - x * 2) % 8 === 0) R.pset(157 + x, y, (Math.floor((y - 20) / 12) % 2) ? P.rojoS : P.blancoS); }
      // el viaducto del tren
      R.rect(0, 74, 319, 77, P.bloqueS); R.rect(0, 73, 319, 73, P.aceroS); for (let x = 8; x < 320; x += 40) R.rect(x, 78, x + 5, 110, P.bloqueS);
      // las tiendas: la izakaya con noren y farolillos, la tienda de 24 horas, la del pollo y la pastelería
      const tienda = (x0, x1, top) => { R.rect(x0, top, x1, 150, P.k); };
      tienda(-2, 58, 88); d_tablasMu(R, 0, 89, 56, 150, P.madera, P.maderaS, P.maderaL, 3, true, 3); R.rect(0, 89, 56, 100, P.maderaS); R.rect(0, 98, 56, 99, P.k);
      R.rect(6, 108, 50, 150, P.k); for (let x = 7; x < 50; x++) for (let y = 109; y < 150; y++) R.pset(x, y, (x - 7) % 11 === 0 || (y - 109) % 9 === 0 ? P.maderaS : P.papel);
      for (let x = 6; x <= 50; x++) for (let y = 104; y < 122; y++) { if ((x - 6) % 11 === 10 && y > 108) continue; R.pset(x, y, (x - 6) % 11 === 0 ? P.indigoL : P.indigo); } R.disco(28, 112, 3, P.blanco); R.disco(28, 112, 2, P.indigo);
      tienda(58, 118, 84); R.rect(59, 85, 117, 150, P.blancoS); R.rect(59, 85, 117, 96, P.blanco); R.rect(59, 90, 117, 92, hex('#2a6ac8')); R.rect(59, 93, 117, 94, hex('#3ab070'));
      R.rect(62, 100, 114, 150, P.k); for (let y = 101; y < 150; y++) for (let x = 63; x < 114; x++) R.pset(x, y, y % 10 === 0 ? P.aceroS : (y % 10 < 6 && h(x >> 1, y >> 2, 462) < 0.7) ? [hex('#e85050'), hex('#50a0e8'), hex('#f0d050'), hex('#60c060'), P.blanco][Math.floor(h(x >> 1, y >> 2, 463) * 5)] : P.luzL);
      R.rect(88, 100, 88, 150, P.aceroS);
      tienda(118, 228, 74);
      for (let y = 75; y < 96; y++) for (let x = 119; x < 228; x++) R.pset(x, y, y < 77 || y > 93 ? P.rojoS : P.rojo);
      R.rect(124, 77, 150, 93, P.blanco); d_muslitoMu(R, 135, 84, 1.4, P.pollo, P.polloS); R.rect(196, 77, 222, 93, P.blanco); d_cubetaMu(R, 209, 92, 1.1, false);
      R.rect(156, 80, 190, 82, P.blanco); R.rect(156, 86, 184, 88, P.blanco);
      R.rect(119, 96, 227, 150, P.blancoS); R.rect(119, 96, 227, 100, P.blanco);
      R.rect(124, 108, 198, 146, P.k); for (let y = 109; y < 146; y++) for (let x = 125; x < 198; x++) R.pset(x, y, y > 140 ? P.aceroL : P.luzL);
      for (const sy of [118, 130, 141]) { R.rect(126, sy + 1, 197, sy + 1, P.aceroS); for (let x = 132; x < 196; x += 13) d_cubetaMu(R, x, sy, sy === 141 ? 0.9 : 0.7, sy === 118); }
      R.rect(202, 108, 222, 150, P.k); R.rect(203, 109, 221, 150, P.luz); R.rect(212, 109, 212, 150, P.aceroS); R.rect(209, 126, 210, 132, P.aceroS);
      tienda(228, 322, 86); d_estucoMu(R, 229, 87, 321, 150, [hex('#e8d8c8'), hex('#b8a898'), hex('#f8ece0')], 2); R.rect(229, 87, 321, 98, hex('#6a3a2a')); R.rect(232, 90, 318, 90, P.luz);
      R.rect(236, 104, 312, 140, P.k); for (let y = 105; y < 140; y++) for (let x = 237; x < 312; x++) R.pset(x, y, y > 132 ? P.blanco : P.luzL); R.rect(237, 126, 311, 127, P.aceroS);
      for (let x = 242; x < 308; x += 13) { R.rect(x, 118, x + 9, 125, P.tarta); R.rect(x, 118, x + 9, 118, hex('#fff8f8')); R.rect(x, 121, x + 9, 121, hex('#f0c8c8')); for (let i = 0; i < 4; i++) R.pset(x + 1 + i * 2, 117, P.fresa); }
      for (let x = 242; x < 308; x += 16) { R.disco(x + 4, 132, 4, P.tarta); R.pset(x + 4, 129, P.fresa); R.pset(x + 2, 130, P.fresa); }
      for (let a = 0; a < 6.28; a += 0.12) R.disco(274 + Math.round(Math.cos(a) * 6), 100 + Math.round(Math.sin(a) * 2), 1, hex('#2e6a3a'));
      // la acera de baldosas, el bordillo y la calle con su raya
      for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { let c; if (y < 162) { const bx = (x + ((y - 150) >> 2) * 3) % 8, by = (y - 150) % 4; c = bx === 0 || by === 0 ? P.aceraS : h(x >> 1, y, 464) < 0.2 ? P.aceraL : P.acera; } else if (y < 164) c = y === 162 ? P.aceraL : P.aceraS; else { c = h(x >> 1, y, 465) < 0.3 ? P.asfaltoL : P.asfalto; if (y >= 172 && y < 174 && (x % 24) < 12) c = P.raya; }
        for (const lx of [161, 87, 274]) { const e = ((x - lx) / 46) ** 2 + ((y - 158) / 10) ** 2; if (e < 1 && d_umbralMu(x, y) < (1 - e) * 0.7) c = d_mezclaMu(c, P.luz, 0.3); } R.pset(x, y, c); }
      // los postes de la luz con sus transformadores y la bici aparcada
      for (const px of [24, 262]) { R.rect(px - 2, 34, px + 1, 162, P.aceroS); R.rect(px - 1, 34, px - 1, 162, P.acero); R.rect(px - 8, 40, px + 7, 41, P.aceroS); R.rect(px - 8, 52, px + 7, 53, P.aceroS); R.rect(px + 3, 56, px + 8, 66, P.acero); R.rect(px + 3, 56, px + 4, 66, P.aceroL); }
      for (let k = 0; k < 4; k++) { const y0 = 40 + k * 4 + (k > 1 ? 8 : 0); for (let x = 24; x <= 262; x++) { const u = (x - 24) / 238, y = Math.round(y0 + Math.sin(u * Math.PI) * 8); R.pset(x, y, P.k); } }
      { const bx = 74, by = 160; R.disco(bx, by - 3, 3, P.k); R.disco(bx + 12, by - 3, 3, P.k); R.disco(bx, by - 3, 2, P.acera); R.disco(bx + 12, by - 3, 2, P.acera); R.linea(bx, by - 3, bx + 5, by - 9, P.rojo); R.linea(bx + 5, by - 9, bx + 12, by - 3, P.rojo); R.linea(bx + 5, by - 9, bx + 10, by - 9, P.rojo); R.rect(bx + 3, by - 10, bx + 6, by - 10, P.k); R.rect(bx + 10, by - 11, bx + 12, by - 11, P.aceroS); R.rect(bx + 11, by - 9, bx + 14, by - 7, P.aceroS); }
      // la máquina expendedora
      R.rect(100, 128, 116, 160, P.k); R.rect(101, 129, 115, 159, P.blanco); R.rect(102, 130, 114, 144, P.luzL); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) R.rect(103 + i * 3, 131 + j * 5, 104 + i * 3, 134 + j * 5, [P.rojo, hex('#3a8ae8'), hex('#f0a020'), hex('#3ab070')][(i + j) % 4]); R.rect(104, 148, 112, 152, P.k);
      // los árboles de la acera envueltos en luces (las bombillas titilan con t)
      for (const tx of [44, 238]) { R.rect(tx - 1, 120, tx + 1, 160, P.maderaS); R.disco(tx, 112, 14, P.ledS); R.disco(tx - 3, 108, 9, d_mezclaMu(P.ledS, P.ledA, 0.2)); R.rect(tx - 5, 158, tx + 5, 162, P.aceraS); }
      if (o.santa !== false) { const sx = 214, sb = 150; R.rect(sx - 5, sb - 2, sx + 5, sb, P.aceroS); R.rect(sx - 4, sb - 14, sx + 4, sb - 3, P.k); R.rect(sx - 3, sb - 13, sx + 3, sb - 3, P.rojo); R.rect(sx - 3, sb - 7, sx + 3, sb - 7, P.k); R.rect(sx - 3, sb - 4, sx + 3, sb - 3, P.blanco);
        R.disco(sx, sb - 17, 4, P.k); R.disco(sx, sb - 17, 3, hex('#f0c8a0')); R.rect(sx - 3, sb - 16, sx + 3, sb - 13, P.blanco); R.pset(sx - 1, sb - 18, P.k); R.pset(sx + 1, sb - 18, P.k); R.poligono([[sx - 4, sb - 20], [sx + 4, sb - 20], [sx + 6, sb - 25]], P.rojo); R.rect(sx - 4, sb - 20, sx + 4, sb - 20, P.blanco); R.pset(sx + 6, sb - 25, P.blanco); }
    } else {
      // el mostrador por dentro: pared de azulejo blanco con franja roja, los paneles del menú, la freidora y la estantería caliente
      for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c = (x % 10 === 0 || y % 10 === 0) ? P.blancoS : h(x >> 2, y >> 2, 466) < 0.1 ? P.aceroL : P.blanco; if (y > 68 && y < 74) c = P.rojo; if (y < 10) c = P.aceroS; R.pset(x, y, c); }
      for (let x = 0; x < 320; x += 40) { R.rect(x + 10, 8, x + 30, 11, P.luzL); }
      for (let k = 0; k < 3; k++) { const x0 = 30 + k * 86, x1 = x0 + 74; R.rect(x0 - 2, 22, x1 + 2, 64, P.k); R.rect(x0, 24, x1, 62, k === 1 ? P.rojo : P.k);
        if (k === 1) { d_cubetaMu(R, x0 + 18, 56, 2, false); d_muslitoMu(R, x0 + 50, 34, 2.2, P.pollo, P.polloS); R.numero('3980', x0 + 34, 60, { tam: 7 }); }
        else for (let j = 0; j < 3; j++) { d_muslitoMu(R, x0 + 8, 31 + j * 11, 0.9, P.pollo, P.polloS); R.rect(x0 + 18, 31 + j * 11, x0 + 34 - j * 3, 32 + j * 11, P.blancoS); R.numero(String([480, 960, 1450][j] + k * 30), x0 + 38, 36 + j * 11, { tam: 5 }); } }
      // la freidora de acero con sus cestas y el vapor; la estantería caliente con cubetas
      R.rect(10, 78, 110, 140, P.k); R.rect(11, 79, 109, 140, P.acero); for (let x = 14; x < 108; x += 6) R.rect(x, 80, x, 140, P.aceroS); R.rect(11, 79, 109, 82, P.aceroL);
      R.rect(18, 86, 100, 98, P.k); R.rect(19, 87, 99, 97, hex('#c08a30')); for (let x = 20; x < 98; x += 3) R.pset(x, 90 + (x % 2), hex('#f0c060'));
      R.rect(30, 70, 32, 86, P.aceroS); R.rect(76, 70, 78, 86, P.aceroS);
      R.rect(200, 72, 310, 76, P.aceroS); R.rect(200, 100, 310, 104, P.aceroS); R.rect(200, 72, 310, 72, P.aceroL); for (let x = 212; x < 310; x += 20) { d_cubetaMu(R, x, 98, 1.2, true); }
      for (let x = 200; x < 312; x++) for (let y = 77; y < 100; y++) if (d_umbralMu(x, y) < 0.3) d_tintaMu(R, x, y, P.luzS, 0.35);
      R.rect(200, 105, 310, 140, P.aceroS); for (let x = 202; x < 310; x += 12) { R.rect(x, 108, x + 9, 136, P.acero); R.rect(x + 7, 120, x + 8, 124, P.aceroL); }
      R.rect(0, 140, 319, 179, P.aceroS); for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) if ((x + y) % 12 === 0) R.pset(x, y, P.acero);
    }
  }, false);
  R.copiar(fr);
  if (gen) {
    d_estrellasMu(R, t, 18, 40, 467, P.est, P.estL);
    // el tren que pasa por el viaducto (sus ventanas encendidas)
    { const u = ((t * 40) % 900) - 300, tx = Math.round(u); for (let k = 0; k < 4; k++) { const x0 = tx + k * 54; R.rect(x0, 63, x0 + 50, 72, P.k); R.rect(x0 + 1, 64, x0 + 49, 71, P.aceroL); R.rect(x0 + 1, 68, x0 + 49, 68, hex('#3ab070')); for (let x = x0 + 4; x < x0 + 48; x += 6) R.rect(x, 65, x + 3, 67, P.luzL); } }
    R.rect(0, 73, 319, 73, P.aceroS);
    if (Math.floor(t * 1.2) % 2) { R.pset(68, 39, P.rojoL); R.pset(200, 45, P.rojoL); } R.pset(157, 19, Math.floor(t * 1.5) % 2 ? P.rojoL : P.rojoS);
    d_humoMu(R, 150, 72, t, hex('#8a7a9a'), hex('#6a5a7a'), 5, 0.6);
    // los faroles rojos de la izakaya, el toldo, la gente dentro de la tienda y las luces de los árboles
    for (const lx of [10, 46]) { const sw = Math.round(Math.sin(t * 1.2 + lx) * 0.8); R.rect(lx - 3 + sw, 100, lx + 3 + sw, 110, P.k); R.rect(lx - 2 + sw, 101, lx + 2 + sw, 109, P.rojo); R.rect(lx - 2 + sw, 104, lx + 2 + sw, 104, P.rojoS); R.rect(lx - 2 + sw, 101, lx - 1 + sw, 108, P.rojoL); d_haloMu(R, lx + sw, 105, 10, P.rojoL, 0.2); }
    R.recorte([63, 101, 113, 149]); for (let k = 0; k < 2; k++) { const x = Math.round(66 + ((t * 5 + k * 26) % 46)); d_genteMu(R, x, 149, t, { c: [hex('#4a4a6a'), hex('#8a3a3a')][k], anda: true, dir: k ? -1 : 1, alto: 10 }); } R.recorte(null);
    R.recorte([125, 109, 197, 145]); { const x = Math.round(150 + Math.sin(t * 0.7) * 20); d_genteMu(R, x, 146, t, { c: P.rojo, gorro: P.blanco, anda: true, dir: Math.cos(t * 0.7) > 0 ? 1 : -1, alto: 10 }); } R.recorte(null);
    for (let y = 97; y < 104; y++) for (let x = 117; x < 230; x++) { const ond = Math.round(Math.sin(t * 2 + x * 0.2) * 0.5); R.pset(x, y + ond, ((x - 117) >> 3) % 2 ? P.blanco : P.rojo); } R.rect(117, 104, 230, 104, P.rojoS); for (let x = 117; x < 230; x += 8) R.pset(x + 4, 105, P.rojoS);
    for (const tx of [44, 238]) for (let k = 0; k < 40; k++) { const a = h(k, tx, 468) * 6.28, r = h(k, 2, 468) * 13, x = Math.round(tx + Math.cos(a) * r), y = Math.round(112 + Math.sin(a) * r * 0.9), on = Math.sin(t * 3 + k * 2.1) > -0.2; R.pset(x, y, on ? (k % 3 ? P.led : P.ledA) : P.ledS); }
    for (const lx of [161, 87, 274]) d_haloMu(R, lx, 128, 30, P.luz, 0.1);
  } else {
    // el vapor de la freidora, el aceite que burbujea y la luz caliente que parpadea
    for (let k = 0; k < 6; k++) { const u = (t * 0.4 + k / 6) % 1, x = Math.round(24 + k * 14 + Math.sin(t + k) * 3), y = Math.round(84 - u * 50), r = 2 + u * 4; if (d_umbralMu(x, y) < 0.9 - u) R.disco(x, y, r, (xx, yy) => (d_umbralMu(xx, yy) < 0.6 - u * 0.5 ? P.blanco : R.pget(xx, yy))); }
    for (let k = 0; k < 10; k++) { const x = 22 + Math.round(h(k, 1, 469) * 74), y = 90 + Math.round(h(k, 2, 469) * 6); if (Math.sin(t * 7 + k * 2) > 0.3) R.pset(x, y, hex('#fff0a0')); }
    for (let x = 220; x < 300; x += 30) d_haloMu(R, x, 80, 12, P.luzS, 0.15 + 0.05 * Math.sin(t * 2 + x));
  }
  return gen ? d_GEOMu.japon : d_GEOMu.japonMostrador;
}

// el mostrador de la tienda de pollo (cámara 'mostrador'), por delante de los empleados: frente rojo con paneles
// blancos, encimera de acero con cubetas, bandeja y la caja registradora con pictogramas
function d_japonDelanteMu(R, t, o, cam) {
  if (cam !== 'mostrador') return;
  const P = d_JPMu;
  R.rect(0, 146, 319, 179, P.k); R.rect(0, 147, 319, 179, P.rojo); for (let x = 10; x < 320; x += 50) { R.rect(x, 154, x + 38, 174, P.rojoS); R.rect(x + 1, 155, x + 37, 173, P.blanco); R.rect(x + 1, 171, x + 37, 173, P.blancoS); }
  R.rect(0, 142, 319, 146, P.acero); R.rect(0, 142, 319, 142, P.aceroL); R.rect(0, 146, 319, 146, P.aceroS);
  for (const [x, s] of [[60, 1.6], [84, 1.6], [72, 1.6]]) d_cubetaMu(R, x, 142, s, x === 72);
  d_cubetaMu(R, 72, 124, 1.6, true);
  R.rect(110, 138, 140, 141, P.aceroS); for (let k = 0; k < 4; k++) R.disco(114 + k * 7, 137, 2, k % 2 ? P.pollo : P.polloL);
  R.rect(240, 126, 280, 141, P.k); R.rect(241, 127, 279, 141, P.aceroL); R.rect(246, 129, 274, 135, hex('#1a3a2a')); R.numero('3980', 248, 135, { tam: 5 }); for (let i = 0; i < 4; i++) R.rect(244 + i * 9, 137, 250 + i * 9, 139, P.aceroS);
}

const d_AUSMu = pal({
  c0: '#2a7ad8', c1: '#3a96e8', c2: '#6ab8f0', c3: '#a0d8f4', c4: '#d8f0f4', nube0: '#a8d0ec', nube1: '#e8f4fc', nube2: '#ffffff', ave: '#2a3a4a',
  mar0: '#1a5aa8', mar1: '#2a7ac0', mar2: '#2aa0c8', mar3: '#40c8c8', mar4: '#7ae0d0', espuma: '#f4fcff', espumaS: '#bce4ec',
  arena: '#f0d8a0', arenaS: '#d8b878', arenaL: '#fae8bc', arenaM: '#c8a46a', arenaMS: '#a88a58',
  roca: '#a8785a', rocaS: '#7a5240', rocaL: '#c8987a', pino: '#2a5a3a', pinoS: '#1a3e2a', pinoL: '#3a7a4a', k: '#1a1414',
  rojo: '#e03a2a', amarillo: '#f8d030', blanco: '#f8f6f0', blancoS: '#c8c8cc', acero: '#7a7e88', aceroS: '#4a4e58', aceroL: '#b8bcc4',
  salchicha: '#a8502a', salchichaL: '#d07a40', salchichaS: '#6a2a14', gamba: '#f07a4a', gambaL: '#ffb080', fuego: '#ff9a30', fuegoL: '#ffe080', azul: '#2a6ac8',
});

function d_australiaMu(R, t, o, cam) {
  const P = d_AUSMu, gen = cam !== 'parrilla', hor = gen ? 76 : 70;
  R.copiar(d_capaMu(R, 'aus-cielo-' + cam, () => { d_degradadoMu(R, 0, 179, [[0, P.c0], [0.14, P.c1], [0.28, P.c2], [0.38, P.c3], [0.43, P.c4], [1, P.c4]]); const sx = 236, sy = 24; for (let j = -18; j <= 18; j++) for (let i = -18; i <= 18; i++) { const d = Math.hypot(i, j); if (d > 8 && d < 18 && d_umbralMu(sx + i, sy + j) < ((18 - d) / 10) ** 2) R.pset(sx + i, sy + j, d_mezclaMu(R.pget(sx + i, sy + j), hex('#fff8dc'), 0.5)); } R.disco(sx, sy, 9, hex('#fff4c0')); R.disco(sx, sy, 8, hex('#ffe890')); R.disco(sx - 2, sy - 2, 3, hex('#fffcec')); }, false));
  d_nubesMu(R, t, hor, [P.nube0, P.nube1, P.nube2], 5, 0.8, 11);
  d_avesMu(R, t, 4, 28, P.ave, 12, 3);
  const fr = d_capaMu(R, 'aus-' + cam, () => {
    // el cabo de roca con sus araucarias (a la izquierda, lejos de Atom)
    const cx0 = gen ? 0 : 0, cx1 = gen ? 86 : 60;
    for (let x = cx0; x < cx1; x++) { const yt = Math.round(hor - 14 + ((x - cx0) / (cx1 - cx0)) ** 2 * 14 + Math.sin(x * 0.4) * 1.2); for (let y = yt; y <= hor + 2; y++) R.pset(x, y, y - yt < 2 ? P.pino : (y + (x >> 2)) % 5 === 0 ? P.rocaS : x % 9 < 3 ? P.rocaL : P.roca); }
    for (const [px, al] of (gen ? [[14, 22], [30, 18], [46, 20], [60, 14]] : [[10, 20], [28, 16], [42, 12]])) { const yb = hor - 12; R.rect(px, yb - al, px, yb, P.k); for (let k = 0; k < al / 3; k++) { const y = yb - al + k * 3 + 2, w = 2 + Math.round(k * 0.7); R.rect(px - w, y, px + w, y, P.pino); R.pset(px - w, y + 1, P.pinoS); R.pset(px + w, y + 1, P.pinoS); R.pset(px - w + 1, y - 1, P.pinoL); } }
    // el mar: del azul profundo al turquesa de la orilla, con sus brillos
    const ya = gen ? 118 : 108;
    for (let y = hor; y < ya; y++) { const u = (y - hor) / (ya - hor); for (let x = 0; x < 320; x++) { if (R.pget(x, y) !== d_VACIOMu && y <= hor + 2 && x < cx1) continue; const c = u < 0.2 ? P.mar0 : u < 0.45 ? P.mar1 : u < 0.7 ? P.mar2 : u < 0.88 ? P.mar3 : P.mar4; R.pset(x, y, d_umbralMu(x, y) < ((u * 5) % 1) * 0.4 ? [P.mar0, P.mar1, P.mar2, P.mar3, P.mar4][Math.min(4, Math.floor(u * 5) + 1)] : c); } }
    // la arena: seca, mojada junto al agua, con huellas, conchas y algas
    for (let y = ya; y < 180; y++) for (let x = 0; x < 320; x++) { const m = y < ya + 6; let c = m ? (y < ya + 2 ? P.arenaMS : P.arenaM) : h(x >> 1, y, 471) < 0.25 ? P.arenaS : h(x, y, 472) < 0.05 ? P.arenaL : P.arena; if (!m && Math.abs(Math.sin(x * 0.08 + y * 0.5) ) > 0.97 && y < ya + 20) c = P.arenaS; R.pset(x, y, c); }
    for (let k = 0; k < 30; k++) { const x = 30 + k * 9, y = ya + 14 + Math.round(Math.sin(k * 0.6) * 8); R.pset(x, y, P.arenaMS); R.pset(x + 1, y, P.arenaS); }
    for (let k = 0; k < 12; k++) { const x = Math.round(h(k, 1, 473) * 319), y = ya + 8 + Math.round(h(k, 2, 473) * 50); R.pset(x, y, P.blanco); R.pset(x + 1, y, hex('#f0b0a0')); }
    if (gen) {
      // la torre de los socorristas, las toallas, la tabla clavada, el castillo de arena y la nevera
      { const x0 = 250, x1 = 292, yb = 152; for (const lx of [252, 290]) { R.linea(lx, yb, lx + (lx < 270 ? 4 : -4), 124, P.blanco); R.linea(lx + 1, yb, lx + (lx < 270 ? 5 : -3), 124, P.blancoS); } R.linea(254, 140, 288, 132, P.blancoS); R.linea(254, 132, 288, 140, P.blancoS);
        R.rect(x0 + 2, 104, x1 - 2, 124, P.k); R.rect(x0 + 3, 105, x1 - 3, 123, P.amarillo); R.rect(x0 + 3, 105, x1 - 3, 109, P.rojo); R.rect(x0 + 8, 111, x1 - 8, 118, hex('#2a4a6a')); R.rect(x0 + 8, 111, x1 - 8, 112, hex('#6aa0c8')); R.poligono([[x0 - 1, 105], [271, 96], [x1 + 1, 105]], P.rojo); R.rect(x0, 124, x1, 125, P.blancoS); }
      for (const [x, y, c1, c2] of [[150, 160, P.azul, P.blanco], [190, 166, P.rojo, P.amarillo]]) { R.rect(x, y, x + 22, y + 8, P.k); for (let i = x + 1; i < x + 22; i++) R.rect(i, y + 1, i, y + 7, ((i - x) >> 2) % 2 ? c1 : c2); }
      R.poligono([[226, 150], [230, 126], [234, 150]], P.k); R.poligono([[227, 149], [230, 128], [233, 149]], (x, y) => (x === 230 ? P.rojo : P.blanco)); R.rect(226, 150, 234, 152, P.arenaS);
      for (const [ux, uy, c1, c2] of [[30, 136, P.rojo, P.blanco], [300, 140, P.azul, P.amarillo], [178, 128, hex('#3aa070'), P.blanco]]) { R.linea(ux, uy - 16, ux + 2, uy + 8, P.k); R.poligono([[ux - 15, uy - 13], [ux, uy - 22], [ux + 15, uy - 13]], P.k); R.poligono([[ux - 14, uy - 14], [ux, uy - 21], [ux + 14, uy - 14]], (x) => (((x - ux + 14) / 5 | 0) % 2 ? c1 : c2)); R.rect(ux - 14, uy - 13, ux + 14, uy - 13, d_mezclaMu(c1, P.k, 0.3));
        for (let x = ux - 10; x < ux + 14; x++) if (d_umbralMu(x, uy + 9) < 0.6) R.pset(x, uy + 9, P.arenaS); }
      R.rect(120, 146, 132, 154, P.k); R.rect(121, 147, 131, 154, P.arenaS); R.rect(123, 141, 129, 146, P.k); R.rect(124, 142, 128, 146, P.arenaS); R.rect(121, 147, 131, 147, P.arena); R.rect(125, 138, 125, 141, P.k); R.rect(126, 138, 128, 139, P.rojo);
      // la parrilla pequeña (para Santa) con su tapa
      R.rect(60, 144, 92, 150, P.k); R.rect(61, 145, 91, 149, P.aceroS); R.rect(61, 144, 91, 144, P.acero); for (const lx of [63, 89]) R.rect(lx, 150, lx + 1, 160, P.k); R.rect(62, 155, 90, 155, P.aceroS);
      for (let k = 0; k < 5; k++) { R.rect(64 + k * 5, 141, 67 + k * 5, 143, P.salchicha); R.rect(64 + k * 5, 141, 67 + k * 5, 141, P.salchichaL); }
      // el primer término: cubo y pala, toalla con el bote de crema, conchas y huellas que van hacia el agua
      R.poligono([[262, 166], [272, 166], [270, 176], [264, 176]], P.k); R.poligono([[263, 167], [271, 167], [269, 175], [265, 175]], P.rojo); R.rect(263, 167, 271, 167, hex('#ff7a6a')); R.linea(264, 166, 267, 162, P.k); R.linea(267, 162, 270, 166, P.k); R.linea(274, 176, 280, 164, P.amarillo); R.rect(279, 162, 282, 164, P.amarillo);
      R.rect(18, 166, 46, 176, P.k); for (let i = 19; i < 46; i++) R.rect(i, 167, i, 175, ((i - 19) >> 2) % 2 ? hex('#f07a2a') : P.blanco); R.rect(40, 163, 43, 169, P.k); R.rect(41, 164, 42, 169, P.amarillo); R.rect(41, 163, 42, 163, P.azul);
      for (let k = 0; k < 14; k++) { const x = 104 + k * 6 + (k % 2) * 2, y = 178 - k * 3; R.pset(x, y, P.arenaMS); R.pset(x + 1, y, P.arenaS); }
      R.rect(36, 148, 52, 160, P.k); R.rect(37, 149, 51, 159, P.azul); R.rect(37, 149, 51, 152, P.blanco); R.rect(37, 153, 51, 153, P.k);
    } else {
      R.rect(250, 116, 251, 160, P.k); R.poligono([[220, 120], [251, 104], [282, 120]], P.k); R.poligono([[222, 119], [251, 106], [280, 119]], (x) => (((x - 222) / 8 | 0) % 2 ? P.rojo : P.blanco));
      R.rect(30, 134, 78, 160, P.k); R.rect(31, 135, 77, 159, P.azul); R.rect(31, 135, 77, 142, P.blanco); R.rect(31, 143, 77, 143, P.k); R.rect(48, 138, 60, 139, P.aceroS); for (let k = 0; k < 3; k++) R.rect(34 + k * 15, 159, 40 + k * 15, 160, P.aceroS);
      R.rect(84, 150, 108, 158, P.k); for (let i = 85; i < 108; i++) R.rect(i, 151, i, 157, ((i - 84) >> 2) % 2 ? P.amarillo : hex('#3aa070'));
    }
  });
  d_pegarMu(R, fr);
  // la vida: las olas que rompen y se retiran, los brillos del sol, surfistas y bañistas, banderas que ondean, gaviotas
  const ya = gen ? 118 : 108;
  for (let k = 0; k < 160; k++) { const x = Math.round(h(k, 1, 474) * 319), y = Math.round(hor + 2 + h(k, 2, 474) * (ya - hor - 14)); if (Math.sin(t * 3 + k * 1.7) > 0.6) { R.pset(x, y, P.espuma); if (k % 4 === 0) R.pset(x + 1, y, P.espumaS); } }
  for (let w = 0; w < 3; w++) { const u = ((t * 0.12 + w / 3) % 1), y = Math.round(hor + 10 + u * (ya - hor - 8)), a = Math.sin(u * Math.PI);
    for (let x = 0; x < 320; x++) { const yy = y + Math.round(Math.sin(x * 0.06 + w * 2 + t * 0.4) * 1.5); if (R.pget(x, yy) === P.roca) continue; if (h(x >> 2, w, 475 + Math.floor(t * 0.12 + w / 3)) < 0.75 * a + 0.1) { R.pset(x, yy, P.espuma); if (h(x, w, 476) < 0.6) R.pset(x, yy + 1, P.espumaS); } } }
  { const u = (Math.sin(t * 0.8) + 1) / 2, y = ya - 2 + Math.round(u * 4); for (let x = 0; x < 320; x++) { const yy = y + Math.round(Math.sin(x * 0.05 + t) * 1); for (let j = 0; j < 2; j++) R.pset(x, yy + j, j ? P.espumaS : P.espuma); if (h(x, 3, 477) < 0.4) R.pset(x, yy + 2, P.arenaM); } }
  if (gen) {
    for (let k = 0; k < 2; k++) { const x = Math.round(((t * (9 + k * 4) + k * 140) % 360) - 20), y = 92 + k * 8; R.rect(x - 3, y + 1, x + 4, y + 1, k ? P.amarillo : P.blanco); d_genteMu(R, x, y, t, { c: P.k, piel: hex('#d8a070'), alto: 7 }); }
    for (let k = 0; k < 5; k++) { const x = 156 + k * 8, y = 104 + (k % 2) * 3 + Math.round(Math.sin(t * 2 + k) * 0.8); R.pset(x, y, hex('#d8a070')); R.pset(x + 1, y, hex('#d8a070')); R.pset(x, y - 1, k % 2 ? hex('#f8d030') : hex('#3a2a1a')); }
    for (const fx of [140, 202]) { R.rect(fx, 128, fx, 152, P.k); for (let j = 0; j < 7; j++) for (let i = 0; i < 9; i++) { const ond = Math.round(Math.sin(t * 6 + i * 0.7) * (i / 9) * 1.5); const diag = i + (6 - j) * 1.3 > 8; R.pset(fx + 1 + i, 128 + j + ond, diag ? P.amarillo : P.rojo); } }
    d_humoMu(R, 76, 138, t, hex('#e0e4ec'), hex('#b8bcc8'), 6, -0.6);
    { const u = (t * 0.3) % 1, x = Math.round(300 - u * 90), y = 172 - Math.round(Math.abs(Math.sin(u * Math.PI * 4)) * 6), r = 4; R.disco(x, 176, 3, P.arenaS); R.disco(x, y, r + 1, P.k); R.disco(x, y, r, (xx, yy) => { const a = Math.floor(((Math.atan2(yy - y, xx - x) + t * 3) / 1.05 % 6 + 6) % 6); return [P.rojo, P.blanco, P.azul, P.blanco, P.amarillo, P.blanco][a]; }); R.pset(x - 2, y - 2, P.blanco); }   // la pelota que rueda
    { const x = Math.round(110 + ((t * 6) % 40)), y = 136, p = Math.floor(t * 4) % 2; R.rect(x, y - 3, x + 4, y - 1, P.blanco); R.pset(x + 5, y - 3, P.blanco); R.pset(x + 6, y - 3, hex('#f0a020')); R.pset(x + 1, y, P.k); R.pset(x + 3 - p, y, P.k); R.rect(x, y - 2, x + 2, y - 2, P.blancoS); }   // la gaviota que pasea por la arena
  } else {
    for (let k = 0; k < 3; k++) { const x = Math.round(((t * (8 + k * 3) + k * 110) % 360) - 20), y = 84 + k * 6; R.rect(x - 3, y + 1, x + 4, y + 1, P.blanco); d_genteMu(R, x, y, t, { c: P.k, piel: hex('#d8a070'), alto: 7 }); }
  }
  return gen ? d_GEOMu.australia : d_GEOMu.australiaParrilla;
}

// la parrilla de cerca (cámara 'parrilla'), por delante de Santa: la plancha con salchichas y gambas que chisporrotean,
// las llamas debajo, el humo, la balda con las pinzas y la botella sin etiqueta
function d_australiaDelanteMu(R, t, o, cam) {
  if (cam !== 'parrilla') return;
  const P = d_AUSMu;
  for (const lx of [146, 224]) { R.rect(lx, 158, lx + 2, 179, P.k); R.rect(lx + 1, 158, lx + 1, 179, P.acero); }
  R.rect(144, 170, 228, 171, P.aceroS);
  for (let k = 0; k < 9; k++) { const x = 152 + k * 8, fl = Math.round(3 + Math.sin(t * 13 + k * 2) * 2); R.poligono([[x - 3, 158], [x, 158 - fl - 3], [x + 3, 158]], P.fuego); R.pset(x, 157 - fl, P.fuegoL); }
  R.rect(140, 146, 232, 158, P.k); R.rect(141, 147, 231, 157, P.aceroS); R.rect(141, 147, 231, 148, P.acero); for (let x = 146; x < 230; x += 10) R.rect(x, 150, x + 5, 151, P.k);
  R.rect(232, 148, 262, 151, P.aceroL); R.rect(232, 151, 262, 152, P.aceroS); R.linea(240, 147, 256, 142, P.aceroS); R.linea(241, 147, 257, 142, P.aceroL);
  R.rect(250, 136, 255, 147, P.k); R.rect(251, 137, 254, 147, P.rojo); R.rect(252, 133, 253, 136, P.k);
  R.rect(140, 144, 232, 146, P.k); for (let x = 142; x < 232; x += 3) R.pset(x, 145, P.aceroL);
  const chis = (k) => Math.sin(t * 9 + k * 3) > 0.7;
  for (let k = 0; k < 7; k++) { const x = 146 + k * 11, j = Math.round(Math.sin(t * 2 + k) * 0.4); R.rect(x, 138 + j, x + 8, 143 + j, P.k); R.rect(x + 1, 139 + j, x + 7, 142 + j, P.salchicha); R.rect(x + 1, 139 + j, x + 7, 139 + j, P.salchichaL); R.rect(x + 3, 141 + j, x + 3, 142 + j, P.salchichaS); R.rect(x + 5, 141 + j, x + 5, 142 + j, P.salchichaS); if (chis(k)) R.pset(x + 4, 136 + j, P.fuegoL); }
  for (let k = 0; k < 4; k++) { const x = 172 + k * 14, y = 132; for (let a = 0; a < 3.6; a += 0.3) R.pset(Math.round(x + Math.cos(a) * 4), Math.round(y + Math.sin(a) * 3), a < 1 ? P.gambaL : P.gamba); R.pset(x + 4, y - 2, P.gamba); }
  for (let k = 0; k < 7; k++) { const u = (t * 0.45 + k / 7) % 1, x = Math.round(150 + k * 12 + Math.sin(t + k) * 3 - u * 14), y = Math.round(134 - u * 70), r = 2 + u * 6; if (d_quietoMu(x, y)) continue; R.disco(x, y, r, (xx, yy) => (d_umbralMu(xx, yy) < 0.7 - u * 0.6 ? (yy > y ? hex('#c8ccd8') : hex('#eef0f4')) : R.pget(xx, yy))); }
}

const d_CTMu = pal({
  cal: '#e0cca8', calS: '#b89a78', calL: '#f4e2c0', calSS: '#8a6e54', viga: '#4a2e1c', vigaS: '#2a180c', vigaL: '#6a4630', k: '#140c08',
  piedra: '#9a8270', piedraS: '#6a5444', piedraL: '#c4a88e', rajola: '#b85a34', rajolaS: '#8a3e22', rajolaL: '#d8784a', junta: '#5a2e1a',
  fuego: '#ff8a20', fuegoL: '#ffe070', fuegoS: '#d8401a', brasa: '#a82a10', hollin: '#2a1e18', luz: '#ffb860', luzL: '#ffe8b0',
  noche: '#1a2448', nocheL: '#3a4a7a', est: '#c8d0f0', postigo: '#3a5a3a', postigoL: '#5a7a4a',
  plato: '#f0ece0', platoA: '#3a6ab0', platoS: '#c8c0b0', cobre: '#c8703a', cobreL: '#f0a060', cobreS: '#8a4420',
  mantel: '#f4f0e6', mantelS: '#d0c8b8', mantelR: '#c83a3a', madera: '#7a4a2a', maderaS: '#4a2a14', maderaL: '#a06a3e',
  tronco: '#8a6a4a', troncoS: '#5a4028', troncoL: '#b08a62', corte: '#e0c08a', corteS: '#b8905a', anillo: '#a07a4a',
  barretina: '#d02a2a', barretinaS: '#8a1414', barretinaL: '#f05a4a', manta: '#c83030', mantaS: '#8a1a1a', mantaL: '#f0e0c0', ojo: '#1a1008', mejilla: '#f08a7a',
  turron: '#e8d0a0', turronS: '#b89060', almendra: '#a0622a',
});

// el tronco Tió: tumbado, la punta de delante apoyada en dos patitas de palo, la cara en el corte (ojos, sonrisa y nariz
// roja), la barretina roja caída hacia atrás y la manta a cuadros sobre el lomo; o.manta 0–1 la levanta y asoman los
// turrones y caramelos de debajo. x: el centro de la cara; base: el suelo; s: escala (1 = 46 px de largo)
function d_tioMu(R, x, base, s, t, manta = 0) {
  const P = d_CTMu, r = 9 * s, L = 40 * s, fy = base - r - 5 * s, by = base - r, X = (u) => x + u * s;
  // los dulces de debajo de la manta (se ven cuando se levanta)
  if (manta > 0) { const n = Math.round(10 * manta); for (let k = 0; k < n; k++) { const dx = X(16 + h(k, 1, 481) * 22), dy = base - 1 - Math.round(h(k, 2, 481) * 4 * s);
      if (k % 3 === 0) { R.rect(Math.round(dx - 3 * s), Math.round(dy - 2 * s), Math.round(dx + 3 * s), Math.round(dy), P.k); R.rect(Math.round(dx - 3 * s) + 1, Math.round(dy - 2 * s) + 1, Math.round(dx + 3 * s) - 1, Math.round(dy) - 1, P.turron); R.pset(Math.round(dx), Math.round(dy - s), P.almendra); }
      else { const col = [hex('#f04a8a'), hex('#3ac0e0'), hex('#f8c020'), hex('#7ad040')][k % 4]; R.disco(Math.round(dx), Math.round(dy - s), Math.max(1.5, 1.4 * s), col); R.pset(Math.round(dx - 2 * s), Math.round(dy - s), col); R.pset(Math.round(dx + 2 * s), Math.round(dy - s), col); } } }
  // las patitas
  for (const du of [3, 9]) { R.linea(X(du), fy + r * 0.6, X(du - 2), base, P.k); R.linea(X(du) + 1, fy + r * 0.6, X(du - 2) + 1, base, P.troncoS); R.linea(X(du) + 2, fy + r * 0.6, X(du - 2) + 2, base, P.k); }
  // el cuerpo: corteza en vetas a lo largo, luz arriba (del fuego, que está a la izquierda) y sombra abajo
  const cuerpo = [[x, fy - r], [X(40), by - r], [X(40), by + r], [x, fy + r]];
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(cuerpo.map(([a, b]) => [a + dx, b + dy]), P.k);
  R.poligono(cuerpo, (xx, yy) => { const u = (xx - x) / L, cy = fy + (by - fy) * u, v = (yy - cy) / r; const veta = Math.floor((yy + Math.sin(xx * 0.15) * 1.5) / Math.max(2, s * 1.5)); const n = h(veta, xx >> 3, 482);
    if (h(xx, yy, 483) < 0.03) return P.k; return v < -0.55 ? (n < 0.5 ? P.troncoL : P.tronco) : v > 0.45 ? (n < 0.3 ? P.k : P.troncoS) : n < 0.25 ? P.troncoS : n > 0.85 ? P.troncoL : P.tronco; });
  R.disco(X(40), by, r, P.k); for (let j = -r + 1; j < r; j++) R.pset(Math.round(X(40) + Math.sqrt(Math.max(0, (r - 1) ** 2 - j * j)) * 0.3), Math.round(by + j), P.troncoS);
  // la manta (a cuadros, con flecos), levantada según o.manta
  { const lev = manta * 9 * s, x0 = X(15), x1 = X(43), cyA = (u) => fy + (by - fy) * ((u - x) / L);
    R.poligono([[x0 - 1, cyA(x0) - r - 2 - lev], [x1 + 1, cyA(x1) - r - 2 - lev], [x1 + 3, cyA(x1) + r + 2 - lev * 1.4], [x0 - 2, cyA(x0) + r + 3 - lev * 1.4]], P.k);
    R.poligono([[x0, cyA(x0) - r - 1 - lev], [x1, cyA(x1) - r - 1 - lev], [x1 + 2, cyA(x1) + r + 1 - lev * 1.4], [x0 - 1, cyA(x0) + r + 2 - lev * 1.4]], (xx, yy) => { const a = Math.floor((xx - x0) / Math.max(2, 3 * s)), b = Math.floor(yy / Math.max(2, 3 * s)); const sh = yy > cyA(xx) + r * 0.3 - lev; return (a + b) % 2 ? (sh ? P.mantaS : P.manta) : (a % 3 === 0 || b % 3 === 0 ? P.mantaL : sh ? P.mantaS : P.manta); });
    for (let xx = Math.round(x0); xx <= x1 + 1; xx += 2) { const yy = Math.round(cyA(xx) + r + 3 - lev * 1.4 + Math.sin(t * 2 + xx) * 0.5); R.rect(xx, yy, xx, yy + Math.max(1, Math.round(s)), P.mantaL); } }
  // la cara en el corte: anillos, ojos que parpadean, nariz roja, sonrisa y mejillas
  R.disco(x, fy, r + 1, P.k); R.disco(x, fy, r, (xx, yy) => { const d = Math.hypot(xx - x, (yy - fy) * 0.95) / r; return d > 0.88 ? P.troncoS : Math.floor(d * 5) % 2 && d > 0.3 ? P.anillo : (xx < x - r * 0.2 ? P.corte : P.corteS); });
  const parp = Math.floor(t * 0.7) % 5 === 0 && (t * 0.7) % 1 < 0.15;
  for (const dx of [-0.35, 0.35]) { const ex = Math.round(x + dx * r), ey = Math.round(fy - r * 0.2); if (parp) R.rect(ex - Math.round(s), ey, ex + Math.round(s), ey, P.ojo); else { R.disco(ex, ey, Math.max(1, s * 1.1), P.ojo); R.pset(ex - 1, ey - 1, P.mantaL); } }
  R.disco(Math.round(x), Math.round(fy + r * 0.12), Math.max(1, s * 1.2), P.barretina); R.pset(Math.round(x) - 1, Math.round(fy + r * 0.05), P.barretinaL);
  for (let i = -4; i <= 4; i++) R.pset(Math.round(x + i * r * 0.1), Math.round(fy + r * 0.45 + (1 - (i / 4) ** 2) * r * 0.18), P.ojo);
  for (const dx of [-0.55, 0.55]) R.disco(Math.round(x + dx * r), Math.round(fy + r * 0.3), Math.max(1, s * 0.9), P.mejilla);
  // la barretina: gorro rojo de lana que cae hacia atrás, con su franja oscura
  { const pts = [[x - r * 0.75, fy - r * 0.62], [x + r * 0.7, fy - r * 0.78], [X(16), fy - r * 0.9 + 2 * s], [X(20), fy - r * 0.3], [X(15), fy - r * 0.45], [x + r * 0.3, fy - r * 0.35]];
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(pts.map(([a, b]) => [a + dx, b + dy]), P.k);
    R.poligono(pts, (xx, yy) => (yy > fy - r * 0.5 && xx < x + r * 0.6 ? P.barretinaS : xx > X(12) ? P.barretinaS : yy < fy - r * 0.75 ? P.barretinaL : P.barretina));
    R.rect(Math.round(x - r * 0.75), Math.round(fy - r * 0.62), Math.round(x + r * 0.6), Math.round(fy - r * 0.5), d_mezclaMu(P.barretinaS, P.k, 0.4)); }
}

// las llamas del hogar entre x0 y x1 con la base en y (lenguas que suben y bailan con t) y las brasas
function d_llamasMu(R, x0, x1, y, alto, t) {
  const P = d_CTMu;
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), env = Math.sin(u * Math.PI), hh = alto * env * (0.55 + 0.45 * Math.sin(x * 0.7 + t * 9) * Math.sin(x * 0.23 - t * 5.3));
    for (let j = 0; j < hh; j++) { const q = j / Math.max(1, hh); R.pset(x, y - j, q < 0.3 ? P.fuegoL : q < 0.7 ? P.fuego : P.fuegoS); } }
  for (let k = 0; k < 6; k++) { const u = (t * 0.8 + k / 6) % 1, xx = Math.round(x0 + h(k, 1, 484) * (x1 - x0) + Math.sin(t * 3 + k) * 2), yy = Math.round(y - alto - u * 20); if (u < 0.8) R.pset(xx, yy, u < 0.4 ? P.fuegoL : P.fuego); }
}

function d_catalunaMu(R, t, o, cam) {
  const P = d_CTMu, gen = cam !== 'tio', fl = 0.8 + 0.2 * Math.sin(t * 7) * Math.sin(t * 3.3);
  const fr = d_capaMu(R, 'ct-' + cam, () => {
    if (gen) {
      // la pared encalada (más cálida junto al fuego), las vigas del techo, el suelo de rajolas
      d_estucoMu(R, 0, 0, 319, 150, [P.cal, P.calS, P.calL], 2);
      for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 70, (y - 130) * 1.3) / 260; if (d_umbralMu(x, y) < d * 0.7) R.pset(x, y, d_mezclaMu(R.pget(x, y), P.calSS, 0.35)); }
      for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 4 ? P.vigaS : ((x + 4) % 40 < 18) ? (y > 19 ? P.vigaS : (x + 4) % 40 < 3 ? P.vigaL : P.viga) : (y % 6 === 0 ? P.vigaS : d_mezclaMu(P.calS, P.vigaS, 0.3)));
      for (let y = 150; y < 180; y++) { const d = (y - 150) / 30, fh = 3 + d * 6, fi = Math.floor((y - 150) / fh); for (let x = 0; x < 320; x++) { const w = 14 + d * 10, xx = (x - 160) * (1 / (0.6 + d * 0.4)) + 160, col = Math.floor((xx + (fi % 2) * 7) / w), jx = ((xx + (fi % 2) * 7) % w + w) % w;
        let c = jx < 1 || ((y - 150) % Math.round(fh)) === 0 ? P.junta : h(col, fi, 485) < 0.3 ? P.rajolaS : h(col, fi, 486) > 0.85 ? P.rajolaL : P.rajola; const e = Math.hypot((x - 80) / 120, (y - 156) / 30); if (e < 1 && d_umbralMu(x, y) < (1 - e) * 0.8) c = d_mezclaMu(c, P.luz, 0.25); R.pset(x, y, c); } }
      R.rect(0, 148, 319, 150, P.calSS);
      // la chimenea: la campana encalada con su repisa de platos y cazos de cobre, el hogar de piedra con sus morillos
      R.poligono([[18, 22], [132, 22], [138, 70], [12, 70]], P.k); R.poligono([[20, 22], [130, 22], [135, 68], [15, 68]], (x, y) => (h(x >> 2, y >> 2, 487) < 0.15 ? P.calS : x > 110 ? P.calS : P.calL));
      R.rect(8, 70, 142, 75, P.k); R.rect(9, 70, 141, 73, P.maderaL); R.rect(9, 74, 141, 75, P.maderaS);
      for (let k = 0; k < 6; k++) { const px = 22 + k * 20; R.disco(px, 63, 6, P.k); R.disco(px, 63, 5, P.plato); R.disco(px, 63, 3, k % 2 ? P.platoA : hex('#d8a030')); R.disco(px, 63, 1, P.plato); }
      for (const cx of [40, 100]) { R.rect(cx, 44, cx + 1, 50, P.k); R.disco(cx, 54, 5, P.k); R.disco(cx, 54, 4, P.cobre); R.disco(cx - 1, 53, 2, P.cobreL); R.rect(cx - 5, 54, cx + 5, 58, P.cobreS); }
      d_piedrasMu(R, 10, 76, 140, 150, [P.piedra, P.piedraS, P.piedraL, P.k], 7, 13, 5);
      R.rect(28, 96, 122, 150, P.k); for (let y = 97; y < 150; y++) for (let x = 29; x < 122; x++) R.pset(x, y, y > 140 ? P.hollin : d_mezclaMu(P.hollin, P.k, (y - 97) / 80));
      R.rect(22, 90, 128, 96, P.k); R.rect(23, 91, 127, 95, P.vigaL); R.rect(23, 95, 127, 95, P.vigaS); for (let x = 26; x < 126; x += 9) R.pset(x, 93, P.viga);   // la llinda de madera
      for (let k = 0; k < 4; k++) { R.rect(40 + k * 8, 134 + (k % 2), 100 - k * 4, 138 + (k % 2), P.k); R.rect(41 + k * 8, 135 + (k % 2), 99 - k * 4, 137 + (k % 2), k % 2 ? P.troncoS : P.tronco); R.disco(40 + k * 8, 136, 2, P.corte); }
      for (const mx of [44, 106]) { R.rect(mx, 128, mx + 2, 146, P.k); R.rect(mx - 3, 146, mx + 5, 148, P.k); R.disco(mx + 1, 127, 2, P.k); }
      R.rect(4, 148, 146, 152, P.piedraS); R.rect(4, 148, 146, 148, P.piedraL);
      // la ventana con postigos y la noche, la alacena con la vajilla, la ristra de pimientos y la rama de pino
      R.rect(206, 48, 254, 102, P.k); for (let y = 50; y < 100; y++) for (let x = 208; x < 252; x++) R.pset(x, y, d_umbralMu(x, y) < (y - 50) / 60 ? P.nocheL : P.noche); R.rect(229, 50, 230, 100, P.madera); R.rect(208, 74, 252, 75, P.madera); R.rect(204, 102, 256, 106, P.piedraL);
      for (const [a, b] of [[192, 204], [256, 268]]) { R.rect(a, 46, b, 104, P.k); R.rect(a + 1, 47, b - 1, 103, P.postigo); for (let y = 50; y < 102; y += 4) R.rect(a + 2, y, b - 2, y, P.postigoL); }
      R.rect(276, 64, 320, 150, P.k); R.rect(277, 65, 319, 150, P.madera); R.rect(277, 65, 319, 67, P.maderaL); for (const sy of [86, 108]) { R.rect(277, sy, 319, sy + 2, P.maderaS); for (let k = 0; k < 4; k++) { R.disco(284 + k * 10, sy - 5, 4, P.k); R.disco(284 + k * 10, sy - 5, 3, k % 2 ? P.plato : P.platoA); } }
      R.rect(280, 114, 316, 146, P.maderaS); R.rect(297, 114, 298, 146, P.k); R.pset(294, 130, P.cobreL); R.pset(301, 130, P.cobreL);
      for (let k = 0; k < 8; k++) { R.disco(160 + k * 3, 30 + k * 4, 2, k % 2 ? P.barretina : P.barretinaS); R.pset(161 + k * 3, 28 + k * 4, P.postigo); } R.rect(159, 24, 160, 30, P.k);
      // la mesa de atrás, con su banco (la de delante la pinta mundoDelante)
      R.rect(150, 118, 196, 121, P.maderaS); R.rect(150, 116, 196, 117, P.maderaL); R.rect(154, 121, 156, 148, P.maderaS); R.rect(190, 121, 192, 148, P.maderaS);
    } else {
      // de cerca: la pared, el hogar a la izquierda con el fuego y el tronco en el centro sobre las rajolas
      d_estucoMu(R, 0, 0, 319, 140, [P.cal, P.calS, P.calL], 6);
      for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 20, (y - 120) * 1.2) / 300; if (d_umbralMu(x, y) < d * 0.8) R.pset(x, y, d_mezclaMu(R.pget(x, y), P.calSS, 0.4)); }
      d_piedrasMu(R, 0, 30, 64, 150, [P.piedra, P.piedraS, P.piedraL, P.k], 8, 15, 7); R.rect(0, 70, 48, 150, P.k); for (let y = 71; y < 150; y++) for (let x = 0; x < 48; x++) R.pset(x, y, d_mezclaMu(P.hollin, P.k, 0.3));
      for (let y = 140; y < 180; y++) { const d = (y - 140) / 40, fh = 4 + d * 8, fi = Math.floor((y - 140) / fh); for (let x = 0; x < 320; x++) { const w = 22 + d * 14, xx = (x - 160) / (0.6 + d * 0.4) + 160, jx = ((xx + (fi % 2) * 11) % w + w) % w, col = Math.floor((xx + (fi % 2) * 11) / w);
        let c = jx < 1.2 || ((y - 140) % Math.round(fh)) === 0 ? P.junta : h(col, fi, 488) < 0.3 ? P.rajolaS : h(col, fi, 489) > 0.85 ? P.rajolaL : P.rajola; const e = Math.hypot((x - 30) / 160, (y - 150) / 40); if (e < 1 && d_umbralMu(x, y) < (1 - e)) c = d_mezclaMu(c, P.luz, 0.3); R.pset(x, y, c); } }
      R.rect(0, 138, 319, 140, P.calSS);
      for (let k = 0; k < 3; k++) { R.rect(4, 136 - k * 4, 44, 139 - k * 4, P.k); R.rect(5, 137 - k * 4, 43, 138 - k * 4, k % 2 ? P.troncoS : P.tronco); }
      R.rect(240, 30, 300, 80, P.k); R.rect(242, 32, 298, 78, P.maderaL); R.rect(244, 34, 296, 76, P.mantaL); for (let k = 0; k < 5; k++) R.rect(250, 40 + k * 7, 290 - (k % 2) * 10, 41 + k * 7, P.calS);   // un cuadro bordado (solo trazos)
      R.rect(256, 28, 284, 28, P.k);
    }
  }, false);
  R.copiar(fr);
  // el fuego, su luz que baila sobre las paredes y el tronco
  if (gen) {
    d_llamasMu(R, 42, 106, 136, 30, t);
    d_haloMu(R, 74, 120, 60, P.luz, 0.22 * fl);
    for (let k = 0; k < 12; k++) { const x = 40 + k * 6; if (Math.sin(t * 5 + k * 1.9) > 0.2) R.pset(x, 139, P.fuegoL); }
    if (o.tio !== false) d_tioMu(R, 140, 162, 1, t, o.manta ?? 0);
    for (let k = 0; k < 5; k++) { const u = (t * 0.25 + k / 5) % 1, y = Math.round(84 - u * 20), x = 74 + Math.round(Math.sin(t + k) * 6); if (u < 0.7) d_tintaMu(R, x, y, P.hollin, 0.3); }
  } else {
    d_llamasMu(R, 4, 44, 132, 40, t);
    d_haloMu(R, 30, 120, 90, P.luz, 0.25 * fl);
    if (o.tio !== false) d_tioMu(R, 112, 162, 2.4, t, o.manta ?? 0);
  }
  return gen ? d_GEOMu.cataluna : d_GEOMu.catalunaTio;
}

// la mesa catalana del primer término (a la derecha), por delante de los personajes: mantel bordado con su caída, el
// porrón de vidrio, la panera y los platos
function d_catalunaDelanteMu(R, t, o, cam) {
  if (cam === 'tio') return;
  const P = d_CTMu;
  R.rect(232, 130, 320, 136, P.k); R.rect(233, 131, 320, 134, P.mantel); R.rect(233, 131, 320, 131, hex('#ffffff'));
  for (let y = 135; y < 156; y++) for (let x = 232; x < 320; x++) { const pl = (x + Math.round(Math.sin(y * 0.3) * 1)) % 9; R.pset(x, y, y > 152 ? (x % 4 < 2 ? P.mantelR : P.mantel) : pl === 0 ? P.mantelS : (y === 145 && x % 3 === 0) ? P.mantelR : P.mantel); }
  R.rect(232, 135, 232, 156, P.k); R.rect(240, 156, 244, 179, P.maderaS); R.rect(241, 156, 241, 179, P.maderaL);
  R.rect(252, 120, 259, 130, P.k); R.rect(253, 121, 258, 129, hex('#9ac8b8')); R.rect(253, 124, 258, 129, hex('#8a2a3a')); R.linea(258, 122, 266, 114, hex('#9ac8b8')); R.rect(254, 114, 256, 120, hex('#9ac8b8'));   // el porrón
  R.poligono([[276, 130], [278, 122], [302, 122], [304, 130]], P.maderaS); for (let k = 0; k < 3; k++) R.disco(284 + k * 8, 121, 4, k % 2 ? P.troncoL : P.corte);
  R.disco(312, 129, 5, P.platoS); R.disco(312, 128, 4, P.plato);
}

const d_FIMu = pal({
  c0: '#3a2a6a', c1: '#7a3a7a', c2: '#c8507a', c3: '#f07a5a', c4: '#f8a850', c5: '#fcd080', c6: '#fde8a8',
  sol: '#fff0b0', solS: '#ffd070', palma: '#3a1a3a', palmaS: '#2a1028', palmaL: '#5a2a4a',
  piedra: '#c08a6a', piedraS: '#8a5a48', piedraL: '#e0a888', madera: '#6a3a24', maderaS: '#42200e', maderaL: '#8a5434',
  capiz: '#f8e8c8', capizS: '#d8b88a', capizL: '#fff8e0', capizO: '#8a6a5a', zinc: '#8a7a8a', zincS: '#5a4a5a', zincL: '#b8a0a0', teja: '#a84a3a', tejaS: '#7a2e24',
  suelo: '#7a5a5a', sueloS: '#5a3e44', sueloL: '#9a7268', charco: '#f0a070', k: '#1a0e14',
  cromo: '#d8dce4', cromoS: '#8a8e9a', cromoL: '#ffffff', jRojo: '#d02a3a', jAzul: '#2a5ab8', jAma: '#f8c020', jVerde: '#2a9a5a', rueda: '#1a1418',
  luz: '#ffd890', luzL: '#fff6d0', luzS: '#f09040', pRojo: '#f03a3a', pAma: '#f8d020', pVerde: '#3ad070', pAzul: '#3a8af0', pRosa: '#f05ab0',
});

// un parol: estrella de cinco puntas de bambú y papel de colores, con su aro, las colas con borlas y las bombillas que se
// encienden en secuencia; x, y: el centro; r: el radio; on 0–1 (encendido); cols: [papel, papel claro, ribete]
function d_parolMu(R, x, y, r, t, on, cols, sem = 0) {
  const P = d_FIMu, pts = [];
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
  // las colas
  for (const dx of [-0.3, 0, 0.3]) { const x0 = x + dx * r, y0 = y + r * 0.5; for (let j = 0; j < r * 1.1; j++) { const xx = Math.round(x0 + Math.sin(t * 2 + j * 0.2 + dx * 5 + sem) * j * 0.06), yy = Math.round(y0 + j); R.pset(xx, yy, j % 4 < 2 ? cols[0] : cols[1]); if (r > 15) R.pset(xx + 1, yy, cols[2]); } }
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(pts.map(([a, b]) => [a + dx, b + dy]), P.k);
  const lit = on > 0.5;
  R.poligono(pts, (xx, yy) => { const d = Math.hypot(xx - x, yy - y) / r, a = Math.atan2(yy - y, xx - x); const g = Math.floor(((a + Math.PI) / (Math.PI / 5)) + 0.5) % 2;
    let c = g ? cols[0] : cols[1]; if (lit && d < 0.55) c = d < 0.3 ? P.luzL : cols[1]; else if (!lit) c = d_mezclaMu(c, P.k, 0.35); return c; });
  R.disco(x, y, r * 0.38 + 1, P.k); R.disco(x, y, r * 0.38, lit ? cols[2] : d_mezclaMu(cols[2], P.k, 0.4)); R.disco(x, y, r * 0.24, lit ? P.luzL : d_mezclaMu(cols[1], P.k, 0.3));
  for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; R.linea(x, y, Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), lit ? cols[2] : P.k); }
  if (lit && r > 6) { const n = r > 20 ? 6 : 3; for (let k = 0; k < 5; k++) for (let i = 1; i <= n; i++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5, rr = r * (0.35 + 0.6 * i / n), bx = Math.round(x + Math.cos(a) * rr), by = Math.round(y + Math.sin(a) * rr), sq = Math.floor(t * 6 - i + sem) % n === 0;
      R.pset(bx, by, sq ? P.luzL : [P.pRojo, P.pAma, P.pVerde, P.pAzul, P.pRosa][(k + i) % 5]); if (sq && r > 20) d_haloMu(R, bx, by, 3, P.luzL, 0.4); }
    d_haloMu(R, Math.round(x), Math.round(y), Math.round(r * 1.5), cols[1], 0.18); }
}

// un cocotero de silueta contra el atardecer (tronco curvo y palmas que se mecen)
function d_cocoteroMu(R, x, base, alto, t, curva, c, cS) {
  let cx = x, cy = base; for (let j = 0; j < alto; j++) { const u = j / alto; cx = x + curva * u * u; cy = base - j; R.rect(Math.round(cx) - 1, cy, Math.round(cx) + 1, cy, (j % 3) ? c : cS); }
  for (let k = 0; k < 9; k++) { const a = -Math.PI + k * Math.PI / 8 + Math.sin(t * 1.3 + k + x) * 0.07, L = 14 + (k % 3) * 3; for (let d = 1; d < L; d++) { const f = d / L, xx = Math.round(cx + Math.cos(a) * d), yy = Math.round(cy + Math.sin(a) * d * 0.5 + f * f * L * 0.5); R.pset(xx, yy, c); if (d > 3 && d % 2 === 0) { R.pset(xx, yy + 1, c); R.pset(xx, yy + 2, cS); } } }
  R.disco(Math.round(cx), cy + 2, 2, cS);
}

// el jeepney aparcado (mira a la izquierda): carrocería cromada con franjas de colores, ventanillas abiertas, capó con el
// caballito cromado, bocina, faros dobles, baca en el techo, estribo y entrada de atrás; sin letras
function d_jeepneyMu(R, x0, base, P) {
  const x1 = x0 + 92, yT = base - 30;
  R.rect(x0 + 14, yT - 3, x1 - 2, yT, P.k); R.rect(x0 + 15, yT - 2, x1 - 3, yT - 1, P.cromoS); for (let x = x0 + 18; x < x1 - 4; x += 6) R.rect(x, yT - 6, x, yT - 3, P.cromoS); R.rect(x0 + 16, yT - 6, x1 - 4, yT - 6, P.cromoS);
  R.rect(x0 + 14, yT, x1, base - 6, P.k);
  for (let y = yT + 1; y < base - 6; y++) for (let x = x0 + 15; x < x1; x++) { let c = y < yT + 4 ? (x % 6 < 3 ? P.jAma : P.jRojo) : y < yT + 13 ? P.k : y < yT + 15 ? P.jAzul : y < yT + 17 ? P.cromoL : y < base - 9 ? (h(x >> 2, y >> 2, 491) < 0.15 ? P.cromoS : P.cromo) : P.jVerde; if (y >= yT + 4 && y < yT + 13 && (x - x0) % 11 === 0) c = P.cromoS; R.pset(x, y, c); }
  for (let x = x0 + 18; x < x1 - 4; x += 11) { R.rect(x + 2, yT + 6, x + 4, yT + 10, P.luzS); }   // pasajeros a contraluz
  for (let k = 0; k < 6; k++) R.disco(x0 + 24 + k * 12, base - 12, 2, [P.jRojo, P.jAma, P.jAzul][k % 3]);
  R.poligono([[x0, base - 6], [x0, base - 17], [x0 + 6, base - 21], [x0 + 15, base - 21], [x0 + 15, base - 6]], P.k);
  R.poligono([[x0 + 1, base - 7], [x0 + 1, base - 16], [x0 + 6, base - 20], [x0 + 14, base - 20], [x0 + 14, base - 7]], (x, y) => (y < base - 17 ? P.cromoL : (x + y) % 5 === 0 ? P.cromoS : P.cromo));
  R.rect(x0 + 12, yT, x0 + 15, base - 20, P.k); R.rect(x0 + 13, yT + 1, x0 + 14, base - 21, P.cromoS); R.rect(x0 + 8, base - 24, x0 + 9, base - 21, P.cromoL); R.pset(x0 + 7, base - 25, P.cromoL); R.pset(x0 + 10, base - 25, P.cromoL);   // el caballito
  R.rect(x0 - 1, base - 12, x0 + 2, base - 9, P.cromoL); R.disco(x0 + 2, base - 15, 1, P.luzL); R.disco(x0 + 2, base - 11, 1, P.luzL);
  R.rect(x0 - 2, base - 7, x1 + 2, base - 5, P.cromoS); R.rect(x0 - 2, base - 7, x1 + 2, base - 7, P.cromoL);
  for (const wx of [x0 + 14, x1 - 16]) { R.disco(wx, base - 4, 6, P.k); R.disco(wx, base - 4, 5, P.rueda); R.disco(wx, base - 4, 2, P.cromo); R.pset(wx - 1, base - 5, P.cromoL); }
  R.rect(x1 - 4, yT + 4, x1, base - 6, P.k);
}

// una casa bahay na bato: planta baja de piedra con su arco, piso alto de madera volado con ventanas de concha capiz
// correderas (cuadrícula de conchas que dejan pasar la luz), ventanillas, alero y tejado de zinc o de teja
function d_bahayMu(R, x0, x1, base, top, P, zinc, sem) {
  const yP = base - Math.round((base - top) * 0.45);
  d_piedrasMu(R, x0 + 2, yP, x1 - 2, base, [P.piedra, P.piedraS, P.piedraL, P.k], 5, 10, sem);
  const ax = Math.round((x0 + x1) / 2); R.rect(ax - 7, yP + 8, ax + 7, base, P.k); R.disco(ax, yP + 8, 7, P.k); R.rect(ax - 6, yP + 9, ax + 6, base, P.maderaS); R.disco(ax, yP + 9, 6, P.maderaS); R.rect(ax - 5, yP + 11, ax + 5, base, P.luzS); R.disco(ax, yP + 11, 5, P.luzS); R.rect(ax, yP + 6, ax, base, P.k);
  R.rect(x0 - 2, yP - 2, x1 + 2, yP, P.maderaS);
  d_tablasMu(R, x0, top, x1, yP - 3, P.madera, P.maderaS, P.maderaL, 4, false, sem);
  const n = Math.max(1, Math.floor((x1 - x0) / 26));
  for (let i = 0; i < n; i++) { const wx = Math.round(x0 + 4 + i * (x1 - x0 - 8) / n), ww = Math.round((x1 - x0 - 8) / n) - 4;
    R.rect(wx - 1, top + 3, wx + ww + 1, yP - 9, P.k);
    for (let y = top + 4; y < yP - 9; y++) for (let x = wx; x <= wx + ww; x++) { const cx = (x - wx) % 4, cy = (y - top - 4) % 4, rej = cx === 0 || cy === 0; R.pset(x, y, rej ? P.capizO : (cx + cy) % 3 === 0 ? P.capizL : (x - wx > ww * 0.5 ? P.capiz : P.capizS)); }
    R.rect(wx + Math.round(ww / 2), top + 3, wx + Math.round(ww / 2), yP - 9, P.maderaS);
    R.rect(wx - 1, yP - 8, wx + ww + 1, yP - 4, P.k); for (let x = wx; x <= wx + ww; x++) if ((x - wx) % 3) R.rect(x, yP - 7, x, yP - 5, P.maderaL); }
  if (zinc) { R.poligono([[x0 - 6, top + 1], [x0 + 6, top - 12], [x1 - 6, top - 12], [x1 + 6, top + 1]], P.k); R.poligono([[x0 - 5, top], [x0 + 6, top - 11], [x1 - 6, top - 11], [x1 + 5, top]], (x, y) => (x % 3 === 0 ? P.zincS : y < top - 8 ? P.zincL : (h(x >> 2, y >> 2, 492 + sem) < 0.15 ? hex('#8a4a3a') : P.zinc))); }
  else { R.poligono([[x0 - 6, top + 1], [x0 + 8, top - 13], [x1 - 8, top - 13], [x1 + 6, top + 1]], P.k); R.poligono([[x0 - 5, top], [x0 + 8, top - 12], [x1 - 8, top - 12], [x1 + 5, top]], (x, y) => ((y - top) % 3 === 0 ? P.tejaS : x % 4 === 0 ? P.tejaS : P.teja)); }
}

const d_PAROLESFIMu = [[30, 52, 7, 0], [80, 44, 8, 1], [130, 50, 7, 2], [184, 42, 8, 3], [236, 50, 7, 4], [64, 86, 6, 5], [262, 84, 6, 6]];

const d_COLPAROLMu = [['#f03a3a', '#f8d020', '#3ad070'], ['#3a8af0', '#f0f0f0', '#f8d020'], ['#f05ab0', '#f8d020', '#3a8af0'], ['#3ad070', '#f03a3a', '#f8d020'], ['#f8d020', '#f03a3a', '#f0f0f0'], ['#f03a3a', '#f0f0f0', '#3a8af0'], ['#f05ab0', '#3ad070', '#f8d020']].map((v) => v.map(hex));

function d_filipinasMu(R, t, o, cam) {
  const P = d_FIMu, gen = cam !== 'parol', enc = o.encendido ?? 1;
  R.copiar(d_capaMu(R, 'fi-cielo-' + cam, () => { d_degradadoMu(R, 0, 179, [[0, P.c0], [0.12, P.c1], [0.25, P.c2], [0.36, P.c3], [0.46, P.c4], [0.53, P.c5], [0.58, P.c6], [1, P.c6]]);
    const sx = gen ? 160 : 70, sy = gen ? 98 : 104; for (let j = -30; j <= 30; j++) for (let i = -30; i <= 30; i++) { const d = Math.hypot(i, j); if (d > 13 && d < 30 && d_umbralMu(sx + i, sy + j) < ((30 - d) / 17) ** 1.5) R.pset(sx + i, sy + j, d_mezclaMu(R.pget(sx + i, sy + j), P.sol, 0.45)); }
    R.disco(sx, sy, 13, P.solS); R.disco(sx, sy, 12, P.sol); for (let y = sy - 6; y < sy + 12; y += 4) R.rect(sx - 14, y, sx + 14, y, P.c5); }, false));
  d_nubesMu(R, t, 96, [hex('#7a4476'), hex('#de8478'), hex('#ffd4a4')], 5, 0.6, 21);
  d_avesMu(R, t, 5, 30, P.palmaS, 10, 5);
  const fr = d_capaMu(R, 'fi-' + cam, () => {
    if (gen) {
      const cr = d_crestaMu(106, 6, 0.8); for (let x = 0; x < 320; x++) R.rect(x, cr[x], x, 112, P.palmaL);
      d_cocoteroMu(R, 186, 120, 50, 0, -10, P.palma, P.palmaS); d_cocoteroMu(R, 158, 116, 36, 0, 8, P.palmaL, P.palma); d_cocoteroMu(R, 300, 100, 34, 0, -6, P.palma, P.palmaS);
      d_bahayMu(R, -6, 92, 146, 70, P, true, 1);
      // la tiendita sari-sari: mostrador con reja, tiras de sobres colgados, el banco
      { const x0 = 96, x1 = 168, top = 86; d_tablasMu(R, x0, top, x1, 146, P.maderaL, P.maderaS, P.piedraL, 3, true, 4); R.poligono([[x0 - 4, top + 1], [x0 + 4, top - 8], [x1 - 4, top - 8], [x1 + 4, top + 1]], P.k); R.poligono([[x0 - 3, top], [x0 + 4, top - 7], [x1 - 4, top - 7], [x1 + 3, top]], (x) => (x % 3 === 0 ? P.zincS : P.zinc));
        R.rect(x0 + 6, top + 8, x1 - 6, 126, P.k); for (let y = top + 9; y < 126; y++) for (let x = x0 + 7; x < x1 - 6; x++) R.pset(x, y, y > 118 ? P.maderaS : P.luzS); for (let x = x0 + 9; x < x1 - 8; x += 4) for (let y = top + 10; y < top + 26; y += 3) R.rect(x, y, x + 2, y + 1, [P.pRojo, P.pAma, P.pAzul, P.pVerde, P.pRosa][(x + y) % 5]);
        for (let x = x0 + 6; x < x1 - 5; x += 5) R.rect(x, top + 8, x, 126, P.k); R.rect(x0 + 4, 126, x1 - 4, 130, P.madera); R.rect(x0 + 4, 126, x1 - 4, 126, P.maderaL);
        for (let k = 0; k < 6; k++) R.rect(x0 + 10 + k * 8, 120, x0 + 13 + k * 8, 125, [hex('#e8e0d0'), hex('#3a8a5a'), hex('#c8a040')][k % 3]);
        R.rect(x0 + 8, 138, x1 - 30, 140, P.maderaS); R.rect(x0 + 10, 140, x0 + 11, 146, P.maderaS); R.rect(x1 - 33, 140, x1 - 32, 146, P.maderaS); }
      d_bahayMu(R, 200, 326, 146, 64, P, false, 3);
      // la calle: tierra apisonada con charcos que reflejan el atardecer
      for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { let c = h(x >> 1, y, 493) < 0.25 ? P.sueloS : h(x, y, 494) < 0.06 ? P.sueloL : P.suelo; if (y < 148) c = P.sueloS;
        for (const [cx, cy, rx] of [[60, 168, 26], [236, 172, 34], [150, 160, 14]]) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / 4) ** 2; if (e < 1) c = e > 0.8 ? P.sueloS : d_umbralMu(x, y) < 0.5 ? P.charco : P.c3; } R.pset(x, y, c); }
      d_jeepneyMu(R, 214, 158, P);
      // los postes y los cables de los que cuelgan los parol
      for (const px of [10, 290]) { R.rect(px - 1, 30, px + 1, 150, P.k); R.rect(px - 6, 34, px + 6, 35, P.k); }
      for (const [y0, y1, cb] of [[36, 36, 18], [40, 46, 12]]) for (let x = 10; x <= 290; x++) { const u = (x - 10) / 280, y = Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * cb); if (!d_quietoMu(x, y)) R.pset(x, y, P.k); }
    } else {
      // de cerca: la pared de madera del piso alto con su ventana capiz grande, el alero, y la calle abajo
      d_tablasMu(R, 120, 20, 319, 132, P.madera, P.maderaS, P.maderaL, 5, false, 6);
      R.rect(160, 34, 302, 104, P.k);
      for (let y = 35; y < 104; y++) for (let x = 161; x < 302; x++) { const cx = (x - 161) % 7, cy = (y - 35) % 7, rej = cx === 0 || cy === 0; R.pset(x, y, rej ? P.capizO : (cx + cy) % 4 === 0 ? P.capizL : x > 230 ? P.capiz : P.capizS); }
      R.rect(230, 34, 232, 104, P.maderaS); R.rect(156, 104, 306, 108, P.maderaL); R.rect(156, 108, 306, 110, P.maderaS);
      R.rect(160, 112, 302, 126, P.k); for (let x = 161; x < 302; x++) if ((x - 161) % 6) R.rect(x, 113, x, 125, (x - 161) % 6 === 1 ? P.maderaL : P.madera);
      R.poligono([[110, 22], [130, 8], [319, 8], [319, 22]], P.k); R.poligono([[112, 21], [131, 9], [319, 9], [319, 21]], (x, y) => (x % 3 === 0 ? P.zincS : y < 12 ? P.zincL : P.zinc));
      R.rect(116, 20, 120, 132, P.k); R.rect(117, 20, 119, 132, P.maderaL);
      d_cocoteroMu(R, 40, 150, 70, 0, 12, P.palma, P.palmaS);
      for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 134 ? P.k : h(x >> 1, y, 495) < 0.25 ? P.sueloS : P.suelo);
      d_piedrasMu(R, 120, 132, 319, 160, [P.piedra, P.piedraS, P.piedraL, P.k], 6, 12, 8);
      for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 1, y, 496) < 0.25 ? P.sueloS : h(x, y, 497) < 0.05 ? P.sueloL : P.suelo);
      R.rect(98, 16, 99, 34, P.k);
      // el banco de bambú, la maceta con su planta y la cesta de cocos
      for (let x = 8; x < 84; x++) { R.pset(x, 150, P.maderaL); R.pset(x, 151, x % 6 ? hex('#c8a060') : P.maderaS); R.pset(x, 152, P.maderaS); } for (const lx of [12, 78]) R.rect(lx, 152, lx + 1, 162, hex('#a08040')); for (let x = 8; x < 84; x += 6) R.pset(x, 151, P.k);
      R.poligono([[94, 150], [108, 150], [106, 162], [96, 162]], P.k); R.poligono([[95, 151], [107, 151], [105, 161], [97, 161]], hex('#c06a3a')); for (let k = 0; k < 9; k++) { const a = -Math.PI * (0.1 + k * 0.1); R.linea(101, 150, Math.round(101 + Math.cos(a) * 12), Math.round(150 + Math.sin(a) * 10), k % 2 ? hex('#3a8a3a') : hex('#2a6a2a')); }
      R.rect(52, 164, 70, 172, P.k); R.rect(53, 165, 69, 171, hex('#b08040')); for (let x = 54; x < 69; x += 3) R.rect(x, 165, x, 171, hex('#806028')); for (let k = 0; k < 3; k++) R.disco(57 + k * 5, 163, 3, hex('#5a3a1a'));
    }
  });
  d_pegarMu(R, fr);
  // la vida: los parol que se encienden uno tras otro, palmas al viento, el motocarro que pasa, el reflejo en los charcos
  if (gen) {
    d_cocoteroMu(R, 186, 120, 50, t, -10, P.palma, P.palmaS);
    for (let k = 0; k < d_PAROLESFIMu.length; k++) { const [x, y, r, c] = d_PAROLESFIMu[k], sw = Math.round(Math.sin(t * 1.4 + k) * 1); R.linea(x, y - r - 4, x + sw, y - r, P.k); d_parolMu(R, x + sw, y, r, t, enc * d_PAROLESFIMu.length > k ? 1 : 0, d_COLPAROLMu[c], k); }
    for (const [cx, cy, rx] of [[60, 168, 26], [236, 172, 34]]) for (let k = 0; k < 6; k++) { const x = Math.round(cx - rx * 0.6 + ((t * 6 + k * 9) % (rx * 1.2))), y = cy - 1 + (k % 3); R.pset(x, y, P.c6); }
    R.recorte([0, 0, 212, 179]); { const x = Math.round(240 - ((t * 22) % 300)), y = 152; R.rect(x, y - 8, x + 14, y - 3, P.k); R.rect(x + 1, y - 7, x + 13, y - 4, P.jAzul); R.rect(x + 1, y - 10, x + 13, y - 9, P.jRojo); R.rect(x + 2, y - 9, x + 2, y - 7, P.k); R.rect(x + 12, y - 9, x + 12, y - 7, P.k); R.disco(x + 3, y - 1, 2, P.rueda); R.disco(x + 12, y - 1, 2, P.rueda); d_genteMu(R, x - 2, y - 3, t, { c: hex('#e8e0d0'), alto: 8, dir: -1 }); R.disco(x - 4, y - 1, 2, P.rueda); } R.recorte(null);
    { const x = Math.round(30 + Math.abs(((t * 4) % 60) - 30)), y = 152, d = ((t * 4) % 60) < 30 ? 1 : -1, p = Math.floor(t * 5) % 2; R.disco(x, y - 3, 2, hex('#c86a2a')); R.pset(x + 2 * d, y - 5, hex('#c86a2a')); R.pset(x + 2 * d, y - 6, P.pRojo); R.pset(x + 3 * d, y - 5, P.pAma); R.pset(x - 2 * d, y - 5, hex('#2a6a4a')); R.pset(x - 3 * d, y - 6, hex('#2a6a4a')); R.pset(x - p, y, P.pAma); R.pset(x + 1 - p, y, P.pAma); }   // el gallo que pasea
    d_humoMu(R, 140, 132, t, hex('#c8a0a8'), hex('#a07888'), 5, 0.5);
  } else {
    d_cocoteroMu(R, 40, 150, 70, t, 12, P.palma, P.palmaS);
    { const sw = Math.round(Math.sin(t * 1.1) * 2); R.linea(98, 34, 96 + sw, 46, P.k); d_parolMu(R, 96 + sw, 84, 38, t, enc > 0 ? 1 : 0, d_COLPAROLMu[0], 0); }
    for (const [x, y] of [[200, 70], [270, 60]]) d_haloMu(R, x, y, 20, P.luzL, 0.15 + 0.05 * Math.sin(t * 3 + x));
  }
  return gen ? d_GEOMu.filipinas : d_GEOMu.filipinasParol;
}

const d_ITMu = pal({
  c0: '#06101e', c1: '#0c1c30', c2: '#142c42', c3: '#1e3c52', c4: '#2a4e62', est: '#7a9ab0', estL: '#e8f4ff', luna: '#f8f4e0', lunaS: '#c8c8b8', halo: '#a8c8d8',
  colina: '#0c1a24', colinaL: '#16283a', cipres: '#081218', teja: '#8a5a44', tejaS: '#5a3a30', tejaL: '#b08268', tejaLuna: '#c8b8a0',
  muro: '#a89878', muroS: '#6a6058', muroL: '#c8b898', ocre: '#b0844a', ocreS: '#7a5a38', k: '#06080c', persiana: '#2a4a3a', persianaL: '#3a6a4a',
  luz: '#ffd080', luzL: '#fff0c0', luzS: '#e08040', antena: '#3a4450',
  cal: '#d8b890', calS: '#a88a68', calL: '#ecd2a8', marmol: '#e8e0d0', marmolS: '#b8b0a0', brasa: '#ff6a20', brasaL: '#ffc040', ceniza: '#3a3030',
  barro: '#a0503a', barroS: '#70341e', barroL: '#c06a48', rojo: '#c82a2a', verde: '#2a7a3a', blanco: '#f0ece0', azul: '#2a5aa8', ama: '#e8c040', carbon: '#1a1a1e', carbonL: '#4a4a52',
});

// un tejado de tejas árabes (coppi) entre x0 y x1, del caballete yc al alero ya (en primer término, más grandes): canales
// en columnas con su sombra, la luz de la luna en las crestas y algún musgo
function d_tejasITMu(R, x0, x1, yc, ya, tam, P, sem = 0) {
  for (let y = yc; y <= ya; y++) for (let x = x0; x <= x1; x++) { const col = Math.floor(x / tam), dx = x % tam, fila = Math.floor((y - yc + (col % 2) * tam) / (tam * 1.6)), dy = (y - yc + (col % 2) * tam) % Math.round(tam * 1.6);
    let c = dx === 0 ? P.k : dx === 1 ? P.tejaLuna : dx < tam * 0.5 ? P.tejaL : dx < tam - 1 ? P.teja : P.tejaS; if (dy === 0) c = P.tejaS; if (h(col, fila, 501 + sem) < 0.08 && dx > 1) c = hex('#4a5a3a'); R.pset(x, y, c); }
  R.rect(x0, yc - 1, x1, yc, P.tejaS); R.rect(x0, ya + 1, x1, ya + 1, P.k);
}

// una chimenea italiana con su sombrerete de tejas
function d_chimeneaITMu(R, x, yb, alto, P) {
  R.rect(x - 4, yb - alto, x + 4, yb, P.k); d_estucoMu(R, x - 3, yb - alto + 1, x + 3, yb, [P.muro, P.muroS, P.muroL], x); R.rect(x + 2, yb - alto + 1, x + 3, yb, P.muroS);
  R.rect(x - 6, yb - alto - 3, x + 6, yb - alto, P.k); R.rect(x - 5, yb - alto - 2, x + 5, yb - alto - 1, P.teja); R.rect(x - 5, yb - alto - 2, x + 5, yb - alto - 2, P.tejaLuna); R.rect(x - 3, yb - alto + 1, x + 3, yb - alto + 2, P.k);
}

function d_italiaMu(R, t, o, cam) {
  const P = d_ITMu, gen = cam !== 'chimenea';
  if (gen) {
    R.copiar(d_capaMu(R, 'it-cielo', () => { d_degradadoMu(R, 0, 179, [[0, P.c0], [0.18, P.c1], [0.32, P.c2], [0.46, P.c3], [0.56, P.c4], [1, P.c4]]); d_lunaMu(R, 78, 40, 12, P.luna, P.lunaS, P.halo); }, false));
    d_estrellasMu(R, t, 110, 96, 502, P.est, P.estL);
    d_nubesMu(R, t, 90, [hex('#1a2a3e'), hex('#2a3e54'), hex('#4a6478')], 3, 0.35, 31);
  }
  const fr = d_capaMu(R, 'it-' + cam, () => {
    if (gen) {
      const cr = d_crestaMu(96, 12, 2.6); for (let x = 0; x < 320; x++) for (let y = cr[x]; y < 120; y++) R.pset(x, y, h(x >> 2, y >> 2, 503) < 0.2 ? P.colinaL : P.colina);
      for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 504) * 319), b = cr[x] + 6 + Math.round(h(k, 2, 504) * 6), al = 8 + Math.round(h(k, 3, 504) * 6); for (let j = 0; j < al; j++) { const w = Math.round(Math.sin(j / al * Math.PI) * 1.8 + 0.3); R.rect(x - w, b - j, x + w, b - j, P.cipres); } }
      for (let k = 0; k < 24; k++) { const x = Math.round(h(k, 4, 504) * 319), y = cr[x] + 8 + Math.round(h(k, 5, 504) * 12); if (y < 118) R.pset(x, y, P.luz); }
      // el campanario con su campana y los muros de las casas del medio con ventanas y persianas
      R.rect(212, 40, 234, 130, P.k); d_estucoMu(R, 213, 41, 233, 130, [P.ocre, P.ocreS, hex('#c8a060')], 2); R.rect(229, 41, 233, 130, P.ocreS); for (let y = 48; y < 130; y += 12) R.rect(213, y, 233, y, P.ocreS);
      R.rect(217, 50, 229, 64, P.k); R.disco(223, 50, 6, P.k); R.disco(223, 57, 3, hex('#8a7a4a')); R.rect(220, 57, 226, 60, hex('#8a7a4a')); R.poligono([[209, 41], [223, 30], [237, 41]], P.tejaS); R.rect(223, 24, 223, 30, P.k); R.rect(221, 26, 225, 26, P.k);
      for (const [x0, x1, top, c] of [[-4, 70, 104, P.muro], [70, 130, 96, P.ocre], [130, 212, 108, P.muroL], [234, 324, 100, P.ocre]]) { d_estucoMu(R, x0, top, x1, 150, [d_mezclaMu(c, P.c2, 0.45), d_mezclaMu(c, P.k, 0.5), d_mezclaMu(c, P.c4, 0.2)], x0);
        for (let x = x0 + 8; x < x1 - 8; x += 18) { const on = h(x, top, 505) < 0.45; R.rect(x - 1, top + 12, x + 7, top + 26, P.k); R.rect(x, top + 13, x + 6, top + 25, on ? P.luz : P.c1); if (on) R.rect(x + 1, top + 14, x + 5, top + 16, P.luzL); R.rect(x - 4, top + 12, x - 2, top + 26, P.persiana); R.rect(x + 8, top + 12, x + 10, top + 26, P.persiana); for (let y = top + 13; y < top + 26; y += 2) { R.pset(x - 3, y, P.persianaL); R.pset(x + 9, y, P.persianaL); } }
        d_tejasITMu(R, x0 - 2, x1 + 2, top - 8, top - 1, 3, P, x0); }
      for (const [x, yb, al] of [[30, 96, 10], [100, 88, 12], [180, 100, 9], [270, 92, 11]]) d_chimeneaITMu(R, x, yb, al, P);
      for (const [x, yb] of [[52, 96], [150, 100], [296, 92]]) { R.rect(x, yb - 14, x, yb, P.antena); for (let k = 0; k < 4; k++) R.rect(x - 4 + k, yb - 14 + k * 3, x + 4 - k, yb - 14 + k * 3, P.antena); }
      // el tejado de delante: el caballete donde se posa la Befana y la chimenea por la que baja
      d_tejasITMu(R, -2, 322, 142, 179, 6, P, 9);
      R.rect(-2, 138, 322, 142, P.k); R.rect(-2, 139, 322, 141, P.tejaL); for (let x = 0; x < 320; x += 8) R.rect(x, 139, x, 141, P.tejaS); R.rect(-2, 139, 322, 139, P.tejaLuna);
      d_chimeneaITMu(R, 196, 139, 24, P); R.rect(190, 112, 202, 113, P.k); d_chimeneaITMu(R, 40, 139, 14, P);
      // la buhardilla con su ventanuco encendido, la maceta de geranios y una antena en el tejado de delante
      { const bx = 92; R.poligono([[bx - 2, 152], [bx + 12, 140], [bx + 26, 152]], P.k); R.poligono([[bx, 151], [bx + 12, 142], [bx + 24, 151]], P.tejaL); R.rect(bx + 3, 151, bx + 21, 168, P.k); d_estucoMu(R, bx + 4, 152, bx + 20, 168, [P.muro, P.muroS, P.muroL], 3); R.rect(bx + 8, 155, bx + 16, 165, P.k); R.rect(bx + 9, 156, bx + 15, 164, P.luz); R.rect(bx + 12, 156, bx + 12, 164, P.k); R.rect(bx + 9, 160, bx + 15, 160, P.k); }
      R.rect(250, 146, 258, 154, P.k); R.rect(251, 147, 257, 154, P.teja); for (let k = 0; k < 5; k++) R.pset(251 + k * 1.5, 145 - (k % 2), hex('#c83a3a')); R.rect(252, 146, 256, 146, hex('#2a5a2a'));
      R.rect(280, 124, 280, 140, P.antena); for (let k = 0; k < 4; k++) R.rect(276 + k, 126 + k * 3, 284 - k, 126 + k * 3, P.antena);
    } else {
      // la chimenea por dentro: pared de cal cálida, repisa de mármol con el belén y velas, calcetines, brasas, suelo de barro
      d_estucoMu(R, 0, 0, 319, 150, [P.cal, P.calS, P.calL], 4);
      for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 160, (y - 130) * 1.2) / 220; if (d_umbralMu(x, y) < d * 0.8) R.pset(x, y, d_mezclaMu(R.pget(x, y), P.calS, 0.45)); }
      R.rect(30, 30, 70, 90, P.k); for (let y = 32; y < 88; y++) for (let x = 32; x < 68; x++) R.pset(x, y, d_umbralMu(x, y) < (y - 32) / 70 ? P.c3 : P.c1); R.disco(56, 46, 5, P.luna); R.disco(58, 45, 4, P.c1); R.rect(49, 32, 50, 88, P.calS); R.rect(32, 59, 68, 60, P.calS); R.rect(28, 90, 72, 93, P.calL);
      for (let k = 0; k < 9; k++) { const x = 34 + Math.round(h(k, 1, 506) * 32), y = 34 + Math.round(h(k, 2, 506) * 22); R.pset(x, y, P.estL); }
      R.rect(84, 76, 236, 150, P.k); d_estucoMu(R, 86, 82, 234, 150, [P.marmol, P.marmolS, hex('#f8f4ec')], 6); R.rect(110, 98, 210, 150, P.k);
      for (let y = 99; y < 150; y++) for (let x = 111; x < 210; x++) R.pset(x, y, d_mezclaMu(P.ceniza, P.k, (y - 99) / 60));
      R.rect(80, 72, 240, 80, P.k); R.rect(81, 73, 239, 78, P.marmol); R.rect(81, 73, 239, 73, hex('#ffffff')); R.rect(81, 78, 239, 79, P.marmolS);
      // el belén sobre la repisa (figuritas sencillas, con respeto) y las velas; las naranjas en un plato
      R.rect(130, 60, 166, 72, P.k); R.poligono([[128, 61], [148, 52], [168, 61]], hex('#7a5a3a')); R.rect(131, 61, 165, 72, hex('#5a3a24')); R.disco(148, 68, 2, hex('#f0d8b0')); R.rect(146, 69, 150, 71, hex('#e8e0c8'));
      for (const [fx, col] of [[138, P.azul], [158, hex('#8a5a3a')]]) { R.rect(fx - 2, 64, fx + 2, 72, col); R.disco(fx, 62, 2, hex('#e8b890')); }
      for (const [fx, col] of [[176, P.rojo], [186, P.verde], [196, P.ama]]) { R.rect(fx - 2, 65, fx + 2, 72, col); R.disco(fx, 63, 2, hex('#c88a60')); R.pset(fx, 60, P.ama); }
      R.disco(208, 57, 1, P.ama);
      for (const vx of [96, 224]) { R.rect(vx - 2, 60, vx + 2, 72, P.blanco); R.rect(vx - 4, 72, vx + 4, 72, P.ama); }
      R.disco(114, 70, 6, P.marmolS); for (let k = 0; k < 3; k++) R.disco(110 + k * 4, 67, 2, hex('#f0901a'));
      for (let y = 150; y < 180; y++) { const d = (y - 150) / 30, fh = 4 + d * 6, fi = Math.floor((y - 150) / fh); for (let x = 0; x < 320; x++) { const w = 18 + d * 12, xx = (x - 160) / (0.6 + d * 0.4) + 160, jx = ((xx + (fi % 2) * 9) % w + w) % w, col = Math.floor((xx + (fi % 2) * 9) / w); R.pset(x, y, jx < 1.2 || ((y - 150) % Math.round(fh)) === 0 ? P.barroS : h(col, fi, 507) < 0.3 ? P.barroS : h(col, fi, 508) > 0.85 ? P.barroL : P.barro); } }
      R.rect(84, 148, 236, 152, P.marmolS); R.rect(84, 148, 236, 148, P.marmol);
      R.rect(250, 70, 300, 150, P.k); R.rect(251, 71, 299, 150, hex('#6a4a2a')); R.rect(251, 71, 299, 73, hex('#8a6a40')); for (const y of [100, 126]) R.rect(252, y, 298, y + 1, hex('#4a3018'));
      for (let k = 0; k < 4; k++) { R.rect(256 + k * 10, 90, 262 + k * 10, 99, k % 2 ? P.azul : P.rojo); R.rect(258 + k * 10, 116, 264 + k * 10, 125, k % 2 ? P.ama : P.verde); }
    }
  });
  if (gen) d_pegarMu(R, fr); else R.copiar(fr);
  if (gen) {
    for (const [x, yb, al] of [[30, 96, 10], [100, 88, 12], [180, 100, 9], [270, 92, 11], [196, 139, 24]]) if (!d_quietoMu(x, yb - al - 6)) d_humoMu(R, x, yb - al - 4, t + x, hex('#3a4a5a'), hex('#2a3848'), 6, 0.5);
    { const u = (t * 0.08) % 1, x = Math.round(20 + u * 160), y = 103 + Math.round(Math.sin(t) * 0); const p = Math.floor(t * 4) % 2; R.rect(x, y - 3, x + 5, y - 1, P.k); R.pset(x + 6, y - 4, P.k); R.pset(x + 6, y - 5, P.k); R.pset(x + 7, y - 4, P.k); R.pset(x + 7, y - 5, P.k); R.pset(x + 6, y - 3, hex('#e8e040')); R.linea(x, y - 3, x - 3, y - 6 - p, P.k); R.pset(x + 1, y, P.k); R.pset(x + 4 - p, y, P.k); }   // el gato que pasea por el tejado
    if (Math.floor(t / 3) % 2) R.rect(151, 125, 155, 127, P.luz);
  } else {
    // las brasas que respiran, las velas, la luz de las brasas en la repisa y los calcetines
    for (let y = 132; y < 148; y++) for (let x = 118; x < 202; x++) { const n = h(x >> 1, y >> 1, 509), q = Math.sin(t * 2 + n * 9) * 0.5 + 0.5; if (n < 0.6 && y > 134 + Math.abs(x - 160) * 0.15) R.pset(x, y, q > 0.7 ? P.brasaL : q > 0.3 ? P.brasa : hex('#6a1a0a')); }
    for (let k = 0; k < 4; k++) { R.rect(122 + k * 22, 140 - (k % 2) * 2, 140 + k * 22, 144 - (k % 2) * 2, P.k); R.rect(123 + k * 22, 141 - (k % 2) * 2, 139 + k * 22, 143 - (k % 2) * 2, hex('#4a2a1a')); }
    d_haloMu(R, 160, 140, 50, P.brasa, 0.2 + 0.05 * Math.sin(t * 2));
    for (const vx of [96, 224]) { R.pset(vx, 58 - (Math.sin(t * 10 + vx) > 0 ? 1 : 0), P.luzL); R.pset(vx, 59, P.luz); d_haloMu(R, vx, 58, 10, P.luz, 0.3); }
    const ll = Math.max(0, Math.min(1, o.llenos ?? 0)), cb = o.carbon ?? -1;
    for (let k = 0; k < 4; k++) { const x = 108 + k * 34, sw = Math.round(Math.sin(t * 1.2 + k) * 0.6), col = [P.rojo, P.verde, P.rojo, P.azul][k], colS = d_mezclaMu(col, P.k, 0.35), b = Math.round(ll * 3);
      R.rect(x + sw, 79, x + 1 + sw, 82, P.k);
      const pts = [[x - 5 - b, 82], [x + 6 + b, 82], [x + 6 + b, 102], [x + 12 + b, 108], [x + 12 + b, 113], [x + 2, 113], [x - 5 - b, 104]].map(([a, c]) => [a + sw, c]);
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(pts.map(([a, c]) => [a + dx, c + dy]), P.k);
      R.poligono(pts, (xx, yy) => (yy < 88 ? ((xx + yy) % 2 ? P.blanco : hex('#d8d4c8')) : xx > x + 3 + sw ? colS : (Math.floor((yy - 88) / 4) % 2 ? col : d_mezclaMu(col, P.blanco, 0.25))));
      if (ll > 0.3) { if (k === cb) { R.disco(x + sw, 80, 3, P.k); R.disco(x + sw, 80, 2, P.carbon); R.pset(x - 1 + sw, 79, P.carbonL); R.pset(x + 1 + sw, 80, hex('#e8e8f0')); }
        else { R.rect(x - 3 + sw, 77, x - 1 + sw, 81, P.ama); R.rect(x + 1 + sw, 76, x + 3 + sw, 81, hex('#f04a8a')); R.pset(x + sw, 78, hex('#3ac0e0')); } } }
  }
  return gen ? d_GEOMu.italia : d_GEOMu.italiaChimenea;
}

// los países y lo que va delante en cada uno
const d_PAISESMu = {
  gavle: d_gavleMu, austria: d_austriaMu, islandia: d_islandiaMu, mexico: d_mexicoMu, japon: d_japonMu, australia: d_australiaMu,
  cataluna: d_catalunaMu, filipinas: d_filipinasMu, italia: d_italiaMu,
};

const d_DELANTEMu = {
  gavle: d_gavleDelanteMu, mexico: d_mexicoDelanteMu, japon: d_japonDelanteMu, australia: d_australiaDelanteMu, cataluna: d_catalunaDelanteMu,
  islandia: (R, t, o, cam) => { if (o.colinaDelante && cam !== 'granja') d_colinaISMu(R, d_ISMu); },
};

// la geometría de cada encuadre para las escenas (suelo: la y de los pies; cajas [x0, y0, x1, y1]; puntos [x, y])
const d_GEOMu = {
  gavle: { suelo: 166, cabra: [162, 55, 252, 150], cabeza: [172, 72], pezunas: 150, vallaDelante: [146, 138, 288, 160], vallaAtras: [152, 126, 284, 142], caseta: [88, 119, 122, 150], ventanilla: [106, 131, 116, 139], puertaCaseta: [94, 132, 102, 150], camara: [136, 98], abeto: [66, 128], puesto: [2, 110, 42, 140], farolas: [22, 300], resplandor: [212, 92], obreros: 150, libre: [[10, 145, 145, 178], [146, 162, 300, 178]] },
  gavleCabra: { suelo: 172, cabeza: [156, 64], hocico: [140, 84], ojo: [156, 57], valla: [0, 142, 319, 182], foco: [20, 165], libre: [[20, 150, 130, 178]] },
  austria: { suelo: 158, calle: [30, 140, 290, 178], campanario: [151, 22, 169, 112], reloj: [160, 75], horizonte: 104, faroles: [68, 252], estrella: [161, 86], lena: [234, 128, 266, 140], trineo: [84, 126, 94, 140] },
  austriaPortal: { suelo: 174, escalon: [104, 158, 216, 166], puerta: [122, 24, 198, 158], bota: [174, 138, 196, 158], bocaBota: [180, 139], galleta: [180, 140], farol: [85, 71], ventana: [236, 62, 284, 112], banco: [14, 128, 66, 150] },
  islandia: { suelo: 166, sendero: d_SENDAISMu, granja: [196, 112, 316, 150], puerta: [213, 134, 223, 150], ventana: [248, 126, 260, 136], zapato: [250, 132, 262, 138], colina: [54, 116, 182, 158], gatoTras: [118, 116], caballos: [58, 160, 106, 170], aurora: [0, 30, 319, 100] },
  islandiaGranja: { suelo: 172, ventana: [126, 80, 194, 126], alfeizar: [112, 128, 208, 135], zapato: [138, 117, 163, 128], vela: [160, 108], puerta: [234, 94, 266, 160], farol: [226, 100], lena: [274, 136, 306, 158], libre: [[10, 160, 110, 178], [170, 160, 230, 178]] },
  mexico: { suelo: 162, calle: [0, 150, 319, 179], posada: [258, 111, 270, 150], puertas: [[32, 111, 44, 150], [85, 111, 97, 150], [258, 111, 270, 150], [296, 111, 308, 150]], pinata: [246, 70], cupula: [160, 70], faroles: 96, procesion: [20, 152, 300, 176] },
  mexicoPuerta: { suelo: 172, umbral: [166, 160, 254, 166], puerta: [168, 46, 252, 160], aldabas: [[204, 108], [216, 108]], ventana: [40, 50, 100, 116], banco: [18, 136, 122, 160], farol: [140, 46], macetas: [[150, 160], [270, 160], [128, 136]] },
  cataluna: { suelo: 168, hogar: [28, 96, 122, 148], tio: [140, 148], tioCaja: [128, 134, 182, 162], mesaAtras: [150, 116, 196, 148], mesaDelante: [232, 130, 320, 179], ventana: [206, 48, 254, 102], alacena: [276, 64, 320, 150], libre: [[40, 155, 225, 178]] },
  catalunaTio: { suelo: 174, cara: [112, 128], tioCaja: [88, 102, 216, 162], manta: [148, 104, 216, 152], dulces: [150, 150, 205, 162], fuego: [4, 92, 44, 136], libre: [[20, 160, 90, 178], [222, 150, 310, 178]] },
  japon: { suelo: 158, tienda: [118, 74, 228, 150], toldo: [117, 96, 230, 105], escaparate: [124, 108, 198, 146], puerta: [202, 108, 222, 150], santa: [214, 150], cola: [150, 158, 310, 158], konbini: [58, 84, 118, 150], izakaya: [0, 88, 58, 150], pasteleria: [228, 86, 320, 150], tren: [0, 63, 319, 72] },
  japonMostrador: { suelo: 154, encimera: 142, mostrador: [0, 142, 319, 179], cubetas: [50, 110, 95, 142], caja: [240, 126, 280, 141], menu: [[28, 22, 106, 64], [114, 22, 192, 64], [200, 22, 278, 64]], freidora: [10, 78, 110, 140], estante: [200, 72, 310, 104] },
  australia: { suelo: 160, horizonte: 76, orilla: 118, parrilla: [60, 141, 92, 160], nevera: [36, 148, 52, 160], torre: [250, 96, 292, 152], banderas: [140, 202], sombrillas: [[30, 136], [178, 128], [300, 140]], castillo: [126, 146], tabla: [230, 126], libre: [[96, 150, 240, 178]] },
  australiaParrilla: { suelo: 168, sueloDetras: 160, parrilla: [140, 132, 262, 179], plancha: 144, nevera: [30, 134, 78, 160], sombrilla: [251, 104], toalla: [84, 150, 108, 158], libre: [[90, 150, 138, 178], [264, 150, 315, 178]] },
  filipinas: { suelo: 160, calle: [0, 146, 319, 179], coro: [110, 150, 200, 170], parol: d_PAROLESFIMu.map(([x, y, r]) => [x, y, r]), jeepney: [214, 128, 306, 158], sariSari: [96, 78, 168, 146], mostrador: 126, puertaArco: [37, 113, 49, 146], sol: [160, 98] },
  filipinasParol: { suelo: 170, parol: [96, 84, 38], ventana: [160, 34, 302, 104], muro: [120, 132, 319, 160], banco: [8, 150, 84, 162], libre: [[110, 162, 300, 178]] },
  italia: { suelo: 139, caballete: [0, 139, 319, 139], chimenea: [196, 112], bocaChimenea: [191, 112, 201, 115], chimenea2: [40, 125], buhardilla: [92, 140, 116, 168], luna: [78, 40, 12], campanario: [212, 24, 234, 130], vuelo: [20, 50, 270, 95] },
  italiaChimenea: { suelo: 166, repisa: [80, 72, 240, 80], calcetines: [[108, 82], [142, 82], [176, 82], [210, 82]], hogar: [110, 98, 210, 150], belen: [128, 52, 168, 72], velas: [[96, 58], [224, 58]], ventana: [30, 30, 70, 90], libre: [[20, 150, 105, 178], [236, 152, 315, 178]] },
};
