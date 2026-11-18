// Fontanería y decorados del episodio 39 (Roanoke: la colonia que desapareció y dejó una palabra) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Inglaterra, 1584–1588: el estudio de Raleigh,
// Plymouth y el puerto de la Armada (inglaterra); B el mar y los bancos de arena: la travesía, los Outer Banks y la
// tormenta de 1590 (mar); C la isla de Roanoke: el asentamiento de 1587, el poste de 1590, el huerto y el embarcadero
// (roanoke); D los pueblos algonquinos, como en las acuarelas de John White (pueblo); E Hatteras hoy: la excavación y la
// mesa de hallazgos (hatteras); F el Museo Británico y el Sitio X (museo); G hoy: el estudio de Atom (hoy).
// CUIDADO:
// · NADA DE MUERTES, ESQUELETOS, BATALLAS NI ARMAS EN USO. Los soldados de 1585 llevan casco y nada más en la mano; la
//   bala de 2026 es un objeto en una bandeja, SIN animal. Las teorías violentas (Jamestown) solo como un rumor de tiza
//   que se borra.
// · LOS PUEBLOS ALGONQUINOS DE LA COSTA (Secotan, Roanoke, Croatoan), CON RESPETO Y SEGÚN LAS ACUARELAS DE JOHN WHITE
//   (1585): casas alargadas de techo en arco cubiertas de esteras y cortezas, campos de maíz en tres alturas, girasoles y
//   calabazas, el fuego del centro, canoas de un solo tronco, nasas y cercos de cañas para pescar. Nada de tipis, tótems,
//   tocados de plumas de película ni pinturas de guerra.
// · SIN LETRAS: solo números (R.numero), rayas, iconos y pictogramas. LA ÚNICA EXCEPCIÓN: las tallas «CRO» en el árbol de
//   la duna y «CROATOAN» en el poste de la empalizada, talladas píxel a píxel en la madera (son el corazón del episodio).
//   Mapas sin rótulos; libros y revistas con renglones sin letras.
// · Las personas reales, por sus atributos y solo con hechos; nada de burla. Los gags van con objetos y animales; los
//   objetos NO tienen cara.
// · La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del año (x 20–170, y 0–14; las cifras del año
//   bajan hasta y ≈ 20: nada con detalle en y 0–20 bajo x 20–170).
// Los personajes son los de ELENCO_RK (whiteRK, raleighRK, manteoRK, wancheseRK, croatoanRK, croatoanaRK,
// ninoCroatoanRK, eleanorRK, ananiasRK, colonoRK, colonaRK, ninoColonoRK, soldadoRK, fernandesRK, drakeRK, marineroRK,
// lawsonRK, arqueologaRK, voluntarioRK, conservadoraRK); los escribe pixel-chibi.js (T.ELENCO_RK).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, barandas, troncos) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// Cada encuadre devuelve su geometría: { encuadre, camara, suelo, libre: [x0, x1] (dónde caben los actores de pie), y
// los puntos que nombra su cabecera; ninguno se llama 'camara' ni 'encuadre' }.
// LA BARRA DEL AÑO: tres tramos, 1584–1590 (la colonia), 1591–1999 (los siglos de las preguntas: Lawson, las piedras,
// los anillos) y 2000–2026 (el mapa, las excavaciones y hoy).
//
// CANON COMPARTIDO (lo dibujan varios grupos a la vez: tiene que cuadrar entre decorados)
// · LOS BARCOS DE 1587–1590: barcos ingleses de tres palos (galeón pequeño o filibote): casco de madera parda con la
//   popa alta (castillo de popa con ventanas y un farol), la proa con su castillo, velas cuadradas de lona cruda con la
//   CRUZ ROJA DE SAN JORGE pintada en la mayor, la bandera blanca con la cruz roja en el tope; cañoncitos sin disparar.
//   Los pinnazas (botes grandes de remo) para bajar a tierra.
// · LA ISLA DE ROANOKE: baja, de bosque de pinos y robles con musgo, dunas y juncales en la orilla, el estrecho de aguas
//   tranquilas y poco hondas detrás de los bancos de arena.
// · EL ASENTAMIENTO DE 1587: casitas de madera de una planta con techo de juncos (paja) y chimenea de barro, un huerto
//   cercado, un pozo, una herrería con su yunque. EN 1590 (o.epoca 1590): las casas DESMONTADAS (solo los postes de las
//   esquinas y tablas en montón, la hierba crecida) y UNA EMPALIZADA de troncos altos, aguzados, en forma de cerco, con
//   una entrada flanqueada por dos postes: en el de la DERECHA, tallado «CROATOAN» en vertical o en horizontal, a la
//   altura del pecho, sin cruz. Cofres abiertos y revueltos en la arena (los de White), sin nada horrible.
// · EL ÁRBOL DE LA DUNA: un roble viejo torcido por el viento en lo alto de la duna, con la corteza levantada y «CRO»
//   tallado en letras grandes.
// · LA CRUZ DEL PACTO: una cruz de brazos iguales con los extremos ensanchados (cruz de Malta), tallada, que NO aparece
//   en el poste (solo en la maqueta de Atom del gag 5).
// · LOS PUEBLOS (las acuarelas de White): casas alargadas de esteras sobre arcos de varas, una plaza con el fuego, el
//   maíz alto, canoas de un tronco quemado y raspado, nasas de cañas en el agua.
// · EL MAPA DE WHITE («La Virginea Pars»): la costa con los bancos de arena, el estrecho, ríos, barquitos y una rosa de
//   los vientos, en acuarela, SIN rótulos; dos parches de papel; bajo el del norte, una ESTRELLITA de cuatro puntas roja
//   y azul junto al estrecho de Albemarle.
// · LAS ESCAMAS DE HIERRO (hammerscale): copos diminutos gris azulado brillante que se pegan a un imán de herradura
//   rojo; la criba de malla metálica sobre un caballete.
// · EL ESTUDIO DE ATOM (hilo de gags): una mesa con la MAQUETA DE LA EMPALIZADA (palitos aguzados en círculo sobre arena
//   de corcho, con un postecito), un TACO DE NOTAS amarillas (con dibujos, nunca letras), una lupa, un CORTE DE TRONCO de
//   ciprés con sus anillos, un imán de herradura rojo.
//
//   import * as T from '/atomo/plato/escenas/rk-comun.js';
//   const { E, R, M } = await T.preparar('rk-gancho');
//   T.rodar(E, R, [[0, (t) => T.roanoke(R, t, { encuadre: 'poste', epoca: 1590 })]], { año: 1590 });
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

// el reparto del episodio (ELENCO_RK) lo crea pixel-chibi.js
export const ELENCO_RK = KIT.ELENCO_RK || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la madera de los barcos y la cruz roja de San Jorge, la lona cruda, el mar abierto y el estrecho de aguas verdes,
    // la arena de los bancos y de las dunas, el pino y el roble con su musgo, el junco de los techos, la estera de los
    // pueblos, el maíz, el tronco de las empalizadas, la acuarela del mapa y el papel viejo, el hierro de las escamas y
    // el rojo del imán
    cascoK: '#5a3a24', cascoKS: '#3e2818', cascoKL: '#7a5434', sanJorge: '#c8303a', lonaK: '#e8dcc0', lonaKS: '#c4b496',
    mar: '#2a5a7a', marS: '#1a3e58', marL: '#4a7e9a', estrecho: '#4a7a6a', estrechoS: '#2e5a4c', espuma: '#e8f0f2',
    arena: '#e8d4a4', arenaS: '#c8b080', pino: '#2e5a3a', pinoS: '#1e3e28', roble: '#6a7a3a', musgo: '#8a9a7a',
    junco: '#c8a860', juncoS: '#9a7e40', estera: '#b89a6a', esteraS: '#8a7048', maiz: '#d8b840', maizV: '#5a8a3a',
    tronco: '#7a5a3a', troncoS: '#54402a', troncoL: '#9a7a54', acuarela: '#7ab0c8', papel: '#efe6d0', papelS: '#d0c4a4',
    hierro: '#6a7a8a', hierroL: '#a8b8c8', iman: '#c8303a',
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
  const E = await escena(id, 'ep39');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1584–1590 (la colonia), 1591–1999 (Lawson, las piedras, los anillos), 2000–2026 (el mapa, las
  // excavaciones y hoy)
  Object.assign(R.ICONOS, {
    barco: ['...#...', '..##...', '.###...', '####.#.', '...#...', '#######', '.#####.'],
    pluma: ['......#', '.....##', '....##.', '...##..', '..##...', '.##....', '#......'],
    pala: ['..###..', '..###..', '...#...', '...#...', '...#...', '..###..', '..###..'],
  });
  R.tramosTiempo([[1584, 1590, R.PALA.AZUL ?? R.PALA.ROJO, 'barco'], [1591, 1999, R.PALA.ORO, 'pluma'], [2000, 2026, R.PALA.ROJO, 'pala']]);
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


// ── A · Inglaterra, 1584–1588: el estudio de Raleigh, Plymouth y el puerto de la Armada ─────────────────────────────
// o.encuadre (y o.camara). Lo de delante de los personajes va en inglaterraDelante (se llama después de los actores, con
// las mismas opciones). Cada vista devuelve { encuadre, camara, suelo, libre, … } con los puntos que se dicen aquí.
//   'raleigh': EL ESTUDIO DE WALTER RALEIGH en Londres, 1584. Techo de vigas y friso de yeso con labor de cintas (liso en
//     la esquina de Atom), cornisa de dentículos, paneles de roble con cuarterones y una fila baja de «servilletas
//     plegadas»; a la izquierda el ventanal de piedra (x 9–91, y 24–133) con parteluces y vidrios emplomados en rombo, y
//     por él (recortado) el Támesis: nubes, la otra orilla con casas y una torre, un barco (canon) y una barca de remos
//     que pasan, una gaviota; su luz cae tramada en el suelo con motas de polvo. En el centro el tapiz de verdura (x
//     101–219, y 50–118: árboles, flores y un ciervo, cenefa y flecos); dos apliques con velas que tiemblan; a la
//     derecha el cuadro de un barco, el aparador con escurreplatos (platos de peltre, jarro de plata, copa y un reloj de
//     arena que corre). Suelo de tablas de roble y estera de juncos. El lebrel tumbado en (50, 156) respira, mueve la
//     cola y la oreja; el papagayo en su percha (102, 116) cabecea y abre un ala; el GLOBO DE PIE en (240, 118), radio 12,
//     con su meridiano y su horizonte, gira (o.globo 0–1: de Europa a América; sin o.globo, va y vuelve despacio).
//     Devuelve suelo 160, libre [30, 250], mesa [100, 150, 224, 158] (el tablero), detrasMesa [108, 216] y sueloDetras
//     154 (quien está ahí con los pies en 154 queda detrás de la mesa y asoman cabeza, hombros y la mano que sostiene o
//     señala a y ≤ 149, el canto de atrás del mapa), globo [240, 118], america [x, y] (las islas en el globo pequeño),
//     ventana, perro, tapiz. inglaterraDelante pinta LA MESA: tablero con el mapa del Atlántico
//     (rosa y rumbos, sin rótulos), astrolabio, compás, tintero con la pluma que se mece y candelabro de tres velas;
//     faldón de gallones y patas de bulbo hasta y 178.
//     Cámara 'globo': EL GLOBO Y LA CARTA de cerca. El globo (centro 160, 80; radio 50) con costas de verdad en acuarela
//     y tinta, meridianos y paralelos cada 30°, luz y brillo; el meridiano de latón con su destello y el horizonte de
//     madera por delante; detrás, desenfocados, la viga del techo, el ventanal emplomado (cielo y jardín, una nube que
//     pasa por los vidrios, motas de polvo en su rayo de luz), el aplique con su vela, la librería con lomos, rollos y una
//     esfera armilar (x 236–319, y 46–126); abajo el reloj de arena que corre, monedas y lacre (x 4–34) y la carta portulana (costas, rosa,
//     rumbos), dos barquitos de juguete que se mecen, el compás, el tintero con la pluma y una vela que tiembla. Las
//     islas largas llevan un círculo rojo que late. o.globo 0–1 (giro; 0,8–1 deja América de frente); o.ruta 0–1: una
//     línea de puntos roja de Plymouth por Canarias y las Antillas hasta las islas, con un barquito en la cabeza (sin
//     o.globo, el globo se queda fijo con Inglaterra y Carolina a la vista). Devuelve suelo 180, libre [0, 0] (inserto:
//     sin actores), globo [160, 80, 50], america [x, y] (las islas; si quedan detrás, en el borde del disco).
//   'plymouth': EL PUERTO DE PLYMOUTH, MAYO DE 1587. Cielo tramado con sol (236, 30), cirros, cúmulos de tres tonos a tres
//     velocidades y gaviotas; la ciudad de entramado en la ladera (x 0–160) con humo en las chimeneas y la iglesia de
//     torre cuadrada (x 88–118, torre hasta y 37); colinas con setos y una isla con su fuerte; el agua con brillos que
//     corren (horizonte y 96) y TRES BARCOS (canon) fondeados; gente pequeña en el malecón. El muelle de sillares x 0–232,
//     y 140–180 (cara al agua en x 232, con la marea que sube y baja), con charcos, paja, una red, un rollo de cabo y
//     una nasa; detrás de los actores (y 140–151) el carro de bueyes (x 16–68), barriles, sacos, la cabra atada (132)
//     que rumia, baúles (x 162–190), la jaula de gallinas (x 196–216) y una gaviota en el noray que a ratos vuela; un mozo
//     cruza el fondo con un saco. La pinaza (x ≈ 244–296) cabecea junto al muelle con un marinero y la pasarela desde
//     (226, 158); quien sube a bordo pisa en cubierta (el costado lo tapa de cintura abajo, en inglaterraDelante). La
//     pinaza cabecea: lean pinaza, pasarela y cubierta del valor devuelto en cada fotograma. o.zarpa 0–1: hasta 0,4 se izan las velas; luego los barcos salen hacia la derecha y se alejan.
//     Devuelve suelo 160, libre [20, 230], pinaza [270, y], pasarela [x0, y0, x1, y1], cubierta [x0, x1, y] (pies a
//     bordo), borde 232, horizonte 96. inglaterraDelante: el costado de la pinaza y dos fardos y un rollo de cabo en la
//     esquina de abajo a la izquierda (x 0–32).
//     Cámara 'muelle': EL BORDE DEL MUELLE de cerca. Detrás, la bahía con un barco grande (canon) fondeado en (118, 120)
//     con un marinero que trepa por la jarcia (o.velas 0–1: sus velas y la de la pinaza, que se larga de la verga con la
//     cruz de San Jorge pasada la mitad), la ciudad lejos con su torre y humo, los campos con setos y un molino que gira,
//     velas lejanas, una barca de remos que cruza la bahía y dos patos (recortados al agua), y el cielo; el muelle x 0–200,
//     y 147–180 (pies en 166; cara al agua x 200–207 con verdín), la pila de baúles (x 132–190) y barriles detrás de los
//     actores; el noray (190, 160) con el cabo a la pinaza; la pinaza grande que cabecea (x ≈ 222–318) con su marinero y
//     la pasarela de tablones. Devuelve suelo 166, libre [10, 300], pasarela [196, 166, x1, y1] (de la orilla a la
//     regala), pinaza [268, y], cubierta [x0, x1, y] (dónde pisar dentro de la pinaza; cabecea: léanse en cada fotograma).
//     OJO: el muelle acaba en x 196; de ahí a 300 solo se anda por la pasarela o dentro de la pinaza. inglaterraDelante:
//     el costado de la pinaza, la jaula de gallinas (x 4–36) y dos baúles (x 38–64) abajo a la izquierda, y una pluma
//     que baila en el aire.
//   'armada': UN PUERTO INGLÉS EN 1588, desde el paseo de ronda: colinas con setos y TRES ALMENARAS encendidas con humo
//     (40, 61), (128, 66), (196, 58); el castillo artillero (x 236–276, y 56–100) con la bandera de San Jorge y dos
//     soldados pequeños de guardia (morrión, manos vacías); el agua y 98–124 con TRES BARCOS GRANDES DESARBOLADOS
//     amarrados (sin masteleros ni velas, las vergas en cubierta) con marineros que esperan; el parapeto de sillares
//     (y 121–145) con dos troneras (x 48–70, 196–218) y un cañón de bronce en cada una (callados), balas apiladas y un
//     barril; el paseo de ronda de losas gastadas (y 146–180; los pies en 160) con musgo en las juntas, dos charcos con el
//     cielo, un cubo con el atacador y la lanada (x 262–281) y un rollo de mecha (96, 156); el árbol de la izquierda (x 0–34) marca la
//     estación. o.estacion 0–1: verano (0) → otoño (1/3: copa naranja, hojas que caen, gansos en uve) → invierno (2/3:
//     cielo gris, nieve en las colinas, el parapeto y el suelo, copos, el árbol pelado) → primavera (1: flores rosas y
//     pétalos). Devuelve suelo 160, libre [30, 250], troneras, canones, almenaras, parapeto, horizonte 96, nieve 0–1.
//     inglaterraDelante: la rueda y el extremo de una cureña en la esquina de abajo a la derecha (x 284–319).
//     Cámara 'horizonte': EL CANAL DE LA MANCHA desde lo alto de un acantilado blanco. Cima de hierba x 0–214, y 154–180
//     (pies en 170) con tres ovejas que pacen, tojos en flor y florecillas; la ALMENARA encendida en (192, 118) con el
//     humo que se tumba; la cara de creta cae a la derecha (x 200–262); a lo lejos otros acantilados blancos con humo de
//     almenaras; un sendero de tierra que sube hacia la almenara y su pila de leña (x 166–182); el mar con el camino de
//     brillos del sol, la sombra de dos nubes, la espuma al pie del acantilado y en sus rocas y un cernícalo que se cierne
//     (238, 136). En el horizonte (y 96) LA ARMADA EN MEDIA LUNA: quince barcos de velas blancas con el
//     aspa roja de Borgoña (sin letras), el centro lejos y los cuernos más cerca; más cerca, dos barcos ingleses (canon)
//     que la siguen. o.avance 0–1: la media luna cruza de derecha (x 300) a izquierda (x 70); o.derrota 0–1: la media
//     luna se deshace, los barcos escoran y se dispersan y rachas de viento barren el agua (sin fuego ni naufragios).
//     Devuelve suelo 170, libre [20, 140], armada [x, y] (centro de la media luna), almenara [192, 118], horizonte 96,
//     borde 214. inglaterraDelante: matas de hierba que se mecen en el borde de abajo (y 170–180, x 0–214).
// la tabla de vistas (la usan comprobar-decorados y el reparto de encuadres): cada encuadre, su segunda cámara y la
// geometría que devuelve (col: los dos colores del antiguo relleno provisional, ya sin uso)
const V_INGLATERRA = {
  raleigh: { cam: 'globo', general: { col: ['#6a4a2a', '#3a2a1c'], geo: { suelo: 160, libre: [30, 250], mesa: [100, 150, 224, 158], globo: [240, 118] } }, globo: { col: ['#6a4a2a', '#3a2a1c'], geo: { suelo: 180, libre: [0, 0], globo: [160, 80, 50], america: [133, 66] } } },
  plymouth: { cam: 'muelle', general: { col: ['#a8c4dc', '#7a6a52'], geo: { suelo: 160, libre: [20, 230], pinaza: [270, 158] } }, muelle: { col: ['#a8c4dc', '#7a6a52'], geo: { suelo: 166, libre: [10, 300], pasarela: [196, 166, 236, 152] } } },
  armada: { cam: 'horizonte', general: { col: ['#a8c4dc', '#6a6458'], geo: { suelo: 160, libre: [30, 250] } }, horizonte: { col: ['#b8d0e8', '#e8e4d8'], geo: { suelo: 170, libre: [20, 140] } } },
};
export function inglaterra(R, t, o = {}) {
  const enc = ['raleigh', 'plymouth', 'armada'].includes(o.encuadre) ? o.encuadre : 'raleigh';
  const cam = { raleigh: 'globo', plymouth: 'muelle', armada: 'horizonte' }[enc] === o.camara ? o.camara : 'general';
  const f = { raleigh: { general: a_raleigh, globo: a_globoCerca }, plymouth: { general: a_plymouth, muelle: a_muelle }, armada: { general: a_armadaPuerto, horizonte: a_horizonte } }[enc][cam];
  return { encuadre: enc, camara: cam, ...f(R, t, o) };
}
// lo de delante de los personajes en cada encuadre de inglaterra(); se llama después de los actores, con las mismas
// opciones: raleigh/general, la mesa con el mapa; plymouth/general, los fardos de la esquina; plymouth/muelle, la jaula de
// gallinas y los baúles del primer término; en las dos de Plymouth, también el costado de la pinaza (tapa a quien va a
// bordo); armada/general, la rueda de una cureña a la derecha; armada/horizonte, las matas de hierba del borde de abajo.
// Devuelve {} (o { mesa } en raleigh): la geometría la da inglaterra()
export function inglaterraDelante(R, t, o = {}) {
  const enc = ['raleigh', 'plymouth', 'armada'].includes(o.encuadre) ? o.encuadre : 'raleigh';
  const cam = { raleigh: 'globo', plymouth: 'muelle', armada: 'horizonte' }[enc] === o.camara ? o.camara : 'general';
  const f = { raleigh: { general: a_raleighMesa, globo: () => ({}) }, plymouth: { general: a_plymouthDelante, muelle: a_muelleDelante }, armada: { general: a_armadaDelante, horizonte: a_horizonteDelante } }[enc][cam];
  return f(R, t, o) || {};
}
// ── B · El mar y los bancos de arena: la travesía, los Outer Banks y la tormenta de 1590 ─────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en marDelante (se llama después de los actores, con las mismas opciones).
// Opciones de todo el grupo: o.luz 'dia' (por omisión) | 'tarde' (sol bajo, oro) | 'gris' (nubes bajas, cortinas de
// chubasco) | 'noche' (luna, estrellas, faroles y ventanas de popa encendidos; para el fuego entre los árboles de 1590).
// La tormenta va siempre con su luz de tormenta. Cielos tramados con nubes de tres tonos a tres velocidades, un mar en
// perspectiva que vive (cuatro trenes de olas, borreguitos, vetas de espuma, reguero del sol o de la luna) y los barcos
// del canon (b_galeon: casco a tracas con cintones y portas, castillos pintados a rombos, farol de popa, tres palos con
// cofas, velas cuadradas con la CRUZ DE SAN JORGE en la mayor, mesana latina, jarcia, bandera blanca con la cruz roja y
// gallardetes que ondean, marineros pequeños en cubierta). Todas las vistas devuelven { encuadre, camara, luz, suelo,
// libre, … } y las de solo mar, libre [0, 0] (no hay suelo: nadie se planta ahí).
//   'travesia': EL ATLÁNTICO con los barcos navegando juntos de costado (cabecean y avanzan, con su ola de proa y su
//     estela), las velas hinchadas que flamean, la ballena que sopla a lo lejos, delfines que saltan, pardelas y
//     gaviotas, y una loma de ola con espuma delante; o.barcos 1–3 (2 por omisión: el de White delante [158, 140] y uno
//     lejos a la derecha; el tercero, a la izquierda); o.piratas 0–1: el barco pirata francés (casco negro, velas grises,
//     bandera azul con flores de lis doradas, sin cruz ni calaveras) llega por detrás desde la izquierda y en 1 navega al
//     lado del de White; o.canonazo 0–1: la nubecita de humo de un cañonazo al aire que sale de su costado y se va con el
//     viento (sin fogonazo). Devuelve horizonte 92, barcos: [[x, flotación]…] (en el orden de arriba) y pirata: [x, y].
//     Cámara 'cubierta': LA CUBIERTA de un barco de 1587 vista de costado: a la izquierda el castillo de popa (franja
//     pintada a rombos, ventanas emplomadas, puerta claveteada, escala, el farol de popa con su llama y un vigía pequeño),
//     el PINZOTE (la caña del timón de 1587) que sale de su mortaja y se mueve (o.timon −1–1 lo empuja), la bitácora con
//     la aguja que oscila, la jaula de gallinas que picotean, el cofre con LA CARTA extendida, el barril del agua, el palo
//     mayor con su cabillero y sus vueltas de cabo, los obenques con flechastes, la vela mayor con la cruz que asoma
//     arriba y se hincha, la borda con sus barraganetes y, por encima, la mar que sube y baja con un barco compañero;
//     la cubierta de tablas lavadas en perspectiva con la rejilla de la escotilla. Devuelve suelo 158, libre [20, 280],
//     timon: [x, y] (el puño del pinzote, a la altura del pecho; Fernandes a su izquierda, x ≈ 74), carta: [x, y] (el
//     centro de la carta sobre el cofre, x 163–213, y 135–141), bitacora: [x, y], borda: 108, horizonte (sube y baja).
//     marDelante: la aduja de cabo (abajo a la izquierda) y el balde (abajo a la derecha), por debajo de las caras.
//   'bancos': LOS OUTER BANKS desde el mar: la tierra firme lejana en el horizonte (y 62), el estrecho de aguas verdes
//     con ondas que brillan, la isla de Roanoke con su bosque de pinos y robles y su reflejo, una nasa de cañas y una
//     canoa de un tronco con dos pescadores pequeños; las dos islas largas y bajas de arena blanca (marisma detrás, dunas
//     con barrones que se mueven, línea de algas, arena mojada), la ensenada entre ellas con las rompientes de la barra,
//     la resaca y las líneas de espuma que llegan a la playa, correlimos, pelícanos en fila y gaviotas; el mar de delante.
//     o.humo 0–1: el humo fino que sube entre los árboles de Roanoke (de noche, con el resplandor del fuego); o.barcos
//     0–3 (2 por omisión): barcos fondeados fuera con las velas aferradas y el cable del ancla, y una pinaza a remo que va
//     hacia la ensenada. Devuelve horizonte 62, roanoke: [x, y], humo: [x, y], ensenada: [x, y], barcos: [[x, y]…].
//     Cámara 'mapa': EL MAPA DE LA COSTA como lo pintaría White, en acuarela sobre papel viejo y SIN rótulos, sobre la mesa
//     de nogal: el océano azul con olitas de pincel, los estrechos más claros, la tierra en manchas de acuarela con la
//     costa a tinta, la bahía de Chesapeake al norte, el estrecho de Albemarle tierra adentro, la isla de Roanoke en
//     verde, la cadena de islas de arena con sus pasos (Croatoan en el cabo del sur), ríos, arbolitos, lomas y pueblos
//     (cercos de casitas), los dos parches de papel (canon), dobleces y manchas, la rosa de los vientos con una flor de
//     lis (sin letras), los bosques en corros de arbolitos, la sierra lejana del oeste, matas de marisma en las orillas, las
//     sondas de los estrechos, el filete doble del marco con la escala de grados y la escala de leguas (sin cifras),
//     barquitos con la crucecita que cabecean, una ballena que sopla, motas de polvo, una mosca que se posa, se frota las
//     patas y se va (cada 11 s) y, en la mesa, el compás de puntas y el pisapapeles.
//     o.marca 'chesapeake' | 'roanoke' | 'croatoan' | 'albemarle': un círculo de tinta
//     que late sobre ese lugar; o.ruta 'norte' (de Roanoke a Chesapeake, el destino previsto) | 'sur' (de Roanoke a
//     Croatoan) | 'dentro' (de Roanoke por el Albemarle); o.avance 0–1 (1 por omisión): cuánto se ha dibujado la ruta;
//     o.tachar (false por omisión): la ruta sale cortada con una X a media distancia (un viaje que no se hizo).
//     Devuelve chesapeake, roanoke, croatoan, albemarle: [x, y] y papel: [x0, y0, x1, y1].
//   'tormenta': LA TORMENTA DE AGOSTO DE 1590 frente a la isla: nubes negras que corren, rayos con ramas (y el destello),
//     lluvia en diagonal, mar arbolada con la marejada que levanta el horizonte, la isla baja de bosque a la izquierda y
//     los dos barcos con las velas aferradas que cabecean fondeados; o.cable 0–1: hasta 0,5 el cable del ancla, tenso,
//     vibra cada vez más; en 0,5 se parte (hilachas) y el trozo de fuera se hunde; después el barco de White deriva mar
//     adentro (a la derecha y más lejos) con el cabo colgando del escobén y la isla se aleja y se vela. Sin personas en
//     peligro de cerca (solo marineros pequeños en cubierta). Devuelve horizonte 92, barco: [x, y], cable: [x0, y0, x1,
//     y1] (escobén → agua), isla: [x, y].
//     Cámara 'ancla': LA PROA de cerca, por fuera y a ras de agua: el casco a tracas con verdín, la borda del castillo de
//     proa pintada a rombos, la serviola, el espolón y el bauprés con la cebadera aferrada; el CABLE de cáñamo colchado
//     que sale del escobén y entra en el agua, tenso, que gotea, vibra y se parte (o.cable, igual que arriba); la proa
//     cabecea, el agua chorrea, la espuma salta por encima cada ~2,6 s, y detrás de la borda tres marineros pequeños
//     halan de un cabo. Suelta, la proa se va 60 px a la derecha. Devuelve suelo 90 (+ el cabeceo) y libre [176, 300]
//     (+ deriva): los personajes de pie en el castillo de proa asoman cabeza y hombros por encima de la borda (78);
//     deriva (cuánto se ha ido la proa), cable: [x0, y0, x1, y1], escoben: [x, y]. marDelante: la borda otra vez (tapa
//     a los personajes de cintura para abajo) y la espuma que salta.
// la geometría de cada vista (la que devuelve; lo que se mueve lo pone al día cada fotograma)
const V_MAR = {
  travesia: { cam: 'cubierta', general: { col: ['#a8c8e0', '#2a5a7a'], geo: { suelo: 180, libre: [0, 0], horizonte: 92, barcos: [[158, 140], [258, 108]] } }, cubierta: { col: ['#a8c8e0', '#7a5a3a'], geo: { suelo: 158, libre: [20, 280], timon: [89, 134], carta: [188, 137], bitacora: [113, 132], borda: 108, horizonte: 84 } } },
  bancos: { cam: 'mapa', general: { col: ['#b8d8f0', '#2a5a7a'], geo: { suelo: 180, libre: [0, 0], horizonte: 62, roanoke: [188, 78], humo: [198, 74], ensenada: [149, 112], barcos: [[236, 160], [88, 146]] } }, mapa: { col: ['#efe6d0', '#7ab0c8'], geo: { suelo: 180, libre: [0, 0], chesapeake: [226, 34], roanoke: [227, 104], croatoan: [250, 145], albemarle: [140, 96], papel: [6, 4, 313, 175] } } },
  tormenta: { cam: 'ancla', general: { col: ['#3a4250', '#1a2e40'], geo: { suelo: 180, libre: [0, 0], horizonte: 92, barco: [168, 134], cable: [134, 126, 124, 150], isla: [50, 88] } }, ancla: { col: ['#3a4250', '#5a3a24'], geo: { suelo: 90, libre: [176, 300], borda: 78, horizonte: 58, deriva: 0, cable: [159, 115, 24, 168], escoben: [159, 115] } } },
};
export function mar(R, t, o = {}) {
  const v = b_resuelve(o), f = B_VISTAS[v.enc + '.' + v.cam];
  const geo = f(R, t, o, v.luz);
  return { encuadre: v.enc, camara: v.cam, luz: v.luz, ...JSON.parse(JSON.stringify(V_MAR[v.enc][v.cam].geo)), ...geo };
}
// lo de delante de los personajes (se llama después de los actores, con las mismas opciones)
export function marDelante(R, t, o = {}) {
  const v = b_resuelve(o), f = B_DELANTE[v.enc + '.' + v.cam];
  return f ? f(R, t, o, v.luz) || {} : {};
}
// ── C · La isla de Roanoke: el asentamiento de 1587, el poste de 1590, el huerto y el embarcadero ──────────────────
// roanoke(R, t, o) pinta los 320 × 180 y devuelve su geometría ({ encuadre, camara, epoca, luz, suelo, libre, … });
// roanokeDelante(R, t, o), con las MISMAS opciones, se llama DESPUÉS de los actores (lo que va delante de ellos).
// Opciones de todo el grupo: o.encuadre y o.camara; o.epoca 1587 (por omisión) | 1590 (casas desmontadas, empalizada,
// hierba crecida, ni una persona); o.luz 'dia' (por omisión) | 'tarde' | 'amanecer' (rosado, con niebla baja que
// deriva) | 'noche' (azul, estrellas y luna; el fuego y las velas siguen dando luz). Cielos tramados con cúmulos de tres
// tonos a dos velocidades y cirros; la luz tiñe todo el decorado (capa fija en un búfer por encuadre, época y luz).
//   'fuerte': EL ASENTAMIENTO desde el borde del bosque: la otra orilla, el estrecho que brilla entre pinos y robles con
//     musgo, el claro con su camino de arena y las sombras de las nubes. 1587: tres casitas (canon) con humo, la de los
//     Dare en primer término, el pozo con su torno, la fragua (brasa y herrero), la ropa tendida que ondea, el huerto
//     cercado, gallinas, una cabra y colonos pequeños que trabajan (herrero, uno con cubos, una que tiende, uno en el
//     tejado, otro con la azada). 1590: la empalizada en círculo con la entrada al centro (el poste derecho pelado, la
//     talla no se lee de lejos), dentro postes de casas y cofres; fuera, ruinas, cofres revueltos con papeles, la hierba
//     seca a manchas, cuervos en las estacas, un ciervo que pasta; o.humo 0–1 (1590 y luz 'noche'): la hoguera lejana
//     entre los árboles del norte, con su resplandor y su columna de humo. Delante: los troncos del borde (x < 18 y
//     x > 300) con musgo y matas. Devuelve suelo 160, libre [20, 260]; 1587: casa [182, 112, 248, 150], puerta [198, 150],
//     pozo, fragua, cuerda; 1590: entrada [164, 160], poste [183, 120], cofres, cerco [x0, x1, y0, y1].
//     Cámara 'casa': DENTRO DE LA CASITA DE LOS DARE: techo de juncos por dentro con pares y viga, pared de entramado y
//     barro (con el zarzo a la vista), la ventanita con el postigo y el bosque (recortado, pinos que se mecen, pájaro),
//     un haz de luz con motas, hierbas y farol colgados, capa y sombrero en la percha, sartén, sierra, el estante con
//     tarros y libros, barril, arcón y escoba; el hogar con campana de barro, el fuego que baila y su resplandor que late,
//     la grúa con el caldero que echa vapor, la leña; la CUNA de madera roja con capota y balancines junto al fuego
//     (o.mece 0–1: se balancea rodando). Delante: la mesa basta (tablero, patas, travesaño) con el diario abierto
//     (renglones sin letras), el tintero con la pluma, la vela que tiembla, un cuenco y una hogaza. La casa es siempre la de 1587
//     (o.epoca no cambia nada). Devuelve suelo 160, libre [156, 186] (de pie, entre la mesa y la cuna), detras 152 (el
//     suelo de quien está detrás de la mesa, x 66–150: asoman cabeza y hombros), escribe [102, 152], gato [227, 160, −1]
//     (el gato que mece la cuna, a su derecha, mirando a la izquierda), cuna [204, 144], cunaBase [204, 160], cunaPies
//     [219, 152], mesa [62, 148, 154, 162], fuego [262, 148], ventana [x0, y0, x1, y1].
//   'poste': LA ENTRADA DE LA EMPALIZADA de cerca: estacas gruesas aguzadas, la entrada abierta y, dentro, la cara de
//     dentro del cerco. 1590: el gran POSTE DE LA DERECHA (x 222–250) pelado, con «CROATOAN» tallado en vertical, letra
//     a letra (surco oscuro y borde de madera viva), sin cruz y con el hueco liso encima; dentro, la hierba crecida, los
//     postes de una casa, dos cofres abiertos, un cañón viejo tumbado y oxidado y pájaros que picotean. o.talla 0–1: la
//     talla se revela de arriba abajo con una franja de luz de amanecer (debajo, en penumbra). 1587 (el cerco aún sin
//     abandonar: madera fresca, el poste con su corteza y, dentro, una casita con humo, gallinas y un colono). Las dos
//     ataduras de cuerda, el pie de las estacas oscuro de verdín, enredaderas que trepan (muchas en 1590; en 1587 una y
//     una estaca nueva clara) y un pájaro carpintero que pica la estaca de la izquierda (x 20). Delante: matas en las esquinas.
//     Devuelve suelo 166, libre [20, 200], talla [x0, y0, x1, y1], hueco [236, 42], entrada [126, 222], poste [222, 250].
//     Cámara 'arbol': EL ROBLE VIEJO DE LA DUNA, torcido hacia tierra, con raíces al aire, copa baja en racimos y barbas
//     de musgo; el mar con olas que rompen, la duna con matojos que se mueven, arena que corre, un tronco de deriva,
//     conchas, gaviotas; tres líneas de rompientes que avanzan, el delfín que asoma de vez en cuando, la arena mojada
//     con la línea de algas, la ola que sube y se retira con los correlimos detrás, huellas, una cuaderna varada (x
//     108–138, y 164–174) y un cangrejo que va y viene (x 260–308, y 153). 1590: «CRO» tallado en grande en horizontal sobre la corteza arrancada (o.talla 0–1, igual que
//     el poste); 1587: corteza entera. Devuelve suelo 162, libre [30, 180], talla [x0, y0, x1, y1], arbol [226, 158].
//   'huerto': EL HUERTO Y EL GRANERO: bosque de pinos y robles, la cerca de varas, los caballones en perspectiva con
//     las matas de maíz que se mecen (mazorcas), calabazas, el granero de tablas sobre pies con la puerta abierta y los
//     sacos, colonos pequeños con la azada (1587), cuervos que picotean, el patio con tocón y hacha, carretilla, cesta y
//     cubo. o.seco 0–1: la tierra se aclara y se agrieta, el maíz baja, amarillea y riza las hojas, las calabazas
//     menguan, los sacos se vacían, el cubo se seca, el cielo blanquea y se levanta polvo (y la tierra del patio se
//     cuartea). El patio con rodadas, paja suelta y, en 1587, la gallina con sus pollitos (y 174–178, por debajo de los
//     pies de todos). 1590: abandonado, maleza.
//     Delante: matas de maíz en los bordes. Devuelve suelo 158, libre [30, 250], granero [200, 100, 270, 150], puerta
//     [232, 150], sacos (cuántos quedan), seco.
//     Cámara 'embarcadero': EL EMBARCADERO de tablas sobre el estrecho: la punta de la isla y los bancos de arena con
//     los tres barcos (canon) fuera, el cerco de cañas para pescar de los vecinos, una canoa con dos remeros que cruza,
//     patos, peces que saltan, la estela del sol en el agua, el juncal con una garza; la pinaza amarrada a la bita
//     (cabecea, refleja); o.zarpa 0–1: suelta la amarra y se aleja remando hacia los barcos. 1590: tablas que faltan,
//     verdín, juncos más altos, el barril reventado, una caja podrida con una gaviota encima y un remo roto. Vida: un
//     bajío de arena a media distancia con aves de orilla que corren, crestas de olas que avanzan, la boya de barril
//     que cabecea, un pescador de los vecinos metido en el agua junto a su cerco que alza la red de mano; el
//     embarcadero con clavos, nudos, pernos, ligaduras de los pilotes, la escalerilla (x 146–152, bajo el borde) y,
//     en 1587, cajas y una cesta de pescado (x 64–91). Delante: EL CASCO Y LA BORDA DE LA PINAZA amarrada (o.zarpa
//     < 0.3; desde x 243, sin morder el final del embarcadero): quien va a bordo con los pies en flotación + 3 queda
//     tapado de cintura para abajo y asoman cabeza y hombros; y dos pilotes del borde (x 6 y 126). Devuelve suelo 164, libre [20, 230], pinaza
//     [x, y] (se mueve con o.zarpa), bita [238, 150], barcos [150, 85].
const V_ROANOKE = {
  fuerte: { cam: 'casa', general: { col: ['#a8c8e0', '#6a7a3a'], geo: { suelo: 160, libre: [20, 260], casa: [182, 112, 248, 150], entrada: [164, 160] } }, casa: { col: ['#7a5a3a', '#4a3424'], geo: { suelo: 160, libre: [156, 186], cuna: [204, 144], mesa: [62, 148, 154, 162], detras: 152, gato: [227, 160, -1] } } },
  poste: { cam: 'arbol', general: { col: ['#e8c8b8', '#7a5a3a'], geo: { suelo: 166, libre: [20, 200], talla: [229, 47, 242, 150], hueco: [236, 42] } }, arbol: { col: ['#b8d8f0', '#e8d4a4'], geo: { suelo: 162, libre: [30, 180], talla: [204, 108, 245, 125] } } },
  huerto: { cam: 'embarcadero', general: { col: ['#b8d8f0', '#8a6a44'], geo: { suelo: 158, libre: [30, 250], granero: [200, 100, 270, 150] } }, embarcadero: { col: ['#b8d8f0', '#4a7a6a'], geo: { suelo: 164, libre: [20, 230], pinaza: [272, 160] } } },
};
export function roanoke(R, t, o = {}) {
  const [enc, cam, ep, luz] = c_resolver(o);
  const geo = c_VISTAS[enc + '/' + cam](R, t, o, ep, luz, c_grado(luz));
  return { encuadre: enc, camara: cam, epoca: ep, luz, ...geo };
}
// lo que va por delante de los personajes en cada vista (se llama después de los actores, con las mismas opciones)
export function roanokeDelante(R, t, o = {}) {
  const [enc, cam, ep, luz] = c_resolver(o), f = c_DELANTE[enc + '/' + cam];
  return f ? f(R, t, o, ep, luz, c_grado(luz)) : {};
}
// ── D · Los pueblos algonquinos de la costa (las acuarelas de John White) ───────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante de los personajes va en puebloDelante (se llama después de los actores, con
// las mismas opciones). Opciones de todo el grupo: o.luz 'dia' | 'tarde' | 'noche' (por omisión: 'dia' en secotan,
// 'tarde' en lawson y 'noche' junto al fuego; la luz tiñe el fondo y lo que se mueve, y cambia el cielo: nubes de tres
// tonos a tres velocidades, cúmulos con cúpula y grumos, sol, luna y estrellas); o.seco 0–1 (la sequía: el maíz amarillo, bajo y con las hojas
// rizadas, la hierba agostada, la tierra agrietada, los girasoles mustios, calima en el cielo y polvo que corre).
// Toda la gente que pinta el decorado es pequeña y de fondo (6–11 px); los protagonistas los pone la escena.
//   'secotan': EL PUEBLO DE SECOTAN, como lo pintó White en 1585, a pleno día: el bosque de pinos y robles detrás, el
//     camino central de tierra que sube hacia el fondo, casas alargadas de esteras sobre arcos de varas (bóveda de
//     corteza en hiladas, esteras tejidas abajo, tramos con la estera lateral enrollada que dejan ver el interior con sus
//     varas, la tarima y los cacharros; el humo que sale por el techo), un secadero de pescado, un mortero de tronco; a la
//     derecha los campos de maíz en tres alturas (recién nacido, verde y maduro, este último con las cañas que se mecen
//     con el viento), la choza del vigía en alto sobre el maíz (el vigía se levanta cada pocos segundos y agita los
//     brazos; los cuervos de las cañas se espantan y vuelven), girasoles que se mecen, calabazas; delante, la plaza de
//     tierra con el fuego (piedras, leños, llamas, chispas, una olla de barro con vapor y el humo que se va con el
//     viento). Vida: una mujer muele maíz en el mortero, un hombre cruza con un haz de leña a la espalda, dos niños se
//     persiguen, alguien escarda el maíz verde, dos pavos que picotean junto a las matas de tabaco de
//     la casa, golondrinas y nubes. Devuelve suelo 160, libre [20, 250], fuego [150,
//     146] (la base de las llamas), olla [163, 144], camino [128, 202] (sus bordes en y 160), casa [4, 94, 96, 128] (la
//     casa grande de la izquierda), maiz [230, 100, 320, 142], vigia [276, 100].
//     Cámara 'canoas': LA ORILLA DEL PUEBLO: la playa de arena a la izquierda y abajo (con ondas, conchas, huellas y un
//     tronco varado), el estrecho brillante con el sol que rielá, la otra orilla baja al fondo, la casa larga y los pinos
//     en el ribazo, una canoa a medio hacer sobre dos calzos con brasas en el hueco que humean y un hombre que la raspa
//     con una concha, nasas de cañas en la arena, un secadero, el cerco de cañas en el agua (una valla larga que acaba en
//     una trampa en corazón), una canoa lejana con dos pescadores, peces que saltan, una garza en el bajío que pesca y
//     otra que pasa volando, gaviotas, juncos que se mecen. o.canoa 0–1: LA CANOA GRANDE (de un tronco, a la escala de
//     los personajes) sale de la orilla y se va por el agua hacia la derecha (con estela mientras se mueve); los que van
//     dentro los pone la escena en canoa: [x, y] y puebloDelante pinta el costado de delante, que les tapa de cintura
//     para abajo. Devuelve suelo 162, libre [20, 200], canoa [x, y] (el centro de la canoa a flote: donde se plantan los
//     pies de quien va dentro; con o.canoa 0 está en [226, 166]), orilla (función x → y de la línea del agua), garza [196,
//     132], canoaHecha [36, 112, 78, 112] (la canoa a medio hacer).
//   'lawson': EL PUEBLO DE HATTERAS HACIA 1701, AL ATARDECER (por omisión o.luz 'tarde'): el sol que se pone en el mar
//     con su reguero, nubes encendidas, dunas con barrón que se mece y robles achaparrados torcidos por el viento, dos
//     casas de esteras y una de tablas, un secadero de pescado, una canoa en la duna, gente pequeña sentada a la puerta,
//     correlimos que corren con la ola, la arena rizada por el viento (que levanta granos), la leña apilada, una nasa,
//     un remo clavado, un tronco blanqueado y
//     alguien que vuelve por la duna con una cesta; delante, la arena con conchas y huellas, un tronco para sentarse a la
//     izquierda del fuego y una estera a la derecha, y el fuego encendido (llamas, chispas, humo y su luz que tiembla
//     sobre la arena). Devuelve suelo 160, libre [30, 250], fuego [170, 150], asiento [104, 148, 154] (el tronco: x0, x1 e
//     y del asiento, para sentarse delante de él), estera [196, 250, 160].
//     Cámara 'fuego': JUNTO AL FUEGO de cerca, de noche (por omisión o.luz 'noche'): la pared de esteras de una casa larga
//     detrás (sus varas atadas, musgo, el hollín encima del fuego; cuelgan mazorcas, calabazas, peces secos, tabaco y un
//     cesto, y abajo una tinaja y dos cestos), con la puerta de estera enrollada, encendida por las llamas (la luz tiembla y llega más o menos lejos), el
//     cielo con estrellas que titilan y la luna, un roble oscuro a la derecha con luciérnagas; en el suelo, esteras tejidas; el fuego
//     grande con su anillo de piedras, leños con brasas, chispas que suben, una olla de barro con vapor y un cuenco con
//     un cazo; a la izquierda, un tronco caído con un libro abierto encima (renglones sin letras; o.libro false lo
//     quita, para que lo lleve el personaje); a la derecha, una persona sentada en la estera, pequeña, con la cara
//     iluminada de lado. o.ojos 0–1: sus ojos grises brillan a la luz del fuego (dos puntitos claros y un destello, con
//     respeto). Devuelve suelo 170, libre [20, 260], fuego [166, 168], libro [124, 150], asiento [70, 132, 150] (el
//     tronco), ojos [250, 140].
const V_PUEBLO = {
  secotan: { cam: 'canoas', general: { col: ['#b8d8f0', '#8a7a4a'], geo: { suelo: 160, libre: [20, 250], fuego: [150, 146] } }, canoas: { col: ['#b8d8f0', '#4a7a6a'], geo: { suelo: 162, libre: [20, 200], canoa: [226, 166] } } },
  lawson: { cam: 'fuego', general: { col: ['#e8a878', '#8a7a4a'], geo: { suelo: 160, libre: [30, 250], fuego: [170, 150] } }, fuego: { col: ['#3a2418', '#5a3a24'], geo: { suelo: 170, libre: [20, 260], libro: [124, 150] } } },
};
export function pueblo(R, t, o = {}) {
  const enc = V_PUEBLO[o.encuadre] ? o.encuadre : 'secotan', e = V_PUEBLO[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const def = enc === 'secotan' ? 'dia' : cam === 'fuego' ? 'noche' : 'tarde', luz = ['dia', 'tarde', 'noche'].includes(o.luz) ? o.luz : def;
  const seco = Math.round(Math.max(0, Math.min(1, o.seco ?? 0)) * 4) / 4;
  let geo;
  if (enc === 'secotan') geo = cam === 'canoas' ? d_canoas(R, t, o, luz, seco) : d_secotan(R, t, o, luz, seco);
  else geo = cam === 'fuego' ? d_junto(R, t, o, luz, seco) : d_lawson(R, t, o, luz, seco);
  return { encuadre: enc, camara: cam, ...geo };
}
// lo que va por delante de los personajes (llámala después de los actores, con las mismas opciones): en secotan, los
// girasoles del borde derecho y matas de hierba en las esquinas; en canoas, el costado de delante de la canoa grande
// (tapa de cintura para abajo a quien va dentro) y los juncos de la esquina; en lawson, el barrón de las esquinas; junto
// al fuego, las chispas y la ceniza que flotan por delante
export function puebloDelante(R, t, o = {}) {
  const enc = V_PUEBLO[o.encuadre] ? o.encuadre : 'secotan', e = V_PUEBLO[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const def = enc === 'secotan' ? 'dia' : cam === 'fuego' ? 'noche' : 'tarde', luz = ['dia', 'tarde', 'noche'].includes(o.luz) ? o.luz : def;
  const seco = Math.max(0, Math.min(1, o.seco ?? 0)), L = d_tono(luz);
  if (enc === 'secotan' && cam === 'general') {
    d_girasol(R, L, 300, 182, 64, t, seco, 0); d_girasol(R, L, 312, 184, 56, t, seco, 1);
    d_matas(R, L, t, [[0, 179, 9], [10, 180, 7], [292, 180, 8]], seco);
  } else if (enc === 'secotan') {
    const [cx, cy] = d_canoaPos(o.canoa ?? 0); d_canoaGrande(R, L, cx, cy, t, true);
    d_juncos(R, L, t, [[4, 181, 30, 7], [13, 182, 22, 5]], seco);
  } else if (cam === 'general') {
    d_matas(R, L, t, [[2, 180, 10], [14, 181, 7], [304, 180, 10], [316, 181, 8]], 0.3, true);
  } else {
    const fl = d_parpadeo(t);
    for (let k = 0; k < 7; k++) { const age = (t * 0.33 + k / 7) % 1, x = Math.round(166 + (h(k, 1, 701) - 0.5) * 70 + Math.sin(age * 7 + k) * 6 + age * 14), y = Math.round(150 - age * 120);
      if (y < 48 && x > 270) continue; R.pset(x, y, age < 0.4 ? hex('#ffe890') : age < 0.75 ? hex('#ff9a3a') : hex('#a84a2a')); if (age < 0.3 && fl > 0.9) R.pset(x, y - 1, hex('#fff4c0')); }
  }
  return {};
}
// ── E · Hatteras hoy: la excavación y la mesa de hallazgos ───────────────────────────────────────────────────────────
// hatteras(R, t, o): o.encuadre ('excavacion' por omisión, o 'mesa') y o.camara ('general' por omisión, o la segunda de
// cada encuadre). Lo de delante de los personajes va en hatterasDelante(R, t, o) con las mismas opciones: se llama
// DESPUÉS de los actores. Devuelve la geometría (suelo, libre y los puntos de cada vista).
//   'excavacion' · 'general': LA EXCAVACIÓN EN HATTERAS HOY, un claro de arena entre robles achaparrados (troncos
//     torcidos grises, copas bajas y planas peinadas por el viento, con barbas de musgo) junto a la ensenada: el cielo
//     tramado con nubes de tres tonos a tres velocidades, el sol (x 232, y 26) que brilla en el agua, la otra orilla
//     baja, juncos que se mecen, una garza azulada que pesca en la orilla, una lancha que pasa, pelícanos en fila.
//     En el claro, LA CUADRÍCULA DE CORDEL con estacas y cintas rosas que ondean y LA CATA ESCALONADA (cata [86, 116,
//     184, 140]): la pared del fondo enseña las capas (humus, arena clara, la capa oscura de conchas, la tierra parda y
//     la naranja de abajo), con un escalón, banderitas, una regla de jalón roja y blanca y un vecino que raspa con la
//     paleta dentro; otra cata pequeña, el montón de tierra cribada sobre una lona azul, cubos naranjas, una
//     carretilla verde con tierra bajo el roble, LA CRIBA en su caballete (criba [224, 133], la malla; la tierra cae por
//     debajo cuando se sacude: o.sacude 0–1, 1 por omisión, 0 quieta; la caja a la altura de la cintura, en y 142–151)
//     y LA MESA PLEGABLE con su sombrilla de rayas y la nevera delante (mesa [252, 139, 306, 151]: el tablero y el pie). De fondo, vecinos pequeños que criban, raspan y llevan
//     cubos; mosquitos. Devuelve suelo 160, libre [20, 250], horizonte 66, sol, criba, mesa, cata.
//     o.luz (nueva, de los dos planos de la excavación) 'dia' (por omisión, como siempre) | 'tarde': el mismo plano con la
//     luz baja del atardecer: el cielo con la rampa del ocaso de los pueblos, el sol bajo y anaranjado sobre la otra
//     orilla (sol [232, 50]) y todo lo demás dorado, también lo que se mueve y lo de hatterasDelante (con las mismas
//     opciones); en la criba, sin cielo, solo dora a medias. En 'mesa' y 'laboratorio' no hace nada.
//   'excavacion' · 'criba': LA CRIBA DE CERCA, desde arriba: el marco de pino con sus tornillos, la malla de alambre y
//     encima la tierra de la cata con conchas de ostra y de almeja, piedrecitas, carbón, un tiesto de cerámica y raíces;
//     la tierra fina cae por debajo al montón; la luz entre las hojas del roble se mueve por encima; una hormiga cruza el
//     marco; una paleta, una brocha y tierra suelta en la malla; arriba, en la arena, una raíz del roble que serpentea,
//     bellotas, conchas rotas, la huella de una bota y una mata de hierba de duna. A la izquierda, la tablilla de la arqueóloga con su clip. EL IMÁN de herradura rojo (canon, C.iman) con los
//     polos de acero: o.iman 0–1 (0 alto, 1 posado en la tierra; su sombra se acerca); o.escamas 0–1 (cuántas escamas
//     de hierro, C.hierro/C.hierroL, cuelgan de los polos en barba y cuánto brillan: destellos de cuatro puntas);
//     o.gag 0–1 (el clip sale de la tablilla y una moneda de la tierra y vuelan hasta pegarse a los lados del imán; en
//     1 quedan colgando). El imán está en x 242–282 y su lomo en y = 46 + 26·o.iman (las puntas, 36 px más abajo). La mano la pone la escena: entra por el borde derecho (brazo) y coge el hombro del imán
//     (iman). Devuelve suelo 180, libre [0, 0], iman [x, y] (donde va la mano: T.brazo(R, ...brazo, ...iman, manga, -1)),
//     brazo [x, y] (de dónde sale el brazo, en el borde derecho), polos [[x, y], [x, y]] (las puntas), clip [x, y] y
//     moneda [x, y] (dónde están en ese instante) y tierra [x0, y0, x1, y1] (el montón sobre la malla).
//   'mesa' · 'general': LA MESA DE HALLAZGOS bajo un toldo plegable blanco con su faldón que ondea, en la excavación: el
//     tablero con un papel kraft (cada pieza sobre su cartulina blanca con sombra, para que se lea), bolsitas de hallazgos con su raya roja y su número, LA EMPUÑADURA DE ESPADA verde de
//     óxido sobre su regla escala, dos trozos de una LLAVE DE ARCABUZ, el pedazo de PIZARRA con su lápiz de plomo, EL
//     ANILLO de latón sobre una tela azul oscura (brilla), un cuaderno de campo amarillo, una cámara, un cepillo, una
//     jarra de agua; una esquina de papel que levanta el viento. Detrás, bajo el toldo y por el lado abierto: el claro
//     con un roble, la ensenada que brilla, cribas lejanas con vecinos que criban y una garceta; un cangrejo fantasma que
//     cruza la arena de vez en cuando. Deja sitio a la izquierda para arqueologaRK que coloca piezas (con { sostiene }).
//     o.piezas 0–4 (4 por omisión): cuántas piezas hay ya en la mesa, en el orden espada, armas, pizarra, anillo.
//     Devuelve suelo 162, libre [20, 118], mesa [x0, y0, x1, y1] (el tablero: y0 el borde de atrás, y1 el de delante),
//     piezas [[x, y]…] (espada, armas, pizarra, anillo).
//   'mesa' · 'laboratorio': UN LABORATORIO DE HOY (2026): pared de paneles con armarios altos, estantes con cajas de
//     archivo (rayas, sin letras), una ventana con persiana y el roble que se mece fuera (recortado; debajo, el
//     convector y dos enchufes; al lado, el extintor y el pictograma del lavaojos; en el suelo, la luz de la ventana, la
//     papelera de pedal, el taburete de ruedas y la rejilla del desagüe), una puerta con
//     cristal por la que pasa alguien, un reloj sin cifras, una pantalla con gráficas de barras que cambian (sin letras);
//     en la encimera, la BANDEJA con huesecillos sueltos de pescado y de ciervo (vértebras, espinas, una falange: NINGÚN
//     animal entero ni cráneo), una mazorca seca, un cuenco de barro, viales en su gradilla, un microscopio y la LUPA DE
//     ARO con luz en su brazo articulado: bajo ella, LA BALA DE PLOMO redonda y gris sobre un paño (o.lupa 0–1: la luz
//     se enciende y la bala se ve aumentada en la lente; 1 por omisión). Devuelve suelo 166, libre [20, 120], banco [x0, y0, x1, y1]
//     (la encimera), bala [x, y] (el centro de la bala en la lente), pregunta [x, y] (sitio tranquilo para la «?» de la
//     escena), bandeja [x0, y0, x1, y1].
const V_HATTERAS = {
  excavacion: { cam: 'criba', general: { col: ['#b8d8f0', '#c8b080'], geo: { suelo: 160, libre: [20, 250], horizonte: 66, sol: [232, 26], criba: [224, 145], mesa: [252, 139, 306, 151], cata: [80, 113, 190, 142] } },
    criba: { col: ['#c8b080', '#6a7a8a'], geo: { suelo: 180, libre: [0, 0], iman: [283, 58], brazo: [320, 86], polos: [[248, 83], [276, 83]], tierra: [120, 86, 284, 124] } } },
  mesa: { cam: 'laboratorio', general: { col: ['#e8e0cc', '#8a7a5a'], geo: { suelo: 162, libre: [20, 118], mesa: [126, 133, 308, 153], piezas: [[154, 143], [200, 144], [240, 141], [281, 144]] } },
    laboratorio: { col: ['#e8ecee', '#c8ccd0'], geo: { suelo: 166, libre: [20, 120], banco: [128, 132, 319, 154], bala: [264, 122], pregunta: [258, 90], bandeja: [138, 136, 186, 148] } } },
};
export function hatteras(R, t, o = {}) {
  const enc = V_HATTERAS[o.encuadre] ? o.encuadre : 'excavacion', e = V_HATTERAS[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const g = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) };
  if (enc === 'excavacion') (cam === 'general' ? e_excavacion : e_criba)(R, t, o, g);
  else (cam === 'general' ? e_mesa : e_laboratorio)(R, t, o, g);
  // o.luz 'tarde' (solo en la excavación): el mismo fotograma, pasado a la luz baja y dorada del atardecer
  if (enc === 'excavacion' && o.luz === 'tarde') { d_atardecer(R, cam === 'general' ? 'hat|excavacion' : 'hat|criba', cam === 'general'); if (cam === 'general') g.sol = [232, 50]; }
  return g;
}
// lo que va por delante de los personajes en cada vista (se llama después de los actores): en la excavación, matas de
// barrón y hierba de duna que se mecen en las esquinas de abajo, una estaca con su cinta y un cubo con la paleta; en la
// mesa, matas en las esquinas, un cubo con tierra (x 104–120, y 166–182) y una estaca con su cinta (x 152); en el
// laboratorio, el borde de un carrito con una caja de muestras abajo a la derecha (x 250–319, y 158–179, fuera de libre).
// Nada tapa caras: las matas de las esquinas (x < 42 y x > 284) suben hasta y ≈ 150; lo demás queda por debajo de y 164.
// Con o.luz 'tarde' en la excavación, lo de delante sale también dorado (pásale las mismas opciones que a hatteras).
export function hatterasDelante(R0, t, o = {}) {
  const enc = V_HATTERAS[o.encuadre] ? o.encuadre : 'excavacion', e = V_HATTERAS[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const R = enc === 'excavacion' && o.luz === 'tarde' ? d_Rcalido(R0) : R0;
  if (enc === 'excavacion' && cam === 'general') {
    e_matas(R, t, [[0, 180, 30, 1], [14, 182, 22, 2], [292, 180, 34, 3], [306, 183, 26, 4], [150, 186, 12, 5]]);
    e_estaca(R, 40, 176, 18, t, 1); e_cubo(R, 270, 180, 1.4, true);
  } else if (enc === 'mesa' && cam === 'general') {
    e_matas(R, t, [[0, 182, 28, 6], [12, 184, 20, 7], [300, 182, 26, 8]]);
    e_cubo(R, 112, 182, 1.3, true); e_estaca(R, 152, 182, 14, t, 3);
  } else if (enc === 'mesa') {
    const { rect, linea, pset } = R, P = e_P;
    rect(250, 168, 319, 179, P.k); rect(251, 169, 319, 172, P.metalL); rect(251, 173, 319, 179, P.metal); linea(251, 172, 319, 172, P.metalS);
    rect(262, 158, 300, 168, P.k); rect(263, 159, 299, 167, P.cajaL); rect(263, 159, 299, 160, P.blanco); rect(276, 162, 286, 163, P.cajaS);
    for (let k = 0; k < 4; k++) pset(266 + k * 9, 165, P.rojo);
  }
  return {};
}
// ── F · El Museo Británico (2012) y el Sitio X ────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en museoDelante (llámala después de los actores, con las mismas opciones).
//   'sala': UNA SALA DE ESTUDIO DEL MUSEO BRITÁNICO, 2012: pared de yeso con paneles y cornisa, ventana alta en arco con
//     el cielo gris de Londres (nubes a tres velocidades y palomas, recortado), radiador, dos pilastras estriadas, una
//     acuarela de White enmarcada, la puerta de cristal doble a la galería con vitrinas y visitantes que pasan
//     (recortados), un reloj con su segundero, la lámpara colgante verde, estanterías de acero con cajas de archivo y
//     tubos de mapas, zócalo de madera, parqué en espiga con la luz de la ventana y motas de polvo en el haz; la MESA DE
//     LUZ (tablero x 100–240, y 132–146, patas hasta y 159) con el mapa de White encima, pesas de tela, GUANTES BLANCOS,
//     lupa y lápiz, una lámpara articulada pinzada; el aparato de RAYOS X (columna x 250–256, brazo y 60–66 de x 150 a
//     268, panel con pantallita que se dibuja); la cámara en su trípode (x 34–60). o.luz 0–1: la mesa se enciende (el
//     tubo parpadea por debajo de 0,35) y su luz sube a la pared y se refleja en el parqué. o.rayos 0–1 (nueva): el
//     cabezal corre por el brazo de x 150 a 222 con su haz violeta; sin ella queda quieto en x 176 y apagado.
//     Devuelve suelo 160, libre [30, 250], mesa: [x0, y0, x1, y1], mapa (el mapa sobre el tablero), cabezal, puerta,
//     ventana, reloj. Delante (museoDelante): el carrito de archivo (x 266–319). Cámara 'mapa': EL MAPA DE WHITE DE
//     CERCA (canon) con el norte arriba, en acuarela y sin rótulos, a contraluz sobre el cristal cuadriculado de la mesa:
//     tierra firme con arbolitos, ríos y pueblos, el estrecho de Albemarle que entra a la izquierda, la isla de Roanoke,
//     los bancos de arena con sus pasos, el mar con olas grabadas, tres barquitos que cabecean, la rosa de los vientos,
//     el pliegue y las manchas del papel, dos pesas de tela y un pisapapeles; en el margen derecho del cristal, un paño
//     de algodón doblado, una pesa de latón y un lápiz; los DOS PARCHES (norte x 98–136, y 38–72;
//     sur x 196–220, y 76–94). o.parche 0–1: el del norte se vuelve transparente y aparece la ESTRELLITA roja y azul de
//     cuatro puntas en (116, 53), que late con chispas. o.rayos 0–1 (nueva): una franja azulada barre la hoja de
//     izquierda a derecha y, al cruzar el parche, deja ver la estrella un momento. El dedo con guante lo pone la escena.
//     Devuelve parche, parcheSur, estrella, hoja, rayo.
//   'sitiox': EL SITIO X, junto al estrecho de Albemarle, hoy: cielo tramado con sol (236, 34), cirros y cúmulos de tres
//     tonos a tres velocidades que pasan por DETRÁS de los árboles, gaviotas y un águila pescadora; el agua ancha y marrón
//     (y 91–117) con ondas, reflejos del cielo, destellos que corren y una barquita; a la izquierda, el bosque de pinos;
//     en el agua, cuatro cipreses calvos con musgo, rodillas y reflejo; una garza que picotea (160, 117); en el campo
//     segado (desde y 118), la camioneta blanca (x 14–62), el toldo azul con una arqueóloga pequeña que raspa, la criba en
//     su caballete con un voluntario pequeño que la agita (x 268–300), el montón de tierra y la CUADRÍCULA grande abierta
//     (x 148–238, y 146–166) con estratos, cuerdas, estacas y cintas rosas que aletean. o.hallazgo 0–1: en la cuadrícula
//     aparecen cuatro trozos de cerámica que destellan. Devuelve suelo 160, libre [24, 250], cuadricula: [x, y],
//     excavacion, camioneta, criba, garza, horizonte, orilla, sol. Delante: la carretilla (x 258–318, y 156–179) y la
//     hierba alta de las esquinas de abajo. Cámara 'ceramica': LOS TROZOS DE CERÁMICA de cerca en una bandeja blanca
//     (x 64–256, y 44–156) sobre la mesa de campo de tablones: el perfil de una jarra a lápiz (eje x 160, boca y 54, pie
//     y 146, asa a la derecha), cuatro trozos (borde de barro claro, panza con vidriado verde, uno pardo con arenilla de
//     North Devon y un trozo del asa), la regla escala con 0 y 5, el cepillo, la paleta, la bolsita, la etiqueta (una
//     jarrita a lápiz, sin cifras) y un lápiz; el fondo de la bandeja es una hoja milimetrada con migas de tierra; arriba
//     el cuaderno de campo abierto (x 62–128, y 18–40) y abajo el flexómetro amarillo (x 90–142, y 161–175); la sombra
//     de las hojas se mueve, una hoja de roble cae y cruza la mesa y una hormiga cruza. o.encaja 0–1: los trozos van a
//     su sitio en el perfil. Devuelve bandeja, jarra, piezas, cepillo.
const V_MUSEO = {
  sala: { cam: 'mapa', general: { col: ['#d8d0c0', '#5a4a3a'], geo: { suelo: 160, libre: [30, 250], mesa: [100, 132, 240, 159] } }, mapa: { col: ['#efe6d0', '#7ab0c8'], geo: { suelo: 180, libre: [0, 0], parche: [98, 38, 136, 72], estrella: [116, 53] } } },
  sitiox: { cam: 'ceramica', general: { col: ['#b8d0e0', '#6a7a3a'], geo: { suelo: 160, libre: [24, 250], cuadricula: [212, 160] } }, ceramica: { col: ['#e8e0cc', '#8a7a5a'], geo: { suelo: 180, libre: [0, 0], bandeja: [64, 44, 256, 156] } } },
};
export function museo(R, t, o = {}) {
  const enc = V_MUSEO[o.encuadre] ? o.encuadre : 'sala', cam = o.camara === V_MUSEO[enc].cam ? V_MUSEO[enc].cam : 'general';
  const geo = enc === 'sala' ? (cam === 'mapa' ? f_mapaCerca(R, t, o) : f_sala(R, t, o)) : (cam === 'ceramica' ? f_ceramica(R, t, o) : f_sitioX(R, t, o));
  return { encuadre: enc, camara: cam, ...geo };
}
// lo que va por delante de los personajes (llamar después de los actores, con las mismas opciones): en la sala, el
// carrito de archivo de acero con cajas y mapas enrollados (x 266–319, y 128–179, fuera de libre); en el Sitio X, la
// carretilla con tierra (x 262–306, y 156–179) y las matas de hierba alta de las dos esquinas de abajo, que se mecen.
// Los primeros planos no llevan nada delante. Devuelve {}.
export function museoDelante(R, t, o = {}) {
  const enc = V_MUSEO[o.encuadre] ? o.encuadre : 'sala', cam = o.camara === V_MUSEO[enc].cam ? V_MUSEO[enc].cam : 'general';
  if (cam !== 'general') return {};
  if (enc === 'sala') f_carrito(R, t); else f_sitioDelante(R, t);
  return {};
}
// ── G · Hoy: el estudio de Atom ────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante de los personajes va en hoyDelante (con las MISMAS opciones; se llama después
// de los actores).
//   'estudio': EL ESTUDIO DE ATOM, de hoy, a media tarde, cálido: techo de yeso (liso bajo el año) con un ventilador de
//     aspas que gira despacio (x 222), moldura, papel pintado ocre con flores de lis menudas al tresbolillo (solo listas
//     tras Atom), friso de tablillas de nogal y rodapié, tarima de roble con una alfombra trenzada ovalada. De izquierda a
//     derecha: LA LIBRERÍA (x 2–46, y 30–149: lomos de colores sin letras, libros tumbados, una pecera con un pez naranja
//     que nada, caracolas, un tarro de arena, un potos que cuelga y se mece); LA VENTANA (hueco x 58–102, y 36–92,
//     recortado) con la costa de hoy: cielo tramado, nubes de tres tonos a tres velocidades, gaviotas, el mar con brillos,
//     un velero que cruza, dunas con barrón que se mece, una cerca de arena y EL FARO a rayas en espiral blanco y negro
//     (su luz destella y barre); cortinas que ondean, la mancha de sol en la tarima con motas; bajo la ventana UN BAÚL de
//     colono con herrajes, libros y un tarro con una caracola; EL MAPA ANTIGUO enmarcado (x 114–172, y 36–80: acuarela de
//     la costa con los bancos de arena, barquitos y rosa de los vientos, sin rótulos); un aplique de latón con su halo
//     (x 179, y 52); EL TABLERO DE CORCHO (x 186–236, y 40–94) con notitas amarillas de dibujos (un barco, unos anillos,
//     un imán, una «?») unidas con lana roja y, en el centro, LA NOTA de Atom (o.nota); LA PUERTA de cuarterones (hueco
//     x 242–272, y 48–149; pomo en 267, 102); a la derecha, el perchero con un chubasquero amarillo, un sombrero y una
//     bolsa. EN EL CENTRO, LA MESA (x 108–198, tablero y 135–140, patas torneadas hasta y 156) con LA MAQUETA DE LA
//     EMPALIZADA (palitos aguzados en círculo sobre corcho, casitas, una banderita con la cruz que ondea), la lupa, el
//     imán rojo, el taco de notas y un corte de tronco pequeño.
//     o.nota 'taza' (por omisión: una taza dibujada a lápiz con una flecha en bucle que no se sabe adónde va; el gag 1) |
//     'flecha' (una isla con su árbol y una flecha roja clara hacia ella; el gag 8) | null (solo la chincheta). La nota
//     tiembla con el aire de la ventana. o.notaEntra 0–1: la nota cae desde arriba hasta su sitio y se clava (para «deja
//     una nota»; por omisión 1; con 0 no se ve, solo la chincheta).
//     hoyDelante: un cesto de cartas enrolladas abajo a la izquierda (x 0–28) y una maceta de barrón de duna abajo a la
//     derecha (x 294–319) que se mece; los dos fuera de libre.
//     Devuelve suelo 158, libre [40, 250], mesa: [x0, y, x1] (tablero), maqueta: [x, y] (el centro de la maqueta sobre la
//     mesa), nota: [x, y] (el centro de la nota), corcho: [x0, y0, x1, y1], ventana: [x0, y0, x1, y1], puerta: [x0, y0,
//     x1, y1] (el hueco), pomo: [x, y], iman: [x, y], lupa: [x, y], tronco: [x, y] (en la mesa).
//     Cámara 'maqueta': LA MAQUETA DE CERCA sobre la mesa de roble, a la luz de la tarde: al fondo la pared con la ventana
//     (hueco x 10–72, y 24–74, la costa y el faro, recortada) y el corcho con notas a la derecha (x 232–319, y 48–80);
//     sobre la mesa, la base de corcho pintada de arena con matitas de musgo, la EMPALIZADA de palitos aguzados en óvalo
//     (centro 160, 124) con sombra, tres casitas de cartón con tejado de papel doblado y un pozo dentro, la banderita
//     de San Jorge en un palillo que ondea, y la entrada delante con dos postes gruesos: en el de la DERECHA, EL
//     POSTECITO (cara x 175–182, y 112–142). Alrededor: el bote de cola y un haz de palitos (izquierda), el taco de notas
//     con un lápiz (abajo a la izquierda), la lupa y el imán rojo (derecha); motas en la luz.
//     o.talla 0–1: en el postecito aparecen, renglón a renglón, rayas talladas (sin letras legibles), con virutas que se
//     amontonan al pie. o.cruz 0–3: una cruz de brazos ensanchados encima de la talla: torcida a un lado (1), torcida al
//     otro (2; la anterior queda raspada) y bien (3). o.navaja (por omisión true): la navaja de tallar descansa sobre la
//     mesa (x 214–244, y 160–166); con false no está (la lleva la mano de la escena).
//     Devuelve poste: [x, y] (el centro de la cara tallada), cruz: [x, y], navaja: [x, y] (el mango; null con
//     o.navaja false), maqueta: [x0, y0, x1, y1].
//   'mesa': LA MESA DE TRABAJO de Atom, otra pared del estudio, con luz de flexo: a la izquierda un tablero de herramientas
//     (barrena de Pressler, calibre, cinta, sierra), un grabado enmarcado de un pantano de cipreses (x 34–96, y 36–82), una
//     lámina de barras con el ancho de los anillos y tres barras rojas muy bajas (x 124–186, y 32–62), un
//     reloj de pared con su segundero (x 110, y 46) y una repisa con un helecho; LA MESA (x 128–319, tablero y 132–138,
//     patas hasta y 158) con EL CORTE DE TRONCO de ciprés (canon) grande sobre su soporte (centro 236, 92, r 36): la
//     corteza, la albura clara, el duramen, los anillos y unas grietas de secado; LA BALANZA de platillos de latón (pie
//     en 160, 132; fiel en 160, 78) con LA ESPADITA de juguete en el platillo izquierdo y LA MAZORCA en el derecho; la
//     lupa grande, una caja de testigos de madera, papeles con gráficas de puntos (sin letras), LA REVISTA científica
//     (sin letras) y una taza que humea; el flexo a la derecha con su cono de luz y las motas que flotan en él.
//     o.anillos 0–1: tres anillos finísimos (los de 1587–1589) se iluminan con un brillo que late, aparece una
//     banderita clavada con «1587» (a la izquierda, x 199–222, y 38–73) y el tronco cruje: una grieta nueva se abre un píxel (desde 0.5). o.balanza -1…1:
//     hacia dónde cae (-1: el platillo de la espada abajo; se mece un poco). o.espada / o.mazorca (por omisión true):
//     qué hay en cada platillo. o.revista 0 (por omisión: cerrada en su montón, x 276–306, y 116–128) | 1 (abierta de pie, x
//     262–310, y 108–131, con renglones a la izquierda y la página derecha EN BLANCO, solo el recuadro de puntos). hoyDelante: un taburete de madera abajo a la izquierda (x 0–24).
//     Devuelve suelo 160, libre [30, 120], tronco: [x, y, r], anillos: [x, y] (dónde está el tramo fino, para la lupa),
//     balanza: [x, y] (el fiel), platos: [[x, y], [x, y]] (dónde caen ahora los platillos), revista: [x0, y0, x1, y1],
//     lupa: [x, y], taza: [x, y].
//     Cámara 'piedras': UNA ESTANTERÍA CON LAS PIEDRAS TALLADAS (las «Dare Stones» de 1937): la balda de nogal (y 132–140)
//     con sus escuadras, contra el papel de la pared; CUATRO PIEDRAS grises (centros x 56, 126, 196, 264; base y 131)
//     con renglones de rayas de talla (sin letras legibles); entre ellas una tarjetita de museo con su sello rojo y rayas (sin cifras), un cepillo y una lupa;
//     debajo, la balda baja con cajas de archivo, libros tumbados y una lámpara de mesa que da su luz; motas y una
//     arañita que baja y sube de su hilo (x 18). o.floritura 0–1: las piedras se van llenando de florituras talladas en
//     fresco (colas en espiral, rasgos de entrada, orla con cuentas, volutas, guirnalda y roseta; más en cada piedra
//     que en la anterior). o.rompe 0–1: la ÚLTIMA se raja de arriba abajo (0–0.25) y
//     las dos mitades se separan y se inclinan, enseñando que por dentro es YESO blanco, con polvo y migas en la balda.
//     Devuelve piedras: [[x, y]…] (el centro de cada una), balda: y.
const V_HOY = {
  estudio: { cam: 'maqueta', general: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 158, libre: [40, 250], mesa: [108, 135, 198], maqueta: [146, 128], nota: [211, 67], corcho: [186, 40, 236, 94], ventana: [58, 36, 102, 92], puerta: [242, 48, 272, 149], pomo: [267, 102], iman: [173, 132], lupa: [116, 133], tronco: [192, 129] } }, maqueta: { col: ['#e8d8c0', '#c8a878'], geo: { suelo: 180, libre: [0, 0], poste: [178, 127], cruz: [178, 116], maqueta: [56, 96, 264, 168] } } },
  mesa: { cam: 'piedras', general: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 160, libre: [30, 120], tronco: [236, 92, 36], anillos: [258, 84], balanza: [160, 78], platos: [[138, 112], [182, 112]], revista: [276, 116, 306, 128], lupa: [206, 134], taza: [184, 128] } }, piedras: { col: ['#d8c8b0', '#7a5a40'], geo: { suelo: 180, libre: [0, 0], piedras: [[56, 101], [126, 97], [196, 100], [264, 102]], balda: 132 } } },
};
export function hoy(R, t, o = {}) {
  const [enc, cam] = g_hoyVista(o), geo = JSON.parse(JSON.stringify(V_HOY[enc][cam].geo));
  const f = { estudio: { general: g_hoyEstudio, maqueta: g_hoyMaqueta }, mesa: { general: g_hoyMesa, piedras: g_hoyPiedras } }[enc][cam];
  return { encuadre: enc, camara: cam, ...geo, ...(f(R, t, o) || {}) };
}
// lo de delante de los personajes en cada encuadre de hoy(): se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  const [enc, cam] = g_hoyVista(o);
  const f = { estudio: { general: g_hoyEstudioDelante }, mesa: { general: g_hoyMesaDelante } }[enc]?.[cam];
  return f ? f(R, t, o) || {} : {};
}
// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_RK = { inglaterra: V_INGLATERRA, mar: V_MAR, roanoke: V_ROANOKE, pueblo: V_PUEBLO, hatteras: V_HATTERAS, museo: V_MUSEO, hoy: V_HOY };

// la paleta propia de Inglaterra: el roble de los paneles, el yeso del friso, el tapiz de verdura, el latón, la pluma
// y la vela; la piedra del muelle, el entramado de las casas, las tejas, la hierba de las colinas y la creta del
// acantilado; los cielos de cada estación
const a_C = pal({
  roble: '#8a5a32', robleS: '#5e3c20', robleD: '#3a2414', robleL: '#b07c48', robleV: '#704828', robleM: '#a06c3c',
  yeso: '#e4d6b8', yesoS: '#cfbf9c', yesoL: '#f0e6cc', viga: '#6a4a2c', vigaS: '#4a3018',
  tapiz: '#3a5a52', tapizS: '#26403a', tapizL: '#5a7a62', tapizH: '#7a8a4a', tapizR: '#9a3a32', tapizO: '#c8a050', tapizB: '#d8c89a',
  laton: '#c8a040', latonL: '#f0d878', latonS: '#8a6a20', vela: '#f4ecd8', llama: '#ffd060', llamaL: '#fff4b0', llamaR: '#f08030',
  mapaP: '#e6d6a8', mapaS: '#c8b080', mapaM: '#8ab4b8', mapaMS: '#6a9aa0', tinta: '#3a2a20', estera: '#c8a868', esteraS: '#a08048', esteraL: '#dcc088',
  vidrio: '#b8d0d0', vidrioS: '#8aa8b0', plomo: '#4a4e58', piedra: '#a8a090', piedraS: '#7a7468', piedraL: '#c8c0ac', piedraD: '#545048',
  revoque: '#ece0c4', revoqueS: '#cdbf9c', entramado: '#3a2a20', teja: '#9a4a32', tejaS: '#6e3222', tejaL: '#b8624a', pizarra: '#5a6070', pizarraL: '#7a8090',
  hierba: '#6a9a4a', hierbaS: '#4a7a3a', hierbaL: '#8ab85a', hierbaD: '#2e5a2e', creta: '#f2f0e4', cretaS: '#c8c8bc', cretaD: '#9a9a90',
  cieloA: '#5aa0d8', cieloB: '#7ab8e4', cieloC: '#a4d0ec', cieloD: '#d8e8ec', nubeL: '#ffffff', nube: '#e4eef4', nubeS: '#b4c8d8', nubeD: '#8ea8c0',
  aguaA: '#3a7a8a', aguaB: '#2e6474', aguaC: '#24505e', aguaL: '#7ab0b8', aguaD: '#1a3e4a', cuerda: '#4a3a2a', cuerdaL: '#8a6a44',
  dorado: '#c89a3a', doradoL: '#f0d070', ventana: '#f0c860', pintV: '#3a6a4a', pintB: '#e8e0c8', lonaL: '#fbf4e2', lonaD: '#a89878',
  piel: '#e8b890', pielS: '#c08a64', lana: '#e8e4d8', lanaS: '#b8b2a4', fuego: '#ff9a30', fuegoL: '#ffe080', humo: '#9a9a9a', humoL: '#c8c8c8',
});

const a_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral de la trama ordenada 4 × 4 en (x, y), de 0 a 1
const a_bay = (x, y) => (a_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const a_lim = (u) => Math.max(0, Math.min(1, u));

const a_suave = (u) => { u = a_lim(u); return u * u * (3 - 2 * u); };

// mezcla de dos colores (k = 0: el primero; 1: el segundo)
function a_mezcla(c, d, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((c >>> s) & 255) * (1 - k) + ((d >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// tiñe el píxel que ya hay hacia el color c (respeta el recorte)
function a_tine(R, x, y, c, k) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, a_mezcla(R.pget(x, y), c, k)); }

// las capas fijas: un búfer de R.nuevo() por clave y por lienzo, pintado una sola vez
const a_CAPAS = new WeakMap();

function a_capa(R, clave, dibuja) {
  let m = a_CAPAS.get(R); if (!m) { m = new Map(); a_CAPAS.set(R, m); }
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  return b;
}

// degradado tramado vertical entre los colores de cols (de y0 a y1), sin franjas: la trama 4 × 4 funde cada paso
function a_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), fr = f - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, a_bay(x, y) < fr ? cols[i + 1] : cols[i]); }
}

// una nube de cúmulo de tres tonos: bultos redondos con la luz arriba a la izquierda, la panza en sombra y la base plana
// (y la base; w el ancho; cols [luz, medio, sombra, base])
function a_cumulo(R, x, y, w, k, cols, m = null) {
  const n = Math.max(2, Math.round(w / 9)), paso = w / n;
  for (let i = 0; i < n; i++) { const cx = x + paso * (i + 0.5), r = paso * (0.62 + h(k, i, 901) * 0.5) * (i === 0 || i === n - 1 ? 0.8 : 1.1), cy = y - r * 0.55;
    for (let j = Math.floor(-r); j <= r; j++) { const py = Math.round(cy + j); if (py > y) continue;
      for (let ii = Math.floor(-r); ii <= r; ii++) { if (ii * ii + j * j > r * r) continue; const px = Math.round(cx + ii); if (m && (px < 0 || px > 319 || py < 0 || !m[py * 320 + px])) continue;
        const luz = -ii * 0.5 - j, f = luz / r + (a_bay(px, py) - 0.5) * 0.5;
        R.pset(px, py, py >= y - 1 ? cols[3] : f > 0.55 ? cols[0] : f > -0.25 ? cols[1] : cols[2]); } } }
}

// un pájaro (gaviota) de cinco píxeles que bate las alas
function a_gaviota(R, x, y, t, k, c = a_C.nubeL, cS = a_C.plomo) {
  x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 8 + k * 2.1);
  R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x - 1, y + (a > 0 ? -1 : 0), cS); R.pset(x + 2, y + (a > 0 ? -1 : 0), cS); R.pset(x - 2, y + (a > 0 ? -2 : 1), cS); R.pset(x + 3, y + (a > 0 ? -2 : 1), cS);
}

// humo en bolas que suben y se deshacen, empujado por el viento (vx)
function a_humo(R, x, y, t, k, alto = 40, vx = 0.4, cols = [a_C.humoL, a_C.humo]) {
  for (let i = 0; i < 9; i++) { const u = ((t * 0.18 + i / 9 + h(k, i, 903) * 0.05) % 1), yy = y - u * alto, xx = x + u * alto * vx + Math.sin(u * 7 + k + i) * 2, r = 1 + u * 3.2;
    for (let j = -Math.ceil(r); j <= r; j++) for (let ii = -Math.ceil(r); ii <= r; ii++) if (ii * ii + j * j <= r * r && a_bay(Math.round(xx) + ii, Math.round(yy) + j) > u * 0.85) R.pset(Math.round(xx) + ii, Math.round(yy) + j, j < -r * 0.3 ? cols[0] : cols[1]); }
}

// una llama de vela de 2 × 4 que tiembla
function a_llama(R, x, y, t, k) {
  const v = Math.sin(t * 13 + k * 3) + Math.sin(t * 7.3 + k), dx = v > 1 ? 1 : v < -1.2 ? -1 : 0;
  R.pset(x, y - 1, a_C.llamaR); R.pset(x, y - 2, a_C.llama); R.pset(x + dx, y - 3, a_C.llamaL); if (v > -0.5) R.pset(x + dx, y - 4, a_C.llama);
}

// la bandera blanca con la cruz roja de San Jorge que ondea (x, y su esquina del asta; l × a; dir hacia dónde vuela)
function a_sanJorge(R, x, y, l, a, t, dir = 1, k = 0, tn = (c) => c) {
  const mc = Math.round(l * 0.4), ma = Math.floor(a / 2);
  for (let i = 0; i <= l; i++) { const onda = Math.sin(t * 6 - i * 0.5 + k) * (0.3 + i / l * 1.2), lum = Math.cos(t * 6 - i * 0.5 + k);
    for (let j = 0; j < a; j++) { const cruz = Math.abs(i - mc) < Math.max(1, l / 8) || (a > 3 ? Math.abs(j - ma) < a / 6 + 0.3 : j === ma);
      R.pset(x + dir * i, Math.round(y + j + onda), tn(cruz ? (lum < -0.5 ? hex('#9a2028') : C.sanJorge) : lum < -0.5 ? a_C.lanaS : lum > 0.5 ? a_C.lonaL : a_C.lana)); } }
}

// un gallardete largo y estrecho que ondea, rojo y blanco
function a_gallardete(R, x, y, l, t, dir, k, tn = (c) => c) {
  for (let i = 0; i <= l; i++) { const yy = Math.round(y + Math.sin(t * 7 - i * 0.6 + k) * (0.4 + i / l * 1.6)); R.pset(x + dir * i, yy, tn(i % 6 < 3 ? C.sanJorge : a_C.lonaL)); if (i < l * 0.4) R.pset(x + dir * i, yy + 1, tn(i % 6 < 3 ? hex('#9a2028') : a_C.lana)); }
}

// UN BARCO INGLÉS DE 1587 (canon): de costado, tres palos; x el centro, yw la flotación, s la escala (1 = 64 px de eslora).
// El casco pardo con la popa alta (castillo de popa con sus ventanas y el farol), el castillo de proa, la franja pintada
// en verde y blanco, las portas con sus cañoncitos (callados), las velas cuadradas de lona cruda con la cruz roja de San
// Jorge en la mayor y la latina de mesana; la bandera de San Jorge en el tope y gallardetes. o.dir (1: la proa a la
// derecha), o.velas 0–1 (0 aferradas en sus vergas; 1 hinchadas: las velas bajan de la verga al izarlas), o.desarbolado
// (sin masteleros ni velas, las vergas bajadas: retenido en puerto), o.k (semilla del vaivén), o.tn (tono: estación o
// luz), o.quieto (sin vaivén). Solo pset, linea y poligono: respeta R.recorte. Devuelve la cubierta { x, y } y la popa.
function a_barco(R, x, yw, s, t, o = {}) {
  const dir = o.dir ?? 1, k = o.k ?? 0, tn = o.tn ?? ((c) => c), vel = a_lim(o.velas ?? 1), des = !!o.desarbolado, mece = o.quieto ? 0 : 1;
  const giro = (Math.sin(t * 0.9 + k) * 0.025 + (o.giro ?? 0)) * mece, yb = yw + Math.sin(t * 1.1 + k * 2) * 0.7 * Math.max(0.6, s) * mece;
  const cg = Math.cos(giro), sg = Math.sin(giro);
  const P = (dx, dy) => [x + dir * (dx * cg - dy * sg) * s, yb + (dy * cg + dx * sg) * s];
  const pol = (pts, c) => R.poligono(pts.map(([a, b]) => P(a, b)), c);
  const lin = (a, b, c2, d, col) => { const p = P(a, b), q = P(c2, d); R.linea(p[0], p[1], q[0], q[1], col); };
  const pix = (a, b, col) => { const p = P(a, b); R.pset(Math.round(p[0]), Math.round(p[1]), col); };
  // el reflejo, que tiembla (o.sinReflejo: fuera del agua, como un barquito de juguete)
  if (!o.sinReflejo) for (let j = 1; j < 7 * s; j++) for (let dx = -28; dx <= 30; dx += 1 / s) { const p = P(dx, 0), px = Math.round(p[0] + Math.sin(t * 3 + j) * (j > 2 ? 1 : 0)); if ((px + j) % 2 === 0 && h(px >> 1, j, Math.floor(t * 4) + 7) > 0.3 + j * 0.06 / s) R.pset(px, Math.round(yb + j), tn(j < 3 * s ? C.cascoKS : a_C.aguaD)); }
  // los palos (trinquete, mayor y mesana) con sus cofas; desarbolado, solo los palos machos
  const palos = des ? [[17, -12, -34], [0, -12, -40], [-18, -16, -32]] : [[17, -12, -50], [0, -12, -62], [-18, -16, -44]];
  const jc = tn(a_C.cuerda), mad = tn(C.cascoKS), madL = tn(C.cascoKL);
  if (!des) { lin(0, -62, 32, -14, jc); lin(0, -62, -30, -20, jc); lin(17, -50, 40, -20, jc); lin(-18, -44, -31, -21, jc); }
  else { lin(0, -40, 30, -14, jc); lin(17, -34, 38, -19, jc); lin(0, -40, -28, -20, jc); }
  for (const [px, y0, y1] of palos) { lin(px, y0, px, y1, mad); if (s > 0.7) lin(px + 0.8 / s, y0, px + 0.8 / s, y1, madL);
    lin(px - 7, y0 + 1, px, y1 + 8, jc); lin(px + 7, y0 + 1, px, y1 + 8, jc); if (s > 0.6) lin(px - 4, y0, px, y1 + 8, jc);
    const cy = des ? y1 + 2 : y1 + 16; if (!des || px === 0) { lin(px - 2, cy, px + 2, cy, mad); lin(px - 2, cy - 1, px + 2, cy - 1, mad); } }
  lin(27, -14, 44, -24, mad);   // el bauprés
  // las velas: la verga, la vela que baja de ella según o.velas (hinchada por el viento) y la cruz roja en la mayor
  const vC = tn(C.lonaK), vS = tn(C.lonaKS), vL = tn(a_C.lonaL), vD = tn(a_C.lonaD), cz = tn(C.sanJorge), viento = Math.sin(t * 1.7 + k) * 0.6;
  const cuadra = (cx, ya, yz, w, cruz) => {
    lin(cx - w - 1, ya, cx + w + 1, ya, mad);
    if (des) return;
    if (vel < 0.12) { for (let i = -w; i <= w; i += 1 / s) { pix(cx + i, ya + 1, ((i * 2) | 0) % 2 ? vS : vC); if (s > 0.5) pix(cx + i, ya - 1, vD); } return; }
    const yb2 = ya + (yz - ya) * vel, b = (2.5 + viento * 0.5) * vel;
    pol([[cx - w, ya], [cx + w, ya], [cx + w + b * 0.4, (ya + yb2) / 2], [cx + w - 1, yb2], [cx - w + 1, yb2], [cx - w + b * 0.4, (ya + yb2) / 2]], (px, py) => {
      const q = (px - P(cx, 0)[0]) / (w * s) * dir, v = (py - P(0, ya)[1]) / ((yb2 - ya) * s + 0.01); return q > 0.6 ? vS : q < -0.72 ? vS : v < 0.1 ? vD : (q > -0.15 && q < 0.35 && v > 0.25 && v < 0.75) ? vL : vC; });
    if (s > 0.55) for (let i = -w + 3; i < w; i += 4) lin(cx + i, ya + 1, cx + i + 0.4, yb2 - 1, vS);
    // la cruz va pintada en la lona: se ve la parte que ya ha bajado (el palo vertical crece y el travesaño sale a la mitad)
    if (cruz) { const my = (ya + yz) / 2, ww = Math.max(1, Math.round(s * 1.4)); for (let j = -ww; j < ww; j++) { if (yb2 - 2 > ya + 2) lin(cx + j / s * 0.7, ya + 2, cx + j / s * 0.7, yb2 - 2, cz); if (yb2 > my + 2) lin(cx - w * 0.75, my + j / s * 0.7, cx + w * 0.75, my + j / s * 0.7, cz); } }
  };
  if (des) { lin(-9, -16, 9, -14, mad); lin(10, -14, 24, -14, mad); }   // las vergas bajadas, sobre la cubierta
  else { cuadra(0, -46, -20, 14, true); cuadra(0, -60, -48, 9, false); cuadra(17, -40, -20, 10, false); cuadra(17, -49, -42, 6, false);
    if (vel > 0.12) pol([[-32, -19], [-12, -44 + (1 - vel) * 22], [-15, -18]], (px, py) => (h(px, py, 905) > 0.93 ? vS : (px - P(-20, 0)[0]) * dir > 2 * s ? vS : vC));
    lin(-33, -18, -11, -45, mad); }
  // el casco: castillo de popa alto, combés bajo, castillo de proa; tracas, la franja pintada y la regala dorada
  const casco = [[-31, -21], [-19, -21], [-19, -13], [12, -11], [14, -16], [26, -16], [33, -13], [27, -4], [21, 0], [-24, 0], [-31, -8]];
  pol(casco, (px, py) => { const dy = (py - yb) / s, r = Math.round(-dy) % 3; return dy > -2.5 ? tn(hex('#2a1a10')) : r === 0 ? tn(C.cascoKS) : dy < -12 ? tn(C.cascoKL) : tn(C.cascoK); });
  for (let i = -24; i < 22; i += 1 / s) { const v = Math.floor((i + 40) / 3) % 2; pix(i, -7, tn(v ? a_C.pintV : a_C.pintB)); if (s > 0.8) pix(i, -6, tn(v ? a_C.pintV : a_C.pintB)); }
  lin(-31, -21, -19, -21, tn(a_C.dorado)); lin(14, -16, 26, -16, tn(a_C.dorado)); lin(-19, -13, 12, -11, tn(C.cascoKL));
  if (s > 0.45) { for (const gx of [-12, -4, 4]) { pix(gx, -10, tn(hex('#1a100a'))); if (s > 0.8) { pix(gx + 1, -10, tn(hex('#1a100a'))); pix(gx + 1.6, -10, tn(a_C.plomo)); } }
    for (let i = -29; i < -20; i += 3) { pix(i, -17, tn(a_C.ventana)); if (s > 0.8) pix(i, -16, tn(a_C.ventana)); } }
  // el farol de popa, encendido, y la bandera de San Jorge en el tope del mayor; gallardetes en el trinquete y la mesana
  { const p = P(-32, -24); R.pset(Math.round(p[0]), Math.round(p[1]), tn(a_C.dorado)); R.pset(Math.round(p[0]), Math.round(p[1]) + 1, tn(a_C.llama)); if (s > 0.7) R.pset(Math.round(p[0]), Math.round(p[1]) - 1, tn(a_C.doradoL)); }
  const tope = P(0, palos[1][2]); a_sanJorge(R, Math.round(tope[0]), Math.round(tope[1]) - Math.max(2, Math.round(5 * s)), Math.max(3, Math.round(9 * s)), Math.max(2, Math.round(5 * s)), t, -dir, k, tn);
  if (!des) for (const pi of [0, 2]) { const q = P(palos[pi][0], palos[pi][2]); a_gallardete(R, Math.round(q[0]), Math.round(q[1]), Math.max(3, Math.round(10 * s)), t, -dir, k + pi, tn); }
  return { x: P(0, -12)[0], y: P(0, -12)[1], popa: P(-25, -21) };
}

// gente pequeña de fondo (8–11 px): gorro o cofia, cara, jubón o vestido, piernas que andan; o.dir, o.anda (velocidad
// de paso), o.carga ('saco' al hombro | 'cesto' | null), o.c (el color de la ropa), o.mujer (falda larga), o.casco
// (soldado de fondo: morrión y nada en las manos), o.s (1 normal; 0.8 más lejos)
function a_gente(R, x, suelo, t, k, o = {}) {
  x = Math.round(x); const dir = o.dir ?? 1, paso = o.anda ? Math.floor(t * o.anda * 2 + k) % 2 : 0, c = o.c ?? [hex('#6a4a3a'), hex('#4a5a7a'), hex('#7a3a3a'), hex('#5a6a3a')][k % 4], cS = a_mezcla(c, C.k, 0.4);
  const alto = o.s === 0.8 ? 7 : 9, y0 = suelo - alto, bob = o.anda && paso ? 1 : 0, K = C.k;
  // las piernas o la falda
  if (o.mujer) { R.poligono([[x - 2, y0 + 4], [x + 2, y0 + 4], [x + 3, suelo], [x - 3, suelo]], c); R.pset(x - 1, suelo - 1, cS); R.pset(x + 2, suelo - 1, cS); }
  else { R.pset(x - 1, suelo - 1, K); R.pset(x + 1, suelo - 1, K); R.pset(x - 1 + (paso ? -1 : 0), suelo - 2, hex('#3a3040')); R.pset(x + 1 + (paso ? 1 : 0), suelo - 2, hex('#3a3040')); if (alto > 7) { R.pset(x - 1, suelo - 3, hex('#3a3040')); R.pset(x + 1, suelo - 3, hex('#3a3040')); } }
  // el cuerpo
  const yc = y0 + 3 + bob; for (let j = 0; j < alto - 5; j++) for (let i = -2; i <= 2; i++) if (!o.mujer || j < 2) R.pset(x + i, yc + j, i === 2 * dir ? cS : c);
  // la cabeza: cara, pelo y gorro, cofia o casco
  const yh = y0 + bob; R.pset(x, yh + 1, a_C.piel); R.pset(x + dir, yh + 1, a_C.piel); R.pset(x, yh + 2, a_C.pielS); R.pset(x - dir, yh + 1, hex('#4a3020'));
  if (o.casco) { R.pset(x - 2, yh, a_C.plomo); for (let i = -1; i <= 1; i++) R.pset(x + i, yh - 1, hex('#a8b0b8')); R.pset(x + 2, yh, a_C.plomo); R.pset(x, yh - 2, hex('#c8d0d8')); }
  else if (o.mujer) { for (let i = -1; i <= 1; i++) R.pset(x + i, yh, a_C.lana); R.pset(x - dir, yh + 1, a_C.lana); }
  else { for (let i = -1; i <= 1; i++) R.pset(x + i, yh, hex('#2a2430')); R.pset(x - 2 * dir, yh, hex('#2a2430')); }
  // lo que carga
  if (o.carga === 'saco') { for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) R.pset(x - dir * (1 + i), yh + 1 + j - 1, j === 0 ? a_C.esteraL : a_C.estera); }
  if (o.carga === 'cesto') { R.pset(x + 2 * dir, yc + 1, a_C.esteraS); R.pset(x + 3 * dir, yc + 1, a_C.esteraS); R.pset(x + 2 * dir, yc + 2, a_C.estera); R.pset(x + 3 * dir, yc + 2, a_C.estera); }
}

// un cuarterón de roble en relieve: bisel con luz arriba a la izquierda y sombra abajo a la derecha, el campo y dos vetas;
// pliegues: tallado de «servilleta plegada» (linenfold), con sus pliegues verticales
function a_cuarteron(R, x0, y0, x1, y1, k = 0, pliegues = false, P = [a_C.roble, a_C.robleL, a_C.robleS, a_C.robleV]) {
  const [base, luz, sombra, veta] = P;
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (pliegues) { for (let x = x0 + 3; x < x1 - 2; x += 3) { R.rect(x, y0 + 3, x, y1 - 3, luz); R.rect(x + 1, y0 + 4, x + 1, y1 - 3, sombra); }
    for (let x = x0 + 2; x < x1 - 1; x++) { R.pset(x, y0 + 2 + (x % 3 === 1 ? 1 : 0), sombra); R.pset(x, y1 - 2 - (x % 3 === 1 ? 1 : 0), luz); } return; }
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 910) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 911 + i) > 0.08) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.09 + k * 1.7 + i * 2) * 1.5))), y, veta); }
}

// el globo terráqueo: la tierra en una rejilla de 1° (polígonos bastos de las costas, sin rótulos), hecha una vez
const a_COSTAS = [
  [[-168, 66], [-140, 70], [-110, 73], [-85, 70], [-80, 63], [-94, 58], [-90, 55], [-79, 52], [-77, 60], [-65, 60], [-56, 52], [-60, 47], [-66, 44], [-70, 42], [-74, 40.5], [-76, 37], [-75.5, 35.3], [-77, 34.5], [-81, 31], [-80, 26], [-81.5, 25.2], [-82.6, 27.5], [-84, 30], [-89, 30.3], [-94, 29.5], [-97.4, 27], [-97.5, 21.5], [-95, 18.5], [-91, 18.8], [-90.5, 21], [-87, 21.5], [-88, 16], [-84, 15], [-83.5, 10.5], [-79.5, 9.5], [-77.5, 8.5], [-80, 7.5], [-85.5, 10], [-92, 14.8], [-105, 20], [-109.5, 23], [-112, 29], [-114.5, 31], [-117, 32.5], [-121, 35], [-124.3, 40.5], [-124, 48], [-130, 55], [-140, 60], [-152, 59], [-162, 58], [-166, 62]],
  [[-77.5, 8.5], [-72, 11.8], [-63, 10.6], [-52, 5], [-50, 0], [-44, -2.5], [-35, -5.5], [-39, -14], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-62, -39], [-65, -42], [-68, -52], [-72, -50], [-74, -40], [-71.5, -30], [-70.5, -18], [-76, -14], [-81.2, -5], [-80, 1], [-78, 7]],
  [[-9.5, 36.5], [-9, 43], [-2, 43.5], [-1.5, 46.5], [-4.5, 48], [-1.5, 49], [2, 51], [5, 53.3], [8.5, 54], [8.2, 56.8], [10.5, 57.6], [12, 56], [11, 59], [5.5, 58.5], [5, 62], [14, 67.5], [25, 71], [40, 67], [60, 70], [80, 73], [110, 77], [140, 72], [180, 68], [180, 40], [140, 38], [122, 30], [110, 20], [106, 10], [100, 3], [95, 16], [88, 22], [80, 15], [77, 8], [72, 21], [67, 25], [57, 26], [50, 30], [48, 28], [56, 25], [59, 22], [52, 16], [45, 13], [43, 12], [51, 11.5], [40, -3], [40, -15], [35, -24], [32, -29], [20, -35], [18, -30], [12, -17], [13, -5], [9, 4], [0, 5.5], [-8, 4.5], [-13, 8], [-17, 14.5], [-17, 21], [-13, 27.5], [-10, 30], [-6, 35.8]],
  [[-5.7, 50], [1.4, 51.2], [1.7, 52.7], [0, 53.6], [-1.6, 55.6], [-2, 57.6], [-4, 58.6], [-5.6, 57.8], [-6.2, 56], [-4.9, 54.8], [-3, 53.8], [-4.6, 52.8], [-4.2, 51.6], [-5.5, 51.6]],
  [[-10, 51.6], [-6, 52.2], [-6, 54.2], [-7.6, 55.3], [-10, 54.2]],
  [[-45, 60], [-21, 70], [-18, 78], [-30, 83], [-60, 82], [-72, 77], [-55, 68]],
  [[-85, 21.8], [-80, 23], [-74.2, 20.2], [-77.6, 19.8], [-80, 21.5]], [[-74.4, 19.8], [-68.5, 18.6], [-69.3, 19.9], [-72.8, 19.9]], [[-24, 64], [-14, 65.5], [-15, 66.4], [-22, 66.4]],
];

const a_MARES = [[[-5.5, 36], [0, 37.5], [10, 37.4], [11.5, 33.5], [20, 30.8], [33, 31], [36, 36], [27, 37], [26, 40.5], [19, 40], [15.5, 38], [12.5, 44], [3, 43.3], [-1, 38]], [[33, 28], [43, 13], [44, 12.5], [35, 28]], [[28, 41], [41, 41.5], [41, 46], [30, 46.5]]];

let a_TIERRA = null;

function a_tierra() {
  if (a_TIERRA) return a_TIERRA;
  const dentro = (pol, x, y) => { let d = false; for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) { const [xi, yi] = pol[i], [xj, yj] = pol[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) d = !d; } return d; };
  const caja = (p) => p.reduce((b, [x, y]) => [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)], [999, 999, -999, -999]);
  const T = a_COSTAS.map((p) => [p, caja(p)]), M = a_MARES.map((p) => [p, caja(p)]), en = (L, x, y) => L.some(([p, b]) => x >= b[0] && x <= b[2] && y >= b[1] && y <= b[3] && dentro(p, x, y));
  a_TIERRA = new Uint8Array(360 * 180);
  for (let la = 0; la < 180; la++) for (let lo = 0; lo < 360; lo++) { const x = lo - 180 + 0.5, y = 89.5 - la; a_TIERRA[la * 360 + lo] = en(T, x, y) && !en(M, x, y) ? 1 : 0; }
  return a_TIERRA;
}

// de (lon, lat) a la pantalla de un globo en (cx, cy) de radio r, con el centro de la vista en (lon0, lat0); z < 0: detrás
function a_proy(cx, cy, r, lon0, lat0, lon, lat) {
  const D = Math.PI / 180, f = lat * D, d = (lon - lon0) * D, f0 = lat0 * D;
  const x = Math.cos(f) * Math.sin(d), y = Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(d), z = Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(d);
  return [cx + r * x, cy - r * y, z];
}

const a_RUTA = [[-4.2, 50.3], [-9, 44], [-15.5, 28.2], [-30, 20], [-61.5, 16.2], [-68, 21], [-73, 28], [-75.6, 35.8]];

const a_ISLAS = [-75.6, 35.8];

// el globo: océano de acuarela verdosa, tierras de pergamino con su costa en tinta, meridianos y paralelos cada 30°, el
// ecuador doble, la luz de arriba a la izquierda con su brillo y el borde en sombra; o.ruta 0–1: la línea de puntos de
// Plymouth a las islas largas, con un barquito en la cabeza; o.islas: un puntito que late en las islas
function a_globo(R, cx, cy, r, lon0, lat0, t, o = {}) {
  const T = a_tierra(), D = 180 / Math.PI, f0 = lat0 / D, c0 = Math.cos(f0), s0 = Math.sin(f0), anchoL = 0.62 * D / r;
  const CS = [hex('#2e5a5e'), a_C.mapaMS, a_C.mapaM, hex('#a8ccc8')], CT = [hex('#9a8058'), a_C.mapaS, a_C.mapaP, hex('#f6ecc8')];
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    const X = (i + 0.5) / r, Y = -(j + 0.5) / r, q = X * X + Y * Y; if (q > 1) continue; const Z = Math.sqrt(1 - q);
    const lat = Math.asin(Y * c0 + Z * s0) * D; let lon = lon0 + Math.atan2(X, Z * c0 - Y * s0) * D; lon = ((lon + 180) % 360 + 360) % 360 - 180;
    const la = Math.min(179, Math.max(0, Math.floor(90 - lat))), lo = Math.min(359, Math.max(0, Math.floor(lon + 180))), tierra = T[la * 360 + lo];
    const luz = -X * 0.5 + Y * 0.55 + Z * 0.67, n = luz + (a_bay(cx + i, cy + j) - 0.5) * 0.22, nv = n > 0.8 ? 3 : n > 0.45 ? 2 : n > 0.12 ? 1 : 0;
    let c = (tierra ? CT : CS)[nv];
    // la costa: tierra junto al agua, en tinta
    if (tierra && (!T[la * 360 + (lo + 1) % 360] || !T[la * 360 + (lo + 359) % 360] || !T[Math.min(179, la + 1) * 360 + lo] || !T[Math.max(0, la - 1) * 360 + lo]) && r > 20) c = nv > 1 ? hex('#7a6040') : hex('#5a4430');
    const mer = Math.abs(((lon + 195) % 30) - 15) < anchoL / Math.max(0.2, Math.cos(lat / D)) * 0.5, par = Math.abs(((lat + 105) % 30) - 15) < anchoL * 0.5 || Math.abs(lat) < anchoL * 0.5;
    if ((mer || par) && (r > 20 || (i + j) % 2 === 0)) c = a_mezcla(c, hex('#5a3a20'), tierra ? 0.35 : 0.45);
    if (q > 0.86) c = a_mezcla(c, hex('#1a2a2a'), (q - 0.86) * 3);
    const bx = X + 0.36, by = Y - 0.44; if (bx * bx + by * by < 0.012 + (r > 20 ? 0 : 0.01)) c = a_mezcla(c, C.blanco, 0.6);
    R.pset(cx + i, cy + j, c);
  }
  // la ruta: puntos que avanzan de Plymouth a las islas, y el barquito
  const ruta = a_lim(o.ruta ?? 0);
  if (ruta > 0) { const pts = []; for (let s = 0; s < a_RUTA.length - 1; s++) for (let u = 0; u < 1; u += 0.04) { const [a1, b1] = a_RUTA[s], [a2, b2] = a_RUTA[s + 1]; pts.push([a1 + (a2 - a1) * u, b1 + (b2 - b1) * u]); }
    pts.push(a_RUTA[a_RUTA.length - 1]); const n = Math.max(1, Math.round(ruta * (pts.length - 1)));
    let ux = -99, uy = -99; for (let k = 0; k <= n; k++) { const [px, py, z] = a_proy(cx, cy, r, lon0, lat0, pts[k][0], pts[k][1]); if (z <= 0.05 || Math.hypot(px - ux, py - uy) < (r > 30 ? 4 : 2)) continue; ux = px; uy = py;
      R.pset(Math.round(px), Math.round(py), hex('#b02a2a')); if (r > 30) { R.pset(Math.round(px) + 1, Math.round(py), hex('#b02a2a')); R.pset(Math.round(px), Math.round(py) + 1, hex('#7a1a1a')); R.pset(Math.round(px) + 1, Math.round(py) + 1, hex('#7a1a1a')); } }
    const [hx, hy, hz] = a_proy(cx, cy, r, lon0, lat0, pts[n][0], pts[n][1]);
    if (hz > 0.05 && r > 30 && ruta < 1) { const bx = Math.round(hx), by = Math.round(hy) - 2 + Math.round(Math.sin(t * 4)); R.linea(bx - 3, by + 2, bx + 3, by + 2, C.cascoK); R.linea(bx - 2, by + 3, bx + 2, by + 3, C.cascoKS); R.linea(bx, by - 4, bx, by + 1, C.cascoKS); R.linea(bx - 2, by - 3, bx + 2, by - 3, C.lonaK); R.linea(bx - 2, by - 2, bx + 2, by - 2, C.lonaK); R.pset(bx, by - 2, C.sanJorge); } }
  const [ax, ay, az] = a_proy(cx, cy, r, lon0, lat0, a_ISLAS[0], a_ISLAS[1]);
  if ((o.islas || ruta >= 1) && az > 0.05) { const p = 0.5 + 0.5 * Math.sin(t * 5); R.anillo(Math.round(ax) + 0.5, Math.round(ay) + 0.5, 3 + p * 2, hex('#b02a2a')); }
  // si las islas quedan detrás, se dan en el borde del disco (siempre un número finito)
  const d = Math.hypot(ax - cx, ay - cy) || 1;
  return az > 0 ? [Math.round(ax), Math.round(ay)] : [Math.round(cx + (ax - cx) / d * r), Math.round(cy + (ay - cy) / d * r)];
}

// el centro de la vista del globo según las opciones: o.globo 0–1 lo gira de Europa (0) a América (1); con o.ruta y sin
// o.globo, fijo en −40 (Inglaterra y la costa de Carolina a la vista); si no, gira despacio y vuelve
const a_lonGlobo = (t, o) => (o.globo != null ? 5 - 80 * a_lim(o.globo) : o.ruta != null ? -40 : -40 + 34 * Math.sin(t * 0.32));

// lo fijo del estudio: el techo de vigas, el friso de yeso (liso en la esquina de Atom), la cornisa, los paneles de
// roble con su fila de servilletas plegadas, el ventanal con su marco de piedra, el tapiz de verdura, el aparador, el
// cuadro del barco, los apliques, el suelo de tablas y la estera de juncos, y la luz del ventanal en el suelo
function a_raleighFijo(R) {
  const { rect, pset, linea, poligono } = R, K = C.k;
  // techo de yeso con vigas de roble (poco contraste: debajo pasa la barra del año)
  a_degradado(R, 0, 0, 319, 11, [a_C.yesoS, a_C.yeso]);
  for (let x = 6; x < 320; x += 44) { rect(x, 0, x + 7, 9, a_mezcla(a_C.viga, a_C.yeso, 0.45)); rect(x, 0, x + 1, 9, a_mezcla(a_C.robleM, a_C.yeso, 0.45)); rect(x + 6, 0, x + 7, 9, a_mezcla(a_C.vigaS, a_C.yeso, 0.4)); }
  rect(0, 9, 319, 11, a_C.viga); rect(0, 9, 319, 9, a_C.robleM); rect(0, 11, 319, 11, a_C.vigaS);
  // el friso de yeso con su labor de cintas (strapwork) en relieve suave; liso en la esquina de Atom
  a_degradado(R, 0, 12, 319, 41, [a_C.yesoL, a_C.yeso, a_C.yeso]);
  for (let y = 12; y < 42; y++) for (let x = 0; x < 320; x++) if (h(x >> 1, y >> 1, 912) > 0.9) pset(x, y, a_C.yesoS);
  for (let c = 0; c < 7; c++) { const mx = 20 + c * 40; if (mx > 250) break;
    for (let a = 0; a < Math.PI * 2; a += 0.04) { const rr = 7 + 3 * Math.cos(a * 4); const px = Math.round(mx + Math.cos(a) * rr), py = Math.round(27 + Math.sin(a) * rr * 0.9); pset(px, py, a_C.yesoS); pset(px - 1, py - 1, a_C.yesoL); }
    pset(mx, 27, a_C.yesoS); rect(mx + 12, 26, mx + 27, 26, a_C.yesoS); rect(mx + 12, 25, mx + 27, 25, a_C.yesoL); }
  // la cornisa de roble con dentículos
  rect(0, 42, 319, 47, a_C.robleD); rect(0, 42, 319, 42, a_C.robleL); rect(0, 43, 319, 44, a_C.roble); for (let x = 0; x < 320; x += 4) rect(x, 45, x + 2, 46, a_C.robleM); rect(0, 47, 319, 47, a_C.robleD);
  // los paneles de roble: dos filas de cuarterones, la moldura y la fila baja de servilletas plegadas
  rect(0, 48, 319, 139, a_C.robleS);
  for (let c = 0; c < 15; c++) { const x0 = -4 + c * 23, x1 = x0 + 21; rect(x0 - 1, 48, x0, 139, a_C.robleD);
    a_cuarteron(R, x0 + 2, 51, x1, 75, c); a_cuarteron(R, x0 + 2, 79, x1, 102, c + 20); a_cuarteron(R, x0 + 2, 109, x1, 135, c + 40, true, [a_C.robleM, a_C.robleL, a_C.robleS, a_C.robleV]); }
  rect(0, 76, 319, 77, a_C.robleS); rect(0, 103, 319, 107, a_C.robleD); rect(0, 103, 319, 103, a_C.robleL); rect(0, 104, 319, 105, a_C.roble);
  rect(0, 136, 319, 141, a_C.robleD); rect(0, 136, 319, 136, a_C.robleL); rect(0, 137, 319, 138, a_C.robleS);
  // el ventanal de piedra (la vista va aparte), con el alféizar hondo y el asiento
  rect(9, 24, 91, 130, a_C.piedraD); rect(10, 25, 90, 129, a_C.piedra); rect(10, 25, 90, 26, a_C.piedraL); rect(10, 25, 11, 129, a_C.piedraL); rect(89, 25, 90, 129, a_C.piedraS);
  for (let y = 30; y < 128; y += 9) { rect(10, y, 13, y, a_C.piedraS); rect(86, y + 4, 90, y + 4, a_C.piedraS); }
  rect(6, 126, 94, 133, a_C.piedraD); rect(7, 126, 93, 128, a_C.piedraL); rect(7, 129, 93, 132, a_C.piedra); rect(7, 133, 93, 133, a_C.piedraS);
  rect(14, 28, 86, 123, hex('#203040'));
  // el tapiz de verdura: la barra, la cenefa con su labor y el campo de árboles, flores y un ciervo (todo tejido)
  rect(98, 48, 222, 49, a_C.latonS); rect(98, 48, 222, 48, a_C.laton); a_punto(R, 98, 49, a_C.latonL); a_punto(R, 222, 49, a_C.latonL);
  rect(101, 50, 219, 118, a_C.tapizS); rect(102, 51, 218, 117, a_C.tapizR);
  for (let x = 103; x < 218; x += 4) { pset(x, 52, a_C.tapizO); pset(x + 2, 116, a_C.tapizO); pset(x + 1, 53, a_C.tapizB); }
  for (let y = 54; y < 116; y += 4) { pset(103, y, a_C.tapizO); pset(217, y + 2, a_C.tapizO); pset(104, y + 1, a_C.tapizB); }
  for (let y = 56; y <= 112; y++) for (let x = 107; x <= 213; x++) { const f = (y - 56) / 56, n = h(x >> 1, y, 913);
    pset(x, y, (y + x) % 2 === 0 && n > 0.5 ? a_C.tapizS : f > 0.75 ? (n > 0.6 ? a_C.tapizH : a_C.tapizL) : f < 0.2 ? (n > 0.7 ? a_C.tapizL : a_C.tapiz) : a_C.tapiz); }
  for (const [tx, ty, tr] of [[122, 76, 12], [160, 70, 15], [200, 78, 11]]) {   // los árboles de copa redonda, con su tronco
    rect(tx - 1, ty + tr - 2, tx + 1, 104, a_C.robleS); rect(tx - 1, ty + tr - 2, tx - 1, 104, a_C.robleM);
    for (let j = -tr; j <= tr; j++) for (let i = -tr; i <= tr; i++) { if (i * i + j * j > tr * tr) continue; const lz = -i - j; pset(tx + i, ty + j, h(tx + i, ty + j, 914) > 0.85 ? a_C.tapizO : lz > tr * 0.5 ? a_C.tapizH : lz > -tr * 0.4 ? a_C.tapizL : a_C.tapizS); } }
  for (let k = 0; k < 60; k++) { const fx = 108 + Math.round(h(k, 1, 915) * 104), fy = 96 + Math.round(h(k, 2, 915) * 15); pset(fx, fy, [a_C.tapizR, a_C.tapizB, a_C.tapizO][k % 3]); }
  { const cx = 178, cy = 100; rect(cx - 6, cy - 2, cx + 3, cy + 1, a_C.tapizO); rect(cx - 6, cy + 2, cx - 6, cy + 6, a_C.robleS); rect(cx - 4, cy + 2, cx - 4, cy + 6, a_C.robleS); rect(cx + 1, cy + 2, cx + 1, cy + 6, a_C.robleS); rect(cx + 3, cy + 2, cx + 3, cy + 6, a_C.robleS);
    rect(cx + 3, cy - 5, cx + 5, cy - 2, a_C.tapizO); pset(cx + 6, cy - 4, a_C.tapizO); pset(cx + 3, cy - 7, a_C.robleS); pset(cx + 2, cy - 8, a_C.robleS); pset(cx + 5, cy - 7, a_C.robleS); pset(cx + 6, cy - 8, a_C.robleS); pset(cx - 3, cy - 2, a_C.tapizB); pset(cx - 1, cy - 1, a_C.tapizB); }
  for (let x = 102; x <= 218; x += 3) pset(x, 118, a_C.tapizO);   // los flecos
  // el cuadro del barco (por debajo de la esquina de Atom), con su marco dorado
  rect(232, 54, 274, 84, K); rect(233, 55, 273, 83, a_C.dorado); rect(233, 55, 273, 55, a_C.doradoL); rect(235, 57, 271, 81, a_C.latonS);
  a_degradado(R, 236, 58, 270, 72, [hex('#8ab0c0'), hex('#c8d4c8')]); a_degradado(R, 236, 73, 270, 80, [hex('#3a6070'), hex('#2a4a58')]);
  R.recorte([236, 58, 270, 80]); a_barco(R, 253, 78, 0.3, 1.3, { quieto: true, k: 3 }); R.recorte(null);
  // el aparador (court cupboard): dos cuerpos con columnas abalaustradas, la plata y el peltre encima
  rect(258, 96, 314, 140, K); rect(259, 97, 313, 139, a_C.roble); rect(259, 97, 313, 98, a_C.robleL);
  a_cuarteron(R, 262, 101, 284, 116, 60); a_cuarteron(R, 288, 101, 310, 116, 61); rect(259, 118, 313, 121, a_C.robleD); rect(259, 118, 313, 118, a_C.robleL);
  for (const bx of [264, 308]) { rect(bx - 2, 122, bx + 2, 137, a_C.robleS); rect(bx - 3, 126, bx + 3, 130, a_C.robleM); rect(bx - 3, 126, bx - 3, 130, a_C.robleL); }
  rect(268, 124, 304, 137, a_C.robleD); for (let x = 270; x < 304; x += 6) rect(x, 126, x + 3, 135, a_C.robleS);
  rect(255, 92, 317, 96, K); rect(256, 92, 316, 94, a_C.robleL); rect(256, 95, 316, 95, a_C.robleS);
  // el escurreplatos de roble sobre el aparador, con dos platos de peltre apoyados en su barandilla, un jarro de plata y
  // una copa dorada
  rect(256, 70, 316, 91, a_C.robleD); rect(257, 71, 315, 90, a_C.robleS); rect(256, 70, 316, 71, a_C.robleM); rect(256, 70, 316, 70, a_C.robleL);
  for (const px of [267, 305]) { for (let j = -7; j <= 7; j++) for (let i = -6; i <= 6; i++) { const d = (i * i) / 36 + (j * j) / 49; if (d > 1) continue; pset(px + i, 82 + j, d > 0.7 ? hex('#7a808c') : d > 0.55 ? hex('#5a606c') : i + j < -3 ? hex('#c8ccd4') : hex('#9aa0ac')); } pset(px - 3, 77, C.blanco); pset(px - 2, 76, hex('#e0e4ec')); }
  rect(257, 86, 315, 87, a_C.robleM); rect(257, 86, 315, 86, a_C.robleL);
  rect(281, 79, 287, 91, K); rect(282, 80, 286, 91, hex('#b8bcc8')); rect(282, 80, 283, 91, hex('#e0e4ec')); rect(280, 78, 288, 79, K); rect(281, 78, 287, 78, hex('#d0d4dc')); rect(287, 82, 289, 87, hex('#8a909c')); pset(289, 83, K);
  rect(292, 86, 295, 91, hex('#c8a040')); rect(291, 84, 296, 86, hex('#f0d070')); pset(293, 91, hex('#8a6a20')); pset(292, 85, C.blanco);
  // los apliques de latón con su vela (la llama va aparte)
  for (const [ax, ay] of [[96, 70], [226, 70]]) { rect(ax - 2, ay - 6, ax + 2, ay + 4, a_C.latonS); rect(ax - 1, ay - 5, ax + 1, ay + 3, a_C.laton); pset(ax - 1, ay - 4, a_C.latonL); rect(ax - 3, ay + 4, ax + 3, ay + 5, a_C.laton); rect(ax - 1, ay - 2, ax + 1, ay + 3, a_C.vela); rect(ax - 1, ay - 2, ax - 1, ay + 3, C.blanco); }
  // el suelo de tablas de roble: hileras que se ensanchan hacia delante, las juntas a matajunta, vetas y algún nudo
  { const filas = [142, 145, 149, 154, 160, 167, 175, 184];
    for (let f = 0; f < filas.length - 1; f++) { const ya = filas[f], yb = filas[f + 1] - 1, L = 36 + f * 12, off = Math.round(h(f, 1, 916) * L);
      for (let n = -1; n * L - L + off < 320; n++) { const xa = n * L + off - L, xb = xa + L - 1, c = [a_C.robleM, a_C.roble, a_mezcla(a_C.roble, a_C.robleS, 0.4)][(n + f * 2 + 9) % 3];
        rect(Math.max(0, xa), ya, Math.min(319, xb), yb, c); rect(Math.max(0, xb), ya, Math.min(319, xb), yb, a_C.robleD);
        for (let y = ya + 1; y < yb; y += 2) for (let x = Math.max(0, xa); x < Math.min(319, xb); x++) if (h(x >> 2, y, 916 + n) > 0.72) pset(x, y, h(x, y, 917) > 0.5 ? a_C.robleV : a_C.robleS);
        if (h(n, f, 918) > 0.7 && yb - ya > 3) { const nx = xa + Math.round(L * 0.5), ny = (ya + yb) >> 1; pset(nx, ny, a_C.robleD); pset(nx - 1, ny, a_C.robleS); pset(nx + 1, ny, a_C.robleS); } }
      rect(0, ya, 319, ya, a_C.robleD); rect(0, ya + 1, 319, ya + 1, a_C.robleL); }
    for (let x = 0; x < 320; x++) { pset(x, 142, a_mezcla(R.pget(x, 142), K, 0.4)); pset(x, 143, a_mezcla(R.pget(x, 143), K, 0.25)); } }
  for (let y = 148; y < 180; y++) { const p = (y - 148) / 32, xa = Math.round(78 - p * 26), xb = Math.round(246 + p * 26);
    for (let x = xa; x <= xb; x++) { const borde = x - xa < 2 || xb - x < 2 || y === 148, tr = ((Math.floor(x / 3) + Math.floor(y / 2)) % 2), n = h(x, y, 917);
      pset(x, y, borde ? a_C.esteraS : n > 0.9 ? a_C.esteraS : tr ? (y % 2 ? a_C.estera : a_C.esteraL) : (x % 3 === 0 ? a_C.esteraS : a_C.estera)); } }
  // la luz del ventanal en el suelo, tramada, con la sombra de los parteluces
  for (let y = 142; y < 180; y++) { const d = (y - 142) * 1.1, xa = Math.round(22 + d), xb = Math.round(92 + d);
    for (let x = xa; x <= xb; x++) { const rel = (x - xa) / (xb - xa); if (Math.abs(rel - 0.34) < 0.03 || Math.abs(rel - 0.67) < 0.03) continue; if ((x + y) % 2 === 0 || (rel > 0.06 && rel < 0.94 && y > 146)) a_tine(R, x, y, hex('#fff0c8'), 0.22); } }
  // la sombra del aparador y del pie del globo en el suelo
  for (let y = 141; y < 147; y++) for (let x = 256; x < 318; x++) if ((x + y) % 2 === 0) a_tine(R, x, y, K, 0.35);
}

// un clavo redondo de dos píxeles de radio
const a_punto = (R, x, y, c) => R.disco(x, y, 1, c);

// la vista por el ventanal: el cielo con nubes que pasan, la otra orilla del Támesis con casas y una torre, el río con
// sus brillos, un barco (canon) y una barca de remos que cruzan despacio; y encima, los parteluces de piedra y el
// emplomado en rombos con el vidrio que tiñe un poco y un brillo que lo recorre
function a_ventanal(R, t) {
  const { rect, pset } = R, x0 = 14, y0 = 28, x1 = 86, y1 = 123;
  R.recorte([x0, y0, x1, y1]);
  a_degradado(R, x0, y0, x1, 92, [a_C.cieloA, a_C.cieloB, a_C.cieloC, a_C.cieloD]);
  for (let k = 0; k < 3; k++) { const x = ((h(k, 1, 920) * 140 + t * (1.2 + k * 0.9)) % 150) - 30, y = 44 + k * 12; a_cumulo(R, x0 + x, y, 22 - k * 4, k, [a_C.nubeL, a_C.nube, a_C.nubeS, a_C.nubeS]); }
  // la otra orilla: casas de tejados picudos, una torre con su chapitel corto y árboles
  for (let x = x0; x <= x1; x++) { const tejado = 84 + Math.round(Math.abs(((x * 7) % 12) - 6) * 0.8 + h(x >> 3, 1, 921) * 4), torre = x > 56 && x < 62;
    for (let y = torre ? 70 : tejado; y < 96; y++) pset(x, y, torre ? (x === 57 ? a_C.piedraL : a_C.piedraS) : y < tejado + 2 ? a_C.tejaS : (x + y) % 5 === 0 ? a_C.entramado : a_C.revoqueS); }
  for (let j = 0; j < 6; j++) for (let i = -j; i <= j; i++) pset(59 + i, 64 + j, a_C.pizarra);
  for (let x = x0; x <= x1; x += 9) for (let y = 89; y < 95; y += 3) pset(x + 3, y, a_C.ventana);
  a_degradado(R, x0, 96, x1, y1, [a_C.aguaA, a_C.aguaB, a_C.aguaC]);
  for (let k = 0; k < 18; k++) { const y = 98 + (k * 7) % 24, x = x0 + ((k * 23 + t * (3 + k % 3)) % 80); R.linea(x, y, x + 3 + k % 3, y, k % 3 ? a_C.aguaL : a_C.cieloD); }
  a_barco(R, x0 - 30 + ((t * 2.5) % 140), 112, 0.42, t, { k: 1 });
  { const bx = Math.round(x0 + 90 - ((t * 4 + 30) % 120)), by = 118; R.linea(bx - 5, by, bx + 5, by, C.cascoK); R.linea(bx - 5, by + 1, bx + 5, by + 1, C.cascoK); R.linea(bx - 4, by + 2, bx + 4, by + 2, C.cascoKS); pset(bx, by - 2, a_C.piel); pset(bx, by - 1, hex('#6a4a3a'));
    const r = Math.sin(t * 3) > 0 ? 1 : -1; R.linea(bx, by, bx - 4, by + 3 + r, a_C.cuerdaL); R.linea(bx, by, bx + 4, by + 3 - r, a_C.cuerdaL); }
  a_gaviota(R, x0 + ((t * 9) % 90), 50 + Math.sin(t) * 4, t, 1);
  R.recorte(null);
  // el vidrio: tiñe, el brillo diagonal que pasa, el emplomado en rombos
  const g = (t % 6) / 6 * 200 - 40;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = (x + y) % 9, b = (x - y + 900) % 9;
    if (a === 0 || b === 0) { pset(x, y, a_mezcla(R.pget(x, y), a_C.plomo, 0.55)); continue; } const brillo = Math.abs(x + y * 0.5 - 60 - g) < 4;
    pset(x, y, a_mezcla(R.pget(x, y), brillo ? C.blanco : a_C.vidrio, brillo ? 0.35 : (a + b) % 5 === 0 ? 0.24 : 0.12)); }
  // los parteluces y el travesaño de piedra
  for (const mx of [37, 62]) { rect(mx, y0, mx + 3, y1, a_C.piedra); rect(mx, y0, mx, y1, a_C.piedraL); rect(mx + 3, y0, mx + 3, y1, a_C.piedraS); }
  rect(x0, 64, x1, 67, a_C.piedra); rect(x0, 64, x1, 64, a_C.piedraL); rect(x0, 67, x1, 67, a_C.piedraS);
}

// el lebrel tumbado en el suelo (x, y: el centro del lomo; mira a la izquierda): respira, mueve la cola y a ratos la oreja
function a_lebrel(R, x, y, t) {
  const { pset, rect } = R, K = C.k, c = hex('#c8b49a'), cS = hex('#9a8670'), cL = hex('#e4d4bc'), resp = Math.sin(t * 2.2) > 0 ? 1 : 0, oreja = (t % 5.3) < 0.4;
  for (let i = -12; i <= 12; i++) { const alto = Math.round(4 + Math.cos(i / 12 * 1.4) * 2 + (Math.abs(i) < 6 ? resp * 0.6 : 0)); for (let j = 0; j < alto; j++) pset(x + i, y - j + 2, j === alto - 1 ? cL : j === 0 ? cS : c); pset(x + i, y + 3, K); }
  rect(x - 10, y + 3, x + 12, y + 3, cS); for (const lx of [-9, -5]) rect(x + lx - 6, y + 2, x + lx, y + 2, c);   // las patas de delante, estiradas
  rect(x - 15, y + 1, x - 10, y + 1, cS);
  // la cabeza fina y alargada, el ojo, la nariz y la oreja doblada
  rect(x - 19, y - 3, x - 12, y, c); rect(x - 23, y - 1, x - 19, y, c); pset(x - 24, y, K); pset(x - 17, y - 2, K); rect(x - 19, y - 3, x - 14, y - 3, cL);
  if (oreja) { pset(x - 13, y - 5, cS); pset(x - 13, y - 6, cS); } else { pset(x - 13, y - 4, cS); pset(x - 12, y - 4, cS); }
  // la cola, que barre el suelo
  const cola = Math.sin(t * (Math.sin(t * 0.3) > 0.6 ? 7 : 1.2)) * 2; R.linea(x + 12, y + 1, x + 18, y + 2 + Math.round(cola), cS); R.linea(x + 18, y + 2 + Math.round(cola), x + 22, y + Math.round(cola * 1.5), cS);
  for (let i = -14; i <= 14; i++) if (i % 2 === 0) a_tine(R, x + i, y + 4, K, 0.3);
}

// el papagayo en su percha (x, la barra de la percha en y): cabecea, se rasca y a ratos abre un ala
function a_papagayo(R, x, y, suelo, t) {
  const { pset, rect } = R, K = C.k, r = hex('#d03a2a'), rS = hex('#8a2418'), az = hex('#3a6ad0'), am = hex('#f0c040'), cab = Math.sin(t * 1.7) > 0.7 ? 1 : 0, ala = (t % 7) < 0.6;
  rect(x - 1, y + 1, x, suelo - 1, a_C.robleS); rect(x - 5, suelo - 1, x + 4, suelo, a_C.robleD); rect(x - 7, y, x + 7, y + 1, a_C.robleM); rect(x - 7, y, x + 7, y, a_C.robleL);
  rect(x - 7, y + 2, x - 5, y + 4, a_C.latonS); pset(x - 6, y + 2, a_C.laton);   // el comedero
  rect(x - 2, y - 9, x + 2, y - 1, r); rect(x + 2, y - 8, x + 2, y - 2, rS); rect(x - 1, y - 12 + cab, x + 2, y - 9 + cab, r); pset(x + 1, y - 11 + cab, C.blanco); pset(x + 1, y - 11 + cab, K);
  pset(x + 3, y - 10 + cab, am); pset(x + 3, y - 9 + cab, K); pset(x + 4, y - 9 + cab, K);
  if (ala) { rect(x - 6, y - 10, x - 3, y - 6, az); rect(x - 6, y - 7, x - 4, y - 5, am); } else { rect(x - 3, y - 8, x - 2, y - 3, az); pset(x - 3, y - 3, am); }
  R.linea(x - 1, y, x - 4, y + 7, az); R.linea(x, y, x - 2, y + 8, r); pset(x - 1, y, K); pset(x + 1, y, K);
}

// el globo de pie del estudio (cx, cy: el centro de la esfera; pies en el suelo): la esfera girando, el meridiano de
// latón, el horizonte de madera y el pie torneado de tres patas
function a_globoPie(R, cx, cy, suelo, t, o) {
  const { rect, pset, linea } = R, r = 12;
  for (let a = Math.PI; a < Math.PI * 2; a += 0.03) pset(Math.round(cx + Math.cos(a) * 18), Math.round(cy + 1 + Math.sin(a) * 3), a_C.robleS);
  const am = a_globo(R, cx, cy, r, a_lonGlobo(t, o), 18, t, o);
  for (let a = -Math.PI * 0.95; a < Math.PI * 0.95; a += 0.02) { const px = Math.round(cx + Math.sin(a) * 14), py = Math.round(cy - Math.cos(a) * 14); pset(px, py, a < -0.6 ? a_C.latonL : a_C.laton); if (a > 0.6) pset(px, py, a_C.latonS); }
  for (let a = 0; a < Math.PI; a += 0.02) { pset(Math.round(cx + Math.cos(a) * 18), Math.round(cy + 1 + Math.sin(a) * 3), a_C.robleM); pset(Math.round(cx + Math.cos(a) * 18), Math.round(cy + 2 + Math.sin(a) * 3), a_C.robleD); }
  pset(cx - 18, cy + 1, a_C.robleL); pset(cx + 18, cy + 1, a_C.robleD);
  linea(cx - 16, cy + 3, cx - 9, suelo, a_C.robleS); linea(cx + 16, cy + 3, cx + 9, suelo, a_C.robleD); linea(cx - 15, cy + 3, cx - 8, suelo, a_C.robleM);
  rect(cx - 1, cy + 14, cx + 1, suelo - 6, a_C.robleS); rect(cx - 3, cy + 20, cx + 3, cy + 23, a_C.robleM); rect(cx - 3, cy + 20, cx - 3, cy + 23, a_C.robleL); rect(cx - 2, suelo - 6, cx + 2, suelo - 2, a_C.robleM);
  rect(cx - 10, suelo - 1, cx + 10, suelo, a_C.robleD); rect(cx - 9, suelo - 2, cx + 9, suelo - 2, a_C.robleM);
  return am;
}

// RALEIGH, GENERAL: el estudio. Ventanal de la izquierda x 9–91, y 24–133 (asiento en y 126); tapiz x 101–219, y 50–118;
// aparador x 255–317, y 92–140; el globo de pie en (240, 118); suelo de tablas desde y 142; los pies en 160.
function a_raleigh(R, t, o) {
  const { pset } = R;
  R.copiar(a_capa(R, 'rk-raleigh', () => a_raleighFijo(R)));
  a_ventanal(R, t);
  // las velas de los apliques con su halo cálido que late
  for (const [ax, ay, k] of [[96, 68, 0], [226, 68, 1]]) { const r = 9 + Math.sin(t * 9 + k) * 0.8; for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j); if (d < r && d > 2 && a_bay(ax + i, ay + j) > d / r) a_tine(R, ax + i, ay + j - 3, a_C.llamaL, 0.16); } a_llama(R, ax, ay - 2, t, k); }
  // el reloj de arena del aparador, con la arena que cae
  { const x = 303, y = 84, u = (t % 20) / 20; R.rect(x - 3, y - 5, x + 3, y - 5, a_C.robleD); R.rect(x - 3, y + 6, x + 3, y + 6, a_C.robleD); R.rect(x - 3, y - 4, x - 3, y + 5, a_C.robleS); R.rect(x + 3, y - 4, x + 3, y + 5, a_C.robleS);
    for (let j = 0; j < 5; j++) { const w = 2 - Math.floor(j / 2); for (let i = -w; i <= w; i++) { pset(x + i, y - 4 + j, j >= Math.round(u * 5) ? a_C.esteraL : a_C.vidrio); pset(x + i, y + 5 - j, j < Math.round(u * 5) + 1 ? a_C.esteraL : a_C.vidrio); } }
    if (Math.floor(t * 8) % 2) pset(x, y + 1, a_C.esteraL); }
  // motas de polvo en la luz del ventanal
  for (let k = 0; k < 14; k++) { const fy = (h(k, 3, 922) * 60 + t * (1.5 + h(k, 4, 922) * 2)) % 60, x = Math.round(30 + fy * 0.9 + h(k, 5, 922) * 50 + Math.sin(t * 0.7 + k) * 2), y = Math.round(150 - fy * 1.6); if (Math.sin(t * 1.3 + k * 2) > -0.3) pset(x, y, hex('#fff4d8')); }
  a_papagayo(R, 102, 116, 160, t);
  a_lebrel(R, 50, 156, t);
  const america = a_globoPie(R, 240, 118, 160, t, o);
  return { suelo: 160, libre: [30, 250], mesa: [100, 150, 224, 158], globo: [240, 118], america, ventana: [9, 24, 91, 133], perro: [50, 156], tapiz: [101, 50, 219, 118], detrasMesa: [108, 216], sueloDetras: 154 };
}

// RALEIGH, DELANTE: la mesa grande de roble (tablero en y 150–158, faldón tallado y patas de bulbo hasta 178) con el mapa
// del Atlántico desplegado (sin rótulos: costas, rosa de los vientos y rumbos), el compás de puntas, el astrolabio de
// latón en pie, el tintero con la pluma que se mece y el candelabro de tres velas. Quien está detrás (x 108–216, pies en
// 160) asoma cabeza y hombros por encima del tablero.
function a_raleighMesa(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, x0 = 100, x1 = 224;
  // el tablero: el canto de atrás, la superficie con vetas y el canto de luz delante
  rect(x0, 150, x1, 159, K); rect(x0 + 1, 151, x1 - 1, 157, a_C.roble); for (let x = x0 + 2; x < x1 - 1; x++) if (h(x >> 2, 3, 923) > 0.6) pset(x, 152 + (x >> 3) % 4, a_C.robleV);
  rect(x0 + 1, 158, x1 - 1, 158, a_C.robleL); rect(x0 + 1, 151, x1 - 1, 151, a_C.robleS);
  // el mapa desplegado sobre el tablero: el mar en acuarela, las costas, la rosa y sus rumbos; las esquinas sujetas con pesos
  poligono([[122, 151], [204, 151], [206, 157], [120, 157]], (x, y) => (x < 140 ? (h(x, y, 924) > 0.75 ? a_C.mapaS : a_C.mapaP) : x > 186 ? (h(x, y, 924) > 0.8 ? a_C.mapaS : a_C.mapaP) : (x + y) % 3 === 0 ? a_C.mapaMS : a_C.mapaM));
  linea(139, 151, 136, 157, a_C.tinta); linea(187, 151, 190, 157, a_C.tinta); pset(160, 154, hex('#b02a2a')); linea(156, 154, 164, 154, a_C.tinta); linea(160, 152, 160, 156, a_C.tinta);
  for (const [a, b] of [[145, 152], [176, 156], [150, 156], [172, 152]]) linea(160, 154, a, b, a_C.mapaMS);
  for (const px of [168, 172, 175]) pset(px, 153, a_C.mapaP);   // las islas largas
  rect(121, 150, 123, 151, a_C.plomo); rect(203, 150, 205, 151, a_C.plomo);
  // el astrolabio de latón en su pie, a la izquierda
  { const ax = 110, ay = 140; R.anillo(ax + 0.5, ay + 0.5, 5, a_C.latonS); R.anillo(ax + 0.5, ay + 0.5, 4, a_C.laton); pset(ax - 3, ay - 3, a_C.latonL); const a = Math.sin(t * 0.8) * 0.6; linea(ax - Math.round(Math.cos(a) * 4), ay - Math.round(Math.sin(a) * 4), ax + Math.round(Math.cos(a) * 4), ay + Math.round(Math.sin(a) * 4), a_C.latonL);
    pset(ax, ay - 6, a_C.laton); rect(ax - 1, ay + 5, ax + 1, ay + 9, a_C.latonS); rect(ax - 4, ay + 9, ax + 4, ay + 10, a_C.laton); }
  // el compás de puntas abierto sobre el mapa
  linea(128, 156, 133, 152, a_C.plomo); linea(133, 152, 137, 156, a_C.plomo); pset(133, 151, a_C.latonL);
  // el tintero con la pluma (que se mece con la corriente) y el candelabro de tres velas, a la derecha
  { const tx = 209, ty = 151; rect(tx - 3, ty - 4, tx + 3, ty, K); rect(tx - 2, ty - 3, tx + 2, ty, hex('#2a2a3a')); pset(tx - 2, ty - 3, hex('#6a6a8a')); const m = Math.round(Math.sin(t * 1.3) * 1.5);
    linea(tx + 1, ty - 3, tx + 6 + m, ty - 15, C.blanco); linea(tx + 2, ty - 4, tx + 7 + m, ty - 14, hex('#d8d0c0')); pset(tx + 6 + m, ty - 15, hex('#d8d0c0')); }
  { const cx = 218, b = 150; rect(cx - 3, b - 1, cx + 3, b, a_C.latonS); rect(cx - 2, b - 2, cx + 2, b - 2, a_C.laton); rect(cx, b - 12, cx, b - 2, a_C.laton); rect(cx - 5, b - 13, cx + 5, b - 12, a_C.laton); pset(cx - 5, b - 13, a_C.latonL);
    for (const [vx, vh] of [[-5, 6], [0, 8], [5, 6]]) { rect(cx + vx - 1, b - 13 - vh, cx + vx, b - 14, a_C.vela); pset(cx + vx - 1, b - 13 - vh, C.blanco); a_llama(R, cx + vx, b - 13 - vh, t, vx); } }
  // el faldón tallado con gallones y las patas de bulbo (copa y tapa) con el travesaño de abajo
  rect(x0 + 2, 159, x1 - 2, 166, K); rect(x0 + 3, 159, x1 - 3, 165, a_C.robleM); for (let x = x0 + 4; x < x1 - 3; x += 4) { rect(x, 160, x + 1, 164, a_C.robleL); rect(x + 2, 160, x + 2, 164, a_C.robleS); } rect(x0 + 3, 165, x1 - 3, 165, a_C.robleS);
  for (const lx of [x0 + 8, 162, x1 - 8]) { rect(lx - 2, 166, lx + 2, 178, K); rect(lx - 1, 166, lx + 1, 178, a_C.roble); rect(lx - 4, 168, lx + 4, 173, K); rect(lx - 3, 168, lx + 3, 172, a_C.robleM); rect(lx - 3, 168, lx - 2, 172, a_C.robleL); rect(lx + 2, 169, lx + 3, 172, a_C.robleS); rect(lx - 3, 170, lx + 3, 170, a_C.robleS); }
  rect(x0 + 8, 176, x1 - 8, 178, K); rect(x0 + 8, 176, x1 - 8, 176, a_C.robleM);
  for (let x = x0 + 4; x < x1 - 2; x++) if (x % 2 === 0) a_tine(R, x, 179, K, 0.4);
  return { mesa: [x0, 150, x1, 158] };
}

// RALEIGH, CÁMARA 'globo': el globo de cerca (centro 160, 80; radio 50), con el meridiano de latón y el horizonte de
// madera; detrás, el fondo desenfocado (a_globoFondo: ventanal, aplique, librería) con su vida (a_globoVida: motas en el
// rayo de luz, una nube en los vidrios, la llama); debajo, la mesa con la carta portulana (costas, rosa y rumbos, sin
// rótulos), el reloj de arena que corre, monedas y lacre, dos barquitos de juguete, el compás, el tintero con la pluma y
// una vela
function a_globoCerca(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, cx = 160, cy = 80, r = 50;
  R.copiar(a_capa(R, 'rk-globo', () => {
    // los paneles de roble desenfocados (manchas suaves) y la luz del ventanal, arriba a la izquierda
    a_degradado(R, 0, 0, 319, 127, [a_C.robleS, a_C.roble, a_C.robleS, a_C.robleD]);
    for (let c = 0; c < 6; c++) { const x0 = -20 + c * 62; for (let y = 22; y < 122; y++) for (let x = x0 + 6; x < x0 + 56; x++) { const e = Math.min(x - x0 - 6, x0 + 56 - x, y - 22, 122 - y); if (e < 5 && a_bay(x, y) < 0.5) pset(x, y, e < 2 ? a_C.robleL : a_C.robleM); } }
    a_globoFondo(R);
    // la mesa: el canto de atrás y la carta portulana en perspectiva
    rect(0, 126, 319, 179, a_C.roble); rect(0, 126, 319, 127, a_C.robleD); for (let y = 128; y < 180; y += 3) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 925) > 0.7) pset(x, y, a_C.robleV);
    poligono([[26, 132], [294, 132], [318, 179], [2, 179]], (x, y) => { const n = h(x >> 1, y >> 1, 926); return n > 0.93 ? a_C.mapaS : a_C.mapaP; });
    // el mar de la carta en acuarela, con las costas de Europa a la derecha y de América a la izquierda
    for (let y = 134; y < 180; y++) { const p = (y - 132) / 47, xa = Math.round(26 - p * 24), xb = Math.round(294 + p * 24);
      for (let x = xa + 2; x < xb - 2; x++) { const u = (x - xa) / (xb - xa), costaI = 0.24 + Math.sin(y * 0.3) * 0.02 + (y > 160 ? 0.05 : 0), costaD = 0.8 - Math.sin(y * 0.22) * 0.03 - (y < 150 ? 0.04 : 0);
        if (u > costaI && u < costaD) pset(x, y, (x + y) % 4 === 0 ? a_C.mapaMS : a_C.mapaM); else if (Math.abs(u - costaI) < 0.006 || Math.abs(u - costaD) < 0.006) pset(x, y, a_C.tinta); } }
    // la rosa de los vientos y sus rumbos
    const rx = 120, ry = 162; for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; linea(rx, ry, rx + Math.cos(a) * 180, ry + Math.sin(a) * 60, k % 2 ? a_C.mapaMS : hex('#5a8a90')); }
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, l = k % 2 ? 6 : 11; poligono([[rx, ry], [rx + Math.cos(a - 0.3) * 3, ry + Math.sin(a - 0.3) * 2], [rx + Math.cos(a) * l, ry + Math.sin(a) * l * 0.6], [rx + Math.cos(a + 0.3) * 3, ry + Math.sin(a + 0.3) * 2]], k % 2 ? a_C.tinta : k === 6 ? hex('#b02a2a') : hex('#c8a040')); }
    R.disco(rx, ry, 2, a_C.mapaP); pset(rx, ry, a_C.tinta);
    for (let k = 0; k < 7; k++) pset(70 + k * 3, 150 + (k % 2), a_C.tinta);   // las islas largas en la carta
    // el compás de puntas
    linea(232, 172, 244, 156, a_C.plomo); linea(233, 172, 245, 156, hex('#8a909c')); linea(244, 156, 258, 172, a_C.plomo); linea(245, 156, 259, 172, hex('#8a909c')); R.disco(244, 155, 2, a_C.laton); pset(243, 154, a_C.latonL);
  }));
  a_globoVida(R, t);
  // el horizonte de madera por detrás de la esfera
  for (let a = Math.PI; a < Math.PI * 2; a += 0.01) for (let w = 0; w < 4; w++) pset(Math.round(cx + Math.cos(a) * (64 - w)), Math.round(cy + 2 + Math.sin(a) * (9 - w * 0.4)), w === 0 ? a_C.robleL : a_C.robleM);
  // la luz de la vela de la derecha, que tiembla sobre la mesa
  const fl = Math.sin(t * 9) * 0.04 + 0.2; for (let j = -24; j <= 24; j++) for (let i = -40; i <= 40; i++) { const d = Math.hypot(i / 40, j / 24); if (d < 1 && a_bay(286 + i, 140 + j) > d) a_tine(R, 286 + i, 140 + j, a_C.llamaL, fl); }
  const america = a_globo(R, cx, cy, r, a_lonGlobo(t, o), 18, t, { ...o, islas: true });
  // el meridiano de latón con sus grados y el horizonte por delante; las patas y el pie torneado sobre la mesa
  for (let a = -Math.PI * 0.97; a < Math.PI * 0.97; a += 0.006) { const px = Math.round(cx + Math.sin(a) * 53), py = Math.round(cy - Math.cos(a) * 53), px2 = Math.round(cx + Math.sin(a) * 55), py2 = Math.round(cy - Math.cos(a) * 55);
    pset(px, py, a < -1 ? a_C.latonL : a > 1.2 ? a_C.latonS : a_C.laton); pset(px2, py2, a > 1.2 ? a_C.latonS : a_C.laton); if (Math.round(a * 60) % 6 === 0) pset(Math.round(cx + Math.sin(a) * 54), Math.round(cy - Math.cos(a) * 54), a_C.latonS); }
  { const g = (t % 4) / 4 * Math.PI * 2 - Math.PI; if (Math.abs(g) < 2.8) pset(Math.round(cx + Math.sin(g) * 54), Math.round(cy - Math.cos(g) * 54), C.blanco); }
  for (let a = 0; a < Math.PI; a += 0.008) for (let w = 0; w < 5; w++) pset(Math.round(cx + Math.cos(a) * (64 - w)), Math.round(cy + 2 + Math.sin(a) * (9 - w * 0.4)), w === 0 ? a_C.robleD : w === 4 ? a_C.robleL : (Math.round(a * 50) % 5 === 0 ? a_C.robleS : a_C.robleM));
  for (const [a, b, c2, d] of [[100, 88, 112, 132], [220, 88, 208, 132]]) { linea(a, b, c2, d, a_C.robleD); linea(a + 1, b, c2 + 1, d, a_C.robleM); linea(a + 2, b, c2 + 2, d, a_C.robleS); }
  rect(156, 130, 164, 134, a_C.robleM); rect(156, 130, 157, 134, a_C.robleL); rect(150, 134, 170, 137, K); rect(151, 134, 169, 136, a_C.robleM); rect(151, 134, 169, 134, a_C.robleL);
  rect(104, 132, 216, 135, K); rect(105, 132, 215, 134, a_C.robleM); rect(105, 132, 215, 132, a_C.robleL);
  // los dos barquitos de juguete sobre la carta (se mecen un poco, como si alguien acabara de moverlos)
  a_barco(R, 64, 168, 0.42, t, { k: 2, quieto: false, giro: 0, sinReflejo: true });
  a_barco(R, 92, 176, 0.36, t + 1.7, { k: 5, sinReflejo: true });
  // el reloj de arena en la mesa, a la izquierda de la carta: la arena baja (una vuelta cada 24 s) con su hilo que cae;
  // y dos monedas y el lacre junto a él
  { const x = 13, yb = 150, u = (t % 24) / 24; R.rect(x - 6, yb - 1, x + 6, yb, a_C.robleS); R.rect(x - 6, yb - 20, x + 6, yb - 19, a_C.robleS); R.rect(x - 6, yb - 20, x + 6, yb - 20, a_C.robleL);
    for (const px of [x - 5, x + 5]) { R.rect(px, yb - 18, px, yb - 2, a_C.robleM); pset(px, yb - 10, a_C.robleL); }
    for (let j = 0; j < 8; j++) { const w = Math.max(0, 3 - Math.floor(j / 2.5)); for (let i = -w; i <= w; i++) { pset(x + i, yb - 18 + j, hex('#c8dce0')); pset(x + i, yb - 2 - j, hex('#c8dce0')); } }
    const arriba = Math.round((1 - u) * 6), abajo = Math.round(u * 6);
    for (let j = 0; j < arriba; j++) { const yy = yb - 11 - j, w = Math.max(0, 3 - Math.floor((7 - j) / 2.5)); for (let i = -w; i <= w; i++) pset(x + i, yy, i === -w ? a_C.esteraL : a_C.estera); }
    for (let j = 0; j < abajo; j++) { const yy = yb - 2 - j, w = Math.max(0, 3 - Math.floor(j / 2.5)); for (let i = -w; i <= w; i++) pset(x + i, yy, (i + j) % 3 === 0 ? a_C.esteraS : a_C.estera); }
    if (u < 0.97) for (let j = yb - 10; j < yb - 2 - abajo; j++) if ((j + Math.floor(t * 12)) % 2) pset(x, j, a_C.esteraL);
    pset(x - 2, yb - 17, C.blanco); pset(x - 2, yb - 4, C.blanco);
    R.disco(30, 156, 2, a_C.laton); pset(29, 155, a_C.latonL); R.disco(26, 160, 2, a_C.latonS); pset(25, 159, a_C.laton);
    R.rect(8, 164, 18, 166, hex('#9a2a2a')); R.rect(8, 164, 18, 164, hex('#c84a40')); R.disco(20, 167, 2, hex('#8a2028')); }
  // el tintero con la pluma y la vela en su palmatoria
  { const tx = 268, ty = 160; rect(tx - 6, ty - 8, tx + 6, ty, K); rect(tx - 5, ty - 7, tx + 5, ty, hex('#2a2a3a')); rect(tx - 5, ty - 7, tx - 4, ty, hex('#5a5a7a')); rect(tx - 7, ty, tx + 7, ty + 2, a_C.latonS); const m = Math.round(Math.sin(t * 1.4) * 2);
    for (let k = 0; k < 22; k++) { const u = k / 22, px = Math.round(tx + 2 + u * (14 + m)), py = Math.round(ty - 7 - u * 30); pset(px, py, C.blanco); if (u > 0.3) { pset(px + 1, py, hex('#e8e0d0')); pset(px - 1, py + 1, hex('#d0c8b8')); if (u > 0.5) pset(px + 2, py + 1, hex('#c8c0b0')); } } }
  { const vx = 296, vy = 138; rect(vx - 7, vy + 12, vx + 7, vy + 14, a_C.latonS); rect(vx - 6, vy + 11, vx + 6, vy + 11, a_C.laton); rect(vx - 2, vy - 6, vx + 2, vy + 10, a_C.vela); rect(vx - 2, vy - 6, vx - 2, vy + 10, C.blanco); rect(vx + 2, vy - 5, vx + 2, vy + 10, hex('#d8ccb0'));
    pset(vx, vy - 7, K); const v = Math.sin(t * 11) > 0.3 ? 1 : 0; R.rect(vx - 1, vy - 11, vx + 1, vy - 8, a_C.llama); pset(vx, vy - 12 - v, a_C.llamaL); pset(vx, vy - 9, a_C.llamaL); pset(vx, vy - 8, hex('#6a8ad0')); }
  return { suelo: 180, libre: [0, 0], globo: [cx, cy, r], america };
}
// una casa de entramado (x el borde izquierdo, yb la base, w × a la fachada): el revoque claro con las vigas negras,
// una riostra en diagonal, el piso de arriba que vuela, ventanas emplomadas, el tejado a dos aguas de teja o de paja y
// la chimenea; tn: tono de la estación
function a_casa(R, x, yb, w, a, k, tn = (c) => c) {
  const { rect, pset, poligono } = R, paja = h(k, 1, 930) > 0.72, alto = Math.round(w * 0.55), y0 = yb - a;
  rect(x, y0, x + w, yb, tn(a_C.revoque)); rect(x + w - 1, y0, x + w, yb, tn(a_C.revoqueS));
  for (let px = x; px <= x + w; px += 4) rect(px, y0, px, yb, tn(a_C.entramado));
  rect(x, y0, x + w, y0, tn(a_C.entramado)); rect(x - 1, y0 + Math.round(a * 0.5), x + w + 1, y0 + Math.round(a * 0.5), tn(a_C.entramado)); rect(x, yb, x + w, yb, tn(a_C.entramado));
  if (w > 9) R.linea(x + 1, yb - 1, x + 4, y0 + Math.round(a * 0.5) + 1, tn(a_C.entramado));
  for (let px = x + 2; px < x + w - 2; px += 5) { const wy = y0 + 2; rect(px, wy, px + 2, wy + 2, tn(a_C.vidrioS)); pset(px, wy, tn(a_C.vidrio)); if (a > 10) { rect(px + 1, yb - 4, px + 2, yb - 2, tn(a_C.vidrioS)); } }
  if (h(k, 2, 930) > 0.4) { const dx = x + 2 + Math.round(h(k, 3, 930) * (w - 6)); rect(dx, yb - 4, dx + 2, yb, tn(hex('#4a3020'))); }
  const cr = paja ? [C.junco, C.juncoS, hex('#e0c880')] : [a_C.teja, a_C.tejaS, a_C.tejaL];
  poligono([[x - 2, y0 + 1], [x + w / 2, y0 - alto], [x + w + 2, y0 + 1]], (px, py) => tn((px + py * 2) % 4 === 0 ? cr[1] : px < x + w / 2 ? cr[2] : cr[0]));
  R.linea(x - 2, y0 + 1, x + w / 2, y0 - alto, tn(cr[1])); R.linea(x + w / 2, y0 - alto, x + w + 2, y0 + 1, tn(cr[1]));
  if (h(k, 4, 930) > 0.3) { const cx = x + Math.round(w * (h(k, 5, 930) > 0.5 ? 0.75 : 0.25)); rect(cx, y0 - alto + 1, cx + 2, y0 - 1, tn(a_C.piedraS)); rect(cx, y0 - alto + 1, cx, y0 - 1, tn(a_C.piedra)); rect(cx - 1, y0 - alto, cx + 3, y0 - alto, tn(a_C.piedraD)); return [cx + 1, y0 - alto - 1]; }
  return null;
}

// el agua del puerto: bandas tramadas de claro (lejos) a oscuro (cerca)
function a_aguaFija(R, x0, y0, x1, y1) {
  a_degradado(R, x0, y0, x1, y1, [a_C.aguaL, a_C.aguaA, a_C.aguaB, a_C.aguaC]);
  for (let k = 0; k < 120; k++) { const y = y0 + Math.round(h(k, 1, 931) ** 1.5 * (y1 - y0)), x = x0 + Math.round(h(k, 2, 931) * (x1 - x0)), l = 2 + Math.round((y - y0) / (y1 - y0) * 8); R.linea(x, y, Math.min(x1, x + l), y, (y - y0) / (y1 - y0) > 0.5 ? a_C.aguaB : a_C.aguaA); }
}

// el agua que se mueve: rayas de brillo que corren y ondas que suben y bajan (x0–x1, y0–y1; mas: cuántas)
function a_aguaVida(R, t, x0, y0, x1, y1, mas = 40) {
  for (let k = 0; k < mas; k++) { const f = h(k, 3, 932), y = Math.round(y0 + f ** 1.3 * (y1 - y0)), l = 2 + Math.round(f * 7), x = x0 + ((h(k, 4, 932) * (x1 - x0) + t * (2 + f * 6) * (k % 2 ? 1 : -0.6)) % (x1 - x0) + (x1 - x0)) % (x1 - x0);
    if (Math.sin(t * 2 + k) > -0.3) R.linea(Math.round(x), y, Math.round(Math.min(x1, x + l)), y, Math.sin(t * 3 + k * 1.7) > 0.4 ? C.blanco : a_C.aguaL); }
}

// la pinaza (bote grande de remo, con un palo y la vela aferrada) de costado: x el centro, yw la flotación, s la escala
// (1 = 48 px); cabecea. Devuelve la regala { x0, x1, y } (de popa a proa)
function a_pinaza(R, x, yw, s, t, o = {}) {
  // o.soloCasco: solo el costado (para pintarlo otra vez por delante de quien va dentro); o.marinero: uno pequeño a bordo; o.vela 0–1: la vela largada (0 aferrada en la verga)
  const dir = o.dir ?? 1, k = o.k ?? 0, giro = Math.sin(t * 1.3 + k) * 0.04, yb = yw + Math.sin(t * 1.6 + k) * 1.2;
  const P = (dx, dy) => [x + dir * (dx * Math.cos(giro) - dy * Math.sin(giro)) * s, yb + (dy * Math.cos(giro) + dx * Math.sin(giro)) * s];
  const pol = (pts, c) => R.poligono(pts.map(([a, b]) => P(a, b)), c), lin = (a, b, c2, d, col) => { const p = P(a, b), q = P(c2, d); R.linea(p[0], p[1], q[0], q[1], col); };
  const solo = !!o.soloCasco;
  if (!solo) for (let j = 1; j < 5 * s; j++) for (let dx = -22; dx <= 24; dx += 1 / s) { const p = P(dx, 0); if ((Math.round(p[0]) + j) % 2 === 0 && h(Math.round(p[0]) >> 1, j, Math.floor(t * 4) + 3) > 0.4) R.pset(p[0] + Math.sin(t * 3 + j), Math.round(yb + j), a_C.aguaD); }
  if (!solo) {
  // el palo con la vela aferrada en su verga y los remos levantados
  lin(4, -6, 4, -30, C.cascoKS); lin(5, -6, 5, -30, C.cascoKL); lin(-6, -24, 14, -24, C.cascoKS);
  lin(4, -30, 22, -6, a_C.cuerda); lin(4, -30, -18, -6, a_C.cuerda);
  // o.vela 0–1: la vela que se larga de la verga (hasta 11 de alto, con su panza al viento, costuras, el puño con su
  // escota y, pasada la mitad, la cruz de San Jorge); lo que queda aferrado en la verga adelgaza a medida que baja
  const v = a_lim(o.vela ?? 0), vh = v * 11;
  if (vh > 0.6) {
    const panza = Math.sin(t * 1.1 + k) * 0.4 + 1.6 * v, yA = -23, yB = yA + vh;
    for (let j = 0; j <= vh; j += 0.5 / s) { const u = j / Math.max(1, vh), b = Math.sin(u * Math.PI) * panza, xa = -6 + b * 0.3, xb = 14 + b;
      for (let i = xa; i <= xb; i += 0.5 / s) { const fr = (i - xa) / Math.max(1, xb - xa), cost = Math.abs(((i + 6) % 5)) < 0.5 / s;
        const c = j < 0.6 ? C.lonaKS : fr > 0.86 ? a_C.lonaD : fr < 0.12 ? a_C.lonaL : cost ? C.lonaKS : (u > 0.75 && fr > 0.6) ? C.lonaKS : C.lonaK; const p = P(i, yA + j); R.pset(p[0], p[1], c); } }
    lin(-6 + 0, yB, 14 + panza * 0.2, yB, C.lonaKS);
    if (v > 0.5) { lin(3, yA + 1, 3, yB - 1, C.sanJorge); lin(4, yA + 1, 4, yB - 1, C.sanJorge); const ym = yA + Math.round(vh / 2); lin(-4, ym, 12 + panza * 0.8, ym, C.sanJorge); lin(-4, ym + 0.5, 12 + panza * 0.8, ym + 0.5, C.sanJorge); lin(3.5, yA + 1, 3.5, yB - 1, C.sanJorge); }
    lin(14 + panza * 0.2, yB, 20, -7, a_C.cuerdaL);   // la escota hasta la regala
  }
  for (let i = -6; i <= 14; i += 0.5) { if (h(Math.round(i * 2), 3, 933) < v * 1.2) continue; lin(i, -23, i, -22 + Math.round(h(Math.round(i * 2), 1, 933) * 1.5 * (1 - v)), h(Math.round(i), 2, 933) > 0.5 ? C.lonaK : C.lonaKS); }
  for (const rx of [-10, 12]) lin(rx, -6, rx - 6, -18, a_C.cuerdaL);
  if (o.marinero) { const p = P(-14, -7); a_gente(R, p[0], Math.round(p[1]) + Math.round(4 * s), t, 7, { c: hex('#4a5a7a') }); }
  }
  // el casco de tingladillo: tracas solapadas, la regala, la roda y el espejo de popa
  pol([[-22, -7], [20, -7], [25, -10], [22, -3], [16, 0], [-18, 0], [-22, -3]], (px, py) => { const dy = (py - yb) / s; return dy > -1.5 ? hex('#2a1a10') : Math.round(-dy) % 2 ? C.cascoK : C.cascoKS; });
  lin(-22, -7, 20, -7, C.cascoKL); lin(20, -7, 25, -10, C.cascoKL); lin(-21, -6, 19, -6, a_C.pintV);
  for (const tx of [-14, -4, 6]) { const p = P(tx, -7); R.pset(Math.round(p[0]), Math.round(p[1]) - 1, a_C.robleL); }
  const a = P(-22, -7), b = P(20, -7); return { x0: Math.round(Math.min(a[0], b[0])), x1: Math.round(Math.max(a[0], b[0])), y: Math.round(Math.min(a[1], b[1])) };
}
// lo que hay tirado por un muelle: charcos que reflejan el cielo, briznas de paja, una red a secar, un rollo de cabo,
// una nasa de mimbre, una argolla y manchas de humedad (en x0–x1, y0–y1)
function a_detallesMuelle(R, x0, y0, x1, y1, k) {
  const { pset, rect } = R, W = x1 - x0, H = y1 - y0;
  for (let c = 0; c < 2; c++) { const cx = x0 + Math.round(W * (0.2 + c * 0.55)), cy = y0 + Math.round(H * (0.4 + c * 0.3)), rx = 9 - c * 2, ry = 2;
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if (i * i / (rx * rx) + j * j / (ry * ry + 0.5) < 1) pset(cx + i, cy + j, j < 0 ? a_C.cieloC : (i + j) % 3 === 0 ? a_C.nubeL : a_C.cieloB); }
  for (let i = 0; i < W * H / 40; i++) { const x = x0 + Math.round(h(i, 1, 951 + k) * W), y = y0 + Math.round(h(i, 2, 951 + k) * H); pset(x, y, a_C.junco ?? C.junco); pset(x + 1, y + (i % 2 ? 1 : -1), C.juncoS); }
  for (let i = 0; i < W * H / 30; i++) { const x = x0 + Math.round(h(i, 3, 952 + k) * W), y = y0 + Math.round(h(i, 4, 952 + k) * H); pset(x, y, a_C.piedraD); }
  { const cx = x0 + Math.round(W * 0.68), cy = y0 + Math.round(H * 0.25); for (let a = 0; a < Math.PI * 2; a += 0.05) for (const r of [2, 4, 6]) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.45), r === 6 ? a_C.cuerda : a_C.cuerdaL); }
  { const nx = x0 + Math.round(W * 0.42), ny = y0 + Math.round(H * 0.6); for (let j = 0; j < 7; j++) for (let i = 0; i < 16 - j; i++) if ((i + j) % 2 === 0) pset(nx + i + j, ny + j - 3, (i * j) % 5 === 0 ? hex('#5a6a7a') : hex('#8a9aaa')); R.disco(nx + 2, ny - 3, 1, hex('#e0a040')); }
  { const px = x0 + Math.round(W * 0.88), py = y0 + Math.round(H * 0.55); for (let j = 0; j < 6; j++) { const w = 4 - Math.abs(j - 3) * 0.6; for (let i = -w; i <= w; i++) pset(Math.round(px + i), py - j, (Math.round(i) + j) % 2 ? a_C.esteraS : a_C.estera); } }
}

// un barril de roble con sus aros (x el centro, yb la base)
function a_barril(R, x, yb, k = 0) { const { rect, pset } = R; for (let j = 0; j < 10; j++) { const w = 3 + (j > 1 && j < 8 ? 1 : 0); for (let i = -w; i <= w; i++) pset(x + i, yb - j, i === -w ? a_C.robleD : i < -1 ? a_C.robleL : i > w - 2 ? a_C.robleS : a_C.robleM); }
  for (const j of [1, 4, 8]) rect(x - 4, yb - j, x + 4, yb - j, a_C.plomo); rect(x - 2, yb - 10, x + 2, yb - 10, a_C.robleD); pset(x - 2, yb - 5, a_C.robleV); }

// un baúl con la tapa curva y los herrajes (x0 el borde izquierdo, yb la base, w el ancho)
function a_baul(R, x0, yb, w, c = a_C.robleS) { const { rect, pset } = R; rect(x0, yb - 7, x0 + w, yb, C.k); rect(x0 + 1, yb - 6, x0 + w - 1, yb - 1, c); rect(x0 + 1, yb - 9, x0 + w - 1, yb - 7, C.k); rect(x0 + 2, yb - 9, x0 + w - 2, yb - 8, a_mezcla(c, C.blanco, 0.2));
  for (const bx of [x0 + 2, x0 + w - 3]) rect(bx, yb - 9, bx, yb - 1, a_C.plomo); pset(x0 + (w >> 1), yb - 5, a_C.laton); pset(x0 + (w >> 1), yb - 4, a_C.latonS); rect(x0 + 1, yb - 6, x0 + w - 1, yb - 6, a_mezcla(c, C.k, 0.3)); }

// un saco de lona atado (x el centro, yb la base)
function a_saco(R, x, yb, k = 0) { for (let j = 0; j < 8; j++) { const w = j < 6 ? 4 : 2; for (let i = -w; i <= w; i++) R.pset(x + i, yb - j, i < -2 ? a_C.esteraL : i > 2 ? a_C.esteraS : (h(x + i, j, 934 + k) > 0.8 ? a_C.esteraS : a_C.estera)); } R.pset(x, yb - 8, a_C.cuerda); R.pset(x - 1, yb - 9, a_C.estera); R.pset(x + 1, yb - 9, a_C.estera); }

// la jaula de gallinas de mimbre con tres gallinas que se mueven dentro (x0, yb, w × a)
function a_jaula(R, x0, yb, w, a, t) {
  const { rect, pset } = R, y0 = yb - a;
  rect(x0, y0, x0 + w, yb, hex('#4a3420'));
  for (let k = 0; k < 3; k++) { const gx = x0 + 4 + Math.round(k * (w - 8) / 2 + Math.sin(t * 1.3 + k * 2) * 2), gy = yb - 2, pico = Math.sin(t * 4 + k * 3) > 0.6 ? 1 : 0, c = k === 1 ? hex('#a86a3a') : C.blanco, cS = k === 1 ? hex('#7a4a2a') : hex('#c8c4bc');
    rect(gx - 3, gy - 4, gx + 2, gy, c); rect(gx - 3, gy - 1, gx + 2, gy, cS); rect(gx + 1, gy - 7 + pico, gx + 3, gy - 4 + pico, c); pset(gx + 2, gy - 8 + pico, C.sanJorge); pset(gx + 4, gy - 6 + pico, a_C.latonL); pset(gx + 2, gy - 6 + pico, C.k); rect(gx - 4, gy - 5, gx - 3, gy - 3, cS); }
  for (let x = x0; x <= x0 + w; x += 3) rect(x, y0, x, yb, a_C.esteraS); for (let y = y0; y <= yb; y += 4) rect(x0, y, x0 + w, y, a_C.estera);
  rect(x0 - 1, y0 - 1, x0 + w + 1, y0, a_C.esteraS); rect(x0, y0 - 1, x0 + w, y0 - 1, a_C.esteraL);
}

// la cabra (x, yb; mira a la izquierda): rumia y menea la cabeza
function a_cabra(R, x, yb, t) { const { rect, pset } = R, c = hex('#e8e0d0'), cS = hex('#b0a898'), m = Math.sin(t * 6) > 0 ? 1 : 0, cab = Math.sin(t * 0.7) > 0.5 ? -1 : 0;
  rect(x - 6, yb - 9, x + 5, yb - 5, c); rect(x - 6, yb - 5, x + 5, yb - 5, cS); for (const lx of [-5, -3, 2, 4]) rect(x + lx, yb - 4, x + lx, yb, cS); pset(x + 6, yb - 9, cS); pset(x + 7, yb - 10, c);
  rect(x - 10, yb - 13 + cab, x - 6, yb - 9 + cab, c); pset(x - 11, yb - 10 + cab + m, cS); pset(x - 8, yb - 12 + cab, C.k); pset(x - 7, yb - 15 + cab, cS); pset(x - 6, yb - 16 + cab, cS); pset(x - 10, yb - 8 + cab, cS); pset(x - 10, yb - 7 + cab + m, cS); }

// el carro de bueyes cargado (x el centro de la rueda, yb el suelo; el buey a la izquierda, que mueve cola y cabeza)
function a_carro(R, x, yb, t) {
  const { rect, pset, linea } = R, K = C.k, b = hex('#8a5a3a'), bS = hex('#5e3c24'), bL = hex('#a87a54');
  // la carga: barriles y fardos sobre la plataforma
  a_barril(R, x + 4, yb - 12, 1); a_saco(R, x + 13, yb - 12, 2); rect(x - 8, yb - 22, x, yb - 13, a_C.esteraS); rect(x - 7, yb - 21, x - 1, yb - 14, a_C.estera); rect(x - 7, yb - 18, x - 1, yb - 18, a_C.cuerda);
  rect(x - 10, yb - 13, x + 18, yb - 11, a_C.robleS); rect(x - 10, yb - 13, x + 18, yb - 13, a_C.robleL); linea(x - 10, yb - 12, x - 26, yb - 13, a_C.robleS);
  for (let a = 0; a < Math.PI * 2; a += 0.05) { pset(Math.round(x + Math.cos(a) * 7), Math.round(yb - 7 + Math.sin(a) * 7), a_C.robleD); pset(Math.round(x + Math.cos(a) * 6), Math.round(yb - 7 + Math.sin(a) * 6), a_C.robleM); }
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4; linea(x - Math.round(Math.cos(a) * 6), yb - 7 - Math.round(Math.sin(a) * 6), x + Math.round(Math.cos(a) * 6), yb - 7 + Math.round(Math.sin(a) * 6), a_C.robleS); } R.disco(x, yb - 7, 1.5, a_C.plomo);
  // el buey, con el yugo
  const bx = x - 34, cab = Math.sin(t * 0.6) > 0.6 ? 1 : 0, cola = Math.round(Math.sin(t * 3) * 2);
  rect(bx - 6, yb - 12, bx + 8, yb - 5, b); rect(bx - 6, yb - 12, bx + 8, yb - 12, bL); rect(bx - 6, yb - 5, bx + 8, yb - 5, bS); for (const lx of [-5, -2, 5, 7]) rect(bx + lx, yb - 4, bx + lx, yb, bS);
  rect(bx - 11, yb - 12 + cab, bx - 6, yb - 7 + cab, b); pset(bx - 12, yb - 8 + cab, bS); pset(bx - 9, yb - 11 + cab, K); pset(bx - 10, yb - 14 + cab, a_C.lana); pset(bx - 7, yb - 14 + cab, a_C.lana); rect(bx - 7, yb - 13, bx - 5, yb - 13, a_C.robleS);
  linea(bx + 8, yb - 11, bx + 10, yb - 5 + cola, bS); pset(bx + 10, yb - 4 + cola, K);
  for (let i = -8; i <= 20; i++) if (i % 2 === 0) a_tine(R, x + i, yb + 1, K, 0.3);
}

// el muelle de sillares: hileras que se ensanchan hacia delante, juntas a matajunta, musgo y manchas (x0–x1, y0–y1)
function a_sillares(R, x0, y0, x1, y1, k = 0) {
  const { rect, pset } = R; let y = y0, f = 0;
  while (y <= y1) { const alto = 3 + Math.round(f * 1.1), L = 16 + f * 4, off = Math.round(h(f, 1, 935 + k) * L);
    for (let n = -1; n * L + off - L < x1; n++) { const xa = Math.max(x0, n * L + off - L), xb = Math.min(x1, n * L + off - 1), c = [a_C.piedra, a_C.piedraL, a_mezcla(a_C.piedra, a_C.piedraS, 0.4)][(n + f + 9) % 3];
      if (xb < xa) continue; rect(xa, y, xb, Math.min(y1, y + alto - 1), c); rect(xa, y, xb, y, a_C.piedraL); rect(xb, y, xb, Math.min(y1, y + alto - 1), a_C.piedraD);
      for (let i = 0; i < (xb - xa) * alto / 9; i++) pset(xa + Math.round(h(n, i, 936 + f) * (xb - xa)), y + Math.round(h(i, n, 937 + f) * (alto - 1)), h(i, f, 938) > 0.7 ? hex('#7a8a5a') : a_C.piedraS); }
    rect(x0, y + alto - 1, x1, Math.min(y1, y + alto - 1), a_C.piedraD); y += alto; f++; }
}

// el cielo de una mañana de mayo, tramado, con su halo de sol (fijo); las nubes van aparte
function a_cieloFijo(R, hor, cols = [a_C.cieloA, a_C.cieloB, a_C.cieloC, a_C.cieloD], sol = [236, 30]) {
  a_degradado(R, 0, 0, 319, hor, cols);
  if (sol) for (let j = -22; j <= 22; j++) for (let i = -22; i <= 22; i++) { const d = Math.hypot(i, j) / 22; if (d < 1 && a_bay(sol[0] + i, sol[1] + j) > 0.4 + d * 0.6) a_tine(R, sol[0] + i, sol[1] + j, hex('#fff8e0'), 0.35); }
  if (sol) { R.disco(sol[0], sol[1], 6, hex('#fff0b0')); R.disco(sol[0], sol[1], 5, hex('#fffbe8')); }
}

// las nubes de tres tonos a tres velocidades: cirros altos y pálidos (que no pisan la esquina de Atom), cúmulos medios y
// cúmulos pequeños junto al horizonte; tn: tono (estación); n 1–2: con más de 1 entran poco a poco más cúmulos; m: la
// máscara del cielo (las nubes no tapan la tierra)
function a_nubes(R, t, hor, tn = (c) => c, n = 1, m = null) {
  const cols = [a_C.nubeL, a_C.nube, a_C.nubeS, a_C.nubeD].map(tn), lejos = [a_C.nube, a_C.nubeS, a_C.nubeD, a_C.nubeD].map(tn);
  for (let k = 0; k < 3; k++) { const w = 40 + Math.round(h(k, 5, 940) * 40), x0 = ((h(k, 6, 940) * 420 + t * (0.5 + k * 0.25)) % 460) - 90, y = 24 + k * 7;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), yy = y + Math.round(Math.sin(i * 0.08 + k) * 1.2); if (x < 0 || x > 319 || (x > 268 && yy < 48) || h(i >> 2, k, 941) < 0.3 || (m && !m[yy * 320 + x])) continue; R.pset(x, yy, Math.sin(i / w * Math.PI) > 0.6 ? tn(a_C.nubeL) : tn(a_C.cieloD)); } }
  for (let k = 0; k < 8; k++) { if (k >= 4 && h(k, 7, 942) > n - 1) continue; const w = 26 + Math.round(h(k, 1, 942) * 16), x = ((h(k, 2, 942) * 460 + t * (1.6 + k * 0.35)) % 480) - 70, y = 62 + Math.round(h(k, 3, 942) * 8); a_cumulo(R, Math.round(x), y, w, k, cols, m); }
  for (let k = 0; k < 5; k++) { const w = 10 + Math.round(h(k, 1, 943) * 10), x = ((h(k, 2, 943) * 460 + t * (0.6 + k * 0.15)) % 480) - 70, y = hor - 3 - Math.round(h(k, 3, 943) * 6); a_cumulo(R, Math.round(x), y, w, k + 9, lejos, m); }
}

const a_PLY = { hor: 96, muelle: 140, borde: 232 };

// la máscara del cielo de una capa fija: 1 donde, acabada la capa, sigue el cielo (allí se pintan las nubes)
const a_MASC = new Map();

function a_mascara(R, clave, foto) { const b = R.buf, m = new Uint8Array(320 * 180); for (let i = 0; i < m.length; i++) m[i] = b[i] === foto[i] ? 1 : 0; a_MASC.set(clave, m); }

// lo fijo de Plymouth: el cielo, las colinas de la otra orilla con sus setos, la isla con su fuerte, la ciudad de
// entramado en la ladera con la iglesia de torre cuadrada, el agua y el muelle de sillares con su cara al agua
function a_plymouthFijo(R) {
  const { rect, pset, linea } = R, { hor, muelle, borde } = a_PLY;
  a_cieloFijo(R, hor); const foto = R.buf.slice();
  // las colinas de la otra orilla (derecha): verdes, con setos y bosquecillos
  for (let x = 120; x < 320; x++) { const top = Math.round(80 + Math.sin(x * 0.03) * 5 + Math.sin(x * 0.11) * 2);
    for (let y = top; y < hor + 1; y++) pset(x, y, y === top ? a_C.hierbaL : (Math.floor(x / 23) + Math.floor((y - top) / 4)) % 3 === 0 ? a_mezcla(a_C.hierba, a_C.cieloD, 0.35) : a_mezcla(a_C.hierbaS, a_C.cieloD, 0.35));
    if (x % 23 === 0) for (let y = top; y < hor; y++) pset(x, y, a_mezcla(a_C.hierbaD, a_C.cieloD, 0.3)); if (h(x, 1, 944) > 0.85) { pset(x, top - 1, a_mezcla(a_C.hierbaD, a_C.cieloD, 0.3)); pset(x, top - 2, a_mezcla(a_C.hierbaD, a_C.cieloD, 0.3)); } }
  // la ciudad en la ladera (izquierda): la colina y las casas en hileras, de atrás adelante, y la iglesia
  for (let x = 0; x < 160; x++) { const top = Math.round(40 + (x / 160) ** 1.6 * 56); for (let y = top; y <= 102; y++) pset(x, y, (x + y) % 3 === 0 ? a_C.hierbaS : a_C.hierba); }
  const humos = [];
  for (let fila = 0; fila < 5; fila++) for (let x = 2 + (fila % 2) * 8; x < 150; x += 17) { const top = 40 + (Math.max(0, x + 6) / 160) ** 1.6 * 56, yb = Math.round(top + 12 + fila * 10); if (yb > 101 || (x > 84 && x < 118 && fila < 4)) continue;
    if (h(x, fila, 948) > 0.8) { R.disco(x + 6, yb - 6, 5, a_C.hierbaD); R.disco(x + 5, yb - 7, 3, a_C.hierbaS); pset(x + 4, yb - 9, a_C.hierbaL); rect(x + 6, yb - 2, x + 6, yb, a_C.robleS); continue; }
    const ch = a_casa(R, x, yb, 11 + Math.round(h(x, fila, 945) * 3), 9 + Math.round(h(fila, x, 946) * 3), x * 7 + fila); if (ch && humos.length < 4 && h(x, fila, 947) > 0.5) humos.push(ch); }
  // la iglesia de San Andrés: la torre cuadrada con pináculos y la nave
  rect(90, 64, 116, 92, a_C.piedraS); rect(91, 65, 115, 92, a_C.piedra); for (let y = 68; y < 92; y += 4) rect(91, y, 115, y, a_C.piedraS); for (let x = 94; x < 115; x += 6) rect(x, 72, x + 2, 78, hex('#3a3a46'));
  R.poligono([[88, 66], [103, 56], [118, 66]], a_C.pizarra); R.linea(88, 66, 103, 56, a_C.pizarraL);
  rect(98, 44, 110, 92, a_C.piedraD); rect(99, 45, 109, 92, a_C.piedra); rect(99, 45, 100, 92, a_C.piedraL); for (let y = 48; y < 92; y += 5) rect(99, y, 109, y, a_C.piedraS);
  rect(102, 52, 106, 57, hex('#2a2a36')); rect(103, 52, 105, 52, a_C.piedraS); rect(102, 64, 106, 68, hex('#2a2a36')); R.disco(104, 76, 2, a_C.piedraL); pset(104, 76, C.k);
  for (const px of [98, 102, 106, 110]) rect(px, 42, px, 44, a_C.piedraD); for (const px of [98, 110]) { rect(px - 1, 38, px + 1, 44, a_C.piedraS); pset(px, 37, a_C.piedraD); }
  // el malecón de la ciudad, con su muro y las escaleras
  rect(0, 100, 160, 104, a_C.piedraS); rect(0, 100, 160, 100, a_C.piedraL); for (let x = 0; x < 160; x += 6) pset(x, 102, a_C.piedraD);
  // la isla con su fuertecillo, en medio de la bahía
  for (let x = 176; x < 228; x++) { const top = Math.round(93 - Math.sin((x - 176) / 52 * Math.PI) * 5); for (let y = top; y < 98; y++) pset(x, y, y === top ? a_C.hierbaL : a_C.hierbaS); }
  rect(196, 84, 208, 91, a_C.piedraS); rect(197, 85, 207, 91, a_C.piedra); for (let x = 196; x <= 208; x += 3) rect(x, 82, x + 1, 84, a_C.piedra);
  // el agua del puerto
  a_aguaFija(R, 0, hor, 319, 179);
  // el muelle: la superficie de sillares, el bordillo de atrás con sus norays y la cara al agua, con la marca verde
  a_sillares(R, 0, muelle, borde, 179, 1);
  rect(0, muelle - 2, borde, muelle, a_C.piedraD); rect(0, muelle - 2, borde, muelle - 2, a_C.piedraL);
  for (const nx of [40, 120, 200]) { rect(nx - 1, muelle - 6, nx + 2, muelle - 1, a_C.plomo); rect(nx - 2, muelle - 7, nx + 3, muelle - 6, hex('#3a3e48')); pset(nx, muelle - 5, a_C.hierroL ?? C.hierroL); }
  for (let y = muelle - 1; y < 180; y++) { rect(borde + 1, y, borde + 6, y, (y % 6 === 0) ? a_C.piedraD : a_C.piedraS); pset(borde + 1, y, a_C.piedraL); }
  for (let y = muelle - 1; y < 180; y += 6) for (let x = borde + 1; x <= borde + 6; x++) if ((x + Math.floor(y / 6)) % 4 === 0) pset(x, y + 3, a_C.piedraD);
  rect(borde + 3, 150, borde + 4, 153, a_C.plomo); pset(borde + 3, 151, C.k);
  // la sombra del bordillo sobre la superficie y la de los fardos de atrás
  for (let x = 0; x < borde; x++) if (x % 2) a_tine(R, x, muelle + 1, C.k, 0.3);
  // las cosas del muelle (detrás de los actores): el carro de bueyes, barriles, sacos y baúles
  a_carro(R, 50, 150, 0);
  for (const [bx, by] of [[74, 151], [83, 151], [78, 141]]) a_barril(R, bx, by, bx);
  for (const sx of [94, 101, 108]) a_saco(R, sx, 151, sx); a_saco(R, 98, 143, 3);
  a_baul(R, 162, 151, 14, a_C.robleS); a_baul(R, 177, 151, 12, hex('#5a3a4a')); a_baul(R, 166, 142, 12, hex('#3a4a5a'));
  a_detallesMuelle(R, 0, a_PLY.muelle + 14, a_PLY.borde - 4, 179, 1);
  a_mascara(R, 'rk-plymouth', foto);
  return humos;
}

let a_HUMOS_PLY = null;

// PLYMOUTH, GENERAL: el puerto en mayo de 1587. Horizonte y 96; la ciudad en la ladera x 0–160 (la iglesia x 88–118, la
// torre hasta y 37); el muelle de sillares x 0–232, y 140–180 (el borde, al agua, en x 232); los pies en 160; los fardos
// de atrás del muelle en y 140–151 (carro x 16–68, barriles x 70–88, sacos x 90–112, baúles x 162–190, jaula x 196–216,
// la cabra en 132). La pinaza junto al borde del muelle (x 244–296) con la pasarela desde (226, 158); los tres barcos
// fondeados en la bahía. o.zarpa 0–1: hasta 0,4 se izan las velas; después los barcos salen hacia la derecha y se alejan.
function a_plymouth(R, t, o) {
  const zarpa = a_lim(o.zarpa ?? 0), velas = a_suave(zarpa / 0.4), sale = a_suave((zarpa - 0.4) / 0.6);
  R.copiar(a_capa(R, 'rk-plymouth', () => { a_HUMOS_PLY = a_plymouthFijo(R); }));
  a_nubes(R, t, a_PLY.hor, undefined, 1, a_MASC.get('rk-plymouth'));
  for (const [k, [hx, hy]] of (a_HUMOS_PLY || []).entries()) a_humo(R, hx, hy, t + k * 1.3, k, 18, 0.5);
  // las gaviotas que vuelan sobre el puerto
  for (let k = 0; k < 4; k++) { const x = ((h(k, 1, 948) * 360 + t * (8 + k * 3) * (k % 2 ? 1 : -1)) % 360 + 360) % 360 - 20, y = 60 + k * 9 + Math.sin(t * 0.8 + k) * 5; if (!(x > 270 && y < 48)) a_gaviota(R, x, y, t, k); }
  // los tres barcos (canon) fondeados en la bahía, y la gente diminuta en las cubiertas
  for (const [bx, by, s, k] of [[180, 116, 0.58, 1], [262, 123, 0.72, 2], [302, 109, 0.42, 3]]) {
    const u = Math.max(0, sale - (k - 1) * 0.12) / (1 - (k - 1) * 0.12), x = bx + u * (150 - k * 20), y = by + (a_PLY.hor + 4 - by) * u * 0.7, ss = s * (1 - u * 0.45);
    if (x < 360) a_barco(R, x, y, ss, t, { k, velas, dir: 1 }); }
  a_aguaVida(R, t, 0, a_PLY.hor + 2, 319, a_PLY.muelle - 3, 50);
  a_aguaVida(R, t, a_PLY.borde + 8, a_PLY.muelle, 319, 179, 18);
  // la marea que sube y baja contra la cara del muelle
  const marea = Math.round(Math.sin(t * 0.5) * 1.5); for (let x = a_PLY.borde + 1; x <= a_PLY.borde + 6; x++) { R.pset(x, 164 + marea, a_C.aguaL); R.pset(x, 165 + marea, hex('#5a7a4a')); }
  // gente pequeña en el malecón de la ciudad y un mozo que cruza el fondo del muelle con un saco
  for (let k = 0; k < 4; k++) { const x = ((h(k, 1, 949) * 160 + t * (3 + k) * (k % 2 ? 1 : -1)) % 160 + 160) % 160; a_gente(R, x, 100, t, k, { s: 0.8, anda: 1.5, dir: k % 2 ? 1 : -1, mujer: k === 2 }); }
  { const x = 20 + ((t * 7) % 220); if (x < 155 || x > 195) a_gente(R, x, 146, t, 5, { anda: 2, dir: 1, carga: 'saco' }); }
  // la cabra atada a su estaca, la jaula de gallinas y una gaviota posada en el noray
  R.linea(126, 151, 120, 142, a_C.cuerda); R.rect(119, 140, 120, 151, a_C.robleS); a_cabra(R, 134, 151, t);
  a_jaula(R, 196, 151, 20, 11, t);
  { const sube = (t % 9) > 7.5, gy = a_PLY.muelle - 8 - (sube ? Math.round(((t % 9) - 7.5) * 14) : 0); a_gaviota(R, 120 + (sube ? Math.round(((t % 9) - 7.5) * 12) : 0), gy, sube ? t : 0.3, 9); if (!sube) R.pset(121, gy + 1, a_C.latonL); }
  // la pinaza junto al muelle, con la pasarela que cabecea con ella
  const pin = a_pinaza(R, 270, 166, 1.1, t, { k: 4, marinero: true });
  const py = pin.y; R.linea(a_PLY.borde - 6, 158, pin.x0 + 4, py, a_C.robleS); R.linea(a_PLY.borde - 6, 157, pin.x0 + 4, py - 1, a_C.robleL); R.linea(a_PLY.borde - 6, 159, pin.x0 + 4, py + 1, a_C.robleD);
  return { suelo: 160, libre: [20, 230], pinaza: [270, py], pasarela: [a_PLY.borde - 6, 158, pin.x0 + 4, py], cubierta: [pin.x0 + 8, pin.x1 - 8, py + 5], borde: a_PLY.borde, horizonte: a_PLY.hor };
}

// PLYMOUTH, DELANTE: el costado de la pinaza (tapa de cintura abajo a quien está a bordo) y dos fardos y un rollo de
// cabo en la esquina de abajo a la izquierda (x 0–32), por delante de todo
function a_plymouthDelante(R, t, o) {
  const { rect, pset } = R;
  a_pinaza(R, 270, 166, 1.1, t, { k: 4, soloCasco: true });
  rect(0, 166, 16, 179, C.k); rect(0, 167, 15, 179, a_C.estera); for (let y = 168; y < 180; y += 3) rect(0, y, 15, y, a_C.esteraS); rect(7, 167, 8, 179, a_C.cuerda);
  for (let a = 0; a < Math.PI * 2; a += 0.05) for (const r of [3, 5, 7]) pset(Math.round(24 + Math.cos(a) * r), Math.round(175 + Math.sin(a) * r * 0.4), r === 7 ? a_C.cuerda : a_C.cuerdaL);
  return {};
}

// PLYMOUTH, CÁMARA 'muelle': el borde del muelle de cerca. El muelle de sillares x 0–200, y 150–180 (pies en 166; la
// cara al agua en x 200–206); la pinaza grande cabeceando a la derecha (x 222–318, regala en y ≈ 150) con la pasarela
// desde el muelle (200, 166) a la regala; detrás, la bahía con un barco (canon) grande fondeado, la ciudad lejos y el
// cielo (a_muelleLejos: campos, molino, torre; a_muelleVida: aspas, humo, velas lejanas, barca de remos, patos); en el
// muelle, la pila de baúles (x 132–190, detrás de los actores), barriles, la escala y la argolla de la cara al agua y el
// noray con su cabo. o.velas 0–1: las velas del barco grande y la de la pinaza (o.vela de a_pinaza).
function a_muelle(R, t, o) {
  const { rect, pset, linea } = R;
  R.copiar(a_capa(R, 'rk-muelle', () => {
    a_cieloFijo(R, 88, undefined, [60, 34]); const foto = R.buf.slice();
    for (let x = 0; x < 140; x++) { const top = Math.round(46 + (x / 140) ** 1.5 * 40); for (let y = top; y < 90; y++) pset(x, y, a_mezcla((x + y) % 3 === 0 ? a_C.hierbaS : a_C.hierba, a_C.cieloD, 0.3)); }
    for (let fila = 0; fila < 4; fila++) for (let x = -2 + fila * 4; x < 130; x += 12) { const yb = Math.round(46 + (Math.max(0, x) / 140) ** 1.5 * 40 + 8 + fila * 7); if (yb < 89) a_casa(R, x, yb, 9, 7, x + fila * 31, (c) => a_mezcla(c, a_C.cieloD, 0.3)); }
    for (let x = 140; x < 320; x++) { const top = Math.round(84 + Math.sin(x * 0.04) * 3); for (let y = top; y < 90; y++) pset(x, y, a_mezcla(a_C.hierbaS, a_C.cieloD, 0.45)); }
    a_muelleLejos(R);
    a_aguaFija(R, 0, 88, 319, 179); const agua = R.buf.slice();
    a_sillares(R, 0, 150, 200, 179, 2); rect(0, 147, 200, 150, a_C.piedraD); rect(0, 147, 200, 147, a_C.piedraL);
    for (let y = 148; y < 180; y++) { rect(201, y, 207, y, y % 7 === 0 ? a_C.piedraD : a_C.piedraS); pset(201, y, a_C.piedraL); }
    for (let y = 168; y < 180; y++) for (let x = 201; x <= 207; x++) if ((x + y) % 2) pset(x, y, hex('#4a6a3a'));
    for (let x = 0; x < 200; x++) if (x % 2) a_tine(R, x, 151, C.k, 0.3);
    // la pila de baúles y los barriles, detrás de los actores
    a_baul(R, 132, 158, 18, a_C.robleS); a_baul(R, 152, 158, 16, hex('#5a3a4a')); a_baul(R, 170, 158, 18, hex('#3a4a5a')); a_baul(R, 138, 149, 16, hex('#6a4a2a')); a_baul(R, 158, 149, 18, a_C.robleS); a_baul(R, 146, 140, 16, hex('#4a3a5a'));
    for (const bx of [14, 24]) a_barril(R, bx, 158, bx); a_barril(R, 19, 148, 3); a_saco(R, 34, 158, 4); a_saco(R, 42, 158, 5);
    for (let x = 128; x < 196; x++) if (x % 2) a_tine(R, x, 159, C.k, 0.35);
    a_detallesMuelle(R, 50, 162, 186, 179, 2);
    // la cara del muelle: una escala de hierro, una argolla y las algas de la marea
    for (let y = 150; y < 180; y += 4) { pset(202, y, a_C.plomo); pset(203, y, a_C.plomo); pset(204, y, a_C.plomo); } R.rect(202, 148, 202, 179, hex('#3a3e48')); R.rect(205, 148, 205, 179, hex('#3a3e48'));
    R.disco(206, 158, 2, hex('#3a3e48')); pset(206, 158, a_C.piedraS); pset(205, 157, C.hierroL);
    a_mascara(R, 'rk-muelle', foto); a_mascara(R, 'rk-muelle-agua', agua);
  }));
  a_nubes(R, t, 88, undefined, 1, a_MASC.get('rk-muelle'));
  for (let k = 0; k < 3; k++) { const x = ((h(k, 1, 950) * 360 + t * (7 + k * 3)) % 360) - 20, y = 40 + k * 10 + Math.sin(t + k) * 4; if (!(x > 270 && y < 48)) a_gaviota(R, x, y, t, k); }
  a_muelleVida(R, t, false);
  // el barco grande fondeado en la bahía, con un marinero que trepa por la jarcia
  a_barco(R, 118, 120, 1.15, t, { k: 6, velas: a_lim(o.velas ?? 0) });
  { const u = (Math.sin(t * 0.5) + 1) / 2; a_gente(R, 118 + 14 + u * 4, Math.round(104 - u * 30), t, 2, { s: 0.8 }); }
  a_muelleVida(R, t, true);
  a_aguaVidaM(R, t, 0, 90, 319, 146, 46, a_MASC.get('rk-muelle-agua')); a_aguaVida(R, t, 208, 146, 319, 179, 22);
  // el noray con su cabo hasta la pinaza
  rect(188, 158, 192, 165, C.k); rect(189, 158, 191, 165, a_C.plomo); rect(187, 156, 193, 158, hex('#3a3e48')); pset(189, 159, C.hierroL);
  const pin = a_pinaza(R, 268, 168, 1.9, t, { k: 2, marinero: true, vela: o.velas ?? 0 });
  linea(192, 160, pin.x0 + 6, pin.y + 2, a_C.cuerda); linea(192, 161, pin.x0 + 6, pin.y + 3, a_C.cuerdaL);
  // la pasarela de tablones, con sus listones, de la orilla del muelle a la regala
  const x0 = 196, y0 = 166, x1 = pin.x0 + 10, y1 = pin.y;
  for (let w = 0; w < 3; w++) linea(x0, y0 + w - 1, x1, y1 + w - 1, w === 0 ? a_C.robleL : w === 1 ? a_C.roble : a_C.robleD);
  for (let u = 0.1; u < 1; u += 0.15) { const px = Math.round(x0 + (x1 - x0) * u), py = Math.round(y0 + (y1 - y0) * u); pset(px, py - 1, a_C.robleS); }
  return { suelo: 166, libre: [10, 300], pasarela: [x0, y0, x1, y1], pinaza: [268, pin.y], cubierta: [pin.x0 + 10, pin.x1 - 10, pin.y + 8] };
}
// MUELLE, DELANTE: el costado de la pinaza (tapa de cintura abajo a quien está a bordo), la jaula de gallinas (x 4–36) y
// dos baúles (x 38–64) en el primer término, abajo a la izquierda
function a_muelleDelante(R, t, o) {
  a_pinaza(R, 268, 168, 1.9, t, { k: 2, soloCasco: true });
  a_jaula(R, 4, 179, 32, 16, t + 3);
  a_baul(R, 38, 180, 24, hex('#5a3a2a')); a_baul(R, 42, 172, 18, hex('#3a4a5a'));
  // una pluma que se ha escapado de la jaula y baila en el aire
  const u = (t % 6) / 6, px = Math.round(20 + u * 40 + Math.sin(t * 3) * 3), py = Math.round(160 - u * 30 + Math.sin(t * 5) * 2); R.pset(px, py, C.blanco); R.pset(px + 1, py - 1, hex('#d8d4cc'));
  return {};
}

// las estaciones: o.estacion 0 verano, 1/3 otoño, 2/3 invierno con nieve, 1 primavera. Devuelve los colores del cielo,
// el tono del follaje y la hierba, cuánta nieve y lo que cae (hojas, copos, pétalos)
const a_EST = [
  { cielo: ['#4a96d8', '#6aaee4', '#94c8ec', '#cfe4ee'], hoja: ['#3a7a3a', '#5a9a42', '#86b85a'], hierba: '#6a9a4a', nieve: 0 },
  { cielo: ['#7aa0c0', '#9ab8cc', '#c4d0d0', '#ecdcc0'], hoja: ['#9a4a1a', '#d07a2a', '#f0b040'], hierba: '#9a9a4a', nieve: 0 },
  { cielo: ['#8a96a8', '#a4aebc', '#c0c8d0', '#dce0e4'], hoja: ['#5a4a3a', '#6a5a48', '#7a6a58'], hierba: '#8a9480', nieve: 1 },
  { cielo: ['#5aa4e0', '#7cbcec', '#a8d4f0', '#e0eef0'], hoja: ['#4a8a3a', '#7ab84a', '#f0b0c8'], hierba: '#7aaa4a', nieve: 0 },
];

function a_estacion(e) {
  e = a_lim(e) * 3; const i = Math.min(2, Math.floor(e)), u = a_suave((e - i - 0.25) / 0.5), A0 = a_EST[i], A1 = a_EST[i + 1], mx = (a, b) => a_mezcla(hex(a), hex(b), u);
  return { cielo: A0.cielo.map((c, k) => mx(c, A1.cielo[k])), hoja: A0.hoja.map((c, k) => mx(c, A1.hoja[k])), hierba: mx(A0.hierba, A1.hierba), nieve: A0.nieve + (A1.nieve - A0.nieve) * u,
    otono: Math.max(0, 1 - Math.abs(e - 1) * 1.6), invierno: Math.max(0, 1 - Math.abs(e - 2) * 1.6), primavera: Math.max(0, 1 - Math.abs(e - 3) * 1.6), verano: Math.max(0, 1 - e * 1.6) };
}

// lo que cae según la estación: hojas en otoño, copos en invierno, pétalos en primavera (en x0–x1, y0–y1)
function a_cae(R, t, S, x0, x1, y0, y1) {
  for (let k = 0; k < 60; k++) { const tipo = k % 3, f = tipo === 0 ? S.otono : tipo === 1 ? S.invierno : S.primavera; if (h(k, 9, 960) > f * 1.2) continue;
    const v = tipo === 1 ? 10 + (k % 5) * 3 : 7 + (k % 4) * 2, y = y0 + ((h(k, 1, 960) * (y1 - y0) + t * v) % (y1 - y0)), x = x0 + ((h(k, 2, 960) * (x1 - x0) + t * (tipo === 1 ? 2 : 6) + Math.sin(t * 2 + k) * 4) % (x1 - x0) + (x1 - x0)) % (x1 - x0);
    const c = tipo === 0 ? [hex('#d07a2a'), hex('#f0b040'), hex('#9a4a1a')][k % 3] : tipo === 1 ? C.blanco : hex('#f8c8d8'), px = Math.round(x), py = Math.round(y);
    if (px > 274 && py < 48) continue; R.pset(px, py, c); if (tipo !== 1 || k % 2) R.pset(px + (Math.floor(t * 4 + k) % 2 ? 1 : -1), py, c); }
}

// la almenara: un poste con su cesto de hierro y el fuego que vela la costa, con el humo que se va con el viento
function a_almenara(R, x, y, t, k, s = 1, humo = true) {
  const { rect, pset } = R; rect(x, y, x, y + Math.round(30 * s), a_C.robleS); if (s > 0.7) rect(x + 1, y + 2, x + 1, y + Math.round(30 * s), a_C.robleD);
  rect(x - 3, y - 1, x + 3, y + 2, C.k); for (let i = -3; i <= 3; i += 2) pset(x + i, y - 2, C.k);
  for (let j = 0; j < 7 * s; j++) for (let i = -3; i <= 3; i++) { const f = Math.sin(t * 11 + i * 2 + j + k) * 0.5 + 0.5; if (j > 2 + Math.abs(i) * 1.2 * (0.7 + f * 0.6)) continue; pset(x + i, y - 2 - j, j < 2 ? a_C.fuego : f > 0.5 ? a_C.fuegoL : a_C.fuego); }
  if (humo) a_humo(R, x - 1, y - 8, t, k + 30, 36 * s, -0.7, [hex('#b8b8b8'), hex('#8a8a8a')]);
}

// un barco de la Armada, lejos: casco oscuro con castillos altos, dos o tres palos con velas blancas y la cruz de
// Borgoña (aspa roja); s la escala (1 ≈ 18 px de eslora); escora con o.giro
function a_barcoArmada(R, x, y, s, t, k, giro = 0) {
  const { pset } = R, w = Math.max(3, Math.round(6 * s)), alto = Math.max(3, Math.round(6 * s)), yb = Math.round(y + Math.sin(t * 1.2 + k) * 0.6);
  const P = (dx, dy) => [Math.round(x + dx - dy * giro), Math.round(yb + dy)];
  // el casco: castillo de popa a un lado y de proa al otro
  const L = Math.round(9 * s); for (let i = -L; i <= L; i++) { const alt = Math.abs(i) > L * 0.65 ? Math.round(3 * s) + 1 : Math.round(1.6 * s) + 1; for (let j = 0; j < alt; j++) { const [px, py] = P(i, -j); pset(px, py, j === alt - 1 ? hex('#7a5a3a') : hex('#3a2418')); } }
  // los palos y las velas con su aspa
  const palos = s > 0.7 ? [-Math.round(4 * s), Math.round(2 * s), Math.round(7 * s)] : [-Math.round(3 * s), Math.round(4 * s)];
  palos.forEach((dx, n) => { const hh = n === 1 || palos.length === 2 ? alto * 2 + 2 : alto + 3; for (let j = 1; j < hh + 2; j++) { const [px, py] = P(dx, -2 - j); pset(px, py, hex('#3a2418')); }
    const ws = n === palos.length - 1 && palos.length === 3 ? w - 2 : w, y0 = -2 - hh + 1, half = ws >> 1;
    for (let j = 0; j < ws; j++) for (let i = 0; i < ws; i++) { const aspa = Math.abs(i - j) < 0.8 || Math.abs(i + j - (ws - 1)) < 0.8, [px, py] = P(dx - half + i, y0 + j);
      pset(px, py, aspa && ws >= 5 ? hex('#b8202a') : i === ws - 1 ? hex('#c8c0b0') : j === 0 ? hex('#f8f4ea') : hex('#ece6d6')); }
    if (s > 0.8) { const [px, py] = P(dx, y0 - 2); pset(px, py, hex('#f0d040')); } });
}

// la media luna de la Armada: n barcos en arco (el centro lejos y pequeño, los cuernos más cerca); avance 0–1 la lleva
// de la derecha a la izquierda; derrota 0–1 la deshace: cada barco escora y se va por su lado, empujado por el viento
function a_mediaLuna(R, t, avance, derrota, hor) {
  const cx = 300 - 230 * a_lim(avance), n = 15, pos = [];
  for (let i = 0; i < n; i++) { const u = (i / (n - 1)) * 2 - 1, cerca = u * u;
    let x = cx + Math.sin(u * Math.PI / 2) * 96 + (h(i, 1, 961) - 0.5) * 4, y = hor + 1 + cerca * cerca * 20 + (h(i, 2, 961) - 0.5) * 2, s = 0.74 + cerca * 0.75;
    const d = a_suave(derrota * (0.7 + h(i, 3, 961) * 0.6)); x += d * ((h(i, 4, 961) - 0.25) * 120 - 40); y += d * (h(i, 5, 961) - 0.4) * 10; s *= 1 - d * 0.25;
    pos.push([x, y, s, i, d]); }
  pos.sort((a, b) => a[1] - b[1]).forEach(([x, y, s, i, d]) => { if (x > -20 && x < 340) a_barcoArmada(R, x, y, s, t + i, i, d * (h(i, 6, 961) > 0.5 ? 0.25 : -0.25)); });
  return [Math.round(cx), hor + 3];
}

// la tronera de piedra con el cañón visto por detrás (la culata con su cascabel, la cureña con dos ruedas) asomando
function a_canon(R, x, yb, t, s = 1, tn = (c) => c) {
  const { rect, pset } = R, K = C.k, br = tn(hex('#b08a3a')), brL = tn(hex('#e0c070')), brS = tn(hex('#6a5020'));
  // la cureña: dos gualderas, el eje y las ruedas
  rect(x - 9, yb - 8, x + 9, yb - 4, K); rect(x - 8, yb - 7, x + 8, yb - 5, tn(a_C.robleM)); rect(x - 8, yb - 7, x + 8, yb - 7, tn(a_C.robleL));
  for (const wx of [x - 10, x + 10]) { for (let a = 0; a < Math.PI * 2; a += 0.15) pset(Math.round(wx + Math.cos(a) * 2), Math.round(yb - 4 + Math.sin(a) * 4), tn(a_C.robleD)); rect(wx - 1, yb - 7, wx + 1, yb - 1, tn(a_C.robleS)); pset(wx, yb - 4, tn(a_C.plomo)); }
  // el cañón de bronce: la culata redonda, los refuerzos y el cascabel, que se pierde hacia la tronera
  R.disco(x, yb - 11, 4, K); R.disco(x, yb - 11, 3, (px, py) => (px + py < x + yb - 13 ? brL : px + py > x + yb - 9 ? brS : br));
  rect(x - 4, yb - 12, x + 4, yb - 12, brS); pset(x, yb - 16, br); pset(x, yb - 17, brS);
  for (let i = -3; i <= 3; i++) if ((i + yb) % 2 === 0) a_tine(R, x + i, yb, K, 0.4);
}

const a_ARM = { hor: 96, parapeto: 124, paseo: 146 };

// lo fijo del puerto de 1588 (en verano: las estaciones se pintan encima): el cielo, las colinas con los campos, el
// castillo artillero, el agua, el parapeto de sillares con dos troneras y el paseo de ronda de losas (a_losas)
function a_armadaFijo(R) {
  const { rect, pset, linea, poligono } = R, { hor, parapeto, paseo } = a_ARM;
  a_cieloFijo(R, hor, a_EST[0].cielo.map(hex), null); const foto = R.buf.slice();
  // las colinas (la máscara de las colinas son los píxeles de a_C.hierba*; se tiñen con la estación)
  const colinas = new Uint8Array(320 * 180);
  for (let x = 0; x < 320; x++) { const top = Math.round(66 + Math.sin(x * 0.022 + 1) * 8 + Math.sin(x * 0.07) * 3);
    for (let y = top; y <= hor + 2; y++) { const lejos = y < top + 3, n = h(x >> 2, y >> 1, 962); pset(x, y, lejos ? a_C.hierbaL : (Math.floor(x / 31) + Math.floor((y - top) / 6)) % 3 === 0 ? a_C.hierbaS : n > 0.8 ? a_C.hierbaD : a_C.hierba); colinas[y * 320 + x] = 1; }
    if (x % 31 === 0) for (let y = top + 2; y < hor; y++) if (y % 2) pset(x, y, a_C.hierbaD); }
  for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 963) * 320), top = Math.round(66 + Math.sin(x * 0.022 + 1) * 8 + Math.sin(x * 0.07) * 3) + 6 + Math.round(h(k, 2, 963) * 12); R.disco(x, top, 2.5, a_C.hierbaD); pset(x - 1, top - 1, a_C.hierbaS); }
  // el castillo artillero en el promontorio de la derecha: torre redonda con almenas, el muro y la puerta
  for (let y = 60; y < 100; y++) { const w = 18; for (let x = 238 - 2; x <= 238 + 2 * w; x++) { if (x > 276) continue; const u = (x - 238) / (2 * w); pset(x, y, u < 0.2 ? a_C.piedraL : u > 0.75 ? a_C.piedraS : (y % 6 === 0 ? a_C.piedraS : a_C.piedra)); } }
  for (let x = 236; x <= 274; x += 4) { rect(x, 56, x + 2, 60, a_C.piedra); rect(x, 56, x, 60, a_C.piedraL); }
  for (const [vx, vy] of [[246, 70], [262, 70], [254, 82]]) rect(vx, vy, vx + 2, vy + 4, hex('#2a2a36'));
  rect(206, 84, 238, 100, a_C.piedraS); rect(206, 84, 238, 85, a_C.piedraL); for (let x = 206; x < 238; x += 4) rect(x, 81, x + 2, 84, a_C.piedra);
  // el agua del puerto
  a_aguaFija(R, 0, hor + 2, 319, parapeto + 2);
  // el parapeto de sillares grandes con dos troneras abocinadas y el remate redondeado
  a_sillares(R, 0, parapeto, 319, paseo - 1, 3);
  for (const [a, b] of [[48, 70], [196, 218]]) { poligono([[a, parapeto - 1], [b, parapeto - 1], [b - 5, paseo - 8], [a + 5, paseo - 8]], hex('#3a3830')); linea(a, parapeto, a + 5, paseo - 8, a_C.piedraL); linea(b, parapeto, b - 5, paseo - 8, a_C.piedraD);
    rect(a + 5, paseo - 8, b - 5, paseo - 1, a_C.piedraS); rect(a + 5, paseo - 8, b - 5, paseo - 8, a_C.piedraL); }
  rect(0, parapeto - 3, 319, parapeto, a_C.piedraL); rect(0, parapeto - 3, 319, parapeto - 3, hex('#e0dacc')); rect(0, parapeto + 1, 319, parapeto + 1, a_C.piedraD);
  for (const [a, b] of [[48, 70], [196, 218]]) rect(a, parapeto - 3, b, parapeto + 1, hex('#3a3830'));
  for (let x = 0; x < 320; x++) if (h(x, 1, 964) > 0.85) pset(x, parapeto + 2 + Math.round(h(x, 2, 964) * 6), hex('#6a7a4a'));
  // el paseo de ronda enlosado, con la sombra del parapeto
  a_losas(R, paseo); for (let x = 0; x < 320; x++) { a_tine(R, x, paseo, C.k, 0.45); if (x % 2) a_tine(R, x, paseo + 1, C.k, 0.3); }
  // el árbol de la izquierda detrás del parapeto: tronco y ramas (la copa va con la estación)
  for (let y = 70; y < parapeto - 3; y++) { const w = y > 100 ? 2 : 1; rect(14 - w, y, 14 + w, y, a_C.robleS); pset(14 - w, y, a_C.robleM); }
  linea(14, 92, 4, 80, a_C.robleS); linea(14, 86, 26, 72, a_C.robleS); linea(14, 80, 8, 68, a_C.robleS); linea(22, 76, 30, 70, a_C.robleS);
  // las colinas son los píxeles de hierba que quedan (no el muro, el castillo ni el árbol): se tiñen con la estación
  const b = R.buf, hierbas = [a_C.hierba, a_C.hierbaS, a_C.hierbaL, a_C.hierbaD]; for (let p = 0; p < (hor + 3) * 320; p++) colinas[p] = hierbas.includes(b[p]) ? 1 : 0;
  a_mascara(R, 'rk-armada', foto); a_MASC.set('rk-armada-colinas', colinas);
}
// ARMADA, GENERAL: un puerto inglés en 1588, desde el paseo de ronda. Horizonte y 96; las colinas y 58–98 con tres
// almenaras encendidas (40, 61), (128, 66), (196, 58); el castillo artillero x 236–276, y 56–100 (bandera en 256, 40);
// el agua y 98–124 con tres barcos grandes desarbolados amarrados (sus cascos asoman por encima del parapeto); el
// parapeto de sillares y 121–145 con dos troneras (x 48–70 y 196–218) y un cañón en cada una; el paseo de ronda y
// 146–180 (los pies en 160); el árbol de la izquierda (x 0–34) marca la estación. Soldados pequeños de fondo en el
// castillo y marineros en los barcos. o.estacion 0–1 (verano → otoño → invierno con nieve → primavera).
function a_armadaPuerto(R, t, o) {
  const { pset } = R, { hor, parapeto, paseo } = a_ARM, S = a_estacion(o.estacion ?? 0);
  const b = a_capa(R, 'rk-armada', () => a_armadaFijo(R)); R.copiar(b);
  const M = a_MASC.get('rk-armada'), MC = a_MASC.get('rk-armada-colinas'), nieve = S.nieve;
  // el cielo de la estación (tramado) donde la capa deja cielo, y las colinas teñidas o nevadas
  for (let y = 0; y <= hor + 2; y++) { const f = y / hor * 3, i = Math.min(2, Math.floor(f)), fr = f - i;
    for (let x = 0; x < 320; x++) { const p = y * 320 + x; if (M[p]) pset(x, y, a_bay(x, y) < fr ? S.cielo[i + 1] : S.cielo[i]);
      else if (MC[p]) { const c = b[p]; let d = a_mezcla(c, S.hierba, 0.45); if (nieve > 0 && a_bay(x, y) < nieve * (c === a_C.hierbaD ? 0.5 : 0.92)) d = (x + y) % 5 === 0 ? hex('#c8d4e0') : hex('#f0f4f8'); pset(x, y, d); } } }
  const tn = (c) => (nieve > 0 ? a_mezcla(c, hex('#a8b4c4'), 0.25 * nieve) : c);
  a_nubes(R, t, hor, (c) => (S.invierno > 0.3 ? a_mezcla(c, hex('#a0a8b4'), 0.4) : c), 1 + S.invierno, M);
  // las almenaras encendidas en las colinas, con su humo
  a_almenara(R, 40, 61, t, 0, 0.7); a_almenara(R, 128, 66, t, 1, 0.6); a_almenara(R, 196, 58, t, 2, 0.6);
  // la bandera de San Jorge en el castillo y los soldados de guardia (morrión, nada en las manos)
  R.rect(256, 40, 256, 56, a_C.robleS); a_sanJorge(R, 257, 40, 10, 6, t, 1, 2, tn);
  for (let k = 0; k < 2; k++) { const u = (Math.sin(t * 0.25 + k * 3) + 1) / 2; a_gente(R, 238 + u * 32, 56, t, k + 2, { s: 0.8, casco: true, anda: Math.abs(Math.cos(t * 0.25 + k * 3)) > 0.2 ? 1.2 : 0, dir: Math.cos(t * 0.25 + k * 3) > 0 ? 1 : -1, c: hex('#8a2a2a') }); }
  // gaviotas en verano y primavera, gansos en uve en otoño
  if (S.invierno < 0.5) for (let k = 0; k < 3; k++) { const x = ((h(k, 1, 965) * 360 + t * (7 + k * 2)) % 360) - 20, y = 34 + k * 8 + Math.sin(t + k) * 3; if (!(x > 270 && y < 48) && !(x > 18 && x < 172 && y < 22)) a_gaviota(R, x, y, t, k); }
  if (S.otono > 0.3) { const x0 = 340 - ((t * 14) % 420); for (let k = 0; k < 7; k++) { const n = Math.ceil(k / 2), x = Math.round(x0 + n * 6), y = 40 + (k % 2 ? 1 : -1) * n * 3; a_gaviota(R, x, y, t + k * 0.2, k, hex('#5a5048'), hex('#3a3430')); } }
  // los tres barcos grandes amarrados y desarbolados (retenidos por orden de la reina), con marineros que esperan
  R.recorte([0, 0, 319, parapeto - 4]);
  a_barco(R, 84, 117, 1.05, t, { k: 1, desarbolado: true, tn });
  a_barco(R, 170, 112, 0.8, t, { k: 2, desarbolado: true, dir: -1, tn });
  a_barco(R, 286, 119, 1.1, t, { k: 3, desarbolado: true, tn });
  for (const [gx, gy, k] of [[78, 106, 1], [172, 103, 2], [292, 107, 3]]) a_gente(R, gx + Math.sin(t * 0.4 + k) * 4, gy, t, k, { s: 0.8, anda: 1, dir: k % 2 ? 1 : -1 });
  R.recorte(null);
  a_aguaVida(R, t, 0, hor + 3, 319, parapeto - 5, 36);
  // la nieve en el remate del parapeto y en el paseo de ronda; la copa del árbol con la estación
  if (nieve > 0) { for (let x = 0; x < 320; x++) { const alto = Math.round(nieve * (2 + h(x >> 2, 1, 966) * 2)); for (let j = 0; j < alto; j++) pset(x, parapeto - 4 - j + 1, j === alto - 1 ? C.blanco : hex('#e4ecf4')); }
    for (let y = paseo; y < 180; y++) for (let x = 0; x < 320; x++) if (a_bay(x, y) < nieve * (0.55 + h(x >> 3, y >> 2, 967) * 0.4)) pset(x, y, (x + y) % 7 === 0 ? hex('#c8d4e4') : hex('#eef2f8')); }
  { const hoja = S.invierno > 0.6 ? null : S.hoja, dens = 1 - S.invierno * 0.9;
    for (const [cx, cy, r] of [[14, 72, 12], [4, 78, 9], [28, 70, 9], [10, 62, 9], [22, 62, 8]]) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue; const x = cx + i, y = cy + j, n = h(x, y, 968);
      if (n > dens) continue; const lz = -i - j + Math.sin(t * 1.5 + x * 0.3) * 2; pset(x, y, hoja ? (S.primavera > 0.5 && n > 0.86 ? hoja[2] : lz > r * 0.5 ? hoja[2] : lz > -r * 0.3 ? hoja[1] : hoja[0]) : (n > 0.5 ? C.blanco : a_C.robleS)); } }
  // las pirámides de balas, un barril de pólvora, los cañones en sus troneras (por encima de la nieve) y lo que cae
  for (const bx of [80, 228]) for (let f = 0; f < 3; f++) for (let i = 0; i < 3 - f; i++) { const px = bx + i * 4 + f * 2, py = paseo + 6 - f * 3; R.disco(px, py, 1.8, hex('#2a2a30')); pset(px - 1, py - 1, nieve > 0.5 && f === 2 - 0 ? C.blanco : hex('#6a6a78')); }
  a_barril(R, 32, paseo + 8, 2); if (nieve > 0.4) R.linea(28, paseo - 2, 36, paseo - 2, C.blanco);
  a_canon(R, 59, paseo + 4, t, 1, tn); a_canon(R, 207, paseo + 4, t, 1, tn);
  a_cae(R, t, S, 0, 320, 20, 180);
  return { suelo: 160, libre: [30, 250], troneras: [[48, 70], [196, 218]], canones: [[59, paseo + 4], [207, paseo + 4]], almenaras: [[40, 61], [128, 66], [196, 58]], parapeto, horizonte: hor, nieve: Math.round(nieve * 100) / 100 };
}

// ARMADA, DELANTE: la rueda y el extremo de una cureña en la esquina de abajo a la derecha (x 284–319), con nieve en invierno
function a_armadaDelante(R, t, o) {
  const { rect, pset } = R, S = a_estacion(o.estacion ?? 0);
  rect(284, 166, 319, 172, C.k); rect(285, 167, 319, 171, a_C.robleM); rect(285, 167, 319, 167, a_C.robleL);
  for (let a = 0; a < Math.PI * 2; a += 0.04) for (const r of [9, 10]) pset(Math.round(300 + Math.cos(a) * r), Math.round(174 + Math.sin(a) * r), r === 10 ? C.k : a_C.robleD);
  for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; R.linea(300, 174, Math.round(300 + Math.cos(a) * 8), Math.round(174 + Math.sin(a) * 8), a_C.robleS); } R.disco(300, 174, 2.5, a_C.plomo);
  if (S.nieve > 0.3) for (let x = 286; x < 320; x++) pset(x, 166, C.blanco);
  return {};
}

// ARMADA, CÁMARA 'horizonte': el canal de la Mancha desde lo alto de un acantilado blanco. Horizonte y 96; la cima de
// hierba x 0–214, y 154–180 (pies en 170) con ovejas que pacen, tojos en flor y la almenara encendida en (192, 118) con su
// humo; el borde del acantilado cae a la derecha (cara de creta x 200–262); a lo lejos, otros acantilados blancos; en el
// horizonte, la media luna de la Armada (velas blancas con el aspa roja de Borgoña) y, más cerca, dos barcos ingleses
// (canon) que la siguen. o.avance 0–1: la media luna cruza de derecha a izquierda; o.derrota 0–1: se deshace y las velas se
// dispersan con el viento (sin fuego ni naufragios). La cima lleva sendero, leña y pedernal (a_horizonteCima); el mar,
// brillos del sol, sombras de nubes y espuma, y un cernícalo (a_horizonteVida). Devuelve armada: [x, y] (el centro de la
// media luna).
function a_horizonte(R, t, o) {
  const { rect, pset, linea, poligono } = R, hor = 96, av = a_lim(o.avance ?? 0.5), der = a_lim(o.derrota ?? 0);
  R.copiar(a_capa(R, 'rk-horizonte', () => {
    a_cieloFijo(R, hor, [a_C.cieloA, a_C.cieloB, a_C.cieloC, hex('#c8dcea')], [70, 36]); const foto = R.buf.slice();
    // los acantilados lejanos a la izquierda: caras de creta con su cima verde, cada vez más pálidos
    for (const [x0, x1, top, k] of [[96, 150, 86, 0.55], [40, 110, 82, 0.35], [-10, 60, 76, 0.15]]) for (let x = x0; x < x1; x++) { const tt = Math.round(top + (x - x0) * 0.08 + Math.sin(x * 0.2) * 1), base = hor + 8 + Math.round((x1 - x) * 0.05);
      for (let y = tt; y < base; y++) pset(x, y, a_mezcla(y < tt + 2 ? a_C.hierba : (x * 3 + y) % 11 === 0 ? a_C.cretaD : (x % 7 === 0 ? a_C.cretaS : a_C.creta), hex('#c8dcea'), k)); }
    // el mar: del azul gris del horizonte al verde oscuro de abajo, con sus rayas
    a_degradado(R, 0, hor, 319, 179, [hex('#7aa0b8'), hex('#4a809a'), hex('#2e6474'), hex('#24505e')]);
    for (let k = 0; k < 70; k++) { const f = h(k, 5, 970), y = Math.round(hor + 6 + f * f * 76), x = Math.round(h(k, 6, 970) * 320); pset(x, y, a_C.aguaL); pset(x + 1, y, C.blanco); if (f > 0.5) pset(x + 2, y, a_C.aguaL); }
    for (let k = 0; k < 160; k++) { const f = h(k, 1, 970) ** 1.4, y = Math.round(hor + 2 + f * 82), x = Math.round(h(k, 2, 970) * 320); linea(x, y, x + 2 + Math.round(f * 9), y, f > 0.5 ? a_C.aguaC : a_C.aguaA); }
    // la cara del acantilado que cae a la derecha: creta blanca con grietas y capas de pedernal
    poligono([[198, 154], [214, 156], [236, 166], [262, 180], [200, 180]], (x, y) => (h(x >> 1, y, 971) > 0.88 ? a_C.cretaD : (y % 7 === 0 && h(x >> 3, y, 972) > 0.4) ? hex('#4a4a50') : x > 230 + (y - 166) ? a_C.cretaS : a_C.creta));
    for (let k = 0; k < 6; k++) { const x = 212 + k * 8; linea(x, 158 + k, x + 6, 180, a_C.cretaS); }
    // la cima de hierba: matas, florecillas y la sombra
    for (let x = 0; x < 216; x++) { const top = Math.round(154 + Math.sin(x * 0.05) * 1.5 + (x > 196 ? (x - 196) * 0.5 : 0));
      for (let y = top; y < 180; y++) { const n = h(x, y, 973); pset(x, y, y < top + 2 ? a_C.hierbaL : n > 0.9 ? a_C.hierbaD : n > 0.6 ? a_C.hierbaS : (x + y) % 9 === 0 ? a_C.hierbaL : a_C.hierba); } }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 3, 974) * 200), y = 160 + Math.round(h(k, 4, 974) * 18); pset(x, y, [C.blanco, hex('#f0d040'), hex('#c8a0e0')][k % 3]); }
    // los tojos en flor
    for (const [tx, ty] of [[148, 158], [6, 162]]) { for (let j = -5; j <= 0; j++) for (let i = -9; i <= 9; i++) if (i * i / 81 + j * j / 30 < 1) pset(tx + i, ty + j, h(tx + i, ty + j, 975) > 0.7 ? hex('#f0c830') : h(tx + i, ty + j, 976) > 0.5 ? a_C.hierbaD : a_C.hierbaS); }
    // el poste de la almenara y las piedras que lo calzan
    rect(191, 118, 192, 158, a_C.robleS); rect(193, 120, 193, 158, a_C.robleD); for (const [px, py] of [[186, 158], [196, 158], [190, 160]]) { R.disco(px, py, 2.5, a_C.piedraS); pset(px - 1, py - 1, a_C.piedraL); }
    linea(192, 126, 182, 158, a_C.robleD); linea(192, 126, 202, 158, a_C.robleD);
    a_horizonteCima(R);
    a_mascara(R, 'rk-horizonte', foto);
  }));
  a_nubes(R, t, hor, undefined, 1, a_MASC.get('rk-horizonte'));
  // el mar que se mueve: brillos y, con la derrota, rachas de viento que barren el agua
  a_aguaVida(R, t, 0, hor + 2, 319, 179, 70);
  a_horizonteVida(R, t, hor);
  if (der > 0) for (let k = 0; k < 10; k++) { const y = hor + 6 + k * 7, x = ((t * 90 + k * 53) % 420) - 60, l = 20 + k * 2; if (h(k, Math.floor(t), 977) < der) linea(Math.round(x), y, Math.round(x + l), y - 1, a_C.cieloD); }
  // la media luna de la Armada y, más cerca, dos barcos ingleses que la siguen; humo de almenaras lejanas en la costa
  R.recorte([0, 0, 319, 153]);
  const armada = a_mediaLuna(R, t, av, der, hor);
  for (const [k, dx] of [[1, 40], [2, 78]]) { const x = 330 - av * 210 + dx + (der > 0 ? -der * 30 : 0); a_barco(R, x, 124 + k * 6, 0.42 + k * 0.05, t, { k, dir: -1 }); }
  R.recorte(null);
  a_cernicalo(R, t);
  for (const [x, y, k] of [[132, 84, 5], [70, 79, 6]]) a_humo(R, x, y, t, k, 22, -0.4, [hex('#c0c4c8'), hex('#9aa0a8')]);
  // la almenara encendida, con su humo que se tumba hacia la izquierda
  a_almenara(R, 192, 118, t, 3, 1.3);
  // las ovejas que pacen (bajan y suben la cabeza) y las gaviotas
  for (const [sx, k] of [[30, 0], [52, 1], [118, 2]]) { const x = sx + Math.round(Math.sin(t * 0.2 + k * 2) * 3), y = 162 + k * 2, cab = Math.sin(t * 0.9 + k * 2) > 0 ? 2 : 0;
    rect(x - 4, y - 5, x + 4, y - 1, a_C.lana); rect(x - 4, y - 1, x + 4, y - 1, a_C.lanaS); rect(x - 3, y - 6, x + 3, y - 6, C.blanco); for (const lx of [-3, -1, 2, 3]) rect(x + lx, y, x + lx, y + 1, hex('#3a3430'));
    rect(x - 7, y - 5 + cab, x - 5, y - 3 + cab, hex('#3a3430')); pset(x - 5, y - 6 + cab, hex('#3a3430')); }
  for (let k = 0; k < 4; k++) { const x = ((h(k, 1, 978) * 360 - t * (6 + k * 2)) % 360 + 360) % 360 - 20, y = 50 + k * 12 + Math.sin(t * 0.9 + k) * 5; if (!(x > 270 && y < 48)) a_gaviota(R, x, y, t, k); }
  return { suelo: 170, libre: [20, 140], armada, almenara: [192, 118], horizonte: hor, borde: 214 };
}
// HORIZONTE, DELANTE: matas de hierba que se mecen en el borde de abajo (y 170–180) y un tojo en la esquina izquierda
function a_horizonteDelante(R, t, o) {
  for (let k = 0; k < 26; k++) { const x = Math.round(4 + k * 8.3 + h(k, 1, 979) * 4); if (x > 212) break; const alto = 5 + Math.round(h(k, 2, 979) * 5), m = Math.sin(t * 2.2 + x * 0.15);
    for (let j = 0; j < alto; j++) { const dx = Math.round(m * j / alto * 2); R.pset(x + dx, 179 - j, j > alto - 3 ? a_C.hierbaL : a_C.hierbaS); R.pset(x + dx + 2, 179 - j + 1, a_C.hierba); } }
  return {};
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
  dia: { cielo: [[0, '#3a74b8'], [0.25, '#4a86c6'], [0.5, '#66a0d6'], [0.72, '#8cbae2'], [0.88, '#b0d0ea'], [1, '#d0e2ee']],
    nubes: ['#98aec6', '#d6e2ee', '#ffffff'], veta: ['#c4dcee', '#78a4ce'], lluvia: '#8aa0b8', sol: [228, 36],
    mar: ['#80aac6', '#568eb4', '#38729e', '#265a88', '#a8cee6', '#1a4068', '#eef6f8', '#ffffff'], tinte: null },
  tarde: { cielo: [[0, '#38386c'], [0.24, '#58447e'], [0.48, '#925678'], [0.7, '#ca7864'], [0.88, '#eaa266'], [1, '#f6c886']],
    nubes: ['#684670', '#c2766a', '#f6be88'], veta: ['#f0b47a', '#84506e'], lluvia: '#84506e', sol: [72, -14],
    mar: ['#c68c7a', '#8c6480', '#5e4e78', '#3e3c66', '#f2b282', '#2a2a50', '#f6d8b0', '#fff2c8'], tinte: ['#e0905c', 0.2] },
  gris: { cielo: [[0, '#465260'], [0.2, '#525e6c'], [0.42, '#626e7a'], [0.64, '#78848e'], [0.84, '#949ea6'], [1, '#aab2b8']],
    nubes: ['#46505c', '#626c78', '#8a949e'], veta: ['#8c96a0', '#56606c'], lluvia: '#56606c',
    mar: ['#8a969e', '#68767f', '#4e5e6b', '#3a4c5b', '#9eaab2', '#283846', '#d8e0e2', '#f4f8f8'], tinte: ['#6a7480', 0.14] },
  noche: { cielo: [[0, '#0a0e24'], [0.3, '#10183a'], [0.6, '#1a264c'], [0.85, '#283a64'], [1, '#3a4e78']],
    nubes: ['#121830', '#222c4a', '#3e4a72'], veta: ['#2a3658', '#0e1430'], lluvia: '#2a3456', luna: [234, 34],
    mar: ['#34466c', '#26385c', '#1a2a4a', '#122038', '#4a6290', '#0a1428', '#8a9cc4', '#e0e8f6'], tinte: ['#1a2248', 0.5] },
  tormenta: { cielo: [[0, '#181c24'], [0.3, '#222832'], [0.6, '#2e3640'], [0.85, '#3e4652'], [1, '#525c66']],
    nubes: ['#14181f', '#2a303a', '#4a525e'], veta: ['#3a424e', '#1c2028'], lluvia: '#6a7480',
    mar: ['#56666c', '#3c4c54', '#2a3a44', '#1c2a34', '#6c7e86', '#101a22', '#c4d0d4', '#eef4f4'], tinte: ['#2a323e', 0.3] },
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
    if (L.luna) { const [mx, my] = L.luna;
      // las estrellas (nunca en las zonas tranquilas) y la luna con su halo
      for (let k = 0; k < 120; k++) { const x = Math.round(h(k, 1, 815) * 319), y = Math.round(h(k, 2, 815) ** 1.4 * (hor - 6)); if (b_quieta(x, y) || Math.hypot(x - mx, y - my) < 14) continue;
        B[y * 320 + x] = h(k, 3, 815) > 0.7 ? hex('#f4f0dc') : hex('#8a94c0'); if (k % 11 === 0 && y > 2) { B[(y - 1) * 320 + x] = hex('#6a74a0'); B[(y + 1) * 320 + x] = hex('#6a74a0'); B[y * 320 + x - 1] = hex('#6a74a0'); B[y * 320 + x + 1] = hex('#6a74a0'); } }
      R.halo(mx, my, 22, [hex('#1e2a50'), hex('#2c3a66'), hex('#3e4e7e')], 0.9);
      R.disco(mx, my, 6, hex('#e8e4c8')); R.disco(mx + 2, my - 1, 5, hex('#f6f2dc')); R.pset(mx - 2, my + 1, hex('#c8c4a8')); R.pset(mx + 1, my + 2, hex('#d4d0b4')); R.pset(mx - 3, my - 2, hex('#cfcab0')); }
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
  if (luz === 'gris' || luz === 'tormenta') for (let k = 0; k < 4; k++) { const W = 420, cx = ((h(k, 1, 830) * W + t * 1.2 * v) % W) - 50, w = 12 + h(k, 2, 830) * 16, y0 = hor - 26 + Math.round(h(k, 3, 830) * 6) + off;
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

// copia con transparencia: los píxeles a 0 del búfer b no se copian; dx, dy lo desplazan; y0–y1 limitan las filas
function b_blit(R, b, dx = 0, dy = 0, y0 = 0, y1 = 180) {
  const B = R.buf; dx |= 0; dy |= 0;
  for (let y = Math.max(0, y0, dy); y < Math.min(180, y1, 180 + dy); y++) { const f = y * 320, g = (y - dy) * 320;
    for (let x = Math.max(0, dx); x < Math.min(320, 320 + dx); x++) { const c = b[g + x - dx]; if (c) B[f + x] = c; } }
}

// limita v a 0–1
const b_01 = (v) => Math.max(0, Math.min(1, v));

// suaviza un paso 0–1
const b_suave = (u) => { u = b_01(u); return u * u * (3 - 2 * u); };

// los colores del galeón inglés de 1587 (canon) y del barco pirata francés: casco (oscuro → claro), lona (sombra →
// luz), decoración (los castillos pintados a rombos y la bandera)
const B_GAL = {
  ingles: { casco: ['#2a1a10', '#3e2818', '#5a3a24', '#7a5434', '#9a7048'], lona: ['#a8987a', '#c4b496', '#e8dcc0', '#f8f0de'], deco: ['#3a6a4a', '#e8dcc0', '#c8a040', '#2a4e36'] },
  pirata: { casco: ['#0c0a0e', '#18161c', '#24212a', '#34303a', '#4a4652'], lona: ['#56585e', '#72747a', '#93959b', '#b0b2b8'], deco: ['#24346a', '#c8a040', '#8a6a2a', '#182450'] },
};

// EL GALEÓN DE 1587 (canon), de costado: x el centro, yw la flotación, s la escala (1 = unos 100 px de eslora sin el
// bauprés y 100 de alto hasta la bandera). El casco de madera parda a tracas con dos cintones, las portas con sus
// cañoncitos, el castillo de popa alto con las ventanas y el farol y el de proa, pintados a rombos verdes y crudos, el
// espolón y el bauprés; tres palos con cofas: mayor y trinquete con velas cuadradas (la CRUZ ROJA DE SAN JORGE en la mayor)
// y mesana latina; la jarcia; en el tope, la bandera blanca con la cruz roja que ondea, y gallardetes. Gente pequeña en
// cubierta (si s ≥ 0,6). o.dir (1 la proa a la derecha), o.cab (cabeceo en radianes, + sube la proa), o.velas 'llenas' |
// 'recogidas' (aferradas en las vergas, para fondear o capear), o.pirata (casco negro, velas grises, bandera azul con
// flores de lis doradas, sin cruz ni calaveras), o.tn (la luz), o.noche (faroles y ventanas encendidos), o.k (semilla).
// Devuelve { P(dx, dy) (del barco a la pantalla), proa, popa, centro, escoben, tope }.
function b_galeon(R, x, yw, s, t, o = {}) {
  const dir = o.dir ?? 1, th = (o.cab ?? 0) * dir, cs = Math.cos(th), sn = Math.sin(th), tn = o.tn ?? ((c) => c), k = o.k ?? 0;
  const G = B_GAL[o.pirata ? 'pirata' : 'ingles'], K = G.casco.map((c) => tn(hex(c))), L = G.lona.map((c) => tn(hex(c))), D = G.deco.map((c) => tn(hex(c)));
  const P = (dx, dy) => { const u = dx * dir; return [x + s * (u * cs + dy * sn), yw + s * (-u * sn + dy * cs)]; };
  const ps = (dx, dy, c) => { const p = P(dx, dy); R.pset(Math.round(p[0]), Math.round(p[1]), c); };
  const ln = (a, b, c, ancho = 0) => { const p = P(a[0], a[1]), q = P(b[0], b[1]); R.linea(Math.round(p[0]), Math.round(p[1]), Math.round(q[0]), Math.round(q[1]), c); if (ancho) R.linea(Math.round(p[0]) + 1, Math.round(p[1]), Math.round(q[0]) + 1, Math.round(q[1]), c); };
  const st = Math.min(0.7, 0.62 / s), rojo = tn(C.sanJorge), rojoS = tn(hex('#8a1c24')), hierro = tn(hex('#2a2a30')), luzF = hex('#ffd870');
  // el perfil: la borda (arriba) a lo largo de la eslora y los límites de popa y proa por altura
  const top = (dx) => (dx < -31 ? -32 - (-31 - dx) * 0.12 : dx < -15 ? -24 : dx < 23 ? -16 + ((dx - 4) / 19) ** 2 * 0.8 : dx < 41 ? -22 : -17);
  const dxMin = (dy) => -47 + dy * 0.1, dxMax = (dy) => (dy > -17 ? 44 - dy * 0.45 - (dy > -2 ? (dy + 2) * 1.5 : 0) : 52);
  // EL CASCO, fila a fila
  for (let dy = -36; dy <= 3; dy += st) for (let dx = dxMin(dy); dx <= dxMax(dy); dx += st) {
    const tp = top(dx); if (dy < tp) continue;
    const yi = Math.floor(dy), borde = dy - tp < 1.2, castillo = (dx < -31 && dy < -25) || (dx > 23 && dx < 41 && dy < -17) || (dx > -31 && dx < -15 && dy < -18);
    let c;
    if (borde) c = K[4];
    else if (castillo) { const cx = Math.floor((dx + 60) / 3), cy = Math.floor((dy + 40) / 3); c = (dy - tp < 2.4) ? ((Math.floor(dx) & 1) ? K[1] : K[3]) : ((cx + cy) & 1) ? D[0] : D[1]; if (((cx + cy) & 1) && h(cx, cy, 901) > 0.8) c = D[2]; }
    else if (yi === -8 || yi === -13 || yi === -2) c = K[0];
    else if (yi === -9 || yi === -14 || yi === -3) c = K[3];
    else if (dy > -7) { c = (yi % 3 === 0) ? K[0] : b_umbral(Math.round(dx * 2), yi) < (dy + 7) / 7 ? K[1] : K[2]; if (h(Math.floor(dx / 5), yi, 903 + k) > 0.9) c = K[3]; }
    else { c = (yi % 3 === 0) ? K[1] : dy < -10 ? K[3] : K[2]; if (h(Math.floor(dx / 5), yi, 902 + k) > 0.86) c = K[1]; }
    ps(dx, dy, c);
  }
  // las portas con los cañoncitos (sin disparar) y la porta abierta con su tapa roja
  for (let dx = -24; dx <= 30; dx += 9) { ps(dx, -11, K[0]); ps(dx + 1, -11, K[0]); ps(dx, -10, K[0]); ps(dx + 1, -10, K[0]); if (s > 0.6) { ps(dx + 0.5 * dir, -10.5, hierro); ps(dx, -12, rojoS); ps(dx + 1, -12, rojoS); } }
  // las ventanas de popa (encendidas de noche) y el farol de popa en su pescante
  for (let i = 0; i < 3; i++) { const vx = -44 + i * 4; ps(vx, -30, o.noche ? luzF : K[0]); ps(vx + 1, -30, o.noche ? luzF : K[0]); ps(vx, -29, o.noche ? hex('#e8a040') : K[0]); ps(vx + 1, -29, o.noche ? hex('#e8a040') : K[0]); }
  ln([-48, -34], [-50, -40], K[0]); { const p = P(-50.5, -42); const fx = Math.round(p[0]), fy = Math.round(p[1]), parp = o.noche && Math.sin(t * 7 + k) > -0.5;
    if (o.noche && s > 0.4) R.halo(fx, fy, 8 * s + 3, [hex('#3a3050'), hex('#7a6040'), hex('#c89048')], 0.8);
    R.pset(fx, fy, parp ? luzF : D[2]); R.pset(fx, fy - 1, D[2]); if (s > 0.6) { R.pset(fx - 1, fy, D[2]); R.pset(fx + 1, fy, D[2]); R.pset(fx, fy + 1, parp ? hex('#e8a040') : D[2]); R.pset(fx, fy - 2, K[0]); } }
  // el espolón (la proa en pico, con su rejilla) y el bauprés
  for (let i = 0; i < 12; i += st) { const a = i / 12; for (let j = 0; j < 3 - a * 2; j += st) ps(44 + i, -15 - a * 3 + j, j < 0.8 ? K[4] : K[2]); }
  ln([44, -20], [74, -36], K[1], s > 0.7 ? 1 : 0); ln([45, -21], [74, -37], K[3]);
  // los palos: [dx, pie, tope, cofa]
  const PALOS = [[4, -16, -100, -70], [30, -22, -84, -61], [-26, -24, -68, 0]];
  for (const [mx, pie, tope] of PALOS) { ln([mx, pie], [mx, tope], K[1]); ln([mx + 0.8, pie], [mx + 0.8, tope + 2], K[3]); }
  // la jarcia: obenques a cada banda y los estays (detrás de las velas)
  const cj = tn(hex('#3a2e24'));
  for (const [mx, pie, tope, cofa] of PALOS) { const alto = cofa || tope + 6; for (const d of [-7, -4, 4, 7]) ln([mx + d, top(mx + d) + 1], [mx + d * 0.15, alto], cj); }
  ln([30, -84], [72, -36], cj); ln([4, -100], [30, -61], cj); ln([4, -70], [32, -24], cj); ln([-26, -68], [4, -40], cj); ln([4, -100], [-46, -34], cj);
  // LAS VELAS
  const vela = (cx, y0, y1, w0, w1, cruz, ki) => {
    const llenas = (o.velas ?? 'llenas') !== 'recogidas';
    if (!llenas) { // aferrada en la verga: un rollo de lona con sus tomadores
      for (let i = -w0 / 2; i <= w0 / 2; i += st) { const sag = 1.2 * (1 - (2 * i / w0) ** 2); ps(cx + i, y0 + 0.5 + sag, L[2]); ps(cx + i, y0 + 1.5 + sag, (Math.floor(i) % 4 === 0) ? K[1] : L[1]); ps(cx + i, y0 - 0.5, K[1]); }
      return; }
    const fl = Math.sin(t * 2.3 + ki * 1.7 + k) * 0.6;
    for (let dy = y0; dy <= y1; dy += st) { const v = (dy - y0) / (y1 - y0), w = w0 + (w1 - w0) * v, panza = Math.sin(v * Math.PI) * 3.2 + fl * v;
      for (let i = -w / 2; i <= w / 2; i += st) { const u = (i + w / 2) / w, cur = Math.sin(u * Math.PI);
        const yy = dy + (v > 0.92 ? -(1 - cur) * 2.4 : 0); if (v > 0.92 && dy > y1 - (1 - cur) * 2.4) continue;
        const dxs = cx + i + panza * cur * 0.6;
        let c = u < 0.08 || u > 0.94 ? L[0] : u > 0.62 ? L[3] : u > 0.24 ? L[2] : L[1];
        if (v < 0.06) c = L[0]; else if (Math.floor(i + 40) % 4 === 0 && c !== L[0]) c = c === L[3] ? L[2] : L[1];
        if (Math.abs(v - 0.3) < 0.03 && Math.floor(i) % 2 === 0) c = L[0];
        if (cruz) { const bx = Math.abs(i) < w * 0.07, by = Math.abs(v - 0.46) < 0.08; if (bx || by) c = u > 0.62 ? rojo : (bx && by) ? rojo : (Math.floor(i + 40) % 4 === 0 ? rojoS : rojo); }
        ps(dxs, yy, c); } }
    ln([cx - w0 / 2 - 1, y0], [cx + w0 / 2 + 1, y0], K[0]);
  };
  vela(30, -79, -64, 20, 24, false, 3); vela(30, -58, -27, 30, 36, false, 2);
  vela(4, -96, -73, 24, 30, false, 1); vela(4, -66, -22, 40, 48, !o.pirata, 0);
  // la mesana latina: la entena en diagonal y la vela en triángulo
  ln([-46, -38], [-10, -74], K[1]);
  if ((o.velas ?? 'llenas') !== 'recogidas') { for (let a = 0; a <= 1; a += st / 30) for (let b2 = 0; b2 <= 1 - a; b2 += st / 30) { const dx = -44 + a * 34 + b2 * 18, dy = -40 - a * 33 + b2 * 14; ps(dx + Math.sin(b2 * Math.PI) * 1.5, dy, b2 < 0.05 ? L[0] : a + b2 > 0.94 ? L[0] : (Math.floor(dx) % 4 === 0 ? L[1] : L[2])); } }
  else for (let a = 0; a <= 1; a += st / 36) ps(-45 + a * 34, -38.5 - a * 34, L[2]);
  // la cebadera bajo el bauprés
  if ((o.velas ?? 'llenas') !== 'recogidas') for (let dy = -30; dy <= -21; dy += st) for (let i = -6; i <= 6; i += st) ps(62 + i + (dy + 30) * 0.2, dy, Math.abs(i) > 5 ? L[0] : i > 1 ? L[3] : L[2]);
  // las cofas
  for (const [mx, , , cofa] of PALOS) if (cofa) for (let dy = cofa - 2; dy <= cofa; dy += st) for (let i = -3.5; i <= 3.5; i += st) ps(mx + i, dy, dy < cofa - 1.2 ? K[4] : Math.floor(i) % 2 ? K[1] : K[2]);
  // la bandera del tope (blanca con la cruz roja; la pirata, azul con flores de lis doradas) y gallardetes
  const tope = P(4, -100), bw = 13, bh = 8;
  for (let i = 0; i < bw; i += st) for (let j = 0; j < bh; j += st) { const ond = Math.sin(t * 6 - i * 0.55 + k) * (i / bw) * 1.6, X = tope[0] + (i + 1) * s * dir, Y = tope[1] + (j + ond) * s;
    let c; if (o.pirata) { c = D[0]; const fi = Math.floor(i) % 5, fj = Math.floor(j) % 4; if ((fi === 2 && fj < 3) || (fj === 1 && fi > 0 && fi < 4)) c = D[1]; }
    else { c = tn(hex('#f4efe4')); if (Math.abs(i - bw * 0.42) < 1.3 || Math.abs(j - bh / 2 + 0.5) < 1.2) c = rojo; if (i > bw - 1.5) c = tn(hex('#c8c0b0')); }
    R.pset(Math.round(X), Math.round(Y), c); }
  for (const [mx, , tp2] of [PALOS[1], PALOS[2]]) { const p = P(mx, tp2); for (let i = 0; i < 9; i++) R.pset(Math.round(p[0] + (i + 1) * s * dir), Math.round(p[1] + Math.sin(t * 7 - i * 0.7 + mx) * 1.2 * (i / 9) * s + i * 0.15), i % 3 === 0 ? tn(hex('#f4efe4')) : rojo); }
  // gente pequeña en cubierta: marineros que van y vienen y uno en la cofa
  if (s >= 0.6) { const pc = [tn(hex('#e8c098')), tn(hex('#6a4a3a')), tn(hex('#3a4a6a')), tn(hex('#8a3a2a'))];
    for (let i = 0; i < 3; i++) { const dx = -8 + i * 10 + Math.sin(t * 0.7 + i * 2 + k) * 6, base = top(dx) - 0.5;
      for (let j = 1; j <= 4; j++) ps(dx, base - j, j === 4 ? pc[0] : pc[1 + (i % 3)]); }
    ps(4.6, -73, pc[0]); ps(4.6, -72, pc[3]); }
  return { P, proa: P(74, -36), popa: P(-48, -34), centro: P(0, -40), escoben: P(43, -10), tope: P(4, -100), cubierta: (dx) => P(dx, top(dx)) };
}

// la línea de flotación de un barco: la sombra en el agua, la espuma que lame el casco, la ola de proa y la estela
// (marcha 0–1: cuánto avanza; 0 fondeado)
function b_flotacion(R, t, Bq, s, dir, Pm, marcha = 1) {
  const esp = Pm[6], br = Pm[7], osc = hex('#141820');
  for (let dx = -46; dx <= 46; dx += 0.6 / s) { const p = Bq.P(dx, 2.2), X = Math.round(p[0]), y0 = Math.round(p[1] + Math.sin(X * 0.45 + t * 3.1) * 0.6 * s);
    for (let y = y0; y < y0 + 4 * s + 1; y++) R.pset(X, y, b_mezcla(R.pget(X, y), osc, 0.4 - (y - y0) / (4 * s + 1) * 0.3));
    if (h(X, Math.floor(t * 6), 860) < 0.35 + (dx * dir > 36 ? 0.5 : 0)) R.pset(X, y0 - 1, h(X, 1, Math.floor(t * 5)) > 0.5 ? esp : br); }
  if (marcha <= 0) return;
  const r = Bq.P(46, 0);
  for (let i = 0; i < 20 * s; i++) { const u = i / (20 * s), a = h(i, Math.floor(t * 8), 862); R.pset(r[0] - dir * u * 26 * s + (a - 0.5) * 3, r[1] - (1 - u) * 3 * s * marcha + a * 2, a > 0.4 ? esp : br); }
  const pp = Bq.P(-46, 2);
  for (let i = 0; i < 60 * s * marcha; i++) { const u = i / (60 * s), xx = pp[0] - dir * u * 70 * s, w = 2 + u * 8 * s;
    for (let j = -w; j <= w; j += 1) { const a = h(Math.floor((xx + t * 14 * dir) / 3), Math.round(j), 864); if (a > 0.55 + u * 0.35) R.pset(xx, pp[1] + j * 0.3 + Math.sin(xx * 0.3 + t) * 0.6, a > 0.85 ? br : esp); } }
}

// los delfines: n que saltan en arco (lejos, entre x0 y x1, a la altura y), cada uno a su ritmo, con su chapoteo
function b_delfines(R, t, n, x0, x1, y, tn, Pm) {
  const lomo = tn(hex('#4a5a6a')), vientre = tn(hex('#9aaab8')), esp = Pm[6];
  for (let k = 0; k < n; k++) { const per = 3.2 + k * 0.7, u = ((t + k * 1.3) % per) / 1.1, cx = x0 + ((h(k, 1, 880) * (x1 - x0) + t * 9) % (x1 - x0)), cy = y + k * 5;
    if (u > 1.4) continue;
    if (u <= 1) { const a = u * Math.PI, X = cx + (u - 0.5) * 16, Y = cy - Math.sin(a) * 7, ang = Math.cos(a);
      for (let i = -4; i <= 4; i++) { const xx = Math.round(X + i), yy = Math.round(Y - i * ang * 0.5 + (i * i) * 0.04); R.pset(xx, yy, lomo); R.pset(xx, yy + 1, i > -3 ? vientre : lomo); }
      R.pset(Math.round(X - 1), Math.round(Y - 1 + ang * 0.5), lomo); R.pset(Math.round(X + 5), Math.round(Y - 2.5 * ang), lomo); R.pset(Math.round(X - 5), Math.round(Y + 2.5 * ang - 1), lomo); }
    // el chapoteo al entrar y al salir
    for (const [ux, uu] of [[-8, u], [8, u - 0.95]]) if (uu >= 0 && uu < 0.4) for (let i = 0; i < 6; i++) { const r2 = uu * 12; R.pset(Math.round(cx + ux + Math.cos(i) * r2), Math.round(cy - Math.abs(Math.sin(i * 2.3)) * (3 - uu * 6)), esp); }
  }
}

// la ballena lejana: el lomo que asoma y, cada pocos segundos, el soplo que sube y se deshace con el viento
function b_ballena(R, t, x, y, tn, Pm) {
  const per = 7, u = (t % per) / per, lomo = tn(hex('#2a3640')), luz = tn(hex('#4a5866'));
  if (u < 0.55) { const a = Math.sin(u / 0.55 * Math.PI); for (let i = -6; i <= 6; i++) { const alto = Math.round(a * 2.6 * (1 - (i / 7) ** 2)); for (let j = 0; j < alto; j++) R.pset(x + i, y - j, j === alto - 1 ? luz : lomo); }
    if (u > 0.4) { R.pset(x - 9, y - 1, lomo); R.pset(x - 10, y - 2, lomo); R.pset(x - 8, y - 2, lomo); } }
  if (u > 0.08 && u < 0.4) { const v = (u - 0.08) / 0.32, alto = 10 * Math.min(1, v * 3), ab = v * 5;
    for (let j = 0; j < alto; j++) for (let i = -1; i <= 1; i++) if (h(i, j, Math.floor(t * 8)) > 0.3 + v * 0.5) R.pset(Math.round(x + 2 + i * (1 + j / alto * ab * 0.4) + j * v * 0.4), y - 3 - j, j > alto - 3 ? Pm[7] : Pm[6]); }
  for (let i = -8; i <= 8; i += 2) if (h(i, Math.floor(t * 4), 885) > 0.5) R.pset(x + i, y + 1, Pm[6]);
}

// la nube de humo de un cañonazo al aire (u 0–1: nace, crece y se va con el viento), sin fogonazo de cerca
function b_humoCanon(R, x, y, u, tn) {
  if (u <= 0 || u >= 1) return; const c = [tn(hex('#8a8a8c')), tn(hex('#b8b8b6')), tn(hex('#e0dfda'))];
  for (let i = 0; i < 6; i++) { const r = (2 + i * 0.6) * Math.min(1, u * 4) * (1 + u), cx = x + i * 3 * u + u * 18, cy = y - i * 1.6 - u * 8;
    if (u > 0.6 + i * 0.05) continue; b_ovalo(R, cx, cy + 1, r, r * 0.8, c[0]); b_ovalo(R, cx - 0.5, cy, r * 0.9, r * 0.7, c[1]); b_ovalo(R, cx - 1, cy - 1, r * 0.5, r * 0.4, c[2]); }
}

// la vista que piden las opciones: un encuadre que no existe cae en 'travesia'; una cámara que no es la suya, en
// 'general'; la luz, 'dia' si no se dice (la tormenta siempre con su luz de tormenta)
function b_resuelve(o) {
  const enc = V_MAR[o.encuadre] ? o.encuadre : 'travesia', cam = o.camara === V_MAR[enc].cam ? o.camara : 'general';
  return { enc, cam, luz: enc === 'tormenta' ? 'tormenta' : B_LUZ[o.luz] && o.luz !== 'tormenta' ? o.luz : 'dia' };
}

// los barcos de la travesía: [x, flotación, escala] del de White (delante), el de la derecha (lejos) y el de la izquierda
const B_TRAV = [[158, 140, 0.95], [258, 108, 0.38], [60, 113, 0.5]];

// TRAVESÍA · el Atlántico con los barcos navegando juntos
function b_travesia(R, t, o, luz) {
  const hor = 92, L = b_pal(luz), tn = b_tinte(luz), F = b_cieloFijo(R, luz, hor), noche = luz === 'noche';
  R.copiar(F.b);
  b_nubes(R, t, hor, luz, F.b);
  const px = b_marPrep(t, hor, luz, { fuerza: 0.55, sol: L.sol ? L.sol[0] : L.luna ? L.luna[0] : null });
  b_marPinta(R, px, hor, 180);
  const n = Math.max(1, Math.min(3, Math.round(o.barcos ?? 2))), pir = b_01(o.piratas ?? 0);
  const slots = B_TRAV.map((v) => v.slice()); if (pir > 0) slots[2] = [212, 101, 0.27];
  // lejos: la ballena que sopla, las pardelas que rasan el agua y las gaviotas
  b_ballena(R, t, 34, hor + 4, tn, L.mar);
  b_pardelas(R, t, 6, 120, 300, hor + 4, hor + 16, tn);
  if (!noche) b_gaviotas(R, t, 4, 34, 80, tn, 3);
  const barcos = [], lejos = (a) => (c) => b_mezcla(tn(c), L.mar[0], a);
  const nave = (i) => { const [bx, by, s] = slots[i], m = Math.sin(t * 1.05 + i * 2.1), cab = 0.035 * m, dy = 1.4 * Math.sin(t * 1.05 + i * 2.1 + 1.2) * s;
    const Bq = b_galeon(R, bx + Math.sin(t * 0.2 + i) * 3, by + dy, s, t, { cab, tn: s < 0.6 ? lejos(0.5 - s * 0.6) : tn, k: i * 5, noche });
    b_flotacion(R, t, Bq, s, 1, L.mar, 1); barcos.push([Math.round(bx), Math.round(by)]); };
  // el orden: de lejos a cerca
  if (n >= 2) nave(1);
  if (n >= 3) nave(2);
  // los delfines, entre los barcos de lejos y el de White
  b_delfines(R, t, 3, 200, 310, hor + 30, tn, L.mar);
  // el pirata francés: viene por detrás (por la izquierda) y se pone al lado
  let pirata = null;
  if (pir > 0) { const e = b_suave(pir), px0 = -80 + e * 150, py = 116 + e * 12, s = 0.5 + e * 0.26, m = Math.sin(t * 1.1 + 4);
    const Bq = b_galeon(R, px0, py + 1.2 * m, s, t, { cab: 0.03 * m, tn, pirata: true, k: 9, noche });
    b_flotacion(R, t, Bq, s, 1, L.mar, 1); pirata = [Math.round(px0), Math.round(py)];
    if (o.canonazo != null) { const pr = Bq.P(30, -11); b_humoCanon(R, pr[0], pr[1] - 4 * s, o.canonazo, tn); } }
  nave(0);
  // la loma de una ola cercana con su encaje de espuma
  b_olaDelante(R, t, px, L.mar, 171, 0.4);
  return { horizonte: hor, barcos: [barcos[barcos.length - 1], ...barcos.slice(0, -1)], ...(pirata ? { pirata } : {}) };
}

// las maderas de a bordo: [luz, cuerpo, sombra, junta] de la cubierta (tablas lavadas) y de la obra (borda, castillo)
const B_MAD = { cub: ['#c8aa80', '#a88a64', '#8a6e4c', '#5e4a32'], obra: ['#9a7048', '#7a5434', '#5a3a24', '#3e2818'] };

// unas tablas horizontales con sus juntas, testas escalonadas, cabillas y vetas: x0–x1, y0–y1, alto de cada tabla (o
// función de la fila para la perspectiva), P = [luz, cuerpo, sombra, junta], sem
function b_tablas(R, x0, y0, x1, y1, alto, P, sem) {
  let y = y0, fila = 0;
  while (y <= y1) { const a = typeof alto === 'function' ? alto(y) : alto, yb = Math.min(y1, y + Math.max(1, Math.round(a)) - 1), off = Math.round(h(fila, 1, sem) * 60), largo = 46 + Math.round(h(fila, 2, sem) * 30);
    for (let yy = y; yy <= yb; yy++) for (let x = x0; x <= x1; x++) {
      const junta = yy === yb, testa = ((x - x0 + off) % largo) === 0, n = h(x >> 2, yy, sem + fila);
      let c = junta || testa ? P[3] : yy === y && a > 2 ? P[0] : n > 0.9 ? P[2] : n < 0.06 ? P[0] : P[1];
      if (!junta && !testa && Math.sin((x + off * 7) * 0.09 + yy * 1.7 + fila) > 0.93) c = P[2];
      if (((x - x0 + off) % largo) === 3 && yy === y + 1 && a > 2) c = P[3];
      R.pset(x, yy, c); }
    y = yb + 1; fila++; }
}

// la cubierta (la parte fija de 'cubierta'): la borda de la otra banda con sus barraganetes, imbornales, cabillero con
// adujas y los obenques con sus vigotas; el castillo de popa a la izquierda (rombos pintados, ventanas emplomadas,
// la puerta claveteada, la escala y el farol de popa); el palo mayor con su cabillero de pie y las vueltas de cabo; la
// bitácora; el cofre con la carta extendida; la jaula de gallinas, el barril del agua; la cubierta de tablas lavadas
// en perspectiva con la rejilla de la escotilla. Todo en un búfer (lo transparente queda a 0)
const B_CUB = { borda: 108, suelo: 158, timon: [88, 134], carta: [188, 137], bitacora: [113, 132], palo: 248, castillo: [0, 44, 68, 146] };

function b_cubiertaFija(R, luz) {
  return b_capa(R, 'cubierta:' + luz, () => {
    const tn = b_tinte(luz), T4 = (a) => a.map((c) => tn(hex(c))), O = T4(B_MAD.obra), Cb = T4(B_MAD.cub), K = T4(B_GAL.ingles.casco), D = T4(B_GAL.ingles.deco);
    const cab = tn(hex('#8a6a44')), cabS = tn(hex('#5a4228')), cabL = tn(hex('#b89464')), hierro = tn(hex('#3a3a40')), hierroL = tn(hex('#7a7a84')), negro = tn(hex('#1a1414'));
    const { pset, rect, linea, disco } = R, by = B_CUB.borda;
    // la cubierta: tablas a lo largo, cada vez más anchas hacia nosotros
    b_tablas(R, 0, 134, 319, 179, (y) => 2 + (y - 134) * 0.11, Cb, 940);
    // la sombra de la borda en la cubierta y el agua que brilla en las juntas
    for (let y = 134; y < 140; y++) for (let x = 66; x < 320; x++) if (b_umbral(x, y) < (140 - y) / 7) pset(x, y, Cb[3]);
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 941) * 310), y = 142 + Math.round(h(k, 2, 941) * 36); rect(x, y, x + 3 + (k % 4), y, Cb[0]); }
    // la rejilla de la escotilla, delante (debajo de la línea de los pies)
    for (let y = 166; y < 180; y++) for (let x = 112; x < 206; x++) { const bor = y < 168 || x < 115 || x > 202; pset(x, y, bor ? (y === 166 ? O[0] : O[1]) : ((x - 115) % 6 < 2 || (y - 168) % 4 < 1) ? O[1] : negro); }
    // LA BORDA de la otra banda: el tapabalance (la regala), las tablas y los barraganetes que asoman
    b_tablas(R, 66, by + 4, 319, 133, 3, O, 942);
    for (let x = 66; x < 320; x++) { pset(x, by, O[0]); pset(x, by + 1, O[1]); pset(x, by + 2, O[1]); pset(x, by + 3, O[3]); for (let y = by + 4; y < by + 7; y++) if (b_umbral(x, y) < 0.6 - (y - by - 4) * 0.2) pset(x, y, O[3]); }
    for (let x = 78; x < 320; x += 26) { rect(x, by - 4, x + 3, 133, O[1]); rect(x, by - 4, x, 133, O[0]); rect(x + 3, by - 4, x + 3, 133, O[3]); rect(x, by - 4, x + 3, by - 4, O[0]); pset(x + 1, by + 8, hierro); pset(x + 2, by + 18, hierro); }
    for (let x = 94; x < 320; x += 52) { rect(x, 130, x + 4, 132, negro); pset(x + 2, 133, tn(hex('#6a8aa0'))); }
    // el cabillero con las cabillas y las adujas colgadas
    rect(188, 116, 240, 118, O[1]); rect(188, 116, 240, 116, O[0]); rect(188, 119, 240, 119, O[3]);
    for (let x = 192; x < 240; x += 6) { rect(x, 113, x, 121, cabL); pset(x, 113, O[0]); }
    for (const cx of [195, 213, 231]) for (let a = 0; a < 6.3; a += 0.12) for (const r of [3, 4.5, 6]) pset(Math.round(cx + Math.cos(a) * r * 0.55), Math.round(126 + Math.sin(a) * r), (Math.floor(a * 3 + r) & 1) ? cab : cabS);
    // las vigotas de los obenques sobre la regala
    for (let x = 262; x <= 298; x += 9) { disco(x, by - 2, 2, O[3]); pset(x, by - 2, O[1]); rect(x, by - 1, x, by + 10, hierro); }
    // EL CASTILLO DE POPA
    const [cx0, cy0, cx1, cy1] = B_CUB.castillo;
    b_tablas(R, cx0, 64, cx1, cy1, 4, O, 943);
    for (let y = 64; y <= cy1; y++) { pset(cx1, y, O[3]); pset(cx1 - 1, y, O[3]); pset(cx1 - 2, y, O[2]); }
    // la franja pintada a rombos y la moldura
    for (let y = 52; y < 64; y++) for (let x = cx0; x <= cx1; x++) { const u = Math.abs(((x + 4) % 8) - 4) + Math.abs(((y - 52) % 12) - 6) * 0.66; pset(x, y, y === 52 || y === 63 ? D[2] : u < 3 ? D[0] : D[1]); if (u >= 3 && u < 3.6) pset(x, y, D[3]); }
    // la barandilla de balaústres del castillo y su pasamanos
    rect(cx0, cy0, cx1 + 2, cy0 + 1, O[0]); rect(cx0, cy0 + 2, cx1 + 2, cy0 + 2, O[3]); rect(cx0, 50, cx1 + 2, 51, O[1]);
    for (let x = cx0 + 2; x < cx1; x += 4) { rect(x, cy0 + 3, x + 1, 49, O[1]); pset(x, 46, O[0]); pset(x + 1, 48, O[2]); }
    // las ventanas emplomadas en rombo, con su luz
    for (const vx of [8, 44]) { rect(vx - 1, 73, vx + 15, 88, O[3]); rect(vx, 74, vx + 14, 87, tn(hex('#2a3a48')));
      for (let y = 74; y <= 87; y++) for (let x = vx; x <= vx + 14; x++) { if ((x - vx + y) % 5 === 0 || (x - vx - y + 100) % 5 === 0) pset(x, y, tn(hex('#5a5a60'))); else if ((x - vx) + (y - 74) < 9 && b_umbral(x, y) < 0.5) pset(x, y, tn(hex('#8ab0c8'))); }
      rect(vx - 2, 89, vx + 16, 90, O[0]); rect(vx - 2, 91, vx + 16, 91, O[3]); }
    // la puerta claveteada con su arco, los goznes y la argolla
    rect(21, 102, 45, cy1, O[3]); for (let y = 104; y <= cy1; y++) for (let x = 23; x <= 43; x++) { const arco = y < 110 && Math.hypot(x - 33, y - 110) > 10.5; if (!arco) pset(x, y, (x - 23) % 5 === 0 ? O[3] : x < 26 ? O[0] : O[1]); }
    for (const yy of [114, 132]) { rect(23, yy, 34, yy + 1, hierro); pset(24, yy, hierroL); }
    for (let y = 112; y < cy1; y += 6) for (let x = 27; x < 43; x += 5) pset(x, y, hierroL);
    disco(39, 124, 2, hierro); pset(39, 124, O[1]); pset(38, 122, hierroL);
    // el farol de popa en su pescante, sobre el castillo
    rect(27, 26, 28, cy0, O[2]); rect(23, 29, 32, 30, D[2]); rect(24, 31, 31, 39, tn(hex('#f0d890'))); rect(23, 40, 32, 41, D[2]); for (const x of [24, 27, 30]) rect(x, 31, x, 39, D[2]); rect(26, 26, 29, 28, D[2]); pset(27, 25, D[2]);
    // la escala que sube al castillo
    for (const [xa, xb] of [[70, 62], [80, 72]]) linea(xa, 146, xb, 46, O[3]);
    for (let y = 52; y < 146; y += 7) { const u = (y - 46) / 100, xa = 62 + u * 8; linea(Math.round(xa), y, Math.round(xa + 10), y, O[0]); pset(Math.round(xa + 1), y + 1, O[3]); }
    // los cabos colgados y un balde junto a la puerta
    for (let a = 0; a < 6.3; a += 0.1) for (const r of [4, 6]) pset(Math.round(54 + Math.cos(a) * r * 0.6), Math.round(110 + Math.sin(a) * r), (Math.floor(a * 3 + r) & 1) ? cab : cabS);
    rect(48, 138, 58, 146, O[1]); rect(48, 138, 58, 138, O[0]); rect(48, 141, 58, 141, hierro); rect(48, 145, 58, 145, hierro); linea(49, 138, 53, 133, hierro); linea(53, 133, 57, 138, hierro);
    // EL PALO MAYOR con sus zunchos, el cabillero de pie y las vueltas de cabo en la cubierta
    const px = B_CUB.palo;
    for (let y = -2; y < 146; y++) for (let x = px - 5; x <= px + 5; x++) { const u = (x - px + 5) / 10; pset(x, y, u < 0.2 ? O[0] : u < 0.55 ? O[1] : u < 0.85 ? O[2] : O[3]); }
    for (let y = 12; y < 132; y += 22) { rect(px - 5, y, px + 5, y + 1, hierro); pset(px - 4, y, hierroL); }
    rect(226, 130, 270, 133, O[1]); rect(226, 130, 270, 130, O[0]); rect(228, 134, 230, 146, O[2]); rect(266, 134, 268, 146, O[2]);
    for (let x = 230; x < 268; x += 5) { rect(x, 126, x, 133, cabL); pset(x, 126, O[0]); }
    for (const cx of [236, 260]) for (let a = 0; a < 6.3; a += 0.08) for (const r of [2, 4, 6]) pset(Math.round(cx + Math.cos(a) * r), Math.round(146 + Math.sin(a) * r * 0.35), (Math.floor(a * 4 + r) & 1) ? cab : cabS);
    // la jaula de gallinas (de mimbre) contra la borda
    rect(126, 122, 154, 146, cabS); for (let y = 123; y < 146; y++) for (let x = 127; x < 154; x++) pset(x, y, (x - 127) % 4 === 0 || (y - 123) % 5 === 0 ? (y < 125 ? cabL : cab) : tn(hex('#2e241a')));
    rect(125, 121, 155, 122, cabL);
    // el barril del agua con sus aros
    for (let y = 128; y < 152; y++) { const w = 7 + Math.sin((y - 128) / 24 * Math.PI) * 2; for (let x = Math.round(218 - w); x <= Math.round(218 + w); x++) { const u = (x - 218 + w) / (2 * w); pset(x, y, (y - 128) % 8 === 2 ? hierro : u < 0.25 ? O[0] : u < 0.7 ? O[1] : O[2]); } }
    rect(212, 127, 224, 128, O[0]);
    // la bitácora: el armario con sus puertecitas y, encima, la aguja en su cubeta de latón con el fanal al lado
    const [bx, btop] = B_CUB.bitacora;
    rect(bx - 9, btop + 4, bx + 9, 154, O[1]); rect(bx - 9, btop + 4, bx + 9, btop + 5, O[0]); rect(bx + 7, btop + 6, bx + 9, 154, O[2]); rect(bx - 7, btop + 8, bx - 1, 151, O[2]); rect(bx + 1, btop + 8, bx + 6, 151, O[2]); pset(bx - 2, 142, hierroL); pset(bx + 2, 142, hierroL);
    for (let y = btop - 3; y < btop + 4; y++) for (let x = bx - 7; x <= bx + 7; x++) { const r = Math.hypot((x - bx) / 7, (y - btop - 3) / 6); if (r < 1) pset(x, y, r > 0.8 ? D[2] : y < btop ? tn(hex('#a8c8d8')) : tn(hex('#e8dcc0'))); }
    rect(bx + 8, btop - 2, bx + 11, btop + 3, D[2]); pset(bx + 9, btop, tn(hex('#ffe8a0')));
    // el cofre con la carta extendida encima (sujeta con el tintero y el compás de puntas)
    rect(166, 142, 210, 157, O[2]); rect(166, 142, 210, 143, O[0]);
    for (let y = 144; y < 157; y++) for (let x = 167; x < 210; x++) if ((x - 167) % 9 === 0 || h(x >> 2, y, 945) > 0.94) pset(x, y, O[3]); else if (x < 170) pset(x, y, O[1]);
    for (const x of [172, 203]) rect(x, 142, x + 1, 157, hierro); rect(186, 146, 190, 150, hierro); pset(188, 148, D[2]);
    const papel = tn(C.papel), papelS = tn(C.papelS), acu = tn(C.acuarela), tinta = tn(hex('#4a3020'));
    for (let y = 135; y < 142; y++) { const e = (y - 135) * 0.6; for (let x = Math.round(163 - e * 0.3); x <= Math.round(213 + e * 0.3); x++) pset(x, y, y === 141 ? papelS : papel); }
    for (let x = 166; x < 211; x++) { const yc = 137 + Math.round(Math.sin(x * 0.3) * 1.2 + (x - 166) * 0.04); if (x % 2) pset(x, yc, acu); if (x > 190) pset(x, yc + 1, tn(C.arena)); }
    for (let x = 172; x < 200; x += 3) pset(x, 139, tinta); pset(196, 136, tn(C.sanJorge)); pset(197, 136, tn(C.sanJorge));
    rect(165, 134, 168, 137, tn(hex('#2a2a30'))); pset(166, 133, tn(hex('#e8e0d0'))); linea(206, 140, 211, 133, hierroL); linea(208, 140, 211, 133, hierroL);
    return {};
  });
}

// la vela mayor que asoma arriba, vista desde cubierta (la panza baja y sube con el viento, la cruz roja, las
// escotas que bajan a la borda); y las gallinas, la bitácora y el pinzote que se mueven
function b_cubierta(R, t, o, luz) {
  const hor = 84, L = b_pal(luz), tn = b_tinte(luz), F = b_cieloFijo(R, luz, hor), noche = luz === 'noche';
  R.copiar(F.b);
  // la mar que sube y baja por encima de la borda (el barco cabecea y se balancea)
  const bob = Math.round(5 * Math.sin(t * 0.8)), rr = 0.03 * Math.sin(t * 0.8 + 1.2), off = (x) => Math.round((x - 160) * rr) + bob;
  b_bajoHorizonte(R, hor, 14);
  b_nubes(R, t, hor, luz, F.b, { off: Math.round(bob * 0.4) });
  const px = b_marPrep(t, hor, luz, { fuerza: 0.5, sol: L.sol ? L.sol[0] : L.luna ? L.luna[0] : null });
  b_marPinta(R, px, hor, 112, off);
  // un barco compañero lejos, que sube y baja con la mar
  { const s = 0.24, x = 118, y = hor + 6 + off(118); b_galeon(R, x, y, s, t, { tn: (c) => b_mezcla(tn(c), L.mar[0], 0.35), cab: 0.03 * Math.sin(t * 1.2), k: 7, noche }); }
  if (!noche) b_gaviotas(R, t, 4, 30, 76, tn, 5);
  // la vela mayor que asoma arriba
  const lona = B_GAL.ingles.lona.map((c) => tn(hex(c))), rojo = tn(C.sanJorge), rojoS = tn(hex('#8a1c24')), cuerda = tn(hex('#3a2e24'));
  const panza = Math.sin(t * 1.3) * 2 + Math.sin(t * 2.9) * 0.8;
  for (let x = 178; x <= 270; x++) { const u = (x - 178) / 92, fondo = Math.round(33 + Math.sin(u * Math.PI) * (11 + panza) - (u < 0.06 || u > 0.94 ? 3 : 0));
    for (let y = 0; y <= fondo; y++) { let c = y > fondo - 1 ? lona[0] : u > 0.66 ? lona[3] : u > 0.3 ? lona[2] : lona[1]; if ((x - 178) % 6 === 0) c = lona[1]; if (Math.abs(x - 226) < 4) c = (x - 178) % 6 === 0 ? rojoS : rojo; if (y > fondo - 3 && y < fondo && (x & 3) === 0) c = lona[0]; R.pset(x, y, c); } }
  R.linea(180, 30, 150, 108, cuerda); R.linea(268, 30, 300, 108, cuerda);
  // los obenques que suben al tope (con los flechastes), por detrás del palo
  for (let i = 0; i < 5; i++) { const xb = 262 + i * 9; R.linea(xb, 106, 250, -10, cuerda); }
  for (let i = 0; i < 4; i++) { const xb = 204 + i * 10; R.linea(xb, 106, 246, -10, cuerda); }
  for (let y = 56; y < 104; y += 7) { const u = (y + 10) / 116; R.linea(Math.round(250 + 12 * u), y, Math.round(250 + 48 * u), y, cuerda); }
  // el vigía en el castillo de popa, pequeño, que mira con la mano en la frente (los balaústres lo tapan de cintura para abajo)
  { const vx = 54, vy = 50, pc = tn(hex('#e8c098')), ro = tn(hex('#3a4a6a')); R.rect(vx - 1, vy - 6, vx + 1, vy - 1, ro); R.rect(vx - 1, vy - 9, vx + 1, vy - 7, pc); R.pset(vx, vy - 10, tn(hex('#5a3a2a'))); if (Math.sin(t * 0.5) > 0) R.pset(vx + 2, vy - 8, pc); }
  // la parte fija
  const Fc = b_cubiertaFija(R, luz); b_blit(R, Fc.b);
  // las gallinas que picotean dentro de la jaula
  for (let k = 0; k < 2; k++) { const gx = 133 + k * 12 + Math.round(Math.sin(t * 0.7 + k * 3) * 2), pica = Math.sin(t * 3 + k * 2) > 0.6, gy = 140;
    const bl = tn(hex(k ? '#c87a3a' : '#f0ece0')), sb = tn(hex(k ? '#8a4a24' : '#c8c0b0'));
    R.rect(gx - 3, gy - 2, gx + 2, gy + 2, bl); R.rect(gx - 3, gy + 1, gx + 2, gy + 2, sb); R.pset(gx + 3, gy - 3 + (pica ? 3 : 0), bl); R.pset(gx + 3, gy - 4 + (pica ? 3 : 0), tn(hex('#d83a2a'))); R.pset(gx + 4, gy - 2 + (pica ? 3 : 0), tn(hex('#e8a030'))); R.pset(gx - 4, gy - 3, sb); R.pset(gx - 4, gy - 4, bl); }
  // la aguja de la bitácora que oscila y su reflejo
  { const [bx, by] = B_CUB.bitacora, a = Math.sin(t * 1.7) * 2.5; R.pset(bx + Math.round(a), by + 1, tn(hex('#c8303a'))); R.pset(bx - Math.round(a), by + 2, tn(hex('#2a2a30'))); if (Math.sin(t * 2.2) > 0.4) R.pset(bx - 3, by - 1, hex('#ffffff')); }
  // el farol de popa: la llama que tiembla (de noche, con su halo)
  { const fl = Math.sin(t * 9) + Math.sin(t * 13.7) > 0; if (noche) R.halo(27, 35, 16, [hex('#2a2440'), hex('#5a4a40'), hex('#a07a40')], 0.8); R.pset(27, 35, fl ? hex('#ffb040') : hex('#ffe070')); R.pset(28, 34, fl ? hex('#ffe070') : hex('#ffb040')); R.pset(27, 36, hex('#e88030')); }
  // el pinzote (la caña del timón de 1587): sale de su mortaja en la cubierta y va de banda a banda
  const [tx, ty] = B_CUB.timon, sway = Math.sin(t * 0.6) * 3 + (o.timon ?? 0) * 6, O = B_MAD.obra.map((c) => tn(hex(c)));
  R.rect(tx - 7, 150, tx + 7, 156, O[1]); R.rect(tx - 7, 150, tx + 7, 150, O[0]); R.rect(tx - 7, 156, tx + 7, 156, O[3]); R.rect(tx - 2, 151, tx + 2, 152, tn(hex('#1a1414')));
  R.linea(tx, 151, Math.round(tx + sway), ty, O[3]); R.linea(tx + 1, 151, Math.round(tx + 1 + sway), ty, O[1]); R.linea(tx + 2, 151, Math.round(tx + 2 + sway), ty + 1, O[2]);
  R.disco(Math.round(tx + 1 + sway), ty, 2, O[0]); R.pset(Math.round(tx + sway), ty - 1, tn(hex('#d8b890')));
  return { horizonte: hor + bob, borda: B_CUB.borda, timon: [Math.round(tx + 1 + sway), ty], carta: B_CUB.carta, bitacora: B_CUB.bitacora };
}
// lo de delante en 'cubierta': la aduja de cabo en la esquina de abajo a la izquierda y el balde de la derecha
function b_cubiertaDelante(R, t, o, luz) {
  const tn = b_tinte(luz), cab = tn(hex('#8a6a44')), cabS = tn(hex('#5a4228')), cabL = tn(hex('#b89464')), O = B_MAD.obra.map((c) => tn(hex(c))), hierro = tn(hex('#3a3a40'));
  for (let r = 13; r >= 2; r -= 1.5) for (let a = 0; a < 6.3; a += 0.04) R.pset(Math.round(14 + Math.cos(a) * r), Math.round(173 + Math.sin(a) * r * 0.42), (Math.floor(a * 5 + r) & 1) ? (a > 3.4 && a < 6 ? cabL : cab) : cabS);
  for (let i = 0; i < 12; i++) R.pset(27 + i, 172 + Math.round(Math.sin(i * 0.6) * 1.5), cab);
  for (let y = 162; y < 179; y++) { const w = 8 - (y - 162) * 0.12; for (let x = Math.round(304 - w); x <= Math.round(304 + w); x++) { const u = (x - 304 + w) / (2 * w); R.pset(x, y, (y - 162) % 6 === 2 ? hierro : u < 0.25 ? O[0] : u < 0.7 ? O[1] : O[2]); } }
  R.rect(296, 161, 312, 162, O[0]); R.linea(297, 161, 304, 154, hierro); R.linea(304, 154, 311, 161, hierro);
  for (let x = 298; x < 311; x++) R.pset(x, 163, tn(hex(Math.sin(t * 2 + x) > 0.5 ? '#a8cee6' : '#568eb4')));
  return {};
}

// BANCOS · los Outer Banks desde el mar. La geometría: el horizonte (la tierra firme lejana), el estrecho, la isla de
// Roanoke con su bosque, las dos islas de arena con la ensenada en medio y el mar de delante
const B_BAN = { hor: 62, estrecho: 66, roanoke: [140, 236, 86], humo: [198, 74], ensenada: [128, 170], playa: 112 };

// la orilla de mar de las islas de arena en cada columna (null en la ensenada) y su borde de atrás (el del estrecho)
const b_orilla = (x) => (x > B_BAN.ensenada[0] && x < B_BAN.ensenada[1] ? null : B_BAN.playa + Math.round(1.6 * Math.sin(x * 0.045) + h(x >> 3, 0, 950)));

const b_trasera = (x) => { const [e0, e1] = B_BAN.ensenada, d = x <= e0 ? e0 - x : x - e1, punta = d < 24 ? (24 - d) * 0.45 : 0; return Math.round(98 + 2 * Math.sin(x * 0.07 + 1) + h(x >> 2, 1, 951) * 2 + punta); };

const b_duna = (x) => b_trasera(x) + 1 + Math.round(Math.max(0, Math.sin(x * 0.11) * 1.5 + Math.sin(x * 0.037 + 2) * 2));

// la parte fija de 'bancos': el cielo, la tierra firme lejana, la isla de Roanoke con sus pinos y robles y su orilla
// de juncos, y las islas de arena (marisma por detrás, dunas con su luz y su sombra, la playa seca y la mojada)
function b_bancosFijo(R, luz) {
  return b_capa(R, 'bancos:' + luz, () => {
    const L = b_pal(luz), tn = b_tinte(luz), F = b_cieloFijo(R, luz, B_BAN.hor + 4), B = R.buf, hor = B_BAN.hor;
    B.set(F.b);
    for (let i = B_BAN.estrecho * 320; i < 57600; i++) B[i] = 0;
    const lejos = (c) => b_mezcla(tn(c), L.mar[0], 0.55);
    // la tierra firme: una línea de bosque azulado y velado, con alguna copa más alta
    for (let x = 0; x < 320; x++) { const alto = 3 + Math.round(Math.sin(x * 0.08) * 1.2 + h(x >> 1, 2, 952) * 2 + (h(x >> 3, 3, 952) > 0.8 ? 2 : 0));
      for (let y = hor - alto; y < B_BAN.estrecho; y++) R.pset(x, y, y === hor - alto ? lejos(C.musgo) : y > hor + 1 ? lejos(C.arenaS) : lejos(C.pinoS)); }
    // LA ISLA DE ROANOKE: el bosque en cúpula baja, copas de pino y de roble en tres tonos, la orilla con juncos
    const [r0, r1, rb] = B_BAN.roanoke, pino = [tn(C.pinoS), tn(C.pino), tn(hex('#4a7a4a'))], roble = [tn(hex('#4a5a2a')), tn(C.roble), tn(hex('#9aaa5a'))];
    const altoR = (x) => Math.max(0, Math.sin(((x - r0) / (r1 - r0)) * Math.PI)) ** 0.6 * 13;
    for (let x = r0; x <= r1; x++) { const top = rb - 2 - altoR(x); for (let y = Math.round(top); y < rb; y++) R.pset(x, y, b_mezcla(pino[0], L.mar[0], 0.2)); }
    for (let k = 0; k < 70; k++) { const x = r0 + 4 + h(k, 1, 953) * (r1 - r0 - 8), base = rb - 2 - altoR(x) + 2 + h(k, 2, 953) * 4, esPino = h(k, 3, 953) > 0.45, P = (esPino ? pino : roble).map((c) => b_mezcla(c, L.mar[0], 0.18));
      if (esPino) { const a = 4 + Math.round(h(k, 4, 953) * 3); R.linea(Math.round(x), Math.round(base), Math.round(x), Math.round(base + 4), tn(C.troncoS)); for (let j = 0; j < a; j++) { const w = Math.round((j / a) * 2.5); for (let i = -w; i <= w; i++) R.pset(Math.round(x + i), Math.round(base - a + j), i < 0 ? P[2] : i > 0 ? P[0] : P[1]); } }
      else { R.disco(Math.round(x), Math.round(base), 3, P[0]); R.disco(Math.round(x - 1), Math.round(base - 1), 2, P[1]); R.pset(Math.round(x - 2), Math.round(base - 2), P[2]); } }
    for (let x = r0 - 4; x <= r1 + 4; x++) { R.pset(x, rb, tn(C.arena)); R.pset(x, rb - 1, (x & 1) ? tn(C.musgo) : tn(hex('#b8a860'))); if (h(x, 4, 954) > 0.6) R.pset(x, rb - 2, tn(hex('#9a9a50'))); }
    // LAS ISLAS DE ARENA
    const ar = tn(C.arena), arS = tn(C.arenaS), arL = tn(hex('#f6ead0')), moj = tn(hex('#b89c70')), mar = tn(hex('#7a8a4a')), marL = tn(hex('#9aa860')), seco = tn(hex('#a89060'));
    for (let x = 0; x < 320; x++) { const yo = b_orilla(x); if (yo == null) continue; const yt = b_trasera(x), yd = b_duna(x);
      for (let y = yt; y <= yo + 1; y++) {
        let c;
        if (y <= yt + 1) c = (h(x, y, 955) > 0.5) ? mar : marL;               // la marisma del lado del estrecho
        else if (y <= yd + 2) { const luzD = Math.sin(x * 0.11) > 0.2; c = y === yd ? arL : luzD ? ar : arS; if (h(x, y, 956) > 0.92) c = seco; }
        else if (y < yo - 1) { c = (h(x >> 1, y, 957) > 0.85) ? arS : ar; if (y === yo - 3 && h(x >> 2, 1, 958) > 0.4) c = seco; } // la línea de algas
        else c = moj;
        R.pset(x, y, c); } }
    // la nasa de cañas en el estrecho (como en las acuarelas de White): dos cercos de estacas que se juntan en un corral
    const caña = tn(hex('#7a6a40')), cañaL = tn(hex('#b8a060'));
    for (let i = 0; i < 16; i++) { const x = 96 + i * 2, y = 84 + Math.round(Math.abs(i - 7.5) * 0.5); R.pset(x, y - 2, cañaL); R.pset(x, y - 1, caña); R.pset(x, y, caña); }
    for (let a = 0; a < 6.3; a += 0.5) { const x = Math.round(112 + Math.cos(a) * 4), y = Math.round(89 + Math.sin(a) * 1.6); R.pset(x, y - 2, cañaL); R.pset(x, y - 1, caña); }
    return {};
  });
}

// una canoa de un solo tronco con dos pescadores pequeños (uno rema, el otro echa una red), despacio por el estrecho
function b_canoa(R, t, x, y, tn) {
  const mad = tn(hex('#5a3a24')), madL = tn(hex('#8a5a34')), piel = tn(hex('#b07850')), pelo = tn(hex('#1a1414')), ante = tn(hex('#a07a50')), rem = Math.sin(t * 2.4);
  R.rect(x - 7, y, x + 7, y, mad); R.rect(x - 6, y - 1, x + 6, y - 1, madL); R.pset(x - 8, y - 1, mad); R.pset(x + 8, y - 1, mad);
  // el que rema, a popa
  R.rect(x - 4, y - 4, x - 3, y - 2, ante); R.rect(x - 4, y - 6, x - 3, y - 5, piel); R.pset(x - 4, y - 7, pelo); R.pset(x - 3, y - 7, pelo);
  R.linea(x - 2, y - 4, x - 2 - Math.round(rem * 2), y + 2, tn(hex('#8a6a44')));
  // el de la red, a proa: la red que se abre y cae
  R.rect(x + 3, y - 4, x + 4, y - 2, ante); R.rect(x + 3, y - 6, x + 4, y - 5, piel); R.pset(x + 3, y - 7, pelo); R.pset(x + 4, y - 7, pelo);
  const red = (t % 4) / 4; if (red < 0.5) for (let i = 0; i < 5; i++) R.pset(x + 6 + i, y - 5 + Math.round(i * red * 2 + Math.abs(i - 2) * 0.5), tn(hex('#d8ccb0')));
  for (let i = 0; i < 6; i++) if (h(i, Math.floor(t * 4), 967) > 0.5) R.pset(x - 10 - i * 2, y + 1, tn(hex('#b8d8c4')));
}

// los barrones de las dunas que se mueven con el viento (cada pocos píxeles, un manojo con su espiga)
function b_barrones(R, t, tn, viento = 1) {
  const v = tn(hex('#a8a050')), vS = tn(hex('#7a7a3a')), esp = tn(hex('#d8c070'));
  for (let x = 2; x < 318; x += 4 + (x % 3)) { if (b_orilla(x) == null) continue; const yd = b_duna(x) + 1, a = 3 + Math.round(h(x, 1, 959) * 3), lean = Math.sin(t * 2.2 + x * 0.3) * 1.2 * viento + 0.8;
    for (let j = 0; j < a; j++) { const xx = Math.round(x + lean * j / a); R.pset(xx, yd - j, j < 2 ? vS : v); if (j === a - 1) { R.pset(xx + 1, yd - j - 1, esp); R.pset(xx, yd - j - 1, esp); } }
    R.pset(x - 1, yd, vS); }
}

// la resaca en la orilla de las islas y las rompientes de la barra de la ensenada
function b_rompientes(R, t, Pm) {
  const esp = Pm[6], br = Pm[7], sec = Pm[4];
  for (let x = 0; x < 320; x++) { const yo = b_orilla(x); if (yo == null) continue;
    const s = Math.sin(t * 1.1 + x * 0.02), y = yo + 2 + Math.round((s + 1) * 1.5);
    if (h(x >> 1, Math.floor(t * 4), 960) > 0.2) R.pset(x, y, esp); if (h(x, Math.floor(t * 3), 961) > 0.6) R.pset(x, y - 1, br);
    // las líneas de rompiente que llegan a la playa
    for (let k = 0; k < 3; k++) { const u = ((t * 0.35 + k / 3 + h(x >> 5, k, 962) * 0.2) % 1), yy = Math.round(yo + 14 - u * 10); if (h(x >> 2, k + Math.floor(t * 2), 963) > 0.25 + u * 0.4) R.pset(x, yy, u > 0.6 ? br : esp); if (u > 0.3 && h(x, k, 964) > 0.7) R.pset(x, yy + 1, sec); } }
  // la barra de la ensenada: arcos de espuma que rompen y se deshacen
  const [e0, e1] = B_BAN.ensenada;
  for (let k = 0; k < 3; k++) { const u = (t * 0.3 + k / 3) % 1, cy = 112 + u * 6, r = 18 + k * 4;
    for (let x = e0 - 4; x < e1 + 4; x++) { const d = (x - (e0 + e1) / 2) / r; if (Math.abs(d) > 1) continue; const y = Math.round(cy - (1 - d * d) * 8 + u * 3); if (h(x >> 1, k + Math.floor(t * 5), 965) > 0.25 + u * 0.5) R.pset(x, y, u < 0.5 ? br : esp); } }
}

// el estrecho de aguas verdes y tranquilas: el degradado tramado, las ondas largas que brillan y se mueven, el
// reflejo de la isla de Roanoke
function b_estrecho(R, t, luz) {
  const L = b_pal(luz), tn = b_tinte(luz), B = R.buf, P = [tn(hex('#8ab4a0')), tn(C.estrecho), tn(C.estrechoS), tn(hex('#b8d8c4'))], [r0, r1, rb] = B_BAN.roanoke;
  const Pm = P.map((c) => b_mezcla(c, L.mar[1], 0.3));
  for (let y = B_BAN.estrecho; y < 116; y++) { const f = y * 320, u = (y - B_BAN.estrecho) / 34;
    for (let x = 0; x < 320; x++) { let c = b_umbral(x, y) < u ? Pm[1] : Pm[0];
      const o = Math.sin(x * 0.05 + y * 0.9 - t * 0.8) + Math.sin(x * 0.013 - y * 0.4 + t * 0.5);
      if (o > 1.55) c = Pm[3]; else if (o < -1.6) c = Pm[2];
      if (y > rb && y < rb + 9 && x > r0 + 4 && x < r1 - 4 && (y - rb) < Math.sin(((x - r0) / (r1 - r0)) * Math.PI) * 8 && Math.sin(y * 2.1 + t * 2 + x * 0.02) > -0.6) c = b_mezcla(tn(C.pinoS), Pm[1], 0.45);
      B[f + x] = c; } }
}

// el humo fino que sube entre los árboles (fuerza 0–1) y, de noche, el resplandor de un fuego
function b_humo(R, t, x, y, fuerza, tn, noche) {
  if (fuerza <= 0) return;
  if (noche) { const f = 0.7 + 0.3 * Math.sin(t * 11) * Math.sin(t * 7.3); R.halo(x, y + 4, 10 * fuerza + 3, [hex('#3a2430'), hex('#8a4a2a'), hex('#e08a3a')], 0.7 * f + 0.3); R.pset(x, y + 4, hex('#ffd070')); R.pset(x + 1, y + 3, hex('#ffa040')); }
  const c = [tn(hex('#9aa0a4')), tn(hex('#c4c8ca')), tn(hex('#e2e4e4'))];
  for (let k = 0; k < 14; k++) { const u = ((t * 0.12 + k / 14) % 1), cx = x - u * 22 + Math.sin(u * 9 + t) * 2, cy = y - u * 40, r = 1 + u * 4 * fuerza;
    if (u > fuerza * 0.9 + 0.1 || b_quieta(cx, cy)) continue; R.disco(Math.round(cx), Math.round(cy), r, c[0]); if (r > 1.5) R.disco(Math.round(cx - 0.5), Math.round(cy - 0.5), r * 0.6, u < 0.5 ? c[2] : c[1]); }
}

// los pelícanos en fila, que planean bajo y aletean a la vez
function b_pelicanos(R, t, y, tn, cada = 19) {
  const u = (t % cada) / cada, x0 = -40 + u * 420, c = tn(hex('#6a5e52')), cS = tn(hex('#4a4038')), pico = tn(hex('#c8a040')), cab = tn(hex('#e8e0c8'));
  for (let k = 0; k < 5; k++) { const x = Math.round(x0 - k * 12), yy = Math.round(y + Math.sin(t * 1.2 + k * 0.8) * 1.5 + k), bate = Math.sin(t * 6 - k * 0.9) > 0.6;
    if (b_quieta(x, yy)) continue;
    R.rect(x - 2, yy, x + 2, yy, c); R.pset(x + 3, yy - 1, cab); R.pset(x + 4, yy - 1, pico); R.pset(x + 5, yy, pico);
    if (bate) { R.pset(x - 1, yy - 1, cS); R.pset(x - 2, yy - 2, cS); R.pset(x + 1, yy - 1, cS); R.pset(x, yy - 2, cS); } else { R.rect(x - 5, yy - 1, x - 2, yy - 1, cS); R.rect(x + 1, yy - 1, x + 4, yy - 1, cS); } }
}

// la pinaza que va a remo de los barcos a la ensenada, con sus remeros pequeños
function b_pinaza(R, t, x, y, tn, Pm, dir = -1) {
  const K = B_GAL.ingles.casco.map((c) => tn(hex(c))), rem = Math.sin(t * 3.2);
  for (let i = -9; i <= 9; i++) { const bot = i * dir > 6 ? 2 : 3; for (let j = 0; j < bot; j++) R.pset(x + i, y - j, j === bot - 1 ? K[4] : K[2]); }
  for (let k = 0; k < 4; k++) { const rx = x - 6 * dir + k * 4 * dir; R.pset(rx, y - 3, tn(hex('#3a4a6a'))); R.pset(rx, y - 4, tn(hex('#e8c098'))); R.linea(rx, y - 2, rx - Math.round(rem * 3) * dir, y + 2, K[4]); if (rem > 0.7) R.pset(rx - 3 * dir, y + 2, Pm[6]); }
  for (let i = 0; i < 8; i++) if (h(i, Math.floor(t * 5), 966) > 0.4) R.pset(x - (12 + i * 2) * dir, y + 1, Pm[6]);
}

// los correlimos que corren por la orilla
function b_correlimos(R, t, tn) {
  const c = tn(hex('#8a7a6a')), b = tn(hex('#f0ece0'));
  for (let k = 0; k < 5; k++) { const base = 20 + k * 58 + Math.round(Math.sin(t * 0.9 + k * 2) * 6), yo = b_orilla(base); if (yo == null) continue; const pata = Math.sin(t * 14 + k) > 0;
    R.pset(base, yo - 2, c); R.pset(base + 1, yo - 2, c); R.pset(base + 1, yo - 3, c); R.pset(base, yo - 1, b); R.pset(base + (pata ? 1 : 0), yo, c); }
}

// BANCOS (general)
const B_BAN_BARCOS = [[236, 160, 0.46, -1], [88, 146, 0.32, 1], [298, 140, 0.24, -1]];

function b_bancos(R, t, o, luz) {
  const L = b_pal(luz), tn = b_tinte(luz), noche = luz === 'noche', Fb = b_bancosFijo(R, luz), F = b_cieloFijo(R, luz, B_BAN.hor + 4);
  R.copiar(Fb.b);
  b_nubes(R, t, B_BAN.hor - 6, luz, F.b);
  b_estrecho(R, t, luz);
  const px = b_marPrep(t, 104, luz, { fuerza: 0.35, sol: L.sol ? L.sol[0] : L.luna ? L.luna[0] : null });
  for (let x = 0; x < 320; x++) { const yo = b_orilla(x) ?? 104; for (let y = Math.max(104, yo - 2); y < 180; y++) R.buf[y * 320 + x] = px(x, y); }
  b_blit(R, Fb.b, 0, 0, B_BAN.hor - 7, 120);
  b_rompientes(R, t, L.mar);
  b_canoa(R, t, Math.round(30 + ((t * 2.2) % 80)), 86, tn);
  b_barrones(R, t, tn);
  if (!noche) b_correlimos(R, t, tn);
  b_humo(R, t, B_BAN.humo[0], B_BAN.humo[1], b_01(o.humo ?? 0), tn, noche);
  if (!noche) { b_pelicanos(R, t, 46, tn); b_gaviotas(R, t, 3, 30, 60, tn, 7); }
  const n = Math.max(0, Math.min(3, Math.round(o.barcos ?? 2))), barcos = [];
  for (let i = n - 1; i >= 0; i--) { const [bx, by, s, dir] = B_BAN_BARCOS[i], m = Math.sin(t * 0.9 + i * 2);
    const Bq = b_galeon(R, bx, by + m * s, s, t, { dir, cab: 0.025 * m, velas: 'recogidas', tn: s < 0.4 ? (c) => b_mezcla(tn(c), L.mar[0], 0.3) : tn, k: i * 3, noche });
    b_flotacion(R, t, Bq, s, dir, L.mar, 0); barcos.unshift([bx, by]);
    // el cable del ancla que entra en el agua por la proa
    const e = Bq.escoben; R.linea(Math.round(e[0]), Math.round(e[1]), Math.round(e[0] + dir * 10 * s), Math.round(by + 3), tn(hex('#5a4a34'))); }
  if (n > 0) b_pinaza(R, t, Math.round(200 - ((t * 4) % 50)), 128, tn, L.mar, -1);
  return { horizonte: B_BAN.hor, roanoke: [Math.round((B_BAN.roanoke[0] + B_BAN.roanoke[1]) / 2), B_BAN.roanoke[2] - 8], humo: B_BAN.humo.slice(), ensenada: [Math.round((B_BAN.ensenada[0] + B_BAN.ensenada[1]) / 2), 112], barcos };
}

// MAPA · la costa como la pintaría White, en acuarela sobre papel viejo y sin rótulos. Los lugares (pantalla)
const B_MAPA = { papel: [6, 4, 313, 175], chesapeake: [226, 34], roanoke: [227, 104], croatoan: [250, 145], albemarle: [140, 96] };

// la bahía de Chesapeake, el estrecho de Albemarle y la cadena de islas de arena (líneas medias)
const B_BAHIA = [[247, 40], [234, 35], [220, 30], [206, 22], [196, 10], [190, 0]];

const B_ALBEMARLE = [[214, 94], [192, 96], [168, 97], [144, 96], [122, 94], [104, 92]];

const B_ISLAS = [[240, 62], [243, 78], [246, 92], [248, 99], [251, 116], [254, 134], [256, 146], [250, 151], [238, 156], [222, 161], [204, 167], [186, 173], [176, 176]];

const B_RIOS = [[[144, 96], [146, 80], [141, 64], [146, 50], [138, 34]], [[104, 92], [84, 96], [64, 90], [40, 92], [16, 84]], [[200, 124], [176, 128], [150, 126], [120, 134], [90, 132]], [[184, 150], [160, 152], [128, 160], [96, 158], [70, 166]],
  [[226, 34], [210, 40], [188, 42], [160, 40], [130, 46], [96, 42]], [[64, 90], [56, 70], [60, 50]], [[150, 126], [146, 110], [138, 104]], [[128, 160], [124, 146]]];

const B_RUTAS = { norte: [[227, 104], [233, 90], [238, 72], [236, 56], [228, 42], [226, 34]], sur: [[227, 104], [236, 116], [244, 130], [250, 145]], dentro: [[227, 104], [212, 98], [190, 98], [166, 98], [140, 96]] };

// la distancia de (x, y) a una polilínea y en qué fracción de su largo cae
function b_dpoli(x, y, pts) {
  let best = 1e9, bu = 0, acc = 0, tot = 0; for (let i = 1; i < pts.length; i++) tot += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  for (let i = 1; i < pts.length; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy, l = Math.sqrt(l2), u = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l2)), d = Math.hypot(x - ax - u * dx, y - ay - u * dy);
    if (d < best) { best = d; bu = (acc + u * l) / tot; } acc += l; }
  return [best, bu];
}

// un punto a la fracción u del largo de una polilínea
function b_enPoli(pts, u) {
  let tot = 0; for (let i = 1; i < pts.length; i++) tot += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  let d = u * tot; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (d <= l) return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * d / l, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * d / l]; d -= l; }
  return pts[pts.length - 1].slice();
}

// ¿es tierra? (la tierra firme menos la bahía y el estrecho, la isla de Roanoke y las islas de arena con sus pasos)
function b_esTierra(x, y) {
  const costa = y < 44 ? 252 - y * 0.15 : y < 66 ? 245 - (y - 44) * 0.3 : 214 - (y - 66) * 0.55 + 4 * Math.sin(y * 0.2) + 2 * Math.sin(y * 0.07);
  if (Math.hypot((x - 227) / 4.2, (y - 104) / 9.5) < 1) return 2;
  const [di, ui] = b_dpoli(x, y, B_ISLAS); if (di < 1.7 && !(ui > 0.29 && ui < 0.32) && !(ui > 0.7 && ui < 0.725)) return 3;
  if (x >= costa) return 0;
  const [db, ub] = b_dpoli(x, y, B_BAHIA); if (db < 6 - ub * 3.2) return 0;
  const [da, ua] = b_dpoli(x, y, B_ALBEMARLE); if (da < 6.5 - ua * 4) return 0;
  return 1;
}

// la parte fija del mapa: la mesa de nogal, el papel con sus bordes gastados, la aguada del mar con sus olitas, la
// tierra en manchas de acuarela con la costa a tinta, ríos, arbolitos, corros de bosque, la sierra del oeste, matas de
// marisma, sondas, pueblos (círculos de casitas), el filete doble del marco, la escala de leguas, los dos parches de
// papel, los dobleces, las manchas del tiempo, la rosa de los vientos (una flor de lis al norte, sin letras) y el
// compás de puntas sobre la mesa
function b_mapaFijo(R) {
  return b_capa(R, 'mapa', () => {
    const B = R.buf, [x0, y0, x1, y1] = B_MAPA.papel, Hx = (c) => hex(c);
    const mesa = ['#5a3a24', '#4a2e1c', '#3a2416', '#6a4630'].map(Hx), pap = [Hx('#f2e8cc'), Hx('#e8dcb8'), Hx('#d8c8a0'), Hx('#c4b088')];
    const agua = [Hx('#c8d8d0'), Hx('#a8c4c8'), Hx('#88aebc'), Hx('#6a94a8')], tierra = [Hx('#e0d4a0'), Hx('#ccc488'), Hx('#b4b474'), Hx('#a0a066')], arena = Hx('#ecdcae');
    const tinta = Hx('#5a4630'), tintaA = Hx('#4a6a84'), verde = [Hx('#7a9a5a'), Hx('#5a7a44'), Hx('#3e5a32')];
    const T = new Uint8Array(57600);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) T[y * 320 + x] = b_esTierra(x, y);
    // el océano (lo que queda fuera de la cadena de islas, rellenando desde la derecha): más hondo que los estrechos
    const OC = new Uint8Array(57600), cola = [100 * 320 + 312]; OC[cola[0]] = 1;
    while (cola.length) { const i = cola.pop(), x = i % 320, y = (i / 320) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy, j = ny * 320 + nx; if (nx < 0 || nx > 319 || ny < 0 || ny > 179 || OC[j] || T[j]) continue; if (y >= 56 && b_dpoli(nx, ny, B_ISLAS)[0] < 2.2) continue; OC[j] = 1; cola.push(j); } }
    const oceano = [Hx('#a8c4cc'), Hx('#88aec0'), Hx('#6a94ac'), Hx('#527c98')];
    const dentro = (x, y) => { const e = h(x >> 1, y >> 1, 970) * 1.6; return x >= x0 + e && x <= x1 - e && y >= y0 + e && y <= y1 - e; };
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x;
      if (!dentro(x, y)) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.3) * 2) + h(x >> 3, y, 971) * 0.6; B[i] = y % 22 === 0 ? mesa[2] : v > 1.1 ? mesa[3] : v < -0.7 ? mesa[2] : mesa[(x + y) & 1 ? 0 : 1]; continue; }
      const t = T[i], n = Math.sin(x * 0.07 + y * 0.05) * 0.5 + Math.sin(x * 0.023 - y * 0.09 + 1) * 0.5 + h(x >> 2, y >> 2, 972) * 0.5;
      let c;
      if (t === 0) { // el agua: más oscura junto a la orilla (donde se encharca la acuarela), con olitas
        let cerca = 0; for (const [dx, dy] of [[-3, 0], [3, 0], [0, -3], [0, 3], [-2, -2], [2, 2]]) if (T[(Math.max(0, Math.min(179, y + dy))) * 320 + Math.max(0, Math.min(319, x + dx))]) cerca++;
        const q = b_quieta(x, y) ? 0 : 1, nivel = Math.min(3, Math.floor(n * 1.2 + 0.6 + (cerca ? 1.2 : 0) * q + b_umbral(x, y) * 0.8));
        c = (OC[i] ? oceano : agua)[Math.max(0, nivel)];
        // las olitas de pincel del océano: arquitos en tresbolillo
        if (OC[i] && q) { const gx = Math.floor(x / 9), gy = Math.floor(y / 6), ox = (gy & 1) * 4 + Math.round(h(gx, gy, 973) * 2), lx = x - gx * 9 - ox, ly = y - gy * 6;
          if (h(gx, gy, 979) > 0.25 && ((ly === 2 && (lx === 0 || lx === 4)) || (ly === 1 && lx > 0 && lx < 4))) c = oceano[3]; }
        else if (q && !OC[i] && ((x * 7 + y * 13) % 41 === 0)) c = agua[3];
      } else if (t === 3) c = arena;
      else { const nivel = Math.min(3, Math.max(0, Math.floor(n * 1.6 + b_umbral(x, y) * 0.9))); c = t === 2 ? verde[0] : tierra[nivel]; }
      // el papel viejo debajo: fibras y manchas
      if (h(x, y, 974) > 0.985) c = b_mezcla(c, pap[3], 0.5);
      B[i] = c; }
    // la costa a tinta: un borde fino entre la tierra y el agua
    for (let y = 1; y < 179; y++) for (let x = 1; x < 319; x++) { const i = y * 320 + x; if (!T[i] || !dentro(x, y)) continue; if (!T[i - 1] || !T[i + 1] || !T[i - 320] || !T[i + 320]) B[i] = T[i] === 3 ? Hx('#b09a6a') : tinta; }
    // los ríos a tinta azul
    for (const r of B_RIOS) for (let i = 1; i < r.length; i++) R.linea(r[i - 1][0], r[i - 1][1], r[i][0], r[i][1], (xx, yy) => (T[yy * 320 + xx] === 1 ? tintaA : null));
    // los arbolitos y las lomas a la manera de White, y los pueblos: un cerco de puntitos con casitas
    for (let k = 0; k < 150; k++) { const x = Math.round(x0 + 8 + h(k, 1, 975) * (x1 - x0 - 16)), y = Math.round(y0 + 8 + h(k, 2, 975) * (y1 - y0 - 16)); if (T[y * 320 + x] !== 1 || T[(y + 3) * 320 + x] !== 1 || b_quieta(x, y) || b_quieta(x, y - 4)) continue;
      if (k % 5 === 0) { for (let i = -3; i <= 3; i++) R.pset(x + i, y - Math.round(Math.cos(i / 3 * 1.5) * 2), tinta); continue; }
      R.pset(x, y - 3, verde[0]); R.rect(x - 1, y - 2, x + 1, y - 1, verde[1]); R.pset(x - 1, y - 1, verde[2]); R.pset(x, y, tinta); }
    for (const [vx, vy] of [[126, 122], [178, 82], [96, 110], [176, 140]]) { for (let a = 0; a < 6.3; a += 0.5) R.pset(Math.round(vx + Math.cos(a) * 5), Math.round(vy + Math.sin(a) * 3.5), tinta);
      for (const [hx2, hy2] of [[-2, -1], [1, 0], [-1, 1]]) { R.rect(vx + hx2, vy + hy2, vx + hx2 + 1, vy + hy2, Hx('#a0784a')); R.pset(vx + hx2, vy + hy2 - 1, tinta); } }
    // los bosques a la manera de White: corros apretados de arbolitos con su sombra a tinta, y la sierra lejana del
    // oeste (picos con la ladera de la sombra rayada)
    for (const [fx, fy, fr, n] of [[52, 128, 16, 16], [150, 46, 14, 12], [96, 64, 12, 10], [170, 120, 10, 8], [40, 92, 10, 8], [208, 62, 9, 7]]) for (let k = 0; k < n; k++) {
      const a = h(k, fx, 980) * 6.28, r = Math.sqrt(h(k, fy, 981)) * fr, x = Math.round(fx + Math.cos(a) * r), y = Math.round(fy + Math.sin(a) * r * 0.6);
      if (T[y * 320 + x] !== 1 || T[(y + 2) * 320 + x] !== 1 || b_quieta(x, y - 4)) continue;
      R.pset(x, y - 4, verde[0]); R.rect(x - 1, y - 3, x + 1, y - 2, verde[1]); R.pset(x - 1, y - 2, verde[2]); R.pset(x + 2, y - 1, Hx('#b4a878')); R.pset(x, y - 1, tinta); R.pset(x, y, tinta); }
    for (let k = 0; k < 9; k++) { const px = 14 + k * 11 + Math.round(h(k, 1, 982) * 4), py = 32 + Math.round(h(k, 2, 982) * 8) + (k > 5 ? 6 : 0), a = 4 + Math.round(h(k, 3, 982) * 3);
      if (b_quieta(px, py - a) || px - a < x0 + 12 || T[py * 320 + px] !== 1) continue;
      for (let j = 0; j <= a; j++) { R.pset(px - j, py - a + j, tinta); R.pset(px + j, py - a + j, tinta); if (j > 1 && j % 2 === 0) for (let i = 1; i < j; i += 2) R.pset(px + i, py - a + j, Hx('#8a7a54')); } }
    // la marisma de las orillas del estrecho: matitas de juncos a tinta junto al agua
    for (let k = 0; k < 260; k++) { const x = Math.round(x0 + 6 + h(k, 1, 983) * (x1 - x0 - 12)), y = Math.round(y0 + 6 + h(k, 2, 983) * (y1 - y0 - 12)), i = y * 320 + x;
      if (T[i] !== 1 || b_quieta(x, y - 3)) continue; let agua2 = false; for (const [dx, dy] of [[-4, 0], [4, 0], [0, 4], [0, -4], [3, 3], [-3, 3]]) if (!T[(y + dy) * 320 + x + dx]) agua2 = true; if (!agua2) continue;
      R.pset(x, y, tinta); R.pset(x - 1, y - 1, Hx('#6a7a4a')); R.pset(x + 1, y - 1, Hx('#6a7a4a')); R.pset(x, y - 2, Hx('#6a7a4a')); }
    // las sondas de los estrechos: puntitos de tinta en filas (el fondo bajo donde encallan los barcos)
    for (let y = y0 + 8; y < y1 - 8; y += 5) for (let x = x0 + 8 + (y % 10 ? 3 : 0); x < x1 - 8; x += 7) { const i = y * 320 + x; if (T[i] || OC[i] || b_quieta(x, y) || h(x, y, 984) > 0.45) continue; R.pset(x, y, Hx('#5a7a94')); }
    // el filete del marco: doble línea de tinta con la escala de grados en tramos (sin tocar las zonas tranquilas)
    for (const d of [5, 8]) for (let x = x0 + d; x <= x1 - d; x++) for (const y of [y0 + d, y1 - d]) if (!b_quieta(x, y)) B[y * 320 + x] = d === 5 && ((x - x0) >> 3) & 1 ? tinta : b_mezcla(B[y * 320 + x], tinta, d === 5 ? 0.35 : 0.75);
    for (const d of [5, 8]) for (let y = y0 + d; y <= y1 - d; y++) for (const x of [x0 + d, x1 - d]) if (!b_quieta(x, y)) B[y * 320 + x] = d === 5 && ((y - y0) >> 3) & 1 ? tinta : b_mezcla(B[y * 320 + x], tinta, d === 5 ? 0.35 : 0.75);
    // la escala de leguas, abajo a la izquierda, en su recuadro de papel limpio: barra a tramos tinta y papel con sus muescas
    for (let y = 157; y <= 169; y++) for (let x = 52; x <= 108; x++) B[y * 320 + x] = y === 157 || y === 169 || x === 52 || x === 108 ? b_mezcla(pap[2], tinta, 0.4) : b_mezcla(B[y * 320 + x], pap[0], 0.8);
    for (let x = 56; x < 104; x++) for (let y = 163; y <= 165; y++) B[y * 320 + x] = y === 164 && ((x - 56) >> 3) & 1 ? pap[0] : tinta;
    for (let x = 56; x <= 104; x += 8) { B[161 * 320 + x] = tinta; B[162 * 320 + x] = tinta; }
    // los dos parches de papel (canon): más claros, con el borde de fibras
    for (const [px0, py0, px1, py1] of [[104, 80, 122, 93], [190, 134, 204, 144]]) for (let y = py0; y <= py1; y++) for (let x = px0; x <= px1; x++) { const borde = x === px0 || x === px1 || y === py0 || y === py1; B[y * 320 + x] = borde ? (h(x, y, 976) > 0.5 ? pap[2] : pap[1]) : b_mezcla(B[y * 320 + x], pap[0], 0.55); }
    // los dobleces y las manchas del tiempo
    for (let y = y0 + 2; y < y1 - 1; y++) { B[y * 320 + 160] = b_mezcla(B[y * 320 + 160], pap[3], 0.35); B[y * 320 + 161] = b_mezcla(B[y * 320 + 161], Hx('#ffffff'), 0.25); }
    for (let x = x0 + 2; x < x1 - 1; x++) { if (b_quieta(x, 90)) continue; B[90 * 320 + x] = b_mezcla(B[90 * 320 + x], pap[3], 0.3); B[91 * 320 + x] = b_mezcla(B[91 * 320 + x], Hx('#ffffff'), 0.2); }
    for (const [mx, my, mr] of [[40, 150, 9], [118, 30, 7], [300, 166, 6]]) for (let y = my - mr; y <= my + mr; y++) for (let x = mx - mr; x <= mx + mr; x++) { const d = Math.hypot(x - mx, y - my) / mr; if (d < 1 && !b_quieta(x, y) && b_umbral(x, y) < (1 - d) * 0.5) B[y * 320 + x] = b_mezcla(B[y * 320 + x], Hx('#b89a6a'), 0.3); }
    // el borde gastado del papel: un filo más oscuro
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (dentro(x, y) && (!dentro(x - 2, y) || !dentro(x + 2, y) || !dentro(x, y - 2) || !dentro(x, y + 2))) B[y * 320 + x] = b_mezcla(B[y * 320 + x], pap[3], 0.6);
    // la sombra del papel en la mesa
    for (let y = y0 + 2; y <= y1 + 2; y++) for (let x = x1 + 1; x <= x1 + 3; x++) if (x < 320 && !dentro(x, y)) B[y * 320 + x] = mesa[2];
    // la rosa de los vientos (abajo a la derecha): rumbos a tinta y una flor de lis al norte
    const [rx, ry] = [288, 150], rojo = Hx('#a83a2a'), az = Hx('#3a5a7a');
    for (let a = 0; a < 16; a++) { const ang = a * Math.PI / 8, L = a % 4 === 0 ? 13 : a % 2 === 0 ? 9 : 6; R.linea(rx, ry, Math.round(rx + Math.sin(ang) * L), Math.round(ry - Math.cos(ang) * L), a % 4 === 0 ? tinta : Hx('#8a7454')); }
    for (let a = 0; a < 4; a++) { const ang = a * Math.PI / 2; for (let j = 1; j < 10; j++) { const w = Math.round((10 - j) / 4); for (let i = -w; i <= w; i++) R.pset(Math.round(rx + Math.sin(ang) * j + Math.cos(ang) * i), Math.round(ry - Math.cos(ang) * j + Math.sin(ang) * i), i < 0 ? rojo : az); } }
    for (let a = 0; a < 6.3; a += 0.15) R.pset(Math.round(rx + Math.cos(a) * 5), Math.round(ry + Math.sin(a) * 5), tinta);
    R.disco(rx, ry, 1, Hx('#c8a040')); R.pset(rx, ry - 15, rojo); R.pset(rx - 1, ry - 16, rojo); R.pset(rx + 1, ry - 16, rojo); R.pset(rx, ry - 17, rojo); R.pset(rx - 2, ry - 17, rojo); R.pset(rx + 2, ry - 17, rojo); R.pset(rx, ry - 18, rojo);
    // el compás de puntas sobre la mesa, abajo a la izquierda, y el pisapapeles de plomo arriba
    const lat = Hx('#c8a040'), latS = Hx('#8a6a2a');
    R.linea(14, 178, 30, 152, latS); R.linea(15, 178, 31, 152, lat); R.linea(44, 177, 31, 152, latS); R.linea(45, 177, 32, 152, lat); R.disco(31, 151, 2, lat); R.pset(31, 150, Hx('#f0d890'));
    R.disco(10, 168, 5, Hx('#5a5a60')); R.disco(9, 167, 3, Hx('#7a7a84')); R.pset(8, 165, Hx('#b0b0b8'));
    return { T };
  });
}
// un barquito de los del mapa (casco, palo, vela y la crucecita) que cabecea
function b_barquitoMapa(R, x, y, t, k) {
  const tinta = hex('#5a4630'), cab = Math.round(Math.sin(t * 1.6 + k) * 1);
  for (let i = -4; i <= 4; i++) R.pset(x + i, y + (Math.abs(i) > 3 ? -1 : 0) + (i > 0 ? cab : 0), tinta);
  R.rect(x - 3, y + 1, x + 3, y + 1, hex('#8a6a4a')); R.linea(x, y - 1, x, y - 8, tinta);
  for (let j = 0; j < 5; j++) for (let i = -2; i <= 2; i++) R.pset(x + i + (j > 1 && j < 4 ? 1 : 0), y - 7 + j, i === 0 || j === 2 ? hex('#c8303a') : hex('#f2e8cc'));
  R.pset(x + 1, y - 9, hex('#c8303a')); R.pset(x + 2, y - 9 + (Math.sin(t * 5 + k) > 0 ? 1 : 0), hex('#c8303a'));
  for (let i = 0; i < 3; i++) R.pset(x - 6 - i * 2, y + 1 + (i & 1), hex('#6a94a8'));
}

// MAPA (cámara 'mapa' de 'bancos')
function b_mapa(R, t, o) {
  const F = b_mapaFijo(R); R.copiar(F.b);
  const [x0, y0, x1, y1] = B_MAPA.papel, tinta = hex('#7a2a1e'), tintaS = hex('#4a1a12');
  R.recorte([x0 + 3, y0 + 3, x1 - 3, y1 - 3]);
  // vida: los barquitos que cabecean, la ballena que sopla y las motas de polvo en la luz
  b_barquitoMapa(R, 276, 72, t, 0); b_barquitoMapa(R, 266 + Math.round(Math.sin(t * 0.3) * 2), 112, t, 2);
  { const u = (t % 5) / 5, wx = 298, wy = 96; for (let i = -4; i <= 4; i++) R.pset(wx + i, wy - Math.round(Math.cos(i / 4 * 1.4) * 2), hex('#4a5a6a')); R.pset(wx - 5, wy - 1, hex('#4a5a6a')); R.pset(wx + 3, wy - 2, hex('#2a2a30'));
    if (u < 0.5) for (let j = 0; j < 5 * Math.min(1, u * 5); j++) { R.pset(wx + 2, wy - 3 - j, hex('#6a94a8')); if (j > 2) { R.pset(wx + 1, wy - 4 - j, hex('#6a94a8')); R.pset(wx + 3, wy - 4 - j, hex('#6a94a8')); } } }
  for (let k = 0; k < 14; k++) { const x = Math.round(((h(k, 1, 977) * 300 + t * (2 + k % 3)) % 300) + 10), y = Math.round(((h(k, 2, 977) * 160 + Math.sin(t * 0.5 + k) * 6 - t * 1.5) % 160 + 160) % 160 + 10); if (!b_quieta(x, y)) R.pset(x, y, b_mezcla(R.pget(x, y), hex('#fff8e0'), 0.5)); }
  // una mosca que llega volando, se posa en la tierra, se frota las patas y se va (cada 11 s)
  { const ciclo = 11, u = (t % ciclo) / ciclo, k = Math.floor(t / ciclo), px0 = 60 + Math.round(h(k, 1, 985) * 60), py0 = 132 + Math.round(h(k, 2, 985) * 20);
    let mx, my, posada = false; if (u < 0.12) { const v = u / 0.12; mx = lerp(-10, px0, v) + Math.sin(v * 20) * 4; my = lerp(60, py0, v) + Math.cos(v * 17) * 5; }
    else if (u < 0.55) { const v = (u - 0.12) / 0.43; mx = px0 + Math.round(v * 10); my = py0 - Math.round(Math.sin(v * 3) * 2); posada = true; }
    else if (u < 0.68) { const v = (u - 0.55) / 0.13; mx = px0 + 10 + v * 200; my = py0 - v * 150 + Math.sin(v * 22) * 4; } else mx = -99;
    if (mx > -50 && !b_quieta(Math.round(mx), Math.round(my))) { const X = Math.round(mx), Y = Math.round(my), ng = hex('#1c1a1e'), ala = hex('#c8d4dc'); R.pset(X, Y + 1, hex('#8a8070')); R.pset(X + 1, Y + 1, hex('#8a8070'));
      R.pset(X, Y, ng); R.pset(X + 1, Y, ng); R.pset(X + 2, Y, hex('#7a2a20')); if (posada) { R.pset(X - 1, Y - 1, ala); R.pset(X, Y - 1, ala); if (Math.sin(t * 14) > 0) R.pset(X + 3, Y + 1, ng); } else { const f = Math.sin(t * 40) > 0; R.pset(X, Y - 1 - (f ? 1 : 0), ala); R.pset(X + 1, Y - 1 - (f ? 1 : 0), ala); } } }
  // la ruta: una línea de puntos de tinta que avanza (o.avance 0–1); con o.tachar, cortada con una X a media ruta
  const ruta = B_RUTAS[o.ruta], av = b_01(o.avance ?? 1);
  if (ruta) { for (let u = 0; u <= av; u += 0.012) { const [x, y] = b_enPoli(ruta, u); if (Math.floor(u / 0.012) % 3 === 2) continue; R.disco(Math.round(x), Math.round(y), 1, tinta); R.pset(Math.round(x) + 1, Math.round(y) + 1, tintaS); }
    const [px, py] = b_enPoli(ruta, av); R.disco(Math.round(px), Math.round(py), 2, tinta);
    if (o.tachar && av > 0.6) { const [cx, cy] = b_enPoli(ruta, 0.55), r = Math.min(5, (av - 0.6) * 30); for (let i = -r; i <= r; i++) for (const d of [0, 1]) { R.pset(Math.round(cx + i + d), Math.round(cy + i), tinta); R.pset(Math.round(cx + i + d), Math.round(cy - i), tinta); } } }
  // la marca: un círculo de tinta que late sobre el lugar
  const m = B_MAPA[o.marca];
  if (m && o.marca !== 'papel') { const r = 7 + Math.sin(t * 4) * 1.2; for (let a = 0; a < 6.3; a += 0.05) { const w = h(Math.floor(a * 6), 1, 978) > 0.3; R.pset(Math.round(m[0] + Math.cos(a) * r), Math.round(m[1] + Math.sin(a) * r * 0.85), tinta); if (w) R.pset(Math.round(m[0] + Math.cos(a) * (r + 1)), Math.round(m[1] + Math.sin(a) * (r + 1) * 0.85), tintaS); } }
  R.recorte(null);
  return { chesapeake: B_MAPA.chesapeake.slice(), roanoke: B_MAPA.roanoke.slice(), croatoan: B_MAPA.croatoan.slice(), albemarle: B_MAPA.albemarle.slice(), papel: B_MAPA.papel.slice() };
}
// el rayo: cada pocos segundos, un trazo quebrado con ramas en el cielo (nunca en las zonas tranquilas); devuelve el
// destello (0–1) para iluminar el plano
function b_rayo(R, t, hor, cada = 4.7) {
  const k = Math.floor(t / cada), u = t - k * cada - 0.8; if (u < 0 || u > 0.34) return 0;
  const x0 = 60 + h(k, 1, 990) * 180, luz = u < 0.06 || (u > 0.15 && u < 0.21) ? 1 : 0.4, bl = hex('#f4f0ff'), az = hex('#a8b4f0');
  const pon = (c) => (xx, yy) => (b_quieta(xx, yy) || yy >= hor ? null : c);
  let x = x0, y = 24;
  while (y < hor - 4) { const nx = x + (h(k, y, 991) - 0.5) * 10, ny = y + 3 + h(k, y, 992) * 4; R.linea(x, y, nx, ny, pon(bl)); R.linea(x + 1, y, nx + 1, ny, pon(az));
    if (h(k, y, 993) < 0.2) { let bx = nx, by = ny; for (let i = 0; i < 4; i++) { const ax = bx + (h(k, y + i, 994) - 0.3) * 8, ay = by + 3; R.linea(bx, by, ax, ay, pon(az)); bx = ax; by = ay; } } x = nx; y = ny; }
  return luz;
}

// cuánto ilumina el rayo en el instante t (lo mismo que devuelve b_rayo, sin dibujarlo)
function b_rayoLuz(t, cada = 4.7) { const k = Math.floor(t / cada), u = t - k * cada - 0.8; return u < 0 || u > 0.34 ? 0 : u < 0.06 || (u > 0.15 && u < 0.21) ? 1 : 0.4; }

// el destello del rayo sobre el plano, entre las filas y0 e y1 (una pasada)
function b_destello(R, f, y0 = 0, y1 = 180) { if (f <= 0) return; const B = R.buf, c = hex('#c8d0f0'); for (let i = Math.max(0, y0) * 320; i < Math.min(180, y1) * 320; i++) B[i] = b_mezcla(B[i], c, 0.26 * f); }

// la lluvia: trazos en diagonal que caen con el viento (n trazos; fuera de las zonas tranquilas)
function b_lluvia(R, t, n, viento = 1, c = hex('#9aa8bc'), c2 = hex('#5a6878')) {
  const dx = 0.35 + viento * 0.5;
  for (let k = 0; k < n; k++) { const v = 160 + h(k, 1, 995) * 90, L = 4 + Math.round(h(k, 2, 995) * 6), y = ((h(k, 4, 995) * 400 + t * v) % 210) - 15, x = ((h(k, 3, 995) * 420 + t * v * dx * 0.5) % 420) - 50 + y * dx * 0.4;
    for (let i = 0; i < L; i++) { const xx = Math.round(x - i * dx), yy = Math.round(y - i); if (!b_quieta(xx, yy)) R.pset(xx, yy, i < 2 ? c : c2); } }
}

// la costa de la isla en el horizonte durante la tormenta: una franja baja y oscura de bosque con la playa clara y la
// espuma, que se aleja y se vela (lejos 0–1)
function b_islaTormenta(R, t, hor, lejos, L) {
  const w = 130 - lejos * 76, x0 = -10 - lejos * 30, alto = 12 - lejos * 7, bos = b_mezcla(hex('#24342a'), L.mar[0], 0.12 + lejos * 0.5), bosL = b_mezcla(hex('#46604a'), L.mar[0], 0.15 + lejos * 0.5), ar = b_mezcla(hex('#d0c4a0'), L.mar[0], 0.2 + lejos * 0.45);
  for (let x = Math.round(x0); x < x0 + w; x++) { const u = (x - x0) / w, a = Math.round(alto * Math.sin(Math.min(1, u * 1.4) * Math.PI / 2) * (u > 0.85 ? (1 - u) / 0.15 : 1) * (0.8 + h(x >> 1, 0, 996) * 0.3));
    for (let y = hor - a; y < hor; y++) R.pset(x, y, y < hor - a + 2 && h(x, y, 997) > 0.5 ? bosL : bos);
    if (a > 4 && (x % 7) === 3) { const pa = 3 + Math.round(h(x, 5, 997) * 3) - Math.round(lejos * 2); for (let j = 0; j < pa; j++) { R.pset(x, hor - a - j, bos); if (j < pa - 1 && j > 0) { R.pset(x - 1, hor - a - j + 1, bos); R.pset(x + 1, hor - a - j + 1, bosL); } } } R.pset(x, hor, ar); if (h(x >> 1, Math.floor(t * 4), 998) > 0.55) R.pset(x, hor + 1, L.mar[6]); }
}

// el cable del ancla: de a (el escobén) a b (donde entra en el agua), tenso, de cáñamo colchado (tres tonos en espiral),
// que vibra (vib 0–1) y gotea; g: el grueso
function b_cable(R, t, a, b, vib, g, oscuro = false) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L, P = [hex('#3a2c1c'), hex('#6a5434'), hex('#9a8058'), hex('#c4a878')].map((c) => (oscuro ? b_mezcla(c, hex('#1c2430'), 0.3) : c));
  for (let s = 0; s <= L; s += 0.5) { const u = s / L, o = Math.sin(t * 47 + u * 9) * Math.sin(u * Math.PI) * vib * 2.2, x = a[0] + (b[0] - a[0]) * u + nx * o, y = a[1] + (b[1] - a[1]) * u + ny * o;
    for (let j = -g / 2; j <= g / 2; j += 0.5) { const tw = ((s * 0.8 + j * 2) % 3 + 3) % 3, c = j < -g / 2 + 0.6 ? P[3] : j > g / 2 - 0.6 ? P[0] : tw < 1 ? P[1] : tw < 2 ? P[2] : P[1]; R.pset(Math.round(x + nx * j), Math.round(y + ny * j), c); } }
  for (let k = 0; k < 4; k++) { const u = (h(k, 1, 999) * 0.8 + 0.1), ph = (t * 1.6 + h(k, 2, 999)) % 1, x = a[0] + (b[0] - a[0]) * u, y = a[1] + (b[1] - a[1]) * u + ph * 14; R.pset(Math.round(x), Math.round(y + g), hex('#a8c0cc')); }
}

// el cabo partido: un trozo que cuelga de p, se mece y acaba en hilachas (largo, ángulo de caída)
function b_cabo(R, t, p, largo, ang, g = 3) {
  const P = [hex('#3a2c1c'), hex('#6a5434'), hex('#9a8058'), hex('#c4a878')];
  let x = p[0], y = p[1];
  for (let s = 0; s < largo; s += 0.5) { const a = ang + Math.sin(t * 2.4 - s * 0.08) * 0.25 * (s / largo); x += Math.cos(a) * 0.5; y += Math.sin(a) * 0.5;
    for (let j = -g / 2; j <= g / 2; j += 0.5) { const tw = ((s * 0.8 + j * 2) % 3 + 3) % 3; R.pset(Math.round(x + j), Math.round(y), j < -g / 2 + 0.6 ? P[3] : tw < 1 ? P[1] : P[2]); } }
  for (let i = 0; i < 6; i++) R.pset(Math.round(x + (i - 2.5) * 0.9 + Math.sin(t * 9 + i) * 0.8), Math.round(y + 1 + (i & 1) + h(i, 1, 1000) * 2), P[3]);
}

// el estallido de hilachas donde se parte el cabo (u 0–1 desde la rotura)
function b_hilachas(R, x, y, u) {
  if (u <= 0 || u >= 1) return; const c = [hex('#c4a878'), hex('#9a8058'), hex('#e8f0f2')];
  for (let i = 0; i < 24; i++) { const a = h(i, 1, 1001) * 6.28, v = 6 + h(i, 2, 1001) * 16, d = v * u; R.pset(Math.round(x + Math.cos(a) * d), Math.round(y + Math.sin(a) * d * 0.7 + u * u * 10), c[i % 3]); }
}

// TORMENTA · la tormenta de agosto de 1590 frente a la isla
function b_tormenta(R, t, o) {
  const hor = 92, luz = 'tormenta', L = b_pal(luz), tn = b_tinte(luz), F = b_cieloFijo(R, luz, hor), c = b_01(o.cable ?? 0), suelta = b_suave((c - 0.5) / 0.5);
  R.copiar(F.b); b_bajoHorizonte(R, hor, 8);
  b_nubes(R, t, hor, luz, F.b, { viento: 2.4 });
  b_nubes(R, t + 37, hor, luz, F.b, { viento: 3.4 });
  b_calmaAtom(R, F.b, hor);
  const flash = b_rayo(R, t, hor);
  b_islaTormenta(R, t, hor, suelta, L);
  const off = (x) => Math.round(3 * Math.sin(x * 0.03 - t * 1.4) + 1.5 * Math.sin(x * 0.081 + t * 2));
  const px = b_marPrep(t, hor, luz, { fuerza: 1, viento: 2.6, velocidad: 1.5 });
  b_marPinta(R, px, hor, 180, off);
  // el otro barco, más lejos, que cabecea con las velas aferradas y también se va
  { const s = 0.36 - suelta * 0.08, m = Math.sin(t * 1.3 + 2), x = 274 + suelta * 36, y = 112 - suelta * 6;
    const Bq = b_galeon(R, x, y + m * 2, s, t, { dir: -1, cab: 0.1 * m, velas: 'recogidas', tn: (q) => b_mezcla(tn(q), L.mar[0], 0.35), k: 4 }); b_flotacion(R, t, Bq, s, -1, L.mar, 0); }
  // el barco de White: fondeado con la proa a la isla; cuando se rompe el cable, deriva mar adentro
  const s = 0.8 - suelta * 0.24, m = Math.sin(t * 1.25), bx = 168 + suelta * 92, by = 134 - suelta * 18 + 4 * Math.sin(t * 1.25 + 1) * s;
  const Bq = b_galeon(R, bx, by, s, t, { dir: -1, cab: 0.12 * m, velas: 'recogidas', tn, k: 1 });
  b_flotacion(R, t, Bq, s, -1, L.mar, suelta * 0.6);
  // el cable del ancla, de la proa al agua
  const e = Bq.escoben.map(Math.round), W = [124, 150 + off(124)];
  if (c < 0.5) b_cable(R, t, e, W, c * 2, 2, true);
  else { const u = (c - 0.5) / 0.5, Bp = [e[0] + (W[0] - e[0]) * 0.5, e[1] + (W[1] - e[1]) * 0.5];
    b_cabo(R, t, e, 14 + u * 6, Math.PI * 0.62, 2); b_hilachas(R, Bp[0], Bp[1], u * 4);
    if (u < 0.5) { const tip = [Bp[0] + (W[0] - Bp[0]) * u * 2, Bp[1] + (W[1] - Bp[1]) * u * 2 + u * 8]; if (u < 0.45) b_cable(R, t, tip, W, 0, 2, true);
      for (let i = 0; i < 10; i++) { const r = u * 14; R.pset(Math.round(W[0] + Math.cos(i * 0.63) * r), Math.round(W[1] + Math.sin(i * 0.63) * r * 0.3), L.mar[6]); } } }
  b_olaDelante(R, t, px, L.mar, 168, 1);
  b_lluvia(R, t, 150, 1.4);
  b_destello(R, flash);
  return { horizonte: hor, barco: [Math.round(bx), Math.round(by)], cable: [e[0], e[1], W[0], W[1]], isla: [Math.round(50 - suelta * 45), hor - 4] };
}
// EL ANCLA · la proa de cerca, por fuera, a ras de agua. Geometría
const B_ANC = { hor: 58, borda: 78, suelo: 90, escoben: [162, 113], agua: [24, 168], roda: (y) => 128 + Math.max(0, (y - 76) / 104) ** 1.5 * 28 };

// el casco de la proa (fijo, en un búfer con lo transparente a 0): la roda curva, la borda del castillo de proa con la
// franja pintada, el cintón, las tracas con sus clavos y verdín cerca del agua, el escobén forrado de plomo, la serviola
// con su roldana, el espolón con la rejilla y el bauprés con sus trincas y la cebadera aferrada
function b_proaFija(R) {
  return b_capa(R, 'proa', () => {
    const tn = b_tinte('tormenta'), K = B_GAL.ingles.casco.map((c) => tn(hex(c))), D = B_GAL.ingles.deco.map((c) => tn(hex(c))), plomo = tn(hex('#7a8088')), plomoS = tn(hex('#4a4e56')), verdin = tn(hex('#4a5a3a')), hierro = tn(hex('#2a2a30'));
    const { borda } = B_ANC;
    // el bauprés: sale de la proa hacia arriba y adelante, con sus trincas y la cebadera aferrada en su verga
    for (let i = 0; i < 118; i++) { const x = 136 - i * 0.92, y = 74 - i * 0.38; for (let j = -2; j <= 2; j++) R.pset(Math.round(x), Math.round(y + j), j < -1 ? K[4] : j > 0 ? K[1] : K[3]); if (i % 26 === 4) for (let j = -3; j <= 3; j++) R.pset(Math.round(x) + 1, Math.round(y + j), tn(hex('#5a4a34'))); }
    for (let i = 0; i < 26; i++) { const x = 36 + i, y = 40 + i * 0.1; R.pset(x, Math.round(y), K[1]); R.pset(x, Math.round(y) + 1, tn(hex('#d8ccb0'))); R.pset(x, Math.round(y) + 2, tn(hex('#b0a488'))); if (i % 5 === 0) R.pset(x, Math.round(y) + 2, tn(hex('#5a4a34'))); }
    // el espolón con su rejilla
    for (let y = 78; y < 90; y++) for (let x = Math.round(104 + (y - 78) * 1.6); x < B_ANC.roda(y) + 2; x++) R.pset(x, y, y === 78 ? K[4] : (x + y) % 4 === 0 ? K[0] : K[2]);
    // el casco
    for (let y = borda; y < 180; y++) for (let x = Math.round(B_ANC.roda(y)); x < 320; x++) {
      const dy = y - borda; let c;
      if (dy < 2) c = dy === 0 ? K[4] : K[3];
      else if (dy < 16) { const u = Math.abs(((x + 6) % 12) - 6) + Math.abs(((dy - 2) % 14) - 7) * 0.85; c = dy === 2 || dy === 15 ? D[2] : u < 4 ? D[0] : D[1]; if (u >= 4 && u < 4.7) c = D[3]; }
      else if (dy < 20) c = dy < 17 ? K[3] : K[0];
      else { const fila = Math.floor((dy - 20) / 4); c = (dy - 20) % 4 === 3 ? K[0] : (dy - 20) % 4 === 0 ? K[3] : K[2]; if (h(x >> 3, fila, 1010) > 0.85) c = K[1]; if ((x + fila * 17) % 37 === 0 && (dy - 20) % 4 === 1) c = hierro; if (y > 150 && b_umbral(x, y) < (y - 150) / 30) c = verdin; }
      if (x < B_ANC.roda(y) + 3) c = x < B_ANC.roda(y) + 1 ? K[4] : K[1];
      R.pset(x, y, c); }
    // la serviola (la viga del ancla) con su roldana
    R.rect(118, 98, 148, 102, K[2]); R.rect(118, 98, 148, 98, K[4]); R.rect(118, 102, 148, 102, K[0]); R.disco(122, 100, 2, hierro); R.pset(122, 100, plomo);
    // el escobén forrado de plomo
    const [ex, ey] = B_ANC.escoben;
    for (let y = ey - 6; y <= ey + 6; y++) for (let x = ex - 8; x <= ex + 8; x++) { const r = Math.hypot((x - ex) / 8, (y - ey) / 6); if (r < 1) R.pset(x, y, r > 0.7 ? (y < ey ? plomo : plomoS) : hex('#0e0c10')); }
    for (let a = 0; a < 6.3; a += 0.4) R.pset(Math.round(ex + Math.cos(a) * 7), Math.round(ey + Math.sin(a) * 5), tn(hex('#b0b4bc')));
    return {};
  });
}

// los marineros pequeños que halan de un cabo detrás de la borda (asoman de cintura para arriba)
function b_halando(R, t, x0, n, borda, dx = 0, dy = 0) {
  const tn = b_tinte('tormenta'), piel = tn(hex('#e8c098')), ropas = [hex('#3a4a6a'), hex('#8a3a2a'), hex('#5a6a3a')].map(tn), gorro = tn(hex('#2a2a30')), cab = tn(hex('#9a8058'));
  const tira = Math.sin(t * 2.6);
  for (let k = 0; k < n; k++) { const x = x0 + k * 14 + dx, lean = Math.round(tira * 2 + k * 0.3), y = borda + dy;
    for (let j = 0; j < 7; j++) R.rect(x + Math.round(lean * j / 7), y - 1 - j, x + 2 + Math.round(lean * j / 7), y - 1 - j, ropas[k % 3]);
    R.rect(x + lean, y - 11, x + 2 + lean, y - 8, piel); R.rect(x + lean, y - 12, x + 2 + lean, y - 12, gorro); R.pset(x + 3 + lean, y - 6, piel); }
  R.linea(x0 + dx - 2, borda + dy - 6, x0 + dx + n * 14, borda + dy - 5 + Math.round(tira), cab);
}

// la espuma que salta por encima de la proa y barre la borda cuando la proa se clava en una ola (cada ~2,6 s)
function b_rocion(R, t, dx, dy, fuerte = 1) {
  const per = 2.6, u = (t % per) / per; if (u > 0.55) return;
  const v = u / 0.55, esp = hex('#e8f0f2'), br = hex('#ffffff'), az = hex('#a8c0cc');
  for (let i = 0; i < 70 * fuerte; i++) { const a = -Math.PI / 2 - 0.9 + h(i, 1, 1012) * 1.4, sp = 30 + h(i, 2, 1012) * 50, x = 132 + dx + Math.cos(a) * sp * v + v * 30, y = 82 + dy + Math.sin(a) * sp * v + 60 * v * v;
    R.pset(Math.round(x), Math.round(y), i % 3 ? esp : br); if (i % 4 === 0) R.pset(Math.round(x) + 1, Math.round(y) + 1, az); }
  // la lámina de agua que corre por encima de la regala
  for (let x = 140; x < 140 + v * 160; x++) if (h(x >> 1, Math.floor(t * 8), 1013) > 0.4) R.pset(x + dx, B_ANC.borda - 1 + dy - Math.round(Math.sin(x * 0.2 + t * 9)), h(x, 2, 1013) > 0.5 ? esp : az);
}

// EL ANCLA (cámara 'ancla' de 'tormenta'): el cielo y la mar de tormenta, los marineros que halan, la proa que cabecea
// (y se va cuando el cable se parte), la flotación, el agua que chorrea, el cable o sus trozos, la ola de delante, la
// espuma, la lluvia y el destello del rayo
function b_ancla(R, t, o) {
  const { hor, borda } = B_ANC, luz = 'tormenta', L = b_pal(luz), F = b_cieloFijo(R, luz, hor), c = b_01(o.cable ?? 0), suelta = b_suave((c - 0.5) / 0.5);
  R.copiar(F.b); b_bajoHorizonte(R, hor, 8);
  b_nubes(R, t, hor, luz, F.b, { viento: 2.6 });
  b_nubes(R, t + 37, hor, luz, F.b, { viento: 3.6 });
  b_calmaAtom(R, F.b, hor);
  const flash = b_rayo(R, t, hor, 4.1);
  const off = (x) => Math.round(2.5 * Math.sin(x * 0.04 - t * 1.5) + Math.sin(x * 0.11 + t * 2.2));
  const px = b_marPrep(t, hor, luz, { fuerza: 1, viento: 2.6, velocidad: 1.5 });
  b_marPinta(R, px, hor, 180, off);
  // la proa: cabecea (sube y baja) y, suelta, se va hacia la derecha
  const bob = Math.round(4 * Math.sin(t * 1.25)), dx = Math.round(suelta * 60), wl = 160 + bob;
  b_halando(R, t, 214, 4, borda, dx, bob);
  const Fp = b_proaFija(R); b_blit(R, Fp.b, dx, bob, 0, wl);
  // la flotación: la ola que golpea la proa y la espuma a lo largo del casco
  for (let x = Math.round(B_ANC.roda(wl - bob)) + dx - 2; x < 320; x++) { const y = wl + Math.round(Math.sin(x * 0.2 + t * 4) * 1.5); R.pset(x, y, L.mar[6]); if (h(x >> 1, Math.floor(t * 6), 1014) > 0.4) R.pset(x, y - 1, L.mar[7]); if (h(x, Math.floor(t * 5), 1015) > 0.6) R.pset(x, y + 1, L.mar[4]); }
  // el agua que chorrea por el casco
  for (let k = 0; k < 9; k++) { const x = 170 + k * 16 + dx, y0 = borda + 20 + bob, f = (t * 0.9 + h(k, 1, 1016)) % 1; for (let j = 0; j < 8; j++) R.pset(x, Math.round(y0 + f * 50 + j), j < 3 ? hex('#8aa0b0') : hex('#6a8090')); }
  // el cable: tenso hasta que se parte (o.cable 0,5)
  const e = [B_ANC.escoben[0] + dx - 3, B_ANC.escoben[1] + bob + 2], W = [B_ANC.agua[0], B_ANC.agua[1] + off(B_ANC.agua[0])];
  if (c < 0.5) b_cable(R, t, e, W, c * 2, 4);
  else { const u = (c - 0.5) / 0.5, Bp = [e[0] + (W[0] - e[0]) * 0.42, e[1] + (W[1] - e[1]) * 0.42];
    b_cabo(R, t, e, 26 + u * 10, Math.PI * 0.55, 4); b_hilachas(R, Bp[0], Bp[1], u * 3);
    if (u < 0.6) { const tip = [Bp[0] + (W[0] - Bp[0]) * u * 1.6, Bp[1] + (W[1] - Bp[1]) * u * 1.6 + u * 10]; if (u < 0.55) b_cable(R, t, tip, W, 0, 4);
      for (let i = 0; i < 14; i++) { const r = u * 20; R.pset(Math.round(W[0] + Math.cos(i * 0.45) * r), Math.round(W[1] + Math.sin(i * 0.45) * r * 0.3), L.mar[6]); } } }
  b_olaDelante(R, t, px, L.mar, 172, 1);
  b_rocion(R, t, dx, bob);
  b_lluvia(R, t, 130, 1.4);
  b_destello(R, flash);
  return { horizonte: hor, borda: borda + bob, suelo: B_ANC.suelo + bob, libre: [176 + dx, 300], deriva: dx, cable: [e[0], e[1], W[0], W[1]], escoben: e };
}
// lo de delante en 'ancla': la borda del castillo de proa otra vez (tapa a los marineros de la escena de cintura para
// abajo) y la espuma que salta por encima
function b_anclaDelante(R, t, o) {
  const c = b_01(o.cable ?? 0), suelta = b_suave((c - 0.5) / 0.5), bob = Math.round(4 * Math.sin(t * 1.25)), dx = Math.round(suelta * 60);
  const Fp = b_proaFija(R), y0 = B_ANC.borda - 4 + bob, y1 = B_ANC.suelo + 8 + bob; b_blit(R, Fp.b, dx, bob, y0, y1);
  b_destello(R, b_rayoLuz(t, 4.1), y0, y1);
  b_rocion(R, t, dx, bob);
  return {};
}

// las vistas de mar() y de marDelante() por encuadre y cámara
const B_VISTAS = {
  'travesia.general': b_travesia,
  'travesia.cubierta': b_cubierta,
  'bancos.general': b_bancos,
  'bancos.mapa': b_mapa,
  'tormenta.general': b_tormenta,
  'tormenta.ancla': b_ancla,
};

const B_DELANTE = {
  'travesia.cubierta': b_cubiertaDelante,
  'tormenta.ancla': b_anclaDelante,
};

// las opciones de todo el decorado C: el encuadre, su cámara, la época y la luz
function c_resolver(o) {
  const CAM = { fuerte: 'casa', poste: 'arbol', huerto: 'embarcadero' }, enc = CAM[o.encuadre] ? o.encuadre : 'fuerte';
  return [enc, o.camara === CAM[enc] ? CAM[enc] : 'general', o.epoca === 1590 ? 1590 : 1587, ['dia', 'tarde', 'amanecer', 'noche'].includes(o.luz) ? o.luz : 'dia'];
}

// la paleta propia de la isla: tablas, barro y juncos de las casas, hierba y arena, la madera de las estacas (y la
// madera viva de las tallas), pinos y robles con musgo, el agua del estrecho, hierro oxidado, fuego, telas y animales
const c_P = pal({
  tabla: '#8a6a48', tablaS: '#5e4430', tablaL: '#b08a5e', tablaD: '#3a281a',
  barro: '#c4a47c', barroS: '#9c7e5a', barroL: '#dcc29a', zarzo: '#7a6040',
  paja: '#c8a860', pajaS: '#9a7e40', pajaL: '#e4cc8c', pajaD: '#6a5028',
  hierba: '#6a9a48', hierbaS: '#4e7a36', hierbaL: '#90be60', hierbaD: '#34561f', hierbaLej: '#86a878', seca: '#b8a860', secaS: '#8a7a40', secaL: '#d8c880',
  arena: '#e6d2a2', arenaS: '#c4ac7c', arenaL: '#f4e6c4', arenaD: '#a08a60',
  tierra: '#6e5236', tierraS: '#4e3824', tierraL: '#8e6e4a', tierraSeca: '#bca076', tierraSecaL: '#d4ba90', grieta: '#6a5038',
  log: '#7a5a3a', logS: '#54402a', logL: '#9e7c54', logD: '#33241a', vivo: '#d6b88a', vivoL: '#f6e2b8', vivoS: '#a88a5c', surco: '#2a1a10', surcoS: '#4a3220',
  tronco: '#5e4434', troncoS: '#3e2c22', troncoL: '#7e6046', copa: '#2e5a3a', copaS: '#1e3e28', copaL: '#4c7c4a', copaLL: '#6a985a',
  lej0: '#56767e', lej1: '#7898a0', lej2: '#a2bec2',
  roble: '#5a6e34', robleS: '#3c4e24', robleL: '#7a9044', musgo: '#a2ae92', musgoS: '#7a8a6e',
  agua: '#4a7a6a', aguaS: '#2e5a4c', aguaL: '#78a898', aguaB: '#d8f0e8', mar: '#3a6a8a', marS: '#2a5070', marL: '#6a9ab4',
  hierro: '#4e4e58', oxido: '#8a4a2a', oxidoL: '#b46a3a', oxidoS: '#5a3020',
  fuego: '#ffb040', fuegoL: '#fff0a0', brasa: '#e05a20', hollin: '#2a2220', humo: '#c8c4bc', humoS: '#9a968e',
  lona: '#e8dcc0', lonaS: '#c4b496', sanJorge: '#c8303a', blancoT: '#f0ead8', azulT: '#4a5a8a', rojoT: '#a83a3a', verdeT: '#5a7a4a', ocreT: '#c8963a',
  piedra: '#9a948a', piedraS: '#6e6a62', piedraL: '#bab4a8',
  gallina: '#f0e8d8', gallinaS: '#c8b8a0', gallinaP: '#a8643a', cresta: '#d83a3a', cabra: '#d8ccb4', cabraS: '#a8987c',
  cuervo: '#1e1a24', garza: '#9aa4b0', garzaS: '#6a7480', ciervo: '#9a6a44', ciervoS: '#6e4a2e', piel: '#e0aa80', pielS: '#b88060',
});

// el «vacío» de las capas fijas (lo que no pintan) y la caché de capas
const c_VACIO = 0x01020304;

const c_capas = new Map();

// los tres canales de un color del lienzo (0xAABBGGRR)
const c_rgb = (c) => [c & 255, (c >>> 8) & 255, (c >>> 16) & 255];

// un color del lienzo a partir de sus canales (recortados a 0–255)
const c_col = (r, g, b) => (0xff000000 | (Math.max(0, Math.min(255, Math.round(b))) << 16) | (Math.max(0, Math.min(255, Math.round(g))) << 8) | Math.max(0, Math.min(255, Math.round(r)))) >>> 0;

// mezcla dos colores del lienzo en la proporción a (0–1)
function c_mezcla(c1, c2, a) { const [r1, g1, b1] = c_rgb(c1), [r2, g2, b2] = c_rgb(c2); return c_col(r1 + (r2 - r1) * a, g1 + (g2 - g1) * a, b1 + (b2 - b1) * a); }

// la trama ordenada de 4 × 4 (Bayer) para los degradados tramados
const c_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// el umbral de la trama en (x, y)
const c_umbral = (x, y) => c_BAYER[((y & 3) << 2) | (x & 3)];

// la luz del momento: una función color → color (con caché) que tiñe el decorado de día de tarde, de amanecer rosado o
// de noche azul; lo que da luz (fuego, velas) se pinta sin teñir
const c_GRADOS = new Map();

// la función de color de cada luz (con su caché)
function c_grado(luz) {
  if (luz === 'dia') return (c) => c;
  let m = c_GRADOS.get(luz); if (!m) { m = new Map(); c_GRADOS.set(luz, m); }
  const f = { tarde: ([r, g, b]) => [r * 0.96 + 26, g * 0.8 + 10, b * 0.62 + 6], amanecer: ([r, g, b]) => [r * 0.84 + 34, g * 0.76 + 14, b * 0.8 + 30], noche: ([r, g, b]) => [r * 0.25 + 10, g * 0.3 + 14, b * 0.42 + 38] }[luz];
  return (c) => { let v = m.get(c); if (v === undefined) { v = c_col(...f(c_rgb(c))); m.set(c, v); } return v; };
}

// una capa fija: se pinta una vez (en un búfer de R.nuevo(), con la luz ya aplicada) y en cada fotograma se copia encima
// de lo que haya, salvo sus huecos (el cielo, el agua, la ventana), que se quedan con lo pintado antes
function c_capa(R, clave, luz, dibuja) {
  const k = clave + '|' + luz; let b = c_capas.get(k);
  if (!b) {
    b = R.nuevo(); b.fill(c_VACIO); const prev = R.usar(b); dibuja(); R.recorte(null); R.usar(prev);
    if (luz !== 'dia') { const g = c_grado(luz); for (let i = 0; i < b.length; i++) if (b[i] !== c_VACIO) b[i] = g(b[i]); }
    c_capas.set(k, b);
  }
  const B = R.buf; for (let i = 0; i < B.length; i++) { const v = b[i]; if (v !== c_VACIO) B[i] = v; }
}

// el cielo rico de la isla (el cielo() compartido no se toca): bandas con transición tramada, sol con halo, cirros
// casi quietos y cúmulos de tres tonos a dos velocidades; de amanecer, rosado; de noche, estrellas que titilan y la luna.
// o.hor; o.modo: 'dia' | 'tarde' | 'amanecer' | 'noche'; o.sol [x, y, r]; o.luna [x, y, r]; o.cumulos (5); o.calima
// (0–1: el cielo blanquecino de la sequía)
const c_CIELOS = Object.fromEntries(Object.entries({
  dia: [[0, '#3a8ade'], [0.2, '#4aa6ea'], [0.42, '#74bef2'], [0.64, '#90caf2'], [0.82, '#a8daf4'], [0.94, '#d0e8ee']],
  tarde: [[0, '#24225a'], [0.14, '#3a3a7a'], [0.3, '#5e3e82'], [0.45, '#a0507a'], [0.58, '#cc626a'], [0.7, '#e88a5a'], [0.83, '#f8c070'], [0.94, '#fde4a4']],
  amanecer: [[0, '#3a4478'], [0.18, '#56588e'], [0.36, '#86689c'], [0.54, '#ba7896'], [0.7, '#e2969a'], [0.84, '#f4b8a2'], [0.95, '#fcdcc0']],
  noche: [[0, '#0c1030'], [0.3, '#141a3e'], [0.6, '#1e2650'], [0.84, '#2c3466'], [0.95, '#3a4274']],
  calima: [[0, '#6aa4d8'], [0.3, '#8abce2'], [0.6, '#b4d4e6'], [0.85, '#dce6e2'], [0.95, '#efeedd']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

// los tres tonos de las nubes de cada cielo
const c_NUBES = Object.fromEntries(Object.entries({ dia: ['#a8d6f2', '#d2ecfc', '#ffffff'], calima: ['#c8dce6', '#e4eef0', '#ffffff'], tarde: ['#7a4476', '#de8478', '#ffd4a4'], amanecer: ['#8a6088', '#e0a0b0', '#ffe4d8'], noche: ['#1a2048', '#262e58', '#343e6c'] }).map(([k, v]) => [k, v.map(hex)]));

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = [sombra, cuerpo, luz]
function c_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// el cielo de la isla (ver arriba: o.hor, o.modo, o.sol, o.luna, o.cumulos, o.calima)
function c_cielo(R, t, o = {}) {
  const { pset } = R, hor = o.hor ?? 80, luz = o.modo ?? 'dia', modo = luz === 'dia' && o.calima ? 'calima' : luz, B = R.buf, P = c_CIELOS[modo], tr = 3, lim = P.map(([f]) => Math.round(f * hor));
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = c_umbral(x, y) < p ? b : a;
  }
  const atom = (x, y) => x > 272 && y < 48, bajo = modo === 'tarde' || modo === 'amanecer';
  if (modo === 'noche') {
    const est = hex('#8a94c0'), lu = hex('#f4ecd0'), luS = hex('#c8c0a8');
    for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 301) * 319), y = Math.round(h(k, 2, 301) ** 1.25 * (hor - 6)); if (atom(x, y) || (y < 21 && x < 172)) continue; const tw = Math.sin(t * (1.4 + h(k, 3, 301) * 2.2) + k * 1.7);
      if (tw > -0.5) B[y * 320 + x] = tw > 0.45 ? C.blanco : est; }
    const [lx, ly, lr] = o.luna ?? [232, 30, 6];
    for (let y = ly - lr - 4; y <= ly + lr + 4; y++) for (let x = lx - lr - 4; x <= lx + lr + 4; x++) { if (y < 0 || y >= hor || x < 0 || x > 319) continue; const d = Math.hypot(x - lx, y - ly), d2 = Math.hypot(x - lx - lr * 0.55, y - ly + lr * 0.2);
      if (d <= lr && d2 > lr * 0.85) B[y * 320 + x] = d > lr - 1 || (x + y) % 5 === 0 ? luS : lu; else if (d > lr && d < lr + 4 && c_umbral(x, y) < (lr + 4 - d) / 8) B[y * 320 + x] = c_mezcla(B[y * 320 + x], lu, 0.25); }
  } else {
    const sol = o.sol === undefined ? (bajo ? [214, hor - 12, 12] : [236, 28, 7]) : o.sol;
    if (sol) {
      const [sx, sy, sr] = sol, gl = bajo ? hex('#ffe6a0') : hex('#fff8dc'), R2 = sr + (bajo ? 18 : 10) + (o.calima ? 8 : 0);
      for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
        const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (c_umbral(x, y) < q * q) B[y * 320 + x] = c_mezcla(B[y * 320 + x], gl, 0.42); }
      if (bajo) c_disco(R, sol, true);
    }
  }
  const cn = c_NUBES[modo];
  for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 302) * 46), x0 = ((h(k, 6, 302) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.max(24, Math.round(hor * (0.2 + k * 0.1)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 303) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) pset(x - 4, y + 1, cn[0]); } }
  const n = o.cumulos ?? 5;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(34, hor * 0.34) + k * hor * 0.12 : Math.max(30, hor * (0.5 + (k - 2) * 0.1))), x = ((h(k, 7, 302) * 470 + t * v) % 500) - 90;
    c_nube(R, Math.round(x), Math.min(y, hor - 8), w, k, cn); }
  if (!bajo && modo !== 'noche' && o.sol !== null) c_disco(R, o.sol ?? [236, 28, 7], false);
}

// el disco del sol con su borde y su brillo (bajo: amarillento, de tarde o de amanecer)
function c_disco(R, [sx, sy, sr], bajo) { R.disco(sx, sy, sr + 1, bajo ? hex('#ffd890') : C.solL); R.disco(sx, sy, sr, C.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec')); }

// una franja lejana (la otra orilla, el bosque del fondo): la cresta entre y0 − amp e y0, rellena hasta yb con c y
// tramada abajo con la bruma; o.arboles: color de los árboles sueltos; o.pinos: pinos en vez de matas. Devuelve la cresta
function c_colinas(R, y0, amp, yb, c, bruma, sem, o = {}) {
  const B = R.buf, cresta = new Int16Array(320);
  for (let x = 0; x < 320; x++) {
    const yc = Math.round(y0 - amp * (0.55 + 0.3 * Math.sin(x * 0.019 + sem) + 0.14 * Math.sin(x * 0.051 + sem * 2.3) + 0.06 * Math.sin(x * 0.13 + sem * 4.1))); cresta[x] = yc;
    for (let y = Math.max(0, yc); y <= yb; y++) { const p = (y - yb + 4) / 5; B[y * 320 + x] = p > 0 && c_umbral(x, y) < p ? bruma : c; }
  }
  if (o.arboles != null) for (let k = 0; k < (o.n ?? 30); k++) { const x = Math.round(h(k, sem, 304) * 319), y = cresta[x] + 1;
    if (o.pinos) { R.rect(x, y - 4, x, y, o.arboles); R.rect(x - 1, y - 3, x + 1, y - 2, o.arboles); } else { R.rect(x - 1, y - 1, x + 1, y, o.arboles); R.pset(x, y - 2, o.arboles); } }
  return cresta;
}

// agua que se mueve entre y0 e y1 (x0–x1): degradado de lejos (claro) a cerca (oscuro), ondas tramadas que corren y
// destellos que se encienden y apagan; cols = [claro, medio, oscuro, brillo] (ya teñidos con la luz)
function c_agua(R, t, x0, x1, y0, y1, cols, v = 3) {
  const B = R.buf, [cL, cM, cS, cB] = cols;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const u = (y - y0) / Math.max(1, y1 - y0), f = y * 320, ola = 6 + Math.round(u * 10), dx = t * v * (0.6 + u);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
      let c = c_umbral(x, y) < u * 1.2 - 0.1 ? (c_umbral(x + 1, y) < u - 0.45 ? cS : cM) : (c_umbral(x, y + 1) < u + 0.3 ? cM : cL);
      const q = h(Math.floor((x + dx) / ola), y, 420);
      if (q > 0.86) c = q > 0.97 && Math.sin(t * 3 + x * 0.7 + y) > 0.2 ? cB : cL; else if (q < 0.08) c = cS;
      B[f + x] = c; } }
}

// manchas suaves (0–1) para repartir la hierba seca o la arena sin cuadros
const c_manchas = (x, y, k = 0) => 0.5 + 0.28 * Math.sin(x * 0.053 + y * 0.11 + k) + 0.22 * Math.sin(x * 0.131 - y * 0.07 + k * 2.3);

// pradera: dos verdes a manchas, briznas claras y oscuras, la lejanía más pálida (y la hierba seca, si seca > 0)
function c_pradera(R, x0, x1, y0, y1, k = 0, seca = 0) {
  const B = R.buf, P = c_P;
  for (let y = Math.max(0, y0); y <= y1; y++) { const lej = (y - y0) / Math.max(1, y1 - y0), f = y * 320;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
      const m = h(x >> 3, y >> 2, 430 + k), s = seca > 0 && c_manchas(x, y, k) + (h(x, y, 441 + k) - 0.5) * 0.18 < seca;
      let c = s ? (m < 0.35 ? P.secaS : P.seca) : (m < 0.32 ? P.hierbaS : P.hierba);
      if (lej < 0.3 && c_umbral(x, y) < (0.3 - lej) * 2.4) c = s ? P.secaL : P.hierbaLej;
      const v = h(x, y, 431 + k);
      if (v < 0.07) c = s ? P.secaL : P.hierbaL; else if (v < 0.13) c = s ? P.secaS : P.hierbaD;
      else if ((y + (x >> 1)) % 3 === 0 && h(x, y >> 1, 432 + k) < 0.18) c = s ? P.secaS : P.hierbaS;
      if (lej > 0.6 && h(x, y, 433 + k) < 0.012) c = [hex('#f0e070'), hex('#f4f0e8'), hex('#c890d8')][(x + y) % 3];   // florecitas
      B[f + x] = c; } }
}

// suelo de arena (o de tierra pisada): granos claros y oscuros, huellas, conchas y ramitas
function c_arenal(R, x0, x1, y0, y1, P0, k = 0) {
  const B = R.buf, [c, cS, cL, cD] = P0;
  for (let y = Math.max(0, y0); y <= y1; y++) { const f = y * 320, lej = (y - y0) / Math.max(1, y1 - y0);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
      const m = c_manchas(x, y * 1.6, k + 7) + (h(x, y, 450 + k) - 0.5) * 0.22; let col = m < 0.28 ? cS : m > 0.86 ? c_mezcla(c, cL, 0.5) : c; const v = h(x, y, 451 + k);
      if (v < 0.06) col = cL; else if (v < 0.1) col = cS; else if (v > 0.985) col = cD;
      if ((x * 3 + y * 7) % 13 === 0 && lej > 0.4 && h(x >> 1, y, 452 + k) < 0.3) col = cS;   // ondulaciones del viento
      B[f + x] = col; } }
}

// pino del país (taeda): tronco alto y recto, con su lado de luz, ramas sueltas y la copa arriba en penachos de tres
// tonos; m: cuánto se mece la copa
function c_pino(R, x, base, alto, s, sem, m = 0, P = c_P) {
  const { rect, pset, linea, disco } = R, top = base - alto, tw = Math.max(1, Math.round(1.6 * s));
  rect(x - tw, top + 6, x + tw, base, P.tronco); rect(x + tw, top + 6, x + tw, base, P.troncoL); rect(x - tw, top + 6, x - tw, base, P.troncoS);
  for (let y = top + 8; y < base; y += 3) if (h(x, y, 460 + sem) < 0.4) pset(x - tw + 1, y, P.troncoS);
  const n = 7 + Math.round(s * 3), bolas = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), cy = top + 2 + u * alto * 0.34, cx = x + (h(i, sem, 461) - 0.5) * 22 * s * (0.5 + u) + m * (1 - u), r = (2.6 + h(i, sem, 462) * 3) * s;
    if (i > 1) linea(x, Math.round(cy + r * 0.6), Math.round(cx), Math.round(cy), P.troncoS); bolas.push([cx, cy, r]); }
  for (const [cx, cy, r] of bolas) disco(cx, cy + 1, r, P.copaS);
  for (const [cx, cy, r] of bolas) disco(cx - 0.5, cy, r * 0.82, P.copa);
  for (const [cx, cy, r] of bolas) disco(cx + r * 0.25, cy - r * 0.3, r * 0.45, P.copaL);
  for (const [cx, cy, r] of bolas) for (let k = 0; k < 4; k++) pset(Math.round(cx + (h(k, cy, 463) - 0.5) * r * 1.6), Math.round(cy + (h(k, cx, 464) - 0.5) * r), k % 2 ? P.copaLL : P.copaS);
}

// roble de copa ancha y baja, con barbas de musgo que cuelgan de las ramas
function c_roble(R, x, base, s, sem, m = 0, P = c_P) {
  const { rect, pset, linea, disco } = R, top = base - Math.round(34 * s), tw = Math.round(2.5 * s);
  rect(x - tw, top + 10, x + tw, base, P.tronco); rect(x + tw - 1, top + 10, x + tw, base, P.troncoL); rect(x - tw, top + 10, x - tw, base, P.troncoS);
  linea(x, top + 14, x - 14 * s, top + 6, P.tronco); linea(x, top + 12, x + 13 * s, top + 4, P.tronco); linea(x, top + 16, x - 8 * s, top + 4, P.troncoS);
  const bolas = []; for (let i = 0; i < 8; i++) { const a = (i / 7 - 0.5) * 2.6, cx = x + Math.sin(a) * 18 * s + m * 0.6, cy = top + 6 - Math.cos(a) * 8 * s + h(i, sem, 470) * 3, r = (5 + h(i, sem, 471) * 3) * s; bolas.push([cx, cy, r]); }
  for (const [cx, cy, r] of bolas) disco(cx, cy + 1, r, P.robleS);
  for (const [cx, cy, r] of bolas) disco(cx - 0.5, cy, r * 0.8, P.roble);
  for (const [cx, cy, r] of bolas) disco(cx + r * 0.3, cy - r * 0.35, r * 0.4, P.robleL);
  for (let k = 0; k < 10; k++) { const mx = Math.round(x + (h(k, sem, 472) - 0.5) * 34 * s), my = Math.round(top + 8 + h(k, sem, 473) * 6 * s), L = Math.round((4 + h(k, sem, 474) * 7) * s), sw = Math.round(m * 0.3);
    for (let j = 0; j < L; j++) pset(mx + (j > L / 2 ? sw : 0), my + j, j % 3 === 2 ? P.musgoS : P.musgo); }
}

// tejado de juncos a cuatro aguas visto de frente (de x0 a x1 en el alero ye, hasta la cumbrera yr): hiladas, briznas,
// el faldón derecho al sol y el izquierdo en sombra, el alero grueso y desflecado
function c_tejado(R, x0, x1, ye, yr, P = c_P) {
  const { poligono, pset } = R, inc = (ye - yr) * 0.7, xa = x0 + inc, xb = x1 - inc;
  poligono([[x0 - 4, ye + 2], [xa, yr], [xb, yr], [x1 + 4, ye + 2]], (x, y) => {
    const v = h(x, (y / 2) | 0, 480), curso = (y - yr) % 5 === 4, der = x > xb - (y - yr) * 0.2, izq = x < xa + (y - yr) * 0.1 - 2;
    let c = v < 0.2 ? P.pajaS : v > 0.86 ? P.pajaL : P.paja;
    if (x % 3 === 0 && v < 0.55) c = P.pajaS;
    if (curso && h(x >> 1, y, 481) < 0.75) c = P.pajaS;
    if (der) c = c === P.pajaS ? P.paja : P.pajaL; else if (izq) c = c === P.pajaL ? P.paja : P.pajaS;
    if (y <= yr + 1) c = P.pajaD;
    return c; });
  for (let x = Math.round(x0 - 4); x <= x1 + 4; x++) { const L = 1 + Math.round(h(x, 7, 482) * 2); for (let j = 0; j < L; j++) pset(x, ye + 2 + j, j === L - 1 ? P.pajaD : P.pajaS); }
  for (let x = Math.round(xa); x <= xb; x += 4) pset(x, yr - 1, P.pajaD);
}

// casita de los colonos: zócalo de piedra, entramado de madera con paneles de barro (alguno desconchado deja ver el
// zarzo), puerta de tablas, ventanuco con postigo, tejado de juncos y chimenea de barro y palos a la derecha.
// Devuelve dónde sale el humo
function c_casa(R, x0, x1, base, alto, techo, o = {}) {
  const { rect, pset, linea } = R, P = c_P, yw = base - alto;
  for (let y = yw; y <= base - 3; y++) for (let x = x0; x <= x1; x++) { const v = h(x, y, 490 + x0); pset(x, y, y < yw + 3 ? P.barroS : v < 0.08 ? P.barroS : v > 0.93 ? P.barroL : P.barro); }
  if (o.desconchado !== false) { const dx = x0 + Math.round((x1 - x0) * 0.22), dy = yw + Math.round(alto * 0.45); for (let j = 0; j < 5; j++) for (let i = 0; i < 6 - (j % 2); i++) pset(dx + i + (j % 2), dy + j, (i + j) % 2 ? P.zarzo : P.tablaS); }
  const n = Math.max(2, Math.round((x1 - x0) / 15));
  for (let i = 0; i <= n; i++) { const px = Math.round(x0 + i * (x1 - x0) / n); rect(px - 1, yw, px + 1, base - 3, P.tabla); pset(px + 1, yw + 2, P.tablaL); rect(px - 1, yw, px - 1, base - 3, P.tablaS);
    if (i < n && i % 2 === 0) linea(px + 2, base - 4, Math.round(x0 + (i + 1) * (x1 - x0) / n) - 2, yw + Math.round(alto * 0.5), P.tablaS); }
  rect(x0, yw, x1, yw + 1, P.tabla); rect(x0, yw + 1, x1, yw + 1, P.tablaS); rect(x0, base - 4, x1, base - 3, P.tabla); rect(x0, base - 3, x1, base - 3, P.tablaS);
  for (let x = x0 - 1; x <= x1 + 1; x++) for (let y = base - 2; y <= base; y++) pset(x, y, h(x >> 1, y, 491) < 0.4 ? P.piedraS : y === base - 2 ? P.piedraL : P.piedra);
  if (o.puerta) { const [a, b] = o.puerta, yp = yw + Math.round(alto * 0.22); rect(a - 1, yp - 1, b + 1, base - 3, P.tablaD); for (let x = a; x <= b; x++) for (let y = yp; y <= base - 4; y++) pset(x, y, (x - a) % 3 === 2 ? P.tablaS : h(x, y >> 2, 492) < 0.15 ? P.tablaL : P.tabla);
    rect(a, yp + 3, b, yp + 3, P.tablaS); rect(a, base - 8, b, base - 8, P.tablaS); pset(b - 1, Math.round((yp + base) / 2), P.hierro); }
  if (o.ventana) { const [a, b] = o.ventana, yv = yw + Math.round(alto * 0.25), yv1 = yv + Math.round((b - a) * 0.8); rect(a - 1, yv - 1, b + 1, yv1 + 1, P.tablaD); rect(a, yv, b, yv1, hex('#2a2018')); pset(a + 1, yv + 1, hex('#4a3a28'));
    for (let y = yv; y <= yv1; y++) for (let x = b + 2; x <= b + 2 + (b - a); x++) pset(x, y, (x - b) % 3 === 0 ? P.tablaS : P.tablaL); rect(a - 2, yv1 + 2, b + 2, yv1 + 2, P.tablaS); }
  c_tejado(R, x0, x1, yw, yw - techo, P);
  let humo = null;
  if (o.chimenea !== false) { const cx = x1 - 7, ct = yw - techo - 5;
    for (let y = ct; y <= base - 3; y++) for (let x = cx - 3; x <= cx + 3; x++) { const v = h(x, y, 493); pset(x, y, x === cx + 3 ? P.barroS : x === cx - 3 ? P.barroL : v < 0.15 ? P.barroS : P.barro); }
    for (let y = ct + 3; y < base - 3; y += 5) rect(cx - 3, y, cx + 3, y, P.tablaS);
    rect(cx - 4, ct, cx + 4, ct + 1, P.barroS); rect(cx - 2, ct, cx + 2, ct, P.hollin); humo = [cx, ct - 1]; }
  return humo;
}

// lo que queda de una casa desmontada (1590): los postes de las esquinas, una viga caída, tablas en montón y la hierba
// que crece entre todo
function c_ruina(R, x0, x1, base, alto, k = 0) {
  const { rect, pset, linea } = R, P = c_P;
  for (const [px, b, a] of [[x0 + 5, base - 5, alto - 6], [x1 + 5, base - 5, alto - 9], [x0, base, alto], [x1, base, alto - 3]]) { rect(px - 1, b - a, px + 1, b, P.log); rect(px + 1, b - a, px + 1, b, P.logL); rect(px - 1, b - a, px - 1, b, P.logS); pset(px, b - a - 1, P.logS); }
  linea(x0 + 1, base - alto + 3, x1 - 2, base - 2, P.logS); linea(x0 + 1, base - alto + 2, x1 - 2, base - 3, P.log);
  for (let j = 0; j < 4; j++) { const y = base - 1 - j * 2, a = x0 + 4 + j * 2 + (j % 2), b = x1 - 6 - j; rect(a, y - 1, b, y, P.tabla); rect(a, y - 1, b, y - 1, P.tablaL); pset(b, y, P.tablaD); }
  for (let i = 0; i < (x1 - x0) * 1.2; i++) { const x = x0 - 3 + Math.round(h(i, k, 494) * (x1 - x0 + 6)), L = 2 + Math.round(h(i, k, 495) * 5); linea(x, base, x + (i % 3) - 1, base - L, i % 4 ? P.hierbaS : P.hierbaL); }
}

// la empalizada: estacas altas, aguzadas, con su luz y su sombra, la corteza a vetas y los cortes del hacha en la punta;
// una cuerda las ata. pts: [x, base, alto] de cada estaca; w: ancho; dentro: se ve la cara de dentro (más oscura)
function c_estacas(R, pts, w, dentro = false, fresca = false) {
  const { pset } = R, P = c_P, c0 = fresca ? P.logL : P.log, cS = dentro ? P.logD : P.logS, cL = fresca ? P.vivo : P.logL;
  for (const [x0, base, alto, k] of pts) {
    const top = base - alto, punta = Math.max(3, Math.round(w * 0.9));
    for (let i = 0; i < w; i++) { const u = (i + 0.5) / w, x = x0 + i;
      for (let y = top; y <= base; y++) {
        const dy = y - top; if (dy < punta && Math.abs(u - 0.5) * 2 > dy / punta) continue;
        let c = i === 0 ? P.logD : u < 0.3 ? cS : u > 0.62 && u < 0.86 ? (dentro ? c0 : cL) : c0;
        if (dy < punta) c = u > 0.5 ? (dentro ? P.logL : P.vivo) : P.vivoS;
        else { const v = h(x, (y / 3) | 0, 500 + (k ?? 0)); if (v < 0.13) c = cS; else if (v > 0.93 && !dentro) c = cL; }
        pset(x, y, c); } }
    const yc = top + Math.round(alto * 0.3); pset(x0, yc, P.tablaD); for (let i = 0; i < w; i++) pset(x0 + i, yc + (i % 2), P.pajaS);
  }
}

// cofre abierto y revuelto (los de White): la caja con flejes de hierro, la tapa abierta hacia atrás, la ropa y los
// papeles que asoman y se han caído (renglones, sin letras)
function c_cofre(R, x, base, s = 1, k = 0, dir = 1) {
  const { rect, pset, poligono, linea } = R, P = c_P, w = Math.round(14 * s), a = Math.round(8 * s), y0 = base - a;
  poligono([[x, y0], [x + w, y0], [x + w + 3 * dir * s, y0 - 7 * s], [x + 2 * dir * s, y0 - 8 * s]], (xx, yy) => h(xx, yy >> 1, 510 + k) < 0.2 ? P.tablaS : P.tablaL);
  linea(x + 2 * dir * s, y0 - 8 * s, x + w + 3 * dir * s, y0 - 7 * s, P.tablaD);
  rect(x, y0, x + w, base, P.tablaD); rect(x + 1, y0 + 1, x + w - 1, base - 1, P.tabla); rect(x + 1, y0 + 1, x + w - 1, y0 + 2, hex('#2a1e14'));
  for (const fx of [x + 2, x + w - 3]) { rect(fx, y0, fx + 1, base, P.hierro); pset(fx, y0 + 3, P.oxidoL); }
  rect(x + Math.round(w / 2) - 1, y0 + 3, x + Math.round(w / 2), y0 + 4, P.oxido);
  rect(x + 3, y0 - 1, x + 7, y0 + 1, k % 2 ? P.rojoT : P.azulT); pset(x + 8, y0, P.blancoT); pset(x + 9, y0 - 1, P.blancoT);
  const px = x + w + 2, py = base - 1; rect(px, py - 2, px + 7, py, P.blancoT); rect(px + 8, py - 2, px + 15, py, C.papel); pset(px + 7, py - 2, P.tablaD);
  for (let i = 1; i < 7; i += 2) { pset(px + i, py - 1, P.piedraS); pset(px + 8 + i, py - 1, P.piedraS); }
  rect(x - 9, base - 1, x - 3, base, P.blancoT); linea(x - 9, base - 2, x - 4, base - 3, P.blancoT); pset(x - 7, base - 1, P.piedraS);
}

// cañón viejo tumbado en la hierba, sin cureña, oxidado a manchas, con la boca y el cascabel
function c_canon(R, x, base, L = 22, dir = 1) {
  const { pset, disco } = R, P = c_P;
  for (let i = 0; i <= L; i++) { const r = 3 - i / L * 1.1, xx = x + i * dir;
    for (let j = -Math.ceil(r); j <= Math.ceil(r); j++) { const y = base - 3 + j; if (Math.abs(j) > r) continue; const v = h(xx, y, 520);
      pset(xx, y, j <= -r + 1 ? P.oxidoL : j >= r - 1 ? P.oxidoS : v < 0.35 ? P.oxido : v < 0.6 ? P.hierro : P.oxido); } }
  for (const i of [3, 9, L - 2]) for (let j = -3; j <= 3; j++) pset(x + i * dir, base - 3 + j, P.oxidoS);
  disco(x - 2 * dir, base - 3, 1.6, P.oxidoS); pset(x - 3 * dir, base - 3, P.oxido); pset(x + L * dir + dir, base - 3, P.hollin); pset(x + L * dir + dir, base - 4, P.hollin);
}

// las letras de las tallas (la ÚNICA excepción de letras del episodio): C, R, O, A, T, N en 8 × 10, trazo de 2
const c_LETRAS = {
  C: ['..####..', '.##..##.', '##......', '##......', '##......', '##......', '##......', '##......', '.##..##.', '..####..'],
  R: ['######..', '##...##.', '##...##.', '##...##.', '######..', '##.##...', '##..##..', '##..##..', '##...##.', '##...##.'],
  O: ['..####..', '.##..##.', '##....##', '##....##', '##....##', '##....##', '##....##', '##....##', '.##..##.', '..####..'],
  A: ['...##...', '..####..', '.##..##.', '.##..##.', '##....##', '##....##', '########', '##....##', '##....##', '##....##'],
  T: ['########', '########', '...##...', '...##...', '...##...', '...##...', '...##...', '...##...', '...##...', '...##...'],
  N: ['##....##', '###...##', '###...##', '##.#..##', '##.##.##', '##..#.##', '##...###', '##...###', '##....##', '##....##'],
};

// talla una palabra en la madera, píxel a píxel: el surco oscuro, su pared de sombra y el borde de madera viva que
// brilla. sx, sy: escala (1.5 → trazos de 3 px); vertical: una letra debajo de otra. luzY: hasta dónde la ha barrido la
// luz (lo de debajo queda en penumbra); g: la luz del momento
function c_tallar(R, palabra, x, y, sx, sy, vertical, g, luzY = 999, sep = 2) {
  const P = c_P, W = Math.round(8 * sx), H = Math.round(10 * sy), on = new Set();
  [...palabra].forEach((l, n) => { const G = c_LETRAS[l], ox = vertical ? x : x + n * (W + sep), oy = vertical ? y + n * (H + sep) : y;
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) if (G[Math.min(9, Math.floor(j / sy))][Math.min(7, Math.floor(i / sx))] === '#') on.add((oy + j) * 320 + ox + i); });
  const es = (xx, yy) => on.has(yy * 320 + xx);
  for (const p of on) { const xx = p % 320, yy = (p / 320) | 0; if (yy > luzY) continue;   // lo que la luz aún no ha barrido no se lee
    if (!es(xx, yy - 1) || !es(xx - 1, yy)) R.pset(xx, yy, g(P.surcoS)); else R.pset(xx, yy, g(P.surco));
    if (!es(xx, yy - 1)) R.pset(xx, yy - 1, g(P.vivoL));
    if (!es(xx - 1, yy)) R.pset(xx - 1, yy, g(P.vivoL));
    if (!es(xx + 1, yy)) R.pset(xx + 1, yy, g(P.vivoS));
    if (!es(xx, yy + 1)) R.pset(xx, yy + 1, g(P.vivoS)); }
  return [x - 1, y - 1, vertical ? x + W : x + palabra.length * (W + sep) - sep, vertical ? y + palabra.length * (H + sep) - sep : y + H];
}

// la madera sin corteza donde va la talla: vetas largas verticales, nudos y los bordes de la corteza arrancada
function c_pelado(R, x0, y0, x1, y1, g, k = 0) {
  const P = c_P;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const borde = x === x0 || x === x1 || (y === y0 && h(x, 0, 530 + k) < 0.7) || (y === y1 && h(x, 1, 530 + k) < 0.7); if (borde && h(x, y, 531 + k) < 0.5) { R.pset(x, y, g(P.logD)); continue; }
    const veta = h(x, (y / 5) | 0, 532 + k); let c = veta < 0.16 ? P.vivoS : veta > 0.9 ? P.vivoL : P.vivo;
    if ((x - x0) / (x1 - x0) > 0.78) c = c === P.vivoL ? P.vivo : c_mezcla(c, P.vivoS, 0.5);
    if ((x - x0) / (x1 - x0) < 0.12) c = c_mezcla(c, P.vivoS, 0.4);
    R.pset(x, y, g(c)); }
}

// gente pequeña de fondo (10–12 px): 'martillo', 'azada', 'cubos' (anda con dos cubos), 'tender' (tiende ropa),
// 'anda'; d: hacia dónde mira
function c_gente(R, x, base, t, tipo, ropa, g, d = 1, k = 0, gorro = c_P.tablaD) {
  const { pset, rect, linea } = R, P = c_P, piel = g(P.piel), r = g(ropa), rS = g(c_mezcla(ropa, C.k, 0.35)), pi = g(P.tablaD);
  x = Math.round(x); base = Math.round(base);
  const anda = tipo === 'anda' || tipo === 'cubos', paso = anda ? Math.floor(t * 6 + k) % 2 : 0;
  rect(x - 1, base + 1, x + 3, base + 1, g(P.hierbaD));
  pset(x + paso, base, pi); pset(x + paso, base - 1, pi); pset(x + 2 - paso, base, pi); pset(x + 2 - paso, base - 1, pi); rect(x, base - 2, x + 2, base - 2, rS);
  rect(x, base - 7, x + 2, base - 3, r); rect(d > 0 ? x : x + 2, base - 7, d > 0 ? x : x + 2, base - 3, rS);
  rect(x, base - 10, x + 2, base - 8, piel); pset(d > 0 ? x + 2 : x, base - 9, g(P.pielS)); rect(x - 1, base - 11, x + 3, base - 11, g(gorro)); rect(x, base - 12, x + 2, base - 12, g(gorro));
  const fx = x + (d > 0 ? 3 : -1), u = (t * 1.6 + k * 0.37) % 1;
  if (tipo === 'martillo') { const up = u < 0.5, hx = fx + d * 2, hy = up ? base - 11 : base - 5; linea(fx, base - 6, hx, hy, r); pset(hx, hy, piel); rect(hx, hy - 1, hx + d, hy - 1, g(P.hierro)); }
  else if (tipo === 'azada') { const up = u < 0.45, hx = fx + d * (up ? 1 : 3), hy = up ? base - 10 : base - 5; linea(fx, base - 6, hx, hy, r); linea(hx, hy, hx + d * (up ? 2 : 4), up ? hy - 4 : base, g(P.tabla)); pset(hx + d * (up ? 2 : 4), up ? hy - 5 : base, g(P.hierro)); }
  else if (tipo === 'cubos') { for (const s of [-1, 1]) { const bx = s < 0 ? x - 2 : x + 4; pset(bx, base - 5, r); rect(bx - 1, base - 4, bx + 1, base - 2, g(P.tablaS)); pset(bx, base - 4, g(P.agua)); } }
  else if (tipo === 'tender') { const up = Math.sin(t * 2 + k) > 0; pset(fx, base - 7, r); pset(fx, base - 8 - (up ? 1 : 0), r); pset(fx, base - 9 - (up ? 1 : 0), piel); }
  else { pset(fx, base - 5 + paso, r); }
}

// gallina que picotea (la cabeza baja y sube), blanca o rubia
function c_gallina(R, x, base, t, k, g) {
  const { pset, rect } = R, P = c_P, c = g(k % 2 ? P.gallinaP : P.gallina), cS = g(k % 2 ? P.oxidoS : P.gallinaS), d = k % 3 === 0 ? -1 : 1, pica = Math.sin(t * 2.3 + k * 1.7) > 0.55;
  x = Math.round(x + Math.sin(t * 0.3 + k) * 4); rect(x - 2, base - 4, x + 2, base - 2, c); rect(x - 2, base - 2, x + 1, base - 2, cS); pset(x - 3 * d, base - 5, c); pset(x - 3 * d, base - 4, cS);
  pset(x, base - 1, g(P.ocreT)); pset(x - d, base, g(P.ocreT)); pset(x + d, base, g(P.ocreT));
  const hx = x + 3 * d, hy = pica ? base - 2 : base - 6; pset(hx, hy, c); pset(hx, hy - 1, g(P.cresta)); pset(hx + d, hy, g(P.ocreT)); if (!pica) pset(x + 2 * d, base - 5, c);
}

// cabra que rumia: mueve la mandíbula y la cola
function c_cabra(R, x, base, t, g, d = 1) {
  const { pset, rect } = R, P = c_P, c = g(P.cabra), cS = g(P.cabraS), k = g(P.tablaD);
  rect(x - 5, base - 7, x + 4, base - 4, c); rect(x - 5, base - 4, x + 4, base - 4, cS);
  for (const lx of [-4, -2, 2, 4]) { pset(x + lx * d, base - 3, cS); pset(x + lx * d, base - 2, cS); pset(x + lx * d, base - 1, k); }
  const m = Math.floor(t * 3) % 2, hx = x + 6 * d; rect(Math.min(hx, hx + d * 2), base - 10, Math.max(hx, hx + d * 2), base - 8, c); pset(hx + 3 * d, base - 8 + m, c); pset(hx + d, base - 10, k);
  pset(hx, base - 11, cS); pset(hx - d, base - 12, cS); pset(hx + 2 * d, base - 7 + m, cS); pset(hx + 1 * d, base - 9, g(P.hollin));
  pset(x - 6 * d, base - 7 - (Math.sin(t * 5) > 0 ? 1 : 0), cS);
}

// aves que cruzan el cielo, aleteando (gaviotas claras o cuervos oscuros); se apartan de Atom y del año
function c_aves(R, t, n, y0, v, sem, col, colS) {
  for (let k = 0; k < n; k++) { const ciclo = 420 / v + 4 + k, u = ((t + h(k, sem, 540) * ciclo) % ciclo), x = Math.round(-20 + u * v + (k % 2) * 6 - k * 4 * (v > 0 ? 1 : -1)), y = Math.round(y0 + (h(k, sem, 541) - 0.5) * 16 + Math.sin(t * 1.3 + k) * 2);
    const xx = v > 0 ? x : 319 - x; if ((xx > 270 && y < 50) || (xx < 174 && y < 24)) continue; const a = Math.floor(t * 5 + k * 1.3) % 3;
    R.pset(xx, y, col); R.pset(xx - 1, y - (a === 0 ? 1 : 0), col); R.pset(xx + 1, y - (a === 0 ? 1 : 0), col); R.pset(xx - 2, y - (a === 1 ? 0 : a === 0 ? 2 : -1), colS); R.pset(xx + 2, y - (a === 1 ? 0 : a === 0 ? 2 : -1), colS); }
}

// matas de hierba alta que se mecen (briznas de 2 tonos); lista: [x, base, alto]
function c_matas(R, t, lista, g, seca = false, k = 0) {
  const P = c_P, c0 = g(seca ? P.seca : P.hierba), c1 = g(seca ? P.secaL : P.hierbaL), c2 = g(seca ? P.secaS : P.hierbaD);
  for (const [x, base, alto] of lista) { const s = Math.sin(t * 1.8 + x * 0.15 + k) * 1.6;
    for (let i = -2; i <= 2; i++) { const L = alto - Math.abs(i) * 2, tx = Math.round(x + i * 1.5 + s * (L / alto)), ty = base - L; R.linea(x + i, base, tx, ty, i === 0 ? c1 : i < 0 ? c2 : c0); if (i === 1 && seca) R.pset(tx, ty - 1, g(P.secaL)); } }
}

// humo que sube de una chimenea o una fragua: bolitas que crecen, se inclinan con el viento y se deshacen (y0min: no
// pasa de ahí)
function c_humo(R, x, y, t, g, k = 0, alto = 26, y0min = 0) {
  const P = c_P; for (let i = 0; i < 6; i++) { const u = ((t * 0.32 + i / 6 + k * 0.13) % 1), r = u < 0.3 ? 1 : u < 0.7 ? 2 : 3, xx = Math.round(x + Math.sin(u * 5 + i + k) * 2 + u * 9), yy = Math.round(y - u * alto); if (yy < y0min) continue;
    if (u > 0.82 && i % 2) continue; R.disco(xx, yy, r, g(u > 0.6 ? P.humo : P.humoS)); if (r > 1) R.pset(xx - 1, yy - 1, g(C.blanco)); }
}

// fuego de hogar o de fragua: lenguas de tres tonos que bailan y chispas que suben (sin teñir: da luz)
function c_llamas(R, x0, x1, base, alto, t, k = 0) {
  const P = c_P;
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / Math.max(1, x1 - x0), f = Math.sin(u * Math.PI), a = Math.round(alto * f * (0.6 + 0.4 * Math.sin(t * 9 + x * 1.7 + k)) + h(x, Math.floor(t * 8), 550) * 2);
    for (let j = 0; j <= a; j++) R.pset(x, base - j, j > a * 0.7 ? P.brasa : j > a * 0.35 ? P.fuego : P.fuegoL); }
  for (let i = 0; i < 4; i++) { const u = (t * 0.9 + i * 0.25 + k * 0.1) % 1; R.pset(Math.round(x0 + (h(i, k, 551) * (x1 - x0)) + Math.sin(t * 4 + i) * 2), Math.round(base - alto - u * 16), u < 0.6 ? P.fuegoL : P.brasa); }
}

// resplandor tramado de una luz (fuego, vela) sobre lo que ya está pintado
function c_resplandor(R, cx, cy, r, col, a = 0.35) {
  for (let y = Math.round(cy - r); y <= cy + r; y++) for (let x = Math.round(cx - r); x <= cx + r; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue; const d = Math.hypot(x - cx, y - cy) / r; if (d >= 1) continue;
    if (c_umbral(x, y) < (1 - d) * 1.3) R.pset(x, y, c_mezcla(R.pget(x, y), col, a * (1 - d * 0.6))); }
}

// las sombras de las nubes que pasan por el suelo (oscurecen a trama); y0–y1: la franja del suelo
function c_sombrasNubes(R, t, y0, y1, a = 0.16) {
  for (let k = 0; k < 2; k++) { const cx = ((t * 7 + k * 230) % 560) - 120, cy = y0 + (y1 - y0) * (0.35 + k * 0.4), rx = 60 - k * 12, ry = 6 + k * 3;
    for (let y = Math.round(cy - ry); y <= cy + ry; y++) { const w = rx * Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2)); for (let x = Math.max(0, Math.round(cx - w)); x <= Math.min(319, cx + w); x++) if ((x + y) & 1) R.pset(x, y, c_mezcla(R.pget(x, y), C.k, a)); } }
}

// niebla baja del amanecer: una franja tramada rosada que deriva despacio y se espesa abajo
function c_niebla(R, t, y0, y1, dens = 0.5) {
  const col = hex('#f4d4d4'); for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0), f = y * 320; for (let x = 0; x < 320; x++) {
    const q = dens * Math.sin(u * Math.PI) * (0.55 + 0.45 * Math.sin((x + t * 6) * 0.045 + y * 0.2 + Math.sin(x * 0.013 - t * 0.3) * 2));
    if (c_umbral(x, y) < q * 0.7) R.buf[f + x] = c_mezcla(R.buf[f + x], col, 0.4); } }
}

// el sol (o la luna) de cada luz, y las aguas teñidas
const c_sol = (luz, hor, dia = [236, 28, 7]) => (luz === 'tarde' ? [70, hor - 10, 11] : luz === 'amanecer' ? [246, hor - 6, 10] : dia);

// los colores del agua del estrecho con la luz del momento
const c_aguas = (g, P = c_P) => [g(P.aguaL), g(P.agua), g(P.aguaS), g(P.aguaB)];

// el fondo: la otra orilla del estrecho, el agua que brilla entre los árboles, pinos y robles con musgo y el claro
function c_fondoIsla(R, hor) {
  const P = c_P, { rect, pset } = R;
  c_colinas(R, hor - 1, 5, hor + 1, P.lej1, P.lej2, 2.1, { arboles: P.lej0, n: 46, pinos: true });
  // la orilla de este lado: arena, juncos y la franja de matorral bajo los árboles (con un claro en el centro)
  for (let x = 0; x < 320; x++) { const yb = 88 + Math.round(Math.sin(x * 0.07) * 1.2); for (let y = yb; y <= 101; y++) pset(x, y, y === yb ? P.arenaL : h(x, y, 560) < 0.3 ? P.arenaS : P.arena);
    if (h(x, 3, 561) < 0.5) { const L = 2 + Math.round(h(x, 4, 561) * 4); R.linea(x, 92, x + (x % 3) - 1, 92 - L, h(x, 5, 561) < 0.5 ? P.hierbaS : P.secaS); } }
  const pinos = [[4, 68], [16, 74], [27, 64], [40, 72], [54, 66], [96, 70], [110, 64], [124, 58], [212, 60], [226, 68], [240, 62], [255, 70], [268, 64], [284, 48], [298, 52], [312, 46]];
  for (const [x, a] of pinos) c_pino(R, x, 98, a, 1, x, 0);
  c_roble(R, 76, 100, 1.1, 3); c_roble(R, 196, 99, 0.9, 5);
  for (let x = 0; x < 320; x++) { const claro = x > 136 && x < 186, top = claro ? 95 + Math.round(h(x >> 2, 1, 562) * 2) : 84 + Math.round(Math.abs(Math.sin(x * 0.11)) * 5 + h(x >> 1, 2, 562) * 3);
    for (let y = top; y <= 101; y++) { const v = h(x, y, 563); pset(x, y, y === top ? P.copaL : v < 0.3 ? P.copaS : v > 0.85 ? P.copaL : P.copa); } }
  for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 564) * 319); if (x > 136 && x < 186) continue; R.disco(x, 92 + Math.round(h(k, 2, 564) * 4), 3 + Math.round(h(k, 3, 564) * 2), k % 2 ? P.copaS : P.copa); pset(x + 1, 90 + Math.round(h(k, 2, 564) * 4), P.copaLL); }
}

// el camino de arena del claro, en perspectiva, con roderas y huellas
function c_camino(R, yA, yB, xA0, xA1, xB0, xB1, k = 0) {
  const P = c_P; for (let y = yA; y <= yB; y++) { const u = (y - yA) / (yB - yA), a = Math.round(xA0 + (xB0 - xA0) * u + Math.sin(y * 0.15) * 2), b = Math.round(xA1 + (xB1 - xA1) * u + Math.sin(y * 0.15) * 2);
    for (let x = a; x <= b; x++) { const v = h(x, y, 570 + k), w = (x - a) / Math.max(1, b - a); let c = v < 0.1 ? P.arenaS : v > 0.92 ? P.arenaL : P.arena; if (Math.abs(w - 0.3) < 0.05 || Math.abs(w - 0.7) < 0.05) c = P.arenaS; if (x === a || x === b) c = P.hierbaS; R.pset(x, y, c); } }
}

// la capa fija del general del fuerte: el fondo de la isla, el claro y lo de cada época (casas o empalizada)
function c_fuerteFijo(R, ep) {
  const P = c_P, { rect, pset, linea, disco } = R, hor = 72;
  c_fondoIsla(R, hor);
  c_pradera(R, 0, 319, 101, 179, 0, ep === 1590 ? 0.25 : 0);
  if (ep === 1587) {
    c_camino(R, 101, 179, 158, 176, 132, 196);
    // el huerto cercado a la derecha (surcos con matas)
    for (let y = 116; y <= 136; y++) for (let x = 258; x <= 319; x++) pset(x, y, (y - 116) % 4 === 0 ? P.tierraS : h(x, y, 575) < 0.2 ? P.tierraL : P.tierra);
    for (let y = 118; y <= 134; y += 4) for (let x = 262; x < 318; x += 5) { disco(x, y - 1, 1.6, P.hierbaS); pset(x, y - 2, P.hierbaL); }
    for (let x = 256; x <= 319; x += 4) { rect(x, 111, x, 118, P.tablaS); } for (const y of [113, 116]) for (let x = 256; x <= 319; x++) pset(x, y + ((x >> 1) % 2), (x >> 1) % 2 ? P.tabla : P.tablaS);
    for (let y = 136; y <= 142; y += 3) for (let x = 254; x <= 319; x++) pset(x, y + ((x >> 1) % 2), (x >> 1) % 2 ? P.tabla : P.tablaS); for (let x = 254; x <= 319; x += 4) rect(x, 133, x, 141, P.tablaS);
    // las casitas: una pequeña al fondo, otra a la izquierda y la de los Dare
    c_casa(R, 106, 136, 113, 12, 10, { puerta: [118, 122], chimenea: false, desconchado: false });
    c_casa(R, 42, 94, 128, 18, 14, { puerta: [56, 62], ventana: [74, 78] });
    c_casa(R, 182, 248, 150, 26, 22, { puerta: [194, 203], ventana: [216, 222] });
    // el pozo: brocal de piedra, dos horcones, el torno con su soga
    { const x = 140, b = 140; for (let j = 0; j < 7; j++) for (let i = -7; i <= 7; i++) pset(x + i, b - j, (i + (j >> 1) * 3 + 20) % 5 === 0 || j % 3 === 0 ? P.piedraS : i > 3 ? P.piedraL : P.piedra);
      rect(x - 7, b - 7, x + 7, b - 7, P.piedraL); rect(x - 5, b - 8, x + 5, b - 8, hex('#1e2a2a'));
      for (const s of [-6, 6]) { rect(x + s, b - 20, x + s, b - 7, P.tabla); pset(x + s - 1, b - 21, P.tabla); pset(x + s + 1, b - 21, P.tabla); }
      rect(x - 6, b - 19, x + 6, b - 18, P.tablaL); rect(x - 6, b - 18, x + 6, b - 18, P.tablaS); rect(x + 7, b - 19, x + 9, b - 19, P.tablaS); rect(x + 9, b - 19, x + 9, b - 16, P.tablaS);
      linea(x, b - 18, x, b - 12, P.pajaS); rect(x - 2, b - 12, x + 2, b - 9, P.tablaS); rect(x - 2, b - 12, x + 2, b - 12, P.hierro); }
    // la fragua a la izquierda: tejadillo, horno de barro, yunque sobre un tocón, leña
    { const x0 = 4, b = 146; for (const px of [x0, x0 + 34]) { rect(px, b - 26, px + 1, b, P.tabla); pset(px + 1, b - 26, P.tablaL); }
      c_tejado(R, x0 - 2, x0 + 36, b - 26, b - 32);
      for (let y = b - 16; y <= b; y++) for (let x = x0 + 4; x <= x0 + 16; x++) pset(x, y, h(x, y, 576) < 0.2 ? P.barroS : x > x0 + 13 ? P.barroS : P.barro);
      rect(x0 + 7, b - 20, x0 + 12, b - 16, P.barroS); rect(x0 + 8, b - 9, x0 + 12, b - 5, P.hollin);
      rect(x0 + 22, b - 6, x0 + 27, b, P.tronco); rect(x0 + 22, b - 6, x0 + 27, b - 6, P.troncoL); rect(x0 + 20, b - 9, x0 + 29, b - 7, P.hierro); rect(x0 + 28, b - 8, x0 + 31, b - 8, P.hierro); rect(x0 + 20, b - 9, x0 + 29, b - 9, hex('#7a7a88'));
      for (let j = 0; j < 3; j++) rect(x0 + 2, b - 2 - j * 2, x0 + 14 - j * 2, b - 1 - j * 2, j % 2 ? P.tablaS : P.tabla); }
    // la cuerda de tender (la ropa la mueve el viento: se pinta encima)
    for (const px of [48, 98]) { rect(px, 128, px, 150, P.tablaS); pset(px + 1, 128, P.tabla); }
  } else {
    c_camino(R, 101, 179, 162, 172, 140, 190, 1);
    // los postes de las casas desmontadas fuera del cerco y los montones de tablas
    c_ruina(R, 286, 312, 126, 16, 1); c_ruina(R, 18, 46, 132, 14, 2);
    // el pozo, solo el brocal, con hierba
    { const x = 40, b = 150; for (let j = 0; j < 6; j++) for (let i = -6; i <= 6; i++) pset(x + i, b - j, (i + j * 3 + 20) % 5 === 0 ? P.piedraS : P.piedra); rect(x - 4, b - 6, x + 4, b - 6, hex('#1e2a2a')); c_matas(R, 0, [[x - 6, b, 6], [x + 5, b, 5]], (c) => c); }
    // la empalizada en círculo: el arco de atrás (cara de dentro), lo de dentro y el arco de delante con la entrada
    const cx = 166, cy = 118, rx = 112, ry = 30, w = 5, atras = [], delante = [];
    for (let x = cx - rx; x <= cx + rx - w; x += w) { const u = (x + w / 2 - cx) / rx, e = Math.sqrt(Math.max(0, 1 - u * u)), k = (x / w) | 0;
      atras.push([x, Math.round(cy - ry * e), 24 + Math.round(h(k, 1, 580) * 4), k]);
      if (x + w > 150 && x < 182) continue;
      delante.push([x, Math.round(cy + ry * e), 30 + Math.round(h(k, 2, 580) * 5) + Math.round(e * 4), k]); }
    c_estacas(R, atras, w, true);
    // dentro: la arena y la hierba crecida, postes de una casa, tablas, un cofre abierto
    for (let y = cy - ry + 1; y <= cy + ry; y++) { const e = Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2)), a = Math.round(cx - rx * e), b = Math.round(cx + rx * e);
      for (let x = a; x <= b; x++) pset(x, y, c_manchas(x, y, 5) + (h(x, y, 585) - 0.5) * 0.2 < 0.5 ? (h(x, y, 582) < 0.2 ? P.hierbaL : P.hierba) : h(x, y, 583) < 0.15 ? P.arenaS : P.arena); }
    c_ruina(R, 120, 150, 112, 20, 3); c_ruina(R, 196, 222, 108, 16, 4);
    c_cofre(R, 160, 128, 0.8, 1); c_cofre(R, 92, 116, 0.7, 2, -1);
    c_estacas(R, delante, w, false);
    // los dos postes de la entrada (el de la derecha, pelado: allí está la talla, que de lejos no se lee)
    for (const [px, pel] of [[148, false], [180, true]]) { const b = cy + ry - 1; c_estacas(R, [[px, b, 42, 9]], 7, false);
      if (pel) for (let y = b - 30; y <= b - 8; y++) for (let x = px + 1; x <= px + 5; x++) pset(x, y, (x > px + 1 && x < px + 5 && h(x, y, 586) < 0.32) ? P.surcoS : h(x, y >> 2, 584) < 0.2 ? P.vivoS : P.vivo); }
    // dos cofres revueltos fuera, en la hierba, con papeles y libros
    c_cofre(R, 226, 156, 1, 3); c_cofre(R, 262, 148, 0.9, 4, -1);
  }
}

// C1: el general del fuerte, con su vida animada (humo, ropa, colonos, animales; o la hoguera de 1590)
function c_fuerte(R, t, o, ep, luz, g) {
  const P = c_P, hor = 72, noche = luz === 'noche';
  c_cielo(R, t, { hor, modo: luz, sol: c_sol(luz, hor), luna: [236, 30, 6], cumulos: 5 });
  // la hoguera lejana entre los árboles del norte (1590, de noche): resplandor y columna de humo, detrás del bosque
  const fuego = noche && ep === 1590 && (o.humo ?? 0) > 0 ? o.humo : 0;
  c_agua(R, t, 0, 319, hor + 1, 90, c_aguas(g), 2.5);
  if (fuego) { c_resplandor(R, 44, 80, 30, hex('#e87a3a'), 0.55 * fuego);
    for (let i = 0; i < 9; i++) { const u = (t * 0.12 + i / 9) % 1, yy = Math.round(78 - u * 52), xx = Math.round(44 + Math.sin(u * 4 + i) * 3 + u * 14); if (yy < 26) continue; R.disco(xx, yy, 2 + u * 3, c_mezcla(hex('#5a4a5a'), hex('#c8784a'), (1 - u) * 0.8 * fuego)); } }
  c_capa(R, 'fuerte' + ep, luz, () => c_fuerteFijo(R, ep));
  if (fuego) for (let i = 0; i < 6; i++) { const x = 30 + i * 6 + Math.round(Math.sin(t * 7 + i) * 1), y = 84 + (i % 3); if (Math.sin(t * 11 + i * 2) > -0.3) R.pset(x, y, i % 2 ? P.fuego : P.fuegoL); }
  if (luz === 'dia') c_sombrasNubes(R, t, 104, 176);
  if (ep === 1587) {
    // el humo de las chimeneas y de la fragua, y su brasa
    c_humo(R, 241, 99, t, g, 0, 30); c_humo(R, 87, 89, t, g, 2, 24); c_humo(R, 13, 124, t, g, 1, 22);
    { const b = 146; R.rect(12, b - 9, 16, b - 5, Math.sin(t * 9) > 0 ? P.brasa : P.fuego); R.pset(13, b - 7, P.fuegoL);
      if (Math.floor(t * 1.6) % 2 === 0) for (let i = 0; i < 3; i++) R.pset(30 + i * 2 - Math.round(((t * 1.6) % 1) * 4), b - 11 - i, P.fuegoL); }
    // la ropa tendida que ondea al viento
    for (let x = 48; x <= 98; x++) R.pset(x, 128 + Math.round(Math.sin((x - 48) / 50 * Math.PI) * 3), g(P.pajaS));
    [[54, 8, P.blancoT], [65, 7, P.azulT], [76, 10, P.blancoT], [89, 6, P.rojoT]].forEach(([x, w, c], k) => { for (let i = 0; i < w; i++) { const yl = 128 + Math.round(Math.sin((x + i - 48) / 50 * Math.PI) * 3), L = 9 - (k % 2) * 2, ond = Math.round(Math.sin(t * 4 + i * 0.6 + k) * 1.2);
      for (let j = 1; j <= L; j++) R.pset(x + i + (j > L - 3 ? ond : 0), yl + j, g(j === L || i === w - 1 ? c_mezcla(c, C.k, 0.2) : c)); } });
    // los colonos que trabajan de fondo: el herrero, uno con cubos, una que tiende, uno en el tejado, otro con la azada
    c_gente(R, 31, 145, t, 'martillo', P.tablaS, g, -1, 0, P.hollin);
    { const u = (t * 0.05) % 1, x = u < 0.5 ? 150 + u * 2 * 60 : 210 - (u - 0.5) * 2 * 60; c_gente(R, x, 134, t, 'cubos', P.azulT, g, u < 0.5 ? 1 : -1, 1); }
    c_gente(R, 104, 146, t, 'tender', P.rojoT, g, -1, 2, P.blancoT);
    c_gente(R, 66, 110, t, 'martillo', P.verdeT, g, 1, 3);
    c_gente(R, 284, 132, t, 'azada', P.ocreT, g, -1, 4, P.pajaS);
    // gallinas en el claro y la cabra junto al pozo
    for (let k = 0; k < 4; k++) c_gallina(R, 112 + k * 9, 150 + (k % 2) * 3, t, k, g);
    c_cabra(R, 158, 146, t, g, 1);
  } else {
    // cuervos en las puntas de las estacas, un ciervo que pasta, la hierba crecida que se mece
    const pts = [[90, 101], [214, 99], [262, 104]];
    pts.forEach(([x, y], k) => { const salta = Math.sin(t * 1.3 + k * 2) > 0.85 ? 1 : 0; R.rect(x - 1, y - 3 - salta, x + 1, y - 1 - salta, g(P.cuervo)); R.pset(x + (k % 2 ? 2 : -2), y - 3 - salta, g(P.cuervo)); R.pset(x + (k % 2 ? 3 : -3), y - 3 - salta, g(P.hierro)); });
    { const x = 284, b = 168, c = g(P.ciervo), cS = g(P.ciervoS), come = Math.sin(t * 0.7) > -0.2; R.rect(x - 6, b - 9, x + 5, b - 5, c); R.rect(x - 6, b - 5, x + 5, b - 5, cS);
      for (const lx of [-5, -3, 3, 4]) R.rect(x + lx, b - 4, x + lx, b, cS); const hx = x - 8, hy = come ? b - 3 : b - 13; R.linea(x - 5, b - 8, hx + 1, hy + 1, c); R.rect(hx - 1, hy - 1, hx + 1, hy + 1, c); R.pset(hx - 2, hy + 1, g(P.hollin)); R.pset(hx, hy - 2, cS); R.pset(hx + 1, hy - 3, cS);
      R.pset(x + 6, b - 9 + (Math.sin(t * 6) > 0.6 ? 1 : 0), g(C.blanco)); }
    c_matas(R, t, [[8, 172, 9], [26, 178, 11], [62, 166, 7], [120, 170, 8], [204, 174, 9], [238, 170, 7], [306, 176, 10], [286, 164, 7]], g, true);
  }
  c_aves(R, t, 3, 46, ep === 1590 ? 12 : 18, 2, g(ep === 1590 ? P.cuervo : C.blanco), g(ep === 1590 ? P.cuervo : P.piedraS));
  if (luz === 'amanecer') c_niebla(R, t, 82, 138, 0.55);
  return ep === 1587 ? { suelo: 160, libre: [20, 260], casa: [182, 112, 248, 150], puerta: [198, 150], pozo: [140, 140], fragua: [26, 146], cuerda: [48, 98, 128] }
    : { suelo: 160, libre: [20, 260], entrada: [164, 160], poste: [183, 120], cofres: [[233, 156], [268, 148]], cerco: [54, 278, 88, 148] };
}

// por delante en el general del fuerte: los troncos del borde del bosque que enmarcan (fuera de la zona libre) y
// matas en primer plano
function c_fuerteDelante(R, t, o, ep, luz, g) {
  const P = c_P, { rect, pset } = R;
  for (const [x0, x1] of [[0, 9], [306, 319]]) { for (let x = x0; x <= x1; x++) for (let y = 90; y <= 179; y++) { const u = (x - x0) / (x1 - x0), v = h(x, (y / 3) | 0, 590); pset(x, y, g(u < 0.25 ? P.troncoS : u > 0.7 ? (v < 0.3 ? P.tronco : P.troncoL) : v < 0.18 ? P.troncoS : P.tronco)); } }
  for (let k = 0; k < 14; k++) { const x = k < 7 ? 2 + k * 3 : 300 + (k - 7) * 3, y = 94 + Math.round(h(k, 1, 591) * 24); for (let j = 0; j < 5 + (k % 4); j++) pset(x + (j > 3 ? Math.round(Math.sin(t + k)) : 0), y + j, g(j % 3 === 2 ? P.musgoS : P.musgo)); }
  c_matas(R, t, [[4, 180, 14], [16, 180, 10], [300, 180, 12], [314, 180, 15]], g, ep === 1590, 1);
  return { delante: [[0, 18], [300, 319]] };
}

const c_VENTANA = [28, 56, 54, 84];

// la capa fija de dentro de la casa (el hueco de la ventana se queda vacío)
function c_casaFijo(R, ep) {
  const P = c_P, { rect, pset, linea, disco } = R, B = R.buf, osc = (c, a = 0.3) => c_mezcla(c, hex('#1c1410'), a);
  const techo = [hex('#3e3022'), hex('#4e3e2a'), hex('#2a2016'), hex('#5e4a32')];
  // el techo de juncos por dentro, en penumbra, con los pares (vigas inclinadas) y las correas
  for (let y = 0; y < 27; y++) for (let x = 0; x < 320; x++) { const v = h(x, (y / 2) | 0, 600); let c = v < 0.25 ? techo[0] : v > 0.9 ? techo[3] : techo[1]; if ((y % 6) === 5 && h(x >> 2, y, 601) < 0.7) c = techo[2]; if (x > 270 && y < 46 && c === techo[3]) c = techo[1]; B[y * 320 + x] = c; }
  for (const px of [36, 110, 184, 252]) for (let y = 0; y < 27; y++) { const x = px + Math.round(y * 0.6); rect(x, y, x + 3, y, techo[2]); pset(x + 1, y, hex('#5a4630')); }
  for (let y = 26; y <= 31; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 26 ? P.tablaD : y === 27 ? P.tabla : y === 31 ? P.tablaD : h(x, y, 602) < 0.15 ? P.tablaS : y === 28 ? P.tablaL : P.tabla);
  // la pared del fondo: entramado de postes y paneles de barro (alguno desconchado con el zarzo a la vista)
  for (let y = 32; y < 150; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 603), m = c_manchas(x, y, 4) + (h(x, y, 604) - 0.5) * 0.25; let c = v < 0.07 ? P.barroS : v > 0.95 ? P.barroL : m < 0.3 ? osc(P.barro, 0.12) : m > 0.8 ? c_mezcla(P.barro, P.barroL, 0.4) : P.barro; if (y > 140) c = osc(c, (y - 140) / 30); B[y * 320 + x] = osc(c, 0.18); }
  for (const [dx, dy] of [[88, 100], [196, 52]]) for (let j = 0; j < 9; j++) for (let i = 0; i < 12 - (j % 2); i++) pset(dx + i + (j % 2), dy + j, (i + j) % 2 ? P.zarzo : P.tablaS);
  for (const px of [0, 62, 124, 186]) { rect(px, 32, px + 5, 150, P.tabla); rect(px, 32, px, 150, P.tablaD); rect(px + 4, 32, px + 5, 150, P.tablaS); for (let y = 36; y < 150; y += 7) if (h(px, y, 605) < 0.5) rect(px + 2, y, px + 2, y + 3, P.tablaL); }
  rect(0, 92, 226, 95, P.tabla); rect(0, 95, 226, 95, P.tablaD); rect(0, 92, 226, 92, P.tablaL);
  rect(0, 146, 319, 150, P.tablaS); rect(0, 146, 319, 146, P.tabla);
  linea(68, 95, 120, 145, P.tablaS); linea(69, 95, 121, 145, P.tabla);
  // la ventanita con el postigo abierto (el bosque se pinta detrás, en su hueco)
  { const [x0, y0, x1, y1] = c_VENTANA; rect(x0 - 3, y0 - 3, x1 + 3, y1 + 4, P.tablaD); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, P.tabla); rect(x0 - 2, y1 + 2, x1 + 4, y1 + 4, P.tablaL); rect(x0 - 2, y1 + 4, x1 + 4, y1 + 4, P.tablaS);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = c_VACIO;
    rect(Math.round((x0 + x1) / 2), y0, Math.round((x0 + x1) / 2), y1, P.tablaD); rect(x0, Math.round((y0 + y1) / 2), x1, Math.round((y0 + y1) / 2), P.tablaD);
    for (let y = y0 - 1; y <= y1 + 1; y++) for (let x = x0 - 14; x <= x0 - 4; x++) pset(x, y, (x - x0) % 4 === 0 ? P.tablaS : h(x, y >> 2, 606) < 0.15 ? P.tablaL : P.tabla);
    rect(x0 - 5, y0 + 4, x0 - 3, y0 + 5, P.hierro); rect(x0 - 5, y1 - 5, x0 - 3, y1 - 4, P.hierro); }
  // los manojos de hierbas que cuelgan de la viga y un farol
  for (let k = 0; k < 5; k++) { const x = 74 + k * 9, L = 8 + (k % 3) * 2; linea(x, 31, x, 34, P.pajaS); for (let j = 0; j < L; j++) for (let i = -1 - (j >> 2); i <= 1 + (j >> 2); i++) if (h(x + i, j, 607 + k) < 0.6) pset(x + i, 34 + j, [P.verdeT, P.secaS, hex('#8a6a8a')][k % 3]); }
  { const x = 160; linea(x, 31, x, 38, P.hierro); rect(x - 3, 39, x + 3, 48, P.hierro); rect(x - 2, 40, x + 2, 47, hex('#5a4a3a')); rect(x - 4, 48, x + 4, 49, P.hierro); }
  // las perchas con la capa y el sombrero, la sartén y la sierra colgadas
  for (const px of [76, 92]) { rect(px, 60, px + 2, 61, P.tablaD); }
  for (let y = 62; y <= 88; y++) { const w = Math.round(3 + (y - 62) * 0.22); for (let x = 77 - w; x <= 77 + w; x++) pset(x, y, x > 77 + w - 2 ? hex('#3a2a4a') : (x + y) % 7 === 0 ? hex('#3a2a4a') : hex('#5a4470')); }
  rect(88, 61, 96, 62, P.hollin); rect(90, 58, 94, 61, P.hollin); pset(91, 59, hex('#4a4a54'));
  linea(206, 40, 206, 46, P.hierro); disco(206, 52, 6, P.hollin); disco(205, 51, 4, hex('#3a3a42')); rect(205, 58, 207, 70, P.tablaS);
  rect(212, 112, 226, 115, hex('#8a8a96')); for (let x = 212; x <= 226; x += 2) pset(x, 116, hex('#6a6a76')); rect(226, 111, 230, 116, P.tabla);
  // el estante con tarros, un plato de peltre, cuencos, libros (lomos sin letras) y una cesta
  { const y = 78; rect(128, y, 182, y + 2, P.tabla); rect(128, y, 182, y, P.tablaL); rect(128, y + 2, 182, y + 2, P.tablaD); for (const bx of [132, 176]) linea(bx, y + 3, bx + 3, y + 9, P.tablaS);
    disco(138, y - 7, 6, P.piedraS); disco(138, y - 7, 5, P.piedraL); disco(137, y - 8, 2, hex('#e8e4dc'));
    for (const [x, w, a, c] of [[147, 4, 8, P.barroS], [153, 5, 10, P.ocreT], [160, 4, 7, P.verdeT]]) { rect(x, y - a, x + w, y - 1, c); rect(x, y - a, x + w, y - a, c_mezcla(c, C.blanco, 0.3)); rect(x + 1, y - a - 1, x + w - 1, y - a - 1, P.tablaD); pset(x + w, y - 3, c_mezcla(c, C.k, 0.3)); }
    for (let i = 0; i < 4; i++) { rect(166 + i * 3, y - 9 + (i % 2), 168 + i * 3, y - 1, [P.rojoT, P.azulT, P.tablaS, P.verdeT][i]); pset(167 + i * 3, y - 6, P.ocreT); }
    for (let x = 179; x <= 186; x++) for (let j = 0; j < 6; j++) pset(x, y - 1 - j, (x + j) % 2 ? P.pajaS : P.paja); }
  // un barril y un arcón junto a la pared, y la escoba apoyada
  { const x0 = 8, b = 156; for (let y = b - 22; y <= b; y++) { const e = Math.sin((y - b + 22) / 22 * Math.PI) * 2; for (let x = x0 - Math.round(e); x <= x0 + 16 + Math.round(e); x++) pset(x, y, (y - b + 22) % 7 === 3 ? P.hierro : x > x0 + 11 ? P.tablaS : (x - x0) % 4 === 0 ? P.tablaS : P.tabla); } rect(x0, b - 22, x0 + 16, b - 22, P.tablaL);
    rect(30, 140, 58, 156, P.tablaD); rect(31, 141, 57, 155, P.tabla); rect(31, 141, 57, 142, P.tablaL); for (const fx of [36, 52]) rect(fx, 140, fx + 1, 156, P.hierro); rect(43, 146, 45, 148, P.oxido);
    linea(190, 112, 194, 150, P.tablaS); for (let j = 0; j < 8; j++) linea(192 + (j >> 1), 150, 190 + j, 157, P.pajaS); }
  // el hogar: el suelo de piedra, el fondo de hollín, la campana de barro con su viga, la repisa con cacharros y la
  // chimenea que sube; la grúa de hierro con el caldero; la leña apilada
  for (let y = 31; y <= 78; y++) for (let x = 248; x <= 276; x++) pset(x, y, x === 248 ? P.barroL : x > 272 ? osc(P.barroS, 0.2) : h(x, y, 610) < 0.12 ? P.barroS : osc(P.barro, 0.05));
  for (let y = 78; y <= 106; y++) { const a = Math.round(226 + (106 - y) * 0.75), b = Math.round(300 - (106 - y) * 0.75); for (let x = a; x <= b; x++) pset(x, y, x === a ? P.barroL : x > b - 3 ? P.barroS : h(x, y, 611) < 0.1 ? P.barroS : P.barro); }
  rect(222, 104, 304, 109, P.tablaD); rect(223, 104, 303, 106, P.tabla); rect(223, 104, 303, 104, P.tablaL);
  for (const [x, c] of [[232, P.piedraL], [244, P.ocreT], [290, P.barroS]]) { rect(x, 98, x + 5, 103, c); rect(x + 1, 97, x + 4, 97, c_mezcla(c, C.k, 0.3)); }
  for (let y = 110; y <= 150; y++) for (let x = 230; x <= 296; x++) { const lado = x < 238 || x > 288; pset(x, y, lado ? ((x + ((y >> 2) % 2) * 4) % 8 === 0 || y % 4 === 0 ? P.piedraS : P.piedra) : h(x, y, 612) < 0.3 ? hex('#1a1412') : P.hollin); }
  for (let y = 150; y <= 158; y++) for (let x = 226; x <= 300; x++) pset(x, y, y === 150 ? P.piedraL : (x + ((y >> 2) % 2) * 5) % 10 === 0 || y === 154 ? P.piedraS : P.piedra);
  rect(286, 112, 287, 150, P.hierro); rect(260, 114, 287, 115, P.hierro); linea(262, 116, 262, 126, P.hierro);
  for (let y = 127; y <= 139; y++) { const w = Math.round(9 * Math.sin((y - 125) / 15 * Math.PI)); rect(262 - w, y, 262 + w, y, y < 129 ? hex('#3a3a42') : P.hollin); if (w > 2) pset(262 + w - 1, y, hex('#4a4a54')); }
  for (let j = 0; j < 5; j++) { const y = 156 - j * 5; rect(304, y - 4, 319, y, P.tronco); for (let i = 0; i < 3; i++) { disco(306 + i * 5 + (j % 2) * 2, y - 2, 2, P.troncoL); pset(306 + i * 5 + (j % 2) * 2, y - 2, P.tablaS); } }
  // el suelo de tierra pisada con juncos esparcidos
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 226 && x <= 300 && y <= 158) continue; const v = h(x, y, 613), m = c_manchas(x, y * 2, 6) + (h(x, y, 614) - 0.5) * 0.3; let c = m < 0.32 ? P.tierraS : m > 0.82 ? P.tierraL : P.tierra; if (v < 0.06) c = P.tierraL; else if (v > 0.96) c = P.tierraS; if (y < 156) c = osc(c, 0.25); B[y * 320 + x] = c; }
  for (let k = 0; k < 80; k++) { const x = Math.round(h(k, 1, 615) * 319), y = 154 + Math.round(h(k, 2, 615) * 24), d = h(k, 3, 615) < 0.5 ? 1 : -1; if (x > 222 && x < 302 && y < 160) continue; linea(x, y, x + 3 * d, y + (k % 2), k % 3 ? P.pajaS : P.paja); }
}

// la cuna de madera con capota, sobre balancines, con la manta y la colcha roja; se balancea rodando sobre sus
// balancines (ang en radianes; cx, base: centro y suelo en reposo); fuego: el lado del hogar, dorado
function c_cuna(R, cx, base, ang, g, fuego) {
  const P = { ...c_P, tabla: hex('#7a4426'), tablaL: hex('#9c5e34'), tablaS: hex('#5a3018'), tablaD: hex('#2e1a10'), vivo: hex('#c88a50') }, ca = Math.cos(ang), sa = Math.sin(ang), Rr = 55, px = cx - Rr * ang, py = base - Rr;
  const pix = (u, v) => {   // u: −17…17 (de la capota a los pies), v: 0 (suelo) … −28 (arriba)
    const rt = -2 - (u * u) / 110;
    if (Math.abs(u) <= 17 && v >= rt && v <= rt + 2) return v > rt + 1 ? P.tablaD : P.tabla;
    if ((Math.abs(u - 10) <= 1 || Math.abs(u + 10) <= 1) && v < rt && v >= -6) return u > 0 ? P.tablaS : P.tablaD;
    if (u >= -14 && u <= -3 && v < -16) { const e = ((u + 14) / 11) ** 2 + ((v + 16) / 12) ** 2; if (e > 1) return null; if (e > 0.72) return P.tablaD; if (u > -6 && v > -20) return hex('#2a1e14'); return (v % 3 === 0) ? P.tabla : P.tablaL; }
    if (u > -3 && u <= 14 && v < -16 && v >= -20) { if (v === -20 && (u < -1 || u > 12)) return null; if (u > 2 && u < 8 && v <= -19) return P.blancoT; return v === -17 ? P.rojoT : v >= -18 ? (u % 4 === 0 ? P.ocreT : P.rojoT) : P.blancoT; }
    if (Math.abs(u) <= 14 && v < -5 && v >= -16) {
      if (Math.abs(u) === 14 || v === -6) return P.tablaD; if (v === -16) return P.vivo; if (v === -15) return P.tablaS;
      const du = Math.abs(u - 2), dv = Math.abs(v + 11); if (du + dv === 3) return P.tablaS; if (du + dv < 2) return P.vivo;
      return (v + 16) % 4 === 0 ? P.tabla : h(u, v, 620) < 0.12 ? P.tabla : P.tablaL; }
    return null; };
  for (let y = base - 32; y <= base + 1; y++) for (let x = Math.floor(cx - 26 - Math.abs(Rr * ang)); x <= cx + 26 + Math.abs(Rr * ang); x++) {
    const dx = x - px, dy = y - py, u = Math.round(ca * dx + sa * dy), v = Math.round(-sa * dx + ca * dy - Rr); const c = pix(u, v);
    if (c != null) R.pset(x, y, fuego && u > 7 && c !== P.tablaD ? c_mezcla(g(c), P.fuego, 0.14) : g(c)); }
  // su sombra en el suelo
  for (let x = cx - 16; x <= cx + 16; x++) if ((x & 1) === 0) R.pset(x, base + 1, c_mezcla(R.pget(x, base + 1), C.k, 0.3));
  return [Math.round(px), base];
}

// C2: dentro de la casa de los Dare: la ventana, el haz de luz, el fuego, el vapor y la cuna que se mece
function c_casaDentro(R, t, o, ep, luz, g) {
  const P = c_P, [x0, y0, x1, y1] = c_VENTANA, noche = luz === 'noche';
  // lo que se ve por la ventana: el cielo, pinos que se mecen y un pájaro (recortado al hueco)
  R.recorte([x0, y0, x1, y1]);
  const cielo = noche ? [hex('#141a3e'), hex('#2c3466')] : luz === 'tarde' ? [hex('#a0507a'), hex('#f8c070')] : luz === 'amanecer' ? [hex('#ba7896'), hex('#fcdcc0')] : [hex('#74bef2'), hex('#d0e8ee')];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, c_umbral(x, y) < (y - y0) / (y1 - y0) ? cielo[1] : cielo[0]);
  if (!noche) { const nx = x0 + ((t * 2) % 50) - 10; R.disco(nx, y0 + 7, 3, g(C.blanco)); R.disco(nx + 4, y0 + 8, 2, g(C.blanco)); }
  else for (let k = 0; k < 6; k++) R.pset(x0 + 3 + k * 4, y0 + 2 + (k * 5) % 10, C.blanco);
  for (const [x, a, k] of [[x0 + 4, 26, 0], [x0 + 15, 32, 1], [x0 + 24, 22, 2]]) c_pino(R, x, y1 + 2, a, 0.7, k + 7, Math.sin(t * 0.9 + k) * 1.2, { ...P, copa: g(P.copa), copaS: g(P.copaS), copaL: g(P.copaL), copaLL: g(P.copaLL), tronco: g(P.tronco), troncoS: g(P.troncoS), troncoL: g(P.troncoL) });
  if (!noche) { const u = (t * 0.2) % 1, bx = Math.round(x0 - 4 + u * 40), by = y0 + 10 + Math.round(Math.sin(t * 3) * 2); R.pset(bx, by, g(P.cuervo)); R.pset(bx - 1, by - (Math.floor(t * 6) % 2), g(P.cuervo)); R.pset(bx + 1, by - (Math.floor(t * 6) % 2), g(P.cuervo)); }
  R.recorte(null);
  c_capa(R, 'casa', luz, () => c_casaFijo(R, ep));
  // la luz de la ventana: un haz tramado hasta el suelo, con motas de polvo que flotan
  if (!noche) { for (let y = y1 + 4; y <= 172; y++) { const d = (y - y1) * 0.55, a = Math.round(x0 + d), b = Math.round(x1 + d + (y - y1) * 0.2); for (let x = a; x <= b; x++) if (((x + y) & 1) === 0) R.pset(x, y, c_mezcla(R.pget(x, y), luz === 'dia' ? hex('#fff4d0') : hex('#ffc890'), 0.22)); }
    for (let k = 0; k < 12; k++) { const yy = y1 + 6 + ((h(k, 1, 621) * 90 + t * (2 + k % 3)) % 90), xx = x0 + (yy - y1) * 0.6 + h(k, 2, 621) * 28 + Math.sin(t * 0.6 + k) * 3; if (Math.sin(t * 1.4 + k * 2) > -0.2) R.pset(Math.round(xx), Math.round(yy), hex('#fff6d8')); } }
  // el fuego del hogar, su resplandor (que late) y el vapor del caldero
  const lat = 0.85 + 0.15 * Math.sin(t * 7) * Math.sin(t * 3.1);
  c_resplandor(R, 264, 140, noche ? 90 : 62, P.fuego, (noche ? 0.42 : 0.28) * lat);
  c_llamas(R, 250, 274, 149, 10, t); R.rect(248, 148, 276, 150, P.brasa); for (let x = 249; x < 276; x += 3) R.pset(x, 149, P.fuegoL);
  R.rect(246, 146, 277, 147, g(P.tronco)); R.rect(250, 145, 270, 145, g(P.troncoL));
  for (let i = 0; i < 5; i++) { const u = (t * 0.5 + i / 5) % 1, xx = Math.round(262 + Math.sin(u * 6 + i) * 3), yy = Math.round(126 - u * 16); R.pset(xx, yy, g(u < 0.5 ? C.blanco : P.humo)); if (u < 0.6) R.pset(xx + 1, yy, g(P.humo)); }
  // la cuna junto al fuego; o.mece 0–1: se balancea
  const ang = (o.mece ?? 0) * 0.16 * Math.sin(t * 3.2);
  c_cuna(R, 204, 160, ang, g, true);
  return { suelo: 160, libre: [156, 186], detras: 152, gato: [227, 160, -1], cuna: [204, 144], cunaBase: [204, 160], cunaPies: [219, 152], mesa: [62, 148, 154, 162], escribe: [102, 152], fuego: [262, 148], ventana: [...c_VENTANA] };
}

// la mesa basta de delante (casa): tablero con su canto, patas y travesaño; encima, el diario abierto (renglones sin
// letras), el tintero con la pluma, la vela que tiembla, un cuenco de peltre y una hogaza
function c_casaDelante(R, t, o, ep, luz, g) {
  const P = c_P, { rect, pset, linea, disco } = R, x0 = 62, x1 = 154, y = 148;
  for (const lx of [x0 + 4, x1 - 7]) { rect(lx, y + 4, lx + 3, 163, g(P.tablaD)); rect(lx + 1, y + 4, lx + 2, 163, g(P.tablaS)); }
  rect(x0 + 6, 157, x1 - 5, 158, g(P.tablaS));
  for (let x = x0; x <= x1; x++) { const v = h(x, 1, 630); pset(x, y - 1, g(P.tablaL)); pset(x, y, g(v < 0.2 ? P.tablaS : P.tablaL)); pset(x, y + 1, g(P.tabla)); pset(x, y + 2, g(v > 0.85 ? P.tablaL : P.tabla)); pset(x, y + 3, g(P.tablaD)); }
  rect(x0 + 2, y + 4, x1 - 2, y + 5, g(P.tablaS));
  // el diario abierto
  { const bx = 90; rect(bx - 1, y - 4, bx + 25, y - 1, g(P.tablaD)); rect(bx, y - 4, bx + 11, y - 2, g(P.blancoT)); rect(bx + 13, y - 4, bx + 24, y - 2, g(P.blancoT)); rect(bx + 12, y - 4, bx + 12, y - 1, g(P.lonaS));
    for (let x = bx + 1; x < bx + 11; x += 1) if (x % 2) pset(x, y - 3, g(P.piedraS)); for (let x = bx + 14; x < bx + 22; x += 1) if (x % 2) pset(x, y - 3, g(P.piedraS)); }
  // el tintero con la pluma
  { const ix = 120; rect(ix, y - 4, ix + 3, y - 1, g(P.hollin)); pset(ix + 1, y - 4, g(P.piedraL)); linea(ix + 2, y - 4, ix + 7, y - 15, g(P.blancoT)); linea(ix + 3, y - 5, ix + 8, y - 14, g(P.lonaS)); pset(ix + 8, y - 16, g(P.blancoT)); }
  // la vela en su palmatoria
  { const vx = 142; rect(vx - 3, y - 2, vx + 3, y - 1, g(P.hierro)); rect(vx - 1, y - 10, vx + 1, y - 3, g(P.blancoT)); pset(vx + 1, y - 9, g(P.lonaS)); const f = Math.sin(t * 13) > 0 ? 1 : 0; pset(vx, y - 11, P.brasa); pset(vx + (f ? 1 : 0) - 0, y - 12, P.fuego); pset(vx, y - 13, P.fuegoL); if (f) pset(vx, y - 14, P.fuegoL);
    c_resplandor(R, vx, y - 12, 9, P.fuegoL, 0.25); }
  disco(72, y - 2, 3, g(P.piedraS)); rect(69, y - 3, 75, y - 2, g(P.piedraL)); for (let i = 0; i < 8; i++) { const r = 3 - Math.abs(i - 4) * 0.5; rect(78 + i, Math.round(y - 1 - r), 78 + i, y - 1, g(i < 2 ? P.ocreT : P.tierraL)); }
  return { mesa: [x0, y - 1, x1, 163] };
}

const c_TALLA_POSTE = [226, 36, 246, 156];

// la capa fija de la entrada de la empalizada (de cerca)
function c_posteFijo(R, ep) {
  const P = c_P, { rect, pset, linea } = R;
  c_colinas(R, 70, 22, 74, P.copa, P.copaS, 3.3, { arboles: P.copaS, n: 60, pinos: true });
  for (const [x, a] of [[10, 52], [60, 58], [150, 46], [200, 54], [262, 40], [300, 34]]) c_pino(R, x, 76, a, 0.9, x + 3, 0);
  // dentro del cerco: la cara de dentro de la empalizada de enfrente, la arena con hierba crecida y lo que quedó
  const atras = []; for (let x = 110; x < 236; x += 6) atras.push([x, 108 + Math.round(Math.sin(x * 0.03) * 2), 38 + Math.round(h(x, 1, 640) * 4), x]);
  c_estacas(R, atras, 6, true, ep === 1587);
  for (let y = 105; y <= 156; y++) for (let x = 110; x <= 236; x++) pset(x, y, c_manchas(x, y, 9) + (h(x, y, 641) - 0.5) * 0.2 < (ep === 1590 ? 0.55 : 0.3) ? (h(x, y, 642) < 0.2 ? P.hierbaL : P.hierba) : h(x, y, 643) < 0.12 ? P.arenaS : P.arena);
  if (ep === 1590) { c_ruina(R, 140, 178, 122, 22, 5); c_cofre(R, 184, 138, 1, 6); c_canon(R, 128, 150, 26, 1); c_cofre(R, 150, 152, 0.8, 7, -1); }
  else c_casa(R, 136, 196, 128, 18, 14, { puerta: [150, 156], ventana: [170, 174] });
  // la empalizada de delante: estacas gruesas, la entrada abierta, el poste izquierdo y el gran poste derecho
  const izq = [], der = []; for (let x = -4; x < 112; x += 9) izq.push([x, 156, 116 + Math.round(h(x, 2, 644) * 10), x]);
  for (let x = 250; x < 320; x += 9) der.push([x, 156, x > 268 ? 104 + Math.round(h(x, 3, 644) * 4) : 116 + Math.round(h(x, 3, 644) * 8), x]);
  c_estacas(R, izq, 9, false, ep === 1587); c_estacas(R, der, 9, false, ep === 1587);
  c_estacas(R, [[112, 158, 134, 1]], 14, false, ep === 1587); c_estacas(R, [[222, 158, 140, 2]], 28, false, ep === 1587);
  // el travesaño de la entrada (atado con cuerda) y las ataduras
  for (let x = 0; x < 320; x++) if (x < 112 || x > 249) { pset(x, 70, P.pajaS); pset(x, 71, x % 3 ? P.pajaD : P.pajaS); }
  // la segunda atadura más abajo, el pie de las estacas oscuro de humedad y verdín, y las enredaderas que trepan
  // (en 1590 el cerco abandonado está comido por ellas; en 1587 solo una mata junto a la entrada y una estaca nueva)
  for (let x = 0; x < 320; x++) if (x < 112 || x > 249) { pset(x, 132, P.pajaS); pset(x, 133, x % 3 ? P.pajaD : P.pajaS); if (x % 9 === 4) { pset(x, 131, P.pajaS); pset(x, 134, P.pajaD); } }
  for (let x = 0; x < 320; x++) { if (x >= 112 && x <= 249) continue; for (let y = 148; y <= 156; y++) if (h(x, y, 648) < (y - 146) * 0.07) pset(x, y, h(x, y, 649) < 0.5 ? P.musgoS : P.logD); }
  const enred = ep === 1590 ? [[18, 150, 46], [70, 154, 58], [98, 152, 30], [262, 152, 40], [300, 154, 34]] : [[100, 156, 20]];
  for (const [x0, b, L] of enred) { let x = x0; for (let j = 0; j < L; j++) { x += Math.round(Math.sin(j * 0.35 + x0) * 0.8); const y = b - j; pset(x, y, P.hierbaD); if (j % 3 === 0) { const d = (j % 6 === 0) ? 1 : -1; pset(x + d, y, P.hierbaS); pset(x + d * 2, y, P.hierba); pset(x + d * 2, y - 1, P.hierbaL); pset(x + d, y + 1, P.hierbaS); } } }
  if (ep === 1587) { const x = 49; for (let y = 120; y <= 156; y++) for (let i = 0; i < 7; i++) if (c_pintado(R, x + i, y)) pset(x + i, y, i < 2 ? P.vivoS : i > 4 ? P.vivoS : P.vivo); }
  // la madera pelada del poste derecho (1590), donde va la talla, y su hueco liso encima
  if (ep === 1590) { const [a, b, c, d] = c_TALLA_POSTE; c_pelado(R, a, b, c, d, (x) => x, 1); }
  else for (let y = 40; y < 150; y += 3) for (let x = 224; x < 248; x++) if (h(x, y, 645) < 0.3) pset(x, y + (x % 2), P.logS);
  // el suelo de delante: arena pisada, la hierba al pie de las estacas, conchas, astillas y el camino que entra
  c_arenal(R, 0, 319, 157, 179, [P.arena, P.arenaS, P.arenaL, P.arenaD]);
  for (let x = 0; x < 320; x++) { const L = (x > 124 && x < 222) ? 0 : 1 + Math.round(h(x, 5, 646) * 6); for (let j = 0; j < L; j++) pset(x, 158 - j + 2, j > L - 2 ? P.hierbaL : (x + j) % 3 ? P.hierba : P.hierbaS); }
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 647) * 319), y = 164 + Math.round(h(k, 2, 647) * 14); if (k % 3 === 0) { pset(x, y, P.blancoT); pset(x + 1, y, P.arenaL); pset(x, y - 1, P.lonaS); } else linea(x, y, x + 3, y + 1, P.tablaS); }
  for (let k = 0; k < 6; k++) { const x = 134 + k * 13, y = 162 + (k % 2) * 6; rect(x, y, x + 2, y + 1, P.arenaS); rect(x + 4, y - 2, x + 6, y - 1, P.arenaS); }
}
// C3: la entrada de la empalizada con la talla de «CROATOAN» (1590) y la vida de dentro
function c_poste(R, t, o, ep, luz, g) {
  const P = c_P, hor = 74;
  c_cielo(R, t, { hor, modo: luz, sol: c_sol(luz, hor, [180, 30, 7]), luna: [180, 26, 6], cumulos: 4 });
  c_capa(R, 'poste' + ep, luz, () => c_posteFijo(R, ep));
  if (luz === 'dia') c_sombrasNubes(R, t, 160, 178, 0.12);
  let talla = null, hueco = null;
  if (ep === 1590) {
    const [a, b, c, d] = c_TALLA_POSTE, u = Math.max(0, Math.min(1, o.talla ?? 1)), luzY = u >= 1 ? 999 : Math.round(b + 6 + u * (d - b - 6));
    // la luz de amanecer que barre la madera de arriba abajo (con o.talla < 1)
    if (u < 1) for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) { const dy = y - luzY; if (dy > 4) R.pset(x, y, c_mezcla(R.pget(x, y), hex('#2a1c18'), 0.45)); else if (dy > -6) R.pset(x, y, c_mezcla(R.pget(x, y), hex('#ffd0a0'), 0.35 * (1 - Math.abs(dy + 1) / 6))); }
    talla = c_tallar(R, 'CROATOAN', a + 4, b + 12, 1.5, 1.1, true, g, luzY, 2); hueco = [Math.round((a + c) / 2), b + 6];
    if (u < 1 && luzY < d) for (let x = a - 2; x <= c + 2; x++) if (Math.sin(x * 0.9 + t * 8) > 0.3) R.pset(x, luzY - 1, hex('#fff0c8'));
  }
  // dentro: hierba que se mece, pájaros que picotean (1590) o gallinas (1587); fuera, hierba al pie de las estacas
  if (ep === 1590) { c_matas(R, t, [[132, 140, 7], [170, 146, 8], [204, 128, 6], [214, 150, 9], [120, 124, 5]], g, true, 2);
    for (let k = 0; k < 3; k++) { const x = 160 + k * 18 + Math.round(Math.sin(t * 0.4 + k) * 5), b = 132 + k * 6, p = Math.sin(t * 3 + k * 2) > 0.5 ? 1 : 0; R.rect(x, b - 2, x + 2, b - 1, g(P.tablaS)); R.pset(x + 3, b - 2 + p, g(P.tablaS)); R.pset(x + 4, b - 2 + p, g(P.ocreT)); R.pset(x - 1, b - 3, g(P.tablaD)); } }
  else { for (let k = 0; k < 3; k++) c_gallina(R, 148 + k * 22, 146 + (k % 2) * 6, t, k, g); c_humo(R, 189, 90, t, g, 3, 22); c_gente(R, 210, 140, t, 'cubos', P.azulT, g, -1, 2); }
  // un pájaro carpintero en una estaca de la izquierda, que pica la madera, para y vuelve a picar
  { const x = 20, y = 98 + Math.round(Math.sin(t * 0.15) * 2), pica = (t % 2.4) < 1.2 && Math.sin(t * 22) > 0;
    R.rect(x, y - 4, x + 2, y + 2, g(P.hollin)); R.pset(x + 1, y - 1, g(C.blanco)); R.pset(x + 1, y + 1, g(C.blanco)); R.rect(x, y - 6, x + 2, y - 5, g(P.sanJorge)); R.pset(x + 1, y - 4, g(P.blancoT));
    R.rect(x - (pica ? 2 : 1), y - 4, x - 1, y - 4, g(P.piedra)); R.pset(x + 3, y + 3, g(P.hollin)); if (pica) R.pset(x - 3, y - 3, g(P.vivoL)); }
  c_matas(R, t, [[6, 162, 9], [40, 160, 7], [86, 161, 10], [258, 160, 8], [300, 162, 11]], g, ep === 1590, 4);
  c_aves(R, t, 4, 48, ep === 1590 ? 14 : 20, 4, g(C.blanco), g(P.piedraS));
  if (luz === 'amanecer') c_niebla(R, t, 112, 172, 0.42);
  return { suelo: 166, libre: [20, 200], talla: talla ?? [c_TALLA_POSTE[0], c_TALLA_POSTE[1] + 11, c_TALLA_POSTE[2], c_TALLA_POSTE[3] - 6], hueco: hueco ?? [236, 42], entrada: [126, 222], poste: [222, 250] };
}
// por delante en el poste: matas en las esquinas de abajo
function c_posteDelante(R, t, o, ep, luz, g) {
  c_matas(R, t, [[2, 180, 14], [14, 180, 9], [312, 180, 13]], g, ep === 1590, 6);
  return {};
}

// el tronco: su centro en cada altura (se inclina a la izquierda, hacia tierra) y su medio ancho
const c_troncoX = (y) => 226 - Math.max(0, 158 - y) * 0.08 - Math.max(0, 96 - y) * 0.7, c_troncoW = (y) => 25 - Math.max(0, 158 - y) * 0.06;

// la corteza arrancada del roble, donde va «CRO»
const c_TALLA_ARBOL = [202, 104, 246, 130];

// la capa fija del roble de la duna: la playa, la duna, el tronco, las ramas y la copa
function c_arbolFijo(R, ep) {
  const P = c_P, { rect, pset, linea, disco } = R;
  // la playa al pie de la duna (el mar se pinta antes) y la duna, con su cresta y sus ondas
  for (let x = 0; x < 320; x++) { const yc = 136 + Math.round(Math.sin(x * 0.018 + 1) * 4 - x * 0.03); for (let y = 126; y < yc; y++) pset(x, y, y < 128 ? P.arenaD : h(x, y, 650) < 0.2 ? P.arenaS : P.arena); }
  c_arenal(R, 0, 319, 128, 179, [P.arena, P.arenaS, P.arenaL, P.arenaD], 2);
  for (let x = 0; x < 320; x++) { const yc = 136 + Math.round(Math.sin(x * 0.018 + 1) * 4 - x * 0.03); for (let y = 126; y < yc; y++) pset(x, y, y === yc - 1 ? P.arenaL : y < 129 ? P.arenaD : h(x, y, 651) < 0.25 ? P.arenaS : c_mezcla(P.arena, P.mar, 0.08)); }
  for (let y = 140; y < 180; y += 4) for (let x = 0; x < 320; x++) if (Math.sin(x * 0.09 + y * 0.6) > 0.7) pset(x, y + Math.round(Math.sin(x * 0.05) * 1.5), P.arenaS);
  // matojos fijos sobre la duna
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 652) * 319), b = 138 + Math.round(h(k, 2, 652) * 36); for (let i = -3; i <= 3; i++) linea(x + i, b, x + i * 2, b - 4 - Math.round(h(k, i, 653) * 5), i % 2 ? P.secaS : P.hierbaS); }
  // las raíces al aire, el tronco retorcido con la corteza a surcos diagonales, las ramas que se van a tierra
  for (const [dx, L] of [[-30, 12], [-22, 7], [24, 10], [30, 6]]) { const x0 = 226 + dx * 0.5; for (let i = 0; i < L; i++) { const x = Math.round(x0 + Math.sign(dx) * i * 1.2), y = 156 + Math.round(i * 0.4); rect(x, y - 1, x + 1, y, i % 3 ? P.tronco : P.troncoS); pset(x, y - 2, P.troncoL); } }
  for (let y = 60; y <= 158; y++) { const cx = c_troncoX(y), w = c_troncoW(y); for (let x = Math.round(cx - w); x <= cx + w; x++) { const u = (x - cx + w) / (2 * w), surco = ((x + y * 0.6 + Math.sin(y * 0.15) * 4) % 7 + 7) % 7;
    let c = u < 0.18 ? P.troncoS : u > 0.72 ? P.troncoL : P.tronco; if (surco < 1.2) c = P.troncoS; else if (surco > 5.6 && u > 0.3) c = P.troncoL; if (h(x, y, 654) < 0.05) c = P.musgoS; if (u < 0.06 || u > 0.97) c = hex('#2e2018'); pset(x, y, c); } }
  const ramas = [[112, 60, 9], [158, 46, 8], [70, 72, 6], [238, 56, 6], [196, 44, 7]];
  for (const [x1, y1, w] of ramas) { const x0 = c_troncoX(80), y0 = 80, n = Math.ceil(Math.abs(x1 - x0) * 1.5 + 10); for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * 7), ww = Math.max(1, Math.round(w * (1 - u * 0.65)));
    for (let j = -ww; j <= ww; j++) pset(x, y + j, j === -ww ? P.troncoL : j >= ww - 1 ? P.troncoS : h(x >> 2, j, 663) < 0.18 ? P.troncoS : P.tronco); pset(x + 1, y, P.tronco); } }
  // la copa baja y aplastada por el viento: racimos de hojas en tres tonos en las puntas de las ramas, con barbas de musgo
  const bolas = [];
  ramas.forEach(([x1, y1], r) => { for (let k = 0; k < 9; k++) { const x = x1 + (h(k, r, 655) - 0.5) * 50, y = y1 + (h(k, r, 656) - 0.6) * 18, rr = 6 + h(k, r, 657) * 6; if (x + rr > 262) continue; bolas.push([x, Math.max(y, 28 + rr), rr]); } });
  for (const [x, y, r] of bolas) disco(x, y + 2, r, P.robleS);
  for (const [x, y, r] of bolas) disco(x - 1, y, r * 0.82, P.roble);
  for (const [x, y, r] of bolas) disco(x + r * 0.2, y - r * 0.4, r * 0.45, P.robleL);
  for (const [x, y, r] of bolas) for (let k = 0; k < 8; k++) { const xx = Math.round(x + (h(k, x, 658) - 0.5) * r * 1.7), yy = Math.round(y + (h(k, y, 659) - 0.5) * r * 1.3); pset(xx, yy, k % 3 === 0 ? hex('#9aac54') : P.robleS); if (k % 3 === 1) pset(xx + 1, yy, P.robleS); }
  for (const [x, y, r] of bolas) for (let i = -Math.round(r * 0.8); i <= r * 0.8; i += 2) pset(Math.round(x + i), Math.round(y + r * 0.85), P.robleS);
  bolas.forEach(([x, y, r], k) => { if (k % 4) return; const L = 4 + Math.round(h(k, 3, 660) * 8), xx = Math.round(x + (h(k, 1, 660) - 0.5) * r); for (let j = 0; j < L; j++) pset(xx + (j > L * 0.6 ? 1 : 0), Math.round(y + r * 0.8) + j, j % 3 === 2 ? P.musgoS : P.musgo); });
  // un tronco de deriva blanqueado, conchas y una mata de yuca en la duna
  for (let i = 0; i < 34; i++) { const x = 40 + i, y = 168 - Math.round(i * 0.12); pset(x, y - 2, hex('#d8d0c0')); pset(x, y - 1, hex('#b8ae9c')); pset(x, y, hex('#8a8070')); if (i % 7 === 3) pset(x, y - 1, hex('#8a8070')); }
  linea(60, 166, 64, 160, hex('#b8ae9c')); linea(61, 166, 65, 160, hex('#d8d0c0'));
  for (let k = 0; k < 9; k++) { const x = Math.round(h(k, 4, 662) * 300 + 10), y = 150 + Math.round(h(k, 5, 662) * 28); pset(x, y, P.blancoT); pset(x + 1, y, hex('#e8c8b8')); }
  { const x = 284, b = 146; for (let k = -5; k <= 5; k++) linea(x, b, x + k * 2, b - 9 + Math.abs(k), k % 2 ? P.hierbaS : P.verdeT); }
  // la arena mojada de la orilla (más oscura y con brillos) y la línea de algas y restos que dejó la marea
  for (let x = 0; x < 320; x++) { const yb = 131 + Math.round(Math.sin(x * 0.05 + 2) * 1.5); for (let y = 126; y <= yb; y++) { if (Math.abs(x - c_troncoX(y)) <= c_troncoW(y) + 1) continue; const c = c_umbral(x, y) < (y - 126) / (yb - 126 + 1) ? P.arena : c_mezcla(P.arenaS, P.mar, 0.18); pset(x, y, h(x, y, 664) < 0.04 ? P.arenaL : c); }
    const ya = yb + 2 + Math.round(Math.sin(x * 0.13) * 1); if (Math.abs(x - c_troncoX(ya)) <= c_troncoW(ya) + 2) continue; if (h(x, 1, 665) < 0.45) pset(x, ya, h(x, 2, 665) < 0.5 ? P.robleS : P.tierraS); if (h(x, 3, 665) < 0.12) pset(x, ya - 1, P.roble); }
  // una cuaderna de barco que trajo el mar, medio enterrada, con sus clavos oxidados y la arena amontonada contra ella
  for (let i = 0; i < 30; i++) { const x = 108 + i, y = 174 - Math.round(i * 0.1); pset(x, y - 3, hex('#c8bca8')); pset(x, y - 2, hex('#a89c88')); pset(x, y - 1, hex('#8a7e6c')); pset(x, y, P.arenaD); if (i % 8 === 4) { pset(x, y - 2, P.oxido); pset(x, y - 4, P.oxidoS); } if (i % 5 === 1) pset(x, y + 1, P.arenaL); }
  for (const [x, y] of [[112, 170], [132, 168]]) { linea(x, y, x - 3, y - 8, hex('#a89c88')); linea(x + 1, y, x - 2, y - 8, hex('#c8bca8')); pset(x - 3, y - 9, hex('#8a7e6c')); }
  // huellas que suben de la orilla hacia la duna, a la izquierda
  for (let k = 0; k < 9; k++) { const x = 92 - k * 7 + (k % 2) * 3, y = 134 + k * 3; pset(x, y, P.arenaD); pset(x + 1, y, P.arenaS); pset(x, y + 1, P.arenaS); }
  // más conchas y un caracol, con su brillo
  for (const [x, y] of [[120, 172], [136, 158], [196, 176], [250, 168], [22, 160], [304, 172]]) { pset(x, y, P.blancoT); pset(x + 1, y, hex('#e8b8a0')); pset(x, y + 1, hex('#c89880')); pset(x + 1, y + 1, P.arenaD); }
  if (ep === 1590) { const [a, b, c, d] = c_TALLA_ARBOL; c_pelado(R, a, b, c, d, (x) => x, 2); }
}
// C4: el roble de la duna con «CRO» (1590), el mar que rompe y el viento
function c_arbol(R, t, o, ep, luz, g) {
  const P = c_P, hor = 98;
  c_cielo(R, t, { hor, modo: luz, sol: c_sol(luz, hor, [272, 58, 7]), luna: [262, 54, 6], cumulos: 5 });
  c_agua(R, t, 0, 319, hor, 128, [g(P.marL), g(P.mar), g(P.marS), g(hex('#e8f4f8'))], 4);
  // la espuma de las olas que rompen en la orilla
  for (let x = 0; x < 320; x++) { const a = Math.sin(t * 0.9 + x * 0.04), y = 124 + Math.round(a * 1.5); if (h(x >> 1, Math.floor(t * 2), 660) < 0.75) { R.pset(x, y, g(P.blancoT)); if (a > 0.3) R.pset(x, y + 1, g(hex('#cfe4ec'))); } if (Math.sin(t * 0.5 + x * 0.11) > 0.8) R.pset(x, 112 + Math.round(Math.sin(x) * 2), g(hex('#cfe4ec'))); }
  // dos líneas de rompientes mar adentro que avanzan, y de vez en cuando un delfín que asoma la aleta
  for (const [y0, v, k] of [[106, 0.17, 0], [112, 0.21, 1], [118, 0.27, 2]]) { const ph = (t * v + k * 0.37) % 1, y = y0 + Math.round(ph * 4), cr = ph < 0.8 ? 1 - Math.abs(ph - 0.4) / 0.4 : 0; for (let x = 0; x < 320; x++) { const s2 = Math.sin(x * (0.05 + k * 0.01) + k * 2 + t * 0.4) + h(x >> 2, k, 669) * 0.4; if (s2 > 1 - cr * 0.9) { R.pset(x, y - 1, g(P.marL)); R.pset(x, y, g(s2 > 1.1 - cr * 0.4 ? P.blancoT : hex('#cfe4ec'))); R.pset(x, y + 1, g(k === 2 && s2 > 0.9 ? hex('#cfe4ec') : P.marS)); R.pset(x, y + 2, g(P.marS)); } } }
  { const per = 11, u = (t % per) / 1.4; if (u < 1) { const x = 70 + Math.round(u * 26), y = 106 - Math.round(Math.sin(u * Math.PI) * 3); R.rect(x - 4, y + 1, x + 2, y + 1, g(P.marS)); R.linea(x - 3, y + 1, x - 1, y - 3, g(hex('#4a5a6a'))); R.linea(x - 1, y - 3, x + 1, y + 1, g(hex('#3a4a5a'))); R.pset(x - 5, y + 2, g(P.blancoT)); R.pset(x + 3, y + 2, g(P.blancoT)); } }
  c_capa(R, 'arbol' + ep, luz, () => c_arbolFijo(R, ep));
  let talla = null;
  if (ep === 1590) { const [a, b, c, d] = c_TALLA_ARBOL, u = Math.max(0, Math.min(1, o.talla ?? 1)), luzY = u >= 1 ? 999 : Math.round(b + 3 + u * (d - b));
    if (u < 1) for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) if (y > luzY + 3) R.pset(x, y, c_mezcla(R.pget(x, y), hex('#2a1c18'), 0.45));
    talla = c_tallar(R, 'CRO', a + 3, b + 5, 1.5, 1.6, false, g, luzY, 2); }
  // la ola que sube por la arena mojada y se retira (encaje de espuma y el brillo del agua que se va)
  { const u = (t * 0.32) % 1, f = u < 0.4 ? u / 0.4 : 1 - (u - 0.4) / 0.6, yf = 125 + Math.round(f * 6);
    for (let x = 0; x < 320; x++) { const y = yf + Math.round(Math.sin(x * 0.09 + t * 0.7) * 1.2); if (Math.abs(x - c_troncoX(y)) <= c_troncoW(y) + 1) continue; if (h(x >> 1, 7, 666) < 0.8) R.pset(x, y, g(P.blancoT)); if (h(x, Math.floor(t * 3), 667) < 0.35) R.pset(x, y - 1, g(hex('#cfe4ec')));
      if (u > 0.4 && y + 2 < 131 && h(x, Math.floor(t * 4), 668) < 0.12) R.pset(x, y + 2, g(P.arenaL)); } }
  // los correlimos que corren detrás de la ola y el cangrejo que cruza de lado
  { const u = (t * 0.32) % 1, f = u < 0.4 ? u / 0.4 : 1 - (u - 0.4) / 0.6; for (let k = 0; k < 3; k++) { const x = 130 + k * 9 + Math.round(f * -6 + Math.sin(t * 6 + k) * 1), y = 128 + Math.round(f * 3) + (k % 2), pata = Math.floor(t * 10 + k) % 2; R.rect(x - 1, y - 3, x + 1, y - 2, g(P.piedraL)); R.pset(x - 1, y - 3, g(P.piedraS)); R.pset(x + 2, y - 3, g(P.hollin)); R.pset(x + 2, y - 4, g(P.piedraL)); R.pset(x + pata - 1, y - 1, g(P.hollin)); R.pset(x + 1 - pata, y - 1, g(P.hollin)); } }
  { const cx = 284 + Math.round(Math.sin(t * 0.45) * 24), cy = 153 + Math.round(Math.sin(t * 0.7) * 1), p = Math.floor(t * 10) % 2; R.rect(cx - 2, cy - 1, cx + 2, cy, g(P.oxidoL)); R.rect(cx - 1, cy - 2, cx + 1, cy - 2, g(P.oxido)); R.pset(cx - 1, cy - 3, g(P.hollin)); R.pset(cx + 1, cy - 3, g(P.hollin)); for (const d of [-1, 1]) { R.pset(cx + d * 3, cy - 2, g(P.oxidoL)); R.pset(cx + d * 3, cy + 1 - p, g(P.oxido)); R.pset(cx + d * 2, cy + 1, g(P.oxido)); } }
  // los matojos que se mueven con el viento, la arena que corre y las gaviotas
  c_matas(R, t, [[30, 150, 8], [64, 142, 7], [98, 156, 10], [150, 146, 8], [182, 170, 9], [278, 150, 9], [300, 162, 11], [262, 140, 7]], g, true, 3);
  for (let k = 0; k < 8; k++) { const x = Math.round(((h(k, 1, 661) * 400 + t * (70 + k * 6)) % 400) - 40), y = 150 + Math.round(h(k, 2, 661) * 24); R.rect(x, y, x + 3 + (k % 3), y, g(P.arenaL)); }
  c_aves(R, t, 3, 70, -16, 6, g(C.blanco), g(P.piedraS));
  if (luz === 'amanecer') c_niebla(R, t, 100, 140, 0.4);
  return { suelo: 162, libre: [30, 180], talla: talla ?? [...c_TALLA_ARBOL], arbol: [226, 158], mar: hor };
}
// por delante en el árbol: matojos en las esquinas de abajo
function c_arbolDelante(R, t, o, ep, luz, g) {
  c_matas(R, t, [[4, 180, 15], [18, 180, 10], [308, 180, 14]], g, true, 7);
  return {};
}

// los surcos del huerto (y de cada hilera, de atrás adelante) y dónde va cada mata de maíz
const c_SURCOS = [106, 111, 117, 124, 132, 141];

// la capa fija del huerto (una por época y por décima de sequía)
function c_huertoFijo(R, ep, seco) {
  const P = c_P, { rect, pset, linea, disco } = R, B = R.buf;
  c_colinas(R, 84, 8, 90, P.lej1, P.lej2, 4.2, { arboles: P.lej0, n: 50, pinos: true });
  for (const [x, a] of [[6, 50], [22, 58], [38, 46], [70, 54], [92, 62], [118, 48], [138, 56], [172, 50], [190, 60], [214, 44], [246, 52], [266, 46], [290, 36], [308, 40]]) c_pino(R, x, 100, a, 0.95, x + 11, 0);
  c_roble(R, 156, 101, 0.8, 9); c_roble(R, 52, 101, 0.7, 8);
  for (let x = 0; x < 320; x++) for (let y = 92 + Math.round(Math.abs(Math.sin(x * 0.13)) * 4); y <= 102; y++) pset(x, y, h(x, y, 670) < 0.3 ? P.copaS : P.copa);
  // la tierra del huerto: húmeda y oscura, o clara y agrietada con la sequía; los caballones en perspectiva
  const tierra = [c_mezcla(P.tierra, P.tierraSeca, seco), c_mezcla(P.tierraS, P.tierraSeca, seco * 0.6), c_mezcla(P.tierraL, P.tierraSecaL, seco)];
  for (let y = 103; y <= 152; y++) { const f = y * 320, fila = c_SURCOS.findIndex((v) => y < v), y0 = fila > 0 ? c_SURCOS[fila - 1] : 103, u = (y - y0) / Math.max(1, (fila >= 0 ? c_SURCOS[fila] : 152) - y0);
    for (let x = 0; x < 320; x++) { const v = h(x, y, 671); let c = u < 0.3 ? tierra[1] : u > 0.75 ? tierra[2] : tierra[0]; if (v < 0.05) c = tierra[2]; else if (v > 0.96) c = tierra[1]; B[f + x] = c; } }
  if (seco > 0.2) for (let k = 0; k < Math.round(seco * 70); k++) { let x = Math.round(h(k, 1, 672) * 319), y = 104 + Math.round(h(k, 2, 672) * 46); for (let i = 0; i < 6; i++) { pset(x, y, P.grieta); x += Math.round(h(k, i, 673) * 2) - (i % 2); y += i % 3 === 0 ? 1 : 0; } }
  // la cerca de varas al fondo y a la izquierda
  for (let x = 0; x < 200; x += 12) { rect(x, 96, x + 1, 106, P.tablaS); pset(x, 95, P.tabla); }
  for (const y of [98, 102]) for (let x = 0; x < 200; x++) pset(x, y + Math.round(Math.sin(x * 0.26) * 0.6), (x >> 2) % 2 ? P.tabla : P.tablaL);
  if (ep === 1590) for (let x = 40; x < 80; x++) pset(x, 102, P.tierraS);
  // las calabazas entre las matas (más pequeñas y pálidas con la sequía)
  for (let k = 0; k < 9; k++) { const x = 14 + k * 21 + (k % 2) * 6, y = c_SURCOS[2 + (k % 4)] - 1, r = Math.max(1.5, 3.4 - seco * 1.6); if (ep === 1590 && k % 2) continue;
    linea(x - 6, y + 1, x + 6, y, c_mezcla(P.hierbaS, P.secaS, seco)); disco(x, y - r + 1, r, c_mezcla(P.ocreT, P.tierraSecaL, seco * 0.5)); pset(x - 1, y - Math.round(r * 1.4), c_mezcla(P.ocreT, C.blanco, 0.4)); linea(x, y - Math.round(r * 2), x, y - Math.round(r * 2) + 1, P.hierbaS); }
  // el granero de tablas sobre pies, con la puerta abierta y los sacos dentro (se vacían con la sequía)
  { const x0 = 200, x1 = 270, b = 150, yw = 120;
    for (const px of [x0 + 2, x0 + 34, x1 - 4]) rect(px, b - 6, px + 3, b, P.tronco);
    for (let y = yw; y <= b - 6; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) % 7, v = h(x, y >> 2, 674); pset(x, y, u === 0 ? P.tablaD : u === 6 ? P.tablaS : v < 0.12 ? P.tablaS : v > 0.92 ? P.tablaL : P.tabla); }
    rect(x0, b - 7, x1, b - 6, P.tablaD);
    const [pa, pb] = [222, 242]; rect(pa - 1, yw + 6, pb + 1, b - 7, P.tablaD); rect(pa, yw + 7, pb, b - 7, hex('#2a1e14'));
    const n = ep === 1590 ? 0 : Math.round((1 - seco) * 6); for (let k = 0; k < n; k++) { const sx = pa + 2 + (k % 3) * 6, sy = b - 9 - Math.floor(k / 3) * 6; disco(sx + 2, sy - 2, 3, P.lonaS); rect(sx, sy - 4, sx + 4, sy, P.lonaS); pset(sx + 1, sy - 4, P.lona); pset(sx + 2, sy - 5, P.pajaS); }
    if (n < 2) { rect(pa + 3, b - 9, pa + 8, b - 8, P.lonaS); }
    for (let y = yw + 7; y <= b - 7; y++) for (let x = pb + 2; x <= pb + 7; x++) pset(x, y, (x - pb) % 3 === 0 ? P.tablaS : P.tablaL);
    if (ep === 1590) { rect(pb + 2, yw + 7, pb + 7, yw + 9, hex('#2a1e14')); }
    c_tejado(R, x0, x1, yw, yw - 20);
    rect(206, 136, 207, 149, P.tablaS); linea(207, 136, 211, 133, P.tablaS); rect(210, 132, 213, 133, P.hierro); }
  // el patio de tierra pisada de delante, con la cesta, el cubo y la azada
  c_arenal(R, 0, 319, 153, 179, [c_mezcla(P.tierraL, P.arena, 0.5), c_mezcla(P.tierra, P.arenaS, 0.5), P.arena, P.tierraS], 3);
  for (let x = 0; x < 320; x++) { pset(x, 152, P.tierraS); if (h(x, 1, 675) < 0.3) pset(x, 153, P.tierraS); }
  { const x = 278, b = 156; for (let y = b - 7; y <= b; y++) for (let i = -6 + Math.round((b - y) * 0.2); i <= 6 - Math.round((b - y) * 0.2); i++) pset(x + i, y, (i + y) % 2 ? P.pajaS : P.paja); rect(x - 6, b - 8, x + 6, b - 8, P.pajaD); linea(x - 5, b - 8, x - 2, b - 13, P.pajaS); linea(x + 5, b - 8, x + 2, b - 13, P.pajaS); linea(x - 2, b - 13, x + 2, b - 13, P.pajaS); }
  // el tocón de partir leña con el hacha clavada, astillas, piedras y una carretilla de mano con calabazas
  { const x = 22, b = 166; rect(x - 6, b - 8, x + 6, b, P.tronco); rect(x - 6, b - 8, x + 6, b - 7, P.troncoL); for (let i = -5; i <= 5; i += 2) pset(x + i, b - 8, P.tablaS); rect(x + 6, b - 7, x + 6, b, P.troncoS);
    linea(x + 1, b - 9, x + 7, b - 17, P.tablaL); rect(x - 1, b - 10, x + 2, b - 9, P.hierro); pset(x - 2, b - 10, hex('#8a8a96'));
    for (let k = 0; k < 7; k++) linea(x - 14 + k * 4, b + 1 + (k % 3), x - 12 + k * 4, b + (k % 3), P.vivo); }
  for (let k = 0; k < 12; k++) { const x = Math.round(h(k, 1, 685) * 300 + 10), y = 160 + Math.round(h(k, 2, 685) * 18); rect(x, y, x + 2, y + 1, P.piedraS); pset(x, y, P.piedraL); }
  { const x = 52, b = 172; rect(x, b - 6, x + 18, b - 2, P.tablaS); rect(x + 1, b - 5, x + 17, b - 3, P.tabla); linea(x + 18, b - 5, x + 28, b - 1, P.tablaS); linea(x - 6, b - 8, x, b - 5, P.tablaS); R.disco(x + 4, b, 3, P.tablaD); R.disco(x + 4, b, 1, P.tabla);
    if (seco < 0.7) for (const [dx, c] of [[4, P.ocreT], [9, P.oxidoL], [14, P.ocreT]]) { R.disco(x + dx, b - 8, 2.5, c); pset(x + dx - 1, b - 10, c_mezcla(c, C.blanco, 0.4)); } }
  // las rodadas de la carretilla y las pisadas del patio, paja suelta y, con la sequía, la tierra cuarteada
  for (let x = 90; x < 320; x++) { const y = 168 + Math.round(Math.sin(x * 0.03) * 2); if (h(x, 1, 686) < 0.7) { pset(x, y, P.tierraS); pset(x, y + 4, P.tierraS); } if (h(x, 2, 686) < 0.08) pset(x, y - 1, P.arena); }
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 687) * 200 + 90), y = 161 + Math.round(h(k, 2, 687) * 17); linea(x, y, x + 2 + (k % 3), y - (k % 2), k % 2 ? P.pajaL : P.paja); }
  if (seco > 0.4) for (let k = 0; k < Math.round(seco * 24); k++) { let x = Math.round(h(k, 1, 688) * 170 + 90), y = 162 + Math.round(h(k, 2, 688) * 16); for (let i = 0; i < 7; i++) { pset(x, y, P.grieta); x += 1; y += Math.round(h(k, i, 689) * 2) - 1; } }
  { const x = 296, b = 158; rect(x - 4, b - 7, x + 4, b, P.tablaS); rect(x - 3, b - 6, x + 3, b - 1, P.tabla); rect(x - 4, b - 5, x + 4, b - 5, P.hierro); rect(x - 4, b - 7, x + 4, b - 7, P.tablaL); if (seco < 0.5) rect(x - 3, b - 7, x + 3, b - 7, P.aguaL); }
}
// C5: el huerto y el granero, con el maíz que se mece, los cuervos y la gente que trabaja
function c_huerto(R, t, o, ep, luz, g) {
  const P = c_P, hor = 86, seco = Math.round(Math.max(0, Math.min(1, ep === 1590 ? 0.6 : o.seco ?? 0)) * 10) / 10;
  c_cielo(R, t, { hor, modo: luz, sol: c_sol(luz, hor, [228, 30, 7 + Math.round(seco * 2)]), luna: [228, 30, 6], cumulos: Math.round(5 - seco * 3), calima: seco > 0.5 });
  // la bruma azulada del fondo, bajo el horizonte (tapa la franja que el cielo y las colinas no pintan)
  { const B = R.buf, cA = g(P.lej2), cB = g(c_mezcla(P.lej2, P.lej1, 0.5)); for (let y = hor; y <= 103; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = c_umbral(x, y) < (y - hor) / 18 ? cB : cA; }
  c_capa(R, 'huerto' + ep + '_' + seco, luz, () => c_huertoFijo(R, ep, seco));
  if (luz === 'dia' && seco < 0.6) c_sombrasNubes(R, t, 106, 176);
  // las matas de maíz en sus surcos: altas y verdes, o bajas, amarillas y con las hojas rizadas; se mecen
  const verde = [g(c_mezcla(P.hierba, P.seca, seco)), g(c_mezcla(P.hierbaS, P.secaS, seco)), g(c_mezcla(P.hierbaL, P.secaL, seco))];
  for (let f = 0; f < c_SURCOS.length; f++) { const y = c_SURCOS[f] - 1, s = 0.55 + f * 0.1, alto0 = Math.round((ep === 1590 ? 8 : 26 - seco * 11) * s);
    for (let x0 = 4 + (f % 2) * 6; x0 < 196; x0 += Math.round(11 * s + 2)) { if (h(x0, f, 680) < (ep === 1590 ? 0.4 : 0.08)) continue; const x = x0 + Math.round((h(x0, f, 682) - 0.5) * 4), alto = Math.round(alto0 * (0.8 + h(x0, f, 683) * 0.35)), m = Math.sin(t * 1.6 + x * 0.12 + f) * (1.2 + (1 - seco)), tx = Math.round(x + m), ty = y - alto;
      R.linea(x, y, tx, ty, verde[1]); R.linea(x + 1, y, tx + 1, ty + 1, verde[0]);
      for (let k = 0; k < 3; k++) { const hy = Math.round(y - alto * (0.3 + k * 0.22)), d = k % 2 ? 1 : -1, L = Math.round((5 - seco * 2) * s + 2), cae = seco > 0.5 ? 2 : 0; R.linea(x + Math.round(m * (0.3 + k * 0.22)), hy, x + d * L + Math.round(m * 0.6), hy - 2 + cae + Math.round(L * 0.3), k === 1 ? verde[2] : verde[0]); }
      if (ep === 1587 && seco < 0.7) { R.pset(tx, ty - 1, g(P.pajaL)); R.pset(tx + 1, ty - 2, g(P.paja)); } if (alto > 14 && seco < 0.6 && (x + f) % 3 === 0) { R.rect(x + 2, y - Math.round(alto * 0.5), x + 3, y - Math.round(alto * 0.5) + 3, g(C.maiz)); R.pset(x + 3, y - Math.round(alto * 0.5) - 1, g(P.pajaS)); } } }
  if (ep === 1587) { c_gente(R, 168, 110, t, 'azada', P.ocreT, g, -1, 5, P.pajaS); c_gente(R, 288, 124, t, 'azada', P.verdeT, g, -1, 6); c_gente(R, 304, 140, t, 'cubos', P.azulT, g, -1, 7); }
  if (ep === 1590) c_matas(R, t, [[20, 140, 9], [60, 130, 8], [110, 146, 10], [150, 120, 7], [180, 136, 9]], g, true, 5);
  // los cuervos que buscan grano en los surcos (saltan y picotean) y, con la sequía, polvo que se levanta
  for (let k = 0; k < 3; k++) { const x = 60 + k * 44 + Math.round(Math.sin(t * 0.5 + k) * 8), b = 128 + k * 7, p = Math.sin(t * 2.6 + k * 2) > 0.4 ? 1 : 0, sal = Math.sin(t * 1.1 + k * 3) > 0.9 ? 2 : 0;
    R.rect(x, b - 3 - sal, x + 3, b - 1 - sal, g(P.cuervo)); R.pset(x + 4, b - 3 - sal + p, g(P.cuervo)); R.pset(x + 5, b - 3 - sal + p, g(P.hierro)); R.pset(x - 1, b - 3 - sal, g(P.cuervo)); R.pset(x + 1, b - sal, g(P.hierro)); }
  if (seco > 0.4) for (let k = 0; k < 10; k++) { const u = (t * 0.25 + k / 10) % 1, x = Math.round(h(k, 1, 681) * 320 + u * 40) % 320, y = Math.round(150 - u * 20 - h(k, 2, 681) * 20); R.pset(x, y, g(P.tierraSecaL)); }
  // 1587: la gallina con sus pollitos, que escarban en el patio por debajo de los pies de todos (y 174–178)
  if (ep === 1587) { const x0 = 150 + Math.round(Math.sin(t * 0.12) * 30); c_gallina(R, x0, 176, t, 1, g);
    for (let k = 0; k < 3; k++) { const x = x0 + 7 + k * 4 + Math.round(Math.sin(t * 1.3 + k * 2) * 2), y = 177 - (k % 2), p = Math.sin(t * 5 + k * 3) > 0.3 ? 1 : 0; R.rect(x, y - 2, x + 1, y - 1, g(hex('#f4dc70'))); R.pset(x + 2, y - 2 + p, g(P.ocreT)); R.pset(x, y, g(P.ocreT)); } }
  c_aves(R, t, 2, 54, 14, 8, g(P.cuervo), g(P.cuervo));
  if (luz === 'amanecer') c_niebla(R, t, 96, 130, 0.4);
  return { suelo: 158, libre: [30, 250], granero: [200, 100, 270, 150], puerta: [232, 150], sacos: ep === 1590 ? 0 : Math.round((1 - seco) * 6), seco };
}
// por delante en el huerto: matas de maíz en los bordes
function c_huertoDelante(R, t, o, ep, luz, g) {
  const P = c_P, seco = ep === 1590 ? 0.6 : o.seco ?? 0, c = [g(c_mezcla(P.hierba, P.seca, seco)), g(c_mezcla(P.hierbaS, P.secaS, seco))];
  for (const [x, a] of [[3, 40], [12, 34], [312, 38]]) { const m = Math.round(Math.sin(t * 1.4 + x) * 2); R.linea(x, 180, x + m, 180 - a, c[1]); R.linea(x + 1, 180, x + m + 1, 180 - a, c[0]); for (let k = 0; k < 4; k++) { const y = 176 - k * 9, d = k % 2 ? 1 : -1; R.linea(x, y, x + d * 8 + m, y - 4 + (seco > 0.5 ? 4 : 0), c[k % 2]); } }
  return {};
}

// una pinaza (bote grande de remo y vela): casco con tracas, la borda clara, el palo con la vela aferrada y la
// banderita de San Jorge, los remos; x, wl: centro y línea de flotación; s: escala; rema: los remos se mueven
function c_pinaza(R, x, wl, s, t, g, rema = false, sombra = null) {
  const P = c_P, H = Math.max(2, Math.round(9 * s)), bob = Math.round(Math.sin(t * 1.6) * s), L = Math.round(30 * s);
  c_pinazaCasco(R, x, wl, s, t, g);
  wl += bob;
  const mx = x + Math.round(2 * s), mt = wl - H - Math.round(48 * s);
  R.rect(mx, mt, mx + Math.max(0, Math.round(s) - 1), wl - H, g(P.tablaS));
  R.rect(mx - Math.round(14 * s), mt + Math.round(6 * s), mx + Math.round(14 * s), mt + Math.round(6 * s) + Math.max(0, Math.round(s) - 1), g(P.tablaS));
  for (let i = -Math.round(13 * s); i <= Math.round(13 * s); i++) { const y = mt + Math.round(7 * s) + Math.round(Math.abs(Math.sin(i * 0.9)) * 2 * s); R.pset(mx + i, y, g(P.lona)); R.pset(mx + i, y + 1, g(P.lonaS)); }
  const fl = Math.round(Math.sin(t * 5) * s); for (let j = 0; j < Math.round(5 * s); j++) for (let i = 1; i <= Math.round(8 * s); i++) R.pset(mx + i, mt + j + (i > 4 * s ? fl : 0), g(j === Math.round(2 * s) || i === Math.round(4 * s) ? P.sanJorge : P.blancoT));
  c_pinazaRemos(R, x, wl, s, t, g, rema);
  // el reflejo, tramado y temblón
  for (let i = -L; i <= L; i += 1) for (let j = 1; j <= Math.round(8 * s); j++) if ((i + j) % 2 === 0 && h(i, j, Math.floor(t * 4)) < 0.7) { const xx = x + i + Math.round(Math.sin(j + t * 3)), yy = wl + Math.round(3 * s) + j; R.pset(xx, yy, c_mezcla(R.pget(xx, yy), hex('#2a2018'), 0.3)); }
  return [x + L, wl - H];
}
// barquito lejano de tres palos con la cruz roja en la mayor
function c_barcoLejos(R, x, y, t, g, k = 0) {
  const P = c_P, b = Math.round(Math.sin(t * 1.2 + k) * 0.6); y += b;
  R.rect(x - 7, y - 1, x + 6, y, g(P.tablaD)); R.rect(x + 4, y - 3, x + 7, y - 1, g(P.tablaD)); R.pset(x - 7, y - 2, g(P.tablaD));
  for (const [mx, a] of [[-4, 9], [0, 12], [4, 8]]) { R.rect(x + mx, y - a, x + mx, y - 2, g(P.tablaD)); R.rect(x + mx - 2, y - a + 2, x + mx + 2, y - a + 5, g(P.lona)); }
  R.pset(x, y - 9, g(P.sanJorge)); R.pset(x, y - 8, g(P.sanJorge)); R.pset(x - 1, y - 8, g(P.sanJorge)); R.pset(x + 1, y - 8, g(P.sanJorge)); R.pset(x, y - 7, g(P.sanJorge));
}

// garza que espera inmóvil entre los juncos y, de vez en cuando, pesca
function c_garza(R, x, b, t, g) {
  const P = c_P, c = g(P.garza), cS = g(P.garzaS), pesca = (t % 7) > 6.2;
  R.linea(x, b, x, b - 6, cS); R.linea(x + 2, b, x + 2, b - 6, cS); R.rect(x - 2, b - 11, x + 3, b - 7, c); R.rect(x - 3, b - 8, x + 1, b - 7, cS);
  if (pesca) { R.linea(x + 3, b - 10, x + 7, b - 5, c); R.linea(x + 8, b - 5, x + 10, b - 3, g(P.ocreT)); } else { R.linea(x + 3, b - 11, x + 4, b - 15, c); R.pset(x + 3, b - 16, c); R.pset(x + 4, b - 17, c); R.rect(x + 5, b - 17, x + 8, b - 17, g(P.ocreT)); R.pset(x + 3, b - 18, g(P.hollin)); }
}

// dónde están los pilotes del embarcadero
const c_PILOTES = [6, 46, 86, 126, 166, 206, 234];

// la capa fija del embarcadero: las islas, el cerco de pesca, la sombra en el agua y el embarcadero con sus pilotes
function c_embarcaderoFijo(R, ep) {
  const P = c_P, { rect, pset, linea } = R, B = R.buf, viejo = ep === 1590;
  // los bancos de arena lejanos, con dunitas y matas (los barcos quedan detrás)
  for (let x = 0; x < 320; x++) { const yc = 85 - Math.round(Math.max(0, Math.sin(x * 0.05 + 1)) * 2 + Math.max(0, Math.sin(x * 0.17)) * 1); for (let y = yc; y <= 89; y++) pset(x, y, y === yc ? P.arenaL : y > 87 ? P.arenaS : h(x, y, 690) < 0.3 ? P.arenaD : P.arena); if (h(x, 1, 691) < 0.25) pset(x, yc - 1, P.hierbaS); }
  // la punta de la isla a la izquierda, con su bosque, y la otra isla lejana a la derecha
  for (let x = 0; x < 90; x++) { const top = 78 + Math.round((x / 90) ** 1.6 * 10 + Math.abs(Math.sin(x * 0.5)) * 2); for (let y = top; y <= 90; y++) pset(x, y, y > 88 ? P.arenaS : h(x, y, 695) < 0.3 ? P.lej0 : y === top ? P.lej2 : P.lej1); }
  for (let x = 250; x < 320; x++) { const top = 84 - Math.round(Math.sin((x - 250) / 70 * Math.PI) * 4); for (let y = top; y <= 87; y++) pset(x, y, h(x, y, 696) < 0.3 ? P.lej1 : P.lej2); }
  // un bajío de arena a media distancia, con la orilla mojada, matas de hierba de playa y un tronco varado
  for (let x = 206; x < 306; x++) { const u = (x - 206) / 100, top = 104 - Math.round(Math.sin(u * Math.PI) * 3 + Math.sin(u * 9) * 0.6);
    for (let y = top; y <= 106; y++) pset(x, y, y === top ? P.arenaL : y === 106 ? P.aguaL : y === 105 ? P.arenaD : h(x, y, 703) < 0.25 ? P.arenaS : P.arena);
    if (h(x, 1, 704) < 0.18) { pset(x, top - 1, P.hierbaS); if (h(x, 2, 704) < 0.5) pset(x, top - 2, P.hierba); } }
  rect(238, 102, 249, 102, P.tablaS); rect(239, 101, 247, 101, P.tablaL); pset(250, 101, P.tablaS); pset(251, 100, P.tablaS);
  // el cerco de cañas para pescar de los vecinos, en la lejanía: dos alas de estacas que cierran en un corral
  for (let i = 0; i < 26; i++) { const x = 96 + i * 3, y = 104 + Math.round(Math.abs(i - 13) * 0.6); rect(x, y - 4, x, y, P.tablaS); pset(x, y - 5, P.tablaD); }
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, x = Math.round(136 + Math.cos(a) * 7), y = Math.round(114 + Math.sin(a) * 2.5); rect(x, y - 5, x, y, P.tablaS); }
  // la sombra del embarcadero en el agua (fija) y el embarcadero: tablas, viga, pilotes con su verdín
  for (let y = 168; y < 180; y++) for (let x = 0; x <= 240; x++) B[y * 320 + x] = c_umbral(x, y) < 0.5 ? P.aguaS : hex('#1e3e34');
  for (const px of c_PILOTES) { rect(px, 164, px + 4, 179, P.log); rect(px, 160, px, 179, P.logD); rect(px + 3, 160, px + 4, 179, P.logL); for (let y = 170; y < 180; y++) pset(px + 1 + (y % 2), y, P.verdeT); }
  for (let x = 0; x <= 240; x++) { const tabla = Math.floor(x / 6), falta = viejo && (tabla === 9 || tabla === 22 || tabla === 31); for (let y = 150; y <= 163; y++) { if (falta && y < 163) { B[y * 320 + x] = y < 160 ? hex('#1e3e34') : P.aguaS; continue; } const u = x % 6, v = h(tabla, y >> 1, 692); let c = u === 0 ? P.tablaD : u === 5 ? P.tablaS : v < 0.15 ? P.tablaS : v > 0.88 ? P.tablaL : P.tabla; if (y === 150) c = P.tablaL; else if (y === 151) c = P.tablaS; if (viejo && h(x, y, 693) < 0.06) c = P.verdeT; pset(x, y, c); } }
  rect(0, 164, 240, 167, P.tablaS); rect(0, 164, 240, 164, P.tabla); for (let x = 0; x <= 240; x += 3) pset(x, 166, P.tablaD);
  // los clavos de cada tabla (dos filas), los nudos, el desgaste claro por donde se pisa y los pernos de la viga
  for (let tb = 0; tb <= 39; tb++) { const x = tb * 6; if (viejo && (tb === 9 || tb === 22 || tb === 31)) continue;
    for (const y of [152, 161]) { pset(x + 2, y, P.tablaD); pset(x + 3, y, viejo ? P.oxido : P.hierro); }
    if (h(tb, 1, 694) < 0.35) { const ny = 154 + Math.floor(h(tb, 2, 694) * 6); pset(x + 2, ny, P.tablaD); pset(x + 3, ny, P.tablaS); pset(x + 2, ny + 1, P.tablaS); }
    if (!viejo && tb > 14 && tb < 39) for (let y = 155; y <= 158; y++) if (h(x, y, 697) < 0.5) pset(x + 1 + (y % 3), y, P.tablaL); }
  for (const px of c_PILOTES) { pset(px + 2, 165, P.tablaD); pset(px + 2, 166, P.hierro); rect(px, 168, px + 4, 169, P.pajaS); for (let i = 0; i <= 4; i += 2) pset(px + i, 168, P.pajaL); }
  // la escalerilla de bajar al agua, entre dos pilotes
  { const x0 = 146, x1 = 152; rect(x0, 168, x0, 179, P.logS); rect(x1, 168, x1, 179, P.logS); pset(x1, 168, P.logL); for (let y = 170; y < 180; y += 3) { rect(x0 + 1, y, x1 - 1, y, P.tabla); rect(x0 + 1, y + 1, x1 - 1, y + 1, P.tablaD); } }
  // el rollo de cuerda junto a la bita (anillos con su sombra)
  { const cx = 226, cy = 157; for (let y = -2; y <= 2; y++) for (let x = -5; x <= 5; x++) { const d = Math.hypot(x, y * 2.2); if (d <= 5.4) pset(cx + x, cy + y, d < 1.6 ? P.tablaD : (Math.round(d) % 2) ? P.paja : P.pajaS); } rect(cx - 5, cy + 3, cx + 5, cy + 3, P.tablaD); pset(cx - 3, cy - 2, P.pajaL); pset(cx + 1, cy - 2, P.pajaL); }
  // la bita del final, el rollo de cuerda y un barril en el embarcadero
  rect(236, 146, 240, 156, P.log); rect(239, 146, 240, 156, P.logL); rect(235, 145, 241, 146, P.logS);
  { const x = 226, y = 160; for (let k = 0; k < 3; k++) { R.anillo?.(x, y - 1, 3 - k, P.pajaS); } pset(x, y - 1, P.pajaD); }
  if (!viejo) { const x = 12, b = 158; for (let y = b - 9; y <= b; y++) for (let i = 0; i < 9; i++) pset(x + i, y, (y - b + 9) % 4 === 1 ? P.hierro : i > 6 ? P.tablaS : i % 3 === 0 ? P.tablaS : P.tabla);
    rect(x + 1, b - 10, x + 7, b - 10, P.tablaL); rect(x - 1, b + 1, x + 10, b + 1, P.tablaD);
    // dos cajas apiladas con sus listones y una cesta de pescado, pasado el juncal
    for (const [cx, cb, w] of [[64, 158, 12], [66, 148, 9]]) { rect(cx, cb - 9, cx + w, cb, P.tablaS); rect(cx + 1, cb - 8, cx + w - 1, cb - 1, P.tabla); rect(cx + 1, cb - 8, cx + w - 1, cb - 8, P.tablaL); linea(cx + 1, cb - 1, cx + w - 1, cb - 8, P.tablaS); pset(cx + 1, cb - 7, P.hierro); pset(cx + w - 1, cb - 7, P.hierro); }
    rect(63, 159, 77, 159, P.tablaD);
    for (let y = 151; y <= 158; y++) { const w = 4 + Math.round((y - 151) * 0.3); for (let i = -w; i <= w; i++) pset(85 + i, y, y === 151 ? P.pajaL : ((i + y) % 2) ? P.paja : P.pajaS); }
    for (const [fx, fy] of [[82, 150], [86, 149], [89, 150]]) { rect(fx, fy, fx + 2, fy, P.garza); pset(fx + 3, fy, P.garzaS); pset(fx + 1, fy - 1, P.aguaB); }
    rect(78, 159, 92, 159, P.tablaD); }
  else { rect(206, 150, 210, 160, P.log); linea(206, 150, 212, 147, P.logS); for (let y = 152; y <= 159; y += 2) pset(207 + (y % 3), y, P.verdeT);
    // lo que quedó: el barril reventado con las duelas sueltas, una caja podrida y un remo roto
    { const x = 12, b = 158; for (let i = 0; i < 9; i += 2) { const hh = 4 + Math.round(h(i, 1, 698) * 5); rect(x + i, b - hh, x + i, b, i % 4 ? P.tablaS : P.tabla); } rect(x - 1, b - 3, x + 9, b - 3, P.oxido); rect(x - 1, b + 1, x + 10, b + 1, P.tablaD); linea(x + 11, b, x + 17, b - 2, P.tablaS); }
    { const cx = 66, cb = 158; rect(cx, cb - 6, cx + 11, cb, P.tablaS); rect(cx + 1, cb - 5, cx + 10, cb - 1, P.logS); for (let i = 1; i < 11; i += 3) pset(cx + i, cb - 5, P.verdeT); rect(cx + 4, cb - 6, cx + 6, cb - 4, P.tablaD); rect(cx - 1, cb + 1, cx + 12, cb + 1, P.tablaD); }
    linea(84, 158, 104, 154, P.tablaL); linea(84, 159, 104, 155, P.tablaS); rect(80, 157, 84, 159, P.tablaL); pset(104, 154, P.tablaD); }
}
// C6: el embarcadero: barcos lejanos, el agua viva, la canoa, el juncal con la garza y la pinaza (o.zarpa)
function c_embarcadero(R, t, o, ep, luz, g) {
  const P = c_P, hor = 84;
  c_cielo(R, t, { hor, modo: luz, sol: c_sol(luz, hor, [240, 30, 7]), luna: [240, 30, 6], cumulos: 5 });
  // los barcos fuera de los bancos de arena
  for (const [x, y, k] of [[118, 86, 0], [150, 85, 1], [186, 87, 2]]) c_barcoLejos(R, x, y, t, g, k);
  c_agua(R, t, 0, 319, hor, 179, c_aguas(g), 3);
  c_capa(R, 'embarcadero' + ep, luz, () => c_embarcaderoFijo(R, ep));
  // la estela del sol (o de la luna) en el agua, patos que nadan, peces que saltan y una canoa de los vecinos que cruza
  { const sx = luz === 'tarde' ? 70 : luz === 'amanecer' ? 246 : 240, col = luz === 'noche' ? hex('#c8d0e8') : luz === 'dia' ? hex('#fffce8') : hex('#ffd8a0');
    for (let y = 92; y < 148; y += 2) { const w = 3 + (y - 92) * 0.25; for (let k = 0; k < 3; k++) { const x = Math.round(sx + (h(k, y, Math.floor(t * 5)) - 0.5) * w * 2); if (h(x, y, Math.floor(t * 6) + 3) < 0.6) R.rect(x, y, x + 1 + (k % 2), y, col); } } }
  for (let k = 0; k < 4; k++) { const x = Math.round(150 + k * 7 - ((t * 3) % 400) * 0.5 + (k % 2) * 2), y = 128 + (k % 2) * 3 + Math.round(Math.sin(t * 2 + k)); if (x < 70) continue; R.rect(x, y - 1, x + 3, y, g(k ? P.tablaS : P.verdeT)); R.pset(x - 1, y - 2, g(k ? P.tablaS : P.verdeT)); R.pset(x - 2, y - 2, g(P.ocreT)); R.rect(x - 1, y + 1, x + 4, y + 1, g(P.aguaL)); }
  for (let k = 0; k < 2; k++) { const per = 5 + k * 2, u = ((t + k * 2.3) % per) / 0.6, x = 110 + k * 90, y = 136 - k * 18; if (u < 1) { const yy = y - Math.round(Math.sin(u * Math.PI) * 5); R.rect(x + Math.round(u * 6), yy, x + Math.round(u * 6) + 2, yy, g(P.garza)); } else if (u < 3) { const r = Math.round(1 + (u - 1) * 3); R.rect(x + 6 - r, y + 1, x + 6 + r, y + 1, g(P.aguaB)); } }
  { const u = ((t * 0.02) % 1), x = Math.round(330 - u * 360), y = 112; if (x > -20 && x < 330) { R.rect(x - 10, y - 1, x + 10, y, g(P.tablaD)); R.rect(x - 9, y - 2, x + 9, y - 2, g(P.tronco)); R.pset(x - 11, y - 2, g(P.tablaD)); R.pset(x + 11, y - 2, g(P.tablaD));
    for (const [dx, k] of [[-5, 0], [4, 1]]) { R.rect(x + dx, y - 6, x + dx + 1, y - 3, g(P.tierraL)); R.rect(x + dx, y - 8, x + dx + 1, y - 7, g(P.pielS)); R.pset(x + dx, y - 9, g(P.hollin)); const a = Math.sin(t * 2.4 + k); R.linea(x + dx + 2, y - 5, x + dx - 1 - Math.round(a * 2), y + 1, g(P.tablaL)); }
    for (let i = 0; i < 14; i += 2) R.pset(x + 12 + i, y + 1, g(P.aguaL)); } }
  // las crestas de las olas que corren con el viento: pequeñas y juntas al fondo, más grandes y espaciadas cerca
  for (let k = 0; k < 46; k++) { const fila = k % 9, y = 94 + fila * 6 + Math.round(h(k, 3, 702) * 3), w = 2 + Math.round(fila * 0.5), v = 3 + fila * 0.8, x = Math.round((h(k, 1, 702) * 360 + t * v) % 360) - 20, ph = (t * 0.9 + h(k, 2, 702) * 6) % 3;
    if (ph > 1.6 || y > 148) continue; const a = ph < 0.4 ? ph / 0.4 : 1 - (ph - 0.4) / 1.2, ww = Math.max(1, Math.round(w * a));
    R.rect(x - ww, y, x + ww, y, g(fila > 4 ? P.aguaB : P.aguaL)); if (fila > 5) R.rect(x - ww + 1, y - 1, x + ww - 1, y - 1, g(P.aguaL)); R.rect(x - ww - 1, y + 1, x + ww + 1, y + 1, g(P.aguaS)); }
  // las aves de orilla del bajío: corren tras la ola y picotean
  for (let k = 0; k < 4; k++) { const x = 222 + k * 17 + Math.round(Math.sin(t * 0.9 + k * 2) * 4), y = 102 - (k === 1 ? 1 : 0), pica = Math.sin(t * 4 + k * 1.7) > 0.5; R.rect(x - 1, y - 3, x + 1, y - 2, g(k % 2 ? P.piedraL : C.blanco)); R.pset(x - 2, y - 2, g(P.piedraS)); R.pset(x + 2, pica ? y - 1 : y - 4, g(P.hollin)); R.pset(x + 1, pica ? y - 2 : y - 4, g(k % 2 ? P.piedraL : C.blanco)); R.pset(x, y - 1, g(P.hollin)); }
  // la boya de barril con su cabo, que cabecea y deja su estela
  { const bx = 196, by = 126 + Math.round(Math.sin(t * 1.9) * 1); R.rect(bx - 2, by - 3, bx + 2, by, g(P.oxido)); R.rect(bx - 2, by - 2, bx + 2, by - 2, g(P.hierro)); R.pset(bx - 1, by - 3, g(P.oxidoL)); R.linea(bx, by - 4, bx, by - 7, g(P.tablaD)); R.rect(bx - 4, by + 1, bx + 4, by + 1, g(P.aguaL)); if (Math.sin(t * 1.9) > 0.6) { R.pset(bx - 6, by + 1, g(P.aguaB)); R.pset(bx + 6, by + 1, g(P.aguaB)); } }
  // un pescador de los vecinos, metido en el agua junto a su cerco, que alza la red de mano y la vacía en la cesta
  { const fx = 150, fy = 116, u = (t * 0.35) % 1, alza = u > 0.55 && u < 0.85, piel = g(P.pielS), pelo = g(P.hollin);
    R.rect(fx - 1, fy - 7, fx + 1, fy - 3, piel); R.rect(fx - 1, fy - 10, fx + 1, fy - 8, piel); R.rect(fx - 1, fy - 11, fx + 1, fy - 11, pelo); R.pset(fx + 1, fy - 12, pelo); R.rect(fx - 1, fy - 3, fx + 1, fy - 2, g(P.ciervoS));
    const hx = fx + 3, hy = alza ? fy - 10 : fy - 4; R.linea(fx + 1, fy - 6, hx, hy, piel); R.linea(hx, hy, hx + 4, alza ? fy - 7 : fy, g(P.tablaS)); R.disco?.(hx + 5, alza ? fy - 6 : fy + 1, 1, g(P.pajaS));
    if (alza && Math.sin(t * 12) > 0) R.pset(hx + 5, fy - 4, g(P.aguaB));
    R.rect(fx - 4, fy - 1, fx + 4, fy - 1, g(P.aguaL)); R.pset(fx - 5 + Math.round(Math.sin(t * 2) * 1), fy, g(P.aguaB));
    R.rect(fx - 9, fy - 3, fx - 6, fy - 1, g(P.pajaS)); R.rect(fx - 9, fy - 3, fx - 6, fy - 3, g(P.paja)); }
  // 1590: una gaviota posada en la caja podrida, que vuelve la cabeza y abre el pico
  if (ep === 1590) { const x = 71, y = 151, mira = Math.sin(t * 0.8) > 0 ? 1 : -1; R.rect(x - 2, y - 3, x + 2, y - 1, g(C.blanco)); R.rect(x - 3, y - 2, x - 1, y - 1, g(P.piedraS)); R.rect(x + mira, y - 5, x + mira + 1, y - 4, g(C.blanco)); R.pset(x + mira * 3, y - 4, g(P.ocreT)); R.pset(x + mira * 2 + (mira > 0 ? 0 : 1), y - 5, g(P.hollin)); R.pset(x - 1, y, g(P.ocreT)); R.pset(x + 1, y, g(P.ocreT)); }
  // los destellos bajo el embarcadero, entre los pilotes
  for (let k = 0; k < 8; k++) { const x = Math.round((h(k, 1, 700) * 240 + t * 6) % 240), y = 170 + (k % 3) * 3; if (Math.sin(t * 4 + k) > 0.3) R.rect(x, y, x + 2, y, g(P.aguaL)); }
  // el juncal de la orilla con la garza
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 701) * 64), b = 152 + Math.round(h(k, 2, 701) * 3), L = 14 + Math.round(h(k, 3, 701) * (ep === 1590 ? 22 : 16)), m = Math.sin(t * 1.5 + x * 0.2) * 2; R.linea(x, b, Math.round(x + m), b - L, g(k % 3 ? P.secaS : P.hierbaS)); if (k % 4 === 0) { R.rect(Math.round(x + m) - 1, b - L - 3, Math.round(x + m), b - L, g(P.tablaS)); } }
  c_garza(R, 48, 150, t, g);
  // la pinaza amarrada al final del embarcadero; o.zarpa 0–1: se aleja remando hacia los barcos
  const [px, wl, s, z] = c_pinazaPos(o);
  const proa = c_pinaza(R, px, wl, s, t, g, z > 0 && z < 1);
  if (z === 0) { for (let i = 0; i <= 10; i++) { const u = i / 10; R.pset(Math.round(238 + (px - Math.round(30 * s) - 238) * u), Math.round(147 + (wl - 7 - 147) * u + Math.sin(u * Math.PI) * 3), g(P.pajaS)); } }
  c_aves(R, t, 3, 56, 15, 9, g(C.blanco), g(P.piedraS));
  if (luz === 'amanecer') c_niebla(R, t, 86, 120, 0.4);
  return { suelo: 164, libre: [20, 230], pinaza: [px, wl], bita: [238, 150], barcos: [150, 85], orilla: [0, 64] };
}
// por delante en el embarcadero: el casco y la borda de la pinaza amarrada (tapan de cintura para abajo a quien va a
// bordo; no muerden el final del embarcadero, que está más cerca) y dos pilotes del borde
function c_embarcaderoDelante(R, t, o, ep, luz, g) {
  const P = c_P, [px, wl, s, z] = c_pinazaPos(o);
  if (z < 0.3) { const xmin = Math.max(px - Math.round(30 * s), 243); c_pinazaCasco(R, px, wl, s, t, g, xmin); c_pinazaRemos(R, px, wl, s, t, g, z > 0 && z < 1, xmin); }
  for (const px of [6, 126]) { R.rect(px, 152, px + 4, 167, g(P.log)); R.rect(px, 152, px, 167, g(P.logD)); R.rect(px + 3, 152, px + 4, 167, g(P.logL)); R.rect(px - 1, 151, px + 5, 152, g(P.logS)); }
  return { postes: [6, 126] };
}
// qué función pinta cada encuadre/cámara, y cuál pinta lo de delante
const c_VISTAS = { 'fuerte/general': c_fuerte, 'fuerte/casa': c_casaDentro, 'poste/general': c_poste, 'poste/arbol': c_arbol, 'huerto/general': c_huerto, 'huerto/embarcadero': c_embarcadero };

// lo de delante de cada vista
const c_DELANTE = { 'fuerte/general': c_fuerteDelante, 'fuerte/casa': c_casaDelante, 'poste/general': c_posteDelante, 'poste/arbol': c_arbolDelante, 'huerto/general': c_huertoDelante, 'huerto/embarcadero': c_embarcaderoDelante };

// la mezcla de dos colores (a: cuánto del segundo)
function d_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// el umbral de trama 4×4 (para degradados tramados sin franjas lisas)
const d_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const d_um = (x, y) => (d_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// el color de una rampa con trama (l real, entre 0 y n − 1)
const d_rampa = (P, l, x, y) => P[Math.max(0, Math.min(P.length - 1, Math.floor(l + d_um(x, y))))];

// el color a la luz de la tarde (cálido) o de la noche (azulado y oscuro)
function d_tonoPx(c, luz) {
  const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255; let r2, g2, b2;
  if (luz === 'tarde') { r2 = r * 0.95 + 30; g2 = g * 0.78 + 12; b2 = b * 0.62 + 14; }
  else if (luz === 'fuego') { r2 = r * 1.1 + 40; g2 = g * 0.78 + 16; b2 = b * 0.4 + 6; }
  else { r2 = r * 0.27 + 12; g2 = g * 0.3 + 16; b2 = b * 0.42 + 30; }
  return (0xff000000 | (Math.min(255, Math.round(b2)) << 16) | (Math.min(255, Math.round(g2)) << 8) | Math.min(255, Math.round(r2))) >>> 0;
}

// el tinte de la luz, con memoria (para lo que se pinta en cada fotograma)
const d_TONOS = new Map();

function d_tono(luz) {
  if (luz === 'dia') return (c) => c;
  let m = d_TONOS.get(luz); if (!m) { m = new Map(); d_TONOS.set(luz, m); }
  return (c) => { let r = m.get(c); if (r === undefined) { r = d_tonoPx(c, luz); m.set(c, r); } return r; };
}

// el fondo fijo: se pinta una vez en un búfer propio (con su máscara de cielo) y se copia en cada fotograma
const d_FIJOS = new Map();

const d_CIELO = 0xff030201;

function d_fijo(R, clave, dibuja) {
  let F = d_FIJOS.get(clave);
  if (!F) { const b = R.nuevo(), prev = R.usar(b); F = { b, ...(dibuja() || {}) }; R.usar(prev); d_FIJOS.set(clave, F); }
  R.copiar(F.b); return F;
}

// cierra un fondo fijo: tiñe con la luz lo que no es cielo (si tinta), pinta el cielo tramado donde quedó la marca y devuelve la
// máscara de las nubes (el cielo sin la esquina de Atom ni la barra del año)
function d_rematar(R, luz, hor, seco, astro, tinta = true) {
  const B = R.buf, cielo = new Uint8Array(57600), nub = new Uint8Array(57600), L = d_tono(luz);
  for (let i = 0; i < 57600; i++) { if (B[i] === d_CIELO) cielo[i] = 1; else if (tinta && luz !== 'dia') B[i] = L(B[i]); }
  const P = (luz === 'dia' ? (seco > 0 ? ['#6e9ec8', '#7eaad0', '#90b8d6', '#a4c4d8', '#b8ced6', '#ccd6d2', '#dedcca'] : ['#4a8cd0', '#5a9ad8', '#6ca8de', '#80b6e4', '#96c4ea', '#acd2ee', '#c4def0'])
    : luz === 'tarde' ? ['#3a3a78', '#544682', '#7a5288', '#a65e84', '#d0707a', '#ec8c6a', '#f6ae62', '#fac874'] : ['#080c22', '#0c1230', '#10183a', '#141e44', '#1a264e', '#223058', '#2a3a62']).map(hex);
  const n = P.length - 1;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!cielo[i]) continue;
    let l = Math.min(1, y / hor) * n + Math.sin(x * 0.021 + y * 0.07) * 0.35 + (h(x >> 3, y >> 1, 702) - 0.5) * 0.4;
    // velos altos de cirros, tenues y fuera de la barra del año y de la esquina de Atom
    if (luz !== 'noche' && y > 24 && y < hor - 12 && !(x > 272 && y < 48)) { const s = Math.sin(x * 0.045 - y * 0.42 + Math.sin(x * 0.012) * 3); if (s > 0.9 && h(x >> 2, y, 703) > 0.35) l += 1.2; }
    B[i] = d_rampa(P, l - 0.5, x, y);
    if (!(x > 272 && y < 48) && !(y < 22 && x > 14 && x < 176)) nub[i] = 1; }
  // el sol (de día, con su halo; en la calima, grande y blanquecino; a la tarde, sobre el horizonte) o la luna
  if (astro) { const [sx, sy, sr] = astro;
    for (let y = sy - sr * 3; y <= sy + sr * 3; y++) for (let x = sx - sr * 3; x <= sx + sr * 3; x++) { if (x < 0 || x > 319 || y < 0 || y > 179 || !cielo[y * 320 + x]) continue; const d = Math.hypot(x + 0.5 - sx, y + 0.5 - sy) / sr, i = y * 320 + x;
      if (luz === 'noche') { if (d < 1 && Math.hypot(x + 0.5 - sx - sr * 0.45, y + 0.5 - sy + sr * 0.2) / sr > 0.82) B[i] = d > 0.8 ? hex('#c8d0e0') : hex('#eef0e6'); else if (d < 2.2 && d_um(x, y) < (2.2 - d) * 0.18) B[i] = d_mez(B[i], hex('#3a4a72'), 0.6); continue; }
      const core = luz === 'tarde' ? [hex('#fff0b0'), hex('#ffd070'), hex('#ff9a50')] : [hex('#fffef4'), hex('#fff4c8'), hex(seco > 0 ? '#f4ecd0' : '#ffeaa0')];
      if (d < 0.75) B[i] = core[0]; else if (d < 1) B[i] = core[1]; else if (d < 3 && d_um(x, y) < (3 - d) * (seco > 0 ? 0.3 : 0.2)) B[i] = d_mez(B[i], core[2], 0.5); } }
  return { nub, cielo };
}

// un disco solo donde la máscara lo deja
function d_discoM(B, m, cx, cy, r, c) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, Math.ceil(cy + r)), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, Math.ceil(cx + r)), r2 = r * r;
  for (let y = y0; y <= y1; y++) { const dy = y + 0.5 - cy, f = y * 320; for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx; if (dx * dx + dy * dy <= r2 && m[f + x]) B[f + x] = c; } }
}

// cúmulo de tres tonos (y sus dos medios tonos tramados) con la base plana, solo en el cielo: cada píxel toma la luz
// de la bola que lo cubre más arriba (luz arriba a la izquierda, sombra abajo), con el filo claro en los lomos, la
// barriga en sombra y los grumos pequeños de encima
function d_nubeM(B, m, cx, cy, w, sem, c, ap = 1) {
  // las bolas grandes se asientan en la base plana (más altas en el centro: la cúpula) y cada una lleva encima un grumo
  const n = 3 + Math.round(w / 12), yb = Math.round(cy + w * 0.08 * ap), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.1 + 0.2 * Math.cos(u * Math.PI) ** 2 + 0.07 * h(i, sem, 611)) * ap; bolas.push([cx + u * w * 0.8 + (h(i, sem, 612) - 0.5) * w * 0.06, yb - r * 0.72, r]); }
  for (let i = 0; i < n; i++) { const [bx, by, r] = bolas[i], a = -Math.PI / 2 + (h(i, sem, 613) - 0.5) * 1.8, r2 = r * (0.36 + 0.22 * h(i, sem, 614)); bolas.push([bx + Math.cos(a) * r * 0.72, by + Math.sin(a) * r * 0.72, r2]); }
  const RP = [c[0], d_mez(c[0], c[1], 0.5), c[1], d_mez(c[1], c[2], 0.5), c[2]];
  let ya = yb; for (const [, by, r] of bolas) ya = Math.min(ya, by - r);
  // si la cúpula subiría por encima de y 23 (donde el cielo se corta por la barra del año), la nube entera baja
  const baja = ya < 23 ? Math.ceil(23 - ya) : 0; if (baja) { for (const b of bolas) b[1] += baja; ya += baja; }
  const yb2 = yb + baja, x0 = Math.max(0, Math.floor(cx - w * 0.62)), x1 = Math.min(319, Math.ceil(cx + w * 0.62)), y0 = Math.max(0, Math.floor(ya) - 1), y1 = Math.min(179, yb2 + 1);
  for (let y = y0; y <= y1; y++) { const f = y * 320; for (let x = x0; x <= x1; x++) { if (!m[f + x]) continue;
    let v = -9; for (const [bx, by, r] of bolas) { const d = Math.hypot((x + 0.5 - bx) / 1.12, y + 0.5 - by) / r; if (d < 1) { const s = (by - y) / r * 0.55 + 0.4 + (bx - x) / r * 0.15 - d * 0.18 + (d > 0.86 && y < by - r * 0.3 ? 0.35 : 0); if (s > v) v = s; } }
    if (v === -9) continue;
    if (y > yb2) continue; if (y >= yb2 - 1) v = Math.min(v, 0.05);
    B[f + x] = d_rampa(RP, Math.max(0, Math.min(1, v)) * 4.8 - 0.9, x, y); } }
}
// las nubes que pasan en tres alturas a tres velocidades (lejos, pequeñas y lentas; cerca, grandes y más deprisa)
function d_nubes(R, t, m, hor, luz, seco) {
  const C3 = (luz === 'dia' ? (seco > 0 ? ['#aaa69a', '#dcd6c6', '#fcf8ea'] : ['#8ea6c4', '#ccdcec', '#ffffff']) : luz === 'tarde' ? ['#7a4a72', '#d07a76', '#ffc890'] : ['#141a34', '#222c4c', '#3a4870']).map(hex);
  const N = seco > 0.5 ? 0.6 : 1;
  for (let k = 0; k < 4 * N; k++) d_nubeM(R.buf, m, ((h(k, 1, 704) * 520 + t * 0.9) % 560) - 100, hor - 8 - (k % 2) * 5, 14 + h(k, 2, 704) * 10, k, C3, 0.55);
  for (let k = 0; k < 3 * N; k++) d_nubeM(R.buf, m, ((h(k, 3, 704) * 520 + t * 2) % 580) - 110, hor * 0.62 + (k % 2) * 4, 24 + h(k, 4, 704) * 12, k + 9, C3, 0.8);
  for (let k = 0; k < 2; k++) d_nubeM(R.buf, m, ((h(k, 5, 704) * 520 + t * 3.6) % 620) - 130, Math.max(30, hor * 0.36) + k * 6, 40 + k * 12, k + 17, C3);
}
// pájaros que cruzan aleteando (fuera de la esquina de Atom y de la barra del año): [semilla, y, velocidad, sentido]
function d_aves(R, t, lista, c = hex('#2a2a34')) {
  for (const [k, y0, v, s] of lista) { const x = Math.round(s > 0 ? ((t * v + h(k, 1, 705) * 360) % 380) - 30 : 350 - ((t * v + h(k, 1, 705) * 360) % 380)), y = Math.round(y0 + Math.sin(t * 0.7 + k) * 3), a = Math.floor(t * 6 + k) % 2;
    for (const [dx, dy] of a ? [[-2, -1], [-1, 0], [0, 0], [1, 0], [2, -1]] : [[-2, 1], [-1, 0], [0, 0], [1, 0], [2, 1]]) { const xx = x + dx, yy = y + dy; if ((xx > 272 && yy < 48) || (yy < 22 && xx > 14 && xx < 176)) continue; R.pset(xx, yy, c); } }
}

// casa alargada de esteras sobre arcos de varas (las acuarelas de White), de costado: la bóveda con las esquinas
// redondeadas, corteza en hiladas arriba y esteras tejidas abajo, la luz por la izquierda y la sombra en el suelo;
// o.abiertos: tramos [a, b] (fracción del ancho) con la estera lateral enrollada (dentro, en sombra, las varas, la
// tarima y algún cacharro); o.humo: el agujero del humo en lo alto; o.sem: la semilla de la textura
function d_casaLarga(R, x0, x1, yb, alto, o = {}) {
  const { pset } = R, w = x1 - x0, rr = Math.min(alto * 0.8, w * 0.32), yT = yb - alto, sem = o.sem ?? 0;
  const top = (x) => { const d = Math.min(x - x0, x1 - x); if (d >= rr) return yT; const u = rr - d - 0.5; return yT + rr - Math.sqrt(Math.max(0, rr * rr - u * u)); };
  const yR = yb - Math.round(alto * 0.52), yA = yb - Math.round(alto * 0.4);
  const OL = hex('#3a2818'), CO = ['#4e3e28', '#6a5638', '#8e7650', '#b09670', '#c8b08a'].map(hex), ES = ['#64502e', '#8a7048', '#b89a6a', '#d4ba84', '#e4cc98'].map(hex);
  const INT = hex('#2a1c12'), VARA = hex('#5a4230'), TAR = hex('#4a3420');
  for (let x = x0 - 1; x <= x1 + 3; x++) for (let j = 1; j <= 2; j++) pset(x, yb + j, d_mez(R.pget(x, yb + j), hex('#3a2a14'), j === 1 ? 0.5 : 0.25));
  for (let x = x0; x <= x1; x++) {
    const ty = Math.round(top(x)), fx = (x - x0) / w, lado = x < x0 + rr ? (x0 + rr - x) / rr : x > x1 - rr ? -(x - (x1 - rr)) / rr : 0;
    const ab = (o.abiertos ?? []).find(([a, b]) => fx >= a && fx <= b);
    for (let y = ty; y <= yb; y++) { let c;
      if (y === ty || x === x0 || x === x1) c = OL;
      else if (ab && y > yA + 1) { const xi = x - x0; c = (xi % 9 === 4 && y < yb - 3) ? VARA : y === yb - 3 || y === yb - 4 ? TAR : y >= yb - 2 ? (h(x, y, 706) < 0.3 ? TAR : INT) : INT;
        if (y === yA + 2) c = hex('#1c120c');
        const mid = Math.round(x0 + (ab[0] + ab[1]) / 2 * w); if (alto > 16 && Math.abs(x - mid) <= 1 && y >= yb - 7 && y <= yb - 5) c = y === yb - 7 ? hex('#8a5a3a') : hex('#6a3e26');   // una olla en la tarima
        if (alto > 16 && Math.abs(x - mid + 5) <= 1 && y >= yA + 3 && y <= yA + 5) c = hex('#7a6038'); }   // una cesta colgada
      else if (ab && y >= yA - 1) { c = y === yA - 1 ? ES[3] : y === yA ? ((x + sem) % 4 === 0 ? ES[1] : ES[2]) : ES[0]; }
      else if (y < yR) { const v = (y - ty) / Math.max(1, yR - ty), hil = Math.floor((y - yT) / 3), jx = (x + hil * 7 + sem * 5) % 13;
        let l = 3.1 - v * 2 + lado * 0.9 + (h(x >> 1, hil, 40 + sem) - 0.5) * 0.7; if ((y - yT) % 3 === 2) l -= 1; if (jx === 0) l -= 1.3;
        c = d_rampa(CO, l - 0.5, x, y); }
      else { const v = (y - yR) / Math.max(1, yb - yR); let l = 2.9 - v * 1.1 + lado * 0.8 + ((((x >> 1) + (y >> 1)) & 1) ? 0.5 : -0.2);
        if (y === yR) l -= 1.6; else if (y === yR + 1) l -= 0.7; if ((x - x0 + sem) % 11 === 0) l -= 1; if (y === yb) l -= 1.2;
        c = d_rampa(ES, l - 0.5, x, y); }
      pset(x, y, c); }
  }
  // las varas de los arcos que asoman en los extremos y el remate de la cumbrera
  for (let x = x0 + 2; x <= x1 - 2; x++) { if (Math.min(x - x0, x1 - x) < rr - 1) pset(x, Math.round(top(x)) + 2, CO[1]); }
  if (o.humo) { const cx = Math.round((x0 + x1) / 2); for (let i = -1; i <= 1; i++) { pset(cx + i, yT, hex('#1c120c')); pset(cx + i, yT + 1, OL); } }
}

// casa de tablas (Hatteras, hacia 1701): paredes de tablas horizontales con su veta, tejado a dos aguas de corteza,
// una puerta y un ventanuco con postigo
function d_casaTablas(R, x0, x1, yb, alto) {
  const { pset } = R, yT = yb - Math.round(alto * 0.55), cx = (x0 + x1) / 2, TB = ['#5a3e26', '#7a5636', '#9a744c', '#b8925e'].map(hex), TJ = ['#4e3e28', '#6a5638', '#8e7650', '#b09670'].map(hex), OL = hex('#2e1e12');
  for (let x = x0 - 1; x <= x1 + 3; x++) pset(x, yb + 1, d_mez(R.pget(x, yb + 1), hex('#3a2a14'), 0.5));
  for (let y = yT; y <= yb; y++) for (let x = x0; x <= x1; x++) { let c; if (x === x0 || x === x1 || y === yb) c = OL; else { const tab = Math.floor((y - yT) / 3); let l = 2.2 - (x - x0) / (x1 - x0) * 0.8 + (h(x >> 2, tab, 707) - 0.5) * 0.8; if ((y - yT) % 3 === 2) l -= 1.4; if ((x + tab * 11) % 17 === 0) l -= 1; c = d_rampa(TB, l - 0.5, x, y); } pset(x, y, c); }
  const yC = yb - alto; for (let y = yC; y < yT; y++) { const u = (y - yC) / (yT - yC), hw = (x1 - x0) / 2 * u + 3 * u; for (let x = Math.round(cx - hw); x <= Math.round(cx + hw); x++) { let l = 2.6 - (x > cx ? 1 : 0) - u * 0.6 + (h(x, y >> 1, 708) - 0.5) * 0.8; if ((y - yC) % 3 === 0) l -= 0.8; pset(x, y, Math.abs(x - (cx - hw)) < 1 || Math.abs(x - (cx + hw)) < 1 ? OL : d_rampa(TJ, l - 0.5, x, y)); } }
  for (let x = x0 - 3; x <= x1 + 3; x++) pset(x, yT, OL);
  const px = Math.round(x0 + (x1 - x0) * 0.62); for (let y = yb - 9; y < yb; y++) for (let x = px; x < px + 5; x++) pset(x, y, x === px || x === px + 4 || y === yb - 9 ? OL : hex('#3a2616'));
  pset(px + 3, yb - 5, hex('#c8a040'));
  const vx = Math.round(x0 + (x1 - x0) * 0.2); for (let y = yb - 9; y < yb - 5; y++) for (let x = vx; x < vx + 5; x++) pset(x, y, x === vx || x === vx + 4 || y === yb - 9 || y === yb - 6 ? OL : hex('#1c140e'));
  for (let y = yb - 9; y < yb - 5; y++) pset(vx - 1, y, TB[1]);
}

// gente pequeña de fondo (11 px; niños 7): piel cobriza, pelo negro, manto o delantal de piel de ciervo y un collar de
// cuentas claras. o.pose: 'pie' | 'anda' | 'carga' (un haz de leña a la espalda) | 'muele' (las manos arriba, en la mano
// de mortero) | 'agita' (los brazos arriba) | 'sentado' | 'raspa' | 'escarda'; o.k: la variante; o.mujer; o.nino;
// devuelve la mano [x, y]
function d_gente(R, L, x, yb, t, o = {}) {
  const { pset } = R, d = o.dir ?? 1, k = o.k ?? 0, nino = !!o.nino, mujer = o.mujer ?? (k % 2 === 1);
  const P = L(hex(['#b06a42', '#a0603a', '#b87448'][k % 3])), PS = L(hex('#7e4628')), PE = L(hex('#1a1210')), CU = L(hex(['#c49a64', '#b08856', '#d0a872'][k % 3])), CUS = L(hex('#8a6238')), CT = L(hex('#ece2c8'));
  const sent = o.pose === 'sentado', paso = o.pose === 'anda' || o.pose === 'carga' ? Math.floor(t * 6 + k) % 2 : 0;
  x = Math.round(x); yb = Math.round(yb); const y0 = sent ? yb + 3 : yb;
  if (nino) {
    const yH = y0 - 6; pset(x, yH, PE); pset(x + d, yH, PE); pset(x - d, yH + 1, PE); pset(x, yH + 1, P); pset(x + d, yH + 1, P);
    for (let j = 2; j <= 3; j++) { pset(x, yH + j, P); pset(x + d, yH + j, j === 3 ? CU : P); pset(x - d, yH + j, PS); }
    if (!sent) { pset(x - (paso ? 0 : 1), y0 - 1, P); pset(x + (paso ? 0 : 1) + (d > 0 ? 0 : 0), y0 - 1, P); pset(x - (paso ? 1 : 1), y0, PS); pset(x + 1, y0, PS); }
    const a = o.pose === 'anda' ? (paso ? -1 : 1) : 0; pset(x + d * 2, yH + 2 + a, P); pset(x - d * 2, yH + 2 - a, PS);
    return [x + d * 2, yH + 2];
  }
  const yH = y0 - 10;
  // la cabeza y el pelo (las mujeres, con flequillo y melena)
  pset(x - 1, yH, PE); pset(x, yH, PE); pset(x + 1, yH, PE);
  pset(x - d, yH + 1, PE); pset(x, yH + 1, P); pset(x + d, yH + 1, P);
  pset(x - d, yH + 2, mujer ? PE : PS); pset(x, yH + 2, P); pset(x + d, yH + 2, P);
  if (mujer) { pset(x - d, yH + 3, PE); pset(x - d * 2, yH + 2, PE); }
  // el torso, el collar y el manto sobre el hombro de atrás
  for (let j = 3; j <= 6; j++) { pset(x - 1, yH + j, j > 3 && !mujer ? CU : PS); pset(x, yH + j, P); pset(x + 1, yH + j, P); }
  pset(x, yH + 3, CT); pset(x + d, yH + 3, CT);
  if (!mujer) { pset(x - d, yH + 3, CU); pset(x - d, yH + 4, CUS); }
  // el delantal de piel con flecos
  const fin = mujer ? 9 : 8;
  for (let j = 7; j <= fin; j++) for (let i = -1; i <= 1; i++) pset(x + i, yH + j, j === fin && (i + j) % 2 ? CUS : CU);
  if (mujer) pset(x + d * 2, yH + 8, CUS);
  // las piernas
  if (sent) { pset(x + d, y0 - 1, P); pset(x + d * 2, y0 - 1, P); pset(x + d * 3, y0 - 1, PS); pset(x + d * 3, y0, PS); }
  else { const a = paso ? 0 : 1; pset(x - a, yH + 9 + (mujer ? 1 : 0), PS); pset(x + a, yH + 9 + (mujer ? 1 : 0), PS); if (!mujer) { pset(x - a, yH + 10, PS); pset(x + a, yH + 10, PS); } else { pset(x - a, yH + 10, PS); pset(x + a, yH + 10, PS); } }
  // los brazos según la pose
  const sh = [x + d, yH + 4]; let mano;
  if (o.pose === 'muele') { const u = (Math.sin(t * 4.2 + k) + 1) / 2; mano = [x + d * 2, Math.round(yH + 1 - u * 3)]; R.linea(sh[0] + d, sh[1], mano[0], mano[1], P); R.linea(x - d, yH + 4, mano[0] - d, mano[1] + 1, PS); }
  else if (o.pose === 'agita') { const u = Math.sin(t * 9); pset(x + 2, yH + 3, P); pset(x + 2 + (u > 0 ? 1 : 0), yH + 2, P); pset(x + 2 + (u > 0 ? 1 : 0), yH + 1, P); pset(x - 2, yH + 3, P); pset(x - 2 - (u > 0 ? 0 : 1), yH + 2, P); pset(x - 2 - (u > 0 ? 0 : 1), yH + 1, P); mano = [x + 2, yH + 1]; }
  else if (o.pose === 'carga') { for (let j = 0; j < 4; j++) for (let i = 0; i < 2; i++) pset(x - d * (2 + i), yH + 2 + j, (i + j) % 2 ? L(hex('#6a4a2a')) : L(hex('#8a6a42'))); R.linea(x - d * 4, yH + 1, x - d * 1, yH + 7, L(hex('#5a3e22'))); pset(x + d * 2, yH + 5, P); pset(x + d * 2, yH + 4, P); mano = [x + d * 2, yH + 4]; }
  else if (o.pose === 'raspa' || o.pose === 'escarda') { const u = Math.round(Math.sin(t * (o.pose === 'raspa' ? 7 : 3) + k) * 1.5); mano = [x + d * 3, yH + 7 + u]; R.linea(sh[0] + d, sh[1], mano[0], mano[1], P);
    if (o.pose === 'escarda') { R.linea(mano[0] - d * 2, mano[1] - 4, mano[0] + d * 2, mano[1] + 3, L(hex('#6a4a2a'))); pset(mano[0] + d * 2, mano[1] + 3, L(hex('#e8e0d0'))); } }
  else if (o.pose === 'anda') { const a = paso ? 1 : -1; pset(x + d * 2, yH + 4, P); pset(x + d * 2 + a, yH + 5, P); mano = [x + d * 2 + a, yH + 5]; }
  else { pset(x + d * 2, yH + 4, P); pset(x + d * 2, yH + 5, P); mano = [x + d * 2, yH + 6]; }
  return mano;
}

// el fuego: llamas en lenguas que bailan (núcleo blanco y amarillo, naranja y rojo arriba), leños con brasas y las
// chispas que suben. s: la escala; devuelve la altura de las llamas
function d_llamas(R, cx, by, t, s = 1, chispas = 8) {
  const { pset } = R, W = Math.round(5 * s), H = 13 * s;
  const CL = ['#fff8d8', '#ffe070', '#ffb03a', '#f07a28', '#c8402a', '#7a2a22'].map(hex);
  // los leños cruzados con las brasas en las puntas
  for (let i = -W - 2; i <= W + 2; i++) { const y1 = by - Math.round(Math.abs(i) * 0.25), y2 = by - 1 - Math.round((W + 2 - Math.abs(i)) * 0.18);
    pset(cx + i, y1, hex('#4a2e1a')); if (Math.abs(i) < W) pset(cx + i, y2, hex('#5e3a20')); }
  for (const e of [-W - 2, W + 2]) pset(cx + e, by - 1, Math.sin(t * 7 + e) > 0 ? hex('#ff8a3a') : hex('#c8402a'));
  for (let i = -W; i <= W; i++) { const q = Math.abs(i) / (W + 0.5), hc = H * (1 - q * q) * (0.72 + 0.28 * Math.sin(t * 9 + i * 1.7) + (h(i, Math.floor(t * 12), 709) - 0.5) * 0.3);
    for (let j = 0; j <= hc; j++) { const v = j / Math.max(1, hc), core = q < 0.45; let idx = core ? (v < 0.25 ? 0 : v < 0.5 ? 1 : v < 0.8 ? 2 : 3) : (v < 0.35 ? 1 : v < 0.65 ? 2 : v < 0.88 ? 3 : 4);
      if (j === Math.floor(hc)) idx = Math.min(5, idx + 1); const xx = cx + i + Math.round(Math.sin(t * 6 + j * 0.5) * v * 1.4); pset(xx, by - 2 - j, CL[idx]); } }
  // lenguas sueltas que se escapan por arriba
  for (let k = 0; k < 2; k++) { const u = (t * 2.2 + k * 0.5) % 1, x = cx + Math.round((h(k, Math.floor(t * 2.2 + k * 0.5), 710) - 0.5) * W * 1.4), y = by - 2 - Math.round(H * (0.9 + u * 0.5)); if (u < 0.6) { pset(x, y, CL[3]); pset(x, y - 1, CL[4]); } }
  for (let k = 0; k < chispas; k++) { const age = (t * 0.7 + h(k, 2, 711)) % 1, x = Math.round(cx + (h(k, 3, 711) - 0.5) * W * 2 + Math.sin(age * 8 + k) * 2 + age * 6 * s), y = Math.round(by - H * 0.6 - age * 46 * s);
    if (y < 22 || (x > 272 && y < 48)) continue; pset(x, y, age < 0.35 ? CL[1] : age < 0.7 ? CL[3] : CL[5]); }
  return H;
}

// el humo: bocanadas que suben, crecen y se van con el viento, mezcladas con lo de detrás (fuera de la barra del año y de
// la esquina de Atom)
function d_humo(R, x, y, t, o = {}) {
  const n = o.n ?? 7, alto = o.alto ?? 70, vi = o.viento ?? 0.6, col = o.col ?? hex('#c8c4bc'), r0 = o.r ?? 1.5, B = R.buf;
  for (let k = 0; k < n; k++) { const age = (t * (o.v ?? 0.18) + k / n) % 1, px = x + age * alto * vi + Math.sin(age * 5 + k * 1.3) * 3, py = y - age * alto, r = r0 + age * (o.crece ?? 6), a = (1 - age) * (o.fuerza ?? 0.75);
    for (let yy = Math.floor(py - r); yy <= py + r; yy++) for (let xx = Math.floor(px - r); xx <= px + r; xx++) { if (xx < 0 || xx > 319 || yy < 22 || yy > 179 || (xx > 272 && yy < 48)) continue;
      const dd = Math.hypot(xx + 0.5 - px, yy + 0.5 - py) / r; if (dd > 1 || d_um(xx, yy) > a * (1.2 - dd)) continue; const i = yy * 320 + xx; B[i] = d_mez(B[i], dd < 0.5 && yy < py ? col : d_mez(col, hex('#8a8680'), 0.3), 0.55); } }
}

// el parpadeo de la luz del fuego (0,8–1,05)
const d_parpadeo = (t) => 0.92 + Math.sin(t * 11) * 0.05 + Math.sin(t * 17.3 + 1) * 0.04 + (h(Math.floor(t * 14), 0, 712) - 0.5) * 0.06;

// una caña de maíz que se mece: la caña, las hojas en pares, la mazorca y el penacho; seco: amarilla, baja y rizada
function d_maiz(R, L, x, yb, alto, t, seco, k) {
  const { pset, linea } = R, sw = Math.sin(t * 1.7 + x * 0.13 + yb * 0.2) * (0.6 + 0.4 * Math.sin(t * 0.6 + k)) * alto / 14;
  const V = seco > 0 ? [d_mez(hex('#5a8a3a'), hex('#b89a48'), seco), d_mez(hex('#8ab84a'), hex('#e0c870'), seco), d_mez(hex('#3e6a2a'), hex('#8a6a30'), seco)] : [hex('#5a8a3a'), hex('#8ab84a'), hex('#3e6a2a')];
  const at = (j) => [x + Math.round(sw * (j / alto) ** 2), yb - j];
  for (let j = 0; j <= alto; j++) { const [xx, yy] = at(j); pset(xx, yy, L(j % 5 === 0 ? V[2] : V[0])); if (alto > 20 && j < alto * 0.6) pset(xx + 1, yy, L(V[2])); }
  // las hojas: arcos que salen hacia arriba y caen, cada una con su lado, su largo y su vaivén
  const nh = alto > 18 ? 5 : 3;
  for (let f = 0; f < nh; f++) { const j = Math.round(alto * (0.2 + f * 0.6 / nh + h(f, k, 776) * 0.08)), [xx, yy] = at(j), s = h(f, x + k, 777) < 0.5 ? 1 : -1, lar = Math.max(2, Math.round(alto * (0.26 + h(f, x, 778) * 0.16) * (1 - seco * 0.3))), sw2 = Math.sin(t * 2.3 + f + x * 0.3) * 0.12;
    for (let i = 1; i <= lar; i++) { const u = i / lar, dy = Math.round(-Math.sin(u * 2.4) * lar * (seco > 0 ? 0.12 : 0.35) + u * u * lar * (seco > 0 ? 0.7 : 0.3) + sw2 * i); pset(xx + s * i, yy + dy, L(u > 0.7 ? V[2] : (f + i) % 3 === 0 ? V[1] : V[0])); if (i < lar * 0.5 && alto > 18) pset(xx + s * i, yy + dy + 1, L(V[2])); } }
  if (alto > 12) { const [xx, yy] = at(Math.round(alto * 0.45)), s = k % 2 ? -1 : 1; pset(xx + s, yy, L(hex(seco > 0.5 ? '#c8a050' : '#e8c840'))); pset(xx + s, yy + 1, L(hex('#c89a30'))); pset(xx + s, yy - 1, L(V[1])); }
  const [tx, ty] = at(alto); pset(tx, ty - 1, L(hex('#e8d090'))); pset(tx - 1, ty, L(hex('#c8a860'))); pset(tx + 1, ty, L(hex('#c8a860')));
}

// un girasol que se mece (la caña con dos hojas grandes y la flor con sus pétalos); seco: mustio, la flor colgando
function d_girasol(R, L, x, yb, alto, t, seco, k) {
  const { pset, linea, disco } = R, sw = Math.sin(t * 1.3 + k * 2 + x * 0.1) * alto / 22, cx = x + Math.round(sw), cy = yb - alto, cae = seco * 5;
  for (let j = 0; j <= alto; j++) { const xx = x + Math.round(sw * (j / alto) ** 2); pset(xx, yb - j, L(hex(seco > 0.5 ? '#8a7a3a' : '#4e7a2e'))); pset(xx + 1, yb - j, L(hex(seco > 0.5 ? '#6a5a2a' : '#3a5e22'))); }
  for (let f = 0; f < 2; f++) { const j = Math.round(alto * (0.35 + f * 0.25)), xx = x + Math.round(sw * (j / alto) ** 2), s = f ? -1 : 1;
    for (let i = 1; i <= 6; i++) { const yy = yb - j - Math.round(Math.sin(i / 6 * Math.PI) * 2) + Math.round(i * seco * 0.6); pset(xx + s * i, yy, L(hex(seco > 0.5 ? '#a89040' : '#6a9a3a'))); pset(xx + s * i, yy + 1, L(hex(seco > 0.5 ? '#7a6a2a' : '#4a7a2a'))); } }
  const fx = cx + Math.round(cae * 0.6), fy = cy + Math.round(cae);
  disco(fx + 0.5, fy + 0.5, 4.2, L(hex(seco > 0.5 ? '#c89a3a' : '#f0c020'))); disco(fx - 0.5, fy - 0.5, 3, L(hex(seco > 0.5 ? '#d8b050' : '#f8d838')));
  for (let a = 0; a < 8; a++) pset(fx + Math.round(Math.cos(a * 0.785) * 5), fy + Math.round(Math.sin(a * 0.785) * 5), L(hex(seco > 0.5 ? '#a87a2a' : '#e8a818')));
  disco(fx + 0.5, fy + 0.5, 2, L(hex('#5a3a1a'))); pset(fx, fy, L(hex('#7a5a2a')));
}

// matas de hierba (o barrón de duna) que se mecen: [x, y de la base, alto]
function d_matas(R, L, t, lista, seco, duna = false) {
  for (const [x, yb, a] of lista) for (let i = 0; i < 6; i++) { const bx = x + i * 1.5 - 4, sw = Math.sin(t * 2 + bx * 0.4 + i) * a * 0.18, al = a * (0.6 + h(i, x, 713) * 0.5), c = L(hex(duna ? (i % 2 ? '#b8a868' : '#8a8a4a') : seco > 0.5 ? (i % 2 ? '#c8b070' : '#a08848') : (i % 2 ? '#6a9a3a' : '#4a7a2a')));
    R.linea(Math.round(bx), yb, Math.round(bx + sw + (i - 2.5) * 0.8), Math.round(yb - al), c); if (duna && i % 2 === 0) { R.pset(Math.round(bx + sw + (i - 2.5) * 0.8), Math.round(yb - al) - 1, L(hex('#d8c890'))); } }
}

// juncos de la orilla que se mecen: [x, y de la base, alto, número]
function d_juncos(R, L, t, lista, seco) {
  for (const [x, yb, a, n] of lista) for (let i = 0; i < n; i++) { const bx = x + (i - n / 2) * 1.6, al = a * (0.65 + h(i, x, 714) * 0.4), sw = Math.sin(t * 1.6 + i * 0.7 + x * 0.1) * al * 0.12;
    R.linea(Math.round(bx), yb, Math.round(bx + sw + (i - n / 2) * 0.6), Math.round(yb - al), L(hex(i % 3 === 0 ? '#8aa04a' : i % 3 === 1 ? '#6a8a3a' : '#a8a860')));
    if (i % 3 === 1) { const tx = Math.round(bx + sw + (i - n / 2) * 0.6), ty = Math.round(yb - al); R.pset(tx, ty, L(hex('#6a4a2a'))); R.pset(tx, ty + 1, L(hex('#6a4a2a'))); R.pset(tx, ty + 2, L(hex('#4a3420'))); } }
}

const d_camL = (y) => 160 - (y - 68) * 0.35, d_camR = (y) => 165 + (y - 68) * 0.4;

function d_secotanFijo(R, luz, seco) {
  const { pset, rect, disco, linea } = R, B = R.buf;
  rect(0, 0, 319, 179, d_CIELO);
  const G = seco > 0 ? ['#6e6a36', '#8a8040', '#a89a50', '#c4b468', '#d8c888'].map((c, i) => d_mez(hex(['#3e6a2a', '#4e7a2e', '#6a9a3a', '#86b048', '#a0c460'][i]), hex(c), seco)) : ['#3e6a2a', '#4e7a2e', '#6a9a3a', '#86b048', '#a0c460'].map(hex);
  const T0 = ['#6a5034', '#8e7050', '#b09068', '#c8a87e', '#dcc098'].map(hex);
  // el suelo: la hierba (con matas y trama), el camino de tierra apisonada con sus rodadas y huellas, la plaza del fuego
  // y la tierra de las puertas; a la derecha, los surcos de los campos en perspectiva; con la sequía, grietas
  for (let y = 70; y < 180; y++) for (let x = 0; x < 320; x++) {
    const pl = d_camL(y), pr = d_camR(y), plaza = ((x - 148) / 70) ** 2 + ((y - 150) / 18) ** 2 < 1, puerta = ((x - 50) / 60) ** 2 + ((y - 130) / 8) ** 2 < 1 || ((x - 70) / 44) ** 2 + ((y - 104) / 5) ** 2 < 1 || ((x - 196) / 28) ** 2 + ((y - 96) / 4) ** 2 < 1;
    const campo = x > pr + 8 + (y - 70) * 0.25 && y < 146, esc = (y - 64) / 116;
    let c;
    if ((x >= pl && x <= pr) || plaza || puerta) {
      let l = 2.4 + (h(x >> 1, y, 715) - 0.5) * 0.9 - (x < pl + 1.5 || x > pr - 1.5 ? (plaza ? 0 : 1) : 0);
      const rod = Math.abs(x - (pl + (pr - pl) * 0.3)) < 1 + esc || Math.abs(x - (pl + (pr - pl) * 0.7)) < 1 + esc; if (rod && !plaza) l -= 0.7;
      if (h(x, y, 716) < 0.04) l += 1.4; if (h(x >> 1, y >> 1, 717) < 0.025) l -= 1.6;   // guijarros y huellas
      c = d_rampa(T0, l - 0.5, x, y);
    } else if (campo) {
      const u = (x - 166) / Math.max(1, y - 62), fila = Math.floor(u * (y < 90 ? 9 : 6)), surco = ((u * (y < 90 ? 9 : 6)) % 1 + 1) % 1 < 0.42;
      c = d_rampa(T0, (surco ? 0.9 : 1.9) + (h(x, y, 718) - 0.5) * 0.8 - (y > 104 ? 0.7 : 0) - 0.5, x, y);
      if (!surco && y < 90 && y > 72 && h(fila, x >> 1, 719) < 0.5 && (x + y) % 3 === 0) c = seco > 0.5 ? hex('#a89040') : G[3];   // el maíz recién nacido
    } else {
      const mata = h(x >> 1, y >> 1, 720); let l = 2.2 + (mata - 0.5) * 1.3 + Math.sin(x * 0.08 + y * 0.3) * 0.3 - (y < 80 ? 0.5 : 0);
      if (h(x, y, 721) < 0.06) l += 1.3; if (h(x, y + 1, 722) < 0.05) l -= 1.2;
      c = d_rampa(G, l - 0.5, x, y);
      if (y > 120 && h(x, y, 723) < 0.012) c = hex(['#f0e0a0', '#e8a0a8', '#f8f4ea'][Math.floor(h(x, y, 724) * 3)]);   // florecillas
    }
    if (seco > 0 && !campo) { const v = Math.sin(x * 0.31 + Math.sin(y * 0.47) * 2.2) * Math.sin(y * 0.83 + Math.sin(x * 0.19) * 2.4); if (Math.abs(v) < 0.05 * seco && y > 100 && h(x, y, 725) < 0.85) c = hex('#5a4228'); }
    B[y * 320 + x] = c;
  }
  // el bosque del fondo: una franja lejana azulada y, delante, pinos y robles con su luz por la izquierda
  for (let x = 0; x < 320; x++) { const top = Math.round(54 + Math.sin(x * 0.045 + 1) * 3 + Math.sin(x * 0.13) * 1.6 + (h(x >> 2, 0, 726) - 0.5) * 3);
    for (let y = top; y < 74; y++) pset(x, y, d_rampa(['#5a7a70', '#6a8a7c', '#7c9a88', '#90aa96'].map(hex), 2.4 - (y - top) * 0.12 + (h(x >> 1, y >> 1, 727) - 0.5) * 0.8 - (y === top ? -0.6 : 0) - 0.5, x, y)); }
  for (let k = 0; k < 46; k++) { const x = Math.round(k * 7.2 + h(k, 1, 728) * 5) - 4, pino = h(k, 2, 728) < 0.5, hh = 11 + Math.round(h(k, 3, 728) * 8), yb = 75 + Math.round(h(k, 4, 728) * 2);
    if (pino) { for (let j = 0; j <= hh; j++) { const w = Math.round((j / hh) * 4 + ((hh - j) % 4 < 2 ? 1 : 0)) * (j > 2 ? 1 : 0.5); for (let i = -w; i <= w; i++) pset(x + i, yb - hh + j, hex(i < 0 ? (j % 4 === 1 ? '#4a7a52' : '#3a6444') : i === 0 ? '#2e5438' : '#244430')); } pset(x, yb - hh - 1, hex('#3a6444')); for (let j = 0; j < 3; j++) pset(x, yb - j, hex('#4a3424')); }
    else { for (const [dx, dy, r] of [[0, -hh + 5, 5], [-4, -hh + 8, 4], [4, -hh + 8, 4]]) disco(x + dx, yb + dy, r, hex('#2e5236')); for (const [dx, dy, r] of [[-1, -hh + 4, 3.5], [-4, -hh + 7, 2.5]]) disco(x + dx, yb + dy, r, hex('#46704a')); for (let j = 0; j < 30; j++) { const xx = x + Math.round((h(j, k, 729) - 0.5) * 12), yy = yb - hh + 2 + Math.round(h(j, k, 730) * 8); if (R.pget(xx, yy) === hex('#46704a')) pset(xx, yy, hex('#5e8a5a')); } linea(x, yb, x, yb - 4, hex('#4a3424')); } }
  // el maíz verde (medio) en hileras, a la derecha del camino
  for (let y = 88; y <= 104; y += 3) { const esc = (y - 64) / 116, sp = Math.max(3, Math.round(3 + esc * 4)); for (let x = Math.round(d_camR(y) + 12 + (y - 70) * 0.25); x < 322; x += sp) { const a = Math.round(5 + esc * 8 * (1 - seco * 0.4)), xx = x + (y % 2);
    for (let j = 0; j <= a; j++) pset(xx, y - j, j % 3 === 0 ? G[1] : G[2]); pset(xx - 1, y - Math.round(a * 0.5), G[3]); pset(xx + 1, y - Math.round(a * 0.7), G[3]); pset(xx - 2, y - Math.round(a * 0.5) + 1, G[2]); pset(xx + 2, y - Math.round(a * 0.7) + 1, G[2]); } }
  // las casas, de atrás adelante (con la tierra de las puertas delante)
  d_casaLarga(R, 0, 38, 82, 11, { sem: 1 }); d_casaLarga(R, 96, 142, 84, 12, { sem: 2, humo: true }); d_casaLarga(R, 174, 206, 79, 9, { sem: 3 });
  d_casaLarga(R, 30, 104, 102, 22, { sem: 4, abiertos: [[0.2, 0.42], [0.62, 0.8]], humo: true });
  d_casaLarga(R, 176, 216, 95, 16, { sem: 5, abiertos: [[0.25, 0.6]] });
  d_casaLarga(R, 4, 96, 128, 34, { sem: 6, abiertos: [[0.12, 0.34], [0.52, 0.78]], humo: true });
  // el secadero de pescado (un bastidor de varas con los peces colgados) y el mortero de tronco
  { const x0 = 122, yb = 101; for (const px of [x0, x0 + 14]) linea(px, yb, px, yb - 10, hex('#5a4028')); linea(x0 - 1, yb - 10, x0 + 15, yb - 10, hex('#6a4a2e')); linea(x0, yb - 6, x0 + 14, yb - 6, hex('#6a4a2e'));
    for (let i = 2; i < 14; i += 3) for (const yy of [yb - 9, yb - 5]) { pset(x0 + i, yy, hex('#a8b0b8')); pset(x0 + i, yy + 1, hex('#8a8e94')); pset(x0 + i, yy + 2, hex('#6a6e74')); } }
  { const mx = 116, yb = 104; for (let y = yb - 5; y <= yb; y++) for (let x = mx - 2; x <= mx + 2; x++) pset(x, y, x === mx - 2 ? hex('#8a6440') : x === mx + 2 ? hex('#4a3020') : y === yb - 5 ? hex('#2a1a10') : hex('#6a4a2e')); pset(mx - 1, yb - 5, hex('#c8b060')); pset(mx + 1, yb - 5, hex('#e0c870')); }
  // las calabazas en el borde del maíz y cestos y una olla en la esquina de delante
  for (let k = 0; k < (seco > 0.5 ? 3 : 6); k++) { const x = 214 + k * 7 + Math.round(h(k, 1, 731) * 4), y = 142 + Math.round(h(k, 2, 731) * 8), r = 2.5 + h(k, 3, 731) * 1.5;
    disco(x, y, r + 0.5, hex('#6a3a14')); disco(x, y, r, hex(seco > 0.5 ? '#c8902e' : '#e88a24')); disco(x - 1, y - 1, r * 0.5, hex(seco > 0.5 ? '#d8a848' : '#f8b040')); pset(Math.round(x), Math.round(y - r) - 1, hex('#4a6a2a')); linea(x + r, y, x + r + 5, y + 1, hex('#4e7a2e')); pset(Math.round(x + r + 3), Math.round(y - 1), hex('#6a9a3a')); }
  { const bx = 6, by = 160; for (let y = by - 7; y <= by; y++) for (let x = bx; x <= bx + 11; x++) { const e = y === by - 7; pset(x, y, e ? hex('#6a4a26') : ((x + (y >> 1)) & 1) ? hex('#b8904e') : hex('#94703a')); }
    for (let i = 0; i < 4; i++) { const ex = bx + 2 + i * 2.5; disco(ex, by - 9, 1.6, hex('#e8c840')); pset(Math.round(ex), by - 10, hex('#f8e070')); }
    disco(24, 165, 5, hex('#6a3a22')); disco(24, 164, 4.5, hex('#a0603a')); disco(22.5, 162.5, 2, hex('#c07a4a')); rect(21, 159, 27, 159, hex('#5a3420')); }
  // el tabaco que se cultiva junto a la casa (matas de hojas anchas con flores rosas)
  for (let k = 0; k < 6; k++) { const x = 10 + k * 6 + (k % 2), yb = 148 + (k % 2) * 2; linea(x, yb, x, yb - 9, G[0]); for (const [dy, s] of [[-2, -1], [-4, 1], [-6, -1], [-8, 1]]) { linea(x, yb + dy, x + s * 3, yb + dy - 1, G[3]); pset(x + s * 3, yb + dy - 1, G[4]); pset(x + s, yb + dy, G[1]); }
    pset(x, yb - 10, hex(seco > 0.5 ? '#c8a878' : '#e8a0b8')); pset(x + 1, yb - 10, hex(seco > 0.5 ? '#a88858' : '#f8c8d8')); }
  // el primer término: piedras sueltas, matas, huellas en el camino y una estera con mazorcas secándose
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 779) * 320), y = 150 + Math.round(h(k, 2, 779) * 29); if (Math.abs(x - 150) < 16 && y < 152) continue; disco(x + 0.5, y + 0.5, 1 + h(k, 3, 779), hex('#7a7060')); pset(x, y, hex('#a8a090')); pset(x + 1, y + 1, hex('#5a5040')); }
  for (let k = 0; k < 22; k++) { const x = Math.round(h(k, 4, 779) * 320), y = 146 + Math.round(h(k, 5, 779) * 33); if (x > d_camL(y) - 2 && x < d_camR(y) + 2) continue; for (let i = 0; i < 5; i++) linea(x + i - 2, y, x + (i - 2) * 2, y - 3 - (i % 2) * 2, G[i % 2 ? 1 : 3]); }
  for (let k = 0; k < 12; k++) { const y = 152 + k * 2.4, x = Math.round(d_camL(y) + (d_camR(y) - d_camL(y)) * (0.42 + (k % 2) * 0.08)); pset(x, Math.round(y), T0[0]); pset(x + 1, Math.round(y), T0[1]); }
  for (let y = 170; y <= 177; y++) for (let x = 46 + (177 - y); x <= 104 - (177 - y) * 0.3; x++) pset(x, y, y === 170 || y === 177 ? hex('#8a7048') : ((x + (y >> 1)) & 1) ? hex('#d4ba84') : hex('#b89a6a'));
  for (let k = 0; k < 9; k++) { const ex = 54 + k * 5.5, ey = 172 + (k % 2) * 2; linea(ex, ey, ex + 3, ey, hex(seco > 0.5 ? '#c8a050' : '#e8c840')); linea(ex, ey + 1, ex + 3, ey + 1, hex('#c89a30')); pset(ex + 4, ey, hex('#b8a070')); }
  // el anillo de piedras del fuego de la plaza y la ceniza
  for (let a = 0; a < 12; a++) { const x = 150 + Math.cos(a / 12 * Math.PI * 2) * 11, y = 146 + Math.sin(a / 12 * Math.PI * 2) * 3; if (y < 145 && Math.abs(x - 150) < 6) continue; disco(x, y, 1.7, hex('#7a7468')); pset(Math.round(x) - 1, Math.round(y) - 1, hex('#a8a294')); }
  for (let x = 141; x <= 159; x++) for (let y = 144; y <= 148; y++) if (((x - 150) / 9) ** 2 + ((y - 146) / 2.4) ** 2 < 1) pset(x, y, h(x, y, 732) < 0.4 ? hex('#5a5048') : hex('#3a302a'));
  return d_rematar(R, luz, 70, seco, [208, 30, 7 + seco * 2]);
}
function d_secotan(R, t, o, luz, seco) {
  const L = d_tono(luz), F = d_fijo(R, 'secotan|' + luz + '|' + seco, () => d_secotanFijo(R, luz, seco));
  d_nubes(R, t, F.nub, 70, luz, seco);
  if (luz !== 'noche') d_aves(R, t, [[0, 36, 11, 1], [1, 46, 8, -1], [2, 30, 14, 1]], L(hex('#2a2a34')));
  // el humo de los techos y de la plaza
  d_humo(R, 67, 79, t, { n: 5, alto: 46, viento: 0.7, r: 1, crece: 4, fuerza: 0.5, col: L(hex('#d8d4cc')) });
  d_humo(R, 50, 93, t + 2, { n: 5, alto: 50, viento: 0.6, r: 1, crece: 4, fuerza: 0.5, col: L(hex('#d8d4cc')) });
  // la gente del fondo: el que cruza con la leña, la mujer del mortero, los niños que se persiguen, el que escarda
  { const u = (t * 0.07) % 2, ida = u < 1, x = 112 + (ida ? u : 2 - u) * 92; d_gente(R, L, x, 98, t, { k: 0, pose: 'carga', dir: ida ? 1 : -1 }); }
  // dos pavos que picotean en la hierba de la izquierda (uno abre la cola de vez en cuando; con la sequía no están)
  if (seco < 0.5) for (let k = 0; k < 2; k++) { const x = Math.round(52 + k * 14 + Math.sin(t * 0.25 + k * 2) * 5), y = 142 + k * 3, d = Math.cos(t * 0.25 + k * 2) > 0 ? 1 : -1, pica = Math.sin(t * 2.4 + k * 1.7) > 0.5, cola = k === 0 && (t % 9) > 6.5;
    if (cola) for (let i = -3; i <= 3; i++) R.linea(x - d * 2, y - 3, x - d * 2 + Math.round(i * 0.7), y - 8 + Math.abs(i) * 0.6, L(hex(i % 2 ? '#6a5038' : '#8a6a44')));
    R.rect(x - 2, y - 4, x + 2, y - 2, L(hex('#3a2c22'))); R.pset(x - d * 3, y - 3, L(hex('#5a4430'))); R.pset(x - 1, y - 4, L(hex('#6a5a4a')));
    const hx = x + d * 3, hy = pica ? y - 2 : y - 6; R.pset(x + d * 2, y - 4, L(hex('#4a7a8a'))); if (!pica) R.pset(x + d * 3, y - 5, L(hex('#4a7a8a'))); R.pset(hx, hy, L(hex('#c84a3a'))); R.pset(hx + d, hy, L(hex('#a87a3a')));
    R.pset(x - 1, y - 1, L(hex('#a87a3a'))); R.pset(x + 1, y - 1 + (Math.floor(t * 3 + k) % 2), L(hex('#a87a3a'))); R.pset(x - 1, y, L(hex('#8a6a3a'))); R.pset(x + 1, y, L(hex('#8a6a3a'))); }
  { const m = d_gente(R, L, 112, 104, t, { k: 1, pose: 'muele', dir: 1, mujer: true }); R.linea(m[0] + 1, m[1] - 5, m[0] + 2, m[1] + 6, L(hex('#7a5a36'))); R.pset(m[0] + 1, m[1] - 6, L(hex('#9a7a50'))); }
  { const c = 186 + Math.sin(t * 1.25) * 14, d = Math.cos(t * 1.25) > 0 ? 1 : -1; d_gente(R, L, c, 110, t, { k: 2, nino: true, pose: 'anda', dir: d }); d_gente(R, L, c - d * 7 + Math.sin(t * 3) * 1, 109, t + 0.3, { k: 0, nino: true, pose: 'anda', dir: d }); }
  d_gente(R, L, 252, 101, t, { k: 2, pose: 'escarda', dir: -1 });
  // el maíz maduro, con la choza del vigía, los cuervos y los girasoles
  const hut = [270, 128], ciclo = (t + 2) % 7, agita = ciclo > 4.5 && ciclo < 6, vuelo = Math.max(0, Math.min(1, (ciclo - 4.6) / 0.6)) * (ciclo < 6.6 ? 1 : 1 - (ciclo - 6.6) / 0.4);
  const filas = [106, 110, 115, 120, 126, 132, 138];
  const fila = (y) => { const esc = (y - 64) / 116, sp = Math.max(3, Math.round(2 + esc * 4)), a = Math.round((10 + (y - 100) * 0.5) * (1 - seco * 0.4)); let k = 0;
    const xa = Math.round(Math.max(232, d_camR(y) + 22 + (y - 70) * 0.25));
    // la masa de hojas de la hilera (oscura abajo, más clara arriba, que ondula con el viento), y encima las cañas
    const MV = seco > 0 ? [d_mez(hex('#2e4a22'), hex('#6a5228'), seco), d_mez(hex('#3e6a2a'), hex('#9a7a38'), seco), d_mez(hex('#5a8a3a'), hex('#c0a048'), seco), d_mez(hex('#7aa848'), hex('#d8bc60'), seco)] : ['#2e4a22', '#3e6a2a', '#5a8a3a', '#7aa848'].map(hex);
    for (let x = xa - 2; x < 320; x++) { const ola = Math.sin(t * 1.7 + x * 0.13 + y * 0.2) * 1.2, top = Math.round(y - a * (0.62 + h(x >> 1, y, 783) * 0.14) + ola);
      for (let yy = top; yy <= y; yy++) { const v = (yy - top) / Math.max(1, y - top); R.pset(x, yy, L(d_rampa(MV, 3.2 - v * 3 + (h(x, yy, 784) - 0.5) * 1.2 + ((x + yy) % 5 === 0 ? -0.8 : 0) - 0.5, x, yy))); } }
    for (let x = xa + (y % 3); x < 324; x += sp) d_maiz(R, L, x, y, a, t, seco, k++); };
  for (const y of filas) if (y < hut[1]) fila(y);
  { const [hx, hy] = hut, pl = hy - 28, C1 = L(hex('#5a4028')), C2 = L(hex('#7a5a36'));
    for (const dx of [0, 14]) R.linea(hx + dx, hy, hx + dx, pl, C1); R.linea(hx + 1, hy, hx + 13, pl + 2, C2); R.linea(hx + 13, hy, hx + 1, pl + 2, C2);
    for (let x = hx - 2; x <= hx + 16; x++) { R.pset(x, pl, C2); R.pset(x, pl + 1, C1); }
    for (let j = 0; j < 7; j++) R.pset(hx - 3 + Math.round(j * 0.3), pl + 4 + j * 3, C2);   // la escalera
    const yv = agita ? pl - 1 : pl + 2; d_gente(R, L, hx + 7, yv, t, { k: 1, pose: agita ? 'agita' : 'sentado', dir: 1 });
    for (let x = hx - 3; x <= hx + 17; x++) { const top = pl - 13 + Math.round(((x - hx - 7) / 10) ** 2 * 5); for (let y = top; y <= pl - 10 + Math.round(((x - hx - 7) / 10) ** 2 * 1); y++) R.pset(x, y, L(y === top ? hex('#3a2818') : ((x + y) & 1) ? hex('#b89a6a') : hex('#8e7650'))); }
    R.linea(hx - 2, pl - 9, hx - 2, pl, C1); R.linea(hx + 16, pl - 9, hx + 16, pl, C1); }
  for (const y of filas) if (y >= hut[1]) fila(y);
  // los cuervos: posados en las cañas; cuando el vigía agita los brazos, salen volando y vuelven
  for (let k = 0; k < 3; k++) { const px = 292 + k * 9, py = 104 + (k % 2) * 6, x = Math.round(px - vuelo * (40 + k * 12)), y = Math.round(py - vuelo * (30 + k * 6) + Math.sin(t * 9 + k) * vuelo * 2), ala = vuelo > 0 ? Math.floor(t * 10 + k) % 2 : 0, cu = L(hex('#1e1c24'));
    R.pset(x, y, cu); R.pset(x + 1, y, cu); R.pset(x - 1, y - 1, cu); R.pset(x - 2, y - 1, L(hex('#4a4a20'))); R.pset(x + 1, y + 1, cu);
    if (vuelo > 0) { R.pset(x - 1, y - 1 - ala, cu); R.pset(x + 2, y - 1 - ala, cu); R.pset(x - 2, y - 2 + ala * 2, cu); R.pset(x + 3, y - 2 + ala * 2, cu); } }
  for (const [x, yb, a, k] of [[222, 140, 36, 0], [229, 143, 32, 1], [236, 139, 38, 2]]) d_girasol(R, L, x, yb, Math.round(a * (1 - seco * 0.25)), t, seco, k);
  // el polvo que corre con la sequía
  if (seco > 0) for (let k = 0; k < 10 * seco; k++) { const x = Math.round(((t * (22 + k * 3) + h(k, 1, 733) * 320) % 340) - 10), y = 150 + Math.round(h(k, 2, 733) * 26 + Math.sin(t * 3 + k) * 2); R.pset(x, y, L(hex('#e0cc98'))); if (k % 2) R.pset(x - 1, y, L(hex('#c8b080'))); }
  // el fuego de la plaza con su olla de barro y el vapor, y el humo que se lleva el viento
  const fl = d_llamas(R, 150, 146, t, 1, 7);
  { const ox = 163, oy = 144; R.disco(ox, oy - 3, 4, L(hex('#5a3420'))); R.disco(ox, oy - 3.5, 3.5, L(hex('#a0603a'))); R.disco(ox - 1, oy - 5, 1.5, L(hex('#c88050'))); R.rect(ox - 3, oy - 7, ox + 3, oy - 7, L(hex('#5a3420'))); R.pset(ox, oy, L(hex('#5a3420')));
    for (let k = 0; k < 3; k++) { const a = (t * 0.9 + k / 3) % 1; R.pset(ox + Math.round(Math.sin(a * 6 + k) * 2), oy - 9 - Math.round(a * 10), L(hex('#f0f0ec'))); } }
  d_humo(R, 151, 146 - fl, t, { n: 9, alto: 90, viento: 0.55, r: 1.8, crece: 7, fuerza: 0.95, col: L(hex('#a8a29a')) });
  return { suelo: 160, libre: [20, 250], fuego: [150, 146], olla: [163, 144], camino: [Math.round(d_camL(160)), Math.round(d_camR(160))], casa: [4, 94, 96, 128], maiz: [230, 100, 320, 142], vigia: [hut[0] + 7, hut[1] - 28] };
}
// la línea del agua (la arena por debajo)
const d_orilla = (x) => x <= 210 ? 100 + (Math.max(0, x) / 210) ** 1.6 * 50 : 150 + (x - 210) * 1.1;

const d_canoaPos = (u) => { u = Math.max(0, Math.min(1, u)); const e = u * u * (3 - 2 * u); return [Math.round(226 + e * 140), Math.round(166 - e * 14)]; };

const d_RIBAZO = [[0, 54], [34, 57], [72, 66], [100, 76], [110, 86], [100, 98], [80, 106], [40, 108], [0, 110]];

function d_canoasFijo(R, luz, seco) {
  const { pset, rect, disco, linea, poligono } = R, B = R.buf, AGUA = 0xff040302;
  rect(0, 0, 319, 179, d_CIELO);
  // la otra orilla, baja y lejana, con su línea de arena
  for (let x = 0; x < 320; x++) { const top = Math.round(71 + Math.sin(x * 0.06) * 1.5 + (h(x >> 1, 0, 734) - 0.5) * 3 + (x > 150 && x < 200 ? 3 : 0)); for (let y = top; y < 80; y++) pset(x, y, y >= 78 ? hex(y === 78 ? '#d8d0a8' : '#b8b090') : d_rampa(['#5a7a7a', '#6a8a86', '#7c9a92', '#90aaa0'].map(hex), 2.6 - (y - top) * 0.25 + (h(x, y, 735) - 0.5) * 0.8 - 0.5, x, y)); }
  rect(0, 80, 319, 179, AGUA);
  // el ribazo de la izquierda: hierba y pinos, con la casa larga
  poligono(d_RIBAZO, (x, y) => d_rampa(['#3e6a2a', '#4e7a2e', '#6a9a3a', '#86b048'].map(hex), 2 + (h(x >> 1, y >> 1, 736) - 0.5) * 1.4 - (y > 100 ? 0.8 : 0) - 0.5, x, y));
  for (let k = 0; k < 12; k++) { const x = 4 + k * 8 + Math.round(h(k, 1, 737) * 5), yb = Math.round(60 + k * 1.4), hh = 16 + Math.round(h(k, 2, 737) * 10);
    for (let j = 0; j <= hh; j++) { const w = Math.round((j / hh) * 5 + ((hh - j) % 4 < 2 ? 1 : 0)) * (j > 2 ? 1 : 0.5); for (let i = -w; i <= w; i++) pset(x + i, yb - hh + j, hex(i < 0 ? (j % 4 === 1 ? '#4a7a52' : '#3a6444') : i === 0 ? '#2e5438' : '#244430')); } for (let j = 0; j < 4; j++) pset(x, yb - j, hex('#4a3424')); }
  d_casaLarga(R, 4, 56, 98, 16, { sem: 7, abiertos: [[0.3, 0.6]], humo: true });
  { const x0 = 64, yb = 100; for (const px of [x0, x0 + 12]) linea(px, yb, px, yb - 8, hex('#5a4028')); linea(x0 - 1, yb - 8, x0 + 13, yb - 8, hex('#6a4a2e')); for (let i = 2; i < 12; i += 3) { pset(x0 + i, yb - 7, hex('#a8b0b8')); pset(x0 + i, yb - 6, hex('#8a8e94')); pset(x0 + i, yb - 5, hex('#6a6e74')); } }
  // la playa: arena con ondas del viento, conchas, huellas y la franja mojada junto al agua
  const AR = ['#a89064', '#c4ac7c', '#dcc898', '#ecdcb0', '#f6ecc8'].map(hex);
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) { const o = d_orilla(x); if (y < o) continue; const i = y * 320 + x;
    if (y < 108 && B[i] !== AGUA && x < 100) continue;
    let l = 2.8 + Math.sin(x * 0.5 + y * 1.3 + Math.sin(x * 0.07) * 4) * 0.45 + (h(x, y, 738) - 0.5) * 0.6; if (y - o < 3) l -= 1.4 - (y - o) * 0.3;
    if (h(x >> 1, y, 739) < 0.012 && y > 130) l -= 1.5; if (h(x, y, 740) < 0.01) l += 1.5;
    let c = d_rampa(AR, l - 0.5, x, y);
    if (y > 120 && h(x, y, 741) < 0.006) c = hex(['#f8f0f0', '#e8b8a8', '#c8c0d0'][Math.floor(h(x, y, 742) * 3)]);   // conchas
    B[i] = c; }
  // un montón de conchas de ostra, un cesto de pescado, un remo clavado en la arena y matas de la playa
  for (let k = 0; k < 26; k++) { const x = 168 + Math.round((h(k, 1, 780) - 0.5) * 22 * (1 - k / 40)), y = 174 - Math.round(h(k, 2, 780) * 6 * (1 - Math.abs(x - 168) / 14)); pset(x, y, hex(k % 3 ? '#e8e0d4' : '#a8a098')); pset(x + 1, y, hex('#c8c0b4')); }
  { const bx = 44, by = 152; for (let y = by - 6; y <= by; y++) for (let x = bx - 6 + (by - y) * 0.2; x <= bx + 6 - (by - y) * 0.2; x++) pset(x, y, y === by - 6 ? hex('#6a4a26') : ((Math.round(x) + (y >> 1)) & 1) ? hex('#b8904e') : hex('#94703a'));
    for (let i = -4; i <= 4; i += 2) { pset(bx + i, by - 7, hex('#c8d0d8')); pset(bx + i + 1, by - 7, hex('#8a949e')); pset(bx + i, by - 8, hex('#a8b4c0')); } }
  linea(104, 140, 110, 122, hex('#8a6a3a')); linea(105, 140, 111, 122, hex('#6a4a2a')); disco(111, 120, 2, hex('#a07a48')); pset(104, 141, hex('#a89064'));
  for (const [x, y] of [[120, 176], [138, 158], [60, 132], [90, 168], [24, 144]]) for (let i = 0; i < 5; i++) linea(x + i - 2, y, x + (i - 2) * 2, y - 3 - (i % 2) * 3, hex(i % 2 ? '#a8a060' : '#7a8a40'));
  // las huellas que bajan a la orilla y el tronco varado
  for (let k = 0; k < 14; k++) { const x = 60 + k * 10, y = 178 - k * 3.6 + (k % 2) * 2; pset(x, y, AR[0]); pset(x + 1, y, AR[0]); pset(x + 1, y - 1, AR[1]); pset(x + 2, y, AR[1]); }
  { for (let x = 2; x <= 30; x++) { const y = 170 - Math.round((x - 2) * 0.12); pset(x, y - 2, hex('#b8aa98')); pset(x, y - 1, hex('#9a8c7a')); pset(x, y, hex('#7a6c5c')); pset(x, y + 1, hex('#5a4e40')); } disco(30, 167, 2.2, hex('#c8bca8')); pset(30, 167, hex('#8a7c6a')); }
  // las nasas de cañas en la arena
  for (const [x, y, w] of [[8, 116, 12], [14, 123, 14]]) for (let i = 0; i <= w; i++) for (let j = -2; j <= 2; j++) { const r = 2 - Math.abs(j) * 0.5; pset(x + i, y + j, (i % 3 === 0) ? hex('#6a5030') : j < 0 ? hex('#c8a868') : hex('#9a7a48')); if (i === w) pset(x + i + 1, y + j, hex('#4a3420')); }
  // la canoa a medio hacer sobre sus calzos (el hueco, la orilla quemada y la raspadora de concha)
  { const x0 = 36, x1 = 78, yb = 112; for (const cx of [x0 + 6, x1 - 6]) { for (let i = -2; i <= 2; i++) pset(cx + i, yb, hex('#5a4028')); pset(cx, yb - 1, hex('#6a4a2e')); }
    for (let x = x0; x <= x1; x++) { const e = Math.min(x - x0, x1 - x), alto = Math.min(5, 2 + e * 0.6); for (let j = 0; j < alto; j++) pset(x, yb - 1 - j, j === Math.floor(alto) - 1 ? hex('#a07a4c') : j === 0 ? hex('#4a3220') : hex('#7a5a36')); if (e > 3) pset(x, Math.round(yb - alto), (x >> 1) % 3 ? hex('#2a1a12') : hex('#3a2418')); }
    pset(x1 - 2, yb - 7, hex('#e8e0d0')); pset(x1 - 1, yb - 7, hex('#c8c0b0')); }
  return { ...d_rematar(R, luz, 80, seco, [200, 30, 7 + seco * 2]), agua: Uint8Array.from(B, (c) => (c === d_tonoPx(AGUA, luz) || c === AGUA ? 1 : 0)) };
}

// la canoa grande de un tronco (a la escala de los personajes): el casco quemado y raspado, la borda de delante, dos
// remos dentro; solo: true pinta solo el costado de delante (para puebloDelante)
function d_canoaGrande(R, L, cx, cy, t, solo = false) {
  const { pset } = R, x0 = cx - 27, x1 = cx + 27, cab = Math.round(Math.sin(t * 1.6) * 0.8);
  const P = [L(hex('#3a2416')), L(hex('#5a3a22')), L(hex('#7a5232')), L(hex('#9a6e44')), L(hex('#b88a58'))];
  for (let x = x0; x <= x1; x++) { const e = Math.min(x - x0, x1 - x), sube = e < 6 ? Math.round((6 - e) * 0.6) : 0, y0 = cy - 6 - sube + cab, y1 = cy + 1 + cab - (e < 3 ? 3 - e : 0);
    if (!solo) { pset(x, y0 - 1, P[3]); if (e > 3) for (let y = y0; y < y0 + 3; y++) pset(x, y, y === y0 ? P[0] : P[1]); }
    for (let y = y0 + (solo ? 3 : 3); y <= y1; y++) { let l = y === y0 + 3 ? 4 : y === y1 ? 0 : 2.4 - (y - y0) * 0.25 + (((x >> 2) + y) % 5 === 0 ? -0.8 : 0) + (h(x, y, 743) - 0.5) * 0.5; pset(x, y, P[Math.max(0, Math.min(4, Math.round(l)))]); }
    if (solo && e > 2) pset(x, y0 + 2, P[3]); }
  if (!solo) { const C1 = L(hex('#c8a060')); R.linea(cx - 14, cy - 8 + cab, cx + 6, cy - 4 + cab, C1); R.linea(cx + 4, cy - 9 + cab, cx + 18, cy - 4 + cab, C1); R.pset(cx + 6, cy - 4 + cab, L(hex('#8a6a3a'))); }
}

function d_canoas(R, t, o, luz, seco) {
  const L = d_tono(luz), F = d_fijo(R, 'canoas|' + luz + '|' + seco, () => d_canoasFijo(R, luz, seco)), B = R.buf, A = F.agua;
  d_nubes(R, t, F.nub, 80, luz, seco);
  // el agua del estrecho: más clara lejos, verdosa cerca, turquesa en el bajío; ondas que corren, el reflejo oscuro del
  // ribazo y de la otra orilla, y el sol que riela
  const W = (luz === 'dia' ? ['#2a5a6a', '#3a6e78', '#4a8486', '#62989a', '#80b0ae', '#a8cac4', '#e8f4f0'] : luz === 'tarde' ? ['#3a3a5a', '#5a4a66', '#8a5a6a', '#b06a6a', '#d88a70', '#f0b080', '#fff0c0'] : ['#0c1428', '#121c34', '#18243e', '#1e2c48', '#283a56', '#3a4c6a', '#a8b8d0']).map(hex);
  const sx = 200, tf = Math.floor(t * 5);
  for (let y = 80; y < 180; y++) { const u = (y - 80) / 100, f = y * 320, len = 3 + u * 9, vel = 4 + u * 10;
    for (let x = 0; x < 320; x++) { if (!A[f + x]) continue; const o2 = d_orilla(x) - y;
      let l = 4.2 - u * 2.6 + Math.sin(x * 0.03 + y * 0.25 + t * 0.6) * 0.3;
      if (y < 83) l -= 1.2; if (x < 120 - (y - 80) * 0.8 && y < 106) l -= 1.4;   // los reflejos de la orilla y del ribazo
      if (o2 < 8) l += (8 - o2) * 0.28;   // el bajío
      const q = h(Math.floor((x + t * vel + Math.sin(y * 0.9 + t) * 3) / len), y, 744); if (q < 0.12) l += 1.2; else if (q > 0.9) l -= 0.9;
      if (Math.abs(x - sx) < 3 + u * 14 && h(x, y, 745 + tf) < 0.1 - u * 0.07) l = 6;
      B[f + x] = d_rampa(W, l - 0.5, x, y); } }
  // la espuma que sube y baja por la arena
  for (let x = 90; x < 320; x++) { const o2 = d_orilla(x), sw = Math.sin(t * 1.4 + x * 0.05) * 1.6 + 1, y = Math.round(o2 + sw); if (y > 179) continue; R.pset(x, y, L(hex('#f4f8f4'))); if (h(x, Math.floor(t * 3), 746) < 0.5) R.pset(x, y - 1, L(hex('#d0e8e4'))); }
  // el cerco de cañas: la valla larga y la trampa en corazón, con su reflejo que tiembla
  const estaca = (x, y, a) => { x = Math.round(x); y = Math.round(y); for (let j = 0; j < a; j++) R.pset(x, y - j, L(hex(j === a - 1 ? '#a89060' : '#5a4a2a'))); if (Math.sin(t * 3 + x) > -0.3) R.pset(x + (Math.sin(t * 2 + x) > 0 ? 1 : 0), y + 1, L(hex('#3a4a42'))); };
  for (let i = 0; i <= 40; i++) { const u = i / 40, x = 132 + u * 98, y = 106 - u * 13; estaca(x, y, Math.round(5 - u * 2)); }
  for (let a = 0; a < 28; a++) { const th = a / 28 * Math.PI * 2, x = 246 + Math.sin(th) ** 3 * 14, y = 92 - (13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th)) * 0.32; estaca(x, y, 3); }
  for (let i = 0; i <= 16; i++) { const u = i / 16; estaca(268 + u * 50, 96 + u * 3, 3); }
  // la canoa lejana con dos pescadores (uno con la red)
  { const x = Math.round(170 + Math.sin(t * 0.15) * 20), y = 96 + Math.round(Math.sin(t * 1.2) * 0.5), cc = L(hex('#3a2416'));
    for (let i = -7; i <= 7; i++) { R.pset(x + i, y, cc); if (Math.abs(i) < 6) R.pset(x + i, y - 1, L(hex('#6a4a2e'))); }
    for (const [dx, k] of [[-3, 0], [3, 1]]) { const p = L(hex('#a0603a')); R.pset(x + dx, y - 2, L(hex('#c49a64'))); R.pset(x + dx, y - 3, p); R.pset(x + dx, y - 4, p); R.pset(x + dx, y - 5, L(hex('#1a1210'))); }
    const re = Math.sin(t * 2.4); R.linea(x - 3, y - 3, x - 7, y - 1 + Math.round(re), L(hex('#8a6a3a'))); R.linea(x + 3, y - 4, x + 9, y - 8 - Math.round(re * 2), L(hex('#8a6a3a'))); }
  // los peces que saltan, con su anillo en el agua
  for (let k = 0; k < 3; k++) { const per = 3.1 + k * 0.7, n = Math.floor((t + k * 1.3) / per), u = ((t + k * 1.3) % per) / per, x = Math.round(130 + h(n, k, 747) * 170), y = Math.round(100 + h(n, k, 748) * 40);
    if (d_orilla(x) - y < 6) continue;
    if (u < 0.12) { const v = u / 0.12, fx = x + Math.round(v * 6), fy = y - Math.round(Math.sin(v * Math.PI) * 6); R.pset(fx, fy, L(hex('#d8e0e8'))); R.pset(fx - 1, fy + (v < 0.5 ? 1 : -1), L(hex('#a8b4c0'))); R.pset(fx + 1, fy - (v < 0.5 ? 1 : -1), L(hex('#f8fcff'))); }
    else if (u < 0.4) { const r = (u - 0.12) * 30; for (let a = 0; a < 16; a++) { const xx = Math.round(x + 6 + Math.cos(a / 16 * 6.283) * r), yy = Math.round(y + Math.sin(a / 16 * 6.283) * r * 0.3); if (A[yy * 320 + xx]) R.pset(xx, yy, L(hex('#d0e4e8'))); } } }
  // la garza del bajío: quieta, y cada pocos segundos baja el pico al agua
  { const gx = 196, gy = 132, u = (t % 6.2), pica = u > 5 && u < 5.8 ? Math.sin((u - 5) / 0.8 * Math.PI) : 0, G1 = L(hex('#8a98a8')), G2 = L(hex('#d8e0e8')), G3 = L(hex('#4a5868')), GK = L(hex('#2a3038'));
    R.linea(gx - 1, gy, gx - 1, gy - 6, L(hex('#c8a040'))); R.linea(gx + 1, gy, gx + 1, gy - 6, L(hex('#a88030')));
    for (let j = 0; j < 6; j++) for (let i = -5; i <= 3; i++) { const e = (i / 4.5) ** 2 + ((j - 2.5) / 3) ** 2; if (e < 1) R.pset(gx + i, gy - 7 - j, j >= 4 ? G2 : i < -2 ? G3 : G1); }
    R.linea(gx - 5, gy - 9, gx - 8, gy - 6, G3); R.linea(gx - 4, gy - 8, gx - 7, gy - 5, GK);
    const nx = gx + 3 + Math.round(pica * 5), ny = gy - 17 + Math.round(pica * 13); R.linea(gx + 2, gy - 12, gx + 1, gy - 14 + Math.round(pica * 4), G2); R.linea(gx + 1, gy - 14 + Math.round(pica * 4), nx, ny, G2); R.pset(nx - 1, ny, G2); R.pset(nx, ny - 1, G2); R.pset(nx - 1, ny - 1, GK); R.pset(nx - 2, ny - 1, GK); R.pset(nx, ny, GK); R.linea(nx + 1, ny, nx + 5, ny + 1 + Math.round(pica * 2), L(hex('#e8b830')));
    for (let i = -4; i <= 4; i++) if (Math.sin(t * 2 + i) > 0) R.pset(gx + i, gy + 1, L(hex('#d0e4e8'))); }
  // la garza que pasa volando, despacio
  { const x = Math.round(330 - ((t * 9) % 380)), y = 52 + Math.round(Math.sin(t * 0.5) * 2), a = Math.sin(t * 3), G1 = L(hex('#6a7888'));
    R.linea(x - 4, y, x + 4, y, G1); R.linea(x - 4, y, x - 6, y - 1, G1); R.linea(x + 4, y, x + 9, y + 1, L(hex('#c8a040'))); R.linea(x - 1, y, x - 3, y - Math.round(a * 4), G1); R.linea(x + 1, y, x + 3, y - Math.round(a * 4), G1); }
  if (luz !== 'noche') d_aves(R, t, [[3, 40, 12, 1], [4, 34, 9, -1]], L(hex('#e8ecf0')));
  // las brasas en el hueco de la canoa a medio hacer, su humo y el que la raspa con la concha
  for (let x = 41; x <= 73; x++) if (h(x, Math.floor(t * 4), 749) < 0.4) R.pset(x, 108, Math.sin(t * 5 + x) > 0 ? hex('#ff8a3a') : hex('#c8402a'));
  d_humo(R, 56, 106, t, { n: 5, alto: 40, viento: 0.5, r: 1, crece: 4, fuerza: 0.5, col: L(hex('#c8c4bc')) });
  d_humo(R, 30, 80, t + 1.5, { n: 5, alto: 40, viento: 0.6, r: 1, crece: 4, fuerza: 0.45, col: L(hex('#d0ccc4')) });
  d_gente(R, L, 32, 112, t, { k: 0, pose: 'raspa', dir: 1 });
  d_juncos(R, L, t, [[112, 120, 14, 7], [150, 128, 12, 6], [96, 112, 10, 5]], seco);
  // la canoa grande (con su estela mientras se mueve)
  const u = Math.max(0, Math.min(1, o.canoa ?? 0)), [cx, cy] = d_canoaPos(u);
  if (u > 0.01 && u < 0.99) for (let k = 1; k <= 6; k++) { const xx = cx - 28 - k * 6, sp = k * 1.5; R.pset(xx, cy - 1 - Math.round(sp * 0.4), L(hex('#e8f4f0'))); R.pset(xx, cy + 1 + Math.round(sp * 0.4), L(hex('#c8e0dc'))); }
  d_canoaGrande(R, L, cx, cy, t);
  return { suelo: 162, libre: [20, 200], canoa: [cx, cy], orilla: d_orilla, garza: [196, 132], canoaHecha: [36, 112, 78, 112] };
}

function d_lawsonFijo(R, luz, seco) {
  const { pset, rect, disco, linea } = R, B = R.buf, MAR = 0xff050403;
  rect(0, 0, 319, 179, d_CIELO);
  rect(0, 90, 319, 106, MAR);
  // las dunas: lomas de arena con su luz y su sombra, que suben hacia los lados
  const AR = ['#9a8058', '#b89c70', '#d4bc8a', '#e8d4a4', '#f4e4bc'].map(hex);
  for (let x = 0; x < 320; x++) { const top = Math.round(104 - Math.sin(x * 0.035 + 0.4) * 5 - Math.sin(x * 0.11) * 2 - (x < 70 ? (70 - x) * 0.25 : 0) - (x > 250 ? (x - 250) * 0.2 : 0));
    for (let y = top; y < 180; y++) { const sl = Math.cos(x * 0.035 + 0.4) * 0.8 + Math.cos(x * 0.11) * 0.3; let l = 2.7 + (y < 124 ? sl * 0.8 : 0) + Math.sin(x * 0.45 + y * 1.2 + Math.sin(x * 0.05) * 3) * 0.3 + (h(x, y, 750) - 0.5) * 0.5; if (y === top) l += 0.9; if (h(x >> 1, y, 751) < 0.01 && y > 140) l -= 1.4;
      if (y > 112) { const rz = Math.sin(x * 0.12 + y * 0.9 + Math.sin(x * 0.03 + y * 0.06) * 5); if (rz > 0.88) l += 0.75; else if (rz < -0.92) l -= 0.55; }   // los rizos que deja el viento
      let c = d_rampa(AR, l - 0.5, x, y); if (y > 130 && h(x, y, 752) < 0.006) c = hex(['#f8f0f0', '#e8b8a8', '#c8c0d0'][Math.floor(h(x, y, 753) * 3)]); B[y * 320 + x] = c; } }
  // el barrón de las dunas (matas fijas)
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 754) * 320), y = 100 + Math.round(h(k, 2, 754) * 22); if (R.pget(x, y) === d_CIELO || R.pget(x, y) === MAR) continue; for (let i = 0; i < 4; i++) linea(x + i - 2, y, x + (i - 2) * 2, y - 3 - (i % 2) * 2, hex(i % 2 ? '#8a8a4a' : '#a89a58')); }
  // los robles achaparrados, torcidos por el viento de mar
  const roble = (x, yb, s, dir) => { linea(x, yb, x + dir * 4 * s, yb - 9 * s, hex('#4a3424')); linea(x + 1, yb, x + 1 + dir * 4 * s, yb - 9 * s, hex('#3a281a')); linea(x + dir * 2 * s, yb - 5 * s, x - dir * 5 * s, yb - 10 * s, hex('#4a3424'));
    for (let k = 0; k < 9; k++) { const cx = x + dir * (k * 2.2 - 6) * s, cy = yb - 11 * s - Math.sin(k / 8 * Math.PI) * 5 * s + (k % 2), r = (3 + (k % 3)) * s; disco(cx, cy + 1, r, hex('#2a4228')); }
    for (let k = 0; k < 9; k++) { const cx = x + dir * (k * 2.2 - 6) * s - 1, cy = yb - 12 * s - Math.sin(k / 8 * Math.PI) * 5 * s + (k % 2), r = (2 + (k % 3)) * s * 0.7; disco(cx, cy, r, hex('#3e5a36')); }
    for (let j = 0; j < 40 * s; j++) { const xx = Math.round(x + dir * (h(j, x, 755) * 22 - 7) * s), yy = Math.round(yb - 16 * s + h(j, x, 756) * 6 * s); if (R.pget(xx, yy) === hex('#3e5a36')) pset(xx, yy, hex('#5a7a4a')); } };
  roble(24, 96, 1.6, 1); roble(6, 104, 1.2, 1); roble(292, 102, 1.3, 1); roble(312, 96, 1.1, 1); roble(240, 106, 0.8, 1);
  // las casas: dos de esteras y una de tablas, el secadero de pescado y una canoa en la duna
  d_casaLarga(R, 18, 90, 128, 24, { sem: 8, abiertos: [[0.55, 0.8]], humo: true });
  d_casaTablas(R, 104, 140, 122, 22);
  d_casaLarga(R, 252, 310, 126, 20, { sem: 9, abiertos: [[0.2, 0.45]] });
  { const x0 = 200, yb = 120; for (const px of [x0, x0 + 16]) linea(px, yb, px, yb - 9, hex('#5a4028')); linea(x0 - 1, yb - 9, x0 + 17, yb - 9, hex('#6a4a2e')); for (let i = 2; i < 16; i += 3) { pset(x0 + i, yb - 8, hex('#a8b0b8')); pset(x0 + i, yb - 7, hex('#8a8e94')); pset(x0 + i, yb - 6, hex('#6a6e74')); } }
  for (let x = 150; x <= 188; x++) { const e = Math.min(x - 150, 188 - x), y0 = 116 - Math.min(3, Math.round(e * 0.5)); for (let y = y0; y <= 116; y++) pset(x, y, y === y0 ? hex('#9a6e44') : y === 116 ? hex('#3a2416') : hex('#6a4a2e')); }
  // el tronco para sentarse (con sus anillos en el corte) y la estera de la derecha
  { const x0 = 104, x1 = 154, y = 154; for (let x = x0; x <= x1; x++) for (let j = -4; j <= 2; j++) { let l = 2 - j * 0.35 + (((x >> 1) + j) % 4 === 0 ? -0.9 : 0) + (h(x, j, 757) - 0.5) * 0.6; if (j === -4) l = 3.6; if (j === 2) l = 0; pset(x, y + j, d_rampa(['#3a2416', '#5a3a22', '#7a5232', '#9a6e44', '#b88a58'].map(hex), l - 0.5, x, y + j)); }
    disco(x0, y - 1, 3.4, hex('#c8a070')); disco(x0, y - 1, 2.2, hex('#a07a4c')); disco(x0, y - 1, 1, hex('#c8a070')); for (let x = x0 - 2; x <= x1 + 3; x++) pset(x, y + 3, hex('#9a8058')); }
  for (let y = 156; y <= 164; y++) for (let x = 196 + (164 - y); x <= 250 - (164 - y) * 0.4; x++) pset(x, y, y === 156 || y === 164 ? hex('#8a7048') : ((x + (y >> 1)) & 1) ? hex('#d4ba84') : hex('#b89a6a'));
  // el primer término: la red tendida entre dos varas, un montón de conchas, una olla y un cesto, huellas y conchas
  { const x0 = 34, x1 = 76, y0 = 128, yb = 150; linea(x0, yb, x0, y0, hex('#5a4028')); linea(x1, yb, x1, y0, hex('#5a4028')); linea(x0, y0 + 1, x1, y0 + 1, hex('#6a4a2e'));
    for (let x = x0 + 1; x < x1; x++) { const caida = Math.round(Math.sin((x - x0) / (x1 - x0) * Math.PI) * 4); for (let y = y0 + 2; y < y0 + 14 + caida; y++) if ((x + y) % 3 === 0 || (x - y + 300) % 3 === 0) pset(x, y, hex('#c8b890')); pset(x, y0 + 14 + caida, hex('#8a6a3a')); } for (let x = x0 + 4; x < x1; x += 6) disco(x, y0 + 15 + Math.round(Math.sin((x - x0) / (x1 - x0) * Math.PI) * 4), 1, hex('#e8dcc0')); }
  for (let k = 0; k < 40; k++) { const x = 286 + Math.round((h(k, 1, 781) - 0.5) * 30 * (1 - k / 60)), y = 170 - Math.round(h(k, 2, 781) * 7 * (1 - Math.abs(x - 286) / 17)); pset(x, y, hex(k % 3 ? '#e8e0d4' : '#a8a098')); pset(x + 1, y, hex('#c8c0b4')); }
  disco(266, 160, 5, hex('#5a3420')); disco(266, 159.5, 4.4, hex('#a0603a')); disco(264.5, 157.5, 1.8, hex('#c07a4a')); rect(263, 154, 269, 154, hex('#5a3420'));
  { const bx = 22, by = 172; for (let y = by - 6; y <= by; y++) for (let x = bx - 6; x <= bx + 6; x++) pset(x, y, y === by - 6 ? hex('#6a4a26') : ((x + (y >> 1)) & 1) ? hex('#b8904e') : hex('#94703a')); for (let i = -4; i <= 4; i += 2) disco(bx + i, by - 7, 1.4, hex('#e8c840')); }
  for (let k = 0; k < 16; k++) { const x = 60 + k * 12, y = 176 - (k % 3) * 2 - Math.round(k * 0.8); pset(x, y, AR[0]); pset(x + 1, y, AR[0]); pset(x + 1, y - 1, AR[1]); }
  // las huellas de la casa al fuego, la leña apilada junto al fuego, una nasa de cañas tumbada, un remo clavado en la
  // arena, un tronco blanqueado que trajo el mar y más barrón en el primer término
  for (let k = 0; k < 14; k++) { const u = k / 13, x = Math.round(58 + u * 44 + Math.sin(u * 5) * 3) + (k % 2 ? 2 : 0), y = Math.round(134 + u * 15); pset(x, y, hex('#9a8058')); pset(x + 1, y, hex('#9a8058')); pset(x, y - 1, hex('#b89c70')); }
  for (let r = 0; r < 3; r++) { const y = 148 - r * 3, xa = 188 + r * 2, xb = 206 - r * 3; for (let x = xa; x <= xb; x++) { pset(x, y - 1, hex(x % 5 === 0 ? '#5a3a22' : '#9a6e44')); pset(x, y, hex('#7a5232')); pset(x, y + 1, hex('#3a2416')); }
    disco(xb + 0.5, y + 0.5, 1.6, hex('#c8a070')); pset(xb, y, hex('#8a6440')); }
  for (let x = 288; x <= 308; x++) { const a = 1 + Math.round((x - 288) * 0.2); for (let y = 150 - a; y <= 150 + a; y++) pset(x, y, y === 150 - a ? hex('#d8c08a') : y === 150 + a ? hex('#6a5030') : (x - 288) % 5 === 0 ? hex('#7a5a34') : ((x + y) & 1) ? hex('#c0a46e') : hex('#a08454')); }
  for (let y = 145; y <= 155; y++) { pset(309, y, hex('#6a5030')); pset(310, y, hex(y % 2 ? '#8a6a40' : '#b89a62')); }
  linea(317, 152, 314, 124, hex('#7a5232')); linea(318, 152, 315, 124, hex('#5a3a22')); linea(312, 124, 317, 124, hex('#5a3a22')); for (let y = 144; y <= 152; y++) { pset(315, y, hex('#9a6e44')); pset(319, y, hex('#5a3a22')); }
  for (let x = 258; x <= 298; x++) { const y = 140 + Math.round((x - 258) * 0.05); pset(x, y - 2, hex('#e0d8c8')); pset(x, y - 1, hex(x % 7 === 0 ? '#8a8478' : '#c8c0b0')); pset(x, y, hex('#a8a090')); pset(x, y + 1, hex('#7a7468')); }
  for (const [dx, dy] of [[-3, -4], [-4, 0], [-3, 3]]) linea(258, 139, 258 + dx, 139 + dy, hex('#a8a090')); disco(298, 140.5, 1.8, hex('#d8d0c0')); pset(278, 139, hex('#6a6458'));
  for (let k = 0; k < 12; k++) { const x = Math.round(h(k, 1, 787) * 320), y = 128 + Math.round(h(k, 2, 787) * 50); if ((x > 96 && x < 256 && y > 136 && y < 170) || (x > 30 && x < 80 && y > 126 && y < 152)) continue; for (let i = 0; i < 5; i++) linea(x + i - 2, y, x + (i - 2) * 2, y - 3 - (i % 2) * 3, hex(i % 2 ? '#8a8a4a' : '#b8a860')); }
  // el anillo de piedras del fuego
  for (let a = 0; a < 14; a++) { const x = 170 + Math.cos(a / 14 * Math.PI * 2) * 13, y = 150 + Math.sin(a / 14 * Math.PI * 2) * 3.5; if (y < 149 && Math.abs(x - 170) < 7) continue; disco(x, y, 1.8, hex('#7a7468')); pset(Math.round(x) - 1, Math.round(y) - 1, hex('#a8a294')); }
  for (let x = 159; x <= 181; x++) for (let y = 147; y <= 152; y++) if (((x - 170) / 11) ** 2 + ((y - 150) / 2.8) ** 2 < 1) pset(x, y, h(x, y, 758) < 0.4 ? hex('#5a5048') : hex('#3a302a'));
  const r = d_rematar(R, luz, 92, seco, luz === 'noche' ? [60, 36, 5] : [226, 90, 10]);
  return { ...r, mar: Uint8Array.from(B, (c) => (c === d_tonoPx(MAR, luz) || c === MAR ? 1 : 0)) };
}
function d_lawson(R, t, o, luz, seco) {
  const L = d_tono(luz), F = d_fijo(R, 'lawson|' + luz + '|' + seco, () => d_lawsonFijo(R, luz, seco)), B = R.buf;
  d_nubes(R, t, F.nub, 92, luz, seco);
  if (luz === 'noche') for (let k = 0; k < 50; k++) { const x = Math.round(h(k, 1, 759) * 319), y = Math.round(h(k, 2, 759) * 80); if (!F.nub[y * 320 + x]) continue; if (Math.sin(t * (1.5 + h(k, 3, 759) * 2) + k) > -0.3) R.pset(x, y, hex(k % 4 ? '#c8d0e8' : '#ffffff')); }
  // el mar: olas que corren hacia la orilla y el reguero del sol que se pone
  const W = (luz === 'tarde' ? ['#3a3a66', '#5a4a72', '#8a5a78', '#b46c74', '#e08a6a', '#ffcc80', '#fff4c8'] : luz === 'dia' ? ['#2a5a7a', '#3a6e8a', '#4a7e9a', '#62949e', '#80aab0', '#a8c8cc', '#f0f8f8'] : ['#0c1428', '#121c34', '#18243e', '#1e2c48', '#283a56', '#3a4c6a', '#a8b8d0']).map(hex), sx = luz === 'noche' ? 60 : 226, tf = Math.floor(t * 5);
  for (let y = 90; y < 108; y++) { const u = (y - 90) / 16, f = y * 320; for (let x = 0; x < 320; x++) { if (!F.mar[f + x]) continue; let l = 2.4 - u * 1.2 + Math.sin(x * 0.04 + t * 0.4) * 0.3; const q = h(Math.floor((x + t * (3 + u * 6) + Math.sin(y + t) * 2) / (3 + u * 6)), y, 760); if (q < 0.14) l += 1.3; else if (q > 0.88) l -= 0.9;
    if ((y - 90 + Math.floor(t * 3)) % 6 === 0 && h(x >> 3, y, 761) < 0.5) l += 0.8; if (Math.abs(x - sx) < 6 + u * 16 && h(x, y, 762 + tf) < 0.4) l = 5.4 + (h(x, y, 763 + tf) < 0.3 ? 1 : 0);
    B[f + x] = d_rampa(W, l - 0.5, x, y); } }
  if (luz !== 'noche') d_aves(R, t, [[5, 48, 10, -1], [6, 58, 7, -1], [7, 40, 12, 1]], L(hex('#2a2234')));
  // el barrón que se mece en las dunas, el humo de la casa, la gente sentada a la puerta y la que vuelve con la cesta
  d_matas(R, L, t, [[64, 110, 7], [150, 104, 6], [230, 108, 7], [196, 104, 6], [96, 112, 6]], 0.3, true);
  // los correlimos de la orilla, que corren tras la ola que se retira y vuelven cuando llega, y la arena que levanta
  // el viento
  if (luz !== 'noche') for (let k = 0; k < 4; k++) { const x = Math.round(204 + k * 8 + Math.sin(t * 0.9 + k * 0.4) * 9); let y = 110; while (y > 90 && !F.mar[y * 320 + x]) y--; if (y <= 90) continue; y += 2;
    const p = Math.floor(t * 9 + k) % 2, c = L(hex('#4a3a2c')), cl = L(hex('#ffffff')), k2 = L(hex('#1a120c')); R.pset(x, y - 2, c); R.pset(x + 1, y - 2, c); R.pset(x + 2, y - 3, c); R.pset(x + 3, y - 3, k2); R.pset(x, y - 1, cl); R.pset(x + 1, y - 1, cl); R.pset(x + p, y, k2); R.pset(x - 1, y - 2, c); }
  for (let k = 0; k < 8; k++) { const x = Math.round(((t * (30 + k * 4) + h(k, 1, 785) * 320) % 360) - 20), y = 128 + Math.round(h(k, 2, 785) * 48 + Math.sin(t * 2 + k) * 1.5); for (let i = 0; i < 3; i++) R.pset(x - i * 2, y, L(hex(i ? '#e8d4a4' : '#f4e4bc'))); }
  d_humo(R, 54, 104, t, { n: 5, alto: 50, viento: 0.6, r: 1, crece: 4, fuerza: 0.5, col: L(hex('#d0ccc4')) });
  d_gente(R, L, 146, 121, t, { k: 1, pose: 'sentado', dir: -1, mujer: true }); d_gente(R, L, 96, 121, t, { k: 0, pose: 'sentado', dir: 1 });
  { const u = (t * 0.05) % 1, x = 300 - u * 80, y = 110 + Math.round(u * 6); const m = d_gente(R, L, x, y, t, { k: 2, pose: 'anda', dir: -1, mujer: true }); R.disco(m[0] - 1, m[1] - 1, 1.6, L(hex('#a8844a'))); R.pset(m[0] - 1, m[1] - 2, L(hex('#7a5a30'))); }
  // un perro que se rasca junto a la casa
  { const x = 78, y = 133, rasca = Math.sin(t * 14) > 0 && (t % 4) < 1.6, P = L(hex('#a07a4c')), PS = L(hex('#6a4a2e'));
    for (let i = 0; i < 6; i++) { R.pset(x + i, y - 3, P); R.pset(x + i, y - 2, i < 2 ? PS : P); } R.pset(x + 6, y - 4, P); R.pset(x + 7, y - 4, P); R.pset(x + 7, y - 5, PS); R.pset(x + 8, y - 3, PS); R.pset(x - 1, y - 4, P);
    R.pset(x, y - 1, PS); R.pset(x + 5, y - 1, PS); R.pset(x + 1, y - 1 - (rasca ? 1 : 0), P); R.pset(x + 4, y - 1, PS); R.pset(x + 1, y, PS); R.pset(x + 5, y, PS); }
  // la luz del fuego sobre la arena (tiembla) y el fuego con su humo
  const fl = d_parpadeo(t), CAL = hex(luz === 'noche' ? '#c86a2a' : '#ffb060');
  for (let y = 128; y < 180; y++) for (let x = 110; x < 236; x++) { const d = Math.hypot(x - 170, (y - 150) * 2.3) / 64, a = (1 - d) * fl; if (a <= 0 || d_um(x, y) > a * 1.1) continue; const i = y * 320 + x; B[i] = d_mez(B[i], CAL, luz === 'noche' ? 0.42 : 0.26); }
  const hf = d_llamas(R, 170, 150, t, 1.15, 9);
  d_humo(R, 171, 150 - hf, t, { n: 8, alto: 100, viento: -0.35, r: 1.5, crece: 7, col: L(hex('#8a7a78')), fuerza: 0.7 });
  return { suelo: 160, libre: [30, 250], fuego: [170, 150], asiento: [104, 154, 154], estera: [196, 250, 160] };
}
function d_juntoFijo(R, luz, seco) {
  const { pset, rect, disco, linea } = R, B = R.buf;
  rect(0, 0, 319, 179, d_CIELO);
  // la casa larga de detrás, grande: la bóveda de corteza y la pared de esteras, con la puerta de estera enrollada
  const x0 = -30, x1 = 262, yb = 152, alto = 112, rr = 70, yT = yb - alto, yR = 92;
  const top = (x) => { const d = x1 - x; if (d >= rr) return yT; const u = rr - d - 0.5; return yT + rr - Math.sqrt(Math.max(0, rr * rr - u * u)); };
  const CO = ['#3e3020', '#5a4a32', '#7a6646', '#9a8460', '#b8a07a'].map(hex), ES = ['#5a4628', '#7e6440', '#a88a5a', '#c8ac78', '#dcc290'].map(hex);
  for (let x = 0; x <= x1; x++) { const ty = Math.round(top(x)), lado = x > x1 - rr ? -(x - (x1 - rr)) / rr : 0;
    for (let y = ty; y <= yb; y++) { let c;
      if (y === ty || x === x1) c = hex('#2a1c10');
      else if (y < yR) { const hil = Math.floor((y - yT) / 5), jx = (x + hil * 13) % 23; let l = 3 - (y - ty) / (yR - ty) * 1.4 + lado + (h(x >> 1, hil, 764) - 0.5) * 0.8; if ((y - yT) % 5 === 4) l -= 1.2; if ((y - yT) % 5 === 3) l -= 0.4; if (jx === 0 || jx === 1) l -= 1.2; if (h(x, y, 765) < 0.05) l -= 0.7; c = d_rampa(CO, l - 0.5, x, y); }
      else { const doorx = x >= 34 && x <= 74, v = (y - yR) / (yb - yR);
        if (doorx && y > 104) { c = x === 34 || x === 74 ? hex('#2a1c10') : hex('#140c08'); if (y > 140 && h(x, y, 766) < 0.3) c = hex('#22160e'); }
        else if (doorx && y >= 100) c = y === 100 ? ES[3] : y === 101 ? ((x % 4 === 0) ? ES[1] : ES[2]) : y === 102 ? ES[2] : ES[0];
        else { const tej = ((((x >> 1) + (y >> 1)) & 1) ? 0.55 : -0.25) + ((((x >> 1) - (y >> 2)) % 3 === 0) ? -0.3 : 0); let l = 3 - v * 1.2 + lado + tej + (h(x >> 2, y >> 3, 767) - 0.5) * 0.4; if (y === yR || y === yR + 1) l -= 1.6; if (x % 22 === 0) l -= 1.1; if (y === yb) l -= 1.4; c = d_rampa(ES, l - 0.5, x, y); } }
      pset(x, y, c); } }
  for (let x = 2; x < x1 - 4; x += 22) linea(x, yR + 2, x, yb - 1, ES[0]);
  // en la bóveda: las varas largas que la atan por fuera, las ataduras de corteza de cada cruce y el musgo verde oscuro
  for (const yv of [54, 70, 84]) for (let x = 0; x < x1; x++) { if (yv <= top(x) + 1) continue; pset(x, yv, hex('#3a2a18')); pset(x, yv - 1, hex('#8a7048')); }
  for (let x = 11; x < x1 - 2; x += 22) for (let y = Math.ceil(top(x)) + 2; y < yR; y++) { if ((y - yT) % 3 === 0) pset(x, y, hex('#2a1c10')); if ([54, 70, 84].includes(y)) { pset(x - 1, y - 1, hex('#c8b080')); pset(x + 1, y, hex('#c8b080')); pset(x, y + 1, hex('#5a4630')); } }
  for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 788) * (x1 - 8)), y = Math.round(top(x) + 2 + h(k, 2, 788) * 14); if (y >= yR - 2) continue; for (let i = 0; i < 4; i++) pset(x + i, y + (i % 2), hex(i % 2 ? '#4a5a30' : '#5e7038')); pset(x + 1, y - 1, hex('#748a44')); }
  // el hollín: la pared y la bóveda, ennegrecidas por encima del fuego
  for (let y = 40; y < 152; y++) for (let x = 104; x < 232; x++) { const d = Math.hypot((x - 166) / 62, (y - 128) / 74); if (d < 1 && d_um(x, y) < (1 - d) * 0.95) { const i = y * 320 + x; if (B[i] !== d_CIELO) B[i] = d_mez(B[i], hex('#1e140c'), 0.38); } }
  // la estera de la puerta, medio caída a la izquierda, y dentro, en lo oscuro, el rescoldo del hogar y una tarima
  for (let y = 103; y <= 136; y++) for (let x = 35; x <= 35 + Math.round(12 - (y - 103) * 0.18); x++) pset(x, y, ((x + (y >> 1)) & 1) ? ES[2] : ES[1]);
  for (let y = 103; y <= 136; y++) pset(36 + Math.round(12 - (y - 103) * 0.18), y, ES[0]);
  for (let x = 50; x <= 73; x++) { pset(x, 138, hex('#2a1c12')); pset(x, 139, hex('#3a281a')); }
  for (const [x, y] of [[60, 148], [62, 147], [64, 148], [61, 149]]) pset(x, y, hex('#6a2a18'));
  // de la pared cuelgan manojos de mazorcas, calabazas huecas, una piel de ciervo en su bastidor y una red
  for (const mx of [92, 108]) { linea(mx, 96, mx, 100, hex('#6a4a2e')); for (let k = 0; k < 5; k++) { const ex = mx - 4 + k * 2, ey = 101 + (k % 2); linea(ex, ey, ex, ey + 6, hex('#e8c840')); pset(ex, ey + 6, hex('#c89a30')); pset(ex + 1, ey + 1, hex('#c8a860')); } }
  for (const [gx, gy] of [[132, 106], [144, 110]]) { linea(gx, 96, gx, gy - 4, hex('#6a4a2e')); disco(gx, gy, 4, hex('#8a6a30')); disco(gx - 1, gy - 1, 3, hex('#c8a050')); disco(gx, gy - 4, 1.6, hex('#a8843a')); }
  { const fx = 222, fy = 98; linea(fx, fy, fx + 24, fy, hex('#5a4028')); linea(fx, fy + 28, fx + 24, fy + 28, hex('#5a4028')); linea(fx, fy, fx, fy + 28, hex('#5a4028')); linea(fx + 24, fy, fx + 24, fy + 28, hex('#5a4028'));
    for (let y = fy + 3; y <= fy + 25; y++) for (let x = fx + 3; x <= fx + 21; x++) { const e = ((x - fx - 12) / 9.5) ** 2 + ((y - fy - 14) / 11.5) ** 2; if (e < 1 - (Math.abs(x - fx - 12) > 6 && Math.abs(y - fy - 14) > 6 ? 0.25 : 0)) pset(x, y, e > 0.8 ? hex('#a87a4a') : h(x, y, 782) < 0.2 ? hex('#d8a870') : hex('#c8925a')); }
    for (let k = 0; k < 8; k++) { linea(fx + 3 + k * 2.5, fy + 1, fx + 4 + k * 2.4, fy + 4, hex('#8a6a3a')); } }
  for (let x = 172; x <= 206; x++) { const caida = Math.round(Math.sin((x - 172) / 34 * Math.PI) * 6); for (let y = 98; y < 112 + caida; y++) if ((x + y) % 4 === 0 || (x - y + 400) % 4 === 0) pset(x, y, hex('#d0c098')); pset(x, 112 + caida, hex('#8a6a3a')); }
  linea(170, 97, 208, 97, hex('#6a4a2e'));
  // una ristra de peces secos, un manojo de hojas de tabaco, un cesto colgado y, en el suelo, la tinaja y dos cestos
  linea(150, 97, 166, 97, hex('#6a4a2e')); for (let k = 0; k < 4; k++) { const fx = 152 + k * 4, fy = 99 + (k % 2); pset(fx, fy - 1, hex('#8a6a3a')); for (let j = 0; j < 8; j++) { pset(fx, fy + j, hex(j < 2 ? '#c8ccd0' : j > 6 ? '#6a6e74' : '#a8b0b8')); pset(fx + 1, fy + j, hex(j > 5 ? '#4a4e54' : '#7a8088')); } pset(fx - 1, fy + 8, hex('#7a8088')); pset(fx + 2, fy + 8, hex('#7a8088')); }
  linea(120, 96, 120, 100, hex('#6a4a2e')); for (let k = 0; k < 5; k++) { const lx = 116 + k * 2; for (let j = 0; j < 9 - (k % 2) * 2; j++) pset(lx + Math.round(j * (k - 2) * 0.12), 101 + j, hex(j % 3 === 0 ? '#5a4a22' : (k % 2 ? '#8a7432' : '#a88a3e'))); } rect(117, 100, 123, 101, hex('#c8a860'));
  linea(82, 96, 82, 100, hex('#6a4a2e')); for (let y = 101; y <= 109; y++) for (let x = 77; x <= 87; x++) { const e = Math.abs(x - 82) <= 5 - Math.max(0, y - 106); if (e) pset(x, y, y === 101 ? hex('#6a4a26') : ((x + (y >> 1)) & 1) ? hex('#b8904e') : hex('#94703a')); }
  { for (let y = 136; y <= 152; y++) { const w = Math.round(9 * Math.sin((y - 133) / 21 * Math.PI)); for (let x = 16 - w; x <= 16 + w; x++) pset(x, y, x < 16 - w * 0.4 ? hex('#b8744a') : x > 16 + w * 0.5 ? hex('#6a3a20') : hex('#9a5a36')); } rect(11, 135, 21, 136, hex('#5a3420')); for (let x = 9; x <= 23; x += 2) pset(x, 142, hex('#5a3420')); }
  for (const [cx, w, yb2] of [[276, 9, 152], [277, 7, 142]]) for (let y = yb2 - 9; y <= yb2; y++) for (let x = cx - w; x <= cx + w; x++) pset(x, y, y === yb2 - 9 ? hex('#6a4a26') : y === yb2 ? hex('#4a3018') : ((x + (y >> 1)) & 1) ? hex('#b8904e') : hex('#94703a'));
  // el roble oscuro de la derecha (bajo la esquina de Atom) y el suelo de tierra con esteras
  for (let k = 0; k < 10; k++) disco(276 + k * 5, 70 + Math.sin(k) * 6 + (k % 2) * 5, 9 + (k % 3), hex(k % 2 ? '#2a3a26' : '#24321e'));
  for (let k = 0; k < 8; k++) disco(274 + k * 6, 66 + Math.sin(k * 1.3) * 5, 5, hex('#3a4e30'));
  linea(286, 152, 290, 80, hex('#3a281a')); linea(287, 152, 291, 80, hex('#2a1c12')); linea(300, 152, 302, 90, hex('#3a281a'));
  for (let y = 120; y <= 152; y++) for (let x = x1 + 1; x < 320; x++) if (R.pget(x, y) === d_CIELO && y > 118 + Math.sin(x * 0.2) * 2) pset(x, y, hex(y < 140 ? '#2e3a2a' : '#3a4430'));
  const T0 = ['#4a3424', '#6a4e34', '#8a6a48', '#a8865c', '#c4a072'].map(hex);
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { let l = 2.2 + (h(x >> 1, y, 768) - 0.5) * 1.1 + (y - 152) * 0.03; if (h(x, y, 769) < 0.04) l += 1.3; B[y * 320 + x] = d_rampa(T0, l - 0.5, x, y); }
  const estera = (xa, xb, ya, yb2) => { for (let y = ya; y <= yb2; y++) for (let x = xa; x <= xb; x++) pset(x, y, y === ya || y === yb2 || x === xa || x === xb ? ES[0] : ((x + (y >> 1)) & 1) ? ES[3] : ES[2]); for (let x = xa; x <= xb; x += 2) pset(x, yb2 + 1, ES[1]); };
  estera(10, 112, 162, 176); estera(214, 300, 158, 172);
  // el tronco caído para sentarse, con su corte de anillos
  { const xa = 70, xb = 132, y = 152; for (let x = xa; x <= xb; x++) for (let j = -6; j <= 3; j++) { let l = 2.2 - j * 0.3 + (((x >> 1) + j) % 4 === 0 ? -0.9 : 0) + (h(x, j, 770) - 0.5) * 0.6; if (j === -6) l = 3.6; if (j === 3) l = 0; pset(x, y + j, d_rampa(['#3a2416', '#5a3a22', '#7a5232', '#9a6e44', '#b88a58'].map(hex), l - 0.5, x, y + j)); }
    disco(xa, y - 1.5, 4.6, hex('#c8a070')); for (const r of [3.4, 2.2, 1]) disco(xa, y - 1.5, r, r === 2.2 ? hex('#c8a070') : hex('#a07a4c')); for (let x = xa - 3; x <= xb + 3; x++) pset(x, y + 4, hex('#3a2a1a')); }
  // el anillo de piedras, la ceniza, la olla de barro sobre tres piedras, el cuenco con el cazo y unas mazorcas
  for (let a = 0; a < 16; a++) { const x = 166 + Math.cos(a / 16 * Math.PI * 2) * 20, y = 168 + Math.sin(a / 16 * Math.PI * 2) * 5; if (y < 167 && Math.abs(x - 166) < 12) continue; disco(x, y, 2.6, hex('#6a645a')); disco(x - 0.6, y - 0.8, 1.4, hex('#9a9488')); }
  for (let x = 149; x <= 183; x++) for (let y = 165; y <= 172; y++) if (((x - 166) / 16) ** 2 + ((y - 168) / 3.6) ** 2 < 1) pset(x, y, h(x, y, 771) < 0.4 ? hex('#5a5048') : hex('#3a302a'));
  { const ox = 200, oy = 166; for (const dx of [-5, 0, 5]) disco(ox + dx, oy + 2, 2, hex('#7a7468')); disco(ox, oy - 6, 8, hex('#4a2a18')); disco(ox, oy - 6.5, 7.4, hex('#9a5a36')); disco(ox - 2, oy - 9, 3, hex('#b8744a')); rect(ox - 6, oy - 14, ox + 6, oy - 13, hex('#5a3420')); rect(ox - 5, oy - 14, ox + 5, oy - 14, hex('#3a2014'));
    for (let a = -6; a <= 6; a += 3) pset(ox + a, oy - 4 + Math.round(Math.abs(a) * 0.2), hex('#7a4228')); }
  { const bx = 222, by = 172; for (let i = -6; i <= 6; i++) { const d = Math.round(Math.sqrt(36 - i * i) * 0.6); for (let j = 0; j <= d; j++) pset(bx + i, by - 3 + j, j === 0 ? hex('#5a3420') : j === d ? hex('#4a2a18') : hex('#a86a40')); } for (let i = -5; i <= 5; i++) pset(bx + i, by - 3, hex('#e8e0c8')); linea(bx + 2, by - 4, bx + 9, by - 10, hex('#8a6a3a')); disco(bx + 1, by - 3, 1.5, hex('#9a7a4a')); }
  for (let k = 0; k < 3; k++) { const ex = 240 + k * 6, ey = 176 - (k % 2); linea(ex, ey, ex + 4, ey - 1, hex('#e8c840')); linea(ex, ey - 1, ex + 4, ey - 2, hex('#f8e070')); pset(ex - 1, ey, hex('#c8b070')); }
  // la persona sentada en la estera de la derecha (pequeña, de fondo)
  return d_rematar(R, luz, 60, seco, null, false);
}
function d_junto(R, t, o, luz, seco) {
  // tres versiones del mismo fondo: a oscuras (la luz de la escena), a media luz y a plena luz del fuego; la luz de cada
  // píxel sale de su distancia al fuego y de cuánto tiembla la llama
  let F = d_FIJOS.get('junto|' + luz + '|' + seco);
  if (!F) { const b = R.nuevo(), prev = R.usar(b), r = d_juntoFijo(R, luz, seco); R.usar(prev);
    const os = luz === 'dia' ? (c) => c : (c) => d_tonoPx(c, luz === 'tarde' ? 'tarde' : 'noche'), dk = new Uint32Array(57600), md = new Uint32Array(57600), lt = new Uint32Array(57600), D = new Float32Array(57600);
    for (let i = 0; i < 57600; i++) { const c = b[i], x = i % 320, y = (i / 320) | 0; dk[i] = r.cielo[i] ? c : os(c); lt[i] = r.cielo[i] ? c : d_tonoPx(c, 'fuego'); md[i] = r.cielo[i] ? c : d_mez(dk[i], lt[i], 0.5);
      D[i] = r.cielo[i] ? 0 : Math.max(0, 1 - Math.hypot(x - 166, (y - 160) * 1.25) / 190) * (y < 92 ? 0.75 : 1); }
    F = { dk, md, lt, D, ...r }; d_FIJOS.set('junto|' + luz + '|' + seco, F); }
  const B = R.buf, fl = d_parpadeo(t), ofs = Math.sin(t * 2.3) * 0.04;
  for (let i = 0; i < 57600; i++) { const v = F.D[i] * (fl + ofs) * (luz === 'dia' ? 0.6 : 2.15); if (v <= 0) { B[i] = F.dk[i]; continue; } const x = i % 320, y = (i / 320) | 0, u = d_um(x, y); B[i] = v > 1 + u ? F.lt[i] : v > u ? F.md[i] : F.dk[i]; }
  // el cielo: estrellas que titilan, la luna y nubes oscuras que pasan
  if (luz === 'noche') { for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 772) * 319), y = Math.round(h(k, 2, 772) * 58); if (!F.nub[y * 320 + x]) continue; const tw = Math.sin(t * (1.3 + h(k, 3, 772) * 2) + k * 1.7); if (tw > -0.4) R.pset(x, y, tw > 0.5 ? hex('#ffffff') : hex('#8a94c0')); }
    for (let y = 16; y <= 32; y++) for (let x = 224; x <= 248; x++) { if (!F.cielo[y * 320 + x]) continue; const d = Math.hypot(x + 0.5 - 236, y + 0.5 - 24) / 6; if (d < 1 && Math.hypot(x + 0.5 - 238.6, y + 0.5 - 22.8) / 6 > 0.82) R.pset(x, y, d > 0.8 ? hex('#c8d0e0') : hex('#eef0e6')); } }
  d_nubes(R, t, F.nub, 60, luz, seco);
  // luciérnagas que se encienden y se apagan bajo el roble
  if (luz === 'noche') for (let k = 0; k < 7; k++) { const x = Math.round(266 + h(k, 1, 786) * 50 + Math.sin(t * 0.7 + k * 2) * 4), y = Math.round(96 + h(k, 2, 786) * 50 + Math.cos(t * 0.9 + k) * 3), on = Math.sin(t * 2.2 + k * 1.9);
    if (on > 0.3) { R.pset(x, y, hex(on > 0.8 ? '#f8ffa0' : '#b8d860')); if (on > 0.85) { R.pset(x + 1, y, hex('#6a8a30')); R.pset(x - 1, y, hex('#6a8a30')); } } }
  // la persona sentada en la estera, con la cara iluminada de lado; o.ojos: sus ojos grises que brillan
  { const x = 250, y = 152, Lf = (c) => d_mez(d_tonoPx(c, 'noche'), d_tonoPx(c, 'fuego'), 0.75 * fl);
    d_gente(R, Lf, x, y, t, { k: 1, pose: 'sentado', dir: -1 });
    const ojos = Math.max(0, Math.min(1, o.ojos ?? 0)); if (ojos > 0) { const ex = x - 1, ey = y - 6; R.pset(ex, ey, d_mez(Lf(hex('#a0603a')), hex('#c8d0d8'), ojos)); if (ojos > 0.5 && Math.sin(t * 2.5) > 0.2) { R.pset(ex - 1, ey - 1, hex('#e8f0f8')); } } }
  // el libro abierto sobre el tronco (dos páginas con renglones sin letras y el lomo), con la luz del fuego
  if (o.libro !== false) { const [lx, ly] = [124, 150], P1 = d_mez(hex('#f0e6cc'), hex('#ffcc88'), 0.35 * fl), P2 = d_mez(hex('#d8c8a4'), hex('#e8a868'), 0.3 * fl), RG = hex('#8a7a62');
    for (let i = -7; i <= 7; i++) { const cur = Math.abs(i) < 1 ? 1 : 0; for (let j = 0; j < 5; j++) R.pset(lx + i, ly - 5 + j + cur, i < 0 ? P2 : P1); R.pset(lx + i, ly + cur, hex('#4a2a1a')); if (Math.abs(i) > 1 && Math.abs(i) < 7) for (const j of [1, 3]) if ((i + j) % 4) R.pset(lx + i, ly - 5 + j, RG); }
    R.pset(lx, ly - 5, hex('#6a4a2e')); R.pset(lx, ly - 6, hex('#6a4a2e')); R.linea(lx - 8, ly - 4, lx - 8, ly + 1, hex('#5a2e1a')); R.linea(lx + 8, ly - 4, lx + 8, ly + 1, hex('#5a2e1a')); }
  // el fuego grande, el vapor de la olla y el humo
  const hf = d_llamas(R, 166, 168, t, 2.3, 14);
  for (let k = 0; k < 4; k++) { const a = (t * 0.7 + k / 4) % 1; R.pset(200 + Math.round(Math.sin(a * 6 + k) * 3), 150 - Math.round(a * 22), d_mez(hex('#d8d4cc'), hex('#ffcc88'), 0.3)); }
  d_humo(R, 167, 168 - hf, t, { n: 7, alto: 110, viento: 0.25, r: 2, crece: 9, col: hex('#4a3e3a'), fuerza: 0.6 });
  return { suelo: 170, libre: [20, 260], fuego: [166, 168], libro: [124, 150], asiento: [70, 132, 150], ojos: [249, 142] };
}
// la paleta de Hatteras: el cielo de la costa, el agua de la ensenada, la arena, los robles, la tierra de las catas
const e_P = Object.fromEntries(Object.entries({
  k: '#1c1a22', blanco: '#f8f6ee', negro: '#26242a', rojo: '#c8303a', rojoS: '#8a2028', rojoL: '#e86058',
  cielo0: '#5f9ed8', cielo1: '#6aa6dc', cielo2: '#78b0e0', cielo3: '#88bae4', cielo4: '#9ac6e8', cielo5: '#aed2ec', cielo6: '#c4def0', cielo7: '#d8eaf2',
  nube0: '#fbfcfe', nube1: '#e2eaf4', nube2: '#bccbde', nube3: '#98aac4', sol: '#fffbe6', solH: '#fdf2c4', solH2: '#e8f0e8',
  lejos0: '#5c7c80', lejos1: '#4b6a70', lejos2: '#6f8e8e', lejos3: '#86a2a0',
  agua0: '#2f6a84', agua1: '#3c7a92', agua2: '#4c8aa0', agua3: '#62a0b2', aguaL: '#b8dce6', aguaB: '#f4fcff',
  junco0: '#5a6a30', junco1: '#788a40', junco2: '#9aa852', junco3: '#bcc070', juncoS: '#40502a',
  hoja0: '#1a3320', hoja1: '#264628', hoja2: '#355c2e', hoja3: '#4c7434', hoja4: '#6a8c40', hoja5: '#8aa452',
  tronco0: '#2a2420', tronco1: '#433a32', tronco2: '#5c5246', tronco3: '#7a6e60', musgo: '#9aa48e', musgoS: '#76806c',
  arena0: '#a88c62', arena1: '#c2a678', arena2: '#d6be90', arena3: '#e4d0a6', arena4: '#efe2c0', arena5: '#f6eed6',
  hojarasca: '#8a6a3a', hojarascaS: '#5e4628', hojarascaL: '#b08a4a',
  humus: '#3a3028', tierra0: '#4a3424', tierra1: '#6a4a30', tierra2: '#8a6440', tierra3: '#a87e52', naranja0: '#9a5a2a', naranja1: '#b8743a',
  capa0: '#2e2a28', capa1: '#423c36', concha: '#ece6d4', conchaS: '#b8ae98', conchaD: '#8a8270',
  cordel: '#f6f2e0', cordelS: '#a89e80', estaca: '#d0a060', estacaS: '#8a6438', cinta: '#f4508e', cintaS: '#b42e66',
  lona: '#3a72b8', lonaS: '#2a5490', lonaL: '#5a92d0', naranja: '#e8782a', naranjaS: '#b0521c', naranjaL: '#f8a050',
  verde: '#3e8a4a', verdeS: '#2a6034', verdeL: '#5eaa5a', metal: '#9aa2ae', metalS: '#6a7280', metalL: '#d0d6de', metalD: '#4a505c',
  pino: '#d8b880', pinoS: '#a8844e', pinoL: '#ecd2a0', pinoD: '#7a5a34', malla: '#7a8088', mallaL: '#b8c0c8', mallaD: '#34322e',
  garza: '#7e8ea4', garzaS: '#56647a', garzaL: '#b8c4d2', pico: '#e0b040',
  sombr0: '#f4f4f0', sombr1: '#3a7ac0', toldo: '#f2f2ec', toldoS: '#c8ccd0', toldoD: '#9aa0a8',
  kraft: '#c89a64', kraftS: '#a87a48', kraftL: '#dcb47e', oxido: '#5aa088', oxidoS: '#3a7464', oxidoL: '#8ac8a8',
  hierroV: '#4a4440', hierroVS: '#2e2a28', hierroVL: '#7a6e64', pizarra: '#5a6470', pizarraS: '#3e4650', pizarraL: '#8a96a2',
  laton: '#d8a840', latonS: '#a87a22', latonL: '#fae08a', tela: '#2a3050', telaS: '#1c2038', telaL: '#3e466c',
  cuaderno: '#e8c440', cuadernoS: '#b8941c', piel: '#e8b088', pielS: '#c08060',
  pared: '#dfe4e6', paredS: '#c8ced2', paredL: '#eef2f2', junta: '#b4bcc2', suelo0: '#8a929c', suelo1: '#a2aab2', suelo2: '#b8c0c6',
  encimera: '#3a4048', encimeraL: '#5a626c', encimeraS: '#262a30', mueble: '#e6e8e4', muebleS: '#b8bcb8', muebleL: '#f6f8f4',
  pantalla: '#14242e', pantallaL: '#2a4656', barra0: '#4ac0c8', barra1: '#e8b040', barra2: '#e86a5a', cristal: '#b8dcec', cristalS: '#8ab4cc',
  caja: '#c8a878', cajaS: '#9a7a50', cajaL: '#e4c89a', hueso: '#eee2c4', huesoS: '#c4b490', huesoD: '#9a8a68',
  barro: '#a8643a', barroS: '#7a4224', barroL: '#c88458', maiz: '#d8a840', maizS: '#a07424', maizL: '#f0cc6a', plomo: '#8a8e96', plomoS: '#5a5e68', plomoL: '#c4c8d0',
  luz: '#fff6d0', luzS: '#f0e2a8',
}).map(([k, v]) => [k, hex(v)]));

// mezcla de dos colores (a 0–1)
function e_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// el umbral de la trama de Bayer 4 × 4 (0–1) y un color de una rampa con trama entre tonos vecinos (v 0–1)
const e_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_umbral = (x, y) => (e_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

const e_rampa = (P, v, x, y) => P[Math.max(0, Math.min(P.length - 1, Math.floor(v * (P.length - 1) + e_umbral(x, y))))];

// los búferes fijos de cada vista (se pintan una vez y se copian en cada fotograma)
const e_CAPAS = new Map();

function e_capa(R, clave, dibuja) {
  let b = e_CAPAS.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); e_CAPAS.set(clave, b); }
  return b;
}

// aclara u oscurece el píxel que ya hay (para luces y sombras que se mueven)
function e_tinta(R, x, y, c, a) { x |= 0; y |= 0; if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, e_mezcla(R.pget(x, y), c, a)); }

// cifras de 3 × 5 (los números de las bolsitas y de la regla)
const e_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function e_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = e_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// el cielo de la costa: degradado tramado de y0 a y1 (sin franjas lisas)
function e_cieloFondo(R, y0, y1) {
  const P = e_P, CI = [P.cielo0, P.cielo1, P.cielo2, P.cielo3, P.cielo4, P.cielo5, P.cielo6, P.cielo7];
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, e_rampa(CI, Math.pow((y - y0) / Math.max(1, y1 - y0), 1.15) * 0.97 + (h(x >> 3, y >> 2, 31) - 0.5) * 0.05, x, y));
}

// el sol con su halo tramado
function e_sol(R, x, y, r) {
  const P = e_P;
  for (let j = -r * 3; j <= r * 3; j++) for (let i = -r * 3; i <= r * 3; i++) { const d = Math.hypot(i, j); if (d > r * 3) continue;
    if (d <= r) R.pset(x + i, y + j, d > r - 1 ? P.solH : P.sol); else if ((1 - (d - r) / (r * 2)) * 0.9 > e_umbral(x + i, y + j) + 0.15) R.pset(x + i, y + j, d < r * 1.8 ? P.solH : P.solH2); }
}

// las nubes de tres tonos (más el blanco del lomo) que derivan a tres velocidades; solo pintan donde la máscara dice cielo
function e_nubes(R, t, M, lista, val = 1) {
  const P = e_P, B = R.buf, T = [P.nube3, P.nube2, P.nube1, P.nube0];
  for (const [x0, y, w, vel, sem] of lista) {
    const cx = ((x0 + t * vel) % (360 + w)) - w * 0.5 - 20, n = 3 + Math.round(w / 9), bolas = [];
    for (let k = 0; k < n; k++) { const u = (k + 0.5) / n, r = (0.32 + 0.5 * Math.sin(u * Math.PI)) * w * 0.2 + h(k, sem, 33) * 2.5; bolas.push([cx + (u - 0.5) * w, y - r * 0.55 + 2, r]); }
    const xa = Math.floor(cx - w / 2 - 6), xb = Math.ceil(cx + w / 2 + 6), ya = Math.floor(y - w * 0.3), yb = y + 3;
    for (let yy = Math.max(0, ya); yy <= Math.min(179, yb); yy++) for (let xx = Math.max(0, xa); xx <= Math.min(319, xb); xx++) {
      if (M[yy * 320 + xx] !== val) continue;
      let dentro = -1; for (const [bx, by, r] of bolas) { const d = Math.hypot((xx - bx) / 1.25, yy - by) / r; if (d < 1) dentro = Math.max(dentro, (by - yy) / r * 0.5 + 0.5 - d * 0.25); }
      if (yy > y + 1) dentro = -1;
      if (dentro < 0) continue;
      B[yy * 320 + xx] = e_rampa(T, Math.min(1, dentro * 1.25 + (yy === y + 1 ? -0.4 : 0)), xx, yy);
    }
  }
}

// un pájaro en vuelo (gaviota: alas en «m» que aletean) o un pelícano (pardo, de aleteo lento)
function e_pajaro(R, x, y, t, k, c = e_P.k, pelicano = false) {
  x = Math.round(x); y = Math.round(y); const a = Math.sin(t * (pelicano ? 4 : 7) + k * 1.7) > 0;
  if (pelicano) { R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x + 2, y, c); R.pset(x + 3, y + 1, e_P.pico); R.pset(x - 1, y + (a ? -1 : 1), c); R.pset(x - 2, y + (a ? -2 : 1), c); R.pset(x + 1, y + (a ? -1 : 1), c); R.pset(x + 2, y + (a ? -2 : 1), c); return; }
  R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 1 : -1), c); R.pset(x + 2, y - (a ? 1 : -1), c);
}

// un roble achaparrado de la costa (live oak): tronco gris torcido con ramas abiertas y la copa baja y plana, peinada
// por el viento, en grumos con luz arriba a la izquierda y sombra abajo; barbas de musgo colgando. cx: el pie del
// tronco; base: y del pie; w: ancho de la copa; alto: alto total; sem: semilla
function e_roble(R, cx, base, w, alto, sem, ramas = 3) {
  const P = e_P, top = base - alto, cyC = top + alto * 0.28, hc = alto * 0.42;
  // el tronco y las ramas, gruesos, que se abren hacia la copa
  const tramo = (x0, y0, x1, y1, w0, w1) => { const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0)); for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + (x1 - x0) * u + Math.sin(u * 5 + sem) * 1.2, y = y0 + (y1 - y0) * u, ww = w0 + (w1 - w0) * u;
    for (let s = -ww; s <= ww; s++) { const e = s / Math.max(1, ww), c = e < -0.4 ? P.tronco3 : e < 0.15 ? P.tronco2 : e < 0.6 ? P.tronco1 : P.tronco0; R.pset(Math.round(x + s), Math.round(y), h(Math.round(x + s), Math.round(y) >> 1, sem) < 0.12 ? P.tronco0 : c); } } };
  tramo(cx, base, cx + (h(sem, 1, 50) - 0.5) * 8, base - alto * 0.38, 4.5, 3.5);
  const jx = cx + (h(sem, 1, 50) - 0.5) * 8, jy = base - alto * 0.38;
  for (let k = 0; k < ramas; k++) { const u = (k + 0.5) / ramas - 0.5; tramo(jx, jy, jx + u * w * 0.8, cyC + hc * 0.3 + h(k, sem, 51) * 4, 3, 1.4); }
  // la copa: la silueta (elipses unidas, aplastadas y más altas a sotavento, la derecha) rellena de sombra, y encima
  // muchos grumos de hojas de 3–7 px, de atrás (arriba) adelante (abajo), cada uno con su luz arriba a la izquierda,
  // su borde de abajo en sombra y alguna hoja suelta clara en el canto
  const bolas = []; const nb = Math.max(4, Math.round(w / 12));
  for (let k = 0; k < nb; k++) { const u = (k + 0.5) / nb - 0.5; bolas.push([cx + u * w * 0.92, cyC - u * hc * 0.35 + (h(k, sem, 52) - 0.5) * hc * 0.4, w / nb * 0.95 + h(k, sem, 53) * 5, hc * (0.55 + h(k, sem, 54) * 0.3)]); }
  const env = (x, y) => { let d = 9; for (const [bx, by, rx, ry] of bolas) d = Math.min(d, Math.hypot((x - bx) / rx, (y - by) / ry)); return d; };
  const HO = [P.hoja0, P.hoja1, P.hoja2, P.hoja3, P.hoja4, P.hoja5], X0 = Math.floor(cx - w / 2 - 12), X1 = Math.ceil(cx + w / 2 + 12), Y0 = Math.floor(top - 6), Y1 = Math.ceil(cyC + hc + 2);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) if (env(x, y) <= 0.97) R.pset(x, y, h(x >> 1, y >> 1, sem + 60) < 0.5 ? P.hoja0 : P.hoja1);
  const grumos = [], n = Math.round(w * hc / 9);
  for (let k = 0; k < n * 3 && grumos.length < n; k++) { const px = X0 + h(k, sem, 64) * (X1 - X0), py = Y0 + h(k, sem, 65) * (Y1 - Y0); if (env(px, py) < 0.95) grumos.push([px, py, 2.6 + h(k, sem, 66) * 3.6]); }
  grumos.sort((p, q) => p[1] - q[1]);
  for (const [px, py, r] of grumos) { const lv = 0.86 - (py - top) / (Y1 - top) * 0.62 + (cx - px) / w * 0.22;
    for (let y = Math.floor(py - r); y <= py + r; y++) for (let x = Math.floor(px - r * 1.2); x <= px + r * 1.2; x++) { const dx = (x + 0.5 - px) / (r * 1.2), dy = (y + 0.5 - py) / r, d = Math.hypot(dx, dy);
      if (d > 1 || env(x, y) > 1.04 + (h(x, y, sem + 67) - 0.5) * 0.12) continue;
      let v = lv - (dx + dy) * 0.22 + (h(x, y, sem + 68) - 0.5) * 0.12; if (d > 0.78 && dx + dy > 0.25) v -= 0.3;
      R.pset(x, y, e_rampa(HO, v, x, y)); }
    if (h(px, py, sem + 69) < 0.5) R.pset(Math.round(px - r * 0.5), Math.round(py - r * 0.6), HO[Math.min(5, Math.round(lv * 5) + 1)]); }
  // las barbas de musgo que cuelgan bajo la copa
  for (let k = 0; k < Math.round(w / 9); k++) { const x = Math.round(cx - w * 0.4 + h(k, sem, 57) * w * 0.8), y0 = Math.round(cyC + hc * (0.45 + h(k, sem, 58) * 0.3)), l = 3 + Math.floor(h(k, sem, 59) * 5);
    for (let j = 0; j < l; j++) R.pset(x + (j > 2 && k % 2 ? 1 : 0), y0 + j, j % 2 ? P.musgoS : P.musgo); }
}

// matas de barrón y de hierba de duna que se mecen (por delante): [x, base, alto, semilla]
function e_matas(R, t, lista) {
  const P = e_P;
  for (const [x0, base, alto, sem] of lista) for (let k = 0; k < 14; k++) {
    const x = x0 + (h(k, sem, 61) - 0.5) * alto * 0.9, a = alto * (0.5 + h(k, sem, 62) * 0.5), v = Math.sin(t * 1.6 + k * 0.7 + sem) * 0.08 + (h(k, sem, 63) - 0.5) * 0.5;
    const c = k % 3 === 0 ? P.junco3 : k % 3 === 1 ? P.junco1 : P.junco0;
    R.linea(Math.round(x), base, Math.round(x + v * a), Math.round(base - a), c);
    if (k % 4 === 0) { const sx = Math.round(x + v * a), sy = Math.round(base - a); R.pset(sx, sy, P.hojarascaL); R.pset(sx + 1, sy + 1, P.hojarascaL); R.pset(sx, sy + 2, P.hojarasca); }   // la espiga
  }
}

// una estaca de madera clavada con su cinta rosa que ondea (x, pie, alto)
function e_estaca(R, x, pie, alto, t, sem) {
  const P = e_P; R.rect(x, pie - alto, x + 1, pie, P.estaca); R.rect(x + 1, pie - alto, x + 1, pie, P.estacaS); R.pset(x, pie - alto, P.estacaS);
  for (let i = 0; i < 6; i++) { const y = pie - alto + 1 + Math.round(Math.sin(t * 6 + i * 0.9 + sem) * (i / 5) * 1.5); R.pset(x + 2 + i, y, i % 2 ? P.cintaS : P.cinta); R.pset(x + 2 + i, y + 1, P.cinta); }
}

// un cubo naranja de obra (x, pie, escala); lleno: con tierra y el mango de una paleta
function e_cubo(R, x, pie, s = 1, lleno = false) {
  const P = e_P, w = Math.round(6 * s), hgt = Math.round(9 * s);
  R.poligono([[x - w - 1, pie - hgt - 1], [x + w + 1, pie - hgt - 1], [x + w - 1, pie + 1], [x - w + 1, pie + 1]], P.k);
  R.poligono([[x - w, pie - hgt], [x + w, pie - hgt], [x + w - 1, pie], [x - w + 1, pie]], (xx) => (xx < x - w * 0.4 ? P.naranjaL : xx > x + w * 0.5 ? P.naranjaS : P.naranja));
  R.rect(x - w, pie - hgt, x + w, pie - hgt + 1, P.naranjaS); R.rect(x - w + 1, pie - Math.round(hgt * 0.45), x + w - 1, pie - Math.round(hgt * 0.45), P.naranjaS);
  if (lleno) { R.rect(x - w + 1, pie - hgt, x + w - 1, pie - hgt, P.tierra1); R.linea(x + 1, pie - hgt, x + 4, pie - hgt - Math.round(7 * s), P.pinoD); R.pset(x + 4, pie - hgt - Math.round(7 * s) - 1, P.pinoS); }
  R.linea(x - w, pie - hgt, x, pie - hgt - Math.round(4 * s), P.metalS); R.linea(x, pie - hgt - Math.round(4 * s), x + w, pie - hgt, P.metalS);
}

// un vecino pequeño de fondo (8–11 px): accion 'criba' (sacude una criba de mano), 'raspa' (de rodillas, con la paleta),
// 'anda' (lleva dos cubos) o 'mira'; ropa y sombrero por la semilla k
function e_vecino(R, x, pie, t, k, accion, dir = 1) {
  const P = e_P, ROPA = [[P.rojo, P.rojoS], [P.lona, P.lonaS], [P.verde, P.verdeS], [hex('#e8d050'), hex('#b8a030')], [P.blanco, P.metal]][k % 5], [c, cs] = ROPA;
  const pelo = [hex('#4a3020'), hex('#c8a060'), hex('#2a2020'), hex('#8a8a8a')][k % 4], somb = k % 2 ? hex('#e8dcb0') : hex('#3a5a8a');
  x = Math.round(x); pie = Math.round(pie);
  if (accion === 'raspa') { // de rodillas: el torso inclinado, el brazo que rasca adelante y atrás
    const y = pie - 7; R.rect(x - 1, y + 4, x + 3, y + 6, hex('#4a5a6a')); R.rect(x - 1, y + 1, x + 2, y + 4, c); R.rect(x + 2, y + 2, x + 2, y + 4, cs);
    R.rect(x + 2, y - 2, x + 4, y + 1, P.piel); R.pset(x + 4, y - 1, P.pielS); R.rect(x + 1, y - 3, x + 5, y - 3, somb); R.rect(x + 2, y - 4, x + 4, y - 4, somb);
    const a = Math.round(Math.sin(t * 5 + k) * 1.5); R.linea(x + 2, y + 2, x + 5 + a, y + 5, c); R.pset(x + 6 + a, y + 6, P.metalL); R.pset(x + 7 + a, y + 6, P.metal);
    return;
  }
  const anda = accion === 'anda', paso = anda ? Math.floor(t * 6 + k) % 2 : 0, y = pie - 10;
  R.rect(x, y + 6, x + 1, pie - (paso ? 1 : 0), hex('#3e4e64')); R.rect(x + 2, y + 6, x + 3, pie - (paso ? 0 : 1), hex('#3e4e64'));
  R.rect(x, y + 2, x + 3, y + 6, c); R.rect(dir > 0 ? x : x + 3, y + 2, dir > 0 ? x : x + 3, y + 6, cs);
  R.rect(x, y - 1, x + 3, y + 1, P.piel); R.pset(dir > 0 ? x + 3 : x, y, P.pielS); R.rect(x, y - 2, x + 3, y - 2, pelo);
  R.rect(x - 1, y - 2, x + 4, y - 2, somb); R.rect(x, y - 3, x + 3, y - 3, somb);
  if (accion === 'criba') { const s = Math.round(Math.sin(t * 9 + k) * 1.5); R.rect(x - 4 + s, y + 4, x + 7 + s, y + 5, P.pinoS); R.rect(x - 3 + s, y + 4, x + 6 + s, y + 4, P.malla); R.pset(x - 1, y + 3, P.piel); R.pset(x + 4, y + 3, P.piel);
    for (let i = 0; i < 3; i++) { const u = (t * 2.2 + i / 3 + k * 0.3) % 1; R.pset(x + i * 2 + s, Math.round(y + 6 + u * 4), P.tierra2); } }
  else if (anda) { for (const sx of [-2, 5]) { R.rect(x + sx, y + 5, x + sx + 1, y + 7, P.naranja); R.pset(x + sx, y + 4, P.metalS); } }
}

const e_GENEX = { hor: 66, cata: [80, 113, 190, 142] };

// la rejilla de cordel: las esquinas del rectángulo en el suelo (lejos y cerca) y sus divisiones
const e_REJ = { fl: [62, 108], fr: [212, 108], nl: [44, 148], nr: [226, 148], cols: 5, filas: 2 };

const e_rejP = (u, v) => { const { fl, fr, nl, nr } = e_REJ; const xl = fl[0] + (nl[0] - fl[0]) * v, xr = fr[0] + (nr[0] - fr[0]) * v; return [xl + (xr - xl) * u, fl[1] + (nl[1] - fl[1]) * v]; };

let e_MASCEX = null;

function e_excavacionFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P, hor = e_GENEX.hor;
  e_cieloFondo(R, 0, hor);
  e_sol(R, 232, 26, 6);
  // la otra orilla, baja y lejana: una franja de monte con copas romas, con bruma
  for (let x = 0; x < 320; x++) { const top = 57 + Math.round(Math.sin(x * 0.05) * 1.5 + Math.sin(x * 0.17 + 1) * 1.2 + h(x >> 2, 0, 70) * 2.2 - (x > 120 && x < 190 ? 2 : 0));
    for (let y = top; y < hor; y++) pset(x, y, y === top ? P.lejos3 : e_rampa([P.lejos1, P.lejos0, P.lejos2, P.lejos3], 0.25 + (h(x >> 1, y, 71) - 0.5) * 0.4 + (y - top) / 12, x, y)); }
  // la ensenada: el agua tramada con olitas (el brillo que se mueve va encima en cada fotograma)
  const AG = [P.agua0, P.agua1, P.agua2, P.agua3];
  for (let y = hor; y < 84; y++) for (let x = 0; x < 320; x++) { const v = 0.75 - (y - hor) / 18 * 0.55 + Math.sin(x * 0.21 + y * 1.7) * 0.12 + (h(x >> 2, y, 72) - 0.5) * 0.15; pset(x, y, e_rampa(AG, v, x, y)); }
  for (let k = 0; k < 70; k++) { const y = hor + 1 + Math.floor(h(k, 1, 73) * 16), x = Math.floor(h(k, 2, 73) * 316), l = 2 + Math.floor(h(k, 3, 73) * 5); rect(x, y, x + l, y, y < 72 ? P.agua3 : P.agua0); }
  // la orilla: arena húmeda y una franja de juncos (las puntas que se mecen, en cada fotograma)
  for (let x = 0; x < 320; x++) { const yo = 82 + Math.round(Math.sin(x * 0.07) * 1.5); for (let y = yo; y < 92; y++) pset(x, y, y < yo + 1 ? P.arena4 : e_rampa([P.junco0, P.junco1, P.junco2, P.juncoS], 0.4 + (h(x, y >> 1, 74) - 0.5) * 0.9, x, y)); }
  // el claro de arena: más claro a lo lejos, granos, hojarasca de roble y agujas, huellas
  const AR = [P.arena0, P.arena1, P.arena2, P.arena3, P.arena4];
  for (let y = 90; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 0.95 - (y - 90) / 90 * 0.5 + (h(x >> 3, y >> 2, 75) - 0.5) * 0.25 + Math.sin(x * 0.04 + y * 0.12) * 0.06; let c = e_rampa(AR, v, x, y);
    const g = h(x, y, 76); if (g < 0.035) c = P.arena0; else if (g > 0.975) c = P.arena5; else if (g > 0.955 && y > 120) c = P.hojarasca; pset(x, y, c); }
  for (let k = 0; k < 150; k++) { const x = Math.floor(h(k, 1, 77) * 318), y = 96 + Math.floor(h(k, 2, 77) * 82), c = [P.hojarasca, P.hojarascaS, P.hojarascaL][k % 3]; pset(x, y, c); pset(x + 1, y, c); if (k % 3 === 0) pset(x, y - 1, P.hojarascaS); }
  // los matorrales bajos de la orilla (barrón y arrayán), oscuros, entre los robles
  for (let x = 0; x < 320; x++) { const top = 86 + Math.round(Math.sin(x * 0.11) * 2 + Math.sin(x * 0.37) * 1.5 + h(x >> 2, 1, 78) * 3 + (x > 70 && x < 200 ? 4 : 0));
    for (let y = top; y < 100 - (x > 70 && x < 200 ? 4 : 0); y++) pset(x, y, e_rampa([P.hoja0, P.hoja1, P.hoja2, P.hoja3], 0.7 - (y - top) / 12 + ((y - top + (x >> 2)) % 4 === 0 ? 0.25 : 0) + (h(x >> 1, y, 79) - 0.5) * 0.3, x, y)); }
  // las sombras de los robles en la arena (tramadas)
  for (const [cx, cy, rx, ry] of [[30, 118, 46, 9], [282, 116, 50, 8]]) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d < 1 && (1 - d) * 1.6 > e_umbral(x, y) && h(x >> 2, y >> 1, 80) > 0.2) e_tinta(R, x, y, P.hojarascaS, 0.32); }
  // los robles: dos a la izquierda y dos a la derecha, de medio plano
  e_roble(R, 40, 120, 92, 66, 3, 4); e_roble(R, 2, 116, 50, 50, 7, 2);
  e_roble(R, 286, 118, 86, 58, 11, 3); e_roble(R, 236, 106, 40, 36, 13, 2);
  // el montón de tierra cribada sobre la lona azul, detrás de la cuadrícula
  poligono([[176, 107], [214, 103], [232, 108], [196, 112]], (x, y) => e_rampa([P.lonaS, P.lona, P.lonaL], 0.5 + ((x + y * 2) % 9 === 0 ? 0.4 : 0) - (y - 103) / 14, x, y));
  for (let y = 94; y < 109; y++) for (let x = 182; x < 224; x++) { const d = Math.hypot((x - 203) / 20, (y - 108) / 13); if (d < 1 && y < 109) pset(x, y, e_rampa([P.tierra1, P.tierra2, P.tierra3, P.arena1], 0.75 - (y - 94) / 16 + (203 - x) / 50 + (h(x, y, 81) - 0.5) * 0.3, x, y)); }
  linea(196, 96, 192, 89, P.pinoD); rect(191, 87, 193, 89, P.metal); pset(192, 87, P.metalL);   // una pala clavada
  // la cuadrícula: el suelo de dentro un poco removido
  poligono([e_rejP(0, 0), e_rejP(1, 0), e_rejP(1, 1), e_rejP(0, 1)], (x, y) => e_rampa(AR, 0.45 - (y - 108) / 90 + (h(x >> 1, y, 82) - 0.5) * 0.35, x, y));
  // una cata pequeña y somera a la izquierda (cerrada con su escalón de 3 px)
  e_cata(R, [66, 112, 90, 112, 86, 128, 62, 128], [[0, 4]]);
  // LA CATA ESCALONADA
  e_cata(R, [86, 113, 182, 113, 190, 142, 80, 142], [[0, 12], [0.5, 22]]);
  // la regla de jalón roja y blanca apoyada en la pared, banderitas rosas, una paleta y un cubo en el borde
  for (let i = 0; i < 18; i++) { const x = 178 - Math.round(i * 0.3), y = 140 - i; pset(x, y, Math.floor(i / 3) % 2 ? P.blanco : P.rojo); pset(x + 1, y, Math.floor(i / 3) % 2 ? P.metalL : P.rojoS); }
  for (const [x, y] of [[100, 133], [122, 137], [150, 140], [164, 139]]) { linea(x, y, x, y - 4, P.metalS); rect(x + 1, y - 4, x + 2, y - 3, P.cinta); }
  e_cubo(R, 194, 146, 1, true); e_cubo(R, 70, 138, 0.8, false);
  // la carretilla verde bajo el roble, con tierra, y una lona doblada
  poligono([[18, 138], [50, 138], [44, 148], [24, 148]], P.k); poligono([[19, 139], [49, 139], [43, 147], [25, 147]], (x, y) => (y < 141 ? P.verdeL : x > 40 ? P.verdeS : P.verde));
  for (let x = 21; x < 48; x++) pset(x, 138 - Math.round(Math.sin((x - 20) / 28 * Math.PI) * 3), P.tierra2); for (let x = 22; x < 46; x++) for (let y = 139 - Math.round(Math.sin((x - 20) / 28 * Math.PI) * 3) + 1; y < 140; y++) pset(x, y, P.tierra1);
  disco(52, 151, 4, P.k); disco(52, 151, 3, P.negro); disco(52, 151, 1, P.metalL); linea(24, 148, 16, 154, P.metalS); linea(44, 147, 51, 150, P.metalS); linea(19, 139, 6, 136, P.metalS); rect(3, 135, 6, 136, P.negro);
  // en la arena de delante (por debajo de los pies): huellas, la esterilla azul de arrodillarse, una paleta, el
  // metro amarillo, una mochila y una botella de agua; ramitas y hojas
  for (let k = 0; k < 26; k++) { const x = 60 + Math.floor(h(k, 1, 97) * 190), y = 150 + Math.floor(h(k, 2, 97) * 26); rect(x, y, x + 1, y, P.arena0); pset(x + (k % 2 ? 2 : -1), y + 1, P.arena1); }
  rect(118, 167, 136, 172, P.k); rect(119, 168, 135, 171, P.lona); rect(119, 168, 135, 168, P.lonaL); for (let x = 121; x < 135; x += 3) pset(x, 170, P.lonaS);
  linea(142, 172, 149, 170, P.pinoD); linea(149, 170, 150, 170, P.k); poligono([[150, 168], [157, 167], [158, 170], [151, 171]], P.metal); linea(150, 168, 157, 167, P.metalL);
  rect(168, 165, 174, 170, P.k); rect(169, 166, 173, 169, P.cuaderno); pset(170, 167, P.k); linea(174, 169, 196, 171, P.cuaderno); for (let x = 176; x < 196; x += 3) pset(x, 170, P.k);
  rect(60, 160, 74, 172, P.k); rect(61, 161, 73, 171, P.verdeS); rect(61, 161, 73, 163, P.verde); rect(63, 165, 71, 169, P.verde); linea(63, 165, 71, 165, P.verdeL); rect(66, 158, 68, 160, P.k);
  rect(78, 163, 81, 171, P.k); rect(79, 164, 80, 170, P.cristal); rect(79, 162, 80, 163, P.lonaS); pset(79, 166, P.blanco);
  for (let k = 0; k < 8; k++) { const x = 30 + Math.floor(h(k, 3, 97) * 260), y = 162 + Math.floor(h(k, 4, 97) * 16); linea(x, y, x + 4, y - 1, P.hojarascaS); pset(x + 2, y - 2, P.hojarasca); }
  // LA MESA PLEGABLE, a la altura de la cintura (el tablero en y 139), con la nevera en la arena delante (la sombrilla va
  // en cada fotograma, porque ondea)
  for (let y = 150; y < 155; y++) for (let x = 250; x < 312; x++) if ((x + y) % 2 === 0) e_tinta(R, x, y, P.arena0, 0.5);
  for (const x of [255, 303]) { linea(x, 142, x - 2, 151, P.metalS); linea(x, 142, x + 2, 151, P.metalD); }
  rect(252, 139, 306, 141, P.k); rect(253, 139, 305, 140, P.toldo); rect(253, 141, 305, 141, P.toldoD);
  // encima: una bandeja con bolsitas, la tablilla y una jarra de agua
  rect(258, 136, 276, 138, P.negro); for (let k = 0; k < 4; k++) { rect(259 + k * 4, 133, 261 + k * 4, 137, P.cristal); pset(260 + k * 4, 134, P.rojo); }
  rect(281, 135, 290, 138, P.pinoS); rect(282, 135, 289, 137, P.blanco); rect(294, 130, 300, 138, P.naranja); rect(294, 130, 300, 131, P.blanco); rect(299, 132, 300, 137, P.naranjaS);
  rect(284, 147, 306, 158, P.k); rect(285, 148, 305, 157, P.rojo); rect(285, 148, 305, 150, P.blanco); rect(285, 156, 305, 157, P.rojoS); rect(290, 149, 300, 149, P.metal);
  // la criba de pie, a la altura de la cintura: patas abiertas, la caja de malla con tierra y el montón de debajo (la
  // tierra que cae, en cada fotograma)
  for (let y = 154; y < 159; y++) for (let x = 212; x < 238; x++) { const d = Math.hypot((x - 225) / 13, (y - 159) / 5); if (d < 1) pset(x, y, e_rampa([P.tierra1, P.tierra2, P.tierra3], 0.8 - d * 0.4 + h(x, y, 84) * 0.2, x, y)); }
  for (const [a, b] of [[204, 208], [214, 210], [234, 238], [244, 240]]) { linea(a, 158, b, 151, P.pinoD); linea(a + 1, 158, b + 1, 151, P.pinoS); }
  poligono([[203, 142], [245, 142], [247, 149], [201, 149]], P.k);
  poligono([[204, 143], [244, 143], [245, 148], [203, 148]], (x, y) => ((x + y) % 2 === 0 ? P.malla : (x - y) % 3 === 0 ? P.mallaL : P.mallaD));
  for (let x = 210; x < 236; x++) { const a = Math.round(Math.sin((x - 210) / 26 * Math.PI) * 3); for (let y = 146 - a; y < 147; y++) pset(x, y, e_rampa([P.tierra1, P.tierra2, P.tierra3], 0.6 - (y - 143) / 6 + h(x, y, 83) * 0.3, x, y)); }
  for (let k = 0; k < 5; k++) { const x = 213 + k * 5, y = 145 - Math.round(Math.sin((x - 210) / 26 * Math.PI) * 2); pset(x, y, P.concha); pset(x + 1, y, P.conchaS); }
  rect(201, 149, 247, 151, P.pinoS); rect(201, 149, 247, 149, P.pinoL); rect(201, 151, 247, 151, P.pinoD); pset(203, 150, P.metalL); pset(245, 150, P.metalL);
}

// una cata vista desde delante: el contorno [xLejosIzq, y, xLejosDer, y, xCercaDer, y, xCercaIzq, y] y sus tramos
// [[desde (0–1 del ancho), hondo en px]]: la pared del fondo con las capas, el suelo de cada tramo y el escalón
function e_cata(R, q, tramos) {
  const P = e_P, [x0, y0, x1, , x2, y2, x3] = q, CAP = (d) => (d < 2 ? P.humus : d < 6 ? P.arena4 : d < 11 ? (d === 6 ? P.capa0 : P.capa1) : d < 17 ? P.tierra1 : P.naranja0);
  for (let k = 0; k < tramos.length; k++) {
    const u0 = tramos[k][0], u1 = k + 1 < tramos.length ? tramos[k + 1][0] : 1, hondo = tramos[k][1], xa = Math.round(x0 + (x1 - x0) * u0), xb = Math.round(x0 + (x1 - x0) * u1);
    // la pared del fondo: capas con su textura (raíces en el humus, conchas blancas en la capa oscura)
    for (let y = y0; y < y0 + hondo; y++) for (let x = xa; x < xb; x++) { const d = y - y0; let c = CAP(d);
      if (d >= 6 && d < 11 && h(x, y, 85) < 0.3) c = h(x, y, 86) < 0.5 ? P.concha : P.conchaS; else if (d < 2 && h(x, y, 87) < 0.15) c = P.tierra2; else if (h(x, y, 88) < 0.08) c = e_mezcla(c, P.k, 0.25);
      if (x < xa + 2 && k > 0) c = e_mezcla(c, P.k, 0.35); R.pset(x, y, c); }
    // el suelo del tramo: la capa a esa hondura, vista de arriba, con marcas de paleta y la sombra junto a la pared
    const yf = y0 + hondo, xl = 0, ca = CAP(Math.min(21, hondo)), cl = e_mezcla(ca, P.arena4, 0.25);
    for (let y = yf; y <= y2; y++) { const v = (y - y0) / (y2 - y0), xL = Math.round(xa + (x3 - x0) * v * (k === 0 ? 1 : 0)), xR = Math.round(xb + (x2 - x1) * v * (k === tramos.length - 1 ? 1 : 0));
      for (let x = xL; x < xR; x++) R.pset(x, y, y < yf + 2 ? e_mezcla(ca, P.k, 0.3) : (x + y * 3) % 11 === 0 ? ca : h(x, y, 89) < 0.1 ? e_mezcla(ca, P.k, 0.2) : cl); }
    // el escalón entre tramos: la cara lateral en sombra
    if (k > 0) { const dh = hondo - tramos[k - 1][1]; for (let y = y0 + tramos[k - 1][1]; y < y0 + hondo; y++) for (let x = xa - 1; x < xa + 2; x++) R.pset(x, y, e_mezcla(CAP(y - y0), P.k, 0.5)); R.linea(xa - 1, y0 + tramos[k - 1][1], xa - 1 + 2, y2, e_mezcla(CAP(tramos[k - 1][1]), P.arena4, 0.2)); void dh; }
    void xl;
  }
  // los bordes de arriba: el labio de arena clara de cerca y las paredes de los lados en sombra
  R.linea(x0, y0 - 1, x1, y0 - 1, P.arena4); R.linea(x3, y2 + 1, x2, y2 + 1, P.arena5); R.linea(x3 - 1, y2 + 2, x2 + 1, y2 + 2, P.arena1);
  R.linea(x0, y0, x3, y2, e_mezcla(P.tierra1, P.k, 0.4)); R.linea(x0 + 1, y0, x3 + 1, y2, e_mezcla(P.tierra2, P.k, 0.2)); R.linea(x1, y0, x2, y2, P.tierra2);
}

function e_excavacion(R, t, o, g) {
  const P = e_P, hor = e_GENEX.hor, B = R.buf;
  R.copiar(e_capa(R, 'hat|excavacion', () => e_excavacionFijo(R)));
  if (!e_MASCEX) { // la máscara: 1 cielo, 2 agua (sale del búfer fijo: los colores del cielo y del agua son solo suyos)
    const b = e_CAPAS.get('hat|excavacion'), S = new Set([P.sol, P.solH, P.solH2, P.cielo0, P.cielo1, P.cielo2, P.cielo3, P.cielo4, P.cielo5, P.cielo6, P.cielo7]), A = new Set([P.agua0, P.agua1, P.agua2, P.agua3]);
    e_MASCEX = new Uint8Array(57600); for (let i = 0; i < 320 * 92; i++) e_MASCEX[i] = S.has(b[i]) ? 1 : A.has(b[i]) ? 2 : 0; }
  const M = e_MASCEX;
  // las nubes: tres capas a tres velocidades (las altas, despacio), lejos del rincón de Atom
  e_nubes(R, t, M, [[40, 38, 46, 1.1, 1], [200, 36, 30, 1.1, 2], [120, 49, 58, 2.0, 3], [300, 52, 40, 2.0, 4], [0, 59, 30, 3.2, 5], [180, 60, 24, 3.2, 6]]);
  // gaviotas altas y una fila de pelícanos rasando el agua
  for (let k = 0; k < 2; k++) e_pajaro(R, ((k * 150 + t * (9 + k * 3)) % 380) - 30, 36 + k * 8 + Math.sin(t * 0.9 + k) * 2, t, k, P.lejos1);
  for (let k = 0; k < 3; k++) e_pajaro(R, 330 - ((t * 7 + 40) % 420) + k * 9, 61 - k + Math.sin(t * 0.7 + k * 0.6), t, k * 2, hex('#5a4a3a'), true);
  // el agua: destellos que corren y el reguero de luz bajo el sol
  for (let k = 0; k < 60; k++) { const y = hor + 1 + Math.floor(h(k, 4, 90) * 16), x = Math.floor((h(k, 5, 90) * 340 + t * (3 + (k % 4))) % 340) - 10, on = Math.sin(t * 3 + k * 2.1) > 0.2;
    if (on) for (let i = 0; i < 2 + (k % 3); i++) { const xx = x + i; if (xx >= 0 && xx < 320 && M[y * 320 + xx] === 2) B[y * 320 + xx] = y < 72 ? P.aguaL : P.agua3; } }
  for (let y = hor + 1; y < 82; y++) { const w = 4 + (y - hor) * 0.6; for (let x = Math.round(232 - w); x <= 232 + w; x++) if (M[y * 320 + x] === 2 && h(x, y + Math.floor(t * 6), 91) < 0.3) B[y * 320 + x] = h(x, y, 92) < 0.4 ? P.aguaB : P.aguaL; }
  // una lancha lejana con su estela
  { const x = Math.round(((t * 5 + 60) % 400) - 40), y = 70; for (let i = 1; i < 14; i++) if (x - i >= 0 && x - i < 320 && (i + Math.floor(t * 8)) % 3) B[(y + 1) * 320 + x - i] = P.aguaB;
    R.rect(x, y - 1, x + 7, y, P.blanco); R.rect(x + 1, y + 1, x + 6, y + 1, P.metalS); R.rect(x + 2, y - 3, x + 4, y - 2, P.metalL); R.pset(x - 1, y, P.negro); }
  // las puntas de los juncos que se mecen con el viento
  for (let x = 0; x < 320; x += 2) { const yo = 83 + Math.round(Math.sin(x * 0.07) * 1.5), a = 3 + Math.floor(h(x, 0, 93) * 5), v = Math.sin(t * 1.8 + x * 0.09) * 1.2 + 0.6;
    R.linea(x, yo + 3, Math.round(x + v), yo + 3 - a, h(x, 1, 93) < 0.5 ? P.junco2 : P.junco3); }
  // LA GARZA en la orilla: el cuello que sube y baja (a ratos pica en el agua) y sus ondas
  { const x = 258, y = 82, u = (t % 6.5) / 6.5, pica = u > 0.8 ? Math.sin((u - 0.8) / 0.2 * Math.PI) : 0, cue = Math.round(-Math.sin(t * 0.8) * 0.8 + pica * 5);
    for (let k = 0; k < 2; k++) { const r = ((t * 4 + k * 6) % 12); for (let i = -r; i <= r; i++) if (h(i, k, 94) < 0.6) R.pset(Math.round(x + 2 + i), y + 1, P.aguaL); }
    R.linea(x + 1, y, x + 1, y - 5, P.garzaS); R.linea(x + 3, y, x + 3, y - 5, P.garzaS);
    R.poligono([[x - 3, y - 6], [x + 5, y - 9], [x + 6, y - 6], [x + 1, y - 4]], (xx, yy) => (yy < y - 7 ? P.garzaL : P.garza)); R.linea(x - 4, y - 5, x - 1, y - 6, P.garzaS);
    const cx = x + 5, cy = y - 9; R.linea(cx, cy, cx + 1, cy - 4 + cue, P.garzaL); R.linea(cx + 1, cy - 4 + cue, cx + 3, cy - 7 + cue, P.garzaL);
    R.rect(cx + 2, cy - 9 + cue, cx + 4, cy - 7 + cue, P.garzaL); R.pset(cx + 3, cy - 9 + cue, P.k); R.linea(cx + 5, cy - 8 + cue + Math.round(pica * 2), cx + 8, cy - 7 + cue + Math.round(pica * 3), P.pico); }
  // las hojas de los robles que tiemblan con el viento y una barba de musgo que oscila
  for (let k = 0; k < 90; k++) { const x = Math.floor(h(k, 1, 95) * 320), y = 56 + Math.floor(h(k, 2, 95) * 50), p = B[y * 320 + x];
    if ((p === P.hoja2 || p === P.hoja3 || p === P.hoja4) && Math.sin(t * 4 + k * 1.3) > 0.4) { B[y * 320 + x] = p === P.hoja4 ? P.hoja5 : P.hoja4; } }
  // los vecinos de fondo: uno criba junto al montón, otro raspa en la cata honda, otro en la pequeña y uno lleva cubos
  e_vecino(R, 222, 104, t, 1, 'criba');
  e_vecino(R, 152, 140, t, 2, 'raspa'); e_vecino(R, 106, 134, t, 4, 'raspa');
  { const u = (t * 0.045) % 1, va = u < 0.5, x = va ? 70 + u * 2 * 110 : 180 - (u - 0.5) * 2 * 110; e_vecino(R, x, 105, t, 3, 'anda', va ? 1 : -1); }
  // la cuadrícula de cordel con sus estacas (por delante de los que trabajan dentro) y las cintas que ondean
  const { cols, filas } = e_REJ;
  for (let i = 0; i <= cols; i++) { const [ax, ay] = e_rejP(i / cols, 0), [bx, by] = e_rejP(i / cols, 1); R.linea(ax, ay, bx, by, P.cordel); }
  for (let j = 0; j <= filas; j++) { const [ax, ay] = e_rejP(0, j / filas), [bx, by] = e_rejP(1, j / filas); R.linea(ax, ay + 1, bx, by + 1, j === filas ? P.cordelS : P.arena1); R.linea(ax, ay, bx, by, P.cordel); }
  for (let i = 0; i <= cols; i++) for (let j = 0; j <= filas; j++) { const [x, y] = e_rejP(i / cols, j / filas), a = 3 + j * 2; R.rect(Math.round(x), Math.round(y) - a, Math.round(x), Math.round(y) + 1, P.estaca); R.pset(Math.round(x) + 1, Math.round(y) - a + 1, P.estacaS);
    if ((i + j) % 2 === 0) for (let q = 0; q < 3 + j; q++) R.pset(Math.round(x) + 1 + q, Math.round(y) - a + Math.round(Math.sin(t * 6 + q + i * 2) * q * 0.3), P.cinta); }
  // la criba de pie: si se sacude, la caja se mueve y cae la tierra fina al montón
  const sac = o.sacude ?? 1, fase = Math.sin(t * 10) * (Math.sin(t * 0.9) > -0.2 ? 1 : 0) * sac;
  if (Math.abs(fase) > 0.05) for (let k = 0; k < 16; k++) { const u = (t * 1.8 + k / 16) % 1, x = 214 + Math.floor(h(k, 1, 96) * 22) + Math.round(fase), y = 152 + Math.round(u * 5); R.pset(x, y, k % 3 ? P.tierra2 : P.tierra3); }
  // LA SOMBRILLA DE RAYAS de la mesa, con su fleco que ondea
  { const cx = 279, top = 86; R.linea(cx, top + 4, cx, 139, P.metalS); R.pset(cx + 1, 110, P.metalL);
    for (let y = top; y <= top + 12; y++) { const w = Math.round(Math.sqrt(Math.max(0, (y - top + 1) / 13)) * 33); for (let x = cx - w; x <= cx + w; x++) { const s = Math.floor((x - cx + 40) / 9) % 2, l = y < top + 3 || (x < cx - w + 2) ? 1 : (x > cx + w - 3 || y > top + 10) ? -1 : 0; R.pset(x, y, s ? (l > 0 ? P.blanco : l < 0 ? P.toldoS : P.sombr0) : (l > 0 ? P.lonaL : l < 0 ? P.lonaS : P.sombr1)); } }
    for (let x = cx - 33; x <= cx + 33; x += 2) R.pset(x, top + 13 + (Math.sin(t * 7 + x * 0.6) > 0 ? 1 : 0), Math.floor((x - cx + 40) / 9) % 2 ? P.toldoS : P.lonaS); R.pset(cx, top - 1, P.metalD); }
  // mosquitos que zumban sobre la cata y junto a la sombrilla
  for (let k = 0; k < 6; k++) { const bx = k < 3 ? 130 : 246, by = k < 3 ? 100 : 112; R.pset(Math.round(bx + Math.sin(t * (5 + k) + k) * 6 + Math.sin(t * 13 + k) * 1.5), Math.round(by + Math.cos(t * (4 + k) + k * 2) * 4), P.k); }
  void g;
}

// el marco (cuatro esquinas: lejos izq, lejos der, cerca der, cerca izq) y la malla de dentro
const e_CRIBA = { fl: [44, 58], fr: [282, 58], nr: [298, 144], nl: [26, 144] };

const e_cribaP = (u, v) => { const { fl, fr, nl, nr } = e_CRIBA; const xl = fl[0] + (nl[0] - fl[0]) * v, xr = fr[0] + (nr[0] - fr[0]) * v; return [xl + (xr - xl) * u, fl[1] + (nl[1] - fl[1]) * v]; };

// el montón de tierra sobre la malla: altura (px hacia arriba) en cada punto, 0 fuera
const e_TIERRA = (x, y) => { const d = Math.hypot((x - 206) / 82, (y - 106) / 20) + (h(x >> 2, y >> 1, 100) - 0.5) * 0.25; return d < 1 ? (1 - d * d) * 6 : 0; };

function e_cribaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P;
  // el suelo de debajo, desenfocado: arena con manchas grandes y suaves, en sombra del roble
  const SU = [P.arena0, P.arena1, P.arena2, P.arena3];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 0.52 + Math.sin(x * 0.03 + y * 0.05) * 0.12 + Math.sin(x * 0.011 - y * 0.02 + 2) * 0.12 + (h(x >> 4, y >> 4, 101) - 0.5) * 0.12 - (y < 30 ? 0 : 0.05); pset(x, y, e_rampa(SU, v, x, y)); }
  // cosas en el suelo, desenfocadas: un cubo naranja arriba a la izquierda y unas hojas de roble
  for (let y = 22; y < 56; y++) for (let x = 0; x < 34; x++) { const d = Math.hypot((x - 10) / 22, (y - 40) / 16); if (d < 1) pset(x, y, e_rampa([P.naranjaS, P.naranja, P.naranjaL], 0.7 - d * 0.6 - (y - 22) / 70, x, y)); }
  for (let y = 30; y < 44; y++) for (let x = 0; x < 24; x++) { const d = Math.hypot((x - 9) / 15, (y - 37) / 7); if (d < 1) pset(x, y, e_rampa([P.tierra0, P.tierra1], 0.5 - d * 0.4, x, y)); }
  for (let k = 0; k < 24; k++) { const x = Math.floor(h(k, 1, 102) * 316), y = Math.floor(h(k, 2, 102) * 176); if ((y > 50 && y < 150 && x > 20 && x < 300) || (y < 26 && x > 14 && x < 176) || (y < 50 && x > 270)) continue; const c = [P.hojarasca, P.hojarascaS, P.hojarascaL][k % 3];
    poligono([[x, y], [x + 4, y - 2], [x + 7, y], [x + 4, y + 2]], c); linea(x + 1, y, x + 6, y, P.hojarascaS); }
  // arriba, en la arena: una raíz del roble que asoma serpenteando, la huella de una bota, bellotas con su capuchón,
  // conchas rotas, piedrecitas y una mata de hierba de duna (todo fuera de la barra del año y del rincón de Atom)
  for (let x = 38; x < 264; x++) { const y = Math.round(38 + Math.sin(x * 0.045) * 6 + Math.sin(x * 0.13 + 1) * 2); pset(x, y - 1, P.hojarascaL); pset(x, y, P.tierra2); pset(x, y + 1, P.tierra0); pset(x, y + 2, e_mezcla(P.arena1, P.k, 0.15));
    if (x % 41 === 0) for (let i = 0; i < 9; i++) { pset(x + i, y + 1 + i, P.tierra1); pset(x + i + 1, y + 1 + i, P.hojarasca); } }
  for (let y = 22; y < 50; y++) for (let x = 112; x < 136; x++) { const tal = y > 42, d = tal ? Math.hypot((x - 124) / 6, (y - 46) / 4) : Math.hypot((x - 124) / 8, (y - 32) / 10); if (d < 1) { const borde = d > 0.8; e_tinta(R, x, y, P.k, borde ? 0.22 : (y % 3 === 0 ? 0.18 : 0.06)); if (borde && y < 34) pset(x, y + 1, P.arena4); } }
  for (const [x, y] of [[66, 28], [92, 50], [152, 26], [206, 48], [240, 30], [184, 24]]) { disco(x + 0.5, y + 1.5, 2, P.k); disco(x + 0.5, y + 1.5, 1.5, hex('#9a6430')); pset(x, y + 1, hex('#c08a4a')); rect(x - 1, y - 1, x + 2, y, hex('#5a4028')); pset(x, y - 1, hex('#7a5a38')); pset(x + 2, y - 1, hex('#3a2a18')); }
  for (let k = 0; k < 22; k++) { const x = 36 + Math.floor(h(k, 1, 114) * 230), y = 22 + Math.floor(h(k, 2, 114) * 28); if (x < 176 && y < 24) continue; if (k % 3) { pset(x, y, P.concha); pset(x + 1, y, P.conchaS); pset(x, y + 1, P.conchaD); } else { disco(x + 0.5, y + 0.5, 1.2, P.metalS); pset(x, y, P.metalL); } }
  for (let k = 0; k < 16; k++) { const x0 = 214 + (k % 8) * 5 + Math.floor(h(k, 1, 115) * 3), a = 12 + Math.floor(h(k, 2, 115) * 14), v = (h(k, 3, 115) - 0.5) * 0.9; linea(x0, 50, Math.round(x0 + v * a + 3), 50 - a, k % 3 === 0 ? P.junco3 : k % 3 === 1 ? P.junco1 : P.junco2); }
  // el montón de tierra fina que ya ha caído debajo de la criba (asoma por delante del marco)
  for (let y = 150; y < 180; y++) for (let x = 60; x < 260; x++) { const d = Math.hypot((x - 160) / 100, (y - 182) / 30); if (d < 1) pset(x, y, e_rampa([P.tierra1, P.tierra2, P.tierra3, P.arena1], 0.9 - d * 0.5 + (160 - x) / 300 + (h(x, y, 103) - 0.5) * 0.3, x, y)); }
  for (let k = 0; k < 34; k++) { const x = 72 + Math.floor(h(k, 1, 116) * 176), y = 166 + Math.floor(h(k, 2, 116) * 13); if (Math.hypot((x - 160) / 100, (y - 182) / 30) > 0.95) continue; const tipo = k % 4;
    if (tipo === 0) { pset(x, y, P.concha); pset(x + 1, y, P.conchaS); pset(x, y - 1, P.blanco); } else if (tipo === 1) { pset(x, y, P.negro); pset(x + 1, y, P.capa1); } else { pset(x, y, P.tierra0); pset(x, y - 1, P.arena2); } }
  // las patas del caballete
  for (const [x0, x1] of [[34, 22], [290, 304]]) { poligono([[x0 - 4, 146], [x0 + 4, 146], [x1 + 4, 180], [x1 - 4, 180]], (x, y) => (x < (x0 + (x1 - x0) * (y - 146) / 34) - 1 ? P.pinoL : P.pinoS)); }
  // LA MALLA: debajo se ve oscuro (la sombra del montón y del suelo), los alambres en rejilla de 4 px con brillo
  const { fl, fr, nl, nr } = e_CRIBA;
  poligono([fl, fr, nr, nl], (x, y) => e_rampa([P.mallaD, P.tierra0, P.tierra1], 0.35 + (h(x >> 2, y >> 2, 104) - 0.5) * 0.4, x, y));
  for (let j = 0; j <= 30; j++) { const v = j / 30, [ax, ay] = e_cribaP(0, v), [bx, by] = e_cribaP(1, v); linea(ax, ay, bx, by, P.malla); linea(ax, ay + 1, bx, by + 1, e_mezcla(P.malla, P.k, 0.4)); }
  for (let i = 0; i <= 64; i++) { const u = i / 64, [ax, ay] = e_cribaP(u, 0), [bx, by] = e_cribaP(u, 1); linea(ax, ay, bx, by, i % 2 ? P.malla : P.mallaL); }
  // la tierra sobre la malla: grumos con luz arriba a la izquierda, conchas, piedrecitas, carbón, raíces y un tiesto
  for (let y = 80; y < 132; y++) for (let x = 112; x < 300; x++) { const a = e_TIERRA(x, y); if (a <= 0) continue; const yy = Math.round(y - a);
    const cel = h(x >> 2, y >> 1, 105), v = 0.35 + a / 6 * 0.35 + (206 - x) / 400 + (cel - 0.5) * 0.4 + ((y + (x >> 2)) % 3 === 0 ? 0.12 : 0);
    for (let q = yy; q <= y; q++) pset(x, q, e_rampa([P.tierra0, P.tierra1, P.tierra2, P.tierra3, P.arena1], q === yy ? v + 0.15 : v - 0.15, x, q)); }
  for (let k = 0; k < 42; k++) { const x = 130 + Math.floor(h(k, 1, 106) * 150), y = 92 + Math.floor(h(k, 2, 106) * 30), a = e_TIERRA(x, y); if (a <= 0.4) continue; const yy = Math.round(y - a), tipo = k % 6;
    if (tipo === 0 || tipo === 1) { // ostra: lámina irregular gris clara con capas
      poligono([[x - 4, yy], [x, yy - 2], [x + 5, yy - 1], [x + 3, yy + 2], [x - 2, yy + 2]], (xx, y2) => ((xx + y2) % 3 === 0 ? P.conchaS : y2 < yy ? P.blanco : P.concha)); linea(x - 3, yy + 2, x + 3, yy + 2, P.conchaD); }
    else if (tipo === 2) { // almeja: medio disco con estrías
      for (let i = -3; i <= 3; i++) for (let j = 0; j <= 3 - Math.abs(i) * 0.6; j++) pset(x + i, yy - j, (i + 9) % 2 ? P.concha : P.conchaS); pset(x, yy - 3, P.blanco); }
    else if (tipo === 3) { disco(x, yy, 1.6, P.metalS); pset(x - 1, yy - 1, P.metalL); }   // piedrecita
    else if (tipo === 4) { rect(x, yy, x + 2, yy + 1, P.negro); pset(x, yy, P.capa1); }   // carbón
    else { linea(x - 4, yy, x + 3, yy - 1, P.hojarascaL); linea(x + 3, yy - 1, x + 6, yy + 1, P.hojarasca); } }   // raíz
  // un tiesto de cerámica de concha (pardo con marcas de cordel)
  poligono([[150, 104], [160, 101], [164, 107], [153, 109]], (x, y) => ((x * 2 + y) % 4 === 0 ? P.barroS : y < 104 ? P.barroL : P.barro)); linea(153, 109, 164, 107, P.barroS);
  // EL MARCO de pino: cuatro tablas con vetas, la testa en las esquinas y los tornillos
  const tabla = (pts, vert) => poligono(pts, (x, y) => { const g = vert ? x : y, vv = h(Math.floor(g / 2), vert ? y >> 3 : x >> 3, 107); return (vert ? (y + Math.round(Math.sin(x * 0.7) * 2)) % 9 === 0 : (x + Math.round(Math.sin(y * 0.5) * 3)) % 13 === 0) ? P.pinoS : vv < 0.15 ? P.pinoS : vv > 0.85 ? P.pinoL : P.pino; });
  tabla([[fl[0] - 6, fl[1] - 6], [fr[0] + 6, fr[1] - 6], [fr[0], fr[1]], [fl[0], fl[1]]], false);
  tabla([[nl[0], nl[1]], [nr[0], nr[1]], [nr[0] + 9, nr[1] + 9], [nl[0] - 9, nl[1] + 9]], false);
  tabla([[fl[0] - 6, fl[1] - 6], [fl[0], fl[1]], [nl[0], nl[1]], [nl[0] - 9, nl[1] + 9]], true);
  tabla([[fr[0], fr[1]], [fr[0] + 6, fr[1] - 6], [nr[0] + 9, nr[1] + 9], [nr[0], nr[1]]], true);
  // los cantos: luz por arriba, sombra en la cara de delante de la tabla de cerca
  linea(fl[0] - 6, fl[1] - 6, fr[0] + 6, fr[1] - 6, P.pinoL); linea(fl[0] - 6, fl[1] - 6, nl[0] - 9, nl[1] + 9, P.pinoL);
  linea(fl[0], fl[1], fr[0], fr[1], P.pinoD); linea(fl[0], fl[1], nl[0], nl[1], P.pinoD); linea(fr[0], fr[1], nr[0], nr[1], P.pinoS);
  poligono([[nl[0] - 9, nl[1] + 9], [nr[0] + 9, nr[1] + 9], [nr[0] + 9, nr[1] + 15], [nl[0] - 9, nl[1] + 15]], (x, y) => ((x + Math.round(Math.sin(y) * 2)) % 17 === 0 ? P.pinoD : y > nl[1] + 13 ? P.pinoD : P.pinoS));
  for (const [x, y] of [[fl[0] - 3, fl[1] - 3], [fr[0] + 3, fr[1] - 3], [nl[0] - 4, nl[1] + 4], [nr[0] + 4, nr[1] + 4]]) { disco(x, y, 1.5, P.metalD); pset(x, y, P.metalL); }
  // la tablilla de la arqueóloga, apoyada en el marco de la izquierda: papel con renglones (sin letras) y la pinza
  poligono([[4, 98], [36, 102], [32, 158], [0, 154]], P.k); poligono([[5, 99], [35, 103], [31, 157], [1, 153]], (x, y) => (x < 4 ? P.pinoS : P.pino));
  poligono([[8, 104], [32, 107], [29, 152], [5, 149]], (x, y) => (y > 149 ? P.toldoS : P.blanco));
  for (let k = 0; k < 9; k++) { const y = 114 + k * 4; linea(9, y, 9 + 11 + Math.round(h(k, 1, 108) * 8), y + 2, P.metal); }
  for (let k = 0; k < 3; k++) rect(10, 113 + k * 4, 11, 114 + k * 4, P.lonaS);
  rect(13, 100, 25, 104, P.metalD); rect(14, 100, 24, 102, P.metalL); rect(17, 98, 21, 99, P.metal);   // la pinza
  // sobre la malla, a la izquierda: una paleta de obra, una brocha y tierra suelta con alguna concha
  for (let k = 0; k < 60; k++) { const x = 52 + Math.floor(h(k, 1, 109) * 80), y = 70 + Math.floor(h(k, 2, 109) * 66); pset(x, y, [P.tierra1, P.tierra2, P.tierra3][k % 3]); if (k % 4 === 0) pset(x + 1, y, P.tierra1); if (k % 9 === 0) { pset(x, y - 1, P.concha); pset(x + 1, y - 1, P.conchaS); } }
  poligono([[70, 120], [88, 116], [92, 124], [74, 129]], P.k); poligono([[71, 121], [87, 117], [90, 123], [74, 127]], (x, y) => (y < 121 ? P.metalL : P.metal)); linea(74, 124, 88, 120, P.metalS);
  linea(91, 120, 104, 116, P.k); linea(91, 121, 104, 117, P.pinoD); linea(92, 119, 103, 116, P.pinoS); rect(103, 115, 107, 118, P.pinoD);
  linea(60, 92, 80, 86, P.k); linea(60, 93, 80, 87, P.rojoS); linea(61, 92, 79, 87, P.rojo); for (let i = 0; i < 6; i++) linea(80 + i, 85 + (i % 2), 84 + i, 82 + (i % 3), P.hojarascaS);
}
function e_criba(R, t, o, g) {
  const P = e_P, B = R.buf;
  R.copiar(e_capa(R, 'hat|criba', () => e_cribaFijo(R)));
  const im = Math.max(0, Math.min(1, o.iman ?? 0)), esc = Math.max(0, Math.min(1, o.escamas ?? 0)), gag = Math.max(0, Math.min(1, o.gag ?? 0));
  // la luz entre las hojas del roble: manchas claras que se mueven despacio
  for (let k = 0; k < 7; k++) { const cx = 30 + k * 44 + Math.sin(t * 0.35 + k) * 10, cy = 40 + (k % 3) * 40 + Math.cos(t * 0.27 + k * 2) * 6, rx = 13 + (k % 3) * 4, ry = 7 + (k % 2) * 3;
    for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d < 1 && (1 - d) * 1.5 > e_umbral(x, y)) e_tinta(R, x, y, P.luz, 0.22); } }
  // la tierra fina que sigue cayendo por debajo de la malla al montón
  for (let k = 0; k < 26; k++) { const u = (t * (1.2 + (k % 3) * 0.3) + h(k, 1, 110)) % 1, x = 90 + Math.floor(h(k, 2, 110) * 140), y = 160 + Math.round(u * 16); R.pset(x, y, k % 3 ? P.tierra2 : P.tierra3); if (k % 4 === 0) R.pset(x, y - 1, P.tierra1); }
  // una hormiga que cruza el marco de lejos
  { const x = Math.round(((t * 9) % 300) + 10), y = 54 + Math.round((x - 40) * 0); if (x > 40 && x < 284) { R.pset(x, y, P.k); R.pset(x + 1, y, P.k); R.pset(x + 2, y, P.k); R.pset(x + 1, y - 1, P.negro); R.pset(x + (Math.floor(t * 12) % 2), y + 1, P.k); } }
  // EL IMÁN: la altura según o.iman (0 alto, 1 posado en la tierra)
  const cx = 262, top = Math.round(46 + im * 26), r0 = 20, r1 = 8, cy = top + r0, fondo = cy + 16;
  // su sombra sobre la tierra, más cerca y más oscura según baja
  { const sx = cx + 10 - im * 6, sy = 112, a = 0.15 + im * 0.25; for (let y = sy - 4; y <= sy + 4; y++) for (let x = Math.round(sx - 18); x <= sx + 18; x++) { const d = Math.hypot((x - sx) / 18, (y - sy) / 4.5); if (d < 1 && (1 - d) * 2 > e_umbral(x, y) && Math.abs(x - sx) > 4 - im * 2) e_tinta(R, x, y, P.k, a); } }
  // las escamas que esperan en la tierra: puntitos gris azulado que destellan (y saltan cuando el imán está cerca)
  const nEsc = Math.round(esc * 90);
  for (let k = 0; k < 14; k++) { const x = 240 + Math.floor(h(k, 1, 111) * 46), y0 = 100 + Math.floor(h(k, 2, 111) * 12), salta = im > 0.8 && k >= Math.round(esc * 14) ? Math.round((im - 0.8) * 10 * Math.abs(Math.sin(t * 9 + k))) : 0;
    if (k < Math.round(esc * 14)) continue; const y = Math.round(y0 - e_TIERRA(x, y0) - salta); R.pset(x, y, Math.sin(t * 5 + k * 2.3) > 0.6 ? P.aguaB : C.hierro); }
  // el cuerpo de herradura: rojo con luz a la izquierda, el canto oscuro detrás (grosor) y los polos de acero
  const dentroIman = (x, y) => { const dx = x + 0.5 - cx, dy = y + 0.5 - cy; if (dy <= 0) { const d = Math.hypot(dx, dy); return d <= r0 && d >= r1; } return y <= fondo && Math.abs(dx) <= r0 && Math.abs(dx) >= r1; };
  for (let y = top - 1; y <= fondo + 2; y++) for (let x = cx - r0 - 1; x <= cx + r0 + 3; x++) {
    const en = dentroIman(x, y), detras = dentroIman(x - 2, y - 1);
    if (en) { const dx = x + 0.5 - cx, dy = y + 0.5 - cy, lado = dy <= 0 ? (Math.hypot(dx, dy) - r1) / (r0 - r1) : (Math.abs(dx) - r1) / (r0 - r1);
      const izq = dx < 0, acero = y > fondo - 7; let c;
      if (acero) c = lado > 0.8 ? P.metalS : lado < 0.25 ? P.metalL : P.metal; else c = (izq ? lado > 0.55 : lado < 0.35) ? C.iman : (izq ? P.rojoL : P.rojoS);
      if (!acero && dy <= 0 && Math.hypot(dx, dy) > r0 - 1.2) c = P.rojoL; if (y === fondo - 7) c = P.k;
      R.pset(x, y, c); }
    else if (detras) R.pset(x, y, P.rojoS);
    else if (dentroIman(x - 1, y) || dentroIman(x + 1, y) || dentroIman(x, y - 1) || dentroIman(x, y + 1)) R.pset(x, y, P.k);
  }
  for (let a = -2.7; a <= -0.7; a += 0.06) R.pset(Math.round(cx + Math.cos(a) * (r0 - 4)), Math.round(cy + Math.sin(a) * (r0 - 4)), P.blanco); R.linea(cx - r0 + 4, cy, cx - r0 + 4, fondo - 9, P.blanco);   // el brillo del lomo
  const polos = [[cx - 14, fondo + 1], [cx + 14, fondo + 1]];
  // LAS ESCAMAS DE HIERRO pegadas a los polos: un halo de luz tramado, una barba de copos que cuelga de cada punta
  // (borde oscuro, cara gris azulada, la cara de arriba clara) y destellos de cuatro puntas que van y vienen
  if (esc > 0) {
    for (const [px, py] of polos) for (let y = py - 4; y <= py + 14; y++) for (let x = px - 12; x <= px + 12; x++) { const d = Math.hypot((x - px) / 12, (y - py - 4) / 10); if (d < 1 && (1 - d) * 1.6 * esc > e_umbral(x, y) && !dentroIman(x, y)) e_tinta(R, x, y, P.k, 0.4); }
    for (let k = 0; k < nEsc; k++) { const p = polos[k % 2], fila = Math.floor(Math.pow(h(k, 4, 112), 1.4) * (2 + esc * 8)), x = Math.round(p[0] + (h(k, 5, 112) - 0.5) * (14 - fila * 0.9)), y = Math.round(p[1] + fila - 1), on = Math.sin(t * 6 + k * 1.9) > 0.6 - esc * 0.3;
      R.pset(x, y + 1, P.k); R.pset(x + 1, y + 1, P.k); R.pset(x, y, on ? P.blanco : C.hierroL); R.pset(x + 1, y, on ? P.aguaB : C.hierro); if (k % 3 === 0) R.pset(x, y - 1, P.aguaB); }
    for (let k = 0; k < 8; k++) { const u = (t * 1.1 + k * 0.29) % 1; if (u > 0.4 || k / 8 > esc) continue; const p = polos[k % 2], x = Math.round(p[0] + (h(k, 6, 112) - 0.5) * 12), y = Math.round(p[1] + h(k, 7, 112) * 7), l = u < 0.1 || u > 0.3 ? 2 : 4;
      R.pset(x, y, P.blanco); for (let i = 1; i <= l; i++) { const c = i === l ? P.aguaL : P.aguaB; R.pset(x - i, y, c); R.pset(x + i, y, c); R.pset(x, y - i, c); R.pset(x, y + i, c); } }
  }
  // EL GAG: el clip vuela desde la tablilla y la moneda desde la tierra hasta los lados del imán
  const ease = (u) => u * u * (3 - 2 * u), ug = ease(gag);
  const clip0 = [16, 112], clip1 = [cx - r0 - 8, fondo - 12], mon0 = [222, 104], mon1 = [cx + r0 + 3, fondo - 4];
  const clip = [Math.round(clip0[0] + (clip1[0] - clip0[0]) * ug), Math.round(clip0[1] + (clip1[1] - clip0[1]) * ug - Math.sin(ug * Math.PI) * 30)];
  const mon = [Math.round(mon0[0] + (mon1[0] - mon0[0]) * ug), Math.round(mon0[1] + (mon1[1] - mon0[1]) * ug - Math.sin(ug * Math.PI) * 14)];
  { const [x, y] = clip, sw = gag >= 1 ? Math.round(Math.sin(t * 3) * 1) : 0; // el clip de alambre: dos lazos
    R.linea(x - 1, y - 1 + sw, x + 8, y - 1 + sw, P.k); R.linea(x - 1, y + 4, x + 8, y + 4, P.k); R.linea(x, y + sw, x + 8, y + sw, P.blanco); R.linea(x, y + 3, x + 8, y + 3, P.metalL); R.linea(x - 1, y + 1, x - 1, y + 2, P.metalL); R.linea(x + 9, y + 1, x + 9, y + 2, P.metal); R.linea(x + 2, y + 1, x + 7, y + 1, P.metal); R.linea(x + 2, y + 2, x + 7, y + 2, P.metalS); }
  { const [x, y] = mon; if (gag <= 0) { R.disco(x, y + 1, 3.2, P.tierra1); }
    R.disco(x, y, 3.2, P.k); R.disco(x, y, 2.5, P.latonS); R.disco(x - 0.5, y - 0.5, 1.6, P.laton); R.pset(x - 1, y - 1, Math.sin(t * 4) > 0 ? P.blanco : P.latonL); }
  g.iman = [cx + 21, top + 12]; g.brazo = [320, top + 40]; g.polos = polos; g.clip = clip; g.moneda = mon;
}

function e_mesaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P;
  e_cieloFondo(R, 0, 76);
  // la otra orilla lejana y la ensenada que se ve a la izquierda y por debajo del toldo
  for (let x = 0; x < 320; x++) { const top = 70 + Math.round(Math.sin(x * 0.06 + 2) * 1.5 + h(x >> 2, 0, 120) * 2); for (let y = top; y < 77; y++) pset(x, y, e_rampa([P.lejos1, P.lejos0, P.lejos2, P.lejos3], 0.3 + (y - top) / 10 + (h(x, y, 121) - 0.5) * 0.3, x, y)); }
  for (let y = 77; y < 90; y++) for (let x = 0; x < 320; x++) pset(x, y, e_rampa([P.agua0, P.agua1, P.agua2, P.agua3], 0.7 - (y - 77) / 13 * 0.5 + Math.sin(x * 0.23 + y * 1.9) * 0.12, x, y));
  for (let x = 0; x < 320; x++) { const yo = 89 + Math.round(Math.sin(x * 0.09) * 1); for (let y = yo; y < 96; y++) pset(x, y, e_rampa([P.junco0, P.junco1, P.junco2], 0.5 + (h(x, y, 122) - 0.5) * 0.9, x, y)); }
  // la arena del claro, de lejos (clara) a cerca, con hojarasca, y la sombra fresca bajo el toldo
  const AR = [P.arena0, P.arena1, P.arena2, P.arena3, P.arena4];
  for (let y = 95; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 0.92 - (y - 95) / 85 * 0.45 + (h(x >> 3, y >> 2, 123) - 0.5) * 0.25 + Math.sin(x * 0.05 + y * 0.1) * 0.05; const g = h(x, y, 124);
    let c = e_rampa(AR, v, x, y); if (g < 0.03) c = P.arena0; else if (g > 0.975) c = P.arena5; else if (g > 0.958 && y > 118) c = P.hojarasca; pset(x, y, c); }
  for (let k = 0; k < 90; k++) { const x = Math.floor(h(k, 1, 125) * 318), y = 100 + Math.floor(h(k, 2, 125) * 78), c = [P.hojarasca, P.hojarascaS, P.hojarascaL][k % 3]; pset(x, y, c); pset(x + 1, y, c); }
  // la excavación lejana al fondo (entre el roble y el toldo): la cuadrícula pequeña, la lona y un montón de tierra
  poligono([[150, 101], [236, 101], [244, 108], [146, 108]], (x, y) => e_rampa(AR, 0.45 + (h(x, y, 126) - 0.5) * 0.3, x, y));
  for (let i = 0; i <= 6; i++) linea(150 + i * 14.3, 101, 146 + i * 16.3, 108, P.cordel); linea(150, 101, 236, 101, P.cordel); linea(146, 108, 244, 108, P.cordel);
  rect(170, 103, 200, 106, P.tierra1); rect(170, 103, 200, 103, P.capa1);
  poligono([[250, 104], [282, 101], [292, 106], [258, 108]], (x, y) => ((x + y) % 7 === 0 ? P.lonaL : P.lona));
  for (let y = 94; y < 105; y++) for (let x = 254; x < 286; x++) { const d = Math.hypot((x - 270) / 16, (y - 105) / 10); if (d < 1) pset(x, y, e_rampa([P.tierra1, P.tierra2, P.tierra3], 0.8 - (y - 94) / 14 + (270 - x) / 40, x, y)); }
  // matorral bajo al fondo y un roble grande a la izquierda que enmarca (con la copa por debajo del año)
  for (let x = 0; x < 320; x++) { const top = 90 + Math.round(Math.sin(x * 0.13) * 2 + h(x >> 2, 1, 127) * 3); if (x > 140 && x < 300) continue; for (let y = top; y < 100; y++) pset(x, y, e_rampa([P.hoja0, P.hoja1, P.hoja2, P.hoja3], 0.7 - (y - top) / 10 + (h(x >> 1, y, 128) - 0.5) * 0.3, x, y)); }
  for (let y = 132; y < 146; y++) for (let x = 0; x < 90; x++) { const d = Math.hypot((x - 40) / 52, (y - 139) / 7); if (d < 1 && (1 - d) * 1.6 > e_umbral(x, y) && h(x >> 2, y >> 1, 129) > 0.25) e_tinta(R, x, y, P.hojarascaS, 0.3); }
  e_roble(R, 34, 140, 104, 104, 21, 4);
  // EL TOLDO: el techo a dos aguas visto desde fuera, las patas de aluminio y la sombra en la arena
  for (let y = 140; y < 172; y++) for (let x = 112; x < 318; x++) { const d = Math.hypot((x - 214) / 106, (y - 156) / 16); if (d < 1 && (1 - d) * 2.2 > e_umbral(x, y)) e_tinta(R, x, y, hex('#6a5a44'), 0.3); }
  for (const [x, y0, y1] of [[140, 50, 140], [292, 50, 140]]) { rect(x, y0, x + 1, y1, P.metalS); pset(x, y0, P.metalL); }   // las patas de atrás
  poligono([[112, 52], [206, 30], [318, 52]], (x, y) => { const s = (x - 206) / 106, l = s < 0 ? 0.75 + (y - 30) / 22 * 0.2 : 0.45 + (y - 30) / 22 * 0.15; return e_rampa([P.toldoD, P.toldoS, P.toldo, P.blanco], l + ((x + 7) % 26 === 0 ? -0.3 : 0), x, y); });
  linea(112, 52, 206, 30, P.blanco); linea(206, 30, 318, 52, P.toldoS); rect(204, 28, 207, 30, P.metalS);
  // (la mesa entera, 6 px más abajo que su dibujo: a la altura de la cintura de un chibi de pie en y 162)
  const DY = 6, rT = (a, b, c, d, k) => rect(a, b + DY, c, d + DY, k), lT = (a, b, c, d, k) => linea(a, b + DY, c, d + DY, k), pT = (a, b, k) => pset(a, b + DY, k), dT = (a, b, r, k) => disco(a, b + DY, r, k), gT = (pts, k) => poligono(pts.map(([x, y]) => [x, y + DY]), k);
  // EL TABLERO de la mesa plegable con su papel kraft (las piezas encima van en cada fotograma: las coloca la escena)
  rT(128, 127, 306, 147, P.k);
  gT([[130, 128], [304, 128], [306, 146], [128, 146]], (x, y) => e_rampa([P.kraftS, P.kraft, P.kraftL], 0.55 - (y - 128) / 60 + ((x * 3 + y * 7) % 23 === 0 ? 0.35 : 0) + (h(x >> 3, y >> 2, 130) - 0.5) * 0.25, x, y));
  for (let k = 0; k < 4; k++) lT(132 + k * 45, 128, 128 + k * 47, 146, P.kraftS);   // los pliegues del papel
  rT(126, 147, 308, 150, P.toldoS); rT(126, 147, 308, 147, P.blanco); rT(126, 150, 308, 150, P.toldoD);
  for (const [x, d] of [[132, -1], [302, 1]]) { lT(x, 151, x - 3 * d, 160, P.metalS); lT(x + 1, 151, x + 1 + 3 * d, 160, P.metalD); lT(x - 2 * d, 157, x + 1 + 2 * d, 157, P.metal); }
  // debajo: una caja de bandejas y una nevera
  rT(160, 150, 196, 160, P.k); rT(161, 151, 195, 159, P.cajaS); rT(161, 151, 195, 152, P.caja); for (let x = 166; x < 192; x += 8) rT(x, 154, x + 4, 155, P.cajaL);
  rT(256, 148, 286, 161, P.k); rT(257, 149, 285, 160, P.rojo); rT(257, 149, 285, 151, P.blanco); rT(257, 159, 285, 160, P.rojoS); rT(264, 152, 278, 152, P.metal);
  // en el tablero, al fondo: la caja de bolsitas de hallazgos (raya roja y número), el cuaderno amarillo, la cámara,
  // la jarra de agua y el cepillo
  rT(132, 121, 170, 129, P.k); rT(133, 122, 169, 128, P.cajaL); rT(133, 122, 169, 123, P.blanco);
  for (let k = 0; k < 6; k++) { const x = 135 + k * 6; rT(x, 117 + (k % 2), x + 4, 127, P.cristalS); rT(x, 118 + (k % 2), x + 4, 120 + (k % 2), P.blanco); rT(x, 121 + (k % 2), x + 4, 121 + (k % 2), P.rojo); pT(x + 1, 124, P.tierra1); pT(x + 3, 125, P.tierra2); }
  rT(176, 123, 190, 131, P.cuadernoS); rT(176, 123, 189, 130, P.cuaderno); for (let k = 0; k < 3; k++) lT(178, 125 + k * 2, 186, 125 + k * 2, P.cuadernoS);
  rT(262, 118, 280, 127, P.k); rT(263, 119, 279, 126, P.negro); dT(271, 123, 3.5, P.k); dT(271, 123, 2.5, P.metalD); pT(270, 122, P.blanco); rT(265, 117, 268, 118, P.negro); pT(277, 120, P.rojo);
  rT(288, 112, 300, 128, P.k); rT(289, 113, 299, 127, P.naranja); rT(289, 113, 299, 115, P.blanco); rT(297, 116, 299, 126, P.naranjaS); rT(301, 117, 303, 123, P.k);
  rT(204, 125, 220, 127, P.pinoD); rT(204, 124, 210, 124, P.pinoS); for (let x = 211; x < 221; x++) pT(x, 124, P.negro);
}

function e_mesa(R, t, o, g) {
  const P = e_P, B = R.buf;
  R.copiar(e_capa(R, 'hat|mesa', () => e_mesaFijo(R)));
  if (!e_MASCMESA) { const b = e_CAPAS.get('hat|mesa'), S = new Set([P.cielo0, P.cielo1, P.cielo2, P.cielo3, P.cielo4, P.cielo5, P.cielo6, P.cielo7]), A = new Set([P.agua0, P.agua1, P.agua2, P.agua3]);
    e_MASCMESA = new Uint8Array(57600); for (let i = 0; i < 320 * 100; i++) e_MASCMESA[i] = S.has(b[i]) ? 1 : A.has(b[i]) ? 2 : 0; }
  const M = e_MASCMESA;
  e_nubes(R, t, M, [[60, 40, 40, 1.0, 7], [230, 48, 30, 1.0, 8], [150, 58, 52, 1.8, 9], [10, 64, 26, 2.8, 10]]);
  e_pajaro(R, ((t * 11 + 120) % 380) - 30, 50 + Math.sin(t) * 2, t, 3, P.lejos1);
  // el agua que brilla
  for (let k = 0; k < 40; k++) { const y = 78 + Math.floor(h(k, 4, 131) * 11), x = Math.floor((h(k, 5, 131) * 340 + t * (3 + (k % 3))) % 340) - 10; if (Math.sin(t * 3 + k * 2.1) > 0.3) for (let i = 0; i < 3; i++) { const xx = x + i; if (xx >= 0 && xx < 320 && M[y * 320 + xx] === 2) B[y * 320 + xx] = P.aguaL; } }
  // las puntas de los juncos que se mecen
  for (let x = 0; x < 320; x += 2) { const yo = 90 + Math.round(Math.sin(x * 0.09)), v = Math.sin(t * 1.8 + x * 0.09) + 0.5; if (B[(yo + 1) * 320 + x] !== P.junco0 && B[(yo + 1) * 320 + x] !== P.junco1 && B[(yo + 1) * 320 + x] !== P.junco2) continue; R.linea(x, yo + 2, Math.round(x + v), yo - 2 - Math.floor(h(x, 0, 132) * 3), P.junco3); }
  // una garceta blanca en la orilla y los vecinos que criban y raspan al fondo
  { const x = 236, y = 92, cue = Math.round(Math.sin(t * 0.9) * 1); R.linea(x, y, x, y - 3, P.k); R.linea(x + 2, y, x + 2, y - 3, P.k); R.rect(x - 1, y - 6, x + 3, y - 4, P.blanco); R.pset(x - 2, y - 5, P.toldoS); R.linea(x + 3, y - 6, x + 4, y - 10 + cue, P.blanco); R.pset(x + 5, y - 10 + cue, P.k); R.pset(x + 6, y - 10 + cue, P.k); }
  e_vecino(R, 248, 101, t, 2, 'criba'); e_vecino(R, 186, 104, t, 0, 'raspa'); e_vecino(R, 160, 100, t + 2, 3, 'mira');
  // las hojas que tiemblan
  for (let k = 0; k < 60; k++) { const x = Math.floor(h(k, 1, 133) * 100), y = 34 + Math.floor(h(k, 2, 133) * 50), p = B[y * 320 + x]; if ((p === P.hoja2 || p === P.hoja3 || p === P.hoja4) && Math.sin(t * 4 + k * 1.3) > 0.4) B[y * 320 + x] = p === P.hoja4 ? P.hoja5 : P.hoja4; }
  // el faldón del toldo con sus ondas, y las patas de delante
  for (let x = 112; x <= 318; x++) { const y0 = 52, w = Math.sin(t * 3 + x * 0.12) * 0.8 + Math.sin(t * 5.3 + x * 0.31) * 0.4, fin = 58 + Math.round(w) + ((x - 112) % 10 < 5 ? 0 : 1);
    for (let y = y0; y <= fin; y++) R.pset(x, y, y === fin ? P.toldoD : y === y0 ? P.blanco : (x % 10 === 0 ? P.toldoS : P.toldo)); }
  for (const x of [112, 316]) { R.rect(x, 53, x + 2, 160, P.metalS); R.rect(x, 53, x, 160, P.metalL); R.rect(x - 1, 159, x + 3, 160, P.metalD); }
  // un cangrejo fantasma que cruza la arena de vez en cuando (y se para a mirar)
  { const u = (t % 11) / 11, x = Math.round(-10 + u * 330 - (u > 0.5 && u < 0.6 ? (u - 0.5) * 330 : u >= 0.6 ? 0.1 * 330 : 0)), y = 170; if (x > -8 && x < 324) {
    const p = Math.floor(t * 10) % 2; R.rect(x, y - 2, x + 4, y, P.arena4); R.rect(x, y, x + 4, y, P.arena1); R.pset(x + 1, y - 3, P.k); R.pset(x + 3, y - 3, P.k);
    for (let i = 0; i < 3; i++) { R.pset(x - 1 - (p ? 0 : 1), y - 1 + i, P.arena2); R.pset(x + 5 + (p ? 1 : 0), y - 1 + i, P.arena2); } } }
  // LAS PIEZAS sobre el tablero, cada una con su regla escala (blanco y negro) y su número
  const regla = (x, y) => { for (let i = 0; i < 12; i++) R.pset(x + i, y, Math.floor(i / 3) % 2 ? P.blanco : P.negro); R.pset(x, y - 1, P.negro); };
  const np = Math.max(0, Math.min(4, Math.round(o.piezas ?? 4)));
  // la cartulina blanca bajo cada pieza, con su sombra en el papel (las piezas oscuras se leen sobre el kraft)
  const yf = g.mesa[3] - 1, carta = (x, y) => { R.rect(x - 13, y - 7, x + 14, Math.min(yf, y + 10), e_mezcla(P.kraftS, P.k, 0.35)); R.rect(x - 14, y - 8, x + 13, Math.min(yf, y + 9), P.muebleS); R.rect(x - 13, y - 7, x + 12, Math.min(yf - 1, y + 8), P.blanco); R.rect(x - 13, y - 7, x + 12, y - 7, P.muebleL); };
  for (let i = 0; i < Math.min(3, np); i++) carta(...g.piezas[i]);
  // la empuñadura de espada: el pomo, el puño con su alambre y la guarda en cruz, verde de óxido (sin hoja)
  if (np > 0) { const [x, y] = g.piezas[0]; regla(x - 12, y + 6); e_cifras(R, 1, x + 4, y + 3, P.rojoS);
    R.linea(x - 10, y + 1, x + 6, y - 3, P.k); R.linea(x - 10, y, x + 6, y - 4, P.k);
    for (let i = 0; i < 9; i++) { R.pset(x - 9 + i, y - Math.round(i * 0.25), i % 2 ? P.oxidoS : P.oxido); R.pset(x - 9 + i, y - 1 - Math.round(i * 0.25), P.oxidoL); }
    R.linea(x - 1, y - 6, x + 3, y + 5, P.k); R.linea(x, y - 6, x + 4, y + 5, P.oxido); R.linea(x + 1, y - 6, x + 5, y + 5, P.oxidoS); R.pset(x, y - 5, P.oxidoL);
    R.disco(x - 11, y + 1, 2.4, P.k); R.disco(x - 11, y + 1, 1.6, P.oxido); R.pset(x - 12, y, P.oxidoL);
    R.linea(x + 5, y - 3, x + 12, y - 4, P.oxidoS); R.pset(x + 13, y - 4, P.tierra1); }
  // la llave de arcabuz: dos trozos de hierro oscuro (la platina con su muelle y el gatillo curvo)
  if (np > 1) { const [x, y] = g.piezas[1]; regla(x - 8, y + 6); e_cifras(R, 2, x + 6, y + 3, P.rojoS);
    R.poligono([[x - 9, y - 3], [x + 3, y - 4], [x + 5, y], [x - 7, y + 1]], P.k); R.poligono([[x - 8, y - 2], [x + 3, y - 3], [x + 4, y - 1], [x - 7, y]], (xx, yy) => (yy < y - 2 ? P.hierroVL : (xx + yy) % 3 ? P.hierroV : P.naranja0));
    R.linea(x - 5, y - 2, x + 1, y - 5, P.hierroVS); R.disco(x + 1, y - 6, 1.5, P.hierroV);
    R.linea(x + 8, y - 4, x + 9, y + 1, P.hierroVS); R.linea(x + 9, y + 1, x + 12, y + 2, P.hierroVS); R.pset(x + 8, y - 4, P.hierroVL); }
  // la pizarra de escribir: un pedazo gris con rayitas grabadas (sin letras) y el lápiz de plomo al lado
  if (np > 2) { const [x, y] = g.piezas[2]; regla(x - 9, y + 8); e_cifras(R, 3, x + 9, y + 4, P.rojoS);
    R.poligono([[x - 10, y - 5], [x + 6, y - 7], [x + 8, y + 4], [x - 7, y + 5]], P.k); R.poligono([[x - 9, y - 4], [x + 6, y - 6], [x + 7, y + 3], [x - 6, y + 4]], (xx, yy) => ((xx + yy * 2) % 9 === 0 ? P.pizarraL : yy < y - 3 ? P.pizarraL : P.pizarra));
    for (let k = 0; k < 3; k++) R.linea(x - 6, y - 2 + k * 2, x + 2 - k * 2, y - 3 + k * 2, P.pizarraS); R.linea(x - 4, y + 2, x + 4, y - 4, P.pizarraL);
    R.linea(x + 10, y - 4, x + 14, y + 4, P.k); R.linea(x + 11, y - 4, x + 15, y + 4, P.plomo); R.pset(x + 11, y - 4, P.plomoL); }
  // el anillo de latón sobre su tela azul oscura: brilla
  if (np > 3) { const [x, y] = g.piezas[3]; R.poligono([[x - 11, y - 6], [x + 10, y - 7], [x + 12, y + 6], [x - 10, y + 7]], (xx, yy) => ((xx + yy) % 5 === 0 ? P.telaL : yy > y + 4 ? P.telaS : P.tela)); e_cifras(R, 4, x + 6, y + 9, P.rojoS);
    R.anillo(x + 0.5, y + 0.5, 4.2, P.k); R.anillo(x + 0.5, y + 0.5, 3.4, P.laton); R.anillo(x + 0.5, y + 0.5, 2.6, P.latonS); R.pset(x - 2, y - 3, P.latonL); R.pset(x - 3, y - 2, P.latonL);
    const u = (t % 3.2) / 3.2; if (u < 0.25) { const l = u < 0.08 || u > 0.17 ? 1 : 2; R.pset(x - 3, y - 3, P.blanco); for (let i = 1; i <= l; i++) { R.pset(x - 3 - i, y - 3, P.latonL); R.pset(x - 3 + i, y - 3, P.latonL); R.pset(x - 3, y - 3 - i, P.latonL); R.pset(x - 3, y - 3 + i, P.latonL); } } }
  // una esquina del papel kraft que levanta el viento
  { const a = Math.max(0, Math.sin(t * 1.4)) * 4; R.poligono([[300, 152], [306, 152], [306 - a * 0.3, 152 - a]], P.kraftL); R.linea(300, 152, 306 - a * 0.3, 152 - a, P.kraftS); }
}
let e_MASCMESA = null;

function e_labFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P;
  // el techo con placas y dos plafones (tranquilo arriba a la derecha) y la pared de paneles con juntas y motas
  rect(0, 0, 319, 12, P.paredS); for (let x = 0; x < 320; x += 40) rect(x, 0, x, 12, P.junta); rect(0, 6, 319, 6, P.junta);
  rect(60, 2, 120, 5, P.blanco); rect(60, 5, 120, 5, P.toldoS); rect(180, 2, 240, 5, P.blanco); rect(180, 5, 240, 5, P.toldoS);
  rect(0, 13, 319, 15, P.paredL); rect(0, 15, 319, 15, P.junta);
  for (let y = 16; y < 132; y++) for (let x = 0; x < 320; x++) { const v = 0.55 + (h(x >> 3, y >> 3, 140) - 0.5) * 0.12 - (y - 16) / 400 + (x > 270 && y < 50 ? 0.05 : 0); let c = e_rampa([P.paredS, P.pared, P.paredL], v, x, y);
    if (x % 48 === 0) c = P.junta; else if (x % 48 === 1) c = P.paredL; else if (h(x, y, 141) < 0.02) c = P.paredS; pset(x, y, c); }
  rect(0, 92, 319, 94, P.toldoS); rect(0, 92, 319, 92, P.blanco);   // el pasamanos de protección
  // LA VENTANA con su persiana a medio bajar (lo de fuera se pinta en cada fotograma, recortado)
  rect(14, 30, 92, 88, P.k); rect(15, 31, 91, 87, P.muebleL); rect(15, 87, 91, 87, P.muebleS);
  rect(10, 88, 96, 91, P.mueble); rect(10, 88, 96, 88, P.blanco); rect(10, 91, 96, 91, P.muebleS);
  // la puerta con cristal (al fondo, a la izquierda de la pantalla) y su manilla
  rect(100, 36, 130, 132, P.k); rect(101, 37, 129, 131, P.lonaS); rect(101, 37, 101, 131, P.lona); rect(105, 42, 125, 76, P.k); rect(126, 84, 128, 86, P.metalL); rect(122, 84, 128, 84, P.metal);
  // LA PANTALLA grande en la pared (las barras se mueven en cada fotograma)
  rect(140, 30, 222, 84, P.k); rect(141, 31, 221, 83, P.negro); rect(144, 34, 218, 80, P.pantalla); rect(176, 85, 186, 90, P.metalD);
  // el reloj sin cifras: marcas de las horas
  disco(244, 42, 8, P.k); disco(244, 42, 7, P.blanco); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(244 + Math.cos(a) * 5.5 - 0.5), Math.round(42 + Math.sin(a) * 5.5 - 0.5), k % 3 ? P.metal : P.k); }
  // los estantes con cajas de archivo (rayas, sin letras), carpetas y una planta
  rect(232, 70, 319, 72, P.muebleS); rect(232, 70, 319, 70, P.blanco); rect(290, 100, 319, 102, P.muebleS); rect(290, 100, 319, 100, P.blanco);
  for (const x of [236, 314]) { rect(x, 72, x + 1, 75, P.metalS); }
  for (let k = 0; k < 6; k++) { const x = 234 + k * 14; rect(x, 52, x + 12, 69, P.k); rect(x + 1, 53, x + 11, 69, k % 2 ? P.caja : P.cajaL); rect(x + 3, 57, x + 9, 60, P.blanco); rect(x + 4, 58, x + 8, 58, P.metal); rect(x + 4, 64, x + 8, 65, P.cajaS); }
  for (let k = 0; k < 4; k++) { const x = 292 + k * 5, c = [P.lona, P.rojo, P.verde, P.cuaderno][k % 4]; rect(x, 84 - (k % 3), x + 4, 99, P.k); rect(x + 1, 85 - (k % 3), x + 3, 99, c); rect(x + 1, 90, x + 3, 91, P.blanco); }
  rect(310, 90, 318, 99, P.barroS); rect(311, 91, 317, 99, P.barro); for (let k = 0; k < 6; k++) linea(314, 90, 309 + k * 2, 81 + (k % 2) * 3, k % 2 ? P.verde : P.verdeL);
  // LA ENCIMERA (banco) de resina oscura, con su canto, y el mueble bajo de cajones
  const [b0, b1, b2, b3] = [128, 132, 319, 154];
  poligono([[b0 + 6, b1], [b2, b1], [b2, b3], [b0, b3]], (x, y) => e_rampa([P.encimeraS, P.encimera, P.encimeraL], 0.45 + (y - b1) / 60 + ((x - y * 2) % 37 === 0 ? 0.4 : 0) + (h(x >> 3, y >> 2, 142) - 0.5) * 0.2, x, y));
  linea(b0 + 6, b1, b2, b1, P.encimeraL); rect(b0, b3, b2, b3 + 3, P.encimeraS); rect(b0, b3, b2, b3, P.encimeraL);
  rect(b0, b3 + 4, b2, 176, P.mueble); for (let x = b0 + 4; x < b2; x += 38) { rect(x, b3 + 6, x + 34, 172, P.muebleS); rect(x + 1, b3 + 7, x + 33, 171, P.muebleL); rect(x + 13, b3 + 9, x + 21, b3 + 10, P.metalS); }
  rect(b0, 176, b2, 179, P.negro);
  // el suelo de vinilo en baldosas, con el brillo de los plafones
  for (let y = 132; y < 180; y++) for (let x = 0; x < b0; x++) { const v = 0.5 + (y - 132) / 100 + (((x >> 4) + (y >> 3)) % 2 ? 0.08 : -0.04) + (h(x, y, 143) < 0.05 ? -0.2 : 0); pset(x, y, (x % 16 === 0 || y % 8 === 0) ? P.suelo0 : e_rampa([P.suelo0, P.suelo1, P.suelo2], v, x, y)); }
  rect(0, 130, b0, 132, P.muebleS);   // el zócalo
  // en la encimera: LA BANDEJA de huesecillos sueltos (vértebras de pescado, espinas, trozos de hueso de ciervo y una
  // falange; ningún animal entero), con su etiqueta de rayas
  rect(138, 136, 186, 148, P.k); rect(139, 137, 185, 147, P.blanco); rect(139, 147, 185, 147, P.toldoS); rect(141, 139, 183, 145, P.muebleL);
  for (let k = 0; k < 9; k++) { const x = 144 + (k % 5) * 8, y = 140 + Math.floor(k / 5) * 4; disco(x, y, 1.6, P.huesoS); pset(x, y, P.huesoD); pset(x - 1, y - 1, P.hueso); }   // vértebras de pescado
  for (let k = 0; k < 4; k++) { const x = 146 + k * 9, y = 144; linea(x, y, x + 5, y - 2 + (k % 2), P.hueso); pset(x, y + 1, P.huesoS); }   // espinas y astillas
  linea(170, 141, 180, 140, P.huesoS); linea(170, 140, 180, 139, P.hueso); pset(170, 141, P.hueso); pset(181, 139, P.hueso); pset(181, 141, P.huesoS);   // el trozo de hueso de ciervo
  rect(176, 143, 180, 145, P.hueso); pset(176, 143, P.huesoS); pset(180, 145, P.huesoD);   // la falange
  rect(140, 149, 152, 151, P.blanco); rect(142, 150, 150, 150, P.metal);
  // la mazorca seca (granos en filas, pardos y dorados) y el cuenco de barro con su borde desportillado
  for (let i = 0; i < 18; i++) for (let j = -2; j <= 2; j++) { const x = 192 + i, y = 140 + j - Math.round(i * 0.15); if (Math.abs(j) === 2 && (i < 2 || i > 15)) continue; pset(x, y, (i + j) % 2 ? P.maiz : (j < 0 ? P.maizL : P.maizS)); }
  linea(190, 141, 193, 143, P.hojarascaL); linea(190, 140, 192, 138, P.hojarasca);
  for (let y = 136; y <= 147; y++) { const w = Math.round(10 * Math.sqrt(Math.max(0, 1 - Math.pow((y - 136) / 12, 2)))); for (let x = 228 - w; x <= 228 + w; x++) pset(x, y, y === 136 ? P.barroS : x < 228 - w * 0.4 ? P.barroL : x > 228 + w * 0.5 ? P.barroS : P.barro); }
  rect(219, 135, 237, 136, P.barroS); rect(220, 134, 236, 134, P.barroL); pset(232, 134, P.encimera); pset(233, 134, P.encimera); pset(233, 135, P.barroS);
  // la gradilla de viales y el microscopio
  rect(292, 130, 316, 140, P.k); rect(293, 131, 315, 139, P.blanco); for (let k = 0; k < 5; k++) { const x = 295 + k * 4; rect(x, 118, x + 2, 134, P.cristalS); rect(x, 118, x + 2, 119, [P.rojo, P.lona, P.verde, P.cuaderno, P.rojo][k]); rect(x, 126 + (k % 3), x + 2, 133, [P.tierra2, P.cristal, P.hueso, P.tierra3, P.cristal][k]); }
  // el microscopio: la base, el brazo curvo, la platina con su pinza, el revólver con dos objetivos y el tubo con el ocular
  rect(196, 148, 216, 152, P.k); rect(197, 149, 215, 151, P.negro); rect(197, 149, 215, 149, P.metalD);
  for (let y = 116; y < 149; y++) { const x = 210 + Math.round(Math.sin((y - 116) / 33 * Math.PI) * 4); rect(x - 2, y, x + 2, y, P.k); rect(x - 1, y, x + 1, y, y < 130 ? P.mueble : P.muebleS); pset(x - 1, y, P.blanco); }
  rect(194, 134, 212, 137, P.k); rect(195, 135, 211, 136, P.negro); pset(196, 135, P.metalL); linea(199, 134, 205, 134, P.metalL);
  poligono([[197, 112], [203, 106], [208, 111], [202, 117]], P.k); poligono([[198, 112], [203, 107], [207, 111], [202, 116]], P.muebleL);
  rect(199, 117, 201, 125, P.k); rect(199, 118, 200, 124, P.metal); rect(203, 117, 205, 122, P.k); rect(203, 118, 204, 121, P.metalL);
  linea(204, 107, 196, 97, P.k); linea(205, 107, 197, 97, P.k); linea(206, 107, 198, 97, P.k); linea(205, 106, 198, 98, P.metalD); rect(194, 94, 199, 97, P.k); rect(195, 95, 198, 96, P.metalL);
  disco(212, 128, 2.2, P.k); disco(212, 128, 1.4, P.metal);
  // el brazo articulado de la lupa de aro, sujeto al canto de la encimera (la lente y su luz, en cada fotograma) y el
  // paño blanco con la bala
  rect(312, 128, 319, 133, P.k); rect(313, 129, 319, 132, P.metalD); linea(316, 128, 304, 104, P.metalS); linea(317, 128, 305, 104, P.metalD); linea(304, 104, 288, 112, P.metalS); linea(304, 105, 288, 113, P.metalD); disco(304, 104, 2, P.metalD); disco(316, 128, 2, P.metalD);
  poligono([[246, 140], [282, 140], [286, 150], [242, 150]], (x, y) => ((x + y) % 5 === 0 ? P.toldoS : P.blanco));
  // bajo la ventana, el convector con sus aletas y dos enchufes; a la izquierda de la ventana, el pictograma verde del
  // lavaojos (sin letras) y, debajo, el extintor rojo en su soporte
  rect(18, 100, 88, 116, P.k); rect(19, 101, 87, 115, P.mueble); for (let x = 21; x < 86; x += 3) { rect(x, 103, x, 113, P.muebleS); pset(x + 1, 103, P.muebleL); } rect(19, 101, 87, 101, P.muebleL); rect(19, 115, 87, 115, P.muebleS); rect(84, 117, 85, 129, P.metalS);
  for (const x of [30, 60]) { rect(x, 120, x + 8, 126, P.k); rect(x + 1, 121, x + 7, 125, P.muebleL); pset(x + 3, 123, P.k); pset(x + 5, 123, P.k); rect(x + 1, 125, x + 7, 125, P.muebleS); }
  rect(3, 104, 8, 106, P.metalD); rect(3, 106, 8, 126, P.k); rect(4, 107, 7, 125, P.rojo); rect(4, 107, 4, 125, P.rojoL); rect(7, 107, 7, 125, P.rojoS); rect(4, 103, 6, 105, P.negro); linea(7, 104, 9, 112, P.negro); rect(4, 115, 7, 116, P.blanco);
  rect(2, 40, 11, 51, P.k); rect(3, 41, 10, 50, P.verde); disco(6.5, 46.5, 2.6, P.blanco); disco(6.5, 46.5, 1.2, P.verde); pset(5, 42, P.blanco); pset(8, 42, P.blanco); pset(5, 43, P.lonaL); pset(8, 43, P.lonaL);
  // en el suelo: la luz de la ventana tendida sobre las baldosas, la canaleta del cable junto al zócalo, la rejilla del
  // desagüe, la papelera de pedal y el taburete de ruedas
  for (let y = 134; y < 180; y++) { const xa = Math.round(22 + (y - 134) * 0.9), xb = Math.round(84 + (y - 134) * 1.05); for (let x = xa; x < Math.min(b0, xb); x++) if (e_umbral(x, y) < 0.62 - (y - 134) / 110) e_tinta(R, x, y, P.luz, 0.28); }
  rect(0, 133, b0 - 1, 134, P.muebleS); rect(0, 133, b0 - 1, 133, P.muebleL);
  rect(38, 172, 52, 175, P.k); for (let x = 39; x < 52; x += 2) rect(x, 173, x, 174, P.metalD); rect(39, 172, 51, 172, P.metal);
  rect(4, 138, 16, 156, P.k); rect(5, 139, 15, 155, P.metal); rect(5, 139, 6, 155, P.metalL); rect(14, 139, 15, 155, P.metalS); rect(3, 136, 17, 138, P.k); rect(4, 136, 16, 137, P.metalL); rect(6, 156, 10, 157, P.negro);
  { const sx = 70; for (const [dx, dy] of [[-10, 3], [10, 3], [-6, 5], [6, 5]]) { linea(sx, 150, sx + dx, 150 + dy, P.k); disco(sx + dx, 151 + dy, 1.2, P.negro); }
    rect(sx - 1, 140, sx + 1, 150, P.metalS); pset(sx - 1, 140, P.metalL); rect(sx - 9, 135, sx + 9, 139, P.k); rect(sx - 8, 135, sx + 8, 138, P.tela); rect(sx - 8, 135, sx + 8, 135, P.telaL); }
}
function e_laboratorio(R, t, o, g) {
  const P = e_P, lupa = Math.max(0, Math.min(1, o.lupa ?? 1));
  R.copiar(e_capa(R, 'hat|lab', () => e_labFijo(R)));
  // el plafón que parpadea un instante a ratos
  if ((t % 9.1) < 0.2 && Math.sin(t * 60) > 0) R.rect(180, 2, 240, 5, P.toldoS);
  // por la ventana: el cielo, una nube que pasa y el roble que se mece, recortados al hueco; la persiana encima
  R.recorte([15, 31, 91, 87]);
  for (let y = 31; y <= 87; y++) R.linea(15, y, 91, y, e_rampa([P.cielo2, P.cielo4, P.cielo6], (y - 31) / 56, 15 + (y & 1), y));
  { const nx = ((t * 3) % 130) - 30; for (const [dx, dy, r] of [[0, 0, 6], [7, -2, 7], [14, 0, 5]]) R.disco(nx + dx, 44 + dy, r, P.nube1); for (const [dx, dy, r] of [[2, -2, 4], [8, -4, 4]]) R.disco(nx + dx, 44 + dy, r, P.nube0); }
  R.disco(70, 96, 30, P.arena3);
  for (let k = 0; k < 7; k++) { const sw = Math.sin(t * 1.2 + k) * 1.5; R.disco(30 + k * 9 + sw, 66 + (k % 3) * 3, 9, [P.hoja1, P.hoja2, P.hoja3][k % 3]); R.disco(28 + k * 9 + sw, 63 + (k % 3) * 3, 5, P.hoja4); }
  R.linea(52, 87, 50, 72, P.tronco1); R.linea(53, 87, 51, 72, P.tronco2);
  for (let y = 31; y < 54; y += 3) R.linea(15, y, 91, y, P.muebleL), R.linea(15, y + 1, 91, y + 1, P.muebleS);
  R.recorte(null); R.rect(15, 54, 91, 55, P.mueble);
  R.linea(88, 54, 88 + Math.round(Math.sin(t * 1.3) * 1.5), 72, P.metal); R.pset(88 + Math.round(Math.sin(t * 1.3) * 1.5), 73, P.metalL);   // el cordón
  // por el cristal de la puerta pasa alguien de vez en cuando (recortado al cristal)
  R.recorte([106, 43, 124, 75]); R.poligono([[106, 43], [124, 43], [124, 75], [106, 75]], P.cristalS); for (let y = 43; y < 76; y++) if (y % 6 === 0) R.linea(106, y, 124, y - 4, P.cristal);
  { const u = (t % 8) / 8, x = Math.round(90 + u * 60); R.disco(x, 54, 4, P.piel); R.linea(x - 4, 51, x + 4, 51, hex('#4a3020')); R.poligono([[x - 6, 59], [x + 6, 59], [x + 7, 76], [x - 7, 76]], P.blanco); }
  R.recorte(null);
  // LA PANTALLA: gráficas de barras que crecen y cambian (sin letras), con su rejilla y un cursor que parpadea
  R.recorte([144, 34, 218, 80]);
  for (let y = 40; y < 80; y += 8) R.linea(146, y, 216, y, P.pantallaL);
  for (let k = 0; k < 7; k++) { const alto = Math.round(10 + 22 * (0.5 + 0.5 * Math.sin(k * 1.9 + Math.floor(t / 2.5) * 0.9)) * Math.min(1, ((t % 2.5) / 0.6))), x = 150 + k * 9, c = [P.barra0, P.barra1, P.barra2][k % 3];
    for (let y = 76 - alto; y <= 76; y++) R.linea(x, y, x + 5, y, y === 76 - alto ? P.blanco : c); }
  R.linea(146, 77, 216, 77, P.metalL); if (Math.floor(t * 2) % 2) R.linea(150, 37, 154, 37, P.barra0);
  R.recorte(null);
  // el segundero del reloj
  { const a = (t % 60) / 60 * Math.PI * 2 - Math.PI / 2; R.linea(244, 42, Math.round(244 + Math.cos(a) * 5), Math.round(42 + Math.sin(a) * 5), P.rojo); R.linea(244, 42, 244, 38, P.k); R.linea(244, 42, 247, 42, P.k); }
  // un vial que burbujea en la gradilla
  for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1; R.pset(300, Math.round(132 - u * 6), P.blanco); }
  // LA LUPA DE ARO: el aro con su luz, la lente y LA BALA DE PLOMO aumentada dentro
  const [bx, by] = g.bala, lx = bx, ly = by + 1, r = 13;
  // la bala de verdad, pequeña, sobre el paño (debajo de la lupa)
  R.disco(264, 146, 2.2, P.k); R.disco(264, 146, 1.6, P.plomo); R.pset(263, 145, P.plomoL);
  if (lupa > 0) for (let y = 110; y < 152; y++) for (let x = 236; x < 292; x++) { const d = Math.hypot((x - 264) / 26, (y - 140) / 16); if (d < 1 && (1 - d) * 1.8 * lupa > e_umbral(x, y) + 0.2) e_tinta(R, x, y, P.luz, 0.3); }
  R.linea(288, 112, lx + r, ly - 4, P.metalS); R.linea(288, 113, lx + r, ly - 3, P.metalD);
  R.disco(lx, ly, r + 3, P.k); R.disco(lx, ly, r + 2, lupa > 0.5 ? P.luzS : P.metal); R.disco(lx, ly, r + 1, P.metalD);
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; R.pset(Math.round(lx + Math.cos(a) * (r + 2) - 0.5), Math.round(ly + Math.sin(a) * (r + 2) - 0.5), lupa > 0.5 ? P.luz : P.metalS); }
  R.disco(lx, ly, r, (x, y) => e_mezcla(e_mezcla(P.blanco, P.toldoS, ((x + y) % 4 === 0) ? 0.5 : 0.1), P.luz, 0.3 * lupa));
  // dentro de la lente: la bala grande, redonda, gris de plomo con su luz, su sombra y la marca del molde
  const br = 3 + lupa * 5;
  R.disco(bx + 2, by + 3, br, (x, y) => e_mezcla(P.toldoS, P.k, 0.15));
  R.disco(bx, by, br + 1, P.k); R.disco(bx, by, br, (x, y, d) => e_rampa([P.plomoS, P.plomo, P.plomoL], 0.85 - d * 0.6 - ((x - bx) + (y - by)) / (br * 4), x, y));
  R.linea(Math.round(bx - br * 0.8), Math.round(by + br * 0.2), Math.round(bx + br * 0.8), Math.round(by - br * 0.2), P.plomoS);
  R.disco(bx - br * 0.4, by - br * 0.45, Math.max(1, br * 0.22), P.blanco);
  for (let a = 3.6; a < 4.6; a += 0.12) R.pset(Math.round(lx + Math.cos(a) * (r - 3)), Math.round(ly + Math.sin(a) * (r - 3)), P.blanco);   // el reflejo del cristal
}

// capas fijas por decorado: se pintan una vez en un búfer de R.nuevo() y se copian en cada fotograma
const f_CAPAS = new WeakMap();

function f_capa(R, clave, dibuja) {
  let m = f_CAPAS.get(R); if (!m) f_CAPAS.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.recorte(null); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// trama de Bayer 4×4, tono tramado en una rampa (v de 0 a n-1), mezcla de dos colores y recorte a 0–1
const f_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const f_b4 = (x, y) => f_B4[((y & 3) << 2) | (x & 3)];

const f_ton = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > f_b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };

const f_mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };

const f_01 = (v) => Math.max(0, Math.min(1, v));

const f_atom = (x, y) => x > 271 && y < 48;

// aclara (o tiñe) con trama los píxeles de una elipse: fuerza máxima en el centro, nada en el borde
function f_bano(R, cx, cy, rx, ry, col, fuerza, x0 = 0, y0 = 0, x1 = 319, y1 = 179) {
  for (let y = Math.max(y0, Math.floor(cy - ry)); y <= Math.min(y1, cy + ry); y++) for (let x = Math.max(x0, Math.floor(cx - rx)); x <= Math.min(x1, cx + rx); x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d >= 1) continue; const a = fuerza * (1 - d);
    const q = Math.floor((a * (2 - a)) * 0.42 * 8 + f_b4(x, y)) / 8; if (q > 0) R.pset(x, y, f_mez(R.pget(x, y), col, q));
  }
}

// figurita de fondo (8–10 px): cabeza, pelo o gorra, cuerpo y piernas que se mueven si anda
function f_figurita(R, x, suelo, t, cols, o = {}) {
  const [piel, ropa, pierna, pelo] = cols, a = o.anda ? Math.floor(t * 6 + x) % 2 : 0, x0 = Math.round(x), s = Math.round(suelo);
  R.rect(x0 - 1, s - 9, x0 + 1, s - 4, ropa); R.pset(x0 + 1, s - 8, f_mez(ropa, 0xffffffff, 0.25));
  R.rect(x0 - 1, s - 3, x0 - 1, s - (a ? 1 : 0), pierna); R.rect(x0 + 1, s - 3, x0 + 1, s - (a ? 0 : 1), pierna);
  R.rect(x0 - 1, s - 12, x0 + 1, s - 10, piel); R.rect(x0 - 1, s - 12, x0 + 1, s - 12, pelo); R.pset(x0 - 1, s - 11, pelo);
  if (o.brazo) R.linea(x0 + 1, s - 8, x0 + 1 + o.brazo[0], s - 8 + o.brazo[1], piel);
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba a la derecha) con la base plana (como c_cumulo del 12)
function f_cumulo(R, cx, cy, w, sem, c) {
  const n = 3 + Math.round(w / 12), B = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.16 + 0.15 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 534)); B.push([cx + u * w * 0.86, cy - r * 0.5 + (h(i, sem, 535) - 0.5) * w * 0.08, r]); }
  for (const [x, y, r] of B) R.disco(Math.round(x), Math.round(y + 1), Math.max(1, Math.round(r)), c[0]);
  for (const [x, y, r] of B) R.disco(Math.round(x), Math.round(y), Math.max(1, Math.round(r - 0.4)), c[1]);
  for (const [x, y, r] of B) if (r > 2) R.disco(Math.round(x + 1), Math.round(y - 1.5), Math.max(1, Math.round(r * 0.62)), c[2]);
  R.linea(Math.round(cx - w * 0.42), Math.round(cy + 1), Math.round(cx + w * 0.42), Math.round(cy + 1), c[0]);
}

// la paleta del museo y del Sitio X
const f_P = pal({
  // la sala: yeso cálido, molduras, madera del zócalo, el parqué, el acero de las estanterías, las cajas de archivo
  yeso0: '#a8977a', yeso1: '#bfae90', yeso2: '#d2c3a5', yeso3: '#e0d4b8', yeso4: '#ece3cc',
  mad0: '#3a2618', mad1: '#54382a', mad2: '#6e4c34', mad3: '#8a6444', mad4: '#a87e56',
  par0: '#6a4a2e', par1: '#86603c', par2: '#a0784a', par3: '#b88e5c', par4: '#cca474',
  acero0: '#4a5058', acero1: '#6a727c', acero2: '#8e969e', acero3: '#b4bac0', acero4: '#d6dade',
  caja0: '#4e5868', caja1: '#6a7586', caja2: '#8894a4', cajaB0: '#8a7454', cajaB1: '#ab9470', cajaB2: '#c8b48e',
  marco: '#46504c', marcoL: '#6a7670', vidrio0: '#8e9ca6', vidrio1: '#a8b6be', vidrio2: '#c4ced4', vidrio3: '#dce2e4',
  galeria0: '#6a5a46', galeria1: '#8a7658', galeria2: '#b09a74', galeriaL: '#f0dca0',
  oro0: '#7a5a20', oro1: '#b08a3a', oro2: '#d8b45a', oro3: '#f0d890',
  piedra0: '#9a8e7a', piedra1: '#b4a890', piedra2: '#ccc2aa', piedra3: '#e2dac4',
  luzT0: '#c8d4d8', luzT1: '#e2eae8', luzT2: '#f4f8f0', luzT3: '#ffffff', luzApag0: '#3e4a52', luzApag1: '#56646c',
  rx0: '#8e8a7c', rx1: '#bcb6a4', rx2: '#dcd6c4', rx3: '#f0ecdc', amarillo: '#e8c040', negro: '#26262a', rojoL: '#ff5040', verdeL: '#60e070',
  rayo: '#b8a8f0', guante: '#f8f6f0', guanteS: '#d8d4cc', pantalla: '#1a2a30', pantallaL: '#7ac8d0',
  // la acuarela del mapa de White
  pap0: '#b49c74', pap1: '#ccb68c', pap2: '#ddc9a0', pap3: '#ebdcb8', pap4: '#f6ecd2', pap5: '#fff8e8',
  tie0: '#5e7a46', tie1: '#76925a', tie2: '#90a86e', tie3: '#aabc88', tie4: '#c4cfa0',
  agu0: '#5a8eae', agu1: '#74a4c0', agu2: '#90bad0', agu3: '#acd0de',
  mar0: '#466e96', mar1: '#5e86aa', mar2: '#7a9ebe', mar3: '#98b6d0',
  are0: '#c8aa72', are1: '#dcc28c', are2: '#ecd6a6',
  sepia: '#6a4a2e', sepiaL: '#9a7a54', rio: '#4a80a6', estRojo: '#d0283a', estAzul: '#2a46b0',
  parche0: '#d8ccae', parche1: '#e8dec4', parche2: '#f4ecd8',
});

// EL MAPA DE WHITE (canon) como función de (u, v) en 0–1, con el norte arriba: la tierra firme arriba con sus ríos que
// bajan, el estrecho de Albemarle que entra en la tierra a la izquierda (cabecera en u 0,35, v 0,2) y el de Pamlico más
// pequeño a la derecha, la isla de Roanoke en medio del estrecho, la ristra de bancos de arena con tres pasos y el mar
// abajo. Devuelve el color de la acuarela en el píxel (x, y) (para la trama); luz 0–1 la aclara como a contraluz.
const f_costa = (u) => 0.5 + 0.035 * Math.sin(u * 13 + 0.7) + 0.02 * Math.sin(u * 31) - 0.27 * Math.exp(-(((u - 0.36) / 0.075) ** 2)) - 0.12 * Math.exp(-(((u - 0.72) / 0.05) ** 2));

const f_banco = (u) => 0.75 + 0.05 * Math.sin(u * 3.1 + 0.4) - 0.05 * u;

const f_RIOS = [[0.335, 0.022, 13, 0.0], [0.395, 0.018, 10, 1.3], [0.64, 0.02, 12, 2.1], [0.73, 0.012, 15, 0.4], [0.9, 0.02, 9, 3.0], [0.12, 0.016, 11, 1.7]];

function f_mapaCol(u, v, x, y, luz, fino) {
  const P = f_P, L = luz * 0.9, n = (h(x >> 1, y >> 1, 41) - 0.5) * 0.7 + (h(x >> 3, y >> 3, 42) - 0.5) * 0.6;
  const PAP = [P.pap0, P.pap1, P.pap2, P.pap3, P.pap4, P.pap5], TIE = [P.tie0, P.tie1, P.tie2, P.tie3, P.tie4], AGU = [P.agu0, P.agu1, P.agu2, P.agu3], MAR = [P.mar0, P.mar1, P.mar2, P.mar3], ARE = [P.are0, P.are1, P.are2];
  const c = f_costa(u), b = f_banco(u), paso = Math.abs(u - 0.27) < 0.011 || Math.abs(u - 0.58) < 0.009 || Math.abs(u - 0.86) < 0.011;
  const isla = ((u - 0.47) / 0.032) ** 2 + ((v - 0.62) / 0.024) ** 2;
  if (v < c - 0.004 || isla < 1) {
    // los ríos: hilos azules que serpentean hasta la costa y se ensanchan en la boca
    for (const [u0, a, f, ph] of f_RIOS) { const ur = u0 + a * Math.sin(v * f + ph), w = 0.004 + Math.max(0, v - c + 0.12) * 0.05; if (Math.abs(u - ur) < w && v > 0.02 && isla >= 1) return f_ton(AGU, 1 + L, x, y); }
    const d = isla < 1 ? (1 - isla) * 0.02 : c - v;
    if (d < (fino ? 0.007 : 0.012)) return d < 0.004 && fino ? P.sepia : f_ton(TIE, 0.6 + L + n * 0.5, x, y);   // el filo de la costa: pigmento que se acumula
    return f_ton(TIE, 1.7 + Math.min(1.2, d * 4) + L + n, x, y);
  }
  if (v < b - 0.012) {   // el estrecho: lavado azul claro con rayitas de pincel horizontales
    const raya = fino && (y + Math.floor(h(x >> 3, y, 43) * 2)) % 4 === 0 && h(x >> 2, y, 44) > 0.4;
    return f_ton(AGU, 2 + L * 0.8 + n * 0.5 - (raya ? 0.8 : 0) - (v > b - 0.03 ? 0.5 : 0), x, y);
  }
  if (v < b + 0.012 && !paso) { if (fino && (Math.abs(v - b + 0.012) < 0.004 || Math.abs(v - b - 0.012) < 0.004)) return P.sepiaL; return f_ton(ARE, 1 + L + n * 0.6 - (h(x, y, 45) > 0.85 ? 1 : 0), x, y); }
  // el mar: azul más hondo con olas grabadas en ondas
  const ola = fino && (y + Math.round(Math.sin(x * 0.35 + y) * 1.2)) % 5 === 0;
  return f_ton(MAR, 1.6 + L + n * 0.5 - (ola ? 1 : 0) + (v - b) * 1.2, x, y);
}

// el papel del mapa fuera de la acuarela (margen, a contraluz con las líneas verticales del papel verjurado)
const f_papel = (x, y, luz) => f_ton([f_P.pap1, f_P.pap2, f_P.pap3, f_P.pap4, f_P.pap5], 1.6 + luz * 1.6 + (h(x >> 1, y >> 1, 46) - 0.5) * 0.8 - (luz > 0.5 && x % 9 === 0 ? 0.7 : 0) - (h(x >> 2, y >> 2, 47) > 0.96 ? 1.2 : 0), x, y);

// el fondo fijo de la sala: cornisa, pared de yeso con paneles, ventana alta en arco (x 14–58, y 20–96), radiador,
// pilastras (x 62–72 y 204–214), una acuarela de White enmarcada, la puerta de cristal doble a la galería
// (x 116–170, y 44–127), el reloj (236, 32), la lámpara colgante, las estanterías de acero con cajas de archivo (x 220–318,
// y 52–132), el zócalo de madera, el parqué en espiga, el trípode con la cámara, la columna y el brazo de los rayos X y
// la mesa de luz apagada (tablero x 100–240, y 132–146)
const f_SUELO_SALA = 128;

function f_salaFondo(R) {
  const { rect, pset, linea, poligono, disco } = R, P = f_P, YES = [P.yeso0, P.yeso1, P.yeso2, P.yeso3, P.yeso4], PAR = [P.par0, P.par1, P.par2, P.par3, P.par4];
  // la pared: yeso con veladuras, más clara junto a la ventana; paneles en relieve
  for (let y = 0; y < 104; y++) for (let x = 0; x < 320; x++) pset(x, y, f_ton(YES, 2.2 + Math.max(0, 70 - Math.abs(x - 36)) / 90 + (h(x >> 2, y >> 2, 50) - 0.5) * 0.35 + (h(x, y, 51) > 0.97 ? -0.6 : 0) - (y > 92 ? 0.3 : 0), x, y));
  // la cornisa: molduras tranquilas bajo la barra del año
  rect(0, 0, 319, 3, P.yeso3); rect(0, 4, 319, 4, P.yeso1); rect(0, 5, 319, 7, P.yeso4); rect(0, 8, 319, 8, P.yeso2); rect(0, 9, 319, 9, P.yeso0);
  for (let x = 2; x < 320; x += 6) { pset(x, 6, P.yeso2); pset(x + 1, 6, P.yeso2); }   // dentículos
  for (const [x0, x1] of [[78, 110], [176, 200]]) { rect(x0, 18, x1, 18, P.yeso4); rect(x0, 18, x0, 98, P.yeso4); rect(x0, 99, x1, 99, P.yeso1); rect(x1, 18, x1, 99, P.yeso1); }
  // la ventana alta en arco, con su derrame de piedra, el alféizar y el radiador
  rect(10, 16, 62, 100, P.piedra1); for (let y = 16; y < 100; y++) { pset(10, y, P.piedra0); pset(62, y, P.piedra3); }
  for (let y = 20; y <= 96; y++) for (let x = 14; x <= 58; x++) { if (y < 42 && (x - 36) ** 2 + (y - 42) ** 2 > 22 * 22) continue; pset(x, y, f_ton([P.vidrio0, P.vidrio1, P.vidrio2, P.vidrio3], 1 + (y - 20) / 40, x, y)); }
  rect(8, 97, 64, 100, P.piedra3); rect(8, 101, 64, 102, P.piedra0);
  // las pilastras de piedra estriada con capitel y basa
  for (const px of [62, 204]) {
    for (let y = 10; y < 128; y++) for (let x = px; x <= px + 10; x++) pset(x, y, f_ton([P.piedra0, P.piedra1, P.piedra2, P.piedra3], (x - px < 2 ? 3 : x - px > 8 ? 0.6 : 2) - ((x - px) % 3 === 1 ? 0.8 : 0) + (h(x, y >> 2, 52) - 0.5) * 0.4, x, y));
    rect(px - 2, 10, px + 12, 13, P.piedra3); rect(px - 2, 14, px + 12, 15, P.piedra1); rect(px - 1, 16, px + 11, 17, P.piedra2);
    rect(px - 2, 120, px + 12, 123, P.piedra2); rect(px - 2, 124, px + 12, 127, P.piedra1); rect(px - 2, 120, px + 12, 120, P.piedra3);
  }
  // la acuarela de White enmarcada: casas alargadas de arco, el fuego, el maíz
  rect(80, 32, 108, 58, P.oro0); rect(81, 33, 107, 57, P.oro2); rect(82, 34, 106, 56, P.oro1); rect(84, 36, 104, 54, P.pap4);
  for (let y = 37; y < 54; y++) for (let x = 85; x < 104; x++) if (y > 46) pset(x, y, f_ton([P.tie1, P.tie2, P.tie3], 1 + h(x, y, 53), x, y));
  for (const [cx, w] of [[89, 4], [99, 5]]) { for (let i = -w; i <= w; i++) { const top = 46 - Math.round(Math.sqrt(Math.max(0, w * w - i * i)) * 0.8); rect(cx + i, top, cx + i, 47, i < 0 ? P.are1 : P.are0); } }
  rect(93, 44, 95, 47, P.sepia); pset(94, 43, P.estRojo); for (let x = 86; x < 104; x += 2) { linea(x, 53, x, 49, P.tie0); pset(x, 48, P.oro2); }
  rect(90, 60, 98, 61, P.oro1);   // la plaquita (sin letras)
  // la puerta de cristal doble a la galería, con su marco de madera, el montante y la galería al fondo
  rect(112, 40, 174, 127, P.mad1); rect(112, 40, 174, 42, P.mad3); rect(113, 43, 173, 43, P.mad0);
  for (const [x0, x1] of [[116, 141], [145, 170]]) {
    rect(x0, 46, x1, 127, P.mad2); rect(x0, 46, x0, 127, P.mad3); rect(x1, 46, x1, 127, P.mad0);
    for (let y = 50; y <= 104; y++) for (let x = x0 + 3; x <= x1 - 3; x++) pset(x, y, f_ton([P.galeria0, P.galeria1, P.galeria2], (y < 64 ? 2.2 : y > 92 ? 0.4 : 1.4) + (h(x >> 1, y >> 2, 54) - 0.5) * 0.5, x, y));
    // las vitrinas de la galería al fondo, iluminadas
    for (let x = x0 + 5; x <= x1 - 5; x += 9) { rect(x, 74, x + 6, 92, P.galeria0); rect(x + 1, 75, x + 5, 84, P.galeriaL); rect(x + 2, 78, x + 4, 83, P.oro1); rect(x + 1, 85, x + 5, 91, P.galeria1); }
    rect(x0 + 3, 50, x1 - 3, 51, P.galeriaL);
    rect(x0 + 3, 105, x1 - 3, 106, P.mad0); for (let y = 108; y <= 124; y += 8) { rect(x0 + 4, y, x1 - 4, y + 5, P.mad1); rect(x0 + 4, y, x1 - 4, y, P.mad3); }
    rect(x1 - (x0 < 140 ? 3 : 22), 92, x1 - (x0 < 140 ? 2 : 21), 98, P.oro2);
  }
  // el reloj de pared (la aguja la mueve la escena de cada fotograma)
  disco(236, 32, 7, P.mad1); disco(236, 32, 6, P.oro1); disco(236, 32, 5, P.yeso4); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(236 + Math.cos(a) * 4), Math.round(32 + Math.sin(a) * 4), P.sepia); }
  // el zócalo de madera con paneles y la moldura
  for (let y = 104; y < f_SUELO_SALA; y++) for (let x = 0; x < 320; x++) { if (x >= 112 && x <= 174) continue; if (x >= 62 && x <= 72 || x >= 204 && x <= 214) continue;
    const pan = (x % 38), borde = pan < 2 || y === 107 || y === 123; pset(x, y, f_ton([P.mad0, P.mad1, P.mad2, P.mad3], borde ? (pan === 0 || y === 107 ? 3 : 0.5) : 1.6 + (h(x >> 3, y, 55) - 0.5) * 0.6 + ((x * 3 + y) % 11 === 0 ? -0.6 : 0), x, y)); }
  rect(0, 104, 319, 105, P.mad3); rect(0, 106, 319, 106, P.mad0); rect(0, 125, 319, 127, P.mad0);
  // el radiador de hierro bajo la ventana
  for (let x = 18; x <= 54; x += 3) { rect(x, 106, x + 1, 124, P.yeso2); pset(x, 106, P.yeso4); rect(x + 1, 107, x + 1, 124, P.yeso0); }
  rect(17, 108, 55, 109, P.yeso1); rect(17, 121, 55, 122, P.yeso1); rect(16, 125, 18, 127, P.acero1); rect(54, 125, 56, 127, P.acero1);
  // el parqué en espiga, más claro bajo la ventana, con el reflejo de la luz de la ventana
  for (let y = f_SUELO_SALA; y < 180; y++) for (let x = 0; x < 320; x++) {
    // tiras de 10 px; en cada una, tablillas a 45° que alternan de sentido (la espiga), con su junta, su tono y su veta
    const yy = y - f_SUELO_SALA, W = 10, i = Math.floor(x / W), lx = x % W, d = (i % 2 ? lx : W - 1 - lx) + yy, pl = Math.floor(d / 4), e = d % 4;
    const jun = lx === 0 || e === 0, veta = h(x, y, 57) < 0.07;
    const sol = Math.max(0, 1 - Math.abs(x - 50 - yy * 1.3) / 26) * (1 - yy / 60);
    pset(x, y, jun ? P.par0 : f_ton(PAR, 1 + Math.floor(h(i, pl, 56) * 2.6) + (e === 1 ? 1 : 0) - (veta ? 1 : 0) + Math.round(sol * 3) * 0.5 - (yy > 36 ? 0.5 : 0), x, y));
  }
  // las estanterías de acero con cajas de archivo, tubos de mapas enrollados y carpetas grandes
  for (let y = 52; y <= 132; y++) for (let x = 220; x <= 318; x++) pset(x, y, f_ton([P.acero0, P.acero1], 0.6 + (h(x >> 2, y >> 2, 57) - 0.5) * 0.4, x, y));
  for (const sy of [52, 74, 96, 118]) {
    let x = 223; const k0 = sy;
    while (x < 314) {
      const w = 7 + Math.floor(h(x, k0, 58) * 7), alto = 13 + Math.floor(h(x, k0, 59) * 6), tipo = h(x, k0, 60);
      if (x + w > 315) break;
      const top = sy + 20 - alto;
      if (tipo < 0.18 && sy !== 52) { for (let i = 0; i < 3; i++) { disco(x + 3, sy + 17 - i * 5, 2, P.cajaB2); disco(x + 3, sy + 17 - i * 5, 1, P.cajaB0); } x += 8; continue; }   // tubos de mapas
      const az = tipo < 0.6, c0 = az ? P.caja0 : P.cajaB0, c1 = az ? P.caja1 : P.cajaB1, c2 = az ? P.caja2 : P.cajaB2;
      rect(x, top, x + w - 1, sy + 19, c1); rect(x, top, x, sy + 19, c2); rect(x + w - 1, top, x + w - 1, sy + 19, c0); rect(x, top, x + w - 1, top, c2);
      rect(x + 2, top + 3, x + w - 3, top + 5, P.yeso4); pset(x + 3, top + 4, P.acero1); if (w > 9) pset(x + 5, top + 4, P.acero1);
      rect(x + Math.floor(w / 2) - 1, sy + 12, x + Math.floor(w / 2) + 1, sy + 13, P.caja0);
      x += w + (h(x, k0, 61) > 0.7 ? 2 : 1);
    }
    rect(220, sy + 20, 318, sy + 21, P.acero3); rect(220, sy + 22, 318, sy + 22, P.acero0);
  }
  for (const ux of [220, 268, 316]) { rect(ux, 50, ux + 2, 134, P.acero2); rect(ux, 50, ux, 134, P.acero4); for (let y = 54; y < 132; y += 4) pset(ux + 1, y, P.acero0); }
  rect(218, 134, 320, 135, P.acero0);
  // la lámpara colgante de pantalla verde
  linea(196, 10, 196, 25, P.acero0); rect(190, 26, 202, 27, hex('#2e5a3a')); rect(188, 28, 204, 30, hex('#3e7a4a')); rect(188, 28, 204, 28, hex('#5a9a62')); rect(194, 31, 198, 31, P.luzT2);
  // la sombra de la mesa de luz en el suelo
  for (let y = 154; y < 162; y++) for (let x = 96; x < 248; x++) if ((x + y) % 2 === 0 || y > 157) pset(x, y, f_mez(R.pget(x, y), P.par0, 0.5));
  // los rayos X: la base con ruedas, la columna, el brazo con su contrapeso y el panel de mando
  rect(242, 152, 266, 157, P.rx1); rect(242, 152, 266, 152, P.rx3); rect(242, 157, 266, 157, P.rx0); for (const wx of [244, 263]) { disco(wx, 159, 2, P.negro); pset(wx, 158, P.acero2); }
  rect(250, 62, 256, 152, P.rx2); rect(250, 62, 250, 152, P.rx3); rect(255, 62, 256, 152, P.rx0); for (let y = 66; y < 150; y += 10) rect(251, y, 254, y, P.rx1);
  rect(150, 60, 262, 66, P.rx2); rect(150, 60, 262, 60, P.rx3); rect(150, 66, 262, 66, P.rx0); for (let x = 154; x < 248; x += 8) pset(x, 63, P.rx1);
  rect(258, 56, 268, 70, P.rx1); rect(258, 56, 268, 56, P.rx3); rect(259, 64, 267, 65, P.amarillo); for (let x = 259; x < 268; x += 2) pset(x, 65, P.negro);
  rect(257, 104, 269, 118, P.rx1); rect(257, 104, 269, 104, P.rx3); rect(258, 106, 268, 112, P.pantalla); rect(259, 114, 261, 116, P.amarillo); rect(264, 114, 266, 116, P.negro);
  linea(256, 150, 268, 156, P.negro); linea(268, 156, 280, 156, P.negro);
  // el trípode con la cámara, apuntando a la mesa
  linea(46, 98, 34, 152, P.acero0); linea(46, 98, 58, 152, P.acero0); linea(46, 98, 46, 150, P.acero1); linea(47, 98, 59, 152, P.acero2);
  rect(44, 96, 48, 99, P.acero1); rect(38, 88, 54, 96, P.negro); rect(38, 88, 54, 88, P.acero1); rect(54, 90, 60, 95, P.acero0); rect(60, 89, 61, 96, P.acero2); rect(41, 85, 46, 87, P.negro); pset(52, 90, P.rojoL);
  disco(34, 152, 1, P.negro); disco(58, 152, 1, P.negro);
  // la mesa de luz: patas con ruedas, cajonera de planos debajo, faldón de chapa con rejillas, y el marco del tablero
  for (const lx of [100, 236]) { rect(lx, 146, lx + 3, 157, P.acero1); rect(lx, 146, lx, 157, P.acero3); disco(lx + 1, 159, 1, P.negro); }
  rect(104, 148, 235, 156, P.acero2); for (let y = 149; y < 156; y += 3) { rect(104, y, 235, y, P.acero3); rect(166, y + 1, 174, y + 1, P.acero0); }
  rect(100, 146, 240, 151, P.acero1); rect(100, 146, 240, 146, P.acero3); for (let x = 106; x < 156; x += 3) rect(x, 148, x + 1, 149, P.acero0);
  rect(214, 147, 226, 150, P.acero0); rect(215, 148, 217, 149, P.negro); rect(221, 148, 223, 149, P.acero3);
  poligono([[110, 132], [230, 132], [241, 146], [99, 146]], P.acero3); poligono([[112, 133], [228, 133], [238, 145], [102, 145]], P.acero1);
}
// tablero de la mesa de luz (x 102–238, y 133–145, en perspectiva) con el mapa encima: apagado o encendido con trama
function f_tablero(R, luz) {
  const P = f_P;
  for (let y = 134; y <= 144; y++) { const k = (y - 133) / 12, x0 = Math.round(112 - 9 * k) + 1, x1 = Math.round(228 + 9 * k) - 1;
    for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), v = (y - 133.5) / 11.5;
      const enc = luz > f_b4(x, y) + 0.001, mapa = u > 0.18 && u < 0.82 && v > 0.08 && v < 0.94;
      if (mapa) { const mu = (u - 0.18) / 0.64, mv = (v - 0.08) / 0.86; R.pset(x, y, enc ? f_mapaCol(mu, mv, x, y, 1, false) : f_mez(f_mapaCol(mu, mv, x, y, 0, false), P.luzApag0, 0.35)); }
      else R.pset(x, y, enc ? f_ton([P.luzT0, P.luzT1, P.luzT2, P.luzT3], 2 + v - Math.abs(u - 0.5), x, y) : f_ton([P.luzApag0, P.luzApag1], 0.5 + v * 0.8 + (h(x, y, 62) > 0.9 ? 1 : 0), x, y));
    } }
}

// LA SALA: o.luz 0–1 enciende la mesa (parpadeo de tubo al arrancar, luz que sube a la pared y a las caras y se
// refleja en el parqué); o.rayos 0–1 desliza el cabezal de rayos X a lo largo del brazo (x 150 → 222) con su haz
// violeta sobre el mapa; por defecto quieto en x 176 y apagado
function f_sala(R, t, o) {
  const { rect, pset, linea, disco } = R, P = f_P;
  R.copiar(f_capa(R, 'rk_sala', () => f_salaFondo(R)));
  // por la ventana: el cielo gris de Londres con nubes de tres tonos a tres velocidades y palomas (recortado al hueco)
  R.recorte([14, 20, 58, 96]);
  for (let k = 0; k < 6; k++) { const v = 1.2 + k * 0.7, w = 14 + (k % 3) * 6, x = ((h(k, 1, 63) * 120 + t * v) % 110) - 20, y = 28 + k * 10;
    for (let i = -w; i <= w; i++) { const e = 1 - (i / w) ** 2, al = Math.round(e * (3 + (k % 2) * 2)); for (let j = -al; j <= 1; j++) { const xx = Math.round(x + i), yy = y + j; if (xx < 14 || xx > 58 || (yy < 42 && (xx - 36) ** 2 + (yy - 42) ** 2 > 484)) continue; pset(xx, yy, j < -al + 2 ? P.yeso4 : j > 0 ? P.vidrio0 : P.vidrio3); } } }
  for (let k = 0; k < 2; k++) { const u = ((t * 0.09 + k * 0.5) % 1), x = Math.round(70 - u * 70), y = Math.round(40 + k * 14 + Math.sin(t * 3 + k) * 2), a = Math.sin(t * 14 + k) > 0;
    pset(x, y, P.acero0); pset(x + 1, y, P.acero0); pset(x - 1, y + (a ? -1 : 1), P.acero0); pset(x + 2, y + (a ? -1 : 1), P.acero0); }
  R.recorte(null);
  // el parteluz y los travesaños de la ventana (por delante del cielo)
  rect(35, 20, 37, 96, P.marco); rect(35, 20, 35, 96, P.marcoL); for (const y of [56, 76]) { rect(14, y, 58, y + 1, P.marco); rect(14, y, 58, y, P.marcoL); }
  for (let a = Math.PI; a <= 2 * Math.PI + 0.01; a += 0.02) { pset(Math.round(36 + Math.cos(a) * 22), Math.round(42 + Math.sin(a) * 22), P.marco); pset(Math.round(36 + Math.cos(a) * 23), Math.round(42 + Math.sin(a) * 23), P.marcoL); }
  rect(13, 42, 14, 96, P.marco); rect(58, 42, 59, 96, P.marco); rect(13, 96, 59, 96, P.marco);
  // el haz de la ventana con motas de polvo que flotan
  for (let k = 0; k < 14; k++) { const u = (h(k, 2, 64) + t * 0.02 * (1 + k % 3)) % 1, x = Math.round(30 + u * 60 + Math.sin(t * 0.7 + k) * 3), y = Math.round(60 + h(k, 3, 64) * 60 + Math.sin(t * 0.5 + k * 2) * 4); if (Math.sin(t * 1.3 + k) > -0.3) pset(x, y, P.yeso4); }
  // en la galería, al otro lado del cristal, pasan visitantes (recortados a cada hoja de la puerta)
  for (const [x0, x1] of [[119, 138], [148, 167]]) { R.recorte([x0, 50, x1, 104]);
    for (let k = 0; k < 3; k++) { const v = 5 + k * 2, dir = k % 2 ? -1 : 1, u = ((t * v + k * 37) % 120), x = dir > 0 ? 100 + u : 190 - u; const cols = [hex('#e8b890'), [hex('#a83a3a'), hex('#3a5a8a'), hex('#5a7a4a')][k], hex('#2a2a34'), [hex('#3a2a1c'), hex('#c8c0b0'), hex('#8a5a2a')][k]];
      const s = 102, x0r = Math.round(x), a = Math.floor(t * 6 + k) % 2; for (let j = 0; j < 6; j++) for (let i = -1; i <= 1; i++) pset(x0r + i, s - 9 + j, cols[1]); pset(x0r - 1, s - 3 + a, cols[2]); pset(x0r + 1, s - 2 - a, cols[2]); pset(x0r - 1, s - 2, cols[2]); pset(x0r + 1, s - 3, cols[2]);
      for (let j = 0; j < 3; j++) for (let i = -1; i <= 1; i++) pset(x0r + i, s - 12 + j, j === 0 ? cols[3] : cols[0]); }
    R.recorte(null); }
  // la aguja del reloj (un minuto cada 8 s) y la del segundero
  { const am = t * Math.PI * 2 / 60 - Math.PI / 2, as = t * Math.PI * 2 / 8 - Math.PI / 2; linea(236, 32, Math.round(236 + Math.cos(am * 0.1 - 1) * 3), Math.round(32 + Math.sin(am * 0.1 - 1) * 3), P.negro); linea(236, 32, Math.round(236 + Math.cos(as) * 4), Math.round(32 + Math.sin(as) * 4), P.sepia); }
  // la pantallita del panel de los rayos X: una imagen gris que se dibuja por franjas y el piloto
  for (let y = 107; y <= 111; y++) for (let x = 259; x <= 267; x++) { const vis = ((t * 6) % 12) > (x - 259); pset(x, y, vis ? f_ton([P.pantalla, P.pantallaL, P.luzT1], 0.5 + h(x, y, 65) * 1.6, x, y) : P.pantalla); }
  pset(267, 105, Math.sin(t * 4) > 0 ? P.verdeL : P.rx0);
  // la lámpara articulada pinzada a la esquina de la mesa, con su cono cálido
  linea(116, 132, 112, 110, P.acero0); linea(117, 132, 113, 110, P.acero2); linea(112, 110, 126, 98, P.acero0); linea(113, 110, 127, 98, P.acero2); disco(112, 110, 1, P.acero3);
  rect(124, 96, 132, 100, P.negro); rect(124, 96, 132, 96, P.acero2); rect(126, 101, 130, 101, P.luzT2);
  // el tablero con el mapa (apagado o encendido; al arrancar, el tubo parpadea)
  const luz0 = f_01(o.luz ?? 0), parp = luz0 > 0 && luz0 < 0.35 ? (Math.sin(t * 47) > 0.2 ? 1 : 0.15) : 1, luz = luz0 * parp;
  f_tablero(R, luz);
  // encima del tablero: dos pesas de tela que sujetan el mapa, los guantes blancos, una lupa y un lápiz
  linea(129, 135, 136, 135, hex('#3a5a3a')); linea(204, 143, 213, 143, hex('#3a5a3a'));
  rect(224, 141, 230, 143, P.guante); rect(224, 143, 230, 143, P.guanteS); pset(231, 141, P.guante); rect(226, 138, 232, 140, P.guanteS); rect(226, 138, 232, 138, P.guante);
  disco(108, 141, 2, P.acero2); disco(108, 141, 1, P.luzT1); linea(110, 143, 113, 145, P.mad1); linea(117, 144, 124, 142, P.oro2);
  // el cabezal de rayos X que baja del brazo, con su haz cuando trabaja
  const ray = o.rayos == null ? 0 : f_01(o.rayos), hx = Math.round(o.rayos == null ? 176 : 150 + ray * 72);
  rect(hx - 2, 66, hx + 2, 84, P.rx2); rect(hx - 2, 66, hx - 2, 84, P.rx3); rect(hx - 3, 64, hx + 3, 67, P.rx1);
  rect(hx - 6, 84, hx + 6, 92, P.rx2); rect(hx - 6, 84, hx + 6, 84, P.rx3); rect(hx + 5, 85, hx + 6, 92, P.rx0); for (let x = hx - 5; x <= hx + 5; x++) pset(x, 89, (x >> 1) % 2 ? P.amarillo : P.negro);
  rect(hx - 4, 93, hx + 4, 95, P.rx0); rect(hx - 2, 96, hx + 2, 96, P.negro); pset(hx + 3, 86, ray > 0 && Math.sin(t * 9) > 0 ? P.rojoL : P.rx0);
  if (o.rayos != null && ray > 0 && ray < 1) for (let y = 97; y < 134; y++) { const w = 1 + (y - 97) * 0.22; for (let x = Math.round(hx - w); x <= hx + w; x++) if (f_b4(x, y + Math.floor(t * 8)) < 0.3) pset(x, y, f_mez(R.pget(x, y), P.rayo, 0.6)); }
  // la luz de la mesa sube por la pared y la puerta, ilumina el borde de los objetos y se refleja en el parqué
  if (luz > 0.05) { f_bano(R, 170, 132, 96, 46, P.luzT3, luz * 0.85, 0, 70, 319, 131); f_bano(R, 170, 166, 90, 10, P.luzT2, luz * 0.6, 0, 158, 319, 179);
    rect(110, 131, 230, 131, f_mez(P.acero3, P.luzT3, 0.6 * luz)); }
  return { suelo: 160, libre: [30, 250], mesa: [100, 132, 240, 159], mapa: [124, 134, 216, 144], cabezal: [hx, 96], puerta: [116, 44, 170, 127], ventana: [14, 20, 58, 96], reloj: [236, 32] };
}

// el carrito de archivo de acero (por delante de los personajes, a la derecha): dos baldas con cajas, carpetas y tubos
function f_carrito(R, t) {
  const { rect, pset, linea, disco } = R, P = f_P;
  for (const ux of [268, 316]) { rect(ux, 128, ux + 2, 174, P.acero2); rect(ux, 128, ux, 174, P.acero4); disco(ux + 1, 176, 2, P.negro); pset(ux + 1, 175, P.acero3); }
  for (const by of [146, 170]) { rect(266, by, 319, by + 2, P.acero3); rect(266, by + 3, 319, by + 3, P.acero0); }
  rect(266, 126, 319, 127, P.acero3);
  // en la balda de arriba, dos cajas de archivo y un tubo de mapa
  for (const [x0, w, az] of [[272, 14, true], [288, 12, false]]) { const c = az ? [P.caja0, P.caja1, P.caja2] : [P.cajaB0, P.cajaB1, P.cajaB2]; rect(x0, 130, x0 + w, 145, c[1]); rect(x0, 130, x0 + w, 130, c[2]); rect(x0, 131, x0, 145, c[2]); rect(x0 + w, 131, x0 + w, 145, c[0]); rect(x0 + 3, 134, x0 + w - 3, 136, P.yeso4); rect(x0 + Math.floor(w / 2) - 1, 140, x0 + Math.floor(w / 2) + 1, 141, c[0]); }
  linea(302, 145, 314, 133, P.cajaB2); linea(303, 145, 315, 133, P.cajaB1); linea(303, 146, 315, 134, P.cajaB0); disco(314, 133, 1, P.yeso4);
  // abajo, carpetas grandes de mapas apiladas
  for (let k = 0; k < 4; k++) { const y = 167 - k * 4; rect(270 + k, y, 314 - k, y + 3, [P.cajaB1, P.caja1, P.cajaB2, P.caja2][k]); rect(270 + k, y, 314 - k, y, P.yeso4); pset(292, y + 2, P.acero0); }
}

// la hoja del mapa: x 30–272, y 24–168 (la acuarela en x 36–266, y 30–162); el parche del norte, un papel distinto, en
// x 98–136, y 38–72; el del sur en x 196–220, y 76–94; la estrella bajo el norte en (116, 53)
const f_MAPA = [30, 24, 272, 168], f_ACU = [36, 30, 266, 162], f_PARCHE = [98, 38, 136, 72], f_PARCHE2 = [196, 76, 220, 94], f_ESTRELLA = [116, 53];

const f_uv = (x, y) => [(x - f_ACU[0]) / (f_ACU[2] - f_ACU[0]), (y - f_ACU[1]) / (f_ACU[3] - f_ACU[1])];

// borde irregular del papel (deshilachado) y del parche (cortado a tijera, un poco torcido)
const f_enHoja = (x, y) => x >= f_MAPA[0] + (h(0, y >> 1, 70) > 0.8 ? 1 : 0) && x <= f_MAPA[2] - (h(1, y >> 1, 70) > 0.8 ? 1 : 0) && y >= f_MAPA[1] + (h(x >> 1, 0, 70) > 0.8 ? 1 : 0) && y <= f_MAPA[3] - (h(x >> 1, 1, 70) > 0.8 ? 1 : 0);

const f_enParche = (x, y, P) => { const [x0, y0, x1, y1] = P, sk = (y - y0) * 0.06; return x >= x0 + sk && x <= x1 + sk && y >= y0 + (x - x0) * 0.04 && y <= y1 + (x - x0) * 0.04; };

// la estrellita de cuatro puntas, roja y azul con su filo oscuro (r: largo de las puntas)
function f_estrella(R, cx, cy, r, a = 1) {
  const P = f_P, den = (i, j, k) => (i <= (r + k - j) * 0.36 + 0.7 && j <= r + k) || (j <= (r + k - i) * 0.36 + 0.7 && i <= r + k);
  for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) {
    if (a < 1 && f_b4(cx + i, cy + j) > a) continue;
    const ai = Math.abs(i), aj = Math.abs(j);
    if (den(ai, aj, 0)) R.pset(cx + i, cy + j, (i >= 0) === (j <= 0) ? P.estRojo : P.estAzul);
    else if (den(ai, aj, 1.4)) R.pset(cx + i, cy + j, P.sepia);
  }
  R.pset(cx, cy, P.pap5);
}

// un barquito de acuarela (casco pardo, dos velas con su cruz roja y la banderita) que cabecea en el agua
function f_barquito(R, x, y, t, k) {
  const P = f_P, c = Math.round(Math.sin(t * 1.6 + k * 2) * 0.8); x = Math.round(x); y = Math.round(y) + c;
  R.rect(x - 4, y, x + 4, y + 1, P.sepia); R.rect(x - 3, y + 2, x + 3, y + 2, P.sepiaL); R.pset(x + 5, y - 1, P.sepia); R.pset(x - 5, y - 1, P.sepia);
  R.linea(x - 1, y - 1, x - 1, y - 8, P.sepia); R.linea(x + 2, y - 1, x + 2, y - 6, P.sepia);
  R.rect(x - 4, y - 7, x - 2, y - 2, P.pap5); R.rect(x, y - 7, x, y - 2, P.pap5); R.rect(x + 3, y - 5, x + 4, y - 2, P.pap5); R.pset(x - 1, y - 5, P.estRojo); R.pset(x - 3, y - 5, P.estRojo); R.pset(x - 1, y - 4, P.estRojo); R.pset(x - 1, y - 6, P.estRojo);
  R.pset(x, y - 9, P.estRojo); R.pset(x + 1, y - 9 + (Math.sin(t * 5 + k) > 0 ? 0 : 1), P.estRojo);
  for (let i = -6; i <= 6; i += 3) R.pset(x + i + (Math.floor(t * 2) % 2), y + 3, P.mar3);
}

// el fondo fijo del primer plano del mapa: el cristal de la mesa de luz con su cuadrícula grabada, el marco de aluminio
// abajo, la hoja con la acuarela a contraluz (sin los parches, que van aparte), pueblitos, arbolitos, barquitos, la rosa
// de los vientos, y las pesas de tela y de cristal que sujetan la hoja
function f_mapaFondo(R) {
  const { rect, pset, linea, disco } = R, P = f_P, LUZ = [P.luzT0, P.luzT1, P.luzT2, P.luzT3];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (f_enHoja(x, y)) { const [u, v] = f_uv(x, y), dentro = u >= 0 && u <= 1 && v >= 0 && v <= 1;
      pset(x, y, dentro ? f_mapaCol(u, v, x, y, 1, true) : f_papel(x, y, 1)); continue; }
    // el cristal: más tibio y algo más oscuro arriba (la barra del año y Atom leen bien), cuadrícula de medir grabada
    const v = 1.1 + y / 90 - Math.abs(x - 150) / 400 - (x > 270 && y < 50 ? 0.6 : 0), rej = (x % 12 === 0 || y % 12 === 0) && y < 170;
    pset(x, y, rej ? f_mez(f_ton(LUZ, v, x, y), P.acero2, 0.28) : f_ton(LUZ, v, x, y));
  }
  // la sombra suave de la hoja sobre el cristal (abajo y a la derecha)
  for (let y = f_MAPA[1] + 2; y <= f_MAPA[3] + 2; y++) if ((y & 1) === 0) pset(f_MAPA[2] + 1, y, P.luzT0);
  for (let x = f_MAPA[0] + 2; x <= f_MAPA[2] + 1; x++) if ((x & 1) === 0) pset(x, f_MAPA[3] + 1, P.luzT0);
  // el marco de la acuarela: doble línea sepia
  for (const k of [0, 2]) { linea(f_ACU[0] - k, f_ACU[1] - k, f_ACU[2] + k, f_ACU[1] - k, k ? P.sepiaL : P.sepia); linea(f_ACU[0] - k, f_ACU[3] + k, f_ACU[2] + k, f_ACU[3] + k, k ? P.sepiaL : P.sepia);
    linea(f_ACU[0] - k, f_ACU[1] - k, f_ACU[0] - k, f_ACU[3] + k, k ? P.sepiaL : P.sepia); linea(f_ACU[2] + k, f_ACU[1] - k, f_ACU[2] + k, f_ACU[3] + k, k ? P.sepiaL : P.sepia); }
  // el pliegue vertical de la hoja y manchas de óxido del papel
  for (let y = f_MAPA[1]; y <= f_MAPA[3]; y++) { pset(151, y, f_mez(R.pget(151, y), P.pap0, 0.25)); pset(152, y, f_mez(R.pget(152, y), P.pap5, 0.4)); }
  for (let k = 0; k < 16; k++) { const x = Math.round(f_MAPA[0] + 4 + h(k, 1, 71) * 234), y = Math.round(f_MAPA[1] + 4 + h(k, 2, 71) * 136); pset(x, y, f_mez(R.pget(x, y), P.pap0, 0.4)); if (k % 3 === 0) pset(x + 1, y, f_mez(R.pget(x + 1, y), P.pap0, 0.3)); }
  // arbolitos de White sobre la tierra firme (tronquito y copa en dos verdes)
  for (let k = 0; k < 70; k++) { const x = Math.round(f_ACU[0] + 4 + h(k, 3, 72) * 222), y = Math.round(f_ACU[1] + 4 + h(k, 4, 72) * 70), [u, v] = f_uv(x, y);
    if (v > f_costa(u) - 0.06 || f_enParche(x, y, f_PARCHE) || f_enParche(x, y, f_PARCHE2)) continue;
    pset(x, y + 1, P.sepia); pset(x, y, P.tie0); pset(x - 1, y, P.tie0); pset(x + 1, y, P.tie1); pset(x, y - 1, P.tie1); pset(x, y - 2, P.tie2); }
  // los pueblos: un circulito de casitas con su cerca (sepia y rojo)
  for (const [pu, pv] of [[0.16, 0.36], [0.55, 0.42], [0.86, 0.38], [0.47, 0.62], [0.25, 0.5], [0.64, 0.3]]) { const x = Math.round(f_ACU[0] + pu * 230), y = Math.round(f_ACU[1] + pv * 132);
    R.anillo(x, y, 2.6, P.sepia); pset(x, y, P.estRojo); pset(x - 1, y - 1, P.sepiaL); pset(x + 1, y - 1, P.sepiaL); }
  // la rosa de los vientos en el mar: ocho puntas alternas sepia y claras, con su círculo
  { const cx = 78, cy = 146; R.anillo(cx, cy, 9, P.sepiaL); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 - Math.PI / 2, l = k % 2 ? 7 : 12; linea(cx, cy, Math.round(cx + Math.cos(a) * l), Math.round(cy + Math.sin(a) * l), k % 2 ? P.sepiaL : P.sepia); }
    for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; linea(cx, cy, Math.round(cx + Math.cos(a) * 30), Math.round(cy + Math.sin(a) * 30), (x, y) => (x + y) % 3 === 0 && y < f_ACU[3] && x > f_ACU[0] ? P.mar1 : null); }
    disco(cx, cy, 2, P.estRojo); pset(cx, cy - 12, P.estRojo); }
  // las pesas que sujetan la hoja: dos culebras de tela verde con su sombra y un pisapapeles de cristal
  for (const [x0, y0, x1, y1] of [[40, 172, 112, 172], [190, 172, 262, 172]]) { for (let x = x0; x <= x1; x++) { pset(x, y0 - 2, hex('#4a7a4a')); pset(x, y0 - 1, (x >> 1) % 2 ? hex('#3a603a') : hex('#4a7a4a')); pset(x, y0, hex('#2a462a')); pset(x + 1, y0 + 1, P.luzT0); } pset(x0, y0 - 1, hex('#2a462a')); pset(x1, y0 - 1, hex('#2a462a')); }
  // en el margen derecho del cristal: un paño de algodón blanco doblado en tres (pliegues y sombra) y una pesa de latón
  { const [x0, y0, x1, y1] = [282, 60, 310, 82];
    R.rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, P.luzT0); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#a8acb0')); R.rect(x0, y0, x1, y1, hex('#f8f8f2'));
    for (const fy of [y0 + 7, y0 + 15]) { R.rect(x0, fy, x1, fy, hex('#d4d8d4')); R.rect(x0, fy + 1, x1, fy + 1, hex('#ffffff')); }
    for (let y = y0; y <= y1; y++) if ((y & 1) === 0) pset(x1, y, hex('#dcdfdc'));
    for (let x = x0 + 2; x < x1; x += 3) { pset(x, y1 - 1, hex('#e4e6e0')); } R.rect(x0 + 3, y1, x1 - 3, y1, hex('#c8ccc8')); }
  { const cx = 296, cy = 90; disco(cx + 1, cy + 2, 5, P.luzT0); disco(cx, cy, 5, hex('#8a6a20')); disco(cx, cy, 4, hex('#c8a040')); disco(cx - 1, cy - 1, 2, hex('#f0d878')); R.rect(cx - 1, cy - 8, cx + 1, cy - 4, hex('#8a6a20')); disco(cx, cy - 9, 2, hex('#c8a040')); pset(cx - 1, cy - 10, hex('#f0d878')); }
  linea(280, 112, 312, 100, hex('#e8c040')); linea(280, 113, 312, 101, hex('#b8901c')); pset(279, 113, hex('#f0c8a0')); pset(278, 113, P.sepia); R.rect(313, 98, 315, 101, hex('#e89aa0'));
  disco(292, 150, 9, P.luzT0); disco(291, 149, 8, hex('#d8eef0')); disco(288, 146, 2, P.luzT3); R.anillo(291, 149, 8, P.acero2);   // el pisapapeles de cristal
}
// la acuarela de un parche (papel de otro tono con la costa que White volvió a pintar encima) en x, y
const f_parchePx = (x, y, P0) => { const [u, v] = f_uv(x, y), base = f_mapaCol(u, v, x, y, 0.5, true); return f_mez(base, f_P.parche2, 0.62); };

// EL MAPA DE CERCA: o.parche 0–1 vuelve transparente el parche del norte y aparece la estrella que late; o.rayos 0–1
// pasa la franja azulada de los rayos X de izquierda a derecha (donde cruza el parche, la estrella se ve un momento);
// la luz de la mesa respira un poco y flotan motas de polvo
function f_mapaCerca(R, t, o) {
  const { pset, linea } = R, P = f_P;
  R.copiar(f_capa(R, 'rk_mapa', () => f_mapaFondo(R)));
  const pa = f_01(o.parche ?? 0), ray = o.rayos == null ? -1 : f_01(o.rayos), rx = Math.round(f_MAPA[0] - 12 + ray * (f_MAPA[2] - f_MAPA[0] + 24));
  // los dos parches de papel: el del sur siempre opaco; el del norte se aclara y deja ver la estrella
  for (const [PP, norte] of [[f_PARCHE, true], [f_PARCHE2, false]]) { const [x0, y0, x1, y1] = PP;
    for (let y = y0; y <= y1 + 3; y++) for (let x = x0; x <= x1 + 4; x++) { if (!f_enParche(x, y, PP)) { if (f_enParche(x - 1, y - 1, PP)) pset(x, y, f_mez(R.pget(x, y), P.sepia, 0.35)); continue; }
      const enRayo = ray >= 0 && Math.abs(x - rx) < 7, tr = norte ? Math.max(pa * 0.85, enRayo ? 0.75 : 0) : (enRayo ? 0.4 : 0);
      const opaco = f_parchePx(x, y, PP), borde = !f_enParche(x - 1, y, PP) || !f_enParche(x, y - 1, PP) || !f_enParche(x + 1, y, PP) || !f_enParche(x, y + 1, PP);
      pset(x, y, borde ? f_mez(P.parche0, P.sepiaL, 0.3) : tr > 0 ? f_mez(opaco, R.pget(x, y), tr) : opaco); }
    if (norte) { pset(x1 + 2, y0 + 1, P.parche2); pset(x1 + 1, y0 + 1, P.parche0); }   // una esquina que se levanta
  }
  // los barquitos de White en el mar y en el estrecho
  f_barquito(R, 140, 146, t, 0); f_barquito(R, 214, 140, t, 1); f_barquito(R, 186, 104, t, 2);
  // la estrellita: aparece con el parche y late
  const vis = Math.max(pa, ray >= 0 && Math.abs(f_ESTRELLA[0] - rx) < 8 ? 0.8 : 0);
  if (vis > 0) { const r = 5 + (pa >= 1 ? Math.round((Math.sin(t * 4) + 1) * 0.6) : 0); if (pa > 0.6) for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5 + t * 0.8, d = 9 + Math.sin(t * 4 + k) * 1.5; pset(Math.round(f_ESTRELLA[0] + Math.cos(a) * d), Math.round(f_ESTRELLA[1] + Math.sin(a) * d), P.luzT3); }
    f_estrella(R, f_ESTRELLA[0], f_ESTRELLA[1], r, Math.min(1, vis * 1.2)); }
  // la franja de los rayos X: un velo azul violeta con su filo claro
  if (ray >= 0 && ray < 1) for (let y = 0; y < 180; y++) for (let x = rx - 6; x <= rx + 6; x++) { if (x < 0 || x > 319) continue; const e = Math.abs(x - rx); if (e === 6) { if ((y + Math.floor(t * 20)) % 3 === 0) pset(x, y, P.luzT3); continue; } pset(x, y, f_mez(R.pget(x, y), P.rayo, 0.32 - e * 0.03)); }
  // la luz de abajo respira y flotan motas de polvo
  { const b = Math.sin(t * 1.3) * 0.5 + 0.5; for (let k = 0; k < 18; k++) { const x = Math.round((h(k, 5, 73) * 320 + t * (3 + k % 4) + Math.sin(t + k) * 4) % 320), y = Math.round((h(k, 6, 73) * 180 - t * (1.5 + k % 3)) % 180 + 180) % 180; if (!f_atom(x, y) && !(y < 21 && x > 18 && x < 172)) pset(x, y, b > 0.5 && k % 2 ? P.luzT3 : P.pap5); } }
  return { suelo: 180, libre: [0, 0], parche: f_PARCHE.slice(), parcheSur: f_PARCHE2.slice(), estrella: f_ESTRELLA.slice(), hoja: f_MAPA.slice(), rayo: [rx, 90] };
}

const f_S = pal({
  cie0: '#7aa6d0', cie1: '#92b8dc', cie2: '#aecbe4', cie3: '#c8dcea', cie4: '#e2e8e0',
  nub0: '#a8b4c4', nub1: '#dfe5ec', nub2: '#ffffff', nubL0: '#b8c4d0', nubL1: '#d8e0e6', nubL2: '#eef2f4',
  sol: '#fff4c8', solL: '#fffbe8', orilla0: '#4a6a5a', orilla1: '#6a8a74',
  agua0: '#5e4a32', agua1: '#7a6040', agua2: '#947852', agua3: '#b09468', agua4: '#d0bc94',
  pin0: '#1e3424', pin1: '#2e4a32', pin2: '#3e6040', pin3: '#567a4e', tron0: '#3a2a1e', tron1: '#5a4430',
  cip0: '#3e4a28', cip1: '#56662e', cip2: '#70803a', cip3: '#8c9a4a', cipT0: '#5a4634', cipT1: '#7a6248', cipT2: '#9a8264', musgo0: '#8a9a88', musgo1: '#aab4a4',
  hie0: '#5a7a32', hie1: '#6e8e3a', hie2: '#86a246', hie3: '#a0b85a', hie4: '#bccc78', junco: '#9a9a4a', juncoL: '#c0b868',
  tie0: '#3e2a1a', tie1: '#5a3e26', tie2: '#7a5636', tie3: '#9a7450', tie4: '#b89468', arenaE: '#c8aa7a',
  cuerda: '#f4f0e4', cinta: '#ff5aa0', estaca: '#b8945a', blancoC: '#e8ecee', blancoCS: '#b8c0c6', cristalC: '#6a8ca4', rueda: '#22242a',
  lona: '#3a72b8', lonaS: '#28548c', lonaL: '#5a92d0', cubo: '#e86a2a', cuboS: '#b04a1a', garza0: '#5a6a80', garza1: '#8a9ab0', garza2: '#c8d0dc', pico: '#e8b040',
  barro0: '#c8b08a', barro1: '#e2d2b0', barro2: '#f2e8d0', verde0: '#3a7a3a', verde1: '#5aa04a', verde2: '#8ccc6a', pardo0: '#6a3a1e', pardo1: '#8a5230', pardo2: '#b07444',
  grafito: '#5a5e64', grafitoL: '#9a9ea4', bandeja0: '#c8ccd0', bandeja1: '#dde0e2', bandeja2: '#eef0f0', bandeja3: '#ffffff',
  tabla0: '#8a6a44', tabla1: '#a4825a', tabla2: '#bc9a6e', tabla3: '#d2b488',
});

const f_HOR = 90, f_ORILLA = 118;

// el fondo fijo del Sitio X, en dos capas: el cielo tramado con el halo del sol (f_sitioCielo) y, por delante de las nubes, la orilla de enfrente, el agua ancha y marrón con los
// reflejos de los cipreses, el bosque de pinos de la izquierda, los cipreses calvos con su musgo y sus «rodillas» en el
// agua, el campo segado con sus franjas, la camioneta, el toldo azul, la criba, el montón de tierra y la cuadrícula
// grande abierta (x 148–238, y 146–166) con sus estratos, cuerdas y estacas
function f_sitioCielo(R) {
  const S = f_S, CIE = [S.cie0, S.cie1, S.cie2, S.cie3, S.cie4];
  for (let y = 0; y < f_HOR + 2; y++) for (let x = 0; x < 320; x++) { const ds = Math.hypot(x - 236, (y - 34) * 1.2); R.pset(x, y, f_ton(CIE, y / f_HOR * 3.3 + Math.max(0, 1 - ds / 70) * 1.2, x, y)); }
}

// pega una capa con huecos (los píxeles a 0 dejan ver lo de detrás): la tierra y los árboles por delante de las nubes
function f_encima(R, b) { const B = R.buf; for (let i = 0; i < b.length; i++) { const c = b[i]; if (c) B[i] = c; } }

// el resto del fondo fijo (sobre un búfer vacío: el cielo queda transparente)
function f_sitioFondo(R) {
  const { rect, pset, linea, poligono, disco } = R, S = f_S;
  const CIE = [S.cie0, S.cie1, S.cie2, S.cie3, S.cie4], AGU = [S.agua0, S.agua1, S.agua2, S.agua3, S.agua4], HIE = [S.hie0, S.hie1, S.hie2, S.hie3, S.hie4];
  // la orilla de enfrente: una línea de bosque lejano, azulado, con entrantes
  for (let x = 0; x < 320; x++) { const top = f_HOR - 3 - Math.round(h(x >> 2, 0, 80) * 3 + Math.sin(x * 0.05) * 1.5); for (let y = top; y < f_HOR + 1; y++) pset(x, y, y === top ? S.orilla1 : f_ton([S.orilla0, S.orilla1], 0.6 + h(x, y, 81) * 0.5, x, y)); }
  // el agua ancha y marrón (color té): lejos refleja el cielo, cerca es más oscura; ondas claras y oscuras y el
  // reflejo de la orilla de enfrente
  for (let y = f_HOR + 1; y < f_ORILLA; y++) for (let x = 0; x < 320; x++) { const k = (y - f_HOR) / (f_ORILLA - f_HOR), on = (y + Math.round(Math.sin(x * 0.09 + y * 1.7) * 1.5)) % 3;
    let v = 2.2 - k * 1.7 + (on === 0 ? 0.5 : -0.2) + (h(x >> 3, y, 83) - 0.5) * 0.5; if (y < f_HOR + 4) v -= 1;
    let c = y < f_HOR + 4 && (x + y) % 2 ? f_mez(f_ton(AGU, v, x, y), S.orilla0, 0.5) : f_ton(AGU, v, x, y);
    if (on === 0 && h(x >> 2, y, 84) > 0.55) c = f_mez(c, S.cie2, 0.45 - k * 0.25);   // el cielo reflejado en las ondas
    pset(x, y, c); }
  // el bosque de pinos de la izquierda: la masa del sotobosque y pinos altos de tronco desnudo y copa en racimos
  for (let x = 0; x < 152; x++) { const borde = 152 - x < 34 ? (152 - x) * 1.1 : 38; const top = f_ORILLA - 8 - borde + Math.round(h(x >> 2, 2, 84) * 6 + Math.sin(x * 0.2) * 2);
    for (let y = top; y < f_ORILLA + 2; y++) pset(x, y, f_ton([S.pin0, S.pin1, S.pin2, S.pin3], 2.2 - (y - top) / 16 + (h(x >> 1, y >> 1, 85) - 0.5) * 1.2, x, y)); }
  for (let k = 0; k < 17; k++) { const px = 4 + k * 9 + Math.round(h(k, 3, 86) * 5); if (px > 140) break; const top = Math.max(26, f_ORILLA - 82 + Math.round(h(k, 4, 86) * 18) + Math.max(0, px - 112) * 1.4);
    linea(px, top + 6, px, f_ORILLA - 20, S.tron0); linea(px + 1, top + 6, px + 1, f_ORILLA - 20, S.tron1); for (let y = top + 10; y < f_ORILLA - 22; y += 5) pset(px + 1, y, S.tron0);
    for (let j = 0; j < 7; j++) { const bx = px + Math.round((h(k, j, 87) - 0.5) * 12), by = top + Math.round(h(k, j + 9, 87) * 14), r = 2 + Math.round(h(k, j + 20, 87) * 2);
      if (j < 3) linea(px, by + 3, bx, by, S.tron0); disco(bx, by + 1, r, S.pin0); disco(bx, by, r, S.pin1); disco(bx - 1, by - 1, Math.max(1, r - 1), S.pin2); pset(bx - 1, by - r, S.pin3); } }
  // los cipreses calvos en el agua: tronco que se ensancha en la base, copa plana y plumosa en racimos de tres tonos,
  // ramas, barbas de musgo gris, las rodillas y el reflejo
  for (const [cx, base, alto, w] of [[188, 114, 52, 13], [228, 110, 58, 16], [258, 112, 52, 12], [304, 114, 38, 9]]) {
    const top = base - alto;
    for (let y = top + 8; y <= base; y++) { const ancho = 1 + Math.max(0, (y - base + 12)) * 0.45; for (let x = Math.round(cx - ancho); x <= Math.round(cx + ancho); x++) pset(x, y, x < cx - ancho + 1.2 ? S.cipT2 : x > cx + ancho - 1.2 ? S.cipT0 : S.cipT1); if ((y * 3) % 7 === 0) pset(cx, y, S.cipT0); }
    for (let j = 0; j < 4; j++) { const by = top + 4 + j * 5; linea(cx, by + 6, cx + (j % 2 ? 1 : -1) * Math.round(w * 0.7), by, S.cipT0); }
    const grupos = 7 + Math.round(w / 2);
    for (let k = 0; k < grupos; k++) { const bx = cx + Math.round((h(k, cx, 88) - 0.5) * 2 * w), by = top + Math.round(h(k, cx + 1, 88) ** 1.6 * alto * 0.38), r = 2 + Math.round(h(k, cx + 2, 88) * 2.2);
      disco(bx, by + 1, r + 0.5, S.cip0); disco(bx, by, r, S.cip1); disco(bx - 1, by - 1, Math.max(1, r - 1), S.cip2); pset(bx - 1, by - r, S.cip3); pset(bx, by - r, S.cip3); }
    for (let k = 0; k < 6; k++) { const mx = cx - w + 2 + Math.round(h(k, cx, 89) * (2 * w - 4)), my = top + 4 + Math.round(h(k, cx + 3, 89) * alto * 0.3); for (let j = 0; j < 3 + k % 3; j++) pset(mx + (j > 2 ? 1 : 0), my + j, j % 2 ? S.musgo0 : S.musgo1); }
    for (let y = base + 1; y < Math.min(f_ORILLA, base + 1 + alto); y++) { const ry = base - (y - base); if (y % 3 !== 0) for (let x = cx - w - 1; x <= cx + w + 1; x++) { const c = R.pget(x + (y % 2), ry); if (c === S.cip1 || c === S.cip0 || c === S.cipT1 || c === S.cipT0) pset(x, y, f_mez(R.pget(x, y), S.agua0, 0.45)); } }
    for (const dx of [-w + 3, w - 4, 5, -6]) { pset(cx + dx, base + 1, S.cipT1); pset(cx + dx, base, S.cipT2); }   // las rodillas
  }
  // la orilla: barro, juncos y hierba alta
  for (let x = 0; x < 320; x++) { const y0 = f_ORILLA - (x < 150 ? 1 : 0); pset(x, y0, S.tie2); pset(x, y0 + 1, S.tie3); for (let j = 0; j < 3 + Math.round(h(x, 5, 89) * 4); j++) if (h(x, j, 90) > 0.45) pset(x, y0 - j, j > 3 ? S.juncoL : S.junco); }
  // el campo segado: franjas de cortacésped en diagonal, matas, parches de tierra y florecitas
  for (let y = f_ORILLA + 2; y < 180; y++) for (let x = 0; x < 320; x++) { const k = (y - f_ORILLA) / 62, franja = Math.floor((x + (y - f_ORILLA) * 2.4) / 22) % 2;
    pset(x, y, f_ton(HIE, 1.6 + k * 1.2 + (franja ? 0.5 : -0.1) + (h(x >> 1, y, 91) - 0.5) * 0.9 + (h(x >> 4, y >> 3, 92) - 0.5) * 0.6, x, y)); }
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 6, 93) * 320), y = f_ORILLA + 4 + Math.round(h(k, 7, 93) * 56); if (k % 5 === 0) { pset(x, y, hex('#f8f0a0')); pset(x + 1, y + 1, hex('#f8f0a0')); } else { pset(x, y, S.hie0); pset(x + 1, y - 1, S.hie0); } }
  // el camino de rodadas de la camioneta
  for (let y = 132; y < 180; y++) { const xc = 40 + (y - 132) * 0.9; for (const d of [-7, 7]) for (let i = -1; i <= 1; i++) pset(Math.round(xc + d * (0.8 + (y - 132) / 60) + i), y, f_ton([S.tie2, S.tie3, S.tie4], 1 + h(y, i, 94), xc + i, y)); }
  // la camioneta blanca de la excavación, con la trampilla abierta, cubos y una pala en la caja
  { const x = 14, s = 138; rect(x + 2, s - 16, x + 46, s - 6, S.blancoC); rect(x + 2, s - 16, x + 46, s - 16, hex('#ffffff')); rect(x + 2, s - 7, x + 46, s - 6, S.blancoCS);
    poligono([[x + 28, s - 16], [x + 31, s - 24], [x + 44, s - 24], [x + 46, s - 16]], S.blancoC); poligono([[x + 31, s - 22], [x + 33, s - 23], [x + 43, s - 23], [x + 44, s - 17], [x + 31, s - 17]], S.cristalC); pset(x + 34, s - 21, hex('#c8dce8'));
    rect(x + 4, s - 18, x + 26, s - 17, S.blancoCS); rect(x + 7, s - 22, x + 11, s - 17, S.cubo); rect(x + 7, s - 22, x + 11, s - 22, S.cuboS); rect(x + 14, s - 21, x + 18, s - 17, hex('#3a5a9a')); linea(x + 20, s - 28, x + 24, s - 17, S.tron1);
    rect(x, s - 8, x + 2, s - 6, hex('#d04030')); rect(x + 46, s - 12, x + 47, s - 10, hex('#fff0a0')); rect(x + 30, s - 13, x + 32, s - 13, S.blancoCS);
    for (const wx of [x + 10, x + 38]) { disco(wx, s - 4, 4, S.rueda); disco(wx, s - 4, 2, S.blancoCS); pset(wx, s - 4, S.rueda); }
    rect(x - 4, s - 2, x + 50, s - 1, f_mez(S.hie1, S.tie0, 0.4)); }
  // el toldo azul sobre la cuadrícula del fondo
  { const x0 = 98, x1 = 134; for (const lx of [x0, x1]) rect(lx, 120, lx, 138, hex('#8a9098'));
    for (let y = 116; y <= 121; y++) for (let x = x0 - 2; x <= x1 + 2; x++) pset(x, y, y === 116 ? S.lonaL : y === 121 ? S.lonaS : f_ton([S.lonaS, S.lona, S.lonaL], 1 + (x % 9 < 1 ? -0.6 : 0.3), x, y));
    poligono([[x0 + 2, 132], [x1 - 2, 132], [x1 - 4, 138], [x0 + 4, 138]], S.tie1); rect(x0 + 2, 132, x1 - 2, 132, S.tie3); for (let x = x0 + 4; x < x1 - 2; x += 8) linea(x, 132, x + 2, 138, S.cuerda); }
  // el montón de tierra cribada detrás de la cuadrícula grande
  for (let y = 134; y < 147; y++) { const w = (y - 133) * 2.2; for (let x = Math.round(186 - w); x <= Math.round(186 + w); x++) pset(x, y, f_ton([S.tie1, S.tie2, S.tie3, S.tie4], 2.6 - (x - 186 + w) / (2 * w) * 1.6 + (h(x, y, 95) - 0.5) * 0.8, x, y)); }
  // la cuadrícula grande abierta: la pared del fondo con sus estratos, el suelo de la excavación y las cuerdas
  { const T0 = 146, T1 = 166, xa = (y) => 156 - (y - T0) * 0.4, xb = (y) => 230 + (y - T0) * 0.4;
    for (let y = T0; y <= T1; y++) for (let x = Math.round(xa(y)); x <= Math.round(xb(y)); x++) {
      let c; if (y < T0 + 6) { const e = y - T0; c = e < 1 ? S.tie1 : e < 3 ? f_ton([S.tie0, S.tie1], 1 + h(x, y, 96) * 0.6, x, y) : e < 4 ? S.arenaE : f_ton([S.tie1, S.tie2], 0.6 + h(x, y, 97), x, y); }
      else c = f_ton([S.tie2, S.tie3, S.tie4], 1.4 + (y - T0) / 14 + (h(x >> 1, y >> 1, 98) - 0.5) * 0.7, x, y);
      pset(x, y, c); }
    rect(Math.round(xa(T0)) - 1, T0 - 1, Math.round(xb(T0)) + 1, T0 - 1, S.hie0);
    linea(193, T0 + 6, 193, T1, S.cuerda); linea(Math.round(xa(156)), 156, Math.round(xb(156)), 156, S.cuerda);
    linea(Math.round(xa(T0 + 1)), T0 + 1, Math.round(xa(T1)), T1, S.cuerda); linea(Math.round(xb(T0 + 1)), T0 + 1, Math.round(xb(T1)), T1, S.cuerda);
    for (const [ex, ey] of [[Math.round(xa(T0)), T0], [193, T0], [Math.round(xb(T0)), T0], [Math.round(xa(T1)), T1 + 1], [193, T1 + 1], [Math.round(xb(T1)), T1 + 1]]) { rect(ex, ey - 6, ex + 1, ey, S.estaca); pset(ex, ey - 6, f_mez(S.estaca, 0xffffffff, 0.4)); }
    // una regla de jalón, un paleta clavada y la tablilla en el borde
    for (let i = 0; i < 12; i++) pset(166 + i, 162, i % 4 < 2 ? hex('#d03030') : hex('#ffffff'));
    linea(216, 152, 219, 158, hex('#8a9098')); rect(214, 150, 217, 151, S.tron1); }
}

// el Sitio X: o.hallazgo 0–1 hace aparecer los trozos de cerámica que brillan en la cuadrícula (212, 160)
function f_sitioX(R, t, o) {
  const { rect, pset, linea, disco } = R, S = f_S;
  R.copiar(f_capa(R, 'rk_sitioCielo', () => f_sitioCielo(R)));
  const tierra = f_capa(R, 'rk_sitio', () => f_sitioFondo(R));
  // el sol con su halo que late, nubes de tres tonos a tres velocidades y cirros (fuera de la barra del año y de Atom)
  for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5 + t * 0.1; for (let r = 11; r < 16 + Math.sin(t * 2 + k) * 2; r++) { const x = Math.round(236 + Math.cos(a) * r), y = Math.round(34 + Math.sin(a) * r); if (f_b4(x, y) < 0.5) pset(x, y, S.solL); } }
  disco(236, 34, 9, S.solL); disco(236, 34, 8, S.sol); disco(234, 32, 3, hex('#ffffff'));
  for (let k = 0; k < 3; k++) { const w = 40 + k * 14, x0 = ((h(k, 8, 99) * 400 + t * (0.8 + k * 0.4)) % 440) - 60, y = 24 + k * 8; for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), yy = y + Math.round(Math.sin(i * 0.1 + k) * 1.2); if (x < 0 || x > 319 || f_atom(x, yy) || yy < 22 || h(i >> 2, k, 100) < 0.3) continue; pset(x, yy, Math.sin(i / w * Math.PI) > 0.5 ? S.nubL2 : S.nubL1); } }
  for (let k = 0; k < 7; k++) { const lejos = k < 3, w = lejos ? 12 + Math.round(h(k, 1, 101) * 8) : 24 + Math.round(h(k, 1, 101) * 14), v = lejos ? 1 + k * 0.3 : 2.6 + k * 0.4,
      y = lejos ? f_HOR - 8 - Math.round(h(k, 2, 101) * 4) : 46 + Math.round(h(k, 2, 101) * 18), x = ((h(k, 3, 101) * 460 + t * v) % 480) - 70;
    if (!lejos && x > 230 && y < 60) continue; f_cumulo(R, Math.round(x), y, w, k, lejos ? [S.nubL0, S.nubL1, S.nubL2] : [S.nub0, S.nub1, S.nub2]); }
  // la tierra, el agua y los árboles, por delante de las nubes
  f_encima(R, tierra);
  // pájaros: un águila pescadora que planea y gaviotas que cruzan
  for (let k = 0; k < 3; k++) { const u = ((t * 0.05 + k * 0.33) % 1), x = Math.round(330 - u * 360), y = Math.round(52 + k * 7 + Math.sin(t * 1.5 + k) * 3), a = Math.sin(t * 8 + k * 2) > 0; if (f_atom(x, y)) continue;
    pset(x, y, hex('#3a3a44')); pset(x - 1, y - (a ? 1 : 0), hex('#3a3a44')); pset(x + 1, y - (a ? 1 : 0), hex('#3a3a44')); pset(x - 2, y - (a ? 2 : -1), hex('#5a5a64')); pset(x + 2, y - (a ? 2 : -1), hex('#5a5a64')); }
  { const a = t * 0.3, x = Math.round(150 + Math.cos(a) * 40), y = Math.round(60 + Math.sin(a) * 8); for (let i = -4; i <= 4; i++) pset(x + i, y - Math.round(Math.abs(i) * 0.4) + (Math.abs(i) > 3 ? 1 : 0), Math.abs(i) < 2 ? hex('#f2f2f2') : hex('#4a3a2e')); }
  // el agua se mueve: destellos y rayas claras que corren; la barquita de pesca lejos
  for (let k = 0; k < 60; k++) { const y = f_HOR + 3 + Math.round(h(k, 9, 102) * (f_ORILLA - f_HOR - 6)), x = Math.round((h(k, 10, 102) * 340 + t * (3 + (y - f_HOR) * 0.4)) % 340) - 10, l = 2 + (k % 4);
    if (x < 148 || x > 318) continue; for (let i = 0; i < l; i++) if (x + i > 148) pset(x + i, y, Math.sin(t * 3 + k) > 0.3 ? S.cie4 : S.agua4); }
  { const bx = Math.round(330 - ((t * 2.2 + 140) % 200)), by = f_HOR + 5 + Math.round(Math.sin(t * 2) * 0.6); if (bx > 150) { rect(bx, by, bx + 8, by + 1, hex('#e8e8e0')); rect(bx + 1, by + 2, bx + 7, by + 2, S.agua0); rect(bx + 5, by - 3, bx + 6, by - 1, hex('#3a5a7a')); pset(bx + 2, by - 1, hex('#c84a2a')); } }
  // la garza azul en el agua somera, junto a la orilla: patas largas, cuerpo gris azulado, cuello en S, moño negro y
  // pico amarillo; de vez en cuando baja el cuello y picotea
  { const gx = 160, gy = f_ORILLA - 1, pica = (t % 5) > 4.1, d = pica ? 4 : 0;
    linea(gx, gy, gx, gy - 7, S.garza0); linea(gx + 3, gy, gx + 3, gy - 7, S.garza0);
    for (let j = 0; j < 5; j++) for (let i = -3 + (j > 2 ? 1 : 0); i <= 5 - (j > 3 ? 1 : 0); i++) pset(gx + i, gy - 13 + j, j === 0 ? S.garza2 : j > 3 ? S.garza0 : S.garza1);
    linea(gx - 3, gy - 12, gx - 6, gy - 9, S.garza0); linea(gx - 4, gy - 12, gx - 7, gy - 10, S.garza0);   // la cola
    const nx = gx + 5 + (pica ? 3 : 0), ny = gy - 13 + d; linea(gx + 4, gy - 13, nx, ny - 4, S.garza2); linea(nx, ny - 4, nx - 1, ny - 8, S.garza2); linea(gx + 5, gy - 13, nx + 1, ny - 4, S.garza1);
    R.rect(nx - 2, ny - 10, nx + 1, ny - 8, S.garza2); pset(nx - 3, ny - 10, hex('#1a1a22')); pset(nx - 4, ny - 9, hex('#1a1a22')); pset(nx, ny - 9, hex('#1a1a22'));
    linea(nx + 2, ny - 9, nx + 6, ny - 8 + (pica ? 2 : 0), S.pico); if (pica && Math.floor(t * 8) % 2) { pset(nx + 7, ny - 5, S.agua4); pset(nx + 5, ny - 4, S.agua4); } }
  // el musgo de los cipreses y los juncos se mecen con la brisa
  for (const [cx, top] of [[188, 62], [228, 52], [262, 58]]) for (let k = 0; k < 3; k++) { const mx = cx - 6 + k * 6 + Math.round(Math.sin(t * 1.4 + k + cx) * 1), my = top + 10 + k * 3; pset(mx, my + 3, S.musgo1); pset(mx, my + 4, S.musgo0); }
  // el toldo azul aletea, y debajo una arqueóloga pequeña de rodillas que raspa con la paleta
  { const f = Math.sin(t * 5) > 0.3; for (let x = 96; x <= 136; x += 3) pset(x, 122 + (f && x % 2 ? 1 : 0), f_S.lonaS);
    const r = Math.sin(t * 6) * 1.5; rect(112, 131, 116, 135, hex('#c8a060')); rect(113, 127, 115, 129, hex('#e8b890')); rect(112, 126, 116, 126, hex('#e8e0c8')); rect(110, 125, 118, 125, hex('#e8e0c8')); linea(116, 133, Math.round(119 + r), 136, hex('#e8b890')); rect(110, 135, 114, 136, hex('#3a4a6a')); }
  // a la derecha, un voluntario pequeño agita la criba sobre su caballete y cae la tierra
  { const sx = Math.round(278 + Math.sin(t * 9) * 1.5), sy = 128; linea(268, 144, 272, 132, S.tron1); linea(290, 144, 286, 132, S.tron1); linea(270, 144, 274, 132, S.tron0); linea(288, 144, 284, 132, S.tron0);
    rect(sx - 10, sy, sx + 10, sy + 3, S.tron1); rect(sx - 10, sy, sx + 10, sy, S.estaca); for (let x = sx - 9; x <= sx + 9; x += 2) pset(x, sy + 2, hex('#9aa0a6')); rect(sx - 6, sy - 1, sx + 4, sy - 1, S.tie2);
    for (let k = 0; k < 8; k++) { const u = ((t * 1.6 + k / 8) % 1), x = 272 + Math.round(h(k, 11, 103) * 14), y = sy + 4 + Math.round(u * 12); pset(x, y, k % 2 ? S.tie2 : S.tie3); }
    for (let y = 141; y < 145; y++) for (let x = 270 + (y - 141) * -1; x < 288 + (y - 141); x++) if (f_b4(x, y) < 0.7) pset(x, y, S.tie2);
    f_figurita(R, 298, 143, t, [hex('#d8a078'), hex('#3a6ab0'), hex('#4a4a52'), hex('#2a3a6a')], { brazo: [-6 + Math.round(Math.sin(t * 9) * 1.5), 0] }); }
  // las cintas de las estacas aletean
  for (const [ex, ey] of [[156, 140], [193, 140], [230, 140], [148, 161], [238, 161]]) { const f = Math.floor(t * 6 + ex) % 3; pset(ex + 2, ey, f_S.cinta); pset(ex + 3, ey + (f === 1 ? 1 : 0), f_S.cinta); if (f !== 2) pset(ex + 4, ey + (f === 0 ? 0 : 1), f_S.cinta); }
  // matas de hierba del campo que se mecen
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 12, 104) * 300 + 10), y = f_ORILLA + 10 + Math.round(h(k, 13, 104) * 46); if (x > 140 && x < 246 && y > 140 && y < 170) continue; const m = Math.round(Math.sin(t * 2 + k) * 1);
    for (let i = -2; i <= 2; i++) linea(x + i, y, x + i * 2 + m, y - 3 - (2 - Math.abs(i)), i ? S.hie3 : S.hie4); }
  // el hallazgo: en la cuadrícula aparecen trozos de cerámica (claro vidriado en verde y uno pardo) que destellan
  const ha = f_01(o.hallazgo ?? 0);
  if (ha > 0) { const pz = [[206, 159, S.barro2, S.verde1], [214, 162, S.barro1, S.verde0], [219, 158, S.pardo1, S.pardo2], [210, 164, S.barro2, S.barro0]];
    pz.forEach(([x, y, c, g], i) => { const u = f_01(ha * 4 - i * 0.8); if (u <= 0) return; rect(x - 1, y, x + 2, y + 1, c); pset(x - 1, y - 1, g); pset(x, y - 1, g); pset(x + 2, y + 1, S.tie0);
      if (Math.sin(t * 6 + i * 1.7) > 0.4 || u < 1) { const r = u < 1 ? 3 : 2; pset(x, y - 3, 0xffffffff); pset(x, y - 2 - r, f_S.sol); pset(x - r, y - 2, f_S.sol); pset(x + r, y - 2, f_S.sol); } }); }
  return { suelo: 160, libre: [24, 250], cuadricula: [212, 160], excavacion: [148, 146, 238, 166], camioneta: [14, 114, 62, 138], criba: [278, 128], garza: [158, 117], horizonte: f_HOR, orilla: f_ORILLA, sol: [236, 34] };
}

// lo que va delante en el Sitio X: la carretilla con tierra y las matas de hierba alta de las esquinas
function f_sitioDelante(R, t) {
  const { rect, pset, linea, disco, poligono } = R, S = f_S;
  // la carretilla verde con su tierra, la rueda y los mangos
  poligono([[266, 160], [300, 160], [294, 172], [272, 172]], hex('#3a7a4a')); linea(266, 160, 300, 160, hex('#5aa06a')); linea(272, 172, 294, 172, hex('#24502e'));
  for (let x = 268; x <= 298; x++) { const y = 159 - Math.round(Math.sin((x - 268) / 30 * Math.PI) * 4); for (let j = y; j < 160; j++) pset(x, j, f_ton([S.tie1, S.tie2, S.tie3], 1 + h(x, j, 105) * 1.5, x, j)); }
  linea(268, 166, 266, 172, hex('#8a9098')); linea(272, 170, 266, 172, hex('#8a9098')); disco(265, 174, 5, S.rueda); disco(265, 174, 2, hex('#8a9098')); pset(265, 174, S.rueda); linea(300, 162, 314, 168, S.tron1); linea(298, 172, 300, 179, hex('#8a9098')); rect(312, 167, 318, 169, S.rueda);
  // la hierba alta de las esquinas de abajo, que se mece
  for (const [x0, x1] of [[0, 26], [292, 319]]) for (let x = x0; x <= x1; x += 2) { const alto = 8 + Math.round(h(x, 1, 106) * 10), m = Math.round(Math.sin(t * 2.2 + x * 0.3) * 2);
    linea(x, 179, x + m, 179 - alto, h(x, 2, 106) > 0.5 ? S.hie1 : S.hie0); pset(x + m, 179 - alto, S.hie4); if (x % 6 === 0) pset(x + m + 1, 178 - alto, S.juncoL); }
}

// la bandeja x 64–256, y 44–156 sobre la mesa de campo de tablones; el perfil de la jarra dibujado a lápiz con centro en
// x 160; los cuatro trozos (borde con vidriado verde, panza verde, asa de barro claro y uno pardo de North Devon)
const f_JARRA = (v) => 18 + 14 * Math.sin(v * Math.PI * 0.95 + 0.1) - (v < 0.18 ? (0.18 - v) * 50 : 0) + (v > 0.92 ? -(v - 0.92) * 70 : 0);   // radio de la jarra a la altura v (0 boca, 1 pie)

const f_PIEZAS = [
  { fin: [146, 59], ini: [92, 64], pts: [[-12, -2], [10, -3], [12, 4], [-2, 7], [-11, 5]], c: ['barro0', 'barro1', 'barro2'], g: 'verde1' },
  { fin: [200, 96], ini: [226, 70], pts: [[-9, -9], [8, -11], [11, 6], [-2, 11], [-11, 3]], c: ['verde0', 'verde1', 'verde2'], g: 'verde2' },
  { fin: [128, 128], ini: [100, 118], pts: [[-10, -7], [7, -8], [9, 8], [-8, 9]], c: ['pardo0', 'pardo1', 'pardo2'], g: 'pardo2' },
  { fin: [202, 80], ini: [232, 128], pts: [[-3, -8], [4, -6], [5, 7], [-2, 9], [-5, 2]], c: ['barro0', 'barro1', 'barro2'], g: null },
];

function f_ceramicaFondo(R) {
  const { rect, pset, linea, poligono, disco } = R, S = f_S, TAB = [S.tabla0, S.tabla1, S.tabla2, S.tabla3];
  // la mesa de campo: tablones con vetas, nudos, juntas y la sombra
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor(y / 30), jun = y % 30 === 0, veta = Math.sin(x * 0.05 + tab * 3 + Math.sin(y * 0.4 + x * 0.01) * 2) > 0.85;
    const nudo = Math.hypot(x - (60 + tab * 97) % 320, (y % 30) - 15) < 4; pset(x, y, jun ? S.tabla0 : f_ton(TAB, 2 + (h(x >> 3, tab, 110) - 0.5) * 0.8 - (veta ? 0.9 : 0) - (nudo ? 1.4 : 0) + (y % 30 === 1 ? 0.8 : 0), x, y)); }
  // la sombra de la bandeja y la bandeja de plástico blanco con su borde
  for (let y = 48; y <= 160; y++) for (let x = 68; x <= 260; x++) if ((x + y) % 2 === 0 || x > 257 || y > 157) pset(x, y, f_mez(R.pget(x, y), S.tabla0, 0.6));
  rect(64, 44, 256, 156, S.bandeja1); rect(64, 44, 256, 45, S.bandeja3); rect(64, 46, 65, 156, S.bandeja2); rect(255, 46, 256, 156, S.bandeja0); rect(64, 155, 256, 156, S.bandeja0);
  for (let y = 48; y <= 152; y++) for (let x = 68; x <= 252; x++) pset(x, y, f_ton([S.bandeja0, S.bandeja1, S.bandeja2, S.bandeja3], 2 + (y - 48) / 120 - (x - 68) / 400 + (h(x >> 2, y >> 2, 111) > 0.97 ? -0.6 : 0), x, y));
  rect(67, 47, 253, 47, S.bandeja0); rect(67, 47, 67, 153, S.bandeja0);
  // la hoja milimetrada del fondo de la bandeja (una retícula azul muy tenue, más marcada cada cinco)
  for (let y = 50; y <= 151; y++) for (let x = 70; x <= 251; x++) { const g5 = (x - 70) % 15 === 0 || (y - 50) % 15 === 0, g1 = (x - 70) % 3 === 0 || (y - 50) % 3 === 0; if (g5 || (g1 && (x + y) % 2 === 0)) pset(x, y, f_mez(R.pget(x, y), hex('#7aa8d0'), g5 ? 0.22 : 0.1)); }
  // el perfil de la jarra a lápiz: contorno, eje de puntos, el asa y el pie, con un sombreado de rayitas en un lado
  for (let y = 54; y <= 146; y++) { const v = (y - 54) / 92, r = f_JARRA(v) * 1.35; pset(Math.round(160 - r), y, S.grafito); pset(Math.round(160 + r), y, S.grafito); if (y % 3 === 0) pset(160, y, S.grafitoL); if ((y % 4) === 0) linea(Math.round(160 - r + 2), y, Math.round(160 - r + 6), y - 2, S.grafitoL); }
  linea(Math.round(160 - f_JARRA(0) * 1.35), 54, Math.round(160 + f_JARRA(0) * 1.35), 54, S.grafito); linea(Math.round(160 - f_JARRA(1) * 1.35), 146, Math.round(160 + f_JARRA(1) * 1.35), 146, S.grafito);
  for (let a = -Math.PI / 2; a <= Math.PI / 2; a += 0.05) pset(Math.round(190 + Math.cos(a) * 12), Math.round(80 + Math.sin(a) * 14), S.grafito);
  // la regla escala a cuadros negros y blancos con sus números y el cepillo de cerdas suaves
  for (let i = 0; i < 50; i++) for (let j = 0; j < 4; j++) pset(84 + i, 140 + j, (Math.floor(i / 10) + (j > 1 ? 1 : 0)) % 2 ? hex('#1e1e22') : hex('#fafafa'));
  rect(83, 139, 134, 139, hex('#1e1e22')); R.numero('0', 84, 137, { tam: 8, fina: true, color: S.grafito, sombra: false }); R.numero('5', 132, 137, { tam: 8, fina: true, color: S.grafito, sombra: false });
  { linea(262, 150, 300, 120, S.tron1); linea(263, 151, 301, 121, S.tron0); linea(262, 149, 299, 120, S.tabla3); rect(298, 112, 306, 118, hex('#c8a040')); for (let k = 0; k < 9; k++) linea(300 + k, 112, 304 + k, 100 + (k % 3), k % 2 ? hex('#3a2a1e') : hex('#5a4430')); }
  // fuera de la bandeja: la paleta de albañil, la bolsita con cierre, la etiqueta con su número y un lápiz
  poligono([[14, 150], [40, 132], [48, 140], [22, 158]], hex('#b8bcc0')); linea(14, 150, 40, 132, hex('#e8ecee')); linea(44, 136, 58, 124, S.tron1); linea(45, 137, 59, 125, S.tron0);
  rect(272, 54, 304, 86, hex('#e8eef2')); rect(272, 54, 304, 57, hex('#c84040')); rect(272, 58, 304, 58, hex('#9aa4ac')); for (let k = 0; k < 6; k++) pset(280 + k * 4, 74, S.barro0); rect(276, 64, 286, 70, S.barro1); pset(278, 66, S.verde1);
  rect(16, 60, 50, 84, hex('#f4ecd0')); rect(16, 60, 50, 60, hex('#ffffff')); rect(50, 61, 50, 84, S.tabla0); disco(22, 66, 2, S.tabla1); linea(22, 66, 14, 54, hex('#c8303a'));
  // en la etiqueta, la jarrita a lápiz (el pictograma del hallazgo) y dos rayas
  for (let y = 66; y <= 80; y++) { const r = Math.round(f_JARRA((y - 66) / 14) * 0.2); pset(36 - r, y, S.grafito); pset(36 + r, y, S.grafito); }
  linea(36 - Math.round(f_JARRA(0) * 0.2), 66, 36 + Math.round(f_JARRA(0) * 0.2), 66, S.grafito); linea(36 - Math.round(f_JARRA(1) * 0.2), 80, 36 + Math.round(f_JARRA(1) * 0.2), 80, S.grafito);
  for (let a = -1.4; a <= 1.4; a += 0.2) pset(Math.round(36 + f_JARRA(0.3) * 0.2 + 1 + Math.cos(a) * 2), Math.round(71 + Math.sin(a) * 2.5), S.grafito);
  linea(20, 82, 28, 82, S.grafitoL); linea(42, 82, 47, 82, S.grafitoL);
  linea(20, 100, 52, 92, hex('#e8c040')); linea(20, 101, 52, 93, hex('#c89a20')); pset(53, 92, hex('#f0c8a0')); pset(54, 92, S.grafito);
  // migas de tierra en la bandeja y en la mesa
  for (let k = 0; k < 46; k++) { const x = 70 + Math.round(h(k, 1, 116) * 180), y = 50 + Math.round(h(k, 2, 116) * 100); if (Math.abs(x - 160) < 36 && y > 52 && y < 148) continue; pset(x, y, [S.tie1, S.tie2, S.tie3][k % 3]); if (k % 4 === 0) pset(x + 1, y, S.tie2); }
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 3, 116) * 320), y = 158 + Math.round(h(k, 4, 116) * 20); pset(x, y, [S.tie1, S.tie2][k % 2]); }
  // el cuaderno de campo abierto (x 62–128, y 18–40): dos hojas cuadriculadas, la espiral, el boceto de un trozo y rayitas
  for (let y = 20; y <= 42; y++) for (let x = 64; x <= 130; x++) if ((x + y) % 2 === 0) pset(x, y, f_mez(R.pget(x, y), S.tabla0, 0.6));
  rect(62, 18, 128, 40, hex('#2e4a3a')); rect(63, 19, 94, 39, hex('#f4efe0')); rect(96, 19, 127, 39, hex('#f8f4e8'));
  for (let y = 19; y <= 39; y++) for (let x = 63; x <= 127; x++) if ((x !== 95) && ((y - 19) % 4 === 3 || (x - 63) % 4 === 3)) pset(x, y, f_mez(R.pget(x, y), hex('#8ab0d0'), 0.35));
  for (let y = 20; y <= 38; y += 3) { pset(95, y, hex('#9aa0a8')); pset(95, y + 1, hex('#5a6068')); }
  R.poligono([[68, 30], [76, 24], [86, 26], [88, 34], [74, 36]], (x, y) => ((x + y) % 3 === 0 ? S.grafitoL : hex('#f4efe0'))); linea(68, 30, 76, 24, S.grafito); linea(76, 24, 86, 26, S.grafito); linea(86, 26, 88, 34, S.grafito); linea(88, 34, 74, 36, S.grafito); linea(74, 36, 68, 30, S.grafito);
  for (let y = 23; y <= 35; y += 4) linea(100, y, 100 + 12 + ((y * 7) % 10), y, S.grafitoL);
  for (let i = 0; i < 9; i++) pset(118 + Math.round(Math.sin(i * 0.5) * 3), 23 + i * 1.5 | 0, S.grafito);
  linea(102, 42, 132, 34, hex('#e8c040')); linea(102, 43, 132, 35, hex('#c89a20')); pset(101, 43, S.grafito); rect(133, 33, 135, 35, hex('#e89aa0'));
  // el flexómetro amarillo con la cinta sacada y sus marcas (sin números)
  disco(97, 168, 7, hex('#1e1e22')); disco(97, 168, 6, hex('#f2c230')); disco(96, 167, 3, hex('#c08a18')); pset(94, 164, hex('#ffe070')); rect(103, 170, 140, 173, hex('#1e1e22')); rect(103, 170, 139, 172, hex('#f4e08a'));
  for (let x = 105; x < 139; x += 2) pset(x, 170, hex('#1e1e22')); for (let x = 107; x < 139; x += 10) { pset(x, 171, hex('#c8303a')); pset(x, 172, hex('#c8303a')); } rect(140, 168, 141, 174, hex('#9aa4ae'));
  for (let x = 91; x < 144; x++) if (x % 2 === 0) pset(x, 175, f_mez(R.pget(x, 175), S.tabla0, 0.5));
}
// LA CERÁMICA DE CERCA: o.encaja 0–1 lleva los trozos de donde están sueltos a su sitio en el perfil de la jarra; los
// vidriados destellan, la sombra de las hojas pasa por la mesa y una hormiga cruza
function f_ceramica(R, t, o) {
  const { pset, poligono, linea } = R, S = f_S, en = f_01(o.encaja ?? 0), e = en * en * (3 - 2 * en);
  R.copiar(f_capa(R, 'rk_ceramica', () => f_ceramicaFondo(R)));
  // la sombra de las hojas que se mueve sobre la mesa y la bandeja (manchas tramadas que se desplazan)
  for (let k = 0; k < 7; k++) { const cx = (h(k, 1, 112) * 380 + Math.sin(t * 0.5 + k) * 10 + t * 2) % 380 - 30, cy = h(k, 2, 112) * 180 + Math.cos(t * 0.4 + k) * 6, r = 10 + h(k, 3, 112) * 10;
    for (let y = Math.max(0, Math.round(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.round(cx - r)); x <= Math.min(319, cx + r); x++) { const d = ((x - cx) / r) ** 2 + ((y - cy) / (r * 0.7)) ** 2; if (d < 1 && f_b4(x, y) < 0.45 * (1 - d) + 0.1) pset(x, y, f_mez(R.pget(x, y), hex('#2a2018'), 0.22)); } }
  // los trozos: polígonos de tres tonos con el canto claro, la cara vidriada y un brillo; se acercan hasta encajar
  f_PIEZAS.forEach((p, i) => { const u = f_01(e * 1.3 - i * 0.1), x = Math.round(p.ini[0] + (p.fin[0] - p.ini[0]) * u), y = Math.round(p.ini[1] + (p.fin[1] - p.ini[1]) * u - Math.sin(u * Math.PI) * 6);
    const pts = p.pts.map(([a, b]) => [x + a, y + b]);
    poligono(pts.map(([a, b]) => [a + 1, b + 2]), hex('#9aa0a4'));   // su sombra en la bandeja
    poligono(pts, (px, py) => f_ton([S[p.c[0]], S[p.c[1]], S[p.c[2]]], 1.2 + (y - py) / 14 + (px - x) / 20 + (h(px, py, 113) > 0.88 ? -0.8 : 0), px, py));
    for (let k = 0; k < pts.length; k++) linea(pts[k][0], pts[k][1], pts[(k + 1) % pts.length][0], pts[(k + 1) % pts.length][1], S[p.c[0]]);
    if (p.c[0] === 'pardo0') for (let k = 0; k < 6; k++) pset(x - 5 + Math.round(h(k, i, 114) * 10), y - 4 + Math.round(h(k, i, 115) * 8), hex('#e8d0a0'));   // la arenilla del barro de North Devon
    if (p.g) { linea(x - 4, y - 3, x + 2, y - 4, S[p.g]); if (Math.sin(t * 3 + i * 2.1) > 0.6) { pset(x - 2, y - 4, 0xffffffff); pset(x - 2, y - 6, 0xffffffff); pset(x - 4, y - 4, 0xffffffff); pset(x, y - 4, 0xffffffff); pset(x - 2, y - 2, 0xffffffff); } } });
  if (en >= 1) for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + t, r = 50 + Math.sin(t * 3) * 3; pset(Math.round(160 + Math.cos(a) * r * 0.6), Math.round(96 + Math.sin(a) * r), S.sol); }
  // una hoja de roble que cae dando vueltas, cruza la mesa y se va; su sombra la sigue sobre la tabla
  { const u = (t * 0.07 + 0.3) % 1, lx = Math.round(-10 + u * 340), ly = Math.round(26 + u * 140 + Math.sin(u * 18) * 8), g = Math.sin(t * 4) > 0;
    for (let i = -3; i <= 3; i++) { const sx = lx + i + 4, sy = ly + 7 + (g ? i >> 1 : -(i >> 1)); if (sx >= 0 && sx < 320 && sy >= 0 && sy < 180) pset(sx, sy, f_mez(R.pget(sx, sy), hex('#2a2018'), 0.3)); }
    for (let i = -3; i <= 3; i++) for (let j = -1; j <= 1; j++) if (Math.abs(i) + Math.abs(j) * 2 < 4) pset(lx + i, ly + j + (g ? i >> 1 : -(i >> 1)), j === -1 ? hex('#a8b04a') : hex('#7a8a2e'));
    pset(lx - 4, ly + (g ? -2 : 2), hex('#5a4a2a')); }
  // una hormiga que cruza la mesa por debajo de la bandeja
  { const u = (t * 0.06) % 1, ax = Math.round(320 - u * 340), ay = 168 + Math.round(Math.sin(u * 20) * 2), p = Math.floor(t * 10) % 2; pset(ax, ay, hex('#1a1210')); pset(ax + 1, ay, hex('#2a1a14')); pset(ax + 2, ay, hex('#1a1210')); pset(ax + 1, ay - 1 + p, hex('#1a1210')); pset(ax + 1, ay + 1 - p, hex('#1a1210')); pset(ax - 1, ay - 1, hex('#1a1210')); }
  return { suelo: 180, libre: [0, 0], bandeja: [64, 44, 256, 156], jarra: [160, 54, 146], piezas: f_PIEZAS.map((p) => p.fin.slice()), cepillo: [300, 116] };
}
// qué vista piden las opciones: el encuadre (uno que no existe cae en 'estudio') y la cámara
function g_hoyVista(o) { const enc = V_HOY[o.encuadre] ? o.encuadre : 'estudio', e = V_HOY[enc]; return [enc, o.camara === e.cam ? e.cam : 'general']; }

// la paleta del estudio de Atom (cálido: papel ocre, nogal, roble, latón)
const G_HOY = pal({
  k: '#1c1418', techo: '#f2e4ca', techoS: '#e2d0b0', mold: '#f8ecd6', moldS: '#d8c4a0', moldD: '#a88e68',
  papel: '#c99a5a', papelS: '#b4844a', papelL: '#d6aa6c', papelM: '#9a6436', papelML: '#e8c48a',
  friso: '#7a4a2a', frisoS: '#5c351c', frisoL: '#98623a', frisoD: '#3a2212',
  roble: '#b47c4a', robleS: '#8c5a32', robleL: '#d29c64', robleD: '#5e3a1e', robleB: '#ecc08a',
  nogal: '#6a4228', nogalS: '#4e2e1a', nogalL: '#8a5a38', nogalD: '#2e1a0e',
  alf1: '#a8443a', alf2: '#6e2a26', alf3: '#d8a860', alf4: '#3a5a7a', alf5: '#5a7aa0', alf6: '#e8d8b0',
  corcho: '#c8925a', corchoS: '#946236', corchoL: '#e6b47a', corchoD: '#7a4a28',
  nota: '#f4d44a', notaS: '#c8a42a', notaL: '#fff2a8', lapiz: '#3a3446', lana: '#c8303a', lanaS: '#8a1e26',
  cie0: '#5e9ed6', cie1: '#78b0de', cie2: '#94c2e6', cie3: '#b4d6ec', cie4: '#d6e8f0',
  nube: '#ffffff', nubeS: '#dfe8f2', nubeD: '#aebfd2',
  mar: '#3a7a9a', marS: '#2a5a7a', marL: '#7ab0c8', marB: '#e2f2fa',
  arena: '#e8d4a4', arenaS: '#c8b080', arenaL: '#f6e8c4', duna: '#8a9a5a', dunaS: '#6a7a3a', dunaL: '#b4c070',
  faroB: '#f4f4f0', faroN: '#26262c', ladrillo: '#a8463a',
  laton: '#c8a040', latonL: '#f2d278', latonS: '#8a6a20', metal: '#9aa4ae', metalS: '#68727e', metalL: '#d8e0e6',
  luz: '#fff2c8', luzS: '#ffd890', blanco: '#ffffff',
  hoja: '#4a8a3a', hojaS: '#2e6028', hojaL: '#86c050', barro: '#b4643a', barroS: '#84442a', barroL: '#d8865a',
  cortina: '#4a7a6a', cortinaS: '#2e5a4c', cortinaL: '#6a9a88',
  l1: '#b03a34', l2: '#2e5a8a', l3: '#c8a040', l4: '#3a7a4a', l5: '#7a4a8a', l6: '#d8cbb0', l7: '#2a3a4a', l8: '#c86a3a',
  alb: '#e8c48a', albS: '#d4aa6c', dur: '#c0844a', durS: '#9a6232', anL: '#7a4a24', corteza: '#5a3a24', cortezaS: '#3a2414', cortezaL: '#7e5636',
  anilloB: '#fff4a0', anilloB2: '#ffd040',
  piedra: '#8e8c86', piedraS: '#6c6a66', piedraL: '#aeaca4', piedraD: '#4a4846', yeso: '#f6f2e8', yesoS: '#d8d2c4',
  maiz: '#eac448', maizS: '#b8902a', maizL: '#f8e490', vaina: '#8aa84a', vainaS: '#5a7a2a',
  hoja2: '#e8e4d8', hojaP: '#f4efe2', hojaPS: '#d4ccb8', tinta: '#2a3a6a',
  rev: '#2e5a8a', revS: '#1e3e64', revL: '#5a86b8', rojo: '#c8303a', rojoS: '#8a1e26', naranja: '#f08a2a', naranjaS: '#b85a14',
  agua: '#9ad0e0', aguaS: '#5aa0b8', cristal: '#d8f0f4', carton: '#c8a070', cartonS: '#9a7448', cartonL: '#e0bc8a', papelT: '#d8c0a0', papelTS: '#a88a68',
  amarillo: '#f2c230', amarilloS: '#c08a18', amarilloL: '#ffe070', lona: '#d8c8a0', lonaS: '#a89870',
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

// un rectángulo que respeta el recorte (R.rect no lo hace)
function g_hoyRect(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= y1; y++) for (let x = Math.round(x0); x <= x1; x++) R.pset(x, y, c); }

// tablas de madera en filas horizontales (filas: los bordes de cada fila, de arriba abajo): cada tabla con su tono, sus
// juntas a matajunta, vetas, algún nudo y el filo de luz de arriba
function g_hoyTablas(R, x0, x1, filas, [c, cS, cL, cD], k = 0) {
  for (let f = 0; f + 1 < filas.length; f++) {
    const y0 = filas[f], y1 = filas[f + 1] - 1; let x = x0 - Math.round(h(f, 1, 510 + k) * 40);
    while (x <= x1) { const L = 34 + Math.round(h(x, f, 511 + k) * 46 + (y1 - y0) * 3), tono = h(x, f, 512 + k), cb = tono < 0.25 ? cS : tono > 0.85 ? cL : c;
      for (let y = y0; y <= y1; y++) for (let xx = Math.max(x0, x); xx <= Math.min(x1, x + L - 1); xx++) {
        let col = cb; const v = h(xx >> 3, y * 3 + f, 513 + k);
        if (y === y0) col = cL; else if (y === y1) col = cD; else if (v < 0.16) col = cS; else if (v > 0.93) col = cL;
        R.pset(xx, y, col); }
      if (x >= x0) R.rect(x, y0, x, y1, cD);
      if (h(x, f, 514 + k) < 0.3 && y1 - y0 > 3) { const nx = x + 8 + Math.round(h(x, 2, 515 + k) * (L - 16)), ny = Math.round((y0 + y1) / 2); R.rect(nx - 2, ny, nx + 2, ny, cS); R.pset(nx, ny, cD); }
      x += L; }
  }
}

// el papel pintado ocre: listas finas y, al tresbolillo, una flor de lis menuda con su sombra; calma(x, y): ahí solo
// listas (tras Atom y bajo el año)
function g_hoyPapel(R, x0, y0, x1, y1, calma = null) {
  const P = G_HOY;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let c = x % 12 === 0 ? P.papelS : x % 12 === 6 && (y & 1) ? P.papelL : P.papel;
    if (h(x, y, 520) < 0.04) c = P.papelS;
    if (!(calma && calma(x, y))) { const fila = Math.floor(y / 14), xx = x + (fila & 1) * 12, i = (xx % 24) - 12, j = (y % 14) - 7;
      // la flor de lis: el pétalo central, los dos laterales y el pie
      if ((i === 0 && j >= -3 && j <= 1) || (Math.abs(i) === 1 && (j === -1 || j === 0)) || (Math.abs(i) === 2 && j === -1) || (Math.abs(i) <= 1 && j === 2)) c = j < 0 && i <= 0 ? P.papelML : P.papelM; }
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

// una gaviota que bate las alas, de 5 px
function g_hoyPajaro(R, x, y, t, k, c) {
  const a = Math.sin(t * 6 + k * 2.1) > 0 ? -1 : 0; x = Math.round(x); y = Math.round(y);
  R.pset(x, y, c); R.pset(x - 1, y + a, c); R.pset(x + 1, y + a, c); R.pset(x - 2, y + a * 2 - (a ? 0 : -1), c); R.pset(x + 2, y + a * 2 - (a ? 0 : -1), c);
}

// motas de polvo que flotan en una franja de luz (x0, y0)–(x1, y1), inclinada dx px por cada px de bajada
function g_hoyMotas(R, t, x0, y0, x1, y1, n, dx = 0, k = 0) {
  for (let i = 0; i < n; i++) { const u = (h(i, 1, 530 + k) + t * (0.02 + h(i, 2, 530 + k) * 0.03)) % 1, y = Math.round(y0 + u * (y1 - y0)), x = Math.round(x0 + (y - y0) * dx + h(i, 3, 530 + k) * (x1 - x0) + Math.sin(t * 0.7 + i) * 3);
    if (Math.sin(t * 2 + i * 1.7) > -0.3) R.pset(x, y, G_HOY.luz); }
}

// LA COSTA DE HOY por una ventana (hueco x0–x1, y0–y1, recortada): cielo tramado, nubes de tres tonos a tres
// velocidades, gaviotas, el mar con brillos y un velero, las dunas con su barrón que se mece, la cerca de arena y el
// faro a rayas en espiral, con la luz que destella y barre
function g_hoyVistaCosta(R, t, x0, y0, x1, y1) {
  const P = G_HOY, { pset, linea, poligono } = R, W = x1 - x0, H = y1 - y0, hor = y0 + Math.round(H * 0.5), CIE = [P.cie0, P.cie1, P.cie2, P.cie3, P.cie4];
  const rect = (a, b, c, d, col) => { for (let y = Math.max(b, y0); y <= Math.min(d, y1); y++) for (let x = Math.max(a, x0); x <= Math.min(c, x1); x++) pset(x, y, col); };
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= hor; y++) { const f = (y - y0) / (hor - y0); for (let x = x0; x <= x1; x++) pset(x, y, CIE[Math.max(0, Math.min(4, Math.floor(f * 4.2 + g_hoyB4(x, y) - 0.2)))]); }
  const WW = W + 60, s = W / 44;
  for (const [y, w, v, k, cols] of [[y0 + H * 0.12, 20 * s, 0.6, 0, [P.nube, P.nubeS, P.nubeD]], [y0 + H * 0.26, 14 * s, 1.2, 1, [P.nube, P.nubeS, P.nubeD]], [y0 + H * 0.38, 10 * s, 2.0, 2, [P.nubeS, P.cie4, P.nubeD]], [y0 + H * 0.06, 12 * s, 0.6, 3, [P.nube, P.nubeS, P.nubeD]]]) {
    const cx = x0 - 30 + ((h(k, 1, 540) * WW + t * v) % WW); g_hoyNube(R, cx, y, w, cols); }
  for (let k = 0; k < 3; k++) { const u = ((t * (4 + k * 2) + k * 23) % (W + 20)), x = x0 - 10 + u, y = y0 + H * 0.2 + k * 5 + Math.sin(t * 0.8 + k) * 2; g_hoyPajaro(R, x, y, t, k, k === 1 ? P.nubeD : P.blanco); }
  // el mar: franjas con brillos que corren, más grandes cuanto más cerca, y la línea del horizonte
  for (let y = hor + 1; y <= y1; y++) { const u = (y - hor) / (y1 - hor); for (let x = x0; x <= x1; x++) { const sn = Math.sin(x * (0.6 - u * 0.35) + t * (1.2 + u) + y * 1.9); pset(x, y, sn > 0.86 ? (u < 0.3 ? P.marB : P.marL) : sn < -0.6 ? P.marS : u < 0.2 ? P.marL : P.mar); } }
  for (let x = x0; x <= x1; x++) pset(x, hor, P.marS);
  // el velero que cruza despacio
  { const vx = Math.round(x0 - 10 + ((t * 2.4) % (W + 24))), vy = hor + 3 + Math.round(Math.sin(t * 1.4)); rect(vx - 3, vy, vx + 3, vy + 1, P.blanco); rect(vx - 2, vy + 1, vx + 2, vy + 1, P.marS); linea(vx, vy - 1, vx, vy - 8, P.nubeD); poligono([[vx + 1, vy - 8], [vx + 1, vy - 1], [vx + 5, vy - 1]], P.blanco); poligono([[vx - 1, vy - 6], [vx - 1, vy - 1], [vx - 3, vy - 1]], P.nubeS); }
  // la rompiente: una franja de espuma que sube y baja
  const orilla = (x) => y1 - Math.round(H * 0.24 + Math.sin((x - x0) * 0.09) * H * 0.04 + Math.sin((x - x0) * 0.23 + 1) * 1.5);
  for (let x = x0; x <= x1; x++) { const yo = orilla(x) - 2 - Math.round(1 + Math.sin(t * 1.3 + x * 0.05)); pset(x, yo, P.marB); if ((x + Math.floor(t * 3)) % 5) pset(x, yo - 1, P.blanco); }
  // las dunas: arena tramada, crestas con luz, y el barrón que se mece
  for (let x = x0; x <= x1; x++) { const ya = orilla(x); for (let y = ya; y <= y1; y++) { const u = (y - ya) / (y1 - ya + 1); pset(x, y, y === ya ? P.arenaL : g_hoyB4(x, y) < u * 0.8 - 0.1 ? P.arenaS : h(x, y, 541) < 0.05 ? P.arenaS : P.arena); } }
  // el faro: la base de ladrillo, el fuste que se estrecha con las rayas en espiral, la galería y la linterna
  const lx = x0 + Math.round(W * 0.74), lb = orilla(lx) + 2, lh = Math.round(H * 0.62);
  for (let y = lb - lh; y <= lb; y++) { const u = (lb - y) / lh, hw = Math.round(3.6 - u * 1.4); for (let x = lx - hw; x <= lx + hw; x++) { const ban = Math.floor((y + (x - lx) * 0.9 + 400) / 5) % 2; let c = u < 0.08 ? P.ladrillo : ban ? P.faroN : P.faroB; if (x === lx + hw && c === P.faroB) c = P.nubeS; if (x === lx - hw && c === P.faroN) c = P.l7; pset(x, y, c); } }
  { const yt = lb - lh; rect(lx - 3, yt - 1, lx + 3, yt, P.faroN); rect(lx - 2, yt - 5, lx + 2, yt - 2, P.faroN); const fase = (t * 0.9) % 1, on = fase < 0.18;
    rect(lx - 1, yt - 4, lx + 1, yt - 3, on ? P.luz : P.latonS); pset(lx, yt - 6, P.faroN);
    // el haz que barre: un abanico de puntos a un lado y luego al otro
    const lado = Math.cos(t * 0.9 * Math.PI * 2) > 0 ? 1 : -1, fuerza = Math.abs(Math.cos(t * 0.9 * Math.PI * 2));
    if (fuerza > 0.4) for (let i = 3; i < 22; i++) for (let d = -1; d <= 1; d++) { const x = lx + lado * i, y = yt - 4 + d + Math.round(i * 0.05 * d); if (g_hoyB4(x, y) < fuerza * 0.6 - i * 0.02) g_hoyTinta(R, x, y, P.luz, 0.6); } }
  // la cerca de arena (listones torcidos) y el barrón
  for (let i = 0; i < 6; i++) { const x = x0 + 3 + i * 5, y = orilla(x) + 4 + (i & 1); linea(x, y, x, y - 4, P.nogalL); pset(x, y - 5, P.nogal); }
  linea(x0 + 3, orilla(x0 + 3) + 1, x0 + 28, orilla(x0 + 28) + 2, P.nogalS);
  for (let k = 0; k < Math.round(W * 0.6); k++) { const bx = x0 + Math.round(h(k, 1, 542) * W), by = orilla(bx) + 1 + Math.round(h(k, 2, 542) * 6), al = 3 + Math.round(h(k, 3, 542) * 4), m = Math.sin(t * 2.2 + bx * 0.2) * 1.2 + 1;
    linea(bx, by, bx + Math.round(m), by - al, h(k, 4, 542) < 0.4 ? P.dunaS : P.duna); if (h(k, 5, 542) < 0.4) pset(bx + Math.round(m), by - al, P.dunaL); }
  R.recorte(null);
}

// ESTUDIO (general): lo fijo
const G_HE = { ventana: [58, 36, 102, 92], corcho: [186, 40, 236, 94], puerta: [242, 48, 272, 149] };

function g_hoyEstudioFijo(R) {
  const P = G_HOY, { rect, pset, disco, linea, poligono } = R;
  // el techo de yeso con la sombra que se espesa hacia la moldura, y la moldura de tres listas
  for (let y = 0; y <= 20; y++) for (let x = 0; x < 320; x++) pset(x, y, y > 14 && g_hoyB4(x, y) < (y - 14) / 8 ? P.techoS : h(x >> 1, y, 501) < 0.04 ? P.techoS : P.techo);
  rect(0, 21, 319, 21, P.moldD); rect(0, 22, 319, 23, P.mold); for (let x = 0; x < 320; x++) pset(x, 24, (x & 3) < 2 ? P.mold : P.moldS); rect(0, 25, 319, 25, P.moldS); rect(0, 26, 319, 26, P.moldD);
  // la pared: el papel (solo listas tras Atom), la sombra de la moldura, el friso de tablillas y el rodapié
  g_hoyPapel(R, 0, 27, 319, 111, (x, y) => x > 274 && y < 50);
  for (let x = 0; x < 320; x++) for (let y = 27; y < 31; y++) if (g_hoyB4(x, y) < (31 - y) / 5) g_hoyTinta(R, x, y, P.frisoD, 0.3);
  rect(0, 108, 319, 108, P.nogalL); rect(0, 109, 319, 110, P.nogal); rect(0, 111, 319, 111, P.nogalD);
  for (let y = 112; y <= 145; y++) for (let x = 0; x < 320; x++) { const j = x % 7; pset(x, y, j === 0 ? P.frisoD : j === 1 ? P.frisoL : h(x, y >> 2, 502) < 0.12 ? P.frisoS : (y - 112) > 30 ? P.frisoS : P.friso); }
  rect(0, 146, 319, 146, P.moldD); rect(0, 147, 319, 148, P.mold); rect(0, 149, 319, 149, P.moldS);
  // la tarima de roble en perspectiva y la alfombra trenzada ovalada
  g_hoyTablas(R, 0, 319, [150, 152, 155, 158, 162, 166, 171, 180], [P.roble, P.robleS, P.robleL, P.robleD]);
  { const AL = [P.alf2, P.alf1, P.alf3, P.alf1, P.alf4, P.alf5, P.alf6, P.alf1, P.alf3, P.alf2];
    for (let y = 156; y <= 179; y++) for (let x = 50; x <= 262; x++) { const d = Math.hypot((x - 156) / 104, (y - 169) / 12.5); if (d > 1) continue; const b = Math.floor(d * 9.6), tr = ((x >> 1) + y) & 1;
      pset(x, y, d > 0.96 ? P.alf2 : tr && b % 2 ? g_hoyMez(AL[b], P.k, 0.18) : AL[b]); } }
  // la mancha de sol de la ventana en la tarima, en diagonal, con la cruz de la ventana
  for (let y = 150; y <= 179; y++) { const sh = (y - 150) * 1.3; for (let x = Math.round(64 + sh); x <= Math.round(110 + sh); x++) { const cr = Math.abs(x - (87 + sh)) < 1.5 || Math.abs(y - 163) < 1; if (!cr && g_hoyB4(x, y) < 0.7) g_hoyTinta(R, x, y, P.luz, 0.32); } }

  // LA LIBRERÍA de nogal (x 2–46): baldas con libros (lomos sin letras), cosas de la costa y un potos encima
  rect(1, 29, 47, 149, P.nogalD); rect(3, 31, 45, 149, P.nogalS); rect(3, 31, 4, 149, P.nogal); rect(44, 31, 45, 149, P.nogalD);
  rect(0, 28, 48, 30, P.nogal); rect(0, 28, 48, 28, P.nogalL);
  const baldas = [54, 78, 102, 126, 149];
  for (let i = 0; i < baldas.length; i++) { const yb = baldas[i], ya = i === 0 ? 31 : baldas[i - 1] + 3;
    if (i < 4) { rect(2, yb, 46, yb + 2, P.nogal); rect(2, yb, 46, yb, P.nogalL); rect(2, yb + 2, 46, yb + 2, P.nogalD); }
    let x = 5; const LIB = [P.l1, P.l2, P.l3, P.l4, P.l5, P.l6, P.l7, P.l8];
    while (x < 43) { const r = h(x, i, 503); if (i === 1 && x > 26) break; if (i === 3 && x > 30) break;
      if (r < 0.1 && x < 36) { // un montón de libros tumbados
        for (let j = 0; j < 3; j++) { const c = LIB[(x + j * 3) % 8]; rect(x, yb - 3 - j * 3, x + 9 - j, yb - 1 - j * 3, P.k); rect(x, yb - 2 - j * 3, x + 8 - j, yb - 1 - j * 3, c); rect(x + 8 - j, yb - 2 - j * 3, x + 8 - j, yb - 1 - j * 3, P.hojaPS); }
        x += 11; continue; }
      const w = 2 + Math.round(h(x, i, 504) * 3), al = Math.min(yb - ya - 2, 13 + Math.round(h(x, i, 505) * 7)), c = LIB[Math.floor(h(x, i, 506) * 8)];
      rect(x, yb - al, x + w, yb - 1, P.k); rect(x + 1, yb - al + 1, x + w - 1, yb - 1, c); pset(x + 1, yb - al + 1, g_hoyMez(c, P.blanco, 0.35));
      if (al > 10) { rect(x + 1, yb - al + 3, x + w - 1, yb - al + 3, P.laton); rect(x + 1, yb - 4, x + w - 1, yb - 4, P.laton); }
      x += w + 1; }
  }
  // en la balda 2, el tarro de arena con su caracola (la pecera se mueve: va aparte); en la balda 4, una caracola grande
  rect(34, 112, 42, 125, P.k); rect(35, 113, 41, 125, P.cristal); rect(35, 119, 41, 125, P.arena); rect(35, 119, 41, 119, P.arenaL); rect(36, 111, 40, 112, P.corcho); pset(37, 115, P.blanco);
  disco(38, 122, 1.5, P.l8);
  for (let a = 0; a < 7; a++) { const r = 5 - a * 0.6; disco(36 + a * 0.6, 145 - a * 0.4, r, a % 2 ? P.alf6 : P.mold); } pset(39, 144, P.barroL); linea(32, 147, 42, 147, P.moldD);
  // LA VENTANA: el marco blanco, el alféizar y las cortinas verdes recogidas (el hueco lo pinta la vista)
  { const [a, b, c, d] = G_HE.ventana; rect(a - 4, b - 4, c + 4, d + 3, P.moldD); rect(a - 3, b - 3, c + 3, d + 2, P.mold); rect(a - 1, b - 1, c + 1, d + 1, P.moldS);
    rect(a - 7, d + 3, c + 7, d + 5, P.mold); rect(a - 7, d + 3, c + 7, d + 3, P.blanco); rect(a - 7, d + 6, c + 7, d + 6, P.moldD);
    for (let y = d + 7; y < d + 10; y++) for (let x = a - 6; x <= c + 6; x++) if (g_hoyB4(x, y) < 0.5) g_hoyTinta(R, x, y, P.k, 0.25); }
  // EL BAÚL de colono bajo la ventana, con herrajes, unos libros encima y un tarro con una caracola
  { const x0 = 58, x1 = 102, y0 = 126, y1 = 148; rect(x0 - 1, y0 - 1, x1 + 1, y1, P.k);
    for (let y = y0; y < y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y < y0 + 4 ? (y === y0 ? P.robleB : P.robleL) : (y - y0) % 6 === 4 ? P.robleD : h(x >> 2, y, 507) < 0.15 ? P.robleS : P.roble);
    rect(x0, y0 + 4, x1, y0 + 4, P.robleD);
    for (const sx of [x0 + 6, x1 - 8]) { rect(sx, y0, sx + 2, y1 - 1, P.metalS); rect(sx, y0, sx, y1 - 1, P.metal); for (let y = y0 + 3; y < y1; y += 6) pset(sx + 1, y, P.metalL); }
    rect(78, y0 + 6, 82, y0 + 11, P.latonS); rect(79, y0 + 7, 81, y0 + 10, P.laton); pset(80, y0 + 9, P.k);
    rect(64, y0 - 5, 84, y0 - 1, P.k); rect(65, y0 - 4, 83, y0 - 1, P.l2); rect(65, y0 - 4, 83, y0 - 4, P.l6); rect(67, y0 - 8, 81, y0 - 5, P.k); rect(68, y0 - 7, 80, y0 - 5, P.l1); rect(68, y0 - 7, 80, y0 - 7, P.hojaPS);
    rect(88, y0 - 9, 96, y0 - 1, P.k); rect(89, y0 - 8, 95, y0 - 1, P.cristal); rect(89, y0 - 4, 95, y0 - 1, P.arena); disco(92, y0 - 3, 1.5, P.barroL); pset(90, y0 - 7, P.blanco); }
  // EL MAPA ANTIGUO enmarcado: acuarela de la costa con los bancos de arena, barquitos y rosa de los vientos, sin rótulos
  { const x0 = 114, y0 = 36, x1 = 172, y1 = 80; rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, P.k); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, P.laton); rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, P.latonL); rect(x0 - 2, y1 + 2, x1 + 2, y1 + 2, P.latonS); rect(x1 + 2, y0 - 2, x1 + 2, y1 + 2, P.latonS);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const costa = x0 + 22 + Math.sin((y - y0) * 0.22) * 4 + Math.sin((y - y0) * 0.6) * 1.5, banco = x0 + 40 + Math.sin((y - y0) * 0.12 + 1) * 3;
      let c = h(x, y, 508) < 0.08 ? P.papelS : P.papel;
      if (x < costa) c = h(x >> 1, y >> 1, 509) < 0.5 ? g_hoyMez(P.papel, P.hoja, 0.35) : g_hoyMez(P.papel, P.duna, 0.4);
      else if (Math.abs(x - banco) < 1.2 && (y - y0) % 13 < 11) c = P.arenaL;
      else c = g_hoyMez(P.papel, P.marL, 0.25 + ((x - costa) > 30 ? 0.18 : 0) + (g_hoyB4(x, y) < 0.3 ? 0.08 : 0));
      if (x >= costa && x < costa + 1.5) c = P.marS;
      pset(x, y, g_hoyMez(c, P.papelT, 0.15)); }
    // los ríos, dos barquitos y la rosa de los vientos
    linea(x0 + 2, y0 + 12, x0 + 20, y0 + 16, P.marL); linea(x0 + 4, y0 + 30, x0 + 21, y0 + 28, P.marL);
    for (const [bx, by] of [[x0 + 48, y0 + 10], [x0 + 32, y0 + 30]]) { rect(bx - 2, by, bx + 2, by, P.nogal); pset(bx, by - 1, P.lonaS); pset(bx, by - 2, P.lonaS); pset(bx + 1, by - 1, P.rojo); }
    { const rx = x1 - 8, ry = y1 - 9; for (let i = -5; i <= 5; i++) { pset(rx + i, ry, Math.abs(i) < 2 ? P.rojo : P.nogal); pset(rx, ry + i, Math.abs(i) < 2 ? P.rojo : P.nogal); } pset(rx - 2, ry - 2, P.nogal); pset(rx + 2, ry + 2, P.nogal); pset(rx + 2, ry - 2, P.nogal); pset(rx - 2, ry + 2, P.nogal); R.anillo(rx, ry, 3, P.nogalL); }
    for (let x = x0; x <= x1; x++) { pset(x, y0, P.papelS); pset(x, y1, P.papelS); } }
  // el aplique de latón con su pantallita y su halo cálido en la pared
  { const ax = 179, ay = 52; for (let j = -16; j <= 16; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j * 0.9) / 16; if (d < 1 && g_hoyB4(ax + i, ay + j) < (1 - d) * 0.8) g_hoyTinta(R, ax + i, ay + j, P.luz, 0.35); }
    rect(ax - 1, ay + 4, ax + 1, ay + 12, P.latonS); rect(ax, ay + 4, ax, ay + 12, P.laton); rect(ax - 2, ay + 12, ax + 2, ay + 13, P.latonS);
    poligono([[ax - 5, ay + 4], [ax + 5, ay + 4], [ax + 3, ay - 3], [ax - 3, ay - 3]], P.alf6); linea(ax - 5, ay + 4, ax + 5, ay + 4, P.moldS); linea(ax - 3, ay - 3, ax + 3, ay - 3, P.moldS); }
  // EL TABLERO DE CORCHO con su marco, las notitas de dibujos y la lana roja que las une (la nota grande va aparte)
  { const [a, b, c, d] = G_HE.corcho; rect(a - 2, b - 2, c + 2, d + 2, P.k); rect(a - 1, b - 1, c + 1, d + 1, P.nogal); rect(a - 1, b - 1, c + 1, b - 1, P.nogalL);
    for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) { const v = h(x, y, 516); pset(x, y, v < 0.18 ? P.corchoS : v > 0.86 ? P.corchoL : v < 0.22 ? P.corchoD : P.corcho); }
    for (let y = d + 3; y < d + 6; y++) for (let x = a; x <= c + 3; x++) if (g_hoyB4(x, y) < 0.5) g_hoyTinta(R, x, y, P.k, 0.25);
    const NOTAS = [[190, 44, 'barco'], [222, 44, 'anillos'], [190, 79, 'iman'], [223, 80, 'pregunta']];
    const PINES = [];
    for (const [nx, ny, q] of NOTAS) { rect(nx + 1, ny + 1, nx + 11, ny + 11, P.corchoD); rect(nx, ny, nx + 10, ny + 10, P.nota); rect(nx, ny, nx + 10, ny, P.notaL); rect(nx + 10, ny + 1, nx + 10, ny + 10, P.notaS);
      if (q === 'barco') { linea(nx + 2, ny + 7, nx + 8, ny + 7, P.lapiz); linea(nx + 3, ny + 8, nx + 7, ny + 8, P.lapiz); linea(nx + 5, ny + 2, nx + 5, ny + 6, P.lapiz); linea(nx + 6, ny + 3, nx + 8, ny + 6, P.lapiz); }
      else if (q === 'anillos') { R.anillo(nx + 5, ny + 5, 4, P.lapiz); R.anillo(nx + 5, ny + 5, 2, P.lapiz); pset(nx + 5, ny + 5, P.rojo); }
      else if (q === 'iman') { R.rect(nx + 2, ny + 4, nx + 3, ny + 8, P.rojo); R.rect(nx + 7, ny + 4, nx + 8, ny + 8, P.rojo); R.rect(nx + 2, ny + 8, nx + 8, ny + 9, P.rojo); R.rect(nx + 4, ny + 8, nx + 6, ny + 8, P.rojoS); R.rect(nx + 2, ny + 3, nx + 3, ny + 4, P.metal); R.rect(nx + 7, ny + 3, nx + 8, ny + 4, P.metal); pset(nx + 2, ny + 1, P.lapiz); pset(nx + 5, ny + 1, P.lapiz); pset(nx + 8, ny + 1, P.lapiz); }   // el imán de herradura con sus polos de acero y las rayitas de la fuerza
      else R.icono('?', nx + 3, ny + 1, P.lapiz, P.notaS, 1);
      disco(nx + 5, ny, 1.2, P.rojo); pset(nx + 4, ny - 1, P.blanco); PINES.push([nx + 5, ny]); }
    // la lana roja entre las chinchetas, combada
    const lana = (p, q) => { const n = Math.ceil(Math.hypot(q[0] - p[0], q[1] - p[1])); for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(p[0] + (q[0] - p[0]) * u), y = Math.round(p[1] + (q[1] - p[1]) * u + Math.sin(u * Math.PI) * 3); pset(x, y, u > 0.1 && u < 0.9 ? P.lana : P.lanaS); } };
    lana(PINES[0], PINES[1]); lana(PINES[0], PINES[2]); lana(PINES[1], PINES[3]); lana(PINES[2], PINES[3]); }
  // LA PUERTA de cuarterones, con su marco, las bisagras y el pomo
  { const [a, b, c, d] = G_HE.puerta; rect(a - 4, b - 4, c + 4, d, P.moldD); rect(a - 3, b - 3, c + 3, d, P.mold); rect(a - 3, b - 3, c + 3, b - 3, P.blanco); rect(a - 1, b - 1, c + 1, d, P.moldS);
    for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) pset(x, y, h(x >> 1, y >> 3, 517) < 0.15 ? P.nogalS : x === a ? P.nogalL : P.nogal);
    for (const [px0, py0, px1, py1] of [[a + 3, b + 4, a + 13, b + 42], [a + 17, b + 4, c - 3, b + 42], [a + 3, b + 50, a + 13, d - 6], [a + 17, b + 50, c - 3, d - 6]]) {
      rect(px0, py0, px1, py1, P.nogalD); rect(px0 + 1, py0 + 1, px1, py1, P.nogalS); rect(px0 + 2, py0 + 2, px1 - 1, py1 - 1, P.nogal); rect(px0 + 2, py0 + 2, px0 + 2, py1 - 1, P.nogalL); rect(px0 + 2, py1 - 1, px1 - 1, py1 - 1, P.nogalS); }
    rect(c - 7, 99, c - 3, 107, P.latonS); rect(c - 6, 100, c - 4, 106, P.laton); disco(c - 5, 102, 2, P.laton); pset(c - 6, 101, P.latonL); pset(c - 5, 105, P.k);
    for (const y of [b + 8, d - 14]) { rect(a, y, a + 1, y + 5, P.latonS); pset(a, y + 1, P.laton); }
    for (let y = 150; y < 154; y++) for (let x = a - 2; x <= c + 2; x++) if (g_hoyB4(x, y) < 0.5) g_hoyTinta(R, x, y, P.k, 0.2); }
  // el perchero: el pie, el chubasquero amarillo, el sombrero de paja y una bolsa de lona
  { const px = 298; rect(px - 1, 56, px + 1, 147, P.nogalD); rect(px, 56, px, 147, P.nogalL); rect(px - 9, 147, px + 9, 149, P.nogalD); rect(px - 7, 146, px + 7, 146, P.nogal);
    linea(px, 60, px - 7, 56, P.nogalD); linea(px, 60, px + 7, 56, P.nogalD); disco(px, 55, 2, P.laton);
    // el sombrero
    rect(px - 9, 56, px + 9, 57, P.k); rect(px - 8, 56, px + 8, 56, P.alf3); rect(px - 5, 50, px + 5, 55, P.k); rect(px - 4, 51, px + 4, 55, P.alf3); rect(px - 4, 53, px + 4, 54, P.alf1);
    // el chubasquero: los hombros, el cuerpo que cae, los botones, la manga y su sombra
    poligono([[px - 8, 62], [px + 8, 62], [px + 12, 106], [px - 12, 106]], P.k); poligono([[px - 7, 63], [px + 7, 63], [px + 11, 105], [px - 11, 105]], P.amarillo);
    for (let y = 64; y < 105; y++) { const w = 7 + (y - 63) * 0.1; pset(Math.round(px + w - 1), y, P.amarilloS); pset(Math.round(px - w + 1), y, P.amarilloL); if (y % 9 === 0) pset(px, y, P.k); }
    linea(px, 63, px, 104, P.amarilloS); linea(px - 7, 66, px - 10, 98, P.amarilloS); rect(px - 4, 62, px + 4, 64, P.amarilloS);
    // la bolsa de lona colgada del otro gancho
    poligono([[px + 6, 70], [px + 18, 70], [px + 19, 96], [px + 5, 96]], P.k); poligono([[px + 7, 71], [px + 17, 71], [px + 18, 95], [px + 6, 95]], P.lona); linea(px + 7, 71, px + 7, 60, P.lonaS); linea(px + 17, 71, px + 7, 60, P.lonaS); rect(px + 8, 80, px + 16, 81, P.lonaS);
    for (let y = 148; y < 152; y++) for (let x = px - 12; x <= px + 14; x++) if (g_hoyB4(x, y) < 0.55) g_hoyTinta(R, x, y, P.k, 0.25); }

  // LA MESA de roble con patas torneadas, su sombra en el suelo y lo que hay encima
  { const x0 = 108, x1 = 198;
    for (let y = 150; y <= 158; y++) for (let x = x0 - 2; x <= x1 + 6; x++) if (g_hoyB4(x, y) < 0.5 - (y - 150) * 0.04) g_hoyTinta(R, x, y, P.k, 0.3);
    for (const lx of [x0 + 3, x1 - 6]) { rect(lx - 1, 140, lx + 4, 156, P.k); rect(lx, 141, lx + 3, 156, P.robleS); rect(lx, 141, lx, 156, P.robleL); for (const y of [145, 151]) { rect(lx - 1, y, lx + 4, y + 1, P.robleS); pset(lx - 1, y, P.robleL); } rect(lx - 1, 155, lx + 4, 156, P.robleD); }
    rect(x0 + 6, 140, x1 - 6, 145, P.k); rect(x0 + 7, 141, x1 - 7, 144, P.robleS); rect(x0 + 7, 141, x1 - 7, 141, P.roble); rect(146, 142, 160, 143, P.robleD); pset(153, 142, P.laton);
    rect(x0, 134, x1, 140, P.k); for (let x = x0 + 1; x < x1; x++) { pset(x, 135, P.robleB); pset(x, 136, h(x >> 2, 1, 518) < 0.3 ? P.robleL : P.roble); pset(x, 137, P.roble); pset(x, 138, P.robleS); pset(x, 139, P.robleD); } }
  // sobre la mesa: la lupa, la maqueta (base de corcho, casitas y empalizada), el imán, el taco de notas y el tronquito
  { // la lupa tumbada
    rect(110, 132, 116, 133, P.nogal); R.anillo(119, 132, 3, P.k); disco(119, 132, 2, P.cristal); pset(118, 131, P.blanco);
    // la base de corcho
    for (let y = 125; y <= 134; y++) for (let x = 121; x <= 171; x++) { const d = Math.hypot((x - 146) / 25, (y - 130) / 5); if (d > 1) continue; pset(x, y, d > 0.85 ? P.corchoS : h(x, y, 519) < 0.2 ? P.arenaS : P.arena); }
    rect(122, 133, 170, 134, P.corchoS); rect(122, 135, 170, 135, P.corchoD);
    // las casitas
    for (const [hx, hy] of [[136, 126], [146, 124], [156, 126]]) { rect(hx - 3, hy - 3, hx + 3, hy, P.cartonL); rect(hx + 1, hy - 3, hx + 3, hy, P.carton); poligono([[hx - 4, hy - 3], [hx, hy - 7], [hx + 4, hy - 3]], P.papelTS); linea(hx, hy - 7, hx + 4, hy - 3, P.cartonS); }
    // la empalizada: palitos aguzados en óvalo, los de atrás y luego los de delante
    for (const delante of [false, true]) for (let a = 0; a < Math.PI * 2; a += 0.21) { const s = Math.sin(a); if ((s >= 0) !== delante || Math.abs(a - Math.PI / 2) < 0.2) continue; const x = Math.round(146 + Math.cos(a) * 21), yb = Math.round(129 + s * 4);
      rect(x, yb - 10, x, yb, Math.cos(a) < -0.2 ? P.robleB : delante ? P.robleL : P.roble); pset(x + 1, yb - 9, P.robleD); pset(x, yb - 11, P.robleD); }
    // los postes de la entrada (el de la derecha, más claro: el postecito)
    rect(140, 121, 142, 134, P.robleS); rect(150, 120, 152, 134, P.robleB); pset(152, 121, P.robleD); pset(150, 121, P.robleD); pset(151, 121, P.robleD);
    // la banderita va aparte (ondea). El imán rojo con sus puntas de metal
    rect(172, 129, 173, 133, P.rojo); rect(176, 129, 177, 133, P.rojo); rect(172, 133, 177, 134, P.rojoS); pset(172, 129, P.metalL); pset(176, 129, P.metalL);
    // el taco de notas amarillas
    rect(178, 130, 188, 134, P.k); rect(179, 130, 187, 133, P.nota); rect(179, 130, 187, 130, P.notaL); rect(179, 133, 187, 133, P.notaS); linea(181, 132, 185, 131, P.lapiz);
    // el tronquito de pie con sus anillos
    disco(193, 129, 5.5, P.k); disco(193, 129, 4.5, P.corteza); disco(193, 129, 3.5, P.alb); R.anillo(193, 129, 2, P.anL); pset(193, 129, P.durS); pset(191, 127, P.blanco); }
}
// el potos de la librería, que cuelga y se mece con el aire de la ventana
function g_hoyPotos(R, t) {
  const P = G_HOY, { rect, pset, disco } = R;
  rect(6, 21, 18, 28, P.k); rect(7, 22, 17, 28, P.barro); rect(7, 22, 17, 22, P.barroL); rect(15, 23, 17, 28, P.barroS);
  for (let r = 0; r < 3; r++) { const x0 = 6 + r * 5, n = 10 + r * 4; for (let i = 0; i < n; i++) { const m = Math.round(Math.sin(t * 1.3 + r + i * 0.3) * i * 0.08), x = x0 - Math.round(i * 0.25) + m, y = 26 + i * 2;
    pset(x, y, P.hojaS); if (i % 2 === 0) { disco(x + (i % 4 ? 2 : -2), y, 1.6, P.hoja); pset(x + (i % 4 ? 2 : -2) - 1, y - 1, P.hojaL); } } }
  for (let i = 0; i < 6; i++) { const x = 9 + i * 2, y = 18 + (i & 1) + Math.round(Math.sin(t + i) * 0.6); disco(x, y, 2, P.hoja); pset(x - 1, y - 1, P.hojaL); }
}

// la pecera de la balda 2 con el pez naranja que nada y sus burbujas
function g_hoyPecera(R, t) {
  const P = G_HOY, { pset, disco } = R, cx = 36, cy = 71;
  disco(cx, cy, 7, P.k); disco(cx, cy, 6, P.cristal); for (let y = cy - 3; y <= cy + 6; y++) for (let x = cx - 6; x <= cx + 6; x++) if (Math.hypot(x - cx, y - cy) < 6) pset(x, y, y === cy - 3 ? P.marB : (x + y + Math.floor(t * 2)) % 7 ? P.agua : P.aguaS);
  R.rect(cx - 4, cy - 7, cx + 4, cy - 6, P.cristal); R.rect(cx - 4, cy - 7, cx + 4, cy - 7, P.k);
  for (let x = cx - 4; x <= cx + 4; x++) pset(x, cy + 5, (x & 1) ? P.arena : P.arenaS);
  const u = Math.sin(t * 0.9), fx = Math.round(cx + u * 3), fy = Math.round(cy + 1 + Math.sin(t * 1.7)), d = Math.cos(t * 0.9) > 0 ? 1 : -1;
  pset(fx, fy, P.naranja); pset(fx + d, fy, P.naranja); pset(fx - d, fy, P.naranjaS); pset(fx - 2 * d, fy - 1, P.naranjaS); pset(fx - 2 * d, fy + 1, P.naranjaS); pset(fx + d, fy - 1, P.k);
  for (let k = 0; k < 2; k++) { const v = (t * 0.7 + k * 0.5) % 1; pset(fx + d * 2, Math.round(fy - 1 - v * 4), P.blanco); }
  pset(cx - 3, cy - 3, P.blanco); pset(cx - 4, cy - 2, P.blanco);
}

// el ventilador del techo: el vástago, el motor y cuatro aspas que giran despacio
function g_hoyVentilador(R, t) {
  const P = G_HOY, { rect, pset, linea } = R, cx = 222, cy = 9;
  rect(cx, 0, cx + 1, cy - 3, P.latonS); rect(cx - 4, cy - 3, cx + 5, cy, P.laton); rect(cx - 4, cy - 3, cx + 5, cy - 3, P.latonL); rect(cx - 3, cy + 1, cx + 4, cy + 2, P.latonS);
  for (let k = 0; k < 4; k++) { const a = t * 2.2 + k * Math.PI / 2, ex = Math.round(Math.cos(a) * 22), ey = Math.round(Math.sin(a) * 2.4); const fr = Math.sin(a) > 0;
    linea(cx, cy + 1, cx + ex, cy + 1 + ey, fr ? P.nogal : P.nogalS); linea(cx, cy, cx + ex, cy + ey, fr ? P.nogalL : P.nogal); }
  rect(cx - 1, cy + 3, cx + 2, cy + 5, P.alf6);
}

// la nota de Atom en el corcho: 'taza' (una taza a lápiz con una flecha en bucle que no va a ninguna parte) o 'flecha'
// (una isla con su árbol y una flecha roja clara hacia ella); e 0–1: cae desde arriba hasta su sitio
function g_hoyNota(R, t, tipo, e = 1) {
  const P = G_HOY, { rect, pset, linea, disco } = R, [cx, cy] = [211, 67];
  disco(cx, cy - 10, 1.5, P.rojo); pset(cx - 1, cy - 11, P.blanco);
  if (!tipo || !(e > 0)) return;
  const u = Math.max(0, Math.min(1, e)), dy = Math.round((1 - u) * (1 - u) * -60), gira = (1 - u) * 0.4, x0 = cx - 11, y0 = cy - 10 + dy;
  // la esquina de abajo tiembla con el aire de la ventana
  const lev = u >= 1 ? Math.max(0, Math.round(Math.sin(t * 3.1) * 1.5 + Math.sin(t * 7.3) * 0.6)) : 0;
  const tx = Math.round(gira * 8);
  rect(x0 + 1 + tx, y0 + 1, x0 + 23 + tx, y0 + 21, P.corchoD);
  rect(x0 + tx, y0, x0 + 22 + tx, y0 + 20, P.nota); rect(x0 + tx, y0, x0 + 22 + tx, y0 + 1, P.notaL); rect(x0 + 22 + tx, y0 + 2, x0 + 22 + tx, y0 + 20, P.notaS);
  if (lev) { for (let i = 0; i <= lev + 2; i++) for (let j = 0; j <= lev + 2 - i; j++) pset(x0 + 22 + tx - i, y0 + 20 - j, j + i > lev + 1 ? P.notaS : P.notaL); }
  const X = x0 + tx, Y = y0;
  if (tipo === 'taza') {
    // la taza: el borde, el cuerpo, el asa y el plato; dos hilos de vapor
    linea(X + 4, Y + 10, X + 12, Y + 10, P.lapiz); linea(X + 4, Y + 10, X + 5, Y + 16, P.lapiz); linea(X + 12, Y + 10, X + 11, Y + 16, P.lapiz); linea(X + 5, Y + 16, X + 11, Y + 16, P.lapiz);
    R.anillo(X + 14, Y + 13, 2, P.lapiz); linea(X + 2, Y + 18, X + 14, Y + 18, P.lapiz);
    pset(X + 7, Y + 8, P.lapiz); pset(X + 6, Y + 7, P.lapiz); pset(X + 7, Y + 6, P.lapiz); pset(X + 10, Y + 8, P.lapiz); pset(X + 9, Y + 7, P.lapiz); pset(X + 10, Y + 6, P.lapiz);
    // la flecha en bucle: sale de la taza, da una vuelta y apunta hacia arriba, a ninguna parte
    const pts = []; for (let i = 0; i <= 26; i++) { const a = i / 26 * Math.PI * 2.2; pts.push([X + 17 + Math.cos(a) * 3 - i * 0.05, Y + 9 - Math.sin(a) * 3 - i * 0.12]); }
    for (let i = 0; i + 1 < pts.length; i++) linea(Math.round(pts[i][0]), Math.round(pts[i][1]), Math.round(pts[i + 1][0]), Math.round(pts[i + 1][1]), P.rojo);
    const [ex, ey] = pts[pts.length - 1].map(Math.round); pset(ex - 1, ey + 1, P.rojo); pset(ex + 1, ey + 1, P.rojo); pset(ex, ey - 1, P.rojo);
  } else {
    // la isla con su árbol, y la flecha roja gorda que va derecha a ella
    for (let i = -6; i <= 6; i++) for (let j = 0; j <= 2; j++) if ((i / 6.5) ** 2 + (j / 2.6) ** 2 < 1) pset(X + 14 + i, Y + 15 + j, j === 0 ? P.arenaS : P.arena);
    linea(X + 7, Y + 18, X + 21, Y + 18, P.marL); linea(X + 15, Y + 15, X + 15, Y + 10, P.lapiz); linea(X + 12, Y + 10, X + 18, Y + 10, P.hoja); linea(X + 13, Y + 9, X + 17, Y + 9, P.hoja); pset(X + 15, Y + 8, P.hoja);
    for (let i = 0; i < 8; i++) { pset(X + 2 + i, Y + 6 + Math.round(i * 0.4), P.rojo); pset(X + 2 + i, Y + 7 + Math.round(i * 0.4), P.rojo); }
    linea(X + 10, Y + 7, X + 7, Y + 6, P.rojo); linea(X + 10, Y + 9, X + 8, Y + 11, P.rojo); linea(X + 10, Y + 7, X + 10, Y + 10, P.rojo); pset(X + 11, Y + 9, P.rojo);
  }
  disco(cx + tx, Y + 1, 1.5, P.rojo); pset(cx - 1 + tx, Y, P.blanco);
}
// la banderita de San Jorge en un palillo, que ondea; (x, y): el pie del palillo; s: 1 (de lejos) o 2 (de cerca)
function g_hoyBanderita(R, t, x, y, s = 1) {
  const P = G_HOY, { pset, rect } = R, al = 9 * s, w = 6 * s, hh = 4 * s;
  rect(x, y - al, x + s - 1, y, P.robleD);
  for (let i = 0; i < w; i++) { const o = Math.round(Math.sin(t * 5 - i * 0.6) * (i / w) * s); for (let j = 0; j < hh; j++) { const cruz = Math.abs(i - Math.floor(w * 0.4)) < s * 0.6 + 0.4 || Math.abs(j - Math.floor(hh / 2)) < s * 0.5; pset(x + s + i, y - al + j + o, cruz ? P.rojo : (j === 0 ? P.blanco : P.hoja2)); } }
}

// EL ESTUDIO (general): lo fijo del búfer y, encima, lo que se mueve
function g_hoyEstudio(R, t, o = {}) {
  const P = G_HOY, { pset } = R;
  g_hoyCapa(R, 'estudio', () => g_hoyEstudioFijo(R));
  g_hoyVistaCosta(R, t, ...G_HE.ventana);
  // los travesaños de la ventana (encima de la vista) y el reflejo del cristal
  { const [a, b, c, d] = G_HE.ventana; R.rect(79, b, 81, d, P.mold); R.rect(79, b, 79, d, P.blanco); R.rect(81, b, 81, d, P.moldS); R.rect(a, 63, c, 65, P.mold); R.rect(a, 63, c, 63, P.blanco); R.rect(a, 65, c, 65, P.moldS);
    for (let k = 0; k < 2; k++) for (let i = 0; i < 14 - k * 5; i++) { const x = a + 3 + k * 24 + i, y = b + 20 - i; if (y >= b && x <= c && (x < 79 || x > 81)) g_hoyTinta(R, x, y, P.blanco, 0.3); }
    // las cortinas verdes recogidas, que ondean un poco con la brisa
    for (const [lado, xb] of [[-1, a - 9], [1, c + 3]]) for (let y = b - 6; y <= d + 2; y++) { const recog = y > d - 22 && y < d - 14 ? 2 : 0, ond = Math.round(Math.sin(t * 1.4 + y * 0.12) * (y > d - 14 ? 1 : 0.5)), w = 6 - recog;
      for (let i = 0; i < w; i++) { const x = xb + (lado < 0 ? i : 6 - w + i) + ond; pset(x, y, i === 0 || i === w - 1 ? P.cortinaS : (i + (y >> 2)) % 3 === 0 ? P.cortinaL : P.cortina); } }
    R.rect(a - 12, b - 7, c + 12, b - 6, P.latonS); R.rect(a - 12, b - 7, c + 12, b - 7, P.laton); R.disco(a - 13, b - 6, 1.5, P.laton); R.disco(c + 13, b - 6, 1.5, P.laton); }
  g_hoyPotos(R, t);
  g_hoyPecera(R, t);
  g_hoyVentilador(R, t);
  // el aplique: la bombilla que tiembla apenas
  if (Math.sin(t * 7.1) + Math.sin(t * 2.3) > -1.4) { pset(178, 57, P.luz); pset(180, 57, P.luzS); }
  // las motas en el rayo de sol de la ventana
  g_hoyMotas(R, t, 64, 96, 104, 172, 14, 0.9);
  // la banderita de la maqueta
  g_hoyBanderita(R, t, 133, 129, 1);
  // la nota de Atom
  const tipo = o.nota === undefined ? 'taza' : o.nota;
  g_hoyNota(R, t, tipo, o.notaEntra ?? 1);
  return {};
}

// lo de delante en el estudio: el cesto de cartas enrolladas abajo a la izquierda y la maceta de barrón de duna abajo
// a la derecha (se mece); los dos fuera de libre
function g_hoyEstudioDelante(R, t) {
  const P = G_HOY, { rect, pset, linea, disco } = R;
  // los rollos de cartas que asoman del cesto (papel con su cinta), y el cesto de mimbre
  for (const [x, al, c] of [[6, 26, P.papel], [11, 32, P.hojaP], [16, 24, P.papelT], [21, 29, P.hojaP]]) { rect(x - 2, 179 - al, x + 2, 168, P.k); rect(x - 1, 180 - al, x + 1, 168, c); pset(x - 1, 180 - al, P.blanco); rect(x - 1, 172 - Math.round(al / 2), x + 1, 172 - Math.round(al / 2), P.rojo); disco(x, 179 - al, 1.6, P.papelS); pset(x, 179 - al, P.papelM); }
  rect(0, 166, 27, 179, P.k); for (let y = 167; y <= 179; y++) for (let x = 1; x <= 26; x++) pset(x, y, ((x + (y >> 1) * 2) & 3) === 0 ? P.nogal : y === 167 ? P.robleB : (y & 1) ? P.robleL : P.roble);
  rect(1, 170, 26, 170, P.robleS);
  // el barrón de duna en su maceta, que se mece
  rect(296, 162, 319, 179, P.k); rect(297, 163, 319, 179, P.barro); rect(297, 163, 319, 164, P.barroL); rect(297, 170, 319, 170, P.barroS); rect(316, 165, 319, 179, P.barroS);
  for (let k = 0; k < 16; k++) { const bx = 299 + k * 1.3, al = 18 + (k * 7) % 13, m = Math.sin(t * 1.6 + k * 0.7) * 3; linea(Math.round(bx), 162, Math.round(bx + m + (k - 8) * 0.6), 162 - al, k % 3 ? P.duna : P.dunaS);
    if (k % 4 === 0) { const ex = Math.round(bx + m + (k - 8) * 0.6), ey = 162 - al; pset(ex, ey - 1, P.arenaS); pset(ex + 1, ey, P.arenaS); pset(ex, ey - 2, P.alf3); } }
  return {};
}

// LA MAQUETA DE CERCA (cámara 'maqueta'): lo fijo
const G_HM = { cx: 160, cy: 124, rx: 70, ry: 20, ventana: [10, 24, 72, 74] };

// los palitos de la empalizada: [x, y del pie, color, delante]
function g_hoyPalitos() {
  const { cx, cy, rx, ry } = G_HM, L = [];
  for (let a = 0; a < Math.PI * 2; a += 0.075) { if (Math.abs(a - Math.PI / 2) < 0.29) continue; const s = Math.sin(a), c = Math.cos(a);
    L.push({ x: Math.round(cx + c * rx), y: Math.round(cy + s * ry), c, s, al: 19 + Math.round(h(Math.round(a * 100), 1, 550) * 4) }); }
  return L.sort((p, q) => p.y - q.y);
}

function g_hoyPalito(R, p) {
  const P = G_HOY, { rect, pset } = R, { x, y, c, al } = p, col = c < -0.3 ? [P.robleB, P.robleL, P.roble] : c > 0.4 ? [P.roble, P.robleS, P.robleD] : [P.robleL, P.roble, P.robleS];
  rect(x - 2, y - al, x + 2, y, P.k); rect(x - 1, y - al, x + 1, y - 1, col[1]); rect(x - 1, y - al, x - 1, y - 1, col[0]); rect(x + 1, y - al, x + 1, y - 1, col[2]);
  pset(x - 1, y - al, P.k); pset(x + 1, y - al, P.k); pset(x, y - al - 1, P.k); pset(x, y - al, col[0]);
  if (h(x, y, 551) < 0.4) pset(x, y - Math.round(al * 0.4), col[2]);
}

function g_hoyMaquetaFijo(R) {
  const P = G_HOY, { rect, pset, disco, linea, poligono } = R, { cx, cy, rx, ry } = G_HM;
  // la pared: el papel (solo listas bajo el año y tras Atom) y la sombra de la mesa contra ella
  g_hoyPapel(R, 0, 0, 319, 80, (x, y) => (y < 22 && x < 180) || (x > 272 && y < 48));
  // la ventana con su marco y su alféizar (el hueco lo pinta la vista) y la cortina
  { const [a, b, c, d] = G_HM.ventana; rect(a - 4, b - 4, c + 4, d + 4, P.moldD); rect(a - 3, b - 3, c + 3, d + 3, P.mold); rect(a - 1, b - 1, c + 1, d + 1, P.moldS); rect(a - 6, d + 4, c + 6, d + 6, P.mold); rect(a - 6, d + 4, c + 6, d + 4, P.blanco); }
  // el corcho a la derecha, con notitas, una foto de un faro y una chincheta suelta
  { const a = 232, b = 48; rect(a - 2, b - 2, 319, 80, P.k); rect(a - 1, b - 1, 319, 80, P.nogal); rect(a - 1, b - 1, 319, b - 1, P.nogalL);
    for (let y = b; y <= 80; y++) for (let x = a; x <= 319; x++) { const v = h(x, y, 552); pset(x, y, v < 0.18 ? P.corchoS : v > 0.86 ? P.corchoL : P.corcho); }
    for (const [nx, ny, q] of [[240, 54, 0], [262, 58, 1], [300, 52, 2]]) { rect(nx + 1, ny + 1, nx + 17, ny + 17, P.corchoD); rect(nx, ny, nx + 16, ny + 16, q === 1 ? P.blanco : P.nota); rect(nx, ny, nx + 16, ny, q === 1 ? P.hoja2 : P.notaL);
      if (q === 0) { R.anillo(nx + 8, ny + 9, 5, P.lapiz); R.anillo(nx + 8, ny + 9, 3, P.lapiz); R.anillo(nx + 8, ny + 9, 1, P.rojo); }
      else if (q === 1) { rect(nx + 2, ny + 2, nx + 14, ny + 12, P.cie2); rect(nx + 2, ny + 9, nx + 14, ny + 12, P.arena); for (let y = ny + 3; y < ny + 11; y++) { pset(nx + 9, y, ((y >> 1) & 1) ? P.faroN : P.faroB); pset(nx + 10, y, ((y >> 1) & 1) ? P.faroN : P.faroB); } }
      else { for (let i = 0; i < 4; i++) { linea(nx + 3 + i * 3, ny + 12, nx + 3 + i * 3, ny + 5, P.lapiz); pset(nx + 3 + i * 3, ny + 4, P.lapiz); } linea(nx + 2, ny + 13, nx + 14, ny + 13, P.lapiz); }
      disco(nx + 8, ny, 1.5, P.rojo); pset(nx + 7, ny - 1, P.blanco); } }
  // la repisa de la pared (x 96–226, y 44): botes de pintura, un rollo de cinta, un barquito de juguete y un pincel
  rect(96, 44, 226, 47, P.k); rect(96, 44, 225, 44, P.nogalL); rect(96, 45, 225, 46, P.nogal); for (let y = 48; y < 52; y++) for (let x = 96; x < 227; x++) if (g_hoyB4(x, y) < (52 - y) / 5) g_hoyTinta(R, x, y, P.k, 0.3);
  for (const [bx, c] of [[102, P.alf1], [112, P.alf4], [122, P.hoja], [132, P.amarillo]]) { rect(bx, 35, bx + 7, 43, P.k); rect(bx + 1, 36, bx + 6, 43, P.hoja2); rect(bx + 1, 36, bx + 6, 38, c); rect(bx + 1, 39, bx + 2, 43, P.blanco); }
  disco(150, 39, 5, P.k); disco(150, 39, 4, P.metalL); disco(150, 39, 2, P.nogal);
  rect(166, 40, 196, 43, P.k); rect(167, 40, 195, 42, P.nogal); rect(167, 40, 195, 40, P.nogalL); linea(176, 39, 176, 24, P.nogalD); linea(186, 39, 186, 27, P.nogalD); R.poligono([[172, 26], [181, 26], [180, 37], [172, 37]], P.hoja2); R.poligono([[183, 29], [190, 29], [189, 37], [183, 37]], P.hoja2); rect(176, 30, 177, 33, P.rojo); rect(172, 31, 180, 31, P.rojo);
  linea(204, 43, 220, 36, P.k); linea(205, 43, 219, 36, P.amarillo); rect(219, 34, 222, 37, P.nogalD);
  // el borde trasero de la mesa y la tabla de roble en perspectiva (las tablas más altas cuanto más cerca)
  for (let x = 0; x < 320; x++) for (let y = 76; y <= 80; y++) if (g_hoyB4(x, y) < (y - 75) / 6) g_hoyTinta(R, x, y, P.k, 0.35);
  g_hoyTablas(R, 0, 319, [81, 85, 90, 96, 103, 111, 120, 130, 141, 153, 166, 180], [P.roble, P.robleS, P.robleL, P.robleD], 7);
  // la luz de la tarde: una mancha cálida alrededor de la maqueta
  for (let y = 82; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 150) / 170, (y - 128) / 60); if (d < 1 && g_hoyB4(x, y) < (1 - d) * 0.9) g_hoyTinta(R, x, y, P.luz, 0.18); }
  // la base de corcho con su canto, pintada de arena, con matitas de musgo y un caminito desde la entrada
  { const bx = 160, by = 134, brx = 104, bry = 32;
    for (let y = by - bry - 1; y <= by + bry + 6; y++) for (let x = bx - brx - 1; x <= bx + brx + 1; x++) { const d = Math.hypot((x - bx) / brx, (y - by) / bry), d2 = Math.hypot((x - bx) / brx, (y - by - 5) / bry);
      if (d <= 1) { const v = h(x, y, 553); pset(x, y, d > 0.97 ? P.corchoL : v < 0.12 ? P.arenaS : v > 0.9 ? P.arenaL : v < 0.17 ? P.corcho : P.arena); }
      else if (d2 <= 1 && y > by) pset(x, y, d2 > 0.97 || y === by + bry + 5 ? P.corchoD : h(x, y, 554) < 0.3 ? P.corchoS : P.corcho); }
    for (let y = by + 2; y <= by + bry + 6; y++) for (let x = bx - brx; x <= bx + brx + 20; x++) { if (Math.hypot((x - bx - 14) / brx, (y - by - 10) / bry) < 1 && Math.hypot((x - bx) / brx, (y - by - 5) / bry) > 1.0 && g_hoyB4(x, y) < 0.6) g_hoyTinta(R, x, y, P.k, 0.35); }
    for (let k = 0; k < 40; k++) { const a = h(k, 1, 555) * Math.PI * 2, r = 0.2 + h(k, 2, 555) * 0.75, mx = Math.round(bx + Math.cos(a) * brx * r), my = Math.round(by + Math.sin(a) * bry * r); if (Math.abs(Math.hypot((mx - cx) / rx, (my - cy) / ry) - 1) < 0.15) continue;
      for (let i = -1; i <= 1; i++) { pset(mx + i, my, P.hoja); pset(mx + i, my - 1, i ? P.hojaS : P.hojaL); } }
    for (let y = 144; y <= 165; y++) { const w = 4 + (y - 144) * 0.2; for (let x = Math.round(160 - w); x <= 160 + w; x++) if (h(x, y, 556) < 0.55) pset(x, y, P.arenaL); } }
  // la sombra de la empalizada en la arena, hacia la derecha (la luz viene de la ventana, a la izquierda)
  for (const p of g_hoyPalitos()) for (let i = 1; i < 12; i++) { const x = p.x + i + 1, y = p.y + Math.round(i * 0.25); if (g_hoyB4(x, y) < 0.7) g_hoyTinta(R, x, y, P.k, 0.25); }
  // los palitos de atrás
  for (const p of g_hoyPalitos()) if (p.s < 0) g_hoyPalito(R, p);
  // las tres casitas de cartón con su tejado de papel doblado (la puerta y la ventanita pintadas) y el pozo
  for (const [hx, hy, w] of [[124, 118, 20], [162, 108, 22], [198, 118, 20]]) {
    rect(hx - w / 2 - 1, hy - 12, hx + w / 2 + 1, hy + 1, P.k); rect(hx - w / 2, hy - 11, hx + w / 2, hy, P.cartonL); rect(hx + 2, hy - 11, hx + w / 2, hy, P.carton); rect(hx - w / 2, hy, hx + w / 2, hy, P.cartonS);
    for (let x = hx - w / 2; x <= hx + w / 2; x += 2) pset(x, hy - 11, P.cartonS);
    rect(hx - 4, hy - 7, hx - 1, hy, P.cartonS); rect(hx + 4, hy - 8, hx + 6, hy - 6, P.l7);
    poligono([[hx - w / 2 - 3, hy - 11], [hx, hy - 21], [hx + w / 2 + 3, hy - 11]], P.k); poligono([[hx - w / 2 - 2, hy - 11], [hx, hy - 20], [hx, hy - 11]], P.papelT); poligono([[hx, hy - 20], [hx + w / 2 + 2, hy - 11], [hx, hy - 11]], P.papelTS);
    for (let i = 0; i < 6; i++) linea(hx - w / 2 + i * 3, hy - 11, hx - 1, hy - 19 + i, P.papelTS);
    rect(hx + 3, hy - 22, hx + 5, hy - 15, P.k); rect(hx + 4, hy - 21, hx + 4, hy - 16, P.barro);
    for (let i = 0; i < w + 6; i++) if (g_hoyB4(hx + w / 2 + i, hy + 1) < 0.6) g_hoyTinta(R, hx + w / 2 - 6 + i, hy + 1, P.k, 0.3); }
  disco(146, 130, 5, P.k); disco(146, 130, 4, P.piedra); disco(146, 130, 2, P.marS); pset(144, 128, P.piedraL); linea(141, 129, 141, 122, P.robleD); linea(151, 129, 151, 122, P.robleD); linea(141, 122, 151, 122, P.robleD);
  // lo de alrededor: el bote de cola y el haz de palitos (izquierda), el taco de notas con su lápiz (abajo a la izquierda),
  // la lupa y el imán rojo (derecha)
  rect(28, 86, 40, 104, P.k); rect(29, 87, 39, 104, P.hoja2); rect(29, 87, 31, 104, P.blanco); rect(37, 87, 39, 104, P.hojaPS); rect(31, 80, 37, 86, P.k); rect(32, 81, 36, 86, P.naranja); rect(33, 77, 35, 80, P.naranjaS); rect(31, 93, 37, 97, P.alf4);
  for (let y = 105; y <= 107; y++) for (let x = 28; x <= 44; x++) if (g_hoyB4(x, y) < 0.6) g_hoyTinta(R, x, y, P.k, 0.3);
  for (let i = 0; i < 9; i++) { const y = 100 + (i % 3) * 2 - (i > 5 ? 2 : 0), x = 50 + (i % 4); linea(x, y, x + 34, y + 3, P.k); linea(x, y - 1, x + 34, y + 2, i % 2 ? P.robleL : P.roble); }
  rect(64, 97, 66, 106, P.rojo);
  rect(14, 148, 52, 176, P.k); rect(15, 151, 51, 176, P.notaS); rect(15, 148, 51, 173, P.nota); rect(15, 148, 51, 149, P.notaL);
  R.anillo(33, 160, 8, P.lapiz); for (let a = 0; a < 6.28; a += 0.4) pset(Math.round(33 + Math.cos(a) * 8), Math.round(160 + Math.sin(a) * 8) - 2, P.lapiz); rect(31, 166, 35, 168, P.lapiz);
  linea(44, 178, 72, 158, P.k); linea(45, 178, 73, 158, P.amarillo); linea(44, 177, 72, 157, P.amarilloL); linea(72, 158, 75, 156, P.lonaS); pset(75, 156, P.k);
  // la lupa
  { const lx = 278, ly = 112; for (let i = 0; i < 18; i++) { R.linea(lx + 8 + i, ly + 8 + i * 0.6, lx + 8 + i, ly + 10 + i * 0.6, P.k); pset(lx + 9 + i, Math.round(ly + 9 + i * 0.6), P.nogalL); }
    disco(lx, ly, 12, P.k); disco(lx, ly, 11, P.latonS); disco(lx, ly, 10, P.laton); disco(lx, ly, 9, P.cristal); for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) if (i * i + j * j < 64 && (i + j + 40) % 4 === 0) pset(lx + i, ly + j, P.marB);
    rect(lx - 5, ly - 6, lx - 2, ly - 5, P.blanco); pset(lx - 6, ly - 4, P.blanco); }
  // el imán rojo de herradura
  { const mx = 286, my = 150; for (let a = 0; a <= Math.PI; a += 0.05) for (let r = 5; r <= 10; r++) pset(Math.round(mx + Math.cos(a) * r), Math.round(my + Math.sin(a) * r * 0.8), r === 10 ? P.k : r > 8 ? P.rojoS : r < 6 ? P.lana : P.rojo);
    rect(mx - 11, my - 12, mx - 4, my, P.k); rect(mx - 10, my - 11, mx - 5, my, P.rojo); rect(mx - 10, my - 11, mx - 9, my, P.lana); rect(mx - 10, my - 15, mx - 5, my - 12, P.metalL); rect(mx - 10, my - 15, mx - 5, my - 15, P.k);
    rect(mx + 4, my - 12, mx + 11, my, P.k); rect(mx + 5, my - 11, mx + 10, my, P.rojoS); rect(mx + 5, my - 15, mx + 10, my - 12, P.metal); rect(mx + 5, my - 15, mx + 10, my - 15, P.k); }
}

// la cruz de brazos iguales con los extremos ensanchados, girada a radianes, de color c
function g_hoyCruz(R, cx, cy, a, c, cs) {
  const ca = Math.cos(a), sa = Math.sin(a);
  for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const u = i * ca + j * sa, v = -i * sa + j * ca, au = Math.abs(u), av = Math.abs(v);
    const dentro = (av <= 0.8 + Math.max(0, au - 1.5) * 0.55 && au <= 4) || (au <= 0.8 + Math.max(0, av - 1.5) * 0.55 && av <= 4);
    if (dentro) R.pset(cx + i, cy + j, c); else if (cs && ((av <= 1.2 + Math.max(0, au - 1.5) * 0.55 && au <= 4.4) || (au <= 1.2 + Math.max(0, av - 1.5) * 0.55 && av <= 4.4))) R.pset(cx + i, cy + j + 1, cs); }
}

function g_hoyMaqueta(R, t, o = {}) {
  const P = G_HOY, { rect, pset, linea, disco } = R;
  g_hoyCapa(R, 'maqueta', () => g_hoyMaquetaFijo(R));
  g_hoyVistaCosta(R, t, ...G_HM.ventana);
  { const [a, b, c, d] = G_HM.ventana; R.rect(40, b, 42, d, P.mold); R.rect(40, b, 40, d, P.blanco); R.rect(a, 48, c, 50, P.mold); R.rect(a, 48, c, 48, P.blanco);
    for (let k = 0; k < 2; k++) for (let i = 0; i < 16 - k * 6; i++) { const x = a + 3 + k * 32 + i, y = b + 22 - i; if (y >= b && x <= c && (x < 40 || x > 42)) g_hoyTinta(R, x, y, P.blanco, 0.3); }
    for (let y = b - 6; y <= d + 3; y++) { const ond = Math.round(Math.sin(t * 1.4 + y * 0.12)); for (let i = 0; i < 9; i++) { const x = c + 5 + i + ond; pset(x, y, i === 0 || i === 8 ? P.cortinaS : (i + (y >> 2)) % 3 === 0 ? P.cortinaL : P.cortina); } } }
  // la banderita en su palillo, dentro de la empalizada
  g_hoyBanderita(R, t, 108, 120, 2);
  // los palitos de delante (por delante de las casitas), salvo los postes
  for (const p of g_hoyPalitos()) if (p.s >= 0) g_hoyPalito(R, p);
  // los dos postes de la entrada: gruesos, con la punta y su luz; el de la derecha es el postecito
  for (const [px, claro] of [[142, false], [178, true]]) { const y0 = 110, y1 = 143;
    rect(px - 5, y0, px + 4, y1, P.k); rect(px - 4, y0 + 1, px + 3, y1 - 1, claro ? P.robleB : P.robleL); rect(px - 4, y0 + 1, px - 3, y1 - 1, claro ? P.blanco : P.robleB); rect(px + 2, y0 + 1, px + 3, y1 - 1, P.roble);
    R.poligono([[px - 5, y0], [px, y0 - 6], [px + 4, y0]], P.k); R.poligono([[px - 4, y0], [px, y0 - 5], [px + 3, y0]], claro ? P.robleB : P.robleL);
    for (let y = y0 + 4; y < y1; y += 7) pset(px - 1, y, P.roble); for (let i = 1; i < 14; i++) if (g_hoyB4(px + 4 + i, y1 + 1) < 0.7) g_hoyTinta(R, px + 4 + i, y1 + Math.round(i * 0.25), P.k, 0.3); }
  // la talla: renglones de rayas talladas en el postecito, y las virutas al pie
  const ta = Math.max(0, Math.min(1, o.talla ?? 0)), filas = 4, hecho = ta * filas;
  for (let f = 0; f < filas; f++) { const n = Math.max(0, Math.min(1, hecho - f)); if (n <= 0) break; const y = 122 + f * 5, w = Math.round(6 * n);
    for (let i = 0; i < w; i++) { const x = 175 + i, v = h(x, f, 560); if (v < 0.2) continue; pset(x, y, P.robleD); pset(x, y + 1 + (v > 0.6 ? 1 : 0), v > 0.45 ? P.robleD : P.anL); pset(x, y + 2, P.blanco); } }
  for (let k = 0; k < Math.round(ta * 14); k++) { const x = 172 + Math.round(h(k, 1, 561) * 16), y = 143 + Math.round(h(k, 2, 561) * 6); pset(x, y, P.robleB); pset(x + 1, y, P.robleL); pset(x + 1, y - 1, P.robleB); }
  // la cruz: torcida (1), torcida al otro lado (2; la anterior raspada) y bien (3)
  const cr = Math.max(0, Math.min(3, Math.floor(o.cruz ?? 0)));
  if (cr >= 2) for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (h(i, j, 562) < 0.55) pset(178 + i, 116 + j, h(i, j, 563) < 0.5 ? P.robleL : P.robleB);
  if (cr > 0) g_hoyCruz(R, 178, 116, [0, 0.42, -0.36, 0][cr], P.robleD, P.blanco);
  // la navaja de tallar sobre la mesa: el mango de madera con su remache y la hoja con su brillo
  let navaja = null;
  if (o.navaja !== false) { const nx = 214, ny = 164; rect(nx - 1, ny - 3, nx + 15, ny + 2, P.k); rect(nx, ny - 2, nx + 14, ny + 1, P.nogalL); rect(nx, ny - 2, nx + 14, ny - 2, P.robleB); pset(nx + 3, ny, P.laton); pset(nx + 11, ny, P.laton);
    R.poligono([[nx + 15, ny - 3], [nx + 30, ny - 1], [nx + 15, ny + 2]], P.k); R.poligono([[nx + 16, ny - 2], [nx + 28, ny - 1], [nx + 16, ny + 1]], P.metal); linea(nx + 16, ny - 2, nx + 27, ny - 1, P.metalL);
    const br = (t * 0.5) % 1; if (br < 0.2) pset(nx + 16 + Math.round(br * 55), ny - 1, P.blanco);
    for (let i = 0; i < 30; i++) if (g_hoyB4(nx + i, ny + 3) < 0.6) g_hoyTinta(R, nx + i, ny + 3, P.k, 0.3); navaja = [nx + 7, ny]; }
  // las motas en la luz de la ventana y el destello del imán
  g_hoyMotas(R, t, 40, 80, 200, 170, 18, 0.4, 1);
  if ((t % 3.2) < 0.25) { pset(280, 135, P.blanco); pset(279, 136, P.metalL); }
  return { navaja };
}

// LA MESA DE TRABAJO (general): lo fijo
const G_HT = { cx: 236, cy: 92, r: 36 };

// el corte de tronco: la corteza, la albura, el duramen, los anillos (los de 1587–1589 finísimos) y las grietas
function g_hoyTroncoAnillo(d) {
  // d: la distancia al centro en radios (0–1); devuelve el índice del anillo y si es de la banda fina
  const fina = d > 0.62 && d < 0.705;
  return { fina, k: fina ? Math.floor((d - 0.62) / 0.028) : Math.floor(d * 11) };
}

function g_hoyMesaFijo(R) {
  const P = G_HOY, { rect, pset, disco, linea, poligono } = R;
  for (let y = 0; y <= 20; y++) for (let x = 0; x < 320; x++) pset(x, y, y > 14 && g_hoyB4(x, y) < (y - 14) / 8 ? P.techoS : h(x >> 1, y, 571) < 0.04 ? P.techoS : P.techo);
  rect(0, 21, 319, 21, P.moldD); rect(0, 22, 319, 23, P.mold); for (let x = 0; x < 320; x++) pset(x, 24, (x & 3) < 2 ? P.mold : P.moldS); rect(0, 25, 319, 25, P.moldS); rect(0, 26, 319, 26, P.moldD);
  g_hoyPapel(R, 0, 27, 319, 113, (x, y) => x > 266 && y < 52);
  for (let x = 0; x < 320; x++) for (let y = 27; y < 31; y++) if (g_hoyB4(x, y) < (31 - y) / 5) g_hoyTinta(R, x, y, P.frisoD, 0.3);
  rect(0, 110, 319, 110, P.nogalL); rect(0, 111, 319, 112, P.nogal); rect(0, 113, 319, 113, P.nogalD);
  for (let y = 114; y <= 147; y++) for (let x = 0; x < 320; x++) { const j = x % 7; pset(x, y, j === 0 ? P.frisoD : j === 1 ? P.frisoL : h(x, y >> 2, 572) < 0.12 ? P.frisoS : (y - 114) > 30 ? P.frisoS : P.friso); }
  rect(0, 148, 319, 148, P.moldD); rect(0, 149, 319, 150, P.mold); rect(0, 151, 319, 151, P.moldS);
  g_hoyTablas(R, 0, 319, [152, 154, 157, 160, 164, 168, 173, 180], [P.roble, P.robleS, P.robleL, P.robleD], 3);
  // el borde de la alfombra trenzada que asoma
  for (let y = 166; y <= 179; y++) for (let x = 0; x <= 110; x++) { const d = Math.hypot((x + 30) / 140, (y - 182) / 16); if (d > 1) continue; const AL = [P.alf2, P.alf1, P.alf3, P.alf1, P.alf4, P.alf5, P.alf6], b = Math.floor(d * 6.9); pset(x, y, d > 0.96 ? P.alf2 : ((x >> 1) + y) & 1 && b % 2 ? g_hoyMez(AL[b], P.k, 0.18) : AL[b]); }
  // EL TABLERO DE HERRAMIENTAS (izquierda): agujeros, la barrena de Pressler, el calibre, la cinta métrica y una sierra
  { rect(0, 38, 26, 104, P.k); for (let y = 39; y <= 103; y++) for (let x = 0; x <= 25; x++) pset(x, y, (x % 4 === 2 && y % 4 === 2) ? P.corchoD : x === 25 ? P.corchoS : P.cartonL);
    linea(6, 44, 6, 82, P.metalS); linea(7, 44, 7, 82, P.metalL); rect(1, 44, 12, 46, P.l8); rect(1, 44, 12, 44, P.barroL);
    rect(14, 46, 15, 72, P.metal); rect(16, 46, 16, 72, P.metalS); rect(14, 46, 22, 48, P.metal); rect(14, 56, 20, 57, P.metalL); for (let y = 50; y < 72; y += 3) pset(15, y, P.k);
    disco(19, 84, 5, P.k); disco(19, 84, 4, P.amarillo); disco(19, 84, 1.5, P.k); rect(13, 87, 18, 88, P.amarilloL);
    poligono([[3, 90], [16, 90], [16, 100], [3, 96]], P.metalS); poligono([[4, 91], [15, 91], [15, 99], [4, 95]], P.metal); for (let x = 4; x < 15; x += 2) pset(x, 96 + Math.round((x - 4) * 0.3), P.k); rect(15, 89, 22, 94, P.nogal); }
  // EL GRABADO del pantano de cipreses: el agua quieta, los troncos con su base ancha y las rodillas, el musgo que cuelga
  { const x0 = 34, y0 = 36, x1 = 96, y1 = 82; rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, P.k); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, P.nogal); rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, P.nogalL); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, P.hojaP);
    R.recorte([x0 + 2, y0 + 2, x1 - 2, y1 - 2]);
    for (let y = y0 + 2; y <= y1 - 2; y++) for (let x = x0 + 2; x <= x1 - 2; x++) { const f = (y - y0) / (y1 - y0); pset(x, y, f > 0.66 ? (Math.sin(x * 0.7 + y * 2) > 0.8 ? P.cie3 : g_hoyMez(P.cortina, P.hojaP, 0.35)) : g_hoyMez(P.cie2, P.luzS, f * 0.6)); }
    for (const [tx, w, al] of [[x0 + 12, 4, 30], [x0 + 30, 5, 34], [x0 + 48, 3, 26], [x0 + 22, 2, 22]]) { const yb = y0 + 32;
      for (let y = yb - al; y <= yb; y++) { const ww = w + (y > yb - 6 ? (y - yb + 6) : 0); for (let x = tx - ww; x <= tx + ww; x++) pset(x, y, x < tx ? P.cortezaL : P.corteza); }
      for (let k = 0; k < 9; k++) { const cx = tx - 9 + Math.round(h(tx, k, 573) * 18), cy = yb - al + Math.round(h(k, tx, 574) * 8); disco(cx, cy, 3, h(k, 1, 575) < 0.5 ? P.hojaS : P.hoja); }
      for (let k = 0; k < 4; k++) { const mx = tx - 6 + k * 4; linea(mx, yb - al + 6, mx + 1, yb - al + 12 + (k % 2) * 3, P.piedraL); } }
    for (const kx of [x0 + 20, x0 + 40, x0 + 54]) { pset(kx, y0 + 33, P.cortezaL); pset(kx, y0 + 32, P.corteza); }
    R.recorte(null); }
  // el reloj de pared redondo (las agujas se mueven aparte) y la repisa con su helecho y unos frascos
  disco(112, 46, 9, P.k); disco(112, 46, 8, P.nogal); disco(112, 46, 6.5, P.hojaP); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(112 + Math.cos(a) * 5.5), Math.round(46 + Math.sin(a) * 5.5), P.k); }
  rect(102, 72, 124, 74, P.nogal); rect(102, 72, 124, 72, P.nogalL); rect(104, 75, 105, 79, P.nogalD); rect(121, 75, 122, 79, P.nogalD);
  rect(104, 64, 109, 71, P.k); rect(105, 65, 108, 71, P.cristal); rect(105, 68, 108, 71, P.arena); rect(111, 66, 115, 71, P.k); rect(112, 67, 114, 71, P.ladrillo);
  rect(116, 65, 123, 71, P.k); rect(117, 66, 122, 71, P.barro); for (let k = 0; k < 9; k++) { const a = -Math.PI + k * 0.4; linea(119, 65, Math.round(119 + Math.cos(a) * 8), Math.round(63 + Math.sin(a) * 6), k % 2 ? P.hoja : P.hojaS); }
  // LA LÁMINA DE LOS ANILLOS: un gráfico de barras (el ancho de cada anillo, año a año) con tres barras rojas muy bajas
  { const x0 = 124, y0 = 32, x1 = 186, y1 = 62; rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, P.k); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, P.nogalL); rect(x0, y0, x1, y1, P.hojaP);
    linea(x0 + 3, y1 - 4, x1 - 3, y1 - 4, P.lapiz); linea(x0 + 3, y0 + 3, x0 + 3, y1 - 4, P.lapiz);
    for (let i = 0; i < 18; i++) { const x = x0 + 6 + i * 3, seco = i >= 10 && i <= 12, al = seco ? 2 : 8 + Math.round(h(i, 1, 579) * 14); rect(x, y1 - 4 - al, x + 1, y1 - 5, seco ? P.rojo : P.l2); }
    for (let x = x0 + 5; x < x1 - 3; x += 2) pset(x, y1 - 17, P.hojaPS);
    rect(x0 + 34, y0 + 4, x0 + 42, y0 + 6, P.rojo); disco(x1 - 6, y0 + 6, 3, P.alb); R.anillo(x1 - 6, y0 + 6, 3, P.anL); R.anillo(x1 - 6, y0 + 6, 1, P.anL); }
  // LA MESA DE TRABAJO: patas, el faldón con dos cajones, la sombra y el tablero
  { const x0 = 128, x1 = 330;
    for (let y = 152; y <= 162; y++) for (let x = x0 - 4; x <= 319; x++) if (g_hoyB4(x, y) < 0.55 - (y - 152) * 0.04) g_hoyTinta(R, x, y, P.k, 0.3);
    for (const lx of [x0 + 2, 304]) { rect(lx - 1, 140, lx + 6, 158, P.k); rect(lx, 141, lx + 5, 158, P.robleS); rect(lx, 141, lx + 1, 158, P.roble); rect(lx - 1, 157, lx + 6, 158, P.robleD); }
    rect(x0, 138, 319, 148, P.k); rect(x0 + 1, 139, 319, 147, P.robleS); rect(x0 + 1, 139, 319, 139, P.roble);
    for (const dx of [150, 230]) { rect(dx, 141, dx + 40, 146, P.robleD); rect(dx + 1, 141, dx + 39, 145, P.roble); rect(dx + 1, 141, dx + 39, 141, P.robleL); rect(dx + 17, 143, dx + 23, 144, P.latonS); rect(dx + 18, 143, dx + 22, 143, P.laton); }
    rect(x0, 131, 319, 138, P.k); for (let x = x0 + 1; x <= 319; x++) { pset(x, 132, P.robleB); for (let y = 133; y <= 135; y++) pset(x, y, h(x >> 3, y, 576) < 0.2 ? P.robleL : P.roble); pset(x, 136, P.robleS); pset(x, 137, P.robleD); } }
  // lo de la mesa que no se mueve: los papeles con gráficas de puntos, la caja de testigos y el montón de revistas
  { rect(276, 128, 316, 132, P.k); rect(277, 128, 315, 131, P.hojaP); for (let x = 279; x < 314; x += 3) pset(x, 130 - ((x * 7) % 3), P.tinta); rect(277, 131, 315, 131, P.hojaPS); linea(279, 129, 312, 129, P.hojaPS); }
  { rect(140, 126, 150, 132, P.k); rect(141, 127, 149, 131, P.nogalL); for (let i = 0; i < 4; i++) rect(142, 128 + i, 148, 128 + i, i % 2 ? P.alb : P.albS); }
  // el soporte del tronco: dos cuñas de madera
  rect(214, 126, 224, 132, P.k); rect(215, 127, 223, 131, P.nogalL); rect(248, 126, 258, 132, P.k); rect(249, 127, 257, 131, P.nogalL); rect(215, 127, 223, 127, P.robleB); rect(249, 127, 257, 127, P.robleB);
  for (let x = 196; x < 280; x++) for (let y = 131; y <= 133; y++) if (g_hoyB4(x, y) < 0.5) g_hoyTinta(R, x, y, P.k, 0.3);
}

// el tronco: se pinta en cada fotograma porque la banda fina late y las grietas se abren
function g_hoyTronco(R, t, an) {
  const P = G_HOY, { pset, disco } = R, { cx, cy, r } = G_HT;
  const brillo = an > 0 ? an * (0.75 + 0.25 * Math.sin(t * 5)) : 0, abre = an > 0.5 ? Math.min(1, (an - 0.5) * 3) : 0;
  disco(cx, cy, r + 1, P.k);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    const a = Math.atan2(j, i), w = 1 + Math.sin(a * 3 + 1) * 0.025 + Math.sin(a * 7) * 0.012, d = Math.hypot(i, j) / (r * w);
    if (d > 1) continue; const x = cx + i, y = cy + j;
    let c;
    if (d > 0.9) c = h(Math.round(a * 30), Math.round(d * 20), 577) < 0.3 ? P.cortezaS : d > 0.96 ? P.cortezaS : (Math.round(a * 30) & 1) ? P.corteza : P.cortezaL;
    else { const { fina, k } = g_hoyTroncoAnillo(d), frac = fina ? ((d - 0.62) / 0.028) % 1 : (d * 11) % 1, base = d > 0.76 ? [P.alb, P.albS] : [P.dur, P.durS];
      c = fina ? (frac > 0.5 ? P.anL : P.durS) : frac > 0.72 ? P.anL : frac > 0.55 ? base[1] : base[0];
      if (fina && brillo > 0 && g_hoyB4(x, y) < brillo) c = frac > 0.55 ? P.anilloB2 : P.anilloB;
      if (h(x >> 1, y, 578) < 0.03) c = g_hoyMez(c, P.k, 0.1);
      // la luz del flexo desde arriba a la derecha
      if (i - j > r * 0.9 && g_hoyB4(x, y) < 0.3) c = g_hoyMez(c, P.luz, 0.25); else if (j - i > r * 1.0 && g_hoyB4(x, y) < 0.35) c = g_hoyMez(c, P.k, 0.15); }
    pset(x, y, c); }
  disco(cx - 1, cy + 1, 1.5, P.durS); pset(cx - 1, cy, P.anL);
  // las grietas de secado que ya estaban, y la nueva que se abre con el crujido
  const grieta = (a0, l0, l1, ancho) => { for (let s = l0; s <= l1; s += 0.5) { const a = a0 + Math.sin(s * 0.4) * 0.05, x = Math.round(cx + Math.cos(a) * s), y = Math.round(cy + Math.sin(a) * s); pset(x, y, P.cortezaS); if (ancho > 0 && s < l1 - 3) pset(x + 1, y, P.k); } };
  grieta(-2.2, r * 0.75, r * 0.98, 0); grieta(0.5, r * 0.82, r * 0.98, 0); grieta(2.6, r * 0.7, r * 0.98, 1);
  if (abre > 0) grieta(-0.55, r * (1 - abre * 0.5), r * 0.99, abre > 0.6 ? 1 : 0);
  // el brillo de cera del corte
  for (let i = 0; i < 9; i++) pset(cx - 22 + i, cy - 20 + Math.round(i * 0.3), P.albS);
  return { brillo, abre };
}

// la balanza de platillos de latón: el pie, la columna, el fiel con su aguja, la cruz que se inclina y los platillos con
// sus cadenitas; o.balanza -1…1 (-1: el platillo izquierdo abajo); devuelve dónde caen los platillos
function g_hoyBalanza(R, t, o) {
  const P = G_HOY, { rect, pset, linea, disco, poligono } = R, bx = 160, by = 132, fy = 78, L = 22;
  const inc = Math.max(-1, Math.min(1, o.balanza ?? 0)), a = -inc * 0.24 + Math.sin(t * 2.4) * 0.025 * (1 - Math.abs(inc) * 0.5);
  // el pie y la columna
  poligono([[bx - 12, by], [bx + 12, by], [bx + 8, by - 4], [bx - 8, by - 4]], P.k); poligono([[bx - 11, by - 1], [bx + 11, by - 1], [bx + 7, by - 3], [bx - 7, by - 3]], P.laton); linea(bx - 10, by - 1, bx + 10, by - 1, P.latonS);
  rect(bx - 2, fy, bx + 2, by - 4, P.k); rect(bx - 1, fy + 1, bx + 1, by - 4, P.laton); rect(bx - 1, fy + 1, bx - 1, by - 4, P.latonL); rect(bx - 3, by - 16, bx + 3, by - 14, P.latonS);
  // la cruz (el astil) que gira en el fiel, y la aguja
  const ex = Math.cos(a) * L, ey = Math.sin(a) * L, pL = [Math.round(bx - ex), Math.round(fy - ey)], pR = [Math.round(bx + ex), Math.round(fy + ey)];
  linea(pL[0], pL[1] - 1, pR[0], pR[1] - 1, P.k); linea(pL[0], pL[1], pR[0], pR[1], P.laton); linea(pL[0], pL[1] + 1, pR[0], pR[1] + 1, P.latonS);
  linea(bx, fy, Math.round(bx + Math.sin(a) * 10), Math.round(fy - Math.cos(a) * 10), P.k); disco(bx, fy, 2.5, P.k); disco(bx, fy, 1.6, P.latonL);
  for (const p of [pL, pR]) { disco(p[0], p[1], 1.5, P.latonS); }
  // los platillos colgados: tres cadenitas y el plato hondo
  const platos = [];
  for (const [p, lado] of [[pL, -1], [pR, 1]]) { const px = p[0], py = p[1] + 26;
    for (const dx of [-8, 0, 8]) for (let s = 0; s <= 24; s++) { const x = Math.round(px + dx * s / 24), y = p[1] + 1 + s; if (s % 2 === 0) pset(x, y, P.latonS); }
    poligono([[px - 10, py], [px + 10, py], [px + 7, py + 4], [px - 7, py + 4]], P.k); poligono([[px - 9, py + 1], [px + 9, py + 1], [px + 6, py + 3], [px - 6, py + 3]], P.laton); linea(px - 9, py, px + 9, py, P.latonL); pset(px - 5, py + 2, P.latonL);
    platos.push([px, py]); }
  // la espadita de juguete (hoja de plástico plateado, guarda dorada y pomo rojo) y la mazorca con sus hojas
  if (o.espada !== false) { const [px, py] = platos[0]; rect(px - 9, py - 3, px + 6, py - 1, P.k); rect(px - 8, py - 2, px + 2, py - 2, P.metalL); rect(px - 8, py - 1, px + 2, py - 1, P.metal); rect(px + 3, py - 5, px + 4, py + 1, P.laton); rect(px + 5, py - 2, px + 7, py - 2, P.nogal); disco(px + 8, py - 2, 1.5, P.rojo); pset(px - 9, py - 2, P.metalS); }
  if (o.mazorca !== false) { const [px, py] = platos[1];
    for (let i = -7; i <= 6; i++) for (let j = -3; j <= 0; j++) { const w = i < -4 ? 1 : i > 3 ? 1 : 2; if (j < -1 - w + 1) continue; pset(px + i, py - 1 + j, P.k); }
    for (let i = -6; i <= 5; i++) for (let j = -2; j <= -1; j++) pset(px + i, py - 1 + j, ((i + j) & 1) ? P.maiz : (j === -2 ? P.maizL : P.maizS));
    poligono([[px + 4, py - 3], [px + 10, py - 6], [px + 8, py - 1]], P.vaina); linea(px + 4, py - 2, px + 11, py - 5, P.vainaS); poligono([[px + 4, py - 1], [px + 11, py], [px + 6, py - 3]], P.vainaS); }
  return platos;
}

function g_hoyMesa(R, t, o = {}) {
  const P = G_HOY, { rect, pset, linea, disco, poligono } = R;
  g_hoyCapa(R, 'mesa', () => g_hoyMesaFijo(R));
  // las agujas del reloj (el segundero salta)
  { const s = Math.floor(t) % 60, a = s / 60 * Math.PI * 2 - Math.PI / 2; linea(112, 46, Math.round(112 + Math.cos(a) * 5), Math.round(46 + Math.sin(a) * 5), P.rojo); linea(112, 46, 115, 44, P.k); linea(112, 46, 112, 42, P.k); pset(112, 46, P.laton); }
  // el cono de luz del flexo en la pared y la mesa (se pinta antes que el tronco)
  for (let y = 60; y <= 137; y++) { const u = (y - 60) / 77, xa = Math.round(280 - u * 26 - u * u * 60), xb = Math.round(290 + u * 6); for (let x = xa; x <= xb; x++) if (g_hoyB4(x, y) < 0.35 + 0.15 * Math.sin(t * 0.5)) g_hoyTinta(R, x, y, P.luz, 0.22); }
  const tr = g_hoyTronco(R, t, Math.max(0, Math.min(1, o.anillos ?? 0)));
  const platos = g_hoyBalanza(R, t, o);
  // la revista: cerrada en su montón (la portada lisa con una banda y un grabado de anillos) o abierta en blanco
  let revista = [276, 116, 306, 128];
  if (!(o.revista >= 1)) { rect(276, 116, 306, 128, P.k); rect(277, 125, 305, 127, P.hojaPS); rect(277, 117, 305, 124, P.rev); rect(277, 117, 305, 117, P.revL); rect(280, 119, 294, 119, P.blanco); R.anillo(299, 121, 2, P.revL); rect(277, 126, 305, 126, P.l1); }
  else { // abierta, de pie contra el montón de papeles: la página izquierda con renglones y la derecha EN BLANCO
    rect(262, 108, 310, 131, P.k); rect(263, 109, 285, 130, P.hojaP); rect(287, 109, 309, 130, P.blanco); rect(286, 109, 286, 130, P.hojaPS);
    for (let y = 112; y < 128; y += 2) linea(266, y, 282 - (y % 6 === 0 ? 4 : 0), y, P.hojaPS); rect(266, 112, 282, 113, P.rev);
    for (let x = 290; x <= 306; x += 2) { pset(x, 112, P.hojaPS); pset(x, 127, P.hojaPS); } for (let y = 112; y <= 127; y += 2) { pset(290, y, P.hojaPS); pset(306, y, P.hojaPS); }
    revista = [262, 108, 310, 131]; }
  // la taza de café que humea, y la lupa grande sobre la mesa
  { const tx = 184, ty = 131; rect(tx - 4, ty - 7, tx + 3, ty, P.k); rect(tx - 3, ty - 6, tx + 2, ty, P.alf4); rect(tx - 3, ty - 6, tx - 2, ty, P.alf5); rect(tx - 3, ty - 6, tx + 2, ty - 6, P.nogalS); pset(tx + 4, ty - 4, P.k); pset(tx + 4, ty - 3, P.k); pset(tx + 5, ty - 4, P.k);
    for (let k = 0; k < 2; k++) for (let i = 0; i < 12; i++) { const yy = ty - 8 - i, xx = tx - 2 + k * 2 + Math.round(Math.sin(i * 0.45 - t * 1.8 - k * 2.5) * (1 + i * 0.12)); if (g_hoyB4(xx, yy) < 0.85 - i * 0.07) pset(xx, yy, i < 5 ? P.blanco : P.nubeS); } }
  { const lx = 206, ly = 134; linea(lx - 18, ly + 1, lx - 7, ly, P.k); linea(lx - 18, ly, lx - 7, ly - 1, P.nogalL); for (let i = -7; i <= 7; i++) { pset(lx + i, ly - 2 + (Math.abs(i) > 5 ? 1 : 0), P.k); pset(lx + i, ly + 1 - (Math.abs(i) > 5 ? 1 : 0), P.k); if (Math.abs(i) < 6) { pset(lx + i, ly - 1, P.laton); pset(lx + i, ly, P.cristal); } } if ((t % 4) < 0.3) pset(lx - 2, ly, P.blanco); }
  // el flexo: la pinza en el borde, los dos brazos, la cabeza y su bombilla
  { rect(311, 128, 319, 140, P.k); rect(312, 129, 318, 139, P.metalS); rect(312, 129, 318, 129, P.metalL); const b1 = [315, 128], b2 = [304, 74], cab = [288, 58];
    for (const [p, q] of [[b1, b2], [b2, cab]]) { linea(p[0] + 1, p[1], q[0] + 1, q[1], P.k); linea(p[0], p[1], q[0], q[1], P.rojo); linea(p[0] - 1, p[1], q[0] - 1, q[1], P.rojoS); }
    disco(b2[0], b2[1], 2, P.k); pset(b2[0], b2[1], P.metalL); linea(310, 100, 297, 70, P.metalS);
    poligono([[cab[0] - 8, cab[1] - 4], [cab[0] + 4, cab[1] - 6], [cab[0] + 2, cab[1] + 4], [cab[0] - 12, cab[1] + 6]], P.k); poligono([[cab[0] - 7, cab[1] - 3], [cab[0] + 3, cab[1] - 5], [cab[0] + 1, cab[1] + 3], [cab[0] - 10, cab[1] + 5]], P.rojo); linea(cab[0] - 7, cab[1] - 3, cab[0] + 3, cab[1] - 5, P.lana);
    linea(cab[0] - 11, cab[1] + 6, cab[0] + 1, cab[1] + 4, P.luz); pset(cab[0] - 5, cab[1] + 6, P.blanco); pset(cab[0] - 4, cab[1] + 6, P.luz); }
  // las motas en la luz del flexo
  g_hoyMotas(R, t, 240, 64, 286, 128, 12, -0.4, 2);
  // con los anillos encendidos: la banderita con «1587» clavada en el tramo fino
  let banderin = null;
  if ((o.anillos ?? 0) > 0.3) { const u = Math.min(1, ((o.anillos ?? 0) - 0.3) / 0.25), px = 222, py = 62, fy = Math.round(py - 12 * u);
    linea(px, py + 11, px, fy, P.k); rect(px - 23, fy - 1, px - 1, fy + 7, P.k); rect(px - 22, fy, px - 2, fy + 6, P.blanco); R.numero('1587', px - 12, fy + 6, { centro: true }); banderin = [px, py + 11]; }
  // un crujido: dos astillitas que saltan cuando la grieta se abre
  if (tr.abre > 0 && tr.abre < 1) for (let k = 0; k < 3; k++) { const v = tr.abre, x = Math.round(G_HT.cx + 18 + k * 3 + v * 6), y = Math.round(G_HT.cy - 20 - v * 8 + k * 2); pset(x, y, P.alb); }
  return { platos, revista, banderin, anillos: [G_HT.cx + Math.round(G_HT.r * 0.66 * 0.6), G_HT.cy - Math.round(G_HT.r * 0.66 * 0.8)] };
}

// lo de delante en la mesa: un taburete de madera abajo a la izquierda, fuera de libre
function g_hoyMesaDelante(R, t) {
  const P = G_HOY, { rect, pset } = R;
  rect(0, 160, 24, 165, P.k); rect(0, 161, 23, 164, P.roble); rect(0, 161, 23, 161, P.robleB); rect(0, 164, 23, 164, P.robleS);
  for (const lx of [2, 18]) { rect(lx, 165, lx + 4, 179, P.k); rect(lx + 1, 165, lx + 3, 179, P.robleS); rect(lx + 1, 165, lx + 1, 179, P.roble); }
  rect(4, 172, 19, 173, P.robleD);
  return {};
}

// LAS PIEDRAS TALLADAS (cámara 'piedras'): lo fijo
const G_HP = [[56, 54, 60], [126, 58, 68], [196, 54, 62], [264, 52, 58]];

function g_hoyPiedrasFijo(R) {
  const P = G_HOY, { rect, pset, disco, linea } = R;
  g_hoyPapel(R, 0, 0, 319, 131, (x, y) => (y < 22 && x < 180) || (x > 272 && y < 50));
  // la luz de la lámpara de abajo que sube por la pared, y la sombra de la balda
  for (let y = 60; y < 132; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 200, (y - 140) / 70); if (d < 1 && g_hoyB4(x, y) < (1 - d) * 0.7) g_hoyTinta(R, x, y, P.luz, 0.2); }
  // la balda de nogal con su canto y las escuadras de latón
  rect(0, 132, 319, 140, P.k); for (let x = 0; x < 320; x++) { pset(x, 133, P.nogalL); for (let y = 134; y <= 136; y++) pset(x, y, h(x >> 3, y, 581) < 0.25 ? P.nogalL : P.nogal); pset(x, 137, P.nogalS); pset(x, 138, P.nogalS); pset(x, 139, P.nogalD); }
  for (const ex of [30, 160, 290]) { rect(ex - 1, 141, ex + 2, 152, P.k); rect(ex, 141, ex + 1, 151, P.latonS); linea(ex - 10, 141, ex, 151, P.latonS); pset(ex - 10, 141, P.laton); }
  for (let y = 141; y < 147; y++) for (let x = 0; x < 320; x++) if (g_hoyB4(x, y) < (147 - y) / 7) g_hoyTinta(R, x, y, P.k, 0.35);
  // la balda baja: cajas de archivo con su etiqueta (una piedrecita y rayas, sin cifras), libros tumbados y la lámpara de mesa con su luz
  for (let y = 141; y <= 179; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 9 === 0 ? P.frisoD : h(x, y >> 2, 583) < 0.15 ? P.frisoS : P.friso);
  for (let y = 147; y < 152; y++) for (let x = 0; x < 320; x++) if (g_hoyB4(x, y) < (152 - y) / 6) g_hoyTinta(R, x, y, P.k, 0.3);
  for (const [bx, w, n] of [[40, 46, 4], [92, 42, 7], [196, 48, 2]]) { rect(bx, 154, bx + w, 179, P.k); rect(bx + 1, 155, bx + w - 1, 179, P.cartonL); rect(bx + 1, 155, bx + w - 1, 156, P.blanco); rect(bx + w - 4, 157, bx + w - 1, 179, P.carton);
    rect(bx + 8, 162, bx + w - 10, 170, P.k); rect(bx + 9, 163, bx + w - 11, 169, P.hojaP);
    { const mx = bx + Math.round(w / 2) - 6; disco(mx, 166, 2, P.piedraS); pset(mx - 1, 165, P.piedraL); linea(mx + 4, 165, mx + 4 + n, 165, P.lapiz); linea(mx + 4, 167, mx + 10 - (n & 3), 167, P.hojaPS); }
    disco(bx + 4, 175, 1.5, P.cartonS); }
  for (let j = 0; j < 4; j++) { const c = [P.l2, P.l1, P.l4, P.l6][j]; rect(140, 175 - j * 5, 186 - j * 3, 179 - j * 5, P.k); rect(141, 176 - j * 5, 185 - j * 3, 178 - j * 5, c); rect(183 - j * 3, 176 - j * 5, 185 - j * 3, 178 - j * 5, P.hojaPS); }
  // la lámpara de mesa de la balda baja (pantalla verde de banquero)
  rect(262, 168, 266, 179, P.latonS); rect(254, 177, 274, 179, P.laton); R.poligono([[248, 168], [280, 168], [274, 158], [254, 158]], P.k); R.poligono([[249, 167], [279, 167], [273, 159], [255, 159]], P.hoja); linea(255, 159, 273, 159, P.hojaL); linea(249, 167, 279, 167, P.hojaS);
  for (let y = 168; y < 180; y++) for (let x = 236; x < 300; x++) { const d = Math.hypot((x - 264) / 34, (y - 168) / 14); if (d < 1 && g_hoyB4(x, y) < (1 - d) * 0.8) g_hoyTinta(R, x, y, P.luz, 0.35); }
  // en la balda de arriba, entre las piedras: la tarjetita de museo con su cordel y su sello (sin cifras), un cepillo y una lupa de mano
  rect(84, 134, 104, 140, P.k); rect(85, 134, 103, 139, P.hojaP); rect(85, 139, 103, 139, P.hojaPS); disco(89, 136, 1.5, P.rojo); pset(88, 135, P.blanco); linea(93, 136, 101, 136, P.lapiz); linea(93, 138, 98, 138, P.hojaPS);
  linea(84, 135, 80, 131, P.lana); linea(80, 131, 78, 132, P.lana);
  // LA BALDA DE ARRIBA (y 46–50, sin pasar de x 268): libros de pie y tumbados, un bote de pinceles, una caja de muestras
  rect(0, 46, 268, 50, P.k); rect(0, 46, 267, 46, P.nogalL); rect(0, 47, 267, 49, P.nogal); rect(0, 49, 267, 49, P.nogalS);
  for (let y = 51; y < 55; y++) for (let x = 0; x < 268; x++) if (g_hoyB4(x, y) < (55 - y) / 5) g_hoyTinta(R, x, y, P.k, 0.3);
  for (const ex of [40, 230]) { rect(ex, 51, ex + 1, 58, P.latonS); linea(ex, 58, ex - 6, 51, P.latonS); }
  { let x = 4; const LIB = [P.l1, P.l2, P.l3, P.l4, P.l5, P.l6, P.l7, P.l8]; while (x < 70) { const w = 3 + Math.round(h(x, 1, 584) * 2), al = 12 + Math.round(h(x, 2, 584) * 8), c = LIB[Math.floor(h(x, 3, 584) * 8)]; rect(x, 46 - al, x + w, 45, P.k); rect(x + 1, 47 - al, x + w - 1, 45, c); pset(x + 1, 47 - al, g_hoyMez(c, P.blanco, 0.35)); rect(x + 1, 49 - al, x + w - 1, 49 - al, P.laton); x += w + 1; } }
  rect(84, 32, 96, 45, P.k); rect(85, 33, 95, 45, P.barro); rect(85, 33, 95, 34, P.barroL); for (let i = 0; i < 4; i++) { linea(87 + i * 2, 32, 85 + i * 3, 22 + (i & 1) * 3, P.nogalL); rect(84 + i * 3, 20 + (i & 1) * 3, 85 + i * 3, 22 + (i & 1) * 3, i & 1 ? P.amarillo : P.nogalD); }
  rect(108, 34, 150, 45, P.k); rect(109, 35, 149, 45, P.cartonL); rect(109, 35, 149, 36, P.blanco); for (let i = 0; i < 5; i++) { rect(112 + i * 7, 39, 116 + i * 7, 43, P.cartonS); disco(114 + i * 7, 41, 1.2, [P.piedra, P.alb, P.piedraS, P.rojo, P.arena][i]); }
  for (let j = 0; j < 3; j++) { const c = [P.l7, P.l3, P.l1][j]; rect(166, 42 - j * 4, 204 - j * 4, 45 - j * 4, P.k); rect(167, 43 - j * 4, 203 - j * 4, 44 - j * 4, c); }
  rect(218, 28, 236, 45, P.k); rect(219, 29, 235, 45, P.hojaP); rect(221, 31, 233, 41, P.piedra); for (let y = 33; y < 40; y += 2) linea(223, y, 231, y, P.piedraD); rect(219, 29, 235, 29, P.blanco);
  rect(160, 127, 172, 130, P.k); rect(161, 127, 171, 129, P.nogalL); for (let x = 161; x < 172; x += 2) { pset(x, 126, P.amarilloS); pset(x, 125, P.amarillo); }
  R.anillo(228, 125, 4, P.k); disco(228, 125, 3, P.cristal); pset(227, 124, P.blanco); linea(232, 128, 238, 131, P.nogal); linea(232, 129, 238, 132, P.k);
}
// una piedra tallada: la forma redondeada con su luz de arriba a la izquierda, el canto biselado, motas, poros y dos
// desconchones; los renglones de la inscripción como surcos de trazos rectos de distinto largo (se leen como renglones,
// nunca como letras); y las florituras (fl 0–1), cada vez más cargadas: colas en espiral al final de los renglones
// (desde 0), una orla con cuentas por dentro del borde (desde 0,15), volutas en las esquinas de arriba (desde 0,4) y una
// guirnalda ondulada abajo con una roseta arriba (desde 0,65); el tallado fresco va en surco oscuro con filo claro.
// k la semilla; (dx, dy) y lado (-1 izquierda, 1 derecha, 0 entera) para pintar solo una mitad desplazada; corte(y): x
// de la raja; inclina: la mitad se ladea
function g_hoyPiedra(R, cx, base, w, al, k, fl, lado = 0, corte = null, dx = 0, dy = 0, inclina = 0) {
  const P = G_HOY, { pset } = R, top = base - al, my = base - al / 2, TON = [P.piedraD, P.piedraS, P.piedra, P.piedraL];
  const FRESCO = hex('#363432'), FILO = hex('#d6d4cc');
  const dentro = (x, y) => { if (y > base) return false; const u = (x - cx) / (w / 2), v = (y - my) / (al / 2), e = 1 + Math.sin(Math.atan2(v, u) * 5 + k) * 0.05; return Math.pow(Math.abs(u), 2.4) + Math.pow(Math.abs(v), 2.4) < e; };
  const mio = (x, y) => lado === 0 || (lado < 0 ? x < corte(y) : x >= corte(y));
  const put = (x, y, c) => { if (!mio(x, y)) return; pset(x + dx, y + dy + Math.round(inclina * (x - cx)), c); };
  for (let y = top - 2; y <= base; y++) for (let x = Math.round(cx - w / 2 - 2); x <= cx + w / 2 + 2; x++) {
    if (!dentro(x, y)) { if (dentro(x - 1, y) || dentro(x + 1, y) || dentro(x, y - 1) || dentro(x, y + 1)) put(x, y, P.k); continue; }
    const lx = (x - cx) / (w / 2), ly = (y - my) / (al / 2), rr = Math.pow(Math.abs(lx), 2.4) + Math.pow(Math.abs(ly), 2.4);
    // la luz: más clara arriba a la izquierda, el bisel del canto (claro arriba, oscuro abajo) y manchas grandes suaves
    let s = 2.1 - (lx * 0.55 + ly * 0.75) * 0.9 + (h(x >> 3, y >> 3, 595 + k) - 0.5) * 0.7;
    if (rr > 0.72) s += lx + ly < -0.2 ? 0.9 : lx + ly > 0.25 ? -1.1 : -0.3;
    let c = TON[Math.max(0, Math.min(3, Math.floor(s + g_hoyB4(x, y) - 0.5)))];
    const v = h(x, y, 590 + k); if (v < 0.025) c = P.piedraD; else if (v > 0.985) c = P.piedraL;
    if (lado !== 0 && Math.abs(x - corte(y)) < 2.5) c = Math.abs(x - corte(y)) < 1.5 ? P.yeso : P.yesoS;
    put(x, y, c); }
  // dos desconchones en el canto (una muesca clara con su sombra) y poros
  for (let i = 0; i < 2; i++) { const a = h(i, k, 596) * Math.PI * 2, ex = Math.round(cx + Math.cos(a) * (w / 2 - 3)), ey = Math.round(my + Math.sin(a) * (al / 2 - 3));
    if (dentro(ex, ey)) { put(ex, ey, P.piedraL); put(ex + 1, ey, P.piedraL); put(ex, ey + 1, P.piedraS); put(ex + 1, ey + 1, P.piedraD); } }
  // el surco: el trazo oscuro y su filo claro abajo a la derecha (lo de las florituras, más fresco)
  const hecho = new Set();
  const surco = (x, y, fresco = false) => { x = Math.round(x); y = Math.round(y); if (!dentro(x, y)) return; hecho.add(x * 512 + y); put(x, y, fresco ? FRESCO : P.piedraD);
    if (dentro(x + 1, y + 1) && !hecho.has((x + 1) * 512 + y + 1)) put(x + 1, y + 1, fresco ? FILO : P.piedraL); };
  const grueso = (x, y) => { surco(x, y, true); surco(x + 1, y, true); };
  const ancho = (y) => { let a = 0; while (a < w && dentro(cx + a + 1, y) && dentro(cx - a - 1, y)) a++; return a; };
  // los renglones: trazos rectos de 2 a 9 px con huecos, como una inscripción vista de lejos
  const filas = []; for (let ry = top + 12; ry < base - 9; ry += 7) filas.push(ry);
  filas.forEach((ry, i) => { const a = ancho(ry) - 7, xl = cx - a, xr = cx + a - 4; let x = xl;
    while (x < xr) { const l = 2 + Math.floor(h(x, ry, 591 + k) * 8), fin = Math.min(x + l, xr); for (let xx = x; xx <= fin; xx++) surco(xx, ry); x = fin + 3 + (h(x, ry, 592 + k) < 0.2 ? 2 : 0); }
    // la cola: sale del último trazo y se enrosca hacia arriba; crece con fl y llega a más renglones
    const ncol = Math.ceil(filas.length * Math.min(1, fl * 1.8)), lc = Math.round(Math.min(1, fl * 1.6) * 20);
    if (fl > 0 && i < ncol && (i % 2 === 0 || fl > 0.7)) for (let s = 0; s <= lc; s++) { const an = Math.PI / 2 - s * 0.42, r = Math.max(0.6, 3.4 - s * 0.13); surco(xr + 2 + Math.cos(an) * r + s * 0.12, ry - 3 + Math.sin(an) * r, true); }
    // y un rasgo de entrada que baja en gancho al principio del renglón
    if (fl > 0.3 && i < ncol) for (let s = 0; s < 6; s++) surco(xl - 1 - Math.round(Math.sin(s * 0.6) * 2), ry + s - 2, true); });
  // la orla: una línea por dentro del borde que se va cerrando, con cuentas cada pocos píxeles
  if (fl > 0.15) { const u = Math.min(1, (fl - 0.15) / 0.45), n = Math.round(u * 260), sg = (q) => Math.sign(q) * Math.pow(Math.abs(q), 2 / 2.4);
    for (let i = 0; i <= n; i++) { const a = -Math.PI * 0.75 + i / 260 * Math.PI * 2, px = cx + sg(Math.cos(a)) * (w / 2 - 4.5), py = my + sg(Math.sin(a)) * (al / 2 - 4.5);
      surco(px, py, true); if (fl > 0.45 && i % 14 === 7) { surco(px - 1, py - 1, true); surco(px + 1, py - 1, true); surco(px, py - 2, true); } } }
  // las volutas de las esquinas de arriba
  if (fl > 0.4) { const u = Math.min(1, (fl - 0.4) / 0.3); for (const sd of [-1, 1]) { const sx = cx + sd * (w / 2 - 14), sy = top + 12;
    for (let s = 0; s < 40 * u; s++) { const an = s * 0.33 * sd, r = 7 - s * 0.16; grueso(sx + Math.cos(an) * r, sy + Math.sin(an) * r * 0.85); } } }
  // la guirnalda de abajo y la roseta de arriba, en el centro
  if (fl > 0.65) { const u = Math.min(1, (fl - 0.65) / 0.3), a = ancho(base - 6) - 6;
    for (let x = cx - a; x <= cx - a + 2 * a * u; x++) grueso(x, base - 7 + Math.round(Math.sin(x * 0.5) * 2));
    if (fl > 0.8) { for (let p = 0; p < 8; p++) { const an = p * Math.PI / 4; for (let s = 2; s <= (p % 2 ? 3 : 5); s++) surco(cx + Math.cos(an) * s, top + 9 + Math.sin(an) * s * 0.8, true); } surco(cx, top + 9, true); } }
}
function g_hoyPiedras(R, t, o = {}) {
  const P = G_HOY, { pset, linea } = R;
  g_hoyCapa(R, 'piedras', () => g_hoyPiedrasFijo(R));
  const fl = Math.max(0, Math.min(1, o.floritura ?? 0)), ro = Math.max(0, Math.min(1, o.rompe ?? 0));
  const piedras = [];
  for (let k = 0; k < 4; k++) { const [cx, w, al] = G_HP[k], base = 131, flk = Math.max(0, Math.min(1, fl * (0.55 + k * 0.25)));
    // la sombra en la balda y en la pared
    for (let i = 0; i < w + 8; i++) for (let j = 0; j < 2; j++) { const x = Math.round(cx - w / 2 + i + 2), y = base + 1 + j; if (g_hoyB4(x, y) < 0.6) g_hoyTinta(R, x, y, P.k, 0.35); }
    for (let j = 0; j < al - 6; j++) for (let i = 0; i < 4; i++) { const x = Math.round(cx + w / 2 + i - 1), y = base - j; if (g_hoyB4(x, y) < 0.5 - i * 0.1) g_hoyTinta(R, x, y, P.k, 0.25); }
    if (k === 3 && ro > 0) {
      // la raja que baja de arriba abajo y, después, las dos mitades que se separan y se inclinan: dentro, yeso
      const corte = (y) => cx + Math.round(Math.sin(y * 0.7) * 1.5 + Math.sin(y * 0.23) * 2), raja = Math.min(1, ro / 0.25), s = ro > 0.25 ? (ro - 0.25) / 0.75 : 0, e = 1 - (1 - s) * (1 - s);
      if (s === 0) { g_hoyPiedra(R, cx, base, w, al, k, flk); const top = base - al; for (let y = top; y <= top + Math.round(al * raja); y++) { pset(corte(y), y, P.k); pset(corte(y) + 1, y, P.yesoS); } }
      else { g_hoyPiedra(R, cx, base, w, al, k, flk, -1, corte, -Math.round(e * 7), Math.round(e * 1), -0.06 * e); g_hoyPiedra(R, cx, base, w, al, k, flk, 1, corte, Math.round(e * 8), Math.round(e * 1), 0.07 * e);
        // el polvo de yeso que sale de la raja y se posa, y las migas en la balda
        for (let i = 0; i < 26; i++) { const v = h(i, 1, 594), a = -Math.PI * v, r = 4 + e * (8 + h(i, 2, 594) * 18), x = Math.round(cx + Math.cos(a) * r * 1.2), y = Math.round(base - al * 0.5 + Math.sin(a) * r - e * 4 + h(i, 3, 594) * al * 0.6); if (g_hoyB4(x, y) < 0.9 - e * 0.6) pset(x, y, i % 3 ? P.yeso : P.yesoS); }
        for (let i = 0; i < Math.round(e * 12); i++) { const x = cx - 10 + Math.round(h(i, 4, 594) * 20), y = base - (i % 2); pset(x, y, P.yeso); if (i % 3 === 0) pset(x + 1, y, P.yesoS); } }
    } else g_hoyPiedra(R, cx, base, w, al, k, flk);
    piedras.push([cx, base - Math.round(al / 2)]); }
  // las motas y la arañita que baja y sube de su hilo
  g_hoyMotas(R, t, 0, 40, 320, 128, 16, 0, 3);
  { const ay = Math.round(60 + (Math.sin(t * 0.6) * 0.5 + 0.5) * 30); linea(18, 0, 18, ay - 2, P.hojaPS); pset(18, ay, P.k); pset(17, ay - 1, P.k); pset(19, ay - 1, P.k); pset(18, ay - 1, P.k); const p = Math.sin(t * 8) > 0 ? 1 : 0; pset(16, ay - p, P.k); pset(20, ay - p, P.k); pset(16, ay + 1 - p, P.k); pset(20, ay + 1 - p, P.k); }
  return { piedras };
}

// GLOBO, el fondo desenfocado (fijo, dentro de la capa): la viga del techo, el ventanal emplomado de la izquierda con su
// marco de piedra, el cielo y el jardín borrosos, la luz que entra en diagonal hacia la mesa, el aplique de latón del
// panel (x 84) y la librería de la derecha (x 236–319, y 46–126) con lomos de cuero, pergamino, rollos y una esfera
// armilar; todo de bordes tramados, como fuera de foco
function a_globoFondo(R) {
  const { rect, pset, linea } = R;
  // la viga del techo, oscura y tranquila (debajo del año y de Atom)
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) if (a_bay(x, y) < 0.95 - y * 0.05) pset(x, y, y > 13 ? a_C.robleS : a_C.robleD);
  // el ventanal: marco de piedra, dos luces con su parteluz, dos travesaños, vidrios de cielo y jardín y plomos en rombo
  const X0 = 6, X1 = 68, Y0 = 24, Y1 = 104, mull = [37], trav = [50, 78];
  for (let y = Y0 - 4; y <= Y1 + 5; y++) for (let x = X0 - 4; x <= X1 + 4; x++) {
    const e = Math.min(x - X0, X1 - x, y - Y0, Y1 - y);
    if (e < 0) { if (a_bay(x, y) < 0.85 + e * 0.18) pset(x, y, e > -2 ? a_C.piedraS : a_C.piedraD); continue; }
    const dm = Math.min(...mull.map((m) => Math.abs(x - m)), ...trav.map((m) => Math.abs(y - m)), e);
    const u = (y - Y0) / (Y1 - Y0), cielo = a_mezcla(hex('#cfe4ee'), hex('#f6ecd0'), u), verde = y > 86 + Math.sin(x * 0.3) * 3 ? a_mezcla(hex('#8aa870'), hex('#f0e4c4'), 0.45) : null;
    let c = verde && a_bay(x, y) < 0.7 ? verde : cielo;
    if (((x + y) & 7) === 0 || ((x - y) & 7) === 0) c = a_mezcla(c, a_C.plomo, a_bay(x, y) < 0.5 ? 0.35 : 0.15);
    if (dm < 1.5) c = a_C.piedra; else if (dm < 3 && a_bay(x, y) < 0.55) c = a_C.piedraL;
    pset(x, y, c); }
  rect(X0 - 5, Y1 + 5, X1 + 5, Y1 + 7, a_C.piedraL); for (let x = X0 - 5; x <= X1 + 5; x++) if (x % 2) pset(x, Y1 + 8, a_C.piedraS);
  // la luz del ventanal, que cruza en diagonal hasta la mesa (tramada y cálida)
  for (let y = Y1 + 9; y < 128; y++) { const d = (y - Y1) * 0.9; for (let x = Math.round(X0 + d); x <= Math.round(X1 + d); x++) if (x < 320 && a_bay(x, y) < 0.42) a_tine(R, x, y, hex('#f8e4b0'), 0.32); }
  // el aplique de latón con su vela, en el panel entre el ventanal y el globo (la llama va en el fotograma)
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j) / 14; if (d < 1 && a_bay(84 + i, 54 + j) > 0.35 + d * 0.65) a_tine(R, 84 + i, 54 + j, a_C.llamaL, 0.3); }
  rect(81, 60, 87, 72, a_C.latonS); rect(82, 61, 86, 71, a_C.laton); rect(82, 61, 82, 71, a_C.latonL); rect(79, 72, 89, 73, a_C.latonS); rect(83, 52, 85, 59, a_C.vela); pset(83, 52, C.blanco);
  // la librería de la derecha: estantes con lomos de cuero, pergaminos atados, rollos y una esfera armilar arriba
  const LX = 236; for (let y = 44; y < 127; y++) for (let x = LX; x < 320; x++) if (a_bay(x, y) < (x < LX + 2 ? 0.5 : 0.85)) pset(x, y, x < LX + 3 ? a_C.robleS : a_C.robleD);
  const LOMOS = [hex('#7a3a2a'), hex('#3a5a3a'), hex('#3a4a6a'), hex('#a07a3a'), hex('#d8c8a0'), hex('#5a2a2a'), hex('#6a5a3a')];
  for (const [yb, n] of [[70, 0], [96, 1], [122, 2]]) {
    let x = LX + 5; while (x < 316) { const k = Math.floor(h(x, n, 990) * 7), w = 3 + Math.round(h(x, n, 991) * 3), alto = 13 + Math.round(h(x, n, 992) * 8), inclina = h(x, n, 993) > 0.88;
      if (h(x, n, 994) > 0.86) { // un hueco con un rollo de cartas tumbado
        for (let i = 0; i < 12; i++) for (let j = 0; j < 4; j++) if (a_bay(x + i, yb - 1 - j) < 0.8) pset(x + i, yb - 1 - j, j === 0 ? a_C.mapaS : a_C.mapaP); pset(x + 11, yb - 3, a_C.tinta); x += 14; continue; }
      for (let i = 0; i < w; i++) for (let j = 0; j < alto; j++) { const px = x + i + (inclina ? Math.round(j * 0.25) : 0), py = yb - 1 - j; if (px > 318) continue; const borde = i === 0 || j === alto - 1;
        if (a_bay(px, py) < (borde ? 0.5 : 0.9)) pset(px, py, i === 0 ? a_mezcla(LOMOS[k], C.blanco, 0.2) : j % 6 === 2 ? a_C.dorado : i === w - 1 ? a_mezcla(LOMOS[k], C.k, 0.35) : LOMOS[k]); }
      x += w + (inclina ? 3 : 0) + (h(x, n, 995) > 0.8 ? 1 : 0); }
    for (let x = LX; x < 320; x++) { pset(x, yb, a_C.robleL); pset(x, yb + 1, a_C.roble); if (a_bay(x, yb + 2) < 0.6) pset(x, yb + 2, a_C.robleS); } }
  // la esfera armilar en lo alto (los aros de latón, desenfocados), por debajo de la esquina de Atom
  for (let a = 0; a < Math.PI * 2; a += 0.08) { for (const [rx, ry] of [[6, 6], [6, 2], [2, 6]]) { const px = Math.round(258 + Math.cos(a) * rx), py = Math.round(56 + Math.sin(a) * ry); if (a_bay(px, py) < 0.75) pset(px, py, ry === 2 ? a_C.latonL : a_C.laton); } }
  rect(257, 62, 259, 69, a_C.latonS);
  // un tapiz de cuero repujado entre el globo y la librería (bandas doradas tramadas)
  for (let y = 30; y < 122; y++) for (let x = 222; x < 233; x++) if (a_bay(x, y) < 0.5 && (y % 9 < 2 || (x + y) % 5 === 0)) pset(x, y, y % 9 < 2 ? a_C.dorado : a_C.robleV);
}

// GLOBO, la vida del fondo: las motas de polvo que flotan en la luz del ventanal, la llama del aplique que tiembla y el
// reflejo de una nube que pasa por los vidrios
function a_globoVida(R, t) {
  for (let k = 0; k < 22; k++) { const u = (h(k, 1, 996) + t * (0.012 + h(k, 2, 996) * 0.02)) % 1, y = Math.round(108 + u * 20 - Math.sin(t * 0.5 + k) * 2), x = Math.round(14 + h(k, 3, 996) * 52 + (y - 104) * 0.9 + Math.sin(t * 0.7 + k * 2) * 3);
    if (Math.sin(t * 2.3 + k * 1.7) > -0.2) R.pset(x, y, Math.sin(t * 3 + k) > 0.5 ? C.blanco : hex('#f8e4b0')); }
  for (let k = 0; k < 14; k++) { const u = (h(k, 4, 996) + t * 0.01) % 1, y = Math.round(26 + u * 76), x = Math.round(10 + h(k, 5, 996) * 54 + Math.sin(t * 0.6 + k) * 2); if (Math.sin(t * 2 + k) > 0.2) R.pset(x, y, C.blanco); }
  { const nx = ((t * 3) % 120) - 30; for (let j = 0; j < 6; j++) for (let i = 0; i < 18; i++) { const x = Math.round(nx + i), y = 30 + j + Math.round(Math.sin(i * 0.4) * 1); if (x < 8 || x > 66 || Math.abs(x - 37) < 2 || (j + i) % 2 || Math.abs(i - 9) + j * 1.5 > 10) continue; R.pset(x, y, C.blanco); } }
  a_llama(R, 84, 52, t, 4);
}

// MUELLE, lo lejano (fijo, en la capa): campos de labor en las colinas de la derecha con setos y árboles, la torre del
// molino (las aspas giran en el fotograma), la torre de la iglesia de la ciudad y una fila de árboles en la orilla
function a_muelleLejos(R) {
  const { rect, pset } = R, nb = (c) => a_mezcla(c, a_C.cieloD, 0.4);
  // los campos: parcelas de dos tonos con sus setos oscuros
  for (let x = 140; x < 320; x++) { const top = Math.round(84 + Math.sin(x * 0.04) * 3);
    for (let y = top + 1; y < 90; y++) { const par = (Math.floor((x + (y - top) * 3) / 26) + Math.floor((y - top) / 2)) % 3; pset(x, y, nb(par === 0 ? a_C.hierbaL : par === 1 ? hex('#c8b86a') : a_C.hierba)); if ((x + (y - top) * 3) % 26 === 0) pset(x, y, nb(a_C.hierbaD)); }
    pset(x, top, nb(a_C.hierbaD)); }
  for (let k = 0; k < 16; k++) { const x = 142 + Math.round(h(k, 1, 997) * 170), top = Math.round(84 + Math.sin(x * 0.04) * 3); R.disco(x, top - 1, 1.6, nb(a_C.hierbaD)); pset(x - 1, top - 2, nb(a_C.hierbaS)); }
  // la torre del molino en la loma de la derecha
  rect(253, 72, 257, 82, nb(a_C.piedra)); rect(253, 72, 253, 82, nb(a_C.piedraL)); rect(252, 70, 258, 72, nb(a_C.tejaS)); pset(255, 78, nb(a_C.piedraD));
  // la torre de la iglesia de la ciudad, con su remate almenado
  { const X = 16; rect(X, 32, X + 8, 60, nb(a_C.piedra)); rect(X, 32, X + 1, 60, nb(a_C.piedraL)); rect(X + 7, 32, X + 8, 60, nb(a_C.piedraS)); for (let x = X; x <= X + 8; x += 2) pset(x, 31, nb(a_C.piedra));
    rect(X + 3, 38, X + 5, 42, nb(a_C.piedraD)); rect(X + 3, 48, X + 5, 50, nb(a_C.piedraD)); for (let y = 34; y < 60; y += 5) R.linea(X, y, X + 8, y, nb(a_C.piedraS)); }
  // una fila de árboles en la orilla, entre la ciudad y los campos
  for (let k = 0; k < 9; k++) { const x = 128 + k * 6 + Math.round(h(k, 2, 997) * 3), y = 85 + Math.round(h(k, 3, 997) * 2); R.disco(x, y, 2.5 + h(k, 4, 997), nb(a_C.hierbaS)); pset(x - 1, y - 2, nb(a_C.hierbaL)); }
}

// el agua que se mueve, como a_aguaVida, pero solo donde la máscara m deja agua (no pinta los baúles ni los barriles)
function a_aguaVidaM(R, t, x0, y0, x1, y1, mas, m) {
  for (let k = 0; k < mas; k++) { const f = h(k, 3, 932), y = Math.round(y0 + f ** 1.3 * (y1 - y0)), l = 2 + Math.round(f * 7), x = x0 + ((h(k, 4, 932) * (x1 - x0) + t * (2 + f * 6) * (k % 2 ? 1 : -0.6)) % (x1 - x0) + (x1 - x0)) % (x1 - x0);
    if (Math.sin(t * 2 + k) <= -0.3) continue; const c = Math.sin(t * 3 + k * 1.7) > 0.4 ? C.blanco : a_C.aguaL;
    for (let px = Math.round(x); px <= Math.round(Math.min(x1, x + l)); px++) if (!m || m[y * 320 + px]) R.pset(px, y, c); }
}

// MUELLE, la vida de lejos (cerca false, antes del barco grande) y del agua (cerca true, después): las aspas del molino que giran, humo en tres chimeneas de la ciudad, dos velas
// pequeñas que cruzan el horizonte, una barca de remos con dos remeros que cruza la bahía por delante del barco grande y
// dos patos que nadan junto al muelle (todo lo del agua, recortado a la máscara del agua)
function a_muelleVida(R, t, cerca = false) {
  const m = a_MASC.get('rk-muelle-agua'), put = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180 && m[y * 320 + x]) R.pset(x, y, c); };
  const nb = (c) => a_mezcla(c, a_C.cieloD, 0.35);
  if (!cerca) {
  for (let k = 0; k < 4; k++) { const a = t * 0.9 + k * Math.PI / 2; for (let r = 1; r < 8; r++) R.pset(Math.round(255 + Math.cos(a) * r), Math.round(71 + Math.sin(a) * r), nb(r > 3 ? a_C.lonaL : a_C.robleS)); }
  R.pset(255, 71, nb(a_C.robleD));
  for (const [x, y, k] of [[40, 58, 1], [70, 64, 2], [96, 72, 3]]) a_humo(R, x, y, t, k + 40, 14, 0.5, [hex('#dcdcdc'), hex('#b8bcc0')]);
  // las velas lejanas en el horizonte
  for (let k = 0; k < 2; k++) { const x = ((h(k, 1, 998) * 200 + t * (1.2 + k * 0.6)) % 220) + 140, y = 90 + k; if (x > 315) continue;
    for (let i = -3; i <= 3; i++) put(x + i, y, hex('#5a4a3a')); for (let j = 1; j < 6; j++) for (let i = -1; i <= 1 + (j > 2 ? 1 : 0); i++) put(x + i, y - j, j === 1 ? a_C.lonaD : nb(a_C.lonaL)); }
  return; }
  // la barca de remos que cruza la bahía (de izquierda a derecha, una vez cada 50 s)
  { const u = (t % 50) / 50, x = -30 + u * 290, y = 138 + Math.sin(t * 1.4) * 0.6, pala = Math.sin(t * 3.2);
    for (let j = 1; j < 4; j++) for (let i = -9; i <= 10; i += 1) if ((Math.round(x + i) + j) % 2 === 0) put(x + i + Math.sin(t * 3 + j), y + j, a_C.aguaD);
    for (let i = -9; i <= 10; i++) { const alto = Math.abs(i) > 7 ? 2 : 3; for (let j = 0; j < alto; j++) put(x + i, y - j, j === alto - 1 ? C.cascoKL : C.cascoK); }
    for (const [rx, c] of [[-4, hex('#7a3a3a')], [3, hex('#4a5a7a')]]) { const inc = Math.round(pala); put(x + rx + inc, y - 3, c); put(x + rx + inc, y - 4, c); put(x + rx + inc, y - 5, a_C.piel); put(x + rx, y - 3, c);
      put(x + rx - 2 - pala * 2, y + 1, a_C.robleL); put(x + rx - 1 - pala, y - 1, a_C.robleL); put(x + rx + pala, y - 3, a_C.robleL); } }
  // dos patos junto al muelle (nadan despacio de ida y vuelta y meten la cabeza)
  for (let k = 0; k < 2; k++) { const x = 40 + k * 12 + Math.sin(t * 0.12 + k) * 30, y = 143 + k, dir = Math.cos(t * 0.12 + k) > 0 ? 1 : -1, buceo = Math.sin(t * 0.8 + k * 3) > 0.85;
    put(x - 2, y + 1, a_C.aguaL); put(x + 3, y + 1, a_C.aguaL);
    for (let i = -2; i <= 2; i++) put(x + i, y, i === -2 * dir ? hex('#3a3a30') : hex('#7a6a50')); put(x, y - 1, hex('#7a6a50'));
    if (!buceo) { put(x + 2 * dir, y - 1, hex('#2a5a3a')); put(x + 2 * dir, y - 2, hex('#2a5a3a')); put(x + 3 * dir, y - 1, hex('#e0a030')); } }
}

// ARMADA, el paseo de ronda (fijo): losas grandes y gastadas en hileras que crecen hacia delante, con juntas de musgo,
// grietas, la franja del centro más clara de tanto pisarla, dos charcos que reflejan el cielo, un cubo con el atacador
// y la lanada junto a la tronera de la derecha y un rollo de mecha junto a la de la izquierda (de paseo a 179)
function a_losas(R, y0) {
  const { rect, pset, linea } = R; let y = y0 + 1, f = 0;
  const T = [a_C.piedra, a_mezcla(a_C.piedra, a_C.piedraL, 0.5), a_mezcla(a_C.piedra, a_C.piedraS, 0.45), a_mezcla(a_C.piedra, hex('#b0a080'), 0.35)];
  while (y < 180) { const alto = 5 + f * 2, L = 26 + f * 8, off = Math.round(h(f, 1, 987) * L);
    for (let n = -1; n * L + off - L < 320; n++) { const xa = Math.max(0, n * L + off - L), xb = Math.min(319, n * L + off - 2), y1 = Math.min(179, y + alto - 2); if (xb < xa) continue;
      const c = T[(n + f * 2 + 8) % 4];
      for (let py = y; py <= y1; py++) for (let px = xa; px <= xb; px++) { const centro = Math.abs(px - 150) < 70 ? 0.25 : 0, nn = h(px, py, 988);
        pset(px, py, py === y ? a_C.piedraL : px === xb ? a_C.piedraS : nn > 0.93 ? a_C.piedraS : nn < centro * 0.4 ? a_C.piedraL : c); }
      if (h(n, f, 989) > 0.6) { const gx = xa + Math.round(h(n, f, 990) * (xb - xa)); linea(gx, y + 1, gx + 3, y1, a_C.piedraD); }
      pset(xb + 1, y, hex('#6a7a4a')); if (h(n, f, 991) > 0.4) pset(xb + 1, y + 1, hex('#5a6a3a')); }
    for (let x = 0; x < 320; x++) { pset(x, Math.min(179, y + alto - 1), h(x >> 1, f, 992) > 0.8 ? hex('#5a6a3a') : a_C.piedraD); }
    y += alto; f++; }
  // los charcos con el cielo y un brillo
  for (const [cx, cy, rx, ry] of [[132, 172, 14, 3], [258, 166, 9, 2]]) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { if (i * i / (rx * rx) + j * j / (ry * ry) > 1) continue; pset(cx + i, cy + j, j < 0 ? a_C.cieloC : a_bay(cx + i, cy + j) < 0.5 ? a_C.cieloB : a_C.cieloC); if (j === -ry || Math.abs(i) === rx) pset(cx + i, cy + j, a_C.piedraD); }
  // el cubo de agua con el atacador y la lanada apoyados, junto a la tronera de la derecha
  { const x = 266, yb = 157; rect(x - 4, yb - 7, x + 4, yb, C.k); rect(x - 3, yb - 6, x + 3, yb - 1, a_C.robleM); rect(x - 3, yb - 6, x - 2, yb - 1, a_C.robleL); rect(x - 4, yb - 5, x + 4, yb - 5, a_C.plomo); rect(x - 4, yb - 2, x + 4, yb - 2, a_C.plomo); rect(x - 2, yb - 7, x + 2, yb - 7, a_C.aguaA);
    linea(x + 5, yb, x + 12, yb - 26, a_C.robleS); linea(x + 6, yb, x + 13, yb - 26, a_C.robleL); rect(x + 11, yb - 30, x + 14, yb - 26, hex('#5a4a3a'));
    linea(x + 9, yb, x + 15, yb - 22, a_C.robleS); R.disco(x + 15, yb - 23, 2, hex('#3a3430')); }
  // el rollo de mecha de cáñamo junto a la tronera de la izquierda
  for (let a = 0; a < Math.PI * 2; a += 0.15) for (const r of [2, 3.5]) pset(Math.round(96 + Math.cos(a) * r * 1.4), Math.round(156 + Math.sin(a) * r * 0.6), r > 3 ? a_C.cuerdaL : a_C.cuerda);
}

// HORIZONTE, la cima (fija, en la capa): matas de hierba de tres tonos, un sendero de tierra gastada que sube hacia la
// almenara, piedras de pedernal, dos tojos más, la pila de leña de la almenara (x 166–182) y el borde de creta que se
// desmorona; abajo a la derecha, las rocas del pie del acantilado en el agua
function a_horizonteCima(R) {
  const { rect, pset, linea } = R;
  // las matas: pinceladas verticales de luz y sombra
  for (let k = 0; k < 260; k++) { const x = Math.round(h(k, 1, 980) * 212), top = Math.round(154 + Math.sin(x * 0.05) * 1.5 + (x > 196 ? (x - 196) * 0.5 : 0)), y = top + 3 + Math.round(h(k, 2, 980) ** 0.8 * (176 - top)), a = 2 + Math.round(h(k, 3, 980) * 2);
    for (let j = 0; j < a; j++) pset(x + (j === a - 1 && k % 2 ? 1 : 0), y - j, j === a - 1 ? a_C.hierbaL : a_C.hierbaD); }
  // el sendero de tierra que sube en curva hacia la almenara
  for (let y = 158; y < 180; y++) { const u = (y - 158) / 22, cx = 182 - u * 70 - Math.sin(u * 3) * 8, w = 3 + u * 6;
    for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) { const e = Math.min(x - (cx - w), cx + w - x); if (e < 1.2 && a_bay(x, y) > 0.5) continue; pset(x, y, e < 2 ? hex('#9a8a62') : h(x, y, 981) > 0.85 ? hex('#a89a7a') : h(x, y, 982) > 0.8 ? a_C.cretaS : hex('#b8a47a')); } }
  // piedras de pedernal sueltas
  for (let k = 0; k < 14; k++) { const x = 6 + Math.round(h(k, 4, 980) * 196), y = 162 + Math.round(h(k, 5, 980) * 16); pset(x, y, a_C.piedraS); pset(x + 1, y, a_C.piedraL); pset(x, y + 1, a_C.piedraD); pset(x + 1, y + 1, a_C.piedra); }
  // dos tojos más, de tres tonos y con flores
  for (const [tx, ty, rx, ry] of [[74, 160, 11, 6], [100, 172, 8, 5]]) for (let j = -ry; j <= 1; j++) for (let i = -rx; i <= rx; i++) { if (i * i / (rx * rx) + j * j / (ry * ry) > 1) continue; const n = h(tx + i, ty + j, 983), lz = -i * 0.3 - j;
    pset(tx + i, ty + j, n > 0.78 ? (n > 0.92 ? hex('#fff0a0') : hex('#f0c830')) : lz > ry * 0.4 ? a_C.hierbaS : n > 0.4 ? a_C.hierbaD : hex('#24482a')); }
  // la pila de leña de la almenara: troncos apilados con sus cortes
  for (let f = 0; f < 3; f++) for (let i = 0; i < 4 - f; i++) { const x = 168 + i * 4 + f * 2, y = 158 - f * 3; R.disco(x, y, 1.8, a_C.robleS); pset(x, y, a_C.robleL); pset(x - 1, y - 1, a_C.estera); }
  linea(164, 160, 186, 160, a_C.robleD);
  // el borde de creta que se desmorona en la cima y las rocas del pie del acantilado
  for (let k = 0; k < 12; k++) { const x = 198 + k * 2, y = Math.round(154 + (x - 196) * 0.5) + 1 + (k % 3); pset(x, y, a_C.creta); pset(x + 1, y + 1, a_C.cretaS); }
  for (const [rx, ry, r] of [[272, 176, 4], [284, 179, 5], [266, 179, 3]]) { R.disco(rx, ry, r, a_C.piedraD); for (let i = -r + 1; i < r; i++) pset(rx + i, ry - r + 1 + Math.abs(i) * 0.3, a_C.piedraS); pset(rx - 1, ry - r + 1, a_C.cretaS); }
}

// HORIZONTE, la vida del mar y de la cima: el camino de brillos del sol en el agua, la sombra de dos nubes que corre por
// el mar, la espuma que rompe al pie del acantilado y en las rocas y las rachas de viento que peinan la hierba
function a_horizonteVida(R, t, hor) {
  for (let k = 0; k < 46; k++) { const f = h(k, 1, 984), y = Math.round(hor + 3 + f * f * 50), x = Math.round(70 + (h(k, 2, 984) - 0.5) * (8 + f * 40)); if (Math.sin(t * 4 + k * 2.3) > 0.1) { R.pset(x, y, C.blanco); if (f > 0.4) R.pset(x + 1, y, a_C.aguaL); } }
  for (let k = 0; k < 2; k++) { const cx = ((h(k, 3, 984) * 400 + t * (3 + k)) % 440) - 60, cy = hor + 14 + k * 22, rx = 30 + k * 10, ry = 3 + k * 2;
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const x = Math.round(cx + i), y = cy + j; if (x < 0 || x > 319 || i * i / (rx * rx) + j * j / (ry * ry) > 1 || a_bay(x, y) > 0.3) continue; if (x < 214 && y > 152) continue; R.pset(x, y, a_C.aguaB); } }
  // la espuma: a lo largo del pie de la cara de creta y alrededor de las rocas, con la ola que viene y va
  const ola = (Math.sin(t * 1.3) + 1) / 2;
  for (let i = 0; i < 40; i++) { const u = i / 40, x = Math.round(214 + u * 48 + 2 + ola * 3), y = Math.round(156 + u * 24 * (0.45 + u * 0.55)); if (h(i, Math.floor(t * 3), 985) > 0.3) R.pset(x, y, C.blanco); if (h(i, Math.floor(t * 3) + 1, 985) > 0.6) R.pset(x + 1 + Math.round(ola * 2), y, C.espuma); }
  for (const [rx, ry, r, k] of [[272, 176, 4, 0], [284, 179, 5, 1]]) { const sp = (Math.sin(t * 1.3 - k) + 1) / 2; for (let i = 0; i < 10; i++) { const a = Math.PI + i / 9 * Math.PI, rr = r + 1 + sp * 2; if (h(i, Math.floor(t * 4) + k, 986) > 0.35) R.pset(Math.round(rx + Math.cos(a) * rr), Math.round(ry + Math.sin(a) * rr * 0.7), C.blanco); } }
  // las rachas de viento que peinan la hierba de la cima
  const verdes = [a_C.hierba, a_C.hierbaS, a_C.hierbaD];
  for (let k = 0; k < 4; k++) { const x0 = ((t * 22 + k * 61) % 280) - 40, y = 160 + k * 4; for (let i = 0; i < 12; i++) { const x = Math.round(x0 + i), yy = y + (i > 6 ? 1 : 0); if (x < 0 || x > 196 || (i + k) % 3 === 0 || !verdes.includes(R.pget(x, yy))) continue; R.pset(x, yy, a_C.hierbaL); } }
}

// el cernícalo que se cierne con el viento sobre el borde del acantilado (se pinta después de los barcos ingleses)
function a_cernicalo(R, t) {
  { const x = Math.round(238 + Math.sin(t * 0.4) * 6), y = Math.round(136 + Math.sin(t * 0.9) * 2), a = Math.sin(t * 16) > 0 ? -1 : 0, c = hex('#8a5a32'), cS = hex('#4a3020');
    R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x, y + 1, cS); R.pset(x - 1, y + a, cS); R.pset(x - 2, y + a - 1, cS); R.pset(x + 2, y + a, cS); R.pset(x + 3, y + a - 1, cS); R.pset(x, y + 2, cS); }
}

// UN GALEÓN DE 1587 suelto: el del canon, el mismo de los decorados de mar, para cualquier escena (en el horizonte de
// un puerto, por una ventana, sobre un mapa grande, pensado en un bocadillo). x el centro, yw la flotación, s la escala
// (0,15–0,4 para uno pequeño: de 15 a 40 px de eslora y de alto; 1 = unos 100 px). Opciones de b_galeon: o.dir (1 la
// proa a la derecha), o.cab (cabeceo en radianes), o.velas 'llenas' | 'recogidas', o.pirata, o.noche, o.k (semilla); y
// además: o.luz 'dia' (por omisión) | 'tarde' | 'gris' | 'noche' | 'tormenta' (la luz de los decorados de mar),
// o.lejos 0–1 (lo vela hacia el color del mar lejano), o.cabecea (true: sube, baja y cabecea él solo con t) y o.espuma
// (true: la flotación con su espuma; o.marcha 0–1, la ola de proa y la estela). Solo usa pset y linea, así que respeta
// R.recorte (por una ventana, recorta antes). Devuelve { P(dx, dy), proa, popa, centro, escoben, tope } como b_galeon.
export function galeon(R, x, yw, s, t, o = {}) {
  const luz = B_LUZ[o.luz] ? o.luz : 'dia', L = b_pal(luz), tn0 = b_tinte(luz), lejos = b_01(o.lejos ?? 0);
  const tn = lejos > 0 ? (c) => b_mezcla(tn0(c), L.mar[0], lejos * 0.6) : tn0;
  const m = o.cabecea ? Math.sin(t * 1.3 + (o.k ?? 0)) : 0;
  const Bq = b_galeon(R, x, yw + m * 1.5 * s, s, t, { ...o, tn, cab: (o.cab ?? 0) + 0.06 * m, noche: o.noche ?? luz === 'noche' });
  if (o.espuma) b_flotacion(R, t, Bq, s, o.dir ?? 1, L.mar, b_01(o.marcha ?? 0));
  return Bq;
}

// el cielo fijo llega hasta hor + 3; cuando el balanceo baja el mar, lo que queda destapado debajo se rellena con la
// última fila de la calima del horizonte (si no, asoma el negro del búfer: la raya negra que cruzaba la cubierta)
function b_bajoHorizonte(R, hor, n = 12) { const B = R.buf, f = (hor + 2) * 320; for (let y = hor + 3; y < Math.min(180, hor + 3 + n); y++) B.copyWithin(y * 320, f, f + 320); }

// la zona de Atom en calma: devuelve hacia el cielo fijo F lo que las nubes hayan pintado encima, del todo en el
// recuadro de Atom (x ≥ 276, y < 46) y con un borde deshilachado de 20 px alrededor (que se lea como un claro entre las
// nubes y no como un recuadro); no baja de y 66 ni del final del cielo fijo (hor + 2)
function b_calmaAtom(R, F, hor) {
  const B = R.buf;
  for (let y = 0; y < Math.min(66, hor + 3); y++) for (let x = 250; x < 320; x++) { const dx = Math.max(0, 276 - x), dy = Math.max(0, y - 45), d = Math.hypot(dx, dy) + (h(x >> 2, y >> 2, 1020) - 0.5) * 9;
    const q = 1 - d / 20; if (q <= 0) continue; const i = y * 320 + x; if (q >= 1) B[i] = F[i]; else if (b_umbral(x, y) < q) B[i] = b_mezcla(B[i], F[i], 0.35 + q * 0.6); }
}

// ¿hay algo pintado en ese píxel de la capa? (para repintar solo encima de lo ya dibujado)
function c_pintado(R, x, y) { return R.pget(x, y) !== c_VACIO; }

// dónde está la pinaza del embarcadero según o.zarpa (0 amarrada, 1 junto a los barcos): [x, flotación, escala, zarpa]
function c_pinazaPos(o) {
  const z = Math.max(0, Math.min(1, o.zarpa ?? 0)), e = z * z * (3 - 2 * z);
  return [Math.round(272 - e * 120), Math.round(160 - e * 68), 1 - e * 0.76, z];
}

// el casco de la pinaza (tracas con sus juntas y clavos, la borda clara con su regala oscura, la cinta de verdín en la
// flotación y la sombra bajo la panza); x, wl: centro y flotación SIN cabeceo (lo suma aquí); xmin: no pinta a su
// izquierda (para repintarlo delante de los de a bordo sin morder a quien está en el embarcadero)
function c_pinazaCasco(R, x, wl, s, t, g, xmin = -1) {
  const P = c_P, L = Math.round(30 * s), H = Math.max(2, Math.round(9 * s)), bob = Math.round(Math.sin(t * 1.6) * s), tr = Math.max(2, Math.round(3 * s));
  wl += bob;
  for (let i = -L; i <= L; i++) { const xx = x + i; if (xx < xmin) continue;
    const u = i / L, top = wl - H + Math.round(Math.abs(u) ** 2.2 * -3 * s) + (u > 0.8 ? -Math.round(2 * s) : 0), bot = wl + Math.round((1 - Math.abs(u) ** 1.6) * 3 * s) + Math.round(3 * s), bv = wl + Math.round((1 - Math.abs(u) ** 1.6) * 3 * s);
    for (let y = top; y <= bot; y++) { const v = (y - top) / Math.max(1, bv - top), r = y - top;
      let c = r === 0 ? P.tablaD : v < 0.15 ? P.tablaL : v > 0.8 ? P.tablaD : (r % tr) === 0 ? P.tablaS : P.tabla;
      if (s > 0.6 && r > 1 && (r % tr) === 2 && ((i + 40) % 7) === 0) c = P.tablaD;            // los clavos de las tracas
      if (s > 0.6 && r > 0 && v < 0.8 && h(Math.floor((i + 40) / 11), r, 707) < 0.12 && h(i, r, 708) < 0.5) c = P.tablaS;   // vetas y manchas
      if (y >= wl - 1 && y <= wl) c = c_mezcla(c, P.verdeT, 0.55);                                // el verdín de la flotación
      if (y > wl) c = c_mezcla(c, P.aguaS, 0.4);
      R.pset(xx, y, g(c)); }
    if (s > 0.6 && ((i + 40) % 10) === 0 && i > -L + 2 && i < L - 2) R.pset(xx, top + 1, g(P.logD));   // los toletes de la borda
  }
}

// los cinco remos de la pinaza (rema: se mueven a compás; en reposo, dos recogidos sobre la borda, que solo se pintan
// detrás: con xmin, desde delante, no se pinta nada)
function c_pinazaRemos(R, x, wl, s, t, g, rema = false, xmin = -1) {
  const P = c_P, H = Math.max(2, Math.round(9 * s)), bob = Math.round(Math.sin(t * 1.6) * s);
  wl += bob;
  if (!rema) { if (xmin >= 0) return; const y = wl - H - 1; R.linea(x - Math.round(24 * s), y, x + Math.round(12 * s), y - Math.round(2 * s), g(P.tablaL)); R.linea(x - Math.round(20 * s), y + 1, x + Math.round(16 * s), y - Math.round(1 * s), g(P.tablaS)); R.rect(x + Math.round(12 * s), y - Math.round(3 * s), x + Math.round(16 * s), y - Math.round(2 * s), g(P.tablaL)); return; }
  for (let k = -2; k <= 2; k++) { const ox = x + Math.round(k * 9 * s); if (ox < xmin) continue; const a = rema ? Math.sin(t * 3 + k * 0.2) : 0.3, ex = ox + Math.round((-4 + a * 5) * s), ey = wl + Math.round((3 + (rema ? Math.cos(t * 3) * 2 : 1)) * s); R.linea(ox, wl - H + 1, ex, ey, g(P.tablaL)); if (s > 0.6) R.pset(ex, ey, g(P.tablaS)); }
}

// EL ATARDECER de la excavación: un pase por fotograma sobre lo ya pintado a la luz del día. Lo que no se ha movido
// (igual que el búfer fijo de día) toma su versión de tarde, hecha una vez: el cielo con la rampa del ocaso de los
// pueblos (d_rematar), el sol bajo y anaranjado sobre la otra orilla con su halo, y lo demás con el tono cálido de
// d_tonoPx; lo que se ha pintado en este fotograma (nubes, agua, gente, la criba) se tiñe con el mismo tono
const d_TARDES = new Map(), d_CALIDO = new Map();

// el mismo R, pero todo lo que pinta (colores fijos o de función) sale con el tono cálido de la tarde
function d_Rcalido(R) {
  const W = (c) => (typeof c === 'function' ? (...a) => d_calido(c(...a)) : d_calido(c)), Q = Object.create(R);
  Q.pset = (x, y, c) => R.pset(x, y, W(c)); Q.rect = (a, b, c, d, k) => R.rect(a, b, c, d, W(k)); Q.linea = (a, b, c, d, k) => R.linea(a, b, c, d, W(k));
  Q.poligono = (p, k) => R.poligono(p, W(k)); Q.disco = (x, y, r, k) => R.disco(x, y, r, W(k));
  return Q;
}

function d_calido(c) { let w = d_CALIDO.get(c); if (w === undefined) { w = d_tonoPx(c, 'tarde'); d_CALIDO.set(c, w); } return w; }

// el tono cálido a medias (la criba de cerca, a la sombra del roble: sin cielo, la tarde solo dora)
const d_SUAVE = new Map();

function d_suave(c) { let w = d_SUAVE.get(c); if (w === undefined) { w = d_mez(c, d_calido(c), 0.55); d_SUAVE.set(c, w); } return w; }

function d_atardecer(R, clave, cielo) {
  const dia = e_CAPAS.get(clave), B = R.buf, P = e_P;
  let T = d_TARDES.get(clave);
  if (!T) { T = new Uint32Array(57600);
    const S = new Set([P.sol, P.solH, P.solH2, P.cielo0, P.cielo1, P.cielo2, P.cielo3, P.cielo4, P.cielo5, P.cielo6, P.cielo7]), hor = e_GENEX.hor;
    const PAL = ['#3a3a78', '#544682', '#7a5288', '#a65e84', '#d0707a', '#ec8c6a', '#f6ae62', '#fac874'].map(hex), n = PAL.length - 1;
    for (let i = 0; i < 57600; i++) { const c = dia[i], x = i % 320, y = (i / 320) | 0;
      if (cielo && y < hor && S.has(c)) { const l = Math.min(1, (y + 4) / (hor - 6)) * n + Math.sin(x * 0.021 + y * 0.07) * 0.35 + (h(x >> 3, y >> 1, 702) - 0.5) * 0.4;
        T[i] = d_rampa(PAL, l - 0.5, x, y); continue; }
      T[i] = cielo ? d_calido(c) : d_suave(c); }
    // el sol bajo, a punto de tocar la otra orilla: núcleo claro, borde anaranjado y halo tramado (solo en el cielo)
    if (cielo) for (let y = 30; y < hor; y++) for (let x = 204; x < 262; x++) { const i = y * 320 + x; if (!S.has(dia[i])) continue; const d = Math.hypot(x + 0.5 - 232, y + 0.5 - 50) / 7;
      if (d < 0.75) T[i] = hex('#fff0b0'); else if (d < 1) T[i] = hex('#ffd070'); else if (d < 3.4 && d_um(x, y) < (3.4 - d) * 0.24) T[i] = d_mez(T[i], hex('#ff9a50'), 0.55); }
    d_TARDES.set(clave, T); }
  const W = cielo ? d_calido : d_suave;
  for (let i = 0; i < 57600; i++) { const c = B[i]; B[i] = c === dia[i] ? T[i] : W(c); }
}
