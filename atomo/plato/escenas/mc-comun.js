// Fontanería y decorados del episodio 38 (El Mary Celeste: el barco que siguió navegando sin nadie) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el astillero de 1861 y el puerto de Nueva York
// en 1872 (puerto), B el Mary Celeste en el mar (mar), C a bordo: cubierta, camarote y bodega (abordo), D Gibraltar
// (gibraltar), E los laboratorios de 2006 y 2026 (laboratorio), F Haití en 1885 y los buceadores de 2001 (haiti) y G hoy:
// el estudio de Atom con su barco en una botella y el escritorio de Conan Doyle en 1884 (hoy).
// CUIDADO (es un misterio con diez personas que desaparecieron):
// · NADA DE FANTASMAS, MONSTRUOS, CALAVERAS NI CADÁVERES. Nada de tormentas que se tragan a gente ni de naufragios con
//   personas. La familia y la tripulación se ven vivas, en 1872, o de lejos y con respeto (diez siluetas pequeñas en un
//   bote, en la niebla). El tentáculo y el barco pirata solo existen como dibujos de tiza tachados en una pizarra.
// · SIN LETRAS: solo números (R.numero), rayas, iconos y pictogramas. LA ÚNICA EXCEPCIÓN: el nombre del barco en la popa
//   («Amazon» que se tapa y «Mary Celeste»), pintado a mano píxel a píxel, porque es el objeto del gag 2. El diario de a
//   bordo y los periódicos llevan renglones sin letras.
// · Las personas reales, por sus atributos y solo con hechos; nada de burla. Los gags van con objetos y animales; los
//   objetos NO tienen cara.
// · La esquina de Atom (x 278–318, y 4–44), siempre tranquila (cielo liso o pared en dos tonos casi iguales), y la barra
//   del año (x 20–170, y 0–14; las cifras del año bajan hasta y ≈ 20: nada con detalle en y 0–20 bajo x 20–170).
// Los personajes son los de ELENCO_MC (briggsMC, sarahMC, sophiaMC, arthurMC, abuelaMC, morehouseMC, deveauMC, wrightMC,
// marineroMC, estibadorMC, pintorMC, sollyfloodMC, doyleMC, parkerMC, sellaMC, rowbothamMC, mairMC, buzoMC); los escribe
// pixel-chibi.js (T.ELENCO_MC).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (borda, mesas, barandillas) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// Cada encuadre devuelve su geometría: { encuadre, camara, suelo, libre: [x0, x1] (dónde caben los actores de pie), y
// los puntos que nombra su cabecera; ninguno se llama 'camara' ni 'encuadre' }.
// LA BARRA DEL AÑO: tres tramos, 1861–1873 (el barco), 1874–1899 (las historias y el final en Haití) y 1900–2026 (los
// experimentos y los buceadores).
//
// CANON COMPARTIDO (lo dibujan varios grupos a la vez: tiene que cuadrar entre decorados)
// · EL MARY CELESTE: un BERGANTÍN-GOLETA de madera de unos 30 m: casco negro con una franja blanca fina a la altura de la
//   cubierta y la obra viva roja bajo la línea de flotación; DOS PALOS (el de proa con velas cuadradas, el de popa con
//   cangreja, la vela de cuchillo grande), bauprés con dos foques; cubierta de tablas claras; una caseta baja de madera a
//   popa (el camarote del capitán) con dos ventanillas; la rueda del timón a popa; la ESCOTILLA PRINCIPAL en el centro
//   (con el bote, un yugo de madera gris atado encima en 1872; vacía al encontrarlo); la escotilla de proa y la de popa
//   (lazareto), las dos abiertas con sus tapas tiradas en cubierta al encontrarlo; una bomba de mano (un tubo con su
//   palanca) junto al palo mayor. El nombre en la popa (ver la excepción de letras).
// · EL DEI GRATIA: otro bergantín parecido, pero con el casco VERDE oscuro y las velas más blancas, para distinguirlos.
// · LOS BARRILES: de roble, con aros de hierro; los de roble blanco, claros; los NUEVE de roble rojo, rojizos, con gotas
//   que rezuman. Se estiban tumbados en filas en la bodega.
// · EL DIARIO DE A BORDO: un libro grande de tapas de cuero pardo, abierto, con renglones sin letras y columnas de
//   números (R.numero); la última página con una fila escrita (el 25) y luego en blanco.
// · EL BARCO EN LA BOTELLA de Atom (hilo de gags): una botella de vidrio tumbada sobre un soporte de madera con un
//   bergantín diminuto (el Mary Celeste en pequeño) dentro, sobre un mar de masilla azul; un tapón de corcho.
//
//   import * as T from '/atomo/plato/escenas/mc-comun.js';
//   const { E, R, M } = await T.preparar('mc-gancho');
//   T.rodar(E, R, [[0, (t) => T.mar(R, t, { encuadre: 'alta', luz: 'gris' })]], { año: 1872 });
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

// el reparto del episodio (ELENCO_MC) lo crea pixel-chibi.js
export const ELENCO_MC = KIT.ELENCO_MC || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el casco negro y su franja, la obra viva roja, la madera de cubierta, la lona de las velas, el mar del Atlántico
    // en tres tonos y la espuma, el roble blanco y el rojo de los barriles, el cuero del diario, la piedra caliza del
    // Peñón, el turquesa de Haití, el azul de la llama de alcohol
    casco: '#1c1a20', cascoL: '#34303a', franja: '#e8e4d8', obraViva: '#8a2a24', tabla: '#c8a878', tablaS: '#9a7a52', tablaL: '#e0c498',
    lona: '#efe6d0', lonaS: '#c8bca0', mar: '#2a4a64', marS: '#1a3048', marL: '#4a6e8a', espuma: '#e8f0f2', verdeDG: '#2a4a34',
    robleB: '#c89a5a', robleBS: '#9a7240', robleR: '#9a4a30', robleRS: '#6e3020', aro: '#4a4a52', cuero: '#6a4428', cueroS: '#4a2e1a',
    caliza: '#d8cca8', calizaS: '#a89a78', turquesa: '#3ac8c0', turquesaL: '#8ae8dc', arena: '#ecd8a8', llama: '#5a8aff', llamaL: '#bcd4ff',
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
  const E = await escena(id, 'ep38');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1861–1873 (el barco: astillero, viaje, hallazgo y Gibraltar), 1874–1899 (el cuento de 1884 y
  // el final en Haití), 1900–2026 (los experimentos, los buceadores, hoy)
  Object.assign(R.ICONOS, {
    barco: ['...#...', '..##...', '.###...', '####.#.', '...#...', '#######', '.#####.'],
    pluma: ['......#', '.....##', '....##.', '...##..', '..##...', '.##....', '#......'],
    matraz: ['..###..', '...#...', '...#...', '..#.#..', '.#...#.', '#.###.#', '#######'],
  });
  R.tramosTiempo([[1861, 1873, R.PALA.AZUL ?? R.PALA.ROJO, 'barco'], [1874, 1899, R.PALA.ORO, 'pluma'], [1900, 2026, R.PALA.ROJO, 'matraz']]);
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



// ── A · El puerto: el astillero de 1861, el muelle de Nueva York en 1872 y el de Génova en 1873 ──────────────────────
// o.encuadre (y o.camara). Lo de delante de los personajes va en puertoDelante: LLAMA A puertoDelante DESPUÉS DE LOS
// ACTORES, con las mismas opciones (la borda de la pasarela tapa las piernas de los que ya han subido; en los demás
// encuadres son piezas bajas en las esquinas que solo tapan pies).
// Opciones de todo el grupo: o.luz 'dia' (por omisión, salvo el muelle y 1867) | 'tarde' (sol bajo, agua dorada, todo
// algo más cálido) | 'gris' (noviembre: cielo tramado de plomo con estratos y nubes bajas que corren, agua de plomo).
// Todos los cielos van tramados con nubes de tres tonos a tres velocidades (lejos lentas y desvaídas, cerca rápidas) que
// se apartan solas de la esquina de Atom y de la barra del año; gaviotas que vuelan; el agua se mueve, con rizos, brillos
// y el reflejo ondulado de lo que tiene encima; lo fijo va en búferes (R.nuevo) por encuadre, cámara, luz y época.
// El bergantín es el del canon (a_bergantin, de perfil): casco negro con la franja blanca fina a la altura de la
// cubierta, la obra viva roja, dos palos (trinquete con cuatro vergas de velas cuadradas, mayor con cangreja y botavara),
// bauprés con dos foques, jarcia con flechastes, caseta a popa con dos ventanillas, la rueda del timón, el bote sobre la
// escotilla principal, la bandera de barras y estrellas (sin letras) en la popa y un gallardete rojo en el tope.
//   'astillero' (o.epoca 1861, por omisión): LA ISLA DE SPENCER, 1861: colinas con bosque de abetos en dos términos, la
//     cala con su orilla de grava que la marea lame (espuma que sube y baja), un islote al fondo; el casco (canon, aún
//     de madera sin pintar, sin palos) sobre los picaderos de la grada inclinada de troncos, con las cuadernas a la vista
//     en la popa y la proa forrada, puntales, andamios detrás con dos carpinteros pequeños que martillean; a la izquierda
//     el cobertizo, la caja de vapor de doblar madera con su caldera y su humo, pilas de tablas y la sierra de foso con
//     dos hombres que serran (uno arriba, otro abajo); gaviotas. o.bota 0–1: los puntales caen y el casco se desliza por
//     la grada hacia la derecha y entra en la cala con un chapoteo (espuma y gotas desde 0,7; flota a 1). Devuelve suelo
//     158, libre [30, 230] (más a la derecha, la cala llega hasta delante), casco [x0, y0, x1, y1] (se mueve con
//     o.bota), grada [x, y] (junto a la proa, donde se pone quien suelta el casco), proa [x, y] (se mueve con o.bota).
//     o.epoca 1867 (VARADO, o.luz 'gris' por omisión): otra costa, con acantilados y dunas; el mismo barco ya negro, con
//     palos, escorado sobre la playa, el mastelero del trinquete partido y colgando, una vela rota que flamea, las olas
//     grises que rompen en la orilla (espuma que corre), maderos en la arena y cuatro hombres pequeños que tiran de un
//     cabo hacia la izquierda (a compás, en x 30–75). Sin bandera (entonces era el Amazon, de Nueva Escocia). Nadie en
//     peligro. Devuelve suelo 158, libre [84, 200] (delante del casco), casco [...], proa, grada null.
//   Cámara 'popa' (NUEVA YORK, 1868): un muelle de tablas a la izquierda (pilotes, noray, rollo de cabo, cajas, farola),
//     el puerto con barcos, un bote de remos que cruza y la otra orilla al fondo y, a la derecha, LA POPA REDONDEADA del
//     bergantín negro: el coronamiento con su barandilla de balaustres y el farol de popa, el espejo de tablas con la
//     franja blanca, dos ventanillas que reflejan el cielo, el cartucho y las pilastras de tallas doradas y la moldura de
//     cabo, la bovedilla en sombra con los reflejos del agua que bailan, el casco que se abomba hasta la cinta y se
//     recoge en la flotación con sus tracas curvas, el timón con sus herrajes, la obra viva roja, la farola de gas del
//     muelle, la escala de cuerda que se mece y, colgada de dos cabos, la plancha
//     (guindola) con un cubo de pintura, donde se sube el pintor (EL.pintorMC, lo pone la escena). o.nombre 0 («AMAZON»,
//     letras doradas) … 0,3 (el blanco tapa el nombre de izquierda a derecha, a brochazos) … 1 («MARY CELESTE», negro
//     sobre el blanco, letra a letra; son las únicas letras del episodio). o.gota 0–1: una gota de pintura blanca cae del
//     rótulo sobre la cabeza de la gaviota posada en la punta de la plancha (de 0,6 en adelante la lleva y sacude la
//     cabeza). Devuelve suelo 172, libre [20, 112] (en el muelle), nombre [x0, y0, x1, y1], pintor [x, y] (los pies
//     del pintor en la plancha, bajo la letra que toca pintar), pincel [x, y] (la letra que toca pintar), plancha [x0,
//     x1, y] (los pies de quien está en ella van en y − 1), gaviota [x, y].
//   'muelle': EL EAST RIVER, NUEVA YORK, NOVIEMBRE DE 1872 (o.luz 'gris' por omisión aquí): almacenes de ladrillo a la
//     izquierda con portalones, una pluma con su gancho que se mece y un mozo en la puerta alta; la otra orilla con
//     tejados, campanarios y bosques de mástiles; un remolcador de vapor que echa humo; el bergantín (canon) amarrado de
//     costado con las velas recogidas y dos amarras a sus norays; la CABRIA de madera (dos patas, viento, motón y
//     aparejo) que sube cada barril del muelle y lo baja por la escotilla, con un marinero pequeño en cubierta que lo
//     guía; un torno de manivela al pie (lo puede girar un estibador de la escena); filas de barriles de pie y una pirámide
//     de barriles tumbados; cajas y sacos junto al cantil; la farola de gas; un mozo que entra y sale del portalón con un
//     saco; un marinero que aduja el cabo junto al noray de allá (y dice adiós cuando zarpa); adoquines mojados con charcos
//     que reflejan el cielo; un carro con caballo que pasa despacio por detrás; gaviotas. o.carga 0–1: cuántos barriles quedan en el muelle (0 muchos … 1 ninguno; el barco cala un
//     poco más al cargarse); o.rueda 0–1: EL GAG 3: el último barril se escapa rodando por el muelle de izquierda a
//     derecha, rebota en el noray de delante (0,8) y se queda junto a él; o.zarpa 0–1: sueltan amarras y el barco se
//     aleja río adentro hacia la derecha, haciéndose pequeño, mientras se izan las velas (nunca entra en la esquina de
//     Atom); o.barco 'mc' (por omisión) | 'dg' (el Dei Gratia, casco verde, cargando barriles de petróleo, oscuros).
//     Devuelve suelo 160, libre [20, 200], escotilla [x, y], barril [x, y] (el que se escapa), torno [x, y],
//     noray [x, y], barco [x, y] (el centro de su flotación, se mueve con o.zarpa).
//     Cámara 'pasarela': EL COSTADO de cerca: el casco negro con sus tracas, la franja blanca, las vigotas y la jarcia
//     del palo mayor con sus flechastes, portillos de latón, el bote sobre la escotilla asomando, dos marineros pequeños en
//     cubierta, la pasarela (un tablón ancho con juntas y listones, la zanca de canto y sus pernos, el calzo del pie y los
//     ganchos del portalón, con candeleros y guardamancebo de cabo a los dos lados: el de este lado va en puertoDelante)
//     que sube del muelle al portalón de la borda; un vaporcito que cruza el río; en el muelle, adoquines, cajas, barriles,
//     sacos y un rollo de cabo esperando a la derecha, una gaviota que se pasea, la farola de gas con su llama, un banco de hierro y
//     madera, el baúl y la bolsa de viaje de la familia, un noray con su amarra; al fondo almacenes, otros barcos y el
//     río. Deja sitio para que briggsMC, sarahMC con sophiaMC suban y para abuelaMC con arthurMC en el muelle. La borda de
//     delante va en puertoDelante. Devuelve suelo 162, libre [10, 300], pasarela [x0, y0, x1, y1] (de su pie en el
//     muelle a su cabeza en la borda: los pies de quien sube van por esa recta), borda: 106 (los pies de los que ya han
//     subido; la borda les tapa hasta el pecho), cubierta [x0, x1] (dónde se ponen en cubierta).
//   'genova': EL PUERTO DE GÉNOVA, 1873: la ladera con casas de colores en hileras (ocres, rosas, verdes, persianas
//     verdes, tejados de teja, una iglesia con cúpula y campanario), la Lanterna en su peñón a la izquierda con su luz que
//     gira, el puerto con dos falúas de vela latina que cruzan y un bote de remos, el Mary Celeste amarrado (proa a la
//     izquierda, ya sin el bote sobre la escotilla), el muelle de losas con norays y sus rollos de cabo, filas de barriles
//     descargados, sacos de café y cajas junto a la plancha, un carro con mula y estibadores pequeños que bajan barriles
//     por la plancha; bajo los soportales, un tenderete de fruta con su toldo a rayas y gente que pasea. Devuelve suelo 160, libre [30, 260], barco [x, y], plancha [x0, y0, x1, y1].
//     Cámara 'barriles': LOS BARRILES de cerca en el muelle, tumbados en dos alturas (de cara: tapas con duelas, aros de
//     hierro, el tapón), de roble blanco y, en medio, los NUEVE de roble rojo con gotas que rezuman, corren por la tapa y
//     caen a un charco que brilla; detrás, el borde del muelle, el agua, el costado del barco con su palo y la ciudad
//     lejos; una carretilla, un rollo de cabo, una gaviota posada. o.vacios 0–1: los nueve, uno tras otro, se quedan
//     huecos (sin tapa, el interior oscuro, el aro suelto que cae). Devuelve suelo 172, libre [20, 300], nueve [x0, y0,
//     x1, y1], marca [x, y] (la tapa del barril del centro, para la tiza).
const V_PUERTO = {
  astillero: { cam: 'popa', general: { col: ['#a8c8e0', '#8a7a62'], geo: { suelo: 158, libre: [30, 230], casco: [65, 106, 245, 147], grada: [236, 158], proa: [243, 113] } }, popa: { col: ['#a8c8e0', '#2a4a64'], geo: { suelo: 172, libre: [20, 112], nombre: [160, 84, 270, 98], pintor: [180, 123], plancha: [164, 258, 124], gaviota: [250, 123] } } },
  muelle: { cam: 'pasarela', general: { col: ['#9aa4b0', '#6a6458'], geo: { suelo: 160, libre: [20, 200], escotilla: [224, 118], barril: [64, 160], torno: [150, 152], noray: [262, 160], barco: [212, 141] } }, pasarela: { col: ['#9aa4b0', '#6a6458'], geo: { suelo: 162, libre: [10, 300], pasarela: [92, 160, 182, 106], borda: 106, cubierta: [196, 300] } } },
  genova: { cam: 'barriles', general: { col: ['#b8d8f0', '#a8946a'], geo: { suelo: 160, libre: [30, 260], barco: [214, 138] } }, barriles: { col: ['#b8d8f0', '#a8946a'], geo: { suelo: 172, libre: [20, 300], nueve: [110, 96, 234, 144], marca: [172, 131] } } },
};
export function puerto(R, t, o = {}) {
  const v = a_vista(o), L = a_LUZ[v.luz];
  const extra = a_PINTA[v.enc + '.' + v.cam](R, t, o, L, v) || {};
  return { encuadre: v.enc, camara: v.cam, ...JSON.parse(JSON.stringify(v.geo)), ...extra };
}
// lo de delante de los personajes en cada encuadre de puerto(); se llama después de los actores, con las mismas opciones
export function puertoDelante(R, t, o = {}) {
  const v = a_vista(o), f = a_DELANTE[v.enc + '.' + v.cam];
  return f ? f(R, t, o, a_LUZ[v.luz], v) || {} : {};
}
// ── B · El Mary Celeste en el mar (y el mapa del viaje) ───────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada encuadre). Lo de delante de los personajes va en
// marDelante (se llama después de los actores, con las mismas opciones). Opciones de todo el grupo: o.luz 'gris' (por
// omisión: el Atlántico de diciembre, cielo de plomo en capas con nubes bajas de tres tonos que corren a tres
// velocidades, mar de plomo con borreguitos) | 'dia' (sol entre cúmulos, mar azul con su reguero de brillos) | 'tarde'
// (sol bajo a la izquierda, cielo de oro y malva, el reguero dorado) | 'niebla' (todo velado: jirones de niebla que
// pasan y el horizonte que se pierde; por omisión en 'bote'). o.estado (en 'alta' y 'catalejo') 'hallazgo' (por
// omisión: escotillas de proa y del lazareto abiertas con sus tapas tiradas, el hueco del bote con las trincas sueltas, la
// bomba desmontada) | 'viaje' (escotillas cerradas y el bote gris atado sobre la escotilla principal). o.bandazo 0–1
// (en 'alta' y 'timon', 0,6 por omisión). El barco es SIEMPRE el del canon (b_bergantin): casco
// negro con la franja blanca a la altura de la cubierta y la obra viva roja, dos palos (trinquete de velas cuadradas,
// mayor con cangreja), bauprés con foques, cubierta clara con la caseta, la rueda, la bomba y las tres escotillas.
//   'alta': ALTA MAR (gancho y miniatura): el Mary Celeste SOLO, grande, de costado y algo desde arriba (se ve la
//     cubierta vacía: escotillas abiertas con sus tapas tiradas, el hueco del bote), con la proa a la derecha, que
//     cabecea con la mar de fondo, se escora y guiña (o.bandazo 0–1, 0,6 por omisión); las velas se hinchan y baten a
//     destiempo. o.velas 'pocas' (por omisión: el foque y la contrafoque, la gavia baja que bate, los jirones de la vela
//     de trinquete y la gavia alta arrancadas, la cangreja aferrada en la botavara) | 'todas' (todo el trapo hinchado:
//     trinquete, dos gavias, juanete, cangreja con escandalosa, tres foques y dos velas de estay). El cielo en tres capas
//     de nubes que corren, cortinas de chubasco lejanas, una bandada de pardelas que pasa rasando las olas, mar con
//     trenes de olas, borreguitos que nacen y se deshacen, vetas de espuma, la ola de proa con rociones cuando la proa
//     cae, la estela, el reflejo, y en primer plano la loma de una ola grande con su encaje de espuma. o.isla true: la
//     isla de Santa María, azulada, en el horizonte a la izquierda; o.deiGratia 0–1: el Dei Gratia (casco verde) que
//     se acerca por el horizonte de la izquierda (0 no está, 1 ya cerca). Nadie a bordo. Devuelve suelo 180, libre
//     [0, 0], horizonte 96, barco: [x, y] (el centro del casco, se mueve), proa: [x, y], popa: [x, y], y la proyección del
//     barco en este instante: proy(dx, dy, dz) → [x, y] (dx a lo largo de la eslora, popa −62, roda 66; dy hacia arriba
//     negativo; dz de banda a banda), cubierta(dx) → [x, y] (la línea de cubierta: ahí pisan los pies de quien va a bordo)
//     y yd(dx) (la altura de la cubierta en el casco, la b_yd del canon).
//     Cámara 'timon': LA POPA DESDE CUBIERTA, a la escala de los personajes: en primer plano a la derecha la RUEDA
//     DEL TIMÓN (ocho cabillas con sus puños, aro doble, cubo de latón) sobre su caja de gobierno, que gira sola de un lado a otro
//     (o.giro: el ángulo en radianes; por omisión, a tirones con el oleaje); a la izquierda la pared de la caseta del
//     camarote con sus dos ventanillas (se ve el mar reflejado y la cortina), la bitácora con su cúpula de latón y la
//     rosa que oscila; detrás, la regala de popa con sus candeleros y el cabillero, y por encima el mar que sube y baja
//     y se inclina con el balanceo, la ESTELA que se aleja hacia el horizonte, gaviotas; arriba, la botavara con la
//     cangreja aferrada que se mece y la escota con sus motones; un cabo suelto que se balancea; en cubierta, una aduja,
//     un balde que se mece, los imbornales y el agua que corre de banda a banda. La regala y la caseta (baja) están a la
//     escala de los personajes; la rueda NO: es un primer plano más grande, y nadie la coge (gira sola). marDelante
//     vuelve a pintar la rueda (va delante de los personajes). Devuelve suelo 168, libre [20, 150], rueda: [x, y] (el
//     cubo), bitacora: [x, y] (la base), caseta: [x0, y0, x1, y1], regala: y, horizonte (el de este instante).
//   'encuentro': DESDE LA CUBIERTA DEL DEI GRATIA (casco verde): la regala de estribor de lado a lado (por dentro,
//     color crema, con candeleros, cabillero con cabillas y adujas colgadas, imbornales), el trinquete a la izquierda con
//     su fogonadura y su cabillero, los obenques con flechastes que bajan a la regala, la COFA arriba con el VIGÍA
//     pequeño que mira con su catalejo; banderas de señales que suben por una driza (o.banderas 0–1; colores lisos, a
//     cuadros y en dos mitades, un gallardete; sin letras); lejos, en el horizonte, el Mary Celeste pequeño dando
//     bandazos (se lee por la franja blanca y las velas). La cubierta se mece (el horizonte sube y baja). Gaviotas.
//     Devuelve suelo 166, libre [40, 240], lejos: [x, y] (el Mary Celeste), regala: y (la altura del pasamanos, a la
//     cintura de quien se acerca a ella), cofa: [x, y]. marDelante: una aduja (x 4–40) y un balde (x 258–284) en las
//     esquinas de abajo. Cámara 'catalejo': LO QUE SE VE POR EL CATALEJO: un círculo con su aro de latón y viñeta, la
//     copa moleteada del ocular con sus reflejos (que se corren con el pulso, un destello que va y viene y la luz fría
//     que se cuela por el otro lado) y fuera la penumbra con tono, no negra: el gris del cielo arriba y el verde de la
//     borda abajo, borrosos, que se apagan hacia las esquinas, con grano y un reflejo interior del tubo; dentro el Mary Celeste de cerca y desde arriba: la cubierta vacía, las escotillas abiertas con sus
//     tapas tiradas, el hueco del bote con las trincas sueltas, la rueda suelta, las velas que baten; la imagen se mece
//     con el oleaje (o.pulso: cuánto, 1 por omisión). Devuelve circulo: [cx, cy, r], barco: [x, y].
//   'mapa': EL MAPA DEL VIAJE sobre la mesa de cartas (madera con vetas): una carta náutica antigua del Atlántico Norte
//     en papel amarillento con su pliegue en cruz, manchas y una esquina doblada; costas en tinta con las líneas de agua,
//     tierras ocres con montes, la cuadrícula de grados con sus números, la rosa de los vientos (sin letras) con sus
//     rumbos, una escala con números y un barquito dibujado. Nueva York a la izquierda, las Azores en medio (Santa María
//     marcada), Portugal y Gibraltar a la derecha, Génova arriba a la derecha. Encima, la regla paralela (sobre África),
//     el compás de puntas (sobre Norteamérica) y la lámpara de aceite (abajo a la derecha) que se mece y tiñe la carta
//     con su luz; lo que se mueve solo: las olas en la costa (una franja de agua que sale de la tierra y la espuma que
//     brilla), las olitas de tinta del mar abierto, una ballena de tinta que asoma y sopla, y la luz de la lumbrera (seis
//     cristales con su cruceta) que se mece sobre la carta, se apaga cuando pasan nubes y la cruzan sombras de gaviotas;
//     la esquina de Atom, papel y madera lisos. o.ruta 0–1: la línea de
//     puntos del Mary Celeste (azul de tinta) que avanza desde Nueva York con un barquito negro en la punta; o.ruta2 0–1:
//     la del Dei Gratia (roja, con barquito verde), ocho días detrás, que sigue hasta Gibraltar; o.deriva 0–1: desde
//     Santa María, la línea a trazos de nueve días SIN NADIE con nueve marcas hasta el encuentro y su círculo, y una
//     TIRA AMPLIADA pegada en la carta (x 112–252, y 124–142, unida con dos líneas a Santa María y al encuentro) donde
//     los nueve días aparecen uno a uno con su marca y su número 1–9. Para colocar los barquitos sin la tira: o.paso
//     0–1 (el del Mary Celeste a esa fracción de la deriva, de Santa María al encuentro, sin línea) u o.mc = [lon, lat]
//     (donde se diga), y o.dg = [lon, lat] (el del Dei Gratia); el colocado sustituye al de la punta de su ruta.
//     Devuelve santaMaria, encuentro, nuevaYork, gibraltar, genova: [x, y] (de la misma proyección que dibuja las
//     costas) y, si se colocan, mc / dg: [x, y].
//     Cámara 'azores': Santa María de cerca en la carta: la isla con su costa de acantilados, curvas de nivel y
//     sombreado de montes (el Pico Alto), Vila do Porto en casitas, sondas en números por el mar, la cuadrícula, el
//     borde graduado, una rosa de los vientos pequeña abajo a la derecha, el ancla del fondeadero, el cerco de una taza,
//     fibras y manchas del papel; se mueven solos las olas que rompen en la costa y se alejan en franjas, la espuma, las
//     olitas de tinta y la luz de la lumbrera (abajo a la izquierda) con sus nubes y sus gaviotas; la marca del 25 (una cruz con R.numero 25) y la línea de la deriva que se aleja con su flecha; el
//     compás de puntas que mide desde la marca (o.compas 0–1: lo que abre; por omisión mide despacio). Devuelve
//     santaMaria: [x, y], marca: [x, y], compas: [[x, y], [x, y]] (las dos puntas), cabeza: [x, y] (por encima de la
//     cabeza del compás: ahí va la mano canónica que lo sujeta, T.mano, para que no se mueva solo).
//   'bote': EL BOTE, de lejos y con respeto (o.luz 'niebla' por omisión aquí): mar ancho y tranquilo; con niebla, la mar
//     tendida en lomas largas con su cara clara y su seno, los reflejos del barco y del bote, y la niebla en capas (el banco
//     del horizonte, jirones largos y finos en el medio y de cerca, cada plano más deprisa) que deja ver el agua cercana; a la derecha el Mary Celeste que se aleja con el viento (o.aleja 0–1, 0,3 por omisión: más pequeño, más
//     lejos y más velado; en 1 se ha perdido en la niebla: el horizonte vacío); a la izquierda el bote salvavidas con
//     diez siluetas pequeñísimas sentadas y quietas (sin caras) y un remo (o.boteAleja 0–1, 0 por omisión: el bote se
//     va hacia el horizonte, más pequeño y más velado); entre los dos, el CABO que los une (o.cabo 0–1, 0,2 por omisión: hasta 0,5 se tensa y vibra; en
//     0,5 se rompe; luego la punta del bote cae al agua con un chapoteo y unos anillos, y la del barco se va con él).
//     Devuelve bote: [x, y], barco: [x, y], rotura: [x, y] (dónde se parte el cabo). Cámara 'cabo': EL CABO de cerca a
//     ras de agua: la estacha de cáñamo colchada, tensa, que sale del agua chorreando y vibra; con o.cabo se deshilacha
//     (los cordones se abren y saltan fibras), en 0,5 se parte: las dos puntas saltan, una se va y la otra se hunde con
//     burbujas, espuma y gotas. Devuelve rotura: [x, y].
// Las vistas sin personajes (alta, catalejo, mapa, azores, bote, cabo) devuelven libre [0, 0].
const V_MAR = {
  alta: { cam: 'timon', general: { col: ['#8a98a8', '#2a4a64'], geo: { suelo: 180, libre: [0, 0], horizonte: 96, barco: [158, 133], proa: [266, 107], popa: [96, 122] } }, timon: { col: ['#8a98a8', '#c8a878'], geo: { suelo: 168, libre: [20, 150], rueda: [226, 112], bitacora: [140, 160], caseta: [0, 102, 104, 158], regala: 124, horizonte: 78 } } },
  encuentro: { cam: 'catalejo', general: { col: ['#8a98a8', '#2a4a64'], geo: { suelo: 166, libre: [40, 240], lejos: [222, 87], regala: 138, cofa: [18, 34], horizonte: 92 } }, catalejo: { col: ['#1c1a20', '#2a4a64'], geo: { suelo: 180, libre: [0, 0], circulo: [160, 92, 70], barco: [160, 120] } } },
  mapa: { cam: 'azores', general: { col: ['#e8d8a8', '#6a4a30'], geo: { suelo: 180, libre: [0, 0], santaMaria: [183, 107], encuentro: [206, 101], nuevaYork: [36, 91], gibraltar: [242, 110], genova: [285, 75] } }, azores: { col: ['#e8d8a8', '#6a4a30'], geo: { suelo: 180, libre: [0, 0], santaMaria: [128, 118], marca: [176, 68], compas: [[176, 68], [220, 58]], cabeza: [200, 44] } } },
  bote: { cam: 'cabo', general: { col: ['#b8c0c8', '#4a6e8a'], geo: { suelo: 180, libre: [0, 0], bote: [76, 136], barco: [248, 112], rotura: [145, 120], horizonte: 98 } }, cabo: { col: ['#4a6e8a', '#2a4a64'], geo: { suelo: 180, libre: [0, 0], rotura: [160, 100], horizonte: 44 } } },
};
export function mar(R, t, o = {}) {
  const v = b_resuelve(o), geo = B_VISTAS[v.enc + '.' + v.cam](R, t, o, v.luz);
  return { encuadre: v.enc, camara: v.cam, luz: v.luz, ...JSON.parse(JSON.stringify(V_MAR[v.enc][v.cam].geo)), ...geo };
}
// lo de delante de los personajes en cada encuadre de mar(); se llama después de los actores, con las mismas opciones:
// en 'alta' con cámara 'timon', la rueda del timón otra vez (está en primer plano); en 'encuentro', la aduja y el balde
// de las esquinas de abajo; en los demás, nada. Devuelve {}.
export function marDelante(R, t, o = {}) {
  const v = b_resuelve(o);
  if (v.enc === 'alta' && v.cam === 'timon') b_rueda(R, t, o, b_tinte(v.luz));
  else if (v.enc === 'encuentro' && v.cam === 'general') b_encuentroDelante(R, t, b_tinte(v.luz));
  return {};
}
// ── C · A bordo del Mary Celeste: la cubierta, el camarote y la bodega ───────────────────────────────────────────
// abordo(R, t, o) pinta los 320 × 180 y devuelve la geometría; LLAMA A abordoDelante(R, t, o) DESPUÉS DE LOS ACTORES,
// con las mismas opciones (la borda de delante, el baúl del camarote; en la bodega, los barriles de delante, el agua, el
// vapor y la llamarada, que así quedan por delante de los actores).
// o.encuadre 'cubierta' (por omisión) | 'camarote' | 'bodega', y o.camara 'general' o la segunda de cada encuadre.
// Opciones de todo el grupo: o.estado 'viaje' (noviembre, todo en orden: el bote atado sobre la escotilla principal, las
// escotillas cerradas, ropa tendida, humo en la chimenea de la cocina, la estufa encendida) | 'hallazgo' (por omisión: el
// 4 de diciembre: las escotillas de proa y del lazareto ABIERTAS con sus tapas tiradas en cubierta, el bote NO está (sus
// calzos vacíos y las trincas sueltas), la bomba desmontada con sus piezas en cubierta, la varilla de sondeo tirada, agua
// que chapotea en el trancanil y entra por los imbornales, la vela de estay rota que flamea, cabos colgando por la borda,
// la puerta de la caseta entornada y el timón que gira solo). o.luz 'gris' (por omisión: cielo de nubes bajas y mar de
// plomo) | 'dia' (cielo azul con nubes blancas, mar azul).
//   'cubierta': LA CUBIERTA vista desde lo alto, de costado, del palo trinquete (a la izquierda, a toda altura) a la popa
//     (a la derecha): el cielo tramado con nubes de tres tonos a tres velocidades y gaviotas, el mar que sube y baja y el
//     horizonte que se inclina (el barco se mece); a lo lejos el Dei Gratia (hallazgo) o una goleta (viaje); la borda del
//     otro costado con su regala, candeleros, cabilleros con adujas, imbornales, el portalón y las vigotas de los obenques
//     de los dos palos (con sus flechastes); la vela de estay entre los dos palos (aferrada en el viaje, rota y flameando en
//     el hallazgo); una cuba, la escotilla de proa, la escotilla principal (con el bote, una yola gris, en el viaje), el
//     palo mayor con la botavara y la cangreja aferrada, la bomba a su pie, la caseta de madera del camarote (puerta de
//     cuarterones, dos ventanillas, lumbrera y chimenea con humo en el viaje), la rueda del timón con su bitácora, la
//     escotilla del lazareto, un cubo y adujas; ropa tendida (viaje); una gaviota que pasea por la regala. Devuelve suelo 150, libre [40, 280], hueco: [x0, y0, x1, y1] (el
//     del bote), bomba: [x, y], escotillas: [[x, y] proa, [x, y] lazareto], principal: [x, y] (la escotilla del bote),
//     borda: [x, y] (por dónde se sube: el portalón de la borda de enfrente; quien sube asoma detrás de la regala y se
//     planta en y 100; con o.subida, abordoDelante repinta ese trozo de borda por delante), regala: y (la de enfrente),
//     rueda: [x, y], puerta: [x0, y0, x1, y1] (la de la caseta), varilla: [x0, y0, x1, y1] (tirada, en el hallazgo).
//     Cámara 'bomba': LA BOMBA Y LA VARILLA de cerca, vistas desde arriba sobre las tablas calafateadas: la escotilla
//     abierta (con los barriles en la oscuridad), su tapa tirada, LA BOMBA DESMONTADA: el cuerpo de madera en su sitio
//     (x 191–225, y 22–61) con la boca ABIERTA (el cuello de hierro, los agujeros de los pernos vacíos y el agua que
//     brilla al fondo del pozo), el caño que gotea en un charquito (205, 62), la tapa de hierro quitada boca abajo al lado
//     (248, 53) y, EN FILA sobre una lona (esquinas (126, 76), (272, 62), (274, 84), (128, 98); su esquina libre la
//     levanta el viento), la palanca, el émbolo con su cuero, la válvula, la varilla de la bomba, los pernos con sus
//     tuercas y la llave; la caja de herramientas abierta (148, 33); la varilla de sondeo con una marca y un número cada
//     pie (R.numero), seca y clara arriba y LA PARTE MOJADA (más de tres pies) azulada y brillante, con la línea del agua,
//     gotas que se forman y caen y la mancha mojada en las tablas; su cabo hasta la aduja; un cubo volcado, y el agua que entra por los
//     imbornales de la borda (abajo), corre en charcos que tiemblan y refleja el cielo. Devuelve suelo 176, libre [0, 0],
//     varilla: [x0, y0, x1, y1] (de la punta mojada a la anilla), mojado: [x, y] (dónde acaba la parte mojada).
//   'camarote': EL CAMAROTE DEL CAPITÁN: el techo de baos, paredes de paneles barnizados con su zócalo, dos ventanillas
//     por las que se ve el mar subir y bajar (recortado) y su luz que se mueve por la pared y el suelo, la lámpara de
//     aceite colgada que se balancea y alumbra, el ARMONIO de Sarah con su partitura y su banqueta, la caja del
//     cronómetro abierta encima (vacía en el hallazgo), los estantes con libros y el soporte del sextante (vacío en el
//     hallazgo), el reloj de pared con su péndulo, la mesa con mantel y sus dos sillas, el DIARIO DE A BORDO (canon) y el
//     tintero, la MÁQUINA DE COSER de pedal con un vestidito azul a medio coser, la litera con su cortina y su colcha, el
//     caballito de madera que se mece y la muñeca de trapo SIN cara; alfombra; entre los baos la percha de las cartas
//     enrolladas y la brújula acusica colgada que oscila; el chubasquero y el sueste en sus perchas (se mecen), el
//     catalejo de latón en sus soportes con el cordón de la campanilla, y en el suelo las botas de agua y un rollo de cabo. o.te 0–1 (el gag 4): sobre la mesa aparece
//     una taza humeante recortada de un periódico (borde irregular y renglones) y con o.te > 0,6 se va borrando de
//     izquierda a derecha (la goma la pone la escena) hasta dejar solo migas de goma. Devuelve suelo 160, libre [30,
//     250], mesa: [x0, y0, x1, y1], diario: [x, y], taza: [x, y], armonio: [x, y], maquina: [x, y], litera: [x, y],
//     ventanas: [[x0, y0, x1, y1], …]. Cámara 'diario': EL DIARIO DE CERCA (canon) sobre la mesa de caoba: las dos
//     páginas con columnas de números (el día, el rumbo, las millas: R.numero) y renglones sin letras; la izquierda, del
//     14 al 24; la derecha, la última fila con el 25 y debajo la página en blanco, con la isla de Santa María dibujada al
//     margen; o.pagina 0–1 (por omisión 1): la hoja anterior pasa de derecha a izquierda (por delante, la salida de Nueva
//     York y los días 7–13; por detrás, 14–24), y mientras pasa, a la izquierda se ve el manifiesto de carga con su suma de
//     1701 barriles; un dedo de luz de la ventanilla
//     que va y viene con el balanceo, la esquina de la hoja que levanta el aire; el tintero, la pluma, el compás de
//     puntas, la regla y el salvadera alrededor. Devuelve fila: [x, y] (el 25), isla: [x, y], libre [0, 0].
//   'bodega': LA BODEGA en perspectiva hacia proa: las cuadernas en arcos que se alejan, el forro, los baos y la escotilla
//     abierta (arriba a la derecha) con un haz de luz y motas, la escala que baja, el farol colgado que se mece, filas de
//     BARRILES (canon: roble blanco, y los nueve de roble rojo que rezuman) tumbados y calzados con cuñas a los dos lados,
//     cada vez más pequeños y oscuros al fondo, sujetos con trincas de cabo, el pasillo libre en el centro con paja
//     de estiba y charquitos que brillan, el pie del palo mayor (x 144–153, y 39–136) con los tubos de las bombas, un
//     rollo de cabo colgado, el aparejo de carga que se mece junto a la escotilla y un farolito al fondo que parpadea, y el agua del fondo (o.agua 0–1: de nada a
//     más de un metro, y = 178 → 148, con reflejos que se mueven y la fila de abajo medio cubierta); gotas que caen de la
//     cubierta. o.vapor 0–1: un velo de vapor de alcohol que tiembla y deforma lo de detrás (ondas de calor); o.llama 0–1:
//     una LLAMARADA AZUL fugaz (sube hasta 0,3, llena la bodega y se apaga hacia 1) que no quema nada: luz azul, un manto
//     de llama bajo los baos, lenguas de llama azul por el aire y un temblor. EL AGUA, EL VAPOR Y LA LLAMA LOS PINTA
//     abordoDelante, por delante de los actores (que quedan dentro del agua y de la luz azul). Devuelve suelo 170 (con
//     o.agua > 0,25, agua + 11: los actores con el agua por la cintura; 159 con o.agua 1), libre [60, 220], escala: [x,
//     yArriba, yPie], agua: y, farol: [x, y], escotilla: [x0, y0, x1, y1]. Cámara 'varilla': LA VARILLA DE SONDEO DE CERCA: entre barriles grandes, el tubo de sondeo de madera
//     abierto por delante; la varilla de hierro (marca y número cada pie) baja hasta el fondo, mide y sube goteando con la
//     parte mojada oscura y brillante (o.sonda 0–1: baja hasta 0,35, mide hasta 0,5, sube hasta 0,8); el gag 6: con
//     o.sonda > 0,8 un pececito salta del agua y vuelve a caer con su chapoteo y sus ondas. Devuelve marca: [x, y] (el
//     final de la parte mojada), punta: [x, y], agua: y, libre [0, 0].
const V_ABORDO = {
  cubierta: { cam: 'bomba', general: { col: ['#8a98a8', '#c8a878'], geo: { suelo: 150, libre: [40, 280], hueco: [112, 88, 190, 110], bomba: [197, 106], escotillas: [[55, 110], [261, 133]], principal: [151, 111], borda: [48, 100], regala: 76, rueda: [310, 92], puerta: [234, 94, 249, 126], varilla: [52, 145, 98, 139] } }, bomba: { col: ['#c8a878', '#9a7a52'], geo: { suelo: 176, libre: [0, 0], varilla: [44, 128, 272, 98], mojado: [127, 117] } } },
  camarote: { cam: 'diario', general: { col: ['#7a5034', '#4a2e1a'], geo: { suelo: 160, libre: [30, 250], mesa: [106, 112, 214, 138], diario: [152, 112], taza: [190, 110], armonio: [28, 104], maquina: [240, 108], litera: [294, 104], ventanas: [[53, 39, 79, 61], [215, 39, 241, 61]] } }, diario: { col: ['#efe6d0', '#6a4428'], geo: { suelo: 180, libre: [0, 0], fila: [171, 41], isla: [240, 76] } } },
  bodega: { cam: 'varilla', general: { col: ['#3a2a1c', '#1a3048'], geo: { suelo: 170, libre: [60, 220], escala: [203, 18, 170], agua: 178, farol: [96, 44], escotilla: [184, 0, 236, 18] } }, varilla: { col: ['#3a2a1c', '#1a3048'], geo: { suelo: 180, libre: [0, 0], marca: [160, 40], punta: [160, 84], agua: 128 } } },
};
export function abordo(R, t, o = {}) {
  const v = c_vista(o), g = V_ABORDO[v.enc][v.cam].geo;
  const extra = c_PINTA[v.enc + '.' + v.cam](R, t, o, v) || {};
  return { encuadre: v.enc, camara: v.cam, ...JSON.parse(JSON.stringify(g)), ...extra };
}
// lo de delante de los personajes en cada encuadre de abordo(); se llama después de los actores, con las mismas opciones
export function abordoDelante(R, t, o = {}) {
  const v = c_vista(o), f = c_DELANTE[v.enc + '.' + v.cam];
  return f ? f(R, t, o, v) || {} : {};
}
// ── D · Gibraltar, diciembre de 1872 a abril de 1873 ─────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A gibraltarDelante DESPUÉS DE LOS ACTORES (con las mismas opciones).
//   'bahia': LA BAHÍA DE GIBRALTAR en una mañana de invierno: cielo tramado con nubes de tres tonos a tres velocidades
//     (el levante las lleva hacia la izquierda) y el sol bajo a la izquierda (70, 44); al fondo, las sierras de España en
//     la bruma; a la derecha el PEÑÓN (x 150–319, cumbre en (194, 25); a partir de x 270 la cresta baja de y 50, así la
//     esquina de Atom queda en cielo): caliza clara con estratos, grietas, barrancos en sombra y matorral que se espesa
//     hacia abajo, las galerías del asedio en la cara norte, la torre del castillo moro, la ciudad blanca de tejados rojos
//     escalonada con la catedral, chimeneas que humean, la muralla del puerto con sus cañones y el baluarte con la bandera
//     que ondea; en el agua (y 110–147, con el reflejo del Peñón que tiembla y el brillo del sol), un buque de guerra de
//     vapor y vela fondeado (x 228–300) con su humo, un velero lejano, dos falúas que cruzan y un bote de remos con dos
//     remeros; el MUELLE de losas en primer término (arista en y 147; de pie en suelo 160) con dos bolardos (34 y 204),
//     charcos que reflejan el cielo, toneles, un farol y gaviotas (una posada en el bolardo de la izquierda). El MARY
//     CELESTE (canon, eslora 150 px, proa a la derecha, sin el bote) entra con o.llega 0–1 (0: fuera por la izquierda;
//     llega con las velas a medio largar y la ola en la proa, las recoge y amarra; 1, por omisión: amarrado, con las
//     amarras a los bolardos), con TRES MARINEROS pequeños del Dei Gratia a bordo (o.marineros, 3 por omisión: uno al
//     timón, uno en el combés y otro en la proa que saluda al amarrar). Devuelve suelo 160, libre [20, 240], muelle: [x, y]
//     (el punto de amarre, en la arista), barco: [x, y] (el centro de su flotación ahora), cubierta: y de la regala,
//     bolardos: [[x, y], [x, y]]. Delante: las cajas apiladas de la derecha (x 262–319) y una adujada de cabo con su
//     bolardo abajo a la izquierda (x 0–18).
//     Cámara 'barco': EL MARY CELESTE AMARRADO DE CERCA bajo el Peñón (eslora 210 px, proa en x 300, regala en y ≈ 121,
//     flotación 146, los palos en x 170 y 237): detrás, la cara del Peñón enorme (la cumbre se sale por arriba entre x 190
//     y 255; la esquina de Atom y la barra del año quedan en cielo), la ciudad y la muralla; a la izquierda, el muelle del
//     fondo con la garita y un CENTINELA DE CASACA ROJA pequeño que hace la ronda (x 24–72, y 134); el CORDÓN DE PRECINTO:
//     postes con remate de latón (x 24, 72, …, 312) y una cuerda con trapos rojos que se mece, entre los personajes y el
//     casco; defensas de cabo colgadas del costado, las amarras a dos bolardos y una gaviota en un poste; en la amura, los
//     CORTES DE LA PROA: dos muescas largas en la madera negra que dejan ver la madera clara (o.cortes 0–1: un círculo de
//     tiza se dibuja a su alrededor). Devuelve suelo 166, libre [20, 200], proa: [x, y] (el centro de los cortes),
//     centinela: [x, y]. Delante: un bolardo con su amarra y una adujada (abajo a la derecha, x 292–319).
//   'tribunal': LA SALA DEL TRIBUNAL DEL VICEALMIRANTAZGO, 1873: techo alto de yeso (tranquilo bajo la barra del año),
//     cornisa con dentículos, pared con cenefa, dos VENTANALES de medio punto a la izquierda (x 12–46 y 58–92, y 34–96)
//     con cortinas de terciopelo y luz de invierno (por ellos se ven el Peñón, los tejados y nubes que pasan; recortado)
//     que cae en haces sobre el suelo; en el centro, el DOSEL de caoba con terciopelo rojo y el ESCUDO REAL insinuado
//     (corona, cuarteles, león y unicornio como formas, cinta sin letras) y el ESTRADO (x 132–232, tapa en y 89) con el
//     JUEZ pequeño de peluca blanca y toga roja que escribe y mira a un lado y a otro; la mesa del escribano debajo (x
//     150–214) con el escribano que moja la pluma; lámparas de gas en la pared y una araña de gas colgada (x 196), con
//     llamas que tiemblan; a la derecha, un reloj de pared con su péndulo (246, 58) y un armario de casilleros con
//     LEGAJOS atados con cinta roja (x 258–316, y 64–132), una mesita con jarra y vasos (x 262–312); a la izquierda, la
//     barandilla del público con siete espectadores pequeños (uno dormita, una se abanica, un dibujante de periódico
//     dibuja); suelo de tablas con una alfombra de pasillo y motas de polvo en la luz. En el centro, LA MESA DE LAS
//     PRUEBAS (tablero en y 141–146 con paño verde, patas hasta y 159): la ESPADA en su vaina, el diario de a bordo
//     abierto, una lupa pequeña, un legajo con cinta roja y un tintero. Sitio para sollyfloodMC de pie a la izquierda de la
//     mesa (x ≈ 112, suelo 158) y para deveauMC detrás del banco de delante (x ≈ 60). o.pago 0–1: al final, un saquito de
//     monedas pequeño (5 × 5 px) entra por la derecha de la mesa y se desliza hasta x ≈ 146, con un destello. o.juez
//     (false: el estrado vacío). Devuelve suelo 158, libre [30, 260], mesa: [126, 141, 222, 159], espada: [x, y],
//     banco: [x0, x1] (dónde se pone quien se sienta), juez: [x, y], bolsa: [x, y] (dónde está el saquito). Delante: el
//     banco del público de delante (x 20–106, respaldo en y 151–172: de un personaje de pie en x 30–96 asoman cabeza y
//     hombros) y, con o.mesaDelante, la mesa de las pruebas (para quien se ponga detrás de ella).
//     Cámara 'espada': LA ESPADA DE CERCA sobre la mesa: arriba, la sala desenfocada (y 0–30, tranquila); el tablero de
//     caoba con vetas, la carpeta de piel verde con su filete dorado, el diario de a bordo abierto (renglones sin letras),
//     un legajo atado con cinta roja, el tintero con su pluma y la vaina negra con sus contera y brocal de latón; LA ESPADA
//     cruzada (empuñadura a la izquierda, punta en x 296, y ≈ 100) con un brillo que recorre la hoja y las MANCHAS PARDAS
//     hacia el centro (x 150–206); motas de polvo en la luz. o.lupa [x, y] (por omisión, sobre las manchas; null: sin
//     lupa): una LUPA ENORME (r 28) de aro de latón que aumenta al doble lo que hay debajo, con su sombra en la mesa y el
//     mango hacia abajo a la derecha: la escena pone la mano canónica en mango (T.mano(R, x, y, 1, manga)). El gag 5:
//     o.sopla 0–1: de las manchas sale una nubecilla de ÓXIDO naranja que sube, se abre y se deshace (la escena pone el
//     estornudo). o.analisis 0–1: entra por la derecha una gradilla con un tubo de ensayo con líquido claro; cae una
//     escama parda, burbujea y el líquido NO cambia de color (no es sangre). Devuelve suelo 180, libre [0, 0], manchas:
//     [x, y], lupa: [x, y, r], mango: [x, y], frasco: [x, y].
const V_GIBRALTAR = {
  bahia: { cam: 'barco', general: { col: ['#b8d0e8', '#d8cca8'], geo: { suelo: 160, libre: [20, 240], muelle: [118, 147] } }, barco: { col: ['#b8d0e8', '#2a4a64'], geo: { suelo: 166, libre: [20, 200], proa: [284, 134], centinela: [48, 134] } } },
  tribunal: { cam: 'espada', general: { col: ['#c8b898', '#5a3a24'], geo: { suelo: 158, libre: [30, 260], mesa: [126, 141, 222, 159], espada: [176, 142], banco: [30, 96] } }, espada: { col: ['#5a3a24', '#3a2416'], geo: { suelo: 180, libre: [0, 0], manchas: [178, 101] } } },
};
export function gibraltar(R, t, o = {}) {
  const v = d_vista(o), extra = d_PINTA[v.enc + '.' + v.cam](R, t, o) || {};
  return { encuadre: v.enc, camara: v.cam, ...JSON.parse(JSON.stringify(v.geo)), ...extra };
}
// lo que va por delante de los personajes en cada encuadre de gibraltar(); se llama después de los actores
export function gibraltarDelante(R, t, o = {}) {
  const v = d_vista(o), f = d_DELANTE[v.enc + '.' + v.cam];
  return f ? f(R, t, o) || {} : {};
}
// ── E · Los laboratorios: Londres, 2006, y Mánchester, 2026 ───────────────────────────────────────────────────────
// laboratorio(R, t, o): o.encuadre 'ucl' | 'manchester' (por omisión 'ucl'), o.camara 'general' o la del encuadre.
// Lo de delante de los personajes va en laboratorioDelante (se llama después de los actores, con las mismas o).
// Detalle añadido en la pasada de decorados: 'ucl' general, una vecina con paraguas por la acera de enfrente (el autobús
// pasa por delante); 'caja', los cubos de papel en relieve (tapa, costado, solapa y sombra), la regla y el termómetro del
// fondo de la caja, la luz de arriba y la penumbra de las esquinas, el reloj (segundero) y el tablón de corcho de la pared,
// los reflejos de los tubos en el metacrilato (uno titila), y en la poyata las cerillas, el vaso con agua y una regla;
// 'manchester' general, las juntas y rozaduras del suelo y una arqueta; 'maqueta', vetas y nudos en los listones, la
// balda de frascos desenfocados, un reloj borroso con su segundero y lo que muestran las pantallas (curva y barras).
//   'ucl' (2006): EL LABORATORIO DE QUÍMICA DEL UCL: techo de placas, pared pintada de verde crema con alicatado blanco
//     detrás de las poyatas; a la izquierda la CAMPANA DE GASES (x 2–74: el ventilador que gira, el manómetro, dentro un
//     soporte con un matraz que borbotea y frascos; el cristal de guillotina a medio subir con sus reflejos); la PIZARRA
//     BLANCA (x 82–168, y 24–66) con «fórmulas» sin letras (la molécula de palitos del alcohol, el triángulo del fuego
//     con sus iconos, una caja con cubos, flechas, 78° y 1701); la VENTANA de guillotina (x 176–248, y 22–86) con
//     Londres bajo la lluvia: ladrillo amarillo de enfrente con ventanas que se encienden, nubes grises de tres tonos a
//     tres velocidades, lluvia y gotas que resbalan, un autobús rojo de dos pisos que pasa, una paloma en el alféizar;
//     un reloj de pared, baldas con frascos de colores; en la poyata del fondo (alicatada, puertas de teca), un tubo
//     de gas amarillo con llaves de latón, la gradilla, el agitador con su vaso (el remolino gira), la pila con el grifo
//     que gotea, la balanza, un paquete de folios, una radio con su ecualizador, el extintor en el suelo; suelo de
//     linóleo con la luz de la ventana. En el centro, la POYATA (x 92–222, tablero en y 141, de pie hasta el suelo) con
//     la MAQUETA DE LA BODEGA (x 108–208, y 109–141): caja de madera y metacrilato, la tapa de la escotilla arriba, dentro
//     tres filas de CUBOS DE PAPEL blancos y la bombona de butano con su tubo; el pulsador de la chispa (x 99) y el
//     cronómetro (x 216) sobre la poyata; en el suelo, rozaduras, el sumidero, el cable del pulsador al enchufe, una caja de
//     cartón con cubos de repuesto (x 252–289, base en y 149, detrás de los pies) y la papelera de pedal (x 297–317).
//     o.fuego 0–1 (el gag 7): chispa (0,02), la llamarada AZUL avanza de izquierda a
//     derecha y llena la caja (0,08–0,4), la tapa salta un poco (0,15–0,5) y se apaga (0,45–0,85); ilumina de azul la
//     poyata; motas azules que suben y se apagan; los cubos quedan blancos. sellaMC va a la derecha de la poyata (x 228).
//     Delante (laboratorioDelante): un taburete de laboratorio en la esquina de abajo a la izquierda (x 2–30).
//     Devuelve suelo 158, libre [30, 250], zonas [[30, 76], [224, 250]] (de pie sin pisar la poyata), maqueta, banco,
//     sella [228, 158] (a la derecha), junto_boton [77, 158] (a la izquierda, junto al pulsador), boton, tapa (donde está
//     ahora), cronometro, ventana, pizarra, campana.
//     Cámara 'caja': LA MAQUETA DE CERCA, a la altura de los cubos: el marco de madera (x 36–284, y 50–160) con sus
//     tornillos, el metacrilato con reflejos y arañazos, el fondo de tablas oscuras, TRES FILAS DE CUBOS en perspectiva
//     (x 80–240), la bombona azul (x 44–64) con su tubo y los electrodos de la chispa; arriba, la tapa de la escotilla;
//     detrás, desenfocado: la pared alicatada con el tubo de gas, la balda de frascos (x 196–270), el borde de la ventana
//     con lluvia, la campana de gases a la izquierda y las puertas de teca y el extintor a los lados; delante, la poyata
//     alicatada con el cuaderno de renglones, las gafas y el cronómetro que corre. Vida en reposo: un brillo que recorre
//     el metacrilato y una mosca que pasea por fuera (se va al arder). o.fuego como arriba (la chispa salta en la
//     boquilla, la tapa salta más, la luz azul tiñe los cubos mientras arde y quedan blancos; motas azules que se
//     apagan). Devuelve suelo 180, libre [0, 0], cubos, caja, tapa, bombona, chispa (la boquilla), cronometro.
//   'manchester' (2026): EL LABORATORIO DE HOY: techo oscuro de instalaciones con tiras de LED (x 196–272), a la
//     izquierda un TABIQUE DE CRISTAL (x 0–96) con la banda de puntos y, detrás, el pasillo blanco por donde pasa gente;
//     pared de listones de roble con DOS PANTALLAS (x 104–156 y 164–216, y 30–62): la curva de temperatura que sube con
//     o.calor, con los grados, y la imagen de la cámara rápida (con el pico del estallido); el brazo de extracción
//     articulado que baja del techo, con su campana (x 177–199, y 68–79) aparcada junto a la maqueta y su cinta que ondea;
//     poyatas negras al fondo con cajoneras grises (un portátil con su gráfica, el registrador
//     de datos con sus luces, la garrafa de etanol, frascos); el ARMARIO DE INFLAMABLES amarillo (x 262–306); suelo de
//     resina pulida con reflejos, la cinta amarilla y negra del área de ensayo (y 164–176), el sumidero, la canaleta del
//     cable y el contenedor de residuos rojo (x 296–316). En el centro, la MESA de acero con
//     tablero negro (x 100–214, tablero en y 142) y encima la PLACA CALEFACTORA (x 124–192) con su pantalla y su mando,
//     y la MAQUETA DE MADERA del barco (el casco canon en pequeño, 80 px, x 118–202: casco negro con la franja blanca y
//     la obra viva roja, cubierta de tablas, la caseta de popa con dos ventanillas, los muñones de los dos palos, el
//     bauprés y la ESCOTILLA en el centro con su tapa) sobre dos calzos; a su derecha el TERMÓMETRO grande de vidrio
//     (x 206–212, y 80–140) en su soporte; a la derecha la CÁMARA DE ALTA VELOCIDAD en trípode (x 228–266) con su luz
//     roja. o.calor 0 (frío de Nueva York: columna abajo, azul; la placa apagada) … 1 (calor de las Azores: la columna
//     sube y se vuelve roja, la placa brilla, sube aire caliente y la maqueta tiembla); o.grados [frío, calor] (por
//     omisión [41, 77], ilustrativos, sin unidad: los muestran la pantalla y la placa); o.chispa 0–1 (un chispazo en la escotilla: con frío no
//     pasa nada más); o.estalla 0–1: estallido sordo, fogonazo azul breve que sale de la escotilla, la TAPA SALTA por el
//     aire dando vueltas y vuelve a caer en su sitio; la madera queda limpia. rowbothamMC y mairMC van detrás de la
//     MAMPARA (x 46–100), que pinta laboratorioDelante encima de ellos (transparente, sin reflejos a la altura de las
//     caras). Devuelve suelo 158, libre [30, 260], zonas [[4, 44], [48, 96], [214, 226], [268, 282]], maqueta, escotilla
//     [x0, x1, y], tapa (donde está ahora), termometro, mampara, quimicos [[54, 158], [76, 158]], tripode, placa, mesa.
//     Cámara 'maqueta': LA MAQUETA DE CERCA (casco de 196 px, x 52–262): las tablas del casco, la franja, la obra viva,
//     la cubierta, la caseta, la rueda del timón, los muñones con sus zunchos, la escotilla (x 148–175); sobre la placa con su
//     brasa; el termómetro (x 276–286) con la LECTURA (R.numero con los grados, sin unidad: o.grados [frío, calor],
//     por omisión [41, 77], ilustrativos) en un visor; detrás, el laboratorio desenfocado (luces en círculos, pantallas,
//     la mampara); el tablero negro refleja el casco; delante, la caja del encendido con su piloto, la tableta con su curva
//     que corre, un bolígrafo y las gafas. Vida en reposo: el piloto, la tableta, dos luces del fondo que laten, motas de
//     polvo y la columna que respira. o.calor, o.chispa y o.estalla como arriba, con la tapa que sube a cámara lenta
//     (hasta ~32 px, girando, con su estela) y el fogonazo, todo por debajo del año; el casco limpio, sin hollín.
//     Devuelve suelo 180, libre [0, 0], maqueta, escotilla, tapa (donde está ahora), termometro, lectura.
// LA GEOMETRÍA de los cuatro encuadres (la misma que devuelve laboratorio(); los actores: x es su borde izquierdo y
// miden 15 px de ancho y ~25 de alto, con los pies en el suelo; zonas: los tramos de x donde caben de pie sin pisar
// muebles; col: los dos colores del antiguo relleno provisional)
const V_LAB = {
  ucl: { cam: 'caja',
    general: { col: ['#e8ecee', '#c8ccd0'], geo: { suelo: 158, libre: [30, 250], zonas: [[30, 76], [224, 250]], maqueta: [108, 109, 208, 141], banco: [92, 141, 222, 157], sella: [228, 158], junto_boton: [77, 158], boton: [99, 135], tapa: [158, 108], cronometro: [216, 137], ventana: [176, 22, 248, 86], pizarra: [82, 24, 168, 66], campana: [2, 22, 74, 128] } },
    caja: { col: ['#e8ecee', '#8a6a48'], geo: { suelo: 180, libre: [0, 0], cubos: [80, 100, 244, 150], caja: [36, 50, 284, 160], tapa: [160, 47], bombona: [55, 128], chispa: [81, 106], cronometro: [262, 168] } } },
  manchester: { cam: 'maqueta',
    general: { col: ['#d8dce0', '#2a2c30'], geo: { suelo: 158, libre: [30, 260], zonas: [[4, 44], [48, 96], [214, 226], [268, 282]], maqueta: [118, 98, 202, 136], escotilla: [157, 168, 109], tapa: [163, 108], termometro: [206, 78, 212, 141], mampara: [46, 86, 100, 158], quimicos: [[54, 158], [76, 158]], tripode: [228, 100, 268, 158], placa: [124, 133, 192, 142], mesa: [100, 142, 214, 158] } },
    maqueta: { col: ['#d8dce0', '#2a2c30'], geo: { suelo: 180, libre: [0, 0], maqueta: [50, 46, 262, 141], escotilla: [148, 175, 78], tapa: [162, 76], termometro: [275, 50, 287, 156], lectura: [295, 93, 317, 107] } } },
};
export function laboratorio(R, t, o = {}) {
  const enc = V_LAB[o.encuadre] ? o.encuadre : 'ucl', cam = o.camara === V_LAB[enc].cam ? V_LAB[enc].cam : 'general';
  const geo = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(V_LAB[enc][cam].geo)) };
  if (enc === 'ucl' && cam === 'general') { e_fijo(R, 'ucl', () => e_uclFondo(R)); geo.tapa = e_uclVida(R, t, o); }
  else if (enc === 'ucl') { e_fijo(R, 'caja', () => e_cajaFondo(R)); geo.tapa = e_cajaVida(R, t, o); }
  else if (cam === 'general') { e_fijo(R, 'man', () => e_manFondo(R)); geo.tapa = e_manVida(R, t, o); }
  else { e_fijo(R, 'maq', () => e_maqFondo(R)); geo.tapa = e_maqVida(R, t, o); }
  return geo;
}
// lo que va delante de los personajes (llámala después de los actores, con las mismas opciones): en 'ucl' general, el
// taburete de la esquina; en 'manchester' general, la mampara de seguridad transparente (x 46–100, y 86–158) que tapa
// a rowbothamMC y mairMC; en las cámaras de cerca, nada. Devuelve {}.
export function laboratorioDelante(R, t, o = {}) {
  const enc = V_LAB[o.encuadre] ? o.encuadre : 'ucl', cam = o.camara === V_LAB[enc].cam ? V_LAB[enc].cam : 'general';
  if (cam !== 'general') return {};
  if (enc === 'ucl') e_taburete(R, 14, 180);
  else e_mampara(R, t, 46, 100, 86, 158);
  return {};
}
// ── F · Haití: el arrecife de Rochelais en 1885, y los buceadores de 2001 ───────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en haitiDelante (llámala después de los actores, con las mismas opciones).
//   'arrecife' (cámara 'general'): LA BAHÍA DE ROCHELAIS, HAITÍ, a mediodía: cielo tropical tramado con cúmulos de tres
//     tonos a tres velocidades, un nubarrón de lluvia tropical que descarga sobre los montes, el sol (236, 28) con su
//     camino de destellos en el agua y pelícanos que cruzan; al fondo, a la izquierda, la costa de Haití: montes azulados
//     lejanos, colinas de selva con copas en luz y sombra, la orilla de arena con palmeras pequeñas y chozas de techo de
//     paja (1885) o casitas de colores con tejado de chapa (2001); EL MAR TURQUESA: azul hondo en el horizonte (y 72) y
//     turquesa claro cerca, con su rizado; LA MANCHA OSCURA DEL ARRECIFE (cabezas de coral pardas en agua somera, x 107–283,
//     y 99–129) con la espuma que rompe a lo largo de su borde, ola a ola. EN PRIMER TÉRMINO, abajo a la izquierda, una
//     playa de arena (x 0–140) con una palmera grande que se mece, huellas, conchas, la ola que sube y baja por la arena y
//     un cangrejo que cruza; en 1885 una piragua varada; en 2001 una nevera roja y dos botellas de buceo.
//     o.epoca 1885 (por omisión): EL MARY CELESTE VIEJO (canon: casco negro con franja blanca, obra viva roja, dos palos,
//     velas cuadradas a proa y cangreja a popa, bauprés con dos foques; aquí gastado, con chorretones grises y las velas
//     llenas de PARCHES) que llega de la derecha con su estela; el bote, ya con la tripulación sentada dentro (cinco
//     figuritas), va a remolque por la popa desde el principio: a bordo no queda nadie. o.encalla 0–1 (por omisión 0):
//     0–0,68 navega de x 380 a x 200; 0,68 CHOQUE: se para de golpe sobre el arrecife con un rociado de espuma en la proa,
//     levanta la proa, se escora (asoma la obra viva roja) y se queda así; 0,74–0,86 la verga de juanete del trinquete se
//     suelta y cae al agua por la proa (lejos del bote), con su chapoteo a 0,86, y luego flota; 0,8–1 el bote suelta el
//     cabo y rema tranquilo hasta la orilla de la playa (126, 167). | 2001: el mismo sitio, sin barco: una lancha de buceo
//     blanca con franja azul, toldo y motor fuera borda, fondeada (cabo del ancla) junto al arrecife, con la bandera de
//     buceo (roja con la diagonal blanca) que ondea, el patrón en la consola y DOS BUCEADORES sentados en la borda de popa;
//     o.salto 0–1 (por omisión 0): el primero se deja caer de espaldas en 0,1–0,4 (chapoteo a 0,31) y el segundo en
//     0,5–0,8 (chapoteo a 0,71); luego suben sus burbujas. Un yate blanco lejos.
//     Devuelve suelo 172 (la arena de la playa), libre [20, 96] (de pie en la playa), horizonte 72, sol [236, 28],
//     arrecife [107, 99, 283, 129], orilla [126, 167] (donde atraca el bote), barco [x, y] (centro del casco en la línea
//     de flotación, en 1885), bote [x, y] (1885), lancha [176, 118] (2001: centro de la lancha en el agua),
//     buceadores [[x, y], [x, y]] (2001: donde entra cada uno en el agua) y los umbrales: choque 0,68, verga [0,74, 0,86],
//     boteSale 0,8, chapoteos [0,31, 0,71].
//   Cámara 'fondo': BAJO EL AGUA (2001): el agua turquesa que se oscurece con la hondura, la superficie que riela arriba,
//     RAYOS DE SOL que bajan inclinados y ondulan y la red de luz (cáusticas) que baila sobre la arena; al fondo, el
//     arrecife azulado y lejano y una tortuga que cruza despacio; a los lados, dos macizos de coral (coral cerebro,
//     cuerno de ciervo naranja, esponjas de tubo, coral de mesa, abanicos de mar morados y algas que se mecen); en medio, LOS
//     RESTOS: una quilla de madera cuadrada medio enterrada en la arena (x 104–238, y 150–168), cubierta de coral, con
//     sus pernos de hierro y chorretones de óxido, y UNA cuaderna rota que sube (hasta 232, 112); un banco de peces
//     plateados que cruza (y 50–95), peces de colores (cirujano amarillo, cirujano azul, loro, sargento, ángel), nieve
//     marina y burbujas. o.madera true (por omisión) | false: el trozo de madera suelto en la arena, en (176, 169) (false
//     cuando ya lo tiene el buzo en la mano: R.actor(..., { sostiene })); o.burbujas [x, y]: una columna de burbujas que
//     sube desde ahí (el regulador del buzo); o.anillos 0–1 (por omisión 0, no se ve): al lado, EL CORTE DEL TROZO en un
//     círculo con marco (centro 168, 76, radio 26, unido con puntos a la madera), con sus once ANILLOS que se encienden
//     del centro hacia fuera (el k-ésimo a 0,12 + 0,08·k) y, a 0,94, el último parpadea y sale R.numero 1894 a su derecha
//     (x 200–232, base 80). Devuelve suelo 172, libre [40, 260], madera [176, 169], anillos { centro: [168, 76], r: 26,
//     umbrales: [...], numero: [200, 80], todos: 0,94 }.
//   Añadido en la pasada de decorados: en 'arrecife', cirros altos, el nubarrón modelado en cuatro tonos con su cortina
//     de lluvia sobre la selva, humo de los fogones del pueblo, chozas mayores, delfines que saltan a lo lejos (x 22–60,
//     y 82–89), cabezos de coral bajo el agua somera de abajo (x 144–254, y 154–179) y, en primer término a la derecha,
//     ROCAS volcánicas (x 258–319, y ≥ 146) con la ola que revienta en su pie y un pelícano posado (300, ~146); en
//     'fondo', un arrecife más lejano y pálido (y ≈ 95–125), el casco de la lancha visto desde abajo en la superficie
//     (x 180–246, y 0–8) con su motor y el cabo del ancla, una raya águila que planea (y ≈ 52–68; en el plano 6 de mc-haiti, por x 80–135), tres medusas a la
//     izquierda (x 28–120, y 30–100), peces lejanos en silueta, anguilas jardineras en la arena (x 62–90) y un filo y un
//     destello en el trozo de madera suelto. Ninguna posición de geo cambia.
//   haitiDelante: en 'arrecife', matas de hierba de playa y una enredadera en la esquina de abajo a la izquierda (x 0–17)
//     y la cresta de la ola que rompe en la orilla; en 'fondo', algas que se mecen en las esquinas de abajo (x 0–18 y
//     300–319) y dos pececillos que pasan por delante abajo. Nunca dentro de libre por encima de los pies.
const V_HAITI = {
  arrecife: { cam: 'fondo', general: { col: ['#9ad8f0', '#3ac8c0'], geo: { suelo: 172, libre: [20, 96], horizonte: 72, sol: [236, 28], arrecife: [107, 99, 283, 129], orilla: [126, 167], barco: [196, 112], bote: [126, 167], lancha: [176, 118], buceadores: [[210, 119], [204, 119]], choque: 0.68, verga: [0.74, 0.86], boteSale: 0.8, chapoteos: [0.31, 0.71] } },
    fondo: { col: ['#2a8aa8', '#ecd8a8'], geo: { suelo: 172, libre: [40, 260], madera: [176, 169], anillos: { centro: [168, 76], r: 26, numero: [200, 80], todos: 0.94, umbrales: [0.12, 0.2, 0.28, 0.36, 0.44, 0.52, 0.6, 0.68, 0.76, 0.84, 0.92] } } } },
};
export function haiti(R, t, o = {}) {
  const enc = V_HAITI[o.encuadre] ? o.encuadre : Object.keys(V_HAITI)[0], e = V_HAITI[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const geo = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) };
  if (cam === 'fondo') return f_fondoHaiti(R, t, o, geo);
  return f_arrecife(R, t, o, geo);
}
export function haitiDelante(R, t, o = {}) {
  const e = V_HAITI.arrecife, cam = o.camara === e.cam ? e.cam : 'general';
  if (cam === 'fondo') f_fondoDelante(R, t);
  else f_arrecifeDelante(R, t);
  return {};
}
// ── G · Hoy (el estudio de Atom) y 1884 (el escritorio de Conan Doyle) ────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante de los personajes va en hoyDelante (con las MISMAS opciones; se llama después
// de los actores).
//   'estudio': EL ESTUDIO DE ATOM, de hoy, a media tarde: techo de yeso (liso bajo el año), moldura con dentículos,
//     papel pintado verde salvia con listas y rombos dorados (solo listas tras Atom), friso de cuarterones blancos,
//     tarima de roble con su alfombra roja y azul. De izquierda a derecha: LA LIBRERÍA (x 2–46, y 28–147: lomos de
//     colores sin letras, un globo, un farolillo de barco, una caracola y UN FARO de juguete cuya luz parpadea; un
//     helecho encima); LA VENTANA (hueco x 63–109, y 33–93, recortado) con el puerto de hoy: cielo tramado, nubes de tres
//     tonos a tres velocidades, gaviotas, la ciudad lejana con sus grúas, el agua que brilla, un velero y un remolcador
//     que cruzan; cortinas recogidas y la mancha de sol con su cruz de la ventana en la tarima, con motas que flotan;
//     EL APARADOR bajo la ventana (x 56–120, tablero y 114) con EL BARCO EN LA BOTELLA (canon) en su soporte, con un
//     brillo que la recorre; EL ESCRITORIO (x 122–168, tablero y 118) con el flexo encendido, la lupa, el tintero con su
//     pluma, papeles y LA TAZA de té humeante; encima, una carta náutica enmarcada (rumbo de puntos y rosa de los
//     vientos); LA PIZARRA verde en su caballete (hueco x 175–255, y 41–103; patas hasta el suelo) con cinco TEORÍAS en
//     tiza, de izquierda a derecha: el barco pirata (bandera lisa, sin calavera), dos muñecos de palitos peleando, el
//     papel del seguro con su sello y su «$», el tentáculo con ventosas y la tromba de agua bajo su nube; o.tachados 0–5
//     las tacha con una X roja por orden; o.borra 0–1 la borra de izquierda a derecha con el borrador y nubes de polvo de
//     tiza (con o.borra 1 queda limpia, solo con los barridos); a la derecha, la lámpara de pie encendida (pantalla x
//     256–282, y 58–72), el ficus que se mece y la cesta con EL GATO dormido (respira, mueve la cola y una oreja).
//     hoyDelante: un helecho en su maceta abajo a la izquierda (x 0–34) y un rollo de cabo abajo a la derecha (x 292–319),
//     los dos fuera de libre. Devuelve suelo 158, libre [40, 250], botella: [x, y] (su centro), aparador: [x0, y, x1]
//     (tablero), mesa: [x0, y, x1] (tablero), taza: [x, y], lupa: [x, y] (la lupa sobre la mesa), pizarra: [x0, y0, x1,
//     y1] (la superficie de tiza), teorias: [[x, y] ×5] (el centro de cada dibujo), borrador: [x, y] (dónde va el
//     borrador ahora; null sin o.borra), ventana: [x0, y0, x1, y1], gato: [x, y].
//     Cámara 'botella': LA BOTELLA DE CERCA (el hilo de gags), sobre el tablero del aparador (y 112–180) contra la pared
//     y la ventana con su cortina: el vidrio verdoso con reflejos, burbujitas y un brillo que pasa; el bergantín (canon)
//     con sus dos palos, sus velas cuadradas a proa y la cangreja a popa, los foques, la jarcia, la caseta con sus
//     ventanillas, la rueda, la escotilla, la bomba; el mar de masilla con sus crestas; el tapón de corcho; el soporte de
//     madera y su sombra; a la derecha, LA TAZA de té de Atom en su plato, humeante. En la pared, el reloj de barco de
//     latón (el segundero salta), una repisa con libros, un catalejo y una caracola, y una marina enmarcada bajo la esquina
//     de Atom; por la ventana, nubes a tres velocidades, la costa con su faro que destella, un velero y gaviotas; la
//     cortina ondea; en la mesa, una carta náutica con su compás de puntas y un rollo de cabo; motas en el rayo de sol. o.vacia 1 (por omisión): la cubierta
//     vacía; o.vacia 0: tres muñequitos diminutos de marinero en cubierta. o.bote 'barco' (por omisión: el botecito sobre
//     la escotilla principal) | 'falta' (no está: la escotilla vacía, con el yugo de madera) | 'taza' (no está; flota en el
//     té de la taza, mecido, con sus ondas). o.lupa 0–1: una lupa grande entra desde abajo a la derecha y se posa sobre la
//     cubierta, que se ve al doble a través del cristal. Devuelve botella: [x0, y0, x1, y1], cubierta: [x, y] (el centro de
//     la cubierta), taza: [x, y] (el té), lupa: [x, y] (el centro de la lente, ahora; null con o.lupa 0), mango: [x, y]
//     (el final del mango, donde la escena pone la mano si quiere).
//   'doyle': SOUTHSEA, 1884, DE NOCHE: el despacho de un joven médico, en penumbra cálida: papel pintado de damasco
//     verde, friso de madera oscura, tarima y alfombra persa; a la izquierda LA CHIMENEA de mármol encendida (las llamas
//     se mueven y su luz baila en la pared y el suelo, con chispas), el espejo dorado encima, en la repisa el reloj, una
//     vela que tiembla y un barquito de vela (Doyle fue médico de barco); un gato gris dormido en el hogar; un diploma
//     enmarcado (renglones y sello, sin letras) y un reloj de pared con su péndulo; EL SILLÓN de cuero capitoné detrás
//     del escritorio (x 134–166, y 112–150); LA VENTANA (hueco x 190–232, y 38–100, recortada) con la noche: estrellas que
//     titilan, la luna entre nubes que pasan, el mar con su reguero de luna y un faro lejano que gira; cortinas de
//     terciopelo y su luz de luna en la tarima; a la derecha, la librería de libros de medicina con un microscopio y
//     frascos, el estetoscopio colgado de un gancho y el maletín de médico en el suelo. En hoyDelante: EL ESCRITORIO de
//     caoba (x 98–202, tablero y 144–148, frente hasta y 172) con la lámpara de aceite de pantalla verde (llama que
//     tiembla y su halo), las hojas manuscritas (renglones sin letras), el tintero, las plumas en su soporte y la taza;
//     doyleMC «sentado» se pone de pie DETRÁS, en x 142 (izquierda del sprite) con su suelo en 150: asoman cabeza y
//     hombros sobre el tablero, delante del respaldo del sillón. Devuelve suelo 156, libre [40, 240], escritorio: [x0, y0,
//     x1, y1], doyle: [x, suelo] (dónde se sienta), chimenea: [x, y] (el fuego), ventana: [x0, y0, x1, y1], lampara: [x, y].
//     Cámara 'revista': EL ESCRITORIO DE CERCA, a la luz de la lámpara: la caoba con su cuero verde y su filete dorado, el
//     cuero gofrado con flores en las esquinas, manchas y un cerco viejo; el casillero del fondo con lo suyo en cada casilla
//     (sobres, rollos, un fajo atado, libretas, lacres, un reloj); en los márgenes, un fajo de cartas, la pipa humeante en
//     su cenicero, el sello y la barra de lacre, un lápiz y un portaplumas; brillos de latón con la llama; la lámpara a la izquierda con su llama y su humo, una polilla que ronda; la hoja
//     manuscrita en la que LA PLUMA escribe sola renglones (o.escribe 0–1; por omisión 0.6) en trazos de tinta sin letras,
//     con la tinta fresca que brilla; a la derecha LA REVISTA impresa abierta (columnas de renglones, sin letras) con el
//     grabado del barco y, en la cabecera de su relato, el hueco en blanco de la firma (o.firma 0: el recuadro vacío y de
//     puntos; o.firma 0–1: un garabato que se traza, sin letras); el tintero, el secante, un reloj de bolsillo abierto con
//     su segundero y una taza que humea. Devuelve pluma: [x, y] (la punta, ahora), revista: [x0, y0, x1, y1], firma: [x0,
//     y0, x1, y1] (el hueco), hoja: [x0, y0, x1, y1].
const V_HOY = {
  estudio: { cam: 'botella', general: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 158, libre: [40, 250], botella: [88, 106], aparador: [56, 114, 120], mesa: [122, 118, 168], pizarra: [175, 41, 255, 103], taza: [160, 113], lupa: [134, 116], ventana: [63, 33, 109, 93], gato: [287, 154] } }, botella: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 180, libre: [0, 0], botella: [56, 64, 252, 132], cubierta: [130, 98], taza: [281, 122] } } },
  doyle: { cam: 'revista', general: { col: ['#5a3a2a', '#3a2a1c'], geo: { suelo: 156, libre: [40, 240], escritorio: [98, 144, 202, 172], doyle: [142, 150], chimenea: [50, 132], ventana: [190, 38, 232, 100], lampara: [112, 118] } }, revista: { col: ['#efe6d0', '#5a3a24'], geo: { suelo: 180, libre: [0, 0], revista: [176, 56, 282, 150], firma: [184, 74, 222, 82], hoja: [66, 66, 166, 160] } } },
};
export function hoy(R, t, o = {}) {
  const [enc, cam] = g_hoyVista(o), geo = JSON.parse(JSON.stringify(V_HOY[enc][cam].geo));
  const f = { estudio: { general: g_hoyEstudio, botella: g_hoyBotella }, doyle: { general: g_hoyDoyle, revista: g_hoyRevista } }[enc][cam];
  return { encuadre: enc, camara: cam, ...geo, ...(f(R, t, o) || {}) };
}
// lo de delante de los personajes en cada encuadre de hoy(): se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  const [enc, cam] = g_hoyVista(o);
  const f = { estudio: { general: g_hoyEstudioDelante }, doyle: { general: g_hoyDoyleDelante } }[enc]?.[cam];
  return f ? f(R, t, o) || {} : {};
}
// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_MC = { puerto: V_PUERTO, mar: V_MAR, abordo: V_ABORDO, gibraltar: V_GIBRALTAR, laboratorio: V_LAB, haiti: V_HAITI, hoy: V_HOY };

// qué vista piden las opciones: el encuadre (uno que no existe cae en 'astillero'), la cámara, la época y la luz
function a_vista(o) {
  const enc = V_PUERTO[o.encuadre] ? o.encuadre : 'astillero', e = V_PUERTO[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const epoca = Number(o.epoca) === 1867 ? 1867 : 1861;   // vale 1867 o '1867'
  const luz = a_LUZ[o.luz] ? o.luz : enc === 'muelle' || (enc === 'astillero' && cam === 'general' && epoca === 1867) ? 'gris' : 'dia';
  return { enc, cam, luz, epoca, geo: e[cam].geo };
}
// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1
const a_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const a_umbral = (x, y) => a_B4[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function a_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

const a_lim = (v) => Math.max(0, Math.min(1, v));

const a_suave = (v) => { const u = a_lim(v); return u * u * (3 - 2 * u); };

// los colores propios del puerto (piedra, ladrillo, madera, árboles, gente pequeña, caballos, casas de Génova)
const a_P = pal({
  adoq: '#6e6a66', adoqS: '#4a4744', adoqL: '#8e8882', adoqJ: '#34312e', losa: '#a49c8c', losaS: '#7a7468', losaL: '#c2baa8', losaJ: '#5a554c',
  ladr: '#8e4634', ladrS: '#6a3226', ladrL: '#ae5e44', ladrD: '#56281e', mortero: '#a8987e', hollin: '#3e302a', piedra: '#9e968a', piedraS: '#74706a', piedraL: '#bdb6aa',
  madera: '#8a6440', maderaS: '#5e4228', maderaL: '#b08a5a', maderaD: '#3a2818', gris: '#8a8478', grisS: '#625e56', grisL: '#aaa498',
  cuerda: '#c8b080', cuerdaS: '#8a7450', jarcia: '#2c2620', hierro: '#34343a', hierroL: '#62626c', interior: '#2a1c14', interiorL: '#4a3424',
  abeto: '#2c4a36', abetoS: '#1c3426', abetoL: '#46684a', colina: '#5c7c4c', colinaS: '#405e3a', colinaL: '#7c9a5c', roca: '#7a7268', rocaS: '#56504a', rocaL: '#9a9286',
  grava: '#a29884', gravaS: '#7a7262', gravaL: '#c2b8a4', arenaP: '#d2c29a', arenaPS: '#b0a07a', serrin: '#d8c08a', hierba: '#6a8a48', hierbaS: '#4a6a34', hierbaL: '#8aaa5a',
  piel: '#e8b088', pielS: '#b88060', ropa1: '#3e4e72', ropa2: '#8a3e30', ropa3: '#6a6a42', ropa4: '#3a3a44', ropa5: '#a8a49a', gorra: '#26262c',
  caballo: '#7a4a2a', caballoS: '#53311c', caballoL: '#9a6a40', crin: '#2a1a10', mula: '#7a6e62', mulaS: '#544a40',
  farol: '#ffe0a0', llama: '#ffb848', vidrio: '#34465a', vidrioL: '#9cbcd4', cristal: '#c8dcec',
  ocre: '#e0b060', ocreS: '#b88a40', rosa: '#e4a08e', rosaS: '#b87a6a', verdeC: '#a8c08a', verdeCS: '#82986a', crema: '#ecdcb4', cremaS: '#c4b48c', naranja: '#d8845a', naranjaS: '#aa6040',
  teja: '#b0583a', tejaS: '#7e3c28', tejaL: '#cc7450', persiana: '#3e6a44', persianaL: '#5a8a5a',
  gaviota: '#f6f6f2', gaviotaS: '#a8acb2', gaviotaD: '#4a4e56', pico: '#f0b030', negro: '#141418', blanco: '#f8f6f0', blancoS: '#d8d4cc',
  oro: '#e8c060', oroS: '#a8803a', rojo: '#b83a32', rojoS: '#8a2a24', azul: '#2a3a7a', humo: '#cdcdd0', humoS: '#8e8e96', humoD: '#5a5a62',
  petroleo: '#3e342a', petroleoS: '#28221c', petroleoL: '#5a4c3c', charco: '#b0bccc', verdeDGL: '#3e6448', verdeDGS: '#1c3424',
});

// las tres luces: el cielo de arriba al horizonte, las nubes (sombra, cuerpo, luz), el agua (honda, media, clara,
// brillo), el tinte que se aplica a lo fijo y el sol
const a_LUZ = Object.fromEntries(Object.entries({
  dia: { cielo: ['#4f8fd2', '#64a2dc', '#7cb4e4', '#98c6ea', '#b6d8ee', '#d4e6ec'], nube: ['#adc4dc', '#e2ebf4', '#ffffff'], agua: ['#1c4462', '#2a6082', '#4a84a4', '#dceff4'], tinte: null, sol: '#fff6d8' },
  tarde: { cielo: ['#4a5a96', '#76699c', '#ae788c', '#da9478', '#f0b882', '#f8d8a2'], nube: ['#946680', '#de9a8c', '#ffd8b0'], agua: ['#322f4c', '#5a4a64', '#9a6c68', '#ffd890'], tinte: ['#c8703c', 0.13], sol: '#ffe2a0' },
  gris: { cielo: ['#6e7a88', '#7a8694', '#8692a0', '#949eaa', '#a2aab4', '#b2b8be'], nube: ['#646c78', '#86909a', '#a8aeb6'], agua: ['#22323c', '#33434e', '#4c5c68', '#a4b2ba'], tinte: ['#58687a', 0.2], sol: null },
}).map(([k, v]) => [k, { nombre: k, cielo: v.cielo.map(hex), nube: v.nube.map(hex), agua: v.agua.map(hex), tinte: v.tinte && [hex(v.tinte[0]), v.tinte[1]], sol: v.sol && hex(v.sol) }]));
for (const L of Object.values(a_LUZ)) L.nubeLejos = L.nube.map((c) => a_mezcla(c, L.cielo[L.cielo.length - 1], 0.45));

// los búferes fijos (uno por clave: encuadre, cámara, luz, época) que se pintan una vez y se vuelcan en cada fotograma
const a_CACHE = new WeakMap();

function a_buf(R, clave, dibuja) {
  let m = a_CACHE.get(R); if (!m) a_CACHE.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(b); R.usar(prev); R.recorte(null); m.set(clave, b); }
  return b;
}

// vuelca un búfer con huecos (0 = transparente) sobre el lienzo, de la fila y0 a la y1
function a_volcar(R, b, y0 = 0, y1 = 180) { const B = R.buf; for (let i = y0 * 320, n = y1 * 320; i < n; i++) { const c = b[i]; if (c) B[i] = c; } }

// tiñe lo pintado en un búfer con el tinte de la luz (el gris de noviembre, el oro de la tarde)
function a_tinta(b, L, k = 1) {
  if (!L.tinte) return; const [tc, f] = L.tinte, m = new Map();
  for (let i = 0; i < b.length; i++) { const c = b[i]; if (!c) continue; let d = m.get(c); if (d === undefined) { d = a_mezcla(c, tc, f * k); m.set(c, d); } b[i] = d; }
}

// el cielo tramado hasta el horizonte hor (bandas que se funden con el tramado ordenado), cirros quietos y el sol con su
// halo (sol = [x, y, r] o null); se pinta en un búfer fijo
function a_cieloBase(R, hor, L, sol) {
  const B = R.buf, P = L.cielo, n = P.length - 1;
  for (let y = 0; y < hor; y++) { const f = Math.min(n - 0.001, (y / hor) * n), i = Math.floor(f), p = f - i;
    for (let x = 0; x < 320; x++) B[y * 320 + x] = a_umbral(x, y) < p ? P[i + 1] : P[i]; }
  B.fill(P[n], hor * 320);
  // cirros: velos finos y altos, fuera de la barra del año y de la esquina de Atom
  for (let k = 0; k < 5; k++) { const w = 26 + Math.round(h(k, 5, 611) * 40), x0 = 180 * h(k, 6, 611) + (k % 2) * 30, y = Math.round(28 + k * (hor - 44) / 5 + h(k, 7, 611) * 4);
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || y >= hor - 3 || (x > 266 && y < 50) || h(i >> 2, k, 612) < 0.3) continue; const e = Math.sin((i / w) * Math.PI);
      B[y * 320 + x] = a_mezcla(B[y * 320 + x], L.nube[2], e > 0.5 ? 0.42 : 0.2); if (e > 0.6 && i % 3 === 0) B[(y + 1) * 320 + x] = a_mezcla(B[(y + 1) * 320 + x], L.nube[2], 0.22); } }
  if (sol && L.sol) { const [sx, sy, sr] = sol, R2 = sr + 14;
    for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) { const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const k = 1 - (d - sr) / (R2 - sr); if (a_umbral(x, y) < k * k) B[y * 320 + x] = a_mezcla(B[y * 320 + x], L.sol, 0.5); }
    R.disco(sx, sy, sr + 1, a_mezcla(L.sol, L.cielo[3], 0.4)); R.disco(sx, sy, sr, L.sol); R.disco(sx - 1, sy - 1, Math.max(1, sr - 2), hex('#fffdf2')); }
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = [sombra, cuerpo, luz]
function a_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// un estrato de noviembre: un rollo de nube largo y bajo, de bordes deshilachados, con la luz arriba y la sombra abajo
function a_estrato(R, cx, cy, w, alto, sem, c) {
  for (let j = 0; j < alto; j++) { const f = j / Math.max(1, alto - 1), m = Math.round(w * 0.5 * Math.sqrt(1 - Math.pow(f * 2 - 1, 2)) + (h(j, sem, 621) - 0.5) * 8), col = j === 0 ? c[2] : j >= alto - 2 ? c[0] : c[1];
    for (let x = Math.round(cx - m); x <= cx + m; x++) if (h(x >> 1, j + sem, 622) > 0.12 || j > 0) R.pset(x, Math.round(cy + j), col); }
}

// las nubes del cielo hasta hor, en tres capas (lejos: pequeñas, lentas y desvaídas; cerca: grandes y rápidas); se
// bajan solas al pasar por la barra del año (arriba a la izquierda) y por la esquina de Atom (arriba a la derecha)
function a_nubes(R, t, hor, L, o = {}) {
  const vv = o.viento ?? 1, gris = L.nombre === 'gris', alto0 = o.y0 ?? 26;
  if (gris) for (let k = 0; k < 5; k++) { const w = 70 + h(k, 1, 631) * 60, span = 320 + w + 60, cx = (((h(k, 2, 631) * span - t * (1.2 + k * 0.5) * vv) % span) + span) % span - w / 2 - 30, cy = Math.round(alto0 + 4 + k * (hor - alto0 - 14) / 5 + (cx + w / 2 > 266 ? Math.max(0, 50 - alto0 - 4 - k * 6) : 0));
    a_estrato(R, cx, cy, w, 3 + (k % 3), k, k < 2 ? L.nubeLejos : L.nube); }
  for (let k = 0; k < 8; k++) { const capa = k % 3, w = [14, 22, 34][capa] + h(k, 3, 631) * [8, 12, 18][capa], v = [0.7, 1.7, 3.1][capa] * vv, span = 360 + w * 2, cx = (((h(k, 4, 631) * span - t * v) % span) + span) % span - w - 20;
    const fr = [0.62 + 0.2 * h(k, 5, 631), 0.36 + 0.2 * h(k, 5, 631), 0.12 + 0.3 * h(k, 5, 631)][capa], tope = cx + w * 0.5 > 258 ? 54 : alto0;
    const cy = Math.round(Math.max(alto0 + fr * (hor - alto0 - 8), tope + w * 0.34));
    if (cy > hor - 4) continue;
    a_nube(R, Math.round(cx), cy, Math.round(w), k + 3, capa === 0 ? L.nubeLejos : capa === 1 ? [L.nube[0], a_mezcla(L.nube[1], L.nubeLejos[1], 0.4), L.nube[2]] : L.nube);
  }
}

// una gaviota en vuelo (alas que baten) en (x, y); k le da su compás
function a_gaviota(R, x, y, t, k, lejos = false) {
  x = Math.round(x); y = Math.round(y); const a = Math.sin(t * (lejos ? 7 : 9) + k * 2.1), d = a > 0.3 ? -2 : a < -0.3 ? 1 : 0, cb = lejos ? a_P.gaviotaS : a_P.gaviota, cs = lejos ? a_P.gaviotaD : a_P.gaviotaS;
  if (lejos) { R.pset(x, y, cb); R.pset(x - 1, y + Math.sign(d), cs); R.pset(x + 1, y + Math.sign(d), cs); return; }
  R.linea(x - 1, y, x - 4, y + d, cs); R.linea(x + 1, y, x + 4, y + d, cs); R.pset(x - 4, y + d, a_P.gaviotaD); R.pset(x + 4, y + d, a_P.gaviotaD);
  R.rect(x - 1, y, x + 1, y, cb); R.pset(x, y + 1, cb); R.pset(x + 2, y + 1, a_P.pico);
}

// una bandada de n gaviotas que cruzan la zona [x0, y0, x1, y1] (no entran en la esquina de Atom ni en la barra del año)
function a_gaviotas(R, t, zona, n, sem = 0) {
  const [x0, y0, x1, y1] = zona, W = x1 - x0 + 40;
  for (let k = 0; k < n; k++) { const v = (5 + h(k, sem, 641) * 7) * (k % 2 ? 1 : -1), x = x0 - 20 + ((((h(k, sem + 1, 641) * W + t * v) % W) + W) % W), y = y0 + h(k, sem + 2, 641) * (y1 - y0) + Math.sin(t * 0.9 + k * 1.7) * 3;
    if ((x > 266 && y < 50) || (x < 180 && y < 24)) continue; a_gaviota(R, x, y, t, k + sem, k % 3 === 2); }
}

// una gaviota posada (de pie, mirando a dir), con la cabeza que se mueve; mancha 0–1: una gota blanca en la cabeza
function a_gaviotaPosada(R, x, y, t, dir = 1, k = 0, mancha = 0, sacude = 0) {
  x = Math.round(x); y = Math.round(y); const F = (i) => x + dir * i, cab = Math.sin(t * 1.3 + k) > 0.6 ? 1 : 0, sx = sacude > 0 ? Math.round(Math.sin(t * 30) * sacude) : 0;
  R.pset(F(-1), y, a_P.pico); R.pset(F(1), y, a_P.pico);   // patas
  R.rect(Math.min(F(-3), F(2)), y - 4, Math.max(F(-3), F(2)), y - 1, a_P.gaviota); R.rect(Math.min(F(-4), F(-1)), y - 4, Math.max(F(-4), F(-1)), y - 3, a_P.gaviotaS);
  R.pset(F(-5), y - 4, a_P.gaviotaD); R.pset(F(-4), y - 2, a_P.gaviotaD); R.pset(F(2), y - 1, a_P.gaviotaS);
  const hx = F(2 + cab) + sx; R.rect(Math.min(hx, hx + dir), y - 7, Math.max(hx, hx + dir), y - 5, a_P.gaviota); R.pset(hx + dir, y - 6, a_P.negro); R.pset(hx + 2 * dir, y - 5, a_P.pico); R.pset(hx + 3 * dir, y - 5, a_P.pico);
  if (mancha > 0) { R.rect(Math.min(hx - dir, hx + dir), y - 8, Math.max(hx - dir, hx + dir), y - 8, a_P.blanco); R.pset(hx, y - 9, a_P.blanco); if (mancha > 0.5) R.pset(hx - dir, y - 7, a_P.blancoS); }
}

// el agua de la fila y0 a la y1 (y de x0 a x1; o.fondo(x) da la última fila de cada columna, para orillas, y o.xmax(y)
// la última columna de cada fila, para lo que tapa el agua por un lado): tres tonos
// tramados (más honda cerca), rizos que corren, brillos y el reflejo ondulado de lo que ya está pintado encima de eje
function a_agua(R, t, y0, y1, L, o = {}) {
  const B = R.buf, [aS, a, aL, br] = L.agua, x0 = o.x0 ?? 0, x1 = o.x1 ?? 320, ola = o.ola ?? 1, eje = o.eje ?? y0, refl = o.refl ?? 0.4, fondo = o.fondo;
  for (let x = x0; x < x1; x++) { const yf = fondo ? Math.min(y1, fondo(x)) : y1;
    for (let y = y0; y < yf; y++) { if (o.xmax && x >= o.xmax(y)) continue; const f = (y - y0) / Math.max(1, y1 - y0), amp = 0.5 + f * 2.5 * ola;
      const s = Math.sin(x * (0.24 - f * 0.13) + t * 1.7 * ola + h(3, y, 655) * 6.283) + 0.85 * Math.sin(x * 0.047 - t * 0.8 + h(5, y, 655) * 6.283);
      let c = a_umbral(x, y) < f * 0.85 ? aS : a_umbral(x + 1, y + 2) < 0.25 - f * 0.25 ? aL : a;
      if (refl > 0) { const yr = Math.round(eje - (y - eje) - 1 + Math.sin(y * 0.9 + t * 2.3) * 0.6), xr = Math.min(319, Math.max(0, x + Math.round(Math.sin(y * 0.7 + t * 2.1) * amp * 0.7)));
        if (yr >= 0 && yr < eje) c = a_mezcla(c, B[yr * 320 + xr], refl * (1 - f * 0.55)); }
      if (s > 1.42 + (1 - f) * 0.2) c = s > 1.76 && (x + y) & 1 ? br : aL; else if (s < -1.45) c = a_mezcla(c, aS, 0.6);
      B[y * 320 + x] = c; } }
}

// el reflejo oscuro y roto de un casco en el agua bajo su flotación y, de x0 a x1
function a_reflejo(R, t, x0, x1, y, col, n = 7) {
  const B = R.buf;
  for (let j = 1; j <= n; j++) { const yy = y + j; if (yy > 179) break; const dx = Math.round(Math.sin(j * 1.3 + t * 2.2) * (1 + j * 0.3)), k = 0.55 - j * 0.06;
    for (let x = Math.max(0, x0 + dx + j); x <= Math.min(319, x1 + dx - j); x++) if ((x + j * 3 + Math.floor(t * 4)) % 7 !== 0) B[yy * 320 + x] = a_mezcla(B[yy * 320 + x], col, k); }
}

// EL BERGANTÍN DEL CANON, de perfil: (x, y) es el centro de su flotación, L su eslora en píxeles (unos 200 en un plano
// general). o.dir 1 (proa a la derecha) | -1; o.rot giro en radianes (positivo: la proa baja hacia la derecha); o.casco
// 'mc' (negro, franja blanca, obra viva roja) | 'dg' (verde, el Dei Gratia) | 'madera' (en grada, sin pintar);
// o.cuadernas 0–1 (la parte de popa aún sin forrar, con las cuadernas a la vista); o.flota (los píxeles de obra viva que
// asoman sobre el agua; sin ella se pinta el casco entero, fuera del agua); o.palos (false: sin arboladura); o.velas
// 0–1 (recogidas … largadas); o.roto (el mastelero del trinquete partido y colgando, una vela rota); o.bote (el bote
// sobre la escotilla); o.blancas (velas más blancas, las del Dei Gratia); o.bandera (false: sin la bandera de barras y
// estrellas, para el Amazon y el Dei Gratia, que eran británicos). Devuelve puntos útiles en pantalla.
function a_bergantin(R, x, y, L, t, o = {}) {
  const dir = o.dir ?? 1, a = o.rot ?? 0, ca = Math.cos(a), sa = Math.sin(a), H = L * 0.12, D = L * 0.075, velas = a_lim(o.velas ?? 0);
  const P = (u, v) => [Math.round(x + dir * u * ca + v * sa), Math.round(y + dir * u * sa - v * ca)];
  const inv = (sx, sy) => { const dx = sx + 0.5 - x, dy = sy + 0.5 - y; return [dir * (dx * ca + dy * sa), dx * sa - dy * ca]; };
  const vT = (u) => { const s = (2 * u) / L; return H * (1 + 0.13 * s * s + 0.05 * s); };
  const vB = (u) => { const s = (2 * u) / L; if (s > 0.62) return -D + (D + H * 1.25) * Math.pow((s - 0.62) / 0.42, 2); if (s < -0.86) return -D + (D + H * 0.55) * Math.pow((-0.86 - s) / 0.14, 1.5); return -D; };
  const bot = (u) => Math.min(vT(u), o.flota != null ? Math.max(vB(u), -o.flota) : vB(u));
  const casco = o.casco ?? 'mc', CP = casco === 'dg' ? [C.verdeDG, a_P.verdeDGL, a_P.verdeDGS] : casco === 'madera' ? [a_P.madera, a_P.maderaL, a_P.maderaS] : [C.casco, C.cascoL, a_P.negro];
  const blanco = o.blancas ? [a_P.blanco, a_P.blancoS] : [C.lona, C.lonaS], J = a_P.jarcia, uc = o.cuadernas ? -0.5 * L + o.cuadernas * L : -1e9;
  const us = []; for (let u = -0.5 * L; u < 0.52 * L; u += 3) us.push(u); us.push(0.52 * L);
  // la jarcia de detrás (los obenques y estays) se pinta antes del casco para que asome por encima de la regala
  const uF = 0.22 * L, uM = -0.1 * L, vd = (u) => vT(u) - 1, palos = o.palos !== false, cy = (k) => vd(uF) + k * L;
  // el casco
  R.poligono([...us.map((u) => P(u, vT(u))), ...us.slice().reverse().map((u) => P(u, bot(u)))], (sx, sy) => {
    const [u, v] = inv(sx, sy), top = vT(u), dd = top - v;
    if (u < uc) { const fr = ((Math.round(u) % 6) + 6) % 6; if (dd < 1.5 || v < vB(u) + 2.2) return a_P.maderaS; return fr < 2 ? (fr === 0 ? a_P.maderaL : a_P.madera) : (dd < 4 || (dd > 9 && dd < 11)) ? a_P.interiorL : a_P.interior; }
    if (dd < 1.3) return casco === 'madera' ? C.tablaL : C.tabla;                                   // la regala
    if (casco !== 'madera' && dd >= H * 0.26 && dd < H * 0.26 + 1.6) return C.franja;               // la franja blanca, fina
    if (v < 0) return casco === 'madera' ? (a_umbral(sx, sy) < 0.5 + Math.min(0.4, -v / D * 0.4) ? a_P.maderaS : a_P.madera) : v < -D * 0.5 && a_umbral(sx, sy) < 0.5 ? C.robleRS : C.obraViva;
    const seam = (dd % 3) < 0.8, sh = v < H * 0.25 && a_umbral(sx, sy) < 0.55;
    if (casco === 'madera') { if (seam) return a_P.maderaS; const k = h(Math.round(u / 9), Math.round(dd / 3), 651); return dd < 5 && a_umbral(sx, sy) < 0.5 ? a_P.maderaL : k > 0.75 ? a_mezcla(a_P.madera, a_P.maderaL, 0.5) : k < 0.2 || sh ? a_P.maderaS : a_P.madera; }
    if (dd < H * 0.26) return seam ? CP[0] : a_umbral(sx, sy) < 0.35 ? CP[1] : CP[0];              // la borda, con su luz
    return seam ? CP[2] : sh ? CP[2] : a_umbral(sx + 1, sy) < 0.12 ? CP[1] : CP[0];
  });
  // la línea de flotación a flote, un filo claro de agua
  if (o.flota != null) for (const u of us) { const [px, py] = P(u, 0); if ((px + Math.floor(t * 3)) % 4) R.pset(px, py + 1, C.espuma); }
  // el codaste y la quilla en grada
  if (casco === 'madera') { R.linea(...P(-0.42 * L, -D - 1), ...P(0.4 * L, -D - 1), a_P.maderaD); R.linea(...P(-0.5 * L, 0.5 * H), ...P(-0.5 * L, vT(-0.5 * L) + 0.35 * H), a_P.maderaD); R.linea(...P(-0.495 * L, 0.5 * H), ...P(-0.495 * L, vT(-0.5 * L) + 0.35 * H), a_P.madera);
    R.linea(...P(0.52 * L, vT(0.52 * L)), ...P(0.535 * L, vT(0.52 * L) + 0.3 * H), a_P.maderaD); R.linea(...P(0.515 * L, vT(0.52 * L)), ...P(0.53 * L, vT(0.52 * L) + 0.3 * H), a_P.maderaL);
    for (let u = -0.1 * L; u < 0.45 * L; u += 0.09 * L) { const [px, py] = P(u, vT(u) - 1); R.pset(px, py, a_P.maderaD); R.pset(px, py - 1, a_P.maderaS); } }
  if (!palos && casco === 'madera') return { P, vd, deck: P(0, vd(0)), proa: P(0.52 * L, vT(0.52 * L)), popa: P(-0.5 * L, vT(-0.5 * L)) };
  // la caseta del camarote, el timón y el bote
  const yC = (u) => vT(u);
  R.poligono([P(-0.44 * L, yC(-0.44 * L)), P(-0.3 * L, yC(-0.3 * L)), P(-0.3 * L, yC(-0.3 * L) + 0.32 * H), P(-0.44 * L, yC(-0.44 * L) + 0.32 * H)], (sx, sy) => ((sy + sx) % 3 === 0 ? C.tablaS : C.tabla));
  R.linea(...P(-0.45 * L, yC(-0.44 * L) + 0.34 * H), ...P(-0.29 * L, yC(-0.3 * L) + 0.34 * H), C.tablaS);
  for (const uu of [-0.4, -0.34]) { const [wx, wy] = P(uu * L, yC(uu * L) + 0.18 * H); R.rect(wx - 1, wy - 1, wx + 1, wy, a_P.vidrio); R.pset(wx - 1, wy - 1, a_P.vidrioL); }
  { const [tx, ty] = P(-0.475 * L, yC(-0.475 * L)), [rx, ry] = P(-0.475 * L, yC(-0.475 * L) + 0.3 * H), r = Math.max(2, Math.round(0.12 * H)); R.linea(tx, ty, rx, ry, C.tablaS);
    for (let k = 0; k < 4; k++) { const an = k * Math.PI / 4 + (o.giro ?? 0); R.linea(rx - Math.round(Math.cos(an) * r), ry - Math.round(Math.sin(an) * r), rx + Math.round(Math.cos(an) * r), ry + Math.round(Math.sin(an) * r), C.tablaS); } R.pset(rx, ry, C.tablaL); }
  if (o.bote !== false) { const b0 = -0.03 * L, b1 = 0.12 * L, by = (u) => yC(u) + 0.05 * H;
    R.poligono([P(b0, by(b0)), P(b1, by(b1)), P(b1 - 0.02 * L, by(b1) + 0.28 * H), P(b0 + 0.02 * L, by(b0) + 0.28 * H)], (sx, sy) => (sy % 3 === 0 ? a_P.blancoS : a_P.blanco));
    R.linea(...P(b0 + 0.02 * L, by(b0) + 0.29 * H), ...P(b1 - 0.02 * L, by(b1) + 0.29 * H), a_P.grisS); R.linea(...P(b0 + 0.01 * L, by(b0)), ...P(b1 - 0.01 * L, by(b1)), a_P.grisS); }
  if (!palos) return { P, vd, deck: P(0, vd(0)), proa: P(0.52 * L, vT(0.52 * L)), popa: P(-0.5 * L, vT(-0.5 * L)) };
  // jarcia firme: obenques con flechastes, estays, brandales
  const obenques = (u, alto) => { const top = P(u, vd(u) + alto), pies = [-0.07, -0.045, -0.02].map((d) => P(u + d * L, vT(u + d * L) - 0.5));
    for (const p of pies) R.linea(top[0], top[1], p[0], p[1], J);
    for (let k = 3; k < 30; k += 3) { const f = k / 30, a0 = [pies[0][0] + (top[0] - pies[0][0]) * f, pies[0][1] + (top[1] - pies[0][1]) * f], a1 = [pies[2][0] + (top[0] - pies[2][0]) * f, pies[2][1] + (top[1] - pies[2][1]) * f]; R.linea(a0[0], a0[1], a1[0], a1[1], a_P.cuerdaS); } };
  obenques(uF, 0.29 * L); obenques(uM, 0.31 * L);
  const bauF = P(0.74 * L, vT(0.5 * L) + 0.07 * L);
  R.linea(...P(uF, cy(0.37)), ...bauF, J); R.linea(...P(uF, cy(0.3)), ...P(0.6 * L, vT(0.5 * L) + 0.04 * L), J);
  R.linea(...P(uM, vd(uM) + 0.4 * L), ...P(uF, vd(uF) + 0.05 * L), J); R.linea(...P(uM, vd(uM) + 0.49 * L), ...P(-0.42 * L, vT(-0.42 * L)), J);
  // el bauprés
  { const b0 = P(0.46 * L, vT(0.46 * L) - 1); R.linea(b0[0], b0[1], bauF[0], bauF[1], a_P.madera); R.linea(b0[0], b0[1] + 1, bauF[0], bauF[1] + 1, a_P.maderaS); }
  // los palos (dos píxeles el macho, uno el mastelero) con sus cofas
  const palo = (u, alto, roto) => { const [x0, y0] = P(u, vd(u)), [x1, y1] = P(u, vd(u) + 0.3 * L), [x2, y2] = P(u, vd(u) + (roto ? 0.33 : alto) * L);
    R.linea(x0, y0, x1, y1, a_P.maderaL); R.linea(x0 + 1, y0, x1 + 1, y1, a_P.maderaS); R.linea(x1, y1, x2, y2, a_P.madera);
    const [cx0, cy0] = P(u - 0.025 * L, vd(u) + 0.3 * L), [cx1, cy1] = P(u + 0.025 * L, vd(u) + 0.3 * L); R.linea(cx0, cy0, cx1, cy1, a_P.maderaD); return [x2, y2]; };
  const topeF = palo(uF, 0.5, o.roto), topeM = palo(uM, 0.52, false);
  if (o.roto) { const s = Math.sin(t * 1.4) * 0.04 * L, [ax, ay] = P(uF, vd(uF) + 0.33 * L); R.linea(ax, ay, ax + Math.round(dir * 0.08 * L + s), ay + Math.round(0.13 * L), a_P.madera); R.linea(ax, ay, ax + Math.round(dir * 0.1 * L + s), ay + Math.round(0.02 * L), J); }
  // el gallardete rojo en el tope del mayor, que ondea
  for (let i = 0; i < 9; i++) R.pset(topeM[0] - dir * (i + 1), topeM[1] + 1 + Math.round(Math.sin(t * 6 - i * 0.8) * (i / 9) * 1.5), i < 3 ? a_P.rojo : a_P.rojoS);
  // las vergas del trinquete con las velas cuadradas (recogidas sobre la verga o largadas, que bajan con o.velas)
  const VG = [[0.155, 0.16], [0.255, 0.135], [0.345, 0.105], o.roto ? null : [0.43, 0.08]];
  for (let i = VG.length - 1; i >= 0; i--) { const g = VG[i]; if (!g) continue; const [k, w] = g, v0 = cy(k), lo = i === 0 ? [cy(0.02), w + 0.01] : VG[i - 1], vb = i === 0 ? lo[0] : cy(lo[0]), wb = lo[1];
    if (velas > 0.02 && !(o.roto && i === 2)) { const f = velas, vv = v0 - (v0 - vb) * f, ww = w + (wb - w) * f, panza = 0.012 * L * f;
      R.poligono([P(uF - w * L, v0), P(uF + w * L, v0), P(uF + ww * L + panza, vv), P(uF - ww * L + panza, vv)], (sx, sy) => { const [uu, v] = inv(sx, sy), e = Math.abs(uu - uF) / (ww * L + 1); return v > v0 - 1.5 ? blanco[1] : (Math.round(uu) % 5 === 0 && a_umbral(sx, sy) < 0.6) || e > 0.85 ? blanco[1] : blanco[0]; }); }
    if (o.roto && i === 2) { const fl = Math.sin(t * 5) * 2; R.poligono([P(uF - w * L, v0), P(uF + w * 0.2 * L, v0), P(uF - w * 0.3 * L + fl, v0 - 0.06 * L), P(uF - w * 0.9 * L + fl, v0 - 0.08 * L)], (sx, sy) => ((sx + sy) % 4 ? blanco[1] : blanco[0])); }
    const [ax, ay] = P(uF - w * L, v0), [bx, by] = P(uF + w * L, v0); R.linea(ax, ay, bx, by, a_P.maderaS);
    if (velas < 0.5) { R.linea(ax + 1, ay + 1, bx - 1, by + 1, blanco[0]); if (i < 2) R.linea(ax + 1, ay + 2, bx - 1, by + 2, blanco[1]); for (let q = 2; q < w * L * 2; q += 4) { const pp = P(uF - w * L + q, v0); R.pset(pp[0], pp[1] + 1, a_P.cuerdaS); } } }
  // la cangreja del mayor: el pico sube por el palo al izarla; recogida, va sobre la botavara
  { const f = velas, gTh = vd(uM) + (0.11 + 0.29 * f) * L, gPk = vd(uM) + (0.13 + 0.34 * f) * L, bTh = vd(uM) + 0.07 * L, bEnd = vd(uM) + 0.09 * L, uP = uM - (0.14 + 0.06 * f) * L, uB = uM - 0.38 * L;
    if (f > 0.05) R.poligono([P(uM, gTh), P(uP, gPk), P(uB + 0.01 * L, bEnd + 1), P(uM, bTh + 1)], (sx, sy) => { const [uu] = inv(sx, sy); return Math.round(uu) % 5 === 0 && a_umbral(sx, sy) < 0.6 ? blanco[1] : blanco[0]; });
    R.linea(...P(uM, gTh), ...P(uP, gPk), a_P.maderaS); R.linea(...P(uM, bTh), ...P(uB, bEnd), a_P.maderaS);
    if (f < 0.5) { R.linea(...P(uM - 0.02 * L, bTh + 1.5), ...P(uB + 0.02 * L, bEnd + 1.5), blanco[0]); R.linea(...P(uM - 0.03 * L, bTh + 2.5), ...P(uB + 0.06 * L, bEnd + 2.5), blanco[1]); }
    // la bandera (barras rojas y blancas, el cantón azul con puntos) en el pico, que ondea
    const [fx, fy] = P(uP, gPk); if (o.bandera !== false) for (let i = 0; i < 9; i++) for (let j = 0; j < 6; j++) { const yy = fy + j + Math.round(Math.sin(t * 5 - i * 0.7) * (i / 9) * 1.5), xx = fx - dir * (i + 1);
      R.pset(xx, yy, i < 4 && j < 3 ? ((i + j) % 2 && j < 2 ? a_P.blanco : a_P.azul) : j % 2 ? a_P.blanco : a_P.rojo); } }
  // los foques: recogidos, una línea blanca sobre el bauprés; largados, dos triángulos
  if (velas > 0.05) { const f = velas; for (const [k, ub] of [[0.36, 0.72], [0.28, 0.6]]) { const tack = P(ub * L, vT(0.5 * L) + (ub - 0.5) * 0.3 * L), head = P(uF + 0.01 * L, cy(k)), clew = P(uF + 0.06 * L, vT(uF) + 0.03 * L);
      R.poligono([tack, [Math.round(tack[0] + (head[0] - tack[0]) * f), Math.round(tack[1] + (head[1] - tack[1]) * f)], [Math.round(tack[0] + (clew[0] - tack[0]) * f), Math.round(tack[1] + (clew[1] - tack[1]) * f)]], (sx, sy) => ((sx + sy) % 5 === 0 ? blanco[1] : blanco[0])); } }
  else { const b0 = P(0.5 * L, vT(0.5 * L) + 1); R.linea(b0[0], b0[1] - 1, bauF[0], bauF[1] - 1, blanco[0]); }
  return { P, vd, deck: P(0, vd(0)), escotilla: P(0.06 * L, vd(0.06 * L)), proa: P(0.52 * L, vT(0.52 * L)), popa: P(-0.5 * L, vT(-0.5 * L)), topeF, topeM };
}

// un barril de pie (base en y, centro x, unos 9 × 11 px): duelas, aros de hierro, la tapa de arriba con su luz; tipo 'b'
// (roble blanco) | 'r' (roble rojo) | 'p' (petróleo, oscuro)
function a_barrilPie(R, x, y, tipo = 'b', s = 1) {
  const [c, cs] = tipo === 'r' ? [C.robleR, C.robleRS] : tipo === 'p' ? [a_P.petroleo, a_P.petroleoS] : [C.robleB, C.robleBS], cl = a_mezcla(c, a_P.blanco, 0.3), hgt = Math.round(11 * s), w = Math.round(4 * s);
  for (let j = 0; j < hgt; j++) { const b = j === 0 || j === hgt - 1 ? w - 1 : w; for (let i = -b; i <= b; i++) R.pset(x + i, y - j, i === b || i === b - 1 ? cs : i === -b + 1 ? cl : (i + 9) % 3 === 0 ? cs : c); }
  for (const j of [2, hgt - 3]) R.rect(x - w, y - j, x + w, y - j, C.aro);
  R.rect(x - w + 1, y - hgt, x + w - 1, y - hgt, cl); R.rect(x - w + 2, y - hgt - 1, x + w - 2, y - hgt - 1, a_mezcla(c, a_P.blanco, 0.5)); R.pset(x + 1, y - hgt, cs);
}

// un barril tumbado visto de cara (la tapa redonda): (cx, cy) el centro, r el radio; o.gira (el ángulo al rodar),
// o.hueco 0–1 (sin tapa, el interior oscuro, el aro que cae), o.gotas (rezuma, con la t), o.tiza (una raya de tiza)
function a_barrilCara(R, cx, cy, r, tipo = 'b', o = {}) {
  const [c, cs] = tipo === 'r' ? [C.robleR, C.robleRS] : tipo === 'p' ? [a_P.petroleo, a_P.petroleoS] : [C.robleB, C.robleBS], cl = a_mezcla(c, a_P.blanco, 0.28), g = o.gira ?? 0, hueco = o.hueco ?? 0, t = o.t ?? 0;
  cx = Math.round(cx); cy = Math.round(cy);
  R.disco(cx, cy + 1, r + 0.5, a_mezcla(cs, a_P.negro, 0.4));
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r + 0.3) continue;
    let col;
    if (d > r - 1.2) col = C.aro; else if (d > r - 2.4) col = (i + j) < 0 ? cl : cs;   // el canto y el aro de fuera
    else if (hueco > 0.5) col = d > r - 3.4 ? cs : a_umbral(cx + i, cy + j) < (d / r) * 0.6 ? a_P.interiorL : a_P.interior;
    else { const ii = i * Math.cos(g) + j * Math.sin(g), jj = -i * Math.sin(g) + j * Math.cos(g), tabla = Math.floor((jj + r) / Math.max(2, r * 0.42));
      col = Math.abs((jj + r) % Math.max(2, r * 0.42)) < 0.6 ? cs : (tabla % 2 ? c : a_mezcla(c, cl, 0.4)); if (i + j < -r * 0.9) col = cl;
      if (r >= 6 && Math.abs(ii - r * 0.15) < 1 && Math.abs(jj + r * 0.05) < 1) col = a_P.maderaD; }   // el tapón
    R.pset(cx + i, cy + j, col); }
  if (hueco > 0.5) { const caida = Math.min(1, (hueco - 0.5) * 2); R.linea(cx - r, cy + Math.round(r * 0.6 + caida * 3), cx + r, cy + Math.round(r * 0.6 + caida * 3), C.aro); }
  if (o.tiza) { R.linea(cx - Math.round(r * 0.4), cy - Math.round(r * 0.1), cx + Math.round(r * 0.4), cy - Math.round(r * 0.3), a_P.blanco); R.pset(cx + Math.round(r * 0.4), cy - Math.round(r * 0.3) - 1, a_P.blanco); }
  if (o.gotas && hueco <= 0.5) { for (let k = 0; k < 2; k++) { const gx = cx - Math.round(r * 0.35) + k * Math.round(r * 0.6), f = ((t * 0.45 + k * 0.5 + cx * 0.013) % 1); R.linea(gx, cy + Math.round(r * 0.2), gx, cy + r - 1, a_mezcla(c, a_P.negro, 0.35));
    const gy = cy + Math.round(r * 0.2 + f * (r * 0.8 + 6)); R.pset(gx, gy, a_P.charco); R.pset(gx, gy - 1, a_mezcla(c, a_P.charco, 0.5)); } }
}

// un hombre pequeño de fondo (unos 12 px) en (x, y = los pies), mirando a dir: k cambia la ropa; acc 'quieto' |
// 'anda' | 'tira' (de un cabo, inclinado) | 'carga' (un barril al hombro) | 'sierra' (los brazos arriba y abajo) |
// 'martillo' | 'saluda'
function a_peon(R, x, y, t, k = 0, acc = 'quieto', dir = 1) {
  x = Math.round(x); y = Math.round(y); const ropa = [a_P.ropa1, a_P.ropa2, a_P.ropa3, a_P.ropa4, a_P.ropa5][k % 5], ropaS = a_mezcla(ropa, a_P.negro, 0.35), F = (i) => x + dir * i;
  const paso = acc === 'anda' || acc === 'carga' ? Math.floor(t * 6 + k) % 2 : 0, incl = acc === 'tira' ? -1 : 0;
  R.pset(F(-1 - paso), y - 1, a_P.negro); R.pset(F(1 + paso), y - 1, a_P.negro); R.rect(Math.min(F(-1), F(1)), y - 3, Math.max(F(-1), F(1)), y - 2, a_P.ropa4); R.pset(x, y - 2, a_P.negro);
  R.rect(Math.min(F(-2) + incl * dir, F(2) + incl * dir), y - 8, Math.max(F(-2) + incl * dir, F(2) + incl * dir), y - 4, ropa); R.rect(Math.min(F(-2), F(-2)) + incl * dir, y - 8, F(-2) + incl * dir, y - 4, ropaS);
  const hx = x + incl * 2 * dir; R.rect(hx - 1, y - 11, hx + 1, y - 9, a_P.piel); R.pset(F(1) + incl * 2 * dir, y - 10, a_P.negro); R.rect(hx - 1, y - 12, hx + 1, y - 12, a_P.gorra); R.pset(hx + 2 * dir, y - 12, a_P.gorra);
  if (acc === 'sierra' || acc === 'martillo') { const s = Math.round(Math.sin(t * (acc === 'sierra' ? 7 : 9) + k) * 2); R.linea(F(2), y - 7, F(4), y - 6 + s, a_P.piel); if (acc === 'martillo') { R.linea(F(4), y - 6 + s, F(4), y - 9 + s, a_P.maderaS); R.pset(F(5), y - 9 + s, a_P.hierro); } }
  else if (acc === 'tira') { R.linea(F(2) - dir, y - 6, F(5) - dir, y - 6, a_P.piel); }
  else if (acc === 'carga') { R.rect(Math.min(F(-3), F(1)), y - 15, Math.max(F(-3), F(1)), y - 12, C.robleB); R.rect(Math.min(F(-3), F(1)), y - 13, Math.max(F(-3), F(1)), y - 13, C.aro); R.pset(F(2), y - 9, a_P.piel); }
  else if (acc === 'saluda') { const s = Math.sin(t * 8) > 0 ? 1 : 0; R.linea(F(2), y - 7, F(3 + s), y - 12, a_P.piel); }
  else R.pset(F(2), y - 5, a_P.piel);
}

// un caballo (o una mula) con su carro de dos ruedas y un carretero, de perfil, en (x = el pecho del caballo, y = los
// cascos) mirando a dir; las patas andan y la rueda gira con t si anda; carga 'barriles' | 'nada'
function a_carro(R, x, y, t, dir = 1, o = {}) {
  x = Math.round(x); y = Math.round(y); const F = (i) => x + dir * i, anda = o.anda !== false, ph = anda ? t * 7 : 0, [cb, cbS, cbL] = o.mula ? [a_P.mula, a_P.mulaS, a_P.mula] : [a_P.caballo, a_P.caballoS, a_P.caballoL];
  const R2 = (i0, j0, i1, j1, c) => R.rect(Math.min(F(i0), F(i1)), j0, Math.max(F(i0), F(i1)), j1, c);
  // el carro, detrás del caballo
  R2(-28, y - 12, -8, y - 7, a_P.madera); R2(-28, y - 12, -8, y - 12, a_P.maderaL); R2(-28, y - 7, -8, y - 7, a_P.maderaD); for (let i = -26; i < -8; i += 5) R2(i, y - 11, i, y - 8, a_P.maderaS);
  R.linea(F(-8), y - 9, F(1), y - 8, a_P.maderaD);
  if ((o.carga ?? 'barriles') === 'barriles') for (let k = 0; k < 3; k++) a_barrilPie(R, F(-25 + k * 6), y - 13, o.petroleo ? 'p' : 'b', 0.55);
  const wx = F(-18), wy = y - 5; R.disco(wx, wy, 5, a_P.maderaD); R.disco(wx, wy, 4, a_P.madera); R.disco(wx, wy, 3, a_P.maderaD);
  for (let k = 0; k < 3; k++) { const an = -ph * 0.35 * dir + (k * Math.PI) / 3; R.linea(wx - Math.round(Math.cos(an) * 3), wy - Math.round(Math.sin(an) * 3), wx + Math.round(Math.cos(an) * 3), wy + Math.round(Math.sin(an) * 3), a_P.maderaL); } R.pset(wx, wy, a_P.hierro);
  // el carretero sentado delante del carro
  a_peon(R, F(-9), y - 11, t, 3, 'quieto', dir);
  // el caballo
  const pat = (i, f) => { const s = Math.round(Math.sin(ph + f) * 1.5); R2(i + s, y - 6, i + s, y - 1, cbS); R.pset(F(i + s), y, a_P.negro); };
  pat(1, 0); pat(9, Math.PI); R2(-1, y - 13, 11, y - 6, cb); R2(-1, y - 7, 11, y - 7, cbS); R2(0, y - 13, 10, y - 13, cbL); pat(3, Math.PI); pat(11, 0);
  const cab = Math.round(Math.sin(t * 2.2) * 0.8); R2(10, y - 17 + cab, 13, y - 11, cb); R2(13, y - 18 + cab, 16, y - 15 + cab, cb); R.pset(F(16), y - 15 + cab, cbS); R.pset(F(14), y - 17 + cab, a_P.negro); R.pset(F(13), y - 19 + cab, cbS);
  R2(9, y - 17 + cab, 10, y - 12, a_P.crin); const cola = Math.round(Math.sin(t * 3) * 1.5); R.linea(F(-1), y - 12, F(-3), y - 7 + cola, a_P.crin);
  R2(0, y - 11, 9, y - 11, a_P.maderaD);   // los arreos
}

// humo que sube de (x, y) y se lo lleva el viento hacia dx (por segundo), hasta alto px; se desvanece antes de techo
function a_humo(R, t, x, y, alto, dx = -6, k = 0, cols = [a_P.humoD, a_P.humoS, a_P.humo], techo = 40) {
  for (let i = 0; i < 9; i++) { const e = ((t * 0.32 + i / 9 + k * 0.13) % 1), py = y - e * alto, px = x + dx * e * alto / 10 + Math.sin(e * 6 + i + k) * 2, r = 1.5 + e * 5;
    if (py - r < techo) continue; const c = e < 0.2 ? cols[0] : e < 0.55 ? cols[1] : cols[2];
    R.disco(Math.round(px), Math.round(py), Math.round(r), c); if (r > 3) R.disco(Math.round(px - 1), Math.round(py - 1), Math.round(r * 0.55), a_mezcla(c, a_P.blanco, 0.25)); }
}

// un abeto: un tronco y pisos de ramas de tres tonos, con su luz a la izquierda
function a_abeto(R, x, base, alto, sem, cols = [a_P.abetoS, a_P.abeto, a_P.abetoL]) {
  const w = alto * 0.36; R.linea(x, base, x, base - 3, a_P.maderaD);
  for (let j = 0; j < alto; j++) { const f = j / alto, m = Math.max(0, Math.round(w * (1 - f) * (0.75 + 0.25 * ((j % 4) / 3)))), yy = base - 2 - j;
    for (let i = -m; i <= m; i++) R.pset(x + i, yy, i < -m * 0.4 ? cols[2] : i > m * 0.35 || (j % 4 === 0 && h(i, j, sem) < 0.5) ? cols[0] : cols[1]); }
}

// una textura de adoquines (filas de piedras redondeadas, juntas oscuras, la luz arriba a la izquierda) y charcos que
// reflejan el cielo, de (x0, y0) a (x1, y1); el tamaño de la piedra crece hacia abajo (perspectiva)
function a_adoquines(R, x0, y0, x1, y1, L, mojado = 0.5) {
  const B = R.buf, cielo = L.cielo[3];
  let fila = 0, y = y0;
  while (y <= y1) { const alt = Math.round(3 + ((y - y0) / Math.max(1, y1 - y0)) * 3), ancho = alt * 2 + 1, off = (fila % 2) * Math.round(ancho / 2);
    for (let j = 0; j < alt && y + j <= y1; j++) for (let x = x0; x <= x1; x++) { const xi = x + off, celda = Math.floor(xi / ancho), i = xi - celda * ancho, sem = h(celda, fila, 661);
      let c = sem < 0.3 ? a_P.adoqS : sem > 0.8 ? a_P.adoqL : a_P.adoq;
      if (i === 0 || j === alt - 1) c = a_P.adoqJ; else if (j === 0 || i === 1) c = a_mezcla(c, a_P.adoqL, 0.5); else if (i === ancho - 1 || j === alt - 2) c = a_mezcla(c, a_P.adoqJ, 0.4);
      if (mojado > 0 && sem > 1 - mojado * 0.3 && j > 0 && i > 1 && i < ancho - 1) c = a_mezcla(c, cielo, 0.4);
      B[(y + j) * 320 + x] = c; }
    y += alt; fila++; }
  // charcos: elipses que reflejan el cielo, con el filo oscuro
  for (let k = 0; k < Math.round(mojado * 6); k++) { const cx = x0 + 20 + h(k, 1, 662) * (x1 - x0 - 40), cy = y0 + 4 + h(k, 2, 662) * (y1 - y0 - 8), rx = 6 + h(k, 3, 662) * 10, ry = 1.5 + h(k, 4, 662) * 1.5;
    for (let j = -Math.ceil(ry); j <= Math.ceil(ry); j++) for (let i = -Math.ceil(rx); i <= Math.ceil(rx); i++) { const d = (i / rx) ** 2 + (j / ry) ** 2, xx = Math.round(cx + i), yy = Math.round(cy + j); if (d > 1 || xx < x0 || xx > x1 || yy < y0 || yy > y1) continue;
      B[yy * 320 + xx] = d > 0.7 ? a_mezcla(B[yy * 320 + xx], a_P.adoqJ, 0.4) : j < 0 && a_umbral(xx, yy) < 0.4 ? a_mezcla(cielo, a_P.blanco, 0.3) : a_mezcla(cielo, a_P.adoqS, 0.25); } }
}

// un suelo de grava (o de arena) de (x0, y0) a (x1, y1) que en cada columna empieza en arriba(x): manchas grandes
// (pisado, húmedo), granos sueltos y piedras de 2–5 px con su luz arriba y su sombra, más grandes hacia delante;
// cols = [base, sombra, luz, oscura]
function a_grava(R, x0, y0, x1, y1, arriba, cols, sem = 0, o = {}) {
  const B = R.buf;
  for (let x = x0; x <= x1; x++) { const ya = Math.max(y0, Math.ceil(arriba(x)));
    for (let y = ya; y <= y1; y++) { const m = h(x >> 3, y >> 2, 801 + sem), m2 = h(x >> 4, y >> 3, 802 + sem), d = h(x, y, 803 + sem);
      let c = m2 > 0.72 ? (a_umbral(x, y) < 0.5 ? cols[2] : cols[0]) : m < 0.22 ? (a_umbral(x, y) < 0.6 ? cols[1] : cols[0]) : cols[0];
      if (d > 0.93) c = cols[2]; else if (d < 0.06) c = cols[1]; else if (d < 0.08) c = cols[3];
      B[y * 320 + x] = c; } }
  for (let k = 0; k < (o.piedras ?? 60); k++) { const x = Math.round(x0 + h(k, 1, 804 + sem) * (x1 - x0)), yy = Math.round(y0 + h(k, 2, 804 + sem) * (y1 - y0)); if (yy < arriba(x) + 2) continue; const r = 1 + Math.round(((yy - y0) / (y1 - y0)) * 2 * h(k, 3, 804 + sem));
    R.rect(x - r, yy, x + r, yy + r, cols[0]); R.rect(x - r, yy, x + r - 1, yy, cols[2]); R.rect(x - r + 1, yy + r + 1, x + r + 1, yy + r + 1, cols[3]); }
}

// lo que hay sobre un suelo de losas de un muelle, de (x0, y0) a (x1, y1): grietas, manchas de humedad y de brea,
// hierbajos en las juntas, briznas de paja, argollas de hierro, un aro de barril suelto y duelas rotas
function a_muelleSucio(R, x0, y0, x1, y1, sem = 0) {
  const W = x1 - x0, Hh = y1 - y0, B = R.buf;
  for (let k = 0; k < 14; k++) { let x = x0 + h(k, 1, 811 + sem) * W, y = y0 + h(k, 2, 811 + sem) * Hh; for (let i = 0; i < 6 + k % 5; i++) { R.pset(Math.round(x), Math.round(y), a_P.losaJ); x += h(k, i, 812 + sem) > 0.5 ? 1 : -1; y += 0.6; } }
  for (let k = 0; k < 7; k++) { const cx = x0 + h(k, 3, 811 + sem) * W, cy = y0 + 4 + h(k, 4, 811 + sem) * (Hh - 8), rx = 5 + h(k, 5, 811 + sem) * 9, ry = 1.5 + h(k, 6, 811 + sem) * 2, col = k % 3 === 0 ? a_P.petroleoS : a_P.losaS;
    for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) { const xx = Math.round(cx + i), yy = Math.round(cy + j), d = (i / rx) ** 2 + (j / ry) ** 2; if (d > 1 || xx < x0 || xx > x1 || yy < y0 || yy > y1) continue; if (a_umbral(xx, yy) < (1 - d) * 0.8) B[yy * 320 + xx] = a_mezcla(B[yy * 320 + xx], col, 0.45); } }
  for (let k = 0; k < 40; k++) { const x = Math.round(x0 + h(k, 7, 811 + sem) * W), y = Math.round(y0 + h(k, 8, 811 + sem) * Hh); if (k % 2) { R.pset(x, y, a_P.hierbaS); R.pset(x + 1, y - 1, a_P.hierba); } else { R.linea(x, y, x + 2 + (k % 3), y - (k % 2), a_P.serrin); } }
  for (let k = 0; k < 2; k++) { const x = Math.round(x0 + 30 + h(k, 9, 811 + sem) * (W - 60)), y = Math.round(y0 + 6 + h(k, 10, 811 + sem) * (Hh - 12)); R.rect(x - 2, y, x + 2, y, a_P.hierro); R.pset(x - 3, y + 1, a_P.hierro); R.pset(x + 3, y + 1, a_P.hierro); R.rect(x - 2, y + 2, x + 2, y + 2, a_P.hierroL); R.rect(x - 1, y - 1, x + 1, y - 1, a_P.losaJ); }
}

// una pared de ladrillo de (x0, y0) a (x1, y1): hiladas a soga con el mortero claro, cada ladrillo con su tono, el
// hollín arriba y la humedad abajo
function a_ladrillo(R, x0, y0, x1, y1) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / 3), j = (y - y0) % 3, sucio = (y - y0) / Math.max(1, y1 - y0);
    for (let x = x0; x <= x1; x++) { const xi = x + (fila % 2) * 3, ci = Math.floor(xi / 6), i = xi % 6, s = h(ci, fila, 671);
      let c = j === 2 || i === 0 ? a_P.mortero : s < 0.25 ? a_P.ladrS : s > 0.85 ? a_P.ladrL : a_P.ladr;
      if (c !== a_P.mortero && j === 0 && i > 0 && s > 0.5) c = a_mezcla(c, a_P.ladrL, 0.5);
      if (sucio < 0.12 && a_umbral(x, y) < 0.5 - sucio * 4) c = a_mezcla(c, a_P.hollin, 0.5); else if (sucio > 0.8 && a_umbral(x, y) < (sucio - 0.8) * 3) c = a_mezcla(c, a_P.ladrD, 0.6);
      B[y * 320 + x] = c; } }
}

// tablas horizontales con vetas y juntas, de (x0, y0) a (x1, y1); alto: el ancho de cada tabla
function a_tablas(R, x0, y0, x1, y1, alto = 3, cols = [a_P.madera, a_P.maderaS, a_P.maderaL, a_P.maderaD], sem = 0) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), j = (y - y0) % alto;
    for (let x = x0; x <= x1; x++) { const largo = 22 + Math.floor(h(fila, 1, 681 + sem) * 14), xi = x + fila * 7, pieza = Math.floor(xi / largo), i = xi % largo, s = h(pieza, fila, 682 + sem);
      let c = j === alto - 1 || i === 0 ? cols[3] : s < 0.3 ? cols[1] : cols[0];
      if (j === 0 && c !== cols[3]) c = a_mezcla(c, cols[2], 0.6); else if (c !== cols[3] && h(x >> 2, y, 683 + sem) > 0.86) c = cols[1];
      if (i === 3 && j === 1 && s > 0.6) c = a_P.hierro;   // un clavo
      B[y * 320 + x] = c; } }
}

// sillares de piedra (bloques grandes con juntas y luz), de (x0, y0) a (x1, y1)
function a_sillares(R, x0, y0, x1, y1, ah = 6, aw = 14, cols = [a_P.piedra, a_P.piedraS, a_P.piedraL, a_P.losaJ]) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / ah), j = (y - y0) % ah;
    for (let x = x0; x <= x1; x++) { const xi = x + (fila % 2) * Math.round(aw / 2), ci = Math.floor(xi / aw), i = xi % aw, s = h(ci, fila, 691);
      let c = j === ah - 1 || i === 0 ? cols[3] : j === 0 || i === 1 ? cols[2] : s < 0.3 ? cols[1] : cols[0];
      if (c === cols[0] && h(x, y, 692) > 0.9) c = cols[1];
      B[y * 320 + x] = c; } }
}

// las letras del nombre del barco (la ÚNICA excepción de letras del episodio), de 5 × 7
const a_LETRAS = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'], M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'], O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  N: ['#...#', '##..#', '#.#.#', '#.#.#', '#..##', '#...#', '#...#'], R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'], C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'], L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  S: ['.###.', '#...#', '#....', '.###.', '....#', '#...#', '.###.'], T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'], ' ': [],
};

// escribe texto (de a_LETRAS) desde (x, y) con el color c y su sombra cs (abajo a la derecha); n: cuántas letras
function a_rotulo(R, texto, x, y, c, cs, n = 99) {
  [...texto].slice(0, n).forEach((l, k) => { const g = a_LETRAS[l] || []; g.forEach((fila, j) => [...fila].forEach((p, i) => { if (p !== '#') return; if (cs) R.pset(x + k * 6 + i + 1, y + j + 1, cs); R.pset(x + k * 6 + i, y + j, c); })); });
}

// LA ISLA DE SPENCER (1861) o la playa del varado (1867)
function a_astillero(R, t, o, L, v) {
  const v67 = v.epoca === 1867, hor = 96, clave = 'ast|' + v.luz + '|' + v.epoca;
  const orilla = (x) => (v67 ? 120 + x * 0.05 + Math.sin(x * 0.05) * 2 : 104 + Math.max(0, x - 120) * 0.24 + Math.max(0, x - 232) * 0.9);
  const cielo = a_buf(R, clave + '|cielo', () => a_cieloBase(R, hor + 20, L, v67 ? null : [228, 58, 7]));
  const capa = a_buf(R, clave + '|capa', (b) => {
    if (!v67) {
      // colinas lejanas (azuladas) y la cercana con el bosque de abetos en dos términos
      const lej = a_mezcla(a_P.colinaS, L.cielo[4], 0.55), lejL = a_mezcla(a_P.colina, L.cielo[4], 0.5);
      for (let x = 0; x < 320; x++) { const y0 = Math.round(70 + Math.sin(x * 0.02 + 1) * 8 + Math.sin(x * 0.07) * 3 + (x > 250 ? (x - 250) * 0.2 : 0)); for (let y = y0; y < 112; y++) R.pset(x, y, a_umbral(x, y) < 0.25 ? lejL : lej); }
      for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 701) * 330 - 5), base = Math.round(80 + Math.sin(x * 0.02 + 1) * 6 + h(k, 2, 701) * 14); a_abeto(R, x, base, 8 + Math.round(h(k, 3, 701) * 6), k, [a_mezcla(a_P.abetoS, L.cielo[4], 0.45), a_mezcla(a_P.abeto, L.cielo[4], 0.42), a_mezcla(a_P.abetoL, L.cielo[4], 0.4)]); }
      for (let x = 0; x < 320; x++) { const y0 = Math.round(92 + Math.sin(x * 0.03) * 4 - (x < 140 ? (140 - x) * 0.08 : 0)); for (let y = y0; y < 120; y++) R.pset(x, y, h(x >> 1, y >> 1, 702) > 0.7 ? a_P.colinaL : y < y0 + 2 ? a_P.colinaL : a_P.colina); }
      for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 4, 701) * 200 - 5), base = Math.round(104 + Math.sin(x * 0.03) * 3 - (x < 140 ? (140 - x) * 0.08 : 0) + h(k, 5, 701) * 6); a_abeto(R, x, base, 13 + Math.round(h(k, 6, 701) * 9), k + 100); }
      // el islote del fondo, al otro lado de la cala
      for (let x = 230; x < 300; x++) { const y0 = Math.round(101 - Math.sqrt(Math.max(0, 1 - ((x - 265) / 35) ** 2)) * 6); for (let y = y0; y <= 104; y++) R.pset(x, y, a_mezcla(a_P.colinaS, L.cielo[4], 0.35)); }
      for (let k = 0; k < 8; k++) a_abeto(R, 240 + k * 7 + Math.round(h(k, 9, 701) * 4), 99, 5 + (k % 3), k + 200, [a_mezcla(a_P.abetoS, L.cielo[4], 0.3), a_mezcla(a_P.abeto, L.cielo[4], 0.3), a_mezcla(a_P.abetoL, L.cielo[4], 0.3)]);
      // el suelo: la franja de hierba al pie del bosque, la grava de la orilla (húmeda junto al agua), el serrín y las
      // virutas del astillero, la línea de algas que deja la marea
      a_grava(R, 0, 104, 319, 179, (x) => (x < 160 ? 104 : orilla(x) - 3), [a_P.grava, a_P.gravaS, a_P.gravaL, a_P.rocaS], 0, { humedo: 0, piedras: 90 });
      for (let x = 0; x < 320; x++) { const ya = x < 160 ? 104 : Math.ceil(orilla(x)) + 1; for (let y = ya; y < Math.min(ya + 5, 180); y++) if (x > 150) R.pset(x, y, a_mezcla(R.pget(x, y), a_P.rocaS, 0.45 - (y - ya) * 0.08)); }
      for (let y = 104; y < 113; y++) for (let x = 0; x < 165; x++) { if (y > 108 + Math.sin(x * 0.3) * 2 + h(x, 1, 707) * 3) continue; R.pset(x, y, h(x, y, 705) > 0.55 ? a_P.hierbaS : h(x, y, 706) > 0.8 ? a_P.hierbaL : a_P.hierba); }
      for (let k = 0; k < 160; k++) { const x = Math.round(30 + h(k, 1, 708) * 240), y = Math.round(118 + h(k, 2, 708) * 58); if (x > 150 && y < orilla(x) + 3) continue; const c = k % 3 ? a_P.serrin : C.tablaL; R.pset(x, y, c); if (k % 2) R.pset(x + 1, y + (k % 4 === 1 ? 0 : 1), a_mezcla(c, a_P.maderaS, 0.4)); }
      for (let x = 152; x < 320; x++) { const y = Math.round(orilla(x)) + 3 + Math.round(Math.sin(x * 0.4) * 1); if (h(x, 3, 709) > 0.45) R.pset(x, y, h(x, 4, 709) > 0.5 ? a_P.hierbaS : a_P.maderaD); }
      // las herramientas en el suelo: una azuela, un mazo, un rollo de cabo, la carretilla y un caballete con su tablón
      R.linea(196, 170, 206, 166, a_P.maderaL); R.rect(205, 164, 207, 167, a_P.hierro); R.pset(206, 164, a_P.hierroL);
      R.linea(60, 172, 68, 170, a_P.madera); R.rect(67, 168, 71, 171, a_P.maderaS); R.rect(67, 168, 71, 168, a_P.maderaL);
      for (let k = 0; k < 3; k++) R.disco(232, 168, 5 - k * 1.5, k % 2 ? a_P.cuerdaS : a_P.cuerda); R.pset(232, 168, a_P.maderaD);
      R.poligono([[4, 140], [24, 140], [22, 147], [6, 147]], (x, y) => (y === 140 ? a_P.maderaL : (x + y) % 4 ? a_P.madera : a_P.maderaS)); R.disco(27, 147, 3, a_P.maderaD); R.disco(27, 147, 1.5, a_P.madera); R.linea(4, 145, -2, 150, a_P.maderaD); R.linea(8, 147, 8, 151, a_P.maderaD);
      R.rect(6, 136, 20, 140, a_P.serrin); R.rect(6, 136, 20, 136, C.tablaL);
      // el cobertizo de la izquierda: tablas, tejado de tablillas, la puerta abierta con herramientas
      a_tablas(R, 0, 92, 44, 128, 3, [a_P.gris, a_P.grisS, a_P.grisL, a_P.maderaD], 1);
      R.poligono([[-4, 92], [22, 80], [50, 92]], (x, y) => ((x + (y % 2) * 2) % 4 === 0 ? a_P.maderaD : y % 3 === 0 ? a_P.maderaS : a_P.madera)); R.linea(-4, 92, 22, 80, a_P.maderaL); R.linea(22, 80, 50, 92, a_P.maderaS);
      R.rect(10, 106, 24, 128, a_P.interior); R.rect(10, 106, 24, 106, a_P.maderaD); R.linea(13, 110, 13, 120, a_P.hierroL); R.linea(17, 109, 19, 118, a_P.maderaL); R.rect(20, 120, 23, 127, a_P.maderaS);
      R.rect(30, 104, 38, 112, a_P.vidrio); R.rect(30, 104, 30, 112, a_P.maderaD); R.rect(34, 104, 34, 112, a_P.maderaD); R.rect(30, 108, 38, 108, a_P.maderaD); R.pset(31, 105, a_P.vidrioL);
      // la caja de vapor: un cajón largo de tablas sobre caballetes y su caldera negra con la chimenea
      a_tablas(R, 46, 116, 92, 124, 3, [a_P.madera, a_P.maderaS, a_P.maderaL, a_P.maderaD], 2); R.rect(46, 125, 92, 125, a_P.maderaD); for (const xx of [50, 70, 88]) { R.linea(xx, 126, xx - 2, 132, a_P.maderaD); R.linea(xx, 126, xx + 2, 132, a_P.maderaD); }
      R.rect(94, 112, 104, 130, a_P.hierro); R.rect(94, 112, 95, 130, a_P.hierroL); R.rect(97, 100, 100, 112, a_P.hierro); R.rect(97, 100, 97, 112, a_P.hierroL); R.rect(96, 99, 101, 100, a_P.negro); R.rect(97, 124, 101, 127, a_P.llama); R.linea(92, 118, 94, 118, a_P.hierroL);
      // pilas de tablas con las cabezas a la vista
      for (const [px, n] of [[110, 6], [130, 4]]) for (let j = 0; j < n; j++) { const y = 132 - j * 3; R.rect(px - j % 2, y - 2, px + 16 - j % 2, y, j % 2 ? a_P.maderaL : C.tabla); R.rect(px - j % 2, y, px + 16 - j % 2, y, a_P.maderaS); for (let i = 0; i < 16; i += 4) R.pset(px + i - j % 2, y - 1, C.tablaS); }
      R.rect(108, 133, 148, 134, a_P.maderaD);
      // la grada: dos anguilas de troncos que bajan a la cala, sobre traviesas
      for (let k = 0; k < 18; k++) { const xx = 52 + k * 16, yy = Math.round(148 + (xx - 52) * 0.065); if (yy > orilla(xx) + 30) continue; R.rect(xx - 2, yy - 1, xx + 9, yy + 2, a_P.maderaS); R.rect(xx - 2, yy - 1, xx + 9, yy - 1, a_P.madera); R.disco(xx - 2, yy + 1, 1.5, a_P.maderaD); }
      R.poligono([[50, 144], [320, 162], [320, 165], [50, 147]], (x, y) => (y % 2 === 0 ? a_P.madera : (x % 9 === 0 ? a_P.maderaD : a_P.maderaS)));
      R.linea(50, 144, 320, 162, a_P.maderaL);
      // los andamios del otro lado del casco: pies derechos, tablones y escaleras
      for (const xx of [74, 112, 150, 188, 226]) { R.linea(xx, 96, xx, 146, a_P.grisS); R.linea(xx + 1, 96, xx + 1, 146, a_P.gris); }
      for (const yy of [98, 114]) { R.rect(70, yy, 230, yy + 1, a_P.grisL); R.rect(70, yy + 2, 230, yy + 2, a_P.grisS); }
      for (let yy = 100; yy < 114; yy += 3) R.linea(200, yy, 206, yy, a_P.grisS); R.linea(200, 99, 200, 114, a_P.grisS); R.linea(206, 99, 206, 114, a_P.grisS);
    } else {
      // 1867: otra costa: acantilados lejanos, dunas con hierba, la playa de arena gris
      // los acantilados lejanos: la hierba arriba, la cara de roca con vetas verticales, grietas y su luz, y abajo los
      // derrubios; a la derecha bajan hacia el mar
      for (let x = 0; x < 320; x++) { const y0 = Math.round(82 + Math.sin(x * 0.015) * 6 + (x > 200 ? (x - 200) * 0.15 : 0) + Math.abs(Math.sin(x * 0.11)) * 3), veta = h(x >> 2, 0, 711), luz = Math.sin(x * 0.11) > 0.2;
        for (let y = y0; y < 120; y++) { const k = y - y0; let c = k < 2 ? a_P.hierbaS : k < 3 ? a_P.hierba : veta > 0.75 ? a_P.rocaS : luz && a_umbral(x, y) < 0.5 ? a_P.rocaL : a_P.roca;
          if (h(x, y >> 2, 716) > 0.94) c = a_P.rocaS; if (y > 104 && a_umbral(x, y) < (y - 104) / 16) c = a_P.gravaS; R.pset(x, y, a_mezcla(c, L.cielo[4], 0.32)); } }
      const duna = (x) => Math.round(110 + Math.sin(x * 0.04) * 3);
      a_grava(R, 0, 104, 319, 179, (x) => (x > 200 ? Math.max(duna(x), orilla(x) - 3) : duna(x)), [a_mezcla(a_P.arenaP, a_P.grava, 0.45), a_P.arenaPS, a_P.arenaP, a_P.gravaS], 7, { piedras: 70 });
      for (let x = 0; x < 210; x++) for (let y = duna(x); y < duna(x) + 8; y++) if (h(x >> 1, y, 712) > 0.5) R.pset(x, y, h(x, y, 714) > 0.6 ? a_P.hierbaS : a_P.arenaPS);
      // la línea de algas y conchas que deja la marea, charcos que reflejan el cielo, huellas
      for (let x = 196; x < 320; x++) { const y = Math.round(orilla(x)) + 4 + Math.round(Math.sin(x * 0.3) * 1.2); if (h(x, 5, 715) > 0.35) R.pset(x, y, h(x, 6, 715) > 0.5 ? a_P.hierbaS : a_P.maderaD); if (h(x, 7, 715) > 0.94) R.pset(x, y + 2, a_P.blanco); }
      for (const [cx, cy, rx] of [[226, 168, 12], [290, 174, 9], [70, 172, 8]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 2.4) ** 2 <= 1) R.pset(cx + i, cy + j, j < 0 && a_umbral(cx + i, cy + j) < 0.4 ? L.cielo[5] : L.cielo[3]);
      for (let k = 0; k < 12; k++) { const x = 40 + k * 9, y = 164 + (k % 2) * 3; R.rect(x, y, x + 1, y, a_P.arenaPS); }
      for (let k = 0; k < 50; k++) { const x = Math.round(h(k, 1, 713) * 210), y = Math.round(110 + Math.sin(x * 0.04) * 3 + h(k, 2, 713) * 4); R.linea(x, y, x - 1, y - 3, a_P.hierbaL); R.linea(x + 1, y, x + 2, y - 2, a_P.hierba); }
      // maderos y un cabrestante en la arena
      R.linea(30, 160, 64, 156, a_P.maderaD); R.linea(30, 161, 64, 157, a_P.madera); R.rect(250, 168, 290, 170, a_P.gris); R.rect(250, 168, 290, 168, a_P.grisL);
      R.rect(14, 140, 22, 150, a_P.maderaS); R.rect(12, 138, 24, 140, a_P.madera); R.linea(10, 144, 26, 144, a_P.maderaD);
    }
    a_tinta(b, L);
  });
  R.copiar(cielo);
  a_nubes(R, t, hor + (v67 ? -8 : 0), L, { viento: v67 ? 2.2 : 1 });
  a_volcar(R, capa, 50);
  // la cala (o el mar de 1867) con la marea, la espuma de la orilla y las gaviotas
  const marea = Math.sin(t * 0.55) * 1.6;
  if (!v67) { a_agua(R, t, 104, 180, L, { x0: 120, fondo: (x) => Math.round(orilla(x) + marea), eje: 104, refl: 0.45, ola: 0.6 });
    for (let x = 121; x < 320; x++) { const y = Math.round(orilla(x) + marea); if ((x + Math.floor(t * 5)) % 5 < 3) R.pset(x, y, C.espuma); if ((x * 3 + Math.floor(t * 3)) % 7 === 0) R.pset(x, y - 2, C.espuma); } }
  else { a_agua(R, t, 116, 180, L, { x0: 200, fondo: (x) => Math.round(orilla(x)), eje: 116, refl: 0.2, ola: 1.6 });
    for (let k = 0; k < 4; k++) { const f = ((t * 0.22 + k / 4) % 1), yy = Math.round(116 + f * 12); for (let x = 200; x < 320; x++) { const yb = Math.round(orilla(x)); if (yy + Math.round(Math.sin(x * 0.15 + k) * 1.5) >= yb) continue; if ((x + k * 5) % 9 < 6) R.pset(x, yy + Math.round(Math.sin(x * 0.15 + k) * 1.5), f > 0.7 ? C.espuma : C.marL); } }
    for (let x = 200; x < 320; x++) { const y = Math.round(orilla(x) + Math.sin(t * 1.4 + x * 0.05) * 2); R.pset(x, y, C.espuma); R.pset(x, y - 1, (x + Math.floor(t * 8)) % 3 ? C.espuma : C.marL); } }
  a_gaviotas(R, t, [120, 34, 300, 86], 5, v67 ? 9 : 2);
  let geo = {};
  if (!v67) {
    // la vida del astillero: la sierra de foso (dos hombres) y los carpinteros de los andamios, el humo de la caldera
    a_humo(R, t, 98, 98, 64, 4, 0, [a_P.humoD, a_P.humoS, a_P.humo], 30);
    const sy = Math.round(Math.sin(t * 7) * 3); R.rect(20, 136, 52, 139, a_P.madera); R.rect(20, 136, 52, 136, a_P.maderaL); R.disco(20, 137.5, 2, a_P.maderaD); R.linea(24, 140, 22, 147, a_P.maderaD); R.linea(48, 140, 50, 147, a_P.maderaD);
    R.rect(28, 140, 44, 150, a_P.interior); a_peon(R, 36, 136, t, 1, 'quieto', 1); R.linea(37, 125 + sy, 37, 147 + sy, a_P.hierroL); R.rect(36, 124 + sy, 38, 124 + sy, a_P.maderaS); a_peon(R, 36, 151, t + 0.5, 2, 'quieto', -1);
    R.rect(36, 147 + sy, 38, 147 + sy, a_P.maderaS); R.rect(26, 150, 46, 151, a_P.gravaS);
    a_peon(R, 120, 97, t, 3, 'martillo', 1); a_peon(R, 176, 113, t + 0.7, 0, 'martillo', -1);
    // el casco en la grada (o.bota: se desliza hacia la cala)
    const b = a_suave(o.bota ?? 0), Lc = 176, bx = 153 + b * 150, by = 134 + b * 10 + a_lim((b - 0.8) / 0.2) * 1.5, rot = 0.066 * (1 - a_lim((b - 0.75) / 0.25) * 0.9);
    const quilla = (x) => by + Lc * 0.075 + (x - bx) * Math.tan(rot), via = (x) => 144 + (x - 50) * 0.0667;
    // los picaderos (tacos de madera apilados entre la quilla y la grada) y los puntales, que caen al botarlo
    if (b === 0) for (let k = 0; k < 7; k++) { const xx = 80 + k * 24, y0 = Math.round(quilla(xx + 3)), y1 = Math.round(via(xx + 3)); for (let y = y0; y <= y1; y += 2) { R.rect(xx, y, xx + 7, y + 1, (y >> 1) % 2 ? a_P.maderaS : a_P.madera); R.rect(xx, y, xx + 7, y, a_P.maderaL); } R.rect(xx + 7, y0, xx + 7, y1, a_P.maderaD); }
    const clip = b < 0.5 ? 179 : Math.round(176 + (by + 1 - 176) * a_lim((b - 0.5) / 0.5));
    R.recorte([0, 0, 319, clip]);
    const g = a_bergantin(R, bx, by, Lc, t, { dir: 1, rot, casco: 'madera', cuadernas: 0.36, palos: false, bote: false });
    R.recorte(null);
    if (b === 0) for (let k = 0; k < 5; k++) { const xx = 84 + k * 34, yt = Math.round(by - 6 + (xx + 10 - bx) * Math.tan(rot)); R.linea(xx, 160, xx + 10, yt, a_P.maderaD); R.linea(xx + 1, 160, xx + 11, yt, a_P.madera); R.rect(xx - 2, 160, xx + 3, 161, a_P.maderaS); }
    else for (let k = 0; k < 5; k++) { const xx = 80 + k * 34; R.rect(xx, 162 - (k % 2), xx + 12, 163 - (k % 2), a_P.madera); R.rect(xx, 162 - (k % 2), xx + 12, 162 - (k % 2), a_P.maderaL); }
    if (b > 0.6) { const s = a_lim((b - 0.6) / 0.4), px = 286; for (let k = 0; k < 14; k++) { const an = Math.PI * (0.15 + 0.7 * h(k, 1, 721)), r = s * (8 + h(k, 2, 721) * 18), gx = px - 30 + k * 6 + Math.cos(an) * r * 0.5, gy = clip - Math.sin(an) * r + s * s * 12;
      if (gy < clip) R.pset(Math.round(gx), Math.round(gy), k % 3 ? C.espuma : C.marL); }
      for (let x = 236; x < 320; x++) { if (x < Math.round(bx - Lc * 0.5)) continue; const y = clip + 1 + Math.round(Math.sin(x * 0.3 + t * 6) * s); if ((x + Math.floor(t * 9)) % 3) R.pset(x, y, C.espuma); } }
    geo = { casco: [Math.round(bx - Lc * 0.5), Math.round(by - Lc * 0.12 * 1.2 - 2), Math.round(bx + Lc * 0.52), Math.round(by + Lc * 0.075)], proa: g.proa };
  } else {
    // 1867: el barco varado, escorado, con el mastelero partido; cuatro hombres tiran de un cabo
    const g = a_bergantin(R, 150, 146, 170, t, { dir: 1, rot: -0.13, casco: 'mc', velas: 0, roto: true, bote: false, bandera: false });
    const tira = Math.sin(t * 1.6) > 0 ? 1 : 0, [ax, ay] = g.P(-0.2 * 170, 18); R.linea(ax, ay, 26, 152, a_P.cuerdaS); R.linea(ax, ay - 1, 26, 151, a_P.cuerda);
    for (let k = 0; k < 4; k++) { const xx = 34 + k * 12 - tira; a_peon(R, xx, 158 - Math.round(k * 0.4), t + k * 0.2, k, 'tira', -1); }
    a_peon(R, 238, 158, t, 4, 'anda', -1);
    geo = { libre: [84, 200], casco: [64, 96, 244, 150], grada: null, proa: g.proa };
  }
  return geo;
}

// la popa en Nueva York (1868): el pintor tapa «AMAZON» y escribe «MARY CELESTE»
function a_popa(R, t, o, L, v) {
  const hor = 92, clave = 'popa|' + v.luz;
  const cielo = a_buf(R, clave + '|cielo', () => a_cieloBase(R, hor + 6, L, [70, 52, 6]));
  const capa = a_buf(R, clave + '|capa', (b) => {
    // la otra orilla: tejados, una torre y bosque de mástiles con sus vergas
    const lej = (c) => a_mezcla(c, L.cielo[4], 0.5);
    for (let k = 0; k < 26; k++) { const x0 = k * 13 - 4, w = 9 + Math.round(h(k, 1, 731) * 8), alto = 6 + Math.round(h(k, 2, 731) * 10); R.rect(x0, hor + 6 - alto, x0 + w, hor + 6, lej(k % 3 ? a_P.ladr : a_P.piedraS)); R.rect(x0, hor + 6 - alto, x0 + w, hor + 6 - alto, lej(a_P.tejaS));
      for (let i = x0 + 2; i < x0 + w - 1; i += 3) R.pset(i, hor + 9 - alto, lej(a_P.vidrio)); }
    R.rect(20, 66, 24, 98, lej(a_P.piedraS)); R.poligono([[19, 66], [22, 54], [25, 66]], lej(a_P.hierro));
    for (let k = 0; k < 9; k++) { const x = 40 + k * 24 + Math.round(h(k, 3, 731) * 10), top = 54 + Math.round(h(k, 4, 731) * 16); if (x > 120) continue; R.linea(x, top, x, 98, lej(a_P.maderaD)); R.linea(x - 5, top + 6, x + 5, top + 6, lej(a_P.maderaD)); R.linea(x - 4, top + 13, x + 4, top + 13, lej(a_P.maderaD)); }
    // el muelle de tablas: pilotes, el tablero en perspectiva, noray, rollo de cabo, cajas, la farola
    a_tablas(R, 0, 148, 124, 179, 4, [C.tabla, C.tablaS, C.tablaL, a_P.maderaS], 3);
    for (let y = 148; y < 180; y++) for (let x = 0; x < 125; x++) if (h(x >> 2, y >> 1, 732) > 0.93) R.pset(x, y, a_mezcla(C.tabla, L.cielo[3], 0.35));
    R.rect(0, 146, 126, 148, a_P.maderaS); R.rect(0, 146, 126, 146, a_P.maderaL);
    R.rect(121, 148, 126, 179, a_P.maderaD); R.rect(121, 148, 122, 179, a_P.maderaS); for (let y = 152; y < 180; y += 5) R.linea(121, y, 126, y + 2, a_P.interior);
    R.rect(96, 156, 102, 164, a_P.hierro); R.rect(95, 154, 103, 156, a_P.hierro); R.rect(96, 154, 97, 164, a_P.hierroL);
    for (let k = 0; k < 4; k++) R.disco(70, 166, 7 - k * 1.6, k % 2 ? a_P.cuerdaS : a_P.cuerda); R.disco(70, 166, 1, a_P.maderaD);
    R.rect(4, 150, 24, 166, a_P.madera); R.rect(4, 150, 24, 151, a_P.maderaL); R.rect(4, 157, 24, 157, a_P.maderaS); R.rect(13, 150, 14, 166, a_P.maderaS); R.rect(8, 140, 22, 150, C.tabla); R.rect(8, 140, 22, 140, C.tablaL); R.rect(8, 145, 22, 145, C.tablaS);
    a_tinta(b, L);
  });
  R.copiar(cielo);
  a_nubes(R, t, hor, L);
  a_volcar(R, capa, 50);
  a_agua(R, t, 98, 180, L, { x0: 127, eje: 98, refl: 0.35, ola: 0.7 });
  a_agua(R, t, 98, 146, L, { x0: 0, x1: 127, eje: 98, refl: 0.35, ola: 0.5 });
  for (const xx of [6, 46, 86, 120]) { R.rect(xx, 140, xx + 5, 147, a_P.maderaS); R.rect(xx, 140, xx + 1, 147, a_P.madera); R.rect(xx, 139, xx + 5, 139, a_P.maderaL); R.pset(xx + 2, 141 + Math.round(Math.sin(t * 2 + xx) * 1), C.espuma); }
  // un remolcador lejano y gaviotas
  { const x = Math.round(((t * 4) % 200) - 30); if (x < 120) { R.rect(x, 100, x + 12, 103, a_P.hierro); R.rect(x + 3, 97, x + 8, 100, a_P.rojoS); R.rect(x + 5, 92, x + 6, 97, a_P.negro); a_humo(R, t, x + 5, 91, 30, -3, 2, undefined, 52); } }
  a_gaviotas(R, t, [10, 40, 130, 84], 4, 5);
  // un bote de remos que cruza despacio por detrás del muelle, la farola de gas del muelle y dos barriles junto a las cajas
  { const bx = Math.round(((t * 6) % 190) - 40), by = 124 + Math.round(Math.sin(t * 1.4) * 0.6), r = Math.sin(t * 2.6);
    if (bx < 150) { R.recorte([0, 98, 139, 145]); R.poligono([[bx - 9, by], [bx + 9, by], [bx + 7, by + 3], [bx - 7, by + 3]], a_P.maderaS); R.linea(bx - 9, by, bx + 9, by, a_P.maderaL);
      a_peon(R, bx - 2, by, t, 1, 'quieto', 1); R.linea(bx + 1, by - 4, bx + 6 + Math.round(r * 3), by + 4, a_P.madera); R.pset(bx + 6 + Math.round(r * 3), by + 4, C.espuma);
      a_reflejo(R, t, bx - 8, bx + 8, by + 3, a_P.maderaS, 3); R.recorte(null); } }
  { const fx = 114; R.rect(fx, 108, fx + 1, 146, a_P.hierro); R.rect(fx - 2, 144, fx + 3, 147, a_P.hierro); R.rect(fx - 1, 126, fx + 2, 127, a_P.hierroL); R.pset(fx, 112, a_P.hierroL);
    R.poligono([[fx - 4, 100], [fx + 5, 100], [fx + 3, 107], [fx - 2, 107]], a_P.hierro); R.rect(fx - 2, 101, fx + 3, 106, a_mezcla(a_P.farol, a_P.blanco, 0.4)); R.rect(fx, 101, fx + 1, 106, a_P.hierro);
    R.pset(fx - 1 + (Math.sin(t * 11) > 0 ? 1 : 0), 103, a_P.llama); R.poligono([[fx - 5, 100], [fx + 6, 100], [fx + 1, 96]], a_P.hierro); R.pset(fx + 1, 95, a_P.hierroL); }
  a_barrilPie(R, 34, 150, 'b', 1); a_barrilPie(R, 45, 151, 'b', 1); R.disco(56, 149, 3, a_P.cuerdaS); R.disco(56, 149, 2, a_P.cuerda); R.pset(56, 149, a_P.maderaD);
  // EL ESPEJO DE POPA del bergantín, visto desde atrás (fijo, en su búfer): el coronamiento con su barandilla y el farol,
  // el espejo plano de tablas con las ventanillas y las tallas doradas, la bovedilla que se recoge por debajo y el casco
  // redondeado que se abomba hasta la cinta y se recoge en la flotación, con el timón en su codaste
  const cx = 215, casco = a_buf(R, clave + '|casco', (b) => { a_popaCasco(R, cx); a_tinta(b, L, 0.6); });
  a_volcar(R, casco, 28, 170);
  // los reflejos del agua que bailan en la bovedilla y en la obra viva, el farol que destella, la espuma en la flotación
  for (let x = cx - 74; x <= cx + 74; x++) { const dx = (x - cx) / 76, yt = 102 + Math.round(3 * (1 - dx * dx)), yc = 110 + Math.round(5 * (1 - dx * dx));
    for (let y = yt + 2; y < yc; y++) { const s2 = Math.sin(x * 0.31 + y * 1.7 - t * 3.3) + 0.7 * Math.sin(x * 0.09 + t * 1.9); if (s2 > 1.25) R.pset(x, y, a_mezcla(C.cascoL, L.agua[3], s2 > 1.55 ? 0.45 : 0.22)); }
    if (Math.abs(x - cx) < 64) { const s3 = Math.sin(x * 0.27 - t * 2.9) + 0.6 * Math.sin(x * 0.13 + t * 1.3); if (s3 > 1.1) R.pset(x, 158 + ((x >> 2) & 1), a_mezcla(C.obraViva, L.agua[3], 0.35)); } }
  if (Math.sin(t * 2.1) > 0.7) { R.pset(cx - 1, 37, a_P.blanco); R.pset(cx, 36, a_P.blanco); }
  for (let x = cx - 64; x <= cx + 64; x++) { const s4 = Math.sin(x * 0.4 + t * 3) + Math.sin(x * 0.13 - t * 1.6); if (s4 > 0.9) R.pset(x, 165, C.espuma); else if (s4 > 0.3) R.pset(x, 165, a_mezcla(L.agua[2], C.espuma, 0.4)); }
  // EL NOMBRE: dorado «AMAZON»; el blanco lo tapa (0–0,3) y luego «MARY CELESTE» letra a letra
  const n = a_lim(o.nombre ?? 0), bx0 = 160, bx1 = 270, by0 = 84, by1 = 98;
  if (n < 0.3) a_rotulo(R, 'AMAZON', 197, 88, a_P.oro, a_P.oroS);
  const tapa = a_lim(n / 0.3), xt = Math.round(bx0 + (bx1 - bx0) * tapa);
  if (tapa > 0) for (let y = by0; y <= by1; y++) for (let x = bx0; x <= xt; x++) { const borde = x > xt - 3 && h(x, y, 741) > 0.5; if (borde) continue; R.pset(x, y, y === by0 || y === by1 ? a_P.blancoS : h(x >> 2, y, 742) > 0.82 ? a_P.blancoS : a_P.blanco); }
  if (tapa > 0.3) for (const gx of [bx0 + 12, bx0 + 47, bx0 + 83]) if (gx < xt) { const lg = 2 + (gx % 3); R.linea(gx, by1 + 1, gx, by1 + lg, a_P.blanco); R.pset(gx, by1 + lg + 1, a_P.blancoS); }
  const letras = n <= 0.3 ? 0 : Math.min(12, Math.floor(((n - 0.3) / 0.7) * 12.999));
  if (letras > 0) a_rotulo(R, 'MARY CELESTE', 180, 88, a_P.negro, null, letras);
  const px = 180 + Math.min(11, letras) * 6 + 2;
  // la escala de cuerda que se mece
  const mece = Math.sin(t * 0.9) * 2;
  for (const dx of [0, 7]) R.linea(cx - 66 + dx, 50, cx - 66 + dx + Math.round(mece), 166, a_P.cuerdaS);
  for (let y = 58; y < 166; y += 7) { const m = Math.round(mece * (y - 50) / 116); R.linea(cx - 66 + m, y, cx - 59 + m, y, C.tabla); }
  // la guindola: la plancha colgada de dos cabos, el cubo de pintura
  const py = 124; R.linea(168, 50, 168, py, a_P.cuerda); R.linea(248, 50, 248, py, a_P.cuerda);
  R.rect(164, py, 258, py + 2, C.tabla); R.rect(164, py, 258, py, C.tablaL); R.rect(164, py + 2, 258, py + 2, C.tablaS); R.pset(164, py + 1, a_P.maderaD); R.pset(258, py + 1, a_P.maderaD);
  R.rect(228, py - 6, 234, py - 1, a_P.blancoS); R.rect(228, py - 6, 234, py - 6, a_P.hierro); R.rect(229, py - 5, 233, py - 5, a_P.blanco); R.linea(231, py - 6, 233, py - 10, a_P.madera);
  // la gaviota en la punta de la plancha y la gota que le cae
  const gt = a_lim(o.gota ?? 0), gxx = 252;
  if (gt > 0 && gt < 0.6) { const gyy = Math.round(by1 + 2 + (gt / 0.6) ** 2 * (py - 9 - by1 - 2)); R.pset(gxx + 1, gyy, a_P.blanco); R.pset(gxx + 1, gyy - 1, a_P.blancoS); R.pset(gxx + 1, gyy + 1, a_P.blanco); R.linea(gxx + 1, by1 + 1, gxx + 1, by1 + 2, a_P.blanco); }
  a_gaviotaPosada(R, gxx - 2, py - 1, t, -1, 3, gt >= 0.6 ? 1 : 0, gt >= 0.6 && gt < 0.8 ? 1 : 0);
  a_reflejo(R, t, cx - 62, cx + 62, 166, a_P.negro, 10);
  return { pintor: [Math.max(166, Math.min(222, px - 8)), py - 1], pincel: [px, 91] };
}
// el muelle del East River (1872)
function a_muelle(R, t, o, L, v) {
  const hor = 98, dg = o.barco === 'dg', clave = 'mue|' + v.luz;
  const cielo = a_buf(R, clave + '|cielo', () => a_cieloBase(R, hor + 4, L, [236, 62, 6]));
  const capa = a_buf(R, clave + '|capa', (b) => {
    // la otra orilla (Brooklyn): tejados, campanarios, chimeneas y un bosque de mástiles
    const lej = (c, k = 0.5) => a_mezcla(c, L.cielo[4], k);
    for (let k = 0; k < 30; k++) { const x0 = 100 + k * 8 - 4, w = 7 + Math.round(h(k, 1, 751) * 7), alto = 5 + Math.round(h(k, 2, 751) * 8); R.rect(x0, hor + 2 - alto, x0 + w, hor + 2, lej(k % 3 ? a_P.ladr : a_P.piedraS)); R.rect(x0, hor + 2 - alto, x0 + w, hor + 2 - alto, lej(a_P.tejaS, 0.4));
      for (let i = x0 + 2; i < x0 + w - 1; i += 3) R.pset(i, hor + 5 - alto, lej(a_P.vidrio)); }
    R.rect(180, 72, 184, 96, lej(a_P.piedraS)); R.poligono([[179, 72], [182, 60], [185, 72]], lej(a_P.hierro)); R.rect(150, 80, 152, 92, lej(a_P.ladrS)); R.rect(206, 78, 208, 92, lej(a_P.ladrS));
    for (let k = 0; k < 10; k++) { const x = 126 + k * 15 + Math.round(h(k, 3, 751) * 8), top = 60 + Math.round(h(k, 4, 751) * 18); if (x > 268) continue; R.linea(x, top, x, 96, lej(a_P.maderaD, 0.4)); R.linea(x - 4, top + 6, x + 4, top + 6, lej(a_P.maderaD, 0.4)); R.linea(x - 3, top + 12, x + 3, top + 12, lej(a_P.maderaD, 0.4)); }
    // los almacenes de ladrillo de la izquierda: hastiales, ventanas en arco con postigos, portalones, la pluma
    a_ladrillo(R, 0, 50, 117, 140);
    R.poligono([[-2, 50], [28, 32], [58, 50]], (x, y) => ((x + y) % 5 === 0 ? a_P.ladrS : a_P.ladr)); R.poligono([[56, 52], [86, 36], [118, 52]], (x, y) => ((x + y) % 5 === 0 ? a_P.ladrS : a_P.ladr));
    R.linea(-2, 50, 28, 32, a_P.piedraL); R.linea(28, 32, 58, 50, a_P.piedraS); R.linea(56, 52, 86, 36, a_P.piedraL); R.linea(86, 36, 118, 52, a_P.piedraS); R.rect(56, 52, 57, 140, a_P.ladrD);
    R.rect(0, 50, 116, 51, a_P.piedraL); R.rect(0, 96, 116, 97, a_P.piedra);
    for (const [wx, wy] of [[8, 60], [38, 60], [66, 62], [96, 62], [8, 102], [96, 102]]) { R.rect(wx - 1, wy - 1, wx + 11, wy + 15, a_P.piedraL); R.rect(wx, wy + 2, wx + 10, wy + 14, a_P.vidrio); R.disco(wx + 5, wy + 3, 5, a_P.vidrio); R.rect(wx, wy + 8, wx + 10, wy + 8, a_P.maderaD); R.rect(wx + 5, wy - 1, wx + 5, wy + 14, a_P.maderaD); R.pset(wx + 2, wy + 4, a_P.vidrioL); R.pset(wx + 3, wy + 3, a_P.vidrioL);
      R.rect(wx - 4, wy + 1, wx - 2, wy + 14, a_P.persiana); R.rect(wx + 12, wy + 1, wx + 14, wy + 14, a_P.persiana); R.rect(wx - 4, wy + 1, wx - 4, wy + 14, a_P.persianaL); R.rect(wx - 1, wy + 15, wx + 11, wy + 16, a_P.piedra); }
    // los portalones: uno abierto (oscuro, con sacos), otro cerrado con sus tablas y herrajes
    R.rect(26, 104, 50, 140, a_P.interior); R.rect(25, 102, 51, 103, a_P.piedraL); for (let k = 0; k < 3; k++) { R.rect(29 + k * 6, 132 - k, 33 + k * 6, 140, a_P.cremaS); R.rect(29 + k * 6, 132 - k, 33 + k * 6, 132 - k, a_P.crema); }
    a_tablas(R, 64, 104, 88, 140, 3, [a_P.persiana, a_mezcla(a_P.persiana, a_P.negro, 0.3), a_P.persianaL, a_P.negro], 4); R.rect(63, 102, 89, 103, a_P.piedraL); R.rect(76, 104, 76, 140, a_P.negro); R.rect(66, 112, 72, 113, a_P.hierro); R.rect(80, 126, 86, 127, a_P.hierro);
    // la puerta alta de carga con la pluma (la viga y su polea)
    R.rect(36, 70, 48, 92, a_P.interior); R.rect(35, 68, 49, 69, a_P.piedraL); R.rect(30, 64, 54, 66, a_P.madera); R.rect(30, 64, 54, 64, a_P.maderaL); R.disco(31, 67, 1.5, a_P.hierro);
    // el letrero de barras del almacén: un cartel sin letras (rayas) sobre el portalón
    R.rect(64, 92, 90, 99, a_P.crema); R.rect(64, 92, 90, 92, a_P.cremaS); for (let i = 67; i < 88; i += 4) R.rect(i, 95, i + 2, 96, a_P.maderaD);
    // el muelle: el cantil de piedra, adoquines mojados con charcos, norays y argollas
    a_adoquines(R, 0, 141, 319, 179, L, v.luz === 'gris' ? 0.8 : 0.3);
    a_sillares(R, 118, 138, 319, 142, 5, 16); R.rect(118, 138, 319, 138, a_P.piedraL); R.rect(0, 140, 117, 141, a_P.adoqJ);
    for (const [nx, ny] of [[134, 141], [300, 141]]) { R.rect(nx - 3, ny - 5, nx + 3, ny, a_P.hierro); R.rect(nx - 4, ny - 7, nx + 4, ny - 5, a_P.hierro); R.rect(nx - 3, ny - 7, nx - 2, ny, a_P.hierroL); }
    // las vías del carro, marcadas en los adoquines
    for (let x = 0; x < 320; x++) { if (x > 118 && x < 122) continue; R.pset(x, 147, a_mezcla(a_P.adoqJ, a_P.hierroL, 0.3)); }
    // la carga del muelle junto al cantil: cajas con su cabo de amarre, sacos de lona atados y un rollo de cabo junto al
    // noray de allá; la farola de gas junto al almacén
    for (const [x0, y0, w, hh] of [[184, 134, 14, 12], [199, 138, 11, 8], [187, 126, 10, 8]]) { R.rect(x0, y0, x0 + w, y0 + hh, a_P.maderaD); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, a_P.madera);
      for (let y = y0 + 3; y < y0 + hh; y += 3) R.rect(x0 + 1, y, x0 + w - 1, y, a_P.maderaS); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 1, a_P.maderaL); R.linea(x0 + (w >> 1), y0, x0 + (w >> 1), y0 + hh, a_P.cuerdaS); }
    for (const [sx, sy] of [[214, 146], [222, 146], [218, 140]]) { R.rect(sx - 4, sy - 6, sx + 3, sy, a_P.maderaD); R.rect(sx - 3, sy - 5, sx + 2, sy - 1, a_P.arenaP); R.rect(sx + 1, sy - 5, sx + 2, sy - 1, a_P.arenaPS); R.rect(sx - 2, sy - 7, sx - 1, sy - 6, a_P.cuerdaS); }
    for (let k = 0; k < 4; k++) R.disco(288, 144, 4 - k, k % 2 ? a_P.cuerdaS : a_P.cuerda); R.pset(288, 144, a_P.maderaD);
    { const fx = 110; R.rect(fx, 108, fx + 1, 145, a_P.hierro); R.rect(fx - 2, 143, fx + 3, 146, a_P.hierro); R.rect(fx - 1, 126, fx + 2, 127, a_P.hierroL);
      R.poligono([[fx - 4, 100], [fx + 5, 100], [fx + 3, 107], [fx - 2, 107]], a_P.hierro); R.rect(fx - 2, 101, fx + 3, 106, a_mezcla(a_P.farol, a_P.blanco, 0.3)); R.rect(fx, 101, fx + 1, 106, a_P.hierro);
      R.poligono([[fx - 5, 100], [fx + 6, 100], [fx + 1, 96]], a_P.hierro); R.pset(fx + 1, 95, a_P.hierroL); }
    a_tinta(b, L, 0.8);
  });
  R.copiar(cielo);
  a_nubes(R, t, hor - 4, L, { viento: 1.3 });
  a_volcar(R, capa, 30);
  a_agua(R, t, hor + 2, 138, L, { x0: 118, eje: hor + 2, refl: 0.4, ola: 0.8 });
  // el remolcador que pasa por el río, echando humo, y las gaviotas
  { const x = Math.round(300 - ((t * 5) % 220)); if (x > 120 && x < 300) { R.rect(x - 8, 104, x + 8, 107, a_P.hierro); R.rect(x - 8, 104, x + 8, 104, a_P.hierroL); R.rect(x - 4, 100, x + 3, 103, a_P.crema); R.rect(x - 4, 100, x + 3, 100, a_P.rojo); R.rect(x - 1, 94, x + 1, 99, a_P.negro); R.rect(x - 1, 95, x + 1, 95, a_P.rojo);
    a_humo(R, t, x, 93, 44, 4, 1, [a_P.humoD, a_P.humoS, a_P.humo], 52); a_reflejo(R, t, x - 8, x + 8, 107, a_P.hierro, 4); } }
  a_gaviotas(R, t, [120, 44, 260, 92], 5, 7);
  // un mozo que entra y sale del portalón con un saco al hombro (detrás de los barriles), la llama de la farola y una
  // gaviota posada en el caballete del tejado
  { const u = (t * 0.1) % 2, f = a_suave(u < 1 ? u : 2 - u), x = Math.round(30 + f * 22); a_peon(R, x, 141, t, 4, u < 1 ? 'carga' : 'anda', u < 1 ? 1 : -1); }
  R.pset(110 + (Math.sin(t * 11) > 0 ? 1 : 0), 103, a_P.llama); R.pset(111, 104, a_P.farol);
  a_gaviotaPosada(R, 84, 37, t, 1, 4);
  // el gancho de la pluma del almacén, que se mece
  { const m = Math.sin(t * 1.2) * 2; R.linea(31, 68, 31 + Math.round(m), 88, a_P.cuerdaS); R.rect(30 + Math.round(m), 88, 32 + Math.round(m), 90, a_P.hierro); a_peon(R, 44, 92, t, 2, 'quieto', -1); }
  // EL BARCO amarrado (o.zarpa: se aleja río adentro y se hace pequeño; o.carga: cala más)
  const z = a_suave(o.zarpa ?? 0), carga = a_lim(o.carga ?? 0.3), s = 1 - 0.72 * Math.sqrt(z), Lb = Math.round(200 * s), bx = 212 + Math.pow(z, 1.5) * 118, by = 141 - z * 22;
  const flota = Math.max(1, Math.round((3 - carga * 2) * s));
  const g = a_bergantin(R, bx, by, Lb, t, { dir: 1, casco: dg ? 'dg' : 'mc', flota, velas: a_lim(z * 1.6), blancas: dg, giro: 0, bandera: !dg });
  a_reflejo(R, t, Math.round(bx - Lb * 0.5), Math.round(bx + Lb * 0.5), by + 1, dg ? C.verdeDG : C.casco, Math.max(2, Math.round(6 * s)));
  // las amarras a los norays (se sueltan al zarpar)
  if (z < 0.05) { const pp = g.P(-0.47 * Lb, 20), pr = g.P(0.45 * Lb, 22); R.linea(134, 134, pp[0], pp[1], a_P.cuerdaS); R.linea(300, 134, pr[0], pr[1], a_P.cuerdaS); }
  // un marinero junto al noray de allá: aduja el cabo; cuando el barco zarpa, dice adiós con la mano
  a_peon(R, 280, 147, t, 2, z > 0.05 ? 'saluda' : Math.sin(t * 0.7) > 0 ? 'tira' : 'quieto', 1);
  // el carro que pasa por detrás, despacio (va y vuelve)
  { const span = 520, p = ((t * 9) % span), dirc = p < span / 2 ? 1 : -1, xx = dirc > 0 ? -40 + p : -40 + (span - p); if (xx > -40 && xx < 360) a_carro(R, xx, 146, t, dirc, { petroleo: dg, carga: dirc > 0 ? 'barriles' : 'nada' }); }
  // el marinero que guía el barril en la escotilla, en cubierta (detrás de la borda)
  const esc = g.escotilla;
  // LA CABRIA: dos patas de madera desde el muelle hasta el tope sobre la escotilla, el viento, el motón y el aparejo
  const ap = [214, 58], pies = [[160, 150], [176, 152]];
  const ciclo = (t * 0.22) % 1, quedan = carga < 0.98;
  let bar = null;
  if (z < 0.05 && quedan) { const [ex, ey] = [esc[0], esc[1]], pts = [[170, 148], [170, 72], [ex, 72], [ex, ey + 4]], ph = ciclo * 3.2;
    if (ph < 3) { const i = Math.floor(ph), f = ph - i, a0 = pts[i], a1 = pts[i + 1]; bar = [a0[0] + (a1[0] - a0[0]) * f, a0[1] + (a1[1] - a0[1]) * f]; } }
  for (const [px, py] of pies) { R.linea(px, py, ap[0], ap[1], a_P.maderaS); R.linea(px + 1, py, ap[0] + 1, ap[1], a_P.madera); R.linea(px + 2, py, ap[0] + 2, ap[1] + 1, a_P.maderaD); }
  R.linea(ap[0], ap[1], 92, 150, a_P.cuerdaS); R.rect(ap[0] - 2, ap[1] - 2, ap[0] + 3, ap[1] + 1, a_P.cuerdaS);
  const mot = [ap[0] - 2, ap[1] + 6]; R.rect(mot[0] - 1, mot[1] - 2, mot[0] + 2, mot[1] + 2, a_P.maderaD); R.pset(mot[0], mot[1], a_P.hierroL); R.linea(ap[0], ap[1], mot[0], mot[1] - 2, a_P.cuerda);
  // el torno de manivela al pie de la cabria, con la tira del aparejo
  const tor = [150, 152]; R.rect(tor[0] - 6, tor[1] - 8, tor[0] + 6, tor[1] - 2, a_P.madera); R.rect(tor[0] - 6, tor[1] - 8, tor[0] + 6, tor[1] - 8, a_P.maderaL); R.rect(tor[0] - 6, tor[1] - 2, tor[0] + 6, tor[1], a_P.maderaD);
  R.disco(tor[0], tor[1] - 5, 3, a_P.cuerdaS); R.disco(tor[0], tor[1] - 5, 1.5, a_P.cuerda); { const an = bar ? t * 5 : 0; R.linea(tor[0] + 6, tor[1] - 5, tor[0] + 6 + Math.round(Math.cos(an) * 4), tor[1] - 5 + Math.round(Math.sin(an) * 4), a_P.hierro); }
  R.linea(tor[0], tor[1] - 8, mot[0], mot[1], a_P.cuerdaS);
  if (bar) { const [bx2, by2] = bar; R.linea(mot[0], mot[1] + 2, Math.round(bx2), Math.round(by2) - 7, a_P.cuerda);
    if (by2 > esc[1] - 4 && bx2 > esc[0] - 2) R.recorte([0, 0, 319, esc[1] - 3]);
    R.linea(Math.round(bx2) - 3, Math.round(by2) - 7, Math.round(bx2), Math.round(by2) - 9, a_P.cuerdaS); R.linea(Math.round(bx2) + 3, Math.round(by2) - 7, Math.round(bx2), Math.round(by2) - 9, a_P.cuerdaS);
    a_barrilPie(R, Math.round(bx2), Math.round(by2) + 4, dg ? 'p' : 'b', 1); R.recorte(null); }
  else R.linea(mot[0], mot[1] + 2, mot[0], 96, a_P.cuerda);
  if (z < 0.05) a_peon(R, esc[0] + 8, esc[1] + 1, t, 1, bar && bar[1] > 80 ? 'tira' : 'quieto', -1);
  // los barriles del muelle: dos filas de pie y la pirámide de tumbados (o.carga los va quitando, los de delante primero)
  const tipo = dg ? 'p' : 'b', nq = Math.round((1 - carga) * 26);
  let cuenta = 0;
  const pir = [[0, 4], [1, 3], [2, 2], [3, 1]];
  for (const [fila, nn] of pir) for (let i = 0; i < nn; i++) { cuenta++; if (cuenta > nq) continue; a_barrilCara(R, 14 + fila * 6 + i * 12, 146 - fila * 10, 6, tipo, { t }); }
  for (let fila = 0; fila < 2; fila++) for (let i = 0; i < 8; i++) { cuenta++; if (cuenta > nq) continue; a_barrilPie(R, 66 + i * 10 + fila * 5, 146 + fila * 6, tipo, 1); }
  // el noray de delante (donde rebota el barril del gag) y EL BARRIL QUE SE ESCAPA (o.rueda)
  const nr = [262, 160]; R.rect(nr[0] - 4, nr[1] - 7, nr[0] + 4, nr[1], a_P.hierro); R.rect(nr[0] - 5, nr[1] - 10, nr[0] + 5, nr[1] - 7, a_P.hierro); R.rect(nr[0] - 4, nr[1] - 10, nr[0] - 3, nr[1], a_P.hierroL); R.rect(nr[0] - 5, nr[1] + 1, nr[0] + 5, nr[1] + 1, a_P.adoqJ);
  let rb = null;
  if (o.rueda != null) { const r = a_lim(o.rueda), x0 = 64, x1 = nr[0] - 12; let x, y = 154, gir;
    if (r < 0.8) { const f = (r / 0.8) ** 1.6; x = x0 + (x1 - x0) * f; } else { const f = (r - 0.8) / 0.2; x = x1 - Math.sin(Math.min(1, f) * Math.PI * 0.5) * 16; y = 154 - Math.round(Math.sin(Math.min(1, f * 1.4) * Math.PI) * 5); }
    gir = (x - x0) / 6; a_barrilCara(R, x, y, 6, tipo, { gira: gir, t });
    if (r > 0.78 && r < 0.86) for (let k = 0; k < 5; k++) R.pset(nr[0] - 6 - k, nr[1] - 12 - (k % 2) * 2, a_P.blanco);
    rb = [Math.round(x), y + 6]; }
  return { escotilla: [esc[0], esc[1]], barco: [Math.round(bx), Math.round(by)], ...(rb ? { barril: rb } : {}) };
}
// la pasarela: el costado de cerca, la familia sube a bordo
function a_pasarela(R, t, o, L, v) {
  const hor = 116, clave = 'pas|' + v.luz;
  const cielo = a_buf(R, clave + '|cielo', () => a_cieloBase(R, hor + 4, L, [60, 50, 6]));
  const capa = a_buf(R, clave + '|capa', (b) => {
    // al fondo: los almacenes de la otra orilla y otros barcos con sus mástiles
    const lej = (c, k = 0.45) => a_mezcla(c, L.cielo[4], k);
    for (let k = 0; k < 14; k++) { const x0 = k * 11 - 4, w = 9 + Math.round(h(k, 1, 761) * 6), alto = 10 + Math.round(h(k, 2, 761) * 14); R.rect(x0, hor + 4 - alto, x0 + w, hor + 4, lej(k % 2 ? a_P.ladr : a_P.ladrS)); R.rect(x0, hor + 4 - alto, x0 + w, hor + 4 - alto, lej(a_P.piedraL));
      for (let j = hor + 8 - alto; j < hor; j += 5) for (let i = x0 + 2; i < x0 + w - 1; i += 3) R.pset(i, j, lej(a_P.vidrio)); }
    for (let k = 0; k < 4; k++) { const x = 18 + k * 34, top = 50 + k * 7; R.linea(x, top, x, hor + 4, lej(a_P.maderaD, 0.3)); R.linea(x - 8, top + 10, x + 8, top + 10, lej(a_P.maderaD, 0.3)); R.linea(x - 6, top + 20, x + 6, top + 20, lej(a_P.maderaD, 0.3)); R.linea(x, top, x + 20, hor, lej(a_P.jarcia, 0.4)); }
    // el muelle: adoquines, el cantil
    a_adoquines(R, 0, 152, 319, 179, L, v.luz === 'gris' ? 0.7 : 0.3);
    a_sillares(R, 0, 148, 319, 152, 5, 16); R.rect(0, 148, 319, 148, a_P.piedraL);
    // el costado del barco bajo la borda (la borda va en puertoDelante): tracas con su luz, la franja blanca a la altura
    // de la cubierta, las cintas (tracas gruesas), la aleta de popa que se recoge hacia abajo a la izquierda
    for (let y = 98; y < 148; y++) { const xe = a_aleta(y);
      for (let x = xe; x < 320; x++) { const dd = (y - 98) % 4; let c = dd === 0 ? a_P.negro : a_umbral(x, y) < 0.16 ? C.cascoL : C.casco;
        if (x < xe + 3) c = x === xe ? a_P.negro : C.cascoL; else if (y === 106 || y === 107) c = C.franja; else if (y === 108) c = a_P.blancoS;
        else if (y >= 114 && y <= 117) c = y === 114 ? a_mezcla(C.cascoL, a_P.blanco, 0.15) : y === 117 ? a_P.negro : C.cascoL; else if (y >= 130 && y <= 132) c = y === 130 ? a_mezcla(C.cascoL, a_P.blanco, 0.12) : y === 132 ? a_P.negro : C.cascoL;
        if (y > 140 && a_umbral(x, y) < (y - 140) / 10) c = a_P.negro; b[y * 320 + x] = c; } }
    // los imbornales con su chorreón de óxido y sal, las cadenas de la jarcia que bajan por el costado, una defensa de cabo
    for (const sx of [152, 198, 246, 300]) { R.rect(sx, 110, sx + 2, 111, a_P.negro); for (let y = 112; y < 142; y++) if (a_umbral(sx, y) < 0.7 - (y - 112) / 46) { R.pset(sx + (y % 3 === 0 ? 1 : 0), y, a_mezcla(C.casco, a_P.naranjaS, 0.45)); R.pset(sx + 1, y, a_mezcla(C.casco, a_P.blancoS, 0.25)); } }
    for (const px of [214, 222, 230, 262, 270, 278]) { R.linea(px + 1, 104, px + 1, 121, a_P.hierro); R.pset(px + 1, 121, a_P.hierroL); R.pset(px, 122, a_P.hierroL); R.pset(px + 2, 122, a_P.hierroL); }
    // las juntas de las tablas del forro, dos portillos con su aro de latón y la línea de la flotación verdosa
    for (let y = 109; y < 146; y++) { const fila = Math.floor((y - 98) / 4); if ((y - 98) % 4 === 0) continue; for (let x = 140 + ((fila * 23) % 37); x < 320; x += 37) if (x > a_aleta(y) + 3) b[y * 320 + x] = a_mezcla(C.casco, a_P.negro, 0.5); }
    for (const [ox, oy] of [[176, 123], [286, 123]]) { R.disco(ox, oy, 3, a_P.oroS); R.disco(ox, oy, 2, a_P.vidrio); R.pset(ox - 1, oy - 1, a_P.vidrioL); R.pset(ox + 2, oy - 2, a_P.oro); R.pset(ox + 1, oy + 4, a_mezcla(C.casco, a_P.naranjaS, 0.4)); }
    for (let x = 130; x < 320; x++) for (let y = 143; y < 148; y++) if (x > a_aleta(y) + 1 && a_umbral(x, y) < 0.3 + (y - 143) * 0.1 && h(x >> 1, y, 783) > 0.35) b[y * 320 + x] = a_mezcla(a_P.colinaS, a_P.negro, 0.35 + h(x, y, 784) * 0.3);
    for (let y = 98; y < 106; y++) for (let x = a_aleta(y) - 3; x < 170; x++) b[y * 320 + x] = y === 98 ? C.tablaL : y === 99 ? C.tabla : y === 100 ? C.tablaS : (y - 98) % 4 === 1 ? a_P.negro : a_umbral(x, y) < 0.25 ? C.cascoL : C.casco;
    R.rect(168, 92, 169, 106, a_P.hierro); R.pset(168, 92, a_P.hierroL);
    R.linea(160, 100, 160, 122, a_P.cuerdaS); for (let y = 122; y < 134; y++) R.rect(157, y, 163, y, y % 2 ? a_P.cuerda : a_P.cuerdaS); R.rect(158, 134, 162, 134, a_P.cuerdaS);
    // la carga que espera en el muelle, a la derecha: cajas de tablas con su cabo de amarre, barriles de pie, sacos y
    // un rollo de cabo, con su sombra en los adoquines
    for (let x = 196; x < 292; x++) for (let y = 160; y < 164; y++) if (a_umbral(x, y) < 0.5 - (y - 160) * 0.1) b[y * 320 + x] = a_mezcla(b[y * 320 + x] || a_P.adoq, a_P.negro, 0.35);
    const caja = (x0, y0, w, hh, c, cs, cl) => { R.rect(x0, y0, x0 + w, y0 + hh, a_P.maderaD); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, c);
      for (let y = y0 + 4; y < y0 + hh; y += 4) R.rect(x0 + 1, y, x0 + w - 1, y, cs); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 1, cl); R.rect(x0 + 2, y0 + 1, x0 + 3, y0 + hh - 1, cs); R.rect(x0 + w - 3, y0 + 1, x0 + w - 2, y0 + hh - 1, cs);
      R.linea(x0 + 2, y0 + 2, x0 + w - 3, y0 + hh - 2, cs); R.linea(x0 + (w >> 1), y0, x0 + (w >> 1), y0 + hh, a_P.cuerdaS); R.pset(x0 + (w >> 1), y0 + 2, a_P.cuerda); };
    caja(198, 140, 22, 20, a_P.madera, a_P.maderaS, a_P.maderaL); caja(202, 124, 16, 16, C.tabla, C.tablaS, C.tablaL); caja(222, 146, 16, 14, a_P.maderaL, a_P.madera, C.tablaL);
    for (let k = 0; k < 3; k++) a_barrilPie(R, 246 + k * 11, 161, 'b', 1.2); a_barrilPie(R, 252, 145, 'b', 1.2);
    for (const [sx, sy] of [[276, 161], [287, 161], [281, 152]]) { R.rect(sx - 5, sy - 9, sx + 5, sy, a_P.maderaD); R.rect(sx - 4, sy - 8, sx + 4, sy - 1, a_P.arenaP); R.rect(sx + 2, sy - 8, sx + 4, sy - 1, a_P.arenaPS);
      R.rect(sx - 4, sy - 8, sx + 4, sy - 8, a_P.crema); R.rect(sx - 2, sy - 11, sx, sy - 9, a_P.arenaPS); R.rect(sx - 2, sy - 10, sx, sy - 10, a_P.cuerdaS);
      R.rect(sx - 3, sy - 5, sx + 1, sy - 4, a_P.ropa1); R.pset(sx - 1, sy - 3, a_P.ropa1); }
    for (let k = 0; k < 4; k++) R.disco(232, 166, 5 - k * 1.2, k % 2 ? a_P.cuerdaS : a_P.cuerda); R.pset(232, 166, a_P.maderaD); R.linea(237, 166, 244, 168, a_P.cuerdaS);
    a_tinta(b, L, 0.7);
  });
  R.copiar(cielo);
  a_nubes(R, t, hor - 30, L, { viento: 1.2 });
  a_volcar(R, capa, 40);
  a_agua(R, t, hor + 4, 148, L, { x0: 0, x1: 145, xmax: a_aleta, eje: hor + 4, refl: 0.35, ola: 0.7 });
  a_gaviotas(R, t, [20, 40, 200, 90], 4, 11);
  // el palo mayor que sube fuera del cuadro, sus obenques con flechastes, el bote y la verga del trinquete
  const J = a_P.jarcia; R.rect(238, 30, 241, 92, a_P.madera); R.rect(238, 30, 238, 92, a_P.maderaL); R.rect(241, 30, 241, 92, a_P.maderaS); R.rect(236, 52, 243, 54, a_P.maderaD);
  const pies = [214, 222, 230, 262, 270, 278];
  for (const px of pies) R.linea(240, 30, px + 1, 102, J);
  for (let y = 36; y < 98; y += 4) { const f = (y - 30) / 74; R.linea(240 + Math.round((214 - 240) * f), y, 240 + Math.round((230 - 240) * f), y, a_P.cuerdaS); R.linea(240 + Math.round((262 - 240) * f), y, 240 + Math.round((278 - 240) * f), y, a_P.cuerdaS); }
  R.linea(170, 48, 238, 46, a_P.maderaS); R.linea(170, 49, 238, 47, C.lona); R.linea(172, 50, 236, 48, C.lonaS); R.linea(200, 0, 239, 40, J);
  R.poligono([[150, 87], [206, 87], [202, 98], [154, 98]], (x, y) => (y === 87 ? a_P.blanco : y % 3 === 0 ? a_P.blancoS : a_P.blanco)); R.rect(150, 87, 206, 87, a_P.grisS); R.linea(160, 85, 160, 98, a_P.grisS); R.linea(196, 85, 196, 98, a_P.grisS);
  // LA PASARELA: el tablón ancho con la cara de arriba justo en la recta de los pies (juntas de las tablas y listones
  // atravesados para no resbalar), la zanca de canto con sus pernos, el calzo del pie en los adoquines y los ganchos en el
  // portalón; del lado de allá, sus candeleros y el guardamancebo de cabo (el de este lado va en puertoDelante)
  const [p0x, p0y, p1x, p1y] = [92, 160, 182, 106];
  for (let x = p0x - 1; x <= p1x + 1; x++) { const f = (x - p0x) / (p1x - p0x), yi = Math.round(p0y + (p1y - p0y) * f), k = x - p0x;
    R.pset(x, yi - 1, k % 5 === 0 ? C.tablaS : C.tablaL); R.pset(x, yi, k % 5 === 0 ? a_P.maderaS : C.tabla);
    R.pset(x, yi + 1, a_P.maderaL); for (let j = 2; j <= 4; j++) R.pset(x, yi + j, j === 4 ? a_P.maderaD : a_umbral(x, yi + j) < 0.3 ? a_P.maderaS : a_P.madera); R.pset(x, yi + 5, a_P.maderaD);
    if (k % 6 === 3 && k > 2 && k < 88) { R.pset(x, yi - 2, a_P.maderaD); R.pset(x + 1, yi - 2, a_P.maderaS); }
    if (k % 18 === 9) R.pset(x, yi + 3, a_P.hierroL); }
  R.rect(p0x - 6, p0y + 1, p0x + 3, p0y + 4, a_P.maderaD); R.rect(p0x - 6, p0y + 1, p0x + 3, p0y + 1, a_P.madera); R.disco(p0x - 3, p0y + 4, 1.5, a_P.hierro);
  R.rect(p1x - 1, p1y - 3, p1x + 3, p1y - 2, a_P.hierro); R.pset(p1x + 3, p1y - 1, a_P.hierro); R.pset(p1x - 1, p1y - 3, a_P.hierroL);
  a_pasarelaBaranda(R, 14, a_mezcla(a_P.cuerdaS, a_P.cuerda, 0.4));
  // en el muelle: la farola de gas (con su llama), el banco, el baúl y la bolsa de viaje, el noray con su amarra
  const fx = 16; R.rect(fx, 104, fx + 1, 164, a_P.hierro); R.rect(fx - 2, 162, fx + 3, 165, a_P.hierro); R.rect(fx - 1, 130, fx + 2, 132, a_P.hierroL);
  R.poligono([[fx - 5, 96], [fx + 6, 96], [fx + 4, 104], [fx - 3, 104]], a_P.hierro); R.rect(fx - 3, 97, fx + 4, 103, a_mezcla(a_P.farol, a_P.blanco, 0.3)); R.rect(fx, 97, fx + 1, 103, a_P.hierro);
  { const fl = Math.sin(t * 13) > 0 ? 1 : 0; R.rect(fx - 1, 100 - fl, fx + 2, 102, a_P.llama); R.pset(fx + 1, 99 - fl, a_P.farol); } R.poligono([[fx - 6, 96], [fx + 7, 96], [fx + 1, 91]], a_P.hierro); R.pset(fx + 1, 90, a_P.hierroL);
  const bc = [32, 164]; R.rect(bc[0], bc[1] - 9, bc[0] + 28, bc[1] - 8, a_P.madera); R.rect(bc[0], bc[1] - 9, bc[0] + 28, bc[1] - 9, a_P.maderaL); R.rect(bc[0], bc[1] - 16, bc[0] + 28, bc[1] - 15, a_P.madera); R.rect(bc[0], bc[1] - 13, bc[0] + 28, bc[1] - 12, a_P.maderaS);
  for (const lx of [bc[0] + 1, bc[0] + 26]) { R.rect(lx, bc[1] - 17, lx + 1, bc[1], a_P.hierro); R.pset(lx - 1, bc[1], a_P.hierro); }
  const ba = [68, 163]; R.rect(ba[0], ba[1] - 9, ba[0] + 14, ba[1], C.cuero); R.rect(ba[0], ba[1] - 9, ba[0] + 14, ba[1] - 8, a_mezcla(C.cuero, a_P.blanco, 0.3)); R.rect(ba[0], ba[1] - 4, ba[0] + 14, ba[1] - 4, C.cueroS); R.rect(ba[0] + 3, ba[1] - 9, ba[0] + 3, ba[1], a_P.hierro); R.rect(ba[0] + 11, ba[1] - 9, ba[0] + 11, ba[1], a_P.hierro); R.rect(ba[0] + 6, ba[1] - 6, ba[0] + 8, ba[1] - 5, a_P.oro);
  R.rect(ba[0] + 2, ba[1] - 15, ba[0] + 10, ba[1] - 10, a_P.ropa2); R.rect(ba[0] + 2, ba[1] - 15, ba[0] + 10, ba[1] - 15, a_mezcla(a_P.ropa2, a_P.blanco, 0.3)); R.linea(ba[0] + 4, ba[1] - 16, ba[0] + 8, ba[1] - 16, a_P.maderaD); R.pset(ba[0] + 4, ba[1] - 17, a_P.maderaD); R.pset(ba[0] + 8, ba[1] - 17, a_P.maderaD);
  const nr = [300, 160]; R.rect(nr[0] - 3, nr[1] - 6, nr[0] + 3, nr[1], a_P.hierro); R.rect(nr[0] - 4, nr[1] - 8, nr[0] + 4, nr[1] - 6, a_P.hierro); R.rect(nr[0] - 3, nr[1] - 8, nr[0] - 2, nr[1], a_P.hierroL); R.linea(nr[0], nr[1] - 7, 312, 126, a_P.cuerdaS); R.linea(nr[0] + 1, nr[1] - 7, 313, 126, a_P.cuerda);
  // un estibador pequeño en cubierta, al fondo, que enrolla un cabo, y otro que lleva un barril de proa a popa y vuelve
  a_peon(R, 300, 103, t, 3, 'tira', -1);
  { const u = (t * 0.09) % 2, f = u < 1 ? u : 2 - u, x = Math.round(246 + f * 40); a_peon(R, x, 103, t, 1, u < 1 ? 'carga' : 'anda', u < 1 ? 1 : -1); }
  // un vaporcito de ruedas que cruza el río al fondo, con su humo, recortado a lo que se ve del agua
  { const x = Math.round(((t * 5 + 90) % 220) - 40); R.recorte([0, 60, 125, 124]); R.rect(x - 9, 118, x + 9, 121, a_P.hierro); R.rect(x - 9, 118, x + 9, 118, a_P.hierroL); R.rect(x - 5, 114, x + 5, 117, a_P.crema);
    R.rect(x - 5, 114, x + 5, 114, a_P.rojoS); R.disco(x, 119, 3, a_P.maderaS); R.rect(x - 1, 108, x + 1, 113, a_P.negro); R.pset(x, 108, a_P.rojo); R.recorte(null);
    if (x < 118) a_humo(R, t, x, 107, 30, -4, 3, undefined, 50); }
  // una gaviota que se pasea por los adoquines, se para y picotea
  { const u = (t * 0.07) % 2, f = u < 1 ? u : 2 - u, gx = Math.round(140 + a_suave(f) * 44), pica = Math.sin(t * 5) > 0.85; a_gaviotaPosada(R, gx, pica ? 176 : 175, t, u < 1 ? 1 : -1, 6); }
  return {};
}
// la borda de la pasarela a la derecha del portalón (x ≥ 191), por delante de los que ya han subido (les tapa las
// piernas, nunca la cara); el tramo de la izquierda va en el fondo, para que quien sube por la pasarela pase por delante
function a_pasarelaDelante(R, t) {
  for (let y = 98; y < 106; y++) for (let x = 191; x < 320; x++) {
    R.pset(x, y, y === 98 ? C.tablaL : y === 99 ? C.tabla : y === 100 ? C.tablaS : (y - 98) % 4 === 1 ? a_P.negro : a_umbral(x, y) < 0.25 ? C.cascoL : C.casco); }
  // las vigotas de los obenques con su acolladura y las cadenas, sobre la borda
  for (const px of [214, 222, 230, 262, 270, 278]) { R.disco(px + 1, 102, 2, a_P.maderaD); R.pset(px, 101, a_P.maderaL); R.rect(px, 104, px + 1, 105, a_P.hierro); }
  // los candeleros del portalón con su guardamancebo
  R.rect(191, 92, 192, 106, a_P.hierro); R.pset(191, 92, a_P.hierroL);
  // la barandilla de cabo de este lado de la pasarela, por delante de quien sube (a la altura de la cintura)
  a_pasarelaBaranda(R, 11, a_P.cuerda);
  return {};
}
// el borde de la aleta de popa del costado en la pasarela: la primera columna del casco en la fila y
const a_aleta = (y) => Math.round(128 + Math.max(0, (y - 98) / 50) ** 2 * 14);

// el puerto de Génova (1873)
function a_genova(R, t, o, L, v) {
  const hor = 100, clave = 'gen|' + v.luz;
  const cielo = a_buf(R, clave + '|cielo', () => a_cieloBase(R, hor + 20, L, [240, 70, 7]));
  const ladera = (x) => Math.round(36 + x * 0.12 + Math.sin(x * 0.03) * 6 + (x > 230 ? (x - 230) * 0.32 : 0));
  const capa = a_buf(R, clave + '|capa', (b) => {
    // los montes de detrás (verdes, con olivos y pinos), la ladera, y las casas de colores en hileras con persianas
    for (let x = 0; x < 320; x++) { const y0 = ladera(x) - 6 - Math.round(Math.abs(Math.sin(x * 0.05)) * 6); for (let y = y0; y < 122; y++) R.pset(x, y, h(x >> 1, y >> 1, 771) > 0.6 ? a_mezcla(a_P.colinaS, L.cielo[4], 0.3) : a_mezcla(a_P.colina, L.cielo[4], 0.35)); }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 772) * 320), y = ladera(x) - 4 + Math.round(h(k, 2, 772) * 4); R.disco(x, y, 2, a_mezcla(a_P.abeto, L.cielo[4], 0.3)); R.pset(x - 1, y - 1, a_mezcla(a_P.abetoL, L.cielo[4], 0.3)); }
    const casas = [[a_P.ocre, a_P.ocreS], [a_P.rosa, a_P.rosaS], [a_P.verdeC, a_P.verdeCS], [a_P.crema, a_P.cremaS], [a_P.naranja, a_P.naranjaS]];
    for (let fila = 0; fila < 8; fila++) for (let k = 0; k < 24; k++) { const x0 = Math.round(k * 14 - 6 + (fila % 2) * 7 + h(k, fila, 773) * 4), w = 10 + Math.round(h(k, fila + 9, 773) * 7), base = ladera(x0 + w / 2) + 10 + fila * 9;
      if (base > 124 || x0 > 300) continue; const alto = 10 + Math.round(h(k, fila + 19, 773) * 8), [c, cs] = casas[Math.floor(h(k, fila + 29, 773) * 5)], y0 = base - alto, tono = 0.25 - fila * 0.03;
      const cc = a_mezcla(c, L.cielo[4], Math.max(0, tono)), ccs = a_mezcla(cs, L.cielo[4], Math.max(0, tono));
      R.rect(x0, y0, x0 + w, base, cc); R.rect(x0 + w - 2, y0, x0 + w, base, ccs);
      R.rect(x0 - 1, y0 - 2, x0 + w + 1, y0, a_mezcla(a_P.teja, L.cielo[4], Math.max(0, tono))); R.rect(x0 - 1, y0, x0 + w + 1, y0, a_mezcla(a_P.tejaS, L.cielo[4], Math.max(0, tono)));
      for (let j = y0 + 3; j < base - 2; j += 5) for (let i = x0 + 2; i < x0 + w - 2; i += 4) { R.rect(i, j, i + 1, j + 2, a_mezcla(h(i, j, 774) > 0.5 ? a_P.persiana : a_P.vidrio, L.cielo[4], Math.max(0, tono))); } }
    // la iglesia con cúpula y campanario, entre las casas
    { const ix = 150, iy = ladera(150) + 30; R.rect(ix - 10, iy - 22, ix + 10, iy, a_P.crema); R.rect(ix + 6, iy - 22, ix + 10, iy, a_P.cremaS); R.disco(ix, iy - 23, 7, a_P.tejaS); R.disco(ix - 1, iy - 24, 5, a_P.teja); R.rect(ix - 1, iy - 34, ix + 1, iy - 29, a_P.cremaS); R.pset(ix, iy - 35, a_P.oro);
      R.rect(ix + 14, iy - 38, ix + 20, iy, a_P.ocre); R.rect(ix + 18, iy - 38, ix + 20, iy, a_P.ocreS); R.rect(ix + 15, iy - 34, ix + 18, iy - 30, a_P.interior); R.poligono([[ix + 13, iy - 38], [ix + 17, iy - 46], [ix + 21, iy - 38]], a_P.tejaS); }
    // los soportales del puerto (la Ripa): una fila de arcos de piedra y tres pisos encima, de un ocre tranquilo para que
    // el casco y la jarcia se lean delante
    for (let x = 96; x < 320; x++) for (let y = 92; y < 123; y++) { const piso = y < 104, arco = !piso && ((x - 96) % 14) > 2 && ((x - 96) % 14) < 12 && y > 109 - Math.round(Math.sqrt(Math.max(0, 16 - (((x - 96) % 14) - 7) ** 2))) * 0.8;
      let c = arco ? (y > 118 ? a_P.interiorL : a_P.interior) : piso ? (y === 92 ? a_P.tejaS : (y - 92) % 4 === 0 && (x % 7) > 1 && (x % 7) < 5 ? a_P.persiana : a_P.crema) : ((x - 96) % 14) < 2 ? a_P.cremaS : a_P.crema;
      if (y === 104 || y === 105) c = a_P.cremaS; R.pset(x, y, a_mezcla(c, L.cielo[4], 0.15)); }
    // la Lanterna en su peñón, a la izquierda: dos cuerpos de piedra, la galería y la linterna
    R.poligono([[0, 104], [6, 96], [22, 98], [32, 112], [32, 124], [0, 124]], (x, y) => (h(x >> 1, y >> 1, 775) > 0.6 ? a_P.rocaL : y > 112 ? a_P.rocaS : a_P.roca));
    R.rect(4, 70, 18, 98, a_P.piedraL); R.rect(14, 70, 18, 98, a_P.piedra); for (let y = 72; y < 98; y += 4) R.rect(4, y, 18, y, a_P.piedra); R.rect(3, 68, 19, 70, a_P.piedraS); R.rect(6, 76, 8, 80, a_P.interior); R.rect(10, 88, 12, 92, a_P.interior);
    R.rect(6, 48, 16, 68, a_P.piedraL); R.rect(13, 48, 16, 68, a_P.piedra); for (let y = 50; y < 68; y += 4) R.rect(6, y, 16, y, a_P.piedra); R.rect(5, 46, 17, 48, a_P.piedraS); R.rect(9, 55, 11, 59, a_P.interior);
    R.rect(8, 38, 14, 45, a_P.hierro); R.rect(9, 39, 13, 44, a_P.farol); R.poligono([[7, 38], [11, 32], [15, 38]], a_P.hierro);
    // el muelle de losas, el cantil de sillares, norays
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 140) / (4 + (y - 140) / 10)), xi = x + (fila % 2) * 9, cel = Math.floor(xi / 18), s = h(cel, fila, 776), j = (y - 140) % Math.round(4 + (y - 140) / 10);
      R.pset(x, y, xi % 18 === 0 || j === 0 ? a_P.losaJ : s < 0.3 ? a_P.losaS : s > 0.85 ? a_P.losaL : h(x, y, 777) > 0.93 ? a_P.losaS : a_P.losa); }
    a_sillares(R, 0, 136, 319, 141, 5, 16); R.rect(0, 136, 319, 136, a_P.piedraL);
    a_muelleSucio(R, 0, 143, 319, 179, 1);
    for (const nx of [60, 290]) { R.rect(nx - 3, 136, nx + 3, 142, a_P.hierro); R.rect(nx - 4, 134, nx + 4, 136, a_P.hierro); R.rect(nx - 3, 134, nx - 2, 142, a_P.hierroL); }
    // el tenderete de fruta bajo los soportales (toldo a rayas, cajas de naranjas y limones), sacos de café atados junto
    // a la plancha, cajas con su cabo y los rollos de cabo de los norays
    for (let x = 100; x <= 126; x++) { const c = Math.floor((x - 100) / 3) % 2 ? a_P.blanco : a_P.rojo; R.linea(x, 110, x, 113 + (x % 3 === 0 ? 1 : 0), c); } R.rect(100, 110, 126, 110, a_P.rojoS); R.linea(101, 114, 101, 122, a_P.maderaD); R.linea(125, 114, 125, 122, a_P.maderaD);
    for (const [cx0, c] of [[103, a_P.naranja], [111, a_P.ocre], [118, a_P.verdeC]]) { R.rect(cx0, 117, cx0 + 6, 122, a_P.maderaS); R.rect(cx0 + 1, 118, cx0 + 5, 119, a_P.madera); for (let i = 0; i < 3; i++) R.pset(cx0 + 1 + i * 2, 116, c); R.pset(cx0 + 2, 117, c); R.pset(cx0 + 4, 117, c); }
    for (const [sx, sy] of [[206, 147], [214, 147], [222, 147], [210, 141], [218, 141]]) { R.rect(sx - 4, sy - 6, sx + 3, sy, a_P.maderaD); R.rect(sx - 3, sy - 5, sx + 2, sy - 1, a_P.arenaP); R.rect(sx + 1, sy - 5, sx + 2, sy - 1, a_P.arenaPS); R.rect(sx - 3, sy - 5, sx + 2, sy - 5, a_P.crema); R.rect(sx - 2, sy - 7, sx - 1, sy - 6, a_P.cuerdaS); R.pset(sx - 1, sy - 3, a_P.verdeCS); }
    for (const [x0, y0] of [[228, 135], [228, 128]]) { R.rect(x0, y0, x0 + 9, y0 + 7, a_P.maderaD); R.rect(x0 + 1, y0 + 1, x0 + 8, y0 + 6, a_P.maderaL); R.rect(x0 + 1, y0 + 4, x0 + 8, y0 + 4, a_P.madera); R.linea(x0 + 4, y0, x0 + 4, y0 + 7, a_P.cuerdaS); }
    for (const [rx, ry] of [[72, 141], [304, 141]]) { for (let k = 0; k < 4; k++) R.disco(rx, ry, 4 - k, k % 2 ? a_P.cuerdaS : a_P.cuerda); R.pset(rx, ry, a_P.maderaD); }
    a_tinta(b, L, 0.8);
  });
  R.copiar(cielo);
  a_nubes(R, t, 64, L);
  a_volcar(R, capa, 14);
  // la luz de la Lanterna, que gira (un destello cada pocos segundos)
  { const gi = Math.sin(t * 1.3); if (gi > 0.8) { R.rect(9, 39, 13, 44, a_P.blanco); R.linea(15, 41, 30, 40, a_mezcla(a_P.farol, L.cielo[3], 0.4)); R.linea(15, 42, 26, 42, a_mezcla(a_P.farol, L.cielo[3], 0.6)); } else R.pset(11 + Math.round(gi * 2), 41, a_P.blanco); }
  a_agua(R, t, 122, 136, L, { eje: 122, refl: 0.35, ola: 0.6 });
  // dos falúas de vela latina que cruzan el puerto y un bote de remos
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * (3 + k) + k * 160) % 380) - 30), y = 128 + k * 4; if (x < -20 || x > 330) continue; R.rect(x - 6, y, x + 6, y + 2, k ? a_P.ocreS : a_P.maderaS); R.rect(x - 5, y + 2, x + 5, y + 2, a_P.maderaD); R.linea(x, y, x, y - 12, a_P.maderaD); R.poligono([[x - 7, y - 2], [x + 6, y - 15], [x + 1, y - 1]], k ? C.lona : a_P.blanco); R.linea(x - 7, y - 2, x + 6, y - 15, a_P.maderaS); a_reflejo(R, t, x - 6, x + 6, y + 2, a_P.maderaD, 3); }
  { const x = Math.round(80 + Math.sin(t * 0.3) * 20), y = 131, r = Math.sin(t * 3); R.rect(x - 4, y, x + 4, y + 1, a_P.madera); R.linea(x - 1, y, x - 5 + Math.round(r * 2), y + 3, a_P.maderaL); a_peon(R, x, y, t, 4, 'quieto', 1); }
  a_gaviotas(R, t, [40, 30, 260, 80], 5, 13);
  // la gente bajo los soportales: una vendedora en su tenderete y dos que pasean (a un lado y al otro del barco)
  a_peon(R, 113, 121, t, 1, 'quieto', 1);
  { const u = (t * 0.08) % 2, f = u < 1 ? u : 2 - u; a_peon(R, Math.round(128 + f * 10), 121, t, 3, 'anda', u < 1 ? 1 : -1); }
  { const u = (t * 0.06 + 0.5) % 2, f = u < 1 ? u : 2 - u; a_peon(R, Math.round(294 + f * 22), 121, t, 0, 'anda', u < 1 ? 1 : -1); }
  // EL MARY CELESTE amarrado, proa a la izquierda; la plancha de descarga con un estibador que baja un barril
  const g = a_bergantin(R, 214, 138, 150, t, { dir: -1, casco: 'mc', flota: 3, velas: 0, bote: false });
  a_reflejo(R, t, 140, 290, 139, C.casco, 0);
  R.linea(196, 120, 176, 150, C.tablaS); R.linea(197, 120, 177, 150, C.tabla); a_peon(R, 186 - ((t * 4) % 6 < 3 ? 0 : 1), 136 + Math.round(((t * 0.4) % 1) * 10), t, 1, 'carga', -1);
  R.linea(290, 135, 278, 124, a_P.cuerdaS); R.linea(60, 135, 146, 122, a_P.cuerdaS);
  // los barriles descargados en filas, el carro con la mula, estibadores que ruedan barriles
  for (let k = 0; k < 7; k++) a_barrilPie(R, 30 + k * 10, 148, 'b', 1);
  for (let k = 0; k < 6; k++) a_barrilPie(R, 35 + k * 10, 154, k === 3 ? 'r' : 'b', 1);
  for (let k = 0; k < 4; k++) a_barrilCara(R, 238 + k * 13, 148, 6, k === 1 ? 'r' : 'b', { t }); for (let k = 0; k < 3; k++) a_barrilCara(R, 244 + k * 13, 137, 6, 'b', { t });
  { const x = Math.round(150 + Math.sin(t * 0.25) * 30); a_barrilCara(R, x + 8, 150, 5, 'b', { gira: t * 2 }); a_peon(R, x, 156, t, 2, 'anda', Math.cos(t * 0.25) > 0 ? 1 : -1); }
  a_carro(R, 130, 148, t, 1, { mula: true, anda: false });
  return { barco: [214, 138], plancha: [196, 120, 176, 150] };
}
// los barriles de cerca en el muelle de Génova: los nueve de roble rojo, vacíos
function a_barriles(R, t, o, L, v) {
  const hor = 64, clave = 'bar|' + v.luz;
  const cielo = a_buf(R, clave + '|cielo', () => a_cieloBase(R, hor + 10, L, null));
  const capa = a_buf(R, clave + '|capa', (b) => {
    // la ciudad lejos en la ladera, el agua del puerto, el costado del barco con su palo y el cantil
    for (let x = 0; x < 320; x++) { const y0 = Math.round(46 + Math.sin(x * 0.02) * 6 + x * 0.04); for (let y = y0; y < 84; y++) R.pset(x, y, a_mezcla(h(x >> 1, y >> 1, 781) > 0.6 ? a_P.colinaS : a_P.colina, L.cielo[4], 0.45)); }
    const cs = [a_P.ocre, a_P.rosa, a_P.verdeC, a_P.crema, a_P.naranja];
    for (let fila = 0; fila < 4; fila++) for (let k = 0; k < 30; k++) { const x0 = k * 11 + (fila % 2) * 5 - 4, w = 7 + Math.round(h(k, fila, 782) * 4), base = Math.round(60 + Math.sin(x0 * 0.02) * 6 + x0 * 0.04) + fila * 6, alto = 6 + Math.round(h(k, fila + 7, 782) * 5);
      if (x0 > 176 && x0 < 320 && base - alto < 52) continue; const c = a_mezcla(cs[Math.floor(h(k, fila + 3, 782) * 5)], L.cielo[4], 0.4); R.rect(x0, base - alto, x0 + w, base, c); R.rect(x0, base - alto - 1, x0 + w, base - alto, a_mezcla(a_P.teja, L.cielo[4], 0.4)); if (alto > 7) R.rect(x0 + 2, base - alto + 3, x0 + 3, base - alto + 4, a_mezcla(a_P.persiana, L.cielo[4], 0.4)); }
    // el costado del barco (proa fuera del cuadro), con la franja
    for (let y = 76; y < 98; y++) for (let x = 196; x < 320; x++) { const dd = (y - 76) % 4; let c = dd === 0 ? a_P.negro : a_umbral(x, y) < 0.2 ? C.cascoL : C.casco; if (y === 80 || y === 81) c = C.franja; if (y === 76) c = C.tabla; b[y * 320 + x] = c; }
    // en el costado: las juntas del forro, dos portillos de latón, los imbornales con su chorreón de óxido, una defensa
    // de cabo colgada y la flotación verdosa
    for (let y = 82; y < 98; y++) { if ((y - 76) % 4 === 0) continue; const fila = Math.floor((y - 76) / 4); for (let x = 200 + ((fila * 17) % 29); x < 320; x += 29) b[y * 320 + x] = a_mezcla(C.casco, a_P.negro, 0.5); }
    for (const ox of [232, 290]) { R.disco(ox, 87, 2, a_P.oroS); R.pset(ox, 87, a_P.vidrio); R.pset(ox - 1, 86, a_P.oro); }
    for (const sx of [214, 262, 306]) { R.rect(sx, 83, sx + 1, 83, a_P.negro); for (let y = 84; y < 96; y++) if (a_umbral(sx, y) < 0.7 - (y - 84) / 16) R.pset(sx + (y % 3 === 0 ? 1 : 0), y, a_mezcla(C.casco, a_P.naranjaS, 0.45)); }
    R.linea(250, 77, 250, 86, a_P.cuerdaS); for (let y = 86; y < 93; y++) R.rect(248, y, 252, y, y % 2 ? a_P.cuerda : a_P.cuerdaS);
    for (let x = 196; x < 320; x++) for (let y = 95; y < 98; y++) if (a_umbral(x, y) < 0.35 + (y - 95) * 0.15) b[y * 320 + x] = a_mezcla(a_P.colinaS, a_P.negro, 0.45);
    R.poligono([[190, 76], [198, 76], [198, 98], [194, 98]], C.casco); R.rect(240, 22, 242, 76, a_P.madera); R.rect(240, 22, 240, 76, a_P.maderaL); R.rect(237, 40, 245, 41, a_P.maderaD);
    for (const px of [222, 230, 254, 262]) R.linea(241, 24, px, 76, a_P.jarcia); for (let y = 30; y < 74; y += 4) { const f = (y - 24) / 52; R.linea(241 + Math.round((222 - 241) * f), y, 241 + Math.round((230 - 241) * f), y, a_P.cuerdaS); }
    // el cantil y las losas del muelle (más grandes hacia delante), con juntas
    a_sillares(R, 0, 98, 319, 104, 6, 18); R.rect(0, 98, 319, 98, a_P.piedraL);
    for (let y = 105; y < 180; y++) for (let x = 0; x < 320; x++) { const alt = 5 + Math.floor((y - 105) / 12), fila = Math.floor((y - 105) / alt), j = (y - 105) % alt, xi = x + (fila % 2) * 11, cel = Math.floor(xi / 22), s = h(cel, fila, 783);
      const i = xi % 22, base = s < 0.3 ? a_P.losaS : s > 0.8 ? a_mezcla(a_P.losa, a_P.losaL, 0.4) : a_P.losa, d = h(x, y, 784);
      R.pset(x, y, i === 0 || j === 0 ? a_P.losaJ : j === 1 || i === 1 ? a_P.losaL : i === 21 || j === alt - 1 ? a_mezcla(base, a_P.losaJ, 0.35) : d > 0.93 ? a_P.losaS : d < 0.04 ? a_P.losaL : a_umbral(x, y) < (j / alt) * 0.35 ? a_mezcla(base, a_P.losaS, 0.5) : base); }
    a_muelleSucio(R, 0, 150, 319, 179, 2);
    // un aro suelto y una duela rota en el suelo
    R.disco(250, 166, 6, a_P.hierro); R.disco(250, 166, 5, a_P.losa); R.linea(244, 166, 256, 166, a_P.losaS); R.linea(70, 170, 84, 168, C.robleBS); R.linea(70, 169, 84, 167, C.robleB);
    // una carretilla de mano apoyada, un rollo de cabo, cajas
    R.linea(8, 160, 22, 112, a_P.maderaS); R.linea(14, 162, 28, 114, a_P.madera); R.disco(10, 162, 4, a_P.hierro); R.disco(10, 162, 2, a_P.hierroL); R.linea(4, 150, 18, 152, a_P.hierro);
    for (let k = 0; k < 4; k++) R.disco(298, 170, 8 - k * 1.8, k % 2 ? a_P.cuerdaS : a_P.cuerda); R.disco(298, 170, 1, a_P.maderaD);
    a_tinta(b, L, 0.8);
  });
  R.copiar(cielo);
  a_nubes(R, t, hor - 10, L, { y0: 26 });
  a_volcar(R, capa, 20);
  a_agua(R, t, 84, 98, L, { x1: 196, eje: 84, refl: 0.3, ola: 0.5 });
  a_gaviotas(R, t, [20, 30, 180, 60], 3, 17);
  a_peon(R, 214, 76, t, 2, 'anda', 1);
  // los barriles en dos alturas: los de roble blanco, y en medio los NUEVE de roble rojo (5 abajo y 4 arriba)
  const vac = a_lim(o.vacios ?? 0), r = 11;
  // el charco bajo los rojos, que brilla
  for (let j = -2; j <= 2; j++) for (let i = -44; i <= 44; i++) { const d = (i / 44) ** 2 + (j / 2.5) ** 2; if (d > 1) continue; const x = 172 + i, y = 157 + j; R.pset(x, y, d > 0.75 ? a_P.losaJ : (x + Math.floor(t * 6)) % 23 === 0 ? a_P.blanco : a_mezcla(L.cielo[3], C.robleR, 0.25)); }
  let n = 0;
  for (let i = 0; i < 11; i++) { const x = 34.5 + i * 25, roja = i >= 4 && i <= 7; let hk = 0; if (roja) { n++; hk = a_lim((vac - (n - 1) * 0.1) / 0.18); }
    a_barrilCara(R, x, 108, r, roja ? 'r' : 'b', { t, gotas: roja, hueco: hk > 0.5 ? 1 : 0 }); }
  n = 4;
  for (let i = 0; i < 12; i++) { const x = 22 + i * 25, roja = i >= 4 && i <= 8; let hk = 0; if (roja) { n++; hk = a_lim((vac - (n - 1) * 0.1) / 0.18); }
    const sacude = hk > 0.4 && hk < 0.7 ? Math.round(Math.sin(t * 40)) : 0;
    a_barrilCara(R, x + sacude, 131, r + 1, roja ? 'r' : 'b', { t, gotas: roja, hueco: hk > 0.5 ? 1 : 0, tiza: false }); }
  // una gaviota posada encima de un barril blanco
  a_gaviotaPosada(R, 59, 97, t, 1, 2);
  return {};
}
// delante de los personajes: piezas bajas en las esquinas que solo tapan pies
function a_esquinaTablas(R) { for (let j = 0; j < 4; j++) { const y = 179 - j * 3; R.rect(-2 + j * 2, y - 2, 26 - j * 3, y, j % 2 ? a_P.maderaL : C.tabla); R.rect(-2 + j * 2, y, 26 - j * 3, y, a_P.maderaS); R.pset(26 - j * 3, y - 1, a_P.maderaD); } }

function a_esquinaCabo(R, x, y) { for (let k = 0; k < 4; k++) R.disco(x, y, 7 - k * 1.6, k % 2 ? a_P.cuerdaS : a_P.cuerda); R.disco(x, y, 1, a_P.maderaD); }

const a_PINTA = { 'astillero.general': a_astillero, 'astillero.popa': a_popa, 'muelle.general': a_muelle, 'muelle.pasarela': a_pasarela, 'genova.general': a_genova, 'genova.barriles': a_barriles };

const a_DELANTE = {
  'astillero.general': (R, t, o, L, v) => { if (v.epoca === 1867) { for (let k = 0; k < 8; k++) { const x = 300 + k * 3, y = 179; R.linea(x, y, x - 2, y - 6 - (k % 3), a_P.hierbaS); } } else { a_esquinaTablas(R); for (let k = 0; k < 10; k++) { const x = 292 + k * 3, y = 179; R.linea(x, y, x - 1 + Math.round(Math.sin(t * 2 + k) * 1), y - 5 - (k % 3), k % 2 ? a_P.hierbaS : a_P.hierba); } } },
  'astillero.popa': (R) => { a_esquinaCabo(R, 8, 176); },
  'muelle.general': (R, t, o) => { const dg = o.barco === 'dg'; a_barrilPie(R, 6, 180, dg ? 'p' : 'b', 1.3); a_barrilPie(R, 18, 183, dg ? 'p' : 'b', 1.3); },
  'muelle.pasarela': (R, t) => a_pasarelaDelante(R, t),
  'genova.general': (R) => { R.rect(298, 168, 320, 180, a_P.madera); R.rect(298, 168, 320, 169, a_P.maderaL); R.rect(300, 172, 318, 172, a_P.maderaS); R.rect(298, 168, 299, 180, a_P.maderaS); },
  'genova.barriles': (R) => { a_esquinaCabo(R, 312, 178); },
};

// las opciones resueltas de mar() y marDelante(): el encuadre (uno que no existe cae en 'alta'), la cámara (una que no
// es la suya cae en 'general') y la luz ('niebla' por omisión en el bote, 'gris' en lo demás)
function b_resuelve(o) {
  const enc = V_MAR[o.encuadre] ? o.encuadre : 'alta', cam = o.camara === V_MAR[enc].cam ? o.camara : 'general';
  return { enc, cam, luz: B_LUZ[o.luz] ? o.luz : enc === 'bote' ? 'niebla' : 'gris' };
}

// umbral del tramado ordenado 4 × 4
const B_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_umbral = (x, y) => B_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla de dos colores (a = 0 el primero, 1 el segundo)
function b_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// las zonas tranquilas: la de Atom y la barra del año (con sus cifras)
const b_quieta = (x, y) => (x > 270 && y < 48) || (x > 16 && x < 176 && y < 22);

// cuánto se está dentro de una zona tranquila (0 fuera, 1 a 12 px del borde): para fundir poco a poco
const b_quietud = (x, y) => Math.max(x > 270 && y < 48 ? Math.min(1, Math.min(x - 270, 48 - y) / 12) : 0, x > 16 && x < 176 && y < 22 ? Math.min(1, Math.min(x - 16, 176 - x, 22 - y) / 10) : 0);

// cada luz: el cielo de arriba al horizonte, las nubes (sombra, cuerpo, luz), las vetas del cielo (luz, sombra), las
// cortinas de chubasco, el sol, el mar (lejos → cerca en 0–3, cresta 4, seno 5, espuma 6, brillo 7) y el tinte que se
// le da a los objetos (color y cuánto)
const B_LUZ = {
  gris: { cielo: [[0, '#465260'], [0.2, '#525e6c'], [0.42, '#626e7a'], [0.64, '#78848e'], [0.84, '#949ea6'], [1, '#aab2b8']],
    nubes: ['#46505c', '#626c78', '#8a949e'], veta: ['#8c96a0', '#56606c'], lluvia: '#56606c',
    mar: ['#8a969e', '#68767f', '#4e5e6b', '#3a4c5b', '#9eaab2', '#283846', '#d8e0e2', '#f4f8f8'], tinte: ['#6a7480', 0.14] },
  dia: { cielo: [[0, '#3a74b8'], [0.25, '#4a86c6'], [0.5, '#66a0d6'], [0.72, '#8cbae2'], [0.88, '#b0d0ea'], [1, '#d0e2ee']],
    nubes: ['#98aec6', '#d6e2ee', '#ffffff'], veta: ['#c4dcee', '#78a4ce'], lluvia: '#8aa0b8', sol: [228, 36],
    mar: ['#80aac6', '#568eb4', '#38729e', '#265a88', '#a8cee6', '#1a4068', '#eef6f8', '#ffffff'], tinte: null },
  tarde: { cielo: [[0, '#38386c'], [0.24, '#58447e'], [0.48, '#925678'], [0.7, '#ca7864'], [0.88, '#eaa266'], [1, '#f6c886']],
    nubes: ['#684670', '#c2766a', '#f6be88'], veta: ['#f0b47a', '#84506e'], lluvia: '#84506e', sol: [72, -14],
    mar: ['#c68c7a', '#8c6480', '#5e4e78', '#3e3c66', '#f2b282', '#2a2a50', '#f6d8b0', '#fff2c8'], tinte: ['#e0905c', 0.2] },
  niebla: { cielo: [[0, '#949ea6'], [0.4, '#a6aeb4'], [0.8, '#b8bec2'], [1, '#c4c8ca']],
    nubes: ['#9ca4aa', '#b0b6bb', '#c4c9cc'], veta: ['#c2c8ca', '#9ca4aa'], lluvia: '#9ca4aa',
    mar: ['#a2aaae', '#8c969c', '#78848c', '#66747c', '#b2babe', '#56646c', '#d4d8da', '#e6eaea'], tinte: ['#a6aeb2', 0.28], niebla: '#bfc5c7' },
};

const b_pals = new Map();

// la paleta de una luz, ya en colores del lienzo
function b_pal(luz) {
  let p = b_pals.get(luz);
  if (!p) { const L = B_LUZ[luz]; p = { ...L, nubes: L.nubes.map(hex), veta: L.veta.map(hex), lluvia: hex(L.lluvia), mar: L.mar.map(hex), niebla: L.niebla ? hex(L.niebla) : 0 }; b_pals.set(luz, p); }
  return p;
}

const b_tns = new Map();

// tn(c): el color de un objeto con la luz (con caché)
function b_tinte(luz) {
  let f = b_tns.get(luz);
  if (!f) { const L = B_LUZ[luz], m = new Map(), tc = L.tinte ? hex(L.tinte[0]) : 0, a = L.tinte ? L.tinte[1] : 0;
    f = (c) => { if (!a) return c; let v = m.get(c); if (v === undefined) { v = b_mezcla(c, tc, a); m.set(c, v); } return v; }; b_tns.set(luz, f); }
  return f;
}

// las capas fijas: dibuja() pinta una vez en un búfer de R.nuevo() y se guarda; devuelve { b, …lo que devuelva dibuja }
const b_capas = new Map();

function b_capa(R, clave, dibuja) {
  let c = b_capas.get(clave);
  if (!c) { const b = R.nuevo(), prev = R.usar(b), info = dibuja(b) || {}; R.usar(prev); c = { b, ...info }; b_capas.set(clave, c); }
  return c;
}

// degradado tramado de arriba abajo entre y0 e y1: P = [[fracción, '#color'], …]
function b_degradado(R, y0, y1, P) {
  const B = R.buf, alto = y1 - y0, tr = 3, Pc = P.map(([f, c]) => [f, hex(c)]), lim = Pc.map(([f]) => y0 + Math.round(f * alto));
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    let i = 0; while (i + 1 < Pc.length && y >= lim[i + 1]) i++;
    let a = Pc[i][1], b = -1, p = 0;
    if (i + 1 < Pc.length && y >= lim[i + 1] - tr) { b = Pc[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = Pc[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = b_umbral(x, y) < p ? b : a;
  }
}

// el cielo fijo de una luz hasta el horizonte hor (en un búfer): el degradado tramado, las vetas de estratos en capas
// (más juntas hacia el horizonte), el sol con su halo y la bruma clara del horizonte; las zonas tranquilas, lisas
function b_cieloFijo(R, luz, hor) {
  return b_capa(R, 'cielo:' + luz + ':' + hor, () => {
    const L = b_pal(luz), B = R.buf;
    b_degradado(R, 0, hor + 3, B_LUZ[luz].cielo);
    for (let y = 8; y < hor; y++) { const f = y * 320, cerca = y / hor;
      for (let x = 0; x < 320; x++) { if (b_quieta(x, y)) continue;
        const n = Math.sin(x * 0.011 + y * 0.29 + h(y >> 2, 0, 811) * 6) * 0.55 + h(x >> 4, y >> 1, 812) * 0.35 + Math.sin(x * 0.037 - y * 0.18) * 0.22;
        if (n > 0.84 - cerca * 0.12 && b_umbral(x, y) < 0.55) B[f + x] = L.veta[0];
        else if (n < -0.52 && cerca > 0.35 && b_umbral(x, y) < 0.45) B[f + x] = L.veta[1]; } }
    if (L.sol) { const sx = L.sol[0], sy = L.sol[1] < 0 ? hor + L.sol[1] : L.sol[1], gl = hex(luz === 'tarde' ? '#ffd890' : '#fff4d0');
      for (let y = Math.max(0, sy - 40); y < Math.min(hor, sy + 40); y++) for (let x = Math.max(0, sx - 40); x < Math.min(320, sx + 40); x++) {
        const d = Math.hypot(x - sx, y - sy); if (d > 40 || b_quieta(x, y)) continue; const a = (1 - d / 40) ** 2 * 0.75;
        if (b_umbral(x, y) < a) B[y * 320 + x] = b_mezcla(B[y * 320 + x], gl, 0.55); }
      R.disco(sx, sy, 7, hex(luz === 'tarde' ? '#ffcc70' : '#ffe8a8')); R.disco(sx, sy, 5.5, hex('#fff6d8')); R.disco(sx - 1, sy - 1, 3, hex('#ffffff')); }
    for (let y = hor - 4; y <= hor + 2; y++) for (let x = 0; x < 320; x++) if (b_umbral(x, y) < 0.55 - Math.abs(y - hor + 1) * 0.12) B[y * 320 + x] = b_mezcla(B[y * 320 + x], hex('#ffffff'), 0.18);
  });
}

// un óvalo relleno (respeta R.recorte); c puede ser función (x, y)
function b_ovalo(R, cx, cy, rx, ry, c) {
  if (rx < 0.5 || ry < 0.5) return;
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) { const v = (y + 0.5 - cy) / ry; if (v * v > 1) continue; const w = rx * Math.sqrt(1 - v * v);
    for (let x = Math.round(cx - w); x < Math.round(cx + w); x++) R.pset(x, y, typeof c === 'function' ? c(x, y) : c); }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba a la izquierda) con la base plana; ap la aplasta; F: el
// cielo de detrás (en las zonas tranquilas la nube se funde con él)
function b_nube(R, cx, cy, w, ap, sem, c, F) {
  const tono = (col) => (x, y) => { const q = b_quietud(x, y); return q > 0 ? b_mezcla(col, F[y * 320 + x], 0.82 * q) : col; };
  const L = [[0, 0, 0.3], [-0.3, 0.06, 0.22], [0.3, 0.05, 0.24], [-0.12, -0.16, 0.24], [0.16, -0.12, 0.2], [0.46, 0.12, 0.14], [-0.46, 0.13, 0.13], [0.05, 0.14, 0.26]]
    .map(([dx, dy, f], i) => [dx + (h(i, sem, 821) - 0.5) * 0.12, dy, f * (0.85 + h(i, sem, 822) * 0.3)]);
  const t0 = tono(c[0]), t1 = tono(c[1]), t2 = tono(c[2]);
  for (const [dx, dy, f] of L) b_ovalo(R, cx + dx * w, cy + dy * w * ap + 2, f * w, f * w * ap, t0);
  for (const [dx, dy, f] of L) b_ovalo(R, cx + dx * w, cy + dy * w * ap, f * w * 0.92, f * w * 0.92 * ap, t1);
  for (const [dx, dy, f] of L) if (dy < 0.08) b_ovalo(R, cx + dx * w - f * w * 0.28, cy + dy * w * ap - f * w * 0.4 * ap, f * w * 0.5, f * w * 0.5 * ap, t2);
  for (const [dx, dy, f] of L) if (dy >= 0.1) b_ovalo(R, cx + dx * w + 1, cy + dy * w * ap + f * w * 0.45 * ap, f * w * 0.55, f * w * 0.4 * ap, t0);
}

// las nubes en tres capas a tres velocidades (junto al horizonte, pequeñas, lentas y veladas; en medio; arriba,
// grandes y deprisa), que corren con el viento hacia la derecha; con luz gris, cortinas de chubasco lejanas. off baja
// todo (el balanceo); F: el cielo fijo
function b_nubes(R, t, hor, luz, F, o = {}) {
  const L = b_pal(luz), off = o.off ?? 0, v = o.viento ?? 1, hz = F[Math.max(0, hor - 2) * 320 + 8];
  const lejos = L.nubes.map((c) => b_mezcla(c, hz, 0.45)), medio = L.nubes.map((c) => b_mezcla(c, hz, 0.18));
  R.recorte([0, 0, 319, hor - 1 + off]);
  if (luz === 'gris') for (let k = 0; k < 4; k++) { const W = 420, cx = ((h(k, 1, 830) * W + t * 1.2 * v) % W) - 50, w = 12 + h(k, 2, 830) * 16, y0 = hor - 26 + Math.round(h(k, 3, 830) * 6) + off;
    for (let x = Math.round(cx - w); x <= cx + w; x++) for (let y = y0; y < hor + off; y++) { if (b_quieta(x, y)) continue; const a = (1 - Math.abs(x - cx) / w) * 0.6 * (1 - (y - y0) / (hor + off - y0) * 0.5); if (((x + y + Math.floor(t * 4)) % 3 === 0) && b_umbral(x, y) < a) R.pset(x - Math.round((y - y0) * 0.3), y, L.lluvia); } }
  for (let k = 0; k < 8; k++) { const w = 18 + h(k, 4, 831) * 18, x = ((h(k, 5, 831) * 460 + t * 0.9 * v) % 480) - 60, y = hor - 6 - h(k, 6, 831) * 9 + off; b_nube(R, x, y, w, 0.42, k + 21, lejos, F); }
  for (let k = 0; k < 5; k++) { const w = 34 + h(k, 7, 832) * 20, x = ((h(k, 8, 832) * 500 + t * 2.4 * v) % 540) - 100, y = hor * 0.5 + h(k, 9, 832) * hor * 0.2 + off; b_nube(R, x, y, w, 0.55, k + 31, medio, F); }
  for (let k = 0; k < 4; k++) { const w = 56 + h(k, 10, 833) * 30, x = ((h(k, 11, 833) * 560 + t * 4.6 * v) % 640) - 140, y = 26 + h(k, 12, 833) * hor * 0.14 + off; b_nube(R, x, y, w, 0.62, k + 41, L.nubes, F); }
  R.recorte(null);
}

// el mar que vive, como función de cada píxel: px(x, y) da el color del agua en (x, y) con el horizonte en hor (y
// relativa al mar sin balanceo). Es un mar en perspectiva: cada fila es una distancia, y la superficie, la suma de
// cuatro trenes de olas (dos de mar de fondo y dos de marejadilla, que se apagan a lo lejos); la cara de cada ola
// que mira al cielo se aclara y la que mira a la cámara se oscurece. Encima, borreguitos que nacen en las crestas, se
// abren y se deshacen (o.fuerza 0–1), vetas de espuma que arrastra el viento y, con sol, su reguero de brillos
function b_marPrep(t, hor, luz, o = {}) {
  const P = b_pal(luz).mar, fuerza = o.fuerza ?? 0.5, viento = o.viento ?? 1, sol = o.sol ?? null, vel = o.velocidad ?? 1, N = 180 - hor + 60, F = [];
  for (let dd = 0; dd < N; dd++) {
    const d = dd + 0.7, u = Math.min(1, dd / (180 - hor)), ci = Math.min(2.999, u * 3.4), i0 = Math.floor(ci), Z = 420 / d;
    F.push({ u, Z, sx: 2.1 / d, i0, i1: Math.min(3, i0 + 1), p: ci - i0, a3: Math.max(0, Math.min(1, 1.6 - Z / 70)), a4: Math.max(0, Math.min(1, 1.5 - Z / 30)), k: Math.max(0, Math.min(1, (dd - 1.5) / 14)), ancho: 3 + u * 36 });
  }
  const T1 = t * vel, wx = t * viento;
  return (x, y) => {
    const dd = y - hor; if (dd < 0) return P[0];
    const r = F[Math.min(N - 1, dd)], X = (x - 160) * r.sx, Z = r.Z;
    let c = b_umbral(x, y) < r.p ? P[r.i1] : P[r.i0];
    const p1 = 0.42 * X + 0.21 * Z - 1.0 * T1, p2 = -0.27 * X + 0.45 * Z - 1.25 * T1 + 1.3, p3 = 0.9 * X + 0.75 * Z - 1.9 * T1 + 2.1, p4 = 1.9 * X - 1.4 * Z - 2.6 * T1;
    const s1 = Math.sin(p1), s2 = Math.sin(p2), f = s1 + 0.7 * s2 + r.a3 * 0.45 * Math.sin(p3) + r.a4 * 0.25 * Math.sin(p4);
    const c1 = Math.cos(p1), c2 = Math.cos(p2), c3 = Math.cos(p3), c4 = Math.cos(p4);
    const gz = 0.21 * c1 + 0.315 * c2 + r.a3 * 0.34 * c3 - r.a4 * 0.35 * c4, gx = 0.42 * c1 - 0.19 * c2 + r.a3 * 0.4 * c3 + r.a4 * 0.47 * c4;
    const sh = (gz * 1.5 + gx * 0.5) * r.k;
    if (sh > 0.5) c = P[4]; else if (sh > 0.3 && b_umbral(x, y) < (sh - 0.3) * 4) c = P[4];
    else if (sh < -0.52) c = P[5]; else if (sh < -0.34 && b_umbral(x, y) < (-0.34 - sh) * 4) c = P[5];
    if (r.k < 1 && h(x >> 1, dd, Math.floor(t * 2 + x * 0.003)) > 0.93) c = P[4];
    // la piel del agua de cerca: rizos cortos de luz y de sombra que corren con el viento
    if (r.u > 0.2) { const cw = 4 + r.u * 9, xx = x + wx * (4 + r.u * 10) + (y * 13 % 7) * 2, cell = Math.floor(xx / cw), n = h(cell, y, 806 + Math.floor(t * 1.3 + h(cell, y, 807) * 5));
      if (n > 0.88 - r.u * 0.06) c = sh > -0.25 ? P[4] : P[r.i0]; else if (n < 0.06 + r.u * 0.04) c = P[5]; }
    // la cresta: espuma donde la ola está alta
    const alto = f - (1.85 - fuerza * 0.3);
    if (alto > 0 && r.k > 0.3) { const q = Math.min(1, 6 * r.sx), n = h(Math.floor((X + wx * 0.7) * 3 / q), Math.floor(Z * 4 / Math.max(1, q * 2)), 805); if (n < alto * 1.6) c = alto > 0.25 && n < alto * 0.6 ? P[7] : P[6]; else if (n < alto * 2.6) c = P[4]; }
    // los borreguitos: celdas de agua (en el mundo) con su vida: nacen blancos, se abren y se deshacen
    const XX = X + wx * 0.8, cx = Math.floor(XX / 3.2), cz = Math.floor(Z / 2.4), fase = t * 0.45 + h(cx, cz, 801) * 9, ci2 = Math.floor(fase), fr = fase - ci2;
    if (fr < 0.75 && h(cx, cz * 7 + ci2, 802) < fuerza * 0.32) { const rx = Math.min(1.5, 9 * r.sx), rz = Math.min(0.5, rx / 3 * (r.sx > 0.06 ? 1 : 1)), ex = (XX - (cx + 0.5) * 3.2) / rx, ez = (Z - (cz + 0.5) * 2.4) / rz, e = ex * ex + ez * ez, rad = 1 - fr / 0.75;
      if (e < rad * rad) c = e < rad * rad * 0.3 && fr < 0.3 ? P[7] : P[6]; else if (e < rad * 1.4 && r.k > 0.5) c = P[4]; }
    // las vetas de espuma que deja el viento (largas, a lo largo del viento)
    if (r.u > 0.1 && h(Math.floor((X - wx * 0.9) / 2.5), Math.floor(Z * 3), 803) > 0.985 - fuerza * 0.012 && (y & 1) === 0) c = b_umbral(x, y) < 0.55 ? P[6] : P[4];
    if (sol != null && Math.abs(x - sol) < r.ancho && (sh > 0.1 || f > 0.8) && h(x >> 1, y, Math.floor(t * 5 + x * 0.01)) > 0.78 - (1 - Math.abs(x - sol) / r.ancho) * 0.2) c = h(x, y, 804) > 0.5 ? P[7] : P[4];
    return c;
  };
}

// pinta el mar de px entre las filas y0 e y1 (off(x): cuánto baja el mar en esa columna, el balanceo)
function b_marPinta(R, px, y0, y1, off = null) {
  const B = R.buf;
  if (!off) { for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) { const f = y * 320; for (let x = 0; x < 320; x++) B[f + x] = px(x, y); } return; }
  for (let x = 0; x < 320; x++) { const o = off(x); for (let y = Math.max(0, y0 + o); y < Math.min(180, y1); y++) B[y * 320 + x] = px(x, y - o); }
}

// la niebla: vela todo lo que hay en pantalla entre y0 e y1 hacia su color, más espesa junto al horizonte y con
// jirones que pasan despacio (fuerza 0–1)
function b_niebla(R, t, hor, fuerza, col, y0 = 0, y1 = 180) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y < y1; y++) { const dy = Math.abs(y - hor), base = fuerza * (0.22 + 0.58 * Math.exp(-dy / 22)), f = y * 320;
    for (let x = 0; x < 320; x++) { const j = Math.sin(x * 0.027 + t * 0.32 + y * 0.11) + Math.sin(x * 0.011 - t * 0.17 + y * 0.23 + 2) * 0.8 + Math.sin(x * 0.06 + t * 0.5 - y * 0.05) * 0.3;
      const a = Math.min(0.92, Math.max(0, base + j * 0.09 * fuerza)), q = Math.floor(a * 4 + b_umbral(x, y)) / 4; if (q > 0) B[f + x] = b_mezcla(B[f + x], col, q); } }
}

// las gaviotas: n aves que planean y aletean entre y0 e y1 (nunca en las zonas tranquilas); tn: la luz
function b_gaviotas(R, t, n, y0, y1, tn = (c) => c, sem = 0) {
  const bl = tn(hex('#f4f4f0')), gr = tn(hex('#9aa0a8')), ng = tn(hex('#2a2a30'));
  for (let k = 0; k < n; k++) {
    const dir = h(k, 1, 710 + sem) > 0.5 ? 1 : -1, sp = 6 + h(k, 2, 710 + sem) * 10, x = Math.round(((h(k, 3, 710 + sem) * 420 + dir * t * sp) % 420 + 420) % 420 - 50), y = Math.round(y0 + h(k, 4, 710 + sem) * (y1 - y0) + Math.sin(t * 0.7 + k * 2.1) * 4);
    if (b_quieta(x, y) || b_quieta(x + 5, y) || b_quieta(x - 5, y)) continue;
    const fl = Math.sin(t * (5 + k % 3) + k * 1.9), g = fl > 0.4 ? -1 : fl < -0.4 ? 1 : 0;
    R.pset(x, y, bl); R.pset(x + dir, y, bl); R.pset(x + 2 * dir, y, ng);
    for (let i = 1; i <= 4; i++) { const yy = y + (i > 2 ? g : 0) - (g === -1 ? i >> 1 : 0); const c = i > 3 ? ng : i > 2 ? gr : bl; R.pset(x - i, yy, c); R.pset(x + 1 + i, yy, c); }
  }
}

// las pardelas: una bandada que pasa rasando las olas hacia la derecha, con las alas rígidas, y que se ladea
// enseñando el lomo oscuro o el vientre blanco (entre x0–x1 e y0–y1)
function b_pardelas(R, t, n, x0, x1, y0, y1, tn = (c) => c) {
  const lomo = tn(hex('#3a3a40')), vientre = tn(hex('#eceae4')), ala = tn(hex('#5a5a62'));
  const W = x1 - x0 + 80, cx = x0 - 40 + ((t * 13) % W);
  for (let k = 0; k < n; k++) {
    const x = Math.round(cx + (h(k, 1, 840) - 0.5) * 50 + Math.sin(t * 0.6 + k) * 3), y = Math.round(y0 + h(k, 2, 840) * (y1 - y0) + Math.sin(t * 1.4 + k * 1.7) * 3);
    if (x < x0 - 30 || x > x1 + 30) continue;
    const ladeo = Math.sin(t * 1.7 + k * 1.3), c = ladeo > 0.2 ? vientre : lomo, a = Math.round(ladeo * 1.6);
    R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x + 2, y, lomo);
    for (let i = 1; i <= 4; i++) { R.pset(x - i + 1, y - Math.round(a * i / 4), i > 3 ? lomo : ala); R.pset(x + 1 + i - 1, y + Math.round(a * i / 4) + (i === 1 ? 0 : 0), i > 3 ? lomo : ala); }
    R.pset(x - 1, y + 1, lomo);
  }
}

// medio ancho del casco (dz) y altura de la cubierta (dy, negativa hacia arriba) a lo largo de la eslora (dx: la popa
// en −62, la roda en 66)
const b_hb = (dx) => (dx >= 0 ? 15 * Math.sqrt(Math.max(0, 1 - (dx / 68) ** 2)) : 15 - 4.5 * (dx / 62) ** 2);

const b_yd = (dx) => -15 - 3 * (dx / 64) ** 2 - (dx > 0 ? 2 * (dx / 64) ** 3 : 0);

const B_BARCO = {
  mc: { casco: ['#0c0b10', '#1c1a20', '#34303a', '#56525e'], lona: ['#a49878', '#c8bca0', '#efe6d0', '#fbf6ea'], costura: '#d6ccb2' },
  dg: { casco: ['#10281c', '#1e4430', '#2e6248', '#4a8a66'], lona: ['#b0b2aa', '#d6d6ce', '#f6f4ee', '#ffffff'], costura: '#e2e2da' },
};

// el bergantín del canon (el Mary Celeste o, con o.casco 'dg', el Dei Gratia de casco verde y velas más blancas), de
// costado y algo desde arriba: x el centro, yw la flotación, s la escala (1 = 128 px de eslora sin el bauprés).
// o.dir (1 la proa a la derecha), o.cabeceo / o.balanceo / o.guinada (radianes), o.E (cuánto se ve la cubierta, 0,35),
// o.velas 'pocas' | 'todas' | 'recogidas', o.flamea 0–1 (cuánto baten), o.estado 'hallazgo' (escotillas abiertas y
// sin bote) | 'viaje' (el bote sobre la escotilla), o.rueda (el ángulo de la rueda), o.tn (la luz), o.k (semilla).
// Devuelve { P(dx, dy, dz) (de casco a pantalla), proa, popa, centro }.
function b_bergantin(R, x, yw, s, t, o = {}) {
  const dir = o.dir ?? 1, tn = o.tn ?? ((c) => c), E = o.E ?? 0.35, k = o.k ?? 0, hall = (o.estado ?? 'hallazgo') === 'hallazgo', velas = o.velas ?? 'pocas', fl = o.flamea ?? 0.5;
  const cb = o.cabeceo ?? 0, bl = o.balanceo ?? 0, cp = Math.cos(cb), sp = Math.sin(cb), cr = Math.cos(bl), sr = Math.sin(bl), gx = Math.cos(o.guinada ?? 0);
  const P = (dx, dy, dz = 0) => { const yy = dy * cr - dz * sr, zz = dz * cr + dy * sr, sy = yy + zz * E; return [x + dir * (dx * gx * cp + sy * sp) * s, yw + (sy * cp - dx * gx * sp) * s]; };
  const loc = (px, py) => { const X = (px - x) * dir / s, Y = (py - yw) / s; return [(X * cp - Y * sp) / gx, X * sp + Y * cp]; };
  const lin = (a, b, c) => R.linea(a[0], a[1], b[0], b[1], c);
  const pol = (pts, c) => R.poligono(pts, c);
  const K = B_BARCO[o.casco === 'dg' ? 'dg' : 'mc'], HC = K.casco.map((c) => tn(hex(c))), LO = K.lona.map((c) => tn(hex(c))), cost = b_mezcla(LO[2], LO[1], 0.55);
  const jar = tn(hex('#2a2420')), jarL = tn(hex('#6a5e4c')), palo = [tn(hex('#5e4226')), tn(hex('#94703f')), tn(hex('#c09a62'))];
  const TB = [tn(C.tablaS), tn(C.tabla), tn(C.tablaL), tn(hex('#7a5e3c'))], franja = tn(C.franja), ov = [tn(hex('#5a1c18')), tn(C.obraViva)];
  const det = s > 0.55, fino = s > 0.3;
  const MF = 30, MM = -14;
  // 1. la jarcia de la banda de allá (obenques y brandales), detrás de todo
  const obenques = (mx, top, z, n) => { for (let i = 0; i < n; i++) { const dx = mx - 5 + i * 3.4; lin(P(mx, top, 0), P(dx, b_yd(dx) - 1, z * (b_hb(dx) + 1)), z < 0 ? jarL : jar); } };
  if (fino) { obenques(MF, -60, -1, 3); obenques(MM, -64, -1, 3); lin(P(MF, -86), P(MF - 14, b_yd(MF - 14), -b_hb(MF - 14)), jarL); lin(P(MM, -100), P(MM - 16, b_yd(MM - 16), -b_hb(MM - 16)), jarL); }
  // 2. la regala de allá por dentro (crema, con sus candeleros) y la cubierta de tablas
  const top = [], borde = [], cerca = [];
  for (let dx = -62; dx <= 64; dx += 2) { top.push(P(dx, b_yd(dx) - 2.6, -b_hb(dx))); borde.push(P(dx, b_yd(dx), -b_hb(dx))); cerca.push(P(dx, b_yd(dx), b_hb(dx))); }
  const proaC = P(67, b_yd(66), 0);
  const crema = tn(hex('#d8ccb0')), cremaS = tn(hex('#a89c80'));
  pol([...top, proaC, ...borde.slice().reverse()], (px, py) => (det && Math.round(loc(px, py)[0]) % 7 === 0 ? cremaS : crema));
  const pw = 2.2 / (E * s);
  pol([...borde, proaC, ...cerca.slice().reverse()], (px, py) => {
    const [dx, sy] = loc(px, py), dz = (sy - b_yd(dx)) / E, pl = Math.floor((dz + 40) / pw), f = (dz + 40) / pw - pl;
    if (det && f < 0.22) return TB[3];
    if (det && h(Math.floor(dx / 13 + pl * 0.37), pl, 850) > 0.86 && Math.abs(dx % 13) < 0.6) return TB[3];
    if (hall && h(Math.floor(dx / 6), pl >> 1, 851) > 0.84) return TB[0];
    return pl % 2 ? TB[1] : (h(pl, 0, 852) > 0.5 ? TB[2] : TB[1]);
  });
  // 3. lo de cubierta: escotillas (abiertas y con sus tapas tiradas al encontrarlo), la caseta con dos ventanillas, la
  // bomba junto al palo mayor, la rueda a popa y el molinete a proa
  const yd = b_yd;
  const caja = (x0, x1, z0, z1, alto, cTop, cFr) => {
    pol([P(x0, yd(x0), z1), P(x1, yd(x1), z1), P(x1, yd(x1) - alto, z1), P(x0, yd(x0) - alto, z1)], cFr);
    pol([P(x0, yd(x0) - alto, z0), P(x1, yd(x1) - alto, z0), P(x1, yd(x1) - alto, z1), P(x0, yd(x0) - alto, z1)], cTop);
  };
  const negro = tn(hex('#120e0c')), madera = tn(hex('#a8784a')), maderaS = tn(hex('#6a4428')), maderaL = tn(hex('#c89a66')), techo = tn(hex('#d6ccb4')), gris = tn(hex('#8a8a84')), grisS = tn(hex('#5e5e5a'));
  const escotilla = (x0, x1, z, abierta) => {
    caja(x0, x1, -z, z, 1.6, maderaS, madera);
    if (abierta) { pol([P(x0 + 0.8, yd(x0) - 1.6, -z + 0.8), P(x1 - 0.8, yd(x1) - 1.6, -z + 0.8), P(x1 - 0.8, yd(x1) - 1.6, z - 0.8), P(x0 + 0.8, yd(x0) - 1.6, z - 0.8)], negro);
      const tx = x1 + 1.5; pol([P(tx, yd(tx) - 0.3, z - 1), P(tx + (x1 - x0) * 0.8, yd(tx) - 0.3, z - 0.5), P(tx + (x1 - x0) * 0.8, yd(tx) - 0.3, z + 3), P(tx, yd(tx) - 0.3, z + 2.5)], TB[2]); }
    else pol([P(x0 + 0.6, yd(x0) - 1.7, -z + 0.6), P(x1 - 0.6, yd(x1) - 1.7, -z + 0.6), P(x1 - 0.6, yd(x1) - 1.7, z - 0.6), P(x0 + 0.6, yd(x0) - 1.7, z - 0.6)], (px, py) => (Math.round(loc(px, py)[0] * s) % 3 === 0 ? TB[0] : TB[2]));
  };
  escotilla(44, 51, 3.2, hall); escotilla(-56, -51, 2.6, hall); escotilla(1, 12, 5, false);
  if (hall) { // las trincas sueltas del bote que ya no está
    for (const z of [-3, 3]) { const a = P(4, yd(4) - 1.8, z), b = P(8, yd(8) - 0.2, z * 2.6), c2 = P(10, yd(10) - 0.2, z * 3.6); lin(a, b, jarL); lin(b, c2, jarL); } }
  else { // el bote (yola gris) atado sobre la escotilla principal
    const bt = []; for (let i = 0; i <= 12; i++) { const a = i / 12 * Math.PI; bt.push(P(6.5 + Math.cos(a) * 9, yd(6) - 4.2, -Math.sin(a) * 3.6)); }
    for (let i = 0; i <= 12; i++) { const a = Math.PI + i / 12 * Math.PI; bt.push(P(6.5 + Math.cos(a) * 9, yd(6) - 4.2, -Math.sin(a) * 3.6)); }
    const casc = []; for (let i = 0; i <= 12; i++) { const a = i / 12 * Math.PI; casc.push(P(6.5 - Math.cos(a) * 9, yd(6) - 4.2, Math.sin(a) * 3.6)); } for (let i = 12; i >= 0; i--) { const a = i / 12 * Math.PI; casc.push(P(6.5 - Math.cos(a) * 8, yd(6) - 1.8, Math.sin(a) * 2.6)); }
    pol(casc, gris); pol(bt, grisS); lin(P(-2, yd(-2) - 4.2, 0), P(15, yd(15) - 4.2, 0), gris);
    for (const dx of [2, 11]) lin(P(dx, yd(dx) - 4.6, 3.8), P(dx, yd(dx) - 0.2, 5.5), jar); }
  caja(-47, -25, -7, 7, 8, techo, (px, py) => { const [dx] = loc(px, py); return det && Math.round(dx * s) % 3 === 0 ? maderaS : madera; });
  if (fino) { for (const wx of [-42, -34]) pol([P(wx, yd(wx) - 6.2, 7), P(wx + 3.4, yd(wx + 3.4) - 6.2, 7), P(wx + 3.4, yd(wx + 3.4) - 3, 7), P(wx, yd(wx) - 3, 7)], tn(hex('#e8e0cc')));
    for (const wx of [-42, -34]) pol([P(wx + 0.7, yd(wx) - 5.6, 7), P(wx + 2.7, yd(wx + 3) - 5.6, 7), P(wx + 2.7, yd(wx + 3) - 3.6, 7), P(wx + 0.7, yd(wx) - 3.6, 7)], tn(hex('#2a3644')));
    pol([P(-29.5, yd(-29) - 7, 7), P(-26.5, yd(-26) - 7, 7), P(-26.5, yd(-26), 7), P(-29.5, yd(-29), 7)], maderaS);
    lin(P(-47, yd(-47) - 8.2, 7), P(-25, yd(-25) - 8.2, 7), maderaL); lin(P(-38, yd(-38) - 8, 0), P(-38, yd(-38) - 10.5, 0), negro); }
  // la bomba (un tubo con su palanca) junto al palo mayor; al encontrarlo, desmontada: el émbolo tirado al lado
  if (fino) { lin(P(-8, yd(-8), 4), P(-8, yd(-8) - 5, 4), negro); lin(P(-7.4, yd(-8), 4), P(-7.4, yd(-8) - 5, 4), grisS);
    if (hall) lin(P(-6, yd(-6) - 0.3, 6), P(-1, yd(-1) - 0.3, 8), grisS); else lin(P(-12, yd(-8) - 5.5, 4), P(-4, yd(-8) - 4, 4), madera); }
  // el molinete a proa
  if (fino) { const a = P(57, yd(57) - 1.4, -4), b = P(57, yd(57) - 1.4, 4); R.linea(a[0], a[1], b[0], b[1], maderaS); R.linea(a[0], a[1] - 1, b[0], b[1] - 1, madera); }
  // la rueda del timón (de canto, con sus cabillas) sobre su caja
  { const rc = P(-58.5, yd(-58.5) - 5.5, 0), rg = o.rueda ?? 0;
    lin(P(-58, yd(-58), -1.5), P(-58, yd(-58) - 5, -1.5), maderaS); lin(P(-58, yd(-58), 1.5), P(-58, yd(-58) - 5, 1.5), madera);
    if (fino) for (let i = 0; i < 8; i++) { const a = rg + i * Math.PI / 4, p = P(-58.5, yd(-58.5) - 5.5 + Math.sin(a) * 4.6, Math.cos(a) * 4.6); lin(rc, p, maderaL); }
    for (let i = 0; i < 24; i++) { const a = i / 24 * 6.283, p = P(-58.5, yd(-58.5) - 5.5 + Math.sin(a) * 3.6, Math.cos(a) * 3.6); R.pset(p[0], p[1], maderaS); } }
  // 4. los palos (con su cofa y crucetas), la botavara y el pico de la cangreja, el bauprés y el botalón
  const palos = (mx, y0, y1, w0, w1) => { if (w0 * s < 1.4) { lin(P(mx, y0), P(mx, y1), palo[0]); return; }
    pol([P(mx - w0 / 2, y0), P(mx + w0 / 2, y0), P(mx + w1 / 2, y1), P(mx - w1 / 2, y1)], (px, py) => { const [dx] = loc(px, py), u = (dx - mx) * dir; return u < -0.35 ? palo[2] : u > 0.45 ? palo[0] : palo[1]; }); };
  palos(MF, b_yd(MF), -62, 2.6, 2); palos(MF, -57, -87, 1.7, 1.2); palos(MF, -85, -99, 1, 0.7);
  palos(MM, b_yd(MM), -66, 2.8, 2.1); palos(MM, -60, -103, 1.7, 0.8);
  for (const [mx, yy, w] of [[MF, -62, 5], [MF, -86, 3.5], [MM, -66, 5]]) { lin(P(mx - w, yy), P(mx + w, yy), jar); lin(P(mx - w, yy + 0.7), P(mx + w, yy + 0.7), palo[0]); }
  const llenas = velas === 'todas';
  const throat = llenas ? [MM - 1, -58] : [MM - 1, -29], peak = llenas ? [-54, -73] : [-52, -32];
  lin(P(MM - 1, -24), P(-75, -26), palo[1]); lin(P(MM - 1, -23.4), P(-75, -25.4), palo[0]);
  // 5. las velas de estay entre los palos (con todo el trapo) y la cangreja
  const ondea = (dx, sy, vel = 15) => Math.sin(dx * 0.9 + sy * 0.45 - t * vel);
  const vela = (pts, fn) => pol(pts.map(([a, b]) => P(a, b)), fn);
  if (llenas) {
    vela([[-12, -95], [25, -63], [-10, -64]], (px, py) => { const [dx, sy] = loc(px, py); return dx > 14 ? LO[1] : (det && Math.round(sy * s) % 4 === 0 ? cost : LO[2]); });
    vela([[-12, -60], [26, -34], [-11, -33]], (px, py) => { const [dx, sy] = loc(px, py); return dx > 12 ? LO[1] : (det && Math.round(sy * s) % 4 === 0 ? cost : LO[2]); });
    // la cangreja hinchada y la escandalosa encima
    const bate = fl * Math.max(0, Math.sin(t * 0.7 + k + 2));
    vela([throat, peak, [-73, -27 + Math.sin(t * 9) * bate], [MM - 1, -26]], (px, py) => { const [dx, sy] = loc(px, py), u = (MM - dx) / 60;
      if (bate > 0.3 && ondea(dx, sy) > 0.55) return LO[3]; if (det && Math.round((dx + sy * 0.25) * s) % 4 === 0) return cost; return u > 0.78 ? LO[1] : u < 0.18 ? LO[1] : u > 0.25 && u < 0.6 ? LO[3] : LO[2]; });
    vela([[MM - 1, -100], [MM - 1, -62], peak], (px, py) => { const [dx] = loc(px, py); return dx < MM - 22 ? LO[1] : LO[2]; });
    lin(P(MM - 1, -100), P(...peak), jar);
  } else {
    // la cangreja aferrada sobre la botavara y el pico arriado encima
    for (let dx = MM - 2; dx > -73; dx -= 0.6 / s) { const b = 1.4 + Math.abs(Math.sin(dx * 0.5)) * 1.2; const p = P(dx, -25 - b), q = P(dx, -24.6); R.linea(p[0], p[1], q[0], q[1], LO[1]); R.pset(p[0], p[1], LO[3]); if (det && Math.round(dx) % 9 === 0) R.linea(p[0], p[1], q[0], q[1], jarL); }
  }
  lin(P(...throat), P(...peak), palo[1]); lin(P(...throat).map((v, i) => v + (i ? 0.7 : 0)), P(...peak).map((v, i) => v + (i ? 0.7 : 0)), palo[0]);
  // 6. las velas cuadradas del trinquete: trinquete, gavia baja, gavia alta y juanete. Con 'pocas', de la vela de
  // trinquete y de la gavia alta solo quedan jirones, y la gavia baja bate; el juanete, aferrado
  const verga = (yy, w) => { lin(P(MF - w, yy), P(MF + w, yy), palo[0]); if (s > 0.6) lin(P(MF - w + 1, yy - 0.6), P(MF + w - 1, yy - 0.6), palo[1]); lin(P(MF - w, yy + 0.4), P(MF - w * 0.6, yy - 2), jar); };
  const aferrada = (yy, w) => { for (let i = -w; i <= w; i += 0.6 / s) { const b = 1 + Math.abs(Math.sin(i * 0.6 + yy)) * 0.9; const p = P(MF + i, yy - b), q = P(MF + i, yy); R.linea(p[0], p[1], q[0], q[1], LO[1]); R.pset(p[0], p[1], LO[3]); if (det && Math.round(i) % 8 === 0) R.linea(p[0], p[1], q[0], q[1], jarL); } };
  const jirones = (yy, w, n, largo) => { for (let j = 0; j < n; j++) { const u = (j + 0.5) / n * 2 - 1, L = largo * (0.4 + h(j, k, 853) * 0.7), wj = 1.2 + h(j, k, 854) * 2;
      for (let i = 0; i < L; i += 0.5 / s) { const sw = Math.sin(t * 9 + j * 1.7 - i * 0.5) * i * 0.18 * (0.6 + fl) + i * 0.25; const p = P(MF + u * w + sw, yy + i), q = P(MF + u * w + sw + wj * (1 - i / L * 0.6), yy + i); R.linea(p[0], p[1], q[0], q[1], i > L - 1.5 ? LO[1] : (Math.sin(t * 9 + j - i * 0.5) > 0.4 ? LO[3] : LO[2])); } } };
  const cuadra = (ya, yb, wa, wb, modo, fase) => {
    const llen = modo === 'llena' ? 1 : Math.max(0, Math.sin(t * 0.8 + fase)), bate = modo === 'bate' ? (1 - llen) * (0.5 + fl * 0.5) : 0, pz = 1 + llen * 3;
    const wob = (i) => bate * Math.sin(t * 13 + i * 0.7) * 1.6;
    const pts = [[MF - wa, ya], [MF + wa, ya], [MF + wb + pz * 0.5, (ya + yb) / 2 + wob(1)], [MF + wb + wob(2), yb]];
    for (let i = 1; i < 8; i++) { const u = i / 8; pts.push([MF + wb - u * wb * 2, yb - Math.sin(u * Math.PI) * pz * 0.7 + wob(i + 3)]); }
    pts.push([MF - wb + wob(12), yb], [MF - wb - pz * 0.5, (ya + yb) / 2 + wob(13)]);
    vela(pts, (px, py) => { const [dx, sy] = loc(px, py), u = (dx - MF) / wb, v = (sy - ya) / (yb - ya);
      if (bate > 0.25) { const f = ondea(dx, sy, 17); if (f > 0.55) return LO[3]; if (f < -0.6) return LO[1]; }
      if (v < 0.07) return LO[0]; if (det && Math.abs(v - 0.14) < 0.035 && Math.round(dx * s) % 2 === 0) return LO[0];
      if (det && Math.round((dx - MF) * s) % 5 === 0) return cost;
      return u > 0.58 ? LO[1] : u < -0.82 ? LO[1] : (u > -0.45 && u < 0.2 && v > 0.25 && v < 0.85) ? LO[3] : LO[2]; });
    lin(P(MF - wb, yb), P(MF - wb - 2, yb + 3), jarL); lin(P(MF + wb, yb), P(MF + wb + 2, yb + 3), jarL);
  };
  if (velas === 'todas') { cuadra(-52, -26, 27, 29, 'llena', k); cuadra(-64, -52.5, 23, 26, 'llena', k + 1); cuadra(-77, -64.5, 20, 23, 'llena', k + 2); cuadra(-89, -77.5, 15, 19, 'llena', k + 3); }
  else if (velas === 'pocas') { jirones(-52, 27, 6, 9); cuadra(-64, -52.5, 23, 26, 'bate', k + 1); jirones(-77, 20, 5, 6); aferrada(-89, 15); }
  else { aferrada(-52, 27); aferrada(-64, 23); aferrada(-77, 20); aferrada(-89, 15); }
  verga(-52, 28); verga(-64, 24); verga(-77, 21); verga(-89, 16);
  // 7. los estays, el bauprés con el botalón, el moco y los foques (dos con 'pocas', tres con 'todas')
  lin(P(MF, -61), P(64, -19), jar); lin(P(MF, -86), P(92, -29), jar); lin(P(MF, -98), P(106, -33), jar); lin(P(MM, -64), P(MF - 2, -20), jar); lin(P(MM, -100), P(MF, -62), jar);
  { const a = P(58, -21), b = P(94, -30); if (s > 0.5) { lin([a[0], a[1] - 1], [b[0], b[1] - 1], palo[2]); } lin(a, b, palo[1]); lin([a[0], a[1] + 1], [b[0], b[1] + 0.5], palo[0]); lin(P(88, -28.5), P(108, -34), palo[1]); lin(P(88, -28), P(87, -19), palo[0]); lin(P(87, -19), P(108, -34), jarL); lin(P(87, -19), P(62, -5), jarL); }
  const foque = (tack, head, clew, fase) => { const llen = velas === 'todas' ? 1 : Math.max(0.15, Math.sin(t * 0.9 + fase + 1)), bate = (1 - llen) * fl, pz = llen * 2.4;
    const mid = [(head[0] + clew[0]) / 2 - pz, (head[1] + clew[1]) / 2 + pz * 0.6];
    vela([tack, head, mid, clew, [(tack[0] + clew[0]) / 2, (tack[1] + clew[1]) / 2 + pz * 0.4]], (px, py) => { const [dx, sy] = loc(px, py), xL = head[0] + (clew[0] - head[0]) * Math.max(0, Math.min(1, (sy - head[1]) / (clew[1] - head[1]))), xT = head[0] + (tack[0] - head[0]) * Math.max(0, Math.min(1, (sy - head[1]) / (tack[1] - head[1]))), v = (dx - xL) / Math.max(1, xT - xL);
      if (bate > 0.3 && v < 0.3) { const f = ondea(dx, sy, 16); if (f > 0.6) return LO[3]; if (f < -0.7) return LO[1]; }
      if (det && Math.round((sy - dx * 0.6) * s) % 7 === 0) return cost; return v < 0.18 ? LO[1] : (v > 0.42 && v < 0.85 && llen > 0.5) ? LO[3] : LO[2]; }); };
  foque([90, -29], [MF + 3, -82], [60, -30], k); foque([105, -33.5], [MF + 2, -95], [70, -34], k + 2);
  if (velas === 'todas') foque([72, -22], [MF + 3, -58], [50, -24], k + 4);
  // 8. el costado de acá: regala con su tapa, la franja blanca a la altura de la cubierta, el casco negro con sus
  // tracas y el brillo del cielo, la obra viva roja bajo la flotación; la roda, el ancla en su serviola
  const lado = [];
  for (let dx = -62; dx <= 64; dx += 2) lado.push(P(dx, b_yd(dx) - 2.6, b_hb(dx)));
  lado.push(P(67, b_yd(66) - 2.8, 0), P(65, -8, 0), P(61, 0, 0), P(57, 3.5, 0));
  for (let dx = 54; dx >= -58; dx -= 2) lado.push(P(dx, 3.5, b_hb(dx) * 0.88));
  lado.push(P(-61, -3, b_hb(-62) * 0.95));
  const tapa = tn(hex('#3e2c1e')), tapaL = tn(hex('#6e5238'));
  pol(lado, (px, py) => { const [dx, sy] = loc(px, py), z = dx > 60 ? 0 : b_hb(dx), dy = sy - z * E, rel = dy - b_yd(dx);
    if (rel < -2.05) return rel < -2.45 && det ? tapaL : tapa;
    if (rel < 0.15) return rel < -1.4 ? HC[3] : HC[1];
    if (rel < 1.35) return franja;
    if (dy > 0.4) return dy > 2.3 ? ov[0] : ov[1];
    const fin = Math.abs(dx) > 52 ? 1 : 0;
    if (det && Math.round(rel * s) % 3 === 0 && !fin) return HC[0];
    if (rel < 3.4) return b_umbral(Math.round(px), Math.round(py)) < 0.5 ? HC[2] : HC[1];
    return fin ? HC[0] : HC[1]; });
  if (fino) { // las mesas de guarnición con sus cadenotes, y el ancla en la serviola
    for (const [x0, x1] of [[23, 37], [-21, -7]]) { lin(P(x0, b_yd(x0) + 1.6, b_hb(x0) + 1), P(x1, b_yd(x1) + 1.6, b_hb(x1) + 1), HC[3]); for (let dx = x0 + 1; dx < x1; dx += 3.4) lin(P(dx, b_yd(dx) + 1.6, b_hb(dx) + 1), P(dx, b_yd(dx) + 5, b_hb(dx) + 0.6), HC[0]); }
    const an = P(58, b_yd(58) + 2, b_hb(58) + 0.5); R.linea(an[0], an[1], an[0], an[1] + 4 * s, HC[3]); R.linea(an[0] - 1.5 * s, an[1] + 4 * s, an[0] + 1.5 * s, an[1] + 4 * s, HC[3]); R.pset(an[0] - 2 * s, an[1] + 3 * s, HC[3]); R.pset(an[0] + 2 * s, an[1] + 3 * s, HC[3]);
    lin(P(-62, b_yd(-62) - 2.6, b_hb(-62)), P(-62, 0, b_hb(-62)), HC[0]); }
  // 9. los obenques de acá con sus flechastes, los brandales, y el gallardete del palo mayor
  const acaOb = (mx, top, n) => { const pies = []; for (let i = 0; i < n; i++) { const dx = mx - 5 + i * 3.4; pies.push(P(dx, b_yd(dx) + 1.6, b_hb(dx) + 1)); lin(P(mx, top), pies[i], jar); }
    if (det) for (let j = 1; j < 7; j++) { const u = j / 8, a = P(mx, top), q0 = pies[0], q1 = pies[n - 1]; lin([a[0] + (q0[0] - a[0]) * u, a[1] + (q0[1] - a[1]) * u], [a[0] + (q1[0] - a[0]) * u, a[1] + (q1[1] - a[1]) * u], jarL); } };
  if (fino) { acaOb(MF, -60, 3); acaOb(MM, -64, 3); lin(P(MF, -86), P(MF - 12, b_yd(MF - 12) + 1.6, b_hb(MF - 12) + 1), jar); lin(P(MM, -101), P(MM - 15, b_yd(MM - 15) + 1.6, b_hb(MM - 15) + 1), jar); }
  { const a = P(MM, -103); const L = Math.max(4, Math.round(10 * s)); for (let i = 0; i <= L; i++) { const u = i / L, yy = a[1] + Math.sin(t * 7 - i * 0.6) * (0.4 + u * 1.4) + u * 0.6; R.pset(a[0] - dir * i, yy, tn(hex('#b8302a'))); if (u < 0.5 && s > 0.5) R.pset(a[0] - dir * i, yy + 1, tn(hex('#8a2420'))); } }
  return { P, proa: P(108, -34), popa: P(-62, b_yd(-62)), centro: P(0, -8), roda: P(60, 0) };
}

// la flotación de un barco ya pintado: el agua que lame la obra viva (repinta el mar de px sobre el casco, un poco
// oscurecido por el reflejo), la línea de espuma, la ola de proa que sube por la roda, los rociones cuando la proa
// cae (rocio 0–1) y la estela que se queda atrás (con dir y escala de b_bergantin)
function b_flotacion(R, t, Bq, s, dir, px, rocio, Pm) {
  const esp = Pm[6], br = Pm[7], osc = hex('#141820');
  for (let dx = -60; dx <= 58; dx += 0.5 / s) { const p = Bq.P(dx, 1.2, b_hb(dx) * 0.9), X = Math.round(p[0]), y0 = Math.round(p[1] + Math.sin(X * 0.45 + t * 3.1) * 0.8 * s);
    for (let y = y0; y < y0 + 6 * s; y++) R.pset(X, y, b_mezcla(px(X, y), osc, 0.38 - (y - y0) / (6 * s) * 0.25));
    const fz = dx > 40 ? 1 : dx < -48 ? 0.8 : 0.35; if (h(X, Math.floor(t * 6), 860) < fz) R.pset(X, y0 - 1, h(X, 1, Math.floor(t * 5)) > 0.5 ? esp : br);
    if (h(X >> 1, Math.floor(t * 4), 861) < fz * 0.6) R.pset(X, y0, esp); }
  // la ola de proa: la espuma sube por la roda y se abre hacia atrás
  const r = Bq.roda;
  for (let i = 0; i < 26 * s; i++) { const u = i / (26 * s), a = h(i, Math.floor(t * 8), 862); R.pset(r[0] - dir * u * 30 * s + (a - 0.5) * 3, r[1] - (1 - u) * 4 * s * (0.6 + rocio) + a * 2, a > 0.4 ? esp : br); }
  // los rociones: gotas que saltan de la roda hacia delante y arriba y caen
  if (rocio > 0.02) for (let i = 0; i < 40 * rocio * s; i++) { const u = (t * 1.3 + h(i, 1, 863)) % 1, vx = (0.4 + h(i, 2, 863)) * 22 * s, vy = (0.6 + h(i, 3, 863)) * 26 * s, X = r[0] + dir * vx * u, Y = r[1] - vy * u + 34 * s * u * u;
    R.pset(X, Y, u < 0.5 ? br : esp); if (i % 3 === 0) R.pset(X + dir, Y + 1, esp); }
  // la estela: espuma que se queda atrás y se abre
  const pp = Bq.P(-60, 2, 0);
  for (let i = 0; i < 70 * s; i++) { const u = i / (70 * s), xx = pp[0] - dir * u * 80 * s, w = 2 + u * 10 * s;
    for (let j = -w; j <= w; j += 1) { const a = h(Math.floor((xx + t * 14 * dir) / 3), Math.round(j), 864); if (a > 0.55 + u * 0.35) R.pset(xx, pp[1] + j * 0.35 + Math.sin(xx * 0.3 + t) * 0.6, a > 0.85 ? br : esp); } }
}

// las costas de la carta (lon, lat), copiadas de pixel-roma.js (MAR e ISLAS): el mar del Atlántico Norte (oeste y este),
// el Mediterráneo y las islas grandes que caen en la carta
const B_COSTAS = {
  med: [[-5.6, 36.1], [-4.5, 36.7], [-2, 36.8], [-0.5, 38.3], [0.2, 39.5], [-0.3, 40.2], [1, 41], [3.2, 41.9], [3.1, 43], [4.5, 43.4], [6.5, 43.1], [8.5, 44.4], [10, 44], [10.5, 43], [12.3, 41.7], [14, 40.8], [15.6, 40], [15.8, 38.5], [16.6, 38.4], [17.1, 39], [16.5, 39.8], [17.2, 40.5], [18.5, 40.1], [18, 40.6], [16, 41.9], [14, 42.6], [12.4, 44.2], [12.3, 45.4], [13.7, 45.6], [15, 44.5], [17, 43.4], [19, 42], [19.5, 40.5], [20.0, 39.7], [20.3, 39.3], [20.7, 38.9], [21.1, 38.4], [21.3, 37.9], [21.6, 37.6], [21.7, 37.0], [21.9, 36.8], [22.2, 37.0], [22.4, 36.45], [22.6, 36.8], [22.8, 36.5], [23.05, 36.45], [23.0, 37.0], [22.75, 37.5], [23.2, 37.4], [23.1, 37.6], [23.4, 37.95], [23.6, 37.9], [24.0, 37.65], [24.05, 38.0], [23.6, 38.4], [22.9, 38.85], [22.6, 38.9], [23.0, 39.2], [22.9, 39.6], [22.6, 40.0], [22.6, 40.5], [23.0, 40.5], [23.7, 40.2], [23.4, 40.0], [24.0, 40.0], [24.4, 40.15], [23.9, 40.5], [24.5, 40.9], [25.5, 40.9], [26.0, 40.8], [26.3, 40.1], [26.6, 39.3], [26.9, 38.9], [26.6, 38.6], [27.0, 38.4], [26.3, 38.3], [27.2, 37.9], [27.3, 37.4], [27.6, 37.0], [28.2, 36.7], [30.5, 36.8], [32.8, 36.1], [36, 36.8], [35.9, 35], [35, 33], [34.3, 31.3], [32.3, 31.2], [30, 31.4], [25, 31.8], [20, 32], [20, 30.4], [19, 30.3], [15.6, 31.6], [11.5, 33.1], [10.2, 34.2], [11, 35.2], [10.2, 36.9], [9.8, 37.3], [8, 36.9], [3, 36.8], [0, 35.8], [-2, 35.1], [-5.4, 35.9]],
  atlanticoN: [[-20, 18], [-20, 74], [-80, 74], [-80, 63], [-64, 60], [-60, 55], [-56, 52], [-60, 47], [-66, 44.5], [-70, 42], [-74, 40.5], [-75.5, 37], [-76, 35], [-81, 31], [-80.2, 25.5], [-82, 24], [-82, 18]],
  atlantico: [[-20, 20], [-16, 24], [-13, 27.7], [-10, 29.5], [-9.6, 30.5], [-9.8, 32], [-8.5, 33.3], [-6.8, 34], [-5.9, 35.8], [-6.3, 36.5], [-7.4, 37.2], [-8.9, 37], [-8.8, 38.7], [-9.5, 38.8], [-8.9, 40], [-8.8, 42], [-9.3, 43], [-7.7, 43.7], [-4, 43.4], [-1.8, 43.4], [-1.2, 44.6], [-1.2, 46.2], [-2.2, 47.1], [-4.5, 47.8], [-4.7, 48.5], [-3, 48.8], [-1.6, 48.6], [-1.4, 49.7], [0.2, 49.6], [1.6, 50.2], [1.6, 51], [2.5, 51.1], [3.6, 51.4], [4.5, 52.5], [5, 53.3], [7, 53.6], [8.6, 53.9], [8.6, 55.5], [8.2, 56.8], [10.5, 57.7], [10.6, 59.2], [9, 58.8], [7, 58], [5.5, 58.8], [5, 60], [-20, 60]],
  britania: [[-5.7, 50], [-4, 50.3], [-1.5, 50.6], [1.4, 51.2], [1.7, 52.6], [0.3, 53.4], [-0.2, 54.2], [-1.5, 55.5], [-2, 56], [-2.9, 56.5], [-1.8, 57.6], [-3.3, 58.6], [-5, 58.6], [-6.2, 57.5], [-5.6, 56.2], [-5.4, 55.4], [-4.8, 54.8], [-3.4, 54.9], [-3, 54], [-3.1, 53.3], [-4.6, 53.2], [-4.2, 52.3], [-5.3, 51.8], [-3.4, 51.4], [-4.5, 51.1]],
  irlanda: [[-10, 51.6], [-6.2, 52.2], [-6, 53.5], [-5.6, 54.6], [-7.2, 55.3], [-8.5, 54.4], [-10, 53.6], [-9.4, 52.6]],
  sicilia: [[12.4, 38.1], [15.6, 38.3], [15.1, 36.7], [12.6, 37.6]],
  cerdena: [[8.4, 39], [9.6, 39.1], [9.8, 41], [8.4, 41]],
  corcega: [[8.6, 41.4], [9.4, 41.4], [9.5, 43], [8.7, 42.6]],
  terranova: [[-59.4, 47.6], [-55.5, 46.6], [-52.6, 46.8], [-53, 49.5], [-55.5, 51.6], [-57.2, 50.6]],
};

// las vistas de mar() por encuadre y cámara
const B_VISTAS = {
  'alta.general': (R, t, o, luz) => b_alta(R, t, o, luz),
  'alta.timon': (R, t, o, luz) => b_timon(R, t, o, luz),
  'encuentro.general': (R, t, o, luz) => b_encuentro(R, t, o, luz),
  'encuentro.catalejo': (R, t, o, luz) => b_catalejo(R, t, o, luz),
  'mapa.general': (R, t, o, luz) => b_mapa(R, t, o, luz),
  'mapa.azores': (R, t, o, luz) => b_azores(R, t, o, luz),
  'bote.general': (R, t, o, luz) => b_bote(R, t, o, luz),
  'bote.cabo': (R, t, o, luz) => b_cabo(R, t, o, luz),
};

// el movimiento del barco que da bandazos: cabeceo con la mar de fondo hS(x, t), balanceo y guiñada (band 0–1)
function b_bandazos(t, bx, band, hS) {
  const proa = hS(bx + 60, t), popa = hS(bx - 60, t);
  return { cab: Math.atan2(proa - popa, 120) * (0.7 + band) + Math.sin(t * 1.37 + 0.4) * 0.03 * band,
    bal: Math.sin(t * 0.83 + 0.6) * (0.06 + 0.12 * band) + Math.sin(t * 1.9) * 0.02 * band,
    gui: Math.sin(t * 0.47) * 0.14 * band, dy: (proa + popa) / 2, rocio: Math.max(0, (hS(bx + 60, t) - hS(bx + 60, t - 0.25)) * 0.9) * (0.4 + band) };
}

// la isla de Santa María en el horizonte: una loma azulada y velada (meseta a la izquierda, el pico a la derecha)
function b_islaLejos(R, x0, hor, L) {
  const c = b_mezcla(L.mar[3], L.mar[0], 0.35), cL = b_mezcla(c, hex('#ffffff'), 0.12), esp = L.mar[6];
  for (let x = x0; x < x0 + 74; x++) { const u = (x - x0) / 74, alto = Math.round(4 + Math.sin(u * Math.PI) * 3 + Math.exp(-(((u - 0.68) / 0.12) ** 2)) * 5 + h(x >> 1, 0, 870) * 1.2);
    for (let y = hor - alto; y < hor; y++) R.pset(x, y, y === hor - alto ? cL : c); if (x % 3 === 0) R.pset(x, hor - 1, esp); }
}

// ALTA · el Mary Celeste solo en alta mar
function b_alta(R, t, o, luz) {
  const hor = 96, L = b_pal(luz), tn = b_tinte(luz), F = b_cieloFijo(R, luz, hor), band = o.bandazo ?? 0.6;
  R.copiar(F.b);
  b_nubes(R, t, hor, luz, F.b);
  const px = b_marPrep(t, hor, luz, { fuerza: 0.5 + band * 0.35, sol: L.sol ? L.sol[0] : null });
  b_marPinta(R, px, hor, 180);
  if (o.isla) b_islaLejos(R, 20, hor, L);
  if (o.deiGratia) { const g = Math.max(0, Math.min(1, o.deiGratia)), lejos = (c) => b_mezcla(tn(c), L.mar[0], 0.4 * (1 - g));
    b_bergantin(R, 30 + g * 26, hor + 2 + g * 7, 0.14 + g * 0.16, t, { casco: 'dg', velas: 'todas', tn: lejos, k: 3, cabeceo: Math.sin(t * 1.1) * 0.03, balanceo: Math.sin(t * 0.9) * 0.08 }); }
  b_pardelas(R, t, 7, 0, 110, hor + 6, hor + 26, tn);
  // el barco: cabecea con la mar de fondo, se escora y guiña
  const hS = (xx, tt) => 2.4 * Math.sin(xx * 0.03 - tt * 1.15) + 1.4 * Math.sin(xx * 0.071 + tt * 0.83 + 1);
  const bx = 158 + Math.sin(t * 0.21) * 5, m = b_bandazos(t, bx, band, hS), yw = 141 + m.dy;
  const Bq = b_bergantin(R, bx, yw, 1, t, { cabeceo: m.cab, balanceo: m.bal, guinada: m.gui, velas: o.velas ?? 'pocas', flamea: band, tn, estado: o.estado ?? 'hallazgo', rueda: Math.sin(t * 0.9) * 1.4 + Math.sin(t * 2.3) * 0.4 });
  b_flotacion(R, t, Bq, 1, 1, px, m.rocio, L.mar);
  // la loma de una ola grande en primer plano, con su encaje de espuma
  b_olaDelante(R, t, px, L.mar, 168, band);
  if (L.niebla) b_niebla(R, t, hor, 0.8, L.niebla);
  // la proyección del barco de este instante (de casco a pantalla) y la línea de cubierta (donde pisa quien va a bordo)
  const proy = (dx, dy, dz = 0) => Bq.P(dx, dy, dz).map(Math.round), cubierta = (dx) => proy(dx, b_yd(dx), 0);
  return { horizonte: hor, barco: Bq.centro.map(Math.round), proa: Bq.proa.map(Math.round), popa: Bq.popa.map(Math.round), proy, cubierta, yd: b_yd };
}
// la loma de una ola grande que pasa por delante (y0: su altura media): la cresta con espuma que rompe a ratos, el
// encaje de espuma en la cara y el cuerpo oscuro con vetas
function b_olaDelante(R, t, px, P, y0, band = 0.5) {
  const B = R.buf, yN = (x) => y0 + 5 * Math.sin(x * 0.018 - t * 0.9) + 3 * Math.sin(x * 0.047 + t * 1.4 + 1) + 1.5 * Math.sin(x * 0.11 - t * 2.1);
  for (let x = 0; x < 320; x++) { const yn = yN(x), sl = yN(x + 1) - yn, ys = Math.round(yn);
    for (let y = Math.max(0, ys); y < 180; y++) { const d = y - yn;
      const rompe = sl < -0.1 && h(x >> 2, Math.floor(t * 3), 873) > 0.45;
      let c = d < 1.2 ? (rompe ? P[6] : P[4]) : d < 3 ? (rompe && b_umbral(x, y) < 0.5 ? P[6] : b_umbral(x, y) < 0.5 ? P[4] : P[1]) : d < 9 ? (b_umbral(x, y) < 0.5 ? P[2] : P[3]) : P[3];
      const e = Math.sin(x * 0.31 + y * 0.9 + t * 1.1) * Math.sin(x * 0.13 - y * 0.55 - t * 0.7);
      if (d > 2 && e > 0.8 - band * 0.08) c = d < 6 && rompe ? P[6] : P[4]; else if (d > 4 && e < -0.75) c = P[5];
      if (d > 3 && h((x + Math.floor(t * 10)) >> 2, y, 871) > 0.975) c = P[4];
      B[y * 320 + x] = c; }
    if (sl < -0.12 && h(x >> 2, Math.floor(t * 3), 873) > 0.45 && h(x, Math.floor(t * 7), 872) > 0.5) { R.pset(x - 2, ys - 1, P[6]); if (h(x, 3, Math.floor(t * 7)) > 0.6) R.pset(x - 4, ys - 3, P[7]); } }
}

// TIMÓN · la popa desde cubierta: la caseta, la bitácora, la regala de popa con el mar y la estela, la botavara y,
// delante, la rueda
const B_RUEDA = [226, 112];

function b_timon(R, t, o, luz) {
  const horT = 78, L = b_pal(luz), P = L.mar, tn = b_tinte(luz), F = b_cieloFijo(R, luz, horT), B = R.buf, band = o.bandazo ?? 0.6;
  const rr = Math.sin(t * 0.83 + 0.6) * (0.025 + 0.03 * band), bob = Math.round(2.5 * Math.sin(t * 1.15)), off = (x) => Math.round((x - 200) * rr) + bob;
  // el cielo y el mar, que se inclinan y suben y bajan con el balanceo
  for (let x = 0; x < 320; x++) { const of = off(x); for (let y = 0; y < Math.min(180, horT + of + 2); y++) B[y * 320 + x] = F.b[Math.max(0, Math.min(horT + 1, y - of)) * 320 + x]; }
  b_nubes(R, t, horT, luz, F.b, { off: bob });
  const px = b_marPrep(t, horT, luz, { fuerza: 0.55, sol: L.sol ? L.sol[0] : null });
  // la estela: una calle de espuma revuelta que se aleja hacia el horizonte desde la popa
  const vx = 184, sx = 150, sy = 126, esp = P[6], br = P[7], verde = b_mezcla(P[2], hex('#9ad0c8'), 0.35);
  const pxE = (x, y) => { const c = px(x, y), v = (y - horT) / (sy - horT); if (v <= 0) return c; const cx = vx + (sx - vx) * v, w = 1 + v * 24, d = Math.abs(x - cx) / w; if (d > 1) return c;
    const ph = Math.log(v * 40 + 1) * 9 + t * 1.6, a = h(Math.floor(ph), Math.floor((x - cx) / (1 + v * 3)), 873); const b2 = h(Math.floor(ph * 0.5), Math.floor((x - cx) / (2 + v * 5)), 878); return a > 0.8 && b2 > 0.35 ? (a > 0.95 ? br : esp) : d < 0.85 ? b_mezcla(c, verde, 0.3 + b2 * 0.3) : d < 1 && b2 > 0.5 ? P[4] : c; };
  b_marPinta(R, pxE, horT, 132, off);
  b_gaviotas(R, t, 3, 30, horT - 8, tn, 4);
  // la regala de popa: por dentro crema con candeleros, la tapa de madera, el cabillero con cabillas y adujas
  const crema = tn(hex('#d8ccb0')), cremaS = tn(hex('#b2a688')), cremaD = tn(hex('#8a7e62')), tapa = tn(hex('#6e4e30')), tapaL = tn(hex('#9a7246')), tapaD = tn(hex('#3e2a1a'));
  const yR = (x) => Math.round(124 + ((x - 200) / 160) ** 2 * 2);
  for (let x = 0; x < 300; x++) { const y0 = yR(x); R.rect(x, y0, x, y0 + 2, tapa); R.pset(x, y0, tapaL); R.pset(x, y0 + 3, tapaD);
    for (let y = y0 + 4; y < 140; y++) R.pset(x, y, (y - y0) % 6 === 0 ? cremaS : y > 135 ? cremaS : crema); }
  for (let x = 8; x < 300; x += 22) { const y0 = yR(x) + 4; R.rect(x, y0, x + 3, 140, cremaS); R.rect(x, y0, x, 140, crema); R.rect(x + 3, y0, x + 3, 140, cremaD); }
  // los imbornales con el agua que chorrea
  for (const x of [130, 196, 262]) { R.rect(x, 136, x + 5, 139, tapaD); if (Math.sin(t * 2 + x) > -0.2) for (let i = 0; i < 3; i++) R.pset(x + 2 + i, 140 + ((t * 9 + i * 2) % 4), P[4]); }
  // la banda de estribor que viene hacia acá, a la derecha
  R.poligono([[300, yR(300) - 1], [320, 112], [320, 152], [300, 140]], (x, y) => ((y - 112) % 7 === 0 ? cremaS : x > 316 ? cremaD : crema));
  R.poligono([[298, yR(298) - 2], [320, 107], [320, 112], [298, yR(298) + 2]], tapa);
  // el cabillero con sus cabillas y las adujas colgadas
  R.rect(140, 130, 186, 132, tapa); R.rect(140, 130, 186, 130, tapaL);
  for (let x = 144; x < 186; x += 6) { R.rect(x, 127, x + 1, 135, tapaL); R.pset(x, 127, tapaD); }
  for (const [x, ll] of [[150, 9], [168, 7]]) { const cu = tn(hex('#b89a68')), cuS = tn(hex('#7a6040')); for (let j = 0; j < ll; j++) { const w = 2 + Math.sin(j / ll * Math.PI) * 2.5; R.rect(x - w, 133 + j, x + w, 133 + j, j % 2 ? cuS : cu); R.pset(x - w, 133 + j, cuS); } }
  // la escota de la botavara: dos motones y el cabo que baja a la barra de popa
  const bal = Math.sin(t * 0.83 + 0.6) * 4, bx1 = 304 + bal, by1 = 54;
  R.rect(270, yR(270) - 2, 296, yR(270) - 1, tn(hex('#3a3a40')));
  R.linea(bx1, by1, 284, yR(284) - 6, tn(hex('#8a7a5a'))); R.linea(bx1 - 2, by1, 282, yR(284) - 6, tn(hex('#6a5a40')));
  R.disco(283, yR(284) - 7, 2.2, tapaD); R.disco(283, yR(284) - 7, 1.2, tapaL);
  // la cubierta: tablas que se van hacia el horizonte, juntas calafateadas, cabezas de clavo y el agua que corre de
  // banda a banda con el balanceo
  const TB = [tn(C.tablaS), tn(C.tabla), tn(C.tablaL), tn(hex('#6a4e30'))], agua = P[4], vpx = 236, vpy = 64;
  for (let y = 140; y < 180; y++) { const prof = y - vpy, f = y * 320, lam = 150 + Math.sin(t * 0.83 + 0.6 - 0.8) * 120;
    for (let x = 0; x < 320; x++) { const xr = (x - vpx) / prof * 34, pl = Math.floor(xr), fr = xr - pl;
      let c = fr < 0.09 ? TB[3] : (pl & 1 ? TB[1] : h(pl, 0, 874) > 0.5 ? TB[2] : TB[1]);
      const tr = Math.floor(Math.log(prof) * 9 + pl * 0.37); if (h(pl, tr, 875) > 0.8 && Math.abs(Math.log(prof) * 9 + pl * 0.37 - tr) < 0.08) c = TB[3];
      if (h(pl, tr, 876) > 0.6 && Math.abs(fr - 0.5) < 0.06 && ((y + pl) % 9 === 0)) c = TB[0];
      const dA = Math.abs(x - lam) / 90; if (dA < 1 && h(x >> 2, y >> 1, Math.floor(t * 3)) > 0.55 + dA * 0.4) c = b_mezcla(c, agua, 0.45);
      B[f + x] = c; } }
  // la sombra de la regala sobre la cubierta
  for (let y = 140; y < 145; y++) for (let x = 96; x < 300; x++) if (b_umbral(x, y) < 0.6 - (y - 140) * 0.12) R.pset(x, y, b_mezcla(R.pget(x, y), tapaD, 0.4));
  // la caseta del camarote, a la izquierda: tablas barnizadas en perspectiva, la tapa del techo, dos ventanillas con
  // el mar reflejado y la cortina, el farol colgado que se mece
  const madera = tn(hex('#a8784a')), maderaL = tn(hex('#c89a66')), maderaS = tn(hex('#6a4428')), techo = tn(hex('#d6ccb4')), techoS = tn(hex('#a89e86'));
  const yTop = (x) => 104 + x * 0.06, yBot = (x) => 158 - x * 0.18;
  R.poligono([[0, yTop(0)], [104, yTop(104)], [104, yBot(104)], [0, yBot(0)]], (x, y) => { const sx2 = Math.floor(Math.log(140 - x) * 14), fr = Math.log(140 - x) * 14 - sx2;
    if (fr < 0.14) return maderaS; if (y > yBot(x) - 6) return y > yBot(x) - 2 ? maderaS : (y - yBot(x) + 6 < 1 ? maderaL : madera); if (fr > 0.82) return maderaL;
    return h(sx2, Math.floor(y / 9), 877) > 0.85 ? b_mezcla(madera, maderaS, 0.4) : madera; });
  R.poligono([[0, yTop(0) - 7], [112, yTop(104) - 3], [112, yTop(104) + 1], [0, yTop(0) + 3]], (x, y) => (y < yTop(Math.min(x, 104)) - 4 + x * 0.04 ? techo : techoS));
  for (let x = 0; x < 104; x++) for (let y = Math.round(yTop(x)) + 1; y < yTop(x) + 4; y++) if (b_umbral(x, y) < 0.5) R.pset(x, y, maderaS);
  const ventana = (x0, w) => { const y0 = Math.round(yTop(x0) + 9), hh = Math.round(w * 0.8), marco = tn(hex('#e8e0cc')), marcoS = tn(hex('#b8ae96'));
    R.rect(x0 - 2, y0 - 2, x0 + w + 1, y0 + hh + 1, marco); R.rect(x0 + w + 1, y0 - 2, x0 + w + 1, y0 + hh + 1, marcoS); R.rect(x0 - 2, y0 + hh + 1, x0 + w + 1, y0 + hh + 1, marcoS);
    for (let y = y0; y < y0 + hh; y++) for (let x = x0; x < x0 + w; x++) { const hz = y0 + hh * 0.45 + (x - x0) * rr * 1.2 - bob * 0.3; let c = y < hz ? b_mezcla(L.nubes[1], hex('#2a3644'), 0.35) : b_mezcla(P[2], hex('#1a2430'), 0.4);
      if ((x - x0 + (y - y0) * 0.6) % 11 < 1.5) c = b_mezcla(c, hex('#ffffff'), 0.35); if (x - x0 > w * 0.55) c = (x + y) % 3 ? tn(hex('#e2d4b0')) : tn(hex('#bca878')); R.pset(x, y, c); }
    R.rect(x0 + (w >> 1) - 3, y0, x0 + (w >> 1) - 3, y0 + hh - 1, marcoS); };
  ventana(18, 12); ventana(64, 9);
  { const ang = Math.sin(t * 0.83 + 0.2) * 0.25, ax = 98, ay = yTop(98) + 2, lx = ax + Math.sin(ang) * 6, ly = ay + Math.cos(ang) * 6, lat = tn(hex('#c8a040')), latS = tn(hex('#8a6a24'));
    R.rect(ax - 3, ay - 1, ax + 3, ay, maderaS); R.linea(ax, ay, lx, ly, tn(hex('#3a3a40')));
    R.rect(lx - 3, ly, lx + 3, ly + 1, latS); R.rect(lx - 2, ly + 2, lx + 2, ly + 7, tn(hex('#d8e4e8'))); R.rect(lx - 2, ly + 2, lx - 2, ly + 7, latS); R.rect(lx + 2, ly + 2, lx + 2, ly + 7, latS); R.rect(lx - 3, ly + 8, lx + 3, ly + 9, lat); }
  // la bitácora: la columna de madera, la cúpula de latón con su ventanilla y la rosa que oscila
  { const x = 140, base = 160, lat = tn(hex('#c8a040')), latL = tn(hex('#f0d070')), latS = tn(hex('#7a5a20'));
    R.rect(x - 6, base - 13, x + 6, base, madera); R.rect(x - 6, base - 13, x - 5, base, maderaL); R.rect(x + 5, base - 13, x + 6, base, maderaS); R.rect(x - 8, base - 1, x + 8, base + 1, maderaS);
    for (let y = base - 11; y < base; y += 4) R.rect(x - 6, y, x + 6, y, maderaS);
    R.disco(x, base - 19, 7.5, latS); R.disco(x, base - 19.5, 7, lat); R.disco(x - 2, base - 22, 3, latL); R.rect(x - 7, base - 15, x + 7, base - 13, latS);
    R.disco(x, base - 18, 3.4, tn(hex('#1a2028'))); const a = Math.sin(t * 1.3) * 0.5 + rr * 6; R.linea(x - Math.cos(a) * 2.6, base - 18 - Math.sin(a) * 1, x + Math.cos(a) * 2.6, base - 18 + Math.sin(a) * 1, tn(hex('#f0e8d0'))); R.pset(x + Math.round(Math.cos(a) * 2.6), base - 18 + Math.round(Math.sin(a)), tn(hex('#d84a3a')));
    R.disco(x - 9, base - 17, 2, latS); R.disco(x + 9, base - 17, 2, latS); R.pset(x - 9, base - 18, latL); R.pset(x + 9, base - 18, latL); }
  // una aduja y un balde en cubierta
  { const cu = tn(hex('#b89a68')), cuS = tn(hex('#7a6040')); for (let r = 9; r > 1; r -= 1.6) { R.anillo(72, 164, r, cuS); R.anillo(72, 163.5, r - 0.7, cu); } R.disco(72, 164, 1.4, cuS);
    // el balde de madera con sus aros, que se mece un poco
    const bx2 = 96 + Math.round(Math.sin(t * 0.83 + 0.6) * 1.5); R.poligono([[bx2 - 6, 156], [bx2 + 6, 156], [bx2 + 5, 168], [bx2 - 5, 168]], (x) => (x < bx2 - 3 ? maderaL : x > bx2 + 3 ? maderaS : madera)); R.rect(bx2 - 6, 155, bx2 + 6, 156, maderaS); R.rect(bx2 - 5, 157, bx2 + 5, 157, P[2]);
    for (const y of [159, 165]) R.rect(bx2 - 6, y, bx2 + 6, y, tn(hex('#3a3a40'))); R.linea(bx2 - 6, 155, bx2, 149, cuS); R.linea(bx2, 149, bx2 + 6, 155, cuS); }
  // la botavara con la cangreja aferrada, que se mece por encima
  { const x0 = 40, y0 = 42 + bal * 0.3, x1 = 320, y1 = 64 + bal, lo = [tn(hex('#a49878')), tn(C.lonaS), tn(C.lona), tn(hex('#fbf6ea'))], pal = [tn(hex('#5e4226')), tn(hex('#94703f')), tn(hex('#c09a62'))];
    for (let x = x0; x < x1; x++) { const u = (x - x0) / (x1 - x0), y = Math.round(y0 + (y1 - y0) * u); R.pset(x, y, pal[2]); R.pset(x, y + 1, pal[1]); R.pset(x, y + 2, pal[1]); R.pset(x, y + 3, pal[0]);
      const b = 4.5 + Math.sin(x * 0.07) * 1.6 + Math.sin(x * 0.19 + 1) * 1.1 + Math.sin(x * 0.53) * 0.4, pl = Math.sin(x * 0.19 + 1);
      for (let j = 1; j <= b; j++) { const v = j / b; R.pset(x, y - j, v > 0.86 ? lo[3] : v < 0.3 ? lo[0] : pl > 0.5 && v > 0.55 ? lo[3] : pl < -0.4 ? lo[1] : lo[2]); }
      if (x % 26 < 2) for (let j = -1; j <= b + 0.5; j++) R.pset(x, y - j, x % 26 ? tn(hex('#6a5a40')) : tn(hex('#3a3026'))); } }
  // el cabo suelto que cuelga de la botavara y se balancea
  { const ax = 120, ay = 49 + bal * 0.3, ang = Math.sin(t * 1.1) * 0.35 + rr * 3, n = 40, cu = tn(hex('#8a7a5a')), cuS = tn(hex('#5a4c36'));
    let px0 = ax, py0 = ay; for (let i = 1; i <= n; i++) { const u = i / n, a = ang * u * u, X = ax + Math.sin(a) * 50 * u + Math.sin(t * 3 + u * 4) * u * 1.5, Y = ay + Math.cos(a) * 50 * u; R.linea(px0, py0, X, Y, cu); R.pset(X + 1, Y, cuS); px0 = X; py0 = Y; }
    R.pset(px0 - 1, py0 + 1, cu); R.pset(px0 + 1, py0 + 2, cu); }
  // la rueda (la vuelve a pintar marDelante)
  b_rueda(R, t, o, tn);
  return { horizonte: horT + bob };
}

// la rueda del timón en primer plano (alta, cámara 'timon'): la caja de gobierno con sus paneles, el aro doble con
// sus ocho cabillas y puños, el cubo de latón; gira sola (o.giro, o a tirones con el oleaje)
function b_rueda(R, t, o, tn) {
  const [cx, cy] = B_RUEDA, a0 = o.giro ?? (Math.sin(t * 0.7) * 1.3 + Math.sin(t * 1.9 + 1) * 0.35 + Math.sin(t * 4.1) * 0.06);
  const madera = tn(hex('#8a5a32')), maderaL = tn(hex('#c08a52')), maderaS = tn(hex('#4e2e18')), maderaD = tn(hex('#2e1a0e')), lat = tn(hex('#c8a040')), latL = tn(hex('#f4dc84')), latS = tn(hex('#7a5a20'));
  // la caja de gobierno
  R.rect(cx - 30, cy + 14, cx + 30, 180, maderaS); R.rect(cx - 28, cy + 16, cx + 28, 180, madera); R.rect(cx - 30, cy + 12, cx + 30, cy + 15, maderaL); R.rect(cx - 30, cy + 15, cx + 30, cy + 15, maderaD);
  for (const px0 of [cx - 24, cx + 4]) { R.rect(px0, cy + 22, px0 + 20, 176, maderaS); R.rect(px0 + 1, cy + 23, px0 + 19, 175, madera); R.rect(px0 + 1, cy + 23, px0 + 19, cy + 23, maderaL); R.rect(px0 + 19, cy + 23, px0 + 19, 175, maderaD); }
  R.rect(cx - 3, cy, cx + 3, cy + 14, maderaS); R.rect(cx - 2, cy, cx - 1, cy + 14, madera);
  // las cabillas con sus puños torneados
  for (let i = 0; i < 8; i++) { const a = a0 + i * Math.PI / 4, ca = Math.cos(a), sa = Math.sin(a);
    for (let r = 5; r < 36; r += 0.5) { const X = cx + ca * r, Y = cy + sa * r; if (r > 27 && r < 29.5) continue; const w = r > 29 ? (r > 33 ? 1.2 : 1.7) : 1.1;
      R.disco(X, Y, w, r > 29 && r < 31 ? maderaS : madera); R.pset(X - sa * 0.6 - 0.5, Y + ca * 0.6 - 1, maderaL); }
    R.disco(cx + ca * 35, cy + sa * 35, 1.6, maderaL); }
  // el aro doble
  for (let k = 0; k < 360; k++) { const a = k / 360 * 6.283, ca = Math.cos(a), sa = Math.sin(a);
    for (let r = 25; r <= 29; r += 0.5) R.pset(cx + ca * r, cy + sa * r, r < 25.6 || r > 28.6 ? maderaD : sa < -0.3 && r < 27 ? maderaL : (r > 26.5 && r < 27.2 ? lat : madera)); }
  R.disco(cx, cy, 6, latS); R.disco(cx, cy, 5, lat); R.disco(cx - 1.5, cy - 1.5, 2, latL); R.disco(cx, cy, 1.2, latS);
  // la marca del timón a la vía (una cabilla con el puño forrado de latón)
  { const ca = Math.cos(a0 - Math.PI / 2), sa = Math.sin(a0 - Math.PI / 2); R.disco(cx + ca * 33, cy + sa * 33, 2, lat); R.pset(cx + ca * 33 - 1, cy + sa * 33 - 1, latL); }
}

// ENCUENTRO · desde la cubierta del Dei Gratia: la regala, el trinquete con su cofa y el vigía, los obenques, las
// banderas de señales y, lejos, el Mary Celeste
function b_encuentro(R, t, o, luz) {
  const hor = 92, L = b_pal(luz), P = L.mar, tn = b_tinte(luz), F = b_cieloFijo(R, luz, hor), B = R.buf;
  const bob = Math.round(2.5 * Math.sin(t * 0.8) + Math.sin(t * 1.7) * 0.8), off = () => bob;
  for (let y = 0; y < 180; y++) { const sy = Math.max(0, Math.min(hor + 1, y - bob)); B.set(F.b.subarray(sy * 320, sy * 320 + 320), y * 320); }
  b_nubes(R, t, hor, luz, F.b, { off: bob });
  const px = b_marPrep(t, hor, luz, { fuerza: 0.55, sol: L.sol ? L.sol[0] : null });
  b_marPinta(R, px, hor, 140, off);
  // lejos, el Mary Celeste dando bandazos (más claro que el mar para que se lea)
  const lx = 222 + Math.sin(t * 0.3) * 3, ly = hor + 3 + bob, lejos = (c) => b_mezcla(tn(c), b_mezcla(P[0], hex('#ffffff'), 0.2), 0.22);
  const Bq = b_bergantin(R, lx, ly, 0.24, t, { velas: 'pocas', flamea: 1, tn: lejos, cabeceo: Math.sin(t * 1.3) * 0.08, balanceo: Math.sin(t * 0.9 + 1) * 0.22, guinada: Math.sin(t * 0.5) * 0.3, k: 1 });
  for (let i = 0; i < 16; i++) { const p = Bq.P(-60 + i * 8, 0.5, 14); if (h(i, Math.floor(t * 5), 880) > 0.4) R.pset(p[0], p[1], P[6]); }
  b_gaviotas(R, t, 4, 30, hor - 6, tn, 7);
  // la regala por dentro: crema con candeleros, la tapa verde, el cabillero con cabillas y adujas colgadas
  const crema = tn(hex('#d8ccb0')), cremaS = tn(hex('#b2a688')), cremaD = tn(hex('#8a7e62')), verde = tn(C.verdeDG), verdeL = tn(hex('#4a7a5a')), verdeD = tn(hex('#16281c'));
  const yR = (x) => Math.round(138 + (x - 160) * 0.012);
  for (let x = 0; x < 320; x++) { const y0 = yR(x); R.rect(x, y0, x, y0 + 3, verde); R.pset(x, y0, verdeL); R.pset(x, y0 + 4, verdeD);
    for (let y = y0 + 5; y < 152; y++) R.pset(x, y, (y - y0) % 6 === 0 ? cremaS : y > 148 ? cremaS : crema); }
  for (let x = 38; x < 320; x += 30) { const y0 = yR(x) + 5; R.rect(x, y0, x + 3, 152, cremaS); R.rect(x, y0, x, 152, crema); R.rect(x + 3, y0, x + 3, 152, cremaD); }
  for (const x of [70, 160, 250]) { R.rect(x, 148, x + 6, 151, verdeD); if (Math.sin(t * 1.6 + x) > 0) for (let i = 0; i < 3; i++) R.pset(x + 2 + i, 152 + ((t * 9 + i * 2) % 3), P[4]); }
  const tapa = tn(hex('#6e4e30')), tapaL = tn(hex('#9a7246')), tapaD = tn(hex('#3e2a1a'));
  R.rect(178, 144, 262, 145, tapa); R.rect(178, 144, 262, 144, tapaL);
  for (let x = 182; x < 262; x += 7) { R.rect(x, 141, x + 1, 148, tapaL); R.pset(x, 141, tapaD); R.pset(x + 1, 148, tapaD); }
  for (const [x, ll] of [[189, 7], [210, 6], [245, 8]]) { const cu = tn(hex('#b89a68')), cuS = tn(hex('#7a6040')); for (let j = 0; j < ll; j++) { const w = 2 + Math.sin(j / ll * Math.PI) * 2.5; R.rect(x - w, 146 + j, x + w, 146 + j, j % 2 ? cuS : cu); R.pset(x - w, 146 + j, cuS); } }
  // la cubierta de tablas que se van hacia atrás
  const TB = [tn(C.tablaS), tn(C.tabla), tn(C.tablaL), tn(hex('#6a4e30'))], vpx = 170, vpy = 70;
  for (let y = 152; y < 180; y++) { const prof = y - vpy, f = y * 320; for (let x = 0; x < 320; x++) { const xr = (x - vpx) / prof * 30, pl = Math.floor(xr), fr = xr - pl;
      let c = fr < 0.08 ? TB[3] : (pl & 1 ? TB[1] : h(pl, 0, 874) > 0.5 ? TB[2] : TB[1]); const tr = Math.floor(Math.log(prof) * 10 + pl * 0.37);
      if (h(pl, tr, 875) > 0.8 && Math.abs(Math.log(prof) * 10 + pl * 0.37 - tr) < 0.09) c = TB[3]; if ((y + pl * 3) % 11 === 0 && Math.abs(fr - 0.5) < 0.08) c = TB[0]; B[f + x] = c; } }
  for (let y = 152; y < 157; y++) for (let x = 0; x < 320; x++) if (b_umbral(x, y) < 0.6 - (y - 152) * 0.12) R.pset(x, y, b_mezcla(R.pget(x, y), tapaD, 0.4));
  // el trinquete a la izquierda: el palo con sus zunchos, la cofa con el vigía y su catalejo, el cabillero del pie
  const palo = [tn(hex('#5e4226')), tn(hex('#94703f')), tn(hex('#c09a62'))], jar = tn(hex('#2a2420')), jarL = tn(hex('#5a4e40'));
  const cofaY = 34, mx = 18;
  // los obenques que bajan de la cofa a la regala, con sus flechastes, y las vigotas
  const pies = [48, 66, 84, 102];
  for (const px0 of pies) { R.linea(mx + 4, cofaY + 2, px0, yR(px0) - 2, jar); R.linea(mx + 5, cofaY + 2, px0 + 1, yR(px0) - 2, jarL); R.disco(px0, yR(px0) - 3, 2, tapaD); R.pset(px0, yR(px0) - 4, tapaL); }
  for (let j = 1; j < 16; j++) { const u = j / 16.5, ya = cofaY + 2 + (yR(48) - 2 - cofaY - 2) * u; R.linea(mx + 4 + (48 - mx - 4) * u, ya, mx + 4 + (102 - mx - 4) * u, cofaY + 2 + (yR(102) - 2 - cofaY - 2) * u, jarL); }
  R.rect(mx - 6, 0, mx + 6, 160, palo[1]); R.rect(mx - 6, 0, mx - 4, 160, palo[2]); R.rect(mx + 4, 0, mx + 6, 160, palo[0]);
  for (const y of [60, 84, 108]) { R.rect(mx - 7, y, mx + 7, y + 2, tn(hex('#3a3a40'))); R.rect(mx - 7, y, mx + 7, y, tn(hex('#7a7a84'))); }
  // la cofa: la plataforma de tablas con su barandilla
  R.rect(0, cofaY, 46, cofaY + 3, tapa); R.rect(0, cofaY, 46, cofaY, tapaL); R.rect(0, cofaY + 4, 46, cofaY + 4, tapaD);
  R.rect(0, cofaY - 9, 44, cofaY - 8, tapa); for (let x = 2; x < 46; x += 7) R.rect(x, cofaY - 8, x, cofaY - 1, tapaD);
  // el vigía, pequeño, que mira con su catalejo hacia el Mary Celeste
  { const vx = 34, vy = cofaY - 1, bal2 = Math.round(Math.sin(t * 0.8) * 0.6), ropa = tn(hex('#2e3a5a')), piel = tn(hex('#e0b48a')), gorro = tn(hex('#2a2a30'));
    R.rect(vx - 2, vy - 9, vx + 2, vy - 1, ropa); R.rect(vx - 2, vy - 13 + bal2, vx + 2, vy - 10 + bal2, piel); R.rect(vx - 2, vy - 14 + bal2, vx + 2, vy - 13 + bal2, gorro);
    R.rect(vx + 2, vy - 12 + bal2, vx + 9, vy - 11 + bal2, tn(hex('#c8a040'))); R.rect(vx + 8, vy - 12 + bal2, vx + 9, vy - 11 + bal2, tn(hex('#7a5a20'))); R.rect(vx + 1, vy - 8, vx + 4, vy - 7, ropa); }
  // las banderas de señales que suben por su driza (desde la regala hasta la cofa)
  { const b0 = [124, yR(124) - 2], b1 = [44, cofaY - 4], f = Math.max(0, Math.min(1, o.banderas ?? 0.6)), cs = [['#e8c020', '#e8c020'], ['#2a4ab0', '#f2f2ee'], ['#d03a2a', '#f2f2ee'], ['#2a4ab0', '#e8c020']].map(([a, b]) => [tn(hex(a)), tn(hex(b))]);
    R.linea(b0[0], b0[1], b1[0], b1[1], jarL);
    for (let i = 0; i < 4; i++) { const u = Math.max(0, f - i * 0.1) * 0.9, X = b0[0] + (b1[0] - b0[0]) * u, Y = b0[1] + (b1[1] - b0[1]) * u + i * 2; if (f - i * 0.1 <= 0) continue;
      for (let a = 0; a < 9; a++) for (let b = 0; b < 6; b++) { const on = Math.sin(t * 7 - a * 0.6 + i) * (0.4 + a * 0.15); if (i === 3 && b > 5 - a * 0.6) continue;
        const c = i === 1 ? (((a >> 1) + (b >> 1)) % 2 ? cs[1][0] : cs[1][1]) : i === 2 ? (a < 4 ? cs[2][0] : cs[2][1]) : i === 3 ? (b < 3 ? cs[3][0] : cs[3][1]) : cs[0][0];
        R.pset(X + a, Y + b + on, Math.cos(t * 7 - a * 0.6 + i) < -0.5 ? b_mezcla(c, hex('#000000'), 0.25) : c); } } }
  // el cabillero del pie del palo con sus cabillas
  R.rect(0, 150, 40, 153, tapa); R.rect(0, 150, 40, 150, tapaL); for (let x = 3; x < 40; x += 6) { R.rect(x, 145, x + 1, 155, tapaL); R.pset(x, 145, tapaD); }
  return { lejos: [Math.round(lx), Math.round(ly - 8)], regala: yR(160), cofa: [mx, cofaY], horizonte: hor + bob };
}

// lo de delante en el encuentro: una aduja en la esquina de abajo a la izquierda y un balde de madera a la derecha
function b_encuentroDelante(R, t, tn) {
  const cu = tn(hex('#b89a68')), cuS = tn(hex('#7a6040'));
  for (let r = 14; r > 1; r -= 1.7) { for (let a = 0; a < 6.283; a += 0.04) { R.pset(22 + Math.cos(a) * r, 174 + Math.sin(a) * r * 0.45, cuS); R.pset(22 + Math.cos(a) * (r - 0.8), 173.5 + Math.sin(a) * (r - 0.8) * 0.45, cu); } }
  const m = tn(hex('#8a5a32')), mL = tn(hex('#c08a52')), mS = tn(hex('#4e2e18')), aro = tn(hex('#3a3a40'));
  R.poligono([[260, 160], [282, 160], [280, 178], [262, 178]], (x) => (x < 264 ? mL : x > 278 ? mS : (x % 4 === 0 ? mS : m)));
  R.rect(260, 158, 282, 160, mS); R.rect(262, 161, 281, 161, tn(hex('#4a6e8a'))); for (const y of [164, 174]) R.rect(260, y, 282, y + 1, aro);
  R.linea(261, 158, 271, 150 + Math.sin(t) * 0.5, cuS); R.linea(271, 150 + Math.sin(t) * 0.5, 281, 158, cuS);
}

// CATALEJO · lo que se ve por el catalejo: el Mary Celeste de cerca y desde arriba, que se mece en el círculo
const B_CIRCULO = [160, 92, 70];

function b_catalejo(R, t, o, luz) {
  const [cx, cy, r] = B_CIRCULO, pu = o.pulso ?? 1, L = b_pal(luz), tn = b_tinte(luz), hor = 64, B = R.buf;
  const ox = Math.round(Math.sin(t * 0.9) * 5 * pu), oy = Math.round(Math.sin(t * 1.3 + 1) * 3 * pu + Math.sin(t * 0.5) * 2 * pu), F = b_cieloFijo(R, luz, hor);
  for (let y = 0; y < 180; y++) { const sy = Math.max(0, Math.min(hor + 1, y - oy)); B.set(F.b.subarray(sy * 320, sy * 320 + 320), y * 320); }
  b_nubes(R, t, hor, luz, F.b, { off: oy });
  const px = b_marPrep(t, hor, luz, { fuerza: 0.6, sol: L.sol ? L.sol[0] : null });
  b_marPinta(R, (x, y) => px(x - ox, y), hor, 180, () => oy);
  const hS = (xx, tt) => 1.6 * Math.sin(xx * 0.035 - tt * 1.2) + 1 * Math.sin(xx * 0.08 + tt * 0.9 + 1), bx = 160 + ox, m = b_bandazos(t, bx, 0.9, hS);
  const Bq = b_bergantin(R, bx, 128 + oy + m.dy, 0.92, t, { E: 0.78, velas: 'pocas', flamea: 1, tn, cabeceo: m.cab * 0.8, balanceo: m.bal * 0.7, guinada: m.gui * 0.5, rueda: Math.sin(t * 1.1) * 2.2, estado: 'hallazgo', k: 2 });
  b_flotacion(R, t, Bq, 0.92, 1, (x, y) => px(x - ox, y - oy), m.rocio, L.mar);
  if (L.niebla) b_niebla(R, t, hor + oy, 0.6, L.niebla);
  // el tubo (fijo, en un búfer): el aro de latón, la copa moleteada del ocular y, fuera, la penumbra con tono; dentro
  // de la lente, la viñeta. Una sola pasada: fuera se copia el tubo, en el borde de la lente se oscurece
  const TB = b_tuboCatalejo(R, cx, cy, r), osc = hex('#000000');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, d = TB.d[i];
    if (d > r) B[i] = TB.b[i];
    else if (d > r - 16) { const a = ((d - r + 16) / 16) ** 2 * 0.85; if (b_umbral(x, y) < a) B[i] = b_mezcla(B[i], osc, 0.55 + a * 0.3); } }
  b_brillosCatalejo(R, t, cx, cy, r, ox, oy);
  for (let k = 0; k < 18; k++) { const a = -2.4 + k * 0.035 + ox * 0.01, rr = r - 7; R.pset(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, b_mezcla(R.pget(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr), hex('#ffffff'), 0.45)); }
  return { circulo: [cx, cy, r], barco: Bq.centro.map(Math.round), horizonte: hor + oy };
}
// las cifras pequeñas de 3 × 5 (números de la carta: grados, sondas, días)
const B_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function b_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = B_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// la proyección de la carta del Atlántico (lon, lat → x, y) y sus lugares
const b_proy = (lon, lat) => [18 + (lon + 80) * 3, 26 + (56 - lat) * 4.25];

const B_LUGARES = { nuevaYork: [-74, 40.7], santaMaria: [-25.1, 36.97], encuentro: [-17.25, 38.33], gibraltar: [-5.35, 36.14], genova: [8.93, 44.4], lisboa: [-9.14, 38.7] };

const B_AZORES = [[-25.1, 36.97, 1.2], [-25.5, 37.78, 2.2], [-27.2, 38.7, 1.4], [-28.0, 38.62, 1.6], [-28.4, 38.47, 1.4], [-28.7, 38.58, 1], [-28.0, 39.05, 0.8], [-31.2, 39.45, 1], [-31.1, 39.7, 0.6]];

const B_ISLITAS = [[-16.95, 32.75, 1.6], [-15.5, 28.1, 1.4], [-16.6, 28.3, 1.4], [-13.8, 28.6, 1.2], [-17.9, 28.6, 0.9], [-64.75, 32.3, 0.8]];

const B_RUTA_MC = [[-74, 40.6], [-71, 40], [-65, 39.4], [-55, 38.6], [-45, 38.0], [-36, 37.6], [-29, 37.2], [-25.6, 37.05]];

const B_RUTA_DG = [[-74, 40.6], [-70, 40.9], [-62, 41.3], [-50, 41.0], [-38, 40.0], [-27, 38.9], [-17.25, 38.33], [-11, 37.2], [-7.5, 36.3], [-5.35, 36.14]];

const B_DERIVA = [[-25.1, 37.08], [-24.2, 37.2], [-23.3, 37.25], [-22.3, 37.45], [-21.4, 37.6], [-20.5, 37.75], [-19.6, 37.95], [-18.8, 38.1], [-18, 38.25], [-17.25, 38.33]];

// la mesa de cartas y la carta, fijas (en un búfer): la madera con vetas, la carta con sus costas, tierras, cuadrícula,
// rosa, escala, barquito, pliegues, manchas y la esquina doblada, la regla paralela y el compás de puntas
function b_cartaFija(R) {
  return b_capa(R, 'carta', () => {
    const B = R.buf, X0 = 12, Y0 = 20, X1 = 308, Y1 = 166;
    // la mesa
    const m = [hex('#4a2c18'), hex('#5e3a20'), hex('#74482a'), hex('#8a5a34')];
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.55 + Math.sin(x * 0.018 + y * 0.07) * 3 + h(y >> 3, 0, 890) * 4), n = h(x >> 3, y, 891);
      let c = v > 0.75 ? m[2] : v < -0.7 ? m[0] : m[1]; if (n > 0.93) c = m[3]; if ((x + Math.floor(h(y >> 4, 1, 892) * 300)) % 97 === 0) c = m[0]; if (b_quieta(x, y)) c = v > 0.3 ? m[1] : b_mezcla(m[1], m[0], 0.4); B[y * 320 + x] = c; }
    // la sombra de la carta
    for (let y = Y0 + 3; y <= Y1 + 4; y++) for (let x = X0 + 3; x <= X1 + 4; x++) if (b_umbral(x, y) < 0.7) B[y * 320 + x] = b_mezcla(B[y * 320 + x], hex('#1a0c06'), 0.55);
    // la tierra y el mar (máscara): todo tierra, el mar encima, las islas
    const T = R.nuevo(), prev = R.usar(T); T.fill(1);
    const pp = (pts) => pts.map(([a, b]) => b_proy(a, b));
    for (const k of ['atlanticoN', 'atlantico', 'med']) R.poligono(pp(B_COSTAS[k]), 0);
    for (const k of ['britania', 'irlanda', 'sicilia', 'cerdena', 'corcega', 'terranova']) R.poligono(pp(B_COSTAS[k]), 1);
    for (const [lon, lat, r] of [...B_AZORES, ...B_ISLITAS]) { const [x, y] = b_proy(lon, lat); R.rect(Math.round(x - r * 0.6), Math.round(y - r * 0.3), Math.round(x + r * 0.6), Math.round(y + r * 0.2), 1); }
    R.usar(prev);
    const dist = new Uint8Array(57600); for (let i = 0; i < 57600; i++) dist[i] = T[i] ? 0 : 99;
    for (let it = 1; it <= 7; it++) for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const i = y * 320 + x; if (dist[i] !== 99) continue; const q = it - 1; if (dist[i - 1] === q || dist[i + 1] === q || dist[i - 320] === q || dist[i + 320] === q || (it % 2 === 0 && (dist[i - 321] === q || dist[i - 319] === q || dist[i + 319] === q || dist[i + 321] === q))) dist[i] = it; }
    for (let it = 1; it <= 3; it++) for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const i = y * 320 + x; if (dist[i] !== 0 || T[i] !== 1) continue; if (dist[i - 1] === 1 || dist[i + 1] === 1 || dist[i - 320] === 1 || dist[i + 320] === 1) T[i] = 2; }
    // el papel: grano, bordes tostados y algo rotos
    const pap = [hex('#e2cf9e'), hex('#ead9ae'), hex('#f2e4bc'), hex('#d0b47e')], tierra = [hex('#cfae6e'), hex('#d8bc80'), hex('#c49a5a'), hex('#b8b070')], tinta = hex('#3e2e20'), agua = hex('#8fa69a'), cuad = hex('#c4a87c');
    for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const i = y * 320 + x, bd = Math.min(x - X0, X1 - x, y - Y0, Y1 - y);
      if (bd < 2 && h(x, y, 893) > 0.6 + bd * 0.2) continue;
      const n = h(x >> 1, y >> 1, 894); let c = n > 0.8 ? pap[2] : n < 0.15 ? pap[0] : pap[1];
      if (T[i]) { const n2 = h(x, y, 895); c = T[i] === 2 ? tierra[2] : n2 > 0.86 ? tierra[0] : (x < 120 && n2 < 0.2) ? tierra[3] : tierra[1]; }
      else if (dist[i] === 1) c = tinta; else if ((dist[i] === 3 || dist[i] === 6) && (x + y) % 2 === 0) c = agua;
      if (bd < 7 && b_umbral(x, y) < (7 - bd) / 9) c = b_mezcla(c, pap[3], 0.6);
      B[i] = c; }
    // los montes en las tierras (pequeñas uves sombreadas) y los bosques
    for (let k = 0; k < 220; k++) { const x = X0 + 4 + Math.round(h(k, 1, 896) * (X1 - X0 - 8)), y = Y0 + 4 + Math.round(h(k, 2, 896) * (Y1 - Y0 - 8)), i = y * 320 + x;
      if (T[i] !== 1 || T[i + 2] !== 1 || T[i - 2] !== 1 || b_quieta(x, y)) continue;
      if (k % 3) { R.pset(x, y, tierra[2]); R.pset(x - 1, y + 1, tierra[2]); R.pset(x + 1, y + 1, hex('#8a6a3a')); R.pset(x + 2, y + 2, hex('#8a6a3a')); R.pset(x - 2, y + 2, tierra[2]); }
      else { R.pset(x, y, hex('#7a8a4a')); R.pset(x + 1, y, hex('#5a6a3a')); } }
    // la cuadrícula de grados y sus números (solo cifras)
    for (let lon = -70; lon <= 10; lon += 10) { const [x] = b_proy(lon, 0); for (let y = Y0 + 3; y < Y1 - 2; y += 2) if (!T[y * 320 + Math.round(x)] && !b_quieta(Math.round(x), y)) R.pset(x, y, cuad); b_cifras(R, Math.abs(lon), Math.round(x) - 3, Y1 - 8, hex('#7a5e3c')); }
    for (let lat = 30; lat <= 50; lat += 10) { const [, y] = b_proy(0, lat); for (let x = X0 + 3; x < X1 - 2; x += 2) if (!T[Math.round(y) * 320 + x] && !b_quieta(x, Math.round(y))) R.pset(x, y, cuad); b_cifras(R, lat, X0 + 3, Math.round(y) - 6, hex('#7a5e3c')); }
    // la rosa de los vientos y sus rumbos por el mar (sin letras)
    const [rx, ry] = b_proy(-56, 29.5), rumbo = hex('#b89870');
    for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283; for (let d = 18; d < 400; d += 1.5) { const x = Math.round(rx + Math.cos(a) * d), y = Math.round(ry + Math.sin(a) * d); if (x < X0 + 3 || x > X1 - 3 || y < Y0 + 3 || y > Y1 - 3) break; if (!T[y * 320 + x] && dist[y * 320 + x] > 1 && !b_quieta(x, y) && (d | 0) % 3 === 0) R.pset(x, y, rumbo); } }
    for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283 - Math.PI / 2, Lr = k % 4 === 0 ? 16 : k % 2 === 0 ? 10 : 7, a2 = a + 0.2, a3 = a - 0.2;
      const tip = [rx + Math.cos(a) * Lr, ry + Math.sin(a) * Lr], l1 = [rx + Math.cos(a2) * 3, ry + Math.sin(a2) * 3], l2 = [rx + Math.cos(a3) * 3, ry + Math.sin(a3) * 3];
      R.poligono([[rx, ry], l1, tip], k % 4 === 0 ? tinta : hex('#a8803c')); R.poligono([[rx, ry], tip, l2], k === 0 ? hex('#b03a2a') : k % 4 === 0 ? hex('#efe2bc') : hex('#d8b870')); }
    R.anillo(rx + 0.5, ry + 0.5, 6, tinta); R.anillo(rx + 0.5, ry + 0.5, 19, hex('#7a5e3c')); R.disco(rx, ry, 1.5, hex('#b03a2a'));
    R.poligono([[rx - 2, ry - 21], [rx, ry - 25], [rx + 2, ry - 21]], hex('#b03a2a'));
    // la escala (cifras) y un barquito dibujado en medio del océano
    for (let k = 0; k < 6; k++) R.rect(30 + k * 10, 148, 39 + k * 10, 149, k % 2 ? hex('#f2e4bc') : tinta); R.rect(30, 147, 89, 147, tinta); R.rect(30, 150, 89, 150, tinta);
    b_cifras(R, 0, 29, 152, tinta); b_cifras(R, 300, 54, 152, tinta); b_cifras(R, 600, 80, 152, tinta);
    { const [bx, by] = b_proy(-44, 47); R.linea(bx - 6, by, bx + 6, by, tinta); R.linea(bx - 5, by + 1, bx + 5, by + 1, tinta); R.linea(bx, by - 9, bx, by, tinta); R.poligono([[bx + 1, by - 8], [bx + 6, by - 3], [bx + 1, by - 2]], hex('#efe2bc')); R.linea(bx + 1, by - 8, bx + 6, by - 3, tinta); R.poligono([[bx - 1, by - 7], [bx - 5, by - 2], [bx - 1, by - 2]], hex('#efe2bc')); R.linea(bx - 1, by - 7, bx - 5, by - 2, tinta);
      for (let i = -9; i <= 9; i += 3) R.pset(bx + i, by + 3, agua); }
    // las ciudades del viaje: un punto de tinta con su aro
    for (const k of ['nuevaYork', 'gibraltar', 'genova', 'lisboa']) { const [x, y] = b_proy(...B_LUGARES[k]); R.disco(x, y, 1.6, tinta); R.anillo(x + 0.5, y + 0.5, 3.2, tinta); }
    // los pliegues en cruz, las manchas de agua y las motas del papel
    for (let y = Y0; y <= Y1; y++) { R.pset(160, y, b_mezcla(R.pget(160, y), hex('#fff6dc'), 0.4)); R.pset(161, y, b_mezcla(R.pget(161, y), hex('#8a6a40'), 0.3)); }
    for (let x = X0; x <= X1; x++) { R.pset(x, 93, b_mezcla(R.pget(x, 93), hex('#fff6dc'), 0.4)); R.pset(x, 94, b_mezcla(R.pget(x, 94), hex('#8a6a40'), 0.3)); }
    for (const [sx, sy, sr] of [[70, 60, 11], [258, 146, 8], [196, 150, 6]]) for (let y = sy - sr - 2; y <= sy + sr + 2; y++) for (let x = sx - sr - 2; x <= sx + sr + 2; x++) { const a = Math.atan2(y - sy, x - sx), d = Math.hypot(x - sx, y - sy) - (sr + Math.sin(a * 5) * 0.8);
      if (d < -1.2) { if (b_umbral(x, y) < 0.3) R.pset(x, y, b_mezcla(R.pget(x, y), hex('#b08a58'), 0.15)); } else if (d < 0.6 && h(x, y, 899) > 0.25) R.pset(x, y, b_mezcla(R.pget(x, y), hex('#a07848'), 0.3)); }
    for (let k = 0; k < 70; k++) { const x = X0 + h(k, 1, 897) * (X1 - X0), y = Y0 + h(k, 2, 897) * (Y1 - Y0); if (!b_quieta(x, y)) R.pset(x, y, b_mezcla(R.pget(x, y), hex('#a07848'), 0.4)); }
    // la esquina de abajo a la izquierda, doblada (se ve el revés del papel y su sombra)
    for (let y = Y1 - 16; y <= Y1; y++) for (let x = X0; x <= X0 + 16; x++) { const u = (x - X0) + (Y1 - y); if (u < 16) B[y * 320 + x] = m[1]; else if (u < 17) B[y * 320 + x] = hex('#3a2010'); }
    R.poligono([[X0 + 16, Y1 + 0.5], [X0 + 0.5, Y1 - 16], [X0 + 13, Y1 - 13]], hex('#c8b080')); R.linea(X0 + 16, Y1, X0 + 13, Y1 - 13, hex('#a08860')); R.linea(X0, Y1 - 16, X0 + 13, Y1 - 13, hex('#a08860'));
    // las chinchetas de latón en las esquinas
    for (const [x, y] of [[X1 - 5, Y0 + 5], [X1 - 5, Y1 - 5], [X0 + 5, Y0 + 5]]) { if (b_quieta(x, y)) continue; R.disco(x, y, 2.2, hex('#6a4a18')); R.disco(x - 0.4, y - 0.4, 1.6, hex('#c8a040')); R.pset(x - 1, y - 1, hex('#f4dc84')); }
    // la regla paralela (dos reglas de ébano unidas por pletinas de latón) y el compás de puntas, tumbados en la carta
    const regla = (ax, ay, bx, by) => { for (let k = -1; k <= 1; k++) R.linea(ax, ay + k, bx, by + k, k === -1 ? hex('#5a5450') : k === 1 ? hex('#0a0808') : hex('#262220')); for (let x = ax + 4; x < bx; x += 5) R.pset(x, ay + (by - ay) * (x - ax) / (bx - ax), hex('#8a8480')); };
    regla(222, 156, 292, 146); regla(226, 163, 296, 153);
    for (const u of [0.18, 0.82]) { const x0 = 222 + 70 * u, y0 = 156 - 10 * u; R.linea(x0, y0, x0 + 4, y0 + 8, hex('#c8a040')); R.linea(x0 + 1, y0, x0 + 5, y0 + 8, hex('#7a5a20')); R.pset(x0, y0, hex('#f4dc84')); R.pset(x0 + 4, y0 + 8, hex('#f4dc84')); }
    for (let k = -1; k <= 1; k++) { R.linea(62 + k, 44, 48, 72, hex(k ? '#6a6e78' : '#c8ccd6')); R.linea(64 + k, 44, 80, 70, hex(k ? '#6a6e78' : '#c8ccd6')); }
    R.linea(50, 74, 66, 48, b_mezcla(R.pget(56, 62), hex('#2a1a0a'), 0.3)); R.linea(82, 72, 68, 48, b_mezcla(R.pget(75, 60), hex('#2a1a0a'), 0.3));
    R.disco(63, 43, 3, hex('#7a5a20')); R.disco(63, 42.5, 2.2, hex('#c8a040')); R.pset(62, 42, hex('#f4dc84'));
    // la esquina de Atom, una sola superficie tranquila (papel o madera lisos, sin tinta)
    for (let y = 0; y < 50; y++) for (let x = 266; x < 320; x++) { const q = b_quietud(x, y); if (q <= 0) continue; const i = y * 320 + x, dentro = x >= X0 && x <= X1 + 4 && y >= Y0 - 1;
      B[i] = b_mezcla(B[i], dentro && x <= X1 && y >= Y0 ? pap[1] : m[1], 0.9 * q); }
    // la costa para las olas que se mueven: el papel liso junto a la tinta (la espuma) y las dos franjas de agua que
    // van de la costa al mar abierto (dist 4 y 5)
    const lisos = new Set(pap.slice(0, 3)), costa = [[], [], []];
    for (let y = Y0 + 3; y <= Y1 - 3; y++) for (let x = X0 + 3; x <= X1 - 3; x++) { const i = y * 320 + x, d = dist[i]; if (T[i] || b_quieta(x, y) || !lisos.has(B[i])) continue;
      if (d === 2) costa[0].push(i); else if (d === 4) costa[1].push(i); else if (d === 5) costa[2].push(i); }
    return { costa };
  });
}
// un camino de puntos por la carta (pts en lon, lat): avanza hasta la fracción f; paso: cada cuántos px un punto;
// devuelve la punta [x, y, ángulo]
function b_ruta(R, pts, f, c, paso = 3, raya = 0) {
  const P = pts.map(([a, b]) => b_proy(a, b)); let L = 0; const seg = []; for (let i = 1; i < P.length; i++) { const l = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(l); L += l; }
  const hasta = L * Math.max(0, Math.min(1, f)); let acc = 0, punta = [...P[0], 0];
  for (let i = 1; i < P.length && acc < hasta; i++) { const [ax, ay] = P[i - 1], [bx, by] = P[i], l = seg[i - 1], a = Math.atan2(by - ay, bx - ax);
    for (let d = 0; d < l && acc + d <= hasta; d += 1) { const g = acc + d, X = ax + (bx - ax) * d / l, Y = ay + (by - ay) * d / l; if (raya ? (g % (raya * 2)) < raya : Math.round(g) % paso < 2) { R.pset(X, Y, c); R.pset(X, Y + 1, c); } punta = [X, Y, a]; }
    acc += l; }
  return punta;
}

// el barquito de la punta de una ruta (casco del color dado, vela blanca), que se mece
function b_barquito(R, x, y, t, casco, k = 0) {
  const yy = Math.round(y + Math.sin(t * 2 + k) * 0.6) - 1, xx = Math.round(x);
  R.rect(xx - 3, yy, xx + 3, yy, casco); R.rect(xx - 2, yy + 1, xx + 2, yy + 1, casco); R.linea(xx, yy - 5, xx, yy - 1, hex('#3e2e20'));
  R.poligono([[xx + 1, yy - 5], [xx + 4, yy - 1], [xx + 1, yy - 1]], hex('#fbf6ea')); R.poligono([[xx - 1, yy - 4], [xx - 3, yy - 1], [xx - 1, yy - 1]], hex('#efe6d0'));
}

// MAPA · la carta del viaje sobre la mesa, con las rutas, la deriva y la lámpara de aceite
function b_mapa(R, t, o, luz) {
  const F = b_cartaFija(R), B = R.buf; R.copiar(F.b);
  // las olas en la costa: una franja de agua que sale de la costa hacia el mar y vuelve, y la espuma que brilla a ratos
  b_olasCosta(R, t, F.costa, hex('#8fa69a'), hex('#fbf3d8'));
  // las olitas de tinta del mar abierto (alrededor de la rosa, al norte y al sur), que rompen y corren
  b_olitas(R, t, B_OLITAS_MAPA, hex('#6f8a80'));
  // la ballena dibujada en el Atlántico Norte, que asoma y sopla
  b_ballenaTinta(R, t, 176, 52, hex('#3e2e20'), hex('#8fa69a'));
  // la luz de la lumbrera del camarote sobre la carta, que se mece; las nubes la apagan al pasar y las gaviotas cruzan
  b_lumbrera(R, t, 74, 30, 96, 44);
  // la luz de la lámpara, que se mece con el barco y tiembla
  const lx = 300 + Math.sin(t * 0.8) * 3, ly = 136, fl = 0.85 + Math.sin(t * 11) * 0.05 + Math.sin(t * 17.3) * 0.04, calida = hex('#ffcc70');
  for (let y = 60; y < 180; y++) for (let x = 190; x < 320; x++) { const d = Math.hypot(x - lx, (y - ly) * 1.2); if (d > 120) continue; const a = (1 - d / 120) ** 2 * 0.42 * fl; if (b_umbral(x, y) < a * 1.4) B[y * 320 + x] = b_mezcla(B[y * 320 + x], calida, a); }
  const azul = hex('#22407a'), rojo = hex('#b0302a'), tinta = hex('#3e2e20');
  // la ruta del Dei Gratia (roja), ocho días detrás, y la del Mary Celeste (azul)
  if ((o.ruta2 ?? 0) > 0) { const p = b_ruta(R, B_RUTA_DG, o.ruta2, rojo, 5); if (!o.dg) b_barquito(R, p[0], p[1], t, hex('#2a5a3a'), 2); }
  // los barquitos colocados a mano (sin la tira): o.mc / o.dg = [lon, lat], o.paso 0–1 por la deriva
  const mcEn = o.mc ? b_proy(...o.mc) : o.paso != null ? b_enRuta(B_DERIVA, o.paso) : null, dgEn = o.dg ? b_proy(...o.dg) : null;
  if (dgEn) b_barquito(R, dgEn[0], dgEn[1], t, hex('#2a5a3a'), 2);
  if (mcEn) b_barquito(R, mcEn[0], mcEn[1], t, hex('#1c1a20'), 3);
  const fr = o.ruta ?? 0; if (fr > 0) { const p = b_ruta(R, B_RUTA_MC, fr, azul, 4); if (!mcEn && (fr < 1 || !(o.deriva > 0))) b_barquito(R, p[0], p[1], t, hex('#1c1a20')); }
  // la deriva: nueve días sin nadie, a trazos, con sus nueve marcas numeradas y el círculo del encuentro
  const dv = o.deriva ?? 0;
  if (dv > 0) { const p = b_ruta(R, B_DERIVA, dv, tinta, 0, 2);
    for (let k = 1; k <= 9; k++) { if (dv < k / 9 - 0.001) break; const [x, y] = b_proy(...B_DERIVA[k]); R.rect(x, y - 2, x, y - 1, rojo); }
    // la tira ampliada (un recorte pegado en la carta, con dos líneas que la unen a Santa María y al encuentro): los nueve
    // días sin nadie, cada uno con su marca y su número, que aparecen con la deriva
    const x0 = 112, y0 = 124, x1 = 252, y1 = 142, sm = b_proy(...B_LUGARES.santaMaria), en = b_proy(...B_LUGARES.encuentro), papL = hex('#f4e8c4'), papS = hex('#c8ac7a');
    for (const [a, b] of [[sm, [x0 + 10, y0]], [en, [x1 - 10, y0]]]) R.linea(a[0], a[1] + 3, b[0], b[1], (x, y, k) => (k % 3 === 0 ? papS : null));
    R.rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, b_mezcla(R.pget(x0 + 10, y1 + 1), hex('#2a1a0a'), 0.35)); R.rect(x0, y0, x1, y1, papL); R.rect(x0, y0, x1, y0, tinta); R.rect(x0, y1, x1, y1, tinta); R.rect(x0, y0, x0, y1, tinta); R.rect(x1, y0, x1, y1, tinta);
    R.rect(x0 + 2, y0 + 2, x1 - 2, y0 + 2, papS); R.rect(x0 + 2, y1 - 2, x1 - 2, y1 - 2, papS);
    const ya = y0 + 7, xa = x0 + 9, xb = x1 - 9, paso = (xb - xa) / 9; R.anillo(xa + 0.5, ya + 0.5, 2.5, rojo);
    for (let x = xa + 3; x < xa + (xb - xa) * dv; x++) if ((x - xa) % 4 < 2) R.pset(x, ya, tinta);
    for (let k = 1; k <= 9; k++) { if (dv < k / 9 - 0.001) break; const x = Math.round(xa + paso * k); R.rect(x, ya - 2, x, ya + 2, k === 9 ? rojo : tinta); b_cifras(R, k, x - 1, ya + 4, k === 9 ? rojo : tinta); }
    if (dv >= 1) { R.anillo(xb + 0.5, ya + 0.5, 3.5, rojo); }
    b_barquito(R, p[0], p[1], t, hex('#1c1a20'), 1);
    if (dv >= 1) { const [x, y] = b_proy(...B_LUGARES.encuentro), r = 5 + Math.sin(t * 3) * 1; R.anillo(x + 0.5, y + 0.5, r, rojo); R.anillo(x + 0.5, y + 0.5, r + 1, rojo); } }
  // Santa María: un aro de tinta que se marca
  { const [x, y] = b_proy(...B_LUGARES.santaMaria); R.anillo(x + 0.5, y + 0.5, 3.5, rojo); }
  // la lámpara de aceite (latón, el tubo de vidrio y la llama que tiembla)
  { const x = Math.round(lx), lat = hex('#c8a040'), latL = hex('#f4dc84'), latS = hex('#6a4a18'), vid = hex('#e8eef0');
    R.disco(x, 176, 13, latS); R.disco(x, 175, 12, lat); R.disco(x - 4, 172, 4, latL); R.rect(x - 6, 150, x + 6, 168, latS); R.rect(x - 5, 150, x + 5, 168, lat); R.rect(x - 4, 152, x - 3, 166, latL);
    R.rect(x - 3, 118, x + 3, 149, vid); R.rect(x - 3, 118, x - 3, 149, hex('#b8c4c8')); R.rect(x + 2, 120, x + 2, 146, hex('#ffffff')); R.rect(x - 4, 146, x + 4, 150, lat);
    const fh = 9 + Math.round(Math.sin(t * 13) * 1.2); R.poligono([[x - 2, 145], [x, 145 - fh], [x + 2, 145]], hex('#ffb040')); R.poligono([[x - 1, 145], [x, 145 - fh + 3], [x + 1, 145]], hex('#fff2b0')); }
  const g = (k) => b_proy(...B_LUGARES[k]).map(Math.round);
  const geo = { santaMaria: g('santaMaria'), encuentro: g('encuentro'), nuevaYork: g('nuevaYork'), gibraltar: g('gibraltar'), genova: g('genova') };
  if (mcEn) geo.mc = mcEn.map(Math.round); if (dgEn) geo.dg = dgEn.map(Math.round);
  return geo;
}
// AZORES · Santa María de cerca en la carta: proyección de esta cámara y el contorno de la isla (lon, lat)
const b_proyA = (lon, lat) => [128 + (lon + 25.08) * 400, 118 - (lat - 36.97) * 500];

const B_SMARIA = [[-25.185, 36.955], [-25.175, 36.975], [-25.15, 36.99], [-25.12, 37.0], [-25.09, 37.012], [-25.06, 37.014], [-25.035, 37.006], [-25.01, 36.996], [-24.99, 36.985], [-24.978, 36.97], [-24.983, 36.952], [-25.0, 36.94], [-25.02, 36.928], [-25.045, 36.93], [-25.07, 36.935], [-25.1, 36.93], [-25.13, 36.928], [-25.16, 36.935], [-25.18, 36.943]];

const B_MARCA = [176, 68];

function b_azoresFija(R) {
  return b_capa(R, 'azores', () => {
    const B = R.buf, isla = B_SMARIA.map(([a, b]) => b_proyA(a, b)), T = R.nuevo(), prev = R.usar(T); R.poligono(isla, 1); R.usar(prev);
    const dist = new Uint8Array(57600); for (let i = 0; i < 57600; i++) dist[i] = T[i] ? 0 : 99;
    for (let it = 1; it <= 14; it++) for (let y = 1; y < 179; y++) for (let x = 1; x < 319; x++) { const i = y * 320 + x; if (dist[i] !== 99) continue; if (dist[i - 1] === it - 1 || dist[i + 1] === it - 1 || dist[i - 320] === it - 1 || dist[i + 320] === it - 1) dist[i] = it; }
    const pap = [hex('#e2cf9e'), hex('#ead9ae'), hex('#f2e4bc'), hex('#d0b47e')], tinta = hex('#3e2e20'), agua = hex('#8fa69a'), tierra = [hex('#a8884e'), hex('#c4a466'), hex('#d8bc80'), hex('#ead2a0')], verde = hex('#a8aa6a');
    // la altura de la isla: la meseta del oeste y el Pico Alto al este del centro
    const alt = (x, y) => Math.exp(-(((x - 148) / 22) ** 2 + ((y - 114) / 13) ** 2)) * 1.0 + Math.exp(-(((x - 104) / 30) ** 2 + ((y - 118) / 14) ** 2)) * 0.35 + Math.exp(-(((x - 166) / 12) ** 2 + ((y - 110) / 9) ** 2)) * 0.45;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, n = h(x >> 1, y >> 1, 894); let c = n > 0.8 ? pap[2] : n < 0.15 ? pap[0] : pap[1];
      if (T[i]) { const a = alt(x, y), gx = alt(x + 1, y) - alt(x - 1, y), gy = alt(x, y + 1) - alt(x, y - 1), luzN = -gx - gy; let k = 1 + (luzN > 0.012 ? 1 : luzN < -0.012 ? -1 : 0) + (a > 0.6 && luzN > 0.02 ? 1 : 0); c = tierra[Math.max(0, Math.min(3, k))];
        if (a < 0.3 && h(x, y, 898) > 0.7) c = verde; const lv = Math.floor(a * 6), lv2 = Math.floor(alt(x + 1, y) * 6), lv3 = Math.floor(alt(x, y + 1) * 6); if (lv !== lv2 || lv !== lv3) c = hex('#8a6a3a'); }
      else if (dist[i] === 1) c = tinta; else if (dist[i] === 2) c = hex('#6a5a40'); else if ((dist[i] === 5 || dist[i] === 9 || dist[i] === 14) && (x + y) % 2 === 0) c = agua;
      const bd = Math.min(x, 319 - x, y, 179 - y); if (bd < 8 && b_umbral(x, y) < (8 - bd) / 10) c = b_mezcla(c, pap[3], 0.6);
      if (b_quieta(x, y) && c !== pap[1]) c = b_mezcla(c, pap[1], 0.6); B[i] = c; }
    // las rayas del sombreado de los montes (cortas, cuesta abajo)
    for (let k = 0; k < 420; k++) { const x = 70 + h(k, 1, 899) * 120, y = 96 + h(k, 2, 899) * 42; if (!T[Math.round(y) * 320 + Math.round(x)]) continue; const a = alt(x, y); if (a < 0.25) continue;
      const gx = alt(x + 1, y) - alt(x - 1, y), gy = alt(x, y + 1) - alt(x, y - 1), g = Math.hypot(gx, gy) || 1; R.linea(x, y, x - gx / g * 2.5, y - gy / g * 2.5, (gx + gy) > 0 ? hex('#7a5a2a') : hex('#9a7a42')); }
    // Vila do Porto en casitas, al suroeste, y la cumbre del Pico Alto
    for (let k = 0; k < 7; k++) { const x = 86 + (k % 4) * 4 + (k >> 2) * 2, y = 126 + (k >> 2) * 3; R.rect(x, y, x + 2, y + 1, hex('#e8e0cc')); R.pset(x, y - 1, hex('#a83a2a')); R.pset(x + 1, y - 1, hex('#a83a2a')); R.pset(x + 2, y + 1, tinta); }
    R.poligono([[146, 112], [149, 107], [152, 112]], tinta); R.pset(149, 109, hex('#f2e4bc'));
    // las sondas (números) por el mar, la cuadrícula de 37° y los rumbos de una rosa que queda fuera
    for (const [x, y, n] of [[40, 40, 120], [60, 92, 64], [36, 140, 88], [94, 158, 40], [150, 160, 52], [214, 150, 96], [248, 112, 140], [230, 80, 180], [196, 128, 34], [76, 66, 210], [272, 160, 230], [120, 76, 150], [44, 118, 46], [190, 96, 22]]) b_cifras(R, n, x, y, hex('#6a5a48'));
    for (let x = 4; x < 316; x += 2) { const y = Math.round(b_proyA(0, 37.05)[1]); if (!T[y * 320 + x] && !b_quieta(x, y)) R.pset(x, y, hex('#c4a87c')); }
    for (let k = 0; k < 5; k++) { const a = -0.35 + k * 0.3; for (let d = 0; d < 420; d += 1.5) { const x = Math.round(-40 + Math.cos(a) * d), y = Math.round(200 - Math.sin(a + 0.6) * d * 0.7); if (x < 4 || x > 315 || y < 4 || y > 175) continue; if (!T[y * 320 + x] && dist[y * 320 + x] > 2 && !b_quieta(x, y) && (d | 0) % 3 === 0) R.pset(x, y, hex('#c8aa7a')); } }
    // el borde graduado a la izquierda y abajo (minutos en blanco y negro)
    for (let y = 26; y < 172; y++) { R.pset(4, y, tinta); R.pset(7, y, tinta); if (Math.floor(y / 6) % 2) { R.pset(5, y, tinta); R.pset(6, y, tinta); } }
    for (let x = 4; x < 316; x++) { R.pset(x, 172, tinta); R.pset(x, 175, tinta); if (Math.floor(x / 6) % 2) { R.pset(x, 173, tinta); R.pset(x, 174, tinta); } }
    // el pliegue y unas motas
    for (let y = 0; y < 180; y++) { R.pset(232, y, b_mezcla(R.pget(232, y), hex('#fff6dc'), 0.4)); R.pset(233, y, b_mezcla(R.pget(233, y), hex('#8a6a40'), 0.3)); }
    for (let k = 0; k < 50; k++) { const x = h(k, 1, 897) * 320, y = h(k, 2, 897) * 180; if (!b_quieta(x, y)) R.pset(x, y, b_mezcla(R.pget(x, y), hex('#a07848'), 0.4)); }
    // las fibras del papel (rayitas tenues) y las manchas de óxido
    for (let k = 0; k < 260; k++) { const x = h(k, 3, 961) * 316, y = h(k, 4, 961) * 176, l = 2 + h(k, 5, 961) * 4, a = h(k, 6, 961) * 3; if (b_quieta(x, y) || b_quieta(x + l, y)) continue;
      R.linea(x, y, x + Math.cos(a) * l, y + Math.sin(a) * l, b_mezcla(R.pget(x, y), k % 3 ? hex('#c8b080') : hex('#fff4d0'), 0.45)); }
    for (const [sx, sy, sr] of [[22, 30, 4], [300, 70, 3], [110, 26, 2.5], [180, 170, 3]]) for (let y = sy - sr; y <= sy + sr; y++) for (let x = sx - sr; x <= sx + sr; x++) if (Math.hypot(x - sx, y - sy) < sr * (0.7 + h(x, y, 962) * 0.4) && !b_quieta(x, y)) R.pset(x, y, b_mezcla(R.pget(x, y), hex('#b08a50'), 0.35));
    // el cerco de una taza (un aro de café, más oscuro por un lado)
    for (let a = 0; a < 6.283; a += 0.02) { const rr = 12 + Math.sin(a * 3) * 0.4, x = 52 + Math.cos(a) * rr, y = 48 + Math.sin(a) * rr * 0.92, o2 = 0.18 + 0.2 * (0.5 + 0.5 * Math.cos(a - 0.6)); R.pset(x, y, b_mezcla(R.pget(x, y), hex('#8a5a28'), o2)); if (h(Math.round(a * 50), 0, 963) > 0.5) R.pset(x + 1, y, b_mezcla(R.pget(x + 1, y), hex('#8a5a28'), o2 * 0.6)); }
    // una rosa de los vientos pequeña abajo a la derecha (sin letras): el aro doble, las puntas y la flor de lis en tinta roja
    { const rx = 286, ry = 132;
      R.anillo(rx + 0.5, ry + 0.5, 17, hex('#7a5e3c')); R.anillo(rx + 0.5, ry + 0.5, 15, hex('#a8885a'));
      for (let k = 0; k < 32; k++) { const a = k / 32 * 6.283; R.pset(rx + Math.cos(a) * 16, ry + Math.sin(a) * 16, k % 4 ? hex('#a8885a') : tinta); }
      for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283 - Math.PI / 2, Lr = k % 2 ? 9 : 14, tip = [rx + Math.cos(a) * Lr, ry + Math.sin(a) * Lr], l1 = [rx + Math.cos(a + 0.35) * 3, ry + Math.sin(a + 0.35) * 3], l2 = [rx + Math.cos(a - 0.35) * 3, ry + Math.sin(a - 0.35) * 3];
        R.poligono([[rx, ry], l1, tip], k % 2 ? hex('#a8803c') : tinta); R.poligono([[rx, ry], tip, l2], k === 0 ? hex('#b03a2a') : k % 2 ? hex('#d8b870') : hex('#efe2bc')); }
      R.disco(rx, ry, 1.5, hex('#b03a2a')); R.poligono([[rx - 2, ry - 18], [rx, ry - 22], [rx + 2, ry - 18]], hex('#b03a2a')); }
    // el ancla del fondeadero, delante de Vila do Porto
    { const ax = 84, ay = 140, c = tinta; R.linea(ax, ay - 4, ax, ay + 3, c); R.linea(ax - 2, ay - 3, ax + 2, ay - 3, c); R.pset(ax, ay - 5, c); R.linea(ax - 3, ay + 1, ax - 1, ay + 3, c); R.linea(ax + 3, ay + 1, ax + 1, ay + 3, c); }
    // la costa para las olas que se mueven: la espuma junto a la tinta y tres franjas que se alejan de la isla
    const pl = new Set(pap.slice(0, 3)), costa = [[], [], [], []];
    for (let y = 2; y < 178; y++) for (let x = 2; x < 318; x++) { const i = y * 320 + x, d = dist[i]; if (T[i] || b_quieta(x, y) || !pl.has(B[i])) continue;
      if (d === 3) costa[0].push(i); else if (d === 4) costa[1].push(i); else if (d === 7) costa[2].push(i); else if (d === 11) costa[3].push(i); }
    return { costa };
  });
}
function b_azores(R, t, o, luz) {
  const F = b_azoresFija(R), B = R.buf; R.copiar(F.b);
  // las olas que rompen en la costa de la isla y se alejan en franjas, la espuma que brilla y las olitas de tinta
  b_olasCosta(R, t, F.costa, hex('#7f988c'), hex('#fbf3d8'));
  b_olitas(R, t, [[30, 60], [96, 52], [40, 100], [230, 130], [200, 165], [120, 160], [150, 84], [22, 160]], hex('#6f8a80'));
  // la luz de la lumbrera, abajo a la izquierda, con sus nubes y sus gaviotas
  b_lumbrera(R, t, 18, 128, 74, 36);
  // la luz de la lámpara que pasa despacio por la carta con el balanceo
  const lx = 200 + Math.sin(t * 0.8) * 40, ly = 120, calida = hex('#ffd890');
  for (let y = 40; y < 180; y++) for (let x = Math.max(0, Math.round(lx - 110)); x < Math.min(320, lx + 110); x++) { const d = Math.hypot(x - lx, (y - ly) * 1.3); if (d > 110) continue; const a = (1 - d / 110) ** 2 * 0.3; if (b_umbral(x, y) < a * 1.5) B[y * 320 + x] = b_mezcla(B[y * 320 + x], calida, a); }
  const rojo = hex('#b0302a'), tinta = hex('#3e2e20'), [mx, my] = B_MARCA, fin = [262, 52], dx = fin[0] - mx, dy = fin[1] - my, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
  // la deriva que se aleja, a trazos, con su flecha
  for (let d = 4; d < L; d++) if (d % 6 < 3) { R.pset(mx + ux * d, my + uy * d, rojo); R.pset(mx + ux * d, my + uy * d + 1, rojo); }
  R.poligono([[fin[0] + ux * 6, fin[1] + uy * 6], [fin[0] - uy * 3, fin[1] + ux * 3], [fin[0] + uy * 3, fin[1] - ux * 3]], rojo);
  // la marca del 25: una cruz de tinta con su número
  for (let k = -3; k <= 3; k++) { R.pset(mx + k, my + k, tinta); R.pset(mx + k, my - k, tinta); R.pset(mx + k + 1, my + k, tinta); R.pset(mx + k + 1, my - k, tinta); }
  R.anillo(mx + 0.5, my + 0.5, 6, rojo); R.numero('25', mx - 18, my - 8, { color: tinta, sombra: false });
  // el compás de puntas que mide desde la marca: las dos patas de acero, la cabeza de latón y su sombra en el papel
  const ab = Math.max(0, Math.min(1, o.compas ?? (0.5 + 0.5 * Math.sin(t * 0.7)))), Lp = 8 + ab * 70, p1 = [mx, my], p2 = [mx + ux * Lp, my + uy * Lp], mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  const hg = [mid[0] - uy * 4 + 2, mid[1] + ux * 4 - Math.sqrt(Math.max(0, 46 * 46 - (Lp / 2) ** 2)) * 0.55], sm = [mid[0] + 10, mid[1] + 8];
  for (const p of [p1, p2]) R.linea(p[0] + 1, p[1] + 1, sm[0], sm[1], b_mezcla(R.pget(sm[0], sm[1]), hex('#2a1a0a'), 0.35));
  for (const [p, o2] of [[p1, -1], [p2, 1]]) { R.linea(p[0] - 1, p[1], hg[0] + o2 - 1, hg[1], hex('#4a4e58')); R.linea(p[0], p[1], hg[0] + o2, hg[1], hex('#9aa0ac')); R.linea(p[0] + 1, p[1], hg[0] + o2 + 1, hg[1], hex('#e4e8f0')); R.pset(p[0], p[1], hex('#2a2a30')); R.pset(p[0], p[1] - 1, hex('#2a2a30')); }
  R.disco(hg[0], hg[1], 3.6, hex('#6a4a18')); R.disco(hg[0], hg[1] - 0.5, 2.8, hex('#c8a040')); R.pset(hg[0] - 1, hg[1] - 2, hex('#f4dc84')); R.linea(hg[0], hg[1] - 4, hg[0], hg[1] - 8, hex('#c8a040'));
  return { santaMaria: b_proyA(-25.08, 36.97).map(Math.round), marca: [mx, my], compas: [p1.map(Math.round), p2.map(Math.round)], cabeza: [Math.round(hg[0]), Math.round(hg[1] - 8)] };
}
// el bote salvavidas de lejos: una yola gris con diez siluetas pequeñas sentadas y quietas (sin caras) y un remo;
// (x, y) el centro en la flotación. Devuelve la proa (donde va el cabo)
function b_botePeq(R, t, x, y, tn, s = 1) {
  const yy = y + Math.sin(t * 1.1) * 0.8 * s, cas = tn(hex('#c8c4b8')), casS = tn(hex('#7e7c74')), casD = tn(hex('#4e4c48')), gente = tn(hex('#3e424a')), genteL = tn(hex('#5a5e66')), w = s > 0.7 ? 1 : 0;
  const Q = (dx, dy) => [x + dx * s, yy + dy * s];
  // las siluetas: dos filas, una niña más pequeña junto a una adulta
  for (let k = 0; k < 10; k++) { const fila = k % 2, px = Math.round(x + (-15 + k * 3.1 + fila) * s), alto = Math.max(2, Math.round((k === 5 ? 3 : 5 + (k * 7 % 3 === 0 ? 1 : 0)) * s)), base = Math.round(yy - (3 + fila) * s);
    R.rect(px, base - alto + 2, px + w, base, fila ? genteL : gente); R.rect(px, base - alto, px + w, base - alto + 1, fila ? genteL : gente); }
  // el casco: la borda que sube en proa y popa, la traca blanca y la sombra
  R.poligono([Q(-20, -5), Q(-13, -2.6), Q(12, -2.6), Q(21, -5.5), Q(17, 1), Q(-16, 1)], cas);
  const L2 = (a, b, c) => R.linea(a[0], a[1], b[0], b[1], c);
  L2(Q(-20, -5), Q(-13, -2.6), casD); L2(Q(-13, -2.6), Q(12, -2.6), casD); L2(Q(12, -2.6), Q(21, -5.5), casD); L2(Q(-16, 0), Q(17, 0), casS); L2(Q(-15, 1), Q(16, 1), casD);
  // el remo apoyado en la borda que entra en el agua
  L2(Q(2, -6), Q(15, 3), tn(hex('#8a6a40'))); const pa = Q(14, 2); R.rect(pa[0], pa[1], pa[0] + 3 * s, pa[1] + s, tn(hex('#6a4e30')));
  return Q(21, -5);
}

// BOTE · el bote y el barco que se aleja en la niebla, y el cabo que los une
function b_bote(R, t, o, luz) {
  const hor = 98, L = b_pal(luz), tn = b_tinte(luz), F = b_cieloFijo(R, luz, hor);
  R.copiar(F.b); b_nubes(R, t, hor, luz, F.b, { viento: 0.5 });
  const px = b_marPrep(t, hor, luz, { fuerza: 0.12, velocidad: 0.7 }); b_marPinta(R, px, hor, 180);
  if (L.niebla) b_marTendida(R, t, hor, L.mar);
  // el barco que se va con el viento: más pequeño, más alto en el agua lejana y más velado cuanto más lejos
  const a = Math.max(0, Math.min(1, o.aleja ?? 0.3)), s = 0.5 - a * 0.34, sx = 232 + a * 52, syw = 122 - a * 20, lejos = (c) => b_mezcla(tn(c), L.niebla || L.mar[0], Math.min(1, 0.15 + a * 0.88));
  const Bq = b_bergantin(R, sx, syw, s, t, { velas: 'pocas', flamea: 0.7, tn: lejos, cabeceo: Math.sin(t * 0.9) * 0.03, balanceo: Math.sin(t * 0.7 + 1) * 0.07, k: 4 });
  if (a < 0.9) b_flotacion(R, t, Bq, s, 1, px, 0, L.mar);
  // con niebla: el reflejo del casco en la mar tendida y el del bote, y la niebla en capas
  if (L.niebla) { if (a < 0.9) b_reflejo(R, t, Bq.centro[0], Math.round(syw + 2), 110 * s, Math.round(26 * s), lejos(hex('#1c1a20')));
    const ab0 = Math.max(0, Math.min(1, o.boteAleja ?? 0)); b_reflejo(R, t, 76 + ab0 * 34, Math.round(136 - ab0 * 30) + 2, 30 * (1 - ab0 * 0.6), 7, L.mar[3]);
    b_nieblaCapas(R, t, hor, 1, L.niebla); }
  else b_niebla(R, t, hor, 0.25, b_mezcla(L.mar[0], hex('#ffffff'), 0.3));
  // el bote, a la izquierda (velado solo un poco: se lee)
  const ab = Math.max(0, Math.min(1, o.boteAleja ?? 0)), sB = 1 - ab * 0.6, bx = 76 + ab * 34, by = Math.round(136 - ab * 30), velo = L.niebla || b_mezcla(L.mar[0], hex('#ffffff'), 0.3);
  const tnB = (c) => b_mezcla(tn(c), velo, (L.niebla ? 0.18 : 0.05) + ab * 0.6), proa = b_botePeq(R, t, bx, by, tnB, sB);
  for (let i = -22; i < 24; i++) if (h(i, Math.floor(t * 4), 905) > 0.55) R.pset(bx + i * sB, by + 2 * sB, b_mezcla(L.mar[6], velo, ab * 0.6));
  // el cabo: tenso hasta 0,5 (se tensa y vibra), luego roto
  const c = Math.max(0, Math.min(1, o.cabo ?? 0.2)), popa = Bq.P(-62, b_yd(-62) + 2, 0), cab = tnB(hex('#3a2e22')), cabL = tnB(hex('#6a5840'));
  const mar = (x) => hor + (180 - hor) * 0.36 - (x - 76) * 0.02;
  const rot = [Math.round(proa[0] + (popa[0] - proa[0]) * 0.45), Math.round(proa[1] + (popa[1] - proa[1]) * 0.45)];
  const cuerda = (ax, ay, bx, by2, comba, vib, col) => { const n = Math.max(2, Math.round(Math.hypot(bx - ax, by2 - ay))); let qx = ax, qy = ay;
    for (let i = 1; i <= n; i++) { const u = i / n, X = ax + (bx - ax) * u, Y = ay + (by2 - ay) * u + Math.sin(u * Math.PI) * comba + Math.sin(u * Math.PI * 3) * vib; R.linea(qx, qy, X, Y, col); qx = X; qy = Y; } };
  if (c < 0.5) { const tens = c / 0.5, comba = 9 * (1 - tens) + 0.8, vib = tens ** 3 * 1.4 * Math.sin(t * 47); cuerda(proa[0], proa[1], popa[0], popa[1], comba, vib, cab); cuerda(proa[0], proa[1] - 1, popa[0], popa[1] - 1, comba, vib, cabL); }
  else { const k = Math.min(1, (c - 0.5) / 0.18), salto = Math.max(0, 1 - (c - 0.5) / 0.06);
    // la punta del barco: cuelga de la popa y se arrastra por el agua detrás de él
    if (a < 0.9) cuerda(popa[0], popa[1], popa[0] - 14 * s - 4, mar(popa[0]) - 2 + (syw - mar(popa[0])) * 0.1, 3, 0, lejos(hex('#3a2e22')));
    // la punta del bote: cae al agua y se hunde
    const ex = rot[0], ey = rot[1] + (mar(rot[0]) - rot[1]) * k; cuerda(proa[0], proa[1], ex, ey, 2 + k * 5, 0, cab); cuerda(proa[0], proa[1] - 1, ex, ey - 1, 2 + k * 5, 0, k > 0.9 ? b_mezcla(cabL, L.mar[3], 0.3) : cabL);
    if (salto > 0) for (let i = 0; i < 10; i++) R.pset(rot[0] + (h(i, 1, 906) - 0.5) * 8 * (1 - salto) * 3, rot[1] + (h(i, 2, 906) - 0.5) * 6 * (1 - salto) * 3, cabL);
    const u = (c - 0.62) / 0.38; if (u > 0) { const wx = rot[0], wy = Math.round(mar(rot[0])); if (u < 0.25) for (let i = 0; i < 16; i++) { const v = u / 0.25, ang = h(i, 3, 907) * Math.PI; R.pset(wx + Math.cos(ang) * 6 * v * (0.5 + h(i, 4, 907)), wy - Math.sin(ang) * 9 * v * (1 - v) * 2, L.mar[7]); }
      for (let rI = 0; rI < 2; rI++) { const rr = 3 + u * 22 - rI * 6; if (rr < 2) continue; for (let ang = 0; ang < 6.283; ang += 0.05) { const X = wx + Math.cos(ang) * rr, Y = wy + Math.sin(ang) * rr * 0.25; if (h(Math.round(ang * 9), rI, 908) > u * 0.8) R.pset(X, Y, rI ? L.mar[4] : L.mar[6]); } } } }
  return { bote: [Math.round(bx), by], barco: Bq.centro.map(Math.round), rotura: rot, horizonte: hor };
}
// CABO · la estacha de cerca a ras de agua: tensa, chorreando, que se deshilacha y se parte
function b_cabo(R, t, o, luz) {
  const hor = 44, L = b_pal(luz), tn = b_tinte(luz), F = b_cieloFijo(R, luz, hor), B = R.buf;
  R.copiar(F.b); b_nubes(R, t, hor, luz, F.b, { viento: 0.5 });
  const px = b_marPrep(t, hor, luz, { fuerza: 0.3, velocidad: 0.8 }); b_marPinta(R, px, hor, 180);
  const c = Math.max(0, Math.min(1, o.cabo ?? 0.2)), rot = [160, 100];
  const path = (u) => [-10 + 340 * u, 155 - 110 * u], ancho = (u) => 8 - u * 5;
  // el cáñamo colchado: tres cordones en espiral, con su luz arriba y su sombra abajo; mojado cerca del agua
  const cord = [tn(hex('#5a4630')), tn(hex('#8a7048')), tn(hex('#b89a68')), tn(hex('#d4ba86'))], moj = tn(hex('#3e3226'));
  const tramo = (u0, u1, dxy = [0, 0], vib = 0, deshilo = 0) => { const n = Math.round((u1 - u0) * 380);
    for (let i = 0; i <= n; i++) { const u = u0 + (u1 - u0) * i / n, [x0, y0] = path(u), w = ancho(u), vb = Math.sin(t * 43 + u * 12) * vib * Math.sin(Math.min(1, Math.abs(u - 0.5) * 2) * Math.PI);
      const abre = deshilo * Math.max(0, 1 - Math.abs(u - 0.5) / 0.07);
      for (let j = -w; j <= w; j += 0.5) { const sep = abre * (Math.abs(j) > w * 0.25 ? Math.sign(j) * 3.6 : 0), X = x0 + 0.308 * (j + sep) + dxy[0], Y = y0 + 0.951 * (j + sep) + vb + dxy[1];
        const ph = (u * 380 * 0.5 + j * 0.9) % 6, v = (j + w) / (2 * w); let col = ph < 1 ? cord[0] : v < 0.3 ? cord[3] : v > 0.75 ? cord[0] : ph < 3 ? cord[2] : cord[1];
        if (Math.abs(j) > w - 0.6) col = cord[0]; if (u < 0.12) col = b_mezcla(col, moj, 0.5); R.pset(X, Y, col); } } };
  if (c < 0.5) {
    const vib = (c / 0.5) ** 2 * 1.8, desh = Math.max(0, (c - 0.15) / 0.35);
    tramo(0, 1, [0, 0], vib, desh * 0.8);
    // las fibras que saltan donde se deshilacha
    for (let i = 0; i < 44 * desh; i++) { const a = h(i, 1, 910) * 6.283, l = 3 + h(i, 2, 910) * 12 * desh; R.linea(rot[0], rot[1], rot[0] + Math.cos(a) * l, rot[1] + Math.sin(a) * l + Math.sin(t * 30 + i) * 0.6, i % 2 ? cord[3] : cord[2]); }
    // las gotas que caen del cabo tenso
    for (let k = 0; k < 9; k++) { const u = 0.15 + h(k, 1, 911) * 0.6, [x0, y0] = path(u), f = (t * 1.4 + h(k, 2, 911)) % 1, yy = y0 + ancho(u) + f * f * 60; if (yy < 180) R.pset(x0, yy, L.mar[7]); }
  } else {
    const k = Math.min(1, (c - 0.5) / 0.25);
    // la punta del barco salta hacia arriba y se va; la del bote cae y se hunde
    tramo(0.5, 1, [k * 150, -k * 22], 0, 1 - k);
    const caida = k * 40; tramo(0, 0.5, [0, 0], 0, 0);
    if (k > 0) { const [x0, y0] = path(0.5); for (let i = 0; i < 8; i++) { const v = (i + 1) / 8; R.linea(x0 - 2, y0 - 2, x0 + (h(i, 1, 912) - 0.5) * 18 * v, y0 + caida * v * 0.3 + (h(i, 2, 912) - 0.5) * 10, cord[i % 4]); } }
    // la salpicadura y las burbujas donde cae
    const u2 = (c - 0.55) / 0.45; if (u2 > 0) { const wx = 150, wy = 128; for (let i = 0; i < 30; i++) { const ang = h(i, 3, 913) * Math.PI, vv = Math.min(1, u2 * 4); R.pset(wx + Math.cos(ang) * 16 * vv * (0.4 + h(i, 4, 913)), wy - Math.sin(ang) * 20 * vv * (1 - vv) * 2.5, i % 3 ? L.mar[7] : L.mar[6]); }
      for (let i = 0; i < 10; i++) { const f = (t * 0.9 + h(i, 5, 913)) % 1; R.anillo(wx + (h(i, 6, 913) - 0.5) * 30, wy + 30 - f * 30, 1 + h(i, 7, 913), L.mar[4]); }
      for (let rr = 4 + u2 * 30; rr > 2; rr -= 9) for (let ang = 0; ang < 6.283; ang += 0.03) R.pset(wx + Math.cos(ang) * rr, wy + Math.sin(ang) * rr * 0.3, L.mar[4]); }
  }
  // donde el cabo entra en el agua, espuma y anillos
  for (let i = 0; i < 18; i++) { const a = h(i, Math.floor(t * 6), 914); R.pset(4 + i * 2 + a * 3, 148 + a * 6, a > 0.5 ? L.mar[6] : L.mar[7]); }
  if (L.niebla) b_nieblaCapas(R, t, hor, 0.75, L.niebla, 0, 120);
  return { rotura: rot, horizonte: hor };
}
// qué vista piden las opciones: el encuadre (uno que no existe cae en 'cubierta'), la cámara, el estado y la luz
function c_vista(o) {
  const enc = V_ABORDO[o.encuadre] ? o.encuadre : 'cubierta', cam = o.camara === V_ABORDO[enc].cam ? o.camara : 'general';
  return { enc, cam, hall: o.estado !== 'viaje', est: o.estado === 'viaje' ? 'viaje' : 'hallazgo', luz: o.luz === 'dia' ? 'dia' : 'gris' };
}

// el color que marca «sin pintar» en los búferes fijos (ahí va lo que se mueve: el cielo y el mar)
const c_VACIO = 0x01020304;

// los búferes fijos del grupo C: cada vista (encuadre, cámara, estado y luz) se pinta una vez y luego se copia
const c_capas = new Map();

// devuelve el búfer fijo de esa clave; la primera vez lo pinta con dibuja() (fondo c_VACIO)
function c_capa(R, clave, dibuja) {
  let b = c_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(c_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); c_capas.set(clave, b); }
  return b;
}

// el búfer en el que se está pintando ahora mismo (para leerlo y escribirlo de golpe), sin cambiarlo
let c_aux = null;

// el búfer de destino actual (se lee con usar() y se deja igual)
function c_actual(R) { if (!c_aux) c_aux = R.nuevo(); const cur = R.usar(c_aux); R.usar(cur); return cur; }

// mezcla dos colores: k = 0 deja a, k = 1 da b
function c_mez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// el umbral de la trama de Bayer 4 × 4 (0–1)
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral de la trama en (x, y)
const c_b4 = (x, y) => (c_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// oscurece (f < 1) o aclara hacia col un óvalo de lo ya pintado (sombras de objetos, charcos de luz)
function c_sombra(R, cx, cy, rx, ry, a = 0.3, col = 0xff000000) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) { const c = R.pget(x, cy + j); if (c && c !== c_VACIO) R.pset(x, cy + j, c_mez(c, col, a)); } }
}

// unas cifras diminutas de 3 × 5 (para columnas del diario y marcas de la varilla, donde R.numero no cabe)
const c_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

// escribe las cifras de s con la fuente de 3 × 5 en (x, y)
function c_cifras(R, s, x, y, col) { for (const ch of String(s)) { const d = c_DIG[+ch]; if (d) for (let i = 0; i < 15; i++) if (d[i] === '1') R.pset(x + (i % 3), y + Math.floor(i / 3), col); x += 4; } }

// tablazón de filas horizontales entre y0 e y1 (alto(y): el alto de cada fila, para la perspectiva): cada tabla con su
// tono, vetas claras y oscuras, algún nudo, las juntas a tope escalonadas con sus cabillas y la costura de brea debajo.
// P = { brea, s, c, l, v }
function c_tablas(R, x0, x1, y0, y1, alto, P, k = 0, largo = 56) {
  const { rect, pset } = R;
  for (let y = y0, f = 0; y <= y1; f++) {
    const a = Math.max(2, Math.round(alto(y))), yb = Math.min(y1, y + a - 1), L = Math.round(largo * a / 6 + 12), off = Math.round(h(f, 1, 40 + k) * L);
    for (let x = x0 - off, j = 0; x <= x1; x += L, j++) {
      const xa = Math.max(x0, x), xb = Math.min(x1, x + L - 1); if (xb < xa) continue;
      const tn = h(f, j, 41 + k), c = tn < 0.25 ? c_mez(P.c, P.s, 0.3) : tn > 0.8 ? c_mez(P.c, P.l, 0.35) : P.c;
      rect(xa, y, xb, yb, c);
      for (let gy = y + 1; gy < yb; gy++) for (let gx = xa + Math.round(h(gy, j, 42 + k) * 8); gx < xb;) { const n = 3 + Math.round(h(gx, gy, 43 + k) * 12); if (h(gx, gy, 44 + k) < 0.55) rect(gx, gy, Math.min(xb - 1, gx + n), gy, h(gx, gy, 45 + k) < 0.72 ? P.v : c_mez(c, P.l, 0.5)); gx += n + 2 + Math.round(h(gy, gx, 46 + k) * 10); }
      if (h(f, j, 47 + k) < 0.14 && a >= 4) { const nx = xa + 4 + Math.round((xb - xa - 8) * h(j, f, 48 + k)), ny = y + (a >> 1); rect(nx - 2, ny, nx + 2, ny, P.s); pset(nx, ny, P.brea); pset(nx - 1, ny - 1, P.v); }
      if (x >= x0) { rect(x, y, x, yb, P.brea); if (a >= 4) { pset(x + 2, y + 1, P.s); pset(x + 2, yb - 1, P.s); pset(x - 3, y + 1, P.s); pset(x - 3, yb - 1, P.s); } }
    }
    rect(x0, y, x1, y, c_mez(P.c, P.l, 0.55)); rect(x0, yb, x1, yb, P.brea);
    y = yb + 1;
  }
}

// pared de paneles de madera barnizada (de x0 a x1, de y0 a y1, paneles de ancho w): el marco con su grano, y cada
// panel en relieve con el bisel claro arriba a la izquierda y oscuro abajo a la derecha, y su veta vertical. P = { s, c, l, v }
function c_paneles(R, x0, y0, x1, y1, w, P, k = 0) {
  const { rect, pset } = R;
  rect(x0, y0, x1, y1, P.c);
  for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) if (h(x, y >> 2, 50 + k) < 0.1) pset(x, y, P.v);
  for (let x = x0 + 3; x + w - 3 <= x1 + 2; x += w) {
    const xa = x + 1, xb = x + w - 5, ya = y0 + 3, yb = y1 - 3; if (xb - xa < 4 || yb - ya < 4) continue;
    rect(xa - 1, ya - 1, xb + 1, ya - 1, P.s); rect(xa - 1, ya - 1, xa - 1, yb + 1, P.s); rect(xa, yb + 1, xb + 1, yb + 1, P.l); rect(xb + 1, ya, xb + 1, yb + 1, P.l);
    rect(xa, ya, xb, yb, c_mez(P.c, P.l, 0.1));
    rect(xa + 1, ya + 1, xb - 1, ya + 1, P.l); rect(xa + 1, ya + 1, xa + 1, yb - 1, P.l); rect(xa + 1, yb - 1, xb - 1, yb - 1, P.s); rect(xb - 1, ya + 1, xb - 1, yb - 1, P.s);
    for (let gx = xa + 3; gx < xb - 2; gx += 2 + Math.round(h(gx, k, 51) * 3)) { let gy = ya + 3 + Math.round(h(gx, 1, 52 + k) * 6); while (gy < yb - 3) { const n = 4 + Math.round(h(gx, gy, 53 + k) * 14); rect(gx, gy, gx, Math.min(yb - 3, gy + n), h(gx, gy, 54 + k) < 0.6 ? P.v : c_mez(P.c, P.s, 0.4)); gy += n + 3 + Math.round(h(gy, gx, 55) * 8); } }
  }
}

// un barril tumbado visto de frente (la tapa): el aro de hierro de fuera con su brillo, el jable oscuro, las duelas de la
// tapa con sus juntas, la luz arriba a la izquierda, el tapón y la cruz de la tapa; rojo: los de roble rojo, que rezuman
// (un reguero oscuro hacia abajo). osc 0–1 oscurece (lejos o en la penumbra)
function c_barril(R, cx, cy, r, rojo = false, osc = 0, k = 0) {
  const cs = rojo ? [hex('#3a160e'), C.robleRS, C.robleR, hex('#c07050')] : [hex('#3e2a18'), C.robleBS, C.robleB, hex('#e8c488')], N = hex('#120c0a');
  const A = [hex('#2a2a30'), C.aro, hex('#8a8a96')], sombra = (c) => (osc > 0 ? c_mez(c, N, osc) : c), tb = Math.max(3, Math.round(r / 2.4));
  for (let j = -r - 1; j <= r + 1; j++) for (let i = -r - 1; i <= r + 1; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5); if (d > r + 0.6) continue; const x = cx + i, y = cy + j, lt = (-i - j * 1.2) / (r * 2);
    let c;
    if (d > r - 0.4) c = A[0];
    else if (d > r - 2.2) c = lt > 0.3 ? A[2] : lt < -0.25 ? A[0] : A[1];
    else if (d > r - 3.6) c = cs[0];
    else { c = lt > 0.22 ? cs[3] : lt < -0.28 ? cs[1] : cs[2]; if (((i + r + 40) % tb) === 0) c = cs[1]; else if (((i + r + 41) % tb) === 0 && lt > 0) c = c_mez(c, cs[3], 0.5); if (h(x, y, 60 + k) < 0.07) c = cs[1]; }
    R.pset(x, y, sombra(c));
  }
  if (r >= 6) { const bx = cx + Math.round(r * 0.32), by = cy - Math.round(r * 0.38); R.disco(bx, by, Math.max(1, r * 0.13), sombra(cs[0])); R.pset(bx - 1, by - 1, sombra(cs[3])); }
  if (r >= 10) { R.rect(cx - Math.round(r * 0.55), cy + Math.round(r * 0.3), cx + Math.round(r * 0.55), cy + Math.round(r * 0.3), sombra(cs[1])); }
  if (rojo && r >= 6) for (let s = 0; s < 3; s++) { const x = cx - Math.round(r * 0.3) + s * Math.round(r * 0.35), L = Math.round(r * (0.3 + h(s, cx, 61) * 0.5)); for (let y = cy + Math.round(r * 0.4); y < cy + Math.round(r * 0.4) + L; y++) R.pset(x, y, sombra(hex('#4a1a12'))); }
}

// un rollo de cabo (aduja) visto desde arriba: espiras con luz y sombra, y el chicote que sale
function c_aduja(R, cx, cy, rx, ry, k = 0) {
  const c = [hex('#5a4a34'), hex('#9a8460'), hex('#c8b084'), hex('#e2d0a4')];
  for (let n = 0; n < 4; n++) { const ax = rx - n * rx / 4.5, ay = ry - n * ry / 4.5; if (ax < 1) break; for (let a = 0; a < 6.3; a += 0.6 / ax) { const x = Math.round(cx + Math.cos(a) * ax), y = Math.round(cy + Math.sin(a) * ay), lt = -Math.cos(a + 0.8); R.pset(x, y, lt > 0.4 ? c[3] : lt > -0.2 ? c[2] : c[1]); R.pset(x, y + 1, c[0]); } }
  R.pset(cx, cy, c[0]); R.linea(cx + rx, cy, cx + rx + 3 + (k % 3), cy + 2, c[2]);
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba a la izquierda), de ancho w
function c_nube(R, cx, cy, w, cs) {
  const r = Math.max(2, w * 0.3), B = [[-w * 0.4, 1.2, r * 0.75], [-w * 0.12, -0.6, r * 1.02], [w * 0.18, 0, r * 0.92], [w * 0.42, 1.4, r * 0.7]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1.5, rr, cs[0]);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.94, cs[1]);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1.2, cy + dy - 1.2, rr * 0.55, cs[2]);
  for (let x = Math.round(cx - w * 0.6); x <= cx + w * 0.6; x++) if (h(x, cy, 62) < 0.5) R.pset(x, Math.round(cy + r * 0.9 + 1), cs[0]);
}

// una gaviota en vuelo (de lejos): una uve que aletea
function c_gaviotaVuela(R, x, y, t, k, col) { const a = Math.sin(t * 6 + k * 2) > 0; R.pset(x, y, col); R.pset(x - 1, y - (a ? 1 : 0), col); R.pset(x + 1, y - (a ? 1 : 0), col); R.pset(x - 2, y - (a ? 2 : 0), col); R.pset(x + 2, y - (a ? 2 : 0), col); }

// los colores del grupo C
const CC = {
  cub: { brea: hex('#3a2c22'), s: C.tablaS, c: C.tabla, l: C.tablaL, v: hex('#b49264') },
  oscura: { brea: hex('#22160e'), s: hex('#4e2e1a'), c: hex('#6a4026'), l: hex('#94603a'), v: hex('#5a361e') },
  panel: { s: hex('#4a2a16'), c: hex('#74482a'), l: hex('#a06c42'), v: hex('#643c22') },
  caoba: { brea: hex('#2a140c'), s: hex('#4e2216'), c: hex('#6e3420'), l: hex('#9a5236'), v: hex('#5a2a1a') },
  cielo: { gris: [hex('#5c687a'), hex('#6a7688'), hex('#7a8696'), hex('#8a96a4'), hex('#9ca6b2')], dia: [hex('#3c7ac2'), hex('#5090d0'), hex('#68a2da'), hex('#86b6e4'), hex('#a8ccee')] },
  nube: { gris: [hex('#56606f'), hex('#727e8e'), hex('#949eac')], dia: [hex('#b8cce2'), hex('#e2ecf6'), hex('#ffffff')] },
  mar: { gris: { c: hex('#3c5064'), s: hex('#2a3a4c'), l: hex('#5e7286'), e: hex('#b8c4cc'), hz: hex('#7a8898') }, dia: { c: hex('#2a5a84'), s: hex('#1c4268'), l: hex('#4a7ea8'), e: hex('#e8f0f2'), hz: hex('#8ab0cc') } },
  cabo: hex('#2c2624'), hierro: hex('#4a4a52'), hierroL: hex('#8a8a96'), hierroS: hex('#2a2a30'), laton: hex('#c8a040'), latonL: hex('#f0d880'), latonS: hex('#8a6a24'),
  blanco: hex('#e2dccb'), blancoL: hex('#f2ecde'), blancoS: hex('#b8b0a0'), agua: hex('#5a7084'), aguaL: hex('#9ab0c0'), negro: hex('#120c08'),
};

// el cielo, el mar y el horizonte que se inclina (el barco se mece): devuelve la altura del horizonte en x
const c_horizonte = (t, y0) => { const roll = Math.sin(t * 0.55) * 0.035, heave = Math.sin(t * 0.55 + 1.3) * 1.6; return (x) => y0 + heave + roll * (x - 160); };

// pinta de golpe el cielo tramado y el mar con olas, crestas, borreguillos y la bruma del horizonte (filas y0–y1)
function c_cieloMar(R, cur, t, luz, y0, y1, hor) {
  const cs = CC.cielo[luz], M = CC.mar[luz], n = cs.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    const hz = hor(x), i = y * 320 + x; let c;
    if (y < hz) { const v = Math.max(0, Math.min(1, y / hz)) * n + (h(x >> 3, y >> 2, 63) - 0.5) * 0.25, a = Math.floor(v); c = cs[Math.min(n, a + ((v - a) > c_b4(x, y) ? 1 : 0))]; }
    else {
      const d = y - hz, w = Math.sin(x * 0.11 / (0.35 + d * 0.06) + t * 1.6 + y * 1.3) + 0.75 * Math.sin(x * 0.045 - t * 0.9 + y * 0.55 + Math.sin(y * 0.8));
      c = w > 1.3 ? M.l : w < -1.15 ? M.s : M.c;
      if (w > 1.55 && h(x >> 2, y, Math.floor(t * 1.5 + x * 0.013)) < 0.35) c = M.e;
      if (d < 2.5) c = c_mez(c, M.hz, d < 1 ? 0.7 : 0.4);
    }
    cur[i] = c;
  }
}

const C_HOR = 58;

// la cubierta fija (estado y luz): todo menos el cielo, el mar y lo que se mueve; el cielo queda en c_VACIO
function c_cubiertaFija(R, v) {
  const { rect, pset, linea, disco, poligono } = R, hall = v.hall;
  // 1 · las tablas de cubierta en perspectiva (más anchas cuanto más cerca) y la sombra de la borda de enfrente
  c_tablas(R, 0, 319, 98, 179, (y) => 3 + (y - 98) * 0.075, CC.cub, 1, 50);
  for (let y = 98; y < 104; y++) for (let x = 0; x < 320; x++) if (c_b4(x, y) < 0.55 - (y - 98) * 0.09) pset(x, y, c_mez(R.pget(x, y), C.k, 0.3));
  // 2 · la borda de enfrente: el trancanil con sus imbornales, la cara interior pintada con sus candeleros, la regala
  rect(0, 94, 319, 97, hex('#7a6a58')); rect(0, 94, 319, 94, hex('#9a8a74')); rect(0, 97, 319, 97, hex('#4a3e32'));
  for (let x = 10; x < 320; x += 34) { rect(x, 95, x + 3, 96, CC.negro); pset(x, 94, hex('#5a4e40')); }
  for (let y = 79; y <= 93; y++) for (let x = 0; x < 320; x++) { let c = (y - 79) % 5 === 4 ? CC.blancoS : y === 79 ? CC.blancoL : CC.blanco; if (h(x >> 1, y, 64) < 0.05) c = hex('#a89880'); if (h(x, y, 65) < 0.02) c = hex('#8a7a62'); pset(x, y, c); }
  for (let x = 6; x < 320; x += 16) { rect(x, 79, x + 2, 93, hex('#c2b8a2')); rect(x, 79, x, 93, CC.blancoL); rect(x + 2, 79, x + 2, 93, hex('#9a907c')); rect(x - 1, 92, x + 3, 93, hex('#8a7e6a')); }
  rect(0, 75, 319, 78, hex('#5e3c24')); rect(0, 75, 319, 75, hex('#9a6c44')); rect(0, 76, 319, 76, hex('#7a5234')); rect(0, 78, 319, 78, hex('#3a2416'));
  for (let x = 0; x < 320; x += 1) if (h(x, 3, 66) < 0.12) pset(x, 76, hex('#8a6040'));
  // el portalón de la borda (por donde se sube): un hueco en la regala con su escala de gato
  rect(40, 75, 56, 93, hex('#9aa8b4')); rect(40, 75, 56, 78, c_VACIO); for (let y = 79; y <= 93; y++) for (let x = 40; x <= 56; x++) pset(x, y, c_VACIO);
  rect(38, 72, 39, 93, hex('#5e3c24')); rect(57, 72, 58, 93, hex('#5e3c24')); rect(38, 72, 39, 72, hex('#9a6c44')); rect(57, 72, 58, 72, hex('#9a6c44'));
  for (const x of [42, 54]) { pset(x, 94, CC.hierroL); pset(x, 95, CC.hierro); }
  // los cabilleros con sus cabillas y las adujas colgadas, y las vigotas de los obenques del palo mayor con sus flechastes
  for (const [x0, x1] of [[66, 104], [180, 206], [228, 250]]) { rect(x0, 82, x1, 84, hex('#6a4428')); rect(x0, 82, x1, 82, hex('#9a6c44'));
    for (let x = x0 + 3; x < x1 - 1; x += 5) { rect(x, 79, x, 87, hex('#d8c8a0')); pset(x, 79, hex('#f0e4c0')); if (h(x, 1, 67) < 0.55) { const L = 6 + Math.round(h(x, 2, 67) * 4); for (let k = 0; k < 3; k++) linea(x - 1 + k, 85, x - 2 + k * 2, 85 + L, k === 1 ? hex('#c8b084') : hex('#8a7450')); pset(x - 2, 85 + L, hex('#8a7450')); } } }
  const OB = [[184, 210], [192, 211], [200, 212], [222, 216], [230, 217]];
  for (const [x, xt] of OB) { linea(x, 74, x, 66, CC.cabo); disco(x, 74, 2, hex('#2a2220')); pset(x - 1, 73, hex('#5a4a40')); disco(x, 65, 2, hex('#2a2220')); pset(x - 1, 64, hex('#5a4a40')); linea(x, 63, xt, -2, CC.cabo); }
  for (let y = 60; y > 0; y -= 5) { for (const [a, b] of [[0, 1], [1, 2], [3, 4]]) { const xa = Math.round(OB[a][0] + (OB[a][1] - OB[a][0]) * (63 - y) / 65), xb = Math.round(OB[b][0] + (OB[b][1] - OB[b][0]) * (63 - y) / 65); linea(xa, y, xb, y + 1, hex('#3e3632')); } }
  // 3 · el pie del palo trinquete (a la izquierda, a toda altura), con sus zunchos, la fogonadura, sus obenques con
  // vigotas y flechastes, y las cabillas al pie
  for (let y = 0; y <= 108; y++) for (let x = 3; x <= 12; x++) pset(x, y, x === 3 || x === 12 ? C.k : x < 5 ? hex('#e0c094') : x < 8 ? hex('#c09a68') : x < 10 ? hex('#a07e50') : hex('#6e5434'));
  for (let y = 6; y < 108; y += 7) if (h(y, 3, 70) < 0.6) pset(6 + (y % 3), y, hex('#8a6a42'));
  for (const y of [30, 58, 90]) { rect(2, y, 13, y + 2, CC.hierro); rect(2, y, 13, y, CC.hierroL); pset(12, y + 1, CC.hierroS); }
  rect(0, 104, 16, 110, C.k); rect(0, 105, 15, 109, hex('#3a3430')); rect(0, 105, 15, 105, hex('#6a625a'));
  for (const x of [20, 27, 34]) { disco(x, 74, 2, hex('#2a2220')); pset(x - 1, 73, hex('#5a4a40')); linea(x, 72, x, 66, CC.cabo); disco(x, 65, 2, hex('#2a2220')); linea(x, 63, 13, 22, CC.cabo); }
  for (let y = 60; y > 24; y -= 5) { const xa = Math.round(20 + (13 - 20) * (63 - y) / 41), xb = Math.round(34 + (13 - 34) * (63 - y) / 41); linea(xa, y, xb, y + 1, hex('#3e3632')); }
  // la cuba del agua dulce, tumbada en sus calzos
  { const x0 = 4, x1 = 30, y0 = 118, y1 = 134; for (let x = x0; x <= x1; x++) { const b = Math.round(Math.sin((x - x0) / (x1 - x0) * Math.PI) * 2); for (let y = y0 - b; y <= y1 + b; y++) { const u = (y - y0 + b) / (y1 - y0 + 2 * b); pset(x, y, y === y0 - b || y === y1 + b ? C.k : u < 0.25 ? C.robleB : u > 0.75 ? hex('#7a5430') : hex('#a87c48')); } }
    for (const x of [8, 14, 22, 26]) for (let y = y0 - 1; y <= y1 + 1; y++) pset(x, y, CC.hierro); rect(x0, y0 + 2, x1, y0 + 2, hex('#e0b878')); disco(17, y0 - 1, 1, C.k); rect(6, y1 + 1, 10, y1 + 4, hex('#5a3a22')); rect(24, y1 + 1, 28, y1 + 4, hex('#5a3a22')); c_sombra(R, 17, y1 + 5, 14, 2, 0.35); }
  // 4 · la escotilla de proa: la brazola y, dentro, la lona (viaje) o el hueco abierto con la escala y los barriles en la penumbra
  const brazola = (x0, y0, x1, y1) => { rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 4, hex('#a8885c')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, C.tablaL); rect(x0 + 1, y1 - 3, x1 - 1, y1 - 1, hex('#7a5a38')); rect(x0 + 1, y1 - 3, x1 - 1, y1 - 3, hex('#5a4028')); for (const x of [x0 + 2, x1 - 2]) { pset(x, y1 - 2, CC.hierroL); } c_sombra(R, (x0 + x1) >> 1, y1 + 2, ((x1 - x0) >> 1) + 2, 2, 0.3); };
  const hueco = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y - y0) < 2 ? hex('#2a1e14') : c_b4(x, y) < 0.3 ? hex('#1e140c') : CC.negro); for (let y = y0 + 2; y <= y1; y += 2) rect(x0 + 3, y, x0 + 8, y, hex('#5a3e24')); rect(x0 + 3, y0, x0 + 3, y1, hex('#3a2818')); rect(x0 + 8, y0, x0 + 8, y1, hex('#3a2818')); for (let x = x0 + 12; x < x1 - 2; x += 6) { pset(x, y1 - 1, hex('#3e2a18')); pset(x + 1, y1 - 1, hex('#4e3620')); pset(x + 2, y1 - 1, hex('#3e2a18')); } };
  const lona = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, h(x >> 1, y, 68) < 0.1 ? hex('#5e5a4e') : (x + y * 3) % 11 === 0 ? hex('#8a8470') : hex('#76705e')); for (let x = x0 + 4; x < x1; x += 10) { rect(x, y0, x + 1, y1, CC.hierro); pset(x, y0, CC.hierroL); } };
  const tapa = (pts) => { poligono(pts, hex('#3a2818')); const [a, b, c, d] = pts; poligono([[a[0] + 1, a[1] + 1], [b[0] - 1, b[1] + 1], [c[0] - 1, c[1] - 1], [d[0] + 1, d[1] - 1]], (x, y) => ((x - y * 0.3) % 6 < 1 ? hex('#7a5a38') : y % 3 === 0 && h(x, y, 69) < 0.3 ? hex('#c8a878') : hex('#a8885c'))); linea(a[0] + 4, a[1] + 1, d[0] + 4, d[1] - 1, CC.hierro); linea(b[0] - 4, b[1] + 1, c[0] - 4, c[1] - 1, CC.hierro); R.anillo((a[0] + c[0]) >> 1, (a[1] + c[1]) >> 1, 1.6, CC.hierroL); };
  brazola(36, 104, 74, 118); if (hall) { hueco(39, 107, 71, 113); tapa([[78, 121], [104, 118], [108, 127], [82, 130]]); c_sombra(R, 94, 131, 14, 2, 0.3); } else lona(39, 107, 71, 113);
  // 5 · la escotilla principal: la brazola y las cuarteles con su lona; encima, el bote (viaje) o solo sus calzos y las
  // trincas sueltas (hallazgo)
  brazola(110, 104, 192, 120); lona(113, 107, 189, 115);
  const calzo = (x) => { rect(x, 100, x + 8, 108, C.k); rect(x + 1, 101, x + 7, 107, hex('#8a6a46')); rect(x + 1, 101, x + 7, 101, C.tablaL); poligono([[x + 1, 101], [x + 7, 101], [x + 5, 104], [x + 3, 104]], hex('#5a4028')); };
  calzo(122); calzo(172);
  if (!hall) {
    // el bote: la borda blanca, el casco con su traca oscura, el interior con los bancos y los remos, y las trincas
    poligono([[112, 95], [190, 95], [184, 104], [120, 104]], C.k);
    poligono([[114, 96], [188, 96], [183, 103], [121, 103]], (x, y) => (y >= 102 ? hex('#5e6268') : y === 96 ? hex('#b8bcc2') : y === 99 ? hex('#6a6e74') : (x + y) % 9 === 0 ? hex('#7a7e84') : hex('#8a8e94')));
    for (let x = 116; x < 186; x++) { const top = 89 + Math.round(Math.pow((x - 151) / 37, 2) * 4); rect(x, top, x, 95, x < 120 || x > 182 ? hex('#6e7278') : hex('#8a7a62')); pset(x, top, hex('#b8bcc2')); }
    for (const x of [130, 151, 172]) rect(x, 90, x + 2, 95, hex('#6a4a2a'));
    linea(118, 91, 184, 93, hex('#d8b888')); linea(118, 92, 184, 94, hex('#8a6a46')); rect(180, 91, 186, 93, hex('#d8b888'));
    for (const [a, b] of [[126, 118], [176, 186]]) { linea(a, 89, b, 121, hex('#c8b084')); linea(a + 1, 89, b + 1, 121, hex('#8a7450')); pset(b, 122, CC.hierroL); }
  } else {
    // las trincas sueltas, tiradas en ondas sobre la lona y la cubierta
    for (const [x0, y0, dx, k] of [[126, 106, -1, 0], [178, 106, 1, 1]]) { let px = x0, py = y0; for (let i = 0; i < 26; i++) { const nx = x0 + dx * i * 1.2, ny = y0 + i * 0.6 + Math.sin(i * 0.7 + k) * 2.2; linea(Math.round(px), Math.round(py), Math.round(nx), Math.round(ny), hex('#c8b084')); pset(Math.round(nx), Math.round(ny) + 1, hex('#7a6444')); px = nx; py = ny; } }
    for (const x of [118, 186]) { R.anillo(x, 122, 1.6, CC.hierroL); }
  }
  // 6 · el palo mayor: redondo con su luz y su sombra, los zunchos, la fogonadura y las cuñas; la botavara con la vela
  // cangreja aferrada y sus tomadores, y la escota
  for (let y = 0; y <= 110; y++) for (let x = 208; x <= 217; x++) pset(x, y, x === 208 || x === 217 ? C.k : x < 210 ? hex('#e0c094') : x < 213 ? hex('#c09a68') : x < 215 ? hex('#a07e50') : hex('#6e5434'));
  for (let y = 4; y < 110; y += 7) if (h(y, 2, 70) < 0.6) pset(211 + (y % 3), y, hex('#8a6a42'));
  for (const y of [20, 44, 86]) { rect(207, y, 218, y + 2, CC.hierro); rect(207, y, 218, y, CC.hierroL); pset(217, y + 1, CC.hierroS); }
  rect(204, 106, 221, 112, C.k); rect(205, 107, 220, 111, hex('#3a3430')); rect(205, 107, 220, 107, hex('#6a625a')); for (let x = 206; x < 220; x += 3) pset(x, 109, hex('#22201e'));
  rect(218, 64, 319, 68, C.k); rect(218, 65, 319, 67, hex('#a07a4a')); rect(218, 65, 319, 65, hex('#d0aa78'));
  for (let x = 220; x < 320; x++) { const top = 56 + Math.round(Math.sin(x * 0.21) * 1.2 + Math.sin(x * 0.07) * 1); for (let y = top; y < 64; y++) pset(x, y, y === top ? hex('#fbf4e2') : y < top + 3 ? C.lona : y > 61 ? C.lonaS : hex('#ddd2b8')); pset(x, top - 1, C.k); }
  for (let x = 228; x < 320; x += 13) { linea(x, 55, x + 2, 64, hex('#6a5a44')); linea(x + 1, 55, x + 3, 64, hex('#9a8a6a')); }
  rect(218, 58, 221, 68, hex('#6a4428'));
  // 7 · la caseta del camarote: el techo de lona embreada con la lumbrera y la chimenea de la estufa, el alero, las
  // paredes blancas de tablas machihembradas, los cantones de madera, la puerta de cuarterones y las dos ventanillas
  rect(224, 80, 297, 87, C.k); for (let y = 81; y <= 86; y++) for (let x = 225; x <= 296; x++) pset(x, y, y === 81 ? hex('#9a907e') : h(x >> 2, y, 71) < 0.15 ? hex('#5a5248') : hex('#6e6458'));
  rect(223, 87, 298, 89, hex('#4a3a2c')); rect(223, 87, 298, 87, hex('#8a6a4a'));
  for (let y = 90; y <= 125; y++) for (let x = 226; x <= 296; x++) pset(x, y, (x - 226) % 5 === 4 ? hex('#6a4a2e') : (x - 226) % 5 === 0 ? hex('#c49a68') : h(x, y >> 1, 72) < 0.06 ? hex('#8a6440') : h(x >> 2, y >> 3, 172) < 0.3 ? hex('#a07a4e') : hex('#ac845a'));
  for (let y = 90; y <= 96; y++) for (let x = 226; x <= 296; x++) if (c_b4(x, y) < 0.5 - (y - 90) * 0.08) pset(x, y, c_mez(R.pget(x, y), C.k, 0.25));
  rect(224, 89, 226, 126, hex('#6a4428')); rect(224, 89, 224, 126, hex('#9a6c44')); rect(295, 89, 297, 126, hex('#6a4428')); rect(297, 89, 297, 126, hex('#3a2416')); rect(224, 124, 297, 126, hex('#4a3020')); rect(224, 124, 297, 124, hex('#7a5232'));
  rect(232, 93, 251, 126, C.k); rect(233, 94, 250, 125, hex('#6a4428'));
  for (const [a, b] of [[94, 107], [110, 123]]) for (const [c, d] of [[235, 240], [243, 248]]) { rect(c, a + 1, d, b, hex('#5a3820')); rect(c, a + 1, d, a + 1, hex('#8a5e3a')); rect(c, a + 1, c, b, hex('#8a5e3a')); }
  pset(247, 109, CC.latonL); pset(247, 110, CC.laton); rect(232, 93, 251, 93, hex('#9a6c44'));
  if (hall) { rect(244, 94, 250, 125, hex('#1a120c')); rect(244, 94, 244, 125, hex('#4a3020')); for (let y = 100; y < 124; y += 4) pset(247 + (y % 3), y, hex('#2e2016')); }
  const ventana = (x0) => { rect(x0, 96, x0 + 13, 109, hex('#4a3020')); rect(x0 + 1, 97, x0 + 12, 108, hex('#7a5a3a')); for (let y = 98; y <= 107; y++) for (let x = x0 + 2; x <= x0 + 11; x++) pset(x, y, (x - x0) - (y - 98) * 0.6 > 4 && (x - x0) - (y - 98) * 0.6 < 7 ? hex('#c8d2dc') : y < 102 ? hex('#8a98a8') : hex('#5a6878')); rect(x0 + 2, 98, x0 + 3, 107, hex('#9a3a32')); rect(x0 + 10, 98, x0 + 11, 107, hex('#9a3a32')); rect(x0 + 6, 98, x0 + 7, 107, hex('#4a3020')); rect(x0 + 2, 102, x0 + 11, 102, hex('#4a3020')); rect(x0 - 1, 110, x0 + 14, 111, hex('#6a4428')); rect(x0 - 1, 110, x0 + 14, 110, hex('#9a6c44')); };
  ventana(258); ventana(278);
  rect(254, 74, 290, 81, C.k); rect(255, 75, 289, 80, hex('#7a5a3a')); rect(255, 75, 289, 75, hex('#a8845a')); for (let x = 257; x < 288; x += 8) { rect(x, 76, x + 5, 79, hex('#8a98a8')); rect(x, 76, x + 5, 76, hex('#c8d2dc')); rect(x + 2, 76, x + 2, 79, CC.latonS); }
  rect(236, 64, 239, 80, C.k); rect(237, 65, 238, 80, CC.hierro); pset(237, 66, CC.hierroL); rect(234, 62, 241, 64, C.k); rect(235, 63, 240, 63, CC.hierroS);
  // 8 · la popa: la rueda del timón la pinta cada fotograma; aquí, su pedestal, la bitácora de latón y las adujas
  rect(306, 98, 313, 118, C.k); rect(307, 99, 312, 118, hex('#6a4428')); rect(307, 99, 307, 118, hex('#9a6c44')); rect(304, 116, 315, 119, hex('#4a3020'));
  rect(298, 104, 304, 118, C.k); rect(299, 106, 303, 118, hex('#8a5e3a')); disco(301, 104, 3, C.k); disco(301, 104, 2, CC.laton); pset(300, 103, CC.latonL); c_sombra(R, 306, 120, 12, 2, 0.35);
  c_aduja(R, 300, 132, 9, 4, 1); c_aduja(R, 96, 108, 6, 3, 2);
  // 9 · la bomba al pie del palo: entera (viaje: el cuerpo con sus zunchos, el caño y la palanca) o desmontada (hallazgo:
  // el cuerpo abierto y las piezas por la cubierta: el vástago, el cuero del émbolo, la palanca, los pernos)
  rect(191, 96, 203, 115, C.k); rect(192, 97, 202, 114, hex('#8a6a46')); rect(192, 97, 193, 114, hex('#b08a5a')); rect(201, 97, 202, 114, hex('#5a4028')); for (const y of [100, 108]) { rect(191, y, 203, y + 1, CC.hierro); rect(191, y, 203, y, CC.hierroL); }
  rect(186, 106, 191, 108, C.k); rect(187, 107, 191, 107, hex('#6a4a30'));
  if (!hall) { rect(195, 92, 199, 96, CC.hierro); linea(197, 93, 178, 86, C.k); linea(197, 92, 178, 85, CC.hierroL); rect(175, 84, 179, 87, hex('#6a4428')); pset(176, 84, hex('#9a6c44')); }
  else { rect(193, 97, 201, 99, CC.negro); linea(174, 129, 197, 125, C.k); linea(174, 128, 197, 124, CC.hierroL); disco(171, 129, 3, C.k); disco(171, 129, 2, hex('#7a4a2a')); pset(170, 128, hex('#b07a4a'));
    linea(218, 131, 244, 126, C.k); linea(218, 130, 244, 125, CC.hierro); rect(242, 124, 247, 127, hex('#6a4428'));
    for (const [x, y] of [[204, 130], [208, 133], [186, 133], [213, 128], [230, 135]]) { pset(x, y, CC.hierroL); pset(x + 1, y, CC.hierro); pset(x, y + 1, CC.hierroS); }
    c_sombra(R, 186, 131, 14, 2, 0.25); c_sombra(R, 232, 132, 14, 2, 0.25); }
  c_sombra(R, 197, 117, 9, 2, 0.35);
  // 10 · la escotilla del lazareto (a popa, delante de la caseta) y un cubo de madera con sus aros
  brazola(250, 128, 272, 138); if (hall) { hueco(253, 131, 269, 134); tapa([[278, 134], [298, 131], [300, 139], [280, 142]]); } else lona(253, 131, 269, 134);
  { const x = 86, y = 122; rect(x - 4, y - 6, x + 4, y + 2, C.k); rect(x - 3, y - 5, x + 3, y + 1, hex('#a87c48')); rect(x - 3, y - 5, x - 2, y + 1, hex('#d0a46a')); rect(x - 3, y - 3, x + 3, y - 3, CC.hierro); rect(x - 3, y, x + 3, y, CC.hierro); rect(x - 3, y - 6, x + 3, y - 6, hex('#5a4028')); linea(x - 4, y - 6, x, y - 10, CC.cabo); linea(x, y - 10, x + 4, y - 6, CC.cabo); c_sombra(R, x + 1, y + 3, 6, 1, 0.3); }
  // 11 · en el hallazgo: la varilla de sondeo tirada, los charcos que reflejan el cielo y los cabos colgando por la borda
  if (hall) {
    for (const [cx, cy, rx, ry] of [[140, 152, 22, 3], [214, 146, 14, 2], [72, 160, 16, 2], [262, 158, 18, 3], [118, 100, 26, 1]]) for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(1 - (j / (ry + 0.5)) ** 2)); for (let x = cx - w; x <= cx + w; x++) { const c = R.pget(x, cy + j); if (c !== c_VACIO && h(x, cy + j, 73) < 0.9) pset(x, cy + j, c_mez(c, v.luz === 'dia' ? hex('#7aa4c8') : hex('#7a8898'), 0.55)); } }
    linea(52, 145, 98, 139, C.k); linea(52, 144, 98, 138, CC.hierroL); linea(52, 145, 70, 143, hex('#2a2a32')); for (let k = 1; k < 7; k++) { const x = 52 + k * 7, y = Math.round(145 - k * 0.85); pset(x, y - 2, C.k); } R.anillo(100, 138, 1.8, CC.hierroL); c_sombra(R, 76, 146, 24, 1, 0.3);
    for (const x of [144, 252]) { linea(x, 84, x + 3, 75, hex('#c8b084')); linea(x + 3, 75, x + 6, 74, hex('#c8b084')); linea(x + 1, 84, x + 4, 76, hex('#7a6444')); }
  }
  // 12 · la borda de este costado (la repinta abordoDelante por delante de los actores)
  c_bordaCerca(R);
  // la luz: con cielo gris, todo un poco más frío y apagado
  if (v.luz === 'gris') for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y); if (c !== c_VACIO) pset(x, y, c_mez(c, hex('#6c7686'), 0.14)); }
}

// la borda de este costado, abajo: la regala barnizada con su brillo, la cara interior con los candeleros y un cabillero
// con sus cabillas y adujas colgadas
function c_bordaCerca(R) {
  const { rect, pset, linea } = R;
  for (let y = 170; y <= 179; y++) for (let x = 0; x < 320; x++) pset(x, y, (y - 170) % 4 === 3 ? hex('#9a907c') : h(x >> 1, y, 74) < 0.05 ? hex('#a89880') : hex('#c8bea8'));
  for (let x = 10; x < 320; x += 30) { rect(x, 170, x + 4, 179, hex('#a89e88')); rect(x, 170, x, 179, CC.blancoL); rect(x + 4, 170, x + 4, 179, hex('#7a705e')); }
  rect(0, 165, 319, 169, C.k); rect(0, 166, 319, 168, hex('#5e3c24')); rect(0, 166, 319, 166, hex('#b0804e')); rect(0, 167, 319, 167, hex('#7a5234'));
  for (let x = 0; x < 320; x++) if (h(x, 4, 75) < 0.1) pset(x, 167, hex('#a07048'));
  for (const [x0, x1] of [[120, 160], [222, 262]]) { rect(x0, 171, x1, 173, hex('#6a4428')); rect(x0, 171, x1, 171, hex('#9a6c44')); for (let x = x0 + 3; x < x1; x += 6) { rect(x, 168, x, 176, hex('#d8c8a0')); pset(x, 168, hex('#f0e4c0')); if (h(x, 5, 75) < 0.5) for (let k = 0; k < 3; k++) linea(x - 1 + k, 174, x - 2 + k * 2, 179, k === 1 ? hex('#c8b084') : hex('#8a7450')); } }
}

// la vela de estay rota que flamea (hallazgo): la parte de arriba entera con sus paños, el borde roto y jirones que el
// viento agita; o tensa y aferrada a su estay (viaje)
function c_velaEstay(R, t, hall) {
  const { linea, poligono, pset } = R, hd = [204, 20], tk = [112, 61];
  linea(209, 18, 14, 104, CC.cabo); linea(209, 19, 14, 105, hex('#4a4440'));
  if (!hall) { for (let i = 0; i <= 50; i++) { const x = Math.round(204 - i * 1.84), y = Math.round(20 + i * 0.81) + 1; pset(x, y, C.lonaS); pset(x, y + 1, C.lona); if (i % 6 === 0) pset(x, y - 1, hex('#6a5a44')); } return; }
  const ond = (u, k) => Math.sin(t * 7 + u * 9 + k) * (2 + u * 3), cl = [194 + Math.round(Math.sin(t * 3.1) * 3), 46 + Math.round(Math.sin(t * 4.3) * 2)];
  const roto = [[146 + Math.round(ond(0.2, 1)), 54 + Math.round(ond(0.3, 2))], [166, 53 + Math.round(ond(0.5, 3))], [cl[0] - 10, cl[1] + 2 + Math.round(ond(0.7, 4))], cl];
  const pts = [hd, [150, 44], roto[0], roto[1], roto[2], roto[3]];
  poligono(pts, (x, y) => { const s = (x * 0.55 + y) % 9, l = Math.sin(t * 7 + x * 0.12 - y * 0.05); return s < 1 ? C.lonaS : l > 0.6 ? hex('#fbf4e2') : l < -0.5 ? C.lonaS : C.lona; });
  for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; linea(a[0], a[1], b[0], b[1], i === 0 ? hex('#8a7a60') : C.lonaS); }
  // los jirones: cuatro tiras de lona de tres píxeles que cuelgan del borde roto y ondean con el viento
  for (let k = 0; k < 4; k++) { const u = (k + 0.5) / 4, x0 = Math.round(roto[0][0] + (cl[0] - roto[0][0]) * u), y0 = Math.round(roto[0][1] + (cl[1] - roto[0][1]) * u), L = 10 + Math.round(h(k, 2, 76) * 8);
    for (let j = 0; j <= L; j++) { const x = Math.round(x0 - j * 0.5 + Math.sin(t * 7 + j * 0.45 + k * 1.9) * (0.5 + j * 0.2)), y = y0 + j, w = j > L - 3 ? 1 : 2; R.rect(x - w, y, x + 1, y, (j + k) % 5 === 0 ? C.lonaS : C.lona); pset(x - w - 1, y, hex('#8a7a60')); pset(x + 2, y, C.lonaS); } }
  linea(cl[0], cl[1], cl[0] + 3 + Math.round(Math.sin(t * 5) * 4), cl[1] + 14, hex('#8a7450'));
}

// la cubierta, cada fotograma: cielo, nubes, gaviotas, el barco lejano y el humo; encima, lo fijo; y lo que se mueve
function c_cubierta(R, t, o, v) {
  const S = c_capa(R, 'cub.' + v.est + '.' + v.luz, () => c_cubiertaFija(R, v)), cur = c_actual(R), hor = c_horizonte(t, C_HOR);
  // el cielo y el mar (solo arriba, donde el decorado fijo deja ver)
  c_cieloMar(R, cur, t, v.luz, 0, 98, hor);
  // las nubes a tres velocidades (lejos de la esquina de Atom) y las gaviotas
  const NB = CC.nube[v.luz];
  for (const [x0, y, w, vel, k] of [[30, 30, 46, 0.6, 0], [210, 18, 30, 0.6, 1], [250, 24, 40, 1.2, 2], [130, 34, 54, 1.2, 3], [200, 42, 28, 2.1, 4], [10, 44, 36, 2.1, 5], [320, 36, 30, 1.2, 6], [380, 22, 26, 0.6, 7]]) {
    const cx = ((x0 + t * vel) % 420 + 420) % 420 - 50; if (cx > 250 && y < 46) continue; if (y < 28 && cx - w * 0.6 < 176) continue; c_nube(R, cx, y + Math.round(hor(cx) - C_HOR), w, NB); }
  { const cs = CC.cielo[v.luz]; for (let y = 0; y < 50; y++) for (let x = 272; x < 320; x++) { const i = y * 320 + x; const v2 = Math.max(0, Math.min(1, y / hor(x))) * (cs.length - 1), a = Math.floor(v2); if (x > 276 || h(x, y, 77) < 0.5) cur[i] = cs[Math.min(cs.length - 1, a + ((v2 - a) > c_b4(x, y) ? 1 : 0))]; } }
  for (let k = 0; k < 3; k++) { const u = ((t * (0.018 + k * 0.006) + k * 0.37) % 1), x = Math.round(-10 + u * 290), y = Math.round(47 + k * 3 + Math.sin(t * 0.8 + k) * 2); c_gaviotaVuela(R, x, y, t, k, v.luz === 'dia' ? hex('#f6f8fa') : hex('#3a404a')); }
  // a lo lejos: el Dei Gratia (hallazgo) o una goleta (viaje), que cabecean en el horizonte
  { const bx = v.hall ? 62 : 140, by = Math.round(hor(bx)) + 1 + Math.round(Math.sin(t * 1.3) * 0.6), casco = v.hall ? C.verdeDG : hex('#3a3a40'), vel = v.luz === 'dia' ? hex('#f8f6ee') : hex('#d8d6cc');
    R.rect(bx - 9, by - 2, bx + 9, by, casco); R.pset(bx - 10, by - 2, casco); R.pset(bx + 10, by - 3, casco); R.rect(bx - 9, by - 2, bx + 9, by - 2, c_mez(casco, C.blanco, 0.4));
    for (const [mx, hh] of [[-4, 14], [4, 12]]) { R.rect(bx + mx, by - 2 - hh, bx + mx, by - 2, hex('#3a3430')); for (let j = 0; j < hh - 3; j += 4) R.rect(bx + mx - 3 + (j >> 3), by - hh + j, bx + mx + 3 - (j >> 3), by - hh + j + 2, vel); }
    R.linea(bx + 9, by - 3, bx + 15, by - 8, hex('#3a3430')); R.poligono([[bx + 8, by - 4], [bx + 14, by - 8], [bx + 9, by - 10]], vel); }
  // el humo de la estufa (viaje), que se va hacia proa y se deshace
  if (!v.hall) for (let k = 0; k < 7; k++) { const u = ((t * 0.35 + k / 7) % 1), x = Math.round(237 - u * 46 + Math.sin(t * 2 + k) * 2), y = Math.round(60 - u * 26), r = 1.5 + u * 4; if (u < 0.92) R.disco(x, y, r, c_mez(hex('#8a8a90'), CC.cielo[v.luz][2], u * 0.8)); }
  // el decorado fijo por encima, y entero de la cubierta para abajo
  for (let i = 0; i < 320 * 99; i++) { const c = S[i]; if (c !== c_VACIO) cur[i] = c; }
  cur.set(S.subarray(320 * 99), 320 * 99);
  // la vela de estay, la ropa tendida (viaje) y la rueda del timón
  c_velaEstay(R, t, v.hall);
  if (!v.hall) { R.linea(124, 72, 188, 64, hex('#6a5a44')); const ropa = [[132, C.lona, 7, 8], [144, hex('#5a6a8a'), 6, 10], [156, hex('#9ac0e0'), 5, 7], [166, hex('#b84a3a'), 7, 8], [178, C.lona, 6, 6]];
    for (const [x, c, w, hh] of ropa) { const y = Math.round(72 - (x - 124) * 0.125), sw = Math.sin(t * 3 + x * 0.3); for (let j = 0; j < hh; j++) { const dx = Math.round(sw * j * 0.25); R.rect(x + dx, y + j, x + w + dx, y + j, j === hh - 1 ? c_mez(c, C.k, 0.3) : (j + x) % 3 === 0 ? c_mez(c, C.blanco, 0.2) : c); } R.pset(x + 1, y - 1, hex('#8a6a42')); R.pset(x + w - 1, y - 1, hex('#8a6a42')); } }
  { const cx = 310, cy = 92, a = v.hall ? t * 0.7 + Math.sin(t * 0.9) * 0.8 : Math.sin(t * 0.5) * 0.3;
    for (let k = 0; k < 8; k++) { const an = a + k * Math.PI / 4, ca = Math.cos(an), sa = Math.sin(an); R.linea(cx, cy, Math.round(cx + ca * 13), Math.round(cy + sa * 13), hex('#5a3a22')); R.disco(cx + ca * 14, cy + sa * 14, 1.2, hex('#a07a4a')); }
    R.anillo(cx, cy, 9.5, C.k); R.anillo(cx, cy, 8.6, hex('#8a5e3a')); R.anillo(cx, cy, 7.8, hex('#6a4428')); R.disco(cx, cy, 2.5, C.k); R.disco(cx, cy, 1.6, CC.laton); }
  // el agua que chapotea en el trancanil y entra por los imbornales (más en el hallazgo); brillos en los charcos
  { const nivel = v.hall ? 1 : 0.35, s = Math.sin(t * 0.55);
    for (let x = 30; x < 190; x++) { if (x > 37 && x < 59) continue; const a = nivel * (0.45 + s * (x - 110) / 160) * 3; if (a < 0.6) continue; const top = Math.round(97 - Math.min(2, a)); for (let y = top; y <= 97; y++) R.pset(x, y, y === top ? (h(x, Math.floor(t * 6), 78) < 0.2 ? CC.aguaL : hex('#7a90a2')) : CC.agua); }
    if (v.hall) { for (let x = 78; x < 190; x += 34) { const f = (t * 1.3 + x * 0.05) % 2; if (f < 0.8) for (let k = 0; k < 4; k++) R.pset(x + 1 + k - Math.round(f * 2), 98 + Math.round(f * 3) + (k & 1), k % 2 ? CC.aguaL : CC.espuma); }
      for (let k = 0; k < 14; k++) { const x = Math.round([140, 214, 72, 262, 118][k % 5] + (h(k, 1, 79) - 0.5) * 30), y = [152, 146, 160, 158, 100][k % 5] + Math.round((h(k, 2, 79) - 0.5) * 3); if (Math.sin(t * 3 + k * 1.7) > 0.7) R.pset(x, y, C.blanco); } } }
  // la puerta entornada que se mueve con el balanceo (hallazgo)
  if (v.hall) { const g = Math.round(2 + Math.sin(t * 0.55) * 2); R.rect(244 - g, 94, 244, 125, hex('#1a120c')); R.rect(244 - g, 94, 244 - g, 125, hex('#4a3020')); }
  // la gaviota que pasea por la regala, picotea y se rasca
  { const u = (t * 0.12) % 2, dir = u < 1 ? 1 : -1, gx = Math.round(130 + (u < 1 ? u : 2 - u) * 34), gy = 74, pic = Math.sin(t * 2.3) > 0.85 ? 1 : 0, paso = Math.floor(t * 4) % 2;
    R.rect(gx - 3, gy - 3, gx + 2, gy - 1, C.k); R.rect(gx - 2, gy - 3, gx + 1, gy - 2, hex('#f2f2ee')); R.rect(gx - 3, gy - 2, gx - 1, gy - 2, hex('#8a929c')); R.pset(gx - 4 * dir, gy - 2, hex('#3a3a40'));
    const hx = gx + 3 * dir, hy = gy - 4 + pic; R.rect(hx - 1, hy, hx + 1, hy + 1, hex('#f8f8f4')); R.pset(hx + 2 * dir, hy + 1, hex('#e8b830')); R.pset(hx, hy, C.k); R.pset(gx - 1 + paso, gy, hex('#e0a050')); R.pset(gx + 1 - paso, gy, hex('#e0a050')); }
}

// lo de delante en la cubierta: la borda de este costado (y, con o.subida, el trozo de la de enfrente junto al portalón,
// para que quien sube asome por detrás de la regala)
function c_cubiertaDelante(R, t, o, v) {
  c_bordaCerca(R);
  if (o.subida) { const S = c_capa(R, 'cub.' + v.est + '.' + v.luz, () => c_cubiertaFija(R, v)), cur = c_actual(R);
    for (let y = 72; y <= 97; y++) for (let x = 24; x <= 72; x++) { const i = y * 320 + x; if (S[i] !== c_VACIO && (x < 40 || x > 56 || y > 93)) cur[i] = S[i]; } }
}

// la cubierta de cerca, fija: tablas, borda, escotilla abierta y su tapa; LA BOMBA DESMONTADA: el cuerpo de madera en
// su sitio con la boca abierta (la tapa de hierro quitada, boca abajo al lado) y, en fila sobre una lona, la palanca, el
// émbolo con su cuero, la varilla de la bomba, la válvula, los pernos con sus tuercas y la llave; la caja de
// herramientas abierta; la mancha mojada bajo la sonda, la aduja de su cabo y el cubo volcado
function c_bombaFija(R, v) {
  const { rect, pset, linea, disco, poligono } = R;
  c_tablas(R, 0, 319, 0, 179, () => 11, CC.cub, 2, 60);
  // las cabezas de las cabillas de las tablas (tapones claros) y unas manchas de brea
  for (let y = 5; y < 160; y += 11) for (let x = 7 + (y * 3) % 23; x < 320; x += 23 + Math.round(h(x, y, 300) * 30)) { pset(x, y, hex('#d8bc8c')); pset(x + 1, y + 1, hex('#8a6a44')); }
  for (const [x, y, r] of [[118, 112, 4], [232, 146, 3], [86, 158, 3], [176, 18, 3]]) c_sombra(R, x, y, r + 2, Math.max(1, r >> 1), 0.25, hex('#3a2a1c'));
  // la borda abajo vista desde arriba: el trancanil, la regala y los imbornales por donde entra el agua
  rect(0, 160, 319, 166, hex('#7a6a58')); rect(0, 160, 319, 160, hex('#9a8a74')); rect(0, 166, 319, 166, hex('#4a3e32'));
  for (let x = 0; x < 320; x++) if (h(x >> 1, 3, 301) < 0.12) pset(x, 163, hex('#6a5a48'));
  for (let y = 167; y <= 179; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 169 ? hex('#3a2416') : y === 169 ? hex('#b0804e') : (y - 170) % 3 === 2 ? hex('#5e3c24') : h(x >> 2, y, 80) < 0.15 ? hex('#8a6040') : hex('#74502e'));
  for (const x of [40, 150, 260]) { rect(x - 6, 162, x + 6, 166, CC.negro); rect(x - 6, 162, x + 6, 162, hex('#2a1e14')); }
  // los candeleros de la borda, con su cabeza de hierro, y una cornamusa con su cabo hecho firme
  for (let x = 20; x < 320; x += 44) { rect(x - 2, 168, x + 2, 172, C.k); rect(x - 1, 169, x + 1, 171, CC.hierro); pset(x - 1, 169, CC.hierroL); }
  { const x = 96, y = 154; rect(x - 8, y, x + 8, y + 3, C.k); rect(x - 7, y + 1, x + 7, y + 2, hex('#6a4428')); rect(x - 7, y + 1, x + 7, y + 1, hex('#a07448')); rect(x - 2, y + 3, x + 2, y + 5, C.k);
    for (let k = 0; k < 4; k++) { linea(x - 6 + k * 3, y - 1, x - 3 + k * 3, y + 4, hex('#c8b084')); pset(x - 5 + k * 3, y + 1, hex('#5a4a34')); } linea(x + 8, y + 2, x + 20, y + 6, hex('#9a8460')); linea(x + 20, y + 6, x + 34, y + 5, hex('#9a8460')); c_sombra(R, x + 2, y + 6, 10, 1, 0.3); }
  // la escotilla abierta arriba a la izquierda: la brazola gruesa con su canto de hierro y, abajo, los barriles en la penumbra
  rect(0, 26, 66, 92, C.k); rect(0, 27, 64, 90, hex('#a8885c')); rect(0, 27, 64, 28, C.tablaL); rect(0, 86, 64, 90, hex('#7a5a38')); rect(62, 27, 64, 90, hex('#7a5a38')); rect(0, 31, 59, 85, CC.negro);
  for (let y = 31; y <= 85; y++) for (let x = 0; x <= 59; x++) if (c_b4(x, y) < 0.25 - (y - 31) * 0.003) pset(x, y, hex('#22160e'));
  for (const [cx, cy] of [[10, 60], [30, 64], [50, 58], [20, 80], [42, 82]]) { R.anillo(cx, cy, 7, hex('#3a2818')); R.anillo(cx, cy, 6, hex('#2a1e14')); pset(cx - 3, cy - 4, hex('#5a4028')); }
  rect(4, 31, 6, 85, hex('#3a2818')); rect(14, 31, 16, 85, hex('#3a2818')); for (let y = 34; y < 85; y += 7) rect(4, y, 16, y + 1, hex('#5a3e24'));
  rect(0, 26, 66, 26, CC.hierroL); rect(66, 26, 66, 92, CC.hierro);
  for (const y of [34, 58, 82]) { rect(64, y, 67, y + 2, CC.hierroS); pset(65, y, CC.hierroL); }
  c_sombra(R, 34, 95, 34, 3, 0.35);
  // la tapa de la escotilla, tirada: las tablas, los listones y la argolla
  poligono([[78, 24], [140, 30], [134, 72], [72, 66]], C.k); poligono([[79, 26], [138, 31], [132, 70], [74, 64]], (x, y) => ((x * 0.1 + y) % 9 < 1 ? hex('#6a4a2e') : h(x >> 2, y, 81) < 0.1 ? hex('#c8a878') : hex('#a8885c')));
  for (const [a, b] of [[[86, 28], [80, 64]], [[128, 31], [122, 68]]]) { linea(a[0], a[1], b[0], b[1], CC.hierro); linea(a[0] + 1, a[1], b[0] + 1, b[1], CC.hierroL); }
  R.anillo(106, 48, 3, CC.hierroL); R.anillo(106, 48, 2.2, CC.hierroS); c_sombra(R, 104, 70, 32, 3, 0.35);
  // la caja de herramientas abierta: el asa de travesaño, el mazo de calafate, dos formones y una lata de sebo
  { const x0 = 148, y0 = 33; c_sombra(R, x0 + 16, y0 + 18, 16, 2, 0.4);
    rect(x0, y0, x0 + 28, y0 + 15, C.k); rect(x0 + 1, y0 + 1, x0 + 27, y0 + 9, hex('#2a1a10')); rect(x0 + 1, y0 + 1, x0 + 27, y0 + 2, hex('#a07448')); rect(x0 + 1, y0 + 10, x0 + 27, y0 + 14, hex('#7a5234')); rect(x0 + 1, y0 + 10, x0 + 27, y0 + 10, hex('#b08a5a'));
    for (let x = x0 + 2; x < x0 + 27; x++) if (h(x, 1, 308) < 0.2) pset(x, y0 + 12, hex('#5a3a22'));
    rect(x0 + 13, y0 - 4, x0 + 14, y0 + 9, hex('#9a6c44')); rect(x0 + 12, y0 - 5, x0 + 15, y0 - 4, hex('#c8a070')); pset(x0 + 13, y0 - 5, hex('#e8c898'));
    rect(x0 + 3, y0 + 3, x0 + 9, y0 + 6, hex('#e0c498')); rect(x0 + 3, y0 + 6, x0 + 9, y0 + 6, hex('#a8784a')); pset(x0 + 3, y0 + 3, C.blanco); linea(x0 + 6, y0 + 7, x0 + 11, y0 + 9, hex('#c8a070'));
    for (const k of [0, 5]) { linea(x0 + 17 + k, y0 + 3, x0 + 18 + k, y0 + 6, hex('#e8c080')); linea(x0 + 19 + k, y0 + 7, x0 + 19 + k, y0 + 8, hex('#d8dce4')); }
    disco(x0 + 36, y0 + 9, 3, C.k); disco(x0 + 36, y0 + 9, 2, CC.hierroL); pset(x0 + 35, y0 + 8, C.blanco); pset(x0 + 36, y0 + 9, hex('#e8dcb0')); c_sombra(R, x0 + 38, y0 + 12, 4, 1, 0.35); }
  // el cuerpo de la bomba, en su sitio junto al palo: la caja de madera de tablas con dos zunchos de hierro, la boca
  // de arriba ABIERTA (el reborde de hierro con los agujeros de los pernos vacíos y el pozo negro con agua al fondo, que
  // pinta cada fotograma), el caño de desagüe por delante y el pie de hierro atornillado a la cubierta
  { c_sombra(R, 214, 62, 18, 4, 0.4);
    rect(188, 57, 222, 61, C.k); rect(189, 58, 221, 60, CC.hierro); rect(189, 58, 221, 58, CC.hierroL); for (const x of [191, 219]) { pset(x, 59, CC.hierroS); pset(x, 58, C.blanco); }
    poligono([[218, 32], [225, 23], [225, 51], [218, 59]], C.k); poligono([[219, 32], [224, 25], [224, 51], [219, 57]], (x, y) => (h(x, y >> 2, 302) < 0.12 ? hex('#5a3e24') : hex('#6a4a2e')));
    rect(191, 31, 218, 58, C.k); for (let y = 32; y <= 57; y++) for (let x = 192; x <= 217; x++) { const p = (x - 192) % 6; let c = p === 0 ? hex('#5a3e24') : p === 1 ? hex('#c8a474') : hex('#9a7a50'); if (h(x, y >> 1, 303) < 0.1) c = hex('#7a5a38'); if (x > 213) c = c_mez(c, C.k, 0.2); pset(x, y, c); }
    poligono([[191, 31], [218, 31], [225, 22], [198, 22]], C.k); poligono([[193, 30], [217, 30], [223, 23], [199, 23]], hex('#c09a68')); linea(193, 30, 217, 30, hex('#e0c498'));
    for (const y of [36, 52]) { rect(191, y, 218, y + 1, CC.hierroS); rect(191, y, 218, y, CC.hierroL); linea(218, y, 225, y - 9 + (y > 40 ? 1 : 0), CC.hierroS); for (const x of [195, 207]) { pset(x, y, C.k); pset(x, y + 1, CC.hierroL); } }
    // la boca abierta: el cuello de hierro del cilindro que asoma (su canto en sombra), el reborde con los cuatro
    // agujeros de los pernos, vacíos, y el pozo negro
    for (let i = -9; i <= 9; i++) { const yb = 26 + Math.round(4 * Math.sqrt(Math.max(0, 1 - (i / 9.5) ** 2))); for (let y = yb; y <= yb + 3; y++) pset(208 + i, y, y === yb + 3 ? C.k : i < -5 ? CC.hierroL : i > 5 ? CC.hierroS : CC.hierro); }
    for (let j = -4; j <= 4; j++) for (let i = -9; i <= 9; i++) { const d = (i / 9) ** 2 + (j / 4) ** 2; if (d > 1) continue; pset(208 + i, 26 + j, d > 0.55 ? (j < 0 ? CC.hierroL : CC.hierro) : CC.negro); }
    for (const [i, j] of [[-7, -1], [7, -1], [-3, 3], [3, 3]]) pset(208 + i, 26 + j, C.k);
    for (let i = -5; i <= 5; i++) pset(208 + i, 23, c_mez(CC.hierroL, C.blanco, 0.4));
    // el caño de desagüe, que sale por delante: la caja del caño con su luz y la boca negra al final
    rect(200, 43, 210, 54, C.k); rect(201, 44, 209, 49, hex('#c8a474')); rect(201, 44, 209, 44, hex('#e8c898')); rect(201, 50, 209, 53, hex('#6a4a2e')); rect(203, 51, 207, 53, CC.negro); rect(209, 45, 209, 53, hex('#4a3020')); }
  // la tapa de la bomba, quitada: un disco de hierro boca abajo, con su reborde, el resalte y los agujeros de los pernos
  { const cx = 248, cy = 53; c_sombra(R, cx + 3, cy + 4, 11, 4, 0.4);
    for (let j = -5; j <= 6; j++) for (let i = -10; i <= 10; i++) { const d = (i / 10) ** 2 + (j / 5) ** 2, d2 = (i / 10) ** 2 + ((j - 1.5) / 5) ** 2; if (d > 1 && d2 > 1) continue; pset(cx + i, cy + j, d > 1 ? CC.hierroS : d > 0.62 ? (i + j < 0 ? CC.hierroL : CC.hierro) : d > 0.2 ? hex('#3a3a42') : CC.hierro); }
    pset(cx - 1, cy - 1, CC.hierroL); for (const [i, j] of [[-8, 0], [8, 0], [0, -4], [0, 4]]) { pset(cx + i, cy + j, C.k); } for (let i = -6; i <= -2; i++) pset(cx + i, cy - 4, C.blanco); }
  // la lona con las piezas EN FILA: la tela con su trama, el dobladillo con sus ollaos y un pliegue
  { const P = [c_lona(0, 0), c_lona(146, 0), c_lona(146, 22), c_lona(0, 22)];
    c_sombra(R, 202, 92, 74, 4, 0.3);
    poligono(P.map(([x, y]) => [x + 2, y + 2]), hex('#5a4a34'));
    poligono(P, C.k); poligono([[P[0][0] + 1, P[0][1] + 1], [P[1][0] - 1, P[1][1] + 1], [P[2][0] - 1, P[2][1] - 1], [P[3][0] + 1, P[3][1] - 1]], (x, y) => { const w = ((x + y * 2) % 3 === 0) || ((x * 2 - y) % 5 === 0); let c = w ? hex('#c8bc9a') : hex('#ddd2b2'); if (h(x >> 2, y >> 1, 304) < 0.06) c = hex('#b8a888'); return c; });
    for (let u = 1; u < 146; u++) { const [x, y] = c_lona(u, 1.5), [x2, y2] = c_lona(u, 20.5); pset(x, y, hex('#b0a282')); pset(x2, y2, hex('#b0a282')); }
    for (let u = 6; u < 146; u += 20) { const [x, y] = c_lona(u, 1.5), [x2, y2] = c_lona(u, 20.5); R.anillo(x, y, 1, CC.latonS); R.anillo(x2, y2, 1, CC.latonS); }
    for (let v2 = 2; v2 < 21; v2++) { const [x, y] = c_lona(52, v2); pset(x, y, hex('#b8ac8c')); pset(x + 1, y, hex('#ece4cc')); }
    // fila de arriba: la palanca de la bomba (el brazo de madera con su puño gastado, dos flejes y el ojo del eje), el
    // émbolo tumbado (el pistón de hierro con su cuero) y la válvula de cuero con su pesa de latón
    c_piezaLarga(R, 4, 46, 5, 4, [hex('#d8b07a'), hex('#a8784a'), hex('#6a4426')]);
    for (let u = 4; u < 14; u += 0.5) { const [x, y] = c_lona(u, 5); pset(x, y + 1, hex('#7a5232')); pset(x, y + 2, hex('#6a4426')); }
    for (const u of [32, 42]) for (let j = 0; j < 4; j++) { const [x, y] = c_lona(u, 5); pset(x, y + j, CC.hierro); pset(x + 1, y + j, CC.hierroL); }
    { const [x, y] = c_lona(51, 7); disco(x, y, 4, C.k); disco(x, y, 3, CC.hierro); disco(x, y, 1.4, CC.negro); pset(x - 2, y - 2, CC.hierroL); }
    { const [x, y] = c_lona(80, 7); c_sombra(R, x + 7, y + 6, 8, 1, 0.4); rect(x, y - 4, x + 12, y + 4, C.k); for (let j = -3; j <= 3; j++) rect(x + 1, y + j, x + 11, y + j, j < -1 ? CC.hierroL : j > 1 ? CC.hierroS : CC.hierro); rect(x + 5, y - 3, x + 6, y + 3, CC.hierroS); pset(x + 2, y - 3, C.blanco);
      for (let j = -5; j <= 5; j++) for (let i = -3; i <= 3; i++) if ((i / 3.5) ** 2 + (j / 5.6) ** 2 <= 1) pset(x - 1 + i, y + j, Math.abs(i) > 1.8 || Math.abs(j) > 4 ? hex('#3a2010') : j < -1 ? hex('#b8784a') : hex('#8a4c28'));
      pset(x - 2, y - 3, hex('#e09a68')); disco(x - 1, y, 1, hex('#2a160c')); }
    { const [x, y] = c_lona(116, 7); c_sombra(R, x + 2, y + 5, 6, 1, 0.4); disco(x, y, 5, C.k); disco(x, y, 4, hex('#7a4424')); disco(x, y, 2.5, CC.latonS); disco(x - 1, y - 1, 1.5, CC.laton); pset(x - 2, y - 2, CC.latonL); rect(x + 4, y - 1, x + 8, y + 1, hex('#7a4424')); pset(x + 8, y, C.k); }
    // fila de abajo: la varilla de la bomba (la horquilla y el ojo), los pernos con sus tuercas en fila y la llave de boca
    c_piezaLarga(R, 8, 74, 15, 2, [CC.hierroL, CC.hierro, CC.hierroS]);
    { const [x, y] = c_lona(5, 15); for (const d of [-2, 2]) { linea(x, y + d, x + 4, y + d, C.k); pset(x + 1, y + d, CC.hierroL); } rect(x + 3, y - 2, x + 4, y + 2, CC.hierro); }
    { const [x, y] = c_lona(77, 15.5); R.anillo(x, y, 3, C.k); R.anillo(x, y, 2, CC.hierroL); pset(x, y, hex('#c8bc9a')); }
    for (let k = 0; k < 5; k++) { const [x, y] = c_lona(88 + k * 7, 16); rect(x - 1, y - 3, x + 2, y + 1, C.k); rect(x, y - 2, x + 1, y, CC.hierroL); linea(x + 1, y + 1, x + 1, y + 2, CC.hierro); const [nx, ny] = c_lona(91 + k * 7, 16.5); rect(nx - 1, ny - 1, nx + 1, ny + 1, C.k); pset(nx, ny, CC.hierroL); }
    { const [x, y] = c_lona(128, 15), [x2, y2] = c_lona(141, 15); linea(x, y, x2, y2, C.k); linea(x, y - 1, x2, y2 - 1, CC.hierroL);
      for (const [px, py, s] of [[x, y, -1], [x2, y2, 1]]) { rect(px + (s < 0 ? -4 : 0), py - 3, px + (s < 0 ? 0 : 4), py + 2, C.k); rect(px + (s < 0 ? -3 : 1), py - 2, px + (s < 0 ? -1 : 3), py + 1, CC.hierro); rect(px + (s < 0 ? -3 : 2), py - 1, px + (s < 0 ? -2 : 3), py, hex('#c8bc9a')); } }
    // la esquina libre de la lona (la mueve el viento) se pinta cada fotograma
  }
  // la sonda: la mancha mojada en las tablas bajo la parte que estuvo en el agua, el charco de la punta y el cabo de
  // sondar que va de la anilla a su aduja
  { const [x0, y0, x1, y1] = [44, 128, 272, 98], L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, moj = 84;
    for (let d = -6; d <= moj + 4; d += 0.5) { const x = Math.round(x0 + ux * d), y = Math.round(y0 + uy * d), e = 3 + Math.round(h(Math.round(d), 1, 305) * 4) - (d > moj - 6 ? Math.round((d - moj + 6) * 0.5) : 0);
      for (let j = -1; j <= e; j++) { const c = R.pget(x, y + 2 + j); if (c) pset(x, y + 2 + j, c_mez(c, hex('#2e2a2a'), 0.55 - j * 0.04)); } }
    c_sombra(R, 40, 134, 9, 3, 0.45, hex('#2e3a44')); for (let i = -6; i <= 2; i++) pset(40 + i, 132, hex('#8a9aa6'));
    c_sombra(R, 160, 112, 110, 2, 0.12);
    let px = x1 + 7, py = y1 - 1; for (let k = 1; k <= 24; k++) { const u = k / 24, nx = Math.round(x1 + 7 + u * 16 + Math.sin(u * 5) * 6), ny = Math.round(y1 - 1 + u * 30); linea(px, py, nx, ny, hex('#5a4a34')); pset(nx, ny - 1, hex('#c8b084')); px = nx; py = ny; } }
  // la aduja del cabo de sondar y el cubo volcado
  c_aduja(R, 286, 140, 22, 11, 3); c_aduja(R, 286, 140, 12, 6, 4); c_sombra(R, 292, 152, 22, 2, 0.3);
  { const cx = 296, cy = 76; poligono([[cx - 14, cy - 8], [cx + 6, cy - 12], [cx + 10, cy + 6], [cx - 10, cy + 10]], C.k); poligono([[cx - 13, cy - 7], [cx + 5, cy - 11], [cx + 9, cy + 5], [cx - 9, cy + 9]], (x, y) => ((x + y) % 7 === 0 ? CC.hierro : y < cy - 3 ? hex('#d0a46a') : hex('#a87c48'))); disco(cx + 9, cy - 2, 6, C.k); disco(cx + 9, cy - 2, 5, hex('#5a3a22')); disco(cx + 9, cy - 2, 3, hex('#2a1a10')); c_sombra(R, cx, cy + 12, 14, 2, 0.35); }
  // la esquina de Atom, en una sombra suave y tranquila; con cielo gris, todo un poco más frío
  for (let y = 0; y < 52; y++) for (let x = 262; x < 320; x++) { const a = Math.min(1, (x - 262) / 18) * Math.min(1, (52 - y) / 10); pset(x, y, c_mez(R.pget(x, y), hex('#8a7254'), 0.55 * a)); }
  if (v.luz === 'gris') for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, c_mez(R.pget(x, y), hex('#6c7686'), 0.12));
}
// la cubierta de cerca, cada fotograma: los charcos que van y vienen, el agua del pozo de la bomba, el goteo del caño,
// la esquina de la lona que levanta el viento y la sonda, con la parte mojada oscura y brillante que gotea
function c_bomba(R, t, o, v) {
  const cur = c_actual(R); cur.set(c_capa(R, 'bomba.' + v.luz, () => c_bombaFija(R, v)));
  // los charcos que entran por los imbornales y avanzan y retroceden con el balanceo, con el cielo reflejado y su brillo
  const s = Math.sin(t * 0.55), ref = v.luz === 'dia' ? hex('#8ab4d8') : hex('#8a96a6');
  for (const [cx, k] of [[40, 0], [150, 1], [260, 2]]) { const rx = 20 + Math.round((s * (k - 1) * 0.5 + 0.6) * 10), ry = 6 + Math.round((s * (k - 1) * 0.5 + 0.6) * 4), cy = 158 - ry;
    for (let y = cy - ry; y <= 161; y++) for (let x = cx - rx - 4; x <= cx + rx + 4; x++) { if (x < 0 || x > 319) continue; const a = Math.atan2(y - cy, x - cx), rr = 1 + Math.sin(a * 3 + k) * 0.12 + Math.sin(a * 7 + k * 2) * 0.06, d = Math.hypot((x - cx) / rx, (y - cy) / ry) / rr; if (d > 1 && y < cy) continue; if (y >= cy && Math.abs(x - cx) > rx * rr * (1 - (y - cy) / (ry * 3))) continue;
      const i = y * 320 + x, mov = Math.floor((x + t * ((y & 1) ? 5 : -4)) / 4); let c = c_mez(cur[i], hex('#34404c'), 0.45); c = c_mez(c, ref, 0.15 + 0.3 * Math.max(0, 1 - d));
      if (d > 0.88) c = c_mez(cur[i], hex('#3a2e22'), 0.5); else if (y % 2 === 0 && h(mov, y, 118) < 0.14) c = c_mez(c, C.blanco, 0.6); cur[i] = c; }
    for (let j = 0; j < 4; j++) { const f = (t * 1.6 + j * 0.25 + k * 0.3) % 1; R.pset(cx - 4 + j * 3, 163 - Math.round(f * 5), CC.aguaL); } }
  // el agua al fondo del pozo de la bomba, que sube y baja con el balanceo y brilla
  { const lv = Math.round(Math.sin(t * 0.55) * 1.2); for (let i = -4; i <= 4; i++) { const y = 27 + lv + (Math.abs(i) > 3 ? -1 : 0); R.pset(208 + i, y, ((i + Math.floor(t * 5)) & 3) === 0 ? hex('#c8d8e4') : hex('#2a3a4c')); } }
  // el goteo del caño: la gota que se forma, cae y salpica en un charquito
  { const f = (t * 0.9) % 1, ch = ref; for (let i = -4; i <= 4; i++) R.pset(205 + i, 62 + (Math.abs(i) > 2 ? 0 : 1), c_mez(R.pget(205 + i, 62), ch, 0.5)); R.pset(205 + (Math.floor(t * 3) % 5) - 2, 62, C.blanco);
    if (f < 0.6) R.pset(205, 53 + Math.round(f * 2), CC.aguaL); else { const y = Math.round(55 + (f - 0.6) / 0.4 * 7); R.pset(205, y, CC.aguaL); R.pset(205, y - 1, ch); }
    if (f > 0.92) for (const d of [-2, 2]) R.pset(205 + d, 61, CC.aguaL); }
  // la esquina libre de la lona, que el viento levanta y deja caer
  { const lev = Math.max(0, Math.sin(t * 1.7) * Math.sin(t * 0.6 + 1)) * 4, [x, y] = c_lona(146, 22); if (lev > 0.6) { const n = Math.round(lev);
    R.poligono([[x - 9, y + 1], [x, y], [x - 1, y - n - 1]], hex('#5a4a34')); R.poligono([[x - 9, y], [x + 1, y - n], [x - 2, y - n - 2]], hex('#efe6cc')); R.linea(x - 9, y, x + 1, y - n, hex('#b0a282')); } }
  // la sonda: la anilla, el hierro seco (claro, con su brillo y alguna mancha de óxido), la marca y el número de cada
  // pie y LA PARTE MOJADA (más de tres pies): oscura, azulada y brillante, con gotas que se forman y caen
  const [x0, y0, x1, y1] = [44, 128, 272, 98], L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, pie = 24, moj = pie * 3.5, br = (t * 30) % (L + 40);
  for (let d = 0; d <= L; d += 0.5) { const x = Math.round(x0 + ux * d), y = Math.round(y0 + uy * d), m = d < moj, b = Math.abs(br - d) < 3;
    R.pset(x, y - 2, C.k); R.pset(x, y + 2, C.k);
    if (m) { const sp = Math.abs(((t * 18 + d * 0.0) % moj) - d) < 2 || h(Math.floor(d / 3), Math.floor(t * 4), 306) < 0.06; R.pset(x, y - 1, sp ? C.blanco : hex('#a8d4f0')); R.pset(x, y, ((Math.round(d) + Math.floor(t * 6)) % 9) < 2 ? hex('#5a8ab8') : hex('#2a5480')); R.pset(x, y + 1, hex('#14304c')); }
    else { const ox = h(Math.floor(d), 2, 307) < 0.07; R.pset(x, y - 1, b ? C.blanco : ox ? hex('#b07a4a') : hex('#d4d6dc')); R.pset(x, y, ox ? hex('#8a5a34') : hex('#a4a6b0')); R.pset(x, y + 1, hex('#6a6a76')); } }
  // la línea del agua: donde acaba lo mojado, un filo claro de través
  { const x = Math.round(x0 + ux * moj), y = Math.round(y0 + uy * moj); for (let j = -3; j <= 3; j++) R.pset(x, y + j, j === -3 || j === 3 ? C.k : hex('#d8ecf8')); R.pset(x - 1, y + 3, hex('#4a6a88')); }
  for (let k = 1; k * pie < L - 6; k++) { const x = Math.round(x0 + ux * k * pie), y = Math.round(y0 + uy * k * pie); R.pset(x, y - 3, C.k); R.pset(x, y + 3, C.k); R.pset(x, y, hex('#d8c880')); R.numero(String(k), x, y - 5, { color: k * pie < moj ? hex('#1e3048') : hex('#3a2a1a'), centro: true, sombra: false, fina: true }); }
  // las gotas colgadas bajo lo mojado: crecen y caen a la mancha
  for (let k = 0; k < 5; k++) { const d = 8 + k * 16, x = Math.round(x0 + ux * d), y = Math.round(y0 + uy * d), f = (t * 0.8 + k * 0.37) % 1;
    if (f < 0.7) { R.pset(x, y + 3, hex('#9ac4e0')); if (f > 0.4) R.pset(x, y + 4, hex('#c8e4f4')); } else { const yy = Math.round(y + 4 + (f - 0.7) / 0.3 * 6); R.pset(x, yy, hex('#c8e4f4')); } }
  R.anillo(x1 + 4, y1 - 1, 3.5, C.k); R.anillo(x1 + 4, y1 - 1, 2.6, CC.hierroL);
  { const f = (t * 1.4) % 1; R.pset(x0 - 1, y0 + 2 + Math.round(f * 5), CC.aguaL); if (f > 0.85) { R.pset(x0 - 3, y0 + 8, CC.aguaL); R.pset(x0 + 1, y0 + 8, CC.aguaL); } for (let a = 0; a < 6.28; a += 0.5) R.pset(Math.round(x0 - 1 + Math.cos(a) * (2 + f * 4)), Math.round(y0 + 8 + Math.sin(a) * (1 + f * 1.5)), c_mez(R.pget(x0, y0 + 8), C.blanco, 0.4)); }
  return { mojado: [Math.round(x0 + ux * moj), Math.round(y0 + uy * moj)] };
}
const C_VENT = [[53, 39, 79, 61], [215, 39, 241, 61]];

// el camarote fijo (estado y luz): techo, paneles, suelo, alfombra, muebles y objetos que no se mueven
function c_camaroteFija(R, v) {
  const { rect, pset, linea, disco, poligono } = R, hall = v.hall;
  // el techo de baos (oscuro y tranquilo bajo la barra del año) y las paredes de paneles con su zócalo
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) pset(x, y, (y % 6) === 5 ? hex('#2a1a10') : h(x >> 3, y, 84) < 0.15 ? hex('#3e2818') : hex('#36221a'));
  for (const x of [0, 80, 160, 240]) { rect(x, 0, x + 8, 17, hex('#2a1a10')); rect(x, 17, x + 8, 17, hex('#4a3020')); }
  rect(0, 14, 319, 19, hex('#2e1c12')); rect(0, 19, 319, 19, hex('#5a3a22'));
  c_paneles(R, 0, 20, 319, 103, 34, CC.panel, 1);
  rect(0, 103, 319, 108, hex('#3a2214')); rect(0, 104, 319, 104, hex('#a87444')); rect(0, 106, 319, 106, hex('#5a361e'));
  c_paneles(R, 0, 108, 319, 147, 26, CC.panel, 2);
  rect(0, 145, 319, 149, hex('#2a180e')); rect(0, 145, 319, 145, hex('#6a4428'));
  // el suelo de tablas en perspectiva y la alfombra con su cenefa y sus flecos
  c_tablas(R, 0, 319, 150, 179, (y) => 3 + (y - 150) * 0.14, CC.oscura, 3, 44);
  { const T0 = 153, T1 = 174, xa = (y) => Math.round(96 - (y - T0) * 0.8), xb = (y) => Math.round(226 + (y - T0) * 0.8);
    for (let y = T0; y <= T1; y++) for (let x = xa(y); x <= xb(y); x++) { const bx = Math.min(x - xa(y), xb(y) - x), by = Math.min(y - T0, T1 - y); let c = hex('#7a2a24');
      if (bx < 2 || by < 1) c = hex('#3a1a18'); else if (bx < 7 || by < 3) c = ((x + y) % 4 < 2) ? hex('#c8a050') : hex('#2a3a5a'); else { const cx = x - 161, cy = (y - 163.5) * 3; const d = Math.abs(cx) + Math.abs(cy); c = d % 18 < 2 ? hex('#c8a050') : d < 10 ? hex('#2a3a5a') : (Math.abs(cx) * 2 + Math.abs(cy)) % 14 < 3 ? hex('#a84a3a') : hex('#7a2a24'); }
      pset(x, y, c); }
    for (let x = xa(T1) + 1; x < xb(T1); x += 2) pset(x, T1 + 1, hex('#d8c8a0')); for (let x = xa(T0); x < xb(T0); x += 2) pset(x, T0 - 1, hex('#b8a880')); }
  // las ventanillas (el mar lo pinta cada fotograma): el marco de latón y madera, el alféizar
  for (const [x0, y0, x1, y1] of C_VENT) { rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, hex('#3a2214')); rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, hex('#8a5a34')); rect(x0 - 3, y0 - 3, x1 + 3, y0 - 3, hex('#b07a4a')); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, CC.latonS); rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, CC.latonL);
    rect(x0 - 6, y1 + 4, x1 + 6, y1 + 7, hex('#3a2214')); rect(x0 - 6, y1 + 4, x1 + 6, y1 + 4, hex('#b07a4a')); rect(x0 - 5, y1 + 5, x1 + 5, y1 + 6, hex('#7a4e2e')); c_sombra(R, (x0 + x1) >> 1, y1 + 10, 18, 2, 0.3); }
  // los estantes con libros (lomos de colores con sus nervios dorados, sin letras), un libro tumbado y el globo terráqueo
  for (const ys of [44, 66]) { rect(92, ys, 148, ys + 2, hex('#3a2214')); rect(92, ys, 148, ys, hex('#b07a4a')); rect(94, ys + 3, 96, ys + 6, hex('#3a2214')); rect(144, ys + 3, 146, ys + 6, hex('#3a2214')); }
  { const L = [hex('#7a2a24'), hex('#2a4a3a'), hex('#3a3a6a'), hex('#8a5a2a'), hex('#5a2a3a'), hex('#4a5a2a')];
    for (const [ys, x0, x1, k] of [[44, 94, 140, 0], [66, 94, 132, 1]]) { let x = x0; let i = 0; while (x < x1) { const w = 3 + Math.round(h(i, k, 85) * 3), hh = 12 + Math.round(h(i, k + 2, 85) * 6), c = L[Math.floor(h(i, k + 4, 85) * L.length)]; rect(x, ys - hh, x + w - 1, ys - 1, c); rect(x, ys - hh, x, ys - 1, c_mez(c, C.blanco, 0.25)); rect(x + w - 1, ys - hh, x + w - 1, ys - 1, c_mez(c, C.k, 0.4)); rect(x, ys - hh + 2, x + w - 1, ys - hh + 2, CC.laton); rect(x, ys - 4, x + w - 1, ys - 4, CC.latonS); x += w; i++; } }
    rect(132, 60, 146, 65, hex('#5a2a3a')); rect(132, 60, 146, 60, hex('#8a4a5a')); rect(134, 58, 144, 59, hex('#2a4a3a')); disco(143, 37, 5, C.k); disco(143, 37, 4, hex('#3a6a8a')); pset(141, 35, hex('#8ab0c0')); rect(141, 37, 143, 38, hex('#6a8a4a')); rect(143, 42, 143, 43, CC.latonS); rect(140, 43, 146, 43, CC.latonS); }
  // el soporte del sextante en la pared: con el sextante (viaje) o vacío, con su silueta más clara (hallazgo)
  rect(150, 30, 168, 56, C.k); rect(151, 31, 167, 55, hex('#5a3420')); rect(151, 31, 167, 31, hex('#8a5a34'));
  if (hall) { poligono([[159, 34], [153, 50], [165, 50]], hex('#6e4428')); linea(153, 50, 165, 50, hex('#7a5030')); pset(159, 35, hex('#8a5a34')); rect(157, 52, 161, 53, hex('#3a2214')); }
  else { linea(159, 34, 153, 50, CC.laton); linea(159, 34, 165, 50, CC.laton); for (let x = 153; x <= 165; x++) pset(x, 50 + Math.round(Math.sin((x - 153) / 12 * Math.PI) * 2), CC.latonL); disco(159, 42, 2, CC.latonS); pset(159, 34, CC.latonL); rect(157, 52, 161, 53, hex('#3a2214')); }
  // el reloj de pared: la caja, la esfera con las marcas de las horas y las agujas (el péndulo lo mueve cada fotograma)
  rect(176, 22, 200, 70, C.k); rect(177, 23, 199, 69, hex('#5a3420')); rect(177, 23, 199, 24, hex('#8a5a34')); rect(177, 23, 178, 69, hex('#7a4a2c'));
  disco(188, 35, 10, CC.latonS); disco(188, 35, 9, hex('#efe6d0')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(188 + Math.cos(a) * 7), Math.round(35 + Math.sin(a) * 7), k % 3 === 0 ? C.k : hex('#6a5a4a')); }
  linea(188, 35, 188, 30, C.k); linea(188, 35, 192, 37, C.k); pset(188, 35, CC.laton); rect(181, 48, 195, 66, CC.latonS); rect(182, 49, 194, 65, hex('#2a1a12'));
  // el armonio de Sarah: el mueble de nogal, el atril tallado con la partitura (pentagramas y notas, sin letras), los
  // registros, el teclado, las rodilleras y los pedales; y la banqueta redonda delante
  { rect(6, 70, 50, 146, C.k); rect(7, 90, 49, 146, hex('#5a3420')); rect(7, 90, 49, 91, hex('#8a5a34')); rect(7, 90, 8, 146, hex('#7a4a2c'));
    rect(9, 72, 47, 89, hex('#4a2a18')); for (let x = 11; x < 46; x += 4) for (let y = 74; y < 82; y += 3) pset(x + ((y / 3) & 1) * 2, y, hex('#2a160c')); rect(9, 72, 47, 72, hex('#8a5a34'));
    rect(16, 76, 40, 88, hex('#efe6d0')); rect(16, 76, 40, 76, C.blanco); for (const y of [79, 84]) for (let j = 0; j < 4; j++) rect(18, y + j, 38, y + j, hex('#b8ae98')); for (let k = 0; k < 7; k++) { const x = 19 + k * 3, y = 79 + Math.round(h(k, 1, 86) * 3); pset(x, y, C.k); pset(x + 1, y, C.k); rect(x + 1, y - 2, x + 1, y, C.k); } for (let k = 0; k < 6; k++) { const x = 20 + k * 3, y = 84 + Math.round(h(k, 2, 86) * 3); pset(x, y, C.k); rect(x + 1, y - 2, x + 1, y, C.k); }
    for (let x = 12; x < 46; x += 4) { disco(x, 95, 1.2, hex('#efe6d0')); pset(x, 94, C.blanco); }
    rect(9, 98, 47, 104, C.k); rect(10, 99, 46, 103, hex('#f2ecde')); for (let x = 10; x < 47; x += 2) rect(x, 99, x, 103, hex('#b8ae98')); for (let x = 11; x < 46; x += 4) if (x % 12 !== 3) rect(x, 99, x + 1, 101, hex('#1a1210'));
    c_paneles(R, 9, 108, 47, 136, 19, CC.panel, 4); rect(14, 138, 22, 144, hex('#2a3a5a')); rect(30, 138, 38, 144, hex('#2a3a5a')); for (let y = 139; y < 144; y += 2) { rect(15, y, 21, y, hex('#7a2a24')); rect(31, y, 37, y, hex('#7a2a24')); }
    rect(20, 132, 36, 135, C.k); rect(21, 132, 35, 133, hex('#8a2a24')); rect(21, 132, 35, 132, hex('#c84a3a')); rect(27, 136, 29, 146, hex('#3a2214')); rect(23, 145, 33, 146, hex('#3a2214')); }
  // la caja del cronómetro sobre el armonio, con la tapa abierta: el cronómetro de latón en su cardán (viaje) o el
  // terciopelo rojo vacío (hallazgo)
  rect(26, 60, 44, 70, C.k); rect(27, 61, 43, 69, hex('#8a5a34')); rect(27, 61, 43, 61, hex('#b07a4a')); rect(25, 68, 45, 74, C.k); rect(26, 69, 44, 73, hex('#7a4a2c')); rect(26, 69, 44, 69, hex('#b07a4a'));
  rect(28, 70, 42, 72, hex('#8a2a24')); R.anillo(35, 71, 3.5, CC.laton); if (!hall) { disco(35, 70, 3, CC.laton); disco(35, 70, 2, hex('#efe6d0')); pset(35, 69, C.k); pset(34, 68, CC.latonL); } else pset(35, 71, hex('#5a1a14'));
  // la mesa: las patas torneadas, las dos sillas de respaldo de barrotes detrás, y el mantel con sus pliegues y su puntilla
  for (const x of [128, 192]) { rect(x - 1, 138, x + 2, 156, hex('#3a2214')); rect(x - 2, 146, x + 3, 148, hex('#3a2214')); }
  for (const x of [126, 178]) { rect(x, 92, x + 18, 112, C.k); rect(x + 1, 93, x + 17, 95, hex('#6a4026')); rect(x + 1, 93, x + 17, 93, hex('#9a6038')); for (let b = x + 3; b < x + 17; b += 4) rect(b, 96, b + 1, 112, hex('#5a3420')); rect(x + 1, 96, x + 1, 112, hex('#6a4026')); rect(x + 17, 96, x + 17, 112, hex('#4a2a18')); }
  for (const x of [113, 206]) { rect(x - 2, 136, x + 3, 158, C.k); for (let y = 137; y <= 157; y++) { const w = y % 7 < 2 ? 2 : 1; rect(x - w + 1, y, x + w, y, (y % 7 === 0) ? hex('#a06c42') : hex('#6a4026')); pset(x - w + 1, y, hex('#a06c42')); } c_sombra(R, x, 159, 5, 1, 0.4); }
  c_sombra(R, 160, 158, 58, 3, 0.35);
  for (let y = 110; y <= 137; y++) { const top = y < 118, xa = top ? 106 + Math.round((118 - y) * 0.6) : 104, xb = top ? 214 - Math.round((118 - y) * 0.6) : 216; if (y < 112) continue;
    for (let x = xa; x <= xb; x++) { let c; if (top) c = ((x >> 2) + (y >> 1)) % 2 ? hex('#ece6d8') : hex('#e0d8c8'); else { const p = Math.sin((x - 104) * 0.42); c = p > 0.55 ? hex('#f4eee2') : p < -0.6 ? hex('#bcb4a2') : hex('#dcd4c4'); if (y > 133) c = (x + y) % 3 === 0 ? hex('#f8f4ec') : (y === 137 && x % 3 !== 1) ? c_VACIO : hex('#e8e2d4'); }
      if (c !== c_VACIO) pset(x, y, c); }
    if (top) { pset(xa, y, C.k); pset(xb, y, C.k); } }
  rect(104, 118, 216, 118, hex('#c8c0ae')); for (let x = 105; x < 216; x += 3) pset(x, 138, hex('#e8e2d4')); rect(106, 111, 214, 111, C.k);
  // sobre la mesa: el diario de a bordo abierto (canon), el tintero con su pluma y una vela
  { const dx = 152, dy = 112; poligono([[dx - 14, dy - 3], [dx + 14, dy - 3], [dx + 16, dy + 4], [dx - 16, dy + 4]], C.cueroS); poligono([[dx - 13, dy - 2], [dx - 1, dy - 2], [dx - 1, dy + 3], [dx - 14, dy + 3]], hex('#f2ecde')); poligono([[dx + 1, dy - 2], [dx + 13, dy - 2], [dx + 14, dy + 3], [dx + 1, dy + 3]], hex('#f2ecde'));
    for (let y = dy - 1; y <= dy + 2; y++) { rect(dx - 12, y, dx - 3, y, (y & 1) ? hex('#a89a88') : hex('#f2ecde')); rect(dx + 3, y, dx + 11, y, (y & 1) && y < dy + 1 ? hex('#a89a88') : hex('#f2ecde')); } rect(dx, dy - 3, dx, dy + 4, hex('#8a7a66')); rect(dx - 16, dy + 4, dx + 16, dy + 4, C.cuero); }
  { const x = 178, y = 112; rect(x - 3, y - 4, x + 3, y, C.k); rect(x - 2, y - 3, x + 2, y, hex('#2a2a4a')); pset(x - 1, y - 3, hex('#8a8ab0')); rect(x - 1, y - 5, x + 1, y - 5, CC.laton); linea(x + 1, y - 5, x + 7, y - 14, C.blanco); linea(x + 2, y - 6, x + 7, y - 13, hex('#d8d0c0')); pset(x + 6, y - 14, hex('#b8b0a0')); }
  { const x = 120, y = 112; rect(x - 3, y - 2, x + 3, y, CC.latonS); rect(x - 3, y - 2, x + 3, y - 2, CC.laton); rect(x - 1, y - 9, x + 1, y - 3, hex('#efe6d0')); pset(x - 1, y - 9, C.blanco); }
  // la máquina de coser de pedal: la mesita, el bastidor de hierro calado, el volante, el pedal; el cabezal negro con sus
  // filetes dorados, el volante de mano, la aguja y el vestidito azul a medio coser (el bajo lo mueve cada fotograma)
  { rect(220, 114, 264, 119, C.k); rect(221, 115, 263, 118, hex('#7a4a2c')); rect(221, 115, 263, 115, hex('#b07a4a'));
    for (const x0 of [223, 255]) { rect(x0, 120, x0 + 6, 157, C.k); for (let y = 121; y < 157; y++) for (let x = x0 + 1; x < x0 + 6; x++) if ((x + y) % 4 === 0 || (x - y + 400) % 4 === 0 || x === x0 + 1 || x === x0 + 5) pset(x, y, hex('#2a2a30')); else pset(x, y, hex('#4a3a2a')); }
    rect(226, 148, 262, 152, C.k); for (let x = 227; x < 262; x++) pset(x, 150, (x % 3) ? hex('#3a3a42') : hex('#5a5a66'));
    R.anillo(248, 136, 9, C.k); R.anillo(248, 136, 8, hex('#3a3a42')); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; linea(248, 136, Math.round(248 + Math.cos(a) * 8), Math.round(136 + Math.sin(a) * 8), hex('#2a2a30')); } disco(248, 136, 1.5, CC.laton);
    rect(226, 108, 258, 114, C.k); rect(227, 109, 257, 113, hex('#1e1c22')); rect(248, 96, 256, 109, C.k); rect(249, 97, 255, 108, hex('#1e1c22')); rect(228, 96, 256, 101, C.k); rect(229, 97, 255, 100, hex('#1e1c22'));
    for (const [x, y] of [[232, 98], [238, 99], [244, 98], [251, 103], [252, 106], [236, 111], [244, 111]]) { pset(x, y, CC.latonL); pset(x + 1, y, CC.laton); } rect(229, 97, 255, 97, hex('#4a4652'));
    rect(229, 101, 232, 108, C.k); rect(230, 101, 231, 107, CC.hierroL); rect(230, 107, 230, 110, hex('#c8d0dc'));
    disco(258, 101, 5, C.k); disco(258, 101, 4, hex('#3a3a42')); pset(256, 99, hex('#8a8a96')); disco(258, 101, 1.2, CC.laton);
    poligono([[224, 113], [244, 112], [246, 116], [222, 117]], hex('#9ac0e0')); for (let x = 225; x < 245; x += 3) pset(x, 114, hex('#c8e0f0')); linea(232, 113, 232, 108, C.blanco); }
  // la litera: los postes, el dosel, la colcha de retales, la almohada, los cajones con sus tiradores; la cortina la
  // pinta cada fotograma
  { rect(268, 64, 319, 70, C.k); rect(268, 65, 319, 69, hex('#5a3420')); rect(268, 65, 319, 65, hex('#8a5a34'));
    rect(272, 70, 319, 112, hex('#2e1c12')); for (let y = 72; y < 112; y += 6) rect(272, y, 319, y, hex('#3a2416'));
    rect(274, 96, 319, 100, hex('#efe6d0')); rect(274, 96, 319, 96, C.blanco); rect(300, 92, 316, 97, hex('#f4eee2')); rect(300, 92, 316, 92, C.blanco);
    for (let y = 100; y < 112; y++) for (let x = 274; x <= 319; x++) { const q = ((x >> 3) + (y >> 2)) % 4; pset(x, y, [hex('#8a2a24'), hex('#2a4a6a'), hex('#c8a050'), hex('#4a6a3a')][q]); if ((x & 7) === 0 || (y & 3) === 0) pset(x, y, hex('#e8dcc0')); }
    rect(268, 112, 319, 120, C.k); rect(269, 113, 319, 119, hex('#6a4026')); rect(269, 113, 319, 113, hex('#a06c42'));
    for (const y0 of [122, 138]) { rect(272, y0, 319, y0 + 14, C.k); rect(273, y0 + 1, 319, y0 + 13, hex('#6a4026')); rect(273, y0 + 1, 319, y0 + 1, hex('#9a6038')); rect(273, y0 + 13, 319, y0 + 13, hex('#4a2a18')); for (const x of [286, 306]) { disco(x, y0 + 7, 1.5, CC.latonS); pset(x - 1, y0 + 6, CC.latonL); } }
    rect(266, 64, 270, 158, C.k); rect(267, 65, 269, 158, hex('#7a4a2c')); rect(267, 65, 267, 158, hex('#a87444')); disco(268, 63, 3, C.k); disco(268, 63, 2, hex('#a87444')); }
  // entre los baos (a la derecha, lejos del año): la percha de las cartas náuticas enrolladas, atadas con su cinta
  { rect(176, 3, 262, 4, hex('#4a2e1c')); rect(176, 11, 262, 12, hex('#4a2e1c')); for (const x of [178, 220, 260]) { rect(x, 2, x + 1, 13, hex('#6a4428')); pset(x, 2, hex('#9a6c44')); }
    for (let k = 0; k < 5; k++) { const x0 = 182 + k * 15 + (k % 2) * 3, w = 11 + (k % 3) * 2, c = [hex('#e8dcc0'), hex('#d8c8a0'), hex('#efe6d0')][k % 3];
      rect(x0, 5, x0 + w, 10, C.k); rect(x0 + 1, 6, x0 + w - 1, 9, c); rect(x0 + 1, 6, x0 + w - 1, 6, C.blanco); rect(x0 + 1, 9, x0 + w - 1, 9, hex('#a89878'));
      disco(x0 + w, 7.5, 2, C.k); disco(x0 + w, 7.5, 1.2, c); pset(x0 + w, 7, hex('#a89878')); rect(x0 + (w >> 1), 5, x0 + (w >> 1) + 1, 10, k % 2 ? hex('#8a2a24') : hex('#2a4a6a')); } }
  // las perchas de la izquierda (bajo la ventanilla): dos ganchos de latón en su tabla (el chubasquero y el sueste los
  // cuelga cada fotograma, que se mecen)
  { rect(56, 70, 86, 73, C.k); rect(57, 71, 85, 72, hex('#8a5a34')); rect(57, 71, 85, 71, hex('#b07a4a')); for (const x of [62, 78]) { rect(x, 73, x + 1, 76, CC.laton); pset(x + 2, 76, CC.laton); pset(x, 73, CC.latonL); } }
  // el catalejo de latón en sus dos soportes, bajo la otra ventanilla, y el cordón de la campanilla
  { for (const x of [212, 250]) { rect(x - 2, 76, x + 2, 86, C.k); rect(x - 1, 77, x + 1, 85, hex('#7a4a2c')); pset(x - 1, 77, hex('#a87444')); }
    const segs = [[206, 230, 3], [230, 248, 2.5], [248, 262, 2]];
    for (const [a, b, r] of segs) { rect(a, Math.round(79 - r), b, Math.round(79 + r), C.k); for (let y = Math.round(80 - r); y <= Math.round(78 + r); y++) rect(a + 1, y, b - 1, y, y < 79 ? CC.latonL : y > 79 ? CC.latonS : CC.laton); rect(b - 2, Math.round(79 - r), b - 1, Math.round(79 + r), CC.latonS); }
    rect(204, 75, 207, 83, C.k); rect(205, 76, 206, 82, hex('#3a2a20')); pset(205, 76, hex('#6a5a4a')); rect(262, 77, 263, 81, hex('#1a2a3a'));
    for (let y = 70; y < 92; y++) pset(264 - ((y >> 2) & 1), y, (y & 1) ? hex('#c8a050') : hex('#8a6a30')); disco(263, 93, 2, hex('#c8a050')); pset(262, 92, hex('#f0d880')); }
  // en el suelo, a la izquierda de la alfombra: las botas de agua y un rollo de cabo
  { for (const [x, d] of [[38, 0], [48, 1]]) { rect(x, 160 + d, x + 6, 175 + d, C.k); rect(x + 1, 161 + d, x + 5, 174 + d, hex('#2a2a30')); rect(x + 1, 161 + d, x + 1, 174 + d, hex('#4a4a56')); rect(x - 3, 171 + d, x + 6, 176 + d, C.k); rect(x - 2, 172 + d, x + 5, 175 + d, hex('#2a2a30')); rect(x - 2, 172 + d, x + 5, 172 + d, hex('#4a4a56')); rect(x + 1, 161 + d, x + 5, 162 + d, hex('#6a4a2e')); }
    c_sombra(R, 48, 178, 14, 1, 0.4); c_aduja(R, 70, 171, 10, 4, 5); c_aduja(R, 70, 171, 5, 2, 6); c_sombra(R, 72, 177, 10, 1, 0.35); }
  // la penumbra: las esquinas más oscuras (la lámpara alumbra el centro), y la de Atom, tranquila
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 200, (y - 100) / 130), a = Math.max(0, d - 0.55) * 1.1 + (x > 268 && y < 50 ? 0.2 : 0); if (a > 0) { const c = R.pget(x, y); if (c !== c_VACIO) pset(x, y, c_mez(c, hex('#1a0e08'), Math.min(0.55, a) * (c_b4(x, y) < 0.5 ? 1 : 0.8))); } }
  for (let y = 18; y < 56; y++) for (let x = 262; x < 320; x++) pset(x, y, c_mez(R.pget(x, y), hex('#4a2c1a'), 0.55 * Math.min(1, (x - 262) / 14) * Math.min(1, (56 - y) / 10)));
}
// el camarote, cada fotograma: el mar por las ventanillas, su luz, la lámpara, el péndulo, la cortina, el vestido, el
// caballito, la muñeca y el gag del té
function c_camarote(R, t, o, v) {
  const cur = c_actual(R); cur.set(c_capa(R, 'cam.' + v.est + '.' + v.luz, () => c_camaroteFija(R, v)));
  const roll = Math.sin(t * 0.55), cs = CC.cielo[v.luz], M = CC.mar[v.luz];
  // por las ventanillas: el cielo y el mar que suben y bajan con el balanceo, la cruz del marco y el reflejo
  for (const [x0, y0, x1, y1] of C_VENT) { const hz = (x) => (y0 + y1) / 2 + roll * 7 + (x - (x0 + x1) / 2) * roll * 0.12;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const z = hz(x); let c; if (y < z) c = cs[Math.min(4, Math.floor((y - y0) / (y1 - y0) * 4 + c_b4(x, y) * 0.9) + 1)]; else { const w = Math.sin(x * 0.5 + t * 2 + y * 1.4) + Math.sin(x * 0.17 - t + y * 0.6); c = w > 1.3 ? M.l : w < -1.2 ? M.s : M.c; if (y - z < 1.5) c = M.hz; } cur[y * 320 + x] = c; }
    { const nx = Math.round(x0 + ((t * 3) % 60) - 15), ny = y0 + 6; if (nx > x0 && nx < x1 - 4) { R.pset(nx, ny, hex('#3a404a')); R.pset(nx - 1, ny - 1, hex('#3a404a')); R.pset(nx + 1, ny - 1, hex('#3a404a')); } }
    R.rect(x0, (y0 + y1) >> 1, x1, ((y0 + y1) >> 1) + 1, hex('#8a5a34')); R.rect((x0 + x1) >> 1, y0, ((x0 + x1) >> 1) + 1, y1, hex('#8a5a34')); R.rect(x0, (y0 + y1) >> 1, x1, (y0 + y1) >> 1, hex('#b07a4a'));
    for (let k = 0; k < 6; k++) R.pset(x0 + 2 + k, y0 + 7 - k, c_mez(R.pget(x0 + 2 + k, y0 + 7 - k), C.blanco, 0.5));
    // la luz de la ventanilla, que resbala por la pared y el suelo con el balanceo, con sus motas
    const lx = Math.round(x0 + 20 + roll * 14); for (let y = y1 + 8; y < 160; y++) { const d = Math.round((y - y1) * 0.35); for (let x = lx + d - 6; x <= lx + d + 6; x++) if (((x + y) & 1) === 0 && x >= 0 && x < 320) cur[y * 320 + x] = c_mez(cur[y * 320 + x], hex('#f0e2c0'), v.luz === 'dia' ? 0.22 : 0.12); }
    for (let k = 0; k < 6; k++) { const mx = Math.round(lx + 10 + h(k, x0, 87) * 18 + Math.sin(t * 0.7 + k) * 4), my = Math.round(y1 + 14 + ((h(k, 2, 87) * 60 + t * (2 + k % 3)) % 70)); R.pset(mx + Math.round((my - y1) * 0.35) - 10, my, hex('#f6ead0')); } }
  // la lámpara de aceite colgada, que se balancea: la cadena, el depósito de latón, la tulipa y la llama, y su luz
  { const a = Math.sin(t * 0.55 + 0.4) * 0.12, px = 160, py = 18, L = 44, lx = Math.round(px + Math.sin(a) * L), ly = Math.round(py + Math.cos(a) * L), fl = 0.5 + 0.5 * Math.sin(t * 13) * Math.sin(t * 7.3);
    R.halo(lx, ly + 2, 34, [hex('#6a4426'), hex('#8a5a30'), hex('#b07a40')], 0.55 + fl * 0.08);
    for (let k = 0; k < L - 9; k += 2) R.pset(Math.round(px + Math.sin(a) * k), Math.round(py + Math.cos(a) * k), k % 4 ? CC.latonS : CC.laton);
    R.rect(lx - 6, ly - 8, lx + 6, ly - 6, C.k); R.rect(lx - 5, ly - 8, lx + 5, ly - 7, hex('#2e4a3a')); R.pset(lx - 4, ly - 8, hex('#5a8a6a'));
    R.rect(lx - 2, ly - 6, lx + 2, ly + 1, C.k); R.rect(lx - 1, ly - 5, lx + 1, ly, hex('#f8f0d8')); R.pset(lx, ly - 2 - Math.round(fl), hex('#ffd060')); R.pset(lx, ly - 1, hex('#fff8d0'));
    R.rect(lx - 4, ly + 1, lx + 4, ly + 5, C.k); R.rect(lx - 3, ly + 2, lx + 3, ly + 4, CC.laton); R.rect(lx - 3, ly + 2, lx - 1, ly + 2, CC.latonL); R.pset(lx, ly + 6, CC.latonS); }
  // el chubasquero de hule y el sueste colgados de las perchas, que se mecen con el balanceo
  { const sw = roll * 1.6, ox = (y) => Math.round(sw * (y - 76) / 26);
    for (let y = 76; y <= 102; y++) { const w = y < 80 ? 3 + (y - 76) : Math.min(9, 7 + ((y - 80) >> 3)), cx = 62 + ox(y); for (let x = cx - w; x <= cx + w; x++) { const e = x === cx - w || x === cx + w; R.pset(x, y, e ? C.k : ((x - cx + 40) % 5 === 0 && y > 82) ? hex('#a87a28') : x < cx - 2 ? hex('#e0b850') : hex('#c89a38')); } }
    for (const sg of [-1, 1]) for (let y = 81; y <= 99; y++) { const x = 62 + ox(y) + sg * (9 + ((y - 81) >> 3)); R.pset(x, y, C.k); R.pset(x - sg, y, hex('#b08a30')); if (y > 96) R.pset(x - sg * 2, y, hex('#8a6420')); }
    R.rect(58 + ox(78), 77, 66 + ox(78), 79, hex('#8a6420'));
    R.linea(62 + ox(80), 80, 62 + ox(102), 102, hex('#8a6420')); for (const y of [86, 92]) R.pset(63 + ox(y), y, C.k); R.rect(55 + ox(102), 102, 69 + ox(102), 102, C.k);
    const hx = 78 + Math.round(sw * 0.6); R.rect(hx - 4, 76, hx + 4, 80, C.k); R.rect(hx - 3, 77, hx + 3, 79, hex('#c89a38')); R.rect(hx - 3, 77, hx, 77, hex('#e8c060')); R.rect(hx - 6, 80, hx + 7, 82, C.k); R.rect(hx - 5, 81, hx + 6, 81, hex('#b08a30'));
    for (let y = 83; y < 90; y++) R.pset(hx + (y & 1), y, hex('#3a2a14')); }
  // la brújula «acusica» colgada del techo sobre la mesa (el capitán la mira desde la litera): oscila en su cardán
  { const a = Math.sin(t * 0.55 + 0.9) * 0.1, bx = Math.round(212 + Math.sin(a) * 14), by = Math.round(4 + Math.cos(a) * 14);
    R.linea(212, 2, bx, by - 3, CC.latonS); R.rect(bx - 6, by - 3, bx + 6, by + 1, C.k); R.rect(bx - 5, by - 2, bx + 5, by, CC.laton); R.rect(bx - 5, by - 2, bx - 2, by - 2, CC.latonL);
    R.rect(bx - 4, by + 1, bx + 4, by + 3, C.k); R.rect(bx - 3, by + 1, bx + 3, by + 2, hex('#efe6d0')); R.pset(bx + Math.round(Math.sin(t * 0.8) * 2), by + 2, hex('#b83a2a')); }
  // el péndulo del reloj
  { const a = Math.sin(t * 3.1) * 0.35, bx = Math.round(188 + Math.sin(a) * 12), by = Math.round(50 + Math.cos(a) * 12); R.linea(188, 50, bx, by, CC.latonS); R.disco(bx, by, 2, CC.laton); R.pset(bx - 1, by - 1, CC.latonL); }
  // la cortina de la litera, que se mece; el bajo del vestidito, que cuelga del borde de la máquina
  for (let x = 271; x <= 296; x++) { const sw = Math.round(Math.sin(t * 0.55 + x * 0.3) * 1.2 * ((x - 271) / 25)), f = Math.sin((x - 271) * 0.9); for (let y = 70; y <= 112 + sw; y++) R.pset(x + (y > 100 ? Math.round(roll * (y - 100) * 0.1) : 0), y, x === 296 ? C.k : f > 0.5 ? hex('#b84a3a') : f < -0.4 ? hex('#6a1e1a') : hex('#8a2a24')); }
  R.rect(270, 69, 300, 70, CC.latonS); R.rect(270, 69, 300, 69, CC.laton);
  for (let y = 117; y <= 132; y++) { const sw = Math.round(roll * (y - 117) * 0.18 + Math.sin(t * 2 + y * 0.3) * 0.5), w = 4 + Math.round((y - 117) * 0.3); for (let x = 230 - w; x <= 230 + w; x++) R.pset(x + sw, y, y === 132 ? C.blanco : (x + y) % 5 === 0 ? hex('#c8e0f0') : x > 230 + w - 2 ? hex('#6a90b0') : hex('#9ac0e0')); }
  // el caballito de madera, que se mece con el barco, y la muñeca de trapo sin cara sentada junto a la litera
  { const a = Math.sin(t * 1.1) * 0.12 + roll * 0.08, cx = 282, cy = 156, rot = (x, y) => [Math.round(cx + x * Math.cos(a) - y * Math.sin(a)), Math.round(cy + x * Math.sin(a) + y * Math.cos(a))];
    for (let i = -12; i <= 12; i++) { const [x, y] = rot(i, -Math.round(i * i / 40)); R.pset(x, y, hex('#5a3420')); R.pset(x, y - 1, hex('#8a5a34')); }
    for (const [i, j] of [[-6, -1], [6, -1]]) { const [x0, y0] = rot(i, j), [x1, y1] = rot(i * 0.6, -9); R.linea(x0, y0, x1, y1, hex('#6a4026')); }
    const [bx, by] = rot(0, -12); R.rect(bx - 6, by - 2, bx + 5, by + 2, C.k); R.rect(bx - 5, by - 1, bx + 4, by + 1, hex('#e8dcc0')); R.pset(bx - 3, by, hex('#5a3a22')); R.pset(bx + 1, by - 1, hex('#5a3a22')); R.rect(bx - 2, by - 3, bx + 1, by - 2, hex('#b84a3a'));
    const [hx, hy] = rot(6, -16); R.rect(hx - 1, hy - 3, hx + 3, hy + 2, C.k); R.rect(hx, hy - 2, hx + 2, hy + 1, hex('#e8dcc0')); R.pset(hx + 1, hy - 1, C.k); R.linea(hx - 1, hy - 3, hx - 3, hy + 2, hex('#3a2416')); R.pset(hx + 3, hy + 2, hex('#e8dcc0'));
    const [tx, ty] = rot(-7, -13); R.linea(tx, ty, tx - 3, ty + 4, hex('#3a2416')); R.linea(tx + 1, ty, tx - 2, ty + 4, hex('#5a3a22')); }
  { const x = 304, y = 158; R.rect(x - 4, y - 7, x + 4, y, C.k); R.rect(x - 3, y - 6, x + 3, y - 1, hex('#b84a6a')); R.rect(x - 3, y - 6, x + 3, y - 6, hex('#d87a9a')); for (let k = -3; k <= 3; k += 2) R.pset(x + k, y - 3, hex('#f0d8e0'));
    R.disco(x, y - 11, 4, C.k); R.disco(x, y - 11, 3, hex('#f0dcc0')); R.pset(x - 1, y - 13, C.blanco); R.rect(x - 4, y - 15, x + 4, y - 14, hex('#c8782a')); R.pset(x - 4, y - 13, hex('#c8782a')); R.pset(x + 4, y - 13, hex('#c8782a'));
    const b = Math.round(roll); R.linea(x - 4, y - 5, x - 7, y - 1 + b, hex('#d87a9a')); R.linea(x + 4, y - 5, x + 7, y - 1 - b, hex('#d87a9a')); R.rect(x - 3, y, x - 1, y + 1, hex('#f0dcc0')); R.rect(x + 1, y, x + 3, y + 1, hex('#f0dcc0')); }
  // el gag del té: la taza humeante recortada de un periódico que aparece y que la goma borra, dejando migas
  const te = o.te ?? 0;
  if (te > 0) { const tx = 190, ty = 110, ap = Math.min(1, te / 0.15), borra = Math.max(0, Math.min(1, (te - 0.6) / 0.32)), xe = Math.round(tx - 13 + borra * 28);
    if (borra < 1) { const s = 0.4 + 0.6 * ap, w = Math.round(12 * s), hh = Math.round(11 * s), x0 = tx - w, x1 = tx + w, y0 = ty - hh * 2 + 2, y1 = ty;
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (x < xe) continue; const borde = Math.min(x - x0, x1 - x, y - y0, y1 - y); if (borde < 1 && h(x, y, 88) < 0.45) continue; let c = borde < 1 ? hex('#c8c0ac') : hex('#e8e2d0'); if ((y - y0) % 3 === 1 && borde > 1 && (x < tx - 5 || x > tx + 5 || y < y0 + 4)) c = hex('#a8a090'); R.pset(x, y, c); }
      if (ap >= 1) { const cup = [['.kkkkkk..', '.kWWWWWkk', '.kWWWWWk.k', '.kWWWWWk.k', '..kWWWkkk.', 'kkkkkkkkk']];
        cup[0].forEach((f, j) => { for (let i = 0; i < f.length; i++) { const x = tx - 5 + i, y = ty - 8 + j; if (x < xe) continue; if (f[i] === 'k') R.pset(x, y, hex('#3a3430')); else if (f[i] === 'W') R.pset(x, y, j === 1 ? hex('#a87a5a') : hex('#f4f0e6')); } });
        for (let k = 0; k < 3; k++) for (let j = 0; j < 7; j++) { const x = tx - 3 + k * 2 + Math.round(Math.sin(t * 4 + j * 0.9 + k) * 1), y = ty - 10 - j; if (x >= xe) R.pset(x, y, hex('#7a7468')); } } }
    if (borra > 0) for (let k = 0; k < 16; k++) { const mx = tx - 14 + Math.round(h(k, 1, 89) * 30), my = ty - 2 + Math.round(h(k, 2, 89) * 6); if (mx < xe) { R.pset(mx, my, hex('#d89aa0')); if (k % 3 === 0) R.pset(mx + 1, my, hex('#b87a80')); } } }
}
// lo de delante en el camarote: el baúl de marinero abierto, con la ropa seca doblada dentro (abajo a la izquierda)
function c_camaroteDelante(R, t, o, v) {
  const { rect, pset } = R;
  rect(0, 146, 28, 179, C.k); rect(0, 147, 27, 150, hex('#5a3420')); rect(0, 147, 27, 147, hex('#8a5a34'));
  rect(1, 151, 26, 154, hex('#d8d0c0')); rect(1, 151, 26, 151, hex('#f2ecde')); rect(1, 155, 26, 157, hex('#5a6a8a')); rect(1, 155, 26, 155, hex('#7a8aaa')); rect(1, 158, 26, 159, hex('#b84a3a'));
  for (let y = 160; y <= 179; y++) for (let x = 0; x <= 27; x++) pset(x, y, x === 27 ? hex('#3a2214') : y % 6 === 0 ? hex('#4a2a18') : h(x, y >> 1, 90) < 0.1 ? hex('#8a5a34') : hex('#6a4026'));
  for (const y of [163, 175]) { rect(0, y, 27, y + 1, CC.hierro); rect(0, y, 27, y, CC.hierroL); } rect(10, 166, 16, 170, CC.latonS); rect(11, 167, 15, 168, CC.laton);
}

const C_TINTA = hex('#3a2a40');

// una página del diario: renglones azules, el margen rojo, las columnas de números (el día, el rumbo, las millas) y los
// renglones de «letra» en trazos ondulados (sin letras) hasta xFin; dias: un día por fila (null: fila sin cifras)
function c_pagina(R, x0, y0, x1, y1, dias, conCifras = true, sinDia = false, xFin = x1 - 8) {
  const { rect, pset } = R;
  for (let y = y0 + 14; y < y1 - 4; y += 9) rect(x0 + 3, y, x1 - 3, y, hex('#b8c4d4'));
  rect(x0 + 18, y0 + 4, x0 + 18, y1 - 4, hex('#d89a9a')); rect(x0 + 40, y0 + 4, x0 + 40, y1 - 4, hex('#d8c4c4')); rect(x0 + 60, y0 + 4, x0 + 60, y1 - 4, hex('#d8c4c4'));
  rect(x0 + 4, y0 + 7, x1 - 6, y0 + 8, hex('#8a7a8a'));
  dias.forEach((d, j) => { const y = y0 + 14 + j * 9 - 7; if (y > y1 - 12) return;
    if (conCifras && d != null) { if (!sinDia) c_cifras(R, String(d), x0 + 6, y + 1, C_TINTA); c_cifras(R, String(40 + ((d * 37) % 50)), x0 + 23, y + 1, C_TINTA); c_cifras(R, String(90 + ((d * 53) % 110)), x0 + 44, y + 1, C_TINTA); }
    let x = x0 + 64; while (x < xFin) { const n = 4 + Math.round(h(d, x, 91) * 9); for (let i = 0; i < n; i++) pset(x + i, y + 3 + Math.round(Math.sin((x + i) * 1.3 + d) * 1.2), C_TINTA); if (h(x, d, 92) < 0.4) pset(x + 2, y + 1, C_TINTA); x += n + 3; } });
}

// el papel de una hoja del diario (de x0 a x1), con la curva que oscurece junto al lomo y el canto
function c_hoja(R, x0, x1) {
  for (let y = 30; y <= 151; y++) for (let x = x0; x <= x1; x++) { const dl = x < 160 ? 158 - x : x - 162, c = dl < 6 ? c_mez(hex('#f4eedc'), hex('#a89a80'), (6 - dl) / 8) : x < 58 || x > 262 ? hex('#e2dac6') : hex('#f4eedc'); R.pset(x, y, c); }
}

// la hoja del manifiesto de carga (la que queda debajo a la izquierda mientras pasa la hoja): renglones y una columna
// de cantidades que suma 1701 abajo, subrayado dos veces
function c_manifiesto(R) {
  c_hoja(R, 54, 158); c_pagina(R, 54, 30, 158, 151, [null, null, null, null, null, null, null, null, null, null], true, false, 128);
  [120, 250, 300, 180, 220, 160, 140, 191, 140].forEach((n, j) => c_cifras(R, String(n), 140, 38 + j * 9, C_TINTA));
  R.rect(132, 120, 154, 120, C_TINTA); c_cifras(R, '1701', 136, 124, C_TINTA); R.rect(132, 130, 154, 130, C_TINTA); R.rect(132, 132, 154, 132, C_TINTA);
}

// el diario de cerca, fijo: la mesa de caoba con la luz de la ventanilla, las tapas, las dos páginas del 14 al 25, la
// isla al margen y los útiles de escribir alrededor
function c_diarioFija(R, v) {
  const { rect, pset, linea, disco, poligono } = R;
  c_tablas(R, 0, 319, 0, 179, () => 16, CC.caoba, 5, 80);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y); pset(x, y, c_mez(c, hex('#ffe8c0'), Math.max(0, 0.12 - Math.abs(x - y * 1.2 - 40) * 0.0012))); }
  // las tapas de cuero con sus cantos gastados y el lomo, el canto de las hojas y la sombra del libro
  c_sombra(R, 162, 160, 112, 6, 0.4);
  rect(46, 26, 274, 158, C.k); rect(47, 27, 273, 157, C.cuero); rect(47, 27, 273, 28, hex('#8a5a38')); for (let x = 47; x < 274; x++) for (let y = 27; y < 158; y++) if ((x < 52 || x > 268 || y > 152) && h(x, y, 93) < 0.15) pset(x, y, C.cueroS);
  for (const [x, y] of [[47, 27], [273, 27], [47, 157], [273, 157]]) { R.disco(x, y, 3, hex('#9a6a44')); }
  for (let y = 152; y < 157; y++) { rect(54, y, 158, y, (y & 1) ? hex('#d8d0bc') : hex('#f2ecde')); rect(162, y, 266, y, (y & 1) ? hex('#d8d0bc') : hex('#f2ecde')); }
  // las dos páginas, con su curva junto al lomo
  c_hoja(R, 54, 158); c_hoja(R, 162, 266);
  rect(158, 28, 162, 154, hex('#6a5a48')); rect(160, 28, 160, 154, hex('#3a2a20'));
  c_pagina(R, 54, 30, 158, 151, [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
  c_pagina(R, 162, 30, 266, 151, [25], true, true);
  R.numero('25', 171, 44, { color: hex('#2a1a3a'), centro: true, sombra: false, fina: true });
  // al margen: la isla de Santa María, dibujada a pluma: la costa, los montes con su sombreado, las olitas alrededor y
  // la derrota en puntos que llega hasta ella
  { const cx = 240, cy = 76, rr = (a) => 10 + Math.sin(a * 3 + 0.5) * 2.2 + Math.sin(a * 5 + 1) * 1.3, dentro = (x, y) => { const a = Math.atan2((y - cy) / 0.62, (x - cx) / 1.35); return Math.hypot((x - cx) / 1.35, (y - cy) / 0.62) < rr(a); };
    for (let y = cy - 10; y <= cy + 10; y++) for (let x = cx - 18; x <= cx + 18; x++) if (dentro(x, y)) pset(x, y, ((x + y) % 3 === 0 && y > cy) ? hex('#c8b080') : hex('#e8d8a8'));
    for (let a = 0; a < 6.3; a += 0.03) pset(Math.round(cx + Math.cos(a) * rr(a) * 1.35), Math.round(cy + Math.sin(a) * rr(a) * 0.62), C_TINTA);
    for (const [px, ph] of [[-5, 7], [3, 5]]) { linea(cx + px - 5, cy + 2, cx + px, cy + 2 - ph, C_TINTA); linea(cx + px, cy + 2 - ph, cx + px + 5, cy + 2, C_TINTA); for (let k = 1; k < 4; k++) linea(cx + px + k, cy + 2 - ph + k * 1.4, cx + px + k + 1, cy + 2, hex('#7a6a7a')); }
    for (let k = 0; k < 4; k++) { const x = cx - 22 + k * 13, y = cy + 11 + (k & 1) * 2; for (let i = 0; i < 6; i++) pset(x + i, y + Math.round(Math.sin(i * 1.3) * 1), hex('#6a7a9a')); }
    for (let k = 0; k < 9; k++) pset(cx - 44 + k * 3, cy - 16 + Math.round(k * 0.9), C_TINTA); linea(cx - 18, cy - 9, cx - 15, cy - 6, C_TINTA); linea(cx - 18, cy - 6, cx - 15, cy - 9, C_TINTA); }
  // alrededor: el tintero, la pluma, el compás de puntas, la regla y la salvadera
  { const x = 22, y = 56; disco(x, y + 6, 12, hex('#3a1a12')); disco(x, y, 10, C.k); disco(x, y, 9, hex('#2a2a4a')); disco(x - 3, y - 3, 3, hex('#6a6a9a')); disco(x, y, 5, CC.laton); disco(x, y, 3, C.k); pset(x - 2, y - 2, CC.latonL); }
  for (let k = 0; k < 40; k++) { const x = 278 + k, y = 172 - Math.round(k * 1.1); if (y < 50) break; pset(x, y, k < 6 ? C.k : k < 10 ? hex('#8a8a96') : C.blanco); if (k > 10) { pset(x - 1, y - 1, k % 2 ? hex('#d8d0c0') : C.blanco); pset(x + 1, y + 1, hex('#b8b0a0')); if (k > 14) pset(x - 2, y - 2, hex('#e8e2d4')); } }
  linea(14, 176, 40, 150, C.k); linea(15, 176, 41, 150, CC.hierroL); linea(40, 176, 14, 150, C.k); linea(41, 176, 15, 150, CC.hierroL); disco(27, 163, 2.5, CC.laton); pset(26, 162, CC.latonL);
  poligono([[62, 166], [200, 160], [201, 168], [63, 174]], C.k); poligono([[63, 167], [199, 161], [200, 167], [64, 173]], hex('#d8c098')); for (let x = 70; x < 200; x += 6) { const y = Math.round(167 - (x - 63) * 0.044); rect(x, y, x, y + (x % 30 === 10 ? 3 : 1), hex('#5a4a30')); }
  { const x = 296, y = 98; rect(x - 6, y - 12, x + 6, y + 8, C.k); rect(x - 5, y - 11, x + 5, y + 7, hex('#6a6a7a')); rect(x - 5, y - 11, x - 3, y + 7, hex('#9a9aaa')); rect(x - 6, y - 14, x + 6, y - 12, CC.laton); for (let i = -4; i <= 4; i += 2) pset(x + i, y - 13, C.k); c_sombra(R, x + 4, y + 10, 8, 2, 0.35); }
  // la esquina de Atom, tranquila
  for (let y = 0; y < 50; y++) for (let x = 264; x < 320; x++) pset(x, y, c_mez(R.pget(x, y), hex('#5a2a1a'), 0.4 * Math.min(1, (x - 264) / 12)));
}

// el diario de cerca, cada fotograma: la hoja que pasa (o.pagina), la esquina que levanta el aire y el dedo de luz
function c_diario(R, t, o, v) {
  const cur = c_actual(R); cur.set(c_capa(R, 'diario', () => c_diarioFija(R, v)));
  const pag = Math.max(0, Math.min(1, o.pagina ?? 1));
  // mientras pasa la hoja: debajo a la izquierda, la página anterior (el manifiesto de carga); la hoja que pasa es un
  // trapecio que se estrecha sobre el lomo y levanta su canto: por delante, los días 7–13 (con la salida de Nueva York
  // arriba, sin cifras); por detrás, los días 14–24 (los mismos que quedan a la izquierda)
  if (pag < 1) { const a = pag * Math.PI, w = Math.round(Math.cos(a) * 104), lift = Math.round(Math.sin(a) * 10), xs = 160, xe = xs + w;
    c_manifiesto(R);
    if (Math.abs(w) > 2) { R.poligono([[xs, 30], [xe, 30 - lift], [xe, 151 - lift], [xs, 151]], (x, y) => { const f = Math.abs(x - xs) / Math.max(1, Math.abs(w)); return c_mez(hex('#f4eedc'), hex('#b8ab90'), w > 0 ? (1 - f) * 0.15 + Math.sin(a) * 0.25 * f : 0.35 * (1 - f)); });
      if (Math.abs(w) > 96) { if (w > 0) c_pagina(R, 162, 30, 266, 151, [null, null, null, null, 7, 8, 9, 10, 11, 12, 13]); else c_pagina(R, 54, 30, 158, 151, [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]); }
      else for (let y = 44; y < 146; y += 9) { const ya = y - Math.round(lift * Math.abs(w) / 104); for (let k = 0; k < Math.abs(w) - 6; k += 2) R.pset(xs + Math.sign(w) * (4 + k), ya + Math.round((k / Math.max(1, Math.abs(w))) * -lift * 0.2), hex('#8a7a8a')); }
      R.linea(xe, 30 - lift, xe, 151 - lift, hex('#a89a80')); } }
  // la esquina de la hoja derecha, que levanta el aire de la ventanilla
  { const u = Math.max(0, Math.sin(t * 1.3)) ** 3, n = Math.round(u * 5); for (let k = 0; k < n; k++) R.linea(266 - k * 2, 151 - k * 2, 266 - n * 2, 151 - k, hex('#e2dac6')); if (n > 0) R.linea(266 - n * 2, 151 - n * 2, 266, 151, hex('#a89a80')); }
  // el dedo de luz de la ventanilla, que va y viene con el balanceo
  { const cx = Math.round(170 + Math.sin(t * 0.55) * 60); for (let y = 24; y < 178; y++) { const d = Math.round((y - 24) * 0.5); for (let x = cx + d - 9; x <= cx + d + 9; x++) { if (x < 0 || x > 319) continue; const e = 1 - Math.abs(x - cx - d) / 10; if (e * 0.9 > c_b4(x, y)) cur[y * 320 + x] = c_mez(cur[y * 320 + x], hex('#fff4d8'), 0.18); } } }
  return {};
}

const C_FUGA = [160, 92];

// las cuadernas en perspectiva: un arco en U por profundidad z (0 cerca, más lejos cuanto mayor)
const c_arco = (z) => { const s = 1 / (1 + z * 0.42); return { s, hw: 170 * s, top: Math.round(C_FUGA[1] - 100 * s), bot: Math.round(C_FUGA[1] + 92 * s) }; };

// la bodega fija: el forro, el plan, las cuadernas y los baos, la escotilla, los barriles, la escala y el gancho
function c_bodegaFija(R, v) {
  const { rect, pset, linea, disco } = R, [fx, fy] = C_FUGA;
  // el fondo: el forro del casco, más oscuro hacia el fondo, con las tracas que convergen y las juntas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - fx) / 1.6, y - fy), a = Math.atan2(y - fy, (x - fx) / 1.6), tr = Math.floor(a * 9 / Math.PI + 40), lz = Math.max(0, Math.min(1, d / 120));
    let c = c_mez(hex('#120a06'), hex('#5a3a22'), lz * 0.9); if (Math.abs((a * 9 / Math.PI) - Math.round(a * 9 / Math.PI)) < 0.05 + (1 - lz) * 0.04) c = c_mez(c, C.k, 0.5); else if (h(tr, Math.floor(d / 6), 94) < 0.3) c = c_mez(c, hex('#6a4a2e'), 0.15 * lz); if (h(x >> 1, y, 95) < 0.04) c = c_mez(c, C.k, 0.3); pset(x, y, c); }
  // el plan de la bodega (el suelo): tablas que se alejan hacia el punto de fuga
  for (let y = fy + 6; y < 180; y++) { const s = (y - fy) / 88, hw = 150 * s; for (let x = Math.round(fx - hw); x <= fx + hw; x++) { const u = (x - fx) / Math.max(1, hw), pl = Math.floor((u + 1) * 7), lz = Math.min(1, s * 1.3); let c = c_mez(hex('#1a100a'), (pl & 1) ? hex('#6a4a2e') : hex('#5a3e26'), lz); if (Math.abs((u + 1) * 7 - Math.round((u + 1) * 7)) < 0.06) c = c_mez(c, C.k, 0.6); if (h(pl, Math.floor(1 / s * 8), 96) < 0.2 && ((y * 7) % 13 === 0)) c = c_mez(c, C.k, 0.4); pset(x, y, c); } }
  // las cuadernas (de lejos a cerca), con su luz en el canto y los baos encima
  for (let z = 7; z >= 0; z--) { const { s, hw, top, bot } = c_arco(z), g = Math.max(1, Math.round(5 * s)), lz = Math.max(0.15, 1 - z * 0.12), cM = c_mez(hex('#120a06'), hex('#7a5232'), lz), cL = c_mez(hex('#120a06'), hex('#b07a4a'), lz), cS = c_mez(hex('#0a0604'), hex('#3a2416'), lz);
    for (let y = top; y <= bot; y++) { const u = (y - top) / (bot - top), w = hw * (u < 0.55 ? 1 : Math.sqrt(Math.max(0, 1 - ((u - 0.55) / 0.45) ** 2)) * 0.85 + 0.15); for (const sg of [-1, 1]) { const x = Math.round(fx + sg * w); rect(Math.min(x, x - sg * g), y, Math.max(x, x - sg * g), y, cM); pset(x - sg * g, y, sg < 0 ? cL : cS); pset(x, y, cS); } }
    rect(Math.round(fx - hw), top - g, Math.round(fx + hw), top, cM); rect(Math.round(fx - hw), top + 1, Math.round(fx + hw), top + 1, cS); rect(Math.round(fx - hw), top - g, Math.round(fx + hw), top - g, cL);
    for (let k = -3; k <= 3; k++) { const x = Math.round(fx + k * hw / 3.5); if (z < 5) { pset(x, top - Math.round(g / 2), c_mez(cM, C.k, 0.5)); } } }
  // el techo de cerca (la cubierta vista por debajo) con la escotilla abierta (arriba a la derecha) y el cielo gris por ella
  rect(0, 0, 319, 7, hex('#1e140c')); for (let x = 0; x < 320; x += 9) rect(x, 0, x, 7, hex('#120a06'));
  rect(184, 0, 236, 18, C.k); for (let y = 0; y <= 15; y++) for (let x = 186; x <= 234; x++) pset(x, y, y < 4 ? hex('#c8d0d8') : c_b4(x, y) < 0.5 ? hex('#a8b4c0') : hex('#98a4b0')); rect(184, 15, 236, 18, hex('#5a3e24')); rect(184, 15, 236, 15, hex('#a07850')); rect(184, 0, 186, 18, hex('#3a2818')); rect(234, 0, 236, 18, hex('#3a2818'));
  // los barriles: al fondo, filas que se alejan a los dos lados (más pequeños y oscuros); delante, las pilas grandes de
  // tres alturas calzadas con cuñas; nueve de roble rojo repartidos
  let rojos = 0; const rojo = (k) => { const r = h(k, 7, 97) < 0.16 && rojos < 9; if (r) rojos++; return r; };
  for (let z = 6; z >= 1; z--) { const { s, hw, bot } = c_arco(z + 0.4), r = Math.max(2, Math.round(13 * s)), osc = Math.min(0.85, z * 0.13);
    for (const sg of [-1, 1]) for (let tier = 0; tier < 3; tier++) for (let n = 0; n < 2; n++) { const cx = Math.round(fx + sg * (hw * 0.86 - r - n * r * 2.05 - (tier & 1) * r)), cy = Math.round(bot - r - tier * r * 1.75); if (sg * (cx - fx) < 44 * s) continue; c_barril(R, cx, cy, r, rojo(z * 31 + tier * 7 + n * 3 + sg), osc, z); } }
  for (const [sg, x0] of [[-1, 0], [1, 320]]) for (let tier = 0; tier < 3; tier++) for (let n = 0; n < 3; n++) { const r = 16, cx = Math.round(x0 - sg * (r + 2 + n * 34 + (tier & 1) * 17)), cy = 178 - r - tier * 30; if (cy - r < 22) continue; if (sg < 0 ? cx > 70 : cx < 214) continue; c_barril(R, cx, cy, r, rojo(100 + tier * 11 + n * 5 + sg), 0.15 + tier * 0.05, 9); if (tier === 0) { R.poligono([[cx - 6, 178], [cx - 1, 170], [cx + 1, 178]], hex('#7a5a38')); } }
  // la escala que baja de la escotilla: los largueros y los peldaños, con la luz por un lado
  for (let y = 16; y <= 170; y++) { const x = Math.round(214 - (y - 16) * 0.07); rect(x - 13, y, x - 12, y, hex('#6a4a2e')); rect(x, y, x + 1, y, hex('#6a4a2e')); pset(x - 13, y, hex('#b08a5a')); pset(x, y, hex('#b08a5a')); if ((y - 16) % 9 === 0) { rect(x - 12, y, x, y + 1, hex('#8a6a42')); rect(x - 12, y, x, y, hex('#c8a070')); } }
  // el gancho del farol en el bao y unas cuñas sueltas
  rect(95, 6, 97, 10, CC.hierro); for (let y = 160; y < 172; y++) pset(120 + (y & 1), y, hex('#3a2818'));
  // un cabo de amarre: dos píxeles de grueso con la torsión en claro y oscuro y su comba (k: cuánto cuelga)
  const cabo = (xa, ya, xb, yb, k) => { const n = Math.max(2, Math.round(Math.abs(xb - xa))); for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(xa + (xb - xa) * u), y = Math.round(ya + (yb - ya) * u + Math.sin(u * Math.PI) * k); pset(x, y - 1, C.k); pset(x, y, (i % 3) === 0 ? hex('#5a4a34') : hex('#c8b084')); pset(x, y + 1, (i % 3) === 1 ? hex('#e2d0a4') : hex('#8a7454')); pset(x, y + 2, C.k); } };
  // el pie del palo mayor, que baja por la bodega hasta su carlinga: la madera con su luz, los zunchos de hierro, las
  // cuñas de la fogonadura y la carlinga; al lado, los dos tubos de plomo de las bombas que bajan a la sentina
  { const x0 = 144, x1 = 153, y0 = 39, y1 = 136;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0); let c = u < 0.25 ? hex('#a0703e') : u > 0.75 ? hex('#3a2414') : hex('#6a4426'); if (h(x, y >> 2, 309) < 0.12) c = c_mez(c, C.k, 0.3); pset(x, y, x === x0 || x === x1 ? C.k : c); }
    for (const y of [52, 78, 104]) { rect(x0, y, x1, y + 1, CC.hierroS); pset(x0 + 2, y, CC.hierroL); }
    for (let k = 0; k < 4; k++) { rect(x0 - 3 + k * 4, y0, x0 - 1 + k * 4, y0 + 4, hex('#8a6038')); pset(x0 - 3 + k * 4, y0, hex('#b08a5a')); }
    rect(x0 - 6, y1 - 3, x1 + 6, y1 + 3, C.k); rect(x0 - 5, y1 - 2, x1 + 5, y1 + 2, hex('#4a3020')); rect(x0 - 5, y1 - 2, x1 + 5, y1 - 2, hex('#7a5232'));
    for (const px of [157, 161]) { for (let y = y0 + 4; y <= y1 + 1; y++) { pset(px, y, hex('#5a5e66')); pset(px + 1, y, hex('#34363c')); } for (const y of [60, 96]) { rect(px - 1, y, px + 2, y + 1, hex('#2a2a30')); } }
    c_sombra(R, 152, y1 + 4, 14, 2, 0.4); }
  // las cabillas y los pernos del forro de las paredes de cerca, y unas manchas de humedad
  for (let y = 12; y < 100; y += 7) for (const [xa, xb] of [[0, 56], [226, 268]]) for (let x = xa + ((y * 5) % 11); x < xb; x += 13) { pset(x, y, hex('#2a1a10')); pset(x + 1, y - 1, hex('#8a6440')); }
  for (const [x, y, r] of [[20, 70, 8], [236, 84, 6], [52, 34, 5]]) c_sombra(R, x, y, r, r + 4, 0.25, hex('#1a2a2a'));
  // un rollo de cabo colgado de su cabilla en la pared de la izquierda, con el chicote que cuelga
  { const cx = 16, cy = 46; rect(cx - 1, cy - 14, cx + 1, cy - 11, hex('#8a6038')); for (let n = 0; n < 4; n++) { const rx = 7 - n, ry = 11 - n; for (let a = 0; a < 6.3; a += 0.25 / rx) { const x = Math.round(cx + Math.cos(a) * rx), y = Math.round(cy + Math.sin(a) * ry), lt = -Math.cos(a + 2.2); pset(x, y, lt > 0.4 ? hex('#e2d0a4') : lt > -0.3 ? hex('#c8b084') : hex('#8a7454')); } }
    for (let y = cy + 10; y < cy + 26; y++) pset(cx + 3 + Math.round(Math.sin(y * 0.4)), y, (y & 1) ? hex('#c8b084') : hex('#8a7454')); c_sombra(R, cx + 3, cy + 2, 9, 12, 0.18); }
  // las trincas: cabos que sujetan las pilas de barriles de delante, con su comba, y las cuñas de madera de abajo
  cabo(0, 112, 72, 118, 5); cabo(0, 146, 70, 150, 4); cabo(216, 116, 319, 108, 6); cabo(218, 148, 319, 144, 5);
  for (const x of [35, 69, 217, 251, 285]) { R.poligono([[x - 4, 179], [x + 4, 179], [x, 172]], hex('#8a6038')); R.linea(x - 4, 179, x, 172, hex('#b08a5a')); }
  // la paja de la estiba esparcida por el plan, y unas tablas de estiba sueltas
  for (let k = 0; k < 70; k++) { const y = Math.round(118 + h(k, 1, 310) ** 0.7 * 60), hw = 150 * (y - 92) / 88 * 0.55, x = Math.round(160 + (h(k, 2, 310) - 0.5) * 2 * hw), L = 1 + Math.round(h(k, 3, 310) * 2 * (y - 92) / 50); linea(x, y, x + L, y - (k & 1), h(k, 4, 310) < 0.5 ? hex('#a8884a') : hex('#c8a860')); }
  { R.poligono([[84, 160], [118, 154], [119, 157], [85, 163]], C.k); R.poligono([[85, 160], [117, 155], [118, 156], [85, 162]], hex('#6a4a2e')); R.linea(85, 160, 117, 155, hex('#9a7a50')); }
  // la esquina de Atom: el techo oscuro y tranquilo
  for (let y = 0; y < 48; y++) for (let x = 268; x < 320; x++) pset(x, y, c_mez(R.pget(x, y), hex('#1a100a'), 0.5));
}
// la bodega, cada fotograma: el haz de luz con motas, las gotas y el farol (el agua, el vapor y la llama van delante)
function c_bodega(R, t, o, v) {
  const cur = c_actual(R); cur.set(c_capa(R, 'bodega', () => c_bodegaFija(R, v)));
  const agua = Math.max(0, Math.min(1, o.agua ?? 0)), yA = Math.round(178 - agua * 30);
  // el haz de luz que baja por la escotilla, con sus motas
  for (let y = 18; y < 176; y++) { const d = (y - 18) * 0.42, x0 = Math.round(186 - d), x1 = Math.round(234 - d * 0.7), f = 1 - (y - 18) / 190; for (let x = x0; x <= x1; x++) { if (x < 0) continue; const e = Math.min(x - x0, x1 - x) / 6; if (Math.min(1, e) * f * 0.75 > c_b4(x, y)) cur[y * 320 + x] = c_mez(cur[y * 320 + x], hex('#c8ccd0'), 0.22); } }
  for (let k = 0; k < 22; k++) { const y = Math.round(26 + ((h(k, 1, 98) * 150 + t * (3 + k % 4)) % 150)), d = (y - 18) * 0.42, x = Math.round(190 - d + h(k, 2, 98) * (40 - d * 0.3) + Math.sin(t * 0.8 + k) * 3); R.pset(x, y, hex('#e8e4d8')); }
  // las gotas que caen de las juntas de la cubierta, y los regueros de los barriles de roble rojo
  for (let k = 0; k < 3; k++) { const x = [70, 140, 262][k], f = (t * 0.8 + k * 0.33) % 1, y = Math.round(10 + f * (yA - 12)); R.pset(x, y, hex('#9ab0c0')); R.pset(x, y - 1, hex('#5a7084')); }
  // el farol colgado que se mece: el asa, la jaula de alambre, el cristal y la llama, con su halo cálido
  { const a = Math.sin(t * 0.55 + 0.6) * 0.16, lx = Math.round(96 + Math.sin(a) * 34), ly = Math.round(10 + Math.cos(a) * 34), fl = 0.5 + 0.5 * Math.sin(t * 11) * Math.sin(t * 6.1);
    R.halo(lx, ly + 2, 24 + fl * 2, [hex('#3a2414'), hex('#5a3a1e'), hex('#8a5a2a'), hex('#c08040')], 0.75); R.linea(96, 10, lx, ly - 7, CC.hierro);
    R.rect(lx - 4, ly - 6, lx + 4, ly + 7, C.k); R.rect(lx - 3, ly - 5, lx + 3, ly + 6, hex('#f8d888')); R.rect(lx - 1, ly - 2 - Math.round(fl), lx + 1, ly + 2, hex('#fff6d0')); R.pset(lx, ly - 3 - Math.round(fl), hex('#ffb040'));
    for (const x of [lx - 3, lx, lx + 3]) R.rect(x, ly - 5, x, ly + 6, hex('#3a3430')); R.rect(lx - 4, ly - 7, lx + 4, ly - 6, CC.hierro); R.rect(lx - 4, ly + 6, lx + 4, ly + 7, CC.hierro); R.anillo(lx, ly - 9, 2, CC.hierro); }
  // el farolito del fondo de la bodega, lejos, que parpadea (da fondo al pasillo de barriles)
  { const fl = 0.6 + 0.4 * Math.sin(t * 9.3) * Math.sin(t * 4.1); R.halo(134, 76, 10 + fl * 2, [hex('#2a1a0e'), hex('#4a2e16'), hex('#7a4a22')], 0.6); R.rect(133, 73, 135, 77, C.k); R.pset(134, 74, fl > 0.7 ? hex('#ffe8a0') : hex('#f0b050')); R.pset(134, 75, hex('#f8d070')); R.linea(134, 64, 134, 72, hex('#2a1a10')); }
  // el aparejo de carga colgado del bao junto a la escotilla: el cabo, el motón de madera con su roldana y el gancho,
  // que se mecen con el balanceo
  { const a = Math.sin(t * 0.55 + 1.2) * 0.12, px = 252, py = 18, bx = Math.round(px + Math.sin(a) * 24), by = Math.round(py + Math.cos(a) * 24);
    R.linea(px, py, bx, by - 4, hex('#c8b084')); R.linea(px + 1, py, bx + 1, by - 4, hex('#8a7454')); R.rect(bx - 3, by - 5, bx + 3, by + 4, C.k); R.rect(bx - 2, by - 4, bx + 2, by + 3, hex('#8a6038')); R.rect(bx - 2, by - 4, bx - 1, by + 3, hex('#b08a5a')); R.pset(bx, by - 1, hex('#2a1a10'));
    const gx = Math.round(bx + Math.sin(a) * 8), gy = by + 10; R.linea(bx, by + 4, gx, gy - 2, CC.hierro); R.pset(gx, gy - 1, CC.hierroL); R.pset(gx, gy, CC.hierro); R.pset(gx + 1, gy + 1, CC.hierro); R.pset(gx + 2, gy, CC.hierroL); R.pset(gx + 2, gy - 1, CC.hierro); }
  // la humedad del plan: unos charquitos entre las tablas que brillan con la luz de la escotilla
  for (const [x, y, w] of [[176, 174, 8], [116, 152, 4], [186, 150, 4]]) for (let j = 0; j < 3; j++) { const ww = w - Math.abs(j - 1) * 3; for (let i = -ww; i <= ww; i++) { const c = R.pget(x + i, y + j); R.pset(x + i, y + j, j === 1 && ((i + Math.floor(t * 3)) % 6) === 0 ? hex('#c8d0d8') : c_mez(c, hex('#4a6074'), 0.4)); } }
  return { agua: yA, suelo: agua > 0.25 ? Math.min(170, yA + 11) : 170 };
}
// un búfer de trabajo para copiar la pantalla (el vapor y el temblor)
let c_aux2 = null;

// la superficie del agua de la bodega, de x0 a x1 desde yA hasta abajo: mezcla lo de detrás (fuerza a), con ondas,
// reflejos del haz de luz y del farol que tiemblan, y espuma en las orillas
function c_aguaBodega(R, cur, t, yA, x0, x1, a) {
  for (let y = yA; y < 180; y++) for (let x = x0; x <= x1; x++) { const i = y * 320 + x, d = y - yA, w = Math.sin(x * 0.18 + t * 2.2 + d * 1.1) + Math.sin(x * 0.05 - t * 1.3 + d * 0.4);
    const mov = Math.floor((x + t * ((d & 2) ? 9 : -7) + d * 13) / 5), dash = d % 3 === 1 && h(mov, d, 111) < 0.2 + w * 0.05;
    let c = c_mez(cur[i], hex('#1a2a36'), a); if (d === 0) c = h(Math.floor((x + t * 6) / 4), 0, 112) < 0.5 ? hex('#7a9aae') : hex('#4a6478'); else if (dash) c = c_mez(c, hex('#6a8aa0'), 0.6); else if (d % 3 === 2 && h(mov + 3, d, 113) < 0.15) c = c_mez(c, hex('#0a141c'), 0.5);
    const rb = Math.abs(x - (150 - d * 0.3) - Math.sin(t * 2 + d) * 3) < 14 && d < 12, rf = Math.abs(x - 96 - Math.sin(t * 0.55 + 0.6) * 4) < 3 + d * 0.2 && d < 14;
    if (rb && w > 0.6) c = c_mez(c, hex('#c8d0d8'), 0.5); if (rf && (w + d * 0.3) % 2 > 0.6) c = c_mez(c, hex('#f8c870'), 0.6);
    cur[i] = c; }
}

// lo de delante en la bodega (por delante de los actores): dos barriles grandes en las esquinas de abajo, el agua de
// lado a lado (o.agua), el vapor que tiembla y deforma (o.vapor) y la llamarada azul (o.llama)
function c_bodegaDelante(R, t, o, v) {
  const cur = c_actual(R), agua = Math.max(0, Math.min(1, o.agua ?? 0)), yA = Math.round(178 - agua * 30), vap = Math.max(0, Math.min(1, o.vapor ?? 0)), ll = Math.max(0, Math.min(1, o.llama ?? 0));
  c_barril(R, -6, 176, 22, false, 0.25, 11); c_barril(R, 326, 172, 24, true, 0.3, 12);
  if (agua > 0) c_aguaBodega(R, cur, t, yA, 0, 319, 0.72);
  // el vapor de alcohol: un velo tramado que tiembla y deforma lo de detrás (las filas se desplazan como con calor)
  if (vap > 0) { if (!c_aux2) c_aux2 = R.nuevo(); c_aux2.set(cur); for (let y = 0; y < 180; y++) { const dx = Math.round(Math.sin(y * 0.09 + t * 4.5) * vap * 1.3 + Math.sin(y * 0.031 - t * 2) * vap * 0.6); if (dx) for (let x = 0; x < 320; x++) { const sx = Math.min(319, Math.max(0, x - dx)); cur[y * 320 + x] = c_aux2[y * 320 + sx]; } }
    for (let k = 0; k < 140 * vap; k++) { const x = Math.round((h(k, 1, 99) * 340 + t * 6 * (1 + k % 3)) % 340) - 10, y = Math.round(30 + h(k, 2, 99) * 130 + Math.sin(t * 2 + k) * 3); if (x >= 0 && x < 320 && y < 180) cur[y * 320 + x] = c_mez(cur[y * 320 + x], hex('#a8b8c8'), 0.35); } }
  // la llamarada azul: llena la bodega de luz azul y lenguas de llama, tiembla y se apaga sin quemar nada
  if (ll > 0 && ll < 1) { const I = ll < 0.3 ? ll / 0.3 : Math.max(0, 1 - (ll - 0.3) / 0.7) ** 1.5, frente = Math.min(1, ll / 0.25) * 380, tb = Math.round(Math.sin(t * 40) * 2 * I);
    // la luz azul que lo llena todo (más fuerte arriba, donde se junta el vapor)
    const BL = hex('#4a6ae8'); for (let y = 0; y < 180; y++) { const k = I * (0.42 - y * 0.0012); for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (Math.hypot(x - 210, y - 10) < frente) cur[i] = c_mez(cur[i], BL, k); } }
    // la capa de llama pegada a los baos (donde se junta el vapor): un manto ondulado con lenguas que bajan y suben
    for (let x = 0; x < 320; x++) { if (Math.hypot(x - 210, 20) > frente) continue; const sm = Math.max(0, Math.min(1, (x - 236) / 36)), y0 = Math.round(21 + sm * sm * (3 - 2 * sm) * 26), fondo = Math.round((20 + Math.sin(x * 0.05 + t * 3) * 7 + Math.sin(x * 0.17 - t * 7) * 6) * I);
      for (let y = y0; y < y0 + 2 + fondo; y++) { const e = (y - y0) / Math.max(1, fondo), c = e > 0.82 ? hex('#2a48d8') : e > 0.5 ? C.llama : e > 0.22 ? C.llamaL : hex('#f4f8ff'), al = Math.min(1, (y - y0 + 1) / 5) * (0.8 - e * 0.35); const i = y * 320 + x; if (al > c_b4(x, y) * 0.5) cur[i] = c_mez(cur[i], c, al); } }
    // las lenguas de llama sueltas por el aire: crecen, se mecen y se apagan (núcleo blanco, azul claro y borde azul)
    for (let k = 0; k < 60; k++) { const bx = h(k, 1, 110) * 340 - 10, by = 40 + h(k, 2, 110) ** 1.6 * 120; if (Math.hypot(bx - 210, by - 10) > frente || (bx > 262 && by < 80)) continue;
      const vida = (t * (1.6 + h(k, 5, 110)) + h(k, 3, 110)) % 1, sz = (8 + h(k, 4, 110) * 16) * I * (0.45 + 0.55 * Math.sin(vida * Math.PI)), L = Math.round(sz * 2); if (L < 4) continue;
      for (let j = 0; j <= L; j++) { const u = j / L, w = sz * 0.45 * (u < 0.25 ? Math.sqrt(u / 0.25) : Math.pow((1 - u) / 0.75, 0.8)), cx = bx + Math.sin(t * 8 + k + u * 4) * sz * 0.22 * u, y = Math.round(by - j);
        for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) { const e = Math.abs(x - cx) / Math.max(0.5, w); R.pset(x, y, e > 0.72 ? hex('#2a48d8') : e < 0.4 && u < 0.55 ? (u < 0.3 ? hex('#f4f8ff') : C.llamaL) : C.llama); } } }
    if (tb) { if (!c_aux2) c_aux2 = R.nuevo(); c_aux2.set(cur); for (let y = 0; y < 180; y++) cur.set(c_aux2.subarray(y * 320 + Math.max(0, -tb), y * 320 + 320 - Math.max(0, tb)), y * 320 + Math.max(0, tb)); } }
}

const C_AGUA_V = 128, C_FONDO_V = 174, C_PIE = 12;

// la varilla de cerca, fija: el forro, las cuadernas, los barriles y el tubo de sondeo abierto por delante
function c_varillaFija(R, v) {
  const { rect, pset, linea } = R;
  // el forro y las cuadernas detrás, en penumbra
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y % 10 === 9) ? hex('#1a100a') : h(x >> 2, (y / 10) | 0, 100) < 0.5 ? hex('#3a2616') : hex('#33200f'); pset(x, y, h(x, y, 101) < 0.05 ? hex('#4a3020') : f); }
  for (const x of [96, 226]) { rect(x - 6, 0, x + 6, 179, hex('#2a1a10')); rect(x - 6, 0, x - 5, 179, hex('#6a4a2e')); rect(x + 5, 0, x + 6, 179, hex('#120a06')); }
  // una fila de barriles al fondo, en la penumbra, y los grandes que enmarcan (dos a cada lado)
  for (const [cx, cy, r] of [[78, 52, 20], [120, 40, 20], [204, 44, 20], [244, 58, 20], [100, 92, 21], [218, 96, 21], [64, 112, 18], [256, 116, 18], [124, 128, 16], [198, 132, 16]]) c_barril(R, cx, cy, r, h(cx, cy, 117) < 0.25, 0.55, 18);
  c_barril(R, 26, 64, 36, false, 0.2, 13); c_barril(R, 14, 140, 36, true, 0.25, 14); c_barril(R, 300, 86, 34, false, 0.25, 15); c_barril(R, 292, 160, 34, false, 0.3, 16);
  // el tubo de sondeo: el tronco de madera con sus flejes, abierto por delante (dentro, oscuro), que se mete en el agua
  rect(140, 0, 180, C_FONDO_V, C.k); for (let y = 0; y <= C_FONDO_V; y++) for (let x = 141; x <= 179; x++) { const u = (x - 141) / 38; pset(x, y, u < 0.15 ? hex('#c09a68') : u > 0.85 ? hex('#4a3420') : h(x, y >> 2, 102) < 0.12 ? hex('#7a5a38') : hex('#9a7a50')); }
  for (let y = 0; y <= C_FONDO_V; y++) for (let x = 150; x <= 170; x++) pset(x, y, x === 150 ? hex('#4a3420') : x === 170 ? hex('#d0aa78') : x < 154 ? hex('#22160e') : c_b4(x, y) < 0.3 ? hex('#4a3420') : hex('#3a2818'));
  for (const y of [10, 60, 110]) { rect(139, y, 181, y + 3, CC.hierro); rect(139, y, 181, y, CC.hierroL); rect(150, y, 170, y + 3, hex("#2a2a30")); }
  // la esquina de Atom y la barra del año, tranquilas: arriba, la sombra de la cubierta
  for (let y = 0; y < 50; y++) for (let x = 262; x < 320; x++) pset(x, y, c_mez(R.pget(x, y), hex('#1a100a'), 0.55 * Math.min(1, (x - 262) / 14)));
  for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) pset(x, y, c_mez(R.pget(x, y), hex('#120a06'), 0.6 * Math.min(1, (26 - y) / 10)));
}

// la varilla de cerca, cada fotograma: la varilla que baja y sube (o.sonda), el agua, las ondas, las gotas y el pez
function c_varilla(R, t, o, v) {
  const cur = c_actual(R); cur.set(c_capa(R, 'varilla', () => c_varillaFija(R, v)));
  const s = Math.max(0, Math.min(1, o.sonda ?? 0.6)), yW = C_AGUA_V + Math.round(Math.sin(t * 1.1) * 1.5);
  const punta = s < 0.35 ? Math.round(-12 + (C_FONDO_V + 12) * (s / 0.35)) : s < 0.5 ? C_FONDO_V - Math.round(Math.abs(Math.sin(t * 6)) * 1) : s < 0.8 ? Math.round(C_FONDO_V - (C_FONDO_V - 84) * ((s - 0.5) / 0.3)) : 84;
  const mojada = s >= 0.35, mojLong = C_FONDO_V - C_AGUA_V;
  // la varilla: hierro con su brillo, una marca y un número cada pie; la parte mojada, oscura y brillante, y sus gotas
  for (let y = -2; y <= punta; y++) { const dp = punta - y, m = mojada && dp <= mojLong, c = m ? ((y + Math.floor(t * 8)) % 5 === 0 ? hex('#c8d2dc') : hex('#3a3e4a')) : CC.hierroL; R.pset(157, y, C.k); R.pset(158, y, m ? hex('#6a7484') : C.blanco); R.pset(159, y, c); R.pset(160, y, m ? hex('#22242c') : CC.hierro); R.pset(161, y, m ? hex('#14161c') : CC.hierroS); R.pset(162, y, C.k); }
  for (let k = 1; k * C_PIE < punta + 4; k++) { const y = punta - k * C_PIE; if (y < 26) break; R.rect(156, y, 163, y, C.k); R.rect(158, y, 160, y, hex('#e8d890')); R.numero(String(k), 166, y + 3, { color: mojada && k * C_PIE <= mojLong ? hex('#8ab0d0') : hex('#e8d8a8'), sombra: false, fina: true }); }
  R.rect(157, punta, 162, punta + 1, C.k);
  // el agua: dentro del tubo y fuera, con reflejos; la varilla por debajo del agua se ve más oscura
  for (let y = yW; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, d = y - yW, w = Math.sin(x * 0.12 + t * 2 + d * 0.9) + Math.sin(x * 0.04 - t + d * 0.3); const mov = Math.floor((x + t * ((d & 2) ? 8 : -6) + d * 11) / 6); let c = c_mez(cur[i], hex('#14222e'), 0.62); if (d === 0) c = h(Math.floor((x + t * 5) / 5), 0, 114) < 0.5 ? hex('#8aa8bc') : hex('#4a6478'); else if (d % 3 === 1 && h(mov, d, 115) < 0.18 + w * 0.04) c = c_mez(c, hex('#6a8aa0'), 0.6); else if (Math.abs(x - 160) < 22 - d * 0.4 && d < 30 && ((x + d) & 1) && h(mov, d, 116) < 0.5) c = c_mez(c, hex('#c8a060'), 0.25); cur[i] = c; }
  // los anillos que hace la varilla al entrar o salir, y las gotas que caen de la punta cuando sube
  if (s >= 0.33 && s < 0.85) { const f = (t * 1.5) % 1; R.anillo(160, yW + 1, 6 + f * 10, c_mez(hex('#4a6478'), C.blanco, 0.4 * (1 - f))); }
  if (s >= 0.5) for (let k = 0; k < 3; k++) { const f = (t * 1.6 + k / 3) % 1, y = Math.round(punta + 2 + f * (yW - punta - 2)); if (y < yW) R.pset(159 + (k & 1), y, hex('#9ab8cc')); else R.anillo(160, yW + 1, 2 + f * 3, hex('#7a9aae')); }
  // el gag del pececito: salta del agua junto al tubo y vuelve a caer, con su chapoteo
  if (s > 0.8) { const u = (s - 0.8) / 0.2, fx = Math.round(228 - u * 34), fy = Math.round(yW - 2 - Math.sin(u * Math.PI) * 40), a = Math.cos(u * Math.PI);
    const pez = ['....kkkk.....', '..kkSSSSkk..k', '.kSWSSSSSSkkk', 'kSkSSSSSSSkSk', '.kLLLLLLLLkkk', '..kkLLLLkk..k', '....kkkk.....'];
    pez.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const ch = f[i]; if (ch === '.') continue; const x = fx - 6 + i, y = fy - 3 + j + Math.round((i - 6) * a * 0.35); R.pset(x, y, ch === 'k' ? hex('#1a2a3a') : ch === 'S' ? hex('#7a9ab8') : ch === 'L' ? hex('#c8dce8') : C.blanco); } });
    for (const [x0, u0] of [[228, 0], [194, 1]]) { const e = Math.abs(u - u0); if (e < 0.35) { const f = e / 0.35; R.anillo(x0, yW + 1, 3 + f * 9, c_mez(hex('#8aa8bc'), C.blanco, 0.5 * (1 - f))); for (let k = 0; k < 5; k++) R.pset(x0 - 6 + k * 3, yW - Math.round(Math.sin(f * Math.PI) * (4 + k % 3 * 2)), hex('#c8dce8')); } } }
  const marca = mojada ? punta - mojLong : punta;
  return { marca: [160, marca], punta: [160, punta], agua: yW };
}

// qué pinta cada vista, y qué pinta delante de los actores
const c_PINTA = { 'cubierta.general': c_cubierta, 'cubierta.bomba': c_bomba, 'camarote.general': c_camarote, 'camarote.diario': c_diario, 'bodega.general': c_bodega, 'bodega.varilla': c_varilla };

const c_DELANTE = { 'cubierta.general': c_cubiertaDelante, 'camarote.general': c_camaroteDelante, 'bodega.general': c_bodegaDelante };

// qué vista piden las opciones (un encuadre que no existe cae en 'bahia'; la cámara, la del encuadre o 'general')
function d_vista(o) {
  const enc = V_GIBRALTAR[o.encuadre] ? o.encuadre : 'bahia', e = V_GIBRALTAR[enc], cam = o.camara === e.cam ? e.cam : 'general';
  return { enc, cam, geo: e[cam].geo };
}

// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1
const d_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_umbral = (x, y) => d_B4[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function d_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

const d_lim = (v) => Math.max(0, Math.min(1, v));

const d_suave = (v) => { const u = d_lim(v); return u * u * (3 - 2 * u); };

// la esquina de Atom y la barra del año: ni nubes ni gaviotas ni humo
const d_veda = (x, y) => (x >= 268 && y < 50) || (y < 24 && x >= 12 && x <= 178);

// los colores de Gibraltar: el cielo de invierno, el agua de la bahía, la caliza y el matorral del Peñón, la ciudad, la
// muralla y el muelle; la sala del tribunal (yeso, caoba, roble, terciopelo, latón); la espada y el óxido
const d_P = pal({
  nubeS: '#9eb2c8', nube: '#d8e2ec', nubeL: '#f8fafc', sol: '#fff6d8', solS: '#ffe8a8',
  aguaH: '#1d4561', aguaM: '#295c7a', aguaC: '#3f7896', aguaL: '#7aa8c0', brillo: '#e8f6fa',
  calizaL: '#f0e8d0', caliza: '#d8cca8', calizaS: '#b4a682', calizaD: '#857858', grieta: '#62583f',
  mat: '#7c8a58', matS: '#5c6c40', matD: '#3e4e2e', matL: '#9aa86c',
  lejos: '#93aac0', lejosS: '#7e96ae', lejosL: '#aec0d0', lejos2: '#a8bccd',
  casa: '#f2eee2', casaS: '#cfc8b6', ocreC: '#e8cc98', ocreCS: '#c4a874', rosaC: '#e8bca4', rosaCS: '#c49a84', amar: '#eedca0',
  teja: '#b8603e', tejaS: '#8a4430', tejaL: '#d07a52', ventana: '#3a3a48', persiana: '#4a7a52', ciprés: '#3e5a3a', ciprésS: '#2a4028',
  muro: '#b8ae94', muroS: '#8e8670', muroD: '#5e584a', muroL: '#d2c8ae', canon: '#2a2a30',
  losa: '#a8a090', losaS: '#868070', losaL: '#c4bcaa', losaJ: '#5e584e', losaD: '#726b5e', musgo: '#6e7a4a',
  hierro: '#2e2e36', hierroL: '#5c5c68', cuerda: '#c8b080', cuerdaS: '#8a7450', cuerdaL: '#e0cc9c',
  madera: '#8a6440', maderaS: '#5e4228', maderaL: '#b08a5a', maderaD: '#3a2818', interior: '#2a1c14', interiorL: '#4a3424',
  negro: '#141418', verdeDGL: '#3e6448', verdeDGS: '#1c3424', blanco: '#f8f6f0', blancoS: '#d8d4cc', jarcia: '#2c2620',
  grisS: '#625e56', rojo: '#b83a32', rojoS: '#8a2a24', azul: '#2a3a7a', vidrio: '#34465a', vidrioL: '#9cbcd4',
  casaca: '#c8302a', casacaS: '#86201c', chaqueta: '#2e3a5a', chaquetaS: '#1e2840', pantalon: '#3a3a44', piel: '#e8b088', pielS: '#b88060',
  humo: '#d4d4d8', humoS: '#a6a6ae', humoD: '#76767e', gaviota: '#f6f6f2', gaviotaS: '#a8acb2', pico: '#f0b030',
  techo: '#ddd2b8', techoS: '#d5c9ae', yeso: '#d6c8a8', yesoS: '#bcae8e', yesoL: '#e8dcc0',
  pared: '#c9b68e', paredS: '#b7a37a', paredL: '#d6c49e', cenefa: '#8a6a44',
  roble: '#6a4428', robleS: '#4a2e1a', robleL: '#8a5e38', robleD: '#2e1c10',
  caoba: '#5c2c1c', caobaS: '#3e1c12', caobaL: '#7c4028', caobaD: '#26100a',
  terc: '#7a1e26', tercS: '#521218', tercL: '#9a3038', tabla: '#7a5232', tablaS: '#5a3a22', tablaL: '#946642', tablaD: '#3e2614',
  alf: '#8a2a2a', alfS: '#5e1a1a', alfL: '#b04a3a', pano: '#3a6048', panoS: '#284434', panoL: '#4e7a5c',
  laton: '#d8b048', latonS: '#9a7424', latonL: '#f4dc8a', papel: '#ece0c4', papelS: '#c8b894', papelL: '#faf2de', tinta: '#2a2a3a', cinta: '#c0282c', cintaS: '#8a1a1e',
  peluca: '#ece8e0', pelucaS: '#b8b2a6', toga: '#a01e26', togaS: '#6e141a', negroT: '#26222c', negroTL: '#3e3846',
  gas: '#fff4c0', gasS: '#f8c858', gasD: '#e08a30', cuero: '#6a4428', cueroS: '#4a2e1a', cueroL: '#8a5c38',
  acero: '#c4c8d2', aceroS: '#8c929e', aceroL: '#f2f6fa', aceroD: '#5a606c', mancha: '#6e3e1e', manchaS: '#4a2812', manchaL: '#8a5430',
  oxido: '#d0702a', oxidoL: '#f0a050', oxidoS: '#9a4818', cristal: '#d8ecf0', cristalS: '#a8c4cc', liquido: '#e6d88e', liquidoS: '#c4b464',
});

const d_CIELO = ['#5b8fc6', '#6a9cd0', '#7eacd9', '#96bee1', '#b2d0e7', '#cfe0ea'].map(hex);

// los búferes fijos (uno por clave), que se pintan una vez por lienzo y se copian o se vuelcan en cada fotograma
const d_CACHE = new WeakMap();

function d_buf(R, clave, dibuja) {
  let m = d_CACHE.get(R); if (!m) d_CACHE.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(b); R.recorte(null); R.usar(prev); m.set(clave, b); }
  return b;
}

// vuelca un búfer con huecos (0 = transparente) sobre el lienzo
function d_volcar(R, b) { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c) B[i] = c; } }

// el cielo tramado de invierno hasta hor (seis bandas fundidas con el tramado ordenado) y el sol con su halo tramado
function d_cielo(R, hor, sol) {
  const B = R.buf, n = d_CIELO.length - 1;
  for (let y = 0; y < hor; y++) { const f = (y / hor) * n, i = Math.min(n, Math.floor(f)), p = f - i;
    for (let x = 0; x < 320; x++) B[y * 320 + x] = i < n && d_umbral(x, y) < p ? d_CIELO[i + 1] : d_CIELO[i]; }
  // cirros quietos y muy finos, lejos de la barra del año y de la esquina de Atom
  for (let k = 0; k < 5; k++) { const y = Math.round(30 + h(k, 1, 401) * (hor * 0.45)), x0 = Math.round(h(k, 2, 401) * 280), w = 30 + Math.round(h(k, 3, 401) * 50);
    for (let x = x0; x < x0 + w; x++) if (!d_veda(x, y) && h(x >> 2, k, 402) > 0.3 && x < 320) { B[y * 320 + x] = d_mezcla(B[y * 320 + x], d_P.nubeL, 0.45); if ((x & 3) === 0 && !d_veda(x + 3, y - 1)) R.pset(x + 3, y - 1, d_mezcla(B[(y - 1) * 320 + x + 3], d_P.nubeL, 0.3)); } }
  if (sol) { const [sx, sy, sr] = sol, R2 = sr + 14;
    for (let y = sy - R2; y <= sy + R2; y++) for (let x = sx - R2; x <= sx + R2; x++) { if (y < 0 || x < 0 || x > 319) continue; const d = Math.hypot(x - sx, y - sy); if (d > R2) continue;
      if (d <= sr) R.pset(x, y, d > sr - 1.3 ? d_P.solS : d_P.sol); else { const q = 1 - (d - sr) / (R2 - sr); if (d_umbral(x, y) < q * q * 0.95) R.pset(x, y, d_mezcla(R.pget(x, y), d_P.sol, 0.38)); } } }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba a la izquierda) con la base plana; respeta la veda
function d_nube(R, cx, cy, w, sem, c) {
  const n = 3 + Math.round(w / 12), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.13 + 0.15 * Math.cos(u * Math.PI) + 0.06 * h(i, sem, 911)); bolas.push([cx + u * w * 0.85, cy - r * 0.4 + (h(i, sem, 912) - 0.5) * w * 0.05, r]); }
  const pinta = (dx, dy, k, col) => { for (const [x, y, r] of bolas) { const rr = r * k;
    for (let yy = Math.floor(y + dy - rr); yy <= y + dy + rr; yy++) for (let xx = Math.floor(x + dx - rr); xx <= x + dx + rr; xx++) if ((xx + 0.5 - x - dx) ** 2 + (yy + 0.5 - y - dy) ** 2 <= rr * rr && !d_veda(xx, yy)) R.pset(xx, yy, col); } };
  pinta(0, 1, 1, c[0]); pinta(0, 0, 0.92, c[1]); pinta(-1, -1.4, 0.6, c[2]);
  const yb = Math.round(cy + w * 0.08); for (let x = Math.round(cx - w * 0.44); x <= cx + w * 0.44; x++) { if (!d_veda(x, yb)) R.pset(x, yb, c[0]); if (!d_veda(x, yb - 1) && Math.abs(x - cx) < w * 0.38) R.pset(x, yb - 1, c[1]); }
}

// tres capas de nubes que el levante empuja hacia la izquierda: lejanas (pequeñas, lentas, desvaídas), medianas y cercanas
// (grandes y rápidas), entre y0 e y1
function d_nubes(R, t, y0, y1, sem = 0, n = [3, 3, 2]) {
  const fondo = d_CIELO[3], capas = [[1.2, 12, 22, 0.5], [2.6, 22, 34, 0.22], [5, 34, 50, 0]];
  capas.forEach(([vel, w0, w1, des], L) => { const col = [d_P.nubeS, d_P.nube, d_P.nubeL].map((c) => d_mezcla(c, fondo, des));
    for (let k = 0; k < n[L]; k++) { const w = w0 + h(k, L, 921 + sem) * (w1 - w0), span = 320 + w * 2 + 60, x = ((h(k, L, 922 + sem) * span - t * vel) % span + span) % span - w - 30;
      const y = L === 0 ? y1 - 6 - h(k, L, 923 + sem) * (y1 - y0) * 0.35 : y0 + 4 + h(k, L, 923 + sem) * (y1 - y0) * (L === 2 ? 0.45 : 0.75);
      d_nube(R, x, y, w, k * 7 + L + sem, col); } });
}

// una gaviota en vuelo (aleteo de cuatro fases), de unos 7 px; respeta la veda
function d_gaviota(R, x, y, t, k = 0, c = d_P.gaviota, s = d_P.gaviotaS) {
  x = Math.round(x); y = Math.round(y); if (d_veda(x, y) || d_veda(x - 3, y - 2) || d_veda(x + 4, y - 2)) return;
  const f = Math.floor(t * 5 + k * 1.7) % 4, ala = f === 0 ? -2 : f === 2 ? 1 : f === 1 ? -1 : 0;
  R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x + 2, y, d_P.pico); R.pset(x - 1, y, s);
  R.pset(x - 1, y + Math.round(ala * 0.5), c); R.pset(x - 2, y + ala, c); R.pset(x - 3, y + ala + (ala < 0 ? 0 : 0), s);
  R.pset(x + 1, y + Math.round(ala * 0.5) - (ala ? 0 : 0), c); R.pset(x + 2, y + ala, c); R.pset(x + 3, y + ala, s);
}

// una gaviota posada (x: centro, y: patas) que mira, agacha la cabeza y de vez en cuando abre las alas
function d_gaviotaPosada(R, x, y, t, k = 0) {
  const P = d_P, abre = (t + k * 3.1) % 7 < 0.5, mira = Math.floor((t + k) / 2.3) % 2 ? 1 : -1;
  R.pset(x, y, P.pico); R.pset(x + 1, y, P.pico);
  R.rect(x - 1, y - 3, x + 2, y - 1, P.gaviota); R.rect(x - 1, y - 2, x + 2, y - 2, P.gaviotaS); R.pset(x - 2, y - 2, P.gaviotaS);
  R.rect(x + (mira > 0 ? 1 : -1), y - 5, x + (mira > 0 ? 2 : 0), y - 4, P.gaviota); R.pset(x + (mira > 0 ? 3 : -2), y - 4, P.pico); R.pset(x + (mira > 0 ? 2 : -1), y - 5, P.negro);
  if (abre) { R.linea(x - 1, y - 3, x - 5, y - 6, P.gaviota); R.linea(x + 2, y - 3, x + 6, y - 6, P.gaviota); R.pset(x - 5, y - 6, P.gaviotaS); R.pset(x + 6, y - 6, P.gaviotaS); }
}

// una figurita de fondo de unos 10 px (pies en x, y): tipo 'marinero' | 'casaca' (el centinela, con chacó y fusil) |
// 'paseante' | 'dama' | 'remero' (sentado, rema con o.fase); o.anda, o.dir, o.brazo 0–1 (sube un brazo, saluda o tira)
const d_FIG = {
  marinero: { gorro: 'chaquetaS', ropa: 'chaqueta', ropaS: 'chaquetaS', pierna: 'pantalon' },
  casaca: { gorro: 'negro', ropa: 'casaca', ropaS: 'casacaS', pierna: 'negro', chaco: true },
  paseante: { gorro: 'negroT', ropa: 'roble', ropaS: 'robleS', pierna: 'pantalon' },
  dama: { gorro: 'terc', ropa: 'azul', ropaS: 'chaquetaS', pierna: null },
  remero: { gorro: 'blanco', ropa: 'cuerdaS', ropaS: 'maderaS', pierna: 'pantalon' },
};

function d_figura(R, x, y, t, tipo, o = {}) {
  const F = d_FIG[tipo], P = d_P, dir = o.dir ?? 1, { rect, pset } = R; x = Math.round(x); y = Math.round(y);
  const paso = o.anda ? Math.floor(t * 6 + x * 0.3) % 2 : 0, ropa = P[F.ropa], ropaS = P[F.ropaS];
  if (tipo !== 'remero') {
    if (F.pierna) { rect(x - 1, y - 2, x - 1, y - (paso ? 1 : 0), P[F.pierna]); rect(x + 1, y - 2, x + 1, y - (paso ? 0 : 1), P[F.pierna]); pset(x - 1, y - (paso ? 1 : 0), P.negro); pset(x + 1, y - (paso ? 0 : 1), P.negro); }
    else rect(x - 2, y - 3, x + 2, y, ropa);
    rect(x - 1, y - 6, x + 1, y - 3, ropa); pset(x - dir, y - 5, ropaS); pset(x - dir, y - 4, ropaS);
    if (F.chaco) { pset(x, y - 5, P.blanco); pset(x - 1, y - 4, P.blanco); pset(x + 1, y - 6, P.blanco); }
    // los brazos: el de atrás pegado; el de delante sube con o.brazo
    pset(x - 2 * dir, y - 5, ropaS); pset(x - 2 * dir, y - 4, P.piel);
    const b = o.brazo ?? 0; if (b > 0.5) { pset(x + 2 * dir, y - 6, ropa); pset(x + 2 * dir, y - 7, ropa); pset(x + 2 * dir, y - 8, P.piel); } else if (b > 0) { pset(x + 2 * dir, y - 5, ropa); pset(x + 3 * dir, y - 6, P.piel); } else { pset(x + 2 * dir, y - 5, ropa); pset(x + 2 * dir, y - 4, P.piel); }
    rect(x - 1, y - 8, x, y - 7, P.piel); pset(x + (dir > 0 ? 0 : -1), y - 7, P.pielS);
    if (F.chaco) { rect(x - 1, y - 10, x, y - 9, P.negro); pset(x, y - 10, P.hierroL); if (o.fusil !== false) { rect(x - 2 * dir, y - 11, x - 2 * dir, y - 5, P.maderaD); pset(x - 2 * dir, y - 12, P.acero); } }
    else if (tipo === 'dama') { rect(x - 2, y - 9, x + 1, y - 9, P[F.gorro]); pset(x - 1, y - 10, P[F.gorro]); }
    else rect(x - 1, y - 9, x, y - 9, P[F.gorro]);
  } else {
    // remero sentado: el torso se inclina con la palada
    const f = o.fase ?? 0, ax = Math.round(Math.sin(f) * 1.5);
    rect(x - 1 + ax, y - 5, x + 1 + ax, y - 2, ropa); pset(x - 1 + ax, y - 3, ropaS); rect(x - 1 + ax, y - 7, x + ax, y - 6, P.piel); rect(x - 1 + ax, y - 8, x + ax, y - 8, P[F.gorro]);
  }
}

// una pieza de muralla: sillares con juntas, cordón, aspilleras con sus cañones (x0–x1, y0–y1)
function d_muralla(R, x0, x1, y0, y1, s = 1, cada = 22) {
  const P = d_P;
  R.rect(x0, y0, x1, y1, P.muro); R.rect(x0, y0, x1, y0, P.muroL); R.rect(x0, y0 + 1, x1, y0 + s, P.muroS);
  for (let y = y0 + 2 + s; y < y1; y += 3 * s) { R.rect(x0, y, x1, y, P.muroS); for (let x = x0 + ((y >> 1) % 2) * 4 * s; x < x1; x += 8 * s) R.pset(x, y + 1, P.muroS); }
  for (let y = y0 + 2; y <= y1; y++) for (let x = x0; x <= x1; x++) if (h(x, y, 431) > 0.92) R.pset(x, y, h(x, y, 432) > 0.5 ? P.muroL : P.muroD);
  R.rect(x0, y1 - s, x1, y1, P.muroD);
  for (let x = x0 + cada / 2; x < x1 - 3; x += cada) { R.rect(x, y0 + 1 + s, x + 2 * s, y0 + 3 * s, P.muroD); R.rect(x + s, y0 + 2 * s, x + 2 * s + s, y0 + 2 * s, P.canon); }
}

// una fila de casas escalonadas (de atrás hacia delante): fachadas encaladas, ocres y rosas con su lado en sombra,
// tejados de teja con su alero, ventanas con persianas verdes, chimeneas; top (cresta del Peñón) evita que asomen por
// encima de la roca. s: escala; devuelve las chimeneas [x, y]
function d_ciudad(R, x0, x1, y0, y1, s, sem, top) {
  const P = d_P, pal = [[P.casa, P.casaS], [P.casa, P.casaS], [P.ocreC, P.ocreCS], [P.rosaC, P.rosaCS], [P.amar, P.ocreCS], [P.casa, P.casaS]], filas = [], chim = [];
  for (let yb = y1, f = 0; yb > y0 && f < 12; f++) { filas.push(yb); yb -= Math.round((4 + h(f, 1, sem) * 2) * s); }
  for (let f = filas.length - 1; f >= 0; f--) { const yb = filas[f];
    for (let x = x0 + Math.round(h(f, 2, sem) * 6 * s); x < x1;) { const w = Math.round((6 + h(x, f, sem + 1) * 7) * s), hh = Math.round((5 + h(x, f, sem + 2) * 3) * s), [c, cS] = pal[Math.floor(h(x, f, sem + 3) * pal.length)];
      const yt = yb - hh; if (top && (top[Math.min(319, Math.max(0, x))] > yt - 2 || top[Math.min(319, x + w)] > yt - 2)) { x += w + 2; continue; }
      if (h(x, f, sem + 4) < 0.12) { // un ciprés o un pino entre las casas
        R.rect(x + 1, yb - hh - 3 * s, x + 2 * s, yb, P.ciprésS); R.rect(x + 1, yb - hh - 3 * s, x + s, yb - 2, P.ciprés); x += 3 * s + 1; continue; }
      R.rect(x, yt, x + w, yb, c); R.rect(x + w - Math.max(1, s), yt, x + w, yb, cS);
      R.rect(x - 1, yt - s, x + w + 1, yt - 1, P.teja); R.rect(x - 1, yt - 1, x + w + 1, yt - 1, P.tejaS); for (let q = x; q <= x + w; q += 2) R.pset(q, yt - s, P.tejaL);
      for (let wy = yt + 1 + s; wy < yb - s; wy += 3 * s) for (let wx = x + 1 + s; wx < x + w - s; wx += 3 * s) { R.rect(wx, wy, wx + s - 1, wy + s - (s > 1 ? 0 : 1), P.ventana); if (s > 1 && h(wx, wy, sem + 5) < 0.5) { R.pset(wx - 1, wy, P.persiana); R.pset(wx + s, wy, P.persiana); } else if (h(wx, wy, sem + 5) < 0.3) R.pset(wx, wy, P.persiana); }
      if (h(x, f, sem + 6) < 0.25) { const cx = x + Math.round(w * 0.7); R.rect(cx, yt - 2 * s - 1, cx + s, yt - s, P.casaS); chim.push([cx, yt - 2 * s - 2]); }
      x += w + 1 + Math.round(h(x, f, sem + 7) * 2);
    } }
  return chim;
}

// el Peñón: la caliza clara con estratos, grietas y barrancos en sombra; el matorral que se espesa hacia abajo y la cara
// norte desnuda (x < norte) en sombra; pts: el perfil cerrado; s: escala de la textura. Devuelve la cresta (y por x)
function d_penon(R, pts, s, norte, mat = 40) {
  const P = d_P, top = new Float32Array(320).fill(999);
  for (let i = 0; i + 1 < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[i + 1]; if (bx === ax) continue;
    for (let x = Math.ceil(Math.min(ax, bx)); x <= Math.floor(Math.max(ax, bx)); x++) if (x >= 0 && x < 320) top[x] = Math.min(top[x], ay + (by - ay) * (x - ax) / (bx - ax)); }
  const k = 1 / s;
  R.poligono(pts, (x, y) => {
    const d = y - top[x], n = h(x >> (s - 1), y >> (s - 1), 501), n2 = h(x >> (s + 2), y >> (s + 2), 502);
    if (d < 1) return P.calizaL;
    const cara = x < norte;
    const g = Math.sin(x * 0.07 * k + y * 0.03 * k) + Math.sin(x * 0.17 * k - y * 0.05 * k + 1.3) * 0.6 + (n2 - 0.5) * 0.9;
    const sombra = g > 1.0 || (cara && d_umbral(x, y) < 0.6);
    const dens = cara ? 0 : Math.min(0.8, Math.max(0, (d - 5 * s) / mat));
    if (dens > 0.15 && h(x, y, 504) < dens * 0.35) return sombra ? P.matD : P.matS;
    if (((y + ((x >> 3) & 3)) % (6 * s)) === 0 && n > 0.3) return sombra ? P.calizaD : P.calizaS;
    if (h(x >> s, y >> (s + 2), 503) > 0.94) return sombra ? P.grieta : P.calizaD;
    if (sombra) return d_umbral(x, y) < 0.3 + (g - 1) * 0.5 ? P.calizaD : P.calizaS;
    return n > 0.82 ? P.calizaL : n < 0.16 ? P.calizaS : P.caliza;
  });
  // las matas: bolas de tres tonos (sombra abajo a la derecha, cuerpo, luz arriba a la izquierda), más juntas hacia abajo
  const yb = Math.max(...pts.map((p) => p[1])), xs = pts.map((p) => p[0]), xa = Math.max(0, Math.min(...xs)), xb = Math.min(319, Math.max(...xs));
  for (let i = 0; i < 2600 / s; i++) { const x = Math.round(xa + h(i, 1, 507) * (xb - xa)), y = Math.round(top[x] + h(i, 2, 507) * (yb - top[x])); if (x < norte || y >= yb - 1) continue;
    const dens = Math.min(0.9, (y - top[x] - 4 * s) / mat); if (dens <= 0 || h(i, 3, 507) > dens) continue; const r = (0.8 + h(i, 4, 507) * 1.3) * s;
    R.disco(x + 0.6, y + 0.8, r, P.matD); R.disco(x, y, r * 0.85, h(i, 5, 507) < 0.4 ? P.matS : P.mat); R.disco(x - r * 0.3, y - r * 0.35, r * 0.4, P.matL); }
  return top;
}

// el agua de la bahía entre y0 e y1 (más oscura y con olas más anchas cuanto más cerca), con el reflejo de lo que haya
// en el búfer refl encima de yr (tembloroso y tintado) y el brillo del sol en la columna sx
function d_agua(R, t, y0, y1, refl, yr, sx) {
  const B = R.buf, P = d_P;
  for (let y = y0; y < y1; y++) { const f = (y - y0) / (y1 - y0), esc = 0.45 + f * 1.3, base = f < 0.3 ? P.aguaC : f < 0.7 ? P.aguaM : P.aguaH, alt = f < 0.3 ? P.aguaM : f < 0.7 ? P.aguaH : P.aguaM;
    const pr = (f < 0.3 ? f / 0.3 : f < 0.7 ? (f - 0.3) / 0.4 : 0.3);
    for (let x = 0; x < 320; x++) {
      const w = Math.sin(x * 0.13 / esc + t * 1.2 + y * 1.9) + Math.sin(x * 0.05 / esc - t * 0.8 + y * 0.7) * 0.8 + (h(x >> 2, y, 41) - 0.5) * 0.7;
      let c = d_umbral(x, y) < pr * 0.6 ? alt : base;
      if (refl && y < yr + (yr - y0 + 30)) { const ry = 2 * yr - y + Math.round(Math.sin(y * 0.9 + t * 2) * 0.8), rx = x + Math.round(Math.sin(y * 1.3 + t * 1.7) * 1.2);
        if (ry >= 0 && ry < yr && rx >= 0 && rx < 320) { const rc = refl[ry * 320 + rx]; if (rc && (x + y) % 3) c = d_mezcla(rc, c, 0.55 + f * 0.3); } }
      if (w > 1.35) c = f < 0.5 ? P.aguaL : P.aguaC; else if (w < -1.45) c = P.aguaH;
      if (Math.abs(x - sx) < 6 + f * 14 && w > 0.9 && h(x, y, Math.floor(t * 5)) > 0.55) c = P.brillo;
      B[y * 320 + x] = c;
    } }
}

// humo que sube de (x, y) y el viento lleva hacia dx (a la izquierda), en bocanadas que crecen y se aclaran
function d_humo(R, t, x, y, alto, dx, k = 0, cols = [d_P.humoD, d_P.humoS, d_P.humo]) {
  for (let i = 0; i < 9; i++) { const u = ((t * 0.32 + i / 9 + k * 0.13) % 1), px = x + dx * u * u * 2 + Math.sin(t * 1.5 + i) * 1.2, py = y - u * alto, r = 1 + u * 3.5;
    const c = u < 0.25 ? cols[0] : u < 0.6 ? cols[1] : cols[2]; if (u > 0.85 && (i & 1)) continue;
    for (let yy = Math.floor(py - r); yy <= py + r; yy++) for (let xx = Math.floor(px - r); xx <= px + r; xx++) if ((xx + 0.5 - px) ** 2 + (yy + 0.5 - py) ** 2 <= r * r && !d_veda(xx, yy) && (u < 0.7 || d_umbral(xx, yy) < 1.6 - u * 1.4)) R.pset(xx, yy, c); }
}

// una bandera pequeña que ondea (x, y: puño en el asta; w × 5): la británica (azul con la cruz roja y blanca)
function d_bandera(R, x, y, t, w = 8, dir = 1) {
  const P = d_P;
  for (let i = 0; i < w; i++) for (let j = 0; j < 5; j++) { const yy = y + j + Math.round(Math.sin(t * 5 - i * 0.8) * (i / w) * 1.4), xx = x + dir * (i + 1);
    const cruz = Math.abs(j - 2) < 1 || Math.abs(i - Math.floor(w / 2)) < 1, filo = Math.abs(j - 2) < 2 || Math.abs(i - Math.floor(w / 2)) < 2, diag = Math.abs(i * 5 / w - j) < 0.7 || Math.abs(i * 5 / w - (4 - j)) < 0.7;
    R.pset(xx, yy, cruz ? P.rojo : filo || diag ? P.blanco : P.azul); }
}

// un bolardo de hierro fundido (x: centro, y: base) con su brillo
function d_bolardo(R, x, y, s = 1) {
  const P = d_P;
  R.rect(x - 2 * s, y - 4 * s, x + 2 * s, y, P.hierro); R.rect(x - 3 * s, y - 6 * s, x + 3 * s, y - 4 * s, P.hierro); R.rect(x - 2 * s, y - 7 * s, x + 2 * s, y - 7 * s, P.hierro);
  R.rect(x - 1 * s, y - 6 * s, x - 1 * s, y - 1, P.hierroL); R.pset(x - 2 * s, y - 6 * s, P.hierroL); R.rect(x - 3 * s, y + 1, x + 3 * s, y + 1, P.losaJ);
}

// una cuerda que cuelga entre dos puntos (comba en px) con su sombra
function d_cuerda(R, x0, y0, x1, y1, comba, c = d_P.cuerda, cS = d_P.cuerdaS) {
  const n = Math.max(2, Math.ceil(Math.abs(x1 - x0) + Math.abs(y1 - y0))); let px = null, py = null;
  for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u + comba * 4 * u * (1 - u));
    if (x === px && y === py) continue; R.pset(x, y, (x + y) % 3 ? c : cS); R.pset(x, y + 1, cS); px = x; py = y; }
}

function d_bahia(R, t, o) {
  const P = d_P, hor = 110, llega = d_lim(o.llega ?? 1), L = 150;
  R.copiar(d_buf(R, 'bahia.cielo', () => d_cielo(R, hor + 2, [70, 44, 6])));
  d_nubes(R, t, 26, 92, 0, [3, 3, 2]);
  // gaviotas lejanas detrás del Peñón
  for (let k = 0; k < 3; k++) { const x = ((h(k, 1, 441) * 400 + t * (6 + k * 2)) % 400) - 40, y = 60 + h(k, 2, 441) * 26 + Math.sin(t * 0.8 + k) * 4; d_gaviota(R, x, y, t, k, P.gaviotaS, P.lejosS); }
  const capa = d_buf(R, 'bahia.capa', () => d_bahiaFija(R));
  d_agua(R, t, hor, 147, capa, hor, 70);
  d_volcar(R, capa);
  // las chimeneas de la ciudad que humean, el humo del vapor, la bandera del baluarte y la del buque
  for (const [cx, cy, k] of [[196, 92, 0], [232, 84, 1], [276, 96, 2]]) d_humo(R, t, cx, cy, 12, -5, k, [P.humoS, P.humo, P.nubeL]);
  d_humo(R, t * 1.2, 266, 103, 26, -14, 3);
  d_bandera(R, 247, 89, t, 8, 1); d_bandera(R, 299, 104, t + 1, 6, 1);
  // gente diminuta que pasea por el adarve de la muralla del puerto (y 103, x 150–226): un soldado, una pareja
  for (const [ca, cb, vel, k] of [[P.casaca, P.casacaS, 3, 0], [P.terc, P.tercS, 2, 1], [P.chaqueta, P.negroT, 2, 1.06]]) {
    const L = 76, q = ((t * vel + h(Math.floor(k), 6, 441) * L * 2 + (k % 1) * 100) % (2 * L) + 2 * L) % (2 * L), x = Math.round(150 + (q < L ? q : 2 * L - q)), p = Math.floor(t * 4 + k * 3) % 2;
    R.rect(x, 99, x + 1, 101, ca); R.pset(x + 1, 101, cb); R.pset(x, 98, P.piel); R.pset(x + 1, 98, ca === P.terc ? P.terc : P.negroT); R.pset(x + p, 102, P.negroT); R.pset(x + 1 - p, 102, P.negroT); }
  // dos falúas de vela latina que cruzan despacio por el fondo
  for (let k = 0; k < 2; k++) { const x = Math.round(((h(k, 3, 441) * 380 + t * (3 + k * 2) * (k ? -1 : 1)) % 380 + 380) % 380 - 30), y = 118 + k * 4;
    R.rect(x - 4, y - 1, x + 4, y, P.maderaS); R.pset(x - 5, y - 1, P.maderaS); R.rect(x - 3, y + 1, x + 3, y + 1, P.aguaH);
    R.poligono([[x - 1, y - 2], [x + 5, y - 2], [x - 2, y - 11]], P.blanco); R.linea(x - 1, y - 2, x - 2, y - 11, P.blancoS); R.linea(x - 4, y - 7, x + 5, y - 1, P.maderaD); }
  // un bote de remos con dos remeros que cruza de derecha a izquierda, con su estela
  { const span = 420, bx = Math.round(330 - ((t * 7 + 120) % span)), by = 134, f = t * 3.2;
    if (bx > -20 && bx < 340) { for (let i = 1; i < 18; i++) if ((i + Math.floor(t * 4)) % 3) R.pset(bx + 8 + i, by + 1 + (i & 1), P.aguaL);
      R.poligono([[bx - 8, by - 3], [bx + 7, by - 3], [bx + 5, by + 1], [bx - 6, by + 1]], P.madera); R.rect(bx - 8, by - 3, bx + 7, by - 3, P.maderaL); R.rect(bx - 6, by, bx + 5, by, P.maderaS);
      d_figura(R, bx - 3, by - 2, t, 'remero', { fase: f }); d_figura(R, bx + 3, by - 2, t, 'remero', { fase: f });
      const rx = Math.round(Math.cos(f) * 3); for (const ox of [-3, 3]) { R.linea(bx + ox, by - 4, bx + ox + rx - 2, by + 2, P.maderaL); R.linea(bx + ox, by - 4, bx + ox + rx + 3, by + 2, P.maderaL); } } }
  // EL MARY CELESTE: entra desde la izquierda con las velas a medio largar y amarra
  const xs = lerp(-125, 118, d_suave(llega)), mov = llega < 0.98, yw = 145 + Math.round(Math.sin(t * 1.3) * 0.5), rot = mov ? Math.sin(t * 0.9) * 0.012 : Math.sin(t * 0.7) * 0.004;
  const xb = Math.round(xs);
  if (mov) for (let i = 0; i < 26; i++) { const wx = xb - 60 - i * 3 + Math.round(Math.sin(i + t * 3)), wy = yw - 1 + (i % 3); if (h(i, Math.floor(t * 4), 451) > 0.4) R.pset(wx, wy, P.aguaL); }
  const vel = d_lim((0.85 - llega) / 0.4) * 0.7, B = d_bergantin(R, xb, yw, L, t, { flota: 1, velas: vel, bote: false, rot });
  if (mov) for (let i = 0; i < 6; i++) { const [px, py] = B.proa; R.pset(px + 1 + (i % 3), yw - 1 - (i >> 1) + Math.round(Math.sin(t * 6 + i)), P.espuma ?? P.blanco); }
  // los tres marineros del Dei Gratia a bordo: al timón, en el combés y en la proa (saluda al amarrar)
  const nm = o.marineros ?? 3, sitio = [[-0.44, 'timon'], [0.02, 'tira'], [0.34, 'saluda']];
  for (let k = 0; k < Math.min(3, nm); k++) { const [u, que] = sitio[k], [px, py] = B.P(u * L, B.vd(u * L) + 2);
    const br = que === 'saluda' ? (llega > 0.97 ? (Math.sin(t * 7) > 0 ? 1 : 0.6) : 0) : que === 'tira' ? (mov ? (Math.sin(t * 4) > 0 ? 1 : 0.4) : 0.4 * (Math.sin(t * 2) > 0.5 ? 1 : 0)) : 0.4;
    d_figura(R, px, py, t, 'marinero', { dir: que === 'timon' ? 1 : que === 'saluda' ? -1 : 1, brazo: br }); }
  // la regala por delante de los pies
  for (let u = -0.5 * L; u < 0.5 * L; u += 1) { const [px, py] = B.P(u, B.vd(u) + 1); R.pset(px, py, C.tabla); R.pset(px, py + 1, C.tablaS); }
  // amarrado: las amarras de proa y de popa a los bolardos
  if (llega > 0.97) { const [ax, ay] = B.P(0.47 * L, B.vd(0.47 * L)), [bx, by] = B.P(-0.47 * L, B.vd(-0.47 * L)); d_cuerda(R, ax, ay, 204, 142, 4); d_cuerda(R, bx, by, 34, 142, 4); }
  // las gaviotas: una posada en el bolardo de la izquierda y cinco que planean
  d_gaviotaPosada(R, 34, 140, t, 0);
  for (let k = 0; k < 5; k++) { const span = 380, x = ((h(k, 4, 441) * span + t * (10 + k * 3) * (k % 2 ? -1 : 1)) % span + span) % span - 30, y = 52 + h(k, 5, 441) * 46 + Math.sin(t * 1.1 + k * 2) * 5; d_gaviota(R, x, y, t, k + 3); }
  // un charco del muelle: cae una gota de vez en cuando
  { const u = (t % 3.3) / 1.2; if (u < 1) { const r = 1 + u * 4; for (let a = 0; a < 6.28; a += 0.5) R.pset(Math.round(96 + Math.cos(a) * r), Math.round(171 + Math.sin(a) * r * 0.35), P.aguaL); } }
  return { muelle: [118, 147], barco: [xb, yw], cubierta: B.P(0, B.vd(0))[1], bolardos: [[34, 147], [204, 147]] };
}
// lo fijo de la bahía (en un búfer con huecos): las sierras lejanas, el Peñón, el castillo, la ciudad, la muralla y el
// baluarte, el buque de guerra y el velero fondeados y el muelle con sus losas, bolardos, toneles y farol
function d_bahiaFija(R) {
  const P = d_P, { rect, pset } = R;
  // las sierras de España, lejos y en la bruma, con un pueblo blanco
  R.poligono([[0, 96], [30, 90], [62, 93], [96, 86], [128, 91], [160, 89], [160, 111], [0, 111]], (x, y) => (y < 92 + (x % 7 === 0 ? 1 : 0) ? P.lejos2 : d_umbral(x, y) < 0.4 ? P.lejosL : P.lejos2));
  R.poligono([[0, 102], [40, 98], [80, 101], [120, 97], [156, 100], [156, 111], [0, 111]], (x, y) => (d_umbral(x, y) < 0.35 ? P.lejosS : P.lejos));
  for (let k = 0; k < 16; k++) { const x = 8 + Math.round(h(k, 1, 461) * 70), y = 103 + Math.round(h(k, 2, 461) * 4); rect(x, y, x + 2, y + 1, P.lejosL); pset(x, y - 1, P.lejosS); }
  rect(0, 108, 150, 110, P.lejosS);
  // EL PEÑÓN, con la cresta por debajo de y 50 desde x 270
  const pts = [[148, 111], [151, 100], [156, 80], [160, 62], [165, 46], [171, 35], [179, 29], [187, 26], [194, 25], [202, 28], [210, 31], [219, 29], [229, 32], [241, 36], [253, 41], [265, 46], [276, 51], [290, 56], [305, 60], [319, 63], [319, 111]];
  const top = d_penon(R, pts, 1, 172, 34);
  // las galerías del asedio en la cara norte y el camino en zigzag
  for (const [gx, gy] of [[161, 64], [164, 57], [167, 50], [160, 72], [166, 66]]) { rect(gx, gy, gx + 1, gy + 1, P.grieta); pset(gx, gy - 1, P.calizaD); }
  for (let i = 0; i < 4; i++) R.linea(200 + (i % 2 ? 22 : 0), 50 + i * 8, 200 + (i % 2 ? 0 : 22), 54 + i * 8, P.calizaL);
  // la torre del castillo moro y su muralla que baja
  rect(166, 76, 176, 92, P.ocreCS); rect(167, 77, 175, 92, P.ocreC); rect(174, 77, 175, 92, P.ocreCS);
  for (let x = 166; x <= 176; x += 3) rect(x, 74, x + 1, 75, P.ocreC); rect(169, 80, 169, 82, P.ventana); rect(172, 84, 172, 86, P.ventana);
  R.linea(176, 90, 200, 102, P.muroS); R.linea(176, 89, 200, 101, P.muroL);
  // la ciudad escalonada al pie (de atrás a delante) y la catedral
  d_ciudad(R, 172, 319, 70, 106, 1, 470, top);
  rect(204, 84, 210, 100, P.casa); rect(209, 84, 210, 100, P.casaS); rect(205, 80, 209, 84, P.ocreC); pset(207, 78, P.ocreCS); pset(207, 79, P.ocreC); rect(206, 82, 207, 83, P.ventana);
  // los jardines de la Alameda al sur
  for (let k = 0; k < 14; k++) { const x = 282 + Math.round(h(k, 1, 462) * 34), y = 97 + Math.round(h(k, 2, 462) * 6); R.disco(x, y, 2, P.ciprésS); pset(x - 1, y - 1, P.ciprés); }
  // la muralla del puerto con los cañones y el baluarte con su asta
  d_muralla(R, 146, 319, 104, 112, 1, 20);
  R.poligono([[232, 103], [262, 103], [266, 112], [228, 112]], (x, y) => (y === 103 ? P.muroL : y > 110 ? P.muroD : h(x, y, 433) > 0.9 ? P.muroS : P.muro));
  for (const cx of [238, 248, 258]) { rect(cx, 104, cx + 2, 105, P.muroD); rect(cx + 1, 104, cx + 4, 104, P.canon); }
  rect(246, 88, 246, 103, P.hierro); pset(246, 87, P.laton);
  // el velero lejano fondeado a la izquierda
  { const x = 26, y = 116; R.poligono([[x - 16, y - 3], [x + 14, y - 3], [x + 11, y], [x - 13, y]], P.lejosS); rect(x - 16, y - 3, x + 14, y - 3, P.lejosL);
    for (const [mx, mh] of [[x - 6, 22], [x + 5, 24]]) { rect(mx, y - 3 - mh, mx, y - 3, P.grisS); for (let k = 0; k < 3; k++) rect(mx - 5 + k, y - 3 - mh + 4 + k * 6, mx + 5 - k, y - 3 - mh + 4 + k * 6, P.grisS); }
    R.linea(x + 5, y - 27, x + 20, y - 4, P.grisS); }
  // EL BUQUE DE GUERRA de vapor y vela fondeado (casco negro, faja blanca con las portas, tres palos y la chimenea)
  { const x0 = 228, x1 = 304, yw = 125;
    R.poligono([[x0 + 4, yw - 8], [x1, yw - 9], [x1 - 3, yw], [x0 + 6, yw], [x0, yw - 4]], P.negro); rect(x0 + 5, yw - 6, x1 - 2, yw - 5, P.blancoS);
    for (let x = x0 + 8; x < x1 - 4; x += 5) pset(x, yw - 6, P.negro); rect(x0 + 4, yw - 9, x1, yw - 9, P.grisS); rect(x0 + 6, yw, x1 - 3, yw, P.rojoS);
    for (const [mx, mh] of [[x0 + 16, 34], [x0 + 38, 38], [x0 + 60, 30]]) { rect(mx, yw - 9 - mh, mx, yw - 9, P.maderaD); for (let k = 0; k < 3; k++) { const yy = yw - 9 - mh + 5 + k * 9, w = 9 - k * 2; rect(mx - w, yy, mx + w, yy, P.maderaD); rect(mx - w + 1, yy + 1, mx + w - 1, yy + 1, P.blancoS); } R.linea(mx, yw - 9 - mh, mx - 10, yw - 9, P.jarcia); R.linea(mx, yw - 9 - mh, mx + 9, yw - 9, P.jarcia); }
    rect(x0 + 26, yw - 21, x0 + 30, yw - 9, P.ocreCS); rect(x0 + 26, yw - 21, x0 + 30, yw - 19, P.negro); rect(x0 + 26, yw - 18, x0 + 26, yw - 10, P.ocreC);
    R.linea(x0 + 16, yw - 43, x0, yw - 5, P.jarcia); rect(x1 - 4, yw - 21, x1 - 4, yw - 9, P.maderaD); }
  // EL MUELLE: la arista de sillares y las losas en perspectiva, con juntas, desgaste, musgo y dos charcos
  rect(0, 147, 319, 150, P.losaL); rect(0, 150, 319, 150, P.losaS); for (let x = 3; x < 320; x += 13) rect(x, 147, x, 150, P.losaJ);
  let y = 151; for (const [alto, paso] of [[4, 16], [5, 20], [6, 25], [7, 30], [9, 38]]) {
    rect(0, y, 319, y + alto - 1, P.losa); rect(0, y, 319, y, P.losaJ);
    for (let x = Math.round(h(y, 1, 463) * paso); x < 320; x += paso) { rect(x, y, x, y + alto - 1, P.losaJ); rect(x + 1, y + 1, x + 1, y + alto - 1, P.losaL); }
    for (let yy = y + 1; yy < y + alto; yy++) for (let x = 0; x < 320; x++) { const n = h(x, yy, 464); if (n > 0.93) pset(x, yy, P.losaS); else if (n < 0.04) pset(x, yy, P.losaL); else if (n > 0.9 && h(x >> 3, yy >> 2, 465) > 0.7) pset(x, yy, P.losaD); }
    y += alto; }
  for (let x = 0; x < 320; x += 3) if (h(x, 1, 466) > 0.6) pset(x, 151 + Math.round(h(x, 2, 466) * 3), P.musgo);
  for (const [cx, cy, rx, ry] of [[96, 171, 14, 3], [178, 163, 10, 2]]) for (let yy = cy - ry; yy <= cy + ry; yy++) for (let xx = cx - rx; xx <= cx + rx; xx++) { const q = ((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2; if (q > 1) continue; pset(xx, yy, q > 0.7 ? P.losaD : yy < cy ? d_CIELO[4] : d_CIELO[2]); if (q < 0.5 && (xx + yy) % 7 === 0) pset(xx, yy, P.nubeL); }
  // los bolardos de la arista, dos toneles, una adujada y el farol de gas
  d_bolardo(R, 34, 148); d_bolardo(R, 204, 148);
  for (const [bx, by] of [[244, 160], [254, 158]]) { rect(bx - 4, by - 10, bx + 4, by, P.madera); rect(bx - 4, by - 10, bx - 3, by, P.maderaL); rect(bx + 3, by - 10, bx + 4, by, P.maderaS); for (const yy of [by - 9, by - 5, by - 1]) rect(bx - 4, yy, bx + 4, yy, P.hierro); rect(bx - 3, by - 11, bx + 3, by - 11, P.maderaL); }
  for (let a = 0; a < 3; a++) for (let i = 0; i < 24; i++) { const an = i / 24 * 6.283; pset(Math.round(226 + Math.cos(an) * (5 - a * 1.5)), Math.round(163 + Math.sin(an) * (2 - a * 0.5)), i % 3 ? P.cuerda : P.cuerdaS); }
  rect(232, 120, 233, 158, P.hierro); rect(231, 157, 234, 158, P.hierro); rect(229, 113, 236, 120, P.hierro); rect(230, 114, 235, 119, P.gas); rect(232, 111, 233, 112, P.hierro); pset(230, 114, P.blanco);
}

// lo de delante en la bahía: las cajas apiladas de la derecha (tablas, flejes y marcas sin letras) y la adujada con su
// bolardo abajo a la izquierda
function d_bahiaDelante(R, t) {
  const P = d_P, { rect, pset } = R;
  for (const [x0, y0, w, hh] of [[268, 150, 24, 30], [292, 146, 27, 34], [276, 124, 22, 26], [298, 122, 21, 24]]) {
    rect(x0, y0, x0 + w, y0 + hh, P.maderaD); rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, P.madera);
    for (let yy = y0 + 4; yy < y0 + hh; yy += 5) rect(x0 + 1, yy, x0 + w - 1, yy, P.maderaS);
    rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 1, P.maderaL); rect(x0 + 1, y0 + 1, x0 + 1, y0 + hh - 1, P.maderaL);
    R.linea(x0 + 2, y0 + 2, x0 + w - 2, y0 + hh - 2, P.maderaS); rect(x0 + 3, y0 + 1, x0 + 3, y0 + hh - 1, P.hierro); rect(x0 + w - 3, y0 + 1, x0 + w - 3, y0 + hh - 1, P.hierro);
    rect(x0 + 6, y0 + 8, x0 + 9, y0 + 11, P.maderaD); rect(x0 + 11, y0 + 9, x0 + 15, y0 + 9, P.maderaD); }
  d_bolardo(R, 10, 179, 1);
  for (let a = 0; a < 4; a++) for (let i = 0; i < 30; i++) { const an = i / 30 * 6.283; pset(Math.round(10 + Math.cos(an) * (9 - a * 2)), Math.round(176 + Math.sin(an) * (3 - a * 0.6)), i % 3 ? P.cuerda : P.cuerdaS); }
  return {};
}

function d_barcoCam(R, t, o) {
  const P = d_P, L = 210, cx = 191, yw = 146;
  R.copiar(d_buf(R, 'barco.cielo', () => d_cielo(R, 100, null)));
  d_nubes(R, t, 24, 60, 5, [2, 2, 1]);
  const capa = d_buf(R, 'barco.capa', () => d_barcoFija(R));
  d_agua(R, t, 132, 152, null, 0, -99);
  d_volcar(R, capa);
  for (const [hx, hy, k] of [[60, 96, 0], [128, 90, 1]]) d_humo(R, t, hx, hy, 16, -6, k, [P.humoS, P.humo, P.nubeL]);
  // el centinela que hace la ronda en el muelle del fondo (va, se para, da la vuelta)
  const ciclo = t % 14, ida = ciclo < 7, u = d_suave(((ida ? ciclo : ciclo - 7) - 1) / 5), sx = Math.round(ida ? lerp(26, 72, u) : lerp(72, 26, u)), parado = (ciclo % 7) < 1 || (ciclo % 7) > 6;
  d_figura(R, sx, 134, t, 'casaca', { dir: ida ? 1 : -1, anda: !parado });
  d_barcoVida(R, t);
  // EL MARY CELESTE amarrado, con su reflejo en la franja de agua
  const B = d_bergantin(R, cx, yw + Math.round(Math.sin(t * 1.1) * 0.5), L, t, { flota: 2, velas: 0, bote: false, rot: Math.sin(t * 0.6) * 0.003, altoM: 0.5 });
  for (let y = yw + 3; y < 152; y++) for (let x = 84; x < 300; x++) if ((x + y + Math.floor(t * 3)) % 3 && h(x >> 2, y, Math.floor(t * 2)) > 0.35) R.pset(x + Math.round(Math.sin(y + t * 2)), y, d_mezcla(C.casco, P.aguaH, 0.4));
  // las defensas de cabo colgadas del costado
  for (const u of [-0.3, -0.05, 0.2]) { const [fx, fy] = B.P(u * L, B.vd(u * L)); R.linea(fx, fy, fx, fy + 6, P.cuerdaS); d_rect3(R, fx - 2, fy + 7, fx + 2, fy + 12, P.cuerda, P.cuerdaS); }
  // LOS CORTES DE LA PROA: dos muescas largas que dejan ver la madera clara
  const corte = (u0, v0, u1, v1) => { const [ax, ay] = B.P(u0 * L, v0), [bx, by] = B.P(u1 * L, v1); R.linea(ax, ay - 1, bx, by - 1, P.negro); R.linea(ax, ay, bx, by, P.maderaL); R.linea(ax + 1, ay + 1, bx - 1, by + 1, P.madera); R.pset(ax - 1, ay, P.maderaS); R.pset(bx + 1, by - 1, P.cuerdaL); };
  corte(0.37, 15, 0.45, 13); corte(0.385, 10, 0.465, 9); corte(0.40, 6, 0.44, 5.5);
  const [px, py] = B.P(0.415 * L, 10);
  // o.cortes: el círculo de tiza que se dibuja a su alrededor
  const c = d_lim(o.cortes ?? 0); if (c > 0) for (let a = 0; a < c * 6.6; a += 0.06) { const r = 15 + Math.sin(a * 3) * 0.8, x = Math.round(px + Math.cos(a - 2) * r * 1.25), y = Math.round(py + Math.sin(a - 2) * r * 0.7); R.pset(x, y, P.blanco); if (h(x, y, 471) > 0.4) R.pset(x, y + 1, P.blancoS); }
  // las amarras a los bolardos
  { const [ax, ay] = B.P(0.48 * L, B.vd(0.48 * L)), [bx, by] = B.P(-0.48 * L, B.vd(-0.48 * L)); d_cuerda(R, ax, ay, 306, 150, 3); d_cuerda(R, bx, by, 92, 150, 4); }
  // EL CORDÓN DE PRECINTO: los postes con remate de latón y la cuerda con trapos rojos que se mece
  const postes = [24, 72, 120, 168, 216, 264, 312];
  for (let i = 0; i + 1 < postes.length; i++) { const a = postes[i], b = postes[i + 1], m = Math.round(Math.sin(t * 1.4 + i) * 1.2); d_cuerda(R, a, 141, b, 141, 4 + m, P.cuerdaL, P.cuerda);
    const tx = (a + b) >> 1, ty = 145 + m, fl = Math.round(Math.sin(t * 6 + i * 2)); R.rect(tx - 1, ty, tx + 1, ty + 2, P.rojo); R.pset(tx + fl, ty + 3, P.rojoS); }
  for (const x of postes) { R.rect(x - 1, 140, x + 1, 155, P.maderaD); R.rect(x - 1, 140, x - 1, 155, P.madera); R.rect(x - 2, 138, x + 2, 139, P.latonS); R.rect(x - 1, 137, x + 1, 137, P.laton); R.pset(x - 1, 137, P.latonL); R.rect(x - 2, 156, x + 2, 156, P.losaJ); }
  d_gaviotaPosada(R, 264, 136, t, 2);
  for (let k = 0; k < 4; k++) { const span = 380, x = ((h(k, 4, 472) * span + t * (9 + k * 3) * (k % 2 ? -1 : 1)) % span + span) % span - 30, y = 48 + h(k, 5, 472) * 34 + Math.sin(t * 1.1 + k * 2) * 5; d_gaviota(R, x, y, t, k + 1); }
  return { proa: [px, py], centinela: [sx, 134] };
}
// un rectángulo con su sombra a la derecha y abajo
function d_rect3(R, x0, y0, x1, y1, c, cS) { R.rect(x0, y0, x1, y1, c); R.rect(x1, y0, x1, y1, cS); R.rect(x0, y1, x1, y1, cS); }

// lo fijo de la cámara 'barco': el Peñón enorme detrás, la ciudad y la muralla, el muelle del fondo con la garita, y el
// muelle de delante con sus losas
function d_barcoFija(R) {
  const P = d_P, { rect, pset } = R;
  const pts = [[0, 62], [30, 56], [62, 50], [100, 42], [136, 34], [166, 27], [184, 18], [196, 8], [204, -1], [252, -1], [258, 10], [265, 24], [271, 38], [277, 52], [290, 59], [305, 64], [319, 67], [319, 133], [0, 133]];
  const top = d_penon(R, pts, 2, 0, 70);
  d_penonCerca(R, top);
  // una batería con sus troneras en la ladera y el camino
  for (const [gx, gy] of [[214, 30], [226, 34], [238, 40]]) { rect(gx, gy, gx + 4, gy + 3, P.grieta); rect(gx, gy - 1, gx + 4, gy - 1, P.calizaL); }
  R.linea(120, 60, 180, 48, P.calizaL); R.linea(180, 49, 130, 70, P.calizaL);
  d_ciudad(R, 0, 319, 84, 120, 2, 480, top);
  d_muralla(R, 0, 319, 116, 133, 2, 30);
  // el muelle del fondo con un almacén y la garita del centinela (rayas)
  rect(0, 126, 82, 135, P.losa); rect(0, 126, 82, 126, P.losaL); rect(0, 135, 82, 135, P.losaJ); for (let x = 6; x < 82; x += 11) rect(x, 127, x, 134, P.losaJ);
  rect(4, 113, 18, 134, P.negro); rect(5, 114, 17, 134, P.casa); for (let x = 6; x < 17; x += 4) rect(x, 115, x + 1, 133, P.casaS); R.poligono([[3, 114], [11, 108], [19, 114]], P.tejaS); rect(8, 118, 14, 131, P.interior);
  // el muelle de delante: la arista y las losas
  rect(0, 151, 319, 154, P.losaL); rect(0, 154, 319, 154, P.losaS); for (let x = 5; x < 320; x += 15) rect(x, 151, x, 154, P.losaJ);
  let y = 155; for (const [alto, paso] of [[5, 22], [7, 28], [8, 34], [9, 42]]) {
    rect(0, y, 319, y + alto - 1, P.losa); rect(0, y, 319, y, P.losaJ);
    for (let x = Math.round(h(y, 1, 473) * paso); x < 320; x += paso) { rect(x, y, x, y + alto - 1, P.losaJ); rect(x + 1, y + 1, x + 1, y + alto - 1, P.losaL); }
    for (let yy = y + 1; yy < y + alto; yy++) for (let x = 0; x < 320; x++) { const n = h(x, yy, 474); if (n > 0.93) pset(x, yy, P.losaS); else if (n < 0.04) pset(x, yy, P.losaL); else if (n > 0.9 && h(x >> 3, yy >> 2, 475) > 0.7) pset(x, yy, P.losaD); }
    y += alto; }
  for (let x = 0; x < 320; x += 3) if (h(x, 1, 476) > 0.6) pset(x, 155 + Math.round(h(x, 2, 476) * 3), P.musgo);
  d_bolardo(R, 92, 153); d_bolardo(R, 306, 153);
}
// lo de delante en la cámara 'barco': un bolardo grande con su amarra y una adujada, abajo a la derecha
function d_barcoDelante(R, t) {
  const P = d_P;
  d_bolardo(R, 306, 179, 2);
  for (let a = 0; a < 4; a++) for (let i = 0; i < 34; i++) { const an = i / 34 * 6.283; R.pset(Math.round(304 + Math.cos(an) * (11 - a * 2.5)), Math.round(177 + Math.sin(an) * (3 - a * 0.6)), i % 3 ? P.cuerda : P.cuerdaS); }
  return {};
}

const d_VENT = [[12, 34, 46, 96], [58, 34, 92, 96]];

// la vista por los ventanales (cielo, el Peñón con su matorral, tejados y nubes que pasan), recortada a cada hueco
function d_vistaVentanas(R, t) {
  const P = d_P;
  for (const [x0, y0, x1, y1] of d_VENT) { R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = (y - y0) / (y1 - y0); R.pset(x, y, d_umbral(x, y) < f * 3 % 1 ? d_CIELO[Math.min(5, Math.floor(f * 3) + 3)] : d_CIELO[Math.min(5, Math.floor(f * 3) + 2)]); }
    for (let k = 0; k < 3; k++) { const span = 130, x = ((h(k, 1, 481) * span - t * (2 + k * 1.5)) % span + span) % span - 20, y = 40 + k * 7; d_nube(R, x, y, 16 + k * 4, k + 30, [d_P.nubeS, d_P.nube, d_P.nubeL]); }
    R.poligono([[0, 74], [30, 60], [60, 52], [92, 46], [100, 47], [100, 100], [0, 100]], (x, y) => { const n = h(x, y, 482), m = Math.sin(x * 0.5 + Math.sin(y * 0.7) * 2) + Math.sin(y * 0.6 + x * 0.2); if (m > 0.9) return n < 0.3 ? P.matS : m > 1.5 ? P.matL : P.mat; if (m < -1.4) return P.calizaS; return n > 0.85 ? P.calizaL : n < 0.3 ? P.calizaS : P.caliza; });
    for (let x = x0; x <= x1; x++) for (let y = 86; y <= y1; y++) { const fila = (y - 86) % 5, cas = Math.floor((x + (Math.floor((y - 86) / 5) * 4)) / 9); R.pset(x, y, fila === 0 ? P.tejaS : fila < 2 ? P.teja : h(cas, y, 483) > 0.5 ? P.casa : P.casaS); }
    for (let k = 0; k < 2; k++) d_gaviota(R, ((t * 9 + k * 50) % 120) - 10, 52 + k * 9 + Math.sin(t + k) * 3, t, k);
    R.recorte(null); }
}

// lo fijo de la sala (búfer con los huecos de los ventanales a 0)
function d_salaFija(R) {
  const P = d_P, { rect, pset, disco } = R;
  // el techo de yeso (dos tonos casi iguales, tranquilo bajo la barra del año) y la cornisa con dentículos
  rect(0, 0, 319, 20, P.techo); for (let x = 28; x < 320; x += 56) rect(x, 0, x + 3, 20, P.techoS);
  rect(0, 21, 319, 21, P.yesoL); rect(0, 22, 319, 23, P.yeso); rect(0, 24, 319, 24, P.yesoS); rect(0, 25, 319, 27, P.yeso);
  for (let x = 0; x < 320; x += 4) if (x < 268) rect(x, 25, x + 1, 26, P.yesoS);
  rect(0, 28, 319, 28, P.yesoS);
  // la pared, con su textura de estuco y la cenefa
  rect(0, 29, 319, 96, P.pared);
  for (let y = 29; y < 96; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 491); if (n > 0.9) pset(x, y, x > 268 && y < 50 ? P.pared : P.paredL); else if (n < 0.07) pset(x, y, P.paredS); }
  for (let x = 0; x < 268; x++) { pset(x, 31, P.cenefa); if (x % 6 < 3) pset(x, 32, P.cenefa); pset(x, 33, (x % 6 === 4) ? P.cenefa : P.pared); }
  // pilastras de yeso entre los ventanales
  for (const px of [0, 48, 94, 236]) { rect(px, 29, px + 9, 96, P.yeso); rect(px, 29, px, 96, P.yesoL); rect(px + 9, 29, px + 9, 96, P.yesoS); for (let i = 0; i < 3; i++) rect(px + 2 + i * 3, 36, px + 2 + i * 3, 92, P.yesoS); rect(px - 1, 34, px + 10, 35, P.yesoL); }
  // LOS VENTANALES de medio punto: el hueco (a 0), el derrame en sombra, el marco blanco con los junquillos y el alféizar
  for (const [x0, y0, x1, y1] of d_VENT) { const cx = (x0 + x1) / 2, r = (x1 - x0) / 2, ya = y0 + r;
    for (let y = y0 - 3; y <= y1 + 2; y++) for (let x = x0 - 3; x <= x1 + 3; x++) { const dent = y >= ya ? x >= x0 && x <= x1 && y <= y1 : Math.hypot(x + 0.5 - cx, y + 0.5 - ya) <= r + 0.5;
      const marco = y >= ya ? x >= x0 - 3 && x <= x1 + 3 : Math.hypot(x + 0.5 - cx, y + 0.5 - ya) <= r + 3.5;
      if (dent) R.buf[y * 320 + x] = 0; else if (marco) pset(x, y, x < cx ? P.yesoL : P.yesoS); }
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const dent = y >= ya || Math.hypot(x + 0.5 - cx, y + 0.5 - ya) <= r + 0.5; if (!dent) continue;
      const borde = x <= x0 + 1 || x >= x1 - 1 || y >= y1 - 1 || (y < ya && Math.hypot(x + 0.5 - cx, y + 0.5 - ya) > r - 1.5);
      if (borde) pset(x, y, P.blancoS); else if (x === Math.round(cx) || (y > ya && (y - ya) % 15 === 0) || y === ya) pset(x, y, P.blanco); else if (y < ya && Math.abs(x - cx) === Math.round(Math.abs(y - ya) * 0.0) ) pset(x, y, P.blanco); }
    for (let a = 0; a < 3.14; a += 0.05) pset(Math.round(cx + Math.cos(a) * r * 0.5), Math.round(ya - Math.sin(a) * r * 0.5), P.blanco);
    rect(x0 - 4, y1 + 1, x1 + 4, y1 + 3, P.yesoL); rect(x0 - 4, y1 + 3, x1 + 4, y1 + 3, P.yesoS); }
  // los haces de luz de invierno que bajan de los ventanales hacia la derecha y caen en el suelo
  for (const [x0, , x1, y1] of d_VENT) for (let y = 60; y < 176; y++) { const d = (y - 60) * 0.75, a = x0 + 3 + d, b = x1 - 3 + d;
    for (let x = Math.round(a); x <= b; x++) { if (x > 319 || R.buf[y * 320 + x] === 0) continue; if ((x + y) % 3 === 0 || (y > 136 && (x + y) % 2 === 0)) pset(x, y, d_mezcla(R.pget(x, y), P.gas, y > 136 ? 0.2 : 0.1)); } }
  // las cortinas de terciopelo recogidas a los lados de cada ventanal, con sus pliegues y la borla
  for (const [x0, , x1] of d_VENT) for (const [a, dir] of [[x0 - 8, 1], [x1 + 2, -1]]) {
    for (let y = 30; y < 114; y++) { const ancho = y < 70 ? 6 : y < 78 ? 3 : 6 + Math.round((y - 78) * 0.06), xa = dir > 0 ? a : a + 6 - ancho;
      for (let x = xa; x < xa + ancho; x++) { const p = (x - xa + Math.floor(y / 30)) % 3; pset(x, y, p === 0 ? P.tercS : p === 1 ? P.terc : P.tercL); } }
    rect(a + 1, 70, a + 5, 72, P.laton); pset(a + 3, 73, P.latonS); pset(a + 3, 74, P.laton); }
  rect(0, 28, 104, 29, P.latonS);
  // el zócalo de roble con cuarterones
  rect(0, 96, 319, 132, P.roble); rect(0, 96, 319, 97, P.robleL); rect(0, 98, 319, 98, P.robleD);
  for (let x = 2; x < 318; x += 20) { rect(x, 102, x + 16, 127, P.robleS); rect(x + 1, 103, x + 15, 126, P.roble); rect(x + 1, 103, x + 15, 103, P.robleL); rect(x + 1, 103, x + 1, 126, P.robleL); rect(x + 3, 105, x + 13, 124, P.roble); for (let k = 0; k < 3; k++) R.linea(x + 4 + k * 3, 106, x + 5 + k * 3, 123, P.robleS); }
  rect(0, 129, 319, 132, P.robleD);
  // EL DOSEL de caoba con el terciopelo y EL ESCUDO REAL insinuado; el sillón del juez
  rect(146, 30, 218, 96, P.caobaD); rect(148, 32, 216, 96, P.caoba);
  R.poligono([[142, 32], [182, 18], [222, 32]], P.caobaD); R.poligono([[146, 31], [182, 20], [218, 31]], P.caoba); R.linea(146, 31, 182, 20, P.caobaL);
  disco(182, 27, 2, P.laton); pset(181, 26, P.latonL);
  for (const px of [148, 210]) { rect(px, 32, px + 6, 96, P.caobaL); for (let i = 0; i < 3; i++) rect(px + 1 + i * 2, 36, px + 1 + i * 2, 92, P.caobaS); rect(px - 1, 32, px + 7, 34, P.caobaS); }
  for (let y = 36; y < 92; y++) for (let x = 156; x < 210; x++) { const p = (x + Math.floor(Math.sin(y * 0.2) * 1.5)) % 5; pset(x, y, p === 0 ? P.tercS : p < 3 ? P.terc : P.tercL); }
  { const sx = 182, sy = 52;
    // la corona
    rect(sx - 5, sy - 13, sx + 5, sy - 10, P.laton); for (const dx of [-5, -2, 1, 4]) rect(sx + dx, sy - 16, sx + dx + 1, sy - 14, P.laton); rect(sx - 4, sy - 12, sx + 4, sy - 12, P.rojo); pset(sx, sy - 17, P.latonL); rect(sx - 5, sy - 10, sx + 5, sy - 10, P.latonS);
    // el escudo cuartelado (formas, sin letras)
    rect(sx - 8, sy - 8, sx + 8, sy + 6, P.latonS); R.poligono([[sx - 8, sy + 6], [sx + 8, sy + 6], [sx, sy + 12]], P.latonS);
    rect(sx - 7, sy - 7, sx - 1, sy - 1, P.rojo); rect(sx + 1, sy - 7, sx + 7, sy - 1, P.laton); rect(sx - 7, sy + 1, sx - 1, sy + 6, P.azul); rect(sx + 1, sy + 1, sx + 7, sy + 6, P.rojo);
    R.poligono([[sx - 7, sy + 6], [sx + 7, sy + 6], [sx, sy + 11]], P.rojo); R.poligono([[sx - 7, sy + 6], [sx - 1, sy + 6], [sx - 1, sy + 9]], P.azul);
    for (let k = 0; k < 3; k++) rect(sx - 6, sy - 6 + k * 2, sx - 3, sy - 6 + k * 2, P.laton); rect(sx + 3, sy - 6, sx + 5, sy - 3, P.rojo); pset(sx + 4, sy - 2, P.rojo);
    rect(sx - 5, sy + 2, sx - 3, sy + 5, P.laton); pset(sx - 2, sy + 2, P.laton); for (let k = 0; k < 2; k++) rect(sx + 2, sy + 2 + k * 2, sx + 6, sy + 2 + k * 2, P.laton);
    rect(sx - 8, sy - 1, sx + 8, sy - 1, P.latonL); rect(sx - 1, sy - 8, sx - 1, sy + 9, P.latonL);
    // el león y el unicornio a los lados, como formas
    R.poligono([[sx - 20, sy + 8], [sx - 10, sy + 8], [sx - 10, sy - 6], [sx - 13, sy - 11], [sx - 17, sy - 9], [sx - 16, sy - 2], [sx - 20, sy + 2]], P.laton); disco(sx - 15, sy - 9, 3, P.latonL); pset(sx - 14, sy - 9, P.latonS);
    R.poligono([[sx + 20, sy + 8], [sx + 10, sy + 8], [sx + 10, sy - 6], [sx + 13, sy - 10], [sx + 17, sy - 8], [sx + 16, sy - 2], [sx + 20, sy + 2]], P.blanco); R.linea(sx + 15, sy - 11, sx + 18, sy - 16, P.latonL); pset(sx + 16, sy - 9, P.blancoS); R.linea(sx + 11, sy + 2, sx + 19, sy + 2, P.blancoS);
    // la cinta sin letras
    R.poligono([[sx - 22, sy + 13], [sx + 22, sy + 13], [sx + 19, sy + 17], [sx - 19, sy + 17]], P.papel); rect(sx - 19, sy + 17, sx + 19, sy + 17, P.papelS); pset(sx - 23, sy + 15, P.papelS); pset(sx + 23, sy + 15, P.papelS); }
  rect(170, 70, 194, 92, P.tercS); rect(171, 71, 193, 92, P.terc); rect(171, 71, 193, 71, P.tercL); for (let j = 0; j < 2; j++) for (let i = 0; i < 5; i++) pset(174 + i * 4 + j * 2, 75 + j * 5, P.tercS);
  rect(168, 68, 196, 69, P.caobaL);
  // EL ESTRADO: la tapa, el frente de cuarterones y la tarima con su escalón
  rect(128, 88, 236, 91, P.caobaD); rect(129, 89, 235, 89, P.caobaL); rect(129, 90, 235, 90, P.caoba);
  rect(132, 92, 232, 118, P.caoba); rect(132, 92, 232, 93, P.caobaS);
  for (let k = 0; k < 5; k++) { const x = 136 + k * 19; rect(x, 96, x + 15, 114, P.caobaS); rect(x + 1, 97, x + 14, 113, P.caoba); rect(x + 1, 97, x + 14, 97, P.caobaL); rect(x + 1, 97, x + 1, 113, P.caobaL); for (let q = 0; q < 4; q++) R.linea(x + 3 + q * 3, 99, x + 3 + q * 3, 112, h(q, k, 492) > 0.5 ? P.caobaS : P.caobaL); }
  disco(182, 105, 3, P.laton); pset(181, 104, P.latonL);
  rect(124, 118, 240, 124, P.caobaD); rect(124, 118, 240, 118, P.caobaL); rect(124, 119, 240, 121, P.caoba);
  // los papeles y el tintero en la tapa del estrado
  rect(136, 85, 148, 88, P.papel); rect(136, 86, 148, 86, P.papelS); rect(214, 84, 226, 88, P.cuero); rect(214, 84, 226, 84, P.cueroL); rect(220, 83, 222, 83, P.cinta);
  // LA MESA DEL ESCRIBANO, por debajo del estrado: papeles, el libro de actas y el tintero
  rect(146, 118, 218, 121, P.caobaD); rect(147, 119, 217, 119, P.caobaL); rect(150, 122, 214, 136, P.caoba); rect(150, 122, 214, 123, P.caobaS); for (let x = 154; x < 212; x += 15) { rect(x, 125, x + 11, 134, P.caobaS); rect(x + 1, 126, x + 10, 133, P.caoba); }
  rect(156, 115, 170, 118, P.papel); rect(156, 117, 170, 117, P.papelS); rect(190, 114, 204, 118, P.cuero); rect(191, 114, 203, 115, P.papelL); rect(197, 114, 197, 118, P.papelS); rect(208, 114, 211, 118, P.negro); pset(209, 114, P.vidrioL);
  // LA BARANDILLA DEL PÚBLICO a la izquierda (balaústres torneados), con los bancos y siete espectadores detrás
  for (let k = 0; k < 7; k++) { const x = 8 + k * 16, y = 106 + (k % 2); d_espectador(R, x, y, k); }
  rect(0, 118, 124, 120, P.robleD); rect(0, 118, 124, 118, P.robleL); for (let x = 2; x < 124; x += 5) { rect(x, 121, x + 1, 131, P.roble); pset(x, 121, P.robleL); pset(x, 126, P.robleL); pset(x + 1, 128, P.robleS); }
  rect(0, 131, 124, 133, P.robleD); rect(122, 116, 126, 133, P.robleD); rect(123, 116, 125, 133, P.robleL); disco(124, 115, 2, P.robleL);
  // A LA DERECHA: el reloj de pared (la caja; la esfera y el péndulo se animan) y el armario de casilleros con los legajos
  rect(238, 46, 254, 94, P.caobaD); rect(239, 47, 253, 93, P.caoba); rect(239, 47, 253, 47, P.caobaL); R.poligono([[236, 48], [246, 40], [256, 48]], P.caobaD); R.poligono([[238, 47], [246, 42], [254, 47]], P.caoba);
  rect(241, 68, 251, 90, P.caobaD); rect(242, 69, 250, 89, hex('#3a2a20')); pset(242, 69, P.vidrioL); pset(243, 70, P.vidrioL);
  rect(258, 64, 316, 132, P.caobaD); rect(259, 65, 315, 131, P.caoba); rect(256, 60, 318, 64, P.caobaD); rect(257, 61, 317, 62, P.caobaL);
  for (let j = 0; j < 5; j++) for (let i = 0; i < 4; i++) { const x = 261 + i * 14, y = 67 + j * 13; rect(x, y, x + 11, y + 10, P.caobaD);
    const tipo = h(i, j, 493); if (tipo < 0.55) { for (let q = 0; q < 3; q++) { const yy = y + 2 + q * 3; rect(x + 1, yy, x + 10, yy + 2, q % 2 ? P.papelS : P.papel); rect(x + 1, yy + 2, x + 10, yy + 2, P.papelS); } rect(x + 5, y + 1, x + 6, y + 10, P.cinta); pset(x + 5, y + 1, P.cintaS); }
    else if (tipo < 0.85) { for (let q = 0; q < 3; q++) { disco(x + 3 + q * 3, y + 7, 1.6, P.papel); pset(x + 3 + q * 3, y + 7, P.papelS); } rect(x + 2, y + 4, x + 10, y + 4, P.cinta); }
    else { rect(x + 2, y + 3, x + 4, y + 10, P.cuero); rect(x + 5, y + 2, x + 7, y + 10, P.cinta); rect(x + 8, y + 4, x + 10, y + 10, P.cueroL); } }
  // dos libros gordos y un busto de escayola encima del armario
  rect(262, 52, 278, 59, P.cuero); rect(262, 52, 278, 53, P.cueroL); rect(264, 55, 276, 55, P.laton);
  // el suelo de tablas con la alfombra del pasillo y los haces de luz que caen en él
  rect(0, 133, 319, 179, P.tabla);
  let y = 133; for (const alto of [3, 3, 4, 4, 5, 5, 6, 7, 8]) { rect(0, y, 319, y, P.tablaD); const paso = 22 + alto * 6;
    for (let x = Math.round(h(y, 1, 494) * paso); x < 320; x += paso) rect(x, y + 1, x, y + alto - 1, P.tablaD);
    for (let yy = y + 1; yy < y + alto; yy++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, yy, 495); if (n > 0.85) pset(x, yy, P.tablaL); else if (n < 0.12) pset(x, yy, P.tablaS); }
    y += alto; if (y > 179) break; }
  R.poligono([[150, 133], [214, 133], [250, 180], [114, 180]], (x, yy) => { const a = 150 - (yy - 133) * 0.766, b = 214 + (yy - 133) * 0.766; if (x - a < 3 || b - x < 3) return P.alfS; if (x - a < 6 || b - x < 6) return (x + yy) % 4 ? P.laton : P.alfS; return (Math.floor(x / 6) + Math.floor(yy / 4)) % 5 === 0 ? P.alfL : P.alf; });
  for (const [x0, , x1] of d_VENT) for (let yy = 136; yy < 178; yy++) { const d = (yy - 60) * 0.75; for (let x = Math.round(x0 + 3 + d); x <= x1 - 3 + d && x < 320; x++) if ((x + yy) % 2 === 0 && Math.abs(x - (x0 + x1) / 2 - d) > 1) pset(x, yy, d_mezcla(R.pget(x, yy), P.gas, 0.16)); }
  // la mesita de la derecha con la jarra y los vasos
  rect(262, 145, 312, 148, P.caobaD); rect(263, 146, 311, 146, P.caobaL); rect(265, 149, 267, 160, P.caobaS); rect(307, 149, 309, 160, P.caobaS); rect(265, 149, 309, 151, P.caoba);
  rect(274, 136, 280, 145, P.cristalS); rect(275, 137, 279, 144, P.cristal); rect(275, 141, 279, 144, P.aguaL); pset(275, 137, P.blanco); rect(281, 138, 282, 141, P.cristalS);
  for (const vx of [288, 296]) { rect(vx, 140, vx + 3, 145, P.cristalS); rect(vx + 1, 141, vx + 2, 144, P.cristal); pset(vx + 1, 141, P.blanco); }
  // LA MESA DE LAS PRUEBAS
  d_mesaPruebas(R);
  // las lámparas de gas de la pared (brazos de latón y globos; la llama se anima) y la araña colgada del techo
  for (const lx of [110, 228]) { R.linea(lx, 74, lx, 66, P.latonS); R.linea(lx - 4, 74, lx + 4, 74, P.latonS); rect(lx - 1, 74, lx + 1, 76, P.laton); }
  rect(196, 0, 196, 20, P.latonS); for (let y2 = 2; y2 < 20; y2 += 3) pset(196, y2, P.laton);
  rect(194, 21, 198, 24, P.laton); R.linea(184, 26, 208, 26, P.latonS); R.linea(186, 25, 206, 25, P.laton); for (const ax of [184, 196, 208]) rect(ax - 1, 22, ax + 1, 25, P.latonS);
}

// LA MESA DE LAS PRUEBAS (tablero con paño verde en y 141–146, patas hasta y 159) con la espada en su vaina, el diario
// abierto, una lupa pequeña, un legajo atado y el tintero
function d_mesaPruebas(R) {
  const P = d_P, { rect, pset } = R;
  rect(124, 140, 224, 146, P.caobaD); rect(126, 141, 222, 145, P.pano); for (let x = 127; x < 222; x += 2) if (h(x, 1, 496) > 0.6) pset(x, 142 + (x % 3), P.panoL); rect(126, 141, 222, 141, P.panoS);
  rect(124, 146, 224, 147, P.caobaL); rect(124, 148, 224, 151, P.caoba); rect(124, 151, 224, 151, P.caobaS);
  for (const lx of [127, 219]) { rect(lx, 152, lx + 3, 159, P.caobaS); rect(lx, 152, lx, 159, P.caobaL); rect(lx, 155, lx + 3, 155, P.caobaD); rect(lx - 1, 159, lx + 4, 159, P.caobaD); }
  for (const lx of [134, 212]) rect(lx, 152, lx + 2, 156, P.caobaD);
  // la espada en su vaina: la empuñadura de latón con el guardamano y la vaina de cuero negro con su contera
  rect(160, 141, 200, 143, P.negroT); rect(160, 141, 200, 141, P.aceroS); rect(197, 141, 202, 143, P.laton); pset(203, 142, P.latonS); rect(160, 140, 163, 144, P.laton); pset(160, 140, P.latonL);
  rect(150, 142, 159, 143, P.cuero); for (let x = 151; x < 159; x += 2) pset(x, 142, P.cueroL); R.linea(159, 138, 152, 139, P.laton); R.linea(152, 139, 150, 143, P.laton); R.linea(159, 139, 153, 140, P.latonL); pset(148, 142, P.laton); pset(149, 142, P.latonS);
  // el diario de a bordo abierto, con renglones
  rect(203, 138, 219, 144, P.cueroS); rect(204, 138, 210, 143, P.papel); rect(212, 138, 218, 143, P.papelL); rect(211, 138, 211, 143, P.papelS); for (let yy = 139; yy < 143; yy++) { rect(205, yy, 209, yy, yy % 2 ? P.papelS : P.papel); rect(213, yy, 217 - (yy === 142 ? 2 : 0), yy, yy % 2 ? P.papelS : P.papelL); }
  // la lupa pequeña, el legajo con la cinta y el tintero con la pluma
  R.disco(138, 142, 2.5, P.latonS); R.disco(138, 142, 1.6, P.cristal); pset(137, 141, P.blanco); R.linea(140, 144, 143, 146, P.maderaD);
  rect(128, 137, 136, 141, P.papelS); rect(128, 137, 136, 137, P.papel); rect(128, 139, 136, 139, P.papel); rect(131, 137, 132, 141, P.cinta);
  rect(146, 139, 148, 142, P.negro); pset(147, 139, P.vidrioL); R.linea(148, 138, 151, 134, P.papelL); pset(151, 134, P.blancoS);
}

// un espectador pequeño de la tribuna (x: izquierda, y: arriba de la cabeza), de unos 12 px de alto, en su banco:
// chistera, sombrero de dama o pelo; levita, chal o chaqueta de marinero
const d_PUBLICO = [['chistera', 'negroT'], ['dama', 'terc'], ['gorra', 'chaqueta'], ['pelo', 'roble'], ['dama', 'pano'], ['chistera', 'cuero'], ['gorra', 'chaqueta']];

function d_espectador(R, x, y, k) {
  const P = d_P, [cab, ropa] = d_PUBLICO[k % d_PUBLICO.length], c = P[ropa];
  R.rect(x - 1, y + 11, x + 8, y + 12, P.robleS); R.rect(x - 1, y + 10, x + 8, y + 10, P.robleL);
  R.rect(x, y + 6, x + 7, y + 11, c); R.rect(x, y + 6, x, y + 11, d_mezcla(c, P.negro, 0.3)); R.rect(x + 3, y + 6, x + 4, y + 7, cab === 'dama' ? P.blancoS : P.blanco);
  R.rect(x + 2, y + 2, x + 5, y + 5, P.piel); R.pset(x + 5, y + 4, P.pielS); R.pset(x + 3, y + 3, P.negro); R.pset(x + 5, y + 3, P.negro);
  if (cab === 'chistera') { R.rect(x + 2, y - 3, x + 5, y + 1, P.negro); R.rect(x + 1, y + 1, x + 6, y + 1, P.negro); R.pset(x + 2, y - 2, P.negroTL); }
  else if (cab === 'dama') { R.rect(x + 1, y + 1, x + 6, y + 2, c); R.rect(x + 1, y + 1, x + 1, y + 5, c); R.rect(x + 6, y + 1, x + 6, y + 5, c); R.pset(x + 6, y + 6, P.cinta); }
  else if (cab === 'gorra') { R.rect(x + 2, y + 1, x + 6, y + 2, P.chaquetaS); R.pset(x + 1, y + 2, P.chaquetaS); }
  else { R.rect(x + 2, y + 1, x + 5, y + 2, P.maderaD); R.pset(x + 1, y + 3, P.maderaD); }
}

// la sala: la vista de los ventanales, lo fijo y la vida (llamas de gas, reloj, juez, escribano, público, polvo, pago)
function d_tribunal(R, t, o) {
  const P = d_P, { rect, pset } = R;
  d_vistaVentanas(R, t);
  d_volcar(R, d_buf(R, 'sala', () => d_salaFija(R)));
  // las llamas de gas, que tiemblan, con su halo tramado
  const llama = (x, y, k) => { const f = Math.sin(t * 9 + k * 2) + Math.sin(t * 13.7 + k) * 0.5; for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, j * 1.2); if (d < 5 && d > 1.5 && d_umbral(x + i, y + j) < (1 - d / 5) * 0.5) pset(x + i, y + j, d_mezcla(R.pget(x + i, y + j), P.gas, 0.35)); }
    R.disco(x, y, 2, P.cristal); pset(x, y + (f > 0.4 ? -1 : 0), P.gasS); pset(x, y + 1, P.gas); if (f > -0.6) pset(x, y - 1 - (f > 0.8 ? 1 : 0), P.gasD); pset(x - 1, y - 1, P.blanco); };
  llama(110, 64, 0); llama(228, 64, 1); llama(184, 30, 2); llama(196, 30, 3); llama(208, 30, 4);
  // el reloj: la esfera, las agujas y el péndulo que va y viene
  { const cx = 246, cy = 57; R.disco(cx, cy, 7, P.latonS); R.disco(cx, cy, 6, P.papelL); for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; pset(Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), k % 3 ? P.papelS : P.negro); }
    R.linea(cx, cy, cx + 2, cy - 3, P.negro); const s = (t / 60) * 6.283 - 1.57; R.linea(cx, cy, Math.round(cx + Math.cos(s) * 5), Math.round(cy + Math.sin(s) * 5), P.negro); pset(cx, cy, P.laton);
    const a = Math.sin(t * 3.14) * 0.3, px = Math.round(cx + Math.sin(a) * 16), py = Math.round(70 + Math.cos(a) * 16); R.linea(cx, 70, px, py, P.latonS); R.disco(px, py, 2, P.laton); pset(px - 1, py - 1, P.latonL); }
  // EL JUEZ, pequeño, con peluca blanca y toga roja: mira a un lado y a otro y escribe
  let juez = null;
  if (o.juez !== false) { const jx = 182, jy = 76, mira = Math.sin(t * 0.7) > 0.3 ? 1 : Math.sin(t * 0.7) < -0.5 ? -1 : 0, escribe = (t % 6) > 3.5;
    rect(jx - 7, jy + 7, jx + 7, jy + 12, P.toga); rect(jx - 7, jy + 7, jx - 6, jy + 12, P.togaS); rect(jx - 2, jy + 7, jx + 2, jy + 9, P.blanco); rect(jx - 1, jy + 10, jx + 1, jy + 12, P.togaS);
    rect(jx - 5, jy - 2, jx + 5, jy + 8, P.peluca); for (let j = 0; j < 4; j++) { pset(jx - 5, jy + 1 + j * 2, P.pelucaS); pset(jx + 5, jy + 2 + j * 2, P.pelucaS); } rect(jx - 4, jy - 3, jx + 4, jy - 2, P.peluca); pset(jx - 3, jy - 3, P.pelucaS); pset(jx + 2, jy - 3, P.pelucaS);
    rect(jx - 3 + mira, jy, jx + 3 + mira, jy + 5, P.piel); rect(jx + 3 + mira, jy + 1, jx + 3 + mira, jy + 5, P.pielS); if (!escribe) { pset(jx - 1 + mira, jy + 2, P.negro); pset(jx + 1 + mira, jy + 2, P.negro); } else rect(jx - 1 + mira, jy + 3, jx + 1 + mira, jy + 3, P.pielS); rect(jx - 4, jy - 1, jx + 4, jy - 1, P.peluca);
    if (escribe) { const qx = jx + 6 + Math.round(Math.sin(t * 14) * 1.5); rect(jx + 4, jy + 11, qx, jy + 12, P.toga); pset(qx + 1, jy + 11, P.piel); R.linea(qx + 2, jy + 11, qx + 4, jy + 6, P.papelL); }
    juez = [jx, jy + 12]; }
  // EL ESCRIBANO detrás de su mesa: escribe y moja la pluma en el tintero
  { const ex = 180, ey = 106, moja = (t % 4.4) > 3.6; rect(ex - 4, ey + 6, ex + 4, ey + 9, P.negroT); rect(ex - 1, ey + 6, ex + 1, ey + 7, P.blanco);
    rect(ex - 2, ey, ex + 2, ey + 4, P.piel); rect(ex - 2, ey - 1, ex + 2, ey - 1, P.maderaD); pset(ex - 3, ey, P.maderaD); pset(ex - 1, ey + 2, P.negro); pset(ex + 1, ey + 2, P.negro);
    const hx = moja ? 207 : 172 + Math.round(Math.sin(t * 9) * 3); R.linea(ex + 3, ey + 8, hx, 114, P.negroT); pset(hx, 113, P.piel); R.linea(hx + 1, 113, hx + 3, 109, P.papelL); }
  // el público: parpadeos, una dama que se abanica, uno que dormita y el dibujante del periódico que dibuja
  for (let k = 0; k < 7; k++) { const x = 8 + k * 16, y = 106 + (k % 2); if ((t * 0.9 + k * 0.37) % 3.1 < 0.12) rect(x + 3, y + 3, x + 5, y + 3, P.piel); }
  { const x = 24, y = 107, ab = Math.round(Math.sin(t * 10) * 1.5); rect(x + 7, y + 4 + ab, x + 10, y + 7 + ab, P.papelL); pset(x + 7, y + 8, P.piel); R.linea(x + 7, y + 4 + ab, x + 10, y + 7 + ab, P.papelS); }
  { const x = 88, y = 106, cab = (t % 9) > 6 && (t % 9) < 8.4; if (cab) { rect(x + 2, y + 2, x + 5, y + 5, P.piel); rect(x + 2, y + 1, x + 5, y + 1, P.maderaD); rect(x + 3, y + 4, x + 5, y + 4, P.pielS); } }
  { const x = 56, y = 106, px = x + 9 + Math.round(Math.sin(t * 7) * 1.5), py = y + 9 + Math.round(Math.cos(t * 5) * 1); rect(x + 6, y + 7, x + 12, y + 11, P.papelL); rect(x + 7, y + 8, x + 10, y + 8, P.tinta); pset(x + 8, y + 10, P.tinta); pset(px, py, P.tinta); pset(px + 1, py - 1, P.maderaD); }
  // las motas de polvo que flotan en los haces de luz
  for (let k = 0; k < 16; k++) { const fy = (h(k, 3, 497) * 80 + t * (2 + h(k, 4, 497) * 3)) % 80, x = Math.round(20 + fy * 0.75 + h(k, 5, 497) * 70 + Math.sin(t * 0.6 + k) * 2), y = Math.round(64 + fy); if (Math.sin(t * 1.4 + k * 2) > -0.2 && x < 320) pset(x, y, P.papelL); }
  // o.pago: el saquito de monedas que se desliza por la mesa, con su destello
  let bolsa = null; const pg = d_lim(o.pago ?? 0);
  if (pg > 0) { const u = d_suave(pg / 0.85), bx = Math.round(lerp(226, 146, u)), by = 144;
    if (bx < 224) { rect(bx - 2, by - 3, bx + 2, by, P.cueroL); rect(bx - 1, by - 4, bx + 1, by - 4, P.cuero); rect(bx - 2, by - 3, bx - 2, by, P.cuero); pset(bx, by - 5, P.cinta); pset(bx + 1, by - 2, P.laton); pset(bx + 2, by, P.cueroS);
      if (u < 1) for (let i = 1; i < 4; i++) pset(bx + 3 + i * 2, by, P.panoL); if (pg > 0.85 && (t * 4) % 2 < 1) { pset(bx + 2, by - 6, P.latonL); pset(bx + 3, by - 7, P.blanco); pset(bx + 1, by - 7, P.latonL); } }
    bolsa = [bx, by]; }
  return { juez, bolsa };
}

// lo de delante en la sala: el banco del público de delante (de espaldas: respaldo con su remate y la voluta del
// extremo); con o.mesaDelante, la mesa de las pruebas otra vez, por delante
function d_tribunalDelante(R, t, o) {
  const P = d_P, { rect, pset } = R;
  if (o.mesaDelante) d_mesaPruebas(R);
  rect(20, 151, 106, 172, P.robleD); rect(22, 153, 104, 170, P.roble); rect(22, 153, 104, 154, P.robleL);
  for (let x = 26; x < 102; x += 19) { rect(x, 157, x + 15, 167, P.robleS); rect(x + 1, 158, x + 14, 166, P.roble); rect(x + 1, 158, x + 14, 158, P.robleL); for (let q = 0; q < 3; q++) R.linea(x + 3 + q * 4, 160, x + 4 + q * 4, 165, P.robleS); }
  rect(16, 147, 24, 174, P.robleD); rect(17, 148, 23, 174, P.robleL); rect(19, 150, 23, 172, P.roble); R.disco(20, 147, 3, P.robleL); pset(20, 146, P.blancoS);
  rect(16, 175, 110, 177, P.tablaD);
  return { banco: [30, 96] };
}

function d_espadaFija(R) {
  const P = d_P, { rect, pset, disco } = R;
  // la sala desenfocada: paneles de roble en bandas suaves y la mancha de luz de un ventanal (tranquila)
  for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) { const b = Math.floor(x / 26), p = (x % 26) / 26; let c = p < 0.12 || p > 0.9 ? P.robleS : P.roble; if (y > 22) c = P.robleS;
    if (x > 30 && x < 90 && y < 22 && d_umbral(x, y) < 0.5 - Math.abs(x - 60) / 70) c = P.robleL; if (x >= 266) c = y > 22 ? P.robleS : P.roble; R.buf[y * 320 + x] = c; void b; }
  // el canto de la mesa y el tablero de caoba con vetas (tranquilo arriba a la derecha)
  rect(0, 30, 319, 32, P.caobaL); rect(0, 33, 319, 33, P.caobaD);
  rect(0, 34, 319, 179, P.caoba);
  for (let y = 36; y < 180; y += 11) { rect(0, y + 10, 319, y + 10, P.caobaS); for (let g = 0; g < 4; g++) { const gy = y + 1 + Math.round(h(y, g, 501) * 8); let x = -Math.round(h(y, g, 502) * 24);
    while (x < 320) { const Lg = 10 + Math.round(h(x, gy, 503) * 40); if (h(x, g, 504) < 0.7 && !(x > 262 && gy < 50)) rect(Math.max(0, x), gy, Math.min(319, x + Lg), gy, g === 3 ? P.caobaL : P.caobaS); x += Lg + 4 + Math.round(h(x, gy, 505) * 14); } } }
  // la carpeta de piel verde con su filete dorado y el desgaste
  rect(20, 54, 300, 176, P.panoS); rect(22, 56, 298, 174, P.pano);
  for (let y = 57; y < 174; y++) for (let x = 23; x < 298; x++) { const n = h(x >> 1, y >> 1, 506); if (n > 0.9) pset(x, y, P.panoL); else if (n < 0.06) pset(x, y, P.panoS); }
  for (let x = 26; x < 295; x += 2) { pset(x, 59, P.latonS); pset(x, 171, P.latonS); } for (let y = 59; y < 172; y += 2) { pset(26, y, P.latonS); pset(294, y, P.latonS); }
  for (const [mx, my] of [[250, 160], [60, 66], [282, 128]]) { R.disco(mx, my, 1.5, P.tinta); pset(mx + 2, my + 1, P.tinta); }
  // el diario de a bordo abierto (arriba a la izquierda), con renglones y columnas de rayas
  rect(24, 36, 112, 76, P.cueroS); rect(26, 37, 67, 74, P.papel); rect(70, 37, 110, 74, P.papelL); rect(68, 37, 69, 74, P.papelS);
  for (let yy = 41; yy < 72; yy += 3) { rect(29, yy, 64, yy, P.papelS); rect(73, yy, 107, yy, P.papelS); if (yy < 66) { rect(30, yy - 1, 30 + Math.round(h(yy, 1, 507) * 20) + 8, yy - 1, P.tinta); if (yy < 50) rect(74, yy - 1, 74 + Math.round(h(yy, 2, 507) * 18) + 6, yy - 1, P.tinta); } }
  rect(52, 39, 52, 72, P.cintaS); rect(98, 39, 98, 72, P.cintaS);
  // el legajo atado con cinta roja (arriba a la derecha, fuera de la esquina de Atom)
  for (let q = 0; q < 5; q++) { rect(196 + q, 38 + q * 4, 258 - q, 41 + q * 4, q % 2 ? P.papelS : P.papel); rect(196 + q, 41 + q * 4, 258 - q, 41 + q * 4, P.papelS); }
  rect(196, 58, 258, 60, P.papelS); rect(224, 37, 228, 61, P.cinta); rect(196, 47, 258, 49, P.cinta); rect(224, 47, 228, 49, P.cintaS); R.linea(226, 49, 232, 57, P.cinta); R.linea(226, 49, 220, 58, P.cinta);
  // el tintero de latón con la pluma (abajo a la izquierda)
  rect(26, 146, 48, 170, P.latonS); rect(27, 147, 47, 169, P.laton); rect(27, 147, 47, 148, P.latonL); disco(37, 154, 6, P.negro); disco(37, 154, 4, hex('#1a1a2a')); pset(35, 152, P.vidrioL);
  R.linea(40, 152, 70, 128, P.papelL); R.linea(41, 152, 71, 128, P.papelS); for (let i = 0; i < 12; i++) { pset(70 - i * 2, 128 + Math.round(i * 1.6) - 2, P.papelL); }
  // la vaina negra con brocal y contera de latón, por debajo de la espada
  rect(78, 126, 258, 134, P.negroT); rect(78, 126, 258, 127, P.negroTL); rect(78, 133, 258, 134, P.negro); R.poligono([[258, 126], [266, 129], [266, 131], [258, 134]], P.laton); rect(78, 125, 90, 135, P.laton); rect(78, 125, 90, 126, P.latonL); rect(150, 125, 156, 135, P.latonS); rect(151, 125, 155, 126, P.laton);
  rect(70, 135, 268, 137, d_mezcla(P.pano, P.negro, 0.35));
  // LA ESPADA: el pomo, el puño de alambre, el guardamano de latón y la hoja con su vaceo
  const yc = 101; rect(40, yc + 9, 296, yc + 11, d_mezcla(P.pano, P.negro, 0.4));
  disco(42, yc, 5, P.latonS); disco(42, yc, 4, P.laton); pset(40, yc - 2, P.latonL); pset(41, yc - 2, P.latonL);
  rect(46, yc - 3, 68, yc + 3, P.cueroS); for (let x = 46; x < 68; x++) for (let y = yc - 3; y <= yc + 3; y++) if ((x + y) % 3 === 0) pset(x, y, P.laton); else if ((x + y) % 3 === 1) pset(x, y, P.cuero); rect(46, yc - 3, 68, yc - 3, P.latonL);
  for (let a = 0; a <= 3.14; a += 0.04) { const x = Math.round(57 + Math.cos(a) * 13), y = Math.round(yc + 4 + Math.sin(a) * 10); pset(x, y, P.laton); pset(x, y + 1, P.latonS); }
  rect(68, yc - 10, 72, yc + 12, P.latonS); rect(69, yc - 9, 71, yc + 11, P.laton); rect(69, yc - 9, 69, yc + 11, P.latonL); disco(70, yc - 11, 2, P.laton); disco(70, yc + 13, 2, P.laton);
  for (let x = 72; x <= 296; x++) { const u = (x - 72) / 224, a = Math.max(0, Math.round(5 * (1 - Math.pow(u, 3)))), y0 = yc - a, y1 = yc + Math.max(0, a - 1);
    for (let y = y0; y <= y1; y++) pset(x, y, y === y0 ? P.aceroL : y === y1 ? P.aceroD : y < yc - 1 ? P.acero : P.aceroS);
    if (x < 230 && a > 2) pset(x, yc - 1, P.aceroD); if (x < 230 && a > 2) pset(x, yc - 2, P.aceroL); }
  pset(297, yc, P.aceroS);
  // LAS MANCHAS PARDAS en la hoja (y unas gotitas en la carpeta)
  for (const [mx, my, r, k] of [[160, yc - 1, 4, 0], [174, yc + 1, 5, 1], [188, yc - 2, 3.5, 2], [199, yc, 3, 3], [168, yc - 3, 2.5, 4]]) for (let y = Math.floor(my - r); y <= my + r; y++) for (let x = Math.floor(mx - r * 1.4); x <= mx + r * 1.4; x++) {
    const d = ((x - mx) / (r * 1.4)) ** 2 + ((y - my) / r) ** 2 + (h(x, y, 508 + k) - 0.5) * 0.7; if (d > 1) continue; const p = R.pget(x, y); if (p !== P.acero && p !== P.aceroS && p !== P.aceroL && p !== P.aceroD) continue; pset(x, y, d < 0.35 ? P.manchaS : h(x, y, 509) > 0.75 ? P.manchaL : P.mancha); }
  for (const [mx, my] of [[182, 116], [195, 119], [170, 121]]) { pset(mx, my, P.manchaS); pset(mx + 1, my, P.mancha); }
}

// la espada de cerca: lo fijo, el brillo que recorre la hoja, el polvo, la lupa que aumenta, el óxido y el análisis
function d_espada(R, t, o) {
  const P = d_P, { rect, pset } = R, B = R.buf, yc = 101, man = [178, 101];
  R.copiar(d_buf(R, 'espada', () => d_espadaFija(R)));
  // el brillo que recorre la hoja cada cuatro segundos y medio
  { const u = (t % 4.5) / 1.4; if (u < 1) { const gx = Math.round(80 + u * 210); for (let i = 0; i < 4; i++) for (let y = yc - 5; y <= yc + 4; y++) { const x = gx + i - (y - yc); const p = R.pget(x, y); if (p === P.acero || p === P.aceroS || p === P.aceroD) pset(x, y, i === 1 || i === 2 ? P.aceroL : P.acero); } } }
  // el polvo en la luz
  for (let k = 0; k < 14; k++) { const fy = (h(k, 3, 511) * 150 + t * (3 + h(k, 4, 511) * 4)) % 150, x = Math.round(h(k, 5, 511) * 250 + Math.sin(t * 0.7 + k) * 5), y = Math.round(170 - fy); if (Math.sin(t * 1.3 + k * 2) > -0.3 && !(x > 262 && y < 50)) pset(x, y, P.papelL); }
  // o.analisis: la gradilla con el tubo de ensayo entra por la derecha; cae una escama, burbujea y el líquido no cambia
  let frasco = null; const an = d_lim(o.analisis ?? 0);
  if (an > 0) { const fx = Math.round(lerp(340, 280, d_suave(an / 0.3))), fy = 150;
    rect(fx - 12, fy - 2, fx + 12, fy + 3, P.maderaS); rect(fx - 12, fy - 2, fx + 12, fy - 2, P.maderaL); rect(fx - 12, fy - 10, fx + 12, fy - 9, P.madera); rect(fx - 11, fy - 9, fx - 10, fy - 2, P.maderaS); rect(fx + 10, fy - 9, fx + 11, fy - 2, P.maderaS);
    rect(fx - 3, fy - 30, fx + 3, fy - 2, P.cristalS); rect(fx - 2, fy - 30, fx + 2, fy - 3, P.cristal); rect(fx - 2, fy - 15, fx + 2, fy - 3, P.liquido); rect(fx - 2, fy - 15, fx + 2, fy - 15, P.liquidoS); pset(fx - 2, fy - 28, P.blanco); rect(fx - 2, fy - 26, fx - 2, fy - 18, P.blanco);
    rect(fx - 4, fy - 31, fx + 4, fy - 30, P.cristalS);
    const e = d_lim((an - 0.35) / 0.15); if (e > 0 && e < 1) { const ey = Math.round(lerp(fy - 44, fy - 14, e)); pset(fx, ey, P.mancha); pset(fx + 1, ey, P.manchaS); }
    if (an > 0.5 && an < 0.85) for (let i = 0; i < 4; i++) { const by = fy - 4 - ((t * 12 + i * 3) % 11); pset(fx - 1 + (i % 3), Math.round(by), P.papelL); }
    if (an >= 0.5) { pset(fx, fy - 4, P.manchaS); pset(fx + 1, fy - 3, P.mancha); }
    frasco = [fx, fy - 15]; }
  // LA LUPA ENORME: su sombra en la mesa, lo de debajo aumentado al doble, el aro de latón, el brillo y el mango
  let lupa = null, mango = null; const lp = o.lupa === undefined ? man : o.lupa;
  if (lp) { const [lx, ly] = lp.map(Math.round), r = 28;
    for (let y = ly - r + 8; y <= ly + r + 12; y++) for (let x = lx - r + 6; x <= lx + r + 10; x++) { const d = Math.hypot(x - lx - 7, (y - ly - 10) * 1.1); if (d < r && Math.hypot(x - lx, y - ly) > r + 1 && d_umbral(x, y) < 0.6) pset(x, y, d_mezcla(R.pget(x, y), P.negro, 0.35)); }
    const n = 2 * r + 1, cp = new Uint32Array(n * n); for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) cp[j * n + i] = R.pget(lx - r + i, ly - r + j);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r - 2) continue; const si = Math.round(i / 2 + i * 0.03 * (d / r)), sj = Math.round(j / 2); let c = cp[(sj + r) * n + si + r]; if (d > r - 6 && (i + j) % 2 === 0) c = d_mezcla(c, P.cristal, 0.18); pset(lx + i, ly + j, c); }
    for (let a = 0; a < 6.283; a += 0.012) for (let k = 0; k < 4; k++) { const rr = r - 2 + k, x = Math.round(lx + Math.cos(a) * rr), y = Math.round(ly + Math.sin(a) * rr), luz = Math.cos(a + 2.4); pset(x, y, k === 3 ? P.caobaD : luz > 0.5 ? P.latonL : luz < -0.4 ? P.latonS : P.laton); }
    for (let a = 3.6; a < 4.6; a += 0.05) { pset(Math.round(lx + Math.cos(a) * (r - 6)), Math.round(ly + Math.sin(a) * (r - 6)), P.blanco); pset(Math.round(lx + Math.cos(a) * (r - 8)), Math.round(ly + Math.sin(a) * (r - 8)), P.cristal); }
    const ax = lx + Math.round(r * 0.72), ay = ly + Math.round(r * 0.72); for (let i = 0; i < 26; i++) { const x = ax + Math.round(i * 0.75), y = ay + Math.round(i * 0.75); rect(x - 2, y - 1, x + 2, y + 1, i < 5 ? P.latonS : P.maderaD); pset(x - 1, y - 1, i < 5 ? P.latonL : P.madera); }
    lupa = [lx, ly, r]; mango = [ax + 18, ay + 18]; }
  // o.sopla: la nubecilla de óxido naranja que sube de las manchas, se abre y se deshace
  const sp = d_lim(o.sopla ?? 0);
  if (sp > 0) for (let k = 0; k < 46; k++) { const u = d_lim(sp * 1.25 - h(k, 1, 512) * 0.25); if (u <= 0 || u >= 1) continue; const x0 = 158 + h(k, 2, 512) * 44, y0 = yc + (h(k, 3, 512) - 0.5) * 6;
    const x = Math.round(x0 - u * (20 + h(k, 4, 512) * 50) + Math.sin(t * 3 + k) * u * 4), y = Math.round(y0 - u * (30 + h(k, 5, 512) * 40)), c = h(k, 6, 512) < 0.35 ? P.oxidoL : h(k, 6, 512) < 0.75 ? P.oxido : P.oxidoS;
    if (u > 0.75 && (k & 1)) continue; if (x > 262 && y < 50) continue; pset(x, y, c); if (u < 0.6 && h(k, 7, 512) > 0.4) { pset(x + 1, y, c); pset(x, y + 1, P.oxidoS); } }
  void B;
  return { manchas: man, lupa, mango, frasco };
}

// qué pinta cada encuadre y cámara, y lo de delante de cada uno
const d_PINTA = { 'bahia.general': d_bahia, 'bahia.barco': d_barcoCam, 'tribunal.general': d_tribunal, 'tribunal.espada': d_espada };

const d_DELANTE = { 'bahia.general': d_bahiaDelante, 'bahia.barco': d_barcoDelante, 'tribunal.general': d_tribunalDelante };

// EL BERGANTÍN DEL CANON (copia de a_bergantin del grupo A, para que el barco cuadre entre decorados), de perfil: (x, y)
// es el centro de su flotación, L su eslora en píxeles (unos 200 en un plano
// general). o.dir 1 (proa a la derecha) | -1; o.rot giro en radianes (positivo: la proa baja hacia la derecha); o.casco
// 'mc' (negro, franja blanca, obra viva roja) | 'dg' (verde, el Dei Gratia) | 'madera' (en grada, sin pintar);
// o.cuadernas 0–1 (la parte de popa aún sin forrar, con las cuadernas a la vista); o.flota (los píxeles de obra viva que
// asoman sobre el agua; sin ella se pinta el casco entero, fuera del agua); o.palos (false: sin arboladura); o.velas
// 0–1 (recogidas … largadas); o.roto (el mastelero del trinquete partido y colgando, una vela rota); o.bote (el bote
// sobre la escotilla); o.blancas (velas más blancas, las del Dei Gratia); o.bandera (false: sin la bandera de barras y
// estrellas, para el Amazon y el Dei Gratia, que eran británicos); o.altoM (alto del palo mayor en esloras, 0.52 por
// omisión: más bajo para que el tope y el gallardete no lleguen a la barra del año). Devuelve puntos útiles en pantalla.
function d_bergantin(R, x, y, L, t, o = {}) {
  const dir = o.dir ?? 1, a = o.rot ?? 0, ca = Math.cos(a), sa = Math.sin(a), H = L * 0.12, D = L * 0.075, velas = d_lim(o.velas ?? 0);
  const P = (u, v) => [Math.round(x + dir * u * ca + v * sa), Math.round(y + dir * u * sa - v * ca)];
  const inv = (sx, sy) => { const dx = sx + 0.5 - x, dy = sy + 0.5 - y; return [dir * (dx * ca + dy * sa), dx * sa - dy * ca]; };
  const vT = (u) => { const s = (2 * u) / L; return H * (1 + 0.13 * s * s + 0.05 * s); };
  const vB = (u) => { const s = (2 * u) / L; if (s > 0.62) return -D + (D + H * 1.25) * Math.pow((s - 0.62) / 0.42, 2); if (s < -0.86) return -D + (D + H * 0.55) * Math.pow((-0.86 - s) / 0.14, 1.5); return -D; };
  const bot = (u) => Math.min(vT(u), o.flota != null ? Math.max(vB(u), -o.flota) : vB(u));
  const casco = o.casco ?? 'mc', CP = casco === 'dg' ? [C.verdeDG, d_P.verdeDGL, d_P.verdeDGS] : casco === 'madera' ? [d_P.madera, d_P.maderaL, d_P.maderaS] : [C.casco, C.cascoL, d_P.negro];
  const blanco = o.blancas ? [d_P.blanco, d_P.blancoS] : [C.lona, C.lonaS], J = d_P.jarcia, uc = o.cuadernas ? -0.5 * L + o.cuadernas * L : -1e9;
  const us = []; for (let u = -0.5 * L; u < 0.52 * L; u += 3) us.push(u); us.push(0.52 * L);
  // la jarcia de detrás (los obenques y estays) se pinta antes del casco para que asome por encima de la regala
  const uF = 0.22 * L, uM = -0.1 * L, vd = (u) => vT(u) - 1, palos = o.palos !== false, cy = (k) => vd(uF) + k * L;
  // el casco
  R.poligono([...us.map((u) => P(u, vT(u))), ...us.slice().reverse().map((u) => P(u, bot(u)))], (sx, sy) => {
    const [u, v] = inv(sx, sy), top = vT(u), dd = top - v;
    if (u < uc) { const fr = ((Math.round(u) % 6) + 6) % 6; if (dd < 1.5 || v < vB(u) + 2.2) return d_P.maderaS; return fr < 2 ? (fr === 0 ? d_P.maderaL : d_P.madera) : (dd < 4 || (dd > 9 && dd < 11)) ? d_P.interiorL : d_P.interior; }
    if (dd < 1.3) return casco === 'madera' ? C.tablaL : C.tabla;                                   // la regala
    if (casco !== 'madera' && dd >= H * 0.26 && dd < H * 0.26 + 1.6) return C.franja;               // la franja blanca, fina
    if (v < 0) return casco === 'madera' ? (d_umbral(sx, sy) < 0.5 + Math.min(0.4, -v / D * 0.4) ? d_P.maderaS : d_P.madera) : v < -D * 0.5 && d_umbral(sx, sy) < 0.5 ? C.robleRS : C.obraViva;
    const seam = (dd % 3) < 0.8, sh = v < H * 0.25 && d_umbral(sx, sy) < 0.55;
    if (casco === 'madera') { if (seam) return d_P.maderaS; const k = h(Math.round(u / 9), Math.round(dd / 3), 651); return dd < 5 && d_umbral(sx, sy) < 0.5 ? d_P.maderaL : k > 0.75 ? d_mezcla(d_P.madera, d_P.maderaL, 0.5) : k < 0.2 || sh ? d_P.maderaS : d_P.madera; }
    if (dd < H * 0.26) return seam ? CP[0] : d_umbral(sx, sy) < 0.35 ? CP[1] : CP[0];              // la borda, con su luz
    return seam ? CP[2] : sh ? CP[2] : d_umbral(sx + 1, sy) < 0.12 ? CP[1] : CP[0];
  });
  // la línea de flotación a flote, un filo claro de agua
  if (o.flota != null) for (const u of us) { const [px, py] = P(u, 0); if ((px + Math.floor(t * 3)) % 4) R.pset(px, py + 1, C.espuma); }
  // el codaste y la quilla en grada
  if (casco === 'madera') { R.linea(...P(-0.42 * L, -D - 1), ...P(0.4 * L, -D - 1), d_P.maderaD); R.linea(...P(-0.5 * L, 0.5 * H), ...P(-0.5 * L, vT(-0.5 * L) + 0.35 * H), d_P.maderaD); R.linea(...P(-0.495 * L, 0.5 * H), ...P(-0.495 * L, vT(-0.5 * L) + 0.35 * H), d_P.madera);
    R.linea(...P(0.52 * L, vT(0.52 * L)), ...P(0.535 * L, vT(0.52 * L) + 0.3 * H), d_P.maderaD); R.linea(...P(0.515 * L, vT(0.52 * L)), ...P(0.53 * L, vT(0.52 * L) + 0.3 * H), d_P.maderaL);
    for (let u = -0.1 * L; u < 0.45 * L; u += 0.09 * L) { const [px, py] = P(u, vT(u) - 1); R.pset(px, py, d_P.maderaD); R.pset(px, py - 1, d_P.maderaS); } }
  if (!palos && casco === 'madera') return { P, vd, deck: P(0, vd(0)), proa: P(0.52 * L, vT(0.52 * L)), popa: P(-0.5 * L, vT(-0.5 * L)) };
  // la caseta del camarote, el timón y el bote
  const yC = (u) => vT(u);
  R.poligono([P(-0.44 * L, yC(-0.44 * L)), P(-0.3 * L, yC(-0.3 * L)), P(-0.3 * L, yC(-0.3 * L) + 0.32 * H), P(-0.44 * L, yC(-0.44 * L) + 0.32 * H)], (sx, sy) => ((sy + sx) % 3 === 0 ? C.tablaS : C.tabla));
  R.linea(...P(-0.45 * L, yC(-0.44 * L) + 0.34 * H), ...P(-0.29 * L, yC(-0.3 * L) + 0.34 * H), C.tablaS);
  for (const uu of [-0.4, -0.34]) { const [wx, wy] = P(uu * L, yC(uu * L) + 0.18 * H); R.rect(wx - 1, wy - 1, wx + 1, wy, d_P.vidrio); R.pset(wx - 1, wy - 1, d_P.vidrioL); }
  { const [tx, ty] = P(-0.475 * L, yC(-0.475 * L)), [rx, ry] = P(-0.475 * L, yC(-0.475 * L) + 0.3 * H), r = Math.max(2, Math.round(0.12 * H)); R.linea(tx, ty, rx, ry, C.tablaS);
    for (let k = 0; k < 4; k++) { const an = k * Math.PI / 4 + (o.giro ?? 0); R.linea(rx - Math.round(Math.cos(an) * r), ry - Math.round(Math.sin(an) * r), rx + Math.round(Math.cos(an) * r), ry + Math.round(Math.sin(an) * r), C.tablaS); } R.pset(rx, ry, C.tablaL); }
  if (o.bote !== false) { const b0 = -0.03 * L, b1 = 0.12 * L, by = (u) => yC(u) + 0.05 * H;
    R.poligono([P(b0, by(b0)), P(b1, by(b1)), P(b1 - 0.02 * L, by(b1) + 0.28 * H), P(b0 + 0.02 * L, by(b0) + 0.28 * H)], (sx, sy) => (sy % 3 === 0 ? d_P.blancoS : d_P.blanco));
    R.linea(...P(b0 + 0.02 * L, by(b0) + 0.29 * H), ...P(b1 - 0.02 * L, by(b1) + 0.29 * H), d_P.grisS); R.linea(...P(b0 + 0.01 * L, by(b0)), ...P(b1 - 0.01 * L, by(b1)), d_P.grisS); }
  if (!palos) return { P, vd, deck: P(0, vd(0)), proa: P(0.52 * L, vT(0.52 * L)), popa: P(-0.5 * L, vT(-0.5 * L)) };
  // jarcia firme: obenques con flechastes, estays, brandales
  const obenques = (u, alto) => { const top = P(u, vd(u) + alto), pies = [-0.07, -0.045, -0.02].map((d) => P(u + d * L, vT(u + d * L) - 0.5));
    for (const p of pies) R.linea(top[0], top[1], p[0], p[1], J);
    for (let k = 3; k < 30; k += 3) { const f = k / 30, a0 = [pies[0][0] + (top[0] - pies[0][0]) * f, pies[0][1] + (top[1] - pies[0][1]) * f], a1 = [pies[2][0] + (top[0] - pies[2][0]) * f, pies[2][1] + (top[1] - pies[2][1]) * f]; R.linea(a0[0], a0[1], a1[0], a1[1], d_P.cuerdaS); } };
  obenques(uF, 0.29 * L); obenques(uM, 0.31 * L);
  const bauF = P(0.74 * L, vT(0.5 * L) + 0.07 * L);
  R.linea(...P(uF, cy(0.37)), ...bauF, J); R.linea(...P(uF, cy(0.3)), ...P(0.6 * L, vT(0.5 * L) + 0.04 * L), J);
  R.linea(...P(uM, vd(uM) + 0.4 * L), ...P(uF, vd(uF) + 0.05 * L), J); R.linea(...P(uM, vd(uM) + 0.49 * L), ...P(-0.42 * L, vT(-0.42 * L)), J);
  // el bauprés
  { const b0 = P(0.46 * L, vT(0.46 * L) - 1); R.linea(b0[0], b0[1], bauF[0], bauF[1], d_P.madera); R.linea(b0[0], b0[1] + 1, bauF[0], bauF[1] + 1, d_P.maderaS); }
  // los palos (dos píxeles el macho, uno el mastelero) con sus cofas
  const palo = (u, alto, roto) => { const [x0, y0] = P(u, vd(u)), [x1, y1] = P(u, vd(u) + 0.3 * L), [x2, y2] = P(u, vd(u) + (roto ? 0.33 : alto) * L);
    R.linea(x0, y0, x1, y1, d_P.maderaL); R.linea(x0 + 1, y0, x1 + 1, y1, d_P.maderaS); R.linea(x1, y1, x2, y2, d_P.madera);
    const [cx0, cy0] = P(u - 0.025 * L, vd(u) + 0.3 * L), [cx1, cy1] = P(u + 0.025 * L, vd(u) + 0.3 * L); R.linea(cx0, cy0, cx1, cy1, d_P.maderaD); return [x2, y2]; };
  const topeF = palo(uF, 0.5, o.roto), topeM = palo(uM, o.altoM ?? 0.52, false);
  if (o.roto) { const s = Math.sin(t * 1.4) * 0.04 * L, [ax, ay] = P(uF, vd(uF) + 0.33 * L); R.linea(ax, ay, ax + Math.round(dir * 0.08 * L + s), ay + Math.round(0.13 * L), d_P.madera); R.linea(ax, ay, ax + Math.round(dir * 0.1 * L + s), ay + Math.round(0.02 * L), J); }
  // el gallardete rojo en el tope del mayor, que ondea
  for (let i = 0; i < 9; i++) R.pset(topeM[0] - dir * (i + 1), topeM[1] + 1 + Math.round(Math.sin(t * 6 - i * 0.8) * (i / 9) * 1.5), i < 3 ? d_P.rojo : d_P.rojoS);
  // las vergas del trinquete con las velas cuadradas (recogidas sobre la verga o largadas, que bajan con o.velas)
  const VG = [[0.155, 0.16], [0.255, 0.135], [0.345, 0.105], o.roto ? null : [0.43, 0.08]];
  for (let i = VG.length - 1; i >= 0; i--) { const g = VG[i]; if (!g) continue; const [k, w] = g, v0 = cy(k), lo = i === 0 ? [cy(0.02), w + 0.01] : VG[i - 1], vb = i === 0 ? lo[0] : cy(lo[0]), wb = lo[1];
    if (velas > 0.02 && !(o.roto && i === 2)) { const f = velas, vv = v0 - (v0 - vb) * f, ww = w + (wb - w) * f, panza = 0.012 * L * f;
      R.poligono([P(uF - w * L, v0), P(uF + w * L, v0), P(uF + ww * L + panza, vv), P(uF - ww * L + panza, vv)], (sx, sy) => { const [uu, v] = inv(sx, sy), e = Math.abs(uu - uF) / (ww * L + 1); return v > v0 - 1.5 ? blanco[1] : (Math.round(uu) % 5 === 0 && d_umbral(sx, sy) < 0.6) || e > 0.85 ? blanco[1] : blanco[0]; }); }
    if (o.roto && i === 2) { const fl = Math.sin(t * 5) * 2; R.poligono([P(uF - w * L, v0), P(uF + w * 0.2 * L, v0), P(uF - w * 0.3 * L + fl, v0 - 0.06 * L), P(uF - w * 0.9 * L + fl, v0 - 0.08 * L)], (sx, sy) => ((sx + sy) % 4 ? blanco[1] : blanco[0])); }
    const [ax, ay] = P(uF - w * L, v0), [bx, by] = P(uF + w * L, v0); R.linea(ax, ay, bx, by, d_P.maderaS);
    if (velas < 0.5) { R.linea(ax + 1, ay + 1, bx - 1, by + 1, blanco[0]); if (i < 2) R.linea(ax + 1, ay + 2, bx - 1, by + 2, blanco[1]); for (let q = 2; q < w * L * 2; q += 4) { const pp = P(uF - w * L + q, v0); R.pset(pp[0], pp[1] + 1, d_P.cuerdaS); } } }
  // la cangreja del mayor: el pico sube por el palo al izarla; recogida, va sobre la botavara
  { const f = velas, gTh = vd(uM) + (0.11 + 0.29 * f) * L, gPk = vd(uM) + (0.13 + 0.34 * f) * L, bTh = vd(uM) + 0.07 * L, bEnd = vd(uM) + 0.09 * L, uP = uM - (0.14 + 0.06 * f) * L, uB = uM - 0.38 * L;
    if (f > 0.05) R.poligono([P(uM, gTh), P(uP, gPk), P(uB + 0.01 * L, bEnd + 1), P(uM, bTh + 1)], (sx, sy) => { const [uu] = inv(sx, sy); return Math.round(uu) % 5 === 0 && d_umbral(sx, sy) < 0.6 ? blanco[1] : blanco[0]; });
    R.linea(...P(uM, gTh), ...P(uP, gPk), d_P.maderaS); R.linea(...P(uM, bTh), ...P(uB, bEnd), d_P.maderaS);
    if (f < 0.5) { R.linea(...P(uM - 0.02 * L, bTh + 1.5), ...P(uB + 0.02 * L, bEnd + 1.5), blanco[0]); R.linea(...P(uM - 0.03 * L, bTh + 2.5), ...P(uB + 0.06 * L, bEnd + 2.5), blanco[1]); }
    // la bandera (barras rojas y blancas, el cantón azul con puntos) en el pico, que ondea
    const [fx, fy] = P(uP, gPk); if (o.bandera !== false) for (let i = 0; i < 9; i++) for (let j = 0; j < 6; j++) { const yy = fy + j + Math.round(Math.sin(t * 5 - i * 0.7) * (i / 9) * 1.5), xx = fx - dir * (i + 1);
      R.pset(xx, yy, i < 4 && j < 3 ? ((i + j) % 2 && j < 2 ? d_P.blanco : d_P.azul) : j % 2 ? d_P.blanco : d_P.rojo); } }
  // los foques: recogidos, una línea blanca sobre el bauprés; largados, dos triángulos
  if (velas > 0.05) { const f = velas; for (const [k, ub] of [[0.36, 0.72], [0.28, 0.6]]) { const tack = P(ub * L, vT(0.5 * L) + (ub - 0.5) * 0.3 * L), head = P(uF + 0.01 * L, cy(k)), clew = P(uF + 0.06 * L, vT(uF) + 0.03 * L);
      R.poligono([tack, [Math.round(tack[0] + (head[0] - tack[0]) * f), Math.round(tack[1] + (head[1] - tack[1]) * f)], [Math.round(tack[0] + (clew[0] - tack[0]) * f), Math.round(tack[1] + (clew[1] - tack[1]) * f)]], (sx, sy) => ((sx + sy) % 5 === 0 ? blanco[1] : blanco[0])); } }
  else { const b0 = P(0.5 * L, vT(0.5 * L) + 1); R.linea(b0[0], b0[1] - 1, bauF[0], bauF[1] - 1, blanco[0]); }
  return { P, vd, deck: P(0, vd(0)), escotilla: P(0.06 * L, vd(0.06 * L)), proa: P(0.52 * L, vT(0.52 * L)), popa: P(-0.5 * L, vT(-0.5 * L)), topeF, topeM };
}
// las paletas de los dos laboratorios: 2006 cálido y viejo (verde crema, azulejo, teca, linóleo, Londres gris) y 2026
// frío y oscuro (techo de instalaciones, LED, roble claro, negro de las poyatas, resina gris)
const e_U = pal({
  techo: '#dcd8cc', techoJ: '#ccc8bc', cornisa: '#c4c0b2', pared: '#d4dcc0', paredS: '#c2caae', paredL: '#e2e8d2',
  azulejo: '#eceeea', azulejoS: '#d6dad6', azulejoL: '#ffffff', junta: '#aeb4b0',
  madera: '#8a5a32', maderaS: '#5e3a1e', maderaL: '#b07a48', maderaD: '#3a2414',
  lino: '#8e9c88', linoS: '#7a8874', linoL: '#a6b2a0', linoJ: '#6e7c6a', luzV: '#c8d4c0',
  metal: '#a8aeb6', metalS: '#7a808a', metalL: '#d4d8de', metalD: '#4e545e',
  campana: '#d8d6cc', campanaS: '#b2b0a6', campanaL: '#ecebe4', dentro: '#e2ecee', dentroS: '#c4d0d4',
  marco: '#f2f0ea', marcoS: '#c8c6be', cielo1: '#8e9aaa', cielo2: '#a2acba', cielo3: '#b8c0cc', nube: '#a8b0bc', nubeS: '#8a94a2', nubeL: '#ccd2da',
  ladrillo: '#b8a27c', ladrilloS: '#9a8462', ladrilloL: '#ccb892', mortero: '#d6ccb2', ventO: '#2a3038', ventL: '#f0d890', ventS: '#4a5460',
  pizarra: '#f4f6f4', pizarraS: '#dde2e2', aluminio: '#b8bec6', gas: '#e0b830', gasL: '#f4dc70', laton: '#c8a040', latonS: '#8a6a20',
  perspex: '#cfe8f4', fondoCaja: '#4a3220', fondoCajaS: '#3a2618', fondoCajaL: '#5e4230', cubo: '#f6f4ee', cuboS: '#cfccc2', cuboL: '#ffffff',
  bombona: '#2a5aa8', bombonaS: '#1a3a78', bombonaL: '#5a8ad0', naranja: '#e8803a', azulO: '#1a2a6a',
  bus: '#c8322a', busS: '#8e2018', busL: '#e05a48', planta: '#4a8a3a', plantaL: '#7ab85a', plantaS: '#2e5a26',
});

const e_M = pal({
  techo: '#2c3038', techoS: '#23262c', techoL: '#3a3e48', led: '#f4f8ff', ledG: '#8a96a8',
  pared: '#c4c8ce', paredS: '#b0b4bc', paredL: '#d4d8de',
  liston: '#b88e5c', listonS: '#8a6640', listonL: '#d0a874', hueco: '#3a2e24',
  negro: '#25272c', negroL: '#3c4048', negroS: '#18191d', acero: '#b4bac2', aceroS: '#7e8590', aceroL: '#dfe3e8',
  suelo: '#a4aab2', sueloS: '#8e949c', sueloL: '#bec4ca', cristal: '#a8c6d2', marco: '#3a3e46', pasillo: '#e4e6e2', pasilloS: '#c8ccc6',
  amarillo: '#e8c020', amarilloS: '#b08e10', amarilloL: '#f6dc60', pantalla: '#0e1a26', pantallaG: '#1e3448', cian: '#5ad8e8', verde: '#6ae08a', naranja: '#f0a040',
  placa: '#d0d4d8', placaS: '#9aa0a8', ceramica: '#2a2a30', ascua: '#e85a2a', ascuaL: '#ffb060', frio: '#4a8ae8', calor: '#e83a2a',
  bata: '#eef0f2', azulBata: '#3a5a9a', ambar: '#c87a2a', ambarL: '#e8a850',
});

// un fondo fijo: se pinta una sola vez por lienzo en un búfer de R.nuevo() y se copia en cada fotograma
const e_CACHE = new WeakMap();

function e_fijo(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// mezcla dos colores (k = 0 el primero, 1 el segundo)
function e_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// tiñe un rectángulo con el color c y la fuerza k (f(x, y) la modula); respeta R.recorte
function e_tinte(R, x0, y0, x1, y1, c, k, f) {
  for (let y = Math.max(0, Math.round(y0)); y <= Math.min(179, Math.round(y1)); y++) for (let x = Math.max(0, Math.round(x0)); x <= Math.min(319, Math.round(x1)); x++) {
    const kk = f ? k * f(x, y) : k; if (kk > 0.02) R.pset(x, y, e_mezcla(R.pget(x, y), c, Math.min(1, kk)));
  }
}

// un alicatado de w × a px con sus juntas, el brillo de cada pieza y alguna más gris (P: azulejo, azulejoS, azulejoL, junta)
function e_azulejos(R, x0, y0, x1, y1, w, a, P, k = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const i = Math.floor((x - x0) / w), j = Math.floor((y - y0) / a), lx = (x - x0) % w, ly = (y - y0) % a;
    let c = h(i, j, 390 + k) > 0.82 ? P.azulejoS : P.azulejo;
    if (lx === 0 || ly === 0) c = P.junta; else if (lx === 1 && ly === 1) c = P.azulejoL; else if (ly === a - 1 && lx > 1) c = P.azulejoS;
    R.pset(x, y, c);
  }
}

// un pictograma de seguridad sin letras, de 13 × 13 px desde (x, y): 'llama' (rombo rojo con la llama), 'gafas' (círculo
// azul con las gafas), 'guantes' (círculo azul con la mano), 'botiquin' (cuadro verde con la cruz)
function e_picto(R, tipo, x, y) {
  const { rect, pset, poligono, disco } = R;
  if (tipo === 'llama') {
    poligono([[x + 6, y - 1], [x + 13, y + 6], [x + 6, y + 13], [x - 1, y + 6]], C.rojo); poligono([[x + 6, y + 1], [x + 11, y + 6], [x + 6, y + 11], [x + 1, y + 6]], C.blanco);
    rect(x + 4, y + 7, x + 8, y + 8, C.k); rect(x + 5, y + 5, x + 7, y + 6, C.k); pset(x + 6, y + 3, C.k); pset(x + 6, y + 4, C.k); pset(x + 4, y + 6, C.k); pset(x + 8, y + 4, C.k);
  } else if (tipo === 'botiquin') {
    rect(x, y, x + 12, y + 12, hex('#1e7a3e')); rect(x + 5, y + 2, x + 7, y + 10, C.blanco); rect(x + 2, y + 5, x + 10, y + 7, C.blanco);
  } else {
    disco(x + 6.5, y + 6.5, 6.5, hex('#2a5aa8')); disco(x + 6.5, y + 6.5, 5.5, hex('#3a6ac0'));
    if (tipo === 'gafas') { rect(x + 2, y + 5, x + 10, y + 8, C.blanco); rect(x + 6, y + 6, x + 6, y + 8, hex('#3a6ac0')); pset(x + 3, y + 6, hex('#2a5aa8')); pset(x + 9, y + 6, hex('#2a5aa8')); }
    else { rect(x + 4, y + 5, x + 8, y + 10, C.blanco); for (let k = 0; k < 4; k++) rect(x + 4 + k, y + 2 + (k % 3 ? 0 : 1), x + 4 + k, y + 5, C.blanco); rect(x + 9, y + 6, x + 10, y + 7, C.blanco); }
  }
}

// un frasco de laboratorio de pie en (x, yb), ancho w: tipo 'bote' (reactivo con tapón), 'matraz' (erlenmeyer),
// 'redondo' (de fondo redondo), 'vaso' (de precipitados); c el color del líquido o del vidrio (ámbar, azul…)
function e_frasco(R, x, yb, w, tipo, c, tapa = C.k) {
  const { rect, pset, poligono, disco } = R, cS = e_mezcla(c, C.k, 0.35), cL = e_mezcla(c, C.blanco, 0.5);
  if (tipo === 'bote') {
    const al = Math.round(w * 1.6); rect(x, yb - al, x + w - 1, yb, C.k); rect(x + 1, yb - al + 1, x + w - 2, yb - 1, c); rect(x + w - 2, yb - al + 2, x + w - 2, yb - 1, cS);
    rect(x + 1, yb - al + 1, x + 1, yb - 2, cL); rect(x + 2, yb - al + 4, x + w - 3, yb - 4, e_mezcla(c, C.blanco, 0.75));
    const cx = x + Math.floor(w / 2); rect(cx - 1, yb - al - 3, cx + 1 - (w < 5 ? 1 : 0), yb - al, tapa);
  } else if (tipo === 'matraz') {
    const al = Math.round(w * 1.3), cx = x + w / 2;
    poligono([[cx - 1.5, yb - al], [cx + 1.5, yb - al], [x + w, yb + 1], [x, yb + 1]], C.k);
    poligono([[cx - 0.5, yb - al + 1], [cx + 0.5, yb - al + 1], [x + w - 1, yb], [x + 1, yb]], hex('#d8e8ee'));
    poligono([[x + w * 0.28, yb - al * 0.42], [x + w * 0.72, yb - al * 0.42], [x + w - 1, yb], [x + 1, yb]], c);
    pset(Math.round(cx - 2), yb - 3, cL); rect(Math.round(cx - 1), yb - al - 2, Math.round(cx + 1), yb - al, C.k);
  } else if (tipo === 'redondo') {
    const r = w / 2, cx = x + r, cy = yb - r; disco(cx, cy, r + 0.5, C.k); disco(cx, cy, r - 0.5, hex('#d8e8ee'));
    for (let j = Math.round(cy); j < yb; j++) for (let i = x; i < x + w; i++) if ((i + 0.5 - cx) ** 2 + (j + 0.5 - cy) ** 2 < (r - 0.8) ** 2) pset(i, j, c);
    rect(Math.round(cx - 1), Math.round(cy - r - 5), Math.round(cx + 1), Math.round(cy - r), C.k); pset(Math.round(cx), Math.round(cy - r - 4), hex('#d8e8ee'));
    pset(Math.round(cx - r / 2), Math.round(cy - r / 2), C.blanco);
  } else {
    const al = Math.round(w * 1.2); rect(x, yb - al, x + w - 1, yb, C.k); rect(x + 1, yb - al, x + w - 2, yb - 1, hex('#d8e8ee'));
    rect(x + 1, yb - Math.round(al * 0.55), x + w - 2, yb - 1, c); rect(x + 1, yb - Math.round(al * 0.55), x + w - 2, yb - Math.round(al * 0.55), cL);
    pset(x + 1, yb - al + 1, C.blanco); for (let y = yb - al + 3; y < yb - 2; y += 3) pset(x + w - 2, y, C.k);
  }
}

// una nube de lluvia de tres tonos (sombra abajo, cuerpo, luz arriba), solo sobre los píxeles de cielo (esCielo)
function e_nubeGris(R, cx, cy, w, esCielo, P) {
  for (let j = -5; j <= 4; j++) for (let i = -w; i <= w; i++) {
    const r = Math.abs(i) / w, top = -3 - 2.2 * Math.cos(r * 1.6) - (Math.sin(i * 0.9) > 0.3 ? 1 : 0);
    if (j < top || r > 1) continue;
    const x = Math.round(cx + i), y = Math.round(cy + j); if (!esCielo(R.pget(x, y))) continue;
    R.pset(x, y, j > 2 ? P.nubeS : j < top + 1.5 ? P.nubeL : P.nube);
  }
}

// la llamarada azul del vapor que arde dentro de la caja [x0, y0, x1, y1] (recortada a ella): u 0–1 (el frente avanza de
// izquierda a derecha entre 0,08 y 0,4; se apaga entre 0,45 y 0,85); s la escala de las lenguas. Devuelve su fuerza
function e_llamarada(R, x0, y0, x1, y1, u, t, s = 1) {
  if (u <= 0.05 || u >= 0.86) return 0;
  const f = Math.min(1, Math.max(0, (u - 0.06) / 0.32)), fx = x0 - 6 * s + (x1 - x0 + 18 * s) * f;
  const a = u < 0.45 ? Math.min(1, (u - 0.05) / 0.05) : Math.max(0, 1 - (u - 0.45) / 0.4), hondo = hex('#1a2a8a');
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) {
    const lengua = Math.sin(y * 0.55 / s + t * 23) * 3 * s + Math.sin(y * 0.21 / s - t * 11) * 2 * s;
    for (let x = x0; x <= Math.min(x1, fx + lengua); x++) {
      const d = (fx + lengua - x) / (10 * s), q = Math.max(1, s * 0.9), n = 0.6 * h(Math.floor(x / q), Math.floor((y + t * 50) / q), 77) + 0.4 * Math.sin(x * 0.3 / s + y * 0.5 / s - t * 14) * 0.5 + 0.2;
      const v = a * (0.42 + 0.3 * n + 0.45 * Math.max(0, 1 - d)) * (0.75 + 0.25 * (y - y0) / (y1 - y0 + 1));
      const p = R.pget(x, y);
      R.pset(x, y, v > 0.92 ? e_mezcla(p, C.llamaL, 0.8) : v > 0.55 ? e_mezcla(p, C.llama, Math.min(0.85, v)) : e_mezcla(p, hondo, Math.min(0.7, v)));
    }
  }
  R.recorte(null);
  return a;
}

// un halo tramado de luz (c) alrededor de (cx, cy), de radios rx × ry y fuerza k: solo tiñe, no tapa
function e_halo(R, cx, cy, rx, ry, c, k) {
  if (k <= 0.02) return;
  e_tinte(R, cx - rx, cy - ry, cx + rx, cy + ry, c, k, (x, y) => { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); return d >= 1 ? 0 : (1 - d) * ((x + y) % 2 ? 1 : 0.7); });
}

// la tapa de la escotilla (una tabla de w × g px con sus dos listones y dos asas), centrada en (cx, cy) y girada ang
function e_tapa(R, cx, cy, w, g, ang = 0) {
  const ca = Math.cos(ang), sa = Math.sin(ang), P = (i, j) => [cx + i * ca - j * sa, cy + i * sa + j * ca];
  const ex = w / 2, ey = g / 2;
  R.poligono([P(-ex - 0.8, -ey - 0.8), P(ex + 0.8, -ey - 0.8), P(ex + 0.8, ey + 0.8), P(-ex - 0.8, ey + 0.8)], C.k);
  R.poligono([P(-ex, -ey), P(ex, -ey), P(ex, ey), P(-ex, ey)], (x, y) => {
    const i = (x + 0.5 - cx) * ca + (y + 0.5 - cy) * sa, j = -(x + 0.5 - cx) * sa + (y + 0.5 - cy) * ca;
    return j < -ey + 1 ? C.tablaL : j > ey - 1.2 ? C.tablaS : Math.abs(((i + ex) % (w / 3)) - 0) < 0.8 ? C.tablaS : C.tabla;
  });
  for (const s of [-1, 1]) { const [x, y] = P(s * ex * 0.55, -ey - 1); R.pset(Math.round(x), Math.round(y), C.k); }
}

// el casco canon del Mary Celeste en pequeño (la maqueta de madera de 2026), de perfil con la proa a la derecha y visto
// un poco desde arriba: x0 la popa, yq la quilla (donde apoya), L el largo. Casco negro con tablas, la franja blanca
// bajo la regala, la obra viva roja, la cubierta de tablas, la caseta de popa con dos ventanillas, los muñones de los
// dos palos con su zuncho, el bauprés y el brazolá de la escotilla en el centro (la tapa la pinta quien llama).
// Devuelve { esc: [x0, x1, y] (la boca de la escotilla), tapa: [cx, cy] (dónde se apoya la tapa), cub: y de cubierta }
function e_casco(R, x0, yq, L) {
  const { poligono, rect, linea, pset } = R;
  const H = Math.round(L * 0.21), yc = yq - H, x1 = x0 + L, D = Math.max(2, Math.round(L * 0.045)), arr = L * 0.025;
  const yTop = (x) => yc - arr * Math.max(0, (x - x0) / L) ** 2 * 1.4;
  const yw = yc + Math.round(H * 0.56), s = Math.max(1, Math.round(L * 0.012)), costura = Math.max(2, Math.round(L * 0.028));
  // el bauprés
  linea(x1 - 2, Math.round(yTop(x1) - 1), Math.round(x1 + L * 0.12), Math.round(yTop(x1) - L * 0.05), C.k);
  linea(x1 - 2, Math.round(yTop(x1) - 2), Math.round(x1 + L * 0.12), Math.round(yTop(x1) - L * 0.05 - 1), C.cueroS ?? C.maderaS);
  // el casco
  const pts = [[x0, yc], [x0 + L * 0.025, yc + H * 0.72], [x0 + L * 0.13, yq], [x1 - L * 0.24, yq], [x1 - L * 0.06, yc + H * 0.42], [x1 + L * 0.03, yTop(x1) - 1]];
  for (let k = 0; k <= 10; k++) { const xx = x1 - (L * k) / 10; pts.push([xx, yTop(xx)]); }
  poligono(pts, (x, y) => {
    const dy = y - yTop(x);
    if (dy < 1) return C.cascoL;
    if (dy < 1 + s) return C.franja;
    const borde = x < x0 + L * 0.05 || x > x1 - L * 0.04;
    if (y >= yw) { const c = (y - yw) % costura === 0 ? C.robleRS : y >= yq - 1 ? C.robleRS : C.obraViva; return borde && c === C.obraViva ? C.robleRS : c; }
    if (y === yw - 1) return C.franja;
    if ((y - yc) % costura === 0) return C.cascoL;
    return (h(Math.floor(x / 6), y, 501) > 0.86) || borde ? hex('#121016') : C.casco;
  });
  // la cubierta de tablas vista desde arriba, con su regala y las costuras
  const cub = [[x0 + 1, yc], [x1, yTop(x1)]], dpts = [];
  for (let k = 0; k <= 10; k++) { const xx = x0 + 1 + ((L - 1) * k) / 10; dpts.push([xx, yTop(xx) + 0.4]); }
  for (let k = 10; k >= 0; k--) { const xx = x0 + 2 + ((L - 3) * k) / 10 - (k === 10 ? L * 0.03 : 0); dpts.push([xx, yTop(xx) - D]); }
  poligono(dpts, (x, y) => { const dy = yTop(x) - y; return dy > D - 1 ? C.cascoL : (Math.round(dy) % 2 === 0 ? (h(Math.floor(x / 9), Math.round(dy), 502) > 0.7 ? C.tablaS : C.tabla) : C.tablaL); });
  // la caseta de popa con su techo y dos ventanillas
  const cx0 = Math.round(x0 + L * 0.07), cx1 = Math.round(x0 + L * 0.24), ch = Math.max(3, Math.round(L * 0.075)), cy1 = Math.round(yTop(cx0) - D * 0.5);
  rect(cx0, cy1 - ch, cx1, cy1, C.k); rect(cx0 + 1, cy1 - ch + 1, cx1 - 1, cy1, C.tablaS); rect(cx0 + 1, cy1 - ch + 1, cx1 - 1, cy1 - ch + 1, C.tablaL);
  rect(cx0 - 1, cy1 - ch - 1, cx1 + 1, cy1 - ch, C.cascoL);
  for (const f of [0.3, 0.68]) { const wx = Math.round(cx0 + (cx1 - cx0) * f), ww = Math.max(1, Math.round(L * 0.015)); rect(wx - ww, cy1 - ch + 3, wx + ww, cy1 - 2, C.k); if (ww > 1) pset(wx - ww + 1, cy1 - ch + 4, hex('#8ac0e0')); }
  for (let x = cx0 + 3; x < cx1 - 1; x += Math.max(3, Math.round(L * 0.03))) rect(x, cy1 - ch + 2, x, cy1, C.tabla);
  // los muñones de los dos palos (el mayor a popa, el trinquete a proa) con su zuncho y su cuña
  for (const f of [0.4, 0.73]) { const px = Math.round(x0 + L * f), pw = Math.max(1, Math.round(L * 0.018)), pt = Math.round(yTop(px) - D * 0.5 - L * 0.2);
    rect(px - pw - 1, pt, px + pw + 1, Math.round(yTop(px) - D * 0.5), C.k); rect(px - pw, pt + 1, px + pw, Math.round(yTop(px) - D * 0.5), C.maderaS ?? C.tablaS);
    rect(px - pw, pt + 1, px - pw, Math.round(yTop(px) - D * 0.5), C.tabla); rect(px - pw - 1, pt + 3, px + pw + 1, pt + 3 + Math.max(0, pw - 1), hex('#4a4a52'));
    rect(px - pw - 2, Math.round(yTop(px) - D * 0.5), px + pw + 2, Math.round(yTop(px) - D * 0.5) + 1, C.tablaS); }
  // el brazolá de la escotilla en el centro
  const ex0 = Math.round(x0 + L * 0.56 - L * 0.07), ex1 = Math.round(x0 + L * 0.56 + L * 0.07), eb = Math.round(yTop((ex0 + ex1) / 2) - D * 0.35), ea = Math.max(2, Math.round(L * 0.03));
  rect(ex0 - 1, eb - ea - 1, ex1 + 1, eb, C.k); rect(ex0, eb - ea, ex1, eb - 1, C.tablaS); rect(ex0, eb - ea, ex1, eb - ea, C.tablaL);
  rect(ex0 + 1, eb - ea - 1, ex1 - 1, eb - ea - 1, hex('#0e0a08'));
  // el timón de popa (una ruedecita) y la proa con su roda
  { const rx = Math.round(x0 + L * 0.03), ry = Math.round(yTop(rx) - D - L * 0.03), rr = Math.max(1, Math.round(L * 0.025)); R.anillo(rx + 0.5, ry + 0.5, rr, C.maderaS ?? C.tablaS); pset(rx, ry, C.tablaS); if (rr > 2) for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4; linea(Math.round(rx - Math.cos(a) * rr), Math.round(ry - Math.sin(a) * rr), Math.round(rx + Math.cos(a) * rr), Math.round(ry + Math.sin(a) * rr), C.maderaS ?? C.tablaS); } rect(rx, ry, rx, Math.round(yTop(rx) - D), C.maderaS ?? C.tablaS); }
  return { esc: [ex0, ex1, eb - ea - 1], tapa: [(ex0 + ex1) / 2, eb - ea - 1 - Math.max(1, Math.round(L * 0.012))], cub: Math.round(yTop((ex0 + ex1) / 2)), largo: L };
}

// un taburete de laboratorio en primer plano (asiento redondo negro, pata cromada con su aro y la base de cinco patas),
// centrado en x con la base en yb
function e_taburete(R, x, yb) {
  const { rect, disco, linea, pset } = R;
  for (const d of [-14, -7, 7, 14]) linea(x, yb - 6, x + d, yb - 1, C.k);
  for (const d of [-13, -6, 6, 13]) linea(x, yb - 7, x + d, yb - 2, hex('#7a808a'));
  rect(x - 2, yb - 30, x + 2, yb - 6, C.k); rect(x - 1, yb - 30, x + 1, yb - 6, hex('#c4c8d0')); rect(x - 1, yb - 30, x - 1, yb - 6, C.blanco);
  rect(x - 11, yb - 16, x + 11, yb - 14, C.k); rect(x - 10, yb - 15, x + 10, yb - 15, hex('#a8aeb6'));
  for (let j = 0; j < 9; j++) { const w = Math.round(16 * Math.sqrt(1 - ((j - 4) / 5) ** 2)); rect(x - w, yb - 40 + j, x + w, yb - 40 + j, j < 2 ? hex('#4a4a56') : j > 6 ? hex('#16161c') : hex('#2a2a34')); }
  rect(x - 10, yb - 39, x - 2, yb - 39, hex('#5a5a68'));
}

// la mampara de seguridad de policarbonato (x0–x1, y0–y1) con su marco de aluminio y sus pies: transparente (un tinte
// muy suave), reflejos solo arriba (y0 … y0 + 40) y abajo, nunca a la altura de las caras
function e_mampara(R, t, x0, x1, y0, y1) {
  const { rect, linea, pset } = R, M = e_M;
  e_tinte(R, x0 + 2, y0 + 3, x1 - 2, y1 - 8, hex('#c8e4f0'), 0.13);
  for (const d of [4, 9]) linea(x0 + d, y0 + 40, x0 + d + 22, y0 + 4, e_mezcla(hex('#c8e4f0'), C.blanco, 0.5));
  { const u = (t * 0.12) % 1, xr = Math.round(x0 + 4 + u * (x1 - x0 - 30)); linea(xr, y0 + 30, xr + 14, y0 + 6, hex('#e4f2f8')); }
  for (let x = x0 + 6; x < x1 - 6; x += 7) pset(x, y1 - 12, hex('#e4f2f8'));
  rect(x0, y0, x0 + 1, y1, C.k); rect(x1 - 1, y0, x1, y1, C.k); rect(x0, y0, x1, y0 + 2, C.k);
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, M.aceroL); pset(x0 + 1, y0 + 3, M.aceroL);
  rect(x0 + 1, y1 - 7, x1 - 1, y1 - 6, M.acero); rect(x0 + 1, y1 - 7, x1 - 1, y1 - 7, M.aceroL);
  for (const x of [x0, x1]) { rect(x - 5, y1 - 1, x + 5, y1, C.k); rect(x - 4, y1 - 1, x + 4, y1 - 1, M.aceroS); }
  // la pegatina de aviso (rombo de la llama) en el marco de arriba
  e_picto(R, 'llama', x1 - 18, y0 + 6);
}

function e_uclFondo(R) {
  const { rect, pset, linea, disco, poligono } = R, U = e_U;
  // el techo de placas (tenue: queda bajo la barra del año) y la moldura
  rect(0, 0, 319, 12, U.techo); for (let x = 0; x < 320; x += 40) rect(x, 0, x, 12, U.techoJ); rect(0, 6, 319, 6, U.techoJ);
  for (let k = 0; k < 70; k++) pset(Math.floor(h(k, 1, 380) * 320), Math.floor(h(k, 2, 380) * 12), U.techoJ);
  rect(182, 0, 254, 6, U.techoJ); rect(183, 0, 253, 0, U.metalS); rect(184, 1, 252, 5, U.metalL);
  rect(0, 13, 319, 15, U.cornisa); rect(0, 13, 319, 13, U.paredL); rect(0, 15, 319, 15, U.paredS);
  // la pared pintada de verde crema con su estuco y el riel de colgar
  rect(0, 16, 319, 99, U.pared);
  for (let y = 16; y < 100; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 381); if (n > 0.94) pset(x, y, U.paredS); else if (n < 0.035) pset(x, y, U.paredL); }
  rect(0, 21, 319, 21, U.paredS); rect(0, 22, 319, 22, U.paredL);
  // el alicatado blanco de detrás de las poyatas con su canto de remate
  e_azulejos(R, 74, 68, 319, 98, 8, 6, U); rect(74, 66, 319, 67, U.azulejoS); rect(74, 66, 319, 66, U.azulejoL);
  // la canaleta de los enchufes y el tubo de gas amarillo con sus llaves de latón
  rect(74, 84, 319, 87, U.marcoS); rect(74, 84, 319, 84, U.marco); for (const x of [96, 156, 232, 300]) { rect(x, 84, x + 7, 87, C.blanco); pset(x + 2, 85, C.k); pset(x + 5, 85, C.k); }
  rect(74, 91, 319, 93, U.gas); rect(74, 91, 319, 91, U.gasL); rect(74, 93, 319, 93, e_mezcla(U.gas, C.k, 0.3));
  for (const x of [134, 196, 262]) { rect(x, 93, x + 2, 98, U.laton); rect(x + 2, 93, x + 2, 98, U.latonS); rect(x - 2, 94, x + 4, 95, U.latonS); pset(x - 2, 94, U.laton); }
  // los pictogramas sin letras, bajo la pizarra
  e_picto(R, 'llama', 88, 70); e_picto(R, 'gafas', 106, 70); e_picto(R, 'guantes', 122, 70);

  // la campana de gases (x 2–74): conducto al techo, la caja con la rejilla del ventilador y el manómetro, el interior
  // con su luz, el soporte con el matraz, los frascos, el cristal de guillotina a medio subir y el armario de abajo
  rect(4, 13, 16, 22, C.k); rect(5, 13, 15, 22, U.metal); rect(5, 13, 6, 22, U.metalL); rect(13, 13, 15, 22, U.metalS); rect(4, 17, 16, 17, U.metalS);
  rect(2, 22, 74, 128, C.k);
  rect(3, 23, 73, 35, U.campana); rect(3, 23, 73, 23, U.campanaL); rect(3, 34, 73, 35, U.campanaS);
  disco(15, 29, 5, C.k); disco(15, 29, 4, U.metalD); disco(60, 29, 4, C.k); disco(60, 29, 3, C.blanco); rect(57, 28, 59, 28, hex('#5ab85a'));
  rect(26, 26, 48, 32, U.campanaS); for (let x = 27; x < 48; x += 2) rect(x, 27, x, 31, U.campana);
  rect(3, 36, 73, 91, U.dentro); for (let y = 42; y < 90; y += 9) { rect(5, y, 71, y + 1, U.dentroS); rect(5, y, 71, y, C.blanco); }
  rect(3, 36, 73, 37, C.blanco);
  rect(10, 89, 28, 91, U.metalS); rect(13, 48, 14, 89, U.metal); rect(13, 48, 13, 89, U.metalL); rect(14, 62, 22, 64, U.metalS); rect(20, 61, 23, 65, U.metalD);
  disco(18, 86, 6, C.k); disco(18, 86, 5, hex('#c84a2a')); disco(18, 86, 3, hex('#e86a3a'));   // la manta calefactora
  e_frasco(R, 34, 90, 7, 'bote', hex('#9a5a1a')); e_frasco(R, 43, 90, 7, 'bote', hex('#3a7ab8'), hex('#c83a3a')); e_frasco(R, 54, 90, 9, 'matraz', hex('#8ad05a'));
  rect(63, 80, 69, 90, C.k); rect(64, 81, 68, 90, C.blanco); rect(65, 77, 66, 80, C.k); linea(66, 77, 70, 74, C.k);
  rect(2, 64, 74, 67, C.k); rect(3, 65, 73, 66, U.metalL); rect(28, 68, 46, 69, U.metalS);
  for (let y = 38; y < 64; y++) for (let x = 3 + (y % 3); x < 73; x += 3) pset(x, y, e_mezcla(R.pget(x, y), hex('#a8c8d8'), 0.35));
  for (const d of [8, 30]) { linea(d, 63, d + 18, 39, C.blanco); linea(d + 2, 63, d + 20, 39, e_mezcla(U.dentro, C.blanco, 0.6)); }
  rect(3, 92, 73, 96, hex('#c8ccc8')); rect(3, 92, 73, 92, C.blanco); rect(2, 97, 74, 99, U.metalL); rect(2, 99, 74, 99, U.metalS);
  rect(3, 100, 73, 125, U.campanaS); for (const x of [4, 39]) { rect(x, 101, x + 33, 124, U.campana); rect(x, 101, x + 33, 101, U.campanaL); rect(x + 33, 101, x + 33, 124, U.campanaS); rect(x + 15, 104, x + 18, 105, U.metalD); }
  e_picto(R, 'llama', 14, 108); rect(3, 125, 73, 127, U.metalD);

  // la pizarra blanca: marco de aluminio, las sombras de lo borrado y lo escrito sin letras (la molécula de palitos del
  // alcohol, el triángulo del fuego con sus tres iconos, la caja con cubos y la llama, flechas, 78° y 1701)
  rect(81, 23, 169, 66, C.k); rect(82, 24, 168, 65, U.aluminio); rect(84, 26, 166, 62, U.pizarra);
  for (let k = 0; k < 9; k++) { const x = 90 + Math.floor(h(k, 3, 383) * 70), y = 30 + Math.floor(h(k, 4, 383) * 28); for (let i = 0; i < 12; i++) pset(x + i, y + (i % 3 === 0 ? 1 : 0), U.pizarraS); }
  const az = hex('#2a4ab0'), rj = hex('#c8322a'), ng = hex('#2a2a34'), vd = hex('#2a8a4a');
  // la molécula: dos carbonos, el oxígeno rojo y los hidrógenos, con sus enlaces
  for (const [a, b] of [[[92, 38], [100, 34]], [[100, 34], [108, 38]], [[108, 38], [113, 34]], [[92, 38], [88, 34]], [[92, 38], [88, 42]], [[92, 38], [92, 44]], [[100, 34], [100, 29]], [[100, 34], [104, 30]], [[113, 34], [117, 36]]]) linea(a[0], a[1], b[0], b[1], ng);
  for (const [x, y, c] of [[92, 38, ng], [100, 34, ng], [108, 38, rj], [117, 36, ng]]) { disco(x, y, 1.6, c); }
  for (const [x, y] of [[88, 34], [88, 42], [92, 44], [100, 29], [104, 30]]) pset(x, y, ng);
  linea(120, 37, 128, 37, az); linea(126, 35, 128, 37, az); linea(126, 39, 128, 37, az);
  // el triángulo del fuego
  linea(132, 46, 142, 30, rj); linea(142, 30, 152, 46, rj); linea(132, 46, 152, 46, rj);
  rect(140, 37, 143, 41, rj); pset(141, 36, rj); pset(142, 35, rj);   // la llama dentro
  rect(130, 48, 134, 51, az); rect(150, 49, 154, 51, ng); for (let i = 0; i < 4; i++) pset(140 + i, 27 - (i % 2), az);
  // la caja con cubos y la flecha de la llama
  rect(88, 50, 112, 60, ng); rect(89, 51, 111, 59, U.pizarra); for (const x of [92, 98, 104]) rect(x, 55, x + 3, 58, ng);
  linea(114, 55, 122, 55, rj); linea(120, 53, 122, 55, rj); linea(120, 57, 122, 55, rj);
  R.numero('78', 126, 60, { color: az, sombra: false, fina: true }); R.anillo(140, 53, 1.5, az);
  R.numero('1701', 146, 60, { color: ng, sombra: false, fina: true });
  rect(84, 63, 166, 64, U.aluminio); rect(84, 65, 166, 65, U.metalS);
  for (const [x, c] of [[96, az], [101, rj], [106, ng], [111, vd]]) { rect(x, 62, x + 3, 63, c); pset(x + 3, 62, C.blanco); }
  rect(150, 61, 158, 63, hex('#3a3a44')); rect(150, 61, 158, 61, hex('#6a6a74'));

  // la ventana de guillotina con Londres enfrente (el cielo y el edificio fijos; las nubes, la lluvia, el autobús y la
  // paloma se pintan en cada fotograma)
  rect(174, 20, 250, 88, C.k); rect(175, 21, 249, 87, U.marco); rect(175, 21, 249, 21, C.blanco); rect(248, 22, 249, 87, U.marcoS);
  R.recorte([178, 24, 246, 84]);
  for (let y = 24; y < 46; y++) for (let x = 178; x <= 246; x++) { const b = (y - 24) / 22 + (h(x, y, 384) - 0.5) * 0.25; pset(x, y, b < 0.33 ? U.cielo1 : b < 0.7 ? U.cielo2 : U.cielo3); }
  poligono([[178, 40], [190, 40], [190, 34], [200, 34], [200, 40], [246, 40], [246, 85], [178, 85]], U.ladrillo);
  for (let y = 41; y < 85; y++) for (let x = 178; x <= 246; x++) {
    const fila = Math.floor((y - 41) / 3), lx = (x + (fila % 2) * 3) % 6;
    if ((y - 41) % 3 === 0 || lx === 0) pset(x, y, U.mortero); else if (h(Math.floor((x + (fila % 2) * 3) / 6), fila, 385) > 0.8) pset(x, y, U.ladrilloS); else if (h(Math.floor((x + (fila % 2) * 3) / 6), fila, 386) > 0.88) pset(x, y, U.ladrilloL);
  }
  for (let y = 34; y < 41; y++) for (let x = 190; x < 200; x++) if ((y - 34) % 3 === 0 || (x + Math.floor((y - 34) / 3) * 3) % 6 === 0) pset(x, y, U.mortero);
  for (const x of [192, 196]) { R.poligono([[x - 1, 30], [x + 2, 30], [x + 2, 34], [x - 1, 34]], hex('#a8583a')); pset(x, 30, hex('#c8784a')); }
  R.poligono([[178, 40], [247, 40], [247, 42], [178, 42]], U.ladrilloL);
  for (const [x, y] of [[182, 46], [202, 46], [222, 46], [242, 46], [182, 62], [202, 62], [222, 62], [242, 62]]) {
    R.poligono([[x - 1, y - 1], [x + 11, y - 1], [x + 11, y + 12], [x - 1, y + 12]], U.mortero);
    R.poligono([[x, y], [x + 10, y], [x + 10, y + 11], [x, y + 11]], U.ventO);
    R.poligono([[x, y + 5], [x + 10, y + 5], [x + 10, y + 6], [x, y + 6]], U.mortero); R.poligono([[x + 5, y], [x + 6, y], [x + 6, y + 11], [x + 5, y + 11]], U.mortero);
  }
  R.poligono([[236, 41], [238, 41], [238, 85], [236, 85]], hex('#3a3a40'));
  R.poligono([[178, 76], [247, 76], [247, 85], [178, 85]], hex('#5a5048'));
  for (let x = 178; x < 247; x += 4) pset(x, 76, hex('#7a6a5a'));
  R.recorte(null);
  // los marcos, la barra de encuentro de las dos hojas, el alféizar con la cinta de la persiana
  rect(211, 24, 213, 84, U.marco); rect(213, 24, 213, 84, U.marcoS); rect(178, 52, 246, 55, U.marco); rect(178, 55, 246, 55, U.marcoS); rect(204, 52, 208, 53, U.latonS);
  rect(170, 86, 254, 90, C.k); rect(171, 86, 253, 88, U.marco); rect(171, 86, 253, 86, C.blanco); rect(171, 89, 253, 89, U.marcoS);
  // el reloj de pared (las agujas se mueven)
  disco(262, 34, 8, C.k); disco(262, 34, 7, U.marco); disco(262, 34, 6, C.blanco); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(262 + Math.cos(a) * 5), Math.round(34 + Math.sin(a) * 5), k % 3 ? U.marcoS : C.k); }
  // las baldas de frascos de colores con sus escuadras
  for (const [y, k0] of [[62, 0], [82, 7]]) {
    rect(256, y, 318, y + 2, C.k); rect(256, y, 318, y, U.maderaL); rect(256, y + 1, 318, y + 1, U.madera);
    for (const x of [262, 310]) { rect(x, y + 3, x + 1, y + 7, U.metalS); linea(x + 1, y + 7, x + 5, y + 3, U.metalS); }
    let x = 258; for (let k = 0; x < 314; k++) { const tipo = ['bote', 'bote', 'matraz', 'bote', 'redondo', 'bote', 'vaso'][(k + k0) % 7], w = tipo === 'bote' ? 5 + ((k + k0) % 2) : 8;
      e_frasco(R, x, y - 1, w, tipo, [hex('#9a5a1a'), hex('#3a7ab8'), hex('#c8a83a'), hex('#5a9a4a'), hex('#a83a5a'), hex('#e8e0d0'), hex('#6a4aa8')][(k * 3 + k0) % 7], [C.k, hex('#c83a3a'), hex('#2a6a3a')][k % 3]); x += w + 2; }
  }

  // la poyata del fondo: el tablero alicatado con su canto de teca y las puertas con sus pomos y el zócalo
  rect(74, 99, 319, 100, U.azulejo); for (let x = 74; x < 320; x += 6) pset(x, 99, U.junta); rect(74, 101, 319, 103, U.madera); rect(74, 101, 319, 101, U.maderaL); rect(74, 103, 319, 103, U.maderaS);
  rect(74, 104, 319, 125, U.maderaS);
  for (let x = 76; x < 318; x += 30) { rect(x, 105, x + 27, 124, U.madera); rect(x, 105, x + 27, 105, U.maderaL); rect(x + 27, 105, x + 27, 124, U.maderaD); rect(x + 3, 108, x + 24, 121, U.maderaS); rect(x + 4, 109, x + 23, 120, U.madera);
    for (let y = 110; y < 120; y += 3) for (let i = 5; i < 23; i += 4) if (h(x + i, y, 387) > 0.5) rect(x + i, y, x + i + 2, y, U.maderaL); disco(x + 24, 114, 1, U.laton); }
  rect(74, 125, 319, 128, U.maderaD); rect(74, 125, 319, 125, C.k);
  // lo de encima de la poyata: la gradilla de tubos, el agitador con su vaso, la pila con el grifo de cuello de cisne, la
  // balanza con su urna, los frascos, el paquete de folios, la radio y las gafas
  rect(80, 92, 98, 98, U.metalS); rect(80, 92, 98, 92, U.metalL); for (let k = 0; k < 5; k++) { const x = 82 + k * 3; rect(x, 84, x + 1, 95, C.blanco); rect(x, 84, x + 1, 84, [C.rojo, hex('#3a7ab8'), hex('#c8a83a'), hex('#5a9a4a'), C.k][k]); rect(x, 90, x + 1, 95, [hex('#c8a8e8'), hex('#a8d8e8'), hex('#f0e0a0'), hex('#c8e8a8'), hex('#e8c8c8')][k]); }
  rect(102, 92, 120, 98, C.k); rect(103, 93, 119, 97, C.blanco); rect(103, 93, 119, 93, U.metalL); disco(106, 96, 1, U.metalD); disco(116, 96, 1, U.metalD); rect(110, 95, 112, 96, hex('#3aa84a'));
  rect(104, 78, 118, 92, C.k); rect(105, 78, 117, 91, hex('#d8e8ee')); for (let y = 80; y < 90; y += 3) pset(117, y, C.k); pset(106, 79, C.blanco);
  rect(124, 96, 152, 99, U.metalL); rect(124, 96, 152, 96, C.blanco); rect(126, 97, 150, 98, U.metalS);
  rect(137, 74, 139, 96, U.metal); rect(137, 74, 137, 96, U.metalL); rect(137, 72, 146, 74, U.metal); rect(137, 72, 146, 72, U.metalL); rect(145, 74, 146, 77, U.metal); rect(140, 88, 143, 90, U.laton);
  rect(186, 88, 206, 98, C.k); rect(187, 89, 205, 97, hex('#e8e6e0')); rect(187, 89, 205, 89, C.blanco); rect(190, 92, 202, 95, hex('#1e2a1e'));
  rect(186, 70, 206, 87, C.k); rect(187, 71, 205, 87, hex('#d8e8ee')); rect(187, 71, 205, 71, C.blanco); pset(189, 73, C.blanco); pset(190, 74, C.blanco); rect(192, 84, 200, 86, U.metal); disco(196, 82, 2, C.blanco);
  e_frasco(R, 210, 98, 6, 'bote', hex('#9a5a1a')); e_frasco(R, 218, 98, 6, 'bote', hex('#e8e0d0'), hex('#3a7ab8')); e_frasco(R, 226, 98, 9, 'matraz', hex('#a8d8f0'));
  rect(238, 90, 254, 98, C.k); rect(239, 91, 253, 97, C.blanco); rect(239, 91, 253, 92, hex('#c8d8f0')); rect(241, 89, 251, 90, C.blanco); rect(240, 95, 252, 95, hex('#e8e8e0'));
  rect(260, 86, 284, 98, C.k); rect(261, 87, 283, 97, hex('#4a4a54')); rect(261, 87, 283, 87, hex('#6a6a78')); disco(266, 92, 3, hex('#2a2a30')); disco(266, 92, 1, hex('#6a6a78')); disco(278, 92, 3, hex('#2a2a30')); disco(278, 92, 1, hex('#6a6a78'));
  linea(282, 86, 290, 72, U.metalS); rect(296, 93, 312, 97, C.k); rect(297, 94, 302, 96, hex('#a8d8f0')); rect(306, 94, 311, 96, hex('#a8d8f0')); rect(303, 95, 305, 95, C.k);
  // el extintor en el suelo, contra el zócalo, con su manguera
  rect(288, 104, 298, 134, C.k); rect(289, 108, 297, 133, C.rojo); rect(289, 108, 290, 133, hex('#e86a6a')); rect(296, 108, 297, 133, C.rojoS); rect(289, 116, 297, 120, C.blanco);
  rect(291, 103, 295, 107, U.metalD); rect(290, 102, 296, 102, C.k); linea(296, 104, 300, 112, C.k); linea(300, 112, 299, 128, C.k);

  // el suelo de linóleo: las losetas en perspectiva con su moteado, la luz de la ventana y el brillo
  for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) {
    const n = h(x >> 1, y, 388); let c = n > 0.9 ? U.linoS : n < 0.07 ? U.linoL : U.lino;
    const xf = 160 + (x - 160) * (150 / (y - 70 + 1e-6)) * 0.9;
    if (Math.abs(((xf % 28) + 28) % 28) < 1.1 * (60 / (y - 70))) c = U.linoJ;
    const luz = y > 132 && x > 150 + (y - 129) * 0.9 && x < 236 + (y - 129) * 1.2;
    if (luz && (x + y) % 2 === 0) c = e_mezcla(c, U.luzV, 0.6);
    pset(x, y, c);
  }
  for (const y of [134, 142, 154, 170]) for (let x = 0; x < 320; x++) if (h(x, y, 389) > 0.08) pset(x, y, e_mezcla(R.pget(x, y), U.linoJ, 0.7));
  rect(0, 129, 73, 130, U.linoS); rect(74, 129, 319, 130, U.linoS);
  // lo del suelo: rozaduras, el sumidero, el cable del pulsador hasta el enchufe, la caja de cartón con cubos de papel
  // de repuesto y la papelera de pedal
  for (let k = 0; k < 14; k++) { const x = 20 + Math.floor(h(k, 1, 409) * 280), y = 134 + Math.floor(h(k, 2, 409) * 44); linea(x, y, x + 3 + (k % 4), y + (k % 2), U.linoS); }
  rect(150, 166, 166, 171, C.k); rect(151, 167, 165, 170, U.metalD); for (let x = 152; x < 165; x += 2) rect(x, 167, x, 170, C.k); pset(151, 167, U.metal);
  linea(92, 155, 80, 160, C.k); linea(80, 160, 76, 131, C.k); rect(74, 127, 79, 131, C.blanco); pset(76, 129, C.k); pset(78, 129, C.k);
  rect(258, 130, 284, 149, C.k); rect(259, 131, 283, 148, hex('#c89a5a')); rect(259, 131, 283, 133, hex('#e0b878')); rect(277, 134, 283, 148, hex('#a87a40'));
  linea(259, 131, 252, 126, C.k); linea(260, 131, 253, 127, hex('#e0b878')); linea(283, 131, 289, 125, C.k); linea(282, 131, 288, 126, hex('#c89a5a'));
  for (let k = 0; k < 4; k++) { rect(262 + k * 5, 126 - (k % 2), 266 + k * 5, 130 - (k % 2), C.k); rect(263 + k * 5, 127 - (k % 2), 265 + k * 5, 129 - (k % 2), C.blanco); }
  rect(264, 138, 276, 139, hex('#a87a40')); rect(268, 141, 272, 142, hex('#a87a40'));
  rect(298, 138, 316, 159, C.k); rect(299, 141, 315, 158, U.metal); rect(299, 141, 300, 158, U.metalL); rect(313, 141, 315, 158, U.metalS); for (let y = 145; y < 157; y += 3) rect(301, y, 312, y, U.metalS);
  rect(297, 137, 317, 140, C.k); rect(298, 138, 316, 139, U.metalL); rect(304, 158, 310, 159, C.k);

  // la poyata central: el tablero alicatado visto desde arriba, el canto de teca, las puertas y el zócalo; su sombra
  for (let x = 88; x < 228; x++) pset(x, 158, U.linoJ); for (let x = 90; x < 226; x += 2) pset(x, 159, U.linoJ);
  rect(92, 140, 222, 157, C.k);
  e_azulejos(R, 93, 141, 221, 144, 6, 4, U, 1);
  rect(93, 145, 221, 147, U.madera); rect(93, 145, 221, 145, U.maderaL); rect(93, 147, 221, 147, U.maderaS);
  rect(93, 148, 221, 155, U.maderaS);
  for (let x = 95; x < 220; x += 32) { rect(x, 149, x + 29, 154, U.madera); rect(x, 149, x + 29, 149, U.maderaL); rect(x + 29, 149, x + 29, 154, U.maderaD); for (let i = 2; i < 28; i += 5) if (h(x + i, 151, 391) > 0.4) rect(x + i, 151, x + i + 3, 151, U.maderaL); rect(x + 13, 151, x + 16, 152, U.laton); }
  rect(93, 156, 221, 157, U.maderaD);
  // el pulsador de la chispa con sus cables (rojo y negro) hasta la caja; el cronómetro (la aguja va aparte)
  rect(94, 134, 104, 140, C.k); rect(95, 135, 103, 140, hex('#e8e0c8')); rect(95, 135, 103, 135, C.blanco); disco(99, 136.5, 2, C.k); disco(99, 136.5, 1.3, C.rojo);
  linea(104, 138, 107, 132, C.rojo); linea(104, 139, 107, 133, C.k);
  disco(216, 137, 4.5, C.k); disco(216, 137, 3.6, hex('#e8e8e0')); rect(215, 131, 217, 132, U.metalS); pset(216, 130, U.metalS);
  // la maqueta de la bodega: la base, los postes, el tablero de arriba con la boca de la escotilla, el fondo de tablas
  // oscuras, las tres filas de cubos de papel, la bombona de butano con su tubo y los electrodos; el metacrilato con sus
  // reflejos y los tornillos
  rect(108, 109, 208, 141, C.k);
  rect(111, 117, 205, 136, U.fondoCaja); for (let x = 113; x < 205; x += 7) { rect(x, 117, x, 136, U.fondoCajaS); rect(x + 1, 117, x + 1, 136, U.fondoCajaL); }
  for (let k = 0; k < 30; k++) pset(112 + Math.floor(h(k, 1, 392) * 92), 118 + Math.floor(h(k, 2, 392) * 17), U.fondoCajaS);
  rect(111, 133, 205, 136, U.fondoCajaL); for (let x = 111; x < 206; x += 9) pset(x, 134, U.fondoCajaS);
  e_cubos(R, 128, 205, 125, 4, 0.8); e_cubos(R, 126, 205, 130, 5, 0.9); e_cubos(R, 124, 205, 136, 6, 1);
  rect(113, 121, 121, 136, C.k); rect(114, 123, 120, 135, U.bombona); rect(114, 123, 115, 135, U.bombonaL); rect(119, 123, 120, 135, U.bombonaS); rect(114, 127, 120, 129, U.naranja);
  rect(115, 119, 119, 122, U.metal); rect(116, 118, 118, 118, U.metalD); linea(119, 119, 123, 117, C.k); linea(123, 117, 124, 122, C.k); rect(123, 122, 125, 123, U.metalD);
  linea(110, 128, 116, 128, C.rojo); linea(110, 130, 116, 130, C.k);
  rect(108, 136, 208, 141, U.madera); rect(108, 136, 208, 136, U.maderaL); rect(108, 141, 208, 141, U.maderaS); for (let x = 112; x < 206; x += 14) rect(x, 138, x + 6, 138, U.maderaL);
  rect(108, 109, 208, 116, U.madera); rect(108, 109, 208, 110, U.maderaL); rect(108, 116, 208, 116, U.maderaS); for (let x = 112; x < 206; x += 11) rect(x, 113, x + 5, 113, U.maderaL);
  rect(150, 109, 166, 112, C.k); rect(151, 110, 165, 111, hex('#1a1210'));
  for (const x of [108, 206]) { rect(x, 109, x + 2, 141, U.madera); rect(x, 109, x, 141, U.maderaL); rect(x + 2, 109, x + 2, 141, U.maderaS); }
  for (let y = 117; y <= 132; y++) for (let x = 111; x <= 205; x++) if ((x + y) % 4 === 0) pset(x, y, e_mezcla(R.pget(x, y), U.perspex, 0.25));
  for (const d of [118, 124, 170]) { linea(d, 134, d + 14, 118, e_mezcla(U.perspex, C.blanco, 0.4)); if (d !== 124) linea(d + 2, 134, d + 16, 118, e_mezcla(U.perspex, U.fondoCaja, 0.5)); }
  rect(111, 117, 205, 117, U.perspex);
  for (const [x, y] of [[109, 111], [207, 111], [109, 139], [207, 139]]) pset(x, y, U.laton);
}

// unas filas de cubos de papel blancos (cara, tapa clara y costado en sombra) de lado l, de x0 a x1, apoyados en yb; k
// aclara los del fondo
function e_cubos(R, x0, x1, yb, l, k = 1) {
  const U = e_U, cara = e_mezcla(U.cuboS, U.cubo, k);
  for (let x = x0; x + l + 1 <= x1; x += l + Math.max(2, Math.round(l * 0.6))) {
    R.rect(x, yb - l, x + l - 1, yb - 1, cara); R.rect(x, yb - l, x + l - 1, yb - l, U.cuboL); R.rect(x + l, yb - l + 1, x + l, yb - 1, U.cuboS);
    R.pset(x + l, yb - l, U.cuboS); R.rect(x, yb, x + l, yb, e_mezcla(U.fondoCajaS, C.k, 0.3));
    if (l >= 6) { R.pset(x + 1, yb - l + 1, U.cuboL); R.rect(x + l - 1, yb - l + 2, x + l - 1, yb - 2, e_mezcla(cara, U.cuboS, 0.4)); }
  }
}

// el UCL en 2006, plano general: lo que se mueve (y la tapa); devuelve dónde está la tapa
function e_uclVida(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, U = e_U;
  // el tubo fluorescente (parpadea a ratos) y su luz tramada
  { const on = !((t % 9.1) < 0.22 && Math.sin(t * 60) > 0); rect(186, 2, 250, 4, on ? C.blanco : U.metalS); if (on) for (let y = 7; y < 13; y++) for (let x = 184 - (y - 7); x <= 252 + (y - 7); x += 1) if ((x + y) % 4 === 0) pset(x, y, e_mezcla(U.techo, C.blanco, 0.5)); }
  // el ventilador de la campana, la aguja del manómetro y el matraz que borbotea (burbujas que suben)
  for (let k = 0; k < 3; k++) { const a = t * 9 + k * 2.09; linea(15, 29, Math.round(15 + Math.cos(a) * 3.5), Math.round(29 + Math.sin(a) * 3.5), U.metalL); }
  { const a = -2.3 + Math.sin(t * 1.3) * 0.15; linea(60, 29, Math.round(60 + Math.cos(a) * 3), Math.round(29 + Math.sin(a) * 3), C.rojo); }
  e_frasco(R, 12, 87, 12, 'redondo', hex('#c8a83a'));
  for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k / 4) % 1; pset(16 + ((k * 3) % 5), Math.round(84 - u * 6), C.blanco); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.35 + k / 3) % 1; pset(Math.round(18 + Math.sin(t * 2 + k) * 2), Math.round(70 - u * 20), e_mezcla(U.dentro, C.blanco, 1 - u)); }
  // la ventana: nubes de tres tonos a tres velocidades (solo sobre el cielo), las ventanas de enfrente que se encienden,
  // el autobús rojo que pasa, la lluvia y las gotas que resbalan por el cristal, la paloma en el alféizar
  const esCielo = (p) => p === U.cielo1 || p === U.cielo2 || p === U.cielo3;
  R.recorte([178, 24, 246, 84]);
  for (const [x0, y, w, v] of [[0, 30, 14, 1.2], [40, 36, 10, 2.1], [70, 27, 18, 0.7]]) e_nubeGris(R, 170 + ((x0 + t * v) % 100), y, w, esCielo, U);
  for (const [x, y, k] of [[202, 46, 0], [222, 62, 1], [182, 62, 2], [242, 46, 3]]) { const on = ((t * 0.13 + k * 0.37) % 1) < (k === 1 ? 0.8 : 0.45); if (on) { poligono([[x, y], [x + 5, y], [x + 5, y + 5], [x, y + 5]], U.ventL); poligono([[x + 6, y], [x + 10, y], [x + 10, y + 5], [x + 6, y + 5]], e_mezcla(U.ventL, U.ventO, 0.3)); } }
  { const u = (t / 13) % 1, px = Math.round(252 - u * 84), pie = Math.floor(t * 5) % 2, py = 84;
    linea(px - 1, py - 1, px - 1 + pie, py, C.k); linea(px + 1, py - 1, px + 1 - pie, py, C.k);
    poligono([[px - 2, py - 7], [px + 2, py - 7], [px + 2, py - 1], [px - 2, py - 1]], hex('#3a4a6a')); pset(px, py - 8, hex('#d8a888'));
    linea(px, py - 9, px, py - 12, C.k); poligono([[px - 6, py - 11], [px, py - 14], [px + 6, py - 11]], hex('#2a2a34')); linea(px - 6, py - 11, px + 6, py - 11, hex('#4a4a5a')); }
  { const u = ((t + 2) / 10) % 1, bx = Math.round(150 + u * 140); if (Math.floor((t + 2) / 10) % 2 === 0) {
      poligono([[bx, 72], [bx + 46, 72], [bx + 47, 74], [bx + 47, 85], [bx - 1, 85], [bx - 1, 74]], U.bus);
      poligono([[bx, 72], [bx + 46, 72], [bx + 46, 73], [bx, 73]], U.busL);
      for (let x = bx + 2; x < bx + 44; x += 7) poligono([[x, 75], [x + 5, 75], [x + 5, 79], [x, 79]], hex('#2a3038'));
      for (let x = bx + 3; x < bx + 44; x += 7) pset(x, 76, hex('#8ab0c8'));
      poligono([[bx - 1, 81], [bx + 47, 81], [bx + 47, 82], [bx - 1, 82]], U.busS); } }
  for (let k = 0; k < 46; k++) { const x0 = 176 + Math.floor(h(k, 1, 393) * 80), v = 60 + h(k, 2, 393) * 40, y = ((h(k, 3, 393) * 70 + t * v) % 66) + 22, x = x0 - (y - 22) * 0.25;
    linea(Math.round(x), Math.round(y), Math.round(x - 1), Math.round(y + 3), e_mezcla(U.cielo3, C.blanco, 0.45)); }
  for (let k = 0; k < 7; k++) { const x = 180 + Math.floor(h(k, 4, 393) * 64), u = ((t * (0.05 + h(k, 5, 393) * 0.06) + h(k, 6, 393)) % 1), y = Math.round(25 + u * 58);
    pset(x, y, C.blanco); pset(x, y + 1, U.ventS); for (let i = 1; i < 5; i++) if ((x + y - i) % 2) pset(x, y - i, e_mezcla(U.cielo3, C.blanco, 0.3)); }
  { const pick = Math.sin(t * 3.1) > 0.7 ? 1 : 0, px = 228, py = 83;
    poligono([[px, py - 4], [px + 7, py - 4], [px + 8, py], [px - 1, py]], hex('#8a8e9a')); poligono([[px + 1, py - 3], [px + 6, py - 3], [px + 6, py - 2], [px + 1, py - 2]], hex('#a8acb8'));
    poligono([[px + 6, py - 7 + pick], [px + 9, py - 7 + pick], [px + 9, py - 4 + pick], [px + 6, py - 4 + pick]], hex('#7a7e8a')); pset(px + 9, py - 5 + pick, hex('#e8a83a')); pset(px + 8, py - 6 + pick, C.k);
    pset(px + 7, py - 4 + pick, hex('#5aa88a')); pset(px - 2, py - 3, hex('#5a5e6a')); pset(px - 3, py - 3, hex('#5a5e6a')); }
  R.recorte(null);
  rect(211, 24, 213, 84, U.marco); rect(213, 24, 213, 84, U.marcoS); rect(178, 52, 246, 55, U.marco); rect(178, 55, 246, 55, U.marcoS); rect(204, 52, 208, 53, U.latonS);
  // la cinta en el alféizar: una planta de cinta en su maceta que se mece y un vaso de precipitados con un pincel
  rect(232, 78, 242, 86, C.k); rect(233, 79, 241, 85, hex('#c8784a')); rect(233, 79, 241, 79, hex('#e0986a'));
  for (let k = 0; k < 7; k++) { const a = -2.6 + k * 0.35 + Math.sin(t * 1.4 + k) * 0.08, l = 8 + (k % 3) * 2; linea(237, 79, Math.round(237 + Math.cos(a) * l), Math.round(79 + Math.sin(a) * l * 0.8), k % 2 ? U.plantaL : U.planta); }
  // las agujas del reloj
  { const s = t * Math.PI * 2 / 60 - Math.PI / 2, m = -Math.PI / 2 + 0.9; linea(262, 34, Math.round(262 + Math.cos(m) * 4), Math.round(34 + Math.sin(m) * 4), C.k); linea(262, 34, Math.round(262 + Math.cos(-0.9) * 3), Math.round(34 + Math.sin(-0.9) * 3), C.k); linea(262, 34, Math.round(262 + Math.cos(s) * 5), Math.round(34 + Math.sin(s) * 5), C.rojo); }
  // el grifo que gotea en la pila y el remolino del vaso del agitador
  { const u = (t % 1.4) / 1.4; if (u < 0.75) pset(146, Math.round(78 + u * 24), hex('#8ac0e0')); else { pset(144, 95, hex('#8ac0e0')); pset(148, 95, hex('#8ac0e0')); } }
  for (let k = 0; k < 4; k++) { const a = t * 6 + k * 1.57; pset(Math.round(111 + Math.cos(a) * 4), 88 + (k % 2), hex('#8ac0e0')); } rect(109, 90, 113, 90, Math.floor(t * 8) % 2 ? C.blanco : U.metalS);
  // la radio: el ecualizador baila y el piloto parpadea
  for (let k = 0; k < 4; k++) { const al = 1 + Math.round(Math.abs(Math.sin(t * 7 + k * 1.3)) * 2); rect(269 + k * 2, 93 - al, 269 + k * 2, 93, hex('#5ad88a')); }
  pset(283, 88, Math.floor(t * 2) % 2 ? C.rojo : hex('#6a2a2a'));
  // la aguja del cronómetro
  { const a = t * Math.PI * 2 / 3 - Math.PI / 2; linea(216, 137, Math.round(216 + Math.cos(a) * 3), Math.round(137 + Math.sin(a) * 3), C.k); }
  // la llamarada (o.fuego): la chispa, el fuego azul, la luz en la poyata y en la sala, la tapa que salta, las motas
  const u = o.fuego ?? 0;
  if (u > 0.01 && u < 0.08) { for (let k = 0; k < 4; k++) pset(125 + Math.round(Math.cos(k * 1.7 + t * 30) * 2), 121 + Math.round(Math.sin(k * 1.7 + t * 30) * 2), C.oroL ?? C.blanco); pset(125, 121, C.blanco); }
  const a = e_llamarada(R, 111, 117, 205, 135, u, t, 1);
  if (a > 0) { e_halo(R, 158, 124, 90, 46, C.llamaL, 0.35 * a); e_tinte(R, 93, 141, 221, 147, C.llamaL, 0.3 * a); }
  if (u > 0.5 && u < 1) for (let k = 0; k < 10; k++) { const v = (u - 0.5) / 0.5, x = 115 + Math.floor(h(k, 7, 394) * 88), y = Math.round(134 - v * (8 + h(k, 8, 394) * 12)); if (h(k, 9, 394) > v) pset(x, y, (k + Math.floor(t * 6)) % 3 ? C.llama : C.llamaL); }
  const j = u > 0.15 && u < 0.5 ? Math.sin(Math.PI * (u - 0.15) / 0.35) : 0, ty = 108 - Math.round(j * 6), ang = j * 0.25;
  e_tapa(R, 158, ty, 18, 3, ang);
  if (j > 0.05) for (let k = 0; k < 6; k++) pset(150 + k * 3, 108 - Math.round(j * 3) - (k % 2), C.llamaL);
  return [158, ty];
}
function e_cajaFondo(R) {
  const { rect, pset, linea, disco, poligono } = R, U = e_U;
  // detrás, desenfocado: la pared alicatada (piezas grandes, juntas suaves), la balda con frascos borrosos y el borde de
  // la ventana; arriba pared pintada tranquila (bajo el año y Atom)
  rect(0, 0, 319, 179, U.pared);
  for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y >> 2, 395); if (n > 0.95) pset(x, y, U.paredS); else if (n < 0.03) pset(x, y, U.paredL); }
  for (let y = 24; y < 60; y++) for (let x = 0; x < 320; x++) { const lx = x % 22, ly = (y - 24) % 14; pset(x, y, lx === 0 || ly === 0 ? e_mezcla(U.junta, U.azulejo, 0.5) : h(Math.floor(x / 22), Math.floor((y - 24) / 14), 396) > 0.8 ? U.azulejoS : U.azulejo); }
  rect(0, 22, 319, 23, U.azulejoS);
  for (let y = 60; y < 118; y++) for (let x = 0; x < 320; x++) { const lx = x % 22, ly = (y - 24) % 14; pset(x, y, lx === 0 || ly === 0 ? e_mezcla(U.junta, U.azulejo, 0.5) : U.azulejo); }
  for (let y = 80; y < 84; y++) for (let x = 0; x < 320; x++) pset(x, y, e_mezcla(U.gas, U.azulejo, y === 80 || y === 83 ? 0.5 : 0.1));
  for (let y = 118; y < 160; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 123 ? e_mezcla(U.maderaL, U.azulejo, 0.3) : ((x % 46) < 2 || y > 154) ? e_mezcla(U.maderaD, U.madera, 0.4) : e_mezcla(U.madera, U.maderaL, ((x >> 3) + (y >> 3)) % 5 === 0 ? 0.3 : 0.1));
  for (let y = 24; y < 118; y++) for (let x = 0; x < 34; x++) pset(x, y, y < 40 ? e_mezcla(U.campana, U.campanaL, 0.4) : y < 96 ? e_mezcla(U.dentro, hex('#a8c8d8'), (x + y) % 3 === 0 ? 0.35 : 0.15) : e_mezcla(U.campanaS, U.campana, 0.5));
  for (let y = 41; y < 96; y++) pset(Math.round(4 + (95 - y) * 0.3), y, e_mezcla(U.dentro, C.blanco, 0.5));
  for (let y = 98; y < 152; y++) for (let x = 296; x < 306; x++) { const d = Math.abs(x - 301) / 5; pset(x, y, e_mezcla(C.rojo, U.madera, y < 104 ? 0.6 : d * 0.5)); }
  for (let y = 108; y < 116; y++) for (let x = 296; x < 306; x++) pset(x, y, e_mezcla(C.blanco, C.rojo, 0.3));
  // la ventana borrosa a la izquierda (gris de lluvia, con su marco) y la balda con frascos desenfocados a la derecha
  rect(0, 24, 30, 48, e_mezcla(U.cielo2, U.marco, 0.2)); rect(31, 24, 34, 48, U.marco); rect(0, 35, 30, 37, U.marco); rect(0, 24, 30, 26, U.marco);
  rect(196, 40, 270, 42, U.maderaL); rect(196, 43, 270, 44, U.maderaS);
  let x = 200; for (let k = 0; x < 260; k++) { const w = 7 + (k % 3) * 3, al = 10 + (k * 7) % 9, c = [hex('#9a5a1a'), hex('#3a7ab8'), hex('#c8a83a'), hex('#5a9a4a'), hex('#a83a5a'), hex('#e8e0d0')][k % 6];
    for (let j = 0; j < al; j++) for (let i = 0; i < w; i++) { const b = Math.min(i, w - 1 - i, j, al - 1 - j); if (b < 0) continue; pset(x + i, 39 - j, e_mezcla(c, U.azulejo, b === 0 ? 0.55 : 0.2)); }
    x += w + 3; }
  // en la pared desenfocada, encima de la caja: el reloj (las agujas van aparte) y el tablón de corcho con hojas y chinchetas
  e_relojBorroso(R, 104, 37, 9, U.azulejo, U.metalS);
  rect(122, 26, 190, 47, e_mezcla(U.azulejo, U.maderaS, 0.55)); rect(123, 27, 189, 46, e_mezcla(U.azulejo, hex('#c8986a'), 0.7));
  for (let y = 28; y < 46; y++) for (let x = 124; x < 189; x++) if (h(x, y, 422) > 0.8) pset(x, y, e_mezcla(U.azulejo, hex('#a87a4e'), 0.6));
  for (const [x, y, w, al, c] of [[126, 29, 13, 15, '#f4f2ec'], [142, 31, 11, 9, '#f0e8a8'], [156, 28, 15, 12, '#f4f2ec'], [174, 32, 12, 12, '#c8e0f0']]) {
    rect(x + 1, y + 1, x + w + 1, y + al + 1, e_mezcla(U.azulejo, hex('#8a6a48'), 0.6)); rect(x, y, x + w, y + al, e_mezcla(U.azulejo, hex(c), 0.85));
    for (let yy = y + 3; yy < y + al - 1; yy += 2) rect(x + 2, yy, x + w - 2 - ((yy * 3) % 4), yy, e_mezcla(hex(c), hex('#8a94a8'), 0.45));
    pset(x + Math.round(w / 2), y + 1, [C.rojo, hex('#3a7ab8'), hex('#3a9a4a'), C.rojo][(x >> 3) % 4]); }
  // el tablero de la poyata (alicatado blanco visto casi de canto) y su canto de teca
  rect(0, 160, 319, 179, U.azulejo);
  for (let y = 160; y < 180; y++) { const fila = Math.floor((y - 160) / ((y - 156) * 0.5 + 2)); for (let x = 0; x < 320; x++) { const xf = 160 + (x - 160) / (1 + (y - 160) * 0.02); if (((xf % 20) + 20) % 20 < 1) pset(x, y, U.junta); } }
  for (const y of [163, 168, 175]) rect(0, y, 319, y, U.junta);
  for (let k = 0; k < 40; k++) pset(Math.floor(h(k, 1, 397) * 320), 160 + Math.floor(h(k, 2, 397) * 20), U.azulejoL);
  // las gafas de seguridad y el cuaderno de renglones (sin letras) delante, a la izquierda
  poligono([[6, 168], [44, 164], [48, 179], [4, 179]], C.k); poligono([[7, 169], [43, 165], [46, 179], [6, 179]], hex('#f4f0e4'));
  for (let y = 170; y < 179; y += 2) linea(8, y + 1, 44, y - 2, hex('#a8c0d8')); linea(14, 168, 15, 179, hex('#d86a6a'));
  rect(56, 166, 82, 172, C.k); rect(57, 167, 68, 171, hex('#c8e4f0')); rect(70, 167, 81, 171, hex('#c8e4f0')); rect(68, 168, 70, 169, C.k); pset(58, 167, C.blanco); pset(71, 167, C.blanco); linea(82, 169, 92, 172, C.k);
  // una caja de cerillas medio abierta, con sus cerillas sueltas, y el vaso de precipitados con agua y la regla de
  // madera, en los huecos libres de la poyata
  poligono([[100, 170], [120, 168], [122, 175], [102, 177]], e_mezcla(U.azulejo, C.k, 0.25));
  poligono([[100, 168], [118, 166], [120, 172], [102, 174]], C.k); poligono([[101, 168], [117, 166], [119, 171], [103, 173]], hex('#e8c040'));
  linea(101, 168, 117, 166, hex('#f4dc70')); linea(103, 173, 119, 171, hex('#7a4a2a')); rect(106, 168, 112, 170, C.rojo); pset(109, 169, C.blanco);
  poligono([[112, 165], [124, 163], [126, 168], [114, 170]], C.k); poligono([[113, 165], [123, 164], [125, 167], [114, 169]], hex('#e8dcc0'));
  for (let k = 0; k < 4; k++) { linea(115 + k * 2, 168 - Math.round(k * 0.3), 117 + k * 2, 164 - Math.round(k * 0.3), hex('#c8a060')); pset(117 + k * 2, 164 - Math.round(k * 0.3), hex('#c83a2a')); }
  linea(126, 174, 134, 171, hex('#c8a060')); pset(134, 171, hex('#c83a2a')); linea(128, 177, 135, 176, hex('#c8a060')); pset(135, 176, hex('#5a3a2a'));
  rect(196, 163, 209, 177, C.k); rect(197, 164, 208, 176, e_mezcla(U.azulejo, U.perspex, 0.4)); rect(197, 169, 208, 176, e_mezcla(U.perspex, hex('#6ab0d8'), 0.5)); rect(197, 169, 208, 169, hex('#d8f0fa'));
  rect(198, 164, 198, 175, C.blanco); rect(207, 165, 207, 175, e_mezcla(U.perspex, U.metalS, 0.5)); rect(195, 163, 196, 164, C.k); for (let y = 166; y < 176; y += 3) pset(205, y, U.metalS);
  rect(196, 177, 210, 177, e_mezcla(U.azulejo, C.k, 0.2));
  poligono([[214, 176], [238, 169], [240, 172], [216, 179]], C.k); poligono([[215, 176], [238, 170], [239, 171], [216, 178]], hex('#d8b070'));
  for (let k = 0; k < 6; k++) pset(218 + k * 4, 176 - k, hex('#7a5a30'));
  // el cronómetro (la aguja va aparte)
  disco(262, 168, 9, C.k); disco(262, 168, 8, U.metalL); disco(262, 168, 7, C.blanco); rect(260, 156, 264, 159, U.metalS); rect(261, 155, 263, 155, C.k);
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(262 + Math.cos(a) * 6), Math.round(168 + Math.sin(a) * 6), C.k); }
  // la caja: el marco de madera, el tablero de arriba (con la boca de la escotilla), el suelo de tablas en perspectiva,
  // el fondo de tablas oscuras
  rect(36, 50, 284, 160, C.k);
  rect(42, 62, 278, 150, U.fondoCaja);
  for (let x = 44; x < 278; x += 16) { rect(x, 62, x, 150, U.fondoCajaS); rect(x + 1, 62, x + 1, 150, U.fondoCajaL); for (let y = 64; y < 148; y += 5) if (h(x, y, 398) > 0.55) rect(x + 4, y, x + 4, y + 3, U.fondoCajaS); }
  for (let y = 62; y < 70; y++) for (let x = 42; x < 278; x++) if ((x + y) % 2 === 0) pset(x, y, U.fondoCajaS);
  poligono([[42, 120], [278, 120], [278, 151], [42, 151]], (x, y) => { const xf = 160 + (x - 160) * (36 / (y - 110)); return (((xf % 14) + 14) % 14) < 0.9 ? U.fondoCajaS : y < 124 ? U.fondoCajaS : y > 146 ? U.fondoCajaL : e_mezcla(U.fondoCaja, U.fondoCajaL, 0.5); });
  rect(36, 50, 284, 61, U.madera); rect(36, 50, 284, 52, U.maderaL); rect(36, 60, 284, 61, U.maderaS); for (let x = 40; x < 282; x += 19) rect(x, 55, x + 10, 55, U.maderaL); for (let x = 46; x < 282; x += 23) rect(x, 57, x + 6, 57, U.maderaS);
  rect(140, 50, 180, 54, C.k); rect(141, 50, 179, 53, hex('#120c0a'));
  rect(36, 151, 284, 160, U.madera); rect(36, 151, 284, 151, U.maderaL); rect(36, 160, 284, 160, U.maderaS); for (let x = 40; x < 282; x += 17) rect(x, 155, x + 9, 155, U.maderaL);
  for (const x of [36, 278]) { rect(x, 50, x + 6, 160, U.madera); rect(x, 50, x + 1, 160, U.maderaL); rect(x + 5, 50, x + 6, 160, U.maderaS); for (let y = 66; y < 150; y += 9) pset(x + 3, y, U.maderaS); }
  // tres filas de cubos de papel, en perspectiva
  // la luz de la sala que entra por arriba y la penumbra de las esquinas del fondo de la caja
  e_tinte(R, 42, 62, 277, 150, C.k, 0.32, (x, y) => { const ex = Math.min(x - 42, 277 - x) / 40; return Math.max(0, 1 - ex) * (0.6 + 0.4 * (y - 62) / 88); });
  e_tinte(R, 60, 62, 260, 96, U.fondoCajaL, 0.35, (x, y) => (1 - (y - 62) / 34) * (1 - Math.abs(x - 160) / 100));
  // la regla de acero y el termómetro colgados del fondo de la caja
  e_reglaCaja(R, 92, 262, 66);
  rect(264, 70, 270, 112, C.k); rect(265, 71, 269, 111, hex('#e8f0f4')); disco(267, 113, 3.4, C.k); disco(267, 113, 2.5, C.rojo); rect(267, 92, 267, 112, C.rojo); rect(268, 72, 268, 110, C.blanco);
  for (let y = 74; y < 110; y += 4) pset(265, y, C.k); rect(265, 68, 269, 70, U.laton); linea(267, 62, 267, 68, U.latonS);
  // tres filas de cubos de papel en relieve, en perspectiva
  e_cubos3d(R, 96, 226, 116, 8, 0.75); e_cubos3d(R, 88, 236, 132, 11, 0.88); e_cubos3d(R, 80, 244, 150, 15, 1);
  // la bombona de butano con su válvula, el tubo y la boquilla; los dos electrodos de la chispa
  rect(44, 104, 66, 150, C.k); rect(45, 108, 65, 149, U.bombona); rect(45, 108, 48, 149, U.bombonaL); rect(61, 108, 65, 149, U.bombonaS); rect(45, 120, 65, 128, U.naranja); rect(45, 120, 65, 120, hex('#f0a060'));
  for (let y = 108; y < 149; y += 4) pset(50, y, U.bombonaL);
  rect(50, 98, 60, 107, C.k); rect(51, 99, 59, 107, U.metal); rect(51, 99, 52, 107, U.metalL); rect(53, 95, 57, 98, U.metalD); rect(58, 101, 66, 103, U.metalS);
  linea(66, 102, 74, 98, C.k); linea(74, 98, 78, 104, C.k); linea(66, 103, 74, 99, hex('#3a3a40')); rect(76, 104, 80, 107, U.metalD); rect(80, 105, 82, 106, U.metal);
  linea(42, 110, 80, 110, C.rojo); linea(42, 113, 80, 112, C.k); rect(80, 109, 81, 113, U.metalL);
  // el metacrilato: velo muy suave, reflejos, arañazos y tornillos de latón
  for (let y = 62; y < 151; y++) for (let x = 42 + (y % 3); x < 278; x += 3) pset(x, y, e_mezcla(R.pget(x, y), U.perspex, 0.18));
  for (const [d, g] of [[60, 3], [80, 1], [200, 2], [236, 1]]) for (let i = 0; i < g; i++) linea(d + i, 150, d + i + 50, 62, e_mezcla(U.perspex, C.blanco, 0.35));
  for (let k = 0; k < 6; k++) { const x = 90 + Math.floor(h(k, 1, 399) * 160), y = 70 + Math.floor(h(k, 2, 399) * 70); linea(x, y, x + 4, y - 1, e_mezcla(U.perspex, C.blanco, 0.2)); }
  for (const [x, y] of [[39, 53], [281, 53], [39, 157], [281, 157], [160, 157], [160, 53]]) { disco(x, y, 1.5, U.latonS); pset(x, y, U.laton); }
}
function e_cajaVida(R, t, o) {
  const { rect, pset, linea } = R, U = e_U;
  // la lluvia en el borde de la ventana borrosa y el cronómetro que corre
  R.recorte([0, 27, 30, 34]); for (let k = 0; k < 6; k++) { const y = 27 + ((t * 30 + k * 7) % 8), x = (k * 5 + Math.floor(t * 3)) % 30; pset(x, Math.floor(y), e_mezcla(U.cielo3, C.blanco, 0.5)); } R.recorte(null);
  R.recorte([0, 38, 30, 48]); for (let k = 0; k < 6; k++) { const y = 38 + ((t * 30 + k * 5) % 10), x = (k * 7 + Math.floor(t * 3)) % 30; pset(x, Math.floor(y), e_mezcla(U.cielo3, C.blanco, 0.5)); } R.recorte(null);
  { const a = t * Math.PI * 2 / 2 - Math.PI / 2; linea(262, 168, Math.round(262 + Math.cos(a) * 6), Math.round(168 + Math.sin(a) * 6), C.rojo); pset(262, 168, C.k); }
  // el segundero del reloj de la pared y los reflejos de los dos tubos del techo en el metacrilato (uno titila a ratos)
  e_agujas(R, 104, 37, 9, t, e_mezcla(U.azulejo, C.k, 0.6), e_mezcla(U.azulejo, C.rojo, 0.7));
  for (const [xa, xb, y, k] of [[66, 124, 64, 0], [176, 236, 63, 1]]) { const tit = k === 1 && (t % 6.3) < 0.5 && Math.sin(t * 45) > 0; const f = tit ? 0.12 : 0.4;
    for (let x = xa; x <= xb; x++) { pset(x, y, e_mezcla(R.pget(x, y), C.blanco, f)); if ((x & 1) === 0) pset(x, y + 1, e_mezcla(R.pget(x, y + 1), C.blanco, f * 0.6)); } }
  // una mota de polvo que flota en la luz dentro de la caja
  for (let k = 0; k < 3; k++) pset(Math.round(100 + k * 60 + Math.sin(t * 0.7 + k) * 8), Math.round(80 + Math.cos(t * 0.5 + k * 2) * 6), e_mezcla(U.fondoCaja, C.blanco, 0.4));
  // un brillo que recorre el metacrilato cada pocos segundos y una mosca que pasea por fuera (se va al arder)
  { const g = (t % 5.5) / 1.6; if (g < 1) { const xg = Math.round(30 + g * 260); for (let i = 0; i < 3; i++) linea(xg + i, 150, xg + i + 50, 62, e_mezcla(U.perspex, C.blanco, i === 1 ? 0.5 : 0.3)); } }
  if (!((o.fuego ?? 0) > 0.03 && (o.fuego ?? 0) < 0.95)) { const fx = Math.round(200 + Math.sin(t * 0.37) * 40 + Math.sin(t * 1.1) * 4), fy = Math.round(100 + Math.cos(t * 0.29) * 22), al = Math.floor(t * 20) % 2;
    R.rect(fx, fy, fx + 2, fy + 1, C.k); pset(fx + 3, fy, C.k); pset(fx - 1 + al, fy - 1, hex('#c8d8e8')); pset(fx + 1 + al, fy - 1, hex('#c8d8e8')); pset(fx, fy + 2, C.k); pset(fx + 2, fy + 2, C.k); }
  const u = o.fuego ?? 0;
  if (u > 0.01 && u < 0.09) { for (let k = 0; k < 6; k++) linea(81, 106, Math.round(81 + Math.cos(k * 1.1 + t * 40) * 4), Math.round(106 + Math.sin(k * 1.1 + t * 40) * 4), k % 2 ? C.blanco : hex('#fff0a0')); }
  const a = e_llamarada(R, 42, 62, 277, 150, u, t, 2.4);
  if (a > 0) { e_tinte(R, 0, 160, 319, 179, C.llamaL, 0.25 * a); e_tinte(R, 36, 50, 284, 61, C.llamaL, 0.3 * a); e_halo(R, 160, 56, 150, 40, C.llamaL, 0.3 * a); }
  if (u > 0.5 && u < 1) for (let k = 0; k < 26; k++) { const v = (u - 0.5) / 0.5, x = 50 + Math.floor(h(k, 7, 400) * 220), y = Math.round(146 - v * (20 + h(k, 8, 400) * 50) + Math.sin(t * 3 + k) * 2); if (h(k, 9, 400) > v) { pset(x, y, C.llamaL); if (k % 3 === 0) { pset(x + 1, y, C.llama); pset(x, y + 1, C.llama); } } }
  const j = u > 0.15 && u < 0.55 ? Math.sin(Math.PI * (u - 0.15) / 0.4) : 0, ty = 47 - Math.round(j * 14), ang = j * 0.3;
  if (j > 0.05) R.rect(140, 50, 180, 50, C.llamaL);
  e_tapa(R, 160, ty, 44, 6, ang);
  return [160, ty];
}
function e_manFondo(R) {
  const { rect, pset, linea, disco, poligono } = R, M = e_M;
  // el techo de instalaciones: oscuro, con la bandeja de cables, un conducto redondo y los soportes de las tiras LED
  rect(0, 0, 319, 15, M.techo); for (let y = 0; y < 16; y += 3) rect(0, y, 319, y, M.techoS);
  rect(0, 10, 319, 12, M.techoL); rect(0, 10, 319, 10, e_mezcla(M.techoL, C.blanco, 0.1)); for (let x = 4; x < 320; x += 12) rect(x, 11, x + 1, 12, M.techoS);
  rect(192, 0, 276, 8, M.techoS); for (const y of [3, 7]) { rect(196, y - 1, 272, y, C.k); }
  rect(0, 15, 319, 16, C.k);
  // la pared gris clara a la derecha y la de listones de roble en el centro (las pantallas van encima)
  rect(96, 17, 319, 99, M.pared);
  for (let y = 17; y < 100; y++) for (let x = 96; x < 320; x++) if (h(x >> 1, y >> 1, 401) > 0.95) pset(x, y, M.paredS);
  for (let x = 216; x < 320; x += 52) rect(x, 17, x, 99, M.paredS);
  for (let x = 100; x < 222; x++) { const lx = (x - 100) % 5; for (let y = 22; y < 99; y++) pset(x, y, lx === 4 ? M.hueco : lx === 0 ? M.listonL : h(x, y >> 3, 402) > 0.8 ? M.listonS : M.liston); }
  rect(100, 21, 221, 21, M.listonS); rect(100, 99, 221, 99, M.hueco);
  // el tabique de cristal a la izquierda: el pasillo blanco detrás (puertas, un tablón con hojas, luz), los montantes y
  // la banda de puntos
  rect(0, 17, 96, 128, M.pasillo);
  for (let y = 17; y < 128; y++) for (let x = 0; x < 96; x++) if (h(x >> 1, y >> 1, 403) > 0.94) pset(x, y, M.pasilloS);
  rect(0, 112, 96, 128, hex('#b4b8b4')); rect(0, 112, 96, 112, hex('#9aa09a'));
  rect(8, 46, 30, 111, hex('#8a9aa8')); rect(9, 47, 29, 111, hex('#a8b8c4')); rect(25, 78, 27, 80, M.aceroS); rect(9, 52, 29, 64, hex('#c8e0ec'));
  rect(44, 52, 70, 72, hex('#c8a878')); for (const [x, y, w] of [[46, 54, 8], [56, 55, 9], [47, 63, 7], [57, 64, 10], [66, 58, 3]]) { rect(x, y, x + w, y + 6, C.blanco); pset(x + 1, y, hex('#c83a3a')); }
  rect(80, 40, 94, 111, hex('#8a9aa8')); rect(81, 41, 93, 111, hex('#a8b8c4'));
  for (const x of [30, 70]) { rect(x - 8, 18, x + 8, 19, hex('#f8fcff')); }
  for (let y = 17; y < 128; y++) for (let x = 0; x < 96; x++) if ((x + y) % 3 === 0) pset(x, y, e_mezcla(R.pget(x, y), M.cristal, 0.35));
  for (const x of [0, 32, 64, 96]) { rect(x - 1, 17, x + 1, 128, M.marco); rect(x, 17, x, 128, e_mezcla(M.marco, C.blanco, 0.25)); }
  for (let x = 2; x < 96; x += 4) for (const y of [74, 77]) pset(x + (y === 77 ? 2 : 0), y, hex('#f4f8fa'));
  for (const d of [6, 40, 70]) { linea(d, 127, d + 26, 20, e_mezcla(M.cristal, C.blanco, 0.55)); }
  rect(0, 128, 96, 129, M.marco);
  // las dos pantallas (los marcos; lo que muestran va en cada fotograma) y el pictograma del área de ensayo
  for (const x0 of [104, 164]) { rect(x0 - 2, 28, x0 + 54, 64, C.k); rect(x0 - 1, 29, x0 + 53, 63, hex('#2a2c32')); rect(x0 + 24, 64, x0 + 28, 66, hex('#2a2c32')); }
  e_picto(R, 'llama', 226, 30); e_picto(R, 'gafas', 226, 48); e_picto(R, 'botiquin', 244, 48);
  // el brazo de extracción articulado: el anclaje en el techo, dos tramos plateados con sus juntas y la campana
  linea(206, 16, 200, 50, C.k); linea(207, 16, 201, 50, C.k); linea(208, 16, 202, 50, C.k); linea(205, 16, 199, 50, C.k);
  linea(206, 16, 200, 50, M.aceroL); linea(207, 16, 201, 50, M.acero);
  for (let k = 0; k < 6; k++) { const y = 20 + k * 5, x = Math.round(206 - (y - 16) * 6 / 34); rect(x - 1, y, x + 2, y, M.aceroS); }
  disco(201, 51, 3.5, C.k); disco(201, 51, 2.5, M.aceroS);
  linea(201, 51, 188, 68, C.k); linea(202, 52, 189, 69, C.k); linea(200, 51, 187, 68, C.k); linea(201, 52, 188, 69, M.acero); linea(200, 52, 187, 68, M.aceroL);
  for (let k = 1; k < 4; k++) { const x = Math.round(201 - k * 4), y = Math.round(51 + k * 17 / 4); pset(x, y, M.aceroS); pset(x + 1, y, M.aceroS); }
  poligono([[182, 68], [194, 68], [199, 79], [177, 79]], C.k); poligono([[183, 69], [193, 69], [197, 78], [179, 78]], M.acero); linea(183, 69, 179, 78, M.aceroL); rect(179, 78, 197, 78, M.aceroS);
  rect(208, 17, 216, 18, C.k);
  // las poyatas negras del fondo con sus cajoneras grises, y lo de encima: el portátil, el registrador de datos, la
  // garrafa de etanol, frascos, una caja de guantes
  rect(96, 99, 319, 103, M.negro); rect(96, 99, 319, 99, M.negroL); rect(96, 103, 319, 103, M.negroS);
  rect(96, 104, 319, 125, M.aceroS);
  for (let x = 98; x < 318; x += 22) for (const [y0, y1] of [[105, 111], [112, 118], [119, 124]]) { rect(x, y0, x + 20, y1, M.acero); rect(x, y0, x + 20, y0, M.aceroL); rect(x + 20, y0, x + 20, y1, M.aceroS); rect(x + 7, y0 + 2, x + 13, y0 + 2, M.negro); }
  rect(96, 125, 319, 128, M.negroS);
  rect(224, 86, 248, 98, C.k); rect(225, 87, 247, 97, hex('#3a3e48')); rect(226, 88, 246, 96, M.pantalla); rect(222, 97, 250, 98, M.acero); rect(222, 98, 250, 98, M.aceroS);
  rect(252, 90, 268, 98, C.k); rect(253, 91, 267, 97, hex('#e8eaee')); rect(253, 91, 267, 91, C.blanco);
  for (let k = 0; k < 6; k++) disco(255 + k * 2.4, 94, 0.6, k % 2 ? hex('#3a8a4a') : hex('#c84a2a'));
  linea(260, 97, 262, 99, C.k); linea(266, 97, 270, 102, hex('#c84a2a'));
  rect(272, 80, 284, 98, C.k); rect(273, 82, 283, 97, M.ambar); rect(273, 82, 274, 97, M.ambarL); rect(275, 77, 280, 81, C.k); rect(276, 78, 279, 80, hex('#2a6a3a')); rect(275, 86, 281, 90, C.blanco); rect(276, 87, 280, 87, hex('#c83a3a'));
  e_frasco(R, 288, 98, 6, 'bote', hex('#e8e0d0'), hex('#2a6a3a')); e_frasco(R, 296, 98, 9, 'matraz', hex('#a8d8f0'));
  rect(306, 90, 318, 98, C.k); rect(307, 91, 317, 97, hex('#3a6ac0')); rect(309, 90, 315, 91, hex('#c8d8f0'));
  rect(100, 90, 118, 98, C.k); rect(101, 91, 117, 97, hex('#e8eaee')); rect(103, 93, 115, 95, M.pantalla);
  e_frasco(R, 122, 98, 6, 'bote', hex('#3a7ab8')); e_frasco(R, 130, 98, 8, 'vaso', hex('#e8e0a8'));
  // el armario de inflamables amarillo con sus dos puertas, la rejilla, el rombo de la llama y el tirador
  rect(262, 62, 306, 128, C.k); rect(263, 63, 305, 127, M.amarillo); rect(263, 63, 305, 63, M.amarilloL); rect(304, 64, 305, 127, M.amarilloS); rect(284, 64, 284, 126, M.amarilloS); rect(285, 64, 285, 126, M.amarilloL);
  for (const x of [268, 289]) for (let y = 68; y < 74; y += 2) rect(x, y, x + 10, y, M.amarilloS);
  e_picto(R, 'llama', 266, 84); e_picto(R, 'llama', 288, 84); rect(281, 96, 282, 104, C.k); rect(287, 96, 288, 104, C.k);
  rect(263, 120, 305, 127, M.amarilloS); rect(262, 128, 306, 128, C.k);
  // el suelo de resina pulida: luz suave, reflejos verticales de lo de detrás y la cinta amarilla y negra del área
  for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c = h(x >> 2, y >> 1, 404) > 0.9 ? M.sueloS : M.suelo;
    if (y < 142 && x > 262 && x < 306 && (x + y) % 2) c = e_mezcla(c, M.amarillo, 0.35);
    if (y < 140 && x < 96 && (x + y) % 3 === 0) c = e_mezcla(c, M.pasillo, 0.4);
    if ((x > 176 && x < 274 && y < 150 && (x + y) % 3 === 0) || ((x + y) % 7 === 0 && h(x, y, 405) > 0.7)) c = M.sueloL;
    pset(x, y, c);
  }
  for (let x = 0; x < 320; x++) { pset(x, 129, M.sueloS); }
  // las juntas de dilatación de la resina, en perspectiva hacia el fondo, rozaduras de ruedas y la tapa de una arqueta
  for (let y = 131; y < 180; y++) for (let k = -6; k <= 6; k++) { const x = Math.round(160 + k * 30 * (y - 96) / 40); if (x >= 0 && x < 320 && (y & 1)) pset(x, y, e_mezcla(R.pget(x, y), M.sueloS, 0.55)); }
  for (const y of [138, 151, 169]) for (let x = 0; x < 320; x += 1) if ((x + y) % 3) pset(x, y, e_mezcla(R.pget(x, y), M.sueloS, 0.4));
  for (let k = 0; k < 10; k++) { const x = 10 + Math.floor(h(k, 1, 425) * 290), y = 133 + Math.floor(h(k, 2, 425) * 40); for (let i = 0; i < 8 + (k % 4) * 3; i++) pset(x + i, y + Math.round(Math.sin(i * 0.4 + k) * 0.8), e_mezcla(R.pget(x + i, y), M.sueloS, 0.5)); }
  rect(226, 168, 246, 173, e_mezcla(M.sueloS, C.k, 0.3)); rect(227, 169, 245, 172, M.aceroS); for (let x = 229; x < 245; x += 3) rect(x, 169, x, 172, e_mezcla(M.aceroS, C.k, 0.3)); rect(227, 169, 245, 169, M.acero);
  // el sumidero, la canaleta de cables de la cámara (amarilla y negra) y el contenedor de residuos con su pedal
  rect(40, 168, 56, 172, C.k); rect(41, 169, 55, 171, M.aceroS); for (let x = 42; x < 55; x += 2) rect(x, 169, x, 171, C.k);
  rect(270, 140, 286, 142, C.k); for (let x = 271; x < 286; x++) pset(x, 141, Math.floor(x / 3) % 2 ? M.amarillo : C.k);
  rect(296, 132, 316, 158, C.k); rect(297, 136, 315, 157, hex('#c8322a')); rect(297, 136, 298, 157, hex('#e05a48')); rect(313, 136, 315, 157, hex('#8e2018')); rect(296, 132, 316, 135, C.k); rect(297, 133, 315, 134, hex('#e8e8e8'));
  e_picto(R, 'guantes', 300, 142); rect(302, 157, 310, 158, M.aceroS);
  for (const [y, w] of [[164, 1], [175, 2]]) for (let x = 20; x < 300; x++) for (let i = 0; i < w; i++) pset(x, y + i, (Math.floor((x + (y + i)) / 4) % 2) ? M.amarillo : C.k);
  for (const x of [20, 299]) for (let y = 164; y < 177; y++) pset(x, y, (Math.floor(y / 3) % 2) ? M.amarillo : C.k);
  // la mesa de acero con tablero negro, las patas y la balda de abajo con la caja de cables; la sombra
  for (let x = 98; x < 218; x++) pset(x, 158, M.sueloS); for (let x = 100; x < 216; x += 2) pset(x, 159, M.sueloS);
  rect(100, 142, 214, 146, C.k); rect(101, 142, 213, 145, M.negro); rect(101, 142, 213, 142, M.negroL); rect(101, 145, 213, 145, M.negroS);
  for (const x of [103, 209]) { rect(x, 146, x + 2, 157, M.aceroS); rect(x, 146, x, 157, M.aceroL); }
  rect(103, 151, 211, 152, M.acero); rect(103, 151, 211, 151, M.aceroL); rect(150, 147, 170, 150, M.negroL); rect(151, 148, 169, 150, hex('#5a5e68'));
  linea(170, 149, 186, 157, C.k); linea(186, 157, 220, 157, C.k);
  // la placa calefactora: el cuerpo de aluminio, la pantalla con números, el mando; el tablero cerámico (su brasa va aparte)
  rect(124, 134, 192, 142, C.k); rect(125, 137, 191, 141, M.placa); rect(125, 137, 191, 137, C.blanco); rect(125, 141, 191, 141, M.placaS);
  rect(128, 138, 140, 140, M.pantalla); disco(184, 139, 1.6, C.k); disco(184, 139, 0.8, M.placaS);
  // el soporte del termómetro (base, varilla, nuez y pinza) y el termómetro de vidrio con su escala (la columna va aparte)
  rect(200, 140, 216, 141, M.aceroS); rect(200, 140, 216, 140, M.aceroL); rect(214, 72, 215, 140, M.acero); rect(214, 72, 214, 140, M.aceroL);
  rect(211, 88, 216, 90, C.k); rect(212, 88, 215, 89, M.aceroS);
  rect(206, 78, 212, 136, C.k); rect(207, 79, 211, 135, hex('#e8f0f4')); disco(209, 137.5, 3.2, C.k); disco(209, 137.5, 2.3, hex('#e8f0f4'));
  for (let y = 82; y < 132; y += 4) { pset(207, y, C.k); if (y % 8 === 2) pset(208, y, C.k); }
  rect(210, 80, 210, 134, C.blanco);
  // la cámara de alta velocidad en su trípode (la luz de grabar va aparte): las patas, la cabeza, el cuerpo negro con
  // el objetivo hacia la maqueta y la pantallita; el cable al suelo
  for (const [dx, c] of [[-14, C.k], [14, C.k], [3, C.k]]) linea(248, 116, 248 + dx, 157, c);
  for (const dx of [-13, 13]) linea(249, 116, 249 + dx, 157, M.aceroS);
  rect(246, 112, 251, 118, C.k); rect(247, 113, 250, 117, M.aceroS);
  rect(236, 100, 262, 112, C.k); rect(237, 101, 261, 111, hex('#2a2c32')); rect(237, 101, 261, 101, hex('#4a4e58')); rect(252, 103, 259, 109, hex('#1a2a3a'));
  rect(226, 102, 236, 110, C.k); rect(227, 103, 235, 109, hex('#3a3e48')); rect(225, 104, 226, 108, hex('#4a6a8a')); pset(225, 104, hex('#a8d0f0')); for (let x = 228; x < 235; x += 2) rect(x, 103, x, 109, hex('#2a2c32'));
  linea(262, 110, 268, 130, C.k); linea(268, 130, 266, 157, C.k);
}
// Mánchester en 2026, plano general: lo que se mueve
function e_manVida(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, M = e_M;
  const calor = o.calor ?? 0, e = o.estalla ?? 0, ch = o.chispa ?? 0;
  // las tiras de LED (con su resplandor tramado hacia abajo)
  for (const y of [3, 7]) { rect(197, y - 1, 271, y - 1, M.led); rect(197, y, 271, y, M.ledG); }
  for (let y = 9; y < 16; y++) for (let x = 192 - (y - 9) * 2; x <= 276 + (y - 9) * 2; x++) if ((x + y) % 3 === 0) pset(x, y, e_mezcla(R.pget(x, y), M.led, 0.3));
  // la gente que pasa por el pasillo, detrás del cristal (recortada a él y teñida)
  R.recorte([0, 17, 96, 127]);
  for (const [k, v, c] of [[0, 9, hex('#3a5a9a')], [1, 13, M.bata]]) { const u = ((t + k * 5.3) / v) % 1, dir = k ? -1 : 1, px = Math.round(dir > 0 ? -10 + u * 116 : 106 - u * 116); if (Math.floor((t + k * 5.3) / v) % 2) continue;
    const pie = Math.floor(t * 6 + k) % 2, y = 111;
    poligono([[px - 3, y - 18], [px + 3, y - 18], [px + 3, y - 6], [px - 3, y - 6]], e_mezcla(c, M.cristal, 0.3));
    poligono([[px - 2, y - 6], [px, y - 6], [px - 1 + pie, y], [px - 3 + pie, y]], e_mezcla(hex('#3a3a4a'), M.cristal, 0.3)); poligono([[px, y - 6], [px + 2, y - 6], [px + 2 - pie, y], [px - pie, y]], e_mezcla(hex('#3a3a4a'), M.cristal, 0.3));
    disco(px + 0.5, y - 22, 3.2, e_mezcla(hex('#e0b090'), M.cristal, 0.25)); poligono([[px - 3, y - 26], [px + 3, y - 26], [px + 3, y - 23], [px - 3, y - 23]], e_mezcla(k ? hex('#c8a040') : hex('#3a2a20'), M.cristal, 0.25)); }
  R.recorte(null);
  for (const x of [32, 64]) { rect(x - 1, 17, x + 1, 128, M.marco); rect(x, 17, x, 128, e_mezcla(M.marco, C.blanco, 0.25)); }
  for (let x = 2; x < 96; x += 4) for (const y of [74, 77]) pset(x + (y === 77 ? 2 : 0), y, hex('#f4f8fa'));
  for (const d of [6, 40, 70]) linea(d, 127, d + 26, 20, e_mezcla(M.cristal, C.blanco, 0.55));
  // las pantallas: la curva de temperatura (sube con el calor; una cifra con los grados) y la imagen de la cámara rápida
  // (la maqueta pequeña y, al estallar, el pico)
  const deg = Math.round((o.grados ?? [41, 77])[0] + ((o.grados ?? [41, 77])[1] - (o.grados ?? [41, 77])[0]) * calor);
  { const x0 = 104, y0 = 29; rect(x0, y0 + 1, x0 + 52, y0 + 33, M.pantalla); for (let x = x0 + 4; x < x0 + 52; x += 8) for (let y = y0 + 4; y < y0 + 32; y += 2) pset(x, y, M.pantallaG); for (let y = y0 + 8; y < y0 + 32; y += 8) for (let x = x0 + 2; x < x0 + 52; x += 2) pset(x, y, M.pantallaG);
    let py = null; for (let i = 0; i < 46; i++) { const f = i / 45, v = Math.min(calor, f) * 1.0, y = Math.round(y0 + 30 - v * 22 - Math.sin(i * 0.9 + t * 3) * 0.6); if (f <= Math.max(0.05, calor) + 0.02 || true) { const col = e_mezcla(M.frio, M.calor, Math.min(calor, f)); pset(x0 + 3 + i, y, col); if (py != null && Math.abs(py - y) > 1) linea(x0 + 2 + i, py, x0 + 3 + i, y, col); py = y; } }
    { const cn = e_mezcla(M.frio, M.calor, calor), adv = R.numero(String(deg), x0 + 6, y0 + 11, { color: cn, sombra: false, fina: true }); R.anillo(x0 + 6 + adv, y0 + 5, 1.2, cn); }
    pset(x0 + 50, y0 + 31, Math.floor(t * 2) % 2 ? M.verde : M.pantallaG); }
  { const x0 = 164, y0 = 29; rect(x0, y0 + 1, x0 + 52, y0 + 33, hex('#14181e'));
    for (let y = y0 + 3; y < y0 + 32; y += 3) rect(x0 + 1, y, x0 + 51, y, hex('#1a2028'));
    rect(x0 + 10, y0 + 22, x0 + 42, y0 + 24, hex('#4a4e58')); poligono([[x0 + 12, y0 + 18], [x0 + 40, y0 + 17], [x0 + 37, y0 + 22], [x0 + 15, y0 + 22]], hex('#2a2a30')); rect(x0 + 12, y0 + 17, x0 + 40, y0 + 17, hex('#c8a878'));
    if (e > 0 && e < 0.7) { const v = Math.sin(Math.PI * e / 0.7); poligono([[x0 + 22, y0 + 17], [x0 + 30, y0 + 17], [x0 + 26 + Math.round(v * 3), y0 + 17 - Math.round(v * 12)]], hex('#8ab0ff')); rect(x0 + 23, y0 + 16 - Math.round(v * 10), x0 + 29, y0 + 16 - Math.round(v * 10), hex('#c8a878')); }
    for (let i = 0; i < 46; i++) { const f = i / 45, pico = e > 0 ? Math.exp(-((f - 0.6) ** 2) / 0.002) * Math.min(1, e * 4) : 0; pset(x0 + 3 + i, Math.round(y0 + 30 - pico * 10 - (h(i, Math.floor(t * 4), 406) - 0.5) * 1.2), M.cian); }
    rect(x0 + 3, y0 + 3, x0 + 4, y0 + 4, Math.floor(t * 2) % 2 ? C.rojo : hex('#4a1a1a')); }
  // el portátil (barras que cambian) y las luces del registrador
  for (let k = 0; k < 5; k++) { const al = 1 + Math.round(Math.abs(Math.sin(t * 1.3 + k * 1.7)) * 5); rect(228 + k * 4, 96 - al, 230 + k * 4, 96, k % 2 ? M.cian : M.verde); }
  for (let k = 0; k < 6; k++) if ((Math.floor(t * 4) + k * 3) % 5 < 2) disco(255 + k * 2.4, 94, 0.6, M.verde);
  rect(103, 93, 115, 95, M.pantalla); rect(103, 94, 103 + Math.floor((t * 3) % 12), 94, M.cian);
  // la cinta roja del brazo de extracción, que ondea en la corriente
  for (let i = 0; i < 5; i++) pset(Math.round(196 + Math.sin(t * 10 + i) * i * 0.5 - i * 0.3), 80 + i, i % 2 ? C.rojoS : C.rojo);
  // la placa: su pantalla con los grados y la brasa que brilla con el calor; el temblor de la maqueta
  R.numero(String(deg), 129, 141, { color: calor > 0.5 ? M.ascuaL : M.cian, sombra: false, fina: true });
  { const b = calor * (0.8 + 0.2 * Math.sin(t * 3)); rect(124, 133, 192, 135, C.k); for (let x = 125; x < 192; x++) pset(x, 134, b > 0.2 ? e_mezcla(M.ceramica, (x + Math.floor(t * 4)) % 5 ? M.ascua : M.ascuaL, Math.min(1, b)) : M.ceramica); rect(125, 133, 191, 133, hex('#4a4a52'));
    pset(188, 138, calor > 0.05 ? C.rojo : hex('#5a2a2a')); }
  const tiembla = calor > 0.7 && e === 0 ? (Math.floor(t * 18) % 2 ? 1 : 0) : e > 0 && e < 0.25 ? (Math.floor(t * 30) % 2 ? 1 : -1) : 0;
  // el aire caliente que sube de la placa
  if (calor > 0.3) for (let k = 0; k < 8; k++) { const u = (t * 0.6 + k / 8) % 1; pset(Math.round(128 + k * 8 + Math.sin(t * 4 + k) * 2), Math.round(132 - u * 14), e_mezcla(M.pared, M.ascuaL, 0.5 * (1 - u) * calor)); }
  // los calzos y la maqueta (el casco canon de 80 px)
  for (const x of [138, 176]) { rect(x - 4, 129, x + 4, 133, C.k); rect(x - 3, 130, x + 3, 133, C.tablaS); rect(x - 3, 130, x + 3, 130, C.tabla); }
  const B = e_casco(R, 118 + tiembla, 131, 80);
  // la chispa en la escotilla (o.chispa) y el estallido (o.estalla): fogonazo azul, la tapa vuela girando y cae
  const [tx0, ty0] = B.tapa;
  if (ch > 0.02 && ch < 0.3) for (let k = 0; k < 5; k++) pset(Math.round(tx0 + Math.cos(k * 1.3 + t * 40) * 3), Math.round(ty0 + 2 + Math.sin(k * 1.3 + t * 40) * 2), k % 2 ? C.blanco : hex('#fff0a0'));
  let tx = tx0, ty = ty0, ang = 0;
  if (e > 0 && e < 1) {
    const f = Math.max(0, 1 - e / 0.22);
    if (f > 0) { e_halo(R, tx0, ty0, 44, 30, C.llamaL, 0.6 * f); poligono([[B.esc[0] + 1, B.esc[2] + 1], [B.esc[1] - 1, B.esc[2] + 1], [tx0 + 7, ty0 - 16 * f], [tx0, ty0 - 24 * f], [tx0 - 7, ty0 - 16 * f]], (x, y) => ((x + y) % 2 ? C.llamaL : C.llama)); for (let k = 0; k < 8; k++) { const a = -Math.PI * (k + 0.5) / 8; linea(Math.round(tx0 + Math.cos(a) * 9), Math.round(ty0 + Math.sin(a) * 7), Math.round(tx0 + Math.cos(a) * (12 + 10 * f)), Math.round(ty0 + Math.sin(a) * (9 + 8 * f)), C.llamaL); } }
    const v = Math.min(1, e / 0.85); ty = ty0 - 36 * 4 * v * (1 - v); tx = tx0 + Math.sin(v * Math.PI) * 4; ang = v < 1 ? v * Math.PI * 2 : 0;
    if (e > 0.18 && e < 0.7) for (let k = 0; k < 6; k++) { const u = (e - 0.18) / 0.52; pset(Math.round(tx0 - 8 + k * 3 + Math.sin(t * 3 + k) * 2), Math.round(ty0 - 3 - u * 14 - k % 3), e_mezcla(M.pared, C.blanco, 0.7 * (1 - u))); }
  }
  e_tapa(R, tx, ty, 13, 2, ang);
  // la columna del termómetro (azul con frío, roja con calor) y la luz de grabar de la cámara
  const col = e_mezcla(M.frio, M.calor, calor), yc = Math.round(130 - calor * 44);
  disco(209, 137.5, 2.3, col); rect(208, yc, 209, 136, col); pset(208, yc, e_mezcla(col, C.blanco, 0.4));
  { const rec = Math.floor(t * 1.6) % 2 === 0; disco(258, 104, 1.2, rec ? C.rojo : hex('#4a1a1a')); if (rec) pset(257, 103, hex('#ff9a9a')); }
  return [Math.round(tx), Math.round(ty)];
}

function e_maqFondo(R) {
  const { rect, pset, linea, disco, poligono } = R, M = e_M;
  // detrás, el laboratorio desenfocado: techo oscuro, la pared de listones borrosa, las pantallas como manchas de luz,
  // círculos de luz de los LED y la mampara a la izquierda
  for (let y = 0; y < 140; y++) { const c = y < 18 ? M.techo : y < 104 ? e_mezcla(M.liston, M.techo, 0.45) : e_mezcla(M.negro, M.techo, 0.3); for (let x = 0; x < 320; x++) pset(x, y, c); }
  for (let y = 18; y < 104; y++) for (let x = 0; x < 320; x++) { const lx = x % 9; if (lx < 2) pset(x, y, e_mezcla(M.hueco, M.techo, 0.45)); else if (lx === 2) pset(x, y, e_mezcla(M.listonL, M.techo, 0.45)); }
  // cada listón con su tono, su veta borrosa y algún nudo
  for (let x = 0; x < 320; x++) { const lx = x % 9; if (lx < 3) continue; const sl = Math.floor(x / 9), tn = (h(sl, 0, 423) - 0.5) * 0.18;
    for (let y = 18; y < 104; y++) { const v = Math.sin(y * 0.11 + sl * 1.7 + lx * 0.4) * 0.5 + 0.5; const c = R.pget(x, y); pset(x, y, tn > 0 ? e_mezcla(c, M.listonL, tn + v * 0.06) : e_mezcla(c, M.hueco, -tn + v * 0.08)); } }
  for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 1, 424) * 35) * 9 + 5, y = 24 + Math.floor(h(k, 2, 424) * 70); disco(x, y, 1.5, e_mezcla(M.hueco, M.techo, 0.5)); pset(x, y - 3, e_mezcla(M.liston, M.hueco, 0.4)); pset(x, y + 3, e_mezcla(M.liston, M.hueco, 0.4)); }
  // la balda de atrás con frascos y cajas desenfocados (tonos lavados, sin bordes)
  rect(36, 88, 319, 90, e_mezcla(M.acero, M.techo, 0.45)); rect(36, 91, 319, 92, e_mezcla(M.negroS, M.techo, 0.3));
  { let x = 40; for (let k = 0; x < 316; k++) { const w = 6 + (k * 5) % 8, al = 7 + (k * 7) % 9, c = [hex('#c87a2a'), hex('#3a7ab8'), hex('#e8e0d0'), hex('#5a9a4a'), hex('#a83a5a'), hex('#d8c040')][k % 6];
    for (let j = 0; j < al; j++) for (let i = 0; i < w; i++) { const b = Math.min(i, w - 1 - i, j, al - 1 - j); pset(x + i, 87 - j, e_mezcla(R.pget(x + i, 87 - j), c, b === 0 ? 0.25 : 0.5)); }
    x += w + 3 + (k % 4 === 3 ? 10 : 0); } }
  // el reloj de pared desenfocado, a la izquierda, sobre la columna (las agujas van en la vida)
  e_relojBorroso(R, 50, 36, 7, e_mezcla(M.liston, M.techo, 0.45), M.acero);
  e_tinte(R, 42, 28, 58, 44, e_mezcla(M.liston, M.techo, 0.45), 0.35);
  for (const [x0, y0, w, al, c] of [[70, 34, 70, 40, M.cian], [190, 30, 64, 38, hex('#3a6ab0')]]) for (let y = y0 - 4; y < y0 + al + 4; y++) for (let x = x0 - 4; x < x0 + w + 4; x++) { const d = Math.min(x - x0 + 4, x0 + w + 4 - x, y - y0 + 4, y0 + al + 4 - y) / 6; pset(x, y, e_mezcla(R.pget(x, y), x > x0 && x < x0 + w && y > y0 && y < y0 + al ? e_mezcla(M.pantalla, c, 0.4) : M.pantalla, Math.min(1, d) * 0.85)); }
  for (const [cx, cy, r, c, k] of [[196, 6, 9, M.led, 0.5], [236, 6, 10, M.led, 0.45], [268, 7, 7, M.led, 0.35], [92, 54, 5, M.verde, 0.5], [240, 50, 6, M.naranja, 0.45], [26, 96, 8, M.ambarL, 0.35], [300, 84, 7, M.amarillo, 0.45]]) e_halo(R, cx, cy, r, r, c, k);
  for (let y = 18; y < 140; y++) for (let x = 0; x < 34; x++) if ((x + y) % 2) pset(x, y, e_mezcla(R.pget(x, y), M.cristal, 0.25));
  rect(34, 18, 36, 140, e_mezcla(M.acero, M.techo, 0.3)); rect(34, 18, 34, 140, e_mezcla(M.aceroL, M.techo, 0.3));
  rect(0, 120, 34, 124, e_mezcla(M.acero, M.techo, 0.3));
  // el tablero negro de la mesa, con el borde de luz y el reflejo oscuro del casco (lo pinta la vida, que se mueve)
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 2, y, 407) > 0.93 ? M.negroL : M.negro);
  rect(0, 140, 319, 140, M.negroL); for (let x = 0; x < 320; x += 3) pset(x, 141, M.negroS);
  // la placa calefactora: cuerpo de aluminio con su pantalla y su mando; el tablero cerámico (la brasa va aparte)
  rect(66, 140, 236, 156, C.k); rect(67, 143, 235, 155, M.placa); rect(67, 143, 235, 144, C.blanco); rect(67, 155, 235, 155, M.placaS);
  for (let x = 70; x < 234; x += 4) pset(x, 154, M.placaS);
  rect(76, 146, 104, 152, C.k); rect(77, 147, 103, 151, M.pantalla); disco(220, 149, 4, C.k); disco(220, 149, 3, M.placaS); rect(220, 146, 220, 149, C.k); disco(208, 149, 1.2, hex('#5a2a2a'));
  rect(66, 137, 236, 140, C.k);
  // el soporte y el termómetro grande: la varilla, la nuez, el vidrio con la escala; el visor de los grados (la cifra
  // va aparte)
  rect(290, 46, 293, 156, M.acero); rect(290, 46, 290, 156, M.aceroL); rect(282, 154, 306, 157, M.aceroS); rect(282, 154, 306, 154, M.aceroL);
  rect(284, 70, 294, 76, C.k); rect(285, 71, 293, 75, M.aceroS);
  rect(275, 50, 287, 146, C.k); rect(276, 51, 286, 145, hex('#e8f0f4')); disco(281, 149, 7, C.k); disco(281, 149, 6, hex('#e8f0f4'));
  for (let y = 56; y < 140; y += 6) { rect(276, y, 278, y, C.k); if ((y - 56) % 12 === 0) rect(276, y, 279, y, C.k); }
  rect(285, 52, 285, 144, C.blanco); rect(284, 52, 284, 144, hex('#c8d8e0'));
  rect(294, 92, 318, 108, C.k); rect(295, 93, 317, 107, hex('#2a2c32')); rect(297, 95, 315, 105, M.pantalla); rect(294, 99, 296, 101, M.aceroS);
  // delante, sobre el tablero: la caja del encendido (con su interruptor; el piloto va aparte) y su cable a la placa,
  // la tableta con la gráfica (la curva va aparte), un bolígrafo y las gafas de seguridad
  rect(12, 158, 50, 174, C.k); rect(13, 159, 49, 173, hex('#d8dce0')); rect(13, 159, 49, 159, C.blanco); rect(13, 172, 49, 173, M.placaS);
  rect(18, 163, 26, 169, C.k); rect(19, 164, 25, 168, C.rojo); rect(19, 164, 25, 164, hex('#e86a6a')); rect(32, 164, 44, 168, M.pantalla);
  linea(50, 166, 58, 162, C.k); linea(58, 162, 66, 152, C.k); linea(50, 167, 58, 163, hex('#3a3a40'));
  poligono([[108, 164], [176, 160], [180, 180], [104, 180]], C.k); poligono([[110, 165], [174, 161], [177, 180], [107, 180]], M.pantalla);
  linea(110, 165, 174, 161, hex('#3a3e48'));
  linea(188, 170, 218, 164, C.k); linea(188, 171, 218, 165, M.azulBata); pset(218, 164, M.aceroL);
  rect(246, 164, 286, 172, C.k); rect(247, 165, 264, 171, hex('#c8e4f0')); rect(268, 165, 285, 171, hex('#c8e4f0')); rect(264, 166, 268, 168, C.k);
  pset(249, 166, C.blanco); pset(270, 166, C.blanco); rect(247, 171, 285, 171, hex('#8aa8b8')); linea(286, 168, 300, 173, C.k);
}
function e_maqVida(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, M = e_M;
  const calor = o.calor ?? 0, e = o.estalla ?? 0, ch = o.chispa ?? 0, g = o.grados ?? [41, 77], deg = Math.round(g[0] + (g[1] - g[0]) * calor);
  // lo que vive aunque no pase nada: el piloto del encendido, la curva de la tableta que corre, una luz del fondo que
  // late, las motas de polvo en la luz y la columna del termómetro que respira
  rect(32, 164, 44, 168, M.pantalla); for (let k = 0; k < 6; k++) pset(33 + k * 2, 166, (Math.floor(t * 3) + k) % 6 === 0 ? M.verde : hex('#1e3a2a'));
  disco(29, 162, 1, Math.floor(t * 1.5) % 2 ? M.verde : hex('#2a4a2a'));
  R.recorte([110, 166, 176, 179]); for (let i = 0; i < 62; i++) { const y = Math.round(173 - Math.sin((i + t * 8) * 0.25) * 3 - calor * 4); pset(112 + i, y, M.cian); } R.recorte(null);
  e_halo(R, 92, 54, 6, 6, M.verde, 0.25 + 0.2 * Math.sin(t * 2.2));
  e_halo(R, 240, 50, 7, 7, M.naranja, 0.2 + 0.2 * Math.sin(t * 1.3 + 1));
  for (let k = 0; k < 6; k++) { const x = Math.round((h(k, 1, 410) * 300 + t * (2 + k)) % 300 + 10), y = Math.round(30 + h(k, 2, 410) * 60 + Math.sin(t * 0.8 + k) * 5); pset(x, y, e_mezcla(R.pget(x, y), C.blanco, 0.45)); }
  // la brasa del tablero cerámico, la pantalla de la placa y su piloto
  { const b = calor * (0.8 + 0.2 * Math.sin(t * 3)); for (let x = 67; x < 236; x++) for (let y = 137; y < 140; y++) pset(x, y, b > 0.15 && y > 137 ? e_mezcla(M.ceramica, (x + y + Math.floor(t * 5)) % 6 ? M.ascua : M.ascuaL, Math.min(1, b * (y === 139 ? 1 : 0.6))) : y === 137 ? hex('#4a4a52') : M.ceramica); }
  R.numero(String(deg), 80, 152, { color: calor > 0.5 ? M.ascuaL : M.cian, sombra: false, fina: true });
  disco(208, 149, 1.2, calor > 0.05 ? C.rojo : hex('#5a2a2a'));
  // el aire caliente que tiembla
  if (calor > 0.3) for (let k = 0; k < 16; k++) { const u = (t * 0.5 + k / 16) % 1; pset(Math.round(72 + k * 10 + Math.sin(t * 4 + k) * 3), Math.round(134 - u * 30), e_mezcla(R.pget(72 + k * 10, 134 - u * 30 | 0), M.ascuaL, 0.4 * (1 - u) * calor)); }
  const tiembla = calor > 0.7 && e === 0 ? (Math.floor(t * 18) % 2 ? 1 : 0) : e > 0 && e < 0.25 ? (Math.floor(t * 30) % 2 ? 2 : -1) : 0;
  // lo que muestran las dos pantallas del fondo, desenfocado: la curva que corre y una franja que barre; a la derecha,
  // barras que suben y bajan. Y el segundero del reloj
  for (let i = 0; i < 58; i++) { const x = 76 + i, y = Math.round(56 - Math.sin((i + t * 14) * 0.18) * 6 - calor * 6); for (const [dy, k] of [[0, 0.5], [-1, 0.25], [1, 0.25]]) pset(x, y + dy, e_mezcla(R.pget(x, y + dy), M.cian, k)); }
  { const xs = 74 + Math.floor((t * 9) % 62); for (let y = 38; y < 72; y++) pset(xs, y, e_mezcla(R.pget(xs, y), C.blanco, 0.18)); }
  for (let k = 0; k < 7; k++) { const al = 6 + Math.round((Math.sin(t * 1.1 + k * 1.3) * 0.5 + 0.5) * 18); for (let y = 64 - al; y < 64; y++) for (let x = 196 + k * 8; x < 201 + k * 8; x++) pset(x, y, e_mezcla(R.pget(x, y), k % 2 ? M.cian : M.naranja, 0.3)); }
  e_agujas(R, 50, 36, 7, t, e_mezcla(e_mezcla(M.liston, M.techo, 0.45), C.k, 0.5), e_mezcla(e_mezcla(M.liston, M.techo, 0.45), C.rojo, 0.6));
  // los calzos y el casco grande (196 px)
  for (const x of [110, 200]) { rect(x - 10, 128, x + 10, 137, C.k); rect(x - 9, 129, x + 9, 136, C.tablaS); rect(x - 9, 129, x + 9, 129, C.tabla); for (let y = 131; y < 136; y += 2) rect(x - 7, y, x + 7, y, e_mezcla(C.tablaS, C.k, 0.2)); }
  const B = e_casco(R, 52 + tiembla, 131, 196);
  // su reflejo oscuro en el tablero negro
  for (let y = 158; y < 176; y++) for (let x = 60; x < 250; x += 1) if ((x + y) % 3 === 0) { const p = R.pget(x, 131 - (y - 158) * 2); if (p === C.casco || p === C.obraViva || p === C.robleRS || p === C.franja) pset(x, y, e_mezcla(M.negro, p, 0.3 * (1 - (y - 158) / 18))); }
  const [tx0, ty0] = B.tapa;
  if (ch > 0.02 && ch < 0.3) for (let k = 0; k < 8; k++) linea(Math.round(tx0), Math.round(ty0 + 3), Math.round(tx0 + Math.cos(k * 0.8 + t * 40) * 7), Math.round(ty0 + 3 + Math.sin(k * 0.8 + t * 40) * 4), k % 2 ? C.blanco : hex('#fff0a0'));
  let tx = tx0, ty = ty0, ang = 0;
  if (e > 0 && e < 1) {
    const f = Math.max(0, 1 - e / 0.25);
    if (f > 0) { e_halo(R, tx0, ty0, 90, 60, C.llamaL, 0.6 * f); poligono([[B.esc[0] + 2, B.esc[2] + 1], [B.esc[1] - 2, B.esc[2] + 1], [tx0 + 16, ty0 - 26 * f], [tx0, ty0 - 38 * f], [tx0 - 16, ty0 - 26 * f]], (x, y) => (h(x >> 1, (y + t * 60) >> 1, 408) > 0.5 ? C.llamaL : C.llama));
      for (let k = 0; k < 12; k++) { const a = -Math.PI * (k + 0.5) / 12; linea(Math.round(tx0 + Math.cos(a) * 20), Math.round(ty0 + Math.sin(a) * 14), Math.round(tx0 + Math.cos(a) * (26 + 26 * f)), Math.round(ty0 + Math.sin(a) * (16 + 14 * f)), C.llamaL); } }
    const v = Math.min(1, e / 0.9); ty = ty0 - 32 * 4 * v * (1 - v); tx = tx0 + Math.sin(v * Math.PI) * 10; ang = v < 1 ? v * Math.PI * 1.5 : 0;
    // la estela de la tapa a cámara lenta
    if (v > 0.03 && v < 0.97) for (const [d, k] of [[0.08, 0.25], [0.04, 0.45]]) { const w = Math.max(0, v - d), gx = tx0 + Math.sin(w * Math.PI) * 10, gy = ty0 - 32 * 4 * w * (1 - w), ga = w * Math.PI * 1.5, ca = Math.cos(ga), sa = Math.sin(ga);
      const P = (i, j) => [gx + i * ca - j * sa, gy + i * sa + j * ca]; R.poligono([P(-15, -2.5), P(15, -2.5), P(15, 2.5), P(-15, 2.5)], (x, y) => ((x + y) % 2 ? e_mezcla(R.pget(x, y), C.tabla, k) : R.pget(x, y))); }
    if (e > 0.2 && e < 0.8) for (let k = 0; k < 10; k++) { const u = (e - 0.2) / 0.6; pset(Math.round(tx0 - 14 + k * 3 + Math.sin(t * 3 + k) * 3), Math.round(ty0 - 4 - u * 30 - (k % 4) * 2), e_mezcla(R.pget(tx0 - 14 + k * 3, ty0 - 4), C.blanco, 0.7 * (1 - u))); }
  }
  e_tapa(R, tx, ty, 30, 5, ang);
  // la columna del termómetro y la cifra del visor (sin unidad)
  const col = e_mezcla(M.frio, M.calor, calor), yc = Math.round(140 - calor * 80 - (Math.sin(t * 1.7) > 0.6 ? 1 : 0));
  disco(281, 149, 5, col); rect(280, yc, 282, 146, col); rect(280, yc, 280, 146, e_mezcla(col, C.blanco, 0.35)); pset(281, yc - 1, col);
  rect(297, 95, 315, 105, M.pantalla); R.numero(String(deg), 298, 104, { color: col === 0 ? M.cian : e_mezcla(col, C.blanco, 0.3), sombra: false }); R.anillo(314, 97, 1.2, e_mezcla(col, C.blanco, 0.3));
  return [Math.round(tx), Math.round(ty)];
}
// la paleta propia de Haití (cielo, montes, mar turquesa, arrecife, arena, palmeras, el fondo del mar)
const f_P = pal({
  cielo0: '#4a9ae0', cielo1: '#66b2ea', cielo2: '#8ccaf2', cielo3: '#b4e0f6', cielo4: '#d6f0f8',
  nube0: '#9cc4e2', nube1: '#d4e8f6', nube2: '#ffffff', nubarron0: '#5e6a7a', nubarron1: '#7a8696', nubarron2: '#a4aebc', lluvia: '#8a98aa',
  monteFS: '#6a92aa', monteF: '#7ea6ba', monteFL: '#9cbecc', monteM: '#3a7a52', monteMS: '#2a5e40', monteML: '#5a9a5a', selvaL: '#7ab45a',
  orilla: '#f0e0b0', orillaS: '#c8b080',
  mar0: '#1e5e96', mar1: '#2474aa', mar2: '#2a8cb8', mar3: '#2fa8bc', mar4: '#38bcc0', marT: '#46cec6', marTL: '#7ae2d6', marTLL: '#a8f0e4', marD: '#1a4e80',
  coral0: '#4e5a3e', coral1: '#6a6a44', coral2: '#8a7a52', coralV: '#3e6a5a',
  espuma: '#f6fcfa', espumaS: '#c4ece6',
  arena0: '#c8a874', arena1: '#dcc08a', arena2: '#ecd6a4', arena3: '#f6e8c4', mojada: '#bca478', mojadaS: '#a08a60',
  tronco: '#9a7a58', troncoS: '#6a5038', troncoL: '#c0a07a', troncoD: '#4e3a28', palma: '#2e7a32', palmaS: '#1e5a26', palmaL: '#5aaa44', palmaH: '#8ccc5a', coco: '#6a4a24',
  paja: '#d4b468', pajaS: '#9a7a40', adobe: '#c89a6a', adobeS: '#9a7048',
  casco: '#1c1a20', cascoL: '#3a3640', cascoG: '#5a5660', franja: '#e8e4d8', obraViva: '#8a2a24', obraVivaS: '#5e1c18', tabla: '#c8a878', tablaS: '#9a7a52',
  lona: '#efe6d0', lonaS: '#c8bca0', lonaD: '#a89a7a', parche: '#d8c08a', parcheS: '#b09a64', jarcia: '#3a3028', madera: '#7a5232', maderaS: '#5a3a22', maderaL: '#9a6c42',
  piel: '#d8a07a', pielD: '#8a5a3a', ropa1: '#3a4a6a', ropa2: '#c8c0a8', ropa3: '#8a3a2a', sombrero: '#e0d0a0',
  blanco: '#f8f8f4', blancoS: '#c8ccd4', azulL: '#2a5aa8', rojo: '#d02a2a', neopreno: '#1e2228', botella: '#f0c020', botellaS: '#b08a10',
  // bajo el agua
  agua0: '#78dcdc', agua1: '#4cc0cc', agua2: '#2e9ebc', agua3: '#1c80a6', agua4: '#13648e', agua5: '#0d4c74', luz: '#d4fbf2', luzS: '#a6eee6',
  lejano: '#1e6c86', lejanoL: '#2c8098', lejanoS: '#185a74',
  arenaF0: '#7a9a8a', arenaF1: '#9cb09a', arenaF2: '#bcc4a4', arenaF3: '#d4d4b0', arenaFL: '#ecead0',
  roca: '#2e5a5e', rocaS: '#1e4248', rocaL: '#3e7270',
  cerebro: '#c8a464', cerebroS: '#8a6e3e', cerebroL: '#e8cc8c', cuerno: '#e8885a', cuernoS: '#a85a3a', cuernoL: '#ffc4a0',
  tuboM: '#8a5ab8', tuboMS: '#5e3a86', tuboML: '#b08ad8', tuboA: '#e0c040', tuboAS: '#a88a20', mesa: '#6aa888', mesaS: '#4a806a', mesaL: '#9cd0b0',
  abanico: '#b05a98', abanicoS: '#7e3a6e', alga: '#3e9a5a', algaS: '#2a6e42', algaL: '#7ac86a',
  pecio: '#5a4632', pecioS: '#3e3022', pecioL: '#7e6648', pecioD: '#2a2018', oxido: '#a85a2a', oxidoS: '#7a3e1c', perno: '#3a3a3e',
  rosa: '#e07a8e', verdeC: '#7ab06a', morado: '#9a6ac8',
  anillo0: '#d8b888', anillo1: '#a87e4e', anilloL: '#ffeab0', anilloL2: '#f4c868', corteza: '#5a3e26', cortezaS: '#3e2a18',
  plata: '#d4e4ee', plataS: '#7a98ac', amarillo: '#f4d020', azulT: '#2a5ad8', loro: '#3ac0a8', loroS: '#2a8a9a', tortuga: '#4a7a62', tortugaS: '#2e5a48', tortugaL: '#6a9a7a',
});

// Bayer 4×4 para tramar los degradados, y un tono de una rampa en u (0–1) tramado
const f_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const f_b4 = (x, y) => (f_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

const f_rampa = (cs, u, x, y) => { const v = Math.max(0, Math.min(cs.length - 1.001, u * (cs.length - 1))), i = Math.floor(v); return v - i > f_b4(x, y) ? cs[i + 1] : cs[i]; };

// mezcla de dos colores del búfer (ABGR)
function f_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// las zonas tranquilas: Atom (con margen) y la barra del año con sus cifras
const f_tranquilo = (x, y) => (x > 272 && y < 48) || (x >= 18 && x <= 172 && y < 22);

const f_lim = (u) => Math.max(0, Math.min(1, u));

const f_suave = (u) => { u = f_lim(u); return u * u * (3 - 2 * u); };

// el fondo fijo de cada vista se pinta una vez en su búfer (con su máscara: 1 cielo, 2 tierra lejana, 3 mar, 4 playa…)
const f_cache = new Map();

function f_fijo(R, clave, dibuja) {
  let c = f_cache.get(clave);
  if (!c) { const b = R.nuevo(), m = new Uint8Array(57600), prev = R.usar(b); const info = dibuja(m) || {}; R.usar(prev); c = { b, m, info }; f_cache.set(clave, c); }
  return c;
}

// un píxel solo donde la máscara vale v (las nubes solo en el cielo, etc.) y fuera de las zonas tranquilas
const f_psM = (R, m, x, y, c, v = 1) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const i = y * 320 + x; if (m[i] === v) R.pset(x, y, c); else if (m[i] === 0 && v === 1) { const d = x > 272 && y < 48 ? Math.min(x - 272, 48 - y) : Math.min(22 - y, x - 18, 172 - x); R.pset(x, y, f_mezcla(R.pget(x, y), c, Math.max(0.12, 0.75 - 0.09 * d))); } };

const f_discoM = (R, m, cx, cy, r, c, v = 1) => { for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) { const dx = x + 0.5 - cx, dy = y + 0.5 - cy; if (dx * dx + dy * dy <= r * r) f_psM(R, m, x, y, c, v); } };

// cúmulo de tres tonos con la base plana, solo en el cielo
function f_nube(R, m, cx, cy, w, sem, c, ap = 1) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06 * ap, r]); }
  for (const [x, y, r] of bolas) f_discoM(R, m, x, y + 1, r, c[0]);
  for (const [x, y, r] of bolas) f_discoM(R, m, x, y, r, c[1]);
  for (const [x, y, r] of bolas) f_discoM(R, m, x - 1, y - 2, r * 0.66, c[2]);
  const y0 = Math.round(cy + w * 0.08 * ap); for (let x = Math.round(cx - w * 0.47); x <= Math.round(cx + w * 0.47); x++) { f_psM(R, m, x, y0, c[0]); f_psM(R, m, x, y0 + 1, c[0]); }
}

const F_HOR = 72;

const f_yPlaya = (x) => 152 + Math.pow(Math.max(0, x) / 140, 2) * 28;   // el borde de la arena; a partir de x 140 no hay playa

const f_monteF = (x) => F_HOR - (30 + 6 * Math.sin(x * 0.05) + 4 * Math.sin(x * 0.13 + 1) + 2 * Math.sin(x * 0.31)) * Math.pow(f_lim((222 - x) / 95), 0.8);

const f_monteM = (x) => F_HOR + 3 - (15 + 5 * Math.sin(x * 0.07 + 2) + 3 * Math.sin(x * 0.19) + 1.5 * Math.sin(x * 0.5)) * Math.pow(f_lim((178 - x) / 60), 0.7);

const f_costa = (x) => x < 168 ? 77 : x < 192 ? Math.round(77 - (x - 168) / 24 * 5) : F_HOR;

const F_REEF = [195, 114, 88, 15];

const f_reefE = (x, y) => ((x - F_REEF[0]) / F_REEF[2]) ** 2 + ((y - F_REEF[1] + 2.5 * Math.sin(x * 0.09)) / F_REEF[3]) ** 2;

function f_arrecifeFijo(R, m, ep) {
  const { pset } = R, P = f_P;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const i = y * 320 + x, hf = f_monteF(x), hm = f_monteM(x), yc = f_costa(x);
    if (x < 140 && y >= f_yPlaya(x)) { m[i] = 4; continue; }
    if (y < Math.min(hf, F_HOR) && y < Math.min(hm, yc - 2)) {
      // el cielo tropical: azul hondo arriba y casi blanco en el horizonte; en las zonas tranquilas, sin trama
      const u = y / F_HOR; m[i] = f_tranquilo(x, y) ? 0 : 1;
      pset(x, y, f_rampa([P.cielo0, P.cielo1, P.cielo2, P.cielo3, P.cielo4], Math.pow(u, 1.25), x, y));
    } else if (y < hm && y < yc - 2) {
      // los montes lejanos, azulados por la calima, con sus barrancos
      m[i] = 2; const v = 0.5 + 0.28 * Math.sin(x * 0.17 + y * 0.42) + 0.22 * (h(x >> 2, y >> 2, 31) - 0.5) - (y - hf) / 60;
      pset(x, y, y - hf < 1 ? P.monteFL : f_rampa([P.monteFS, P.monteF, P.monteFL], v, x, y));
    } else if (y < yc - 2) {
      // las colinas de selva: verde con el borde de arriba claro
      m[i] = 2; pset(x, y, y - hm < 1 ? P.monteML : f_rampa([P.monteMS, P.monteM, P.monteML], 0.45 + 0.3 * (h(x >> 1, y >> 1, 32) - 0.5) - (y - hm) / 40, x, y));
    } else if (y < yc) { m[i] = 2; pset(x, y, y === yc - 2 ? P.orilla : P.orillaS); }
    else {
      // el mar: hondo en el horizonte y turquesa cerca; el arrecife, sus cabezas de coral y el agua somera alrededor
      m[i] = 3; const e = f_reefE(x, y), u = (y - F_HOR) / 108, n = h(x >> 1, y >> 1, 5) * 0.6 + h(x >> 2, y >> 2, 6) * 0.4;
      const cerca = Math.max(0, 1 - ((x < 140 ? f_yPlaya(x) : 180 + (x - 140) * 0.3) - y) / 26);
      let c;
      const blob = (x, y) => 0.5 + 0.22 * Math.sin(x * 0.13 + Math.sin(y * 0.4) * 2) + 0.2 * Math.sin(y * 0.55 + x * 0.05 + Math.sin(x * 0.07) * 3) + 0.12 * Math.sin(x * 0.31 - y * 0.7) + (h(x >> 1, y, 10) - 0.5) * 0.12, nc = blob(x, y), arriba = blob(x, y - 1);
      if (e < 1 && nc > 0.3 + e * 0.38) c = arriba <= 0.3 + e * 0.38 ? P.coral2 : nc > 0.72 ? P.coral0 : h(x, y, 11) > 0.8 ? P.coralV : (x + (y >> 1)) % 6 === 0 ? P.coral2 : P.coral1;
      else if (e < 1) c = f_rampa([P.marT, P.marTL, P.marTLL], 0.75 - e * 0.5 + (n - 0.5) * 0.4, x, y);
      else if (e < 1.9) c = f_rampa([P.mar3, P.mar4, P.marT, P.marTL], 1 - (e - 1) / 0.9, x, y);
      else if (cerca > 0) c = f_rampa([P.mar4, P.marT, P.marTL, P.marTLL], cerca, x, y);
      else c = f_rampa([P.mar0, P.mar1, P.mar2, P.mar3, P.mar4], Math.pow(u, 0.8), x, y);
      // el rizado: guiones que se alargan con la cercanía
      const per = 3 + Math.round(u * 8), g = h(Math.floor((x + (y * 7) % per) / per), y, 7);
      if (e >= 1 && g > 0.86) c = f_mezcla(c, P.marTLL, 0.35); else if (e >= 1 && g < 0.08) c = f_mezcla(c, P.marD, 0.3);
      if (y === F_HOR && x >= 190) c = P.mar1;
      pset(x, y, c);
    }
  }
  // el sol, con su halo tramado
  for (let y = 10; y < 46; y++) for (let x = 218; x < 256; x++) { const d = Math.hypot(x - 236, y - 28); if (m[y * 320 + x] === 1 && d < 18 && d > 7 && f_b4(x, y) < (18 - d) / 22) pset(x, y, P.cielo4); }
  R.disco(236, 28, 8, P.cielo4); R.disco(236, 28, 6.5, hex('#fff8d8')); R.disco(235, 27, 4, P.blanco);
  for (let y = 18; y < 38; y++) for (let x = 226; x < 246; x++) if (Math.hypot(x - 236, y - 28) < 8.5) m[y * 320 + x] = 5;
  // las copas de la selva: bolas con luz arriba a la derecha (el sol) y sombra abajo
  for (let k = 0; k < 260; k++) { const x = Math.round(h(k, 1, 33) * 176), top = f_monteM(x), y = Math.round(top + 2 + h(k, 2, 33) * (f_costa(x) - 4 - top)); if (y >= f_costa(x) - 3 || y < top + 1) continue;
    const r = 1.5 + h(k, 3, 33) * 1.5; R.disco(x, y, r, P.monteMS); R.disco(x - 0.5, y - 0.5, r - 0.5, P.monteM); pset(x + 1, y - Math.round(r) + 1, P.monteML); if (k % 4 === 0) pset(x, y - Math.round(r) + 1, P.selvaL); }
  // la orilla: palmeras pequeñas y el pueblo (chozas de paja en 1885; casitas de colores con chapa en 2001)
  for (let k = 0; k < 14; k++) { const x = 6 + Math.round(k * 12 + h(k, 4, 34) * 6), y = f_costa(x) - 2, a = 4 + (k % 3); if (x > 186) continue;
    R.linea(x, y, x + 1, y - a, P.troncoS); for (const [dx, dy] of [[-2, 1], [-1, 0], [0, -1], [1, -1], [2, 0], [3, 1], [-3, 2], [3, 2]]) pset(x + 1 + dx, y - a + dy, k % 2 ? P.palma : P.palmaS); }
  const casas = ep === 2001 ? [[34, '#e8c858', '#a8a8b0'], [46, '#5ab0d8', '#9a9aa4'], [58, '#e87a6a', '#b0b0b8'], [104, '#f0f0e8', '#a4a4ac'], [116, '#8ad07a', '#a8a8b0'], [148, '#f0a848', '#9a9aa4']] : [[40, 0], [52, 0], [110, 0], [146, 0]];
  for (const [x, c1, c2] of casas) { const y = f_costa(x) - 2;
    if (ep === 2001) { R.rect(x, y - 4, x + 6, y, hex(c1)); R.rect(x + 5, y - 4, x + 6, y, f_mezcla(hex(c1), P.casco, 0.25)); R.rect(x - 1, y - 6, x + 7, y - 5, hex(c2)); pset(x + 2, y - 2, P.casco); pset(x + 2, y - 1, P.casco); pset(x + 4, y - 3, P.mar1); }
    else { R.rect(x - 1, y - 4, x + 7, y, P.adobe); R.rect(x + 5, y - 4, x + 7, y, P.adobeS); R.linea(x - 1, y - 2, x + 4, y - 2, P.adobeS);
      R.poligono([[x - 3, y - 3], [x + 3, y - 10], [x + 10, y - 3]], P.paja); R.linea(x + 4, y - 9, x + 9, y - 3, P.pajaS); R.linea(x - 3, y - 3, x + 10, y - 3, P.pajaS); pset(x + 3, y - 9, P.troncoD);
      R.rect(x + 1, y - 2, x + 2, y, P.troncoD); pset(x + 5, y - 2, P.troncoD); } }
  // la cara de agua del arrecife: el borde oscuro del lado del mar abierto
  const espuma = [];
  for (let a = -0.25; a <= Math.PI + 0.25; a += 0.018) { const x = Math.round(F_REEF[0] + Math.cos(a) * F_REEF[2]), y = Math.round(F_REEF[1] - 2.5 * Math.sin(x * 0.09) + Math.sin(a) * F_REEF[3]); if (x > 0 && x < 320) { pset(x, y + 1, P.mar2); espuma.push([x, y]); } }
  // la playa: arena con granos, la franja mojada junto al agua, rizos de viento, conchas y huellas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 140; x++) { if (m[y * 320 + x] !== 4) continue; const d = y - f_yPlaya(x), n = h(x, y, 35);
    let c = d < 3 ? (d < 1 ? P.mojadaS : P.mojada) : f_rampa([P.arena0, P.arena1, P.arena2, P.arena3], 0.35 + (y - 150) / 60 + (n - 0.5) * 0.35, x, y);
    if (d > 4 && Math.sin(x * 0.35 + y * 1.6 + Math.sin(x * 0.1) * 2) > 0.93) c = P.arena0; if (n > 0.985) c = P.arena3; pset(x, y, c); }
  for (const [x, y, c] of [[70, 175, P.rosa ?? hex('#e8a0a8')], [24, 163, P.blanco], [112, 177, hex('#e8a0a8')], [88, 160, P.blanco]]) { pset(x, y, c); pset(x + 1, y, c); pset(x, y - 1, f_mezcla(c, P.blanco, 0.5)); }
  for (let k = 0; k < 9; k++) { const x = 30 + k * 9, y = 168 + (k % 2 ? 2 : -1) + Math.round(k * 0.5); if (f_yPlaya(x) + 2 < y) { pset(x, y, P.arena0); pset(x + 1, y, P.arena0); pset(x, y + 1, P.mojada); } }
  if (ep === 2001) {
    // la nevera roja y dos botellas de buceo amarillas apoyadas
    R.rect(64, 158, 78, 166, P.rojo); R.rect(64, 158, 78, 159, hex('#f06a5a')); R.rect(64, 165, 78, 166, hex('#9a1a1a')); R.rect(65, 157, 77, 157, P.blanco); R.rect(69, 160, 73, 160, P.blanco); R.linea(79, 165, 90, 166, P.arena0);
    for (const bx of [82, 87]) { R.rect(bx, 151, bx + 3, 164, P.botella); R.rect(bx + 3, 151, bx + 3, 164, P.botellaS); R.rect(bx + 1, 149, bx + 2, 150, P.cascoG); pset(bx + 1, 152, hex('#fff0a0')); R.rect(bx, 158, bx + 3, 158, P.neopreno); }
  } else {
    // la piragua varada de un pescador, con su remo, y un tronco que trajo el mar
    R.poligono([[34, 156], [80, 155], [76, 162], [38, 162]], P.madera); R.linea(36, 156, 79, 155, P.maderaL); R.rect(40, 157, 74, 158, P.maderaS); R.linea(39, 162, 75, 162, P.troncoD);
    R.linea(46, 160, 70, 152, P.troncoL); R.rect(68, 151, 71, 153, P.troncoL);
    R.linea(98, 176, 116, 174, P.troncoS); R.linea(98, 175, 116, 173, P.troncoL); pset(97, 176, P.troncoD);
  }
  f_arrecifeExtra(R, m);
  return { espuma };
}
// la palmera grande de la playa: tronco curvo con anillos, cocos y las palmas que se mecen
function f_palmeraGrande(R, t, x0, y0) {
  const P = f_P, pts = [];
  for (let j = 0; j <= 136; j++) { const u = j / 136; pts.push([x0 + 16 * Math.pow(u, 1.7) + Math.sin(t * 0.9) * u * u * 1.2, y0 - j]); }
  for (let j = 0; j < pts.length; j++) { const [x, y] = pts[j], w = Math.round(3.2 - j / 136 * 1.2), xx = Math.round(x);
    for (let i = -w; i <= w; i++) R.pset(xx + i, y, i === -w ? P.troncoL : i >= w - 1 ? P.troncoS : (j % 5 === 0 ? P.troncoS : P.tronco)); R.pset(xx - w - 1, y, P.troncoD); R.pset(xx + w + 1, y, P.troncoD); }
  const [cx, cy] = pts[pts.length - 1].map(Math.round);
  for (const [dx, dy] of [[-2, 3], [1, 4], [3, 2]]) { R.disco(cx + dx, cy + dy, 2.2, P.coco); R.pset(cx + dx - 1, cy + dy - 1, P.troncoL); }
  for (let j = 0; j < 10; j++) { const a = -Math.PI - 0.2 + j * ((Math.PI + 0.4) / 9) + Math.sin(t * 1.4 + j * 0.8) * 0.05, l = 20 + (j % 3) * 5;
    for (let d = 1; d <= l; d++) { const f = d / l, xx = Math.round(cx + Math.cos(a) * d), yy = Math.round(cy + Math.sin(a) * d * 0.55 + f * f * l * 0.5);
      if (yy < 24) continue; R.pset(xx, yy - 1, P.troncoD); R.pset(xx, yy, f > 0.8 ? P.palmaH : P.palmaL); R.pset(xx, yy + 1, P.palma);
      if (d > 2 && d % 2 === 0) { const fl = Math.max(1, Math.round((1 - f) * 4 + 0.5)); for (let k = 1; k <= fl; k++) R.pset(xx + (j < 5 ? -1 : 1) * (k >> 1), yy + k, k === fl ? P.palmaS : j % 2 ? P.palmaL : P.palma); } } }
}

// el Mary Celeste viejo (1885), de costado y con la proa a la izquierda: cx, ys el centro en la línea de flotación;
// s: { cab (cabeceo, rad; > 0 levanta la proa), esc 0–1 (escora: el aparejo se inclina y asoma la cubierta), sube (px
// que sale del agua al varar), verga 0–1 (la verga de juanete del trinquete cae), anda 0–1 (estela) }
function f_barcoViejo(R, t, cx, ys, s) {
  const P = f_P, ang = s.cab, ca = Math.cos(ang), sa = Math.sin(ang), wl = ys - (s.sube || 0), k = (s.esc || 0) * 0.16;
  const Pt = (lx, ly) => [cx + lx * ca - ly * sa, wl + lx * sa + ly * ca];
  const Pa = (lx, ly) => Pt(lx - (ly + 11) * k, ly);   // el aparejo, inclinado con la escora
  const pol = (pts, c, F = Pt) => R.poligono(pts.map(([a, b]) => F(a, b)), c);
  const lin = (a, b, c2, d, col, F = Pt) => { const p = F(a, b), q = F(c2, d); R.linea(p[0], p[1], q[0], q[1], col); };
  const ly = (x, y) => ((y - wl) - (x - cx) * sa) / ca;
  // el reflejo oscuro bajo el casco
  for (let j = 1; j < 9; j++) for (let i = -40; i <= 40; i++) { const x = Math.round(cx + i + Math.sin(t * 3 + j) * 1.5), y = ys + j; if ((x + y + j) % (j < 4 ? 2 : 3) === 0 && Math.abs(i) < 40 - j * 2) R.pset(x, y, f_mezcla(R.pget(x, y), P.marD, 0.5)); }
  // el casco (recortado en la línea del agua): negro gastado con chorretones grises, la franja y la obra viva roja
  R.recorte([0, 0, 319, ys]);
  pol([[-46, -13], [-40, -11], [0, -10], [38, -11], [43, -14], [42, -6], [37, 3], [30, 6], [-30, 6], [-39, 2]], (x, y) => {
    const v = ly(x, y), n = h(x, (y >> 2) + (x & 1), 41);
    if (v > -10.6 && v < -9.2) return P.franja;
    if (v > 1) return (x + y) % 3 ? P.obraViva : P.obraVivaS;
    if (n > 0.86) return P.cascoG; if (n > 0.66 || (x & 3) === 0 && v > -6) return P.cascoL; return P.casco;
  });
  lin(-46, -13, 43, -14, P.cascoG); lin(-45, -14, 42, -15, P.tablaS);
  // la caseta del camarote a popa con sus dos ventanillas, la rueda del timón y la escotilla
  pol([[22, -13], [22, -18], [37, -18], [37, -13]], P.tablaS); lin(21, -19, 38, -19, P.tabla); for (const vx of [26, 32]) { const [a, b] = Pt(vx, -16); R.pset(a, b, P.casco); R.pset(a + 1, b, hex('#7ab0d0')); }
  { const [a, b] = Pt(40, -18); R.anillo(a, b, 2.5, P.madera); R.pset(Math.round(a), Math.round(b), P.maderaL); }
  // los palos: el trinquete (velas cuadradas) y el mayor (cangreja), con sus parches
  const vela = (sem) => (x, y) => { const bx = Math.floor((x - cx) / 5), by = Math.floor((y - wl) / 4), p = h(bx, by, sem);
    if (p > 0.8) return ((x - cx) % 5 === 0 || (y - wl) % 4 === 0) ? P.parcheS : P.parche;
    if ((x - cx) % 4 === 0) return P.lonaS; return h(x, y, sem + 1) > 0.88 ? P.lonaD : P.lona; };
  lin(-16, -12, -16, -58, P.maderaS, Pa); lin(-15, -12, -15, -57, P.madera, Pa); lin(10, -12, 10, -56, P.maderaS, Pa); lin(11, -12, 11, -55, P.madera, Pa);
  pol([[-28, -22], [-4, -22], [-5, -14], [-16, -12.5], [-27, -14]], vela(51), Pa);   // trinquete
  pol([[-26, -33], [-6, -33], [-5, -23], [-27, -23]], vela(52), Pa);   // gavia
  for (const yy of [-22, -33]) lin(-29, yy, -3, yy, P.maderaS, Pa);
  const vg = s.verga || 0;
  if (vg < 0.05) { pol([[-23, -43], [-9, -43], [-8, -34], [-24, -34]], vela(53), Pa); lin(-25, -43, -7, -43, P.maderaS, Pa); }
  else {
    // la vela de juanete se ha soltado: cuelga arrugada del palo
    pol([[-17, -43], [-14, -43], [-12, -36], [-19, -35]], P.lonaS, Pa);
    const [x0, y0] = Pa(-16, -43), fin = [cx - 62, ys - 1], u = f_lim(vg), g = u * u;
    const xm = x0 + (fin[0] - x0) * u, ym = y0 + (fin[1] - y0) * g + (u >= 1 ? Math.sin(t * 2) : 0), a = u * 1.2 + (u >= 1 ? 1.5 : 0);
    R.linea(Math.round(xm - Math.cos(a) * 9), Math.round(ym - Math.sin(a) * 9 * (u >= 1 ? 0.15 : 1)), Math.round(xm + Math.cos(a) * 9), Math.round(ym + Math.sin(a) * 9 * (u >= 1 ? 0.15 : 1)), P.maderaS);
  }
  pol([[12, -50], [35, -55], [41, -15], [12, -15]], vela(54), Pa); lin(12, -50, 35, -55, P.maderaS, Pa); lin(12, -15, 43, -15, P.maderaS, Pa);
  // el bauprés y los dos foques
  lin(-44, -13, -63, -20, P.maderaS); lin(-44, -14, -63, -21, P.madera);
  pol([[-17, -50], [-61, -20], [-42, -16]], vela(55)); pol([[-17, -41], [-49, -17], [-30, -15]], vela(56));
  // la jarcia: estays, obenques y el gallardete de popa
  lin(-16, -58, -63, -20, P.jarcia, Pa); lin(10, -56, -16, -50, P.jarcia, Pa); lin(10, -56, 42, -15, P.jarcia, Pa);
  for (const d of [-3, 0, 3]) { lin(-16, -44, -16 + d * 2, -13, P.jarcia, Pa); lin(10, -46, 12 + d * 2, -13, P.jarcia, Pa); }
  { const [a, b] = Pa(10, -57); for (let i = 0; i < 7; i++) { const yy = Math.round(b + Math.sin(t * 6 - i * 0.9) * (0.4 + i * 0.15)); R.pset(Math.round(a) + 1 + i, yy, P.rojo); if (i < 3) R.pset(Math.round(a) + 1 + i, yy + 1, P.rojo); } }
  R.recorte(null);
  // la espuma en la línea del agua y la estela
  for (let i = -40; i <= 42; i++) { const x = cx + i, y = ys; if ((i + Math.floor(t * 8)) % 3) R.pset(x, y, P.espumaS); }
  const an = s.anda || 0;
  if (an > 0) { for (let j = 0; j < 22; j++) { const x = cx + 44 + j * 3, y = ys + Math.round(j * 0.35), w = (j + Math.floor(t * 10)) % 4; if (w) { R.pset(x, y, P.espuma); R.pset(x + 1, y + 1, P.espumaS); } R.pset(x, ys - Math.round(j * 0.15), P.espumaS); }
    for (let j = 0; j < 6; j++) R.pset(cx - 44 - (j % 3), ys - 1 - (j >> 1) + Math.round(Math.sin(t * 9 + j)), P.espuma); }
}

// un bote de remos pequeño con cinco tripulantes sentados (figuritas de 4 px con sombrero) y dos remos
function f_bote(R, t, x, y, rema) {
  const P = f_P, b = Math.round(Math.sin(t * 2.2 + x * 0.1) * 0.6);
  for (let i = -10; i <= 10; i++) R.pset(x + i, y + 1, f_mezcla(R.pget(x + i, y + 1), P.marD, 0.4));
  R.poligono([[x - 11, y - 3 + b], [x + 10, y - 3 + b], [x + 8, y + 1 + b], [x - 8, y + 1 + b]], P.madera); R.linea(x - 11, y - 3 + b, x + 10, y - 3 + b, P.maderaL); R.linea(x - 8, y + b, x + 8, y + b, P.maderaS);
  const ropa = [P.ropa1, P.ropa2, P.ropa3, P.ropa1, P.ropa2];
  for (let k = 0; k < 5; k++) { const px = x - 8 + k * 4, py = y - 4 + b; R.rect(px, py - 2, px + 1, py, ropa[k]); R.pset(px, py - 3, P.piel); R.pset(px + 1, py - 3, P.piel); R.rect(px - (k === 0 ? 1 : 0), py - 4, px + 1, py - 4, k === 0 ? P.casco : P.sombrero); }
  const g = rema ? Math.sin(t * 3.4) : 0;
  for (const [ox, d] of [[-3, -1], [5, 1]]) R.linea(x + ox, y - 4 + b, x + ox + Math.round(g * 4) * d + d * 2, y + 3 + b, P.maderaL);
  if (rema && g > 0.7) { R.pset(x - 1 + Math.round(g * 4), y + 3, P.espuma); R.pset(x + 7 + Math.round(g * 4), y + 3, P.espuma); }
}

// la lancha de buceo de 2001 (proa a la izquierda), su bandera de buceo, el patrón y los dos buceadores de la popa;
// sal 0–1 (o.salto); devuelve dónde entra cada buceador en el agua
function f_lancha(R, t, x, y, sal) {
  const P = f_P, b = Math.round(Math.sin(t * 1.8) * 0.7);
  for (let i = -22; i <= 24; i++) for (let j = 1; j < 4; j++) if ((i + j) % 2 === 0) R.pset(x + i, y + j, f_mezcla(R.pget(x + i, y + j), P.marD, 0.35));
  R.linea(x - 22, y - 5, x - 34, y + 3, P.jarcia);   // el cabo del ancla
  R.poligono([[x - 24, y - 8 + b], [x + 20, y - 7 + b], [x + 20, y + 1 + b], [x - 16, y + 1 + b]], P.blanco); R.poligono([[x - 21, y - 3 + b], [x + 20, y - 3 + b], [x + 20, y - 1 + b], [x - 18, y - 1 + b]], P.azulL);
  R.linea(x - 24, y - 8 + b, x + 20, y - 7 + b, P.blancoS); R.linea(x - 16, y + 1 + b, x + 20, y + 1 + b, P.blancoS);
  // el motor fuera borda
  R.rect(x + 20, y - 9 + b, x + 24, y - 4 + b, P.neopreno); R.rect(x + 21, y - 9 + b, x + 23, y - 8 + b, P.cascoG); R.rect(x + 22, y - 3 + b, x + 23, y + 2 + b, P.cascoL);
  // la consola con el toldo azul y el patrón
  R.rect(x - 4, y - 13 + b, x + 2, y - 8 + b, P.blancoS); R.rect(x - 3, y - 12 + b, x + 1, y - 11 + b, hex('#4a6a8a'));
  R.linea(x - 6, y - 21 + b, x - 6, y - 8 + b, P.blancoS); R.linea(x + 6, y - 21 + b, x + 6, y - 8 + b, P.blancoS); R.rect(x - 8, y - 23 + b, x + 8, y - 21 + b, hex('#2a3a6a')); R.rect(x - 8, y - 21 + b, x + 8, y - 21 + b, hex('#1a2448'));
  { const px = x + 3, py = y - 8 + b; R.rect(px, py - 5, px + 2, py - 1, hex('#e8e0c8')); R.rect(px, py - 7, px + 2, py - 6, P.piel); R.rect(px - 1, py - 8, px + 2, py - 8, P.rojo); R.pset(px + 3, py - 4, P.piel); }
  // la bandera de buceo (roja con la diagonal blanca) que ondea en su asta de proa
  { const ax = x - 18, ay = y - 22 + b; R.linea(ax, ay, ax, y - 7 + b, P.blancoS);
    for (let i = 1; i <= 9; i++) for (let j = 0; j < 6; j++) { const yy = ay + j + Math.round(Math.sin(t * 6 - i * 0.7) * (0.3 + i * 0.12)), d = Math.abs(j - (i - 1) * 0.62); R.pset(ax + i, yy, d < 1.1 ? P.blanco : P.rojo); } }
  // los dos buceadores: sentados de espaldas al agua en la borda de popa; cada uno se deja caer hacia atrás
  const sitios = [[x + 15, y - 8], [x + 10, y - 8]], ventanas = [[0.1, 0.4], [0.5, 0.8]], entradas = [];
  for (let k = 0; k < 2; k++) { const [a0, a1] = ventanas[k], p = f_lim((sal - a0) / (a1 - a0)), [sx, sy] = sitios[k], ex = x + 24 + k * 4 - k * 10 + 10, ey = y + 1;
    entradas.push([ex, ey]);
    if (p < 0.7) { const g = f_lim(p / 0.7), ang = g * 2.4, px = sx + g * (ex - sx), py = sy + b - Math.sin(g * Math.PI) * 6 + g * g * (ey - sy);
      const ux = Math.cos(-Math.PI / 2 + ang), uy = Math.sin(-Math.PI / 2 + ang);   // el eje del cuerpo, que gira de pie a cabeza abajo
      for (let i = 0; i < 7; i++) { const qx = Math.round(px + ux * i), qy = Math.round(py + uy * i); R.pset(qx, qy, P.neopreno); R.pset(qx + 1, qy, P.neopreno); if (i > 1 && i < 6) R.pset(qx + 2, qy, i % 2 ? P.botella : P.botellaS); }
      const hx = Math.round(px + ux * 7), hy = Math.round(py + uy * 7); R.pset(hx, hy, P.neopreno); R.pset(hx + 1, hy, P.neopreno); R.pset(hx - 1, hy, hex('#6ac0f0'));
      const fx = Math.round(px - ux * 2), fy = Math.round(py - uy * 2); R.pset(fx, fy, P.amarillo); R.pset(fx - 1, fy, P.amarillo); }
    else if (p < 1) { const q = (p - 0.7) / 0.3; for (let i = 0; i < 9; i++) { const a = -Math.PI * (i / 8), r = 2 + q * 6; R.pset(Math.round(ex + Math.cos(a) * r), Math.round(ey - 1 + Math.sin(a) * r * (1.4 - q)), i % 2 ? P.espuma : P.espumaS); } R.rect(ex - 3, ey, ex + 3, ey, P.espuma); }
    if (p >= 0.7) for (let i = 0; i < 4; i++) { const ph = (t * 1.5 + i * 0.25 + k * 0.5) % 1; R.anillo(ex + Math.round(Math.sin(ph * 9 + i) * 3), ey + 1, 1 + ph * 2, f_mezcla(P.espumaS, P.marT, ph)); }
  }
  return entradas;
}

// la vista del arrecife: el fondo fijo, el cielo vivo, el mar que se mueve, el barco o la lancha y la playa
function f_arrecife(R, t, o, geo) {
  const P = f_P, ep = o.epoca === 2001 ? 2001 : 1885;
  const capa = f_fijo(R, 'arrecife|' + ep, (m) => f_arrecifeFijo(R, m, ep)), m = capa.m;
  R.copiar(capa.b);
  // las nubes: cúmulos lejanos pequeños y lentos, medianos y grandes más rápidos; el nubarrón que llueve sobre los montes
  const cn = [P.nube0, P.nube1, P.nube2];
  for (let k = 0; k < 4; k++) f_nube(R, m, ((k * 100 + 30 + t * 1.2) % 400) - 40, 58 + (k % 2) * 4, 14 + k * 3, k + 20, cn, 0.6);
  for (let k = 0; k < 3; k++) f_nube(R, m, ((k * 140 + 150 + t * 2.6) % 420) - 50, 44 + k * 5, 26 + k * 5, k + 30, cn, 0.85);
  for (let k = 0; k < 2; k++) f_nube(R, m, ((k * 230 + 200 + t * 4.5) % 460) - 70, 40 + k * 5, 44, k + 40, cn);
  f_nubarron(R, m, t, 92 + Math.sin(t * 0.05) * 4);
  // el humo de los fogones del pueblo, que sube y se lo lleva la brisa
  for (const [hx, sem] of [[44, 0], [150, 2]]) for (let k = 0; k < 7; k++) { const ph = (t * 0.22 + k / 7 + sem * 0.3) % 1, x = hx + ph * 14 + Math.sin(t * 0.8 + k + sem) * 1.5, y = f_costa(hx) - 11 - ph * 22, r = 1 + ph * 2.2;
    if (ph < 0.9) f_discoM(R, m, x, y, r, f_mezcla(P.nubarron2, P.blanco, 0.3 + ph * 0.4), m[Math.round(y) * 320 + Math.round(x)] === 2 ? 2 : 1); }
  // los delfines que saltan a lo lejos, a la izquierda: lomo gris claro, vientre oscuro y aleta
  { const ph = (t * 0.45) % 3; if (ph < 1) for (let k = 0; k < 3; k++) { const u = ph * 1.3 - k * 0.15; if (u < 0 || u > 1) continue; const x = 22 + k * 11 + u * 24, y = 88 - Math.sin(u * Math.PI) * 7, a = -Math.cos(u * Math.PI);
      for (let i = -4; i <= 4; i++) { const xx = Math.round(x + i), yy = Math.round(y + i * a * 0.45 + (i * i) / 12); R.pset(xx, yy, hex('#9ab0c0')); R.pset(xx, yy + 1, i > 2 ? hex('#2a3a4a') : hex('#5a7084')); }
      R.pset(Math.round(x), Math.round(y) - 1, hex('#5a7084')); R.pset(Math.round(x) - 1, Math.round(y) - 2, hex('#5a7084')); if (u > 0.82 || u < 0.12) for (let i = -2; i <= 2; i++) R.pset(Math.round(x) + i, 90, i % 2 ? P.espumaS : P.espuma); } }
  // los destellos del sol en el agua y el rizado que corre
  for (let k = 0; k < 70; k++) { const y = 74 + Math.round(h(k, 5, 63) * 34), x = Math.round(236 + (h(k, 6, 63) - 0.5) * (8 + (y - 72) * 1.2) + Math.sin(t * 2 + k) * 2), on = Math.sin(t * 5 + k * 2.3) > 0.4;
    if (on && m[y * 320 + x] === 3 && f_reefE(x, y) > 1) { R.pset(x, y, P.blanco); if (k % 3 === 0) R.pset(x + 1, y, P.marTLL); } }
  for (let k = 0; k < 110; k++) { const y = 76 + Math.round(Math.pow(h(k, 7, 64), 0.8) * 100), len = 2 + Math.round((y - 72) / 18), x0 = Math.round(((h(k, 8, 64) * 340 + t * (3 + (y - 72) * 0.08)) % 340) - 10), on = (t * 0.8 + h(k, 9, 64) * 3) % 3 < 2.2;
    if (!on) continue; for (let i = 0; i < len; i++) { const x = x0 + i, j = y * 320 + x; if (x >= 0 && x < 320 && m[j] === 3 && f_reefE(x, y) > 1.15) R.pset(x, y, f_mezcla(R.pget(x, y), P.marTLL, 0.45)); } }
  // la espuma que rompe en el arrecife, ola a ola, de derecha a izquierda
  for (let i = 0; i < capa.info.espuma.length; i++) { const [x, y] = capa.info.espuma[i], ola = Math.sin(t * 1.6 - x * 0.06), alta = Math.max(0, ola);
    if (alta > 0.2) { R.pset(x, y, P.espuma); if (alta > 0.55) { R.pset(x, y - 1, P.espuma); if (h(x, Math.floor(t * 6), 65) > 0.5) R.pset(x, y - 2, P.espumaS); } if (alta > 0.85 && h(x, Math.floor(t * 8), 66) > 0.6) R.pset(x + 1, y - 3, P.espumaS); }
    else if (i % 2) R.pset(x, y, P.espumaS);
    if ((x + Math.floor(t * 4)) % 7 === 0) R.pset(x, y - 3, P.marTLL); }
  // velas lejanas: en 1885 dos balandros de pescadores junto a la costa; en 2001 un yate blanco
  if (ep === 1885) for (const [x0, v, sem] of [[120, 1.1, 0], [30, 0.7, 1]]) { const x = Math.round(((x0 + t * v) % 200)), y = 80 + sem * 3; if (x > 180) continue; R.rect(x - 3, y, x + 3, y, P.troncoD); R.poligono([[x, y - 1], [x, y - 8], [x + 4, y - 1]], P.lona); R.pset(x, y - 8, P.troncoD); }
  else { const x = Math.round(((t * 1.6) % 380) - 30) + 0, y = 74; R.rect(x - 4, y, x + 5, y + 1, P.blanco); R.rect(x - 2, y - 2, x + 2, y - 1, P.blancoS); R.linea(x, y - 9, x, y - 3, P.blancoS); R.poligono([[x + 1, y - 9], [x + 1, y - 3], [x + 5, y - 3]], P.blanco); }
  // los pelícanos que cruzan en fila, y una fragata alta que planea
  { const u = (t % 26) / 26, x0 = -40 + u * 420; for (let k = 0; k < 4; k++) { const x = Math.round(x0 - k * 12), y = 52 + Math.round(Math.sin(t * 1.2 + k * 0.8) * 1.5 + k * 2), bate = Math.sin(t * 7 - k) > 0.5, c = hex('#6a5e52'), cS = hex('#4a4038');
      if (f_tranquilo(x, y) || f_tranquilo(x + 4, y)) continue; R.rect(x - 2, y, x + 2, y, c); R.pset(x + 3, y - 1, hex('#e8e0c8')); R.pset(x + 4, y - 1, hex('#c8a040')); R.pset(x + 5, y, hex('#c8a040'));
      if (bate) { R.pset(x - 1, y - 1, cS); R.pset(x - 2, y - 2, cS); R.pset(x + 1, y - 1, cS); R.pset(x, y - 2, cS); } else { R.rect(x - 5, y - 1, x - 2, y - 1, cS); R.rect(x + 1, y - 1, x + 4, y - 1, cS); } }
    const fx = Math.round(176 + Math.sin(t * 0.15) * 34), fy = 34 + Math.round(Math.cos(t * 0.2) * 4); if (!f_tranquilo(fx - 6, fy) && !f_tranquilo(fx + 6, fy)) { R.linea(fx - 6, fy - 2, fx - 2, fy, P.casco); R.linea(fx - 2, fy, fx, fy - 1, P.casco); R.linea(fx, fy - 1, fx + 2, fy, P.casco); R.linea(fx + 2, fy, fx + 6, fy - 2, P.casco); } }
  // el barco (1885) o la lancha (2001)
  if (ep === 1885) {
    const u = f_lim(o.encalla ?? 0), choque = 0.68, tras = f_suave((u - choque) / 0.06), bob = Math.sin(t * 1.6) * (1 - tras);
    const cx = u < choque ? Math.round(380 - 180 * u / choque) : Math.round(200 - 4 * f_suave((u - choque) / 0.04)), ys = 112;
    const sac = u > choque && u < choque + 0.05 ? Math.round(Math.sin((u - choque) * 400) * 2) : 0;
    const cab = Math.sin(t * 1.3) * 0.012 * (1 - tras) + tras * 0.075 + (u > choque && u < choque + 0.06 ? Math.sin((u - choque) * 160) * 0.02 : 0);
    // el bote, a remolque por la popa con la tripulación dentro; desde 0,8 suelta el cabo y rema hasta la playa
    const bu = f_suave((u - 0.8) / 0.2), bx0 = cx + 62, by0 = ys + 6, bx = Math.round(bx0 + (126 - bx0) * bu), by = Math.round(by0 + (167 - by0) * bu);
    if (bu < 0.05) R.linea(cx + 42, ys - 6, bx - 9, by - 3, P.jarcia);
    f_bote(R, t, bx, by, bu > 0 && bu < 1);
    f_barcoViejo(R, t, cx + sac, ys + Math.round(bob), { cab, esc: tras, sube: Math.round(tras * 3), verga: f_lim((u - 0.74) / 0.12), anda: u < choque ? 1 : 0 });
    // el rociado del choque contra el coral, en la proa
    const sp = (u - choque) / 0.12; if (sp > 0 && sp < 1) for (let k = 0; k < 26; k++) { const a = -Math.PI * (0.15 + 0.7 * h(k, 1, 67)), r = sp * (8 + 14 * h(k, 2, 67)), x = Math.round(cx - 44 + Math.cos(a) * r), y = Math.round(ys - 2 + Math.sin(a) * r + sp * sp * 10); R.pset(x, y, k % 3 ? P.espuma : P.espumaS); }
    // el chapoteo de la verga al caer
    const ch = (u - 0.86) / 0.08; if (ch > 0 && ch < 1) for (let k = 0; k < 14; k++) { const a = -Math.PI * (k / 13), r = 2 + ch * 7; R.pset(Math.round(cx - 62 + Math.cos(a) * r), Math.round(ys - 1 + Math.sin(a) * r * (1.3 - ch)), k % 2 ? P.espuma : P.espumaS); }
    geo.barco = [cx, ys]; geo.bote = [bx, by];
  } else {
    geo.buceadores = f_lancha(R, t, 176, 118, f_lim(o.salto ?? 0));
  }
  f_rocasVivas(R, t, m);
  // la playa en primer término: la ola que sube y baja por la arena con su espuma, el cangrejo y la palmera grande
  for (let x = 0; x < 140; x++) { const yb = f_yPlaya(x), sw = 1.5 + 1.8 * Math.sin(t * 1.1 - x * 0.015), y0 = Math.ceil(yb), y1 = Math.round(yb + sw);
    for (let y = y0; y < y1 && y < 180; y++) R.pset(x, y, f_mezcla(R.pget(x, y), P.marTL, 0.7)); if (y1 < 180) R.pset(x, y1, (x + Math.floor(t * 3)) % 4 ? P.espuma : P.espumaS); if (y1 + 1 < 180 && x % 3 === 0) R.pset(x, y1 + 1, P.mojadaS); }
  { const cx = Math.round(((t * 7) % 160) - 20), cy = 176 - Math.round(Math.abs(Math.sin(t * 0.3)) * 3), pa = Math.floor(t * 10) % 2;
    if (cx > -4 && cx < 130) { R.rect(cx, cy - 2, cx + 3, cy - 1, hex('#d84a2a')); R.pset(cx + 1, cy - 3, P.casco); R.pset(cx + 2, cy - 3, P.casco); R.pset(cx - 1, cy - 3 + pa, hex('#d84a2a')); R.pset(cx + 4, cy - 3 + pa, hex('#d84a2a')); for (const i of [0, 1, 2, 3]) R.pset(cx + i, cy - ((i + pa) % 2), hex('#a83a1a')); } }
  f_palmeraGrande(R, t, 8, 176);
  return geo;
}
// lo de delante en el arrecife: matas de hierba de playa y una enredadera en la esquina, y la cresta de la ola
function f_arrecifeDelante(R, t) {
  const P = f_P;
  for (let k = 0; k < 9; k++) { const x0 = 1 + k * 2 - (k > 5 ? 8 : 0), l = 6 + (k * 5) % 7, sw = Math.sin(t * 2 + k) * 1.4;
    for (let j = 0; j < l; j++) { const u = j / l, x = Math.round(x0 + sw * u * u + (k % 2 ? u * 2 : -u)), y = 179 - j; R.pset(x, y, u > 0.7 ? P.palmaH : k % 3 ? P.palmaL : P.palma); } }
  for (let i = 0; i < 16; i++) { const x = i, y = 178 - Math.round(Math.sin(i * 0.5) * 1.5); R.pset(x, y, P.palmaS); if (i % 4 === 1) { R.disco(x, y - 1, 1.5, P.palma); R.pset(x, y - 2, P.palmaL); } if (i === 9) R.pset(x, y - 2, hex('#e080c0')); }
}

const f_yArena = (x) => 148 + Math.round(3 * Math.sin(x * 0.045 + 1) + 2 * Math.sin(x * 0.11));

function f_fondoFijo(R, m) {
  const { pset } = R, P = f_P, M = (x, y, v) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) m[(y | 0) * 320 + (x | 0)] = v; };
  const ps = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; pset(x, y, c); m[y * 320 + x] = 0; };
  const disco = (cx, cy, r, c) => { for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) { const dx = x + 0.5 - cx, dy = y + 0.5 - cy; if (dx * dx + dy * dy <= r * r) ps(x, y, typeof c === 'function' ? c(x, y, Math.sqrt(dx * dx + dy * dy) / r) : c); } };
  // el agua: clara arriba, honda abajo; la superficie que se ve desde abajo; el arrecife lejano azulado
  const lej = (x) => 118 + Math.round(10 * Math.sin(x * 0.03 + 2) + 6 * Math.sin(x * 0.09) + 3 * h(x >> 3, 0, 71));
  const lej2 = (x) => 102 + Math.round(7 * Math.sin(x * 0.021 + 0.5) + 5 * Math.sin(x * 0.067 + 1) + 2 * h(x >> 2, 1, 71));
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const ya = f_yArena(x), q = f_tranquilo(x, y);
    if (y < ya) { const u = y / 150;
      // un arrecife aún más lejano y pálido, entre el agua y el de delante
      if (y >= lej2(x) && y < lej(x)) { M(x, y, 3); pset(x, y, y - lej2(x) < 1 ? hex('#4aa2bc') : f_rampa([hex('#24809e'), hex('#2a8ca8'), hex('#3a98b2')], 0.7 - (y - lej2(x)) / 30 + (h(x >> 2, y >> 1, 70) - 0.5) * 0.4, x, y)); continue; }
      if (y >= lej(x)) { M(x, y, 3); pset(x, y, y - lej(x) < 1 ? P.lejanoL : f_rampa([P.lejanoS, P.lejano, P.lejanoL], 0.6 - (y - lej(x)) / 40 + (h(x >> 1, y >> 1, 72) - 0.5) * 0.4, x, y)); continue; }
      M(x, y, 1); let c = f_rampa([P.agua0, P.agua1, P.agua2, P.agua3, P.agua4, P.agua5], Math.pow(u, 0.9) + (h(x >> 3, y >> 2, 73) - 0.5) * 0.06, x, y);
      if (!q && y < 7 && Math.sin(x * 0.21 + Math.sin(x * 0.05) * 3 + y * 1.3) > 0.55) c = P.luzS;
      pset(x, y, c);
    } else { M(x, y, 2); const u = (y - ya) / (180 - ya), n = h(x, y, 74);
      let c = f_rampa([P.arenaF0, P.arenaF1, P.arenaF2, P.arenaF3], 0.15 + u * 0.85 + (n - 0.5) * 0.25, x, y);
      if (Math.sin(x * 0.3 + Math.sin(y * 0.9 + x * 0.04) * 2.2 - y * 0.2) > 0.86) c = y > 165 ? P.arenaF1 : P.arenaF0; if (n > 0.985) c = P.arenaFL; pset(x, y, c); } }
  // abanicos y corales lejanos, en silueta azulada sobre el arrecife del fondo
  for (const [fx, fy, r] of [[78, 124, 9], [128, 116, 7], [196, 120, 10], [248, 112, 8]]) for (let a = -2.6; a <= -0.5; a += 0.18) { for (let d = 0; d <= r; d++) { const x = Math.round(fx + Math.cos(a) * d), y = Math.round(fy + Math.sin(a) * d * 1.2); if (m[y * 320 + x] === 1) { pset(x, y, P.lejano); M(x, y, 3); } } }
  // los macizos de roca bajo los corales
  const roca = (x0, x1, top) => { for (let x = x0; x <= x1; x++) { const tt = top(x); for (let y = tt; y < 180; y++) { const n = h(x >> 1, y >> 1, 75); ps(x, y, y - tt < 2 ? P.rocaL : f_rampa([P.rocaS, P.roca, P.rocaL], 0.55 - (y - tt) / 70 + (n - 0.5) * 0.5, x, y)); } } };
  roca(0, 54, (x) => Math.round(122 + Math.pow(x / 54, 2) * 46 + 4 * Math.sin(x * 0.3)));
  roca(262, 319, (x) => Math.round(124 + Math.pow((319 - x) / 57, 2) * 44 + 4 * Math.sin(x * 0.27)));
  // coral cerebro: una cúpula con surcos de laberinto, luz arriba
  const cerebro = (cx, cy, rx, ry) => { for (let y = cy - ry; y <= cy; y++) for (let x = cx - rx; x <= cx + rx; x++) { const dx = (x - cx) / rx, dy = (y - cy) / ry; if (dx * dx + dy * dy > 1) continue;
      const surco = Math.sin(x * 0.95 + Math.sin(y * 0.8) * 2.4) * Math.cos(y * 0.9 + Math.sin(x * 0.4) * 1.6) > 0.45, l = -dy * 0.6 + dx * 0.25; ps(x, y, surco ? P.cerebroS : l > 0.45 ? P.cerebroL : l < -0.1 ? P.cerebroS : P.cerebro); } };
  cerebro(20, 166, 18, 15); cerebro(300, 158, 16, 13); cerebro(52, 176, 8, 6);
  // cuerno de ciervo: ramas naranjas que se abren hacia arriba
  const rama = (x, y, a, l, g, sem) => { for (let d = 0; d < l; d++) { const xx = x + Math.cos(a) * d, yy = y + Math.sin(a) * d; ps(xx, yy, P.cuerno); ps(xx + 1, yy, P.cuernoS); if (d === l - 1) { ps(xx, yy - 1, P.cuernoL); ps(xx - 1, yy, P.cuernoL); } }
    if (g > 0) { const ex = x + Math.cos(a) * l, ey = y + Math.sin(a) * l; rama(ex, ey, a - 0.45 - h(sem, g, 76) * 0.2, l * 0.72, g - 1, sem * 2 + 1); rama(ex, ey, a + 0.4 + h(sem, g, 77) * 0.2, l * 0.68, g - 1, sem * 2 + 2); } };
  rama(40, 140, -1.6, 10, 3, 1); rama(28, 128, -1.9, 8, 2, 3); rama(276, 136, -1.4, 9, 3, 5);
  // esponjas de tubo moradas y amarillas
  const tubo = (x, y, alto, c, cS, cL) => { for (let j = 0; j < alto; j++) for (let i = 0; i < 4; i++) ps(x + i, y - j, i === 0 ? cL : i === 3 ? cS : c); ps(x + 1, y - alto, P.rocaS); ps(x + 2, y - alto, P.rocaS); ps(x, y - alto, cL); ps(x + 3, y - alto, cS); };
  tubo(6, 126, 18, P.tuboM, P.tuboMS, P.tuboML); tubo(11, 128, 12, P.tuboM, P.tuboMS, P.tuboML); tubo(268, 150, 14, P.tuboA, P.tuboAS, P.tuboML); tubo(273, 152, 9, P.tuboA, P.tuboAS, P.tuboML);
  // coral de mesa en el macizo de la derecha
  for (let x = 280; x < 314; x++) { const y = 110 + Math.round(Math.abs(x - 297) * 0.08); ps(x, y, P.mesaL); ps(x, y + 1, P.mesa); ps(x, y + 2, P.mesaS); } for (let y = 113; y < 126; y++) { ps(296, y, P.mesaS); ps(297, y, P.mesa); }
  // pólipos y colores sueltos en las rocas
  for (let k = 0; k < 70; k++) { const lado = k % 2, x = lado ? 264 + Math.round(h(k, 1, 78) * 54) : Math.round(h(k, 1, 78) * 52), y = 130 + Math.round(h(k, 2, 78) * 48); if (m[y * 320 + x] !== 0) continue; const c = [P.rosa, P.verdeC, P.morado, P.amarillo][k % 4]; ps(x, y, c); if (k % 3 === 0) ps(x + 1, y, c); }
  // LOS RESTOS: la quilla cuadrada medio enterrada, con coral encima, pernos y óxido; una cuaderna rota que sube
  const qx0 = 104, qx1 = 238, qy = (x) => 154 + (x - qx0) * -0.02;
  for (let x = qx0; x <= qx1; x++) { const top = Math.round(qy(x)); for (let y = top; y < top + 12; y++) { const v = y - top, n = h(x, y >> 1, 79);
      if (y > f_yArena(x) + 14 - Math.round(3 * Math.sin(x * 0.2)) ) break;
      ps(x, y, v < 3 ? (v === 0 ? P.pecioL : (x % 7 === 0 ? P.pecio : P.pecioL)) : v === 3 ? P.pecioD : (Math.sin(x * 0.4 + v * 1.7) > 0.8 ? P.pecioS : n > 0.85 ? P.pecioL : P.pecio)); } }
  for (let y = 154; y < 166; y++) { ps(qx0, y, P.pecioD); ps(qx0 + 1, y, P.pecioS); }
  for (const bx of [118, 146, 178, 206, 230]) { const by = Math.round(qy(bx)) + 6; ps(bx, by, P.perno); ps(bx + 1, by, P.oxido); for (let j = 1; j < 6; j++) if (h(bx, j, 80) > 0.3) ps(bx + (j > 3 ? 1 : 0), by + j, j < 3 ? P.oxido : P.oxidoS); }
  for (let k = 0; k < 40; k++) { const x = qx0 + 4 + Math.round(h(k, 1, 81) * 128), y = Math.round(qy(x)) - 1 - Math.round(h(k, 2, 81) * 2.5), c = [P.rosa, P.verdeC, P.morado, P.cerebro, P.mesaL][k % 5]; ps(x, y, c); ps(x + 1, y, f_mezcla(c, P.k ?? P.casco, 0.3)); if (k % 4 === 0) { ps(x, y - 1, c); ps(x + 1, y + 1, c); } }
  // la cuaderna: un madero cuadrado que sube torcido y acaba roto, con coral
  for (let j = 0; j < 44; j++) { const u = j / 44, x = Math.round(214 + u * 16 + u * u * 4), y = 154 - j; for (let i = 0; i < 5; i++) ps(x + i, y, i === 0 ? P.pecioL : i === 4 ? P.pecioD : (j % 6 === 0 ? P.pecioS : P.pecio)); }
  for (const [dx, dy] of [[0, 0], [2, -1], [4, 1], [1, -2]]) ps(234 + dx, 110 + dy, P.pecioL);
  for (let k = 0; k < 14; k++) { const j = Math.round(h(k, 3, 82) * 40), x = Math.round(214 + j / 44 * 16 + (j / 44) ** 2 * 4) + (k % 2 ? -1 : 5), y = 154 - j; ps(x, y, [P.rosa, P.verdeC, P.cuerno][k % 3]); ps(x, y - 1, P.cuernoL); }
  // un muñón de otra cuaderna, corto y gastado
  for (let j = 0; j < 12; j++) for (let i = 0; i < 4; i++) ps(150 + Math.round(j * 0.4) + i, 153 - j, i === 0 ? P.pecioL : i === 3 ? P.pecioD : P.pecio);
  // en la arena: una estrella de mar, una caracola, piedras y conchas
  for (let a = 0; a < 5; a++) for (let d = 0; d < 4; d++) ps(68 + Math.round(Math.cos(a * 1.257 - 1.57) * d), 175 + Math.round(Math.sin(a * 1.257 - 1.57) * d * 0.7), d === 3 ? P.cuernoL : P.cuerno);
  disco(252, 174, 3, (x, y, d) => d > 0.7 ? hex('#c87a8a') : hex('#f0b8b0')); ps(256, 174, hex('#f0b8b0')); ps(257, 175, hex('#e8c8c0'));
  for (let k = 0; k < 16; k++) { const x = 60 + Math.round(h(k, 1, 83) * 200), y = 160 + Math.round(h(k, 2, 83) * 18); if (m[y * 320 + x] === 2) { ps(x, y, k % 2 ? P.arenaFL : P.arenaF0); if (k % 3 === 0) ps(x + 1, y, P.arenaF1); } }
  return {};
}
// los peces: un pez de colores de perfil; dir ±1; tipo 0 cirujano amarillo, 1 cirujano azul, 2 loro, 3 sargento, 4 ángel
function f_pez(R, x, y, dir, tipo, t) {
  const P = f_P, X = (i) => Math.round(x + i * dir), cola = Math.floor(t * 6 + x) % 2;
  const def = [[P.amarillo, hex('#c8a010'), 6, 3], [P.azulT, hex('#1a3a9a'), 6, 3], [P.loro, P.loroS, 9, 3], [hex('#e8e070'), P.casco, 6, 3], [hex('#3a6ae0'), P.amarillo, 7, 4]][tipo];
  const [c, cS, l, a] = def;
  for (let i = 0; i < l; i++) { const hh = Math.round(a * Math.sin((i + 0.5) / l * Math.PI)); for (let j = -hh; j <= hh; j++) { let cc = j > 0 ? cS : c; if (tipo === 3 && i % 3 === 1) cc = P.casco; if (tipo === 4 && (i === 0 || j === -hh)) cc = cS; R.pset(X(l / 2 - i), Math.round(y + j * 0.6), cc); } }
  R.pset(X(l / 2 - 1), Math.round(y - 0.6), P.casco); if (tipo === 2) R.pset(X(l / 2), Math.round(y + 0.6), hex('#e8e8d0'));
  for (let j = -2; j <= 2; j++) R.pset(X(-l / 2 - 1 - (Math.abs(j) > 1 ? 1 : 0)), Math.round(y + j * (cola ? 0.8 : 0.5)), cS);
}

// la vista bajo el agua
function f_fondoHaiti(R, t, o, geo) {
  const P = f_P, capa = f_fijo(R, 'fondo', (m) => f_fondoFijo(R, m)), m = capa.m;
  R.copiar(capa.b);
  // UNA pasada: los rayos de sol que bajan inclinados y ondulan, la superficie que riela y la red de luz en la arena
  const B = R.buf, luz = P.luz, luzS = P.luzS;
  for (let y = 0; y < 180; y++) { const fade = Math.pow(Math.max(0, 1 - y / 165), 1.3), f = y * 320;
    for (let x = 0; x < 320; x++) { const i = f + x, mm = m[i]; if (!mm) continue;
      if (mm === 2) { const c = Math.sin(x * 0.42 + 1.7 * Math.sin(y * 0.55 + t * 1.1) + t * 0.7) + Math.sin(y * 0.8 + x * 0.15 + 1.5 * Math.sin(x * 0.23 - t * 0.9)); if (c > 1.25) B[i] = f_mezcla(B[i], P.arenaFL, c > 1.6 ? 0.45 : 0.25); continue; }
      const qz = f_tranquilo(x, y) ? 0.3 : 1;
      const v = x + y * 0.45, r = Math.sin(v * 0.06 + t * 0.25) * 0.5 + Math.sin(v * 0.155 - t * 0.4 + 1.3) * 0.35 + Math.sin(v * 0.023 + t * 0.1 + Math.sin(y * 0.02 + t * 0.3)) * 0.4;
      let a = Math.max(0, r - 0.32) * 1.5 * fade * (mm === 3 ? 0.5 : 1) * qz;
      if (y < 7 && mm === 1) a += Math.max(0, Math.sin(x * 0.23 + t * 1.8 + Math.sin(x * 0.07 - t) * 2 + y)) * 0.5 * qz;
      if (a > f_b4(x, y) * 0.55 + 0.08) B[i] = f_mezcla(B[i], a > 0.55 ? luz : luzS, a > 0.55 ? 0.32 : 0.2); } }
  f_fondoVida(R, t, m);
  // la tortuga que cruza despacio al fondo
  { const u = (t % 50) / 50, x = Math.round(360 - u * 420), y = 66 + Math.round(Math.sin(t * 0.4) * 3), al = Math.sin(t * 1.6);
    if (x > -20 && x < 340) { const tc = f_mezcla(P.tortuga, P.agua2, 0.15), tS = f_mezcla(P.tortugaS, P.agua2, 0.15), tL = f_mezcla(P.tortugaL, P.agua2, 0.15);
      R.poligono([[x - 2, y - 2], [x + 3, y - 2 + Math.round(al * 4)], [x + 6, y - 1]], tS); R.disco(x, y, 5, tc); R.disco(x - 1, y - 1, 3.5, tL); for (const [dx, dy] of [[-2, -1], [1, -2], [2, 1], [-1, 2]]) R.pset(x + dx, y + dy, tS);
      R.disco(x - 7, y, 2, tc); R.pset(x - 8, y - 1, P.casco); R.linea(x + 4, y + 2, x + 7, y + 4 - Math.round(al), tS); } }
  // el banco de peces plateados, que se mueve junto y ondula
  { const lx = ((t * 13) % 460) - 70, ly = 76 + Math.sin(t * 0.6) * 10;
    for (let k = 0; k < 26; k++) { const ox = (h(k, 1, 90) - 0.5) * 50, oy = (h(k, 2, 90) - 0.5) * 22, x = Math.round(lx + ox + Math.sin(t * 2 + k) * 2), y = Math.round(ly + oy + Math.sin(t * 1.4 + ox * 0.08) * 3);
      if (y < 50 || f_tranquilo(x, y) || f_tranquilo(x + 4, y)) continue; const fl = Math.sin(t * 3 + k * 1.3) > 0.8;
      R.pset(x, y, P.plataS); R.pset(x + 1, y, fl ? P.blanco : P.plata); R.pset(x + 2, y, P.plata); R.pset(x + 3, y, P.plataS); R.pset(x + 1, y + 1, P.plataS); R.pset(x - 1, y - 1, P.plataS); R.pset(x - 1, y + 1, P.plataS); R.pset(x + 2, y - 1, hex('#5a7a90')); } }
  // los peces de colores, cada uno a su paso
  for (const [k, v, y0, tipo] of [[0, 9, 104, 0], [1, -6, 128, 1], [2, 5, 92, 2], [3, -11, 140, 3], [4, 4, 118, 4], [5, 7, 136, 0]]) { const per = 320 + 80; let x = ((h(k, 3, 91) * per + t * Math.abs(v)) % per) - 40; if (v < 0) x = 320 - x; const y = y0 + Math.sin(t * 0.9 + k) * 4; f_pez(R, x, y, v > 0 ? 1 : -1, tipo, t); }
  // los abanicos de mar que se mecen, y las algas
  for (const [fx, fy, r, sem] of [[32, 122, 13, 1], [310, 108, 11, 2], [234, 112, 7, 3]]) { const sw = Math.sin(t * 0.9 + sem) * 0.12;
    for (let a = -2.7; a <= -0.45; a += 0.13) for (let d = 0; d <= r; d++) { const aa = a + sw * d / r, x = Math.round(fx + Math.cos(aa) * d), y = Math.round(fy + Math.sin(aa) * d * 1.15); if (f_tranquilo(x, y)) continue; R.pset(x, y, d % 3 === 0 || d === r ? P.abanico : P.abanicoS); } }
  for (const [ax, ay, l, sem] of [[48, 140, 22, 1], [52, 146, 16, 2], [258, 140, 20, 3], [262, 146, 14, 4], [100, 156, 10, 5], [244, 156, 12, 6]]) for (let j = 0; j < l; j++) { const u = j / l, x = Math.round(ax + Math.sin(t * 1.3 + sem + j * 0.25) * u * 4), y = ay - j; R.pset(x, y, u > 0.8 ? P.algaL : P.alga); if (j % 3 === 0) R.pset(x + 1, y, P.algaS); }
  // la nieve marina y las burbujas que suben de los corales
  for (let k = 0; k < 44; k++) { const x = Math.round((h(k, 4, 92) * 330 + Math.sin(t * 0.5 + k) * 6 + t * 1.5) % 330) - 5, y = Math.round((h(k, 5, 92) * 190 + t * (1.2 + h(k, 6, 92) * 1.5)) % 190) - 5; if (!f_tranquilo(x, y)) R.pset(x, y, k % 3 ? P.luzS : P.luz); }
  for (const [bx, by, k] of [[16, 120, 0], [292, 106, 1]]) for (let i = 0; i < 4; i++) { const ph = (t * 0.35 + i * 0.25 + k * 0.4) % 1, x = bx + Math.round(Math.sin(ph * 12 + i) * 2), y = Math.round(by - ph * 70); if (!f_tranquilo(x, y)) R.anillo(x, y, 1 + ph, P.luz); }
  if (Array.isArray(o.burbujas)) { const [bx, by] = o.burbujas; for (let i = 0; i < 9; i++) { const ph = (t * 0.6 + i / 9) % 1, x = Math.round(bx + Math.sin(ph * 14 + i) * (1 + ph * 3)), y = Math.round(by - ph * (by - 4)); if (!f_tranquilo(x, y)) { R.anillo(x, y, 1 + ph * 2, P.luz); R.pset(x - 1, y - 1, P.blanco); } } }
  // el trozo de madera suelto en la arena (lo coge el buzo)
  if (o.madera !== false) { const [mx, my] = geo.madera; R.rect(mx - 8, my - 4, mx + 7, my + 1, P.casco); R.rect(mx - 7, my - 3, mx + 6, my, P.pecio); R.rect(mx - 7, my - 3, mx + 6, my - 3, P.pecioL); R.rect(mx - 7, my, mx + 6, my, P.pecioD); R.rect(mx - 8, my - 3, mx - 8, my, P.anillo0); R.pset(mx - 8, my - 2, P.anillo1); R.pset(mx - 2, my - 4, P.rosa); R.pset(mx + 3, my - 4, P.verdeC); R.pset(mx, my - 2, P.pecioS); for (let i = -9; i <= 8; i++) R.pset(mx + i, my + 2, P.arenaF0);
    if (Math.sin(t * 2.2) > 0.6) { R.pset(mx + 4, my - 5, P.blanco); R.pset(mx + 3, my - 5, P.luz); R.pset(mx + 5, my - 5, P.luz); R.pset(mx + 4, my - 6, P.luz); R.pset(mx + 4, my - 4, P.luz); } }
  // los anillos del corte: el círculo con su marco, unido con puntos a la madera, y los anillos que se encienden
  const an = f_lim(o.anillos ?? 0);
  if (an > 0) { const A = geo.anillos, [cx, cy] = A.centro, rr = A.r * f_suave(an / 0.08), N = 11, encendidos = A.umbrales.filter((u) => an >= u).length, todos = an >= A.todos;
    const [mx, my] = geo.madera; for (let k = 0; k < 14; k++) { const u = k / 14, x = Math.round(cx + (mx - cx) * u), y = Math.round(cy + rr + 3 + (my - 6 - cy - rr - 3) * u); if (k % 2 === 0 && rr > 20) R.pset(x, y, P.blanco); }
    R.disco(cx, cy, rr + 3, P.casco); R.disco(cx, cy, rr + 2, P.blanco); R.disco(cx, cy, rr + 1, P.cortezaS);
    R.disco(cx, cy, rr, (x, y, d) => { const a = Math.atan2(y - cy, x - cx), dd = d + 0.025 * Math.sin(a * 5 + 1) + 0.015 * Math.sin(a * 11); if (dd > 0.9) return h(x, y, 93) > 0.5 ? P.corteza : P.cortezaS; if (dd < 0.07) return P.anillo1;
      const k = Math.min(N - 1, Math.floor((dd - 0.07) / 0.83 * N)), fr = ((dd - 0.07) / 0.83 * N) % 1, oscuro = fr > 0.72, lit = k < encendidos, ult = todos && k === N - 1;
      if (ult) return Math.sin(t * 10) > 0 ? P.blanco : P.anilloL; if (lit) return oscuro ? hex('#c88a3a') : k === encendidos - 1 ? P.blanco : P.anilloL; return oscuro ? P.anillo1 : (h(x >> 1, y, 94) > 0.85 ? P.anillo1 : P.anillo0); });
    R.pset(Math.round(cx - rr * 0.4), Math.round(cy - rr * 0.6), P.blanco);
    if (todos && rr >= A.r - 1) { const [nx, ny] = A.numero; R.linea(Math.round(cx + rr * 0.86), cy + 2, nx - 3, ny - 3, P.anilloL); R.numero('1894', nx, ny, { color: P.anilloL }); }
  }
  return geo;
}
// lo de delante bajo el agua: algas que se mecen en las esquinas de abajo y dos pececillos que pasan
function f_fondoDelante(R, t) {
  const P = f_P;
  for (const [x0, l, sem] of [[3, 40, 1], [8, 30, 2], [13, 22, 3], [305, 38, 4], [310, 28, 5], [316, 20, 6]]) for (let j = 0; j < l; j++) { const u = j / l, x = Math.round(x0 + Math.sin(t * 1.2 + sem + j * 0.18) * u * 5), y = 179 - j;
    R.pset(x, y, u > 0.85 ? P.algaL : (j + sem) % 4 === 0 ? P.algaS : P.alga); R.pset(x + 1, y, P.algaS); if (j % 5 === 2) { R.pset(x - 1, y - 1, P.algaL); R.pset(x + 2, y + 1, P.alga); } }
  for (let k = 0; k < 2; k++) { const per = 400, x = ((t * (16 + k * 5) + k * 210) % per) - 40, y = 174 - k * 3; if (x < 30 || x > 290) f_pez(R, x, y, 1, k ? 3 : 0, t); }
}

// resuelve encuadre y cámara con las mismas reglas en hoy() y hoyDelante()
function g_hoyVista(o) { const enc = V_HOY[o.encuadre] ? o.encuadre : 'estudio', e = V_HOY[enc]; return [enc, o.camara === e.cam ? e.cam : 'general']; }

// la paleta del estudio de hoy y la del despacho de 1884
const G_HOY = pal({
  k: '#1c1418', techo: '#efe4d0', techoS: '#e2d5bd', mold: '#faf4e8', moldS: '#d6c9b0', moldD: '#b4a68c',
  papel: '#5c7e76', papelS: '#4e6d66', papelL: '#6a8e85', papelM: '#c9b27c', papelMS: '#94865a',
  friso: '#eae2cf', frisoS: '#cdc2ab', frisoL: '#fffaee', frisoD: '#a99d86',
  roble: '#b47c4a', robleS: '#8c5a32', robleL: '#d29c64', robleD: '#5e3a1e', robleB: '#ecc08a',
  nogal: '#6a4228', nogalS: '#4e2e1a', nogalL: '#8a5a38', nogalD: '#2e1a0e',
  alf: '#9a3a34', alfS: '#6e2626', alfL: '#d8a860', alfA: '#2e4a6a', alfAL: '#5a7aa0',
  piz: '#2f4a3b', pizS: '#283f32', pizL: '#3d5c4a', pizB: '#4d6e5a', tiza: '#f2f0e4', tizaS: '#c4cabe', tizaD: '#8e9c90', rojoX: '#ec4a3a', rojoXS: '#a82a22',
  vid: '#a6d6cc', vidS: '#5e9c92', vidL: '#eafff8', vidD: '#2e5a54',
  mas: '#3a7ac0', masS: '#2a5a98', masL: '#78aee6', masD: '#1e4274',
  corcho: '#c8925a', corchoS: '#946236', corchoL: '#e6b47a',
  te: '#a0602a', teL: '#cc8a48', teS: '#7a4418', porc: '#f6f2ea', porcS: '#d4ccbe', porcA: '#3a6aa8',
  cie0: '#5e9ed6', cie1: '#78b0de', cie2: '#94c2e6', cie3: '#b4d6ec', cie4: '#d6e8f0',
  nube: '#ffffff', nubeS: '#dfe8f2', nubeD: '#aebfd2',
  agua: '#3a6a8c', aguaS: '#2a5272', aguaL: '#78a8cc', aguaB: '#e2f2fa',
  ciu0: '#7e90a6', ciu1: '#9aaabe', ciu2: '#b6c4d4', ciuV: '#eef4f8',
  hoja: '#4a8a3a', hojaS: '#2e6028', hojaL: '#86c050', barro: '#b4643a', barroS: '#84442a', barroL: '#d8865a',
  laton: '#c8a040', latonL: '#f2d278', latonS: '#8a6a20', metal: '#9aa4ae', metalS: '#68727e', metalL: '#d8e0e6',
  luz: '#fff2c8', luzS: '#ffd890', blanco: '#ffffff',
  gato: '#d88a3a', gatoS: '#a8602a', gatoL: '#f4b468', cesta: '#b8925a', cestaS: '#8a6a3a', cestaL: '#d8b47a', cojin: '#4a6a9a',
  cortina: '#c86a4a', cortinaS: '#9a4a34', cortinaL: '#e48c66',
  l1: '#b03a34', l2: '#2e5a8a', l3: '#c8a040', l4: '#3a7a4a', l5: '#7a4a8a', l6: '#d8cbb0', l7: '#2a3a4a', l8: '#c86a3a',
  casco: '#1c1a20', cascoL: '#3a3640', franja: '#e8e4d8', obra: '#8a2a24', tabla: '#c8a878', lona: '#efe6d0', lonaS: '#c8bca0', yugo: '#8a8a86',
});

const G_DOY = pal({
  k: '#120c0c', techo: '#2a2224', techoS: '#221c1e', corn: '#4a3626', cornL: '#6e5236', cornS: '#2e2018',
  pap: '#2c4834', papS: '#22392a', papL: '#3a5c44', papM: '#7a6a3a', papMS: '#5a4e2c',
  mad: '#4a2c1a', madS: '#33200f', madL: '#6a4428', madD: '#1e1208', madB: '#8a5a34',
  marm: '#3a4a44', marmS: '#26322e', marmL: '#5a6e66', marmV: '#8a9e94',
  hierro: '#2a2a2e', hierroL: '#5a5a62', ladr: '#5a2a1e', ladrS: '#3a1a12',
  f0: '#c8401a', f1: '#ff8a2a', f2: '#ffc850', f3: '#fff4b0', brasa: '#a02a10', brasaL: '#e05a20',
  oro: '#c8a040', oroL: '#f2d278', oroS: '#8a6a20',
  cort: '#7a2228', cortS: '#4e1418', cortL: '#a23a3a',
  noc0: '#0a1030', noc1: '#121c44', noc2: '#1c2a58', noc3: '#2a3c6c', luna: '#f6f2dc', lunaS: '#c8c4ae', mar: '#101c38', marL: '#2a3e6e', faro: '#fff2b0', estrella: '#e8ecff',
  nub0: '#2a3460', nub1: '#3e4a7a', nub2: '#8a92b8',
  verde: '#2e8a52', verdeL: '#7ad89a', verdeS: '#1c5634', vidrio: '#e8f0e0',
  hojaP: '#efe6d0', hojaPS: '#c8bca0', hojaPL: '#fffaee', tinta: '#1e1a2a', tintaB: '#5a5a8a',
  alf: '#7a2222', alfS: '#4e1616', alfL: '#c8963e', alfA: '#1e2e50', alfAL: '#3a5486',
  piel: '#5a3220', pielS: '#3a1e12', pielL: '#7e4c30', pielB: '#a06a44',
  noche: '#0a0c1e', calido: '#ffb060', lunaLuz: '#9ab0e0',
  l1: '#6a2a22', l2: '#2a3a5a', l3: '#4a5a2a', l4: '#5a4228', l5: '#8a6a3a', l6: '#3a2a3a', l7: '#7a3a2a', l8: '#2a4a3a',
  gato: '#4a4a52', gatoL: '#7a7a86', gatoB: '#d8d4cc', laton: '#c8a040', latonL: '#f2d278', latonS: '#8a6a20', metal: '#8a929a', metalL: '#d0d8de',
  cuero: '#5a3a24', cueroS: '#3a2414', cueroL: '#7a5232', casco: '#1c1a20', franja: '#e8e4d8', lona: '#efe6d0', porc: '#f2ece0', porcS: '#c8bfae',
});

// umbral de trama ordenada 4×4 (0–1)
const G_HOYB4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const g_hoyB4 = (x, y) => (G_HOYB4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (f = 0 → a, 1 → b)
const g_hoyMez = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// tiñe el píxel (x, y) hacia c
function g_hoyTinta(R, x, y, c, f) { const p = R.pget(x, y); if (p) R.pset(x, y, g_hoyMez(p, c, f)); }

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() y se copia entero en cada fotograma
const G_HOYCAPAS = new Map();

function g_hoyCapa(R, clave, dibuja) {
  let b = G_HOYCAPAS.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.recorte(null); R.usar(prev); G_HOYCAPAS.set(clave, b); }
  R.copiar(b);
}

// tablas de madera en filas horizontales (filas: los bordes de cada fila, de arriba abajo): cada tabla con su tono, sus
// juntas a matajunta, vetas, algún nudo y el filo de luz de arriba
function g_hoyTablas(R, x0, x1, filas, [c, cS, cL, cD], k = 0) {
  for (let f = 0; f + 1 < filas.length; f++) {
    const y0 = filas[f], y1 = filas[f + 1] - 1; let x = x0 - Math.round(h(f, 1, 410 + k) * 40);
    while (x <= x1) { const L = 34 + Math.round(h(x, f, 411 + k) * 46 + (y1 - y0) * 3), tono = h(x, f, 412 + k), cb = tono < 0.25 ? cS : tono > 0.85 ? cL : c;
      for (let y = y0; y <= y1; y++) for (let xx = Math.max(x0, x); xx <= Math.min(x1, x + L - 1); xx++) {
        let col = cb; const v = h(xx >> 3, y * 3 + f, 413 + k);
        if (y === y0) col = cL; else if (y === y1) col = cD; else if (v < 0.16) col = cS; else if (v > 0.93) col = cL;
        R.pset(xx, y, col); }
      if (x >= x0) R.rect(x, y0, x, y1, cD);
      if (h(x, f, 414 + k) < 0.3 && y1 - y0 > 3) { const nx = x + 8 + Math.round(h(x, 2, 415 + k) * (L - 16)), ny = Math.round((y0 + y1) / 2); R.rect(nx - 2, ny, nx + 2, ny, cS); R.pset(nx, ny, cD); }
      x += L; }
  }
}

// el papel pintado del estudio: verde salvia con listas finas y, al tresbolillo, un rombito dorado con su sombra; calma(x,
// y): ahí solo listas (tras Atom)
function g_hoyPapel(R, x0, y0, x1, y1, calma = null, e = 1) {
  const P = G_HOY;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const xs = Math.floor(x / e), ys = Math.floor(y / e); let c = xs % 10 === 0 ? P.papelS : xs % 10 === 5 && (ys & 1) ? P.papelL : P.papel;
    if (h(xs, ys, 420) < 0.035) c = xs % 10 === 0 ? P.papel : P.papelS;
    if (!(calma && calma(x, y))) { const fila = Math.floor(ys / 16), xx = xs + (fila & 1) * 10, i = (xx % 20) - 10, j = (ys % 16) - 8;
      const d = Math.abs(i) + Math.abs(j); if (d <= 2) c = d === 0 ? P.papelM : (i + j > 0 ? P.papelMS : P.papelM); }
    R.pset(x, y, c);
  }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba); respeta el recorte
function g_hoyNube(R, cx, cy, w, [cL, c, cS]) {
  const r = Math.max(2, w * 0.28), B = [[-w * 0.38, 1, r * 0.72], [-w * 0.12, -1, r * 0.95], [w * 0.16, -0.4, r * 0.86], [w * 0.4, 1, r * 0.66]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1, rr, cS);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.9, c);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1, rr * 0.5, cL);
}

// un pájaro (o una gaviota) que bate las alas, de 5 px
function g_hoyPajaro(R, x, y, t, k, c) {
  const a = Math.sin(t * 6 + k * 2.1) > 0 ? -1 : 0; x = Math.round(x); y = Math.round(y);
  R.pset(x, y, c); R.pset(x - 1, y + a, c); R.pset(x + 1, y + a, c); R.pset(x - 2, y + a * 2 - (a ? 0 : -1), c); R.pset(x + 2, y + a * 2 - (a ? 0 : -1), c);
}

// un trazo de tiza: la polilínea pts con algún píxel que se salta (el grano de la tiza) y algún punto suelto al lado
function g_hoyTiza(R, pts, c, k = 0, ancho = 1) {
  for (let i = 0; i + 1 < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[i + 1], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay)));
    for (let s = 0; s <= n; s++) { const x = Math.round(ax + (bx - ax) * s / n), y = Math.round(ay + (by - ay) * s / n), v = h(x, y, 430 + k);
      if (v < 0.12) continue; R.pset(x, y, v < 0.24 ? G_HOY.tizaS : c); if (ancho > 1) R.pset(x + 1, y, v > 0.7 ? c : G_HOY.tizaS); if (v > 0.97) R.pset(x + 1, y + 1, G_HOY.tizaD); } }
}

// ESTUDIO (general): lo fijo
const G_HE = { ventana: [63, 33, 109, 93], piz: [175, 41, 255, 103] };

function g_hoyEstudioFijo(R) {
  const P = G_HOY, { rect, pset, disco, linea, poligono } = R;
  // el techo de yeso (liso bajo el año, con la sombra que se espesa hacia la moldura) y la moldura con dentículos
  for (let y = 0; y <= 20; y++) for (let x = 0; x < 320; x++) pset(x, y, y > 15 && g_hoyB4(x, y) < (y - 15) / 7 ? P.techoS : h(x >> 1, y, 401) < 0.05 ? P.techoS : P.techo);
  rect(0, 21, 319, 21, P.moldD); rect(0, 22, 319, 22, P.mold); for (let x = 0; x < 320; x++) pset(x, 23, (x & 3) < 2 ? P.mold : P.moldS); rect(0, 24, 319, 24, P.moldS); rect(0, 25, 319, 25, P.mold); rect(0, 26, 319, 26, P.moldD);
  // la pared: el papel (solo listas tras Atom), la sombra de la moldura, el friso de cuarterones y el rodapié
  g_hoyPapel(R, 0, 27, 319, 111, (x, y) => x >= 264 && y <= 54);
  for (let y = 27; y <= 31; y++) for (let x = 0; x < 320; x++) if (g_hoyB4(x, y) < (32 - y) / 7) g_hoyTinta(R, x, y, P.k, 0.16);
  rect(0, 112, 319, 112, P.frisoL); rect(0, 113, 319, 113, P.friso); rect(0, 114, 319, 114, P.frisoD); rect(0, 115, 319, 142, P.friso);
  for (let x = 0; x < 320; x++) if (h(x, 3, 403) < 0.5) pset(x, 115, P.frisoS);
  for (let x0 = 2; x0 < 320; x0 += 34) { const x1 = x0 + 28;
    rect(x0, 118, x1, 118, P.frisoD); rect(x0, 118, x0, 139, P.frisoD); rect(x0, 139, x1, 139, P.frisoL); rect(x1, 118, x1, 139, P.frisoL);
    rect(x0 + 3, 121, x1 - 3, 121, P.frisoL); rect(x0 + 3, 121, x0 + 3, 136, P.frisoL); rect(x0 + 3, 136, x1 - 3, 136, P.frisoS); rect(x1 - 3, 121, x1 - 3, 136, P.frisoS);
    for (let y = 122; y < 136; y++) for (let x = x0 + 4; x < x1 - 3; x++) if (h(x >> 1, y, 402) < 0.05) pset(x, y, P.frisoS); }
  rect(0, 143, 319, 143, P.frisoL); rect(0, 144, 319, 146, P.friso); rect(0, 145, 319, 145, P.frisoS); rect(0, 147, 319, 147, P.frisoD);
  // la tarima de roble, la sombra del rodapié y la alfombra (roja con cenefa dorada y campo azul con rombos), con flecos
  g_hoyTablas(R, 0, 319, [148, 151, 155, 160, 166, 173, 180], [P.roble, P.robleS, P.robleL, P.robleD], 404);
  for (let x = 0; x < 320; x++) { pset(x, 148, P.robleD); if (x & 1) pset(x, 149, P.robleS); }
  { const A = (y) => { const u = (y - 157) / 20; return [Math.round(54 - u * 12), Math.round(238 + u * 12)]; };
    for (let y = 157; y <= 177; y++) { const [xa, xb] = A(y), u = (y - 157) / 20;
      for (let x = xa; x <= xb; x++) { const bx = Math.min(x - xa, xb - x), by = Math.min(y - 157, 177 - y); let c;
        if (bx < 2 || by < 1) c = P.alfS; else if (bx < 7 || by < 3) c = ((x + y * 2) % 6 < 3 && bx >= 3 && by >= 1) ? P.alfL : P.alf; else if (bx < 8 || by < 4) c = P.alfL;
        else { const dx = ((x - xa) % 22) - 11, dy = (y - 167) * 1.6, d = Math.abs(dx) + Math.abs(dy); c = d < 2 ? P.alfL : d < 5 ? P.alf : d < 6 ? P.alfL : (x + y) % 3 === 0 && h(x, y, 405) < 0.4 ? P.alfAL : P.alfA; }
        pset(x, y, c); }
      if (y % 2 === 0) { pset(xa - 1, y, P.frisoL); pset(xa - 2, y, P.friso); pset(xb + 1, y, P.frisoL); pset(xb + 2, y, P.friso); } } }
  // LA LIBRERÍA de nogal (x 2–46): baldas de libros sin letras, el globo, el farolillo, la caracola; el helecho de encima
  { const x0 = 2, x1 = 46; for (let y = 146; y <= 150; y++) for (let x = x0 + 2; x <= x1 + 6; x++) if (g_hoyB4(x, y) < 0.5) g_hoyTinta(R, x, y, P.k, 0.25);
    rect(x0, 28, x1, 147, P.k); rect(x0 + 1, 29, x1 - 1, 146, P.nogal); rect(x0 + 3, 31, x1 - 3, 142, P.nogalD); rect(x0 + 1, 29, x0 + 2, 146, P.nogalL); rect(x1 - 2, 29, x1 - 1, 146, P.nogalS);
    rect(x0 - 1, 26, x1 + 1, 28, P.k); rect(x0, 26, x1, 26, P.nogalL); rect(x0 + 1, 143, x1 - 1, 146, P.nogal); rect(x0 + 1, 143, x1 - 1, 143, P.nogalL);
    const COL = [P.l1, P.l2, P.l3, P.l4, P.l5, P.l6, P.l7, P.l8];
    [52, 76, 100, 124, 142].forEach((by, b) => { if (b < 4) { rect(x0 + 3, by, x1 - 3, by + 1, P.nogalL); rect(x0 + 3, by + 1, x1 - 3, by + 1, P.nogalS); for (let x = x0 + 3; x <= x1 - 3; x += 2) pset(x, by + 2, P.k); }
      let x = x0 + 4, n = 0;
      while (x < x1 - 4) { const hueco = (b === 0 && x > 30) || (b === 1 && x > 31) || (b === 2 && x < 18) || (b === 3 && x > 34); if (hueco) { x++; continue; }
        const w = 2 + Math.floor(h(x, b, 406) * 3), a = 10 + Math.floor(h(x, b, 407) * 8), c = COL[(n * 3 + b * 5) % 8], y = by - 1; if (x + w > x1 - 4) break;
        if (h(x, b, 408) < 0.12 && x + 6 < x1 - 4) { linea(x, y, x + 4, y - a + 1, c); linea(x + 1, y, x + 5, y - a + 1, g_hoyMez(c, P.k, 0.3)); x += 7; n++; continue; }
        rect(x, y - a + 1, x + w - 1, y, c); rect(x, y - a + 1, x, y, g_hoyMez(c, P.blanco, 0.25)); if (w > 2) rect(x + w - 1, y - a + 1, x + w - 1, y, g_hoyMez(c, P.k, 0.3));
        rect(x, y - a + 3, x + w - 1, y - a + 3, g_hoyMez(c, P.laton, 0.6)); rect(x, y - 3, x + w - 1, y - 3, g_hoyMez(c, P.k, 0.35)); x += w; n++; } });
    // el globo terráqueo con su peana, el farolillo de barco, la caracola, una caja y una pila de libros tumbados
    rect(34, 49, 42, 50, P.latonS); linea(38, 45, 38, 49, P.laton); disco(38, 41, 5, P.k); disco(38, 41, 4, P.l2); pset(36, 39, P.cie3); for (const [a, b] of [[37, 40], [38, 40], [39, 42], [40, 41], [36, 42]]) pset(a, b, P.hoja); linea(33, 37, 43, 45, P.laton);
    rect(34, 66, 42, 74, P.k); rect(35, 67, 41, 73, P.latonS); rect(36, 68, 40, 72, P.luzS); rect(37, 69, 39, 71, P.luz); rect(35, 64, 41, 65, P.laton); disco(38, 62, 1, P.laton);
    for (let i = 0; i < 9; i++) pset(8 + i, 98 - Math.round(Math.sin(i / 8 * Math.PI) * 4), P.k); for (let i = 1; i < 8; i++) linea(8 + i, 98, 8 + i, 98 - Math.round(Math.sin(i / 8 * Math.PI) * 3), i < 4 ? P.porc : P.porcS); pset(12, 95, P.barroL);
    rect(30, 116, 42, 123, P.k); rect(31, 117, 41, 123, P.cesta); rect(31, 117, 41, 117, P.cestaL); rect(34, 119, 38, 120, P.cestaS);
    rect(6, 133, 26, 135, P.l2); rect(7, 136, 25, 138, P.l1); rect(5, 139, 27, 141, P.l4); rect(6, 133, 26, 133, P.l6); rect(7, 136, 25, 136, P.l6);
    // el helecho encima, colgando
    rect(8, 21, 18, 25, P.barro); rect(7, 20, 19, 21, P.barroL); rect(8, 25, 18, 25, P.barroS);
    for (let k = 0; k < 9; k++) { const a = -2.7 + k * 0.6, l = 8 + (k % 3) * 3; for (let i = 0; i < l; i++) { const x = 13 + Math.cos(a) * i * 1.1, y = 20 + Math.sin(a) * i * 0.4 + i * i * 0.09 - 2; if (y < 21 && x > 19) continue; pset(Math.round(x), Math.round(y), i % 3 ? P.hoja : P.hojaL); if (i % 2) pset(Math.round(x), Math.round(y) + 1, P.hojaS); } } }
  // LA VENTANA (el hueco queda para la vista), el alféizar, las cortinas recogidas con su abrazadera y la barra
  { const [a, b, c, d] = G_HE.ventana;
    rect(a - 5, b - 5, c + 5, d + 5, P.k); rect(a - 4, b - 4, c + 4, d + 4, P.mold); rect(a - 4, b - 4, c + 4, b - 4, P.blanco); rect(c + 3, b - 3, c + 4, d + 4, P.moldS); rect(a - 1, b - 1, c + 1, d + 1, P.moldS);
    rect(a - 9, d + 3, c + 9, d + 7, P.k); rect(a - 8, d + 4, c + 8, d + 5, P.mold); rect(a - 8, d + 4, c + 8, d + 4, P.blanco); rect(a - 8, d + 6, c + 8, d + 6, P.moldD);
    for (let x = a - 8; x <= c + 8; x++) if (g_hoyB4(x, d + 8) < 0.5) g_hoyTinta(R, x, d + 8, P.k, 0.2);
    // un cactus y un cuenco de conchas en el alféizar
    rect(a + 1, d - 4, a + 7, d + 2, P.k); rect(a + 2, d - 3, a + 6, d + 2, P.barro); rect(a + 2, d - 3, a + 6, d - 3, P.barroL); rect(a + 3, d - 11, a + 5, d - 4, P.hojaS); rect(a + 3, d - 11, a + 3, d - 4, P.hojaL); rect(a + 6, d - 9, a + 7, d - 7, P.hojaS); pset(a + 4, d - 12, P.cortinaL);
    for (const [x0, s] of [[a - 13, 1], [c + 4, -1]]) for (let y = b - 7; y <= 110; y++) { const at = Math.abs(y - 72) < 2, w = at ? 4 : y < 72 ? 7 - Math.round((y - b) * 0.02) : Math.min(9, 5 + (y - 72) * 0.1);
      for (let i = 0; i <= w; i++) { const x = s > 0 ? x0 + i : x0 + 8 - i, f = Math.sin(i * 1.4 + y * 0.03 + (s > 0 ? 0 : 1)); pset(x, y, at ? P.laton : i === 0 || i === Math.round(w) ? P.cortinaS : f > 0.5 ? P.cortinaL : f < -0.45 ? P.cortinaS : P.cortina); } }
    rect(a - 15, b - 9, c + 15, b - 8, P.k); rect(a - 14, b - 9, c + 14, b - 9, P.laton); disco(a - 15, b - 9, 1, P.latonL); disco(c + 15, b - 9, 1, P.latonL);
    // los travesaños (se repintan encima de la vista en cada fotograma)
  }
  // LA CARTA NÁUTICA enmarcada sobre el escritorio: mar azul con su retícula, la costa, el rumbo de puntos y la rosa
  { const x0 = 124, y0 = 44, x1 = 166, y1 = 80; for (let x = x0 + 2; x <= x1 + 2; x++) pset(x, y1 + 2, g_hoyMez(P.papel, P.k, 0.35)); for (let y = y0 + 2; y <= y1 + 2; y++) pset(x1 + 2, y, g_hoyMez(P.papel, P.k, 0.35));
    linea(x0 + 10, y0 - 1, (x0 + x1) >> 1, y0 - 7, P.k); linea(x1 - 10, y0 - 1, (x0 + x1) >> 1, y0 - 7, P.k); disco((x0 + x1) >> 1, y0 - 7, 1, P.laton);
    rect(x0, y0, x1, y1, P.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, P.nogalL); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, P.robleL); rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, P.k);
    for (let y = y0 + 4; y <= y1 - 4; y++) for (let x = x0 + 4; x <= x1 - 4; x++) { const costa = x < x0 + 12 + Math.sin(y * 0.4) * 2 + (y > y0 + 20 ? 4 : 0) || (x > x1 - 12 + Math.sin(y * 0.5 + 1) * 2 && y > y0 + 12);
      pset(x, y, costa ? ((x + y) % 5 === 0 ? P.robleL : P.l6) : (x - x0) % 8 === 0 || (y - y0) % 8 === 0 ? P.cie2 : (x + y) % 7 === 0 ? P.cie1 : P.cie3); }
    for (let i = 0; i < 9; i++) pset(x0 + 13 + i * 2, y0 + 26 - Math.round(Math.sin(i * 0.4) * 8), P.rojoX);
    { const cx = x1 - 17, cy = y0 + 12; linea(cx - 4, cy, cx + 4, cy, P.k); linea(cx, cy - 4, cx, cy + 4, P.k); pset(cx - 1, cy - 1, P.rojoX); pset(cx + 1, cy + 1, P.k); pset(cx, cy - 4, P.rojoX); } }
  // EL APARADOR bajo la ventana (x 56–120, tablero y 114) con sus dos puertas, su balda de libros y las patas
  { const x0 = 56, x1 = 120;
    for (let y = 148; y <= 151; y++) for (let x = x0; x <= x1 + 6; x++) if (g_hoyB4(x, y) < 0.6) g_hoyTinta(R, x, y, P.k, 0.3);
    rect(x0 - 2, 113, x1 + 2, 117, P.k); rect(x0 - 1, 114, x1 + 1, 115, P.robleL); rect(x0 - 1, 114, x1 + 1, 114, P.robleB); rect(x0 - 1, 116, x1 + 1, 116, P.robleS);
    rect(x0, 118, x1, 147, P.k); rect(x0 + 1, 118, x1 - 1, 146, P.roble); rect(x0 + 1, 118, x1 - 1, 119, P.robleS);
    for (const [a, b] of [[x0 + 3, x0 + 30], [x0 + 34, x1 - 3]]) { rect(a, 121, b, 143, P.robleD); rect(a + 1, 122, b - 1, 142, P.roble); rect(a + 3, 124, b - 3, 140, P.robleS); rect(a + 4, 125, b - 4, 139, P.roble); rect(a + 4, 125, b - 4, 125, P.robleL); rect(a + 4, 125, a + 4, 139, P.robleL);
      for (let y = 126; y < 139; y++) for (let x = a + 5; x < b - 4; x++) if (h(x >> 2, y, 409) < 0.15) pset(x, y, P.robleS); }
    rect(x0 + 29, 130, x0 + 29, 134, P.latonS); rect(x0 + 35, 130, x0 + 35, 134, P.latonS); pset(x0 + 29, 130, P.latonL); pset(x0 + 35, 130, P.latonL);
    rect(x0 + 1, 145, x1 - 1, 146, P.robleS); rect(x0 + 2, 147, x0 + 4, 149, P.k); rect(x1 - 4, 147, x1 - 2, 149, P.k);
    // dos libros y un catalejo de latón en el tablero, a los lados de la botella
    rect(x0 + 1, 109, x0 + 9, 113, P.k); rect(x0 + 2, 110, x0 + 8, 110, P.l1); rect(x0 + 2, 111, x0 + 8, 111, P.l6); rect(x0 + 2, 112, x0 + 8, 112, P.l2);
    linea(x1 - 14, 112, x1 - 2, 109, P.k); linea(x1 - 14, 113, x1 - 2, 110, P.latonS); linea(x1 - 13, 111, x1 - 3, 109, P.latonL); rect(x1 - 6, 109, x1 - 5, 112, P.laton); }
  // EL BARCO EN LA BOTELLA (canon) en su soporte (el brillo que la recorre va aparte)
  { const cx = 88, cy = 106, rb = 7;
    rect(70, 113, 104, 113, P.nogalS); rect(70, 112, 104, 112, P.nogalL); for (const x of [74, 100]) { rect(x - 2, 110, x + 2, 112, P.nogal); pset(x - 2, 110, P.nogalL); } rect(85, 112, 90, 112, P.latonL);
    // la jarcia y el barquito antes que el vidrio
    for (let y = cy - rb; y <= cy + rb; y++) for (let x = 66; x <= 108; x++) { const dy = Math.abs(y - cy), dentro = x < 70 ? (x - 70) ** 2 / 16 + dy * dy / (rb * rb) <= 1 : x <= 104 ? dy <= rb : dy <= rb - Math.round((x - 104) * 1.2);
      if (dentro) pset(x, y, y > cy + 3 + Math.round(Math.sin(x * 0.9)) ? P.mas : g_hoyMez(P.papel, P.vid, 0.45)); }
    rect(76, 106, 96, 108, P.casco); rect(77, 109, 95, 109, P.casco); rect(76, 106, 96, 106, P.franja); rect(78, 105, 94, 105, P.tabla);
    linea(96, 106, 101, 104, P.nogalS); linea(82, 105, 82, 99, P.nogalS); linea(90, 105, 90, 99, P.nogalS); rect(88, 100, 92, 103, P.lona); rect(80, 101, 84, 104, P.lona); linea(91, 100, 99, 104, P.lonaS);
    for (let x = 66; x <= 108; x++) { const r = x < 70 ? Math.round(rb * Math.sqrt(Math.max(0, 1 - (x - 70) ** 2 / 16))) : x <= 104 ? rb : rb - Math.round((x - 104) * 1.2); if (r <= 0) continue; pset(x, cy - r, P.vidD); pset(x, cy + r, P.vidD); if (x > 70 && x < 102) pset(x, cy - r + 1, x % 9 < 6 ? P.vidL : P.vid); }
    pset(66, cy, P.vidD); rect(108, cy - 3, 111, cy + 3, P.k); rect(108, cy - 2, 110, cy + 2, P.corcho); rect(108, cy - 2, 110, cy - 2, P.corchoL); rect(109, cy + 1, 110, cy + 2, P.corchoS); }
  // EL ESCRITORIO (x 122–168, tablero y 118): el tablero, el cajón, las patas torneadas y su sombra
  { const x0 = 122, x1 = 168;
    for (let y = 148; y <= 151; y++) for (let x = x0 + 2; x <= x1 + 6; x++) if (g_hoyB4(x, y) < 0.5) g_hoyTinta(R, x, y, P.k, 0.25);
    rect(x0 - 1, 117, x1 + 1, 121, P.k); rect(x0, 118, x1, 119, P.robleL); rect(x0, 118, x1, 118, P.robleB); rect(x0, 120, x1, 120, P.robleS);
    rect(x0 + 2, 122, x1 - 2, 128, P.k); rect(x0 + 3, 122, x1 - 3, 127, P.roble); rect(x0 + 12, 123, x1 - 12, 126, P.robleS); rect(x0 + 13, 123, x1 - 13, 123, P.robleL); rect(((x0 + x1) >> 1) - 2, 125, ((x0 + x1) >> 1) + 2, 125, P.laton);
    for (const x of [x0 + 2, x1 - 5]) { rect(x, 128, x + 3, 149, P.k); rect(x + 1, 128, x + 2, 148, P.roble); rect(x + 1, 128, x + 1, 148, P.robleL); for (const y of [134, 142]) rect(x, y, x + 3, y + 1, P.robleS); }
    rect(x0 + 5, 138, x1 - 5, 139, P.robleS);
    // los papeles, la lupa, el tintero con su pluma, un cuaderno y el flexo
    poligono([[x0 + 4, 117], [x0 + 22, 117], [x0 + 20, 115], [x0 + 6, 115]], P.porc); rect(x0 + 8, 116, x0 + 18, 116, P.porcS);
    disco(134, 114, 3, P.k); disco(134, 114, 2, P.vid); pset(133, 113, P.vidL); linea(137, 116, 142, 117, P.k); linea(137, 115, 142, 116, P.nogalL);
    rect(146, 111, 151, 117, P.k); rect(147, 112, 150, 117, P.vidS); rect(147, 114, 150, 117, P.k); rect(147, 112, 150, 112, P.vidL); rect(147, 110, 150, 111, P.latonS); linea(149, 110, 154, 102, P.k); linea(150, 110, 155, 102, P.l2); pset(155, 101, P.latonL);
    // el flexo: el pie, los dos brazos, el muelle y la cabeza que alumbra la mesa
    rect(124, 115, 130, 117, P.k); rect(125, 115, 129, 116, P.metalS); linea(127, 115, 131, 96, P.k); linea(128, 115, 132, 96, P.metal); linea(131, 96, 143, 92, P.k); linea(131, 97, 143, 93, P.metal); disco(131, 96, 1, P.latonS);
    poligono([[141, 90], [148, 94], [144, 100], [138, 96]], P.k); poligono([[142, 92], [147, 94], [144, 98], [140, 96]], P.l4); pset(142, 92, P.hojaL); rect(140, 97, 145, 98, P.luz);
    for (let y = 99; y <= 117; y++) { const u = (y - 99) / 18, xa = Math.round(139 - u * 10), xb = Math.round(146 + u * 14); for (let x = xa; x <= xb; x++) if (g_hoyB4(x, y) < 0.32 - u * 0.12) g_hoyTinta(R, x, y, P.luz, 0.45); } }
  // LA PIZARRA en su caballete: la pata de atrás, el marco de roble, la tiza vieja mal borrada, la repisa con tizas y el
  // borrador, y las dos patas de delante hasta el suelo; luego los cinco dibujos de las teorías
  { const [a, b, c, d] = G_HE.piz;
    for (let y = 151; y <= 154; y++) for (let x = 168; x <= 264; x++) if (g_hoyB4(x, y) < 0.35 && Math.abs(x - 176) < 6 || g_hoyB4(x, y) < 0.35 && Math.abs(x - 256) < 6 || (y === 153 && Math.abs(x - 216) < 5)) g_hoyTinta(R, x, y, P.k, 0.3);
    linea(215, 34, 216, 152, P.nogalS); linea(216, 34, 217, 152, P.nogal);
    rect(a - 4, b - 4, c + 4, d + 4, P.k); rect(a - 3, b - 3, c + 3, d + 3, P.roble); rect(a - 3, b - 3, c + 3, b - 3, P.robleL); rect(a - 3, b - 3, a - 3, d + 3, P.robleL); rect(c + 3, b - 3, c + 3, d + 3, P.robleS); rect(a - 1, b - 1, c + 1, d + 1, P.robleD);
    for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) { const v = h(x >> 2, y >> 1, 440), w = Math.sin((x - a) * 0.09 + (y - b) * 0.05); pset(x, y, v < 0.08 ? P.pizL : w > 0.85 && g_hoyB4(x, y) < 0.4 ? P.pizL : (x + y) % 13 === 0 && v < 0.5 ? P.pizS : P.piz); }
    for (let k = 0; k < 4; k++) { const cx = a + 12 + h(k, 1, 441) * 56, cy = b + 8 + h(k, 2, 441) * 46; for (let i = -9; i <= 9; i++) { const yy = Math.round(cy + Math.sin(i * 0.25 + k) * 3); if (g_hoyB4(cx + i, yy) < 0.4) pset(Math.round(cx + i), yy, P.pizB); } }
    rect(a - 7, d + 4, c + 7, d + 6, P.k); rect(a - 6, d + 4, c + 6, d + 5, P.robleL); rect(a - 6, d + 4, c + 6, d + 4, P.robleB);
    rect(a + 4, d + 2, a + 12, d + 3, P.tiza); rect(a + 15, d + 3, a + 19, d + 3, P.tizaS); rect(a + 22, d + 2, a + 25, d + 3, P.rojoX); rect(c - 22, d + 1, c - 8, d + 3, P.k); rect(c - 21, d + 1, c - 9, d + 1, P.nogalL); rect(c - 21, d + 2, c - 9, d + 3, P.tizaS);
    for (let x = a - 4; x <= c + 4; x++) if (h(x, 1, 442) < 0.25) pset(x, d + 7, P.tizaS);
    for (const [x0, x1] of [[a + 3, a - 3], [c - 3, c + 3]]) { linea(x0, b - 7, x1, 154, P.k); linea(x0 + 1, b - 7, x1 + 1, 154, P.roble); linea(x0 + 2, b - 7, x1 + 2, 154, P.robleS); linea(x0 + 1, b - 7, x0 + 1, b - 5, P.robleL); }
    rect(213, b - 9, 218, b - 4, P.k); rect(214, b - 8, 217, b - 5, P.roble);
    // 1 · el barco pirata: casco, palo, vela hinchada, bandera lisa y unas olas
    const T_ = P.tiza;
    g_hoyTiza(R, [[180, 61], [183, 66], [199, 66], [202, 61], [180, 61]], T_, 0); g_hoyTiza(R, [[191, 61], [191, 46]], T_, 1);
    g_hoyTiza(R, [[185, 49], [197, 49], [199, 54], [197, 58], [185, 58], [186, 54], [185, 49]], T_, 2); for (let y = 45; y <= 47; y++) R.rect(192, y, 196, y, T_); pset(196, 46, P.tizaS);
    for (const x of [184, 189, 194]) pset(x, 63, P.tizaS); g_hoyTiza(R, [[178, 69], [182, 68], [186, 69], [190, 68], [194, 69], [198, 68], [203, 69]], P.tizaS, 3);
    // 2 · el motín: dos muñecos de palitos peleando y la estrella del golpe
    for (const [x, s] of [[211, 1], [227, -1]]) { R.disco(x, 49, 2, T_); R.disco(x, 49, 1, P.piz); g_hoyTiza(R, [[x, 51], [x, 59]], T_, 4); g_hoyTiza(R, [[x, 59], [x - 3, 65]], T_, 5); g_hoyTiza(R, [[x, 59], [x + 3, 65]], T_, 6); g_hoyTiza(R, [[x, 54], [x + 5 * s, 51]], T_, 7); g_hoyTiza(R, [[x, 54], [x - 4 * s, 57]], T_, 8); }
    for (const [dx, dy] of [[0, -3], [0, 3], [-3, 0], [3, 0], [-2, -2], [2, 2], [2, -2], [-2, 2]]) pset(219 + dx, 50 + dy, T_);
    // 3 · el fraude: el papel del seguro con renglones, su sello y el «$»
    g_hoyTiza(R, [[234, 45], [250, 45], [250, 66], [234, 66], [234, 45]], T_, 9); for (const [y, l] of [[49, 12], [52, 10], [55, 12], [58, 7]]) g_hoyTiza(R, [[237, y], [237 + l, y]], P.tizaS, 10 + y);
    R.disco(246, 62, 3, T_); R.disco(246, 62, 2, P.piz); pset(246, 62, T_);
    for (const [i, j] of [[1, 0], [2, 0], [0, 1], [1, 2], [2, 3], [0, 4], [1, 4], [1, -1], [1, 5]]) pset(237 + i, 60 + j, T_);
    // 4 · el monstruo: un tentáculo que sale del agua y se enrosca, con ventosas
    { let px = 0, py = 0; for (let s = 0; s <= 1.0001; s += 0.02) { const x = 190 + s * 12 + Math.sin(s * 5) * 3, y = 100 - s * 18; const w = Math.round(3 - s * 2); for (let i = 0; i <= w; i++) pset(Math.round(x + i), Math.round(y), h(Math.round(x + i), Math.round(y), 443) < 0.15 ? P.tizaS : T_); if (s > 0.15 && Math.round(s * 50) % 6 === 0) pset(Math.round(x + w + 2), Math.round(y), P.tizaS); px = x; py = y; }
      for (let a2 = 0; a2 < 5.5; a2 += 0.12) { const r = 6 - a2 * 0.9; pset(Math.round(px + 3 + Math.cos(a2 + 3.4) * r), Math.round(py - 1 + Math.sin(a2 + 3.4) * r), T_); }
      g_hoyTiza(R, [[182, 101], [188, 100], [196, 101], [204, 100], [210, 101]], P.tizaS, 20); }
    // 5 · la tromba: la nube, el embudo con sus vueltas y la salpicadura abajo
    { for (let i = -12; i <= 12; i++) { pset(233 + i, 76 + Math.round(Math.abs(Math.sin(i * 0.5)) * -2), T_); if (h(i, 1, 444) < 0.5) pset(233 + i, 78, P.tizaS); }
      for (let y = 79; y <= 97; y++) { const u = (y - 79) / 18, w = Math.round(9 - u * 7), xc = 233 + Math.round(Math.sin(u * 3) * 2); pset(xc - w, y, T_); pset(xc + w, y, T_); if (y % 4 === 0) g_hoyTiza(R, [[xc - w + 1, y], [xc + w - 1, y + 1]], P.tizaS, 21 + y); }
      for (const [dx, dy] of [[-4, 0], [-6, -1], [4, 0], [6, -1], [-2, -2], [2, -2], [0, -1]]) pset(234 + dx, 100 + dy, T_); g_hoyTiza(R, [[222, 101], [246, 101]], P.tizaS, 30); } }
  // LA LÁMPARA DE PIE: el halo en la pared, la pantalla de tela con su luz, el pie de latón y su base
  { const lx = 269; R.halo(lx, 66, 26, [g_hoyMez(P.papel, P.luz, 0.12), g_hoyMez(P.papel, P.luz, 0.25), g_hoyMez(P.papel, P.luz, 0.4)], 1.1);
    for (let y = 150; y <= 153; y++) for (let x = lx - 10; x <= lx + 12; x++) if (g_hoyB4(x, y) < 0.5) g_hoyTinta(R, x, y, P.k, 0.25);
    rect(lx - 7, 149, lx + 7, 151, P.k); rect(lx - 6, 149, lx + 6, 150, P.latonS); rect(lx - 6, 149, lx + 6, 149, P.laton); rect(lx, 72, lx + 1, 149, P.latonS); rect(lx, 72, lx, 149, P.latonL); rect(lx - 1, 110, lx + 2, 111, P.laton);
    poligono([[lx - 9, 58], [lx + 10, 58], [lx + 14, 72], [lx - 13, 72]], P.k);
    for (let y = 59; y <= 71; y++) { const u = (y - 58) / 14, xa = Math.round(lx - 8 - u * 4), xb = Math.round(lx + 9 + u * 4); for (let x = xa; x <= xb; x++) { const v = (x - xa) / (xb - xa); pset(x, y, v < 0.2 ? P.luz : v > 0.8 ? P.luzS : (x % 4 === 0 ? P.luzS : P.mold)); } }
    rect(lx - 12, 72, lx + 13, 72, P.laton); rect(lx - 6, 73, lx + 7, 74, P.luz);
    for (let y = 75; y <= 92; y++) { const u = (y - 75) / 17, xa = Math.round(lx - 12 - u * 4), xb = Math.round(lx + 13 + u * 4); for (let x = xa; x <= xb; x++) if (g_hoyB4(x, y) < 0.3 - u * 0.25) g_hoyTinta(R, x, y, P.luz, 0.4); } }
  // LA MANCHA DE SOL de la ventana en la tarima y el aparador (con la cruz de los travesaños)
  for (let y = 150; y <= 178; y++) { const u = (y - 150) / 28, xa = Math.round(124 + u * 30), xb = Math.round(170 + u * 42), mid = Math.round((xa + xb) / 2), cruz = Math.abs(y - 163) < 1;
    for (let x = xa; x <= xb; x++) if (Math.abs(x - mid) > 1 && !cruz && g_hoyB4(x, y) < 0.42) g_hoyTinta(R, x, y, P.luz, 0.32); }
}

// la vista del puerto de hoy por la ventana del estudio, recortada a su hueco: cielo, nubes, gaviotas, la ciudad con
// sus grúas, el agua que brilla, un velero y un remolcador; los travesaños y el reflejo del cristal encima
function g_hoyVistaPuerto(R, t, x0, y0, x1, y1) {
  const P = G_HOY, { pset, linea, disco, poligono } = R, hor = y0 + 40, CIE = [P.cie0, P.cie1, P.cie2, P.cie3, P.cie4];
  // R.rect no respeta el recorte: aquí los rectángulos van con este, recortado a mano al hueco
  const rect = (a, b, c, d, col) => { for (let y = Math.max(b, y0); y <= Math.min(d, y1); y++) for (let x = Math.max(a, x0); x <= Math.min(c, x1); x++) pset(x, y, col); };
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= hor; y++) { const f = (y - y0) / (hor - y0); for (let x = x0; x <= x1; x++) pset(x, y, CIE[Math.max(0, Math.min(4, Math.floor(f * 4.2 + g_hoyB4(x, y) - 0.2)))]); }
  const W = x1 - x0 + 60;
  for (const [y, w, v, k, cols] of [[y0 + 7, 22, 0.7, 0, [P.nube, P.nubeS, P.nubeD]], [y0 + 16, 16, 1.3, 1, [P.nube, P.nubeS, P.nubeD]], [y0 + 24, 12, 2.1, 2, [P.nubeS, P.cie4, P.nubeD]], [y0 + 4, 14, 0.7, 3, [P.nube, P.nubeS, P.nubeD]]]) {
    const cx = x0 - 30 + ((h(k, 1, 450) * W + t * v) % W); g_hoyNube(R, cx, y, w, cols); }
  for (let k = 0; k < 3; k++) { const u = ((t * (5 + k * 2) + k * 31) % (W + 20)), x = x0 - 20 + u, y = y0 + 12 + k * 6 + Math.sin(t * 0.8 + k) * 2; g_hoyPajaro(R, x, y, t, k, k === 1 ? P.ciu0 : P.blanco); }
  // la ciudad lejana: dos capas de edificios con ventanas que brillan y dos grúas del puerto
  for (let x = x0; x <= x1; x++) { const a = Math.round(9 + h(x >> 2, 1, 451) * 11 + (x > x0 + 30 && x < x0 + 36 ? 8 : 0)); for (let y = hor - a; y <= hor; y++) pset(x, y, (x & 3) === 2 && y % 3 === 0 && y > hor - a + 1 ? P.ciu1 : P.ciu2); pset(x, hor - a, P.ciuV); }
  for (let x = x0; x <= x1; x++) { const a = Math.round(4 + h(x >> 3, 2, 452) * 9); for (let y = hor - a; y <= hor; y++) pset(x, y, (x & 3) === 1 && (y & 1) && h(x, y, 453) < 0.4 ? P.ciuV : P.ciu1); }
  for (const [gx, k] of [[x0 + 8, 0], [x0 + 38, 1]]) { linea(gx, hor, gx, hor - 22, P.ciu0); linea(gx + 1, hor, gx + 1, hor - 22, P.ciu0); const g = Math.sin(t * 0.3 + k * 2) * 2; linea(gx - 6, hor - 21, gx + 10, hor - 21, P.ciu0); linea(gx - 5, hor - 20, gx + 1, hor - 22, P.ciu0); linea(gx + Math.round(6 + g), hor - 21, gx + Math.round(6 + g), hor - 15, P.ciu0); rect(gx + Math.round(5 + g), hor - 15, gx + Math.round(7 + g), hor - 14, P.rojoXS); pset(gx, hor - 23, Math.sin(t * 3 + k) > 0.6 ? P.rojoX : P.ciu0); }
  // el agua: franjas con brillos que corren, más grandes cuanto más cerca
  for (let y = hor + 1; y <= y1; y++) { const u = (y - hor) / (y1 - hor); for (let x = x0; x <= x1; x++) { const s = Math.sin(x * (0.5 - u * 0.3) + t * (1.2 + u) + y * 1.7); pset(x, y, s > 0.82 ? (u < 0.3 ? P.aguaB : P.aguaL) : s < -0.6 ? P.aguaS : u < 0.25 ? P.aguaL : P.agua); } }
  // el velero que cruza despacio y el remolcador con su humo
  { const vx = x0 - 12 + ((t * 2.2) % (x1 - x0 + 30)), vy = hor + 6 + Math.round(Math.sin(t * 1.4)); rect(vx - 4, vy, vx + 4, vy + 1, P.blanco); rect(vx - 3, vy + 2, vx + 3, vy + 2, P.aguaS); linea(vx, vy - 1, vx, vy - 10, P.ciu0); poligono([[vx + 1, vy - 10], [vx + 1, vy - 1], [vx + 6, vy - 1]], P.blanco); poligono([[vx - 1, vy - 8], [vx - 1, vy - 1], [vx - 4, vy - 1]], P.nubeS); }
  { const rx = x1 + 14 - ((t * 3.4) % (x1 - x0 + 34)), ry = hor + 14 + Math.round(Math.sin(t * 1.8 + 1)); rect(rx - 6, ry, rx + 5, ry + 2, P.rojoXS); rect(rx - 6, ry + 2, rx + 5, ry + 2, P.k); rect(rx - 3, ry - 3, rx + 1, ry - 1, P.blanco); rect(rx - 1, ry - 5, rx, ry - 4, P.k);
    for (let i = 0; i < 6; i++) { const yy = ry - 6 - i * 2, xx = rx + i * 2 + Math.round(Math.sin(t * 2 + i)); if (g_hoyB4(xx, yy) < 0.8 - i * 0.12) { pset(xx, yy, P.nubeS); pset(xx + 1, yy, P.nubeD); } }
    for (let i = 1; i < 8; i++) if ((i + Math.floor(t * 6)) % 2) pset(rx + 5 + i, ry + 2 + (i > 4 ? 1 : 0), P.aguaB); }
  R.recorte(null);
  // los travesaños, el reflejo del cristal y la masilla
  R.rect(85, y0, 87, y1, P.mold); R.rect(85, y0, 85, y1, P.blanco); R.rect(87, y0, 87, y1, P.moldS); R.rect(x0, 62, x1, 63, P.mold); R.rect(x0, 62, x1, 62, P.blanco);
  for (let k = 0; k < 2; k++) for (let i = 0; i < 18 - k * 6; i++) { const x = x0 + 4 + k * 26 + i, y = y0 + 24 - i; if (y >= y0 && x <= x1 && (x < 85 || x > 87)) g_hoyTinta(R, x, y, P.blanco, 0.35); }
}

// el gato dormido en su cesta (respira, la cola se mueve y una oreja da un respingo); (x, y): el centro de la cesta
function g_hoyGato(R, x, y, t) {
  const P = G_HOY, { rect, disco, pset, linea } = R, resp = Math.sin(t * 2.1) > 0.3 ? 1 : 0;
  for (let i = -15; i <= 15; i++) if (g_hoyB4(x + i, y + 6) < 0.6) g_hoyTinta(R, x + i, y + 6, P.k, 0.3);
  rect(x - 14, y - 2, x + 14, y + 5, P.k); for (let j = -1; j <= 4; j++) for (let i = -13; i <= 13; i++) pset(x + i, y + j, ((i + j * 2) & 3) === 0 ? P.cestaS : j === -1 ? P.cestaL : P.cesta);
  disco(x, y - 3, 11, P.k); R.rect(x - 12, y - 2, x + 12, y - 2, P.k); disco(x, y - 3, 10, P.cojin); rect(x - 13, y - 3, x + 13, y - 2, P.cestaL);
  disco(x - 1, y - 6 - resp, 7, P.k); disco(x - 1, y - 6 - resp, 6, P.gato); disco(x - 3, y - 8 - resp, 3, P.gatoL); for (let i = -4; i <= 4; i += 3) linea(x + i, y - 11 - resp, x + i + 1, y - 7 - resp, P.gatoS);
  disco(x + 6, y - 5, 4, P.k); disco(x + 6, y - 5, 3, P.gato); pset(x + 5, y - 5, P.k); pset(x + 7, y - 5, P.k); pset(x + 6, y - 3, P.gatoL);
  const oreja = (t % 5) < 0.25 ? 1 : 0; pset(x + 4, y - 9 - oreja, P.k); pset(x + 4, y - 8, P.gatoS); pset(x + 8, y - 9, P.k); pset(x + 8, y - 8, P.gatoS);
  const c = Math.sin(t * 1.3) * 2.5; for (let i = 0; i < 7; i++) { const xx = x - 8 - i + Math.round(i > 3 ? c * (i - 3) / 3 : 0), yy = y - 2 + Math.round(i * 0.3); pset(xx, yy, i > 4 ? P.gatoL : P.gato); pset(xx, yy + 1, P.k); }
}

// el ficus de hoja grande en su maceta, junto a la lámpara; las hojas se mecen con el aire de la ventana
function g_hoyFicus(R, x, suelo, t) {
  const P = G_HOY, { rect, pset, linea } = R;
  for (let i = -9; i <= 9; i++) if (g_hoyB4(x + i, suelo + 1) < 0.6) g_hoyTinta(R, x + i, suelo + 1, P.k, 0.3);
  rect(x - 8, suelo - 16, x + 8, suelo, P.k); rect(x - 7, suelo - 15, x + 7, suelo - 1, P.porc); rect(x - 7, suelo - 15, x - 5, suelo - 1, P.blanco); rect(x + 5, suelo - 15, x + 7, suelo - 1, P.porcS); rect(x - 7, suelo - 11, x + 7, suelo - 10, P.porcA);
  rect(x - 9, suelo - 17, x + 9, suelo - 16, P.k); rect(x - 6, suelo - 17, x + 6, suelo - 17, P.robleD);
  linea(x, suelo - 17, x - 1, suelo - 60, P.nogal); linea(x + 1, suelo - 17, x, suelo - 60, P.nogalS);
  for (let k = 0; k < 11; k++) { const ya = suelo - 24 - k * 4, lado = k % 2 ? 1 : -1, m = Math.round(Math.sin(t * 1.6 + k * 0.9) * (k > 6 ? 1.4 : 0.7)), lx = x + lado * (5 + (k % 3)) + m, ly = ya - 2;
    if (lx > 316) continue; linea(x, ya, lx, ly, P.hojaS);
    for (let j = -3; j <= 3; j++) for (let i = -4; i <= 4; i++) if ((i / 4.2) ** 2 + (j / 3) ** 2 < 1) pset(lx + i, ly + j, j < 0 && i * lado < 1 ? P.hojaL : j > 1 ? P.hojaS : P.hoja);
    linea(lx - 3 * lado, ly + 1, lx + 3 * lado, ly - 1, P.hojaS); }
}

// EL ESTUDIO (general): lo fijo del búfer y, encima, lo que se mueve
function g_hoyEstudio(R, t, o = {}) {
  const P = G_HOY, { pset, rect, disco, linea } = R, [a, b, c, d] = G_HE.piz;
  g_hoyCapa(R, 'estudio', () => g_hoyEstudioFijo(R));
  g_hoyVistaPuerto(R, t, ...G_HE.ventana);
  // el faro de juguete de la librería, que parpadea
  { const fx = 10, fy = 74; rect(fx - 2, fy - 12, fx + 2, fy, P.k); for (let y = fy - 11; y <= fy; y++) rect(fx - 1, y, fx + 1, y, ((y - fy) >> 1) & 1 ? P.rojoX : P.blanco); rect(fx - 2, fy - 14, fx + 2, fy - 13, P.k); const on = Math.sin(t * 2.6) > 0.2; pset(fx, fy - 13, on ? P.luz : P.metalS); if (on) { pset(fx - 3, fy - 13, P.luzS); pset(fx + 3, fy - 13, P.luzS); pset(fx - 4, fy - 14, P.luzS); pset(fx + 4, fy - 12, P.luzS); } }
  // la luz del farolillo, que respira
  if (Math.sin(t * 3.3) > 0) pset(38, 70, P.blanco);
  // el brillo que recorre la botella cada pocos segundos
  { const u = (t % 5) / 1.2; if (u < 1) { const x = Math.round(70 + u * 32); for (let i = 0; i < 3; i++) if (x + i < 103) pset(x + i, 100, P.blanco); pset(x + 1, 101, P.vidL); } }
  // el vapor de la taza
  { const [tx, ty] = [160, 113]; rect(tx - 4, ty - 4, tx + 2, ty, P.k); rect(tx - 3, ty - 3, tx + 1, ty, P.porc); rect(tx - 3, ty - 3, tx + 1, ty - 3, P.te); rect(tx + 1, ty - 2, tx + 1, ty, P.porcS); pset(tx + 3, ty - 2, P.k); pset(tx + 3, ty - 1, P.k); rect(tx - 6, ty + 1, tx + 4, ty + 1, P.porcS); rect(tx - 5, ty + 1, tx + 3, ty + 1, P.porc);
    for (let k = 0; k < 2; k++) for (let i = 0; i < 12; i++) { const yy = ty - 5 - i, ph = t * 1.8 + k * 2.5, xx = tx - 2 + k * 2 + Math.round(Math.sin(i * 0.45 - ph) * (1 + i * 0.12)); if (g_hoyB4(xx, yy) < 0.85 - i * 0.07 && ((i + Math.floor(t * 4) + k) % 7) !== 0) pset(xx, yy, i < 5 ? P.blanco : P.nubeS); } }
  // las motas de polvo en el rayo de sol
  for (let k = 0; k < 14; k++) { const u = ((h(k, 1, 460) + t * (0.02 + h(k, 2, 460) * 0.03)) % 1), y = Math.round(96 + u * 78), x = Math.round(70 + (y - 96) * 0.95 + h(k, 3, 460) * 40 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 2 + k * 1.7) > -0.3) pset(x, y, P.luz); }
  // las teorías tachadas con una X roja, por orden
  const TE = [[191, 56], [219, 56], [242, 56], [197, 87], [233, 87]];
  const nt = Math.max(0, Math.min(5, Math.floor(o.tachados ?? 0)));
  for (let k = 0; k < nt; k++) { const [cx, cy] = TE[k], r = k < 3 ? 11 : 13; for (let s = -r; s <= r; s++) { for (const [xx, yy] of [[cx + s, cy + s], [cx + s, cy - s]]) { pset(xx, yy, h(xx, yy, 461) < 0.15 ? P.rojoXS : P.rojoX); pset(xx + 1, yy, P.rojoX); pset(xx, yy + 1, P.rojoXS); } } }
  // el borrado: lo barrido vuelve al verde con sus barridos, el borrador y la nube de polvo
  let borrador = null;
  const bo = Math.max(0, Math.min(1, o.borra ?? 0));
  if (bo > 0) { const ex = Math.round(a + bo * (c - a + 8));
    for (let y = b; y <= d; y++) for (let x = a; x <= Math.min(c, ex); x++) { const w = Math.sin((x - a) * 0.5 + Math.sin(y * 0.35) * 2); pset(x, y, w > 0.9 && g_hoyB4(x, y) < 0.2 ? P.pizB : w > 0.6 && g_hoyB4(x, y) < 0.12 ? P.pizL : h(x >> 2, y >> 1, 440) < 0.08 ? P.pizL : P.piz); }
    // las X ya borradas no quedan; el borrador sube y baja mientras avanza
    if (bo < 1) { const ey = Math.round((b + d) / 2 + Math.sin(t * 9) * 22); rect(ex - 5, ey - 7, ex + 5, ey + 7, P.k); rect(ex - 4, ey - 6, ex + 4, ey + 6, P.nogalL); rect(ex - 4, ey - 6, ex - 3, ey + 6, P.robleB); rect(ex + 1, ey - 6, ex + 4, ey + 6, P.tizaS); borrador = [ex, ey];
      for (let k = 0; k < 18; k++) { const v = (t * 1.3 + h(k, 1, 462)) % 1, px = ex + 4 + Math.round(v * 14 * h(k, 2, 462) + Math.sin(t * 3 + k) * 2), py = ey - 8 + Math.round(h(k, 3, 462) * 16 + v * 18); if (g_hoyB4(px, py) < 0.9 - v * 0.7) pset(px, py, v < 0.4 ? P.tiza : P.tizaS); } }
    for (let k = 0; k < 10; k++) { const v = (t * 0.6 + h(k, 4, 462)) % 1, px = a + Math.round(h(k, 5, 462) * (Math.min(c, ex) - a)), py = d + 4 + Math.round(v * 48); if (py < 156 && v < 0.8) pset(px, py, P.tizaS); } }
  g_hoyFicus(R, 304, 151, t);
  g_hoyGato(R, 287, 154, t);
  return { teorias: TE, borrador };
}

// lo de delante en el estudio: el helecho en su maceta abajo a la izquierda (se mece) y un rollo de cabo abajo a la
// derecha; los dos fuera de libre
function g_hoyEstudioDelante(R, t) {
  const P = G_HOY, { rect, pset, linea, disco } = R;
  rect(6, 166, 30, 179, P.k); rect(7, 167, 29, 179, P.barro); rect(7, 167, 29, 168, P.barroL); rect(26, 169, 29, 179, P.barroS); rect(7, 173, 29, 173, P.barroS);
  for (let k = 0; k < 13; k++) { const a = -2.9 + k * 0.23, l = 14 + (k % 4) * 4, m = Math.sin(t * 1.4 + k) * 0.06;
    for (let i = 0; i < l; i++) { const x = 18 + Math.cos(a + m) * i * 1.2, y = 165 + Math.sin(a + m) * i * 0.9 + i * i * 0.04; pset(Math.round(x), Math.round(y), i % 3 ? P.hoja : P.hojaL); if (i % 2) { pset(Math.round(x) - 1, Math.round(y) + 1, P.hojaS); pset(Math.round(x) + 1, Math.round(y) + 1, P.hojaS); } } }
  for (let r = 12; r >= 3; r -= 3) { disco(307, 177, r + 1, P.k); disco(307, 177, r, r % 2 ? P.cesta : P.cestaL); for (let a = 0; a < 6.28; a += 0.5) pset(Math.round(307 + Math.cos(a) * r), Math.round(177 + Math.sin(a) * r * 0.9), P.cestaS); }
  linea(295, 178, 286, 179, P.cestaS);
  return {};
}

// LA BOTELLA DE CERCA: el bergantín de 1872 en miniatura (canon) dentro de la botella
const G_HB = { cy: 98, x0: 56, x1: 252 };

// el radio del vidrio en la columna x (0 fuera): el culo redondo, el cuerpo, el hombro, el cuello y el labio
function g_hoyRadio(x) {
  if (x < 56 || x > 238) return 0;
  if (x < 70) return Math.round(34 * Math.sqrt(Math.max(0, 1 - ((70 - x) / 14.5) ** 2)));
  if (x <= 196) return 34;
  if (x <= 214) return Math.round(12 + 22 * (0.5 + 0.5 * Math.cos((x - 196) / 18 * Math.PI)));
  return x >= 233 ? 14 : 12;
}

function g_hoyBotellaFijo(R) {
  const P = G_HOY, { rect, pset, disco, linea, poligono } = R, cy = G_HB.cy;
  // la pared (el papel a escala 2, solo listas arriba a la derecha) y la ventana con su cortina a la izquierda
  g_hoyPapel(R, 0, 0, 319, 111, (x, y) => (x >= 262 && y <= 50) || (x <= 190 && y <= 22), 2);
  for (let y = 0; y <= 111; y++) for (let x = 0; x < 320; x++) if (g_hoyB4(x, y) < 0.25) g_hoyTinta(R, x, y, P.papelL, 0.3);
  rect(0, 20, 30, 110, P.k); rect(0, 21, 28, 109, P.mold); rect(0, 21, 28, 21, P.blanco); rect(26, 22, 28, 109, P.moldS); rect(0, 24, 24, 104, P.cie3);
  for (let y = 18; y <= 111; y++) for (let i = 0; i <= 12; i++) { const x = 28 + i, f = Math.sin(i * 1.1 + y * 0.03); pset(x, y, i === 12 ? P.cortinaS : f > 0.5 ? P.cortinaL : f < -0.4 ? P.cortinaS : P.cortina); }
  rect(0, 105, 40, 111, P.k); rect(0, 106, 40, 108, P.mold); rect(0, 106, 40, 106, P.blanco);
  g_hoyBotellaPared(R);
  // el rodapié del friso (lo que asoma) y el tablero del aparador con sus vetas y el canto de delante
  rect(0, 108, 319, 111, P.frisoS); rect(0, 108, 319, 108, P.frisoL);
  g_hoyTablas(R, 0, 319, [112, 118, 126, 136, 148, 162, 174], [P.roble, P.robleS, P.robleL, P.robleD], 470);
  rect(0, 112, 319, 112, P.robleD); rect(0, 174, 319, 174, P.robleB); rect(0, 175, 319, 176, P.roble); rect(0, 177, 319, 179, P.robleS);
  g_hoyBotellaMesa(R);
  // el rayo de sol de la ventana sobre el tablero
  for (let y = 112; y <= 174; y++) { const xa = Math.round(10 + (y - 112) * 1.3), xb = xa + 70; for (let x = xa; x <= xb; x++) if (g_hoyB4(x, y) < 0.35) g_hoyTinta(R, x, y, P.luz, 0.3); }
  // la sombra de la botella en el tablero, hacia la derecha
  for (let y = 142; y <= 156; y++) for (let x = 76; x <= 262; x++) { const u = (y - 149) / 7, v = (x - 76) / 186; if (Math.abs(u) < 1 - v * 0.6 && g_hoyB4(x, y) < 0.7) g_hoyTinta(R, x, y, P.k, 0.28); }
  // el soporte de madera: la tabla y las dos cunas
  rect(72, 140, 204, 150, P.k); rect(73, 141, 203, 148, P.nogal); rect(73, 141, 203, 142, P.nogalL); rect(73, 147, 203, 148, P.nogalS); for (let x = 76; x < 202; x += 9) if (h(x, 1, 471) < 0.6) rect(x, 144, x + 5, 144, P.nogalS);
  rect(132, 143, 144, 146, P.latonS); rect(133, 144, 143, 145, P.laton); rect(133, 144, 143, 144, P.latonL);
  for (const xc of [98, 176]) { poligono([[xc - 9, 141], [xc + 9, 141], [xc + 7, 126], [xc - 7, 126]], P.k); for (let y = 127; y <= 140; y++) for (let x = xc - 8; x <= xc + 8; x++) { const top = cy + Math.round(Math.sqrt(Math.max(0, 34 * 34 - 0))) - 6; if (y >= 127) pset(x, y, x < xc - 5 ? P.nogalL : x > xc + 5 ? P.nogalS : P.nogal); }
    for (let x = xc - 8; x <= xc + 8; x++) pset(x, 127, P.nogalD); }
  // EL BERGANTÍN: el casco negro con su franja, la obra viva hundida en la masilla, la borda, la cubierta clara
  { const W0 = 90, W1 = 172, wl = cy + 12;
    for (let x = W0; x <= W1; x++) { const u = (x - W0) / (W1 - W0), top = cy + 1 - (u > 0.86 ? Math.round((u - 0.86) * 22) : 0) - (u < 0.06 ? 1 : 0), bot = wl - (u > 0.78 ? Math.round((u - 0.78) * 30) : 0) - (u < 0.07 ? Math.round((0.07 - u) * 60) : 0);
      for (let y = top; y <= bot; y++) pset(x, y, y === top ? P.k : y === top + 1 ? P.cascoL : y === top + 3 ? P.franja : y > cy + 8 ? P.obra : y === bot ? P.k : P.casco); }
    rect(W0, cy - 1, W1 - 4, cy, P.tabla); rect(W0, cy - 2, W1 - 4, cy - 2, P.k); for (let x = W0 + 2; x < W1 - 4; x += 4) pset(x, cy - 1, P.k);
    // la caseta de popa con sus dos ventanillas, la rueda del timón, la escotilla principal y la de proa, la bomba
    rect(96, cy - 8, 110, cy - 2, P.k); rect(97, cy - 7, 109, cy - 2, P.tabla); rect(97, cy - 7, 109, cy - 7, P.lona); rect(99, cy - 5, 101, cy - 4, P.cie3); rect(105, cy - 5, 107, cy - 4, P.cie3);
    disco(92, cy - 6, 3, P.k); disco(92, cy - 6, 2, P.robleS); pset(92, cy - 6, P.laton); linea(92, cy - 3, 92, cy - 2, P.k);
    rect(122, cy - 4, 138, cy - 2, P.k); rect(123, cy - 3, 137, cy - 2, P.robleS); rect(150, cy - 3, 156, cy - 2, P.k); rect(151, cy - 3, 155, cy - 3, P.robleS);
    rect(142, cy - 6, 143, cy - 2, P.metalS); linea(143, cy - 6, 147, cy - 8, P.metalS);
    // los palos, las vergas y las velas: a proa tres cuadras, a popa la cangreja; el bauprés con sus dos foques
    rect(146, cy - 30, 147, cy - 2, P.nogalS); rect(112, cy - 28, 113, cy - 2, P.nogalS); linea(166, cy - 1, 196, cy - 10, P.nogalS); linea(166, cy - 2, 196, cy - 11, P.nogal);
    for (const [y, w] of [[cy - 27, 9], [cy - 19, 11], [cy - 11, 13]]) { rect(146 - w, y, 147 + w, y, P.nogalS);
      for (let yy = y + 1; yy <= y + 6; yy++) { const bel = Math.round(Math.sin((yy - y) / 6 * Math.PI) * 1.5); for (let x = 146 - w + 1 + bel; x <= 147 + w - 1 - bel; x++) pset(x, yy, x < 146 ? P.lona : (x + yy) % 4 === 0 ? P.lonaS : P.lona); pset(146 - w + 1 + bel, yy, P.lonaS); } }
    poligono([[114, cy - 26], [100, cy - 21], [96, cy - 5], [114, cy - 5]], P.lonaS); poligono([[114, cy - 25], [101, cy - 20], [98, cy - 6], [114, cy - 6]], P.lona); linea(114, cy - 26, 100, cy - 21, P.nogalS); linea(114, cy - 5, 94, cy - 5, P.nogalS);
    for (let y = cy - 20; y < cy - 6; y += 4) linea(102, y, 113, y + 1, P.lonaS);
    poligono([[148, cy - 26], [184, cy - 6], [150, cy - 6]], P.lona); poligono([[148, cy - 22], [196, cy - 10], [170, cy - 4]], P.lonaS); linea(148, cy - 26, 184, cy - 6, P.lonaS);
    // la jarcia: estays y obenques finos
    for (const [x0, y0, x1, y1] of [[147, cy - 30, 196, cy - 11], [113, cy - 28, 146, cy - 30], [113, cy - 28, 92, cy - 2], [146, cy - 29, 140, cy - 2], [147, cy - 29, 154, cy - 2], [112, cy - 27, 106, cy - 8], [113, cy - 27, 118, cy - 2]]) linea(x0, y0, x1, y1, g_hoyMez(P.k, P.papel, 0.35));
    pset(146, cy - 31, P.rojoX); pset(147, cy - 31, P.rojoX); }
  // el mar de masilla con sus crestas, por encima de la obra viva (el casco queda hundido en ella)
  for (let x = 56; x <= 238; x++) { const r = g_hoyRadio(x); for (let y = cy - r + 1; y < cy + r; y++) { const ola = cy + 9 + Math.round(Math.sin(x * 0.35) * 1.6 + Math.sin(x * 0.11) * 1.2);
    if (x <= 200 && y >= ola) { const p = y - ola; pset(x, y, p === 0 ? P.masL : p < 3 && (x + y) % 3 === 0 ? P.masL : (x * 7 + y * 3) % 11 === 0 ? P.masD : p > 10 ? P.masS : P.mas); } } }
  // el tapón de corcho con sus poros
  for (let x = 236; x <= 252; x++) { const r = Math.round(10.5 - (x - 236) * 0.1); for (let y = cy - r; y <= cy + r; y++) { const v = h(x, y, 472); pset(x, y, y === cy - r || x === 252 ? P.k : y < cy - r + 3 ? P.corchoL : y > cy + r - 3 ? P.corchoS : v < 0.15 ? P.corchoS : v > 0.9 ? P.corchoL : P.corcho); } }
}
// LA BOTELLA DE CERCA, en cada fotograma: el botecito (en su sitio, que falta o en la taza), los muñequitos, el vidrio
// con sus reflejos y el brillo que pasa, la taza con su vapor y la lupa
function g_hoyBotella(R, t, o = {}) {
  const P = G_HOY, { rect, pset, disco, linea, poligono } = R, cy = G_HB.cy, bote = ['barco', 'falta', 'taza'].includes(o.bote) ? o.bote : 'barco', vacia = o.vacia ?? 1;
  g_hoyCapa(R, 'botella', () => g_hoyBotellaFijo(R));
  // la vista de la ventana (un cielo claro con una nube que pasa)
  g_hoyBotellaVida(R, t);
  // el botecito sobre la escotilla, o el yugo vacío
  if (bote === 'barco') { rect(123, cy - 7, 137, cy - 4, P.k); rect(124, cy - 7, 136, cy - 5, P.porc); rect(124, cy - 5, 136, cy - 5, P.porcS); rect(125, cy - 7, 135, cy - 7, P.lona); pset(130, cy - 8, P.nogalS); }
  else { rect(124, cy - 5, 125, cy - 4, P.yugo); rect(135, cy - 5, 136, cy - 4, P.yugo); rect(124, cy - 6, 136, cy - 6, P.yugo); }
  if (vacia < 0.5) for (const [x, c] of [[104, P.l2], [141, P.l1], [160, P.l2]]) { rect(x, cy - 6, x + 1, cy - 3, c); pset(x, cy - 7, P.gatoL); pset(x + 1, cy - 7, P.gatoL); pset(x, cy - 2, P.k); pset(x + 1, cy - 2, P.k); }
  // el vidrio: un velo verdoso tramado sobre todo lo de dentro, más denso en los bordes, y el contorno
  for (let x = 56; x <= 238; x++) { const r = g_hoyRadio(x); if (!r) continue;
    for (let y = cy - r; y <= cy + r; y++) { const e = Math.abs(y - cy) / r; if (e > 0.82 || g_hoyB4(x, y) < 0.18 + e * 0.3) g_hoyTinta(R, x, y, e > 0.92 ? P.vidS : P.vid, e > 0.92 ? 0.5 : 0.22); }
    pset(x, cy - r, P.vidD); pset(x, cy + r, P.vidD); if (r > 20) { pset(x, cy - r + 1, P.vidS); pset(x, cy + r - 1, P.vidS); } }
  for (let y = cy - 34; y <= cy + 34; y++) { for (let x = 56; x <= 70; x++) if (g_hoyRadio(x) >= Math.abs(y - cy) && g_hoyRadio(x - 1) < Math.abs(y - cy)) { pset(x, y, P.vidD); break; } }
  // el culo con su hundido y el labio del cuello
  for (let y = cy - 14; y <= cy + 14; y++) pset(63 + Math.round((1 - ((y - cy) / 14) ** 2) * 4), y, P.vidS);
  rect(233, cy - 14, 235, cy - 13, P.vidL); rect(233, cy + 13, 235, cy + 14, P.vidS); linea(233, cy - 13, 233, cy + 13, P.vidS);
  // los reflejos: la tira de luz larga arriba, la corta abajo, el reflejo de la ventana y unas burbujitas
  for (let x = 74; x <= 192; x++) { if ((x - 74) % 40 < 34) { pset(x, cy - 30, P.vidL); if (x % 3) pset(x, cy - 29, P.blanco); } if (x > 120 && x < 176 && x % 2) pset(x, cy + 28, P.vidL); }
  for (let x = 202; x <= 230; x++) pset(x, cy - g_hoyRadio(x) + 2, P.vidL);
  for (const [x0, y0] of [[78, cy - 24], [86, cy - 24]]) { rect(x0, y0, x0 + 5, y0 + 12, g_hoyMez(P.vid, P.blanco, 0.5)); rect(x0, y0 + 6, x0 + 5, y0 + 6, P.vid); }
  for (let k = 0; k < 14; k++) { const x = Math.round(66 + h(k, 1, 473) * 166), r = g_hoyRadio(x), y = Math.round(cy - r + 4 + h(k, 2, 473) * (r * 2 - 8)); if (r > 8) { pset(x, y, P.vidL); if (k % 3 === 0) pset(x + 1, y + 1, P.vidS); } }
  // el brillo que recorre la botella de punta a punta cada pocos segundos
  { const u = (t % 4.5) / 1.4; if (u < 1) { const x = Math.round(60 + u * 176); for (let i = -3; i <= 3; i++) { const r = g_hoyRadio(x + i); if (r) for (let y = cy - r + 2; y < cy - r + 2 + (r > 20 ? 10 : 4); y++) if ((y + i) % 2 === 0) g_hoyTinta(R, x + i, y, P.blanco, 0.55); } } }
  // LA TAZA de té de Atom en su plato, con su asa, el té y el vapor; con o.bote 'taza', el botecito flota mecido
  const tx = 281, ty = 122;
  { for (let i = -24; i <= 24; i++) for (let j = -3; j <= 3; j++) if ((i / 24) ** 2 + (j / 3.5) ** 2 < 1) pset(tx + i, 150 + j, j < 0 ? P.porc : j > 1 ? P.porcS : g_hoyMez(P.porc, P.porcS, 0.4)); for (let i = -24; i <= 24; i++) pset(tx + i, 150 + Math.round(3.4 * Math.sqrt(Math.max(0, 1 - (i / 24) ** 2))), P.k);
    for (let y = ty; y <= 148; y++) { const u = (y - ty) / 26, w = Math.round(17 - u * u * 6); for (let x = tx - w; x <= tx + w; x++) { const v = (x - tx + w) / (2 * w); pset(x, y, x === tx - w || x === tx + w ? P.k : v < 0.25 ? P.blanco : v > 0.78 ? P.porcS : (y > ty + 7 && y < ty + 10) ? P.porcA : P.porc); } }
    rect(tx - 15, 148, tx + 15, 148, P.k);
    for (let y = ty + 4; y <= ty + 16; y++) { const dx = Math.round(Math.sin((y - ty - 4) / 12 * Math.PI) * 7); pset(tx + 17 + dx, y, P.k); pset(tx + 16 + dx, y, P.porc); pset(tx + 18 + dx, y, P.k); }
    for (let i = -17; i <= 17; i++) for (let j = -3; j <= 3; j++) if ((i / 17) ** 2 + (j / 3) ** 2 < 1) pset(tx + i, ty + j, (i / 17) ** 2 + (j / 3) ** 2 > 0.75 ? P.k : j < -1 ? P.porc : (i + Math.round(t * 3)) % 9 === 0 ? P.teL : P.te);
    for (let k = 0; k < 3; k++) for (let i = 0; i < 20; i++) { const yy = ty - 5 - i, xx = tx - 8 + k * 8 + Math.round(Math.sin(i * 0.35 - t * 1.6 - k * 2) * (1 + i * 0.15)); if (g_hoyB4(xx, yy) < 0.8 - i * 0.04 && (i + Math.floor(t * 5) + k * 3) % 9) pset(xx, yy, i < 8 ? P.blanco : P.nubeS); }
    if (bote === 'taza') { const m = Math.sin(t * 1.7), bx = tx + Math.round(Math.sin(t * 0.9) * 3), by = ty - 1 + Math.round(m * 0.6);
      for (const r of [9, 13]) { const rr = r + ((t * 4) % 4); for (let a = 0; a < 6.28; a += 0.18) { const xx = Math.round(bx + Math.cos(a) * rr), yy = Math.round(ty + Math.sin(a) * rr * 0.18); if ((xx - tx) ** 2 / 15.5 ** 2 + ((yy - ty) / 2.6) ** 2 < 1) pset(xx, yy, P.teL); } }
      for (let i = -8; i <= 8; i++) { const yy = by + Math.round(i * m * 0.12), ai = Math.abs(i);
        if (ai <= 6) pset(bx + i, yy, P.k); pset(bx + i, yy - 1, ai >= 7 ? P.k : P.porc); pset(bx + i, yy - 2, ai >= 8 ? P.k : ai === 7 ? P.porc : P.porcS); pset(bx + i, yy - 3, ai >= 8 ? P.k : ai === 7 ? P.k : ai % 4 === 2 ? P.nogalS : P.cestaL); }
      for (let i = -7; i <= 7; i++) pset(bx + i, by - 4 + Math.round(i * m * 0.12), P.k); }
  }
  // LA LUPA: entra desde abajo a la derecha y se posa sobre la cubierta; dentro, la cubierta al doble
  const lu = Math.max(0, Math.min(1, o.lupa ?? 0)); let lupa = null, mango = null;
  if (lu > 0) { const e = 1 - (1 - lu) ** 3, lx = Math.round(330 + (128 - 330) * e + (lu >= 1 ? Math.sin(t * 1.3) * 2 : 0)), ly = Math.round(200 + (92 - 200) * e + (lu >= 1 ? Math.cos(t * 1.1) * 1.5 : 0)), r = 24;
    const foto = Uint32Array.from(R.buf), W = 320;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue; const sx = Math.round(lx + i / 2), sy = Math.round(ly + j / 2); if (sx < 0 || sx > 319 || sy < 0 || sy > 179) continue; let c = foto[sy * W + sx]; if (i * i + j * j > (r - 4) ** 2) c = g_hoyMez(c, P.vidS, 0.3); if ((i + j) < -r * 0.9 && (i + j) > -r * 1.1) c = g_hoyMez(c, P.blanco, 0.6); pset(lx + i, ly + j, c); }
    for (let k = 0; k < 2; k++) { const ex = lx + 18, ey = ly + 18; linea(ex + k, ey, ex + 26 + k, ey + 26, P.k); }
    for (let i = 0; i < 30; i++) { const xx = lx + 19 + i, yy = ly + 19 + i; rect(xx - 2, yy - 2, xx + 2, yy + 2, P.k); }
    for (let i = 0; i < 30; i++) { const xx = lx + 19 + i, yy = ly + 19 + i; rect(xx - 1, yy - 1, xx + 1, yy + 1, i < 6 ? P.laton : P.nogal); pset(xx - 1, yy, i < 6 ? P.latonL : P.nogalL); }
    disco(lx, ly, r + 3, P.k); for (let a = 0; a < 6.283; a += 0.02) { for (const [dr, c] of [[r + 2, P.latonS], [r + 1, P.laton], [r, P.k]]) pset(Math.round(lx + Math.cos(a) * dr), Math.round(ly + Math.sin(a) * dr), Math.cos(a - 3.9) > 0.6 && dr === r + 1 ? P.latonL : c); }
    // el centro vuelve a pintarse (el disco negro lo tapó): otra vez la cubierta al doble
    for (let j = -r + 1; j <= r - 1; j++) for (let i = -r + 1; i <= r - 1; i++) { if (i * i + j * j >= r * r) continue; const sx = Math.round(lx + i / 2), sy = Math.round(ly + j / 2); if (sx < 0 || sx > 319 || sy < 0 || sy > 179) continue; let c = foto[sy * W + sx]; if (i * i + j * j > (r - 4) ** 2) c = g_hoyMez(c, P.vidS, 0.25); if ((i + j) < -r * 0.85 && (i + j) > -r * 1.05) c = g_hoyMez(c, P.blanco, 0.55); pset(lx + i, ly + j, c); }
    lupa = [lx, ly]; mango = [lx + 48, ly + 48]; }
  return { lupa, mango, cubierta: [130, cy - 2], taza: [tx, ty] };
}
// EL DESPACHO DE DOYLE (general): lo fijo
const G_HD = { ventana: [190, 38, 232, 100], fuego: [50, 132] };

// el damasco: un motivo de hoja en rombo, al tresbolillo, en dos tonos sobre el verde; calma(x, y): ahí solo el verde
function g_hoyDamasco(R, x0, y0, x1, y1, calma = null) {
  const P = G_DOY;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let c = (x % 3 === 0 && h(x, y >> 2, 480) < 0.3) ? P.papS : P.pap;
    if (!(calma && calma(x, y))) { const fila = Math.floor(y / 22), xx = x + (fila & 1) * 9, i = (xx % 18) - 9, j = (y % 22) - 11, d = Math.abs(i) * 1.4 + Math.abs(j);
      if (d < 9 && d > 7) c = P.papMS; else if (d < 6 && (Math.abs(i) < 1 || Math.abs(j - 2) < 1 && Math.abs(i) < 4)) c = P.papM; else if (d < 3) c = P.papL; }
    R.pset(x, y, c);
  }
}

function g_hoyDoyleFijo(R) {
  const P = G_DOY, { rect, pset, disco, linea, poligono } = R;
  // el techo oscuro (liso bajo el año), la cornisa, el damasco y la moldura de los cuadros
  for (let y = 0; y <= 20; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 3, y >> 2, 481) < 0.1 ? P.techoS : P.techo);
  rect(0, 21, 319, 21, P.cornS); rect(0, 22, 319, 23, P.corn); rect(0, 22, 319, 22, P.cornL); for (let x = 0; x < 320; x++) pset(x, 24, (x & 3) < 2 ? P.corn : P.cornS); rect(0, 25, 319, 26, P.cornS);
  g_hoyDamasco(R, 0, 27, 319, 109, (x, y) => x >= 264 && y <= 50);
  rect(0, 31, 319, 31, P.cornS); rect(0, 30, 319, 30, P.corn);
  // el friso de madera oscura con cuarterones y el rodapié
  rect(0, 110, 319, 110, P.madB); rect(0, 111, 319, 112, P.mad); rect(0, 113, 319, 113, P.madD); rect(0, 114, 319, 146, P.mad);
  for (let x0 = 4; x0 < 320; x0 += 30) { const x1 = x0 + 24; rect(x0, 117, x1, 117, P.madD); rect(x0, 117, x0, 142, P.madD); rect(x0, 142, x1, 142, P.madL); rect(x1, 117, x1, 142, P.madL);
    for (let y = 118; y < 142; y++) for (let x = x0 + 1; x < x1; x++) if (h(x >> 2, y, 482) < 0.12) pset(x, y, P.madS); rect(x0 + 2, 119, x1 - 2, 119, P.madS); }
  rect(0, 146, 319, 146, P.madB); rect(0, 147, 319, 149, P.madS); rect(0, 150, 319, 150, P.madD);
  // la tarima y la alfombra persa (granate, cenefa dorada, medallón azul)
  g_hoyTablas(R, 0, 319, [151, 154, 158, 163, 169, 176, 180], [P.mad, P.madS, P.madL, P.madD], 483);
  { for (let y = 158; y <= 178; y++) { const u = (y - 158) / 20, xa = Math.round(46 - u * 10), xb = Math.round(232 + u * 10);
      for (let x = xa; x <= xb; x++) { const bx = Math.min(x - xa, xb - x), by = Math.min(y - 158, 178 - y); let c;
        if (bx < 2 || by < 1) c = P.alfS; else if (bx < 6 || by < 3) c = (x + y) % 4 < 2 ? P.alfL : P.alfA; else if (bx < 7 || by < 4) c = P.alfL;
        else { const dx = (x - (xa + xb) / 2) / 40, dy = (y - 168) / 7, d = Math.abs(dx) + Math.abs(dy); c = d < 0.35 ? P.alfL : d < 0.9 ? ((x + y) % 3 ? P.alfA : P.alfAL) : d < 1.0 ? P.alfL : (x * 3 + y * 5) % 11 === 0 ? P.alfL : (x + y) % 2 && h(x, y, 484) < 0.3 ? P.alfS : P.alf; }
        pset(x, y, c); }
      if (y % 2 === 0) { pset(xa - 1, y, P.hojaPS); pset(xb + 1, y, P.hojaPS); } } }
  // LA CHIMENEA: el espejo dorado, la repisa con el reloj, el barquito y los candeleros, el mármol, la boca de hierro con
  // su rejilla y el hogar de baldosas
  { const cx = 50;
    rect(cx - 24, 34, cx + 24, 84, P.k); rect(cx - 23, 35, cx + 23, 83, P.oroS); rect(cx - 22, 35, cx + 22, 35, P.oroL); rect(cx - 23, 35, cx - 22, 83, P.oro); rect(cx - 20, 38, cx + 20, 80, P.k);
    for (let y = 39; y <= 79; y++) for (let x = cx - 19; x <= cx + 19; x++) pset(x, y, (x - y) % 23 === 0 || (x - y) % 23 === 1 ? P.noc2 : y > 66 ? P.madS : P.noc1);
    for (const [x, y] of [[cx - 23, 34], [cx + 23, 34], [cx, 33]]) disco(x, y, 2, P.oro);
    rect(cx - 36, 86, cx + 36, 91, P.k); rect(cx - 35, 86, cx + 35, 88, P.marmL); rect(cx - 35, 86, cx + 35, 86, P.marmV); rect(cx - 35, 89, cx + 35, 90, P.marmS);
    rect(cx - 30, 92, cx + 30, 150, P.k); rect(cx - 29, 92, cx + 29, 150, P.marm);
    for (let y = 92; y <= 150; y++) for (let x = cx - 29; x <= cx + 29; x++) { const v = Math.sin(x * 0.2 + y * 0.13 + Math.sin(y * 0.1) * 2); if (v > 0.93) pset(x, y, P.marmV); else if (h(x >> 1, y >> 1, 485) < 0.08) pset(x, y, P.marmS); }
    rect(cx - 29, 92, cx - 27, 150, P.marmL); rect(cx + 27, 92, cx + 29, 150, P.marmS); rect(cx - 25, 96, cx + 25, 98, P.marmS); rect(cx - 25, 96, cx + 25, 96, P.marmV);
    rect(cx - 18, 106, cx + 18, 146, P.k); rect(cx - 17, 107, cx + 17, 146, P.hierro); rect(cx - 17, 107, cx + 17, 108, P.hierroL); rect(cx - 15, 112, cx + 15, 146, P.ladrS);
    for (let y = 113; y < 146; y += 4) for (let x = cx - 15 + ((y >> 2) & 1) * 3; x < cx + 15; x += 6) pset(x, y, P.ladr);
    rect(cx - 36, 150, cx + 36, 155, P.k); for (let x = cx - 35; x <= cx + 35; x++) for (let y = 151; y <= 155; y++) pset(x, y, ((x >> 2) + (y >> 1)) & 1 ? P.ladr : P.cortS); rect(cx - 35, 151, cx + 35, 151, P.cortL);
    // el reloj de repisa, los candeleros (la vela va aparte) y el barquito de vela
    rect(cx - 6, 72, cx + 6, 85, P.k); rect(cx - 5, 73, cx + 5, 85, P.mad); rect(cx - 5, 73, cx + 5, 73, P.madB); disco(cx, 78, 4, P.oroS); disco(cx, 78, 3, P.hojaP); linea(cx, 78, cx, 76, P.k); linea(cx, 78, cx + 2, 78, P.k); rect(cx - 6, 85, cx + 6, 85, P.oro);
    for (const x of [cx - 30, cx + 26]) { rect(x, 82, x + 4, 85, P.oroS); rect(x + 1, 76, x + 3, 81, P.oro); rect(x + 1, 76, x + 1, 81, P.oroL); rect(x + 1, 69, x + 3, 75, P.hojaP); }
    rect(cx + 8, 82, cx + 22, 85, P.casco); rect(cx + 8, 82, cx + 22, 82, P.franja); linea(cx + 13, 82, cx + 13, 70, P.madB); linea(cx + 18, 82, cx + 18, 72, P.madB); rect(cx + 10, 72, cx + 16, 79, P.lona); rect(cx + 16, 74, cx + 20, 80, P.lona); linea(cx + 22, 82, cx + 26, 80, P.madB); }
  // el diploma enmarcado y el reloj de pared (el péndulo va aparte)
  { rect(98, 48, 128, 72, P.k); rect(99, 49, 127, 71, P.oroS); rect(99, 49, 127, 49, P.oroL); rect(101, 51, 125, 69, P.hojaP); for (const [y, l] of [[54, 16], [57, 20], [60, 18], [63, 12]]) rect(113 - (l >> 1), y, 113 + (l >> 1), y, P.hojaPS); disco(120, 66, 2, P.cortL); pset(120, 66, P.oro); linea(104, 67, 110, 66, P.tinta);
    rect(146, 40, 162, 92, P.k); rect(147, 41, 161, 91, P.mad); rect(147, 41, 161, 41, P.madB); poligono([[145, 40], [163, 40], [154, 34]], P.k); poligono([[147, 39], [161, 39], [154, 35]], P.madL);
    disco(154, 50, 6, P.k); disco(154, 50, 5, P.oroS); disco(154, 50, 4, P.hojaP); for (let a = 0; a < 12; a++) pset(Math.round(154 + Math.cos(a * 0.5236) * 3), Math.round(50 + Math.sin(a * 0.5236) * 3), P.tinta); linea(154, 50, 154, 47, P.k); linea(154, 50, 156, 51, P.k);
    rect(149, 58, 159, 88, P.k); rect(150, 59, 158, 87, P.madS); rect(150, 59, 150, 87, P.madL); }
  // EL SILLÓN de cuero capitoné detrás del escritorio (el respaldo alto)
  { rect(134, 112, 166, 152, P.k); rect(135, 113, 165, 151, P.cuero); rect(135, 113, 165, 114, P.cueroL); rect(163, 115, 165, 151, P.cueroS);
    for (let y = 118; y < 150; y += 6) for (let x = 139 + ((y / 6) & 1) * 3; x < 163; x += 6) { pset(x, y, P.cueroS); pset(x - 1, y - 1, P.cueroL); }
    for (const x of [133, 167]) { rect(x - 3, 126, x + 3, 152, P.k); rect(x - 2, 127, x + 2, 151, P.cuero); rect(x - 2, 127, x + 2, 128, P.cueroL); disco(x, 128, 3, P.k); disco(x, 128, 2, P.cueroL); }
    for (let x = 136; x <= 164; x += 3) pset(x, 113, P.oro); }
  // LA VENTANA: el marco, el alféizar, la galería, las cortinas de terciopelo con su alzapaño y la luz de luna en la tarima
  { const [a, b, c, d] = G_HD.ventana;
    rect(a - 5, b - 5, c + 5, d + 5, P.k); rect(a - 4, b - 4, c + 4, d + 4, P.madL); rect(a - 1, b - 1, c + 1, d + 1, P.madS);
    rect(a - 8, d + 4, c + 8, d + 8, P.k); rect(a - 7, d + 5, c + 7, d + 6, P.madB); rect(a - 7, d + 7, c + 7, d + 7, P.madS);
    for (const [x0, s] of [[a - 14, 1], [c + 4, -1]]) for (let y = b - 6; y <= 150; y++) { const at = Math.abs(y - 82) < 2, w = at ? 6 : y < 82 ? 8 : Math.min(12, 8 + (y - 82) * 0.06);
      for (let i = 0; i <= w; i++) { const x = s > 0 ? x0 + i : x0 + 10 - i, f = Math.sin(i * 1.2 + (s > 0 ? 0 : 1.5)); pset(x, y, at ? P.oro : i === 0 || i === Math.round(w) ? P.cortS : f > 0.55 ? P.cortL : f < -0.4 ? P.cortS : P.cort); } }
    rect(a - 17, b - 12, c + 17, b - 5, P.k); rect(a - 16, b - 11, c + 16, b - 6, P.cort); rect(a - 16, b - 11, c + 16, b - 11, P.cortL); for (let x = a - 16; x <= c + 16; x += 4) { pset(x, b - 5, P.oro); pset(x + 1, b - 4, P.oroS); } rect(a - 16, b - 7, c + 16, b - 7, P.oro);
    for (let y = 152; y <= 178; y++) { const u = (y - 152) / 26, xa = Math.round(a - 6 + u * 22), xb = Math.round(c + 6 + u * 34), mid = Math.round((xa + xb) / 2); for (let x = xa; x <= xb; x++) if (Math.abs(x - mid) > 1 && Math.abs(y - 165) > 0 && g_hoyB4(x, y) < 0.38) g_hoyTinta(R, x, y, P.lunaLuz, 0.22); } }
  // LA LIBRERÍA de medicina (x 248–318, debajo de la esquina de Atom): libros gordos con nervios dorados, el
  // microscopio de latón, frascos de farmacia y una caja de cuero
  { const x0 = 248, x1 = 318; rect(x0, 52, x1, 150, P.k); rect(x0 + 1, 53, x1 - 1, 149, P.mad); rect(x0 + 3, 56, x1 - 3, 146, P.madD); rect(x0 - 1, 50, x1 + 1, 53, P.k); rect(x0, 50, x1, 50, P.madB); rect(x0 + 1, 53, x0 + 2, 149, P.madL);
    const COL = [P.l1, P.l2, P.l3, P.l4, P.l5, P.l6, P.l7, P.l8];
    [78, 102, 126, 146].forEach((by, b) => { if (b < 3) { rect(x0 + 3, by, x1 - 3, by + 1, P.madL); rect(x0 + 3, by + 1, x1 - 3, by + 1, P.madS); }
      let x = x0 + 4, n = 0;
      while (x < x1 - 4) { const hueco = (b === 0 && x > 290) || (b === 1 && x > 252 && x < 272) || (b === 2 && x > 300); if (hueco) { x++; continue; }
        const w = 3 + Math.floor(h(x, b, 486) * 3), a = 14 + Math.floor(h(x, b, 487) * 6), c = COL[(n * 3 + b * 5) % 8], y = by - 1; if (x + w > x1 - 4) break;
        rect(x, y - a + 1, x + w - 1, y, c); rect(x, y - a + 1, x, y, g_hoyMez(c, P.hojaP, 0.2)); rect(x + w - 1, y - a + 1, x + w - 1, y, g_hoyMez(c, P.k, 0.35));
        for (const yy of [y - a + 3, y - a + 5, y - 3]) rect(x, yy, x + w - 1, yy, P.oroS); x += w; n++; } });
    // el microscopio de latón, los frascos de farmacia y la caja
    { const mx = 300; rect(mx - 6, 75, mx + 6, 77, P.k); rect(mx - 5, 75, mx + 5, 76, P.latonS); linea(mx - 2, 74, mx + 2, 64, P.k); linea(mx - 1, 74, mx + 3, 64, P.laton); rect(mx + 1, 58, mx + 4, 66, P.k); rect(mx + 2, 59, mx + 3, 65, P.latonL); rect(mx - 3, 69, mx + 3, 70, P.latonS); }
    for (const [x, c] of [[256, P.verde], [262, P.cortL], [268, P.l2]]) { rect(x, 92, x + 4, 101, P.k); rect(x + 1, 93, x + 3, 101, c); rect(x + 1, 93, x + 1, 101, g_hoyMez(c, P.hojaPL, 0.4)); rect(x + 1, 90, x + 3, 91, P.k); rect(x + 1, 96, x + 3, 98, P.hojaP); }
    rect(302, 116, 314, 125, P.k); rect(303, 117, 313, 125, P.cuero); rect(303, 117, 313, 117, P.cueroL); rect(306, 120, 310, 121, P.oro); }
  // el gancho con el estetoscopio colgado, junto a la librería, y el maletín de médico en el suelo
  { rect(243, 68, 245, 70, P.oro); linea(244, 70, 238, 88, P.k); linea(244, 70, 250, 86, P.k); linea(238, 88, 240, 96, P.k); linea(250, 86, 246, 98, P.k); disco(244, 100, 3, P.k); disco(244, 100, 2, P.metal); pset(243, 99, P.metalL); pset(238, 88, P.metalL); pset(250, 86, P.metalL);
    for (let i = -13; i <= 13; i++) if (g_hoyB4(262 + i, 157) < 0.6) g_hoyTinta(R, 262 + i, 157, P.k, 0.4);
    rect(250, 140, 274, 156, P.k); rect(251, 141, 273, 155, P.cuero); rect(251, 141, 273, 142, P.cueroL); rect(251, 148, 273, 148, P.cueroS); rect(271, 143, 273, 155, P.cueroS); rect(258, 135, 266, 136, P.k); rect(257, 136, 258, 140, P.k); rect(266, 136, 267, 140, P.k); rect(260, 143, 264, 145, P.latonS); pset(261, 143, P.latonL); }
  // LA LUZ: la penumbra azulada de la noche y el calor del fuego y de la lámpara, una vez
  { const [fx, fy] = G_HD.fuego; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 190 && x <= 232 && y >= 38 && y <= 100) continue;
      const f = Math.max(0, 1 - Math.hypot(x - fx, (y - fy) * 1.25) / 150), l = Math.max(0, 1 - Math.hypot(x - 112, (y - 120) * 1.3) / 110), L = Math.min(1, 0.2 + f * 1.15 + l * 0.9);
      const p = R.pget(x, y); let c = g_hoyMez(p, P.noche, Math.max(0, (1 - L) * 0.72)); if (L > 0.55) c = g_hoyMez(c, P.calido, (L - 0.55) * 0.3); R.pset(x, y, c); } }
}

// la noche por la ventana de Doyle, recortada: estrellas que titilan, la luna, nubes que pasan, el mar con su reguero de
// luna y el faro lejano que gira; los travesaños encima
function g_hoyVistaNoche(R, t, x0, y0, x1, y1) {
  const P = G_DOY, { pset, rect, disco, linea } = R, hor = y0 + 40, N = [P.noc0, P.noc1, P.noc2, P.noc3];
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= hor; y++) { const f = (y - y0) / (hor - y0); for (let x = x0; x <= x1; x++) pset(x, y, N[Math.max(0, Math.min(3, Math.floor(f * 3.6 + g_hoyB4(x, y) - 0.4)))]); }
  for (let k = 0; k < 16; k++) { const x = Math.round(x0 + h(k, 1, 490) * (x1 - x0)), y = Math.round(y0 + h(k, 2, 490) * (hor - y0 - 8)), b = Math.sin(t * (1.5 + (k % 4) * 0.7) + k * 2); if (b > -0.3) pset(x, y, b > 0.6 ? P.estrella : P.noc3); }
  const mx = x0 + 30, my = y0 + 12; R.halo(mx, my, 10, [P.noc2, P.noc3], 1.1); disco(mx, my, 5, P.lunaS); disco(mx - 1, my - 1, 4, P.luna); pset(mx + 1, my + 1, P.lunaS); pset(mx - 2, my + 1, P.lunaS);
  for (const [y, w, v, k] of [[y0 + 14, 18, 0.9, 0], [y0 + 24, 14, 1.6, 1], [y0 + 6, 12, 0.5, 2]]) { const W = x1 - x0 + 50, cx = x0 - 25 + ((h(k, 3, 490) * W + t * v) % W); g_hoyNube(R, cx, y, w, [P.nub2, P.nub1, P.nub0]); }
  for (let y = hor + 1; y <= y1; y++) { const u = (y - hor) / (y1 - hor); for (let x = x0; x <= x1; x++) { const s = Math.sin(x * 0.6 + t * 1.3 + y * 2.1), luna = h(x >> 1, y * 7 + Math.floor(t * 3 + x * 0.1), 505) < 0.75 - Math.abs(x - mx) / (2.5 + u * 7); pset(x, y, luna ? (s > 0.5 ? P.luna : P.lunaS) : s > 0.88 ? P.marL : P.mar); } }
  // el faro en su punta de tierra, con el haz que barre
  { const fx = x1 - 6, fy = hor; rect(x1 - 16, hor - 2, x1, hor, P.k); rect(fx - 1, fy - 9, fx + 1, fy - 2, P.hojaPS); rect(fx - 2, fy - 11, fx + 2, fy - 10, P.k); const a = Math.sin(t * 1.2), on = Math.cos(t * 1.2) > 0;
    pset(fx, fy - 10, on ? P.faro : P.f1); if (on) { for (let i = 2; i < 30; i++) { const xx = Math.round(fx - i * Math.sign(a || 1)), yy = fy - 10 + Math.round(i * 0.08); if (Math.abs(a) > 0.2 && g_hoyB4(xx, yy) < 0.6 - i * 0.02) pset(xx, yy, P.faro); } } }
  R.recorte(null);
  rect(210, y0, 212, y1, P.madL); rect(210, y0, 210, y1, P.madB); rect(x0, 68, x1, 70, P.madL); rect(x0, 68, x1, 68, P.madB);
  for (let i = 0; i < 16; i++) { const x = x0 + 3 + i, y = y0 + 30 - i; if (x < 210) g_hoyTinta(R, x, y, P.lunaS, 0.2); }
}

// EL DESPACHO DE DOYLE (general), en cada fotograma: la ventana, el fuego con su luz que baila y sus chispas, la vela,
// el péndulo y el gato del hogar
function g_hoyDoyle(R, t, o = {}) {
  const P = G_DOY, { pset, rect, disco, linea } = R, [fx, fy] = G_HD.fuego;
  g_hoyCapa(R, 'doyle', () => g_hoyDoyleFijo(R));
  g_hoyVistaNoche(R, t, ...G_HD.ventana);
  // la luz del fuego que baila en la pared y el suelo (un anillo tramado que respira)
  const fl = 0.5 + 0.3 * Math.sin(t * 7.3) + 0.2 * Math.sin(t * 11.7 + 1);
  for (let y = 70; y <= 179; y++) for (let x = 0; x <= 150; x++) { const d = Math.hypot(x - fx, (y - fy) * 1.25); if (d < 32 || d > 110) continue; const u = 1 - (d - 32) / 78; if (g_hoyB4(x, y) < u * (0.18 + fl * 0.22)) g_hoyTinta(R, x, y, P.calido, 0.16); }
  // el fuego: los leños, las brasas que laten y las llamas que se retuercen; chispas que suben
  rect(fx - 13, 141, fx + 13, 145, P.hierro); for (let x = fx - 13; x <= fx + 13; x += 3) rect(x, 136, x, 145, P.hierroL);
  rect(fx - 12, 137, fx + 10, 140, P.madD); rect(fx - 9, 134, fx + 12, 137, P.madS); rect(fx - 12, 137, fx + 10, 137, P.brasa);
  for (let x = fx - 11; x <= fx + 11; x++) if (Math.sin(t * 5 + x * 1.3) > 0.2) pset(x, 140, Math.sin(t * 3 + x) > 0.6 ? P.f2 : P.brasaL);
  for (let i = -11; i <= 11; i++) { const hgt = 9 + Math.round(Math.sin(i * 0.5 + 0.4) * 3 + Math.sin(t * 9 + i * 1.7) * 3 + Math.sin(t * 5.3 - i) * 2), sway = Math.sin(t * 6 + i * 0.4) * 1.5;
    for (let j = 0; j < hgt; j++) { const u = j / hgt, x = Math.round(fx + i + sway * u), y = 134 - j; if (y < 113) continue; pset(x, y, u < 0.3 ? P.f3 : u < 0.55 ? P.f2 : u < 0.8 ? P.f1 : P.f0); } }
  for (let k = 0; k < 6; k++) { const v = (t * 0.7 + h(k, 1, 491)) % 1, x = Math.round(fx - 8 + h(k, 2, 491) * 16 + Math.sin(t * 4 + k) * 2), y = Math.round(130 - v * 20); if (y > 112) pset(x, y, v < 0.5 ? P.f3 : P.f1); }
  // la vela de la repisa, que tiembla, y su halito
  { const vx = 78, vy = 68, m = Math.round(Math.sin(t * 8) * 0.7); R.halo(vx, vy - 1, 5, [g_hoyMez(P.mad, P.calido, 0.25), g_hoyMez(P.mad, P.calido, 0.45)], 1.1); pset(vx + m, vy - 2, P.f2); pset(vx, vy - 1, P.f3); pset(vx, vy, P.f1); pset(vx, vy + 1, P.k); }
  // el péndulo del reloj de pared, que va y viene
  { const a = Math.sin(t * Math.PI / 1.0) * 0.32, px = 154, py = 60, L = 22, bx = Math.round(px + Math.sin(a) * L), by = Math.round(py + Math.cos(a) * L); linea(px, py, bx, by, P.oroS); disco(bx, by, 3, P.oroS); disco(bx, by, 2, P.oro); pset(bx - 1, by - 1, P.oroL); }
  // el gato gris dormido en el hogar, que respira
  { const gx = 22, gy = 150, r = Math.sin(t * 2) > 0.3 ? 1 : 0; disco(gx - 4, gy - 3, 5, P.k); disco(gx, gy - 3 - r, 6, P.k); disco(gx - 4, gy - 3, 4, P.gato); disco(gx, gy - 3 - r, 5, P.gato); disco(gx - 2, gy - 5 - r, 2, P.gatoL); for (let i = -4; i <= 2; i += 3) pset(gx + i, gy - 7 - r, P.k); disco(gx + 6, gy - 3, 3, P.k); disco(gx + 6, gy - 3, 2, P.gato); for (const ex of [gx + 4, gx + 8]) { pset(ex, gy - 6, P.k); pset(ex, gy - 7, P.k); } pset(gx + 5, gy - 4, P.k); pset(gx + 7, gy - 4, P.k); pset(gx + 6, gy - 2, P.gatoB);
    const c = Math.sin(t * 1.1) * 1.5; for (let i = 0; i < 6; i++) pset(gx - 6 - i + Math.round(i > 3 ? c : 0), gy - 1 + Math.round(i * 0.2), P.gatoL); }
  return {};
}

// lo de delante en el despacho de Doyle: EL ESCRITORIO de caoba con la lámpara de aceite (llama y halo), las hojas
// manuscritas, el tintero, las plumas y la taza; tapa a doyleMC de los hombros abajo
function g_hoyDoyleDelante(R, t) {
  const P = G_DOY, { rect, pset, disco, linea, poligono } = R, x0 = 98, x1 = 202;
  // el tablero con su canto, el frente con los cajones y sus tiradores, las patas
  rect(x0, 143, x1, 149, P.k); rect(x0 + 1, 144, x1 - 1, 146, P.madL); rect(x0 + 1, 144, x1 - 1, 144, P.madB); rect(x0 + 1, 147, x1 - 1, 148, P.madS);
  rect(x0 + 2, 149, x1 - 2, 172, P.k); rect(x0 + 3, 150, x1 - 3, 171, P.mad);
  for (const [a, b] of [[x0 + 5, x0 + 32], [x0 + 36, x1 - 36], [x1 - 32, x1 - 5]]) { rect(a, 152, b, 160, P.madD); rect(a + 1, 153, b - 1, 159, P.mad); rect(a + 1, 153, b - 1, 153, P.madL); rect(((a + b) >> 1) - 3, 156, ((a + b) >> 1) + 3, 156, P.oro); pset(((a + b) >> 1) - 3, 157, P.oroS); pset(((a + b) >> 1) + 3, 157, P.oroS); }
  for (const [a, b] of [[x0 + 5, x0 + 32], [x1 - 32, x1 - 5]]) { rect(a, 162, b, 170, P.madD); rect(a + 1, 163, b - 1, 169, P.mad); rect(a + 1, 163, b - 1, 163, P.madL); disco((a + b) >> 1, 166, 1, P.oro); }
  for (let y = 150; y <= 171; y++) for (let x = x0 + 3; x <= x1 - 3; x++) if (h(x >> 2, y, 492) < 0.06) pset(x, y, P.madS);
  rect(x0 + 2, 172, x0 + 6, 176, P.k); rect(x1 - 6, 172, x1 - 2, 176, P.k);
  // las hojas manuscritas delante de Doyle y un montón a la derecha
  poligono([[140, 146], [172, 146], [170, 143], [142, 143]], P.hojaP); for (const y of [144, 145]) for (let x = 144; x < 168; x += 3) pset(x, y, P.tinta);
  poligono([[176, 146], [194, 146], [193, 141], [178, 141]], P.hojaPS); rect(178, 141, 193, 141, P.hojaP); rect(178, 143, 193, 143, P.hojaP);
  // el tintero con las plumas y la taza
  rect(128, 139, 134, 143, P.k); rect(129, 140, 133, 143, P.tinta); pset(129, 140, P.tintaB); linea(131, 139, 124, 128, P.hojaPS); linea(132, 139, 126, 129, P.hojaPL); linea(133, 139, 136, 129, P.hojaPS);
  rect(186, 136, 192, 141, P.k); rect(187, 137, 191, 141, P.porc); rect(187, 137, 191, 137, P.piel); pset(193, 138, P.k); pset(193, 139, P.k);
  // LA LÁMPARA DE ACEITE: el pie de latón, el depósito, el tubo de cristal, la pantalla verde, la llama y su halo
  { const lx = 112, m = Math.sin(t * 9) * 0.5 + Math.sin(t * 13.3) * 0.5;
    R.halo(lx, 124, 16 + Math.round(m), [g_hoyMez(P.pap, P.calido, 0.25), g_hoyMez(P.pap, P.calido, 0.4), g_hoyMez(P.pap, P.calido, 0.55)], 1.1);
    rect(lx - 6, 141, lx + 6, 143, P.k); rect(lx - 5, 141, lx + 5, 142, P.latonS); rect(lx - 5, 141, lx + 5, 141, P.latonL); rect(lx - 1, 133, lx + 1, 140, P.laton); rect(lx - 1, 133, lx - 1, 140, P.latonL);
    disco(lx, 130, 4, P.k); disco(lx, 130, 3, P.laton); pset(lx - 2, 129, P.latonL);
    rect(lx - 1, 112, lx + 1, 117, g_hoyMez(P.vidrio, P.pap, 0.5)); pset(lx - 1, 113, P.hojaPL); rect(lx - 2, 117, lx + 2, 126, P.k);
    poligono([[lx - 4, 117], [lx + 4, 117], [lx + 9, 125], [lx - 9, 125]], P.k); for (let y = 118; y <= 124; y++) { const w = Math.round(4 + (y - 117) * 0.6); for (let x = lx - w; x <= lx + w; x++) pset(x, y, x < lx - w + 2 ? P.verdeL : x > lx + w - 2 ? P.verdeS : P.verde); }
    rect(lx - 8, 125, lx + 8, 125, P.verdeL); const fh = 2 + Math.round(m + 0.5); for (let j = 0; j < fh; j++) pset(lx, 121 + 4 - j, j === 0 ? P.f3 : P.f2);
    for (let y = 126; y <= 142; y++) { const w = Math.round(9 + (y - 126) * 1.3); for (let x = lx - w; x <= lx + w; x++) if (g_hoyB4(x, y) < 0.18 && R.pget(x, y)) g_hoyTinta(R, x, y, P.calido, 0.25); } }
  return {};
}

// LA REVISTA (el escritorio de cerca): lo fijo
const G_HR = { hoja: [66, 66, 166, 160], revista: [176, 56, 282, 150], firma: [184, 74, 222, 82] };

function g_hoyRevistaFijo(R) {
  const P = G_DOY, { rect, pset, disco, linea, poligono } = R;
  // la pared del fondo (damasco en penumbra, liso bajo el año) y el casillero del escritorio con cartas
  g_hoyDamasco(R, 0, 0, 319, 40, (x, y) => (x >= 16 && x <= 174 && y <= 21) || (x >= 262 && y <= 46));
  rect(56, 16, 264, 44, P.k); rect(57, 17, 263, 43, P.mad); rect(57, 17, 263, 18, P.madB);
  for (let i = 0; i < 8; i++) g_hoyCasilla(R, 60 + i * 25, i);
  // el tablero de caoba con sus vetas y el cuero verde con su filete dorado
  g_hoyTablas(R, 0, 319, [44, 52, 62, 74, 88, 104, 122, 142, 164, 180], [P.mad, P.madS, P.madL, P.madD], 495);
  rect(0, 44, 319, 45, P.madD); rect(32, 52, 306, 178, P.k);
  for (let y = 53; y <= 177; y++) for (let x = 33; x <= 305; x++) { const v = h(x, y, 496), m = h(x >> 3, y >> 3, 505) * 0.5 + h(x >> 4, (y + 5) >> 4, 506) * 0.5, gasto = y > 150 && x > 90 && x < 250 ? 0.12 : 0;
    pset(x, y, v < 0.06 ? P.verdeS : v > 0.975 ? g_hoyMez(P.verde, P.verdeL, 0.3) : g_hoyMez(P.verdeS, P.verde, 0.38 + m * 0.34 + gasto + (g_hoyB4(x, y) < 0.15 ? 0.08 : 0))); }
  // el gofrado en seco del cuero, a 5 px del filete (surco oscuro con su filo de luz), y una flor dorada en cada esquina
  for (let x = 41; x <= 297; x++) if (x % 3) { pset(x, 61, P.verdeS); pset(x, 62, g_hoyMez(P.verde, P.verdeL, 0.25)); pset(x, 169, P.verdeS); pset(x, 170, g_hoyMez(P.verde, P.verdeL, 0.25)); }
  for (let y = 61; y <= 169; y++) if (y % 3) { pset(41, y, P.verdeS); pset(42, y, g_hoyMez(P.verde, P.verdeL, 0.25)); pset(297, y, P.verdeS); pset(298, y, g_hoyMez(P.verde, P.verdeL, 0.25)); }
  for (const [x, y] of [[36, 56], [302, 56], [36, 174], [302, 174]]) { for (const [dx, dy] of [[0, -2], [0, 2], [-2, 0], [2, 0]]) pset(x + dx, y + dy, P.oro); pset(x, y, P.oroL); for (const [dx, dy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) pset(x + dx, y + dy, P.oroS); }
  // el cerco de una taza de otros días y dos gotas de tinta viejas
  for (let a = 0; a < 6.283; a += 0.05) { const x = Math.round(258 + Math.cos(a) * 9), y = Math.round(166 + Math.sin(a) * 4); if (Math.sin(a * 3) > -0.6) pset(x, y, P.verdeS); }
  for (const [x, y, r] of [[60, 66, 1], [178, 166, 2], [184, 169, 1]]) { R.disco(x, y, r, g_hoyMez(P.verdeS, P.tinta, 0.6)); pset(x, y - r, g_hoyMez(P.verde, P.tinta, 0.3)); }
  for (let x = 36; x <= 302; x++) { pset(x, 56, (x & 1) ? P.oro : P.oroS); pset(x, 174, (x & 1) ? P.oro : P.oroS); } for (let y = 56; y <= 174; y++) { pset(36, y, (y & 1) ? P.oro : P.oroS); pset(302, y, (y & 1) ? P.oro : P.oroS); }
  // la hoja manuscrita (renglones en lápiz, aún sin tinta) con su sombra
  { const [a, b, c, d] = G_HR.hoja; for (let y = b + 2; y <= d + 2; y++) for (let x = a + 2; x <= c + 3; x++) if (g_hoyB4(x, y) < 0.6) g_hoyTinta(R, x, y, P.k, 0.35);
    rect(a, b, c, d, P.hojaPS); rect(a, b, c - 1, d - 1, P.hojaP); for (let y = b + 10; y < d - 4; y += 6) for (let x = a + 6; x < c - 4; x++) if (x % 2) pset(x, y, P.hojaPS); rect(a + 4, b + 4, a + 4, d - 4, P.cortL); }
  // LA REVISTA abierta: dos páginas, columnas de renglones, el título como una raya gruesa, el hueco de la firma y el
  // grabado del barco en la página de la derecha
  { const [a, b, c, d] = G_HR.revista, m = (a + c) >> 1; for (let y = b + 3; y <= d + 3; y++) for (let x = a + 3; x <= c + 4; x++) if (g_hoyB4(x, y) < 0.6) g_hoyTinta(R, x, y, P.k, 0.35);
    rect(a, b, c, d, P.k); rect(a + 1, b + 1, c - 1, d - 1, P.hojaP); rect(m - 1, b + 1, m + 1, d - 1, P.hojaPS); rect(a + 1, d - 2, c - 1, d - 1, P.hojaPS);
    rect(a + 8, b + 7, m - 8, b + 9, P.tinta); rect(a + 8, b + 13, a + 32, b + 14, P.tinta);
    for (let col = 0; col < 2; col++) for (let y = b + 32; y < d - 6; y += 3) { const xa = a + 6 + col * 24, xb = xa + 19 - (h(col, y, 497) < 0.15 ? 8 : 0); rect(xa, y, xb, y, P.hojaPS); if (h(y, col, 498) < 0.5) rect(xa + 2, y, xb - 3, y, g_hoyMez(P.hojaPS, P.tinta, 0.4)); }
    // el grabado: el bergantín a plumilla, con su marco y el mar rayado
    const gx0 = m + 6, gy0 = b + 6, gx1 = c - 6, gy1 = b + 42; rect(gx0, gy0, gx1, gy1, P.tinta); rect(gx0 + 1, gy0 + 1, gx1 - 1, gy1 - 1, P.hojaP);
    for (let y = gy0 + 2; y < gy1 - 10; y += 2) for (let x = gx0 + 2; x < gx1 - 1; x++) if ((x + y) % 4 === 0 && y < gy0 + 14) pset(x, y, P.hojaPS);
    for (let y = gy1 - 10; y < gy1 - 1; y++) for (let x = gx0 + 2; x < gx1 - 1; x++) if ((x * 2 + y * 3) % 5 === 0) pset(x, y, P.tinta);
    { const sx = (gx0 + gx1) >> 1, wy = gy1 - 11; rect(sx - 15, wy - 3, sx + 14, wy, P.tinta); linea(sx + 14, wy - 3, sx + 22, wy - 8, P.tinta); rect(sx - 5, wy - 26, sx - 5, wy - 3, P.tinta); rect(sx + 7, wy - 28, sx + 7, wy - 3, P.tinta);
      for (const [y, w] of [[wy - 25, 6], [wy - 18, 7], [wy - 11, 8]]) { rect(sx + 7 - w, y, sx + 7 + w, y, P.tinta); for (let yy = y + 1; yy < y + 6; yy++) for (let x = sx + 8 - w; x < sx + 7 + w; x += 2) pset(x, yy, P.hojaPS); }
      linea(sx - 5, wy - 24, sx - 16, wy - 5, P.tinta); linea(sx - 5, wy - 5, sx - 16, wy - 5, P.tinta); for (let y = wy - 20; y < wy - 5; y += 3) linea(sx - 6, y, sx - 6 - Math.round((y - wy + 24) * 0.5), y, P.hojaPS); linea(sx + 7, wy - 27, sx + 20, wy - 8, P.tinta); }
    for (let col = 0; col < 2; col++) for (let y = gy1 + 6; y < d - 6; y += 3) rect(m + 5 + col * 24, y, m + 24 + col * 24 - (h(col, y, 499) < 0.2 ? 7 : 0), y, P.hojaPS);
    for (let y = gy1 + 6; y < d - 6; y += 3) if (h(y, 3, 500) < 0.45) rect(m + 7, y, m + 20, y, g_hoyMez(P.hojaPS, P.tinta, 0.4)); }
  // el tintero de cristal tallado, el secante de balancín y el reloj de bolsillo (la aguja va aparte); la taza
  { rect(160, 160, 176, 172, P.k); rect(161, 161, 175, 172, P.vidrio); for (let x = 162; x < 175; x += 3) rect(x, 162, x, 171, P.hojaPS); rect(163, 164, 173, 171, P.tinta); rect(163, 164, 173, 164, P.tintaB); rect(164, 157, 172, 160, P.k); rect(165, 158, 171, 159, P.latonS); rect(165, 158, 171, 158, P.latonL);
    rect(40, 146, 62, 154, P.k); rect(41, 147, 61, 151, P.madL); rect(41, 147, 61, 147, P.madB); rect(41, 152, 61, 153, P.hojaPL); disco(51, 144, 2, P.oro);
    disco(44, 166, 9, P.k); disco(44, 166, 8, P.oro); disco(44, 166, 7, P.hojaP); pset(41, 162, P.hojaPL); for (let a = 0; a < 12; a++) pset(Math.round(44 + Math.cos(a * 0.5236) * 6), Math.round(166 + Math.sin(a * 0.5236) * 6), P.tinta); rect(43, 155, 45, 157, P.oro); disco(44, 154, 1, P.oroL);
    linea(52, 166, 62, 170, P.oroS); linea(62, 170, 72, 168, P.oroS);
    disco(290, 162, 13, P.k); disco(290, 162, 12, P.porc); disco(290, 162, 10, P.porcS); disco(290, 160, 9, P.k); disco(290, 160, 8, P.porc); disco(290, 161, 6, P.piel); disco(289, 160, 3, P.pielL); pset(286, 157, P.hojaPL); rect(299, 156, 302, 162, P.k); rect(300, 157, 301, 161, P.porc); }
  g_hoyRevistaCosas(R);
  // la lámpara a la izquierda (pie de latón y depósito; la llama, el humo y la luz van aparte)
  { const lx = 14; rect(lx - 12, 116, lx + 12, 122, P.k); rect(lx - 11, 117, lx + 11, 120, P.latonS); rect(lx - 11, 117, lx + 11, 117, P.latonL); rect(lx - 3, 84, lx + 3, 116, P.k); rect(lx - 2, 85, lx + 2, 116, P.laton); rect(lx - 2, 85, lx - 1, 116, P.latonL);
    disco(lx, 76, 10, P.k); disco(lx, 76, 9, P.laton); disco(lx - 3, 73, 4, P.latonL); disco(lx + 4, 79, 3, P.latonS);
    rect(lx - 4, 30, lx + 4, 66, P.k); rect(lx - 3, 31, lx + 3, 66, P.vidrio); rect(lx - 3, 31, lx - 2, 66, P.hojaPL);
    poligono([[lx - 10, 44], [lx + 10, 44], [lx + 22, 66], [lx - 22, 66]], P.k); for (let y = 45; y <= 65; y++) { const w = Math.round(9 + (y - 44) * 0.55); for (let x = lx - w; x <= lx + w; x++) pset(x, y, x < lx - w + 3 ? P.verdeL : x > lx + w - 3 ? P.verdeS : (y % 5 === 0 ? P.verdeS : P.verde)); }
    rect(lx - 22, 66, lx + 22, 67, P.verdeL); }
  // la luz de la lámpara: el charco cálido alrededor y la penumbra hacia la derecha
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 20, (y - 80) * 1.1), L = Math.max(0, Math.min(1, 1.25 - d / 260)), p = R.pget(x, y);
    let c = g_hoyMez(p, P.noche, (1 - L) * 0.6); if (L > 0.7) c = g_hoyMez(c, P.calido, (L - 0.7) * 0.35); R.pset(x, y, c); }
}
// LA REVISTA, en cada fotograma: la llama, el humo y la polilla; la tinta que se escribe con la pluma; el garabato de
// la firma; el segundero; el vapor de la taza
function g_hoyRevista(R, t, o = {}) {
  const P = G_DOY, { rect, pset, disco, linea, poligono } = R, [a, b, c, d] = G_HR.hoja, esc = Math.max(0, Math.min(1, o.escribe ?? 0.6)), fi = Math.max(0, Math.min(1, o.firma ?? 0));
  g_hoyCapa(R, 'revista', () => g_hoyRevistaFijo(R));
  // la llama de la lámpara con su resplandor y el humo que sube por el tubo
  { const lx = 14, m = Math.sin(t * 9) + Math.sin(t * 13.7) * 0.6; R.halo(lx, 62, 7 + Math.round(m), [g_hoyMez(P.vidrio, P.calido, 0.4), g_hoyMez(P.vidrio, P.f2, 0.6)], 1.2); for (let j = 0; j < 5 + Math.round(m); j++) pset(lx + (j > 3 ? Math.round(m * 0.5) : 0), 66 - j, j < 2 ? P.f3 : P.f2);
    for (let i = 0; i < 26; i++) { const y = 28 - i, x = lx + Math.round(Math.sin(i * 0.3 - t * 1.4) * (1 + i * 0.12)); if (y >= 0 && g_hoyB4(x, y) < 0.6 - i * 0.02) pset(x, y, i < 10 ? P.hojaPS : g_hoyMez(P.hojaPS, P.pap, 0.5)); } }
  // una polilla que ronda la pantalla
  { const a2 = t * 2.3, px = Math.round(30 + Math.cos(a2) * 14 + Math.sin(t * 7) * 2), py = Math.round(48 + Math.sin(a2 * 1.3) * 10), ala = Math.sin(t * 30) > 0; pset(px, py, P.hojaPS); pset(px - 1, py - (ala ? 1 : 0), P.hojaP); pset(px + 1, py - (ala ? 1 : 0), P.hojaP); }
  // LA TINTA: los renglones de trazos (ondas con bucles, sin letras) hasta donde va la pluma
  const filas = []; for (let y = b + 10; y < d - 4; y += 6) filas.push(y);
  const tot = filas.length * (c - a - 12), hasta = esc * tot; let px = a + 6, py = filas[0];
  filas.forEach((y, i) => { const x0 = a + 6, x1 = c - 6 - (i === filas.length - 1 ? 30 : Math.round(h(i, 1, 501) * 10)), n = Math.min(x1 - x0, Math.max(0, hasta - i * (c - a - 12)));
    for (let k = 0; k < n; k++) { const x = x0 + k, w = Math.sin(k * 0.9 + i) * 1.4 + (h(Math.floor(k / 5), i, 502) < 0.3 ? -1.5 : 0), yy = Math.round(y - 1 + w); if (h(Math.floor(k / 6), i, 503) < 0.12) continue; pset(x, yy, P.tinta); if (k % 5 === 2) pset(x, yy - 1, P.tinta); if (n - k < 6 && n < x1 - x0) pset(x, yy + 1, P.tintaB); }
    if (n > 0) { px = x0 + n; py = y - 1; } });
  // LA PLUMA de ganso: la punta en el trazo, el cañón y las barbas, que se mueve al escribir
  { const mueve = esc > 0 && esc < 1 ? Math.round(Math.sin(t * 14) * 1) : 0, nx = px + 1, ny = py + mueve;
    linea(nx, ny, nx + 16, ny - 22, P.k); linea(nx + 1, ny, nx + 17, ny - 22, P.hojaPS);
    for (let i = 6; i < 34; i++) { const x = nx + Math.round(i * 0.72), y = ny - i, w = Math.round(Math.sin((i - 6) / 28 * Math.PI) * 6); for (let k = 1; k <= w; k++) { pset(x - k, y - Math.round(k * 0.4), k === w ? P.hojaPS : P.hojaPL); pset(x + k, y + Math.round(k * 0.3), k === w ? P.hojaPS : P.hojaP); } }
    pset(nx, ny, P.tinta); }
  // EL HUECO DE LA FIRMA: el recuadro de puntos vacío; con o.firma, el garabato que se traza (sin letras)
  { const [fx0, fy0, fx1, fy1] = G_HR.firma; for (let x = fx0; x <= fx1; x += 2) { pset(x, fy0, P.hojaPS); pset(x, fy1, P.hojaPS); } for (let y = fy0; y <= fy1; y += 2) { pset(fx0, y, P.hojaPS); pset(fx1, y, P.hojaPS); }
    if (fi > 0) { const n = Math.round(fi * (fx1 - fx0 - 4)); for (let k = 0; k < n; k++) { const x = fx0 + 2 + k, y = Math.round((fy0 + fy1) / 2 + Math.sin(k * 0.8) * 2 + Math.sin(k * 0.21) * 1); pset(x, y, P.tinta); if (k % 7 === 3) pset(x, y - 2, P.tinta); } } }
  // el segundero del reloj de bolsillo
  { const a2 = Math.floor(t) * Math.PI / 30 - Math.PI / 2; linea(44, 166, Math.round(44 + Math.cos(a2) * 5), Math.round(166 + Math.sin(a2) * 5), P.tinta); pset(44, 166, P.cortL); }
  // el humo de la pipa, que sube en una voluta y se deshace
  { const [x, y] = G_HRX.pipa; for (let i = 0; i < 30; i++) { const yy = y - 13 - i, xx = x - 5 + Math.round(Math.sin(i * 0.28 - t * 1.2) * (1 + i * 0.18)); if (g_hoyB4(xx, yy) < 0.75 - i * 0.022 && (i + Math.floor(t * 4)) % 11) pset(xx, yy, g_hoyMez(P.hojaPS, P.verde, 0.2 + i * 0.02)); } if (Math.sin(t * 3.1) > 0.4) pset(x - 5, y - 11, P.f2); }
  // los brillos del latón que parpadean con la llama
  { const m = 0.5 + 0.5 * Math.sin(t * 9) * Math.sin(t * 13.7); for (const [x, y] of [[G_HRX.pipa[0] - 7, G_HRX.pipa[1] - 4], [G_HRX.sello[0] - 1, G_HRX.sello[1] + 10], [44, 157], [168, 158], [51, 143]]) if (m > 0.35) { pset(x, y, P.oroL); if (m > 0.7) { pset(x + 1, y, P.latonL); pset(x, y - 1, P.latonL); } } }
  // el vapor de la taza
  for (let k = 0; k < 2; k++) for (let i = 0; i < 16; i++) { const yy = 150 - i, xx = 288 + k * 4 + Math.round(Math.sin(i * 0.4 - t * 1.7 - k * 2) * (1 + i * 0.12)); if (g_hoyB4(xx, yy) < 0.7 - i * 0.04 && (i + Math.floor(t * 5) + k) % 8) pset(xx, yy, g_hoyMez(P.hojaP, P.verde, i * 0.03)); }
  return { pluma: [px + 1, py], hoja: G_HR.hoja.slice() };
}
// el casco del bergantín visto desde la popa, centrado en cx: el coronamiento (y 46–56) con su barandilla de balaustres y
// el farol de popa en su candelero, el espejo de tablas (hasta y ≈ 102) con la franja blanca, dos ventanillas que
// reflejan el cielo, el cartucho tallado del centro, las pilastras doradas con volutas en las esquinas y la moldura de
// cabo dorada al pie; la bovedilla en sombra que se recoge (hasta y ≈ 115); el casco que se abomba hasta la cinta (y
// ≈ 122) y se recoge en la flotación (y 164), con las tracas curvas que buscan el codaste, sus juntas y su luz por la
// izquierda; la obra viva roja; el timón con sus herrajes. Se pinta una vez en un búfer (lo que no es casco queda vacío)
function a_popaCasco(R, cx) {
  const W = (y) => (y < 102 ? 74 : y < 122 ? 74 + 3 * Math.sin(((y - 102) / 20) * Math.PI / 2) : 77 - 13 * ((y - 122) / 42) ** 2);
  const B = R.buf, osc = a_mezcla(C.casco, a_P.negro, 0.45);
  for (let y = 56; y <= 164; y++) { const w = W(y);
    for (let x = Math.ceil(cx - w); x <= Math.floor(cx + w); x++) { const dx = (x - cx) / 76, yt = 102 + Math.round(3 * (1 - dx * dx)), yc = 110 + Math.round(5 * (1 - dx * dx)), u = (x - cx) / w, b4 = a_umbral(x, y);
      let c;
      if (y < yt) { // el espejo: tablas horizontales, la luz por la izquierda
        const dd = (y - 56) % 4; c = dd === 0 ? a_P.negro : u < -0.6 && b4 < 0.45 ? C.cascoL : dd === 1 && b4 < 0.2 ? C.cascoL : u > 0.7 && b4 < 0.4 ? osc : C.casco;
        if (dd && (x + Math.floor((y - 56) / 4) * 11) % 29 === 0) c = osc; }
      else if (y <= yt + 1) c = (x + y) % 3 === 0 ? a_P.oroS : y === yt ? a_P.oro : a_mezcla(a_P.oro, a_P.oroS, 0.5);   // la moldura de cabo dorada
      else if (y < yc) c = (y - yt) % 3 === 0 ? a_P.negro : b4 < 0.3 ? C.casco : osc;                                // la bovedilla, en sombra
      else if (y === yc) c = a_mezcla(C.cascoL, a_P.blancoS, 0.15);                                                    // el canto que coge la luz
      else { const sy = y + 6 * u * u, fila = Math.floor(sy / 4), dd = Math.floor(sy) % 4;
        if (y >= 157) c = dd === 0 ? C.robleRS : b4 < 0.25 ? C.robleRS : u < -0.5 && b4 > 0.8 ? a_mezcla(C.obraViva, a_P.blanco, 0.15) : C.obraViva;
        else if (sy >= 122 && sy < 126) c = sy < 123 ? a_mezcla(C.cascoL, a_P.blanco, 0.12) : sy >= 125 ? a_P.negro : C.cascoL;   // la cinta
        else { c = dd === 0 ? a_P.negro : u < -0.55 && b4 < 0.35 + (-u - 0.55) ? C.cascoL : u > 0.5 && b4 < (u - 0.5) * 1.4 ? osc : Math.abs(u) < 0.12 && b4 < 0.6 ? osc : dd === 1 && b4 < 0.15 ? C.cascoL : C.casco;
          if (dd && (x + fila * 13) % 31 === 0) c = osc;                                       // las juntas de las tablas
          if (dd === 2 && h(x >> 1, fila, 781) > 0.97) c = a_mezcla(C.casco, a_P.naranjaS, 0.35); } }   // un clavo con su óxido
      if (Math.abs(x - cx) > w - 1.5) c = a_P.negro; else if (Math.abs(x - cx) > w - 3 && y > yc) c = x < cx ? C.cascoL : osc;
      B[y * 320 + x] = c; } }
  // el coronamiento con su barandilla de balaustres torneados y el pasamanos
  R.rect(cx - 76, 46, cx + 76, 48, C.tabla); R.rect(cx - 76, 46, cx + 76, 46, C.tablaL); R.rect(cx - 76, 48, cx + 76, 48, C.tablaS);
  for (let x = cx - 72; x <= cx + 72; x += 5) { R.rect(x, 49, x + 1, 54, C.tablaS); R.pset(x, 49, C.tablaL); R.pset(x, 51, C.tablaL); R.pset(x + 1, 52, a_P.maderaD); }
  R.rect(cx - 74, 54, cx + 74, 56, C.tabla); R.rect(cx - 74, 54, cx + 74, 54, C.tablaL); R.rect(cx - 74, 56, cx + 74, 56, C.tablaS);
  // el farol de popa en su candelero, sobre el coronamiento
  R.rect(cx, 40, cx + 1, 46, a_P.hierro); R.rect(cx - 3, 33, cx + 4, 40, a_P.hierro); R.rect(cx - 2, 34, cx + 3, 39, a_mezcla(a_P.farol, a_P.blanco, 0.35)); R.rect(cx, 34, cx + 1, 39, a_P.hierro);
  R.poligono([[cx - 4, 33], [cx + 5, 33], [cx + 1, 29]], a_P.hierro); R.pset(cx + 1, 28, a_P.hierroL); R.pset(cx - 2, 35, a_P.blanco);
  // la franja blanca y su sombra
  R.rect(cx - 73, 60, cx + 73, 61, C.franja); R.rect(cx - 73, 62, cx + 73, 62, a_P.blancoS);
  // las ventanillas con su marco tallado, el cielo en el vidrio y un visillo
  for (const wx of [cx - 40, cx + 27]) { R.rect(wx - 2, 65, wx + 15, 80, a_P.oroS); R.rect(wx - 1, 66, wx + 14, 79, C.tabla); R.rect(wx, 67, wx + 13, 78, a_P.vidrio);
    R.rect(wx + 6, 67, wx + 7, 78, C.tablaS); R.rect(wx, 72, wx + 13, 72, C.tablaS); for (let j = 0; j < 4; j++) R.pset(wx + 1 + j, 70 - j, a_P.vidrioL); R.pset(wx + 9, 68, a_P.cristal); R.pset(wx + 10, 68, a_P.cristal); R.pset(wx + 9, 74, a_P.vidrioL);
    R.rect(wx, 67, wx + 2, 71, a_P.blancoS); R.poligono([[wx - 3, 65], [wx + 16, 65], [wx + 6, 62]], a_P.oroS); R.linea(wx - 2, 65, wx + 6, 62, a_P.oro); R.linea(wx + 7, 62, wx + 15, 65, a_P.oro); }
  // el cartucho tallado del centro: un escudo con la estrella, entre hojas de acanto
  R.disco(cx, 72, 6, a_P.oroS); R.disco(cx, 72, 5, a_P.oro); R.disco(cx, 72, 3, a_P.azul); R.pset(cx, 70, a_P.blanco); R.rect(cx - 1, 72, cx + 1, 72, a_P.blanco); R.pset(cx - 1, 73, a_P.blanco); R.pset(cx + 1, 73, a_P.blanco);
  for (const sx of [-1, 1]) { for (let j = 0; j < 10; j++) R.pset(cx + sx * (7 + j), 72 + Math.round(Math.sin(j * 0.8) * 2), j % 3 ? a_P.oroS : a_P.oro); R.pset(cx + sx * 17, 70, a_P.oro); }
  // las pilastras de las esquinas: tallas doradas con una voluta arriba y otra abajo, y la ristra de hojas
  for (const sx of [-1, 1]) { const x0 = cx + sx * 70; R.rect(Math.min(x0, x0 + sx * 3), 57, Math.max(x0, x0 + sx * 3), 101, a_P.oroS); R.rect(x0 + sx, 57, x0 + sx, 101, a_P.oro);
    for (let y = 60; y < 100; y += 5) { R.pset(x0 + sx * 2, y, a_P.oro); R.pset(x0, y + 2, a_P.oro); R.pset(x0 + sx * 3, y + 1, a_mezcla(a_P.oroS, a_P.negro, 0.4)); }
    for (const [vy, d] of [[58, 1], [100, -1]]) { R.disco(x0 + sx * 2, vy + d, 2.5, a_P.oroS); R.pset(x0 + sx * 2, vy + d, a_P.oro); R.pset(x0 + sx, vy, a_P.oro); }
    for (let j = 0; j < 9; j++) R.pset(x0 - sx * (4 + j), 100 - Math.round(Math.sin(j * 0.7) * 2), j % 2 ? a_P.oroS : a_P.oro); }
  // el timón colgado del codaste con sus machos y hembras, y la mecha que entra por la bovedilla
  R.rect(cx - 6, 112, cx + 6, 164, a_P.negro); R.rect(cx - 5, 112, cx + 5, 164, C.cascoL); R.rect(cx - 5, 112, cx - 4, 164, C.casco); R.rect(cx + 4, 112, cx + 5, 164, a_P.negro);
  R.rect(cx - 2, 106, cx + 2, 112, a_P.negro); R.rect(cx - 1, 106, cx + 1, 111, C.cascoL);
  for (let y = 116; y < 164; y += 6) R.rect(cx - 5, y, cx + 5, y, a_mezcla(C.cascoL, a_P.negro, 0.5));
  for (const yy of [118, 134, 150]) { R.rect(cx - 9, yy, cx + 9, yy + 2, a_P.hierro); R.rect(cx - 9, yy, cx + 9, yy, a_P.hierroL); R.pset(cx - 9, yy + 2, a_P.negro); R.pset(cx + 9, yy + 2, a_P.negro); }
  R.rect(cx - 5, 157, cx + 5, 164, C.robleRS); R.rect(cx - 4, 157, cx + 4, 157, C.obraViva);
}

// una barandilla de la pasarela (de su pie en [92, 160] a su cabeza en [182, 106]): cinco candeleros de madera, cada
// cuarto de tramo, de alto px, y el guardamancebo de cabo de color c, que cuelga un poco entre candelero y candelero
function a_pasarelaBaranda(R, alto, c) {
  const en = (u) => [92 + 90 * u, 160 - 54 * u];
  for (let k = 0; k <= 4; k++) { const [px, py] = en(k / 4), x = Math.round(px), y = Math.round(py); R.linea(x, y - 1, x, y - alto, a_P.maderaD); R.pset(x, y - alto, a_P.maderaL); R.pset(x + 1, y - 2, a_P.maderaS); }
  let [qx, qy] = en(0);
  for (let i = 1; i <= 16; i++) { const [nx, ny] = en(i / 16), cae = Math.sin(((i % 4) / 4) * Math.PI) * 1.5; R.linea(Math.round(qx), Math.round(qy - alto), Math.round(nx), Math.round(ny - alto + cae), c); qx = nx; qy = ny; }
}

// la niebla en capas (para el bote y el cabo): un velo que se espesa junto al horizonte y apenas toca el agua de cerca,
// y encima jirones largos y finos en cuatro planos (el cielo, el banco del horizonte, el medio y el de cerca), cada
// plano más deprisa que el de detrás; los jirones de cerca, más claros. fuerza 0–1; col el color de la niebla
function b_nieblaCapas(R, t, hor, fuerza, col, y0 = 0, y1 = 180) {
  const B = R.buf, claro = b_mezcla(col, hex('#ffffff'), 0.3), cerca = (k) => Math.round(hor + (180 - hor) * k);
  const capas = [
    { y: [hor - 52, hor - 36, hor - 22, hor - 12], hh: 4, v: 5, amp: 0.3, fx: 0.018 },
    { y: [hor - 4, hor + 1, hor + 5, hor + 9], hh: 2, v: 4, amp: 0.42, fx: 0.03 },
    { y: [hor + 14, hor + 22, hor + 32, hor + 44], hh: 2.6, v: 9, amp: 0.4, fx: 0.022 },
    { y: [cerca(0.52), cerca(0.7), cerca(0.88)], hh: 3.6, v: 18, amp: 0.36, fx: 0.013 },
  ];
  // por capa: la densidad a lo largo de x (que corre con el viento) y la envolvente de cada fila
  const W = capas.map((c, k) => { const w = new Float32Array(360), ph = k * 1.7;
    for (let x = 0; x < 360; x++) { const X = x - t * c.v; const v = 0.55 * Math.sin(X * c.fx + ph) + 0.3 * Math.sin(X * c.fx * 2.3 + ph * 2.1) + 0.18 * Math.sin(X * c.fx * 5.3 + ph * 3.3 + t * 0.4); w[x] = v > 0 ? v ** 1.4 : 0; }
    return w; });
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    const dy = y - hor, base = fuerza * (dy >= 0 ? 0.08 + 0.66 * Math.exp(-dy / 14) : 0.28 + 0.5 * Math.exp(dy / 16)), f = y * 320;
    const env = capas.map((c) => { let e = 0; for (const yb of c.y) e += Math.exp(-(((y - yb) / c.hh) ** 2)); return Math.min(1, e) * c.amp * fuerza; }), sh = Math.round(Math.sin(y * 0.37) * 4) + 20;
    for (let x = 0; x < 320; x++) {
      const xi = x + sh, n3 = env[3] * W[3][xi]; let a = base + env[0] * W[0][xi] + env[1] * W[1][xi] + env[2] * W[2][xi] + n3;
      a = Math.min(0.92, a); const q = Math.floor(a * 5 + b_umbral(x, y)) / 5; if (q <= 0) continue;
      B[f + x] = b_mezcla(B[f + x], n3 + env[2] * W[2][xi] > 0.1 && b_umbral(x, y) < (n3 + env[2] * W[2][xi]) * 2.5 ? claro : col, Math.min(0.92, q));
    }
  }
}

// el mar de fondo en calma (bote con niebla): las lomas largas de la mar tendida, curvas en perspectiva, con su cara
// clara y su seno oscuro, que avanzan despacio hacia la cámara; P la paleta del mar
function b_marTendida(R, t, hor, P) {
  const B = R.buf;
  for (let y = hor + 3; y < 180; y++) { const dd = y - hor, Z = 420 / (dd + 0.7), cerca = Math.min(1, dd / 60), f = y * 320;
    for (let x = 0; x < 320; x++) { const ph = Z * 0.2 + t * 0.45 + Math.sin(x * 0.017 + Z * 0.05) * 0.22 + Math.sin(x * 0.051 - t * 0.2) * 0.05, fr = ph - Math.floor(ph), u = b_umbral(x, y);
      if (fr < 0.07 + cerca * 0.05) { if (u < 0.35 + cerca * 0.4) B[f + x] = fr < 0.03 && cerca > 0.4 ? P[6] : P[4]; }
      else if (fr > 0.5 && fr < 0.5 + 0.1 + cerca * 0.12) { if (u < 0.3 + cerca * 0.35) B[f + x] = P[5]; } } }
}

// el reflejo de algo oscuro en el agua tranquila: bajo (x, y), ancho w, una mancha vertical tramada que tiembla
function b_reflejo(R, t, x, y, w, alto, c) {
  for (let j = 1; j < alto; j++) { const v = j / alto, ww = w * (1 - v * 0.5), dx = Math.sin(t * 2.1 + j * 0.9) * (1 + v * 2);
    for (let i = Math.round(-ww / 2); i <= ww / 2; i++) { const X = Math.round(x + i + dx), Y = y + j; if (b_umbral(X, Y) < 0.55 * (1 - v) && (j + Math.floor(t * 3)) % 3 !== 0) R.pset(X, Y, b_mezcla(R.pget(X, Y), c, 0.45)); } }
}

// el tubo del catalejo, fijo (en un búfer, con la distancia al centro de cada píxel): el aro de latón de la lente (luz
// arriba a la izquierda), la copa del ocular moleteada con su canto brillante, su sombra, y fuera la penumbra que no es
// negra: lo que se ve borroso alrededor (arriba el gris del cielo, abajo el verde de la borda del Dei Gratia) que se
// apaga hacia las esquinas, un reflejo interior del tubo en arco y grano; las zonas tranquilas, solo el tono de fondo
function b_tuboCatalejo(R, cx, cy, r) {
  return b_capa(R, 'tubo:' + cx + ':' + cy + ':' + r, (b) => {
    const d = new Float32Array(57600), lat = hex('#a8823a'), latL = hex('#ecd082'), latS = hex('#4e3814'), latD = hex('#2e2210');
    const copa = [hex('#1a140c'), hex('#2a2014'), hex('#3e3018'), hex('#6a5228'), hex('#a88a48')], cielo = hex('#3a424e'), borda = hex('#1e3426'), fondo = [hex('#07070b'), hex('#0e0e14'), hex('#17161c'), hex('#221d18')];
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const dx = x + 0.5 - cx, dy = y + 0.5 - cy, dd = Math.sqrt(dx * dx + dy * dy), i = y * 320 + x, a = (-dx - dy) / (dd || 1), ang = Math.atan2(dy, dx), u = b_umbral(x, y); d[i] = dd;
      if (dd <= r) { b[i] = 0; continue; }
      // el tono liso de la penumbra en este punto (lo que queda en las zonas tranquilas)
      const lejos0 = Math.min(1, Math.max(0, (dd - r - 19) / 95)), arr0 = Math.max(0, Math.min(1, (cy - 26 - y) / 50));
      const liso = b_mezcla(b_mezcla(fondo[1], fondo[2], (1 - lejos0) * 0.45), cielo, arr0 * (0.5 - lejos0 * 0.3) * (0.35 + 0.25 * (1 - lejos0)));
      let c;
      if (dd <= r + 4) c = dd > r + 3 ? latS : a > 0.55 ? latL : a < -0.4 ? latS : lat;
      else if (dd <= r + 16) {   // la copa del ocular: moleteado en rayas, más claro arriba a la izquierda, canto brillante fuera
        const s = (dd - r - 4) / 12, raya = Math.floor((ang + 3.2) * 42) & 1, luz = a * 0.5 + 0.5;
        let k = Math.round(luz * 2.2 + (raya ? 0.6 : -0.2) - s * 0.6); if (dd > r + 14.5) k = a > 0.2 ? 4 : a > -0.3 ? 3 : 2; else if (dd < r + 5.5) k = 0;
        c = copa[Math.max(0, Math.min(4, k))];
      } else if (dd <= r + 19) c = u < 0.75 ? latD : fondo[0];
      else {   // la penumbra: el cielo borroso arriba, la borda verde abajo, que se apagan con la distancia
        const lejos = Math.min(1, (dd - r - 19) / 95), arriba = Math.max(0, Math.min(1, (cy - 26 - y) / 50)), abajo = Math.max(0, Math.min(1, (y - cy - 34) / 40));
        const tono = (1 - lejos) * 0.55 + 0.12, n = h(x >> 2, y >> 2, 951) * 0.25 + h(x, y, 952) * 0.12;
        c = u < tono + n - 0.25 ? fondo[3] : u < tono + n ? fondo[2] : u < 0.5 + n ? fondo[1] : fondo[0];
        if (arriba > 0 && u < arriba * (0.5 - lejos * 0.3)) c = b_mezcla(c, cielo, 0.35 + 0.25 * (1 - lejos));
        if (abajo > 0 && u < abajo * 0.6) c = b_mezcla(c, borda, 0.5 * (1 - lejos * 0.5));
        // el reflejo interior del tubo: un arco tenue de latón arriba a la izquierda y otro más débil abajo a la derecha
        const ra = Math.abs(dd - r - 27);
        if (ra < 2.5 && a > 0.25 && u < (2.5 - ra) / 2.5 * (a - 0.2)) c = b_mezcla(c, lat, 0.32);
        if (ra < 1.5 && a < -0.55 && u < 0.35) c = b_mezcla(c, latS, 0.5);
      }
      const q = b_quietud(x, y); if (q > 0) c = b_mezcla(c, liso, Math.min(1, q * 1.2));
      b[i] = c;
    }
    return { d };
  });
}

// los brillos del tubo que se mueven con el pulso del catalejo: el reflejo largo del aro y de la copa (arriba a la
// izquierda) que se corre con la imagen, un destello corto que va y viene y la luz fría que entra por el lado contrario
function b_brillosCatalejo(R, t, cx, cy, r, ox, oy) {
  const blanco = hex('#fff6d0'), claro = hex('#f4dc84'), frio = hex('#8a9aac'), a0 = -2.36 + ox * 0.035 - oy * 0.02, ab = 0.32 + 0.08 * Math.sin(t * 0.7);
  const P = (a, rr) => [Math.round(cx + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr)], ps = (x, y, c) => { if (!b_quieta(x, y)) R.pset(x, y, c); };
  for (let a = a0 - ab; a < a0 + ab; a += 0.012) { const f = 1 - Math.abs(a - a0) / ab; ps(...P(a, r + 1.5), f > 0.5 ? blanco : claro); if (f > 0.3) ps(...P(a, r + 15.5), claro); }
  // el destello corto que corre por el aro
  { const a = a0 + Math.sin(t * 0.9) * 0.6, f = Math.max(0, Math.sin(t * 1.7)); if (f > 0.2) for (let k = -3; k <= 3; k++) { const [x, y] = P(a + k * 0.01, r + 2); ps(x, y, blanco); }
    if (f > 0.75) { const [x, y] = P(a, r + 2); for (let k = 1; k < 4; k++) { ps(x + k, y, claro); ps(x - k, y, claro); ps(x, y + k, claro); ps(x, y - k, claro); } } }
  // la luz fría que se cuela por el lado contrario al ojo, en el canto de la copa (abajo a la derecha)
  const a1 = 0.78 - ox * 0.04 + oy * 0.03;
  for (let a = a1 - 0.25; a < a1 + 0.25; a += 0.015) { const [x, y] = P(a, r + 14.5); if (h(Math.round(a * 80), 0, 953) > 0.3) ps(x, y, frio); }
}

// el punto de una ruta (pts en lon, lat) a la fracción f de su largo, en pantalla
function b_enRuta(pts, f) {
  const P = pts.map(([a, b]) => b_proy(a, b)), seg = []; let L = 0; for (let i = 1; i < P.length; i++) { const l = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(l); L += l; }
  let q = L * Math.max(0, Math.min(1, f));
  for (let i = 1; i < P.length; i++) { if (q <= seg[i - 1] || i === P.length - 1) { const u = Math.min(1, q / (seg[i - 1] || 1)); return [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * u, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * u]; } q -= seg[i - 1]; }
  return P[P.length - 1];
}

// las olas en la costa de una carta: costa = [espuma, franja 1, franja 2, …] (índices de papel liso junto a la tinta y
// cada vez más lejos de ella); la franja de agua sale de la costa hacia el mar, una ola cada ~1,6 s, y la espuma brilla a ratos
function b_olasCosta(R, t, costa, agua, espuma) {
  const B = R.buf, n = costa.length, f = (t * 0.62) % 1, cual = Math.floor(f * n), k = Math.floor(t * 3);
  if (cual) for (const i of costa[cual]) { const x = i % 320, y = (i / 320) | 0; if (((x + y) & 1) === (cual & 1)) B[i] = agua; }
  for (const i of costa[0]) if (h(i, k, 960) > 0.82) B[i] = espuma;
}

// las olitas de tinta del mar de una carta (pts: [x, y] de cada una): tres crestas que se rizan y corren un píxel
function b_olitas(R, t, pts, c) {
  pts.forEach(([x, y], k) => { const f = Math.floor(t * 1.6 + k * 0.7) % 2, dx = Math.round(Math.sin(t * 0.8 + k) * 1.2);
    for (let j = 0; j < 3; j++) { const bx = x + dx + j * 4; R.pset(bx, y + 1, c); R.pset(bx + 1, y - f, c); R.pset(bx + 2, y - 1 + f, c); R.pset(bx + 3, y + 1, c); } });
}

const B_OLITAS_MAPA = [[54, 118], [118, 122], [126, 146], [44, 132], [104, 156], [150, 150], [176, 156], [150, 74], [150, 48], [200, 70], [60, 104]];

// una ballena de tinta en la carta, en (x, y): el lomo que asoma y se hunde despacio y el soplo cada pocos segundos
function b_ballenaTinta(R, t, x, y, tinta, agua) {
  const sube = Math.round((Math.sin(t * 0.9) + 1) * 1.2);
  for (let i = -8; i <= 8; i++) { const yy = y - Math.round(Math.sqrt(Math.max(0, 1 - (i / 9) ** 2)) * (3 + sube)); R.pset(x + i, yy, tinta); if (i > -6 && i < 6 && (i & 1)) R.pset(x + i, yy + 2, agua); }
  R.linea(x + 8, y, x + 12, y - 3, tinta); R.linea(x + 12, y - 3, x + 13, y - 1, tinta); R.linea(x + 12, y - 3, x + 11, y - 5, tinta);   // la cola
  R.pset(x - 5, y - 2 - sube, tinta);   // el ojo
  for (let i = -11; i <= 14; i += 3) R.pset(x + i, y + 1, agua);
  const s = (t % 5.2) / 5.2; if (s < 0.4) { const v = s / 0.4, hgt = Math.round(3 + v * 6);
    for (let j = 0; j < hgt; j++) R.pset(x - 4, y - 4 - sube - j, tinta); R.pset(x - 6, y - 4 - sube - hgt, tinta); R.pset(x - 2, y - 4 - sube - hgt, tinta); R.pset(x - 7, y - 3 - sube - hgt, tinta); R.pset(x - 1, y - 3 - sube - hgt, tinta); }
}

// la luz de la lumbrera (la claraboya del camarote) sobre la carta: seis cristales con su cruceta, inclinados, que se
// mecen con el barco; las nubes que pasan la apagan por franjas y la sombra de una gaviota la cruza de vez en cuando
function b_lumbrera(R, t, x0, y0, w, hg) {
  const B = R.buf, luz = hex('#fffbe8'), sombra = hex('#5a4020'), dx0 = Math.round(Math.sin(t * 0.8) * 6), dy0 = Math.round(Math.sin(t * 0.8 + 1) * 2), sh = 0.35;
  for (let y = y0; y < y0 + hg; y++) { const v = (y - y0) / hg, xa = x0 + dx0 + Math.round((y - y0) * sh);
    for (let x = xa; x < xa + w; x++) { const u = (x - xa) / w, yy = y + dy0;
      if (yy < 0 || yy > 179 || x < 0 || x > 319 || b_quieta(x, yy)) continue;
      if (Math.abs(u - 1 / 3) < 0.016 || Math.abs(u - 2 / 3) < 0.016 || Math.abs(v - 0.5) < 0.04 || u < 0.02 || u > 0.98 || v < 0.04 || v > 0.96) {   // la sombra del marco y de la cruceta
        if (b_umbral(x, yy) < 0.85) { const i = yy * 320 + x; B[i] = b_mezcla(B[i], sombra, 0.3); } continue; }
      const nube = 0.5 + 0.5 * Math.sin((x - t * 9) * 0.05 + Math.sin(yy * 0.07) * 1.4) * Math.sin((x - t * 5) * 0.021 + 1.3), a = 0.5 * (1 - 0.85 * Math.max(0, nube - 0.35) / 0.65) * (0.75 + 0.25 * Math.min(1, Math.min(u, 1 - u) * 6));
      if (b_umbral(x, yy) < 0.2 + a * 2.4) { const i = yy * 320 + x; B[i] = b_mezcla(B[i], luz, a); } } }
  // la sombra de una gaviota que cruza la luz
  for (let k = 0; k < 2; k++) { const per = 7 + k * 3, f = ((t + k * 3.1) % per) / per, gx = Math.round(x0 - 20 + f * (w + 70)), gy = Math.round(y0 + hg * (0.3 + 0.4 * k) + Math.sin(t * 2 + k) * 2), al = Math.sin(t * 9 + k) > 0 ? 1 : 0;
    if (f > 0.85) continue;
    for (let i = 1; i <= 4; i++) { for (const sg of [-1, 1]) { const x = gx + sg * i, y = gy - (i > 2 ? al : 0) + (i === 1 ? 0 : 0); if (!b_quieta(x, y)) R.pset(x, y, b_mezcla(R.pget(x, y), hex('#4a3420'), 0.55)); } }
    R.pset(gx, gy, b_mezcla(R.pget(gx, gy), hex('#4a3420'), 0.6)); R.pset(gx, gy + 1, b_mezcla(R.pget(gx, gy + 1), hex('#4a3420'), 0.55)); }
}

// la lona de las piezas: (u, v) sobre la lona (u 0–146 a lo largo, v 0–22 a lo ancho) → (x, y) en pantalla
const c_lona = (u, v) => [Math.round(126 + u + v * 2 / 22), Math.round(76 - u * 14 / 146 + v)];

// una pieza larga sobre la lona, de u0 a u1 en la fila v, de grosor g: luz arriba, cuerpo y sombra abajo, con su
// sombra arrojada en la lona (cs = [luz, cuerpo, sombra])
function c_piezaLarga(R, u0, u1, v, g, cs) {
  for (let u = u0; u <= u1; u += 0.5) { const [x, y] = c_lona(u, v); R.pset(x + 1, y + g + 1, c_mez(R.pget(x + 1, y + g + 1), hex('#2a2016'), 0.45)); }
  for (let u = u0; u <= u1; u += 0.5) { const [x, y] = c_lona(u, v); R.pset(x, y - 1, C.k); R.pset(x, y + g, C.k); for (let j = 0; j < g; j++) R.pset(x, y + j, j === 0 ? cs[0] : j === g - 1 ? cs[2] : cs[1]); }
  for (const u of [u0, u1]) { const [x, y] = c_lona(u, v); for (let j = -1; j <= g; j++) R.pset(x + (u === u0 ? -1 : 1), y + j, C.k); }
}

// la cara del Peñón de cerca (cámara 'barco', en el búfer fijo, sobre d_penon): barrancos en sombra con matorral en el
// fondo, cornisas de los estratos con matas, las troneras de las galerías del asedio y la torre del castillo moro con su
// lienzo de muralla; top: la cresta (y por x) que devuelve d_penon. Solo pinta por encima de y 84 (la ciudad tapa el resto)
function d_penonCerca(R, top) {
  const P = d_P, dentro = (x, y) => x >= 0 && x < 320 && y > top[x] + 2 && y < 86 && !d_veda(x, y);
  const mata = (x, y, r) => { if (!dentro(Math.round(x), Math.round(y))) return; R.disco(x + 0.6, y + 0.8, r, P.matD); R.disco(x, y, r * 0.85, h(x, y, 521) < 0.4 ? P.matS : P.mat); R.disco(x - r * 0.3, y - r * 0.35, r * 0.4, P.matL); };
  // las cornisas de los estratos: siguen la cresta, rotas a trozos, con su luz arriba, su sombra debajo y matas encima
  for (const [off, k] of [[13, 0], [24, 1], [36, 2], [49, 3]]) for (let x = 0; x < 320; x++) {
    if (h(x >> 3, k, 522) < 0.28) continue;
    const y = Math.round(top[x] + off + Math.sin(x * 0.045 + k * 1.7) * 2.5); if (!dentro(x, y) || !dentro(x, y + 2)) continue;
    R.pset(x, y, P.calizaL); R.pset(x, y + 1, P.calizaD); if (d_umbral(x, y + 2) < 0.5) R.pset(x, y + 2, P.calizaS);
    if ((x & 7) === 3 && h(x, k, 523) > 0.55) { mata(x, y - 1, 1.6 + h(x, k, 524) * 1.2); if (h(x, k, 525) > 0.5) mata(x + 3, y - 1, 1.2); } }
  // los barrancos: bajan de la cresta hacia la ciudad, ensanchándose; borde oscuro a la izquierda y luz a la derecha
  for (const [xs, dr, k] of [[34, 0.25, 0], [86, -0.2, 1], [128, 0.3, 2], [196, -0.15, 3], [252, -0.35, 4]]) {
    const y0 = Math.round(top[xs] + 3);
    for (let y = y0; y < 86; y++) { const c = xs + dr * (y - y0) + Math.sin(y * 0.28 + k) * 1.5, w = Math.min(4, 0.8 + (y - y0) / 11);
      for (let x = Math.round(c - w); x <= Math.round(c + w); x++) { if (!dentro(x, y)) continue;
        const e = x - (c - w); R.pset(x, y, e < 1 ? P.grieta : e > 2 * w - 1 ? P.calizaL : d_umbral(x, y) < 0.55 ? P.calizaD : P.calizaS); }
      if (y > y0 + 8 && h(y, k, 526) > 0.82) mata(c + (h(y, k, 527) - 0.5) * 6, y, 1.4 + h(y, k, 528) * 1.4); } }
  // las galerías del asedio: troneras negras con su labio de luz y la boca de un cañón
  for (const [gx, gy] of [[132, 62], [141, 59], [150, 56], [188, 46], [197, 43], [258, 40]]) { if (!dentro(gx, gy) || !dentro(gx + 3, gy + 3)) continue;
    R.rect(gx - 1, gy - 1, gx + 3, gy - 1, P.calizaL); R.rect(gx, gy, gx + 2, gy + 2, P.grieta); R.rect(gx, gy + 1, gx + 1, gy + 2, P.negro); R.pset(gx + 1, gy + 1, P.canon); R.rect(gx - 1, gy + 3, gx + 3, gy + 3, P.calizaD); }
  // la torre del homenaje del castillo moro (x 98–113, almenas en y 58) con su lienzo de muralla que baja a la izquierda
  { const x0 = 98, x1 = 113, y0 = 60, y1 = 84;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const sombra = x > x1 - 4, junta = (y - y0) % 4 === 0 || ((x + ((y - y0) >> 2) * 3) % 7 === 0);
      R.pset(x, y, junta ? (sombra ? P.calizaD : P.ocreCS) : sombra ? (d_umbral(x, y) < 0.5 ? P.ocreCS : P.calizaS) : h(x, y, 529) > 0.9 ? P.calizaL : P.ocreC); }
    for (let x = x0; x <= x1; x += 3) R.rect(x, y0 - 2, x + 1, y0 - 1, x > x1 - 4 ? P.ocreCS : P.ocreC);
    R.rect(x0, y0, x1, y0, P.calizaL); R.rect(102, 66, 103, 70, P.grieta); R.rect(108, 66, 109, 70, P.grieta); R.rect(102, 75, 103, 78, P.grieta);
    R.linea(106, 50, 106, 57, P.maderaD);
    for (let x = 60; x < x0; x++) { const y = Math.round(82 - (x - 60) * 0.26); if (!dentro(x, y - 3)) continue; R.rect(x, y - 2, x, y + 2, (x & 1) ? P.ocreC : P.ocreCS); R.pset(x, y - 3, P.calizaL); if ((x % 4) < 2) R.pset(x, y - 4, P.ocreC); R.pset(x, y + 3, P.calizaD); } }
  // el asta de la bandera de la batería
  R.linea(220, 19, 220, 30, P.maderaD); R.pset(220, 18, P.laton);
}

// la vida del fondo en la cámara 'barco' (antes del casco): las banderas del castillo y de la batería, una mula con su
// arriero que sube y baja por el camino en zigzag, una dama que pasea por el adarve a la izquierda del barco (x 26–78,
// y 116; nunca detrás del casco, para que nadie parezca ir a bordo) y un bote de remos que cruza el agua de la izquierda (x 6–70)
function d_barcoVida(R, t) {
  const P = d_P;
  d_bandera(R, 106, 50, t, 7, -1); d_bandera(R, 220, 19, t, 7, -1);
  // la mula por el camino: (130, 70) → (180, 49) → (120, 60) y vuelta, 30 s el viaje entero
  { const seg = [[130, 70], [180, 49], [120, 60]], f = (t / 15) % 2, u = f < 1 ? f : 2 - f, k = u < 0.5 ? 0 : 1, v = (u - k * 0.5) * 2, [ax, ay] = seg[k], [bx, by] = seg[k + 1];
    const x = Math.round(lerp(ax, bx, v)), y = Math.round(lerp(ay, by, v)), d = (bx - ax) * (f < 1 ? 1 : -1) > 0 ? 1 : -1, p = Math.floor(t * 4) % 2;
    R.rect(x - 2, y - 3, x + 1, y - 2, P.maderaS); R.pset(x + 2 * d, y - 4, P.maderaS); R.pset(x + 2 * d, y - 3, P.madera); R.pset(x - 2 * d, y - 2, P.maderaD);
    R.pset(x - 2 + p, y - 1, P.maderaD); R.pset(x + 1 - p, y - 1, P.maderaD); R.rect(x - 1, y - 4, x, y - 4, P.cuerdaL);
    R.pset(x - d, y - 6, P.chaqueta); R.pset(x - d, y - 5, P.chaqueta); R.pset(x - d, y - 7, P.piel); R.pset(x - d, y - 8, P.negroT); }
  // la dama del adarve
  for (const [tipo, a, b, vel, k] of [['dama', 26, 78, 3, 0]]) {
    const L = b - a, q = ((t * vel + h(k, 1, 530) * L * 2) % (2 * L) + 2 * L) % (2 * L), ida = q < L, x = ida ? a + q : b - (q - L);
    d_figura(R, x, 116, t, tipo, { dir: ida ? 1 : -1, anda: true }); }
  // el bote de remos que cruza a la izquierda, con su estela
  { const f = (t / 20) % 2, ida = f < 1, u = d_suave(ida ? f : 2 - f), x = Math.round(lerp(10, 66, u)), y = 146, fase = t * 4.5, dir = ida ? 1 : -1;
    for (let i = 3; i < 12; i += 2) if ((i + Math.floor(t * 4)) % 3) R.pset(x - dir * i, y + 1 + (i & 1), P.aguaL);
    R.rect(x - 7, y - 2, x + 7, y, P.madera); R.rect(x - 7, y - 2, x + 7, y - 2, P.blanco); R.rect(x - 6, y, x + 6, y, P.maderaS); R.pset(x + 8 * dir, y - 3, P.madera);
    const r = Math.round(Math.sin(fase) * 3); R.linea(x, y - 4, x - 4 + r, y + 1, P.maderaL); R.linea(x + 1, y - 4, x + 5 + r, y + 1, P.maderaL);
    d_figura(R, x, y - 2, t, 'remero', { fase }); }
}

// unas filas de cubos de papel en relieve, para la cámara de cerca: la cara delantera (con la solapa doblada y el
// canto de la izquierda), la tapa clara en perspectiva con su pliegue, el costado en sombra a la derecha y la sombra
// de contacto; las caras delanteras quedan en el mismo sitio que las de e_cubos
function e_cubos3d(R, x0, x1, yb, l, k = 1) {
  const U = e_U, { rect, pset } = R;
  const cara = e_mezcla(U.cuboS, U.cubo, k), tapa = e_mezcla(U.cubo, U.cuboL, k), lado = e_mezcla(U.cuboS, U.fondoCajaS, 0.3 + 0.2 * (1 - k)), borde = e_mezcla(U.cuboS, C.k, 0.3);
  const gap = Math.max(2, Math.round(l * 0.6)), dx = Math.min(gap - 1, Math.round(l * 0.35)), dy = Math.max(1, Math.round(l * 0.28));
  for (let x = x0, n = 0; x + l + 1 <= x1; x += l + gap, n++) {
    // la sombra de contacto en el suelo de tablas
    rect(x, yb, x + l + dx, yb, e_mezcla(U.fondoCajaS, C.k, 0.45)); rect(x + l, yb - 1, x + l + dx, yb - 1, e_mezcla(U.fondoCajaS, C.k, 0.3));
    // la tapa: filas que se desplazan hacia la derecha al subir; el canto de atrás más claro y el pliegue de la solapa
    for (let j = 1; j <= dy; j++) { const o = Math.round(j * dx / dy); rect(x + o, yb - l - j, x + l - 1 + o, yb - l - j, j === dy ? U.cuboL : tapa); }
    if (dy >= 2) rect(x + 1 + Math.round(dx / 2), yb - l - Math.ceil(dy / 2), x + l - 2 + Math.round(dx / 2), yb - l - Math.ceil(dy / 2), e_mezcla(tapa, U.cuboS, 0.45));
    // el costado en sombra
    for (let i = 0; i < dx; i++) { const o = Math.round((i + 1) * dy / dx); rect(x + l + i, yb - l - o + 1, x + l + i, yb - 1 - Math.max(0, o - 1), i === dx - 1 ? e_mezcla(lado, C.k, 0.15) : lado); }
    // la cara: su luz, el canto izquierdo, la solapa doblada y alguna arruga del papel
    rect(x, yb - l, x + l - 1, yb - 1, cara); rect(x, yb - l, x + l - 1, yb - l, U.cuboL); rect(x, yb - l + 1, x, yb - 1, e_mezcla(cara, U.cuboL, 0.6));
    rect(x + l - 1, yb - l + 1, x + l - 1, yb - 1, e_mezcla(cara, U.cuboS, 0.5)); rect(x + 1, yb - 1, x + l - 2, yb - 1, e_mezcla(cara, U.cuboS, 0.4));
    if (l >= 10) { rect(x + 2, yb - l + Math.round(l * 0.32), x + l - 3, yb - l + Math.round(l * 0.32), e_mezcla(cara, U.cuboS, 0.35)); if (h(n, yb, 420) > 0.5) pset(x + 2 + Math.floor(h(n, l, 421) * (l - 5)), yb - Math.round(l * 0.4), e_mezcla(cara, U.cuboS, 0.5)); }
    pset(x + l, yb - l, borde);
  }
}

// la regla de acero clavada al fondo de la caja (de x0 a x1, en y): marcas cada 4 px, largas cada 20 y sus cifras
function e_reglaCaja(R, x0, x1, y) {
  const U = e_U, { rect, pset } = R;
  rect(x0, y, x1, y + 7, C.k); rect(x0 + 1, y + 1, x1 - 1, y + 6, U.metal); rect(x0 + 1, y + 1, x1 - 1, y + 1, U.metalL); rect(x0 + 1, y + 6, x1 - 1, y + 6, U.metalS);
  for (let x = x0 + 3, i = 0; x < x1 - 2; x += 4, i++) { rect(x, y + 1, x, y + (i % 5 === 0 ? 4 : 2), U.metalD); if (i % 5 === 0 && i > 0 && x + 9 < x1) R.numero(String(i * 2), x + 2, y + 6, { color: U.metalD, sombra: false, fina: true }); }
  for (const x of [x0 + 2, x1 - 2]) { pset(x, y + 4, U.laton); }
}

// un reloj de pared desenfocado (cx, cy, radio r) sobre el color de fondo bg: el aro, la esfera y sus marcas (las
// agujas se pintan en cada fotograma con e_agujas)
function e_relojBorroso(R, cx, cy, r, bg, aro) {
  // (lo bastante suave para leerse lejos, detrás de lo enfocado)
  const { disco, pset } = R;
  disco(cx, cy, r + 1, e_mezcla(bg, C.k, 0.45)); disco(cx, cy, r, e_mezcla(bg, aro, 0.7)); disco(cx, cy, r - 1.5, e_mezcla(bg, C.blanco, 0.75));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(cx + Math.cos(a) * (r - 2.5)), Math.round(cy + Math.sin(a) * (r - 2.5)), e_mezcla(bg, C.k, k % 3 ? 0.35 : 0.6)); }
}

// las agujas de un reloj (hora y minuto quietos, el segundero que gira con t)
function e_agujas(R, cx, cy, r, t, c, cs) {
  const s = t * Math.PI * 2 / 60 - Math.PI / 2;
  R.linea(cx, cy, Math.round(cx + Math.cos(-0.5) * (r - 3)), Math.round(cy + Math.sin(-0.5) * (r - 3)), c);
  R.linea(cx, cy, Math.round(cx + Math.cos(2.3) * (r - 5)), Math.round(cy + Math.sin(2.3) * (r - 5)), c);
  R.linea(cx, cy, Math.round(cx + Math.cos(s) * (r - 2)), Math.round(cy + Math.sin(s) * (r - 2)), cs);
}

// lo fijo que se añade al arrecife: cirros altos (fuera del año y de Atom), cabezos de coral bajo el agua somera de
// abajo a la derecha y LAS ROCAS volcánicas del primer término de la derecha (x 258–319, y ≥ 140; máscara 6), con
// percebes, algas en la línea del agua, grietas y un charco que refleja el cielo
function f_arrecifeExtra(R, m) {
  const P = f_P, { pset } = R;
  for (const [x0, y0, l, sem] of [[178, 16, 46, 1], [196, 22, 34, 2], [150, 30, 40, 3], [208, 50, 30, 4], [120, 26, 24, 5]]) for (let i = 0; i < l; i++) {
    const x = x0 + i, y = y0 + Math.round(Math.sin(i * 0.12 + sem) * 1.5), w = Math.sin(i / l * Math.PI);
    for (const dy of [0, 1]) { const j = (y + dy) * 320 + x; if (m[j] === 1 && !f_tranquilo(x, y + dy) && f_b4(x, y + dy) < w * (dy ? 0.35 : 0.7)) pset(x, y + dy, dy ? P.cielo3 : P.cielo4); } }
  for (const [cx, cy, rx, ry, sem] of [[192, 171, 18, 5, 1], [236, 160, 12, 4, 2], [166, 158, 7, 3, 3], [222, 176, 9, 3, 4], [150, 170, 6, 2, 5]]) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x >> 1, y, 40 + sem) - 0.5) * 0.5; if (d > 1 || x < 0 || x > 319 || y > 179 || m[y * 320 + x] !== 3) continue;
    pset(x, y, d < 0.35 ? f_mezcla(P.coral1, P.marT, 0.5) : f_mezcla(R.pget(x, y), d > 0.8 ? P.marTLL : P.coral0, d > 0.8 ? 0.35 : 0.45)); }
  const top = (x) => Math.round(172 - 26 * Math.sin(f_lim((x - 258) / 62) * Math.PI * 0.62) + 2 * Math.sin(x * 0.4) + (x > 284 && x < 290 ? 3 : 0));
  const RK = [hex('#2a2624'), hex('#3e3834'), hex('#5a524a'), hex('#80766a')];
  for (let x = 258; x < 320; x++) { const tp = top(x); for (let y = tp; y < 180; y++) { if (y > 171 && x < 266 + (y - 171) * 2) continue; const mar = R.pget(x, y); const n = h(x >> 1, y >> 1, 41), v = y - tp, luz = 0.75 - v / 34 + (n - 0.5) * 0.45 - (x - 258) * 0.004;
      let c = v < 1 ? RK[3] : f_rampa(RK, luz, x, y); if (Math.sin(x * 0.5 + y * 0.9) > 0.94 && v > 2) c = RK[0]; if (y > 171) c = f_mezcla(c, mar, 0.5 + (y - 171) * 0.04); else if (y === 171 && v > 2) c = hex('#3a7a4a');
      if (h(x, y, 42) > 0.975 && v > 1 && y < 168) c = hex('#a89e90'); else if (h(x >> 1, y >> 1, 43) > 0.94 && v > 3 && y > 160) c = hex('#4a6a3a'); pset(x, y, c); m[y * 320 + x] = 6; } }
  for (let j = 0; j < 12; j++) { const xa = 280 + Math.round(j * 0.3), xb = 304 - Math.round(j * 0.4); pset(xa, top(280) + 3 + j, RK[0]); pset(xb, top(304) + 3 + j, RK[0]); }
  { const y = Math.max(top(308), top(316)) + 3; for (let x = 309; x < 317; x++) { const borde = x === 309 || x === 316; pset(x, y, borde ? hex('#2a2624') : hex('#9ac8e4')); if (!borde) pset(x, y + 1, x % 3 ? hex('#7ab0d8') : hex('#d6f0f8')); pset(x, y + 2, hex('#2a2624')); } }
  for (let x = 262; x < 318; x += 2) { const y = 172 + (x % 3); pset(x, y, hex('#2e6a3a')); pset(x + 1, y + 1, hex('#5a9a4a')); }
}

// el nubarrón de lluvia tropical sobre los montes (nx su centro): cuatro tonos con el filo de luz arriba a la derecha y
// la cortina de lluvia que baja hasta la orilla; pinta sobre el cielo y los montes, nunca en las zonas tranquilas
function f_nubarron(R, m, t, nx) {
  const C4 = [hex('#4e5868'), hex('#66717f'), hex('#8a95a4'), hex('#c2cad4')], ok = (x, y) => { const v = m[y * 320 + x]; return (v === 1 || v === 2) && !f_tranquilo(x, y); };
  const bolas = [[-30, 52, 11], [-16, 46, 15], [2, 42, 17], [20, 46, 14], [33, 52, 10], [-6, 52, 13], [12, 53, 12]];
  for (let y = 24; y < 66; y++) for (let x = Math.round(nx) - 44; x <= Math.round(nx) + 46; x++) { if (x < 0 || x > 319 || !ok(x, y)) continue;
    let best = 9, lz = -9; for (const [dx, cy, r] of bolas) { const ex = (x - nx - dx) / r, ey = (y - cy) / (r * 0.8), d = ex * ex + ey * ey; if (d < best) best = d; if (d < 1) lz = Math.max(lz, -ey * 0.8 + ex * 0.3 - d * 0.3); }
    if (best > 1 || y > 58 + Math.round(Math.sin(x * 0.3) * 1.5)) continue; if (best > 0.86 && f_b4(x, y) > 0.5) continue;
    R.pset(x, y, y > 55 ? C4[0] : lz > 0.55 ? C4[3] : lz > 0.15 ? C4[2] : lz > -0.3 ? C4[1] : C4[0]); }
  for (let x = Math.round(nx) - 34; x <= Math.round(nx) + 34; x++) { const den = Math.cos((x - nx) / 34 * Math.PI / 2);
    for (let y = 57; y < 78; y++) { const xx = x - ((y - 57) >> 2); if (xx < 0 || xx > 319 || !ok(xx, y)) continue; const raya = (y * 3 + x * 7 - Math.floor(t * 24)) % 9;
      const fin = f_lim((78 - y) / 8); if (fin <= 0) continue;
      if (f_b4(xx, y) < den * 0.75 * fin) R.pset(xx, y, f_mezcla(R.pget(xx, y), hex('#7a8696'), 0.5));
      if ((raya + 9) % 9 < 2 && x % 2 === 0 && h(x, 1, 63) < den) R.pset(xx, y, f_mezcla(R.pget(xx, y), hex('#b4bcc8'), 0.75 * fin)); } }
}

// lo vivo de las rocas de la derecha: la ola que sube por su pie y revienta en espuma, y el pelícano posado arriba
// que se arregla las plumas y a ratos abre las alas
function f_rocasVivas(R, t, m) {
  const P = f_P, ola = Math.sin(t * 1.6 - 4.2), sube = Math.max(0, ola);
  for (let x = 258; x < 320; x++) { let y0 = 179; while (y0 > 140 && m[(y0 - 1) * 320 + x] === 6) y0--; if (y0 >= 179) continue;
    const pie = 173 - Math.round(sube * 5 + Math.sin(x * 0.5 + t * 3) * 1); for (let y = pie; y < 180; y++) if (m[y * 320 + x] === 6) R.pset(x, y, f_mezcla(R.pget(x, y), y === pie ? P.espuma : P.marTL, y === pie ? 1 : 0.55));
    if (x < 266 || x % 2) continue; const sal = sube > 0.85 ? (sube - 0.85) * 6.6 : 0; if (sal > 0 && h(x, Math.floor(t * 8), 64) > 0.55) for (let k = 0; k < 2; k++) R.pset(x + k, pie - 1 - Math.round(sal * (2 + h(x, k, 65) * 4)), k ? P.espumaS : P.espuma); }
  const px = 300; let py = 136; while (py < 170 && m[py * 320 + px] !== 6) py++; const ab = (t % 7) > 6.1, cab = Math.sin(t * 0.9) > 0.6;
  const PB = hex('#7a6e60'), PS = hex('#4e463c'), PL = hex('#e8e0c8'), PC = hex('#d8a040');
  R.rect(px - 4, py - 5, px + 3, py - 2, PB); R.linea(px - 4, py - 5, px + 2, py - 5, hex('#a89a86')); R.linea(px - 3, py - 2, px + 3, py - 2, PS); R.pset(px - 5, py - 3, PS); R.pset(px - 6, py - 2, PS);
  R.pset(px + 3, py - 6, PL); R.pset(px + 3, py - 7, PL); R.pset(px + 3, py - 8, PL); R.pset(px + 4, py - 9, PL); R.pset(px + 4, py - 8, hex('#1c1a20'));
  if (cab) { R.pset(px + 2, py - 7, PC); R.pset(px + 1, py - 6, PC); R.pset(px, py - 5, PC); } else { R.linea(px + 5, py - 9, px + 9, py - 7, PC); R.linea(px + 5, py - 8, px + 8, py - 6, hex('#b88030')); }
  R.pset(px - 1, py - 1, PC); R.pset(px - 1, py, PC); R.pset(px + 1, py - 1, PC); R.pset(px + 1, py, PC);
  if (ab) { R.linea(px - 4, py - 5, px - 12, py - 10, PB); R.linea(px - 4, py - 4, px - 11, py - 8, PS); R.linea(px + 2, py - 5, px + 9, py - 12, PB); R.linea(px + 2, py - 4, px + 9, py - 10, PS); }
}

// la vida añadida bajo el agua: el casco de la lancha de buceo visto desde abajo en la superficie (x 180–246, y 0–8)
// con su motor y el cabo del ancla que se pierde en el azul; una raya águila que planea lejos; tres medusas que laten a
// la izquierda; peces lejanos en silueta sobre el arrecife del fondo; y anguilas jardineras que asoman de la arena
// (x 62–86) y se esconden
function f_fondoVida(R, t, m) {
  const P = f_P, bob = Math.round(Math.sin(t * 1.1) * 0.6), HC = hex('#1a5068'), HL = hex('#4a90a8'), HS = hex('#123e54');
  for (let x = 180; x <= 246; x++) { const u = (x - 180) / 66, fondo = Math.round(1 + Math.sin(Math.min(1, u * 1.8) * Math.PI / 2) * 6) + bob;
    for (let y = 0; y <= fondo; y++) R.pset(x, y, y === fondo ? HL : y === fondo - 1 ? HC : y === 2 && x > 184 ? HC : x % 11 === 0 && y < fondo - 1 ? HC : HS); }
  for (let x = 186; x < 244; x++) R.pset(x, 6 + bob, f_mezcla(HS, HL, 0.35));
  for (let x = 176; x < 252; x++) if ((x + Math.floor(t * 6)) % 4 === 0) R.pset(x, 0, P.luz);
  R.rect(242, 2 + bob, 245, 12 + bob, HS); R.pset(243, 12 + bob, HL); { const g = Math.floor(t * 12) % 2; R.linea(240 + g, 13 + bob, 247 - g, 13 + bob, HC); }
  for (let j = 0; j < 30; j++) { const x = Math.round(190 + j * 0.35), y = 8 + j; if (!f_tranquilo(x, y)) R.pset(x, y, f_mezcla(R.pget(x, y), HC, 0.8 - j / 40)); }
  // la raya águila, vista desde arriba: planea de izquierda a derecha y bate despacio las alas
  { const u = ((t + 0.8) % 46) / 46, x = Math.round(350 - u * 380), y = Math.round(60 + Math.sin(t * 0.3) * 3), al = Math.round(Math.sin(t * 1.4) * 2), RC = f_mezcla(hex('#1a3a52'), P.agua2, 0.3), RS = f_mezcla(hex('#0e2436'), P.agua2, 0.3), RL = f_mezcla(hex('#4a7a92'), P.agua2, 0.3);
    if (x > -20 && x < 340) { R.poligono([[x - 6, y], [x + 1, y - 8 + al], [x + 5, y], [x + 1, y + 8 - al]], RC); R.linea(x - 6, y, x + 1, y - 8 + al, RL); R.linea(x + 5, y, x + 1, y + 8 - al, RS);
      R.pset(x - 4, y - 1, RS); R.pset(x - 4, y + 1, RS); R.pset(x - 7, y, RC); for (let k = 0; k < 14; k++) R.pset(x + 6 + k, y + Math.round(Math.sin(t * 2 + k * 0.4) * (k / 10)), RS); } }
  // las medusas: campana que se cierra y se abre, y sus filamentos
  for (const [mx0, my0, sem] of [[34, 70, 0], [70, 46, 1], [112, 86, 2]]) { const lat = (Math.sin(t * 2.4 + sem * 2) + 1) / 2, x = Math.round(mx0 + Math.sin(t * 0.25 + sem) * 4), y = Math.round(my0 + Math.sin(t * 0.35 + sem * 2.1) * 8), w = 5 + Math.round(lat * 2), hh = 4 + Math.round((1 - lat) * 1.5);
    for (let j = 0; j <= hh; j++) { const ww = Math.round(w * Math.sqrt(1 - ((hh - j) / (hh + 0.5)) ** 2)); for (let i = -ww; i <= ww; i++) { const xx = x + i, yy = y - hh + j; if (f_tranquilo(xx, yy)) continue; R.pset(xx, yy, f_mezcla(R.pget(xx, yy), j === 0 || Math.abs(i) === ww ? P.blanco : j === hh ? hex('#d090c8') : hex('#e8b8e0'), j === 0 ? 0.7 : 0.45)); } }
    R.pset(x - 1, y - 1, hex('#d080c0')); R.pset(x + 1, y - 1, hex('#d080c0'));
    for (let k = -2; k <= 2; k++) for (let j = 1; j < 8; j++) { const xx = x + k * 2 + Math.round(Math.sin(t * 2 + j * 0.6 + k) * j * 0.15), yy = y + j; if (j % 2 === 0 && !f_tranquilo(xx, yy)) R.pset(xx, yy, f_mezcla(R.pget(xx, yy), P.luz, 0.5)); } }
  // peces lejanos en silueta sobre el arrecife del fondo
  for (let k = 0; k < 9; k++) { const v = 4 + (k % 3) * 2, x = Math.round((h(k, 1, 95) * 360 + t * v * (k % 2 ? 1 : -1) + 720) % 360) - 20, y = 106 + Math.round(h(k, 2, 95) * 14 + Math.sin(t + k) * 1.5), c = hex('#1a5a74');
    if (m[y * 320 + x] !== 3 && m[y * 320 + x] !== 1) continue; R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x + 2, y, c); R.pset(x + (k % 2 ? -1 : 3), y - 1, c); R.pset(x + (k % 2 ? -1 : 3), y + 1, c); }
  // las anguilas jardineras: asoman de su agujero en la arena, se mecen y a ratos se esconden
  for (const [ax, sem] of [[64, 0], [70, 1], [77, 2], [83, 3], [88, 4]]) { const ay = f_yArena(ax) + 2, fuera = f_lim((Math.sin(t * 0.7 + sem * 1.7) + 0.6) * 1.5), l = Math.round(fuera * 9);
    R.pset(ax, ay + 1, P.arenaF0); R.pset(ax - 1, ay + 1, hex('#5a7a6a')); R.pset(ax + 1, ay + 1, hex('#5a7a6a'));
    for (let j = 0; j < l; j++) { const x = Math.round(ax + Math.sin(t * 1.5 + sem + j * 0.35) * (j / 9) * 2.2), y = ay - j; R.pset(x, y, j % 3 === 1 ? hex('#e8e0c0') : hex('#c8c0a0')); if (j === l - 1) { R.pset(x + 1, y, hex('#c8c0a0')); R.pset(x + 1, y, P.casco); } } }
}

// LA BOTELLA DE CERCA: dónde van las cosas de la pared y de la mesa (fuera de los globos, del vuelo del bote y de la lupa)
const G_HBX = { reloj: [80, 40], repisa: [176, 250, 52], carta: [4, 152, 62, 176], cabo: [230, 166], cuadro: [276, 58, 316, 96] };

// la pared de la botella de cerca (fijo): a la izquierda, el reloj de barco de latón con su esfera (las agujas van en
// g_hoyBotellaVida); a la derecha, una repisa de nogal en dos escuadras con tres libros, uno caído, un catalejo de latón
// y una caracola; todo con su sombra en el papel
function g_hoyBotellaPared(R) {
  const P = G_HOY, { rect, pset, disco, linea } = R, sombra = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (g_hoyB4(x, y) < 0.55) g_hoyTinta(R, x, y, P.k, 0.32); };
  // el reloj: la sombra, el bisel con sus tornillos y su brillo, la esfera de porcelana con sus marcas
  { const [cx, cy] = G_HBX.reloj;
    for (let y = cy - 12; y <= cy + 18; y++) for (let x = cx - 12; x <= cx + 18; x++) if ((x - cx - 3) ** 2 + (y - cy - 3) ** 2 < 196 && g_hoyB4(x, y) < 0.55) g_hoyTinta(R, x, y, P.k, 0.32);
    rect(cx - 1, cy - 19, cx + 1, cy - 14, P.k); pset(cx, cy - 18, P.latonL); pset(cx, cy - 20, P.metalS);
    disco(cx, cy, 14, P.k); disco(cx, cy, 13, P.latonS); disco(cx - 1, cy - 1, 12, P.laton);
    for (let a = 0; a < 6.283; a += 0.03) { const x = Math.round(cx + Math.cos(a) * 12), y = Math.round(cy + Math.sin(a) * 12); if (Math.cos(a - 3.9) > 0.55) pset(x, y, P.latonL); if (Math.cos(a - 0.8) > 0.6) pset(x, y, P.latonS); }
    for (const a of [0.785, 2.356, 3.927, 5.498]) { const x = Math.round(cx + Math.cos(a) * 11.5), y = Math.round(cy + Math.sin(a) * 11.5); pset(x, y, P.latonS); pset(x - 1, y - 1, P.latonL); }
    disco(cx, cy, 10, P.k); disco(cx, cy, 9, P.porc); for (let y = cy - 9; y <= cy + 9; y++) for (let x = cx - 9; x <= cx + 9; x++) if ((x - cx) ** 2 + (y - cy) ** 2 < 81 && (x - cx) + (y - cy) > 7 && g_hoyB4(x, y) < 0.6) pset(x, y, P.porcS);
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, x = Math.round(cx + Math.cos(a) * 7.5), y = Math.round(cy + Math.sin(a) * 7.5); pset(x, y, P.k); if (k % 3 === 0) pset(Math.round(cx + Math.cos(a) * 6.5), Math.round(cy + Math.sin(a) * 6.5), P.k); }
    pset(cx - 5, cy - 6, P.blanco); pset(cx - 6, cy - 5, P.blanco); }
  // la repisa con sus escuadras y lo de encima
  { const [x0, x1, y] = G_HBX.repisa;
    sombra(x0 + 2, y + 3, x1 + 3, y + 6);
    for (const xe of [x0 + 8, x1 - 10]) { sombra(xe + 2, y + 3, xe + 6, y + 14); for (let j = 0; j <= 10; j++) { const w = 10 - j; rect(xe, y + 3 + j, xe + Math.max(1, Math.round(w * 0.4)), y + 3 + j, j === 10 ? P.nogalD : P.nogalS); pset(xe, y + 3 + j, P.nogalD); } }
    rect(x0, y, x1, y + 3, P.k); rect(x0 + 1, y, x1 - 1, y + 2, P.nogal); rect(x0 + 1, y, x1 - 1, y, P.nogalL); for (let x = x0 + 3; x < x1 - 2; x += 7) if (h(x, 2, 474) < 0.5) rect(x, y + 1, x + 3, y + 1, P.nogalS);
    // tres libros de pie, sin letras: lomo con sus nervios dorados
    let x = x0 + 4; for (const [w, hh, c] of [[4, 15, P.l1], [5, 17, P.l2], [3, 13, P.l4], [4, 16, P.l5]]) { rect(x, y - hh, x + w, y - 1, P.k); rect(x + 1, y - hh + 1, x + w - 1, y - 1, c); rect(x + 1, y - hh + 1, x + 1, y - 1, g_hoyMez(c, P.blanco, 0.25)); for (const dy of [3, hh - 4]) rect(x + 1, y - hh + dy, x + w - 1, y - hh + dy, P.laton); x += w + 1; }
    // uno caído apoyado en el último
    linea(x, y - 1, x + 8, y - 13, P.k); linea(x + 1, y - 1, x + 9, y - 13, P.l8); linea(x + 2, y - 1, x + 10, y - 13, P.l8); linea(x + 3, y - 1, x + 11, y - 13, P.k); pset(x + 5, y - 6, P.laton); pset(x + 6, y - 6, P.laton);
    // el catalejo de latón tumbado en su soporte, con sus tres tramos y el cristal
    const cx0 = x0 + 32; rect(cx0 + 4, y - 2, cx0 + 6, y - 1, P.nogalD); rect(cx0 + 22, y - 2, cx0 + 24, y - 1, P.nogalD);
    for (const [a, b, r] of [[cx0, cx0 + 10, 3], [cx0 + 10, cx0 + 20, 2.5], [cx0 + 20, cx0 + 30, 2]]) { const yc = y - 6; for (let xx = a; xx <= b; xx++) for (let yy = Math.round(yc - r); yy <= Math.round(yc + r); yy++) pset(xx, yy, yy === Math.round(yc - r) || yy === Math.round(yc + r) ? P.k : yy < yc - 0.5 ? P.latonL : yy > yc + 0.8 ? P.latonS : P.laton); rect(b, Math.round(yc - r), b, Math.round(yc + r), P.latonS); }
    rect(cx0 - 1, y - 9, cx0, y - 3, P.k); pset(cx0, y - 8, P.vidL); pset(cx0, y - 7, P.vidS);
    // la caracola, de tres tonos, con su espiral
    const sx = x1 - 12, sy = y - 6; disco(sx, sy, 6, P.k); disco(sx, sy, 5, P.barroL); disco(sx + 2, sy + 1, 3, P.barro); disco(sx - 2, sy - 2, 2, P.porc);
    for (let a = 0; a < 9; a += 0.4) pset(Math.round(sx + Math.cos(a) * a * 0.55), Math.round(sy + Math.sin(a) * a * 0.5), P.barroS); rect(sx - 7, y - 1, sx + 7, y - 1, P.k); }
  // a la derecha, bajo la esquina de Atom, una marina enmarcada: el faro en su roca, el mar con su espuma y un bergantín
  { const [a, b, c, d] = G_HBX.cuadro; sombra(a + 3, b + 3, c + 3, d + 3); linea(a + 10, b, (a + c) >> 1, b - 6, P.latonS); linea(c - 10, b, (a + c) >> 1, b - 6, P.latonS); pset((a + c) >> 1, b - 7, P.laton);
    rect(a, b, c, d, P.k); rect(a + 1, b + 1, c - 1, d - 1, P.nogal); rect(a + 1, b + 1, c - 1, b + 1, P.nogalL); rect(a + 1, b + 1, a + 1, d - 1, P.nogalL); rect(a + 1, d - 1, c - 1, d - 1, P.nogalD); rect(c - 1, b + 1, c - 1, d - 1, P.nogalD);
    rect(a + 3, b + 3, c - 3, d - 3, P.laton); rect(a + 3, b + 3, c - 3, b + 3, P.latonL); rect(a + 4, b + 4, c - 4, d - 4, P.k);
    const ih = d - 5, hz = b + 22; for (let y = b + 5; y <= ih; y++) for (let x = a + 5; x <= c - 5; x++) pset(x, y, y < hz ? [P.cie1, P.cie2, P.cie3, P.cie4][Math.max(0, Math.min(3, Math.floor((y - b - 5) / 5 + g_hoyB4(x, y) - 0.3)))] : (x * 3 + y * 5) % 9 === 0 ? P.aguaL : y < hz + 3 ? P.aguaS : P.agua);
    g_hoyNube(R, a + 14, b + 10, 10, [P.nube, P.nubeS, P.nubeD]);
    for (let x = c - 16; x <= c - 5; x++) for (let y = hz + 2 + Math.round(Math.abs(x - (c - 10)) * 0.6); y <= ih; y++) pset(x, y, (x + y) % 4 ? P.metalS : P.metal);
    rect(c - 12, hz - 10, c - 9, hz + 2, P.franja); rect(c - 12, hz - 6, c - 9, hz - 4, P.obra); rect(c - 13, hz - 12, c - 8, hz - 11, P.k); pset(c - 11, hz - 13, P.luz); pset(c - 10, hz - 13, P.luz);
    for (let x = c - 18; x <= c - 5; x++) if (x % 3) pset(x, hz + 2 + Math.round(Math.abs(x - (c - 10)) * 0.6) - 1, P.aguaB);
    { const sx = a + 14, sy = hz + 4; rect(sx - 5, sy, sx + 5, sy + 1, P.casco); for (const mx of [sx - 2, sx + 2]) { linea(mx, sy - 1, mx, sy - 9, P.k); for (let j = 0; j < 3; j++) rect(mx - 2 + (j > 1 ? 1 : 0), sy - 8 + j * 2, mx + 2 - (j > 1 ? 1 : 0), sy - 7 + j * 2, P.lona); } } }
}

// la mesa de la botella de cerca (fijo): abajo a la izquierda, una carta náutica vieja doblada con su rumbo de puntos, su
// rosa de los vientos y un compás de puntas de latón encima; abajo a la derecha, un rollo de cabo con su chicote
function g_hoyBotellaMesa(R) {
  const P = G_HOY, { rect, pset, disco, linea } = R, [a, b, c, d] = G_HBX.carta;
  for (let y = b + 2; y <= Math.min(179, d + 2); y++) for (let x = a + 3; x <= c + 3; x++) if (g_hoyB4(x, y) < 0.6) g_hoyTinta(R, x, y, P.k, 0.35);
  for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) { const v = h(x >> 1, y >> 1, 475), xs = x - Math.round((y - b) * 0.12); pset(x, y, x === a || x === c || y === b || y === d ? P.lonaS : xs === a + 28 ? P.lonaS : v < 0.12 ? P.lonaS : v > 0.9 ? P.porc : P.lona); }
  for (let y = b + 1; y < d; y++) { const xe = c - 1 - Math.round(8 + Math.sin(y * 0.45) * 3 + Math.sin(y * 0.17) * 2); for (let x = xe; x < c; x++) pset(x, y, x === xe ? P.cortinaS : (x + y) % 3 ? g_hoyMez(P.lona, P.barroL, 0.35) : P.lonaS); }
  for (let x = a + 4; x < c - 2; x += 2) if (h(x, 3, 476) < 0.8) pset(x, b + 18 + Math.round(Math.sin(x * 0.2) * 2), P.aguaS);
  for (let y = b + 3; y < d - 2; y++) if (y % 3) pset(a + 6 + Math.round(Math.sin(y * 0.5) * 1.5), y, g_hoyMez(P.lonaS, P.aguaS, 0.4));
  { const rx = a + 44, ry = b + 9; for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, r = k % 2 ? 3 : 6; linea(rx, ry, Math.round(rx + Math.cos(an) * r), Math.round(ry + Math.sin(an) * r), k % 2 ? P.lonaS : P.obra); } pset(rx, ry, P.k); }
  for (let k = 0; k < 9; k++) pset(a + 12 + k * 4, b + 12 - Math.round(k * 0.6), P.rojoXS);
  // el compás de puntas: dos patas de latón con su charnela
  { const hx = a + 22, hy = b + 3; for (const [ex, ey] of [[a + 14, d - 3], [a + 40, d - 4]]) { linea(hx + 1, hy + 1, ex + 1, ey + 1, P.k); linea(hx, hy, ex, ey, P.laton); pset(ex, ey, P.metalS); }
    linea(hx - 1, hy, a + 13, d - 4, P.latonL); disco(hx, hy, 2, P.k); disco(hx, hy, 1, P.latonL); }
  // el rollo de cabo visto desde arriba: vueltas de cordón trenzado con su surco oscuro, el ojo del centro y el chicote
  { const [x, y] = G_HBX.cabo, rx = 17, ry = 6;
    for (let yy = y - ry; yy <= y + ry + 3; yy++) for (let xx = x - rx; xx <= x + rx + 4; xx++) if (((xx - x - 3) / rx) ** 2 + ((yy - y - 2) / ry) ** 2 < 1 && g_hoyB4(xx, yy) < 0.6) g_hoyTinta(R, xx, yy, P.k, 0.4);
    for (let yy = y - ry; yy <= y + ry; yy++) for (let xx = x - rx; xx <= x + rx; xx++) { const dx = (xx - x) / rx, dy = (yy - y) / ry, r = Math.hypot(dx, dy); if (r >= 1) continue;
      if (r < 0.2) { pset(xx, yy, P.nogalD); continue; } const q = (r - 0.2) / 0.8 * 4, f = q - Math.floor(q), an = Math.atan2(dy, dx), tr = Math.floor(an * 5 + Math.floor(q) * 2 + 20) % 3;
      pset(xx, yy, r > 0.94 ? P.k : f < 0.22 ? P.nogalS : dy < -0.3 && f > 0.5 ? P.cestaL : tr === 0 ? P.cestaS : tr === 1 ? P.cesta : P.cestaL); }
    for (let i = 0; i < 18; i++) { const xx = x - rx - 1 - i, yy = y + 2 + Math.round(Math.sin(i * 0.4) * 1.5); pset(xx, yy - 1, P.k); pset(xx, yy, i % 3 ? P.cesta : P.cestaL); pset(xx, yy + 1, P.cestaS); pset(xx, yy + 2, P.k); }
    pset(x - rx - 19, y + 2, P.cestaL); pset(x - rx - 20, y + 3, P.cestaL); }
}

// la botella de cerca en cada fotograma, por detrás de todo: la vista de la ventana (cielo tramado, nubes de tres tonos
// a tres velocidades, la costa con su faro que parpadea, el mar con brillos, un velero que cruza y gaviotas), sus
// junquillos, la cortina que ondea, las agujas del reloj de barco (el segundero salta cada segundo) y las motas de polvo
// en el rayo de sol de la mesa
function g_hoyBotellaVida(R, t) {
  const P = G_HOY, { rect, pset, linea } = R;
  R.recorte([0, 24, 24, 104]);
  for (let y = 24; y <= 104; y++) for (let x = 0; x <= 24; x++) pset(x, y, y >= 84 ? (h(x >> 1, y, 477) < 0.1 + 0.25 * Math.max(0, Math.sin(t * 2 + x * 0.7 + y)) ? P.aguaB : y < 88 ? P.aguaL : (x + y) % 5 === 0 ? P.aguaS : P.agua) : [P.cie1, P.cie2, P.cie3, P.cie4][Math.max(0, Math.min(3, Math.floor((y - 24) / 15 + g_hoyB4(x, y) - 0.3)))]);
  g_hoyNube(R, -24 + (t * 1.2) % 70, 32, 22, [P.nube, P.nubeS, P.nubeD]); g_hoyNube(R, -16 + (t * 2.6 + 30) % 60, 50, 14, [P.nube, P.nubeS, P.nubeD]); g_hoyNube(R, -10 + (t * 4.5 + 12) % 50, 66, 9, [P.nubeS, P.nubeD, P.ciu2]);
  // la costa de enfrente con su faro, que da un destello cada pocos segundos
  for (let x = 0; x <= 24; x++) { const top = 79 - Math.round(2 + Math.sin(x * 0.35) * 2 + (x > 14 ? 2 : 0)); for (let y = top; y < 84; y++) pset(x, y, y === top ? P.ciu1 : P.ciu0); }
  rect(19, 70, 20, 77, P.franja); pset(19, 72, P.obra); pset(20, 72, P.obra); pset(19, 69, P.k); pset(20, 69, P.k); if ((t % 3) < 0.4) { pset(18, 70, P.luz); pset(21, 70, P.luz); pset(17, 70, P.luzS); pset(22, 70, P.luzS); pset(19, 68, P.luz); }
  // el velero que cruza despacio, con su estela
  { const vx = Math.round(-10 + (t * 2.2) % 46), vy = 92 + Math.round(Math.sin(t * 1.5)); rect(vx - 3, vy, vx + 3, vy + 1, P.casco); linea(vx - 2, vy - 1, vx + 2, vy - 1, P.casco); for (let j = 0; j < 7; j++) { pset(vx, vy - 2 - j, P.k); for (let i = 1; i <= Math.round((7 - j) * 0.6); i++) pset(vx + i, vy - 2 - j, P.nube); } pset(vx - 4, vy + 1, P.aguaB); pset(vx - 6, vy + 2, P.aguaB); }
  for (let k = 0; k < 2; k++) g_hoyPajaro(R, -6 + (t * (6 + k * 3) + k * 17) % 40, 44 + k * 14 + Math.sin(t * 0.8 + k) * 3, t, k + 1, P.ciu0);
  R.recorte(null);
  // los junquillos de la ventana (una cruz) con su luz
  rect(0, 61, 24, 63, P.mold); rect(0, 61, 24, 61, P.blanco); rect(0, 63, 24, 63, P.moldS); rect(11, 24, 13, 104, P.mold); rect(11, 24, 11, 104, P.blanco); rect(13, 24, 13, 104, P.moldS);
  // la cortina que ondea un poco con el aire de la ventana (los pliegues corren)
  for (let y = 18; y <= 104; y++) for (let i = 0; i <= 11; i++) { const f = Math.sin(i * 1.1 + y * 0.03 + Math.sin(t * 0.9) * 0.8 * (y - 18) / 86); pset(28 + i, y, f > 0.5 ? P.cortinaL : f < -0.4 ? P.cortinaS : P.cortina); }
  // las agujas del reloj de barco: la hora, el minutero y el segundero rojo que salta
  { const [cx, cy] = G_HBX.reloj, aguja = (an, r, c) => linea(cx, cy, Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), c), s = Math.floor(t);
    aguja(-Math.PI / 2 + 4.4 + t * 0.0015, 4, P.k); aguja(-Math.PI / 2 + 2.1 + t * 0.018, 7, P.k); aguja(-Math.PI / 2 + s * Math.PI / 30, 7, P.obra); pset(cx, cy, P.latonS); }
  // las motas de polvo que flotan en el rayo de sol de la mesa
  for (let k = 0; k < 9; k++) { const u = (t * (0.04 + h(k, 1, 478) * 0.05) + h(k, 2, 478)) % 1, y = Math.round(170 - u * 56), x = Math.round(14 + (y - 112) * 1.3 + h(k, 3, 478) * 60 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 2 + k * 1.7) > -0.3) pset(x, y, P.luz); }
}

// LA REVISTA: dónde van las cosas de los márgenes del cuero (fuera de la hoja, de la revista y del paso de los brazos)
const G_HRX = { cartas: [39, 74, 63, 100], pipa: [51, 134], sello: [294, 80], lapiz: [72, 167] };

// una casilla del casillero del escritorio (x: su borde izquierdo; i: cuál es), cada una con lo suyo: sobres
// apilados, rollos de papel, un fajo atado con cinta roja, libretas tumbadas, un tintero de repuesto con lacres, cartas
// de pie, un reloj de sobremesa de latón y otro montón de sobres con su sello de lacre
function g_hoyCasilla(R, x, i) {
  const P = G_DOY, { rect, pset, disco, linea } = R, y0 = 22, y1 = 41;
  rect(x, 21, x + 21, 41, P.madD); rect(x + 1, 22, x + 20, 41, P.madS); for (let y = 23; y < 41; y += 3) if (h(x, y, 507) < 0.4) rect(x + 2, y, x + 6 + Math.round(h(y, x, 508) * 10), y, g_hoyMez(P.madS, P.madD, 0.5));
  rect(x + 1, 22, x + 20, 23, P.madD);
  const sobre = (xa, ya, xb, yb, c) => { rect(xa, ya, xb, yb, P.k); rect(xa + 1, ya + 1, xb - 1, yb, c); linea(xa + 1, ya + 1, (xa + xb) >> 1, ya + 4, P.hojaPS); linea(xb - 1, ya + 1, (xa + xb) >> 1, ya + 4, P.hojaPS); };
  const t = i % 8;
  if (t === 0 || t === 7) { for (let k = 0; k < 3; k++) { const y = y1 - 1 - k * 4; sobre(x + 2 + k, y - 7, x + 18 - k, y, k % 2 ? P.hojaPS : P.hojaP); } if (t === 7) { disco(x + 10, y1 - 12, 2, P.k); disco(x + 10, y1 - 12, 1, P.cortL); } }
  else if (t === 1) { for (const [cx, cy] of [[x + 6, y1 - 4], [x + 13, y1 - 4], [x + 9, y1 - 10], [x + 16, y1 - 10]]) { disco(cx, cy, 3, P.k); disco(cx, cy, 2, P.hojaP); pset(cx, cy, P.hojaPS); pset(cx + 1, cy - 1, P.hojaPL); } }
  else if (t === 2) { rect(x + 3, y1 - 13, x + 18, y1 - 1, P.k); for (let k = 0; k < 4; k++) rect(x + 4, y1 - 12 + k * 3, x + 17, y1 - 10 + k * 3, k % 2 ? P.hojaPS : P.hojaP); rect(x + 9, y1 - 13, x + 10, y1 - 1, P.cort); rect(x + 4, y1 - 7, x + 17, y1 - 6, P.cort); disco(x + 10, y1 - 7, 1, P.cortL); linea(x + 10, y1 - 6, x + 13, y1 - 1, P.cort); }
  else if (t === 3) { for (let k = 0; k < 4; k++) { const y = y1 - 1 - k * 3, c = [P.l1, P.l2, P.l4, P.l7][k]; rect(x + 2 + (k & 1), y - 2, x + 18 - (k & 1) * 2, y, P.k); rect(x + 3 + (k & 1), y - 2, x + 17 - (k & 1) * 2, y - 1, c); rect(x + 3 + (k & 1), y - 2, x + 17 - (k & 1) * 2, y - 2, g_hoyMez(c, P.hojaPL, 0.3)); pset(x + 15 - (k & 1) * 2, y - 1, P.oro); } }
  else if (t === 4) { rect(x + 3, y1 - 8, x + 10, y1 - 1, P.k); rect(x + 4, y1 - 7, x + 9, y1 - 1, P.vidrio); rect(x + 4, y1 - 4, x + 9, y1 - 1, P.tinta); rect(x + 5, y1 - 10, x + 8, y1 - 8, P.k); for (let k = 0; k < 3; k++) { rect(x + 12 + k * 2, y1 - 9 + k, x + 13 + k * 2, y1 - 1, P.k); pset(x + 12 + k * 2, y1 - 8 + k, P.cortL); for (let y = y1 - 7 + k; y < y1; y++) pset(x + 12 + k * 2, y, P.cort); } }
  else if (t === 5) { for (let k = 0; k < 5; k++) { const xx = x + 3 + k * 3 + (k > 2 ? 1 : 0), hh = 12 + Math.round(h(k, x, 509) * 4); rect(xx, y1 - hh, xx + 2, y1 - 1, P.k); rect(xx + 1, y1 - hh + 1, xx + 1, y1 - 1, k % 2 ? P.hojaPS : P.hojaP); } }
  else { rect(x + 5, y1 - 14, x + 16, y1 - 1, P.k); rect(x + 6, y1 - 13, x + 15, y1 - 2, P.laton); rect(x + 6, y1 - 13, x + 15, y1 - 13, P.latonL); rect(x + 7, y1 - 2, x + 14, y1 - 1, P.latonS); disco(x + 10, y1 - 8, 4, P.k); disco(x + 10, y1 - 8, 3, P.porc); linea(x + 10, y1 - 8, x + 10, y1 - 10, P.k); linea(x + 10, y1 - 8, x + 12, y1 - 8, P.k); rect(x + 8, y1 - 16, x + 13, y1 - 15, P.latonS); }
  // el filo de luz del travesaño de encima
  rect(x, 21, x + 21, 21, P.madB);
}

// lo de los márgenes del cuero (fijo, antes de la luz de la lámpara): a la izquierda, un fajo de cartas atado con
// bramante y, abajo, la pipa en su cenicero de latón (el humo va aparte); a la derecha, el sello de lacre de pie con su
// barra de lacre; abajo, un lápiz y un portaplumas de repuesto. Todo con su sombra
function g_hoyRevistaCosas(R) {
  const P = G_DOY, { rect, pset, disco, linea } = R, sombra = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (g_hoyB4(x, y) < 0.6) g_hoyTinta(R, x, y, P.k, 0.4); };
  { const [a, b, c, d] = G_HRX.cartas; sombra(a + 2, b + 2, c + 2, d + 2);
    for (let k = 0; k < 4; k++) { const dx = (k & 1) ? 1 : -1; rect(a + 1 + dx, b + k * 7, c - 1 + dx, b + k * 7 + 7, P.k); rect(a + 2 + dx, b + k * 7 + 1, c - 2 + dx, b + k * 7 + 6, k % 2 ? P.hojaPS : P.hojaP); linea(a + 2 + dx, b + k * 7 + 1, ((a + c) >> 1) + dx, b + k * 7 + 4, P.hojaPS); linea(c - 2 + dx, b + k * 7 + 1, ((a + c) >> 1) + dx, b + k * 7 + 4, P.hojaPS); }
    rect((a + c) >> 1, b, ((a + c) >> 1) + 1, d, P.cueroL); rect(a, (b + d) >> 1, c, ((b + d) >> 1) + 1, P.cueroL); disco((a + c) >> 1, (b + d) >> 1, 2, P.cueroS); pset((a + c) >> 1, ((b + d) >> 1) - 1, P.pielB); disco(c - 5, b + 25, 2, P.cort); pset(c - 6, b + 24, P.cortL); }
  { const [x, y] = G_HRX.pipa; for (let yy = y - 3; yy <= y + 6; yy++) for (let xx = x - 12; xx <= x + 13; xx++) if (((xx - x - 1) / 12) ** 2 + ((yy - y - 2) / 4.5) ** 2 < 1 && g_hoyB4(xx, yy) < 0.6) g_hoyTinta(R, xx, yy, P.k, 0.4);
    for (let yy = y - 5; yy <= y + 4; yy++) for (let xx = x - 11; xx <= x + 11; xx++) { const e = ((xx - x) / 11) ** 2 + ((yy - y) / 4.5) ** 2; if (e < 1) pset(xx, yy, e > 0.8 ? (yy < y ? P.latonL : P.latonS) : e > 0.6 ? P.laton : (xx + yy) % 3 ? P.hierro : P.hierroL); }
    rect(x - 8, y - 12, x - 3, y - 4, P.k); rect(x - 7, y - 11, x - 4, y - 4, P.madB); rect(x - 7, y - 11, x - 7, y - 4, P.pielB); rect(x - 7, y - 11, x - 4, y - 11, P.brasa); pset(x - 5, y - 11, P.brasaL);
    linea(x - 3, y - 6, x + 12, y - 10, P.k); linea(x - 3, y - 5, x + 12, y - 9, P.k); linea(x - 3, y - 6, x + 11, y - 9, P.cuero); pset(x + 12, y - 10, P.hierroL); }
  { const [x, y] = G_HRX.sello; sombra(x - 2, y + 16, x + 6, y + 19); rect(x - 3, y, x + 3, y + 8, P.k); rect(x - 2, y + 1, x + 2, y + 7, P.mad); rect(x - 2, y + 1, x - 1, y + 7, P.madB); disco(x, y - 1, 3, P.k); disco(x, y - 1, 2, P.madL); pset(x - 1, y - 2, P.madB);
    rect(x - 2, y + 9, x + 2, y + 16, P.k); rect(x - 1, y + 9, x + 1, y + 15, P.laton); pset(x - 1, y + 10, P.latonL); rect(x - 4, y + 16, x + 4, y + 18, P.k); rect(x - 3, y + 16, x + 3, y + 17, P.latonS);
    sombra(x - 3, y + 26, x + 5, y + 46); rect(x - 2, y + 24, x + 2, y + 44, P.k); rect(x - 1, y + 25, x + 1, y + 43, P.cort); rect(x - 1, y + 25, x - 1, y + 43, P.cortL); rect(x - 1, y + 25, x + 1, y + 26, P.cortS); }
  { const [x, y] = G_HRX.lapiz; sombra(x + 1, y + 2, x + 46, y + 3); rect(x, y, x + 44, y + 2, P.k); rect(x + 4, y + 1, x + 42, y + 1, P.madB); rect(x + 4, y, x + 42, y, P.k); pset(x + 1, y + 1, P.hierro); pset(x + 2, y + 1, P.pielB); pset(x + 3, y + 1, P.pielB); rect(x + 43, y + 1, x + 44, y + 1, P.cort);
    sombra(x + 54, y + 1, x + 86, y + 3); linea(x + 52, y, x + 84, y - 2, P.k); linea(x + 52, y + 1, x + 84, y - 1, P.k); linea(x + 58, y, x + 84, y - 2, P.l6); linea(x + 52, y + 1, x + 57, y + 1, P.metalL); pset(x + 51, y + 1, P.tinta); }
}
