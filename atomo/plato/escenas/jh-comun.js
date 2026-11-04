// Fontanería y decorados del episodio 20 (Los Juegos del Hambre: lo que hay que saber antes de Amanecer en la cosecha) en
// el estilo canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el Distrito 12 (exteriores),
// B los interiores del 12 (el tren, la casa del alcalde, el salón de la tele), C el Capitolio, D la arena vista desde
// fuera (la sala de control de los Vigilantes y sus maquetas), E lo real (el mundo de verdad detrás de Panem) y F hoy (el
// cine y el cuarto de la fan); más la pieza del hilo de gags: el pan con ojos.
// Los personajes son los de ELENCO_JH y PIEZAS_JH (pixel-chibi.js): dibujados por nosotros, reconocibles por sus atributos,
// SIN logos, letras ni nada copiado de las películas. SIN DESTRIPES del libro nuevo. SIN MUERTES EN PANTALLA: los Juegos se
// ven desde fuera (maquetas, pantallas, el contador de tributos), nunca la violencia; nada morboso.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, barandillas,
// butacas, el sofá) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores»
// (en el 18 el orden de dibujo fue el fallo número uno). La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la
// barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/jh-comun.js';
//   const { E, R, M } = await T.preparar('jh-gancho');
//   T.rodar(E, R, [[0, (t) => T.distrito(R, t, { encuadre: 'plaza' })]], { año: 50 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, PIEZAS_JH, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, PIEZAS_JH, a_cifras };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el Distrito 12: carbón, madera gastada, tejados de chapa, el cielo gris del amanecer
    carbon: '#2a2a30', carbonL: '#4a4a52', tabla: '#7a6a5a', tablaS: '#4a3e34', chapa: '#8a8e96', polvo: '#b8aa98',
    // el Capitolio: colores chillones, cristal, mármol blanco, el dorado
    capRosa: '#e85aa8', capTurq: '#3ad0c8', capMorado: '#8a4ad8', marmol: '#eef0f4', marmolS: '#c8ccd8', oroCap: '#e8b830',
    // la arena: el verde del prado del 50, el azul de la cúpula y el brillo del campo de fuerza
    prado: '#5ab84a', pradoS: '#2e7a2e', cupula: '#8ad8ff', campoF: '#e8fbff',
    // lo real y hoy: el azul de las pantallas
    pantallaHoy: '#4a8ae8',
    // el pan con ojos: corteza dorada, miga
    corteza: '#c8843a', cortezaS: '#8a5220', miga: '#f6e2b0',
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
  const E = await escena(id, 'ep20');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo va en Juegos (los libros no dan años): la rosa de Snow (Juegos 10), el broche (Juegos 50) y la
  // llama de Katniss (Juegos 74–75)
  Object.assign(R.ICONOS, {
    rosa: ['..##...', '.####..', '######.', '.####..', '...#...', '..##...', '...#...'],
    broche: ['.#####.', '#..#..#', '#.###.#', '#######', '#.###.#', '#..#..#', '.#####.'],
    llama: ['...#...', '..##...', '..###..', '.####..', '.#####.', '#######', '.#####.'],
  });
  R.tramosTiempo([[1, 30, R.PALA.ROJO, 'rosa'], [30, 62, R.PALA.ORO, 'broche'], [62, 76, R.PALA.NARANJA ?? R.PALA.ROJO, 'llama']]);
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

// ── A · El Distrito 12 (exteriores) ──────────────────────────────────────────────────────────────────────────────────
// Un pueblo minero pobre y gris en las montañas (nuestro, sin nada copiado de las películas): casas de tablas y chapa
// oxidada, polvo de carbón, la mina con su castillete y su chimenea al fondo, humo, ropa tendida, gallinas, una cabra,
// gansos; todo con textura (tablas con vetas y clavos, chapa ondulada con óxido, piedra con juntas y hollín, adoquines
// en perspectiva, barro con charcos), luz y sombra, tres términos y vida animada. El fondo fijo de cada encuadre, cámara
// y luz va en un búfer (R.nuevo) que se pinta una vez; encima, cada fotograma: nubes de tres tonos a tres velocidades
// (solo en el cielo), pájaros, humo, ropa al viento, animales, faroles que parpadean, pantallas, gente pequeña de fondo.
// o.luz: 'amanecer' (por omisión; en el bosque, 'tarde'): cielo gris rosado y el sol que sale; 'dia' (gris azulado);
// 'tarde' (naranja, el sol bajo); 'noche' (azul oscuro, luna, estrellas, ventanas y faroles encendidos). Toda la escena
// se tiñe con la luz; las luces (faroles, la puerta abierta, las pantallas) no. o.antigua (true, solo la plaza): hace 64
// años (Juegos 10): madera más clara y nueva, menos casas, suelo de tierra, sin pantallas (altavoces de bocina en postes)
// y un escenario de tablas toscas sobre caballetes. o.encuadre:
//   'plaza': la plaza de la cosecha. 'general': el Edificio de Justicia de piedra con hollín al fondo (frontón con reloj
//     que anda, balcón con balaustrada, puerta grande, colgaduras grises con un sello sin letras), dos pantallas grandes
//     del Capitolio sobre postes (izquierda x 26–90, y 46–84; derecha x 226–290, y 50–88; o.pantalla: 'sello' por omisión
//     (un sello redondo sin letras que brilla), 'nada' (apagada, con nieve tenue) o una función (R, t, [x0,y0,x1,y1]) que
//     pinta dentro, ya recortada), casas de mineros a los lados, la mina con su castillete (la rueda gira) y su chimenea
//     humeando a la izquierda, montañas; banderines grises que ondean; el escenario de madera delante del edificio (suelo
//     del escenario y 118) con dos urnas de cristal y un micrófono; la plaza de adoquines con los chicos de espaldas en
//     filas por edades, separados por cordones, y un pasillo libre en medio (x 126–194); agentes de la paz de blanco en
//     las esquinas del escenario y de la plaza; palomas en la escalinata. 'escenario' (de cerca, a la altura de los
//     ojos): la fachada grande con el balcón, las colgaduras y las pantallas a los lados; el suelo de tablas del escenario
//     con cuatro marcas de cinta, el faldón; las dos urnas grandes sobre pedestales a los lados, el micrófono de pie en
//     el centro y sitio para cuatro tributos (pies en y 146). o.urna (0–1, 1): cuánto se llenan las urnas; o.desborda
//     (true): las papeletas rebosan, saltan y caen revoloteando.
//   'calle': la Veta. 'general': cinco casas de tablas y chapa con porche, una segunda fila detrás, la mina en la colina
//     con mineros pequeños que suben por el camino, chimeneas que humean, dos tendederos con ropa al viento, la calle de
//     barro con roderas y charcos que reflejan el cielo, una bomba de agua con su pila, la cabra atada que rumia, cuatro
//     gallinas que picotean, faroles en postes, un carrito de carbón, un gato en un tejado y un minero que cruza al fondo;
//     la puerta abierta con luz cálida es la de la casa del centro (la de Haymitch, x 146–162). 'puerta' (de cerca): la
//     fachada de tablas, la puerta abierta con el interior cálido (estufa, mesa, quinqué; recortado al hueco), dos
//     ventanas con cortina, el farol, el tendedero bajo el alero, la tina de lavar, el banco con la palangana, gallinas en
//     el escalón; el porche (pies en y 164) con sitio para tres o cuatro personas (x 60–260).
//   'quemador': el mercado negro en un almacén de carbón viejo. 'general': techo de cerchas, muro de ladrillo ennegrecido,
//     ventanucos altos con rayos de luz y polvo que flota, faroles colgados que parpadean, cuatro puestos con toldos de
//     tela (tarros, pieles, hierbas colgadas, velas, cestas) y sus vendedores pequeños, la olla de la sopa sobre el fuego
//     con su vapor, cajas, sacos y barriles; pasillo libre en medio (pies en y 160). 'puesto' (un puesto de cerca): toldo
//     festoneado que ondea, estantes con tarros, velas, hierbas y dos pieles, un farol; a la izquierda el almacén con
//     otro puesto y compradores que pasan; el mostrador va en distritoDelante (la vendedora, detrás: pies en y 150; la
//     chica, delante a la izquierda: pies en y 170, x 24–104); en el lado del almacén, sacos y una jaula con una gallina.
//   'aldea': la Aldea de los Vencedores. 'general': tres casas grandes de piedra con tejado de pizarra, vacías (cortinas
//     corridas, hiedra), césped crecido que se mece, la fuente seca con hojas, farolas, árboles; la casa de la derecha
//     con el porche lleno de botellas y cuatro gansos sueltos; humo en su chimenea. o.periodico (true): un periódico
//     doblado (sin letras) en el césped junto al camino. 'porche' (de cerca): la fachada de sillares, la ventana con
//     contraventanas y botellas en el alféizar, la puerta con montante, el aplique, el suelo de tablas pintadas, la
//     mecedora que se mece sola (x 198–226), botellas por todas partes, una caja de botellas, gansos en el césped; a la
//     derecha, el césped y otra casa vacía; la cerca del porche va en distritoDelante (pies en el porche en y 156).
//   'bosque': detrás de la alambrada al atardecer. 'general': el lago que refleja el cielo con la estela del sol que
//     brilla, la orilla de enfrente con pinos, el árbol viejo y grande a la izquierda (solo un árbol: nada colgado), dos
//     sinsajos en su rama que cantan (notas que flotan), juncos que se mecen, luciérnagas, un pez que salta, el poste de
//     la alambrada a la derecha. 'arbol' (de cerca): el tronco enorme con corteza, musgo y raíces, la rama baja con dos
//     sinsajos, el lago detrás, una piedra plana para sentarse (x 136–180, y 148).
// Delante: distritoDelante(R, t, o) pinta el mostrador del puesto ('quemador' puesto: tablero en y 140–145, frente hasta
// abajo, x 112–318, con tarros, una balanza, la bandeja de baratijas que brillan, telas y una cesta de huevos), la
// barandilla del escenario ('plaza' escenario: barandillas de madera en x 0–72 y 248–319, pasamanos en y 134, y un cordón
// de terciopelo que cuelga en medio, de y 136 a 143, a la altura de las rodillas) y la cerca del porche ('aldea' porche:
// pasamanos en y 144, balaustres hasta y 160, con hueco para los escalones en x 128–192): llama a distritoDelante después
// de los actores, con las mismas opciones. Devuelve { suelo, luz, … } con las posiciones (sitios libres, urnas, puertas, pantallas, sol).
export function distrito(R, t, o = {}) {
  const enc = p_ENC[o.encuadre] ? o.encuadre : 'plaza', D = p_ENC[enc], cam = D.camaras.includes(o.camara) ? o.camara : 'general';
  const luz = p_LUZ[o.luz] ? o.luz : enc === 'bosque' ? 'tarde' : 'amanecer', ant = enc === 'plaza' && !!o.antigua;
  const F = p_fijo(R, [enc, cam, luz, ant ? 1 : 0].join('|'), luz, D.cielo(cam, luz), (luces) => D.fijo(R, cam, luz, ant, luces));
  R.copiar(F.b);
  const tn = p_tinte(luz);
  if (F.cielo) p_cieloVivo(R, t, F, luz);
  return { luz, ...D.vivo(R, t, cam, luz, ant, o, tn, F) };
}
export function distritoDelante(R, t, o = {}) {
  const enc = p_ENC[o.encuadre] ? o.encuadre : 'plaza', D = p_ENC[enc], cam = D.camaras.includes(o.camara) ? o.camara : 'general';
  const luz = p_LUZ[o.luz] ? o.luz : enc === 'bosque' ? 'tarde' : 'amanecer';
  if (D.delante) D.delante(R, t, cam, luz, enc === 'plaza' && !!o.antigua, o, p_tinte(luz));
}
// ── B · Los interiores del 12 y el tren ──────────────────────────────────────────────────────────────────────────────
// Tres encuadres con dos cámaras cada uno (o.encuadre, o.camara). Lo fijo de cada uno va en su búfer; cada fotograma se
// pinta encima lo que vive. Devuelve { suelo, … } con las posiciones (x de R.actor es su borde izquierdo: ocupa x…x+15).
//   'tren' (por omisión): el vagón de lujo del Capitolio visto de lado. Techo abovedado crema con artesones y moldura
//     dorada; paredes de caoba con veta, pilastras acanaladas y apliques de tulipa que titilan; tres ventanas de esquinas
//     redondeadas con cortinas de terciopelo ciruela recogidas, galería con flecos y un montante de latón; por ellas corre
//     el paisaje (recortado a cada cristal, el mismo mundo de una ventana a otra): cielo tramado con nubes de tres tonos a
//     tres velocidades, sierras lejanas, colinas con casitas grises que echan humo, bosque de pinos, la cuneta borrosa y
//     postes del telégrafo con sus cables que pasan rapidísimo (su sombra cruza las manchas de luz de la moqueta);
//     pájaros. Encima de las ventanas, el portaequipajes de latón con maleta, sombrerera y baúl que botan con el traqueteo;
//     abajo, friso de cuarterones; moqueta granate con rombos dorados en perspectiva. A la izquierda, la puerta del
//     pasillo con su ventanuco (pasa un camarero de blanco con una bandeja, recortado al cristal); bajo la primera
//     ventana, el sofá capitoné de terciopelo con su cojín (asiento en y 130–138: quien se sienta, R.actor con suelo 140);
//     la cubitera de pie con la botella; a la derecha, el espejo dorado.
//     o.camara 'general' o 'ventana' (una ventana grande de cerca, x 46–234 · y 22–136, el paisaje al doble de tamaño y
//     sitio para dos personajes de pie delante, con la cabeza contra el cristal).
//     o.luz: 'dia' (por omisión), 'tarde' (sol bajo y naranja) o 'noche' (luna, estrellas, ventanas de casas encendidas;
//     sin manchas de sol en la moqueta). o.velocidad: multiplica lo que corre el paisaje (1 por omisión; 0 parado).
//   'alcalde': el salón del alcalde, ordenado y algo elegante para el 12: papel pintado verde salvia con rombos, friso
//     blanco, parqué en espiga con alfombra trenzada; la ventana de guillotina con visillo de encaje y cortinas verdes (por
//     ella se ve el 12 gris: el castillete de la mina con su humo, casas de tablas con chimeneas, un minero que pasa,
//     pájaros; en el alféizar, el gato del alcalde mueve la cola); la jaula del canario, que salta de palo en palo; el
//     piano vertical con candelabros que titilan, partitura y metrónomo que oscila; la pared de las fotos (seis marcos de
//     tono sepia; la ovalada dorada del centro es la chica rubia con el broche: un punto amarillo que brilla); el reloj de
//     pie con su péndulo y sus agujas; la mesa redonda con mantel de encaje, jarrón con flores y tetera que humea; el sol
//     entra tramado por la ventana con motas de polvo. o.camara 'general' o 'fotos' (la pared de las fotos de cerca, sobre
//     el aparador con candelabros y tapete; la foto de la chica, grande en el centro; sitio para dos chicas delante).
//     o.brillo (0–1): un destello recorre el cristal de la foto de la chica y su broche se enciende.
//   'tele': el salón de una casa de vencedores de noche, en penumbra: papel pintado oscuro a rayas, puerta entornada con
//     un filo de luz cálida, lámpara de pie (o.lampara: true la enciende), ventana con la luna, estrellas, nubes que la
//     cruzan, nieve fina, tejados y una ventana encendida; la tele vieja de madera con antena de cuernos, botones y
//     rejilla; cintas apiladas encima y al lado; la mesita baja con la taza que humea y el mando. La pantalla ilumina la
//     habitación con su color (se mide en cada fotograma: si la pantalla cambia, cambia la luz) y parpadea.
//     o.pantalla: función (R, t, [x0,y0,x1,y1]) que pinta dentro (ya recortada), 'nieve' (por omisión), 'prado' (la arena
//     preciosa: prado de flores que se mecen, montañas, el cuerno dorado en el centro, mariposas) o 'apagada'. Encima, la
//     tele pone sus líneas, su viñeta, su reflejo y la banda que sube. o.camara 'general' o 'pantalla' (la pantalla de
//     cerca, grande, con el borde del mueble, los mandos y las cintas de la balda).
// Delante: interiorDelante(R, t, o) con la mesa del tren (mantel, frutero, pastelero, copas; 'tren' general), el brazo de
// la butaca y la mesita con la licorera ('tren' ventana) y el respaldo de orejas de la butaca, con el filo encendido por
// la luz de la tele ('tele' general): llama a interiorDelante después de los actores, con las mismas opciones.
export function interior(R, t, o = {}) {
  const enc = o.encuadre ?? 'tren', cam = o.camara ?? 'general';
  if (enc === 'alcalde') return cam === 'fotos' ? i_alcaldeFotos(R, t, o) : i_alcalde(R, t, o);
  if (enc === 'tele') return cam === 'pantalla' ? i_telePantalla(R, t, o) : i_tele(R, t, o);
  return cam === 'ventana' ? i_trenVentana(R, t, o) : i_tren(R, t, o);
}
export function interiorDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'tren', cam = o.camara ?? 'general';
  if (enc === 'tren') { if (cam === 'ventana') i_trenVentanaDelante(R, t); else i_mesaTren(R, t); }
  else if (enc === 'tele' && cam !== 'pantalla') i_butacaDelante(R, t);
}
// ── C · El Capitolio ─────────────────────────────────────────────────────────────────────────────────────────────────
// Una capital rica, de colores chillones, cristal y mármol (nuestra; sin letras ni logos). Cada encuadre trae dos cámaras
// con el mismo detalle; el cielo de mañana (tramado, sol, nubes de tres tonos a tres velocidades, un dirigible rosa y
// pájaros) se ve por todas las ventanas. o.encuadre:
//   'avenida' (por omisión): torres de cristal de colores (cintura, gota, cúpula dorada, aguja, curva), un palacio de
//     columnas, montes nevados, la pantalla gigante con aros y una rosa blanca que gira [241,45,269,71]; bajos con
//     escaparates y toldos, paseantes de peluca en la acera del fondo (y 120), farolas con banderolas que ondean, coches
//     curvos en dos carriles (y 132 y 143) y la plaza de damero de mármol con un rosetón y palomas rosas. Personajes en y 166.
//     o.camara 'balcon': la fachada del palacio desde la plaza: balcón con barandilla (en capitolioDelante), ventanal con
//     cortinas, colgaduras moradas, medallones y guirnaldas, la multitud que salta y saluda abajo y confeti. Personajes en
//     el balcón, y 126 (x 96–224; la barandilla les tapa de la cintura abajo).
//   'plato': el plató: focos con haces que barren, la pantalla gigante [97,29,223,93] (o.pantalla: función (R, t,
//     [x0,y0,x1,y1]) o 'retratos' con o.n cuadritos, 24 por omisión, un marco dorado que salta), el medidor de audiencia
//     (o.audiencia 0–1; si no, sube y baja solo) con su cifra (a_cifras), gradas con público de pelucas (o.aplausos 0–1),
//     el escenario redondo con luces que corren, dos sillones rosas (x 128 y 192), la mesita, la primera fila y una cámara.
//     Personajes en y 150. o.camara 'sillones': los sillones de cerca (x 112 y 208), mesita, micrófono, la pantalla grande
//     detrás (12 retratos), chevrones de luz, columnas de luz, bokeh del público; personajes en y 160.
//   'despacho': el despacho de Snow: mármol con vetas, el ventanal con la ciudad (x 80–240, y 22–117) y cortinas granates,
//     la librería, un busto, la bandera granate sin escudo que ondea, el suelo en espiga con alfombra y la luz del ventanal;
//     la mesa grande con el cofre (o.cofre 0–1: se abre y asoman tarjetas que brillan), rosas blancas, tintero y taza
//     (también en capitolioDelante). Snow detrás de la mesa en x 160, y 133; visitas en y 168 (x 70 y 262).
//     o.luz 'noche': el mismo despacho en penumbra cálida, con la ciudad de noche en el ventanal (luna, estrellas,
//     reflectores, ventanas encendidas, pilotos rojos, faros), dos apliques y una lámpara de pie encendidos y la lámpara de
//     mesa (también en capitolioDelante; si la escena no le pasa o.luz, o.cofre u o.numero, repite lo que pidió capitolio).
//     o.camara 'mesa': la mesa de cerca: el cofre grande (o.cofre, 1 por omisión), una tarjeta grande de pie con el
//     número o.numero ('50' por omisión, a_cifras al doble), el jarrón alto de rosas, el tintero; detrás el ventanal. Todo
//     el tablero (y 112–180) va también en capitolioDelante; Snow detrás, en x 226, y 115.
//   'invernadero': hierro blanco y cristal con la ciudad detrás, rosales trepadores, fuente con chorro (x 160), arriates de
//     ladrillo con rosales blancos, regadera, macetas, carretilla, manguera, un jardinero que riega, rayos de luz, pétalos
//     que caen y mariposas. Personajes en el camino de grava, y 160 (x 110–210). o.camara 'rosas': dos rosales grandes a los
//     lados, el banco de trasplantar contra el cristal; personajes en y 162 (x 120–200); ramas en capitolioDelante.
//   'museo': pared de mármol rosado, techo de casetones, tres cuadros en marcos dorados (o.cuadros: tres funciones (R, t,
//     [x0,y0,x1,y1]); por omisión la arena con el reloj que gira, el pájaro dorado en llamas y el palacio con las ventanas
//     que se apagan) en [18,50,90,110], [124,44,196,112] y [230,50,302,110], apliques con su luz, cordones, bancos, suelo de
//     damero con reflejos y el dron-cámara que patrulla. Personajes en y 162. o.camara 'cuadro': un cuadro de cerca (o.cual
//     0–2, 1 por omisión) en [50,24,262,140]; el que mira, en x 26, y 172; los postes y el cordón en capitolioDelante.
//   'mapa': la sala del mapa: pared azul oscura, tres pantallas con gráficas que cambian; la mesa de cristal (tablero de
//     y 59 a 138) con el mapa de Panem (inventado): mar, Rocosas, el Capitolio de colores que late, los doce distritos con
//     su pictograma, las vías doradas y los trenes que suben (o.trenes 0–1, 0,5 por omisión). Personajes a los lados,
//     x 22 y x 298, y 170. o.camara 'doce': el rincón del Distrito 12 desde arriba (mesa x 0–262, y 0–154): montes con
//     árboles, el pictograma de carbón, la mina que humea, las casitas, trenes de carbón que salen (o.trenes 1 por omisión) y
//     el mar; el personaje a la derecha, x 290, y 172.
// Delante: capitolioDelante(R, t, o) con la barandilla del balcón, la mesa del despacho (las dos cámaras), las ramas de
// rosal ('rosas') y el cordón del cuadro de cerca: llama a capitolioDelante después de los actores. Devuelve { suelo, … }
// con las posiciones (la cabecera de cada k_<encuadre> las detalla; en 'mapa' también P(u, v) para poner cosas en el mapa).
export function capitolio(R, t, o = {}) {
  const enc = o.encuadre ?? 'avenida', cam = o.camara ?? 'general';
  R.recorte(null);
  return (k_ENC[enc] ?? k_ENC.avenida)(R, t, o, cam);
}
// lo que va por delante de los personajes en cada encuadre y cámara (la barandilla del balcón, la mesa del despacho, los
// rosales de delante, el cordón del museo, el borde de la mesa del mapa); se llama después de los actores
export function capitolioDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'avenida', cam = o.camara ?? 'general', f = k_DEL[enc + '/' + cam];
  R.recorte(null);
  if (f) f(R, t, o);
}
// ── D · La arena vista desde fuera ───────────────────────────────────────────────────────────────────────────────────
// Los Juegos SIEMPRE desde fuera: maquetas, hologramas, pantallas y lucecitas; nunca violencia ni cuerpos. o.encuadre:
//   'control' (por omisión): la sala de control de los Vigilantes en penumbra azul. Techo de placas con tiras de luz fría;
//     la pared del fondo con cuatro pantallas (un mapa de la arena con los puntitos que se mueven, una gráfica de audiencia,
//     la grande del centro y la de la derecha), una fila de monitorcitos de estado, la puerta sellada con su ojo de buey y
//     su piloto, el armario de servidores bajo la esquina de Atom (lucecitas), la grada de atrás con cuatro operadores de
//     espaldas que teclean y un vigilante que pasa por la pasarela; el suelo pulido con juntas en perspectiva y los
//     reflejos de las pantallas; en el centro, el pedestal del proyector con su aro de luz que gira y, encima, la maqueta
//     holográfica de la arena con su cúpula punteada que titila. o.arena: 'prado' (por omisión: el prado de los Juegos 50,
//     con flores que se mecen, lago, bosque de abetos, la montaña nevada y la cornucopia dorada) o 'reloj' (la isla de
//     doce sectores de los Juegos 75 con su manecilla, o.hora). o.luces (0–48, 24 por omisión): las lucecitas de los
//     tributos que flotan sobre la maqueta (y los puntitos del mapa). Pantalla grande: o.pantalla (función (R, t,
//     [x0,y0,x1,y1]) que pinta dentro: la línea de tiempo, por ejemplo), si no o.contador (el número grande con a_cifras
//     a doble tamaño y debajo una rejilla de figuritas encendidas, tantas como el número, hasta 48), si no un sello
//     redondo sin letras que gira. Pantalla de la derecha: o.engranajes (0–1): engranajes que giran; de 0 a 0,5 se atascan
//     y tiemblan; desde 0,5 se paran, salta una pieza y se enciende un aspa roja. o.sinsajo (0–1): un sinsajo dentro de
//     un aro aparece en la pantalla grande (con 1 se ve entero; las escenas lo suben y lo bajan en un instante).
//     o.camara 'general' o 'consola' (de cerca: una consola con su silla de respaldo alto a la izquierda para un
//     Vigilante sentado, dos pantallas grandes detrás (el mapa y la gráfica, o o.pantalla, o el contador), la maqueta
//     detrás a la derecha y otra grada con dos operadores; la mesa con teclado,
//     deslizadores, el dial (o.dial 0–1: hacia dónde apunta; si no, oscila solo), botones que parpadean, una taza que
//     humea y un monitor de mesa que muestra o.engranajes, o.sinsajo, o.contador o una onda; todo eso va en arenaDelante).
//   'cupula': la maqueta física de la arena de cerca, sobre su mesa redonda en la sala a oscuras (pantallas y pilotos
//     desenfocados al fondo): el prado con lago, bosque, montaña, cornucopia, flores que se mecen con el viento, dos
//     pájaros de maqueta y las lucecitas de los tributos (o.luces, 0 por omisión); encima, la cúpula de cristal del campo de
//     fuerza: una red de rombos que brilla en ondas que suben, el filo encendido y un reflejo. o.golpe (0–1): una piedra sale
//     del prado, choca con la cúpula en o.punto (destello y anillos de luz que se abren) y vuelve rebotando hasta caer y
//     botar en la hierba; o.grieta (0–1): desde o.punto se abren grietas de cristal ramificadas, con anillos y esquirlas,
//     y la cúpula parpadea; o.flecha (0–1): una flecha con un cable que la sigue sale del prado (del árbol de la izquierda)
//     y se clava en o.punto. o.camara 'general' o 'borde' (el borde de cerca: el prado de maqueta con abetos grandes,
//     flores y una roca, el precipicio, y la pared del campo de fuerza que sube en curva con sus rombos y sus ondas; fuera,
//     a la derecha, la sala, con un vigilante que pasa al fondo; dos mariposas de maqueta y o.luces, 2 por omisión).
//   'reloj': la arena de los Juegos 75 vista desde arriba en un holograma grande sobre el aro proyector del suelo: la
//     cornucopia en su islote, la laguna con doce lenguas de arena, la playa con su espuma, la selva en doce sectores
//     (copas que se mecen) y el filo del campo de fuerza con doce marcas y 12, 3, 6 y 9 (a_cifras); o.hora (0–12; si no,
//     avanza sola): la manecilla de luz que gira desde el centro y el sector que señala brilla. o.camara 'general' o
//     'sector' (un sector de cerca: lengua de arena, laguna con ondas, espuma, playa y la selva con copas grandes; la
//     manecilla pasa por encima; el borde de la mesa holográfica abajo).
// Delante: arenaDelante(R, t, o): las esquinas de las consolas de primer término ('control' general) y la mesa de la
// consola ('control' consola): llama a arenaDelante después de los actores. Devuelve { suelo, maqueta: [x0,y0,x1,y1],
// pantalla, sitios: [[x, suelo], …] (x = borde izquierdo del sprite de 15 px), punto, … } (ver cada encuadre).
export function arena(R, t, o = {}) {
  const enc = o.encuadre ?? 'control', cam = o.camara ?? 'general';
  if (enc === 'cupula') return cam === 'borde' ? v_borde(R, t, o) : v_cupula(R, t, o);
  if (enc === 'reloj') return cam === 'sector' ? v_sector(R, t, o) : v_relojGeneral(R, t, o);
  return cam === 'consola' ? v_consola(R, t, o) : v_control(R, t, o);
}
// lo que va por delante de los actores: las esquinas de las consolas de primer término ('control' general, x 0–46 y
// 274–319, y ≥ 150) y la mesa de la consola ('control' consola, y ≥ 146, con el monitor de mesa en x 240–308, y 112–146)
export function arenaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'control', cam = o.camara ?? 'general';
  if (enc !== 'control') return;
  if (cam === 'consola') v_mesaConsola(R, t, o); else v_esquinas(R, t);
}
// ── E · Lo real detrás de Panem ──────────────────────────────────────────────────────────────────────────────────────
// Siete encuadres del mundo de verdad, cada uno con dos cámaras (o.camara 'general' por omisión y la otra que se dice),
// con el mismo detalle y vida animada. Todos pintan los 320 × 180 en cada fotograma (lo fijo, en un búfer de R.nuevo()).
// o.encuadre:
//   'salon': un salón de casa de hoy, de noche, visto de lado: la tele en su mueble a la izquierda, la ventana con la
//     ciudad de noche (ventanas que se encienden, la luz roja de una antena, un avión), la lámpara de pie, la mesita con
//     una taza que humea y un bol de palomitas, la alfombra, el sofá de perfil mirando a la tele (el respaldo y el cojín
//     aquí; el brazo y el lateral, con la manta y un gato que duerme encima, en realDelante) y la luz de la tele que
//     baña la pared y el suelo con el color del canal. La tele alterna dos canales, SIN violencia: o.canal 0 un concurso
//     (focos que barren, bombillas que parpadean, dos atriles con su marcador, el presentador y confeti) y 1 un desierto
//     lejano (dunas, una columna de humo que sube despacio, un convoy y una fila de siluetas diminutas que caminan, calima);
//     sin o.canal, cambia sola cada 3 s. o.zap (0–1): la nieve y la franja del cambio de canal (sin o.canal, sale sola en
//     cada cambio). o.sinPilas: en la tele parpadea una pila vacía (el mando se queda sin pilas) y el piloto del mando no
//     se enciende. o.camara 'general' o 'tele' (la tele de cerca, enorme, en su mueble, con los altavoces, la barra de
//     sonido y el mando sobre el mueble; o.mando false lo quita, si la escena pone una mano con él).
//   'creta': la bahía de Creta vista desde un acantilado, de día: el mar con olas y destellos, la costa con su playa, el
//     puerto con su espigón y casas blancas, el palacio de columnas rojas en lo alto, el laberinto de piedra visto desde
//     arriba (muros con su cara en sombra), olivares, cipreses, el camino con gente diminuta y cabras, el monte nevado al
//     fondo y, delante, la cima del acantilado con hierba, flores, un murete y un olivo viejo. Un barco de vela negra
//     cruza la bahía hasta el espigón (o.barco 0–1, por omisión llega en 10 s). o.camara 'general' o 'puerto' (el muelle
//     de piedra de cerca: el barco amarrado con su vela negra, el ojo pintado en la proa y la pasarela que baja al muelle;
//     ánforas, cabos, bolardos, redes, una gaviota y un cangrejo; el palacio en el promontorio del fondo).
//   'circo': un anfiteatro romano lleno, de día: el muro alto con arcos y mástiles con banderolas, cinco gradas de público
//     (gente que se levanta y agita los brazos), el palco del emperador en el centro con columnas, cortina morada y un
//     toldo a rayas que ondea; el podio de mármol con su franja roja y relieves; las puertas de la arena; la arena
//     rastrillada con huellas, un mozo que la rastrilla, palomas. o.panes (0–1): cuántos panes vuelan desde el palco hacia
//     las gradas. o.camara 'general' o 'palco' (el palco de cerca: el trono de respaldo morado y oro, las cestas de pan,
//     las columnas, el toldo y el público de enfrente; los panes salen del centro del palco).
//   'biblioteca': el estudio de un filósofo del siglo XVIII, de noche, a la luz de una vela: estanterías de libros, un
//     aplique con dos velas, la ventana con cortinas, el reloj de caja, el globo terráqueo, la alfombra y el escritorio
//     (va en realDelante, con la vela, el tintero y la pluma, los papeles y un libro abierto). Por la ventana, una plaza de
//     noche: casas de piedra con ventanas encendidas, la luna, humo de chimeneas, antorchas y una multitud de figuritas que
//     mira a tres figuras en un balcón iluminado. o.camara 'general' o 'ventana' (la ventana de cerca, con la plaza grande).
//   'bosque': un bosque americano de día: un roble enorme delante a la izquierda con una rama larga donde está el sinsonte
//     gris, troncos y copas en tres términos, rayos de luz, hojas que caen, una mariposa, una ardilla, un charco con una
//     rana, un tronco caído, helechos y setas, y al fondo un camino con un coche aparcado. o.canto: el pájaro abre el pico y
//     salen notas y el icono de lo que imita: 'alarma' (un coche con ondas; el del fondo parpadea), 'rana' (una rana; la del
//     charco infla el saco), 'atom' (un átomo pequeño); 'notas' (solo notas). o.camara 'general' o 'rama' (la rama de
//     cerca con el pájaro al doble, bayas y hojas, el bosque desenfocado detrás y el suelo abajo).
//   'protesta': una plaza de una ciudad asiática de hoy, por la tarde: torres de cristal, casas-tienda de colores con
//     balcones, aparatos de aire, plantas y cables; un pilar conmemorativo; árboles; al fondo, una fila de agentes con
//     casco y escudo, quietos tras unas vallas; el público con pancartas SIN letras (corazón, paloma, la mano de tres dedos,
//     rayas), paraguas y banderolas de colores; palomas en el suelo. Respetuosa, sin violencia. o.manos (0–1): cuántos
//     brazos se levantan con los tres dedos. o.camara 'general' o 'manos' (contraluz desde abajo: el cielo dorado, las
//     torres, pancartas que se mecen y la multitud en silueta levantando la mano de tres dedos).
//   'libreria': una librería de día: estanterías de suelo a techo llenas de libros sin letras (lomos de colores, alguno de
//     frente con un pictograma), lámparas colgadas, el escaparate y la puerta de cristal con la calle y una cola de
//     lectores que avanza, la mesa del centro con una torre de libros que crece (o.torre 0–1), alfombra y el mostrador (va
//     en realDelante, con la caja, una campanilla y una pila de libros). o.camara 'general' o 'grafico' (un móvil en su
//     soporte sobre el mostrador: la pantalla con un contador a_cifras (o.cifra, texto de cifras) y un gráfico de barras
//     que crece (o.barras: alturas 0–1; o.crece 0–1), con el fondo de la librería desenfocado; es un inserto).
// Delante: realDelante(R, t, o) (el lateral del sofá con su gato, la barandilla del palco, el escritorio con la vela, el
// mostrador de la librería, el olivo y el murete de Creta, las vallas y la primera fila en la protesta): llama a
// realDelante después de los actores, con las mismas o. Devuelve { suelo, … } con las posiciones (ver cada encuadre).
export function real(R, t, o = {}) {
  const f = { salon: r_salon, creta: r_creta, circo: r_circo, biblioteca: r_biblioteca, bosque: r_bosque, protesta: r_protesta, libreria: r_libreria }[o.encuadre ?? 'salon'] ?? r_salon;
  R.recorte(null);
  const g = f(R, t, o);
  R.recorte(null);
  return g;
}
export function realDelante(R, t, o = {}) {
  const f = { salon: r_salonD, creta: r_cretaD, circo: r_circoD, biblioteca: r_bibliotecaD, bosque: r_bosqueD, protesta: r_protestaD, libreria: r_libreriaD }[o.encuadre ?? 'salon'];
  if (!f) return;
  R.recorte(null); f(R, t, o); R.recorte(null);
}
// ── F · Hoy ──────────────────────────────────────────────────────────────────────────────────────────────────────────
// Dos sitios de hoy, con dos cámaras cada uno. o.encuadre:
//   'cine' (por omisión): una sala de cine de noche. o.camara:
//     'general': desde el fondo de la sala, mirando a la pantalla: techo con lucecitas, paredes acolchadas en perspectiva
//       con apliques y la salida (pictograma verde), el telón rojo con bambalina y flecos de oro a los lados de la pantalla,
//       el escenario de tablas con su tira de luces, el pasillo de la izquierda con las luces de los peldaños, el haz del
//       proyector con motas, y cuatro filas de butacas rojas con el público de espaldas (filo de luz de la pantalla en las
//       cabezas; uno come palomitas, una pareja se arrima, alguien mira el móvil, uno llega tarde agachado, el acomodador
//       baja por el pasillo con su linterna). La fila de delante (la más cercana) va en hoyDelante y deja libres dos
//       butacas en el centro para Atom y el pan. o.pantalla: función (R, t, [x0, y0, x1, y1]) que pinta dentro (recortada),
//       'nieve' (ruido de proyector con la cuenta atrás en círculo), o nada (una película tranquila: montes, bosque y un
//       pájaro al amanecer, en travelling). o.luzPantalla: el color (hex) de la luz que la pantalla echa en las cabezas
//       (por omisión va y viene entre frío y cálido). o.luz 'apagada' (por omisión) o 'encendida' (se acabó la película:
//       luces de sala encendidas, pantalla en blanco, la sala casi vacía con tres que se levantan y se van, palomitas por
//       el suelo y el acomodador que barre).
//     'butacas': el contraplano, desde la pantalla y un poco de lado: dos butacas grandes de cara (para el pan a o.s 2 y
//       Atom), con los reposabrazos, un cubo de palomitas de rayas y un vaso con pajita; a los lados una butaca con una
//       chaqueta y otra con un bolso; detrás, tres gradas que suben con el público de cara iluminado por la pantalla (se
//       ríen, parpadean, uno come, otro con el móvil), la cabina del proyector con su ventanuco y el haz que viene hacia
//       nosotros con motas, y la luz de la pantalla que parpadea en todo. Los respaldos de la fila de delante (y la cabeza de
//       un espectador) van en hoyDelante: tapan del cojín para abajo, y detrás de ellos se esconde el pan.
//   'cuarto': el cuarto de una fan. o.camara:
//     'general': pared de papel pintado con la luz de la ventana (tarde) o de la lámpara (noche), la ventana con la ciudad
//       (cielo tramado con nubes de tres tonos, sol o luna, edificios con ventanas que se encienden, pájaros o un avión;
//       recortado al hueco), cortinas que se mecen, el radiador y un gato que duerme en el alféizar; un póster de un
//       sinsajo dorado y otro de una llama (sin letras: solo barras); la estantería con los cinco libros sin letras
//       (o.orden: el orden de los cinco, por omisión [0, 1, 2, 3, 4]; o.falta: el que no está porque lo lleva alguien, que
//       la escena pinta con libroJH), las cajas de las películas, un sinsajo de juguete y cestas; el corcho pequeño
//       (o.pistas 0–3 y o.hilo 0–1, como en 'corcho'); la tira de la línea de tiempo bajo el corcho (o.linea 0–4: cuántas
//       marcas se ven de 10, 50, 74, 75); el mapa de los doce distritos con chinchetas (o.mapa 0–12: cuántas se clavan; la
//       parte decimal hace caer la siguiente; la 12 es roja y brilla); el reloj de pared (o.hora, por omisión 17 de tarde y
//       22 de noche); la tele en su mueble (o.tele: función (R, t, [x0, y0, x1, y1]) que pinta dentro, recortada, o un
//       número 1–3: la portada sin letras de la película 1 (un sinsajo), 2 (una llama) o 3 (una serpiente y un pájaro);
//       por omisión, un paisaje); el sofá con cojines y una manta de punto, una lámpara de pie y el suelo de tarima con una
//       alfombra. La mesita baja con el bol de palomitas, el mando y la taza que humea va en hoyDelante.
//       o.luz 'tarde' (por omisión) o 'noche'.
//     'corcho': el corcho de cerca, sobre un escritorio: tres pistas con su chincheta (o.pistas 0–3: cuántas se
//       encienden, con un halo que late): 1 una foto con el broche dorado, 2 dos carnés con el mismo apellido (rayas, sin
//       letras; o.carnes 0–1: el segundo llega desde la derecha y se pone junto al primero), 3 una tarjeta con una flecha;
//       debajo de cada una, una nota con «?» que se enciende con su pista; el hilo rojo que va de chincheta en chincheta
//       (o.hilo 0–1), una hoja de calendario con 11 y 20, recortes con barras, una foto de montes, una entrada de cine;
//       abajo, la tira de la línea de tiempo (o.linea 0–4). En la mesa: la caja de chinchetas, el carrete de hilo rojo,
//       las tijeras, un bote de lápices y el móvil, que se enciende de vez en cuando. o.luz como en 'general'.
// Delante: hoyDelante(R, t, o) (los respaldos de la fila de delante en el cine; la mesita en el cuarto): llama a
// hoyDelante después de los actores, con las mismas opciones. Devuelve { suelo, pantalla, asientos, … } (las cuentas de
// cada encuadre, en la geometría de la entrega). Pieza exportada: libroJH(R, x, y, k) (uno de los cinco libros, para llevarlo en la
// mano o pintarlo fuera de la estantería).
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'cine', cam = o.camara ?? 'general';
  if (enc === 'cuarto') return cam === 'corcho' ? y_corcho(R, t, o) : y_cuarto(R, t, o);
  return cam === 'butacas' ? y_butacas(R, t, o) : y_cine(R, t, o);
}
// Lo que va por delante de los actores en hoy: la fila de butacas de delante (cine) o la mesita baja (cuarto).
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'cine', cam = o.camara ?? 'general';
  if (enc === 'cuarto') { if (cam !== 'corcho') y_mesita(R, t, o); return; }
  if (cam === 'butacas') y_filaDelanteB(R, t, o); else y_filaDelanteG(R, t, o);
}
// ── Pieza del hilo de gags ───────────────────────────────────────────────────────────────────────────────────────────
// El pan con ojos: el PIEZAS_JH.pan del reparto aprobado (13 × 10 px a o.s 1: corteza dorada con sus cortes, miga,
// contorno, ojos y coloretes; su diseño no se toca) con bracitos de palo y manoplas de miga, patitas con sus pies, y vida:
// respira (se estira un píxel), parpadea y de vez en cuando suelta una miga que cae al suelo. Pie en (x, y); a o.s 2, el
// doble, píxel a píxel (unos 16 × 14 px a o.s 1 con los bracitos y los pies). o.dir 1/−1.
// o.expresion: 'normal' | 'susto' (ojos enormes, tiembla, gota de sudor: cada vez que oye «cosecha») | 'estornudo' (cierra
// los ojos, coge aire y estornuda una nube de harina que se deshace; cada 2,2 s) | 'risa' (ojos de arco, boca abierta,
// bota) | 'llora' (boca triste, lagrimones que caen).
// o.lleno (0–1, 1): cuánto pan le queda: se ve un mordisco de borde ondulado, con la miga y el contorno, que avanza desde
// el lado de o.dir (a 0,5 le falta medio pan, ojo incluido). o.esconde (0–1): se agacha (se aplasta) y se tapa los ojos
// con los bracitos. o.nada: nada a braza entre papeletas (bracitos en círculo, se mece, salpica papelitos). o.señala
// [x, y]: estira el bracito hacia ese punto. o.saluda: levanta el bracito y lo agita. o.anda: pasitos y balanceo (la
// escena mueve la x). o.migas false: sin migas que caen. Devuelve { x, y, cabeza, mano, ojos } (cabeza: arriba en el
// centro; mano: la manopla del bracito que trabaja, o la de delante; ojos: entre los dos ojos).
export function pan(R, x, y, t, o = {}) {
  const s = Math.max(1, Math.round(o.s ?? 1)), dir = (o.dir ?? 1) < 0 ? -1 : 1, ex = o.expresion ?? 'normal';
  const lleno = y_cl(o.lleno ?? 1), esc = y_cl(o.esconde ?? 0);
  x = Math.round(x); y = Math.round(y);
  // el movimiento del cuerpo: temblor, botes, pasitos, el meneo de nadar y el respingo del estornudo
  const fs = (t % 2.2) / 2.2, coge = ex === 'estornudo' && fs > 0.35 && fs < 0.62, suelta = ex === 'estornudo' && fs >= 0.62 && fs < 0.78;
  let dx = 0, dy = 0;
  if (ex === 'susto') dx = (Math.floor(t * 28) % 2 ? 1 : -1) * Math.max(1, s >> 1);
  if (ex === 'risa') dy = -Math.round(Math.abs(Math.sin(t * 9)) * 2 * s);
  if (o.anda) dy = -(Math.floor(t * 6) % 2) * s;
  if (o.nada) { dy = Math.round(Math.sin(t * 3) * s); dx = Math.round(Math.sin(t * 1.5) * s); }
  if (suelta) dx = -dir * s;
  const resp = (!o.nada && esc < 0.3 && Math.sin(t * 2.4 + x * 0.3) > 0.55) || coge ? 1 : 0;
  // el pan en un búfer aparte (para poder aplastarlo, estirarlo y morderlo sin tocar su diseño)
  const cara = ex === 'susto' ? 'susto' : suelta ? 'estornudo' : ex === 'risa' ? 'feliz' : 'normal';
  const b = y_bufPan(R), prev = R.usar(b), CX = 160, CY = 120, W = 13, HH = 10;
  R.rect(CX - 20 * s, CY - 12 * s, CX + 20 * s, CY + s, Y_VACIO);
  PIEZAS_JH.pan(R, CX, CY, { s, dir, cara, t: ex === 'normal' ? t : 0.5 });
  const X0 = Math.round(CX - W * s / 2), Y0 = CY - HH * s;
  const px = (i, j, c) => { const ii = dir > 0 ? i : W - 1 - i; R.rect(X0 + ii * s, Y0 + j * s, X0 + ii * s + s - 1, Y0 + j * s + s - 1, c); };
  const MIGA = hex('#f4cc80'), K = hex('#1c1222'), AGUA = hex('#8ad0ff');
  if (ex === 'risa') for (const e of [4, 8]) { px(e, 4, MIGA); px(e, 5, MIGA); px(e - 1, 5, K); px(e, 4, K); px(e + 1, 5, K); px(6, 7, hex('#7a2026')); px(5, 6, K); px(7, 6, K); px(6, 8, K); }
  if (ex === 'llora') { px(6, 7, MIGA); px(5, 8, K); px(6, 7, K); px(7, 8, K); const f = Math.floor(t * 6) % 3; for (const e of [3, 9]) { px(e, 6, AGUA); px(e, 6 + f, AGUA); } }
  if (coge) for (const e of [4, 8]) { px(e, 4, MIGA); px(e - 1, 5, K); px(e, 5, K); px(e + 1, 5, K); }   // ojos apretados, coge aire
  if (esc > 0.55) for (const e of [4, 8]) { px(e, 4, MIGA); px(e, 5, K); }
  R.usar(prev);
  // la copia a la pantalla: aplastado al esconderse, estirado al respirar, mordido según o.lleno
  const Hs = HH * s, Hd = Math.max(4, Math.round(Hs * (1 - 0.38 * esc)) + resp * s), pie = 2 * s, base = y - pie - dy;
  const corte = W * lleno, ondas = (j) => corte - 0.9 + Math.sin(j * 1.7 + 0.5) * 0.9;
  for (let rt = 0; rt < Hd; rt++) {
    const jy = Math.min(Hs - 1, Math.floor(rt * Hs / Hd)), filaG = jy / s, r = Hd - 1 - rt;
    for (let sx = -18 * s; sx <= 18 * s; sx++) {
      const c = b[(Y0 + jy) * 320 + CX + sx]; if (c === Y_VACIO || c === 0) continue;
      const gi = (sx - (X0 - CX)) / s, dentro = gi >= 0 && gi < W;
      let col = c;
      if (dentro && lleno < 1) { const g = dir > 0 ? gi : W - gi, e = ondas(Math.floor(filaG)); if (g > e + 1) continue; if (g > e) col = K; else if (g > e - 1.2 && c !== K) col = MIGA; }
      R.pset(x + sx + dx, base - r, col);
    }
  }
  const top = base - Hd, hw = Math.round(W * s / 2), lado = (d) => d === dir ? Math.min(hw, Math.round((lleno * W - W / 2) * s)) : hw;
  // las patitas y los pies (alternan al andar)
  for (const d of [-1, 1]) { const fx = x + dx + d * 3 * s, up = o.anda && (Math.floor(t * 6) % 2 === (d > 0 ? 1 : 0)) ? s : 0;
    R.rect(fx, base, fx + s - 1, y - s - up, K); R.rect(fx - s, y - s - up, fx + 2 * s - 1 + (d === dir ? s : 0), y - 1 - up, K); if (s > 1) R.rect(fx, y - s - up + 1, fx + s, y - 2 - up, hex('#9a5a24')); }
  // los bracitos de palo con sus manoplas
  const hombro = (d) => [x + dx + d * (lado(d) + (d > 0 ? 0 : 0)), Math.round(base - Hd * 0.42)];
  const manoplas = [];
  const brazo = (d, hx, hy) => { const [sx0, sy0] = hombro(d); for (let k = 0; k < s; k++) R.linea(sx0, sy0 + k, hx, hy + k, K); const m = Math.max(1, s); R.rect(hx - m, hy - m, hx + m, hy + m, K); R.rect(hx - m + 1, hy - m + 1, hx + m - 1 + (s === 1 ? 1 : 0), hy + m - 1 + (s === 1 ? 1 : 0), MIGA); if (s === 1) { R.pset(hx, hy, MIGA); } manoplas.push([hx, hy]); return [hx, hy]; };
  const ojosY = top + Math.round(Hd * 0.45);
  let mano = null;
  for (const d of [-1, 1]) {
    const [sx0, sy0] = hombro(d), del = d === dir;
    let hx = sx0 + d * 3 * s, hy = sy0 + 3 * s + Math.round(Math.sin(t * 2.4 + d) * 0.4 * s);   // colgando, con el vaivén
    if (o.anda) hy += (Math.floor(t * 6) % 2 === (d > 0 ? 0 : 1)) ? -s : 0;
    if (ex === 'susto') { hx = sx0 + d * 4 * s; hy = sy0 - 2 * s; }
    if (ex === 'risa') { hx = sx0 + d * 3 * s; hy = sy0 + s; }
    if (o.nada) { const a = t * 4 + (d > 0 ? 0 : Math.PI); hx = sx0 + d * Math.round((3 + 2 * Math.cos(a)) * s); hy = sy0 + Math.round(Math.sin(a) * 2 * s); }
    if (o.saluda && del) { const a = -Math.PI / 2 + d * (0.5 + Math.sin(t * 10) * 0.35); hx = sx0 + Math.round(Math.cos(a) * 6 * s); hy = sy0 + Math.round(Math.sin(a) * 6 * s); }
    if (o.señala) { const [tx, ty] = o.señala, d2 = tx >= x ? 1 : -1; if (d === d2) { const L = Math.hypot(tx - sx0, ty - sy0) || 1; hx = sx0 + Math.round((tx - sx0) / L * 7 * s); hy = sy0 + Math.round((ty - sy0) / L * 7 * s); } }
    if (suelta) hy = sy0 - s;
    if (esc > 0) { const ox = x + dx + d * 2 * s, oy = ojosY; hx = Math.round(hx + (ox - hx) * esc); hy = Math.round(hy + (oy - hy) * esc); }
    const m = brazo(d, hx, hy);
    if (del || (o.señala && d === ((o.señala[0] >= x) ? 1 : -1))) mano = m;
    if (o.saluda && del) mano = m;
  }
  if (o.señala) mano = manoplas[(o.señala[0] >= x) ? 1 : 0];
  // la gota de sudor del susto, los lagrimones que caen, la nube de harina del estornudo, los papelitos al nadar
  if (ex === 'susto') { const u = (t * 0.8) % 1, gx = x + dx - dir * (hw + s), gy = top - s + Math.round(u * 4 * s); R.disco(gx, gy, 1.4 * s, K); R.disco(gx, gy, 1.4 * s - 0.6, AGUA); R.pset(gx, gy - Math.ceil(1.6 * s), K); R.pset(gx - (s > 1 ? 1 : 0), gy - 1, hex('#ffffff')); }
  if (ex === 'llora') for (const d of [-1, 1]) { const u = ((t * 1.6 + (d > 0 ? 0.5 : 0)) % 1), gx = x + dx + d * (hw + s), gy = Math.round(ojosY + u * (y - ojosY)); if (u < 0.95) { R.pset(gx, gy, AGUA); if (s > 1) R.pset(gx, gy + 1, AGUA); } }
  if (ex === 'estornudo' && fs >= 0.62) { const u = (fs - 0.62) / 0.38; for (let k = 0; k < 7; k++) { const a = (k / 6 - 0.5) * 1.4, r = (3 + u * 12) * s * (0.6 + h(k, 1, 440) * 0.5), cx = x + dir * (hw + s) + Math.round(dir * Math.cos(a) * r), cy = ojosY + 2 * s + Math.round(Math.sin(a) * r * 0.7 - u * 3 * s), rr = (1.6 + u * 2.4 - (u > 0.7 ? (u - 0.7) * 8 : 0)) * s;
    if (rr > 0.5) for (let j = Math.floor(-rr); j <= rr; j++) for (let i = Math.floor(-rr); i <= rr; i++) if (i * i + j * j <= rr * rr && y_b4(cx + i, cy + j) < 1 - u * 0.75) R.pset(cx + i, cy + j, (i + j) & 1 ? hex('#ffffff') : hex('#f0e8dc')); } }
  if (o.nada) for (let k = 0; k < 3; k++) { const u = ((t * 1.3 + k / 3) % 1), gx = x + Math.round((k - 1) * 6 * s + Math.sin(t * 4 + k) * 2 * s), gy = base - Hd * 0.4 - Math.round(Math.sin(u * Math.PI) * 6 * s); R.rect(gx, Math.round(gy), gx + s, Math.round(gy) + Math.max(0, s - 1), k % 2 ? hex('#f6f2e6') : hex('#e8e0c8')); }
  // las migas que se le caen de vez en cuando (y se quedan un rato en el suelo)
  if (o.migas !== false && !o.nada) for (let k = 0; k < 2; k++) { const per = 3.7 + k * 1.3, u = ((t + k * 1.9 + x * 0.07) % per) / per;
    if (u < 0.55) { const f = u / 0.55, mx = x + Math.round((k ? 1 : -1) * (hw - s) + (k ? 1 : -1) * f * 3 * s), my = Math.round(base - Hd * 0.3 + f * f * (y - (base - Hd * 0.3))); R.rect(mx, Math.min(y - 1, my), mx + Math.max(0, s - 1), Math.min(y - 1, my) + Math.max(0, s - 1), k ? hex('#d8943a') : MIGA); } }
  return { x, y, cabeza: [x + dx, top], mano: mano ?? manoplas[dir > 0 ? 1 : 0], ojos: [x + dx, ojosY] };
}
// la trama ordenada 4 × 4 (Bayer) de los degradados y los colores por componentes (ABGR, como hex())
const p_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const p_um = (x, y) => p_BAYER[(y & 3) * 4 + (x & 3)];

const p_cl = (v) => Math.max(0, Math.min(255, Math.round(v)));

const p_de = (r, g, b) => ((255 << 24) | (p_cl(b) << 16) | (p_cl(g) << 8) | p_cl(r)) >>> 0;

// mezcla de dos colores (k = 0: a; k = 1: b)
function p_mez(a, b, k) { return p_de((a & 255) * (1 - k) + (b & 255) * k, ((a >>> 8) & 255) * (1 - k) + ((b >>> 8) & 255) * k, ((a >>> 16) & 255) * (1 - k) + ((b >>> 16) & 255) * k); }

// las zonas tranquilas (barra del año y Atom): ni humo, ni nubes, ni pájaros
const p_calma = (x, y) => (y < 17 && x < 176) || (x > 271 && y < 49);

// el tinte de cada luz sobre un color (r, g, b) → (r, g, b)
const p_LUZ = {
  amanecer: (r, g, b) => [r * 0.8 + 34, g * 0.74 + 22, b * 0.78 + 34],
  dia: (r, g, b) => [r, g, b],
  tarde: (r, g, b) => [r * 0.84 + 58, g * 0.74 + 26, b * 0.6 + 8],
  noche: (r, g, b) => [r * 0.3 + 12, g * 0.34 + 18, b * 0.5 + 42],
};

const p_TN = new Map();

// la función que tiñe un color con la luz (memorizada): lo que se pinta cada fotograma pasa por ella
function p_tinte(luz) {
  let m = p_TN.get(luz);
  if (!m) { const f = p_LUZ[luz], cache = new Map(); m = (c) => { let v = cache.get(c); if (v === undefined) { const [r, g, b] = f(c & 255, (c >>> 8) & 255, (c >>> 16) & 255); v = p_de(r, g, b); cache.set(c, v); } return v; }; p_TN.set(luz, m); }
  return m;
}

const p_h = (s) => s.split(' ').map(hex);

// los cielos: degradado (de arriba al horizonte), nubes [sombra, cuerpo, luz], sol y su halo
const p_CIE = {
  amanecer: { g: p_h('#4a5480 #74769e #a68aa8 #d6a2a2 #f2c49e'), n: p_h('#8a7898 #c8a0b0 #f4d0c4'), sol: hex('#fff2cc'), halo: hex('#f8d6a6') },
  dia: { g: p_h('#6486b4 #80a0c6 #9cb6d2 #b8c8d8 #ccd6dc'), n: p_h('#9eaabe #d0d8e2 #f6f8fa'), sol: hex('#fffbe8'), halo: hex('#e6eef2') },
  tarde: { g: p_h('#3c3c7a #764e92 #c4687e #ee905e #fac46c'), n: p_h('#7a4a72 #d6827a #fac690'), sol: hex('#fff2b0'), halo: hex('#ffd68a') },
  noche: { g: p_h('#0a0e2c #121840 #1a224e #242c58 #303662'), n: p_h('#1e2650 #2c3462 #444c7a'), sol: hex('#f4f0dc'), halo: hex('#3a4270') },
};

const p_CACHE = new WeakMap();

// el fondo fijo de un encuadre: se pinta una vez en un búfer propio (cielo, decorado, tinte de la luz y, sin teñir, las
// luces); guarda también la máscara del cielo (donde pueden ir nubes y pájaros). cielo: { hor, sol, estratos } o null
function p_fijo(R, clave, luz, cielo, dibuja) {
  let m = p_CACHE.get(R); if (!m) p_CACHE.set(R, (m = new Map()));
  let F = m.get(clave); if (F) return F;
  const b = R.nuevo(), prev = R.usar(b), B = R.buf, luces = [], esCielo = new Uint8Array(57600), mask = new Uint8Array(57600);
  let foto = null;
  if (cielo) { p_cieloFijo(R, luz, cielo); foto = B.slice(); }
  const dat = dibuja(luces) ?? {};
  const tn = p_LUZ[luz];
  for (let i = 0; i < 57600; i++) {
    if (foto && B[i] === foto[i] && (i / 320 | 0) < cielo.hor) { esCielo[i] = 1; if (!p_calma(i % 320, i / 320 | 0)) mask[i] = 1; continue; }
    if (luz === 'dia') continue; const c = B[i], [r, g, bb] = tn(c & 255, (c >>> 8) & 255, (c >>> 16) & 255); B[i] = p_de(r, g, bb);
  }
  for (const f of luces) f(luz === 'noche', luz === 'amanecer');
  R.usar(prev);
  F = { b, mask, esCielo, cielo, dat }; m.set(clave, F);
  return F;
}

// el cielo fijo: degradado tramado, estratos finos, el sol (o la luna) con su halo tramado y, de noche, las estrellas
function p_cieloFijo(R, luz, o) {
  const P = p_CIE[luz], g = P.g, B = R.buf, n = g.length - 1, hor = o.hor;
  for (let y = 0; y < hor; y++) { const u = Math.min(0.999, y / hor) * n, i = Math.floor(u), f = u - i; for (let x = 0; x < 320; x++) B[y * 320 + x] = f > p_um(x, y) ? g[i + 1] : g[i]; }
  if (luz === 'noche') for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 1, 900) * 320), y = Math.floor(h(k, 2, 900) * hor * 0.85); if (!p_calma(x, y)) B[y * 320 + x] = k % 5 ? hex('#8a90b8') : hex('#e8ecff'); }
  else for (const [x0, yy, w] of o.estratos ?? [[20, 0.5, 96], [176, 0.62, 80], [96, 0.8, 130], [250, 0.86, 70]]) { const y = Math.round(yy * hor);
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), e = 1 - Math.abs(i / w * 2 - 1); if (x < 0 || x > 319 || p_calma(x, y)) continue;
      if (e * 1.4 > p_um(x, y)) B[y * 320 + x] = P.n[2]; if (e > p_um(x, y + 1) + 0.3) B[(y + 1) * 320 + x] = P.n[1]; } }
  const s = o.sol; if (!s) return;
  const [sx, sy, sr] = s, rr = sr * (luz === 'noche' ? 2.2 : 3.6);
  for (let y = Math.max(0, Math.floor(sy - rr)); y < Math.min(hor, sy + rr); y++) for (let x = Math.max(0, Math.floor(sx - rr)); x < Math.min(320, sx + rr); x++) {
    const d = Math.hypot(x + 0.5 - sx, y + 0.5 - sy), i = y * 320 + x;
    if (d < sr) { B[i] = luz === 'noche' ? (h(x >> 1, y >> 1, 901) < 0.2 ? hex('#c8c4b0') : d > sr - 1.2 ? hex('#d8d4c0') : P.sol) : d > sr - 1.2 ? P.halo : P.sol; if (luz !== 'noche' && x - sx < -sr * 0.2 && y - sy < -sr * 0.2 && d < sr * 0.6) B[i] = hex('#ffffff'); }
    else { const q = (1 - (d - sr) / (rr - sr)); if (q * q * 0.9 > p_um(x, y)) B[i] = p_mez(B[i], P.halo, 0.5); }
  }
}

// las nubes (forma de cúmulo, de tres tonos, base plana), solo donde la máscara del cielo lo deja
const p_NUBE = [[0, 0, 0.3], [-0.3, 0.06, 0.21], [0.3, 0.05, 0.23], [-0.1, -0.13, 0.24], [0.15, -0.09, 0.2], [0.46, 0.1, 0.13], [-0.47, 0.1, 0.12]];

function p_nube(R, mask, cx, cy, w, [cS, c, cL]) {
  const B = R.buf, base = cy + w * 0.14;
  const capa = (dx0, dy0, f, col) => { for (const [dx, dy, r0] of p_NUBE) { const r = Math.max(1, r0 * w * f), x0 = cx + dx * w + dx0, y0 = cy + dy * w + dy0;
    for (let y = Math.floor(y0 - r); y <= y0 + r; y++) { if (y < 0 || y > 179 || y > base + dy0 * 0.3) continue; for (let x = Math.floor(x0 - r); x <= x0 + r; x++) { if (x < 0 || x > 319) continue; const i = y * 320 + x; if (mask[i] && (x + 0.5 - x0) ** 2 + (y + 0.5 - y0) ** 2 <= r * r) B[i] = col; } } } };
  capa(0, 1, 1, cS); capa(0, 0, 0.94, c); capa(-1, -1.5, 0.62, cL);
}

// pájaros lejanos en uve que aletean (solo en el cielo)
function p_pajaros(R, t, F, n, y, v, c, sem = 0) {
  const B = R.buf, ciclo = 420 / v + 6, u = (t + sem * 5.3) % ciclo, x0 = -40 + u * v;
  for (let k = 0; k < n; k++) { const x = Math.round(x0 - k * 9 - (k % 2) * 3), yy = Math.round(y + (k % 2 ? 4 : -1) * Math.ceil(k / 2) * 0.8 + Math.sin(t * 2 + k) * 1.5), a = Math.sin(t * 10 + k * 1.7) > 0;
    for (const [dx, dy] of [[0, 0], [-1, a ? -1 : 1], [1, a ? -1 : 1], [-2, a ? -2 : 1], [2, a ? -2 : 1]]) { const px = x + dx, py = yy + dy; if (px >= 0 && px < 320 && py >= 0 && py < 180 && F.mask[py * 320 + px]) B[py * 320 + px] = c; } }
}

// lo vivo del cielo: tres capas de nubes a tres velocidades, estrellas que titilan, pájaros
function p_cieloVivo(R, t, F, luz) {
  const P = p_CIE[luz], hor = F.cielo.hor, cs = luz === 'noche' ? P.n : P.n;
  const capas = [[0.9, 0.6, [[10, 0.28, 30], [130, 0.18, 24], [250, 0.34, 28]]], [2.2, 0.85, [[60, 0.46, 40], [200, 0.38, 34], [330, 0.5, 30]]], [4.2, 1, [[0, 0.66, 46], [170, 0.72, 52]]]];
  for (const [v, esc, lista] of capas) for (const [x0, yy, w] of lista) { const W = w * esc * (hor > 60 ? 1 : 0.8), x = ((x0 + t * v) % 440 + 440) % 440 - 60, y = Math.round(yy * hor);
    const tonos = esc < 0.7 ? [p_mez(cs[0], P.g[1], 0.4), p_mez(cs[1], P.g[1], 0.4), p_mez(cs[2], P.g[1], 0.35)] : cs; p_nube(R, F.mask, Math.round(x), y, W, tonos); }
  if (luz === 'noche') { const B = R.buf; for (let k = 0; k < 24; k++) { const x = Math.floor(h(k, 5, 902) * 320), y = Math.floor(h(k, 6, 902) * hor * 0.8), i = y * 320 + x; if (F.mask[i] && Math.sin(t * 3 + k * 2.1) > 0.3) B[i] = hex('#ffffff'); } }
  else p_pajaros(R, t, F, 5, Math.round(hor * 0.36), 22, luz === 'tarde' ? hex('#3a2440') : hex('#4a4a5e'), hor);
}

// humo que sube en bocanadas de tres tonos y se va con el viento (sin entrar en las zonas tranquilas)
function p_humo(R, x, y, t, tn, o = {}) {
  const B = R.buf, n = o.n ?? 6, alto = o.alto ?? 30, viento = o.viento ?? 14, r0 = o.r ?? 1.2, v = o.v ?? 0.16;
  const cols = (o.cols ?? [hex('#5a5a66'), hex('#8a8a96'), hex('#b4b4be')]).map(tn);
  for (let k = n - 1; k >= 0; k--) { const u = (t * v + k / n) % 1, cx = x + u * viento + Math.sin(u * 6 + k + t * 0.7) * 2, cy = y - u * alto, r = r0 + u * (o.crece ?? 4);
    for (const [dx, dy, f, c] of [[0.5, 0.8, 1, cols[0]], [0, 0, 0.92, cols[1]], [-0.6, -0.7, 0.55, cols[2]]]) { const rr = r * f;
      for (let yy = Math.floor(cy + dy - rr); yy <= cy + dy + rr; yy++) for (let xx = Math.floor(cx + dx - rr); xx <= cx + dx + rr; xx++) {
        if (xx < 0 || xx > 319 || yy < 0 || yy > 179 || p_calma(xx, yy)) continue; const d = (xx + 0.5 - cx - dx) ** 2 + (yy + 0.5 - cy - dy) ** 2; if (d > rr * rr) continue;
        if (u > 0.7 && p_um(xx, yy) < (u - 0.7) * 3.3) continue; B[yy * 320 + xx] = c; } } }
}

// un halo de luz cálida que se mezcla con lo que hay (faroles, la puerta abierta); a: fuerza
function p_halo(R, cx, cy, r, c, a) {
  const B = R.buf;
  for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) {
    const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r; if (d >= 1) continue; const k = a * (1 - d) * (1 - d); if (k > 0.03 + p_um(x, y) * 0.05) B[y * 320 + x] = p_mez(B[y * 320 + x], c, k); }
}

// montañas: perfil con ruido, luz en las laderas que miran a la izquierda, árboles en puntos y pinos en la cresta
function p_montes(R, base, amp, [cL, c, cS], sem, hasta, o = {}) {
  const B = R.buf, alt = (x) => base - amp * (0.5 + 0.3 * Math.sin(x * 0.019 + sem) + 0.14 * Math.sin(x * 0.051 + sem * 2.3) + 0.06 * Math.sin(x * 0.14 + sem * 3.1));
  for (let x = 0; x < 320; x++) { const top = Math.round(alt(x)), luz = alt(x + 2) - alt(x - 2) > 0;
    for (let y = Math.max(0, top); y <= hasta; y++) { let col = y === top ? (luz ? cL : c) : luz && (y - top) < 6 && p_um(x, y) < 0.5 ? cL : c;
      if (o.arboles && h(x, y, sem) < 0.16) col = cS; else if (o.arboles && h(x, y, sem + 1) < 0.06) col = cL; if (!luz && (y - top) > 2 && p_um(x, y) < 0.3) col = cS;
      B[y * 320 + x] = col; }
    if (o.pinos && h(x, 0, sem + 2) < 0.22) { const a = 2 + Math.floor(h(x, 1, sem) * 4); for (let j = 0; j < a; j++) { const y = top - j; if (y >= 0) B[y * 320 + x] = cS; if (j < a - 1 && j % 2 === 0 && y >= 0) { if (x > 0) B[y * 320 + x - 1] = cS; if (x < 319) B[y * 320 + x + 1] = cS; } } } }
  return alt;
}

// tablas de madera gastada con vetas, nudos, clavos, juntas y la mugre de abajo; o.horiz: tablas tumbadas; o.ancho
function p_tablas(R, x0, y0, x1, y1, [cL, c, cS, cJ], sem = 0, o = {}) {
  const B = R.buf, an = o.ancho ?? 6, hz = !!o.horiz, tonos = [c, p_mez(c, cL, 0.3), p_mez(c, cS, 0.28), p_mez(c, cL, 0.12), p_mez(c, cS, 0.12)];
  const veta = p_mez(c, cS, 0.55), clavo = hex('#9a9aa2'), mugre = o.mugre ?? 5;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const u = hz ? y - y0 : x - x0, v = hz ? x : y, k = Math.floor(u / an), r = u - k * an, tono = Math.floor(h(k, 3, sem) * 5);
    let col = tonos[tono];
    const corte = Math.floor(h(k, 9, sem) * 60) + (hz ? x0 : y0);
    if (r === an - 1 || v === corte) col = cJ; else if (r === 0) col = p_mez(tonos[tono], cL, 0.4);
    else if (h(k * 7 + r, Math.floor(v / (hz ? 7 : 5)), sem) < 0.17) col = veta;
    else if (h(k, Math.floor(v / 16), sem + 1) < 0.1 && r === (an >> 1) && v % 16 > 6 && v % 16 < 10) col = cS;
    if ((v - (hz ? x0 : y0)) % 22 === 3 && r === 1 && h(k, 5, sem) < 0.7) col = clavo;
    if (!hz && y1 - y < mugre && p_um(x, y) < (mugre - (y1 - y)) / mugre) col = cS;
    if (h(x, y, sem + 4) < 0.025) col = cS;
    B[y * 320 + x] = col;
  }
}

// chapa ondulada con óxido (para poligono: devuelve el color de (x, y)); cols [luz, base, sombra, óxido, óxido oscuro]
const p_chapa = ([cL, c, cS, ox, oxS], sem = 0) => (x, y) => {
  if ((y + Math.floor(x / 22) * 4) % 10 === 0) return cS;
  if (h(x >> 3, y >> 2, sem) < 0.26 && h(x, y, sem) < 0.8) return h(x >> 1, y, sem + 1) < 0.5 ? ox : oxS;
  const m = x % 3; return m === 0 ? cL : m === 2 ? cS : c;
};

// sillares de piedra con juntas, luz arriba a la izquierda, sombra abajo, motas y (o.hollin) el hollín que chorrea
function p_piedra(R, x0, y0, x1, y1, [cL, c, cS, cJ], bw, bh, sem = 0, o = {}) {
  const B = R.buf, tonos = [c, p_mez(c, cL, 0.22), p_mez(c, cS, 0.22), p_mez(c, cL, 0.1)], holl = o.hollin ? p_mez(c, hex('#2a2a30'), 0.45) : 0;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const fila = Math.floor((y - y0) / bh), off = fila % 2 ? bw >> 1 : 0, col = Math.floor((x - x0 + off) / bw), ry = (y - y0) % bh, rx = (x - x0 + off) % bw;
    let k = tonos[Math.floor(h(col, fila, sem) * 4)];
    if (ry === bh - 1 || rx === bw - 1) k = cJ; else if (ry === 0 || rx === 0) k = p_mez(k, cL, 0.45); else if (ry === bh - 2 || rx === bw - 2) k = p_mez(k, cS, 0.35);
    if (h(x, y, sem + 2) < 0.06) k = cS;
    if (holl && h(x >> 1, 7, sem) < 0.3 && (y - y0) < 4 + h(x >> 1, 8, sem) * (y1 - y0) * 0.8 && p_um(x, y) < 0.6) k = p_mez(k, holl, 0.6);
    B[y * 320 + x] = k;
  }
}

// suelo de tierra y polvo de carbón: o.cols [luz, base, sombra, carbón]; motas, piedrecitas y briznas
function p_tierra(R, x0, y0, x1, y1, [cL, c, cS, cK], sem = 0, o = {}) {
  const B = R.buf, hierba = o.hierba;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const q = h(x, y, sem), g = h(x >> 3, y >> 2, sem + 1);
    let k = g < 0.3 ? p_mez(c, cS, 0.35) : g > 0.8 ? p_mez(c, cL, 0.3) : c;
    if (q < 0.07) k = cS; else if (q < 0.1) k = cK; else if (q > 0.96) k = cL;
    if (hierba && h(x >> 1, y >> 1, sem + 3) < hierba) k = h(x, y, sem + 5) < 0.5 ? hierba === 1 ? k : hex('#6a7a4a') : hex('#4a5a34');
    B[y * 320 + x] = k;
  }
  for (let k = 0; k < (x1 - x0) * (y1 - y0) / 140; k++) { const x = Math.floor(x0 + h(k, 1, sem + 7) * (x1 - x0)), y = Math.floor(y0 + h(k, 2, sem + 7) * (y1 - y0)); R.rect(x, y, x + 1, y, cS); R.pset(x, y - 1, cL); }
}

// adoquines en perspectiva (más grandes cuanto más cerca), con juntas, desgaste y polvo de carbón
function p_adoquines(R, y0, y1, [cL, c, cS, cJ], sem = 0) {
  const B = R.buf; let y = y0, fila = 0;
  while (y <= y1) { const alto = Math.max(2, Math.round(2 + (y - y0) * 0.09)), ancho = Math.round(alto * 2.1), off = fila % 2 ? ancho >> 1 : 0;
    for (let j = 0; j < alto && y + j <= y1; j++) for (let x = 0; x < 320; x++) {
      const i = Math.floor((x + off + 1000) / ancho), rx = (x + off + 1000) % ancho, yy = y + j; let k;
      if (j === alto - 1 || rx === ancho - 1) k = cJ; else { const tono = h(i, fila, sem); k = tono < 0.3 ? p_mez(c, cS, 0.3) : tono > 0.75 ? p_mez(c, cL, 0.3) : c; if (j === 0 && rx < ancho - 2) k = p_mez(k, cL, 0.45); else if (j === alto - 2 && alto > 3) k = p_mez(k, cS, 0.3); }
      if (h(x, yy, sem + 3) < 0.04) k = cS; if (h(x >> 2, yy >> 1, sem + 4) < 0.08) k = p_mez(k, hex('#2a2a30'), 0.4);
      B[yy * 320 + x] = k; }
    y += alto; fila++; }
}

// una casa de mineros: tablas, tejado de chapa a dos aguas, ventana (o cegada con tablas), puerta, porche con su
// tejadillo, estufa de tubo; o.abierta: la puerta abierta con luz cálida (en luces); o.noche: ventanas encendidas.
// x, suelo: esquina de abajo a la izquierda; devuelve { puerta: [x0, x1, y0], chimenea: [x, y] }
function p_casa(R, x, suelo, w, alto, sem, o, luces) {
  const { rect, pset, poligono } = R, P = o.nueva ? p_MADN : p_MAD[sem % p_MAD.length], top = suelo - alto, pico = top - Math.round(w * (o.plano ? 0.12 : 0.3));
  // el tejado (detrás) con su alero y el tubo de la estufa
  const tub = x + Math.round(w * 0.72), chim = [tub + 1, pico + Math.round((tub - x) < w / 2 ? 0 : (tub - x - w / 2) * 0.6) - 6];
  rect(tub, chim[1], tub + 2, top, hex('#3a3a42')); rect(tub, chim[1], tub, top, hex('#6a6a74')); rect(tub - 1, chim[1] - 1, tub + 3, chim[1], hex('#2a2a30'));
  poligono(o.plano ? [[x - 3, top + 1], [x - 3, pico], [x + w + 3, top - 2], [x + w + 3, top + 1]] : [[x - 4, top + 1], [x + w / 2, pico], [x + w + 4, top + 1]], p_chapa(p_CHAPA, sem));
  R.linea(x - 4, top + 1, x + w + 4, top + 1, hex('#3a3a42')); if (!o.plano) { R.linea(x - 4, top + 1, Math.round(x + w / 2), pico, hex('#a8acb4')); }
  p_tablas(R, x, top + 2, x + w, suelo - 1, P, sem, { ancho: 5 + (sem % 2) });
  rect(x, top + 2, x + w, top + 3, P[3]);
  // ventana: marco, cristal con el cielo reflejado, cortina remendada o tablas en cruz
  const vx = x + 4, vy = top + 7, vw = Math.min(12, Math.round(w * 0.26)), vh = Math.min(10, alto - 16);
  if (vh > 4) { rect(vx - 1, vy - 1, vx + vw + 1, vy + vh + 1, P[0]); rect(vx, vy, vx + vw, vy + vh, hex('#2a2e3a'));
    for (let j = 0; j <= vh; j++) for (let i = 0; i <= vw; i++) if ((i + j) % 7 < 2 && j < vh * 0.6) pset(vx + i, vy + j, hex('#6a7890'));
    rect(vx + (vw >> 1), vy, vx + (vw >> 1), vy + vh, P[0]); rect(vx, vy + (vh >> 1), vx + vw, vy + (vh >> 1), P[0]);
    if (o.cegada) { R.linea(vx - 1, vy, vx + vw + 1, vy + vh, P[1]); R.linea(vx - 1, vy + vh, vx + vw + 1, vy, P[2]); }
    else { rect(vx + 1, vy + 1, vx + 2, vy + vh - 1, o.cortina ?? hex('#a89a7a')); pset(vx + 2, vy + 3, hex('#7a6a5a')); }
    rect(vx - 2, vy + vh + 2, vx + vw + 2, vy + vh + 2, P[3]);
    if (o.noche && h(sem, 3, 40) < 0.7) luces.push(() => { for (let j = 0; j <= vh; j++) for (let i = 0; i <= vw; i++) if (R.pget(vx + i, vy + j) !== R.pget(vx - 1, vy - 1)) pset(vx + i, vy + j, j < vh / 2 ? hex('#f8d888') : hex('#e8a850')); rect(vx + (vw >> 1), vy, vx + (vw >> 1), vy + vh, hex('#5a3a22')); }); }
  // puerta
  const px = x + w - Math.round(w * 0.36), pw = Math.max(7, Math.round(w * 0.2)), py = suelo - Math.min(alto - 4, 17);
  rect(px - 1, py - 1, px + pw + 1, suelo - 1, P[3]);
  if (o.abierta) luces.push(() => { for (let y = py; y < suelo - 1; y++) for (let xx = px; xx <= px + pw; xx++) pset(xx, y, y < py + 3 ? hex('#c87838') : (xx + y) % 5 ? hex('#f0b860') : hex('#e09848')); rect(px, py, px + 1, suelo - 2, hex('#5a3a22')); rect(px + 3, suelo - 6, px + pw - 1, suelo - 5, hex('#8a5a30')); pset(px + pw - 2, py + 5, hex('#fff2c0')); });
  else { p_tablas(R, px, py, px + pw, suelo - 2, [P[0], P[2], P[3], P[3]], sem + 5, { ancho: 3, mugre: 2 }); pset(px + pw - 2, py + 8, hex('#c8a040')); }
  // el porche: suelo de tablas, dos postes y su tejadillo
  if (o.porche) { const a = x - 2, b = x + w + 2, ty = py - 4;
    rect(a, suelo - 3, b, suelo - 1, P[2]); for (let i = a; i <= b; i += 4) pset(i, suelo - 2, P[3]); rect(a, suelo - 3, b, suelo - 3, P[0]);
    for (const q of [a + 1, b - 1]) { rect(q, ty, q + 1, suelo - 3, P[1]); pset(q, ty, P[0]); }
    poligono([[a - 2, ty + 1], [a - 2, ty - 2], [b + 2, ty - 3], [b + 2, ty + 1]], p_chapa(p_CHAPA, sem + 3)); R.linea(a - 2, ty + 1, b + 2, ty + 1, hex('#3a3a42')); }
  return { puerta: [px, px + pw, py], chimenea: chim, ventana: [vx, vy, vx + vw, vy + vh] };
}

// maderas de las casas [luz, base, sombra, junta]: grises de tabla gastada; y la madera nueva (o.antigua)
const p_MAD = [p_h('#9a9088 #7a7068 #5a524c #3a3430'), p_h('#8a8478 #6a6458 #4e4a40 #34302a'), p_h('#a09484 #7e7262 #5c5246 #3a332c'), p_h('#8c8a8e #6c6a70 #4e4c52 #2e2c32')];

const p_MADN = p_h('#d8b088 #b88c62 #8a6440 #5a4028');

const p_CHAPA = p_h('#a8acb4 #8a8e96 #62666e #9a5a32 #6a3a22');

// un rectángulo que se voltea con dir alrededor de x (para los animales)
const p_rx = (R, x, dir, a, b, y0, y1, c) => R.rect(dir > 0 ? x + a : x - b, y0, dir > 0 ? x + b : x - a, y1, c);

// una gallina (x, y: pies) que da pasitos de un lado a otro y picotea; col 0 blanca, 1 parda, 2 negra; rango en px
const p_GALL = [p_h('#f4f0e4 #c8c0b0 #ffffff'), p_h('#b8743a #7a4a22 #d8964e'), p_h('#3a3440 #22202a #5e566a')];

function p_gallina(R, x0, y, t, k, tn, col = k % 3, rango = 12) {
  const { pset } = R, ph = t * 0.32 + k * 1.7, x = Math.round(x0 + Math.sin(ph) * rango), dir = Math.cos(ph) >= 0 ? 1 : -1;
  const pica = Math.sin(t * 2.1 + k * 2) > 0.5, paso = Math.floor(t * 7 + k) % 2, [c, cS, cL] = p_GALL[col].map(tn), X = (i) => x + i * dir;
  R.rect(x - 3, y, x + 3, y, tn(hex('#3a342e')));                                               // sombra
  pset(X(-1), y - (paso ? 1 : 0), tn(C.naranja)); pset(X(1), y - (paso ? 0 : 1), tn(C.naranja)); pset(X(-1), y - 1, tn(C.naranjaS)); pset(X(1), y - 1, tn(C.naranjaS));
  p_rx(R, x, dir, -3, 2, y - 5, y - 2, c); p_rx(R, x, dir, -2, 1, y - 2, y - 2, cS); p_rx(R, x, dir, -2, 0, y - 4, y - 4, cS); pset(X(-1), y - 5, cL);
  p_rx(R, x, dir, -5, -4, y - 7, y - 4, c); pset(X(-5), y - 7, cS); pset(X(-4), y - 6, cL);   // la cola levantada
  if (pica) { p_rx(R, x, dir, 2, 3, y - 3, y - 1, c); pset(X(4), y - 1, tn(C.amarillo)); pset(X(3), y - 2, C.k); pset(X(2), y - 4, tn(C.rojo)); }
  else { p_rx(R, x, dir, 2, 3, y - 8, y - 5, c); pset(X(2), y - 9, tn(C.rojo)); pset(X(3), y - 9, tn(C.rojo)); pset(X(4), y - 7, tn(C.amarillo)); pset(X(3), y - 7, C.k); pset(X(3), y - 5, tn(C.rojo)); }
}

// un ganso blanco (x, y: pies) que pasea, mete el cuello y de vez en cuando estira el cuello y grazna (pico abierto)
function p_ganso(R, x0, y, t, k, tn, rango = 16) {
  const { pset } = R, ph = t * 0.22 + k * 2.3, x = Math.round(x0 + Math.sin(ph) * rango), dir = Math.cos(ph) >= 0 ? 1 : -1, X = (i) => x + i * dir;
  const ciclo = (t + k * 1.9) % 5, grazna = ciclo > 3.6 && ciclo < 4.4, pica = !grazna && Math.sin(t * 1.3 + k) > 0.6, paso = Math.floor(t * 4 + k) % 2;
  const c = tn(hex('#f6f4ee')), cS = tn(hex('#c8c6c0')), cL = tn(C.blanco), na = tn(hex('#f08a2a')), naS = tn(hex('#c0601a'));
  R.rect(x - 5, y, x + 5, y, tn(hex('#3a3a32')));
  pset(X(-1), y - (paso ? 1 : 0), na); pset(X(1), y - (paso ? 0 : 1), na); pset(X(-2), y, na); pset(X(2), y, na);
  p_rx(R, x, dir, -5, 3, y - 6, y - 2, c); p_rx(R, x, dir, -6, -5, y - 6, y - 4, c); pset(X(-7), y - 6, cS); p_rx(R, x, dir, -4, 2, y - 2, y - 2, cS); p_rx(R, x, dir, -4, 1, y - 4, y - 4, cS); p_rx(R, x, dir, -3, 1, y - 6, y - 6, cL);
  if (pica) { p_rx(R, x, dir, 3, 5, y - 4, y - 2, c); pset(X(6), y - 1, na); pset(X(5), y - 3, C.k); }
  else if (grazna) { for (let j = 0; j < 4; j++) pset(X(4 + j), y - 6 - j, c); p_rx(R, x, dir, 7, 8, y - 11, y - 9, c); pset(X(8), y - 10, C.k); pset(X(9), y - 11, na); pset(X(10), y - 12, na); pset(X(9), y - 9, naS); pset(X(10), y - 9, naS);
    if (ciclo % 0.4 < 0.2) { pset(X(12), y - 12, tn(C.blanco)); pset(X(13), y - 11, tn(C.blanco)); pset(X(12), y - 10, tn(C.blanco)); } }
  else { p_rx(R, x, dir, 3, 4, y - 11, y - 5, c); pset(X(3), y - 7, cS); p_rx(R, x, dir, 3, 5, y - 13, y - 11, c); pset(X(5), y - 12, C.k); pset(X(6), y - 12, na); pset(X(7), y - 12, na); pset(X(6), y - 11, naS); }
}

// la cabra atada a un poste (x, y: pies), que rumia (mueve la quijada), mueve la cola y a veces baja a comer
function p_cabra(R, x, y, t, tn, dir = -1) {
  const { pset, linea } = R, X = (i) => x + i * dir, c = tn(hex('#8a7a68')), cS = tn(hex('#5e5244')), cL = tn(hex('#b4a48e')), bl = tn(hex('#e8e0d0'));
  const come = Math.sin(t * 0.5) > 0.4, mast = Math.floor(t * 5) % 2, cola = Math.floor(t * 3) % 3 === 0;
  R.rect(x - 9, y, x + 9, y, tn(hex('#2e2a26')));
  for (const [i, s] of [[-6, 0], [-4, 1], [4, 0], [6, 1]]) { p_rx(R, x, dir, i, i, y - 5, y - (s && Math.sin(t * 0.7) > 0.9 ? 1 : 0), cS); pset(X(i), y, tn(C.k)); }
  p_rx(R, x, dir, -7, 7, y - 11, y - 5, c); p_rx(R, x, dir, -7, 7, y - 6, y - 5, cS); p_rx(R, x, dir, -6, 5, y - 11, y - 11, cL); p_rx(R, x, dir, -2, 3, y - 9, y - 8, cL);
  p_rx(R, x, dir, -9, -8, y - 13 + (cola ? 1 : 0), y - 11, c);
  const hy = come ? y - 6 : y - 15, hx = come ? 9 : 8;
  p_rx(R, x, dir, 6, 8, come ? y - 11 : y - 15, y - 9, c);                                      // el cuello
  p_rx(R, x, dir, hx, hx + 4, hy, hy + 4, c); p_rx(R, x, dir, hx + 4, hx + 5, hy + 2 + (mast && !come ? 1 : 0), hy + 4 + (mast ? 1 : 0), cL); pset(X(hx + 2), hy + 1, C.k);
  pset(X(hx + 1), hy - 1, cS); pset(X(hx), hy - 2, cS); pset(X(hx - 1), hy - 2, cS);                       // los cuernos
  p_rx(R, x, dir, hx - 1, hx - 1, hy + 1, hy + 2, cS);                                                      // la oreja
  if (!come) { pset(X(hx + 3), hy + 5, bl); pset(X(hx + 3), hy + 6, bl); }                                  // la barbita
  linea(X(hx), hy + 4, X(14), y - 8, tn(hex('#8a7a5a')));                                                   // la cuerda al poste
}

// una persona pequeña de fondo (x centro, y pies; 6–16 px): o.anda, o.dir, o.casco (lámpara de minero), o.carga
// (fiambrera), o.brazo ('arriba' para remover o saludar); cols { ropa, pantalon, piel, pelo }
function p_figura(R, x, y, t, cols, o = {}) {
  const { rect, pset } = R, tn = o.tn ?? ((c) => c), a = o.alto ?? 10, dir = o.dir ?? 1;
  const cab = Math.max(2, Math.round(a * 0.3)), tron = Math.max(3, Math.round(a * 0.4)), pier = Math.max(1, a - cab - tron);
  const w = Math.max(3, Math.round(a * 0.34)), xl = Math.round(x - w / 2), xr = xl + w - 1, yT = y - pier - tron + 1, yC = yT - cab;
  const paso = o.anda ? Math.floor(t * 7 + x * 0.21) % 2 : 0, pc = tn(cols.pantalon ?? hex('#3a3a44')), rp = tn(cols.ropa), rpS = tn(p_mez(cols.ropa, C.k, 0.35)), rpL = tn(p_mez(cols.ropa, C.blanco, 0.25));
  rect(xl, y - pier + 1, xl, y - (paso ? 1 : 0), pc); rect(xr, y - pier + 1, xr, y - (paso ? 0 : 1), pc);
  rect(xl, yT, xr, y - pier, rp); rect(dir > 0 ? xl : xr, yT, dir > 0 ? xl : xr, y - pier, rpS); rect(dir > 0 ? xr : xl, yT, dir > 0 ? xr : xl, yT + 1, rpL);
  const bx = dir > 0 ? xr + 1 : xl - 1, sw = o.anda ? (Math.floor(t * 7 + x * 0.21) % 2 ? 1 : 0) : 0;
  if (o.brazo === 'arriba') { const up = Math.sin(t * 4 + x) > 0; rect(bx, yT - (up ? 2 : 1), bx, yT + 1, rpS); pset(bx, yT - (up ? 3 : 2), tn(cols.piel)); }
  else { rect(bx, yT + 1, bx, yT + tron - 1 + sw, rpS); pset(bx, yT + tron + sw, tn(cols.piel)); }
  if (o.carga) { rect(bx, yT + tron + sw, bx + dir * 2, yT + tron + 2 + sw, tn(hex('#8a8e96'))); }
  rect(xl, yC, xr, yT - 1, tn(cols.piel)); rect(xl, yC, xr, yC, tn(cols.pelo)); pset(dir > 0 ? xl : xr, yC + 1, tn(cols.pelo)); if (cab > 2) pset(dir > 0 ? xr : xl, yC + 1, C.k);
  if (o.casco) { rect(xl - 1, yC - 1, xr + 1, yC, tn(hex('#5a5a62'))); pset(dir > 0 ? xr + 1 : xl - 1, yC, hex('#fff2a0')); }
  if (o.pañuelo) rect(xl, yC, xr, yC, tn(o.pañuelo));
}

// los colores de la gente del 12: ropa gastada gris, parda, azul lavado; piel y pelo
const p_GENTE = [
  { ropa: hex('#6a6a74'), pantalon: hex('#3a3a44'), piel: hex('#e0b090'), pelo: hex('#2a2024') },
  { ropa: hex('#7a5a44'), pantalon: hex('#4a3e34'), piel: hex('#c8946a'), pelo: hex('#1e1a1c') },
  { ropa: hex('#5a6a80'), pantalon: hex('#2e3440'), piel: hex('#f0c8a0'), pelo: hex('#5a3a22') },
  { ropa: hex('#8a8070'), pantalon: hex('#4a443a'), piel: hex('#8a5a3a'), pelo: hex('#1a1416') },
  { ropa: hex('#7a3e3a'), pantalon: hex('#3a3034'), piel: hex('#e8bc98'), pelo: hex('#c8a060') },
];

// un agente de la paz de blanco (x centro, y pies; alto 12–18): casco blanco con visera oscura, porra al cinto; se
// balancea un poco y mira a un lado y a otro
function p_agente(R, x, y, t, a, tn, k = 0) {
  const { rect, pset } = R, w = Math.max(4, Math.round(a * 0.36)), xl = Math.round(x - w / 2), xr = xl + w - 1, cab = Math.round(a * 0.32), pier = Math.round(a * 0.28), yT = y - a + cab + 1, yC = y - a + 1;
  const bl = tn(hex('#f2f2f0')), blS = tn(hex('#c4c8d0')), vis = hex('#1e2430'), mira = Math.sin(t * 0.6 + k * 2) > 0 ? 1 : -1;
  rect(xl - 1, y + 1, xr + 1, y + 1, tn(hex('#2e2e34')));
  rect(xl, y - pier + 1, xl + 1, y, blS); rect(xr - 1, y - pier + 1, xr, y, blS); rect(xl, y, xl + 1, y, C.k); rect(xr - 1, y, xr, y, C.k);
  rect(xl, yT, xr, y - pier, bl); rect(xl, yT, xl, y - pier, blS); rect(xl, y - pier - 1, xr, y - pier - 1, tn(hex('#2a2a30'))); pset(xr + 1, y - pier, tn(hex('#2a2a30'))); pset(xr + 1, y - pier + 1, tn(hex('#2a2a30')));
  rect(xl - 1, yT + 1, xl - 1, y - pier - 1, blS); rect(xr + 1, yT + 1, xr + 1, y - pier - 2, blS);
  rect(xl - 1, yC, xr + 1, yT - 1, bl); rect(xl - 1, yC, xr + 1, yC, blS); rect(mira > 0 ? xl + 1 : xl - 1, yC + 2, mira > 0 ? xr + 1 : xr - 1, yT - 2, vis); pset(mira > 0 ? xr : xl, yC + 2, tn(hex('#6a7a9a')));
}

// cabezas de espaldas (el público de la cosecha): hombros y nuca a escala s, de x0 a x1 en y (la base de los hombros);
// saltan el pasillo [a, b]; giran la cabeza de vez en cuando (asoma la cara)
function p_cabezas(R, t, x0, x1, y, s, sem, pasillo, tn) {
  const { rect, disco, pset } = R, paso = Math.round(s * 1.05);
  const PELO = [hex('#2a2024'), hex('#1e1a1c'), hex('#3a2a20'), hex('#5a3a22'), hex('#a88050'), hex('#2a2024'), hex('#4a3a30')];
  const ROPA = [hex('#e8e6e0'), hex('#c8ccd4'), hex('#a8a29a'), hex('#d8d0c0'), hex('#8a8e9a'), hex('#b8c0c8')];
  for (let x = x0, i = 0; x <= x1; x += paso, i++) { if (pasillo && x + s * 0.6 > pasillo[0] && x - s * 0.6 < pasillo[1]) continue;
    const q = h(i, sem, 60), px = Math.round(x + (q - 0.5) * 2), sube = Math.sin(t * 1.3 + i * 1.7 + sem) > 0.85 ? 1 : 0, hy = Math.round(y - s * 0.95) - sube;
    const ropa = tn(ROPA[Math.floor(q * 6)]), ropaS = tn(p_mez(ROPA[Math.floor(q * 6)], C.k, 0.3)), pelo = tn(PELO[Math.floor(h(i, sem, 61) * 7)]), piel = tn(h(i, sem, 62) < 0.4 ? hex('#c8946a') : hex('#e8bc98'));
    const hw = Math.round(s * 0.55), ys = Math.round(y - s * 0.5), r = s * 0.36, gira = Math.sin(t * 0.7 + i * 2.3 + sem) > 0.8 ? (i % 2 ? 1 : -1) : 0, os = tn(hex('#2a2428'));
    rect(px - hw - 1, ys, px + hw + 1, y, os); rect(px - hw, ys + 1, px + hw, y, ropa); rect(px - hw, ys + 1, px - hw + 1, y, ropaS); rect(px + hw - 1, ys + 2, px + hw, y, ropaS); rect(px - 1, ys + 1, px + 1, ys + 2, ropaS);
    rect(px - 1, ys - 1, px + 1, ys, piel);
    disco(px + 0.5, hy, r + 0.9, os); disco(px + 0.5, hy, r, pelo);
    pset(px - Math.round(r) - 1, hy + 1, piel); pset(px + Math.round(r) + 1, hy + 1, piel);
    if (gira) { disco(px + 0.5 + gira * r * 0.5, hy + 1, r * 0.55, piel); pset(px + gira * Math.round(r * 0.8), hy, C.k); }
    pset(px - Math.round(r * 0.4), hy - Math.round(r * 0.6), tn(p_mez(PELO[0], C.blanco, 0.35))); pset(px - Math.round(r * 0.4) + 1, hy - Math.round(r * 0.6), tn(p_mez(PELO[0], C.blanco, 0.2)));
    if (h(i, sem, 63) < 0.3 && s > 8) { rect(px, hy + Math.round(r), px, hy + Math.round(r) + 3, pelo); pset(px, hy + Math.round(r) + 4, tn(hex('#a85a4a'))); }   // una trenza con su cinta
  }
}

// un tendedero (de [x0, y0] a [x1, y1] con su comba) con prendas que ondean con el viento; pinzas
const p_PRENDAS = [p_h('#e8e2d4 #c4bca8'), p_h('#7a8ab0 #5a6888'), p_h('#c8b098 #9a8268'), p_h('#a85a4a #7a3e34'), p_h('#d8d4c8 #aaa69a'), p_h('#6a7a5a #4a5a3e')];

function p_tendedero(R, x0, y0, x1, y1, t, tn, sem = 0, o = {}) {
  const { pset } = R, comba = o.comba ?? 5, cuerda = (x) => { const u = (x - x0) / (x1 - x0); return Math.round(y0 + (y1 - y0) * u + comba * 4 * u * (1 - u)); };
  for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) pset(x, cuerda(x), tn(hex('#d8d0c0')));
  const viento = Math.sin(t * 1.3 + sem) * 0.5 + 0.5;
  for (let x = x0 + 4, k = 0; x < x1 - 8; k++) { const tipo = Math.floor(h(k, sem, 70) * 3), w = tipo === 1 ? 12 : tipo === 2 ? 6 : 9, alto = tipo === 1 ? 13 : tipo === 2 ? 8 : 10, P = p_PRENDAS[Math.floor(h(k, sem, 71) * 6)].map(tn);
    if (h(k, sem, 72) < 0.2) { x += 6; continue; }
    for (let i = 0; i < w; i++) { const yy = cuerda(x + i) + 1, ondea = Math.round(Math.sin(t * 4 + i * 0.6 + k) * 1.2 * viento), larg = alto - (tipo === 0 && i > 2 && i < w - 3 ? 3 : 0) + (i % 3 === 0 ? 0 : 0);
      for (let j = 0; j < larg; j++) { const xx = x + i + Math.round(j * viento * 0.18) + (j > alto * 0.5 ? ondea : 0); pset(xx, yy + j, (i === 0 || j === larg - 1 || (i + j * 2) % 9 === 0) ? P[1] : P[0]); }
      if (tipo === 0 && (i === 0 || i === w - 1)) for (let j = 0; j < 5; j++) pset(x + i + (i ? 1 : -1), yy + j, P[0]); }
    pset(x + 1, cuerda(x + 1) - 1, tn(hex('#a88a5a'))); pset(x + w - 2, cuerda(x + w - 2) - 1, tn(hex('#a88a5a')));
    x += w + 3; }
}

// un farol colgado (x, y: el gancho): cristal ámbar con su llama que parpadea, y el halo de luz si está encendido
function p_farol(R, x, y, t, on, tn, k = 0, halo = 1) {
  const { rect, pset } = R, fl = 0.75 + 0.25 * Math.sin(t * 13 + k * 3) * Math.sin(t * 7.3 + k);
  pset(x, y, tn(hex('#3a3a40'))); rect(x - 2, y + 1, x + 2, y + 1, tn(hex('#2a2a30'))); rect(x - 3, y + 2, x + 3, y + 2, tn(hex('#4a4a52')));
  rect(x - 2, y + 3, x + 2, y + 8, on ? (fl > 0.8 ? hex('#f8d070') : hex('#e8b050')) : tn(hex('#6a7078'))); rect(x - 3, y + 3, x - 3, y + 8, tn(hex('#2a2a30'))); rect(x + 3, y + 3, x + 3, y + 8, tn(hex('#2a2a30'))); rect(x, y + 3, x, y + 8, tn(hex('#3a3a40')));
  if (on) { pset(x - 1, y + 5, hex('#fff6d0')); pset(x + 1, y + 6, hex('#fff0b0')); }
  rect(x - 3, y + 9, x + 3, y + 9, tn(hex('#2a2a30')));
  if (on && halo) p_halo(R, x, y + 6, 14 * halo, hex('#f8c060'), 0.42 * fl);
}

// una fila de banderines (de [x0, y0] a [x1, y1], con comba) que ondean; cols alterna
function p_banderines(R, x0, y0, x1, y1, comba, t, tn, cols) {
  const { pset, poligono } = R, y = (x) => { const u = (x - x0) / (x1 - x0); return y0 + (y1 - y0) * u + comba * 4 * u * (1 - u); };
  for (let x = Math.max(0, Math.round(x0)); x <= Math.min(319, x1); x++) pset(x, Math.round(y(x)), tn(hex('#3a3a40')));
  for (let x = x0 + 3, k = 0; x < x1 - 4; x += 7, k++) { const yy = Math.round(y(x)), ond = Math.round(Math.sin(t * 5 + k * 0.9) * 1.5), c = tn(cols[k % cols.length]);
    poligono([[x, yy + 1], [x + 5, Math.round(y(x + 5)) + 1], [x + 2.5 + ond, yy + 7]], c); pset(x + 1, yy + 2, tn(p_mez(cols[k % cols.length], C.blanco, 0.3))); }
}

// una urna de cristal (cx centro, base: y del pie; w, alto) llena de papeletas dobladas hasta lleno (0–1). El cristal es
// transparente: deja ver el fondo, tramado y teñido de azul, con un reflejo en diagonal, el canto claro a la izquierda y
// oscuro a la derecha, y un destello que lo cruza cada pocos segundos; esquinas, pie moldurado y tapa de latón con la
// ranura. Las papeletas, dobladas, en tres tonos (blanco, crema y gris azulado), cada una con su canto de luz, su doblez y
// su sombra, con huecos oscuros entre ellas y un montón abombado arriba; con lleno 1 queda cristal libre encima.
// desborda: las papeletas asoman por la ranura, saltan y caen revoloteando (más grandes, girando en cuatro posturas y con
// su sombra) hasta el suelo (sueloY), donde quedan unas cuantas tiradas; o.n: cuántas vuelan
function p_urna(R, cx, base, w, alto, lleno, t, tn, o = {}) {
  const { rect, pset } = R, B = R.buf, x0 = Math.round(cx - w / 2), x1 = x0 + w, y1 = base - Math.max(2, Math.round(alto * 0.08)), y0 = base - alto;
  const laton = tn(hex('#c89a40')), latonS = tn(hex('#8a6420')), latonL = tn(hex('#f0d080')), latonO = tn(hex('#5a4014'));
  const tonos = [[hex('#fbf9f2'), hex('#d8d2c2')], [hex('#efe2c0'), hex('#c4b08a')], [hex('#e2e6ec'), hex('#a8b0bc')]].map(([c, s]) => [tn(c), tn(s), tn(p_mez(c, C.blanco, 0.6))]);
  const sombra = tn(hex('#2e3038')), vidrio = tn(hex('#8ab8d0')), hueco = tn(hex('#3a4450'));
  const P = (x, y, c) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) pset(x, y, c); };
  // el pie moldurado de latón: zócalo, filete de luz, sombra bajo la caja y remaches
  rect(x0 - 1, y1 + 1, x1 + 1, base, laton); rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, latonL); rect(x0 - 1, base, x1 + 1, base, latonO);
  if (base - y1 > 3) rect(x0 - 1, base - 1, x1 + 1, base - 1, latonS);
  for (let x = x0 + 2; x < x1 - 1; x += Math.max(4, Math.round(w / 5))) P(x, Math.round((y1 + base) / 2), latonL);
  // el cristal: el fondo se sigue viendo, teñido y tramado, algo más oscuro abajo
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) { if (x < 0 || x >= 320 || y < 0) continue; const i = y * 320 + x, u = (y - y0) / (y1 - y0);
    B[i] = p_mez(B[i], vidrio, 0.2 + 0.12 * u + (((x + y) & 1) ? 0.07 : 0)); }
  // el montón de papeletas: la superficie abombada (más alta en medio) y los huecos oscuros entre papeletas
  const lib = Math.max(4, Math.round(alto * 0.27)), alt = Math.round((y1 - y0 - lib) * Math.max(0, Math.min(1, lleno))), nivel = y1 - 1 - alt;
  const loma = alt > 3 ? Math.max(1, Math.round(alto * 0.07)) : 0, sup = (x) => nivel - Math.round(loma * Math.max(0, 1 - ((x - cx) / (w / 2)) ** 2)) + (h(x >> 1, 7, 82) > 0.7 ? 1 : 0);
  const dentro = (x, y) => x > x0 && x < x1 && y < y1 && y > y0 && y >= sup(x);
  if (alt > 0) for (let x = x0 + 1; x < x1; x++) for (let y = Math.max(y0 + 1, sup(x)); y < y1; y++) if (x >= 0 && x < 320) { const i = y * 320 + x; B[i] = p_mez(B[i], hueco, 0.6); }
  // una papeleta doblada: canto de luz arriba, el doblez en medio, sombra debajo; gira: 0 plana, 1 y 3 ladeada, 2 de canto
  const papeleta = (px, py, pw, ph, tono, gira, ok, conSombra) => { const [c, s, l] = tono;
    if (gira === 2) { for (let k = 0; k < pw; k++) { const dy = k === (pw >> 1) ? -1 : 0; if (conSombra) ok(px + k + 1, py + dy + 2, sombra); ok(px + k, py + dy, l); ok(px + k, py + dy + 1, s); } return; }
    for (let r = 0; r < ph; r++) { const sh = gira === 1 ? r - (ph >> 1) : gira === 3 ? (ph >> 1) - r : 0;
      for (let k = 0; k < pw; k++) { const x = px + k + sh, y = py + r; if (conSombra) ok(x + 1, y + 1, sombra); } }
    for (let r = 0; r < ph; r++) { const sh = gira === 1 ? r - (ph >> 1) : gira === 3 ? (ph >> 1) - r : 0;
      for (let k = 0; k < pw; k++) { const x = px + k + sh, y = py + r; ok(x, y, r === 0 ? (k === (pw >> 1) ? c : l) : r === ph - 1 || k === pw - 1 ? s : k === (pw >> 1) && r === 1 ? s : c); } } };
  const sw = Math.max(3, Math.round(w / 5)), sh = Math.max(2, Math.round(sw * 0.55)), dent = (x, y, c) => { if (dentro(x, y)) P(x, y, c); };
  // en filas que se solapan, de arriba abajo (las de delante tapan el pie de las de detrás); alguna falta y deja ver el hueco
  const filas = []; for (let y = y1 - sh, f = 0; y > nivel - loma - sh; y -= sh - 1, f++) filas.unshift([y, f]);
  if (alt > 0) for (const [y, f] of filas) for (let x = x0 + 1 - ((f * 3 + (f >> 1)) % sw); x < x1; x += sw) {
    const q = h(x, y, 80), q2 = h(x, y, 83); if (q2 > 0.45 && q2 < 0.55 && y > nivel + sh) continue;
    papeleta(x + (q2 > 0.6 ? 1 : 0), y + (q > 0.66 ? 1 : 0), sw, sh, tonos[Math.floor(q * 3)], q2 > 0.85 ? 1 : q2 < 0.12 ? 3 : 0, dent, false); }
  // unas cuantas sueltas sobre el montón, de pie o ladeadas
  if (alt > 2) for (let k = 0; k < Math.max(2, Math.round(w / 9)); k++) { const px = Math.round(x0 + 2 + h(k, 9, 82) * (w - sw - 3)), py = sup(px + (sw >> 1)) - 1;
    papeleta(px, py, sw, sh, tonos[k % 3], 1 + (k % 2) * 2, (x, y, c) => { if (x > x0 && x < x1 && y > y0 && y < y1) P(x, y, c); }, false); }
  // el volumen del montón: más oscuro abajo y en el lado de la sombra (derecha), más claro a la izquierda
  if (alt > 0) for (let y = Math.max(y0 + 1, nivel - loma); y < y1; y++) for (let x = x0 + 1; x < x1; x++) { if (x < 0 || x >= 320 || y < sup(x)) continue; const i = y * 320 + x;
    const k = Math.max(0, (y - (y1 - 4)) * 0.08) + Math.max(0, (x - (x1 - 4)) * 0.07) - Math.max(0, (x0 + 4 - x) * 0.04); if (k > 0) B[i] = p_mez(B[i], hueco, k); else if (k < 0) B[i] = p_mez(B[i], hex('#ffffff'), -k); }
  // el reflejo en diagonal y el canto del cristal: claro a la izquierda, oscuro a la derecha
  for (let y = y0 + 1; y < y1; y++) { const d = Math.round((y - y0) * 0.55);
    for (const [a, k] of [[w * 0.18, 0.4], [w * 0.18 + 2, 0.25], [w * 0.55, 0.2]]) { const x = Math.round(x0 + a + d - (y1 - y0) * 0.3); if (x > x0 + 1 && x < x1 - 1 && x >= 0 && x < 320) B[y * 320 + x] = p_mez(B[y * 320 + x], hex('#ffffff'), k); } }
  for (let y = y0 + 1; y < y1; y++) { if (x0 + 1 >= 0) B[y * 320 + x0 + 1] = p_mez(B[y * 320 + x0 + 1], hex('#ffffff'), 0.55); if (x1 - 1 < 320) B[y * 320 + x1 - 1] = p_mez(B[y * 320 + x1 - 1], hex('#203040'), 0.35); }
  // el destello que cruza el cristal
  const br = (t * 0.4 + cx * 0.01) % 3; if (br < 1) { const bx = Math.round(x0 + br * w); for (let y = y0 + 2; y < y1 - 1; y++) { const x = bx + Math.round((y - y0) * 0.3); if (x > x0 && x < x1) P(x, y, (y & 1) ? hex('#ffffff') : p_mez(vidrio, hex('#ffffff'), 0.7)); } }
  // las esquinas de latón y el canto de abajo
  rect(x0, y0, x0, y1, latonS); rect(x1, y0, x1, y1, latonO); P(x0, y0 + 1, latonL); rect(x0, y1, x1, y1, latonS);
  // la tapa de latón con su moldura, la ranura oscura en medio y el pomo
  const ra = Math.max(2, Math.round(w * 0.22));
  rect(x0 - 2, y0 - 2, x1 + 2, y0, laton); rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, latonL); rect(x0 - 2, y0, x1 + 2, y0, latonS); P(x0 - 2, y0 - 1, latonL); P(x1 + 2, y0 - 1, latonS);
  rect(cx - ra, y0 - 1, cx + ra, y0 - 1, sombra); rect(cx - ra, y0 - 2, cx + ra, y0 - 2, latonS);
  rect(cx - 2, y0 - 4, cx + 2, y0 - 3, laton); P(cx - 1, y0 - 4, latonL); P(cx + 2, y0 - 3, latonS);
  if (o.desborda) {
    const fw = Math.max(4, Math.round(w / 5)), fh = Math.max(3, Math.round(fw * 0.6)), suelo = o.sueloY ?? base, libre = (x, y, c) => { if (!p_calma(x, y)) P(x, y, c); };
    // las que quedan tiradas en el suelo, a los lados del pie
    for (let k = 0; k < 7; k++) { const lado = k % 2 ? 1 : -1, px = Math.round(cx + lado * (w * 0.55 + h(k, 10, 81) * w * 0.7)) - (fw >> 1), py = suelo - fh + 1 - Math.round(h(k, 11, 81) * 2);
      papeleta(px, py, fw, fh, tonos[k % 3], k % 3 === 2 ? 2 : (k % 4 === 1 ? 1 : 0), libre, true); }
    // las que asoman por la ranura, empujadas desde dentro
    for (let k = 0; k < 5; k++) { const px = Math.round(cx - ra + h(k, 5, 81) * (ra * 2 - 2)) - 1, ond = Math.round(Math.sin(t * 7 + k * 1.9)), py = y0 - 2 - fh + 1 - Math.round(h(k, 6, 81) * 2) + ond;
      papeleta(px, py, Math.max(3, fw - 1), fh, tonos[(k + 1) % 3], 1 + (k % 2) * 2, libre, true); }
    // las que saltan, suben y caen revoloteando, girando y con un vaivén
    for (let k = 0; k < (o.n ?? 16); k++) { const per = 1.8 + h(k, 1, 81) * 1.2, u = ((t + h(k, 2, 81) * 3) % per) / per, vx = (h(k, 3, 81) - 0.5) * w * 2.6, sube = alto * (0.35 + h(k, 4, 81) * 0.45);
      const cima = y0 - 2 - sube, sub = u < 0.3, v = sub ? u / 0.3 : (u - 0.3) / 0.7;
      const px = Math.round(cx + vx * (sub ? v * 0.45 : 0.45 + v * 0.55) + (sub ? 0 : Math.sin(t * 4.5 + k * 1.3) * 4 * v)) - (fw >> 1);
      const py = Math.round(sub ? y0 - 2 - sube * Math.sin(v * Math.PI / 2) : cima + (suelo - fh - cima) * (v * v * 0.35 + v * 0.65));
      papeleta(px, py, fw, fh, tonos[k % 3], Math.floor(t * (sub ? 9 : 5) + k * 1.7) % 4, libre, true); } }
  return { boca: [cx, y0 - 2], x0, x1, y0, y1 };
}
// la pantalla grande del Capitolio: marco con remaches, sello redondo sin letras que brilla, líneas de barrido;
// modo 'sello', 'nada' o una función (R, t, [x0, y0, x1, y1]) que pinta dentro, ya recortada al hueco. Brilla sin tinte
function p_pantalla(R, t, x0, y0, x1, y1, modo) {
  const { rect, pset } = R, B = R.buf, a = [x0 + 3, y0 + 3, x1 - 3, y1 - 3];
  rect(x0, y0, x1, y1, hex('#1a1c22')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#4a4e58')); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, hex('#0c0e12'));
  for (const [rx, ry] of [[x0 + 1, y0 + 1], [x1 - 1, y0 + 1], [x0 + 1, y1 - 1], [x1 - 1, y1 - 1]]) pset(rx, ry, hex('#8a8e98'));
  const [ax, ay, bx, by] = a, cx = (ax + bx) / 2, cy = (ay + by) / 2;
  if (typeof modo === 'function') { for (let y = ay; y <= by; y++) for (let x = ax; x <= bx; x++) B[y * 320 + x] = hex('#0e1424'); R.recorte(a); modo(R, t, a); R.recorte(null); }
  else if (modo === 'nada') { for (let y = ay; y <= by; y++) for (let x = ax; x <= bx; x++) B[y * 320 + x] = h(x, y, Math.floor(t * 12)) < 0.12 ? hex('#3a3e4a') : hex('#14161c'); }
  else {
    for (let y = ay; y <= by; y++) for (let x = ax; x <= bx; x++) { const d = Math.hypot(x - cx, (y - cy) * 1.1) / ((bx - ax) * 0.6); B[y * 320 + x] = d + p_um(x, y) * 0.25 < 0.55 ? hex('#3a3060') : d + p_um(x, y) * 0.25 < 0.85 ? hex('#2a2448') : hex('#1c1834'); }
    const r = Math.min(bx - ax, by - ay) * 0.38, gl = (t * 0.5) % (Math.PI * 2);
    for (let y = Math.floor(cy - r - 1); y <= cy + r + 1; y++) for (let x = Math.floor(cx - r - 1); x <= cx + r + 1; x++) { const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy); if (d > r) continue;
      const an = Math.atan2(y - cy, x - cx), luz = Math.cos(an - gl) > 0.6;
      let c = d > r - 1.2 ? (luz ? hex('#fff0a0') : hex('#e8b830')) : d > r - 2.4 ? hex('#8a6420') : d > r - 4 ? (Math.floor((an + 3.2) * 6) % 2 ? hex('#c89a30') : hex('#a87a20')) : d > r - 5 ? hex('#e8b830') : hex('#d8d8e8');
      if (d <= r - 5 && luz && p_um(x, y) < 0.4) c = hex('#ffffff'); pset(x, y, c); }
    // en el centro, un pictograma del Capitolio: un águila esquemática (alas abiertas) en granate
    const e = Math.max(1, Math.round(r / 7)), ex = Math.round(cx), ey = Math.round(cy);
    for (const [i, j] of [[0, -2], [0, -1], [0, 0], [0, 1], [-1, 0], [1, 0], [-2, -1], [2, -1], [-3, -1], [3, -1], [-3, -2], [3, -2], [-1, 2], [1, 2]]) R.rect(ex + i * e, ey + j * e, ex + i * e + e - 1, ey + j * e + e - 1, hex('#8a2a3a'));
    const barre = Math.round(ay + ((t * 22) % (by - ay + 20)) - 10); for (let y = Math.max(ay, barre); y <= Math.min(by, barre + 2); y++) for (let x = ax; x <= bx; x++) B[y * 320 + x] = p_mez(B[y * 320 + x], hex('#a8a0ff'), 0.25);
  }
  for (let y = ay; y <= by; y += 2) for (let x = ax; x <= bx; x++) B[y * 320 + x] = p_mez(B[y * 320 + x], hex('#000000'), 0.18);
  for (let j = 0; j < 4; j++) pset(ax + 2 + j, ay + 1 + j, hex('#ffffff'));
  return a;
}

// notas de música que suben ondulando (sinsajos que cantan): desde [x, y], n notas, color c
function p_notas(R, t, x, y, n, c, sem = 0) {
  const { pset, rect } = R;
  for (let k = 0; k < n; k++) { const u = ((t * 0.28 + k / n + sem * 0.13) % 1), nx = Math.round(x + u * 34 + Math.sin(u * 9 + k) * 4), ny = Math.round(y - u * 30); if (p_calma(nx, ny) || u > 0.92) continue;
    const doble = (k + sem) % 2; rect(nx, ny, nx + 1, ny + 1, c); rect(nx + 2, ny - 5, nx + 2, ny + 1, c);
    if (doble) { rect(nx + 5, ny + 1, nx + 6, ny + 2, c); rect(nx + 7, ny - 4, nx + 7, ny + 2, c); rect(nx + 2, ny - 5, nx + 7, ny - 4, c); } else { pset(nx + 3, ny - 4, c); pset(nx + 4, ny - 3, c); } }
}

// un sinsajo (pájaro gris con manchas blancas en las alas y cola larga) posado en (x, y), que mueve la cola y canta
function p_sinsajo(R, x, y, t, k, tn, dir = 1) {
  const { pset } = R, X = (i) => x + i * dir, canta = Math.sin(t * 1.7 + k * 2) > 0.2, c = tn(hex('#7a7c84')), cS = tn(hex('#4a4c54')), bl = tn(hex('#eeeeea')), cola = Math.floor(t * 2 + k) % 4 === 0 ? 1 : 0;
  p_rx(R, x, dir, -2, 2, y - 3, y - 1, c); p_rx(R, x, dir, -1, 1, y - 1, y - 1, tn(hex('#b8b8b4'))); pset(X(-1), y - 2, bl); pset(X(0), y - 2, cS);
  p_rx(R, x, dir, -6, -3, y - 2 - cola, y - 2 - cola, cS); pset(X(-6), y - 3 - cola, bl);
  p_rx(R, x, dir, 2, 3, y - 5, y - 3, c); pset(X(3), y - 4, C.k); pset(X(4), y - 4 + (canta ? -1 : 0), tn(hex('#2a2a2e'))); if (canta) pset(X(4), y - 3, tn(hex('#2a2a2e')));
  pset(X(0), y, tn(hex('#2a2a2e'))); pset(X(1), y, tn(hex('#2a2a2e')));
  return canta;
}

// luciérnagas que se encienden y se apagan, con un halo verdoso
function p_luciernagas(R, t, x0, x1, y0, y1, n, sem = 0) {
  for (let k = 0; k < n; k++) { const on = Math.sin(t * 2.3 + k * 1.9 + sem) ; if (on < 0.2) continue;
    const x = Math.round(x0 + ((h(k, 1, 90 + sem) * (x1 - x0) + Math.sin(t * 0.5 + k) * 8 + (x1 - x0)) % (x1 - x0))), y = Math.round(y0 + h(k, 2, 90 + sem) * (y1 - y0) + Math.sin(t * 0.8 + k * 3) * 4);
    if (p_calma(x, y)) continue; R.pset(x, y, on > 0.7 ? hex('#f8ffa0') : hex('#c8e070')); if (on > 0.7) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const i = (y + dy) * 320 + x + dx; if (x + dx >= 0 && x + dx < 320 && y + dy >= 0 && y + dy < 180) R.buf[i] = p_mez(R.buf[i], hex('#d8f070'), 0.45); } }
}

// polvo de carbón que flota (motas oscuras y claras que derivan con el viento)
function p_polvo(R, t, x0, x1, y0, y1, n, c, sem = 0) {
  for (let k = 0; k < n; k++) { const x = Math.round(x0 + ((h(k, 1, 95 + sem) * (x1 - x0) + t * (6 + h(k, 3, 95) * 8)) % (x1 - x0))), y = Math.round(y0 + ((h(k, 2, 95 + sem) * (y1 - y0) + Math.sin(t * 0.9 + k) * 3 - t * 1.5 + (y1 - y0) * 10) % (y1 - y0)));
    if (!p_calma(x, y) && Math.sin(t * 1.7 + k) > -0.4) R.pset(x, y, c); }
}

// un pino (x centro, base, alto) en tres tonos
function p_pino(R, x, base, alto, [cL, c, cS], tronco) {
  const { poligono, rect } = R, pisos = Math.max(2, Math.round(alto / 6));
  rect(x, base - 3, x + 1, base, tronco);
  for (let j = 0; j < pisos; j++) { const y = base - 3 - j * (alto - 3) / pisos, w = (pisos - j) * alto * 0.11 + 1.5, ap = (alto - 3) / pisos * 1.5;
    poligono([[x + 0.5, y - ap], [x - w, y], [x + 1 + w, y]], c); poligono([[x + 0.5, y - ap], [x + 1 + w, y], [x + 1, y]], cS); R.pset(Math.round(x - w * 0.5), Math.round(y - 1), cL); }
}

// restaura un rectángulo desde el fondo fijo (para que un mostrador o un murete tape a la gente pequeña que va detrás)
function p_restaura(R, F, x0, y0, x1, y1) { const B = R.buf; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const f = y * 320; for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) B[f + x] = F.b[f + x]; } }

// el sol (o la luna) de cada luz para los exteriores: [x, y, r]
const p_sol = (luz, a) => (a[luz] === undefined ? null : a[luz]);

// la piedra del Edificio de Justicia y la de la Aldea
const p_PIEDRA = p_h('#d4ccc0 #b2aa9e #8a8478 #625c54'), p_PIEDRAN = p_h('#e8e2d6 #ccc4b6 #a49c8e #807868'), p_SILLAR = p_h('#e6dccc #c8bca8 #a09480 #7a705e');

// la mina: el castillete con la rueda (x: pie izquierdo, base), la casa de la tolva y la chimenea de ladrillo
function p_minaFija(R, x, base, s = 1) {
  const { rect, linea, poligono, pset } = R, hie = hex('#3a3a44'), hieL = hex('#6a6a78'), alto = Math.round(40 * s), w = Math.round(16 * s);
  // la casa de la tolva, de tablas negras y chapa
  p_tablas(R, x - Math.round(30 * s), base - Math.round(16 * s), x - 2, base, p_h('#5a5450 #3e3a38 #2a2826 #1a1818'), 31, { ancho: 3 });
  poligono([[x - Math.round(32 * s), base - Math.round(16 * s)], [x - Math.round(32 * s), base - Math.round(21 * s)], [x, base - Math.round(17 * s)], [x, base - Math.round(16 * s)]], p_chapa(p_CHAPA, 32));
  rect(x - Math.round(24 * s), base - Math.round(11 * s), x - Math.round(20 * s), base - Math.round(7 * s), hex('#1a1a20'));
  // el castillete: dos patas, crucetas en X, plataforma y la rueda (la rueda gira en p_minaVivo)
  for (const px of [x, x + w]) { rect(px, base - alto, px + 1, base, hie); pset(px, base - alto, hieL); }
  linea(x + w + 1, base - alto + 2, x + w + Math.round(12 * s), base, hie);
  for (let y = base - alto + 4; y < base - 4; y += Math.round(8 * s)) { linea(x + 1, y, x + w, y + Math.round(7 * s), hie); linea(x + w, y, x + 1, y + Math.round(7 * s), hie); rect(x, y, x + w, y, hieL); }
  rect(x - 2, base - alto - 1, x + w + 3, base - alto, hie);
  // la chimenea de ladrillo con sus aros
  const cx = x + w + Math.round(18 * s), ca = Math.round(46 * s);
  rect(cx, base - ca, cx + Math.round(5 * s), base, hex('#6a3a2e')); rect(cx, base - ca, cx, base, hex('#8a5040')); rect(cx + Math.round(5 * s), base - ca, cx + Math.round(5 * s), base, hex('#4a2820'));
  for (let y = base - ca + 3; y < base; y += 6) rect(cx, y, cx + Math.round(5 * s), y, hex('#3a2420'));
  rect(cx - 1, base - ca - 1, cx + Math.round(5 * s) + 1, base - ca, hex('#2a2a30'));
  // el montón de carbón con brillos y la cinta que sube
  const mx = cx + Math.round(14 * s), mh = Math.round(13 * s); poligono([[mx - Math.round(16 * s), base], [mx, base - mh], [mx + Math.round(18 * s), base]], (xx, yy) => h(xx, yy, 33) < 0.08 ? hex('#7a7a88') : h(xx >> 1, yy >> 1, 34) < 0.4 ? hex('#1a1a20') : hex('#2a2a32'));
  linea(x - Math.round(6 * s), base - Math.round(18 * s), mx, base - mh - 1, hex('#4a4a52'));
  return { rueda: [x + (w >> 1), base - alto - Math.round(5 * s), Math.round(5 * s)], humo: [cx + Math.round(2.5 * s), base - ca - 2] };
}

// la rueda del castillete que gira y el humo de la chimenea de la mina
function p_minaVivo(R, t, m, tn) {
  const [x, y, r] = m.rueda, { pset, disco } = R, c = tn(hex('#2a2a32')), cL = tn(hex('#8a8a98'));
  for (let a = 0; a < 6.283; a += 0.25) pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), c);
  for (let k = 0; k < 4; k++) { const a = t * 1.6 + k * Math.PI / 2; for (let i = 1; i < r; i++) pset(Math.round(x + Math.cos(a) * i), Math.round(y + Math.sin(a) * i), cL); }
  disco(x, y, 1, c); pset(x + r, y, cL);
  p_humo(R, m.humo[0], m.humo[1], t, tn, { n: 7, alto: 26, viento: 22, r: 1.2, crece: 4.5, cols: [hex('#3a3a44'), hex('#5a5a66'), hex('#8a8a96')] });
}

// el Edificio de Justicia visto desde la plaza (x0–x1, base): frontón con reloj, cornisa, sillares con hollín, pilastras,
// ventanas en arco, el balcón con balaustrada, la puerta grande, las colgaduras y la escalinata; devuelve el reloj
function p_justicia(R, x0, x1, base, ant, luces) {
  const { rect, pset, poligono, linea, disco } = R, P = ant ? p_PIEDRAN : p_PIEDRA, cx = (x0 + x1) >> 1, top = base - 64;
  const [pL, p, pS, pJ] = P;
  // el frontón con el reloj
  poligono([[x0 - 3, top + 2], [cx, top - 15], [x1 + 3, top + 2]], pS); poligono([[x0 + 2, top + 1], [cx, top - 12], [x1 - 2, top + 1]], (x, y) => h(x >> 2, y >> 1, 40) < 0.15 ? pS : p);
  linea(x0 - 3, top + 2, cx, top - 15, pL); linea(cx, top - 15, x1 + 3, top + 2, pJ);
  disco(cx, top - 4, 6, pJ); disco(cx, top - 4, 5, hex('#f2ecd8')); for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * 0.5236) * 4), Math.round(top - 4 + Math.sin(k * 0.5236) * 4), hex('#6a6050'));
  // la cornisa con sus dentículos
  rect(x0 - 4, top + 2, x1 + 4, top + 5, pL); rect(x0 - 4, top + 5, x1 + 4, top + 5, pS); for (let x = x0 - 3; x <= x1 + 3; x += 3) rect(x, top + 6, x + 1, top + 7, pS);
  p_piedra(R, x0, top + 8, x1, base - 6, P, 10, 5, 41, { hollin: !ant });
  // pilastras con su capitel
  for (const px of [x0, x0 + 26, x1 - 31, x1 - 5]) { rect(px, top + 8, px + 5, base - 6, pL); rect(px + 4, top + 8, px + 5, base - 6, pS); rect(px - 1, top + 8, px + 6, top + 10, pL); rect(px - 1, top + 10, px + 6, top + 10, pS); for (let y = top + 13; y < base - 6; y += 6) pset(px + 2, y, pS); }
  // ventanas en arco (arriba y abajo) con el cielo reflejado y su alféizar
  const ventana = (vx, vy, vw, vh) => { rect(vx - 1, vy - 1, vx + vw + 1, vy + vh + 1, pL); rect(vx, vy, vx + vw, vy + vh, hex('#2a2e3e'));
    for (let j = 0; j <= vh; j++) for (let i = 0; i <= vw; i++) if ((i + j * 2) % 11 < 3 && j < vh * 0.7) pset(vx + i, vy + j, hex('#5a6a88'));
    rect(vx + (vw >> 1), vy, vx + (vw >> 1), vy + vh, pL); rect(vx, vy + (vh >> 1), vx + vw, vy + (vh >> 1), pL); rect(vx - 1, vy - 3, vx + vw + 1, vy - 1, pL); pset(vx + (vw >> 1), vy - 3, pJ);
    rect(vx - 2, vy + vh + 2, vx + vw + 2, vy + vh + 3, pL); rect(vx - 2, vy + vh + 3, vx + vw + 2, vy + vh + 3, pS);
    luces.push((noche) => noche && h(vx, vy, 42) < 0.5 && rect(vx + 1, vy + 1, vx + (vw >> 1) - 1, vy + vh - 1, hex('#e8c070'))); };
  for (const vx of [x0 + 9, x1 - 23]) { ventana(vx, top + 15, 12, 15); ventana(vx, top + 41, 12, 13); }
  // las colgaduras grises del Capitolio con un sello redondo sin letras
  if (!ant) for (const gx of [x0 + 33, x1 - 42]) { rect(gx, top + 8, gx + 8, top + 46, hex('#6a6a74')); for (let x = gx; x <= gx + 8; x += 3) rect(x, top + 8, x, top + 46, hex('#54545e')); rect(gx + 8, top + 8, gx + 8, top + 46, hex('#3e3e48'));
    poligono([[gx, top + 46], [gx + 4, top + 50], [gx + 8, top + 46]], hex('#6a6a74')); disco(gx + 4, top + 22, 3, hex('#c89a30')); disco(gx + 4, top + 22, 2, hex('#8a2a3a')); pset(gx + 4, top + 21, hex('#f0d080')); rect(gx - 1, top + 8, gx + 9, top + 9, hex('#c89a30')); }
  // el balcón: puerta de dos hojas con cristales, losa, ménsulas y balaustrada
  const bx0 = cx - 16, bx1 = cx + 16, by = top + 30;
  rect(cx - 10, top + 12, cx + 10, by, pJ); rect(cx - 9, top + 13, cx + 9, by, hex('#3a2a22')); rect(cx, top + 13, cx, by, hex('#1e1612'));
  for (const dx of [-7, 2]) for (let j = 0; j < 3; j++) { rect(cx + dx, top + 15 + j * 5, cx + dx + 4, top + 18 + j * 5, hex('#4a5a78')); pset(cx + dx, top + 15 + j * 5, hex('#8a9ab8')); }
  rect(cx - 11, top + 10, cx + 11, top + 11, pL);
  rect(bx0, by + 1, bx1, by + 3, pL); rect(bx0, by + 3, bx1, by + 3, pS); for (const mx of [bx0 + 2, bx1 - 3]) { rect(mx, by + 4, mx + 1, by + 7, pS); pset(mx, by + 4, pL); }
  rect(bx0, by - 6, bx1, by - 5, pL); for (let x = bx0 + 1; x < bx1; x += 3) { rect(x, by - 4, x + 1, by, pL); pset(x + 1, by - 2, pS); }
  // la puerta grande en arco, con clavos de hierro, y los apliques
  const dy0 = base - 26; rect(cx - 11, dy0 - 2, cx + 11, base - 6, pL); disco(cx, dy0 + 2, 11, pL); disco(cx, dy0 + 2, 10, pJ); rect(cx - 10, dy0 + 2, cx + 10, base - 6, pJ);
  disco(cx, dy0 + 3, 9, hex('#4a3426')); rect(cx - 9, dy0 + 3, cx + 9, base - 6, hex('#4a3426')); rect(cx, dy0 - 5, cx, base - 6, hex('#2a1e16'));
  for (let y = dy0 + 2; y < base - 7; y += 4) for (const dx of [-7, -3, 3, 7]) pset(cx + dx, y, hex('#8a8a92'));
  for (const lx of [cx - 15, cx + 15]) { rect(lx - 1, dy0 + 2, lx + 1, dy0 + 6, hex('#2a2a30')); pset(lx, dy0 + 3, hex('#d8c890')); pset(lx, dy0 + 4, hex('#c8a860')); luces.push((noche, amanecer) => (noche || amanecer) && (pset(lx, dy0 + 3, hex('#fff2c0')), pset(lx, dy0 + 4, hex('#f8c860')))); }
  // la escalinata
  for (let k = 0; k < 3; k++) { const y = base - 6 + k * 2; rect(x0 - 6 - k * 3, y, x1 + 6 + k * 3, y + 1, k % 2 ? pS : p); rect(x0 - 6 - k * 3, y, x1 + 6 + k * 3, y, pL); }
  return { reloj: [cx, top - 4], puerta: [cx - 9, cx + 9, dy0 - 6], balcon: [bx0, bx1, by] };
}

// el reloj del frontón, que anda (aguja larga y corta)
function p_reloj(R, x, y, t, tn) { const m = t * 0.05 - 1.2, hh = t * 0.004 + 2.2; R.linea(x, y, Math.round(x + Math.cos(m) * 4), Math.round(y + Math.sin(m) * 4), tn(hex('#2a2420'))); R.linea(x, y, Math.round(x + Math.cos(hh) * 2.5), Math.round(y + Math.sin(hh) * 2.5), tn(hex('#2a2420'))); R.pset(x, y, tn(hex('#8a2a2a'))); }

// una paloma gris que camina por una cornisa o una escalinata (x0, y, rango) y picotea
function p_paloma(R, x0, y, t, k, tn, rango = 10) {
  const { pset } = R, ph = t * 0.4 + k * 2.1, x = Math.round(x0 + Math.sin(ph) * rango), dir = Math.cos(ph) >= 0 ? 1 : -1, X = (i) => x + i * dir, pica = Math.sin(t * 2.7 + k) > 0.6;
  const c = tn(hex('#8a8e9e')), cS = tn(hex('#5e6272')), cu = tn(hex('#6a8a8a'));
  p_rx(R, x, dir, -2, 1, y - 3, y - 1, c); p_rx(R, x, dir, -2, 0, y - 1, y - 1, cS); pset(X(-3), y - 2, cS); pset(X(-4), y - 2, cS);
  if (pica) { pset(X(2), y - 1, cu); pset(X(3), y, tn(hex('#d8b0a0'))); } else { p_rx(R, x, dir, 1, 2, y - 5, y - 3, c); pset(X(2), y - 4, cu); pset(X(2), y - 5, C.k); pset(X(3), y - 4, tn(hex('#d8b0a0'))); }
  pset(X(0), y, tn(hex('#c86a6a')));
}

const p_PLAZA = {
  camaras: ['general', 'escenario'],
  cielo: (cam, luz) => cam === 'escenario' ? { hor: 34, estratos: [[10, 0.4, 70], [150, 0.65, 100]] } : { hor: 76, sol: p_sol(luz, { amanecer: [238, 70, 8], dia: [212, 30, 7], tarde: [62, 64, 9], noche: [214, 28, 6] }) },
  fijo(R, cam, luz, ant, luces) {
    const { rect, pset, poligono, linea, disco } = R, B = R.buf, noche = luz === 'noche', dat = { chims: [] };
    const L = (f) => luces.push(() => f(noche, luz === 'amanecer'));
    if (cam === 'escenario') {
      p_montes(R, 30, 12, p_h('#8a90aa #747a96 #5e6480'), 2.4, 60);
      // las casas de los lados
      dat.chims.push(p_casa(R, -14, 124, 46, 40, 1, { cortina: hex('#8a8aa0'), nueva: ant, noche }, luces).chimenea);
      dat.chims.push(p_casa(R, 288, 124, 44, 38, 2, { cegada: true, nueva: ant, noche }, luces).chimenea);
      // la fachada grande del Edificio de Justicia
      const P = ant ? p_PIEDRAN : p_PIEDRA, [pL, p, pS, pJ] = P, x0 = 34, x1 = 286;
      rect(x0 - 4, 22, x1 + 4, 27, pL); rect(x0 - 4, 27, x1 + 4, 27, pS); for (let x = x0 - 3; x <= x1 + 3; x += 4) rect(x, 28, x + 2, 30, pS); rect(x0 - 4, 21, x1 + 4, 21, pJ);
      p_piedra(R, x0, 31, x1, 124, P, 16, 8, 44, { hollin: !ant });
      for (const px of [x0, 106, 206, x1 - 8]) { rect(px, 31, px + 8, 124, pL); rect(px + 6, 31, px + 8, 124, pS); rect(px - 2, 31, px + 10, 35, pL); rect(px - 2, 35, px + 10, 35, pS); for (let y = 40; y < 124; y += 8) rect(px + 1, y, px + 5, y, p); }
      const vent = (vx, vy, vw, vh) => { rect(vx - 2, vy - 6, vx + vw + 2, vy + vh + 2, pL); disco(vx + vw / 2, vy, vw / 2 + 2, pL); disco(vx + vw / 2, vy, vw / 2, hex('#2a2e3e')); rect(vx, vy, vx + vw, vy + vh, hex('#2a2e3e'));
        for (let j = -vw / 2; j <= vh; j++) for (let i = 0; i <= vw; i++) if ((i + j * 2 + 40) % 13 < 3 && j < vh * 0.6 && R.pget(vx + i, vy + j) === hex('#2a2e3e')) pset(vx + i, vy + j, hex('#5a6a88'));
        rect(vx + (vw >> 1), vy - vw / 2, vx + (vw >> 1), vy + vh, pL); for (let y = vy + 6; y < vy + vh; y += 8) rect(vx, y, vx + vw, y, pL);
        rect(vx - 4, vy + vh + 2, vx + vw + 4, vy + vh + 4, pL); rect(vx - 4, vy + vh + 4, vx + vw + 4, vy + vh + 4, pS);
        rect(vx + 1, vy + 1, vx + 3, vy + vh - 1, hex('#5a3a3a')); rect(vx + vw - 3, vy + 1, vx + vw - 1, vy + vh - 1, hex('#5a3a3a')); };
      vent(56, 46, 22, 28); vent(242, 46, 22, 28); vent(56, 96, 22, 18); vent(242, 96, 22, 18);
      // el balcón: puerta acristalada con cortinas, balaustrada, losa y ménsulas
      rect(136, 36, 184, 76, pJ); rect(138, 38, 182, 76, hex('#3a2a22')); rect(160, 38, 160, 76, hex('#1e1612'));
      for (const dx of [141, 163]) for (let j = 0; j < 4; j++) { rect(dx, 41 + j * 8, dx + 15, 46 + j * 8, hex('#3e4c68')); rect(dx, 41 + j * 8, dx + 15, 41 + j * 8, hex('#7a8aa8')); rect(dx + 1, 42 + j * 8, dx + 3, 46 + j * 8, hex('#8a4a4a')); }
      rect(132, 34, 188, 36, pL); rect(132, 36, 188, 36, pS);
      rect(118, 66, 202, 68, pL); for (let x = 120; x < 200; x += 4) { rect(x, 69, x + 2, 76, pL); rect(x + 2, 69, x + 2, 76, pS); pset(x + 1, 72, pS); } rect(118, 77, 202, 80, pL); rect(118, 80, 202, 81, pS);
      for (const mx of [122, 196]) { rect(mx, 82, mx + 3, 88, pS); rect(mx, 82, mx + 1, 86, pL); }
      // la puerta grande, debajo del balcón, con sus apliques
      rect(140, 92, 180, 124, pL); disco(160, 96, 18, pL); disco(160, 97, 16, hex('#4a3426')); rect(144, 97, 176, 124, hex('#4a3426')); rect(160, 81, 160, 124, hex('#2a1e16'));
      for (let y = 96; y < 122; y += 5) for (const dx of [-12, -6, 6, 12]) pset(160 + dx, y, hex('#8a8a92'));
      for (const lx of [132, 188]) { rect(lx - 2, 98, lx + 2, 106, hex('#2a2a30')); rect(lx - 1, 99, lx + 1, 104, hex('#c8a860')); L((n, a) => (n || a) && rect(lx - 1, 99, lx + 1, 104, hex('#ffe8a0'))); }
      // las colgaduras con el sello sin letras
      if (!ant) for (const gx of [90, 218]) { rect(gx, 31, gx + 13, 104, hex('#6a6a74')); for (let x = gx + 1; x <= gx + 12; x += 3) rect(x, 31, x, 104, hex('#56565f')); rect(gx + 13, 31, gx + 13, 104, hex('#3e3e48')); rect(gx, 31, gx, 104, hex('#80808a'));
        poligono([[gx, 104], [gx + 6.5, 112], [gx + 14, 104]], hex('#6a6a74')); disco(gx + 7, 54, 5, hex('#c89a30')); disco(gx + 7, 54, 4, hex('#8a2a3a')); for (const [i, j] of [[0, -2], [0, -1], [0, 0], [0, 1], [-1, -1], [1, -1], [-2, -2], [2, -2]]) pset(gx + 7 + i, 54 + j, hex('#e8c060')); rect(gx - 1, 31, gx + 14, 33, hex('#c89a30')); }
      // los postes de las pantallas (o de los altavoces)
      if (!ant) { rect(20, 78, 23, 124, hex('#2a2a30')); rect(20, 78, 20, 124, hex('#5a5a66')); rect(292, 94, 295, 124, hex('#2a2a30')); rect(292, 94, 292, 124, hex('#5a5a66')); }
      else for (const [px, d] of [[18, 1], [302, -1]]) { rect(px, 40, px + 2, 124, hex('#6a5038')); poligono([[px + 1, 46], [px + 1 + d * 12, 40], [px + 1 + d * 12, 54]], hex('#5a5a62')); R.linea(px + 1 + d * 12, 40, px + 1 + d * 12, 54, hex('#8a8a96')); }
      // el suelo del escenario: tablas en perspectiva, clavos, desgaste en el centro y las marcas de cinta
      let y = 124, f = 0; while (y < 152) { const al = Math.round(3 + (y - 124) * 0.15); for (let j = 0; j < al && y + j < 152; j++) for (let x = 0; x < 320; x++) { const corte = (x + f * 37 + 400) % (52 + f * 3), base = ant ? hex('#b88c62') : hex('#8a6a4c');
          let c = j === al - 1 || corte === 0 ? hex('#3e2e22') : j === 0 ? p_mez(base, C.blanco, 0.18) : h((x >> 3) + f * 9, j, 45) < 0.3 ? p_mez(base, hex('#3e2e22'), 0.2) : base;
          if (Math.abs(x - 160) < 70 && j > 0 && j < al - 1 && p_um(x, y + j) < 0.25) c = p_mez(c, C.blanco, 0.12); if (h(x, y + j, 46) < 0.05) c = p_mez(c, hex('#3e2e22'), 0.4); if (corte === 2 && j === 1) c = hex('#a8a8b0'); B[(y + j) * 320 + x] = c; } y += al; f++; }
      for (const mx of [100, 130, 190, 220]) { linea(mx - 3, 144, mx + 3, 148, hex('#e8e4d8')); linea(mx + 3, 144, mx - 3, 148, hex('#e8e4d8')); }
      // el borde y el faldón con guirnaldas y flecos
      rect(0, 152, 319, 154, ant ? hex('#d8b088') : hex('#a8846a')); rect(0, 154, 319, 154, hex('#3e2e22'));
      if (ant) p_tablas(R, 0, 155, 319, 179, p_MADN.concat(), 47, { ancho: 9 });
      else { for (let yy = 155; yy < 180; yy++) for (let x = 0; x < 320; x++) { const m = x % 6; B[yy * 320 + x] = m === 0 ? hex('#3e3e48') : m < 3 ? hex('#6a6a76') : hex('#585862'); }
        for (let k = 0; k < 8; k++) { const sx = k * 40 + 20; for (let i = -20; i <= 20; i++) { const yy = Math.round(156 + 9 * (1 - (i / 20) ** 2)); rect(sx + i, 155, sx + i, yy, i % 4 === 0 ? hex('#4a4a54') : hex('#8a8a96')); pset(sx + i, yy + 1, hex('#c89a30')); if (i % 3 === 0) pset(sx + i, yy + 2, hex('#a87a20')); } disco(sx + 20, 156, 2, hex('#c89a30')); } }
      // los pedestales de las urnas
      for (const ux of [48, 272]) { rect(ux - 10, 128, ux + 10, 131, hex('#5a4030')); rect(ux - 10, 128, ux + 10, 128, hex('#8a6a4c')); rect(ux - 5, 131, ux + 5, 146, hex('#6a4a34')); rect(ux - 5, 131, ux - 4, 146, hex('#9a7454')); rect(ux + 4, 131, ux + 5, 146, hex('#3e2e22')); rect(ux - 6, 136, ux + 6, 137, hex('#8a6a4c')); rect(ux - 9, 146, ux + 9, 148, hex('#4a3426')); rect(ux - 12, 149, ux + 12, 150, hex('#3a2a20')); }
      // el micrófono de pie con su cable
      rect(158, 147, 162, 147, hex('#2a2a30')); linea(156, 148, 160, 145, hex('#2a2a30')); linea(164, 148, 160, 145, hex('#2a2a30')); rect(160, 112, 160, 146, hex('#4a4a52')); pset(159, 130, hex('#8a8a96'));
      rect(158, 106, 162, 111, hex('#1e1e24')); rect(159, 107, 161, 109, hex('#6a6a76')); pset(159, 107, hex('#b8b8c4'));
      for (let x = 162; x < 214; x++) pset(x, Math.round(148 + Math.sin(x * 0.2) * 1.5 + (x - 162) * 0.05), hex('#1e1e24'));
      return dat;
    }
    // ─ general ─
    p_montes(R, 62, 24, p_h('#9096ae #7a809a #646a84'), 1.3, 112);
    const alt = p_montes(R, 78, 14, p_h('#6a7860 #546250 #3c4838'), 4.1, 112, { arboles: true, pinos: true });
    dat.mina = p_minaFija(R, 52, 76);
    // las casas: una fila de atrás y otra delante (menos y más nuevas en la versión antigua)
    const atras = ant ? [[-4, 30], [74, 28], [236, 30]] : [[-8, 28], [22, 30], [54, 28], [222, 30], [254, 28], [286, 32]];
    atras.forEach(([x, w], k) => dat.chims.push(p_casa(R, x, 102, w, 17, k + 3, { nueva: ant, noche, plano: k % 2 === 1 }, luces).chimenea));
    if (ant) for (const px of [36, 58, 206, 300]) p_pino(R, px, 104, 22, p_h('#5a8a4a #3a6a34 #24482a'), hex('#4a3426'));
    const delante = ant ? [[-12, 40], [262, 40]] : [[-12, 40], [30, 36], [66, 30], [222, 32], [256, 38], [296, 36]];
    delante.forEach(([x, w], k) => dat.chims.push(p_casa(R, x, 116, w, 24, k + 1, { nueva: ant, noche, porche: k % 2 === 0, cegada: k === 3, cortina: [hex('#a89a7a'), hex('#8a9ab0'), hex('#b08a7a')][k % 3] }, luces).chimenea));
    dat.justicia = p_justicia(R, 102, 218, 114, ant, luces);
    // las farolas de las esquinas del edificio
    for (const fx of [94, 226]) { rect(fx, 86, fx + 1, 116, hex('#2a2a30')); rect(fx, 86, fx, 116, hex('#5a5a66')); rect(fx - 2, 115, fx + 3, 116, hex('#2a2a30')); rect(fx - 2, 84, fx + 3, 85, hex('#2a2a30')); }
    // los postes de las pantallas, o los de los altavoces de bocina
    if (!ant) for (const px of [40, 76, 240, 276]) { const y0 = px < 160 ? 84 : 88; rect(px, y0, px + 2, 120, hex('#2a2a30')); rect(px, y0, px, 120, hex('#5a5a66')); rect(px - 1, 119, px + 3, 120, hex('#1a1a20')); }
    else for (const [px, d] of [[58, -1], [262, 1]]) { rect(px, 54, px + 1, 118, hex('#7a5a3a')); rect(px, 54, px, 118, hex('#a8845a')); poligono([[px + 1, 60], [px + 1 + d * 9, 55], [px + 1 + d * 9, 66]], hex('#5a5a62')); linea(px + 1 + d * 9, 55, px + 1 + d * 9, 66, hex('#9a9aa6')); }
    // el suelo de la plaza: adoquines (o tierra pisada) con polvo de carbón
    if (ant) p_tierra(R, 0, 116, 319, 179, p_h('#a8967e #8a7a64 #6a5c4a #2a2a30'), 48, { hierba: 0.04 });
    else p_adoquines(R, 116, 179, p_h('#a8a4a0 #8a8682 #66625e #3e3a38'), 48);
    // el escenario de madera: suelo de tablas, faldón (o tablas toscas sobre caballetes) y la escalera
    const sx0 = 110, sx1 = 210;
    for (let yy = 114; yy <= 121; yy++) for (let x = sx0; x <= sx1; x++) B[yy * 320 + x] = (yy - 114) % 3 === 2 ? hex('#4a3a2c') : (x + (yy >> 1) * 13) % 31 === 0 ? hex('#4a3a2c') : ant ? hex('#c89a6a') : yy === 114 ? hex('#b08a64') : hex('#8a6a4c');
    if (ant) { rect(sx0, 122, sx1, 123, hex('#9a7450')); for (const lx of [sx0 + 6, 140, 180, sx1 - 8]) { linea(lx - 5, 135, lx + 5, 124, hex('#7a5a3a')); linea(lx + 5, 135, lx - 5, 124, hex('#6a4a30')); } for (let x = sx0; x <= sx1; x += 9) pset(x, 122, hex('#5a4030')); }
    else { for (let yy = 122; yy <= 134; yy++) for (let x = sx0; x <= sx1; x++) { const m = x % 5; B[yy * 320 + x] = yy === 122 ? hex('#c89a30') : m === 0 ? hex('#3e3e48') : m < 3 ? hex('#6a6a76') : hex('#585862'); }
      for (let x = sx0; x <= sx1; x += 3) pset(x, 135, hex('#a87a20')); }
    for (let k = 0; k < 4; k++) { rect(sx1 + 1 + k * 3, 121 + k * 3, sx1 + 3 + k * 3, 134, hex('#6a4e38')); rect(sx1 + 1 + k * 3, 121 + k * 3, sx1 + 3 + k * 3, 121 + k * 3, hex('#a8845a')); }
    // los postes de los cordones (las cuerdas y los chicos van en vivo)
    return dat;
  },
  vivo(R, t, cam, luz, ant, o, tn, F) {
    const { rect, pset } = R, d = F.dat, noche = luz === 'noche', enc = luz !== 'dia';
    const urna = o.urna ?? 1, modo = o.pantalla ?? 'sello';
    for (const c of d.chims) if (c[0] > 0 && c[0] < 320) p_humo(R, c[0], c[1], t + c[0] * 0.1, tn, { n: 4, alto: 16, viento: 10, r: 0.8, crece: 2.5, v: 0.12 });
    if (cam === 'escenario') {
      for (let k = 0; k < 3; k++) p_paloma(R, 70 + k * 80, 21, t, k, tn, 14);
      let pant = null;
      if (!ant) pant = [p_pantalla(R, t, 0, 36, 46, 78, modo), p_pantalla(R, t, 268, 52, 316, 94, modo)];
      const u1 = p_urna(R, 48, 128, 36, 42, urna, t, tn, { desborda: o.desborda, sueloY: 150 }), u2 = p_urna(R, 272, 128, 36, 42, urna, t + 1.3, tn, { desborda: o.desborda, sueloY: 150 });
      p_banderines(R, 0, 155, 320, 155, 0, t, tn, [hex('#e8e6e0'), hex('#8a8a96'), hex('#c89a30')]);
      p_polvo(R, t, 70, 250, 80, 150, 16, tn(hex('#e8dcc0')), 3);
      return { suelo: 146, pies: [100, 130, 190, 220], libre: [84, 236], microfono: [160, 106], urnas: [u1.boca, u2.boca], urnaCaja: [[u1.x0, u1.y0, u1.x1, u1.y1], [u2.x0, u2.y0, u2.x1, u2.y1]], puerta: [144, 176, 82], balcon: [118, 202, 66], pantallas: pant, borde: 152 };
    }
    // ─ general ─
    p_minaVivo(R, t, d.mina, tn);
    p_reloj(R, d.justicia.reloj[0], d.justicia.reloj[1], t, tn);
    for (const fx of [94, 226]) p_farol(R, fx, 76, t, enc, tn, fx, 0.7);
    let pant = null;
    if (!ant) pant = [p_pantalla(R, t, 26, 46, 90, 84, modo), p_pantalla(R, t, 226, 50, 290, 88, modo)];
    // los banderines grises que van del edificio a las pantallas y a las casas
    const ban = [hex('#d8d8d4'), hex('#8a8a96'), hex('#5a5a66')];
    p_banderines(R, 0, 70, 101, 50, 7, t, tn, ban); p_banderines(R, 219, 50, 320, 72, 7, t + 0.7, tn, ban);
    p_banderines(R, 0, 98, 108, 112, 5, t + 1.4, tn, ban); p_banderines(R, 212, 112, 320, 98, 5, t + 2.1, tn, ban);
    for (let k = 0; k < 2; k++) p_paloma(R, k ? 230 : 92, 115, t, k + 4, tn, 6);
    // las urnas y el micrófono en el escenario
    const u1 = p_urna(R, 124, 118, 15, 19, urna, t, tn, { desborda: o.desborda, sueloY: 134, n: 10 }), u2 = p_urna(R, 196, 118, 15, 19, urna, t + 1.3, tn, { desborda: o.desborda, sueloY: 134, n: 10 });
    rect(160, 104, 160, 117, tn(hex('#3a3a42'))); rect(159, 102, 161, 104, tn(hex('#1e1e24'))); pset(159, 102, tn(hex('#9a9aa6'))); rect(158, 118, 162, 118, tn(hex('#2a2a30')));
    // los agentes de la paz
    p_agente(R, 8, 122, t, 13, tn, 0); p_agente(R, 312, 124, t, 13, tn, 1);
    p_agente(R, 104, 134, t, 16, tn, 2); p_agente(R, 216, 134, t, 16, tn, 3);
    // los chicos en filas por edades (de espaldas, los mayores delante), con los cordones entre filas; pasillo libre
    const pas = [126, 194], cord = (y, x0, x1, comba) => { for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const u = ((x - x0) % 32) / 32; pset(x, Math.round(y + comba * 4 * u * (1 - u)), tn(hex('#c8b890'))); } for (let x = x0; x <= x1; x += 32) { rect(x, y - 3, x + 1, y + 6, tn(hex('#5a4030'))); pset(x, y - 3, tn(hex('#8a6a4c'))); } };
    p_cabezas(R, t, 4, 316, 140, 8, 1, pas, tn); cord(143, 2, 124, 2); cord(143, 196, 318, 2);
    p_cabezas(R, t, 6, 316, 153, 10, 2, pas, tn); cord(157, 2, 122, 3); cord(157, 198, 318, 3);
    p_cabezas(R, t, 2, 318, 168, 12, 3, pas, tn); cord(172, 0, 120, 3); cord(172, 200, 320, 3);
    p_cabezas(R, t, 8, 318, 186, 14, 4, pas, tn);
    p_polvo(R, t, 126, 194, 120, 178, 10, tn(hex('#5a5a62')), 1);
    return { suelo: 118, pies: [140, 154, 166, 180], escenario: [110, 210, 114], urnas: [u1.boca, u2.boca], urnaCaja: [[u1.x0, u1.y0, u1.x1, u1.y1], [u2.x0, u2.y0, u2.x1, u2.y1]], microfono: [160, 102], pasillo: [130, 190], sueloPlaza: 170, puerta: d.justicia.puerta, balcon: d.justicia.balcon, pantallas: pant, reloj: d.justicia.reloj, escalera: [211, 222, 121, 134] };
  },
  delante(R, t, cam, luz, ant, o, tn) {
    if (cam !== 'escenario') return;
    const { rect, pset } = R, m = tn(ant ? hex('#c89a6a') : hex('#8a6a4c')), mL = tn(ant ? hex('#e8c090') : hex('#b08a64')), mS = tn(hex('#4a3426'));
    // barandillas de madera a los lados, con balaustres y pasamanos
    for (const [a, b] of [[0, 72], [248, 319]]) { rect(a, 134, b, 137, m); rect(a, 134, b, 134, mL); rect(a, 137, b, 137, mS); rect(a, 149, b, 151, m); rect(a, 151, b, 151, mS);
      for (let x = a + 3; x < b; x += 6) { rect(x, 138, x + 2, 148, m); pset(x, 140, mL); rect(x + 2, 138, x + 2, 148, mS); }
      for (const px of [a === 0 ? 2 : a, a === 0 ? b - 4 : b - 2]) { rect(px, 128, px + 4, 152, m); rect(px, 128, px + 4, 129, mL); rect(px + 4, 128, px + 4, 152, mS); } }
    // el cordón de terciopelo que cuelga entre los postes del medio
    for (let x = 76; x <= 244; x++) { const u = (x - 76) / 168, y = Math.round(136 + 7 * 4 * u * (1 - u) + Math.sin(t * 1.5 + x * 0.05) * 0.4); pset(x, y, tn(hex('#8a2a34'))); pset(x, y + 1, tn(hex('#5a1a22'))); if (x % 9 === 0) pset(x, y, tn(hex('#c85a64'))); }
  },
};

// la bomba de agua de hierro con su pila de madera (x: el cuerpo, suelo)
function p_bomba(R, x, suelo) {
  const { rect, pset, linea } = R, hi = hex('#3a4048'), hiL = hex('#6a7480');
  p_tablas(R, x - 14, suelo - 7, x + 4, suelo, p_h('#8a7a64 #6a5a48 #4a3e32 #2e2620'), 51, { horiz: true, ancho: 3, mugre: 1 }); rect(x - 13, suelo - 7, x + 3, suelo - 7, hex('#4a6a7a')); pset(x - 8, suelo - 7, hex('#a8c8d8'));
  rect(x, suelo - 24, x + 3, suelo - 1, hi); rect(x, suelo - 24, x, suelo - 1, hiL); rect(x - 1, suelo - 26, x + 4, suelo - 24, hi); disco_(R, x + 1, suelo - 27, hiL);
  rect(x - 4, suelo - 18, x - 1, suelo - 16, hi); pset(x - 4, suelo - 15, hi); linea(x + 3, suelo - 25, x + 12, suelo - 30, hi); pset(x + 12, suelo - 30, hiL);
}

const disco_ = (R, x, y, c) => R.disco(x, y, 1, c);

// un carrito de mano con un saco y trozos de carbón (x izquierda, suelo)
function p_carrito(R, x, suelo) {
  const { rect, pset, disco, linea } = R;
  p_tablas(R, x, suelo - 12, x + 22, suelo - 5, p_h('#8a7a64 #6a5a48 #4a3e32 #2e2620'), 52, { horiz: true, ancho: 3, mugre: 1 });
  for (let i = 0; i < 18; i++) disco(x + 3 + i, suelo - 13 - (h(i, 1, 53) * 2 | 0), 1.5, h(i, 2, 53) < 0.3 ? hex('#4a4a56') : hex('#1e1e26'));
  rect(x + 14, suelo - 20, x + 21, suelo - 12, hex('#a8946e')); rect(x + 14, suelo - 20, x + 21, suelo - 20, hex('#c8b48e')); rect(x + 21, suelo - 19, x + 21, suelo - 12, hex('#7a6a4e')); pset(x + 17, suelo - 21, hex('#7a6a4e'));
  linea(x, suelo - 10, x - 10, suelo - 15, hex('#4a3e32')); disco(x + 7, suelo - 3, 4, hex('#2a2420')); disco(x + 7, suelo - 3, 2.5, hex('#6a5a48')); pset(x + 7, suelo - 3, hex('#2a2420'));
}

const p_CALLE = {
  camaras: ['general', 'puerta'],
  cielo: (cam, luz) => cam === 'puerta' ? { hor: 84, sol: p_sol(luz, { amanecer: [70, 74, 7], dia: [206, 26, 6], tarde: [240, 70, 8], noche: [206, 24, 5] }) } : { hor: 84, sol: p_sol(luz, { amanecer: [66, 76, 8], dia: [204, 28, 7], tarde: [244, 70, 9], noche: [204, 24, 6] }) },
  fijo(R, cam, luz, ant, luces) {
    const { rect, pset, poligono, linea, disco } = R, B = R.buf, noche = luz === 'noche', dat = { chims: [] }, cie = p_CIE[luz];
    if (cam === 'puerta') {
      p_montes(R, 70, 22, p_h('#9096ae #7a809a #646a84'), 3.3, 100);
      p_montes(R, 82, 10, p_h('#6a7860 #546250 #3c4838'), 6.2, 100, { arboles: true, pinos: true });
      dat.mina = p_minaFija(R, 196, 80, 0.7);
      dat.chims.push(p_casa(R, -20, 100, 40, 22, 2, { noche }, luces).chimenea, p_casa(R, 290, 100, 44, 22, 1, { noche, plano: true }, luces).chimenea);
      // el hastial de la casa: tablas, el ventanuco del desván y el borde del tejado de chapa
      const P = p_MAD[0];
      { const save = B.slice(); p_tablas(R, 34, 36, 286, 78, P, 61, { ancho: 7, mugre: 0 }); for (let y = 36; y <= 78; y++) for (let x = 34; x <= 286; x++) if (Math.abs(x - 160) > (y - 36) / 42 * 126) B[y * 320 + x] = save[y * 320 + x]; }
      // los dos faldones del tejado de chapa, vistos de canto
      poligono([[20, 81], [160, 28], [300, 81], [292, 81], [160, 36], [28, 81]], p_chapa(p_CHAPA, 62));
      linea(26, 79, 160, 31, hex('#c8ccd4')); linea(294, 79, 160, 31, hex('#3a3a42'));
      rect(148, 50, 172, 64, P[0]); rect(150, 52, 170, 62, hex('#2a2a32')); rect(160, 52, 160, 62, P[0]); for (let x = 151; x < 170; x += 2) rect(x, 52, x, 62, hex('#3e3e48'));
      // el tejadillo del porche (chapa vista desde abajo) y su viga
      poligono([[10, 74], [310, 74], [314, 84], [6, 84]], p_chapa(p_CHAPA, 63)); rect(6, 84, 314, 86, P[3]); rect(6, 87, 314, 88, P[1]); rect(6, 88, 314, 88, P[3]);
      for (let x = 8; x < 314; x += 3) pset(x, 84, hex('#c8ccd4'));
      // la fachada de tablas
      p_tablas(R, 0, 89, 319, 160, P, 64, { ancho: 8, mugre: 7 });
      // la puerta abierta: el interior cálido (estufa, mesa con quinqué, estante con tazas, abrigo colgado), recortado
      rect(142, 100, 178, 160, P[0]); rect(142, 100, 143, 160, p_mez(P[0], C.blanco, 0.2)); rect(177, 100, 178, 160, P[3]);
      luces.push(() => { const a = [146, 104, 174, 159]; rect(a[0], a[1], a[2], a[3], hex('#6a3e22'));
        for (let y = a[1]; y <= a[3]; y++) for (let x = a[0]; x <= a[2]; x++) { const k = (x - a[0]) % 6 === 5 ? hex('#4a2a18') : h(x >> 1, y >> 2, 65) < 0.2 ? hex('#7a4a2a') : hex('#8a5432'); pset(x, y, p_mez(k, hex('#f0a050'), 0.25)); }
        rect(a[0], 148, a[2], 159, hex('#5a3420')); for (let x = a[0]; x <= a[2]; x += 5) rect(x, 148, x, 159, hex('#3e2414'));
        rect(160, 122, 172, 147, hex('#1e1a1e')); rect(162, 134, 170, 140, hex('#f08830')); rect(163, 135, 169, 139, hex('#ffc860')); rect(165, 104, 167, 121, hex('#2a2428')); rect(159, 122, 173, 123, hex('#3a3438'));
        rect(147, 132, 158, 133, hex('#a86a3a')); rect(148, 134, 149, 147, hex('#7a4a2a')); rect(156, 134, 157, 147, hex('#7a4a2a')); rect(151, 126, 153, 131, hex('#c8c0a0')); rect(151, 124, 153, 125, hex('#fff2b0')); pset(152, 123, hex('#ffffff'));
        rect(147, 114, 158, 114, hex('#5a3420')); for (const [mx, c] of [[148, '#c8c0b0'], [151, '#8a4a3a'], [154, '#4a6a8a']]) rect(mx, 111, mx + 1, 113, hex(c));
        rect(146, 104, 150, 159, hex('#4a2e1c')); rect(146, 104, 146, 159, hex('#6a4428')); pset(149, 130, hex('#c8a040')); });
      // la luz que sale por la puerta y cae en el porche
      luces.push(() => { for (let y = 160; y < 172; y++) { const w = 16 + (y - 160) * 1.6; for (let x = Math.round(160 - w); x <= 160 + w; x++) if (x >= 0 && x < 320 && p_um(x, y) < 0.7 - (y - 160) * 0.05) B[y * 320 + x] = p_mez(B[y * 320 + x], hex('#f0b060'), 0.28); } });
      // las ventanas: marco, cristales con el cielo, cortinas remendadas; latita con flores; un cristal con cinta en cruz
      for (const [vx, cor] of [[58, hex('#7a8aa8')], [226, hex('#a86a5a')]]) {
        rect(vx - 2, 104, vx + 38, 134, P[0]); rect(vx, 106, vx + 36, 132, hex('#24283a'));
        for (let y = 106; y <= 132; y++) for (let x = vx; x <= vx + 36; x++) { const u = (y - 106) / 26; if (u < 0.75 && (x - vx + (y - 106) * 0.6) % 14 < 4) pset(x, y, p_mez(cie.g[3], hex('#24283a'), 0.3)); }
        rect(vx + 1, 106, vx + 7, 132, cor); rect(vx + 29, 106, vx + 35, 132, cor); for (let y = 108; y < 132; y += 3) { pset(vx + 3, y, p_mez(cor, C.k, 0.3)); pset(vx + 32, y, p_mez(cor, C.k, 0.3)); }
        rect(vx + 3, 118, vx + 6, 121, p_mez(cor, hex('#e8d8a0'), 0.5)); rect(vx + 18, 106, vx + 18, 132, P[0]); rect(vx, 119, vx + 36, 119, P[0]);
        rect(vx - 4, 133, vx + 40, 135, P[0]); rect(vx - 4, 135, vx + 40, 135, P[3]);
        luces.push((n) => n && (rect(vx + 8, 106, vx + 28, 132, hex('#f0c070')), rect(vx + 18, 106, vx + 18, 132, P[0]), rect(vx + 8, 119, vx + 28, 119, P[0]))); }
      rect(68, 127, 73, 132, hex('#8a8e96')); rect(68, 127, 68, 132, hex('#b8bcc4')); for (const [fx, fy, c] of [[67, 124, '#e8d040'], [70, 122, '#f0f0e8'], [73, 124, '#c84a8a'], [71, 125, '#3a7a3a']]) { pset(fx, fy, hex(c)); pset(fx, fy + 1, hex('#3a6a34')); }
      linea(250, 108, 258, 116, hex('#d8d0b0')); linea(258, 108, 250, 116, hex('#d8d0b0')); linea(247, 112, 252, 109, hex('#8a8e9a'));
      // los postes del porche
      for (const px of [16, 300]) { rect(px, 88, px + 5, 168, P[1]); rect(px, 88, px + 1, 168, P[0]); rect(px + 4, 88, px + 5, 168, P[3]); for (let y = 95; y < 166; y += 9) pset(px + 2, y, P[2]); }
      // el suelo del porche en perspectiva, el borde y los escalones; la tierra
      p_tierra(R, 0, 168, 319, 179, p_h('#8a7c6a #6a5e50 #4e443a #26242a'), 66);
      let y = 160, f = 0; while (y < 168) { const al = f + 2; for (let j = 0; j < al && y + j < 168; j++) for (let x = 6; x < 314; x++) B[(y + j) * 320 + x] = j === al - 1 || (x + f * 23) % 47 === 0 ? P[3] : j === 0 ? P[0] : h(x >> 2, f, 67) < 0.3 ? P[2] : P[1]; y += al; f++; }
      rect(6, 168, 314, 169, P[3]); for (let k = 0; k < 2; k++) { rect(128 - k * 4, 170 + k * 5, 192 + k * 4, 172 + k * 5, P[1]); rect(128 - k * 4, 170 + k * 5, 192 + k * 4, 170 + k * 5, P[0]); rect(128 - k * 4, 173 + k * 5, 192 + k * 4, 174 + k * 5, P[3]); }
      // la tina con la tabla de lavar, el banco con la palangana y la toalla, la escoba, el cubo del carbón y las botas
      rect(26, 146, 54, 160, hex('#5a6068')); rect(26, 146, 54, 147, hex('#9aa0a8')); for (let x = 28; x < 54; x += 3) rect(x, 148, x, 159, hex('#4a5058')); rect(28, 148, 52, 149, hex('#6a8aa0'));
      rect(46, 132, 54, 150, hex('#a88a5a')); for (let yy = 134; yy < 148; yy += 2) rect(47, yy, 53, yy, hex('#8a8e96'));
      rect(232, 146, 284, 148, P[0]); rect(232, 148, 284, 148, P[3]); for (const lx of [236, 280]) rect(lx, 149, lx + 2, 160, P[2]);
      R.disco(250, 144, 6, hex('#8a8e96')); rect(244, 144, 256, 146, hex('#5a6068')); rect(246, 141, 254, 142, hex('#9ab8c8')); rect(262, 136, 270, 147, hex('#d8d0c0')); rect(262, 136, 270, 137, hex('#e8e2d4')); for (let yy = 139; yy < 147; yy += 3) rect(262, yy, 270, yy, hex('#a85a4a'));
      linea(112, 120, 118, 160, hex('#8a6a3a')); linea(113, 120, 119, 160, hex('#a8845a')); for (let i = -4; i <= 4; i++) linea(118, 154, 118 + i, 162, hex('#c8a860'));
      rect(186, 150, 196, 160, hex('#3a3a42')); rect(186, 150, 196, 151, hex('#6a6a74')); for (let i = 0; i < 4; i++) disco(188 + i * 2, 149, 1, hex('#1a1a20'));
      for (const bx of [200, 206]) { rect(bx, 152, bx + 3, 159, hex('#4a3426')); rect(bx, 158, bx + 5, 160, hex('#3a2a1e')); }
      return dat;
    }
    // ─ general ─
    p_montes(R, 64, 26, p_h('#9096ae #7a809a #646a84'), 2.2, 110);
    const alt = p_montes(R, 82, 18, p_h('#6a7860 #546250 #3c4838'), 5.5, 110, { arboles: true, pinos: true });
    dat.mina = p_minaFija(R, 96, Math.round(alt(110)) + 6, 0.8);
    // el camino que baja de la mina en zigzag
    dat.camino = [[112, alt(112) + 5], [150, alt(150) + 9], [128, 92], [176, 100]].map(([x, y]) => [x, Math.round(y)]);
    for (let k = 0; k < 3; k++) { const [a, b] = [dat.camino[k], dat.camino[k + 1]]; linea(a[0], a[1], b[0], b[1], hex('#a8987e')); linea(a[0], a[1] + 1, b[0], b[1] + 1, hex('#7a6c58')); }
    // la fila de casas de atrás
    for (let k = 0; k < 11; k++) { const x = -12 + k * 31; if (x > 260 && x < 300) continue; const c = p_casa(R, x, 104, 26, 15, k + 4, { noche, plano: k % 3 === 1 }, luces).chimenea; if (k % 3 === 0) dat.chims.push(c); }
    // la calle de barro: roderas, piedras, polvo de carbón y charcos que reflejan el cielo
    p_tierra(R, 0, 126, 319, 179, p_h('#8a7c6a #6a5e50 #4e443a #26242a'), 71);
    for (const [ry, a] of [[146, 1], [151, 1], [166, 2], [173, 2]]) for (let x = 0; x < 320; x++) for (let j = 0; j < a; j++) { const yy = ry + j + Math.round(Math.sin(x * 0.03 + ry) * 1.2); B[yy * 320 + x] = p_mez(B[yy * 320 + x], hex('#3a3028'), 0.45); }
    dat.charcos = [[92, 150, 15, 3], [212, 170, 20, 4], [296, 141, 10, 2], [30, 172, 12, 3]];
    for (const [cx, cy, rx, ry] of dat.charcos) for (let yy = cy - ry; yy <= cy + ry; yy++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2; if (e > 1) continue; B[yy * 320 + x] = e > 0.7 ? hex('#3a3028') : (yy - cy + ry) < ry * 0.8 ? cie.g[2] : cie.g[3]; }
    // las casas de delante, con porche; la del centro (la de Haymitch) con la puerta abierta
    const casas = [[-6, 54, 0], [60, 52, 1], [124, 62, 2], [198, 54, 3], [264, 58, 4]], cor = [hex('#a89a7a'), hex('#8a9ab0'), hex('#b08a7a'), hex('#9aa088'), hex('#a8a0b0')];
    dat.casas = casas.map(([x, w, k]) => { const c = p_casa(R, x, 128, w, 36, k, { noche, porche: true, abierta: k === 2, cegada: k === 3, cortina: cor[k] }, luces); dat.chims.push(c.chimenea); return c; });
    // entre las casas: leña apilada, un barril de lluvia, una valla de tablas
    for (const [x0, k] of [[50, 0], [114, 1], [186, 2], [254, 3]]) { if (k % 2) { p_tablas(R, x0, 112, x0 + 9, 127, p_MAD[k], 72 + k, { ancho: 3 }); }
      else { for (let j = 0; j < 4; j++) for (let i = 0; i < 4 - (j >> 1); i++) { disco(x0 + 2 + i * 3 + (j % 2), 125 - j * 3, 1.5, hex('#7a5a3a')); pset(x0 + 2 + i * 3 + (j % 2), 125 - j * 3, hex('#c8a070')); } } }
    rect(118, 116, 124, 128, hex('#5a4a3a')); rect(118, 116, 124, 116, hex('#2a3a4a')); rect(118, 120, 124, 120, hex('#3a3a42')); rect(118, 125, 124, 125, hex('#3a3a42'));
    // los postes de los faroles y los de los tendederos
    for (const fx of [116, 256]) { rect(fx, 96, fx + 2, 140, hex('#5a4a3a')); rect(fx, 96, fx, 140, hex('#8a7458')); rect(fx, 98, fx + 9, 99, hex('#5a4a3a')); }
    for (const tx of [6, 100, 206, 300]) { rect(tx, 101, tx + 1, 132, hex('#6a5a48')); rect(tx, 101, tx, 132, hex('#8a7a64')); }
    p_bomba(R, 286, 152); p_carrito(R, 22, 160);
    return dat;
  },
  vivo(R, t, cam, luz, ant, o, tn, F) {
    const d = F.dat, enc = luz !== 'dia';
    p_minaVivo(R, t, d.mina, tn);
    for (const c of d.chims) if (c[0] > 0 && c[0] < 320) p_humo(R, c[0], c[1], t + c[0] * 0.13, tn, { n: 5, alto: 20, viento: 12, r: 1, crece: 3, v: 0.12 });
    if (cam === 'puerta') {
      p_tendedero(R, 22, 92, 136, 94, t, tn, 3, { comba: 4 });
      p_farol(R, 196, 89, t, enc, tn, 1);
      for (let k = 0; k < 4; k++) { const fl = 0.85 + 0.15 * Math.sin(t * 9 + k); if (k === 0) p_halo(R, 166, 137, 10, hex('#ff9a40'), 0.35 * fl); }
      p_halo(R, 152, 124, 6, hex('#fff0b0'), 0.4 + 0.1 * Math.sin(t * 11));
      // dentro: chispas de la estufa (recortadas al hueco de la puerta)
      for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k / 3) % 1, x = Math.round(166 + Math.sin(u * 7 + k) * 2), y = Math.round(132 - u * 10); if (y > 104) R.pset(x, y, u < 0.5 ? hex('#ffd060') : hex('#c86a30')); }
      p_gallina(R, 40, 177, t, 0, tn, 0, 14); p_gallina(R, 268, 178, t, 1, tn, 1, 16); p_gallina(R, 176, 171, t, 2, tn, 2, 5);
      // el gato en el alféizar de la ventana derecha, que mueve la cola
      { const { rect, pset } = R, x = 278, y = 133, c = tn(hex('#5a5058')), cola = Math.round(Math.sin(t * 2) * 2); rect(x, y - 5, x + 6, y - 1, c); rect(x + 5, y - 8, x + 9, y - 4, c); pset(x + 5, y - 9, c); pset(x + 9, y - 9, c); pset(x + 7, y - 6, tn(hex('#c8d040'))); for (let i = 0; i < 4; i++) pset(x - 1 - i, y - 2 + Math.round(cola * i / 4), c); }
      p_polvo(R, t, 120, 200, 104, 166, 12, hex('#ffe0a0'), 4);
      return { suelo: 164, libre: [60, 260], puerta: [146, 174, 104], ventanas: [[58, 106, 94, 132], [226, 106, 262, 132]], escalones: [128, 192, 170], banco: [232, 284, 146], farol: [196, 92] };
    }
    // ─ general ─
    // mineros pequeños que suben al pozo por el camino, con su lámpara y su fiambrera
    const cam_ = d.camino, L = [0, 1, 2].map((k) => Math.hypot(cam_[k + 1][0] - cam_[k][0], cam_[k + 1][1] - cam_[k][1])), tot = L[0] + L[1] + L[2];
    for (let k = 0; k < 3; k++) { let s = (1 - ((t * 0.02 + k / 3) % 1)) * tot, i = 0; while (i < 2 && s > L[i]) { s -= L[i]; i++; } const u = Math.min(1, s / L[i]), x = cam_[i][0] + (cam_[i + 1][0] - cam_[i][0]) * u, y = cam_[i][1] + (cam_[i + 1][1] - cam_[i][1]) * u;
      p_figura(R, Math.round(x), Math.round(y), t, p_GENTE[k], { alto: 5, anda: true, dir: cam_[i + 1][0] > cam_[i][0] ? -1 : 1, tn, casco: true }); }
    p_tendedero(R, 7, 103, 100, 105, t, tn, 1, { comba: 4 }); p_tendedero(R, 207, 104, 300, 106, t + 1, tn, 2, { comba: 4 });
    for (const fx of [124, 264]) p_farol(R, fx, 99, t, enc, tn, fx, 0.9);
    const pu = d.casas[2].puerta; p_halo(R, (pu[0] + pu[1]) / 2, 124, 14, hex('#f0a050'), 0.35 + 0.05 * Math.sin(t * 9));
    // el minero que cruza por delante de las casas camino del pozo
    { const u = ((t * 11) % 420) - 50; p_figura(R, Math.round(u), 133, t, p_GENTE[1], { alto: 12, anda: true, dir: 1, tn, casco: true, carga: true }); }
    // el gato en el tejado
    { const { rect, pset } = R, x = 82, y = 89, c = tn(hex('#3a3238')), cola = Math.round(Math.sin(t * 1.8) * 2); rect(x, y - 4, x + 5, y - 1, c); rect(x + 4, y - 7, x + 7, y - 4, c); pset(x + 4, y - 8, c); pset(x + 7, y - 8, c); pset(x + 6, y - 6, tn(hex('#c8d040'))); for (let i = 0; i < 4; i++) pset(x - 1 - i, y - 2 - Math.round(cola * i / 4), c); }
    // vecinas en los porches: una barre, otra sacude una alfombra
    p_figura(R, 34 + Math.round(Math.sin(t * 0.6) * 4), 126, t, p_GENTE[4], { alto: 14, tn, dir: 1, brazo: 'arriba', pañuelo: hex('#8a3a3a') });
    { const x = 224, sac = Math.sin(t * 6) > 0; p_figura(R, x, 126, t, p_GENTE[2], { alto: 14, tn, dir: -1, pañuelo: hex('#5a6a80') }); R.rect(x - 12, 113 + (sac ? 0 : 1), x - 4, 118 + (sac ? 0 : 1), tn(hex('#8a4a3a'))); for (let i = 0; i < 4; i++) R.pset(x - 12 + i * 2, 116 + (sac ? 0 : 1), tn(hex('#c8a040'))); if (sac) for (let k = 0; k < 4; k++) R.pset(x - 14 - k * 2 - Math.round((t * 8) % 3), 112 + k, tn(hex('#b8aa98'))); }
    p_cabra(R, 262, 160, t, tn, 1);
    p_gallina(R, 44, 148, t, 0, tn, 0, 12); p_gallina(R, 100, 170, t, 1, tn, 1, 14); p_gallina(R, 226, 150, t, 2, tn, 2, 10); p_gallina(R, 186, 176, t, 3, tn, 0, 16);
    // los charcos tiemblan: brillos que corren
    for (const [cx, cy, rx] of d.charcos) for (let k = 0; k < 2; k++) { const x = Math.round(cx - rx + 2 + ((t * 5 + k * rx) % (rx * 2 - 4))); R.pset(x, cy - 1 + k, hex('#ffffff')); R.pset(x + 1, cy - 1 + k, tn(hex('#e8eef4'))); }
    p_polvo(R, t, 0, 320, 130, 178, 14, tn(hex('#3a3a40')), 2);
    return { suelo: 160, libre: [60, 236], puerta: [pu[0], pu[1], pu[2]], porche: 128, casas: d.casas.map((c) => c.puerta), cabra: [262, 160], bomba: [286, 152], carrito: [22, 160] };
  },
};

// un puesto del mercado (x0–x1, base: el suelo): toldo de rayas festoneado, postes, mostrador, género en estantes y
// colgado; tipo 0 hierbas y tarros, 1 pieles y ristras, 2 velas y telas, 3 cacharros
function p_puesto(R, x0, x1, base, tipo, luces) {
  const { rect, pset, disco, linea } = R, top = base - 52, cols = [p_h('#a85a4a #e8d8b8'), p_h('#c8a050 #6a5a48'), p_h('#5a7a9a #d8d0c0'), p_h('#6a8a5a #c8b890')][tipo];
  for (let y = top; y < top + 9; y++) for (let x = x0 - 2; x <= x1 + 2; x++) R.pset(x, y, Math.floor((x - x0) / 5) % 2 ? cols[1] : cols[0]);
  rect(x0 - 2, top, x1 + 2, top, p_mez(cols[0], C.blanco, 0.3)); for (let x = x0 - 2; x <= x1 + 2; x++) { const u = (x - x0 + 2) % 8; if (u > 0 && u < 7) pset(x, top + 9, Math.floor((x - x0) / 5) % 2 ? cols[1] : cols[0]); if (u > 1 && u < 6) pset(x, top + 10, p_mez(cols[0], C.k, 0.3)); }
  for (const px of [x0, x1 - 1]) { rect(px, top + 9, px + 1, base, hex('#5a4434')); pset(px, top + 9, hex('#8a6a4c')); }
  rect(x0 + 2, top + 22, x1 - 2, top + 23, hex('#6a5038')); rect(x0 + 2, top + 32, x1 - 2, top + 33, hex('#6a5038'));
  // el género de los estantes
  for (let x = x0 + 4; x < x1 - 4; x += 5) { const q = h(x, tipo, 101), y = top + 21, y2 = top + 31;
    if (tipo === 0 || (tipo === 2 && q < 0.4)) { const c = [hex('#c8902a'), hex('#6a8a3a'), hex('#8a2a3a'), hex('#d8c8a0')][Math.floor(q * 4)]; rect(x, y - 5, x + 3, y, hex('#8aa0a8')); rect(x, y - 3, x + 3, y, c); pset(x + 1, y - 4, C.blanco); rect(x, y - 6, x + 3, y - 6, hex('#8a6a4c')); }
    else if (tipo === 2) { rect(x + 1, y - 6, x + 2, y, hex('#f0e8d0')); pset(x + 1, y - 7, hex('#2a2a2a')); luces.push(() => { pset(x + 1, y - 8, hex('#ffd060')); pset(x + 1, y - 9, hex('#fff2b0')); }); }
    else if (tipo === 1) { rect(x, y - 4, x + 3, y, hex('#9a7a5a')); pset(x + 1, y - 4, hex('#c8a07a')); }
    else { disco(x + 2, y - 3, 2.5, [hex('#6a7078'), hex('#8a5a3a'), hex('#4a5a6a')][Math.floor(q * 3)]); pset(x + 1, y - 4, hex('#c8ccd4')); }
    const c2 = [hex('#a8946e'), hex('#c8b48e'), hex('#7a6a4e')][Math.floor(h(x, 3, 102) * 3)]; rect(x, y2 - 4, x + 3, y2, c2); rect(x, y2 - 4, x + 3, y2 - 4, p_mez(c2, C.blanco, 0.3)); }
  // lo colgado del toldo: manojos de hierbas, ristras de cebollas, pieles
  for (let x = x0 + 5; x < x1 - 4; x += 7) { const q = h(x, tipo, 103);
    if (tipo === 1 && q < 0.5) { rect(x, top + 10, x + 4, top + 18, hex('#8a6a4a')); rect(x, top + 10, x + 4, top + 10, hex('#5a4030')); pset(x + 1, top + 12, hex('#b8946a')); pset(x + 4, top + 18, hex('#6a4e34')); }
    else { linea(x + 2, top + 10, x + 2, top + 13, hex('#6a5038')); for (let j = 0; j < 5; j++) { pset(x + 1 + (j % 3), top + 13 + j, tipo === 1 ? hex('#c89a5a') : j % 2 ? hex('#4a6a3a') : hex('#6a8a4a')); pset(x + (j % 2) * 3, top + 14 + j, tipo === 1 ? hex('#a87a3a') : hex('#3a5a2e')); } } }
  // el mostrador (se guarda para taparle las piernas al vendedor)
  p_tablas(R, x0 + 1, base - 10, x1 - 1, base, p_h('#9a7a5a #7a5e44 #5a4432 #3a2c20'), 104 + tipo, { ancho: 4 });
  rect(x0, base - 12, x1, base - 10, hex('#a8845a')); rect(x0, base - 12, x1, base - 12, hex('#c8a47a')); rect(x0, base - 9, x1, base - 9, hex('#3a2c20'));
  for (let x = x0 + 4; x < x1 - 4; x += 9) { const q = h(x, tipo, 105); if (q < 0.4) { rect(x, base - 16, x + 5, base - 13, hex('#a8845a')); for (let i = 0; i < 5; i++) pset(x + i, base - 16, hex('#c8a47a')); pset(x + 1, base - 17, hex('#e8e0d0')); pset(x + 3, base - 17, hex('#d8a060')); } else if (q < 0.7) { rect(x, base - 15, x + 2, base - 13, hex('#8aa0a8')); pset(x, base - 15, C.blanco); } }
}

const p_QUEMADOR = {
  camaras: ['general', 'puesto'],
  cielo: () => null,
  fijo(R, cam, luz, ant, luces) {
    const { rect, pset, linea, poligono, disco } = R, B = R.buf, dat = {}, cie = p_CIE[luz];
    const ladrillo = p_h('#7a4a3e #5a3830 #3e2620 #241614'), viga = hex('#3a2a20'), vigaL = hex('#5a4434');
    // el techo de tablas oscuras y las cerchas
    p_tablas(R, 0, 0, 319, 30, p_h('#4a3a30 #3a2e26 #2a201a #1a1410'), 110, { horiz: true, ancho: 5, mugre: 0 });
    // los ventanucos altos con el cielo del amanecer, cristales sucios y alguno tapado con una tabla
    const ventanas = cam === 'puesto' ? [[20, 36, 60, 54]] : [[30, 34, 72, 54], [136, 34, 178, 54], [214, 34, 256, 54]];
    p_piedra(R, 0, 31, 319, cam === 'puesto' ? 140 : 124, ladrillo, 8, 4, 111, { hollin: true });
    for (const [a, b, c, d] of ventanas) { rect(a - 2, b - 2, c + 2, d + 2, viga); for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) { const u = (y - b) / (d - b); B[y * 320 + x] = h(x >> 1, y >> 1, 112) < 0.1 ? hex('#6a6a70') : u + p_um(x, y) * 0.3 < 0.6 ? cie.g[3] : cie.g[4]; }
      for (let x = a + 10; x < c; x += 11) rect(x, b, x, d, viga); rect(a, (b + d) >> 1, c, (b + d) >> 1, viga);
      rect(c - 10, b + 1, c - 1, ((b + d) >> 1) - 1, hex('#6a5038')); linea(c - 10, b + 1, c - 1, ((b + d) >> 1) - 1, hex('#4a3828')); }
    for (const x of [0, 80, 160, 240]) { linea(x, 30, x + 40, 6, viga); linea(x + 1, 30, x + 41, 6, vigaL); linea(x + 80, 30, x + 40, 6, viga); rect(x + 39, 6, x + 41, 30, viga); }
    rect(0, 29, 319, 32, viga); rect(0, 29, 319, 29, vigaL);
    // los rayos de luz que entran por los ventanucos (sin teñir: es la luz)
    luces.push(() => { for (const [a, b, c, d] of ventanas) for (let y = d + 2; y < (cam === 'puesto' ? 178 : 168); y++) { const off = (y - d) * 0.55, x0 = Math.round(a + off), x1 = Math.round(c + off + (y - d) * 0.12); for (let x = x0; x <= x1; x++) if (x >= 0 && x < 320 && p_um(x, y) < 0.5) B[y * 320 + x] = p_mez(B[y * 320 + x], hex('#f8e0b0'), 0.16 * (1 - (y - d) / 140)); } });
    if (cam === 'puesto') {
      // el almacén a la izquierda: otro puesto lejos, el suelo
      p_puesto(R, 6, 64, 118, 3, luces);
      p_tierra(R, 0, 119, 319, 179, p_h('#5a4e44 #4a3e36 #342c26 #1a1618'), 113, {});
      for (let k = 0; k < 30; k++) { const x = Math.floor(h(k, 1, 114) * 110), y = 122 + Math.floor(h(k, 2, 114) * 56); linea(x, y, x + 3, y - 1, hex('#a8945a')); }
      // sacos, una caja y la jaula de las gallinas en el lado del almacén
      for (const [x, y] of [[8, 172], [20, 176], [92, 168]]) { disco(x, y - 6, 7, hex('#a8946e')); disco(x - 2, y - 8, 4, hex('#c8b48e')); rect(x - 2, y - 15, x + 2, y - 12, hex('#7a6a4e')); rect(x - 7, y, x + 7, y, hex('#2a2218')); }
      p_tablas(R, 72, 150, 100, 164, p_h('#9a7a5a #7a5e44 #5a4432 #3a2c20'), 119, { horiz: true, ancho: 4, mugre: 0 }); rect(72, 150, 100, 150, hex('#c8a47a'));
      rect(76, 132, 98, 149, hex('#2a2018')); for (let x = 77; x < 98; x += 3) rect(x, 133, x, 148, hex('#8a6a4c')); rect(76, 132, 98, 133, hex('#a8845a')); rect(76, 148, 98, 149, hex('#6a4a34'));
      dat.jaula = [87, 147];
      // el puesto de cerca: postes, pared de tablas, estantes, tarros, velas, hierbas y dos pieles
      p_tablas(R, 116, 62, 312, 150, p_h('#8a6e54 #6a543e #4a3a2c #2e241a'), 115, { ancho: 7, mugre: 4 });
      for (const sy of [86, 110]) { rect(118, sy, 310, sy + 2, hex('#a8845a')); rect(118, sy, 310, sy, hex('#c8a47a')); rect(118, sy + 3, 310, sy + 3, hex('#3a2c20')); for (const bx of [130, 220, 296]) { linea(bx, sy + 3, bx + 4, sy + 8, hex('#5a4432')); } }
      const tarros = [['#c8902a', 8, 10], ['#6a8a3a', 7, 12], ['#8a2a3a', 6, 8], ['#d8c8a0', 9, 11], ['#a85a2a', 7, 9], ['#4a6a3a', 8, 13]];
      for (const [sy, sem] of [[86, 0], [110, 1]]) for (let x = 122, k = 0; x < 276; k++) { const [c, w, a] = tarros[(k + sem * 2) % 6], q = h(k, sem, 116);
        if (q < 0.18) { rect(x + 1, sy - 9, x + 2, sy - 1, hex('#f0e8d0')); rect(x + 1, sy - 9, x + 1, sy - 1, hex('#ffffff')); pset(x + 1, sy - 10, hex('#2a2a2a')); const xx = x; luces.push(() => { pset(xx + 1, sy - 11, hex('#ffd060')); pset(xx + 1, sy - 12, hex('#fff2b0')); pset(xx + 2, sy - 11, hex('#e8a040')); }); x += 6; continue; }
        if (q > 0.85) { rect(x, sy - 6, x + 9, sy - 1, hex('#8a6a4c')); rect(x, sy - 6, x + 9, sy - 6, hex('#a8845a')); pset(x + 2, sy - 4, hex('#3a2c20')); x += 12; continue; }
        rect(x, sy - a, x + w, sy - 1, hex('#9ab0b8')); rect(x + 1, sy - a + 3, x + w - 1, sy - 1, hex(c)); rect(x + 1, sy - a + 3, x + 1, sy - 2, p_mez(hex(c), C.blanco, 0.35)); rect(x + w - 1, sy - a + 3, x + w - 1, sy - 2, p_mez(hex(c), C.k, 0.3));
        rect(x, sy - a - 2, x + w, sy - a, hex('#8a6a4c')); rect(x + 1, sy - a - 2, x + w - 1, sy - a - 2, hex('#e8e0d0')); pset(x + 2, sy - a + 1, C.blanco); x += w + 3; }
      for (let x = 124; x < 272; x += 10) { linea(x + 3, 63, x + 3, 67, hex('#6a5038')); for (let j = 0; j < 9; j++) { pset(x + 2 + (j % 3), 67 + j, j % 2 ? hex('#4a6a3a') : hex('#7a9a4a')); pset(x + 1 + ((j + 1) % 4), 68 + j, hex('#3a5a2e')); if (j > 5 && (x / 10) % 2) pset(x + 3, 68 + j, hex('#c8a040')); } }
      for (const [px, c, cS] of [[280, hex('#a88a6a'), hex('#7a5e44')], [296, hex('#d8d0c0'), hex('#a8a090')]]) { rect(px + 4, 64, px + 5, 67, hex('#3a2c20')); poligono([[px, 68], [px + 10, 68], [px + 11, 92], [px + 8, 100], [px + 2, 100], [px - 1, 92]], c);
        for (let y = 70; y < 98; y += 3) R.linea(px + 1, y, px + 9, y + 1, cS); rect(px + 3, 100, px + 7, 104, cS); }
      // el toldo de rayas (el festón ondea en vivo), los postes
      for (let y = 44; y < 60; y++) for (let x = 106; x < 320; x++) B[y * 320 + x] = Math.floor((x - 106) / 9) % 2 ? hex('#d8c8a8') : hex('#9a4a3e');
      for (let x = 106; x < 320; x++) { B[44 * 320 + x] = hex('#6a3a30'); if (p_um(x, 50) < 0.3) B[50 * 320 + x] = p_mez(B[50 * 320 + x], C.k, 0.2); }
      for (const px of [110, 312]) { rect(px, 44, px + 4, 150, hex('#5a4434')); rect(px, 44, px + 1, 150, hex('#8a6a4c')); }
      return dat;
    }
    // ─ general ─
    p_tierra(R, 0, 124, 319, 179, p_h('#5a4e44 #4a3e36 #342c26 #1a1618'), 117, {});
    for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 1, 118) * 320), y = 126 + Math.floor(h(k, 2, 118) * 54); linea(x, y, x + 2 + (k % 3), y - (k % 2), hex('#a8945a')); }
    // los pilares de madera
    for (const px of [100, 216]) { rect(px, 30, px + 4, 128, hex('#4a3a2c')); rect(px, 30, px + 1, 128, hex('#6a5440')); rect(px - 2, 126, px + 6, 128, hex('#2a2018')); }
    // los cuatro puestos del fondo
    [[6, 66], [72, 128], [192, 250], [256, 314]].forEach(([a, b], k) => p_puesto(R, a, b, 124, k, luces));
    dat.mostradores = [[6, 66], [72, 128], [192, 250], [256, 314]].map(([a, b]) => [a, 112, b, 124]);
    // cajas, sacos y barriles delante
    for (const [x, y, w, a] of [[0, 152, 22, 14], [10, 140, 18, 12], [2, 166, 30, 14]]) { p_tablas(R, x, y, x + w, y + a, p_h('#9a7a5a #7a5e44 #5a4432 #3a2c20'), x + y, { horiz: true, ancho: 4, mugre: 0 }); rect(x, y, x + w, y, hex('#c8a47a')); rect(x, y, x, y + a, hex('#3a2c20')); }
    for (const [x, y] of [[36, 170], [46, 174]]) { disco(x, y, 6, hex('#a8946e')); disco(x - 1, y - 2, 4, hex('#c8b48e')); rect(x - 2, y - 7, x + 1, y - 5, hex('#7a6a4e')); }
    for (const [x, y] of [[292, 150], [306, 158], [296, 170]]) { rect(x - 6, y - 14, x + 6, y, hex('#6a4a34')); for (let i = -6; i <= 6; i += 3) rect(x + i, y - 14, x + i, y, hex('#4a3426')); rect(x - 6, y - 13, x + 6, y - 12, hex('#3a3a42')); rect(x - 6, y - 4, x + 6, y - 3, hex('#3a3a42')); rect(x - 5, y - 14, x + 5, y - 14, hex('#8a6a4c')); rect(x - 4, y - 14, x - 3, y, hex('#8a6a4c')); }
    // el trípode de la olla
    linea(226, 148, 238, 122, hex('#2a2a30')); linea(250, 148, 238, 122, hex('#2a2a30')); linea(238, 122, 238, 150, hex('#2a2a30'));
    for (let i = 0; i < 6; i++) { rect(228 + i * 3, 147, 230 + i * 3, 149, hex('#3a2a20')); pset(229 + i * 3, 147, hex('#6a4a30')); }
    return dat;
  },
  vivo(R, t, cam, luz, ant, o, tn, F) {
    const { rect, pset, disco } = R, d = F.dat;
    if (cam === 'puesto') {
      // el festón del toldo que ondea
      for (let x = 106; x < 320; x++) { const u = (x - 106) % 12, ond = Math.round(Math.sin(t * 3 + x * 0.15) * 1); if (u > 0 && u < 11) for (let j = 0; j < 4 - Math.abs(u - 5.5) / 2; j++) pset(x, 60 + j + ond, Math.floor((x - 106) / 9) % 2 ? tn(hex('#d8c8a8')) : tn(hex('#9a4a3e'))); pset(x, 60 + ond, tn(hex('#6a3a30'))); }
      p_farol(R, 132, 64, t, true, tn, 2);
      // compradores que pasan por el fondo del almacén
      for (let k = 0; k < 2; k++) { const x = ((t * (8 + k * 3) + k * 70) % 160) - 30; if (x < 104) p_figura(R, Math.round(x), 126 + k * 4, t, p_GENTE[k + 2], { alto: 11 + k, anda: true, dir: 1, tn, pañuelo: k ? hex('#8a3a3a') : null }); }
      p_figura(R, 34, 116, t, p_GENTE[0], { alto: 11, tn, brazo: 'arriba' }); p_restaura(R, F, 6, 108, 64, 118);
      p_polvo(R, t, 20, 120, 60, 170, 14, hex('#f8e0b0'), 5);
      p_gallina(R, d.jaula[0], d.jaula[1], t, 1, tn, 1, 6); p_restaura(R, F, 76, 132, 98, 133); for (let x = 77; x < 98; x += 3) R.rect(x, 134, x, 147, tn(hex('#8a6a4c')));
      for (let k = 0; k < 3; k++) { const x = 160 + k * 46, y = 84; if (Math.sin(t * 7 + k * 2) > 0.3) pset(x, y, hex('#ffffff')); }
      return { suelo: 170, sueloVendedora: 150, mostrador: [116, 316, 140], vendedora: [176, 280], chica: [24, 104], farol: [132, 70], estantes: [86, 110] };
    }
    // ─ general ─
    for (const [k, fx] of [[0, 108], [1, 196], [2, 262]]) { R.linea(fx, 32, fx, 38, tn(hex('#2a2a30'))); p_farol(R, fx, 38, t, true, tn, k, 1.1); }
    // los vendedores pequeños detrás de sus mostradores
    [[34, 0], [100, 2], [220, 1], [286, 3]].forEach(([x, k], i) => p_figura(R, x + Math.round(Math.sin(t * 0.5 + i) * 6), 116, t, p_GENTE[k], { alto: 16, tn, dir: Math.sin(t * 0.5 + i) > 0 ? 1 : -1, brazo: i % 2 ? 'arriba' : null, pañuelo: i === 2 ? hex('#7a3a5a') : null }));
    for (const m of d.mostradores) p_restaura(R, F, m[0], m[1], m[2], m[3]);
    // un comprador que cruza al fondo
    { const x = ((t * 9) % 380) - 30; p_figura(R, Math.round(x), 130, t, p_GENTE[4], { alto: 14, anda: true, dir: 1, tn }); }
    // la olla de la sopa sobre el fuego, con su vapor, y la que la remueve
    for (let k = 0; k < 5; k++) { const fl = Math.sin(t * 13 + k * 2), x = 230 + k * 4, hgt = 4 + Math.round(fl * 2); rect(x, 146 - hgt, x + 2, 146, hex('#e86a2a')); rect(x + 1, 146 - hgt + 2, x + 1, 146, hex('#ffd060')); }
    disco(238, 137, 9, tn(hex('#2a2a30'))); rect(229, 128, 247, 137, tn(hex('#2a2a30'))); rect(229, 128, 247, 129, tn(hex('#5a5a66'))); rect(230, 129, 246, 130, tn(hex('#8a6a3a'))); pset(233, 131, tn(hex('#5a5a66')));
    p_halo(R, 238, 144, 18, hex('#f89040'), 0.35 + 0.1 * Math.sin(t * 9));
    p_humo(R, 238, 126, t, (c) => c, { n: 6, alto: 34, viento: 8, r: 1.2, crece: 3.5, v: 0.22, cols: [hex('#8a8078'), hex('#b8b0a8'), hex('#e0d8d0')] });
    p_figura(R, 258, 152, t, p_GENTE[3], { alto: 18, tn, dir: -1, brazo: 'arriba', pañuelo: hex('#6a6a74') });
    p_polvo(R, t, 30, 300, 40, 170, 22, hex('#f8e0b0'), 6);
    return { suelo: 160, libre: [80, 210], puestos: d.mostradores, olla: [238, 132], faroles: [[108, 44], [196, 44], [262, 44]] };
  },
};

// el mostrador del puesto de cerca (va delante de la vendedora): tablero con vetas, frente de tablas con una tela
// colgada, tarros, una balanza, la bandeja de baratijas que brillan, telas dobladas y una cesta de huevos
p_QUEMADOR.delante = function (R, t, cam, luz, ant, o, tn) {
  if (cam !== 'puesto') return;
  const { rect, pset, disco, linea } = R;
  p_tablas(R, 116, 146, 316, 179, p_h('#9a7a5a #7a5e44 #5a4432 #3a2c20').map(tn), 120, { ancho: 9, mugre: 6 });
  p_tablas(R, 112, 140, 318, 145, p_h('#c8a47a #a8845a #7a5e44 #4a3a2c').map(tn), 121, { horiz: true, ancho: 3, mugre: 0 });
  rect(112, 140, 318, 140, tn(hex('#e0c094'))); rect(112, 146, 318, 146, tn(hex('#2a2018')));
  // la tela colgada por delante, con un dibujo de rombos (sin letras) y flecos que se mecen
  for (let y = 147; y < 172; y++) for (let x = 196; x <= 262; x++) { const u = (Math.abs(((x - 196) % 12) - 6) + Math.abs(((y - 147) % 12) - 6)); pset(x, y, tn(u === 5 ? hex('#e8c860') : u < 3 ? hex('#3a5a7a') : (x - 196) % 5 === 0 ? hex('#6a2e2a') : hex('#8a3a34'))); }
  for (let x = 196; x <= 262; x += 2) { const s = Math.round(Math.sin(t * 2 + x * 0.3)); pset(x + s, 172, tn(hex('#e8c860'))); pset(x + s, 173, tn(hex('#c8a040'))); }
  // los tarros del mostrador
  for (const [x, c, a] of [[122, '#c8902a', 12], [133, '#8a2a3a', 9], [142, '#6a8a3a', 14], [154, '#d8c8a0', 10]]) { rect(x, 139 - a, x + 8, 139, tn(hex('#9ab0b8'))); rect(x + 1, 142 - a, x + 7, 139, tn(hex(c))); rect(x + 1, 142 - a, x + 1, 138, tn(p_mez(hex(c), C.blanco, 0.4))); rect(x, 137 - a, x + 8, 139 - a, tn(hex('#8a6a4c'))); rect(x + 1, 137 - a, x + 7, 137 - a, tn(hex('#e8e0d0'))); pset(x + 2, 140 - a, hex('#ffffff')); }
  // la balanza de platillos
  rect(176, 120, 177, 139, tn(hex('#8a6420'))); rect(167, 120, 186, 120, tn(hex('#c89a40'))); const bal = Math.round(Math.sin(t * 0.8) * 1.5);
  for (const [px, dy] of [[168, bal], [185, -bal]]) { linea(px - 3, 130 + dy, px, 121, tn(hex('#8a6420'))); linea(px + 3, 130 + dy, px, 121, tn(hex('#8a6420'))); rect(px - 4, 130 + dy, px + 4, 131 + dy, tn(hex('#c89a40'))); }
  rect(172, 138, 181, 139, tn(hex('#5a4030')));
  // la bandeja de baratijas: botones, una llavecita, alfileres, un dedal; brillan de vez en cuando
  rect(194, 135, 228, 139, tn(hex('#6a4a34'))); rect(194, 135, 228, 135, tn(hex('#a8845a'))); rect(195, 136, 227, 138, tn(hex('#3a2a20')));
  for (let k = 0; k < 9; k++) { const x = 197 + k * 3.4 | 0, c = [hex('#c8c8d0'), hex('#c89a40'), hex('#8a3a3a'), hex('#e8e0d0'), hex('#4a6a8a')][k % 5]; pset(x, 137, tn(c)); pset(x + 1, 137 - (k % 2), tn(c)); if (Math.sin(t * 3 + k * 1.9) > 0.92) { pset(x, 136, hex('#ffffff')); pset(x - 1, 137, hex('#fff8d0')); pset(x + 1, 137, hex('#fff8d0')); } }
  // las telas dobladas y la cesta de huevos
  for (let k = 0; k < 4; k++) { const c = [hex('#c8b098'), hex('#7a8ab0'), hex('#a85a4a'), hex('#d8d4c8')][k]; rect(236, 136 - k * 4, 262, 139 - k * 4, tn(c)); rect(236, 136 - k * 4, 262, 136 - k * 4, tn(p_mez(c, C.blanco, 0.3))); rect(262, 136 - k * 4, 262, 139 - k * 4, tn(p_mez(c, C.k, 0.3))); }
  for (let i = 0; i < 26; i++) for (let j = 0; j < 9; j++) { const x = 274 + i, y = 131 + j; if (Math.abs(i - 13) > 13 - j * 0.4) continue; pset(x, y, tn((i + j) % 3 ? hex('#a8844a') : hex('#7a5a30'))); }
  for (const [ex, ey] of [[279, 129], [284, 128], [289, 129], [294, 130], [282, 127], [291, 127]]) { disco(ex, ey, 2, tn(hex('#f0e8d8'))); pset(ex - 1, ey - 1, hex('#ffffff')); }
  linea(274, 131, 286, 120, tn(hex('#7a5a30'))); linea(286, 120, 299, 131, tn(hex('#7a5a30')));
};

// una casa grande de piedra (x0–x1, suelo, alto de la fachada): sillares claros con esquinas marcadas, dos plantas de
// ventanas blancas con contraventanas y cortinas corridas, la puerta con su porche de columnas, tejado de pizarra a
// cuatro aguas con chimeneas; o.hiedra; o.botellas (el porche lleno de botellas); o.noche (alguna ventana encendida)
function p_casona(R, x0, x1, suelo, alto, sem, o, luces) {
  const { rect, pset, poligono, linea } = R, top = suelo - alto, cx = (x0 + x1) >> 1, rt = top - Math.round(alto * 0.36);
  // el tejado de pizarra con sus hiladas y las chimeneas
  for (const chx of [x0 + 14, x1 - 20]) { rect(chx, rt - 6, chx + 7, top, hex('#8a8070')); p_piedra(R, chx, rt - 6, chx + 7, top, p_SILLAR, 4, 3, sem + 9); rect(chx - 1, rt - 8, chx + 8, rt - 6, hex('#5a5248')); }
  poligono([[x0 - 4, top + 1], [x0 + 18, rt], [x1 - 18, rt], [x1 + 4, top + 1]], (x, y) => { const f = (y - rt) % 3, off = (Math.floor((y - rt) / 3) % 2) * 2; return f === 2 ? hex('#2a2e3a') : (x + off) % 4 === 0 ? hex('#3a3e4c') : h(x >> 2, y, sem) < 0.15 ? hex('#6a7080') : hex('#4a5060'); });
  linea(x0 + 18, rt, x1 - 18, rt, hex('#7a8090')); linea(x0 - 4, top + 1, x0 + 18, rt, hex('#6a7080'));
  rect(x0 - 4, top + 1, x1 + 4, top + 3, hex('#e8e4dc')); rect(x0 - 4, top + 3, x1 + 4, top + 3, hex('#8a8478'));
  p_piedra(R, x0, top + 4, x1, suelo - 1, p_SILLAR, 9, 5, sem);
  for (const ex of [x0, x1 - 5]) for (let y = top + 4; y < suelo; y += 8) { rect(ex, y, ex + 5, y + 3, hex('#f0e8da')); rect(ex, y + 3, ex + 5, y + 3, hex('#a09480')); }
  // las ventanas: dos plantas
  const ventana = (vx, vy, vw, vh, k) => { const cort = [hex('#a88aa0'), hex('#8aa0a8'), hex('#c8b090')][k % 3];
    rect(vx - 4, vy - 1, vx - 2, vy + vh, hex('#3a5a4a')); rect(vx + vw + 2, vy - 1, vx + vw + 4, vy + vh, hex('#3a5a4a')); for (let y = vy; y < vy + vh; y += 2) { pset(vx - 3, y, hex('#2a4236')); pset(vx + vw + 3, y, hex('#2a4236')); }
    rect(vx - 1, vy - 1, vx + vw + 1, vy + vh + 1, hex('#f4f2ec')); rect(vx, vy, vx + vw, vy + vh, cort); for (let x = vx; x <= vx + vw; x += 2) rect(x, vy, x, vy + vh, p_mez(cort, C.k, 0.25));
    rect(vx, vy, vx + vw, vy + 1, hex('#5a6a88')); rect(vx + (vw >> 1), vy, vx + (vw >> 1), vy + vh, hex('#f4f2ec')); rect(vx, vy + (vh >> 1), vx + vw, vy + (vh >> 1), hex('#f4f2ec'));
    rect(vx - 2, vy + vh + 2, vx + vw + 2, vy + vh + 3, hex('#e8e4dc')); rect(vx - 2, vy - 3, vx + vw + 2, vy - 2, hex('#e8e4dc'));
    if (o.noche && h(vx, k, sem) < 0.3) luces.push(() => { rect(vx, vy, vx + vw, vy + vh, hex('#e8b860')); rect(vx + (vw >> 1), vy, vx + (vw >> 1), vy + vh, hex('#f4f2ec')); }); };
  const n = Math.max(2, Math.floor((x1 - x0) / 24)), paso = (x1 - x0 - 12) / n;
  for (let i = 0; i < n; i++) { const vx = Math.round(x0 + 10 + i * paso + paso / 2 - 5); ventana(vx, top + 9, 10, 12, i); if (Math.abs(vx + 5 - cx) > 12) ventana(vx, top + Math.round(alto * 0.55), 10, 13, i + 1); }
  // la puerta con montante y el porche de columnas con su frontón
  const pw = 12, py = suelo - 22;
  rect(cx - pw / 2 - 1, py - 5, cx + pw / 2 + 1, suelo - 1, hex('#f4f2ec')); rect(cx - pw / 2, py, cx + pw / 2, suelo - 1, hex('#2e4a3a')); rect(cx, py, cx, suelo - 1, hex('#1e3228'));
  for (const dx of [-5, 2]) { rect(cx + dx, py + 3, cx + dx + 3, py + 9, hex('#3a5a48')); rect(cx + dx, py + 12, cx + dx + 3, py + 18, hex('#3a5a48')); }
  rect(cx - pw / 2, py - 4, cx + pw / 2, py - 1, hex('#5a6a88')); for (let x = cx - pw / 2; x <= cx + pw / 2; x += 3) pset(x, py - 2, hex('#f4f2ec')); pset(cx + 3, py + 11, hex('#e8c060'));
  const pa = cx - 16, pb = cx + 16, pt = py - 10;
  for (const px of [pa, pb - 3]) { rect(px, pt, px + 3, suelo - 1, hex('#f4f2ec')); rect(px + 3, pt, px + 3, suelo - 1, hex('#b8b4ac')); rect(px - 1, pt, px + 4, pt + 1, hex('#e8e4dc')); }
  poligono([[pa - 3, pt], [cx, pt - 8], [pb + 3, pt]], hex('#f4f2ec')); linea(pa - 3, pt, cx, pt - 8, hex('#ffffff')); rect(pa - 3, pt, pb + 3, pt + 1, hex('#c8c4bc'));
  for (let k = 0; k < 3; k++) { rect(pa - 2 - k * 2, suelo + k * 2, pb + 2 + k * 2, suelo + 1 + k * 2, k % 2 ? hex('#a8a090') : hex('#c8c0b0')); rect(pa - 2 - k * 2, suelo + k * 2, pb + 2 + k * 2, suelo + k * 2, hex('#e0dace')); }
  // la hiedra que trepa
  if (o.hiedra) for (let k = 0; k < 260; k++) { const x = Math.round(x0 + h(k, 1, sem + 20) ** 1.5 * (x1 - x0) * 0.6), y = Math.round(suelo - h(k, 2, sem + 20) * alto * (1 - (x - x0) / (x1 - x0))); if (y > top + 4) pset(x, y, h(k, 3, sem) < 0.4 ? hex('#3a6a34') : hex('#5a8a44')); }
  // las botellas del porche
  if (o.botellas) for (let k = 0; k < 16; k++) { const bx = Math.round(pa - 10 + h(k, 1, sem + 30) * 52), by = suelo + Math.round(h(k, 2, sem + 30) * 5) - (bx > pa - 3 && bx < pb + 3 ? 0 : 0), c = [hex('#3a6a3a'), hex('#6a4a2a'), hex('#4a7a5a'), hex('#8a8a7a')][k % 4];
    if (k % 5 === 4) { rect(bx - 2, by - 1, bx + 3, by, c); pset(bx + 4, by - 1, c); pset(bx - 1, by - 1, hex('#c8e8c8')); } else { rect(bx, by - 5, bx + 1, by, c); pset(bx, by - 6, c); pset(bx, by - 7, hex('#a88a5a')); pset(bx, by - 4, hex('#c8e8c8')); } }
  return { puerta: [cx - pw / 2, cx + pw / 2, py], chimenea: [x1 - 16, rt - 10], porche: [pa, pb, suelo] };
}

// la hierba crecida del césped: verdes y pajizos con briznas, matas y dientes de león
function p_cesped(R, x0, y0, x1, y1, sem) {
  const B = R.buf, G = p_h('#7a9a4a #5e7e3a #44622c #a8a85a #c8b86a');
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const q = h(x, y >> 1, sem), g = h(x >> 3, y >> 2, sem + 1); let c = g < 0.25 ? G[3] : g > 0.8 ? G[2] : G[1];
    if ((x + (y >> 1)) % 3 === 0 && q < 0.5) c = G[0]; if (q < 0.08) c = G[2]; if (g < 0.12 && q > 0.7) c = G[4]; if (h(x, y, sem + 2) < 0.006) c = hex('#f0d030'); B[y * 320 + x] = c; }
}

// matas de hierba alta que se mecen (por delante del césped), en una fila
function p_matas(R, t, x0, x1, y, n, tn, sem, alto = 6) {
  for (let k = 0; k < n; k++) { const x = Math.round(x0 + h(k, 1, sem) * (x1 - x0)), a = alto + Math.round(h(k, 2, sem) * alto * 0.6), m = Math.sin(t * 1.6 + x * 0.1);
    for (let b = -2; b <= 2; b++) for (let j = 0; j < a - Math.abs(b); j++) R.pset(Math.round(x + b + m * j / a * 2 + b * j * 0.15), y - j, tn(j > a * 0.6 ? hex('#a8b86a') : b % 2 ? hex('#4a6a32') : hex('#6a8a3e'))); }
}

const p_ALDEA = {
  camaras: ['general', 'porche'],
  cielo: (cam, luz) => cam === 'porche' ? { hor: 112, sol: p_sol(luz, { tarde: [300, 96, 7], noche: [300, 56, 5] }), estratos: [[230, 0.35, 80], [250, 0.7, 60]] } : { hor: 90, sol: p_sol(luz, { amanecer: [92, 78, 8], dia: [212, 30, 7], tarde: [250, 72, 9], noche: [218, 26, 6] }) },
  fijo(R, cam, luz, ant, luces) {
    const { rect, pset, poligono, linea, disco } = R, B = R.buf, noche = luz === 'noche', dat = {};
    if (cam === 'porche') {
      p_montes(R, 92, 16, p_h('#9096ae #7a809a #646a84'), 7.1, 120); p_montes(R, 104, 8, p_h('#6a7860 #546250 #3c4838'), 3.3, 120, { arboles: true, pinos: true });
      p_casona(R, 282, 360, 118, 34, 5, { noche }, luces);
      for (const [tx, ty] of [[296, 92], [312, 100]]) { rect(tx, ty, tx + 1, ty + 20, hex('#5a4030')); for (const [dx, dy, r, c] of [[0, -6, 7, '#3a5a2e'], [-2, -8, 5, '#4e7a3a'], [-3, -10, 2, '#7a9a4a']]) disco(tx + dx, ty + dy, r, hex(c)); }
      p_cesped(R, 262, 118, 319, 179, 140);
      // la planta de arriba (sillares), el alero de pizarra y dos ventanas
      poligono([[-10, 31], [2, 18], [256, 18], [268, 31]], (x, y) => (y - 18) % 3 === 2 ? hex('#2a2e3a') : (x + (((y - 18) / 3 | 0) % 2) * 2) % 4 === 0 ? hex('#3a3e4c') : hex('#4a5060'));
      rect(-4, 31, 266, 33, hex('#e8e4dc')); rect(-4, 33, 266, 33, hex('#8a8478'));
      p_piedra(R, 0, 34, 262, 72, p_SILLAR, 12, 6, 141);
      for (const vx of [44, 176]) { rect(vx - 7, 40, vx - 3, 66, hex('#3a5a4a')); rect(vx + 25, 40, vx + 29, 66, hex('#3a5a4a')); for (let y = 41; y < 66; y += 2) { rect(vx - 6, y, vx - 4, y, hex('#2a4236')); rect(vx + 26, y, vx + 28, y, hex('#2a4236')); }
        rect(vx - 2, 38, vx + 24, 67, hex('#f4f2ec')); rect(vx, 40, vx + 22, 65, hex('#a88aa0')); for (let x = vx; x <= vx + 22; x += 2) rect(x, 40, x, 65, hex('#8a6e84')); rect(vx + 11, 40, vx + 11, 65, hex('#f4f2ec')); rect(vx, 52, vx + 22, 52, hex('#f4f2ec')); rect(vx - 3, 67, vx + 25, 69, hex('#e8e4dc')); }
      for (let k = 0; k < 300; k++) { const x = Math.round(h(k, 1, 142) ** 1.4 * 40), y = Math.round(34 + h(k, 2, 142) * 120); if (R.pget(x, y) !== 0) pset(x, y, h(k, 3, 142) < 0.4 ? hex('#3a6a34') : hex('#5a8a44')); }
      // el techo del porche: la viga blanca desconchada
      rect(-2, 72, 270, 81, hex('#ecebe4')); rect(-2, 72, 270, 72, hex('#ffffff')); rect(-2, 80, 270, 81, hex('#a8a49c')); for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 143) * 270), y = 74 + Math.floor(h(k, 2, 143) * 5); rect(x, y, x + 2, y, hex('#b8a888')); }
      rect(-2, 82, 270, 84, hex('#5a5650'));
      // la planta baja: sillares, ventana con contraventanas, la puerta con montante, el aplique
      p_piedra(R, 0, 85, 262, 150, p_SILLAR, 12, 6, 144);
      rect(28, 92, 36, 130, hex('#3a5a4a')); rect(98, 92, 106, 130, hex('#3a5a4a')); for (let y = 93; y < 130; y += 2) { rect(29, y, 35, y, hex('#2a4236')); rect(99, y, 105, y, hex('#2a4236')); } pset(36, 112, hex('#c8a040'));
      rect(37, 90, 97, 131, hex('#f4f2ec')); rect(40, 93, 94, 128, hex('#c8b090')); for (let x = 40; x <= 94; x += 3) rect(x, 93, x, 128, hex('#a8906e')); rect(40, 93, 94, 96, hex('#5a6a88')); rect(67, 93, 67, 128, hex('#f4f2ec')); rect(40, 110, 94, 110, hex('#f4f2ec'));
      rect(34, 131, 100, 134, hex('#e8e4dc')); rect(34, 134, 100, 134, hex('#9a9488'));
      for (let k = 0; k < 5; k++) { const bx = 44 + k * 10, c = [hex('#3a6a3a'), hex('#6a4a2a'), hex('#4a7a5a')][k % 3]; rect(bx, 123, bx + 3, 130, c); rect(bx + 1, 120, bx + 2, 122, c); pset(bx + 1, 119, hex('#a88a5a')); pset(bx, 124, hex('#c8e8c8')); }
      rect(140, 86, 180, 150, hex('#f4f2ec')); rect(141, 87, 179, 87, hex('#ffffff'));
      for (let y = 88; y < 100; y++) for (let x = 144; x <= 176; x++) { const d = Math.hypot(x - 160, (y - 100) * 1.4); if (d < 16) pset(x, y, Math.floor(Math.atan2(y - 100, x - 160) * 4) % 2 ? hex('#5a6a88') : hex('#f4f2ec')); }
      rect(144, 100, 176, 150, hex('#2e4a3a')); rect(160, 100, 160, 150, hex('#1e3228')); for (const dx of [147, 163]) { rect(dx, 104, dx + 10, 120, hex('#3a5a48')); rect(dx, 104, dx + 10, 104, hex('#4a6a58')); rect(dx, 126, dx + 10, 145, hex('#3a5a48')); rect(dx, 126, dx + 10, 126, hex('#4a6a58')); }
      disco(156, 124, 1.5, hex('#e8c060')); disco(164, 124, 1.5, hex('#e8c060')); pset(155, 123, hex('#fff2b0'));
      rect(184, 104, 190, 116, hex('#5a4020')); rect(185, 106, 189, 113, hex('#d8d0a0')); rect(186, 102, 188, 104, hex('#3a2a18')); luces.push((n) => n && (rect(185, 106, 189, 113, hex('#fff0b0')), 0));
      // las columnas del porche
      for (const px of [6, 254]) { rect(px, 84, px + 9, 162, hex('#f0eee6')); rect(px, 84, px + 2, 162, hex('#ffffff')); rect(px + 7, 84, px + 9, 162, hex('#b0aca4')); rect(px - 2, 84, px + 11, 87, hex('#e8e4dc')); rect(px - 2, 158, px + 11, 162, hex('#d8d4cc')); for (let y = 92; y < 156; y += 11) pset(px + 4, y, hex('#c8c0b0')); }
      // el suelo del porche (tablas pintadas de gris, desconchadas), el borde, los escalones; la celosía; el césped
      let y = 150, f = 0; while (y < 162) { const al = 2 + f; for (let j = 0; j < al && y + j < 162; j++) for (let x = 0; x < 270; x++) { let c = j === al - 1 || (x + f * 31) % 53 === 0 ? hex('#4a4e58') : j === 0 ? hex('#a8acb8') : hex('#8a8e9a'); if (h(x >> 1, y + j, 145) < 0.07) c = hex('#a88a6a'); B[(y + j) * 320 + x] = c; } y += al; f++; }
      rect(0, 162, 270, 164, hex('#d8d4cc')); rect(0, 164, 270, 164, hex('#7a7670'));
      p_cesped(R, 0, 165, 319, 179, 146);
      for (let yy = 165; yy < 172; yy++) for (let x = 0; x < 270; x++) if ((x + yy) % 4 === 0 || (x - yy + 400) % 4 === 0) B[yy * 320 + x] = hex('#c8c4bc'); else if (yy < 172) B[yy * 320 + x] = hex('#2a2a26');
      for (let k = 0; k < 3; k++) { rect(124 - k * 4, 165 + k * 5, 196 + k * 4, 168 + k * 5, hex('#c8c0b0')); rect(124 - k * 4, 165 + k * 5, 196 + k * 4, 165 + k * 5, hex('#e8e2d4')); rect(124 - k * 4, 169 + k * 5, 196 + k * 4, 169 + k * 5, hex('#8a8478')); }
      // las botellas por el suelo del porche y una caja con botellas
      for (let k = 0; k < 22; k++) { const bx = k < 12 ? 226 + Math.round(h(k, 1, 147) * 26) : 104 + Math.round(h(k, 1, 147) * 30), by = 152 + Math.round(h(k, 2, 147) * 6), c = [hex('#3a6a3a'), hex('#6a4a2a'), hex('#4a7a5a'), hex('#8a8a7a')][k % 4];
        if (k % 4 === 3) { rect(bx - 3, by - 1, bx + 3, by, c); pset(bx + 4, by - 1, c); pset(bx - 2, by - 1, hex('#c8e8c8')); } else { rect(bx, by - 7, bx + 2, by, c); rect(bx + 1, by - 10, bx + 1, by - 8, c); pset(bx + 1, by - 11, hex('#a88a5a')); pset(bx, by - 6, hex('#c8e8c8')); } }
      p_tablas(R, 22, 140, 44, 152, p_h('#b89a6a #9a7a4e #7a5e3a #4a3a24'), 148, { horiz: true, ancho: 4, mugre: 0 }); for (let k = 0; k < 6; k++) { rect(24 + k * 3, 134, 25 + k * 3, 140, [hex('#3a6a3a'), hex('#6a4a2a')][k % 2]); pset(24 + k * 3, 133, hex('#a88a5a')); }
      return dat;
    }
    // ─ general ─
    p_montes(R, 70, 24, p_h('#9096ae #7a809a #646a84'), 8.2, 120);
    p_montes(R, 92, 14, p_h('#5a6a50 #46543e #303c2a'), 2.7, 120, { arboles: true, pinos: true });
    for (let k = 0; k < 18; k++) p_pino(R, 4 + k * 18 + Math.round(h(k, 1, 150) * 8), 100 + Math.round(h(k, 2, 150) * 4), 14 + Math.round(h(k, 3, 150) * 10), p_h('#5a7a4a #3a5a34 #24402a'), hex('#3a2a20'));
    p_cesped(R, 0, 96, 319, 179, 151);
    // los árboles entre las casas
    for (const [tx, ty, r] of [[96, 126, 14], [222, 130, 12]]) { rect(tx - 1, ty - 24, tx + 1, ty, hex('#4a3426')); rect(tx - 1, ty - 24, tx - 1, ty, hex('#6a4a34')); for (const [dx, dy, f, c] of [[0, -30, 1, '#3a5a2e'], [-6, -26, 0.7, '#3a5a2e'], [6, -27, 0.7, '#3a5a2e'], [-2, -32, 0.75, '#4e7a3a'], [3, -30, 0.6, '#4e7a3a'], [-4, -35, 0.35, '#7a9a4a']]) disco(tx + dx, ty + dy, r * f, hex(c)); }
    dat.L = p_casona(R, -6, 86, 132, 58, 1, { noche, hiedra: true }, luces);
    dat.C = p_casona(R, 108, 212, 128, 60, 2, { noche }, luces);
    dat.R = p_casona(R, 232, 326, 134, 54, 3, { noche, botellas: true }, luces);
    // los setos crecidos delante de las casas
    for (const [a, b, y] of [[0, 52, 134], [110, 142, 130], [178, 212, 130], [236, 260, 136], [296, 320, 136]]) for (let x = a; x <= b; x += 4) { disco(x, y - 3, 4, hex('#2e4a26')); disco(x - 1, y - 4, 3, hex('#4a6a34')); pset(x - 2, y - 6, hex('#7a9a4a')); }
    // el camino de losas con hierba en las juntas, hasta la puerta del centro y hasta la casa de la derecha
    const losa = (cx, cy, w) => { for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - w; x <= cx + w; x++) { const e = ((x - cx) / w) ** 2 + ((y - cy) / 2.6) ** 2; if (e < 1) pset(x, y, e > 0.65 ? hex('#7a7466') : y === cy - 2 ? hex('#d8d2c4') : h(x, y, 152) < 0.1 ? hex('#8a8476') : hex('#b8b2a4')); } };
    for (let k = 0; k < 12; k++) { const u = k / 11, y = Math.round(134 + u * 46), x = Math.round(160 + Math.sin(u * 3) * 10 + (u > 0.5 ? (u - 0.5) * 30 : 0)); losa(x - 5, y, 4 + u * 3); losa(x + 5, y + 1, 4 + u * 3); }
    for (let k = 0; k < 7; k++) { const u = k / 6, x = Math.round(186 + u * 92), y = Math.round(162 - u * 22); losa(x, y, 4 + (1 - u) * 2); }
    // la fuente seca: pilón con el borde de piedra, hojas y grietas dentro, la columna con la taza; musgo
    { const cx = 160, cy = 150, rx = 30, ry = 8;
      for (let y = cy - ry - 2; y <= cy + ry + 4; y++) for (let x = cx - rx - 2; x <= cx + rx + 2; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2, e2 = ((x - cx) / (rx - 4)) ** 2 + ((y - cy + 1) / (ry - 3)) ** 2;
        if (e2 < 1) pset(x, y, h(x, y, 153) < 0.12 ? hex('#a8742a') : h(x, y, 154) < 0.08 ? hex('#7a3a20') : (x * 3 + y * 7) % 23 === 0 ? hex('#5a5448') : hex('#8a8272'));
        else if (e < 1) pset(x, y, y < cy ? hex('#e0dace') : hex('#c8c0b0')); else if (y > cy && y <= cy + ry + 4 && Math.abs(x - cx) < rx * Math.sqrt(Math.max(0, 1 - ((y - 4 - cy) / ry) ** 2))) pset(x, y, h(x >> 1, y, 155) < 0.25 ? hex('#5a7a3a') : y % 3 ? hex('#9a9282') : hex('#7a7266')); }
      rect(cx - 3, cy - 22, cx + 3, cy - 2, hex('#c8c0b0')); rect(cx - 3, cy - 22, cx - 2, cy - 2, hex('#e0dace')); rect(cx + 2, cy - 22, cx + 3, cy - 2, hex('#9a9282'));
      for (let y = cy - 26; y <= cy - 21; y++) { const w = 11 - (y - cy + 26); rect(cx - w, y, cx + w, y, y === cy - 26 ? hex('#e8e2d6') : hex('#b8b0a0')); } rect(cx - 1, cy - 31, cx + 1, cy - 27, hex('#c8c0b0')); disco(cx, cy - 32, 2, hex('#d8d0c0'));
      for (let k = 0; k < 10; k++) pset(cx - 10 + k * 2, cy - 22 + (k % 2), hex('#5a7a3a')); linea(cx + 8, cy + 1, cx + 14, cy + 3, hex('#4a4438')); linea(cx - 12, cy, cx - 7, cy + 3, hex('#4a4438')); }
    // las farolas apagadas (de noche, encendidas)
    for (const fx of [100, 220]) { rect(fx, 112, fx + 1, 142, hex('#2a2a30')); rect(fx, 112, fx, 142, hex('#5a5a66')); rect(fx - 2, 141, fx + 3, 142, hex('#2a2a30')); rect(fx - 3, 104, fx + 4, 111, hex('#2a2a30')); rect(fx - 2, 105, fx + 3, 110, hex('#9aa4b0')); rect(fx - 4, 103, fx + 5, 104, hex('#2a2a30')); luces.push((n) => n && rect(fx - 2, 105, fx + 3, 110, hex('#ffe8a0'))); }
    if (true) dat.periodico = [252, 160];
    return dat;
  },
  vivo(R, t, cam, luz, ant, o, tn, F) {
    const { rect, pset } = R, d = F.dat, noche = luz === 'noche';
    if (cam === 'porche') {
      // la mecedora que se mece sola
      { const a = Math.sin(t * 1.6) * 0.12, cx = 212, cy = 160, P = (x, y) => [Math.round(cx + (x) * Math.cos(a) - (y) * Math.sin(a)), Math.round(cy + (x) * Math.sin(a) + (y) * Math.cos(a))], mad = tn(hex('#6a4a30')), madL = tn(hex('#9a7450')), madS = tn(hex('#3e2a1c'));
        for (let x = -14; x <= 14; x++) { const [px, py] = P(x, -((x / 14) ** 2) * 2); pset(px, py, madS); pset(px, py - 1, mad); }
        for (const lx of [-9, 7]) { const [a1, b1] = P(lx, -2), [a2, b2] = P(lx + 1, -13); R.linea(a1, b1, a2, b2, mad); }
        for (let x = -11; x <= 9; x++) { const [px, py] = P(x, -13); pset(px, py, madL); const [qx, qy] = P(x, -12); pset(qx, qy, mad); }
        for (const lx of [-11, -6, 0]) { const [a1, b1] = P(lx, -13), [a2, b2] = P(lx - 3, -34); R.linea(a1, b1, a2, b2, lx === -11 ? madS : mad); }
        for (let x = -14; x <= 3; x++) { const [px, py] = P(x, -34 - (x > -10 && x < 0 ? 1 : 0)); pset(px, py, madL); pset(px, py + 1, mad); }
        const [ax, ay] = P(8, -20), [bx, by] = P(9, -12); R.linea(ax, ay, bx, by, mad); const [cx2, cy2] = P(-2, -20); R.linea(cx2, cy2, ax, ay, madL);
        for (let x = -10; x <= 6; x++) { const [px, py] = P(x, -15); pset(px, py, tn(hex('#a85a4a'))); } }
      p_ganso(R, 60, 177, t, 0, tn, 20); p_ganso(R, 238, 178, t, 1, tn, 14); p_ganso(R, 300, 160, t, 2, tn, 10);
      p_matas(R, t, 270, 320, 179, 8, tn, 3, 7); p_matas(R, t, 0, 120, 179, 10, tn, 4, 5);
      p_polvo(R, t, 20, 250, 90, 150, 10, tn(hex('#f0e8d0')), 7);
      if (noche) p_halo(R, 187, 110, 16, hex('#f8d070'), 0.4);
      return { suelo: 156, libre: [130, 192], mecedora: [198, 226, 146], puerta: [144, 176, 100], ventana: [40, 93, 94, 128], escalones: [124, 196, 165] };
    }
    // ─ general ─
    p_humo(R, d.R.chimenea[0], d.R.chimenea[1], t, tn, { n: 5, alto: 20, viento: 14, r: 1, crece: 3, v: 0.1 });
    if (o.periodico !== false) { const [px, py] = d.periodico; rect(px - 5, py - 3, px + 5, py, tn(hex('#e8e4d8'))); rect(px - 5, py, px + 5, py, tn(hex('#a8a498'))); for (let x = px - 4; x <= px + 3; x += 2) rect(x, py - 2, x, py - 1, tn(hex('#6a6a74'))); rect(px + 1, py - 3, px + 5, py - 3, tn(hex('#c8c4b8'))); }
    for (const [x, y, k, r] of [[262, 158, 0, 18], [296, 172, 1, 12], [244, 176, 2, 10], [302, 150, 3, 8]]) p_ganso(R, x, y, t, k, tn, r);
    p_paloma(R, 140, 143, t, 1, tn, 8);
    // hojas secas que el viento mueve por el césped
    for (let k = 0; k < 6; k++) { const u = (t * 0.08 + k / 6) % 1, x = Math.round(80 + u * 200 + Math.sin(t * 2 + k) * 4), y = Math.round(150 + h(k, 1, 156) * 26 + Math.sin(t * 3 + k) * 2); pset(x, y, tn(k % 2 ? hex('#a8742a') : hex('#c89a40'))); pset(x + 1, y, tn(hex('#7a3a20'))); }
    p_matas(R, t, 0, 130, 179, 14, tn, 1, 7); p_matas(R, t, 190, 320, 179, 12, tn, 2, 7);
    return { suelo: 168, libre: [[30, 128], [190, 236]], fuente: [160, 150], puertas: { izq: d.L.puerta, centro: d.C.puerta, vencedor: d.R.puerta }, porche: d.R.porche, periodico: d.periodico };
  },
  delante(R, t, cam, luz, ant, o, tn) {
    if (cam !== 'porche') return;
    const { rect, pset } = R, b = tn(hex('#f0eee6')), bL = tn(hex('#ffffff')), bS = tn(hex('#a8a49c'));
    for (const [a, c] of [[0, 128], [192, 270]]) { rect(a, 144, c, 146, b); rect(a, 144, c, 144, bL); rect(a, 146, c, 146, bS); rect(a, 158, c, 160, b); rect(a, 160, c, 160, bS);
      for (let x = a + 3; x < c - 2; x += 6) { rect(x, 147, x + 2, 157, b); rect(x, 147, x, 157, bL); rect(x + 2, 147, x + 2, 157, bS); if (h(x, 1, 157) < 0.3) pset(x + 1, 151, tn(hex('#a89a7a'))); }
      for (const px of [a === 0 ? 0 : a, c - 4]) { rect(px, 138, px + 4, 162, b); rect(px, 138, px + 4, 139, bL); rect(px + 4, 138, px + 4, 162, bS); } }
  },
};

// una rama gruesa de corteza (de [x0, y0] a [x1, y1], grosor w0 → w1) con luz por la derecha (el sol de la tarde),
// surcos y musgo a la izquierda
function p_rama(R, x0, y0, x1, y1, w0, w1, [cL, c, cS, cK], sem = 0, musgo = 0) {
  const L = Math.hypot(x1 - x0, y1 - y0), n = Math.ceil(L), B = R.buf, nx = (x1 - x0) / L, ny = (y1 - y0) / L;
  for (let i = 0; i <= n; i++) { const u = i / n, cx = x0 + (x1 - x0) * u + Math.sin(u * 7 + sem) * w0 * 0.06, cy = y0 + (y1 - y0) * u, r = (w0 + (w1 - w0) * u) / 2;
    for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue; const ex = x + 0.5 - cx, ey = y + 0.5 - cy; if (ex * ex + ey * ey > r * r) continue;
      const per = ex * ny - ey * nx, a = ex * nx + ey * ny + i, q = per / r, lado = ny >= 0 ? -q : q;   // per: de un borde al otro; a: a lo largo
      let k = lado > 0.4 ? cL : lado < -0.45 ? cS : c; if (Math.abs(q) > 0.86) k = cK;
      const surco = per + Math.sin(a * 0.25 + Math.floor(per / 3.2)) * 0.9 + 100, s3 = Math.floor(surco / 3.2);
      if (surco % 3.2 < 1 && h(s3, Math.floor(a / 7), sem) < 0.75) k = lado > 0.4 ? c : cK; else if (surco % 3.2 < 1.8 && lado > 0.4 && h(s3, Math.floor(a / 5), sem + 3) < 0.3) k = p_mez(cL, C.blanco, 0.15);
      if (musgo && lado < -0.1 && h(x >> 1, y >> 1, sem + 2) < musgo) k = h(x, y, sem) < 0.5 ? hex('#4a6a2e') : hex('#6a8a3a');
      B[y * 320 + x] = k; } }
}

// un racimo de hojas en tres tonos (cx, cy, r), con el borde de la derecha encendido por el sol de la tarde
function p_hojas(R, cx, cy, r, [cL, c, cS], sem, luz) {
  const B = R.buf, bolas = [[0, 0, 0.62]], borde = luz ? p_mez(cL, luz, 0.45) : cL;
  for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283 + h(k, 1, sem) * 0.8; bolas.push([Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.42, 0.34 + h(k, 2, sem) * 0.18]); }
  for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r * 1.2); x <= cx + r * 1.2; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue;
    let dentro = false, sub = 1; for (const [bx, by, f] of bolas) { const dd = ((x - cx - bx) ** 2 + (y - cy - by) ** 2) / (f * r) ** 2; if (dd < 1) { dentro = true; sub = Math.min(sub, dd); } }
    if (!dentro || (sub > 0.7 && h(x, y, sem) < 0.45)) continue;
    const dx = (x - cx) / r, dy = (y - cy) / r, q = h(x >> 1, y >> 1, sem + 1);
    let k = dy > 0.25 ? cS : q < 0.3 ? cS : c; if (dy < -0.1 && q > 0.6) k = cL; if (dx > 0.6 && dy < 0.3 && q > 0.35) k = borde; if (dy > 0.55 && q < 0.6) k = p_mez(cS, hex('#000000'), 0.25);
    B[y * 320 + x] = k; }
}

// el lago: refleja lo que hay encima (cielo y orilla de enfrente) con ondas; de y0 a y1, de x0 a x1
function p_lago(R, x0, y0, x1, y1) {
  const B = R.buf, agua = hex('#2a4a6a');
  for (let y = y0; y <= y1; y++) { const sy = Math.max(0, Math.round(y0 - (y - y0) * 1.15) - 1), u = (y - y0) / (y1 - y0);
    for (let x = x0; x <= x1; x++) { const sx = Math.max(0, Math.min(319, x + Math.round(Math.sin(y * 0.9 + x * 0.05) * (1 + u * 2)))); let c = p_mez(B[sy * 320 + sx], agua, 0.22 + u * 0.3);
      if ((y * 7 + (x >> 3) * 5) % 11 === 0 && h(x >> 2, y, 160) < 0.4) c = p_mez(c, hex('#ffffff'), 0.18); B[y * 320 + x] = c; } }
}

const p_CORTEZA = p_h('#8a6a52 #5e4a3a #3e3028 #241c18'), p_FOLLAJE = p_h('#6a8a3e #3e5e2e #263e22');

const p_BOSQUE = {
  camaras: ['general', 'arbol'],
  cielo: (cam, luz) => cam === 'arbol' ? { hor: 72, sol: p_sol(luz, { amanecer: [230, 66, 8], dia: [200, 26, 6], tarde: [232, 62, 10], noche: [220, 26, 5] }) } : { hor: 86, sol: p_sol(luz, { amanecer: [196, 78, 8], dia: [210, 28, 7], tarde: [196, 74, 11], noche: [214, 26, 6] }) },
  fijo(R, cam, luz, ant, luces) {
    const { rect, pset, linea, disco } = R, B = R.buf, dat = {}, sol = p_CIE[luz].halo;
    const rim = luz === 'tarde' ? hex('#e8a050') : luz === 'amanecer' ? hex('#e8b0a0') : null;
    const arbol = cam === 'arbol';
    const hor = arbol ? 72 : 86;
    // la orilla de enfrente: montes lejanos y una fila de pinos
    p_montes(R, hor - 16, 18, p_h('#8a7a9e #6e6488 #584e74'), 9.1, hor);
    p_montes(R, hor - 2, 6, p_h('#4a5a4a #34443a #22302a'), 4.4, hor, { pinos: true });
    for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 161) * 330) - 5; if (arbol && x < 100) continue; p_pino(R, x, hor + 1, 8 + Math.round(h(k, 2, 161) * 12), p_h('#3e5040 #2a3a2e #1a261e'), hex('#1a1612')); }
    // el lago que lo refleja todo
    const ly1 = arbol ? 128 : 130;
    p_lago(R, 0, hor + 1, 319, ly1);
    // la orilla de este lado: barro, piedras, hierba
    for (let x = 0; x < 320; x++) for (let j = 0; j < 3; j++) { const y = ly1 + 1 + j + Math.round(Math.sin(x * 0.07) * 1); B[y * 320 + x] = j === 0 ? hex('#4a3e30') : hex('#6a5a44'); }
    p_cesped(R, 0, ly1 + 3, 319, 179, 162);
    for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 163) * 320), y = ly1 + 4 + Math.round(h(k, 2, 163) * 40), r = 1.5 + h(k, 3, 163) * 2.5; disco(x, y, r, hex('#7a7468')); disco(x - 0.6, y - 0.6, r * 0.6, hex('#a8a296')); }
    // el árbol viejo: raíces, tronco con musgo y un hueco, ramas grandes y racimos de hojas (nada colgado)
    if (arbol) {
      for (const [a, b, c2, d2, w] of [[56, 150, 0, 170, 22], [62, 152, 118, 172, 20], [52, 156, 22, 179, 16], [70, 154, 92, 179, 14]]) p_rama(R, a, b, c2, d2, w, 5, p_CORTEZA, 164, 0.12);
      p_rama(R, 58, 156, 60, 10, 62, 44, p_CORTEZA, 165, 0.1);
      p_rama(R, 82, 50, 252, 34, 16, 4, p_CORTEZA, 166, 0.2); p_rama(R, 160, 42, 196, 22, 5, 2, p_CORTEZA, 167); p_rama(R, 210, 38, 240, 50, 4, 2, p_CORTEZA, 168);
      for (let y = 0; y < 26; y++) for (let x = 0; x < 230; x++) { const lim = (17 + Math.sin(x * 0.09) * 4 + h(x >> 2, 0, 169) * 4) * Math.min(1, Math.max(0, (210 - x) / 70)); if (y < lim) B[y * 320 + x] = h(x >> 1, y >> 1, 169) < 0.35 ? hex('#1e3020') : y > lim - 2 ? hex('#34502e') : hex('#263a26'); }
      for (const [x, y, r] of [[120, 18, 14], [160, 16, 12], [190, 26, 10], [214, 46, 9], [236, 56, 8], [176, 54, 8], [150, 46, 9], [256, 40, 7], [10, 22, 12], [96, 24, 12]]) p_hojas(R, x, y, r, p_FOLLAJE, x + y, rim);
      rect(46, 86, 56, 104, hex('#1a1210')); disco(51, 87, 5, hex('#1a1210')); rect(46, 104, 56, 105, hex('#3e3028')); pset(48, 90, hex('#2a201a'));
      // la piedra plana para sentarse, setas, hojas caídas
      for (let y = 146; y <= 160; y++) for (let x = 134; x <= 182; x++) { const e = ((x - 158) / 24) ** 2 + ((y - 154) / 8) ** 2; if (e < 1) pset(x, y, y < 149 ? hex('#c8c2b4') : e > 0.7 ? hex('#5a5448') : h(x, y, 170) < 0.15 ? hex('#6a8a3a') : y < 152 ? hex('#a8a294') : hex('#8a8476')); }
      for (const [mx, my] of [[104, 166], [110, 168], [28, 172]]) { rect(mx, my - 3, mx, my, hex('#e8e0d0')); rect(mx - 2, my - 5, mx + 2, my - 4, hex('#c84a3a')); pset(mx - 1, my - 5, hex('#f0e8d8')); }
      for (const jx of [272, 284, 296, 308, 316]) for (let j = 0; j < 22; j++) pset(jx + Math.round(j * 0.1), 128 - j, j > 16 ? hex('#8a6a3a') : hex('#4a6a32'));
      return dat;
    }
    // ─ general ─
    for (const [a, b, c2, d2, w] of [[60, 152, 22, 164, 16], [66, 152, 104, 162, 14], [58, 156, 40, 170, 10]]) p_rama(R, a, b, c2, d2, w, 4, p_CORTEZA, 171, 0.3);
    p_rama(R, 60, 156, 64, 82, 30, 20, p_CORTEZA, 172, 0.3);
    p_rama(R, 64, 86, 26, 42, 14, 5, p_CORTEZA, 173, 0.2); p_rama(R, 66, 88, 142, 56, 14, 4, p_CORTEZA, 174, 0.15); p_rama(R, 62, 84, 74, 30, 11, 4, p_CORTEZA, 175, 0.2);
    p_rama(R, 26, 44, 10, 28, 5, 2, p_CORTEZA, 176); p_rama(R, 110, 68, 118, 46, 5, 2, p_CORTEZA, 177);
    for (const [x, y, r] of [[22, 34, 14], [74, 26, 16], [44, 30, 11], [104, 40, 12], [138, 52, 10], [8, 46, 9], [120, 34, 9], [92, 56, 8]]) p_hojas(R, x, y, r, p_FOLLAJE, x * 3 + y, rim);
    rect(54, 112, 60, 124, hex('#1a1210')); disco(57, 112, 3, hex('#1a1210'));
    // los juncos de la orilla (las puntas se mecen en vivo)
    dat.juncos = [];
    for (const [a, b] of [[150, 200], [236, 268]]) for (let x = a; x < b; x += 3) { const al = 10 + Math.round(h(x, 1, 178) * 10); dat.juncos.push([x, ly1 + 2, al]); }
    // el poste de la alambrada y sus alambres de espino
    rect(302, 104, 307, 162, hex('#5a4434')); rect(302, 104, 303, 162, hex('#8a6a4c')); rect(301, 102, 308, 104, hex('#3e2e22'));
    for (const wy of [110, 120, 130, 140, 150]) { for (let x = 286; x < 320; x++) pset(x, Math.round(wy + ((x - 304) / 20) ** 2 * 2), hex('#5a5a66')); for (let x = 288; x < 320; x += 6) { const y = Math.round(wy + ((x - 304) / 20) ** 2 * 2); pset(x, y - 1, hex('#8a8a96')); pset(x + 1, y + 1, hex('#8a8a96')); } }
    return dat;
  },
  vivo(R, t, cam, luz, ant, o, tn, F) {
    const { pset } = R, d = F.dat, arbol = cam === 'arbol', hor = arbol ? 72 : 86, sx = arbol ? 232 : 196, ly1 = arbol ? 128 : 130;
    // la estela del sol en el agua y las ondas que corren
    const brillo = luz === 'noche' ? hex('#c8d0e8') : luz === 'dia' ? hex('#ffffff') : hex('#fff0b0');
    for (let k = 0; k < 40; k++) { const y = hor + 2 + Math.floor(h(k, 1, 180) * (ly1 - hor - 3)), w = 3 + (y - hor) * 0.5, x = Math.round(sx + (h(k, 2, 180) - 0.5) * w * 2 + Math.sin(t * 2 + k) * 2); if (Math.sin(t * 3 + k * 2.3) > 0.1) { pset(x, y, brillo); if (k % 3 === 0) pset(x + 1, y, brillo); } }
    for (let k = 0; k < 10; k++) { const y = hor + 4 + Math.floor(h(k, 3, 180) * (ly1 - hor - 6)), x0 = Math.round(((h(k, 4, 180) * 360 + t * (4 + k % 3)) % 360) - 20), L = 5 + (k % 4) * 2; for (let i = 0; i < L; i++) if (x0 + i >= 0 && x0 + i < 320) R.buf[y * 320 + x0 + i] = p_mez(R.buf[y * 320 + x0 + i], hex('#ffffff'), 0.25); }
    // un pez que salta de vez en cuando y deja anillos
    { const c = t % 7, px = arbol ? 200 : 236, py = Math.round((hor + ly1) / 2) + 6; if (c < 0.6) { const u = c / 0.6, y = Math.round(py - Math.sin(u * Math.PI) * 6), x = Math.round(px + u * 8); R.rect(x, y, x + 3, y + 1, tn(hex('#8a9aa8'))); pset(x + 3, y, tn(hex('#c8d0d8'))); }
      else if (c < 3) { const r = (c - 0.6) * 5; for (let a = 0; a < 6.28; a += 0.3) { const x = Math.round(px + 8 + Math.cos(a) * r), y = Math.round(py + Math.sin(a) * r * 0.3); if (y > hor && y < ly1) pset(x, y, p_mez(R.buf[y * 320 + x], hex('#ffffff'), 0.4)); } } }
    // los sinsajos que cantan en la rama y sus notas
    const nota = luz === 'noche' ? hex('#c8d0f0') : hex('#fff4d8');
    const aves = arbol ? [[196, 30, 0, 1], [232, 36, 1, -1]] : [[118, 60, 0, 1], [132, 57, 1, -1]];
    aves.forEach(([x, y, k, dir]) => { if (p_sinsajo(R, x, y, t, k, tn, dir)) p_notas(R, t, x + 3, y - 6, 3, nota, k); });
    if (!arbol) {
      for (const [x, y, al] of d.juncos) { const m = Math.sin(t * 1.4 + x * 0.12); for (let j = 0; j < al; j++) pset(Math.round(x + m * (j / al) ** 2 * 3), y - j, tn(j > al - 4 ? hex('#7a5a32') : j % 3 ? hex('#4a6a32') : hex('#6a8a3e'))); }
      p_matas(R, t, 90, 300, 179, 16, tn, 5, 6);
      p_luciernagas(R, t, 120, 300, 110, 170, luz === 'noche' ? 26 : 14, 1);
      return { suelo: 162, libre: [110, 280], arbol: [62, 156], rama: [[66, 88], [142, 56]], lago: [0, hor, 319, ly1], sol: F.cielo.sol, alambrada: 302 };
    }
    p_matas(R, t, 100, 320, 179, 14, tn, 6, 6);
    p_luciernagas(R, t, 110, 300, 90, 170, luz === 'noche' ? 24 : 12, 2);
    return { suelo: 164, piedra: [136, 180, 148], sentada: [150, 160], libre: [190, 260], tronco: [20, 100], rama: [[82, 50], [252, 34]], lago: [100, hor, 319, ly1], sol: F.cielo.sol };
  },
};

// los cinco encuadres del Distrito 12
const p_ENC = { plaza: p_PLAZA, calle: p_CALLE, quemador: p_QUEMADOR, aldea: p_ALDEA, bosque: p_BOSQUE };

// los colores de los interiores
const IP = pal({
  caoba: '#7c3624', caobaL: '#a0502f', caobaS: '#5a2414', caobaD: '#381409',
  terc: '#6e2a62', tercL: '#9a4690', tercS: '#4c1a46', tercD: '#2c0c28',
  alf: '#7a1a2c', alfS: '#5a1222', alfL: '#98303e', alfO: '#d0a040', alfOS: '#8e6620', alfOL: '#f4d47a',
  techo: '#ece0c4', techoS: '#d6c8a6', techoL: '#f8f0de',
  mantel: '#f6f1e6', mantelS: '#d8d0c0', mantelD: '#aea492',
  plata: '#c8ccd4', plataS: '#8a909c', plataL: '#f4f6fa', cristal: '#d8eef8',
  papel: '#a4ae8c', papelS: '#929c7c', papelL: '#b4be9c', papelD: '#7c8668',
  zocalo: '#ece4d0', zocaloS: '#cfc4aa', zocaloL: '#faf6ea', zocaloD: '#a89c82',
  nogal: '#5a3820', nogalS: '#3e2414', nogalL: '#7a5030', nogalD: '#24140a',
  parquet: '#a8763e', parquetS: '#8a5c2c', parquetL: '#c49052', parquetD: '#6a4420',
  sepia: '#c8a878', sepiaS: '#9a7a50', sepiaL: '#ead2a4', sepiaD: '#5a4028',
  verdeC: '#3e5a3a', verdeCS: '#2a3e28', verdeCL: '#56764e',
  nPared: '#262a44', nParedS: '#1e2138', nParedL: '#30365a', nMadera: '#3a2a2a', nMaderaS: '#281c1e', nMaderaL: '#4e3a36',
  nSuelo: '#30232a', nSueloS: '#22181e', nSueloL: '#40303a',
  tvMadera: '#6a4426', tvMaderaS: '#4a2c16', tvMaderaL: '#8a5a34', tvPlast: '#2a2a2e', tvPlastL: '#4a4a52',
  butaca: '#5a2030', butacaS: '#3a1220', butacaL: '#7a3044',
});

const i_capas = new Map();

// un fondo fijo pintado una vez en su búfer (clave: encuadre, cámara y luz) que se copia en cada fotograma
function i_capa(R, clave, dibuja) {
  let b = i_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); i_capas.set(clave, b); }
  return b;
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function i_mezcla(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// la trama ordenada de 4 × 4 (0…1) con la que se funden los degradados
const i_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const i_dith = (x, y) => (i_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// tiñe un rectángulo hacia un color (a: cuánto; trama: solo uno de cada dos píxeles). Respeta el recorte
function i_velo(R, x0, y0, x1, y1, col, a, trama = false) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (!trama || ((x + y) & 1) === 0) { const c = R.pget(x, y); if (c) R.pset(x, y, i_mezcla(c, col, a)); }
}

// un resplandor redondo que aclara lo que hay debajo hacia col, en escalones tramados (como la luz de una lámpara)
function i_brillo(R, cx, cy, r, col, a) {
  for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
    const d = Math.hypot(x - cx, (y - cy) * 1.1) / r; if (d >= 1) continue;
    const k = Math.floor(((1 - d) * (1 - d) * a * 6 + i_dith(x, y) * 0.9)) / 6; if (k <= 0) continue;
    const c = R.pget(x, y); if (c) R.pset(x, y, i_mezcla(c, col, Math.min(0.9, k)));
  }
}

// madera de veta vertical (paneles de caoba): el color, vetas largas que ondulan y algún nudo
function i_vetaV(R, x0, y0, x1, y1, c, cS, cL, k = 0) {
  R.rect(x0, y0, x1, y1, c);
  for (let x = x0; x <= x1; x++) { const fase = h(x, 1, 900 + k) * 40;
    for (let y = y0; y <= y1; y++) { const v = h(x + Math.round(Math.sin((y + fase) * 0.09) * 1.2), (y + fase) >> 4, 901 + k);
      if (v < 0.13) R.pset(x, y, cS); else if (v > 0.93) R.pset(x, y, cL); } }
}

// un cuarterón de madera: marco con bisel (luz arriba e izquierda, sombra abajo y derecha) y el campo rehundido con veta
function i_cuarteron(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0) {
  R.rect(x0, y0, x1, y1, cD); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c);
  R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, cL); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, cL); R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, cS); R.rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, cS);
  if (x1 - x0 > 8 && y1 - y0 > 8) {
    R.rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, cS); R.rect(x0 + 4, y0 + 4, x1 - 3, y1 - 3, c); R.rect(x0 + 4, y1 - 3, x1 - 3, y1 - 3, cL); R.rect(x1 - 3, y0 + 4, x1 - 3, y1 - 3, cL);
    for (let x = x0 + 5; x < x1 - 4; x++) for (let y = y0 + 5; y < y1 - 4; y++) if (h(x, y >> 2, 910 + k) < 0.12) R.pset(x, y, cS);
  }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba)
function i_nube(R, cx, cy, w, [c1, c2, c3]) {
  const r = Math.max(2, w * 0.32), B = [[-w * 0.42, 1, r * 0.78], [0, -1, r], [w * 0.4, 0.5, r * 0.82], [w * 0.15, 1.2, r * 0.7]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1, rr, c3);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.95, c2);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1, rr * 0.6, c1);
}

const i_hx = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : hex(v)]));

const i_PAIS = {
  dia: i_hx({ cielo: ['#5aa2e4', '#78b8ee', '#9ccef4', '#c8e6f8'], nube: ['#ffffff', '#e4eef8', '#b4c8e0'], lejos: '#8ea8cc', lejosL: '#b0c4e0', medio: '#5a8a6a', medioS: '#46704e', medioL: '#74a07a',
    bosque: ['#2e5a3a', '#3e7448', '#1e3e28'], suelo: '#7a9a4a', sueloS: '#5e7a3a', sueloL: '#9ab866', sol: ['#fffbe8', '#fff0b0', '#e8f4fa'], poste: '#4a3424', posteL: '#6a4a30', cable: '#3a3036', casa: '#8a8a94', casaS: '#62626c', tejado: '#5a5058', humo: '#c8ccd4', ave: '#2a2a3a', ventana: '#3a4250' }),
  tarde: i_hx({ cielo: ['#4a4a88', '#9a5a8a', '#e0886a', '#f6c47e'], nube: ['#ffe0b8', '#e8a088', '#9a6a88'], lejos: '#8a6a96', lejosL: '#b08aa8', medio: '#5a4a6a', medioS: '#4a3c5a', medioL: '#7a5a74',
    bosque: ['#2e2a44', '#4a3a54', '#1e1a30'], suelo: '#5a4a50', sueloS: '#4a3c44', sueloL: '#8a6a60', sol: ['#fff4c8', '#ffc870', '#f6c47e'], poste: '#2a1e24', posteL: '#4a3434', cable: '#2a1e24', casa: '#6a5a6a', casaS: '#4a3e4e', tejado: '#3a2e3a', humo: '#c8a0a0', ave: '#2a1e2a', ventana: '#f8c860' }),
  noche: i_hx({ cielo: ['#0c1030', '#141a44', '#1e2656', '#2a3264'], nube: ['#5a6290', '#3c4470', '#262c50'], lejos: '#262c54', lejosL: '#363e6c', medio: '#1a2040', medioS: '#141a34', medioL: '#262e50',
    bosque: ['#0e1228', '#1a2038', '#0a0e20'], suelo: '#141a2c', sueloS: '#0e1222', sueloL: '#232c44', sol: ['#f4f4e0', '#c8ccd8', '#2a3264'], poste: '#0a0c18', posteL: '#1a1e30', cable: '#0a0c18', casa: '#2a2e44', casaS: '#1e2236', tejado: '#14182a', humo: '#4a5070', ave: '#0a0c18', ventana: '#f8d070' }),
};

// el paisaje recortado al hueco v = [x0, y0, x1, y1]: todo se dibuja en coordenadas de pantalla con el mismo mundo (así
// casa de una ventana a otra); e: escala (1 en el vagón, ~1,8 de cerca); sol: [x, y, r] en pantalla (el sol o la luna,
// que no se mueven: están lejísimos). Las capas corren más cuanto más cerca: sierra 2, colinas 7, bosque 24, cuneta 60,
// postes 80 px/s (por e)
function i_paisaje(R, t, v, luz, e = 1, sol = null) {
  const P = i_PAIS[luz] ?? i_PAIS.dia, [x0, y0, x1, y1] = v, H = y1 - y0, hz = Math.round(y0 + H * 0.56), { pset, linea, poligono, disco } = R;
  R.recorte(v);
  // el cielo: degradado tramado de cuatro tonos hasta el horizonte
  for (let y = y0; y <= hz + 2; y++) { const u = (y - y0) / (hz - y0) * 3; for (let x = x0; x <= x1; x++) pset(x, y, P.cielo[Math.max(0, Math.min(3, Math.floor(u + i_dith(x, y) - 0.5)))]); }
  if (luz === 'noche') for (let k = 0; k < 40; k++) { const sx = Math.round(h(k, 1, 920) * 330 - 5), sy = Math.round(y0 + h(k, 2, 920) * (hz - y0 - 6)); if (Math.sin(t * (1.5 + h(k, 3, 920) * 3) + k) > -0.3) pset(sx, sy, k % 5 ? hex('#c8d0f0') : hex('#ffffff')); }
  if (sol) { const [sx, sy, r] = sol; i_brillo(R, sx, sy, r * 3.2, P.sol[1], 0.5); disco(sx, sy, r + 1, P.sol[1]); disco(sx, sy, r, P.sol[0]); if (luz === 'noche') { disco(sx + 2, sy - 1, r * 0.55, hex('#d8dcc8')); pset(sx - 2, sy + 1, hex('#c0c4b4')); } }
  // las nubes, a tres velocidades
  for (let k = 0; k < 9; k++) { const vel = [1.2, 2.6, 4.4][k % 3] * e, w = (7 + h(k, 2, 921) * 9) * e * (k % 3 === 0 ? 0.8 : 1), cx = ((h(k, 1, 921) * 440 - t * vel) % 440 + 440) % 440 - 60, cy = y0 + H * (0.08 + h(k, 3, 921) * 0.3);
    i_nube(R, Math.round(cx), Math.round(cy), w, P.nube); }
  // los pájaros, en uve, despacio
  for (let k = 0; k < 4; k++) { const bx = Math.round(((h(k, 4, 922) * 380 - t * (6 + k) * e) % 380 + 380) % 380 - 30), by = Math.round(y0 + H * (0.18 + 0.05 * k) + Math.sin(t * 0.8 + k) * 2), a = Math.sin(t * 9 + k * 2) > 0 ? 1 : 0;
    pset(bx, by, P.ave); pset(bx - 1, by - a, P.ave); pset(bx + 1, by - a, P.ave); if (e > 1.4) { pset(bx - 2, by - 1 + a, P.ave); pset(bx + 2, by - 1 + a, P.ave); } }
  // la sierra lejana (con su filo de luz) y las colinas del medio, con casitas grises que echan humo
  const hS = (wx) => (0.16 + 0.06 * Math.sin(wx * 0.017 / e) + 0.035 * Math.sin(wx * 0.047 / e + 2) + 0.012 * Math.sin(wx * 0.15 / e)) * H;
  const hM = (wx) => (0.06 + 0.04 * Math.sin(wx * 0.029 / e + 1) + 0.025 * Math.sin(wx * 0.071 / e)) * H;
  for (let x = x0; x <= x1; x++) {
    const ws = x + t * 2 * e, top = Math.round(hz - hS(ws)), sube = hS(ws) > hS(ws - 1);
    linea(x, top, x, hz + 4, P.lejos); pset(x, top, P.lejosL); if (sube) pset(x, top + 1, P.lejosL);
    for (let y = top + 3; y < hz; y += 3) if (h(Math.floor(ws / 3), y, 923) < 0.2) pset(x, y, P.lejosL);
    const wm = x + t * 7 * e, topM = Math.round(hz - hM(wm) + H * 0.05);
    linea(x, topM, x, y1, P.medio); pset(x, topM, P.medioL);
    for (let y = topM + 1; y <= hz + H * 0.2; y++) { const r = h(Math.floor(wm / 2), y >> 1, 924); if (r < 0.22) pset(x, y, P.medioS); else if (r > 0.9) pset(x, y, P.medioL); }
  }
  const cel = 46 * e, vM = 7 * e;
  for (let c = Math.floor((x0 + t * vM) / cel) - 1; c <= Math.ceil((x1 + t * vM) / cel); c++) { if (h(c, 5, 925) > 0.45) continue;
    const sx = Math.round(c * cel + h(c, 6, 925) * cel * 0.5 - t * vM), w = Math.round((6 + h(c, 7, 925) * 4) * e), hh = Math.round(4 * e), base = Math.round(hz - hM(sx + t * vM) + H * 0.05 + 3 * e);
    poligono([[sx - 1, base - hh], [sx + w / 2, base - hh - 3 * e], [sx + w + 1, base - hh]], P.tejado);
    for (let x = sx; x <= sx + w; x++) linea(x, base - hh, x, base, x === sx ? P.casaS : P.casa);
    pset(sx + Math.round(w / 2), base - Math.round(hh / 2), P.ventana); if (e > 1.4) pset(sx + Math.round(w / 2) + 1, base - Math.round(hh / 2), P.ventana);
    const chx = sx + w - Math.round(2 * e); linea(chx, base - hh - Math.round(3 * e), chx, base - hh, P.casaS);
    for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k * 0.25 + h(c, 8, 925)) % 1); disco(chx - u * 6 * e, base - hh - 4 * e - u * 9 * e, (0.6 + u * 1.6) * e, P.humo); }
  }
  // el bosque de pinos, de dos tonos con el lado de la luz, y su sombra
  const S = 7 * e, vB = 24 * e, baseB = Math.round(hz + H * 0.17);
  for (let x = x0; x <= x1; x++) linea(x, baseB - 2, x, baseB + Math.round(3 * e), P.bosque[2]);
  for (let c = Math.floor((x0 + t * vB) / S) - 2; c <= Math.ceil((x1 + t * vB) / S) + 2; c++) {
    const sx = c * S + h(c, 1, 926) * S * 0.6 - t * vB, al = (9 + h(c, 2, 926) * 10) * e, w = al * 0.34, b = baseB + h(c, 3, 926) * 3 * e;
    poligono([[sx, b - al], [sx - w, b], [sx + w, b]], P.bosque[0]); poligono([[sx, b - al], [sx - w, b], [sx - w * 0.15, b]], P.bosque[1]);
    for (let j = 1; j < 3; j++) { const yy = Math.round(b - al * j / 3); linea(Math.round(sx - w * j / 3 - 1), yy, Math.round(sx + w * j / 3 + 1), yy, P.bosque[2]); }
  }
  // la cuneta: hierba borrosa de la velocidad
  const gy = Math.round(hz + H * 0.24);
  for (let y = gy; y <= y1; y++) { linea(x0, y, x1, y, P.suelo);
    for (let i = 0; i < 6; i++) { const L = Math.round((6 + h(y, i, 927) * 18) * e), sx = Math.round(((h(y, i + 9, 927) * 600 - t * 60 * e * (0.8 + (y - gy) / H)) % 600 + 600) % 600) + x0 - 140; linea(sx, y, sx + L, y, i % 3 ? P.sueloS : P.sueloL); } }
  linea(x0, gy, x1, gy, P.sueloS);
  // los postes del telégrafo y sus cables combados
  const SP = 150 * e, fase = ((t * 80 * e) % SP + SP) % SP, yc = y0 + Math.round(H * 0.14);
  for (let i = 0; i < 3; i++) { const yw = yc + Math.round(i * 2 * e);
    for (let x = x0; x <= x1; x++) { const f = ((x + fase) % SP) / SP; pset(x, Math.round(yw + H * 0.1 * 4 * f * (1 - f)), P.cable); } }
  for (let k = -1; k * SP - fase < 330; k++) { const px = Math.round(k * SP - fase); if (px < x0 - 12 * e || px > x1 + 12 * e) continue;
    const w = Math.max(2, Math.round(2.4 * e));
    for (let x = px; x < px + w; x++) linea(x, y0, x, y1, x === px ? P.posteL : P.poste);
    for (let j = 0; j < Math.round(2 * e); j++) linea(px - Math.round(7 * e), yc - 2 + j, px + w + Math.round(7 * e), yc - 2 + j, P.poste);
    for (const dx of [-6, -2, 3, 7]) pset(px + Math.round(dx * e), yc - 3, hex('#9ad0d8')); }
  R.recorte(null);
}

// el reflejo del cristal: dos rayas diagonales que aclaran (dentro del hueco)
function i_reflejo(R, v, a = 0.18) {
  const [x0, y0, x1, y1] = v; R.recorte(v);
  for (const [ox, w] of [[0.18, 5], [0.3, 2], [0.68, 7]]) { const bx = x0 + (x1 - x0) * ox;
    for (let y = y0; y <= y1; y++) for (let i = 0; i < w; i++) { const x = Math.round(bx + i - (y - y0) * 0.55); const c = R.pget(x, y); if (c && x >= x0 && x <= x1) R.pset(x, y, i_mezcla(c, hex('#ffffff'), a)); } }
  R.recorte(null);
}

const i_VENT = [[46, 36, 112, 98], [128, 36, 194, 98], [210, 36, 276, 98]];

function i_tren(R, t, o) {
  const luz = o.luz ?? 'dia', tv = t * (o.velocidad ?? 1), { rect, pset, linea, disco } = R;
  R.copiar(i_capa(R, 'tren-' + luz, () => i_trenFijo(R, luz)));
  const sol = luz === 'noche' ? [152, 52, 4] : luz === 'tarde' ? [236, 80, 6] : [240, 52, 5];
  for (const [x0, y0, x1, y1] of i_VENT) { const g = [x0 + 5, y0 + 7, x1 - 5, y1]; i_paisaje(R, tv, g, luz, 1, sol); i_reflejo(R, g, luz === 'noche' ? 0.08 : 0.16);
    rect(x0 + 5, y0 + 17, x1 - 5, y0 + 17, IP.alfOS); rect(x0 + 5, y0 + 18, x1 - 5, y0 + 18, IP.alfO); }
  // la sombra de los postes cruza las manchas de sol de la moqueta
  if (luz !== 'noche') { const SP = 150, fase = ((tv * 80) % SP + SP) % SP;
    for (const [x0, , x1] of i_VENT) for (let k = 0; k < 3; k++) { const px = k * SP - fase + 0; if (px < x0 + 2 || px > x1 - 8) continue;
      for (let y = 134; y <= 176; y++) { const sx = Math.round(px + (y - 134) * 0.6); for (let i = 0; i < 4; i++) { const c = R.pget(sx + i, y); if (c) pset(sx + i, y, i_mezcla(c, IP.alfS, 0.45)); } } } }
  // el portaequipajes: maleta, sombrerera y baúl, que botan con el traqueteo
  const bote = (k) => (Math.floor(tv * 4.2 + k * 2.3) % 7 === 0 ? -1 : 0);
  // (sobre las dos primeras ventanas solo cosas planas: la cifra de la barra del año baja hasta y 20)
  let b = bote(0); rect(54, 22 + b, 80, 25 + b, C.k); for (let x = 55; x < 80; x++) for (let y = 23 + b; y <= 24 + b; y++) pset(x, y, ((x >> 2) + y) & 1 ? hex('#3a5a7a') : hex('#7a3a3a')); rect(55, 23 + b, 79, 23 + b, hex('#c8a060')); for (let x = 56; x < 80; x += 3) pset(x, 26 + b, hex('#c8a060'));
  b = bote(1); rect(140, 22 + b, 162, 25 + b, C.k); rect(141, 23 + b, 161, 24 + b, hex('#e88ab0')); for (let x = 143; x < 161; x += 4) rect(x, 23 + b, x + 1, 24 + b, hex('#f6c8dc')); rect(141, 23 + b, 161, 23 + b, hex('#fae0ec')); rect(148, 22 + b, 154, 22 + b, hex('#c85a88'));
  b = bote(2); rect(222, 19 + b, 246, 25 + b, C.k); rect(223, 20 + b, 245, 24 + b, hex('#3a5a7a')); rect(223, 20 + b, 245, 20 + b, hex('#5a7a9a')); for (const x of [226, 242]) rect(x, 20 + b, x, 24 + b, IP.alfO); rect(233, 21 + b, 235, 23 + b, IP.alfO);
  linea(252, 24 + bote(3), 266, 20 + bote(3), C.k); linea(252, 25 + bote(3), 266, 21 + bote(3), hex('#2a2a3a')); pset(251, 25, IP.alfO);
  // las borlas de las cortinas se mecen con el vaivén del vagón
  for (const [x0, y0, x1] of i_VENT) for (const bx of [x0 - 2, x1 + 2]) { const s = Math.round(Math.sin(tv * 2.1 + bx * 0.1) * 1.2), ty = y0 + 42;
    linea(bx, ty, bx + s, ty + 5, IP.alfOS); rect(bx - 1 + s, ty + 5, bx + 1 + s, ty + 8, IP.alfO); pset(bx - 1 + s, ty + 8, IP.alfOS); pset(bx + s, ty + 9, IP.alfOS); }
  // los apliques: la tulipa encendida que titila un poco
  for (const [cx, cy] of [[38, 62], [120, 62], [202, 62]]) { const f = 0.9 + 0.1 * Math.sin(t * 11 + cx) * Math.sin(t * 3.7 + cx); i_brillo(R, cx, cy - 2, luz === 'noche' ? 20 : 14, hex('#ffd890'), (luz === 'noche' ? 0.55 : 0.32) * f);
    rect(cx - 3, cy - 6, cx + 3, cy - 1, hex('#f6e0b0')); rect(cx - 2, cy - 7, cx + 2, cy - 7, hex('#f6e0b0')); rect(cx - 2, cy - 6, cx - 1, cy - 2, hex('#fff6dc')); rect(cx - 3, cy - 1, cx + 3, cy - 1, IP.alfO); pset(cx + 2, cy - 5, hex('#e0c088')); }
  // el ventanuco de la puerta: el pasillo y un camarero de blanco que pasa con su bandeja
  R.recorte([11, 43, 25, 69]); { const u = ((t * 7) % 70) - 18, x = Math.round(11 + u), y = 68;
    if (u > -10 && u < 30) { rect(x, y - 12, x + 4, y, C.k); pset(x + 1, y - 13, C.k); pset(x + 2, y - 13, C.k); pset(x + 3, y - 13, C.k);
      for (let j = y - 12; j <= y - 9; j++) for (let i = x + 1; i <= x + 3; i++) pset(i, j, hex('#f0c8a0'));
      for (let j = y - 8; j <= y - 1; j++) for (let i = x + 1; i <= x + 3; i++) pset(i, j, hex('#f4f4f4'));
      linea(x + 4, y - 7, x + 9, y - 7, IP.plata); pset(x + 6, y - 8, IP.cristal); pset(x + 8, y - 8, hex('#e88ab0')); } }
  R.recorte(null);
  return { suelo: 156, ventanas: i_VENT.map(([a, b, c, d]) => [a + 5, b + 7, c - 5, d]), sofa: { x0: 46, x1: 116, asiento: 130, suelo: 140 }, mesa: { x0: 184, x1: 276, tablero: 134, suelo: 148 },
    puerta: [4, 28, 32, 131], hielera: [177, 156], espejo: [290, 52, 316, 94] };
}

// lo fijo del vagón
function i_trenFijo(R, luz) {
  const { rect, pset, linea, poligono, disco } = R;
  // el techo abovedado: crema tramado, con artesones muy suaves (no bajo Atom) y la moldura dorada con dentellones
  for (let y = 0; y <= 15; y++) for (let x = 0; x < 320; x++) { const k = Math.max(0, Math.min(2, Math.floor(y / 15 * 2.4 + i_dith(x, y) - 0.4))); pset(x, y, [IP.techoL, IP.techo, IP.techoS][k]); }
  for (let x = 12; x < 270; x += 40) { for (let y = 3; y <= 12; y++) { pset(x, y, IP.techoS); pset(x + 32, y, IP.techoL); } for (let i = x; i <= x + 32; i++) { pset(i, 3, IP.techoS); pset(i, 12, IP.techoL); } }
  rect(0, 16, 319, 16, IP.alfO); rect(0, 17, 319, 20, IP.caobaS); for (let x = 0; x < 320; x += 4) rect(x, 18, x + 1, 19, IP.caoba); rect(0, 21, 319, 21, IP.caobaD);
  // la pared de caoba con veta
  i_vetaV(R, 0, 22, 319, 99, IP.caoba, IP.caobaS, IP.caobaL, 1);
  // pilastras acanaladas (la de la derecha, tranquila bajo Atom)
  for (const [a, b] of [[34, 41], [116, 124], [198, 206], [280, 287]]) { rect(a, 22, b, 99, IP.caobaS); rect(a + 1, 22, b - 1, 99, IP.caoba); rect(a + 1, 22, a + 1, 99, IP.caobaL); rect(b - 1, 22, b - 1, 99, IP.caobaD);
    for (let x = a + 3; x < b - 1; x += 2) for (let y = a > 270 ? 48 : 26; y < 96; y++) pset(x, y, IP.caobaS); rect(a, 22, b, 24, IP.caobaD); rect(a, 96, b, 99, IP.caobaD); rect(a, 95, b, 95, IP.alfOS); }
  // el portaequipajes de latón sobre cada ventana
  for (const [x0, , x1] of i_VENT) { rect(x0 - 2, 26, x1 + 2, 26, IP.alfO); rect(x0 - 2, 27, x1 + 2, 27, IP.alfOS); rect(x0 - 2, 30, x1 + 2, 30, IP.alfOS);
    for (let x = x0; x <= x1; x += 3) pset(x, 28, IP.alfOS); for (const bx of [x0 - 1, x1 + 1]) { linea(bx, 26, bx + (bx < x0 + 5 ? -3 : 3), 33, IP.alfOS); pset(bx, 26, IP.alfOL); } }
  // las ventanas: marco de caoba con bisel, filo de latón, esquinas redondeadas; galería con flecos y cortinas recogidas
  for (const [x0, y0, x1, y1] of i_VENT) {
    rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, IP.caobaD); rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, IP.caobaL); rect(x0 - 2, y0 - 2, x1 + 3, y1 + 3, IP.caobaS); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, IP.caoba);
    rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, IP.alfO); rect(x0, y0, x1, y1, hex('#203040'));
    poligono([[x0 - 6, y0 - 6], [x1 + 6, y0 - 6], [x1 + 6, y0 + 3], [x0 - 6, y0 + 3]], IP.terc); rect(x0 - 6, y0 - 6, x1 + 6, y0 - 6, IP.tercL); rect(x0 - 6, y0 - 5, x1 + 6, y0 - 5, IP.tercL);
    for (let x = x0 - 6; x <= x1 + 6; x++) { const u = ((x - x0 + 6) % 12) / 12, d = Math.round(Math.sin(u * Math.PI) * 3); for (let y = y0 + 3; y <= y0 + 3 + d; y++) pset(x, y, y === y0 + 3 + d ? IP.tercS : IP.terc); pset(x, y0 + 4 + d, (x & 1) ? IP.alfO : IP.alfOS); if (x % 12 === (x0 + 6) % 12) { pset(x, y0 + 5 + d, IP.alfO); pset(x, y0 + 6 + d, IP.alfOS); } }
    for (const lado of [-1, 1]) for (let y = y0 + 2; y <= y1 + 5; y++) { const ata = y0 + 40, g = Math.max(0, 1 - Math.abs(y - ata) / 14), w = Math.round(9 - g * 4), xa = lado < 0 ? x0 - 4 : x1 + 4 - w, xb = xa + w;
      for (let x = Math.max(xa, lado < 0 ? -9 : x1 - 5); x <= Math.min(xb, lado < 0 ? x0 + 4 : 999); x++) { const p = (x - xa) % 3; pset(x, y, p === 0 ? IP.tercL : p === 1 ? IP.terc : IP.tercS); }
      if (Math.abs(y - ata) < 2) for (let x = xa; x <= xb; x++) pset(x, y, IP.alfO); }
  }
  // la barra de latón y el friso de cuarterones
  rect(0, 100, 319, 100, IP.alfOL); rect(0, 101, 319, 101, IP.alfOS); rect(0, 102, 319, 127, IP.caobaS);
  for (let x = 2; x < 318; x += 40) i_cuarteron(R, x, 104, x + 37, 125, IP.caoba, IP.caobaS, IP.caobaL, IP.caobaD, x);
  rect(0, 128, 319, 128, IP.alfO); rect(0, 129, 319, 131, IP.caobaD);
  // la moqueta granate con rombos dorados en perspectiva, su pelo y la cenefa junto a la pared
  for (let y = 132; y < 180; y++) { const z = 1 / (y - 60), wz = 6000 * z;
    for (let x = 0; x < 320; x++) { const wx = (x - 160) * z * 36, a = ((wx + wz) % 10 + 10) % 10, b = ((wx - wz) % 10 + 10) % 10, r = h(x, y, 930);
      let c = r < 0.16 ? IP.alfS : r > 0.95 ? IP.alfL : IP.alf;
      if (a < 0.7 || b < 0.7) c = (x + y) & 1 ? IP.alfO : IP.alfOS; else if (Math.abs(a - 5) < 1.2 && Math.abs(b - 5) < 1.2) c = IP.alfOS;
      if (y < 136) c = y === 133 ? IP.alfO : IP.alfS; pset(x, y, c); } }
  // las manchas de sol de las ventanas en la moqueta
  if (luz !== 'noche') for (const [x0, , x1] of i_VENT) for (let y = 136; y <= 176; y++) { const d = Math.round((y - 136) * 0.6); for (let x = x0 + 6 + d; x <= x1 - 6 + d; x++) if (((x + y) & 1) === 0) { const c = R.pget(x, y); R.pset(x, y, i_mezcla(c, luz === 'tarde' ? hex('#ffb070') : hex('#ffe8b0'), 0.32)); } }
  // la puerta del pasillo, con su ventanuco y el tirador
  rect(4, 28, 32, 131, IP.caobaD); rect(6, 30, 30, 131, IP.caoba); i_vetaV(R, 7, 31, 29, 130, IP.caoba, IP.caobaS, IP.caobaL, 7);
  rect(9, 41, 27, 71, IP.alfO); rect(10, 42, 26, 70, IP.caobaD); rect(11, 43, 25, 69, hex('#f0dcb0'));
  for (let y = 43; y <= 69; y++) for (let x = 11; x <= 25; x++) pset(x, y, y > 62 ? hex('#a87a4a') : (x + y) % 7 === 0 ? hex('#e0c890') : hex('#f0dcb0'));
  rect(11, 52, 25, 52, hex('#d8c080')); i_cuarteron(R, 9, 78, 27, 102, IP.caoba, IP.caobaS, IP.caobaL, IP.caobaD, 3); i_cuarteron(R, 9, 105, 27, 121, IP.caoba, IP.caobaS, IP.caobaL, IP.caobaD, 4);
  rect(27, 86, 30, 89, C.k); rect(27, 87, 29, 88, IP.alfO); pset(27, 87, IP.alfOL); rect(6, 124, 30, 130, IP.alfOS); rect(6, 124, 30, 124, IP.alfO);
  // el espejo dorado de la derecha (refleja la luz de las ventanas)
  rect(289, 51, 316, 95, IP.alfOS); rect(290, 52, 315, 94, IP.alfO); rect(291, 53, 314, 93, IP.alfOS);
  for (let y = 54; y <= 92; y++) for (let x = 292; x <= 313; x++) { const u = (y - 54) / 38; pset(x, y, [hex('#9a8a9a'), hex('#b8a8b0'), hex('#7a6a7a')][Math.max(0, Math.min(2, Math.floor(u * 2.2 + i_dith(x, y) - 0.3)))]); }
  for (let i = 0; i < 14; i++) { pset(296 + i, 88 - i * 2, hex('#e0d4dc')); pset(297 + i, 88 - i * 2, hex('#e0d4dc')); } for (let i = 0; i < 8; i++) pset(304 + i, 90 - i * 2, hex('#d0c4cc'));
  disco(303, 50, 3, IP.alfO); pset(303, 49, IP.alfOL);
  // el sofá capitoné de terciopelo bajo la primera ventana
  const s0 = 44, s1 = 118;
  for (let y = 104; y <= 131; y++) { const curva = Math.round(Math.max(0, 6 - (y - 104)) * 0.6 * 0); for (let x = s0 + 4; x <= s1 - 4; x++) pset(x, y, IP.terc); }
  for (let x = s0 + 4; x <= s1 - 4; x++) { const dy = Math.round(Math.sin((x - s0 - 4) / (s1 - s0 - 8) * Math.PI) * 4); for (let y = 104 - dy; y < 106; y++) pset(x, y, IP.terc); pset(x, 104 - dy, IP.tercL); pset(x, 105 - dy, IP.tercL); pset(x, 103 - dy, C.k); }
  rect(78, 95, 84, 99, IP.alfOS); rect(79, 96, 83, 98, IP.alfO); pset(81, 94, IP.alfO);
  for (let y = 110; y < 130; y += 7) for (let x = s0 + 9 + ((y / 7) & 1) * 5; x < s1 - 6; x += 10) { pset(x, y, IP.tercD); pset(x - 1, y - 1, IP.tercS); pset(x + 1, y + 1, IP.tercL); linea(x + 1, y + 1, x + 4, y + 4, IP.tercS); linea(x - 1, y + 1, x - 4, y + 4, IP.tercS); }
  for (const [a, b] of [[s0 - 2, s0 + 8], [s1 - 8, s1 + 2]]) { rect(a, 116, b, 146, C.k); rect(a + 1, 117, b - 1, 146, IP.terc); disco((a + b) / 2, 117, (b - a) / 2 + 0.5, C.k); disco((a + b) / 2, 117, (b - a) / 2 - 0.5, IP.tercL); disco((a + b) / 2, 117, 2, IP.terc); pset((a + b) >> 1, 117, IP.tercD);
    rect(a + 1, 124, a + 1, 146, IP.tercL); rect(b - 1, 124, b - 1, 146, IP.tercS); }
  rect(s0 + 8, 129, s1 - 8, 138, C.k); rect(s0 + 9, 130, s1 - 9, 137, IP.terc); rect(s0 + 9, 130, s1 - 9, 130, IP.tercL); rect(s0 + 9, 131, s1 - 9, 131, IP.tercL); rect(81, 130, 81, 137, IP.tercD); rect(s0 + 9, 137, s1 - 9, 137, IP.tercS);
  rect(s0 - 2, 139, s1 + 2, 146, IP.terc); rect(s0 - 2, 139, s1 + 2, 139, IP.tercD); rect(s0 - 2, 145, s1 + 2, 146, IP.tercS);
  for (let x = s0 - 2; x <= s1 + 2; x++) { pset(x, 147, (x & 1) ? IP.alfO : IP.alfOS); if (x % 3 === 0) pset(x, 148, IP.alfOS); }
  for (const lx of [s0, s1 - 2]) { rect(lx, 148, lx + 2, 152, C.k); rect(lx + 1, 148, lx + 1, 151, IP.alfO); }
  rect(52, 120, 64, 130, C.k); rect(53, 121, 63, 129, IP.alfO); rect(53, 121, 63, 122, IP.alfOL); rect(53, 128, 63, 129, IP.alfOS); pset(58, 125, IP.alfOS); pset(52, 130, IP.alfO); pset(64, 120, IP.alfO);
  // la sombra del sofá en la moqueta
  for (let y = 149; y <= 155; y++) for (let x = s0 - 4 + (y - 149); x <= s1 + 6 - (y - 149); x++) { const c = R.pget(x, y); pset(x, y, i_mezcla(c, C.k, 0.35)); }
  // la cubitera de pie con la botella
  for (const [a, b] of [[172, 158], [182, 158], [177, 159]]) linea(177, 136, a, b, IP.alfOS); rect(176, 136, 178, 150, IP.alfO);
  for (let y = 158; y <= 160; y++) for (let x = 168; x <= 186; x++) { const c = R.pget(x, y); pset(x, y, i_mezcla(c, C.k, 0.3)); }
  linea(180, 112, 184, 125, C.k); linea(181, 112, 185, 125, hex('#1e4a2a')); linea(182, 112, 186, 125, hex('#2e6a3a')); rect(179, 110, 182, 113, IP.alfO);
  rect(169, 124, 186, 137, C.k); rect(170, 125, 185, 136, IP.plata); rect(170, 125, 185, 126, IP.plataL); rect(183, 127, 185, 136, IP.plataS); rect(171, 133, 182, 133, IP.plataS);
  for (const [x, y] of [[172, 129], [176, 131], [180, 128], [174, 134]]) pset(x, y, IP.plataL); rect(168, 124, 187, 124, IP.plataS);
}

// la mesa del vagón, por delante de los personajes (tablero en y 134–146, mantel hasta 168, patas doradas): el mantel
// con pliegues y puntilla, el frutero de plata con uvas, manzanas, naranja y plátano, el pastelero de dos pisos con
// pastelitos y macarons, dos copas con licor ámbar que tiembla y una vela con su llama
function i_mesaTren(R, t) {
  const { rect, pset, linea, disco, poligono } = R, cx = 230, cy = 140, rx = 46, ry = 6;
  for (const lx of [194, 266]) { rect(lx - 2, 166, lx + 2, 179, C.k); rect(lx - 1, 166, lx + 1, 179, IP.alfO); rect(lx + 1, 166, lx + 1, 179, IP.alfOS); rect(lx - 2, 172, lx + 2, 173, IP.alfOS); }
  for (let y = cy; y <= 168; y++) { const ex = Math.round((y - cy) * 0.12); for (let x = cx - rx - 1 - ex; x <= cx + rx + 1 + ex; x++) { const p = ((x - cx + 200) % 11); pset(x, y, x === cx - rx - 1 - ex || x === cx + rx + 1 + ex ? C.k : p < 2 ? IP.mantelS : p === 2 ? IP.mantelD : IP.mantel); } }
  for (let x = cx - rx - 4; x <= cx + rx + 4; x++) { const d = (x & 3) < 2 ? 1 : 0; pset(x, 168 + d, IP.mantelS); pset(x, 169 + d, (x & 1) ? IP.mantel : IP.mantelD); }
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(1 - (j / (ry + 0.5)) ** 2)); linea(cx - w, cy + j, cx + w, cy + j, j < -ry + 2 ? IP.mantelS : IP.mantel); pset(cx - w - 1, cy + j, C.k); pset(cx + w + 1, cy + j, C.k); }
  linea(cx - rx + 4, cy - ry - 1, cx + rx - 4, cy - ry - 1, C.k); linea(cx - rx, cy + ry, cx + rx, cy + ry, IP.mantelD);
  // el frutero
  rect(203, 140, 211, 141, IP.plataS); rect(205, 137, 209, 139, IP.plata); poligono([[196, 131], [218, 131], [214, 137], [200, 137]], C.k); poligono([[197, 132], [217, 132], [213, 136], [201, 136]], IP.plata); rect(198, 132, 216, 132, IP.plataL);
  disco(201, 129, 3, C.k); disco(201, 129, 2.4, hex('#c8323a')); pset(200, 128, hex('#f08a8a')); disco(207, 128, 3.2, C.k); disco(207, 128, 2.6, hex('#f09030')); pset(206, 127, hex('#ffd090'));
  disco(213, 129, 3, C.k); disco(213, 129, 2.4, hex('#8ac040')); pset(212, 128, hex('#c8e88a')); for (const [x, y] of [[215, 132], [217, 133], [216, 135], [218, 136], [217, 138]]) { disco(x, y, 1.6, C.k); pset(x, y, hex('#7a3a9a')); pset(x - 1, y - 1, hex('#aa7ac8')); }
  linea(199, 126, 205, 124, C.k); linea(200, 125, 205, 123, hex('#f0d040')); pset(205, 122, hex('#6a5a20'));
  // el pastelero
  rect(254, 125, 255, 138, IP.alfO); rect(240, 138, 269, 139, C.k); rect(241, 137, 268, 137, IP.plataL); rect(245, 127, 264, 128, C.k); rect(246, 126, 263, 126, IP.plataL); disco(254, 122, 1.5, IP.alfO);
  for (const [x, y, c] of [[243, 136, '#f08ab0'], [249, 136, '#8ae0c0'], [255, 136, '#f6e2b0'], [261, 136, '#f08ab0'], [266, 136, '#c8a0f0'], [248, 125, '#8ae0c0'], [253, 125, '#f08ab0'], [259, 125, '#f6e2b0']]) {
    rect(x - 2, y - 2, x + 2, y, C.k); rect(x - 1, y - 2, x + 1, y - 1, hex(c)); pset(x - 1, y - 2, IP.mantel); if (x % 3 === 0) pset(x, y - 3, hex('#c8323a')); }
  // las copas con licor que tiembla con el traqueteo, y la vela
  for (const gx of [222, 238]) { const s = Math.round(Math.sin(t * 9 + gx) * 0.6); rect(gx - 2, 130, gx + 2, 134, C.k); rect(gx - 1, 131 + (s > 0 ? 1 : 0), gx + 1, 133, hex('#d89030')); rect(gx - 1, 131, gx - 1, 131, IP.cristal); rect(gx, 135, gx, 137, IP.cristal); rect(gx - 2, 138, gx + 2, 138, IP.cristal); pset(gx + 1, 132, hex('#f8c870')); }
  rect(229, 128, 231, 137, C.k); rect(230, 129, 230, 137, IP.mantel); rect(227, 137, 233, 138, IP.alfO); const fl = Math.sin(t * 13) > 0 ? 1 : 0; pset(230, 126 - fl, hex('#ffe080')); pset(230, 127, hex('#ffb040')); pset(229 + fl, 126, hex('#fff6c8'));
}

const i_VG = [46, 22, 234, 136];

function i_trenVentana(R, t, o) {
  const luz = o.luz ?? 'dia', tv = t * (o.velocidad ?? 1), { rect, pset, linea } = R, [x0, y0, x1, y1] = i_VG;
  R.copiar(i_capa(R, 'trenV-' + luz, () => i_trenVentanaFijo(R, luz)));
  const g = [x0 + 8, y0 + 12, x1 - 8, y1];
  i_paisaje(R, tv, g, luz, 1.8, luz === 'noche' ? [190, 44, 6] : luz === 'tarde' ? [182, 86, 9] : [196, 46, 7]);
  i_reflejo(R, g, luz === 'noche' ? 0.07 : 0.14);
  rect(g[0], y0 + 34, g[2], y0 + 35, IP.alfOS); rect(g[0], y0 + 36, g[2], y0 + 36, IP.alfO); rect(g[0], y0 + 37, g[2], y0 + 37, IP.alfOS);
  // las borlas y el aplique
  for (const bx of [x0 - 3, x1 + 3]) { const s = Math.round(Math.sin(tv * 2.1 + bx * 0.1) * 1.5), ty = 92; linea(bx, ty, bx + s, ty + 8, IP.alfOS); rect(bx - 2 + s, ty + 8, bx + 2 + s, ty + 12, IP.alfO); rect(bx - 2 + s, ty + 12, bx + 2 + s, ty + 13, IP.alfOS); }
  const f = 0.9 + 0.1 * Math.sin(t * 11) * Math.sin(t * 3.7); i_brillo(R, 268, 66, luz === 'noche' ? 26 : 18, hex('#ffd890'), (luz === 'noche' ? 0.55 : 0.3) * f);
  rect(264, 58, 272, 65, hex('#f6e0b0')); rect(265, 57, 271, 57, hex('#f6e0b0')); rect(265, 58, 266, 63, hex('#fff6dc')); rect(264, 65, 272, 66, IP.alfO);
  return { suelo: 152, ventana: g, libre: [52, 228] };
}

function i_trenVentanaFijo(R, luz) {
  const { rect, pset, linea, poligono, disco } = R, [x0, y0, x1, y1] = i_VG;
  for (let y = 0; y <= 9; y++) for (let x = 0; x < 320; x++) pset(x, y, [IP.techoL, IP.techo, IP.techoS][Math.max(0, Math.min(2, Math.floor(y / 9 * 2.4 + i_dith(x, y) - 0.4)))]);
  rect(0, 10, 319, 10, IP.alfO); rect(0, 11, 319, 14, IP.caobaS); for (let x = 0; x < 320; x += 5) rect(x, 12, x + 2, 13, IP.caoba); rect(0, 15, 319, 15, IP.caobaD);
  i_vetaV(R, 0, 16, 319, 139, IP.caoba, IP.caobaS, IP.caobaL, 2);
  // los paneles a los lados (el de la derecha, tranquilo bajo Atom)
  i_cuarteron(R, 4, 30, 22, 128, IP.caoba, IP.caobaS, IP.caobaL, IP.caobaD, 5); i_cuarteron(R, 258, 82, 314, 130, IP.caoba, IP.caobaS, IP.caobaL, IP.caobaD, 6);
  // un cuadro pequeño del Capitolio (torres de colores al atardecer, sin letras) en el panel de la derecha
  rect(268, 88, 304, 116, IP.alfOS); rect(269, 89, 303, 115, IP.alfO); rect(270, 90, 302, 114, IP.alfOS);
  for (let y = 91; y <= 113; y++) for (let x = 271; x <= 301; x++) pset(x, y, [hex('#f6c47e'), hex('#e0886a'), hex('#9a5a8a')][Math.max(0, Math.min(2, Math.floor((113 - y) / 22 * 3 + i_dith(x, y) - 0.5)))]);
  for (const [x, w, al, c] of [[274, 4, 14, '#e85aa8'], [279, 5, 19, '#3ad0c8'], [285, 4, 12, '#8a4ad8'], [290, 5, 16, '#eef0f4'], [296, 4, 10, '#e8b830']]) { rect(x, 113 - al, x + w - 1, 113, hex(c)); rect(x, 113 - al, x, 113, i_mezcla(hex(c), hex('#ffffff'), 0.4)); pset(x + 1, 113 - al - 1, hex(c)); }
  rect(271, 112, 301, 113, hex('#4a3a5a')); disco(286, 84, 1.5, IP.alfO);
  for (const [a, b] of [[250, 256]]) { rect(a, 16, b, 139, IP.caobaS); rect(a + 1, 16, b - 1, 139, IP.caoba); rect(a + 1, 16, a + 1, 139, IP.caobaL); for (let x = a + 3; x < b - 1; x += 2) for (let y = 50; y < 136; y++) pset(x, y, IP.caobaS); }
  // el marco grande: caoba con bisel, latón y esquinas redondeadas
  rect(x0 - 6, y0 - 6, x1 + 6, y1 + 4, IP.caobaD); rect(x0 - 5, y0 - 5, x1 + 5, y1 + 3, IP.caobaL); rect(x0 - 3, y0 - 3, x1 + 5, y1 + 3, IP.caobaS); rect(x0 - 3, y0 - 3, x1 + 3, y1 + 2, IP.caoba);
  rect(x0 + 6, y0 + 10, x1 - 6, y1, IP.alfO); rect(x0 + 7, y0 + 11, x1 - 7, y1, IP.alfOS);
  // la galería con flecos y las cortinas recogidas
  poligono([[x0 - 22, y0 - 6], [x1 + 22, y0 - 6], [x1 + 22, y0 + 6], [x0 - 22, y0 + 6]], IP.terc); rect(x0 - 22, y0 - 6, x1 + 22, y0 - 4, IP.tercL); rect(x0 - 22, y0 - 6, x1 + 22, y0 - 6, C.k);
  for (let x = x0 - 22; x <= x1 + 22; x++) { const u = ((x - x0 + 22) % 20) / 20, d = Math.round(Math.sin(u * Math.PI) * 5); for (let y = y0 + 6; y <= y0 + 6 + d; y++) pset(x, y, y === y0 + 6 + d ? IP.tercS : IP.terc); pset(x, y0 + 7 + d, (x & 1) ? IP.alfO : IP.alfOS); pset(x, y0 + 8 + d, (x % 3) ? IP.alfOS : IP.alfO); }
  for (const lado of [-1, 1]) for (let y = y0 + 4; y <= y1 + 8; y++) { const ata = 92, gg = Math.max(0, 1 - Math.abs(y - ata) / 22), w = Math.round(20 - gg * 9), xa = lado < 0 ? x0 - 20 : x1 + 20 - w;
    for (let x = xa; x <= xa + w; x++) { if (lado < 0 ? x > x0 + 7 : x < x1 - 7) continue; const p = (x - xa) % 4; pset(x, y, p === 0 ? IP.tercL : p === 3 ? IP.tercS : IP.terc); }
    if (Math.abs(y - ata) < 2) for (let x = xa; x <= xa + w; x++) pset(x, y, IP.alfO); }
  // el alféizar de latón, el friso bajo y la moqueta
  rect(x0 - 8, y1 + 1, x1 + 8, y1 + 3, IP.alfO); rect(x0 - 8, y1 + 1, x1 + 8, y1 + 1, IP.alfOL); rect(x0 - 8, y1 + 4, x1 + 8, y1 + 4, IP.alfOS);
  rect(0, 140, 319, 140, IP.alfO); rect(0, 141, 319, 145, IP.caobaD); for (let x = 0; x < 320; x += 16) rect(x, 142, x, 144, IP.caobaS);
  for (let y = 146; y < 180; y++) { const z = 1 / (y - 90), wz = 3400 * z;
    for (let x = 0; x < 320; x++) { const wx = (x - 160) * z * 22, a = ((wx + wz) % 10 + 10) % 10, b = ((wx - wz) % 10 + 10) % 10, r = h(x, y, 931);
      let c = r < 0.16 ? IP.alfS : r > 0.95 ? IP.alfL : IP.alf; if (a < 0.6 || b < 0.6) c = (x + y) & 1 ? IP.alfO : IP.alfOS; else if (Math.abs(a - 5) < 1.1 && Math.abs(b - 5) < 1.1) c = IP.alfOS;
      if (y < 149) c = IP.alfS; pset(x, y, c); } }
  if (luz !== 'noche') for (let y = 149; y <= 179; y++) { const d = Math.round((y - 149) * 0.5); for (let x = x0 + 10 + d; x <= x1 - 10 + d; x++) if (((x + y) & 1) === 0) pset(x, y, i_mezcla(R.pget(x, y), luz === 'tarde' ? hex('#ffb070') : hex('#ffe8b0'), 0.3)); }
}

// delante de la ventana: a la izquierda, el brazo de un sillón de terciopelo; a la derecha, la mesita redonda con la
// licorera de cristal tallado y un vaso con licor que tiembla con el traqueteo
function i_trenVentanaDelante(R, t) {
  const { rect, pset, disco, linea } = R;
  rect(0, 150, 34, 179, C.k); rect(0, 151, 33, 179, IP.terc); disco(18, 152, 16, C.k); disco(18, 152, 15, IP.tercL); disco(18, 152, 11, IP.terc); disco(18, 152, 4, IP.tercS); pset(18, 152, IP.tercD);
  for (let y = 160; y < 180; y += 3) linea(0, y, 33, y, IP.tercS); rect(33, 152, 33, 179, IP.tercS);
  rect(264, 156, 312, 158, C.k); rect(265, 156, 311, 156, IP.caobaL); rect(265, 157, 311, 157, IP.caoba); rect(286, 159, 290, 179, IP.caobaS); rect(287, 159, 287, 179, IP.caobaL); rect(276, 176, 300, 179, IP.caobaD);
  rect(270, 138, 282, 155, C.k); rect(271, 139, 281, 154, IP.cristal); rect(271, 145, 281, 154, hex('#c87a28')); rect(271, 145, 281, 145, hex('#e8a040')); rect(274, 132, 278, 138, C.k); rect(275, 133, 277, 137, IP.cristal); disco(276, 130, 2.5, C.k); disco(276, 130, 1.5, IP.cristal);
  for (let y = 140; y < 154; y += 3) { pset(273, y, hex('#ffffff')); pset(279, y + 1, IP.plataS); }
  const s = Math.round(Math.sin(t * 9) * 0.7); rect(294, 146, 302, 155, C.k); rect(295, 147, 301, 154, IP.cristal); rect(295, 150 + (s > 0 ? 1 : 0), 301, 154, hex('#d89030')); rect(295, 150, 301, 150, hex('#f8c870')); pset(296, 148, hex('#ffffff'));
}

// el 12 que se ve por la ventana del alcalde (recortado a v): cielo gris tramado con nubes lentas, el castillete de la
// mina con su humo, escoriales, casas de tablas con chimeneas que humean, la calle con un minero que pasa y pájaros
function i_vistaDistrito(R, t, v, e = 1) {
  const [x0, y0, x1, y1] = v, H = y1 - y0, { pset, linea, poligono, disco } = R, cs = [hex('#8e9cb0'), hex('#a6b2c2'), hex('#bec6d0'), hex('#d6d6d2')];
  R.recorte(v);
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / (H * 0.7) * 3; for (let x = x0; x <= x1; x++) pset(x, y, cs[Math.max(0, Math.min(3, Math.floor(u + i_dith(x, y) - 0.5)))]); }
  for (let k = 0; k < 5; k++) { const w = (8 + h(k, 2, 940) * 8) * e, cx = ((h(k, 1, 940) * 160 - t * (0.8 + (k % 3) * 0.7) * e) % 160 + 160) % 160 + x0 - 40, cy = y0 + H * (0.08 + h(k, 3, 940) * 0.22);
    i_nube(R, Math.round(cx), Math.round(cy), w, [hex('#eceef0'), hex('#c8ccd4'), hex('#9aa2b0')]); }
  const hz = Math.round(y0 + H * 0.62);
  // escoriales y el castillete con su rueda que gira
  poligono([[x0 - 4, hz], [x0 + 10 * e, hz - 12 * e], [x0 + 26 * e, hz]], hex('#5a5a64')); poligono([[x0 + 16 * e, hz], [x0 + 34 * e, hz - 9 * e], [x0 + 52 * e, hz]], hex('#4a4a54'));
  const mx = Math.round(x0 + (x1 - x0) * 0.62), my = hz - Math.round(26 * e);
  linea(mx - 6 * e, hz, mx, my, hex('#3a3a44')); linea(mx + 6 * e, hz, mx, my, hex('#3a3a44')); linea(mx - 4 * e, hz - 8 * e, mx + 4 * e, hz - 8 * e, hex('#3a3a44')); linea(mx - 2 * e, hz - 16 * e, mx + 2 * e, hz - 16 * e, hex('#3a3a44'));
  disco(mx, my, 3 * e, hex('#3a3a44')); disco(mx, my, 2 * e, cs[1]); const an = t * 1.5; linea(mx, my, mx + Math.cos(an) * 2.5 * e, my + Math.sin(an) * 2.5 * e, hex('#3a3a44'));
  const chx = Math.round(mx + 12 * e); linea(chx, hz, chx, hz - 22 * e, hex('#5a4a44')); linea(chx + 1, hz, chx + 1, hz - 22 * e, hex('#6a5a50'));
  for (let k = 0; k < 7; k++) { const u = (t * 0.22 + k / 7) % 1; disco(chx + u * 14 * e + Math.sin(u * 6 + k) * 2, hz - 23 * e - u * 22 * e, (1 + u * 3) * e, u < 0.5 ? hex('#5a5a62') : hex('#7a7a84')); }
  // las casas de tablas del 12
  for (let k = 0; k < 6; k++) { const bx = Math.round(x0 - 4 + k * 13 * e), w = Math.round(11 * e), al = Math.round((8 + (k % 3) * 2) * e), base = Math.round(hz + 8 * e);
    poligono([[bx - 1, base - al], [bx + w / 2, base - al - 5 * e], [bx + w + 1, base - al]], hex('#4a4048'));
    for (let x = bx; x <= bx + w; x++) linea(x, base - al, x, base, (x - bx) % 3 === 0 ? hex('#6a6058') : hex('#857a6e'));
    pset(bx + 3, base - Math.round(al / 2), hex('#2a2a30')); pset(bx + 4, base - Math.round(al / 2), hex('#2a2a30'));
    if (k % 2 === 0) { const cx2 = bx + w - 2; linea(cx2, base - al - 4 * e, cx2, base - al, hex('#4a3a34')); for (let j = 0; j < 3; j++) { const u = (t * 0.4 + j / 3 + k * 0.1) % 1; pset(Math.round(cx2 + u * 4), Math.round(base - al - 5 * e - u * 8 * e), hex('#9a9aa2')); } } }
  // la calle, con su polvo de carbón, y un minero con su lámpara que pasa
  const cy0 = Math.round(hz + 8 * e); for (let y = cy0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, h(x, y, 941) < 0.2 ? hex('#4a4a50') : h(x, y, 942) < 0.1 ? hex('#7a7068') : hex('#5e5a58'));
  const u = ((t * 5) % ((x1 - x0) + 30)) - 10, px = Math.round(x1 - u), py = y1 - 2;
  linea(px, py - 6, px, py - 2, hex('#2a2a34')); pset(px + 1, py - 4, hex('#2a2a34')); pset(px, py - 7, hex('#e0b890')); pset(px, py - 8, hex('#3a3a44')); pset(px - 1, py - 8, hex('#f8e070'));
  pset(px + (Math.floor(t * 6) % 2 ? 1 : -1), py - 1, hex('#2a2a34')); pset(px, py - 1, hex('#2a2a34'));
  for (let k = 0; k < 3; k++) { const bx = Math.round(((h(k, 7, 943) * 120 + t * (5 + k)) % 120) + x0 - 20), by = Math.round(y0 + H * 0.2 + k * 3 + Math.sin(t + k) * 2), a = Math.sin(t * 8 + k) > 0 ? 1 : 0; pset(bx, by, hex('#2a2a34')); pset(bx - 1, by - a, hex('#2a2a34')); pset(bx + 1, by - a, hex('#2a2a34')); }
  R.recorte(null);
}

// un retrato enmarcado en tono sepia (oval: marco ovalado dorado; si no, rectangular de madera o de oro). tipo: 'chica'
// (la chica rubia con el broche dorado: el único color vivo), 'pareja', 'mina', 'bebe', 'casa' o 'familia'
function i_foto(R, x0, y0, x1, y1, tipo, oval = false, oro = true, t = 0) {
  const { rect, pset, disco, linea } = R, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rxx = (x1 - x0) / 2, ryy = (y1 - y0) / 2;
  const dentro = (x, y, m) => oval ? ((x - cx) / (rxx - m)) ** 2 + ((y - cy) / (ryy - m)) ** 2 <= 1 : x >= x0 + m && x <= x1 - m && y >= y0 + m && y <= y1 - m;
  const fr = oro ? [IP.alfOS, IP.alfO, IP.alfOL] : [IP.nogalD, IP.nogal, IP.nogalL], b = oval ? 3 : Math.max(2, Math.round(Math.min(x1 - x0, y1 - y0) / 9));
  // la sombra en la pared, el marco con su luz y el fondo de la foto, con viñeta
  for (let y = y0 + 1; y <= y1 + 2; y++) for (let x = x0 + 1; x <= x1 + 2; x++) if (dentro(x - 2, y - 2, 0) && !dentro(x, y, 0)) pset(x, y, i_mezcla(R.pget(x, y), C.k, 0.35));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (!dentro(x, y, 0)) continue;
    if (!dentro(x, y, 1)) { pset(x, y, C.k); continue; }
    if (!dentro(x, y, b)) { const luz = (x - cx) * -0.5 + (y - cy) * -1 > 0; pset(x, y, !dentro(x, y, b - 1) ? fr[0] : luz ? fr[2] : fr[1]); continue; }
    const d = oval ? Math.hypot((x - cx) / rxx, (y - cy) / ryy) : Math.max(Math.abs(x - cx) / rxx, Math.abs(y - cy) / ryy);
    pset(x, y, [IP.sepiaL, IP.sepia, IP.sepiaS][Math.max(0, Math.min(2, Math.floor(d * 2.2 + i_dith(x, y) - 0.5)))]); }
  const ix0 = x0 + b + 1, iy0 = y0 + b + 1, ix1 = x1 - b - 1, iy1 = y1 - b - 1, W = ix1 - ix0, Hh = iy1 - iy0, mx = Math.round((ix0 + ix1) / 2);
  R.recorte([ix0, iy0, ix1, iy1]);
  let broche = null;
  const busto = (bx, by, s, pelo, ropa, piel = IP.sepiaL) => { // un busto pequeño: hombros, cuello, cabeza, pelo y ojos
    disco(bx, by + s * 2.1, s * 1.5, ropa); disco(bx, by, s, piel); disco(bx, by - s * 0.35, s * 1.02, pelo); disco(bx, by + s * 0.2, s * 0.85, piel);
    if (s >= 3) { pset(Math.round(bx - s * 0.35), Math.round(by + s * 0.1), IP.sepiaD); pset(Math.round(bx + s * 0.35), Math.round(by + s * 0.1), IP.sepiaD); } };
  if (tipo === 'chica') { const s = Math.max(2, W * 0.2), by = iy0 + Hh * 0.48, pelo = hex('#f0d890'), piel = hex('#f4dcc0'), vestido = hex('#f6f0e2');
    disco(mx, by + s * 2.2, s * 1.7, vestido); disco(mx, by + s * 0.2, s * 1.25, pelo); disco(mx - s * 0.9, by + s * 0.9, s * 0.55, pelo); disco(mx + s * 0.9, by + s * 0.9, s * 0.55, pelo);
    disco(mx, by + s * 0.3, s * 0.85, piel); disco(mx, by - s * 0.45, s * 0.8, pelo);
    if (s >= 3) { pset(Math.round(mx - s * 0.35), Math.round(by + s * 0.3), hex('#5a4030')); pset(Math.round(mx + s * 0.35), Math.round(by + s * 0.3), hex('#5a4030')); pset(Math.round(mx - s * 0.55), Math.round(by + s * 0.65), hex('#f0a8a0')); pset(Math.round(mx + s * 0.55), Math.round(by + s * 0.65), hex('#f0a8a0')); }
    const brx = Math.round(mx - s * 0.75), bry = Math.round(by + s * 1.75); disco(brx, bry, Math.max(1, s * 0.3), hex('#a87a18')); disco(brx, bry, Math.max(0.8, s * 0.22), hex('#f8d030')); pset(brx, bry, hex('#fff6b0')); broche = [brx, bry];
  } else if (tipo === 'pareja') { const s = Math.max(2, W * 0.14); busto(mx - s * 1.2, iy0 + Hh * 0.45, s, IP.sepiaD, IP.sepiaD); busto(mx + s * 1.2, iy0 + Hh * 0.48, s * 0.95, IP.sepiaS, IP.sepiaL); }
  else if (tipo === 'familia') { const s = Math.max(1.5, W * 0.09); for (let k = 0; k < 4; k++) busto(ix0 + W * (0.18 + k * 0.21), iy0 + Hh * (k % 3 === 0 ? 0.42 : 0.55), s * (k % 3 === 0 ? 1.1 : 0.8), IP.sepiaD, k % 2 ? IP.sepiaS : IP.sepiaD); }
  else if (tipo === 'bebe') { disco(mx, iy0 + Hh * 0.62, W * 0.3, IP.sepiaL); disco(mx, iy0 + Hh * 0.4, W * 0.18, IP.sepiaL); pset(mx - 1, Math.round(iy0 + Hh * 0.4), IP.sepiaD); pset(mx + 1, Math.round(iy0 + Hh * 0.4), IP.sepiaD); linea(ix0, Math.round(iy0 + Hh * 0.62), ix1, Math.round(iy0 + Hh * 0.62), IP.sepiaS); }
  else if (tipo === 'mina') { const hz = Math.round(iy0 + Hh * 0.65); for (let x = ix0; x <= ix1; x++) linea(x, hz - Math.round(Math.sin((x - ix0) * 0.25) * 2 + 2), x, iy1, IP.sepiaS);
    linea(mx - W * 0.15, hz, mx, iy0 + Hh * 0.2, IP.sepiaD); linea(mx + W * 0.15, hz, mx, iy0 + Hh * 0.2, IP.sepiaD); disco(mx, iy0 + Hh * 0.2, Math.max(1, W * 0.06), IP.sepiaD); disco(mx + W * 0.3, iy0 + Hh * 0.25, W * 0.08, IP.sepiaL); }
  else if (tipo === 'casa') { const hz = Math.round(iy0 + Hh * 0.75), w = W * 0.5, al = Hh * 0.3; linea(ix0, hz, ix1, hz, IP.sepiaS);
    for (let x = Math.round(mx - w / 2); x <= mx + w / 2; x++) linea(x, Math.round(hz - al), x, hz, IP.sepiaS); R.poligono([[mx - w / 2 - 2, hz - al], [mx, hz - al - Hh * 0.18], [mx + w / 2 + 2, hz - al]], IP.sepiaD); pset(mx, hz - 2, IP.sepiaD); pset(mx, hz - 1, IP.sepiaD); }
  R.recorte(null);
  // el brillo fijo del cristal
  for (let i = 0; i < Math.min(W, Hh) * 0.4; i++) { const x = Math.round(ix0 + 2 + i), y = Math.round(iy0 + Hh * 0.45 - i * 1.4); if (dentro(x, y, b + 1)) pset(x, y, i_mezcla(R.pget(x, y), hex('#ffffff'), 0.45)); }
  return { ix0, iy0, ix1, iy1, broche };
}

// papel pintado verde salvia a rayas con rombos pequeños (más suave y sin dibujo bajo Atom); esc: el tamaño del dibujo
function i_papel(R, x0, y0, x1, y1, esc = 1) {
  const p = Math.round(14 * esc);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let c = ((x % p) < Math.round(2 * esc)) ? IP.papelS : IP.papel; const r = h(x, y, 944); if (r < 0.06) c = IP.papelS; else if (r > 0.97) c = IP.papelL;
    if (!(x >= 268 && y < 50)) { const u = ((x + p / 2) % p) - p / 2 + 1, v = (y % Math.round(18 * esc)) - 9 * esc; if (Math.abs(u) + Math.abs(v) * 0.6 < 3.2 * esc && Math.abs(u) + Math.abs(v) * 0.6 > 1.8 * esc) c = IP.papelD; else if (Math.abs(u) + Math.abs(v) * 0.6 < 1 * esc) c = IP.papelL; }
    R.pset(x, y, c); }
}

// parqué en espiga con su brillo (y0 la línea de la pared)
function i_parquet(R, y0, y1, esc = 1) {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    const X = x / esc, Y = (y - y0) / esc * 2, cel = Math.floor((X + Y) / 8), lado = cel & 1, u = lado ? ((X - Y) % 16 + 16) % 16 : ((X + Y) % 8 + 8) % 8;
    let c = h(cel, Math.floor(lado ? (X + Y) / 8 : (X - Y) / 16), 945) < 0.5 ? IP.parquet : IP.parquetL; if (u < 1) c = IP.parquetD; else if (h(x, y >> 1, 946) < 0.12) c = IP.parquetS;
    R.pset(x, y, c); }
  for (let x = 0; x < 320; x++) { R.pset(x, y0, IP.parquetD); R.pset(x, y0 + 1, i_mezcla(R.pget(x, y0 + 1), C.k, 0.3)); }
}

function i_alcalde(R, t, o) {
  const { rect, pset, linea, disco } = R;
  R.copiar(i_capa(R, 'alcalde', () => i_alcaldeFijo(R)));
  // la ventana: el 12 de fuera, los cristales y el visillo de encaje
  i_vistaDistrito(R, t, [19, 29, 67, 101]);
  R.recorte([19, 29, 67, 101]);
  for (let y = 70; y <= 101; y++) for (let x = 19; x <= 67; x++) { const fl = ((x + 3) % 6 < 2 && (y % 6) < 2) || (x + y) % 9 === 0; if (!fl) pset(x, y, i_mezcla(R.pget(x, y), hex('#f6f2ea'), y < 73 ? 0.75 : 0.55)); }
  R.recorte(null);
  rect(42, 29, 44, 101, IP.zocaloS); rect(43, 29, 43, 101, IP.zocaloL); rect(19, 63, 67, 65, IP.zocaloS); rect(19, 63, 67, 63, IP.zocaloL); rect(19, 46, 67, 46, IP.zocaloS); rect(19, 82, 67, 82, IP.zocaloS);
  i_reflejo(R, [19, 29, 67, 62], 0.1);
  // el gato en el alféizar, que mueve la cola
  { const gx = 26, gy = 103; rect(gx, gy - 6, gx + 8, gy, C.k); rect(gx + 1, gy - 5, gx + 7, gy, hex('#4a4a52')); disco(gx + 7, gy - 7, 3, C.k); disco(gx + 7, gy - 7, 2, hex('#4a4a52')); pset(gx + 5, gy - 10, C.k); pset(gx + 9, gy - 10, C.k);
    if (Math.sin(t * 0.7) < 0.92) { pset(gx + 6, gy - 7, hex('#c8e040')); pset(gx + 8, gy - 7, hex('#c8e040')); }
    const c = Math.sin(t * 2.2) * 3; for (let i = 0; i < 6; i++) pset(Math.round(gx - i), Math.round(gy - 1 - i * 0.6 + c * i / 6 * (i / 6)), hex('#3a3a42')); }
  // el canario en su jaula, que salta de palo en palo
  { const salto = Math.floor(t / 1.3) % 3, fase = (t % 1.3) / 1.3, pal = [[83, 70], [89, 66], [86, 76]][salto], bx = pal[0], by = pal[1] - (fase < 0.2 ? Math.round(Math.sin(fase / 0.2 * Math.PI) * 3) : 0);
    R.recorte([79, 58, 94, 80]); disco(bx, by - 1, 2, hex('#f0d030')); pset(bx + 2, by - 2, hex('#e88a20')); pset(bx + 1, by - 2, C.k); pset(bx - 2, by, hex('#c8a020')); if (Math.sin(t * 5) > 0.6) pset(bx + 3, by - 3, hex('#ffffff')); R.recorte(null);
    for (let x = 79; x <= 94; x += 3) linea(x, 60, x, 80, IP.alfOS); }
  // el metrónomo y las velas del piano
  { const a = Math.sin(t * Math.PI * 1.2) * 0.45; linea(128, 61, 128 + Math.sin(a) * 9, 61 - Math.cos(a) * 9, C.k); pset(Math.round(128 + Math.sin(a) * 6), Math.round(61 - Math.cos(a) * 6), IP.alfO); }
  for (const vx of [106, 150]) { const fl = Math.sin(t * 12 + vx) > 0 ? 1 : 0; i_brillo(R, vx, 50, 7, hex('#ffe0a0'), 0.35); pset(vx, 52, hex('#ffb040')); pset(vx, 51 - fl, hex('#ffe080')); pset(vx + fl - 0, 50 - fl, hex('#fff6c8')); }
  // el reloj de pie: el péndulo y las agujas
  { const a = Math.sin(t * Math.PI) * 0.28, px = 279, py = 84; R.recorte([273, 82, 285, 120]); linea(px, py, px + Math.sin(a) * 26, py + Math.cos(a) * 26, IP.alfOS); disco(px + Math.sin(a) * 27, py + Math.cos(a) * 27, 3.4, IP.alfOS); disco(px + Math.sin(a) * 27, py + Math.cos(a) * 27, 2.5, IP.alfO); pset(Math.round(px + Math.sin(a) * 27 - 1), Math.round(py + Math.cos(a) * 27 - 1), IP.alfOL); R.recorte(null);
    const am = t * 0.1 - 0.5, ah = t * 0.01 + 2; linea(279, 64, 279 + Math.sin(am) * 6, 64 - Math.cos(am) * 6, C.k); linea(279, 64, 279 + Math.sin(ah) * 4, 64 - Math.cos(ah) * 4, C.k); pset(279, 64, IP.alfO); }
  // la tetera humea
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; pset(Math.round(236 + Math.sin(u * 7 + k) * 1.5 + u * 2), Math.round(108 - u * 12), i_mezcla(R.pget(Math.round(236 + Math.sin(u * 7 + k) * 1.5 + u * 2), Math.round(108 - u * 12)), hex('#ffffff'), 0.6 * (1 - u))); }
  // las motas de polvo en el rayo de sol
  for (let k = 0; k < 18; k++) { const y = Math.round(150 - ((h(k, 2, 947) * 60 + t * (1.2 + h(k, 3, 947) * 1.8)) % 60)), x = Math.round(72 + (y - 104) * 1.0 + h(k, 1, 947) * 40 + Math.sin(t * 0.5 + k) * 3);
    if (Math.sin(t * 1.4 + k * 1.7) > 0) pset(x, y, i_mezcla(R.pget(x, y), hex('#fff4d0'), 0.7)); }
  const b = o.brillo ?? 0; i_destello(R, t, b, [196, 28, 224, 66]);
  if (b > 0) { const [bx, by] = i_brocheGeneral; i_brillo(R, bx, by, 4 + 3 * b, hex('#fff0a0'), 0.6 * b); pset(bx, by, hex('#fff6b0')); }
  return { suelo: 160, foto: [210, 47], broche: i_brocheGeneral, ventana: [19, 29, 67, 101], piano: { x0: 100, x1: 158, teclado: 100 }, mesa: { x0: 184, x1: 252, tablero: 124 }, reloj: [266, 46, 292, 140], libre: [96, 264] };
}

let i_brocheGeneral = [0, 0];

// el destello que recorre el cristal de la foto de la chica (o.brillo 0–1) y enciende su broche
function i_destello(R, t, b, [x0, y0, x1, y1]) {
  if (b <= 0) return; const u = (t * 0.9) % 1.6;
  R.recorte([x0 + 3, y0 + 3, x1 - 3, y1 - 3]);
  for (let y = y0; y <= y1; y++) for (let i = 0; i < 4; i++) { const x = Math.round(x0 + (u - 0.3) * (x1 - x0) * 1.4 + i - (y - y0) * 0.5); const c = R.pget(x, y); if (c) R.pset(x, y, i_mezcla(c, hex('#ffffff'), 0.5 * b)); }
  R.recorte(null);
}

function i_alcaldeFijo(R) {
  const { rect, pset, linea, poligono, disco } = R;
  // la moldura del techo, el papel pintado, el friso blanco y el zócalo
  for (let y = 0; y <= 8; y++) for (let x = 0; x < 320; x++) pset(x, y, [IP.zocaloL, IP.zocalo, IP.zocaloS][Math.max(0, Math.min(2, Math.floor(y / 8 * 2.4 + i_dith(x, y) - 0.4)))]);
  for (let x = 0; x < 320; x += 6) rect(x, 6, x + 2, 7, IP.zocaloS); rect(0, 8, 319, 8, IP.zocaloD);
  i_papel(R, 0, 9, 319, 109);
  rect(0, 110, 319, 110, IP.nogalL); rect(0, 111, 319, 112, IP.nogal); rect(0, 113, 319, 133, IP.zocaloS);
  for (let x = 2; x < 318; x += 34) i_cuarteron(R, x, 115, x + 31, 131, IP.zocalo, IP.zocaloS, IP.zocaloL, IP.zocaloD, x + 1);
  rect(0, 134, 319, 139, IP.nogal); rect(0, 134, 319, 134, IP.nogalL); rect(0, 139, 319, 139, IP.nogalD);
  i_parquet(R, 140, 179);
  // la alfombra trenzada ovalada, con anillos de colores
  for (let y = 150; y <= 178; y++) for (let x = 104; x <= 268; x++) { const d = Math.hypot((x - 186) / 82, (y - 164) / 14); if (d > 1) continue; const anillo = Math.floor(d * 7);
    let c = [hex('#9a3a34'), hex('#c89a4a'), hex('#4a5a7a'), hex('#9a3a34'), hex('#6a7a4a'), hex('#c89a4a'), hex('#7a2a28')][anillo]; if (((x >> 1) + y + anillo) % 3 === 0) c = i_mezcla(c, C.k, 0.2); pset(x, y, d > 0.96 ? hex('#5a2a24') : c); }
  // el sol que entra por la ventana: un paralelogramo tramado en el suelo y en el friso
  for (let y = 112; y <= 179; y++) { const d = Math.round((y - 112) * 1.0); for (let x = 20 + d; x <= 66 + d; x++) if (((x + y) & 1) === 0 && x < 320) pset(x, y, i_mezcla(R.pget(x, y), hex('#fff0c8'), 0.28)); }
  // la ventana de guillotina: cortinas verdes, galería, marco blanco y alféizar
  rect(14, 24, 72, 106, IP.zocaloD); rect(15, 25, 71, 105, IP.zocaloL); rect(17, 27, 69, 103, IP.zocalo); rect(18, 28, 68, 102, IP.zocaloS);
  rect(10, 103, 76, 104, IP.zocaloL); rect(10, 105, 76, 107, IP.zocaloS); rect(10, 108, 76, 108, IP.zocaloD);
  for (const lado of [-1, 1]) for (let y = 16; y <= 110; y++) { const ata = 74, g = Math.max(0, 1 - Math.abs(y - ata) / 16), w = Math.round(13 - g * 5), xa = lado < 0 ? 6 : 80 - w;
    for (let x = xa; x <= xa + w; x++) { const p = (x - xa) % 4; pset(x, y, p === 0 ? IP.verdeCL : p === 3 ? IP.verdeCS : IP.verdeC); } if (Math.abs(y - ata) < 2) for (let x = xa; x <= xa + w; x++) pset(x, y, IP.alfO); }
  rect(4, 14, 82, 20, IP.verdeCS); rect(4, 14, 82, 15, IP.verdeCL); for (let x = 4; x <= 82; x++) pset(x, 21 + ((x % 8) < 4 ? 1 : 0), IP.alfOS);
  // la jaula del canario en su pie
  linea(86, 82, 86, 139, IP.alfOS); rect(81, 139, 91, 140, IP.alfOS); disco(86, 58, 1.5, IP.alfO);
  for (let y = 58; y <= 80; y++) { const w = y < 64 ? Math.round(Math.sqrt(Math.max(0, 36 - (64 - y) ** 2)) * 1.3) : 8; for (let x = 86 - w; x <= 86 + w; x++) if (x === 86 - w || x === 86 + w || y === 80) pset(x, y, IP.alfOS); }
  rect(78, 80, 94, 82, IP.alfO); linea(81, 71, 92, 71, IP.nogal); linea(85, 67, 93, 67, IP.nogal); linea(80, 77, 92, 77, IP.nogal); rect(80, 78, 83, 79, IP.zocaloL);
  // el piano vertical: candelabros, partitura, metrónomo, teclado y pedales
  rect(98, 62, 160, 139, C.k); rect(99, 63, 159, 138, IP.nogal); rect(97, 60, 161, 63, IP.nogalD); rect(98, 60, 160, 60, IP.nogalL);
  i_cuarteron(R, 103, 66, 155, 94, IP.nogal, IP.nogalS, IP.nogalL, IP.nogalD, 20);
  rect(110, 70, 146, 90, IP.zocaloL); for (let y = 73; y < 89; y += 3) { linea(112, y, 128, y, IP.zocaloD); linea(130, y, 144, y, IP.zocaloD); } for (const [x, y] of [[116, 74], [121, 77], [134, 73], [140, 79], [125, 83]]) { pset(x, y, C.k); pset(x + 1, y + 1, C.k); }
  rect(97, 96, 161, 100, IP.nogalD); rect(99, 101, 159, 106, IP.zocaloL); for (let x = 101; x < 158; x += 3) rect(x, 101, x, 106, IP.zocaloD); for (let x = 102; x < 157; x += 7) { rect(x, 101, x + 1, 103, C.k); rect(x + 3, 101, x + 4, 103, C.k); }
  rect(97, 107, 161, 109, IP.nogalD); i_cuarteron(R, 103, 112, 155, 132, IP.nogal, IP.nogalS, IP.nogalL, IP.nogalD, 21); rect(124, 134, 134, 136, IP.alfO);
  for (const vx of [106, 150]) { rect(vx - 3, 58, vx + 3, 59, IP.alfOS); rect(vx - 1, 54, vx + 1, 58, IP.alfO); rect(vx, 53, vx, 57, IP.mantel); pset(vx, 52, IP.mantelS); }
  poligono([[123, 59], [133, 59], [130, 48], [126, 48]], C.k); poligono([[124, 58], [132, 58], [129, 49], [127, 49]], IP.nogalL); rect(126, 55, 130, 56, IP.zocaloL);
  // la pared de las fotos
  i_foto(R, 168, 34, 188, 58, 'pareja', false, false); i_foto(R, 230, 32, 254, 54, 'mina', false, false); i_foto(R, 170, 64, 186, 84, 'bebe', false, true);
  i_foto(R, 230, 60, 252, 86, 'familia', false, true); i_foto(R, 198, 72, 222, 92, 'casa', false, false);
  i_brocheGeneral = i_foto(R, 196, 28, 224, 66, 'chica', true, true).broche;
  for (const [x, y] of [[178, 33], [242, 31], [178, 63], [241, 59], [210, 71], [210, 27]]) { pset(x, y, IP.alfOS); pset(x, y - 1, IP.alfO); }
  // el reloj de pie (su copete queda por debajo de Atom)
  rect(266, 46, 292, 140, C.k); rect(267, 47, 291, 139, IP.nogal); i_vetaV(R, 268, 48, 290, 138, IP.nogal, IP.nogalS, IP.nogalL, 22);
  rect(264, 46, 294, 50, IP.nogalD); rect(265, 47, 293, 47, IP.nogalL); disco(279, 64, 9, C.k); disco(279, 64, 8, IP.alfO); disco(279, 64, 7, IP.zocaloL);
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(279 + Math.sin(a) * 6), Math.round(64 - Math.cos(a) * 6), k % 3 ? IP.zocaloD : C.k); }
  rect(272, 80, 286, 122, C.k); rect(273, 81, 285, 121, hex('#2a1a10')); rect(273, 81, 274, 121, hex('#3a2818')); rect(264, 130, 294, 140, IP.nogalD); rect(265, 130, 293, 130, IP.nogalL);
  // la mesa redonda con mantel de encaje, el jarrón con flores y la tetera
  for (let y = 124; y <= 146; y++) { const ex = Math.round((y - 124) * 0.15); for (let x = 184 - ex; x <= 252 + ex; x++) { const p = (x + 300) % 9; pset(x, y, x === 184 - ex || x === 252 + ex ? IP.mantelD : p < 2 ? IP.mantelS : IP.mantel); } }
  for (let x = 180; x <= 256; x++) { pset(x, 147 + ((x & 3) < 2 ? 1 : 0), IP.mantelD); if ((x + 1) % 4 === 0) pset(x, 145, IP.mantelS); }
  for (let j = -4; j <= 4; j++) { const w = Math.round(36 * Math.sqrt(1 - (j / 4.5) ** 2)); linea(218 - w, 124 + j, 218 + w, 124 + j, j < -2 ? IP.mantelS : IP.mantel); }
  for (let y = 150; y <= 152; y++) for (let x = 182; x <= 256; x++) pset(x, y, i_mezcla(R.pget(x, y), C.k, 0.3));
  rect(198, 108, 206, 124, C.k); rect(199, 110, 205, 123, hex('#e8eef4')); rect(199, 110, 200, 123, hex('#ffffff')); rect(201, 114, 204, 116, hex('#4a7ac8'));
  for (const [x, y, c] of [[196, 100, '#e86a8a'], [202, 97, '#f4e05a'], [207, 101, '#e86a8a'], [199, 104, '#ffffff'], [205, 105, '#c8a0e8'], [193, 105, '#f4e05a']]) { linea(202, 109, x, y + 2, hex('#3a7a3a')); disco(x, y, 2, C.k); disco(x, y, 1.4, hex(c)); pset(x, y, hex('#f8e8a0')); }
  rect(228, 114, 240, 123, C.k); rect(229, 115, 239, 122, hex('#f0ece4')); rect(229, 115, 239, 116, hex('#ffffff')); rect(232, 112, 236, 114, C.k); linea(240, 117, 244, 112, C.k); rect(226, 116, 228, 120, C.k); rect(231, 118, 237, 119, hex('#4a7ac8'));
  // el helecho en su pie de madera, a la derecha del reloj
  rect(300, 110, 316, 112, IP.nogalD); rect(301, 110, 315, 110, IP.nogalL); for (const lx of [302, 314]) rect(lx, 113, lx + 1, 140, IP.nogalS); rect(302, 126, 315, 127, IP.nogalS);
  poligono([[300, 98], [316, 98], [314, 110], [302, 110]], C.k); poligono([[301, 99], [315, 99], [313, 109], [303, 109]], hex('#b8603a')); rect(301, 99, 315, 100, hex('#d8804a')); rect(303, 103, 313, 103, hex('#8a4428'));
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.42, L = 16 + (k % 3) * 4; let px = 308, py = 98;
    for (let i = 0; i < L; i++) { const u = i / L, x = Math.round(308 + Math.cos(a) * i * 1.1), y = Math.round(98 + Math.sin(a) * i * 0.9 + u * u * 10); pset(x, y, k % 2 ? hex('#3a7a3a') : hex('#4a9a44'));
      if (i % 2 === 0 && i > 2) { pset(x, y - 1, hex('#6aba5a')); pset(x + (Math.cos(a) > 0 ? -1 : 1), y + 1, hex('#2e6a2e')); } px = x; py = y; } }
  // la sombra del piano y del reloj en el suelo
  for (let y = 140; y <= 146; y++) for (const [a, b] of [[100, 162], [266, 296]]) for (let x = a; x <= b; x++) pset(x, y, i_mezcla(R.pget(x, y), C.k, 0.28));
}

// la pared de las fotos de cerca, sobre el aparador
function i_alcaldeFotos(R, t, o) {
  const { rect, pset } = R;
  R.copiar(i_capa(R, 'alcaldeF', () => i_alcaldeFotosFijo(R)));
  for (const vx of [74, 246]) { const fl = Math.sin(t * 12 + vx) > 0 ? 1 : 0; i_brillo(R, vx, 88, 12, hex('#ffe0a0'), 0.35); pset(vx, 91, hex('#ffb040')); pset(vx, 90 - fl, hex('#ffe080')); pset(vx, 89 - fl, hex('#fff6c8')); pset(vx - 1 + fl, 90, hex('#ffd060')); }
  i_brillo(R, 292, 66, 16, hex('#ffe0a0'), 0.3 + 0.03 * Math.sin(t * 7));
  // un destello lento que cruza los cristales de las fotos, y motas en la luz
  { const u = (t * 0.12) % 1.4 - 0.2; for (const v of [[76, 26, 120, 60], [86, 68, 116, 96], [196, 26, 240, 58], [200, 66, 236, 94]]) { R.recorte([v[0] + 3, v[1] + 3, v[2] - 3, v[3] - 3]);
    for (let y = v[1]; y <= v[3]; y++) for (let i = 0; i < 3; i++) { const x = Math.round(v[0] + u * 260 - v[0] * 0.6 + i - (y - v[1]) * 0.5); const c = R.pget(x, y); if (c) R.pset(x, y, i_mezcla(c, hex('#ffffff'), 0.3)); } R.recorte(null); } }
  for (let k = 0; k < 14; k++) { const y = Math.round(118 - ((h(k, 2, 948) * 100 + t * (1 + h(k, 3, 948) * 1.6)) % 100)), x = Math.round(10 + h(k, 1, 948) * 60 + (118 - y) * 0.4 + Math.sin(t * 0.6 + k) * 3);
    if (Math.sin(t * 1.3 + k * 1.9) > 0) pset(x, y, i_mezcla(R.pget(x, y), hex('#fff4d0'), 0.7)); }
  // el broche de la foto, que brilla
  const [bx, by] = i_BROCHE; const b = o.brillo ?? 0, lat = 0.5 + 0.5 * Math.sin(t * 3);
  R.disco(bx, by, 2.4, hex('#f8d030')); pset(bx, by, hex('#fff6b0')); if (lat > 0.7 || b > 0) { pset(bx - 3, by, hex('#fff6b0')); pset(bx + 3, by, hex('#fff6b0')); pset(bx, by - 3, hex('#fff6b0')); pset(bx, by + 3, hex('#fff6b0')); }
  if (b > 0) { i_destello(R, t, b, [134, 22, 186, 92]); i_brillo(R, bx, by, 6 + 4 * b, hex('#fff0a0'), 0.6 * b); R.disco(bx, by, 1.6, hex('#fff6b0')); }
  return { suelo: 166, foto: [160, 57], broche: [bx, by], aparador: { x0: 56, x1: 264, tablero: 112 }, libre: [60, 260] };
}

let i_BROCHE = [150, 76];

function i_alcaldeFotosFijo(R) {
  const { rect, pset, linea, poligono, disco } = R;
  for (let y = 0; y <= 5; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 3 ? IP.zocaloL : IP.zocalo); rect(0, 6, 319, 6, IP.zocaloD);
  i_papel(R, 0, 7, 319, 117, 1.6);
  rect(0, 118, 319, 118, IP.nogalL); rect(0, 119, 319, 121, IP.nogal); rect(0, 122, 319, 145, IP.zocaloS);
  for (let x = 2; x < 318; x += 52) i_cuarteron(R, x, 124, x + 49, 143, IP.zocalo, IP.zocaloS, IP.zocaloL, IP.zocaloD, x + 2);
  rect(0, 146, 319, 151, IP.nogal); rect(0, 146, 319, 146, IP.nogalL); rect(0, 151, 319, 151, IP.nogalD);
  i_parquet(R, 152, 179, 1.6);
  // el borde de la cortina de la izquierda, con su luz
  for (let y = 0; y <= 151; y++) for (let x = 0; x <= 14 - Math.round(Math.max(0, 1 - Math.abs(y - 90) / 20) * 4); x++) { const p = x % 4; pset(x, y, p === 0 ? IP.verdeCL : p === 3 ? IP.verdeCS : IP.verdeC); }
  for (let y = 0; y <= 151; y++) { const d = Math.round(y * 0.45); for (let x = 16 + d; x <= 64 + d; x++) if (((x + y) & 1) === 0 && x < 320 && !(x > 266 && y < 50)) pset(x, y, i_mezcla(R.pget(x, y), hex('#fff0c8'), 0.18)); }
  // las fotos: la de la chica, grande y ovalada en el centro, y las de la familia del alcalde alrededor
  i_foto(R, 76, 26, 120, 60, 'pareja', false, false); i_foto(R, 86, 68, 116, 96, 'bebe', false, true); i_foto(R, 196, 26, 240, 58, 'mina', false, true); i_foto(R, 200, 66, 236, 94, 'familia', false, false);
  i_foto(R, 30, 46, 58, 74, 'casa', false, false);
  i_BROCHE = i_foto(R, 134, 22, 186, 92, 'chica', true, true).broche;
  for (const [x, y] of [[98, 25], [101, 67], [218, 25], [218, 65], [44, 45], [160, 21]]) { pset(x, y, IP.alfOS); pset(x, y - 1, IP.alfO); linea(x, y, x - 6, y + 2, IP.papelD); linea(x, y, x + 6, y + 2, IP.papelD); }
  // el aplique de la derecha (por debajo de Atom)
  rect(290, 66, 294, 74, IP.alfOS); rect(291, 67, 293, 73, IP.alfO); poligono([[286, 54], [298, 54], [295, 64], [289, 64]], C.k); poligono([[287, 55], [297, 55], [294, 63], [290, 63]], hex('#f6e0b0')); rect(288, 55, 290, 62, hex('#fff6dc'));
  // el aparador de nogal con su tapete, los candelabros, el jarrón de flores secas y un plato
  rect(54, 108, 266, 113, C.k); rect(55, 109, 265, 112, IP.nogalL); rect(55, 109, 265, 109, IP.zocaloL); rect(56, 114, 264, 152, C.k); rect(57, 114, 263, 151, IP.nogal);
  i_vetaV(R, 58, 115, 262, 150, IP.nogal, IP.nogalS, IP.nogalL, 23);
  for (const [a, b] of [[60, 108], [112, 208], [212, 260]]) { i_cuarteron(R, a, 117, b, 136, IP.nogal, IP.nogalS, IP.nogalL, IP.nogalD, a); rect((a + b) / 2 - 3, 125, (a + b) / 2 + 3, 127, IP.alfO); pset((a + b) / 2 - 2, 125, IP.alfOL); }
  rect(56, 139, 264, 151, IP.nogalS); for (let x = 60; x < 262; x += 50) i_cuarteron(R, x, 140, x + 46, 150, IP.nogal, IP.nogalS, IP.nogalL, IP.nogalD, x + 3);
  for (let x = 92; x <= 228; x++) { pset(x, 108, IP.mantel); pset(x, 109, IP.mantel); if (x < 100 || x > 220) for (let y = 110; y <= 116 - ((x & 3) < 2 ? 1 : 0); y++) pset(x, y, (x + y) % 3 ? IP.mantel : IP.mantelS); }
  for (const vx of [74, 246]) { rect(vx - 5, 105, vx + 5, 107, IP.alfOS); rect(vx - 4, 105, vx + 4, 105, IP.alfO); rect(vx - 1, 95, vx + 1, 105, IP.alfO); pset(vx - 1, 97, IP.alfOL); rect(vx - 3, 95, vx + 3, 95, IP.alfOS); rect(vx - 1, 92, vx + 1, 94, IP.mantel); pset(vx - 1, 92, IP.mantelS); }
  rect(102, 94, 112, 107, C.k); rect(103, 95, 111, 106, hex('#4a6a8a')); rect(103, 95, 104, 106, hex('#6a8aaa')); rect(105, 99, 109, 101, hex('#e8eef4'));
  for (const [x, y] of [[100, 84], [106, 80], [112, 85], [97, 89], [115, 90]]) { linea(107, 94, x, y + 2, hex('#6a6040')); disco(x, y, 1.5, hex('#c89a6a')); pset(x, y, hex('#e8c8a0')); }
  rect(206, 100, 226, 107, C.k); rect(207, 101, 225, 106, IP.plata); rect(207, 101, 225, 101, IP.plataL); rect(210, 103, 222, 104, IP.plataS);
  for (let y = 152; y <= 157; y++) for (let x = 54; x <= 268; x++) pset(x, y, i_mezcla(R.pget(x, y), C.k, 0.32));
}

let i_luzTele = hex('#8aa0c8');

// lo que se ve en la pantalla (ya recortado a v): 'nieve', 'prado', 'apagada' o una función de la escena
function i_pantalla(R, t, v, p) {
  const [x0, y0, x1, y1] = v, W = x1 - x0, H = y1 - y0, { pset, linea, disco, poligono } = R;
  R.recorte(v);
  if (typeof p === 'function') p(R, t, v);
  else if (p === 'apagada') { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, ((x + y) & 3) === 0 ? hex('#2a3038') : hex('#1e2228')); }
  else if (p === 'prado') {
    const pan = t * 2 * W / 154, cs = [hex('#4a90e0'), hex('#6aaaf0'), hex('#9acef8'), hex('#cae8fa')], hz = y0 + H * 0.5;
    for (let y = y0; y <= hz + 2; y++) for (let x = x0; x <= x1; x++) pset(x, y, cs[Math.max(0, Math.min(3, Math.floor((y - y0) / (hz - y0) * 3 + i_dith(x, y) - 0.5)))]);
    for (let k = 0; k < 4; k++) i_nube(R, Math.round(((h(k, 1, 950) * W * 1.6 - t * (1 + k % 2) * W / 154) % (W * 1.6) + W * 1.6) % (W * 1.6) + x0 - W * 0.3), Math.round(y0 + H * (0.1 + 0.07 * k)), W * 0.08, [hex('#ffffff'), hex('#e4eef8'), hex('#b4c8e0')]);
    for (let x = x0; x <= x1; x++) { const wx = x + pan * 0.2, top = Math.round(hz - H * (0.18 + 0.08 * Math.sin(wx * 0.05 * 154 / W) + 0.04 * Math.sin(wx * 0.13 * 154 / W)));
      linea(x, top, x, hz, hex('#7a8ab8')); pset(x, top, hex('#f6f8fc')); pset(x, top + 1, hex('#e0e8f4')); }
    for (let x = x0; x <= x1; x++) { const top = Math.round(hz - H * 0.04 + Math.sin((x + pan) * 0.3) * 1.5); linea(x, top, x, hz + 2, hex('#2e6a3a')); }
    for (let y = Math.round(hz + 2); y <= y1; y++) for (let x = x0; x <= x1; x++) { const r = h(x + Math.round(pan), y, 951); pset(x, y, r < 0.25 ? hex('#4aa040') : r > 0.9 ? hex('#8ad05a') : hex('#5ab84a')); }
    // el cuerno dorado en el centro y las flores que se mecen
    const cx = Math.round(x0 + W * 0.55 - pan * 0.5 % W * 0), cy = Math.round(hz + H * 0.22), s = W / 154;
    poligono([[cx - 12 * s, cy - 6 * s], [cx - 12 * s, cy + 6 * s], [cx + 10 * s, cy + 2 * s], [cx + 14 * s, cy - 2 * s]], hex('#b8901c')); poligono([[cx - 11 * s, cy - 5 * s], [cx - 11 * s, cy + 1 * s], [cx + 12 * s, cy - 1 * s]], hex('#f0c840'));
    disco(cx - 12 * s, cy, 6 * s, hex('#8a6a10')); disco(cx - 12 * s, cy, 4.5 * s, hex('#3a2a10')); pset(cx + 5 * s, cy - 3 * s, hex('#fff6b0'));
    const flores = [hex('#e83a5a'), hex('#f4e05a'), hex('#f08ac8'), hex('#ffffff'), hex('#a070e8')];
    for (let k = 0; k < Math.round(70 * s); k++) { const fx = Math.round(x0 + ((h(k, 1, 952) * W * 1.3 - pan) % (W * 1.3) + W * 1.3) % (W * 1.3) - W * 0.15), fy = Math.round(hz + 4 + h(k, 2, 952) * (y1 - hz - 4)), m = Math.round(Math.sin(t * 2 + k) * (fy - hz) / H);
      linea(fx, fy, fx + m, fy - 2 * s, hex('#2e7a2e')); disco(fx + m, fy - 2 * s, Math.max(0.8, s * (fy - hz) / H * 2.2), flores[k % 5]); }
    for (let k = 0; k < 3; k++) { const bx = Math.round(x0 + W * (0.2 + k * 0.3) + Math.sin(t * 0.7 + k * 2) * W * 0.12), by = Math.round(hz + H * 0.1 + Math.sin(t * 1.3 + k) * H * 0.08), a = Math.sin(t * 14 + k) > 0;
      pset(bx, by, C.k); pset(bx - 1, by - (a ? 1 : 0), hex('#f8a030')); pset(bx + 1, by - (a ? 1 : 0), hex('#f8a030')); if (s > 1.5) { pset(bx - 2, by - (a ? 1 : 0), hex('#f8a030')); pset(bx + 2, by - (a ? 1 : 0), hex('#f8a030')); } }
  } else { const sem = Math.floor(t * 24); for (let y = y0; y <= y1; y++) { const bar = Math.sin((y - t * 40) * 0.08) > 0.85 ? 0.25 : 0; for (let x = x0; x <= x1; x++) { const r = h(x, y, sem) + bar; pset(x, y, r < 0.35 ? hex('#3a3e48') : r < 0.7 ? hex('#8a90a0') : hex('#e8ecf4')); } } }
  // la tele vieja: las líneas, la viñeta de las esquinas, la banda que sube y el reflejo curvo del cristal
  const banda = y1 - ((t * 18) % (H + 20)) + 10;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = R.pget(x, y); let k = 0;
    const dx = Math.max(0, Math.abs(x - (x0 + x1) / 2) - W * 0.36) / (W * 0.14), dy = Math.max(0, Math.abs(y - (y0 + y1) / 2) - H * 0.32) / (H * 0.18), dd = dx * dx + dy * dy;
    if (dd > 0.25) k = Math.min(0.6, (dd - 0.25) * 0.8); if (((y - y0) & 1) === 1) k += 0.16;
    let col = k > 0 ? i_mezcla(c, C.k, Math.min(0.7, k)) : c; if (Math.abs(y - banda) < 3) col = i_mezcla(col, hex('#ffffff'), 0.08); pset(x, y, col); }
  for (let i = 0; i < W * 0.4; i++) { const a = i / (W * 0.4), x = Math.round(x0 + W * 0.08 + i), y = Math.round(y0 + H * 0.14 + (a - 0.5) * (a - 0.5) * H * 0.3); for (let j = 0; j < Math.max(1, Math.round(W / 50)); j++) { const c = R.pget(x, y + j); if (c) pset(x, y + j, i_mezcla(c, hex('#ffffff'), 0.28)); } }
  R.recorte(null);
  // el color medio de la pantalla: la luz que echa en la habitación
  let r = 0, g = 0, b = 0, n = 0; for (let j = 1; j < 6; j++) for (let i = 1; i < 8; i++) { const c = R.pget(Math.round(x0 + W * i / 8), Math.round(y0 + H * j / 6)); r += c & 255; g += (c >> 8) & 255; b += (c >> 16) & 255; n++; }
  r /= n; g /= n; b /= n; const m = Math.max(r, g, b, 1), f = Math.min(1.6, 230 / m);
  return (0xff000000 | (Math.round(Math.min(255, b * f)) << 16) | (Math.round(Math.min(255, g * f)) << 8) | Math.round(Math.min(255, r * f))) >>> 0;
}

// la luz de la tele en la penumbra: aclara hacia col lo que hay en v según la distancia a (cx, cy), en escalones tramados
function i_luz(R, cx, cy, rad, col, a, v, fuera = null) {
  const [x0, y0, x1, y1] = v;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (fuera && x >= fuera[0] && x <= fuera[2] && y >= fuera[1] && y <= fuera[3]) continue;
    const d = Math.hypot(x - cx, (y - cy) * 1.25) / rad; if (d >= 1) continue; const k = Math.floor((Math.pow(1 - d, 2.2) * a * 7 + i_dith(x, y) * 0.95)) / 7; if (k <= 0) continue;
    R.pset(x, y, i_mezcla(R.pget(x, y), col, Math.min(0.8, k))); }
}

const i_TVG = [197, 79, 241, 114];

function i_tele(R, t, o) {
  const { rect, pset, linea, disco } = R;
  R.copiar(i_capa(R, 'tele', () => i_teleFijo(R)));
  // la ventana de noche: la luna, nubes que la cruzan, estrellas, nieve fina y una ventana encendida
  const v = [101, 35, 145, 95]; R.recorte(v);
  for (let k = 0; k < 3; k++) i_nube(R, Math.round(((h(k, 1, 960) * 90 + t * (1.5 + k)) % 90) + 84), 42 + k * 9, 10 + k * 2, [hex('#4a5280'), hex('#363e68'), hex('#262c50')]);
  for (let k = 0; k < 26; k++) { const x = Math.round(101 + ((h(k, 1, 961) * 44 + Math.sin(t * 0.8 + k) * 3 + t * 2) % 44)), y = Math.round(35 + ((h(k, 2, 961) * 60 + t * (6 + (k % 3) * 3)) % 60)); pset(x, y, k % 3 ? hex('#c8d0e8') : hex('#ffffff')); }
  if (Math.floor(t / 7) % 3 !== 2) { pset(120, 85, hex('#f8d070')); pset(121, 85, hex('#f8d070')); pset(120, 86, hex('#e8b050')); pset(121, 86, hex('#e8b050')); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.3 + k / 4) % 1; pset(Math.round(137 + u * 4 + Math.sin(u * 5) * 1), Math.round(77 - u * 12), hex('#3e4466')); }
  R.recorte(null);
  rect(122, 35, 123, 95, IP.nMaderaS); rect(101, 64, 145, 65, IP.nMaderaS);
  // la pantalla y su luz
  const col = i_pantalla(R, t, i_TVG, o.pantalla ?? 'nieve'); i_luzTele = col;
  const parpadeo = 0.85 + 0.15 * Math.sin(t * 17) * Math.sin(t * 5.3);
  i_luz(R, 219, 98, 200, col, 0.6 * parpadeo, [0, 7, 319, 179], [192, 74, 262, 136]);
  i_luz(R, 219, 98, 50, col, 0.35 * parpadeo, [186, 60, 270, 150], [196, 78, 242, 115]);
  // la lámpara (o.lampara) y el filo de luz de la puerta entornada
  if (o.lampara) { i_brillo(R, 46, 66, 40, hex('#ffc870'), 0.5); rect(38, 60, 54, 72, hex('#f6d8a0')); rect(40, 61, 44, 71, hex('#fff0c8')); }
  i_brillo(R, 32, 92, 14, hex('#ffc070'), 0.22 + 0.04 * Math.sin(t * 2));
  // la taza que humea en la mesita
  for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1, x = Math.round(150 + Math.sin(u * 6 + k) * 1.5), y = Math.round(132 - u * 12); pset(x, y, i_mezcla(R.pget(x, y), hex('#d0d8f0'), 0.5 * (1 - u))); }
  return { suelo: 156, pantalla: i_TVG, sentada: [86, 172], puerta: [6, 34, 34, 131], tele: [186, 70, 264, 146], mesita: { x0: 134, x1: 178, tablero: 138 }, libre: [40, 186] };
}

function i_teleFijo(R) {
  const { rect, pset, linea, poligono, disco } = R;
  for (let y = 0; y <= 5; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 3 ? IP.nParedL : IP.nPared); rect(0, 6, 319, 6, IP.nParedS);
  // el papel oscuro a rayas con su dibujo
  for (let y = 7; y <= 115; y++) for (let x = 0; x < 320; x++) { let c = (x % 12) < 6 ? IP.nPared : IP.nParedS; const r = h(x, y, 962); if (r < 0.05) c = IP.nParedS; else if (r > 0.97) c = IP.nParedL;
    if ((x % 12) < 6 && !(x > 268 && y < 50)) { const u = (x % 12) - 2.5, w = (y % 14) - 7; if (Math.abs(u) + Math.abs(w) * 0.5 < 2 && Math.abs(u) + Math.abs(w) * 0.5 > 1) c = IP.nParedL; } pset(x, y, c); }
  rect(0, 116, 319, 116, IP.nMaderaL); rect(0, 117, 319, 128, IP.nMadera); for (let x = 2; x < 318; x += 30) i_cuarteron(R, x, 118, x + 27, 127, IP.nMadera, IP.nMaderaS, IP.nMaderaL, IP.nMaderaS, x + 5);
  rect(0, 129, 319, 131, IP.nMaderaS);
  // el suelo de tablas en perspectiva y la alfombra
  for (let y = 132; y <= 179; y++) { const z = 1 / (y - 70); for (let x = 0; x < 320; x++) { const wx = (x - 160) * z * 60, tab = Math.floor(wx / 6 + 1000), j = ((wx / 6) % 1 + 1) % 1;
    let c = h(tab, 1, 963) < 0.5 ? IP.nSuelo : IP.nSueloL; if (j < 0.08) c = IP.nSueloS; else if (h(x, y, 964) < 0.1) c = IP.nSueloS; if (Math.floor(1800 * z + h(tab, 2, 963) * 7) % 7 === 0 && j > 0.08) c = IP.nSueloS; pset(x, y, c); } }
  for (let y = 146; y <= 176; y++) for (let x = 70; x <= 250; x++) { const d = Math.max(Math.abs(x - 160) / 90, Math.abs(y - 161) / 15); if (d > 1) continue; const an = Math.floor(d * 5);
    let c = [hex('#5a2430'), hex('#3a1a28'), hex('#6a4a2a'), hex('#3a1a28'), hex('#5a2430')][an]; if (((x >> 1) + (y >> 1)) % 4 === 0 && an !== 2) c = hex('#6a3040'); pset(x, y, d > 0.97 ? hex('#2a1418') : c); }
  // la puerta entornada con su filo de luz y la cuña de luz en el suelo
  rect(4, 32, 36, 131, IP.nMaderaS); rect(6, 34, 32, 131, IP.nMadera); i_cuarteron(R, 9, 40, 29, 78, IP.nMadera, IP.nMaderaS, IP.nMaderaL, IP.nMaderaS, 30); i_cuarteron(R, 9, 84, 29, 124, IP.nMadera, IP.nMaderaS, IP.nMaderaL, IP.nMaderaS, 31);
  rect(33, 34, 34, 131, hex('#f8c878')); rect(32, 34, 32, 131, hex('#c89050')); rect(28, 82, 30, 85, IP.alfO);
  for (let y = 132; y <= 158; y++) { const d = Math.round((y - 132) * 0.9); for (let x = 33 - Math.round(d * 0.3); x <= 35 + d; x++) if (((x + y) & 1) === 0) pset(x, y, i_mezcla(R.pget(x, y), hex('#f8c070'), 0.35)); }
  // la lámpara de pie (apagada)
  for (let y = 152; y <= 155; y++) for (let x = 38; x <= 54; x++) if (Math.hypot((x - 46) / 8, (y - 153.5) / 2) <= 1) pset(x, y, IP.nMaderaS);
  rect(45, 72, 46, 152, hex('#5a4a3a')); pset(45, 100, hex('#7a6a50')); poligono([[39, 58], [53, 58], [57, 73], [35, 73]], C.k); poligono([[40, 59], [52, 59], [56, 72], [36, 72]], hex('#6a5a4a')); rect(40, 60, 43, 71, hex('#7a6a58')); linea(50, 73, 50, 80, hex('#8a7a5a')); pset(50, 81, IP.alfO);
  // la ventana, con sus cortinas oscuras medio corridas
  rect(97, 31, 149, 99, IP.nMaderaS); rect(99, 33, 147, 97, IP.nMaderaL); for (let y = 35; y <= 95; y++) for (let x = 101; x <= 145; x++) pset(x, y, [hex('#0c1030'), hex('#141a44'), hex('#1e2656')][Math.max(0, Math.min(2, Math.floor((y - 35) / 60 * 3 + i_dith(x, y) - 0.5)))]);
  for (let k = 0; k < 20; k++) pset(101 + Math.round(h(k, 1, 965) * 44), 36 + Math.round(h(k, 2, 965) * 30), k % 4 ? hex('#8a90c0') : hex('#ffffff'));
  disco(133, 46, 6, hex('#3a4270')); disco(133, 46, 5, hex('#f4f4e0')); disco(135, 45, 2, hex('#d8dcc8')); pset(131, 48, hex('#d8dcc8'));
  poligono([[101, 95], [101, 82], [112, 76], [124, 82], [124, 95]], hex('#1a1e34')); poligono([[118, 95], [118, 80], [132, 72], [145, 80], [145, 95]], hex('#141830')); linea(112, 76, 101, 82, hex('#c8d0e8')); linea(132, 72, 145, 80, hex('#c8d0e8'));
  rect(136, 68, 138, 76, hex('#141830')); rect(119, 84, 122, 87, hex('#0a0c18'));
  rect(97, 99, 149, 101, IP.nMaderaL); rect(97, 102, 149, 102, IP.nMaderaS);
  for (const lado of [-1, 1]) for (let y = 26; y <= 108; y++) { const w = Math.round(12 - Math.max(0, 1 - Math.abs(y - 80) / 18) * 4), xa = lado < 0 ? 90 : 156 - w;
    for (let x = xa; x <= xa + w; x++) { const p = (x - xa) % 4; pset(x, y, p === 0 ? hex('#2e4a3a') : p === 3 ? hex('#16261e') : hex('#203628')); } }
  rect(86, 22, 160, 27, hex('#16261e')); rect(86, 22, 160, 22, hex('#2e4a3a'));
  // un cuadro pequeño y oscuro sobre la puerta (paisaje) y el enchufe
  rect(56, 30, 80, 48, IP.alfOS); rect(58, 32, 78, 46, hex('#2a3a4a')); poligono([[58, 46], [66, 38], [72, 42], [78, 36], [78, 46]], hex('#1e2a30')); pset(73, 35, hex('#8a8a70'));
  // la tele: mueble de madera con patas, el marco de la pantalla, los mandos, la rejilla y la antena de cuernos
  rect(186, 70, 264, 137, C.k); rect(187, 71, 263, 136, IP.tvMadera); i_vetaV(R, 188, 72, 262, 135, IP.tvMadera, IP.tvMaderaS, IP.tvMaderaL, 32); rect(187, 71, 263, 72, IP.tvMaderaL); rect(262, 71, 263, 136, IP.tvMaderaS);
  for (const lx of [193, 257]) { poligono([[lx - 2, 137], [lx + 2, 137], [lx + 1, 147], [lx - 1, 147]], C.k); rect(lx - 1, 137, lx, 146, IP.tvMaderaS); rect(lx - 1, 147, lx + 1, 147, IP.alfOS); }
  for (let y = 146; y <= 150; y++) for (let x = 184; x <= 268; x++) pset(x, y, i_mezcla(R.pget(x, y), C.k, 0.35));
  rect(192, 75, 246, 118, C.k); rect(193, 76, 245, 117, IP.tvPlast); rect(193, 76, 245, 76, IP.tvPlastL); rect(195, 78, 243, 116, C.k);
  rect(249, 76, 260, 132, IP.tvMaderaS); disco(254, 85, 4, C.k); disco(254, 85, 3, IP.tvPlastL); linea(254, 85, 256, 83, IP.plataL); disco(254, 97, 3, C.k); disco(254, 97, 2, IP.tvPlastL); pset(254, 96, IP.plataL);
  for (let y = 104; y < 130; y += 2) linea(250, y, 259, y, C.k); rect(192, 122, 246, 132, IP.tvMaderaS); rect(194, 124, 244, 130, IP.tvMadera); rect(214, 126, 224, 127, IP.alfO);
  linea(226, 70, 212, 44, IP.plataS); linea(228, 70, 246, 46, IP.plataS); disco(212, 44, 1.2, IP.plataL); disco(246, 46, 1.2, IP.plataL); rect(222, 67, 232, 70, C.k); rect(223, 68, 231, 69, IP.tvPlastL);
  // las cintas: encima de la tele y apiladas en el suelo
  const cinta = (x, y, c) => { rect(x, y, x + 15, y + 3, C.k); rect(x + 1, y + 1, x + 14, y + 2, hex('#2a2a30')); rect(x + 4, y + 1, x + 10, y + 2, hex(c)); pset(x + 1, y + 1, hex('#4a4a52')); };
  cinta(190, 62, '#e8c040'); cinta(191, 66, '#c83a3a'); rect(190, 66, 206, 66, C.k);
  for (let k = 0; k < 7; k++) cinta(270 + (k % 2), 142 - k * 4, ['#e8c040', '#3a8ae8', '#c83a3a', '#5aa84a', '#e8e8e8', '#e88ab0', '#e8a040'][k]);
  poligono([[292, 146], [296, 128], [300, 128], [296, 146]], C.k); poligono([[293, 145], [296, 130], [298, 130], [295, 145]], hex('#2a2a30'));
  for (let y = 146; y <= 148; y++) for (let x = 266; x <= 300; x++) pset(x, y, i_mezcla(R.pget(x, y), C.k, 0.35));
  // la mesita baja con la taza, el mando y una cinta abierta
  rect(132, 137, 180, 141, C.k); rect(133, 138, 179, 140, IP.nMaderaL); rect(133, 138, 179, 138, hex('#6a5048')); for (const lx of [136, 176]) rect(lx - 1, 141, lx + 1, 152, IP.nMaderaS);
  for (let y = 152; y <= 154; y++) for (let x = 130; x <= 184; x++) pset(x, y, i_mezcla(R.pget(x, y), C.k, 0.3));
  rect(146, 130, 154, 137, C.k); rect(147, 131, 153, 136, hex('#c8c0b0')); rect(147, 131, 153, 131, hex('#e8e0d0')); rect(154, 132, 156, 135, C.k); rect(148, 131, 152, 131, hex('#3a2418'));
  rect(160, 134, 172, 136, C.k); rect(161, 134, 171, 135, hex('#3a3a42')); pset(163, 134, hex('#c83a3a')); pset(166, 134, hex('#8a8a92')); pset(168, 134, hex('#8a8a92'));
  rect(136, 133, 143, 137, C.k); rect(137, 134, 142, 136, hex('#2a2a30')); pset(139, 134, hex('#e8c040'));
}

// el respaldo de orejas de la butaca, por delante de quien está sentada (de espaldas a la cámara, mirando a la tele):
// capitoné de terciopelo, las orejas a los lados (la cabeza asoma entre ellas), una manta de cuadros echada encima y el
// filo encendido del color de la tele
function i_butacaDelante(R, t) {
  const { rect, pset, linea, disco } = R, col = i_luzTele;
  for (let y = 150; y <= 179; y++) { const xa = 58 - Math.round(Math.max(0, y - 160) * 0.1), xb = 130 + Math.round(Math.max(0, y - 160) * 0.1);
    for (let x = xa; x <= xb; x++) { let top = 160 - Math.round(Math.sin((x - 58) / 72 * Math.PI) * 2); if (x < 72) top = 150 + Math.round(((x - 58) / 14) ** 2 * 3); else if (x > 116) top = 150 + Math.round(((130 - x) / 14) ** 2 * 3);
      if (y < top) continue; if (y === top || x === xa || x === xb) { pset(x, y, C.k); continue; }
      let c = x < 72 || x > 116 ? IP.butacaL : IP.butaca; if (x === 72 || x === 116) c = IP.butacaS; if (y > 166 && ((x - 60) % 12 === 0 && (y - 166) % 6 === 3)) c = IP.butacaS; pset(x, y, c); } }
  for (let y = 168; y < 180; y += 6) for (let x = 78 + ((y / 6) & 1) * 6; x < 112; x += 12) { pset(x, y, IP.butacaS); linea(x + 1, y + 1, x + 3, y + 3, IP.butacaS); linea(x - 1, y + 1, x - 3, y + 3, IP.butacaS); }
  // la manta de cuadros echada sobre la oreja derecha
  for (let y = 152; y <= 179; y++) for (let x = 112; x <= 136 - Math.round((179 - y) * 0.2); x++) { if (y < 152 + Math.round(((x - 112) / 24) ** 2 * 4)) continue; const cx = Math.floor((x + y * 0.2) / 4) % 2, cy = Math.floor(y / 4) % 2;
    pset(x, y, x === 136 - Math.round((179 - y) * 0.2) ? C.k : cx && cy ? hex('#3a5a7a') : cx || cy ? hex('#7a3a3a') : hex('#c8a060')); }
  for (let y = 174; y <= 179; y += 2) pset(126 + (y % 3), y, hex('#c8a060'));
  // el filo de luz de la tele (por la derecha y por arriba)
  for (let y = 150; y <= 179; y++) for (let x = 58; x <= 140; x++) { const c = R.pget(x, y), d = R.pget(x, y - 1); if (c === C.k) continue; if (d === C.k && y < 174) { pset(x, y, i_mezcla(c, col, 0.6)); const e = R.pget(x, y + 1); if (e !== C.k) pset(x, y + 1, i_mezcla(e, col, 0.3)); } }
  for (let y = 152; y <= 179; y++) for (const [x, a] of [[128, 0.3], [129, 0.55]]) { const c = R.pget(x, y); if (c !== C.k) pset(x, y, i_mezcla(c, col, a)); }
}

// la pantalla de cerca: el mueble de madera ocupa el plano, la pantalla grande en el centro, los mandos a la derecha,
// la antena arriba (por debajo de Atom y fuera de la barra del año) y la balda de abajo con las cintas y el mando
const i_TVP = [74, 34, 222, 134];

function i_telePantalla(R, t, o) {
  R.copiar(i_capa(R, 'teleP', () => i_telePantallaFijo(R)));
  const col = i_pantalla(R, t, i_TVP, o.pantalla ?? 'nieve'); i_luzTele = col;
  const parpadeo = 0.85 + 0.15 * Math.sin(t * 17) * Math.sin(t * 5.3);
  i_luz(R, 148, 84, 210, col, 0.55 * parpadeo, [0, 0, 319, 179], [62, 22, 234, 146]);
  i_luz(R, 148, 84, 92, col, 0.3 * parpadeo, [58, 20, 268, 160], [72, 32, 224, 136]);
  // el dial del canal: su raya gira un poco cuando cambia la imagen
  const a = (typeof o.pantalla === 'function' ? 1.2 : o.pantalla === 'prado' ? 2.2 : 0.4) + Math.sin(t * 0.5) * 0.02;
  R.disco(250, 56, 7, IP.tvPlastL); R.linea(250, 56, 250 + Math.sin(a) * 6, 56 - Math.cos(a) * 6, IP.plataL); R.disco(250, 56, 1.5, C.k);
  return { suelo: 178, pantalla: i_TVP };
}

function i_telePantallaFijo(R) {
  const { rect, pset, linea, poligono, disco } = R;
  for (let y = 0; y <= 179; y++) for (let x = 0; x < 320; x++) { let c = (x % 18) < 9 ? IP.nPared : IP.nParedS; const r = h(x, y, 966); if (r < 0.05) c = IP.nParedS; else if (r > 0.97) c = IP.nParedL;
    if ((x % 18) < 9 && !(x > 268 && y < 50)) { const u = (x % 18) - 4, w = (y % 22) - 11; if (Math.abs(u) + Math.abs(w) * 0.5 < 3 && Math.abs(u) + Math.abs(w) * 0.5 > 1.6) c = IP.nParedL; } pset(x, y, c); }
  // el mueble de la tele
  rect(56, 22, 270, 160, C.k); rect(57, 23, 269, 159, IP.tvMadera); i_vetaV(R, 58, 24, 268, 158, IP.tvMadera, IP.tvMaderaS, IP.tvMaderaL, 33);
  rect(57, 23, 269, 24, IP.tvMaderaL); rect(57, 23, 58, 159, IP.tvMaderaL); rect(267, 23, 269, 159, IP.tvMaderaS); rect(57, 157, 269, 159, IP.tvMaderaS);
  rect(66, 28, 230, 140, C.k); rect(67, 29, 229, 139, IP.tvPlast); rect(67, 29, 229, 29, IP.tvPlastL); rect(67, 29, 67, 139, IP.tvPlastL);
  for (let y = 31; y <= 137; y++) for (let x = 70; x <= 226; x++) { const dx = Math.max(0, Math.abs(x - 148) - 70), dy = Math.max(0, Math.abs(y - 84) - 45); if (dx * dx + dy * dy > 49) continue; pset(x, y, C.k); }
  rect(236, 30, 264, 150, IP.tvMaderaS); rect(237, 31, 263, 149, hex('#3a2416'));
  disco(250, 56, 9, C.k); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(250 + Math.sin(a) * 10), Math.round(56 - Math.cos(a) * 10), IP.alfO); }
  disco(250, 80, 6, C.k); disco(250, 80, 5, IP.tvPlastL); pset(249, 77, IP.plataL); for (let y = 94; y < 146; y += 3) { linea(240, y, 260, y, C.k); linea(240, y + 1, 260, y + 1, hex('#5a3a22')); }
  rect(90, 144, 206, 152, IP.tvMaderaS); rect(92, 146, 204, 150, IP.tvMadera); rect(140, 147, 156, 148, IP.alfO); pset(140, 147, IP.alfOL);
  linea(160, 22, 190, 4 + 12, IP.plataS); linea(166, 22, 214, 16, IP.plataS); disco(190, 16, 1.5, IP.plataL); disco(214, 16, 1.5, IP.plataL); rect(156, 18, 172, 22, C.k); rect(157, 19, 171, 21, IP.tvPlastL);
  // la balda de abajo con las cintas y el mando
  rect(0, 162, 319, 165, IP.nMaderaL); rect(0, 166, 319, 179, IP.nMadera); rect(0, 162, 319, 162, hex('#6a5048'));
  for (const lx of [64, 262]) rect(lx - 3, 160, lx + 3, 162, C.k);
  for (let k = 0; k < 6; k++) { const x = 20 + k * 6, c = ['#e8c040', '#3a8ae8', '#c83a3a', '#5aa84a', '#e8e8e8', '#e88ab0'][k]; rect(x, 166, x + 5, 179, C.k); rect(x + 1, 167, x + 4, 179, hex('#2a2a30')); rect(x + 1, 170, x + 4, 174, hex(c)); }
  rect(280, 168, 306, 173, C.k); rect(281, 169, 305, 172, hex('#3a3a42')); for (let i = 0; i < 4; i++) pset(284 + i * 5, 170, i ? hex('#8a8a92') : hex('#c83a3a'));
  for (let y = 160; y <= 164; y++) for (let x = 56; x <= 272; x++) pset(x, y, i_mezcla(R.pget(x, y), C.k, 0.4));
}

// la paleta propia del Capitolio: cielo de mañana, mármol blanco y rosado, oro, los colores chillones, el cristal, la madera
// oscura del despacho, el terciopelo, el verde y el blanco de las rosas
const K = pal({
  k: '#16121e', blanco: '#ffffff',
  cielo0: '#2a62d0', cielo1: '#3c84e4', cielo2: '#68b0f0', cielo3: '#a8dcf8', cielo4: '#e2f2fa', cielo5: '#fbe0ee',
  nubeL: '#ffffff', nube: '#eaf2fb', nubeS: '#c2d4ee', nubeT: '#f6cce2',
  monte0: '#c4cff0', monte1: '#9eaad8', monte2: '#7c88bc', monte3: '#5e6a9e', nieve: '#f8fbff', nieveS: '#ccd6f0',
  marmol: '#eceef4', marmolS: '#c6cad8', marmolD: '#9ea2b8', marmolV: '#b4b8cc', marmolL: '#ffffff',
  marmolR: '#f6dae8', marmolRS: '#dab2c8', marmolRV: '#c890b0',
  oro: '#e8b830', oroL: '#fff0a0', oroM: '#f8d460', oroS: '#a87818', oroD: '#6a4a10',
  rosa: '#ec5aaa', rosaL: '#ff9ed2', rosaS: '#a82e78', rosaD: '#6a1a4a',
  turq: '#36ccc4', turqL: '#a8fff2', turqS: '#1a8888', turqD: '#0e4e56',
  morado: '#8a4ad8', moradoL: '#c28cff', moradoS: '#5a2a98', moradoD: '#36165e',
  lima: '#b0e848', limaS: '#6a9a1e', naranja: '#ff9a3a', naranjaS: '#c85a18', amarillo: '#ffe04a', rojo: '#ff4a5a', rojoS: '#b0203a',
  cristal: '#7cc4ec', cristalL: '#d0f2ff', cristalS: '#3c7cb0', cristalD: '#22507c',
  madera: '#5a2e22', maderaS: '#3a1a14', maderaL: '#7e4632', maderaV: '#48241a', maderaD: '#240e0a',
  terciopelo: '#b01c44', terciopeloS: '#6c0e28', terciopeloL: '#e04066',
  hoja: '#3c7c3e', hojaS: '#1e4a28', hojaL: '#6aac4c', hojaD: '#123620', flor: '#fdfdf6', florS: '#d4d8c8', florM: '#eef0e4', florC: '#f2e6a0',
  barro: '#c8643a', barroS: '#8a3e22', barroL: '#ea8c5c',
  grava: '#dccfb8', gravaS: '#b4a68e', gravaL: '#f4ecdc',
  asfalto: '#b2a2d6', asfaltoS: '#9282bc', asfaltoL: '#cec0ec',
  piel: '#f2caa8', pielS: '#c89878', pielO: '#a8704a',
  noche: '#141432', nocheL: '#2a2a5a',
});

const k_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral de la trama ordenada 4 × 4 en (x, y)
const k_b4 = (x, y) => (k_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla de dos colores (k = 0: a; k = 1: b)
function k_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// oscurece (k < 0, hacia la tinta) o aclara (k > 0, hacia el blanco) lo que ya hay pintado en (x, y)
function k_tono(R, x, y, k) { const c = R.pget(x, y); if (c) R.pset(x, y, k < 0 ? k_mezcla(c, K.k, -k) : k_mezcla(c, K.blanco, k)); }

// un degradado vertical tramado entre los colores de cols, de y0 a y1 (respeta R.recorte)
function k_grad(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const f = Math.max(0, Math.min(n - 1e-6, (y - y0) / Math.max(1, y1 - y0) * n)), i = Math.floor(f), fr = f - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, fr > k_b4(x, y) ? cols[i + 1] : cols[i]); }
}

// las capas fijas se dibujan una vez en un búfer transparente (0 = hueco por el que se ve lo de detrás) y se guardan
const k_CACHE = new WeakMap();

function k_capa(R, clave, dibuja) {
  let m = k_CACHE.get(R); if (!m) k_CACHE.set(R, (m = new Map()));
  let c = m.get(clave);
  if (!c) {
    const b = R.nuevo(), prev = R.usar(b); R.recorte(null); dibuja(); R.recorte(null); R.usar(prev);
    let x0 = 320, y0 = 180, x1 = -1, y1 = -1;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (b[y * 320 + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    c = { b, caja: [x0, y0, x1, y1] }; m.set(clave, c);
  }
  return c;
}

// copia una capa fija sobre lo que hay (solo sus píxeles pintados, dentro de su caja)
function k_poner(R, c) {
  const B = R.buf, b = c.b, [x0, y0, x1, y1] = c.caja;
  for (let y = y0; y <= y1; y++) { const f = y * 320; for (let x = x0; x <= x1; x++) { const v = b[f + x]; if (v) B[f + x] = v; } }
}

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba a la izquierda), de ancho w; la recorta R.recorte
function k_nube(R, cx, cy, w, cols = [K.nubeS, K.nube, K.nubeL]) {
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2], [0.42, 0.1, 0.13], [-0.44, 0.12, 0.12]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), cols[0]);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), cols[1]);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.62), cols[2]);
  R.linea(Math.round(cx - w * 0.52), Math.round(cy + w * 0.2), Math.round(cx + w * 0.52), Math.round(cy + w * 0.2), cols[0]);
}

// el cielo de la mañana del Capitolio en (x0, y0)–(x1, y1): degradado tramado del azul al rosa del horizonte, el sol con su
// halo (o.sol [x, y]), tres capas de nubes de tres tonos a tres velocidades, un dirigible lejano (o.dirigible) y pájaros
function k_cielo(R, x0, y0, x1, y1, t, o = {}) {
  R.recorte([x0, y0, x1, y1]);
  k_grad(R, x0, y0, x1, y1, o.cols ?? [K.cielo0, K.cielo1, K.cielo2, K.cielo3, K.cielo4, K.cielo5]);
  if (o.sol) { const [sx, sy] = o.sol; R.halo(sx, sy, 16, [K.cielo3, K.cielo4], 1.1); R.disco(sx, sy, 7, hex('#fff6c8')); R.disco(sx, sy, 6, hex('#fffbe6')); R.disco(sx - 2, sy - 2, 2, K.blanco); }
  const alto = y1 - y0, ancho = x1 - x0;
  const capas = [[0.7, 6, 12, 0.62, 41, [K.cielo3, K.cielo4, K.nube]], [1.8, 4, 20, 0.4, 42, [K.nubeT, K.nube, K.nubeL]], [3.4, 3, 30, 0.18, 43, [K.nubeS, K.nube, K.nubeL]]];
  for (const [v, n, w, fy, k, cols] of capas) for (let i = 0; i < n; i++) {
    const span = ancho + w * 2 + 30, xx = x0 - w - 15 + ((h(i, 1, k) * span + t * v) % span), yy = y0 + alto * (fy + (h(i, 2, k) - 0.5) * 0.22);
    k_nube(R, xx, yy, w * (0.7 + h(i, 3, k) * 0.6), cols);
  }
  if (o.dirigible !== false) { const span = ancho + 80, dx = x1 + 30 - ((t * 2.2 + 140) % span), dy = y0 + alto * 0.3;
    for (let i = -9; i <= 9; i++) { const hh = Math.round(Math.sqrt(1 - (i / 10) ** 2) * 4); R.linea(dx + i, dy - hh, dx + i, dy + hh, i < -3 ? hex('#f0c8e0') : i < 5 ? K.rosaL : K.rosa); }
    R.linea(dx - 8, dy - 3, dx + 6, dy - 3, K.blanco); R.linea(dx + 9, dy - 3, dx + 12, dy - 5, K.rosaS); R.linea(dx + 9, dy + 3, dx + 12, dy + 5, K.rosaS);
    for (let i = -3; i <= 3; i++) R.pset(dx + i, dy + 5, K.rosaD); for (let i = -6; i <= 4; i += 2) R.pset(dx + i, dy, (Math.floor(t * 3) + i) % 4 === 0 ? K.amarillo : K.turqL); }
  for (let i = 0; i < (o.pajaros ?? 5); i++) {
    const span = ancho + 40, px = x0 - 20 + ((h(i, 5, 44) * span + t * (9 + i * 1.7)) % span), py = Math.round(y0 + alto * (0.18 + h(i, 6, 44) * 0.42) + Math.sin(t * 1.3 + i) * 2), al = Math.sin(t * 9 + i * 2) > 0 ? -1 : 0;
    R.pset(px, py, K.moradoD); R.pset(px - 1, py + al, K.moradoD); R.pset(px + 1, py + al, K.moradoD); R.pset(px - 2, py + al - (al ? 0 : 1), hex('#4a3a6a')); R.pset(px + 2, py + al - (al ? 0 : 1), hex('#4a3a6a'));
  }
  R.recorte(null);
}

// una sierra de montes con nieve en (x0..x1), con la cresta alrededor de y; luz desde la izquierda; k cambia la forma
function k_montes(R, x0, x1, y, alto, base, cols, k) {
  const top = (x) => Math.round(y - alto * (0.5 + 0.3 * Math.sin(x * 0.035 + k) + 0.2 * Math.sin(x * 0.091 + k * 2) + 0.12 * Math.sin(x * 0.21 + k * 3)) + h(x, 1, k) * 1.5);
  for (let x = x0; x <= x1; x++) { const a = top(x), s = top(x + 1) - a, nv = y - alto * 0.5;
    for (let yy = a; yy <= base; yy++) { const luz = s < 0 ? 1 : s > 0 ? -1 : 0, d = yy - a;
      let c = luz > 0 ? cols[0] : luz < 0 ? cols[2] : cols[1]; if (d > 6 && h(x, yy >> 1, k) < 0.4) c = cols[1]; if (yy > base - (base - a) * 0.35) c = (yy + x) & 1 ? cols[2] : cols[3];
      if (yy < nv + 3 && d < 9 + h(x, 3, k) * 4) c = luz >= 0 ? K.nieve : K.nieveS;
      R.pset(x, yy, c); } }
}

// una torre de cristal del Capitolio de x0 a x1 (de la cumbre top a la base): forma 'recta' | 'cintura' | 'gota', remate
// 'cupula' | 'aguja' | 'curva' | 'anillo' | 'plano'; cols [luz, cuerpo, sombra, junta]; cristal con plantas, montantes,
// el reflejo del cielo en diagonal y alguna ventana encendida; el borde en sombra y la luz a la izquierda
function k_torre(R, x0, x1, top, base, forma, remate, cols, k) {
  const cx = (x0 + x1) / 2, w = (x1 - x0) / 2, alto = base - top;
  const media = (y) => { const v = (y - top) / alto; return forma === 'cintura' ? w * (0.72 + 0.28 * (2 * v - 1) ** 2) : forma === 'gota' ? w * Math.min(1, 0.35 + Math.sqrt(Math.max(0, v)) * 0.9) : w; };
  for (let y = top; y <= base; y++) { const m = media(y), a = Math.round(cx - m), b = Math.round(cx + m);
    for (let x = a; x <= b; x++) { const f = (x - a) / Math.max(1, b - a);
      let c = f < 0.22 ? cols[0] : f < 0.7 ? cols[1] : cols[2]; if (f > 0.15 && f < 0.3 && k_b4(x, y) < (0.3 - f) * 6) c = cols[1]; if (f > 0.62 && f < 0.78 && k_b4(x, y) < (f - 0.62) * 6) c = cols[2];
      if ((y - top) % 5 === 0) c = cols[3]; else if ((x - a) % 4 === 0 && x !== a) c = k_mezcla(c, cols[3], 0.5);
      if (((x * 2 - y + k * 17) % 46 + 46) % 46 < 5 && f < 0.75) c = k_mezcla(c, K.cristalL, 0.55);
      if ((y - top) % 5 !== 0 && (x - a) % 4 !== 0 && h(x >> 2, Math.floor((y - top) / 5), k) < 0.07) c = h(x, y, k) < 0.5 ? K.oroL : K.turqL;
      R.pset(x, y, c); }
    R.pset(a - 1, y, cols[3]); R.pset(b + 1, y, cols[3]); }
  const ta = Math.round(cx - media(top)), tb = Math.round(cx + media(top)), ww = tb - ta;
  if (remate === 'cupula') { for (let j = 0; j <= ww / 2; j++) { const m = Math.round(Math.sqrt(Math.max(0, (ww / 2) ** 2 - j * j))); for (let x = Math.round(cx) - m; x <= Math.round(cx) + m; x++) R.pset(x, top - j, x < cx - m * 0.35 ? K.oroL : x < cx + m * 0.45 ? K.oro : K.oroS); }
    for (let i = -2; i <= 2; i++) { const xx = Math.round(cx + i * ww / 6); for (let j = 1; j < ww / 2 - Math.abs(i) * 1.6; j++) R.pset(xx, top - j, K.oroS); }
    R.linea(Math.round(cx), top - Math.round(ww / 2) - 6, Math.round(cx), top - Math.round(ww / 2), K.oroS); R.pset(Math.round(cx), top - Math.round(ww / 2) - 7, K.oroL); }
  if (remate === 'aguja') { for (let j = 0; j < 16; j++) { const m = Math.round((ww / 2) * (1 - j / 16) ** 1.5); for (let x = Math.round(cx) - m; x <= Math.round(cx) + m; x++) R.pset(x, top - j, x < cx - m * 0.3 ? cols[0] : x <= cx + m * 0.3 ? cols[1] : cols[2]); }
    R.linea(Math.round(cx), top - 26, Math.round(cx), top - 15, K.oroS); R.rect(Math.round(cx) - 2, top - 8, Math.round(cx) + 2, top - 7, K.oro); }
  if (remate === 'curva') for (let x = ta; x <= tb; x++) { const d = Math.round(Math.sin((x - ta) / ww * Math.PI * 0.5) * 9); for (let y = top - 9; y < top - 9 + d; y++) R.pset(x, y, 0); for (let y = top - 9 + d; y < top; y++) R.pset(x, y, y === top - 9 + d ? K.blanco : x < ta + ww * 0.25 ? cols[0] : cols[1]); }
  if (remate === 'anillo' || remate === 'cupula') { const ya = top + Math.round(alto * 0.22); R.rect(ta - 6, ya, tb + 6, ya + 2, K.marmol); R.rect(ta - 6, ya + 2, tb + 6, ya + 3, K.marmolD); R.rect(ta - 6, ya, tb - 6, ya, K.marmolL); for (let x = ta - 4; x <= tb + 4; x += 3) R.pset(x, ya + 1, K.turqL); }
  if (remate === 'anillo') { R.linea(Math.round(cx), top - 12, Math.round(cx), top - 1, K.marmolD); R.disco(Math.round(cx), top - 13, 1, K.rosa); }
  if (remate === 'plano' || remate === 'anillo') { R.rect(ta - 1, top - 2, tb + 1, top, K.marmol); R.rect(ta - 1, top - 2, tb + 1, top - 2, K.marmolL); R.rect(ta - 1, top, tb + 1, top, K.marmolD); }
}

// los bajos de un edificio (x0..x1, y0..y1): pilares de mármol, escaparates de cristal con su toldo de rayas, mercancía de
// colores insinuada y una puerta de cristal oscura con reflejo
function k_bajos(R, x0, x1, y0, y1, k) {
  const { rect, pset } = R, TOLDO = [[K.rosa, K.blanco], [K.turq, K.blanco], [K.morado, K.oroL], [K.naranja, K.blanco]][k % 4];
  rect(x0, y0, x1, y1, K.marmol); rect(x0, y0, x1, y0 + 1, K.marmolD); rect(x0, y0 + 2, x1, y0 + 2, K.oro);
  const n = Math.max(1, Math.round((x1 - x0) / 18)), wv = (x1 - x0) / n;
  for (let i = 0; i < n; i++) { const a = Math.round(x0 + i * wv + 3), b = Math.round(x0 + (i + 1) * wv - 3), ya = y0 + 7;
    rect(a, ya, b, y1 - 1, K.cristalD); rect(a, ya, b, ya, K.k); rect(a + 1, ya + 1, b - 1, y1 - 2, K.cristalS);
    for (let x = a + 1; x < b; x++) for (let y = ya + 1; y < y1 - 1; y++) if ((x - y + k * 5) % 11 === 0 || (x - y + k * 5) % 11 === 1) pset(x, y, K.cristal);
    if ((i + k) % 3 === 1) { rect(a + Math.round((b - a) / 2) - 2, ya + 3, a + Math.round((b - a) / 2) + 2, y1 - 1, K.cristalD); pset(a + Math.round((b - a) / 2) + 1, ya + 6, K.oroL); }
    else for (let j = 0; j < 3; j++) { const px = a + 2 + j * 4; if (px + 2 < b) { rect(px, y1 - 6 - (j % 2) * 2, px + 2, y1 - 2, [K.rosaL, K.amarillo, K.turqL, K.lima][(i + j + k) % 4]); pset(px, y1 - 6 - (j % 2) * 2, K.blanco); } }
    for (let x = a - 2; x <= b + 2; x++) { const c = Math.floor((x - a + 2) / 3) % 2 ? TOLDO[0] : TOLDO[1]; pset(x, ya - 3, c); pset(x, ya - 2, c); pset(x, ya - 1, k_mezcla(c, K.k, 0.25)); if ((x - a) % 3 === 1) pset(x, ya, k_mezcla(c, K.k, 0.25)); }
    rect(a - 3, y0 + 3, a - 1, y1, K.marmolS); pset(a - 3, y0 + 3, K.marmolL); }
  rect(x0, y1, x1, y1, K.marmolD);
}

// una persona pequeña del Capitolio de fondo (unos 12 px) con su peluca alta de color y ropa chillona; k la elige; anda
// (o.anda, con o.dir), aplaude (o.aplaude) o saluda con el brazo (o.saluda); o.s 1 o 0.7 (más pequeña, más lejos)
function k_gente(R, x, suelo, t, k, o = {}) {
  const { pset } = R, P = [K.rosa, K.turq, K.morado, K.lima, K.naranja, K.amarillo, K.rojo, K.blanco, K.rosaL, K.moradoL], ROPA = [K.oro, K.turqS, K.rosaS, K.moradoS, K.blanco, K.lima, K.naranja, K.cristal, K.rojoS];
  const pelo = P[k % P.length], ropa = ROPA[(k * 7 + 3) % ROPA.length], piel = [K.piel, K.pielS, K.pielO, hex('#f8d8c8')][(k * 3) % 4], dir = o.dir ?? 1;
  x = Math.round(x); suelo = Math.round(suelo);
  const paso = o.anda ? Math.floor(t * 6 + k) % 2 : 0, chico = o.s && o.s < 1, bob = o.aplaude || o.saluda ? (Math.sin(t * 9 + k) > 0.3 ? 1 : 0) : 0;
  const yb = suelo - (chico ? 3 : 4);
  // las piernas
  pset(x - 1 + (paso ? -1 : 0), suelo - 1, K.k); pset(x + 1 + (paso ? 1 : 0), suelo - 1, K.k); pset(x - 1, suelo - 2, K.k); pset(x + 1, suelo - 2, K.k); if (!chico) { pset(x - 1, suelo - 3, K.k); pset(x + 1, suelo - 3, K.k); }
  // el cuerpo, con falda o chaqueta acampanada y su sombra
  const alto = chico ? 4 : 6; for (let j = 0; j < alto; j++) { const a = j > alto - 3 && k % 2 ? 3 : 2; for (let i = -a; i <= a; i++) pset(x + i, yb - j - bob, i === a ? k_mezcla(ropa, K.k, 0.35) : i === -a ? k_mezcla(ropa, K.blanco, 0.3) : ropa); }
  const yh = yb - alto - bob;
  // la cabeza y la peluca alta
  pset(x - 1, yh, piel); pset(x, yh, piel); pset(x + 1, yh, piel); pset(x - 1, yh - 1, piel); pset(x, yh - 1, piel); pset(x + 1, yh - 1, piel); pset(x + dir, yh - 1, K.k);
  const ap = 2 + (k % 3) + (chico ? -1 : 0), forma = k % 4;
  for (let j = 0; j < ap; j++) { const a = forma === 0 ? 2 : forma === 1 ? Math.max(1, 2 - (j >> 1)) : forma === 2 ? 1 + (j % 2) : 2; for (let i = -a; i <= a; i++) pset(x + i, yh - 2 - j, i === -a ? k_mezcla(pelo, K.blanco, 0.45) : i === a ? k_mezcla(pelo, K.k, 0.3) : pelo); }
  pset(x - 2, yh, pelo); if (forma === 3) { pset(x + 2, yh - 1, pelo); pset(x - 2, yh - 1, pelo); }
  if (o.aplaude) { const c = Math.sin(t * 14 + k * 1.7) > 0; pset(x + (c ? 0 : -1), yh + 2, piel); pset(x + (c ? 1 : 2), yh + 2, piel); }
  else if (o.saluda) { const s = Math.sin(t * 8 + k) > 0 ? 1 : 0; pset(x + 3, yh + 1, ropa); pset(x + 3 + s, yh - 1, piel); pset(x + 3 + s, yh - 2, piel); }
  else { pset(x - 3, yh + 3, piel); pset(x + 3, yh + 3, piel); }
}

// un coche del Capitolio de líneas curvas (unos 26 × 9 px), con la burbuja de cristal, el reflejo, la luz de bajos que
// brilla en el suelo y los faros; dir 1 hacia la derecha
function k_coche(R, x, y, col, dir, t, k = 0) {
  const { pset } = R; x = Math.round(x); y = Math.round(y);
  const L = K.k, cL = k_mezcla(col, K.blanco, 0.45), cS = k_mezcla(col, K.k, 0.35);
  for (let i = -14; i <= 14; i++) pset(x + i, y + 1, k_mezcla(K.asfaltoS, K.turqL, 0.5));
  for (let i = -13; i <= 13; i++) { const u = i * dir, alto = Math.round(Math.sqrt(Math.max(0, 1 - (i / 13.6) ** 2)) * (u > 4 ? 3.2 : 4.6));
    for (let j = 0; j <= alto; j++) pset(x + i, y - j, j === alto ? L : j === alto - 1 ? cL : j === 0 ? cS : col); pset(x + i, y, L); }
  for (let i = -6; i <= 5; i++) { const u = i * dir, alto = Math.round(Math.sqrt(Math.max(0, 1 - ((i + 0.5 * dir) / 6.6) ** 2)) * 4);
    for (let j = 0; j <= alto; j++) pset(x + i - 1 * dir, y - 4 - j, j === alto ? L : u > 2 && j < alto - 1 ? K.cristalL : K.cristalS); }
  pset(x - 3 * dir, y - 6, K.blanco); pset(x - 2 * dir, y - 7, K.blanco);
  pset(x + 13 * dir, y - 2, K.amarillo); pset(x + 12 * dir, y - 2, K.oroL); pset(x - 13 * dir, y - 2, K.rojo);
  for (let i = -9; i <= 9; i += 6) pset(x + i, y - 1, Math.sin(t * 5 + i + k) > 0 ? K.turqL : K.turq);
}

// una banderola vertical de colores (sin letras) colgada de un brazo en (x, y0), de alto px, que ondea con el viento:
// franjas, un rombo en medio y el bajo en cola de golondrina
function k_banderola(R, x, y0, alto, cols, t, k) {
  const { pset } = R;
  for (let j = 0; j < alto; j++) { const dx = Math.round(Math.sin(t * 2.6 + j * 0.22 + k) * (j / alto) * 2.2);
    for (let i = 0; i < 7; i++) { if (j > alto - 4 && Math.abs(i - 3) < j - alto + 4) continue;
      let c = i < 2 || i > 4 ? cols[1] : cols[0]; const rx = Math.abs(i - 3), ry = Math.abs(j - alto * 0.45); if (rx + ry * 0.7 < 3) c = cols[2]; if (rx + ry * 0.7 < 1.4) c = K.blanco;
      const lado = Math.sin(t * 2.6 + j * 0.22 + k + i * 0.3) > 0.5 && i > 4; pset(x + i + dx, y0 + j, lado ? k_mezcla(c, K.k, 0.25) : i === 0 ? k_mezcla(c, K.blanco, 0.35) : c); } }
}

// una farola del Capitolio de mármol y oro de pie en (x, suelo) hasta y0, con su brazo y el globo de luz
function k_farola(R, x, suelo, y0) {
  const { rect, pset, disco } = R;
  rect(x - 1, y0, x + 1, suelo, K.marmolS); rect(x - 1, y0, x - 1, suelo, K.marmolL); rect(x + 1, y0, x + 1, suelo, K.marmolD);
  rect(x - 3, suelo - 3, x + 3, suelo, K.marmolD); rect(x - 2, suelo - 3, x + 2, suelo - 2, K.marmol); rect(x - 2, y0 + 12, x + 2, y0 + 13, K.oro);
  rect(x - 1, y0 + 2, x + 9, y0 + 3, K.oroS); rect(x - 1, y0 + 2, x + 9, y0 + 2, K.oro);
  disco(x, y0 - 2, 3, K.oroS); disco(x, y0 - 2, 2, hex('#fff8d8')); pset(x - 1, y0 - 3, K.blanco);
}

// Avenida ('general'): el cielo de la mañana con nubes, el dirigible y pájaros; montes nevados al fondo; torres lejanas
// claras y, delante, siete edificios de cristal y mármol de colores (cintura, gota con anillo, cúpula dorada, aguja, curva,
// la torre de la pantalla gigante y uno bajo y tranquilo bajo Atom) con sus bajos de escaparates y toldos; la acera del
// fondo con paseantes de peluca (y 120), farolas con banderolas que ondean, la calzada lila con coches curvos en dos
// carriles y la plaza de mármol en damero de delante, con macetones de setos dorados. Los personajes, en y 166.
function k_avenida(R, t, o, cam) {
  if (cam === 'balcon') return k_balcon(R, t, o);
  const { rect, pset } = R;
  k_cielo(R, 0, 0, 319, 112, t, { sol: [46, 36] });
  const capa = k_capa(R, 'avenida', () => {
    k_montes(R, 0, 319, 78, 34, 104, [K.monte0, K.monte1, K.monte2, K.monte2], 1.3);
    k_montes(R, 0, 319, 90, 26, 108, [K.monte1, K.monte2, K.monte3, K.monte3], 4.1);
    // las torres lejanas, claras por la distancia
    for (let x = 2, i = 0; x < 316; i++) { const w = 7 + Math.floor(h(i, 1, 51) * 9), top = 58 + Math.floor(h(i, 2, 51) * 30), c = [K.cristalL, hex('#e4d4f4'), hex('#f4dcec'), hex('#d8f0f0')][i % 4];
      if (!(x > 274 && top < 50)) { rect(x, top, x + w, 108, k_mezcla(c, K.monte1, 0.35)); rect(x + w, top, x + w, 108, k_mezcla(c, K.monte2, 0.5)); for (let y = top + 2; y < 106; y += 3) for (let xx = x + 1; xx < x + w; xx += 2) if (h(xx, y, 52) < 0.4) pset(xx, y, k_mezcla(c, K.blanco, 0.5)); if (i % 3 === 0) { rect(x - 1, top - 1, x + w + 1, top, K.marmolS); } }
      x += w + 3 + Math.floor(h(i, 3, 51) * 6); }
    // los edificios de delante
    k_torre(R, 2, 44, 30, 112, 'cintura', 'anillo', [hex('#ffb4dc'), K.rosa, K.rosaS, K.rosaD], 1);
    k_torre(R, 52, 88, 50, 112, 'gota', 'cupula', [K.turqL, K.turq, K.turqS, K.turqD], 2);
    // el palacio de la cúpula: columnata de mármol y la cúpula dorada
    rect(94, 70, 138, 112, K.marmol); rect(92, 66, 140, 70, K.marmolL); rect(92, 70, 140, 71, K.marmolD); rect(92, 72, 140, 73, K.oro);
    for (let x = 97; x <= 135; x += 6) { rect(x, 76, x + 2, 108, K.marmolL); rect(x + 2, 76, x + 3, 108, K.marmolS); rect(x - 1, 74, x + 4, 75, K.marmolS); rect(x - 1, 108, x + 4, 109, K.marmolS); rect(x + 4, 76, x + 5, 108, hex('#b8b4d4')); }
    for (let j = 0; j <= 16; j++) { const m = Math.round(Math.sqrt(256 - j * j) * 1.1); for (let x = 116 - m; x <= 116 + m; x++) pset(x, 66 - j, x < 116 - m * 0.4 ? K.oroL : x < 116 + m * 0.4 ? K.oro : K.oroS); }
    for (let i = -3; i <= 3; i++) for (let j = 1; j < 15 - Math.abs(i) * 2; j++) pset(116 + i * 5, 66 - j, K.oroS); rect(115, 44, 117, 50, K.oroS); pset(116, 43, K.oroL);
    k_torre(R, 144, 178, 34, 112, 'cintura', 'aguja', [K.moradoL, K.morado, K.moradoS, K.moradoD], 3);
    k_torre(R, 186, 230, 44, 112, 'recta', 'curva', [K.oroL, hex('#f8e0a0'), K.oroS, K.oroD], 4);
    k_torre(R, 236, 274, 30, 112, 'recta', 'plano', [hex('#a8e8ff'), K.cristal, K.cristalS, K.cristalD], 5);
    // la pantalla gigante, su marco y sus focos
    rect(240, 44, 270, 72, K.k); rect(239, 43, 271, 43, K.marmolD); rect(239, 73, 271, 73, K.marmolD);
    // el edificio bajo de la derecha (bajo Atom, tranquilo)
    rect(278, 62, 319, 112, K.marmolR); rect(276, 58, 319, 61, K.marmol); rect(276, 58, 319, 58, K.marmolL); rect(276, 62, 319, 62, K.marmolRS);
    for (let y = 66; y < 92; y += 8) for (let x = 282; x < 318; x += 9) { rect(x, y, x + 5, y + 5, K.cristalS); rect(x, y, x + 5, y, K.marmolRS); pset(x + 1, y + 1, K.cristalL); }
    // los bajos de los edificios
    k_bajos(R, 2, 46, 92, 112, 0); k_bajos(R, 50, 90, 94, 112, 1); k_bajos(R, 144, 180, 94, 112, 2); k_bajos(R, 184, 232, 94, 112, 3); k_bajos(R, 236, 276, 94, 112, 0); k_bajos(R, 278, 319, 94, 112, 1);
    // la acera del fondo: losas con juntas y el bordillo dorado
    rect(0, 113, 319, 121, K.marmol); for (let x = 0; x < 320; x += 12) for (let y = 113; y <= 121; y++) pset(x + Math.round((x - 160) * (y - 113) / 60), y, K.marmolS);
    rect(0, 117, 319, 117, hex('#e0e2ec')); rect(0, 113, 319, 113, K.marmolD); rect(0, 121, 319, 121, K.oroL); rect(0, 122, 319, 122, K.oroS);
    // la calzada lila, con su trama, las marcas doradas y el brillo
    for (let y = 123; y <= 146; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y, 53); pset(x, y, n < 0.12 ? K.asfaltoS : n > 0.93 ? K.asfaltoL : y < 126 ? K.asfaltoS : K.asfalto); }
    for (let x = 4; x < 320; x += 20) rect(x, 134, x + 9, 135, K.oroM);
    rect(0, 146, 319, 146, K.oroS); rect(0, 147, 319, 148, K.marmolL);
    // la plaza de delante: damero de mármol blanco y rosa con vetas, filas cada vez más altas
    let y = 149; for (let r = 0; y < 180; r++) { const al = 6 + r * 2, an = 18 + r * 2, off = (r % 2) * an / 2;
      for (let yy = y; yy < Math.min(180, y + al); yy++) for (let x = 0; x < 320; x++) { const i = Math.floor((x + off) / an), blanca = (i + r) % 2 === 0, bx = (x + off) % an, by = yy - y;
        let c = blanca ? K.marmol : K.marmolR; if (bx === 0 || by === 0) c = blanca ? K.marmolS : K.marmolRS; else if (by === al - 1 || bx === an - 1) c = blanca ? hex('#dfe2ec') : hex('#ecc8dc'); else if (by === 1 && bx > 1) c = K.marmolL;
        const v = Math.sin((x + i * 13) * 0.21 + yy * 0.6 + r) + h(x >> 1, yy >> 1, 54 + r) * 1.6; if (v > 2.25 && bx > 1 && by > 1) c = blanca ? K.marmolV : K.marmolRV;
        pset(x, yy, c); }
      y += al; }
    // el rosetón dorado incrustado en el suelo de la plaza
    for (let j = -8; j <= 8; j++) for (let i = -24; i <= 24; i++) { const r = Math.hypot(i / 3, j), an = Math.atan2(j, i / 3); if (r > 8) continue; const c = r > 7 ? K.oroS : r > 6 ? K.oroL : Math.cos(an * 8) > 0.3 && r > 2 ? K.oro : r < 2 ? K.rosa : null; if (c) pset(160 + i, 168 + j, c); }
    // los macetones dorados con setos en bola
    for (const x of [16, 304]) { rect(x - 9, 160, x + 9, 176, K.oroS); rect(x - 9, 160, x + 9, 161, K.oroL); rect(x - 8, 162, x - 6, 175, K.oro); rect(x - 10, 176, x + 10, 177, K.oroD);
      R.disco(x, 150, 10, K.hojaS); R.disco(x - 1, 149, 9, K.hoja); R.disco(x - 3, 146, 5, K.hojaL); for (let k = 0; k < 40; k++) { const a = h(k, 1, x) * 6.28, r = h(k, 2, x) * 9; pset(Math.round(x + Math.cos(a) * r), Math.round(150 + Math.sin(a) * r), k % 3 ? K.hojaD : K.hojaL); } }
    // las farolas de la acera del fondo
    for (const x of [30, 100, 214, 282]) k_farola(R, x, 120, 72);
  });
  k_poner(R, capa);
  // la pantalla gigante: aros de colores que laten y una rosa blanca que gira (sin letras)
  { const [a, b, c, d] = [241, 45, 269, 71], cx = 255, cy = 58;
    for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) { const r = Math.hypot(x - cx, (y - cy) * 1.1), v = Math.floor(r / 3 - t * 3); pset(x, y, [K.rosa, K.morado, K.turq, K.moradoD][((v % 4) + 4) % 4]); }
    for (let i = 0; i < 5; i++) { const an = t * 0.8 + i * 1.2566; R.disco(Math.round(cx + Math.cos(an) * 4), Math.round(cy + Math.sin(an) * 4), 3, K.flor); }
    R.disco(cx, cy, 3, K.florS); R.disco(cx, cy, 1, K.flor); R.linea(cx, cy + 6, cx, cy + 11, K.hojaL);
    for (let x = a; x <= c; x++) if ((x + Math.floor(t * 20)) % 9 === 0) pset(x, b, K.blanco); }
  // las banderolas que cuelgan de las farolas
  [[30, 0], [100, 1], [214, 2], [282, 3]].forEach(([x, k]) => k_banderola(R, x + 3, 76, 22, [[K.rosa, K.morado, K.oro], [K.turq, K.cristalS, K.oroL], [K.morado, K.rosa, K.turqL], [K.oro, K.naranja, K.blanco]][k], t, k));
  // los paseantes de la acera del fondo, en las dos direcciones
  for (let i = 0; i < 10; i++) { const v = (5 + h(i, 1, 55) * 6) * (i % 2 ? -1 : 1), x = ((h(i, 2, 55) * 360 + t * v) % 360 + 360) % 360 - 20; k_gente(R, x, 120, t, i + 3, { anda: true, dir: v > 0 ? 1 : -1 }); }
  // un grupito parado delante del escaparate, charlando
  k_gente(R, 160, 120, t, 2, { saluda: true }); k_gente(R, 166, 120, t, 5, { dir: -1 });
  // los coches, en dos carriles
  const COL = [K.rosa, K.turq, K.amarillo, K.morado, K.blanco, K.naranja];
  for (let i = 0; i < 3; i++) { const x = ((h(i, 1, 56) * 400 + t * 34) % 400) - 40; k_coche(R, x, 132, COL[i], 1, t, i); }
  for (let i = 0; i < 3; i++) { const x = 360 - ((h(i, 2, 56) * 400 + t * 26) % 400); k_coche(R, x, 143, COL[i + 3], -1, t, i + 3); }
  // tres palomas teñidas de rosa que picotean en la plaza (una echa a volar de vez en cuando)
  for (let i = 0; i < 3; i++) { const vuela = i === 2 && (t % 9) > 6.5, u = vuela ? (t % 9) - 6.5 : 0, x = Math.round(262 + i * 9 + Math.sin(t * 0.5 + i) * 4 + u * 30), y = Math.round(175 - u * 40), pica = !vuela && Math.sin(t * 4 + i * 2) > 0.5, d = Math.sin(t * 0.5 + i) > 0 ? 1 : -1;
    R.rect(x - 2, y - 3, x + 2, y - 1, K.rosaL); R.rect(x - 2, y - 1, x + 1, y - 1, K.rosa); pset(x - 3 * d, y - 2, K.rosaS); const hx = x + 3 * d, hy = pica ? y - 1 : y - 4; pset(hx, hy, K.rosaL); pset(hx + d, hy, K.naranja); pset(hx, hy - 1, K.rosaS);
    if (vuela) { const al = Math.sin(t * 20) > 0 ? -2 : 1; R.linea(x - 1, y - 3, x - 4, y - 3 + al, K.rosaS); R.linea(x + 1, y - 3, x + 4, y - 3 + al, K.rosaS); } else { pset(x - 1, y, K.naranja); pset(x + 1, y, K.naranja); } }
  // reflejo de las farolas encendidas en la calzada
  for (const x of [30, 100, 214, 282]) for (let y = 126; y < 130; y++) if ((y + x) % 2) pset(x + Math.round(Math.sin(t * 2 + y) * 0.6), y, K.asfaltoL);
  return { suelo: 166, aceraFondo: 120, carriles: [132, 143], pantalla: [241, 45, 269, 71], libre: [40, 150, 290, 180], farolas: [30, 100, 214, 282] };
}

// Balcón ('balcon'): la fachada del palacio de mármol vista desde la plaza: el friso dorado, pilastras, el ventanal central
// en arco con cortinas rosas y la luz de dentro, dos colgaduras moradas que ondean, el balcón (losa en y 127 con ménsulas)
// y abajo la multitud de pelucas de colores que salta, saluda y agita banderitas, con confeti. A los lados, el cielo y dos
// torres. Los personajes se plantan en el balcón en y 126 (x 96–224) y la barandilla (capitolioDelante) les tapa de la
// cintura abajo.
function k_balcon(R, t, o) {
  const { rect, pset } = R;
  k_cielo(R, 0, 0, 319, 140, t, { pajaros: 4 });
  const capa = k_capa(R, 'balcon', () => {
    k_torre(R, 0, 30, 40, 140, 'gota', 'cupula', [K.turqL, K.turq, K.turqS, K.turqD], 7);
    k_torre(R, 288, 319, 62, 140, 'recta', 'plano', [hex('#ffb4dc'), K.rosa, K.rosaS, K.rosaD], 8);
    // la fachada: mármol con sillares, pilastras con capitel dorado, el friso y la cornisa
    for (let y = 26; y <= 140; y++) for (let x = 36; x <= 276; x++) { const fila = Math.floor((y - 26) / 7), bx = (x + (fila % 2) * 12) % 24, by = (y - 26) % 7;
      let c = by === 0 ? K.marmolS : bx === 0 ? hex('#d8dbe6') : by === 1 ? K.marmolL : K.marmol; if (h(x >> 1, y, 61) < 0.05) c = K.marmolV; pset(x, y, c); }
    for (let x = 36; x <= 276; x++) { pset(x, 140, K.marmolD); }
    rect(30, 16, 282, 19, K.marmol); rect(30, 16, 282, 16, K.marmolL); rect(30, 19, 282, 19, K.marmolD);
    rect(32, 20, 280, 25, K.oro); for (let x = 34; x < 280; x += 4) { rect(x, 21, x + 1, 23, K.oroS); pset(x, 21, K.oroL); } rect(32, 25, 280, 25, K.oroD);
    for (const x of [44, 84, 228, 268]) { rect(x - 4, 28, x + 4, 140, K.marmolL); rect(x + 2, 28, x + 4, 140, K.marmolS); rect(x - 2, 28, x - 2, 140, K.marmol); rect(x - 5, 28, x + 5, 31, K.oro); rect(x - 5, 31, x + 5, 31, K.oroS); pset(x - 4, 29, K.oroL); rect(x - 5, 136, x + 5, 140, K.marmolS); }
    // las ventanas laterales con frontón
    for (const x of [64, 248]) { rect(x - 10, 46, x + 10, 98, K.marmolD); rect(x - 9, 47, x + 9, 97, K.cristalD); rect(x - 8, 48, x + 8, 96, K.cristalS); rect(x, 48, x, 96, K.marmol); rect(x - 8, 70, x + 8, 70, K.marmol);
      for (let yy = 48; yy < 96; yy++) for (let xx = x - 8; xx <= x + 8; xx++) if ((xx - yy) % 13 === 0) pset(xx, yy, K.cristal);
      for (let j = 0; j < 8; j++) rect(x - 12 + j, 44 - j, x + 12 - j, 44 - j, j === 0 ? K.marmolD : j === 1 ? K.oro : K.marmolL); }
    // el ventanal central en arco: luz cálida de dentro, una lámpara de cristal, cortinas rosas recogidas
    const cx = 160; for (let y = 34; y <= 127; y++) { const m = y < 60 ? Math.round(Math.sqrt(Math.max(0, 900 - (60 - y) ** 2))) : 30; if (y < 34 || m <= 0) continue;
      for (let x = cx - m - 3; x <= cx + m + 3; x++) pset(x, y, Math.abs(x - cx) > m ? (Math.abs(x - cx) > m + 2 ? K.oroS : K.oro) : K.marmolD); }
    for (let y = 37; y <= 127; y++) { const m = y < 60 ? Math.round(Math.sqrt(Math.max(0, 729 - (60 - y) ** 2))) : 27; for (let x = cx - m; x <= cx + m; x++) pset(x, y, k_mezcla(hex('#fff2c8'), hex('#f0b870'), (y - 37) / 100 + h(x >> 2, y >> 2, 62) * 0.15)); }
    rect(cx - 1, 37, cx + 1, 50, K.oroS); for (let i = -8; i <= 8; i++) { const yy = 54 + Math.round(Math.abs(i) * 0.3); pset(cx + i, yy, K.oroS); if (i % 2 === 0) { pset(cx + i, yy + 1, K.cristalL); pset(cx + i, yy + 2, K.blanco); } }
    for (const lado of [-1, 1]) for (let y = 40; y <= 124; y++) { const ancho = y < 92 ? 9 - Math.round((y - 40) / 12) : 4 + Math.round((y - 92) / 7); for (let i = 0; i <= ancho; i++) { const x = cx + lado * (27 - i); pset(x, y, (i + Math.floor(y / 3)) % 4 === 0 ? K.rosaS : i === ancho ? K.rosaD : (i % 3 === 1 ? K.rosaL : K.rosa)); } }
    for (const lado of [-1, 1]) { rect(cx + lado * 21 - 2, 90, cx + lado * 21 + 2, 93, K.oro); pset(cx + lado * 21, 91, K.oroL); }
    // los medallones dorados de laurel bajo las ventanas y las guirnaldas de flores entre las pilastras
    for (const x of [64, 248]) { R.disco(x, 117, 8, K.oroS); R.disco(x, 117, 7, K.oro); R.disco(x, 117, 5, K.marmolL); R.disco(x, 117, 4, K.marmol); for (let a = 0; a < 6.28; a += 0.45) pset(Math.round(x + Math.cos(a) * 6), Math.round(117 + Math.sin(a) * 6), a % 0.9 < 0.45 ? K.oroL : K.oroD); R.disco(x - 1, 116, 2, K.rosaL); pset(x - 2, 115, K.blanco); }
    for (const [a, b] of [[48, 80], [232, 264], [88, 128], [192, 224]]) for (let x = a; x <= b; x++) { const y = Math.round(34 + Math.sin((x - a) / (b - a) * Math.PI) * 6); pset(x, y, K.hojaS); pset(x, y + 1, K.hoja); if ((x - a) % 4 === 2) { pset(x, y - 1, (x >> 2) % 2 ? K.rosaL : K.flor); pset(x + 1, y, K.rosa); } }
    // la losa del balcón con su canto dorado y las ménsulas
    rect(84, 127, 236, 132, K.marmol); rect(84, 127, 236, 127, K.marmolL); rect(84, 131, 236, 132, K.marmolD); rect(84, 129, 236, 129, K.oro);
    for (let x = 92; x <= 228; x += 17) { for (let j = 0; j < 8; j++) rect(x - 3 + (j >> 1), 133 + j, x + 3 - (j >> 1), 133 + j, j < 2 ? K.marmol : K.marmolS); pset(x, 134, K.oroL); }
    // la multitud de abajo, fija: el suelo de la plaza
    for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x + y) % 2 ? hex('#3a2a52') : hex('#2e2244'));
  });
  k_poner(R, capa);
  // las colgaduras moradas que ondean
  for (const [x, k] of [[96, 0], [220, 1]]) for (let j = 0; j < 40; j++) { const dx = Math.round(Math.sin(t * 2 + j * 0.15 + k) * j / 18);
    for (let i = 0; i < 9; i++) { if (j > 34 && Math.abs(i - 4) < j - 34) continue; let c = i === 0 || i === 8 ? K.oro : K.morado; if (Math.abs(i - 4) + Math.abs(j - 18) * 0.6 < 3.4) c = K.oroL; else if (Math.abs(i - 4) + Math.abs(j - 18) * 0.6 < 4.4) c = K.oroS;
      if (i > 5 && c === K.morado) c = K.moradoS; if (i === 1 && c === K.morado) c = K.moradoL; pset(x - 4 + i + dx, 133 + j, c); } }
  // la multitud que salta, saluda y agita banderitas
  const filas = [[146, 0.75, 30], [156, 0.85, 28], [168, 1, 24], [181, 1, 22]];
  filas.forEach(([y, s, n], f) => { for (let i = 0; i < n; i++) { const x = Math.round((i + (f % 2) * 0.5) * 320 / n + (h(i, f, 63) - 0.5) * 6), salto = Math.sin(t * 6 + i * 1.7 + f) > 0.6 ? 1 : 0;
    k_gente(R, x, y - salto, t, i * 3 + f, { saluda: (i + f) % 3 === 0, aplaude: (i + f) % 3 === 1, s: s < 1 ? 0.7 : 1 });
    if ((i + f) % 5 === 2) { const fx = x + 3, fy = y - 18 - salto; R.linea(fx, fy, fx, fy + 6, K.marmolD); const w = Math.sin(t * 7 + i) > 0 ? 1 : 0; R.rect(fx + 1, fy, fx + 4, fy + 2 + w, [K.rosa, K.turq, K.oro][i % 3]); } } });
  // el confeti que cae
  for (let i = 0; i < 46; i++) { const x = Math.round((h(i, 1, 64) * 320 + Math.sin(t * 2 + i) * 6) % 320), y = Math.round((h(i, 2, 64) * 200 + t * (16 + i % 5 * 4)) % 200) - 10;
    if (x > 274 && y < 48) continue; const c = [K.rosa, K.turq, K.oro, K.lima, K.moradoL, K.blanco][i % 6]; pset(x, y, c); if (Math.sin(t * 9 + i) > 0) pset(x + 1, y, c); else pset(x, y + 1, k_mezcla(c, K.k, 0.3)); }
  return { suelo: 126, balcon: [96, 224], barandilla: 117, ventanal: [133, 37, 187, 127], multitud: [0, 140, 319, 179] };
}

// la barandilla del balcón (por delante de los personajes): pasamanos de mármol con canto dorado y balaustres torneados
function k_balconDelante(R, t, o) {
  const capa = k_capa(R, 'balconDel', () => { const { rect, pset } = R;
    rect(84, 117, 236, 120, K.marmol); rect(84, 117, 236, 117, K.marmolL); rect(84, 120, 236, 120, K.marmolD); rect(84, 118, 236, 118, K.oroL);
    for (let x = 88; x <= 232; x += 6) { const P = [1, 2, 2, 1, 1, 1]; P.forEach((m, j) => { rect(x - m, 121 + j, x + m, 121 + j, K.marmol); pset(x + m, 121 + j, K.marmolS); pset(x - m, 121 + j, K.marmolL); }); }
    for (const x of [84, 160, 236]) { rect(x - 3, 114, x + 3, 126, K.marmol); rect(x + 1, 114, x + 3, 126, K.marmolS); rect(x - 3, 114, x + 3, 114, K.marmolL); rect(x - 4, 113, x + 4, 113, K.oro); R.disco(x, 110, 2, K.oro); pset(x - 1, 109, K.oroL); }
    rect(84, 126, 236, 126, K.marmolD);
  });
  k_poner(R, capa);
}

// un haz de foco tramado del punto (x0, y0) a un óvalo de ancho an en (x1, y1), que aclara lo que hay hacia col
function k_haz(R, x0, y0, x1, y1, an, col, a = 0.35) {
  for (let y = Math.max(0, Math.round(y0)); y <= Math.min(179, Math.round(y1)); y++) { const u = (y - y0) / Math.max(1, y1 - y0), cx = x0 + (x1 - x0) * u, m = 1 + an * u;
    for (let x = Math.round(cx - m); x <= Math.round(cx + m); x++) if (((x + y) & 1) === 0 || Math.abs(x - cx) < m * 0.4) { const c = R.pget(x, y); if (c) R.pset(x, y, k_mezcla(c, col, a * (1 - Math.abs(x - cx) / (m + 1) * 0.6))); } }
}

// la cuadrícula de retratos de los tributos en [x0, y0, x1, y1]: n cuadritos (6 por fila) con fondo de color, cabeza con
// su pelo, hombros con la ropa; un marco dorado que salta de un cuadrito a otro y un brillo de barrido
function k_retratos(R, t, [x0, y0, x1, y1], n = 24) {
  const { rect, pset, disco } = R, cols = 6, filas = Math.ceil(n / cols), w = (x1 - x0 + 1) / cols, hh = (y1 - y0 + 1) / filas;
  const FON = [K.moradoD, K.turqD, K.rosaD, hex('#2a3a6a')], PELO = [hex('#3a2418'), hex('#1a1416'), hex('#e8c060'), hex('#a8442a'), hex('#6a4a2a'), hex('#d8d0c8')], PIEL = [K.piel, K.pielS, K.pielO, hex('#f8dcc8')];
  const sel = Math.floor(t * 1.2) % n;
  for (let i = 0; i < n; i++) { const cx0 = Math.round(x0 + (i % cols) * w), cy0 = Math.round(y0 + Math.floor(i / cols) * hh), cx1 = Math.round(x0 + (i % cols + 1) * w) - 1, cy1 = Math.round(y0 + (Math.floor(i / cols) + 1) * hh) - 1;
    const f = FON[(i + Math.floor(i / cols)) % 4]; rect(cx0, cy0, cx1, cy1, K.k); rect(cx0 + 1, cy0 + 1, cx1 - 1, cy1 - 1, f); rect(cx0 + 1, cy0 + 1, cx1 - 1, cy0 + 1, k_mezcla(f, K.blanco, 0.2));
    const mx = Math.round((cx0 + cx1) / 2), r = Math.max(2, Math.round(Math.min(cx1 - cx0, cy1 - cy0) * 0.2)), cy = Math.round(cy0 + (cy1 - cy0) * 0.42);
    R.recorte([cx0 + 1, cy0 + 1, cx1 - 1, cy1 - 1]);
    disco(mx, cy1 + r - 1, r * 2, [K.oroS, K.turqS, K.rosaS, hex('#5a5a6a'), hex('#4a6a3a')][i % 5]);
    disco(mx, cy, r, PIEL[i % 4]); const pelo = PELO[(i * 5) % 6]; for (let j = -r; j <= 0; j++) for (let k = -r; k <= r; k++) if (k * k + j * j <= r * r + 1 && j < -r * 0.25) pset(mx + k, cy + j, pelo);
    if (i % 2) { pset(mx - r, cy, pelo); pset(mx - r, cy + 1, pelo); pset(mx + r, cy, pelo); pset(mx + r, cy + 1, pelo); }
    pset(mx - 1, cy + 1, K.k); pset(mx + 1, cy + 1, K.k);
    R.recorte(null);
    if (i === sel) { rect(cx0, cy0, cx1, cy0, K.oroL); rect(cx0, cy1, cx1, cy1, K.oro); rect(cx0, cy0, cx0, cy1, K.oroL); rect(cx1, cy0, cx1, cy1, K.oro); }
  }
  const bx = Math.round(x0 + ((t * 40) % ((x1 - x0) + 60)) - 30); for (let y = y0; y <= y1; y++) for (let k = 0; k < 3; k++) { const x = bx + k + Math.round((y - y0) * 0.4); if (x >= x0 && x <= x1) k_tono(R, x, y, 0.22); }
}

// una grada de público de x0 a x1 con el pie de la fila en suelo: escalón de terciopelo con su canto y tira de luz, y gente
// de peluca de colores cada 7 px (la fracción ap aplaude; los que aplauden saltan)
function k_grada(R, t, x0, x1, suelo, ap, k) {
  const { rect, pset } = R;
  for (let x = x0, i = 0; x <= x1 - 3; x += 7, i++) { const aplaude = h(i, k, 71) < ap; k_gente(R, x + 3 + Math.round(h(i, 2, k) * 2), suelo - (aplaude && Math.sin(t * 7 + i) > 0.7 ? 1 : 0), t, i * 5 + k, { aplaude, s: 1 }); }
  rect(x0, suelo, x1, suelo + 5, K.terciopeloS); rect(x0, suelo, x1, suelo, K.terciopeloL); for (let x = x0; x <= x1; x += 2) pset(x, suelo + 1, K.terciopelo);
  for (let x = x0; x <= x1; x++) pset(x, suelo + 4, ((x >> 1) + Math.floor(t * 6) + k) % 9 === 0 ? K.turqL : K.turqS);
}

// el sillón de entrevista (unos 30 × 26 px) con su pie en (x, suelo): respaldo redondo de terciopelo rosa con capitoné,
// cojín, brazos y pata dorada
function k_sillon(R, x, suelo, dir = 1) {
  const { rect, pset, disco } = R, c = K.rosa, cS = K.rosaS, cL = K.rosaL;
  for (let j = 0; j < 20; j++) { const m = Math.round(Math.sqrt(Math.max(0, 1 - ((j - 9) / 11) ** 2)) * 13); for (let i = -m; i <= m; i++) pset(x + i, suelo - 26 + j, i === -m || i === m || j === 0 ? K.k : i < -m + 3 ? cL : i > m - 4 ? cS : c); }
  for (const [i, j] of [[-6, 7], [0, 5], [6, 7], [-3, 11], [3, 11], [-7, 14], [7, 14]]) { pset(x + i, suelo - 26 + j, cS); pset(x + i - 1, suelo - 27 + j, cL); }
  rect(x - 14, suelo - 10, x + 14, suelo - 6, K.k); rect(x - 13, suelo - 9, x + 13, suelo - 7, c); rect(x - 13, suelo - 9, x + 13, suelo - 9, cL);
  for (const s of [-1, 1]) { rect(x + s * 13 - 2, suelo - 16, x + s * 13 + 2, suelo - 6, K.k); rect(x + s * 13 - 1, suelo - 15, x + s * 13 + 1, suelo - 7, s * dir > 0 ? cS : c); pset(x + s * 13 - 1, suelo - 15, cL); }
  rect(x - 12, suelo - 6, x + 12, suelo - 5, cS); rect(x - 1, suelo - 5, x + 1, suelo - 1, K.oroS); rect(x - 1, suelo - 5, x - 1, suelo - 1, K.oroL); rect(x - 8, suelo - 1, x + 8, suelo, K.oro); rect(x - 8, suelo, x + 8, suelo, K.oroD);
}

// la mesita del plató en (x, suelo): tablero de cristal, pie dorado, dos tazas (una humea) y una orquídea rosa
function k_mesita(R, x, suelo, t) {
  const { rect, pset } = R;
  rect(x - 10, suelo - 12, x + 10, suelo - 11, K.cristalL); rect(x - 10, suelo - 10, x + 10, suelo - 10, K.cristalS); pset(x - 8, suelo - 12, K.blanco);
  rect(x - 1, suelo - 9, x + 1, suelo - 1, K.oroS); rect(x - 1, suelo - 9, x - 1, suelo - 1, K.oroL); rect(x - 5, suelo - 1, x + 5, suelo, K.oro);
  for (const dx of [-6, 4]) { rect(x + dx, suelo - 16, x + dx + 3, suelo - 13, K.k); rect(x + dx + 1, suelo - 15, x + dx + 2, suelo - 13, K.blanco); pset(x + dx + 4, suelo - 15, K.k); }
  if (t != null) for (let j = 0; j < 4; j++) pset(x + 5 + Math.round(Math.sin(t * 3 + j) * 0.8), suelo - 17 - j - Math.floor((t * 4) % 2), k_mezcla(K.blanco, K.moradoD, 0.4 + j * 0.12));
  rect(x - 2, suelo - 16, x + 1, suelo - 13, K.oro); R.linea(x - 1, suelo - 17, x - 3, suelo - 26, K.hojaS); R.linea(x - 1, suelo - 17, x + 2, suelo - 24, K.hojaS);
  for (const [dx, dy] of [[-3, -26], [-4, -23], [2, -24], [3, -21], [-2, -20]]) { pset(x + dx, suelo + dy, K.rosaL); pset(x + dx + 1, suelo + dy, K.rosa); pset(x + dx, suelo + dy + 1, K.rosa); pset(x + dx + 1, suelo + dy + 1, K.amarillo); }
}

// el techo del plató: fondo oscuro, la parrilla de celosía y los focos con sus geles (en xs)
function k_techoPlato(R, xs) {
  const { rect, pset, linea } = R;
  for (let y = 0; y < 24; y++) for (let x = 0; x < 320; x++) pset(x, y, (x + y) % 3 ? hex('#160e2a') : hex('#1c1234'));
  rect(0, 5, 319, 5, hex('#3a3050')); rect(0, 11, 319, 11, hex('#3a3050')); for (let x = 0; x < 320; x += 8) { linea(x, 6, x + 4, 10, hex('#2c2442')); linea(x + 4, 6, x + 8, 10, hex('#2c2442')); }
  xs.forEach(([x, gel]) => { rect(x - 1, 12, x + 1, 14, hex('#4a4060')); rect(x - 5, 14, x + 5, 21, K.k); rect(x - 4, 15, x + 4, 20, hex('#3a3450')); rect(x - 4, 15, x + 4, 15, hex('#5a5470')); rect(x - 3, 21, x + 3, 22, gel); pset(x, 22, K.blanco); linea(x - 5, 21, x - 7, 24, hex('#2a2440')); linea(x + 5, 21, x + 7, 24, hex('#2a2440')); });
}

// Plató ('general'): el techo con la parrilla y cinco focos de colores cuyos haces barren el escenario; la pared del fondo
// morada con tiras de luz; la pantalla gigante (o.pantalla: función (R, t, [x0,y0,x1,y1]) o 'retratos' con o.n cuadritos,
// 24 por omisión) en [98, 30, 222, 92]; el medidor de audiencia a su derecha (o.audiencia 0–1; por omisión sube y baja
// solo) con su cifra; las gradas de público con pelucas a los dos lados (o.aplausos 0–1: cuántos aplauden), el escenario
// redondo con su canto de luces, dos sillones rosas (x 128 y 192), la mesita con tazas y una orquídea, el suelo brillante
// con los reflejos y, delante, cabezas de la primera fila y una cámara con su piloto. Personajes en y 150.
function k_plato(R, t, o, cam) {
  if (cam === 'sillones') return k_platoSillones(R, t, o);
  const { rect, pset, disco } = R, ap = o.aplausos ?? 0.6, au = o.audiencia ?? (0.55 + 0.3 * (0.5 + 0.5 * Math.sin(t * 0.7)));
  const capa = k_capa(R, 'plato', () => {
    k_techoPlato(R, [[40, K.rosaL], [96, K.turqL], [160, hex('#fff0b0')], [224, K.moradoL], [262, K.turqL]]);
    // la pared del fondo: paneles morados con junta y arcos de luz
    for (let y = 24; y < 128; y++) for (let x = 0; x < 320; x++) { const px = x % 32, c = px === 0 ? K.moradoD : px < 3 ? hex('#4a2a7a') : (y + x) % 4 === 0 ? hex('#2e1a52') : hex('#34205c'); pset(x, y, c); }
    for (let y = 24; y < 128; y += 12) rect(0, y, 319, y, hex('#28184a'));
    // la pantalla gigante: marco de oro y cromo, con dos luces en las esquinas
    rect(94, 26, 226, 96, K.oroS); rect(95, 27, 225, 95, K.oro); rect(95, 27, 225, 27, K.oroL); rect(96, 28, 224, 94, K.k); rect(95, 95, 225, 95, K.oroD);
    // el tubo del medidor de audiencia
    rect(232, 30, 244, 96, K.k); rect(233, 31, 243, 95, hex('#1a1030')); rect(231, 96, 245, 99, K.oroS); rect(231, 96, 245, 96, K.oro);
    // las gradas: el fondo escalonado
    for (const [x0, x1] of [[0, 84], [246, 319]]) for (let y = 56; y < 140; y++) for (let x = x0; x <= x1; x++) pset(x, y, (x + y) % 2 ? hex('#22143e') : hex('#2a1848'));
    // el escenario redondo: la superficie brillante, el canto y el frente con escalones
    for (let y = 126; y <= 170; y++) for (let x = 60; x <= 260; x++) { const u = (x - 160) / 100, v = (y - 148) / 20; if (u * u + v * v > 1) continue;
      let c = (x + y) % 2 ? hex('#3a2268') : hex('#42286e'); if (v < -0.55 && (x + y) % 3 === 0) c = hex('#5a3a8a'); const ra = Math.sqrt(u * u + v * v); if (ra > 0.93) c = K.oro; else if (ra > 0.88) c = K.oroS; else if (Math.abs(ra - 0.55) < 0.025) c = hex('#6a4a9a'); pset(x, y, c); }
    for (let x = 60; x <= 260; x++) { const u = (x - 160) / 100, ye = Math.round(148 + 20 * Math.sqrt(Math.max(0, 1 - u * u))); for (let y = ye + 1; y <= ye + 9; y++) pset(x, y, y === ye + 1 ? K.oroS : (y - ye) % 4 === 0 ? hex('#1e1236') : Math.abs(u) > 0.8 ? hex('#22143e') : hex('#2a1a46')); }
    // el suelo brillante de los lados
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) if (R.pget(x, y) === 0) pset(x, y, (x * 3 + y) % 5 === 0 ? hex('#1e1436') : hex('#140c26'));
    k_sillon(R, 128, 146, 1); k_sillon(R, 192, 146, -1); k_mesita(R, 160, 146, null);
  });
  k_poner(R, capa);
  // la pantalla
  const P = [97, 29, 223, 93];
  if (typeof o.pantalla === 'function') { R.recorte(P); o.pantalla(R, t, P); R.recorte(null); } else k_retratos(R, t, P, o.n ?? 24);
  // el medidor de audiencia: segmentos de colores que suben, la cifra encima
  { const n = 16, on = Math.round(au * n); for (let i = 0; i < n; i++) { const y = 92 - i * 4, c = i < on ? (i < 6 ? K.turq : i < 11 ? K.amarillo : K.rosa) : hex('#2a1a46'); rect(235, y - 2, 241, y, c); if (i < on) pset(235, y - 2, K.blanco); }
    if (Math.floor(t * 3) % 2 && on > 0) rect(234, 92 - (on - 1) * 4 - 3, 242, 92 - (on - 1) * 4 - 3, K.blanco);
    a_cifras(R, String(Math.round(au * 100)), 238, 24); }
  // las gradas con el público
  [[70, 0], [86, 1], [102, 2], [118, 3], [134, 4]].forEach(([y, k]) => { k_grada(R, t, 0, 84 - k * 2, y, ap, k); k_grada(R, t, 246 + k * 2, 319, y, ap, k + 9); });
  // las luces del canto del escenario, que corren
  for (let a = 0; a < 64; a++) { const an = a / 64 * Math.PI * 2, x = Math.round(160 + Math.cos(an) * 98), y = Math.round(148 + Math.sin(an) * 19.4); if (y < 150) continue; pset(x, y, (a + Math.floor(t * 10)) % 6 < 2 ? K.blanco : K.oroL); }
  // los haces de los focos, que barren despacio
  [[40, K.rosaL, 0], [96, K.turqL, 1], [224, K.moradoL, 2], [262, K.turqL, 3]].forEach(([x, c, k]) => k_haz(R, x, 23, 160 + Math.sin(t * 0.6 + k * 1.7) * 70, 150, 16, c, 0.22));
  k_haz(R, 160, 23, 160, 146, 26, hex('#fff4c8'), 0.16);
  // los reflejos en el suelo y las motas en la luz
  for (let i = 0; i < 18; i++) { const x = Math.round(70 + h(i, 1, 72) * 180 + Math.sin(t * 0.5 + i) * 6), y = Math.round(30 + ((h(i, 2, 72) * 110 + t * 4) % 110)); if (Math.sin(t * 3 + i) > 0) k_tono(R, x, y, 0.5); }
  for (let j = 0; j < 5; j++) pset(165 + Math.round(Math.sin(t * 3 + j)), 128 - j * 2 - Math.floor((t * 4) % 2), k_mezcla(K.blanco, hex('#42286e'), 0.3 + j * 0.12));
  // la primera fila, de espaldas, y la cámara de la derecha
  for (let i = 0; i < 6; i++) { const x = 6 + i * 9, y = 180 - (i % 2) * 2, pelo = [K.rosa, K.turq, K.lima, K.morado, K.naranja, K.amarillo][i]; R.rect(x - 6, y - 3, x + 6, y, hex('#0a0614')); R.rect(x - 5, y - 4, x + 5, y - 4, hex('#0a0614')); disco(x, y - 8, 4, K.k); disco(x, y - 9, 3, pelo); pset(x - 1, y - 10, k_mezcla(pelo, K.blanco, 0.45)); pset(x - 2, y - 9, k_mezcla(pelo, K.blanco, 0.3)); if (Math.sin(t * 7 + i) > 0.6 && ap > 0.3) { pset(x + 5, y - 14, K.piel); pset(x + 6, y - 14, K.piel); pset(x + 5, y - 13, hex('#0a0614')); } }
  { const x = 296, y = 150; rect(x - 2, y + 10, x + 2, 179, K.k); rect(x - 1, y + 10, x - 1, 179, hex('#4a4a5a')); rect(x - 14, y, x + 10, y + 10, K.k); rect(x - 13, y + 1, x + 9, y + 9, hex('#3a3a4a')); rect(x - 13, y + 1, x + 9, y + 1, hex('#5a5a6a'));
    rect(x - 22, y + 2, x - 14, y + 8, K.k); rect(x - 21, y + 3, x - 15, y + 7, hex('#2a2a36')); disco(x - 22, y + 5, 2, hex('#4a6a9a')); rect(x - 4, y - 4, x + 2, y, K.k); rect(x - 3, y - 3, x + 1, y - 1, hex('#3a6ab0')); disco(x + 6, y - 2, 1, Math.floor(t * 2) % 2 ? K.rojo : K.rojoS); }
  return { suelo: 150, sillones: [128, 192], asiento: 137, mesita: [160, 134], pantalla: P, medidor: [232, 30, 244, 96], escenario: [60, 128, 260, 168], gradas: [[0, 56, 84, 140], [246, 56, 319, 140]] };
}

// Plató, cámara 'sillones': los dos sillones de cerca (x 112 y 208) sobre la alfombra redonda, la mesita con las tazas y la
// orquídea en medio (x 160), el micrófono de pie; detrás, la parte de abajo de la pantalla gigante (la misma o.pantalla, con
// seis retratos grandes) entre columnas de luz, el público desenfocado (luces bokeh que laten con o.aplausos) y el canto del
// escenario con sus luces. Personajes en y 160 (sentados: de pie delante del sillón, con los pies en y 158).
function k_platoSillones(R, t, o) {
  const { rect, pset, disco } = R, ap = o.aplausos ?? 0.6;
  const capa = k_capa(R, 'platoS', () => {
    k_techoPlato(R, [[60, K.rosaL], [130, hex('#fff0b0')], [200, K.turqL], [250, K.moradoL]]);
    for (let y = 24; y < 134; y++) for (let x = 0; x < 320; x++) pset(x, y, (x + y) % 4 === 0 ? hex('#2e1a52') : hex('#34205c'));
    rect(58, 22, 262, 112, K.oroS); rect(59, 23, 261, 111, K.oro); rect(59, 23, 261, 23, K.oroL); rect(60, 24, 260, 110, K.k);
    for (const x of [30, 290]) { rect(x - 8, 48, x + 8, 134, hex('#24143e')); rect(x - 7, 48, x - 6, 134, hex('#4a2a7a')); }
    // la alfombra redonda y el suelo del escenario
    for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x - 160) / 150, v = (y - 160) / 16, r = u * u + v * v;
      let c = (x + y) % 2 ? hex('#3a2268') : hex('#42286e'); if (r < 1) c = r > 0.86 ? K.oro : r > 0.8 ? K.rosaS : (Math.floor(x / 6) + Math.floor(y / 3)) % 2 ? K.rosaD : hex('#7a1e56'); if (r < 0.5 && r > 0.46) c = K.oroS; pset(x, y, c); }
    rect(0, 134, 319, 134, K.oroS); rect(0, 135, 319, 135, K.oroD);
    k_sillon(R, 112, 158, 1); k_sillon(R, 208, 158, -1); k_mesita(R, 160, 158, null);
    // el micrófono de pie, a la izquierda
    rect(74, 136, 74, 158, K.metalD ?? hex('#4a5262')); rect(70, 158, 78, 159, K.k); R.linea(74, 136, 82, 130, hex('#6c7688')); disco(83, 129, 2, K.k); pset(83, 128, hex('#9aa4b4'));
  });
  // el público desenfocado detrás de la pantalla (bokeh) y luego la capa
  for (let y = 24; y < 134; y++) for (let x = 0; x < 320; x++) pset(x, y, (x + y) % 4 === 0 ? hex('#2e1a52') : hex('#34205c'));
  for (let i = 0; i < 34; i++) { const x = Math.round(h(i, 1, 73) * 320), y = Math.round(40 + h(i, 2, 73) * 90), r = 2 + Math.round(h(i, 3, 73) * 3), pul = Math.sin(t * (2 + ap * 6) + i) > 0.2 - ap * 0.6;
    const c = [K.rosa, K.turq, K.morado, K.oro, K.lima][i % 5]; for (let j = -r; j <= r; j++) for (let k = -r; k <= r; k++) if (k * k + j * j <= r * r && ((x + k + y + j) & 1 || pul)) pset(x + k, y + j, k_mezcla(c, hex('#34205c'), pul ? 0.25 : 0.6)); }
  k_poner(R, capa);
  const P = [61, 25, 259, 109];
  if (typeof o.pantalla === 'function') { R.recorte(P); o.pantalla(R, t, P); R.recorte(null); } else k_retratos(R, t, P, Math.min(12, o.n ?? 12));
  // las columnas de luz que suben
  for (const x of [30, 290]) for (let y = 50; y < 134; y++) { const v = (y + Math.floor(t * 18)) % 20; pset(x, y, v < 3 ? K.blanco : v < 8 ? K.turqL : K.turqS); pset(x + 3, y, (y + Math.floor(t * 12)) % 14 < 4 ? K.rosaL : K.rosaS); pset(x - 3, y, (y + Math.floor(t * 12)) % 14 < 4 ? K.rosaL : K.rosaS); }
  // el frente iluminado bajo la pantalla: chevrones de luz que corren
  for (let y = 116; y < 132; y++) for (let x = 40; x < 280; x++) { const v = ((x + Math.abs(y - 124) * 2) >> 2) - Math.floor(t * 6); pset(x, y, y === 116 || y === 131 ? K.oroS : ((v % 6) + 6) % 6 === 0 ? (Math.floor(x / 60) % 2 ? K.turqL : K.rosaL) : ((v % 6) + 6) % 6 === 1 ? (Math.floor(x / 60) % 2 ? K.turqS : K.rosaS) : hex('#22143e')); }
  for (let x = 0; x < 320; x++) pset(x, 133, ((x >> 1) + Math.floor(t * 8)) % 10 === 0 ? K.blanco : K.oroL);
  k_haz(R, 130, 23, 112, 158, 22, hex('#fff4c8'), 0.16); k_haz(R, 200, 23, 208, 158, 22, K.turqL, 0.14);
  // el vapor de la taza
  for (let j = 0; j < 5; j++) pset(165 + Math.round(Math.sin(t * 3 + j) * 1), 140 - j * 2 - Math.floor((t * 4) % 2), k_mezcla(K.blanco, hex('#34205c'), 0.3 + j * 0.12));
  return { suelo: 160, sillones: [112, 208], asiento: 149, mesita: [160, 146], microfono: [83, 129], pantalla: P };
}

// la ciudad vista por una ventana en [x0, y0, x1, y1]: el cielo con nubes, montes nevados, torres de cristal de colores
// de dos alturas y los coches voladores lejanos que cruzan (todo recortado al hueco)
function k_ciudadVentana(R, t, clave, [x0, y0, x1, y1], k = 0) {
  k_cielo(R, x0, y0, x1, y1, t, { pajaros: 3, sol: [x0 + Math.round((x1 - x0) * 0.2), y0 + 18] });
  const capa = k_capa(R, clave, () => k_torresCiudad(R, x0, y0, x1, y1, k));
  k_poner(R, capa);
  R.recorte([x0, y0, x1, y1]);
  for (let i = 0; i < 4; i++) { const v = (8 + i * 3) * (i % 2 ? -1 : 1), span = x1 - x0 + 20, xx = Math.round(x0 - 10 + (((h(i, 1, 82) * span + t * v) % span) + span) % span), yy = Math.round(y0 + (y1 - y0) * (0.5 + i * 0.09));
    R.linea(xx - 2, yy, xx + 2, yy, [K.rosa, K.turq, K.blanco, K.amarillo][i]); R.pset(xx + (v > 0 ? 3 : -3), yy, K.blanco); R.pset(xx, yy - 1, K.cristalL); }
  R.recorte(null);
}
// los reflejos del cristal: dos franjas diagonales tramadas que aclaran lo que se ve por la ventana (f: cuánto, 0,28)
function k_reflejos(R, [x0, y0, x1, y1], t, k = 0, f = 0.28) {
  for (let y = y0; y <= y1; y++) for (const [d, an] of [[30 + k * 7, 5], [52 + k * 7, 2]]) { const xa = x0 + d + Math.round((y1 - y) * 0.6 + Math.sin(t * 0.3) * 4); for (let x = xa; x < xa + an; x++) if (x >= x0 && x <= x1 && ((x + y) & 1) === 0) k_tono(R, x, y, f); }
}
// una pared de mármol blanco con vetas en (x0..x1, y0..y1): sillares grandes con junta, luz arriba y vetas grises
function k_marmol(R, x0, y0, x1, y1, k, alto = 18, ancho = 36) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - y0) / alto), bx = (x + (fila % 2) * (ancho >> 1)) % ancho, by = (y - y0) % alto;
    let c = by === 0 || bx === 0 ? K.marmolS : by === 1 ? K.marmolL : (h(x >> 2, y >> 2, k) < 0.5 ? K.marmol : hex('#e6e8f0'));
    const v = Math.sin(x * 0.09 + y * 0.31 + fila * 2 + Math.sin(y * 0.2 + x * 0.05) * 2) + h(x, y, k + 1) * 0.5; if (v > 1.3 && by > 1 && bx > 0) c = K.marmolV; if (v > 1.42 && by > 1 && bx > 0) c = K.marmolS;
    R.pset(x, y, c); }
}

// una cortina de terciopelo de x0 a x1, de y0 a y1, con pliegues de luz y sombra, el bajo recogido y la borla dorada
function k_cortina(R, x0, x1, y0, y1, lado) {
  for (let y = y0; y <= y1; y++) { const rec = y > y0 + (y1 - y0) * 0.55 ? Math.round((y - y0 - (y1 - y0) * 0.55) * 0.18) : 0;
    for (let x = x0; x <= x1; x++) { const u = x - x0, fase = (u + rec * lado) % 6, c = fase < 1 ? K.terciopeloS : fase < 3 ? K.terciopelo : fase < 4 ? K.terciopeloL : K.terciopelo;
      const fuera = lado > 0 ? u > (x1 - x0) - rec : u < rec; if (!fuera) R.pset(x, y, c); } }
  const yb = Math.round(y0 + (y1 - y0) * 0.6), xb = lado > 0 ? x1 - 2 : x0 + 2; R.rect(x0, yb, x1, yb + 1, K.oro); R.pset(xb, yb + 2, K.oroS); R.rect(xb - 1, yb + 3, xb + 1, yb + 7, K.oro); R.pset(xb - 1, yb + 3, K.oroL);
}

// una bandera de Panem sin escudo (granate con franjas doradas) en su mástil en (x, suelo) hasta yTop, que ondea
function k_bandera(R, x, suelo, yTop, t) {
  R.rect(x - 1, yTop, x, suelo, K.oroS); R.rect(x - 1, yTop, x - 1, suelo, K.oroL); R.disco(x, yTop - 2, 2, K.oro); R.pset(x - 1, yTop - 3, K.oroL); R.rect(x - 4, suelo - 2, x + 4, suelo, K.oroD);
  for (let i = 0; i < 22; i++) { const dy = Math.round(Math.sin(t * 2.2 - i * 0.35) * (1 + i * 0.12) + i * 0.35), sombra = Math.cos(t * 2.2 - i * 0.35) > 0.4;
    for (let j = 0; j < 28; j++) { let c = j < 3 || j > 24 ? K.oro : j === 8 || j === 19 ? K.oroL : K.terciopelo; if (i > 18 && j > 11 && j < 17) c = K.oro; R.pset(x + 1 + i, yTop + j + dy, sombra ? k_mezcla(c, K.k, 0.3) : c); } }
}

// rosas blancas: un ramo de n flores alrededor de (x, y) con hojas, cada rosa con pétalos de tres tonos; s 1 o 2 (más grande)
function k_rosas(R, x, y, n, k, s = 1) {
  const { pset, disco } = R;
  for (let i = 0; i < n * 2; i++) { const a = h(i, 1, k) * 6.28, r = (3 + h(i, 2, k) * 6) * s; const lx = Math.round(x + Math.cos(a) * r), ly = Math.round(y + Math.sin(a) * r * 0.8 + 2 * s); pset(lx, ly, K.hojaS); pset(lx + 1, ly, K.hoja); if (s > 1) { pset(lx, ly + 1, K.hojaD); pset(lx + 1, ly - 1, K.hojaL); } }
  for (let i = 0; i < n; i++) { const a = h(i, 3, k) * 6.28, r = h(i, 4, k) * 6 * s, fx = Math.round(x + Math.cos(a) * r), fy = Math.round(y + Math.sin(a) * r * 0.7);
    if (s > 1) { disco(fx, fy, 3, K.florS); disco(fx - 1, fy - 1, 2, K.flor); pset(fx, fy, K.florS); pset(fx + 1, fy - 1, K.florM); pset(fx - 1, fy + 1, K.florM); pset(fx - 2, fy - 2, K.blanco); }
    else { pset(fx, fy, K.flor); pset(fx + 1, fy, K.florS); pset(fx, fy + 1, K.florS); pset(fx - 1, fy, K.flor); pset(fx, fy - 1, K.blanco); } }
}

// las cifras doradas de a_cifras a escala e (2: el doble), centradas en x con la base en «base»
function k_cifras(R, s, x, base, e = 2) {
  return a_cifras({ pset: (px, py, c) => R.rect(x + (px - x) * e, base + (py - base) * e, x + (px - x) * e + e - 1, base + (py - base) * e + e - 1, c) }, s, x, base);
}

// el cofre de Snow con la boca en (x0..x1, y = base de la caja), de alto al: madera oscura con herrajes de oro; la tapa se
// abre con a (0–1) y dentro asoman tarjetas blancas con canto dorado que brillan
function k_cofre(R, x0, x1, base, al, a, t) {
  const { rect, pset, linea } = R, yb = base - al;
  // la tapa abierta, detrás: gira hacia atrás y se ve su forro granate
  const alt = Math.max(2, Math.round(al * 0.45)), ab = Math.round(a * alt * 1.6);
  if (ab >= 2) { const up = Math.round(a * al * 0.9), yt = yb - up - 2, dx = Math.round((1 - a) * 3);
    R.poligono([[x0 - 1 + dx, yt], [x1 + 1 - dx, yt], [x1 + 1, yb - 1], [x0 - 1, yb - 1]], K.k);
    R.poligono([[x0 + 1 + dx, yt + 1], [x1 - 1 - dx, yt + 1], [x1 - 1, yb - 2], [x0 + 1, yb - 2]], K.terciopelo);
    rect(x0 + 2 + dx, yt + 1, x1 - 2 - dx, yt + 1, K.terciopeloL); rect(x0 + 1, yb - 3, x1 - 1, yb - 2, K.terciopeloS); rect(x0 - 1 + dx, yt, x1 + 1 - dx, yt, K.oroS);
    for (let x = x0 + 3; x < x1 - 2; x += 4) for (let y = yt + 3; y < yb - 3; y += 4) pset(x + ((y >> 2) % 2) * 2, y, K.terciopeloS); }
  rect(x0, yb, x1, base, K.k); rect(x0 + 1, yb + 1, x1 - 1, base - 1, K.madera); rect(x0 + 1, yb + 1, x1 - 1, yb + 1, K.maderaL);
  for (let x = x0 + 2; x < x1 - 1; x++) for (let y = yb + 2; y < base - 1; y++) if (Math.sin(x * 0.5 + Math.sin(y * 0.7) * 2) > 0.85) pset(x, y, K.maderaV);
  rect(x0 + 1, base - 2, x1 - 1, base - 1, K.maderaS); for (const xx of [x0 + 3, x1 - 3]) { rect(xx - 1, yb + 1, xx + 1, base - 1, K.oroS); pset(xx - 1, yb + 2, K.oroL); }
  const mx = Math.round((x0 + x1) / 2); rect(mx - 2, yb + 2, mx + 2, yb + 5, K.oro); pset(mx, yb + 4, K.k); pset(mx - 1, yb + 2, K.oroL);
  // las tarjetas de dentro, que asoman según se abre
  const sube = Math.round(a * al * 0.55), cw = Math.max(3, Math.round((x1 - x0) / 11));
  if (a > 0.05) { for (let i = 0; i < 5; i++) { const cx = x0 + 3 + Math.round(i * (x1 - x0 - 6 - cw) / 4), yy = yb - sube + (i % 2) * Math.max(1, Math.round(al / 10)); rect(cx, yy, cx + cw, yb, K.k); rect(cx + 1, yy + 1, cx + cw - 1, yb, K.blanco); rect(cx + 1, yy + 1, cx + cw - 1, yy + 1, K.oroL); if (cw > 4) rect(cx + cw - 1, yy + 2, cx + cw - 1, yb, K.florS); }
    for (let i = 0; i < 4; i++) if (Math.sin(t * 4 + i * 1.7) > 0.6) { const sx = x0 + 6 + i * Math.round((x1 - x0) / 4), sy = yb - sube - 3; pset(sx, sy, K.oroL); pset(sx - 1, sy, K.oro); pset(sx + 1, sy, K.oro); pset(sx, sy - 1, K.oro); pset(sx, sy + 1, K.oro); } }
  // la tapa cerrada, encima
  if (ab < 2) { rect(x0 - 1, yb - alt, x1 + 1, yb, K.k); rect(x0, yb - alt + 1, x1, yb - 1, K.maderaL); rect(x0, yb - 1, x1, yb - 1, K.maderaS); rect(x0, yb - alt + 1, x1, yb - alt + 1, hex('#9a5a40')); rect(mx - 3, yb - alt + 2, mx + 3, yb - 2, K.oro); pset(mx - 3, yb - alt + 2, K.oroL); }
}

// Despacho ('general'): el despacho de Snow: paredes de mármol blanco con vetas, cornisa dorada, el ventanal enorme
// (x 76–244, y 18–118) con montantes de oro y la ciudad detrás (torres de colores, montes, nubes, coches voladores), cortinas
// de terciopelo granate, una librería de madera oscura a la izquierda con libros sin letras y un busto, la bandera granate
// sin escudo que ondea a la derecha, el suelo de madera en espiga con una alfombra roja y dorada y la luz del ventanal.
// La mesa grande con el cofre (o.cofre 0–1: se abre), el jarrón de rosas blancas, tintero, papeles y una taza va en
// capitolioDelante. Snow detrás de la mesa en x 160, y 133 (asoman cabeza y hombros); las visitas a los lados, en y 168.
function k_despacho(R, t, o, cam) {
  if (cam === 'mesa') return k_despachoMesa(R, t, o);
  const { pset } = R, V = [80, 22, 240, 117];
  k_MESA.luz = o.luz; k_MESA.cofre = o.cofre;
  if (o.luz === 'noche') return k_despachoNoche(R, t, o, V);
  k_ciudadVentana(R, t, 'despachoCiudad', V, 0);
  k_reflejos(R, V, t, 0);
  const capa = k_capa(R, 'despacho', () => k_pintaDespacho(R, V));
  k_poner(R, capa);
  // la luz del ventanal sobre la alfombra y el suelo
  for (let y = 134; y < 180; y++) { const d = Math.round((y - 134) * 0.5); for (let x = 96 + d; x < 210 + d; x++) if (((x + y) & 1) === 0 && Math.floor((x - d - 96) / 40) % 4 !== 3) k_tono(R, x, y, 0.12); }
  k_bandera(R, 286, 132, 52, t);
  // motas en la luz
  for (let i = 0; i < 12; i++) { const x = Math.round(100 + h(i, 1, 88) * 120 + Math.sin(t * 0.7 + i) * 5), y = Math.round(40 + ((h(i, 2, 88) * 90 + t * 3) % 90)); if (Math.sin(t * 2 + i) > 0) k_tono(R, x, y, 0.45); }
  k_despachoMesaGrande(R, t, o);
  return { suelo: 133, tras: 160, visita: 70, visitaDcha: 262, sueloVisita: 168, ventana: V, mesa: [96, 128, 224, 164], cofre: [184, 128], jarron: [110, 128], bandera: [286, 52] };
}
// la mesa grande del despacho, con lo de encima; va en el decorado y otra vez en capitolioDelante (o.luz 'noche': en
// penumbra, con la lámpara de mesa encendida y su luz)
function k_despachoMesaGrande(R, t, o) {
  const noche = (o.luz ?? k_MESA.luz) === 'noche', cofre = o.cofre ?? k_MESA.cofre ?? 0;
  const capa = noche ? k_capa(R, 'despachoMesaN', () => { k_pintaMesaGrande(R); const B = R.buf; for (let i = 0; i < B.length; i++) if (B[i]) B[i] = k_mezcla(B[i], k_PENUMBRA, 0.6); k_lamparaMesa(R); })
    : k_capa(R, 'despachoMesa', () => k_pintaMesaGrande(R));
  k_poner(R, capa);
  k_cofre(noche ? k_tenue(R, 0.42) : R, 174, 196, 129, 9, cofre, t);
  if (noche) { k_luzCalida(R, 126, 128, 46, 9, 0.75 + 0.05 * Math.sin(t * 9)); k_luzCalida(R, 126, 112, 9, 6, 0.9); }
  for (let j = 0; j < 4; j++) R.pset(211 + Math.round(Math.sin(t * 3 + j)), 122 - j * 2 - Math.floor((t * 4) % 2), k_mezcla(K.blanco, noche ? K.terciopeloS : K.marmol, 0.2 + j * 0.15));
}
// Despacho, cámara 'mesa': la mesa de cerca: el tablero de madera oscura con vetas en perspectiva y el secante de piel
// granate; el cofre grande abierto (o.cofre 0–1) con las tarjetas y una tarjeta grande de pie con el número (o.numero,
// a_cifras al doble; por omisión '50'); el jarrón alto de rosas blancas a la derecha, el tintero y la pluma; detrás, el
// ventanal con la ciudad y la cortina. Snow, detrás de la mesa en x 226, y 115 (asoma por encima del canto, y 112).
function k_despachoMesa(R, t, o) {
  const V = [16, 14, 250, 104];
  k_MESA.numero = o.numero; k_MESA.cofreM = o.cofre;
  k_ciudadVentana(R, t, 'mesaCiudad', V, 3);
  k_reflejos(R, V, t, 2);
  const capa = k_capa(R, 'despachoM', () => { const { rect, pset } = R;
    k_marmol(R, 0, 0, 319, 112, 90, 22, 44);
    for (let y = V[1]; y <= V[3]; y++) for (let x = V[0]; x <= V[2]; x++) pset(x, y, 0);
    rect(V[0] - 3, V[1] - 3, V[2] + 3, V[1] - 1, K.marmolS); rect(V[0] - 3, V[3] + 1, V[2] + 3, V[3] + 3, K.marmolL);
    for (const x of [V[0] - 1, 94, 172, V[2] + 1]) { rect(x - 1, V[1], x + 1, V[3], K.oroS); rect(x - 1, V[1], x - 1, V[3], K.oroL); } rect(V[0], 50, V[2], 51, K.oroS); rect(V[0], 50, V[2], 50, K.oroL);
    k_cortina(R, 250, 274, 0, 112, -1); k_cortina(R, 0, 14, 0, 112, 1);
  });
  k_poner(R, capa);
  k_mesaCerca(R, t, o);
  return { suelo: 115, tras: 226, canto: 112, cofre: [44, 130, 124, 164], tarjeta: [140, 112, 196, 160], jarron: [282, 70], ventana: V };
}
// el tablero de la mesa de cerca con lo de encima (también en capitolioDelante)
function k_mesaCerca(R, t, o) {
  const capa = k_capa(R, 'mesaCerca', () => { const { rect, pset } = R;
    for (let y = 112; y < 180; y++) { const p = (y - 112) / 68; for (let x = 0; x < 320; x++) { const xr = (x - 160) / (0.6 + p * 0.4) + 160, v = Math.sin(xr * 0.11 + Math.sin(y * 0.09 + xr * 0.02) * 3) + h(Math.round(xr) >> 1, y, 91) * 0.4;
      let c = v > 1.1 ? K.maderaV : v > 0.6 ? K.madera : v < -1 ? K.maderaS : hex('#62342a'); if (y < 114) c = y === 112 ? hex('#a8684a') : K.maderaL; pset(x, y, c); } }
    // el secante de piel granate con su canto dorado
    for (let y = 136; y < 180; y++) { const p = (y - 112) / 68, a = Math.round(160 - 110 * (0.6 + p * 0.4)), b = Math.round(160 + 70 * (0.6 + p * 0.4));
      for (let x = a; x <= b; x++) pset(x, y, x === a || x === b || y === 136 ? K.oro : (x + y) % 7 === 0 ? K.terciopeloS : K.terciopelo); }
    // el jarrón alto con las rosas
    rect(272, 96, 292, 132, K.k); for (let y = 97; y < 132; y++) { const m = Math.round(8 + Math.sin((y - 97) / 35 * Math.PI) * 2); for (let x = 282 - m; x <= 282 + m; x++) pset(x, y, x < 282 - m + 3 ? K.cristalL : x > 282 + m - 3 ? K.cristalS : K.cristal); }
    rect(271, 94, 293, 96, K.oro); rect(271, 94, 293, 94, K.oroL); for (let y = 100; y < 130; y++) pset(280 + (y % 3), y, K.hojaS);
    k_rosas(R, 282, 82, 10, 92, 2);
    // el tintero y la pluma
    rect(226, 148, 238, 160, K.k); rect(227, 149, 237, 159, hex('#1a1a3a')); rect(227, 149, 228, 159, hex('#3a3a6a')); rect(229, 146, 235, 148, K.oro); R.linea(236, 146, 250, 126, K.blanco); R.linea(237, 146, 251, 127, K.marmolS); R.linea(238, 146, 252, 128, K.marmolL);
  });
  k_poner(R, capa);
  // el cofre grande
  k_cofre(R, 44, 124, 164, 30, o.cofre ?? k_MESA.cofreM ?? 1, t);
  // la tarjeta grande de pie, con su número
  { const { rect, pset } = R, x0 = 142, x1 = 196, y0 = 114, y1 = 160, osc = Math.round(Math.sin(t * 1.2) * 0.6);
    rect(x0 + 4, y1, x1 + 6, y1 + 3, K.maderaS); rect(x0, y0 + osc, x1, y1, K.k); rect(x0 + 1, y0 + 1 + osc, x1 - 1, y1 - 1, K.flor); rect(x0 + 3, y0 + 3 + osc, x1 - 3, y1 - 3, K.oro); rect(x0 + 4, y0 + 4 + osc, x1 - 4, y1 - 4, K.flor);
    for (let y = y0 + 5 + osc; y < y1 - 4; y++) for (let x = x0 + 5; x < x1 - 4; x++) if ((x + y) % 9 === 0) pset(x, y, K.florM);
    k_cifras(R, o.numero ?? k_MESA.numero ?? '50', Math.round((x0 + x1) / 2), y1 - 14 + osc, 2);
    k_rosas(R, Math.round((x0 + x1) / 2), y0 + 10 + osc, 2, 93);
    const g = (t * 0.5) % 1; R.recorte([x0 + 1, y0 + 1, x1 - 1, y1 - 1]); if (g < 0.35) { const gx = x0 + 3 + Math.round(g / 0.35 * (x1 - x0 - 6)); for (let y = y0 + 4; y < y1 - 3; y += 1) if (((gx + y) & 1) === 0) k_tono(R, gx + Math.round((y - y0) * 0.3) - 6, y + osc, 0.4); } R.recorte(null); }
}
// un rosal de rosas blancas: mata de hojas de tres verdes con textura, ancho w y alto al, con el pie en (x, base); rosas
// abiertas de tres tonos y capullos; s 2 para los de cerca (rosas más grandes)
function k_rosal(R, x, base, w, al, k, s = 1) {
  const { pset } = R;
  for (let j = 0; j < al; j++) { const v = j / al, m = Math.round(w * 0.5 * Math.sqrt(Math.max(0, 1 - (1 - v) ** 2 * 0.9)) * (0.85 + 0.15 * Math.sin(j * 0.7 + k)));
    for (let i = -m; i <= m; i++) { const y = base - al + j, n = h((x + i) >> (s > 1 ? 1 : 0), y >> (s > 1 ? 1 : 0), k);
      if (Math.abs(i) > m - 2 && n < 0.45) continue; let c = n < 0.25 ? K.hojaD : n < 0.6 ? K.hojaS : n < 0.88 ? K.hoja : K.hojaL; if (i < -m * 0.3 && n > 0.7 && j < al * 0.6) c = K.hojaL; if (j > al * 0.8 && n < 0.6) c = K.hojaD; pset(x + i, y, c); } }
  for (let i = 0; i < 3; i++) R.linea(x - 2 + i * 2, base, x - 4 + i * 4, base - 4, K.hojaD);
  const n = Math.round(w * al / (s > 1 ? 90 : 40));
  for (let i = 0; i < n; i++) { const fx = Math.round(x + (h(i, 1, k + 5) - 0.5) * w * 0.85), fy = Math.round(base - al * (0.25 + h(i, 2, k + 5) * 0.7));
    if (s > 1) { R.disco(fx, fy, 3, K.florS); R.disco(fx - 1, fy - 1, 2, K.flor); pset(fx, fy, K.florS); pset(fx + 1, fy - 1, K.florM); pset(fx - 1, fy + 1, K.florC); pset(fx - 2, fy - 2, K.blanco); pset(fx + 2, fy + 2, K.hojaD); }
    else if (h(i, 3, k) < 0.2) { pset(fx, fy, K.florM); pset(fx, fy + 1, K.hojaL); }
    else { pset(fx, fy, K.flor); pset(fx + 1, fy, K.florS); pset(fx, fy + 1, K.florS); pset(fx - 1, fy, K.flor); pset(fx, fy - 1, K.blanco); pset(fx + 1, fy + 1, K.florC); } }
}

// una maceta de barro en (x, base) de ancho w con el canto, la luz y la tierra
function k_maceta(R, x, base, w) {
  const al = Math.round(w * 0.9); for (let j = 0; j < al; j++) { const m = Math.round(w / 2 - j * 0.15); for (let i = -m; i <= m; i++) R.pset(x + i, base - j, i < -m + 2 ? K.barroL : i > m - 2 ? K.barroS : K.barro); }
  const m = Math.round(w / 2 + 1); R.rect(x - m, base - al - 1, x + m, base - al + 1, K.barroS); R.rect(x - m, base - al - 1, x + m, base - al - 1, K.barroL); R.rect(x - m + 1, base - al - 2, x + m - 1, base - al - 2, hex('#4a2e1e'));
}

// una regadera de lata verde (dir hacia el pitorro) en (x, base)
function k_regadera(R, x, base, dir = 1) {
  const { rect, pset, linea } = R; rect(x - 5, base - 9, x + 5, base, K.k); rect(x - 4, base - 8, x + 4, base - 1, hex('#4a8a6a')); rect(x - 4, base - 8, x - 3, base - 1, hex('#7ab89a')); rect(x + 3, base - 8, x + 4, base - 1, hex('#2a5a44'));
  linea(x + 5 * dir, base - 3, x + 11 * dir, base - 10, K.k); linea(x + 5 * dir, base - 2, x + 11 * dir, base - 9, hex('#4a8a6a')); rect(Math.min(x + 10 * dir, x + 12 * dir), base - 12, Math.max(x + 10 * dir, x + 12 * dir), base - 10, hex('#2a5a44'));
  linea(x - 3 * dir, base - 9, x - 1 * dir, base - 13, K.k); linea(x - 1 * dir, base - 13, x + 3 * dir, base - 9, K.k); pset(x - 2, base - 6, K.blanco);
}

// la estructura de hierro blanco del invernadero sobre el hueco [x0, y0, x1, y1]: montantes cada paso px, travesaños en ys,
// la cornisa en arco y, encima, los nervios del techo de cristal (claros, para que la esquina de Atom quede tranquila)
function k_hierros(R, x0, y0, x1, y1, paso, ys) {
  const { rect, pset } = R, HB = hex('#f4f6f2'), HS = hex('#b8c0c4');
  for (let x = x0; x <= x1; x += paso) { rect(x - 1, y0, x, y1, HB); rect(x + 1, y0, x + 1, y1, HS); }
  for (const y of ys) { rect(x0, y, x1, y, HB); rect(x0, y + 1, x1, y + 1, HS); }
  for (let x = x0; x <= x1; x++) { const ya = Math.round(y0 - Math.sin((x - x0) / (x1 - x0) * Math.PI) * 12); rect(x, ya - 1, x, ya + 1, HB); pset(x, ya + 2, HS);
    for (let y = ya + 3; y < y0; y++) if (((x - x0) % paso === 0) || (Math.abs((x - x0) % paso - paso / 2) < 1 && y > ya + 4)) pset(x, y, HB); }
  // la filigrana en las enjutas
  for (let x = x0 + paso / 2; x < x1; x += paso) { const ya = Math.round(y0 - Math.sin((x - x0) / (x1 - x0) * Math.PI) * 12); for (let a = 0; a < 6.28; a += 0.5) pset(Math.round(x + Math.cos(a) * 3), Math.round(ya + 6 + Math.sin(a) * 2), HS); }
}

// los nervios del techo de cristal, del arco hacia arriba, en un tono cercano al del cielo
function k_techoCristal(R, x0, x1, y1) {
  const N = hex('#d8e8f4'); for (let i = 0; i <= 10; i++) { const xb = x0 + (x1 - x0) * i / 10, xt = 160 + (xb - 160) * 1.6; R.linea(Math.round(xb), y1, Math.round(xt), 0, N); }
  for (const y of [6, 16]) R.linea(0, y, 319, y, N);
}

// la vida del invernadero: pétalos que caen y giran, mariposas blancas y rayos de luz de mañana tramados
function k_vidaInvernadero(R, t, x0, x1, y0, y1, n = 16) {
  for (let i = 0; i < n; i++) { const span = y1 - y0, y = Math.round(y0 + ((h(i, 1, 101) * span + t * (6 + i % 4 * 2)) % span)), x = Math.round(x0 + h(i, 2, 101) * (x1 - x0) + Math.sin(t * 1.6 + i) * 5);
    if (x > 274 && y < 48) continue; const g = Math.sin(t * 5 + i) > 0; R.pset(x, y, K.flor); R.pset(x + (g ? 1 : 0), y + (g ? 0 : 1), K.florS); }
  for (let i = 0; i < 3; i++) { const x = Math.round(x0 + 30 + i * (x1 - x0 - 60) / 2 + Math.sin(t * 0.7 + i * 2) * 26), y = Math.round(y0 + 30 + Math.sin(t * 1.1 + i) * 14 + i * 10), al = Math.sin(t * 14 + i) > 0;
    R.pset(x, y, K.k); R.pset(x - 1, y - (al ? 1 : 0), K.blanco); R.pset(x + 1, y - (al ? 1 : 0), K.blanco); if (al) { R.pset(x - 2, y - 1, K.florS); R.pset(x + 2, y - 1, K.florS); } else { R.pset(x - 1, y + 1, K.florS); R.pset(x + 1, y + 1, K.florS); } }
}

// Invernadero ('general'): un invernadero de hierro blanco y cristal de mañana: el cielo, las torres lejanas de la ciudad
// y los montes al otro lado del cristal; la cornisa en arco y el techo de cristal; rosales trepadores en el muro de cristal
// del fondo, una fuente de mármol con su chorro en el centro (x 160), arriates de ladrillo a los dos lados con rosales
// blancos, regaderas, macetas y una carretilla; un jardinero pequeño que riega al fondo; el camino de grava que viene
// hacia la cámara, rayos de luz, pétalos que caen y mariposas. Personajes en el camino, y 160 (x 110–210).
function k_invernadero(R, t, o, cam) {
  if (cam === 'rosas') return k_invRosas(R, t, o);
  const { rect, pset } = R, V = [0, 0, 319, 112];
  k_ciudadVentana(R, t, 'invCiudad', V, 5);
  const capa = k_capa(R, 'invernadero', () => {
    k_techoCristal(R, 0, 319, 28); k_hierros(R, 4, 30, 316, 112, 26, [62, 86]);
    k_nerviosTenues(R);
    // los rosales trepadores sobre el cristal del fondo, en sus espalderas
    for (const x of [30, 82, 238, 290]) { for (let y = 64; y < 112; y += 6) R.linea(x - 8, y, x + 8, y, hex('#a88a5a')); k_rosal(R, x, 112, 22, 48, x); }
    // el murete del fondo y la fuente
    rect(0, 106, 319, 114, K.marmol); rect(0, 106, 319, 106, K.marmolL); rect(0, 114, 319, 114, K.marmolD);
    for (let j = 0; j < 8; j++) { const m = 22 - j; rect(160 - m, 118 - j, 160 + m, 118 - j, j === 7 ? K.marmolL : j > 4 ? K.marmol : K.marmolS); }
    rect(156, 96, 164, 110, K.marmol); rect(156, 96, 157, 110, K.marmolL); rect(163, 96, 164, 110, K.marmolS); for (let j = 0; j < 3; j++) rect(150 + j, 94 + j, 170 - j, 94 + j, K.marmolL);
    // el suelo: tierra y grava con el camino que se abre hacia delante
    for (let y = 115; y < 180; y++) { const a = Math.round(140 - (y - 115) * 0.9), b = Math.round(180 + (y - 115) * 0.9);
      for (let x = 0; x < 320; x++) { const n = h(x, y, 102); let c; if (x >= a && x <= b) c = n < 0.18 ? K.gravaS : n > 0.86 ? K.gravaL : K.grava; else c = n < 0.3 ? hex('#4a3020') : n < 0.8 ? hex('#5a3a26') : hex('#6e4a30'); if (x === a || x === b) c = K.barroS; pset(x, y, c); } }
    // los arriates de ladrillo con rosales a los dos lados del camino
    for (const [x0, x1, y] of [[0, 112, 128], [208, 319, 128], [0, 70, 150], [250, 319, 150]]) { rect(x0, y, x1, y + 6, K.barro); for (let x = x0; x <= x1; x++) for (let yy = y; yy <= y + 6; yy++) if ((yy - y) % 3 === 0 || (x + ((yy - y) / 3 | 0) * 4) % 8 === 0) pset(x, yy, K.barroS); rect(x0, y, x1, y, K.barroL); }
    for (let i = 0; i < 5; i++) { k_rosal(R, 12 + i * 22, 128, 24, 22, 110 + i); k_rosal(R, 222 + i * 22, 128, 24, 22, 120 + i); }
    for (let i = 0; i < 3; i++) { k_rosal(R, 12 + i * 24, 150, 26, 22, 130 + i); k_rosal(R, 262 + i * 24, 150, 26, 22, 140 + i); }
    // regaderas, macetas y la carretilla
    k_regadera(R, 100, 142, 1); k_maceta(R, 226, 176, 10); k_maceta(R, 238, 177, 8); k_maceta(R, 231, 168, 7); k_maceta(R, 84, 177, 9);
    { const x = 286, b = 176; rect(x - 14, b - 12, x + 8, b - 4, K.k); rect(x - 13, b - 11, x + 7, b - 5, hex('#4a8a6a')); rect(x - 13, b - 11, x + 7, b - 10, hex('#7ab89a')); for (let i = -12; i < 7; i += 3) pset(x + i, b - 13, K.flor); R.disco(x + 10, b - 2, 3, K.k); R.disco(x + 10, b - 2, 1, hex('#9aa4b4')); R.linea(x - 14, b - 8, x - 26, b - 16, K.maderaL); R.linea(x - 12, b - 4, x - 13, b, K.k); }
    // la manguera enrollada
    for (let a = 0; a < 6.28 * 3; a += 0.05) pset(Math.round(56 + Math.cos(a) * (4 + a * 0.3)), Math.round(170 + Math.sin(a) * (2 + a * 0.15)), a % 1 < 0.5 ? hex('#3a8a3a') : hex('#2a6a2a'));
  });
  k_poner(R, capa);
  for (let i = 0; i < k_NERVIOS.length; i += 2) if (((k_NERVIOS[i] + k_NERVIOS[i + 1]) & 1) === 0) k_tono(R, k_NERVIOS[i], k_NERVIOS[i + 1], 0.12);
  // el chorro de la fuente, el agua del pilón que brilla
  for (let i = 0; i < 14; i++) { const u = ((t * 1.4 + i / 14) % 1), x = Math.round(160 + (i % 2 ? 1 : -1) * u * 9), y = Math.round(92 - Math.sin(u * Math.PI) * 10 + u * 18); pset(x, y, u < 0.5 ? K.cristalL : K.cristal); }
  for (let x = 141; x < 180; x++) pset(x, 111, (x + Math.floor(t * 6)) % 5 === 0 ? K.blanco : K.cristal);
  // el jardinero de fondo, que riega el arriate de la izquierda
  { const x = 70 + Math.round(Math.sin(t * 0.3) * 6); k_gente(R, x, 120, t, 1, { dir: 1 }); R.pset(x + 3, 113, hex('#4a8a6a')); R.rect(x + 3, 112, x + 6, 114, hex('#4a8a6a')); for (let i = 0; i < 4; i++) R.pset(x + 7 + (i % 2), 115 + ((Math.floor(t * 8) + i) % 6), K.cristalL); }
  // los rayos de luz de mañana
  for (let y = 30; y < 160; y++) for (const x0 of [40, 120, 210]) { const xa = x0 + Math.round((y - 30) * 0.5); for (let x = xa; x < xa + 10; x++) if (((x + y) & 3) === 0) k_tono(R, x, y, 0.16 + 0.04 * Math.sin(t)); }
  k_vidaInvernadero(R, t, 0, 319, 30, 178, 22);
  return { suelo: 160, camino: [110, 210], fuente: [160, 96], arriates: [[0, 112, 128], [208, 319, 128]], regadera: [100, 142] };
}
// Invernadero, cámara 'rosas': los rosales de cerca: dos matas grandes de rosas blancas a los lados (x 0–100 y 220–319), el
// banco de trasplantar contra el cristal del fondo (y 104–128) con macetas, esquejes, una regadera y un plantador, el cristal
// con los hierros y la ciudad lejana, el camino de grava entre los rosales con sitio para dos personajes (x 120–200, y 162),
// pétalos que caen y mariposas. En capitolioDelante, ramas de rosal que asoman por las esquinas de abajo.
function k_invRosas(R, t, o) {
  const { rect, pset } = R, V = [0, 0, 319, 104];
  k_ciudadVentana(R, t, 'invRCiudad', V, 9);
  const capa = k_capa(R, 'invRosas', () => {
    k_techoCristal(R, 0, 319, 16); k_hierros(R, 10, 20, 310, 104, 40, [50]);
    rect(0, 100, 319, 108, K.marmol); rect(0, 100, 319, 100, K.marmolL);
    // el banco de trasplantar
    rect(60, 108, 260, 112, K.maderaL); rect(60, 108, 260, 108, hex('#a8684a')); rect(60, 112, 260, 113, K.madera); for (const x of [64, 158, 256]) rect(x - 1, 113, x + 1, 132, K.madera);
    rect(62, 124, 258, 125, K.madera);
    for (let i = 0; i < 6; i++) k_maceta(R, 76 + i * 9, 123, 6);
    for (const [x, w] of [[96, 10], [124, 8], [176, 12], [222, 8]]) { k_maceta(R, x, 107, w); k_rosal(R, x, 107 - Math.round(w * 0.9), w + 6, 12, x); }
    k_regadera(R, 200, 107, -1); R.linea(146, 106, 154, 101, hex('#9aa4b4')); R.rect(144, 105, 147, 107, K.madera);
    for (let i = 0; i < 4; i++) { R.linea(234 + i * 4, 107, 236 + i * 4, 98, K.hojaS); pset(236 + i * 4, 98, K.hojaL); }
    // el suelo y el camino de grava
    for (let y = 109; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 133 && x >= 60 && x <= 260) continue; const n = h(x, y, 103); pset(x, y, n < 0.18 ? K.gravaS : n > 0.86 ? K.gravaL : K.grava); }
    for (let y = 113; y < 133; y++) for (let x = 61; x < 260; x++) if (R.pget(x, y) === 0) pset(x, y, (x + y) % 3 ? hex('#4a3020') : hex('#5a3a26'));
    // los rosales grandes de los lados
    k_rosal(R, 44, 182, 100, 88, 150, 2); k_rosal(R, 276, 182, 100, 92, 151, 2); k_rosal(R, 100, 178, 40, 40, 152, 2); k_rosal(R, 222, 178, 40, 44, 153, 2);
  });
  k_poner(R, capa);
  for (let y = 20; y < 170; y++) for (const x0 of [100, 190]) { const xa = x0 + Math.round((y - 20) * 0.4); for (let x = xa; x < xa + 12; x++) if (((x + y) & 3) === 0) k_tono(R, x, y, 0.14); }
  k_vidaInvernadero(R, t, 20, 300, 20, 176, 18);
  return { suelo: 162, libre: [120, 200], banco: [60, 108, 260, 132], regadera: [200, 107] };
}

// las ramas de rosal de las esquinas de abajo, por delante de los personajes (invernadero, cámara 'rosas')
function k_invRosasDelante(R, t, o) {
  const capa = k_capa(R, 'invRosasDel', () => { k_rosal(R, 8, 190, 40, 36, 160, 2); k_rosal(R, 312, 190, 40, 40, 161, 2); });
  k_poner(R, capa);
}

// un marco dorado de cuadro alrededor del hueco [x0, y0, x1, y1] (g px de grueso): canto oscuro, oro en bandas con luz
// arriba a la izquierda, un cordón de perlas y rosetas en las esquinas
function k_marco(R, x0, y0, x1, y1, g = 5) {
  const { rect, pset, disco } = R;
  for (let i = g; i >= 1; i--) { const c = i === g ? K.oroD : i === 1 ? K.oroD : i === 2 ? K.oroS : i === g - 1 ? K.oroM : K.oro; rect(x0 - i, y0 - i, x1 + i, y0 - i, i > 2 ? k_mezcla(c, K.blanco, 0.15) : c); rect(x0 - i, y0 - i, x0 - i, y1 + i, i > 2 ? k_mezcla(c, K.blanco, 0.1) : c); rect(x0 - i, y1 + i, x1 + i, y1 + i, k_mezcla(c, K.k, 0.2)); rect(x1 + i, y0 - i, x1 + i, y1 + i, k_mezcla(c, K.k, 0.2)); }
  const m = Math.ceil(g / 2) + 1; for (let x = x0 - g + 2; x <= x1 + g - 2; x += 3) { pset(x, y0 - m, K.oroL); pset(x, y1 + m, K.oroM); } for (let y = y0 - g + 2; y <= y1 + g - 2; y += 3) { pset(x0 - m, y, K.oroL); pset(x1 + m, y, K.oroM); }
  for (const [x, y] of [[x0 - m, y0 - m], [x1 + m, y0 - m], [x0 - m, y1 + m], [x1 + m, y1 + m]]) { disco(x, y, Math.max(2, m), K.oroS); disco(x, y, Math.max(1, m - 1), K.oro); pset(x - 1, y - 1, K.oroL); }
}

// cuadro 1: la arena del reloj: el cielo del atardecer, el mar y la isla redonda de doce sectores con la manecilla que gira
function k_cuadroArena(R, t, [x0, y0, x1, y1]) {
  const { pset } = R, w = x1 - x0, hh = y1 - y0, hor = y0 + Math.round(hh * 0.4);
  k_grad(R, x0, y0, x1, hor, [hex('#4a3a8a'), hex('#c85a8a'), hex('#f8a86a'), hex('#ffe0a0')]);
  R.disco(Math.round(x0 + w * 0.7), hor - 3, Math.max(2, Math.round(w * 0.06)), hex('#fff0c0'));
  for (let y = hor + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, ((x + Math.floor(t * 3) + (y >> 1)) % 7 === 0) ? hex('#5a9ad8') : (y - hor) % 3 === 0 ? hex('#2a5a9a') : hex('#3a6ab0'));
  const cx = x0 + w / 2, cy = hor + (y1 - hor) * 0.55, rx = w * 0.36, ry = (y1 - hor) * 0.34;
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const u = (x - cx) / rx, v = (y - cy) / ry, r = u * u + v * v; if (r > 1) continue;
    const s = Math.floor(((Math.atan2(v, u) + Math.PI) / (Math.PI * 2)) * 12); let c = r > 0.8 ? hex('#f0d8a0') : s % 2 ? hex('#3a8a3a') : hex('#4aa04a'); if (r < 0.06) c = K.oro; if (r > 0.8 && h(x, y, 104) < 0.2) c = hex('#d8b880'); pset(x, y, c); }
  const an = t * 0.5 - Math.PI / 2; R.linea(Math.round(cx), Math.round(cy), Math.round(cx + Math.cos(an) * rx * 0.85), Math.round(cy + Math.sin(an) * ry * 0.85), K.k); R.linea(Math.round(cx) + 1, Math.round(cy), Math.round(cx + Math.cos(an) * rx * 0.85) + 1, Math.round(cy + Math.sin(an) * ry * 0.85), K.oroL);
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(cx + Math.cos(a) * rx * 0.92), Math.round(cy + Math.sin(a) * ry * 0.92), K.blanco); }
}

// cuadro 2: el pájaro en llamas: un sinsonte dorado con las alas abiertas sobre llamas que suben y chisporrotean
function k_cuadroSinsajo(R, t, [x0, y0, x1, y1]) {
  const { pset } = R, w = x1 - x0, hh = y1 - y0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / hh, n = Math.sin(x * 0.35 + t * 5 + Math.sin(y * 0.2 - t * 3) * 2) * 0.12 + h(x >> 1, (y + Math.floor(t * 12)) >> 1, 105) * 0.18, f = v + n;
    pset(x, y, f > 0.95 ? hex('#fff0a0') : f > 0.8 ? hex('#ffc040') : f > 0.62 ? hex('#ff7a2a') : f > 0.45 ? hex('#c8302a') : f > 0.3 ? hex('#6a1a2a') : hex('#2a0e1e')); }
  const cx = x0 + w / 2, cy = y0 + hh * 0.48, s = Math.min(w, hh) / 60, bate = Math.sin(t * 2) * 0.12;
  const P = (pts) => pts.map(([u, v]) => [Math.round(cx + u * s), Math.round(cy + v * s)]);
  for (const lado of [-1, 1]) { R.poligono(P([[0, -2], [lado * 26, -16 - bate * 30], [lado * 22, -6], [lado * 27, -4 - bate * 20], [lado * 18, 2], [lado * 22, 6], [lado * 8, 6]]), K.oroS);
    R.poligono(P([[0, -1], [lado * 22, -13 - bate * 26], [lado * 18, -5], [lado * 12, 2], [lado * 6, 4]]), K.oro);
    for (let k = 1; k < 5; k++) R.linea(Math.round(cx + lado * k * 4 * s), Math.round(cy - k * 1.5 * s), Math.round(cx + lado * (k * 4 + 4) * s), Math.round(cy + (6 - k) * s), K.oroD); }
  R.poligono(P([[-4, -4], [4, -4], [5, 8], [0, 18], [-5, 8]]), K.oro); R.poligono(P([[-2, 16], [2, 16], [6, 24], [-6, 24]]), K.oroS);
  R.disco(Math.round(cx), Math.round(cy - 8 * s), Math.max(2, Math.round(4 * s)), K.oro); R.disco(Math.round(cx - s), Math.round(cy - 9 * s), Math.max(1, Math.round(2 * s)), K.oroL);
  R.poligono(P([[3, -9], [8, -8], [3, -7]]), K.oroD); pset(Math.round(cx + 1.5 * s), Math.round(cy - 9 * s), K.k);
  for (let i = 0; i < 10; i++) { const u = (t * 0.6 + h(i, 1, 106)) % 1, x = Math.round(x0 + h(i, 2, 106) * w + Math.sin(t * 3 + i) * 2), y = Math.round(y1 - u * hh); pset(x, y, u < 0.5 ? hex('#fff0a0') : hex('#ff9a3a')); }
}

// cuadro 3: el palacio de noche: el cielo con estrellas y la luna, el palacio blanco con columnas y sus ventanas que se
// apagan una a una (vuelven a encenderse cada 12 s)
function k_cuadroPalacio(R, t, [x0, y0, x1, y1]) {
  const { pset, rect } = R, w = x1 - x0, hh = y1 - y0;
  k_grad(R, x0, y0, x1, y1, [hex('#0e1030'), hex('#1e2050'), hex('#3a3068')]);
  for (let i = 0; i < 30; i++) { const x = Math.round(x0 + h(i, 1, 107) * w), y = Math.round(y0 + h(i, 2, 107) * hh * 0.45); if (Math.sin(t * 2 + i) > -0.3) pset(x, y, i % 4 ? hex('#8a8ac8') : K.blanco); }
  R.disco(Math.round(x0 + w * 0.8), Math.round(y0 + hh * 0.16), Math.max(2, Math.round(w * 0.06)), hex('#f0ead8')); R.disco(Math.round(x0 + w * 0.82), Math.round(y0 + hh * 0.14), Math.max(2, Math.round(w * 0.05)), hex('#1e2050'));
  const bx0 = Math.round(x0 + w * 0.12), bx1 = Math.round(x1 - w * 0.12), by0 = Math.round(y0 + hh * 0.42), by1 = Math.round(y1 - hh * 0.12), mx = Math.round((bx0 + bx1) / 2);
  for (let j = 0; j < Math.round(hh * 0.14); j++) rect(mx - Math.round(j * 1.6), by0 - Math.round(hh * 0.14) + j, mx + Math.round(j * 1.6), by0 - Math.round(hh * 0.14) + j, j === 0 ? K.marmolL : hex('#c8c8dc'));
  rect(bx0, by0, bx1, by1, hex('#b8b8d0')); rect(bx0, by0, bx1, by0 + 1, hex('#dcdcf0')); rect(bx0 - 2, by1, bx1 + 2, y1, hex('#3a3a5a'));
  const apag = (t % 12) / 12; let k = 0;
  for (let y = by0 + 4; y < by1 - 4; y += 7) for (let x = bx0 + 3; x < bx1 - 3; x += 6) { const on = h(k, 1, 108) > apag; rect(x, y, x + 2, y + 3, on ? hex('#ffd870') : hex('#2a2a48')); if (on) pset(x, y, hex('#fff4c0')); k++; }
  for (let x = bx0 + 1; x < bx1; x += 6) rect(x, by0 + 2, x, by1, hex('#8a8aa8'));
  for (let y = by1 + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) if (R.pget(x, y) === hex('#3a3a5a') && (x + y) % 5 === 0) pset(x, y, hex('#ffd870'));
}

const k_CUADROS = [k_cuadroArena, k_cuadroSinsajo, k_cuadroPalacio];

// el poste de un cordón de museo (latón) en (x, suelo)
function k_poste(R, x, suelo) { R.rect(x - 1, suelo - 14, x + 1, suelo - 1, K.oroS); R.rect(x - 1, suelo - 14, x - 1, suelo - 1, K.oroL); R.disco(x, suelo - 15, 2, K.oro); R.pset(x - 1, suelo - 16, K.oroL); R.rect(x - 4, suelo - 1, x + 4, suelo, K.oroS); R.rect(x - 4, suelo - 1, x + 4, suelo - 1, K.oro); }

// el cordón de terciopelo que cuelga entre dos postes
function k_cordon(R, xa, xb, y) { for (let x = xa + 2; x <= xb - 2; x++) { const u = (x - xa) / (xb - xa), yy = Math.round(y + Math.sin(u * Math.PI) * 5); R.pset(x, yy, K.terciopelo); R.pset(x, yy + 1, K.terciopeloS); if (x % 4 === 0) R.pset(x, yy, K.terciopeloL); } }

// el aplique de latón que ilumina un cuadro, en (x, y), y su cono de luz hasta yb
function k_aplique(R, x, y, ancho, yb) {
  R.rect(x - 1, y - 6, x + 1, y, K.oroS); R.rect(x - ancho, y, x + ancho, y + 2, K.k); R.rect(x - ancho + 1, y, x + ancho - 1, y + 1, K.oro); R.rect(x - ancho + 1, y + 2, x + ancho - 1, y + 2, hex('#fff8d8'));
  k_haz(R, x, y + 3, x, yb, ancho * 1.6, hex('#fff4d0'), 0.16);
}

// el dron-cámara del Capitolio (el ojo que vigila): una bola blanca con hélices y un ojo rojo que parpadea, en (x, y)
function k_dron(R, x, y, t) {
  const { rect, pset, disco } = R; x = Math.round(x); y = Math.round(y);
  for (const s of [-1, 1]) { R.linea(x + s * 2, y - 3, x + s * 6, y - 5, K.marmolD); const g = Math.floor(t * 20) % 2; rect(x + s * 6 - (g ? 3 : 1), y - 6, x + s * 6 + (g ? 3 : 1), y - 6, hex('#9aa4b4')); }
  disco(x, y, 4, K.k); disco(x, y, 3, K.marmol); disco(x - 1, y - 1, 1, K.blanco); disco(x + 1, y + 1, 2, K.k); pset(x + 1, y + 1, Math.floor(t * 2) % 2 ? K.rojo : K.rojoS);
}

// Museo ('general'): una galería del Capitolio: paredes de mármol rosado con pilastras de capitel dorado, el techo de
// casetones claro, tres cuadros en marcos dorados (o.cuadros: tres funciones (R, t, [x0,y0,x1,y1]) que pintan dentro; por
// omisión la arena con el reloj, el pájaro en llamas y el palacio con las ventanas que se apagan) en [18,50,90,110],
// [124,44,196,112] y [230,50,302,110], con sus apliques de luz; el zócalo, el suelo de damero brillante con los reflejos
// de los cuadros, cordones de terciopelo en postes de latón, dos bancos tapizados y el dron-cámara que patrulla. Personajes
// en y 162 (x 40–280).
function k_museo(R, t, o, cam) {
  if (cam === 'cuadro') return k_museoCuadro(R, t, o);
  const { rect, pset } = R, Q = [[18, 50, 90, 110], [124, 44, 196, 112], [230, 50, 302, 110]];
  const capa = k_capa(R, 'museo', () => {
    // el techo de casetones
    for (let y = 0; y < 24; y++) for (let x = 0; x < 320; x++) { const bx = x % 40, by = y % 12; pset(x, y, bx < 2 || by < 2 ? hex('#e8dcd0') : bx < 4 || by < 4 ? hex('#d8ccc0') : hex('#f2eae0')); }
    rect(0, 22, 319, 26, K.oroS); rect(0, 22, 319, 22, K.oro); for (let x = 0; x < 320; x += 4) pset(x, 24, K.oroL); rect(0, 26, 319, 27, K.marmolRS);
    // la pared de mármol rosado con vetas
    for (let y = 28; y < 128; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.07 + y * 0.23 + Math.sin(y * 0.11 + x * 0.04) * 2.4) + h(x, y, 109) * 0.5; pset(x, y, v > 1.35 ? K.marmolRV : v > 1.15 ? K.marmolRS : h(x >> 2, y >> 2, 110) < 0.5 ? K.marmolR : hex('#f2d2e2')); }
    for (const x of [8, 107, 213, 312]) { rect(x - 5, 28, x + 5, 128, K.marmol); rect(x - 5, 28, x - 4, 128, K.marmolL); rect(x + 3, 28, x + 5, 128, K.marmolS); for (let y = 34; y < 124; y += 4) pset(x, y, K.marmolS); rect(x - 7, 28, x + 7, 32, K.oro); rect(x - 7, 32, x + 7, 32, K.oroS); pset(x - 6, 29, K.oroL); }
    // el zócalo
    rect(0, 120, 319, 133, hex('#8a3a5a')); rect(0, 120, 319, 121, K.oro); rect(0, 133, 319, 133, K.k); for (let x = 0; x < 320; x += 20) rect(x + 3, 124, x + 16, 130, hex('#a84a70'));
    // el suelo de damero brillante
    for (let y = 134; y < 180; y++) { const p = (y - 134) / 46, al = 4 + p * 8; for (let x = 0; x < 320; x++) { const xr = (x - 160) / (0.7 + p * 0.6) + 160, i = Math.floor(xr / 20), j = Math.floor(Math.log(1 + (y - 134) / 6) * 3); pset(x, y, (i + j) % 2 ? hex('#2a2030') : K.marmol); } }
    for (const q of Q) { k_marco(R, q[0], q[1], q[2], q[3], q === Q[1] ? 6 : 5); }
    // los cordones y los bancos
    for (const [a, b] of [[22, 86], [128, 192], [234, 298]]) { k_poste(R, a, 146); k_poste(R, b, 146); k_cordon(R, a, b, 132); }
  });
  k_poner(R, capa);
  const F = o.cuadros ?? k_CUADROS;
  Q.forEach((q, i) => { R.recorte(q); (F[i] ?? k_CUADROS[i])(R, t, q); R.recorte(null); });
  // los reflejos de los cuadros en el suelo, temblando un poco
  for (let y = 136; y < 160; y++) for (let x = 0; x < 320; x++) { if (((x + y) & 1) || R.pget(x, y) !== K.marmol) continue; const qi = Q.findIndex((q) => x >= q[0] && x <= q[2]); if (qi < 0) continue; const src = R.pget(x, Q[qi][3] - (y - 136) * 2); if (src) pset(x, y, k_mezcla(K.marmol, src, 0.35)); }
  for (const q of Q) k_aplique(R, Math.round((q[0] + q[2]) / 2), q[1] - 10, 8, q[3]);
  // los bancos tapizados, a los lados
  for (const x of [52, 268]) { rect(x - 18, 160, x + 18, 166, K.k); rect(x - 17, 161, x + 17, 164, K.terciopelo); rect(x - 17, 161, x + 17, 161, K.terciopeloL); for (let i = -14; i <= 14; i += 7) pset(x + i, 163, K.terciopeloS); rect(x - 16, 166, x - 14, 174, K.oroS); rect(x + 14, 166, x + 16, 174, K.oroS); rect(x - 17, 166, x + 17, 167, K.maderaS); }
  // el dron que patrulla
  k_dron(R, 160 + Math.sin(t * 0.4) * 105, 36 + Math.sin(t * 1.3) * 3, t);
  for (let i = 0; i < 12; i++) { const qi = i % 3, q = Q[qi], x = Math.round(q[0] + 6 + h(i, 1, 111) * (q[2] - q[0] - 12)), y = Math.round(q[1] + ((h(i, 2, 111) * 60 + t * 3) % 60)); if (Math.sin(t * 2 + i) > 0.3) k_tono(R, x, y, 0.4); }
  return { suelo: 162, cuadros: Q, bancos: [52, 268], cordones: 132, libre: [80, 240] };
}

// Museo, cámara 'cuadro': un cuadro de cerca (o.cual 0, 1 o 2, por omisión 1; o.cuadros como en 'general') en
// [50, 22, 262, 140] con su marco grueso, el aplique encima, la pared de mármol rosado con dos pilastras, el zócalo y el
// suelo; delante (capitolioDelante) dos postes de latón con el cordón. El personaje que mira, a la izquierda: x 26, y 172.
function k_museoCuadro(R, t, o) {
  const { rect, pset } = R, q = [50, 24, 262, 140];
  const capa = k_capa(R, 'museoC', () => {
    for (let y = 0; y < 154; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + y * 0.17 + Math.sin(y * 0.08 + x * 0.03) * 2.4) + h(x, y, 112) * 0.5; pset(x, y, v > 1.38 ? K.marmolRV : v > 1.18 ? K.marmolRS : h(x >> 2, y >> 2, 113) < 0.5 ? K.marmolR : hex('#f2d2e2')); }
    for (const x of [14, 300]) { rect(x - 8, 0, x + 8, 154, K.marmol); rect(x - 8, 0, x - 6, 154, K.marmolL); rect(x + 5, 0, x + 8, 154, K.marmolS); for (let y = 4; y < 150; y += 5) { pset(x - 2, y, K.marmolS); pset(x + 2, y, K.marmolS); } }
    rect(0, 146, 319, 157, hex('#8a3a5a')); rect(0, 146, 319, 147, K.oro); rect(0, 157, 319, 157, K.k);
    for (let y = 158; y < 180; y++) for (let x = 0; x < 320; x++) { const p = (y - 158) / 22, xr = (x - 160) / (0.8 + p * 0.5) + 160; pset(x, y, (Math.floor(xr / 28) + Math.floor((y - 158) / (5 + p * 4))) % 2 ? hex('#2a2030') : K.marmol); }
    k_marco(R, q[0], q[1], q[2], q[3], 8);
  });
  k_poner(R, capa);
  const i = o.cual ?? 1, F = o.cuadros ?? k_CUADROS;
  R.recorte(q); (F[i] ?? k_CUADROS[i])(R, t, q); R.recorte(null);
  // la pátina: un barniz tramado muy suave y el brillo del aplique
  for (let y = q[1]; y <= q[1] + 30; y++) for (let x = q[0]; x <= q[2]; x++) if (((x + y) & 3) === 0) k_tono(R, x, y, 0.12 * (1 - (y - q[1]) / 30));
  k_aplique(R, 156, 10, 14, 120);
  for (let y = 159; y < 172; y++) for (let x = q[0]; x <= q[2]; x += 2) if (R.pget(x, y) === K.marmol) { const s = R.pget(x, q[3] - (y - 158) * 3); if (s) pset(x, y, k_mezcla(K.marmol, s, 0.3)); }
  k_dron(R, 286 + Math.sin(t * 0.8) * 6, 70 + Math.sin(t * 1.5) * 4, t);
  return { suelo: 172, mirador: 26, cuadro: q, cordon: [70, 242] };
}

// los postes y el cordón delante del cuadro de cerca (por delante de los personajes)
function k_museoCuadroDelante(R, t, o) { k_poste(R, 70, 176); k_poste(R, 242, 176); k_cordon(R, 70, 242, 162); }

// ruido suave (interpolación bilineal de h en la rejilla entera)
function k_ruido(x, y, k) { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; }

// el Capitolio y los doce distritos en coordenadas del mapa (u, v de 0 a 1), con lo que produce cada uno
const k_CAPITOL = [0.27, 0.44];

const k_DISTRITOS = [[0.36, 0.3, 'joya'], [0.2, 0.62, 'piedra'], [0.12, 0.36, 'chip'], [0.08, 0.6, 'pez'], [0.44, 0.58, 'rayo'], [0.5, 0.4, 'rueda'],
  [0.16, 0.2, 'arbol'], [0.62, 0.62, 'tela'], [0.56, 0.24, 'trigo'], [0.42, 0.76, 'vaca'], [0.66, 0.8, 'manzana'], [0.8, 0.44, 'carbon']];

// los pictogramas de 5 × 5 de lo que produce cada distrito
const k_PICTO = { joya: ['.###.', '#.#.#', '#####', '.#.#.', '..#..'], piedra: ['.###.', '#####', '##.##', '#####', '.###.'], chip: ['#.#.#', '.###.', '#####', '.###.', '#.#.#'],
  pez: ['.....', '.##.#', '#####', '.##.#', '.....'], rayo: ['..##.', '.##..', '####.', '..##.', '.##..'], rueda: ['.###.', '#.#.#', '##.##', '#.#.#', '.###.'], arbol: ['..#..', '.###.', '#####', '.###.', '..#..'],
  tela: ['#####', '#.#.#', '#####', '#.#.#', '#####'], trigo: ['#.#.#', '#.#.#', '.###.', '..#..', '..#..'], vaca: ['#...#', '#####', '#.#.#', '.###.', '.#.#.'], manzana: ['..#..', '.###.', '#####', '#####', '.###.'], carbon: ['.##..', '####.', '#####', '.####', '..##.'] };

const k_PICTOC = { joya: K.turqL, piedra: hex('#b8b8c8'), chip: K.lima, pez: hex('#6ab8ff'), rayo: K.amarillo, rueda: hex('#c8c8d8'), arbol: hex('#4ab84a'), tela: K.rosaL, trigo: hex('#f0c850'), vaca: hex('#f0e0d0'), manzana: K.rojo, carbon: hex('#16161c') };

// el color del mapa de Panem en (u, v): el mar con su trama, la costa, las llanuras con parcelas, las Rocosas con sus crestas
// y nieve, los montes del este, los lagos y los ríos (inventado y estilizado, no un mapa de verdad)
function k_mapaColor(u, v) {
  const tierra = (a, b) => { const m = ((a - 0.47) / 0.44) ** 2 + ((b - 0.5) / 0.42) ** 2 + (k_ruido(a * 7, b * 7, 120) - 0.5) * 0.55 + (k_ruido(a * 18, b * 18, 121) - 0.5) * 0.18; const golfo = ((a - 0.56) / 0.12) ** 2 + ((b - 0.98) / 0.12) ** 2 < 1; return m < 1 && !golfo; };
  if (!tierra(u, v)) { const cerca = tierra(u + 0.012, v) || tierra(u - 0.012, v) || tierra(u, v + 0.015) || tierra(u, v - 0.015); if (cerca) return hex('#5a9ac8'); const n = k_ruido(u * 40, v * 30, 122); return n > 0.72 ? hex('#3a72b0') : n < 0.25 ? hex('#22508a') : hex('#2c5e9c'); }
  if (!tierra(u + 0.006, v) || !tierra(u - 0.006, v) || !tierra(u, v + 0.008) || !tierra(u, v - 0.008)) return hex('#e8dcb0');
  const lago = k_ruido(u * 12, v * 12, 123) > 0.8 && u > 0.5 && u < 0.72 && v < 0.4; if (lago) return hex('#4a8ac0');
  const rio = Math.abs(u - (0.52 + Math.sin(v * 9) * 0.03)) < 0.004 && v > 0.3; if (rio) return hex('#5a9ad0');
  const roc = Math.abs(u - (0.27 + Math.sin(v * 6) * 0.04)) < 0.075 + k_ruido(u * 10, v * 10, 124) * 0.04, apal = Math.abs(u - (0.77 + Math.sin(v * 5) * 0.02)) < 0.035 && v > 0.25 && v < 0.7;
  if (roc) { const c = k_ruido(u * 60, v * 26, 125); const cr = Math.abs(u - (0.27 + Math.sin(v * 6) * 0.04)) < 0.012; return cr && k_ruido(u * 30, v * 60, 131) > 0.45 ? hex('#f4f4fa') : cr ? hex('#d8d0c8') : c > 0.62 ? hex('#b8aa98') : c > 0.38 ? hex('#9a8a74') : hex('#7a6a58'); }
  if (apal) { const c = k_ruido(u * 50, v * 40, 126); return c > 0.6 ? hex('#5a8a4a') : hex('#3e6a3a'); }
  const p = k_ruido(u * 30, v * 30, 127), parc = (Math.floor(u * 90) + Math.floor(v * 70)) % 3; return p > 0.65 ? hex('#a8b870') : parc === 0 ? hex('#c8c08a') : parc === 1 ? hex('#bcc488') : hex('#d4c898');
}

// pinta el mapa en el trapecio de la mesa (yF arriba con xF0..xF1, yN abajo con xN0..xN1) o en un rectángulo (los dos
// anchos iguales); [u0, u1, v0, v1] es el trozo de mapa que se ve. Devuelve la proyección P(u, v) → [x, y]
function k_proyeccion(yF, xF0, xF1, yN, xN0, xN1, ven) {
  const [u0, u1, v0, v1] = ven;
  const P = (u, v) => { const vv = (v - v0) / (v1 - v0), y = yF + (yN - yF) * vv, a = xF0 + (xN0 - xF0) * vv, b = xF1 + (xN1 - xF1) * vv; return [a + (b - a) * (u - u0) / (u1 - u0), y]; };
  const pintar = (R) => { for (let y = yF; y <= yN; y++) { const vv = (y - yF) / (yN - yF), a = xF0 + (xN0 - xF0) * vv, b = xF1 + (xN1 - xF1) * vv;
    for (let x = Math.ceil(a); x <= b; x++) R.pset(x, y, k_mapaColor(u0 + (u1 - u0) * (x - a) / (b - a), v0 + (v1 - v0) * vv)); } };
  return { P, pintar };
}

// las vías del tren de cada distrito al Capitolio (punteado dorado), los trenes que suben cargados (o.trenes 0–1: cuántos
// distritos tienen tren en marcha) y los distritos grises con su pictograma; s 1 (general) o 2 (de cerca)
function k_viasYTrenes(R, t, P, trenes, s, fijo) {
  const C0 = P(...k_CAPITOL);
  if (fijo) k_DISTRITOS.forEach(([u, v]) => { const [x, y] = P(u, v); R.linea(x, y, C0[0], C0[1], (xx, yy, k) => (k % 4 < 2 ? K.oroM : K.oroD)); });
  const n = Math.round(trenes * (s > 1 ? 3 : 12));
  if (!fijo) for (let d = 0; d < n; d++) { const [u, v, tipo] = k_DISTRITOS[s > 1 ? 11 : (11 - d + 12) % 12], [x, y] = P(u, v), f = s > 1 ? ((t * 0.07 + d / 3) % 1) * 0.42 : (t * 0.12 + d * 0.31) % 1, dx = C0[0] - x, dy = C0[1] - y, L = Math.hypot(dx, dy) || 1;
    for (let c = 0; c < 3; c++) { const ff = f - c * 4 * s / L; if (ff < 0) continue; const cx = Math.round(x + dx * ff), cy = Math.round(y + dy * ff);
      R.rect(cx - s, cy - s, cx + s, cy + (s > 1 ? s - 1 : 0), K.k); if (s > 1) { R.rect(cx - s + 1, cy - s + 1, cx + s - 1, cy, c === 0 ? K.rojo : hex('#4a4a5a')); if (c > 0) R.rect(cx - 1, cy - s, cx + 1, cy - s, k_PICTOC[tipo]); } else R.pset(cx, cy - 1, c === 0 ? K.rojo : k_PICTOC[tipo]); }
    if (s > 1 && Math.floor(t * 4 + d) % 2) R.pset(Math.round(x + dx * f) + 2, Math.round(y + dy * f) - s - 2, K.blanco); }
  if (fijo) k_DISTRITOS.forEach(([u, v, tipo], i) => { const [x0, y0] = P(u, v), x = Math.round(x0), y = Math.round(y0), m = 3 * s + 1;
    R.rect(x - m, y - m, x + m, y + m, K.k); R.rect(x - m + 1, y - m + 1, x + m - 1, y + m - 1, hex('#9a9aac')); R.rect(x - m + 1, y - m + 1, x + m - 1, y - m + 1, hex('#c8c8d8')); R.rect(x + m - 1, y - m + 2, x + m - 1, y + m - 1, hex('#6a6a7a'));
    k_PICTO[tipo].forEach((f, j) => { for (let k = 0; k < 5; k++) if (f[k] === '#') R.rect(x - 2 * s + k * s, y - 2 * s + j * s, x - 2 * s + k * s + s - 1, y - 2 * s + j * s + s - 1, k_PICTOC[tipo]); }); });
}

// el Capitolio en el mapa: torres de colores en las montañas con un brillo que late
function k_capitolMapa(R, t, P, s) {
  const [cx, cy] = P(...k_CAPITOL).map(Math.round), pul = 0.5 + 0.5 * Math.sin(t * 3);
  for (let j = -6 * s; j <= 6 * s; j++) for (let i = -9 * s; i <= 9 * s; i++) if ((i / (9 * s)) ** 2 + (j / (6 * s)) ** 2 < 1 && ((i + j) & 1) === 0) k_tono(R, cx + i, cy + j, 0.25 + pul * 0.2);
  [[-4, 5, K.rosa], [-2, 8, K.turq], [0, 11, K.morado], [2, 7, K.oro], [4, 5, K.rosaL]].forEach(([dx, al, c]) => { const x = cx + dx * s; R.rect(x - Math.ceil(s / 2), cy - al * s, x + Math.floor(s / 2), cy + s, K.k); R.rect(x - Math.ceil(s / 2) + (s > 1 ? 1 : 0), cy - al * s + 1, x + Math.floor(s / 2), cy + s - 1, c); R.pset(x, cy - al * s, K.oroL); });
  if (Math.sin(t * 3) > 0.5) { R.pset(cx, cy - 13 * s, K.blanco); R.pset(cx - 1, cy - 12 * s, K.oroL); R.pset(cx + 1, cy - 12 * s, K.oroL); }
}

// Mapa ('general'): la sala del mapa: pared oscura de mármol azul con molduras doradas, tres pantallas con gráficas que
// cambian, columnas y lámparas; en el centro la mesa de cristal vista de frente (tablero en trapecio de y 60 a y 138) con el
// mapa de Panem: el mar, las Rocosas nevadas con el Capitolio de colores que brilla, los doce distritos grises con sus
// pictogramas (carbón, trigo, peces, árboles…) y las vías doradas; los trenes que suben a la capital (o.trenes 0–1). El
// canto de cristal que brilla, el pie y el suelo brillante. Personajes a los lados de la mesa: x 22 y x 298, y 170.
function k_mapa(R, t, o, cam) {
  if (cam === 'doce') return k_mapaDoce(R, t, o);
  const { rect, pset } = R, pr = k_proyeccion(62, 84, 236, 136, 42, 278, [0, 1, 0.04, 1]);
  const capa = k_capa(R, 'mapa', () => {
    for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.06 + y * 0.2 + Math.sin(y * 0.1) * 2) + h(x, y, 128) * 0.4; pset(x, y, v > 1.2 ? hex('#2a3a6a') : (x + y) % 3 ? hex('#18203e') : hex('#1c2648')); }
    rect(0, 0, 319, 8, hex('#141a34')); rect(0, 8, 319, 9, K.oroS); rect(0, 8, 319, 8, K.oro);
    // la zona de Atom (arriba a la derecha) queda como pared lisa en penumbra, sin vetas: la columna de la derecha arranca
    // más abajo, de una ménsula dorada con su lámpara
    for (let y = 10; y < 48; y++) for (let x = 274; x < 320; x++) pset(x, y, k_b4(x, y) < (y - 10) / 60 ? hex('#18203e') : hex('#151c38'));
    for (const x of [14, 116, 204, 306]) { const y0 = x > 300 ? 50 : 10; rect(x - 6, y0, x + 6, 150, hex('#232e58')); rect(x - 6, y0, x - 5, 150, hex('#3a4a80')); rect(x + 5, y0, x + 6, 150, hex('#121834')); rect(x - 7, y0, x + 7, y0 + 3, K.oroS); }
    rect(299, 47, 313, 49, K.oro); rect(299, 47, 313, 47, K.oroL); rect(302, 50, 310, 51, K.oroS);
    for (const [a, b] of [[30, 98], [134, 186], [214, 272]]) { rect(a - 2, 18, b + 2, 52, K.oroS); rect(a - 1, 19, b + 1, 51, K.k); }
    rect(0, 126, 319, 150, hex('#121834')); rect(0, 126, 319, 126, K.oroS);
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x * 3 + y) % 7 === 0 ? hex('#1a2244') : y % 6 === 0 ? hex('#141a36') : hex('#10152c'));
    // la mesa: el canto de cristal, el tablero, el pie
    R.poligono([[82, 59], [238, 59], [281, 138], [39, 138]], hex('#8ad8f0'));
    pr.pintar(R);
    rect(39, 139, 281, 143, hex('#5ab0d0')); rect(39, 139, 281, 139, hex('#c8f4ff')); rect(39, 143, 281, 143, hex('#2a6a8a'));
    for (const x of [90, 230]) { rect(x - 4, 144, x + 4, 166, K.k); rect(x - 3, 144, x + 3, 165, hex('#9aa4b4')); rect(x - 3, 144, x - 2, 165, hex('#d8e0ea')); rect(x - 10, 165, x + 10, 168, K.oroS); rect(x - 10, 165, x + 10, 165, K.oro); }
    rect(96, 150, 224, 156, hex('#2a6a8a')); rect(96, 150, 224, 150, hex('#5ab0d0'));
    k_viasYTrenes(R, 0, pr.P, 0, 1, true);
  });
  k_poner(R, capa);
  // las pantallas de la pared: barras que suben y una línea que avanza
  [[30, 98], [134, 186], [214, 272]].forEach(([a, b], k) => { const yb = 50;
    if (k === 1) { for (let x = a; x <= b; x++) { const y = Math.round(36 + Math.sin(x * 0.2 + t * 2) * 8 + Math.sin(x * 0.07) * 4); pset(x, y, K.turqL); pset(x, y + 1, K.turqS); } pset(a + Math.round(((t * 20) % (b - a))), 21, K.rosa); }
    else for (let i = 0; a + 3 + i * 7 < b - 2; i++) { const al = Math.round(8 + 20 * (0.5 + 0.5 * Math.sin(t * 1.3 + i * 0.9 + k))); rect(a + 3 + i * 7, yb - al, a + 7 + i * 7, yb - 1, [K.rosa, K.oro, K.turq, K.morado][(i + k) % 4]); rect(a + 3 + i * 7, yb - al, a + 7 + i * 7, yb - al, K.blanco); } });
  // el agua que brilla, el Capitolio, los trenes
  for (let i = 0; i < 16; i++) { const [x, y] = pr.P(h(i, 1, 129) * 0.16 + (i % 2 ? 0.86 : 0), 0.1 + h(i, 2, 129) * 0.85); if (Math.sin(t * 3 + i * 1.3) > 0.5) pset(Math.round(x), Math.round(y), hex('#a8d8ff')); }
  k_capitolMapa(R, t, pr.P, 1);
  k_viasYTrenes(R, t, pr.P, o.trenes ?? 0.5, 1, false);
  // el brillo que recorre el canto de cristal
  { const g = 39 + Math.round((t * 60) % 300); for (let x = g; x < g + 12; x++) if (x <= 281) pset(x, 139, K.blanco); }
  const P = (u, v) => pr.P(u, v).map(Math.round);
  return { suelo: 170, lados: [22, 298], mesa: [39, 59, 281, 143], capitol: P(...k_CAPITOL), distritos: k_DISTRITOS.map(([u, v]) => P(u, v)), P };
}
// Mapa, cámara 'doce': el rincón del Distrito 12 de cerca, visto desde arriba (la mesa en x 0–262, y 0–150): los montes
// verdes del este, el distrito con su pictograma de carbón grande, la mina y las casitas, la vía dorada que sale hacia el
// Capitolio (fuera de cuadro, a la izquierda) con trenes de carbón (o.trenes), el mar a la derecha; el canto de cristal y,
// a la derecha, la pared oscura y el suelo. El personaje, de pie a la derecha de la mesa: x 290, y 172.
function k_mapaDoce(R, t, o) {
  const { rect, pset } = R, pr = k_proyeccion(0, 0, 262, 150, 0, 262, [0.6, 0.98, 0.18, 0.72]);
  const capa = k_capa(R, 'mapaDoce', () => {
    pr.pintar(R);
    // los árboles de los montes y las granjas de las llanuras
    { const H1 = hex('#3e6a3a'), H2 = hex('#5a8a4a'), LL = [hex('#c8c08a'), hex('#bcc488'), hex('#d4c898'), hex('#a8b870')]; for (let y = 2; y < 148; y += 2) for (let x = 2; x < 260; x += 2) { const c = R.pget(x, y), n = h(x, y, 132);
      if ((c === H1 || c === H2) && n < 0.22) { pset(x, y, hex('#1e4a26')); pset(x, y - 1, hex('#6aac4c')); pset(x + 1, y, hex('#2e5a2e')); }
      else if (LL.includes(c) && n < 0.012) { R.rect(x, y, x + 2, y + 1, hex('#8a5a3a')); pset(x + 1, y - 1, hex('#c84a3a')); } } }
    // la mina y las casitas del 12
    const [dx, dy] = pr.P(0.8, 0.44).map(Math.round);
    for (let i = 0; i < 9; i++) { const x = dx - 34 + (i % 5) * 9, y = dy + 18 + Math.floor(i / 5) * 9; rect(x, y, x + 5, y + 4, hex('#5a4a3a')); R.poligono([[x - 1, y], [x + 6, y], [x + 2, y - 3]], hex('#3a3a42')); pset(x + 2, y + 2, K.amarillo); }
    rect(dx + 14, dy + 16, dx + 26, dy + 26, K.k); rect(dx + 15, dy + 17, dx + 25, dy + 25, hex('#4a4a52')); R.linea(dx + 20, dy + 10, dx + 20, dy + 16, K.k); R.linea(dx + 15, dy + 10, dx + 25, dy + 10, K.k);
    k_viasYTrenes(R, 0, pr.P, 0, 3, true);
    // el canto de cristal de la mesa y la sala de la derecha
    rect(263, 0, 266, 154, hex('#5ab0d0')); rect(263, 0, 263, 154, hex('#c8f4ff')); rect(0, 151, 266, 154, hex('#5ab0d0')); rect(0, 151, 266, 151, hex('#c8f4ff')); rect(0, 154, 266, 155, hex('#2a6a8a'));
    for (let y = 0; y < 180; y++) for (let x = 267; x < 320; x++) { const v = Math.sin(x * 0.06 + y * 0.2 + Math.sin(y * 0.1) * 2) + h(x, y, 128) * 0.4;
      pset(x, y, y > 156 ? ((x * 3 + y) % 7 === 0 ? hex('#1a2244') : hex('#10152c')) : y < 48 && x > 272 ? (k_b4(x, y) < y / 60 ? hex('#18203e') : hex('#151c38')) : v > 1.2 ? hex('#2a3a6a') : (x + y) % 3 ? hex('#18203e') : hex('#1c2648')); }
    // una moldura dorada bajo la zona de Atom y un aplique con su luz
    rect(267, 48, 319, 49, K.oroS); rect(267, 48, 319, 48, K.oro);
    rect(283, 66, 287, 76, K.oroS); pset(283, 67, K.oroL); rect(281, 60, 289, 65, K.k); rect(282, 61, 288, 64, hex('#ffd8a0')); rect(282, 61, 283, 64, hex('#fff2d0')); rect(281, 65, 289, 65, K.oro);
    for (let y = 156; y < 180; y++) for (let x = 0; x < 267; x++) pset(x, y, y < 162 ? hex('#2a6a8a') : (x * 3 + y) % 7 === 0 ? hex('#1a2244') : hex('#10152c'));
    rect(267, 154, 319, 156, K.oroS); rect(302, 60, 312, 150, hex('#232e58')); rect(302, 60, 303, 150, hex('#3a4a80')); rect(300, 58, 314, 60, K.oroS);
  });
  k_poner(R, capa);
  // la luz del aplique de la pared, que tiembla
  k_luzCalida(R, 285, 68, 14, 18, 0.5 + 0.05 * Math.sin(t * 9));
  // el humo de la mina, el agua del mar y los trenes de carbón
  const [dx, dy] = pr.P(0.8, 0.44).map(Math.round);
  for (let i = 0; i < 6; i++) { const u = (t * 0.4 + i / 6) % 1; R.disco(dx + 20 + Math.round(u * 8 + Math.sin(t + i) * 2), dy + 8 - Math.round(u * 18), 1 + Math.round(u * 2), k_mezcla(hex('#6a6a72'), hex('#bcc488'), u)); }
  for (let i = 0; i < 20; i++) { const [x, y] = pr.P(0.9 + h(i, 1, 130) * 0.08, 0.2 + h(i, 2, 130) * 0.5); if (R.pget(Math.round(x), Math.round(y)) !== hex('#e8dcb0') && Math.sin(t * 2.5 + i * 1.7) > 0.4) { pset(Math.round(x), Math.round(y), hex('#a8d8ff')); pset(Math.round(x) + 1, Math.round(y), hex('#5a9ac8')); } }
  k_viasYTrenes(R, t, pr.P, o.trenes ?? 1, 3, false);
  // los reflejos del cristal de la mesa
  for (let y = 0; y < 150; y++) { const xa = Math.round(180 + (150 - y) * 0.5 + Math.sin(t * 0.3) * 6); for (let x = xa; x < xa + 6; x++) if (x < 262 && ((x + y) & 1) === 0) k_tono(R, x, y, 0.15); }
  return { suelo: 172, lado: 290, mesa: [0, 0, 262, 154], distrito12: [dx, dy], P: (u, v) => pr.P(u, v).map(Math.round) };
}
// los encuadres del Capitolio y lo que va delante en cada uno
const k_ENC = { avenida: k_avenida, plato: k_plato, despacho: k_despacho, invernadero: k_invernadero, museo: k_museo, mapa: k_mapa };

const k_DEL = { 'avenida/balcon': k_balconDelante, 'despacho/general': k_despachoMesaGrande, 'despacho/mesa': k_mesaCerca, 'invernadero/rosas': k_invRosasDelante, 'museo/cuadro': k_museoCuadroDelante };

// los colores de la arena vista desde fuera: la penumbra azul de la sala, el metal, el cian del holograma, los pilotos
// y los de la maqueta (el prado, el bosque, la roca, el agua, la arena, la selva y el oro de la cornucopia)
const v_C = pal({
  k: '#05060f', blanco: '#f4f8ff',
  muro0: '#070a1a', muro1: '#0c1230', muro2: '#141c44', muro3: '#1e2a5e', muro4: '#2e3e80',
  metal0: '#141a34', metal1: '#222c52', metal2: '#34427a', metal3: '#5266a4', metal4: '#8a9cd8',
  suelo0: '#05081a', suelo1: '#0a1028', suelo2: '#121a3c',
  holo0: '#0c3a64', holo1: '#1876b4', holo2: '#36c8f4', holo3: '#8aeeff', holo4: '#e0fcff',
  pant0: '#061428', pant1: '#0a2442',
  rojo: '#ff4a5a', rojoS: '#5a1a2a', ambar: '#ffb83a', ambarS: '#5a3e1a', verde: '#4af08a', verdeS: '#14482e', morado: '#5a2a6e', moradoS: '#3a1a4a',
  prado: '#5ab84a', pradoL: '#8ad468', pradoS: '#3a8a36', pradoD: '#2a6a2a', tierra: '#8a5a3a', tierraS: '#5a3a26',
  bosque: '#2a6a3a', bosqueL: '#4a9a4a', bosqueS: '#14402a', tronco: '#5a3a22',
  roca: '#9a98aa', rocaL: '#c8c8d8', rocaS: '#5e5c72', nieve: '#f0f4ff', nieveS: '#b8c8e8',
  agua: '#2a6ab8', aguaS: '#1a4a8a', aguaL: '#7ab8f0', espuma: '#e8f8ff',
  arena: '#e8d098', arenaS: '#c0a268', selva: '#2a8a3a', selva2: '#2e7a32', selvaL: '#62c45a', selvaS: '#0e3a1c', selvaD: '#1a5a26',
  oro: '#ffd04a', oroL: '#fff0a0', oroS: '#b07a22', piel: '#e8b890', toga: '#4a2a6a', togaL: '#6a4a8a', pelo: '#2a1e1a',
  flor1: '#ffe060', flor2: '#ff8ab8', flor3: '#f4f4ff', flor4: '#c08aff',
});

// mezcla dos colores: a = 0 deja c, a = 1 da d
function v_mez(c, d, a) {
  a = a < 0 ? 0 : a > 1 ? 1 : a;
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// la capa fija de un encuadre: se pinta una vez en un búfer de R.nuevo() y en cada fotograma se copia entera
const v_CAPAS = new Map();

function v_capa(R, clave, dibuja) {
  let b = v_CAPAS.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); v_CAPAS.set(clave, b); }
  R.copiar(b);
}

// un rectángulo que respeta el recorte (R.rect no lo hace)
function v_rect(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= y1; y++) for (let x = Math.round(x0); x <= x1; x++) R.pset(x, y, c); }

// un velo: mezcla los píxeles de un rectángulo hacia un color (paso 2: en tramado)
function v_velo(R, x0, y0, x1, y1, col, a, paso = 1) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (paso === 1 || (x + y) % paso === 0) R.pset(x, y, v_mez(R.pget(x, y), col, a));
}

// las cifras doradas de a_cifras a doble (o triple) tamaño, centradas en x con la base en «base»: se pintan en un búfer
// aparte y se copian píxel a píxel ampliadas
let v_tmp = null;

function v_cifrasG(R, s, x, base, esc = 2) {
  if (!v_tmp) v_tmp = R.nuevo();
  const VACIO = 0x01020304; v_tmp.fill(VACIO);
  const prev = R.usar(v_tmp); const w = a_cifras(R, s, 160, 20); R.usar(prev);
  const x0 = Math.round(160 - w / 2) - 1, x1 = x0 + w + 2, X0 = Math.round(x - (w + 2) * esc / 2);
  for (let j = 10; j <= 22; j++) for (let i = x0; i <= x1; i++) { const c = v_tmp[j * 320 + i]; if (c === VACIO) continue;
    for (let a = 0; a < esc; a++) for (let b = 0; b < esc; b++) R.pset(X0 + (i - x0) * esc + a, base + (j - 20) * esc + b, c); }
}

// el marco de una pantalla de pared: canto negro, bisel metálico (luz arriba a la izquierda, sombra abajo a la derecha),
// tornillos y el cristal oscuro; devuelve el hueco de dentro
function v_marco(R, x0, y0, x1, y1) {
  const { rect, pset } = R, K = v_C;
  rect(x0 - 1, y0 - 1, x1 + 1, y1 + 2, K.k); rect(x0, y0, x1, y1, K.metal1);
  rect(x0, y0, x1, y0, K.metal3); rect(x0, y0, x0, y1, K.metal2); rect(x0, y1, x1, y1, K.metal0); rect(x1, y0, x1, y1, K.metal0);
  for (const [x, y] of [[x0 + 1, y0 + 1], [x1 - 1, y0 + 1], [x0 + 1, y1 - 1], [x1 - 1, y1 - 1]]) pset(x, y, K.metal4);
  rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, K.k); rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, K.pant0);
  return [x0 + 3, y0 + 3, x1 - 3, y1 - 3];
}

// el cristal de una pantalla encendida: la línea de barrido que baja y un reflejo en diagonal (encima del contenido)
function v_cristal(R, b, t, k = 0) {
  const [x0, y0, x1, y1] = b, K = v_C, sy = y0 + Math.floor((t * 9 + k * 13) % (y1 - y0 + 1));
  for (let x = x0; x <= x1; x++) R.pset(x, sy, v_mez(R.pget(x, sy), K.holo4, 0.18));
  for (let y = y0; y <= y1; y++) { const xa = x0 + Math.round((y - y0) * 0.6) + Math.round((x1 - x0) * 0.55); for (let x = xa; x <= Math.min(x1, xa + 3); x++) if ((x + y) & 1) R.pset(x, y, v_mez(R.pget(x, y), K.holo4, 0.1)); }
}

// el mapa de la arena en una pantalla: el prado con su lago, el bosque y la montaña, la rejilla, la línea que barre y
// los puntitos de los tributos que se mueven y parpadean (n)
function v_pantMapa(R, t, b, n = 24) {
  const [x0, y0, x1, y1] = b, K = v_C, w = x1 - x0, hh = y1 - y0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const u = (x - x0) / w, v = (y - y0) / hh; let c = h(x >> 1, y >> 1, 9) < 0.5 ? K.pradoS : K.prado;
    if ((u - 0.28) ** 2 / 0.02 + (v - 0.66) ** 2 / 0.05 < 1) c = K.agua;
    else if (v < 0.42 && u > 0.5) c = h(x, y, 8) < 0.5 ? K.bosque : K.bosqueS;
    else if (u < 0.42 && v < 0.42 && v + Math.abs(u - 0.2) * 1.5 < 0.42) c = v + Math.abs(u - 0.2) * 1.5 < 0.18 ? K.nieve : K.roca;
    c = v_mez(c, K.pant0, 0.35);
    if ((x - x0) % 8 === 0 || (y - y0) % 8 === 0) c = v_mez(c, K.holo2, 0.3);
    R.pset(x, y, c);
  }
  const sx = x0 + Math.floor((t * 14) % (w + 1));
  for (let y = y0; y <= y1; y++) { R.pset(sx, y, K.holo3); if (sx > x0) R.pset(sx - 1, y, v_mez(R.pget(sx - 1, y), K.holo2, 0.5)); }
  for (let k = 0; k < n; k++) { const px = Math.round(x0 + 2 + h(k, 1, 31) * (w - 4) + Math.sin(t * 0.6 + k) * 1.5), py = Math.round(y0 + 2 + h(k, 2, 31) * (hh - 4) + Math.cos(t * 0.5 + k * 1.7) * 1.5);
    R.pset(px, py, Math.sin(t * 3 + k) > 0.7 ? K.blanco : K.ambar); }
}

// la gráfica de audiencia: barras que suben y bajan y una línea que corre de derecha a izquierda
function v_pantGrafica(R, t, b) {
  const [x0, y0, x1, y1] = b, K = v_C;
  for (let y = y0; y <= y1; y++) if ((y - y0) % 6 === 0) for (let x = x0; x <= x1; x += 2) R.pset(x, y, K.pant1);
  for (let x = x0 + 2, k = 0; x < x1 - 2; x += 5, k++) { const v = 0.35 + 0.3 * Math.sin(t * 1.3 + k * 0.9) + 0.2 * h(k, Math.floor(t * 2), 33), top = Math.round(y1 - 2 - v * (y1 - y0 - 14));
    R.rect(x, top, x + 2, y1 - 2, k % 4 === 3 ? K.ambar : K.holo1); R.rect(x, top, x + 2, top, K.holo3); }
  let py = null;
  for (let x = x0; x <= x1; x++) { const y = Math.round(y0 + 6 + 4 * Math.sin((x + t * 18) * 0.21) + 2 * Math.sin((x + t * 18) * 0.07)); if (py != null) R.linea(x - 1, py, x, y, K.verde); py = y; }
}

// el sello del Capitolio sin letras: un aro con laureles, una estrella y un punto que da vueltas
function v_pantSello(R, t, b) {
  const [x0, y0, x1, y1] = b, K = v_C, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, r = Math.min(x1 - x0, y1 - y0) * 0.38;
  R.disco(cx, cy, r + 2, K.holo0); R.disco(cx, cy, r, K.pant1); R.anillo(cx, cy, r, K.holo3); R.anillo(cx, cy, r - 3, K.holo1, 2);
  for (let k = 0; k < 9; k++) for (const s of [-1, 1]) { const a = Math.PI * 0.5 + s * (0.5 + k * 0.22); R.pset(Math.round(cx + Math.cos(a) * (r - 6)), Math.round(cy + Math.sin(a) * (r - 6)), K.oro); }
  for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; R.linea(Math.round(cx), Math.round(cy), Math.round(cx + Math.cos(a) * r * 0.45), Math.round(cy + Math.sin(a) * r * 0.45), K.oroL); }
  const a = t * 1.4; R.disco(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1.2, K.blanco);
}

// un engranaje: rueda con dientes, el agujero del eje y un brillo arriba a la izquierda
function v_engranaje(R, cx, cy, r, ang, c, cS, n = 8) {
  for (let k = 0; k < n; k++) { const a = ang + k * 2 * Math.PI / n; R.disco(cx + Math.cos(a) * (r + 1), cy + Math.sin(a) * (r + 1), 1.4, cS); }
  R.disco(cx, cy, r, cS); R.disco(cx - 0.5, cy - 0.5, r - 1, c); R.disco(cx, cy, Math.max(1, r * 0.35), v_C.pant0);
  R.pset(Math.round(cx - r * 0.5), Math.round(cy - r * 0.6), v_C.oroL);
}

// los engranajes de la pantalla: giran; con e de 0 a 0,5 se atascan y tiemblan; desde 0,5 se paran, salta una pieza
// (un diente que vuela y cae) y se enciende un aspa roja
function v_pantEngranajes(R, t, b, e) {
  const [x0, y0, x1, y1] = b, K = v_C, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, s = Math.min(x1 - x0, y1 - y0) / 36;
  R.recorte(b);
  const para = e >= 0.5, tiembla = e > 0 && !para ? Math.round(Math.sin(t * 40) * 1) : 0;
  const ang = para ? 0.3 : t * (2 - e * 3) + (e > 0 ? Math.sin(t * 17) * 0.15 * e : 0);
  v_engranaje(R, cx - 7 * s + tiembla, cy + 2 * s, 7 * s, ang, K.oro, K.oroS, 10);
  v_engranaje(R, cx + 7 * s + tiembla, cy - 3 * s, 5 * s, -ang * 1.4 + 0.2, K.metal4, K.metal2, 8);
  v_engranaje(R, cx + 9 * s, cy + 9 * s, 3.5 * s, ang * 2 + 0.5, K.holo3, K.holo1, 6);
  if (para) { const u = Math.min(1, (e - 0.5) / 0.5), px = cx + 2 * s + u * 12 * s, py = cy - 4 * s - Math.sin(u * Math.PI) * 10 * s + u * 14 * s;
    R.disco(px, py, 1.6 * s, K.oro); R.pset(Math.round(px), Math.round(py - 1), K.oroL);
    if (Math.sin(t * 9) > -0.3) { const r = 4 * s; R.linea(x1 - 3 - 2 * r, y0 + 3, x1 - 3, y0 + 3 + 2 * r, K.rojo); R.linea(x1 - 3, y0 + 3, x1 - 3 - 2 * r, y0 + 3 + 2 * r, K.rojo); R.linea(x1 - 2 - 2 * r, y0 + 3, x1 - 2, y0 + 3 + 2 * r, K.rojo); R.linea(x1 - 2, y0 + 3, x1 - 2 - 2 * r, y0 + 3 + 2 * r, K.rojo); } }
  R.recorte(null);
}

// el sinsajo: un pájaro de alas abiertas dentro de un aro, en oro sobre la pantalla, que aparece con u (0–1)
const v_SINSAJO = ['.....#.......', '....###......', '#..#####...##', '############.', '.##########..', '...#######...', '....##.##....', '...#..#..#...'];

function v_pantSinsajo(R, t, b, u) {
  if (u <= 0) return;
  const [x0, y0, x1, y1] = b, K = v_C, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, esc = Math.max(1, Math.floor(Math.min(x1 - x0, y1 - y0) / 14));
  if (u < 1 && ((Math.floor(t * 30) & 1) === 0)) return;
  v_rect(R, x0, y0, x1, y1, K.pant1); R.recorte(b);
  const r = 7.5 * esc; R.anillo(cx, cy, r, K.oro); R.anillo(cx, cy, r - 1, K.oroS);
  const w = v_SINSAJO[0].length * esc, X = Math.round(cx - w / 2), Y = Math.round(cy - 4 * esc);
  v_SINSAJO.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') for (let a = 0; a < esc; a++) for (let c = 0; c < esc; c++) R.pset(X + i * esc + a, Y + j * esc + c, j < 2 ? K.oroL : K.oro); });
  R.recorte(null);
}

// el contador: el número grande en oro (a_cifras, a doble tamaño) y debajo las figuritas de los tributos encendidas
function v_pantContador(R, t, b, n) {
  const [x0, y0, x1, y1] = b, K = v_C, cx = Math.round((x0 + x1) / 2), s = String(Math.round(n));
  v_rect(R, x0, y0, x1, y1, K.pant1); for (let y = y0; y <= y1; y += 3) for (let x = x0; x <= x1; x++) R.pset(x, y, K.pant0);
  const grande = y1 - y0 > 30; v_cifrasG(R, s, cx, y0 + (grande ? 19 : 12), grande ? 2 : 1);
  const m = Math.min(48, Math.round(n)), fil = 12, ancho = 3, top = y0 + (grande ? 23 : 15);
  for (let k = 0; k < 48; k++) { const i = k % fil, j = Math.floor(k / fil), x = Math.round(cx - fil * ancho / 2 + i * ancho), y = top + j * 4; if (y + 2 > y1) break;
    const on = k < m, c = on ? (k >= 24 ? K.ambar : K.holo3) : K.holo0; R.pset(x, y, c); R.pset(x, y + 1, c); R.pset(x - 1, y + 2, on ? v_mez(c, K.k, 0.3) : c); R.pset(x, y + 2, c); R.pset(x + 1, y + 2, on ? v_mez(c, K.k, 0.3) : c); }
}

// la cornucopia dorada: un cuerno tumbado con la boca a la derecha, con luz arriba y la boca en sombra (s: escala)
function v_cuerno(R, x, y, s, holo = false) {
  const K = v_C, n = Math.max(5, Math.round(9 * s));
  for (let i = 0; i <= n; i++) { const u = i / n, px = x - 7 * s + u * 13 * s, py = y - Math.max(0, 0.35 - u) * 10 * s, r = 0.4 + u * 3.2 * s;
    R.disco(px, py + 0.5, r, K.oroS); R.disco(px, py, r * 0.8, holo ? v_mez(K.oro, K.holo3, 0.3) : K.oro); R.pset(Math.round(px), Math.round(py - r * 0.6), K.oroL); }
  R.disco(x + 6 * s, y, 2.4 * s, K.k); R.disco(x + 6.4 * s, y, 1.6 * s, v_mez(K.oroS, K.k, 0.5));
}

// el prado de los Juegos 50 en una maqueta elíptica (centro cx, cy; semiejes rx, ry): el canto con la hierba, la tierra
// en capas y la piedra (o.grosor px), la superficie con manchas de hierba, el viento que pasa en ondas, el lago con su
// orilla y sus brillos, el bosque de abetos que se mecen, la montaña nevada con la cara de luz y la de sombra, las flores
// que se mecen, la cornucopia y las lucecitas de los tributos (o.luces). o.holo: teñido de holograma con líneas de barrido.
// o.pajaros: dos pájaros de maqueta que cruzan. Devuelve { cima: [x, y], arbol: [x, y] }
function v_prado(R, t, cx, cy, rx, ry, o = {}) {
  const K = v_C, holo = !!o.holo, g = o.grosor ?? 0, s = rx / 120, scan = Math.floor(t * 10);
  const tin = (c, y) => { if (!holo) return c; c = v_mez(c, K.holo2, 0.3); return (y + scan) % 4 === 0 ? v_mez(c, K.holo4, 0.18) : c; };
  // el canto de la maqueta
  for (let x = Math.ceil(cx - rx); x <= Math.floor(cx + rx); x++) { const u = (x - cx) / rx, yb = Math.round(cy + ry * Math.sqrt(Math.max(0, 1 - u * u)));
    for (let j = 1; j <= g; j++) { let c = j <= Math.max(1, Math.round(g * 0.2)) ? K.pradoD : j < g * 0.6 ? K.tierra : j < g * 0.85 ? K.tierraS : K.rocaS;
      if (h(x, j, 61) < 0.18) c = v_mez(c, K.k, 0.3); else if (h(x, j, 62) < 0.08) c = v_mez(c, K.arena, 0.3);
      c = v_mez(c, K.k, Math.max(0, u) * 0.4 - Math.min(0, u) * -0.0); R.pset(x, yb + j, tin(c, yb + j)); } }
  // la superficie: hierba, lago, suelo del bosque
  const enLago = (u, v) => ((u + 0.42) / 0.2) ** 2 + ((v - 0.22) / 0.42) ** 2, enBosque = (u, v) => u > 0.14 + Math.sin(v * 11) * 0.03 && u < 0.92 && v < 0.1 - Math.max(0, u - 0.6) * 0.8 + Math.sin(u * 23) * 0.07;
  for (let y = Math.ceil(cy - ry); y <= Math.floor(cy + ry); y++) { const v = (y - cy) / ry, w = rx * Math.sqrt(Math.max(0, 1 - v * v));
    for (let x = Math.ceil(cx - w); x <= Math.floor(cx + w); x++) { const u = (x - cx) / rx, ld = enLago(u, v); let c;
      if (ld < 1) { c = ld < 0.4 ? K.aguaS : K.agua; if (ld > 0.82) c = K.aguaL; if (h(x, y, Math.floor(t * 3)) < 0.05) c = K.espuma; if (Math.sin(x * 0.7 + t * 2) > 0.85 && ld < 0.8 && (y & 1)) c = K.aguaL; }
      else if (enBosque(u, v)) c = h(x, y, 63) < 0.5 ? K.bosqueS : K.pradoD;
      else { const p = Math.sin(u * 7.3 + v * 3.1) + Math.sin(u * 3.7 - v * 9.2 + 1.3); c = p > 0.7 ? K.pradoL : p < -0.7 ? K.pradoS : K.prado;
        if (h(x, y, 64) < 0.12) c = K.pradoS; else if (h(x, y, 65) < 0.05) c = K.pradoL;
        if (Math.sin((x * 0.5 + y * 0.9) * 0.2 / Math.max(0.4, s) - t * 2.4) > 0.9) c = v_mez(c, K.pradoL, 0.7);
        if (u < -0.6) c = v_mez(c, K.pradoL, 0.15); if (v < -0.8) c = v_mez(c, K.pradoD, 0.3); }
      R.pset(x, y, tin(c, y)); } }
  // la montaña nevada, al fondo a la izquierda: una cresta quebrada con dos picos, la ladera de luz (a la izquierda de la
  // arista) y la de sombra, vetas de roca, la nieve con su borde dentado y el monte bajo al pie
  const mx0 = Math.round(cx - rx * 0.9), mx1 = Math.round(cx + rx * 0.12), Hm = rx * 0.55 + ry * 0.4, mw = mx1 - mx0;
  const perfil = (f) => Math.max(0, 1 - Math.abs(f - 0.4) / (f < 0.4 ? 0.4 : 0.6) * 1.05, 0.66 - Math.abs(f - 0.76) * 2.6) + (h(Math.round(f * 50), 0, 66) - 0.5) * 0.06;
  const p1 = [mx0 + 0.4 * mw, perfil(0.4)], p2 = [mx0 + 0.76 * mw, perfil(0.76)]; let P = [cx, cy];
  for (let x = mx0; x <= mx1; x++) { const f = (x - mx0) / mw, u = (x - cx) / rx, base = Math.round(cy - ry * Math.sqrt(Math.max(0, 1 - u * u)) * 0.35), top = Math.round(base - perfil(f) * Hm);
    if (top < P[1]) P = [x, top];
    for (let y = top; y <= base; y++) { const alt = (base - y) / Hm, pk = Math.abs(f - 0.4) < Math.abs(f - 0.76) ? p1 : p2, luz = x < pk[0] + (base - pk[1] * Hm - y) * -0.5;
      let c = luz ? K.roca : K.rocaS;
      if ((y + Math.round(x * (luz ? 0.6 : -0.6))) % 6 === 0 && h(x, y, 66) < 0.55) c = luz ? K.rocaS : K.k;
      else if (h(x, y, 67) < 0.05) c = K.rocaL;
      if (alt > pk[1] * 0.62 + (h(x, 0, 68) - 0.5) * 0.12 + Math.abs(x - pk[0]) / Hm * 0.25) c = luz ? (h(x, y, 65) < 0.08 ? K.nieveS : K.nieve) : K.nieveS;
      if (y === top && luz) c = alt > 0.5 ? K.blanco : K.rocaL;
      if (alt < 0.16 + h(x, 1, 69) * 0.08) c = h(x, y, 69) < 0.45 ? K.bosqueS : K.bosque;
      R.pset(x, y, tin(c, y)); } }
  // el bosque de abetos (de atrás adelante), que se mecen con el viento
  const sp = Math.max(3, 7 * s); let arbol = [cx + rx * 0.3, cy];
  for (let gy = cy - ry * 0.95; gy < cy + ry * 0.1; gy += sp * 0.55) for (let gx = cx + rx * 0.12; gx < cx + rx * 0.95; gx += sp) {
    const x = Math.round(gx + (h(Math.round(gx), Math.round(gy), 67) - 0.5) * sp * 0.6), y = Math.round(gy), u = (x - cx) / rx, v = (y - cy) / ry;
    if (!enBosque(u, v) || u * u + v * v > 0.92 || h(x, y, 71) < 0.1) continue;
    const alto = Math.round((5 + h(x, y, 68) * 5) * Math.max(0.45, s)), m = Math.sin(t * 1.6 + x * 0.3) > 0.6 ? 1 : 0;
    if (h(x, y, 70) < 0.22) { const r = Math.max(1, alto * 0.36); R.pset(x, y, tin(K.tronco, y)); R.pset(x, y - 1, tin(K.tronco, y)); R.disco(x + m * 0.5, y - r - 1, r, tin(K.bosqueS, y)); R.disco(x - r * 0.25 + m * 0.5, y - r * 1.25 - 1, r * 0.7, tin(K.bosqueL, y)); arbol = [x, y]; continue; }
    for (let j = 0; j < alto; j++) { const hw = Math.round((j / alto) * alto * 0.38); for (let i = -hw; i <= hw; i++) R.pset(x + i + (j < alto * 0.3 ? m : 0), y - alto + j, tin(i < 0 ? K.bosqueL : j % 3 === 0 ? K.bosqueS : K.bosque, y - alto + j)); }
    R.pset(x, y, tin(K.tronco, y)); if (alto > 5) R.pset(x, y + 1, tin(K.tronco, y)); arbol = [x, y]; }
  // un árbol grande y solo a la izquierda, junto al lago
  const ax = Math.round(cx - rx * 0.62), ay = Math.round(cy + ry * 0.05), ar = Math.max(2, 4.5 * s);
  R.linea(ax, ay, ax, Math.round(ay - ar * 1.6), tin(K.tronco, ay)); R.disco(ax, ay - ar * 2, ar, tin(K.bosqueS, ay)); R.disco(ax - ar * 0.3, ay - ar * 2.2, ar * 0.75, tin(K.bosque, ay)); R.disco(ax - ar * 0.5, ay - ar * 2.5, ar * 0.35, tin(K.bosqueL, ay));
  // las flores que se mecen
  const cols = [K.flor1, K.flor2, K.flor3, K.flor4];
  for (let k = 0; k < Math.round(110 * s + 12); k++) { const u = h(k, 4, 69) * 1.8 - 0.9, v = h(k, 5, 69) * 1.8 - 0.9; if (u * u + v * v > 0.85 || enLago(u, v) < 1.3 || enBosque(u, v)) continue;
    const x = Math.round(cx + u * rx + (Math.sin(t * 2.2 + k) > 0.55 ? 1 : 0)), y = Math.round(cy + v * ry); if (s > 0.7) R.pset(x, y + 1, tin(K.pradoD, y)); R.pset(x, y, tin(cols[k % 4], y)); }
  // la cornucopia dorada en el centro
  v_cuerno(R, cx + rx * 0.02, cy + ry * 0.2, Math.max(0.45, s), holo);
  // las lucecitas de los tributos, que flotan y titilan
  for (let k = 0; k < (o.luces ?? 0); k++) { const u = h(k, 6, 70) * 1.6 - 0.8, v = h(k, 7, 70) * 1.5 - 0.75; if (u * u + v * v > 0.8) continue;
    const x = Math.round(cx + u * rx + Math.sin(t * 0.7 + k) * 2 * s), y = Math.round(cy + v * ry - 3 - 3 * s + Math.sin(t * 2 + k * 1.3) * 1.2), on = Math.sin(t * 3.1 + k * 2.3) > -0.85;
    if (!on) continue; const c = k >= 24 ? K.ambar : K.oroL; R.pset(x, y, K.blanco); for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.pset(x + dx, y + dy, v_mez(R.pget(x + dx, y + dy), c, 0.7)); }
  // dos pájaros de maqueta que cruzan (aleteo)
  if (o.pajaros) for (let k = 0; k < 2; k++) { const x = Math.round(cx - rx * 0.8 + ((t * 9 * s + k * 70 * s) % (rx * 1.6))), y = Math.round(cy - ry - 30 * s - k * 9 * s + Math.sin(t * 1.5 + k) * 3), a = Math.floor(t * 6 + k) % 2;
    R.pset(x, y, K.k); R.pset(x - 1, y - a, K.k); R.pset(x + 1, y - a, K.k); R.pset(x - 2, y - 1 + a, K.k); R.pset(x + 2, y - 1 + a, K.k); }
  return { cima: [Math.round(P[0]), Math.round(P[1])], arbol: [ax, Math.round(ay - ar * 2)] };
}

// la arena de los Juegos 75 vista desde arriba (centro cx, cy; semiejes rx, ry hasta el campo de fuerza): el islote de
// la cornucopia, la laguna con sus ondas y doce lenguas de arena, la playa con la espuma que va y viene, la selva en doce
// sectores con copas que se mecen y las líneas de los sectores, y fuera el filo del campo de fuerza con doce marcas;
// o.hora (0–12): la manecilla de luz y el sector que señala, que late; o.holo: teñido de holograma con líneas de barrido;
// o.y1: hasta dónde pinta (abajo)
function v_isla(R, t, cx, cy, rx, ry, o = {}) {
  const K = v_C, holo = o.holo !== false, R2 = 1.06, esc = (rx + ry) / 2, scan = Math.floor(t * 10), PI6 = Math.PI / 6;
  const xa = Math.max(0, Math.floor(cx - rx * R2)), xb = Math.min(319, Math.ceil(cx + rx * R2)), ya = Math.max(0, Math.floor(cy - ry * R2)), yb = Math.min(o.y1 ?? 179, Math.ceil(cy + ry * R2));
  const angM = o.hora == null ? null : ((o.hora % 12) + 12) % 12 / 12 * 2 * Math.PI, anchoM = Math.max(1.3, esc / 70), secM = angM == null ? -1 : Math.floor(angM / PI6) % 12;
  const lengua = Math.max(1.2, esc / 70), cu = Math.max(3.5, esc / 24) / esc, late = 0.14 + 0.08 * Math.sin(t * 5);
  for (let y = ya; y <= yb; y++) { const v = (y - cy) / ry;
    for (let x = xa; x <= xb; x++) { const u = (x - cx) / rx, d = Math.sqrt(u * u + v * v); if (d > R2) continue;
      let ang = Math.atan2(u, -v); if (ang < 0) ang += 2 * Math.PI;
      const sec = Math.floor(ang / PI6) % 12, dr = ang - sec * PI6, borde = Math.min(dr, PI6 - dr) * d * esc; let c;
      if (d > 1) { if (d < 1.014) c = K.holo3; else { const marca = borde < 1.2 && d < 1.05; if (marca) c = K.holo4; else if (((x + y) & 1) && d < 1.04) c = K.holo0; else continue; } }
      else if (d < 0.12) { c = h(x, y, 71) < 0.3 ? K.arenaS : K.arena; if (d > 0.105) c = K.espuma; }
      else if (d < 0.5) {
        if (borde < lengua) c = borde > lengua - 1 ? K.arenaS : K.arena;
        else { c = d < 0.3 ? K.aguaS : K.agua; if (Math.sin(d * esc * 0.45 - t * 2.2 + sec * 1.7) > 0.86) c = K.aguaL; if (borde < lengua + 1.2 + Math.sin(t * 3 + d * 20) * 0.6) c = K.espuma; if (h(x, y, Math.floor(t * 3)) < 0.02) c = K.espuma; } }
      else if (d < 0.585) { c = h(x, y, 72) < 0.25 ? K.arenaS : K.arena; if (d < 0.5 + 0.014 * (1 + Math.sin(t * 2.5 + ang * 9))) c = K.espuma; else if (d > 0.57) c = K.arenaS; }
      else {
        // las copas: de las nueve celdas de alrededor gana la copa más alta que cubre el píxel (así se solapan)
        const gu = u / cu, gv = v / cu * (ry / rx), iu0 = Math.floor(gu), iv0 = Math.floor(gv); let alto = -1, bx = 0, by = 0, bq = 1, bk = 0;
        for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) { const iu = iu0 + a, iv = iv0 + b, r = 0.5 + h(iu, iv, 53) * 0.42, ox = h(iu, iv, 51) + Math.sin(t * 1.3 + iu * 0.7 + iv) * 0.05, oy = h(iu, iv, 52);
          const dx = (gu - iu - ox) / r, dy = (gv - iv - oy) / r, q = Math.sqrt(dx * dx + dy * dy); if (q >= 1) continue; const al = h(iu, iv, 55) + (1 - q) * 0.35; if (al > alto) { alto = al; bx = dx; by = dy; bq = q; bk = h(iu, iv, 54); } }
        if (alto >= 0) { const sh = bx + by; c = sh < -0.75 ? K.selvaL : sh > 0.6 || bq > 0.9 ? K.selvaD : bk < 0.35 ? K.selva : bk < 0.7 ? K.selva2 : K.bosque;
          if (bq < 0.22 && sh < 0) c = v_mez(c, K.selvaL, 0.6); if (bk > 0.93 && bq < 0.5) c = K.flor2; }
        else c = K.selvaS;
        if (holo && borde < 0.7) c = v_mez(c, K.holo2, 0.6);
      }
      if (sec === secM) c = v_mez(c, K.holo3, late);
      if (angM != null && d < 1.03) { let da = Math.abs(ang - angM); if (da > Math.PI) da = 2 * Math.PI - da; const px = da * d * esc; if (px < anchoM || d * esc < anchoM * 1.6) c = px < anchoM * 0.45 ? K.holo4 : v_mez(c, K.holo3, 0.75); }
      if (holo) { c = v_mez(c, K.holo2, 0.2); if ((y + scan) % 4 === 0) c = v_mez(c, K.holo4, 0.14); }
      R.pset(x, y, c); } }
  if (cy + ry * 0.12 < 180 && cx > 0) v_cuerno(R, cx - 1, cy, Math.max(0.35, esc / 110), holo);
  if (angM != null) { const tx = Math.round(cx + Math.sin(angM) * rx * 1.03), ty = Math.round(cy - Math.cos(angM) * ry * 1.03); R.disco(tx, ty, Math.max(1.5, esc / 60), K.holo4); }
}

// la sala de control (capa fija, cámara general): techo, pared con marcos de pantallas, monitorcitos, la puerta, el
// armario de servidores, la grada de atrás, el suelo pulido en perspectiva con reflejos, el pedestal del proyector
const V_PANT = [[26, 30, 76, 66], [82, 30, 130, 66], [136, 27, 188, 70], [194, 30, 242, 66]];

function v_salaFija(R) {
  const { rect, pset, linea, poligono, disco } = R, K = v_C;
  // el techo de placas, sus juntas en fuga y dos tiras de luz fría (lejos de la esquina de Atom)
  for (let y = 0; y <= 25; y++) rect(0, y, 319, y, v_mez(K.muro0, K.muro1, y / 25));
  for (let i = -9; i <= 9; i++) linea(160 + i * 42, 0, 160 + i * 20, 25, v_mez(K.muro0, K.muro2, 0.5));
  for (const y of [8, 15, 21]) rect(0, y, 319, y, v_mez(K.muro0, K.muro2, y / 28));
  for (const [a, b] of [[44, 120], [176, 262]]) { rect(a, 23, b, 24, K.metal1); for (let x = a + 1; x < b; x += 2) pset(x, 23, K.holo1); }
  // la pared del fondo: paneles con juntas, remaches, ruido y una moldura con su luz
  for (let y = 26; y <= 92; y++) rect(0, y, 319, y, v_mez(K.muro1, K.muro2, (y - 26) / 66));
  for (let x = 6; x < 320; x += 24) { rect(x, 26, x, 92, K.muro0); rect(x + 1, 26, x + 1, 92, K.muro3); for (const y of [29, 89]) { pset(x + 3, y, K.metal3); pset(x + 20, y, K.metal3); } }
  for (let y = 26; y <= 92; y++) for (let x = 0; x < 320; x++) if (h(x, y, 81) < 0.05) pset(x, y, K.muro3); else if (h(x, y, 82) < 0.04) pset(x, y, K.muro0);
  rect(0, 26, 319, 26, K.metal2); rect(0, 70, 319, 70, K.muro0); rect(0, 71, 319, 71, K.muro3);
  V_PANT.forEach((b) => v_marco(R, ...b));
  // los soportes de las pantallas y los cables que bajan
  for (const [x0, , x1, y1] of V_PANT) { rect(Math.round((x0 + x1) / 2) - 3, y1 + 2, Math.round((x0 + x1) / 2) + 3, y1 + 3, K.metal2); for (let y = y1 + 4; y < 92; y++) pset(x1 - 4 + (y % 5 === 0 ? 1 : 0), y, K.metal0); }
  // la fila de monitorcitos de estado
  for (let k = 0; k < 10; k++) { const x = 30 + k * 21; if (x > 236) break; rect(x - 1, 74, x + 13, 83, K.k); rect(x, 75, x + 12, 82, K.metal1); rect(x + 1, 76, x + 11, 81, K.pant0); }
  // la puerta sellada de la derecha: marco con franjas, hojas correderas, ojo de buey y el piloto
  rect(248, 34, 276, 92, K.k); rect(249, 35, 275, 92, K.metal1); for (let y = 35; y <= 92; y += 4) { pset(249, y, K.ambar); pset(275, y + 2, K.ambar); }
  rect(252, 39, 261, 92, K.metal2); rect(263, 39, 272, 92, K.metal2); rect(262, 39, 262, 92, K.k); rect(252, 39, 272, 39, K.metal3); rect(252, 39, 252, 92, K.metal3);
  for (const x of [257, 267]) { disco(x, 52, 3, K.k); disco(x, 52, 2, K.pant1); pset(x - 1, 51, K.holo2); }
  for (let y = 62; y < 92; y += 6) { rect(253, y, 260, y, K.metal1); rect(264, y, 271, y, K.metal1); }
  // el armario de servidores bajo la esquina de Atom
  rect(282, 48, 318, 92, K.k); rect(283, 49, 317, 92, K.metal0); for (let y = 51; y < 92; y += 5) { rect(285, y, 315, y + 3, K.metal1); rect(285, y, 315, y, K.metal2); for (let x = 300; x < 314; x += 2) pset(x, y + 2, K.k); }
  // la pared izquierda en fuga con su panel de pilotos
  poligono([[0, 26], [20, 30], [20, 92], [0, 100]], K.muro0); for (let y = 34; y < 92; y += 7) linea(0, y + 4, 20, y, K.muro2);
  // la grada de atrás: la mesa larga y curva de los operadores con su canto de luz
  rect(14, 92, 306, 94, K.metal2); rect(14, 92, 306, 92, K.metal4); rect(14, 95, 306, 108, K.metal0); rect(14, 95, 306, 95, K.metal1);
  for (let x = 18; x < 306; x += 12) { rect(x, 98, x + 8, 105, K.metal1); rect(x, 98, x + 8, 98, K.metal2); }
  // el suelo pulido: degradado, juntas en fuga hacia (160, 40), juntas transversales y moteado
  for (let y = 109; y <= 179; y++) rect(0, y, 319, y, v_mez(K.suelo2, K.suelo0, (y - 109) / 70));
  for (let i = -12; i <= 12; i++) linea(160 + i * 18, 109, Math.round(160 + i * 18 * 2.0), 179, K.suelo1);
  for (const y of [112, 116, 121, 127, 135, 145, 158, 174]) rect(0, y, 319, y, v_mez(K.suelo1, K.muro2, 0.3));
  for (let y = 109; y <= 179; y++) for (let x = 0; x < 320; x++) if (h(x, y, 83) < 0.03) pset(x, y, K.muro2);
  // los reflejos de las pantallas en el suelo, tramados
  for (const [x0, , x1] of V_PANT) for (let y = 110; y < 140; y++) for (let x = x0 + 4; x < x1 - 4; x++) if (((x + y) & 1) && h(x, y, 84) < 0.6 - (y - 110) / 50) pset(x, y, v_mez(R.pget(x, y), K.holo1, 0.35));
  // el pedestal del proyector: el zócalo de dos escalones, el cilindro de metal con luz a la izquierda y la lente
  const elip = (cx, cy, rx, ry, f) => { for (let y = -ry; y <= ry; y++) { const w = Math.round(rx * Math.sqrt(1 - (y / (ry + 0.3)) ** 2)); for (let x = -w; x <= w; x++) f(cx + x, cy + y, x / rx); } };
  elip(160, 156, 44, 7, (x, y, u) => pset(x, y, v_mez(K.k, K.suelo1, 0.4)));
  elip(160, 152, 40, 7, (x, y, u) => pset(x, y, u < -0.4 ? K.metal3 : u > 0.5 ? K.metal1 : K.metal2));
  rect(122, 152, 198, 154, K.metal1); elip(160, 151, 38, 6, (x, y, u) => pset(x, y, u < -0.5 ? K.metal3 : K.metal2));
  for (let x = 134; x <= 186; x++) { const u = (x - 160) / 26; rect(x, 140, x, 150, u < -0.55 ? K.metal3 : u < -0.2 ? K.metal2 : u > 0.6 ? K.metal0 : K.metal1); }
  for (let x = 138; x <= 182; x += 6) rect(x, 142, x, 148, K.metal0);
  elip(160, 140, 26, 5, (x, y, u) => pset(x, y, u < -0.4 ? K.metal4 : K.metal3)); elip(160, 140, 18, 3, (x, y) => pset(x, y, K.k)); elip(160, 140, 14, 2, (x, y) => pset(x, y, K.holo0));
}

// la sala de control, cámara general
function v_control(R, t, o) {
  const { rect, pset, linea, disco } = R, K = v_C, n = o.luces ?? 24;
  v_capa(R, 'v-control', () => v_salaFija(R));
  // las pantallas de la pared
  const P = V_PANT.map(([a, b, c, d]) => [a + 3, b + 3, c - 3, d - 3]);
  v_pantMapa(R, t, P[0], n); v_pantGrafica(R, t, P[1]);
  if (typeof o.pantalla === 'function') { R.recorte(P[2]); o.pantalla(R, t, P[2]); R.recorte(null); }
  else if (o.contador != null) v_pantContador(R, t, P[2], o.contador);
  else v_pantSello(R, t, P[2]);
  v_pantSinsajo(R, t, P[2], o.sinsajo ?? 0);
  if (o.engranajes != null) v_pantEngranajes(R, t, P[3], o.engranajes);
  else { // las curvas de nivel de la arena que se dibujan al paso del barrido, con la cota más alta que parpadea
    const [x0, y0, x1, y1] = P[3], bx = x0 + ((t * 10) % (x1 - x0 + 12)) - 6;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = (x - x0 - 14) / 12, b = (y - y0 - 12) / 10, a2 = (x - x0 - 32) / 9, b2 = (y - y0 - 20) / 8, z = 3 * Math.exp(-(a * a + b * b)) + 2 * Math.exp(-(a2 * a2 + b2 * b2)) + 0.4 * Math.sin(x * 0.2 + y * 0.1);
      const iso = Math.abs(z * 3 - Math.round(z * 3)) < 0.12, cerca = Math.abs(x - bx) < 4; pset(x, y, iso ? (cerca ? K.holo4 : z > 2.2 ? K.ambar : K.holo2) : (y - y0) % 4 ? K.pant0 : K.pant1); }
    if (Math.sin(t * 5) > 0) R.disco(x0 + 14, y0 + 12, 1.2, K.rojo); }
  P.forEach((b, k) => v_cristal(R, b, t, k));
  // los monitorcitos de estado: barras, una onda y pilotos
  for (let k = 0; k < 10; k++) { const x = 31 + k * 21; if (x > 237) break; const m = (k * 7 + Math.floor(t * (1 + k % 3))) % 4;
    if (m === 0) for (let i = 0; i < 4; i++) { const v = Math.round(1 + 4 * Math.abs(Math.sin(t * 2 + k + i))); rect(x + 1 + i * 2, 81 - v, x + 1 + i * 2, 80, K.holo2); }
    else if (m === 1) for (let i = 0; i < 11; i++) pset(x + i, 78 + Math.round(Math.sin(t * 6 + i * 0.8 + k) * 1.5), K.verde);
    else if (m === 2) { rect(x + 1, 77, x + 9, 79, K.pant1); rect(x + 1, 77, x + 1 + Math.floor((t * 3 + k) % 9), 79, K.ambar); }
    else for (let i = 0; i < 3; i++) pset(x + 2 + i * 3, 78, Math.sin(t * 4 + i + k) > 0 ? K.verde : K.verdeS); }
  // el piloto de la puerta y los pilotos del armario
  disco(262, 37, 1.2, Math.floor(t * 1.5) % 2 ? K.rojo : K.rojoS);
  for (let y = 51; y < 92; y += 5) for (let i = 0; i < 4; i++) pset(287 + i * 3, y + 2, h(i, y, Math.floor(t * 3 + i)) < 0.5 ? (i === 3 ? K.ambar : K.verde) : K.verdeS);
  for (let y = 36; y < 90; y += 7) pset(4, y + 3, Math.sin(t * 2 + y) > 0.3 ? K.holo2 : K.holo0);
  // un vigilante que pasa por la pasarela de atrás (por detrás de la mesa de la grada) con una tablilla
  { const x = Math.round(((t * 11 + 60) % 380) - 30), a = Math.floor(t * 5) % 2; if (x > 0 && x < 320) { rect(x - 2, 84, x + 2, 91, K.toga); rect(x - 2, 84, x - 2, 91, K.togaL); disco(x, 81, 2, K.piel); rect(x - 2, 79, x + 2, 79, K.pelo); rect(x + 3, 85, x + 4, 87, K.holo3); pset(x - 1 + a, 91, K.k); } }
  // los cuatro operadores de espaldas en la grada: cabeza, cascos, hombros de túnica y los brazos que teclean
  for (const [x, k] of [[34, 0], [64, 1], [236, 2], [266, 3]]) { const b = Math.sin(t * 7 + k * 2) > 0.3 ? 1 : 0, gira = Math.sin(t * 0.5 + k * 2) > 0.85 ? 1 : 0;
    rect(x - 4, 87, x + 4, 92, K.toga); rect(x - 4, 87, x - 3, 92, K.togaL); disco(x + gira, 84, 2.6, k % 2 ? K.pelo : hex('#8a5a3a')); rect(x - 3, 82, x + 3, 82, K.metal3); pset(x - 3, 84, K.metal4); pset(x + 3, 84, K.metal4);
    pset(x - 5, 91 - b, K.piel); pset(x + 5, 90 + b, K.piel); rect(x - 6, 89, x + 6, 89, K.pant1); for (let i = -5; i <= 5; i += 2) pset(x + i, 89, Math.sin(t * 3 + i + k) > 0.5 ? K.holo2 : K.holo1); }
  // el haz del proyector que sube, tramado y en movimiento, y el aro de luz que gira en la lente
  const ar = o.arena === 'reloj', cy = 112, rx = 50, ry = 13;
  for (let y = cy; y < 140; y++) { const f = (y - cy) / (140 - cy), w = Math.round(rx * (1 - f) + 16 * f); for (let x = 160 - w; x <= 160 + w; x++) if ((x + y + Math.floor(t * 8)) % 3 === 0 || (Math.abs(x - 160) > w - 2 && (y & 1))) pset(x, y, v_mez(R.pget(x, y), K.holo2, 0.35 + 0.25 * (1 - Math.abs(x - 160) / (w + 1)))); }
  for (let k = 0; k < 10; k++) { const a = t * 2.2 + k * 2 * Math.PI / 10; pset(Math.round(160 + Math.cos(a) * 22), Math.round(140 + Math.sin(a) * 4), Math.sin(a) > 0 ? K.holo4 : K.holo1); }
  for (let k = 0; k < 16; k++) { const a = -t * 0.8 + k * 2 * Math.PI / 16; pset(Math.round(160 + Math.cos(a) * 39), Math.round(151 + Math.sin(a) * 6), Math.sin(a) > 0 ? (k % 4 ? K.holo2 : K.ambar) : K.holo0); }
  // la maqueta holográfica: el prado o el reloj, la cúpula punteada que titila y las lucecitas
  if (ar) v_isla(R, t, 160, cy, rx, ry, { holo: true, hora: o.hora ?? (t * 0.5) % 12 });
  else v_prado(R, t, 160, cy, rx, ry, { holo: true, grosor: 4, luces: n });
  if (ar) for (let k = 0; k < n; k++) { const a = h(k, 1, 91) * 6.28, d = 0.62 + h(k, 2, 91) * 0.3, x = Math.round(160 + Math.sin(a) * d * rx), y = Math.round(cy - Math.cos(a) * d * ry - 3 + Math.sin(t * 2 + k)); if (Math.sin(t * 3 + k * 2) > -0.8) pset(x, y, K.oroL); }
  for (let k = 0; k < 120; k++) { const a = Math.PI * k / 119, x = Math.round(160 - Math.cos(a) * (rx + 2)), y = Math.round(cy - Math.sin(a) * rx * 0.8); if ((k + Math.floor(t * 12)) % 3) pset(x, y, Math.sin(a * 6 - t * 3) > 0.5 ? K.holo4 : K.holo2); }
  for (const f of [0.45, 0.8]) for (let k = 0; k < 60; k++) { const a = Math.PI * k / 59, x = Math.round(160 - Math.cos(a) * (rx + 2) * f), y = Math.round(cy - Math.sin(a) * rx * 0.8 * Math.sqrt(1 - f * f * 0.5) - (1 - f) * 2); if ((k + Math.floor(t * 6)) % 4 === 0) pset(x, y, K.holo1); }
  for (let k = 0; k < 80; k++) { const a = Math.PI * k / 79; if (k % 2) pset(Math.round(160 - Math.cos(a) * (rx + 2)), Math.round(cy + Math.sin(a) * (ry + 1)), K.holo3); }
  return { suelo: 162, maqueta: [108, 70, 212, 130], pantalla: P[2], pantallas: P, engranajes: P[3], mapa: P[0], puerta: [252, 39, 272, 92], pedestal: [122, 136, 198, 158],
    sitios: [[58, 162], [98, 160], [208, 160], [248, 162]], libre: [[48, 128, 162], [194, 272, 162]] };
}

// las esquinas de las consolas de primer término (cámara general): la mesa inclinada con teclas y pilotos que
// parpadean, el canto de luz y el frente con rejilla
function v_esquinas(R, t) {
  const { rect, pset, poligono } = R, K = v_C;
  for (const [a, b, d] of [[0, 46, 1], [274, 319, -1]]) {
    const xi = d > 0 ? b : a, xo = d > 0 ? a : b;
    poligono([[xo, 150], [xi - 6 * d, 150], [xi, 160], [xo, 160]], K.metal2); R.linea(xo, 150, xi - 6 * d, 150, K.metal4); R.linea(xi - 6 * d, 150, xi, 160, K.metal3);
    for (let y = 152; y < 159; y += 3) for (let x = Math.min(a, b) + 3; x < Math.max(a, b) - 8; x += 4) { rect(x, y, x + 2, y + 1, K.metal1); pset(x, y, K.metal3); }
    for (let k = 0; k < 4; k++) pset(Math.min(a, b) + 6 + k * 8, 156, Math.sin(t * 3 + k * 1.7 + a) > 0.2 ? [K.verde, K.ambar, K.rojo, K.holo2][k] : K.metal0);
    rect(Math.min(a, b), 160, Math.max(a, b), 179, K.metal0); rect(Math.min(a, b), 160, Math.max(a, b), 160, K.holo1);
    for (let y = 164; y < 178; y += 3) rect(Math.min(a, b) + 4, y, Math.max(a, b) - 4, y, K.k);
    rect(xi, 160, xi, 179, K.metal1);
  }
}

// la sala de control de cerca (capa fija, cámara consola): el techo bajo, dos pantallas grandes, la pared con paneles,
// la grada del fondo a la derecha, el armario de servidores, el suelo lejano y el respaldo alto de la silla
const V_PANT_C = [[12, 22, 92, 74], [98, 22, 150, 74]];

function v_consolaFija(R) {
  const { rect, pset, linea, poligono, disco } = R, K = v_C;
  for (let y = 0; y <= 16; y++) rect(0, y, 319, y, v_mez(K.muro0, K.muro1, y / 16));
  for (let i = -6; i <= 6; i++) linea(160 + i * 60, 0, 160 + i * 34, 16, v_mez(K.muro0, K.muro2, 0.5));
  rect(30, 14, 140, 15, K.metal1); for (let x = 31; x < 140; x += 2) pset(x, 14, K.holo1);
  for (let y = 17; y <= 118; y++) rect(0, y, 319, y, v_mez(K.muro1, K.muro2, (y - 17) / 100));
  for (let x = 4; x < 320; x += 36) { rect(x, 17, x, 118, K.muro0); rect(x + 1, 17, x + 1, 118, K.muro3); for (const y of [20, 115]) { pset(x + 4, y, K.metal3); pset(x + 32, y, K.metal3); } }
  for (let y = 17; y <= 118; y++) for (let x = 0; x < 320; x++) if (h(x, y, 85) < 0.05) pset(x, y, K.muro3); else if (h(x, y, 86) < 0.04) pset(x, y, K.muro0);
  rect(0, 17, 319, 17, K.metal2); rect(0, 88, 319, 88, K.muro0); rect(0, 89, 319, 89, K.muro3);
  V_PANT_C.forEach((b) => v_marco(R, ...b));
  for (const [x0, , x1, y1] of V_PANT_C) rect(Math.round((x0 + x1) / 2) - 4, y1 + 2, Math.round((x0 + x1) / 2) + 4, y1 + 4, K.metal2);
  // el armario de servidores a la derecha, bajo la esquina de Atom
  rect(284, 50, 319, 128, K.k); rect(285, 51, 319, 128, K.metal0); for (let y = 53; y < 126; y += 6) { rect(287, y, 317, y + 4, K.metal1); rect(287, y, 317, y, K.metal2); for (let x = 302; x < 316; x += 2) pset(x, y + 2, K.k); }
  // la grada del fondo a la derecha: mesa larga con su canto de luz
  rect(150, 112, 284, 114, K.metal2); rect(150, 112, 284, 112, K.metal4); rect(150, 115, 284, 128, K.metal0);
  for (let x = 154; x < 282; x += 12) { rect(x, 118, x + 8, 125, K.metal1); rect(x, 118, x + 8, 118, K.metal2); }
  // el suelo lejano, pulido, con sus juntas
  for (let y = 119; y <= 179; y++) if (y > 128 || true) rect(0, y, 149, y, v_mez(K.suelo2, K.suelo0, (y - 119) / 40));
  for (let y = 129; y <= 179; y++) rect(150, y, 319, y, v_mez(K.suelo2, K.suelo0, (y - 129) / 30));
  for (let i = -10; i <= 10; i++) linea(160 + i * 26, 119, Math.round(160 + i * 26 * 2.2), 179, K.suelo1);
  for (const y of [123, 130, 140]) rect(0, y, 319, y, v_mez(K.suelo1, K.muro2, 0.3));
  // la silla de respaldo alto del Vigilante, de piel morada con capitoné y el canto de metal
  disco(70, 133, 14, K.k); rect(56, 133, 84, 150, K.k); disco(70, 133, 13, K.moradoS); rect(57, 133, 83, 150, K.moradoS);
  disco(69, 133, 11.5, K.morado); rect(58, 133, 81, 150, K.morado); for (let y = 124; y < 150; y++) for (let x = 58; x < 62; x++) if (R.pget(x, y) === K.morado) pset(x, y, v_mez(K.morado, K.blanco, 0.18));
  for (let y = 128; y < 150; y += 5) for (let x = 63; x < 80; x += 5) pset(x + (y % 10 ? 2 : 0), y, K.moradoS);
  for (let a = Math.PI * 1.1; a < Math.PI * 1.9; a += 0.05) pset(Math.round(70 + Math.cos(a) * 13), Math.round(133 + Math.sin(a) * 13), K.metal3);
  rect(53, 140, 56, 150, K.metal2); rect(84, 140, 87, 150, K.metal1); rect(53, 140, 56, 140, K.metal4);
}

// la sala de control de cerca: un Vigilante se sienta en la silla (sus pies en y 158, x 62–77) y la mesa va delante
function v_consola(R, t, o) {
  const { rect, pset, disco } = R, K = v_C, n = o.luces ?? 24;
  v_capa(R, 'v-consola', () => v_consolaFija(R));
  const P = V_PANT_C.map(([a, b, c, d]) => [a + 3, b + 3, c - 3, d - 3]);
  v_pantMapa(R, t, P[0], n);
  if (typeof o.pantalla === 'function') { R.recorte(P[1]); o.pantalla(R, t, P[1]); R.recorte(null); }
  else if (o.contador != null && !o.engranajes) v_pantContador(R, t, P[1], o.contador);
  else v_pantGrafica(R, t, P[1]);
  P.forEach((b, k) => v_cristal(R, b, t, k));
  // los pilotos del armario
  for (let y = 53; y < 126; y += 6) for (let i = 0; i < 4; i++) pset(289 + i * 3, y + 2, h(i, y, Math.floor(t * 3 + i)) < 0.5 ? (i === 3 ? K.ambar : K.verde) : K.verdeS);
  // dos operadores de espaldas en la grada del fondo
  for (const [x, k] of [[166, 0], [272, 1]]) { const b = Math.sin(t * 7 + k * 2) > 0.3 ? 1 : 0;
    rect(x - 5, 105, x + 5, 112, K.toga); rect(x - 5, 105, x - 4, 112, K.togaL); disco(x, 101, 3.2, k ? K.pelo : hex('#c8a060')); rect(x - 4, 98, x + 4, 98, K.metal3); pset(x - 6, 110 - b, K.piel); pset(x + 6, 109 + b, K.piel); }
  // la maqueta holográfica detrás, a la derecha: el haz, el aro, el prado o el reloj, la cúpula y las lucecitas
  const cx = 214, cy = 92, rx = 44, ry = 11, ar = o.arena === 'reloj';
  for (let y = cy; y < 146; y++) { const f = (y - cy) / (146 - cy), w = Math.round(rx * (1 - f) + 14 * f); for (let x = cx - w; x <= cx + w; x++) if ((x + y + Math.floor(t * 8)) % 3 === 0 || (Math.abs(x - cx) > w - 2 && (y & 1))) pset(x, y, v_mez(R.pget(x, y), K.holo2, 0.3 + 0.25 * (1 - Math.abs(x - cx) / (w + 1)))); }
  if (ar) v_isla(R, t, cx, cy, rx, ry, { holo: true, hora: o.hora ?? (t * 0.5) % 12 });
  else v_prado(R, t, cx, cy, rx, ry, { holo: true, grosor: 3, luces: n });
  for (let k = 0; k < 110; k++) { const a = Math.PI * k / 109, x = Math.round(cx - Math.cos(a) * (rx + 2)), y = Math.round(cy - Math.sin(a) * rx * 0.85); if ((k + Math.floor(t * 12)) % 3) pset(x, y, Math.sin(a * 6 - t * 3) > 0.5 ? K.holo4 : K.holo2); }
  for (let k = 0; k < 70; k++) { const a = Math.PI * k / 69; if (k % 2) pset(Math.round(cx - Math.cos(a) * (rx + 2)), Math.round(cy + Math.sin(a) * (ry + 1)), K.holo3); }
  return { suelo: 158, sentado: [62, 158], sitios: [[62, 158], [112, 158]], maqueta: [cx - rx - 2, cy - 40, cx + rx + 2, cy + ry + 4], pantalla: P[1], mapa: P[0],
    monitor: [244, 116, 304, 141], dial: [170, 151], teclado: [36, 148, 104, 156] };
}

// la mesa de la consola por delante del Vigilante: la superficie inclinada con el teclado, los deslizadores, el dial
// grande, los botones que parpadean, la taza que humea y el monitor de mesa (o.engranajes, o.sinsajo, o.contador o una
// onda); el frente con rejillas y la tira de luz
function v_mesaConsola(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, K = v_C;
  // el monitor de mesa sobre su pie
  rect(268, 141, 280, 148, K.metal1); rect(262, 147, 286, 149, K.metal2);
  rect(239, 111, 309, 144, K.k); rect(240, 112, 308, 143, K.metal1); rect(240, 112, 308, 112, K.metal3); rect(240, 112, 240, 143, K.metal2);
  const M = [244, 116, 304, 141]; rect(243, 115, 305, 142, K.k); v_rect(R, ...M, K.pant0);
  if (o.engranajes != null) v_pantEngranajes(R, t, M, o.engranajes);
  else if (o.contador != null) v_pantContador(R, t, M, o.contador);
  else { let py = null; for (let x = M[0]; x <= M[2]; x++) { const y = Math.round(128 + 6 * Math.sin((x + t * 22) * 0.18) * Math.sin((x + t * 9) * 0.05)); if (py != null) linea(x - 1, py, x, y, K.verde); py = y; } for (let x = M[0]; x <= M[2]; x += 6) pset(x, 128, K.verdeS); }
  v_pantSinsajo(R, t, M, o.sinsajo ?? 0); v_cristal(R, M, t, 5);
  disco(306, 141, 0.8, Math.floor(t * 2) % 2 ? K.verde : K.verdeS);
  // la superficie inclinada de la mesa
  poligono([[0, 146], [319, 146], [319, 158], [0, 158]], K.metal2);
  for (let y = 146; y <= 157; y++) rect(0, y, 319, y, v_mez(K.metal3, K.metal1, (y - 146) / 11));
  rect(0, 146, 319, 146, K.metal4);
  for (let x = 0; x < 320; x++) if (h(x, 3, 87) < 0.2) pset(x, 152 + Math.floor(h(x, 4, 87) * 5), v_mez(K.metal2, K.k, 0.2));
  // el teclado, con las teclas que se hunden cuando teclea
  rect(36, 148, 104, 156, K.k); rect(37, 149, 103, 155, K.metal1);
  for (let j = 0; j < 3; j++) for (let x = 39 + j; x < 101; x += 4) { const pul = h(x, j, Math.floor(t * 8)) < 0.08; rect(x, 150 + j * 2, x + 2, 150 + j * 2, pul ? K.metal2 : K.metal4); pset(x, 151 + j * 2, K.metal0); }
  // los deslizadores
  for (let k = 0; k < 5; k++) { const x = 114 + k * 7, v = 0.5 + 0.4 * Math.sin(t * 0.7 + k * 1.3); rect(x, 148, x, 156, K.k); rect(x - 2, Math.round(149 + v * 6), x + 2, Math.round(150 + v * 6), k === 2 ? K.ambar : K.metal4); }
  // el dial grande (o.dial: hacia dónde apunta, 0–1) con su aro de marcas
  { const [x, y] = [170, 151], a = -Math.PI * 0.8 + (o.dial ?? 0.5 + 0.25 * Math.sin(t * 0.9)) * Math.PI * 1.6;
    disco(x, y, 7, K.k); disco(x, y, 6, K.metal2); disco(x - 0.6, y - 0.6, 5, K.metal3); R.anillo(x, y, 6.5, K.metal0, 2);
    for (let k = 0; k <= 8; k++) { const b = -Math.PI * 0.8 + k * Math.PI * 0.2 - Math.PI / 2; pset(Math.round(x + Math.cos(b) * 8), Math.round(y + Math.sin(b) * 8), k > 6 ? K.rojo : K.holo2); }
    linea(x, y, Math.round(x + Math.cos(a - Math.PI / 2) * 5), Math.round(y + Math.sin(a - Math.PI / 2) * 5), K.oroL); disco(x, y, 1.2, K.k); }
  // los botones que parpadean
  for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) { const x = 186 + i * 5, y = 149 + j * 4, c = [K.rojo, K.verde, K.ambar, K.holo2][(i + j * 2) % 4], on = Math.sin(t * (2 + i * 0.4) + j * 3 + i) > 0;
    rect(x, y, x + 3, y + 2, K.k); rect(x, y, x + 2, y + 1, on ? c : v_mez(c, K.k, 0.65)); if (on) pset(x, y, K.blanco); }
  // la taza que humea
  { const x = 226; rect(x - 3, 145, x + 3, 153, K.k); rect(x - 2, 146, x + 2, 152, K.blanco); rect(x - 2, 146, x + 2, 146, K.metal2); rect(x + 3, 147, x + 5, 150, K.k); pset(x + 4, 148, K.blanco);
    for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1), y = Math.round(143 - u * 14), dx = Math.round(Math.sin(u * 7 + k) * 1.5); if (u < 0.85) { pset(x + dx, y, v_mez(K.metal3, K.muro1, u)); pset(x + dx + 1, y - 1, v_mez(K.metal2, K.muro1, u)); } } }
  // el canto y el frente de la mesa con rejillas y la tira de luz
  rect(0, 158, 319, 159, K.metal4); rect(0, 160, 319, 179, K.metal0); rect(0, 160, 319, 160, K.metal2);
  for (let x = 0; x < 320; x++) pset(x, 163, ((x >> 1) + Math.floor(t * 10)) % 24 === 0 ? K.holo4 : K.holo1);
  for (let x = 6; x < 320; x += 52) { rect(x, 167, x + 40, 176, K.metal1); for (let y = 168; y < 176; y += 2) rect(x + 2, y, x + 38, y, K.k); }
}

// la sala a oscuras desenfocada detrás de la maqueta (capa fija de 'cupula' y 'reloj'): la pared con manchas de luz de
// las pantallas de lejos (tramadas), la fila de consolas en silueta y el suelo con reflejos
function v_salaLejos(R, clave) {
  const { rect, pset } = R, K = v_C;
  for (let y = 0; y <= 179; y++) rect(0, y, 319, y, v_mez(K.muro0, K.muro2, Math.min(1, y / 120)));
  for (let x = 10; x < 320; x += 30) for (let y = 0; y < 118; y++) if (((x + y) & 1) && h(x, y, 88) < 0.5) pset(x, y, K.muro0);
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) if (h(x, y, 89) < 0.04) pset(x, y, K.muro3);
  // manchas de luz de las pantallas lejanas (rectángulos y discos blandos, tramados), lejos de la esquina de Atom
  const MANCHAS = [[30, 40, 26, 14, K.holo1], [72, 34, 18, 12, K.holo0], [118, 46, 22, 10, K.verdeS], [204, 38, 24, 14, K.holo1], [246, 52, 14, 10, K.ambarS], [16, 80, 12, 8, K.rojoS], [290, 84, 14, 10, K.holo0]];
  for (const [x, y, w, hh, c] of MANCHAS) for (let j = -hh; j <= hh; j++) for (let i = -w; i <= w; i++) { const d = Math.max(Math.abs(i) / w, Math.abs(j) / hh); if (d < 1 && h(x + i, y + j, 90) < 1.1 - d) pset(x + i, y + j, v_mez(R.pget(x + i, y + j), c, d < 0.6 ? 0.8 : 0.45)); }
  // la fila de consolas en silueta con su canto de luz
  rect(0, 112, 319, 140, K.muro0); rect(0, 112, 319, 112, K.metal1);
  for (let x = 0; x < 320; x += 40) { rect(x + 4, 116, x + 34, 128, K.metal0); rect(x + 4, 116, x + 34, 116, K.muro3); }
  // el suelo
  for (let y = 141; y <= 179; y++) rect(0, y, 319, y, v_mez(K.suelo2, K.suelo0, (y - 141) / 38));
  for (let i = -12; i <= 12; i++) R.linea(160 + i * 26, 141, Math.round(160 + i * 26 * 1.8), 179, K.suelo1);
  for (const y of [146, 154, 165]) rect(0, y, 319, y, v_mez(K.suelo1, K.muro2, 0.3));
}

// los pilotos de la fila de consolas lejana (vida de fondo)
// y las siluetas de tres operadores sentados tras ellas y de un vigilante que pasa despacio con una tablilla encendida
// (fuera(x, y): dónde se pueden ver; en 'borde' solo fuera de la maqueta)
function v_pilotosLejos(R, t, fuera = () => true) {
  const K = v_C;
  for (let x = 0; x < 320; x += 40) for (let i = 0; i < 4; i++) { const on = Math.sin(t * (1.5 + i * 0.3) + x * 0.1 + i * 2) > 0.1; R.pset(x + 8 + i * 6, 122, on ? [K.verde, K.ambar, K.holo2, K.rojo][i] : K.metal1); }
  for (const [x, k] of [[46, 0], [132, 1], [212, 2]]) { if (!fuera(x - 6, 112)) continue; const g = Math.sin(t * 0.6 + k * 2) > 0.7 ? 1 : 0;
    R.rect(x - 4, 106, x + 4, 112, K.metal0); R.disco(x + g, 103, 2.6, K.metal0); R.pset(x - 4, 107, K.muro3); R.pset(x + g - 2, 101, K.muro3);
    R.rect(x - 6, 110, x + 6, 111, v_mez(K.holo0, K.muro1, 0.3)); if (Math.sin(t * 7 + k) > 0.2) R.pset(x + 5, 109, K.muro3); }
  const x = Math.round(((t * 7 + 40) % 380) - 30), a = Math.floor(t * 4) % 2;
  if (x > -6 && x < 326 && fuera(x - 3, 142)) { R.rect(x - 2, 132, x + 2, 141, K.metal0); R.disco(x, 129, 2.2, K.metal0); R.pset(x - 2, 141 + a, K.metal0); R.pset(x + 2, 142 - a, K.metal0); R.pset(x - 2, 128, K.muro3); R.pset(x - 2, 133, K.muro3);
    R.rect(x + 3, 133, x + 5, 135, K.holo1); R.pset(x + 3, 133, K.holo3); }
}

// la cúpula de cristal del campo de fuerza (centro de la base cx, cy; semiejes rx y alto H; la base, una elipse de ry):
// una red de rombos punteada que brilla en ondas que suben, el filo encendido, un reflejo arriba a la izquierda y el aro
// de la base; brillo: cuánto se ve (la grieta la hace parpadear); cerca: [x, y, r] donde los rombos se encienden
function v_domo(R, t, cx, cy, rx, H, ry, brillo = 1, cerca = null) {
  const K = v_C;
  for (let y = Math.max(0, Math.floor(cy - H)); y <= cy; y++) { const v = (y - cy) / H, w = rx * Math.sqrt(Math.max(0, 1 - v * v));
    for (let x = Math.ceil(cx - w); x <= Math.floor(cx + w); x++) { const u = (x - cx) / rx, q = Math.sqrt(u * u + v * v); let a = 0, col = K.holo3;
      if (q > 0.985) { a = 0.85; col = K.holo4; }
      else if (q > 0.93) a = (q - 0.93) / 0.055 * 0.5;
      const red = (((x + 2 * y) % 14 + 14) % 14 === 0 || ((x - 2 * y) % 14 + 14) % 14 === 0) && ((x + y) & 1);
      if (red) { const ola = Math.sin((cy - y) * 0.12 + q * 4 - t * 2.6); a = Math.max(a, 0.1 + 0.2 * Math.max(0, ola)); }
      if (cerca) { const dd = Math.hypot(x - cerca[0], y - cerca[1]); if (dd < cerca[2] && (red || dd < cerca[2] * 0.25)) { a = Math.max(a, 0.9 * (1 - dd / cerca[2])); col = K.holo4; } }
      if (q > 0.72 && q < 0.8 && u < -0.25 && v < -0.35 && ((x + y) & 1)) a = Math.max(a, 0.35);
      a *= brillo; if (a > 0.02) R.pset(x, y, v_mez(R.pget(x, y), col, a)); } }
  for (let k = 0; k < 220; k++) { const a = Math.PI * k / 219, x = Math.round(cx - Math.cos(a) * rx), y = Math.round(cy + Math.sin(a) * ry); if ((k + Math.floor(t * 10)) % 5 && brillo > 0.3) R.pset(x, y, v_mez(R.pget(x, y), K.holo3, 0.7 * brillo)); }
}

// las ondas de luz del golpe en el campo de fuerza: anillos que se abren desde el punto (recortados a la cúpula por dentro)
function v_ondas(R, t, p, u, dentro, rmax = 40) {
  const K = v_C;
  for (let i = 0; i < 3; i++) { const f = u * 1.6 - i * 0.22; if (f <= 0 || f > 1) continue; const r = 3 + f * rmax, n = Math.round(r * 7);
    for (let k = 0; k < n; k++) { const a = k / n * 2 * Math.PI, x = Math.round(p[0] + Math.cos(a) * r), y = Math.round(p[1] + Math.sin(a) * r * 0.8); if (!dentro(x, y)) continue; if ((k + i) % (f < 0.5 ? 1 : 2)) continue; R.pset(x, y, v_mez(R.pget(x, y), f < 0.4 ? K.holo4 : K.holo3, 1 - f * 0.7)); } }
  if (u > 0.05 && u < 0.35) { R.disco(p[0], p[1], 4 - u * 8, K.holo4); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, l = 4 + u * 20; R.linea(p[0], p[1], Math.round(p[0] + Math.cos(a) * l), Math.round(p[1] + Math.sin(a) * l * 0.8), K.holo3); } }
}

// una piedrecita gris con luz y sombra (r 1–3) y su estela
function v_piedra(R, x, y, r, px, py) {
  const K = v_C; if (px != null) R.linea(Math.round(px), Math.round(py), Math.round(x), Math.round(y), v_mez(K.rocaL, K.muro1, 0.5));
  R.disco(x, y, r + 0.6, K.k); R.disco(x, y, r, K.roca); R.pset(Math.round(x - r * 0.4), Math.round(y - r * 0.4), K.rocaL); R.pset(Math.round(x + r * 0.4), Math.round(y + r * 0.3), K.rocaS);
}

// la trayectoria de la piedra del golpe: sale de «de», choca en p a u = 0,45 y vuelve rebotando hasta caer en «cae»
function v_golpe(R, t, u, de, p, cae, r) {
  const pos = (u) => { if (u < 0.45) { const f = u / 0.45; return [de[0] + (p[0] - de[0]) * f, de[1] + (p[1] - de[1]) * f - Math.sin(f * Math.PI) * 14]; }
    const f = (u - 0.45) / 0.55, x = p[0] + (cae[0] - p[0]) * f, base = p[1] + (cae[1] - p[1]) * Math.min(1, f * 1.4); const bote = f < 0.72 ? 0 : Math.abs(Math.sin((f - 0.72) / 0.28 * Math.PI * 2)) * 6 * (1 - f); return [x, Math.min(cae[1], base) - bote]; };
  if (u <= 0 || u >= 1) { if (u >= 1) v_piedra(R, cae[0], cae[1], r); return; }
  const [x, y] = pos(u), [px, py] = pos(Math.max(0, u - 0.04)); v_piedra(R, x, y, r, px, py);
}

// las grietas del cristal: ramas quebradas que salen de p y crecen con g (0–1), con anillos a medio camino, el filo
// claro, las esquirlas que brillan y, al final, trocitos que caen; dentro(x, y): dónde se pueden ver
function v_grieta(R, t, p, g, l = 46, dentro = () => true) {
  const K = v_C; if (g <= 0) return;
  const ramas = [];
  for (let k = 0; k < 8; k++) { let a = k * Math.PI / 4 + (h(k, 1, 95) - 0.5) * 0.6, x = p[0], y = p[1]; const pts = [[x, y]], L = l * (0.55 + h(k, 2, 95) * 0.5) * g;
    for (let s = 0; s < L; s += 5) { a += (h(k, s, 96) - 0.5) * 0.7; x += Math.cos(a) * 5; y += Math.sin(a) * 4; pts.push([x, y]); }
    ramas.push(pts); }
  for (const pts of ramas) for (let i = 1; i < pts.length; i++) { const [a, b] = pts[i - 1], [c, d] = pts[i]; const n = Math.max(Math.abs(c - a), Math.abs(d - b)) | 0;
    for (let s = 0; s <= n; s++) { const x = Math.round(a + (c - a) * s / (n || 1)), y = Math.round(b + (d - b) * s / (n || 1)); if (!dentro(x, y)) continue; R.pset(x, y, K.blanco); R.pset(x + 1, y, v_mez(R.pget(x + 1, y), K.holo3, 0.6)); } }
  if (g > 0.4) for (const f of [0.35, 0.7]) { if (g < f + 0.2) continue; for (let k = 0; k < 8; k++) { const A = ramas[k], B = ramas[(k + 1) % 8], ia = Math.floor((A.length - 1) * f), ib = Math.floor((B.length - 1) * f); if (ia < 1 || ib < 1) continue;
    const [a, b] = A[ia], [c, d] = B[ib]; const n = Math.max(Math.abs(c - a), Math.abs(d - b)) | 0; for (let s = 0; s <= n; s++) { const x = Math.round(a + (c - a) * s / (n || 1)), y = Math.round(b + (d - b) * s / (n || 1)); if (dentro(x, y)) R.pset(x, y, v_mez(R.pget(x, y), K.blanco, 0.8)); } } }
  for (let k = 0; k < 10; k++) { const r = ramas[k % 8], q = r[Math.min(r.length - 1, 1 + (k % 3))]; if (Math.sin(t * 6 + k * 2) > 0.6 && dentro(Math.round(q[0]), Math.round(q[1]))) { R.pset(Math.round(q[0]), Math.round(q[1]) - 1, K.blanco); R.pset(Math.round(q[0]) - 1, Math.round(q[1]), K.holo4); } }
  if (g > 0.85) for (let k = 0; k < 6; k++) { const f = ((t * 0.8 + k / 6) % 1), x = Math.round(p[0] + (h(k, 3, 97) - 0.5) * 30 + f * (k % 2 ? 6 : -6)), y = Math.round(p[1] + f * 40); R.pset(x, y, K.holo4); R.pset(x + 1, y + 1, K.holo2); }
  R.disco(p[0], p[1], 2, K.blanco);
}

// la flecha con su cable: sale de «de», vuela en arco y se clava en p (u = 1); el cable cuelga desde «de» con un brillo que corre
function v_flecha(R, t, u, de, p) {
  const K = v_C; if (u <= 0) return;
  const f = Math.min(1, u), pos = (f) => [de[0] + (p[0] - de[0]) * f, de[1] + (p[1] - de[1]) * f - Math.sin(f * Math.PI) * 10];
  const [x, y] = pos(f), [px, py] = pos(Math.max(0, f - 0.03)), a = Math.atan2(y - py, x - px), ca = Math.cos(a), sa = Math.sin(a);
  for (let s = 0; s <= 20; s++) { const g = s / 20, q = pos(f * g), cuelga = Math.sin(g * Math.PI) * (u >= 1 ? 5 : 2); const cx = Math.round(q[0]), cy = Math.round(q[1] + cuelga);
    R.pset(cx, cy, Math.abs(g - ((t * 1.2) % 1)) < 0.06 ? K.holo4 : K.oroS); }
  for (let s = -9; s <= 0; s++) R.pset(Math.round(x + ca * s), Math.round(y + sa * s), K.tronco);
  for (let s = -9; s <= -7; s++) for (const d of [-1, 1]) R.pset(Math.round(x + ca * s - sa * d * 1.4), Math.round(y + sa * s + ca * d * 1.4), K.rojo);
  R.pset(Math.round(x + ca), Math.round(y + sa), K.metal4); R.pset(Math.round(x), Math.round(y), K.blanco);
}

// la cúpula, cámara general: la maqueta física sobre su mesa redonda y la cúpula del campo de fuerza
function v_cupula(R, t, o) {
  const { rect, pset } = R, K = v_C, cx = 160, cy = 138, rx = 120, ry = 22, H = 108;
  v_capa(R, 'v-lejos', () => v_salaLejos(R));
  v_pilotosLejos(R, t);
  // la mesa redonda: la sombra en el suelo, el canto de metal en paneles con luz a la izquierda y la tira de pilotos
  for (let y = 0; y <= 10; y++) { const w = Math.round((rx + 10) * Math.sqrt(1 - (y / 11) ** 2)); for (let x = cx - w; x <= cx + w; x++) pset(x, 170 + y, v_mez(R.pget(x, 170 + y), K.k, 0.55)); }
  for (let x = cx - rx; x <= cx + rx; x++) { const u = (x - cx) / rx, yb = Math.round(cy + ry * Math.sqrt(Math.max(0, 1 - u * u))), c = u < -0.6 ? K.metal3 : u < 0.2 ? K.metal2 : u < 0.7 ? K.metal1 : K.metal0;
    for (let y = yb + 6; y <= yb + 14; y++) pset(x, y, c); pset(x, yb + 6, K.metal4); pset(x, yb + 14, K.k);
    if (((x - cx) % 20 + 20) % 20 === 0) for (let y = yb + 7; y < yb + 14; y++) pset(x, y, K.metal0);
    pset(x, yb + 11, (((x >> 1) + Math.floor(t * 8)) % 16 === 0) ? K.holo4 : v_mez(c, K.holo1, 0.5)); }
  // la maqueta del prado, con flores, pájaros y lucecitas
  const g = v_prado(R, t, cx, cy, rx, ry, { grosor: 6, luces: o.luces ?? 0, pajaros: true });
  const p = o.punto ?? [262, 84], dentro = (x, y) => { const u = (x - cx) / rx, v = (y - cy) / H; return y <= cy && u * u + v * v < 1; };
  // la piedra y la flecha, por dentro de la cúpula
  if (o.golpe != null) v_golpe(R, t, o.golpe, [200, 128], p, [176, 140], 2);
  if (o.flecha != null) v_flecha(R, t, o.flecha, [g.arbol[0] + 2, g.arbol[1] + 2], p);
  // la cúpula: parpadea si se agrieta, se enciende alrededor del golpe
  const gr = o.grieta ?? 0, br = gr > 0.6 ? (Math.sin(t * 23) > 0 ? 1 : 0.45) : 1, gp = o.golpe ?? 0, imp = gp > 0.42 && gp < 0.9 ? [p[0], p[1], 34 * (1 - (gp - 0.42) / 0.48)] : null;
  v_domo(R, t, cx, cy, rx, H, ry, br, imp);
  if (gp > 0.42) v_ondas(R, t, p, (gp - 0.42) / 0.58, dentro, 48);
  v_grieta(R, t, p, gr, 54, dentro);
  return { suelo: 176, maqueta: [cx - rx, cy - H, cx + rx, cy + ry + 14], punto: p, cima: g.cima, arbol: g.arbol, mesa: [cx - rx, cy + ry + 6, cx + rx, cy + ry + 14],
    sitios: [[8, 176], [30, 177], [276, 176], [296, 177]], libre: [[0, 52, 176], [268, 318, 176], [100, 220, 179]] };
}

// el arco del campo de fuerza en la cámara 'borde': x del filo a la altura y
const v_arco = (y) => -60 + Math.sqrt(Math.max(0, 300 * 300 - (190 - y) ** 2));

// la cúpula de cerca, cámara 'borde': el prado de maqueta grande, el precipicio y la pared del campo de fuerza
function v_borde(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = v_C, suelo = 120;
  v_capa(R, 'v-borde', () => {
    v_salaLejos(R);
    // la montañita de maqueta al fondo a la izquierda y las colinas con bosque
    for (let x = 0; x <= 92; x++) { const top = Math.round(Math.min(52 + Math.abs(x - 22) * 0.95, 70 + Math.abs(x - 50) * 1.3) + (h(x >> 1, 0, 98) - 0.5) * 3);
      for (let y = top; y < suelo; y++) { const luz = x < 22 + (y - 52) * 0.55 || (x > 40 && x < 50 + (y - 70) * 0.5), alt = suelo - y; let c = luz ? K.roca : K.rocaS;
        if ((y + Math.round(x * (luz ? 0.6 : -0.6))) % 6 === 0 && h(x, y, 66) < 0.55) c = luz ? K.rocaS : K.k; else if (h(x, y, 67) < 0.05) c = K.rocaL;
        if (y < 62 + (h(x, 2, 68) - 0.5) * 4 || (x > 42 && x < 58 && y < 75 + (h(x, 3, 68) - 0.5) * 3)) c = luz ? K.nieve : K.nieveS;
        if (y === top && luz) c = K.blanco; if (alt < 14 + h(x, 1, 69) * 6) c = h(x, y, 69) < 0.45 ? K.bosqueS : K.bosque; pset(x, y, c); } }
    for (let x = 60; x < 200; x++) { const top = Math.round(suelo - 10 - 8 * Math.sin((x - 60) / 140 * Math.PI) - 3 * Math.sin(x * 0.2)); for (let y = top; y < suelo; y++) pset(x, y, (y - top) < 2 ? K.bosqueL : h(x, y, 99) < 0.4 ? K.bosqueS : K.bosque); if (x % 5 === 0) { pset(x, top - 1, K.bosque); pset(x, top - 2, K.bosqueS); } }
    // el canto cortado de la maqueta: hierba, tierra en capas, piedra, y la bandeja de metal debajo
    for (let x = 0; x < 320; x++) { const xa = v_arco(suelo); if (x > xa - 34) break;
      for (let y = suelo; y < 150; y++) { const j = y - suelo, p = Math.sin(x * 0.09 + j * 0.5) + Math.sin(x * 0.033 - j * 0.3 + 2); let c = j < 18 ? (p > 0.9 ? K.pradoL : p < -0.9 ? K.pradoS : h(x, y, 106) < 0.12 ? K.pradoS : h(x, y, 107) < 0.05 ? K.pradoL : K.prado) : j < 21 ? K.pradoD : j < 32 ? K.tierra : j < 40 ? K.tierraS : K.rocaS; if (j >= 21 && h(x, y, 100) < 0.15) c = v_mez(c, K.k, 0.35); if (j >= 21 && h(x, y, 101) < 0.06) c = K.arena; pset(x, y, c); } }
    // el precipicio: la roca que cae hacia la grieta oscura del borde, con estratos
    for (let y = suelo; y < 150; y++) { const xa = v_arco(suelo) - 34, xb = v_arco(y) - 2;
      for (let x = Math.round(xa - 6 + (y - suelo) * 0.25); x < xb; x++) { const j = (x - xa) / (xb - xa + 1); pset(x, y, j > 0.5 ? K.k : (y % 6 === 0 ? K.rocaS : h(x, y, 102) < 0.5 ? K.roca : K.rocaS)); } }
    // la bandeja de metal de la maqueta, el canto y sus tornillos
    for (let x = 0; x < 320; x++) { const xb = v_arco(150); if (x > xb + 6) break; rect(x, 150, x, 163, x < 60 ? K.metal3 : x < 170 ? K.metal2 : K.metal1); }
    rect(0, 150, Math.round(v_arco(150) + 6), 150, K.metal4); rect(0, 163, Math.round(v_arco(150) + 6), 163, K.k);
    for (let x = 14; x < v_arco(150); x += 26) { disco(x, 156, 1.4, K.metal0); pset(x - 1, 155, K.metal4); }
    // el suelo de la sala a la derecha, más cerca
    for (let y = 164; y <= 179; y++) rect(0, y, 319, y, v_mez(K.suelo2, K.suelo0, (y - 164) / 16));
  });
  v_pilotosLejos(R, t, (x, y) => x > v_arco(y) + 2);
  // la tira de luz de la bandeja
  for (let x = 2; x < v_arco(150); x += 3) pset(x, 159, ((x + Math.floor(t * 20)) % 30) < 3 ? K.holo4 : K.holo1);
  // la hierba alta que se mece y las flores grandes
  for (let x = 0; x < v_arco(suelo) - 36; x++) { const m = Math.round(Math.sin(t * 2 + x * 0.15) * 1.2), al = 2 + Math.floor(h(x, 0, 103) * 4); for (let j = 0; j < al; j++) pset(x + (j > 1 ? m : 0), suelo - j, j === al - 1 ? K.pradoL : K.prado); }
  for (let k = 0; k < 34; k++) { const x = Math.round(h(k, 1, 104) * (v_arco(suelo) - 44)), y = suelo + 1 + Math.round(h(k, 2, 104) * 15), m = Math.sin(t * 2 + x * 0.15) > 0.3 ? 1 : 0, c = [K.flor1, K.flor2, K.flor3, K.flor4][k % 4];
    pset(x, y - 1, K.pradoD); pset(x + m, y - 2, c); pset(x + m - 1, y - 2, c); pset(x + m + 1, y - 2, c); pset(x + m, y - 3, c); pset(x + m, y - 2, K.flor1 === c ? K.ambar : K.flor1); }
  // tres abetos de maqueta grandes y una roca
  for (const [x, al] of [[24, 34], [52, 26], [110, 30]]) { const m = Math.sin(t * 1.3 + x) > 0.5 ? 1 : 0; rect(x - 1, suelo - 4, x + 1, suelo + 2, K.tronco);
    for (let j = 0; j < al; j++) { const hw = Math.round(1 + (j % 8) * 0.7 + j * 0.22); for (let i = -hw; i <= hw; i++) pset(x + i + (j < al * 0.35 ? m : 0), suelo - al - 2 + j, i < -hw * 0.3 ? K.bosqueL : (j % 8 === 7 ? K.bosqueS : i > hw * 0.5 ? K.bosqueS : K.bosque)); } }
  disco(150, suelo + 4, 6, K.k); disco(150, suelo + 3, 5, K.roca); disco(148, suelo + 1, 2.5, K.rocaL); rect(145, suelo + 6, 155, suelo + 8, K.pradoD);
  // dos mariposas de maqueta que revolotean sobre las flores
  for (let k = 0; k < 2; k++) { const x = Math.round(60 + k * 70 + Math.sin(t * 0.9 + k * 3) * 26), y = Math.round(suelo - 8 + Math.sin(t * 2.3 + k) * 5), a = Math.floor(t * 10 + k) % 2, c = k ? K.flor2 : K.flor1;
    pset(x, y, K.k); pset(x - 1, y - a, c); pset(x + 1, y - a, c); if (!a) { pset(x - 1, y + 1, c); pset(x + 1, y + 1, c); } }
  // dos lucecitas de tributos en el prado
  for (let k = 0; k < (o.luces ?? 2); k++) { const x = Math.round(80 + k * 37 + Math.sin(t * 0.6 + k) * 3), y = Math.round(suelo + 6 + k * 3 - 4 + Math.sin(t * 2 + k)); pset(x, y, K.blanco); for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) pset(x + dx, y + dy, K.oroL); }
  // la pared del campo de fuerza: una franja en curva con rombos, el filo encendido y las ondas que suben
  const p = o.punto ?? [Math.round(v_arco(90)), 90], gp = o.golpe ?? 0, gr = o.grieta ?? 0, br = gr > 0.6 ? (Math.sin(t * 23) > 0 ? 1 : 0.45) : 1;
  const imp = gp > 0.42 && gp < 0.9 ? 30 * (1 - (gp - 0.42) / 0.48) : 0;
  for (let y = 0; y < 164; y++) { const xa = v_arco(y);
    for (let x = Math.max(0, Math.floor(xa - 40)); x <= Math.min(319, Math.ceil(xa + 3)); x++) { const d = x - xa; let a = 0, col = K.holo3;
      if (d > -1.5) { a = 0.9; col = K.holo4; } else if (d > -5) a = 0.45 + 0.15 * Math.sin(y * 0.15 - t * 4);
      else { const red = (((x + 2 * y) % 12 + 12) % 12 === 0 || ((x - 2 * y) % 12 + 12) % 12 === 0); if (red) a = (0.12 + 0.25 * Math.max(0, Math.sin(-y * 0.1 + d * 0.1 + t * 2.6))) * (1 + d / 40); }
      if (imp > 0) { const dd = Math.hypot(x - p[0], y - p[1]); if (dd < imp) { a = Math.max(a, 0.9 * (1 - dd / imp)); col = K.holo4; } }
      if (a > 0.02) pset(x, y, v_mez(R.pget(x, y), col, a * br)); } }
  const dentro = (x, y) => x < v_arco(y) + 2 && x > v_arco(y) - 60 && y < 164;
  if (o.golpe != null) v_golpe(R, t, gp, [p[0] - 70, suelo - 2], p, [p[0] - 110, suelo + 4], 2.6);
  if (o.flecha != null) v_flecha(R, t, o.flecha, [110, suelo - 30], p);
  if (gp > 0.42) v_ondas(R, t, p, (gp - 0.42) / 0.58, dentro, 44);
  v_grieta(R, t, p, gr, 50, (x, y) => y < 164 && x < v_arco(y) + 3);
  return { suelo: 178, prado: suelo, punto: p, borde: [Math.round(v_arco(0)), 0, Math.round(v_arco(163)), 163], arboles: [[24, suelo], [52, suelo], [110, suelo]],
    sitios: [[262, 178], [290, 178]], libre: [[252, 318, 178]] };
}

// el reloj, cámara general: la nave a oscuras, el aro proyector del suelo y el holograma de la isla con su manecilla
// (el holograma, más bajo y algo más estrecho, deja libres la barra del año y la esquina de Atom)
function v_relojGeneral(R, t, o) {
  const { pset } = R, K = v_C, cx = 160, cy = 90, rx = 116, ry = 48;
  v_capa(R, 'c-relojSala', () => c_relojSala(R));
  c_relojVida(R, t, cx);
  // el aro proyector del suelo: el canto de metal, la lente y las luces que giran
  for (let y = -9; y <= 9; y++) { const w = Math.round(78 * Math.sqrt(1 - (y / 9.5) ** 2)); for (let x = -w; x <= w; x++) { const r = Math.hypot(x / 78, y / 9); pset(cx + x, 162 + y, r > 0.82 ? (x < -30 ? K.metal3 : K.metal2) : r > 0.74 ? K.k : (r < 0.6 && Math.sin(r * 30 - t * 5) > 0.7 ? K.holo1 : K.holo0)); } }
  for (let k = 0; k < 24; k++) { const a = t * 1.2 + k * Math.PI / 12; pset(Math.round(cx + Math.cos(a) * 70), Math.round(162 + Math.sin(a) * 8), Math.sin(a) > 0 ? K.holo4 : K.holo1); }
  // los haces que suben del aro al holograma
  for (let y = cy + 20; y < 160; y++) { const f = (y - cy - 20) / (160 - cy - 20), w = Math.round(rx * 0.9 * (1 - f) + 66 * f);
    for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { const x = cx + s * (w - i * 2); if ((y + i + Math.floor(t * 9)) % 3) pset(x, y, v_mez(R.pget(x, y), K.holo2, 0.5 - i * 0.12)); }
    for (let x = cx - w; x <= cx + w; x += 1) if ((x * 7 + y * 3 + Math.floor(t * 6)) % 17 === 0) pset(x, y, v_mez(R.pget(x, y), K.holo3, 0.4)); }
  v_isla(R, t, cx, cy, rx, ry, { holo: true, hora: o.hora ?? (t * 0.4) % 12 });
  // las horas del filo: 12, 3, 6 y 9 (el 12, bien por debajo de la barra del año)
  v_cifrasG(R, '12', cx, cy - ry - 6, 1); v_cifrasG(R, '3', cx + rx + 11, cy + 4, 1); v_cifrasG(R, '6', cx, cy + ry + 11, 1); v_cifrasG(R, '9', cx - rx - 11, cy + 4, 1);
  for (let k = 0; k < (o.luces ?? 0); k++) { const a = h(k, 1, 91) * 6.28, d = 0.62 + h(k, 2, 91) * 0.3, x = Math.round(cx + Math.sin(a) * d * rx), y = Math.round(cy - Math.cos(a) * d * ry - 2 + Math.sin(t * 2 + k)); if (Math.sin(t * 3 + k * 2) > -0.8) { pset(x, y, K.blanco); pset(x + 1, y, K.oroL); pset(x, y + 1, K.oroL); } }
  return { suelo: 174, centro: [cx, cy], radios: [rx, ry], maqueta: [cx - rx, cy - ry, cx + rx, cy + ry], aro: [cx - 78, 153, cx + 78, 171],
    sitios: [[8, 174], [34, 176], [272, 174], [296, 176]], libre: [[0, 52, 174], [264, 318, 174]] };
}
// el reloj, cámara 'sector': un sector de cerca en la mesa holográfica (la manecilla pasa por encima) y el canto de la
// mesa; vida: las bandadas de pájaros de holograma que dan vueltas sobre el sector de las cuatro, la bruma que sale de
// la laguna, la franja de barrido que cruza y los pilotos del panel
function v_sector(R, t, o) {
  const { rect, pset } = R, K = v_C;
  v_capa(R, 'c-sectorFondo', () => c_sectorFondo(R));
  v_isla(R, t, -90, -110, 460, 380, { holo: true, hora: o.hora ?? 3.7 + (t * 0.15) % 1.8, y1: 149 });
  // la bruma que sale de la laguna: velos tramados que suben y se deshacen
  for (let k = 0; k < 7; k++) { const u = ((t * 0.18 + k / 7) % 1), x0 = Math.round(10 + k * 22 + Math.sin(t * 0.5 + k) * 6), y0 = Math.round(40 - u * 30);
    for (let j = 0; j < 5; j++) for (let i = 0; i < 14; i++) { const x = x0 + i + Math.round(Math.sin(j + t + k) * 2), y = y0 + j; if (y < 0 || y > 149 || x < 0 || x > 319) continue; if (((x + y) & 1) && h(i, j, 314 + k) < 0.6 * (1 - u)) pset(x, y, v_mez(R.pget(x, y), K.espuma, 0.3)); } }
  // las bandadas: pájaros de holograma (aleteo de dos fotogramas) que giran sobre el sector
  for (let k = 0; k < 9; k++) { const a = t * (0.9 + (k % 3) * 0.15) + k * 0.7, rr = 22 + (k % 4) * 7, x = Math.round(190 + Math.cos(a) * rr * 1.6), y = Math.round(92 + Math.sin(a) * rr * 0.7), al = Math.floor(t * 8 + k) % 2;
    for (let i = -3; i <= 3; i++) pset(x + i + 2, y + 5, v_mez(R.pget(x + i + 2, y + 5), K.selvaS, 0.5));
    R.rect(x - 1, y, x + 1, y + 1, K.holo4); pset(x + 2, y, K.holo3); for (const s of [-1, 1]) for (let i = 1; i <= 3; i++) pset(x + s * (i + 1), y - (al ? i : 1 - Math.min(i, 2)) + (al ? 0 : 1), i === 3 ? K.holo2 : K.holo3); }
  // la rejilla del holograma y la franja de barrido que cruza de arriba abajo
  for (let y = 0; y < 150; y += 20) for (let x = 0; x < 320; x += 2) pset(x, y, v_mez(R.pget(x, y), K.holo3, 0.25));
  for (let x = 0; x < 320; x += 20) for (let y = 0; y < 150; y += 2) pset(x, y, v_mez(R.pget(x, y), K.holo3, 0.25));
  { const yb = Math.round(((t * 22) % 190) - 20); for (let y = Math.max(20, yb); y < Math.min(142, yb + 4); y++) for (let x = 0; x < 320; x += 1) if ((x + y) & 1) pset(x, y, v_mez(R.pget(x, y), K.holo4, 0.18 + (y - yb) * 0.05)); }
  for (let y = 142; y < 150; y++) for (let x = 0; x < 320; x++) if (h(x, y, 105) < (y - 141) / 9) pset(x, y, K.muro1);
  // la barra del año y la esquina de Atom, en calma: el holograma se apaga allí
  v_velo(R, 0, 0, 319, 16, K.muro1, 0.6); v_velo(R, 0, 17, 319, 19, K.muro1, 0.3); v_velo(R, 272, 17, 319, 48, K.muro1, 0.6);
  // los pilotos del panel de la mesa
  for (let x = 4; x < 320; x += 16) pset(x + 2, 157, Math.sin(t * 3 + x) > 0 ? K.holo2 : K.holo0);
  return { suelo: 176, sitios: [[24, 176], [70, 176], [250, 176]], mesa: [0, 150, 319, 162], libre: [[0, 319, 176]] };
}
// mezcla dos colores (de a hacia b en k, 0–1)
function r_mez(a, b, k) { const r1 = a & 255, g1 = (a >>> 8) & 255, b1 = (a >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((b >>> 16) & 255) - b1) * k) << 16) | (Math.round(g1 + (((b >>> 8) & 255) - g1) * k) << 8) | Math.round(r1 + ((b & 255) - r1) * k)) >>> 0; }

// umbral de trama ordenada 4 × 4 (para degradados y luces tramadas)
const r_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const r_um = (x, y) => (r_BAYER[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// los búferes de lo fijo: se pintan una vez por clave y se copian en cada fotograma
const r_BUF = new Map();

function r_fijo(R, clave, pinta) {
  let b = r_BUF.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); R.recorte(null); pinta(); R.recorte(null); R.usar(prev); r_BUF.set(clave, b); }
  R.copiar(b);
}

// degradado vertical tramado entre varias paradas de color, en el rectángulo (respeta R.recorte)
function r_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, f > r_um(x, y) ? cols[i + 1] : cols[i]); }
}

// una luz tramada: mezcla lo que hay con col, más fuerte hacia (cx, cy), en una elipse de radios rx, ry (a: fuerza 0–1)
function r_halo(R, cx, cy, rx, ry, col, a) {
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, Math.ceil(cy + ry)); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, Math.ceil(cx + rx)); x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d >= 1) continue;
    const q = Math.floor((1 - d) * 3 + r_um(x, y)) / 3; if (q <= 0) continue;
    R.pset(x, y, r_mez(R.pget(x, y), col, a * q)); }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba a la izquierda)
function r_nube(R, cx, cy, w, c1, c2, c3) {
  const r = Math.max(2, w * 0.3), B = [[-w * 0.4, 1, r * 0.72], [0, -1, r], [w * 0.4, 0.5, r * 0.8], [w * 0.16, -r * 0.55, r * 0.6]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1.5, rr, c3);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.94, c2);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1.2, rr * 0.55, c1);
}

// nubes que cruzan a su velocidad: lista de [y, ancho, velocidad px/s, fase]; cols [luz, cuerpo, sombra]
function r_nubes(R, t, lista, cols) { for (const [y, w, v, f] of lista) { const L = 360 + w * 2, x = (((f + t * v) % L) + L) % L - w - 20; r_nube(R, x, y, w, ...cols); } }

// ropa, piel y pelo de la gente pequeña de fondo
const r_ROPA = ['#c84a4a', '#4a7ac8', '#e8c040', '#5aa85a', '#e8e0d0', '#8a5ac8', '#e88a3a', '#3a3a4a', '#d86a9a', '#4ab8b0'].map(hex);

const r_PIEL = ['#f6c290', '#d8a070', '#a8704a', '#e8b888'].map(hex);

const r_PELO = ['#1c1424', '#3a2418', '#6a4426', '#2a2430', '#a8a098'].map(hex);

// una persona pequeña de fondo (10 px de alto a s 1; pies en (x, y), x en el centro): k elige ropa, piel y pelo;
// o.anda (camina), o.dir, o.brazo (0–1: levanta el brazo con tres dedos), o.ropa / o.pelo / o.pant (colores), o.s
// (escala entera), o.silueta (todo de un color: contraluz)
function r_persona(R, x, y, k, t, o = {}) {
  const s = o.s ?? 1, X = Math.round(x), Y = Math.round(y), sil = o.silueta;
  const ropa = sil ?? o.ropa ?? r_ROPA[k % 10], piel = sil ?? r_PIEL[(k * 3 + 1) % 4], pelo = sil ?? o.pelo ?? r_PELO[(k * 7 + 2) % 5], pant = sil ?? o.pant ?? (k % 3 ? hex('#3a4a6a') : hex('#2a2a32'));
  const ropaS = sil ?? r_mez(ropa, C.k, 0.3), zap = sil ?? hex('#1c1820');
  const paso = o.anda ? Math.floor(t * 6 + k) % 2 : 0, sube = o.anda && paso ? 1 : 0, d = o.dir ?? 1;
  const p = (i, j, c) => R.rect(X + i * s, Y - (j + 1) * s + 1 - sube * s, X + i * s + s - 1, Y - j * s - sube * s, c);
  p(-1, 0, zap); p(1, 0, zap); if (o.anda) { p(paso ? -1 : 1, 0, pant); }
  p(-1, 1, pant); p(1, 1, pant); p(-1, 2, pant); p(0, 2, pant); p(1, 2, pant);
  for (let j = 3; j <= 6; j++) { p(-1, j, ropa); p(0, j, ropa); p(1, j, j > 3 ? ropaS : ropa); }
  const br = o.brazo ?? 0, sw = o.anda ? (paso ? 1 : 0) : 0;
  p(-2, 5, ropa); p(-2, 4, ropa); p(-2, 3 + sw, piel);
  if (br > 0.05) { const L = Math.round(br * 4); for (let j = 5; j <= 6 + L; j++) p(2, j, ropa); p(2, 7 + L, piel); p(1, 8 + L, piel); p(2, 8 + L, piel); p(3, 8 + L, piel); p(2, 9 + L, piel); }
  else { p(2, 5, ropaS); p(2, 4, ropaS); p(2, 3 + (1 - sw), piel); }
  for (let j = 7; j <= 8; j++) for (let i = -1; i <= 1; i++) p(i, j, piel);
  p(-1, 9, pelo); p(0, 9, pelo); p(1, 9, pelo); p(d > 0 ? -1 : 1, 8, pelo);
  if (!sil && s > 1) p(d > 0 ? 1 : -1, 8, C.k);
}

// pictogramas sin letras (para pancartas, lomos y pantallas)
const r_PICTO = {
  corazon: ['.#.#.', '#####', '#####', '.###.', '..#..'],
  paloma: ['....##', '.#.###', '######', '.####.', '..#...'],
  tres: ['#.#.#', '#.#.#', '#.#.#', '#####', '.###.', '.###.'],
  circulo: ['.###.', '#...#', '#...#', '#...#', '.###.'],
  ave: ['#...#', '##.##', '.###.', '..#..'],
  llama: ['..#..', '.##..', '.###.', '#####', '.###.'],
  libro: ['##.##', '#####', '#####', '#####', '##.##'],
  play: ['#....', '###..', '#####', '###..', '#....'],
  nota: ['..##', '..#.', '..#.', '###.', '###.'],
  rana: ['#...#', '#####', '#.#.#', '#####', '.###.'],
  coche: ['.###..', '#####.', '######', '.#..#.'],
  pila: ['.##.', '####', '#..#', '#..#', '####'],
};

function r_picto(R, nombre, x, y, c, s = 1) { const f = r_PICTO[nombre]; if (!f) return; f.forEach((fila, j) => { for (let i = 0; i < fila.length; i++) if (fila[i] === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); }); }

// lo mismo, pero con pset (respeta R.recorte)
function r_pictoR(R, nombre, x, y, c, s = 1) { const f = r_PICTO[nombre]; if (!f) return; f.forEach((fila, j) => { for (let i = 0; i < fila.length; i++) if (fila[i] === '#') for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) R.pset(x + i * s + a, y + j * s + b, c); }); }

// tablas de madera vistas de frente (vetas, juntas, nudos y canto de luz), de x0,y0 a x1,y1
function r_madera(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, tabla = 8) {
  R.rect(x0, y0, x1, y1, c);
  for (let y = y0, f = 0; y <= y1; y += tabla, f++) {
    if (y > y0) R.rect(x0, y, x1, y, cD);
    for (let g = 0; g < 3; g++) { const gy = y + 2 + Math.round(h(f, g, 410 + k) * (tabla - 4)); let x = x0 - Math.round(h(f, g, 411 + k) * 20);
      while (x < x1) { const L = 6 + Math.round(h(x, gy, 412 + k) * 26); if (gy < y1 && h(x, g, 413 + k) < 0.7) R.rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 2 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 414 + k) * 10); } }
  }
}

const r_S = {
  pared: hex('#2a3248'), paredL: hex('#343e58'), paredS: hex('#222a3c'), motivo: hex('#3c4864'), zocalo: hex('#30394e'), zocaloL: hex('#4a5670'), zocaloS: hex('#1e2434'),
  suelo: hex('#4a3428'), sueloL: hex('#5c4232'), sueloS: hex('#3a281e'), junta: hex('#24180f'), lampara: hex('#f0d8a0'), calida: hex('#e8b878'),
  sofa: hex('#4a6a7a'), sofaL: hex('#6a8a98'), sofaS: hex('#344c5a'), sofaD: hex('#22343e'), manta: hex('#c8604a'), mantaS: hex('#9a4434'), mantaL: hex('#e88a6a'),
  alfombra: hex('#7a2e34'), alfombraS: hex('#5a2228'), alfombraL: hex('#c8a878'), alfombraA: hex('#2e3a5a'),
  madera: hex('#5a3e2e'), maderaL: hex('#7a5a42'), maderaS: hex('#3e2a1e'), maderaD: hex('#2a1c14'),
  negro: hex('#121216'), marco: hex('#24242c'), cristal: hex('#0e1430'),
};

// el color con que la tele baña el cuarto: magenta del concurso, ocre del desierto, blanco en el cambio
function r_luzTele(canal, zap) { return zap > 0.4 ? hex('#e8ecf8') : canal < 0.5 ? hex('#c870e8') : hex('#e8b070'); }

// lo que da la tele en (x0, y0)–(x1, y1): el concurso (canal 0) o el desierto lejano (canal 1), sin violencia; con
// líneas de barrido, viñeta, la nieve del cambio (zap 0–1) y la pila vacía que parpadea (sinPilas)
function r_tele(R, t, x0, y0, x1, y1, canal, zap, sinPilas) {
  const W = x1 - x0 + 1, H = y1 - y0 + 1, s = Math.max(1, Math.round(H / 40));
  R.recorte([x0, y0, x1, y1]);
  if (canal < 0.5) {
    const ondas = [0.18 + 0.32 * (0.5 + 0.5 * Math.sin(t * 1.3)), 0.82 - 0.32 * (0.5 + 0.5 * Math.sin(t * 1.1 + 1))];
    const fondo = hex('#2a1048'), panel = hex('#4a2078'), panelL = hex('#6a34a8'), piso = hex('#16163e'), pisoL = hex('#2a2a6a'), haz = hex('#fff0b0');
    for (let y = y0; y <= y1; y++) { const v = (y - y0) / H;
      for (let x = x0; x <= x1; x++) { const u = (x - x0) / W; let c;
        if (v < 0.64) { const col = (u * 10) % 1; c = col < 0.08 ? panelL : col < 0.5 ? panel : fondo; if (v < 0.06) c = hex('#1a0830'); }
        else c = ((x + y) & 1) && ((u * 10 + v * 3) % 1) < 0.14 ? pisoL : piso;
        for (let k = 0; k < 2; k++) { const ax = k ? 0.85 : 0.15, du = u - (ax + (ondas[k] - ax) * v), w = 0.03 + 0.08 * v; if (Math.abs(du) < w && ((x + y) & 1)) c = r_mez(c, haz, 0.45); }
        R.pset(x, y, c); } }
    // el aro de bombillas que se encienden por turnos
    const cx = x0 + W * 0.5, cy = y0 + H * 0.3;
    for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2, bx = Math.round(cx + Math.cos(a) * W * 0.24), by = Math.round(cy + Math.sin(a) * H * 0.2), on = (i + Math.floor(t * 6)) % 3 === 0;
      R.disco(bx, by, s > 1 ? 1.5 : 0.6, on ? hex('#fff6c0') : hex('#c89a3a')); }
    R.disco(cx, cy, H * 0.12, hex('#e8b830')); R.disco(cx, cy, H * 0.09, hex('#f8d860')); r_pictoR(R, 'circulo', Math.round(cx - 2.5 * s), Math.round(cy - 2.5 * s), hex('#a87a18'), s);
    // los dos atriles con su marcador y el presentador en medio
    for (const [u, col, n] of [[0.2, hex('#3ad0c8'), 3], [0.8, hex('#e85aa8'), 5]]) { const ax = Math.round(x0 + W * u), aw = Math.round(W * 0.08), ya = Math.round(y0 + H * 0.58), yb = Math.round(y0 + H * 0.86);
      R.poligono([[ax - aw, ya], [ax + aw, ya], [ax + aw - 1, yb], [ax - aw + 1, yb]], col); R.linea(ax - aw, ya, ax + aw, ya, C.blanco); R.linea(ax + aw - 1, ya + 1, ax + aw - 1, yb, r_mez(col, C.k, 0.4));
      const mx = ax - Math.round(aw * 0.6), my = ya + 2, mw = Math.round(aw * 1.2), mh = Math.max(3, Math.round(H * 0.08));
      for (let yy = my; yy < my + mh; yy++) for (let xx = mx; xx < mx + mw; xx++) R.pset(xx, yy, hex('#101020'));
      const val = (n + Math.floor(t * 0.7)) % 10; for (let b = 0; b < Math.min(mw - 2, val + 2); b += 2) for (let yy = my + 1; yy < my + mh - 1; yy++) R.pset(mx + 1 + b, yy, hex('#f8e060'));
      r_persona(R, ax, ya - 1, n, t, { s: Math.max(1, s - 1), ropa: col }); }
    r_persona(R, x0 + W * 0.5, y0 + H * 0.9, 2, t, { s, ropa: hex('#e8c040'), pelo: hex('#2a1c14') });
    for (let i = 0; i < 26; i++) { const cxp = Math.round(x0 + ((h(i, 1, 501) * W + Math.sin(t * 2 + i) * 3) % W)), cyp = Math.round(y0 + ((h(i, 2, 501) * H + t * (8 + i % 5) * H / 40) % H));
      R.pset(cxp, cyp, r_ROPA[i % 10]); if (s > 1) R.pset(cxp + 1, cyp, r_ROPA[i % 10]); }
  } else {
    const cieloA = hex('#b8b0a0'), cieloB = hex('#e0cca8'), loma = hex('#b8946a'), d0 = hex('#d8b07a'), d1 = hex('#c89a68'), d2 = hex('#b4865a'), sil = hex('#5a4a3a');
    for (let y = y0; y <= y1; y++) { const v = (y - y0) / H, sh = Math.round(Math.sin(y * 0.9 + t * 6) * (v > 0.5 ? 0.6 : 0));
      for (let x = x0; x <= x1; x++) { const u = (x - x0 + sh) / W; let c;
        const hor = 0.5 + 0.03 * Math.sin(u * 9) + 0.02 * Math.sin(u * 23);
        if (v < hor) c = (v / hor) > r_um(x, y) * 0.6 + 0.35 ? cieloB : cieloA;
        else if (v < hor + 0.05) c = loma;
        else { const z = v + 0.05 * Math.sin(u * 7 + v * 4); c = z < 0.66 ? d0 : z < 0.8 ? d1 : d2; if (Math.sin((u * 40 + v * 90)) > 0.85 && ((x + y) & 1)) c = r_mez(c, C.blanco, 0.2); }
        R.pset(x, y, c); } }
    R.disco(x0 + W * 0.78, y0 + H * 0.2, H * 0.08, hex('#f0e4c8'));
    // la columna de humo lejana, que sube y se ladea despacio
    for (let i = 0; i < 9; i++) { const f = ((t * 0.25 + i / 9) % 1), px = x0 + W * (0.3 + f * 0.12), py = y0 + H * (0.52 - f * 0.42), r = H * (0.03 + f * 0.07);
      R.disco(px + 1, py + 1, r, hex('#7a7060')); R.disco(px, py, r * 0.85, i % 2 ? hex('#a49a88') : hex('#8e8676')); }
    // el convoy y la fila de siluetas diminutas que caminan muy lejos
    for (let k = 0; k < 3; k++) { const vx = Math.round(x0 + W * ((0.55 + k * 0.07 + t * 0.008) % 1)), vy = Math.round(y0 + H * 0.57); for (let yy = 0; yy < 2 * s; yy++) for (let xx = 0; xx < 5 * s; xx++) R.pset(vx + xx, vy - yy, sil); R.pset(vx + s, vy - 2 * s, sil); }
    for (let k = 0; k < 6; k++) { const sx = Math.round(x0 + W * (0.12 + k * 0.045 + ((t * 0.006) % 0.2))), sy = Math.round(y0 + H * 0.68), pa = Math.floor(t * 3 + k) % 2;
      for (let yy = 0; yy < 4 * s; yy++) for (let xx = 0; xx < s; xx++) R.pset(sx + xx, sy - yy, sil); R.pset(sx + (pa ? s : -1), sy, sil); for (let xx = 0; xx < s; xx++) R.pset(sx + xx, sy - 4 * s, sil); }
  }
  // las líneas de barrido, la viñeta, la nieve del cambio y la pila vacía
  for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x++) R.pset(x, y, r_mez(R.pget(x, y), C.k, 0.14));
  if (zap > 0) { const fr = Math.floor(t * 30), by = y0 + ((t * 90) % H);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = h(x, y, fr); if (n < zap * 0.95) R.pset(x, y, n < zap * 0.45 ? hex('#e8ecf0') : n < zap * 0.7 ? hex('#8a8e9a') : hex('#2a2e3a')); if (Math.abs(y - by) < 3 * s && n < zap) R.pset(x, y, hex('#f8faff')); } }
  if (sinPilas && Math.floor(t * 2.5) % 2 === 0) { const px = x1 - 8 * s - 2, py = y0 + 3; R.rect(px - 1, py - 1, px + 4 * s, py + 5 * s + 1, C.k); r_picto(R, 'pila', px, py, hex('#e8402a'), s); R.rect(px + s, py + 2 * s, px + 2 * s, py + 4 * s, C.k); }
  R.recorte(null);
}

function r_salon(R, t, o) {
  const cam = o.camara ?? 'general', auto = o.canal == null, ciclo = t / 3, canal = auto ? Math.floor(ciclo) % 2 : o.canal;
  const zap = o.zap ?? (auto && (ciclo % 1) < 0.08 && t > 0.5 ? 1 - (ciclo % 1) / 0.08 : 0), luz = r_luzTele(canal, zap), S = r_S;
  const parpadeo = 0.75 + 0.25 * Math.sin(t * 7) * Math.sin(t * 3.1);
  if (cam === 'tele') {
    r_fijo(R, 'salon-tele', () => r_salonTeleFijo(R));
    r_halo(R, 160, 78, 170, 92, luz, 0.3 * parpadeo);
    r_tele(R, t, 66, 28, 254, 126, canal, zap, o.sinPilas);
    R.pset(250, 129, o.sinPilas ? hex('#5a1a1a') : (Math.floor(t * 1.5) % 2 ? hex('#3ae84a') : hex('#1a8a2a')));
    // la consola con su piloto azul que respira y las llaves del cuenco que brillan
    R.rect(238, 137, 241, 137, r_mez(hex('#1a3a8a'), hex('#6ac8ff'), 0.5 + 0.5 * Math.sin(t * 2)));
    if (o.mando !== false) { const mx = 120, my = 142; R.rect(mx, my, mx + 34, my + 6, C.k); R.rect(mx + 1, my + 1, mx + 33, my + 5, hex('#2a2a32')); R.rect(mx + 1, my + 1, mx + 33, my + 1, hex('#4a4a56'));
      for (let i = 0; i < 6; i++) { R.pset(mx + 8 + i * 4, my + 3, hex('#8a8e9a')); R.pset(mx + 8 + i * 4, my + 4, hex('#5a5e6a')); } R.rect(mx + 3, my + 2, mx + 5, my + 4, hex('#c83a3a'));
      R.rect(mx + 31, my + 2, mx + 32, my + 3, !o.sinPilas && zap > 0.1 ? hex('#ff4a3a') : hex('#4a1a1a')); }
    return { suelo: 178, pantalla: [66, 28, 254, 126], mando: o.mando !== false ? [137, 145] : null, consola: [0, 136, 319, 150] };
  }
  r_fijo(R, 'salon-g', () => r_salonFijo(R));
  // por la ventana: ventanas de la ciudad que se encienden y se apagan, la luz roja de la antena y un avión
  R.recorte([126, 30, 174, 81]);
  for (let k = 0; k < 16; k++) { const wx = 128 + Math.floor(h(k, 1, 520) * 44), wy = 52 + Math.floor(h(k, 2, 520) * 26); if (Math.sin(t * 0.7 + k * 2.3) > 0.4 && R.pget(wx, wy) !== S.cristal) R.pset(wx, wy, hex('#f8e090')); }
  if (Math.floor(t * 1.4) % 2) R.pset(161, 41, hex('#ff3a3a'));
  { const ax = 180 - ((t * 9) % 70), ay = 36 + ((t * 9) % 70) * 0.08; R.pset(Math.round(ax), Math.round(ay), C.blanco); if (Math.floor(t * 3) % 2) R.pset(Math.round(ax) + 1, Math.round(ay), hex('#ff4a4a')); }
  R.recorte(null);
  // la luz de la tele en la pared, el suelo y la mesita
  r_halo(R, 62, 88, 120, 78, luz, 0.26 * parpadeo);
  r_tele(R, t, 26, 62, 98, 96, canal, zap, o.sinPilas);
  R.pset(97, 98, Math.floor(t * 1.5) % 2 ? hex('#3ae84a') : hex('#1a8a2a'));
  // el vapor de la taza
  for (let k = 0; k < 6; k++) { const f = (t * 0.6 + k / 6) % 1, vx = 137 + Math.round(Math.sin(t * 2 + k * 1.7) * 1.5 + f * 2), vy = 132 - Math.round(f * 14); if (f < 0.85) R.pset(vx, vy, r_mez(R.pget(vx, vy), hex('#d8dce8'), 0.6 - f * 0.5)); }
  return { suelo: 152, sofa: { x0: 196, x1: 304, asiento: 146, sentada: [228, 152] }, tele: [22, 58, 102, 99], pantalla: [26, 62, 98, 96], mesita: [128, 138, 176, 156], ventana: [122, 26, 178, 86], lampara: [196, 58], libre: [[110, 190, 150, 176]] };
}

// lo fijo del salón general (pared con papel pintado y zócalo, ventana con la ciudad, cortinas, estantería con libros,
// la tele en su mueble, la lámpara de pie, el suelo de tablas, la alfombra, la mesita con la taza y las palomitas, el
// respaldo del sofá con su cojín y la planta)
function r_salonFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, S = r_S;
  r_salonPared(R, 120);
  // el suelo de tablas en perspectiva hacia (160, 10)
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) {
    const p = Math.floor((x - 160) * 9 / (y - 10)), pp = Math.floor((x - 1 - 160) * 9 / (y - 10)), q = h(p, 3, 530);
    let c = q < 0.33 ? S.suelo : q < 0.66 ? S.sueloL : S.sueloS;
    if (p !== pp) c = S.junta; else if ((y + Math.floor(h(p, 1, 531) * 23)) % 23 === 0) c = S.junta; else if (h(x >> 1, y, 532) < 0.06) c = S.sueloS; else if (h(x, y >> 1, 533) < 0.03) c = S.sueloL;
    pset(x, y, c); }
  rect(0, 120, 319, 120, S.zocaloS);
  // la alfombra ovalada con sus bandas
  for (let y = 138; y < 180; y++) for (let x = 96; x < 320; x++) { const d = ((x - 204) / 112) ** 2 + ((y - 158) / 19) ** 2; if (d >= 1) continue;
    const c = d > 0.86 ? S.alfombraL : d > 0.78 ? S.alfombraS : d > 0.5 ? ((Math.floor(x / 4) + Math.floor(y / 2)) % 4 === 0 ? S.alfombraA : S.alfombra) : d > 0.42 ? S.alfombraL : (((x >> 2) + (y >> 1)) % 3 === 0 ? S.alfombraS : S.alfombra);
    pset(x, y, h(x, y, 534) < 0.05 ? r_mez(c, C.k, 0.2) : c); }
  // la ventana con la ciudad de noche, cortinas y alféizar con una maceta
  rect(120, 24, 180, 88, hex('#1a1c26')); rect(122, 26, 178, 86, hex('#c8ccd8')); rect(178, 26, 178, 86, hex('#8a8e9a')); rect(122, 86, 178, 86, hex('#8a8e9a'));
  R.recorte([126, 30, 174, 81]);
  r_degradado(R, 126, 30, 174, 81, [hex('#0c1230'), hex('#1a2048'), hex('#2e2c5a'), hex('#4a3a66')]);
  for (let k = 0; k < 18; k++) pset(127 + Math.floor(h(k, 5, 535) * 46), 31 + Math.floor(h(k, 6, 535) * 14), k % 4 ? hex('#8a90c0') : C.blanco);
  disco(136, 38, 4, hex('#e8e6d0')); disco(137, 37, 3, hex('#f8f6e8')); pset(135, 39, hex('#c8c6b0'));
  const edif = [[126, 58, 0], [134, 50, 1], [143, 62, 0], [150, 44, 1], [158, 40, 0], [166, 54, 1], [171, 60, 0]];
  for (const [ex, ey, k] of edif) { const w = 9; rect(ex, ey, ex + w, 81, k ? hex('#141a30') : hex('#1c2440')); rect(ex, ey, ex + w, ey, hex('#2c3458'));
    for (let wy = ey + 3; wy < 80; wy += 3) for (let wx = ex + 2; wx < ex + w - 1; wx += 2) pset(wx, wy, h(wx, wy, 536) < 0.4 ? hex('#f0d080') : h(wx, wy, 537) < 0.5 ? hex('#3a4268') : hex('#10142a')); }
  linea(161, 40, 161, 34, hex('#2c3458'));
  R.recorte(null);
  rect(149, 26, 151, 86, hex('#c8ccd8')); rect(122, 55, 178, 57, hex('#c8ccd8')); rect(151, 26, 151, 86, hex('#8a8e9a')); rect(122, 57, 178, 57, hex('#8a8e9a'));
  rect(116, 86, 184, 90, hex('#d8dce6')); rect(116, 90, 184, 91, hex('#7a7e8a'));
  rect(166, 80, 172, 86, hex('#c0603a')); rect(166, 80, 172, 80, hex('#e08050')); disco(169, 77, 3, hex('#3a8a4a')); pset(168, 75, hex('#6ac86a')); pset(171, 76, hex('#6ac86a'));
  rect(112, 21, 188, 22, hex('#8a6a3a')); disco(111, 21, 2, hex('#c8a050')); disco(189, 21, 2, hex('#c8a050'));
  for (const [x0, x1, lado] of [[108, 124, -1], [176, 192, 1]]) for (let y = 23; y <= 114; y++) { const ap = y > 70 && y < 76 ? 3 : 0;
    for (let x = x0 + (lado < 0 ? 0 : ap); x <= x1 - (lado < 0 ? ap : 0); x++) { const f = (x - x0) % 5; pset(x, y, f === 0 ? hex('#3a1e2a') : f < 3 ? hex('#6a2e44') : hex('#843a54')); } }
  rect(110, 72, 124, 73, hex('#c8a050')); rect(176, 72, 190, 73, hex('#c8a050'));
  // la balda sobre la tele, con libros y un marco
  rect(22, 40, 102, 42, S.maderaL); rect(22, 43, 102, 43, S.maderaD);
  for (let x = 26, k = 0; x < 70; k++) { const w = 2 + (k % 3), hb = 9 + Math.floor(h(k, 1, 538) * 5), c = [hex('#c84a4a'), hex('#4a7ac8'), hex('#e8c040'), hex('#5aa85a'), hex('#d8d0c0')][k % 5]; rect(x, 40 - hb, x + w, 39, c); rect(x, 40 - hb, x, 39, r_mez(c, C.blanco, 0.3)); rect(x, 40 - hb + 2, x + w, 40 - hb + 2, r_mez(c, C.k, 0.3)); x += w + 1; }
  rect(78, 26, 96, 39, hex('#c8a050')); rect(80, 28, 94, 37, hex('#6ab8e8')); rect(80, 33, 94, 37, hex('#4a8a4a')); disco(90, 31, 2, hex('#f8e8a0'));
  // el mueble de la tele: tablero, dos puertas con tirador y patas
  r_madera(R, 14, 104, 110, 126, S.madera, S.maderaS, S.maderaL, S.maderaD, 1, 7);
  rect(14, 104, 110, 106, S.maderaL); rect(14, 104, 110, 104, hex('#9a7a5a'));
  for (const dx of [18, 64]) { rect(dx, 109, dx + 42, 124, S.maderaD); rect(dx + 1, 110, dx + 41, 123, S.madera); rect(dx + 1, 110, dx + 41, 110, S.maderaL); rect(dx + 19, 115, dx + 23, 116, hex('#c8a050')); }
  rect(16, 126, 18, 129, S.maderaD); rect(106, 126, 108, 129, S.maderaD);
  // la tele: marco negro, peana y barra de sonido
  rect(22, 58, 102, 99, S.negro); rect(23, 59, 101, 98, S.marco); rect(23, 59, 101, 59, hex('#3a3a46'));
  rect(56, 99, 68, 104, S.negro); rect(36, 100, 88, 104, hex('#1a1a20')); for (let x = 38; x < 87; x += 2) pset(x, 102, hex('#34343e'));
  // la lámpara de pie
  rect(195, 62, 197, 124, hex('#2a2a2e')); rect(196, 62, 196, 124, hex('#5a5a62')); R.disco(196, 125, 6, hex('#1e1e22')); rect(190, 124, 202, 125, hex('#3a3a40'));
  poligono([[188, 64], [204, 64], [201, 50], [191, 50]], S.lampara); linea(191, 50, 201, 50, hex('#fff4d0')); linea(188, 64, 204, 64, hex('#c8a870')); for (let y = 52; y < 64; y += 3) linea(190, y, 202, y, hex('#e8c888'));
  r_halo(R, 196, 60, 50, 40, S.calida, 0.32); r_halo(R, 196, 124, 26, 6, S.calida, 0.2);
  // el respaldo del sofá (a la derecha) con su capitoné y el cojín
  rect(280, 104, 306, 160, S.sofaD); rect(282, 106, 304, 158, S.sofa); rect(282, 106, 285, 158, S.sofaL); rect(300, 106, 304, 158, S.sofaS); rect(282, 106, 304, 107, S.sofaL);
  for (let y = 114; y < 156; y += 10) for (const bx of [290, 297]) { pset(bx, y + (bx === 297 ? 5 : 0), S.sofaD); pset(bx + 1, y + 1 + (bx === 297 ? 5 : 0), S.sofaS); }
  poligono([[262, 140], [266, 120], [284, 124], [282, 142]], hex('#d8b040')); linea(266, 120, 284, 124, hex('#f0d070')); linea(262, 140, 282, 142, hex('#a88020')); for (let k = 0; k < 4; k++) pset(268 + k * 4, 128 + k, hex('#a88020'));
  // un cuadro sobre el sofá (un paisaje, sin letras)
  rect(214, 60, 262, 92, hex('#c8a050')); rect(216, 62, 260, 90, hex('#e8c878')); rect(218, 64, 258, 88, hex('#e8a070')); rect(218, 76, 258, 88, hex('#5a8a9a')); disco(246, 74, 5, hex('#f8e0a0')); poligono([[218, 80], [232, 68], [246, 80]], hex('#6a5a7a')); for (let x = 220; x < 258; x += 3) pset(x, 82 + (x % 2), hex('#8ac0d0'));
  // la planta de lengua de suegra junto al mueble
  rect(112, 112, 122, 126, hex('#c8c8c0')); rect(112, 112, 122, 113, hex('#e8e8e0')); rect(120, 114, 122, 126, hex('#9a9a92'));
  for (let k = 0; k < 6; k++) { const bx = 113 + k * 2, top = 82 + Math.floor(h(k, 1, 539) * 16); linea(bx, 112, bx + (k % 3) - 1, top, hex('#3a7a3a')); linea(bx + 1, 112, bx + (k % 3), top + 2, hex('#6ab05a')); pset(bx + (k % 3) - 1, top, hex('#c8d860')); }
  // la mesita con la taza y el bol de palomitas
  r_sombra(R, 152, 156, 30, 3);
  rect(128, 138, 176, 142, S.maderaL); rect(128, 138, 176, 138, hex('#9a7a5a')); rect(128, 143, 176, 145, S.maderaS); rect(128, 142, 176, 142, S.madera);
  for (const lx of [131, 172]) rect(lx, 145, lx + 2, 156, S.maderaD);
  rect(134, 133, 139, 138, hex('#e8e8f0')); rect(134, 133, 139, 133, C.blanco); rect(139, 134, 140, 136, hex('#c8c8d0')); rect(135, 134, 138, 134, hex('#6a4028'));
  poligono([[148, 134], [164, 134], [161, 138], [151, 138]], hex('#d83a3a')); for (let x = 150; x < 163; x += 3) linea(x, 134, x, 137, C.blanco);
  for (let k = 0; k < 10; k++) disco(150 + (k * 13) % 13, 132 + (k % 2), 1.4, k % 3 ? hex('#f8f0d0') : hex('#e8d090'));
  rect(166, 136, 175, 137, hex('#4a8ac8')); rect(167, 135, 174, 135, hex('#e8e0d0'));
}

// la pared del salón (papel pintado de rayas con un motivo, moldura de techo, zócalo de cuarterones y rodapié) hasta y1
function r_salonPared(R, y1) {
  const S = r_S;
  for (let y = 0; y < y1; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 5) c = y === 4 ? S.paredS : y === 0 ? hex('#3a4460') : hex('#323c56');
    else if (y >= y1 - 36) { const yz = y - (y1 - 36); c = yz < 2 ? S.zocaloL : yz > 31 ? (yz === 32 ? S.zocaloL : S.zocaloS) : S.zocalo;
      const px = x % 44; if (yz > 5 && yz < 29 && (px === 4 || px === 40)) c = px === 4 ? S.zocaloS : S.zocaloL; if ((yz === 6 || yz === 28) && px > 4 && px < 40) c = yz === 6 ? S.zocaloS : S.zocaloL; }
    else { c = x % 10 === 0 ? S.paredL : S.pared; const mx = x % 10, my = y % 12; if ((mx === 5 && (my === 5 || my === 7)) || (my === 6 && (mx === 4 || mx === 6))) c = S.motivo; if (h(x, y, 540) < 0.04) c = S.paredS; }
    R.pset(x, y, c); }
}

// sombra ovalada en el suelo (oscurece lo que hay)
function r_sombra(R, cx, cy, rx, ry) { for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) R.pset(x, cy + j, r_mez(R.pget(x, cy + j), C.k, 0.3)); } }

// lo fijo de la tele de cerca: pared, altavoces de columna, la tele enorme con su marco, la barra de sonido y el mueble
// con la consola, una vela, un cuenco con llaves y una planta
function r_salonTeleFijo(R) {
  const { rect, pset, disco, linea } = R, S = r_S;
  r_salonPared(R, 150);
  for (const x0 of [14, 272]) { rect(x0, 50, x0 + 32, 136, S.negro); rect(x0 + 1, 51, x0 + 31, 135, hex('#1e1e26')); rect(x0 + 1, 51, x0 + 31, 51, hex('#3a3a46'));
    for (const [cy, r] of [[66, 7], [92, 11], [118, 11]]) { disco(x0 + 16, cy, r + 1, hex('#0e0e12')); disco(x0 + 16, cy, r, hex('#2a2a34')); disco(x0 + 16, cy, r * 0.45, hex('#3e3e4a')); pset(x0 + 14, cy - 2, hex('#6a6a7a')); } }
  rect(60, 22, 260, 132, S.negro); rect(62, 24, 258, 130, S.marco); rect(62, 24, 258, 24, hex('#3a3a46')); rect(62, 130, 258, 130, hex('#0a0a0e'));
  rect(150, 130, 170, 136, S.negro); rect(100, 132, 220, 138, hex('#16161c')); rect(100, 132, 220, 132, hex('#34343e')); for (let x = 104; x < 218; x += 2) pset(x, 135, hex('#2c2c36'));
  // el mueble: tablero visto desde arriba y frente con cajones
  rect(0, 136, 319, 150, hex('#6a4a36')); for (let y = 137; y < 150; y++) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 541) < 0.12) pset(x, y, hex('#5a3e2c')); else if (h(x >> 3, y, 542) < 0.05) pset(x, y, hex('#8a6a4a'));
  rect(0, 136, 319, 136, hex('#9a7a5a')); rect(0, 150, 319, 151, hex('#2a1c14'));
  r_madera(R, 0, 152, 319, 179, S.madera, S.maderaS, S.maderaL, S.maderaD, 2, 9);
  for (const dx of [8, 112, 216]) { rect(dx, 156, dx + 96, 179, S.maderaD); rect(dx + 2, 158, dx + 94, 179, S.madera); rect(dx + 2, 158, dx + 94, 158, S.maderaL); rect(dx + 40, 164, dx + 56, 166, hex('#c8a050')); rect(dx + 40, 166, dx + 56, 166, hex('#8a6a2a')); }
  // la consola de juegos, una vela en su vaso, un cuenco con llaves y una planta pequeña
  rect(226, 128, 252, 140, hex('#e8e8ee')); rect(226, 128, 252, 129, C.blanco); rect(226, 139, 252, 140, hex('#a8a8b4')); rect(230, 133, 248, 133, hex('#c8c8d4'));
  rect(276, 128, 284, 141, hex('#c8d8e0')); rect(277, 132, 283, 140, hex('#f0e8d8')); rect(279, 129, 281, 131, hex('#f8c860'));
  R.poligono([[188, 140], [210, 140], [206, 146], [192, 146]], hex('#5a7a9a')); rect(192, 138, 196, 140, hex('#c8a050')); rect(198, 137, 202, 140, hex('#a8a8b0'));
  rect(30, 132, 42, 144, hex('#c0603a')); rect(30, 132, 42, 133, hex('#e08050')); for (let k = 0; k < 7; k++) { linea(36, 132, 28 + k * 3, 116 + (k % 3) * 3, hex('#3a8a4a')); pset(28 + k * 3, 116 + (k % 3) * 3, hex('#6ac86a')); }
}

// delante del salón: el lateral del sofá (el brazo enrollado, la base con su vivo y las patas), la manta de punto y el
// gato que duerme encima del brazo (respira y mueve la cola); la luz de la tele en el canto
function r_salonD(R, t, o) {
  if ((o.camara ?? 'general') !== 'general') return;
  const { rect, pset, disco } = R, S = r_S;
  for (let y = 146; y <= 174; y++) for (let x = 196; x <= 306; x++) { const c = (x + (y >> 1)) % 3 === 0 ? S.sofaS : S.sofa; pset(x, y, y === 146 ? S.sofaL : y > 170 ? S.sofaS : c); }
  rect(196, 162, 306, 162, S.sofaD); rect(196, 163, 306, 163, S.sofaL);
  disco(206, 147, 10, S.sofaD); disco(206, 147, 9, S.sofa); disco(204, 145, 6, S.sofaL); rect(196, 147, 216, 174, S.sofa); rect(196, 147, 197, 174, S.sofaL); rect(216, 149, 216, 172, S.sofaS);
  for (let y = 139; y <= 174; y++) { pset(195, y, S.sofaD); } rect(196, 175, 306, 175, S.sofaD);
  for (const lx of [200, 300]) { rect(lx, 176, lx + 3, 179, hex('#2a1c14')); rect(lx, 176, lx, 179, hex('#5a3e2e')); }
  // la manta de punto que cuelga
  for (let y = 146; y <= 168; y++) for (let x = 256; x <= 292; x++) { if (y > 163 + Math.round(Math.sin(x * 0.5) * 2)) continue; const v = ((x >> 1) + (y >> 1)) & 1; pset(x, y, y === 146 ? S.mantaL : v ? S.manta : S.mantaS); }
  for (let x = 256; x <= 292; x += 3) pset(x, 165 + Math.round(Math.sin(x * 0.5) * 2), hex('#f0c8a8'));
  // el gato que duerme en el brazo
  const rp = Math.sin(t * 2.2) > 0 ? 1 : 0, gc = hex('#e89a4a'), gS = hex('#b86a2a'), gL = hex('#f8c080');
  const gy = 3; R.poligono([[198, 135 + gy], [216, 135 + gy], [214, 128 - rp + gy], [200, 128 - rp + gy]], gc); rect(200, 128 - rp + gy, 214, 129 - rp + gy, gL); for (let x = 202; x < 214; x += 4) rect(x, 130 - rp + gy, x + 1, 133 + gy, gS);
  disco(199, 131 + gy, 4, gc); pset(196, 127 + gy, gc); pset(196, 126 + gy, C.k); pset(201, 127 + gy, gc); pset(202, 126 + gy, C.k); pset(197, 131 + gy, C.k); pset(198, 131 + gy, C.k); pset(201, 131 + gy, C.k); pset(200, 132 + gy, hex('#e86a7a'));
  const cola = Math.round(Math.sin(t * 1.3) * 2); R.linea(216, 133 + gy, 220, 136 + cola + gy, gc); R.linea(220, 136 + cola + gy, 222, 140 + cola + gy, gS);
  if (Math.sin(t * 0.8) > 0.6) { pset(194, 120, hex('#c8d0e8')); pset(193, 119, hex('#c8d0e8')); }   // la «z» del gato que duerme
  // el canto del sofá lo baña la luz de la tele
  const auto = o.canal == null, canal = auto ? Math.floor(t / 3) % 2 : o.canal, luz = r_luzTele(canal, o.zap ?? 0);
  for (let y = 139; y <= 174; y++) pset(196, y, r_mez(R.pget(196, y), luz, 0.35));
}

const r_K = {
  mar0: hex('#6aa6d8'), mar1: hex('#4a8ac8'), mar2: hex('#2e6eae'), mar3: hex('#1e5a96'), espuma: hex('#f4fbff'), espumaS: hex('#b8d8ee'),
  arena: hex('#ead6a0'), arenaS: hex('#c8b488'), tierra: hex('#a8a060'), tierraS: hex('#8a8a4c'), tierraL: hex('#c4b874'), olivo: hex('#5a7040'), olivoL: hex('#7a9050'), olivoS: hex('#3e5230'),
  piedra: hex('#e8dcc0'), piedraS: hex('#b8a888'), piedraSS: hex('#8a7c64'), suelo: hex('#d8c8a0'), rojo: hex('#b8302a'), rojoS: hex('#7a1e1a'), ocre: hex('#e0b878'), ocreS: hex('#b88a50'),
  roca: hex('#c8bca0'), rocaS: hex('#9a8e78'), rocaL: hex('#e2d8c0'), hierba: hex('#7a9a4a'), hierbaS: hex('#5a7a36'), hierbaL: hex('#a8c060'), vela: hex('#1c1a22'), velaL: hex('#34303e'), casco: hex('#7a4a2a'), cascoS: hex('#4e2e1a'), cascoL: hex('#a8704a'),
};

const r_costa = (y) => 170 - (y - 44) * 0.95 + 6 * Math.sin(y * 0.15);

// el laberinto (13 × 11 celdas), generado una vez con un recorrido en profundidad de semilla fija: muros[y][x] = [norte, oeste]
const r_LAB = (() => { const NX = 13, NY = 11, vis = [], n = [], w = []; for (let y = 0; y <= NY; y++) { vis.push(Array(NX).fill(false)); n.push(Array(NX + 1).fill(true)); w.push(Array(NX + 1).fill(true)); }
  const pila = [[6, 5]]; vis[5][6] = true; let k = 0;
  while (pila.length) { const [x, y] = pila[pila.length - 1], op = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => x + dx >= 0 && x + dx < NX && y + dy >= 0 && y + dy < NY && !vis[y + dy][x + dx]);
    if (!op.length) { pila.pop(); continue; } const [dx, dy] = op[Math.floor(h(k++, x * 13 + y, 550) * op.length)], nx = x + dx, ny = y + dy;
    if (dx === 1) w[y][nx] = false; else if (dx === -1) w[y][x] = false; else if (dy === 1) n[ny][x] = false; else n[y][x] = false; vis[ny][nx] = true; pila.push([nx, ny]); }
  n[NY][0] = false; return { NX, NY, n, w }; })();

// unas gaviotas en V que planean (x, y, aleteo)
function r_gaviota(R, x, y, t, k, c = C.blanco) { const a = Math.sin(t * 6 + k * 2) > 0 ? 1 : 0, X = Math.round(x), Y = Math.round(y); R.pset(X, Y, c); R.pset(X - 1, Y - a, c); R.pset(X - 2, Y - 1 - a, c); R.pset(X + 1, Y - a, c); R.pset(X + 2, Y - 1 - a, c); R.pset(X, Y + 1, hex('#8a9aaa')); }

// el barco griego de vela negra visto de lado (proa a la derecha), de largo L, con la línea de flotación en (x, y):
// casco de tablas, franja roja, ojo pintado en la proa, popa curva, mástil, verga y vela negra que se hincha, remos
function r_barco(R, x, y, L, t, o = {}) {
  const K = r_K, s = L / 160, X = (u) => Math.round(x + u * s), Y = (v) => Math.round(y + v * s), d = o.remos ?? 0;
  if (o.remosVer !== false) for (let k = 0; k < 7; k++) { const rx = X(30 + k * 16), a = Math.sin(t * 2.4 + k * 0.3) * d; R.linea(rx, Y(-16), rx - Math.round((8 + a * 6) * s), Y(8), K.cascoS); }
  R.poligono([[X(-4), Y(-44)], [X(10), Y(-30)], [X(150), Y(-30)], [X(166), Y(-40)], [X(170), Y(-50)], [X(176), Y(-48)], [X(168), Y(-28)], [X(150), Y(0)], [X(18), Y(0)], [X(0), Y(-24)], [X(-10), Y(-40)]], K.casco);
  for (let v = -26; v < 0; v += 5) R.linea(X(4 + (v + 26) * 0.4), Y(v), X(160 - (v + 26) * 0.3), Y(v), K.cascoS);
  R.linea(X(10), Y(-30), X(150), Y(-30), K.cascoL); R.linea(X(10), Y(-29), X(150), Y(-29), K.cascoL);
  R.poligono([[X(8), Y(-24)], [X(156), Y(-24)], [X(154), Y(-20)], [X(10), Y(-20)]], K.rojo);
  R.linea(X(18), Y(0), X(150), Y(0), K.cascoS);
  if (s > 0.5) { const ex = X(150), ey = Y(-13); R.disco(ex, ey, 4 * s, C.blanco); R.disco(ex + 1, ey, 2 * s, C.k); R.pset(ex - 1, ey - 1, C.blanco); } else R.pset(X(150), Y(-13), C.blanco);
  // mástil, verga y vela negra (se hincha con el viento)
  const mx = X(86); R.rect(mx - Math.max(0, Math.round(s)), Y(-140), mx + Math.max(0, Math.round(s)), Y(-30), hex('#5a3a22'));
  R.linea(X(48), Y(-130), X(124), Y(-130), hex('#5a3a22'));
  const hin = 1 + Math.sin(t * 1.6) * 0.5;
  for (let v = -128; v <= -64; v++) { const f = (v + 128) / 64, b = Math.round(Math.sin(f * Math.PI) * 8 * s * hin), x0 = X(50), x1 = X(122) + b;
    for (let xx = x0; xx <= x1; xx++) { const seam = Math.round((xx - x0) / Math.max(1, 12 * s)) !== Math.round((xx - x0 - 1) / Math.max(1, 12 * s)); R.pset(xx, Y(v), seam ? K.velaL : (xx > x1 - 3 * s ? hex('#2a2632') : K.vela)); } }
  R.linea(X(86), Y(-140), X(170), Y(-50), hex('#3a2a1a')); R.linea(X(86), Y(-140), X(-6), Y(-42), hex('#3a2a1a'));
  if (o.gente) for (let k = 0; k < o.gente; k++) { const gx = X(36 + k * 13), gy = Y(-31); R.pset(gx, gy - 1, r_ROPA[k % 10]); R.pset(gx, gy - 2, r_PIEL[k % 4]); if (s > 0.3) R.pset(gx, gy - 3, r_PELO[k % 5]); }
}

function r_creta(R, t, o) {
  const K = r_K, cam = o.camara ?? 'general';
  if (cam === 'puerto') return r_cretaPuerto(R, t, o);
  r_fijo(R, 'creta-g', () => r_cretaFijo(R));
  // las nubes a tres velocidades y las gaviotas
  r_nubes(R, t, [[12, 22, 2.2, 0], [22, 30, 3.4, 140], [32, 16, 5, 260], [18, 12, 1.4, 60]], [C.blanco, hex('#e6eef6'), hex('#bccce0')]);
  for (let k = 0; k < 4; k++) r_gaviota(R, ((t * (9 + k * 2) + k * 90) % 380) - 30, 26 + k * 7 + Math.sin(t + k) * 2, t, k);
  // el mar: destellos que titilan y la espuma que va y viene en la orilla
  const fr = Math.floor(t * 3);
  for (let k = 0; k < 70; k++) { const y = 46 + Math.floor(h(k, fr, 551) * 110), x = Math.floor(h(k, fr + 7, 552) * (r_costa(y) - 4)); if (x > 0 && h(k, fr, 553) < 0.7) { R.pset(x, y, K.espuma); R.pset(x + 1, y, K.espumaS); } }
  for (let y = 46; y < 156; y++) { const cx = Math.floor(r_costa(y)), ola = Math.sin(t * 2.2 + y * 0.35); R.pset(cx - 1 - (ola > 0.3 ? 1 : 0), y, K.espuma); if (ola > 0.6) R.pset(cx - 3, y, K.espumaS); }
  // el barco de vela negra que cruza la bahía hasta el espigón, con su estela
  const u = Math.max(0, Math.min(1, o.barco ?? t / 10)), e = u * u * (3 - 2 * u), bx = -24 + 84 * e, by = 84 + 46 * e;
  if (u < 1) for (let k = 1; k < 8; k++) { const wx = Math.round(bx - k * 3), wy = Math.round(by - k * 1.8); R.pset(wx, wy + 1 + (k % 2), K.espuma); R.pset(wx + 1, wy - 1 - (k % 2), K.espumaS); }
  r_barco(R, bx, by, 26, t, { remos: u < 1 ? 1 : 0, gente: 5 });
  // gente diminuta por el camino, cabras y el humo del hogar del palacio
  const camino = [[106, 134], [126, 126], [142, 118], [162, 122], [180, 138], [192, 150]];
  for (let k = 0; k < 4; k++) { const f = ((t * 0.03 + k * 0.27) % 1) * (camino.length - 1), i = Math.floor(f), g = f - i, [ax, ay] = camino[i], [bx2, by2] = camino[i + 1], px = Math.round(ax + (bx2 - ax) * g), py = Math.round(ay + (by2 - ay) * g);
    R.pset(px, py, r_ROPA[k + 3]); R.pset(px, py - 1, r_ROPA[k + 3]); R.pset(px, py - 2, r_PIEL[k % 4]); }
  for (let k = 0; k < 3; k++) { const gx = Math.round(236 + k * 9 + Math.sin(t * 0.3 + k) * 4), gy = 62 + k * 2; R.rect(gx, gy, gx + 2, gy + 1, C.blanco); R.pset(gx + (Math.sin(t + k) > 0 ? 3 : -1), gy - 1, C.blanco); R.pset(gx, gy + 2, hex('#6a5a4a')); R.pset(gx + 2, gy + 2, hex('#6a5a4a')); }
  for (let k = 0; k < 4; k++) { const f = (t * 0.3 + k / 4) % 1, sx = Math.round(152 + f * 12 + Math.sin(t + k) * 1.5), sy = Math.round(92 - f * 16), r = 1 + f * 1.6; for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (i * i + j * j <= r * r && ((sx + i + sy + j) & 1)) R.pset(sx + i, sy + j, r_mez(R.pget(sx + i, sy + j), hex('#f0ece4'), 0.7 - f * 0.4)); }
  // la hierba del acantilado que se mece
  for (let k = 0; k < 40; k++) { const gx = Math.floor(h(k, 1, 554) * 320), gy = 162 + Math.floor(h(k, 2, 554) * 16), m = Math.round(Math.sin(t * 2.4 + gx * 0.08)); R.linea(gx, gy, gx + m, gy - 3, K.hierbaS); R.pset(gx + m, gy - 3, K.hierbaL); }
  return { suelo: 172, horizonte: 44, laberinto: [190, 82, 294, 148], entrada: [190, 148], palacio: [130, 94, 182, 122], espigon: [56, 132, 84, 141], barco: [Math.round(bx), Math.round(by)], libre: [[100, 300, 162, 180]] };
}

// lo fijo de la bahía de Creta vista desde el acantilado
function r_cretaFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, K = r_K;
  r_degradado(R, 0, 0, 319, 44, [hex('#5a9ad8'), hex('#7ab4e6'), hex('#a8d0ee'), hex('#d4e8f2')]);
  // el monte nevado al fondo, con calima
  for (let x = 150; x < 320; x++) { const top = Math.round(44 - Math.max(0, 18 * Math.exp(-(((x - 228) / 34) ** 2)) + 8 * Math.exp(-(((x - 286) / 26) ** 2)) + 5 * Math.exp(-(((x - 180) / 20) ** 2)) + Math.sin(x * 0.4) * 0.6));
    for (let y = top; y < 46; y++) pset(x, y, y < 32 && y < top + 3 ? hex('#eef4fa') : ((x * 3 + y) % 7 === 0 ? hex('#8aa0bc') : (x > 228 ? hex('#a4b6cc') : hex('#9aaec6')))); }
  // el mar con su trama y las islas lejanas
  for (let y = 44; y < 160; y++) { const cx = r_costa(y);
    for (let x = 0; x < 320; x++) { if (x >= cx) continue; const v = (y - 44) / 116 * 3, i = Math.min(2, Math.floor(v)), f = v - i, cols = [K.mar0, K.mar1, K.mar2, K.mar3];
      let c = f > r_um(x, y) ? cols[i + 1] : cols[i]; if (Math.sin(x * 0.35 + y * 1.7) > 0.93 && ((x + y) & 1)) c = r_mez(c, C.blanco, 0.25); pset(x, y, c); } }
  for (const [ix, iw] of [[20, 26], [62, 14]]) for (let i = 0; i < iw; i++) { const hh = Math.round(3 * Math.sin(i / iw * Math.PI)); rect(ix + i, 44 - hh, ix + i, 44, hex('#8aa4c0')); }
  // la tierra: playa, campos, olivares, casas blancas
  for (let y = 44; y < 160; y++) { const cx = r_costa(y);
    for (let x = Math.max(0, Math.ceil(cx)); x < 320; x++) { if (y < 46 && x > 150) continue; const dx = x - cx; let c;
      if (dx < 2) c = K.arenaS; else if (dx < 6) c = K.arena; else { const n = h(x >> 2, y >> 1, 556); c = n < 0.3 ? K.tierraS : n < 0.75 ? K.tierra : K.tierraL; if (h(x, y, 557) < 0.05) c = K.olivoS; }
      pset(x, y, c); } }
  for (const [fx, fy, fw, fh] of [[200, 52, 50, 12], [258, 50, 40, 10], [176, 60, 22, 10]]) for (let y = fy; y < fy + fh; y++) for (let x = fx; x < fx + fw; x++) pset(x, y, (y - fy) % 2 ? hex('#8a7a40') : hex('#b0a058'));
  // el laberinto: suelo claro, muros con la cara sur en sombra y su sombra a la derecha
  const L = r_LAB, x0 = 190, y0 = 82, cw = 8, ch = 6;
  rect(x0 - 3, y0 - 3, x0 + L.NX * cw + 3, y0 + L.NY * ch + 4, K.tierraS); rect(x0, y0, x0 + L.NX * cw, y0 + L.NY * ch, K.suelo);
  for (let y = y0; y <= y0 + L.NY * ch; y++) for (let x = x0; x <= x0 + L.NX * cw; x++) if (h(x, y, 558) < 0.06) pset(x, y, K.piedraS);
  for (let j = 0; j <= L.NY; j++) for (let i = 0; i <= L.NX; i++) { const X = x0 + i * cw, Y = y0 + j * ch;
    if (i < L.NX && L.n[j][i]) { rect(X, Y - 1, X + cw, Y, K.piedra); rect(X, Y + 1, X + cw, Y + 2, K.piedraS); rect(X + 1, Y + 3, X + cw, Y + 3, r_mez(K.suelo, C.k, 0.2)); }
    if (j < L.NY && L.w[j][i]) { rect(X - 1, Y, X, Y + ch, K.piedra); rect(X - 1, Y + ch + 1, X, Y + ch + 2, K.piedraS); rect(X + 1, Y + 1, X + 1, Y + ch, r_mez(K.suelo, C.k, 0.2)); } }
  for (let j = 0; j <= L.NY; j++) for (let i = 0; i <= L.NX; i++) { pset(x0 + i * cw - 1, y0 + j * ch - 1, K.piedra); pset(x0 + i * cw, y0 + j * ch - 1, hex('#f6f0e0')); }
  // el palacio: terrazas de tejado plano, columnas rojas que se estrechan hacia abajo, cuernos en el tejado
  for (const [px, py, pw, ph] of [[130, 104, 52, 18], [138, 96, 34, 10], [148, 90, 16, 8]]) { rect(px, py, px + pw, py + ph, K.ocre); rect(px, py, px + pw, py + 1, hex('#f0d8a0')); rect(px, py + ph - 1, px + pw, py + ph, K.ocreS);
    for (let cx2 = px + 3; cx2 < px + pw - 2; cx2 += 5) { rect(cx2, py + 3, cx2 + 1, py + ph - 2, K.rojo); pset(cx2, py + 2, C.k); pset(cx2 + 1, py + 2, C.k); pset(cx2 + 1, py + ph - 2, K.rojoS); } }
  for (const hx of [150, 160]) { pset(hx, 88, K.piedra); pset(hx + 2, 88, K.piedra); pset(hx, 89, K.piedra); pset(hx + 1, 89, K.piedra); pset(hx + 2, 89, K.piedra); }
  // el camino que sube del puerto al palacio y baja a la entrada del laberinto
  const cam = [[106, 134], [126, 126], [142, 118], [162, 122], [180, 138], [192, 150]];
  for (let i = 0; i < cam.length - 1; i++) { linea(cam[i][0], cam[i][1], cam[i + 1][0], cam[i + 1][1], hex('#e8dcb0')); linea(cam[i][0], cam[i][1] + 1, cam[i + 1][0], cam[i + 1][1] + 1, hex('#c8b890')); }
  // el puerto: espigón de piedra y casitas blancas con su sombra
  rect(56, 136, 86, 141, K.piedraS); rect(56, 136, 86, 137, K.piedra); rect(56, 130, 60, 141, K.piedraS); rect(56, 130, 60, 131, K.piedra); rect(56, 142, 86, 142, K.mar3);
  for (const [hx, hy] of [[90, 128], [98, 132], [94, 140], [104, 138], [86, 146], [100, 146], [110, 128], [112, 144]]) { rect(hx, hy, hx + 5, hy + 4, hex('#f4f0e8')); rect(hx, hy, hx + 5, hy, C.blanco); rect(hx + 5, hy, hx + 6, hy + 4, hex('#b8b4ac')); pset(hx + 2, hy + 3, hex('#3a4a6a')); }
  // olivos y cipreses repartidos por la tierra (fuera del laberinto y del palacio)
  for (let k = 0; k < 90; k++) { const y = 50 + Math.floor(h(k, 1, 559) * 104), x = Math.floor(r_costa(y) + 8 + h(k, 2, 559) * 220); if (x > 316) continue;
    if (x > 184 && x < 300 && y > 76 && y < 154) continue; if (x > 126 && x < 186 && y > 86 && y < 126) continue; if (y > 156) continue;
    if (k % 7 === 0) { rect(x, y - 6, x + 1, y, K.olivoS); pset(x, y - 7, K.olivoS); pset(x + 2, y, r_mez(K.tierra, C.k, 0.3)); continue; }
    pset(x + 2, y + 2, K.tierraS); pset(x + 3, y + 2, K.tierraS); disco(x, y, 2.2, K.olivoS); disco(x - 0.5, y - 0.5, 1.6, K.olivo); pset(x - 1, y - 1, K.olivoL); }
  // la cima del acantilado delante: hierba y roca caliza con grietas, flores
  for (let x = 0; x < 320; x++) { const top = Math.round(157 + 3 * Math.sin(x * 0.06) + 2 * Math.sin(x * 0.17));
    for (let y = top; y < 180; y++) { const dy = y - top; let c;
      if (dy < 4) c = dy === 0 ? K.hierbaL : (h(x, y, 560) < 0.3 ? K.hierbaS : K.hierba);
      else { const n = h(x >> 1, y >> 1, 561); c = n < 0.18 ? K.hierbaS : n < 0.7 ? K.hierba : K.hierbaL; if (h(x >> 3, y >> 2, 562) < 0.18) c = h(x, y, 563) < 0.2 ? K.rocaS : K.roca; }
      pset(x, y, c); } }
  for (let k = 0; k < 40; k++) { const fx = Math.floor(h(k, 3, 564) * 320), fy = 164 + Math.floor(h(k, 4, 564) * 14); pset(fx, fy, [hex('#e8402a'), hex('#f8e060'), C.blanco, hex('#c87ae8')][k % 4]); pset(fx, fy + 1, K.hierbaS); }
  for (const [rx, ry, rw] of [[110, 168, 16], [250, 172, 22], [300, 164, 12]]) { R.poligono([[rx, ry + 5], [rx + 3, ry], [rx + rw - 4, ry - 1], [rx + rw, ry + 5]], K.roca); linea(rx + 3, ry, rx + rw - 4, ry - 1, K.rocaL); linea(rx + 5, ry + 2, rx + 9, ry + 4, K.rocaS); rect(rx, ry + 6, rx + rw, ry + 6, K.hierbaS); }
}

// delante de la bahía: el olivo viejo de tronco retorcido a la izquierda y el murete de piedra seca
function r_cretaD(R, t, o) {
  const K = r_K, { rect, pset, disco, linea } = R;
  if ((o.camara ?? 'general') === 'puerto') {
    // la gaviota del bolardo y los cabos que van al barco van delante
    const gh = Math.sin(t * 0.9) > 0.3 ? 1 : -1, gx = 238, gy = 140; disco(gx, gy, 3, C.blanco); rect(gx - 4, gy - 1, gx + 2, gy + 1, C.blanco); rect(gx - 5, gy - 2, gx - 1, gy - 1, hex('#8a9aaa')); rect(gx - 7, gy, gx - 5, gy, hex('#3a3a46'));
    disco(gx + 2 * gh, gy - 4, 2, C.blanco); pset(gx + 4 * gh, gy - 4, hex('#f0b030')); pset(gx + 5 * gh, gy - 4, hex('#f0b030')); pset(gx + 2 * gh, gy - 5, C.k); pset(gx - 1, gy + 3, hex('#f0b030')); pset(gx + 1, gy + 3, hex('#f0b030'));
    return;
  }
  // el murete de piedra seca a la izquierda
  for (let i = 0; i < 9; i++) for (let j = 0; j < 3; j++) { const bx = i * 9 + (j % 2) * 4 - 4, by = 160 + j * 5, w = 8; rect(bx, by, bx + w - 1, by + 4, K.rocaS); rect(bx + 1, by, bx + w - 2, by + 3, h(i, j, 565) < 0.5 ? K.roca : K.rocaL); rect(bx + 1, by, bx + w - 2, by, K.rocaL); }
  rect(0, 175, 76, 179, K.hierbaS);
  // el olivo: tronco retorcido, ramas y copa de hojas plateadas que se mecen
  const m = Math.sin(t * 0.9);
  R.poligono([[18, 180], [34, 180], [30, 160], [36, 140], [28, 118], [22, 120], [26, 140], [16, 160]], hex('#5a4a3a'));
  linea(22, 178, 20, 160, hex('#7a6a56')); linea(24, 156, 28, 140, hex('#7a6a56')); linea(30, 176, 30, 162, hex('#3e3226')); linea(32, 150, 30, 130, hex('#3e3226'));
  linea(28, 122, 44, 108, hex('#5a4a3a')); linea(29, 122, 45, 109, hex('#5a4a3a')); linea(24, 120, 8, 100, hex('#5a4a3a'));
  const B = [[8, 104, 12], [28, 96, 14], [46, 104, 10], [2, 118, 8], [36, 112, 9]];
  for (const [bx, by, r] of B) disco(bx + m, by + 1, r, hex('#4a5a3a'));
  for (const [bx, by, r] of B) disco(bx + m - 1, by - 1, r * 0.8, hex('#6a7e52'));
  for (let k = 0; k < 60; k++) { const [bx, by, r] = B[k % B.length], a = h(k, 1, 566) * 6.28, d = h(k, 2, 566) * r, lx = Math.round(bx + m + Math.cos(a) * d), ly = Math.round(by + Math.sin(a) * d * 0.9);
    pset(lx, ly, Math.sin(t * 2 + k) > 0.3 ? hex('#b8c8a8') : hex('#8a9e74')); }
  for (const [ax, ay] of [[24, 100], [42, 108], [8, 112]]) { pset(ax + Math.round(m), ay, hex('#2a2a3a')); pset(ax + Math.round(m), ay + 1, hex('#3a3a4e')); }
}

// el muelle de Creta de cerca: el barco amarrado con su pasarela
function r_cretaPuerto(R, t, o) {
  const K = r_K;
  r_fijo(R, 'creta-p', () => r_cretaPuertoFijo(R));
  r_nubes(R, t, [[16, 34, 2, 0], [34, 26, 3.2, 150], [52, 20, 4.6, 70], [26, 14, 1.3, 230]], [C.blanco, hex('#e6eef6'), hex('#bccce0')]);
  for (let k = 0; k < 3; k++) r_gaviota(R, ((t * (12 + k * 3) + k * 120) % 380) - 30, 50 + k * 9 + Math.sin(t * 1.3 + k) * 3, t, k);
  // el agua: destellos y el chapoteo contra el muelle
  const fr = Math.floor(t * 3);
  for (let k = 0; k < 60; k++) { const y = 94 + Math.floor(h(k, fr, 567) * 50), x = Math.floor(h(k, fr + 3, 568) * 320); if (y > 132 && x < 180) continue; R.pset(x, y, K.espuma); R.pset(x + 1, y, K.espumaS); }
  for (let x = 0; x < 320; x++) { const ola = Math.sin(t * 2 + x * 0.12) + Math.sin(t * 1.3 - x * 0.05); R.pset(x, 145 - (ola > 0.8 ? 1 : 0), ola > 0.2 ? K.espuma : K.espumaS); }
  // un pez que salta de vez en cuando
  { const f = (t % 6) / 1.2; if (f < 1) { const px = 230 + f * 18, py = 118 - Math.sin(f * Math.PI) * 10; R.rect(Math.round(px), Math.round(py), Math.round(px) + 3, Math.round(py) + 1, hex('#a8b8c8')); R.pset(Math.round(px) - 1, Math.round(py) - 1, hex('#a8b8c8')); } }
  // el barco, que se mece un poco
  const vai = Math.sin(t * 1.2) * 1.2;
  r_barco(R, 14, 140 + vai, 140, t, { remosVer: false });
  // la pasarela del barco al muelle
  R.poligono([[134, 113 + vai], [143, 113 + vai], [192, 153], [182, 153]], hex('#9a6a3a')); R.linea(134, 113 + vai, 182, 153, hex('#c89a5a')); R.linea(135, 114 + vai, 183, 154, hex('#5a3a1a')); for (let k = 1; k < 9; k++) { const u = k / 9; R.linea(Math.round(134 + 48 * u), Math.round(113 + vai + (40 - vai) * u), Math.round(143 + 49 * u), Math.round(113 + vai + (40 - vai) * u), hex('#6a4220')); }
  // el banderín del mástil y los cabos de amarre que se tensan
  for (let i = 0; i < 10; i++) { const yy = Math.round(17 + vai + Math.sin(t * 6 - i * 0.7) * 1.2 + i * 0.2); R.pset(90 + i, yy, i < 5 ? hex('#e8c040') : hex('#c83a3a')); R.pset(90 + i, yy + 1, i < 8 ? hex('#e8c040') : hex('#c83a3a')); }
  R.linea(160, 100 + vai, 236, 141, hex('#c8a870')); R.linea(8, 104 + vai, 30, 141, hex('#c8a870'));
  // el cangrejo que cruza el muelle de lado
  { const u = (t % 14) / 14, cx = Math.round(320 - u * 120), cy = 174; R.rect(cx, cy - 2, cx + 4, cy, hex('#d84a2a')); R.pset(cx - 1, cy - 3, hex('#d84a2a')); R.pset(cx + 5, cy - 3, hex('#d84a2a')); const p = Math.floor(t * 8) % 2; R.pset(cx - 1 + p, cy + 1, hex('#a83a1a')); R.pset(cx + 5 - p, cy + 1, hex('#a83a1a')); R.pset(cx + 1, cy - 3, C.k); R.pset(cx + 3, cy - 3, C.k); }
  return { suelo: 168, cubierta: 114, pasarela: [[138, 114], [187, 153]], muelle: [0, 150, 319, 180], barco: [14, 0, 190, 140], libre: [[180, 300, 156, 180]] };
}

// lo fijo del muelle: cielo, mar, el promontorio con el palacio, el muelle de losas, bolardos, ánforas, cajas y redes
function r_cretaPuertoFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, K = r_K;
  r_degradado(R, 0, 0, 319, 92, [hex('#5a9ad8'), hex('#7ab4e6'), hex('#a8d0ee'), hex('#d8ecf4')]);
  for (let y = 92; y < 150; y++) for (let x = 0; x < 320; x++) { const v = (y - 92) / 58 * 3, i = Math.min(2, Math.floor(v)), f = v - i, cols = [K.mar0, K.mar1, K.mar2, K.mar3]; let c = f > r_um(x, y) ? cols[i + 1] : cols[i]; if (Math.sin(x * 0.2 + y * 2.1) > 0.9 && ((x + y) & 1)) c = r_mez(c, C.blanco, 0.25); pset(x, y, c); }
  // el promontorio del fondo con el palacio de columnas rojas
  for (let x = 196; x < 320; x++) { const top = Math.round(80 - 14 * Math.sin((x - 196) / 124 * Math.PI * 0.8) + Math.sin(x * 0.3)); for (let y = top; y < 94; y++) pset(x, y, y < top + 2 ? hex('#a8b070') : h(x, y, 569) < 0.3 ? hex('#7a8a5a') : hex('#8e9a64')); }
  for (const [px, py, pw, ph] of [[226, 60, 60, 12], [238, 52, 36, 8]]) { rect(px, py, px + pw, py + ph, K.ocre); rect(px, py, px + pw, py, hex('#f4dca8')); rect(px, py + ph, px + pw, py + ph, K.ocreS); for (let cx = px + 3; cx < px + pw - 1; cx += 5) { rect(cx, py + 2, cx + 1, py + ph - 1, K.rojo); pset(cx, py + 1, C.k); pset(cx + 1, py + 1, C.k); } }
  for (const hx of [250, 260]) { rect(hx, 50, hx + 3, 51, K.piedra); pset(hx, 49, K.piedra); pset(hx + 3, 49, K.piedra); }
  for (let k = 0; k < 14; k++) { const ox = 200 + Math.floor(h(k, 1, 570) * 116), oy = 76 + Math.floor(h(k, 2, 570) * 14); disco(ox, oy, 1.8, K.olivoS); pset(ox - 1, oy - 1, K.olivoL); }
  // el muelle de losas de piedra en perspectiva, con el bordillo hacia el mar
  rect(0, 146, 319, 150, K.piedra); rect(0, 146, 319, 146, hex('#f6f0e0')); rect(0, 150, 319, 150, K.piedraSS);
  for (let x = 0; x < 320; x += 14) rect(x, 147, x, 150, K.piedraS);
  for (let y = 151; y < 180; y++) { const fila = y < 157 ? 0 : y < 165 ? 1 : y < 175 ? 2 : 3, hh = [6, 8, 10, 12][fila], w = [16, 20, 26, 32][fila], off = fila % 2 ? w / 2 : 0;
    for (let x = 0; x < 320; x++) { const junta = y === 157 || y === 165 || y === 175 || Math.floor((x + off) / w) !== Math.floor((x + off - 1) / w); const b = h(Math.floor((x + off) / w), fila, 571);
      let c = junta ? K.piedraSS : b < 0.3 ? K.piedraS : K.piedra; if (!junta && h(x, y, 572) < 0.05) c = K.piedraS; if (!junta && h(x >> 1, y, 573) < 0.02) c = hex('#a8c070'); pset(x, y, c); } }
  // bolardos de piedra con su cabo enrollado
  for (const bx of [236, 30]) { rect(bx - 4, 142, bx + 4, 156, K.piedraSS); rect(bx - 3, 142, bx + 3, 155, K.piedraS); rect(bx - 3, 142, bx + 1, 143, K.piedra); rect(bx - 5, 140, bx + 5, 142, K.piedraSS); rect(bx - 4, 140, bx + 4, 140, K.piedra); }
  for (let k = 0; k < 4; k++) { R.anillo(266, 166, 7 - k * 1.5, hex('#c8a870')); } R.anillo(266, 166, 8, hex('#8a7048'));
  // ánforas, cajas y la red tendida
  for (const [ax, ay, c] of [[282, 162, K.ocreS], [292, 164, hex('#c8703a')], [302, 161, K.ocreS], [288, 172, hex('#b8602a')]]) { poligono([[ax - 4, ay - 10], [ax + 4, ay - 10], [ax + 5, ay - 6], [ax + 2, ay], [ax - 2, ay], [ax - 5, ay - 6]], c); rect(ax - 2, ay - 13, ax + 2, ay - 10, c); rect(ax - 3, ay - 13, ax + 3, ay - 13, r_mez(c, C.k, 0.3)); linea(ax - 3, ay - 8, ax - 3, ay - 4, r_mez(c, C.blanco, 0.35)); linea(ax - 4, ay - 11, ax - 6, ay - 8, c); }
  for (const [cx, cy] of [[300, 140], [308, 134]]) { rect(cx - 6, cy - 6, cx + 6, cy + 6, K.cascoS); rect(cx - 5, cy - 5, cx + 5, cy + 5, K.casco); linea(cx - 5, cy, cx + 5, cy, K.cascoS); linea(cx - 5, cy - 5, cx - 5, cy + 5, K.cascoL); }
  for (let y = 100; y < 130; y++) for (let x = 296; x < 320; x++) if (((x + y) % 4 === 0 || (x - y + 400) % 4 === 0)) pset(x, y + Math.round(Math.sin(x * 0.3) * 1.5), hex('#8a7a5a'));
  rect(294, 96, 296, 146, K.cascoS); rect(294, 96, 320, 98, K.cascoS);
}

const r_CI = {
  trav: hex('#e8d8b8'), travS: hex('#c4b08c'), travSS: hex('#9a8668'), travL: hex('#f6ecd6'), marmol: hex('#f0ece2'), marmolS: hex('#cfc8b8'), marmolL: hex('#ffffff'),
  arena: hex('#e2c88e'), arenaS: hex('#c8ac74'), arenaL: hex('#f0dcaa'), morado: hex('#6a2a8a'), moradoS: hex('#4a1a62'), moradoL: hex('#8a4aaa'), crema: hex('#f2e8d2'), cremaS: hex('#cfc0a0'),
  oro: hex('#e8b830'), oroS: hex('#a87a18'), oroL: hex('#fff0a0'), rojo: hex('#b83a2a'), grada: hex('#d4c4a2'), gradaS: hex('#a8987a'),
};

const r_TUNICA = ['#f0ece2', '#e0c890', '#c84a3a', '#5a7ac0', '#6a9a5a', '#a87a4a', '#e8e0c8', '#d88a4a', '#8a6aa8', '#f0ece2'].map(hex);

// un panecillo redondo que vuela girando (x, y su centro; s escala)
function r_panecillo(R, x, y, s, t, k) {
  const X = Math.round(x), Y = Math.round(y), a = Math.floor(t * 8 + k) % 4;
  R.disco(X, Y, 2.4 * s + 0.6, C.k); R.disco(X, Y, 2.4 * s, hex('#c8843a')); R.disco(X - 0.6 * s, Y - 0.6 * s, 1.4 * s, hex('#e8a85a'));
  if (a < 2) R.linea(X - Math.round(s), Y + (a ? 0 : -1), X + Math.round(s), Y + (a ? 0 : 1), hex('#8a5220')); else R.linea(X + (a === 2 ? -1 : 1), Y - Math.round(s), X + (a === 2 ? 1 : -1), Y + Math.round(s), hex('#8a5220'));
}

// una fila de público del anfiteatro (estático): cabezas y túnicas apretadas, con huecos
function r_publico(R, x0, x1, y, k, sk = 3, s = 1) {
  for (let x = x0; x < x1; x += sk) { const n = h(x, y, 580 + k); if (n < 0.08) continue; const tu = r_TUNICA[Math.floor(h(x, y, 581 + k) * 10)], pi = r_PIEL[Math.floor(h(x, y, 582 + k) * 4)], pe = r_PELO[Math.floor(h(x, y, 583 + k) * 5)];
    R.rect(x, y - 2 * s, x + 2 * s - 1, y, tu); R.rect(x, y - 2 * s, x, y, r_mez(tu, C.blanco, 0.3)); R.rect(x, y - 4 * s, x + 2 * s - 1, y - 2 * s - 1, pi); R.rect(x, y - 4 * s, x + 2 * s - 1, y - 4 * s + (s > 1 ? 1 : 0), pe); }
}

// el toldo a rayas moradas y crema con su faldón festoneado que ondea (de x0 a x1, de y0 a y1)
function r_toldo(R, t, x0, x1, y0, y1, ancho = 8) {
  const C2 = r_CI;
  for (let x = x0; x <= x1; x++) { const raya = Math.floor((x - x0) / ancho) % 2, on = Math.round(Math.sin(t * 3 - x * 0.12) * 1.2), fest = Math.round(Math.abs(Math.sin((x - x0) / ancho * Math.PI)) * 3);
    for (let y = y0; y <= y1 + on + fest; y++) { const c = raya ? C2.morado : C2.crema, sh = y > y1 + on + fest - 2 ? (raya ? C2.moradoS : C2.cremaS) : (y < y0 + 2 ? (raya ? C2.moradoL : C.blanco) : c); R.pset(x, y, sh); }
    if ((x - x0) % ancho === 0) R.pset(x, y1 + on + fest + 1, C2.oro); }
  R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 1, C2.oroS); R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, C2.oro);
}

function r_circo(R, t, o) {
  const CI = r_CI, cam = o.camara ?? 'general', panes = Math.max(0, Math.min(1, o.panes ?? 0));
  if (cam === 'palco') {
    r_fijo(R, 'circo-p', () => r_circoPalcoFijo(R));
    r_nubes(R, t, [[5, 16, 2, 40], [8, 10, 3.6, 200]], [C.blanco, hex('#e6eef6'), hex('#bccce0')]);
    // el público de enfrente que se levanta y agita los brazos
    for (let k = 0; k < 40; k++) { const x = 4 + Math.floor(h(k, 1, 584) * 312), y = 48 + Math.floor(h(k, 2, 584) * 7) * 10; if (x > 66 && x < 254) continue; if (Math.sin(t * 3 + k * 1.7) > 0.2) { R.pset(x + 1, y - 5, r_PIEL[k % 4]); R.pset(x + 1, y - 6, r_PIEL[k % 4]); } }
    r_toldo(R, t, 40, 268, 16, 30, 12);
    R.linea(40, 34, 58, 44, hex('#8a7048')); R.linea(268, 34, 262, 44, hex('#8a7048'));
    // los panes que salen del palco hacia el público de abajo
    const n = Math.round(panes * 9);
    for (let k = 0; k < n; k++) { const f = ((t * 0.55 + k * 0.37) % 1), lado = k % 2 ? 1 : -1, x = 160 + lado * (10 + f * (40 + (k % 4) * 30)), y = 120 - Math.sin(f * Math.PI * 0.9) * (40 + (k % 3) * 12) + f * f * 70; r_panecillo(R, x, y, 1 + f * 0.9, t, k); }
    return { suelo: 146, palco: [66, 136, 254, 146], trono: [132, 70, 188, 136], cestas: [[90, 110], [230, 110]], salidaPanes: [160, 120], libre: [[100, 220, 120, 146]] };
  }
  r_fijo(R, 'circo-g', () => r_circoFijo(R));
  r_nubes(R, t, [[8, 20, 2.4, 0], [14, 14, 3.8, 150], [6, 10, 1.4, 260]], [C.blanco, hex('#e6eef6'), hex('#bccce0')]);
  // los mástiles del muro alto con sus banderolas
  for (let k = 0; k < 8; k++) { const mx = 14 + k * 34; if (mx > 262) continue; for (let i = 0; i < 8; i++) { const yy = Math.round(18 + Math.sin(t * 5 - i * 0.8 + k) * 1.3 + i * 0.25); R.pset(mx + 1 + i, yy, k % 2 ? CI.morado : CI.rojo); R.pset(mx + 1 + i, yy + 1, i < 6 ? (k % 2 ? CI.moradoL : hex('#e85a4a')) : (k % 2 ? CI.morado : CI.rojo)); } }
  // el público que se levanta y agita los brazos, y alguna tela que se mueve
  for (let k = 0; k < 80; k++) { const x = 2 + Math.floor(h(k, 1, 585) * 316), fila = Math.floor(h(k, 2, 585) * 10), y = 52 + fila * 5 + (fila >> 1); if (x > 116 && x < 204 && y > 54) continue;
    const w = Math.sin(t * 3.2 + k * 1.3); if (w > 0.1) { R.pset(x + (w > 0.6 ? 2 : -1), y - 5, r_PIEL[k % 4]); R.pset(x + (w > 0.6 ? 2 : -1), y - 4, r_TUNICA[k % 10]); } if (k % 9 === 0 && w > -0.2) { R.rect(x - 1, y - 8, x + 2, y - 7, k % 2 ? CI.rojo : CI.oro); R.pset(x, y - 6, hex('#6a4a2a')); } }
  r_toldo(R, t, 114, 206, 52, 60, 8);
  // el mozo que rastrilla la arena y las palomas que picotean
  { const u = (t * 0.06) % 1, mx = Math.round(30 + u * 260); r_persona(R, mx, 146, 4, t, { anda: true, ropa: hex('#a87a4a'), dir: 1 }); const rr = Math.round(Math.sin(t * 5) * 1.5); R.linea(mx - 2, 142, mx - 10 + rr, 147, hex('#6a4a2a')); R.linea(mx - 10 + rr, 145, mx - 10 + rr, 149, hex('#4a4a4a'));
    for (let x = 30; x < mx - 10; x += 2) R.pset(x, 147 + ((x >> 2) & 1), CI.arenaL); }
  for (let k = 0; k < 4; k++) { const px = 236 + k * 9 + Math.round(Math.sin(t * 0.5 + k) * 3), py = 150 + (k % 2) * 4, pic = Math.sin(t * 5 + k * 2) > 0.5 ? 1 : 0; R.rect(px, py - 2, px + 3, py, hex('#8a8a96')); R.pset(px + 4, py - 3 + pic, hex('#8a8a96')); R.pset(px + 5, py - 3 + pic, hex('#3a3a3a')); R.pset(px + 1, py - 1, hex('#5a7a8a')); R.pset(px + 1, py + 1, hex('#e86a3a')); }
  // los panes que vuelan desde el palco a las gradas
  const n = Math.round(panes * 12);
  for (let k = 0; k < n; k++) { const f = ((t * 0.5 + k * 0.29) % 1), tx = 10 + h(k, 1, 586) * 300, ty = 54 + h(k, 2, 586) * 46, x = 160 + (tx - 160) * f, y = 90 + (ty - 90) * f - Math.sin(f * Math.PI) * 26; r_panecillo(R, x, y, 1, t, k);
    if (f > 0.9) { R.pset(Math.round(tx), Math.round(ty) - 6, r_PIEL[k % 4]); R.pset(Math.round(tx) + 2, Math.round(ty) - 6, r_PIEL[(k + 1) % 4]); } }
  return { suelo: 168, palco: [122, 98, 198, 108], emperador: [153, 108], salidaPanes: [160, 90], puertas: [[24, 104, 52, 128], [268, 104, 296, 128]], arena: [0, 126, 319, 180], libre: [[40, 290, 150, 180]] };
}

// lo fijo del anfiteatro: cielo, muro alto con arcos, gradas llenas, el palco, el podio de mármol, las puertas y la arena
function r_circoFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, CI = r_CI;
  r_degradado(R, 0, 0, 319, 30, [hex('#4a8ad8'), hex('#6aa6e2'), hex('#9cc6ec')]);
  // el muro alto (ático) de travertino con ventanas en arco, de poco contraste a la derecha (la esquina de Atom)
  rect(0, 24, 319, 46, CI.trav); rect(0, 24, 319, 25, CI.travL); rect(0, 26, 319, 26, CI.travS); rect(0, 45, 319, 46, CI.travSS);
  for (let x = 4; x < 320; x += 17) { const suave = x > 262; const c = suave ? CI.travS : hex('#8aa6c8'); rect(x, 31, x + 7, 41, suave ? CI.trav : CI.travSS); rect(x + 1, 32, x + 6, 41, c); disco(x + 3.5, 32, 3, c); rect(x, 42, x + 7, 42, CI.travL); }
  for (let x = 0; x < 320; x++) for (let y = 27; y < 45; y++) if (h(x, y, 587) < 0.05 && R.pget(x, y) === CI.trav) pset(x, y, CI.travS);
  for (let k = 0; k < 8; k++) { const mx = 14 + k * 34; if (mx > 262) continue; rect(mx, 14, mx, 26, hex('#6a4a2a')); }
  // las gradas: cinco pisos de público con su pretil de mármol
  for (let piso = 0; piso < 5; piso++) { const y0 = 47 + piso * 11; rect(0, y0, 319, y0 + 10, CI.grada); for (let y = y0 + 4; y < y0 + 10; y += 5) rect(0, y, 319, y, CI.gradaS);
    r_publico(R, (piso * 2) % 3, 320, y0 + 4, piso * 2); r_publico(R, ((piso * 2) + 1) % 3, 320, y0 + 9, piso * 2 + 1);
    rect(0, y0 + 10, 319, y0 + 10, CI.marmolS); for (let x = (piso * 23) % 40; x < 320; x += 40) rect(x, y0 + 1, x + 2, y0 + 10, CI.gradaS); }
  // el pretil bajo las gradas: mármol en sombra con pilastras
  rect(0, 102, 319, 109, CI.marmolS); rect(0, 102, 319, 102, CI.marmol); for (let x = 8; x < 320; x += 20) { rect(x, 103, x + 2, 109, CI.marmol); pset(x + 2, 104, CI.marmolL); }
  // el palco del emperador: columnas, entablamento, cortina morada con pliegues y su suelo
  rect(118, 52, 202, 110, CI.marmolS);
  for (let x = 128; x <= 192; x++) for (let y = 62; y <= 108; y++) { const f = (x - 128) % 8; pset(x, y, f === 0 ? CI.moradoS : f < 3 ? CI.moradoL : CI.morado); }
  for (let x = 128; x <= 192; x += 2) pset(x, 63 + ((x >> 1) % 2), CI.oro);
  for (const cx of [122, 194]) { rect(cx, 62, cx + 5, 110, CI.marmol); rect(cx + 4, 62, cx + 5, 110, CI.marmolS); rect(cx + 2, 62, cx + 2, 110, CI.marmolS); rect(cx - 1, 60, cx + 6, 62, CI.oro); rect(cx - 1, 108, cx + 6, 110, CI.marmolS); }
  rect(118, 58, 202, 61, CI.marmol); rect(118, 58, 202, 58, CI.marmolL); rect(118, 61, 202, 61, CI.oroS);
  // el podio de mármol con su franja roja, relieves y las dos puertas de la arena
  rect(0, 110, 319, 126, CI.marmol); rect(0, 110, 319, 110, CI.marmolL); rect(0, 114, 319, 116, CI.rojo); rect(0, 117, 319, 117, hex('#7a2218')); rect(0, 125, 319, 126, CI.marmolS);
  for (let x = 6; x < 320; x += 26) { rect(x, 119, x + 18, 123, CI.marmolS); for (let k = 0; k < 4; k++) { pset(x + 3 + k * 4, 120, CI.travSS); rect(x + 3 + k * 4, 121, x + 4 + k * 4, 123, CI.travSS); } }
  for (const [gx, gw] of [[24, 28], [268, 28]]) { rect(gx - 2, 102, gx + gw + 2, 128, CI.marmolS); rect(gx, 106, gx + gw, 128, hex('#2a1e18')); disco(gx + gw / 2, 106, gw / 2, hex('#2a1e18')); for (let x = gx + 2; x < gx + gw; x += 4) rect(x, 100, x, 128, hex('#6a4a2a')); for (let y = 108; y < 128; y += 5) rect(gx, y, gx + gw, y, hex('#6a4a2a')); disco(gx + gw / 2, 104, gw / 2 + 2, CI.marmolS); disco(gx + gw / 2, 106, gw / 2, hex('#2a1e18')); for (let x = gx + 2; x < gx + gw; x += 4) for (let y = 92; y < 128; y++) if (R.pget(x, y) === hex('#2a1e18')) pset(x, y, hex('#6a4a2a')); }
  // la arena rastrillada: rayas onduladas, huellas, piedrecitas y la sombra del podio
  for (let y = 127; y < 180; y++) for (let x = 0; x < 320; x++) { let c = CI.arena; const r = Math.sin(x * 0.18 + Math.sin(y * 0.4) * 1.5 + y * 0.9);
    if (r > 0.82) c = CI.arenaS; else if (r < -0.9) c = CI.arenaL; if (h(x, y, 588) < 0.03) c = CI.arenaS; if (y < 133 && ((x + y) & 1)) c = r_mez(c, C.k, 0.18); pset(x, y, c); }
  for (let k = 0; k < 18; k++) { const fx = 50 + k * 12 + Math.round(Math.sin(k) * 4), fy = 160 + (k % 2) * 3 - Math.round(k * 0.4); rect(fx, fy, fx + 1, fy + 1, CI.arenaS); }
  for (let k = 0; k < 30; k++) pset(Math.floor(h(k, 1, 589) * 320), 130 + Math.floor(h(k, 2, 589) * 50), CI.travSS);
  // un cubo de agua y un rastrillo apoyado junto a la puerta
  rect(60, 128, 66, 136, hex('#6a4a2a')); rect(60, 128, 66, 129, hex('#8a6a3a')); rect(61, 130, 65, 130, hex('#5a8ac0')); linea(70, 126, 76, 104, hex('#6a4a2a')); rect(72, 102, 80, 103, hex('#5a5a5a'));
}

// lo fijo del palco de cerca: cielo, público de enfrente (con calima), columnas, el trono morado y oro y las cestas de pan
function r_circoPalcoFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, CI = r_CI;
  r_degradado(R, 0, 0, 319, 18, [hex('#4a8ad8'), hex('#7ab0e4')]);
  rect(0, 18, 319, 30, CI.trav); rect(0, 18, 319, 18, CI.travL); for (let x = 6; x < 320; x += 14) { rect(x, 21, x + 5, 28, x > 262 ? CI.travS : hex('#8aa6c8')); }
  for (let piso = 0; piso < 9; piso++) { const y0 = 30 + piso * 10; rect(0, y0, 319, y0 + 9, CI.grada); r_publico(R, piso % 3, 320, y0 + 5, 20 + piso * 2); r_publico(R, (piso + 1) % 3, 320, y0 + 9, 21 + piso * 2); rect(0, y0 + 9, 319, y0 + 9, CI.gradaS); }
  for (let y = 30; y < 120; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) === 0) pset(x, y, r_mez(R.pget(x, y), hex('#d8e4ee'), 0.22));
  rect(0, 120, 319, 132, CI.marmol); rect(0, 120, 319, 120, CI.marmolL); rect(0, 124, 319, 126, CI.rojo); rect(0, 132, 319, 136, CI.marmolS);
  // el suelo del palco en sombra, que se ve entre los balaustres: losas de mármol y una alfombra morada
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const j = (y - 136) % 9 === 0 || (x + Math.floor((y - 136) / 9) * 11) % 22 === 0; pset(x, y, j ? hex('#8a8478') : h(x >> 1, y, 590) < 0.1 ? hex('#a8a296') : hex('#b8b2a4')); }
  for (let y = 140; y < 180; y++) for (let x = 120; x < 200; x++) pset(x, y, (x === 120 || x === 199) ? CI.oroS : ((x + y) % 6 === 0 ? CI.moradoS : CI.morado));
  // las columnas acanaladas con sus capiteles y basas
  for (const cx of [50, 254]) { rect(cx, 36, cx + 16, 136, CI.marmol); for (let x = cx + 2; x < cx + 16; x += 3) rect(x, 40, x, 130, CI.marmolS); rect(cx + 13, 36, cx + 16, 136, CI.marmolS); rect(cx + 1, 36, cx + 2, 136, CI.marmolL);
    rect(cx - 3, 30, cx + 19, 36, CI.marmol); rect(cx - 3, 30, cx + 19, 30, CI.marmolL); disco(cx - 1, 33, 3, CI.marmolS); disco(cx + 17, 33, 3, CI.marmolS); rect(cx - 3, 130, cx + 19, 136, CI.marmolS); rect(cx - 3, 130, cx + 19, 130, CI.marmol); }
  // el trono: respaldo alto morado con marco de oro, cresta con un águila sin letras
  rect(130, 68, 190, 136, CI.oroS); rect(132, 70, 188, 136, CI.oro); rect(136, 74, 184, 136, CI.moradoS); for (let x = 137; x < 184; x++) for (let y = 75; y < 136; y++) if ((x - 137) % 8 > 1) pset(x, y, (x - 137) % 8 < 4 ? CI.moradoL : CI.morado);
  disco(160, 68, 14, CI.oroS); disco(160, 68, 12, CI.oro); disco(160, 68, 9, CI.moradoS); r_picto(R, 'ave', 158, 64, CI.oroL, 1); rect(146, 68, 174, 70, CI.oro);
  for (let x = 134; x < 188; x += 6) pset(x, 72, CI.oroL);
  // las cestas de pan en sus pedestales
  for (const bx of [90, 230]) { rect(bx - 10, 116, bx + 10, 136, CI.marmol); rect(bx - 10, 116, bx + 10, 117, CI.marmolL); rect(bx + 7, 116, bx + 10, 136, CI.marmolS);
    poligono([[bx - 12, 104], [bx + 12, 104], [bx + 9, 116], [bx - 9, 116]], hex('#a87a3a')); for (let y = 106; y < 116; y += 3) linea(bx - 11 + (y - 104) / 4, y, bx + 11 - (y - 104) / 4, y, hex('#7a5220')); for (let x = bx - 10; x < bx + 11; x += 3) linea(x, 105, x, 115, hex('#c8984a'));
    for (const [dx, dy] of [[-7, 103], [0, 101], [7, 103], [-3, 98], [4, 98]]) { disco(bx + dx, dy, 3.6, hex('#8a5220')); disco(bx + dx, dy, 3, hex('#c8843a')); disco(bx + dx - 1, dy - 1, 1.6, hex('#e8a85a')); } }
}

// delante del anfiteatro: la barandilla del palco con la colgadura morada, su fleco de oro y la corona de laurel
function r_circoD(R, t, o) {
  const CI = r_CI, { rect, pset, disco } = R, palco = (o.camara ?? 'general') === 'palco';
  const x0 = palco ? 0 : 118, x1 = palco ? 319 : 202, y0 = palco ? 136 : 98, y1 = palco ? 180 : 110, s = palco ? 2 : 1;
  rect(x0, y0, x1, y0 + 3 * s, CI.marmol); rect(x0, y0, x1, y0, CI.marmolL); rect(x0, y0 + 3 * s, x1, y0 + 3 * s, CI.marmolS);
  for (let x = x0 + 3 * s; x < x1 - 2 * s; x += 7 * s) { for (let y = y0 + 3 * s + 1; y < y1 - 3 * s; y++) { const u = (y - y0 - 3 * s) / (y1 - y0 - 6 * s), w = Math.round((1.2 + Math.sin(u * Math.PI) * 1.4) * s); rect(x - w, y, x + w, y, CI.marmol); pset(x + w, y, CI.marmolS); pset(x - w, y, CI.marmolL); } }
  rect(x0, y1 - 3 * s, x1, y1, CI.marmol); rect(x0, y1 - 3 * s, x1, y1 - 3 * s, CI.marmolL); rect(x0, y1, x1, y1, CI.marmolS);
  // la colgadura morada con fleco de oro que se mece y la corona de laurel
  const cx = 160, w = palco ? 44 : 18, top = y0 + 2 * s, bot = palco ? 172 : 109, sw = Math.sin(t * 1.5);
  for (let y = top; y <= bot; y++) { const d = Math.round(sw * (y - top) / (bot - top) * s); for (let x = cx - w; x <= cx + w; x++) { const f = (x - cx + w) % (4 * s); pset(x + d, y, f === 0 ? CI.moradoS : f < 2 * s ? CI.moradoL : CI.morado); } }
  for (let x = cx - w; x <= cx + w; x += s) { const d = Math.round(sw * s); rect(x + d, bot + 1, x + d, bot + 2 * s, x % (2 * s) ? CI.oro : CI.oroS); }
  rect(cx - w, top, cx + w, top + s - 1, CI.oro);
  const r = palco ? 12 : 5, ly = Math.round((top + bot) / 2); R.anillo(cx, ly, r, CI.oroS); R.anillo(cx, ly, r - s, CI.oro);
  for (let k = 0; k < 14; k++) { const a = Math.PI * (0.15 + k / 14 * 1.7), lx = Math.round(cx + Math.cos(a) * (r - 0.5 * s)), ly2 = Math.round(ly + Math.sin(a) * (r - 0.5 * s)); pset(lx, ly2, k % 2 ? hex('#5aa83a') : hex('#3a7a24')); if (palco) pset(lx + 1, ly2, hex('#5aa83a')); }
}

const r_B = {
  yeso: hex('#3e322c'), yesoL: hex('#4a3c34'), roble: hex('#4a3020'), robleL: hex('#6a4a30'), robleS: hex('#33200f'), robleD: hex('#22140a'),
  suelo: hex('#3a2618'), sueloL: hex('#4a3220'), sueloS: hex('#2a1a10'), cuero: hex('#2e4a32'), cueroL: hex('#3e6244'), laton: hex('#c8a050'), latonL: hex('#f0d080'), latonS: hex('#8a6a2a'),
  vela: hex('#f2e8d0'), llama: hex('#ffd060'), llamaL: hex('#fff8d0'), calida: hex('#f0b860'), cortina: hex('#2e4a3a'), cortinaL: hex('#40624e'), cortinaS: hex('#1e3428'),
};

const r_LOMOS = ['#6a2a2a', '#2e4a32', '#4a3020', '#2a3450', '#8a6a2a', '#5a2a3a', '#3a3a2a', '#7a4a2a'].map(hex);

// una llama de vela que tiembla, con su resplandor (x, y: la base de la mecha)
function r_llama(R, x, y, t, k = 0, s = 1) {
  const tb = Math.round(Math.sin(t * 9 + k * 3) * 0.6 + Math.sin(t * 13.7 + k) * 0.5), a = 4 * s + (Math.sin(t * 7 + k) > 0.5 ? 1 : 0);
  for (let j = 0; j < a; j++) { const w = j < a * 0.3 ? 1 : j < a * 0.7 ? Math.max(1, Math.round(1.5 * s)) : 1, dx = Math.round(tb * j / a); for (let i = -w + 1; i < w; i++) R.pset(x + i + dx, y - j - 1, j < a * 0.5 && Math.abs(i) < w - 1 + (s > 1 ? 1 : 0) ? r_B.llamaL : r_B.llama); }
  R.pset(x, y, hex('#2a1a10'));
}

// estanterías de libros sin letras en (x0, y0)–(x1, y1): marco de madera, baldas cada alto px, lomos de cuero con
// bandas doradas, alguno inclinado, y de vez en cuando un objeto (un busto, una jarra, un reloj de arena)
function r_estante(R, x0, y0, x1, y1, alto, k) {
  const B = r_B, { rect, pset, linea } = R;
  rect(x0, y0, x1, y1, B.robleD); rect(x0 + 3, y0 + 3, x1 - 3, y1, B.robleS);
  for (let y = y0 + 3, f = 0; y + alto <= y1; y += alto, f++) { const base = y + alto - 3;
    for (let x = x0 + 4; x < x1 - 4;) { const n = h(x, f, 600 + k); if (n < 0.06) { x += 6; continue; }
      if (n < 0.1 && x < x1 - 14) { // un objeto
        const o = Math.floor(h(f, x, 601 + k) * 3); if (o === 0) { rect(x + 2, base - 4, x + 7, base, hex('#d8d4c8')); R.disco(x + 4.5, base - 7, 2.6, hex('#e8e4d8')); pset(x + 3, base - 8, hex('#c8c4b8')); }
        else if (o === 1) { rect(x + 1, base - 6, x + 6, base, hex('#6a7a8a')); rect(x + 2, base - 7, x + 5, base - 7, hex('#8a9aaa')); pset(x + 2, base - 5, hex('#aabaca')); }
        else { rect(x + 1, base - 8, x + 6, base - 8, B.laton); rect(x + 1, base, x + 6, base, B.laton); linea(x + 2, base - 7, x + 5, base - 1, hex('#e8d8a8')); linea(x + 5, base - 7, x + 2, base - 1, hex('#e8d8a8')); pset(x + 3, base - 2, hex('#e8c878')); pset(x + 4, base - 2, hex('#e8c878')); }
        x += 10; continue; }
      const w = 2 + Math.floor(h(x, f, 602 + k) * 3), hb = alto - 6 - Math.floor(h(x, f, 603 + k) * 4), c = r_LOMOS[Math.floor(h(x, f, 604 + k) * 8)];
      if (n > 0.95 && x + w + 4 < x1 - 4) { linea(x, base, x + 5, base - hb + 1, c); linea(x + 1, base, x + 6, base - hb + 1, c); linea(x + 2, base, x + 7, base - hb + 1, r_mez(c, C.k, 0.3)); x += 9; continue; }
      rect(x, base - hb, x + w, base, c); rect(x, base - hb, x, base, r_mez(c, C.blanco, 0.22)); rect(x + w, base - hb, x + w, base, r_mez(c, C.k, 0.3));
      if (h(x, f, 605 + k) < 0.7) { rect(x, base - hb + 2, x + w, base - hb + 2, B.laton); rect(x, base - 3, x + w, base - 3, B.latonS); }
      x += w + 1; }
    rect(x0 + 3, base + 1, x1 - 3, base + 2, B.robleL); rect(x0 + 3, base + 1, x1 - 3, base + 1, hex('#8a6a48')); }
  rect(x0, y0, x0 + 2, y1, B.robleL); rect(x0, y0, x1, y0 + 1, B.robleL);
}

// una plaza de noche vista por una ventana en (x0, y0)–(x1, y1) (recortada a ella), escalada al ancho: cielo con estrellas
// y luna, tejados con chimeneas que humean, casas de piedra con ventanas encendidas, el edificio del balcón iluminado con
// tres figuras que dirigen (una gesticula), antorchas, y la multitud de figuritas que mira hacia el balcón
function r_plaza(R, t, x0, y0, x1, y1) {
  const k = (x1 - x0 + 1) / 208, X = (u) => Math.round(x0 + u * k), Y = (v) => Math.round(y1 - v * k), { pset } = R;
  R.recorte([x0, y0, x1, y1]);
  r_degradado(R, x0, y0, x1, Y(60), [hex('#0a1028'), hex('#141c40'), hex('#262a56'), hex('#3a3060')]);
  for (let i = 0; i < 30; i++) { const sx = x0 + Math.floor(h(i, 1, 610) * (x1 - x0)), sy = y0 + Math.floor(h(i, 2, 610) * (Y(70) - y0)); if (Math.sin(t * 2 + i * 1.7) > -0.3) pset(sx, sy, i % 5 ? hex('#8a90c0') : C.blanco); }
  { const mx = X(30), my = Math.max(y0 + 8 * k, Y(100)); R.disco(mx, my, 6 * k + 1, hex('#e8e6d0')); R.disco(mx + k, my - k, 5 * k, hex('#f8f6e8')); pset(mx - 1, my + 1, hex('#c8c6b0')); }
  // los tejados del fondo con chimeneas y su humo
  for (let u = 0; u < 208; u++) { const top = 60 + Math.round(8 * Math.abs(Math.sin(u * 0.09)) + (u % 37 < 4 ? 8 : 0)); for (let v = 30; v < top; v++) pset(X(u), Y(v), hex('#1a1c30')); }
  for (let c = 0; c < 4; c++) { const cu = 20 + c * 52; for (let i = 0; i < 4; i++) { const f = (t * 0.25 + i / 4 + c * 0.3) % 1; R.disco(X(cu + f * 10), Y(74 + f * 22), (1 + f * 2.5) * k, f < 0.5 ? hex('#3a3c56') : hex('#2c2e46')); } }
  // las casas de los lados con ventanas que se encienden
  for (const [u0, u1, alto, col] of [[0, 66, 66, hex('#4a4440')], [142, 208, 70, hex('#46403c')]]) { R.rect(X(u0), Y(alto), X(u1), y1, col);
    for (let v = 12; v < alto - 4; v += 10) for (let u = u0 + 5; u < u1 - 4; u += 10) { const on = h(u, v, 611) < 0.55 && Math.sin(t * 0.4 + u + v) > -0.6, wx = X(u), wy = Y(v + 6);
      R.rect(wx, wy, wx + Math.max(1, Math.round(4 * k)), wy + Math.max(1, Math.round(5 * k)), on ? hex('#f0c060') : hex('#1a1820')); } }
  // el edificio del balcón, iluminado por dos antorchas
  R.rect(X(66), Y(84), X(142), y1, hex('#6a5e54')); R.rect(X(66), Y(84), X(142), Y(82), hex('#8a7c6e'));
  R.poligono([[X(64), Y(84)], [X(104), Y(100)], [X(144), Y(84)]], hex('#5a4e46'));
  for (const u of [74, 126]) { R.rect(X(u), Y(76), X(u + 6), Y(64), hex('#f0c060')); R.rect(X(u), Y(40), X(u + 6), Y(28), hex('#d8a050')); }
  R.rect(X(96), Y(68), X(112), Y(50), hex('#f8d888')); R.rect(X(98), Y(66), X(110), Y(50), hex('#ffe8a8'));
  R.rect(X(84), Y(50), X(124), Y(46), hex('#4a3e36')); for (let u = 85; u < 124; u += 3) R.rect(X(u), Y(56), X(u), Y(50), hex('#2a2420')); R.rect(X(84), Y(57), X(124), Y(56), hex('#2a2420'));
  const sb = Math.max(1, Math.round(k * 1.3));
  r_persona(R, X(92), Y(56), 7, t, { s: sb, ropa: hex('#2a2a3a') }); r_persona(R, X(104), Y(56), 0, t, { s: sb, ropa: hex('#8a2a2a'), brazo: 0.6 + 0.4 * Math.sin(t * 2) }); r_persona(R, X(116), Y(56), 5, t, { s: sb, ropa: hex('#2a3450'), dir: -1 });
  R.rect(X(84), Y(55), X(124), Y(55), hex('#2a2420'));
  for (const u of [80, 128]) { R.rect(X(u), Y(44), X(u + 1), Y(34), hex('#3a2a1a')); r_llama(R, X(u) + 1, Y(44), t, u, Math.max(1, Math.round(k))); R.disco(X(u) + 1, Y(47), 4 * k, hex('#e89a40')); r_llama(R, X(u) + 1, Y(44), t, u, Math.max(1, Math.round(k))); }
  // el empedrado y la multitud que mira al balcón
  R.rect(x0, Y(22), x1, y1, hex('#3a3430')); for (let v = 1; v < 22; v += 3) for (let u = (v % 2) * 2; u < 208; u += 4) pset(X(u), Y(v), hex('#4a4440'));
  for (let fila = 0; fila < 6; fila++) for (let u = 2 + (fila % 2) * 3; u < 206; u += 6) { const n = h(u, fila, 612); if (n < 0.1) continue; const v = 4 + fila * 3.2, bob = Math.sin(t * 2 + u * 0.3 + fila) > 0.7 ? 1 : 0, px = X(u), py = Y(v) - bob;
    const col = r_ROPA[Math.floor(n * 10)], dk = r_mez(col, C.k, 0.45), s = Math.max(1, Math.round(k * 1.2));
    R.rect(px, py - 2 * s, px + 2 * s - 1, py, dk); R.rect(px, py - 4 * s + 1, px + 2 * s - 1, py - 2 * s, r_PIEL[Math.floor(n * 37) % 4]); R.rect(px, py - 4 * s + 1, px + 2 * s - 1, py - 4 * s + 1, r_PELO[Math.floor(n * 53) % 5]);
    if (n > 0.93 && Math.sin(t * 2.4 + u) > 0) R.rect(px + 2 * s, py - 6 * s, px + 2 * s, py - 3 * s, dk); }
  R.recorte(null);
}

function r_biblioteca(R, t, o) {
  const B = r_B, cam = o.camara ?? 'general', fl = 0.85 + 0.15 * Math.sin(t * 9) * Math.sin(t * 5.3);
  if (cam === 'ventana') {
    r_fijo(R, 'biblio-v', () => r_biblioVentanaFijo(R));
    r_plaza(R, t, 56, 22, 262, 150);
    for (const x of [124, 194]) R.rect(x, 22, x + 2, 150, B.robleS); for (const y of [64, 108]) R.rect(56, y, 262, y + 2, B.robleS);
    for (const x of [124, 194]) R.rect(x, 22, x, 150, B.robleL); for (const y of [64, 108]) R.rect(56, y, 262, y, B.robleL);
    r_biblioAlfeizar(R);
    r_llama(R, 84, 139, t, 1, 2); r_halo(R, 84, 134, 60, 40, B.calida, 0.3 * fl);
    for (let k = 0; k < 3; k++) { const f = (t * 0.5 + k / 3) % 1; R.pset(85 + Math.round(Math.sin(t * 3 + k) * 2), 136 - Math.round(f * 20), r_mez(R.pget(85, 136 - Math.round(f * 20)), hex('#b8b0a0'), 0.5 - f * 0.4)); }
    return { suelo: 178, cristal: [56, 22, 262, 150], alfeizar: [40, 150, 280, 158], balcon: [140, 94, 180, 98], vela: [84, 139], libre: [[150, 270, 158, 180]] };
  }
  r_fijo(R, 'biblio-g', () => r_biblioFijo(R));
  r_plaza(R, t, 118, 26, 202, 94);
  for (const x of [145, 174]) R.rect(x, 26, x + 1, 94, B.robleS); for (const y of [48, 71]) R.rect(118, y, 202, y + 1, B.robleS);
  for (const [sx, k] of [[224, 0], [232, 1]]) r_llama(R, sx, 50, t, k);
  r_halo(R, 228, 46, 40, 30, B.calida, 0.28 * fl);
  r_halo(R, 210, 118, 150, 104, B.calida, 0.22 * fl);
  // el péndulo del reloj de caja
  { const px = Math.round(Math.sin(t * 3.1) * 3); R.linea(252, 88, 252 + px, 106, B.latonS); R.disco(252 + px, 107, 2.5, B.laton); }
  return { suelo: 170, detrasEscritorio: 136, escritorio: [90, 134, 238, 180], hume: [140, 136], vela: [210, 121], tintero: [108, 129], ventana: [112, 20, 208, 98], globo: [292, 126], reloj: [252, 60], libre: [[20, 90, 150, 178], [100, 230, 110, 136]] };
}
// lo fijo del estudio: yeso y friso de madera, estanterías, ventana de guillotina con cortinas, aplique, reloj de caja,
// globo terráqueo, el suelo de tablas y la alfombra
function r_biblioFijo(R) {
  const B = r_B, { rect, pset, disco, linea, poligono } = R;
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 6 ? (y === 5 ? B.robleS : B.robleD) : h(x >> 1, y >> 1, 613) < 0.2 ? B.yesoL : h(x, y, 614) < 0.06 ? hex('#30262a') : B.yeso);
  rect(0, 6, 319, 7, B.robleL);
  r_madera(R, 0, 96, 319, 120, B.roble, B.robleS, B.robleL, B.robleD, 4, 6); for (let x = 6; x < 320; x += 40) { rect(x, 100, x + 32, 116, B.robleS); rect(x + 1, 101, x + 31, 115, B.roble); rect(x + 1, 101, x + 31, 101, B.robleL); }
  rect(0, 96, 319, 97, B.robleL);
  r_estante(R, 0, 10, 90, 120, 18, 0); r_estante(R, 238, 52, 319, 120, 17, 1);
  // la ventana de guillotina en su hueco, con cortinas recogidas
  rect(108, 16, 212, 102, B.robleD); rect(112, 20, 208, 98, B.robleS); rect(116, 24, 204, 96, hex('#101428'));
  rect(104, 98, 216, 103, B.robleL); rect(104, 98, 216, 98, hex('#8a6a48')); rect(104, 103, 216, 104, B.robleD);
  for (const [x0, x1] of [[96, 118], [202, 224]]) for (let y = 12; y < 118; y++) { const ap = y > 60 && y < 70 ? 4 : y > 50 && y < 80 ? 2 : 0; for (let x = x0 + (x0 < 150 ? 0 : ap); x <= x1 - (x0 < 150 ? ap : 0); x++) { const f = (x - x0) % 6; pset(x, y, f === 0 ? B.cortinaS : f < 3 ? B.cortinaL : B.cortina); } }
  rect(94, 10, 226, 12, B.latonS); rect(94, 10, 226, 10, B.laton); for (const [tx, ty] of [[107, 64], [213, 64]]) { disco(tx, ty, 3, B.laton); pset(tx - 1, ty - 1, B.latonL); }
  // el aplique de latón con dos velas
  rect(226, 52, 230, 60, B.latonS); rect(220, 56, 236, 57, B.laton); for (const sx of [224, 232]) { rect(sx - 1, 51, sx + 1, 56, B.vela); rect(sx - 2, 56, sx + 2, 57, B.laton); }
  // el reloj de caja entre la estantería y la cortina
  { const cx = 252; rect(cx - 10, 60, cx + 10, 132, B.robleD); rect(cx - 8, 62, cx + 8, 130, B.roble); rect(cx - 8, 62, cx - 7, 130, B.robleL); disco(cx, 72, 7, B.laton); disco(cx, 72, 6, hex('#f0e8d0')); linea(cx, 72, cx, 68, C.k); linea(cx, 72, cx + 3, 73, C.k);
    for (let a = 0; a < 12; a++) pset(Math.round(cx + Math.cos(a / 12 * 6.28) * 5), Math.round(72 + Math.sin(a / 12 * 6.28) * 5), hex('#6a5a3a'));
    rect(cx - 6, 84, cx + 6, 114, hex('#1a1008')); rect(cx - 6, 84, cx + 6, 84, B.robleS); rect(cx - 11, 57, cx + 11, 60, B.robleL); disco(cx, 56, 4, B.robleL); rect(cx - 12, 130, cx + 12, 134, B.robleD); }
  // el globo terráqueo en su pie
  linea(286, 150, 292, 136, B.robleD); linea(298, 150, 292, 136, B.robleD); rect(288, 134, 296, 136, B.roble); R.anillo(292, 126, 10, B.latonS);
  disco(292, 126, 9, hex('#c8b888')); for (let y = 118; y < 135; y++) for (let x = 284; x < 301; x++) if ((x - 292) ** 2 + (y - 126) ** 2 < 70 && Math.sin(x * 0.5) + Math.sin(y * 0.6) > 0.6) pset(x, y, hex('#8a9a5a'));
  disco(289, 123, 2, hex('#e8dcb0'));
  // el suelo de tablas anchas y la alfombra persa
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const p = Math.floor((x - 160) * 7 / (y - 30)), pp = Math.floor((x - 1 - 160) * 7 / (y - 30)); let c = h(p, 1, 615) < 0.5 ? B.suelo : B.sueloL; if (p !== pp) c = B.sueloS; else if (h(x >> 1, y, 616) < 0.06) c = B.sueloS; pset(x, y, c); }
  for (let y = 136; y < 180; y++) for (let x = 40; x < 290; x++) { const e = Math.max(Math.abs(x - 165) / 125, Math.abs(y - 160) / 24); if (e > 1) continue;
    let c = e > 0.9 ? hex('#c8a060') : e > 0.82 ? hex('#2a3a6a') : e > 0.76 ? hex('#c8a060') : ((Math.abs(x - 165) + Math.abs(y - 160) * 3) % 12 < 2 ? hex('#2a3a6a') : hex('#7a2a24')); if (h(x, y, 617) < 0.05) c = r_mez(c, C.k, 0.25); pset(x, y, c); }
  for (let x = 42; x < 290; x += 3) { pset(x, 135, hex('#e8d8b0')); pset(x, 180, hex('#e8d8b0')); }
}

// lo fijo de la ventana de cerca: friso, cortinas, el gran marco y el alféizar con libros, tintero y vela
function r_biblioVentanaFijo(R) {
  const B = r_B, { rect, pset, disco, linea } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 618) < 0.2 ? B.yesoL : B.yeso);
  r_madera(R, 0, 160, 319, 179, B.roble, B.robleS, B.robleL, B.robleD, 5, 6);
  rect(48, 14, 270, 158, B.robleD); rect(52, 18, 266, 154, B.robleS); rect(52, 18, 266, 19, B.robleL);
  for (const [x0, x1] of [[22, 52], [264, 276]]) for (let y = 4; y < 160; y++) { const ap = y > 80 && y < 96 ? 4 : 0; for (let x = x0 + (x0 < 150 ? 0 : ap); x <= x1 - (x0 < 150 ? ap : 0); x++) { const f = (x - x0) % 6; pset(x, y, f === 0 ? B.cortinaS : f < 3 ? B.cortinaL : B.cortina); } }
  rect(16, 2, 280, 4, B.latonS); rect(16, 2, 280, 2, B.laton);
  // el alféizar: libros apilados, el tintero con la pluma, una vela en su palmatoria
  rect(38, 150, 282, 158, B.robleL); rect(38, 150, 282, 150, hex('#8a6a48')); rect(38, 158, 282, 160, B.robleD);
}

// lo que hay en el alféizar de la ventana de cerca (se pinta después de la plaza): libros apilados, el tintero con la
// pluma y la vela en su palmatoria
function r_biblioAlfeizar(R) {
  const B = r_B, { rect, pset, disco, linea } = R;
  for (let k = 0; k < 4; k++) { const c = r_LOMOS[k * 2 + 1]; rect(196 - k, 146 - k * 4, 226 - k * 2, 149 - k * 4, c); rect(196 - k, 146 - k * 4, 226 - k * 2, 146 - k * 4, r_mez(c, C.blanco, 0.25)); rect(226 - k * 2, 146 - k * 4, 226 - k * 2, 149 - k * 4, hex('#e8dcc0')); }
  rect(238, 142, 248, 149, hex('#1a1a22')); rect(239, 142, 247, 143, hex('#3a3a4a')); linea(244, 141, 256, 118, hex('#f2eee2')); linea(245, 141, 258, 119, hex('#d8d0c0')); linea(250, 130, 256, 120, hex('#c8c0b0'));
  rect(80, 140, 88, 149, B.vela); rect(80, 140, 81, 149, C.blanco); rect(87, 141, 88, 149, hex('#d8ccb0')); disco(84, 150, 6, B.latonS); rect(76, 148, 92, 149, B.laton);
}

// delante del estudio: el escritorio (tablero con cuero verde, cajones con tiradores de latón y patas talladas) con la
// vela en su palmatoria (llama que tiembla y gotas de cera), el tintero con la pluma, la pila de papeles y un libro abierto
function r_bibliotecaD(R, t, o) {
  if ((o.camara ?? 'general') !== 'general') return;
  const B = r_B, { rect, pset, disco, linea } = R;
  // el tablero va en y 134 (6 px por debajo del primer borrador) para que de Hume, en suelo 136, asomen cabeza y hombros
  const d = 6;
  rect(90, 128 + d, 238, 136 + d, B.robleL); rect(94, 129 + d, 234, 134 + d, B.cuero); rect(94, 129 + d, 234, 129 + d, B.cueroL); rect(90, 128 + d, 238, 128 + d, hex('#8a6a48')); rect(90, 136 + d, 238, 137 + d, B.robleD);
  // el cuero del tablero con su ribete dorado y el desgaste donde apoya la mano
  for (let x = 96; x < 233; x += 2) pset(x, 131 + d, hex('#b8903a')); for (let x = 140; x < 176; x++) if ((x & 3) === 1) pset(x, 132 + d, B.cueroL);
  r_madera(R, 94, 138 + d, 234, 172, B.roble, B.robleS, B.robleL, B.robleD, 6, 6);
  for (const [dx, dw] of [[98, 40], [144, 42], [192, 38]]) { rect(dx, 140 + d, dx + dw, 156 + d - 2, B.robleD); rect(dx + 1, 141 + d, dx + dw - 1, 155 + d - 2, B.roble); rect(dx + 1, 141 + d, dx + dw - 1, 141 + d, B.robleL); disco(dx + dw / 2, 148 + d - 1, 1.6, B.laton); pset(dx + dw / 2 - 1, 147 + d - 1, B.latonL); }
  for (const lx of [92, 228]) { rect(lx, 136 + d, lx + 8, 180, B.robleS); rect(lx + 1, 136 + d, lx + 2, 180, B.robleL); disco(lx + 4, 176, 4, B.robleD); }
  // el libro abierto, los papeles, el tintero y la pluma
  R.poligono([[118, 126 + d], [132, 125 + d], [146, 126 + d], [146, 130 + d], [118, 130 + d]], hex('#f0e8d0')); linea(132, 125 + d, 132, 130 + d, hex('#c8b890')); for (let y = 127 + d; y < 130 + d; y++) { linea(120, y, 130, y, hex('#a89870')); linea(134, y, 144, y, hex('#a89870')); }
  for (let k = 0; k < 4; k++) rect(176 + k, 126 + d - k, 198 + k, 127 + d - k, k % 2 ? hex('#e8dcc0') : hex('#f4ecd8'));
  rect(104, 123 + d, 112, 129 + d, hex('#1a1a22')); rect(105, 123 + d, 111, 124 + d, hex('#3a3a4a')); linea(110, 122 + d, 102, 104 + d, hex('#f2eee2')); linea(111, 122 + d, 103, 105 + d, hex('#d8d0c0')); linea(104, 108 + d, 100, 104 + d, hex('#c8c0b0'));
  // la vela en su palmatoria, con la cera que gotea
  disco(210, 129 + d, 5, B.latonS); rect(204, 127 + d, 216, 128 + d, B.laton); rect(207, 116 + d, 213, 127 + d, B.vela); rect(207, 116 + d, 208, 127 + d, C.blanco); rect(212, 118 + d, 213, 127 + d, hex('#d8ccb0'));
  const g = (t * 0.3) % 1; pset(208, 117 + d + Math.round(g * 9), hex('#fff8e8'));
  r_llama(R, 210, 115 + d, t, 2, 2);
}
const r_BQ = {
  hoja: hex('#4a8a3a'), hojaL: hex('#7ab84a'), hojaS: hex('#2e6a2e'), hojaD: hex('#1e4a24'), lejos1: hex('#8ab8b0'), lejos2: hex('#6a9a84'), lejos3: hex('#4e7e5e'),
  tronco: hex('#6a5a4a'), troncoL: hex('#8a7a66'), troncoS: hex('#4a3e32'), troncoD: hex('#2e261e'), musgo: hex('#6a9a3a'), liquen: hex('#a8b890'),
  suelo: hex('#5a7a32'), sueloS: hex('#3e5a24'), sueloL: hex('#7a9a42'), hojarasca: hex('#a8743a'), hojarascaS: hex('#7a5228'), camino: hex('#c8b088'), caminoS: hex('#a89068'),
  agua: hex('#8ac0d8'), aguaS: hex('#5a90b0'), sol: hex('#f8f0b0'),
};

// una hoja de roble (5 × 6) en (x, y) con su color y sombra
function r_hojaRoble(R, x, y, c, cS, dir = 1) { const f = ['.#.#.', '#####', '.###.', '#####', '.###.', '..#..']; f.forEach((fila, j) => { for (let i = 0; i < 5; i++) if (fila[i] === '#') R.pset(x + (dir > 0 ? i : 4 - i), y + j, i === 2 || j === 5 ? cS : c); }); }

// el sinsonte en su rama (x en el centro, y la rama), con el pico que se abre al cantar y lo que sale de él: notas y, en
// un globo, el icono de lo que imita (o.canto 'alarma' | 'rana' | 'atom' | 'notas'); s: escala
function r_sinsonte(R, t, x, y, s, canto) {
  const canta = canto && Math.sin(t * 11) > -0.2, mira = canto ? 1 : (Math.sin(t * 0.7) > 0.6 ? -1 : 1);
  PIEZAS_JH.sinsonte(R, x, y, { s, dir: mira, t: !canto && Math.sin(t * 0.9) > 0.97 ? t : undefined });
  const x0 = Math.round(x - 13 * s / 2), y0 = Math.round(y - 8 * s);
  if (canta) { const bx = mira > 0 ? x0 + 11 * s : x0 + s; R.rect(bx, y0 + 4 * s, bx + s * 2 - 1, y0 + 5 * s - 1, hex('#3a3646')); R.rect(bx, y0 + 3 * s + Math.floor(s / 2), bx + s - 1, y0 + 4 * s - 1, hex('#e86a7a')); }
  if (!canto) return;
  const bx = x0 + 13 * s, by = y0 + 3 * s;
  for (let k = 0; k < 4; k++) { const f = (t * 0.6 + k / 4) % 1, nx = Math.round(bx + 2 + f * 26 * s + Math.sin(t * 3 + k * 2) * 2 * s), ny = Math.round(by - 2 - f * 20 * s); if (f > 0.9) continue;
    r_pictoR(R, 'nota', nx + 1, ny + 1, hex('#1c1222'), s); r_pictoR(R, 'nota', nx, ny, k % 2 ? hex('#f8f0d0') : hex('#e8c040'), s); }
  if (canto === 'notas') return;
  const gx = bx + 16 * s, gy = by - 20 * s, p = 1 + (Math.sin(t * 6) > 0.6 ? 1 : 0), w = 9 * s + p, hh = 7 * s + p;
  R.disco(gx, gy, Math.max(w, hh) * 0.82 + 1, hex('#1c1222')); R.disco(gx, gy, Math.max(w, hh) * 0.82, C.blanco); R.linea(gx - 4 * s, gy + 5 * s, bx + 2, by - 2, hex('#1c1222')); R.linea(gx - 3 * s, gy + 5 * s, bx + 3, by - 2, C.blanco);
  if (canto === 'alarma') { r_picto(R, 'coche', gx - 3 * s, gy - 2 * s, hex('#d83a3a'), s); if (Math.floor(t * 4) % 2) { R.pset(gx - 5 * s, gy - 3 * s, hex('#f0a020')); R.pset(gx + 4 * s, gy - 3 * s, hex('#f0a020')); R.pset(gx - 6 * s, gy - 4 * s, hex('#f0a020')); R.pset(gx + 5 * s, gy - 4 * s, hex('#f0a020')); } }
  else if (canto === 'rana') r_picto(R, 'rana', gx - 2 * s - 1, gy - 2 * s, hex('#3a9a3a'), s);
  else if (canto === 'atom') { R.disco(gx, gy, 1.5 * s, hex('#4ab8f0')); for (let a = 0; a < 3; a++) for (let i = 0; i < 16; i++) { const an = i / 16 * Math.PI * 2, ex = Math.cos(an) * 4 * s, ey = Math.sin(an) * 1.6 * s, ca = Math.cos(a * 1.05 + t), sa = Math.sin(a * 1.05 + t); R.pset(Math.round(gx + ex * ca - ey * sa), Math.round(gy + ex * sa + ey * ca), hex('#2a6ae8')); } }
}

const r_ramaY = (x) => 84 - (x - 30) * 0.075;

function r_bosque(R, t, o) {
  const B = r_BQ, cam = o.camara ?? 'general', canto = o.canto;
  if (cam === 'rama') {
    r_fijo(R, 'bosque-r', () => r_bosqueRamaFijo(R));
    // rayos de luz que tiemblan, motas y una hoja que cae
    // (los rayos no entran en la esquina de Atom: x ≥ 272, y < 50)
    for (let k = 0; k < 3; k++) { const a = 0.18 + 0.08 * Math.sin(t * 0.6 + k * 2); for (let y = 0; y < 150; y += 1) { const x0 = Math.round(200 + k * 40 - y * 0.6); for (let x = x0; x < x0 + 10; x++) if (((x + y) & 1) && x >= 0 && x < 320 && !(x >= 272 && y < 50)) R.pset(x, y, r_mez(R.pget(x, y), B.sol, a)); } }
    motas(R, t, 20, 268, 10, 150, 15, hex('#f8f0c0')); motas(R, t, 268, 300, 54, 150, 3, hex('#f8f0c0'));
    for (let k = 0; k < 2; k++) { const f = (t * 0.08 + k * 0.5) % 1, lx = Math.round(60 + k * 140 + Math.sin(t * 1.6 + k) * 14), ly = Math.round(-10 + f * 190); r_hojaRoble(R, lx, ly, k ? B.hojarasca : B.hojaL, k ? B.hojarascaS : B.hoja, Math.sin(t * 2 + k) > 0 ? 1 : -1); }
    // la mariquita que sube por la rama
    { const u = (t * 0.04) % 1, mx = Math.round(20 + u * 100), my = Math.round(100 - mx * 14 / 262) - 7; R.disco(mx, my, 2, hex('#d82a2a')); R.pset(mx - 1, my - 1, C.k); R.pset(mx + 1, my, C.k); R.pset(mx + 2, my - 1, C.k); R.pset(mx, my - 1, hex('#f86a6a')); }
    r_bosqueHojas(R, t, [[40, 92], [74, 88], [196, 82], [230, 54], [214, 64], [250, 76], [8, 96]], 2);
    r_sinsonte(R, t, 150, 92, 2, canto);
    return { suelo: 172, rama: [[0, 100], [262, 86]], pajaro: [150, 92], pico: [163, 82], libre: [[40, 300, 160, 180]] };
  }
  r_fijo(R, 'bosque-g', () => r_bosqueFijo(R));
  r_nubes(R, t, [[14, 18, 2, 30], [24, 26, 3.2, 180], [8, 12, 4.5, 300]], [C.blanco, hex('#e6f0f8'), hex('#bcd0e2')]);
  bandada(R, t, { tipo: 'golondrina', n: 3, y: 30, cada: 12, v: 36 });
  // el coche del fondo, que pita con las luces cuando el pájaro imita la alarma
  if (canto === 'alarma' && Math.floor(t * 4) % 2) { for (const lx of [161, 186]) { R.disco(lx, 110, 2, hex('#f8c040')); R.pset(lx, 110, C.blanco); } r_halo(R, 174, 110, 22, 8, hex('#f8c040'), 0.3); }
  // rayos de luz entre los árboles
  for (let k = 0; k < 4; k++) { const a = 0.12 + 0.06 * Math.sin(t * 0.5 + k * 1.7); for (let y = 30; y < 160; y += 1) { const x0 = Math.round(150 + k * 44 - (y - 30) * 0.5); for (let x = x0; x < x0 + 8; x++) if (((x + y) & 1) && x >= 0 && x < 320) R.pset(x, y, r_mez(R.pget(x, y), B.sol, a)); } }
  // el charco con el cielo que tiembla y la rana que infla el saco
  for (let k = 0; k < 6; k++) { const wx = 104 + Math.floor(h(k, 1, 620) * 42), wy = 142 + Math.floor(h(k, 2, 620) * 7); if (Math.sin(t * 2 + k) > 0.5) R.pset(wx, wy, C.blanco); }
  { const fx = 144, fy = 141, croa = canto === 'rana' ? Math.sin(t * 6) > 0 : Math.sin(t * 1.3) > 0.85; R.rect(fx - 3, fy - 2, fx + 3, fy, hex('#3a8a3a')); R.rect(fx - 2, fy - 3, fx + 2, fy - 3, hex('#5aaa4a')); R.pset(fx - 2, fy - 4, hex('#5aaa4a')); R.pset(fx + 2, fy - 4, hex('#5aaa4a')); R.pset(fx - 2, fy - 5, C.k); R.pset(fx + 2, fy - 5, C.k);
    if (croa) R.disco(fx, fy - 1, 2, hex('#e8e0a0')); R.pset(fx - 4, fy, hex('#2e6a2e')); R.pset(fx + 4, fy, hex('#2e6a2e')); }
  // la ardilla que sube y baja por el tronco del medio
  { const u = (Math.sin(t * 0.4) + 1) / 2, ax = 199, ay = Math.round(130 - u * 50); R.rect(ax, ay - 3, ax + 2, ay, hex('#8a5a3a')); R.pset(ax + 1, ay - 4, hex('#8a5a3a')); R.pset(ax + 2, ay - 4, C.k); R.rect(ax - 2, ay - 1, ax - 1, ay + 4, hex('#a87a4a')); R.pset(ax - 3, ay + 3, hex('#a87a4a')); }
  // una mariposa y hojas que caen
  { const mx = Math.round(240 + Math.sin(t * 0.7) * 40), my = Math.round(130 + Math.sin(t * 1.9) * 12), a = Math.sin(t * 18) > 0; R.pset(mx, my, C.k); R.pset(mx - 1, my - (a ? 1 : 0), hex('#f0a020')); R.pset(mx + 1, my - (a ? 1 : 0), hex('#f0a020')); if (a) { R.pset(mx - 2, my - 1, hex('#f0a020')); R.pset(mx + 2, my - 1, hex('#f0a020')); } }
  for (let k = 0; k < 4; k++) { const f = (t * 0.07 + k * 0.25) % 1, lx = Math.round(50 + k * 70 + Math.sin(t * 1.4 + k) * 10), ly = Math.round(20 + f * 150); R.pset(lx, ly, k % 2 ? B.hojarasca : B.hojaL); R.pset(lx + (Math.sin(t * 3 + k) > 0 ? 1 : -1), ly, k % 2 ? B.hojarascaS : B.hoja); }
  // la hierba que se mece delante
  for (let k = 0; k < 50; k++) { const gx = Math.floor(h(k, 1, 621) * 320), gy = 150 + Math.floor(h(k, 2, 621) * 30), m = Math.round(Math.sin(t * 2 + gx * 0.1)); R.linea(gx, gy, gx + m, gy - 3, B.sueloS); R.pset(gx + m, gy - 3, B.sueloL); }
  r_bosqueHojas(R, t, [[56, 70], [92, 66], [128, 66], [176, 66], [40, 78]], 1);
  r_sinsonte(R, t, 150, Math.round(r_ramaY(150)), 1, canto);
  return { suelo: 166, rama: [[30, 84], [178, 73]], pajaro: [150, Math.round(r_ramaY(150))], coche: [160, 104, 188, 116], charco: [100, 138, 152, 152], libre: [[170, 300, 150, 180]] };
}
// racimos de hojas de roble que se mecen en los sitios dados (s: tamaño)
function r_bosqueHojas(R, t, sitios, s) {
  const B = r_BQ;
  sitios.forEach(([x, y], k) => { const m = Math.round(Math.sin(t * 1.6 + k * 1.3) * s);
    for (let i = 0; i < (s > 1 ? 7 : 7); i++) { const a = h(k, i, 622) * 6.28, d = 2 + h(i, k, 622) * (s > 1 ? 9 : 5) * s / (s > 1 ? 2 : 1), hx = Math.round(x + m + Math.cos(a) * d * (s > 1 ? 1.6 : 1)), hy = Math.round(y + Math.sin(a) * d * 0.7 - (s > 1 ? 6 : 3 * s));
      if (s > 1) { const lx = hx - 5, ly = hy - 2, c = i % 3 ? B.hoja : B.hojaL, cS = i % 3 ? B.hojaD : B.hojaS; R.linea(x + m, y - 2, hx, hy, B.troncoS);
        ['..#.#..', '.#####.', '#######', '.#####.', '#######', '.#####.', '..###..', '...#...'].forEach((f, j) => { for (let q = 0; q < 7; q++) if (f[q] === '#') R.rect(lx + q * 1.5 | 0, ly + j * 1.5 | 0, (lx + q * 1.5 | 0) + 1, (ly + j * 1.5 | 0) + 1, q === 3 ? cS : (q < 2 && j < 4 ? r_mez(c, C.blanco, 0.2) : c)); }); } else { R.pset(hx, hy, i % 3 ? B.hoja : B.hojaL); R.pset(hx + 1, hy, B.hojaS); R.pset(hx, hy + 1, B.hojaS); } } });
}

// lo fijo del bosque: cielo, tres términos de árboles, el camino con el coche aparcado, el suelo con hojarasca, el tronco
// caído con setas, helechos, el charco y el roble enorme de delante con su rama larga
function r_bosqueFijo(R) {
  const B = r_BQ, { rect, pset, disco, linea, poligono } = R;
  r_degradado(R, 0, 0, 319, 80, [hex('#6aa8e0'), hex('#8ec0ea'), hex('#b8d8f0'), hex('#d8ecf4')]);
  // dos filas de bosque lejano, con calima
  for (let x = 0; x < 320; x++) { const t1 = Math.round(50 + 5 * Math.sin(x * 0.11) + 3 * Math.sin(x * 0.37) + (x > 270 ? 4 : 0)), t2 = Math.round(66 + 6 * Math.sin(x * 0.07 + 1) + 3 * Math.sin(x * 0.29));
    for (let y = t1; y < 112; y++) pset(x, y, y < t2 ? (h(x >> 1, y >> 1, 623) < 0.3 ? B.lejos2 : B.lejos1) : (h(x >> 1, y >> 1, 624) < 0.3 ? B.lejos3 : B.lejos2));
    if (x % 9 === 0) { const pt = t1 - 4 - Math.floor(h(x, 1, 619) * 5); for (let j = 0; j < t1 - pt + 2; j++) { const w = Math.floor(j / 3); for (let i = -w; i <= w; i++) pset(x + i, pt + j, B.lejos2); } }
    if (x % 13 === 5) for (let y = t2 + 2; y < 112; y++) if (y % 3) pset(x, y, B.lejos3); }
  // los troncos del medio con sus copas
  for (const [tx, tw, top, cy, r] of [[118, 5, 30, 34, 20], [196, 7, 20, 36, 24], [252, 5, 46, 52, 18], [76, 4, 44, 48, 16]]) {
    rect(tx, top, tx + tw, 132, B.troncoS); rect(tx + 1, top, tx + 2, 132, B.tronco); for (let y = top; y < 132; y += 4) pset(tx + 1 + (y % 3), y, B.troncoD);
    const BL = [[0, 0, r * 0.8]]; for (let i = 0; i < 7; i++) { const a = h(i, tx, 638) * 6.28, d = r * (0.4 + h(tx, i, 638) * 0.5); BL.push([Math.cos(a) * d, Math.sin(a) * d * 0.7, r * (0.35 + h(i, i + tx, 639) * 0.3)]); }
    for (const [dx, dy, rr] of BL) disco(tx + dx, cy + dy + 2, rr, B.hojaD); for (const [dx, dy, rr] of BL) disco(tx + dx - 1, cy + dy, rr * 0.86, B.hojaS); for (const [dx, dy, rr] of BL) disco(tx + dx - 2.5, cy + dy - 2.5, rr * 0.45, B.hoja);
    linea(tx + 1, cy + r * 0.6, tx - r * 0.5, cy, B.troncoS); linea(tx + 2, cy + r * 0.6, tx + r * 0.5, cy - 2, B.troncoS);
    for (let k = 0; k < 40; k++) { const a = h(k, tx, 625) * 6.28, d = h(tx, k, 625) * r; pset(Math.round(tx + Math.cos(a) * d - 2), Math.round(cy + Math.sin(a) * d * 0.8 - 2), k % 3 ? B.hojaL : B.hoja); } }
  // el camino de tierra del fondo y el coche aparcado
  for (let y = 112; y < 120; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 112 ? B.caminoS : h(x, y, 626) < 0.15 ? B.caminoS : B.camino);
  { const cx = 160; rect(cx, 108, cx + 28, 116, hex('#a82a2a')); rect(cx + 6, 103, cx + 22, 108, hex('#a82a2a')); rect(cx + 8, 104, cx + 13, 107, hex('#8ac0e0')); rect(cx + 15, 104, cx + 20, 107, hex('#8ac0e0')); rect(cx, 108, cx + 28, 108, hex('#d84a4a')); rect(cx, 113, cx + 28, 113, hex('#7a1e1e'));
    for (const wx of [cx + 6, cx + 22]) { disco(wx, 116, 3, C.k); disco(wx, 116, 1.4, hex('#8a8a8a')); } rect(cx + 27, 110, cx + 28, 111, hex('#f8e0a0')); rect(cx, 110, cx + 1, 111, hex('#e86a3a')); }
  // el suelo del bosque: hierba, hojarasca, manchas de sol
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 627); let c = n < 0.25 ? B.sueloS : n < 0.75 ? B.suelo : B.sueloL;
    if (h(x, y, 628) < 0.1) c = h(x, y, 629) < 0.5 ? B.hojarasca : B.hojarascaS; if (y < 124 && ((x + y) & 1)) c = r_mez(c, B.lejos3, 0.4);
    if (Math.sin(x * 0.09 + y * 0.21) + Math.sin(x * 0.05 - y * 0.13) > 1.5 && ((x + y) & 1)) c = r_mez(c, B.sol, 0.3); pset(x, y, c); }
  // el charco con el cielo reflejado
  for (let y = 138; y < 153; y++) for (let x = 98; x < 154; x++) { const e = ((x - 126) / 28) ** 2 + ((y - 145) / 7) ** 2; if (e < 1) pset(x, y, e > 0.8 ? B.sueloS : y < 143 ? B.agua : B.aguaS); }
  // el tronco caído con musgo y setas
  rect(20, 148, 96, 158, B.troncoS); rect(20, 148, 96, 149, B.troncoL); for (let x = 22; x < 96; x += 5) linea(x, 150, x + 3, 157, B.troncoD); disco(96, 153, 5, B.troncoS); disco(96, 153, 3.5, B.troncoL); R.anillo(96, 153, 2, B.troncoS);
  for (let x = 24; x < 90; x += 2) if (h(x, 1, 630) < 0.6) pset(x, 147, B.musgo);
  for (const [sx, sh] of [[38, 4], [46, 3], [84, 5]]) { rect(sx, 147 - sh, sx, 147, hex('#f0e8d0')); rect(sx - 2, 146 - sh, sx + 2, 147 - sh, hex('#d83a2a')); pset(sx - 1, 146 - sh, C.blanco); pset(sx + 1, 147 - sh, C.blanco); }
  // helechos
  for (const [fx, fy] of [[6, 166], [104, 170], [296, 160], [270, 174], [236, 152]]) for (let k = -3; k <= 3; k++) { const ex = fx + k * 4, ey = fy - 10 + Math.abs(k) * 2; linea(fx, fy, ex, ey, B.hojaS); for (let j = 1; j < 4; j++) { const px = Math.round(fx + (ex - fx) * j / 4), py = Math.round(fy + (ey - fy) * j / 4); pset(px - 1, py, B.hoja); pset(px + 1, py, B.hojaL); } }
  // el roble enorme de delante, con raíces y corteza, y su rama larga hacia la derecha
  for (let y = 0; y < 180; y++) { const w = 30 + (y > 150 ? Math.round((y - 150) * 0.6) : 0); for (let x = 0; x < w; x++) { const g = (x * 3 + Math.round(Math.sin(y * 0.09 + x * 0.8) * 2.5) + Math.floor(h(x >> 2, y >> 3, 637) * 3) + 70) % 7, c = g === 0 ? B.troncoD : g < 3 ? B.troncoS : g === 5 ? B.troncoL : B.tronco; pset(x, y, x > w - 3 ? B.troncoD : x < 2 ? B.troncoS : c); } }
  for (let k = 0; k < 6; k++) { const ry = 20 + k * 26, rx = 4 + (k * 7) % 20; R.anillo(rx, ry, 2, B.troncoD); pset(rx, ry, B.troncoS); }
  for (let k = 0; k < 30; k++) { const lx = Math.floor(h(k, 1, 631) * 26), ly = Math.floor(h(k, 2, 631) * 170); pset(lx, ly, B.liquen); pset(lx + 1, ly, B.musgo); }
  for (let x = 30; x <= 178; x++) { const yc = r_ramaY(x), w = 4.5 - (x - 30) / 148 * 3; for (let y = Math.round(yc - w); y <= Math.round(yc + w); y++) pset(x, y, y < yc - w + 1.5 ? B.troncoL : y > yc + w - 1.5 ? B.troncoD : (Math.sin(x * 0.6 + y) > 0.6 ? B.troncoS : B.tronco)); }
  for (let x = 40; x < 170; x += 9) pset(x, Math.round(r_ramaY(x) - 3), B.musgo);
  linea(90, Math.round(r_ramaY(90)), 98, 60, B.troncoS); linea(130, Math.round(r_ramaY(130)), 138, 60, B.troncoS); linea(170, Math.round(r_ramaY(170)), 182, 62, B.troncoS);
  // la copa del roble arriba a la izquierda (oscura y tranquila bajo la barra del año)
  for (const [cx, cy, r] of [[10, 16, 26], [44, 8, 22], [80, 2, 18], [20, 46, 18]]) { disco(cx, cy + 2, r, B.hojaD); disco(cx - 1, cy, r * 0.9, B.hojaS); }
  for (let k = 0; k < 80; k++) { const x = Math.floor(h(k, 3, 632) * 96), y = Math.floor(h(k, 4, 632) * 60); if (R.pget(x, y) === B.hojaS) pset(x, y, k % 3 ? B.hoja : B.hojaL); }
}

// lo fijo de la rama de cerca: el bosque desenfocado (manchas tramadas, troncos borrosos), el suelo y la rama gruesa con
// corteza, musgo y líquenes, una horquilla y un racimo de bayas rojas
function r_bosqueRamaFijo(R) {
  const B = r_BQ, { rect, pset, disco, linea } = R;
  r_degradado(R, 0, 0, 319, 150, [hex('#b8d888'), hex('#7aa860'), hex('#4a7a46'), hex('#3a6a3a')]);
  // las manchas desenfocadas del follaje; en la esquina de Atom (x 270–319, y 0–52) se apagan casi del todo
  const calma = (x, y) => (x >= 270 && y < 52 ? 0.12 : x >= 258 && y < 62 ? 0.5 : 1);
  for (let k = 0; k < 26; k++) { const cx = h(k, 1, 633) * 320, cy = h(k, 2, 633) * 150, r = 6 + h(k, 3, 633) * 16, c = k % 3 === 0 ? hex('#d8f0a0') : k % 3 === 1 ? hex('#2e5a30') : hex('#9ac870');
    for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && (d < 0.7 || r_um(x, y) > d)) pset(x, y, r_mez(R.pget(x, y), c, 0.45 * calma(x, y))); } }
  // los troncos desenfocados; el de la derecha nace por debajo de la esquina de Atom y sube fundiéndose con la luz
  for (const [tx, tw] of [[40, 14], [212, 18], [292, 10]]) for (let y = 0; y < 160; y++) { const a = tx === 292 ? 0.55 * Math.max(0, Math.min(1, (y - 50) / 34)) : 0.55; if (a <= 0) continue;
    for (let x = tx - 3; x < tx + tw + 3; x++) { const e = x < tx || x >= tx + tw; if (!e || r_um(x, y) > 0.5) pset(x, y, r_mez(R.pget(x, y), hex('#3a3a2a'), a)); } }
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y >> 1, 634); pset(x, y, n < 0.3 ? B.sueloS : n < 0.7 ? B.suelo : (h(x, y, 635) < 0.3 ? B.hojarasca : B.sueloL)); }
  for (let x = 0; x < 320; x++) if (((x + 150) & 1)) pset(x, 150, r_mez(R.pget(x, 150), B.lejos3, 0.5));
  // la rama gruesa
  const ry = (x) => 100 - x * 14 / 262;
  for (let x = 0; x <= 266; x++) { const yc = ry(x), w = 7 - x / 266 * 4; for (let y = Math.round(yc - w); y <= Math.round(yc + w); y++) { const v = Math.sin(x * 0.35 + (y - yc) * 1.3), c = y < yc - w + 2 ? B.troncoL : y > yc + w - 2 ? B.troncoD : v > 0.6 ? B.troncoL : v < -0.5 ? B.troncoS : B.tronco; pset(x, y, c); } }
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 5, 636) * 250), y = Math.round(ry(x) - 5 + h(k, 6, 636) * 4); pset(x, y, k % 3 ? B.musgo : B.liquen); pset(x + 1, y, B.musgo); }
  for (let x = 196; x <= 236; x++) { const yc = ry(196) - (x - 196) * 0.9, w = 2.5 - (x - 196) / 40; for (let y = Math.round(yc - w); y <= Math.round(yc + w); y++) pset(x, y, y < yc ? B.troncoL : B.troncoS); }
  linea(60, Math.round(ry(60)) - 4, 54, 74, B.troncoS); linea(61, Math.round(ry(60)) - 4, 55, 74, B.tronco);
  // el racimo de bayas que cuelga
  for (const [bx, by] of [[104, 110], [108, 112], [100, 113], [106, 116], [111, 108], [102, 118]]) { disco(bx, by, 2.2, hex('#8a1e2a')); disco(bx, by, 1.6, hex('#d83a3a')); pset(bx - 1, by - 1, hex('#ffb0b0')); }
  linea(106, Math.round(ry(106)) + 4, 104, 108, B.troncoS);
}
// delante del bosque: nada en la rama de cerca; en el general, unas matas de helecho en primer plano a la derecha
function r_bosqueD(R, t, o) {
  if ((o.camara ?? 'general') !== 'general') return;
  const B = r_BQ, m = Math.round(Math.sin(t * 1.4));
  for (const [fx, fy] of [[310, 180], [292, 180]]) for (let k = -4; k <= 2; k++) { const ex = fx + k * 5 + m, ey = fy - 18 + Math.abs(k) * 3; R.linea(fx, fy, ex, ey, B.hojaS); for (let j = 1; j < 5; j++) { const px = Math.round(fx + (ex - fx) * j / 5), py = Math.round(fy + (ey - fy) * j / 5); R.pset(px - 1, py, B.hoja); R.pset(px + 1, py, B.hojaL); R.pset(px - 2, py + 1, B.hojaS); } }
}

const r_P = {
  losa: hex('#c8beb0'), losaS: hex('#a89e90'), losaL: hex('#e0d8cc'), junta: hex('#8a8276'), valla: hex('#9aa4b0'), vallaS: hex('#5a6470'),
  agente: hex('#2a2e3a'), casco: hex('#3a4050'), visera: hex('#a8b8c8'), escudo: hex('#9aaaba'), sil: hex('#2a1e34'), silL: hex('#e88a4a'),
};

const r_FACHADAS = [['#e8b0b0', '#c88a8a'], ['#a8d8c0', '#80b098'], ['#f0d890', '#c8b068'], ['#a8c0e0', '#8098b8'], ['#e8c8a0', '#c0a078'], ['#d0b0d8', '#a888b0']].map(([a, b]) => [hex(a), hex(b)]);

// una mano de tres dedos levantada (el saludo), en silueta con el filo de luz del sol: (x, y) la muñeca, s escala
function r_manoTres(R, x, y, s, col, filo) {
  const X = Math.round(x), Y = Math.round(y);
  R.rect(X - 2 * s, Y - 4 * s, X + 2 * s, Y, col);
  for (let k = 0; k < 3; k++) { const fx = X - 2 * s + k * 2 * s, alto = (k === 1 ? 5 : 4) * s; R.rect(fx, Y - 4 * s - alto, fx + s - 1, Y - 4 * s, col); if (filo) R.rect(fx + s - 1, Y - 4 * s - alto + 1, fx + s - 1, Y - 4 * s - 1, filo); }
  R.rect(X - 3 * s, Y - 3 * s, X - 2 * s, Y - s, col);
  if (filo) R.rect(X + 2 * s, Y - 4 * s, X + 2 * s, Y, filo);
}

// un agente con casco y escudo, pequeño y quieto (pies en (x, y)); respira de vez en cuando
function r_agente(R, x, y, t, k) {
  const P = r_P, r = Math.sin(t * 1.7 + k * 1.3) > 0.85 ? 1 : 0, X = Math.round(x), Y = Math.round(y);
  R.rect(X - 1, Y - 2, X + 1, Y, P.agente); R.rect(X - 2, Y - 7 + r, X + 2, Y - 3, P.agente); R.rect(X - 2, Y - 10 + r, X + 2, Y - 8 + r, P.casco); R.rect(X - 1, Y - 9 + r, X + 2, Y - 9 + r, P.visera);
  R.rect(X + 2, Y - 8, X + 5, Y - 1, P.escudo); R.rect(X + 2, Y - 8, X + 2, Y - 1, hex('#c8d4e0')); R.pset(X + 4, Y - 5, hex('#7a8a9a'));
}

function r_protesta(R, t, o) {
  const P = r_P, cam = o.camara ?? 'general', manos = Math.max(0, Math.min(1, o.manos ?? 0.5));
  const sube = (k) => { const th = 0.04 + h(k, 9, 640) * 0.92; return Math.max(0, Math.min(1, (manos - th) * 6)); };
  if (cam === 'manos') {
    r_fijo(R, 'protesta-m', () => r_protestaManosFijo(R));
    r_nubes(R, t, [[22, 30, 2, 0], [44, 22, 3.4, 170], [62, 16, 5, 90], [34, 12, 1.3, 260]], [hex('#fff0d8'), hex('#f0c8a8'), hex('#c8909a')]);
    for (let k = 0; k < 4; k++) r_gaviota(R, ((t * (10 + k * 3) + k * 90) % 380) - 30, 70 + k * 8 + Math.sin(t + k) * 3, t, k, hex('#3a2a40'));
    // las pancartas que se mecen
    for (let k = 0; k < 5; k++) { const px = 30 + k * 58 + (k % 2) * 10, py = Math.round(104 + (k % 3) * 8 + Math.sin(t * 1.4 + k * 1.9) * 3), d = Math.round(Math.sin(t * 1.4 + k * 1.9) * 2), col = r_FACHADAS[k % 6][0], pi = ['corazon', 'paloma', 'tres', 'circulo', 'corazon'][k];
      R.linea(px, py + 14, px - d, 180, hex('#5a4030')); R.rect(px - 14 + d, py - 10, px + 14 + d, py + 12, hex('#3a2a30')); R.rect(px - 13 + d, py - 9, px + 13 + d, py + 11, col); R.rect(px - 13 + d, py - 9, px + 13 + d, py - 8, C.blanco);
      r_picto(R, pi, px - 5 + d, py - 4, k === 2 ? hex('#3a2a30') : hex('#c83a4a'), 2); }
    // la multitud a contraluz: fila de atrás pequeña y fila de delante con las manos de tres dedos
    for (let k = 0; k < 22; k++) { const x = 6 + k * 14 + (k % 2) * 5, y = 156 + (k % 3), up = sube(k + 40);
      R.disco(x, y - 6, 4, P.sil); R.rect(x - 6, y - 2, x + 6, 180, P.sil); R.pset(x + 3, y - 9, P.silL);
      if (up > 0) { const ay = Math.round(y - 4 - up * 22); R.rect(x + 5, ay + 4, x + 7, y, P.sil); r_manoTres(R, x + 6, ay + 4, 1, P.sil, P.silL); } }
    for (let k = 0; k < 9; k++) { const x = 18 + k * 36 + (k % 2) * 8, y = 176 + (k % 2) * 2, up = sube(k);
      R.disco(x, y - 10, 8, P.sil); R.rect(x - 13, y - 2, x + 13, 180, P.sil); for (let j = -6; j < 0; j++) R.pset(x + 7, y - 10 + j, P.silL);
      if (up > 0) { const ay = Math.round(y - 12 - up * 46 + Math.sin(t * 2 + k) * 1.2); for (let yy = ay + 8; yy < y - 2; yy++) R.rect(x + 9, yy, x + 14, yy, P.sil); R.rect(x + 14, ay + 8, x + 14, y - 4, P.silL); r_manoTres(R, x + 12, ay + 8, 2, P.sil, P.silL); } }
    return { suelo: 178, sol: [200, 128], libre: [[100, 220, 120, 180]] };
  }
  r_fijo(R, 'protesta-g', () => r_protestaFijo(R));
  r_nubes(R, t, [[10, 22, 2.2, 0], [22, 30, 3.4, 140], [16, 14, 5, 250]], [C.blanco, hex('#f0eef0'), hex('#c8c8d8')]);
  bandada(R, t, { tipo: 'golondrina', n: 4, y: 34, cada: 10, v: 30 });
  // las vallas (los agentes los pone la escena delante, con R.actor) con dos balizas naranjas que parpadean por turnos
  for (let x = 96; x <= 224; x++) { R.pset(x, 109, P.valla); R.pset(x, 110, P.vallaS); R.pset(x, 114, P.vallaS); } for (let x = 96; x <= 224; x += 4) R.rect(x, 110, x, 117, P.valla); for (const x of [96, 128, 160, 192, 224]) { R.rect(x - 1, 109, x + 1, 118, P.vallaS); R.rect(x - 3, 118, x + 3, 118, P.vallaS); }
  for (const [bx, k] of [[96, 0], [224, 1]]) { const on = Math.floor(t * 2.5 + k) % 2 === 0; R.rect(bx - 1, 105, bx + 1, 108, hex('#3a3a42')); R.rect(bx - 1, 105, bx + 1, 107, on ? hex('#f8a030') : hex('#8a5a2a')); if (on) { R.pset(bx, 105, C.blanco); r_halo(R, bx, 106, 7, 5, hex('#f8b040'), 0.35); } }
  // las banderolas de colores en sus mástiles
  for (const [mx, c1, c2] of [[64, hex('#4ab870'), C.blanco], [254, hex('#e8a030'), C.blanco]]) { R.rect(mx, 98, mx, 140, hex('#5a5a62')); for (let i = 0; i < 14; i++) { const yy = Math.round(100 + Math.sin(t * 4 - i * 0.6) * 1.6 + i * 0.3); R.rect(mx + 1 + i, yy, mx + 1 + i, yy + 3, i % 4 < 2 ? c1 : c2); } }
  // el público: tres filas de gente con pancartas sin letras, paraguas y los brazos que se levantan con tres dedos
  const filas = [[125, 0, 8], [134, 3, 9], [144, 6, 10]];
  for (const [y, off, paso] of filas) for (let x = off + 2, k = y; x < 320; x += paso, k += 7) { if (y === 144 && x > 112 && x < 206) continue; const n = h(x, y, 641), up = sube(k), bob = Math.sin(t * 2.2 + k) > 0.8 ? 1 : 0;
    r_persona(R, x, y - bob, k, t, { brazo: up > 0 ? up : 0, dir: x < 160 ? 1 : -1 });
    if (n < 0.2 && up === 0) { const px = x, py = y - 15 + Math.round(Math.sin(t * 1.5 + k) * 1), c = r_FACHADAS[k % 6][0], pi = ['corazon', 'paloma', 'tres', 'circulo'][k % 4];
      R.linea(px, py + 6, px, y - 6, hex('#6a5040')); R.rect(px - 6, py - 4, px + 6, py + 4, hex('#3a2a30')); R.rect(px - 5, py - 3, px + 5, py + 3, c); r_picto(R, pi, px - 2, py - 2, pi === 'tres' ? hex('#3a2a30') : hex('#c83a4a'), 1); }
    else if (n > 0.93 && up === 0) { const c = r_FACHADAS[(k + 2) % 6][1]; for (let j = 0; j < 4; j++) R.rect(x - 6 + j, y - 13 - j + (j > 2 ? 1 : 0), x + 6 - j, y - 13 - j + (j > 2 ? 1 : 0), j === 0 ? r_mez(c, C.k, 0.3) : c); R.rect(x, y - 12, x, y - 7, C.k); } }
  // palomas en las losas, que a veces levantan el vuelo
  for (let k = 0; k < 5; k++) { const vuela = Math.sin(t * 0.5 + k) > 0.85, px = Math.round(30 + k * 64 + (vuela ? (t * 30) % 40 : Math.sin(t * 0.7 + k) * 3)), py = vuela ? 150 - Math.round((t * 20) % 30) : 168 + (k % 2) * 4;
    if (vuela) r_gaviota(R, px, py, t, k, hex('#8a8a96')); else { const pic = Math.sin(t * 5 + k * 2) > 0.5 ? 1 : 0; R.rect(px, py - 2, px + 3, py, hex('#8a8a96')); R.pset(px + 4, py - 3 + pic, hex('#8a8a96')); R.pset(px + 5, py - 3 + pic, hex('#3a3a3a')); R.pset(px + 1, py - 1, hex('#6a9a8a')); R.pset(px + 1, py + 1, hex('#e86a3a')); } }
  return { suelo: 170, agentes: [104, 114, 230, 114], monumento: [136, 30, 184, 114], vallas: [96, 108, 224, 118], libre: [[110, 210, 150, 180]] };
}
// lo fijo de la plaza: cielo, torres de cristal, casas-tienda de colores con balcones, aires, plantas, toldos y cables, el
// pilar conmemorativo, dos árboles, las vallas y las losas
function r_protestaFijo(R) {
  const P = r_P, { rect, pset, disco, linea, poligono } = R;
  r_degradado(R, 0, 0, 319, 80, [hex('#5a9ad8'), hex('#7ab2e2'), hex('#a8cce8'), hex('#f0dcc0')]);
  // las torres de cristal del fondo con su retícula y un reflejo en diagonal
  for (const [x0, x1, top] of [[10, 52, 20], [54, 86, 36], [212, 248, 26], [250, 274, 42], [280, 318, 60]]) { rect(x0, top, x1, 100, hex('#4a6a8a')); rect(x0, top, x1, top + 1, hex('#8ab0d0'));
    for (let y = top + 3; y < 100; y += 4) for (let x = x0 + 1; x < x1; x++) pset(x, y, (x - x0) % 6 === 0 ? hex('#3a5a7a') : hex('#5a82a8'));
    for (let y = top + 2; y < 100; y++) for (let x = x0 + 1; x < x1; x++) if ((x + y * 0.6) % 34 < 5) pset(x, y, r_mez(R.pget(x, y), hex('#d8ecf8'), 0.4));
    rect(x1 - 2, top, x1, 100, hex('#3a5470')); }
  // las casas-tienda de colores: tres plantas, balcones, persianas, aparatos de aire, plantas y toldos con rótulos sin letras
  for (let i = 0; i < 12; i++) { const x0 = i * 27 - 4, x1 = x0 + 26, top = 58 + (i % 3) * 4, [c, cS] = r_FACHADAS[i % 6];
    rect(x0, top, x1, 112, c); rect(x0, top, x1, top + 2, cS); rect(x1 - 1, top, x1, 112, cS);
    for (let p = 0; p < 2; p++) { const y = top + 6 + p * 16; for (const wx of [x0 + 3, x0 + 14]) { rect(wx, y, wx + 8, y + 9, hex('#3a4a5a')); rect(wx + 1, y + 1, wx + 7, y + 8, h(i, p * 2 + wx, 642) < 0.5 ? hex('#6a8aa8') : hex('#c8a870')); for (let yy = y + 1; yy < y + 9; yy += 2) rect(wx + 1, yy, wx + 7, yy, r_mez(c, C.k, 0.2)); }
      rect(x0 + 2, y + 10, x1 - 2, y + 10, hex('#4a4a52')); for (let x = x0 + 3; x < x1 - 2; x += 3) rect(x, y + 11, x, y + 13, hex('#4a4a52')); rect(x0 + 2, y + 13, x1 - 2, y + 13, hex('#4a4a52'));
      if (h(i, p, 643) < 0.6) { rect(x0 + 18, y + 11, x0 + 23, y + 14, hex('#e8e8e8')); R.anillo(x0 + 20.5, y + 12.5, 1.2, hex('#9a9aa2')); }
      if (h(i, p, 644) < 0.5) { rect(x0 + 4, y + 8, x0 + 7, y + 10, hex('#b8603a')); disco(x0 + 5.5, y + 6, 2, hex('#4a9a4a')); } }
    const ay = top + 38; rect(x0 + 1, ay, x1 - 1, ay + 4, r_FACHADAS[(i + 3) % 6][1]); for (let x = x0 + 1; x < x1; x += 3) rect(x, ay, x + 1, ay + 4, C.blanco); rect(x0 + 1, ay + 5, x1 - 1, ay + 5, r_mez(c, C.k, 0.4));
    rect(x0 + 4, ay - 4, x1 - 4, ay - 1, hex('#2a2a3a')); rect(x0 + 6, ay - 3, x0 + 12, ay - 2, hex('#f0d040')); rect(x0 + 14, ay - 3, x1 - 6, ay - 2, hex('#e85a5a'));
    rect(x0 + 3, ay + 6, x1 - 3, 112, hex('#3a3a44')); rect(x0 + 4, ay + 7, x1 - 4, 111, hex('#6a5a4a')); }
  // los cables con su comba
  for (const [ya, yb] of [[54, 60], [62, 58]]) for (let x = 0; x < 320; x++) pset(x, Math.round(ya + (yb - ya) * x / 320 + Math.sin(x / 320 * Math.PI * 4) * 2), hex('#2a2a32'));
  // el pilar conmemorativo con su remate dorado y su escalinata
  rect(152, 34, 168, 104, hex('#e8e0d0')); rect(164, 34, 168, 104, hex('#c0b8a8')); rect(153, 34, 154, 104, C.blanco); for (let y = 44; y < 104; y += 12) rect(152, y, 168, y, hex('#c0b8a8'));
  poligono([[154, 34], [160, 18], [166, 34]], hex('#e8b830')); linea(160, 18, 154, 34, hex('#fff0a0')); rect(148, 32, 172, 34, hex('#c8a040'));
  for (let k = 0; k < 4; k++) { rect(140 - k * 4, 104 + k * 3, 180 + k * 4, 106 + k * 3, k % 2 ? hex('#d8d0c0') : hex('#e8e0d0')); rect(140 - k * 4, 104 + k * 3, 180 + k * 4, 104 + k * 3, C.blanco); }
  // dos árboles de lluvia a los lados
  for (const [tx, r] of [[30, 20], [292, 18]]) { rect(tx - 2, 88, tx + 2, 118, hex('#5a4a3a')); rect(tx - 2, 88, tx - 1, 118, hex('#7a6a56')); for (const [dx, dy, rr] of [[0, 78, r], [-r * 0.8, 86, r * 0.6], [r * 0.8, 85, r * 0.6]]) { disco(tx + dx, dy + 2, rr, hex('#2e5a2e')); disco(tx + dx - 1, dy, rr * 0.85, hex('#4a8a3a')); disco(tx + dx - 3, dy - 3, rr * 0.45, hex('#6aaa4a')); } }
  // las losas de la plaza en perspectiva
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const fx = Math.floor((x - 160) * 6 / (y - 70)), fy = Math.floor(Math.log(y - 100) * 9), jx = fx !== Math.floor((x - 1 - 160) * 6 / (y - 70)), jy = fy !== Math.floor(Math.log(y - 101) * 9);
    let c = (fx + fy) % 2 ? P.losa : P.losaL; if (jx || jy) c = P.junta; else if (h(x, y, 645) < 0.04) c = P.losaS; pset(x, y, c); }
  // las vallas metálicas
  for (let x = 96; x <= 224; x++) { pset(x, 108, P.valla); pset(x, 113, P.vallaS); } for (let x = 96; x <= 224; x += 4) rect(x, 108, x, 117, P.valla); for (const x of [96, 128, 160, 192, 224]) { rect(x - 1, 108, x + 1, 118, P.vallaS); rect(x - 3, 118, x + 3, 118, P.vallaS); }
}

// lo fijo del contraluz: el cielo dorado con el sol bajo y su halo, las torres que se estrechan hacia arriba con ventanas
// encendidas y un cable
function r_protestaManosFijo(R) {
  const { rect, pset, disco, linea, poligono } = R;
  r_degradado(R, 0, 0, 319, 179, [hex('#3a4a98'), hex('#6a62a8'), hex('#b8789a'), hex('#e8a070'), hex('#f8cc88')]);
  r_halo(R, 200, 132, 90, 60, hex('#fff0c0'), 0.7); disco(200, 132, 12, hex('#fff6d8')); disco(200, 132, 10, hex('#fffcf0'));
  poligono([[0, 0], [40, 0], [64, 180], [0, 180]], hex('#3a3050')); for (let y = 4; y < 180; y += 7) { const xr = 40 + y * 24 / 180; for (let x = 4; x < xr - 4; x += 6) if (h(x, y, 646) < 0.5) rect(x, y, x + 2, y + 3, h(x, y, 647) < 0.4 ? hex('#f0c060') : hex('#5a4a70')); } linea(40, 0, 64, 180, hex('#e8a070'));
  poligono([[262, 48], [276, 48], [276, 180], [246, 180]], hex('#3a3050')); for (let y = 54; y < 180; y += 7) for (let x = 260 - Math.round((y - 48) * 0.1); x < 274; x += 5) if (h(x, y, 648) < 0.5) rect(x, y, x + 2, y + 3, h(x, y, 649) < 0.4 ? hex('#f0c060') : hex('#5a4a70'));
  rect(278, 96, 319, 180, hex('#46385a')); rect(278, 96, 319, 97, hex('#e8a070'));
  for (let x = 64; x < 320; x++) pset(x, Math.round(28 + Math.sin((x - 64) / 256 * Math.PI) * 10), hex('#2a2238'));
}

// delante de la plaza: la espalda de la primera fila en las esquinas de abajo (cabezas y hombros, algún brazo con los tres
// dedos), por delante de los personajes
function r_protestaD(R, t, o) {
  if ((o.camara ?? 'general') !== 'general') return;
  const manos = Math.max(0, Math.min(1, o.manos ?? 0.5));
  for (const [x, k] of [[8, 0], [30, 1], [54, 2], [268, 3], [292, 4], [314, 5]]) { const col = r_ROPA[(k * 3 + 1) % 10], pelo = r_PELO[k % 5], y = 180, th = 0.1 + h(k, 9, 650) * 0.8, up = Math.max(0, Math.min(1, (manos - th) * 6));
    R.rect(x - 9, y - 5, x + 9, y, col); R.rect(x - 8, y - 6, x + 8, y - 6, col); R.rect(x - 8, y - 6, x + 8, y - 6, r_mez(col, C.blanco, 0.25)); R.rect(x + 3, y - 5, x + 9, y, r_mez(col, C.k, 0.25)); R.rect(x - 2, y - 8, x + 2, y - 6, r_mez(r_PIEL[k % 4], C.k, 0.25));
    R.disco(x, y - 12, 4.6, pelo); R.pset(x - 5, y - 11, r_PIEL[k % 4]); R.pset(x + 5, y - 11, r_PIEL[k % 4]); R.pset(x - 2, y - 15, r_mez(pelo, C.blanco, 0.35)); R.pset(x - 1, y - 16, r_mez(pelo, C.blanco, 0.35)); R.pset(x + 2, y - 9, r_mez(pelo, C.k, 0.3));
    if (up > 0) { const ay = Math.round(y - 8 - up * 18); R.rect(x + 6, ay + 2, x + 8, y - 6, col); R.rect(x + 5, ay - 1, x + 9, ay + 2, r_PIEL[k % 4]); for (const fx of [5, 7, 9]) R.rect(x + fx, ay - 4 - (fx === 7 ? 1 : 0), x + fx, ay - 1, r_PIEL[k % 4]); } }
}

const r_L = {
  pared: hex('#e8dcc0'), paredS: hex('#c8b898'), madera: hex('#8a5a3a'), maderaL: hex('#b07a50'), maderaS: hex('#5e3a24'), maderaD: hex('#3a2416'),
  suelo: hex('#b08058'), sueloL: hex('#c8966a'), sueloS: hex('#8a6040'), alfombra: hex('#3a6a5a'), alfombraL: hex('#e8dcc0'), lampara: hex('#2e6a4a'), calida: hex('#f8d890'),
  calle: hex('#d8c8b0'), acera: hex('#b8b0a8'), fachada: hex('#c87a5a'), fachadaS: hex('#9a5a40'),
};

const r_LIBROS = ['#c83a3a', '#2a6ab8', '#e8b830', '#3a8a5a', '#e8e0d0', '#8a3aa8', '#e8783a', '#2a3a5a', '#d86a9a', '#3ab0a8', '#6a3a2a', '#f0d8a8'].map(hex);

// estantes de librería en (x0, y0)–(x1, y1): lomos de colores sin letras, alguno de frente con un pictograma, sujetalibros
function r_estanteLib(R, x0, y0, x1, y1, alto, k) {
  const L = r_L, { rect } = R;
  rect(x0, y0, x1, y1, L.maderaS); rect(x0 + 2, y0 + 2, x1 - 2, y1, hex('#4a3020'));
  for (let y = y0 + 2, f = 0; y + alto <= y1 + 1; y += alto, f++) { const base = y + alto - 3;
    for (let x = x0 + 3; x < x1 - 3;) { const n = h(x, f, 660 + k);
      if (n < 0.07 && x < x1 - 14) { const c = r_LIBROS[Math.floor(h(f, x, 661 + k) * 12)], hb = alto - 5; rect(x, base - hb, x + 9, base, c); rect(x, base - hb, x + 9, base - hb, r_mez(c, C.blanco, 0.35)); r_picto(R, ['ave', 'llama', 'corazon', 'libro'][Math.floor(n * 57) % 4], x + 2, base - hb + 3, n < 0.035 ? hex('#e8b830') : C.blanco, 1); x += 11; continue; }
      if (n > 0.96) { rect(x, base - 6, x + 1, base, hex('#8a8a92')); rect(x, base, x + 4, base, hex('#8a8a92')); x += 4; continue; }
      const w = 2 + Math.floor(h(x, f, 662 + k) * 3), hb = alto - 5 - Math.floor(h(x, f, 663 + k) * 4), c = r_LIBROS[Math.floor(h(x, f, 664 + k) * 12)];
      rect(x, base - hb, x + w, base, c); rect(x, base - hb, x, base, r_mez(c, C.blanco, 0.3)); rect(x + w, base - hb, x + w, base, r_mez(c, C.k, 0.3)); if (h(x, f, 665 + k) < 0.6) rect(x, base - hb + 2, x + w, base - hb + 2, r_mez(c, C.k, 0.4));
      x += w + 1; }
    rect(x0 + 2, base + 1, x1 - 2, base + 2, L.maderaL); rect(x0 + 2, base + 1, x1 - 2, base + 1, hex('#d8a070')); }
}

// la calle soleada que se ve por el escaparate y la puerta, recortada a (x0, y0)–(x1, y1), con la cola de lectores que
// avanza a pasitos de derecha a izquierda (unos con un libro en la mano)
function r_calleLib(R, t, x0, y0, x1, y1) {
  const L = r_L, { pset } = R;
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c; if (y < 50) c = ((x + y) & 1) && y > 44 ? hex('#cce4f2') : hex('#a8d0ec'); else if (y < 92) { c = L.fachada; if ((x % 14 > 3 && x % 14 < 10) && (y % 20 > 4 && y % 20 < 14)) c = y % 20 < 7 ? hex('#f6f0e0') : hex('#5a7a98'); else if (y % 5 === 0) c = L.fachadaS; } else if (y < 98) c = L.acera; else c = y === 98 ? hex('#8a8278') : L.calle; pset(x, y, c); }
  for (let x = x0; x <= x1; x++) pset(x, 50, hex('#7a4a30'));
  const fase = t % 2.2, av = Math.floor(t / 2.2) + (fase > 1.6 ? (fase - 1.6) / 0.6 : 0), anda = fase > 1.6;
  for (let k = 0; k < 10; k++) { const xx = x0 - 20 + ((k * 13 + 1300 - Math.round(av * 4)) % 130);
    r_persona(R, xx, 108, k * 5 + 1, t, { anda, dir: -1 }); if (k % 3 === 0) R.rect(xx - 3, 102, xx - 2, 104, r_LIBROS[k % 12]); }
  R.recorte(null);
}

function r_libreria(R, t, o) {
  const L = r_L, cam = o.camara ?? 'general';
  if (cam === 'grafico') return r_libreriaGrafico(R, t, o);
  r_fijo(R, 'libreria-g', () => r_libreriaFijo(R));
  r_calleLib(R, t, 10, 34, 70, 108); r_calleLib(R, t, 84, 44, 104, 82);
  for (const [x, y] of [[40, 34], [40, 70]]) { R.rect(x, 34, x + 1, 108, hex('#e8e0d0')); } R.rect(10, 70, 70, 71, hex('#e8e0d0'));
  for (let y = 34; y < 108; y += 2) { const x = 12 + ((y * 3) % 40); R.pset(x, y, r_mez(R.pget(x, y), C.blanco, 0.45)); }
  // las lámparas colgadas con su luz
  for (const [lx, k] of [[186, 0], [236, 1]]) r_halo(R, lx, 30, 46, 34, L.calida, 0.24 * (0.92 + 0.08 * Math.sin(t * 5 + k)));
  // la torre de libros que crece
  const tor = Math.max(0, Math.min(1, o.torre ?? 0.5)), n = Math.round(tor * 22);
  for (let i = 0; i < n; i++) { const yb = 127 - i * 4.4, c = r_LIBROS[(i * 5 + 3) % 12], w = 9 + ((i * 7) % 4), dx = Math.round(Math.sin(i * 1.7) * 2 + (i === n - 1 ? Math.sin(t * 6) * (tor < 1 ? 1 : 0) : 0)), x0 = 150 - w + dx, x1 = 150 + w + dx, y0 = Math.round(yb - 3.6), y1 = Math.round(yb);
    R.rect(x0, y0, x1, y1, C.k); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, r_mez(c, C.blanco, 0.35)); R.rect(x1 - 4, y0 + 1, x1 - 1, y1 - 1, hex('#f4ecd8')); R.rect(x1 - 4, y0 + 2, x1 - 1, y0 + 2, hex('#d8ccb0')); }
  if (n > 0) { const ty = Math.round(127 - n * 4.4 - 6); if (Math.sin(t * 4) > 0) { R.pset(150, ty - 2, C.blanco); R.pset(149, ty - 1, hex('#f8e8a0')); R.pset(151, ty - 1, hex('#f8e8a0')); R.pset(150, ty, C.blanco); } }
  // motas en la luz de las lámparas
  motas(R, t, 170, 260, 30, 110, 12, hex('#fff0c8'));
  return { suelo: 166, mostrador: [212, 132, 308, 180], librera: [248, 142], mesa: [104, 128, 196, 160], torre: [150, 128, Math.round(127 - n * 4.4)], escaparate: [10, 34, 70, 108], puerta: [80, 40, 108, 118], libre: [[20, 200, 150, 180]] };
}

// lo fijo de la librería: techo de vigas, pared, estanterías, el escaparate y la puerta de cristal, lámparas, el suelo de
// tablas, la alfombra, la mesa del centro con pilas de libros, un taburete, una cesta y una planta
function r_libreriaFijo(R) {
  const L = r_L, { rect, pset, disco, linea, poligono } = R;
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 666) < 0.15 ? L.paredS : L.pared);
  rect(0, 0, 319, 8, L.maderaS); for (let x = 0; x < 320; x += 40) rect(x, 0, x + 6, 10, L.maderaD); rect(0, 8, 319, 8, L.maderaD);
  r_estanteLib(R, 116, 14, 274, 116, 17, 0); r_estanteLib(R, 274, 52, 319, 116, 16, 1);
  // escaparate y puerta
  rect(4, 28, 76, 114, L.maderaD); rect(6, 30, 74, 112, L.madera); rect(6, 30, 74, 30, L.maderaL); rect(8, 108, 72, 112, L.maderaL);
  for (let k = 0; k < 5; k++) { const c = r_LIBROS[k * 2]; rect(14 + k * 11, 100, 22 + k * 11, 107, c); rect(14 + k * 11, 100, 22 + k * 11, 100, r_mez(c, C.blanco, 0.35)); }
  rect(78, 38, 110, 118, L.maderaD); rect(80, 40, 108, 118, L.madera); rect(80, 40, 108, 40, L.maderaL); rect(84, 88, 104, 112, L.maderaS); rect(85, 89, 103, 111, L.madera); disco(104, 94, 1.5, hex('#e8c040'));
  for (let k = 0; k < 5; k++) pset(88 + k * 3, 86, hex('#e8c040')); R.linea(94, 22, 94, 30, L.maderaD); poligono([[94, 30], [100, 34], [94, 38], [88, 34]], hex('#e8b830'));
  // las lámparas colgadas
  for (const lx of [186, 236]) { linea(lx, 9, lx, 22, hex('#3a3a3a')); poligono([[lx - 8, 30], [lx + 8, 30], [lx + 4, 22], [lx - 4, 22]], L.lampara); linea(lx - 4, 22, lx + 4, 22, hex('#4a9a6a')); rect(lx - 3, 31, lx + 3, 32, L.calida); }
  // el suelo de tablas y la alfombra
  for (let y = 116; y < 180; y++) for (let x = 0; x < 320; x++) { const p = Math.floor((x - 160) * 8 / (y - 40)), pp = Math.floor((x - 1 - 160) * 8 / (y - 40)); let c = h(p, 1, 667) < 0.4 ? L.suelo : h(p, 1, 667) < 0.7 ? L.sueloL : L.sueloS; if (p !== pp) c = L.maderaS; else if ((y + Math.floor(h(p, 2, 667) * 19)) % 19 === 0) c = L.maderaS; else if (h(x >> 1, y, 668) < 0.05) c = L.sueloS; pset(x, y, c); }
  rect(0, 116, 319, 117, L.maderaD);
  for (let y = 140; y < 178; y++) for (let x = 60; x < 250; x++) { const e = Math.max(Math.abs(x - 155) / 95, Math.abs(y - 159) / 19); if (e > 1) continue; pset(x, y, e > 0.9 ? L.alfombraL : e > 0.84 ? L.alfombra : ((x >> 2) + (y >> 1)) % 4 === 0 ? hex('#4a7a6a') : L.alfombra); }
  // la mesa del centro con dos pilas de libros
  r_sombra(R, 150, 160, 50, 3);
  rect(102, 127, 198, 133, L.maderaL); rect(102, 127, 198, 127, hex('#d8a070')); rect(102, 134, 198, 140, L.madera); rect(102, 140, 198, 141, L.maderaS); for (const lx of [106, 192]) rect(lx, 141, lx + 3, 160, L.maderaS);
  for (const [px, n] of [[114, 4], [184, 3]]) for (let i = 0; i < n; i++) { const c = r_LIBROS[(i * 3 + px) % 12], y1 = 127 - i * 4; rect(px - 9, y1 - 3, px + 9, y1, C.k); rect(px - 8, y1 - 2, px + 8, y1 - 1, c); rect(px + 5, y1 - 2, px + 8, y1 - 1, hex('#f4ecd8')); }
  // un taburete, una cesta de libros y una planta
  rect(72, 150, 92, 153, L.maderaL); for (const lx of [74, 89]) rect(lx, 153, lx + 1, 166, L.maderaS); rect(74, 160, 90, 160, L.maderaS);
  poligono([[16, 150], [44, 150], [40, 166], [20, 166]], hex('#c8984a')); for (let y = 152; y < 166; y += 3) linea(17, y, 43, y, hex('#9a6a2a')); for (let k = 0; k < 5; k++) { const c = r_LIBROS[k * 2 + 1]; rect(19 + k * 5, 142 + (k % 2) * 2, 22 + k * 5, 151, c); }
  rect(298, 152, 312, 166, hex('#c0603a')); rect(298, 152, 312, 153, hex('#e08050')); for (let k = 0; k < 8; k++) { linea(305, 152, 294 + k * 3, 128 + (k % 3) * 5, hex('#3a7a3a')); disco(294 + k * 3, 128 + (k % 3) * 5, 2, hex('#5aa04a')); }
}

// el móvil en su soporte de cerca, sobre el mostrador: la pantalla con el contador y el gráfico de barras que crece
function r_libreriaGrafico(R, t, o) {
  r_fijo(R, 'libreria-c', () => r_libreriaGraficoFijo(R));
  // el vapor del café
  for (let k = 0; k < 6; k++) { const f = (t * 0.5 + k / 6) % 1, vx = 258 + Math.round(Math.sin(t * 2 + k * 1.7) * 2 + f * 3), vy = 108 - Math.round(f * 26); if (f < 0.85) R.pset(vx, vy, r_mez(R.pget(vx, vy), C.blanco, 0.55 - f * 0.45)); }
  const x0 = 124, y0 = 28, x1 = 196, y1 = 144;
  R.recorte([x0, y0, x1, y1]);
  r_degradado(R, x0, y0, x1, y1, [hex('#1a2238'), hex('#141a2c'), hex('#101424')]);
  // la barra de estado: cobertura y batería (sin letras)
  for (let k = 0; k < 4; k++) R.rect(x0 + 4 + k * 2, y0 + 5 - k, x0 + 4 + k * 2, y0 + 5, C.blanco); R.rect(x1 - 10, y0 + 2, x1 - 4, y0 + 5, C.blanco); R.rect(x1 - 9, y0 + 3, x1 - 6, y0 + 4, hex('#3ae84a')); R.pset(x1 - 3, y0 + 3, C.blanco);
  // el contador con su icono
  const cifra = String(o.cifra ?? '100'); r_picto(R, o.icono ?? 'libro', 160 - 3, y0 + 12, hex('#e8b830'), 1);
  a_cifras(R, cifra, 160, y0 + 30);
  { const f = Math.sin(t * 3) > 0; R.pset(160 + cifra.length * 3.5 + 4, y0 + 22, f ? hex('#3ae84a') : hex('#2a8a3a')); R.rect(160 + cifra.length * 3.5 + 3, y0 + 23, 160 + cifra.length * 3.5 + 5, y0 + 23, f ? hex('#3ae84a') : hex('#2a8a3a')); }
  // el gráfico de barras que crece
  const vals = o.barras ?? [0.16, 0.24, 0.34, 0.48, 0.7, 1], cr = Math.max(0, Math.min(1, o.crece ?? Math.min(1, t / 3))), gx0 = x0 + 8, gx1 = x1 - 6, gy0 = y0 + 40, gy1 = y1 - 18, bw = Math.floor((gx1 - gx0) / vals.length);
  for (let y = gy0; y < gy1; y += 12) for (let x = gx0; x < gx1; x += 2) R.pset(x, y, hex('#2a3450'));
  R.rect(gx0 - 1, gy0, gx0 - 1, gy1, hex('#5a6a8a')); R.rect(gx0 - 1, gy1, gx1, gy1, hex('#5a6a8a'));
  vals.forEach((v, i) => { const u = Math.max(0, Math.min(1, cr * vals.length - i * 0.7)), hh = Math.round(v * u * (gy1 - gy0 - 4)), bx = gx0 + i * bw + 2, ult = i === vals.length - 1, c = ult ? hex('#e8b830') : r_mez(hex('#2a6ab8'), hex('#4ab8f0'), i / vals.length);
    if (hh > 0) { R.rect(bx, gy1 - hh, bx + bw - 4, gy1 - 1, c); R.rect(bx, gy1 - hh, bx + bw - 4, gy1 - hh, r_mez(c, C.blanco, 0.45)); R.rect(bx + bw - 4, gy1 - hh, bx + bw - 4, gy1 - 1, r_mez(c, C.k, 0.3)); }
    if (ult && u >= 1 && Math.sin(t * 5) > 0) { R.pset(bx + 3, gy1 - hh - 3, C.blanco); R.pset(bx + 2, gy1 - hh - 2, hex('#fff0a0')); R.pset(bx + 4, gy1 - hh - 2, hex('#fff0a0')); R.pset(bx + 3, gy1 - hh - 1, C.blanco); } });
  // la fila de iconos de abajo
  ['libro', 'play', 'corazon', 'circulo'].forEach((p, i) => r_picto(R, p, x0 + 8 + i * 17, y1 - 10, i === 0 ? hex('#e8b830') : hex('#6a7a9a'), 1));
  // el reflejo del cristal
  for (let y = y0; y <= y1; y++) { const x = x0 + Math.round((y - y0) * 0.5) + 30; for (let i = 0; i < 6; i++) if (((x + i + y) & 1)) R.pset(x + i, y, r_mez(R.pget(x + i, y), C.blanco, 0.08)); }
  R.recorte(null);
  return { suelo: 178, pantalla: [x0, y0, x1, y1], movil: [118, 18, 202, 154], cifra: [160, y0 + 30], grafico: [gx0, gy0, gx1, gy1], libre: [[210, 300, 120, 178]] };
}

// lo fijo del móvil de cerca: la librería desenfocada detrás (lomos borrosos tramados, luces redondas), el mostrador
// con vetas, una pila de libros, la taza de café, lápices y un punto de libro, y el móvil con su soporte de madera
function r_libreriaGraficoFijo(R) {
  const L = r_L, { rect, pset, disco, linea, poligono } = R;
  for (let y = 0; y < 130; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 26), b = Math.floor((x + fila * 7) / 6), c = r_LIBROS[Math.floor(h(b, fila, 669) * 12)]; let col = r_mez(c, hex('#6a4a34'), 0.55);
    if (y % 26 > 22) col = hex('#5a3a24'); if (((x + y) & 1) && (x % 6 === 0)) col = r_mez(col, hex('#3a2416'), 0.4); pset(x, y, col); }
  for (let k = 0; k < 12; k++) { const cx = h(k, 1, 670) * 320, cy = h(k, 2, 670) * 110, r = 5 + h(k, 3, 670) * 8; for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && (d < 0.6 || r_um(x, y) > d)) pset(x, y, r_mez(R.pget(x, y), hex('#fff0c0'), 0.4)); } }
  for (let y = 130; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.3) * 2 + y * 0.4); pset(x, y, y === 130 ? hex('#d8a070') : v > 0.8 ? L.maderaL : v < -0.85 ? L.maderaS : L.madera); }
  // la pila de libros
  for (let i = 0; i < 6; i++) { const c = r_LIBROS[(i * 5 + 1) % 12], y1 = 142 - i * 7, w = 30 + (i % 3) * 3, x0 = 40 - (i % 2) * 3; rect(x0, y1 - 6, x0 + w, y1, C.k); rect(x0 + 1, y1 - 5, x0 + w - 1, y1 - 1, c); rect(x0 + 1, y1 - 5, x0 + w - 1, y1 - 5, r_mez(c, C.blanco, 0.35)); rect(x0 + w - 6, y1 - 5, x0 + w - 1, y1 - 1, hex('#f4ecd8')); for (let x = x0 + w - 6; x < x0 + w - 1; x++) pset(x, y1 - 3, hex('#d8ccb0')); }
  // la taza de café
  rect(246, 112, 270, 138, hex('#e8e4dc')); rect(246, 112, 270, 113, C.blanco); rect(268, 114, 270, 138, hex('#b8b4ac')); rect(248, 114, 268, 116, hex('#5a3a22')); R.anillo(274, 124, 5, hex('#e8e4dc')); R.anillo(274, 124, 4, hex('#b8b4ac'));
  rect(240, 138, 278, 141, hex('#d8d4cc')); rect(240, 141, 278, 141, hex('#a8a49c')); rect(252, 122, 262, 128, hex('#2a6ab8'));
  // lápices y un punto de libro
  linea(220, 168, 256, 156, hex('#e8b830')); linea(220, 169, 256, 157, hex('#c8902a')); pset(257, 156, hex('#3a3a3a')); linea(30, 172, 70, 166, hex('#c83a3a')); linea(30, 173, 70, 167, hex('#8a2a2a'));
  // el soporte de madera y el móvil
  poligono([[132, 150], [188, 150], [194, 164], [126, 164]], L.maderaL); rect(126, 164, 194, 166, L.maderaS); rect(132, 150, 188, 150, hex('#d8a070'));
  rect(118, 18, 202, 154, hex('#0a0a10')); for (const [cx, cy] of [[118, 18], [202, 18], [118, 154], [202, 154]]) { pset(cx, cy, L.madera); } rect(120, 20, 200, 152, hex('#1c1c26')); rect(120, 20, 200, 20, hex('#3a3a4a')); rect(150, 22, 170, 24, hex('#0a0a10')); disco(174, 23, 1, hex('#2a3a5a'));
}

// delante de la librería: el mostrador (tablero, frente de cuarterones), la caja con su pantalla, la campanilla, una pila
// de libros y una taza
function r_libreriaD(R, t, o) {
  if ((o.camara ?? 'general') !== 'general') return;
  const L = r_L, { rect, pset, disco } = R;
  rect(212, 132, 308, 138, L.maderaL); rect(212, 132, 308, 132, hex('#d8a070')); rect(212, 138, 308, 139, L.maderaD);
  r_madera(R, 214, 140, 306, 180, L.madera, L.maderaS, L.maderaL, L.maderaD, 7, 8);
  for (const px of [218, 250, 282]) { rect(px, 144, px + 22, 176, L.maderaS); rect(px + 1, 145, px + 21, 175, L.madera); rect(px + 1, 145, px + 21, 145, L.maderaL); }
  // la caja: una tableta en su pie con una pantalla que cambia
  rect(288, 126, 292, 132, hex('#5a5a62')); rect(282, 114, 304, 127, hex('#1a1a22')); const s = Math.floor(t / 1.5) % 3; rect(284, 116, 302, 125, s === 0 ? hex('#2a6ab8') : s === 1 ? hex('#3a8a5a') : hex('#e8b830')); rect(286, 118, 292 + s * 3, 119, C.blanco); rect(286, 121, 298, 122, hex('#d8e0f0'));
  // la campanilla, la pila de libros y una taza
  disco(222, 129, 4, hex('#c8a040')); rect(218, 130, 226, 131, hex('#8a6a2a')); pset(221, 126, hex('#fff0a0')); pset(222, 124, hex('#8a6a2a'));
  for (let i = 0; i < 3; i++) { const c = r_LIBROS[i * 4 + 2]; rect(230, 128 - i * 3, 244, 131 - i * 3, C.k); rect(231, 129 - i * 3, 243, 130 - i * 3, c); }
  rect(270, 126, 276, 131, hex('#e8e4dc')); R.anillo(278, 128, 2, hex('#e8e4dc'));
}

// la trama de Bayer 4 × 4 (0–1) para degradados y luces tramadas
const y_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const y_b4 = (x, y) => y_B4[((y & 3) << 2) | (x & 3)] / 16;

// mezcla de dos colores (f 0–1)
const y_mez = (a, b, f) => {
  const m = (s) => Math.round(((a >>> s) & 255) + (((b >>> s) & 255) - ((a >>> s) & 255)) * f);
  return ((255 << 24) | (m(16) << 16) | (m(8) << 8) | m(0)) >>> 0;
};

const y_cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

// un fondo fijo que se pinta una vez por lienzo y clave y luego se copia entero en cada fotograma
const y_CACHE = new WeakMap();

function y_fijo(R, clave, dibuja) {
  let m = y_CACHE.get(R); if (!m) y_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

const Y = pal({
  k: '#1c1222', butaca: '#6a1a28', butacaS: '#4a0e1a', butacaL: '#8e2a3a', butacaD: '#30080f', oro: '#e8b830', oroS: '#a87a18', oroL: '#ffe890',
  piel: '#f0c8a0', pielS: '#c8885a', crema: '#f6f2e6', palo: '#ffffff', verde: '#2a9a5a', verdeL: '#c8ffd8',
});

// La cabeza de un espectador de espaldas: pelo (cuatro peinados), orejas, cuello y el filo de luz de la pantalla arriba.
// (x, y) = el centro de la nuca; r el radio; tipo 0 corto, 1 melena, 2 moño, 3 gorra
function y_nuca(R, x, y, r, tipo, pelo, pelS, piel, luz) {
  const { pset, rect } = R;
  if (tipo === 1) for (let j = 0; j <= r + 2; j++) { const w = r + 1 - Math.floor(j / 4); for (let i = -w; i <= w; i++) pset(x + i, y + j, Math.abs(i) === w ? Y.k : (i + j) % 3 ? pelo : pelS); }   // la melena que cae
  rect(x - Math.max(1, r >> 1), y + r - 1, x + Math.max(1, r >> 1), y + r + 2, y_mez(piel, Y.k, 0.25));   // el cuello
  for (const s of [-1, 1]) { pset(x + s * (r + 1), y + 1, piel); pset(x + s * (r + 1), y + 2, y_mez(piel, Y.k, 0.3)); if (r > 4) pset(x + s * (r + 1), y, piel); }   // las orejas
  for (let j = -r - 1; j <= r + 1; j++) for (let i = -r - 1; i <= r + 1; i++) {
    const d = Math.hypot(i / (r * 0.88 + 0.5), j / (r + 0.9)); if (d > 1.06 || (d > 0.9 && j > r * 0.55)) continue;
    let c = d > 0.9 ? Y.k : (d > 0.72 && j < -r * 0.25 && i < r * 0.5) ? y_mez(pelo, luz, 0.6) : (r > 4 && Math.abs(((i * 2 + j) % 5)) === 0 && j > -r * 0.5) ? pelS : ((i * 3 + j * 5) & 7) === 0 ? pelS : pelo;
    if (tipo === 3 && j < -r * 0.15 && d <= 0.9) c = j < -r * 0.7 ? y_mez(hex('#3a5a9a'), luz, 0.4) : hex('#2a4a8a');
    pset(x + i, y + j, c);
  }
  if (tipo === 2) { R.disco(x, y - r - 1, Math.max(1.5, r * 0.45), Y.k); R.disco(x, y - r - 1, Math.max(1, r * 0.45 - 1), y_mez(pelo, luz, 0.3)); }
  if (tipo === 3) rect(x - r - 2, y - r * 0.15 | 0, x - r, (y - r * 0.15 | 0) + 1, hex('#1e3a6a'));   // la visera, hacia atrás
}

// el respaldo de una butaca de espaldas (centro x, arriba y, ancho w, hasta y1), con el filo de luz arriba y su costura
function y_respaldo(R, x, y, w, y1, luz, o = {}) {
  const { rect, pset } = R, a = Math.round(x - w / 2), b = Math.round(x + w / 2);
  rect(a, y + 1, b, y1, Y.k); rect(a + 1, y, b - 1, y, Y.k);
  rect(a + 1, y + 1, b - 1, y1, o.col ?? Y.butaca);
  rect(a + 2, y + 1, b - 2, y + 1, y_mez(o.col ?? Y.butacaL, luz, 0.3)); if (w > 14) rect(a + 2, y + 2, b - 2, y + 2, Y.butacaL);
  rect(b - 2, y + 2, b - 1, y1, Y.butacaS); rect(a + 1, y + 2, a + 1, y1, y_mez(Y.butacaL, luz, 0.15));
  if (w > 12) { rect(x, y + 4, x, y1, Y.butacaS); for (let j = y + 6; j < y1; j += 5) pset(x - 3, j, Y.butacaS); }
  if (w > 20) for (let j = y + 6; j < y1; j += 4) pset(x + 4, j, Y.butacaD);
}

// La película por omisión: montes y bosque al amanecer en travelling, un río que brilla y un pájaro que cruza.
function y_peli(R, t, [x0, y0, x1, y1]) {
  const { pset, linea } = R, W = x1 - x0, H = y1 - y0, pan = t * 6;
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / H; for (let x = x0; x <= x1; x++) {
    const u = (x - x0) / W, sx = x + pan * 0.15, sol = Math.hypot((x - x0 - W * 0.62 + pan * 0.15 % 400 * 0) / W * 3, (v - 0.55) * 2.2);
    let c = v < 0.5 ? y_mez(hex('#3a4a8a'), hex('#e88a6a'), y_cl(v * 1.6 + y_b4(x, y) * 0.25)) : y_mez(hex('#f0a868'), hex('#ffe0a0'), y_cl((v - 0.5) * 2.5 + y_b4(x, y) * 0.2));
    if (sol < 0.32) c = sol < 0.2 ? hex('#fff6d8') : y_b4(x, y) < (0.32 - sol) * 8 ? hex('#ffe8b0') : c;
    const n1 = 0.5 + Math.sin(sx * 0.031) * 0.12 + Math.sin(sx * 0.071 + 2) * 0.06, sx2 = x + pan * 0.45, n2 = 0.66 + Math.sin(sx2 * 0.05 + 1) * 0.08 + Math.sin(sx2 * 0.13) * 0.03, sx3 = x + pan, n3 = 0.8 + Math.sin(sx3 * 0.09) * 0.03;
    if (v > n1) c = v - n1 < 0.03 ? hex('#8a6a9a') : y_b4(x, y) < 0.3 ? hex('#5a4a7a') : hex('#6a5a8a');
    if (v > n2) c = (Math.floor(sx2 / 3) % 3 === 0 && v - n2 < 0.04) ? hex('#2a3a4a') : y_b4(x, y) < 0.4 ? hex('#2e4a4a') : hex('#3a5a52');
    if (v > n3) { const pino = Math.abs(((sx3 % 9) + 9) % 9 - 4.5); c = v - n3 > pino * 0.012 ? (y_b4(x, y) < 0.5 ? hex('#1a2a2a') : hex('#223630')) : c; }
    if (v > 0.9) c = (Math.sin(x * 0.4 + t * 3 + y) > 0.6) ? hex('#ffd8a0') : hex('#3a5a7a');   // el río que brilla
    pset(x, y, c);
  } }
  for (let k = 0; k < 3; k++) { const nx = x0 + ((h(k, 9, 401) * W + t * (3 + k * 2)) % (W + 30)) - 15, ny = y0 + 6 + k * 7; for (let i = -6 - k; i <= 6 + k; i++) for (let j = 0; j < 2; j++) if (Math.abs(i) < 6 + k - j * 2) pset(nx + i, ny + j, j ? hex('#d88a8a') : hex('#f8c8b0')); }   // nubes
  const bx = x0 + ((t * 18) % (W + 40)) - 20, by = y0 + H * 0.3 + Math.sin(t * 1.3) * 4, ala = Math.sin(t * 9) > 0 ? -2 : 2;   // el pájaro
  linea(bx - 4, by + ala, bx, by, hex('#1a1a2a')); linea(bx, by, bx + 4, by + ala, hex('#1a1a2a')); pset(bx, by + 1, hex('#1a1a2a'));
}

// La nieve del proyector: ruido gris con rayas que bajan y el círculo de la cuenta atrás que barre
function y_nieve(R, t, [x0, y0, x1, y1]) {
  const f = Math.floor(t * 12), cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, ang = (t * 2) % (Math.PI * 2);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const n = h(x, y, f % 37); let c = n < 0.33 ? hex('#5a5a62') : n < 0.66 ? hex('#8a8a92') : n < 0.93 ? hex('#b4b4bc') : hex('#e8e8ee');
    const d = Math.hypot(x - cx, (y - cy) * 1.2), a = (Math.atan2(y - cy, x - cx) + Math.PI * 2.5) % (Math.PI * 2);
    if (d < 26 && a < ang && n < 0.6) c = hex('#c8c8d0'); if (Math.abs(d - 26) < 0.8 || Math.abs(d - 20) < 0.6) c = hex('#2a2a32'); if (x === cx || y === cy) c = hex('#3a3a42');
    if (((y + f * 3) % 37) < 2) c = y_mez(c, hex('#ffffff'), 0.4);
    R.pset(x, y, c);
  }
  R.numero(String(3 - (Math.floor(t) % 3)), cx - 4, cy + 5, { color: hex('#1c1c24'), sombra: false });
}

const Y_PANT = [62, 26, 258, 100];

const Y_FILAS = [   // las filas de butacas de espaldas (de la del fondo a la de delante; la última va en hoyDelante)
  { y: 113, w: 10, paso: 11, x0: 54, x1: 272, r: 3 },
  { y: 122, w: 13, paso: 14, x0: 52, x1: 296, r: 4 },
  { y: 134, w: 17, paso: 18, x0: 50, x1: 314, r: 5 },
  { y: 155, w: 24, paso: 26, x0: 44, x1: 304, r: 7 },
];

const Y_PELOS = [['#2a2430', '#1a1420'], ['#5a3a20', '#3a2414'], ['#8a5a2a', '#5a3a1a'], ['#c8a060', '#8a6a3a'], ['#1e1a24', '#100c14'], ['#8a8a98', '#5e5e6c'], ['#a03a2a', '#6a2418']].map(([a, b]) => [hex(a), hex(b)]);

const Y_PIELES = ['#f0c8a0', '#c8885a', '#8a5a3a', '#e8b890'].map(hex);

const y_luzCine = (t, o) => o.luzPantalla != null ? (typeof o.luzPantalla === 'string' ? hex(o.luzPantalla) : o.luzPantalla) : y_mez(hex('#a8c0f0'), hex('#f0c890'), 0.5 + 0.5 * Math.sin(t * 0.45));

function y_cine(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R, lit = o.luz === 'encendida', luz = lit ? hex('#fff0d8') : y_luzCine(t, o);
  y_fijo(R, 'cineG' + (lit ? 'L' : 'A'), () => {
    const B = R.buf;
    // el techo: placas acústicas en perspectiva (oscuras y tranquilas donde va la barra del tiempo)
    for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) { const v = y / 22, u = (x - 160) / (60 + y * 5), fila = Math.floor(Math.pow(v, 0.7) * 5), linX = Math.abs((u * 6) % 1) < 0.08;
      B[y * 320 + x] = lit ? (linX || (Math.pow(v, 0.7) * 5) % 1 < 0.12 ? hex('#6a5a62') : y_b4(x, y) < 0.3 + v * 0.2 ? hex('#7a6a70') : hex('#84747a')) : (linX && x > 172) || ((Math.pow(v, 0.7) * 5) % 1 < 0.1 && x > 172) ? hex('#1a1220') : fila % 2 ? hex('#140e18') : hex('#160f1a'); }
    if (lit) for (const [lx, ly] of [[70, 6], [120, 9], [200, 9], [250, 6], [160, 14]]) { R.halo(lx, ly, 9, [hex('#a8968e'), hex('#c8b8a8'), hex('#f0e4d0')], 1.4); rect(lx - 3, ly, lx + 3, ly + 1, hex('#fff8e8')); }
    // las paredes acolchadas en perspectiva, con sus botones y la luz de la pantalla que llega de lado
    for (const lado of [-1, 1]) for (let i = 0; i <= 42; i++) {
      const x = lado < 0 ? i : 319 - i, ya = Math.round(i * 14 / 42), yb = Math.round(152 - i * 40 / 42), cols = [0, 13, 24, 33, 39, 43];
      const seam = cols.includes(i), pr = i / 42;
      for (let y = ya; y <= yb; y++) { const v = (y - ya) / (yb - ya), fila = Math.floor(v * 7), sv = (v * 7) % 1 < 0.06;
        const calma = lado > 0 && y < 50, base = lit ? y_mez(hex('#7a3a46'), hex('#9a5258'), pr * 0.6) : y_mez(hex('#2a1222'), hex('#3e1c30'), pr * 0.8 + (y_b4(x, y) - 0.5) * 0.2);
        let c = base; if ((seam || sv) && !calma) c = y_mez(base, Y.k, 0.45); else if (seam || sv) c = y_mez(base, Y.k, 0.15);
        else if (!calma && ((fila + cols.findIndex((q) => q > i)) & 1) && y_b4(x, y) < 0.25) c = y_mez(base, hex('#ffffff'), 0.05);
        B[y * 320 + x] = c; }
      if (!seam) continue;
      for (let f = 1; f < 7; f++) { const y = Math.round(ya + (yb - ya) * f / 7); if (!(lado > 0 && y < 50)) pset(x, y, lit ? hex('#c88a8a') : hex('#5a3044')); }
    }
    for (const lado of [-1, 1]) { const xb = lado < 0 ? 42 : 277; rect(xb, lado < 0 ? 14 : 14, xb, 112, Y.k); }
    // los apliques de pared (la luz se enciende sola en «encendida») y la señal de salida, un pictograma verde
    for (const [x, y] of [[18, 64], [301, 70]]) { R.halo(x, y - 3, lit ? 14 : 11, lit ? [hex('#a86a5a'), hex('#c88a6a'), hex('#f0c090')] : [hex('#3a1e26'), hex('#523028'), hex('#7a4a30')], 1.2);
      poligono([[x - 4, y - 7], [x + 4, y - 7], [x + 2, y], [x - 2, y]], hex('#a87a18')); rect(x - 3, y - 8, x + 3, y - 7, hex('#ffe0a0')); rect(x - 1, y, x + 1, y + 3, hex('#7a5a18')); }
    rect(23, 92, 37, 101, Y.k); rect(24, 93, 36, 100, Y.verde); R.halo(30, 96, 10, [hex('#1a3a2a'), hex('#1e4a32')], 0.8); rect(24, 93, 36, 100, Y.verde);
    for (const [i, j] of [[3, 0], [2, 1], [3, 1], [4, 1], [3, 2], [2, 3], [4, 3], [1, 4], [5, 4]]) pset(25 + i, 94 + j, Y.verdeL); for (let i = 0; i < 4; i++) pset(31 + i, 96, Y.verdeL); pset(34, 95, Y.verdeL); pset(34, 97, Y.verdeL);
    // el marco negro de la pantalla
    rect(52, 18, 268, 106, Y.k); rect(54, 20, 266, 104, hex('#0a0810'));
    // la bambalina con sus pliegues y el fleco dorado, y el telón recogido a los lados
    for (let x = 40; x <= 280; x++) { const pl = Math.sin(x * 0.55); for (let y = 15; y <= 24; y++) { const lz = lit ? 0.25 : Math.max(0, 0.4 - Math.abs(x - 160) / 300);
      pset(x, y, y_mez(pl > 0.3 ? hex('#8a2232') : pl > -0.4 ? hex('#6a1a28') : hex('#4a0e1a'), hex('#ff9a8a'), lz * (y > 20 ? 1 : 0.4))); }
      pset(x, 25, (x & 1) ? Y.oroS : Y.oro); if (x % 3 === 0) { pset(x, 26, Y.oroS); pset(x, 27, (x % 6) ? Y.oroS : Y.oro); } }
    rect(40, 14, 280, 14, Y.k);
    for (const [x0, d] of [[44, 1], [276, -1]]) for (let y = 26; y < 112; y++) { const ancho = 16 - Math.round(Math.max(0, 40 - Math.abs(y - 66)) / 6);
      for (let i = 0; i <= ancho; i++) { const x = x0 + d * i, f = Math.sin((i + y * 0.03) * 1.25); pset(x, y, f > 0.45 ? (lit ? hex('#b0404c') : hex('#8a2230')) : f > -0.3 ? (lit ? hex('#8a2a36') : hex('#6a1a26')) : hex('#4a1018')); }
      pset(x0 + d * (ancho + 1), y, Y.k); }
    for (const x of [48, 272]) { rect(x - 5, 64, x + 5, 66, Y.oro); rect(x - 5, 66, x + 5, 66, Y.oroS); disco(x + (x < 160 ? 6 : -6), 69, 2, Y.oroS); pset(x + (x < 160 ? 6 : -6), 72, Y.oro); }
    // el escenario de tablas y su canto
    rect(40, 104, 280, 116, hex('#2a1a1c')); rect(40, 104, 280, 104, lit ? hex('#8a6a5a') : hex('#4a3230'));
    for (let k = 0; k < 18; k++) { const y = 106 + (k % 3) * 2, x = 44 + ((k * 37) % 232); rect(x, y, x + 8, y, hex('#1e1214')); }
    rect(40, 110, 280, 116, hex('#1c1014')); for (let x = 44; x < 280; x += 16) rect(x, 111, x, 116, hex('#140a0e'));
    // la moqueta: rombos tenues, y el pasillo de la izquierda con sus peldaños
    for (let y = 110; y < 180; y++) for (let x = 0; x < 320; x++) { if (B[y * 320 + x] !== 0 && y < 117 && x > 39 && x < 281) continue;
      const v = (y - 110) / 70, d = (Math.abs(((x + y * 0.5) % 12) - 6) + Math.abs(((y * 1.5) % 12) - 6)) < 2.2;
      B[y * 320 + x] = lit ? (d ? hex('#7a3a46') : hex('#6a2e3a')) : (d && y_b4(x, y) < 0.5 ? hex('#2a1420') : y_mez(hex('#140a12'), hex('#1e0e18'), v)); }
    for (let y = 110; y < 180; y++) { const v = (y - 110) / 70, xa = Math.round(42 - v * 42), xb = Math.round(56 - v * 22);
      for (let x = Math.max(0, xa); x <= xb; x++) { const paso = Math.floor(Math.pow(v, 0.8) * 9); pset(x, y, ((Math.pow(v, 0.8) * 9) % 1) < 0.12 ? hex('#0e060a') : lit ? hex('#8a5a5a') : (paso & 1 ? hex('#2a1a22') : hex('#24161e'))); } }
  });
  // la pantalla y lo que se proyecta, recortado a su hueco
  const P = Y_PANT;
  R.recorte(P);
  if (typeof o.pantalla === 'function') o.pantalla(R, t, P);
  else if (o.pantalla === 'nieve') y_nieve(R, t, P);
  else if (lit) { for (let y = P[1]; y <= P[3]; y++) for (let x = P[0]; x <= P[2]; x++) pset(x, y, y_b4(x, y) < 0.3 + (y - P[1]) / 300 ? hex('#2a2632') : hex('#221e2a'));
    for (let k = 0; k < 40; k++) { const y = Math.round(P[3] + 4 + k * 7 - (t * 9) % 280), w1 = 14 + Math.round(h(k, 1, 409) * 30), w2 = 10 + Math.round(h(k, 2, 409) * 40); if (y < P[1] || y > P[3]) continue;
      if (k % 6 === 0) { R.rect(160 - 20, y, 160 + 20, y + 1, hex('#e8d8a0')); continue; } R.rect(156 - w1, y, 156, y, hex('#a8a4b4')); R.rect(164, y, 164 + w2, y, hex('#d8d4e4')); } }
  else y_peli(R, t, P);
  R.recorte(null);
  if (!lit) for (let y = P[1]; y <= P[3]; y++) for (let x = P[0]; x <= P[2]; x++) { const e = ((x - 160) / 98) ** 2 + ((y - 63) / 38) ** 2; if (e > 1.15 && y_b4(x, y) < (e - 1.15) * 1.6) pset(x, y, y_mez(R.pget(x, y), Y.k, 0.4)); }   // las esquinas en penumbra
  // las lucecitas del techo que titilan (lejos de la barra del tiempo) y las del borde del escenario
  if (!lit) for (let k = 0; k < 16; k++) { const x = 176 + Math.round(h(k, 1, 402) * 96), y = 1 + Math.round(h(k, 2, 402) * 12), tw = Math.sin(t * (1 + h(k, 3, 402) * 2) + k * 2); if (tw > -0.3) pset(x, y, tw > 0.6 ? hex('#f8e8c0') : hex('#6a5a5a')); }
  for (let x = 46; x < 278; x += 6) pset(x, 108, ((x / 6 | 0) + Math.floor(t * 3)) % 7 === 0 ? hex('#fff0c0') : lit ? hex('#c8a060') : hex('#a86a2a'));
  // las luces de los peldaños del pasillo
  for (let s = 0; s < 9; s++) { const v = Math.pow((s + 0.5) / 9, 1 / 0.8), y = Math.round(110 + v * 70), x = Math.round(56 - v * 22) + 1; pset(x, y, hex('#f0a040')); pset(x + 1, y, hex('#a86a2a')); if (!lit) pset(x, y + 1, hex('#5a3020')); }
  // el haz del proyector, que llega desde detrás de nosotros, con motas
  if (!lit) { for (let y = 0; y < 26; y++) { const a = Math.round(196 - y * 2.2), b = Math.round(236 + y * 0.8); for (let x = a; x <= b; x++) if (y_b4(x, y + Math.floor(t * 2)) < 0.12) pset(x, y, y_mez(R.pget(x, y), luz, 0.35)); }
    for (let k = 0; k < 16; k++) { const x = Math.round(180 + h(k, 1, 403) * 70 + Math.sin(t * 0.7 + k) * 4), y = Math.round(1 + ((h(k, 2, 403) * 24 + t * (1.5 + k % 3)) % 24)); if (Math.sin(t * 1.7 + k * 3) > -0.2 && x < 272) pset(x, y, hex('#f4ecd0')); } }
  // el público: tres filas de espaldas (la de delante, en hoyDelante, pone solo sus cabezas aquí)
  const quien = (f, k) => lit ? null : (f === 3 && (k === 4 || k === 5)) ? null : h(k, f, 404) < (f === 0 ? 0.72 : 0.8) ? { pelo: Y_PELOS[Math.floor(h(k, f, 405) * 7)], piel: Y_PIELES[Math.floor(h(k, f, 406) * 4)], tipo: Math.floor(h(k, f, 407) * 4) } : null;
  const movil = (t % 9) < 2.4, come = (t % 3.2) < 0.8, tarde = (t % 15) / 15;
  Y_FILAS.forEach((F, f) => {
    for (let k = 0, x = F.x0; x <= F.x1; k++, x += F.paso) {
      const p = quien(f, k); if (!p) { if (f < 3) y_respaldo(R, x, F.y, F.w, Y_FILAS[f + 1].y + 4, luz); continue; }
      let cx = x; if (f === 1 && k === 7) cx += Math.round(Math.sin(t * 0.5) * 0.6 + 0.6); if (f === 1 && k === 8) cx -= 1;   // la pareja que se arrima
      y_nuca(R, cx, F.y - F.r + 1, F.r, p.tipo, y_mez(p.pelo[0], Y.k, 0.5), y_mez(p.pelo[1], Y.k, 0.55), y_mez(p.piel, Y.k, 0.45), luz);
      if (f === 2 && k === 9 && come) { const u = (t % 3.2) / 0.8, hy = Math.round(F.y + 2 - Math.sin(u * Math.PI) * 6); R.rect(cx + F.r - 1, hy, cx + F.r + 1, hy + 2, p.piel); pset(cx + F.r, hy - 1, Y.crema); }   // palomitas a la boca
      if (f < 3) y_respaldo(R, x, F.y, F.w, Y_FILAS[f + 1].y + 4, luz);
      if (f === 1 && k === 3 && movil) { R.halo(cx, F.y - 2, 8, [y_mez(hex('#3a4a8a'), Y.k, 0.4), hex('#4a6ab0')], 1); rect(cx - 2, F.y - 3, cx + 2, F.y, hex('#c8e0ff')); }   // alguien mira el móvil
    }
  });
  // el que llega tarde, agachado, por la segunda fila
  if (!lit && tarde < 0.6) { const x = Math.round(300 - tarde / 0.6 * 230), y = Y_FILAS[1].y - 1 + (Math.floor(t * 6) % 2); disco(x, y, 3, Y.k); disco(x, y, 2, hex('#3a2a20')); pset(x - 1, y - 2, y_mez(hex('#3a2a20'), luz, 0.5)); }
  // el acomodador baja y sube por el pasillo con su linterna (o barre, con las luces encendidas)
  { const u = (t % 16) / 16, ida = u < 0.5, v = ida ? u * 2 : 2 - u * 2, y = Math.round(118 + v * 46), x = Math.round(50 - (y - 110) * 0.38), ss = y > 140 ? 1 : 0;
    const k = Y.k, cuerpo = hex('#7a1a2a'), pa = Math.floor(t * 5) % 2;
    if (!lit) { const dy = ida ? 1 : -1; for (let j = 2; j < 14; j++) for (let i = -j; i <= j; i++) if (y_b4(x + i, y + j * dy) < 0.25) pset(x + i + 3, y + (ida ? j : -j) + 2, hex('#6a5040')); }
    rect(x - 2, y - 9 - ss, x + 2 + ss, y - 2, k); rect(x - 1, y - 8 - ss, x + 1 + ss, y - 3, cuerpo); rect(x - 1, y - 2, x - 1, y - pa, k); rect(x + 1, y - 2, x + 1, y - 1 + pa, k);
    disco(x, y - 12 - ss, 2 + ss, Y.piel); rect(x - 2 - ss, y - 14 - ss * 2, x + 2 + ss, y - 13 - ss * 2, k); pset(x + 3, y - 6, lit ? hex('#c8a060') : hex('#fff0a0'));
    if (lit) linea(x + 3, y - 7, x + 6, y, hex('#a87a3a')); }
  if (lit) {   // la sala que se vacía: palomitas por el suelo y tres que se levantan y se van hacia el pasillo
    for (let k = 0; k < 26; k++) pset(60 + Math.round(h(k, 1, 408) * 240), 140 + Math.round(h(k, 2, 408) * 14), k % 3 ? Y.crema : hex('#f0d080'));
    for (let k = 0; k < 3; k++) { const u = ((t + k * 2.1) % 7) / 7, F = Y_FILAS[k % 3], x = Math.round(F.x1 - 20 - u * (F.x1 - 70)), pa = Math.floor(t * 5 + k) % 2;
      y_nuca(R, x, F.y - F.r - 3 - pa, F.r, k, Y_PELOS[k + 1][0], Y_PELOS[k + 1][1], Y_PIELES[k], hex('#fff0d8')); rect(x - F.r, F.y - 3 - pa + F.r, x + F.r, F.y + 1, [hex('#3a5a8a'), hex('#8a4a3a'), hex('#4a7a4a')][k]); }
  }
  // las cabezas de la fila de delante (sus respaldos van en hoyDelante)
  const F = Y_FILAS[3];
  for (let k = 0, x = F.x0; x <= F.x1; k++, x += F.paso) { const p = quien(3, k); if (!p) continue; const gira = k === 8 && (t % 11) > 1 && (t % 11) < 2.6;
    y_nuca(R, x + (gira ? 1 : 0), F.y - F.r + 2, F.r, p.tipo, y_mez(p.pelo[0], Y.k, 0.5), y_mez(p.pelo[1], Y.k, 0.55), y_mez(p.piel, Y.k, 0.45), luz); if (gira) { pset(x - F.r - 1, F.y - 2, p.piel); pset(x - F.r - 1, F.y - 1, p.piel); } }
  return { suelo: 174, pantalla: P.slice(), asientos: [[148, 155], [174, 155]], pieButaca: 162, pasillo: [8, 30], escenario: [40, 104, 280, 116], luz: lit ? 'encendida' : 'apagada' };
}

// la fila de delante del cine general, por delante de los actores: respaldos con su filo de luz, los reposabrazos con
// un cubo de palomitas y un vaso, y los dos asientos vacíos del centro (x 148 y 174) para Atom y el pan
function y_filaDelanteG(R, t, o) {
  const lit = o.luz === 'encendida', luz = lit ? hex('#fff0d8') : y_luzCine(t, o), F = Y_FILAS[3];
  for (let x = F.x0; x <= F.x1; x += F.paso) y_respaldo(R, x, F.y, F.w, 179, luz);
  for (let x = F.x0 + 13; x < F.x1; x += F.paso) { R.rect(x - 1, F.y + 8, x + 1, 179, Y.k); R.rect(x, F.y + 9, x, 179, Y.butacaD); }
  // el cubo de palomitas a rayas y el vaso con pajita, en los reposabrazos de los lados del hueco
  { const x = 161, y = F.y + 2; R.poligono([[x - 5, y - 9], [x + 5, y - 9], [x + 4, y + 2], [x - 4, y + 2]], Y.k); for (let i = -4; i <= 4; i++) R.rect(x + i, y - 8, x + i, y + 1, (i + 4) % 3 === 0 ? hex('#c8303a') : Y.crema);
    for (let i = -5; i <= 5; i++) { const a = Math.round(Math.sin(i * 1.7) * 1.2); R.pset(x + i, y - 10 + a, Y.crema); R.pset(x + i, y - 11 + a, i % 2 ? hex('#f0d080') : Y.crema); } R.pset(x - 2, y - 13, Y.crema); R.pset(x + 2, y - 12, hex('#f0d080')); }
  { const x = 135, y = F.y + 3; R.rect(x - 3, y - 7, x + 3, y + 1, Y.k); R.rect(x - 2, y - 6, x + 2, y + 1, hex('#3a6ab8')); R.rect(x - 2, y - 6, x + 2, y - 5, hex('#e8e8f0')); R.linea(x + 1, y - 7, x + 2, y - 12, hex('#e85a7a')); }
}

function y_butacas(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R, luz = y_luzCine(t, o), parpa = 0.75 + 0.25 * Math.sin(t * 7.3) * Math.sin(t * 2.1);
  y_fijo(R, 'cineB', () => {
    const B = R.buf;
    // la pared del fondo: listones acústicos y una moldura; la cabina del proyector
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const l = x % 7, v = y / 100;
      B[y * 320 + x] = l === 0 ? hex('#0e0a14') : l === 6 ? hex('#1a1424') : y_b4(x, y) < 0.2 + v * 0.3 ? hex('#16101e') : hex('#130e1a'); }
    rect(0, 14, 319, 15, hex('#221a2c')); rect(0, 16, 319, 16, hex('#0a0810'));
    rect(186, 20, 232, 40, Y.k); rect(188, 22, 230, 38, hex('#1e2a3a')); for (let x = 190; x < 230; x += 3) pset(x, 23, hex('#2e3e52'));
    rect(130, 24, 156, 36, Y.k); rect(132, 26, 154, 34, hex('#2a2016')); rect(132, 26, 154, 27, hex('#4a3a22')); pset(140, 30, hex('#6a5a3a'));   // un ventanuco con luz
    // las gradas: tres escalones que suben, con su frente oscuro y su tira de luz
    for (const [y, a] of [[56, 0], [76, 1], [98, 2]]) { rect(0, y, 319, y + 5, hex('#1a0e16')); rect(0, y, 319, y, hex('#2e1a24')); for (let x = 3 + a * 5; x < 320; x += 22) { pset(x, y + 3, hex('#f0a040')); pset(x + 1, y + 3, hex('#7a4a20')); } }
    // la moqueta del pasillo de nuestra fila
    for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (((x >> 2) + (y >> 1)) % 5 === 0) ? hex('#2a1420') : hex('#1e0e18');
  });
  // el haz del proyector, que viene hacia nosotros, con motas (por detrás del público)
  // el proyeccionista que se asoma en la cabina, de vez en cuando
  { const u = (t % 12) / 12, px = Math.round(196 + Math.sin(u * Math.PI * 2) * 4); if (u < 0.6) { R.recorte([188, 22, 230, 38]); disco(px, 30, 4, hex('#0a0e16')); R.rect(px - 5, 34, px + 5, 38, hex('#0a0e16')); pset(px - 2, 27, hex('#3a4a5a')); R.recorte(null); } }
  rect(204, 25, 222, 38, hex('#2a2e38')); rect(204, 25, 222, 25, hex('#4a4e5a')); for (const cx of [207, 219]) { disco(cx, 22, 3, Y.k); disco(cx, 22, 2, hex('#3a3e4a')); pset(Math.round(cx + Math.cos(t * 4 + cx) * 1.5), Math.round(22 + Math.sin(t * 4 + cx) * 1.5), hex('#8a8e9a')); }   // el proyector con sus bobinas que giran
  for (let y = 31; y < 180; y += 1) { const f = (y - 31) / 149, a = Math.round(209 - f * 160), b = Math.round(209 + f * 80); for (let x = a; x <= b; x += 1) { const g = Math.abs(x - (a + b) / 2) / Math.max(1, (b - a) / 2), dens = (0.2 - f * 0.12) * parpa * (1 - g * 0.6); if (y_b4(x, y) < dens) pset(x, y, y_mez(R.pget(x, y), hex('#d8e0ff'), 0.3)); } }
  for (let k = 0; k < 22; k++) { const f = (h(k, 1, 413) + t * (0.03 + h(k, 2, 413) * 0.04)) % 1, y = Math.round(31 + f * 140), x = Math.round(209 + (h(k, 3, 413) - 0.66) * f * 220 + Math.sin(t + k) * 3); if (Math.sin(t * 2 + k * 3) > -0.3) pset(x, y, hex('#f4ecd0')); }
  disco(209, 30, 5, Y.k); disco(209, 30, 4, hex('#3a3e4a')); disco(209, 30, 3, y_mez(hex('#c8d8ff'), hex('#ffffff'), parpa)); pset(208, 29, hex('#ffffff'));
  // el público de las gradas, de cara, con la luz de la pantalla (se ríen, parpadean; uno come y otro mira el móvil)
  const ROPAS = [['#3a5a8a', '#2a4268'], ['#8a3a3a', '#6a2a2a'], ['#4a7a4a', '#2e5a2e'], ['#c8a040', '#9a7a2a'], ['#6a4a8a', '#4a3468'], ['#5a5e70', '#3e4250']];
  const TIPOS = ['rizos', 'calvo', 'mujer', 'calvo', 'mujer', 'rizos'];
  const risa = Math.sin(t * 0.9) > 0.55;
  for (const [g, y, paso, x0] of [[0, 44, 13, 4], [1, 64, 16, 10], [2, 86, 19, 2]]) {
    for (let k = 0, x = x0; x < 316; k++, x += paso) {
      const sx = Math.round(x + paso / 2);
      rect(sx - paso / 2 + 1, y + 2, sx + paso / 2 - 1, y + 12, hex('#3a0e18')); rect(sx - paso / 2 + 1, y + 2, sx + paso / 2 - 1, y + 2, y_mez(Y.butacaL, luz, 0.35));   // el respaldo, de cara
      if (x > 268 && y < 46) continue;   // la esquina de Atom, tranquila
      if (h(k, g, 410) < 0.18) continue;
      const tipo = TIPOS[Math.floor(h(k, g, 411) * 6)], r = ROPAS[Math.floor(h(k, g, 412) * 6)];
      R.busto(tipo, { ...tela(r[0], r[1]), S: y_mez(hex(['#f0c8a0', '#c8885a', '#8a5a3a', '#e8b890'][k % 4]), luz, 0.15), s: hex('#c8885a') }, sx - 4, y + 1 - (risa && (k + g) % 3 === 0 ? (Math.sin(t * 14) > 0 ? 1 : 0) : 0), t + k * 0.7 + g, { rie: risa && (k + g) % 3 === 0 });
      if (g === 1 && k === 4) { const u = (t % 2.6) / 2.6; if (u < 0.4) { const hy = Math.round(y + 12 - Math.sin(u / 0.4 * Math.PI) * 4); rect(sx + 3, hy, sx + 4, hy + 1, hex('#f0c8a0')); pset(sx + 3, hy - 1, Y.crema); } }
      if (g === 0 && k === 9 && (t % 7) < 3) { R.halo(sx, y + 11, 6, [hex('#2a3a6a'), hex('#4a6ab0')], 1); rect(sx - 1, y + 9, sx + 1, y + 11, hex('#c8e0ff')); }
    }
  }
  // nuestra fila: dos butacas grandes de cara y media a cada lado, con sus reposabrazos
  const butaca = (cx, w) => {
    const a = cx - w / 2, b = cx + w / 2;
    poligono([[a + 3, 84], [b - 3, 84], [b, 88], [b, 140], [a, 140], [a, 88]], Y.k);
    poligono([[a + 4, 85], [b - 4, 85], [b - 1, 89], [b - 1, 139], [a + 1, 139], [a + 1, 89]], (x, y) => { const u = (x - a) / w, f = Math.abs(u - 0.5) * 2;
      const acolch = (y - 85) % 12 === 0 || Math.abs(x - cx) < 1; return acolch ? Y.butacaS : f > 0.8 ? Y.butacaD : y < 88 ? y_mez(Y.butacaL, luz, 0.35 * parpa) : f < 0.35 && y_b4(x, y) < 0.3 * parpa ? y_mez(Y.butacaL, luz, 0.15) : Y.butaca; });
    for (let y = 97; y < 130; y += 12) for (const dx of [-w / 4, w / 4]) pset(Math.round(cx + dx), y, Y.butacaD);
    rect(a + 2, 124, b - 2, 140, Y.k); rect(a + 3, 125, b - 3, 140, Y.butacaS); rect(a + 3, 125, b - 3, 126, y_mez(Y.butacaL, luz, 0.3 * parpa));   // el cojín
  };
  butaca(64, 52); butaca(128, 56); butaca(192, 56); butaca(256, 52);
  // la chaqueta en la butaca de la izquierda y el bolso en la de la derecha
  poligono([[48, 96], [78, 92], [82, 124], [46, 126]], Y.k); poligono([[49, 97], [77, 93], [80, 123], [47, 125]], hex('#3a5a7a')); linea(62, 95, 64, 124, hex('#2a4058')); for (let y = 100; y < 122; y += 6) pset(66, y, hex('#c8c8d0')); rect(50, 98, 56, 99, hex('#4a6a8a'));
  rect(244, 112, 270, 126, Y.k); rect(245, 113, 269, 126, hex('#8a4a2a')); rect(245, 113, 269, 114, hex('#aa6a3a')); linea(249, 113, 254, 104, Y.k); linea(254, 104, 260, 104, Y.k); linea(260, 104, 265, 113, Y.k); rect(255, 118, 259, 120, Y.oro);
  // los reposabrazos con el cubo de palomitas (entre Atom y el pan) y el vaso con pajita
  for (const x of [96, 160, 224]) { rect(x - 5, 112, x + 5, 140, Y.k); rect(x - 4, 113, x + 4, 140, hex('#2a1418')); rect(x - 4, 113, x + 4, 114, y_mez(hex('#4a2a2e'), luz, 0.3)); rect(x - 3, 110, x + 3, 112, Y.k); }
  { const x = 160, y = 110; poligono([[x - 7, y - 16], [x + 7, y - 16], [x + 5, y], [x - 5, y]], Y.k); for (let i = -6; i <= 6; i++) for (let j = y - 15; j < y; j++) if (Math.abs(i) <= 6 - (j - y + 16) / 8) pset(x + i, j, (i + 6) % 4 < 2 ? hex('#c8303a') : Y.crema);
    for (let i = -7; i <= 7; i++) { const a = Math.round(Math.abs(Math.sin(i * 1.3)) * 2); for (let j = 0; j <= a + 1; j++) pset(x + i, y - 17 - j, (i + j) % 3 ? Y.crema : hex('#f0d080')); } pset(x - 3, y - 21, Y.crema); pset(x + 2, y - 21, Y.crema); }
  { const x = 224, y = 110; rect(x - 4, y - 13, x + 4, y, Y.k); rect(x - 3, y - 12, x + 3, y, hex('#3a6ab8')); rect(x - 3, y - 12, x + 3, y - 10, hex('#e8e8f0')); for (let j = y - 8; j < y; j += 3) pset(x - 2, j, hex('#6a9ae0')); linea(x + 1, y - 13, x + 3, y - 20, hex('#e85a7a')); }
  // la luz de la pantalla, que parpadea en el borde de todo (un filo tramado que va y viene)
  for (let x = 0; x < 320; x += 2) if (y_b4(x, Math.floor(t * 6)) < 0.5 * parpa) pset(x + (Math.floor(t * 6) & 1), 103, y_mez(hex('#2e1a24'), luz, 0.4));
  return { suelo: 136, asientos: [[128, 136], [192, 136]], escondite: 172, respaldoDelante: 142, palomitas: [160, 92], vaso: [224, 92], proyector: [209, 30] };
}

// la fila de delante del contraplano: respaldos de espaldas (tapan del cojín para abajo) y la cabeza de un espectador
function y_filaDelanteB(R, t, o) {
  const luz = y_luzCine(t, o);
  [-4, 64, 128, 192, 256, 324].forEach((x, n) => { y_respaldo(R, x, 142, 62, 179, luz, {});
    for (let y = 145; y < 180; y++) for (let i = -28; i <= 28; i++) { const e = Math.abs(i) / 28; if (e > 0.75 && y_b4(x + i, y) < (e - 0.75) * 2) R.pset(x + i, y, Y.butacaS); else if (e < 0.4 && y < 152 && y_b4(x + i, y) < 0.25) R.pset(x + i, y, y_mez(Y.butacaL, luz, 0.3)); }
    R.rect(x - 28, 148, x + 28, 148, Y.butacaS); R.rect(x - 28, 149, x + 28, 149, y_mez(Y.butacaL, luz, 0.15));
    for (let j = 156; j < 180; j += 8) for (const dx of [-14, 0, 14]) { R.pset(x + dx, j, Y.butacaD); R.pset(x + dx + 1, j + 1, Y.butacaL); }
    R.rect(x - 5, 162, x + 5, 168, Y.k); R.rect(x - 4, 163, x + 4, 167, Y.oroS); R.rect(x - 4, 163, x + 4, 163, Y.oroL);
    for (let d = 0; d < 2; d++) { const v = (n * 3 + 11 + d * 5) % 10; for (let q = 0; q < 3; q++) if ((v >> q) & 1 || q === 1) R.pset(x - 2 + d * 3, 164 + q, Y.k); } });
  for (const x of [32, 96, 160, 224, 288]) { R.rect(x - 2, 148, x + 2, 179, Y.k); R.rect(x - 1, 149, x + 1, 179, hex('#2a1418')); R.rect(x - 3, 146, x + 3, 148, Y.k); }
  // un espectador de la fila de delante, de espaldas: la nuca con el filo de luz, la capucha de la sudadera y los hombros
  { const x = 300, y = 138, sud = hex('#3a5a7a'), sudS = hex('#2a4058'), sudL = hex('#5a7a9a');
    R.poligono([[x - 22, 180], [x - 18, 156], [x - 8, 150], [x + 8, 150], [x + 18, 156], [x + 22, 180]], Y.k); R.poligono([[x - 21, 180], [x - 17, 157], [x - 8, 151], [x + 8, 151], [x + 17, 157], [x + 21, 180]], (px, py) => px < x - 10 && y_b4(px, py) < 0.5 ? sudL : px > x + 10 ? sudS : sud);
    R.disco(x, 154, 9, Y.k); R.disco(x, 154, 8, sudS); R.disco(x, 153, 6, sud); y_nuca(R, x, y, 10, 0, Y_PELOS[2][0], Y_PELOS[2][1], Y_PIELES[0], y_mez(luz, hex('#ffffff'), 0.2));
    R.linea(x - 3, 156, x - 2, 168, hex('#e8e8f0')); R.linea(x + 3, 156, x + 2, 168, hex('#e8e8f0')); }
}

const Y_LIBROS = [['#c8303a', '#8a1a24'], ['#e8b830', '#a87a18'], ['#3a6ab8', '#24467a'], ['#4a8a4a', '#2e5a2e'], ['#7a4ab0', '#52307a']].map(([a, b]) => [hex(a), hex(b)]);

// Un libro de la serie, de pie (lomo de cara): k 0–4 (rojo, oro, azul, verde, morado), sin letras: una franja y un
// símbolo; (x, y) = abajo en el centro. Para que la escena lo lleve en la mano o lo pinte fuera de la estantería.
export function libroJH(R, x, y, k, o = {}) {
  const [c, s] = Y_LIBROS[k % 5], w = o.w ?? 5, al = o.alto ?? 15, a = Math.round(x - w / 2);
  R.rect(a - 1, y - al - 1, a + w, y, Y.k); R.rect(a, y - al, a + w - 1, y, c); R.rect(a + w - 1, y - al, a + w - 1, y, s); R.rect(a, y - al, a, y, y_mez(c, hex('#ffffff'), 0.3));
  R.rect(a, y - al + 2, a + w - 1, y - al + 2, Y.oro); R.rect(a, y - 3, a + w - 1, y - 3, Y.oro);
  R.pset(a + (w >> 1), y - (al >> 1), Y.oroL); R.pset(a + (w >> 1), y - (al >> 1) - 1, Y.oro); R.pset(a + (w >> 1), y - (al >> 1) + 1, Y.oroS);
  for (let i = 0; i <= k; i++) R.pset(a + 1 + i % (w - 1), y - 5, Y.crema);   // el número del tomo, en puntos
}

// el mapa de los doce distritos (un país inventado): chinchetas que se clavan (o.mapa)
const Y_DISTRITOS = [[244, 64], [254, 68], [232, 70], [262, 72], [222, 76], [240, 76], [250, 80], [232, 82], [214, 70], [222, 86], [244, 88], [264, 82]];

function y_mapa(R, t, n, x0 = 206, y0 = 56) {
  const { rect, pset } = R, dx = x0 - 206, dy = y0 - 56;
  for (let k = 0; k < 12; k++) {
    const [px, py] = Y_DISTRITOS[k], x = px + dx, y = py + dy, f = y_cl(n - k), cae = f > 0 && f < 1;
    if (f <= 0) continue;
    const yy = cae ? Math.round(y - (1 - f) * 10) : y, c = k === 11 ? hex('#e8303a') : [hex('#3a8ae8'), hex('#e8b830'), hex('#4ab84a'), hex('#c84ae0')][k % 4];
    if (!cae) pset(x + 1, y + 1, hex('#5a4a3a'));
    rect(x - 1, yy - 2, x + 1, yy, Y.k); rect(x, yy - 2, x, yy - 1, c); pset(x - 1, yy - 2, c); pset(x, yy + 1, hex('#c8c8d0'));
    if (k === 11 && f >= 1) { const b = Math.sin(t * 5) > 0; if (b) R.halo(x, yy - 1, 6, [hex('#e8806a'), hex('#ffb0a0')], 1); rect(x - 1, yy - 2, x + 1, yy, Y.k); rect(x, yy - 2, x, yy - 1, c); }
  }
}

// la vista de la ventana del cuarto (tarde o noche), recortada a su hueco [x0, y0, x1, y1]
function y_ciudad(R, t, noche, [x0, y0, x1, y1]) {
  const { pset, rect } = R, H = y1 - y0;
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / H; for (let x = x0; x <= x1; x++) pset(x, y, noche ? y_mez(hex('#0e1232'), hex('#2a2e5a'), y_cl(v * 1.2 + (y_b4(x, y) - 0.5) * 0.25)) : y_mez(hex('#e88a6a'), hex('#ffd890'), y_cl(v * 1.3 + (y_b4(x, y) - 0.5) * 0.25))); }
  if (noche) { for (let k = 0; k < 14; k++) { const x = x0 + Math.round(h(k, 1, 420) * (x1 - x0)), y = y0 + 2 + Math.round(h(k, 2, 420) * 22); if (Math.sin(t * (1.3 + k * 0.2) + k) > -0.4) pset(x, y, k % 3 ? hex('#c8c8e8') : hex('#ffffff')); }
    R.disco(x0 + 12, y0 + 10, 4, hex('#f0ecd0')); R.disco(x0 + 14, y0 + 9, 3.4, hex('#1a1e44')); }
  else { R.halo(x0 + 34, y0 + 40, 14, [hex('#f8b878'), hex('#ffd8a0'), hex('#fff0c8')], 1.3); R.disco(x0 + 34, y0 + 40, 5, hex('#fff4d0')); }
  // nubes de tres tonos a tres velocidades
  for (let k = 0; k < 5; k++) { const vel = 1.2 + (k % 3) * 1.4, w = 10 + (k % 3) * 4, nx = x0 - 16 + ((h(k, 3, 420) * 80 + t * vel) % (x1 - x0 + 32)), ny = y0 + 6 + k * 6;
    const cs = noche ? [hex('#2a2e5a'), hex('#3a3e6a'), hex('#4a4e7a')] : [hex('#d87a6a'), hex('#f0a888'), hex('#ffe0c8')];
    for (let i = -w; i <= w; i++) { const al = Math.round(Math.sqrt(Math.max(0, 1 - (i / w) ** 2)) * 3); for (let j = -al; j <= 1; j++) pset(Math.round(nx + i), ny + j, j === 1 ? cs[0] : j <= -al + 1 ? cs[2] : cs[1]); } }
  // los edificios con sus ventanas, que se encienden y apagan
  for (let k = 0; k < 6; k++) { const bx = x0 - 2 + k * 9, bh = 14 + Math.round(h(k, 4, 420) * 20), by = y1 - bh; rect(bx, by, bx + 7, y1, noche ? hex('#141832') : hex('#7a5a6a')); rect(bx + 7, by, bx + 7, y1, noche ? hex('#0e1028') : hex('#6a4a5a'));
    for (let j = by + 3; j < y1 - 2; j += 4) for (let i = bx + 1; i < bx + 7; i += 3) { const on = h(i, j + Math.floor(t / 4 + k) * 3, 421) < (noche ? 0.45 : 0.2); pset(i, j, on ? hex('#f8d070') : noche ? hex('#22264a') : hex('#9a7a88')); } }
  // pájaros (de tarde) o un avión que parpadea (de noche)
  if (noche) { const ax = Math.round(x1 - ((t * 6) % 80)); pset(ax, y0 + 16, Math.floor(t * 3) % 2 ? hex('#ff4040') : hex('#ffffff')); }
  else for (let k = 0; k < 3; k++) { const bx = Math.round(x0 + ((t * (7 + k) + k * 20) % (x1 - x0 + 10)) - 5), by = y0 + 14 + k * 4 + Math.round(Math.sin(t * 2 + k)), a = Math.sin(t * 10 + k) > 0 ? 1 : 0; pset(bx - 1, by - a, hex('#3a2a3a')); pset(bx, by, hex('#3a2a3a')); pset(bx + 1, by - a, hex('#3a2a3a')); }
  R.recorte(null);
}

// la portada sin letras que sale en la tele: 1 un sinsajo, 2 una llama, 3 una serpiente y un pájaro (o un paisaje)
function y_portada(R, t, n, [x0, y0, x1, y1]) {
  const { pset } = R, cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1;
  const fondo = n === 1 ? [hex('#1a1a2a'), hex('#2a2a3e')] : n === 2 ? [hex('#3a0e14'), hex('#6a1a1a')] : n === 3 ? [hex('#0e2a1a'), hex('#1a3e2a')] : null;
  if (!fondo) { y_peli(R, t, [x0, y0, x1, y1]); return; }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y_b4(x, y) < (y - y0) / (y1 - y0) ? fondo[1] : fondo[0]);
  if (n === 1) { R.halo(cx, cy, 13, [hex('#4a3a1a'), hex('#8a6a20')], 1.1); PIEZAS_JH.broche(R, cx, cy + 9, { s: 2, brillo: Math.sin(t * 3) > 0 }); }
  else if (n === 2) { for (let j = 0; j < 22; j++) { const w = Math.round(Math.sin(j / 22 * Math.PI) * 7 + (j > 14 ? 2 : 0)), sway = Math.round(Math.sin(t * 6 + j * 0.4) * (22 - j) / 14); for (let i = -w; i <= w; i++) pset(cx + i + sway, cy + 10 - j, Math.abs(i) < w * 0.35 ? hex('#fff0a0') : Math.abs(i) < w * 0.7 ? hex('#ffb040') : hex('#e85a2a')); } }
  else { for (let a = 0; a < 40; a++) { const x = cx - 14 + a * 0.7, y = cy + 6 + Math.sin(a * 0.4 + t * 2) * 3; pset(Math.round(x), Math.round(y), hex('#4ab84a')); pset(Math.round(x), Math.round(y) + 1, hex('#2e7a2e')); } PIEZAS_JH.sinsonte(R, cx + 6, cy - 1, { t }); }
  R.rect(x0 + 3, y1 - 4, x1 - 3, y1 - 4, hex('#c8c8d0')); R.rect(x0 + 8, y1 - 2, x1 - 8, y1 - 2, hex('#8a8a96'));   // el título, en barras
}

function y_cuarto(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R, noche = o.luz === 'noche';
  const hora = o.hora ?? (noche ? 22 : 17);
  y_fijo(R, 'cuarto' + (noche ? 'N' : 'T'), () => {
    const B = R.buf;
    // la pared: papel pintado de rayas con florecitas, con la mancha de luz de la ventana (tarde) o de la lámpara (noche)
    for (let y = 0; y < 136; y++) for (let x = 0; x < 320; x++) {
      const raya = (x % 10) < 5, flor = (x % 10) === 7 && (y % 12) === 4 || (x % 10) === 2 && (y % 12) === 10;
      const luz = noche ? Math.max(0, 1 - Math.hypot(x - 312, (y - 70) * 1.2) / 140) : y_cl(1 - Math.abs((x - (y * 0.9 + 70)) / 70)) * (y > 20 ? 1 : 0.3);
      const calma = x > 270 && y < 48;
      let c = noche ? (raya ? hex('#2a3048') : hex('#262a42')) : (raya ? hex('#7a9a8e') : hex('#729286'));
      if (flor && !calma) c = noche ? hex('#3a4058') : hex('#a8c0b0');
      if (y_b4(x, y) < luz * 0.8) c = y_mez(c, noche ? hex('#f0c070') : hex('#ffd0a0'), noche ? 0.22 : 0.3);
      B[y * 320 + x] = c; }
    rect(0, 0, 319, 3, noche ? hex('#1a1e30') : hex('#e8e0d0')); rect(0, 4, 319, 4, noche ? hex('#12141e') : hex('#a8a090'));   // la moldura del techo
    rect(0, 128, 319, 135, noche ? hex('#3a3040') : hex('#e8e0d0')); rect(0, 128, 319, 128, noche ? hex('#4a4050') : hex('#ffffff')); rect(0, 135, 319, 135, hex('#5a4a3a'));   // el rodapié
    // el suelo de tarima en perspectiva, con vetas, y la alfombra
    for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) {
      const v = (y - 136) / 44, xs = (x - 160) / (0.6 + v * 0.8), tabla = Math.floor((xs + 400) / 22), borde = Math.abs((((xs + 400) % 22) + 22) % 22) < 1.2;
      const veta = h(tabla, Math.floor(y / 3), 422) < 0.15, lz = noche ? 0 : y_cl(1 - Math.abs(x - 60 - y * 0.6) / 60);
      let c = borde ? hex('#5a3a22') : (tabla & 1 ? hex('#a8744a') : hex('#9a6a42')); if (veta) c = y_mez(c, hex('#6a4428'), 0.5); if (noche) c = y_mez(c, hex('#1a1426'), 0.45);
      if (y_b4(x, y) < lz * 0.6) c = y_mez(c, hex('#ffd8a0'), 0.25);
      B[y * 320 + x] = c; }
    for (let y = 148; y < 178; y++) { const v = (y - 148) / 30, a = Math.round(96 - v * 18), b = Math.round(228 + v * 18); for (let x = a; x <= b; x++) { const e = y === 148 || y === 177 || x === a || x === b, d = ((x + y * 2) >> 2) % 4;
      B[y * 320 + x] = y_mez(e ? hex('#e8d8b0') : (y - 152) % 8 < 2 && y > 151 && y < 174 ? hex('#c8a040') : d === 0 ? hex('#8a3a3a') : hex('#a84a42'), hex('#1a1426'), noche ? 0.45 : 0); } }
    // ── la ventana con el alféizar, el radiador y las cortinas (lo de fuera va encima, animado)
    rect(6, 20, 60, 88, hex('#e8e0d0')); rect(6, 20, 60, 20, hex('#ffffff')); rect(60, 20, 60, 88, hex('#a8a090')); rect(8, 22, 58, 86, Y.k);
    rect(2, 88, 64, 92, hex('#f0e8d8')); rect(2, 92, 64, 93, hex('#9a9080'));
    rect(10, 100, 54, 124, Y.k); for (let x = 11; x < 54; x += 4) { rect(x, 101, x + 2, 123, noche ? hex('#8a8a96') : hex('#e8e8ec')); rect(x + 2, 101, x + 2, 123, hex('#a8a8b4')); } rect(11, 124, 53, 126, hex('#6a6a78')); rect(14, 126, 14, 128, hex('#6a6a78')); rect(50, 126, 50, 128, hex('#6a6a78'));
    // ── el póster del sinsajo (el broche dorado sobre negro) y el de la llama, sin letras: barras
    rect(68, 14, 98, 54, Y.k); rect(69, 15, 97, 53, hex('#16161e')); R.halo(83, 32, 12, [hex('#2a2414'), hex('#3a3018')], 1); PIEZAS_JH.broche(R, 83, 40, { s: 2 }); rect(72, 46, 94, 47, Y.oroS); rect(76, 50, 90, 50, hex('#6a6a70')); for (const [cx, cy] of [[69, 15], [97, 15]]) pset(cx, cy, hex('#c8c8d0'));
    rect(208, 12, 236, 50, Y.k); rect(209, 13, 235, 49, hex('#3a0e14')); for (let j = 0; j < 20; j++) { const w = Math.round(Math.sin(j / 20 * Math.PI) * 7 + (j > 13 ? 2 : 0)); for (let i = -w; i <= w; i++) pset(222 + i, 40 - j, Math.abs(i) < w * 0.35 ? hex('#fff0a0') : Math.abs(i) < w * 0.7 ? hex('#ffb040') : hex('#e85a2a')); } rect(212, 44, 232, 45, hex('#e8b830')); rect(216, 47, 228, 47, hex('#8a5a5a'));
    // ── la estantería: cuatro baldas
    rect(66, 58, 110, 142, Y.k); rect(67, 59, 109, 142, hex('#8a5a32')); rect(67, 59, 109, 60, hex('#b07a48'));
    for (const [y0, y1] of [[62, 80], [84, 100], [104, 120], [124, 140]]) { rect(69, y0, 107, y1, hex('#3a2418')); rect(69, y0, 107, y0, hex('#2a180e')); rect(69, y1 + 1, 107, y1 + 3, hex('#a06a3a')); rect(69, y1 + 1, 107, y1 + 1, hex('#c08a58')); }
    // las cajas de las películas (con un dibujito cada una), un sinsajo de juguete, una planta, cestas
    for (let k = 0; k < 5; k++) { const x = 70 + k * 6; rect(x, 88, x + 5, 100, Y.k); rect(x + 1, 89, x + 4, 100, [hex('#2a2a3e'), hex('#6a1a1a'), hex('#1a3e2a'), hex('#4a3a6a'), hex('#8a6a20')][k]); pset(x + 2, 93, [Y.oro, hex('#ffb040'), hex('#4ab84a'), hex('#c8c8e8'), hex('#ffffff')][k]); pset(x + 3, 94, [Y.oro, hex('#ffb040'), hex('#4ab84a'), hex('#c8c8e8'), hex('#ffffff')][k]); rect(x + 1, 98, x + 4, 98, hex('#c8c8d0')); }
    rect(101, 92, 106, 100, Y.k); rect(102, 93, 105, 100, hex('#c86a3a')); for (const [i, j] of [[0, -3], [-2, -5], [2, -6], [1, -8], [-1, -7]]) pset(103 + i, 92 + j, hex('#4a9a3a'));
    PIEZAS_JH.sinsajo(R, 78, 120, {}); rect(92, 112, 106, 120, Y.k); rect(93, 113, 105, 120, hex('#c8b890')); for (let x = 94; x < 105; x += 2) rect(x, 114, x, 120, hex('#a89870'));
    for (const x of [70, 89]) { rect(x, 128, x + 16, 140, Y.k); rect(x + 1, 129, x + 15, 140, hex('#b89868')); for (let y = 130; y < 140; y += 2) for (let i = x + 1 + (y % 4 ? 1 : 0); i < x + 15; i += 2) pset(i, y, hex('#9a7a4a')); }
    // ── el corcho pequeño (marco y textura; lo que lleva, animado, va encima)
    rect(114, 16, 198, 76, Y.k); rect(115, 17, 197, 75, hex('#8a5e3a')); rect(117, 19, 195, 73, hex('#b88a5a'));
    for (let k = 0; k < 260; k++) pset(117 + Math.round(h(k, 1, 423) * 78), 19 + Math.round(h(k, 2, 423) * 54), k % 3 ? hex('#a07446') : hex('#c89c6a'));
    // ── el mapa de los doce distritos: un país inventado sobre papel viejo, con ríos
    rect(204, 54, 272, 96, Y.k); rect(205, 55, 271, 95, hex('#e8dcb8')); for (let k = 0; k < 60; k++) pset(205 + Math.round(h(k, 1, 424) * 66), 55 + Math.round(h(k, 2, 424) * 40), hex('#d8c8a0'));
    poligono([[210, 66], [222, 60], [240, 58], [258, 60], [268, 68], [266, 84], [256, 92], [236, 92], [216, 90], [208, 80]], hex('#7a6a4a'));
    poligono([[211, 66], [222, 61], [240, 59], [257, 61], [267, 68], [265, 83], [255, 91], [236, 91], [217, 89], [209, 80]], (x, y) => (Math.floor(x / 9) + Math.floor(y / 8)) % 3 === 0 ? hex('#c8b880') : (Math.floor(x / 9) + Math.floor(y / 8)) % 3 === 1 ? hex('#b8c890') : hex('#d0c090'));
    linea(226, 62, 236, 74, hex('#6a9ac8')); linea(236, 74, 248, 90, hex('#6a9ac8')); linea(258, 62, 262, 76, hex('#6a9ac8'));
    for (let k = 0; k < 8; k++) linea(212 + k * 7, 70 + (k % 3) * 4, 214 + k * 7, 84 - (k % 2) * 4, hex('#a89870'), 2);
    disco(240, 70, 3, hex('#e8dcb8')); disco(240, 70, 2, hex('#c8a040'));   // la capital, en el centro
    // ── el reloj de pared (la esfera; las agujas van encima)
    disco(288, 64, 10, Y.k); disco(288, 64, 9, hex('#a87a48')); disco(288, 64, 7, hex('#f6f2e6')); for (let k = 0; k < 12; k++) pset(Math.round(288 + Math.cos(k * Math.PI / 6) * 6), Math.round(64 + Math.sin(k * Math.PI / 6) * 6), hex('#5a4a3a'));
    // ── la tele en su mueble, con la consola y su piloto; la lámpara de pie
    rect(212, 124, 312, 146, Y.k); rect(213, 125, 311, 146, hex('#7a5a3a')); rect(213, 125, 311, 126, hex('#a07a50')); rect(262, 127, 262, 146, Y.k);
    for (const x0 of [216, 266]) { rect(x0, 129, x0 + 42, 144, hex('#6a4a2e')); rect(x0, 129, x0 + 42, 129, hex('#8a6a48')); rect(x0 + 19, 135, x0 + 23, 136, hex('#c8a060')); }
    rect(214, 146, 216, 150, Y.k); rect(308, 146, 310, 150, Y.k);
    rect(222, 90, 302, 122, Y.k); rect(224, 92, 300, 120, hex('#0e0e14')); rect(258, 122, 266, 124, Y.k); rect(250, 124, 274, 125, hex('#2a2a32'));
    rect(282, 116, 300, 123, Y.k); rect(283, 117, 299, 123, hex('#e8e8ec')); rect(283, 120, 299, 120, hex('#a8a8b4'));
    rect(313, 70, 314, 150, hex('#5a4a3a')); rect(308, 150, 319, 151, hex('#3a2a20'));
    poligono([[306, 56], [319, 56], [319, 70], [302, 70]], Y.k); poligono([[307, 57], [319, 57], [319, 69], [303, 69]], noche ? hex('#f8d890') : hex('#e8d8b8'));
    // ── el sofá con cojines y la manta de punto (echada sobre el brazo derecho)
    const sofa = hex('#4a6a9a'), sofaS = hex('#344e7a'), sofaL = hex('#6a8aba');
    rect(112, 98, 204, 128, Y.k); rect(113, 99, 203, 127, sofa); rect(113, 99, 203, 101, sofaL); rect(158, 102, 158, 124, sofaS);
    for (let x = 116; x < 202; x += 2) if (h(x, 1, 425) < 0.5) pset(x, 104 + (x % 7), sofaS);
    for (const [x0, x1] of [[104, 120], [196, 212]]) { rect(x0, 110, x1, 148, Y.k); rect(x0 + 1, 111, x1 - 1, 147, sofa); disco((x0 + x1) / 2, 112, (x1 - x0) / 2, Y.k); disco((x0 + x1) / 2, 112, (x1 - x0) / 2 - 1, sofaL); rect(x0 + 1, 112, x1 - 1, 113, sofaL); rect(x1 - 3, 114, x1 - 1, 147, sofaS); }
    rect(120, 124, 196, 148, Y.k); rect(121, 125, 157, 133, sofaL); rect(159, 125, 195, 133, sofaL); rect(121, 133, 195, 147, sofa); rect(121, 140, 195, 140, sofaS); rect(158, 125, 158, 133, Y.k);
    for (const x of [122, 192]) rect(x, 148, x + 3, 151, hex('#3a2a20'));
    rect(121, 106, 136, 122, Y.k); rect(122, 107, 135, 121, hex('#3a8a6a')); rect(122, 107, 135, 108, hex('#5aaa8a')); for (let j = 110; j < 121; j += 3) for (let i = 124 + (j % 2) * 2; i < 135; i += 4) pset(i, j, hex('#e8e0c0'));   // un cojín verde con lunares
    rect(166, 108, 181, 123, Y.k); rect(167, 109, 180, 122, hex('#c84a4a')); rect(167, 109, 180, 110, hex('#e06a6a')); disco(173.5, 116, 3, hex('#f6f2e6')); disco(173.5, 116, 1.5, hex('#c84a4a'));   // un cojín rojo
    // la manta de punto, echada sobre el brazo derecho: cae por fuera y un pico sobre el asiento, con sus pliegues y flecos
    const punto = (x, y) => ((x + (y >> 1)) % 4 === 0) ? hex('#a87a2a') : ((x - (y >> 1)) % 4 === 0) ? hex('#e0b050') : hex('#c8943a');
    poligono([[193, 108], [204, 101], [215, 106], [216, 146], [195, 146], [194, 134], [186, 133], [189, 120]], Y.k);
    poligono([[194, 108], [204, 102], [214, 107], [215, 145], [196, 145], [195, 133], [187, 132], [190, 120]], punto);
    for (const x of [200, 207]) linea(x, 108, x + 1, 144, hex('#9a6a22')); linea(190, 122, 195, 131, hex('#9a6a22'));
    for (let x = 196; x <= 215; x += 2) { pset(x, 146, hex('#c8943a')); pset(x, 147, hex('#a87a2a')); } for (let x = 187; x <= 194; x += 2) pset(x, 133, hex('#c8943a'));
  });
  // la ventana: la ciudad a la tarde o de noche, el gato del alféizar y las cortinas que se mecen
  y_ciudad(R, t, noche, [9, 23, 57, 85]);
  rect(32, 22, 33, 86, hex('#e8e0d0')); rect(9, 53, 57, 54, hex('#e8e0d0'));
  { const cx = 44, cy = 87, cola = Math.round(Math.sin(t * 1.6) * 2), resp = Math.sin(t * 2) > 0.3 ? 1 : 0, g = hex('#3a3a46'), gl = hex('#5a5a68');
    disco(cx, cy - 2 - resp * 0.5, 5, Y.k); disco(cx, cy - 2 - resp * 0.5, 4, g); rect(cx - 5, cy - 2, cx + 5, cy, g); disco(cx - 6, cy - 3, 3, Y.k); disco(cx - 6, cy - 3, 2, gl); pset(cx - 8, cy - 6, Y.k); pset(cx - 5, cy - 6, Y.k); pset(cx - 7, cy - 3, Y.k);
    linea(cx + 5, cy, cx + 9, cy - 3 + cola, Y.k); linea(cx + 5, cy - 1, cx + 8, cy - 4 + cola, g);
    if ((t % 6) < 1.2) { const u = (t % 6) / 1.2; pset(Math.round(cx - 4 + u * 4), Math.round(cy - 10 - u * 6), hex('#f6f2e6')); } }   // la zeta del sueño, en un punto que sube
  for (const [x0, d] of [[2, 1], [64, -1]]) for (let y = 18; y < 98; y++) { const w = 7 + Math.round(Math.sin(t * 0.8 + y * 0.08 + x0) * 1.2 * (y - 18) / 80 + (y > 60 ? 1 : 0)); for (let i = 0; i <= w; i++) { const x = x0 + d * i; pset(x, y, i % 3 === 1 ? hex('#c84a5a') : i % 3 === 2 ? hex('#9a2a3a') : hex('#b03a4a')); } pset(x0 + d * (w + 1), y, Y.k); }
  rect(0, 16, 66, 17, hex('#5a4a3a')); disco(0, 16, 2, Y.oro); disco(66, 16, 2, Y.oro);
  // los cinco libros en su balda, en el orden de o.orden (o.falta: el que se ha llevado alguien)
  const orden = o.orden ?? [0, 1, 2, 3, 4];
  orden.forEach((k, i) => { if (k === o.falta) return; libroJH(R, 72 + i * 7, 80, k, { w: 5, alto: 15 - (k % 2) }); });
  if (o.falta != null) R.poligono([[107, 80], [107, 66], [101, 80]], hex('#2a180e'));
  // el corcho pequeño, la línea de tiempo y el mapa, con sus opciones
  y_tablero(R, t, o, 0.33, 114, 16);
  y_linea(R, t, o.linea ?? 0, 116, 82, 82);
  y_mapa(R, t, o.mapa ?? 0);
  // las agujas del reloj (o.hora)
  { const a1 = ((hora % 12) / 12) * Math.PI * 2 - Math.PI / 2, a2 = ((hora % 1) + t / 3600) * Math.PI * 2 - Math.PI / 2;
    linea(288, 64, Math.round(288 + Math.cos(a1) * 4), Math.round(64 + Math.sin(a1) * 4), Y.k); linea(288, 64, Math.round(288 + Math.cos(a2) * 6), Math.round(64 + Math.sin(a2) * 6), hex('#5a4a3a'));
    const as = (t % 60) / 60 * Math.PI * 2 - Math.PI / 2; pset(Math.round(288 + Math.cos(as) * 6), Math.round(64 + Math.sin(as) * 6), hex('#c8303a')); pset(288, 64, Y.oroS); }
  // la tele: lo que echa, recortado, con su reflejo; el piloto de la consola
  const TV = [224, 92, 300, 120];
  R.recorte(TV);
  if (typeof o.tele === 'function') o.tele(R, t, TV); else y_portada(R, t, o.tele ?? 0, TV);
  R.recorte(null);
  for (let k = 0; k < 2; k++) for (let i = 0; i < 8; i++) pset(230 + k * 14 + i, 112 - i, y_mez(R.pget(230 + k * 14 + i, 112 - i), hex('#ffffff'), 0.25));
  if (noche) R.halo(262, 128, 26, [hex('#262a42'), hex('#2e3450')], 0.6);
  pset(296, 119, Math.floor(t * 1.5) % 2 ? hex('#4ae860') : hex('#2a6a30'));
  // las motas de polvo en la luz de la ventana (tarde) y la luz de la lámpara (noche)
  if (!noche) for (let k = 0; k < 14; k++) { const x = Math.round(70 + h(k, 1, 426) * 90 + Math.sin(t * 0.5 + k) * 4), y = Math.round(40 + ((h(k, 2, 426) * 80 + t * (1.5 + h(k, 3, 426))) % 80)); if (Math.sin(t * 1.3 + k * 2) > -0.2) pset(x, y, hex('#fff0c8')); }
  else R.halo(312, 66, 16, [hex('#5a4a40'), hex('#8a6a40'), hex('#d8b070')], 0.9);
  return { suelo: 170, sofa: { asiento: 126, x: [122, 194], plazas: [[140, 126], [176, 126]] }, estanteria: { balda: 80, x0: 72, paso: 7, libros: orden.map((k, i) => [72 + i * 7, 80]) }, mapa: Y_DISTRITOS.map(([x, y]) => [x, y]), tele: TV, corcho: [114, 16, 198, 76], ventana: [9, 23, 57, 85], reloj: [288, 64], libres: [[10, 66], [214, 304]] };
}

// la línea de tiempo en papel: una flecha con las marcas 10, 50, 74, 75 (o.linea 0–4: cuántas se ven); (x0, y) = su
// izquierda (y es la raya), ancho w
function y_linea(R, t, n, x0, y, w) {
  if (n <= 0) return;
  const { rect, pset } = R, MARCAS = [10, 50, 74, 75], pos = w < 120 ? [0.12, 0.36, 0.6, 0.84] : [0.12, 0.42, 0.68, 0.88];
  rect(x0 - 1, y - 4, x0 + w + 1, y + 13, Y.k); rect(x0, y - 3, x0 + w, y + 12, Y.crema); rect(x0, y + 12, x0 + w, y + 12, hex('#d8d0b8'));
  for (const px of [x0 + 2, x0 + w - 2]) { R.disco(px, y - 2, 1.5, hex('#c8303a')); }
  rect(x0 + 2, y, x0 + w - 4, y, hex('#5a4a3a')); R.poligono([[x0 + w - 4, y - 2], [x0 + w - 1, y], [x0 + w - 4, y + 2]], hex('#5a4a3a'));
  for (let k = 0; k < Math.min(4, Math.ceil(n)); k++) { const x = Math.round(x0 + pos[k] * w), f = y_cl(n - k), c = [hex('#c8303a'), Y.oroS, hex('#e85a2a'), hex('#e85a2a')][k];
    rect(x, y - 2, x, y + 2, c); if (f > 0.5) R.numero(String(MARCAS[k]), x - 6, y + 11, { color: c, sombra: false }); }
}

// lo que lleva el corcho (pistas, notas «?», hilo rojo y relleno), a escala e (1 el de cerca, 0.33 el pequeño del
// cuarto), con el origen del tablero en (ox, oy)
const Y_PINES = [[52, 22], [128, 26], [200, 22]];   // las tres chinchetas de las pistas (en el corcho grande, origen 14, 16)

function y_tablero(R, t, o, e, ox, oy) {
  const { rect, pset, linea } = R, P = (x, y) => [Math.round(ox + x * e), Math.round(oy + y * e)];
  const pistas = o.pistas ?? 0, hilo = y_cl(o.hilo ?? 0);
  if (e < 1) {   // el pequeño: tarjetas de colores, notas y las tres chinchetas
    for (const [x, y, w, hh, c] of [[10, 18, 50, 46, '#f4f0e8'], [88, 26, 76, 32, '#e8e4dc'], [176, 16, 50, 44, '#f4f0e8'], [24, 92, 40, 40, '#f0e070'], [100, 96, 40, 40, '#f0a0c0'], [180, 92, 40, 40, '#a0e0f0'], [150, 70, 30, 20, '#ffffff']]) {
      const [a, b] = P(x, y), [c2, d] = P(x + w, y + hh); rect(a, b, c2, d, Y.k); rect(a + 1, b + 1, c2 - 1, d - 1, hex(c)); }
    { const [a, b] = P(22, 26); PIEZAS_JH.broche(R, a + 8, b + 10, {}); }
    { const [a, b] = P(96, 32); rect(a + 1, b + 1, a + 4, b + 6, hex('#5a6a8a')); rect(a + 6, b + 2, a + 10, b + 2, hex('#7a7a90')); rect(a + 13, b + 1, a + 16, b + 6, hex('#5a6a8a')); rect(a + 18, b + 2, a + 22, b + 2, hex('#7a7a90')); }
    { const [a, b] = P(186, 22); linea(a + 2, b + 10, a + 12, b + 2, hex('#6a4a2a')); pset(a + 12, b + 2, hex('#c8c8d0')); pset(a + 11, b + 1, hex('#c8c8d0')); pset(a + 2, b + 10, hex('#c8303a')); }
    for (let k = 0; k < 3; k++) { const [a, b] = P([28, 104, 184][k], 96), on = pistas > k; R.icono('?', a + 3, b + 2, on ? hex('#c8303a') : hex('#8a8a90'), on ? hex('#ffe890') : Y.k, 1); }
  }
  // las chinchetas de las pistas, que se encienden y laten
  const pines = Y_PINES.map(([x, y]) => P(x, y));
  pines.forEach(([x, y], k) => { const on = pistas > k, f = y_cl(pistas - k);
    if (on) R.halo(x, y, (e < 1 ? 5 : 10) + Math.sin(t * 5 + k) * (e < 1 ? 1 : 2), [hex('#c87a2a'), hex('#f0b040'), hex('#ffe890')], 1.1 * f);
    R.disco(x, y, e < 1 ? 1.6 : 3.2, Y.k); R.disco(x, y, e < 1 ? 1 : 2.4, on ? hex('#ff4a4a') : hex('#a83a3a')); pset(x - (e < 1 ? 0 : 1), y - (e < 1 ? 1 : 1), on ? hex('#ffd0d0') : hex('#d87a7a')); });
  // el hilo rojo, que va de chincheta en chincheta (o.hilo 0–1), con su comba
  if (hilo > 0) { const tramos = [[pines[0], pines[1]], [pines[1], pines[2]]], n = 60;
    for (let s = 0; s < 2; s++) { const [[ax, ay], [bx, by]] = tramos[s], fin = y_cl(hilo * 2 - s); if (fin <= 0) continue;
      let px = ax, py = ay; for (let i = 1; i <= Math.round(n * fin); i++) { const u = i / n, x = ax + (bx - ax) * u, y = ay + (by - ay) * u + Math.sin(u * Math.PI) * (e < 1 ? 4 : 12) + Math.sin(t * 2) * 0.4 * Math.sin(u * Math.PI); linea(px, py, Math.round(x), Math.round(y), hex('#d8202a')); if (e >= 1) linea(px, py + 1, Math.round(x), Math.round(y) + 1, hex('#8a1018')); px = Math.round(x); py = Math.round(y); } } }
}

function y_corcho(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R, noche = o.luz === 'noche', OX = 14, OY = 16;
  y_fijo(R, 'corcho' + (noche ? 'N' : 'T'), () => {
    const B = R.buf;
    // la pared alrededor, tranquila (de rayas suaves), con la luz que cae
    for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const raya = (x % 10) < 5; let c = noche ? (raya ? hex('#2a3048') : hex('#262a42')) : (raya ? hex('#7a9a8e') : hex('#749488')); if (y_b4(x, y) < y_cl(0.5 - Math.hypot(x - 140, y - 60) / 300)) c = y_mez(c, noche ? hex('#f0c070') : hex('#ffd0a0'), 0.2); B[y * 320 + x] = c; }
    // el marco de madera del corcho y el corcho con su grano
    rect(OX - 4, OY - 4, 274, 148, Y.k); rect(OX - 3, OY - 3, 273, 147, hex('#8a5e3a')); rect(OX - 3, OY - 3, 273, OY - 2, hex('#b07a48')); rect(OX - 3, OY - 3, OX - 2, 147, hex('#a06a3a')); rect(272, OY - 3, 273, 147, hex('#6a4428'));
    for (let y = OY; y <= 144; y++) for (let x = OX; x <= 270; x++) { const n = h(x, y, 430); B[y * 320 + x] = n < 0.12 ? hex('#a07446') : n < 0.2 ? hex('#c89c6a') : n < 0.23 ? hex('#8a5e36') : y_b4(x, y) < 0.3 ? hex('#b4865a') : hex('#b88a5a'); }
    for (let y = OY; y <= 144; y++) for (let x = OX; x <= OX + 4; x++) B[y * 320 + x] = y_mez(B[y * 320 + x], Y.k, 0.25 - (x - OX) * 0.05);
    for (let x = OX; x <= 270; x++) for (let y = OY; y <= OY + 3; y++) B[y * 320 + x] = y_mez(B[y * 320 + x], Y.k, 0.2 - (y - OY) * 0.05);
    // el relleno: una hoja de calendario con 11 y 20, recortes de periódico (barras), una foto de montes, una entrada de cine
    const tarjeta = (x0, y0, x1, y1, c, sombra = true) => { if (sombra) rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, hex('#7a5232')); rect(x0, y0, x1, y1, Y.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
    { const cx = 228, cy = 30; tarjeta(cx, cy, cx + 40, cy + 36, hex('#ffffff')); rect(cx + 1, cy + 1, cx + 39, cy + 10, hex('#c8303a')); for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) rect(cx + 3 + i * 5, cy + 13 + j * 5, cx + 4 + i * 5, cy + 14 + j * 5, hex('#b0b0c0'));
      R.disco(cx + 19, cy + 28, 4.5, hex('#c8303a')); R.disco(cx + 19, cy + 28, 3.5, hex('#ffffff')); rect(cx + 17, cy + 27, cx + 21, cy + 29, hex('#e8b830'));
      R.numero('11', cx + 4, cy + 9, { color: hex('#ffffff'), sombra: false }); rect(cx + 20, cy + 5, cx + 21, cy + 6, hex('#ffe890')); R.numero('20', cx + 25, cy + 9, { color: hex('#ffe890'), sombra: false }); R.disco(cx + 17, cy, 1.5, hex('#3a8ae8')); }
    tarjeta(22, 104, 62, 140, hex('#e8e4d4')); rect(24, 106, 60, 112, hex('#3a3a46')); for (let j = 115; j < 138; j += 3) rect(24, j, 24 + 30 + ((j * 7) % 6), j, hex('#8a8a96')); rect(42, 118, 58, 130, hex('#a8a8b4')); poligono([[43, 129], [50, 120], [57, 129]], hex('#6a6a78'));
    tarjeta(222, 98, 262, 130, hex('#f4f0e8')); for (let y = 100; y < 124; y++) for (let x = 224; x <= 260; x++) pset(x, y, y < 110 ? (y_b4(x, y) < (y - 100) / 10 ? hex('#a8d0f0') : hex('#7ab0e0')) : y < 118 ? hex('#6a8ab0') : hex('#4a7a4a'));
    poligono([[224, 118], [236, 104], [246, 116], [254, 108], [260, 118]], hex('#5a6a8a')); poligono([[234, 106], [236, 104], [238, 106]], hex('#ffffff'));
    tarjeta(140, 122, 182, 138, hex('#f0c060')); for (let y = 123; y < 138; y += 2) pset(150, y, Y.k); R.numero('74', 155, 135, { color: hex('#6a3a1a'), sombra: false });
    tarjeta(188, 120, 214, 142, hex('#a0e0f0')); for (let j = 126; j < 140; j += 4) rect(192, j, 210 - (j % 8), j, hex('#4a6a7a'));
    tarjeta(70, 122, 92, 142, hex('#a8e890')); for (let j = 128; j < 140; j += 4) rect(73, j, 89 - (j % 6), j, hex('#3a6a3a'));
    // las tarjetas de las tres pistas: la foto del broche, el sitio de los carnés y la tarjeta de la flecha
    tarjeta(30, 26, 76, 76, hex('#f4f0e8')); for (let y = 30; y <= 66; y++) for (let x = 34; x <= 72; x++) pset(x, y, y_b4(x, y) < 0.3 ? hex('#2a2a3a') : hex('#22222e'));
    tarjeta(178, 26, 224, 76, hex('#f4f0e8')); for (let j = 62; j < 72; j += 3) rect(184, j, 216 - (j % 9), j, hex('#a8a8b4'));
  });
  // la foto del broche, que brilla
  R.halo(53, 48, 14, [hex('#2e2a22'), hex('#3a3220')], 1); PIEZAS_JH.broche(R, 53, 68, { s: 3, brillo: Math.sin(t * 2.5) > 0.3 });
  // los dos carnés con el mismo apellido (o.carnes: el segundo llega desde la derecha)
  const carne = (x, y) => { rect(x, y, x + 30, y + 20, Y.k); rect(x + 1, y + 1, x + 29, y + 19, hex('#e8eef4')); rect(x + 1, y + 1, x + 29, y + 4, hex('#5a7aa8')); rect(x + 3, y + 7, x + 11, y + 17, hex('#a8b4c8')); disco(x + 7, y + 10, 2, hex('#5a6a8a')); rect(x + 5, y + 13, x + 9, y + 17, hex('#5a6a8a'));
    rect(x + 14, y + 8, x + 26, y + 9, hex('#c8303a')); rect(x + 14, y + 12, x + 24, y + 12, hex('#8a8aa0')); rect(x + 14, y + 15, x + 22, y + 15, hex('#8a8aa0')); };
  carne(96, 36);
  { const c = y_cl(o.carnes ?? 1), x = Math.round(132 + (1 - c) * 140), y = Math.round(36 - Math.sin(c * Math.PI) * 6); if (x < 270) { R.recorte([OX, OY, 270, 144]); carne(x, y); R.recorte(null); } if (c >= 1) { rect(127, 44, 131, 45, hex('#c8303a')); } }
  // la tarjeta de la flecha
  { const fx = 201, fy = 58; R.halo(fx, fy - 12, 12, [hex('#ece6d6'), hex('#e4dccc')], 0.8); linea(186, 64, 214, 34, hex('#6a4a2a')); linea(187, 64, 215, 34, hex('#8a6a3a')); R.poligono([[211, 33], [218, 30], [215, 37]], hex('#a8acb8')); linea(186, 64, 189, 68, hex('#c8303a')); linea(188, 63, 191, 67, hex('#c8303a')); }
  // las notas con «?», que se encienden una a una con su pista
  for (let k = 0; k < 3; k++) { const x = [38, 112, 186][k], y = 84, on = (o.pistas ?? 0) > k, f = y_cl((o.pistas ?? 0) - k), lev = on ? Math.round(Math.sin(t * 3 + k) * 0.6) : 0;
    rect(x + 2, y + 2, x + 22, y + 22, hex('#7a5232')); rect(x, y + lev, x + 20, y + 20 + lev, Y.k); rect(x + 1, y + 1 + lev, x + 19, y + 19 + lev, on ? hex('#fff0a0') : hex('#e8e0b8'));
    if (on) R.halo(x + 10, y + 10, 12, [hex('#e8c860'), hex('#f8e090')], 0.6 * f);
    R.icono('?', x + 5, y + 4 + lev, on ? hex('#c8303a') : hex('#9a9a8a'), on ? hex('#6a1a1a') : hex('#c8c0a0'), 2); disco(x + 10, y + lev, 1.5, [hex('#3a8ae8'), hex('#4ab84a'), hex('#c84ae0')][k]); }
  // la línea de tiempo abajo, las chinchetas y el hilo
  y_linea(R, t, o.linea ?? 0, 70, 126, 144);
  y_tablero(R, t, o, 1, OX, OY);
  // el escritorio: caja de chinchetas, carrete de hilo rojo, tijeras, bote de lápices y el móvil que se enciende
  for (let y = 156; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 156 ? hex('#c89a68') : y < 170 ? ((h(x >> 3, y, 431) < 0.2) ? hex('#9a6a42') : hex('#a8744a')) : y === 170 ? hex('#5a3a22') : hex('#7a5232'));
  for (let x = 0; x < 320; x++) pset(x, 155, Y.k);
  { rect(20, 150, 46, 162, Y.k); rect(21, 151, 45, 161, hex('#c8d8e8')); for (let k = 0; k < 9; k++) disco(24 + (k % 5) * 5, 154 + (k > 4 ? 4 : 0), 1.2, [hex('#e83a3a'), hex('#3a8ae8'), hex('#4ab84a'), hex('#e8b830')][k % 4]); rect(21, 151, 45, 151, hex('#ffffff')); }
  { const g = (t * 0.6) % 1; disco(70, 156, 7, Y.k); disco(70, 156, 6, hex('#c8a060')); disco(70, 156, 4.5, hex('#c8202a')); for (let k = 0; k < 3; k++) pset(66 + k * 3, 154 + k, hex('#e84a4a')); disco(70, 156, 1.5, hex('#8a6a40'));
    linea(76, 158, 92, 162 + Math.round(Math.sin(t * 2) * 1), hex('#c8202a')); linea(92, 162 + Math.round(Math.sin(t * 2)), 104, 160, hex('#c8202a')); if (g < 0.1) pset(84, 160, hex('#ff8080')); }
  { linea(244, 160, 262, 152, hex('#8a8a96')); linea(244, 161, 262, 156, hex('#a8acb8')); R.disco(242, 162, 3, Y.k); R.disco(242, 162, 2, hex('#c8303a')); R.disco(246, 165, 3, Y.k); R.disco(246, 165, 2, hex('#c8303a')); }
  { rect(282, 128, 300, 160, Y.k); rect(283, 129, 299, 160, hex('#3a6ab8')); rect(283, 129, 285, 160, hex('#5a8ad8')); for (const [x, c] of [[286, '#e8b830'], [290, '#c8303a'], [294, '#4ab84a']]) { rect(x, 116 + (x % 5), x + 2, 128, hex(c)); pset(x + 1, 115 + (x % 5), Y.k); } }
  { const on = (t % 8) < 2.4; rect(196, 158, 222, 166, Y.k); rect(197, 159, 221, 165, on ? hex('#4a8ae8') : hex('#1a1a26')); if (on) { rect(199, 161, 209, 161, hex('#c8e0ff')); rect(199, 163, 205, 163, hex('#a8c8f0')); R.halo(209, 162, 12, [hex('#8a7a6a'), hex('#9a8a8a')], 0.5); } }
  return { suelo: 162, mesa: 156, pistas: Y_PINES.map(([x, y]) => [x + OX, y + OY]), notas: [[48, 94], [122, 94], [196, 94]], carnes: [[96, 36], [132, 36]], broche: [53, 50], flecha: [201, 48], calendario: [228, 30, 268, 66], linea: [70, 126, 214], libres: [[100, 230]] };
}

// la mesita baja del cuarto, por delante de los actores: tablero con veta, el bol de palomitas, el mando y la taza que humea
function y_mesita(R, t, o) {
  const { rect, pset, disco } = R, noche = o.luz === 'noche', sombra = (c) => noche ? y_mez(c, hex('#1a1426'), 0.35) : c;
  rect(124, 152, 194, 158, Y.k); rect(125, 153, 193, 156, sombra(hex('#b07a48'))); rect(125, 153, 193, 153, sombra(hex('#d09a68'))); for (let k = 0; k < 4; k++) rect(130 + k * 16, 154 + (k & 1), 138 + k * 16, 154 + (k & 1), sombra(hex('#8a5a32')));
  rect(125, 157, 193, 158, sombra(hex('#6a4428'))); for (const x of [128, 188]) { rect(x, 158, x + 2, 172, Y.k); rect(x + 1, 158, x + 1, 171, sombra(hex('#8a5a32'))); }
  rect(130, 166, 190, 167, sombra(hex('#7a4a28')));
  // el bol de palomitas
  { const x = 146, y = 152; R.poligono([[x - 8, y - 5], [x + 8, y - 5], [x + 5, y], [x - 5, y]], Y.k); R.poligono([[x - 7, y - 4], [x + 7, y - 4], [x + 4, y - 1], [x - 4, y - 1]], sombra(hex('#3a8ae8')));
    for (let i = -7; i <= 7; i++) { const a = Math.round(Math.abs(Math.sin(i * 1.9)) * 1.5); for (let j = 0; j <= a; j++) pset(x + i, y - 6 - j, sombra((i + j) % 3 ? Y.crema : hex('#f0d080'))); } }
  // el mando, con su piloto
  rect(162, 150, 174, 152, Y.k); rect(163, 150, 173, 151, sombra(hex('#2a2a32'))); pset(165, 150, Math.floor(t * 2) % 3 === 0 ? hex('#ff4040') : hex('#8a2a2a'));
  // la taza que humea
  { const x = 182, y = 152; rect(x - 3, y - 7, x + 3, y, Y.k); rect(x - 2, y - 6, x + 2, y, sombra(hex('#e8e4dc'))); rect(x - 2, y - 6, x + 2, y - 6, sombra(hex('#6a3a1a'))); rect(x + 4, y - 5, x + 5, y - 2, Y.k);
    for (let k = 0; k < 3; k++) { const u = ((t * 0.7 + k / 3) % 1), sx = Math.round(x + Math.sin(u * 6 + k) * 1.5), sy = Math.round(y - 9 - u * 12); if (u < 0.85) pset(sx, sy, y_mez(hex('#ffffff'), noche ? hex('#2a2e48') : hex('#a8b8b0'), u)); } }
}

// el búfer del pan (uno por lienzo) y el color «vacío» con que se borra
const Y_VACIO = 0x01020304;

const y_PAN = new WeakMap();

function y_bufPan(R) { let b = y_PAN.get(R); if (!b) { b = R.nuevo(); b.fill(Y_VACIO); y_PAN.set(R, b); } return b; }

// el reloj, cámara general (capa fija): la nave a oscuras donde flota el holograma. El techo con dos cerchas y dos focos
// colgados, la galería alta con su losa y sus postes, la pared de paneles remachados con dos pantallas grandes (una a
// cada lado, medio tapadas por el holograma), la columna y la pared lisa y oscura de la esquina de Atom, el armario de
// servidores de la derecha, la fila de consolas del fondo con sus operadores, las consolas bajas de los lados y el suelo
// pulido en perspectiva, con la rejilla de luz y los cables que llegan al aro proyector
function c_relojSala(R) {
  const { rect, pset, linea, disco } = R, K = v_C;
  // el techo y la pared: degradado tramado, de muro0 arriba a muro2 abajo
  for (let y = 0; y <= 138; y++) { const f = Math.min(1, y / 120) * 2; for (let x = 0; x < 320; x++) { const i = Math.min(1, Math.floor(f)), g = f - i; pset(x, y, g > r_um(x, y) ? [K.muro0, K.muro1, K.muro2][i + 1] : [K.muro0, K.muro1, K.muro2][i]); } }
  // las dos cerchas del techo (vigas con su diagonal en zigzag), tenues, y hasta la columna de la derecha
  for (const [ya, yb] of [[3, 9], [12, 18]]) { rect(0, ya, 268, ya, K.metal0); rect(0, yb, 268, yb, K.metal0); rect(0, yb + 1, 268, yb + 1, K.muro0);
    for (let x = 0; x < 264; x += 12) { linea(x, ya, x + 6, yb, K.metal0); linea(x + 6, yb, x + 12, ya, K.metal0); }
    for (let x = 4; x < 268; x += 3) if (h(x, ya, 301) < 0.3) pset(x, ya, K.muro3); }
  // los dos focos colgados: cable, cuerpo con su luz a la izquierda y el cono de luz tramado que baja
  for (const fx of [96, 226]) { rect(fx, 19, fx, 23, K.metal1); rect(fx - 3, 24, fx + 3, 27, K.metal1); rect(fx - 3, 24, fx - 2, 27, K.metal3); rect(fx - 2, 28, fx + 2, 28, K.holo3);
    for (let y = 29; y < 74; y++) { const w = Math.round(3 + (y - 29) * 0.42); for (let x = fx - w; x <= fx + w; x++) if (r_um(x, y) < 0.22 * (1 - (y - 29) / 46) * (1 - Math.abs(x - fx) / (w + 1) * 0.6)) pset(x, y, v_mez(R.pget(x, y), K.holo1, 0.5)); } }
  // la galería alta: la pared del fondo con ventanucos de luz, la losa (canto de luz y sombra debajo)
  for (let x = 6; x < 262; x += 22) { rect(x, 24, x + 12, 30, K.muro0); rect(x + 1, 25, x + 11, 29, K.pant0); rect(x + 1, 25, x + 11, 25, K.holo0); if (h(x, 1, 302) < 0.5) for (let i = x + 2; i < x + 11; i += 2) pset(i, 27, K.pant1); }
  rect(0, 41, 268, 43, K.metal1); rect(0, 41, 268, 41, K.metal3); rect(0, 44, 268, 45, K.muro0); for (let x = 0; x < 268; x += 8) pset(x + 3, 42, K.metal0);
  // la columna de la derecha (luz a la izquierda, remaches) y la esquina de Atom: paneles oscuros y tranquilos
  rect(268, 0, 276, 138, K.metal0); rect(268, 0, 268, 138, K.metal2); rect(276, 0, 276, 138, K.muro0); for (let y = 6; y < 138; y += 12) pset(270, y, K.metal3);
  for (let y = 0; y < 48; y++) for (let x = 277; x < 320; x++) pset(x, y, v_mez(R.pget(x, y), K.muro0, 0.35));
  for (const x of [292, 308]) rect(x, 0, x, 47, v_mez(K.muro0, K.muro1, 0.6));
  // la pared: paneles remachados con juntas, moteado y la moldura de luz baja
  for (let x = 0; x < 268; x += 30) { rect(x, 46, x, 112, K.muro0); rect(x + 1, 46, x + 1, 112, K.muro3); for (const y of [49, 74, 98]) { pset(x + 4, y, K.metal3); pset(x + 26, y, K.metal3); } }
  for (const y of [72, 96]) { rect(0, y, 267, y, K.muro0); rect(0, y + 1, 267, y + 1, v_mez(K.muro2, K.muro3, 0.5)); }
  for (let y = 46; y <= 112; y++) for (let x = 0; x < 268; x++) if (h(x, y, 303) < 0.04) pset(x, y, K.muro3); else if (h(x, y, 304) < 0.03) pset(x, y, K.muro0);
  // las dos pantallas grandes de la pared, con su marco y sus tornillos (el contenido se anima en c_relojVida)
  for (const [x0, y0, x1, y1] of [[6, 48, 60, 78], [220, 48, 264, 78]]) { rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, K.k); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K.metal1); rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, K.metal3);
    rect(x0, y0, x1, y1, K.pant0); for (const [a, b] of [[x0 - 1, y0 - 1], [x1 + 1, y0 - 1], [x0 - 1, y1 + 1], [x1 + 1, y1 + 1]]) pset(a, b, K.metal4); rect(Math.round((x0 + x1) / 2) - 4, y1 + 3, Math.round((x0 + x1) / 2) + 4, y1 + 4, K.metal1); }
  // el armario de servidores de la derecha (bajo la esquina de Atom, que queda despejada)
  rect(282, 52, 318, 134, K.k); rect(283, 53, 317, 134, K.metal0); rect(283, 53, 317, 53, K.metal2);
  for (let y = 56; y < 132; y += 6) { rect(285, y, 315, y + 4, K.metal1); rect(285, y, 315, y, K.metal2); for (let x = 300; x < 314; x += 2) pset(x, y + 2, K.k); rect(286, y + 1, 288, y + 3, K.muro1); }
  // la fila de consolas del fondo: el mueble, su canto de luz, las pantallitas y las sillas
  rect(0, 112, 267, 138, K.muro0); rect(0, 112, 267, 113, K.metal2); rect(0, 112, 267, 112, K.metal4);
  for (let x = 2; x < 266; x += 22) { rect(x, 116, x + 18, 126, K.metal0); rect(x + 1, 117, x + 17, 117, K.muro3); rect(x + 2, 119, x + 9, 124, K.pant0); for (let i = x + 11; i < x + 17; i += 2) pset(i, 121, K.metal2); rect(x, 128, x + 18, 128, K.metal0); }
  rect(277, 134, 319, 138, K.metal0); rect(277, 134, 319, 134, K.metal2);
  // el suelo pulido: degradado tramado, juntas en fuga hacia (160, 40), juntas transversales y moteado
  for (let y = 139; y <= 179; y++) { const f = (y - 139) / 40; for (let x = 0; x < 320; x++) pset(x, y, f > r_um(x, y) ? K.suelo0 : K.suelo2); }
  rect(0, 139, 319, 139, K.metal1);
  for (let i = -14; i <= 14; i++) linea(160 + i * 22, 139, Math.round(160 + i * 22 * 1.9), 179, K.suelo1);
  for (const y of [143, 149, 157, 167]) rect(0, y, 319, y, v_mez(K.suelo1, K.muro2, 0.35));
  for (let y = 140; y <= 179; y++) for (let x = 0; x < 320; x++) if (h(x, y, 305) < 0.025) pset(x, y, K.muro2);
  // los cables que llegan al aro (sombra y brillo) y la rejilla de luz del suelo alrededor
  for (const [x0, x1] of [[0, 92], [319, 228]]) for (let k = 0; k < 2; k++) { const ya = 150 + k * 9, yb = 160 + k * 4; linea(x0, ya + 1, x1, yb + 1, K.k); linea(x0, ya, x1, yb, K.metal2); for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x += 7) { const y = Math.round(ya + (yb - ya) * (x - x0) / (x1 - x0)); pset(x, y - 1, K.metal3); } }
  for (let y = -14; y <= 14; y++) { const w = Math.round(104 * Math.sqrt(Math.max(0, 1 - (y / 14.5) ** 2))); for (let x = -w; x <= w; x++) if (((x + 160) % 6 === 0 || (y + 162) % 3 === 0) && Math.hypot(x / 104, y / 14) > 0.78 && r_um(x + 160, y + 162) < 0.5) pset(160 + x, 162 + y, v_mez(R.pget(160 + x, 162 + y), K.holo0, 0.7)); }
  // las consolas bajas de los dos lados, en primer término (tapa inclinada, pantallita, teclas y zócalo)
  for (const [x0, x1] of [[0, 40], [284, 319]]) { rect(x0, 146, x1, 166, K.metal1); rect(x0, 146, x1, 147, K.metal3); rect(x0, 148, x1, 149, K.metal2); rect(x0, 163, x1, 166, K.metal0);
    rect(x0 + 4, 151, x0 + 18, 159, K.k); rect(x0 + 5, 152, x0 + 17, 158, K.pant0); for (let x = x0 + 22; x < x1 - 2; x += 4) { rect(x, 152, x + 2, 153, K.metal2); rect(x, 156, x + 2, 157, K.metal2); }
    rect(x0, 167, x1, 168, v_mez(K.k, K.suelo1, 0.4)); }
}

// la vida de la nave del reloj, en cada fotograma: los operadores que pasan por la galería tras la barandilla, las
// pantallas grandes (una gráfica que corre y un radar con los doce sectores), los pilotos del armario y de las consolas,
// los operadores sentados del fondo, las motas en la luz de los focos y el reflejo del holograma en el suelo
function c_relojVida(R, t, cx) {
  const { rect, pset } = R, K = v_C;
  // la galería: tres siluetas que la cruzan a su paso (recortadas a la galería) y la barandilla por delante
  for (let k = 0; k < 3; k++) { const v = [5, 3.6, 4.4][k], d = k === 1 ? -1 : 1, L = 300, x = d > 0 ? ((t * v + k * 97) % L) - 16 : 280 - ((t * v + k * 97) % L);
    if (x > 2 && x < 262) r_persona(R, x, 40, k + 2, t, { anda: true, dir: d, silueta: k === 1 ? K.metal3 : K.metal2 }); }
  rect(0, 33, 268, 33, K.metal2); rect(0, 34, 268, 34, K.muro0); rect(0, 37, 268, 37, K.metal1); for (let x = 2; x < 268; x += 10) rect(x, 33, x, 40, K.metal1);
  // la pantalla de la izquierda: rejilla, una gráfica que corre y barras que suben y bajan
  for (let x = 7; x < 60; x++) { if (x % 8 === 0) for (let y = 49; y < 78; y += 2) pset(x, y, K.pant1);
    const y = Math.round(58 + Math.sin(x * 0.22 + t * 2.4) * 5 + Math.sin(x * 0.07 - t) * 2); pset(x, y, K.verde); pset(x, y + 1, K.verdeS); }
  for (let i = 0; i < 6; i++) { const al = Math.round(3 + (0.5 + 0.5 * Math.sin(t * 1.7 + i * 1.3)) * 7); rect(10 + i * 8, 77 - al, 14 + i * 8, 77, i === 3 ? K.ambar : K.holo1); rect(10 + i * 8, 77 - al, 14 + i * 8, 77 - al, K.holo3); }
  // la pantalla de la derecha: el radar con los doce sectores y la aguja que barre
  { const rx = 252, ry = 58, a = t * 1.6; for (let k = 0; k < 12; k++) { const b = k * Math.PI / 6; pset(Math.round(rx + Math.sin(b) * 9), Math.round(ry - Math.cos(b) * 9), K.holo1); }
    for (let r = 1; r < 10; r++) { const x = Math.round(rx + Math.sin(a) * r), y = Math.round(ry - Math.cos(a) * r); pset(x, y, K.holo3); const x2 = Math.round(rx + Math.sin(a - 0.25) * r), y2 = Math.round(ry - Math.cos(a - 0.25) * r); pset(x2, y2, K.holo0); }
    R.disco(rx, ry, 2, K.holo2); for (let k = 0; k < 3; k++) { const b = h(k, 7, 306) * 6.28, r = 3 + h(k, 8, 306) * 5; if (Math.sin(t * 4 + k * 2) > 0) pset(Math.round(rx + Math.sin(b) * r), Math.round(ry - Math.cos(b) * r), K.ambar); }
    for (let y = 50; y < 78; y += 3) pset(223 + Math.floor(t * 9 + y) % 4, y, K.pant1); }
  // los pilotos del armario y de las consolas
  for (let y = 56; y < 132; y += 6) for (let i = 0; i < 3; i++) if (Math.sin(t * (2 + i) + y * 0.7 + i) > 0.2) pset(287 + i * 4, y + 2, [K.verde, K.holo2, K.ambar][i]);
  for (let x = 2; x < 266; x += 22) { const on = Math.sin(t * 1.8 + x * 0.3) > 0; rect(x + 3, 120, x + 8, 123, on ? K.pant1 : K.pant0); pset(x + 3 + Math.floor(t * 3 + x) % 6, 121, K.holo2); }
  for (const [x0] of [[0], [284]]) { for (let i = 0; i < 4; i++) { const y = Math.round(156 - (0.5 + 0.5 * Math.sin(t * 2.2 + i + x0)) * 3); rect(x0 + 6 + i * 3, y, x0 + 7 + i * 3, 158, i % 2 ? K.verde : K.holo2); }
    if (Math.sin(t * 5 + x0) > 0) pset(x0 + 24, 155, K.rojo); }
  // los operadores sentados del fondo (cabeza y hombros sobre el canto de las consolas, que giran de vez en cuando)
  for (const [x, k] of [[12, 0], [36, 1], [252, 2], [290, 3]]) { const g = Math.sin(t * 0.7 + k * 2.1) > 0.6 ? 1 : 0, yb = x > 270 ? 134 : 112;
    rect(x - 4, yb - 6, x + 4, yb - 1, K.metal0); R.disco(x + g, yb - 9, 2.6, K.metal0); pset(x - 4, yb - 5, K.muro3); pset(x + g - 2, yb - 11, K.muro3); }
  // las motas en el cono de luz de los focos
  for (let k = 0; k < 10; k++) { const fx = k < 5 ? 96 : 226, y = 30 + ((t * (3 + h(k, 1, 307) * 3) + h(k, 2, 307) * 44) % 42), x = Math.round(fx + Math.sin(t * 0.8 + k * 1.7) * (2 + (y - 29) * 0.3)); if (Math.sin(t * 3 + k) > -0.3) pset(x, Math.round(y), K.holo2); }
  // el reflejo del holograma en el suelo pulido: verde y azul tramados, que tiemblan
  for (let y = 140; y < 152; y++) { const w = Math.round(98 - (y - 140) * 2.5); for (let x = cx - w; x <= cx + w; x++) { const q = Math.sin(x * 0.3 + y * 1.7 + t * 3); if (((x + y) & 1) && q > -0.2 && h(x, y, 308) < 0.55 - (y - 140) / 26) pset(x, y, v_mez(R.pget(x, y), Math.abs(x - cx) < w * 0.45 ? K.holo1 : K.selvaD, 0.45)); } }
}

// el reloj, cámara 'sector' (capa fija): lo que rodea el holograma (la sala a oscuras con la rejilla de proyección que
// se pierde, más allá del campo de fuerza), el canto de la mesa holográfica con su panel y el suelo de baldosas pulidas
function c_sectorFondo(R) {
  const { rect, pset, linea } = R, K = v_C;
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const f = y / 150; let c = f > r_um(x, y) ? K.muro2 : K.muro1; if ((x % 10 === 0 || y % 10 === 0) && ((x + y) & 1)) c = v_mez(c, K.holo1, 0.5); if (h(x, y, 311) < 0.03) c = K.muro3; pset(x, y, c); }
  // el canto de la mesa: filo de luz, el panel con rejillas de ventilación, tornillos y la sombra de abajo
  rect(0, 150, 319, 151, K.holo3); rect(0, 152, 319, 162, K.metal1); rect(0, 152, 319, 152, K.metal3); rect(0, 161, 319, 162, K.metal0);
  for (let x = 4; x < 320; x += 16) { rect(x, 155, x + 10, 159, K.metal0); rect(x, 155, x + 10, 155, K.k); pset(x - 2, 154, K.metal3); pset(x - 2, 160, K.metal3); for (let i = x + 5; i < x + 10; i += 2) rect(i, 156, i, 158, K.metal2); }
  // el suelo: baldosas pulidas en perspectiva, juntas transversales, moteado y el reflejo azul del holograma
  for (let y = 163; y <= 179; y++) { const f = (y - 163) / 16; for (let x = 0; x < 320; x++) pset(x, y, f > r_um(x, y) ? K.suelo0 : K.suelo2); }
  rect(0, 163, 319, 163, K.k);
  for (let i = -12; i <= 12; i++) linea(160 + i * 28, 163, Math.round(160 + i * 34), 179, K.suelo1);
  for (const y of [166, 171, 177]) rect(0, y, 319, y, v_mez(K.suelo1, K.muro2, 0.35));
  for (let y = 164; y <= 179; y++) for (let x = 0; x < 320; x++) { if (h(x, y, 312) < 0.03) pset(x, y, K.muro2); else if (((x + y) & 1) && h(x, y, 313) < 0.35 - (y - 164) / 40) pset(x, y, v_mez(R.pget(x, y), K.holo0, 0.6)); }
  // un cable que corre por el suelo hasta la mesa
  for (let x = 0; x < 320; x++) { const y = Math.round(173 + Math.sin(x * 0.03) * 2); pset(x, y, K.metal1); pset(x, y + 1, K.k); if (x % 9 === 0) pset(x, y, K.metal3); }
}

// las torres y los montes que se ven por una ventana (x0..x1, y0..y1), recortados a su hueco; k cambia la ciudad (para
// una capa fija: la dibuja k_ciudadVentana de día y k_ciudadNoche de noche)
function k_torresCiudad(R, x0, y0, x1, y1, k) {
  R.recorte([x0, y0, x1, y1]);
  const b = y1, alto = y1 - y0;
  k_montes(R, x0, x1, y0 + alto * 0.5, alto * 0.25, b, [K.monte0, K.monte1, K.monte2, K.monte2], k + 2);
  const TC = [[hex('#ffb4dc'), K.rosa, K.rosaS, K.rosaD], [K.turqL, K.turq, K.turqS, K.turqD], [K.moradoL, K.morado, K.moradoS, K.moradoD], [K.oroL, hex('#f8e0a0'), K.oroS, K.oroD], [hex('#a8e8ff'), K.cristal, K.cristalS, K.cristalD]];
  const FO = ['cintura', 'gota', 'recta'], RE = ['cupula', 'aguja', 'curva', 'anillo', 'plano'];
  for (let x = x0 - 6, i = 0; x < x1; i++) { const w = 8 + Math.floor(h(i, 1, 80 + k) * 8), top = Math.round(y0 + alto * (0.42 + h(i, 2, 80 + k) * 0.3)); const c = TC[i % 5].map((v) => k_mezcla(v, K.monte1, 0.35)); k_torre(R, x, x + w, top, b, FO[i % 3], 'plano', c, i + k); x += w + 4; }
  for (let x = x0 - 4, i = 0; x < x1; i++) { const w = 14 + Math.floor(h(i, 3, 81 + k) * 12), top = Math.round(y0 + alto * (0.22 + h(i, 4, 81 + k) * 0.35)); k_torre(R, x, x + w, top, b, FO[(i + 1) % 3], RE[(i + k) % 5], TC[(i + 2 + k) % 5], i + 7 + k); x += w + 10 + Math.floor(h(i, 5, 81 + k) * 10); }
  R.recorte(null);
}

// los tonos de la noche del despacho: la penumbra cálida de dentro y el azul de la ciudad de fuera
const k_PENUMBRA = hex('#22161e'), k_AZULNOCHE = hex('#0e1230'), k_LAMPARA = hex('#ffc070');

// un pincel en penumbra: pinta con R pero cada color mezclado hacia la penumbra en la proporción k (para lo que se pinta
// de día en cada fotograma, como la bandera o el cofre, sin oscurecer dos veces lo que ya hay detrás)
function k_tenue(R, k, col = k_PENUMBRA) {
  const m = (c) => k_mezcla(c, col, k);
  return { pset: (x, y, c) => R.pset(x, y, m(c)), pget: (x, y) => R.pget(x, y), rect: (a, b, c, d, cc) => R.rect(a, b, c, d, m(cc)), linea: (a, b, c, d, cc) => R.linea(a, b, c, d, m(cc)),
    disco: (x, y, r, cc) => R.disco(x, y, r, m(cc)), poligono: (pts, cc) => R.poligono(pts, m(cc)) };
}

// la luz cálida de una lámpara: un óvalo (cx, cy, rx, ry) tramado que tiñe lo pintado hacia el ámbar, más fuerte en el centro
function k_luzCalida(R, cx, cy, rx, ry, a) {
  for (let y = Math.round(cy - ry); y <= Math.round(cy + ry); y++) for (let x = Math.round(cx - rx); x <= Math.round(cx + rx); x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
    if (d < 1 && x >= 0 && x < 320 && y >= 0 && y < 180 && k_b4(x, y) < a * (1 - d)) { const c = R.pget(x, y); if (c) R.pset(x, y, k_mezcla(c, k_LAMPARA, 0.3)); } }
}

// la ciudad de noche por una ventana en [x0, y0, x1, y1]: el cielo azul oscuro tramado con el resplandor rosa de la ciudad
// abajo, estrellas que titilan, la luna con sus mares, nubes de noche de tres tonos a tres velocidades con el filo de
// luna, el dirigible con sus ventanillas encendidas, dos reflectores que barren, las mismas torres (k_torresCiudad)
// apagadas en azul con ventanas encendidas que se encienden y se apagan, pilotos rojos en las agujas y los coches
// voladores con sus faros; todo recortado al hueco
function k_ciudadNoche(R, t, clave, [x0, y0, x1, y1], k = 0) {
  const alto = y1 - y0, ancho = x1 - x0;
  R.recorte([x0, y0, x1, y1]);
  k_grad(R, x0, y0, x1, y1, [hex('#080a20'), hex('#0e1230'), hex('#161a40'), hex('#2a1e50'), hex('#4a2660'), hex('#6e3468')]);
  // las estrellas (más arriba, más)
  for (let i = 0; i < 46; i++) { const x = Math.round(x0 + h(i, 1, 150) * ancho), y = Math.round(y0 + Math.pow(h(i, 2, 150), 1.6) * alto * 0.6), b = Math.sin(t * (1.5 + h(i, 3, 150) * 3) + i * 2.1);
    if (b > -0.3) R.pset(x, y, b > 0.7 ? K.blanco : hex('#9aa4d8')); if (b > 0.93 && i % 4 === 0) { R.pset(x - 1, y, hex('#6a74b0')); R.pset(x + 1, y, hex('#6a74b0')); R.pset(x, y - 1, hex('#6a74b0')); R.pset(x, y + 1, hex('#6a74b0')); } }
  // la luna con su halo y sus mares
  { const lx = x0 + Math.round(ancho * 0.825), ly = y0 + 18; R.halo(lx, ly, 15, [hex('#1a2048'), hex('#283062')], 1); R.disco(lx, ly, 7, hex('#d8dcf0')); R.disco(lx + 1, ly - 1, 6, hex('#f4f6ff'));
    R.disco(lx - 2, ly + 1, 2, hex('#c8cce4')); R.disco(lx + 2, ly - 3, 1, hex('#d0d4ea')); R.pset(lx + 3, ly + 2, hex('#c8cce4')); R.pset(lx - 4, ly - 2, K.blanco); }
  // las nubes de noche, tres capas a tres velocidades, con el filo claro de la luna
  for (const [v, n, w, fy, kk, cols] of [[0.6, 4, 14, 0.2, 151, [hex('#141838'), hex('#1e2448'), hex('#2e3460')]], [1.5, 3, 20, 0.34, 152, [hex('#1a1c40'), hex('#262a52'), hex('#3c4274')]], [2.8, 2, 28, 0.12, 153, [hex('#20224a'), hex('#2e325c'), hex('#5a6090')]]])
    for (let i = 0; i < n; i++) { const span = ancho + w * 2 + 30, xx = x0 - w - 15 + ((h(i, 1, kk) * span + t * v) % span), yy = y0 + alto * (fy + (h(i, 2, kk) - 0.5) * 0.16); k_nube(R, xx, yy, w * (0.7 + h(i, 3, kk) * 0.6), cols); }
  // el dirigible de noche, con su panza rosa iluminada y las ventanillas
  { const span = ancho + 80, dx = Math.round(x1 + 30 - ((t * 2.2 + 60) % span)), dy = Math.round(y0 + alto * 0.27);
    for (let i = -9; i <= 9; i++) { const hh = Math.round(Math.sqrt(1 - (i / 10) ** 2) * 4); R.linea(dx + i, dy - hh, dx + i, dy + hh, hex('#2a2448')); R.pset(dx + i, dy + hh, hex('#8a3a6a')); if (hh > 1) R.pset(dx + i, dy - hh, hex('#4a4470')); }
    R.linea(dx + 9, dy - 3, dx + 12, dy - 5, hex('#3a2a50')); R.linea(dx + 9, dy + 3, dx + 12, dy + 5, hex('#3a2a50'));
    for (let i = -3; i <= 3; i++) R.pset(dx + i, dy + 5, i % 2 ? k_LAMPARA : hex('#ff8ac8'));
    R.pset(dx - 9, dy, Math.floor(t * 2) % 2 ? hex('#ff3a4a') : hex('#5a1a2a')); R.pset(dx + 12, dy - 5, Math.floor(t * 2 + 1) % 2 ? hex('#4aff8a') : hex('#1a4a2a')); }
  // los dos reflectores que barren el cielo desde la ciudad
  for (let j = 0; j < 2; j++) { const bx = x0 + ancho * (0.3 + j * 0.42), ang = -Math.PI / 2 + Math.sin(t * (0.35 + j * 0.12) + j * 2) * 0.55;
    for (let d = 0; d < alto * 1.2; d++) { const cx = bx + Math.cos(ang) * d, cy = y1 + Math.sin(ang) * d, an = 1 + d * 0.06;
      for (let e = -an; e <= an; e++) { const x = Math.round(cx - Math.sin(ang) * e), y = Math.round(cy + Math.cos(ang) * e); if (((x + y) & 1) === 0 && d > 6) k_tono(R, x, y, 0.16 * (1 - d / (alto * 1.2))); } } }
  // las torres de la ciudad, apagadas en azul de noche con ventanas encendidas (capa fija aparte)
  const capa = k_capa(R, clave + 'N', () => { k_torresCiudad(R, x0, y0, x1, y1, k); const B = R.buf, WC = [k_LAMPARA, hex('#ffe0a0'), hex('#f8a858'), hex('#ff8ac8'), hex('#8ae8ff')];
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = B[y * 320 + x]; if (!c) continue; const u = (y - y0) / alto;
      let n = k_mezcla(c, k_AZULNOCHE, 0.7 - u * 0.12); const cel = h(x >> 1, Math.floor(y / 4), 154 + k);
      if ((y & 3) !== 0 && (x & 1) === 0 && cel < 0.1 + 0.08 * h(x >> 4, 1, 159) && u > 0.12) n = WC[Math.floor(h(x >> 3, y >> 3, 155) * 5)];
      B[y * 320 + x] = n; } });
  if (!capa.picos) { capa.picos = []; for (let x = x0 + 2; x < x1 - 2; x += 3) { let y = y0; while (y < y1 && !capa.b[y * 320 + x]) y++; if (y < y0 + alto * 0.55 && y > y0 + 2) capa.picos.push([x, y]); } capa.picos = capa.picos.filter((_, i) => i % 3 === 0); }
  k_poner(R, capa);
  // el resplandor de las ventanas que parpadea: unas cuantas se apagan y se encienden
  for (let i = 0; i < 18; i++) { const x = Math.round(x0 + 4 + h(i, 1, 156) * (ancho - 8)) & ~1, y = Math.round(y0 + alto * (0.45 + h(i, 2, 156) * 0.5)); if (capa.b[y * 320 + x]) R.pset(x, y, Math.sin(t * 0.8 + i * 1.9) > 0.2 ? hex('#ffe0a0') : hex('#1a2048')); }
  // los pilotos rojos de las agujas
  capa.picos.forEach(([x, y], i) => { if (Math.sin(t * 3 + i * 1.3) > 0.3) { R.pset(x, y - 1, hex('#ff3a4a')); if (Math.sin(t * 3 + i * 1.3) > 0.8) { R.pset(x - 1, y - 1, hex('#8a1a2a')); R.pset(x + 1, y - 1, hex('#8a1a2a')); } } });
  // los coches voladores con el faro blanco delante y la luz roja detrás
  for (let i = 0; i < 5; i++) { const v = (7 + i * 3) * (i % 2 ? -1 : 1), span = ancho + 20, xx = Math.round(x0 - 10 + (((h(i, 1, 157) * span + t * v) % span) + span) % span), yy = Math.round(y0 + alto * (0.48 + i * 0.08)), d = v > 0 ? 1 : -1;
    R.linea(xx - 2, yy, xx + 2, yy, hex('#3a3a6a')); R.pset(xx + 3 * d, yy, K.blanco); R.pset(xx + 4 * d, yy, hex('#c8d0ff')); R.pset(xx - 3 * d, yy, hex('#ff3a4a')); R.pset(xx, yy + 1, [hex('#ff8ac8'), hex('#8ae8ff'), k_LAMPARA][i % 3]); }
  R.recorte(null);
}

// las paredes, el ventanal (hueco transparente), las cortinas, la librería, el busto y el suelo del despacho (capa fija)
function k_pintaDespacho(R, V) {
  const { rect, pset } = R;
  k_marmol(R, 0, 0, 319, 131, 83);
  for (let y = V[1]; y <= V[3]; y++) for (let x = V[0]; x <= V[2]; x++) pset(x, y, 0);
  // la cornisa dorada del techo
  rect(0, 0, 319, 6, K.marmol); rect(0, 7, 319, 8, K.oroS); rect(0, 7, 319, 7, K.oro); for (let x = 0; x < 320; x += 6) pset(x, 8, K.oroD);
  // el marco del ventanal con los montantes de oro
  rect(V[0] - 4, V[1] - 4, V[2] + 4, V[1] - 1, K.marmolS); rect(V[0] - 4, V[1] - 4, V[2] + 4, V[1] - 4, K.marmolL);
  rect(V[0] - 3, V[3] + 1, V[2] + 3, V[3] + 4, K.marmolL); rect(V[0] - 3, V[3] + 4, V[2] + 3, V[3] + 5, K.marmolD);
  for (let x = V[0] - 1; x <= V[2] + 1; x += 40) { rect(x - 1, V[1], x + 1, V[3], K.oroS); rect(x - 1, V[1], x - 1, V[3], K.oroL); }
  for (const y of [V[1] + 30]) { rect(V[0], y, V[2], y + 1, K.oroS); rect(V[0], y, V[2], y, K.oroL); }
  k_cortina(R, 60, 82, 10, 132, 1); k_cortina(R, 238, 260, 10, 132, -1); rect(56, 9, 264, 11, K.oro); rect(56, 9, 264, 9, K.oroL);
  // la librería de la izquierda
  rect(4, 24, 48, 132, K.maderaD); rect(5, 25, 47, 131, K.madera); rect(5, 25, 47, 26, K.maderaL);
  for (let s = 0; s < 5; s++) { const y = 34 + s * 20; rect(7, y - 7, 45, y + 9, K.maderaS); let x = 8; for (let i = 0; x < 44; i++) { const w = 2 + Math.floor(h(i, s, 84) * 2), al = 10 + Math.floor(h(i, s + 9, 84) * 6), c = [K.terciopelo, hex('#2a4a6a'), hex('#3a5a3a'), K.oroS, hex('#5a3a6a'), hex('#e8e0d0')][(i + s * 2) % 6];
      if (s === 2 && i === 3) { k_rosas(R, x + 3, y + 3, 3, 85); x += 8; continue; } rect(x, y + 9 - al, x + w - 1, y + 9, c); pset(x, y + 9 - al, k_mezcla(c, K.blanco, 0.4)); rect(x, y + 4, x + w - 1, y + 4, K.oro); x += w + (h(i, s, 86) < 0.15 ? 2 : 0); }
    rect(6, y + 10, 46, y + 11, K.maderaL); rect(6, y + 12, 46, y + 12, K.maderaD); }
  // el busto de mármol en su columna, junto a la librería
  rect(52, 100, 62, 132, K.marmolS); rect(52, 100, 54, 132, K.marmolL); rect(50, 98, 64, 100, K.marmol); R.disco(57, 88, 5, K.marmol); R.disco(56, 87, 3, K.marmolL); rect(52, 93, 62, 97, K.marmol); rect(60, 93, 62, 97, K.marmolS); pset(58, 88, K.marmolD);
  // el zócalo de madera y el suelo en espiga
  rect(0, 126, 319, 132, K.madera); rect(0, 126, 319, 126, K.maderaL); rect(0, 132, 319, 132, K.maderaD);
  for (let y = 133; y < 180; y++) for (let x = 0; x < 320; x++) { const u = Math.floor((x + y) / 8), v = Math.floor((x - y + 400) / 8), c = (u + v) % 2 ? (((x + y) % 8 === 0) ? K.maderaD : K.madera) : (((x - y + 400) % 8 === 0) ? K.maderaD : K.maderaV); pset(x, y, h(x >> 1, y, 87) < 0.06 ? K.maderaL : c); }
  // la alfombra roja y dorada
  for (let y = 150; y < 180; y++) for (let x = 40; x <= 280; x++) { const bx = Math.min(x - 40, 280 - x), by = y - 150; let c = bx < 3 || by < 3 ? K.oroS : bx < 6 || by < 6 ? K.terciopeloS : K.terciopelo;
    if (bx >= 6 && by >= 6 && ((x + y) % 12 === 0 || (x - y + 600) % 12 === 0)) c = K.oroS; if (bx === 1 || by === 1) c = K.oro; pset(x, y, c); }
}

// Despacho de noche (o.luz 'noche'): el mismo despacho en penumbra cálida: por el ventanal la ciudad de noche
// (k_ciudadNoche: luna, estrellas, reflectores, ventanas encendidas, pilotos y faros), dos apliques de pared encendidos
// (x 55 y 271) y una lámpara de pie dorada junto a la bandera (x 310) con sus charcos de luz que tiemblan, la luz de luna
// azul sobre la alfombra, polvo que flota en la luz de las lámparas y la lámpara de mesa encendida (k_despachoMesaGrande).
// Las mismas posiciones que de día.
function k_despachoNoche(R, t, o, V) {
  k_ciudadNoche(R, t, 'despachoCiudad', V, 0);
  k_reflejos(R, V, t, 0, 0.1);
  const capa = k_capa(R, 'despachoN', () => { k_pintaDespacho(R, V); const B = R.buf;
    // la penumbra: más oscuro arriba y en los rincones, algo menos cerca del suelo
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = B[y * 320 + x]; if (c) B[y * 320 + x] = k_mezcla(c, k_PENUMBRA, 0.7 - (y > 133 ? 0.06 : 0) + Math.abs(x - 160) / 1600); }
    // los apliques de pared: placa dorada, brazo y tulipa encendida
    for (const [x, y] of [[55, 50], [271, 56]]) { const { rect, pset } = R;
      rect(x - 1, y, x + 1, y + 8, K.oroS); pset(x - 1, y + 1, K.oroL); R.linea(x, y + 6, x + 0, y + 3, K.oro); rect(x - 2, y + 9, x + 2, y + 10, K.oroS);
      rect(x - 3, y - 6, x + 3, y - 1, K.k); rect(x - 2, y - 5, x + 2, y - 2, hex('#ffd8a0')); rect(x - 2, y - 5, x - 1, y - 2, hex('#fff2d0')); pset(x + 2, y - 2, hex('#f8a070')); rect(x - 3, y - 1, x + 3, y - 1, K.oro); }
    // la lámpara de pie dorada junto a la bandera: pie, fuste con anillos y pantalla de seda rosa
    { const { rect, pset } = R, x = 310; rect(x - 5, 130, x + 5, 132, K.k); rect(x - 4, 130, x + 4, 131, K.oroS); rect(x - 4, 130, x + 4, 130, K.oroL); rect(x, 98, x + 1, 129, K.oroS); pset(x, 104, K.oroL); pset(x, 112, K.oroL); pset(x, 120, K.oroL);
      for (const y of [106, 116]) rect(x - 1, y, x + 2, y + 1, K.oro);
      for (let y = 88; y <= 97; y++) { const m = 4 + Math.round((y - 88) * 0.5); for (let xx = x - m; xx <= x + 1 + m; xx++) pset(xx, y, xx === x - m || xx === x + 1 + m ? K.k : xx < x - m + 3 ? hex('#ffe8c8') : (xx + y) % 3 === 0 ? hex('#f8b890') : hex('#ffd0a8')); }
      rect(x - 9, 97, x + 10, 97, K.oro); rect(x - 4, 88, x + 5, 88, K.oroS); }
  });
  k_poner(R, capa);
  // la luz de la luna, azul y fría, sobre el suelo y la alfombra
  for (let y = 134; y < 180; y++) { const d = Math.round((y - 134) * 0.5); for (let x = 96 + d; x < 210 + d; x++) if (((x + y) & 3) === 0 && Math.floor((x - d - 96) / 40) % 4 !== 3) R.pset(x, y, k_mezcla(R.pget(x, y), hex('#6a78c0'), 0.22)); }
  k_bandera(k_tenue(R, 0.66), 286, 132, 52, t);
  // los charcos de luz cálida de los apliques y de la lámpara de pie, que tiemblan un poco
  const tb = 0.04 * Math.sin(t * 11) + 0.03 * Math.sin(t * 17.3);
  k_luzCalida(R, 55, 52, 16, 24, 0.7 + tb); k_luzCalida(R, 271, 58, 15, 22, 0.7 - tb); k_luzCalida(R, 310, 108, 22, 34, 0.75 + tb);
  k_luzCalida(R, 300, 150, 40, 14, 0.5 + tb); k_luzCalida(R, 55, 110, 20, 26, 0.35);
  // el polvo que flota en la luz de las lámparas
  for (let i = 0; i < 10; i++) { const [cx, cy] = [[55, 60], [271, 66], [310, 112]][i % 3], x = Math.round(cx + Math.sin(t * 0.5 + i * 2.3) * 9), y = Math.round(cy + ((h(i, 2, 158) * 30 + t * 2) % 30) - 15); if (Math.sin(t * 2 + i) > 0.2) R.pset(x, y, hex('#ffe0a8')); }
  k_despachoMesaGrande(R, t, o);
  return { suelo: 133, tras: 160, visita: 70, visitaDcha: 262, sueloVisita: 168, ventana: V, mesa: [96, 128, 224, 164], cofre: [184, 128], jarron: [110, 128], bandera: [286, 52] };
}

// lo último que pidió capitolio() para la mesa del despacho (o.luz, o.cofre y o.numero), para que capitolioDelante la
// repinte igual aunque la escena no le pase esas opciones
const k_MESA = {};

// la mesa grande con lo de encima: el tablero, los cajones con vetas, las patas doradas, los papeles, el tintero con su
// pluma, el jarrón de rosas blancas y la taza (capa fija de k_despachoMesaGrande)
function k_pintaMesaGrande(R) {
  const { rect, pset } = R;
  rect(92, 129, 228, 135, K.k); rect(93, 130, 227, 134, K.maderaL); rect(93, 130, 227, 130, hex('#a8684a')); rect(93, 134, 227, 134, K.madera);
  rect(96, 136, 224, 164, K.maderaD); rect(97, 136, 223, 163, K.madera); rect(97, 136, 223, 137, K.maderaS);
  for (const [a, b] of [[102, 140], [146, 174], [180, 218]]) { rect(a, 141, b, 158, K.maderaS); rect(a + 1, 142, b - 1, 157, K.madera); rect(a + 1, 142, b - 1, 142, K.maderaL); rect(a + 3, 144, b - 3, 155, K.maderaV); rect(a + 3, 144, b - 3, 144, K.maderaS); rect(a + 3, 155, b - 3, 155, K.maderaL);
    for (let x = a + 4; x < b - 3; x++) for (let y = 145; y < 155; y++) if (Math.sin(x * 0.4 + Math.sin(y * 0.5) * 2) > 0.8) pset(x, y, K.madera); }
  rect(97, 138, 223, 138, K.oroS); rect(97, 161, 223, 161, K.oroS); R.disco(160, 150, 3, K.oro); pset(159, 149, K.oroL);
  for (const x of [98, 222]) { rect(x - 3, 160, x + 3, 166, K.oroS); rect(x - 3, 160, x - 1, 166, K.oro); }
  // encima: papeles, tintero con pluma y el jarrón de rosas blancas
  rect(132, 126, 146, 129, K.marmolS); rect(133, 125, 147, 128, K.blanco); for (let x = 135; x < 145; x += 2) pset(x, 126, K.marmolS);
  rect(152, 125, 156, 129, K.k); rect(153, 126, 155, 128, hex('#1a1a3a')); R.linea(155, 124, 160, 117, K.blanco); R.linea(156, 124, 161, 118, K.marmolS);
  rect(105, 116, 115, 129, K.k); rect(106, 117, 114, 128, K.cristal); rect(106, 117, 107, 128, K.cristalL); rect(113, 117, 114, 128, K.cristalS); rect(104, 115, 116, 116, K.oroS);
  k_rosas(R, 110, 109, 7, 89);
  rect(208, 124, 214, 129, K.k); rect(209, 125, 213, 128, K.blanco); pset(214, 126, K.k); rect(206, 129, 216, 129, K.marmolS);
}

// la lámpara de mesa de noche (a la izquierda de los papeles, x 126): pie de oro, tulipa de cristal rosa encendida y su
// cadenita; va en la capa de noche de la mesa
function k_lamparaMesa(R) {
  const { rect, pset } = R;
  rect(121, 127, 131, 129, K.k); rect(122, 127, 130, 128, K.oroS); rect(122, 127, 130, 127, K.oroL);
  rect(125, 115, 127, 126, K.oroS); pset(125, 118, K.oroL); pset(125, 122, K.oroL); rect(124, 124, 128, 125, K.oro);
  R.poligono([[119, 114], [133, 114], [130, 106], [122, 106]], K.k);
  for (let y = 107; y <= 113; y++) for (let x = 120; x <= 132; x++) { const a = 122 - (y - 106) * 0.375, b = 130 + (y - 106) * 0.375; if (x > a && x < b) pset(x, y, x < a + 3 ? hex('#fff2d0') : x > b - 3 ? hex('#f8a070') : hex('#ffd8a0')); }
  rect(119, 114, 133, 114, K.oro); rect(122, 106, 130, 106, K.oroS); pset(126, 105, K.oroL);
  pset(131, 115, K.oroS); pset(131, 116, K.oroS); pset(131, 117, K.oro);
}

// los nervios del techo que caen en la zona de Atom (x 278–318, y 4–44): se quitan de la capa fija (con un fundido
// tramado de x 270 a 277) y se guardan para pintarlos en cada fotograma como un brillo tenue sobre el cielo
const k_NERVIOS = [];

function k_nerviosTenues(R) {
  const B = R.buf; k_NERVIOS.length = 0;
  for (let y = 0; y <= 46; y++) for (let x = 270; x < 320; x++) { const i = y * 320 + x; if (!B[i]) continue;
    if ((x >= 278 && y <= 44) || k_b4(x, y) < (x - 269) / 9) { B[i] = 0; k_NERVIOS.push(x, y); } }
}
