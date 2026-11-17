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
// o.encuadre (y o.camara). Lo de delante de los personajes va en puertoDelante (se llama después de los actores).
// Opciones de todo el grupo: o.luz 'dia' (por omisión) | 'tarde' (sol bajo, agua dorada) | 'gris' (noviembre, nubes
// bajas, agua de plomo).
//   'astillero': LA ISLA DE SPENCER, NUEVA ESCOCIA, 1861: una cala con playa de grava, bosque de abetos detrás, una
//     colina; en la grada de troncos, el casco del bergantín (canon, aún sin palos: las cuadernas a la vista en la popa,
//     la proa ya forrada), andamios, una sierra de foso con dos hombres, montones de tablas, humo de la caldera de vapor
//     de doblar madera, gaviotas, la marea. o.epoca 1861 (por omisión, en grada; o.bota 0–1: el casco se desliza por la
//     grada y entra en el agua con un chapoteo) | 1867 (VARADO tras la tormenta: el mismo barco ya con palos, escorado
//     sobre la playa en otra costa, un palo partido, las olas grises, gente pequeña con cuerdas). Devuelve suelo 158,
//     libre [30, 250], casco: [x0, y0, x1, y1], grada: [x, y]. Cámara 'popa': LA POPA de cerca, en un muelle de Nueva
//     York (1868): el espejo de popa del casco negro con su franja, el nombre pintado (la excepción de letras) que el
//     pintor (EL.pintorMC, lo pone la escena) tapa con blanco y reescribe: o.nombre 0 («Amazon») … 1 («Mary Celeste»,
//     se pinta letra a letra), una gaviota posada en el coronamiento que se lleva una gota en la cabeza (o.gota 0–1),
//     una escala de cuerda, el agua con reflejos. Devuelve suelo 172, libre [20, 120], nombre: [x0, y0, x1, y1] (dónde va
//     el rótulo), pintor: [x, y] (dónde se sube el pintor), gaviota: [x, y].
//   'muelle': EL MUELLE DEL EAST RIVER, NUEVA YORK, NOVIEMBRE DE 1872 (o.luz 'gris' por omisión aquí): adoquines mojados,
//     norays, el Mary Celeste amarrado de costado (canon, con todas sus velas recogidas), una CABRIA de madera (grúa de
//     tres patas con polea y aparejo) que baja barriles a la escotilla principal, filas de barriles (canon, roble blanco)
//     en el muelle, carros con caballos, almacenes de ladrillo detrás con grúas y otros mástiles, el humo de un vapor,
//     gaviotas, estibadores pequeños de fondo. o.carga 0–1: cuántos barriles quedan en el muelle (de muchos a ninguno);
//     o.rueda 0–1: EL GAG 3: el último barril se escapa rodando por el muelle de izquierda a derecha y rebota en un noray;
//     o.zarpa 0–1: el barco se separa del muelle y sale por la derecha con las velas izándose; o.barco 'mc' (por omisión)
//     | 'dg' (otro día: el Dei Gratia, canon, amarrado en su lugar, cargando barriles de petróleo de otra forma, más
//     oscuros). Devuelve suelo 160, libre [20, 200], escotilla: [x, y], barril: [x, y] (dónde está el que se escapa).
//     Cámara 'pasarela': LA PASARELA de cerca: la tabla que sube del muelle a la borda, la borda con su barandilla, el
//     costado negro; en el muelle, un banco y una farola de gas; deja sitio para que briggsMC, sarahMC con sophiaMC suban
//     y para abuelaMC con arthurMC en el muelle, diciendo adiós. Devuelve suelo 162, libre [10, 300], pasarela: [x0, y0,
//     x1, y1], borda: y (la altura de la cubierta, donde se ponen los que ya han subido).
//   'genova': EL PUERTO DE GÉNOVA, 1873: casas de colores en la ladera (ocres, rosas, verdes), un faro (la Lanterna), el
//     muelle de piedra con el Mary Celeste amarrado y los barriles descargados en filas; estibadores pequeños, un carro.
//     Devuelve suelo 160, libre [30, 260]. Cámara 'barriles': LOS BARRILES de cerca en el muelle: filas de roble blanco
//     y, en medio, los NUEVE de roble rojo (canon), con gotas que rezuman y un charquito que brilla; un inspector deja
//     una tiza de marca (lo pone la escena); o.vacios 0–1: los nueve se vuelven huecos al golpe (los aros sueltos, se ve
//     el interior oscuro). Devuelve suelo 172, libre [20, 300], nueve: [x0, y0, x1, y1].
const V_PUERTO = {
  astillero: { cam: 'popa', general: { col: ['#a8c8e0', '#8a7a62'], geo: { suelo: 158, libre: [30, 250], casco: [70, 80, 240, 150], grada: [150, 152] } }, popa: { col: ['#a8c8e0', '#2a4a64'], geo: { suelo: 172, libre: [20, 120], nombre: [150, 70, 260, 90], pintor: [140, 120], gaviota: [250, 50] } } },
  muelle: { cam: 'pasarela', general: { col: ['#9aa4b0', '#6a6458'], geo: { suelo: 160, libre: [20, 200], escotilla: [190, 110], barril: [80, 152] } }, pasarela: { col: ['#9aa4b0', '#6a6458'], geo: { suelo: 162, libre: [10, 300], pasarela: [120, 110, 200, 160], borda: 110 } } },
  genova: { cam: 'barriles', general: { col: ['#b8d8f0', '#a8946a'], geo: { suelo: 160, libre: [30, 260] } }, barriles: { col: ['#b8d8f0', '#a8946a'], geo: { suelo: 172, libre: [20, 300], nueve: [110, 110, 210, 160] } } },
};
export function puerto(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  return vista(R, t, o, V_PUERTO);
}
// lo de delante de los personajes en cada encuadre de puerto(); se llama después de los actores, con las mismas opciones
export function puertoDelante(R, t, o = {}) {
  return {};
}

// ── B · El Mary Celeste en el mar (y el mapa del viaje) ───────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en marDelante. Opciones de todo el grupo: o.luz 'gris' (por omisión: el
// Atlántico de diciembre, nubes bajas, mar de plomo con borreguitos) | 'dia' (sol entre nubes, mar azul) | 'tarde'
// (sol bajo, oro) | 'niebla' (todo velado, el horizonte se pierde).
//   'alta': ALTA MAR: el Mary Celeste (canon) navegando SOLO, de tres cuartos, dando BANDAZOS (o.bandazo 0–1: cuánto
//     guiña y se escora; las velas flamean y se hinchan a destiempo), con o.velas 'pocas' (por omisión: solo el foque y
//     la gavia, las demás recogidas o rotas) | 'todas'; olas con espuma que rompen en la proa, salpicaduras, el cielo con
//     nubes en tres capas que corren, una bandada de pardelas; nadie en cubierta. Devuelve suelo 180, libre [0, 0], barco:
//     [x, y] (el centro del casco). Cámara 'timon': LA POPA DESDE CUBIERTA: la rueda del timón en primer plano que gira
//     sola de un lado a otro (o.giro), la bitácora, la caseta del camarote con sus ventanillas, la estela, el mar detrás,
//     una cuerda que se balancea; nadie. Devuelve suelo 168, libre [20, 260], rueda: [x, y].
//   'encuentro': DESDE LA CUBIERTA DEL DEI GRATIA (canon, casco verde): en primer plano su borda y la jarcia a la
//     izquierda, el vigía arriba en la cofa (pequeño), y lejos, en el horizonte, el Mary Celeste dando bandazos (pequeño);
//     banderas de señales que suben por una driza (o.banderas 0–1, colores sin letras). Devuelve suelo 166, libre [40,
//     240], lejos: [x, y] (dónde está el Mary Celeste). Cámara 'catalejo': LO QUE SE VE POR EL CATALEJO: un círculo con su
//     borde negro y viñeta, dentro el Mary Celeste de cerca, la cubierta vacía, las escotillas abiertas, el timón suelto;
//     la imagen se mece con el oleaje (o.pulso). Devuelve circulo: [cx, cy, r].
//   'mapa': EL MAPA DEL VIAJE sobre la mesa de cartas (madera, compás de puntas, regla paralela, una lámpara de aceite):
//     una carta náutica antigua del Atlántico Norte en papel amarillento, con costas, rosa de los vientos y rumbos (sin
//     letras): Nueva York a la izquierda, las Azores en medio (Santa María marcada), Portugal y Gibraltar a la derecha,
//     Génova arriba a la derecha (el Mediterráneo). o.ruta 0–1: la línea de puntos del viaje del Mary Celeste que avanza
//     desde Nueva York; o.ruta2 0–1: la del Dei Gratia, ocho días detrás (otro color); o.deriva 0–1: desde Santa María,
//     una línea a trazos de nueve días SIN NADIE (con nueve marquitas, R.numero 1–9) hasta el punto del encuentro, con un
//     círculo. Devuelve santaMaria: [x, y], encuentro: [x, y], nuevaYork: [x, y], gibraltar: [x, y]. Cámara 'azores': las
//     Azores de cerca en la carta: la isla de Santa María con su contorno y sus montes en relieve, la marca del 25 y la
//     línea de la deriva que se aleja; el compás que mide (o.compas 0–1). Devuelve santaMaria: [x, y].
//   'bote': EL BOTE, de lejos y con respeto (o.luz 'niebla' por omisión aquí): mar ancho, la niebla; a la derecha el
//     Mary Celeste que se aleja con el viento (o.aleja 0–1: se va haciendo pequeño); a la izquierda, el bote salvavidas
//     con diez siluetas pequeñísimas y quietas (sin caras), un remo; entre los dos, el CABO que los unía (o.cabo 0–1:
//     tenso, luego se rompe y la punta cae al agua con un chapoteo). Nada de olas que se los traguen. Devuelve bote: [x,
//     y], barco: [x, y]. Cámara 'cabo': EL CABO de cerca en el agua: la cuerda tensa que vibra, se deshilacha (o.cabo) y
//     se parte; las dos puntas se separan y una se hunde; espuma, gotas. Devuelve rotura: [x, y].
const V_MAR = {
  alta: { cam: 'timon', general: { col: ['#8a98a8', '#2a4a64'], geo: { suelo: 180, libre: [0, 0], barco: [160, 110] } }, timon: { col: ['#8a98a8', '#c8a878'], geo: { suelo: 168, libre: [20, 260], rueda: [160, 120] } } },
  encuentro: { cam: 'catalejo', general: { col: ['#8a98a8', '#2a4a64'], geo: { suelo: 166, libre: [40, 240], lejos: [220, 96] } }, catalejo: { col: ['#1c1a20', '#2a4a64'], geo: { suelo: 180, libre: [0, 0], circulo: [160, 92, 70] } } },
  mapa: { cam: 'azores', general: { col: ['#e8d8a8', '#6a4a30'], geo: { suelo: 180, libre: [0, 0], santaMaria: [170, 100], encuentro: [215, 92], nuevaYork: [40, 70], gibraltar: [262, 104] } }, azores: { col: ['#e8d8a8', '#6a4a30'], geo: { suelo: 180, libre: [0, 0], santaMaria: [160, 96] } } },
  bote: { cam: 'cabo', general: { col: ['#b8c0c8', '#4a6e8a'], geo: { suelo: 180, libre: [0, 0], bote: [80, 130], barco: [240, 110] } }, cabo: { col: ['#4a6e8a', '#2a4a64'], geo: { suelo: 180, libre: [0, 0], rotura: [160, 100] } } },
};
export function mar(R, t, o = {}) {
  return vista(R, t, o, V_MAR);
}
export function marDelante(R, t, o = {}) {
  return {};
}

// ── C · A bordo del Mary Celeste: la cubierta, el camarote y la bodega ───────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en abordoDelante. Opciones de todo el grupo: o.estado 'viaje' (noviembre,
// todo en orden: el bote atado sobre la escotilla principal, las escotillas cerradas, ropa tendida) | 'hallazgo' (por
// omisión: el 4 de diciembre: las escotillas de proa y del lazareto ABIERTAS con sus tapas en cubierta, el bote NO está
// (su hueco sobre la escotilla principal con las trincas sueltas), una bomba desmontada con sus piezas en cubierta, la
// varilla de sondeo tirada, agua que chapotea por los imbornales, una vela rota que flamea, cabos colgando por la borda).
// o.luz 'gris' (por omisión) | 'dia'.
//   'cubierta': LA CUBIERTA de proa a popa en perspectiva desde lo alto del palo de proa: tablas, la escotilla principal,
//     las otras dos, el palo mayor con su bomba al pie, la caseta del camarote a popa con su puerta, la rueda, la borda
//     con su barandilla, el mar a los lados que sube y baja (el barco se mece). Deja sitio para deveauMC y wrightMC que
//     suben por la borda y caminan. Devuelve suelo 150, libre [40, 280], hueco: [x0, y0, x1, y1] (el del bote), bomba:
//     [x, y], escotillas: [[x, y], [x, y]], borda: [x, y] (por dónde se sube). Cámara 'bomba': LA BOMBA Y LA VARILLA de
//     cerca: la bomba de mano desmontada (el tubo, el émbolo y la palanca sueltos sobre las tablas), la varilla de sondeo
//     de hierro con marcas cada pie (R.numero) y la línea mojada, la tapa de la escotilla tirada, el agua que entra por
//     los imbornales. Devuelve suelo 176, libre [0, 0], varilla: [x0, y0, x1, y1].
//   'camarote': EL CAMAROTE DEL CAPITÁN: paneles de madera barnizada, dos ventanillas por las que se ve el mar subir y
//     bajar (recortado), la mesa con un mantel, una lámpara de aceite colgada que se balancea, el ARMONIO de Sarah (un
//     órgano de mesa con su banqueta), una MÁQUINA DE COSER con un vestidito a medio coser y juguetes de Sophia al lado
//     (un caballito, una muñeca de trapo SIN cara pintada), estantes con libros, la cama con cortina, el reloj de pared, el
//     hueco del cronómetro vacío en su caja abierta, el DIARIO DE A BORDO (canon) en la mesa. o.te 0–1 (el gag 4): sobre
//     la mesa aparece una taza humeante recortada de un periódico (un recorte de papel con borde irregular y renglones,
//     con la taza dibujada), y con o.te > 0,6 la borra una goma (la pone la escena) dejando migas de goma: nunca hubo té.
//     Devuelve suelo 160, libre [30, 250], mesa: [x0, y0, x1, y1], diario: [x, y], taza: [x, y]. Cámara 'diario': EL
//     DIARIO DE CERCA (canon): las dos páginas con columnas de números (R.numero: rumbos, millas) y renglones sin letras;
//     la última fila con un 25 (R.numero), y debajo, la página en blanco; o.pagina 0–1: la hoja pasa; un dedo de luz de
//     la ventanilla que se mueve con el balanceo; al margen, un dibujito de la isla de Santa María. Devuelve fila: [x, y].
//   'bodega': LA BODEGA: penumbra, la luz que entra por la escotilla abierta en un haz con motas, las cuadernas del casco,
//     las filas de BARRILES (canon) tumbados y calzados con cuñas, el agua en el fondo (o.agua 0–1: hasta más de un
//     metro, con reflejos que se mueven y barriles de la fila de abajo medio cubiertos), una escala que baja, un farol;
//     o.vapor 0–1: un velo de vapor de alcohol que tiembla en el aire y deforma lo de detrás (ondas de calor), y con
//     o.llama 0–1 una LLAMARADA AZUL fugaz que llena la bodega y se apaga sin quemar nada (solo luz azul y un temblor).
//     Devuelve suelo 170, libre [60, 220], escala: [x, y], agua: y. Cámara 'varilla': LA VARILLA DE SONDEO DE CERCA
//     bajando por su tubo entre los barriles hasta el agua: sube goteando con la marca mojada (o.sonda 0–1: baja, mide y
//     sube); el gag 6: con o.sonda > 0,8 un pececito salta del agua de la bodega y vuelve a caer (un chapoteo). Devuelve
//     marca: [x, y].
const V_ABORDO = {
  cubierta: { cam: 'bomba', general: { col: ['#8a98a8', '#c8a878'], geo: { suelo: 150, libre: [40, 280], hueco: [130, 110, 190, 130], bomba: [210, 120], escotillas: [[90, 110], [240, 116]], borda: [40, 140] } }, bomba: { col: ['#c8a878', '#9a7a52'], geo: { suelo: 176, libre: [0, 0], varilla: [100, 60, 220, 150] } } },
  camarote: { cam: 'diario', general: { col: ['#7a5034', '#4a2e1a'], geo: { suelo: 160, libre: [30, 250], mesa: [110, 120, 210, 140], diario: [150, 118], taza: [185, 116] } }, diario: { col: ['#efe6d0', '#6a4428'], geo: { suelo: 180, libre: [0, 0], fila: [200, 110] } } },
  bodega: { cam: 'varilla', general: { col: ['#3a2a1c', '#1a3048'], geo: { suelo: 170, libre: [60, 220], escala: [150, 80], agua: 150 } }, varilla: { col: ['#3a2a1c', '#1a3048'], geo: { suelo: 180, libre: [0, 0], marca: [160, 100] } } },
};
export function abordo(R, t, o = {}) {
  return vista(R, t, o, V_ABORDO);
}
export function abordoDelante(R, t, o = {}) {
  return {};
}

// ── D · Gibraltar, diciembre de 1872 a abril de 1873 ─────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en gibraltarDelante.
//   'bahia': LA BAHÍA DE GIBRALTAR: el PEÑÓN enorme a la derecha (caliza clara con matorral, sombras, las baterías y
//     murallas al pie), la ciudad blanca al pie, el muelle con el Mary Celeste amarrado (canon) y tres marineros del Dei
//     Gratia que lo traen (o.llega 0–1: el barco entra desde la izquierda y amarra), barcos de guerra de vela y vapor
//     anclados, botes de remos, gaviotas, el sol de invierno. El Peñón NO entra en la esquina de Atom (que quede cielo).
//     Devuelve suelo 160, libre [20, 240], muelle: [x, y]. Cámara 'barco': el Mary Celeste amarrado de cerca bajo el
//     Peñón, con un centinela de casaca roja pequeño en el muelle y una cuerda de precinto; los cortes de la proa (unas
//     muescas en la madera, o.cortes 0–1 los marca un círculo de tiza). Devuelve suelo 166, libre [20, 200], proa: [x, y].
//   'tribunal': LA SALA DEL TRIBUNAL DEL VICEALMIRANTAZGO: techo alto, ventanales con luz de invierno (recortado: el
//     Peñón detrás), estrado de madera oscura con el escudo insinuado (formas, sin letras), el juez con peluca lejos y
//     pequeño, bancos, un reloj de pared, legajos atados con cinta roja; en la mesa del centro, la ESPADA en su vaina, el
//     diario y una lupa. Deja sitio para sollyfloodMC de pie junto a la mesa y deveauMC en el banco. o.pago 0–1: al
//     final, un saquito de monedas pequeño (pequeño de verdad) que se desliza por la mesa. Devuelve suelo 158, libre [30,
//     260], mesa: [x0, y0, x1, y1], espada: [x, y]. Cámara 'espada': LA ESPADA DE CERCA bajo una LUPA ENORME (la lupa la
//     sostiene la mano canónica de la escena): la hoja con manchas pardas; el gag 5: o.sopla 0–1: alguien sopla y sale
//     una nubecilla de ÓXIDO naranja que flota (la escena pone el estornudo); con o.analisis 0–1 un frasquito con líquido
//     que no cambia de color al lado (no es sangre). Devuelve manchas: [x, y].
const V_GIBRALTAR = {
  bahia: { cam: 'barco', general: { col: ['#b8d0e8', '#d8cca8'], geo: { suelo: 160, libre: [20, 240], muelle: [120, 150] } }, barco: { col: ['#b8d0e8', '#2a4a64'], geo: { suelo: 166, libre: [20, 200], proa: [230, 120] } } },
  tribunal: { cam: 'espada', general: { col: ['#c8b898', '#5a3a24'], geo: { suelo: 158, libre: [30, 260], mesa: [120, 126, 220, 146], espada: [170, 124] } }, espada: { col: ['#5a3a24', '#3a2416'], geo: { suelo: 180, libre: [0, 0], manchas: [160, 96] } } },
};
export function gibraltar(R, t, o = {}) {
  return vista(R, t, o, V_GIBRALTAR);
}
export function gibraltarDelante(R, t, o = {}) {
  return {};
}

// ── E · Los laboratorios: Londres, 2006, y Mánchester, 2026 ───────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en laboratorioDelante.
//   'ucl': EL LABORATORIO DE QUÍMICA DE 2006: poyatas con azulejos blancos, campana de gases, estanterías con frascos de
//     colores, una pizarra blanca con fórmulas insinuadas (rayas y símbolos, sin letras), una ventana con ladrillo
//     londinense y lluvia (recortada); en la poyata del centro, la MAQUETA DE LA BODEGA: una caja de madera y metacrilato
//     con una tapa de escotilla, dentro filas de CUBOS DE PAPEL (cajitas blancas) y una bombona de butano pequeña con su
//     tubo; un extintor, un cronómetro. o.fuego 0–1 (el gag 7): «fuuum», una llamarada AZUL llena la caja y se apaga; la
//     tapa salta un poco; los cubos quedan INTACTOS (blancos, sin una marca). Deja sitio para sellaMC junto a la maqueta.
//     Devuelve suelo 158, libre [30, 250], maqueta: [x0, y0, x1, y1]. Cámara 'caja': LA MAQUETA DE CERCA, a la altura de
//     los cubos de papel: la llamarada azul que pasa por encima con su luz (o.fuego) y los cubos limpios después; motas
//     de luz azul que se apagan. Devuelve cubos: [x0, y0, x1, y1].
//   'manchester': EL LABORATORIO DE 2026: más moderno (luces LED, poyatas negras, una mampara de seguridad transparente,
//     pantallas con gráficas que cambian, una cámara de alta velocidad en trípode), en la mesa una MAQUETA DE MADERA del
//     barco a escala (el casco canon en pequeño, unos 80 px, con su bodega y su escotilla) sobre una placa calefactora con
//     un TERMÓMETRO grande al lado: o.calor 0 (frío de Nueva York: el termómetro abajo, azul; la chispa no hace nada) … 1
//     (calor de las Azores: el termómetro sube, rojo, y la maqueta tiembla); o.estalla 0–1: con calor, un estallido sordo,
//     la tapa de la escotilla SALTA por el aire y vuelve a caer, un fogonazo azul breve; la madera NO se chamusca. Deja
//     sitio para rowbothamMC y mairMC detrás de la mampara. Devuelve suelo 158, libre [30, 260], maqueta: [x0, y0, x1, y1],
//     tapa: [x, y]. Cámara 'maqueta': LA MAQUETA DE CERCA con el termómetro al lado (R.numero con los grados) y la tapa que
//     salta a cámara lenta (o.estalla); el casco limpio, sin hollín. Devuelve tapa: [x, y].
const V_LAB = {
  ucl: { cam: 'caja', general: { col: ['#e8ecee', '#c8ccd0'], geo: { suelo: 158, libre: [30, 250], maqueta: [110, 100, 210, 140] } }, caja: { col: ['#e8ecee', '#8a6a48'], geo: { suelo: 180, libre: [0, 0], cubos: [80, 90, 240, 150] } } },
  manchester: { cam: 'maqueta', general: { col: ['#d8dce0', '#2a2c30'], geo: { suelo: 158, libre: [30, 260], maqueta: [110, 96, 200, 136], tapa: [150, 100] } }, maqueta: { col: ['#d8dce0', '#2a2c30'], geo: { suelo: 180, libre: [0, 0], tapa: [150, 80] } } },
};
export function laboratorio(R, t, o = {}) {
  return vista(R, t, o, V_LAB);
}
export function laboratorioDelante(R, t, o = {}) {
  return {};
}

// ── F · Haití: el arrecife de Rochelais en 1885, y los buceadores de 2001 ───────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en haitiDelante.
//   'arrecife': EL ARRECIFE: agua TURQUESA clara con la mancha oscura del arrecife y su espuma, la costa de Haití con
//     palmeras, montes verdes y nubes de lluvia tropical, pelícanos. o.epoca 1885 (por omisión: el Mary Celeste ya viejo
//     y remendado, las velas parcheadas, ENCALLA a propósito: o.encalla 0–1, avanza y se detiene de golpe sobre el
//     arrecife, se escora, cae una verga; nadie en peligro: un bote se aleja tranquilo con su tripulación) | 2001 (el
//     mismo sitio, sin barco: una lancha de buceo blanca anclada, con su bandera de buceo roja con franja blanca, dos
//     buceadores que se tiran de espaldas (o.salto 0–1), burbujas). Devuelve suelo 180, libre [0, 0], barco: [x, y],
//     lancha: [x, y]. Cámara 'fondo': BAJO EL AGUA (2001): rayos de sol que bajan y ondulan, el fondo de arena con coral y
//     gorgonias, peces de colores que pasan en banco, restos de madera cubiertos de coral (una cuaderna, un trozo de
//     quilla); un buceador (buzoMC, lo pone la escena) saca un trozo de madera; o.anillos 0–1: al lado, el corte del trozo
//     con sus ANILLOS de árbol que se iluminan uno a uno hasta el último (R.numero 1894 al lado del último anillo).
//     Devuelve suelo 172, libre [40, 260], madera: [x, y].
const V_HAITI = {
  arrecife: { cam: 'fondo', general: { col: ['#9ad8f0', '#3ac8c0'], geo: { suelo: 180, libre: [0, 0], barco: [170, 110], lancha: [120, 120] } }, fondo: { col: ['#2a8aa8', '#ecd8a8'], geo: { suelo: 172, libre: [40, 260], madera: [180, 150] } } },
};
export function haiti(R, t, o = {}) {
  return vista(R, t, o, V_HAITI);
}
export function haitiDelante(R, t, o = {}) {
  return {};
}

// ── G · Hoy (el estudio de Atom) y 1884 (el escritorio de Conan Doyle) ────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en hoyDelante.
//   'estudio': EL ESTUDIO DE ATOM, de hoy: una habitación acogedora con estanterías de libros (lomos de colores sin
//     letras), una ventana con la ciudad o el puerto de hoy (recortada), una lámpara de pie, una alfombra, una planta,
//     un escritorio con una lupa, una taza de té humeante, un tintero, y EL BARCO EN LA BOTELLA (canon) en un estante
//     bajo bien visible; una PIZARRA de pie (de tiza, verde) con dibujos de tiza de las TEORÍAS: un barco pirata, dos
//     muñequitos peleando (palitos), un papel de seguro con un sello, un tentáculo, una tromba de agua; o.tachados 0–5:
//     cuántos tiene ya tachados con una X roja (de izquierda a derecha). o.borra 0–1: la pizarra se borra entera con
//     nubes de polvo de tiza (para el cierre). Devuelve suelo 158, libre [40, 250], botella: [x, y], pizarra: [x0, y0,
//     x1, y1], taza: [x, y]. Cámara 'botella': LA BOTELLA DE CERCA (el hilo de gags): el vidrio con reflejos y burbujas,
//     el bergantín diminuto con su cubierta, el mar de masilla, el tapón de corcho; o.vacia 1 (por omisión): la cubierta
//     vacía; o.bote 'barco' (por omisión: el botecito en su sitio) | 'falta' (no está) | 'taza' (no está; al lado, la
//     taza de té de Atom con el botecito diminuto flotando en el té, que se mece); una lupa grande que se acerca (o.lupa
//     0–1). Devuelve botella: [x0, y0, x1, y1], taza: [x, y].
//   'doyle': SOUTHSEA, 1884, DE NOCHE: el despacho de un joven médico: papel pintado victoriano, una chimenea encendida
//     con su luz que baila, una lámpara de aceite con pantalla verde sobre el escritorio, estanterías con libros de
//     medicina y un maletín de médico y un estetoscopio colgado;
//     la ventana con la noche y el mar a lo lejos (recortada); en el escritorio, hojas manuscritas (renglones sin letras),
//     un tintero, plumas, una taza; deja sitio para doyleMC escribiendo sentado. Devuelve suelo 156, libre [40, 240],
//     escritorio: [x0, y0, x1, y1]. Cámara 'revista': EL ESCRITORIO DE CERCA: la pluma que escribe sola renglones
//     (o.escribe 0–1) en la hoja; a un lado, la REVISTA impresa abierta (columnas de renglones, sin letras) con un
//     grabado del barco, y en la cabecera de su relato un hueco en blanco donde iría la firma (o.firma 0: vacío); el
//     humo de la lámpara. Devuelve pluma: [x, y], revista: [x0, y0, x1, y1].
const V_HOY = {
  estudio: { cam: 'botella', general: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 158, libre: [40, 250], botella: [80, 120], pizarra: [170, 40, 260, 110], taza: [120, 128] } }, botella: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 180, libre: [0, 0], botella: [60, 60, 240, 140], taza: [262, 130] } } },
  doyle: { cam: 'revista', general: { col: ['#5a3a2a', '#3a2a1c'], geo: { suelo: 156, libre: [40, 240], escritorio: [120, 120, 240, 140] } }, revista: { col: ['#efe6d0', '#5a3a24'], geo: { suelo: 180, libre: [0, 0], pluma: [140, 100], revista: [180, 50, 280, 150] } } },
};
export function hoy(R, t, o = {}) {
  return vista(R, t, o, V_HOY);
}
export function hoyDelante(R, t, o = {}) {
  return {};
}

// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_MC = { puerto: V_PUERTO, mar: V_MAR, abordo: V_ABORDO, gibraltar: V_GIBRALTAR, laboratorio: V_LAB, haiti: V_HAITI, hoy: V_HOY };
