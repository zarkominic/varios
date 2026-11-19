// Fontanería y decorados del episodio 42 (GTA VI: la Florida real detrás de Leonida) en el estilo canónico pixel chibi,
// al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Vice City, que es Miami (vicecity); B los Cayos (cayos);
// C Grassrivers, que son los Everglades (everglades); D la tienda, el autoservicio y la piscina (tienda); E la redacción y
// el archivo público (redaccion); F el móvil vertical de las redes (movil); G el interior: caña de azúcar, pueblo de
// playa, Britton Hill, las capas de caliza y la cárcel (interior); H el salón de Atom (salon).
// CUIDADO:
// · NADA DEL JUEGO: ni capturas, ni logos, ni letras de GTA. Leonida es NUESTRA Florida dibujada; los protagonistas (Jason y
//   Lucia) los pinta la escena, por sus atributos. Las marcas reales (Wawa, Wendy's, Kool-Aid) se insinúan con colores y
//   formas, NUNCA con su logo ni su nombre.
// · Nada morboso: sin armas, ni atracos, ni heridos, ni detenciones. Los caimanes son graciosos y sin sangre.
// · SIN LETRAS: solo números (R.numero), rayas, iconos y pictogramas. Carteles, titulares y pantallas, con dibujos y cifras.
// · Los objetos NO tienen cara. La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del año (x 20–170,
//   y 0–14; las cifras del año bajan hasta y ≈ 20: nada con detalle en y 0–20 bajo x 20–170).
// Los personajes: ELENCO_LF (jasonLF, luciaLF, tramperoLF, dependienteLF, empleadoLF, vecinaLF, periodistaLF, periodista2LF,
// archiveraLF, bailarinaLF, fanLF, golfistaLF, turistaLF, patinadoraLF, bonnieLF, clydeLF, escritoraLF, cazadorLF); los
// escribe pixel-chibi.js. Atom está en el kit.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mostradores, barandillas, juncos,
// mesas) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// Cada encuadre devuelve su geometría: { encuadre, camara, suelo, libre: [x0, x1] (dónde caben los actores de pie), y
// los puntos que nombra su cabecera; ninguno se llama 'camara' ni 'encuadre' }.
// LA BARRA DEL AÑO: dos tramos, 1930–1999 y 2000–2026.
//
// CANON COMPARTIDO (lo dibujan varios grupos a la vez: tiene que cuadrar entre decorados)
// · EL CAIMÁN (aligátor americano): verde oliva casi negro (C.caiman / C.caimanS), lomo con escamas en bultos, hocico
//   ANCHO en U, ojos amarillos que asoman; gracioso, nunca fiero ni con sangre. EL COCODRILO: gris oliva claro
//   (C.cocodrilo), hocico AFILADO en V y un diente de abajo que asoma con la boca cerrada. Los pinta la pieza exportada
//   a_caiman(R, x, ySuelo, t, { dir, anda, boca, especie: 'caiman' | 'cocodrilo', s: 1|2, agua: 0–1 (solo asoman ojos y
//   lomo) }) del grupo C, y la usan todas las escenas.
// · LA FLORIDA DE PASTEL Y NEÓN: Ocean Drive con hoteles art déco (rosa, menta, azul cielo, amarillo), neones rosa y cian
//   que se encienden al anochecer, palmeras; el cielo del ocaso naranja y morado.
// · LA CÁMARA DE SEGURIDAD: cuando o.cctv = 1, el plano se ve en gris verdoso (C.cctv), con líneas de barrido, un poco de
//   grano, la hora corriendo en números arriba a la izquierda (por debajo de y 20 si x < 170) y un punto rojo que parpadea.
// · LA CAJA DE LA EDICIÓN FÍSICA (gag de Atom): una caja de juego de plástico azul oscuro con una ilustración de atardecer y
//   palmeras SIN letras; abierta, dentro solo una tarjetita con un código (barras). Pieza exportada a_caja(R, x, y, t,
//   { abierta: 0–1, sacude: 0–1 }) del grupo H.
// · EL MAPA DE LEONIDA: nuestra Florida estilizada con seis regiones de colores (Vice City abajo a la derecha, los Cayos
//   en hilera al sur, Grassrivers en el centro sur, Ambrosia junto a un lago, Port Gellhorn al norte, en la costa del
//   golfo, y Mount Kalaga con una montaña al norte); pieza exportada a_mapaLeonida(R, x, y, w, t, { encendidas: 0–6,
//   florida: 0–1 (se funde con el contorno real de Florida) }) del grupo H.
//
//   import * as T from '/atomo/plato/escenas/lf-comun.js';
//   const { E, R, M } = await T.preparar('lf-gancho');
//   T.rodar(E, R, [[0, (t) => T.vicecity(R, t, { encuadre: 'ocean' })]], { año: 2026 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, PIEZAS_DO, tela } from '/atomo/plato/kits/pixel-chibi.js';
import * as KIT from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, PIEZAS_DO };

// el reparto del episodio (ELENCO_LF) lo crea pixel-chibi.js
export const ELENCO_LF = KIT.ELENCO_LF || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el pastel y los neones de Ocean Drive; el turquesa de los Cayos y la arena; la hierba, el agua parda y el verde de
    // los Everglades; el pellejo del caimán (verde oliva casi negro) y del cocodrilo (gris oliva claro); la luz de nevera y
    // el fluorescente de la tienda; el gris verdoso de la cámara de seguridad; el papel y la madera del archivo; la caña,
    // el pino y la caliza del interior; el morado y el naranja de la noche de Atom
    pastelRosa: '#f4a8c0', pastelMenta: '#9ae0c8', pastelAzul: '#9ac8f0', pastelAmar: '#f8e098', neonRosa: '#ff4fa8',
    neonCian: '#40e8f8', turquesa: '#3ac8d0', turquesaS: '#1a8a9a', arena: '#f0dca0', arenaS: '#c8b070',
    hierba: '#a8a050', hierbaS: '#6a6a30', aguaParda: '#4a5a40', caiman: '#3a4a2a', caimanS: '#1e2a16', cocodrilo: '#7a8a5a',
    nevera: '#d8f0ff', fluor: '#f0fff0', cctv: '#9aa894', papelA: '#f2ecd8', madera: '#8a5a34', cana: '#7ab04a',
    pino: '#2a5a34', caliza: '#e8dcc0', nocheMor: '#2a1a4a', ocaso: '#ff8a4a',
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
  const E = await escena(id, 'ep42');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1930–1999 (lo de antes: el libro de 1947, la recuperación del caimán de 1987) y 2000–2026 (los
  // sucesos reales y el juego); el icono, un caimán y una palmera
  Object.assign(R.ICONOS, {
    caiman: ['.......', '....##.', '##.####', '#######', '.#.#.#.', '.......', '.......'],
    palmera: ['.#.#.#.', '..###..', '.#.#.#.', '...#...', '...#...', '...#...', '..###..'],
  });
  R.tramosTiempo([[1930, 1999, R.PALA.ORO, 'caiman'], [2000, 2026, R.PALA.AZUL ?? R.PALA.ORO, 'palmera']]);
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



// ── A · Vice City (Miami) ─────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara), o.noche 0–1 (el ocaso se apaga y se encienden los neones), o.espejo 0–1 (el plano entero se
// deforma como en un ESPEJO DE FERIA: ondas horizontales y verticales, para los actos 5 y 9). LLAMA A vicecityDelante
// DESPUÉS DE LOS ACTORES (las palmeras y los coches del primer término).
//   'ocean' (general): OCEAN DRIVE al atardecer, desde la acera de la playa: una fila de hoteles art déco de colores pastel
//     (rosa, menta, azul, amarillo) con sus franjas, porches con columnas, ventanas con persianas, letreros de neón SIN
//     letras (líneas, olas, palmeras de neón), terrazas con sombrillas y mesas, palmeras que se mecen, la calle con coches
//     descapotables que pasan despacio (de colores), patinadores y paseantes pequeños, el cielo del ocaso con nubes
//     rosas y gaviotas. Devuelve suelo 160, libre [20, 270], acera: [0, 320, 150, 170], calle: [0, 320, 128, 148].
//     Cámara 'terraza': LA TERRAZA DE UN HOTEL de cerca: el porche con columnas y escalones, el neón grande encima (una
//     palmera y una ola), mesas con sombrillas y vasos, una máquina de refrescos, la calle detrás con un coche que pasa.
//     Devuelve suelo 162, libre [40, 260], mesa: [200, 140].
//   'playa': LA PLAYA DE MIAMI: arena con huellas, toallas y sombrillas de colores, una caseta de socorrista de colores
//     pastel, el mar con olas que rompen, un velero, un avión que tira de una pancarta sin letras, los hoteles al fondo.
//     Devuelve suelo 158, libre [20, 260], orilla: [0, 320, 120, 130]. Cámara 'coche': UN DESCAPOTABLE junto al mar
//     visto de lado, aparcado en el paseo, con el mar y el ocaso detrás (para los dos protagonistas: el coche es del
//     decorado y la escena sienta a los actores en él). Devuelve suelo 160, libre [60, 240], asientos: [[150, 146], [176, 146]].
const V_VICECITY = {
  ocean: { cam: 'terraza', general: {"col": ["#f4a8c0", "#5a4a6a"], "geo": {"suelo": 160, "libre": [20, 270], "acera": [0, 320, 150, 170], "calle": [0, 320, 128, 148]}}, terraza: {"col": ["#9ae0c8", "#4a3a5a"], "geo": {"suelo": 162, "libre": [40, 260], "mesa": [200, 140]}} },
  playa: { cam: 'coche', general: {"col": ["#9ac8f0", "#f0dca0"], "geo": {"suelo": 158, "libre": [20, 260], "orilla": [0, 320, 120, 130]}}, coche: {"col": ["#ff8a4a", "#3a2a4a"], "geo": {"suelo": 160, "libre": [60, 240], "asientos": [[150, 146], [176, 146]]}} },
};
// vicecity(R, t, o) pinta los 320 × 180 y devuelve su geometría; vicecityDelante(R, t, o) va DESPUÉS DE LOS ACTORES, con
// el MISMO o: pinta lo del primer término (palmeras, el coche, macetas, matas de la duna) y, si o.espejo > 0, deforma
// TODO el plano ya pintado (decorado y actores) como en un ESPEJO DE FERIA. Opciones:
//   o.encuadre 'ocean' | 'playa' (otro valor cae en 'ocean'); o.camara la segunda cámara de cada encuadre.
//   o.noche 0–1: el ocaso se apaga en una noche morada con estrellas y luna, se encienden las ventanas y las farolas, y
//     los NEONES se encienden UNO A UNO (cada letrero tiene su umbral entre 0,1 y 0,75, con un parpadeo al prender); con 0
//     los tubos se ven apagados, de cristal. En la calle, de noche, tiemblan sus reflejos.
//   o.espejo 0–1: (solo en vicecityDelante) ondas anchas horizontales y verticales que estiran y encogen el plano, el
//     marco de feria con bombillas que corren y un brillo de cristal; la pieza exportada a_vcEspejo(R, t, f) hace lo
//     mismo sobre cualquier decorado (para lf-cierre).
//   o.coches false quita los coches que pasan (ocean y terraza); o.colorCoche '#rrggbb' el color del descapotable.
//   'ocean' (general): OCEAN DRIVE al atardecer, desde el paseo de la playa: el sol que se pone detrás de una fila de
//     cinco hoteles art déco (rosa con su aleta, menta con su zigurat, el amarillo con su torre, el azul de esquina curva
//     y franjas, el lila), cejas sobre las ventanas, persianas, toldos, porche con columnas, terrazas con sombrillas y
//     gente que come; neones sin letras (aleta, palmera, sol, ola, flamenco, copa); torres al fondo con bruma, nubes de
//     tres tonos a tres velocidades, gaviotas; la calle con descapotables que pasan en los dos sentidos, paseantes y una
//     patinadora en la acera de enfrente, dos palmeras que se mecen y una farola. Devuelve suelo 160, libre [20, 270],
//     acera [0, 320, 150, 172], calle [0, 320, 128, 148], sol [214, 62].
//     Cámara 'terraza': EL PORCHE DE UN HOTEL de cerca: el letrero grande de neón (palmera, ola y sol) sobre el porche,
//     tres columnas, la puerta de cristal del vestíbulo (recepcionista, ventilador, maceta), el número 1939, una máquina
//     de refrescos que suelta una lata, una ventana con persiana donde pasa el reflejo de los coches, la mesa con
//     sombrilla y dos cócteles, el suelo de terrazo y los escalones; a la derecha, por el hueco, la calle con coches
//     que pasan y el mar. Devuelve suelo 162, libre [40, 250], mesa [200, 144] (el tablero), puerta [64, 104].
//   'playa': LA PLAYA DE MIAMI al anochecer, mirando al mar: el cinturón rosa del cielo, el mar con olas que rompen y la
//     espuma que sube y baja por la arena mojada, un velero y un barco en el horizonte, una avioneta con una pancarta
//     (rayas y una palmera), la costa con hoteles diminutos a la izquierda, la caseta de socorrista de colores con su
//     bandera y su socorrista, sombrillas, toallas con bañistas, nevera, castillo de arena, huellas, un cangrejo.
//     Devuelve suelo 158, libre [20, 230], orilla [0, 320, 118, 130], caseta [246, 300].
//     Cámara 'coche': UN DESCAPOTABLE turquesa aparcado de lado en el paseo, mirando a la derecha, con la balaustrada, el
//     mar, el muelle y el sol que se pone detrás. La parte de atrás del coche (asientos, salpicadero) la pinta vicecity; la
//     puerta, la carrocería, las ruedas y el parabrisas, vicecityDelante (tapa a los actores de pecho para abajo; asoman
//     la cabeza y los hombros). Devuelve suelo 160, libre [60, 250], asientos [[150, 146], [176, 146]] (x del actor e
//     ySuelo que se le pasa a R.actor), volante [197, 131].
export function vicecity(R, t, o = {}) {
  const v = a_vcVista(o), S = a_vcEstado(t, o);
  return { encuadre: v.enc, camara: v.cam, ...A_VC_VISTAS[v.enc + '|' + v.cam](R, t, S) };
}
export function vicecityDelante(R, t, o = {}) {
  const v = a_vcVista(o), S = a_vcEstado(t, o);
  A_VC_DELANTE[v.enc + '|' + v.cam](R, t, S);
  if ((o.espejo ?? 0) > 0) a_vcEspejo(R, t, o.espejo);
}
// ── B · Los Cayos ─────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A cayosDelante DESPUÉS DE LOS ACTORES (la barandilla del puente, los postes del muelle).
//   'puente' (general): LA CARRETERA SOBRE EL MAR vista desde lejos y algo alta: un puente larguísimo y bajo que cruza
//     de isla en isla (islotes de manglar), con el puente viejo de vigas oxidado al lado, el agua turquesa con bajíos
//     claros y zonas profundas azules, olas, barcas de pesca, pelícanos que planean, nubes blancas de algodón, coches
//     pequeños por el puente. o.oleaje 0–1 (las olas más bravas al fondo). Devuelve suelo 150, libre [40, 280],
//     calzada: [0, 320, 138, 150]. Cámara 'barandilla': A PIE DE PUENTE: la calzada con su línea, la barandilla de hormigón
//     y sus postes (con un pelícano posado en uno), el mar a los lados, un coche que pasa (la escena pone a Atom en bici).
//     Devuelve suelo 160, libre [20, 300], poste: [230, 132].
//   'cayo': EL FINAL DEL CAMINO, CAYO HUESO: un faro blanco y negro, casas de madera con porches, palmeras, un muelle con
//     barcos y el mar abierto; atardecer. Devuelve suelo 158, libre [20, 250]. Cámara 'muelle': EL MUELLE de cerca,
//     tablones, cuerdas, una caja de pesca, gaviotas y el mar. Devuelve suelo 162, libre [30, 270].
const V_CAYOS = {
  puente: { cam: 'barandilla', general: {"col": ["#3ac8d0", "#1a8a9a"], "geo": {"suelo": 150, "libre": [40, 280], "calzada": [0, 320, 138, 150]}}, barandilla: {"col": ["#9ac8f0", "#8a8a84"], "geo": {"suelo": 160, "libre": [20, 300], "poste": [230, 132]}} },
  cayo: { cam: 'muelle', general: {"col": ["#ff8a4a", "#3ac8d0"], "geo": {"suelo": 158, "libre": [20, 250]}}, muelle: {"col": ["#3ac8d0", "#8a5a34"], "geo": {"suelo": 162, "libre": [30, 270]}} },
};
// o.encuadre (y o.camara). LLAMA A cayosDelante(R, t, o) DESPUÉS DE LOS ACTORES, con las mismas opciones (la barandilla
// del puente, el coche que pasa, los pilotes y la mata del primer término). Todo lo fijo va en un búfer por encuadre; el
// agua se pinta en cada fotograma (turquesa sobre los bajíos, azul en los canales, con ondas que corren, destellos del
// sol, espuma en las orillas y las sombras de las nubes que pasan); el cielo lleva nubes de tres tonos a tres velocidades.
//   'puente' (general): LA CARRETERA SOBRE EL MAR, alta y de lejos. Delante, el tablero del puente nuevo de lado a lado
//     (el pretil de hormigón del fondo con sus juntas, imbornales y churretes, la calzada con las líneas blanca y amarilla
//     doble, el bordillo, la viga del canto y las pilas que bajan al agua en sombra). Detrás, el agua de los Cayos con
//     bajíos claros y canales azules; el PUENTE VIEJO de Flagler, de arcos de hormigón con la viga de acero oxidada, un
//     tramo de celosía «camelback» y un vano que falta, con pescadores diminutos que lanzan la caña; un cayo de manglar a
//     la derecha (casa sobre pilotes, palmeras que se mecen, barca fondeada) y otro a la izquierda; en el horizonte, la
//     hilera de cayos con su depósito de agua, la antena con su luz roja y otro puente con cochecitos. Vida: una lancha que
//     cruza con su estela, un velero lejano, una fila de pelícanos que planea, un pelícano que se lanza en picado al agua,
//     gaviotas, coches (de ~38 px) por el carril del fondo cada pocos segundos. o.oleaje 0–1: el mar se pica (borreguitos
//     por todo el fondo, la rompiente del arrecife en el horizonte, golpes de espuma en las pilas del puente viejo y las
//     barcas cabecean). o.coches (true): false, sin coches. Devuelve suelo 150, libre [40, 280], calzada: [0, 320, 138,
//     150] (los pies, de y 140 a 150), carril (coches del fondo, ruedas en y 141), horizonte 60, puenteViejo [0, 240, 76,
//     104], sol [228, 28].
//     Cámara 'barandilla': A PIE DE PUENTE, a la altura de los ojos: el arcén donde se plantan los actores, el pretil de
//     hormigón de los años 30 de lado a lado (postes con su sombrerete, vigas, huecos con arcos por donde se ve el mar,
//     churretes de óxido y verdín), el poste del kilómetro (un cartel verde con «47», sin letras), el mar con su oleaje,
//     el puente viejo de arcos a lo lejos, un cayo de manglar, una lancha y un velero, peces que saltan, gaviotas y
//     pelícanos; un PELÍCANO POSADO en el poste de x 230 (parpadea, gira la cabeza, sacude el buche). o.pelicano (true):
//     false lo quita (para que la escena lo anime con b_pelicano). o.coche (cada 9 s por omisión): un coche pasa por el
//     carril de delante, POR DELANTE de los actores (lo pinta cayosDelante); o.coche 0–1 lo fija en ese punto del paso;
//     false, sin coche. Devuelve suelo 160, libre [20, 300], poste: [230, 132] (pies del pelícano), horizonte 96,
//     carril: [0, 320, 166, 180] (el del coche, delante).
//   'cayo': EL FINAL DEL CAMINO, CAYO HUESO, al atardecer: el faro blanco con la linterna negra (se enciende y destella),
//     dos casas de madera de dos plantas con porches, barandillas, contraventanas y tejado de chapa (una menta y otra rosa;
//     las ventanas se encienden), la valla blanca de estacas, buganvilla e hibisco, palmeras que se mecen, una bici
//     apoyada, una farola que se enciende, la acera y la calle; a la derecha el paseo del puerto, el mar del ocaso con el
//     sol que se pone y su reguero de luz, una goleta de dos palos que cruza, un cayo al fondo y el muelle de la puesta de
//     sol con gente diminuta mirando; gaviotas, un gato negro en el tejado de la casa rosa que mueve la cola, una farola encendida y un gallo con dos
//     pollitos que picotean por la calle (los gallos sueltos de Cayo Hueso). Devuelve suelo 158, libre [20, 250],
//     horizonte 100, sol [246, 90], faro [70, 30] (la linterna), bici [150, 146], gallo [x, y] (dónde va).
//     Cámara 'muelle': EL MUELLE de cerca a la misma hora: tablones en perspectiva con clavos, vetas, nudos y manchas de
//     agua, cuatro pilotes con su cabo, percebes y una gaviota encima, un pelícano en el de x 118 (o.pelicano: false lo
//     quita), un barco de pesca amarrado que cabecea, una caja de pescado con su gaviota ladrona, una nevera portátil, un
//     rollo de cabo y un cubo con dos cañas (a la izquierda, x 44), el mar con un sábalo que salta y un velero ante el sol. Devuelve suelo 162,
//     libre [30, 270], horizonte 92, sol [72, 84], caja [16, 160], nevera [287, 160], pilotes [26, 118, 210, 300].
// Por hora: o.tarde fuerza el atardecer en 'puente' (por omisión 'puente' es de día y 'cayo' al atardecer).
export function cayos(R, t, o = {}) {
  const { enc, cam } = b_vistaCayos(o);
  if (enc === 'puente') return cam === 'barandilla' ? b_barandilla(R, t, o) : b_puente(R, t, o);
  return cam === 'muelle' ? b_muelle(R, t, o) : b_cayoHueso(R, t, o);
}
// lo que va POR DELANTE de los actores, con las mismas opciones que cayos(): en 'puente' la barandilla baja del canto
// del tablero (dos tubos y postes, deja ver las piernas); en 'barandilla' el coche que pasa por el carril de delante;
// en 'cayo' las hojas del hibisco de la esquina; en 'muelle' los dos pilotes del borde con su cabo
export function cayosDelante(R, t, o = {}) {
  const { enc, cam } = b_vistaCayos(o);
  if (enc === 'puente' && cam === 'general') b_puenteDelante(R, t, o);
  else if (enc === 'puente') b_barandillaDelante(R, t, o);
  else if (cam === 'general') b_cayoDelante(R, t, o);
  else b_muelleDelante(R, t, o);
}
// ── C · Grassrivers (los Everglades) ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A evergladesDelante DESPUÉS DE LOS ACTORES (los juncos del primer término). Exporta
// también la pieza canónica a_caiman (ver el canon de la cabecera del archivo).
//   'rio' (general): EL RÍO DE HIERBA hasta el horizonte: juncos de sierra dorados y verdes que ondean con el viento, agua
//     somera que refleja el cielo y CORRE DESPACIO (reflejos que se desplazan, hierbas que se inclinan hacia el mar),
//     islas de árboles (hamacas) con palmitos y cipreses, garzas blancas, una lancha de hélice que pasa a lo lejos con su
//     estela, nubes de tormenta de verano al fondo. o.flechas 0–1 (unas flechas de agua dibujadas como hierba que se
//     inclina, para «corre despacio»). Devuelve suelo 150, libre [20, 270], lancha: [200, 120].
//     Cámara 'orilla': LA ORILLA DE CERCA: barro, raíces de mangle, nenúfares, una garza, el agua quieta con burbujas;
//     sitio para un caimán y un cocodrilo uno junto a otro (la escena los pinta con a_caiman). Devuelve suelo 156,
//     libre [40, 260], caiman: [110, 156], cocodrilo: [200, 156].
//   'golf': UN CAMPO DE GOLF DE FLORIDA: césped cuidado con franjas, un lago con fuente, un búnker de arena, una bandera
//     roja SIN letras, palmeras, casas al fondo y carritos de golf. Devuelve suelo 160, libre [20, 280], lago: [60, 200,
//     138, 158]. Cámara 'lago': EL BORDE DEL LAGO de cerca, con el cartel de aviso (solo un pictograma de caimán) y la
//     hierba. Devuelve suelo 160, libre [30, 260].
const V_EVERGLADES = {
  rio: { cam: 'orilla', general: {"col": ["#a8a050", "#4a5a40"], "geo": {"suelo": 150, "libre": [20, 270], "lancha": [200, 120]}}, orilla: {"col": ["#6a6a30", "#4a5a40"], "geo": {"suelo": 156, "libre": [40, 260], "caiman": [110, 156], "cocodrilo": [200, 156]}} },
  golf: { cam: 'lago', general: {"col": ["#7ab04a", "#3a7a3a"], "geo": {"suelo": 160, "libre": [20, 280], "lago": [60, 200, 138, 158]}}, lago: {"col": ["#7ab04a", "#4a5a40"], "geo": {"suelo": 160, "libre": [30, 260]}} },
};
export function everglades(R, t, o = {}) {
  const { enc, cam, geo } = c_vistaEv(o), g = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(geo)) };
  if (enc === 'rio') { if (cam === 'orilla') c_orilla(R, t, o, g); else c_rio(R, t, o, g); }
  else if (cam === 'lago') c_lago(R, t, o, g); else c_golf(R, t, o, g);
  return g;
}
// evergladesDelante(R, t, o): lo del primer término de la vista de o (las mismas opciones que everglades), por delante de
// los actores. 'rio': juncos de sierra altos en los bordes, inclinados hacia fuera (x < 20 y x > 300), juncos y pontederias en el agua bajo la
// pasarela (y > 163) y una libélula. 'orilla': raíces y copa de mangle a la izquierda (x < 40), espadañas a la derecha (x > 284) y
// matas abajo (y > 168). 'golf': la hierba alta del rough en las esquinas de abajo y un aspersor que gira (x 304). 'lago':
// espadañas a la izquierda (x < 26) y hierba alta en las esquinas. Nada pisa la franja de los pies dentro de libre.
export function evergladesDelante(R, t, o = {}) {
  const { enc, cam } = c_vistaEv(o), P = c_PE;
  if (enc === 'rio' && cam === 'general') {
    for (let k = 0; k < 9; k++) c_junco(R, k * 1.8, 180, 36 + h(k, 1, 71) * 30, t, k, P.junco, 0.5, -0.7);
    for (let k = 0; k < 9; k++) c_junco(R, 304 + k * 2, 180, 34 + h(k, 2, 71) * 28, t, k + 20, P.junco, 0.5, 0.7);
    for (let k = 0; k < 34; k++) { const x = 20 + k * 8 + h(k, 3, 71) * 6; c_junco(R, x, 181, 8 + h(k, 4, 71) * 9, t, k + 40, P.junco, 0.4); }
    // las pontederias: espigas moradas que se mecen
    for (const x of [44, 132, 214, 262]) { const dx = Math.round(Math.sin(t * 1.4 + x) * 1.2); R.linea(x, 180, x + dx, 168, P.junco[1]); for (let j = 0; j < 4; j++) R.pset(x + dx + (j & 1), 165 + j, j < 2 ? hex('#a080d8') : hex('#7a58b0')); R.pset(x - 2, 173, P.junco[2]); R.pset(x - 3, 172, P.junco[2]); }
    c_libelula(R, t, 60, 250, 168, 6);
  } else if (enc === 'rio') {
    c_raicesMangle(R, t);
    for (let k = 0; k < 8; k++) c_espadana(R, 290 + k * 4 + h(k, 5, 72) * 2, 181, 44 + h(k, 6, 72) * 26, t, k);
    for (let k = 0; k < 14; k++) { const x = 40 + k * 17 + h(k, 7, 72) * 8; c_junco(R, x, 181, 6 + h(k, 8, 72) * 7, t, k + 60, P.juncoV, 0.3); }
    c_libelula(R, t, 50, 250, 150, 30);
  } else if (cam === 'lago') {
    for (let k = 0; k < 6; k++) c_espadana(R, 3 + k * 4 + h(k, 9, 72) * 2, 181, 40 + h(k, 10, 72) * 24, t, k + 9);
    for (let k = 0; k < 8; k++) c_junco(R, 300 + k * 2.5, 181, 10 + h(k, 11, 72) * 10, t, k + 80, P.juncoV, 0.3);
    for (let k = 0; k < 6; k++) c_junco(R, 28 + k * 3, 181, 6 + h(k, 12, 72) * 6, t, k + 90, P.juncoV, 0.3);
    c_libelula(R, t, 40, 250, 140, 18);
  } else {
    for (let k = 0; k < 10; k++) c_junco(R, 1 + k * 2.4, 181, 10 + h(k, 13, 72) * 12, t, k + 100, P.juncoV, 0.3);
    for (let k = 0; k < 8; k++) c_junco(R, 286 + k * 2.6, 181, 8 + h(k, 14, 72) * 10, t, k + 120, P.juncoV, 0.3);
    c_aspersor(R, t, 304, 176);
  }
}
// ── D · La tienda, el autoservicio y la piscina ───────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara), o.cctv 0–1 (el canon de la cámara de seguridad), o.hora (los números del reloj de la cctv:
// segundos desde medianoche en t = 0, que corren con t, o un texto fijo '03:41:07'; por omisión las 3:41), o.fecha (el
// texto de la fecha bajo la hora, mes-día-año: '06-15-2018' por omisión; false, sin fecha).
// LLAMA A tiendaDelante DESPUÉS DE LOS ACTORES, CON LAS MISMAS OPCIONES: pinta lo que va delante (el mostrador de la tienda,
// el coche del autoservicio, el alféizar de la ventanilla, la escalerilla de la piscina, la superficie del agua) y, si
// o.cctv > 0, pasa TODO el plano (actores incluidos) por la cámara de seguridad: gris verdoso, barrido, grano, viñeta, una
// banda que baja, un tirón de imagen de vez en cuando, la hora que corre arriba a la izquierda (y 23–40, bajo la barra del
// año), el punto rojo que parpadea, el número de la cámara y las esquinas del visor. Si algún actor va DELANTE del mostrador
// (un cliente que paga), llama a tiendaDelante con { ...o, cctv: 0 }, pinta ese actor y luego T.d_cctv(R, t, o).
//   'tienda' (general): UNA TIENDA DE GASOLINERA DE MADRUGADA vista desde la cámara del techo (en alto, el suelo ocupa medio
//     plano): el techo de placas con plafones (uno parpadea) y una polilla; la pared del fondo con la franja roja y amarilla
//     de la cadena (sin letras), el «24» rojo y el reloj (marca la hora de o.hora); las PUERTAS AUTOMÁTICAS de cristal a la
//     izquierda (o.puerta 0–1 las abre) y, por su cristal, la noche: la marquesina iluminada, el surtidor con sus cifras que
//     corren, un coche repostando, polillas en las luces y coches que pasan por la carretera; la alfombrilla; CINCO NEVERAS
//     de puertas de cristal con su luz fría, botellas y latas de colores, escarcha, tiradores (una luz tiembla); la máquina
//     de granizado con sus dos cubas que giran (roja y azul), la cafetera con dos jarras humeantes, los vasos, el expositor
//     de lotería y el espejo convexo de seguridad; la GÓNDOLA de patatas fritas en medio (tres baldas de bolsas de colores,
//     tiras de precios, la tapa con cajas y un cartel colgado con «$2» que se mece), un arcón de helados abajo a la
//     izquierda (x 0–48, y 140–176), el cartel de suelo mojado (x 92–104, y 116–136) y las cestas (x 68–86, y 104–126) al
//     fondo, el suelo de baldosas con el brillo de los plafones y de las neveras. tiendaDelante pinta, además del mostrador,
//     EL CUBO DE FREGAR con su fregona en primer término (x 52–74, y 132–178; o.cubo false lo quita).
//     Devuelve suelo 166, libre [30, 250], puerta [33, 104] (el umbral; el cristal es x 9–57, y 42–103: quien entra aparece
//     por ahí), pasillo [100, 220, 150, 166] (delante de la góndola), patatas [170, 146] (el pie de la góndola; las bolsas,
//     x 116–210, y 112–146), mostrador [218, 124, 319, 160] (lo pinta tiendaDelante; la encimera, y 124–135), detras [262, 130] (los pies del
//     dependiente detrás del mostrador: se le ven cabeza y hombros), cliente [250, 166], neveras [66, 36, 206, 100].
//     Cámara 'pasillo': UN PASILLO A RAS DE SUELO en perspectiva hacia el fondo (punto de fuga x 160, y 120): a la izquierda
//     las baldas de patatas fritas, a la derecha las de refrescos, más bajas (botellas y latas), al fondo las neveras encendidas, el
//     techo con los plafones en fila (uno parpadea), el cartel del pasillo con su «4» que se mece, la cámara-cúpula con su luz
//     roja, el suelo encerado que refleja las luces y los colores de las baldas, y un cajón de cartón lleno de bolsas a la
//     derecha. Devuelve suelo 168, libre [40, 280], patatas [220, 152] (el pie del cajón de bolsas; las baldas de la izquierda
//     llegan hasta x 100), fondo [104, 88, 216, 141].
//   'autoservicio': EL AUTOSERVICIO DE COMIDA RÁPIDA DE NOCHE visto desde fuera: cielo nocturno tramado con estrellas, luna
//     y nubes de tres tonos a tres velocidades, el paso elevado con coches, palmeras, el poste con su panel rojo y una
//     hamburguesa (sin letras); el local con tejado de tejas, la franja roja, el comedor cerrado con las sillas sobre las
//     mesas y una limpiadora pequeña que friega, la VENTANILLA iluminada con su toldo de rayas, su lámpara y el interior;
//     el panel del menú con fotos de comida y precios, el poste del interfono con su luz, la barra de altura, farolas con
//     polillas, el carril de asfalto con flechas pintadas, manchas y grietas. tiendaDelante pinta EL COCHE parado en la
//     ventanilla (o.coche !== false; o.cocheX: su morro, 250 por omisión; humo del tubo de escape y luces de freno).
//     Devuelve suelo 162, libre [30, 280], ventanilla [190, 118, 230, 140] (el hueco; el alféizar, y 140–143), menu [40, 88,
//     96, 140], coche [183, 250] (de la cola al morro; su ventanilla del conductor, x 218–235, y 139–148; el techo, y 136).
//     Cámara 'ventanilla': DESDE DENTRO: la pared de azulejos, la campana sobre la freidora con su vapor, la FREIDORA con dos
//     cubas que borbotean y sus cestas, la mesa de las patatas bajo las lámparas de calor (naranja), las hamburguesas
//     envueltas, las pantallas de pedidos que cambian, la caja, la ventanilla abierta (x 210–290, y 90–140) y por ella la
//     noche con el COCHE parado (su techo y sus ventanillas, x 220–290, y 114–139), el suelo de baldosa roja con la
//     alfombrilla de goma. tiendaDelante pinta el alféizar y una bolsa, y la esquina de la mesa de acero abajo a la izquierda.
//     Devuelve suelo 164, libre [40, 200], ventanilla [210, 90, 290, 140], freidora [30, 100, 100, 150], alfeizar [206, 140,
//     294, 146].
//   'piscina': UN PORCHE CON MOSQUITERA Y PISCINA de una casa de Florida, de día: la jaula de aluminio con su malla (lo de
//     fuera se ve tamizado), el cielo con nubes y una garza que pasa, el jardín, el ESTANQUE con juncos, palmeras y la valla;
//     la casa a la derecha con su puerta corredera; la PISCINA turquesa con las cáusticas que se mueven, su escalerilla, el
//     flotador de FLAMENCO que va a la deriva (o.flamenco false lo quita, para que la escena lo haga volar con d_flamenco),
//     el limpiafondos que recorre el agua, dos tumbonas abajo a la izquierda (x 6–76, y 162–178), la mesa con su sombrilla junto a la casa (x 264–316, y 98–156), macetas con buganvilla. o.roto 0–1 (el panel de
//     la mosquitera de la izquierda, x 10–62, y 62–128, se rasga desde el centro y quedan colgajos).
//     Devuelve suelo 160, libre [20, 280], agua [110, 250, 138, 160], mosquitera [30, 100] (el centro del panel que se
//     rompe), escalera [236, 138], tumbonas [[6, 174], [50, 174]], mesa [290, 152].
//     Cámara 'agua': EL AGUA DE CERCA, a ras: el borde de enfrente con su albardilla y la cenefa de mosaico, la terraza con
//     tumbonas y macetas tras la malla, el agua con ondas, cáusticas, burbujas, una hoja, el foco de la piscina que brilla y
//     el flotador de flamenco grande que se mece (o.flamenco false lo quita). tiendaDelante tiñe de agua lo que queda por
//     debajo de la superficie (y > 112) y pinta las ondas de la línea de flotación. Devuelve suelo 170, libre [0, 0],
//     agua [0, 320, 110, 180], flamenco [118, 104].
const V_TIENDA = {
  tienda: { cam: 'pasillo', general: { geo: { suelo: 166, libre: [30, 250], puerta: [33, 104], pasillo: [100, 220, 150, 166], patatas: [170, 146], mostrador: [218, 124, 319, 160], detras: [262, 130], cliente: [250, 166], neveras: [66, 36, 206, 100] } },
    pasillo: { geo: { suelo: 168, libre: [40, 280], patatas: [220, 152], fondo: [104, 88, 216, 141] } } },
  autoservicio: { cam: 'ventanilla', general: { geo: { suelo: 162, libre: [30, 280], ventanilla: [190, 118, 230, 140], menu: [40, 88, 96, 140], coche: [183, 250] } },
    ventanilla: { geo: { suelo: 164, libre: [40, 200], ventanilla: [210, 90, 290, 140], freidora: [30, 100, 100, 150], alfeizar: [206, 140, 294, 146] } } },
  piscina: { cam: 'agua', general: { geo: { suelo: 160, libre: [20, 280], agua: [110, 250, 138, 160], mosquitera: [30, 100], escalera: [236, 138], tumbonas: [[6, 174], [50, 174]], mesa: [290, 152] } },
    agua: { geo: { suelo: 170, libre: [0, 0], agua: [0, 320, 110, 180], flamenco: [118, 104] } } },
};
export function tienda(R, t, o = {}) {
  const enc = V_TIENDA[o.encuadre] ? o.encuadre : 'tienda', e = V_TIENDA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  d_VISTAS[enc + '/' + cam](R, t, o);
  return { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) };
}
// lo que va por delante de los actores en cada encuadre y, al final, la cámara de seguridad si o.cctv > 0
export function tiendaDelante(R, t, o = {}) {
  const enc = V_TIENDA[o.encuadre] ? o.encuadre : 'tienda', cam = o.camara === V_TIENDA[enc].cam ? V_TIENDA[enc].cam : 'general';
  const f = d_DELANTE[enc + '/' + cam]; if (f) f(R, t, o);
  if ((o.cctv ?? 0) > 0) d_cctv(R, t, o);
}
// ── E · La redacción y el archivo público ─────────────────────────────────────────────────────────────────────────────
// o.encuadre ('redaccion' | 'archivo') y o.camara (la segunda de cada uno). LLAMA A redaccionDelante(R, t, o) DESPUÉS DE
// LOS ACTORES, con las mismas opciones: pinta la mesa, el montón de hojas, las hojas que vuelan, el mostrador y el frente
// del cajón. Las dos funciones son puras de (t, o): nada se acumula entre fotogramas.
//   'redaccion' (general): UNA REDACCIÓN DE PERIÓDICO EN MIAMI, DE DÍA: techo de placas con plafones (uno parpadea);
//     ventanales con montantes de aluminio, estor bajado en un paño, reflejos; fuera, el cielo tramado con nubes de tres
//     tonos a tres velocidades y gaviotas, rascacielos a lo lejos, torres pastel art déco y de cristal, la bahía con
//     brillos y un velero que cruza, un crucero atracado con su humo y palmeras que se mecen. En la pared: el tablón de
//     corcho con hojas de titulares (barra negra y foto de caimán) e hilo rojo, dos portadas enmarcadas, la tele (el
//     radar del tiempo con un remolino que gira y, a ratos, el telediario con un caimán y la cinta que corre), la puerta
//     del jefe con su estor, la fuente de agua (burbuja cada pocos segundos), el calendario, el reloj y la estantería de
//     archivadores. En medio, los tabiques de las mesas con monitores que cambian, cuatro redactores pequeños (teclea,
//     habla por teléfono, se levanta a estirarse, mira la pantalla), notas clavadas en la tela, carpetas, una planta y un
//     flexo encima, un ventilador que gira y un compañero que pasa por el pasillo de detrás con un café. Moqueta en losetas
//     con juntas en perspectiva, manchas de sol, la silla vacía, la caja de enchufes y tres hojas sueltas. A la izquierda, LA
//     IMPRESORA en su mueble, con su pantallita que cuenta hojas y su luz verde; la hoja que asoma por la bandeja.
//     Delante (redaccionDelante): la mesa del periodista (monitor de lado con titular y foto de caimán, teclado,
//     teléfono con luz, taza con vapor y flexo), el montón de hojas en el suelo que crece con
//     o.papeles 0–1 (de unas pocas a un montículo que tapa el mueble de la impresora y llega a x ≈ 130), las hojas que
//     salen de la impresora y caen dando vueltas hacia la izquierda (o.imprime, por omisión 1; 0 la para) y un ficus
//     en primer término a la derecha. Devuelve suelo 160, libre [98, 262], impresora [72, 136] (la bandeja),
//     maquina [48, 134, 96, 160], mesa [154, 151] (el tablero, x 124–186, cara en y 165), tras: [132, 160, 156] (quien
//     está detrás de la mesa: x 132–160, pies en y 156), tele [140, 84, 180, 100], puerta [196, 84, 218, 110],
//     pila [66, 170] (el centro del montón).
//     Cámara 'impresora': LA IMPRESORA DE CERCA (otro rincón: pared clara con zócalo, la ventana con estor y, enfrente,
//     un hotel art déco menta con balcones, un neón rosa que late, una palmera y nubes; el aire acondicionado con sus
//     cintas que ondean; la portada enmarcada con el caimán, el reloj, la balda del tóner; el tablón de la derecha, el
//     archivador con una planta y la papelera que rebosa). La impresora grande: alimentador con originales, panel con la
//     pantalla que cuenta hojas (cifras), luces, teclado y botón verde; rejilla con calor que tiembla, la ranura con los
//     rodillos que giran, tres bandejas de papel con su número y su nivel, la taza humeante encima y una nota con un
//     caimán. Delante: la hoja que sale colgando de la ranura (titular de dos barras, foto de caimán y líneas), se suelta
//     y cae revoloteando al montón (o.papeles 0–1: de unas hojas a un montículo que tapa las dos bandejas de abajo).
//     Devuelve suelo 170, libre [182, 300], bandeja [120, 117] (la ranura), maquina [22, 72, 178, 178], pila [110, 176].
//   'archivo' (general): UN ARCHIVO PÚBLICO DE FLORIDA: techo de placas con ventilador que gira; pared verde oficina con
//     zócalo de madera con vetas; la ventana alta con persiana (la luz entra en rayos sobre el suelo, con motas, y fuera
//     se mece una palmera); EL NÚMERO «119» GRANDE de latón sobre una placa de madera, encima del mostrador; el letrero
//     de turno con cifras rojas que avanzan (o.turno: el número fijo); el reloj, el tablón de avisos, la foto antigua de
//     un caimán y una salamanquesa que corre por la pared; la ventanilla de cristal del fondo con su funcionario y una
//     fila de gente pequeña que espera tras los postes con cordón (una se abanica, otro mira el reloj); la fuente de
//     agua, la palmera en maceta que mueve el ventilador; detrás del mostrador, los archivadores metálicos (un empleado
//     pequeño va y abre un cajón) y la estantería con cajas numeradas; el cartel plegable de suelo mojado (pictograma); suelo
//     de terrazo con juntas de latón y brillos, y la alfombra granate de la entrada (x 0–128, y 165–179).
//     Delante: EL MOSTRADOR de madera con paneles, la campanilla de latón, la bandeja de impresos, el bolígrafo con
//     cadena, la mampara baja de cristal y el dispensador de números rojo junto a la esquina. Devuelve suelo 162,
//     libre [20, 250], mostrador [140, 141, 230, 157], tras: [152, 220, 150] (la archivera: x 152–220, pies en y 150; se
//     pinta ANTES de redaccionDelante), delante: [140, 230, 166] (quien pide en el mostrador: pies en y 164–168 y se pinta
//     DESPUÉS de redaccionDelante), campanilla [222, 136], n119 [148, 24, 224, 62], turno [234, 22, 272, 38],
//     ventanilla [58, 66, 94, 100], fila [28, 54, 129] (x0, x1, pies de la fila del fondo).
//     Cámara 'cajones': LOS CAJONES DE CERCA: la pared de archivadores metálicos con abolladuras, tiradores, cerraduras y
//     portaetiquetas de latón con números; un cajón abierto en el centro con las fichas en fila (pestañas de colores con
//     cifras); los rayos de la persiana que pasan despacio, motas de polvo y una salamanquesa; o.saca 0–1: la ficha de
//     la pestaña roja sube y sale del cajón (con renglones, un sello y un caimán pequeño). Delante: el frente del cajón
//     abierto con su tirador y la etiqueta «119». Devuelve suelo 170, libre [0, 0], cajon [160, 110] (la pestaña roja,
//     que con o.saca = 1 llega a y 74), frente [95, 127, 225, 170].
const V_REDACCION = {
  redaccion: { cam: 'impresora',
    general: { suelo: 160, libre: [98, 262], impresora: [72, 136], maquina: [48, 134, 96, 160], mesa: [154, 151], tras: [132, 160, 156], tele: [140, 84, 180, 100], puerta: [196, 84, 218, 110], pila: [66, 170] },
    impresora: { suelo: 170, libre: [182, 300], bandeja: [120, 117], maquina: [22, 72, 178, 178], pila: [110, 176] } },
  archivo: { cam: 'cajones',
    general: { suelo: 162, libre: [20, 250], mostrador: [140, 141, 230, 157], tras: [152, 220, 150], delante: [140, 230, 166], campanilla: [222, 136], n119: [148, 24, 224, 62], turno: [234, 22, 272, 38], ventanilla: [58, 66, 94, 100], fila: [28, 54, 129] },
    cajones: { suelo: 170, libre: [0, 0], cajon: [160, 110], frente: [95, 127, 225, 170] } },
};
export function redaccion(R, t, o = {}) {
  const v = e_vista(o);
  if (v.enc === 'redaccion') (v.cam === 'general' ? e_redGeneral : e_redImpresora)(R, t, o);
  else (v.cam === 'general' ? e_archGeneral : e_archCajones)(R, t, o);
  return { encuadre: v.enc, camara: v.cam, ...JSON.parse(JSON.stringify(v.geo)) };
}
export function redaccionDelante(R, t, o = {}) {
  const v = e_vista(o);
  if (v.enc === 'redaccion') { if (v.cam === 'general') e_redGeneralDelante(R, t, o); else e_redImpresoraDelante(R, t, o); }
  else if (v.cam === 'general') e_archGeneralDelante(R, t, o); else e_archCajonesDelante(R, t, o);
}
// ── F · El móvil vertical ─────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Todo el plano es UN MÓVIL EN VERTICAL en el centro (cuerpo x 110–210, y 8–176; pantalla x
// 116–204, y 14–170, con las esquinas redondeadas) sobre el FONDO BORROSO DE LAS REDES: el propio vídeo ampliado,
// desenfocado, oscurecido y tramado en pocos tonos (cambia de color con lo que pasa en la pantalla), con viñeta, el
// resplandor de la pantalla alrededor del móvil, su sombra, y círculos de luz desenfocados (bokeh) que flotan. El móvil
// tiene su marco metálico con brillo, los botones laterales, la isla negra arriba y un reflejo en el cristal.
// LLAMA A movilDelante DESPUÉS DE LOS ACTORES: vuelve a poner todo lo que hay FUERA de la pantalla (fondo y marco; así lo
// que la escena pinte dentro, un coche que entra o sale, queda recortado a la pantalla), el reflejo del cristal y la
// interfaz de la red SIN LETRAS NI LOGOS: arriba, dos rayas de pestañas con la de la derecha subrayada y una lupa; la
// cobertura y la batería; a la derecha, la columna de un avatar redondo con su «+», un corazón, un bocadillo, un
// marcador y una flecha de compartir, cada uno con su número (solo cifras, que suben); abajo a la izquierda, la raya del
// nombre con su «@», dos rayas de texto con «#» y la nota musical con su raya que corre; abajo del todo, la barra de
// progreso del vídeo; y CORAZONES QUE SUBEN desde el corazón; y una franja oscura arriba de la pantalla (y 14–26) para que
// el año se lea tranquilo. LA INTERFAZ OCUPA x 190–204 (la columna) y, abajo, y 151–170 (el nombre, el texto, la nota y
// la barra): los pies van en y ≤ 151 y lo importante, en x 118–188. Opciones de movilDelante: las mismas del plano, más
// o.like (un instante t: doble toque, un corazón grande late en el centro y el corazón de la columna se pone rojo),
// o.corazones false (sin los que suben), o.ui false (sin la interfaz), o.recorta false (no repone lo de fuera).
// Devuelve la ventana del vídeo pantalla: [x0, y0, x1, y1] y el cuerpo del móvil cuerpo: [x0, y0, x1, y1].
//   'causeway' (general): DENTRO DEL MÓVIL, EL PUENTE MACARTHUR CAUSEWAY al atardecer, con la cámara que sigue al coche (el
//     fondo corre hacia la izquierda; o.vel px/s, 36 por omisión, 0 = parado): el cielo tramado de morado a naranja con
//     nubes de tres tonos a tres velocidades, el sol que se pone con su halo, gaviotas y un avión con su luz, el skyline
//     de Miami Beach con ventanas encendidas y balizas rojas que parpadean, un crucero y un velero en la bahía, la
//     columna de reflejos del sol en el agua, el pretil del puente con farolas encendidas, el carril de enfrente con
//     coches que pasan, la mediana con palmeras que se mecen, el carril de delante con sus rayas que corren, el canto del
//     tablero con sus juntas y, debajo, los pilares y el agua con reflejos. La escena pinta el coche (f_cocheMovil) con
//     la bailarina encima. Fuera, a los lados, corazones y estrellas desenfocados que suben. Devuelve suelo 150 (dentro
//     del móvil), libre [118, 188] (x 190–204 es la columna de iconos), pantalla: [116, 14, 204, 170], calzada: [116, 204, 136, 150], sol: [176, 86],
//     horizonte 100, coche: [156, 150] (dónde poner f_cocheMovil para que quede libre de la columna de iconos).
//     Cámara 'feed': EL FEED: el móvil desliza vídeos verticales uno tras otro, y a los lados, desenfocados, otros dos
//     móviles con otros vídeos que se deslizan a la vez. Los vídeos: 0 UN CAIMÁN EN UNA TIENDA (fluorescentes, estantes
//     con productos, la nevera de bebidas, el suelo de baldosas con brillos, el dependiente que asoma tras el mostrador y
//     una lata que rueda delante del caimán), 1 UNA PISCINA (la jaula de mosquitera de Florida con un agujero roto con
//     la forma de algo que entró, la casa, el agua con cáusticos, un flotador de flamenco y el caimán que asoma los ojos),
//     2 UNA PLAYA (olas que rompen, la caseta del socorrista de colores pastel con su bandera, una sombrilla, gaviotas, un
//     velero y un paseante) y 3 EL PUENTE (el mismo de 'causeway'). o.desliza 0–1 recorre los cuatro (0 = la tienda,
//     1/3 la piscina, 2/3 la playa, 1 el puente; entre medias, el deslizamiento); sin o.desliza, desliza solo cada 1,6 s
//     (o.video 0–3 fija uno quieto). Devuelve suelo 150, libre [118, 188], pantalla: [116, 14, 204, 170], video (el
//     índice que se ve), fantasmas: [[44, 34, 92, 146], [228, 34, 276, 146]].
const V_MOVIL = {
  causeway: { cam: 'feed', general: {"col": ["#ff8a4a", "#1a1a3a"], "geo": {"suelo": 150, "libre": [118, 188], "pantalla": [116, 14, 204, 170], "calzada": [116, 204, 136, 150], "sol": [176, 86], "horizonte": 100, "coche": [156, 150], "cuerpo": [110, 8, 210, 176]}}, feed: {"col": ["#2a1a4a", "#1a1a3a"], "geo": {"suelo": 150, "libre": [118, 188], "pantalla": [116, 14, 204, 170], "cuerpo": [110, 8, 210, 176], "fantasmas": [[44, 34, 92, 146], [228, 34, 276, 146]]}} },
};
export function movil(R, t, o = {}) {
  const enc = V_MOVIL[o.encuadre] ? o.encuadre : 'causeway', e = V_MOVIL[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const geo = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) };
  const B = R.buf, feed = cam === 'feed';
  // 1 · el vídeo, dentro de la pantalla (en el feed, uno o dos a la vez mientras se desliza)
  R.recorte(MV_S);
  if (!feed) f_mvPuente(R, t, o);
  else {
    const p = f_mvPos(t, o), i0 = Math.floor(p), u = p - i0;
    geo.video = Math.round(p) % 4;
    if (u < 0.002) f_mvVideo(R, t, i0 % 4, o);
    else {
      if (!f_mv.vb) f_mv.vb = R.nuevo();
      const H = MV_S[3] - MV_S[1] + 1, d = Math.round(u * H);
      for (const [k, yo] of [[i0 % 4, -d], [(i0 + 1) % 4, H - d]]) {
        const prev = R.usar(f_mv.vb); R.recorte(MV_S); f_mvVideo(R, t, k, o); R.usar(prev); R.recorte(MV_S);
        f_mvCopia(B, f_mv.vb, yo);
      }
      // la junta entre los dos vídeos
      const yj = MV_S[1] + H - d; for (let x = MV_S[0]; x <= MV_S[2]; x++) R.pset(x, yj, hex('#0a0a12'));
    }
  }
  R.recorte(null);
  // 2 · el fondo borroso (una sola pasada por la pantalla entera), los móviles fantasma del feed, el bokeh
  f_mvFondo(R, B, t, feed, feed ? f_mvPos(t, o) : 0);
  f_mvBokeh(R, t, feed);
  if (!feed) f_mvReacciones(R, t);
  // 3 · el móvil
  f_mvMarco(R);
  // se guarda el fotograma para que movilDelante reponga lo de fuera de la pantalla
  if (!f_mv.stash) f_mv.stash = R.nuevo();
  f_mv.stash.set(B); f_mv.stashT = t; f_mv.stashB = B;
  return geo;
}
export function movilDelante(R, t, o = {}) {
  const enc = V_MOVIL[o.encuadre] ? o.encuadre : 'causeway', e = V_MOVIL[enc], feed = o.camara === e.cam;
  const B = R.buf;
  if (o.recorta !== false && f_mv.stash && f_mv.stashB === B && f_mv.stashT === t) {
    const S = f_mv.stash, [x0, y0, x1, y1] = MV_S;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      if (x >= x0 && x <= x1 && y >= y0 && y <= y1 && f_mvDentro(x, y, x0, y0, x1, y1, MV_RS)) continue;
      const i = y * 320 + x; B[i] = S[i];
    }
  } else f_mvMarco(R);
  f_mvBrillo(R);
  if (o.ui === false) return;
  for (let y = MV_S[1]; y <= 26; y++) { const a = 0.62 * (1 - (y - MV_S[1]) / 13); for (let x = MV_S[0]; x <= MV_S[2]; x++) if (f_mvDentro(x, y, MV_S[0], MV_S[1], MV_S[2], MV_S[3], MV_RS)) R.pset(x, y, f_mvMez(R.pget(x, y), hex('#06060c'), a)); }
  R.recorte(MV_S);
  f_mvUI(R, t, o, feed ? Math.round(f_mvPos(t, o)) % 4 : 3);
  R.recorte(null);
}
// ── G · El interior de Florida ────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A interiorDelante(R, t, o) DESPUÉS DE LOS ACTORES, con las mismas opciones: pinta solo
// el primer término de los bordes (cañas, hierba, palmitos, una papelera), fuera de libre o a menos de 10 px del suelo,
// así que nunca tapa una cara. La valla de la cárcel y la placa de Britton Hill van DETRÁS de los actores.
//   'cana' (general): CAMPOS DE CAÑA DE AZÚCAR a pleno sol: la REFINERÍA (almacén de chapa, sala de calderas con tres
//     chimeneas que echan vapor a la derecha y balizas rojas, molino azul con la cinta, depósitos de melaza, montones de
//     caña y la grúa que la coge), el DIQUE de hierba del lago Okeechobee a la izquierda con su esclusa y el agua, el tren
//     de vagones de caña que cruza (y 104), el campo segado con la cosechadora, el tractor con su remolque y las garzas
//     que la siguen, la pared de caña que se mece a la izquierda, un camino de tierra con rodadas, un buzón y la rueda de
//     una compuerta de riego, postes de la luz. Devuelve suelo 158, libre [20, 260], horizonte 96, sol, refineria,
//     dique, tren, camino. Delante: matas de caña en x < 18 y x > 294.
//     Cámara 'dique': EN LO ALTO DEL DIQUE: el camino de grava entra a todo lo ancho por delante y se aleja curvándose a
//     la derecha; el lago inmenso detrás (olas en perspectiva, el cabrilleo del sol, un velero, una lancha con su
//     estela, pelícanos, un poste de canal con su 7), tres pescadores pequeños sentados en cubos con el corcho que sube y
//     baja, un banco; abajo a la derecha, el talud, el canal y la caña en hileras. Devuelve suelo 154, libre [30, 195]
//     (más a la derecha el camino ya no llega a y 154), horizonte 84, sol, lago, camino, banco, pescadores.
//     Delante: hierba alta abajo a la izquierda (x < 26).
//   'pueblo': UN PUEBLO DE PLAYA DEL NORTE, algo olvidado: el motel de dos pisos de estuco turquesa desconchado (puertas
//     numeradas, aparatos de aire que gotean, galería con barandilla, escalera, máquina de hielo, un huésped arriba y un
//     perro que duerme y mueve el rabo), el letrero de neón en su poste (una palmera rosa; la ola cian parpadea, el sol
//     está fundido; flecha de bombillas que corren), la torre del agua con un pez, palmeras sabal, la playa y el mar con
//     el muelle y un pescador, la gasolinera con su marquesina, dos surtidores y la tienda, la pick-up vieja aparcada y el
//     asfalto agrietado con arena. Devuelve suelo 160, libre [20, 270], horizonte 96, sol, motel, letrero, surtidores,
//     tienda, pickup, puertasMotel. Delante: hierba y un cubo de arena rojo abajo a la derecha (x > 296).
//     Cámara 'gasolinera': LOS SURTIDORES DE CERCA, DE NOCHE: la marquesina por dentro con sus fluorescentes (uno
//     parpadea) y las polillas, la pared de la tienda con el escaparate (estanterías, el mostrador y el dependiente que
//     va y viene), dos surtidores grandes (las cifras del de la izquierda corren), la NEVERA DE BEBIDAS ENERGÉTICAS que
//     brilla con latas de colores (o.nevera 0–1 abre su puerta y sale el vaho), la nevera del hielo, la jaula del gas y
//     la noche de fuera con un coche que pasa. Devuelve suelo 162, libre [46, 260], surtidores, pistolas, nevera,
//     escaparate, puerta, hielo. Delante: una papelera y el cubo del limpiaparabrisas abajo a la izquierda (x < 36).
//   'britton': BRITTON HILL: un claro en un pinar de pinos de hoja larga (ardilla, pájaro carpintero, mariposas, agujas que
//     caen, manchas de sol que se mueven), el MONTÍCULO de hierba, casi nada (cima en 170, 150), el MONOLITO de granito
//     con su placa de bronce: una montañita y el 345 (solo cifras), la mesa de merendero, el aparcamiento de grava con un
//     coche, el poste de la senda con el excursionista y una tortuga de tierra que cruza. o.bandera 0–1 (el mástil se
//     clava junto a la cima, en x 180, y la banderola naranja con una montaña blanca ondea). Devuelve suelo 160,
//     libre [20, 270], cima:
//     [170, 150], placa: [210, 144] (el centro de la placa; el monolito ocupa x 200–220, y 125–158: los actores, a
//     su lado), mastil, monolito, mesa, coche, poste. Delante: matas de palmito en las esquinas de abajo.
//     Cámara 'capas': EL CORTE DE FLORIDA a pantalla completa: la plataforma de caliza plana (superficie en y 100) en
//     capas con conchas, vieiras, galletas de mar y coral, el acuífero con agua en una cueva, el borde que cae al golfo a
//     la izquierda y, a la derecha (x > 236), los montes de Georgia y las Carolinas de roca gris plegada, con otros
//     azulados detrás. El nivel del mar (o.mar 0–1: y 76 → y 114) es una línea azul punteada de x 20 a 300 con dos
//     flechas; el agua llena lo que queda por debajo (con peces) y lo que sale al aire se cubre de hierba y pinitos; una
//     banderita marca Britton Hill en x 70. Devuelve suelo 170, libre [0, 0] (sin actores), mar: [20, 300], nivelMar (la
//     y de la línea), superficie 100, montes, acuifero, brittonHill.
//   'carcel': LA PUERTA DE LA CÁRCEL DE LEONIDA a pleno sol, sin dramatismo: la valla alta de malla con tres hilos lisos
//     (sin pinchos), la PUERTA CORREDERA (o.abre 0–1: se desliza a la derecha; una luz ámbar gira mientras se mueve), la
//     garita con el vigilante (saluda cuando se abre), el mástil con la bandera, dentro los pabellones bajos, la torre del
//     agua, farolas, aspersores y un carrito de mantenimiento; a la izquierda, el pasto con vacas y la carretera recta que
//     se va al horizonte con un coche que se aleja; delante, el aparcamiento con tres coches y una palmera. Devuelve suelo
//     162, libre [30, 280], puerta: [160, 120, 210, 162], hueco (x del hueco abierto), garita, horizonte, sol, carretera,
//     mastil. Sin delante.
//     Cámara 'carretera': LA CARRETERA RECTA AL ATARDECER que fuga al sol poniente (160, 100), entre pantanos que
//     reflejan el ocaso, cipreses y palmeras sabal, juncos, los postes de la luz que se alejan, pájaros y una garza; un
//     descapotable rosa que se aleja (o.coche 0–1: de cerca a perderse en el horizonte; sin él, cada 8 s). Devuelve suelo
//     160, libre [20, 280], horizonte, sol, fuga, arcenes (los actores, en x 30–85 y 235–290, o en el asfalto).
//     Delante: hierba en las esquinas de abajo.
const V_INTERIOR = {
  cana: { cam: 'dique', general: {"col": ["#7ab04a", "#c8b070"], "geo": {"suelo": 158, "libre": [20, 260]}}, dique: {"col": ["#3ac8d0", "#7ab04a"], "geo": {"suelo": 154, "libre": [30, 280]}} },
  pueblo: { cam: 'gasolinera', general: {"col": ["#f0dca0", "#8a8a84"], "geo": {"suelo": 160, "libre": [20, 270]}}, gasolinera: {"col": ["#1a1a3a", "#8a8a84"], "geo": {"suelo": 162, "libre": [40, 260]}} },
  britton: { cam: 'capas', general: {"col": ["#2a5a34", "#8a7a54"], "geo": {"suelo": 160, "libre": [20, 270], "cima": [170, 150], "placa": [210, 150]}}, capas: {"col": ["#e8dcc0", "#c8b898"], "geo": {"suelo": 170, "libre": [0, 0], "mar": [20, 300]}} },
  carcel: { cam: 'carretera', general: {"col": ["#f0dca0", "#8a8e96"], "geo": {"suelo": 162, "libre": [30, 280], "puerta": [160, 120, 210, 162]}}, carretera: {"col": ["#ff8a4a", "#5a5a56"], "geo": {"suelo": 160, "libre": [20, 280]}} },
};
export function interior(R, t, o = {}) {
  const enc = g_VISTAS[o.encuadre] ? o.encuadre : 'cana', e = g_VISTAS[enc], cam = o.camara === e.cam ? e.cam : 'general', f = e[cam];
  if (!f) return vista(R, t, { ...o, encuadre: enc }, V_INTERIOR);
  return { encuadre: enc, camara: cam, ...f(R, t, o) };
}
export function interiorDelante(R, t, o = {}) {
  const enc = g_VISTAS[o.encuadre] ? o.encuadre : 'cana', e = g_VISTAS[enc], cam = o.camara === e.cam ? e.cam : 'general', f = g_DELANTE[enc + '|' + cam];
  if (f) f(R, t, o);
}
// ── H · El salón de Atom ──────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Exporta las piezas canónicas a_caja y a_mapaLeonida (ver el canon de la cabecera del archivo y
// sus propias cabeceras, más abajo). LLAMA A salonDelante(R, t, o) DESPUÉS DE LOS ACTORES, con las mismas opciones (en
// 'salon' pinta el respaldo del sofá y la mesita baja con la caja; en 'mapa', la mesa de los fans; en los primeros planos,
// nada). Cada vista devuelve { encuadre, camara, suelo, libre, … } con los puntos que se dicen abajo.
//   'salon' (general): EL SALÓN DE ATOM DE NOCHE, en Miami. Pared de estuco coral con la luz cálida de la lámpara de pie y
//     el resplandor azul de la tele; techo con moldura y el VENTILADOR de aspas de madera que gira; a la izquierda, el
//     colgador con el sombrero de explorador y la mochila verde oliva (la guía naranja asoma del bolsillo, el mapa
//     enrollado al lado); el tablón de corcho con el MAPA DE FLORIDA (a_mapaLeonida, florida 1 por omisión), cuatro
//     chinchetas de colores (Miami, Grassrivers, los Cayos, el norte) unidas por un hilo rojo, dos polaroids y una
//     entrada; el CALENDARIO pequeño (playa arriba, rejilla con los días tachados y el 19 rodeado en rojo); la lámpara de
//     pie con una polilla; la TELE plana grande sobre el mueble de teca (barra de sonido, descodificador, la consola blanca
//     con su luz que respira, juegos apilados, una piña de cerámica); la puerta corredera con la noche de Miami (cielo
//     tramado, estrellas, luna, nubes a tres velocidades, torres con ventanas que se encienden, la bahía con reflejos, un
//     avión, un coche que pasa, dos palmeras que se mecen), persianas recogidas y cortina coral; un gecko que sube y baja
//     por la pared; un ave del paraíso en su maceta que se mece; suelo de terrazo con juntas de latón y los reflejos de la
//     lámpara y de la tele; la alfombra tropical. Opciones: o.descarga 0–100 (la barra de la tele con su «%»; a 100, de
//     oro con un visto bueno), o.nota 0–1 (el arte se oscurece y sale el 99 enorme de oro con rayos), o.cien 0–1 (el 99
//     se tambalea empujado; a 1 es un 100), o.pantalla(R, t, cl) (otra imagen en la tele, recortada a cl; p. ej. «el
//     tráiler» o el espejo de feria), o.tele 'apagada', o.calendario 0–1 (≥ 0,66: el círculo del 19 se dibuja), o.tachas
//     0–4 (cruces rojas sobre las chinchetas del mapa), o.florida / o.encendidas / o.montana (para el mapa de la pared),
//     o.noche 0–1 (1 por omisión; < 0,5: el ocaso naranja en la ventana), y para salonDelante o.abierta, o.sacude (la
//     caja) y o.caja false (sin caja). Devuelve suelo 162 (los pies), libre [132, 250] (la x izquierda del actor: se le ve
//     la cara; detrás de la mesita, x 132–205, la mesita tapa solo los pies y algo del pecho; en x 100–131 la caja le
//     taparía la cara; detrás del sofá, x < 100, no va nadie: lo tapan los cojines y el gato), tele [150, 46, 250, 104],
//     pantalla [153, 49, 247, 101], mesa [122, 162] (la caja está en x 114–129, y 139–160; con la tapa abierta llega a
//     x 100), mesita [112, 159, 214, 179], sofa [0, 146, 102, 179], mapa [30, 38, 112, 104],
//     calendario [116, 40, 142, 78], ventana [266, 52, 314, 122], lampara [133, 92], consola [234, 100], mochila [20, 54].
//     Cámara 'mesa': LA MESITA DE CERCA, con el sofá de frente al fondo (cojines con botones, brazos enrollados, la manta
//     de ganchillo, dos cojines de hojas y el gato atigrado que duerme y mueve la cola), la pared con el cuadro del
//     flamenco, otro del ocaso y el aplique; en la mesa de teca (vetas, cercos de vasos, la luz de la tele que parpadea):
//     el bol de palomitas (una salta), el mando, la CAJA grande (a_caja con s 3: o.abierta, o.sacude), la FOTO EN SEPIA
//     (o.foto 0–1: entra desde abajo; una pareja de los años treinta junto a un coche antiguo, sin caras) y el LIBRO viejo
//     con el CANDADO (o.candado 0–1: cae sobre el libro; o.abre 0–1: se abre el arco). Devuelve suelo 170, libre [0, 0],
//     caja [x, y] (su centro), cajaRect, tarjeta [x, y] (la tarjetita, si está abierta), manoCaja [x, y] (donde la coge
//     una mano canónica), foto [220, 133], libro [278, 140], palomitas [62, 122], mando [72, 160].
//   'mapa': LA PARED DEL MAPA (otra pared del estudio): el tablón de corcho grande con el MAPA DE LEONIDA (a_mapaLeonida
//     de 148 px; o.encendidas 0–6, o.florida 0–1, o.montana 0–1), una chincheta en cada región (roja si está encendida)
//     con su hilo rojo hasta una nota de color con su pictograma (caimán, palmera, «?», barco, reloj, globo; las notas se
//     levantan con el aire), las guirnaldas de luces que titilan por turnos; a la izquierda, la estantería con guías de
//     colores, un caimán de peluche, una bola de nieve con un flamenco (nieva), una caracola y un bote de lápices; a la
//     derecha, la lámpara de pie y una palmera de interior que se mece; suelo de tablas. salonDelante pinta la MESA DE LOS
//     FANS (mapas dibujados a mano, papeles, rotuladores, la lupa, el ovillo de hilo rojo, la taza que humea y el portátil
//     con una gráfica). Devuelve suelo 164, libre [14, 116] (de cuerpo entero, junto al mapa), detrasMesa [138, 226]
//     (la x izquierda del actor detrás de la mesa: asoman cabeza y hombros), mapa [80, 30, 228, 127], mesa [124, 156, 316, 179], tablon [44, 24,
//     268, 134], estanteria [2, 40, 40, 150], y regiones, montana, lago (los puntos de a_mapaLeonida).
//     Cámara 'contador': LA PANTALLA DEL ORDENADOR de cerca, sobre el escritorio (teclado, ratón que se mueve, taza que
//     humea, notas pegadas al marco): la miniatura del vídeo (el ocaso con palmeras, play, barra de reproducción), la
//     gráfica de reservas (o.reservas 0–1: las barras crecen, la tendencia punteada y, desde 0,6, la etiqueta amarilla de
//     «estimación» con un «?») y el CONTADOR de visitas con el ojo (o.visitas 0–90, en millones: «90,000,000» con comas;
//     mientras sube corren las últimas cifras y sale una flecha verde; a 90, la corona) y su barrita hacia el récord.
//     Devuelve suelo 170, libre [0, 0], pantalla [40, 30, 264, 134], numero [152, 114], grafica [122, 38, 258, 74],
//     miniatura [46, 38, 114, 74].
//   'calendario' (encuadre nuevo, una sola cámara): EL CALENDARIO DE CERCA, colgado de su clavo: la foto de la playa con
//     el mar que se mueve y palmeras, la franja con 11 y 2026, la rejilla de noviembre (empieza en domingo) con los días 1–18
//     tachados a lápiz; a la izquierda, tres notas: 12/2023 (con el triángulo del tráiler), 2025 y 5/2026; o.calendario
//     0–1: 0–0,3 se tacha 2025, 0,3–0,6 se tacha 5/2026, 0,6–1 se rodea el 19 en rojo (a 1, destellos). Alrededor: la
//     guirnalda de luces, el cuadrito del manatí, el reloj (casi medianoche, con segundero) y la balda con el mando, los
//     lápices y un cactus. Devuelve suelo 170, libre [0, 0], hoja [96, 26, 232, 150], dia19 [x, y], notas, reloj [276, 100].
const V_SALON = {
  salon: { cam: 'mesa', general: { suelo: 162, libre: [132, 250], tele: [150, 46, 250, 104], pantalla: [153, 49, 247, 101], mesa: [122, 162], mesita: [112, 159, 214, 179], sofa: [0, 146, 102, 179], mapa: [30, 38, 112, 104], calendario: [116, 40, 142, 78], ventana: [266, 52, 314, 122], lampara: [133, 92], consola: [234, 100], mochila: [20, 54] },
    mesa: { suelo: 170, libre: [0, 0], caja: [140, 125], foto: [220, 133], libro: [278, 140], palomitas: [62, 122], mando: [72, 160] } },
  mapa: { cam: 'contador', general: { suelo: 164, libre: [14, 116], mapa: [80, 30, 228, 127], mesa: [124, 156, 316, 179], detrasMesa: [138, 226], tablon: [44, 24, 268, 134], estanteria: [2, 40, 40, 150] },
    contador: { suelo: 170, libre: [0, 0], pantalla: [40, 30, 264, 134], numero: [152, 114], grafica: [122, 38, 258, 74], miniatura: [46, 38, 114, 74] } },
  calendario: { cam: '', general: { suelo: 170, libre: [0, 0], hoja: [96, 26, 232, 150], dia19: [0, 0], notas: [[14, 40, 84, 70], [14, 76, 84, 106], [14, 112, 84, 142]], reloj: [276, 100] } },
};
export function salon(R, t, o = {}) {
  const { enc, cam, geo } = h_vista(o);
  if (enc === 'salon') return cam === 'mesa' ? h_salonMesa(R, t, o, geo) : h_salonGeneral(R, t, o, geo);
  if (enc === 'mapa') return cam === 'contador' ? h_contador(R, t, o, geo) : h_paredMapa(R, t, o, geo);
  return h_calendarioCerca(R, t, o, geo);
}
// lo que va por delante de los actores en el salón: en 'salon' (general), el respaldo del sofá a la izquierda (con los
// cojines, la manta y el gato que duerme encima y mueve la cola) y la mesita baja con la caja (a_caja con o.abierta y
// o.sacude; o.caja false: sin caja), el mando, el bol de palomitas (alguna salta) y el vaso de refresco con burbujas;
// en 'mapa' (general), la mesa de trabajo de los fans con mapas dibujados a mano, papeles, rotuladores, la lupa, el ovillo
// de hilo rojo, la taza que humea y el portátil. Los primeros planos no llevan nada delante. Devuelve lo que pinta
// (en 'salon': { caja: lo que devuelve a_caja }).
export function salonDelante(R, t, o = {}) {
  const { enc, cam } = h_vista(o);
  if (cam !== 'general') return {};
  if (enc === 'salon') return h_salonDelante(R, t, o);
  if (enc === 'mapa') return h_mapaDelante(R, t, o);
  return {};
}
// ── Piezas canónicas (esqueletos: las completa su grupo) ─────────────────────────────────────────────────────────────
export function a_caiman(R, x, y, t, o = {}) {
  const s = Math.max(0.5, +(o.s ?? 1)), d = (o.dir ?? 1) < 0 ? -1 : 1, coco = o.especie === 'cocodrilo';
  const P = coco ? c_PIEL.cocodrilo : c_PIEL.caiman, V = coco ? c_VIENTRE.cocodrilo : c_VIENTRE.caiman;
  const k = 0.85 * s, anda = o.anda === true ? 1 : c_lim(+(o.anda || 0)), boca = c_lim(+(o.boca || 0)), agua = c_lim(+(o.agua || 0));
  const ang = boca * 0.45, ca = Math.cos(ang), sa = Math.sin(ang), hund = agua * 5.5, fase = t * 7;
  const alza = anda * (0.45 + Math.sin(fase * 2) * 0.25) + (1 - anda) * Math.sin(t * 1.3) * 0.06;
  const tipU = coco ? 20 : 16, HU = 9.6, HV = -3.0;
  // los contornos, en unidades (mirando a la derecha; v negativa hacia arriba; el suelo en v 0)
  const ondCola = (u) => Math.sin(u * 0.42 + t * (1.6 + anda * 5.4)) * (0.35 + anda * 0.8) * c_lim((-7 - u) / 15);
  const bulto = (u) => 0.45 * (0.5 + 0.5 * Math.cos(u * Math.PI * 2 / 2.2));
  const topU = (u) => (coco ? -5.9 + (u - 9) * (2.0 / (tipU - 9)) : -6.3 + (u - 9) * 0.12);
  const forma = (u, v) => {   // → [parte, f] (f: 0 arriba … 1 abajo dentro de la parte) o null
    // la cabeza: el cráneo y el bulto del ojo
    const dc = ((u - 8.3) / 3.9) ** 2 + ((v + 5.1) / 2.9) ** 2; if (dc <= 1) return [3, (v + 8) / 5.8];
    if (((u - 9.2) / 1.9) ** 2 + ((v + 8) / 1.55) ** 2 <= 1) return [3, 0];
    // la mandíbula de arriba (girada con la boca abierta)
    const qu = u - HU, qv = v - HV, pu = HU + qu * ca - qv * sa, pv = HV + qu * sa + qv * ca;
    if (pu >= 8.6 && pu <= tipU) { const tp = topU(pu); let dentro = pv >= tp && pv <= HV;
      if (dentro && !coco && pu > tipU - 1.7) { const m = (tp + HV) / 2, hh = (HV - tp) / 2; dentro = ((pu - (tipU - 1.7)) / 1.7) ** 2 + ((pv - m) / hh) ** 2 <= 1; }
      if (dentro) return [4, (pv - tp) / Math.max(0.5, HV - tp)];
      if (!coco && ((pu - (tipU - 1.3)) / 0.9) ** 2 + ((pv - topU(tipU - 1.3) + 0.6) / 0.75) ** 2 <= 1) return [4, 0]; }
    // la mandíbula de abajo
    const tipL = tipU - (coco ? 0.5 : 0.9);
    if (u >= 8 && u <= tipL) { const bot = -1.6 - (u - 8) * (coco ? 0.12 : 0.05); let dentro = v >= HV && v <= bot; if (dentro && !coco && u > tipL - 1.4) dentro = ((u - (tipL - 1.4)) / 1.4) ** 2 + ((v - (HV + bot) / 2) / ((bot - HV) / 2)) ** 2 <= 1; if (dentro) return [5, (v - HV) / (bot - HV)]; }
    // dentro de la boca abierta
    if (ang > 0.03 && u > HU - 0.6 && u < HU + (tipU - HU) * ca - 0.3 && v < HV && v > HV - (u - HU) * Math.tan(ang)) return [10, (u - HU) / (tipU - HU)];
    return null;
  };
  const cuerpo = (u, v) => {
    // el cuerpo (un huso) y la cola que se afila y ondea
    if (u >= -8.6 && u <= 8.4) { const e = Math.sqrt(Math.max(0, 1 - (u / 8.6) ** 2)), tp = -4.6 - 3.4 * e - bulto(u) * e, bt = -4.6 + 3.0 * e; if (v >= tp && v <= bt) return [1, (v - tp) / (bt - tp), u]; }
    if (u >= -22 && u < -6) { const c = -4.2 + ondCola(u), th = 0.4 + 2.9 * (u + 22) / 16, tp = c - th - bulto(u) * 0.8 * (th / 2.8), bt = c + th * 0.8; if (v >= tp && v <= bt) return [2, (v - tp) / (bt - tp), u]; }
    return null;
  };
  const pata = (u, v, ub, ph) => {   // una pata: muslo, pie con los dedos hacia delante; con anda, da pasos
    const st = anda * Math.sin(fase + ph) * 1.4, lf = anda * Math.max(0, Math.cos(fase + ph)) * 0.9, cx = ub + st * c_lim((v + 3) / 3);
    if (v > -3.4 && v < -0.9 - lf && Math.abs(u - cx) < 1.4 - (v + 3.4) * 0.1) return true;
    if (v >= -1.4 - lf && v <= -lf && u > cx - 1.3 && u < cx + 2.4) return true;
    return false;
  };
  // la caja en píxeles y la clasificación de cada píxel (la parte, para el contorno y la luz)
  const U0 = -23, U1 = tipU + 1.5, V0 = -11, V1 = 0.5, ys = (v) => y + (v + hund) * k;
  const x0 = Math.floor(Math.min(x + d * U0 * k, x + d * U1 * k)), x1 = Math.ceil(Math.max(x + d * U0 * k, x + d * U1 * k)), y0 = Math.floor(ys(V0 - Math.max(0, ang) * 6)), y1 = Math.ceil(ys(V1));
  const W = x1 - x0 + 1, H = y1 - y0 + 1, Q = new Int8Array(W * H), F = new Float32Array(W * H), UU = new Float32Array(W * H);
  for (let py = y0; py <= y1; py++) for (let px = x0; px <= x1; px++) {
    const u = ((px + 0.5 - x) * d) / k, vg = (py + 0.5 - y) / k - hund, v = vg + alza;   // v: ya con el cuerpo levantado
    let r = forma(u, v), q = 0, f = 0;
    if (r) { q = r[0]; f = r[1]; }
    else if (pata(u, vg, 5.6, 0) || pata(u, vg, -5.4, Math.PI)) { q = 6; f = (vg + 3) / 3; }
    else { const c = cuerpo(u, v); if (c) { q = c[0]; f = c[1]; } else if (pata(u, vg, 6.8, Math.PI) || pata(u, vg, -4.2, 0)) { q = 7; f = 0.5; } }
    const i = (py - y0) * W + (px - x0); Q[i] = q; F[i] = f; UU[i] = u;
  }
  // las ondas en el agua alrededor (por detrás del animal): dos arcos cortos y suaves, delante del hocico y tras el lomo
  if (agua > 0.05) { const A = hex('#e4eeea');
    for (let r = 0; r < 2; r++) { const ph = (t * 0.45 + r * 0.5) % 1, rx = (7 + ph * 9) * k, cxw = x + d * 3 * k;
      for (let a = -0.9; a <= 0.9; a += 0.7 / rx) for (const lado of [0, Math.PI]) { const an = a + lado, px = Math.round(cxw + Math.cos(an) * rx), py = Math.round(y + Math.sin(an) * rx * 0.14); if (c_um(px, py) < ph * 0.9 + 0.25) continue; R.pset(px, py, c_mez(R.pget(px, py), A, 0.5 * (1 - ph))); } } }
  const fuera = (i, dx, dy) => { const xx = (i % W) + dx, yy = ((i / W) | 0) + dy; return xx < 0 || yy < 0 || xx >= W || yy >= H || Q[yy * W + xx] === 0 || Q[yy * W + xx] === 7 && Q[i] !== 7; };
  const ps = (px, py, c) => { if (agua > 0.02 && py >= y) return; R.pset(px, py, c); };
  const fino = s >= 1.5;
  for (let i = 0; i < Q.length; i++) { const q = Q[i]; if (!q) continue; const px = x0 + (i % W), py = y0 + ((i / W) | 0), f = F[i], u = UU[i]; let c;
    if (q === 10) { const bajo = fuera(i, 0, 1) || (Q[i + W] !== 10); c = f < 0.22 ? hex('#5a1e22') : bajo && f > 0.3 ? hex('#e8908a') : hex('#c4585a'); ps(px, py, c); continue; }
    const arriba = fuera(i, 0, -1), lado = fuera(i, -1, 0) || fuera(i, 1, 0), abajo = fuera(i, 0, 1);
    if (q === 7) c = arriba || lado || abajo ? P[0] : P[1];
    else if (arriba && q !== 6) c = (q === 1 || q === 2) && (Math.floor(u * 1.25) & 1) ? P[5] : P[4];   // el lomo con brillo (los bultos)
    else if (lado || abajo) c = P[0];
    else if (q === 1 || q === 2) { const vien = q === 1 ? f > 0.7 : f > 0.84;
      if (vien) c = f > 0.9 && q === 1 ? V[0] : (fino && Math.floor(u * 1.4) % 2 === 0 ? V[0] : V[1]);
      else if (f < 0.22) c = (Math.floor(u * 1.25) + (py & 1)) & 1 ? P[4] : P[3];
      else if (fino && (((u * 0.7) % 1 + 1) % 1 < 0.2 || ((f * 4.5) % 1) < 0.2)) c = P[2];
      else c = f > 0.55 ? P[2] : h(px >> (fino ? 0 : 1), py, 59) < 0.22 ? P[2] : P[3]; }
    else if (q === 3) c = f < 0.3 ? P[4] : f > 0.82 ? V[1] : P[3];
    else if (q === 4) c = f < 0.4 ? P[4] : fino && h(px, py, 60) < 0.12 ? P[2] : P[3];
    else if (q === 5) c = f < 0.45 ? P[2] : V[1];
    else c = f < 0.4 ? P[3] : P[2];
    ps(px, py, c);
    // en el agua: el brillo de la superficie justo debajo de lo que asoma, para que se lea sobre cualquier agua
    if (agua > 0.02 && py === y - 1) R.pset(px, y, c_mez(R.pget(px, y), hex('#e8f2ee'), 0.55));
  }
  // la boca cerrada: la línea en sonrisa; el diente de abajo del cocodrilo; con la boca abierta, los dientecitos romos
  const S = (u, v) => [Math.round(x + d * u * k), Math.round(ys(v - alza))];
  const lin = (a, b, c) => { const n = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]), 1); for (let j = 0; j <= n; j++) ps(Math.round(a[0] + (b[0] - a[0]) * j / n), Math.round(a[1] + (b[1] - a[1]) * j / n), c); };
  if (ang < 0.03) { lin(S(9.4, -3.05), S(tipU - (coco ? 0.8 : 1.4), -3.05), P[0]); lin(S(7.9, -4.1), S(9.4, -3.05), P[0]); }
  const diente = hex('#f6f2e2');
  if (coco) { const [a, b] = S(tipU - 3.6, -3.6); ps(a, b, diente); if (fino) { ps(a, b - 1, diente); const [c2, e2] = S(tipU - 6.2, -3.5); ps(c2, e2, diente); } const [f1, f2] = S(tipU - 1.2, -2.7); if (ang < 0.03) ps(f1, f2, diente); }
  if (ang >= 0.03) for (let uu = HU + 2.2; uu < tipU - 1.5; uu += fino ? 3.2 : 4) { const [a, b] = S(uu, HV - 0.35); ps(a, b, diente); const qu = uu - HU, ru = HU + qu * ca, rv = HV - qu * sa + 0.35; const [c2, e2] = S(ru, rv); ps(c2, e2, diente); }
  // el ojo: amarillo con la pupila negra hacia delante (con brillo a s 2) y el párpado cuando parpadea; las narinas
  const [ex, ey] = S(9.6, -8.2), cierra = o.parpadeo !== false && ((t + x * 0.013) % 4.1) < 0.14, am = hex('#f0cc3a'), pu = hex('#141408');
  if (cierra) { ps(ex, ey, P[1]); ps(ex - d, ey, P[1]); if (fino) { ps(ex + d, ey, P[1]); ps(ex, ey - 1, P[3]); ps(ex - d, ey - 1, P[3]); } }
  else if (fino) { for (const [i, j] of [[-1, 0], [0, 0], [1, 0], [-1, -1], [0, -1], [1, -1], [0, 1], [-1, 1]]) ps(ex + i * d, ey + j, am); ps(ex + d, ey, pu); ps(ex + d, ey - 1, pu); ps(ex + d, ey + 1, P[2]); ps(ex - d, ey - 1, hex('#fffbe0')); ps(ex, ey - 2, P[5]); ps(ex - d, ey - 2, P[4]); }
  else { ps(ex - d, ey, am); ps(ex, ey, pu); ps(ex - d, ey - 1, am); ps(ex, ey - 1, hex('#fff6c0')); }
  if (!coco) { const [nx, ny] = S(tipU - 1.3, topU(tipU - 1.3) - 0.9); ps(nx, ny, P[0]); if (fino) ps(nx - d, ny, P[0]); }
  else { const [nx, ny] = S(tipU - 0.9, topU(tipU - 0.9) - 0.1); ps(nx, ny, P[1]); }
  return { hocico: S(tipU, -3.6), cola: S(-22, -3.9), ojo: [ex, ey], caja: [x0, y0, x1, y1] };
}
// a_caja (grupo H): LA CAJA DE LA EDICIÓN FÍSICA, de pie y de frente: el estuche de plástico azul oscuro con el lomo
// estriado a la izquierda, la franja clara de arriba, la portada (el ocaso de morado a naranja con el sol a franjas, el mar
// con su reflejo y dos palmeras a contraluz, SIN letras), la franja de abajo con un recuadrito blanco y rayas, el brillo
// del plástico y su sombra en la mesa. (x, y) es la esquina de arriba a la izquierda; mide 16 × 22 px por o.s (1 por
// omisión; 2 o 3 en los planos de cerca). Opciones: o.abierta 0–1 (la tapa gira sobre el lomo hacia la izquierda: hasta
// 0,5 se ve la portada que se estrecha y detrás la bandeja; desde 0,5, el interior de la tapa a la IZQUIERDA del lomo, que
// llega hasta x − 14·s con la caja abierta del todo): dentro, la bandeja vacía con el eje del disco (sin disco) y la
// tarjetita blanca con el código de barras, que es lo único que trae; o.sacude 0–1 (la caja tiembla de lado a lado con
// rayitas de movimiento y la tarjetita baila dentro); o.sombra (false: sin sombra). Devuelve { caja: [x0, y0, x1, y1],
// tarjeta: [cx, cy] (el centro de la tarjetita), bisagra: x del lomo, mano: [x, y] (donde la coge una mano canónica, en el
// canto derecho) }.
export function a_caja(R, x, y, t, o = {}) {
  const { pset } = R, s = Math.max(1, Math.round(o.s ?? 1)), ab = Math.max(0, Math.min(1, o.abierta ?? 0)), sac = Math.max(0, Math.min(1, o.sacude ?? 0));
  const dx = Math.round(Math.sin(t * 38) * 2 * s * sac), dy = -Math.round(Math.abs(Math.sin(t * 19)) * s * sac);
  const X = Math.round(x) + dx, Y = Math.round(y) + dy, W = 16 * s, H = 22 * s, K = C.k, P = h_CAJA;
  const re = (x0, y0, x1, y1, c) => R.rect(x0, y0, x1, y1, c);
  // la sombra en la mesa (oscurece lo que haya debajo)
  if (o.sombra !== false) for (let j = 1; j <= Math.max(2, s + 1); j++) for (let i = -1; i <= W + 2 * s; i++) if (h_b4(X + i, Y + H + j) < 0.6 - j * 0.12) h_tinte(R, X + i + s, Y + H + j - 1, 0.45, h_NEGRO);
  const hinge = X + 2 * s, th = ab * Math.PI, wl = Math.round((W - 2 * s) * Math.abs(Math.cos(th))), alza = Math.round(Math.sin(th) * 2 * s);
  // el cuerpo trasero y la bandeja (lo que se ve cuando la tapa se abre)
  const bandeja = () => {
    re(hinge, Y, X + W - 1, Y + H - 1, K); re(hinge + 1, Y + 1, X + W - 2, Y + H - 2, P.bandeja);
    for (let j = Y + 2; j < Y + H - 2; j += 2) for (let i = hinge + 2; i < X + W - 2; i++) if (h_b4(i, j) < 0.3) pset(i, j, P.bandejaS);
    // el eje del disco, vacío: el hueco redondo donde iría el disco y los dientes blancos del centro
    const cx = Math.round((hinge + X + W - 1) / 2), cy = Y + Math.round(H * 0.42), r = Math.max(2, Math.round(6.2 * s));
    for (let a = 0; a < 6.283; a += 0.5 / r) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), P.bandejaL);
    R.disco(cx, cy, Math.max(1, Math.round(2.2 * s)), P.eje); R.disco(cx, cy, Math.max(0, Math.round(1.1 * s)), P.bandeja);
    if (s > 1) for (let k = 0; k < 8; k++) { const a = k * 0.785; pset(Math.round(cx + Math.cos(a) * 2 * s), Math.round(cy + Math.sin(a) * 2 * s), C.blanco); }
    // la tarjetita con el código, sujeta abajo; baila si se sacude
    const tx = cx + Math.round(Math.sin(t * 23) * s * sac * 1.5), ty = Y + Math.round(H * 0.72) + Math.round(Math.cos(t * 29) * s * sac), tw = Math.max(4, Math.round(4.5 * s)), tH = Math.max(3, Math.round(3 * s));
    re(tx - tw, ty - tH, tx + tw, ty + tH, K); re(tx - tw + 1, ty - tH + 1, tx + tw - 1, ty + tH - 1, C.blanco);
    for (let i = tx - tw + 2; i < tx + tw - 1; i++) if (h(i - tx, 3, 401) > 0.35 || s === 1) for (let j = ty - tH + 2; j <= ty + (s > 1 ? 0 : tH - 2); j++) pset(i, j, (i + (s > 1 ? 0 : j)) % 2 ? K : C.blanco);
    if (s > 1) { re(tx - tw + 2, ty + 1, tx - tw + 2 + s, ty + tH - 2, K); pset(tx + tw - 3, ty + tH - 2, hex('#e83a5a')); }
    // las patillas de plástico que la sujetan
    re(hinge + 2, Y + H - 3 * s, hinge + 2 + s, Y + H - 2, P.bandejaL); re(X + W - 3 - s, Y + H - 3 * s, X + W - 3, Y + H - 2, P.bandejaL);
    return [tx, ty];
  };
  let tarjeta = [hinge + 7 * s, Y + Math.round(H * 0.72)];
  if (ab > 0.02) tarjeta = bandeja();
  if (ab <= 0.5) {
    // la tapa de frente (se estrecha al girar): el canto, la franja de arriba, la portada y la franja de abajo
    const x1 = ab > 0.02 ? hinge + wl : X + W - 1;
    if (x1 > hinge + 1) for (let i = hinge; i <= x1; i++) { const f = (i - hinge) / Math.max(1, x1 - hinge), e = Math.round(alza * f), y0 = Y - e, y1 = Y + H - 1 + e;
      for (let j = y0; j <= y1; j++) {
        let c; const v = (j - y0) / (y1 - y0);
        if (i === hinge || i === x1 || j === y0 || j === y1) c = K;
        else if (v < 2.2 / 22) c = (v < 1.2 / 22) ? P.franjaL : P.franja;
        else if (v > 18.3 / 22) { c = P.cuerpo; if (s > 1 && f > 0.08 && f < 0.32 && v > 19 / 22 && v < 21 / 22) c = C.blanco; else if (f > 0.42 && f < 0.92 && Math.abs(v - 20 / 22) < 0.3 / 22 + 0.5 / H) c = P.raya; }
        else if (f < 0.07 || f > 0.95) c = P.cuerpo;
        else c = h_arteCaja((f - 0.07) / 0.88, (v - 2.2 / 22) / (16.1 / 22), i, j);
        // el brillo del plástico: una banda en diagonal
        const d = (f * 0.7 + v) * 1.0; if (j !== y0 && j !== y1 && i !== hinge && i !== x1 && d > 0.28 && d < 0.36 && h_b4(i, j) < 0.55) c = h_mezcla(c, C.blanco, 0.45);
        pset(i, j, c);
      } }
  } else {
    // el interior de la tapa, a la izquierda del lomo, con sus dos patillas
    const x0 = hinge - wl;
    for (let i = x0; i <= hinge; i++) { const f = (hinge - i) / Math.max(1, wl), e = Math.round(alza * f), y0 = Y - e, y1 = Y + H - 1 + e;
      for (let j = y0; j <= y1; j++) pset(i, j, i === x0 || j === y0 || j === y1 ? K : (j - y0 < 2 || y1 - j < 2) ? P.bandejaL : h_b4(i, j) < 0.2 ? P.bandejaS : P.tapaIn); }
    if (wl > 4) for (const v of [0.18, 0.82]) { const j = Math.round(Y + H * v); R.rect(Math.round(x0 + wl * 0.35), j, Math.round(x0 + wl * 0.6), j + Math.max(1, s - 1), P.bandejaL); }
  }
  // el lomo estriado
  R.rect(X, Y, hinge, Y + H - 1, K); R.rect(X + 1, Y + 1, hinge - 1, Y + H - 2, P.lomo);
  for (let j = Y + 2; j < Y + H - 2; j += Math.max(2, s)) R.rect(X + 1, j, hinge - 1, j, P.lomoL);
  // las rayitas de la sacudida
  if (sac > 0.15) { const f = Math.floor(t * 12) % 2; for (const [sx, lado] of [[X - 3 - 2 * s, -1], [X + W + 2 + 2 * s, 1]]) for (let k = 0; k < 3; k++) { const yy = Y + Math.round(H * (0.25 + k * 0.25)) + (f ? 1 : -1); R.linea(sx, yy, sx + lado * (2 + s), yy - 1 - f, C.blanco); } }
  return { caja: [X - (ab > 0.5 ? wl : 0), Y, X + W - 1, Y + H - 1], tarjeta, bisagra: hinge, mano: [X + W + 1, Y + Math.round(H * 0.55)] };
}
// a_mapaLeonida (grupo H): EL MAPA DE LEONIDA, una hoja apaisada de w × h px (h = round(w · 0,66)) con (x, y) en su
// esquina de arriba a la izquierda: el mar del golfo y del Atlántico con su plataforma turquesa junto a la costa, las olas
// que se mueven, la cuadrícula punteada de los grados, la rosa de los vientos y un barquito (si w ≥ 100), Georgia y
// Alabama en gris rayado arriba, las Bahamas a la derecha, y la península con sus seis regiones (en este orden):
// 0 Vice City (abajo a la derecha, rosa), 1 los Cayos (la hilera de islas del sur, turquesa), 2 Grassrivers (el centro
// sur, verde de marisma), 3 Ambrosia (junto al lago, oro de caña), 4 Port Gellhorn (al norte, en la costa del golfo,
// naranja) y 5 Mount Kalaga (al norte, verde pino, con su montaña nevada). o.encendidas 0–6: cuántas regiones tienen su
// color (las demás, papel con las fronteras punteadas; un valor con decimales llena la siguiente a medias, tramada; la
// última encendida late) y, si w ≥ 90, su icono (palmera, puente, caimán, caña, ancla, montaña). o.florida 0–1: el
// contorno se funde con el de la Florida de verdad (los Cayos menudos, la costa con sus bahías) y la montaña se hunde
// (Florida no tiene montañas). o.montana 0–1 (1 por omisión): la montaña de Kalaga sale del suelo. o.mar (false: sin
// mar ni cuadrícula, solo la tierra, para ponerla sobre otro fondo). Devuelve { h, regiones: { vicecity, cayos,
// grassrivers, ambrosia, portgellhorn, kalaga: [x, y] }, montana: [x, y], lago: [x, y], miami: [x, y] }.
export function a_mapaLeonida(R, x, y, w, t, o = {}) {
  w = Math.max(24, Math.round(w)); x = Math.round(x); y = Math.round(y);
  const fl = Math.max(0, Math.min(1, o.florida ?? 0)), enc = Math.max(0, Math.min(6, o.encendidas ?? 0)), mar = o.mar !== false;
  const M = h_mascaraMapa(w, Math.round(fl * 10) / 10), H = M.h, { pset } = R, P = h_MAPA;
  const ultima = Math.ceil(enc) - 1, late = 0.5 + 0.5 * Math.sin(t * 5);
  for (let j = 0; j < H; j++) for (let i = 0; i < w; i++) {
    const k = j * w + i, r = M.reg[k], f = M.fl[k], X = x + i, Y = y + j;
    if (r < 0) { if (!mar) continue;
      let c = f & 4 ? P.somero : f & 8 ? P.medio : P.mar;
      if (!(f & 12) && (j % 5 === 2) && ((i + Math.floor(t * 3 + j * 1.7)) % 11 < 2)) c = P.ola;
      if (!(f & 12) && M.grid[k]) c = P.rejilla;
      pset(X, Y, c); continue; }
    if (r === 7 && !mar) continue;
    if (f & 1) { pset(X, Y, P.costa); continue; }
    let c;
    if (r === 6) c = (i + j + Math.floor(t * 2)) % 7 === 0 ? P.somero : P.lago;
    else if (r === 7) c = (i - j) % 4 === 0 ? P.vecinoS : P.vecino;
    else { const lleno = r < Math.floor(enc) || (r === Math.floor(enc) && h_b4(X, Y) < enc - Math.floor(enc));
      if (lleno) { const RC = P.reg[r]; c = h(i >> 1, j >> 1, 410 + r) > 0.82 ? RC[0] : h((i + 1) >> 1, j >> 1, 411) > 0.9 ? RC[2] : RC[1]; if (r === ultima && h_b4(X, Y) < late * 0.35) c = RC[2]; }
      else c = h(i >> 1, j >> 1, 412) > 0.85 ? P.papelS : P.papel;
      if (f & 2) c = lleno ? P.regBorde[r] : ((i + j) & 1 ? P.papelS : P.borde); }
    pset(X, Y, c);
  }
  const g = (lon, lat) => [Math.round(x + M.px(lon)), Math.round(y + M.py(lat))];
  const out = { h: H, regiones: {}, montana: g(-82.3, 29.3), lago: g(-80.83, 26.95), miami: g(-80.2, 25.78) };
  ['vicecity', 'cayos', 'grassrivers', 'ambrosia', 'portgellhorn', 'kalaga'].forEach((n, r) => { out.regiones[n] = [x + M.cen[r][0], y + M.cen[r][1]]; });
  // la montaña de Kalaga: sale del suelo; con la Florida de verdad se hunde
  const mo = (o.montana ?? 1) * (1 - fl);
  if (mo > 0.05) { const [mx, my] = out.montana, mh = Math.round(Math.max(3, w * 0.07) * mo), mw = Math.round(Math.max(3, w * 0.06));
    R.poligono([[mx - mw - 1, my + 1], [mx, my - mh - 1], [mx + mw + 1, my + 1]], C.k); R.poligono([[mx - mw, my], [mx, my - mh], [mx + mw, my]], P.monte);
    R.poligono([[mx, my - mh], [mx + mw, my], [mx + 1, my]], P.monteS); if (mh > 4) R.poligono([[mx - Math.round(mw * 0.4), my - Math.round(mh * 0.6)], [mx, my - mh], [mx + Math.round(mw * 0.4), my - Math.round(mh * 0.6)]], C.blanco); }
  if (mar && w >= 100) {
    // la rosa de los vientos en el golfo y un barquito que cruza despacio
    const [rx, ry] = g(-87.6, 25.4); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 - Math.PI / 2, l = k % 2 ? 3 : 7; R.linea(rx, ry, Math.round(rx + Math.cos(a) * l), Math.round(ry + Math.sin(a) * l), k === 0 ? C.rojo : P.costa); } R.disco(rx, ry, 1, P.papel);
    const u = (t / 30) % 1, [bx, by] = g(-88.4 + u * 3.2, 27.6 + Math.sin(u * 6) * 0.2); R.rect(bx - 2, by, bx + 2, by, P.costa); R.rect(bx - 1, by + 1, bx + 1, by + 1, P.costa); R.linea(bx, by - 1, bx, by - 4, P.costa); R.pset(bx + 1, by - 3, C.blanco); R.pset(bx + 1, by - 2, C.blanco);
    if ((t * 2) % 1 < 0.5) R.pset(bx - 3, by + 1, P.ola);
  }
  // los iconos de las regiones encendidas
  if (w >= 90) for (let r = 0; r < Math.min(6, Math.floor(enc + 0.5)); r++) { if (r === 5) continue; const [cx, cy] = out.regiones[['vicecity', 'cayos', 'grassrivers', 'ambrosia', 'portgellhorn', 'kalaga'][r]];
    const b = r === ultima ? Math.round(Math.sin(t * 5)) : 0; h_iconoMapa(R, r, cx, cy - 1 - b); }
  return out;
}
// qué vista piden las opciones
function a_vcVista(o) {
  const enc = o.encuadre === 'playa' ? 'playa' : 'ocean';
  const cam = enc === 'ocean' ? (o.camara === 'terraza' ? 'terraza' : 'general') : (o.camara === 'coche' ? 'coche' : 'general');
  return { enc, cam };
}

// el estado de un fotograma: la noche y el tinte para lo que se pinta encima del fondo
function a_vcEstado(t, o) { const noche = a_vcLim(o.noche ?? 0); return { t, o, noche, tn: a_vcTinte(noche) }; }

const a_vcLim = (u) => Math.max(0, Math.min(1, u));

// el umbral de la trama ordenada 4 × 4 (0–1)
const A_VC_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const a_vcB4 = (x, y) => A_VC_B4[((y & 3) << 2) | (x & 3)];

// mezcla de dos colores (a = 0 el primero, 1 el segundo)
function a_vcMez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// el color de noche de un color del ocaso: oscuro y morado azulado (la noche de Miami)
function a_vcNoct(c) {
  const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255;
  return (0xff000000 | (Math.min(255, Math.round(b * 0.4 + 34)) << 16) | (Math.min(255, Math.round(g * 0.26 + 12)) << 8) | Math.min(255, Math.round(r * 0.32 + 16))) >>> 0;
}

// el tinte (con caché) para lo que se pinta en cada fotograma: el color de día, el de noche o la mezcla
const a_vcTintes = new Map();

function a_vcTinte(n) {
  const q = Math.round(n * 24); let f = a_vcTintes.get(q); if (f) return f;
  const nn = q / 24, cache = new Map();
  f = nn <= 0 ? (c) => c : (c) => { let v = cache.get(c); if (v === undefined) { v = a_vcMez(c, a_vcNoct(c), nn); cache.set(c, v); } return v; };
  a_vcTintes.set(q, f); return f;
}

// la zona tranquila (Atom y la barra del año): ahí el cielo solo lleva cosas suaves
const a_vcCalma = (x, y) => (x > 270 && y < 48) || (x >= 14 && x <= 176 && y < 22);

// rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function a_vcR(R, x0, y0, x1, y1, c, cl) {
  if (cl) { x0 = Math.max(x0, cl[0]); y0 = Math.max(y0, cl[1]); x1 = Math.min(x1, cl[2]); y1 = Math.min(y1, cl[3]); }
  if (x1 >= x0 && y1 >= y0) R.rect(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), c);
}

// aclara u oscurece lo ya pintado: mezcla el píxel con c
function a_vcVela(R, x, y, c, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, a_vcMez(R.pget(x, y), c, a)); }

// degradado tramado de arriba abajo entre y0 e y1: P = [[fracción, color], …]
function a_vcDegradado(R, y0, y1, P) {
  const B = R.buf, alto = y1 - y0, tr = 3, lim = P.map(([f]) => y0 + Math.round(f * alto));
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = a_vcB4(x, y) < p ? b : a;
  }
}

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma. ctx.marca()
// fija la máscara del cielo (lo pintado hasta ahí); ctx.oscurece() pasa a la noche todo lo que no es cielo
const a_vcCapas = new Map();

function a_vcCapa(R, clave, dibuja) {
  let c = a_vcCapas.get(clave); if (c) return c;
  const b = R.nuevo(), prev = R.usar(b), m = new Uint8Array(57600); let foto = null;
  const ctx = { marca: () => { foto = b.slice(); }, oscurece: () => { for (let i = 0; i < 57600; i++) if (!foto || b[i] !== foto[i]) b[i] = a_vcNoct(b[i]); } };
  dibuja(ctx);
  if (foto) for (let i = 0; i < 57600; i++) m[i] = b[i] === foto[i] ? 1 : 0;
  R.usar(prev); c = { b, m }; a_vcCapas.set(clave, c); return c;
}

// copia el fondo de la vista: el del ocaso, el de la noche o, entre medias, la mezcla de los dos (una pasada)
function a_vcFondo(R, clave, noche, dibuja) {
  if (noche < 0.02 || noche > 0.98) { const n = noche > 0.5 ? 1 : 0, c = a_vcCapa(R, clave + '|' + n, (ctx) => dibuja(n, ctx)); R.copiar(c.b); return c; }
  const a = a_vcCapa(R, clave + '|0', (ctx) => dibuja(0, ctx)), b = a_vcCapa(R, clave + '|1', (ctx) => dibuja(1, ctx)), B = R.buf;
  for (let i = 0; i < 57600; i++) { const p = a.b[i], q = b.b[i]; B[i] = p === q ? p : a_vcMez(p, q, noche); }
  return a;
}

const A_VC = pal({
  rosa: '#f4a8c0', rosaS: '#d4849e', rosaL: '#ffd4e0', rosaD: '#a8607a',
  menta: '#9ae0c8', mentaS: '#6cb8a0', mentaL: '#d0f6e6', mentaD: '#4a8a78',
  amar: '#f8e098', amarS: '#dab46a', amarL: '#fff4cc', amarD: '#a8864a',
  azul: '#9ac8f0', azulS: '#6c9ad0', azulL: '#d6ecff', azulD: '#4a6aa0',
  lila: '#c8b0e8', lilaS: '#a088c8', lilaL: '#ece0fa', lilaD: '#7a62a0',
  trim: '#fbf4ec', trimS: '#d8ccc4', marco: '#3a3048', borde: '#1e1828',
  crisA: '#e8a8c0', crisB: '#9a80b0', crisC: '#5a4a7a', crisL: '#fff0f4',
  luz: '#ffd890', luzL: '#fff4d0', luzS: '#f0b060', interior: '#f6c890', interiorS: '#c88a5a',
  borde2: '#ffd8a0', ocasoL: '#ffe0a0',
  asfalto: '#5e4c66', asfaltoS: '#4c3c56', asfaltoL: '#76627a', raya: '#f0d070', bordillo: '#e8dcd4', bordilloS: '#a8989c',
  acera: '#ecd6c8', aceraS: '#d4b8aa', aceraL: '#fbe8dc', paseo: '#f0c4b0', paseoS: '#dca896', paseoL: '#fbdccc',
  coral: '#e2d2ae', coralS: '#bca880', coralD: '#9a8862', cesped: '#5aa04a', cespedS: '#3e7a36', cespedL: '#86c45a',
  tronco: '#b0906c', troncoS: '#7e6248', troncoL: '#d2b48e', hoja: '#3e9a4a', hojaS: '#256a34', hojaL: '#7ac85a', coco: '#7a5a2a',
  farola: '#2e4a5a', farolaL: '#5a7a8a',
  piel: '#f0c09a', pielS: '#c8906a', pielM: '#a8704a', pielO: '#6a4430',
});

const A_VC_CIELO_D = [[0, '#4a2e7a'], [0.16, '#6e3a8c'], [0.34, '#a84e92'], [0.52, '#e06e8e'], [0.68, '#ff9474'], [0.84, '#ffb874'], [1, '#ffd890']].map(([f, c]) => [f, hex(c)]);

const A_VC_CIELO_N = [[0, '#0c0a24'], [0.3, '#161236'], [0.55, '#221a4c'], [0.78, '#36225e'], [1, '#56306e']].map(([f, c]) => [f, hex(c)]);

// los tres tonos de las nubes del ocaso (iluminadas desde abajo) y de noche: [sombra arriba, cuerpo, luz abajo]
const A_VC_NUBE_D = ['#9a4a8e', '#e47c9c', '#ffc890'].map(hex), A_VC_NUBE_N = ['#1e163e', '#2e2452', '#4c3c74'].map(hex);

// disco en el cielo (m: máscara de la capa); en la zona tranquila, suave
function a_vcDiscoM(B, m, cx, cy, r, c) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, Math.ceil(cy + r)), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, Math.ceil(cx + r)), r2 = r * r;
  for (let y = y0; y <= y1; y++) { const dy = y + 0.5 - cy, f = y * 320; for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx; if (dx * dx + dy * dy <= r2 && m[f + x]) B[f + x] = a_vcCalma(x, y) ? a_vcMez(B[f + x], c, 0.15) : c; } }
}

// cúmulo del ocaso: la sombra arriba, el cuerpo y la luz dorada por debajo (el sol ya está bajo)
function a_vcNube(B, m, cx, cy, w, sem, c, ap = 1) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.13 + 0.15 * Math.cos(u * Math.PI) + 0.06 * h(i, sem, 611)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.4 + (h(i, sem, 612) - 0.5) * w * 0.06 * ap, r]); }
  for (const [x, y, r] of bolas) a_vcDiscoM(B, m, x, y - 1, r, c[0]);
  for (const [x, y, r] of bolas) a_vcDiscoM(B, m, x, y + 1, r * 0.92, c[1]);
  for (const [x, y, r] of bolas) a_vcDiscoM(B, m, x + 1, y + r * 0.55, r * 0.55, c[2]);
}

// el cielo que se mueve: cirros rosas casi quietos, cúmulos a dos velocidades, estrellas que titilan de noche y gaviotas
function a_vcCielo(R, t, m, noche, hor, o = {}) {
  const B = R.buf, cs = [0, 1, 2].map((i) => a_vcMez(A_VC_NUBE_D[i], A_VC_NUBE_N[i], noche));
  if (noche > 0.3) for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 720) * 319), y = Math.round(h(k, 2, 720) ** 1.4 * (hor - 10)); if (a_vcCalma(x, y) || !m[y * 320 + x]) continue; const tw = Math.sin(t * (1.2 + h(k, 3, 720) * 2) + k * 1.7); if (tw > -0.3) B[y * 320 + x] = a_vcMez(B[y * 320 + x], tw > 0.55 ? hex('#fff4ff') : hex('#9a8ac8'), (noche - 0.3) / 0.7); }
  // cirros: hilos largos que reciben la última luz
  for (let k = 0; k < 4; k++) { const w = 50 + Math.round(h(k, 5, 721) * 50), x0 = ((h(k, 6, 721) * 440 + t * (0.8 + k * 0.3)) % 480) - 100, y = 24 + k * 9 + Math.round(h(k, 7, 721) * 6);
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i), yy = y - Math.round(Math.sin(i / w * Math.PI) * 2); if (x < 0 || x > 319 || yy < 0 || yy >= hor || !m[yy * 320 + x] || h(i >> 2, k, 722) < 0.18) continue; const i0 = yy * 320 + x, c = i % 5 ? cs[1] : cs[2]; B[i0] = a_vcCalma(x, yy) ? a_vcMez(B[i0], c, 0.25) : c; if (i % 3 === 0 && yy + 1 < 180 && m[i0 + 320]) B[i0 + 320] = a_vcMez(B[i0 + 320], cs[0], 0.6); } }
  // cúmulos: los grandes cerca, más deprisa; los pequeños lejos, despacio, junto a los tejados
  const N = o.nubes ?? 6;
  for (let k = N - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 34 + k * 10 : 18 + ((k * 7) % 11), vv = cerca ? 2.4 + k * 0.8 : 0.9 + k * 0.25, y = cerca ? (o.yCerca ?? 28) + k * 10 : hor - 26 - (k - 2) * 7, x = ((h(k, 8, 723) * 470 + t * vv) % 520) - 100;
    a_vcNube(B, m, x, y, w, k + 3, cs, cerca ? 0.8 : 0.65); }
  // gaviotas que planean (y alguna bate las alas)
  const cg = a_vcMez(hex('#3a2a4a'), hex('#e8e0f0'), noche * 0.6);
  for (let k = 0; k < (o.gaviotas ?? 4); k++) { const x = ((h(k, 1, 724) * 360 + t * (7 + k * 2)) % 380) - 30, y = 30 + h(k, 2, 724) * (hor - 50) + Math.sin(t * 0.7 + k) * 4; a_vcGaviota(R, Math.round(x), Math.round(y), t, k, cg); }
}

// una gaviota de 5 px que bate las alas (no en la zona tranquila)
function a_vcGaviota(R, x, y, t, k, c) {
  if (a_vcCalma(x, y) || a_vcCalma(x + 3, y)) return;
  const f = Math.floor(t * 5 + k * 1.3) % 4, ala = f === 0 ? -2 : f === 1 || f === 3 ? -1 : 0;
  R.pset(x, y, c); R.pset(x - 1, y + Math.min(0, ala + 1), c); R.pset(x + 1, y + Math.min(0, ala + 1), c); R.pset(x - 2, y + ala, c); R.pset(x + 2, y + ala, c); if (ala === 0) { R.pset(x - 3, y + 1, c); R.pset(x + 3, y + 1, c); }
}

// el sol bajo del ocaso con su halo tramado (en la capa fija)
function a_vcSol(R, cx, cy, r) {
  for (let y = cy - r * 3; y <= cy + r * 3; y++) for (let x = cx - r * 3; x <= cx + r * 3; x++) { const d = Math.hypot(x - cx, y - cy); if (d > r && d < r * 3 && (1 - (d - r) / (r * 2)) ** 1.5 > a_vcB4(x, y) + 0.1) R.pset(x, y, a_vcMez(R.pget(x, y), hex('#fff0b0'), 0.35)); }
  R.disco(cx, cy, r + 1, hex('#ffd890')); R.disco(cx, cy, r, hex('#fff2c4')); R.disco(cx - 2, cy - 2, r * 0.6, hex('#fffbe8'));
  for (const [dy, w] of [[3, 0.9], [6, 0.7]]) R.rect(Math.round(cx - r * w), cy + dy, Math.round(cx + r * w), cy + dy, hex('#ffb880'));
}

// la luna (en la capa fija de noche)
function a_vcLuna(R, cx, cy) {
  R.halo(cx, cy, 14, [hex('#2a2052'), hex('#3a2c66')], 1.0);
  R.disco(cx, cy, 6, hex('#f4ecd8')); R.disco(cx + 3, cy - 2, 5, R.pget(cx + 9, cy - 9)); R.pset(cx - 3, cy + 2, hex('#d8ccb0')); R.pset(cx - 4, cy - 1, hex('#d8ccb0'));
}

// estuco pintado: el color, un moteado de dos tonos, la sombra del canto derecho y la luz del izquierdo; P = [c, cS, cL]
function a_vcEstuco(R, x0, y0, x1, y1, P, k = 0) {
  R.rect(x0, y0, x1, y1, P[0]);
  const n = Math.round((x1 - x0 + 1) * (y1 - y0 + 1) / 11);
  for (let i = 0; i < n; i++) { const x = x0 + Math.floor(h(i, 1, 730 + k) * (x1 - x0 + 1)), y = y0 + Math.floor(h(i, 2, 730 + k) * (y1 - y0 + 1)); R.pset(x, y, i % 3 ? a_vcMez(P[0], P[1], 0.45) : a_vcMez(P[0], P[2], 0.6)); }
  R.rect(x1 - 1, y0, x1, y1, P[1]); R.rect(x0, y0, x0, y1, P[2]);
  // la mugre de la lluvia: churretes bajo las cejas y un zócalo más sucio
  for (let x = x0 + 2; x < x1 - 2; x += 3) if (h(x, y0, 731 + k) < 0.3) { const L = 3 + Math.floor(h(x, 1, 732 + k) * 8); for (let j = 0; j < L; j++) if ((j & 1) === 0) R.pset(x, y1 - 6 - Math.floor(h(x, 2, 733 + k) * 30) + j, a_vcMez(P[0], P[1], 0.6)); }
}

// la ceja art déco (la visera de hormigón sobre las ventanas): el canto de luz, el filo y la sombra tramada que echa
function a_vcCeja(R, x0, x1, y, P, vuelo = 3) {
  R.rect(x0 - 1, y, x1 + 1, y, hex('#ffe8c8')); R.rect(x0 - 1, y + 1, x1 + 1, y + 1, P[0]); R.rect(x0 - 1, y + 2, x1 + 1, y + 2, P[1]);
  for (let j = 0; j < vuelo; j++) for (let x = x0; x <= x1; x++) if (a_vcB4(x, y + 3 + j) < 0.7 - j * 0.2) R.pset(x, y + 3 + j, a_vcMez(R.pget(x, y + 3 + j), hex('#4a2a50'), 0.35));
}

// una ventana de hotel: el marco blanco, el cristal que refleja el ocaso con su brillo, la persiana (tipo 0), la cortina
// (1), abierta con alguien (2) o con un aparato de aire (3); devuelve su hueco para encenderla de noche
function a_vcVentana(R, x, y, w, al, k, P) {
  const tipo = Math.floor(h(x, y, 740 + k) * 4);
  R.rect(x - 1, y - 1, x + w, y + al, A_VC.trim); R.rect(x + w, y, x + w, y + al, A_VC.trimS); R.rect(x - 1, y + al, x + w, y + al, A_VC.trimS);
  for (let j = 0; j < al; j++) R.rect(x, y + j, x + w - 1, y + j, j < al * 0.45 ? A_VC.crisA : j < al * 0.75 ? A_VC.crisB : A_VC.crisC);
  for (let j = 0; j < al; j++) { const xx = x + 1 + j - Math.floor(al / 2); if (xx >= x && xx < x + w - 1) { R.pset(xx, y + al - 1 - j, A_VC.crisL); } }
  if (tipo === 0) for (let j = 1; j < al; j += 2) R.rect(x, y + j, x + w - 1, y + j, a_vcMez(P[0], P[2], 0.5));
  else if (tipo === 1) { R.rect(x, y, x + 1, y + al - 1, hex('#f8e8e0')); R.rect(x + w - 2, y, x + w - 1, y + al - 1, hex('#f0d8d0')); }
  if (w >= 6) R.rect(x + (w >> 1), y, x + (w >> 1), y + al - 1, A_VC.trim);
  if (tipo === 3) { R.rect(x + 1, y + al + 1, x + w - 2, y + al + 3, hex('#c8c4c0')); R.rect(x + 1, y + al + 3, x + w - 2, y + al + 3, hex('#8a8488')); for (let i = x + 2; i < x + w - 2; i += 2) R.pset(i, y + al + 2, hex('#8a8488')); }
  R.rect(x - 1, y + al + 1, x + w, y + al + 1, a_vcMez(P[0], P[1], 0.8));
  return [x, y, w, al, tipo];
}

// las ventanas encendidas de noche (en la capa de noche): luz cálida, la cruz del marco y alguna silueta o cortina
function a_vcEnciende(R, V, prob = 0.55) {
  for (const [x, y, w, al, tipo] of V) { const u = h(x, y, 745); if (u > prob) continue;
    const c = u < prob * 0.3 ? hex('#ffc880') : u < prob * 0.6 ? hex('#ffe0a0') : hex('#d8b8f0');
    R.rect(x, y, x + w - 1, y + al - 1, c); R.rect(x, y + al - 2, x + w - 1, y + al - 1, a_vcMez(c, hex('#8a5a3a'), 0.4));
    if (tipo === 0) for (let j = 1; j < al; j += 2) R.rect(x, y + j, x + w - 1, y + j, a_vcMez(c, hex('#a87a4a'), 0.45));
    if (w >= 6) R.rect(x + (w >> 1), y, x + (w >> 1), y + al - 1, hex('#3a2a3a'));
    if (tipo === 2 && al > 6) { R.rect(x + 1, y + al - 5, x + 2, y + al - 1, hex('#3a2a3a')); R.pset(x + 1, y + al - 6, hex('#3a2a3a')); R.pset(x + 2, y + al - 6, hex('#3a2a3a')); }
    // el resplandor que cae sobre la pared bajo la ventana
    for (let j = 0; j < 3; j++) for (let i = x - 1; i <= x + w; i++) if (a_vcB4(i, y + al + 1 + j) < 0.5 - j * 0.15) a_vcVela(R, i, y + al + 1 + j, c, 0.3); }
}

// la gente pequeña de fondo (11 px): camisa, pantalón corto, pelo y piel de la lista; anda, patina o está sentada.
// cl: recorte opcional. Devuelve nada; dir 1 mira a la derecha
const A_VC_GENTE = [['#f0c09a', '#3a2418', '#ff6a9a', '#3a6ab0'], ['#a8704a', '#1a1414', '#40c8d8', '#f8f0e8'], ['#e8b48a', '#f0d070', '#f8f0e8', '#ff8a4a'], ['#6a4430', '#1a1414', '#ffd23a', '#5a4a8a'], ['#f0c8a8', '#8a4a2a', '#9ae0c8', '#e84a6a'], ['#c8906a', '#2a1a14', '#e84a6a', '#f8e098']].map((p) => p.map(hex));

function a_vcFig(R, x, y, t, k, tn, o = {}) {
  const [piel, pelo, cam, pan] = A_VC_GENTE[k % A_VC_GENTE.length].map(tn), dir = o.dir ?? 1, cl = o.cl;
  const ps = (i, j, c) => { const xx = Math.round(x + i * dir), yy = Math.round(y + j); if (cl && (xx < cl[0] || xx > cl[2] || yy < cl[1] || yy > cl[3])) return; R.pset(xx, yy, c); };
  const f = o.quieto ? 0 : Math.floor(t * (o.patina ? 3 : 7) + k * 0.7) % 2, bota = o.sentado ? 0 : (o.patina ? 0 : f);
  // cabeza con pelo y gafas de sol en algunos
  for (const [i, j] of [[-1, -10], [0, -10], [1, -10], [-1, -9], [0, -9], [1, -9]]) ps(i, j - bota * 0 , piel);
  ps(-1, -11, pelo); ps(0, -11, pelo); ps(1, -11, pelo); ps(-1, -10, pelo); if (k % 3 === 0) { ps(0, -10, hex('#1a1414')); ps(1, -10, hex('#1a1414')); }
  for (let j = -8; j <= -5; j++) for (let i = -1; i <= 1; i++) ps(i, j, cam);
  // brazos que se balancean
  const br = o.quieto ? 0 : (f ? 1 : -1); ps(-2, -7, piel); ps(-2, -6 + (br > 0 ? 0 : 1), piel); ps(2, -7, piel); ps(2, -6 + (br > 0 ? 1 : 0), piel);
  if (o.sentado) return;
  for (let j = -4; j <= -3; j++) for (let i = -1; i <= 1; i++) ps(i, j, pan);
  if (o.patina) { ps(-1, -2, piel); ps(1, -2, piel); ps(-1, -1, piel); ps(2, -1, piel); for (let i = -2; i <= 3; i++) ps(i, 0, hex('#2a2a3a')); ps(-2, 1, hex('#ffd23a')); ps(3, 1, hex('#ffd23a')); return; }
  ps(-1, -2, piel); ps(1, -2, piel); ps(f ? -2 : -1, -1, piel); ps(f ? 1 : 2, -1, piel); ps(f ? -2 : -1, 0, hex('#f8f0e8')); ps(f ? 1 : 2, 0, hex('#f8f0e8'));
}

// un descapotable pequeño visto de lado (34 px), con conductor y acompañante de pelo al viento, ruedas que giran y, de
// noche, los faros con su haz y los pilotos rojos; dir 1 va a la derecha; cl: recorte
function a_vcCochecito(R, x, yb, dir, k, t, tn, noche, cl) {
  const L = 33, col = [hex('#ff7ab0'), hex('#40d0d8'), hex('#f8f4ec'), hex('#ffd060'), hex('#c87af0')][k % 5];
  const cS = a_vcMez(col, hex('#3a1a3a'), 0.35), cL = a_vcMez(col, hex('#ffffff'), 0.45);
  const X = (i) => Math.round(dir > 0 ? x + i : x + L - i);
  const ps = (i, y, c) => { const xx = X(i); if (cl && (xx < cl[0] || xx > cl[2] || y < cl[1] || y > cl[3])) return; R.pset(xx, y, tn(c)); };
  const fila = (i0, i1, y, c) => { for (let i = i0; i <= i1; i++) ps(i, y, c); };
  // la sombra en el asfalto
  for (let i = 1; i < L; i++) ps(i, yb, hex('#2a1e2e'));
  // carrocería: la aleta trasera, el lateral con su moldura cromada y el morro
  fila(1, L - 2, yb - 8, cL); fila(0, L - 1, yb - 7, col); fila(0, L, yb - 6, col); fila(0, L, yb - 5, hex('#e8e8f0')); fila(0, L, yb - 4, col); fila(1, L - 1, yb - 3, cS); fila(2, L - 2, yb - 2, cS);
  fila(0, 2, yb - 9, cL); ps(L, yb - 7, hex('#f8f8f8')); ps(L - 1, yb - 8, cL);
  // el interior: los asientos claros, el parabrisas inclinado y la pareja
  fila(6, 22, yb - 9, hex('#f8eedc')); fila(5, 6, yb - 10, hex('#f8eedc')); fila(15, 16, yb - 10, hex('#f8eedc'));
  for (let j = 0; j < 4; j++) ps(23 + (j >> 1), yb - 10 - j, hex('#c8e8f8')); ps(22, yb - 9, hex('#9aa8b8'));
  const pel = [hex('#3a2418'), hex('#f0d070'), hex('#1a1414'), hex('#8a4a2a')], viento = Math.floor(t * 6 + k) % 2;
  for (const [i0, p, gafas] of [[18, k % 4, k % 2 === 0], [9, (k + 2) % 4, false]]) { const pi = A_VC_GENTE[(k + i0) % 6][0];
    fila(i0, i0 + 2, yb - 13, pel[p]); fila(i0, i0 + 2, yb - 12, pi); fila(i0, i0 + 2, yb - 11, pi); ps(i0 - 1, yb - 13 + viento, pel[p]); ps(i0 - 1, yb - 12, pel[p]); if (gafas) { ps(i0 + 1, yb - 12, hex('#1a1414')); ps(i0 + 2, yb - 12, hex('#1a1414')); }
    fila(i0, i0 + 2, yb - 10, A_VC_GENTE[(k + i0) % 6][2]); }
  ps(21, yb - 11, hex('#2a2a2a')); ps(20, yb - 10, hex('#2a2a2a'));
  // las ruedas con banda blanca y el tapacubos que gira
  for (const cx of [7, 26]) { for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (i * i + j * j <= 5) ps(cx + i, yb - 2 + j, i * i + j * j >= 4 ? hex('#1e1a22') : i * i + j * j >= 2 ? hex('#f0f0f0') : hex('#8a8a96'));
    const a = t * 9 * dir + cx; ps(cx + Math.round(Math.cos(a)), yb - 2 + Math.round(Math.sin(a)), hex('#e8e8f0')); }
  // faros y pilotos
  const n = noche;
  ps(L, yb - 6, n > 0.3 ? hex('#fff8d0') : hex('#f8f0c0')); ps(0, yb - 7, n > 0.3 ? hex('#ff3a4a') : hex('#c8304a'));
  if (n > 0.3) { const a = (n - 0.3) / 0.7; for (let i = 1; i <= 16; i++) for (let j = -Math.floor(i / 4); j <= Math.floor(i / 5); j++) { const xx = X(L + i), yy = yb - 5 + j + Math.floor(i / 6); if (cl && (xx < cl[0] || xx > cl[2] || yy < cl[1] || yy > cl[3])) continue; if (a_vcB4(xx, yy) < (1 - i / 17) * 0.8) a_vcVela(R, xx, yy, hex('#fff0c0'), 0.45 * a); }
    for (let i = 1; i <= 4; i++) { const xx = X(-i); if (!cl || (xx >= cl[0] && xx <= cl[2])) a_vcVela(R, xx, yb - 7, hex('#ff3a4a'), 0.5 * a * (1 - i / 5)); } }
}

// una palmera de tronco anillado que se mece: x, suelo (pie del tronco), alto, incl (cuánto se tuerce hacia un lado),
// s (tamaño de la copa); la copa son nueve hojas de raquis curvo con sus folíolos de tres tonos y un racimo de cocos
function a_vcPalmera(R, x, suelo, alto, t, tn, o = {}) {
  const incl = o.incl ?? 0.2, s = o.s ?? 1, mec = Math.sin(t * 1.1 + x * 0.13) * 0.09 + Math.sin(t * 2.7 + x) * 0.03;
  const Tc = [A_VC.tronco, A_VC.troncoS, A_VC.troncoL].map(tn), Hc = [A_VC.hoja, A_VC.hojaS, A_VC.hojaL].map(tn);
  let cx = x, cy = suelo - alto;
  for (let j = 0; j <= alto; j++) { const u = j / alto, px = Math.round(x + incl * alto * 0.35 * u * u + mec * 6 * u * u), y = suelo - j, w = Math.round(2.6 - u * 1.1);
    R.rect(px - w, y, px + w, y, (j % 4 === 0) ? Tc[1] : Tc[0]); R.pset(px - w, y, Tc[2]); R.pset(px + w, y, Tc[1]); if (j % 4 === 1) R.pset(px + w - 1, y, Tc[1]);
    if (j === alto) { cx = px; cy = y; } }
  // los cocos
  for (const [dx, dy] of [[-2, 2], [1, 3], [3, 1], [-1, 4]]) R.disco(cx + dx, cy + dy, 1.6, tn(A_VC.coco));
  // las hojas: cada una un arco que cae, con folíolos colgando
  const A = [-2.9, -2.45, -1.95, -1.45, -0.95, -0.45, 0.05, 2.65, 0.5];
  for (let f = 0; f < A.length; f++) { const L = (18 + 5 * h(f, x, 750)) * s, a0 = A[f] + mec * 1.6 + Math.sin(t * 2.2 + f * 1.7 + x) * 0.05, caida = 0.55 + 0.25 * h(f, x, 751);
    let px = cx, py = cy;
    for (let i = 1; i <= L; i++) { const u = i / L, ang = a0 + (Math.cos(a0) > 0 ? 1 : -1) * caida * u * u * 1.6, nx = cx + Math.cos(a0) * i, ny = cy + Math.sin(a0) * i * 0.7 + caida * u * u * L * 0.9;
      R.linea(Math.round(px), Math.round(py), Math.round(nx), Math.round(ny), Hc[1]);
      if (i > 2 && i % 2 === 0) { const lf = Math.round((1 - Math.abs(u - 0.45)) * 4 * s); for (let q = 1; q <= lf; q++) { R.pset(Math.round(nx) - (q >> 1) * (Math.cos(ang) > 0 ? 1 : -1), Math.round(ny) + q, q < 2 ? Hc[2] : Hc[0]); R.pset(Math.round(nx) + (q >> 2), Math.round(ny) - Math.min(q, 2), Hc[0]); } }
      px = nx; py = ny; } }
  R.disco(cx, cy, 2, Hc[1]); R.pset(cx - 1, cy - 1, Hc[2]);
  return [cx, cy];
}

// una farola art déco del paseo: pie, fuste estriado y farol de cristal; de noche se enciende con halo y charco de luz
function a_vcFarola(R, x, suelo, alto, noche, t, tn) {
  const c = tn(A_VC.farola), cL = tn(A_VC.farolaL), y0 = suelo - alto;
  if (noche > 0.2) { const a = (noche - 0.2) / 0.8; for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) if ((i / 14) ** 2 + (j / 3.2) ** 2 < 1 && a_vcB4(x + i, suelo + j) < 0.75) a_vcVela(R, x + i, suelo + j, hex('#ffd890'), 0.35 * a);
    for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j) / 12; if (d < 1 && (1 - d) ** 1.4 > a_vcB4(x + i, y0 + 4 + j) * 1.3) a_vcVela(R, x + i, y0 + 4 + j, hex('#ffe0a0'), 0.45 * a); } }
  R.rect(x - 3, suelo - 3, x + 3, suelo, c); R.rect(x - 2, suelo - 5, x + 2, suelo - 4, c); R.rect(x - 1, y0 + 9, x + 1, suelo - 5, c); R.rect(x - 1, y0 + 9, x - 1, suelo - 5, cL);
  R.rect(x - 4, y0 + 8, x + 4, y0 + 8, c); R.rect(x - 3, y0 + 1, x + 3, y0 + 7, noche > 0.2 ? a_vcMez(tn(hex('#f8f0d8')), hex('#fff4c0'), noche) : tn(hex('#e8e0e8')));
  R.rect(x - 3, y0 + 1, x - 3, y0 + 7, c); R.rect(x + 3, y0 + 1, x + 3, y0 + 7, c); R.rect(x, y0 + 1, x, y0 + 7, a_vcMez(c, cL, 0.5)); R.rect(x - 4, y0, x + 4, y0, c); R.pset(x, y0 - 1, c); R.pset(x, y0 - 2, cL);
}

// el neón: un tubo de puntos (polilíneas P = [[x, y], …]) de color col; en 0–1 lo enciende: apagado se ve el cristal
// pálido con sus grapas; encendido, el núcleo casi blanco y el resplandor tramado alrededor. g: grosor del halo
function a_vcNeon(R, P, col, en, tn, g = 2) {
  const pts = [];
  for (const L of P) for (let i = 0; i + 1 < L.length; i++) R.linea(L[i][0], L[i][1], L[i + 1][0], L[i + 1][1], (x, y) => { pts.push(x, y); return null; });
  if (en > 0.02) { for (let p = 0; p < pts.length; p += 2) { const x = pts[p], y = pts[p + 1]; for (let j = -g; j <= g; j++) for (let i = -g; i <= g; i++) { const d = Math.abs(i) + Math.abs(j); if (d === 0 || d > g + 1 || a_vcCalma(x + i, y + j)) continue; if (a_vcB4(x + i, y + j) < (d <= 1 ? 0.9 : 0.45)) a_vcVela(R, x + i, y + j, col, (d <= 1 ? 0.32 : 0.16) * en); } } }
  const apag = tn(a_vcMez(col, hex('#e8dce8'), 0.62)), nuc = a_vcMez(col, hex('#ffffff'), 0.5);
  for (let p = 0; p < pts.length; p += 2) { const x = pts[p], y = pts[p + 1]; R.pset(x, y, en > 0.02 ? a_vcMez(apag, nuc, en) : (p % 16 === 0 ? tn(hex('#7a7088')) : apag)); }
}

// cuánto está encendido el neón k (umbral th de o.noche): parpadea al prender, y alguno tiembla de vez en cuando
function a_vcEnc(noche, th, t, k) {
  const u = a_vcLim((noche - th) / 0.1); if (u <= 0) return 0;
  if (u < 1 && h(Math.floor(t * 13), k, 760) < 0.45) return 0;
  if (k === 3 && (t % 6.3) < 0.3 && Math.floor(t * 20) % 2) return 0.15;
  return u;
}

// los pictogramas de neón (sin letras): polilíneas
const a_vcArco = (cx, cy, rx, ry, a0, a1, n = 14) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [Math.round(cx + Math.cos(a) * rx), Math.round(cy + Math.sin(a) * ry)]; });

function a_vcPictoPalmera(x, y, s) {   // x, y: el pie del tronco
  const top = [x + 2 * s, y - 12 * s];
  return [[[x, y], [x + s, y - 6 * s], top], a_vcArco(top[0] - 5 * s, top[1] + 1 * s, 5 * s, 3 * s, -0.1, -Math.PI + 0.3, 6), a_vcArco(top[0] + 5 * s, top[1] + 1 * s, 5 * s, 3 * s, Math.PI + 0.1, 2 * Math.PI - 0.3, 6), a_vcArco(top[0] - 3 * s, top[1] - 1 * s, 3 * s, 4 * s, 0, -Math.PI * 0.8, 5), a_vcArco(top[0] + 3 * s, top[1] - 1 * s, 3 * s, 4 * s, Math.PI, Math.PI * 1.8, 5)];
}

function a_vcPictoOla(x, y, w, s) {   // una ola larga que acaba en rizo (no dos crestas: se leería como una letra)
  const L = []; for (let i = 0; i <= w; i += 2) L.push([x + i, Math.round(y + Math.sin(i / w * Math.PI * 1.0 + Math.PI) * 3 * s)]);
  return [L, a_vcArco(x + w - 2 * s, y - 3 * s, 3 * s, 3 * s, Math.PI * 0.5, Math.PI * 2.2, 9)];
}

function a_vcPictoSol(cx, cy, r) {   // medio sol con rayos sobre una línea
  const P = [a_vcArco(cx, cy, r, r, Math.PI, 2 * Math.PI, 12), [[cx - r - 3, cy], [cx + r + 3, cy]]];
  for (let k = 1; k < 6; k++) { const a = Math.PI + k * Math.PI / 6; P.push([[Math.round(cx + Math.cos(a) * (r + 2)), Math.round(cy + Math.sin(a) * (r + 2))], [Math.round(cx + Math.cos(a) * (r + 5)), Math.round(cy + Math.sin(a) * (r + 5))]]); }
  return P;
}

function a_vcPictoFlamenco(x, y, s) {   // x, y: el pie
  return [[[x, y], [x, y - 6 * s], [x + 1 * s, y - 8 * s]], a_vcArco(x + 1 * s, y - 10 * s, 4 * s, 2.5 * s, 0, 2 * Math.PI, 12), [[x + 4 * s, y - 11 * s], [x + 5 * s, y - 14 * s], [x + 3 * s, y - 17 * s], [x + 4 * s, y - 19 * s], [x + 6 * s, y - 19 * s], [x + 7 * s, y - 17 * s]], [[x, y - 6 * s], [x - 2 * s, y - 4 * s]]];
}

function a_vcPictoCopa(x, y, s) {   // x, y: la base de una copa de cóctel con su aceituna
  return [[[x - 3 * s, y], [x + 3 * s, y]], [[x, y], [x, y - 5 * s]], [[x, y - 5 * s], [x - 6 * s, y - 11 * s], [x + 6 * s, y - 11 * s], [x, y - 5 * s]], [[x + 2 * s, y - 9 * s], [x + 5 * s, y - 15 * s]]];
}

// una sombrilla de terraza vista de frente: el palo y la tela a gajos de dos colores con su volante
function a_vcSombrilla(R, x, yTela, ySuelo, w, c1, c2, tn) {
  R.rect(x, yTela, x, ySuelo, tn(hex('#e8e0d8'))); R.pset(x, yTela - 3, tn(hex('#d8c8b8')));
  for (let j = 0; j < 4; j++) { const ww = Math.round(w * (0.3 + j * 0.24)); for (let i = -ww; i <= ww; i++) R.pset(x + i, yTela - 3 + j, tn(Math.floor((i + 40) * 3 / w) % 2 ? c1 : c2)); }
  for (let i = -w; i <= w; i++) R.pset(x + i, yTela + 1, tn(i % 2 ? a_vcMez(c1, hex('#3a1a3a'), 0.25) : c2));
}

// la paleta de cada hotel [c, cS, cL]
const A_VC_H = { rosa: [A_VC.rosa, A_VC.rosaS, A_VC.rosaL], menta: [A_VC.menta, A_VC.mentaS, A_VC.mentaL], amar: [A_VC.amar, A_VC.amarS, A_VC.amarL], azul: [A_VC.azul, A_VC.azulS, A_VC.azulL], lila: [A_VC.lila, A_VC.lilaS, A_VC.lilaL] };

// la planta baja de un hotel: un toldo de rayas con su volante sobre el escaparate (dentro, la barra con botellas y la
// luz cálida) o un porche con columnas; y1 es la línea de la acera de enfrente
function a_vcBajo(R, x0, x1, y0, y1, tipo, P, c2) {
  if (tipo === 'toldo') {
    R.rect(x0 + 2, y0 + 6, x1 - 2, y1 - 1, A_VC.interiorS); R.rect(x0 + 3, y0 + 7, x1 - 3, y1 - 6, A_VC.interior);
    for (let x = x0 + 4; x < x1 - 4; x += 3) { const c = [hex('#3a8a5a'), hex('#c84a3a'), hex('#e8c040'), hex('#6a4ab0')][(x >> 1) % 4]; R.rect(x, y0 + 12, x + 1, y0 + 15, c); R.pset(x, y0 + 11, hex('#fff4d8')); }
    R.rect(x0 + 3, y0 + 16, x1 - 3, y0 + 16, hex('#8a5a3a')); R.rect(x0 + 3, y1 - 6, x1 - 3, y1 - 5, hex('#8a4a3a')); R.rect(x0 + 3, y1 - 4, x1 - 3, y1 - 1, hex('#5a3a3a'));
    for (let x = x0 + 3; x < x1 - 3; x += 7) R.rect(x, y0 + 6, x, y1 - 1, A_VC.trim);
    for (let j = 0; j < 7; j++) for (let x = x0; x <= x1; x++) if (j < 5 || ((x >> 1) & 1)) R.pset(x, y0 + j, ((x - x0) >> 2) % 2 ? c2 : A_VC.trim);
    R.rect(x0, y0, x1, y0, a_vcMez(c2, hex('#ffffff'), 0.4));
    for (let x = x0 + 2; x < x1 - 2; x += 5) R.linea(x, y0 + 7, x - 3, y1 - 2, hex('#ffe8c0'));
  } else {
    R.rect(x0, y0, x1, y1 - 1, a_vcMez(P[0], hex('#5a3a5a'), 0.45));
    R.rect(x0 + 8, y0 + 4, x1 - 8, y1 - 1, A_VC.interiorS); R.rect(x0 + 9, y0 + 5, x1 - 9, y1 - 4, A_VC.interior); R.rect(Math.round((x0 + x1) / 2) - 1, y0 + 4, Math.round((x0 + x1) / 2) + 1, y1 - 1, A_VC.marco);
    R.rect(x0 + 10, y0 + 6, x1 - 10, y0 + 6, hex('#fff4d0')); R.disco(Math.round((x0 + x1) / 2), y0 + 8, 1, hex('#fff8e0'));
    for (let x = x0 + 2; x <= x1 - 2; x += Math.round((x1 - x0 - 4) / 4)) { R.rect(x - 1, y0, x + 1, y1 - 1, A_VC.trim); R.rect(x + 1, y0, x + 1, y1 - 1, A_VC.trimS); R.rect(x - 2, y0, x + 2, y0 + 1, A_VC.trim); R.rect(x - 2, y1 - 2, x + 2, y1 - 1, A_VC.trimS); }
    R.rect(x0, y0 - 1, x1, y0, P[2]); R.rect(x0, y1 - 1, x1, y1, A_VC.trimS);
    // dentro, en cada vano: la puerta de cristal con su marco, la lámpara colgada y una maceta con su palmito
    const paso = Math.round((x1 - x0 - 4) / 4);
    for (let bx = x0 + 2 + (paso >> 1); bx < x1 - 4; bx += paso) { if (bx < x0 + 9 || bx > x1 - 9) continue;
      R.rect(bx - 5, y0 + 9, bx + 5, y1 - 4, A_VC.interiorS); R.rect(bx - 4, y0 + 10, bx + 4, y1 - 4, hex('#fbe0b0')); R.rect(bx, y0 + 10, bx, y1 - 4, A_VC.interiorS); R.linea(bx - 3, y1 - 5, bx - 1, y0 + 11, hex('#fff4e0'));
      R.rect(bx, y0 + 5, bx, y0 + 7, hex('#8a6a3a')); R.rect(bx - 2, y0 + 8, bx + 2, y0 + 8, hex('#f0c040'));
      R.rect(bx + 6, y1 - 6, bx + 8, y1 - 2, hex('#c86a4a')); for (const d of [-2, 0, 2]) R.linea(bx + 7, y1 - 6, bx + 7 + d, y1 - 10 - Math.abs(d), hex('#3a8a4a')); }
  }
  return tipo === 'toldo' ? [x0 + 3, y0 + 7, x1 - 3, y1 - 2] : [x0 + 9, y0 + 5, x1 - 9, y1 - 2];
}

// de noche, los escaparates y los vestíbulos dan luz cálida (mezcla que conserva el dibujo)
function a_vcAlumbra(R, L, c, a) { for (const [x0, y0, x1, y1] of L) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, a_vcMez(R.pget(x, y), c, a)); }

// la capa fija de Ocean Drive (n = 0 ocaso, 1 noche)
function a_vcOceanFijo(R, n, ctx) {
  const { rect, pset, linea, disco, poligono } = R, V = [], Bj = [];
  a_vcDegradado(R, 0, 122, n ? A_VC_CIELO_N : A_VC_CIELO_D);
  if (n) a_vcLuna(R, 236, 30); else a_vcSol(R, 214, 62, 12);
  ctx.marca();
  // las torres de pisos del fondo, con bruma
  for (const [x, w, top, k] of [[60, 14, 30, 0], [76, 10, 40, 1], [96, 14, 34, 2], [228, 14, 44, 3], [244, 12, 52, 4], [262, 9, 58, 5]]) {
    const c = hex(k % 2 ? '#c88aa8' : '#d498b0'), cS = hex('#b07898'), cL = hex('#f2b8c0');
    rect(x, top, x + w, 112, c); rect(x, top, x + w, top, cL); rect(x + w - 1, top, x + w, 112, cS); rect(x + 2, top - 3, x + 4, top - 1, c);
    for (let y = top + 3; y < 100; y += 3) for (let i = x + 2; i < x + w - 1; i += 2) pset(i, y, h(i, y, 770) < 0.5 ? cS : a_vcMez(c, cL, 0.5));
    for (let y = top + 3; y < 100; y += 3) for (let i = x + 2; i < x + w - 1; i += 2) V.push([i, y, 1, 1, 9]);
  }
  // H1 · rosa (x 0–57) con su aleta vertical
  { const P = A_VC_H.rosa; a_vcEstuco(R, 0, 32, 57, 118, P, 1);
    for (let x = 0; x < 58; x += 4) { rect(x, 29, x + 2, 31, P[0]); pset(x, 29, P[2]); } rect(0, 32, 57, 32, hex('#ffd8a8'));
    for (const y of [42, 60, 78]) { for (const x of [3, 12, 40, 49]) V.push(a_vcVentana(R, x, y, 6, 10, 1, P)); a_vcCeja(R, 1, 56, y - 4, P); }
    // la aleta: un muro estrecho que sobresale, con su canto de luz, su sombra y tres ojos de buey
    rect(22, 24, 34, 96, P[2]); rect(24, 24, 34, 96, P[0]); rect(33, 24, 34, 96, P[1]); for (let y = 97; y < 104; y++) if (a_vcB4(28, y) < 0.6) rect(24, y, 34, y, a_vcMez(P[0], hex('#4a2a50'), 0.3));
    rect(22, 22, 34, 23, hex('#ffd8a8')); for (const y of [38, 56, 74]) { disco(28, y, 3, A_VC.trim); disco(28, y, 2, A_VC.crisB); pset(27, y - 1, A_VC.crisL); V.push([27, y - 1, 3, 3, 1]); }
    Bj.push(a_vcBajo(R, 0, 57, 98, 118, 'toldo', P, hex('#ff6a9a'))); }
  // H2 · menta (x 58–119) con su zigurat
  { const P = A_VC_H.menta; a_vcEstuco(R, 58, 46, 119, 118, P, 2);
    rect(78, 40, 99, 46, P[0]); rect(83, 34, 94, 40, P[0]); rect(86, 29, 91, 34, P[0]); rect(78, 40, 99, 40, P[2]); rect(83, 34, 94, 34, P[2]); rect(86, 29, 91, 29, hex('#ffd8a8')); rect(98, 40, 99, 46, P[1]); rect(93, 34, 94, 40, P[1]);
    rect(58, 46, 119, 46, hex('#ffd8a8')); rect(58, 47, 119, 48, P[2]);
    for (let x = 60; x < 118; x += 3) pset(x, 50, P[1]);
    for (const y of [56, 74]) { for (const x of [62, 72, 82, 95, 105]) V.push(a_vcVentana(R, x, y, 7, 10, 2, P)); a_vcCeja(R, 59, 118, y - 4, P); }
    // los balconcillos de tubo
    for (const x of [71, 104]) { rect(x - 1, 84, x + 9, 84, A_VC.trim); for (let i = x; i <= x + 8; i += 2) rect(i, 85, i, 87, A_VC.trim); }
    a_vcCeja(R, 59, 118, 90, P); Bj.push(a_vcBajo(R, 58, 119, 95, 118, 'toldo', P, hex('#3ab8a0'))); }
  // H3 · amarillo (x 120–197), el más alto, con su torre escalonada
  { const P = A_VC_H.amar; a_vcEstuco(R, 120, 42, 197, 118, P, 3);
    rect(146, 29, 171, 42, P[0]); rect(150, 26, 167, 29, P[0]); rect(146, 29, 171, 29, P[2]); rect(150, 26, 167, 26, hex('#ffd8a8')); rect(170, 29, 171, 42, P[1]); rect(166, 26, 167, 29, P[1]);
    for (const x of [150, 154, 162, 166]) rect(x, 30, x, 41, P[1]);
    rect(120, 42, 197, 42, hex('#ffd8a8')); rect(120, 43, 197, 44, P[2]);
    for (let x = 122; x < 196; x += 6) { rect(x, 45, x + 3, 46, P[1]); }
    for (const y of [52, 66, 80]) { for (const x of [124, 133, 142, 168, 177, 186]) V.push(a_vcVentana(R, x, y, 6, 9, 3, P)); a_vcCeja(R, 121, 196, y - 4, P, 2); }
    // la franja central de cristal entre las dos alas, con sus montantes
    rect(152, 48, 165, 92, A_VC.trim); for (let y = 49; y < 92; y++) rect(153, y, 164, y, y % 14 < 2 ? A_VC.trimS : y < 70 ? A_VC.crisA : A_VC.crisB); for (const x of [156, 160]) rect(x, 49, x, 91, A_VC.trim); V.push([153, 52, 12, 10, 1], [153, 66, 12, 10, 1], [153, 80, 12, 10, 0]);
    Bj.push(a_vcBajo(R, 120, 197, 96, 118, 'porche', P, null));
    // la escalinata
    for (let j = 0; j < 3; j++) rect(150 - j * 2, 115 + j, 167 + j * 2, 115 + j, j % 2 ? A_VC.trimS : A_VC.trim); }
  // H4 · azul (x 198–259), bajo, con la esquina curva y las franjas de carreras
  { const P = A_VC_H.azul; a_vcEstuco(R, 198, 72, 259, 118, P, 4);
    for (let x = 198; x < 212; x++) { const u = (x - 198) / 14, c = u < 0.25 ? P[2] : u < 0.7 ? P[0] : P[1]; for (let y = 72; y < 98; y++) if (a_vcB4(x, y) < 0.92) pset(x, y, c); }
    rect(198, 72, 259, 72, hex('#ffd8a8')); rect(198, 70, 259, 71, P[2]);
    for (const y of [76, 79]) rect(198, y, 259, y, P[1]); for (const y of [93, 96]) rect(198, y, 259, y, A_VC.azulD);
    // la ventana corrida y los ojos de buey de la esquina
    rect(214, 82, 257, 89, A_VC.trim); for (let x = 215; x < 257; x++) for (let y = 83; y < 89; y++) pset(x, y, y < 86 ? A_VC.crisA : A_VC.crisB); for (let x = 220; x < 257; x += 7) rect(x, 83, x, 88, A_VC.trim); V.push([215, 83, 42, 6, 0]);
    for (const x of [202, 208]) { disco(x, 86, 2, A_VC.trim); pset(x, 86, A_VC.crisB); }
    Bj.push(a_vcBajo(R, 198, 259, 98, 118, 'toldo', P, hex('#4a8ae0'))); }
  // H5 · lila (x 260–319), con el remate escalonado (por debajo de la zona de Atom)
  { const P = A_VC_H.lila; a_vcEstuco(R, 260, 58, 319, 118, P, 5);
    rect(278, 52, 302, 58, P[0]); rect(284, 49, 296, 52, P[0]); rect(278, 52, 302, 52, P[2]); rect(284, 49, 296, 49, P[2]); rect(301, 52, 302, 58, P[1]);
    rect(260, 58, 319, 58, hex('#ffd8a8')); rect(260, 59, 319, 60, P[2]);
    for (const y of [66, 82]) { for (const x of [264, 274, 300, 310]) V.push(a_vcVentana(R, x, y, 6, 9, 5, P)); a_vcCeja(R, 261, 318, y - 4, P); }
    for (let y = 63; y < 94; y += 2) { rect(287, y, 293, y, P[1]); } rect(286, 62, 294, 62, A_VC.trim);
    Bj.push(a_vcBajo(R, 260, 319, 97, 118, 'toldo', P, hex('#9a6ad8'))); }
  // la acera de enfrente: losas, bordillo, la sombra de los toldos y las mesas de las terrazas
  rect(0, 118, 319, 126, A_VC.acera); for (let x = 0; x < 320; x += 12) rect(x, 118, x, 126, A_VC.aceraS); rect(0, 122, 319, 122, A_VC.aceraS); rect(0, 118, 319, 118, a_vcMez(A_VC.acera, hex('#4a2a50'), 0.3));
  for (let i = 0; i < 260; i++) pset(Math.floor(h(i, 1, 771) * 320), 118 + Math.floor(h(i, 2, 771) * 8), i % 2 ? A_VC.aceraL : A_VC.aceraS);
  rect(0, 126, 319, 126, A_VC.bordillo); rect(0, 127, 319, 127, A_VC.bordilloS);
  for (const [x, c1, c2] of [[12, '#ff7ab0', '#f8f0e8'], [46, '#40c8d8', '#f8f0e8'], [212, '#ffd060', '#ff7ab0'], [244, '#f8f0e8', '#4a8ae0'], [278, '#c87af0', '#f8f0e8'], [306, '#ff7ab0', '#ffd060']]) {
    a_vcSombrilla(R, x, 108, 123, 8, hex(c1), hex(c2), (c) => c);
    rect(x - 4, 119, x + 4, 119, hex('#f8f0e8')); rect(x - 3, 120, x + 3, 120, hex('#c8bcb8')); rect(x, 120, x, 123, hex('#8a8a96')); }
  // la calle: asfalto morado del ocaso, parches, grietas, la raya discontinua y las rodadas
  rect(0, 128, 319, 147, A_VC.asfalto);
  for (let i = 0; i < 700; i++) pset(Math.floor(h(i, 3, 772) * 320), 128 + Math.floor(h(i, 4, 772) * 20), i % 3 ? A_VC.asfaltoS : A_VC.asfaltoL);
  for (const y of [132, 133, 143, 144]) for (let x = 0; x < 320; x++) if (a_vcB4(x, y) < 0.3) pset(x, y, a_vcMez(A_VC.asfalto, hex('#2a1e2e'), 0.4));
  for (let x = 4; x < 320; x += 20) rect(x, 137, x + 9, 138, A_VC.raya);
  rect(88, 140, 104, 145, A_VC.asfaltoS); rect(89, 141, 103, 144, a_vcMez(A_VC.asfalto, A_VC.asfaltoL, 0.4)); linea(150, 131, 162, 135, A_VC.asfaltoS); linea(162, 135, 166, 134, A_VC.asfaltoS);
  // nuestro bordillo y el paseo de losas con la onda de dos tonos
  rect(0, 148, 319, 148, A_VC.bordillo); rect(0, 149, 319, 150, A_VC.bordilloS);
  for (let y = 151; y < 173; y++) for (let x = 0; x < 320; x++) { const b = Math.floor((y * 2.2 + 5 * Math.sin(x / 11)) / 7) % 2; pset(x, y, b ? A_VC.paseo : A_VC.paseoS); }
  for (let i = 0; i < 520; i++) pset(Math.floor(h(i, 5, 773) * 320), 151 + Math.floor(h(i, 6, 773) * 22), i % 2 ? A_VC.paseoL : a_vcMez(A_VC.paseoS, hex('#8a5a5a'), 0.3));
  for (let x = 0; x < 320; x += 24) linea(x, 151, x - 6, 172, a_vcMez(A_VC.paseoS, hex('#8a5a5a'), 0.25));
  // el murete de roca de coral del parque y el césped detrás
  rect(0, 173, 319, 179, A_VC.coral); rect(0, 173, 319, 173, hex('#f4e8cc')); rect(0, 179, 319, 179, A_VC.coralD);
  for (let i = 0; i < 200; i++) { const x = Math.floor(h(i, 7, 774) * 320), y = 175 + Math.floor(h(i, 8, 774) * 4); pset(x, y, i % 3 ? A_VC.coralS : A_VC.coralD); }
  if (n) { ctx.oscurece(); a_vcEnciende(R, V, 0.6); a_vcAlumbra(R, Bj, hex('#ffc880'), 0.5); }
}

const a_vcOceanGeo = () => ({ suelo: 160, libre: [20, 270], acera: [0, 320, 150, 172], calle: [0, 320, 128, 148], sol: [214, 62] });

// los neones de Ocean Drive: [umbral, color, polilíneas] (los reflejos en la calle salen de su x media)
const A_VC_NEON_OCEAN = [
  [0.12, '#ff4fa8', [[[23, 25], [23, 95]], [[33, 25], [33, 95]], [[23, 25], [33, 25]], [[23, 95], [33, 95]]]],
  [0.22, '#40e8f8', a_vcPictoPalmera(87, 44, 1.1)],
  [0.32, '#ff4fa8', a_vcPictoSol(158, 40, 5)],
  [0.42, '#40e8f8', a_vcPictoOla(204, 74, 50, 1)],
  [0.5, '#ff7ac0', a_vcPictoFlamenco(244, 68, 0.75)],
  [0.6, '#40e8f8', [[[121, 94], [196, 94]], [[260, 95], [319, 95]]]],
  [0.68, '#ffe060', [[[279, 62], [279, 92]], [[301, 62], [301, 92]]]],
  [0.75, '#ff4fa8', a_vcPictoCopa(15, 92, 0.75)],
].map(([th, c, P]) => [th, hex(c), P]);

// los neones encendidos en el plano (y, en la calle de noche, sus reflejos que tiemblan)
function a_vcNeones(R, t, S, L, calle) {
  for (let k = 0; k < L.length; k++) { const [th, col, P] = L[k], en = a_vcEnc(S.noche, th, t, k); a_vcNeon(R, P, col, en, S.tn);
    if (calle && en > 0.05) { let sx = 0, n = 0; for (const p of P) for (const [x] of p) { sx += x; n++; } const x0 = Math.round(sx / n);
      for (let y = calle[0] + 1; y <= calle[1]; y += 2) { if (h(x0, y, Math.floor(t * 5)) < 0.3) continue; const w = Math.floor((y - calle[0]) / 9), ond = Math.round(Math.sin(y * 0.9 + t * 3 + x0) * 1.2); for (let x = x0 - w + ond; x <= x0 + w + ond; x++) a_vcVela(R, x, y, col, 0.3 * en * S.noche); } } }
}

function a_vcOcean(R, t, S) {
  const { noche, tn } = S, c = a_vcFondo(R, 'vc-ocean', noche, (n, ctx) => a_vcOceanFijo(R, n, ctx));
  a_vcCielo(R, t, c.m, noche, 118, { nubes: 7 });
  // un avión lejano que cruza despacio con sus luces
  { const u = (t / 40 + 0.3) % 1, ax = Math.round(250 - u * 300), ay = Math.round(30 + u * 6); if (ax > 0 && ax < 268 && !a_vcCalma(ax, ay) && c.m[ay * 320 + ax]) { R.pset(ax, ay, tn(hex('#5a4a6a'))); R.pset(ax + 1, ay, tn(hex('#5a4a6a'))); R.pset(ax + 2, ay, Math.floor(t * 1.5) % 2 ? hex('#ff4a4a') : tn(hex('#5a4a6a'))); } }
  // la vida de las terrazas: comensales que charlan y beben bajo las sombrillas, y un camarero que va y viene
  for (const [x, k] of [[8, 0], [17, 1], [42, 2], [51, 3], [208, 4], [216, 5], [240, 1], [249, 3], [274, 2], [302, 0], [310, 4]]) a_vcFig(R, x, 121 + (Math.sin(t * 2 + k * 3) > 0.85 ? -1 : 0), t, k, tn, { sentado: true, dir: x % 2 ? 1 : -1 });
  { const u = (t * 0.09) % 2, x = Math.round(u < 1 ? 196 + u * 64 : 260 - (u - 1) * 64); a_vcFig(R, x, 124, t, 2, tn, { dir: u < 1 ? 1 : -1 }); R.rect(x - 3, 113, x + 3, 113, tn(hex('#e8e8f0'))); R.pset(x - 2, 112, tn(hex('#ff7ab0'))); R.pset(x + 1, 112, tn(hex('#ffd060'))); }
  // los paseantes de la acera de enfrente: una pareja, alguien con perro y la patinadora
  for (let k = 0; k < 5; k++) { const v = [9, 7, 12, 22, 8][k] * (k % 2 ? -1 : 1), x = ((h(k, 1, 775) * 360 + t * v) % 360 + 360) % 360 - 20; a_vcFig(R, Math.round(x), 125, t, k + 1, tn, { dir: v > 0 ? 1 : -1, patina: k === 3 });
    if (k === 2) { const px = Math.round(x + 6), p = Math.floor(t * 8) % 2; R.rect(px - 2, 122, px + 2, 123, tn(hex('#f8f0e8'))); R.pset(px + 2, 121, tn(hex('#f8f0e8'))); R.pset(px - 2, 124 - p, tn(hex('#d8ccc0'))); R.pset(px + 1, 124 - (1 - p), tn(hex('#d8ccc0'))); R.linea(px - 2, 121, Math.round(x + 2), 118, tn(hex('#c84a4a'))); } }
  a_vcNeones(R, t, S, A_VC_NEON_OCEAN, [128, 147]);
  // los coches que van despacio: hacia la izquierda por el carril de allí, hacia la derecha por el de aquí
  if (S.o.coches !== false) for (let k = 0; k < 4; k++) { const lejos = k % 2 === 0, v = lejos ? -13 - k : 15 + k, x = ((h(k, 1, 776) * 400 + t * v) % 400 + 400) % 400 - 40;
    a_vcCochecito(R, Math.round(x), lejos ? 135 : 146, lejos ? -1 : 1, k + 1, t, tn, noche, null); }
  // las palmeras del paseo (detrás de los actores) y la farola
  a_vcFarola(R, 112, 151, 52, noche, t, tn);
  a_vcPalmera(R, 54, 152, 96, t, tn, { incl: 0.25, s: 1 });
  a_vcPalmera(R, 246, 152, 90, t, tn, { incl: -0.3, s: 0.95 });
  return a_vcOceanGeo();
}

// el primer término de Ocean Drive: la palmera grande de la izquierda, la de la derecha (con la copa por debajo de la
// zona de Atom) y unas matas de uva de playa sobre el murete
function a_vcOceanDelante(R, t, S) {
  const { tn } = S;
  a_vcPalmera(R, 6, 182, 148, t, tn, { incl: 0.18, s: 1.5 });
  a_vcPalmera(R, 314, 182, 118, t, tn, { incl: -0.12, s: 1.35 });
  for (const [x, w] of [[30, 16], [292, 20]]) for (let j = 0; j < 10; j++) for (let i = -w; i <= w; i++) { if ((i / w) ** 2 + ((j - 10) / 10) ** 2 > 1) continue; const yy = 180 - j, fl = Math.sin(t * 2 + i * 0.5) > 0.7 ? 1 : 0; if (h(i + fl, j, 777) < 0.15) continue; R.pset(x + i, yy, tn(h(i, j, 778) < 0.3 ? A_VC.hojaL : h(i, j, 779) < 0.6 ? A_VC.hoja : A_VC.hojaS)); }
}

const A_VC_HUECO = [263, 0, 319, 179];   // el hueco de la derecha, por donde se ve la calle

function a_vcTerrazaFijo(R, n, ctx) {
  const { rect, pset, linea, disco } = R, P = A_VC_H.menta, V = [], sombra = (c) => a_vcMez(c, hex('#3a2a50'), 0.32);
  // el hueco de la derecha: cielo, mar, el parque con una palmera lejana, el murete y la calle
  a_vcDegradado(R, 0, 96, n ? A_VC_CIELO_N : A_VC_CIELO_D);
  ctx.marca();
  for (let y = 92; y < 104; y++) for (let x = 263; x < 320; x++) pset(x, y, y < 94 ? hex('#7a78b8') : (a_vcB4(x, y) < (y - 94) / 10 ? hex('#3a8ab8') : hex('#5a80b8')));
  for (let y = 104; y < 113; y++) for (let x = 263; x < 320; x++) pset(x, y, h(x, y, 780) < 0.25 ? A_VC.cespedS : h(x, y, 781) < 0.2 ? A_VC.cespedL : A_VC.cesped);
  rect(263, 113, 319, 117, A_VC.coral); rect(263, 113, 319, 113, hex('#f4e8cc')); for (let x = 264; x < 320; x += 3) pset(x, 115 + (x % 2), A_VC.coralS);
  rect(263, 118, 319, 156, A_VC.asfalto); rect(263, 151, 319, 151, A_VC.bordillo); rect(263, 152, 319, 156, A_VC.bordilloS); for (let i = 0; i < 160; i++) pset(263 + Math.floor(h(i, 1, 782) * 57), 118 + Math.floor(h(i, 2, 782) * 32), i % 3 ? A_VC.asfaltoS : A_VC.asfaltoL);
  for (let x = 266; x < 320; x += 16) rect(x, 132, x + 7, 133, A_VC.raya); rect(263, 118, 319, 118, A_VC.bordilloS);
  // la fachada: la planta de arriba (tranquila bajo la barra del año), la ceja y el letrero
  a_vcEstuco(R, 0, 0, 262, 66, P, 11);
  for (const x of [196, 226]) V.push(a_vcVentana(R, x, 2, 16, 14, 3, P));
  a_vcCeja(R, 0, 262, 20, P, 4);
  // el panel del letrero: escalonado, con su canto de luz y los tornillos
  rect(48, 26, 180, 63, hex('#1e3a3e')); rect(60, 22, 168, 26, hex('#1e3a3e')); rect(48, 26, 180, 26, hex('#3a6a6a')); rect(60, 22, 168, 22, hex('#3a6a6a')); rect(178, 26, 180, 63, hex('#122426')); rect(48, 63, 180, 64, hex('#122426'));
  for (const [x, y] of [[51, 29], [177, 29], [51, 60], [177, 60]]) pset(x, y, hex('#8ab8b0'));
  for (let i = 0; i < 90; i++) pset(50 + Math.floor(h(i, 1, 783) * 128), 28 + Math.floor(h(i, 2, 783) * 34), hex('#26464a'));
  for (let x = 70; x < 178; x += 22) rect(x, 27, x, 62, hex('#16302f')); rect(50, 44, 178, 44, hex('#16302f'));
  for (let j = 0; j < 30; j++) { const x = 120 + j, y = 27 + j; if (y < 63) { pset(x, y, hex('#2e5254')); pset(x + 3, y, hex('#2a4a4c')); } }
  for (const x of [70, 158]) { rect(x, 64, x + 1, 68, hex('#5a5a66')); }
  // la cornisa del porche con sus dentículos y el techo del porche por debajo, en sombra
  rect(0, 66, 262, 70, A_VC.trim); for (let x = 1; x < 262; x += 4) rect(x, 69, x + 1, 70, A_VC.trimS); rect(0, 66, 262, 66, hex('#ffe8c8'));
  rect(0, 71, 262, 74, sombra(A_VC.trimS)); for (const x of [96, 226]) { rect(x - 4, 72, x + 4, 73, hex('#f0e8d8')); }
  // la pared del fondo del porche, en sombra
  a_vcEstuco(R, 0, 75, 262, 156, [sombra(P[0]), sombra(P[1]), sombra(P[2])], 12);
  for (let x = 0; x < 263; x++) for (let y = 75; y < 82; y++) if (a_vcB4(x, y) < (82 - y) / 9) pset(x, y, a_vcMez(R.pget(x, y), hex('#2a1e3a'), 0.3));
  // el zócalo de terrazo
  rect(0, 150, 262, 156, hex('#c8a0a8')); rect(0, 150, 262, 150, hex('#e8c8c8')); for (let i = 0; i < 120; i++) pset(Math.floor(h(i, 1, 784) * 262), 151 + Math.floor(h(i, 2, 784) * 5), i % 2 ? hex('#f0e0e0') : hex('#9a7a84'));
  // la placa con el año del hotel y el montante en abanico sobre la puerta
  rect(66, 76, 102, 85, A_VC.trim); rect(67, 77, 101, 84, hex('#2a4a4a')); R.numero('1939', 84, 84, { color: hex('#f0d890'), centro: true, sombra: false });
  rect(63, 86, 105, 92, A_VC.trim); rect(65, 87, 103, 92, hex('#f8d890')); for (let k = 0; k < 7; k++) linea(84, 92, 66 + k * 6, 87, A_VC.trim);
  // la puerta de cristal del vestíbulo: el marco cromado y el vestíbulo dentro (suelo de damero, mostrador, llaves, maceta)
  rect(62, 92, 106, 156, hex('#c8ccd8')); rect(63, 93, 105, 156, hex('#8a8ea0'));
  for (let y = 94; y < 156; y++) rect(64, y, 104, y, y < 130 ? A_VC.interior : ((y >> 2) & 1) ? hex('#f0e0c8') : hex('#c8a07a'));
  for (let y = 130; y < 156; y++) for (let x = 64; x < 105; x++) if ((((x + (y - 130) * 0.4) >> 2) + (y >> 2)) & 1) pset(x, y, hex('#e8d4b8')); else pset(x, y, hex('#b88a6a'));
  rect(70, 118, 98, 131, hex('#7a4a3a')); rect(70, 118, 98, 119, hex('#c8906a')); for (let x = 72; x < 97; x += 4) rect(x, 121, x + 1, 129, hex('#6a3a2e'));
  rect(70, 98, 98, 108, hex('#a86a4a')); for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) { pset(73 + i * 4, 101 + j * 4, C.oro ?? hex('#e8c040')); pset(73 + i * 4, 102 + j * 4, hex('#5a3a2a')); }
  rect(98, 130, 102, 136, hex('#b8603a')); for (let k = 0; k < 6; k++) linea(100, 130, 95 + k * 2, 120 + (k % 3), hex('#3a8a4a'));
  rect(84, 92, 84, 156, hex('#c8ccd8')); rect(80, 124, 82, 126, hex('#e8e8f0')); rect(86, 124, 88, 126, hex('#e8e8f0'));
  for (const d of [0, 22]) { linea(66 + d, 140, 78 + d, 96, hex('#fff4e0')); linea(68 + d, 140, 80 + d, 96, hex('#fbe8cc')); }
  // los apliques art déco a los lados de la puerta
  for (const x of [52, 116]) { rect(x - 3, 100, x + 3, 100, A_VC.trim); for (let j = 0; j < 6; j++) rect(x - 3 + (j >> 1), 101 + j, x + 3 - (j >> 1), 101 + j, j % 2 ? hex('#f8e8c8') : hex('#e8d0a8')); rect(x, 107, x, 109, A_VC.trimS); }
  // la ventana de guillotina con su persiana a medio bajar y la jardinera
  rect(144, 90, 188, 140, A_VC.trim); rect(145, 91, 187, 139, hex('#5a6a8a')); rect(188, 90, 188, 140, A_VC.trimS);
  for (let y = 91; y < 112; y++) rect(145, y, 187, y, y % 2 ? hex('#f0e8d8') : hex('#c8bca8'));
  for (let y = 112; y < 139; y++) for (let x = 145; x < 188; x++) pset(x, y, y < 120 ? A_VC.crisA : y < 130 ? A_VC.crisB : A_VC.crisC);
  rect(145, 114, 187, 115, A_VC.trim); rect(166, 112, 166, 139, A_VC.trim); linea(150, 138, 162, 116, A_VC.crisL); linea(171, 138, 183, 116, A_VC.crisL);
  rect(166, 104, 167, 112, hex('#c8bca8')); disco(166, 113, 1, hex('#a89880'));
  rect(142, 140, 190, 145, hex('#c87a5a')); rect(142, 140, 190, 140, hex('#e89a7a')); for (let x = 144; x < 190; x += 3) { pset(x, 138, hex('#3a8a4a')); pset(x + 1, 137, hex('#5aa85a')); if (x % 9 === 0) { pset(x, 136, hex('#ff5a7a')); pset(x + 1, 136, hex('#ffd060')); } }
  // la pizarra del menú: una copa y su precio (solo un número)
  rect(196, 78, 232, 94, hex('#8a5a3a')); rect(198, 80, 230, 92, hex('#24302c'));
  { const c = hex('#e8e0d0'), y = 89; rect(200, y - 8, 205, y - 8, c); for (let k = 0; k < 3; k++) rect(201 + k, y - 7 + k, 204 - k, y - 7 + k, k === 0 ? hex('#ff7ab0') : c); rect(202, y - 4, 203, y - 1, c); rect(200, y, 205, y, c); for (let x = 208; x < 218; x += 3) pset(x, y - 2, hex('#8a8a80')); R.numero('9', 225, y, { color: hex('#f0e0a0'), sombra: false, centro: true }); }
  // las tres columnas estriadas del porche, con capitel y basa
  for (const x of [14, 124, 234]) { rect(x, 75, x + 10, 156, hex('#f4ece0')); rect(x, 75, x + 1, 156, hex('#ffffff')); rect(x + 8, 75, x + 10, 156, hex('#c8bcb0')); for (const i of [3, 5, 7]) rect(x + i, 80, x + i, 150, hex('#ddd2c4'));
    rect(x - 2, 75, x + 12, 78, A_VC.trim); rect(x - 2, 78, x + 12, 78, A_VC.trimS); rect(x - 2, 150, x + 12, 156, A_VC.trim); rect(x - 2, 150, x + 12, 150, hex('#ffffff')); rect(x + 10, 151, x + 12, 156, A_VC.trimS); }
  // la esquina del edificio junto al hueco
  rect(250, 0, 262, 156, P[0]); rect(250, 0, 251, 156, P[2]); rect(260, 0, 262, 156, P[1]); for (let y = 6; y < 150; y += 10) rect(252, y, 259, y, P[1]);
  // el suelo de terrazo del porche: baldosas de colores en perspectiva con su moteado y los escalones
  for (let y = 157; y < 172; y++) { const fila = y < 161 ? 0 : y < 166 ? 1 : 2, alto = [4, 5, 6][fila], w = [14, 16, 18][fila];
    for (let x = 0; x < 320; x++) { const col = Math.floor((x + (fila & 1) * 7 + (x - 160) * fila * 0.08) / w); let c = [hex('#f2d8d8'), hex('#cfeee0'), hex('#f8ecc8')][(col + fila) % 3]; if ((x + (fila & 1) * 7) % w === 0 || y === [157, 161, 166][fila]) c = hex('#b8a0a8'); else if (h(x, y, 785) < 0.12) c = a_vcMez(c, hex('#8a6a7a'), 0.4); else if (h(x, y, 786) < 0.06) c = hex('#ffffff'); pset(x, y, c); } }
  for (const [y, c] of [[172, hex('#ffffff')], [173, hex('#e8d8d0')], [174, hex('#b8a0a0')], [176, hex('#ffffff')], [177, hex('#ddd0c8')], [178, hex('#a89090')]]) rect(0, y, 319, y, c);
  rect(0, 175, 319, 175, hex('#cdbcb4')); rect(0, 179, 319, 179, hex('#cdbcb4'));
  // los reflejos de las columnas en el terrazo pulido
  for (const x of [14, 124, 234]) for (let y = 157; y < 171; y++) for (let i = x; i <= x + 10; i++) if (a_vcB4(i, y) < 0.35 - (y - 157) * 0.02) pset(i, y, a_vcMez(R.pget(i, y), hex('#ffffff'), 0.4));
  if (n) { ctx.oscurece(); a_vcEnciende(R, V, 1); a_vcAlumbra(R, [[145, 112, 187, 138]], hex('#ffc880'), 0.55);
    // de noche, el vestíbulo y la ventana dan luz
    for (let y = 94; y < 156; y++) for (let x = 64; x < 105; x++) pset(x, y, a_vcMez(R.pget(x, y), hex('#ffd890'), 0.45)); }
}

// (los neones van encima del panel)
const A_VC_NEON_TERRAZA = [
  [0.12, '#40e8f8', a_vcPictoPalmera(78, 58, 2.4), 2],
  [0.25, '#ffb040', a_vcPictoSol(148, 44, 11), 2],
  [0.38, '#ff4fa8', a_vcPictoOla(98, 56, 70, 1.4), 2],
  [0.55, '#ff7ac0', a_vcPictoCopa(220, 60, 1.6), 2],
].map(([th, c, P, g]) => [th, hex(c), P, g]);

function a_vcTerraza(R, t, S) {
  const { noche, tn } = S, c = a_vcFondo(R, 'vc-terraza', noche, (n, ctx) => a_vcTerrazaFijo(R, n, ctx));
  a_vcCielo(R, t, c.m, noche, 92, { nubes: 4, gaviotas: 2, yCerca: 56 });
  const cl = A_VC_HUECO;
  // por el hueco pasan los coches (y un ciclista); por la ventana, sus reflejos
  if (S.o.coches !== false) for (let k = 0; k < 3; k++) { const ida = k !== 1, v = ida ? 24 + k * 3 : -20, per = 9 + k * 2.3, u = ((t + k * 3.1) % per) / per, x = ida ? 230 + u * 130 : 360 - u * 130;
    a_vcCochecito(R, Math.round(x), ida ? 146 : 131, ida ? 1 : -1, k + 1, t, tn, noche, cl);
    if (ida && x > 225 && x < 335) { const rx = Math.round(184 - (x - 225) * 0.36); for (let y = 122; y < 136; y++) for (let i = 0; i < 10; i++) { const xx = rx + i + Math.round((y - 122) * 0.3); if (xx > 145 && xx < 188 && xx !== 166) a_vcVela(R, xx, y, [hex('#ff7ab0'), hex('#40d0d8'), hex('#f8f4ec')][k % 3], 0.35); } } }
  // dos palomas en la cornisa del porche que picotean y se mueven, y las cortinas de arriba que se mecen con la brisa
  for (const [x0, k] of [[30, 0], [118, 1]]) { const x = x0 + Math.round(Math.sin(t * 0.4 + k * 2) * 6), pica = Math.sin(t * 2.3 + k * 3) > 0.6, cc = tn(hex('#8a8aa0')), cS = tn(hex('#5a5a6e')), d = Math.cos(t * 0.4 + k * 2) > 0 ? 1 : -1;
    R.rect(x - 2, 63, x + 2, 65, cc); R.rect(x - 2 * d, 64, x - 3 * d, 65, cS); R.pset(x + 2 * d, 62 + (pica ? 2 : 0), cc); R.pset(x + 3 * d, 62 + (pica ? 2 : 0), cc); R.pset(x + 4 * d, 63 + (pica ? 2 : 0), tn(hex('#e8a060'))); R.pset(x + 3 * d, 61 + (pica ? 2 : 0), tn(hex('#6ac0a0'))); }
  for (const x of [196, 226]) { const s = Math.round(Math.sin(t * 1.3 + x) * 1.5) + 2; for (let j = 0; j < 13; j++) { const w = s + Math.round(Math.sin(j * 0.5 + t * 2) * 0.6); R.rect(x, 3 + j, x + w, 3 + j, tn(hex('#f8f0f8'))); R.pset(x + w, 3 + j, tn(hex('#d8c8d8'))); } }
  // el vestíbulo: la recepcionista detrás del mostrador, que mira el libro y levanta la vista; el ventilador del techo
  { const x = 84, mira = Math.sin(t * 0.8) > 0.6, y0 = 108 + (mira ? 0 : 1);
    R.rect(x - 3, y0, x + 3, y0 + 6, tn(hex('#e8b48a'))); R.rect(x - 4, y0 - 2, x + 4, y0, tn(hex('#3a2418'))); R.rect(x - 4, y0 + 1, x - 3, y0 + 5, tn(hex('#3a2418'))); if (mira && (t % 3.3) > 0.15) { R.pset(x - 1, y0 + 3, tn(C.k)); R.pset(x + 2, y0 + 3, tn(C.k)); }
    R.rect(x - 5, y0 + 7, x + 5, 117, tn(hex('#40a8b0'))); R.rect(x - 1, y0 + 7, x + 1, y0 + 9, tn(hex('#f8f0e8'))); R.rect(76, 116, 80, 117, tn(hex('#f8f0e8'))); R.pset(94, 116, tn(hex('#e8c040'))); R.pset(94, 115, tn(hex('#e8c040'))); }
  { const a = t * 5; for (let b = 0; b < 4; b++) { const L = Math.round(Math.cos(a + b * Math.PI / 2) * 9); R.linea(84, 95, 84 + L, 95 + (b % 2), tn(hex('#5a3a2a'))); } R.rect(83, 94, 85, 95, tn(hex('#c8a060'))); }
  // los apliques y las luces del techo se encienden de noche
  if (noche > 0.15) { const a = (noche - 0.15) / 0.85; for (const x of [52, 116, 96, 226]) { const y = x === 96 || x === 226 ? 73 : 104; for (let j = -10; j <= 10; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j * 1.2) / 12; if (d < 1 && (1 - d) ** 1.3 > a_vcB4(x + i, y + j) * 1.4) a_vcVela(R, x + i, y + j, hex('#ffd890'), 0.4 * a); } } }
  // el ventilador del techo del porche
  { const x = 160, a = t * 4.2; R.rect(x, 71, x, 76, tn(hex('#8a8a96'))); for (let b = 0; b < 4; b++) { const L = Math.round(Math.cos(a + b * Math.PI / 2) * 14); R.linea(x, 77, x + L, 77 + (L > 0 ? 0 : 1), tn(hex('#f0e8d8'))); } R.rect(x - 2, 76, x + 2, 78, tn(hex('#c8a060'))); R.pset(x, 79, tn(hex('#f8f0d0'))); }
  // la máquina de refrescos (a la izquierda de la puerta): el frontal iluminado con las botellas pintadas, los botones
  // que se encienden, la ranura y la bandeja, donde cada pocos segundos cae una lata
  { const x0 = 28, x1 = 54, y0 = 108, y1 = 156, cuerpo = tn(hex('#e8505a')), cS = tn(hex('#b03a44')), cL = tn(hex('#ff8a8a')), luz = a_vcMez(tn(hex('#e8f4ff')), hex('#f0f8ff'), noche);
    R.rect(x0, y0, x1, y1, cuerpo); R.rect(x0, y0, x0 + 1, y1, cL); R.rect(x1 - 2, y0, x1, y1, cS); R.rect(x0 + 1, y0 - 2, x1 - 1, y0 - 1, cS);
    R.rect(x0 + 3, y0 + 3, x0 + 17, y0 + 28, luz); for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const bx = x0 + 5 + i * 5, by = y0 + 6 + j * 8; R.rect(bx, by + 2, bx + 2, by + 6, tn([hex('#c83a3a'), hex('#3a6ac8'), hex('#f0b030')][(i + j) % 3])); R.pset(bx + 1, by + 1, tn(hex('#8a8a96'))); R.pset(bx, by + 3, hex('#ffffff')); }
    for (let k = 0; k < 6; k++) R.rect(x0 + 20, y0 + 4 + k * 4, x0 + 23, y0 + 6 + k * 4, (Math.floor(t * 2) % 6 === k) ? hex('#fff0a0') : tn(hex('#f8e8e8')));
    R.rect(x0 + 20, y0 + 29, x0 + 22, y0 + 33, tn(hex('#3a2a2a'))); R.rect(x0 + 5, y0 + 34, x0 + 16, y0 + 40, tn(hex('#3a2a2e'))); R.rect(x0 + 5, y0 + 34, x0 + 16, y0 + 34, tn(hex('#8a8a96')));
    const u = (t % 7.5) - 5.5; if (u > 0 && u < 2) { const yy = Math.min(y0 + 39, y0 + 35 + Math.round(u * 12)); R.rect(x0 + 9, yy - 3, x0 + 12, yy, tn(hex('#3a6ac8'))); R.pset(x0 + 9, yy - 3, tn(hex('#c8ccd8'))); }
    if (noche > 0.2) for (let j = -2; j < 30; j++) for (let i = -4; i < 22; i++) if (a_vcB4(x0 + i, y0 + j) < 0.2 && (i < 0 || i > 17 || j < 0 || j > 28)) a_vcVela(R, x0 + i, y0 + j, hex('#c8e8ff'), 0.2 * noche); }
  a_vcNeones(R, t, S, A_VC_NEON_TERRAZA.map(([a, b, P]) => [a, b, P]), null);
  // la mesa con sombrilla: dos sillas de bistró, el tablero de mármol, dos cócteles (uno con pajita y sombrillita)
  const tm = 144, xm = 200;
  for (const [x, d] of [[180, -1], [222, 1]]) { const c = tn(hex('#3a4a5a')); R.rect(x - 4, 150, x + 4, 151, c); for (const i of [-4, 4]) R.rect(x + i, 151, x + i, 162, c); R.rect(x + d * 4, 136, x + d * 4, 150, c); R.rect(x + d * 4 - (d > 0 ? 3 : 0), 136, x + d * 4 + (d > 0 ? 0 : 3), 137, c); R.rect(x + d * 4 - (d > 0 ? 3 : 0), 141, x + d * 4 + (d > 0 ? 0 : 3), 141, c); }
  { const c = tn(hex('#f4f0ec')), cS = tn(hex('#c8c0bc')); R.rect(xm - 14, tm, xm + 14, tm + 2, c); R.rect(xm - 13, tm + 3, xm + 13, tm + 3, cS); R.rect(xm - 14, tm, xm + 14, tm, tn(hex('#ffffff'))); for (let i = 0; i < 8; i++) R.pset(xm - 12 + i * 3, tm + 1, tn(hex('#d8d0d0')));
    R.rect(xm - 1, tm + 4, xm + 1, 160, tn(hex('#5a5a66'))); R.rect(xm - 6, 160, xm + 6, 162, tn(hex('#4a4a56'))); R.rect(xm - 6, 160, xm + 6, 160, tn(hex('#8a8a96')));
    // el palo de la sombrilla y su tela a gajos, con el volante que ondea
    R.rect(xm, 98, xm, tm - 1, tn(hex('#e8e0d8'))); for (let j = 0; j < 7; j++) { const ww = 6 + j * 4; for (let i = -ww; i <= ww; i++) R.pset(xm + i, 92 + j, tn(((i + 60) / 8 | 0) % 2 ? hex('#ff7ab0') : hex('#f8f0e8'))); }
    for (let i = -30; i <= 30; i++) { const ond = Math.sin(t * 4 + i * 0.6) > 0.5 ? 1 : 0; R.pset(xm + i, 99, tn(((i + 60) / 8 | 0) % 2 ? hex('#e05a90') : hex('#e8e0d8'))); if (i % 4 !== 0) R.pset(xm + i, 100 + ond, tn(((i + 60) / 8 | 0) % 2 ? hex('#e05a90') : hex('#e8e0d8'))); }
    R.pset(xm, 91, tn(hex('#e8e0d8')));
    // el cóctel rosa en copa y el vaso alto con pajita y sombrillita; las gotas de condensación brillan
    const vd = tn(hex('#e8f4ff')); R.rect(xm - 8, tm - 1, xm - 4, tm - 1, vd); R.rect(xm - 6, tm - 4, xm - 6, tm - 2, vd); for (let j = 0; j < 4; j++) R.rect(xm - 9 + j, tm - 8 + j, xm - 3 - j, tm - 8 + j, j === 0 ? vd : tn(hex('#ff7ab0'))); R.pset(xm - 4, tm - 10, tn(hex('#5a8a3a')));
    R.rect(xm + 4, tm - 10, xm + 8, tm - 1, vd); R.rect(xm + 5, tm - 8, xm + 7, tm - 1, tn(hex('#ffb040'))); R.rect(xm + 5, tm - 4, xm + 7, tm - 1, tn(hex('#ff6a4a'))); R.linea(xm + 7, tm - 9, xm + 9, tm - 14, tn(hex('#40c8d8')));
    R.rect(xm + 2, tm - 13, xm + 6, tm - 13, tn(hex('#ffd060'))); R.rect(xm + 3, tm - 14, xm + 5, tm - 14, tn(hex('#ffd060'))); R.pset(xm + 4, tm - 12, tn(hex('#e8e0d8')));
    if (Math.floor(t * 1.3) % 3 === 0) R.pset(xm + 4, tm - 6, hex('#ffffff')); }
  return { suelo: 162, libre: [40, 250], mesa: [200, 144], puerta: [64, 104] };
}

// delante del porche: la jardinera de hibiscos de la izquierda y el seto bajo del hueco de la derecha
function a_vcTerrazaDelante(R, t, S) {
  const { tn } = S;
  R.rect(0, 160, 30, 179, tn(hex('#c87a5a'))); R.rect(0, 160, 30, 161, tn(hex('#e89a7a'))); R.rect(28, 160, 30, 179, tn(hex('#9a5a40'))); for (let y = 166; y < 180; y += 5) R.rect(0, y, 27, y, tn(hex('#b06a4a')));
  for (let k = 0; k < 9; k++) { const bx = 2 + k * 3, mec = Math.round(Math.sin(t * 1.6 + k) * 1.2), top = 128 + (k * 7) % 14; R.linea(bx, 160, bx + mec, top, tn(hex('#2a6a34')));
    for (let j = top; j < 158; j += 3) { R.pset(bx + mec - 1, j, tn(hex('#3e9a4a'))); R.pset(bx + mec + 1, j + 1, tn(hex('#7ac85a'))); R.pset(bx + mec - 2, j + 1, tn(hex('#256a34'))); }
    if (k % 2 === 0) { const fx = bx + mec, fy = top + 2; R.disco(fx, fy, 2, tn(hex('#ff3a5a'))); R.pset(fx, fy, tn(hex('#ffd060'))); R.pset(fx - 1, fy - 1, tn(hex('#ff8a9a'))); } }
  for (let x = 263; x < 320; x++) { const top = 166 + Math.round(Math.sin(x * 0.7) * 2 + Math.sin(t * 2 + x * 0.3)); for (let y = top; y < 180; y++) R.pset(x, y, tn(h(x, y, 787) < 0.3 ? A_VC.hojaL : h(x, y, 788) < 0.5 ? A_VC.hoja : A_VC.hojaS)); }
}

const A_VC_CIELO_ESTE = [[0, '#3e3a7e'], [0.28, '#6a5a9e'], [0.5, '#b888b4'], [0.68, '#f0aab0'], [0.82, '#f8c0a8'], [0.92, '#a8a0cc'], [1, '#8a92c4']].map(([f, c]) => [f, hex(c)]);

const A_VC_HOR = 80;

function a_vcPlayaFijo(R, n, ctx) {
  const { rect, pset, linea, disco, poligono } = R, V = [];
  a_vcDegradado(R, 0, A_VC_HOR, n ? A_VC_CIELO_N : A_VC_CIELO_ESTE);
  // la luna que sale (pálida en el ocaso, brillante de noche)
  if (n) a_vcLuna(R, 232, 32); else { R.disco(232, 34, 5, hex('#f4dce0')); R.disco(231, 33, 3, hex('#fbecec')); }
  ctx.marca();
  // el mar: del lila del horizonte al turquesa de la orilla
  a_vcDegradado(R, A_VC_HOR, 124, [[0, '#6a70b0'], [0.15, '#4a6aa8'], [0.4, '#2e7ab0'], [0.7, '#2a9ab8'], [1, '#5ac8c8']].map(([f, c]) => [f, hex(c)]));
  // los reflejos rosas del cielo en el agua, en trazos horizontales
  for (let i = 0; i < 160; i++) { const y = A_VC_HOR + 2 + Math.floor(h(i, 1, 790) ** 1.5 * 34), x = Math.floor(h(i, 2, 790) * 320), L = 2 + Math.floor(h(i, 3, 790) * 7); rect(x, y, x + L, y, y < 100 ? hex('#b8a0d0') : hex('#80b8d8')); }
  rect(0, A_VC_HOR, 319, A_VC_HOR, hex('#c8a8d0'));
  // la costa a la izquierda: la arena que se aleja y los hoteles diminutos con palmeras
  poligono([[0, 92], [130, A_VC_HOR], [130, A_VC_HOR + 1], [0, 100]], hex('#e8d0a0')); linea(0, 100, 130, A_VC_HOR + 1, hex('#f8f0e0'));
  for (let x = 0, k = 0; x < 120; k++) { const u = x / 125, w = Math.max(3, Math.round(14 * (1 - u))), alto = Math.max(3, Math.round(34 * (1 - u) ** 1.2 + h(k, 1, 791) * 10 * (1 - u))), base = Math.round(92 - 12 * u), c = [A_VC.rosa, A_VC.menta, A_VC.amar, A_VC.azul, A_VC.lila][k % 5];
    const cc = a_vcMez(c, hex('#b0a0c8'), 0.25 + u * 0.4); rect(x, base - alto, x + w - 1, base, cc); rect(x + w - 1, base - alto, x + w - 1, base, a_vcMez(cc, hex('#5a4a7a'), 0.3)); rect(x, base - alto, x + w - 1, base - alto, a_vcMez(cc, hex('#ffffff'), 0.4));
    for (let y = base - alto + 2; y < base - 1; y += 3) for (let i = x + 1; i < x + w - 1; i += 2) { pset(i, y, a_vcMez(cc, hex('#5a4a7a'), 0.35)); V.push([i, y, 1, 1, 9]); }
    if (k % 2 === 0 && w > 5) { const px = x + w + 1; linea(px, base, px, base - Math.round(alto * 0.7), hex('#6a5a5a')); for (const d of [-2, -1, 1, 2]) pset(px + d, base - Math.round(alto * 0.7) + Math.abs(d) - 1, hex('#3a6a4a')); }
    x += w + 1 + Math.round(h(k, 2, 791) * 3 * (1 - u)); }
  // la arena: más clara arriba, moteada, con ondas que dejó el viento, la línea de algas y conchas
  a_vcDegradado(R, 124, 180, [[0, '#d8b880'], [0.15, '#ecd29a'], [0.6, '#f4dcaa'], [1, '#f8e4b8']].map(([f, c]) => [f, hex(c)]));
  for (let i = 0; i < 900; i++) { const x = Math.floor(h(i, 1, 792) * 320), y = 126 + Math.floor(h(i, 2, 792) * 54); pset(x, y, i % 3 ? A_VC.arenaS ?? hex('#c8b070') : hex('#fff4d8')); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 3, 792) * 300), y = 140 + Math.floor(h(k, 4, 792) * 38); for (let i = 0; i < 6; i++) pset(x + i, y + Math.round(Math.sin(i * 0.9) * 0.6), hex('#dcc08a')); }
  for (let x = 0; x < 320; x += 2) if (h(x, 1, 793) < 0.5) { const y = 133 + Math.round(Math.sin(x / 23) * 2); pset(x, y, hex('#7a6a3a')); if (h(x, 2, 793) < 0.3) pset(x + 1, y + 1, hex('#5a7a3a')); }
  for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 5, 793) * 310), y = 136 + Math.floor(h(k, 6, 793) * 40); pset(x, y, hex('#ffffff')); pset(x + 1, y, hex('#f0c8c0')); }
  // las huellas que cruzan la arena en diagonal
  for (let k = 0; k < 18; k++) { const x = 24 + k * 9 + (k % 2) * 2, y = 176 - k * 2.4 + (k % 2) * 2; rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 2, hex('#d4b47a')); pset(Math.round(x), Math.round(y) + 3, hex('#c8a46a')); }
  // la caseta de socorrista: patas, rampa con barandilla, la caseta de colores con su franja, ventana y salvavidas
  { const c = hex('#ff9ab8'), cS = hex('#d87a98'), cL = hex('#ffd0e0'), tq = hex('#40c8d0'), am = hex('#ffd860');
    for (const x of [252, 268, 280, 294]) { rect(x, 104, x + 1, 134, hex('#e8e0d8')); rect(x + 1, 104, x + 1, 134, hex('#b8a8a0')); } linea(253, 132, 268, 106, hex('#c8bcb0')); linea(281, 106, 294, 132, hex('#c8bcb0'));
    rect(248, 102, 300, 105, hex('#f8f0e8')); rect(248, 105, 300, 105, hex('#b8a8a0'));
    poligono([[214, 136], [218, 136], [252, 104], [248, 104]], hex('#e8dcd0')); linea(214, 136, 248, 104, hex('#b8a8a0')); for (let i = 0; i < 6; i++) { const x = 220 + i * 5, y = 130 - i * 4.6; rect(x, Math.round(y) - 6, x, Math.round(y), hex('#f8f0e8')); } linea(219, 124, 250, 95, hex('#f8f0e8'));
    rect(252, 84, 296, 102, c); rect(252, 84, 253, 102, cL); rect(294, 84, 296, 102, cS); rect(252, 93, 296, 95, tq); rect(252, 96, 296, 96, am);
    for (let x = 255; x < 294; x += 4) rect(x, 97, x, 101, cS);
    rect(259, 86, 289, 92, hex('#3a3a5a')); rect(259, 86, 289, 86, hex('#2a2a3a')); rect(274, 86, 274, 92, c);
    // el tejado curvo que vuela
    for (let i = 0; i < 4; i++) rect(249 + i, 80 + i, 299 - i, 80 + i, i === 0 ? hex('#ffffff') : i < 3 ? tq : hex('#2a9aa8'));
    rect(256, 78, 292, 79, tq); rect(256, 78, 292, 78, hex('#8ae8f0'));
    disco(290, 99, 3, hex('#ff6a2a')); disco(290, 99, 1, c); pset(288, 97, hex('#ffffff')); pset(292, 101, hex('#ffffff'));
    rect(298, 66, 298, 104, hex('#c8c0b8')); rect(299, 66, 299, 104, hex('#8a8088')); }
  // las sombrillas, las toallas, la nevera, el castillo de arena con su cubo y su pala
  for (const [x, yt, ys, w, c1, c2] of [[52, 116, 142, 16, '#ff6a9a', '#f8f0e8'], [150, 120, 144, 14, '#40c8d0', '#ffd860'], [118, 112, 136, 11, '#c87af0', '#f8f0e8']]) {
    for (let j = 0; j < 4; j++) for (let i = -w; i <= w; i++) pset(x + i, ys + 1 + Math.round(j / 2), a_vcMez(hex('#f4dcaa'), hex('#8a6a5a'), 0.3));
    a_vcSombrilla(R, x, yt, ys, w, hex(c1), hex(c2), (c) => c); }
  for (const [x0, y0, w, cs] of [[34, 144, 26, ['#ff7ab0', '#f8f0e8', '#40c8d0']], [136, 146, 24, ['#ffd860', '#e8505a', '#ffd860']]]) for (let j = 0; j < 7; j++) for (let i = 0; i < w; i++) pset(x0 + i + Math.round(j * 0.4), y0 + j, hex(cs[Math.floor(i / 4) % 3]));
  rect(168, 139, 178, 145, hex('#3a7ae0')); rect(168, 139, 178, 140, hex('#f8f8f8')); rect(168, 145, 178, 145, hex('#2a5ab0')); rect(171, 137, 175, 138, hex('#8a8a96'));
  { const x = 196; for (let j = 0; j < 10; j++) rect(x + Math.floor(j / 3), 148 - j, x + 16 - Math.floor(j / 3), 148 - j, j % 3 === 0 ? hex('#c8a46a') : hex('#e0c48a')); rect(x + 5, 133, x + 11, 138, hex('#dcc088')); for (const dx of [4, 8, 12]) rect(x + dx - 1, 136, x + dx, 138, hex('#e8cc94')); for (const dx of [5, 7, 9, 11]) pset(x + dx, 132, hex('#dcc088')); rect(x + 8, 125, x + 8, 132, hex('#8a6a4a')); rect(x + 9, 125, x + 11, 127, hex('#ff4a6a'));
    for (let i = x; i <= x + 16; i++) pset(i, 149, hex('#b89660')); rect(x + 18, 143, x + 22, 149, hex('#ff7a2a')); rect(x + 18, 143, x + 22, 143, hex('#ffb070')); linea(x + 24, 149, x + 28, 141, hex('#3a8ae0')); }
  if (n) { ctx.oscurece(); a_vcEnciende(R, V, 0.7); R.rect(259, 86, 289, 92, hex('#ffd890'));
    // de noche la arena guarda algo de luz de luna, y la caseta encendida echa su charco de luz cálida
    a_vcAlumbra(R, [[0, 124, 319, 179]], hex('#a898c0'), 0.22);
    for (let y = 126; y < 150; y++) for (let x = 230; x < 320; x++) { const e = ((x - 274) / 44) ** 2 + ((y - 136) / 10) ** 2; if (e < 1 && a_vcB4(x, y) < (1 - e) * 0.9) pset(x, y, a_vcMez(R.pget(x, y), hex('#ffd890'), 0.3)); } }
}

function a_vcPlaya(R, t, S) {
  const { noche, tn } = S, c = a_vcFondo(R, 'vc-playa', noche, (n, ctx) => a_vcPlayaFijo(R, n, ctx)), B = R.buf;
  a_vcCielo(R, t, c.m, noche, A_VC_HOR, { nubes: 6, gaviotas: 3 });
  // las crestas del mar que avanzan hacia la orilla y los destellos
  for (let k = 0; k < 46; k++) { const fase = (t * 0.12 + h(k, 1, 794)) % 1, y = Math.round(A_VC_HOR + 3 + fase ** 1.6 * 32), x = Math.floor(h(k, 2, 794) * 320 + Math.sin(t * 0.3 + k) * 4), L = 2 + Math.round(fase * 9);
    if (y > A_VC_HOR + 1 && !(x < 130 && y < 100 - x * 0.12)) for (let i = 0; i < L; i++) if (x + i >= 0 && x + i < 320) B[y * 320 + x + i] = tn(i === 0 || i === L - 1 ? hex('#7ab0d8') : hex('#c8e4f0')); }
  // de noche, el camino de la luna en el agua
  if (noche > 0.3) for (let y = A_VC_HOR + 2; y < 112; y++) { const w = 2 + Math.round((y - A_VC_HOR) * 0.45); for (let k = 0; k < 2; k++) { if (h(y, k, Math.floor(t * 6)) < 0.4) continue; const x = 232 + Math.round((h(y, k + 5, Math.floor(t * 3)) - 0.5) * w * 2), L = 1 + Math.floor(h(y, k, 797) * 4); for (let i = 0; i < L; i++) if (x + i < 320) B[y * 320 + x + i] = a_vcMez(B[y * 320 + x + i], hex('#f8f0e0'), 0.8 * (noche - 0.3) / 0.7); } }
  // un barco en el horizonte, el velero que cabecea y dos bañistas que asoman la cabeza
  { const x = Math.round(300 - (t * 1.2) % 360); if (x > 135) { R.rect(x, A_VC_HOR - 2, x + 9, A_VC_HOR - 1, tn(hex('#5a5a7a'))); R.rect(x + 2, A_VC_HOR - 4, x + 5, A_VC_HOR - 3, tn(hex('#e8e0f0'))); R.pset(x + 7, A_VC_HOR - 3, tn(hex('#8a5a5a'))); if (noche > 0.4) R.pset(x + 1, A_VC_HOR - 3, hex('#fff0a0')); } }
  { const x = Math.round(150 + Math.sin(t * 0.05) * 40 + t * 0.8) % 200 + 100, y = 96 + Math.round(Math.sin(t * 1.4) * 0.8);
    R.poligono([[x, y], [x + 1, y - 18], [x + 11, y - 2]], tn(hex('#f8f4ec'))); R.poligono([[x - 1, y - 1], [x - 1, y - 14], [x - 8, y - 1]], tn(hex('#ff8ab0'))); R.rect(x, y - 19, x, y, tn(hex('#5a4a5a')));
    R.rect(x - 8, y + 1, x + 12, y + 2, tn(hex('#f8f8f8'))); R.rect(x - 6, y + 3, x + 10, y + 3, tn(hex('#3a5a8a'))); for (let i = -9; i <= 13; i += 3) R.pset(x + i, y + 4, tn(hex('#c8e4f0'))); }
  for (let k = 0; k < 3; k++) { const x = 70 + k * 46 + Math.round(Math.sin(t * 0.4 + k) * 6), y = 112 + k * 2 + Math.round(Math.sin(t * 2 + k * 2)); R.rect(x - 1, y - 1, x + 1, y, tn(A_VC_GENTE[k + 1][0])); R.rect(x - 1, y - 2, x + 1, y - 2, tn(A_VC_GENTE[k + 1][1])); R.rect(x - 3, y + 1, x + 3, y + 1, tn(hex('#c8e4f0'))); if (k === 1 && Math.sin(t * 1.3) > 0.4) { R.pset(x + 2, y - 3, tn(A_VC_GENTE[2][0])); R.pset(x + 3, y - 4, tn(A_VC_GENTE[2][0])); } }
  // la ola que rompe: la cresta blanca, la espuma que sube por la arena mojada y se retira
  const sube = (Math.sin(t * 2 * Math.PI / 6.5) + 1) / 2, yb = Math.round(121 + sube * 8);
  for (let x = 0; x < 320; x++) { const ond = Math.round(Math.sin(x / 17 + t * 0.9) * 1.5 + Math.sin(x / 7 - t * 1.7) * 0.8), yc = 114 + Math.round(Math.sin(x / 31 + t * 0.5) * 1.5), ye = yb + ond;
    for (let y = yc - 1; y <= yc + 1; y++) B[y * 320 + x] = tn(y === yc - 1 ? hex('#ffffff') : hex('#d0ecf4'));
    if (h(x, Math.floor(t * 4), 795) < 0.4) B[(yc + 2) * 320 + x] = tn(hex('#a8dce8'));
    for (let y = 124; y < ye; y++) { const i = y * 320 + x; B[i] = tn(a_vcMez(hex('#4ab8c8'), hex('#bfe6e8'), (y - 124) / 8)); }
    for (let y = ye; y < Math.min(180, ye + 2); y++) B[y * 320 + x] = tn(hex('#ffffff'));
    for (let y = ye + 2; y < 133; y++) { const i = y * 320 + x; B[i] = a_vcMez(B[i], tn(hex('#a88a5a')), 0.35); if ((x + y * 3) % 23 === 0) B[i] = tn(hex('#f0e8f0')); else if (noche > 0.3 && Math.abs(x - 232) < 3 + (y - ye) && h(x, y, Math.floor(t * 4)) < 0.35) B[i] = a_vcMez(B[i], hex('#e8e0f0'), 0.6 * noche); } }
  // alguien que corre por la arena mojada y una pareja que pasea por la orilla
  { const x = Math.round(((t * 16) % 380) - 30); a_vcFig(R, x, yb + 9, t * 1.6, 4, tn, { dir: 1 }); }
  { const x = Math.round(300 - ((t * 5 + 120) % 360)); a_vcFig(R, x, 137, t, 1, tn, { dir: -1 }); a_vcFig(R, x + 5, 137, t, 2, tn, { dir: -1 }); }
  // los correlimos que corren detrás de la ola
  for (let k = 0; k < 3; k++) { const x = Math.round(160 + k * 14 + Math.sin(t * 0.6 + k) * 20), y = yb + 4 + (k % 2), p = Math.floor(t * 10 + k) % 2; const cc = tn(hex('#8a7a6a')); R.rect(x, y - 3, x + 2, y - 2, cc); R.pset(x + 3, y - 3, cc); R.pset(x + 4, y - 3, tn(hex('#2a2a2a'))); R.pset(x + p, y - 1, tn(hex('#2a2a2a'))); R.pset(x + 2 - p, y - 1, tn(hex('#2a2a2a'))); R.pset(x + 1, y - 2, tn(hex('#f8f0e8'))); }
  // la avioneta con su pancarta de rayas y una palmera (sin letras), que ondea
  { const u = ((t + 18) % 46) / 46, x = Math.round(340 - u * 520), y = 52 + Math.round(Math.sin(t * 0.8)); if (x > -80 && x < 330) {
      const cc = tn(hex('#f8f4ec')); R.rect(x, y, x + 9, y + 2, cc); R.rect(x + 3, y - 2, x + 5, y + 4, cc); R.rect(x + 8, y - 2, x + 9, y, cc); R.pset(x - 1, y + 1, tn(hex('#5a5a6a'))); if (Math.floor(t * 12) % 2) R.pset(x - 2, y + (Math.floor(t * 24) % 3) - 1, tn(hex('#5a5a6a'))); if (noche > 0.3 && Math.floor(t * 2) % 2) R.pset(x + 4, y - 3, hex('#ff4a4a'));
      R.linea(x + 10, y + 1, x + 22, y + 1, tn(hex('#8a8a96')));
      for (let i = 0; i < 46; i++) { const bx = x + 22 + i, ond = Math.round(Math.sin(i * 0.25 - t * 6) * 1.2); if (bx < 0 || bx > 319 || a_vcCalma(bx, y)) continue; for (let j = -3; j <= 3; j++) { const by = y + j + ond; let cc2 = j === -3 || j === 3 ? hex('#ff6a9a') : hex('#f8f4ec'); if (i > 30 && i < 42) { const ii = i - 36, jj = j; if ((ii === 0 && jj >= -1) || (jj === -2 && Math.abs(ii) <= 3) || (jj === -1 && Math.abs(ii) === 3)) cc2 = hex('#2aa86a'); } else if (i > 3 && i < 28 && (j === -1 || j === 1) && (i % 6) < 4) cc2 = hex('#3a8ac8'); R.pset(bx, by, tn(cc2)); } } } }
  // la bandera de la caseta, el socorrista que mira con prismáticos y el cangrejo
  { for (let i = 0; i < 9; i++) { const ond = Math.round(Math.sin(i * 0.8 - t * 7) * (i / 9) * 1.5); for (let j = 0; j < 6; j++) R.pset(299 + i, 66 + j + ond, tn(hex(i < 9 && j < 3 ? '#ffd230' : '#f0b820'))); } }
  { const x = 267 + Math.round(Math.sin(t * 0.5) * 3), mira = Math.sin(t * 0.9) > 0; R.rect(x - 2, 87, x + 2, 92, tn(hex('#c8906a'))); R.rect(x - 2, 86, x + 2, 87, tn(hex('#3a2418'))); R.rect(x - 3, 90, x + 3, 92, tn(hex('#e8505a'))); if (mira) { R.rect(x - 1, 88, x + 2, 89, tn(hex('#2a2a2a'))); R.pset(x + 3, 88, tn(hex('#8ae0f0'))); } }
  { const x = 108 + Math.round(Math.sin(t * 0.7) * 14), y = 168, p = Math.floor(t * 9) % 2, cc = tn(hex('#ff6a3a')), ccS = tn(hex('#c84a2a')); R.rect(x - 2, y - 2, x + 2, y, cc); R.rect(x - 2, y, x + 2, y, ccS); R.pset(x - 1, y - 3, tn(C.k)); R.pset(x + 1, y - 3, tn(C.k)); R.pset(x - 3, y - 3 + p, cc); R.pset(x + 3, y - 3 + (1 - p), cc); R.pset(x - 4, y - 4 + p, cc); R.pset(x + 4, y - 4 + (1 - p), cc); for (const d of [-2, 0, 2]) R.pset(x + d + (p ? 1 : 0) - 1, y + 1, ccS); }
  // la bañista que toma el sol y mueve el pie, y el que lee bajo la sombrilla lila
  { R.rect(40, 146, 52, 147, tn(hex('#f0c09a'))); R.rect(44, 146, 50, 146, tn(hex('#40c8d0'))); R.rect(38, 145, 40, 147, tn(hex('#3a2418'))); R.pset(53 + (Math.sin(t * 3) > 0.3 ? 1 : 0), 145, tn(hex('#f0c09a'))); R.rect(36, 146, 37, 147, tn(hex('#f8f0e8'))); }
  { R.rect(140, 147, 150, 148, tn(hex('#a8704a'))); R.rect(140, 147, 145, 147, tn(hex('#ff8a4a'))); R.rect(138, 145, 140, 148, tn(hex('#1a1414'))); const pag = Math.floor(t / 2.7) % 2; R.rect(141, 143 - pag, 144, 145, tn(hex('#f8f4ec'))); R.pset(142, 144, tn(hex('#5a5a8a'))); }
  if (noche > 0.3) for (let j = -9; j <= 9; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j * 1.4) / 14; if (d < 1 && (1 - d) ** 1.3 > a_vcB4(274 + i, 89 + j) * 1.3) a_vcVela(R, 274 + i, 89 + j, hex('#ffd890'), 0.3 * noche); }
  return { suelo: 158, libre: [20, 230], orilla: [0, 320, 118, 130], caseta: [246, 300] };
}

// delante de la playa: las matas de avena de mar que se mecen en las dos esquinas y una silla de playa de rayas
function a_vcPlayaDelante(R, t, S) {
  const { tn } = S;
  for (const [x0, x1] of [[0, 34], [286, 320]]) for (let x = x0; x < x1; x += 2) { const alto = 14 + Math.round(h(x, 1, 796) * 16), mec = Math.sin(t * 1.8 + x * 0.3) * 3, c = tn(h(x, 2, 796) < 0.4 ? hex('#a8a050') : hex('#7a8a40'));
    R.linea(x, 180, Math.round(x + mec), 180 - alto, c); if (h(x, 3, 796) < 0.5) { const sx = Math.round(x + mec), sy = 180 - alto; R.rect(sx - 1, sy - 3, sx, sy, tn(hex('#d8b870'))); R.pset(sx + 1, sy - 2, tn(hex('#c8a060'))); } }
  // la silla de playa plegable, de rayas, con una toalla
  { const x = 252, y = 178, cc = tn(hex('#c8c8d0')); R.linea(x, y, x + 22, y - 16, cc); R.linea(x + 20, y, x + 6, y - 12, cc); R.linea(x - 2, y - 26, x + 6, y - 12, cc);
    for (let i = 0; i < 12; i++) { const yy = y - 26 + i; R.rect(x - 1 + Math.round(i * 0.6), yy, x + 4 + Math.round(i * 0.6), yy, tn(((i >> 1) & 1) ? hex('#ff6a9a') : hex('#f8f0e8'))); }
    for (let i = 0; i < 16; i++) R.rect(x + 6 + i, y - 12 - Math.round(i * 0.25), x + 6 + i, y - 11 - Math.round(i * 0.25), tn((i >> 2) & 1 ? hex('#ff6a9a') : hex('#f8f0e8'))); R.rect(x + 12, y - 15, x + 18, y - 13, tn(hex('#40c8d0'))); }
}

const A_VC_HORC = 94;

function a_vcCocheFijo(R, n, ctx) {
  const { rect, pset, linea, disco, poligono } = R, V = [];
  a_vcDegradado(R, 0, A_VC_HORC, n ? A_VC_CIELO_N : A_VC_CIELO_D);
  if (n) a_vcLuna(R, 236, 34); else a_vcSol(R, 66, 80, 11);
  a_vcDegradado(R, A_VC_HORC, 120, n ? [[0, '#2a2050'], [0.5, '#1e1a40'], [1, '#18183a']].map(([f, c]) => [f, hex(c)]) : [[0, '#c87aa0'], [0.3, '#8a6aa8'], [0.7, '#4a6aa8'], [1, '#3a7ab0']].map(([f, c]) => [f, hex(c)]));
  rect(0, A_VC_HORC, 319, A_VC_HORC, n ? hex('#3a2a5a') : hex('#ffd0a0'));
  ctx.marca();
  // el cabo lejano a la izquierda y el muelle de madera de la derecha, con sus farolillos
  poligono([[0, A_VC_HORC - 5], [18, A_VC_HORC - 6], [40, A_VC_HORC - 2], [52, A_VC_HORC], [0, A_VC_HORC]], hex('#7a5a8a'));
  rect(228, 88, 319, 90, hex('#8a6a6a')); rect(228, 88, 319, 88, hex('#c8a090')); for (let x = 230; x < 320; x += 7) { rect(x, 91, x + 1, 104, hex('#5a4050')); } linea(228, 91, 319, 91, hex('#6a4a5a'));
  for (let x = 236; x < 320; x += 18) { rect(x, 82, x, 87, hex('#5a4050')); rect(x - 1, 81, x + 1, 81, hex('#f8e0b0')); V.push([x - 1, 81, 3, 1, 9]); }
  for (let k = 0; k < 3; k++) { const x = 250 + k * 22; rect(x, 85, x + 1, 87, hex('#3a2a3a')); pset(x, 84, hex('#3a2a3a')); }
  // la arena de abajo, que se ve entre los balaustres
  rect(0, 118, 319, 130, hex('#e8c896')); for (let i = 0; i < 160; i++) pset(Math.floor(h(i, 1, 800) * 320), 118 + Math.floor(h(i, 2, 800) * 12), i % 2 ? hex('#d4b07a') : hex('#f8e0b0'));
  // la balaustrada del paseo: la albardilla con su luz, los balaustres en forma de jarrón y el zócalo
  rect(0, 108, 319, 112, hex('#f8f0e4')); rect(0, 108, 319, 108, hex('#ffffff')); rect(0, 112, 319, 113, hex('#c8b8b0')); for (let x = 0; x < 320; x += 40) rect(x, 108, x + 1, 113, hex('#ddd0c4'));
  for (let x = 3; x < 320; x += 8) { const cb = hex('#f0e6da'), cs = hex('#c4b4ac'); rect(x, 114, x + 3, 115, cb); rect(x + 1, 116, x + 2, 117, cb); rect(x, 118, x + 3, 123, cb); rect(x + 3, 118, x + 3, 123, cs); rect(x + 1, 124, x + 2, 125, cb); rect(x, 126, x + 3, 127, cb); rect(x + 3, 114, x + 3, 115, cs); }
  for (let x = 0; x < 320; x += 40) rect(x, 113, x + 5, 129, hex('#f8f0e4')), rect(x + 4, 113, x + 5, 129, hex('#c8b8b0'));
  rect(0, 128, 319, 131, hex('#e2d4c6')); rect(0, 128, 319, 128, hex('#f8f0e8')); rect(0, 131, 319, 131, hex('#a89890'));
  // el paseo: losas de dos tonos con su moteado; abajo, el bordillo
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 132) / 8), b = (Math.floor((x + fila * 9) / 18) + fila) % 2; let c = b ? hex('#ecd0c0') : hex('#e0c0b0'); if ((x + fila * 9) % 18 === 0 || (y - 132) % 8 === 0) c = hex('#c4a090'); pset(x, y, c); }
  for (let i = 0; i < 500; i++) pset(Math.floor(h(i, 3, 800) * 320), 132 + Math.floor(h(i, 4, 800) * 48), i % 2 ? hex('#f8e4d8') : hex('#c8a898'));
  // la sombra del coche en el suelo
  for (let y = 156; y < 164; y++) for (let x = 92; x < 258; x++) { const e = ((x - 175) / 86) ** 2 + ((y - 159) / 5) ** 2; if (e < 1 && a_vcB4(x, y) < 0.85) pset(x, y, a_vcMez(R.pget(x, y), hex('#3a2040'), 0.45)); }
  // la parte de atrás del coche (lo que queda detrás de los actores): la aleta y el maletero, el canto de la puerta del
  // otro lado, los dos asientos de cuero claro con su vivo y el salpicadero con sus relojes
  const col = hex('#3ac8d0'), cS = hex('#1a8a9a'), cL = hex('#9af0f0');
  rect(100, 128, 140, 135, col); rect(100, 128, 140, 128, cL); rect(104, 126, 132, 127, col); rect(104, 126, 132, 126, cL);
  rect(140, 131, 206, 135, cS); rect(140, 131, 206, 131, col);
  for (const sx of [142, 168]) { rect(sx, 118, sx + 7, 135, hex('#f4ece0')); rect(sx, 118, sx + 7, 118, hex('#ffffff')); rect(sx + 6, 119, sx + 7, 135, hex('#c8bcb0')); for (let y = 121; y < 134; y += 3) rect(sx + 1, y, sx + 5, y, hex('#dcd0c4')); rect(sx, 118, sx, 135, hex('#40c8d0')); rect(sx + 1, 113, sx + 6, 117, hex('#f4ece0')); rect(sx + 1, 113, sx + 6, 113, hex('#ffffff')); rect(sx + 6, 114, sx + 6, 117, hex('#c8bcb0')); rect(sx + 3, 117, sx + 4, 117, hex('#8a8a96')); }
  rect(192, 132, 208, 136, hex('#2a2a3a')); rect(192, 132, 208, 132, hex('#5a5a6a')); for (const x of [197, 203]) { pset(x, 134, hex('#e8e8d0')); pset(x + 1, 134, hex('#c8c8b0')); }
  if (n) { ctx.oscurece(); a_vcEnciende(R, V, 1); R.rect(197, 134, 198, 134, hex('#8af0a0')); R.rect(203, 134, 204, 134, hex('#8af0a0')); }
}

function a_vcCocheVista(R, t, S) {
  const { noche, tn } = S, c = a_vcFondo(R, 'vc-coche', noche, (n, ctx) => a_vcCocheFijo(R, n, ctx)), B = R.buf;
  a_vcCielo(R, t, c.m, noche, A_VC_HORC, { nubes: 6, gaviotas: 4 });
  // el camino del sol (o de la luna) en el agua: trazos que tiemblan, y las olas que corren
  { const sx = noche > 0.5 ? 236 : 66; for (let y = A_VC_HORC + 1; y < 118; y++) { const w = 2 + Math.round((y - A_VC_HORC) * 0.5); for (let k = 0; k < 3; k++) { if (h(y, k, Math.floor(t * 6)) < 0.45) continue; const x = sx + Math.round((h(y, k + 5, Math.floor(t * 3)) - 0.5) * w * 2), L = 1 + Math.floor(h(y, k, 801) * 4); for (let i = 0; i < L; i++) if (x + i >= 0 && x + i < 320 && c.m[y * 320 + x + i]) B[y * 320 + x + i] = noche > 0.5 ? a_vcMez(hex('#fff0d0'), hex('#c8c0e0'), 0.3) : hex('#fff0b0'); } } }
  for (let k = 0; k < 30; k++) { const fase = (t * 0.1 + h(k, 1, 802)) % 1, y = Math.round(A_VC_HORC + 2 + fase * 22), x = Math.floor(h(k, 2, 802) * 320), L = 2 + Math.round(fase * 7); for (let i = 0; i < L; i++) if (x + i < 320 && c.m[y * 320 + x + i]) B[y * 320 + x + i] = tn(i === 0 ? hex('#8ab0d8') : hex('#d8c8e8')); }
  // un velero lejano, un pelícano que pasa y la gente que pasea por el muelle
  { const x = Math.round(120 + (t * 1.5) % 120), y = A_VC_HORC + 4; if (c.m[(y - 4) * 320 + x]) { R.poligono([[x, y], [x + 1, y - 9], [x + 6, y - 1]], tn(hex('#f8f4ec'))); R.rect(x - 4, y, x + 7, y, tn(hex('#5a4a6a'))); } }
  for (let k = 0; k < 3; k++) { const x = ((h(k, 1, 803) * 100 + t * (k % 2 ? -5 : 4)) % 100 + 100) % 100 + 226; a_vcFig(R, Math.round(x), 87, t, k + 2, tn, { dir: k % 2 ? -1 : 1 }); }
  { const u = ((t + 3) % 22) / 22, x = Math.round(-20 + u * 360), y = 68 + Math.round(Math.sin(t * 0.9) * 2); if (!a_vcCalma(x, y)) { const cc = tn(hex('#8a7a70')), ala = Math.floor(t * 3) % 3 === 0 ? -1 : 0; R.rect(x, y, x + 6, y + 1, cc); R.rect(x + 6, y - 1, x + 8, y, cc); R.rect(x + 8, y, x + 12, y, tn(hex('#e8a040'))); R.rect(x + 9, y + 1, x + 11, y + 1, tn(hex('#d88a30'))); R.linea(x + 1, y + ala, x - 6, y - 2 + ala * 2, cc); R.linea(x + 3, y + ala, x - 3, y - 3 + ala * 2, cc); } }
  // la gente que pasea por el paseo, detrás del coche, y una gaviota que camina por las losas de delante
  for (let k = 0; k < 3; k++) { const v = [6, -8, 11][k], x = ((h(k, 4, 804) * 380 + t * v) % 380 + 380) % 380 - 30; a_vcFig(R, Math.round(x), 134, t, k + 3, tn, { dir: v > 0 ? 1 : -1, patina: k === 2 }); }
  { const u = (t * 0.07) % 2, x = Math.round(u < 1 ? 40 + u * 40 : 120 - (u - 1) * 40), y = 172, d = u < 1 ? 1 : -1, pica = Math.sin(t * 3) > 0.8, cc = tn(hex('#f4f0ec')), cg = tn(hex('#9aa0aa'));
    R.rect(x - 3, y - 4, x + 2, y - 2, cc); R.rect(x - 3 * d - (d > 0 ? 0 : 0), y - 4, x - 3 * d, y - 3, cg); R.rect(x + 2 * d, y - 6 + (pica ? 3 : 0), x + 3 * d, y - 5 + (pica ? 3 : 0), cc); R.pset(x + 4 * d, y - 5 + (pica ? 3 : 0), tn(hex('#f0b030'))); R.pset(x + 3 * d, y - 6 + (pica ? 3 : 0), tn(C.k));
    const p = Math.floor(t * 6) % 2; R.pset(x - p, y - 1, tn(hex('#f0a040'))); R.pset(x + 1 - p, y, tn(hex('#f0a040'))); R.pset(x + p, y - 1, tn(hex('#f0a040'))); }
  // de noche, las farolas del paseo detrás de la balaustrada
  for (const x of [20, 300]) a_vcFarola(R, x, 108, 30, noche, t, tn);
  a_vcPalmera(R, 34, 109, 50, t, tn, { incl: 0.3, s: 1.1 });
  a_vcPalmera(R, 290, 109, 44, t, tn, { incl: -0.35, s: 1 });
  return { suelo: 160, libre: [60, 250], asientos: [[150, 146], [176, 146]], volante: [197, 131] };
}

// la parte del coche que va DELANTE de los actores: la puerta con su moldura cromada y su tirador, las aletas, el capó,
// las ruedas de banda blanca, los parachoques, el faro y el piloto, el retrovisor, el volante y el parabrisas; de
// noche, los pilotos y el faro alumbran
function a_vcCocheDelante(R, t, S) {
  const { tn, noche } = S, col = tn(S.o.colorCoche ? hex(S.o.colorCoche) : hex('#3ac8d0')), cS = a_vcMez(col, tn(hex('#14304a')), 0.45), cL = a_vcMez(col, hex('#ffffff'), 0.5), cro = tn(hex('#e8eef4')), croS = tn(hex('#8a96a8')), osc = tn(hex('#1e1a26'));
  const { rect, pset, linea, disco } = R;
  // el volante (de canto) y el retrovisor
  for (let j = -5; j <= 5; j++) { const w = Math.round(Math.sqrt(25 - j * j) * 0.4); pset(197 - w, 131 + j, osc); pset(197 + w, 131 + j, osc); } linea(197, 131, 202, 135, osc); pset(196, 127, tn(hex('#8a8a96')));
  // la carrocería: el perfil (de la cola al morro), en tres tonos, con el reflejo del ocaso en la parte alta
  const top = (x) => x < 112 ? 136 - Math.round(Math.sqrt(Math.max(0, 1 - ((x - 112) / 14) ** 2)) * 2) : x < 206 ? 137 : 137 + Math.round((x - 206) / 16);
  for (let x = 96; x <= 252; x++) { const y0 = top(x), y1 = x < 100 ? 152 : x > 248 ? 150 : 155;
    for (let y = y0; y <= y1; y++) { let c = y === y0 ? cL : y < y0 + 3 ? a_vcMez(col, tn(hex('#ffb0a0')), 0.35) : y > y1 - 3 ? cS : col; if (y === 143) c = cro; else if (y === 144) c = croS; pset(x, y, c); } }
  rect(96, 136, 97, 150, cS);
  // la puerta: las juntas, el tirador y el canto de luz de arriba
  for (let y = 138; y < 155; y++) { pset(146, y, cS); pset(190, y, cS); } rect(146, 137, 190, 137, cL); rect(182, 139, 186, 140, cro); rect(182, 141, 186, 141, croS);
  // los pasos de rueda y las ruedas: neumático, banda blanca, tapacubos con radios y su brillo
  for (const cx of [122, 222]) { for (let j = -12; j <= 0; j++) for (let i = -12; i <= 12; i++) if (i * i + j * j <= 144 && i * i + j * j > 110 && 151 + j >= 138) pset(cx + i, 151 + j, cS);
    for (let j = -11; j <= 9; j++) for (let i = -11; i <= 11; i++) { const d = i * i + j * j; if (d <= 110 && 151 + j >= 140 && d > 82) pset(cx + i, 151 + j, osc); }
    disco(cx, 151, 9, osc); disco(cx, 151, 7, tn(hex('#f4f4f4'))); disco(cx, 151, 5, osc); disco(cx, 151, 4, cro); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; pset(cx + Math.round(Math.cos(a) * 3), 151 + Math.round(Math.sin(a) * 3), croS); } disco(cx, 151, 1, croS); pset(cx - 2, 149, tn(hex('#ffffff'))); for (let i = -7; i <= 7; i++) pset(cx + i, 160, tn(hex('#14101a'))); }
  // los parachoques, el faro redondo, la calandra y el piloto
  rect(250, 141, 255, 151, cro); rect(250, 151, 255, 151, croS); rect(92, 140, 97, 151, cro); rect(92, 151, 97, 151, croS);
  disco(250, 140, 3, cro); disco(250, 140, 2, noche > 0.3 ? hex('#fffbe0') : tn(hex('#f8f0d0'))); pset(249, 139, hex('#ffffff'));
  for (let y = 144; y < 150; y++) rect(246, y, 249, y, y % 2 ? osc : cro);
  rect(97, 136, 99, 141, noche > 0.3 ? hex('#ff3a4a') : tn(hex('#c8304a'))); pset(98, 137, tn(hex('#ffa0a0')));
  // el parabrisas inclinado, con su marco cromado y el reflejo del cielo
  for (let j = 0; j < 22; j++) { const x = 206 + Math.round(j * 0.55), y = 136 - j; pset(x, y, cro); pset(x + 1, y, croS); for (let i = 2; i < 5; i++) a_vcVela(R, x + i, y, hex('#e8f4ff'), j > 10 && i === 3 ? 0.55 : 0.28); }
  rect(216, 114, 222, 114, cro); rect(204, 131, 208, 134, croS); disco(203, 129, 2, cro); pset(203, 129, tn(hex('#9ab8d8')));
  // un destello que corre por la moldura cromada
  { const u = (t % 5) / 5, gx = Math.round(96 + u * 300); if (gx <= 252) { pset(gx, 143, hex('#ffffff')); pset(gx - 1, 143, hex('#f8f8ff')); pset(gx, 142, hex('#fffbe8')); pset(gx, 144, hex('#fffbe8')); } }
  // de noche: el haz del faro sobre el suelo y el resplandor de los pilotos
  if (noche > 0.3) { const a = (noche - 0.3) / 0.7; for (let i = 1; i < 66; i++) for (let j = -Math.floor(i / 5); j <= Math.floor(i / 3); j++) { const x = 254 + i, y = 141 + j + Math.floor(i / 5); if (x < 320 && y < 180 && a_vcB4(x, y) < (1 - i / 66) * 0.85) a_vcVela(R, x, y, hex('#fff0c0'), 0.4 * a); }
    for (let j = -6; j <= 6; j++) for (let i = -8; i <= 2; i++) if (Math.hypot(i, j) < 7 && a_vcB4(97 + i, 138 + j) < 0.5) a_vcVela(R, 97 + i, 138 + j, hex('#ff3a4a'), 0.3 * a); }
}

// a_vcEspejo(R, t, f): deforma TODO lo que ya está pintado en el búfer en uso como un espejo de feria (f 0–1): bandas
// anchas que estiran y encogen a lo ancho (como una barriga y una cintura) y ondas suaves a lo alto que derivan
// despacio; encima, el brillo del cristal en dos franjas diagonales y el marco de feria (rayas rojas y blancas con
// bombillas que corren; arriba, solo un filo suave bajo la barra del año). Una pasada; sirve sobre cualquier decorado.
const a_vcTmp = new Uint32Array(57600), a_vcFil = new Float32Array(180), a_vcSx = new Float32Array(180), a_vcCol = new Float32Array(320);

export function a_vcEspejo(R, t, f) {
  f = a_vcLim(f); if (f <= 0) return;
  const B = R.buf; a_vcTmp.set(B);
  for (let y = 0; y < 180; y++) { a_vcFil[y] = 1 / (1 + 0.22 * f * Math.sin(y / 30 - t * 0.7)); a_vcSx[y] = 7 * f * Math.sin(y / 47 + t * 0.5); }
  for (let x = 0; x < 320; x++) a_vcCol[x] = 9 * f * Math.sin(x / 42 + t * 0.6) + 5 * f * Math.sin(x / 19 - t * 1.1);
  const bl = hex('#ffffff'), z0 = (t * 9) % 260;
  for (let y = 0; y < 180; y++) { const fy = y * 320, k = a_vcFil[y], d = a_vcSx[y];
    for (let x = 0; x < 320; x++) {
      let sx = Math.round(160 + (x - 160) * k + d), sy = Math.round(y + a_vcCol[x] * Math.sin(y / 180 * Math.PI));
      sx = sx < 0 ? 0 : sx > 319 ? 319 : sx; sy = sy < 0 ? 0 : sy > 179 ? 179 : sy;
      let c = a_vcTmp[sy * 320 + sx];
      const b = (x + y * 0.7 - z0 + 520) % 260; if ((b < 9 || (b > 16 && b < 20)) && !a_vcCalma(x, y)) c = a_vcMez(c, bl, 0.16 * f);
      B[fy + x] = c; } }
  // el marco de feria
  const a = Math.min(1, f * 1.6), roj = hex('#e83a4a'), bla = hex('#f8f0e8'), oro = hex('#f0c040'), osc = hex('#3a1a2a');
  const marco = (x, y, c, aa = a) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) B[y * 320 + x] = a_vcMez(B[y * 320 + x], c, aa); };
  for (let y = 0; y < 180; y++) for (let i = 0; i < 6; i++) { const r = ((y + i * 2) >> 3) & 1 ? roj : bla, cc = i === 0 || i === 5 ? oro : i === 4 ? osc : r, suave = y < 48 ? 0.4 * a : a; marco(i, y, cc, i === 4 ? 0.5 * suave : suave); marco(319 - i, y, cc, i === 4 ? 0.5 * suave : suave); }
  for (let x = 0; x < 320; x++) { for (let i = 0; i < 6; i++) { const r = ((x + i * 2) >> 3) & 1 ? roj : bla, cc = i === 0 || i === 5 ? oro : i === 4 ? osc : r; marco(x, 179 - i, cc, i === 4 ? 0.5 * a : a); } for (let i = 0; i < 2; i++) marco(x, i, oro, 0.35 * a); }
  if (f > 0.25) { const fase = Math.floor(t * 6); for (let k = 0; k < 40; k++) { const p = k < 13 ? [3, 56 + k * 9] : k < 26 ? [316, 56 + (k - 13) * 9] : [12 + (k - 26) * 22, 176]; if (p[1] > 176) continue; const on = (k + fase) % 3 === 0, c = on ? hex('#fff6c0') : hex('#e0a040'); marco(p[0], p[1], c); marco(p[0] + 1, p[1], c); marco(p[0], p[1] + 1, c); marco(p[0] + 1, p[1] + 1, c); if (on) { marco(p[0] - 1, p[1], hex('#fff0a0'), 0.4); marco(p[0] + 2, p[1] + 1, hex('#fff0a0'), 0.4); } } }
}

const A_VC_VISTAS = { 'ocean|general': a_vcOcean, 'ocean|terraza': a_vcTerraza, 'playa|general': a_vcPlaya, 'playa|coche': a_vcCocheVista };

const A_VC_DELANTE = { 'ocean|general': a_vcOceanDelante, 'ocean|terraza': a_vcTerrazaDelante, 'playa|general': a_vcPlayaDelante, 'playa|coche': a_vcCocheDelante };

// everglades(R, t, o): pinta los 320 × 180 y devuelve su geometría { encuadre, camara, suelo, libre, … } (las claves de
// cada vista, abajo). o.encuadre 'rio' | 'golf' (otro cae en 'rio') y o.camara (la segunda cámara de su encuadre; otra cae
// en 'general'). LLAMA A evergladesDelante(R, t, o) DESPUÉS DE LOS ACTORES, con las mismas o: pinta lo que va delante de
// ellos (juncos, raíces, hierba alta, la libélula) sin tocar la franja donde están de pie. Exporta también la pieza canónica
// a_caiman (ver el canon de la cabecera del archivo). En todas las vistas: cielo tramado con nubes de tres tonos que derivan
// a tres velocidades y pájaros; la esquina de Atom y la barra del año quedan con cielo liso tramado.
//   'rio' (general): EL RÍO DE HIERBA desde una pasarela de madera del parque (como el Anhinga Trail): juncos de sierra
//     dorados y verdes hasta el horizonte (y 90), con un canal (slough) que serpentea y charcas que reflejan el cielo y CORREN
//     DESPACIO (destellos que bajan hacia la derecha); una torre de tormenta de verano al fondo (x 150–256) con su cortina de
//     lluvia y un relámpago de vez en cuando; islas de árboles (hamacas) en el horizonte y una grande a la derecha (x 214–318)
//     con tres palmitos que se mecen; dos garzas blancas en la hierba (una pesca), otra que pasa volando, una anhinga que abre
//     las alas en el poste de la barandilla (x 266), y la LANCHA DE HÉLICE que cruza de derecha a izquierda con su estela
//     (o.lancha: un número fija su x; false la quita). Devuelve aguas: diez puntos [x, y] del canal y las charcas donde
//     caben caimanes que asoman (a_caiman con agua 1). Delante: la pasarela (tablas gastadas con clavos, y 143–156; los pies
//     en y 150), la barandilla de atrás (por detrás de los actores: poste cada 48 px, pasamanos en y 129), el letrero del
//     parque a la izquierda (x 2–28, solo pictogramas: una garza y un caimán) y el agua oscura con nenúfares bajo la pasarela.
//     o.flechas 0–1: flechas de hierba dorada que se inclinan y avanzan despacio hacia la derecha («corre despacio»), y la
//     hierba se dobla más. Devuelve suelo 150, libre [20, 270], lancha [x, 120] (donde está ahora), horizonte, pasarela,
//     barandilla, letrero, garzas, anhinga, isla.
//     Cámara 'orilla': LA ORILLA DE CERCA: al fondo el bosque de cipreses con musgo español colgando y mangles (copas por
//     debajo de y 34; a la derecha, por debajo de y 50), su reflejo temblando en el agua color té (y 92–138), nenúfares con
//     una flor, un tronco con una tortuga que saca la cabeza (x 46, y 118), burbujas que suben y revientan (x 140–230), una
//     garza azulada de pie en el agua que a ratos pica (x 288); delante el barro mojado (desde y 138) con brillos, charquitos,
//     huellas de ave, ramitas y matas. Sitio para un caimán y un cocodrilo uno junto a otro (la escena los pinta con
//     a_caiman). Devuelve suelo 156, libre [40, 260], caiman [110, 156], cocodrilo [200, 156], orillaAgua 138, agua, garza,
//     tortuga.
//   'golf' (general): UN CAMPO DE GOLF DE FLORIDA: casas de estuco con tejas y una jaula de piscina al fondo, palmeras reales
//     que se mecen, la calle con franjas de corte, el camino de los carritos (y ≈ 108) con un carrito que pasa, el green con la
//     bandera roja SIN letras que ondea (x 262), el búnker rastrillado, el lago (x 60–200, y 138–158) con su fuente que salta
//     y ondas, un golfista pequeño en el tee que golpea y la bola que vuela hasta el green, dos ibis blancos que picotean.
//     Devuelve suelo 160, libre [20, 280], lago [60, 200, 138, 158], fuente, green, bandera, bunker, camino, tee, horizonte.
//     Cámara 'lago': EL BORDE DEL LAGO de cerca: la otra orilla con casas y palmeras, el lago (y 88–148) con el cielo
//     reflejado, ondas, la fuente lejos, nenúfares, una anhinga que nada con solo el cuello fuera, pelotas de golf en el fondo
//     de la orilla; la orilla con piedras y la hierba a franjas; el cartel de aviso (x 278–302: rombo amarillo con el
//     pictograma de un caimán y una placa con un nadador tachado; ninguna letra). Devuelve suelo 160, libre [30, 260],
//     agua, orillaAgua 148, cartel, fuente.
const c_GEO_EV = {
  rio: { cam: 'orilla',
    general: { suelo: 150, libre: [20, 270], lancha: [200, 120], horizonte: 90, pasarela: [0, 320, 143, 156], barandilla: 129, letrero: [2, 100, 28, 143], garzas: [[84, 120], [150, 108]], anhinga: [266, 128], isla: [214, 318, 52, 100] },
    orilla: { suelo: 156, libre: [40, 260], caiman: [110, 156], cocodrilo: [200, 156], orillaAgua: 138, agua: [0, 320, 92, 138], garza: [288, 137], tortuga: [46, 118] } },
  golf: { cam: 'lago',
    general: { suelo: 160, libre: [20, 280], lago: [60, 200, 138, 158], fuente: [130, 148], green: [262, 112], bandera: [262, 88], bunker: [194, 242, 116, 128], camino: 108, tee: [40, 104], horizonte: 84 },
    lago: { suelo: 160, libre: [30, 260], agua: [0, 320, 88, 148], orillaAgua: 148, cartel: [278, 86, 302, 162], fuente: [244, 100] } },
};

// la vista que piden las opciones (un encuadre que no existe cae en 'rio'; una cámara que no es la suya, en 'general')
function c_vistaEv(o) { const enc = c_GEO_EV[o.encuadre] ? o.encuadre : 'rio', e = c_GEO_EV[enc], cam = o.camara === e.cam ? e.cam : 'general'; return { enc, cam, geo: e[cam] }; }

// umbral del tramado ordenado 4 × 4 en (x, y), entre 0 y 1
const c_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const c_um = (x, y) => c_BAY[((y & 3) << 2) | (x & 3)];

const c_lim = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);

// mezcla de dos colores (a 0: c1; a 1: c2)
const c_mez = (c1, c2, a) => { const r = (c1 & 255) + ((c2 & 255) - (c1 & 255)) * a, g = ((c1 >> 8) & 255) + (((c2 >> 8) & 255) - ((c1 >> 8) & 255)) * a, b = ((c1 >> 16) & 255) + (((c2 >> 16) & 255) - ((c1 >> 16) & 255)) * a; return (0xff000000 | (Math.round(b) << 16) | (Math.round(g) << 8) | Math.round(r)) >>> 0; };

// un tono de la rampa P con tramado (l 0: el primero; 1: el último)
const c_ramp = (P, l, x, y) => P[Math.max(0, Math.min(P.length - 1, Math.floor(l * (P.length - 1) + c_um(x, y))))];

// ruido suave (interpolado) para manchas, charcas y follaje
const c_vn = (x, y, k = 0) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy), a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };

// ¿cae (x, y) en la esquina de Atom (con margen)? ahí solo va cielo tranquilo
const c_atom = (x, y) => x >= 274 && y <= 47;

const c_hx = (a) => a.map(hex);

// la paleta del grupo C (rampas de oscuro a claro)
const c_PE = {
  cielo: c_hx(['#3f6db6', '#4a78bf', '#5886c8', '#6a96d0', '#80a8d8', '#98bade', '#b2cce4', '#cad8e4', '#dde2dc', '#ebe4cc']),
  nube: c_hx(['#9aa8c4', '#ccd4e4', '#f8f6ee']),
  torre: c_hx(['#5a6280', '#717a98', '#8a92ae', '#a6acc4', '#c4c6d6', '#dedce2', '#f2ece4', '#fffaf0']),
  lluvia: c_hx(['#78809a', '#8e96ae', '#a4abc0']),
  lejos: c_hx(['#4e6a72', '#5a7678', '#6a8480', '#7e928a', '#98a496']),
  hoja: c_hx(['#132a18', '#1d3c22', '#284e2a', '#346230', '#467a38', '#5e9242', '#7aa850']),
  musgo: c_hx(['#7e8c7e', '#9aa696', '#b8c0ae']),
  hierba: c_hx(['#3e4a24', '#535c2a', '#6a7032', '#84843a', '#9e9846', '#b6aa56', '#cab968', '#ddcc86', '#ecdfa8']),
  bruma: hex('#d8d6c0'),
  agua: c_hx(['#22384a', '#2e4a5c', '#3e5e72', '#557a8e', '#7096aa', '#90b2c4', '#b4ccd8', '#dce8ec']),
  te: c_hx(['#14180e', '#1e2416', '#2a301e', '#383e28', '#4a4e34', '#5e6044']),
  tabla: c_hx(['#2e261e', '#463a2e', '#5e5040', '#786852', '#928266', '#ac9c80', '#c6b89c']),
  barro: c_hx(['#231c12', '#33291a', '#463822', '#5a492c', '#705c38', '#887246', '#a08a5c']),
  cesped: c_hx(['#244a1e', '#2f5c24', '#3a6e2a', '#478232', '#56963a', '#68a844', '#7eba52', '#98cc66']),
  arena: c_hx(['#a48e60', '#c0a878', '#d8c294', '#eadab0', '#f6ecca']),
  junco: c_hx(['#2e3a18', '#4a5622', '#6e7430', '#9c9442', '#c8b45c', '#e2cc7a']),
  juncoV: c_hx(['#1e3a16', '#2c501e', '#3e6a28', '#5a8634', '#7aa044', '#a4b858']),
  piedra: c_hx(['#5e5a52', '#7e786c', '#9e968a', '#bcb4a6']),
  tronco: c_hx(['#2a2018', '#3e3024', '#564434', '#6e5a46', '#8a7660']),
  blanco: hex('#fbfaf2'), negro: hex('#14140e'),
};

// las capas fijas (cielo, fondo y suelo de cada vista): se pintan una vez en un búfer y se copian en cada fotograma
const c_CAPAS = new Map();

function c_capa(R, clave, dibuja) {
  let c = c_CAPAS.get(clave);
  if (!c) { const b = R.nuevo(), prev = R.usar(b); c = dibuja() || {}; R.usar(prev); c.b = b; c_CAPAS.set(clave, c); }
  R.copiar(c.b); return c;
}

// el cielo tramado de la capa fija (y 0 a hor): un degradado sin franjas, con un leve ondeo; devuelve una copia para saber
// luego qué píxeles siguen siendo cielo (c_mascaraCielo)
function c_cieloFijo(R, hor, P = c_PE.cielo, hasta = hor) {
  const B = R.buf;
  for (let y = 0; y < Math.max(hor, hasta); y++) for (let x = 0; x < 320; x++) { const l = y / hor + Math.sin(x * 0.031 + y * 0.12) * 0.02 + (c_vn(x / 24, y / 6, 1) - 0.5) * 0.06; B[y * 320 + x] = c_ramp(P, l, x, y); }
  return B.slice(0, Math.max(hor, hasta) * 320);
}

// la máscara del cielo: 1 donde la capa terminada conserva el cielo (o la torre) de la copia
function c_mascaraCielo(R, copia) { const B = R.buf, M = new Uint8Array(320 * 180); for (let i = 0; i < copia.length; i++) if (B[i] === copia[i]) M[i] = 1; return M; }

// una torre de tormenta (cumulonimbo) lejana: bolas con luz arriba a la izquierda, el yunque estirado a la derecha y la
// base oscura con la cortina de lluvia hasta el horizonte (hor)
function c_torre(R, cx, base, alto, ancho, hor, sem) {
  const B = R.buf, bolas = [];
  for (let j = 0; j < 7; j++) { const f = j / 6, r = ancho * (0.34 - f * 0.12) * (0.85 + h(j, sem, 61) * 0.3); bolas.push([cx + (h(j, sem, 62) - 0.5) * ancho * 0.3 - f * 4, base - r * 0.6 - f * (alto - ancho * 0.25), r]);
    if (j < 4) for (const s of [-1, 1]) bolas.push([cx + s * ancho * (0.3 + h(j, s + sem, 63) * 0.15), base - r * 0.4 - f * alto * 0.5, r * 0.62]); }
  const yA = base - alto;   // el yunque
  for (let y = Math.floor(yA - 4); y <= base; y++) for (let x = Math.floor(cx - ancho * 0.9); x <= Math.ceil(cx + ancho * 1.5); x++) {
    if (x < 0 || x > 319 || y < 0 || c_atom(x, y)) continue;
    let l = -9;
    for (const [bx, by, r] of bolas) { const dx = x + 0.5 - bx, dy = y + 0.5 - by; if (dx * dx + dy * dy > r * r) continue; const v = 0.66 - dx / r * 0.26 - dy / r * 0.34; if (v > l) l = v; }
    const ax = (x - cx) / ancho, an = (y - yA) / 7;   // el yunque: una losa fina, más larga hacia la derecha
    if (ax > -0.75 && ax < 1.4 && an > -0.5 && an < 1 + (ax > 0.2 ? 0 : 0.6) && Math.abs(an - 0.25) < 0.75 - Math.max(0, ax - 0.9) * 1.2 - Math.max(0, -ax - 0.5) * 2) { const v = 0.78 - an * 0.3 - ax * 0.12; if (v > l) l = v; }
    if (l < -5) continue;
    l -= c_lim((y - base + ancho * 0.25) / (ancho * 0.25)) * 0.45 + c_lim((y - yA) / alto) * 0.18;
    B[y * 320 + x] = c_ramp(c_PE.torre, l + (h(x >> 1, y >> 1, sem) - 0.5) * 0.08, x, y);
  }
  // la cortina de lluvia bajo la base, que se deshilacha hacia los lados
  for (let y = Math.round(base); y < hor; y++) for (let x = Math.floor(cx - ancho * 0.25); x <= Math.ceil(cx + ancho * 0.3); x++) { const e = 1 - Math.abs((x - cx - 2) / (ancho * 0.3)); if (c_um(x, y) > e * 1.2 || h(x, 3, sem) < 0.25) continue; B[y * 320 + x] = c_mez(B[y * 320 + x], c_PE.lluvia[h(x, y >> 2, sem) < 0.5 ? 0 : 1], 0.55); }
}

// las nubes de buen tiempo: L = [[x0, y, w, vel], …]; cada una, un racimo de bolas a tres tonos (sombra abajo y a la
// derecha, luz arriba a la izquierda) que deriva a su velocidad; solo pinta donde la máscara M dice cielo (y nunca en la
// esquina de Atom)
function c_nubes(R, t, L, M, T = c_PE.nube) {
  const B = R.buf;
  L.forEach(([x0, y0, w, vel], k) => {
    const span = 320 + w * 2, cx = (((x0 + t * vel) % span) + span) % span - w * 0.8, n = 3 + Math.round(w / 8), bolas = [];
    for (let i = 0; i < n; i++) { const a = i / (n - 1), r = w * (0.15 + 0.15 * Math.sin(a * Math.PI)) * (0.8 + h(i, k, 41) * 0.4); bolas.push([cx + (a - 0.5) * w * 0.9, y0 - Math.sin(a * Math.PI) * w * 0.1 - h(i, k, 42) * w * 0.05, r]); }
    const base = y0 + w * 0.09;
    for (let py = Math.floor(y0 - w * 0.42); py <= Math.ceil(base); py++) for (let px = Math.floor(cx - w * 0.72); px <= Math.ceil(cx + w * 0.72); px++) {
      if (px < 0 || px > 319 || py < 0 || py > 179) continue; const i = py * 320 + px; if (!M[i]) continue;
      if (py < 60 && px > 236 && c_um(px, py) > c_lim((268 - px) / 32) + c_lim((py - 47) / 13)) continue;   // se deshace tramada antes de la esquina de Atom
      let l = -9; for (const [bx, by, r] of bolas) { const dx = px + 0.5 - bx, dy = py + 0.5 - by; if (dx * dx + dy * dy > r * r) continue; const v = 0.66 - dx / r * 0.2 - dy / r * 0.42; if (v > l) l = v; }
      if (l < -5) continue;
      l -= c_lim((py - base + w * 0.1) / (w * 0.1)) * 0.3;
      B[i] = c_ramp(T, l, px, py);
    }
  });
}

// pájaros lejanos que cruzan aleteando: L = [[y, vel, fase], …]
function c_pajaros(R, t, L, col) {
  L.forEach(([y0, vel, f], k) => { const x = Math.round((((f * 400 + t * vel) % 400) + 400) % 400 - 40), y = Math.round(y0 + Math.sin(t * 0.7 + k) * 2), a = Math.floor(t * 6 + k * 3) % 2;
    if (c_atom(x + 3, y) || c_atom(x - 3, y)) return; R.pset(x, y, col); R.pset(x - 1, y - 1, col); R.pset(x + 1, y - 1, col); R.pset(x - 2, y - 2 + a * 2, col); R.pset(x + 2, y - 2 + a * 2, col); });
}

// un penacho de juncos de sierra (3–5 hojas en abanico) cuyas puntas se mecen con el viento; P de oscuro a claro
function c_junco(R, x, base, alto, t, k, P, fuerza = 0.5, inclina = 0) {
  const n = 3 + (k % 3), w = Math.sin(t * 1.3 + x * 0.05 + k * 0.7) * fuerza * alto * 0.12 + Math.sin(t * 3.1 + k) * 0.4 + inclina * alto * 0.25;
  for (let i = 0; i < n; i++) { const a = (i / (n - 1) - 0.5) * 1.1, lar = alto * (0.7 + h(i, k, 43) * 0.3), tx = x + a * lar * 0.45 + w, ty = base - lar, c = P[Math.min(P.length - 1, 1 + ((i + k) % (P.length - 1)))];
    const mx = x + a * lar * 0.15, my = base - lar * 0.5; R.linea(Math.round(x), base, Math.round(mx), Math.round(my), P[1]); R.linea(Math.round(mx), Math.round(my), Math.round(tx), Math.round(ty), c);
    if (alto > 14) R.pset(Math.round(tx), Math.round(ty), P[P.length - 1]); }
}

// una espadaña (enea): tallo que se mece, la mazorca parda y dos hojas largas
function c_espadana(R, x, base, alto, t, k) {
  const P = c_PE.juncoV, w = Math.sin(t * 1.1 + k * 1.3) * alto * 0.06, tx = Math.round(x + w), ty = Math.round(base - alto);
  R.linea(Math.round(x), base, tx, ty, P[2]);
  for (let j = 0; j < 7; j++) { R.pset(tx - 1, ty + 4 + j, hex('#4a2e1a')); R.pset(tx, ty + 4 + j, j < 2 ? hex('#7a5232') : hex('#5e3c22')); R.pset(tx + 1, ty + 4 + j, hex('#3a2414')); }
  R.linea(Math.round(x) - 1, base, Math.round(x - 5 + w * 1.4), Math.round(base - alto * 0.8), P[3]); R.linea(Math.round(x) + 1, base, Math.round(x + 4 + w * 1.2), Math.round(base - alto * 0.65), P[1]);
}

// una libélula que revolotea dentro de [x0, x1] a la altura y (± dy), con las alas que brillan
function c_libelula(R, t, x0, x1, y, dy) {
  const u = (Math.sin(t * 0.37) + 1) / 2, x = Math.round(x0 + (x1 - x0) * (u + Math.sin(t * 2.3) * 0.03)), yy = Math.round(y + Math.sin(t * 0.9) * dy * 0.5 + Math.sin(t * 5) * 1), d = Math.cos(t * 0.37) > 0 ? 1 : -1, a = Math.floor(t * 20) % 2;
  for (let i = 0; i < 6; i++) R.pset(x - d * i, yy, i < 2 ? hex('#3ab0c8') : hex('#2a6a8a'));
  const ala = a ? hex('#e8f4f8') : hex('#b0d0dc'); R.pset(x - d, yy - 1 - a, ala); R.pset(x - d * 2, yy - 1 - a, ala); R.pset(x - d, yy + 1 + a, ala); R.pset(x - d * 2, yy + 1 + a, ala);
}

// una palmera que se mece: tipo 'sabal' (palmito: tronco con las botas cruzadas, copa redonda y tupida con hojas secas
// colgando) o 'real' (tronco liso gris, el capitel verde y hojas largas que se arquean)
function c_palma(R, x, base, alto, t, tipo, k = 0) {
  const P = c_PE.hoja, real = tipo === 'real', sw = Math.sin(t * 0.9 + k * 1.7) * 1.2 + Math.sin(t * 2.1 + k) * 0.4, lean = (h(k, 1, 44) - 0.5) * 6;
  const top = [x + lean + sw * 0.6, base - alto];
  for (let j = 0; j <= alto; j++) { const f = j / alto, xx = Math.round(x + (lean + sw * 0.6) * f * f), yy = base - j, ww = real ? (f < 0.12 ? 2 : 1) : 1;
    for (let i = -ww; i <= ww; i++) { let c;
      if (real) c = f > 0.86 ? (i < 0 ? hex('#7aa04a') : hex('#4e7a34')) : (i < 0 ? hex('#cfc8b8') : i > 0 ? hex('#8a8476') : hex('#aca698'));
      else c = (j + (i & 1)) % 3 === 0 ? hex('#4a3a28') : i < 0 ? hex('#8a7456') : hex('#6a5640');
      R.pset(xx + i, yy, c); }
    if (real && j % 5 === 0 && f < 0.86) R.pset(xx - 1, yy, hex('#9a9486')); }
  const nf = real ? 9 : 13;
  // hojas secas colgando bajo la copa (el palmito)
  if (!real) for (let i = 0; i < 4; i++) { const a = (i / 3 - 0.5) * 2.2; R.linea(Math.round(top[0]), Math.round(top[1] + 1), Math.round(top[0] + Math.sin(a) * 5), Math.round(top[1] + 7), hex('#8a6a3e')); }
  for (let i = 0; i < nf; i++) { const a0 = (i / nf) * Math.PI * 2 + (h(i, k, 45) - 0.5) * 0.4, ca = Math.cos(a0), up = Math.sin(a0), lar = (real ? 15 : 9) * (0.8 + h(i, k, 46) * 0.4);
    const fl = (real ? 0.05 : 0.03) + Math.max(0, -up) * 0.01;
    let px = top[0], py = top[1];
    for (let j = 1; j <= lar; j++) { const ox = top[0] + ca * j * (real ? 1 : 0.9) + sw * j / lar * 1.5, oy = top[1] - (real ? 0.75 + up * 0.35 : up * 0.6) * j + (real ? 0.036 : fl * 1.4) * j * j + (real ? 0 : -1);
      R.linea(Math.round(px), Math.round(py), Math.round(ox), Math.round(oy), P[up > 0.2 ? 4 : 2]);
      if (j > 2 && j % 2 === 0) { const ll = (real ? 3 : 2) * (1 - j / lar * 0.5); R.pset(Math.round(ox), Math.round(oy + ll), P[1]); R.pset(Math.round(ox), Math.round(oy + 1), P[up > 0 ? 5 : 3]); if (real) R.pset(Math.round(ox), Math.round(oy + ll - 1), P[2]); }
      px = ox; py = oy; }
  }
  R.pset(Math.round(top[0]), Math.round(top[1]), P[5]);
}

// una garza blanca (unos 14 px) de pie en (x, y) mirando a dir: cuerpo blanco con sombra, cuello en S, pico amarillo y patas
// negras; cada pocos segundos baja el cuello y pica en el agua
function c_garza(R, x, y, t, dir, k) {
  const W = c_PE.blanco, S = hex('#c8ccd4'), S2 = hex('#9aa0aa'), pico = hex('#f0c030'), pata = hex('#1e1e1a'), u = (t + k * 2.3) % 5.2, pica = u > 4.2 ? Math.sin((u - 4.2) * Math.PI) : 0;
  const X = (i) => Math.round(x + i * dir), Y = (j) => Math.round(y - j);
  R.linea(X(0), Y(0), X(0), Y(5), pata); R.linea(X(2), Y(0), X(2), Y(5), pata); R.pset(X(-1), Y(0), pata); R.pset(X(3), Y(0), pata);
  for (let i = -3; i <= 3; i++) { R.pset(X(i), Y(6), i < -1 ? S2 : S); R.pset(X(i), Y(7), W); R.pset(X(i), Y(8), i > -3 ? W : S); }
  R.pset(X(-4), Y(7), S); R.pset(X(-5), Y(6), S); R.pset(X(-4), Y(6), S2); R.pset(X(2), Y(9), W); R.pset(X(3), Y(9), W);
  const hx = 3 + pica * 3, hy = 14 - pica * 8;
  R.linea(X(3), Y(9), X(2), Y(11 - pica * 3), W); R.linea(X(2), Y(11 - pica * 3), X(hx), Y(hy), W); R.pset(X(hx) - dir, Y(hy) + 1, S);
  R.pset(X(hx), Y(hy + 1), W); R.pset(X(hx + 1), Y(hy + 1), W); R.pset(X(hx + 1), Y(hy), pico); R.pset(X(hx + 2), Y(hy - pica), pico); R.pset(X(hx + 3), Y(hy - pica * 2), pico);
  if (pica > 0.7) { R.pset(X(hx + 3), Y(hy - 3), c_PE.agua[6]); R.pset(X(hx + 1), Y(hy - 3), c_PE.agua[6]); }
}

// una garza en vuelo (alas que suben y bajan)
function c_garzaVuela(R, t, y0, vel, f) {
  const x = Math.round((((f * 420 + t * vel) % 420) + 420) % 420 - 50), y = Math.round(y0 + Math.sin(t * 0.8) * 3), a = Math.sin(t * 5), d = vel > 0 ? 1 : -1, W = c_PE.blanco;
  if (c_atom(x, y)) return;
  for (let i = -3; i <= 2; i++) R.pset(x + i * d, y, W); R.pset(x + 3 * d, y - 1, W); R.pset(x + 4 * d, y - 1, hex('#e8b830')); R.pset(x - 4 * d, y + 1, hex('#1e1e1a')); R.pset(x - 5 * d, y + 1, hex('#1e1e1a'));
  const ya = Math.round(a * 3); for (let i = 1; i <= 4; i++) R.pset(x - d + Math.round(i * 0.3 * d), y - Math.round(ya * i / 4) - (ya === 0 ? 0 : 0), i === 4 ? hex('#c4c8cc') : W);
}

// la lancha de hélice (unos 34 px): casco plano de aluminio con su franja, dos pasajeros con gorra, el piloto en el
// asiento alto, la jaula con la hélice que gira (un disco borroso) y, detrás, la estela de espuma, el rocío que levanta y
// la hierba aplastada; (x, y) es el centro del casco en la línea del agua, dir hacia dónde va
function c_lancha(R, x, y, t, dir) {
  const d = dir < 0 ? -1 : 1, X = (i) => Math.round(x + i * d), al = hex('#d4d8e0'), alS = hex('#8e929c'), alL = hex('#f2f4f8'), K = hex('#24262c'), fr = hex('#2e6ab0');
  // la estela: la hierba aplastada, la espuma y el rocío que se levanta detrás de la hélice
  for (let i = 0; i < 46; i++) { const e = i / 46; R.pset(X(-16 - i), y + 1, hex('#7a8a58')); if (h(i, Math.floor(t * 12), 47) < 0.25 + e * 0.6) continue;
    const yy = y + Math.round(Math.sin(i * 0.9 + t * 9) * 0.6); R.pset(X(-15 - i), yy, i < 14 ? c_PE.blanco : hex('#e8e4cc')); }
  for (let k = 0; k < 14; k++) { const u = (t * 1.8 + k / 14) % 1, xx = X(-17 - u * 26 - (k % 3) * 2), yy = Math.round(y - 4 - Math.sin(u * Math.PI) * (5 + (k % 4)) + u * 3); if (h(k, Math.floor(t * 8), 48) < 0.3) continue; R.pset(xx, yy, u < 0.5 ? hex('#f4f8f8') : hex('#cfdcd8')); }
  // el casco con la proa levantada y su franja
  for (let i = -15; i <= 16; i++) { const proa = i > 11 ? i - 11 : 0; R.pset(X(i), y, alS); R.pset(X(i), y - 1, i % 7 === 0 ? alS : al); R.pset(X(i), y - 2, fr); R.pset(X(i), y - 3 - (proa > 2 ? 1 : 0), alL); if (proa > 3) R.pset(X(i), y - 2, al); }
  R.pset(X(17), y - 3, alS); R.pset(X(17), y - 2, alS); R.pset(X(16), y - 4, alL);
  // los pasajeros (cabezas con gorra, hombros)
  for (const [i, piel, gorra, cam] of [[8, '#d8a07a', '#c83a3a', '#e8e0c8'], [4, '#9a6a48', '#3a5a9a', '#e86a4a']]) { R.pset(X(i), y - 4, hex(cam)); R.pset(X(i - 1), y - 4, hex(cam)); R.pset(X(i), y - 5, hex(cam)); R.pset(X(i), y - 6, hex(piel)); R.pset(X(i), y - 7, hex(gorra)); R.pset(X(i + 1), y - 7, hex(gorra)); }
  // el asiento alto del piloto: patas, asiento y el piloto con su gorra
  R.linea(X(-4), y - 3, X(-4), y - 10, alS); R.linea(X(-1), y - 3, X(-1), y - 10, alS); R.linea(X(-5), y - 10, X(0), y - 10, al); R.linea(X(-4), y - 6, X(-1), y - 9, alS);
  for (let j = 11; j <= 14; j++) { R.pset(X(-3), y - j, hex('#4a6a3a')); R.pset(X(-2), y - j, j === 11 ? hex('#3a5a2e') : hex('#5a7a46')); }
  R.pset(X(-2), y - 15, hex('#d8a07a')); R.pset(X(-3), y - 15, hex('#d8a07a')); R.pset(X(-3), y - 16, hex('#e8d8a0')); R.pset(X(-2), y - 16, hex('#e8d8a0')); R.pset(X(-1), y - 16, hex('#c8b880'));
  R.linea(X(-1), y - 12, X(2), y - 11, hex('#4a6a3a'));
  // la jaula (de lado, una elipse estrecha) y la hélice: un disco borroso con dos palas que giran
  const cx = X(-11), cy = y - 9, r = 7;
  for (let j = -r; j <= r; j++) { const w = Math.round(Math.sqrt(1 - (j / r) ** 2) * 2); for (let i = -w; i <= w; i++) if (Math.abs(i) === w || (j + r) % 3 === 0) R.pset(cx + i, cy + j, Math.abs(i) === w ? alS : hex('#6a6e78')); }
  const g = t * 31; for (let s = 0; s < 2; s++) { const dy = Math.round(Math.sin(g + s * Math.PI) * (r - 1)); R.linea(cx, cy, cx, cy + dy, hex('#e8e4d4')); }
  R.pset(cx, cy, K); R.linea(cx + 2 * d, cy, X(-5), cy, alS); R.linea(cx, cy + r, X(-8), y - 3, alS); R.linea(cx - d, cy + r, X(-13), y - 3, alS);
}

// tres o cuatro figuras humanas lejanas (6–8 px): cabeza, camisa, pantalón; 'golpe' hace el swing del palo de golf
function c_figurita(R, x, y, t, cam, pant, k, accion) {
  const piel = [hex('#e0b090'), hex('#a8744e'), hex('#704a30')][k % 3];
  R.pset(x, y - 7, piel); R.pset(x, y - 8, k % 2 ? hex('#f0f0e8') : hex('#3a3a3a'));
  R.linea(x, y - 6, x, y - 4, cam); R.pset(x + 1, y - 6, cam); R.pset(x - 1, y - 5, cam);
  R.pset(x, y - 3, pant); R.pset(x - 1, y - 2, pant); R.pset(x + 1, y - 2, pant); R.pset(x - 1, y - 1, pant); R.pset(x + 1, y - 1, pant); R.pset(x - 1, y, hex('#2a2a2a')); R.pset(x + 1, y, hex('#f0f0f0'));
  if (accion === 'golpe') { const u = (t + k) % 6, a = u < 1.2 ? -0.4 - u * 1.8 : u < 1.5 ? -2.56 + (u - 1.2) * 15 : 1.9; const ex = Math.round(x + Math.sin(a) * 5), ey = Math.round(y - 5 + Math.cos(a) * 5); R.linea(x, y - 5, ex, ey, hex('#9a9aa2')); }
}

// el carrito de golf (techo blanco, carrocería crema, ruedas) con su golfista sentado; (x, y) el centro del suelo
function c_carrito(R, x, y, dir, k = 0) {
  const d = dir < 0 ? -1 : 1, X = (i) => Math.round(x + i * d), cr = [hex('#f0ecd8'), hex('#4a7a5a'), hex('#e8e0c8')][k % 3], crS = hex('#9a9480');
  R.linea(X(-6), y - 11, X(6), y - 11, c_PE.blanco); R.linea(X(-6), y - 10, X(6), y - 10, hex('#c8c8c0')); R.linea(X(-5), y - 9, X(-5), y - 5, hex('#5a5a5a')); R.linea(X(5), y - 9, X(5), y - 5, hex('#5a5a5a'));
  for (let i = -6; i <= 6; i++) { R.pset(X(i), y - 4, cr); R.pset(X(i), y - 3, cr); R.pset(X(i), y - 2, crS); }
  R.pset(X(6), y - 5, cr); R.pset(X(-1), y - 7, hex('#d8a07a')); R.pset(X(-1), y - 8, hex('#f0f0e8')); R.pset(X(-1), y - 6, hex('#3a6ac8')); R.pset(X(-1), y - 5, hex('#3a6ac8'));
  R.pset(X(-5), y - 6, hex('#2a2a2a')); R.pset(X(-5), y - 7, hex('#9a9aa2'));   // la bolsa con los palos
  for (const i of [-4, 4]) { R.pset(X(i), y - 1, c_PE.negro); R.pset(X(i - 1), y - 1, c_PE.negro); R.pset(X(i), y, c_PE.negro); R.pset(X(i - 1), y, hex('#3a3a3a')); }
}

// una anhinga posada que abre y cierra las alas para secarlas (x, y: las patas sobre el poste)
function c_anhinga(R, x, y, t) {
  const N = hex('#1a1c1e'), Bc = hex('#d8d4c4'), u = (t % 9) / 9, ab = u < 0.6 ? c_lim(u / 0.1) : c_lim((0.8 - u) / 0.2);
  R.pset(x, y, hex('#3a3a2a')); R.pset(x + 1, y, hex('#3a3a2a'));
  for (let j = 1; j <= 6; j++) { R.pset(x, y - j, N); R.pset(x + 1, y - j, j > 2 ? N : hex('#2a2c2e')); }
  R.linea(x + 1, y - 7, x + 2, y - 10, N); R.pset(x + 2, y - 11, N); R.pset(x + 3, y - 11, hex('#c8a040')); R.pset(x + 4, y - 11, hex('#c8a040'));
  R.linea(x, y + 1, x - 1, y + 4, N);
  const w = Math.round(1 + ab * 6);
  for (const s of [-1, 1]) for (let i = 1; i <= w; i++) { const xx = s < 0 ? x - i : x + 1 + i, yy = y - 6 + Math.round(i * 0.3 * (1 - ab)); R.pset(xx, yy, N); R.pset(xx, yy + 1, i % 2 ? Bc : N); if (ab > 0.5) R.pset(xx, yy + 2, N); }
}

function c_rioFijo(R) {
  const B = R.buf, P = c_PE, HOR = 90;
  c_cieloFijo(R, HOR);
  c_torre(R, 60, 82, 18, 20, HOR, 7);
  c_torre(R, 200, 74, 46, 40, HOR, 3);
  // la máscara del cielo se toma ya con las torres: las nubes cercanas pasan por delante de ellas
  const copiaT = B.slice(0, HOR * 320);
  // el río de hierba: perspectiva hasta la pasarela (y 143); un canal que serpentea y charcas que reflejan el cielo
  const esAgua = (x, y) => { const z = (y - HOR) / 53, cs = 176 - z * z * 120 + Math.sin(z * 6 + 1) * 14, ws = 1.2 + z * 22; return Math.abs(x - cs) < ws * (0.75 + 0.5 * c_vn(x / 8, y / 2, 11)) || c_vn(x / (5 + z * 26), y / (1 + z * 4), 12) > 0.74; };
  const AG = [];
  for (let y = HOR; y < 143; y++) { const z = (y - HOR) / 53;
    for (let x = 0; x < 320; x++) { const i = y * 320 + x;
      if (esAgua(x, y)) { AG.push(i); let l = 0.62 + (1 - z) * 0.22 + (c_vn(x / 18, y / 2, 13) - 0.5) * 0.2; if (y > HOR && !esAgua(x, y - 1)) l -= 0.3; else if (y > HOR + 1 && !esAgua(x, y - 2)) l -= 0.14; B[i] = c_mez(c_ramp(P.agua, l, x, y), P.bruma, (1 - z) * (1 - z) * 0.35); continue; }
      let l = 0.5 + (c_vn(x / (3 + z * 7), y / (1 + z * 2), 14) - 0.5) * 0.55 + (h(x, Math.floor(y / (1 + z * 3)), 15) - 0.5) * 0.3 * z - (c_vn(x / 50, y / 6, 16) > 0.6 ? 0.16 : 0);
      if (h(x, y >> 1, 17) < 0.14 * z) l -= 0.3;   // los huecos oscuros entre las hojas
      if (esAgua(x, y + 1)) l += 0.12;               // las puntas al sol junto al agua
      l += (1 - z) * 0.25;
      B[i] = c_mez(c_ramp(P.hierba, l, x, y), P.bruma, (1 - z) * (1 - z) * 0.45);
    } }
  // las hamacas lejanas del horizonte (siluetas en la bruma, con algún ciprés que asoma)
  const ham = (x0, x1, base, alto, sem, Pc, cerca) => { for (let x = x0; x <= x1; x++) { const f = (x - x0) / (x1 - x0), dome = Math.sqrt(Math.max(0, 1 - (2 * f - 1) ** 2)), sp = h(x >> 1, sem, 18) > 0.86 ? 2 + h(x, sem, 19) * 3 : 0, top = Math.round(base - alto * (0.55 * dome + 0.45 * c_vn(x / 5, sem, 20)) * (0.3 + 0.7 * dome) - sp * dome);
      for (let y = top; y <= base; y++) { if (y < 0 || x < 0 || x > 319) continue; const v = (y - top) / Math.max(1, base - top), l = cerca ? 0.62 - v * 0.42 + (c_vn(x / 3, y / 2.5, sem) - 0.5) * 0.55 - (x - x0) / (x1 - x0) * 0.12 : 0.55 - v * 0.35 + (h(x >> 1, y >> 1, sem) - 0.5) * 0.25; B[y * 320 + x] = c_ramp(Pc, l, x, y); } } };
  [[0, 34, 94, 7], [40, 70, 92, 4], [86, 118, 92, 5], [128, 150, 91, 3], [160, 190, 92, 6], [200, 212, 91, 2]].forEach(([a, b, base, al], k) => ham(a, b, base, al, k + 30, P.lejos, false));
  ham(0, 52, 97, 20, 40, P.hoja, true);
  ham(214, 330, 101, 44, 41, P.hoja, true);
  // el musgo español que cuelga de los cipreses de la isla grande
  for (let k = 0; k < 16; k++) { const x = 220 + Math.round(h(k, 1, 48) * 94), y0 = 66 + Math.round(h(k, 2, 48) * 22); for (let j = 0; j < 3 + (k % 4); j++) R.pset(x + (j % 2), y0 + j, P.musgo[j % 3]); }
  // los troncos de la isla, entre la hierba
  for (const x of [226, 241, 263, 288, 307]) for (let y = 92; y < 101; y++) R.pset(x, y, y % 3 ? P.tronco[1] : P.tronco[2]);
  // la pasarela: tablas gastadas que se abren en perspectiva, clavos, nudos; la viga de delante con sus pernos
  for (let y = 143; y <= 156; y++) { const v = (y - 143) / 13;
    for (let x = 0; x < 320; x++) { const xs = x + (x - 160) * v * 0.12, tb = Math.floor(xs / 7), fx = xs - tb * 7;
      let l = 0.62 + (h(tb, 0, 31) - 0.5) * 0.28 + (h(Math.floor(xs * 1.4), tb, 32) - 0.5) * 0.12 - v * 0.18;
      if (fx < 0.9) l = 0.12; else if (fx < 1.8) l -= 0.1;
      if (y === 143) l += 0.18; if ((y === 145 || y === 154) && Math.abs(fx - 3.5) < 0.6) l = 0.05;
      if (h(tb, 7, 33) > 0.9 && Math.abs(fx - 4) < 1 && Math.abs(y - 149 - h(tb, 8, 33) * 4) < 1) l -= 0.25;   // un nudo
      B[y * 320 + x] = c_ramp(P.tabla, l, x, y); } }
  for (let y = 157; y <= 160; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = c_ramp(P.tabla, y === 157 ? 0.5 : 0.22 + (h(x >> 2, y, 34) - 0.5) * 0.12, x, y);
  for (let x = 6; x < 320; x += 16) { R.pset(x, 159, P.tabla[5]); R.pset(x, 158, P.tabla[1]); }
  // bajo la pasarela: el agua oscura con el reflejo de las tablas, los pilotes y los nenúfares
  for (let y = 161; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; AG.push(i); const l = 0.2 + (y - 161) / 19 * 0.3 + (c_vn(x / 14, y / 2, 35) - 0.5) * 0.25; B[i] = c_ramp(P.agua, l, x, y); }
  for (let x = 14; x < 320; x += 40) for (let y = 161; y < 180; y++) { R.pset(x, y, P.tabla[2]); R.pset(x + 1, y, P.tabla[1]); R.pset(x + 2, y, P.tabla[0]); if (y > 172 && (y & 1)) { R.pset(x, y, P.agua[1]); R.pset(x + 2, y, P.agua[1]); } }
  [[34, 170, 5], [70, 176, 4], [104, 166, 3], [176, 174, 5], [232, 168, 4], [276, 177, 5], [150, 179, 4]].forEach(([cx, cy, r], k) => { for (let j = -2; j <= 2; j++) for (let i = -r; i <= r; i++) { if ((i * i) / (r * r) + (j * j) / 4 > 1 || (i > 0 && Math.abs(j) < 1 && i < r - 1 + (k % 2))) continue; R.pset(cx + i, cy + j, j < 0 ? P.juncoV[4] : j > 0 ? P.juncoV[2] : P.juncoV[3]); } });
  for (const [x, y] of [[106, 164], [234, 166]]) { R.pset(x, y, P.blanco); R.pset(x - 1, y + 1, P.blanco); R.pset(x + 1, y + 1, P.blanco); R.pset(x, y + 1, hex('#f0d860')); }
  // la barandilla de atrás (por detrás de los actores): postes, pasamanos y la tabla de en medio
  for (let x = 0; x < 320; x++) { R.pset(x, 129, P.tabla[5]); R.pset(x, 130, P.tabla[3]); R.pset(x, 131, P.tabla[1]); R.pset(x, 136, P.tabla[4]); R.pset(x, 137, P.tabla[2]); }
  for (let x = 30; x < 330; x += 48) for (let y = 128; y <= 143; y++) { R.pset(x - 1, y, P.tabla[5]); R.pset(x, y, P.tabla[3]); R.pset(x + 1, y, P.tabla[1]); }
  // el letrero del parque (solo pictogramas: una garza de pie y un caimán), de madera con su marco, sobre dos postes
  for (let y = 118; y <= 143; y++) { R.pset(6, y, P.tabla[1]); R.pset(7, y, P.tabla[2]); R.pset(23, y, P.tabla[1]); R.pset(24, y, P.tabla[2]); }
  for (let y = 100; y <= 118; y++) for (let x = 2; x <= 28; x++) R.pset(x, y, y === 100 || x === 2 ? hex('#8a6a42') : y === 118 || x === 28 ? hex('#3e2a16') : y === 101 || x === 3 || y === 117 || x === 27 ? hex('#4e3620') : (x + y * 3) % 7 === 0 ? hex('#5a4026') : hex('#664a2c'));
  const cr = hex('#efe6c8'), dib = (ox, oy, filas) => filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') R.pset(ox + i, oy + j, cr); });
  dib(5, 103, ['..##....', '###.....', '...#....', '...#....', '..##....', '..####..', '..#####.', '...####.', '...#.#..', '...#.#..', '...#.#..', '..##.##.']);
  dib(14, 108, ['......#.#...', '..#########.', '############', '...#.....#..', '..##....##..']);
  const M = c_mascaraCielo(R, copiaT);
  // las matas del campo que se mecen (sitios fijos sobre la hierba, no sobre el agua)
  const MATAS = []; for (let k = 0; k < 420 && MATAS.length < 150; k++) { const y = Math.round(HOR + 4 + h(k, 1, 36) ** 0.8 * 48), x = Math.round(h(k, 2, 36) * 320); if (!esAgua(x, y) && !(x < 24 && y > 100)) MATAS.push([x, y, (y - HOR) / 53]); }
  MATAS.sort((a, b) => a[1] - b[1]);
  // diez puntos de agua (charcas y canal) donde la escena puede poner caimanes que asoman: [x, y] en la línea del agua
  const AGUAS = []; for (let k = 0; k < 4000 && AGUAS.length < 10; k++) { const y = 102 + Math.round(h(k, 1, 39) * 22), x = 30 + Math.round(h(k, 2, 39) * 250); if (esAgua(x, y) && esAgua(x - 6, y) && esAgua(x + 6, y) && !AGUAS.some(([a, b]) => Math.abs(a - x) < 24 && Math.abs(b - y) < 10)) AGUAS.push([x, y]); }
  AGUAS.sort((a, b) => a[1] - b[1]);
  return { M, AG: Int32Array.from(AG), MATAS, esAgua, AGUAS };
}

function c_rio(R, t, o, g) {
  const P = c_PE, C0 = c_capa(R, 'ev|rio', () => c_rioFijo(R)), B = R.buf, fl = c_lim(+(o.flechas || 0));
  g.aguas = C0.AGUAS.map((p) => p.slice());
  c_nubes(R, t, [[20, 40, 34, 1.1], [180, 56, 26, 1.8], [90, 70, 16, 2.8], [260, 64, 20, 2.4], [300, 50, 30, 0.8]], C0.M);
  // un relámpago lejano en la cortina de lluvia cada pocos segundos
  const ur = (t + 2.1) % 6.7; if (ur < 0.25 && Math.floor(ur * 24) % 3 !== 1) { const kr = Math.floor((t + 2.1) / 6.7); let x = 204 + Math.round(h(kr, 1, 37) * 14), y = 75; while (y < 89) { const nx = x + Math.round((h(kr, y, 38) - 0.5) * 4), ny = Math.min(89, y + 3); R.linea(x, y, nx, ny, P.blanco); R.pset(x + 1, y, P.torre[5]); x = nx; y = ny; } }
  c_pajaros(R, t, [[50, 9, 0.1], [55, 9, 0.13], [47, 9, 0.16], [76, -6, 0.7]], hex('#3a4050'));
  // el agua que corre despacio: destellos del cielo que bajan hacia la derecha, y vetas más oscuras
  const AG = C0.AG, cl = hex('#eef6f6');
  for (let n = 0; n < AG.length; n++) { const i = AG[n], x = i % 320, y = (i / 320) | 0, z = y < 143 ? (y - 90) / 53 : 1, v = h(Math.floor((x - t * (2 + z * 4) - y * 0.8) / (2 + z * 3)), y, 51);
    if (v > 0.94) B[i] = c_mez(B[i], cl, y < 143 ? 0.55 : 0.3); else if (v < 0.05) B[i] = c_mez(B[i], P.agua[0], 0.35); }
  // las matas que se mecen (más dobladas con las flechas)
  for (const [x, y, z] of C0.MATAS) c_junco(R, x, y, 2 + z * 9, t, x + y, P.junco, 0.6 + fl, fl * 0.5);
  // las flechas de hierba dorada que se inclinan y avanzan hacia la derecha: astil de dos píxeles claro con su sombra
  // oscura debajo y punta en V, que aparecen tramadas con fl
  if (fl > 0) { const cl = hex('#fff2b8'), md = P.hierba[7], os = P.hierba[1];
    for (let k = 0; k < 7; k++) { const y = 102 + (k % 3) * 13 + (k > 4 ? 6 : 0), z = (y - 90) / 53, L = 14 + z * 18, x = ((h(k, 1, 52) * 340 + t * (6 + z * 6)) % 380) - 40, ph = 3 + Math.round(z * 3);
      for (let j = 0; j < L; j++) { const xx = Math.round(x + j), ondula = Math.round(Math.sin(j * 0.5 - t * 3) * 0.5); if (c_um(xx, y) > fl * 1.15) continue;
        R.pset(xx, y - 1 + ondula, os); R.pset(xx, y + ondula, cl); R.pset(xx, y + 1 + ondula, md); R.pset(xx, y + 2 + ondula, os); }
      const xp = Math.round(x + L); for (let w = 0; w <= ph; w++) { if (c_um(xp, y + w) > fl * 1.15) continue; for (const sg of [-1, 1]) { R.pset(xp - w, y + sg * w, cl); R.pset(xp - w, y + sg * w + 1, md); R.pset(xp - w - 1, y + sg * w + (sg < 0 ? -1 : 2), os); } } } }
  // las garzas: dos que pescan en la hierba y una que pasa volando
  c_garza(R, 84, 120, t, -1, 0); c_garza(R, 150, 108, t, 1, 1);
  c_garzaVuela(R, t, 64, -7, 0.2);
  // la lancha de hélice que cruza de derecha a izquierda
  if (o.lancha !== false) { const x = typeof o.lancha === 'number' ? o.lancha : 360 - ((t * 13 + 120) % 440); c_lancha(R, x, 120, t, -1); g.lancha = [Math.round(x), 120]; }
  // los palmitos de la isla grande, que se mecen
  c_palma(R, 234, 98, 34, t, 'sabal', 1); c_palma(R, 252, 100, 42, t, 'sabal', 2); c_palma(R, 300, 99, 40, t, 'sabal', 3); c_palma(R, 20, 94, 24, t, 'sabal', 4);
  // la anhinga en el poste de la barandilla y las ondas en los pilotes
  c_anhinga(R, 266, 128, t);
  for (let x = 14; x < 320; x += 40) { const a = Math.floor(t * 3 + x) % 4; R.pset(x - 1 - a, 162 + (a >> 1), P.agua[6]); R.pset(x + 3 + a, 162 + (a >> 1), P.agua[6]); }
}

function c_orillaFijo(R) {
  const B = R.buf, P = c_PE, HOR = 62;
  c_cieloFijo(R, HOR, c_PE.cielo, 92);
  const copia = B.slice(0, HOR * 320);
  // 1 · el bosque lejano en la bruma (verde azulado), con el cielo entre las copas
  for (let x = 0; x < 320; x++) { const tp = Math.round(50 + c_vn(x / 7, 0, 50) * 12 + (x > 262 ? 6 : 0)); for (let y = tp; y < 84; y++) B[y * 320 + x] = c_ramp(P.lejos, 0.8 - (y - tp) / (84 - tp) * 0.65 + (c_vn(x / 2.5, y / 2, 49) - 0.5) * 0.4, x, y); }
  // 2 · los cipreses calvos: el tronco que se ensancha en la base, la copa en pisos planos y plumosos con luz arriba a la
  // izquierda, y el musgo español que cuelga de cada piso
  for (const [cx, tp, k] of [[28, 50, 11], [86, 52, 12], [144, 49, 13], [200, 53, 14], [258, 55, 15], [12, 40, 0], [44, 46, 1], [70, 37, 2], [102, 43, 3], [124, 50, 4], [158, 39, 5], [182, 45, 6], [214, 36, 7], [238, 44, 8], [280, 56, 9], [306, 53, 10]]) {
    for (let y = tp + 4; y < 92; y++) { const w = 0.6 + (y - tp) / (92 - tp) * 0.8 + (y > 84 ? (y - 84) * 0.5 : 0), xo = cx + Math.round(Math.sin(y * 0.15 + k) * 0.6); for (let i = -Math.round(w); i <= Math.round(w); i++) R.pset(xo + i, y, i < 0 ? P.tronco[3] : i > 0 ? P.tronco[1] : P.tronco[2]); }
    const np = 5 + (k % 2);
    for (let q = 0; q < np; q++) { const py = tp + 3 + q * 6 + h(q, k, 64) * 2, pw = 7 + q * 2.4 + h(q, k, 65) * 5, ph = 2.8 + h(q, k, 66) * 1.8, px = cx + (h(q, k, 67) - 0.5) * 8;
      for (let y = Math.floor(py - ph); y <= Math.ceil(py + ph); y++) for (let x = Math.floor(px - pw); x <= Math.ceil(px + pw); x++) { const dx = (x + 0.5 - px) / pw, dy = (y + 0.5 - py) / ph, dd = dx * dx + dy * dy; if (dd > 1 || x < 0 || x > 319) continue; if (dd > 0.55 && h(x, y, 68 + k) < 0.45) continue;
        R.pset(x, y, c_ramp(P.hoja, 0.62 - dy * 0.32 - dx * 0.12 + (h(x, y, 69 + k) - 0.5) * 0.4, x, y)); }
      for (let m = 0; m < 3; m++) { const mx = Math.round(px + (h(m, q + k * 7, 70) - 0.5) * pw * 1.4), my = Math.round(py + ph * 0.6), lar = 3 + Math.round(h(m, q + k, 71) * 6); for (let j = 0; j < lar; j++) R.pset(mx + (j % 3 === 2 ? 1 : 0), my + j, P.musgo[(j + m) % 3]); } } }
  // 3 · los mangles bajos junto al agua (matas redondas y oscuras) y sus raíces en arco hacia el agua
  for (let x = 0; x < 320; x++) { const tp = Math.round(79 + c_vn(x / 6, 2, 72) * 7); for (let y = tp; y < 92; y++) B[y * 320 + x] = c_ramp(P.hoja, 0.5 - (y - tp) / 13 * 0.45 + (c_vn(x / 2.2, y / 1.8, 73) - 0.5) * 0.55, x, y); }
  for (let k = 0; k < 18; k++) { const x0 = 8 + k * 17 + Math.round(h(k, 1, 75) * 6), x1 = x0 + 5 + (k % 3) * 2; for (let i = 0; i <= 8; i++) { const f = i / 8, xx = Math.round(x0 + (x1 - x0) * f), yy = Math.round(86 - Math.sin(f * Math.PI) * 4 + f * 6); R.pset(xx, yy, P.tronco[3]); R.pset(xx, yy + 1, P.tronco[0]); } }
  // el agua: el fondo se pinta en cada fotograma (el reflejo que tiembla); aquí la base
  for (let y = 92; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = P.te[2];
  // el barro de la orilla: mojado y brillante junto al agua, más seco y claro hacia delante, con su textura
  const ori = new Int16Array(320); for (let x = 0; x < 320; x++) ori[x] = Math.round(138 + Math.sin(x * 0.05) * 3 + Math.sin(x * 0.13 + 1) * 1.5);
  for (let x = 0; x < 320; x++) for (let y = ori[x]; y < 180; y++) { const v = (y - ori[x]) / (180 - ori[x]); let l = 0.22 + v * 0.5 + (c_vn(x / 6, y / 3, 54) - 0.5) * 0.35 + (h(x, y, 55) - 0.5) * 0.14;
    if (y - ori[x] < 2) l = 0.08 + (y === ori[x] && h(x >> 1, 3, 55) > 0.55 ? 0.6 : 0); B[y * 320 + x] = c_ramp(P.barro, l, x, y); }
  // charquitos que reflejan el cielo, huellas de ave, ramitas y conchas
  [[70, 166, 8], [158, 172, 6], [236, 162, 7], [292, 174, 9]].forEach(([cx, cy, r]) => { for (let j = -2; j <= 2; j++) for (let i = -r; i <= r; i++) if ((i * i) / (r * r) + (j * j) / 4 <= 1) R.pset(cx + i, cy + j, j < 0 ? P.barro[0] : c_ramp(P.agua, 0.6 + j * 0.1, cx + i, cy + j)); R.pset(cx - r + 2, cy, P.agua[7]); });
  for (let k = 0; k < 6; k++) { const x = 52 + k * 13, y = 150 + (k % 2) * 4; R.pset(x, y, P.barro[0]); R.pset(x - 1, y - 1, P.barro[0]); R.pset(x + 1, y - 1, P.barro[0]); R.pset(x, y - 2, P.barro[0]); }
  [[120, 176, 14], [212, 150, 9], [262, 170, 11]].forEach(([x, y, l]) => { R.linea(x, y, x + l, y - 2, P.tronco[2]); R.linea(x, y + 1, x + l, y - 1, P.tronco[0]); R.pset(x + 5, y - 2, P.tronco[3]); });
  for (const [x, y] of [[96, 162], [180, 166], [246, 176]]) { R.pset(x, y, hex('#e8e0d0')); R.pset(x + 1, y, hex('#c8c0b0')); }
  // las raíces de mangle de esta orilla (las de detrás; las de delante las pinta evergladesDelante)
  for (let k = 0; k < 6; k++) { const x0 = 20 + k * 6, x1 = x0 + 14 + k * 3; for (let i = 0; i <= 16; i++) { const f = i / 16, xx = Math.round(x0 + (x1 - x0) * f), yy = Math.round(120 + f * 30 - Math.sin(f * Math.PI) * 10); R.pset(xx, yy, P.tronco[3]); R.pset(xx, yy + 1, P.tronco[1]); } }
  const M = c_mascaraCielo(R, copia);
  return { M, ori };
}

function c_orilla(R, t, o, g) {
  const P = c_PE, C0 = c_capa(R, 'ev|orilla', () => c_orillaFijo(R)), B = R.buf;
  c_nubes(R, t, [[40, 36, 30, 1.2], [200, 42, 22, 2], [120, 50, 14, 3], [300, 46, 18, 2.6]], C0.M);
  c_pajaros(R, t, [[34, 8, 0.3], [38, 8, 0.33]], hex('#3a4050'));
  // el agua color té: el reflejo del bosque que tiembla (y 92 hacia abajo), con el cielo claro entre las copas y vetas
  for (let y = 92; y < 140; y++) { const d = y - 92, ys = 91 - Math.round(d * 1.4), ond = Math.round(Math.sin(y * 0.9 + t * 2.2) * (0.6 + d * 0.03));
    for (let x = 0; x < 320; x++) { if (y >= C0.ori[x]) continue; const xs = Math.min(319, Math.max(0, x + ond)), src = ys >= 0 ? B[ys * 320 + xs] : P.cielo[6];
      let c = c_mez(src, P.te[1], 0.5 + d * 0.006); const v = h(Math.floor((x + t * 3) / 4), y, 56); if (v > 0.95) c = c_mez(c, P.agua[6], 0.45); else if (v < 0.015) c = c_mez(c, P.te[0], 0.5);
      B[y * 320 + x] = c; } }
  // los nenúfares (se mecen un poco) y una flor
  [[150, 108, 6, 0], [176, 116, 5, 1], [226, 104, 4, 2], [258, 122, 6, 3], [86, 128, 5, 4], [130, 124, 4, 5]].forEach(([cx, cy, r, k]) => { const dx = Math.round(Math.sin(t * 0.6 + k) * 0.8); for (let j = -2; j <= 1; j++) for (let i = -r; i <= r; i++) { if ((i * i) / (r * r) + (j * j) / 3 > 1 || (i > 1 && j === 0)) continue; R.pset(cx + i + dx, cy + j, j < 0 ? P.juncoV[4] : P.juncoV[2]); } R.pset(cx - r + 1 + dx, cy, P.juncoV[5]); });
  R.pset(176, 113, P.blanco); R.pset(175, 114, P.blanco); R.pset(177, 114, P.blanco); R.pset(176, 114, hex('#f0d050'));
  // el tronco caído con la tortuga, que saca y mete la cabeza
  for (let x = 24; x <= 66; x++) { R.pset(x, 116, P.tronco[3]); R.pset(x, 117, P.tronco[2]); R.pset(x, 118, P.tronco[1]); R.pset(x, 119, c_mez(P.tronco[0], P.te[1], 0.5)); if (x % 7 === 0) R.pset(x, 117, P.tronco[4]); }
  R.pset(66, 117, P.tronco[4]); R.pset(66, 116, P.tronco[2]);
  const cab = (t % 5) < 3.4 ? 2 : 0;
  for (let i = -4; i <= 4; i++) { R.pset(46 + i, 114, P.negro); R.pset(46 + i, 115, i % 3 === 0 ? hex('#c8b040') : hex('#3a3a24')); } for (let i = -3; i <= 3; i++) R.pset(46 + i, 113, hex('#4a4a2e'));
  R.pset(50 + cab, 114, hex('#5a5a3a')); if (cab) { R.pset(51, 114, hex('#5a5a3a')); R.pset(53, 113, hex('#5a5a3a')); R.pset(52, 114, hex('#c8b040')); }
  // las burbujas que suben y revientan (algo respira ahí debajo)
  for (let k = 0; k < 5; k++) { const u = ((t * 0.5 + k * 0.37) % 1), x = 140 + Math.round(h(k, Math.floor(t * 0.5 + k * 0.37), 57) * 90), y = 132 - Math.round(u * 4); if (u < 0.85) { R.pset(x, y, P.agua[6]); R.pset(x + 1, y - 1, P.agua[7]); } else { R.pset(x - 2, y, P.agua[5]); R.pset(x + 2, y, P.agua[5]); R.pset(x, y - 1, P.agua[5]); } }
  // la orilla: la raya de espuma y el agua que lame el barro
  for (let x = 0; x < 320; x++) { const y = C0.ori[x] - 1 + (Math.sin(x * 0.2 + t * 1.6) > 0.6 ? 1 : 0); if (h(x, Math.floor(t * 2), 58) > 0.4) R.pset(x, y, c_mez(P.te[3], P.agua[6], 0.4)); }
  // la garza azulada de pie en el agua, que a ratos pica
  c_garzaAzul(R, 288, 137, t);
}

// la garza azulada grande (unos 24 px) de pie, mirando a la izquierda; cada pocos segundos lanza el pico al agua
function c_garzaAzul(R, x, y, t) {
  const G = hex('#7a8ca4'), GL = hex('#a8b8cc'), GS = hex('#4e5c70'), K = hex('#1e2228'), Am = hex('#d8b040'), u = t % 6.5, pica = u > 5.4 ? Math.sin((u - 5.4) / 1.1 * Math.PI) : 0;
  R.linea(x, y, x, y - 8, hex('#6a6050')); R.linea(x + 2, y, x + 2, y - 8, hex('#5a5040'));
  R.pset(x - 2, y, c_PE.agua[6]); R.pset(x + 4, y, c_PE.agua[6]);
  for (let j = 9; j <= 15; j++) for (let i = -2; i <= 5; i++) { if ((i - 1.5) ** 2 / 14 + (j - 12) ** 2 / 10 > 1) continue; R.pset(x + i, y - j, j < 11 ? GS : i < 1 ? GL : G); }
  for (let i = 3; i <= 7; i++) R.pset(x + i, y - 10 + (i > 5 ? 1 : 0), GS);
  const hx = x - 2 - pica * 6, hy = y - 22 + pica * 10;
  R.linea(x, y - 15, x - 1, y - 18 + pica * 3, GL); R.linea(x - 1, y - 18 + pica * 3, Math.round(hx), Math.round(hy), GL); R.pset(Math.round(hx) + 1, Math.round(hy) + 1, c_PE.blanco);
  R.pset(Math.round(hx), Math.round(hy) - 1, GL); R.pset(Math.round(hx) + 1, Math.round(hy) - 1, K); R.pset(Math.round(hx) + 2, Math.round(hy) - 1, K);
  R.pset(Math.round(hx) - 1, Math.round(hy), Am); R.pset(Math.round(hx) - 2, Math.round(hy) + Math.round(pica), Am); R.pset(Math.round(hx) - 3, Math.round(hy) + Math.round(pica * 2), Am);
  if (pica > 0.8) { R.pset(Math.round(hx) - 4, Math.round(hy) + 4, c_PE.agua[7]); R.pset(Math.round(hx) - 2, Math.round(hy) + 4, c_PE.agua[7]); }
}

// el mangle del primer término (izquierda), por delante de los actores: raíces zancudas en arco que bajan desde el tronco
// (fuera de cuadro) hasta el barro, y la copa que asoma arriba con hojas que se mecen
function c_raicesMangle(R, t) {
  const P = c_PE.tronco, Hh = c_PE.hoja;
  for (let k = 0; k < 7; k++) { const x0 = -6 + k * 2, y0 = 82 + k * 3, x1 = 4 + k * 5 + (k > 4 ? 4 : 0), y1 = 168 + (k % 3) * 5;
    for (let i = 0; i <= 34; i++) { const f = i / 34, xx = Math.round(x0 + (x1 - x0) * f + Math.sin(f * Math.PI) * (7 + k)), yy = Math.round(y0 + (y1 - y0) * f); R.pset(xx, yy, P[3]); R.pset(xx + 1, yy, P[1]); if (i % 6 === 3) R.pset(xx, yy, P[4]); } }
  for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 74) * 34) - 4, y = 70 + Math.round(h(k, 2, 74) * 20), sw = Math.round(Math.sin(t * 1.2 + k) * 0.8);
    R.pset(x + sw, y, Hh[3 + (k % 3)]); R.pset(x + sw + 1, y, Hh[2]); R.pset(x + sw, y + 1, Hh[1]); R.pset(x + sw - 1, y, Hh[4]); }
}

// una casa de Florida de una planta: estuco pastel, tejado de tejas a dos aguas, ventanas con contraventanas, puerta del
// garaje y, si jaula, la jaula de mosquitera de la piscina al lado
function c_casa(R, x, base, w, alto, col, jaula, k) {
  const E = c_hx(col), T = c_hx(['#8a3e2a', '#a85234', '#c46a40', '#d8865a']);
  for (let y = base - alto; y <= base; y++) for (let i = 0; i <= w; i++) { const l = 0.55 + (i < w * 0.15 ? -0.2 : 0) + (h(x + i, y, 81) - 0.5) * 0.18 - (y > base - 2 ? 0.25 : 0); R.pset(x + i, y, c_ramp(E, l, x + i, y)); }
  const ap = Math.round(alto * 0.75), yt = base - alto;
  for (let j = 0; j <= ap; j++) { const x0 = x - 2 + j * (w / 2 + 2) / ap, x1 = x + w + 2 - j * (w / 2 + 2) / ap; for (let xx = Math.round(x0); xx <= Math.round(x1); xx++) R.pset(xx, yt - j, (xx + (j % 2)) % 2 ? T[2] : j === 0 ? T[0] : T[1]); }
  for (let i = -2; i <= w + 2; i++) R.pset(x + i, yt, T[3]);
  // ventanas con contraventanas y la puerta del garaje con sus franjas
  for (let wx = x + 3; wx < x + w * 0.5; wx += 7) { for (let j = 0; j < 4; j++) { R.pset(wx, yt + 3 + j, hex('#5a7a9a')); R.pset(wx + 1, yt + 3 + j, j < 1 ? hex('#c8e0f0') : hex('#7a9ab8')); R.pset(wx + 2, yt + 3 + j, hex('#5a7a9a')); R.pset(wx - 1, yt + 3 + j, hex('#3a5a7a')); R.pset(wx + 3, yt + 3 + j, hex('#3a5a7a')); } }
  const gx = x + Math.round(w * 0.58), gw = Math.round(w * 0.32); for (let j = 0; j < alto - 3; j++) for (let i = 0; i < gw; i++) R.pset(gx + i, base - j, j % 2 ? hex('#e8e4dc') : hex('#c8c4bc'));
  if (jaula) { const jx = x + w + 2, jw = 18; for (let y = base - alto + 2; y <= base; y++) for (let i = 0; i <= jw; i++) { const borde = i === 0 || i === jw || i % 6 === 0 || (y - base + alto) % 4 === 0; if (borde) R.pset(jx + i, y, hex('#e8ece8')); else R.pset(jx + i, y, c_mez(R.pget(jx + i, y), hex('#9ab0b4'), 0.35)); } for (let i = 0; i <= jw; i++) R.pset(jx + i, base - alto + 1 - Math.round(Math.sin(i / jw * Math.PI) * 2), hex('#f4f6f4')); }
  void k;
}

function c_golfFijo(R) {
  const B = R.buf, P = c_PE, HOR = 84;
  c_cieloFijo(R, HOR, c_PE.cielo, 96);
  const copia = B.slice(0, HOR * 320);
  // la arboleda de robles detrás de las casas
  for (let x = 0; x < 320; x++) { const tp = Math.round(70 + c_vn(x / 7, 3, 82) * 10 + (x > 262 ? 4 : 0)); for (let y = tp; y < 96; y++) B[y * 320 + x] = c_ramp(P.hoja, 0.5 - (y - tp) / 26 * 0.4 + (c_vn(x / 3, y / 2.5, 83) - 0.5) * 0.5, x, y); }
  c_casa(R, 8, 92, 30, 10, ['#c89a86', '#e6b8a0', '#f4d4c0'], true, 0);
  c_casa(R, 70, 91, 26, 9, ['#9cc2b0', '#b8dcc8', '#d4ece0'], false, 1);
  c_casa(R, 126, 92, 32, 10, ['#d0c08a', '#ecdca4', '#f8eec4'], true, 2);
  c_casa(R, 202, 91, 24, 9, ['#a8b8d0', '#c4d4e8', '#e0eaf6'], false, 3);
  c_casa(R, 246, 92, 28, 9, ['#e0d0c4', '#f0e6dc', '#fbf6f0'], false, 4);
  // el campo: el rough lejano, la calle con franjas de corte en diagonal y el rough de delante, más oscuro
  for (let y = 93; y < 180; y++) { const z = (y - 93) / 87; for (let x = 0; x < 320; x++) {
    let l = 0.5 + (Math.floor((x + (y - 93) * 1.8) / (14 + z * 40)) % 2 ? 0.14 : -0.06) + (c_vn(x / 6, y / 2, 84) - 0.5) * 0.18 + (h(x, y, 85) - 0.5) * 0.12;
    if (y < 98) l = 0.28 + (h(x, y, 86) - 0.5) * 0.3; if (y > 166) l = 0.3 + (h(x, y >> 1, 87) - 0.5) * 0.35 - (h(x, y, 88) < 0.15 ? 0.2 : 0);
    B[y * 320 + x] = c_ramp(P.cesped, l + (1 - z) * 0.1, x, y); } }
  // el camino de los carritos: hormigón claro con juntas y su bordillo
  for (let x = 0; x < 320; x++) { const yc = Math.round(108 + Math.sin(x * 0.012 + 0.6) * 4); for (let j = -1; j <= 1; j++) R.pset(x, yc + j, j === -1 ? hex('#e8e4dc') : (x % 18 === 0) ? hex('#a8a49c') : j === 1 ? hex('#b8b4ac') : hex('#d4d0c8')); R.pset(x, yc + 2, P.cesped[1]); }
  // el green (más liso y claro, con su anillo) y el hoyo
  for (let j = -9; j <= 9; j++) for (let i = -44; i <= 44; i++) { const d = (i * i) / (44 * 44) + (j * j) / 81; if (d > 1) continue; R.pset(262 + i, 112 + j, d > 0.8 ? P.cesped[4] : c_ramp(P.cesped, 0.78 + (c_vn((262 + i) / 9, (112 + j) / 3, 89) - 0.5) * 0.12 + ((i + 60) % 16 < 8 ? 0.06 : 0), 262 + i, 112 + j)); }
  R.pset(262, 113, P.negro); R.pset(263, 113, P.negro); R.pset(261, 113, hex('#2a3a1e'));
  // el búnker con las marcas del rastrillo, la sombra del labio y el rastrillo
  for (let j = -7; j <= 7; j++) for (let i = -26; i <= 26; i++) { const d = (i * i) / 676 + (j * j) / 49; if (d > 1) continue; const x = 218 + i, y = 122 + j, lip = j < -4 + Math.abs(i) * 0.05; R.pset(x, y, lip ? P.arena[0] : c_ramp(P.arena, 0.6 + Math.sin(x * 0.7 + y * 0.2) * 0.15 - (j > 5 ? 0.2 : 0), x, y)); }
  R.linea(206, 126, 222, 122, hex('#c8a060')); R.linea(222, 121, 222, 124, hex('#6a6a6a'));
  // el lago: el cielo reflejado (claro arriba), el borde con piedras; la fuente se pinta en cada fotograma
  const AG = [];
  for (let y = 136; y <= 160; y++) for (let x = 54; x <= 206; x++) { const d = ((x - 130) / 74) ** 2 + ((y - 148) / 11) ** 2; if (d > 1) continue; const i = y * 320 + x;
    if (d > 0.82) { B[i] = y < 148 ? c_ramp(P.cesped, 0.18, x, y) : c_ramp(P.piedra, 0.3 + h(x >> 1, y, 90) * 0.6, x, y); continue; }
    AG.push(i); B[i] = c_ramp(P.agua, 0.72 - (y - 138) / 20 * 0.4 + (c_vn(x / 12, y / 2, 91) - 0.5) * 0.16, x, y); }
  c_roble(R, 16, 134);
  c_palmitoEnano(R, 96, 106, 6); c_palmitoEnano(R, 178, 103, 5); c_palmitoEnano(R, 300, 128, 7);
  // chuletas (calvas de tierra), cabezas de aspersor y una pelota perdida en la calle
  for (let k = 0; k < 14; k++) { const x = 60 + Math.round(h(k, 1, 80) * 200), y = 116 + Math.round(h(k, 2, 80) * 40); if (((x - 130) / 76) ** 2 + ((y - 148) / 13) ** 2 < 1) continue; R.pset(x, y, P.barro[3]); R.pset(x + 1, y, P.barro[4]); }
  for (const [x, y] of [[110, 124], [176, 132], [70, 134]]) { R.pset(x, y, P.piedra[1]); R.pset(x + 1, y, P.piedra[3]); }
  R.pset(154, 128, P.blanco);
  // las juncias del lago (a la derecha) y el tee del golfista, con sus marcas
  for (let k = 0; k < 8; k++) c_juncoFijo(R, 194 + k * 2, 152, 6 + (k % 3) * 2);
  for (let i = -10; i <= 10; i++) { R.pset(40 + i, 105, P.cesped[6]); R.pset(40 + i, 106, P.cesped[3]); } R.pset(32, 104, hex('#e83a3a')); R.pset(48, 104, hex('#e83a3a'));
  const M = c_mascaraCielo(R, copia);
  return { M, AG: Int32Array.from(AG) };
}

// una juncia quieta pintada en la capa fija
function c_juncoFijo(R, x, base, alto) { R.linea(x, base, x - 1, base - alto, c_PE.juncoV[2]); R.linea(x + 1, base, x + 2, base - alto + 2, c_PE.juncoV[4]); }

function c_golf(R, t, o, g) {
  const P = c_PE, C0 = c_capa(R, 'ev|golf', () => c_golfFijo(R)), B = R.buf;
  c_nubes(R, t, [[30, 36, 30, 1.0], [170, 46, 24, 1.7], [260, 62, 16, 2.6], [100, 66, 14, 3.1]], C0.M);
  c_pajaros(R, t, [[54, 10, 0.4], [58, 10, 0.43]], hex('#3a4050'));
  // las palmeras reales entre las casas (ninguna bajo la esquina de Atom)
  for (const [x, al, k] of [[44, 50, 1], [112, 56, 2], [190, 48, 3], [240, 44, 4]]) c_palma(R, x, 95, al, t, 'real', k);
  // el lago: ondas que corren y el destello del sol
  const AG = C0.AG; for (let n = 0; n < AG.length; n++) { const i = AG[n], x = i % 320, y = (i / 320) | 0, v = Math.sin(x * 0.35 - t * 2 + y * 1.3) + Math.sin(x * 0.11 + t * 0.7); if (v > 1.55) B[i] = c_mez(B[i], P.blanco, 0.5); else if (v < -1.6) B[i] = c_mez(B[i], P.agua[1], 0.4); }
  c_sombrasNubes(R, t, 98, 179, (x, y) => ((x - 130) / 74) ** 2 + ((y - 148) / 11) ** 2 < 1);
  c_fuente(R, 130, 148, t, 20);
  // la bandera roja (sin letras) que ondea en el green
  c_bandera(R, 262, 112, t);
  // el carrito que pasa por el camino y otro aparcado junto al green
  const xc = ((t * 11) % 380) - 30; c_carrito(R, Math.round(xc), Math.round(108 + Math.sin(xc * 0.012 + 0.6) * 4), 1, 0); c_carrito(R, 306, 106, -1, 1);
  // el golfista en el tee que golpea, y la bola que vuela hasta el green
  c_figurita(R, 40, 104, t, hex('#e86a8a'), hex('#e8e0c8'), 1, 'golpe'); c_figurita(R, 52, 104, t, hex('#3a8ac8'), hex('#3a3a4a'), 0);
  const ub = ((t + 1) % 6) - 1.5; if (ub > 0 && ub < 2.4) { const f = ub / 2.4, bx = Math.round(42 + f * 218), by = Math.round(102 + f * 10 - Math.sin(f * Math.PI) * 52); if (!c_atom(bx, by)) { R.pset(bx, by, P.blanco); R.pset(bx - 1, by, hex('#c8ccd0')); } }
  // dos ibis blancos que picotean entre el lago y el búnker, dos patos junto al lago y el cortacésped lejano
  c_ibis(R, 236, 140, t, -1, 0); c_ibis(R, 252, 136, t, 1, 1);
  c_pato(R, 208 + Math.round(Math.sin(t * 0.4) * 4), 150, t, -1, 0); c_pato(R, 216 + Math.round(Math.sin(t * 0.4 + 1) * 4), 152, t, -1, 1);
  const xm = ((t * 9) % 420) - 50; R.pset(Math.round(xm), 99, hex('#c83a2a')); for (let i = -3; i <= 3; i++) { R.pset(Math.round(xm) + i, 101, hex('#c83a2a')); R.pset(Math.round(xm) + i, 102, i % 3 ? hex('#2a2a2a') : hex('#5a5a5a')); } R.pset(Math.round(xm), 100, hex('#3a6ac8')); R.pset(Math.round(xm) - 1, 99, hex('#d8a07a'));
  for (let i = 1; i < 12; i++) if (h(i, Math.floor(t * 6), 76) > 0.6) R.pset(Math.round(xm) - 4 - i, 101 - (i % 2), hex('#b8d080'));
}

// un roble con musgo español (tronco retorcido, copa ancha en racimos con luz arriba a la izquierda) y su sombra en la
// hierba; (x, base): el pie del tronco
function c_roble(R, x, base) {
  const P = c_PE;
  for (let j = -4; j <= 4; j++) for (let i = -34; i <= 30; i++) { if ((i * i) / 1100 + (j * j) / 16 > 1) continue; R.pset(x + i + 6, base + j, c_mez(R.pget(x + i + 6, base + j), P.cesped[0], 0.55)); }
  for (let y = base - 24; y <= base; y++) { const w = y > base - 3 ? 3 : 2; for (let i = -w; i <= w; i++) R.pset(x + i + Math.round((base - y) * 0.1), y, i < 0 ? P.tronco[3] : i > 0 ? P.tronco[1] : P.tronco[2]); }
  R.linea(x, base - 18, x + 18, base - 26, P.tronco[2]); R.linea(x, base - 16, x - 14, base - 24, P.tronco[2]);
  for (let k = 0; k < 9; k++) { const cx = x - 22 + k * 6 + h(k, 1, 77) * 4, cy = base - 30 + Math.abs(k - 4) * 1.6 + h(k, 2, 77) * 4, r = 7 + h(k, 3, 77) * 4;
    for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let xx = Math.floor(cx - r * 1.3); xx <= cx + r * 1.3; xx++) { const dx = (xx + 0.5 - cx) / (r * 1.3), dy = (y + 0.5 - cy) / r, dd = dx * dx + dy * dy; if (dd > 1 || (dd > 0.6 && h(xx, y, 78) < 0.4)) continue; R.pset(xx, y, c_ramp(P.hoja, 0.6 - dy * 0.35 - dx * 0.15 + (h(xx, y, 79) - 0.5) * 0.4, xx, y)); } }
  for (let m = 0; m < 9; m++) { const mx = x - 24 + Math.round(h(m, 4, 77) * 48), my = base - 24 + Math.round(h(m, 5, 77) * 6), lar = 4 + Math.round(h(m, 6, 77) * 6); for (let j = 0; j < lar; j++) R.pset(mx + (j % 3 === 2 ? 1 : 0), my + j, P.musgo[(j + m) % 3]); }
}

// un pato (blanco y negro, con la cara roja) que camina despacio junto al lago; (x, y) las patas
function c_pato(R, x, y, t, dir, k) {
  const X = (i) => Math.round(x + i * dir), b = Math.floor(t * 3 + k) % 2, W = c_PE.blanco, N = hex('#2a2a30');
  R.pset(X(0), y, hex('#d88a3a')); R.pset(X(2), y - b, hex('#d88a3a'));
  for (let i = -2; i <= 3; i++) { R.pset(X(i), y - 1, i < 0 ? N : W); R.pset(X(i), y - 2, i < 1 ? N : W); } R.pset(X(-3), y - 2, N);
  R.pset(X(3), y - 3, W); R.pset(X(3), y - 4, W); R.pset(X(4), y - 4, hex('#c83a3a')); R.pset(X(5), y - 4, hex('#e8b850'));
}

// las sombras de las nubes que cruzan el césped (manchas tramadas que se desplazan), entre y0 y y1; salta lo que diga fuera(x, y)
function c_sombrasNubes(R, t, y0, y1, fuera) {
  const B = R.buf, Sx = c_PE.cesped[0];
  for (let k = 0; k < 2; k++) { const rx = 46 + k * 14, ry = 7 + k * 3, cx = (((k * 190 + t * (5 + k * 2)) % 460) + 460) % 460 - 70, cy = y0 + (y1 - y0) * (0.3 + k * 0.4);
    for (let y = Math.max(y0, Math.floor(cy - ry)); y <= Math.min(y1, Math.ceil(cy + ry)); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, Math.ceil(cx + rx)); x++) {
      const dx = (x - cx) / rx, dy = (y - cy) / ry, d = dx * dx + dy * dy + (c_vn(x / 9, y / 3, 30 + k) - 0.5) * 0.5; if (d > 1 || fuera(x, y)) continue; if (c_um(x, y) > (1 - d) * 2.2) continue; B[y * 320 + x] = c_mez(B[y * 320 + x], Sx, 0.28); } }
}

// una mata de palmito enano (hojas en abanico) pintada en la capa fija; (x, base) el pie
function c_palmitoEnano(R, x, base, w) {
  const P = c_PE.hoja;
  for (let k = 0; k < 9; k++) { const a = -Math.PI * (0.1 + k * 0.1), lx = Math.round(x + Math.cos(a) * w), ly = Math.round(base + Math.sin(a) * w * 0.8); R.linea(x, base, lx, ly, P[2 + (k % 3)]); R.pset(lx, ly, P[5]); R.pset(lx + (k < 4 ? -1 : 1), ly + 1, P[3]); }
  R.pset(x, base, P[1]); R.pset(x - 1, base, P[1]);
}

// la fuente del lago: el chorro que sube y cae en gotas, la corona de espuma y las ondas que se abren
function c_fuente(R, x, y, t, alto) {
  const W = c_PE.blanco, A = hex('#cfe4ee');
  for (let j = 0; j < alto; j++) { const w = Math.sin(t * 9 + j) > 0.3 ? 1 : 0; R.pset(x, y - j, j % 3 ? W : A); if (w) R.pset(x + (j % 2 ? 1 : -1), y - j, A); }
  for (let k = 0; k < 18; k++) { const u = ((t * 0.9 + k / 18) % 1), s = k % 2 ? 1 : -1, d = 3 + (k % 5) * 1.6, xx = Math.round(x + s * d * u * 2), yy = Math.round(y - alto + u * u * (alto + 2) - Math.sin(u * Math.PI) * 4); R.pset(xx, yy, u < 0.6 ? W : A); }
  for (let i = -5; i <= 5; i++) R.pset(x + i, y + (Math.abs(i) > 3 ? 0 : -1), Math.abs(i) % 2 ? W : A);
  for (let r = 0; r < 2; r++) { const u = (t * 0.6 + r * 0.5) % 1, rx = 6 + u * 16; for (let a = 0; a < 6.28; a += 0.25) { if (c_um(Math.round(x + Math.cos(a) * rx), y) < u) continue; R.pset(Math.round(x + Math.cos(a) * rx), Math.round(y + 1 + Math.sin(a) * rx * 0.18), A); } }
}

// la bandera del green: el mástil blanco y la tela roja SIN letras que ondea
function c_bandera(R, x, y, t) {
  R.linea(x, y, x, y - 24, hex('#f0f0f0')); R.linea(x + 1, y, x + 1, y - 24, hex('#b8b8b8'));
  for (let i = 1; i <= 10; i++) { const o = Math.round(Math.sin(t * 5 - i * 0.7) * (i / 10) * 1.6); for (let j = 0; j < 6 - (i > 8 ? 1 : 0); j++) R.pset(x + 1 + i, y - 24 + j + o, j === 0 ? hex('#f05a4a') : (i + j + Math.round(t * 4)) % 5 === 0 ? hex('#a81e1e') : hex('#d8322e')); }
}

// un ibis blanco (pico largo, curvo y rojo) que camina y picotea; (x, y) las patas
function c_ibis(R, x, y, t, dir, k) {
  const W = c_PE.blanco, S = hex('#c8ccd0'), Rj = hex('#e0584a'), u = (t * 1.3 + k * 1.7) % 3, pica = u > 2.2 ? Math.sin((u - 2.2) / 0.8 * Math.PI) : 0, X = (i) => Math.round(x + i * dir);
  R.pset(X(0), y, Rj); R.pset(X(1), y - 1, Rj); R.pset(X(-1), y - 1, Rj); R.pset(X(0), y - 2, Rj);
  for (let i = -2; i <= 2; i++) { R.pset(X(i), y - 3, i < -1 ? S : W); R.pset(X(i), y - 4, W); } R.pset(X(-3), y - 4, hex('#1e1e22'));
  const hx = 3, hy = 6 - pica * 4; R.linea(X(2), y - 4, X(hx), Math.round(y - hy), W); R.pset(X(hx + 1), Math.round(y - hy), Rj); R.pset(X(hx + 2), Math.round(y - hy + 1), Rj); R.pset(X(hx + 3), Math.round(y - hy + 2), Rj);
}

// el aspersor del primer término: la cabeza que gira y el abanico de gotas
function c_aspersor(R, t, x, y) {
  R.pset(x, y, hex('#3a3a3a')); R.pset(x + 1, y, hex('#5a5a5a')); R.pset(x, y - 1, hex('#8a8a8a'));
  const a = Math.sin(t * 1.4) * 1.2 + Math.PI;
  for (let k = 0; k < 9; k++) { const u = ((t * 1.6 + k / 9) % 1), d = u * 26, xx = Math.round(x + Math.cos(a) * d), yy = Math.round(y - 2 - Math.sin(u * Math.PI) * 7); R.pset(xx, yy, hex('#dceef4')); }
}

function c_lagoFijo(R) {
  const B = R.buf, P = c_PE, HOR = 70;
  c_cieloFijo(R, HOR, c_PE.cielo, 88);
  const copia = B.slice(0, HOR * 320);
  for (let x = 0; x < 320; x++) { const tp = Math.round(66 + c_vn(x / 6, 5, 92) * 8 + (x > 262 ? 3 : 0)); for (let y = tp; y < 86; y++) B[y * 320 + x] = c_ramp(P.hoja, 0.5 - (y - tp) / 20 * 0.4 + (c_vn(x / 3, y / 2.5, 93) - 0.5) * 0.5, x, y); }
  c_casa(R, 12, 84, 32, 10, ['#c89a86', '#e6b8a0', '#f4d4c0'], false, 5);
  c_casa(R, 88, 84, 28, 9, ['#9cc2b0', '#b8dcc8', '#d4ece0'], true, 6);
  c_casa(R, 168, 84, 34, 10, ['#d0c08a', '#ecdca4', '#f8eec4'], false, 7);
  c_casa(R, 236, 84, 22, 8, ['#a8b8d0', '#c4d4e8', '#e0eaf6'], false, 8);
  for (let x = 0; x < 320; x++) { for (let y = 84; y < 88; y++) B[y * 320 + x] = c_ramp(P.cesped, 0.4 + (h(x, y, 94) - 0.5) * 0.3 + (y - 84) * 0.05, x, y); }
  // el lago: el cielo reflejado (más oscuro y verdoso hacia delante); las ondas y reflejos van en cada fotograma
  for (let y = 88; y < 150; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, v = (y - 88) / 62; B[i] = c_mez(c_ramp(P.agua, 0.7 - v * 0.55 + (c_vn(x / 20, y / 3, 95) - 0.5) * 0.16, x, y), hex('#3a5a4a'), v * 0.3); }
  // pelotas de golf en el fondo de la orilla (se ven bajo el agua) y las piedras del borde
  for (const [x, y] of [[60, 145], [64, 146], [132, 144], [188, 146], [236, 145], [240, 147]]) { R.pset(x, y, hex('#c8d4d0')); R.pset(x + 1, y, hex('#a0b0ac')); }
  for (let x = 0; x < 320; x++) { const y0 = 148 + Math.round(Math.sin(x * 0.08) * 1); for (let y = y0; y < y0 + 4; y++) R.pset(x, y, c_ramp(P.piedra, 0.25 + h(x >> 1, y >> 1, 96) * 0.7 - (y - y0) * 0.08, x, y)); }
  // la orilla: hierba a franjas con matas
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const l = 0.5 + (Math.floor((x - (y - 152) * 2.2) / 34) % 2 ? 0.14 : -0.04) + (c_vn(x / 5, y / 2, 97) - 0.5) * 0.2 + (h(x, y, 98) - 0.5) * 0.14; B[y * 320 + x] = c_ramp(P.cesped, l, x, y); }
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 81) * 318), y = 154 + Math.round(h(k, 2, 81) * 24), c = k % 3 === 0 ? hex('#f4f0e0') : k % 3 === 1 ? hex('#f0d040') : P.cesped[1]; R.pset(x, y, c); if (k % 3 === 2) { R.pset(x + 1, y - 1, c); R.pset(x - 1, y - 1, c); } }
  const antesCartel = B.slice();
  // el cartel de aviso: el poste, el rombo amarillo con el caimán y la placa del nadador tachado (sin letras)
  for (let y = 98; y <= 162; y++) { R.pset(289, y, hex('#8a8a90')); R.pset(290, y, hex('#c8c8cc')); R.pset(291, y, hex('#5a5a60')); }
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.abs(i) + Math.abs(j); if (d > 12) continue; R.pset(290 + i, 98 + j, d > 10 ? P.negro : d > 9 ? hex('#f8e080') : (i + j) % 9 === 0 ? hex('#e8c030') : hex('#f2cc38')); }
  const G = P.negro; for (let i = -7; i <= 6; i++) R.pset(290 + i, 99, G); for (let i = -5; i <= 4; i++) R.pset(290 + i, 98, G); for (let i = -3; i <= 2; i++) R.pset(290 + i, 97, G); R.pset(287, 96, G); R.pset(288, 96, G); R.pset(294, 98, G); R.pset(295, 99, G); R.pset(296, 99, G);
  R.pset(286, 100, G); R.pset(289, 100, G); R.pset(292, 100, G); R.pset(285, 101, G); R.pset(293, 101, G); R.pset(287, 95, hex('#f2cc38'));
  for (let y = 112; y <= 124; y++) for (let x = 280; x <= 300; x++) R.pset(x, y, y === 112 || y === 124 || x === 280 || x === 300 ? hex('#3a3a3a') : P.blanco);
  for (let i = 0; i < 8; i++) { R.pset(286 + i, 120 + (i % 2), hex('#3a7ab8')); } R.pset(287, 117, P.negro); R.pset(288, 118, P.negro); R.pset(289, 118, P.negro); R.pset(290, 117, P.negro); R.pset(291, 118, P.negro);
  R.linea(283, 114, 297, 122, hex('#d8302a')); R.linea(283, 115, 297, 123, hex('#d8302a'));
  const CART = new Uint8Array(320 * 180); for (let y = 84; y <= 162; y++) for (let x = 276; x <= 304; x++) if (B[y * 320 + x] !== antesCartel[y * 320 + x]) CART[y * 320 + x] = 1;
  const M = c_mascaraCielo(R, copia);
  return { M, CART };
}

function c_lago(R, t, o, g) {
  const P = c_PE, C0 = c_capa(R, 'ev|lago', () => c_lagoFijo(R)), B = R.buf;
  c_nubes(R, t, [[50, 36, 28, 1.1], [210, 44, 22, 1.9], [130, 56, 14, 2.9]], C0.M);
  c_pajaros(R, t, [[48, -9, 0.2], [52, -9, 0.23], [45, -9, 0.26]], hex('#3a4050'));
  for (const [x, al, k] of [[56, 34, 5], [150, 40, 6], [222, 32, 7]]) c_palma(R, x, 86, al, t, 'real', k);
  // el agua: el reflejo de la otra orilla (casas, palmeras y nubes que pasan) que tiembla y se oscurece hacia delante, y
  // destellos que derivan; el cartel no se toca
  const F = C0.b;
  for (let y = 88; y < 148; y++) { const d = y - 88, ys = 87 - Math.round(d * 1.25), ond = Math.round(Math.sin(y * 0.8 + t * 2) * (0.5 + d * 0.05));
    for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (C0.CART[i]) continue; const src = ys >= 0 ? B[ys * 320 + Math.min(319, Math.max(0, x + ond))] : P.cielo[2];
      let c = c_mez(src, F[i], 0.3 + d / 60 * 0.5); const v = h(Math.floor((x - t * 2 + Math.sin(y) * 7) / 5), y, 99); if (v > 0.93) c = c_mez(c, P.blanco, 0.4 - d / 200); else if (v < 0.03) c = c_mez(c, P.agua[1], 0.4); B[i] = c; } }
  c_sombrasNubes(R, t, 153, 179, () => false);
  c_fuente(R, 244, 100, t, 12);
  // una tortuga que toma el sol en la orilla y a ratos estira el cuello
  { const sx = 112, sy = 152, cu = (t % 7) < 4 ? 1 : 0; for (let i = -3; i <= 3; i++) { R.pset(sx + i, sy - 1, i % 2 ? hex('#4a5a2e') : hex('#5e6e3a')); R.pset(sx + i, sy, hex('#2e3a1e')); } for (let i = -2; i <= 2; i++) R.pset(sx + i, sy - 2, hex('#6e7e46')); R.pset(sx + 4 + cu, sy - 1 - cu, hex('#7a7a4a')); R.pset(sx + 4, sy - 1, hex('#6a6a3e')); R.pset(sx + 5 + cu, sy - 1 - cu, hex('#c8a840')); }
  // los nenúfares y una juncia
  [[40, 132, 5, 0], [70, 138, 4, 1], [210, 128, 5, 2], [252, 140, 6, 3]].forEach(([cx, cy, r, k]) => { const dx = Math.round(Math.sin(t * 0.5 + k) * 0.8); for (let j = -2; j <= 1; j++) for (let i = -r; i <= r; i++) { if ((i * i) / (r * r) + (j * j) / 3 > 1 || (i > 1 && j === 0)) continue; R.pset(cx + i + dx, cy + j, j < 0 ? P.juncoV[4] : P.juncoV[2]); } });
  // la anhinga que nada: solo el cuello en S fuera del agua y su estela en V
  const ax = Math.round(320 - ((t * 7) % 380)), ay = 116, N = hex('#1e2024');
  if (ax > -10) { for (let i = 1; i < 14; i++) { if (c_um(ax + i, ay + 1) > 1 - i / 14) continue; R.pset(ax + i, ay + Math.round(i * 0.25), P.agua[6]); R.pset(ax + i, ay - Math.round(i * 0.15) + 1, P.agua[6]); }
    R.pset(ax, ay, N); R.pset(ax, ay - 1, N); R.pset(ax - 1, ay - 2, N); R.pset(ax - 1, ay - 3, N); R.pset(ax, ay - 4, N); R.pset(ax - 1, ay - 4, N); R.pset(ax - 2, ay - 4, hex('#c8a040')); R.pset(ax - 3, ay - 4, hex('#c8a040')); }
}

// a_caiman (grupo C): el caimán (aligátor) o el cocodrilo canónicos, de perfil, graciosos y nunca fieros.
//   a_caiman(R, x, ySuelo, t, { dir, anda, boca, especie, s, agua, parpadeo })
//   x: el centro del cuerpo; ySuelo: donde apoyan las patas (con agua, la línea del agua). Mira a la derecha (dir 1) o
//   a la izquierda (dir −1). s 1: unos 33 px (caimán) o 36 px (cocodrilo) de largo, de la cola al hocico, y 9 de alto; s 2: el doble, con más detalle
//   (placas de escamas, ojo con brillo). especie 'caiman' (por defecto): verde oliva casi negro, el lomo con brillo, el
//   vientre crema, hocico corto, ANCHO y redondeado (la U) con las narinas en la punta, la boca en sonrisa y sin dientes de
//   abajo a la vista. 'cocodrilo': gris oliva claro, hocico largo, fino y AFILADO (la V) y el diente de abajo que asoma con
//   la boca cerrada. anda (true o 0–1): las cuatro patas dan pasos alternos, el cuerpo se levanta y bota y la cola ondea más;
//   quieto, la cola se mece despacio. boca 0–1: la mandíbula de arriba se abre (dentro rosa, lengua y dientecitos romos).
//   agua 0–1: se hunde; con 1 solo asoman los ojos, las narinas y los bultos del lomo, y unas ondas lo rodean. Parpadea solo
//   (parpadeo: false lo quita). Pinta con pset (y lee con pget bajo las ondas): respeta R.recorte (puertas, ventanillas, mosquiteras).
//   Devuelve { hocico: [x, y], cola: [x, y], ojo: [x, y], caja: [x0, y0, x1, y1] }.
const c_PIEL = {
  caiman: [hex('#0c1208'), C.caimanS, hex('#2c3a1e'), C.caiman, hex('#566a36'), hex('#76894a')],
  cocodrilo: [hex('#262c1c'), hex('#48543a'), hex('#62704a'), C.cocodrilo, hex('#98a876'), hex('#b8c698')],
};

const c_VIENTRE = { caiman: c_hx(['#5e5c3c', '#9a9666', '#c4bc8c']), cocodrilo: c_hx(['#a29e74', '#cac496', '#e6deb6']) };

// la paleta del grupo D: el techo y la pared de la tienda, la franja de la cadena, las neveras y su luz fría, el suelo de
// vinilo, la góndola, el laminado del mostrador, el acero, la noche de fuera y el hormigón de la gasolinera, el estuco y
// las tejas del autoservicio, los azulejos y la freidora, el aluminio y la malla del porche, el agua de la piscina
const d_P = pal({
  techo: '#c4c8c0', techoS: '#b4b8b0', techoD: '#8e928a', tubo: '#f6fff4', tuboS: '#d4ecd8', tuboOff: '#7c867e', marcoT: '#a2a69e',
  pared: '#dcd6c4', paredS: '#cbc4b0', paredL: '#ebe6d6', zocalo: '#5e5e66', zocaloL: '#7a7a84',
  rojo: '#d23a2a', rojoL: '#f0644a', rojoS: '#962418', amar: '#f2b62a', amarS: '#c08a14',
  nev: '#3a4652', nevL: '#62707e', nevS: '#222a32', nevF: '#d4e8f2', nevFS: '#a8c4d8', nevLuz: '#f2fbff', azulP: '#2a68b8', azulPL: '#5a92dc',
  suelo: '#d4d0c2', suelo2: '#c4c0b2', junta: '#aaa698', brillo: '#f0f2ea', sombra: '#a29e92', sombraD: '#8a867c', azulRef: '#c4d8e0',
  gond: '#e6e6de', gondS: '#b4b4ac', gondD: '#7a7a84', tira: '#f6f6ee',
  madera: '#9a6a44', maderaS: '#744c2e', maderaL: '#b8865a', lamin: '#e8dec8', laminS: '#cabea6', laminD: '#a89a80',
  acero: '#aab2ba', aceroS: '#7a828c', aceroL: '#d8dee4', aceroD: '#4c535c',
  noche0: '#070b1e', noche1: '#0e1636', noche2: '#18234c', noche3: '#26305e', noche4: '#3a3a6a', brumaN: '#4a3a5e',
  horm: '#8a8e8e', hormL: '#aeb2ae', hormS: '#5c6062', asf: '#34363e', asfL: '#464852', asfS: '#26282e', pintura: '#e8e8dc',
  vidrio: '#a6cede', vidrioL: '#e4f6fc', cafe: '#5a3218', cafeL: '#8a5430',
  estuco: '#e6d2b0', estucoS: '#c8b48e', estucoL: '#f2e2c4', teja: '#9a4a2a', tejaS: '#6e2e18', tejaL: '#c06a3e',
  azulejo: '#eef0ea', azulejoS: '#d4d8d0', baldR: '#a84a36', baldRS: '#86382a', baldRL: '#c06048', goma: '#26262a',
  aceite: '#d8a038', aceiteL: '#f2cc60', aceiteS: '#a8721e', calor: '#ff8a3a', calorL: '#ffc070', papelHam: '#f2d860', papelHamS: '#c8a838',
  bolsaP: '#c8a070', bolsaPS: '#9a7650', bolsaPL: '#dcbc8c',
  alu: '#eef0ee', aluS: '#b8bcbc', aluD: '#8a8e90', malla: '#3a4440', cielo0: '#5aa4e8', cielo1: '#7ab8ee', cielo2: '#9acdf2', cielo3: '#bcdff6',
  nubeL: '#ffffff', nube: '#eef4fa', nubeS: '#c4d4e6', cesped: '#5aa040', cespedS: '#3e7a2e', cespedL: '#7cc050', estanque: '#4a7a6a', estanqueL: '#7aa898',
  piscina: '#3ac8d8', piscinaS: '#22a0b8', piscinaD: '#16809c', piscinaL: '#8ae8f0', mosaico: '#2a6ab8', mosaicoL: '#4a92d8',
  traver: '#eadcc2', traverS: '#d2c2a4', traverL: '#f6ecd8', rosaCasa: '#f2c8b8', rosaCasaS: '#d8a898', flamenco: '#ff7aa8', flamencoS: '#d8507e', flamencoL: '#ffb0cc',
  buganv: '#e83a8a', buganvL: '#ff70b0', terraco: '#c06a3a', terracoS: '#8e4626',
});

// las botellas y latas de las neveras (color y su sombra) y las bolsas de patatas (color, sombra y la franja del dibujo)
const d_BOT = [['#c8282a', '#8a1a1c'], ['#f08a1a', '#b05a10'], ['#2a9a4a', '#1a6a30'], ['#2a6ad8', '#1a4a9a'], ['#f2e24a', '#b8a82a'], ['#f4f4f0', '#c8c8c4'], ['#8a4a2a', '#5a2e18'], ['#9a3ac8', '#6a2a8a'], ['#3ac8c8', '#1a8a8a']].map((c) => c.map(hex));

const d_BOLSA = [['#e83a2a', '#a82418', '#f8d84a'], ['#2a7ad8', '#1a4a98', '#f0f0f0'], ['#f2c22a', '#b88a14', '#e83a2a'], ['#3aa84a', '#22702e', '#f4f0e0'], ['#8a3ac8', '#5a2288', '#f2c22a'], ['#f07a1a', '#b04e10', '#3a2a2a'], ['#4ac8e8', '#2a88b0', '#f8f0d0']].map((c) => c.map(hex));

// la trama ordenada de 4 × 4 de los degradados
const d_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// mezcla dos colores del lienzo (a = 0: c; a = 1: d)
function d_mez(c, d, a) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a) << s; return (r | 0xff000000) >>> 0; }

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function d_rect(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// la capa fija de cada vista: se pinta una vez en un búfer aparte y en cada fotograma se copia entera (una pasada)
const d_capas = new Map();

function d_capa(R, clave, dibuja) {
  let b = d_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); d_capas.set(clave, b); }
  return b;
}

// un degradado vertical tramado entre varios colores, en [x0, x1] × [y0, y1] (respeta R.recorte)
function d_degr(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, f > (d_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16 ? cols[i + 1] : cols[i]); }
}

// un óvalo relleno (respeta R.recorte)
function d_elipse(R, cx, cy, rx, ry, c) { for (let j = -Math.ceil(ry); j <= ry; j++) for (let i = -Math.ceil(rx); i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1) R.pset(Math.round(cx + i), Math.round(cy + j), c); }

// nubes de tres tonos (sombra, cuerpo, luz) que pasan a tres velocidades entre y0 e y1; k0 cambia el dibujo: cada una es
// una fila de bultos ovalados, más altos en medio, con la panza en sombra y la luz arriba a la izquierda
function d_nubes(R, t, y0, y1, cols, n = 7, k0 = 0) {
  for (let k = 0; k < n; k++) {
    const v = [1.1, 2.3, 3.8][k % 3], w = 18 + h(k, 1, k0) * 30, x = ((h(k, 2, k0) * 420 + t * v) % 420) - 60, y = Math.round(y0 + h(k, 3, k0) * (y1 - y0)), nb = 2 + Math.floor(w / 8);
    const bul = []; for (let i = 0; i < nb; i++) { const u = i / (nb - 1), r = 2.5 + Math.sin(u * Math.PI) * (w / 9) + h(k, i + 4, k0) * 2; bul.push([x + u * w, y - Math.sin(u * Math.PI) * r * 0.5, r]); }
    for (const [cx, cy, r] of bul) d_elipse(R, cx, cy + 1.5, r * 1.5, r * 0.75, cols[0]);
    for (const [cx, cy, r] of bul) d_elipse(R, cx, cy, r * 1.35, r * 0.62, cols[1]);
    for (const [cx, cy, r] of bul) if (r > 3) d_elipse(R, cx - r * 0.35, cy - r * 0.3, r * 0.7, r * 0.3, cols[2]);
  }
}

// un pájaro (dos alas que baten) en x, y
function d_ave(R, x, y, t, c, k = 0) { const a = Math.sin(t * 9 + k) > 0; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : 0), c); R.pset(x + 2, y - (a ? 2 : 0), c); }

// una palmera (tronco con anillos y siete hojas que se mecen); c = [hoja, hojaS, tronco, troncoS]
function d_palmera(R, x, suelo, alto, t, c, k = 0) {
  const m = Math.sin(t * 0.9 + k) * 1.6, top = suelo - alto;
  for (let y = suelo; y > top; y--) { const u = (suelo - y) / alto, dx = Math.round(u * u * 4 + m * u * 0.6); R.pset(x + dx, y, c[2]); R.pset(x + dx + 1, y, c[3]); if (y % 3 === 0) R.pset(x + dx, y, c[3]); }
  const cx = x + 4 + Math.round(m * 0.6);
  for (let f = 0; f < 7; f++) { const a = -Math.PI + f * Math.PI / 6 + Math.sin(t * 1.3 + f + k) * 0.06, L = 10 + (f % 2) * 3;
    for (let d = 0; d < L; d++) { const px = Math.round(cx + Math.cos(a) * d), py = Math.round(top + Math.sin(a) * d * 0.55 + d * d / 22); R.pset(px, py, d % 3 ? c[0] : c[1]); if (d > 2 && d % 2) R.pset(px, py + 1, c[1]); } }
  R.disco(cx, top + 1, 1, c[3]);
}

// tirón de imagen de vez en cuando; luego la hora, la fecha, el punto rojo, la cámara «02» y las esquinas del visor.
// Lee el búfer en uso al llamarla (sirve en los fundidos). o.cctv 0–1 mezcla con el color, o.hora, o.fecha (ver arriba).
let d_vigT = null, d_rampa = null;

export function d_cctv(R, t, o = {}) {
  const a = Math.max(0, Math.min(1, o.cctv ?? 1)); if (a <= 0) return;
  if (!d_vigT) { d_vigT = new Float32Array(320 * 180); for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 160, (y - 90) / 90) / 1.414; d_vigT[y * 320 + x] = 1 - Math.max(0, d - 0.45) * 1.15; } }
  if (!d_rampa) { const cs = ['#0e140e', '#2a3428', '#4c5a48', '#748270', '#9aa894', '#c0ccb6', '#e4eedc'].map(hex); d_rampa = []; for (let i = 0; i < 64; i++) { const u = i / 63 * 6, j = Math.min(5, Math.floor(u)); d_rampa.push(d_mez(cs[j], cs[j + 1], u - j)); } }
  const B = R.buf, fr = Math.floor(t * 12), banda = ((t * 34) % 240) - 30, tiron = Math.sin(t * 0.83) > 0.985 || Math.sin(t * 1.37 + 2) > 0.992, ty = Math.round(60 + h(fr >> 2, 3) * 80);
  for (let y = 0; y < 180; y++) {
    const lin = (y & 1) ? 0.84 : 1, db = Math.abs(y - banda), bb = db < 7 ? 1.12 - db * 0.012 : 1, fila = y * 320;
    if (tiron && y >= ty && y < ty + 6) B.copyWithin(fila + 3, fila, fila + 317);
    for (let x = 0; x < 320; x++) {
      const i = fila + x, c = B[i];
      let l = (0.3 * (c & 255) + 0.59 * ((c >> 8) & 255) + 0.11 * ((c >> 16) & 255)) / 255;
      l = (l * 1.08 - 0.03) * d_vigT[i] * lin * bb + (h(x, y, fr) - 0.5) * 0.09;
      const k = l <= 0 ? 0 : l >= 1 ? 63 : Math.round(l * 63), out = d_rampa[k];
      B[i] = a >= 1 ? out : d_mez(c, out, a);
    }
  }
  // la hora (corre con t), la fecha, el punto rojo y la cámara 02
  const cl = hex('#e8f2dc');
  let hora = o.hora ?? (3 * 3600 + 41 * 60 + 7);
  if (typeof hora === 'number') { const s = Math.floor(hora + t) % 86400, p = (n) => String(n).padStart(2, '0'); hora = `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`; }
  R.numero(hora, 16, 31, { color: cl, sombra: true });
  const fecha = o.fecha ?? '06-15-2018'; if (fecha) R.numero(fecha, 16, 42, { color: cl, sombra: true, fina: true });
  if (Math.floor(t * 1.6) % 2 === 0) { R.disco(9, 27, 2, hex('#ff3a2a')); R.pset(8, 26, hex('#ffb0a0')); }
  // la cámara 02 abajo a la izquierda: una camarita y su número
  R.rect(8, 166, 15, 171, cl); R.rect(16, 167, 18, 170, cl); R.rect(10, 168, 13, 169, hex('#2a3428')); R.numero('02', 22, 172, { color: cl, sombra: true });
  // las esquinas del visor (la de arriba a la derecha no: es de Atom)
  for (const [x, y, sx, sy] of [[4, 4, 1, -1], [4, 175, 1, 1], [315, 175, -1, 1]]) { R.linea(x, y, x + sx * 9, y, cl); R.linea(x, y, x, y - sy * 9, cl); }
}

// o.freno (las luces de atrás encendidas), o.faros, o.humo (t para el humo del escape), o.conductor (una silueta oscura)
function d_coche(R, x, suelo, dir, col, s = 1, o = {}) {
  const X = (i) => (dir > 0 ? x + i * s : x - i * s), Y = (j) => suelo - j * s, P = d_P;
  const pol = (pts, c) => R.poligono(pts.map(([i, j]) => [X(i), Y(j)]), c);
  // la sombra en el suelo
  for (let i = -2; i < 48; i++) for (let j = 0; j < 2 * s; j++) if ((i + j) % 2 === 0) R.pset(X(i), suelo + j, P.asfS);
  pol([[0, 6], [1, 14], [9, 15], [15, 23], [33, 23], [40, 15], [47, 13], [48, 6], [46, 3], [2, 3]], C.k);
  pol([[1, 7], [2, 13], [10, 14], [16, 22], [32, 22], [39, 14], [46, 12], [47, 7], [45, 4], [3, 4]], col[0]);
  pol([[1, 7], [47, 7], [45, 4], [3, 4]], col[1]);
  pol([[2, 13], [46, 12], [46, 11], [2, 12]], col[2]);
  // las ventanillas con su reflejo
  pol([[11, 14], [17, 21], [23, 21], [23, 14]], o.conductor ? hex('#1a2230') : hex('#2a3a50'));
  pol([[25, 14], [25, 21], [31, 21], [37, 14]], hex('#2a3a50'));
  pol([[13, 15], [15, 17], [17, 17], [15, 15]], hex('#8aa8c8')); pol([[27, 15], [27, 17], [29, 17], [29, 15]], hex('#8aa8c8'));
  if (o.conductor) { R.disco(X(30), Y(18), 2.2 * s, hex('#0e1218')); pol([[27, 14], [27, 16], [34, 16], [34, 14]], hex('#0e1218')); }
  // la puerta, el tirador, el embellecedor y los pilotos
  R.linea(X(24), Y(13), X(24), Y(5), col[1]); R.linea(X(12), Y(12), X(12), Y(6), col[1]); R.linea(X(36), Y(12), X(37), Y(6), col[1]);
  pol([[27, 11], [30, 11], [30, 10], [27, 10]], P.aceroL); pol([[3, 9], [46, 9], [46, 8], [3, 8]], P.aceroS);
  pol([[0, 8], [2, 8], [2, 12], [0, 12]], o.freno ? hex('#ff3a2a') : hex('#a01a1a'));
  pol([[46, 9], [48, 9], [48, 12], [46, 12]], o.faros ? hex('#fff8d0') : hex('#e8e0b0'));
  // las ruedas con su llanta
  for (const i of [9, 39]) { R.disco(X(i), Y(3), 4.5 * s, C.k); R.disco(X(i), Y(3), 2.4 * s, P.aceroS); R.disco(X(i), Y(3), 1.2 * s, P.aceroL); }
  if (o.freno) for (let j = -3 * s; j <= 3 * s; j++) for (let i = 1; i < 6 * s; i++) if ((i + j) % 2 === 0 && Math.abs(j) < 3 * s - i / 3) R.pset(dir > 0 ? X(0) - i : X(0) + i, Y(10) + j, hex('#6a1a2a'));
  if (o.humo != null) for (let k = 0; k < 5; k++) { const u = ((o.humo * 0.7 + k * 0.2) % 1), px = dir > 0 ? X(0) - 2 - u * 16 * s : X(0) + 2 + u * 16 * s, py = Y(3) - u * 8 * s; R.disco(px, py, (1 + u * 3) * s * 0.7, u < 0.5 ? hex('#8a8c94') : hex('#5c5e68')); }
}

// el flotador de flamenco: el aro rosa con su brillo, el cuello en S y la cabeza con el pico negro (x, y: el centro del
// aro). o.s escala (1 o 2), o.dir, o.giro (radianes: cuando sale volando)
export function d_flamenco(R, x, y, t, o = {}) {
  const s = o.s ?? 1, dir = o.dir ?? 1, P = d_P, g = o.giro ?? 0, cg = Math.cos(g), sg = Math.sin(g);
  const T = (i, j) => [x + (i * cg - j * sg) * s * dir, y + (i * sg + j * cg) * s];
  // el aro (una elipse gruesa) con el hueco de agua en medio
  for (let j = -5; j <= 5; j++) for (let i = -12; i <= 12; i++) { const d = (i / 12) ** 2 + (j / 5) ** 2, di = (i / 6) ** 2 + (j / 2) ** 2; if (d > 1 || di < 1) continue;
    const [px, py] = T(i, j); R.rect(Math.round(px), Math.round(py), Math.round(px) + s - 1, Math.round(py) + s - 1, j > 2 ? P.flamencoS : (j < -2 && i < 0) ? P.flamencoL : P.flamenco); }
  // el cuello y la cabeza
  const cu = [[7, -3], [8, -5], [9, -7], [9, -9], [8, -11], [7, -12], [6, -13], [7, -14], [9, -14]];
  for (const [i, j] of cu) { const [px, py] = T(i, j); R.rect(Math.round(px), Math.round(py), Math.round(px) + 2 * s - 1, Math.round(py) + 2 * s - 1, P.flamenco); }
  { const [px, py] = T(11, -14); R.rect(Math.round(px), Math.round(py), Math.round(px) + s, Math.round(py) + s - 1, C.k); const [ex, ey] = T(8, -14); R.pset(Math.round(ex), Math.round(ey), C.k); }
  { const [px, py] = T(-5, -4); R.pset(Math.round(px), Math.round(py), C.blanco); }
}

// ══ la tienda (general): la capa fija ══
function d_tiendaFija(R) {
  const P = d_P, { rect, pset, disco, linea, poligono } = R;
  // el techo de placas (tranquilo bajo la barra del año y en la esquina de Atom), con la rejilla del aire
  rect(0, 0, 319, 13, P.techo); for (let x = 6; x < 320; x += 24) rect(x, 0, x, 12, P.techoS); rect(0, 6, 319, 6, P.techoS); rect(0, 13, 319, 13, P.techoD);
  rect(62, 2, 90, 9, P.techoS); for (let x = 64; x < 90; x += 2) rect(x, 3, x, 8, P.marcoT);
  // la pared del fondo, con su gotelé, la luz que cae de los plafones y el zócalo
  rect(0, 14, 319, 103, P.pared); for (let k = 0; k < 420; k++) pset(Math.floor(h(k, 3, 420) * 320), 14 + Math.floor(h(k, 4, 420) * 88), h(k, 5, 420) > 0.5 ? P.paredS : P.paredL);
  for (let y = 14; y < 44; y++) for (let x = 176 + (y - 14); x < 270 - (y - 14); x++) if ((x + y) % 4 === 0) pset(x, y, P.paredL);
  rect(0, 100, 319, 103, P.zocalo); rect(0, 100, 319, 100, P.zocaloL);
  // la franja roja y amarilla de la cadena (sin letras), sobre la puerta y las neveras, con su brillo y su sombra
  rect(0, 22, 208, 32, P.rojo); rect(0, 22, 208, 22, P.rojoL); rect(0, 31, 208, 32, P.rojoS); rect(0, 33, 208, 34, P.amar); rect(0, 35, 208, 35, P.amarS); rect(209, 22, 209, 35, P.rojoS);
  for (let x = 50; x < 208; x += 34) { disco(x + 8, 27, 3, P.amar); pset(x + 7, 26, P.tira); rect(x + 14, 26, x + 24, 27, P.rojoL); }
  // el «24» rojo de neón sobre la puerta, en su caja oscura
  rect(18, 23, 44, 33, C.k); rect(19, 24, 43, 32, hex('#2a1a1e')); R.numero('24', 31, 32, { color: hex('#ff4a3a'), centro: true, sombra: false });
  // ── LAS PUERTAS: el marco de aluminio y el sensor (el cristal y lo de fuera se pintan en cada fotograma)
  rect(6, 38, 60, 104, P.aceroD); rect(7, 39, 59, 41, P.acero); rect(7, 39, 59, 39, P.aceroL); rect(6, 38, 6, 104, P.aceroS);
  rect(26, 36, 40, 38, P.aceroS); rect(27, 37, 39, 37, P.aceroD);
  // la alfombrilla con sus estrías, en perspectiva
  poligono([[4, 105], [62, 105], [66, 115], [0, 115]], P.zocalo); for (let x = 6; x < 64; x += 3) linea(x, 106, x + Math.round((x - 33) / 9), 114, P.goma);
  // ── LAS CINCO NEVERAS: el cajón con el panel azul iluminado, el interior con sus baldas y las botellas
  rect(64, 36, 208, 101, P.nevS);
  for (let d = 0; d < 5; d++) {
    const x0 = 66 + d * 28, x1 = x0 + 26;
    rect(x0, 37, x1, 43, P.azulP); rect(x0, 37, x1, 37, P.azulPL); rect(x0, 43, x1, 43, hex('#1a4a8a'));
    // el pictograma de cada puerta: un copo, una botella, una gota, una lata, un vaso
    const cx = x0 + 13; if (d === 0) { linea(cx - 2, 40, cx + 2, 40, P.tira); linea(cx, 38, cx, 42, P.tira); pset(cx - 1, 39, P.tira); pset(cx + 1, 41, P.tira); pset(cx + 1, 39, P.tira); pset(cx - 1, 41, P.tira); }
    else if (d === 1) { rect(cx - 1, 40, cx + 1, 42, P.tira); pset(cx, 39, P.tira); pset(cx, 38, P.tira); }
    else if (d === 2) { pset(cx, 38, P.tira); rect(cx - 1, 39, cx + 1, 41, P.tira); rect(cx - 2, 40, cx + 2, 41, P.tira); }
    else if (d === 3) { rect(cx - 1, 38, cx + 1, 42, P.tira); pset(cx, 40, P.azulP); }
    else { poligono([[cx - 2, 38], [cx + 2, 38], [cx + 1, 42], [cx - 1, 42]], P.tira); }
    // el interior con la luz fría: más claro arriba, junto al tubo
    d_degr(R, x0, 44, x1, 96, [P.nevLuz, P.nevF, P.nevFS]);
    for (let s = 0; s < 5; s++) {
      const yb = 54 + s * 10; rect(x0, yb, x1, yb, P.aceroS); rect(x0, yb + 1, x1, yb + 1, P.nevFS);
      for (let i = 0; i < 8; i++) {
        const bx = x0 + 1 + i * 3 + (s % 2), r = h(i + d * 9, s, 430), c = d_BOT[(d * 3 + Math.floor(h(i, s + d * 7, 431) * 3)) % d_BOT.length];
        if (bx + 1 > x1) continue;
        if (d === 4 || r < 0.25) { rect(bx, yb - 5, bx + 1, yb - 1, c[0]); rect(bx + 1, yb - 5, bx + 1, yb - 1, c[1]); rect(bx, yb - 5, bx + 1, yb - 5, P.aceroL); pset(bx, yb - 3, P.tira); }   // latas
        else if (d === 3 && r < 0.7) { rect(bx, yb - 7, bx + 2, yb - 1, P.tira); rect(bx + 2, yb - 7, bx + 2, yb - 1, P.nevFS); rect(bx, yb - 8, bx + 1, yb - 8, c[0]); pset(bx + 1, yb - 4, c[0]); }   // garrafas de leche
        else { rect(bx, yb - 7, bx + 1, yb - 1, c[0]); pset(bx + 1, yb - 6, c[1]); rect(bx + 1, yb - 4, bx + 1, yb - 1, c[1]); pset(bx, yb - 8, C.blanco); pset(bx, yb - 4, P.tira); pset(bx, yb - 6, d_mez(c[0], C.blanco, 0.5)); }   // botellas
      }
    }
    // el cristal: dos reflejos en diagonal, la escarcha de abajo, el marco, el tirador y la rejilla del pie
    for (let y = 45; y < 95; y++) { const xr = x0 + 4 + ((96 - y) >> 1) % 22; if (xr < x1 - 1) { pset(xr, y, d_mez(R.pget(xr, y), C.blanco, 0.55)); pset(xr + 1, y, d_mez(R.pget(xr + 1, y), C.blanco, 0.35)); } }
    for (let x = x0; x <= x1; x++) { const hy = 92 + Math.floor(h(x, d, 432) * 4); for (let y = hy; y <= 96; y++) if ((x + y) % 2 === 0) pset(x, y, P.nevLuz); }
    rect(x0 - 2, 44, x0 - 1, 97, P.nev); rect(x0 - 2, 44, x0 - 2, 97, P.nevL);
    rect(x1 - 3, 60, x1 - 2, 80, P.aceroL); rect(x1 - 2, 60, x1 - 2, 80, P.aceroS); pset(x1 - 3, 59, P.aceroD); pset(x1 - 3, 81, P.aceroD);
    rect(x0, 97, x1, 100, P.nev); for (let x = x0 + 1; x < x1; x += 2) rect(x, 98, x, 99, P.nevS);
  }
  rect(206, 44, 208, 101, P.nev); rect(64, 101, 208, 101, P.nevS);
  // ── la pared de la derecha: el reloj, el espejo convexo, la encimera con la máquina de granizados, los vasos, la
  // cafetera, el expositor de lotería y el extintor
  // el espejo convexo de seguridad, con la tienda deformada dentro
  linea(258, 14, 258, 19, P.aceroD); disco(258, 27, 8, P.aceroD); disco(258, 27, 7, hex('#b8c4cc'));
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d > 6.5) continue; const c = j > 2 ? P.suelo2 : j > -1 ? (i < -1 ? P.nevF : i > 2 ? P.rojo : P.pared) : P.techo; if ((i + j) % 2 === 0 || d < 4) pset(258 + i, 27 + j, d_mez(c, hex('#a8b4bc'), 0.35)); }
  disco(255, 24, 1, C.blanco); pset(257, 23, C.blanco);
  // el extintor
  rect(211, 84, 213, 86, C.k); rect(209, 86, 215, 98, C.k); rect(210, 87, 214, 97, P.rojo); rect(210, 87, 210, 97, P.rojoL); rect(212, 83, 216, 84, C.k);
  // la encimera del fondo: muebles con puertas de vetas y tiradores, y el canto
  rect(218, 72, 319, 75, P.lamin); rect(218, 72, 319, 72, C.blanco); rect(218, 75, 319, 75, P.laminD);
  rect(218, 76, 319, 99, P.madera);
  for (let x = 220; x < 318; x += 20) { rect(x, 78, x + 17, 97, P.maderaS); rect(x + 1, 79, x + 16, 96, P.madera); for (let k = 0; k < 6; k++) { const vx = x + 2 + Math.floor(h(k, x, 433) * 14); linea(vx, 80, vx + (k % 2), 95, P.maderaL); } rect(x + 14, 85, x + 14, 89, P.aceroL); }
  // los vasos apilados, de tres tamaños
  for (const [x, n] of [[244, 7], [249, 5]]) for (let k = 0; k < n; k++) { const y = 71 - k * 2; rect(x, y - 1, x + 3, y, k === n - 1 ? C.blanco : P.tira); pset(x + 3, y, P.gondS); }
  // la cafetera (cuerpo negro con su panel) y sus dos placas
  rect(254, 46, 278, 71, C.k); rect(255, 47, 277, 52, P.aceroD); rect(256, 48, 260, 49, P.aceroL); rect(255, 53, 277, 54, P.aceroS);
  for (const x of [257, 268]) { rect(x, 68, x + 7, 71, P.aceroD); rect(x, 68, x + 7, 68, P.aceroS); }
  // el expositor de lotería: la vitrina con los rollos de boletos de colores (sin letras: rayas y cifras)
  rect(282, 48, 318, 70, C.k); rect(283, 49, 317, 69, hex('#2a3040'));
  for (let k = 0; k < 6; k++) { const x = 284 + k * 6, c = d_BOT[(k * 2 + 1) % d_BOT.length]; rect(x, 50, x + 4, 68, c[0]); for (let y = 52; y < 68; y += 3) rect(x, y, x + 4, y, c[1]); rect(x + 1, 50, x + 1, 68, d_mez(c[0], C.blanco, 0.4)); }
  rect(283, 49, 317, 49, P.aceroS);
  // ── EL SUELO de vinilo en perspectiva (la cámara mira desde arriba): baldosas en damero que se abren hacia abajo
  {
    const filas = []; let yy = 104; for (let n = 0; yy < 180; n++) { filas.push(Math.round(yy)); yy += 7 + n * 1.6; }
    for (let y = 104; y < 180; y++) {
      const e = (y + 220) / 324; let fi = 0; while (fi < filas.length - 1 && y >= filas[fi + 1]) fi++;
      const linea_ = filas.includes(y);
      let pc = null;
      for (let x = 0; x < 320; x++) { const col = Math.floor((160 + (x - 160) / e) / 22); pset(x, y, linea_ || (pc !== null && col !== pc) ? P.junta : (col + fi) % 2 ? P.suelo : P.suelo2); pc = col; }
    }
    // marcas de suelas y motas del vinilo
    for (let k = 0; k < 260; k++) { const x = Math.floor(h(k, 6, 434) * 320), y = 105 + Math.floor(h(k, 7, 434) * 74); pset(x, y, h(k, 8, 434) > 0.6 ? P.sombra : P.brillo); }
    for (let k = 0; k < 10; k++) { const x = 70 + Math.floor(h(k, 9, 434) * 150), y = 150 + Math.floor(h(k, 10, 434) * 26); linea(x, y, x + 3 + (k % 4), y + (k % 2), P.sombraD); }
    // el reflejo azulado de las neveras y el brillo de los plafones en el encerado
    for (let y = 104; y < 128; y++) for (let x = 66; x < 206; x++) if ((x + y * 3) % (y < 114 ? 2 : 4) === 0 && (x - 66) % 28 < 25) pset(x, y, P.azulRef);
    for (const [xc, yc] of [[200, 112], [246, 112], [96, 126], [150, 160], [40, 128]]) for (let j = -4; j <= 4; j++) for (let i = -14; i <= 14; i++) { const d = (i / 14) ** 2 + (j / 4) ** 2; if (d < 1 && (i + j) % 2 === 0 && h(i, j, xc) > d * 0.8) pset(xc + i, yc + j, P.brillo); }
  }
  // ── LA GÓNDOLA de las patatas fritas, en medio: la tapa (se ve desde arriba) con cajas, el lateral y tres baldas
  {
    const x0 = 116, x1 = 210;
    // la sombra en el suelo
    for (let y = 146; y < 152; y++) for (let x = x0 - 2; x < x1 + 6; x++) if ((x + y) % 2 === 0 || y < 148) pset(x, y, P.sombra);
    // la tapa, en escorzo, con cajas de chicles y paquetes encima
    poligono([[x0 - 4, 112], [x1 + 2, 112], [x1 - 2, 104], [x0, 104]], P.gond); rect(x0 - 4, 112, x1 + 2, 113, P.gondS); linea(x0, 104, x1 - 2, 104, P.tira);
    for (let k = 0; k < 9; k++) { const bx = x0 + 4 + k * 10, c = d_BOLSA[k % d_BOLSA.length]; rect(bx, 105 + (k % 2), bx + 6, 110, c[1]); rect(bx, 105 + (k % 2), bx + 6, 106 + (k % 2), c[0]); pset(bx + 1, 105 + (k % 2), d_mez(c[0], C.blanco, 0.5)); }
    // el lateral izquierdo, más oscuro
    poligono([[x0 - 4, 113], [x0, 113], [x0, 146], [x0 - 4, 147]], P.gondD); linea(x0 - 4, 113, x0 - 4, 147, C.k);
    // el fondo perforado y las baldas
    rect(x0, 113, x1, 146, P.gondS); for (let y = 115; y < 146; y += 3) for (let x = x0 + 2; x < x1; x += 4) pset(x, y, P.gondD);
    for (let s = 0; s < 3; s++) {
      const yb = 122 + s * 12;
      for (let bx = x0 + 2 + (s === 1 ? 3 : 0), i = 0; ; i++) {
        const c = d_BOLSA[Math.floor(h(i, s, 435) * d_BOLSA.length)], w = 6 + Math.floor(h(i, s, 438) * 4), alto = 7 + Math.floor(h(i, s, 436) * 3);
        if (bx + w > x1 - 1) break;
        d_bolsa(R, bx, yb - alto, w, alto, c); if (h(i, s, 439) > 0.7) { R.pset(bx + w - 1, yb - alto, P.gondS); R.pset(bx, yb - alto + 1, c[1]); }
        bx += w + (h(i, s, 440) > 0.8 ? 2 : 1);
      }
      // la tira de precios con sus etiquetas
      rect(x0, yb, x1, yb + 1, P.tira); rect(x0, yb + 2, x1, yb + 2, P.gondD);
      for (let x = x0 + 4; x < x1 - 4; x += 16) { rect(x, yb, x + 4, yb + 1, h(x, s, 437) > 0.6 ? P.amar : C.blanco); pset(x + 1, yb, P.rojo); }
    }
    rect(x0, 146, x1, 147, P.gondD);
  }
  // ── el arcón de helados abajo a la izquierda (desde arriba: las tapas de cristal y las cajas de colores)
  {
    poligono([[0, 140], [44, 140], [48, 152], [0, 152]], P.tira); rect(0, 152, 48, 176, P.gondS); rect(0, 152, 48, 153, C.blanco); rect(0, 174, 48, 176, P.gondD);
    for (let k = 0; k < 7; k++) { const bx = 2 + k * 6, c = d_BOT[(k * 5) % d_BOT.length]; rect(bx, 142, bx + 4, 150, c[0]); rect(bx, 148, bx + 4, 150, c[1]); pset(bx + 1, 143, d_mez(c[0], C.blanco, 0.5)); }
    for (let y = 141; y < 151; y++) for (let x = 0; x < 46; x++) if ((x + y) % 7 === 0) pset(x, y, P.nevLuz);
    linea(23, 140, 25, 152, P.aceroS); rect(18, 160, 30, 164, P.azulP); rect(18, 160, 30, 160, P.azulPL); pset(24, 162, C.blanco);
    for (let x = 4; x < 46; x += 4) rect(x, 168, x + 1, 172, P.gondD);
  }
  // las cestas apiladas junto a la puerta
  for (let x = 66; x < 90; x++) for (let y = 126; y < 129; y++) if ((x + y) % 2 === 0) pset(x, y, P.sombraD);
  for (let k = 0; k < 4; k++) { const y = 126 - k * 3; rect(68, y - 5, 86, y, C.k); rect(69, y - 4, 85, y - 1, P.rojo); rect(69, y - 4, 85, y - 4, P.rojoL); for (let x = 71; x < 85; x += 3) { pset(x, y - 2, P.rojoS); pset(x, y - 1, P.rojoS); } }
  rect(70, 110, 71, 114, C.k); rect(83, 110, 84, 114, C.k); rect(70, 109, 84, 109, C.k); rect(71, 109, 83, 109, P.aceroS);
  // la sombra de la pared en el suelo
  for (let x = 0; x < 320; x++) if (x % 2 === 0) pset(x, 104, P.sombra);
  // el cartel amarillo de suelo mojado (un monigote que resbala) y su charquito
  for (let j = -2; j <= 2; j++) for (let i = -12; i <= 12; i++) if ((i / 12) ** 2 + (j / 2) ** 2 < 1 && (i + j) % 2 === 0) pset(98 + i, 136 + j, P.azulRef);
  poligono([[92, 136], [97, 116], [99, 116], [104, 136]], C.k); poligono([[93, 135], [97, 117], [99, 117], [103, 135]], P.amar); rect(95, 124, 101, 124, P.amarS);
  disco(98, 127, 1, C.k); linea(98, 128, 97, 131, C.k); linea(97, 131, 95, 133, C.k); linea(97, 131, 100, 133, C.k); linea(96, 129, 100, 128, C.k);
}

// una bolsa de patatas en x, y (arriba a la izquierda), de w × hh: almohada con los pliegues de arriba y abajo, el brillo,
// la franja y el óvalo del dibujo (sin letras)
function d_bolsa(R, x, y, w, hh, c) {
  const { rect, pset } = R;
  rect(x, y + 1, x + w - 1, y + hh - 2, c[0]); rect(x + 1, y, x + w - 2, y + hh - 1, c[0]);
  for (let i = 0; i < w; i += 2) { pset(x + i, y, c[1]); pset(x + i, y + hh - 1, c[1]); }
  rect(x + w - 1, y + 2, x + w - 1, y + hh - 3, c[1]); rect(x + 1, y + 2, x + 1, y + hh - 4, d_mez(c[0], C.blanco, 0.4));
  const cy = y + (hh >> 1); rect(x + 2, cy - 1, x + w - 3, cy + 1, c[2]); pset(x + 3, cy, c[1]);
  rect(x + 1, y + hh - 3, x + w - 2, y + hh - 3, d_mez(c[0], c[1], 0.5));
}

// ══ la tienda (general): lo que se mueve ══
function d_tiendaGeneral(R, t, o) {
  const P = d_P, { rect, pset, disco, linea, poligono } = R;
  R.copiar(d_capa(R, 'tienda', () => d_tiendaFija(R)));
  // los plafones: el de la derecha tiembla de vez en cuando
  for (const [x, k] of [[182, 0], [228, 1]]) {
    const off = k === 1 && (t % 6.1) < 0.8 && Math.sin(t * 37) > -0.2;
    rect(x - 1, 8, x + 31, 13, P.marcoT); rect(x, 9, x + 30, 12, off ? P.tuboOff : P.tubo); if (!off) rect(x + 1, 11, x + 29, 11, P.tuboS);
    if (!off) for (let y = 14; y < 22; y++) for (let xx = x - (y - 14); xx < x + 31 + (y - 14); xx++) if ((xx + y) % 3 === 0) pset(xx, y, P.paredL);
  }
  // una polilla que ronda el plafón
  { const a = t * 3.1, px = Math.round(198 + Math.cos(a) * 14 + Math.sin(a * 2.3) * 3), py = Math.round(19 + Math.sin(a * 1.7) * 4); pset(px, py, hex('#6a5a4a')); if (Math.sin(t * 40) > 0) { pset(px - 1, py - 1, hex('#8a7a6a')); pset(px + 1, py - 1, hex('#8a7a6a')); } }
  // la luz de la cuarta nevera que tiembla: se oscurece a ratos
  if ((t % 4.7) < 0.5 && Math.sin(t * 29) > 0) for (let y = 44; y < 92; y++) for (let x = 150 + (y & 1); x < 176; x += 2) pset(x, y, d_mez(R.pget(x, y), P.nevS, 0.35));
  // el reloj de pared: marca la hora de la cctv
  {
    const cx = 230, cy = 28; disco(cx, cy, 7, C.k); disco(cx, cy, 6, C.blanco); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), P.gondD); }
    const s0 = (typeof o.hora === 'number' ? o.hora : 3 * 3600 + 41 * 60 + 7) + t, ah = (s0 / 43200) * 2 * Math.PI - Math.PI / 2, am = (s0 / 3600) * 2 * Math.PI - Math.PI / 2, as = Math.floor(s0) / 60 * 2 * Math.PI - Math.PI / 2;
    linea(cx, cy, cx + Math.round(Math.cos(ah) * 3), cy + Math.round(Math.sin(ah) * 3), C.k); linea(cx, cy, cx + Math.round(Math.cos(am) * 5), cy + Math.round(Math.sin(am) * 5), C.k); linea(cx, cy, cx + Math.round(Math.cos(as) * 5), cy + Math.round(Math.sin(as) * 5), P.rojo);
  }
  // la máquina de granizados: dos cubas transparentes (roja y azul) con la espiral que gira y el panel de luz
  {
    rect(218, 42, 244, 45, P.amar); rect(218, 42, 244, 42, hex('#f8d870')); rect(218, 62, 244, 71, P.aceroS); rect(218, 62, 244, 62, P.aceroL); rect(220, 69, 242, 71, P.aceroD);
    for (const [x, c, cs] of [[219, hex('#e83a4a'), hex('#a8202e')], [232, hex('#3a7ae8'), hex('#1e4aa8')]]) {
      rect(x, 46, x + 11, 61, hex('#c8dce4')); rect(x, 50, x + 11, 61, c); for (let y = 51; y < 61; y++) if (y % 2) pset(x + 10, y, cs);
      for (let y = 51; y < 61; y++) { const ph = t * 6 + y * 0.9 + x, sx = Math.round(x + 5.5 + Math.sin(ph) * 4); pset(sx, y, Math.cos(ph) > 0 ? C.blanco : cs); }
      rect(x, 46, x, 61, C.blanco); rect(x + 5, 62, x + 6, 66, P.aceroD); rect(x + 4, 66, x + 7, 67, C.k);
    }
  }
  // las dos jarras de café sobre sus placas (una luz roja) y el vapor que sube
  for (const x of [258, 269]) { rect(x, 58, x + 5, 67, C.k); rect(x + 1, 60, x + 4, 66, P.cafe); rect(x + 1, 59, x + 4, 59, hex('#c8d8e0')); pset(x + 1, 61, P.cafeL); rect(x + 6, 61, x + 6, 64, C.k); pset(x - 1, 69, Math.floor(t * 2 + x) % 3 ? hex('#ff3a2a') : hex('#8a1a1a'));
    for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k * 0.25 + x * 0.01) % 1), py = Math.round(57 - u * 14), px = Math.round(x + 2 + Math.sin(t * 2 + k + u * 5) * 2); if ((k + Math.floor(t * 4)) % 3) pset(px, py, d_mez(P.pared, C.blanco, 0.7 - u * 0.5)); } }
  // EL CARTEL «$2» colgado sobre la góndola, que se mece
  { const sw = Math.round(Math.sin(t * 0.8) * 1.5); linea(156, 84, 156 + sw, 92, P.aceroD); linea(176, 84, 176 + sw, 92, P.aceroD);
    rect(150 + sw, 92, 182 + sw, 103, C.k); rect(151 + sw, 93, 181 + sw, 102, P.amar); rect(151 + sw, 93, 181 + sw, 93, hex('#f8d870')); rect(151 + sw, 102, 181 + sw, 102, P.amarS);
    R.numero('$2', 166 + sw, 101, { color: P.rojo, centro: true, sombra: false }); }
  // ── LO DE FUERA, solo por el cristal: la noche, la marquesina con sus luces, el surtidor, el coche que reposta y la
  // carretera con los coches que pasan
  {
    const CL = [9, 42, 57, 103], rc = (x0, y0, x1, y1, c) => d_rect(R, CL, x0, y0, x1, y1, c); R.recorte(CL);
    d_degr(R, 9, 42, 57, 66, [P.noche1, P.noche2, P.noche3]);
    for (let k = 0; k < 6; k++) { const x = 10 + Math.floor(h(k, 1, 440) * 46), y = 43 + Math.floor(h(k, 2, 440) * 6); if (Math.sin(t * 2 + k * 3) > -0.5) pset(x, y, hex('#c8d0f0')); }
    // los árboles oscuros y la carretera con sus coches
    for (let x = 9; x < 58; x++) { const hy = 62 - Math.floor(h(x >> 2, 3, 440) * 6) - Math.round(Math.sin(x * 0.4) * 1.5); rc(x, hy, x, 70, hex('#0a1418')); }
    rc(9, 70, 57, 75, P.asfS); for (let x = 9; x < 58; x += 6) rc(x, 72, x + 2, 72, P.horm);
    { const u = (t % 5) / 5, cx = Math.round(-10 + u * 80); rc(cx, 69, cx + 9, 72, hex('#1a1a24')); pset(cx + 9, 71, hex('#fff2b0')); for (let i = 1; i < 8; i++) if (i % 2) pset(cx + 9 + i, 71, hex('#c8b870')); pset(cx, 71, hex('#ff3a2a')); }
    { const u = ((t + 2.3) % 7) / 7, cx = Math.round(70 - u * 84); rc(cx, 71, cx + 8, 74, hex('#2a2a3a')); pset(cx, 73, hex('#fff2b0')); pset(cx + 8, 73, hex('#ff3a2a')); }
    // el hormigón iluminado de la gasolinera con sus manchas
    rc(9, 76, 57, 103, P.horm); for (let k = 0; k < 40; k++) pset(9 + Math.floor(h(k, 4, 440) * 48), 77 + Math.floor(h(k, 5, 440) * 26), h(k, 6, 440) > 0.5 ? P.hormL : P.hormS);
    for (const [x, y, r] of [[18, 98, 3], [44, 100, 2]]) { disco(x, y, r, P.hormS); pset(x - 1, y - 1, hex('#6a5a7a')); }
    for (let y = 76; y < 103; y++) for (let x = 9; x < 58; x++) if ((x + y) % 3 === 0 && Math.abs(x - 30) < 10 + (y - 76) * 0.6) pset(x, y, P.hormL);
    // la isleta y el surtidor: la carcasa roja y blanca, la pantalla con las cifras que corren, la manguera
    rc(14, 92, 44, 96, P.hormL); rc(14, 92, 44, 92, P.amar); rc(14, 96, 44, 96, P.hormS);
    rc(26, 66, 38, 92, C.k); rc(27, 67, 37, 91, C.blanco); rc(27, 67, 37, 70, P.rojo); rc(27, 85, 37, 91, P.rojoS); rc(28, 72, 36, 77, hex('#0e1a12'));
    { const n = Math.floor(t * 7) % 10, m = Math.floor(t * 0.7) % 10; rc(29, 73, 29 + n % 4, 73, hex('#5aff8a')); rc(29, 75, 29 + m % 6, 75, hex('#5aff8a')); }
    rc(30, 79, 34, 82, P.acero); pset(31, 80, C.k); linea(37, 78, 41, 84, C.k); linea(41, 84, 42, 92, C.k); linea(38, 78, 42, 84, P.aceroD);
    // el coche que reposta, con la luz de la marquesina en el techo
    d_coche(R, 44, 99, 1, [hex('#2a4a8a'), hex('#1a2e5a'), hex('#6a8ad0')], 1, {});
    // la marquesina: el canto con su franja roja y la panza blanca con las luces y sus conos
    rc(9, 46, 57, 49, P.rojo); rc(9, 46, 57, 46, P.rojoL); rc(9, 50, 57, 53, hex('#dfe2e6')); rc(9, 53, 57, 53, P.aceroS); rc(22, 54, 24, 92, P.aceroL); rc(24, 54, 24, 92, P.aceroS);
    for (const x of [12, 30, 48]) { rc(x, 52, x + 6, 53, C.blanco); for (let y = 54; y < 70; y++) for (let xx = x - (y - 54) / 3; xx < x + 7 + (y - 54) / 3; xx++) if ((Math.round(xx) + y) % 3 === 0) pset(Math.round(xx), y, hex('#e8ecd8')); }
    // las polillas en las luces
    for (let k = 0; k < 5; k++) { const a = t * (3 + k) + k * 2, px = Math.round(15 + (k % 3) * 18 + Math.cos(a) * 3), py = Math.round(56 + Math.sin(a * 1.3) * 2); pset(px, py, hex('#d8d0b0')); }
    R.recorte(null);
  }
  // las dos hojas de cristal, que se abren hacia los lados: reflejos, la franja de puntos y los cantos de aluminio
  {
    const ab = Math.round(Math.max(0, Math.min(1, o.puerta ?? 0)) * 22);
    for (const [a, b] of [[9 - ab, 32 - ab], [34 + ab, 57 + ab]]) {
      const xa = Math.max(9, a), xb = Math.min(57, b); if (xb < xa) continue;
      for (let y = 42; y < 104; y++) { for (const dx of [0, 9]) { const xs = a + 3 + dx + ((104 - y) >> 2) % 6; if (xs >= xa && xs <= xb && y % 2) pset(xs, y, d_mez(R.pget(xs, y), C.blanco, 0.45)); } }
      for (let x = xa; x <= xb; x += 2) pset(x, 80, P.tira);
      if (a >= 9) rect(a, 42, a, 103, P.aceroL); if (b <= 57) rect(b, 42, b, 103, P.acero);
    }
    rect(8, 42, 8, 103, P.aceroD); rect(58, 42, 58, 103, P.aceroD); rect(7, 103, 59, 104, P.aceroS);
    pset(33, 38, ab > 0 ? hex('#5aff6a') : hex('#ff3a2a'));
  }
}

// ══ la tienda (pasillo): perspectiva a ras de suelo con punto de fuga en (160, 120) ══
// cada columna de las baldas de la izquierda está a la distancia z = 160 / (160 − x) (z = 1 en el borde); las alturas del
// mundo (Y, hacia abajo desde el ojo) se ven en y = 120 + Y / z
const d_VF = [160, 120];

function d_pasilloFijo(R) {
  const P = d_P, { rect, pset, disco, linea } = R, [vx, vy] = d_VF, zF = 1 / 0.36;
  // el techo: placas en perspectiva con sus juntas
  for (let y = 0; y < 120; y++) { const zz = 130 / Math.max(1, vy - y);
    for (let x = 0; x < 320; x++) { const X = (x - vx) * zz / 160 * 2, f = Math.floor(zz * 2.2); pset(x, y, (Math.abs(X * 1.6 - Math.round(X * 1.6)) < 0.06 * zz) || (zz * 2.2 - f) < 0.08 * zz ? P.techoS : P.techo); } }
  // el suelo encerado: baldosas en perspectiva que reflejan
  for (let y = 121; y < 180; y++) { const zz = 60 / (y - vy);
    for (let x = 0; x < 320; x++) { const X = (x - vx) * zz / 160 * 2.5, gx = X - Math.floor(X), gz = zz * 3 - Math.floor(zz * 3), j = (gx < 0.05 * zz + 0.02) || (gz < 0.05 * zz + 0.02);
      pset(x, y, j ? P.junta : ((Math.floor(X) + Math.floor(zz * 3)) % 2 ? P.suelo : P.suelo2)); } }
  // el fondo del pasillo: las neveras encendidas de la pared de enfrente
  const fx0 = Math.round(vx - 160 / zF), fx1 = Math.round(vx + 160 / zF), fy0 = Math.round(vy - 90 / zF), fy1 = Math.round(vy + 60 / zF);
  rect(fx0, fy0 - 6, fx1, fy1, P.pared); rect(fx0, fy0 - 2, fx1, fy0 + 2, P.rojo); rect(fx0, fy0 + 3, fx1, fy0 + 3, P.amar);
  for (let d = 0; d < 6; d++) { const x0 = fx0 + 3 + d * 18, x1 = x0 + 15; if (x1 > fx1 - 2) break; rect(x0 - 1, fy0 + 6, x1 + 1, fy1 - 3, P.nevS); d_degr(R, x0, fy0 + 7, x1, fy1 - 4, [P.nevLuz, P.nevF, P.nevFS]);
    for (let s = 0; s < 4; s++) { const yb = fy0 + 14 + s * 9; rect(x0, yb, x1, yb, P.aceroS); for (let i = 0; i < 7; i++) { const c = d_BOT[(i + d * 2 + s) % d_BOT.length]; rect(x0 + 1 + i * 2, yb - 4, x0 + 1 + i * 2, yb - 1, c[0]); } }
    rect(x1 - 2, fy0 + 20, x1 - 2, fy0 + 30, P.aceroL); }
  rect(fx0, fy1 - 2, fx1, fy1, P.zocalo);
  // las baldas de los dos lados, columna a columna
  for (const lado of [-1, 1]) {
    for (let x = lado < 0 ? 0 : 319; lado < 0 ? x < fx0 : x > fx1; x -= lado) {
      const s = Math.abs(x - vx) / 160, z = 1 / s, TOP = lado < 0 ? 92 : 70, LV = (50 + TOP) / 4, top = Math.round(vy - TOP * s), base = Math.round(vy + 58 * s);
      const u = z * 5, idx = Math.floor(u), fu = u - idx, borde = fu < 0.1 || (z > 2 && fu < 0.2), poste = Math.floor(z * 5) % 6 === 0 && fu < 0.18;
      for (let y = Math.max(0, top - 6); y <= Math.min(179, base); y++) {
        const Y = (y - vy) / s;   // la altura del mundo
        let c;
        if (Y < -TOP) c = y < top - 2 ? P.gondD : P.gond;   // el remate de arriba
        else if (Y > 50) c = Y > 55 ? P.gondD : P.gondS;   // el zócalo
        else {
          const lv = Math.floor((Y + TOP) / LV), y0 = -TOP + lv * LV, v = (Y - y0) / LV;
          if (v > 0.9) c = v > 0.95 ? P.gondD : (Math.floor(u * 3) % 4 === 0 ? P.amar : P.tira);   // la tira de precios
          else if (poste) c = P.gondD;
          else if (v < 0.18) c = P.gondS;   // el hueco de arriba de cada balda
          else if (lado < 0) { const b = d_BOLSA[Math.floor(h(idx, lv, 441) * d_BOLSA.length)], vv = (v - 0.18) / 0.72;
            c = borde ? b[1] : vv < 0.07 || vv > 0.95 ? b[1] : Math.abs(vv - 0.5) < 0.1 ? b[2] : fu < 0.35 && vv < 0.8 ? d_mez(b[0], C.blanco, 0.35) : b[0]; }
          else { const b = d_BOT[Math.floor(h(idx, lv, 442) * d_BOT.length)], lata = h(idx, lv, 443) > 0.55, vv = (v - 0.18) / 0.72, sub = (u * 3) % 1;
            if (lata) c = vv < 0.45 ? P.gondS : sub < 0.15 ? b[1] : vv < 0.5 ? P.aceroL : Math.abs(vv - 0.75) < 0.06 ? C.blanco : b[0];
            else c = sub < 0.25 || sub > 0.85 ? P.gondS : vv < 0.1 ? C.blanco : vv < 0.35 ? (sub > 0.45 && sub < 0.65 ? b[0] : P.gondS) : Math.abs(vv - 0.62) < 0.08 ? P.tira : sub < 0.45 ? d_mez(b[0], C.blanco, 0.3) : b[0]; }
        }
        pset(x, y, c);
      }
      // el canto de la estantería contra el pasillo
      pset(x, top - 6, C.k);
    }
  }
  // el reflejo de las baldas y de las luces en el encerado
  for (let y = 121; y < 180; y++) { const s = (y - vy) / 58; for (let x = 0; x < 320; x++) { const sx = Math.abs(x - vx) / 160; if (sx <= s * 0.98 || sx < 0.36) continue; const ym = Math.round(vy + 58 * sx - (y - (vy + 58 * sx)) * 0.6); if ((x + y) % 2 === 0 && ym > 0) pset(x, y, d_mez(R.pget(x, y), R.pget(x, Math.max(0, Math.round(vy + 58 * sx - (y - vy - 58 * sx) * 2.2))), 0.3)); } }
  for (let y = 121; y < 180; y++) { const w = (y - vy) / 7; for (let x = Math.round(vx - w); x <= vx + w; x++) if ((x + y) % 2 === 0 && h(x, y, 444) > 0.35) pset(x, y, d_mez(R.pget(x, y), P.brillo, 0.6)); }
  // el cajón de cartón de la derecha, lleno de bolsas
  rect(198, 134, 242, 152, P.bolsaPS); rect(199, 135, 241, 151, P.bolsaP); rect(199, 135, 241, 136, P.bolsaPL); for (let x = 202; x < 240; x += 9) rect(x, 140, x + 5, 147, P.bolsaPS);
  rect(204, 142, 236, 144, P.rojo); R.numero('$1', 220, 151, { color: C.blanco, centro: true, sombra: false, fina: true });
  for (let k = 0; k < 7; k++) { const c = d_BOLSA[(k * 3) % d_BOLSA.length]; d_bolsa(R, 198 + k * 6, 124 + (k % 2) * 3, 8, 11, c); }
  for (let x = 196; x < 246; x++) for (let y = 153; y < 156; y++) if ((x + y) % 2 === 0) pset(x, y, P.sombraD);
}

function d_pasillo(R, t, o) {
  const P = d_P, { rect, pset, disco, linea } = R, [vx, vy] = d_VF;
  R.copiar(d_capa(R, 'pasillo', () => d_pasilloFijo(R)));
  // los plafones en fila hacia el fondo; el tercero tiembla
  for (let k = 0; k < 5; k++) {
    const z = 1.35 + k * 0.42, s = 1 / z, y = Math.round(vy - 130 * s), w = Math.round(22 * s), hh = Math.max(1, Math.round(5 * s)), off = k === 2 && (t % 5.3) < 0.7 && Math.sin(t * 33) > 0;
    rect(vx - w - 1, y - 1, vx + w + 1, y + hh, P.marcoT); rect(vx - w, y, vx + w, y + hh - 1, off ? P.tuboOff : P.tubo);
  }
  // la cámara-cúpula del techo con su luz roja
  disco(206, 30, 4, P.aceroD); disco(206, 31, 3, hex('#1a1e24')); pset(205, 30, P.aceroL); if (Math.floor(t * 1.4) % 2) pset(207, 32, hex('#ff3a2a'));
  // el cartel del pasillo con su «4», colgado de dos cadenas, que se mece
  { const sw = Math.round(Math.sin(t * 0.7) * 1.5); linea(150, 22, 150 + sw, 34, P.aceroD); linea(170, 22, 170 + sw, 34, P.aceroD);
    rect(142 + sw, 34, 178 + sw, 50, C.k); rect(143 + sw, 35, 177 + sw, 49, P.azulP); rect(143 + sw, 35, 177 + sw, 35, P.azulPL);
    R.numero('4', 152 + sw, 47, { color: C.blanco, centro: true, sombra: false }); rect(160 + sw, 39, 162 + sw, 45, P.rojo); disco(170 + sw, 42, 3, P.amar); pset(169 + sw, 41, C.blanco); }
  // un brillo que recorre el encerado despacio
  { const u = (t * 0.12) % 1, yb = Math.round(124 + u * 56); for (let x = vx - 30; x < vx + 30; x++) if ((x + yb) % 2 === 0) pset(x, yb, d_mez(R.pget(x, yb), C.blanco, 0.4)); }
  // la luz fría del fondo que late un poco (el compresor)
  if (Math.sin(t * 1.9) > 0.6) for (let y = 92; y < 138; y += 2) for (let x = 106 + (y & 2); x < 214; x += 4) pset(x, y, d_mez(R.pget(x, y), P.nevLuz, 0.3));
}

// ══ el autoservicio de noche (general) ══
function d_autoFijo(R) {
  const P = d_P, { rect, pset, disco, linea, poligono } = R;
  // el cielo nocturno tramado y su bruma naranja de la ciudad junto al horizonte
  d_degr(R, 0, 0, 319, 96, [P.noche0, P.noche1, P.noche2, P.noche3, P.noche4, P.brumaN]);
  // el paso elevado lejano con sus pilares y las farolas
  rect(0, 70, 120, 73, hex('#2a2a40')); rect(0, 74, 120, 74, hex('#1a1a2c')); for (let x = 8; x < 120; x += 26) rect(x, 75, x + 3, 96, hex('#22223a'));
  for (let x = 4; x < 120; x += 16) { rect(x, 63, x, 69, hex('#3a3a54')); pset(x + 1, 63, hex('#f8d890')); }
  // las copas oscuras de los árboles al fondo
  for (let x = 0; x < 320; x++) { const hy = 84 - Math.floor(h(x >> 2, 1, 450) * 7) - Math.round(Math.sin(x * 0.21) * 2); rect(x, hy, x, 98, hex('#0e1a22')); if (h(x, 2, 450) > 0.8) pset(x, hy, hex('#1e3038')); }
  // el poste con el panel rojo y la hamburguesa (sin letras)
  rect(96, 40, 99, 98, hex('#3a3a48')); rect(99, 40, 99, 98, hex('#22222e'));
  rect(80, 22, 116, 42, C.k); rect(81, 23, 115, 41, P.rojo); rect(81, 23, 115, 24, P.rojoL); rect(81, 40, 115, 41, P.rojoS);
  { const cx = 98, cy = 32; poligono([[cx - 8, cy - 1], [cx - 6, cy - 5], [cx + 6, cy - 5], [cx + 8, cy - 1]], hex('#e8a040')); rect(cx - 8, cy, cx + 8, cy, hex('#5ac83a')); rect(cx - 8, cy + 1, cx + 8, cy + 2, hex('#6a3a1e')); rect(cx - 7, cy + 3, cx + 7, cy + 5, hex('#e8a040'));
    for (const dx of [-4, 0, 4]) pset(cx + dx, cy - 3, hex('#f8e8c0')); }
  // ── el local: el tejado de tejas, la franja roja y la pared de estuco
  poligono([[118, 66], [130, 52], [319, 52], [319, 66]], P.teja);
  for (let y = 53; y < 66; y += 3) for (let x = 120; x < 320; x++) { const off = Math.floor(y / 3) % 2 ? 2 : 0; if (x < 130 - (y - 52) * 0.9) continue; pset(x, y, (x + off) % 4 === 0 ? P.tejaS : (x + off) % 4 === 1 ? P.tejaL : P.teja); pset(x, y + 1, P.tejaS); }
  rect(118, 66, 319, 69, P.estucoL); rect(118, 69, 319, 69, P.estucoS);
  rect(118, 70, 319, 148, P.estuco);
  for (let k = 0; k < 900; k++) { const x = 118 + Math.floor(h(k, 1, 451) * 202), y = 70 + Math.floor(h(k, 2, 451) * 78); pset(x, y, h(k, 3, 451) > 0.5 ? P.estucoS : P.estucoL); }
  rect(118, 80, 319, 85, P.rojo); rect(118, 80, 319, 80, P.rojoL); rect(118, 85, 319, 85, P.rojoS); rect(118, 86, 319, 86, P.amar);
  rect(118, 140, 319, 148, P.estucoS); for (let x = 118; x < 320; x += 12) rect(x, 141, x, 147, d_mez(P.estucoS, C.k, 0.2));
  // el comedor cerrado: el escaparate con las sillas sobre las mesas y la luz tenue
  rect(248, 92, 316, 136, C.k);
  d_degr(R, 249, 93, 315, 135, [hex('#f2e8c8'), hex('#d8c8a0'), hex('#b8a47c')]);
  for (const x of [256, 278, 300]) { rect(x - 7, 120, x + 7, 121, P.maderaS); rect(x - 1, 122, x, 134, P.aceroD); for (const dx of [-5, 3]) { rect(x + dx, 112, x + dx + 2, 119, P.rojo); rect(x + dx, 116, x + dx + 2, 116, P.rojoS); linea(x + dx, 112, x + dx - 1, 108, P.aceroD); linea(x + dx + 2, 112, x + dx + 3, 108, P.aceroD); } }
  rect(249, 98, 315, 98, hex('#fff4d8')); for (const x of [258, 282, 306]) { rect(x - 2, 93, x + 2, 95, hex('#fff8e0')); }
  for (const x of [270, 293]) rect(x, 93, x + 1, 135, P.aceroS);
  for (let y = 93; y < 136; y++) { const xs = 252 + ((136 - y) >> 1) % 60; if (y % 3 === 0) pset(xs, y, d_mez(R.pget(xs, y), C.blanco, 0.4)); }
  rect(247, 136, 317, 138, P.estucoL);
  // la puerta de servicio de la izquierda, con su tirador y la lámpara
  rect(134, 98, 154, 140, C.k); rect(135, 99, 153, 140, hex('#8a8e94')); for (let y = 104; y < 138; y += 8) rect(136, y, 152, y, hex('#74787e')); rect(149, 118, 151, 120, P.aceroL);
  // el toldo de rayas de la ventanilla y el canto del alféizar
  rect(184, 108, 236, 109, C.k); for (let x = 185; x < 236; x++) { const c = Math.floor((x - 185) / 5) % 2 ? P.amar : P.rojo; rect(x, 109, x, 114, c); pset(x, 115, (x - 185) % 5 < 3 ? c : P.estucoS); } rect(185, 109, 235, 109, d_mez(P.rojo, C.blanco, 0.3));
  for (let y = 116; y < 119; y++) for (let x = 186; x < 236; x++) if ((x + y) % 2 === 0) pset(x, y, P.estucoS);
  rect(186, 116, 234, 117, C.k); rect(186, 140, 234, 143, P.aceroS); rect(186, 140, 234, 140, P.aceroL); rect(186, 143, 234, 143, P.aceroD);
  // el panel del menú: el marco oscuro con sus postes y las seis fotos de comida con su precio
  rect(56, 140, 59, 160, hex('#2a2a34')); rect(78, 140, 81, 160, hex('#2a2a34'));
  rect(40, 86, 96, 141, C.k); rect(41, 87, 95, 140, hex('#2a2a3a'));
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
    const x = 43 + i * 17, y = 89 + j * 25; rect(x, y, x + 15, y + 23, hex('#f4ecd8')); rect(x, y, x + 15, y, C.blanco);
    const cx = x + 7, cy = y + 9, k = i + j * 3;
    if (k === 0 || k === 4) { rect(cx - 5, cy - 3, cx + 5, cy - 1, hex('#e8a040')); rect(cx - 5, cy, cx + 5, cy, hex('#5ac83a')); rect(cx - 5, cy + 1, cx + 5, cy + 2, hex('#6a3a1e')); rect(cx - 5, cy + 3, cx + 5, cy + 4, hex('#e8a040')); pset(cx - 2, cy - 3, hex('#f8e8c0')); }
    else if (k === 1 || k === 5) { rect(cx - 3, cy - 1, cx + 3, cy + 4, P.rojo); for (let f = -3; f <= 3; f += 2) rect(cx + f, cy - 5 + (f & 1), cx + f, cy - 1, hex('#f8d040')); }
    else { rect(cx - 3, cy - 4, cx + 3, cy + 4, hex('#e83a4a')); rect(cx - 3, cy - 4, cx + 3, cy - 4, C.blanco); linea(cx + 1, cy - 8, cx + 1, cy - 4, P.rojoS); rect(cx - 3, cy, cx + 3, cy, C.blanco); }
    R.numero(['$4', '$2', '$1', '$3', '$5', '$2'][k], x + 8, y + 22, { color: P.rojoS, centro: true, sombra: false, fina: true });
  }
  rect(40, 84, 96, 86, P.rojo);
  // el poste del interfono, con su rejilla
  rect(104, 120, 114, 158, C.k); rect(105, 121, 113, 157, hex('#3a3e48')); for (let y = 124; y < 134; y += 2) rect(107, y, 111, y, hex('#22262e'));
  // la barra de altura a la entrada del carril, con sus rayas amarillas y negras
  rect(4, 96, 6, 160, P.aceroD); rect(28, 96, 30, 160, P.aceroD);
  for (let x = 2; x < 33; x++) rect(x, 94, x, 98, Math.floor(x / 4) % 2 ? P.amar : C.k);
  // la acera de delante del local, con el bordillo pintado y los setos
  rect(0, 148, 319, 151, P.hormL); rect(0, 151, 319, 152, P.amar); rect(0, 153, 319, 153, P.amarS);
  for (let x = 118; x < 320; x += 1) { const hh = 4 + Math.floor(h(x >> 1, 4, 452) * 4); for (let y = 148 - hh; y < 148; y++) if (x < 184 || x > 238) pset(x, y, (x + y) % 3 ? P.cespedS : P.cesped); }
  // el carril de asfalto con su grano, las manchas de aceite, las grietas y las flechas pintadas
  rect(0, 154, 319, 179, P.asf);
  for (let k = 0; k < 700; k++) pset(Math.floor(h(k, 5, 453) * 320), 154 + Math.floor(h(k, 6, 453) * 26), h(k, 7, 453) > 0.5 ? P.asfL : P.asfS);
  for (const [x, y, r] of [[60, 166, 6], [146, 172, 5], [290, 170, 4]]) for (let j = -2; j <= 2; j++) for (let i = -r; i <= r; i++) if ((i / r) ** 2 + (j / 2.4) ** 2 < 1 && (i + j) % 2 === 0) pset(x + i, y + j, P.asfS);
  { let x = 20, y = 175; for (let k = 0; k < 18; k++) { const nx = x + 3, ny = y + (h(k, 8, 454) > 0.5 ? 1 : -1); linea(x, y, nx, ny, P.asfS); x = nx; y = Math.max(170, Math.min(178, ny)); } }
  for (const ax of [30, 130]) { rect(ax, 166, ax + 18, 167, P.pintura); poligono([[ax + 18, 162], [ax + 26, 166.5], [ax + 18, 171]], P.pintura); for (let x = ax; x < ax + 24; x += 3) pset(x, 167, P.asfL); }
  rect(0, 178, 319, 179, P.amar);
}

function d_autoservicio(R, t, o) {
  const P = d_P, { rect, pset, disco, linea } = R;
  R.copiar(d_capa(R, 'auto', () => d_autoFijo(R)));
  // las estrellas que titilan, la luna con su halo y las nubes de tres tonos a tres velocidades
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 455) * 320), y = Math.floor(h(k, 2, 455) * 58); if ((x > 276 && y < 46) || (x > 18 && x < 172 && y < 22)) continue; if (Math.sin(t * (1 + k % 4) + k) > -0.3) pset(x, y, k % 5 ? hex('#a8b4e0') : C.blanco); }
  for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d < 9 && d > 5 && (i + j) % 2 === 0) pset(236 + i, 30 + j, P.noche3); }
  disco(236, 30, 5, hex('#f2ecd0')); disco(238, 29, 4, hex('#e2dcc0')); pset(234, 31, hex('#c8c0a4')); pset(236, 28, hex('#c8c0a4'));
  d_nubes(R, t, 26, 56, [hex('#1e2448'), hex('#2e3662'), hex('#4a527e')], 6, 3);
  // los coches del paso elevado (dos faros que pasan)
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * (18 + k * 7) + k * 50) % 160) - 20), y = 71 + (k % 2); if (x < 120) { rect(x, y - 1, x + 6, y, hex('#1a1a26')); pset(k % 2 ? x : x + 6, y, k % 2 ? hex('#ff4a3a') : hex('#fff4c0')); } }
  // las palmeras del borde, que se mecen
  d_palmera(R, 6, 152, 70, t, [hex('#2e5a40'), hex('#1a3a2a'), hex('#6a5a58'), hex('#3a3040')], 0);
  // las farolas con su cono de luz tramado y las polillas
  for (const x of [20, 126]) {
    rect(x, 60, x + 1, 152, hex('#3a3a46')); rect(x - 4, 58, x + 5, 60, hex('#3a3a46')); rect(x - 3, 61, x + 4, 61, hex('#fff8d0'));
    for (let y = 62; y < 152; y++) { const w = (y - 62) * 0.28; for (let xx = Math.round(x - w); xx <= x + w + 1; xx++) if ((xx + y) % 4 === 0 && h(xx, y, 456) > 0.4) pset(xx, y, d_mez(R.pget(xx, y), hex('#fff0b0'), 0.25)); }
    for (let k = 0; k < 4; k++) { const a = t * (4 + k) + k + x, px = Math.round(x + Math.cos(a) * 4), py = Math.round(64 + Math.sin(a * 1.4) * 2); pset(px, py, hex('#e8e0c0')); }
  }
  // la ventanilla iluminada: el interior (estantes, la freidora, un fluorescente) y el cristal corredizo
  {
    const CL = [187, 118, 233, 139]; R.recorte(CL); d_degr(R, 187, 118, 233, 139, [hex('#fff8e0'), hex('#f2e2b8'), hex('#d8c08c')]);
    d_rect(R, CL, 187, 118, 233, 119, C.blanco); for (let x = 190; x < 232; x += 7) d_rect(R, CL, x, 124, x + 5, 125, P.acero);
    d_rect(R, CL, 196, 130, 214, 139, P.aceroS); d_rect(R, CL, 197, 131, 213, 132, P.aceroL); for (let k = 0; k < 4; k++) pset(200 + ((k * 5 + Math.floor(t * 6)) % 12), 131 - (k % 2), hex('#fff0a0'));
    d_rect(R, CL, 220, 126, 232, 139, hex('#3a3e48')); for (let l = 0; l < 3; l++) d_rect(R, CL, 222, 128 + l * 3, 222 + ((Math.floor(t * 1.3) + l * 2) % 8), 128 + l * 3, hex('#5aff8a'));
    R.recorte(null);
    rect(186, 118, 186, 139, P.aceroD); rect(234, 118, 234, 139, P.aceroD); rect(209, 118, 210, 139, P.aceroS);
    for (let y = 119; y < 139; y++) { const xs = 213 + ((139 - y) >> 1) % 18; if (y % 2) pset(xs, y, d_mez(R.pget(xs, y), C.blanco, 0.5)); }
    // la lámpara de cuello de cisne y su luz en el toldo y la pared
    linea(210, 104, 210, 100, P.aceroD); rect(206, 98, 214, 100, P.aceroD); pset(210, 101, hex('#fff8d0'));
  }
  // la limpiadora que friega el comedor cerrado: va y viene
  { const u = (Math.sin(t * 0.4) + 1) / 2, x = Math.round(256 + u * 46), m = Math.sin(t * 3); R.recorte([249, 93, 315, 135]);
    R.disco(x, 117, 2, hex('#6a4a3a')); rect(x - 2, 120, x + 2, 128, hex('#3a6ac8')); rect(x - 2, 129, x - 1, 134, hex('#2a2a3a')); rect(x + 1, 129, x + 2, 134, hex('#2a2a3a'));
    linea(x + 2, 122, x + 6 + Math.round(m * 2), 134, P.maderaS); rect(x + 4 + Math.round(m * 2), 134, x + 8 + Math.round(m * 2), 135, hex('#d8d0b8')); R.recorte(null); }
  // el interfono: la luz que parpadea
  rect(107, 136, 111, 140, Math.floor(t * 2) % 2 ? hex('#5aff8a') : hex('#1a6a3a')); pset(108, 137, C.blanco);
  // el brillo del panel del menú
  for (let y = 87; y < 141; y++) { const xs = 41 + Math.round(((t * 9) % 90) - (y - 87) * 0.5); if (xs > 41 && xs < 95 && y % 2) pset(xs, y, d_mez(R.pget(xs, y), C.blanco, 0.35)); }
}

// ══ el autoservicio (ventanilla): desde dentro ══
function d_ventanillaFija(R) {
  const P = d_P, { rect, pset, disco, linea, poligono } = R;
  // la pared de azulejos (juntas suaves: la esquina de Atom queda tranquila) y el techo
  rect(0, 0, 319, 149, P.azulejo); for (let y = 6; y < 150; y += 8) rect(0, y, 319, y, P.azulejoS); for (let y = 0; y < 150; y += 8) for (let x = (y / 8) % 2 ? 4 : 0; x < 320; x += 8) rect(x, y, x, y + 7, P.azulejoS);
  rect(0, 0, 319, 5, P.techo); rect(0, 5, 319, 5, P.techoD);
  rect(0, 88, 319, 89, hex('#c83a3a'));   // la cenefa roja
  // la campana de acero sobre la freidora, con sus filtros
  poligono([[16, 22], [116, 22], [124, 48], [8, 48]], P.acero); rect(8, 48, 124, 51, P.aceroS); rect(16, 22, 116, 23, P.aceroL);
  for (let x = 22; x < 114; x += 10) for (let y = 27; y < 45; y += 2) rect(x, y, x + 7, y, P.aceroS); rect(8, 51, 124, 51, P.aceroD); for (const x of [14, 118]) disco(x, 50, 1, hex('#fff4c0'));
  // la balda sobre la ventanilla con vasos, tapas y cajas de servilletas; el temporizador; el cartel de lavarse las manos
  rect(204, 66, 296, 68, P.aceroL); rect(204, 68, 296, 68, P.aceroD); for (const x of [210, 288]) { rect(x, 69, x + 1, 74, P.aceroD); }
  for (let k = 0; k < 6; k++) { const x = 208 + k * 6, n = 4 + (k % 3); for (let j = 0; j < n; j++) rect(x, 65 - j * 2 - 1, x + 4, 65 - j * 2, j === n - 1 ? C.blanco : k % 2 ? P.rojo : P.tira); }
  for (let k = 0; k < 3; k++) { const x = 246 + k * 15; rect(x, 56, x + 12, 65, P.bolsaPS); rect(x + 1, 57, x + 11, 65, P.bolsaP); rect(x + 1, 57, x + 11, 58, P.bolsaPL); rect(x + 4, 60, x + 8, 62, P.rojo); }
  rect(200, 22, 224, 50, C.k); rect(201, 23, 223, 49, C.blanco); rect(201, 23, 223, 26, hex('#3a7ad8'));
  for (let j = 0; j < 3; j++) { disco(206 + j * 3, 32 + j, 1, hex('#3a9ae8')); } rect(205, 40, 219, 44, hex('#e8b890')); rect(205, 40, 219, 40, hex('#f2d0b0')); for (let x = 206; x < 219; x += 3) pset(x, 44, hex('#c89870'));
  rect(128, 34, 196, 36, P.aceroL); rect(128, 36, 196, 36, P.aceroD); for (const x of [134, 190]) rect(x, 37, x + 1, 40, P.aceroD);
  for (let k = 0; k < 9; k++) { const x = 131 + k * 7, c = [P.rojo, P.amar, P.rojo, hex('#f4f0e0'), P.amar, P.rojo, hex('#6a3a1e'), P.amar, P.rojo][k]; rect(x, 26, x + 4, 33, c); rect(x + 1, 24, x + 3, 25, c); pset(x + 2, 22, c); pset(x + 2, 23, c); rect(x, 26, x, 33, d_mez(c, C.blanco, 0.4)); rect(x + 4, 27, x + 4, 33, d_mez(c, C.k, 0.3)); }
  rect(232, 26, 268, 46, C.k); rect(233, 27, 267, 45, hex('#1a1a20')); rect(233, 27, 267, 27, hex('#3a3a44'));
  // el extintor y los cascos del autoservicio colgados junto a la ventanilla
  rect(304, 98, 312, 122, C.k); rect(305, 99, 311, 121, P.rojo); rect(305, 99, 305, 121, P.rojoL); rect(306, 95, 310, 98, C.k); linea(311, 100, 315, 108, C.k);
  disco(304, 74, 4, C.k); disco(304, 74, 3, hex('#3a3a44')); rect(300, 74, 308, 76, hex('#2a2a32')); linea(306, 77, 312, 86, hex('#2a2a32')); pset(301, 75, P.aceroL);
  // LA FREIDORA: el cuerpo de acero, las dos cubas de aceite, las cestas colgadas con patatas
  rect(30, 100, 100, 150, P.aceroS); rect(30, 100, 100, 104, P.aceroL); rect(30, 104, 100, 104, P.aceroD);
  for (const x of [34, 68]) { rect(x, 96, x + 28, 102, P.aceroD); rect(x + 1, 97, x + 27, 101, P.aceite); rect(x + 1, 97, x + 27, 97, P.aceiteL); }
  for (let x = 32; x < 100; x += 6) rect(x, 112, x + 3, 146, d_mez(P.aceroS, P.acero, 0.5)); rect(36, 140, 94, 142, P.aceroD);
  rect(32, 105, 98, 110, P.aceroD); for (let x = 36; x < 96; x += 8) { disco(x, 107, 1.5, C.k); pset(x, 106, P.aceroL); } for (const x of [48, 82]) rect(x - 3, 106, x + 3, 108, hex('#14202a'));
  // las cestas: una colgada escurriendo y otra metida en el aceite, con sus mangos negros y las patatas
  for (const [x, y] of [[38, 84], [72, 92]]) { rect(x, y, x + 18, y + 8, P.aceroS); for (let i = x; i <= x + 18; i += 2) rect(i, y, i, y + 8, P.aceroD); for (let j = y; j <= y + 8; j += 2) rect(x, j, x + 18, j, P.aceroD);
    for (let k = 0; k < 12; k++) rect(x + 2 + (k * 3) % 15, y + 1 + (k % 3), x + 2 + (k * 3) % 15, y + 4 + (k % 3), k % 2 ? P.aceiteL : P.aceite); linea(x + 18, y + 1, x + 28, y - 6, C.k); linea(x + 18, y + 2, x + 28, y - 5, C.k); rect(x + 26, y - 8, x + 30, y - 5, C.k); }
  rect(30, 146, 100, 150, P.aceroD);
  // la mesa de las patatas bajo las lámparas de calor: el acero, las patatas, los cucuruchos rojos y las hamburguesas envueltas
  rect(104, 106, 196, 110, P.aceroL); rect(104, 110, 196, 150, P.acero); rect(104, 110, 196, 111, P.aceroD); for (let x = 108; x < 196; x += 22) { rect(x, 116, x + 18, 146, P.aceroS); rect(x + 1, 117, x + 17, 145, P.acero); rect(x + 14, 128, x + 15, 132, P.aceroL); }
  for (let k = 0; k < 40; k++) { const x = 108 + Math.floor(h(k, 1, 460) * 30), y = 102 + Math.floor(h(k, 2, 460) * 4); rect(x, y, x, y + 2, h(k, 3, 460) > 0.5 ? P.aceiteL : P.aceite); }
  for (let k = 0; k < 4; k++) { const x = 144 + k * 7; rect(x, 98, x + 5, 105, P.rojo); rect(x, 98, x + 5, 98, P.rojoL); for (let f = 0; f < 3; f++) rect(x + 1 + f * 2, 95 + (f & 1), x + 1 + f * 2, 98, P.aceiteL); }
  for (let k = 0; k < 4; k++) { const x = 174 + (k % 2) * 10, y = 100 - Math.floor(k / 2) * 5; rect(x, y, x + 8, y + 5, P.papelHam); rect(x, y, x + 8, y, d_mez(P.papelHam, C.blanco, 0.5)); rect(x, y + 5, x + 8, y + 5, P.papelHamS); linea(x + 2, y + 1, x + 6, y + 4, P.papelHamS); }
  // la barra de las lámparas de calor
  rect(104, 66, 196, 72, P.aceroD); rect(104, 66, 196, 66, P.aceroS); for (let x = 112; x < 196; x += 20) rect(x, 72, x + 10, 74, hex('#3a2a20'));
  // las pantallas de pedidos (líneas que cambian, en cada fotograma) y su soporte
  for (const x of [134, 164]) { rect(x, 46, x + 24, 62, C.k); rect(x + 1, 47, x + 23, 61, hex('#14202a')); linea(x + 12, 40, x + 12, 46, P.aceroD); }
  // la caja junto a la ventanilla: la pantalla inclinada, la base y el cajón
  rect(194, 116, 206, 128, C.k); rect(195, 117, 205, 127, hex('#1a2a3a')); rect(198, 128, 202, 138, P.aceroD); rect(192, 136, 208, 140, P.aceroD);
  // LA VENTANILLA: el hueco (lo de fuera se pinta en cada fotograma) y el marco de aluminio
  rect(206, 86, 294, 89, P.aceroD); rect(206, 86, 294, 86, P.aceroL); rect(206, 89, 209, 140, P.aceroD); rect(291, 89, 294, 140, P.aceroD); rect(207, 89, 208, 140, P.acero);
  // el suelo de baldosa roja con su junta y la alfombrilla de goma con agujeros
  for (let y = 150; y < 180; y++) { const e = (y - 100) / 50; for (let x = 0; x < 320; x++) { const col = Math.floor((160 + (x - 160) / e) / 18), fil = Math.floor((y - 150) / (5 + (y - 150) * 0.12)); const j = (Math.floor((160 + (x - 1 - 160) / e) / 18) !== col) || [150, 155, 161, 168, 176].includes(y); pset(x, y, j ? P.baldRS : (col + fil) % 2 ? P.baldR : P.baldRL); } }
  rect(0, 149, 319, 150, P.zocalo);
  poligono([[150, 158], [300, 158], [312, 178], [140, 178]], P.goma); for (let y = 160; y < 177; y += 3) for (let x = 150; x < 306; x += 4) pset(x + (y % 2) * 2 - Math.round((178 - y) * 0.2), y, hex('#3e3e44'));
  // la sombra de la freidora y de la mesa en el suelo
  for (let y = 150; y < 156; y++) for (let x = 26; x < 200; x++) if ((x + y) % 2 === 0) pset(x, y, P.baldRS);
}

function d_ventanilla(R, t, o) {
  const P = d_P, { rect, pset, disco, linea } = R;
  R.copiar(d_capa(R, 'ventanilla', () => d_ventanillaFija(R)));
  // el aceite que borbotea en las dos cubas y el vapor que sube a la campana
  for (const x of [34, 68]) for (let k = 0; k < 8; k++) { const ph = t * 5 + k * 1.7 + x, bx = x + 2 + Math.floor(h(k, x, 461) * 25), r = Math.sin(ph) > 0.3 ? 1 : 0; if (Math.sin(ph) > -0.4) { pset(bx, 98, P.aceiteL); if (r) { pset(bx - 1, 98, C.blanco); pset(bx, 97, P.aceiteL); } } }
  for (let k = 0; k < 10; k++) { const u = ((t * 0.35 + k * 0.1) % 1), x = Math.round(38 + (k % 5) * 12 + Math.sin(t * 1.5 + k + u * 4) * 3), y = Math.round(94 - u * 50); if (u < 0.92) disco(x, y, 1 + u * 2.5, d_mez(P.azulejo, C.blanco, 0.75 - u * 0.5)); }
  // el resplandor naranja de las lámparas de calor sobre la mesa, que late un poco
  { const lat = 0.28 + Math.sin(t * 3) * 0.04; for (let y = 75; y < 106; y++) for (let x = 106; x < 196; x++) { const l = Math.floor((x - 112) / 20); if (l < 0 || l > 3) continue; const cx = 117 + l * 20, w = 5 + (y - 75) * 0.35; if (Math.abs(x - cx) < w && (x + y) % 2 === 0) pset(x, y, d_mez(R.pget(x, y), P.calor, lat)); } }
  for (let x = 112; x < 196; x += 20) rect(x + 1, 74, x + 9, 74, P.calorL);
  // las pantallas de pedidos: tarjetas que cambian de color y de líneas
  for (const x of [134, 164]) for (let q = 0; q < 3; q++) { const qx = x + 2 + q * 7, est = (Math.floor(t / 1.7) + q + x) % 5; rect(qx, 48, qx + 5, 60, est === 0 ? hex('#c83a3a') : hex('#2a4a5a')); for (let l = 0; l < 4; l++) rect(qx + 1, 50 + l * 3, qx + 1 + ((est + l * 2 + q) % 4), 50 + l * 3, hex('#d8e8f0')); }
  // el temporizador de la freidora: la cuenta atrás en rojo
  { const s = 180 - Math.floor(t) % 180; R.numero(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, 250, 42, { color: hex('#ff4a3a'), centro: true, sombra: false }); }
  // la caja: las cifras que cambian
  rect(196, 118, 204, 126, hex('#1a2a3a')); for (let l = 0; l < 3; l++) rect(197, 119 + l * 3, 197 + ((Math.floor(t * 1.2) + l * 3) % 7), 119 + l * 3, hex('#5ad8ff'));
  // ── LO DE FUERA por la ventanilla: la noche, la farola, una palmera y el coche parado con su puerta y su ventanilla
  {
    const CL = [210, 90, 290, 139]; R.recorte(CL);
    d_degr(R, 210, 90, 290, 139, [P.noche1, P.noche2, P.noche3, P.brumaN]);
    for (let k = 0; k < 6; k++) { const x = 212 + Math.floor(h(k, 1, 462) * 76), y = 92 + Math.floor(h(k, 2, 462) * 10); if (Math.sin(t * 2 + k) > -0.3) pset(x, y, hex('#a8b4e0')); }
    d_nubes(R, t, 94, 100, [hex('#1e2448'), hex('#2e3662'), hex('#4a527e')], 3, 9);
    for (let x = 210; x < 291; x++) { const hy = 112 - Math.floor(h(x >> 2, 1, 463) * 6); d_rect(R, CL, x, hy, x, 139, hex('#0e1a22')); }
    d_palmera(R, 228, 126, 30, t, [hex('#1e3a2a'), hex('#12261c'), hex('#3a3040'), hex('#24202c')], 2);
    d_rect(R, CL, 272, 96, 273, 139, hex('#3a3a46')); d_rect(R, CL, 268, 95, 277, 96, hex('#3a3a46')); for (let y = 97; y < 130; y++) for (let x = 266; x < 280; x++) if ((x + y) % 4 === 0) pset(x, y, hex('#4a4a5a'));
    // el coche de lado, grande: la carrocería, la ventanilla del conductor (bajada) y el retrovisor
    d_coche(R, 200, 160, 1, [hex('#7a2a3a'), hex('#4e1a26'), hex('#b05a6a')], 2, { freno: true, conductor: true });
    R.recorte(null);
  }
  // el cristal corredizo, abierto: asoma a la izquierda con sus reflejos
  rect(210, 90, 222, 139, d_mez(P.vidrio, P.noche2, 0.5)); for (let y = 91; y < 139; y++) if (y % 3 === 0) pset(212 + ((139 - y) >> 2) % 8, y, P.vidrioL); rect(222, 90, 223, 139, P.aceroL);
}

// ══ el porche con mosquitera y la piscina (general), de día ══
function d_piscinaFija(R) {
  const P = d_P, { rect, pset, disco, linea, poligono } = R;
  // ── lo de fuera (se verá tamizado por la malla): el cielo, el jardín, el estanque con juncos, la valla y las palmeras
  d_degr(R, 0, 0, 255, 88, [P.cielo0, P.cielo1, P.cielo2, P.cielo3]);
  for (let x = 0; x < 256; x++) { const hy = 78 - Math.floor(h(x >> 3, 1, 470) * 6) - Math.round(Math.sin(x * 0.07) * 3); rect(x, hy, x, 92, x % 3 ? hex('#4a8a5a') : hex('#3a7a4a')); }
  rect(0, 70, 60, 80, hex('#d8c8b8')); poligono([[0, 70], [30, 60], [60, 70]], hex('#a86a4a')); rect(8, 72, 16, 78, hex('#8ab0d0')); rect(40, 72, 48, 78, hex('#8ab0d0'));   // la casa del vecino
  rect(0, 88, 255, 96, hex('#f2f2ea')); for (let x = 0; x < 256; x += 8) { rect(x, 86, x + 1, 96, hex('#dcdcd4')); pset(x, 85, hex('#f8f8f2')); } rect(0, 91, 255, 91, hex('#dcdcd4'));   // la valla blanca
  rect(0, 96, 255, 130, P.cesped); for (let k = 0; k < 600; k++) { const x = Math.floor(h(k, 2, 470) * 256), y = 96 + Math.floor(h(k, 3, 470) * 34); pset(x, y, h(k, 4, 470) > 0.5 ? P.cespedS : P.cespedL); }
  // el estanque de la izquierda, con sus orillas y los juncos
  for (let j = -9; j <= 9; j++) for (let i = -44; i <= 44; i++) { const rr = 1 + 0.18 * Math.sin(i * 0.21 + 1) + 0.1 * Math.sin(i * 0.53), d = (i / 44) ** 2 + (j / (7 * rr)) ** 2; if (d < 1) pset(46 + i, 110 + j, d > 0.8 ? hex('#7a6a42') : d > 0.68 ? hex('#5a6a3a') : j < -2 && (i + j) % 3 ? P.estanqueL : (i + j * 2) % 7 === 0 ? P.estanqueL : P.estanque); }
  // los nenúfares (óvalos verdes con su muesca) y una flor
  for (const [x, y] of [[30, 112], [38, 109], [62, 113], [70, 108], [52, 115]]) { d_elipse(R, x, y, 3, 1.4, hex('#4a8a3a')); pset(x + 1, y, P.estanque); pset(x - 1, y - 1, hex('#6aaa4a')); }
  disco(62, 112, 1, hex('#f8c8e0'));
  // ── la casa de la derecha: el estuco rosa, el alero, la puerta corredera con sus cortinas y la lámpara
  rect(256, 0, 319, 159, P.rosaCasa); for (let k = 0; k < 260; k++) pset(256 + Math.floor(h(k, 5, 470) * 64), 50 + Math.floor(h(k, 6, 470) * 108), h(k, 7, 470) > 0.5 ? P.rosaCasaS : d_mez(P.rosaCasa, C.blanco, 0.3));
  rect(256, 0, 258, 159, P.rosaCasaS);
  rect(264, 68, 316, 150, C.k); rect(265, 69, 315, 149, hex('#b8d0dc'));
  rect(266, 70, 276, 148, hex('#f0e8d8')); rect(304, 70, 314, 148, hex('#f0e8d8')); for (let y = 70; y < 148; y += 3) { pset(270, y, hex('#d8ccb8')); pset(308, y, hex('#d8ccb8')); }
  for (let y = 70; y < 149; y++) { const xs = 278 + ((149 - y) >> 1) % 24; if (y % 2) pset(xs, y, C.blanco); }
  rect(289, 69, 290, 149, P.aluS); rect(286, 104, 287, 112, P.aluD);
  rect(260, 54, 264, 62, P.aluD); disco(262, 58, 2, hex('#f8f0c0'));
  // ── el suelo del porche: travertino en piezas de varios tamaños, en perspectiva
  for (let y = 128; y < 180; y++) { const e = (y - 60) / 100, fil = y < 134 ? 0 : y < 141 ? 1 : y < 149 ? 2 : y < 158 ? 3 : y < 168 ? 4 : 5, j = [134, 141, 149, 158, 168].includes(y);
    for (let x = 0; x < 320; x++) { const col = Math.floor((160 + (x - 160) / e + fil * 13) / 26), jx = Math.floor((160 + (x - 1 - 160) / e + fil * 13) / 26) !== col;
      pset(x, y, j || jx ? P.traverS : h(x >> 1, y >> 1, 471) > 0.85 ? P.traverL : (col + fil) % 3 === 0 ? d_mez(P.traver, P.traverS, 0.3) : P.traver); } }
  // las sombras de los postes y las vigas de la jaula sobre el travertino, en diagonal
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) { if (x > 104 && x < 256 && y < 164) continue; const u = ((x - (y - 134) * 0.9) % 64 + 64) % 64, v = ((y * 3 + x * 0.4) % 38); if (u < 3 || v < 1.2) pset(x, y, d_mez(R.pget(x, y), P.traverS, 0.7)); }
  // la bajante del canalón, el grifo con la manguera enrollada y el aparato del aire acondicionado, en la casa
  rect(258, 0, 260, 152, P.aluS); rect(258, 0, 258, 152, P.alu); rect(256, 150, 262, 152, P.aluD);
  disco(304, 60, 6, P.aluD); disco(304, 60, 5, hex('#3a8a4a')); for (let a = 0; a < 6.28; a += 0.6) pset(Math.round(304 + Math.cos(a) * 3), Math.round(60 + Math.sin(a) * 3), hex('#2a6a3a')); rect(300, 52, 308, 53, P.aluD);
  // ── LA PISCINA: la albardilla, la cenefa de mosaico y el agua (las cáusticas se pintan en cada fotograma)
  rect(106, 134, 254, 137, P.traverL); rect(106, 137, 254, 137, P.traverS);
  for (let x = 108; x < 253; x++) { pset(x, 138, (x >> 1) % 2 ? P.mosaico : P.mosaicoL); pset(x, 139, (x >> 1) % 2 ? P.mosaicoL : P.mosaico); }
  rect(108, 140, 252, 159, P.piscina); rect(106, 160, 254, 163, P.traverL); rect(106, 163, 254, 163, P.traverS);
  // ── la mesa con la sombrilla, las tumbonas y las macetas con buganvilla
  for (let j = -3; j <= 3; j++) for (let i = -16; i <= 16; i++) if ((i / 16) ** 2 + (j / 3) ** 2 < 1 && (i + j) % 2 === 0) pset(290 + i, 153 + j, d_mez(P.traver, P.traverS, 0.8));
  rect(290, 134, 291, 150, P.aluD); rect(278, 140, 302, 142, P.alu); rect(278, 142, 302, 142, P.aluD); rect(282, 143, 283, 153, P.aluD); rect(297, 143, 298, 153, P.aluD);
  rect(284, 136, 287, 139, hex('#f8d040')); pset(285, 135, hex('#3ac83a')); rect(294, 135, 296, 139, hex('#e8f4f8')); pset(295, 136, hex('#f2a040'));
  for (const x of [6, 50]) { const yb = 174; for (let xx = x - 1; xx < x + 28; xx++) if (xx % 2 === 0) pset(xx, yb + 1, P.traverS); poligono([[x, yb], [x + 22, yb], [x + 22, yb - 4], [x + 26, yb - 12], [x + 24, yb - 12], [x + 20, yb - 5], [x, yb - 5]], P.alu); for (let xx = x + 1; xx < x + 21; xx += 2) rect(xx, yb - 4, xx, yb - 1, hex('#4ab0c8')); rect(x + 1, yb + 1, x + 2, yb + 4, P.aluD); rect(x + 20, yb + 1, x + 21, yb + 4, P.aluD); }
  { const x = 30, y = 170; rect(x, y, x + 10, y + 2, hex('#f2c8d8')); rect(x, y, x + 10, y, hex('#ffe0ec')); }   // una toalla doblada
  for (const [x, s] of [[14, 1], [236, 0.8]]) { const y = 160; rect(x - 6 * s, y - 10 * s, x + 6 * s, y, P.terracoS); rect(x - 5 * s, y - 9 * s, x + 4 * s, y - 1, P.terraco); rect(x - 7 * s, y - 11 * s, x + 7 * s, y - 9 * s, P.terraco);
    for (let k = 0; k < 14; k++) { const a = h(k, x, 472) * Math.PI, r = 4 + h(k, x + 1, 472) * 8 * s; disco(x + Math.cos(a) * r * 1.1, y - 13 * s - Math.sin(a) * r, 2.5 * s, k % 3 ? hex('#2a6a2a') : hex('#3a8a3a')); }
    for (let k = 0; k < 10; k++) { const a = h(k, x + 2, 472) * Math.PI, r = 3 + h(k, x + 3, 472) * 8 * s; disco(x + Math.cos(a) * r * 1.1, y - 15 * s - Math.sin(a) * r, 1.5, k % 2 ? P.buganv : P.buganvL); } }
}

function d_piscina(R, t, o) {
  const P = d_P, { rect, pset, disco, linea } = R, roto = Math.max(0, Math.min(1, o.roto ?? 0));
  R.copiar(d_capa(R, 'piscina', () => d_piscinaFija(R)));
  // lo de fuera que se mueve: las nubes, la garza que cruza, los juncos y las palmeras al viento, el agua del estanque
  R.recorte([0, 0, 255, 133]);
  d_nubes(R, t, 10, 50, [P.nubeS, P.nube, P.nubeL], 6, 5);
  { const u = ((t * 0.05) % 1), x = Math.round(-20 + u * 300), y = Math.round(40 + Math.sin(t * 0.6) * 4); d_ave(R, x, y, t, C.blanco, 1); d_ave(R, x + 1, y + 1, t, C.blanco, 1); pset(x + 3, y, hex('#f2c22a')); }
  d_palmera(R, 104, 92, 56, t, [hex('#3a8a3a'), hex('#2a6a2a'), hex('#8a7058'), hex('#6a5440')], 3);
  d_palmera(R, 196, 92, 46, t, [hex('#3a8a3a'), hex('#2a6a2a'), hex('#8a7058'), hex('#6a5440')], 4);
  for (let k = 0; k < 5; k++) { const x = 16 + k * 11, y = 107 + (k % 2); pset(x + Math.round(Math.sin(t * 1.4 + k) * 3), y, P.estanqueL); pset(x + 1 + Math.round(Math.sin(t * 1.4 + k) * 3), y, C.blanco); }
  { const x = 84, y = 112, pico = Math.sin(t * 0.7) > 0.6 ? 2 : 0; linea(x, y, x, y - 6, hex('#2a2a2a')); linea(x + 2, y, x + 2, y - 6, hex('#2a2a2a')); d_elipse(R, x + 1, y - 9, 4, 2.5, C.blanco); pset(x - 2, y - 8, hex('#d8dce0'));
    linea(x + 3, y - 10, x + 4, y - 15, C.blanco); linea(x + 4, y - 15, x + 3, y - 17, C.blanco); rect(x + 2, y - 18, x + 4, y - 17, C.blanco); linea(x + 5, y - 18 + pico, x + 8, y - 18 + pico * 2, hex('#f2c22a')); pset(x + 3, y - 18, C.k); }
  for (let k = 0; k < 16; k++) { const x = k < 8 ? 4 + k * 2 : 64 + k * 1.5, hh = 7 + (k % 4) * 2, m = Math.sin(t * 1.6 + k * 0.7) * 1.5; linea(x, 112, x + m, 112 - hh, k % 2 ? hex('#5a7a2a') : hex('#7a9a3a')); if (k % 3 === 0) rect(x + m, 112 - hh - 2, x + m, 112 - hh, hex('#6a4a2a')); }
  R.recorte(null);
  // ── LA MALLA de la mosquitera: oscurece un poco y trama lo de fuera (salvo donde está rasgada)
  const hueco = (x, y) => { if (roto <= 0) return false; const dx = (x - 36) / 24, dy = (y - 98) / 32, r = Math.hypot(dx, dy), ang = Math.atan2(dy, dx); return r < roto * (0.75 + 0.25 * Math.sin(ang * 7 + 1)); };
  for (let y = 0; y < 134; y++) for (let x = 0; x < 256; x++) { if (y > 128 && x > 104) continue; if (hueco(x, y)) continue; const c = R.pget(x, y); pset(x, y, (x % 3 === 0 || y % 3 === 0) ? d_mez(c, P.malla, 0.4) : d_mez(c, P.malla, 0.22)); }
  // el borde deshilachado del agujero (hilos claros de malla)
  if (roto > 0) for (let y = 62; y < 129; y++) for (let x = 8; x < 64; x++) if (hueco(x, y) && (!hueco(x - 1, y) || !hueco(x + 1, y) || !hueco(x, y - 1) || !hueco(x, y + 1)) && (x + y) % 2 === 0) pset(x, y, P.aluS);
  // los colgajos del panel roto, que se mecen
  if (roto > 0) for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2, r = roto * 26, x0 = Math.round(36 + Math.cos(a) * r * 0.9), y0 = Math.round(98 + Math.sin(a) * r * 1.2), L = 3 + (k % 3) * 2, m = Math.round(Math.sin(t * 3 + k) * 1.2);
    for (let i = 0; i < L; i++) pset(x0 + Math.round(i * 0.3) + (i > L / 2 ? m : 0), y0 + i, P.malla); pset(x0 + 1, y0 + 1, P.aluS); }
  // ── LA JAULA DE ALUMINIO: los postes, los largueros, el zócalo y las vigas del techo (lejos de la esquina de Atom)
  for (const x of [6, 64, 128, 192, 252]) { rect(x - 1, 24, x + 1, 134, P.alu); rect(x + 1, 24, x + 1, 134, P.aluS); rect(x - 1, 24, x - 1, 134, d_mez(P.alu, C.blanco, 0.5)); }
  for (const y of [62, 128]) { rect(0, y, 255, y + 1, P.alu); rect(0, y + 2, 255, y + 2, P.aluS); }
  rect(0, 129, 106, 133, P.alu); rect(0, 133, 106, 133, P.aluD);
  rect(0, 24, 255, 26, P.alu); rect(0, 27, 255, 27, P.aluS);
  // la sombrilla de la mesa (dentro del porche: por delante de la malla), con su fleco que se mueve con la brisa
  { const { poligono } = R, X = 290; rect(X, 104, X + 1, 134, P.aluD); rect(X + 1, 104, X + 1, 134, P.aluS);
    poligono([[X - 26, 113], [X, 99], [X + 26, 113]], hex('#2a8ab8')); poligono([[X - 26, 113], [X, 99], [X - 12, 113]], hex('#4aa8d8')); for (let x = X - 20; x < X + 26; x += 8) linea(X, 100, x, 113, hex('#1a6a98'));
    rect(X - 26, 113, X + 26, 114, hex('#1a6a98')); for (let x = X - 26; x < X + 26; x += 3) pset(x + 1 + (Math.sin(t * 3 + x) > 0.4 ? 1 : 0), 115, hex('#f2f2ea')); disco(X, 98, 1, P.aluS); }
  // ── LA PISCINA: las cáusticas que se mueven, los brillos, la escalerilla, el limpiafondos y el flotador de flamenco
  for (let y = 140; y < 160; y++) for (let x = 108; x < 253; x++) {
    const v = Math.sin(x * 0.31 + t * 1.7 + Math.sin(y * 0.5 + t)) + Math.sin(y * 0.72 - t * 1.3 + Math.sin(x * 0.17 - t * 0.8)), d = (y - 140) / 20;
    pset(x, y, v > 1.35 ? P.piscinaL : v > 0.9 ? d_mez(P.piscina, P.piscinaL, 0.5) : d > 0.6 && v < -0.8 ? P.piscinaS : y < 142 ? P.piscinaD : P.piscina);
  }
  for (let k = 0; k < 6; k++) { const x = Math.round(112 + ((h(k, 1, 473) * 140 + t * 6) % 138)), y = 142 + (k * 3) % 16; if (Math.sin(t * 2 + k) > 0) { pset(x, y, C.blanco); pset(x + 1, y, C.blanco); } }
  // el limpiafondos que va de lado a lado con su manguera
  { const u = (Math.sin(t * 0.3) + 1) / 2, x = Math.round(120 + u * 100); rect(x, 155, x + 7, 158, hex('#2a4a8a')); rect(x + 1, 154, x + 6, 154, hex('#3a6ab8')); pset(x + 2, 157, hex('#5aff8a')); linea(x + 3, 154, 140, 141, hex('#c8d8e0')); for (let k = 0; k < 3; k++) pset(x + 2 + k * 2, Math.round(152 - ((t * 8 + k * 3) % 10)), P.piscinaL); }
  // la escalerilla: los dos pasamanos que entran en el agua (el de delante va en tiendaDelante)
  linea(240, 132, 240, 152, P.aluS); linea(241, 131, 241, 152, P.alu);
  if (o.flamenco !== false) { const u = t * 0.12, fx = Math.round(170 + Math.sin(u) * 36), fy = Math.round(150 + Math.sin(t * 1.4) * 1); d_flamenco(R, fx, fy, t, { dir: Math.cos(u) > 0 ? 1 : -1 }); }
}

// ══ el agua de cerca (piscina/agua) ══
function d_aguaFija(R) {
  const P = d_P, { rect, pset, disco, linea, poligono } = R;
  // detrás: la malla con el cielo, la casa y las palmeras tamizadas, y la terraza de enfrente con tumbonas y macetas
  d_degr(R, 0, 0, 319, 60, [P.cielo0, P.cielo1, P.cielo2, P.cielo3]);
  rect(200, 0, 319, 70, P.rosaCasa); rect(200, 0, 202, 70, P.rosaCasaS); rect(208, 48, 272, 70, C.k); rect(209, 49, 271, 70, hex('#b8d0dc')); rect(240, 49, 241, 70, P.aluS); for (let y = 49; y < 70; y++) if (y % 2) pset(212 + ((70 - y) >> 1) % 24, y, C.blanco); rect(209, 49, 216, 70, hex('#f0e8d8')); rect(264, 49, 271, 70, hex('#f0e8d8'));
  for (let x = 0; x < 200; x++) { const hy = 52 - Math.floor(h(x >> 3, 1, 480) * 8); rect(x, hy, x, 70, x % 3 ? hex('#4a8a5a') : hex('#3a7a4a')); }
  for (const x of [40, 120, 196]) { rect(x - 1, 24, x + 1, 70, P.alu); rect(x + 1, 24, x + 1, 70, P.aluS); }
  rect(0, 40, 199, 41, P.alu);
  // la terraza de enfrente: travertino, las tumbonas, la maceta con buganvilla
  rect(0, 70, 319, 95, P.traver); for (let y = 70; y < 96; y += 6) rect(0, y, 319, y, P.traverS); for (let y = 70; y < 96; y += 6) for (let x = (y / 6) % 2 ? 0 : 20; x < 320; x += 40) rect(x, y, x, y + 5, P.traverS);
  for (let k = 0; k < 140; k++) pset(Math.floor(h(k, 2, 480) * 320), 70 + Math.floor(h(k, 3, 480) * 25), P.traverL);
  for (const x of [150, 216]) { poligono([[x, 86], [x + 40, 86], [x + 40, 80], [x + 48, 64], [x + 44, 64], [x + 36, 78], [x, 78]], P.alu); for (let xx = x + 2; xx < x + 38; xx += 3) rect(xx, 80, xx, 85, hex('#4ab0c8')); rect(x + 2, 87, x + 4, 94, P.aluD); rect(x + 36, 87, x + 38, 94, P.aluD); rect(x + 30, 66, x + 44, 68, hex('#f2c8d8')); }
  { const x = 60, y = 94; rect(x - 9, y - 16, x + 9, y, P.terracoS); rect(x - 8, y - 15, x + 7, y - 1, P.terraco); rect(x - 10, y - 18, x + 10, y - 15, P.terraco);
    for (let k = 0; k < 22; k++) { const a = h(k, 1, 481) * Math.PI, r = 5 + h(k, 2, 481) * 12; disco(x + Math.cos(a) * r * 1.2, y - 20 - Math.sin(a) * r, 3.5, k % 3 ? hex('#2a6a2a') : hex('#3a8a3a')); }
    for (let k = 0; k < 14; k++) { const a = h(k, 3, 481) * Math.PI, r = 4 + h(k, 4, 481) * 12; disco(x + Math.cos(a) * r * 1.2, y - 22 - Math.sin(a) * r, 2, k % 2 ? P.buganv : P.buganvL); } }
  // la malla sobre todo lo de detrás
  for (let y = 0; y < 70; y++) for (let x = 0; x < 200; x++) if (x % 3 === 0 || y % 3 === 0) pset(x, y, d_mez(R.pget(x, y), P.malla, 0.25));
  // el borde de enfrente: la albardilla y la cenefa de mosaico
  rect(0, 95, 319, 101, P.traverL); rect(0, 101, 319, 102, P.traverS); for (let x = 0; x < 320; x += 30) rect(x, 95, x, 101, P.traverS);
  for (let y = 103; y < 111; y++) for (let x = 0; x < 320; x++) pset(x, y, ((x >> 2) + (y >> 2)) % 2 ? P.mosaico : P.mosaicoL);
  for (let x = 0; x < 320; x += 4) rect(x, 103, x, 110, hex('#1a4a8a')); rect(0, 106, 319, 106, hex('#1a4a8a'));
}

function d_agua(R, t, o) {
  const P = d_P, { rect, pset, disco, linea } = R;
  R.copiar(d_capa(R, 'agua', () => d_aguaFija(R)));
  R.recorte([0, 0, 199, 40]); d_nubes(R, t, 6, 30, [P.nubeS, P.nube, P.nubeL], 5, 7); R.recorte(null);
  // el agua: más honda abajo, con la red de cáusticas que se mueve y el foco que brilla
  for (let y = 111; y < 180; y++) { const d = (y - 111) / 69;
    for (let x = 0; x < 320; x++) {
      const v = Math.sin(x * 0.11 + t * 1.3 + Math.sin(y * 0.19 + t * 0.7) * 1.4) + Math.sin(y * 0.23 - t * 1.1 + Math.sin(x * 0.07 - t * 0.6) * 1.6), b = d_B4[(y & 3) * 4 + (x & 3)] / 16;
      let c = d + b * 0.25 > 0.75 ? P.piscinaD : d + b * 0.25 > 0.35 ? P.piscinaS : P.piscina;
      if (v > 1.45 - d * 0.3) c = P.piscinaL; else if (v > 1.1 - d * 0.3) c = d_mez(c, P.piscinaL, 0.45);
      pset(x, y, c);
    } }
  // el foco de la piscina, con su halo que late
  { const cx = 256, cy = 156, lat = 0.5 + Math.sin(t * 2.2) * 0.1; for (let j = -16; j <= 16; j++) for (let i = -22; i <= 22; i++) { const d = Math.hypot(i / 22, j / 16); if (d < 1 && (i + j) % 2 === 0) pset(cx + i, cy + j, d_mez(R.pget(cx + i, cy + j), hex('#e8fcff'), (1 - d) * lat)); }
    disco(cx, cy, 6, P.aceroS); disco(cx, cy, 5, hex('#f4ffff')); disco(cx - 1, cy - 1, 2, C.blanco); }
  // las burbujas que suben y una hoja que va a la deriva
  for (let k = 0; k < 9; k++) { const u = ((t * 0.3 + k * 0.11) % 1), x = Math.round(30 + h(k, 1, 482) * 260 + Math.sin(t * 3 + k) * 2), y = Math.round(178 - u * 66); R.anillo ? R.anillo(x, y, 1 + (k % 2), P.piscinaL) : disco(x, y, 1, P.piscinaL); pset(x - 1, y - 1, C.blanco); }
  { const x = Math.round(((t * 4) % 360) - 20), y = 112 + Math.round(Math.sin(t * 1.5)); rect(x, y, x + 5, y + 1, hex('#6a8a2a')); pset(x + 6, y, hex('#4a6a1a')); pset(x + 2, y - 1, hex('#8aaa3a')); }
  // la línea de flotación: ondas que corren y brillos
  for (let x = 0; x < 320; x++) { const yy = 111 + Math.round(Math.sin(x * 0.18 + t * 2.4) * 1.2); pset(x, yy, P.piscinaL); if ((x + Math.floor(t * 8)) % 9 < 3) pset(x, yy - 1, C.blanco); }
  if (o.flamenco !== false) d_flamenco(R, 118 + Math.round(Math.sin(t * 0.4) * 6), 104 + Math.round(Math.sin(t * 1.6) * 1.5), t, { s: 2 });
}

// lo de delante de cada vista
function d_tiendaDelanteGeneral(R, t, o) {
  const P = d_P, { rect, pset, disco, linea, poligono } = R;
  // EL CUBO amarillo de fregar con su escurridor y la fregona, en primer término abajo a la izquierda (o.cubo false, sin él)
  if (o.cubo !== false) { for (let x = 56; x < 82; x++) for (let y = 177; y < 180; y++) if ((x + y) % 2 === 0) pset(x, y, P.sombraD);
    rect(58, 162, 74, 177, C.k); rect(59, 163, 73, 176, P.amar); rect(59, 163, 73, 164, hex('#f8d870')); rect(71, 165, 73, 176, P.amarS); rect(60, 168, 72, 168, P.amarS);
    rect(62, 158, 72, 162, P.aceroD); rect(63, 159, 71, 161, P.aceroS); for (const x of [60, 72]) disco(x, 178, 1, C.k);
    linea(65, 160, 52, 132, P.maderaS); linea(66, 160, 53, 132, P.maderaL); for (let k = 0; k < 7; k++) linea(64 + k, 160, 63 + k * 1.4, 166, hex('#d8d0b8')); }
  if (o.mostrador === false) return;
  // EL MOSTRADOR: la encimera vista desde arriba (y 124–135), el frente de laminado con vetas (y 137–158), el zócalo y su sombra
  for (let y = 160; y < 166; y++) for (let x = 216; x < 320; x++) if ((x + y) % 2 === 0 || y < 160) pset(x, y, P.sombraD);
  poligono([[218, 135], [319, 135], [319, 124], [226, 124]], P.lamin); linea(226, 124, 319, 124, C.blanco); rect(218, 135, 319, 136, P.laminD); linea(218, 135, 226, 124, P.laminS);
  for (let k = 0; k < 14; k++) { const x = 228 + Math.floor(h(k, 2, 490) * 88), y = 126 + Math.floor(h(k, 3, 490) * 8); pset(x, y, P.laminS); }
  rect(218, 137, 319, 158, P.madera); for (let k = 0; k < 18; k++) { const vx = 220 + Math.floor(h(k, 1, 490) * 98); linea(vx, 138, vx + (k % 3) - 1, 157, k % 2 ? P.maderaL : P.maderaS); }
  for (const x of [222, 254, 286]) { rect(x, 140, x + 28, 155, P.maderaS); rect(x + 1, 141, x + 27, 154, P.madera); rect(x + 1, 141, x + 27, 141, P.maderaL); }
  rect(218, 158, 319, 160, P.zocalo); rect(218, 137, 218, 160, C.k);
  // el cartel de la lotería en el frente: el boleto con su «$5» y unas rayas
  rect(258, 141, 278, 154, C.k); rect(259, 142, 277, 153, P.amar); R.numero('$5', 268, 152, { color: P.rojo, centro: true, sombra: false, fina: true }); rect(260, 143, 276, 144, P.rojo);
  // encima: el expositor de dónuts (cristal, dos bandejas), la caja registradora con su pantalla, el datáfono y los chicles
  rect(226, 112, 250, 129, C.k); rect(227, 113, 249, 128, hex('#d8e8ec')); rect(227, 120, 249, 120, P.aceroS); rect(227, 128, 249, 128, P.aceroS);
  for (let k = 0; k < 4; k++) for (const [y, f] of [[117, 0], [125, 1]]) { const x = 230 + k * 5, c = [hex('#f2a0c0'), hex('#6a3a1e'), hex('#f2d8a0'), hex('#f2a0c0')][(k + f) % 4]; disco(x, y, 2, hex('#d8a060')); disco(x, y - 1, 1.6, c); pset(x, y - 1, hex('#e8d0a0')); pset(x - 1, y - 2, C.blanco); }
  for (let y = 114; y < 128; y++) if (y % 2) pset(229 + ((128 - y) >> 1) % 18, y, C.blanco);
  rect(292, 108, 312, 120, C.k); rect(293, 109, 311, 119, hex('#1a2a3a')); for (let l = 0; l < 3; l++) rect(295, 111 + l * 3, 295 + ((Math.floor(t * 1.4) + l * 4) % 12), 111 + l * 3, hex('#5ad8ff'));
  rect(300, 120, 304, 123, P.aceroD); rect(288, 123, 316, 130, hex('#2a2a32')); rect(289, 124, 315, 124, hex('#4a4a54')); for (let x = 291; x < 314; x += 3) pset(x, 127, hex('#6a6a74'));
  rect(278, 122, 284, 129, C.k); rect(279, 123, 283, 125, hex('#3a5a3a')); pset(281, 127, Math.floor(t * 2) % 2 ? hex('#5aff6a') : hex('#1a4a1a'));
  for (let k = 0; k < 5; k++) { const x = 254 + k * 4, c = d_BOT[(k * 3 + 2) % d_BOT.length]; rect(x, 126, x + 2, 131, c[0]); pset(x, 126, d_mez(c[0], C.blanco, 0.5)); rect(x, 131, x + 2, 131, c[1]); }
}

function d_autoDelante(R, t, o) {
  if (o.coche === false) return;
  const x = o.cocheX ?? 250;
  d_coche(R, x - 67, 168, 1, [hex('#c8c8d0'), hex('#8a8a96'), hex('#eeeef4')], 1.4, { freno: true, humo: t, conductor: true });
}

function d_ventanillaDelante(R, t, o) {
  const P = d_P, { rect, pset, poligono, linea } = R;
  // el alféizar de acero con su canto y una bolsa de papel doblada
  rect(204, 140, 296, 146, P.acero); rect(204, 140, 296, 140, P.aceroL); rect(204, 146, 296, 147, P.aceroD);
  rect(262, 128, 276, 140, P.bolsaPS); rect(263, 129, 275, 140, P.bolsaP); rect(263, 129, 275, 131, P.bolsaPL); linea(263, 132, 275, 132, P.bolsaPS); rect(267, 135, 271, 137, P.rojo);
  // la esquina de la mesa de acero, abajo a la izquierda, con su canto y su brillo
  poligono([[0, 162], [34, 162], [44, 180], [0, 180]], P.acero); linea(0, 162, 34, 162, P.aceroL); linea(34, 162, 44, 180, P.aceroD); for (let y = 164; y < 180; y += 3) linea(2, y, 30 + (y - 162) * 0.5, y, P.aceroS);
}

function d_piscinaDelante(R, t, o) {
  const P = d_P;
  // el pasamanos de delante de la escalerilla
  R.linea(234, 133, 234, 156, P.aluS); R.linea(235, 132, 235, 156, P.alu); R.rect(233, 131, 236, 132, P.alu); R.pset(235, 131, C.blanco);
}

function d_aguaDelante(R, t, o) {
  const P = d_P, B = R.buf;
  // lo que queda bajo la superficie se tiñe de agua; encima, las ondas de la línea de flotación
  for (let y = 114; y < 180; y++) { const a = 0.22 + (y - 114) / 66 * 0.25; for (let x = 0; x < 320; x++) { const i = y * 320 + x; B[i] = d_mez(B[i], P.piscina, a); } }
  for (let x = 0; x < 320; x++) { const yy = 112 + Math.round(Math.sin(x * 0.18 + t * 2.4) * 1.2); R.pset(x, yy, P.piscinaL); if ((x + Math.floor(t * 8)) % 9 < 2) R.pset(x, yy - 1, C.blanco); }
}

const d_VISTAS = { 'tienda/general': d_tiendaGeneral, 'tienda/pasillo': d_pasillo, 'autoservicio/general': d_autoservicio, 'autoservicio/ventanilla': d_ventanilla, 'piscina/general': d_piscina, 'piscina/agua': d_agua };

const d_DELANTE = { 'tienda/general': d_tiendaDelanteGeneral, 'autoservicio/general': d_autoDelante, 'autoservicio/ventanilla': d_ventanillaDelante, 'piscina/general': d_piscinaDelante, 'piscina/agua': d_aguaDelante };

// la vista que piden las opciones: un encuadre que no existe cae en el primero; una cámara que no es la suya, en 'general'
function h_vista(o) {
  const enc = V_SALON[o.encuadre] ? o.encuadre : 'salon', cam = o.camara && o.camara === V_SALON[enc].cam ? o.camara : 'general';
  return { enc, cam, geo: { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(V_SALON[enc][cam])) } };
}

// la trama de Bayer 4 × 4 (0–1) para los degradados y las luces tramadas
const h_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const h_b4 = (x, y) => (h_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// la mezcla de dos colores (f = 0: a; f = 1: b)
function h_mezcla(a, b, f) { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; }

// tiñe un píxel ya pintado hacia el color c en la proporción m
function h_tinte(R, x, y, m, c) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, h_mezcla(R.pget(x, y), c, m)); }

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function h_rr(R, cl, x0, y0, x1, y1, c) { const a = Math.max(Math.round(x0), cl[0]), b = Math.max(Math.round(y0), cl[1]), d = Math.min(Math.round(x1), cl[2]), f = Math.min(Math.round(y1), cl[3]); if (a <= d && b <= f) R.rect(a, b, d, f, c); }

// un degradado vertical tramado entre los colores cols (de arriba abajo); respeta R.recorte
function h_degradado(R, x0, y0, x1, y1, cols) { const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), fr = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, fr > h_b4(x, y) ? cols[i + 1] : cols[i]); } }

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba) con la base plana en cy; respeta R.recorte
function h_nube(R, cx, cy, w, k, [cS, c, cL]) {
  const n = 3 + Math.min(3, Math.floor(w / 14)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.72 + (h(k, i, 61) - 0.5) * 3, cy - m * w * 0.1 - h(k, i, 62) * 2, w * 0.14 + m * w * 0.09 + h(k, i, 63) * 2]); }
  for (let y = Math.floor(cy - w * 0.45); y <= cy; y++) for (let x = Math.floor(cx - w * 0.6); x <= cx + w * 0.6; x++) { let best = -1, dy = 0;
    for (const [bx, by, r] of B) { const d = ((x - bx) ** 2 + ((y - by) * 1.3) ** 2) / (r * r); if (d < 1 && 1 - d > best) { best = 1 - d; dy = (y - by) / r; } }
    if (best < 0) continue; const q = (h_b4(x, y) - 0.5) * 0.3; R.pset(x, y, cy - y < 2 || dy > 0.3 + q ? cS : dy < -0.3 + q ? cL : c); }
}

// los búferes de los fondos fijos, por R y por clave: se pintan una vez con R.nuevo() y se copian en cada fotograma
const h_CACHE = new WeakMap();

function h_fijo(R, clave, dibuja) {
  let m = h_CACHE.get(R); if (!m) h_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// la paleta del salón de Atom: la pared de estuco coral, el terrazo, la madera de teca, el sofá verde azulado
const h_P = Object.fromEntries(Object.entries({
  techo: '#c8a898', moldura: '#f0e0d0', molduraS: '#b89888', zocalo: '#f0e6da', zocaloS: '#a89088',
  teca: '#9a6438', tecaL: '#c08850', tecaS: '#6a4024', tecaV: '#7e5030', sofa: '#2e7478', sofaL: '#4a9a98', sofaS: '#1c4e54', sofaD: '#123438',
  tz: '#d8ccb8', tzS: '#b8a890', tzL: '#efe6d4', tzJ: '#a89070', alfombra: '#2a8a8a', alfombraS: '#1a6266', alfombraL: '#5ab8b0', alfombraB: '#f0d8a8',
  oliva: '#6a7a3a', olivaL: '#8a9a4a', olivaS: '#4a5a2a', caqui: '#d8c08a', caquiS: '#a88c5a', caquiL: '#f0dcaa',
  corcho: '#b88a58', corchoS: '#946a40', corchoL: '#d0a470', marco: '#6a4a30', marcoL: '#9a7048',
}).map(([k, v]) => [k, hex(v)]));

const h_PARED = ['#4e3442', '#6a4452', '#8a5a62', '#a87070', '#c48a80', '#d8a090', '#eab8a2', '#f6ceb4'].map(hex);

// la pared de estuco del salón entre x0..x1, y0..y1: la luz que da luz(x, y) (0–5 sobre la base 1,8), el grano del estuco
// (motas claras y oscuras) y, en las zonas tranquilas (la de Atom y la barra del año), lisa y tramada
function h_paredEstuco(R, x0, y0, x1, y1, luz) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const calma = (x >= 270 && y < 50) || (x >= 14 && x <= 176 && y < 22);
    let v = 1.8 + luz(x, y);
    if (!calma) { if (h(x >> 1, y >> 1, 7) > 0.9) v += 0.7; else if (h((x + 1) >> 1, (y + 1) >> 1, 8) > 0.92) v -= 0.7; if (h(x, y, 9) > 0.97) v -= 0.5; }
    let l = Math.floor(v); if (v - l > h_b4(x, y)) l++; R.pset(x, y, h_PARED[Math.max(0, Math.min(7, l))]);
  }
}

// una palmera a contraluz (para las ventanas): el tronco curvo con sus anillos y la copa de hojas que se mece con t
function h_palmera(R, x, suelo, alto, t, k, col, colL) {
  const lado = k % 2 ? 1 : -1, sw = Math.sin(t * 0.9 + k * 2) * alto * 0.035; let tx = x, ty = suelo;
  for (let i = 0; i <= alto; i++) { const u = i / alto; tx = Math.round(x + lado * Math.sin(u * 1.5) * alto * 0.14 + sw * u * u); ty = suelo - i; R.pset(tx, ty, col); R.pset(tx + 1, ty, i % 3 === 0 ? colL : col); if (u < 0.35) R.pset(tx - 1, ty, col); }
  for (let f = 0; f < 9; f++) { const a = -Math.PI + (f + 0.5) * Math.PI / 9 + (f < 4 ? -0.3 : f > 4 ? 0.3 : 0), L = alto * (0.42 + h(k, f, 71) * 0.15);
    for (let s = 1; s <= L; s++) { const u = s / L, px = Math.round(tx + Math.cos(a) * s + Math.sin(t * 2 + f + k) * u * 1.2), py = Math.round(ty + Math.sin(a) * s * 0.7 + u * u * L * 0.55); R.pset(px, py, col); if (s % 2 === 0 && u > 0.2) R.pset(px, py + 1 + (u > 0.6 ? 1 : 0), col); } }
}

// la mano de pintar números con sombra (para cifras pequeñas sobre papel: sin sombra de la interfaz)
const h_num = (R, txt, x, base, color, o = {}) => R.numero(txt, x, base, { color, sombra: false, ...o });

// la ventana corredera de noche (cl = el cristal): cielo tramado (del ocaso al añil con o.noche), estrellas que titilan, la
// luna, nubes de tres tonos a tres velocidades, las torres de enfrente con ventanas que se encienden, dos palmeras que se
// mecen, los faros de un coche que pasa y un avión con su luz que parpadea
function h_ventanaNoche(R, t, cl, noche) {
  const [x0, y0, x1, y1] = cl; R.recorte(cl);
  const NOCHE = ['#0c1032', '#141a46', '#1e2258', '#2e2a68', '#48327a', '#6a3a7e', '#8e467e'].map(hex), OCASO = ['#2a2a6a', '#4a3a8a', '#7a4a8e', '#b85a86', '#e87a72', '#ff9e6a', '#ffc078'].map(hex);
  const cols = noche >= 0.5 ? NOCHE : OCASO; h_degradado(R, x0, y0, x1, y1 - 18, cols);
  if (noche >= 0.5) for (let k = 0; k < 14; k++) { const sx = x0 + Math.floor(h(k, 1, 81) * (x1 - x0)), sy = y0 + Math.floor(h(k, 2, 81) * 30), b = Math.sin(t * (1.3 + k % 3) + k * 2); if (b > -0.3) R.pset(sx, sy, b > 0.6 ? hex('#f0ecff') : hex('#8a88c0')); }
  // la luna creciente con su halo
  { const mx = x1 - 14, my = y0 + 12; for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d < 6 && d > 4 && h_b4(mx + i, my + j) < 0.3) R.pset(mx + i, my + j, hex('#3a3a7a')); }
    R.disco(mx, my, 4, hex('#fff4d0')); R.disco(mx + 2, my - 1, 3, cols[1]); R.pset(mx - 2, my + 1, hex('#e8dcb0')); }
  // nubes a tres velocidades
  for (const [w, yy, v, k] of [[26, y0 + 22, 1.2, 0], [18, y0 + 34, 2.1, 1], [14, y0 + 14, 0.7, 2]]) { const cx = x0 - 20 + ((t * v + k * 37) % (x1 - x0 + 44)); h_nube(R, cx, yy, w, k + 5, noche >= 0.5 ? [hex('#24224e'), hex('#3a3466'), hex('#5a4a7e')] : [hex('#8a4a7a'), hex('#d87a7a'), hex('#ffc890')]); }
  // un avión que cruza alto, con su luz roja
  { const u = (t / 14) % 1, ax = Math.round(x1 + 6 - u * (x1 - x0 + 12)), ay = y0 + 6 + Math.round(u * 4); R.pset(ax, ay, hex('#c8c8d8')); R.pset(ax + 1, ay, hex('#8a8aa0')); if (Math.floor(t * 2) % 2) R.pset(ax + 2, ay, hex('#ff4a4a')); }
  // las torres de enfrente, con ventanas que se encienden y se apagan, y la bahía con el reflejo
  const hor = y1 - 18;
  for (const [a, b, top, k] of [[x0 - 2, x0 + 12, hor - 26, 0], [x0 + 10, x0 + 22, hor - 16, 1], [x0 + 28, x0 + 40, hor - 30, 2], [x0 + 38, x1 + 2, hor - 20, 3]]) {
    for (let y = top; y <= hor; y++) for (let x = a; x <= b; x++) R.pset(x, y, x === a ? hex('#2a2a54') : hex('#1a1a3c'));
    for (let y = top + 3; y < hor - 1; y += 3) for (let x = a + 2; x < b - 1; x += 3) { const on = h(x, y + Math.floor((t + k * 3 + x) / 5), 82) < 0.35; if (on) R.pset(x, y, h(x, y, 83) < 0.5 ? hex('#ffd88a') : hex('#c8e0ff')); }
    R.pset(Math.round((a + b) / 2), top - 1, Math.floor(t * 1.3 + k) % 2 ? hex('#ff4a4a') : hex('#5a1a2a')); }
  for (let y = hor + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) { const w = Math.sin(x * 0.6 + t * 2 + y) > 0.6 && (y - hor) % 3 === 1; R.pset(x, y, w ? hex('#5a5aa0') : y - hor < 3 ? hex('#202a5a') : hex('#141c44')); }
  for (let y = hor + 2; y <= y1; y += 2) { const x = x0 + 8 + Math.round(Math.sin(t * 3 + y) * 2); if ((y + Math.floor(t * 4)) % 3) R.pset(x, y, hex('#ffd88a')); }
  // los faros de un coche que pasa por el paseo
  { const u = (t / 6) % 1, cx = Math.round(x0 - 10 + u * (x1 - x0 + 20)); for (let i = 0; i < 6; i++) if (h_b4(cx + 3 + i, hor - 1) < 0.8 - i * 0.12) R.pset(cx + 3 + i, hor - 1, hex('#fff4c8')); R.rect(cx - 3, hor - 2, cx + 2, hor, hex('#0a0a1e')); R.pset(cx + 2, hor - 1, hex('#fff8d8')); R.pset(cx - 3, hor - 1, hex('#ff3a3a')); }
  h_palmera(R, x0 + 9, y1 + 2, 50, t, 0, hex('#06081a'), hex('#14183a')); h_palmera(R, x1 - 8, y1 + 2, 38, t, 1, hex('#06081a'), hex('#14183a'));
  R.recorte(null);
}

// la pantalla de la tele (cl): por omisión, el arte del juego (el ocaso con palmeras de la caja), la flecha de descarga que
// rebota y la barra de descarga con su número (o.descarga 0–100, con «%»; a 100 la barra se vuelve de oro con una señal
// de visto bueno); o.nota 0–1: el arte se oscurece y sale un 99 enorme de oro con rayos que giran; o.cien 0–1: el 99 se
// tambalea empujado y, al llegar a 1, es un 100 que tiembla; o.pantalla(R, t, cl): otra imagen (la dibuja la escena,
// recortada a la pantalla); o.tele === 'apagada': negra con su reflejo
function h_pantallaTele(R, t, cl, o) {
  const [x0, y0, x1, y1] = cl, w = x1 - x0, hh = y1 - y0;
  R.recorte(cl);
  if (o.tele === 'apagada') { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x - x0 + (y - y0) * 0.6) % 40 < 9 && h_b4(x, y) < 0.4 ? hex('#2a2e3e') : hex('#10121c')); R.recorte(null); return; }
  if (typeof o.pantalla === 'function') { o.pantalla(R, t, cl); R.recorte(null); return; }
  const nota = Math.max(0, Math.min(1, o.nota ?? 0)), cien = Math.max(0, Math.min(1, o.cien ?? 0));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c = h_arteCaja(((x - x0) / w) * 0.9 + 0.05 + Math.sin(t * 0.05) * 0.03, (y - y0) / hh, x, y); if (nota > 0 && h_b4(x, y) < nota * 0.7) c = h_mezcla(c, hex('#0a0618'), 0.7); R.pset(x, y, c); }
  // las líneas del televisor que bajan despacio
  { const ly = y0 + Math.floor((t * 9) % hh); for (let x = x0; x <= x1; x++) if (x % 2) h_tinte(R, x, ly, 0.12, C.blanco); }
  if (nota <= 0) {
    const d = Math.max(0, Math.min(100, o.descarga ?? 0)), by = y1 - 10, bx0 = x0 + 10, bx1 = x1 - 10, lleno = Math.round(bx0 + (bx1 - bx0) * d / 100);
    for (let y = by - 13; y <= y1 - 2; y++) for (let x = x0 + 4; x <= x1 - 4; x++) if (h_b4(x, y) < 0.55) h_tinte(R, x, y, 0.6, hex('#0a0618'));
    h_rr(R, cl, bx0 - 1, by - 1, bx1 + 1, by + 4, C.k); h_rr(R, cl, bx0, by, bx1, by + 3, hex('#2a2440'));
    if (lleno > bx0) { const oro = d >= 100; h_rr(R, cl, bx0, by, lleno, by + 3, oro ? hex('#e8b830') : hex('#30c8e0')); h_rr(R, cl, bx0, by, lleno, by, oro ? hex('#fff0a0') : hex('#a0f4ff'));
      const sx = bx0 + Math.floor((t * 40) % Math.max(1, lleno - bx0)); h_rr(R, cl, sx, by + 1, Math.min(lleno, sx + 3), by + 2, C.blanco); }
    const txt = Math.floor(d) + '%'; h_num(R, txt, bx1 - txt.length * 8 + 2, by - 4, C.blanco, { sombra: true });
    // la flecha de descarga que rebota sobre la bandeja (o el visto bueno al acabar)
    const ax = bx0 + 4, ay = by - 11 + (d < 100 ? Math.round(Math.abs(Math.sin(t * 4)) * -2) : 0);
    if (d < 100) { R.rect(ax, ay, ax + 2, ay + 3, C.blanco); R.poligono([[ax - 2, ay + 4], [ax + 4, ay + 4], [ax + 1, ay + 7]], C.blanco); R.rect(ax - 3, by - 3, ax + 5, by - 3, C.blanco); }
    else { R.linea(ax - 2, by - 6, ax, by - 4, hex('#7af07a')); R.linea(ax, by - 4, ax + 5, by - 9, hex('#7af07a')); R.linea(ax, by - 3, ax + 5, by - 8, hex('#3aa83a')); }
  } else {
    // el 99 enorme de oro, con rayos que giran detrás; empujado, se tambalea; al llegar a 1, un 100 que tiembla
    const cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2);
    for (let k = 0; k < 12; k++) { const a = t * 0.6 + k * Math.PI / 6; if (k % 2) continue; R.poligono([[cx, cy], [Math.round(cx + Math.cos(a) * 80), Math.round(cy + Math.sin(a) * 80)], [Math.round(cx + Math.cos(a + 0.22) * 80), Math.round(cy + Math.sin(a + 0.22) * 80)]], hex('#3a1e4a')); }
    const sale = Math.min(1, nota * 1.6), tam = sale < 0.5 ? 16 : 32;
    if (cien >= 1) { const sh = Math.round(Math.sin(t * 30) * 1); R.numero('100', cx + 1 + sh, cy + 11, { tam: 24, centro: true }); }
    else { const em = Math.round(cien * 8), tb = Math.round(Math.sin(t * 22) * 2 * cien); R.numero('99', cx + em + tb, cy + (tam === 32 ? 15 : 8) - Math.round(Math.abs(Math.sin(t * 3)) * (1 - cien)), { tam, centro: true }); }
    for (let k = 0; k < 5; k++) { const a = t * 1.3 + k * 1.26, r = 30 + Math.sin(t * 2 + k) * 4, px = Math.round(cx + Math.cos(a) * r * 1.3), py = Math.round(cy + Math.sin(a) * r * 0.6); if (Math.sin(t * 4 + k * 2) > 0) { R.pset(px, py, hex('#fff4b0')); R.pset(px - 1, py, hex('#e8b830')); R.pset(px + 1, py, hex('#e8b830')); R.pset(px, py - 1, hex('#e8b830')); R.pset(px, py + 1, hex('#e8b830')); } }
  }
  R.recorte(null);
  // el reflejo del cristal en la esquina de arriba
  for (let i = 0; i < 14; i++) { const px = x0 + 4 + i, py = y0 + 14 - i; if (px <= x1 && py >= y0) h_tinte(R, px, py, 0.18, C.blanco); }
}

// el calendario pequeño de la pared (x, y: esquina de arriba a la izquierda; 26 × 38): la foto de una playa arriba, el mes en
// rejilla de cuadritos, los días pasados tachados y el 19 en un círculo rojo cuando c ≥ 0,66 (o.calendario)
function h_calendarioPared(R, x, y, t, c) {
  const { rect, pset } = R, K = C.k;
  R.linea(x + 13, y - 4, x + 4, y, hex('#5a4030')); R.linea(x + 13, y - 4, x + 22, y, hex('#5a4030')); R.disco(x + 13, y - 4, 1, C.metalL);
  rect(x + 1, y + 1, x + 27, y + 39, hex('#7a5450')); rect(x, y, x + 26, y + 38, K); rect(x + 1, y + 1, x + 25, y + 37, hex('#f6f0e2'));
  for (let j = 0; j < 12; j++) for (let i = 0; i < 23; i++) pset(x + 2 + i, y + 2 + j, j < 5 ? (j + i * 0.2 < 4 ? hex('#7ac8f0') : hex('#a8dcf8')) : j < 8 ? ((i + j + Math.floor(t * 2)) % 6 === 0 ? hex('#a8f0f0') : hex('#3ab0c8')) : hex('#f0d898'));
  R.disco(x + 19, y + 4, 2, hex('#fff0a0')); for (let j = 0; j < 9; j++) pset(x + 5 + Math.round(j * 0.25), y + 12 - j, hex('#5a3a20')); for (const [a, b] of [[-3, 1], [3, 1], [-2, -1], [2, -1]]) R.linea(x + 7, y + 3, x + 7 + a, y + 3 + b + 1, hex('#2a7a3a'));
  rect(x + 2, y + 15, x + 24, y + 17, hex('#e85a5a'));
  for (let d = 0; d < 30; d++) { const i = d % 7, j = Math.floor(d / 7), cx = x + 3 + i * 3, cy = y + 19 + j * 3; rect(cx, cy, cx + 1, cy + 1, hex('#b8b0a0'));
    if (d < 18) pset(cx + 1, cy, hex('#c83a3a')); }
  if (c >= 0.66) { const cx = x + 3 + 4 * 3, cy = y + 19 + 2 * 3; const u = Math.min(1, (c - 0.66) / 0.34); for (let a = 0; a < 6.28 * u; a += 0.3) pset(Math.round(cx + 0.5 + Math.cos(a - 1.5) * 3), Math.round(cy + 0.5 + Math.sin(a - 1.5) * 2.4), hex('#e8202a')); }
}

// el ventilador de techo (cx, cy: el motor): la barra, el motor con la tulipa encendida y las cuatro aspas de madera que
// giran con su estela
function h_ventilador(R, cx, cy, t) {
  R.rect(cx - 1, 0, cx, cy - 3, hex('#5a4a40')); R.rect(cx - 6, cy - 3, cx + 5, cy + 1, C.k); R.rect(cx - 5, cy - 2, cx + 4, cy, hex('#8a6a4a')); R.rect(cx - 5, cy - 2, cx + 4, cy - 2, hex('#b89068'));
  for (let k = 0; k < 4; k++) { const a = t * 6 + k * Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a), delante = sa > 0;
    for (const [da, m] of [[-0.35, 0.5], [0, 1]]) { const a2 = a + da, c2 = Math.cos(a2), s2 = Math.sin(a2);
      for (let r = 5; r <= 26; r++) { const px = Math.round(cx + c2 * r), py = Math.round(cy + 1 + s2 * 2.2); if (m < 1) { if (h_b4(px, py) < 0.3) R.pset(px, py, hex('#a87a5a')); continue; }
        R.pset(px, py, delante ? hex('#7a5434') : hex('#5a3a24')); R.pset(px, py + 1, delante ? hex('#a87a50') : hex('#6a4a30')); } } }
  R.rect(cx - 3, cy + 2, cx + 2, cy + 4, C.k); R.rect(cx - 2, cy + 2, cx + 1, cy + 3, hex('#fff0c0'));
}

// el fondo fijo del salón (la pared, el techo, los muebles de la pared y el suelo de terrazo con sus reflejos)
function h_salonFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = h_P;
  // la pared de estuco: la luz cálida de la lámpara de pie, la del ventilador y el resplandor azul de la tele
  h_paredEstuco(R, 0, 8, 319, 123, (x, y) => { const l = Math.max(0, 1 - Math.hypot(x - 133, (y - 92) * 1.15) / 130) * 3.2, f = Math.max(0, 1 - Math.hypot(x - 214, (y - 10) * 1.4) / 90) * 1.3, v = -Math.max(0, (Math.abs(x - 160) - 130) / 60); return 0.5 + l + f + v + (y > 110 ? -0.4 : 0); });
  for (let y = 30; y < 124; y++) for (let x = 130; x < 270; x++) { const d = Math.max(Math.abs(x - 200) - 50, Math.abs(y - 75) - 29, 0); if (d > 0 && d < 22 && h_b4(x, y) < (1 - d / 22) * 0.5) h_tinte(R, x, y, 0.2, hex('#6a8ae8')); }
  // el techo y la moldura
  rect(0, 0, 319, 4, P.techo); for (let x = 0; x < 320; x++) if (h_b4(x, 2) < 0.2) pset(x, 2, P.molduraS); rect(0, 5, 319, 7, P.moldura); rect(0, 7, 319, 7, P.molduraS); rect(0, 8, 319, 8, h_PARED[2]);
  // el zócalo y el suelo de terrazo en perspectiva (juntas de latón, granos de colores) con el reflejo de la lámpara y de la tele
  rect(0, 122, 319, 126, P.zocalo); rect(0, 122, 319, 122, C.blanco); rect(0, 126, 319, 126, P.zocaloS);
  const filas = [127, 131, 136, 142, 149, 157, 166, 176];
  for (let y = 127; y < 180; y++) for (let x = 0; x < 320; x++) {
    const u = (x - 160) * 200 / (y - 60) + 160, junta = Math.abs(u - Math.round(u / 34) * 34) < 0.5 + (y - 127) * 0.004 * 0 + 0.35, fila = filas.includes(y);
    let c = P.tz; const n = h(x, y, 21); if (n > 0.93) c = P.tzS; else if (n > 0.9) c = hex('#c88a78'); else if (n > 0.875) c = hex('#6a9a98'); else if (n < 0.04) c = P.tzL;
    if (junta || fila) c = P.tzJ;
    pset(x, y, c);
  }
  for (let y = 127; y < 180; y++) for (let x = 0; x < 320; x++) { const s = (y - 127) / 53; if (h_b4(x, y) < (1 - s) * 0.45) h_tinte(R, x, y, 0.28, hex('#4a3040')); }
  for (let y = 127; y < 160; y++) for (let x = 150; x < 251; x++) if (h_b4(x, y) < 0.42 - (y - 127) * 0.012 && Math.abs(x - 200) < 46 - (y - 127) * 0.4) h_tinte(R, x, y, 0.3, hex('#7aa8f0'));
  for (let y = 127; y < 168; y++) for (let x = 120; x < 148; x++) if (h_b4(x, y) < 0.4 - Math.abs(x - 133) * 0.03 - (y - 127) * 0.008) h_tinte(R, x, y, 0.35, hex('#fff0c0'));
  // la alfombra tropical en perspectiva (verde azulado con la orla clara y hojas de palmera)
  poligono([[70, 140], [262, 140], [292, 179], [36, 179]], P.alfombraS); poligono([[72, 141], [260, 141], [289, 178], [39, 178]], P.alfombra);
  poligono([[78, 144], [254, 144], [279, 175], [49, 175]], P.alfombraB); poligono([[80, 145], [252, 145], [276, 174], [52, 174]], P.alfombra);
  for (let k = 0; k < 9; k++) { const cx = 90 + k * 22 + (k % 2) * 6, cy = 152 + (k % 3) * 7; for (let s = 0; s < 9; s++) { pset(cx + s, cy - Math.round(s * 0.4), P.alfombraL); if (s % 2) { pset(cx + s, cy - Math.round(s * 0.4) + 1, P.alfombraL); pset(cx + s - 1, cy - Math.round(s * 0.4) - 1, P.alfombraS); } } }
  for (let y = 142; y < 178; y++) for (let x = 40; x < 290; x++) if (R.pget(x, y) === P.alfombra && h(x, y, 22) > 0.9) pset(x, y, P.alfombraS);
  for (let x = 72; x <= 260; x += 3) pset(x, 139, P.alfombraB);
  // el colgador: la tabla con dos pomos, la mochila verde oliva (bolsillos, correas, hebillas, el mapa enrollado y la guía
  // naranja que asoma) y el sombrero de explorador
  rect(3, 29, 28, 32, K); rect(4, 30, 27, 31, P.tecaL); rect(4, 31, 27, 31, P.teca); for (const x of [9, 21]) { rect(x - 1, 33, x + 1, 35, K); pset(x, 33, P.tecaL); }
  rect(13, 36, 29, 76, K); rect(14, 37, 28, 75, P.oliva); rect(14, 37, 15, 75, P.olivaL); rect(27, 37, 28, 75, P.olivaS);
  rect(13, 36, 29, 44, K); rect(14, 37, 28, 43, P.olivaL); rect(14, 43, 28, 43, P.olivaS); rect(20, 42, 22, 46, K); pset(21, 44, C.oroL);
  rect(15, 52, 27, 68, K); rect(16, 53, 26, 67, P.oliva); rect(16, 53, 26, 53, P.olivaL); rect(16, 58, 26, 58, P.olivaS); rect(20, 56, 22, 57, C.oro);
  rect(16, 47, 21, 53, K); rect(17, 48, 20, 52, hex('#e8803a')); rect(17, 48, 20, 48, hex('#f8b060')); pset(18, 50, hex('#2a7a3a')); pset(19, 50, hex('#2a7a3a')); pset(18, 51, hex('#5a3a20'));
  rect(27, 46, 31, 70, K); rect(28, 47, 30, 69, hex('#f0e6c8')); for (let y = 49; y < 69; y += 4) rect(28, y, 30, y, hex('#c8a870'));
  linea(16, 36, 21, 33, K); linea(26, 36, 21, 33, K); rect(14, 74, 28, 76, P.olivaS);
  for (let j = 0; j < 6; j++) rect(8 - j, 36 + j, 10 + j, 36 + j, j < 4 ? P.caqui : P.caquiS); rect(1, 41, 17, 43, K); rect(2, 41, 16, 42, P.caqui); rect(2, 41, 16, 41, P.caquiL);
  rect(4, 39, 14, 40, hex('#6a4a30')); rect(5, 35, 13, 35, P.caquiL);
  // el tablón de corcho del mapa con su marco de madera (el mapa lo pone la vida)
  rect(29, 37, 113, 105, K); rect(30, 38, 112, 104, P.marco); rect(30, 38, 112, 38, P.marcoL); rect(30, 38, 30, 104, P.marcoL);
  for (let y = 41; y < 102; y++) for (let x = 33; x < 110; x++) { const n = h(x, y, 23); pset(x, y, n > 0.8 ? P.corchoS : n < 0.15 ? P.corchoL : P.corcho); }
  rect(33, 41, 109, 41, P.corchoS);
  // dos fotos (polaroid) y una entrada clavadas debajo del mapa
  for (const [px, k] of [[40, 0], [56, 1]]) { rect(px, 93, px + 10, 102, K); rect(px + 1, 94, px + 9, 101, C.blanco); rect(px + 2, 95, px + 8, 99, k ? hex('#3ab0c8') : hex('#f0a060')); if (k) disco(px + 5, 97, 1, hex('#3a4a2a')); else rect(px + 2, 98, px + 8, 99, hex('#5a3a50')); }
  rect(74, 95, 104, 101, K); rect(75, 96, 103, 100, hex('#f8e8a0')); for (let x = 77; x < 101; x += 2) pset(x, 98, hex('#c8a040')); rect(96, 96, 96, 100, hex('#c8a040'));
  // la lámpara de pie: el pie, la barra de latón y la pantalla de tela encendida
  rect(127, 125, 139, 127, K); rect(128, 125, 138, 126, hex('#b8903a')); rect(132, 98, 134, 125, K); rect(133, 98, 133, 125, hex('#e8c060'));
  R.halo(133, 92, 22, [hex('#c88a70'), hex('#d8a080'), hex('#e8b890'), hex('#f6d0a8')], 0.9);
  poligono([[121, 99], [145, 99], [140, 84], [126, 84]], K); poligono([[122, 98], [144, 98], [139, 85], [127, 85]], hex('#f8e4b0')); poligono([[136, 98], [144, 98], [139, 85], [135, 85]], hex('#e8c88a'));
  rect(122, 98, 144, 98, hex('#fff6d8'));
  // el mueble bajo de la tele (teca, puertas de listones, patas cónicas) y lo que hay encima: la barra de sonido, el
  // descodificador, la consola blanca de pie con su luz, la pila de juegos y una piña de cerámica
  rect(138, 108, 264, 121, K); rect(139, 109, 263, 120, P.teca); rect(139, 109, 263, 109, P.tecaL); rect(139, 120, 263, 120, P.tecaS);
  for (const [a, b] of [[141, 180], [182, 221], [223, 261]]) { rect(a, 111, b, 119, P.tecaS); for (let x = a + 1; x < b; x += 2) rect(x, 111, x, 119, P.tecaV); rect(b - 4, 114, b - 3, 116, C.oroL); }
  for (const x of [142, 258]) { linea(x, 121, x - 1, 125, K); linea(x + 1, 121, x + 1, 125, P.tecaS); }
  rect(170, 104, 230, 107, K); rect(171, 105, 229, 106, hex('#2a2a32')); for (let x = 173; x < 228; x += 2) pset(x, 105, hex('#3e3e4a'));
  rect(146, 101, 166, 107, K); rect(147, 102, 165, 106, hex('#26262e')); rect(147, 102, 165, 102, hex('#3e3e48'));
  rect(232, 88, 242, 107, K); rect(233, 89, 241, 106, hex('#eef0f4')); rect(233, 89, 234, 106, C.blanco); rect(240, 89, 241, 106, hex('#b8bcc8')); rect(236, 89, 238, 106, hex('#1a1a22'));
  for (let k = 0; k < 4; k++) { rect(245, 104 - k * 2, 257, 105 - k * 2, K); rect(246, 104 - k * 2, 256, 104 - k * 2, [hex('#1a2a5a'), hex('#c83a3a'), hex('#1a2a5a'), hex('#3a8a4a')][k]); }
  disco(252, 94, 3, K); disco(252, 94, 2, hex('#e8c040')); pset(251, 93, hex('#fff0a0')); for (const [a, b] of [[-2, -5], [0, -6], [2, -5]]) linea(252, 91, 252 + a, 91 + b, hex('#3a8a3a'));
  // la tele de pantalla plana: el bisel negro con su filo, el piloto y el pie
  rect(150, 46, 250, 104, K); rect(151, 47, 249, 103, hex('#16161e')); rect(151, 47, 249, 47, hex('#3a3a48')); rect(198, 102, 202, 103, hex('#3a3a48'));
  rect(190, 104, 210, 104, K);
  // la puerta corredera: el marco de aluminio, la cenefa, las persianas verticales recogidas y la cortina; el carril
  rect(262, 48, 318, 125, K); rect(263, 49, 317, 124, hex('#d8dce4')); rect(263, 49, 317, 49, C.blanco); rect(264, 51, 316, 123, K);
  rect(258, 46, 319, 50, K); rect(259, 47, 319, 49, hex('#e8d8c8')); rect(259, 49, 319, 49, hex('#b8a090'));
  // el gecko se pinta en la vida; la planta de ave del paraíso está delante (vida)
}

// el salón de Atom de noche (plano general): ver la cabecera de salon()
function h_salonGeneral(R, t, o, geo) {
  const { rect, pset, disco, linea } = R, noche = o.noche ?? 1;
  h_fijo(R, 'salon', () => h_salonFijo(R));
  // la ventana: la noche detrás del cristal, los montantes, los reflejos de la habitación y las persianas recogidas
  h_ventanaNoche(R, t, [265, 52, 315, 122], noche);
  rect(289, 51, 291, 123, hex('#c8ccd4')); rect(289, 51, 289, 123, C.blanco); rect(291, 51, 291, 123, hex('#8a8ea0'));
  for (const gx of [270, 296]) for (let i = 0; i < 18; i++) { const px = gx + Math.round(i * 0.6), py = 118 - i * 3; if (py > 52) { h_tinte(R, px, py, 0.18, C.blanco); h_tinte(R, px + 1, py, 0.1, C.blanco); } }
  for (let k = 0; k < 6; k++) { const x = 263 + k * 2, sw = Math.round(Math.sin(t * 0.8 + k) * 0.6); rect(x + sw, 50, x + sw + 1, 118, k % 2 ? hex('#eae2d2') : hex('#d4c8b4')); pset(x + sw, 119, hex('#a89880')); }
  for (let i = 0; i < 5; i++) for (let y = 50; y < 124; y++) { const sw = Math.round(Math.sin(t * 1.1 + y * 0.04) * 1.2 * ((y - 50) / 74)); pset(315 + i + sw, y, (i + Math.floor(y / 30)) % 3 ? hex('#e86a5a') : hex('#b8463e')); }
  // el ventilador del techo
  h_ventilador(R, 214, 9, t);
  // la tele
  h_pantallaTele(R, t, geo.pantalla, o);
  if ((o.tele !== 'apagada')) for (let y = 104; y < 108; y++) for (let x = 156; x < 246; x++) if (h_b4(x, y) < 0.15 + 0.08 * Math.sin(t * 9)) h_tinte(R, x, y, 0.25, hex('#8ab0ff'));
  pset(246, 102, Math.floor(t) % 2 ? hex('#ff5a3a') : hex('#8a2a1a'));
  // la consola: su raya de luz que respira
  { const b = 0.5 + 0.5 * Math.sin(t * 2.2); for (let y = 90; y < 106; y++) pset(237, y, h_mezcla(hex('#2a6ac8'), hex('#9ae8ff'), b)); pset(235, 104, hex('#3af0ff')); }
  // el mapa de Florida en el tablón, con sus chinchetas y el hilo rojo (o.tachas 0–4: los sitios que Atom ya ha visto,
  // con una cruz)
  const m = a_mapaLeonida(R, 35, 44, 72, t, { florida: o.florida ?? 1, encendidas: o.encendidas ?? 0, montana: o.montana ?? 0 });
  const sitios = [m.miami, m.regiones.grassrivers, m.regiones.cayos, m.regiones.kalaga], tachas = o.tachas ?? 0;
  for (let k = 0; k < 3; k++) { const [a, b] = [sitios[k], sitios[k + 1]]; for (let i = 0; i <= 12; i++) { const u = i / 12; pset(Math.round(lerp(a[0], b[0], u)), Math.round(lerp(a[1], b[1], u) + Math.sin(u * Math.PI) * 2), hex('#c8202a')); } }
  sitios.forEach(([sx, sy], k) => { R.disco(sx, sy - 1, 1, C.k); pset(sx, sy - 2, [hex('#ff4a4a'), hex('#4aa8ff'), hex('#ffd84a'), hex('#4ae87a')][k]);
    if (k < tachas) { const u = Math.min(1, tachas - k); R.linea(sx - 3, sy - 4, sx - 3 + Math.round(6 * u), sy - 4 + Math.round(6 * u), C.rojo); if (u >= 1) R.linea(sx + 3, sy - 4, sx - 3, sy + 2, C.rojo); } });
  // el calendario
  h_calendarioPared(R, 116, 40, t, o.calendario ?? 0);
  // la lámpara parpadea apenas; una polilla da vueltas alrededor
  if (Math.sin(t * 17) > 0.97) for (let x = 127; x < 140; x++) pset(x, 86, hex('#fffbe8'));
  { const a = t * 3.1, px = Math.round(133 + Math.cos(a) * 9), py = Math.round(90 + Math.sin(a * 1.7) * 5); pset(px, py, hex('#5a4a3a')); pset(px + (Math.floor(t * 12) % 2 ? 1 : -1), py - 1, hex('#8a7a6a')); }
  // el gecko que sube y baja por la pared junto a la ventana (y se para a mirar)
  { const u = (t / 9) % 2, f = u < 1 ? u : 2 - u, gy = Math.round(90 - f * 30 + (Math.sin(t * 2) > 0.7 ? 1 : 0)), gx = 256, sube = u < 1, c = hex('#7ac85a'), cs = hex('#4a8a3a');
    rect(gx, gy, gx + 1, gy + 5, c); pset(gx, gy + (sube ? -1 : 6), cs); pset(gx + 1, gy + (sube ? -1 : 6), cs); const p = Math.floor(t * 6) % 2;
    pset(gx - 1, gy + 1 + p, cs); pset(gx + 2, gy + 2 - p, cs); pset(gx - 1, gy + 4 - p, cs); pset(gx + 2, gy + 3 + p, cs); for (let i = 0; i < 4; i++) pset(gx + (i % 2), gy + (sube ? 6 + i : -1 - i), cs); }
  // la planta de ave del paraíso delante de la ventana, que se mece con el aire del ventilador
  { const bx = 304, by = 132; rect(bx - 8, by - 9, bx + 8, by, C.k); rect(bx - 7, by - 8, bx + 7, by, hex('#c86a48')); rect(bx - 7, by - 8, bx + 7, by - 7, hex('#e88a68')); rect(bx + 4, by - 6, bx + 6, by - 1, hex('#a8503a'));
    for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.32, L = 22 + (k % 3) * 6, sw = Math.sin(t * 1.4 + k) * 1.5;
      const ex = Math.round(bx + Math.cos(a) * L * 0.6 + sw), ey = Math.round(by - 9 + Math.sin(a) * L); linea(bx + (k - 3), by - 9, ex, ey + 6, hex('#3a6a2a'));
      for (let j = 0; j < 8; j++) { const px = ex + Math.round((j - 4) * 0.4), py = ey + j; pset(px - 1, py, hex('#2e6a3a')); pset(px, py, hex('#4a9a4a')); pset(px + 1, py, j < 3 ? hex('#7ac85a') : hex('#3a7a3a')); } }
    const fx = bx - 5 + Math.round(Math.sin(t * 1.4) * 1.5); linea(bx - 2, by - 9, fx, by - 30, hex('#3a6a2a')); for (const [a, b, c] of [[0, 0, '#ff8a2a'], [1, -1, '#ff8a2a'], [2, -2, '#ffa83a'], [3, -2, '#3a5ae8'], [-1, 0, '#e86a2a']]) pset(fx + a, by - 31 + b, hex(c)); }
  // motas de polvo en la luz de la lámpara
  for (let k = 0; k < 10; k++) { const fy = (h(k, 3, 24) * 50 + t * (1.5 + h(k, 4, 24) * 2)) % 50, x = Math.round(118 + h(k, 5, 24) * 30 + Math.sin(t * 0.7 + k) * 3), y = Math.round(126 - fy); if (Math.sin(t * 1.3 + k * 2) > -0.2) pset(x, y, hex('#fff2d0')); }
  return geo;
}

// delante en el salón: el respaldo del sofá, el gato y la mesita baja con la caja, el mando, las palomitas y el vaso
function h_salonDelante(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = h_P;
  // la mesita baja de teca: tablero en perspectiva con vetas, canto, faldón y patas cónicas; su sombra en la alfombra
  for (let y = 172; y < 180; y++) for (let x = 112; x < 222; x++) if (h_b4(x, y) < 0.45) h_tinte(R, x, y, 0.35, hex('#0a2a2a'));
  for (const [x, d] of [[120, -1], [206, 1]]) { linea(x, 168, x + d * 3, 179, K); linea(x + 1, 168, x + 1 + d * 3, 179, P.tecaS); linea(x + 2, 168, x + 2 + d * 3, 179, K); }
  poligono([[113, 159], [213, 159], [218, 166], [108, 166]], K); poligono([[114, 160], [212, 160], [216, 165], [110, 165]], P.teca);
  for (let k = 0; k < 4; k++) for (let x = 112; x < 216; x++) if (h(x >> 2, k, 25) > 0.35) pset(x, 161 + k + Math.round(Math.sin(x * 0.07 + k) * 0.6), P.tecaV);
  rect(114, 160, 212, 160, P.tecaL); rect(108, 166, 218, 169, K); rect(109, 166, 217, 168, P.tecaS); rect(109, 166, 217, 166, P.tecaL);
  // en la mesita: la guía de viaje y el mando, la caja, el bol de palomitas y el vaso con burbujas
  rect(140, 159, 158, 162, K); rect(141, 160, 157, 161, hex('#e8803a')); rect(141, 160, 157, 160, hex('#f8b060')); rect(142, 161, 157, 161, hex('#f0e6c8'));
  rect(160, 158, 176, 161, K); rect(161, 159, 175, 160, hex('#2a2a32')); pset(163, 159, hex('#e83a3a')); for (let x = 166; x < 174; x += 2) pset(x, 159, hex('#8a8a9a'));
  const caja = o.caja === false ? null : a_caja(R, 114, 139, t, { abierta: o.abierta ?? 0, sacude: o.sacude ?? 0 });
  poligono([[182, 155], [206, 155], [202, 162], [186, 162]], K); poligono([[183, 156], [205, 156], [201, 161], [187, 161]], hex('#e84a4a'));
  for (let x = 185; x < 204; x += 4) rect(x, 156, x + 1, 161, C.blanco);
  for (let k = 0; k < 14; k++) { const px = 185 + Math.round(h(k, 1, 26) * 18), py = 154 + Math.round(h(k, 2, 26) * 2); disco(px, py, 1, hex('#fff4d0')); pset(px, py + 1, hex('#e8c87a')); }
  { const u = (t * 0.7) % 1; if (u < 0.35) { const v = u / 0.35, px = Math.round(196 + v * 8), py = Math.round(152 - Math.sin(v * Math.PI) * 6); disco(px, py, 1, hex('#fffbea')); } }
  rect(208, 153, 214, 162, K); rect(209, 154, 213, 161, hex('#8a3a2a')); rect(209, 154, 213, 155, hex('#d8a090')); rect(209, 154, 209, 161, hex('#c8786a'));
  for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1; pset(210 + (k % 2), Math.round(160 - u * 5), hex('#e8a090')); }
  linea(212, 154, 214, 150, hex('#e83a5a'));
  // el respaldo del sofá en primer término: el tapizado verde azulado con su luz, los cojines que asoman y la manta de ganchillo
  for (let x = -2; x <= 90; x++) { const top = 154 + (x < 2 ? 2 - x : 0); rect(x, top, x, 179, P.sofa); pset(x, top, K); pset(x, top + 1, P.sofaL); pset(x, top + 2, P.sofaL); pset(x, top + 3, h_b4(x, top + 3) < 0.5 ? P.sofaL : P.sofa); }
  for (let y = 160; y < 180; y++) for (let x = 0; x < 90; x++) if (h_b4(x, y) < (y - 158) / 40) pset(x, y, P.sofaS);
  for (let x = 6; x < 88; x += 14) for (let y = 163; y < 180; y += 6) { pset(x, y, P.sofaD); pset(x - 1, y - 1, P.sofaL); pset(x + 1, y + 1, P.sofaS); }
  // el brazo enrollado del sofá, a la derecha, con su espiral
  for (let y = 146; y < 180; y++) for (let x = 84; x <= 102; x++) { const cx = 93, top = 146, r = Math.hypot(x - cx, (y - 153) * 1.1); if (y < 153 && r > 9) continue; const borde = (y < 153 && r > 8) || x === 84 || x === 102;
    pset(x, y, borde ? K : y < 150 ? P.sofaL : x > 97 ? P.sofaS : (y > 160 && h_b4(x, y) < 0.4 ? P.sofaS : P.sofa)); }
  for (let a = 0; a < 9; a += 0.4) { const r = 1 + a * 0.5; pset(Math.round(93 + Math.cos(a) * r), Math.round(153 + Math.sin(a) * r), P.sofaD); }
  for (const [cx, c, cl] of [[22, '#e8805a', '#f8b08a'], [56, '#e8c040', '#f8e080']]) { for (let j = -5; j <= 7; j++) for (let i = -8; i <= 8; i++) { const e = (Math.abs(i) / 8) ** 3 + (Math.abs(j) / 7) ** 3; if (e > 1) continue; pset(cx + i, 154 + j, e > 0.7 ? K : (i + j < -5 ? hex(cl) : i + j > 6 ? h_mezcla(hex(c), K, 0.2) : hex(c))); } for (let i = -5; i <= 5; i += 2) pset(cx + i, 155 + (i & 2 ? 1 : 0), h_mezcla(hex(c), K, 0.35)); }
  for (let y = 155; y < 180; y++) { const w = 12 - Math.round((y - 155) * 0.1); for (let x = 2; x < 2 + w; x++) pset(x, y, ((x + y) % 4 < 2) ? hex('#f0e0c0') : hex('#c8a878')); pset(2 + w, y, K); }
  for (let x = 2; x < 14; x += 2) pset(x, 179, hex('#f8f0d8'));
  // el gato atigrado dormido en el respaldo, que respira y mueve la cola
  { const gx = 72, gy = 156, r = Math.sin(t * 2) > 0 ? 1 : 0; disco(gx, gy - 3, 6 + r, K); disco(gx, gy - 3, 5 + r, hex('#e8903a')); for (let i = -4; i <= 4; i += 2) pset(gx + i, gy - 6 - r, hex('#b8602a'));
    disco(gx + 6, gy - 4, 4, K); disco(gx + 6, gy - 4, 3, hex('#f0a050')); pset(gx + 4, gy - 8, K); pset(gx + 8, gy - 8, K); pset(gx + 5, gy - 7, hex('#f0a050')); pset(gx + 7, gy - 7, hex('#f0a050'));
    pset(gx + 5, gy - 4, K); pset(gx + 7, gy - 4, K); pset(gx + 6, gy - 3, hex('#e86a6a'));
    const c = Math.sin(t * 1.6) * 3; for (let i = 0; i < 9; i++) { const px = gx - 5 - i, py = gy - 1 + Math.round(Math.sin(i * 0.5 + t * 1.6) * c * 0.3 * (i / 9)) - (i > 6 ? 1 : 0); pset(px, py, K); pset(px, py - 1, i % 3 ? hex('#e8903a') : hex('#b8602a')); }
    if (Math.floor(t * 0.5) % 4 === 0) { const u = (t * 0.5) % 1; pset(gx + 10 + Math.round(u * 4), gy - 12 - Math.round(u * 6), hex('#f6f2ea')); } }
  return { caja };
}

// el fondo fijo: el sofá visto de frente al fondo, en penumbra (cojines, manta), la pared con el tablón borroso, y el
// tablero de la mesita con sus vetas en perspectiva
function h_mesaFijo(R) {
  const { rect, pset, disco, poligono } = R, K = C.k, P = h_P;
  h_paredEstuco(R, 0, 0, 319, 56, (x, y) => 0.2 + Math.max(0, 1 - Math.hypot(x - 300, y - 40) / 170) * 1.8);
  // en la pared, desenfocados: el cuadro del flamenco (fondo rosa, el ave a una pata) y el aplique encendido
  rect(32, 24, 104, 52, K); rect(33, 25, 103, 51, P.marcoL); rect(35, 27, 101, 49, hex('#f0a8a0')); for (let y = 27; y < 50; y++) for (let x = 35; x < 102; x++) if (h_b4(x, y) < (y - 27) / 40) pset(x, y, hex('#f8c8a8'));
  disco(70, 33, 4, hex('#e85a7a')); R.linea(70, 33, 64, 30, hex('#e85a7a')); R.linea(64, 30, 63, 34, hex('#e85a7a')); disco(72, 38, 7, hex('#e85a7a')); disco(70, 37, 5, hex('#ff8aa0')); R.linea(72, 44, 72, 50, hex('#c84a6a')); R.linea(72, 46, 76, 44, hex('#c84a6a'));
  rect(178, 24, 226, 52, K); rect(179, 25, 225, 51, P.marcoL); for (let y = 27; y < 50; y++) for (let x = 181; x < 224; x++) pset(x, y, h_arteCaja((x - 181) / 43, (y - 27) / 23, x, y));
  R.halo(250, 34, 18, [h_PARED[4], h_PARED[5], h_PARED[6], hex('#ffe4c0')], 0.9); rect(246, 28, 254, 40, K); rect(247, 29, 253, 39, hex('#fff0c8')); rect(248, 40, 252, 44, hex('#b8903a'));
  // el sofá de frente: los brazos enrollados, los tres cojines del respaldo (con luz, sombra, botones y costuras), el
  // asiento con su vivo y el faldón
  const tono = (y, a, b, v) => { const f = (y - a) / (b - a) + v; return f < 0.15 ? P.sofaL : f > 0.8 ? P.sofaS : P.sofa; };
  rect(-2, 54, 322, 112, K); for (let y = 55; y < 112; y++) for (let x = 0; x < 320; x++) pset(x, y, P.sofaD);
  for (const x0 of [16, 112, 208]) { const x1 = x0 + 94; for (let y = 56; y < 90; y++) for (let x = x0; x <= x1; x++) { const r = Math.min(x - x0, x1 - x, y - 56, 89 - y); if (r < 0 || (r < 3 && ((x - x0 < 3 || x1 - x < 3) && (y - 56 < 3 || 89 - y < 3)) && Math.hypot(Math.min(x - x0, x1 - x) - 3, Math.min(y - 56, 89 - y) - 3) > 3)) continue;
      pset(x, y, r === 0 ? K : tono(y, 56, 90, (x - x0) / 400 + (h_b4(x, y) - 0.5) * 0.12)); }
    for (let k = 0; k < 3; k++) { const bx = x0 + 24 + k * 23, by = 71; pset(bx, by, P.sofaD); pset(bx - 1, by - 1, P.sofaS); pset(bx + 1, by + 1, P.sofaL); for (let i = 1; i < 6; i++) { pset(bx - i, by - i, P.sofaS); pset(bx + i, by - i, P.sofaS); } } }
  for (const [a, b, d] of [[-12, 16, 1], [304, 332, -1]]) for (let y = 62; y < 112; y++) for (let x = a; x <= b; x++) { const cx = d > 0 ? b - 6 : a + 6, rr = Math.hypot(x - cx, (y - 68) * 1.0); if (y < 68 && rr > 8) continue;
    pset(x, y, x === (d > 0 ? b : a) ? K : y < 66 ? P.sofaL : (x - cx) * d > 3 ? P.sofaS : P.sofa); }
  for (let y = 88; y < 112; y++) for (let x = 14; x < 306; x++) pset(x, y, y === 88 ? K : y < 92 ? P.sofaL : y > 104 ? (y === 105 ? P.sofaL : P.sofaS) : h_b4(x, y) < 0.15 ? P.sofaS : P.sofa);
  for (const x of [112, 208]) rect(x, 89, x, 104, P.sofaD);
  // los cojines sueltos (cuadrados ladeados con dibujo de hojas), la manta de ganchillo y un cojín en el asiento
  for (const [cx, cy, a, c, cl] of [[46, 74, -0.2, '#e8805a', '#f8b08a'], [272, 74, 0.25, '#e8c040', '#f8e080']]) { const ca = Math.cos(a), sa = Math.sin(a);
    for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const u = i * ca + j * sa, v = -i * sa + j * ca, e = Math.abs(u) ** 3 + Math.abs(v) ** 3; if (e > 11 ** 3 + (Math.abs(u) > 9 && Math.abs(v) > 9 ? 900 : 0)) continue;
      const borde = e > 10 ** 3 + 300; pset(cx + i, cy + j, borde ? K : (u + v < -6 ? hex(cl) : (Math.sin(u * 0.7) + Math.cos(v * 0.7) > 1.2 ? hex('#2a8a6a') : u + v > 8 ? h_mezcla(hex(c), K, 0.2) : hex(c)))); } }
  for (let y = 56; y < 112; y++) { const w = 26 + Math.round(Math.sin(y * 0.2) * 2); for (let x = 150; x < 150 + w; x++) pset(x, y, ((x + y) % 6 < 3) ? hex('#f0e0c0') : (Math.sin(x * 0.5) > 0.5 ? hex('#d8b888') : hex('#c8a878'))); pset(150 + w, y, K); pset(150, y, K); }
  for (let x = 150; x < 178; x += 2) { pset(x, 112, hex('#f0e0c0')); pset(x + 1, 113, hex('#c8a878')); }
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) if (h_b4(x, y) < 0.14) h_tinte(R, x, y, 0.3, hex('#1a1030'));
  // el tablero de la mesita en perspectiva, con las vetas, los nudos, los cercos de vasos y el canto de delante
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x - 160) * 120 / (y - 40) + 160, tabla = Math.floor(u / 46), f = u / 46 - tabla, v = h(tabla, 0, 27);
    let c = v < 0.5 ? P.teca : hex('#a26c3e'); if (f < 0.02) c = P.tecaS; else if (Math.sin(u * 0.9 + Math.sin(y * 0.12 + tabla) * 3) > 0.82) c = P.tecaV; else if (h(Math.floor(u * 0.5), y >> 1, 28) > 0.93) c = P.tecaL;
    pset(x, y, c); }
  rect(0, 112, 319, 113, P.tecaL);
  for (let y = 114; y < 180; y++) for (let x = 0; x < 320; x++) if (h_b4(x, y) < Math.max(0, 0.4 - (y - 114) * 0.02)) h_tinte(R, x, y, 0.35, hex('#2a1810'));
  for (const [cx, cy] of [[100, 168], [236, 124]]) for (let a = 0; a < 6.28; a += 0.1) if (Math.sin(a * 3) > -0.6) pset(Math.round(cx + Math.cos(a) * 9), Math.round(cy + Math.sin(a) * 4), P.tecaS);
}

// la mesita de cerca: ver la cabecera de salon()
function h_salonMesa(R, t, o, geo) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = h_P;
  h_fijo(R, 'mesa', () => h_mesaFijo(R));
  // el gato dormido en el sofá del fondo, que mueve la cola
  { const gx = 232, gy = 94, r = Math.sin(t * 2) > 0 ? 1 : 0, N = hex('#d8843a'), NS = hex('#a85a24'), NL = hex('#f0a860');
    for (let i = 0; i < 16; i++) { const px = gx - 12 - i, py = gy + 6 - Math.round(Math.sin(i * 0.35 + t * 1.6) * 2.5 * (i / 16)); R.rect(px, py - 1, px, py + 1, K); pset(px, py, i % 4 < 2 ? N : NS); }
    R.disco(gx, gy, 13 + r, K); R.disco(gx, gy, 12 + r, N); R.disco(gx - 3, gy - 4, 6, NL); for (let i = -9; i <= 9; i += 4) R.linea(gx + i, gy - 11 - r, gx + i - 2, gy - 6 - r, NS);
    const hx = gx + 13, hy = gy - 4; R.poligono([[hx - 7, hy - 3], [hx - 5, hy - 12], [hx - 1, hy - 5]], K); R.poligono([[hx + 1, hy - 5], [hx + 5, hy - 12], [hx + 7, hy - 3]], K); R.poligono([[hx - 6, hy - 4], [hx - 5, hy - 10], [hx - 2, hy - 5]], N); R.poligono([[hx + 2, hy - 5], [hx + 5, hy - 10], [hx + 6, hy - 4]], N); pset(hx - 4, hy - 7, hex('#f0a0a0')); pset(hx + 4, hy - 7, hex('#f0a0a0'));
    R.disco(hx, hy, 8, K); R.disco(hx, hy, 7, N); R.disco(hx - 2, hy - 2, 3, NL); R.linea(hx - 4, hy, hx - 2, hy + 1, K); R.linea(hx + 2, hy + 1, hx + 4, hy, K); pset(hx, hy + 3, hex('#e86a6a')); pset(hx, hy + 4, K);
    for (const d of [-1, 1]) { R.linea(hx + d * 4, hy + 3, hx + d * 10, hy + 2, hex('#f6f2ea')); } for (let i = -4; i <= 4; i += 4) R.linea(hx + i, hy - 7, hx + i, hy - 5, NS);
    if (Math.floor(t * 0.5) % 3 === 0) { const u = (t * 0.5) % 1; R.icono('luna', hx + 9 + Math.round(u * 4), hy - 18 - Math.round(u * 6), hex('#f6f2ea'), K); } }
  // la luz de la tele que parpadea sobre la mesa
  { const b = 0.12 + 0.06 * Math.sin(t * 7) + 0.04 * Math.sin(t * 13); for (let y = 112; y < 180; y += 1) for (let x = 0; x < 320; x += 1) if (h_b4(x, y) < b * (1 - (y - 112) / 120)) h_tinte(R, x, y, 0.3, hex('#7aa0ff')); }
  // el bol de palomitas (rayas rojas y blancas) con las palomitas, alguna en la mesa y una que salta
  { const cx = 62, cy = 122; for (let y = 0; y <= 22; y++) { const w = Math.round(30 - y * y * 0.025); for (let x = -w; x <= w; x++) pset(cx + x, cy + y, Math.abs(x) === w || y === 22 ? K : (Math.floor((x + 40) / 7) % 2 ? C.blanco : hex('#e84a4a'))); }
    poligono([[cx - 30, cy], [cx + 30, cy], [cx + 24, cy + 3], [cx - 24, cy + 3]], hex('#c83030'));
    for (let k = 0; k < 46; k++) { const a = h(k, 1, 29) * 2 - 1, px = cx + Math.round(a * 27), py = cy - 2 - Math.round((1 - a * a) * 9 * h(k, 2, 29)); disco(px, py, 2, hex('#e8c87a')); disco(px, py - 1, 1, hex('#fff4d8')); pset(px + 1, py, hex('#fffbea')); }
    for (const [px, py] of [[104, 150], [30, 152], [118, 140]]) { disco(px, py, 2, hex('#e8c87a')); pset(px, py - 1, hex('#fff4d8')); }
    const u = (t * 0.6) % 1; if (u < 0.4) { const v = u / 0.4, px = Math.round(cx + 10 + v * 16), py = Math.round(cy - 10 - Math.sin(v * Math.PI) * 18); disco(px, py, 2, hex('#fff4d8')); pset(px - 1, py, hex('#e8c87a')); } }
  // el mando a distancia, con sus botones y la luz que parpadea al pulsar
  { rect(46, 154, 100, 166, K); rect(47, 155, 99, 165, hex('#2a2a34')); rect(47, 155, 99, 156, hex('#4a4a58')); disco(56, 160, 3, hex('#3a3a48')); pset(56, 157, C.blanco); pset(56, 163, C.blanco); pset(53, 160, C.blanco); pset(59, 160, C.blanco);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) rect(66 + i * 6, 157 + j * 4, 69 + i * 6, 158 + j * 4, [hex('#e83a3a'), hex('#3ab83a'), hex('#e8c83a'), hex('#3a6ae8')][i]); rect(92, 158, 96, 162, hex('#5a5a68'));
    if (Math.floor(t * 3) % 5 === 0) pset(99, 160, hex('#ff5a5a')); }
  // la caja de la edición física, grande
  const caja = o.caja === false ? null : a_caja(R, 116, 92, t, { s: 3, abierta: o.abierta ?? 0, sacude: o.sacude ?? 0 });
  // la foto en sepia (o.foto 0–1: desliza desde abajo y se asienta): una pareja de los años treinta junto a un coche antiguo
  const fo = Math.max(0, Math.min(1, o.foto ?? 0));
  if (fo > 0) { const fy = Math.round(132 + (1 - fo) * 60), fx = 192; poligono([[fx + 2, fy - 18], [fx + 54, fy - 21], [fx + 58, fy + 17], [fx + 6, fy + 20]], hex('#1a1008'));
    poligono([[fx, fy - 20], [fx + 52, fy - 23], [fx + 56, fy + 15], [fx + 4, fy + 18]], hex('#f0e2c0')); poligono([[fx + 4, fy - 16], [fx + 48, fy - 19], [fx + 51, fy + 10], [fx + 7, fy + 13]], hex('#a88a5a'));
    R.recorte([fx + 5, fy - 18, fx + 50, fy + 12]);
    for (let y = fy - 19; y < fy + 13; y++) for (let x = fx + 4; x < fx + 52; x++) if (R.pget(x, y) === hex('#a88a5a')) pset(x, y, y < fy - 2 ? (h_b4(x, y) < 0.5 ? hex('#c8aa78') : hex('#b89a68')) : hex('#8a6a42'));
    const cx = fx + 14, sy = fy + 4; rect(cx, sy - 7, cx + 22, sy - 2, hex('#3a2818')); rect(cx + 5, sy - 11, cx + 15, sy - 7, hex('#3a2818')); rect(cx + 7, sy - 10, cx + 13, sy - 8, hex('#a8906a'));
    disco(cx + 4, sy - 1, 3, hex('#1e140a')); disco(cx + 18, sy - 1, 3, hex('#1e140a')); disco(cx + 4, sy - 1, 1, hex('#8a7050')); disco(cx + 18, sy - 1, 1, hex('#8a7050')); rect(cx - 2, sy - 5, cx, sy - 3, hex('#5a4028'));
    for (const [px, alto, sombrero] of [[fx + 38, 14, 1], [fx + 44, 12, 0]]) { rect(px, sy - alto + 4, px + 3, sy, hex('#2a1c10')); disco(px + 1, sy - alto + 2, 2, hex('#6a5034')); if (sombrero) { rect(px - 1, sy - alto, px + 3, sy - alto, hex('#2a1c10')); rect(px, sy - alto - 2, px + 2, sy - alto - 1, hex('#2a1c10')); } else rect(px - 1, sy - alto + 1, px + 3, sy - alto + 2, hex('#3a2818')); }
    R.recorte(null);
    for (let i = 0; i < 6; i++) h_tinte(R, fx + 46 + i, fy - 20 + i, 0.3, C.blanco); }
  // el libro gordo y viejo con el candado (o.candado 0–1: el candado cae sobre el libro; o.abre 0–1: el arco se levanta)
  { const bx = 250, by = 128; rect(bx, by, bx + 58, by + 24, K); rect(bx + 1, by + 1, bx + 57, by + 17, hex('#2a5a3a')); rect(bx + 1, by + 1, bx + 57, by + 2, hex('#3a7a4a'));
    rect(bx + 1, by + 18, bx + 57, by + 23, hex('#f0e6c8')); for (let y = by + 19; y < by + 23; y++) for (let x = bx + 2; x < bx + 57; x += 2) pset(x, y, hex('#c8b890'));
    for (const x of [bx + 10, bx + 46]) rect(x, by + 1, x + 2, by + 17, hex('#c8a040')); rect(bx + 20, by + 6, bx + 38, by + 12, hex('#c8a040')); rect(bx + 21, by + 7, bx + 37, by + 11, hex('#2a5a3a'));
    const ca = o.candado ?? 0; if (ca > 0) { const cy = Math.round(by + 2 - (1 - Math.min(1, ca)) * 70), cx = bx + 29, ab = Math.max(0, Math.min(1, o.abre ?? 0)), arco = Math.round(ab * 6);
      for (let a = Math.PI; a <= 2 * Math.PI; a += 0.1) { pset(Math.round(cx + Math.cos(a) * 6), Math.round(cy - 6 - arco + Math.sin(a) * 7), K); pset(Math.round(cx + Math.cos(a) * 5), Math.round(cy - 6 - arco + Math.sin(a) * 6), C.metalL); }
      rect(cx - 6, cy - 6 - arco, cx - 5, cy - 4, C.metalL); if (!ab) rect(cx + 5, cy - 6, cx + 6, cy - 4, C.metalL);
      rect(cx - 9, cy - 4, cx + 9, cy + 9, K); rect(cx - 8, cy - 3, cx + 8, cy + 8, hex('#d8a83a')); rect(cx - 8, cy - 3, cx + 8, cy - 2, hex('#f8d870')); rect(cx + 6, cy - 3, cx + 8, cy + 8, hex('#a87a20'));
      disco(cx, cy + 2, 2, K); rect(cx, cy + 2, cx, cy + 5, K); } }
  // el canto de delante de la mesita
  rect(0, 176, 319, 179, K); rect(0, 177, 319, 179, P.tecaS); rect(0, 176, 319, 176, P.tecaL);
  geo.caja = caja ? [Math.round((caja.caja[0] + caja.caja[2]) / 2), Math.round((caja.caja[1] + caja.caja[3]) / 2)] : geo.caja; geo.tarjeta = caja ? caja.tarjeta : null; geo.cajaRect = caja ? caja.caja : null; geo.manoCaja = caja ? caja.mano : null;
  return geo;
}

// el fondo fijo: la pared de estuco con la luz de un flexo, la estantería de la izquierda (guías de colores, un caimán de
// peluche, una bola de nieve con un flamenco, una caracola), el tablón de corcho grande con su marco, el suelo de tablas
// y el rincón de la derecha
function h_mapaFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = h_P;
  h_paredEstuco(R, 0, 0, 319, 145, (x, y) => Math.max(0, 1 - Math.hypot(x - 150, (y - 80) * 1.2) / 170) * 2.6 - (y < 8 ? 0.6 : 0));
  rect(0, 0, 319, 3, P.techo); rect(0, 4, 319, 5, P.moldura); rect(0, 6, 319, 6, P.molduraS);
  // el suelo de tablas de pino con sus juntas y testas, y el zócalo
  rect(0, 144, 319, 148, P.zocalo); rect(0, 144, 319, 144, C.blanco); rect(0, 148, 319, 148, P.zocaloS);
  for (let y = 149; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x - 160) * 150 / (y - 100) + 160, tabla = Math.floor(u / 18), f = u / 18 - tabla, v = h(tabla, 0, 31);
    let c = v < 0.33 ? hex('#b88a5a') : v < 0.66 ? hex('#a87a4c') : hex('#c4966a'); if (f < 0.06) c = hex('#6a4a30'); else if (((y * 3 + Math.floor(h(tabla, 1, 31) * 90)) % 50) < 2) c = hex('#6a4a30'); else if (h(Math.floor(u * 0.7), y >> 1, 32) < 0.07) c = hex('#946a40');
    pset(x, y, c); }
  for (let y = 149; y < 180; y++) for (let x = 0; x < 320; x++) if (h_b4(x, y) < (180 - y) / 31 * 0.3) h_tinte(R, x, y, 0.3, hex('#2a1810'));
  // la estantería de la izquierda con sus baldas y lo que hay en ellas
  rect(1, 38, 41, 150, K); rect(2, 39, 40, 149, P.tecaS); rect(2, 39, 3, 149, P.teca); rect(39, 39, 40, 149, P.teca);
  for (const y of [62, 88, 114, 140]) { rect(2, y, 40, y + 2, P.teca); rect(2, y, 40, y, P.tecaL); }
  const lomos = ['#e8803a', '#3ab0c8', '#e84a6a', '#f0d050', '#3a8a5a', '#8a5ac8', '#f0f0e0', '#c83a3a'];
  for (const y of [62, 88]) { let x = 5; for (let k = 0; x < 37; k++) { const w = 3 + Math.floor(h(k, y, 33) * 3), alto = 15 + Math.floor(h(k, y, 34) * 6); rect(x, y - alto, x + w - 1, y - 1, K); rect(x + 1, y - alto + 1, x + w - 2, y - 1, hex(lomos[(k + y) % 8])); pset(x + 1, y - alto + 3, C.blanco); x += w; } }
  // el caimán de peluche, la bola de nieve con un flamenco y la caracola
  rect(6, 108, 26, 113, K); rect(7, 109, 25, 112, hex('#5a8a3a')); for (let x = 8; x < 24; x += 3) pset(x, 108, hex('#3a6a2a')); rect(24, 110, 30, 113, K); rect(25, 111, 29, 112, hex('#6a9a4a')); pset(9, 110, C.blanco); pset(10, 110, K); pset(27, 113, C.blanco);
  disco(30, 101, 6, K); disco(30, 101, 5, hex('#b8e0f0')); rect(25, 106, 35, 113, K); rect(26, 107, 34, 112, hex('#8a5a3a')); linea(30, 104, 30, 99, hex('#e86a8a')); disco(31, 98, 1, hex('#ff8aa8')); pset(28, 98, C.blanco);
  for (let j = 0; j < 8; j++) rect(8 + j, 139 - j, 22 - j, 139 - j, j % 2 ? hex('#f8d8c8') : hex('#e8b8a8')); pset(15, 131, hex('#c8887a'));
  rect(26, 126, 38, 139, K); rect(27, 127, 37, 138, hex('#e8e0d0')); for (let k = 0; k < 3; k++) linea(28 + k * 3, 126, 27 + k * 4, 118, [hex('#e83a3a'), hex('#3a6ae8'), hex('#3ab83a')][k]);
  // el tablón de corcho con el marco de madera (el mapa, los papeles y los hilos los pone la vida)
  rect(43, 23, 269, 135, K); rect(44, 24, 268, 134, P.marco); rect(44, 24, 268, 24, P.marcoL); rect(44, 24, 44, 134, P.marcoL); rect(267, 25, 268, 134, hex('#4a3020'));
  for (let y = 27; y < 132; y++) for (let x = 47; x < 266; x++) { const n = h(x, y, 35); pset(x, y, n > 0.82 ? P.corchoS : n < 0.13 ? P.corchoL : P.corcho); }
  rect(47, 27, 265, 27, P.corchoS); rect(47, 27, 47, 131, P.corchoS);
  // el rincón de la derecha: una lámpara de pie con su pantalla y una palmera de interior en su cesta
  rect(286, 50, 306, 64, K); poligono([[288, 63], [304, 63], [301, 51], [291, 51]], hex('#f8e4b0')); rect(295, 64, 297, 146, K); rect(296, 64, 296, 146, hex('#e8c060')); rect(289, 145, 303, 148, K);
  R.halo(296, 66, 18, [hex('#d8a090'), hex('#e8b8a0'), hex('#f6d0b0')], 0.7);
  rect(276, 128, 300, 150, K); for (let y = 129; y < 150; y++) for (let x = 277; x < 300; x++) pset(x, y, (x + (y >> 1)) % 4 < 2 ? hex('#c8a060') : hex('#9a7840'));
}

// la pared del mapa: ver la cabecera de salon()
function h_paredMapa(R, t, o, geo) {
  const { rect, pset, disco, linea } = R, K = C.k;
  h_fijo(R, 'mapa', () => h_mapaFijo(R));
  // la palmera de interior que se mece
  for (let k = 0; k < 8; k++) { const a = -Math.PI / 2 + (k - 3.5) * 0.36, L = 24 + (k % 3) * 7, sw = Math.sin(t * 1.2 + k) * 1.8, ex = Math.round(288 + Math.cos(a) * L + sw), ey = Math.round(126 + Math.sin(a) * L * 0.9);
    linea(288, 128, ex, ey, hex('#4a6a2a')); for (let s = 2; s < 9; s++) { const px = Math.round(lerp(288, ex, s / 9)), py = Math.round(lerp(128, ey, s / 9)); pset(px - 1, py + 1, hex('#3a7a3a')); pset(px + 1, py + 1, hex('#5aa84a')); pset(px - 2, py + 2, hex('#2e5e2e')); pset(px + 2, py + 2, hex('#7ac85a')); } }
  // el mapa de Leonida grande
  const m = a_mapaLeonida(R, 80, 30, 148, t, { encendidas: o.encendidas ?? 0, florida: o.florida ?? 0, montana: o.montana ?? 1 });
  rect(79, 29, 228, 29, hex('#e8dcc0')); rect(79, 29, 79, 29 + m.h, hex('#e8dcc0')); rect(228, 29, 228, 29 + m.h, hex('#5a4030'));
  // las notas de colores con pictogramas y números, que se mueven un poco con el aire, y las fotos
  const notas = [[52, 34, '#f8e070', 'caiman'], [52, 64, '#f8a8c0', 'palmera'], [52, 96, '#a8e8a0', '?'], [236, 36, '#a8d8f8', 'barco'], [236, 70, '#f8e070', 'reloj'], [236, 104, '#f8c890', 'globo']];
  notas.forEach(([nx, ny, c, ic], k) => { const lev = Math.sin(t * 1.5 + k * 1.3) > 0.6 ? 1 : 0;
    rect(nx + 1, ny + 1, nx + 23, ny + 23, hex('#7a5a3a')); rect(nx, ny, nx + 22, ny + 22, hex(c)); rect(nx, ny, nx + 22, ny + 1, h_mezcla(hex(c), C.blanco, 0.4)); rect(nx, ny + 21, nx + 22, ny + 22, h_mezcla(hex(c), C.k, 0.15));
    R.icono(ic, nx + 4, ny + 5, hex('#3a2a4a'), h_mezcla(hex(c), C.k, 0.2), 2);
    if (lev) { R.poligono([[nx + 22, ny + 17], [nx + 22, ny + 22], [nx + 17, ny + 22]], h_mezcla(hex(c), C.k, 0.3)); R.poligono([[nx + 22, ny + 17], [nx + 17, ny + 22], [nx + 17, ny + 17]], h_mezcla(hex(c), C.blanco, 0.3)); } });
  // las chinchetas de las regiones y el hilo rojo de cada región a su nota
  const regs = ['vicecity', 'cayos', 'grassrivers', 'ambrosia', 'portgellhorn', 'kalaga'], destinos = [[236, 116], [64, 108], [64, 76], [236, 82], [64, 46], [236, 48]];
  regs.forEach((n, k) => { const [px, py] = m.regiones[n], [qx, qy] = destinos[k], d = Math.hypot(qx - px, qy - py);
    for (let i = 0; i <= d; i++) { const u = i / d, sx = Math.round(lerp(px, qx, u)), sy = Math.round(lerp(py, qy, u) + Math.sin(u * Math.PI) * d * 0.06); pset(sx, sy, hex('#c8202a')); if (i % 3 === 0) pset(sx, sy + 1, hex('#8a1018')); }
    const on = k < (o.encendidas ?? 0); R.disco(px, py - 2, 2, K); R.disco(px, py - 2, 1, on ? hex('#ff5a5a') : hex('#e8e0d0')); pset(px - 1, py - 3, C.blanco);
    R.disco(qx, qy - 2, 2, K); R.disco(qx, qy - 2, 1, hex('#ff5a5a')); });
  // las guirnaldas de luces sobre el tablón, que titilan por turnos
  for (const [a, b] of [[44, 120], [120, 196], [196, 268]]) for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), y = Math.round(23 + Math.sin(u * Math.PI) * 4); pset(x, y, hex('#2a3a2a'));
    if ((x - a) % 9 === 4) { const k = Math.floor(x / 9), on = Math.sin(t * 3 + k * 1.7) > -0.2, c = [hex('#ff6a6a'), hex('#ffd84a'), hex('#6ae8ff'), hex('#8aff8a'), hex('#ff8ae8')][k % 5];
      pset(x, y + 1, K); disco(x, y + 3, 1, on ? c : h_mezcla(c, K, 0.6)); if (on) { pset(x, y + 3, C.blanco); for (const [dx, dy] of [[-2, 3], [2, 3], [0, 5]]) if (h_b4(x + dx, y + dy) < 0.5) h_tinte(R, x + dx, y + dy, 0.35, c); } } }
  for (const x of [44, 120, 196, 268]) { R.rect(x - 1, 22, x + 1, 24, K); pset(x, 23, C.metalL); }
  // la bola de nieve, que alguien acaba de agitar: copos que caen
  for (let k = 0; k < 6; k++) { const u = (t * 0.4 + k / 6) % 1, x = 27 + Math.round(h(k, 1, 36) * 6 + Math.sin(t + k) * 1), y = 96 + Math.round(u * 9); if (Math.hypot(x - 30, y - 101) < 5) pset(x, y, C.blanco); }
  // la luz de la lámpara del rincón
  if (Math.sin(t * 19) > 0.985) rect(291, 52, 301, 52, hex('#fffbe8'));
  return { ...geo, regiones: m.regiones, montana: m.montana, lago: m.lago, mapaH: m.h };
}

// delante en la pared del mapa: la mesa de trabajo de los fans
function h_mapaDelante(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = h_P;
  for (let y = 172; y < 180; y++) for (let x = 120; x < 320; x++) if (h_b4(x, y) < 0.4) h_tinte(R, x, y, 0.4, hex('#1a0e08'));
  // el tablero con su canto y el faldón; las patas
  rect(124, 155, 319, 162, K); rect(125, 156, 319, 160, hex('#d8c8a8')); rect(125, 156, 319, 156, hex('#f0e4c8')); rect(125, 161, 319, 161, hex('#a89878'));
  rect(130, 162, 319, 170, K); rect(131, 163, 319, 169, hex('#b8a888')); for (let x = 140; x < 319; x += 40) rect(x, 163, x, 169, hex('#9a8a6a'));
  for (const x of [134, 312]) { rect(x - 2, 170, x + 2, 179, K); rect(x - 1, 170, x + 1, 179, hex('#9a8a6a')); }
  // los mapas dibujados a mano (una península a rotulador con una ruta y cruces), los papeles y las notas
  const hoja = (x0, y0, a, k) => { const ca = Math.cos(a), sa = Math.sin(a), q = (u, v) => [Math.round(x0 + u * ca - v * sa), Math.round(y0 + u * sa + v * ca)];
    poligono([q(0, 0), q(34, 0), q(34, 10), q(0, 10)].map(([x, y]) => [x + 1, y + 1]), hex('#7a6a50')); poligono([q(0, 0), q(34, 0), q(34, 10), q(0, 10)], C.blanco);
    if (k === 0) { for (let i = 0; i < 9; i++) pset(...q(18 + Math.round(Math.sin(i) * 2), 1 + i), hex('#3a6ae8')); for (let i = 0; i < 12; i++) pset(...q(6 + i, 2 + Math.round(Math.sin(i * 0.6))), hex('#3a6ae8')); pset(...q(20, 8), C.rojo); pset(...q(19, 7), C.rojo); pset(...q(21, 7), C.rojo); for (let i = 0; i < 10; i += 2) pset(...q(8 + i, 6), hex('#e8803a')); }
    else for (let r = 2; r < 9; r += 2) for (let i = 3; i < 30; i++) if (h(i, r, 37 + k) > 0.3) pset(...q(i, r), hex('#8a8aa0')); };
  hoja(146, 150, 0.06, 0); hoja(186, 152, -0.08, 1); hoja(222, 151, 0.03, 0);
  // rotuladores de colores, la lupa, el ovillo de hilo rojo, la taza que humea y el portátil
  for (const [x, c] of [[168, '#e83a3a'], [174, '#3a6ae8'], [180, '#3ab83a']]) { linea(x, 159, x + 7, 157, K); linea(x, 158, x + 6, 156, hex(c)); pset(x + 7, 156, C.blanco); }
  disco(262, 155, 5, K); disco(262, 155, 4, hex('#c8e8f8')); pset(260, 153, C.blanco); linea(266, 159, 271, 162, K); linea(267, 159, 272, 162, P.tecaS);
  disco(130, 156, 4, K); disco(130, 156, 3, hex('#c8202a')); for (let a = 0; a < 6.28; a += 0.8) linea(130, 156, Math.round(130 + Math.cos(a + t * 0.2) * 3), Math.round(156 + Math.sin(a + t * 0.2) * 2), hex('#e84a4a'));
  rect(246, 147, 254, 157, K); rect(247, 148, 253, 156, hex('#3ab0c8')); rect(247, 148, 253, 149, hex('#8ae0f0')); rect(254, 149, 256, 153, K);
  for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k / 3) % 1; pset(250 + Math.round(Math.sin(t * 2 + k * 2 + u * 4) * 1.5), Math.round(145 - u * 12), h_mezcla(C.blanco, hex('#c8a090'), u)); }
  poligono([[280, 157], [316, 157], [319, 161], [277, 161]], K); poligono([[281, 158], [315, 158], [317, 160], [279, 160]], hex('#b8bcc8'));
  rect(284, 132, 314, 157, K); rect(285, 133, 313, 156, hex('#d8dce4')); rect(287, 135, 311, 154, hex('#14182a'));
  R.recorte([287, 135, 311, 154]); { const g = Math.floor(t / 2.5) % 2; for (let i = 0; i < 5; i++) { const hh = Math.round(3 + i * 3 * (g ? 1 : 0.6)); rect(289 + i * 4, 153 - hh, 291 + i * 4, 153, i === 4 ? hex('#ff4fa8') : hex('#40e8f8')); } } R.recorte(null);
  pset(299, 133, hex('#3a3a48'));
  return {};
}

// el fondo fijo: la pared en penumbra, el escritorio de madera con el teclado, la alfombrilla y las notas; el monitor
function h_contadorFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = h_P;
  h_paredEstuco(R, 0, 0, 319, 150, (x, y) => -0.4 + Math.max(0, 1 - Math.hypot(x - 152, y - 80) / 150) * 2.2);
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const d = Math.max(Math.abs(x - 152) - 112, Math.abs(y - 82) - 58, 0); if (d > 0 && d < 30 && h_b4(x, y) < (1 - d / 30) * 0.5) h_tinte(R, x, y, 0.25, hex('#6a9ae8')); }
  // el escritorio: el tablero con vetas y su canto
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.3) * 2 + y * 0.6); pset(x, y, y === 150 ? P.tecaL : v > 0.85 ? P.tecaV : h(x >> 2, y, 41) > 0.92 ? P.tecaL : P.teca); }
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) if (h_b4(x, y) < 0.25 + (y - 151) * 0.006) h_tinte(R, x, y, 0.2, hex('#7aa0ff'));
  // el monitor: el marco gris con su filo, el pie y la base
  rect(34, 24, 270, 142, K); rect(35, 25, 269, 141, hex('#2a2c36')); rect(35, 25, 269, 25, hex('#5a5e6e')); rect(35, 141, 269, 141, hex('#1a1c24')); rect(39, 29, 265, 135, K);
  rect(140, 142, 164, 152, K); rect(141, 142, 163, 151, hex('#3a3c48')); rect(141, 142, 143, 151, hex('#5a5e6e')); poligono([[124, 152], [180, 152], [184, 157], [120, 157]], K); poligono([[125, 153], [179, 153], [182, 156], [122, 156]], hex('#4a4c58'));
  rect(150, 137, 154, 138, hex('#5a5e6e'));
  // el teclado con sus teclas, la alfombrilla y las notitas pegadas al marco
  poligono([[64, 160], [200, 160], [206, 172], [58, 172]], K); poligono([[65, 161], [199, 161], [204, 171], [60, 171]], hex('#3a3c48'));
  for (let j = 0; j < 3; j++) for (let i = 0; i < 17; i++) { const kx = 66 + i * 8 + j * 1, ky = 162 + j * 3; rect(kx, ky, kx + 6, ky + 1, hex('#8a8e9e')); rect(kx, ky, kx + 6, ky, hex('#c8ccd8')); }
  rect(96, 171, 170, 171, hex('#8a8e9e'));
  poligono([[214, 158], [262, 158], [266, 174], [210, 174]], hex('#1a2a3a'));
  for (const [nx, ny, c, a] of [[12, 64, '#f8e070', 0], [284, 96, '#f8a8c0', 1]]) { rect(nx, ny, nx + 12, ny + 12, hex(c)); rect(nx, ny + 11, nx + 12, ny + 12, h_mezcla(hex(c), K, 0.2)); if (a) R.icono('caiman', nx + 3, ny + 3, hex('#3a4a2a'), hex(c)); else { for (let k = 0; k < 3; k++) rect(nx + 2, ny + 3 + k * 3, nx + 9 - k, ny + 3 + k * 3, hex('#7a6a50')); } }
}

// la pantalla del ordenador de cerca: ver la cabecera de salon()
function h_contador(R, t, o, geo) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, cl = geo.pantalla;
  h_fijo(R, 'contador', () => h_contadorFijo(R));
  R.recorte(cl);
  h_degradado(R, cl[0], cl[1], cl[2], cl[3], [hex('#161a2e'), hex('#1a1e36'), hex('#121628')]);
  // la barra de la ventana con los tres botones
  h_rr(R, cl, cl[0], cl[1], cl[2], cl[1] + 5, hex('#262a42')); for (const [x, c] of [[46, '#ff5a5a'], [52, '#ffc84a'], [58, '#5ad85a']]) R.disco(x, cl[1] + 2, 1, hex(c));
  // la miniatura del vídeo (el ocaso con palmeras) con el botón de play y la barra de reproducción
  const [mx0, my0, mx1, my1] = geo.miniatura;
  for (let y = my0; y <= my1; y++) for (let x = mx0; x <= mx1; x++) pset(x, y, h_arteCaja((x - mx0) / (mx1 - mx0), (y - my0) / (my1 - my0), x, y));
  R.disco(80, 55, 8, hex('#e8202a')); R.poligono([[77, 51], [77, 59], [84, 55]], C.blanco);
  h_rr(R, cl, mx0, my1 - 2, mx1, my1, hex('#3a3a4a')); h_rr(R, cl, mx0, my1 - 2, mx0 + Math.round((mx1 - mx0) * ((t * 0.08) % 1)), my1, hex('#e8202a'));
  // la gráfica de las reservas: barras que crecen (o.reservas 0–1), la línea de tendencia punteada y la etiqueta con «?»
  const re = Math.max(0, Math.min(1, o.reservas ?? 0)), [gx0, gy0, gx1, gy1] = geo.grafica;
  h_rr(R, cl, gx0, gy0, gx1, gy1, hex('#1e2440')); h_rr(R, cl, gx0, gy0, gx1, gy0, hex('#2e3658'));
  for (let y = gy0 + 6; y < gy1; y += 7) for (let x = gx0 + 2; x < gx1; x += 3) pset(x, y, hex('#2a3256'));
  for (let i = 0; i < 9; i++) { const alto = Math.round((4 + i * i * 0.36) * re), bx = gx0 + 6 + i * 13; if (alto > 0) { h_rr(R, cl, bx, gy1 - 2 - alto, bx + 7, gy1 - 2, i === 8 ? hex('#ff4fa8') : hex('#40c8e8')); h_rr(R, cl, bx, gy1 - 2 - alto, bx + 7, gy1 - 2 - alto, C.blanco); } }
  h_rr(R, cl, gx0 + 2, gy1 - 2, gx1 - 2, gy1 - 2, hex('#8a92b8'));
  if (re > 0.3) { for (let i = 0; i < 100; i += 3) { const x = gx0 + 8 + i, y = Math.round(gy1 - 4 - (i / 100) ** 2 * 32 * re); pset(x, y, hex('#ffd84a')); } }
  if (re > 0.6) { const tx = gx1 - 22, ty = gy0 + 4 + Math.round(Math.sin(t * 3) * 1); R.poligono([[tx - 4, ty + 5], [tx, ty], [tx + 14, ty], [tx + 14, ty + 10], [tx, ty + 10]], hex('#ffd84a')); R.disco(tx - 1, ty + 5, 1, K); R.icono('?', tx + 5, ty + 2, K, hex('#c8a020')); }
  // el ojo de las visitas, el contador grande que sube (o.visitas 0–90, en millones) con la flecha y, al llegar, la corona
  const vi = Math.max(0, Math.min(90, o.visitas ?? 0)), n = Math.floor(vi * 1e6) + (vi > 0 && vi < 90 ? Math.floor((t * 7919) % 1000) : 0), txt = n.toLocaleString('en-US');
  const [nx, ny] = geo.numero; h_rr(R, cl, cl[0] + 6, ny - 26, cl[2] - 6, ny + 8, hex('#1e2440'));
  { const ex = cl[0] + 18, ey = ny - 9; for (let i = -7; i <= 7; i++) { const a = Math.round(Math.sqrt(Math.max(0, 1 - (i / 7) ** 2)) * 4); pset(ex + i, ey - a, C.blanco); pset(ex + i, ey + a, C.blanco); } R.disco(ex, ey, 2, hex('#40c8e8')); pset(ex, ey, K); if (Math.floor(t * 0.7) % 4 === 0) R.rect(ex - 7, ey - 1, ex + 7, ey + 1, hex('#1e2440')); }
  R.numero(txt, nx + 8, ny, { tam: 16, centro: true });
  if (vi > 0 && vi < 90) { const b = Math.round((t * 6) % 4); R.poligono([[cl[2] - 20, ny - 6 - b], [cl[2] - 14, ny - 13 - b], [cl[2] - 8, ny - 6 - b]], hex('#5ad85a')); }
  if (vi >= 90) { R.icono('corona', cl[2] - 22, ny - 20 + (Math.floor(t * 3) % 2), hex('#ffd84a'), hex('#8a6a10'), 2); }
  // la barrita de progreso hacia el récord, con su marca
  h_rr(R, cl, cl[0] + 30, ny + 4, cl[2] - 30, ny + 5, hex('#2e3658')); h_rr(R, cl, cl[0] + 30, ny + 4, cl[0] + 30 + Math.round((cl[2] - cl[0] - 60) * vi / 90), ny + 5, hex('#ffd84a'));
  // el puntero del ratón que se pasea
  { const px = Math.round(150 + Math.sin(t * 0.7) * 50), py = Math.round(90 + Math.cos(t * 0.9) * 20); R.poligono([[px, py], [px, py + 7], [px + 2, py + 5], [px + 5, py + 5]], C.blanco); R.linea(px, py, px, py + 7, K); }
  R.recorte(null);
  // el reflejo del cristal y el piloto del monitor
  for (let i = 0; i < 30; i++) { const px = 44 + i, py = 128 - i * 3; if (py > 30) { h_tinte(R, px, py, 0.08, C.blanco); h_tinte(R, px + 1, py, 0.05, C.blanco); } }
  pset(258, 138, Math.floor(t * 0.8) % 2 ? hex('#5ad8ff') : hex('#2a6a8a'));
  // la taza que humea junto al teclado y el ratón que se mueve con el puntero
  rect(234, 148, 246, 162, K); rect(235, 149, 245, 161, hex('#f0ece0')); rect(235, 149, 245, 150, C.blanco); rect(246, 151, 249, 158, K); rect(246, 152, 248, 157, hex('#f0ece0')); rect(238, 154, 242, 157, hex('#3ab0c8'));
  for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; pset(240 + Math.round(Math.sin(t * 2 + k * 2 + u * 5) * 2), Math.round(146 - u * 16), h_mezcla(C.blanco, hex('#9a8a8a'), u)); }
  { const mx = 224 + Math.round(Math.sin(t * 0.7) * 3), my = 164 + Math.round(Math.cos(t * 0.9) * 2); disco(mx, my, 4, K); disco(mx, my, 3, hex('#d8dce4')); pset(mx, my - 3, hex('#8a8e9e')); pset(mx - 1, my - 2, C.blanco); }
  return geo;
}

// el fondo fijo: la pared de estuco con la luz de la lámpara, la balda de abajo con el mando de la consola, el bote de
// lápices y un cactus; el marco del reloj
function h_calFijo(R) {
  const { rect, pset, disco, linea } = R, K = C.k, P = h_P;
  h_paredEstuco(R, 0, 0, 319, 157, (x, y) => Math.max(0, 1 - Math.hypot(x - 170, (y - 70) * 1.1) / 190) * 2.8);
  for (let y = 158; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 160 ? P.tecaL : y > 170 ? P.tecaS : Math.sin(x * 0.07 + y * 0.9) > 0.85 ? P.tecaV : P.teca);
  rect(0, 160, 319, 160, P.tecaS);
  // el mando de la consola, el bote de lápices y el cactus en la balda
  rect(196, 150, 232, 159, K); rect(197, 151, 231, 158, hex('#eef0f4')); disco(204, 155, 3, hex('#3a3a48')); disco(224, 155, 3, hex('#3a3a48')); for (const [a, b, c] of [[214, 153, '#e83a3a'], [217, 155, '#3ab83a'], [214, 157, '#3a6ae8']]) pset(a, b, hex(c));
  rect(250, 140, 262, 159, K); rect(251, 141, 261, 158, hex('#3ab0c8')); rect(251, 141, 261, 142, hex('#8ae0f0'));
  for (const [x, c] of [[253, '#e8c040'], [256, '#e83a3a'], [259, '#3a6ae8']]) { rect(x, 128 + (x % 3) * 2, x + 1, 141, hex(c)); pset(x, 127 + (x % 3) * 2, hex('#f0d8b0')); }
  rect(280, 146, 296, 159, K); rect(281, 147, 295, 158, hex('#c86a48')); rect(280, 146, 296, 148, hex('#e88a68'));
  for (const [x, alto] of [[286, 18], [292, 12]]) { rect(x - 2, 146 - alto, x + 2, 146, K); rect(x - 1, 147 - alto, x + 1, 146, hex('#4a9a4a')); for (let y = 148 - alto; y < 146; y += 3) pset(x + 2, y, hex('#f0f0d0')); }
  // un cuadrito con la foto de un manatí en el agua turquesa, colgado de su clavo
  R.linea(256, 50, 244, 58, hex('#5a4030')); R.linea(256, 50, 268, 58, hex('#5a4030')); disco(256, 50, 1, C.metalL);
  rect(240, 58, 272, 80, K); rect(241, 59, 271, 79, P.marcoL); rect(243, 61, 269, 77, hex('#3ab0c8'));
  for (let y = 61; y < 78; y++) for (let x = 243; x < 270; x++) if (h_b4(x, y) < (y - 61) / 30) pset(x, y, hex('#2a8aa8')); for (let x = 243; x < 270; x += 3) pset(x, 62 + (x % 2), hex('#9af0f0'));
  for (let j = -3; j <= 3; j++) for (let i = -8; i <= 8; i++) if ((i / 8) ** 2 + (j / 3.4) ** 2 < 1) pset(255 + i, 71 + j, j < -1 ? hex('#9aa0a8') : hex('#6a7078')); R.poligono([[247, 71], [243, 68], [243, 75]], hex('#6a7078')); pset(261, 70, K); pset(263, 72, hex('#6a7078'));
  // el reloj de pared (la esfera la mueve la vida)
  disco(276, 100, 19, K); disco(276, 100, 18, P.teca); disco(276, 100, 16, hex('#f6f0e2')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(276 + Math.cos(a) * 14), Math.round(100 + Math.sin(a) * 14), K); }
}

// el calendario de cerca: ver la cabecera de salon()
function h_calendarioCerca(R, t, o, geo) {
  const { rect, pset, disco, linea } = R, K = C.k, c = Math.max(0, Math.min(1, o.calendario ?? 0));
  h_fijo(R, 'calendario', () => h_calFijo(R));
  // la guirnalda de luces de colores colgada en lo alto (fuera de la barra del año y de la esquina de Atom), que titila
  for (const [a, b] of [[0, 60], [60, 140], [180, 262]]) for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), y = Math.round(24 + Math.sin(u * Math.PI) * 6); pset(x, y, hex('#3a3a2a'));
    if ((x - a) % 10 === 5) { const k = Math.floor(x / 10), on = Math.sin(t * 2.6 + k * 1.9) > -0.3, cc = [hex('#ff6a6a'), hex('#ffd84a'), hex('#6ae8ff'), hex('#8aff8a'), hex('#ff8ae8')][k % 5];
      pset(x, y + 1, K); disco(x, y + 3, 1, on ? cc : h_mezcla(cc, K, 0.6)); if (on) { pset(x, y + 3, C.blanco); for (const [dx, dy] of [[-2, 3], [2, 3], [0, 5], [0, 6]]) if (h_b4(x + dx, y + dy) < 0.5) h_tinte(R, x + dx, y + dy, 0.3, cc); } } }
  // las agujas del reloj (casi medianoche) con el segundero
  { const cx = 276, cy = 100, s = t * Math.PI / 30, mi = -Math.PI / 2 + (58 / 60) * Math.PI * 2 + t * 0.002, ho = -Math.PI / 2 + (11.97 / 12) * Math.PI * 2;
    linea(cx, cy, Math.round(cx + Math.cos(ho) * 8), Math.round(cy + Math.sin(ho) * 8), K); linea(cx, cy, Math.round(cx + Math.cos(mi) * 12), Math.round(cy + Math.sin(mi) * 12), K);
    linea(cx, cy, Math.round(cx + Math.cos(s - Math.PI / 2) * 13), Math.round(cy + Math.sin(s - Math.PI / 2) * 13), C.rojo); disco(cx, cy, 1, K); }
  // las tres notas de la izquierda: 12/2023 con el triángulo del tráiler, 2025 y 5/2026 (las dos se tachan con o.calendario)
  geo.notas.forEach(([x0, y0, x1, y1], k) => { const lev = Math.sin(t * 1.3 + k * 2) > 0.7 ? 1 : 0, col = [hex('#a8e0f8'), hex('#f8e070'), hex('#f8a8c0')][k];
    rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, hex('#8a5a52')); rect(x0, y0, x1, y1, col); rect(x0, y0, x1, y0 + 1, h_mezcla(col, C.blanco, 0.4));
    R.disco(Math.round((x0 + x1) / 2), y0 + 3, 2, K); R.disco(Math.round((x0 + x1) / 2), y0 + 3, 1, hex('#e83a3a'));
    const txt = ['12/2023', '2025', '5/2026'][k]; h_num(R, txt, Math.round((x0 + x1) / 2) + 1, y0 + 19, hex('#2a2440'), { centro: true });
    if (k === 0) R.poligono([[x0 + 30, y0 + 22], [x0 + 30, y0 + 28], [x0 + 36, y0 + 25]], hex('#e8202a'));
    if (lev) R.poligono([[x1, y1 - 5], [x1, y1], [x1 - 5, y1]], h_mezcla(col, K, 0.3));
    const u = k === 1 ? c / 0.3 : k === 2 ? (c - 0.3) / 0.3 : 0;
    if (u > 0) for (const [a, b, d] of [[[x0 + 4, y0 + 6], [x1 - 4, y1 - 4], 0], [[x1 - 4, y0 + 6], [x0 + 4, y1 - 4], 1]]) { const f = Math.max(0, Math.min(1, u * 2 - d)); if (f <= 0) continue;
      const ex = Math.round(lerp(a[0], b[0], f)), ey = Math.round(lerp(a[1], b[1], f)); linea(a[0], a[1], ex, ey, hex('#e8202a')); linea(a[0] + 1, a[1], ex + 1, ey, hex('#b81018')); } });
  // la hoja del calendario: el clavo y el cordel, la sombra, la foto de la playa (el mar se mueve), la franja del mes con
  // 11 y 2026, la rejilla de noviembre (empieza en domingo) con los días pasados tachados y el 19 que se rodea en rojo
  const [x0, y0, x1, y1] = geo.hoja;
  disco(164, 22, 2, K); disco(164, 22, 1, C.metalL); linea(163, 23, x0 + 30, y0, hex('#5a4030')); linea(165, 23, x1 - 30, y0, hex('#5a4030'));
  rect(x0 + 3, y0 + 3, x1 + 3, y1 + 3, hex('#8a5a52')); rect(x0, y0, x1, y1, K); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#fbf6ea'));
  for (let x = x0 + 6; x < x1 - 4; x += 8) { R.disco(x, y0, 2, K); pset(x, y0 - 1, C.metalL); }
  const fy0 = y0 + 4, fy1 = y0 + 36; R.recorte([x0 + 4, fy0, x1 - 4, fy1]);
  for (let y = fy0; y <= fy1; y++) for (let x = x0 + 4; x <= x1 - 4; x++) { const v = (y - fy0) / (fy1 - fy0); let col;
    if (v < 0.55) col = v + (h_b4(x, y) - 0.5) * 0.12 < 0.3 ? hex('#5ab8f0') : hex('#9adcf8'); else if (v < 0.8) col = ((x + Math.floor(t * 3) + y * 3) % 9 === 0) ? hex('#c8f8f8') : hex('#2ab0c0'); else col = h(x, y, 42) > 0.9 ? hex('#d8b878') : hex('#f4dca0');
    pset(x, y, col); }
  R.disco(x1 - 30, fy0 + 8, 5, hex('#fff4b0')); h_nube(R, x0 + 50 + ((t * 2) % 20), fy0 + 10, 18, 3, [hex('#c8e0f0'), hex('#e8f4fc'), C.blanco]);
  for (const [px, alto, k] of [[x0 + 18, 26, 0], [x0 + 34, 20, 1]]) h_palmera(R, px, fy1 + 1, alto, t * 0.3, k, hex('#2a5a2a'), hex('#4a8a3a'));
  R.recorte(null);
  rect(x0 + 4, y0 + 38, x1 - 4, y0 + 52, hex('#2ab0c0')); rect(x0 + 4, y0 + 38, x1 - 4, y0 + 39, hex('#6ad8e0'));
  h_num(R, '11', x0 + 12, y0 + 50, C.blanco, { sombra: true }); h_num(R, '2026', x1 - 40, y0 + 50, C.blanco, { sombra: true });
  const gx = x0 + 6, gy = y0 + 58, cw = Math.floor((x1 - x0 - 12) / 7), ch = 13;
  for (let i = 0; i < 7; i++) rect(gx + i * cw + 1, gy - 3, gx + i * cw + cw - 2, gy - 3, i === 0 ? hex('#e85a5a') : hex('#b8b0a0'));
  for (let d = 1; d <= 30; d++) { const i = (d - 1) % 7, j = Math.floor((d - 1) / 7), cx = gx + i * cw, cy = gy + j * ch;
    rect(cx, cy + ch - 1, cx + cw - 1, cy + ch - 1, hex('#e8e0d0')); if (i > 0) rect(cx, cy, cx, cy + ch - 1, hex('#e8e0d0'));
    h_num(R, String(d), cx + Math.round(cw / 2) + 1, cy + 10, d === 19 ? hex('#c8202a') : i === 0 ? hex('#c84a4a') : hex('#3a3448'), { centro: true, fina: true });
    if (d < 19) { linea(cx + 2, cy + ch - 3, cx + cw - 3, cy + 2, hex('#5a6a9a')); } }
  geo.dia19 = [gx + 4 * cw + Math.round(cw / 2), gy + 2 * ch + 6];
  const u = Math.max(0, Math.min(1, (c - 0.6) / 0.4));
  if (u > 0) { const [cx, cy] = geo.dia19; for (let a = 0; a < Math.PI * 2.15 * u; a += 0.05) { const r = 10 + Math.sin(a * 2) * 0.6, px = Math.round(cx + Math.cos(a - 2) * r * 1.2), py = Math.round(cy + Math.sin(a - 2) * r * 0.8); pset(px, py, hex('#e8202a')); pset(px, py + 1, hex('#b81018')); } }
  if (c >= 1) { const [cx, cy] = geo.dia19; for (let k = 0; k < 4; k++) { const a = t * 2 + k * 1.57, r = 17 + Math.sin(t * 4) * 2; if (Math.sin(t * 5 + k) > 0) { const px = Math.round(cx + Math.cos(a) * r * 1.2), py = Math.round(cy + Math.sin(a) * r * 0.8); pset(px, py, hex('#fff4b0')); pset(px - 1, py, hex('#e8b830')); pset(px + 1, py, hex('#e8b830')); pset(px, py - 1, hex('#e8b830')); pset(px, py + 1, hex('#e8b830')); } } }
  // la esquina de la hoja que se levanta con el aire
  { const L = 4 + Math.round(Math.sin(t * 1.7) + 1); R.poligono([[x1 - L, y1], [x1, y1 - L], [x1, y1]], hex('#8a5a52')); R.poligono([[x1 - L, y1], [x1, y1 - L], [x1 - L, y1 - L]], hex('#e8e0d0')); }
  return geo;
}

// la paleta de la caja (el azul oscuro del canon)
const h_CAJA = Object.fromEntries(Object.entries({ cuerpo: '#1a2a5a', franja: '#2c4aa8', franjaL: '#6a8ae0', lomo: '#13204a', lomoL: '#2a3c78', raya: '#6a7ab8',
  bandeja: '#101a3e', bandejaS: '#0a1230', bandejaL: '#34488a', eje: '#c8d0e0', tapaIn: '#18265a' }).map(([k, v]) => [k, hex(v)]));

const h_NEGRO = hex('#000000');

// el arte de la portada de la caja y de la pantalla de la tele (u, v de 0 a 1; x, y para la trama): el cielo del ocaso de
// morado a naranja, el sol con sus franjas, el mar con el reflejo del sol y dos palmeras a contraluz; sin letras
const h_OCASO = ['#2a1450', '#4a1e6a', '#7a2a7a', '#b83a7a', '#e85a78', '#ff8a5a', '#ffb860', '#ffd878'].map(hex);

const h_SOL = ['#ffe890', '#ffc870', '#ff9a5a', '#ff6a6a'].map(hex);

const h_MAR = ['#3a1a5a', '#24104a', '#160a36'].map(hex);

const h_PALMA = hex('#1a0c26');

function h_arteCaja(u, v, x, y) {
  if (h_palmaEn(u, v, 0.2, 0.33, 1) || h_palmaEn(u, v, 0.86, 0.42, -1)) return h_PALMA;
  const hor = 0.66;
  if (v < hor) {
    const sr = Math.hypot((u - 0.56) * 1.15, v - 0.56);
    if (sr < 0.22 && !(v > 0.5 && Math.floor((v - 0.5) * 50) % 2 === 1)) { const k = (v - 0.34) / 0.32 * 3; let l = Math.floor(k); if (k - l > h_b4(x, y)) l++; return h_SOL[Math.max(0, Math.min(3, l))]; }
    const k = v / hor * 7 + (sr < 0.34 ? (0.34 - sr) * 6 : 0); let l = Math.floor(k); if (k - l > h_b4(x, y)) l++; return h_OCASO[Math.max(0, Math.min(7, l))];
  }
  const w = (v - hor) / (1 - hor); if (Math.abs(u - 0.56) < 0.16 * (1 - w * 0.6) && (Math.floor(v * 40) % 2 === 0) && h(Math.floor(u * 30), Math.floor(v * 40), 403) > 0.3) return h_SOL[2];
  const k = w * 2; let l = Math.floor(k); if (k - l > h_b4(x, y)) l++; return h_MAR[Math.min(2, l)];
}

// ¿cae (u, v) en la palmera de la portada? (tronco curvo desde abajo hasta la copa en (cx, cy); lado: hacia dónde se inclina)
function h_palmaEn(u, v, cx, cy, lado) {
  if (v > cy && v < 1.02) { const f = (v - cy) / (1.02 - cy), tx = cx - lado * 0.1 * f * f; if (Math.abs(u - tx) < 0.022 + f * 0.012) return true; }
  for (let k = 0; k < 7; k++) { const a = -Math.PI + (k + 0.5) * Math.PI / 7 + (k > 3 ? 0.25 : -0.25), L = 0.2;
    for (let s = 0.04; s <= 1; s += 0.12) { const px = cx + Math.cos(a) * L * s, py = cy + Math.sin(a) * L * s * 0.8 + s * s * L * 0.55; if (Math.abs(u - px) < 0.03 * (1.1 - s) + 0.012 && Math.abs(v - py) < 0.03 * (1.1 - s) + 0.012) return true; } }
  return false;
}

// la paleta del mapa: el mar, la costa, el papel y los colores de las seis regiones ([sombra, cuerpo, luz])
const h_MAPA = (() => { const x = (v) => hex(v); return {
  mar: x('#3a78b0'), medio: x('#4a96c4'), somero: x('#7ad0dc'), ola: x('#a8e4f0'), rejilla: x('#5a90c0'), costa: x('#3a2a26'), lago: x('#3a88c0'),
  papel: x('#efe0b4'), papelS: x('#dcc896'), borde: x('#a8946a'), vecino: x('#c4bca6'), vecinoS: x('#a8a08a'), monte: x('#6a7a5a'), monteS: x('#4a5a3e'),
  reg: [['#e07898', '#f4a8c0', '#ffd0e0'], ['#2aa8b0', '#3ac8d0', '#9af0f0'], ['#4a7a4a', '#6a9a5a', '#9ac078'], ['#c8a038', '#e8c858', '#f8e898'], ['#d07a3a', '#f0a050', '#ffd090'], ['#1e4a2c', '#2e6a3c', '#5a9a5a']].map((a) => a.map(x)),
  regBorde: ['#b84a70', '#1a7a88', '#2e5a32', '#9a7820', '#a8582a', '#163a22'].map(x) }; })();

// el contorno de Florida (lon, lat), sacado de la costa del golfo de hu-comun.js (Natural Earth): de Fernandina hacia el
// sur por el Atlántico, la punta, la costa del golfo hasta Pensacola y la frontera del norte de vuelta
const h_FL = [-81.45, 30.7, -81.25, 29.8, -80.95, 29.1, -80.55, 28.6, -80.55, 28.1, -80.05, 26.8, -80.15, 25.65, -80.2, 25.75, -80.3, 25.6, -80.35, 25.35, -80.3, 25.3, -80.2, 25.5, -80.35, 25.15, -81.15, 25.15, -81.15, 25.4, -81.3, 25.7, -81.6, 25.9, -81.7, 25.85, -81.85, 26.4, -82.05, 26.55, -82.1, 26.5, -82.2, 26.7, -82.1, 26.65, -82.05, 26.95, -82.2, 26.9, -82.15, 26.8, -82.25, 26.7, -82.7, 27.45, -82.75, 27.55, -82.65, 27.5, -82.4, 27.85, -82.5, 27.9, -82.45, 27.8, -82.55, 27.85, -82.55, 27.95, -82.7, 28.05, -82.7, 27.95, -82.6, 27.8, -82.75, 27.6, -82.85, 27.85, -82.85, 28.2, -82.8, 28.05, -82.65, 28.6, -82.8, 29.15, -83.05, 29.15, -83.1, 29.25, -83.4, 29.5, -83.4, 29.65, -84, 30.1, -84.25, 30.1, -84.35, 30, -84.35, 29.9, -84.55, 29.9, -84.9, 29.75, -84.9, 29.8, -85.1, 29.7, -85, 29.6, -84.7, 29.75, -85.05, 29.6, -85.35, 29.65, -85.4, 29.85, -85.35, 29.7, -85.3, 29.8, -85.45, 29.95, -86.3, 30.35, -86.75, 30.4, -87.45, 30.3, -87.6, 30.95, -87.6, 31.0, -85.05, 31.0, -84.9, 30.7, -82.2, 30.57, -82.05, 30.75];

// Leonida: el mismo contorno suavizado y redondeado a cuartos de grado (más gordo y de dibujo), con el mango del norte
// un poco más corto
const h_LEO = (() => { const n = h_FL.length / 2, P = [];
  for (let i = 0; i < n; i++) { let a = 0, b = 0; for (let d = -2; d <= 2; d++) { const k = (i + d + n) % n; a += h_FL[2 * k]; b += h_FL[2 * k + 1]; } a /= 5; b /= 5;
    if (a < -84.6) a = -84.6 + (a + 84.6) * 0.82; if (b < 29.5) a += (a + 81.4) * 0.12; P.push(Math.round(a * 4) / 4, Math.round(b * 4) / 4); }
  return P; })();

// los Cayos: los de verdad, menudos, y los de Leonida, más gordos y más separados
const h_CAYOS_FL = [[-80.45, 25.08, 0.07], [-80.62, 24.95, 0.06], [-80.85, 24.82, 0.06], [-81.08, 24.72, 0.07], [-81.32, 24.66, 0.06], [-81.55, 24.6, 0.06], [-81.78, 24.56, 0.07]];

const h_CAYOS_LEO = [[-80.45, 25.0, 0.13], [-80.75, 24.78, 0.15], [-81.1, 24.62, 0.14], [-81.45, 24.55, 0.13], [-81.8, 24.52, 0.15], [-81.5, 24.6, 0.0], [-81.8, 24.52, 0.0]];

const h_SEMILLAS = [[-80.25, 25.95, 0.55], null, [-81.0, 25.75, 0.9], [-81.1, 27.2, 1.15], [-85.6, 30.35, 1.0], [-82.4, 29.4, 1.2]];

const h_MASCARAS = new Map();

// la máscara del mapa para un ancho w y una mezcla fl (en décimas): por píxel, la región (−1 mar, 0–5 regiones, 6 lago,
// 7 tierra vecina) y las marcas (1 costa, 2 frontera entre regiones, 4 mar somero, 8 mar medio); se guarda (pocas)
function h_mascaraMapa(w, fl) {
  const clave = w + '|' + fl; if (h_MASCARAS.has(clave)) return h_MASCARAS.get(clave);
  const H = Math.round(w * 0.66), s = (H * 0.92) / 6.8, lon0 = -83.0, lat0 = 27.8;
  const px = (lon) => w / 2 + (lon - lon0) * s * 0.88, py = (lat) => H / 2 - (lat - lat0) * s;
  const n = h_FL.length / 2, poly = []; for (let i = 0; i < n; i++) poly.push([px(lerp(h_LEO[2 * i], h_FL[2 * i], fl)), py(lerp(h_LEO[2 * i + 1], h_FL[2 * i + 1], fl))]);
  const cayos = h_CAYOS_FL.map((c, i) => { const l = h_CAYOS_LEO[i]; return [px(lerp(l[0], c[0], fl)), py(lerp(l[1], c[1], fl)), Math.max(0.6, lerp(l[2], c[2], fl) * s)]; });
  const dentro = (X, Y) => { let d = false; for (let i = 0, j = n - 1; i < n; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > Y) !== (yj > Y) && X < (xj - xi) * (Y - yi) / (yj - yi) + xi) d = !d; } return d; };
  const reg = new Int8Array(w * H).fill(-1), fla = new Uint8Array(w * H), grid = new Uint8Array(w * H), cen = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let j = 0; j < H; j++) for (let i = 0; i < w; i++) {
    const X = i + 0.5, Y = j + 0.5, lon = lon0 + (X - w / 2) / (s * 0.88), lat = lat0 - (Y - H / 2) / s, k = j * w + i;
    if (Math.abs(((lon % 2) + 2) % 2) < 1 / (s * 0.88) || Math.abs(((lat % 2) + 2) % 2) < 1 / s) grid[k] = (i + j) % 3 === 0 ? 1 : 0;
    if (lat > 31.0 || (lat > 30.28 && lon < -87.6)) { reg[k] = 7; continue; }
    if (lon > -79.2 && lon < -77.3 && ((Math.hypot((lon + 77.9) * 0.88, lat - 24.6) < 0.35) || Math.hypot((lon + 78.3) * 0.88, lat - 26.6) < 0.2 || Math.hypot((lon + 77.4) * 0.88, lat - 26.5) < 0.18)) { reg[k] = 7; continue; }
    let r = -1;
    if (dentro(X, Y)) {
      if (Math.hypot((lon + 80.83) * 0.88 * 1.1, lat - 26.95) < 0.27) r = 6;
      else { let best = 1e9; h_SEMILLAS.forEach((S, q) => { if (!S) return; const d = Math.hypot((lon - S[0]) * 0.88, lat - S[1]) / S[2]; if (d < best) { best = d; r = q; } }); if (lat < 25.3 && lon < -80.4) r = 1; }
    } else for (const [cx, cy, cr] of cayos) if (Math.hypot(X - cx, (Y - cy) * 1.3) < cr) { r = 1; break; }
    reg[k] = r; if (r >= 0 && r < 6) { cen[r][0] += i; cen[r][1] += j; cen[r][2]++; }
  }
  // la costa (tierra que toca el mar), las fronteras y el mar somero (dos franjas)
  const R_ = (i, j) => (i < 0 || j < 0 || i >= w || j >= H ? -9 : reg[j * w + i]);
  for (let j = 0; j < H; j++) for (let i = 0; i < w; i++) { const k = j * w + i, r = reg[k];
    if (r >= 0 && r !== 7) { if (R_(i + 1, j) === -1 || R_(i - 1, j) === -1 || R_(i, j + 1) === -1 || R_(i, j - 1) === -1) fla[k] |= 1;
      else if (r < 6) { const a = R_(i + 1, j), b = R_(i, j + 1); if ((a >= 0 && a < 6 && a !== r) || (b >= 0 && b < 6 && b !== r)) fla[k] |= 2; } }
    else if (r === 7 && (R_(i + 1, j) === -1 || R_(i, j + 1) === -1 || R_(i - 1, j) === -1 || R_(i, j - 1) === -1)) fla[k] |= 1; }
  const d2 = Math.max(2, Math.round(w / 60)), d4 = d2 * 2 + 1;
  for (let j = 0; j < H; j++) for (let i = 0; i < w; i++) { const k = j * w + i; if (reg[k] !== -1) continue; let m = 99;
    for (let b = -d4; b <= d4; b++) for (let a = -d4; a <= d4; a++) { const q = R_(i + a, j + b); if (q >= 0 && q !== 6) { const d = Math.max(Math.abs(a), Math.abs(b)); if (d < m) m = d; } }
    if (m <= d2) fla[k] |= 4; else if (m <= d4) fla[k] |= 8; }
  const M = { h: H, reg, fl: fla, grid, px, py, cen: cen.map(([a, b, c]) => (c ? [Math.round(a / c), Math.round(b / c)] : [0, 0])) };
  if (h_MASCARAS.size > 40) h_MASCARAS.delete(h_MASCARAS.keys().next().value);
  h_MASCARAS.set(clave, M); return M;
}

// el icono de una región encendida del mapa (r 0–4), de 7 px, con su contorno: palmera de neón, puente, caimán, caña, ancla
function h_iconoMapa(R, r, cx, cy) {
  const F = [['..#.#..', '.#####.', '#..#..#', '...#...', '...#...', '...#...', '..###..'], ['.......', '.#####.', '#.#.#.#', '#######', '#.....#', '.......', '.......'],
    ['.......', '....##.', '##.####', '#######', '.#.#.#.', '.......', '.......'], ['#.#.#..', '#.#.#..', '#.#.#.#', '#.#.#.#', '#.#.#.#', '#.#.#.#', '#######'],
    ['...#...', '..###..', '...#...', '...#...', '#..#..#', '.#.#.#.', '..###..']][r];
  const col = [hex('#ff4fa8'), hex('#f6f2ea'), hex('#1e2a16'), hex('#6a8a2a'), hex('#2a3a6a')][r], x0 = cx - 3, y0 = cy - 3;
  for (let j = 0; j < 7; j++) for (let i = 0; i < 7; i++) if (F[j][i] === '#') for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const ii = i + a, jj = j + b; if (ii < 0 || jj < 0 || ii > 6 || jj > 6 || F[jj][ii] !== '#') R.pset(x0 + ii, y0 + jj, r === 1 ? C.k : hex('#fff4d8')); }
  for (let j = 0; j < 7; j++) for (let i = 0; i < 7; i++) if (F[j][i] === '#') R.pset(x0 + i, y0 + j, col);
}

// qué vista piden las opciones (un encuadre que no existe cae en 'puente'; una cámara que no es la suya, en 'general')
function b_vistaCayos(o) {
  const enc = o.encuadre === 'cayo' ? 'cayo' : 'puente', otra = enc === 'puente' ? 'barandilla' : 'muelle';
  return { enc, cam: o.camara === otra ? otra : 'general' };
}

// la paleta propia de los Cayos
const BC = pal({
  k: '#1a1622', cielo0: '#3a78cc', cielo1: '#5c9ce0', cielo2: '#8ec0ee', cielo3: '#c2e0f4',
  hormigon: '#cfcabc', hormigonL: '#ebe7dc', hormigonS: '#a39e90', hormigonD: '#77726a', oxido: '#9a6a42', verdin: '#7a8a66',
  asfalto: '#5a5a62', asfaltoL: '#6c6c74', asfaltoS: '#46464e', lineaB: '#e8e8e0', lineaA: '#f0c040',
  acero: '#a8562e', aceroS: '#6a3420', aceroL: '#d07a44',
  mangle: '#2e5a34', mangleS: '#1c3a26', mangleL: '#4e8040', mangleLL: '#78a850', arena: '#f0e2b0', arenaS: '#cdb886',
  lejos: '#6a9aa8', lejosS: '#5a8696', palma: '#3a7a3a', palmaL: '#68aa48', palmaS: '#24502c', tronco: '#8a6a4a', troncoS: '#5e4632',
  blanco: '#fbfaf4', gris: '#b8bcc4', grisS: '#7c808a', rojo: '#d8403a', azul: '#2c5aa0', verde: '#2a7a4a', amarillo: '#f4cc48',
  pelBody: '#7c7468', pelD: '#4e4a44', pelL: '#a8a090', pelHead: '#f4f0e0', pelCrown: '#f0d070', pelNeck: '#6a3a2a',
  pelBill: '#c8b890', pelTip: '#e88a3a', pelPouch: '#5a4a40', pelLeg: '#3a3a3a',
  tablon: '#a87c52', tablonL: '#c89a6a', tablonS: '#7a5636', tablonD: '#4a3222', cabo: '#d8c48a', caboS: '#a08c5a',
});

// mezcla dos colores (k = 0 el primero, 1 el segundo)
function b_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// la matriz de Bayer 4 × 4, para tramar degradados a dos tonos
const b_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// ruido suave (valor interpolado) y su suma en tres octavas
function b_vn(x, y, k) { const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(ix, iy, k), b = h(ix + 1, iy, k), c = h(ix, iy + 1, k), d = h(ix + 1, iy + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; }

function b_fbm(x, y, k) { return b_vn(x, y, k) * 0.55 + b_vn(x * 2.1, y * 2.1, k + 1) * 0.3 + b_vn(x * 4.3, y * 4.3, k + 2) * 0.15; }

// cifras de 3 × 5 (para el poste del kilómetro)
const b_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

function b_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = b_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// la capa fija de un encuadre: se pinta una vez por lienzo (búfer de R.nuevo()) con tres mapas: tipo (0 fijo, 1 cielo, 2
// agua, 3 agua en sombra), prof (0 bajío claro … 1 canal hondo, ya con su trama) y marca (2: lo lejano, por detrás de lo
// que se mueve; 1: tierra o pila que moja el agua, para la espuma de la orilla). Devuelve L con la lista de la orilla
const b_CACHE = new WeakMap();

function b_capa(R, clave, dibuja) {
  let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = {}));
  if (!m[clave]) {
    const L = { buf: R.nuevo(), tipo: new Uint8Array(57600), prof: new Float32Array(57600), marca: new Uint8Array(57600), orilla: [] };
    const prev = R.usar(L.buf); dibuja(L); R.usar(prev);
    for (let y = 1; y < 179; y++) for (let x = 1; x < 319; x++) { const i = y * 320 + x; if (L.tipo[i] >= 2 && (L.marca[i - 320] === 1 || L.marca[i - 1] === 1 || L.marca[i + 1] === 1)) L.orilla.push(x, y); }
    m[clave] = L;
  }
  R.copiar(m[clave].buf);
  return m[clave];
}

// en una capa: pinta un píxel y le pone su tipo (y, si se da, su marca)
function b_ps(R, L, x, y, c, tipo = 0, marca = -1) { x |= 0; y |= 0; if (x < 0 || x > 319 || y < 0 || y > 179) return; const i = y * 320 + x; L.buf[i] = c; L.tipo[i] = tipo; if (marca >= 0) L.marca[i] = marca; }

function b_rectL(R, L, x0, y0, x1, y1, c, tipo = 0, marca = -1) { for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) b_ps(R, L, x, y, c, tipo, marca); }

// ¿se puede pintar aquí algo que se mueve por detrás de lo fijo? (cielo, agua o lo lejano)
const b_fondo = (L, x, y) => { if (x < 0 || x > 319 || y < 0 || y > 179) return false; const i = (y | 0) * 320 + (x | 0); return L.tipo[i] >= 1 || L.marca[i] === 2; };

const b_psF = (R, L) => (x, y, c) => { if (b_fondo(L, x, y)) R.pset(x, y, c); };

// el cielo tramado en degradado (paradas [posición 0–1, color]) de y0 a y1, y el sol con su halo; tipo 1
function b_cieloFijo(R, L, y0, y1, paradas, sol, solCol) {
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0); let k = 0; while (k < paradas.length - 2 && u > paradas[k + 1][0]) k++;
    const [ua, ca] = paradas[k], [ub, cb] = paradas[k + 1], f = Math.max(0, Math.min(1, (u - ua) / (ub - ua)));
    for (let x = 0; x < 320; x++) b_ps(R, L, x, y, f > b_BAYER[(y & 3) * 4 + (x & 3)] ? cb : ca, 1); }
  if (sol) { const [sx, sy, r] = sol;
    for (let j = -r * 3; j <= r * 3; j++) for (let i = -r * 3; i <= r * 3; i++) { const d = Math.hypot(i, j), x = sx + i, y = sy + j; if (y < y0 || y > y1 || x < 0 || x > 319) continue; const q = y * 320 + x;
      if (d <= r) b_ps(R, L, x, y, d > r - 1.2 ? solCol[1] : (i + j < -r * 0.6 ? solCol[2] : solCol[0]), 1);
      else if (d < r * 3 && (r * 3 - d) / (r * 2) > b_BAYER[(y & 3) * 4 + (x & 3)] * 1.6) L.buf[q] = b_mezcla(L.buf[q], solCol[0], 0.35); } }
}

// el agua fija: su profundidad a partir de un ruido en perspectiva (hor, el horizonte) con un canal; tipo 2
function b_aguaFija(R, L, hor, y1, sem, canal = null) {
  for (let y = hor; y <= y1; y++) { const p = (y - hor + 1) / (180 - hor), s = 0.07 + p * 0.93;
    for (let x = 0; x < 320; x++) { const wx = (x - 160) / s, wz = 1 / s, n = b_fbm(wx * 0.008 + 31, wz * 0.42, sem);
      let v = Math.max(0, Math.min(1, (n - 0.38) * 2.6)); if (canal) v = Math.max(v, 1 - Math.abs(wz - canal[0]) / canal[1]);
      const i = y * 320 + x; L.tipo[i] = 2; L.prof[i] = Math.max(0, Math.min(1, v * 0.92 + 0.04)); } }
}

// las rampas del agua (0 hondo … 9 arena) por bandas de distancia (la bruma tiñe lo lejano) y la de la sombra
function b_rampas(cols, bruma, sombra) {
  const base = cols.map(hex), N = 8, A = [], S = [];
  for (let b = 0; b < N; b++) { const f = Math.pow(1 - b / (N - 1), 2) * 0.55; A.push(base.map((c) => b_mezcla(c, hex(bruma), f))); S.push(base.map((c) => b_mezcla(b_mezcla(c, hex(bruma), f), hex(sombra), 0.38))); }
  return { A, S };
}

const B_AGUA_DIA = b_rampas(['#173f78', '#1d5690', '#226ea6', '#2788b8', '#2fa2c4', '#3cb8ca', '#58cacb', '#80d8c8', '#ace2c4', '#d6e6bc'], '#b4d8ec', '#0c2448');

const B_AGUA_TARDE = b_rampas(['#2a2c62', '#343a76', '#40488a', '#5a5494', '#7a5e98', '#a06a96', '#c87a8e', '#e4927e', '#f4b07c', '#fcd296'], '#f0a888', '#20183a');

// el agua de cada fotograma (una pasada por las filas de agua): ondas en trazos que corren (más largas y rápidas cerca),
// el vaivén lento de los bajíos, crestas y borreguitos (A.oleaje), las sombras de las nubes (A.sombras: [x, y, rx, ry])
// y los destellos del sol en su columna (A.sol: [x, ancho]); luego la espuma de las orillas
function b_agua(R, t, L, A) {
  const B = R.buf, { tipo, prof } = L, hor = A.hor, ol = A.oleaje || 0, rp = A.rampas, br = A.brillo, sm = A.sombras || [];
  for (let y = hor; y < 180; y++) {
    const p = (y - hor + 1) / (180 - hor), band = Math.min(7, (p * 8) | 0), RA = rp.A[band], RS = rp.S[band], f = y * 320;
    const Ld = 2 + p * 10, vel = (3 + p * 16) * ((y * 7) % 3 === 0 ? -0.6 : 1), umb = 0.88 - ol * (0.16 - p * 0.08), esp = 0.985 - ol * (0.07 - p * 0.03);
    for (let x = 0; x < 320; x++) {
      const tp = tipo[f + x]; if (tp < 2) continue;
      const v = prof[f + x]; let k = (1 - v) * 9 - ol * (1 - p) * 1.4 + Math.sin(t * 0.7 + x * 0.043 + y * 0.29) * 0.35 + (b_BAYER[(y & 3) * 4 + (x & 3)] - 0.5) * 0.95;
      const u = x + t * vel + y * 37.3, c = Math.floor(u / Ld), fr = u / Ld - c, r = h(c, y, 77);
      let col = -1;
      if (r > umb && fr < 0.7) { k += 1.5 + ol * 0.8; if (r > esp && v > 0.25 && fr < 0.55) col = br[1]; }
      else if (r < 0.1 && fr < 0.6) k -= 1.1;
      for (let s = 0; s < sm.length; s++) { const q = sm[s], dx = (x - q[0]) / q[2], dy = (y - q[1]) / q[3]; if (dx * dx + dy * dy < 1) k -= 1.3; }
      if (col < 0) { const ki = k < 0 ? 0 : k > 9 ? 9 : Math.round(k); col = (tp === 3 ? RS : RA)[ki]; }
      if (A.sol && tp === 2 && Math.abs(x - A.sol[0]) < A.sol[1] * (0.3 + p) && r > 0.72 && fr < 0.45 && Math.sin(t * 7 + c * 1.7) > 0.2) col = br[0];
      B[f + x] = col;
    }
  }
  const O = L.orilla;
  for (let n = 0; n < O.length; n += 2) { const x = O[n], y = O[n + 1], s = Math.sin(t * 2.3 + x * 0.31 + y * 0.7) + ol * 0.6;
    if (s > 0.25) { B[y * 320 + x] = br[1]; if (s > 0.9 && y < 179 && tipo[(y + 1) * 320 + x] >= 2) B[(y + 1) * 320 + x] = rp.A[7][9]; } }
}

// las nubes de algodón de tres tonos (sombra, cuerpo, luz) que van a tres velocidades; solo sobre el cielo y, junto a la
// esquina de Atom y la barra del año, se funden con el cielo (fondo tranquilo). N: [[x0, y, ancho, velocidad, semilla]]
function b_nubes(R, t, L, N, pal3) {
  const B = R.buf;
  for (const [x0, cy, w, v, sem] of N) {
    const span = 320 + w * 2, cx = ((x0 + t * v) % span + span) % span - w, n = 4 + Math.round(w / 12), bolas = [];
    for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.13 + 0.15 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06, r]); }
    for (let capa = 0; capa < 3; capa++) for (const [bx, by, r0] of bolas) {
      const r = capa === 2 ? r0 * 0.66 : r0, ox = capa === 2 ? -1 : 0, oy = capa === 0 ? 1 : capa === 2 ? -2 : 0, col = pal3[capa];
      for (let y = Math.floor(by + oy - r); y <= Math.ceil(by + oy + r); y++) for (let x = Math.floor(bx + ox - r); x <= Math.ceil(bx + ox + r); x++) {
        if (x < 0 || x > 319 || y < 0 || y > 179) continue; const dx = x + 0.5 - bx - ox, dy = y + 0.5 - by - oy; if (dx * dx + dy * dy > r * r) continue;
        const i = y * 320 + x; if (L.tipo[i] !== 1) continue;
        const za = Math.max(0, Math.min(1, Math.min(x - 262, 54 - y) / 10)), zb = x < 178 && x > 12 ? Math.max(0, Math.min(1, (26 - y) / 6)) : 0, z = Math.max(za, zb);
        B[i] = z > 0 ? b_mezcla(col, B[i], 0.78 * z) : col; } }
    const y0 = Math.round(cy + w * 0.08); for (let x = Math.round(cx - w * 0.44); x <= Math.round(cx + w * 0.44); x++) if (x >= 0 && x < 320 && L.tipo[y0 * 320 + x] === 1 && !(x > 262 && y0 < 54)) B[y0 * 320 + x] = pal3[0];
  }
}

// un dibujo de filas de caracteres con contorno automático: partes [[filas, dx, dy]], el ancla (x, y) es el pie, en la
// columna ac de la rejilla y su última fila; dir −1 lo voltea; ps(x, y, c) pinta (para recortar a la máscara)
function b_sprite(ps, partes, P, x, y, dir, ac, alto, contorno) {
  const llenos = new Map();
  for (const [filas, dx = 0, dy = 0] of partes) filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const ch = f[i]; if (ch === '.' || !P[ch]) continue; const X = Math.round(x + dir * (i - ac + dx)), Y = Math.round(y - alto + 1 + j + dy); llenos.set(X + ',' + Y, P[ch]); } });
  if (contorno != null) for (const key of llenos.keys()) { const [X, Y] = key.split(',').map(Number); for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!llenos.has((X + a) + ',' + (Y + b))) ps(X + a, Y + b, contorno); }
  for (const [key, c] of llenos) { const [X, Y] = key.split(',').map(Number); ps(X, Y, c); }
}

// EL PELÍCANO PARDO (exportado: la escena lo usa para el robo del bocadillo). (x, y) son sus pies; o.dir (1 mira a la
// derecha), o.vuela (planea con las alas abiertas; aletea si o.aleteo), o.buche 0–1 (el buche se hincha: lleva algo),
// o.ps (función de pintar, para recortarlo). Posado mide 16 × 19 px con su contorno; en vuelo, 25 × 9. Parpadea y gira la
// cabeza solo con t
export function b_pelicano(R, x, y, t, o = {}) {
  const dir = o.dir ?? 1, ps = o.ps ?? R.pset, P = { b: BC.pelBody, B: BC.pelD, g: BC.pelL, w: BC.pelHead, y: BC.pelCrown, c: BC.pelNeck, p: BC.pelBill, o: BC.pelTip, P: BC.pelPouch, l: BC.pelLeg, k: BC.k };
  if (o.vuela) {
    // en vuelo: las alas en «M» pardas con el borde claro y las puntas negras, el cuerpo, la cabeza blanca y el pico largo
    const a = o.aleteo ? Math.sin(t * 9 + x * 0.1) : 0.6, x0 = Math.round(x), y0 = Math.round(y);
    for (const s of [-1, 1]) { const ex = x0 + s * 6, ey = y0 - 2 - Math.round(a * 3), tx = x0 + s * 12, ty = y0 + 1 - Math.round(a * 6);
      R.linea(x0 + s * 2, y0 + 1, ex, ey + 1, (xx, yy) => { ps(xx, yy, BC.pelD); ps(xx, yy - 1, BC.pelL); ps(xx, yy + 1, BC.k); return null; });
      R.linea(ex, ey + 1, tx, ty, (xx, yy) => { const pu = Math.abs(xx - x0) > 9; ps(xx, yy, pu ? BC.k : BC.pelD); ps(xx, yy - 1, pu ? BC.k : BC.pelBody); return null; }); }
    for (let i = -3; i <= 3; i++) { ps(x0 + i, y0, BC.pelBody); ps(x0 + i, y0 + 1, Math.abs(i) < 3 ? BC.pelD : BC.k); ps(x0 + i, y0 - 1, Math.abs(i) < 2 ? BC.pelL : BC.k); }
    const hx = x0 + dir * 4; ps(hx, y0 - 1, BC.pelHead); ps(hx + dir, y0 - 1, BC.pelHead); ps(hx, y0 - 2, BC.pelCrown); ps(hx + dir, y0 - 2, BC.k); ps(hx + dir, y0, BC.pelPouch);
    for (let i = 2; i <= 8; i++) { ps(hx + dir * i, y0 - 1 + (i > 6 ? 1 : 0), i === 8 ? BC.pelTip : BC.pelBill); if (i < 7) ps(hx + dir * i, y0, BC.pelPouch); }
    ps(x0 - dir * 4, y0, BC.pelD); ps(x0 - dir * 5, y0, BC.k); return;
  }
  const parpa = (t * 0.9 + x * 0.13) % 3.2 < 0.12, mira = Math.sin(t * 0.6 + x) > 0.75 ? 1 : 0, sacude = (t * 0.5 + x * 0.07) % 6 < 0.35;
  const cab = [
    '......yw......',
    '.....wwww.....',
    parpa ? '.....wwwwppp..' : '.....wkwwppp..',
    '......wPpppp..',
    o.buche > 0.5 ? '......wPPPPpo.' : '......wPPPppo.',
    o.buche > 0.5 ? '......cwPPPP..' : '......cwPP....',
    '......cw......',
    '.....ccw......'];
  const cuerpo = ['...bbbcbw.....', '..bgbbbbbw....', '.bgbgbbbbb....', 'bgbgbgbbbb....', 'BbgbgbbbbB....', '.BBbbbbbB.....', '...BBBBB......', '.....l.l......', '....ll.ll.....'];
  b_sprite(ps, [[cab, mira ? -1 : 0, sacude ? (Math.floor(t * 12) % 2) : 0], [[...Array(8).fill('..............'), ...cuerpo], 0, 0]], P, x, y, dir, 7, 17, o.contorno === false ? null : BC.k);
}

// una gaviota pequeña que vuela (aletea con t); ps recorta
function b_gaviota(ps, x, y, t, k = 0, tarde = false) {
  x = Math.round(x); y = Math.round(y); const up = Math.sin(t * 7 + k * 2.1) > 0, cb = tarde ? hex('#f4dcc8') : BC.blanco, cg = tarde ? hex('#8a6a7a') : BC.grisS;
  const P = up ? [[-3, -2, cg], [-2, -1, cb], [-1, 0, cb], [0, 0, cb], [1, 0, cb], [2, -1, cb], [3, -2, cg]] : [[-3, 1, cg], [-2, 0, cb], [-1, 0, cb], [0, 0, cb], [1, 0, cb], [2, 0, cb], [3, 1, cg]];
  for (const [a, b, c] of P) ps(x + a, y + b, c); ps(x, y + 1, cg);
}

// una palmera que se mece: tronco curvo con anillos, cocos y siete hojas con sus folíolos (x, base: el pie; tn tiñe)
function b_palmera(R, x, base, alto, t, k = 0, tn = (c) => c, ps = R.pset) {
  const lean = (h(k, 1, 900) - 0.5) * alto * 0.5, sway = Math.sin(t * 1.1 + k * 1.7) * 1.2;
  let px = x, py = base;
  for (let i = 0; i <= alto; i++) { const u = i / alto, cx = x + lean * u * u + sway * u * u, cy = base - i, w = u < 0.15 ? 2 : 1;
    for (let d = -w; d <= w + 1; d++) ps(Math.round(cx + d), cy, tn(d === -w ? BC.troncoS : d === w + 1 ? BC.k : (i % 3 === 0 ? BC.troncoS : d > 0 ? BC.troncoS : BC.tronco)));
    px = cx; py = cy; }
  const tx = Math.round(px), ty = Math.round(py);
  for (let f = 0; f < 9; f++) {
    const a = -Math.PI / 2 + (f - 4) * 0.44 + Math.sin(t * 1.6 + k + f * 0.9) * 0.08, L = Math.min(20, alto * (0.38 + 0.1 * h(f, k, 901))), droop = (0.22 + 0.07 * Math.abs(f - 4)) / L;
    for (let s = 1; s <= L; s++) { const xx = tx + Math.cos(a) * s * 1.15, yy = ty + Math.sin(a) * s * 0.75 + droop * s * s, u = s / L;
      ps(Math.round(xx), Math.round(yy), tn(u < 0.4 ? BC.palmaS : BC.palma)); if (u < 0.5) ps(Math.round(xx), Math.round(yy) + 1, tn(BC.palmaS));
      if (s > 1) { const lf = Math.max(1, Math.round((1 - u) * 3)); for (const ld of [1.5, -1.5]) for (let q = 1; q <= lf; q++) ps(Math.round(xx + Math.cos(a + ld) * q * 0.8), Math.round(yy + Math.sin(a + ld) * q * 0.5 + q * 0.45), tn(ld > 0 ? BC.palmaL : BC.palma)); } }
  }
  ps(tx - 1, ty + 1, tn(BC.troncoS)); ps(tx + 1, ty + 1, tn(BC.troncoS)); ps(tx, ty + 2, tn(BC.troncoS));
}

// una lancha de consola central de lado (x el centro, yA la línea del agua): casco blanco con franja, toldo, motor y
// un patrón diminuto; cabecea con t; ps recorta. Deja la estela a cargo de b_estela
function b_lancha(ps, x, yA, t, dir = 1, col = BC.azul, s = 1, ol = 0) {
  const cab = Math.round(Math.sin(t * (2 + ol * 2) + x * 0.05) * (0.6 + ol)), y = yA + cab, L = Math.round(16 * s);
  for (let i = -L; i <= L; i++) { const proa = (i * dir) > L - 5 ? Math.min(3, (i * dir) - (L - 5)) : 0; for (let j = -4; j <= -proa; j++) ps(x + i, y + j, j === -4 ? BC.blanco : j === -2 ? col : j === -proa ? BC.grisS : BC.blanco); ps(x + i, y + 1 - proa, BC.k); }
  for (let j = -9; j <= -5; j++) ps(x - dir * 2, y + j, BC.grisS);
  for (let i = -6; i <= 2; i++) ps(x + dir * i - dir * 2, y - 10, BC.blanco);
  for (let i = -6; i <= 2; i += 8) for (let j = -9; j <= -5; j++) ps(x + dir * i - dir * 2, y + j, BC.grisS);
  ps(x + dir * 1, y - 6, hex('#e8b088')); ps(x + dir * 1, y - 7, hex('#3a2a1a')); ps(x + dir * 1, y - 5, BC.rojo);
  for (let j = -6; j <= 1; j++) ps(x - dir * (L + 1), y + j, j < -3 ? BC.k : BC.grisS);
}

// la estela de una lancha en V detrás de ella (sobre el agua, que la recorta ps)
function b_estela(ps, x, yA, t, dir, largo, c1, c2) {
  for (let i = 2; i < largo; i++) { const xx = x - dir * i, ab = i * 0.28; if (h(i, Math.floor(t * 8), 940) < 0.7) { ps(Math.round(xx), Math.round(yA + 1 + ab * 0.35), i < largo * 0.5 ? c1 : c2); ps(Math.round(xx), Math.round(yA - ab * 0.15), c2); } if (i < 10 && h(i, Math.floor(t * 10), 941) < 0.6) ps(Math.round(xx), yA + 1, c1); }
}

// un velerito lejano (vela triangular y casco), ps recorta
function b_velero(ps, x, yA, t, s = 1, vela = BC.blanco, casco = BC.grisS) {
  x = Math.round(x); const cab = Math.round(Math.sin(t * 1.4 + x) * 0.5), y = yA + cab, H = Math.round(10 * s);
  for (let j = 0; j < H; j++) { const w = Math.round((j / H) * 5 * s); for (let i = 0; i <= w; i++) ps(x + 1 + i, y - H + j, i === w ? b_mezcla(vela, BC.k, 0.25) : vela); for (let i = 0; i <= Math.round(w * 0.5); i++) ps(x - 1 - i, y - H + 2 + j * 0.85, b_mezcla(vela, BC.k, 0.12)); }
  for (let j = -H - 1; j <= 0; j++) ps(x, y + j, BC.k);
  for (let i = -Math.round(5 * s); i <= Math.round(6 * s); i++) { ps(x + i, y + 1, casco); ps(x + i, y + 2, BC.k); }
}

// un coche de los de ahora visto de lado (~38 px; x el centro, suelo la línea de las ruedas): carrocería con su luz y
// su sombra, cristales con reflejo, ruedas con radios que giran, faros y la sombra en el asfalto
function b_coche(R, x, suelo, t, col, dir = 1, s = 1) {
  const { rect, pset, disco } = R, c = hex(col), cS = b_mezcla(c, BC.k, 0.35), cL = b_mezcla(c, BC.blanco, 0.35), L = Math.round(19 * s), H = Math.round(7 * s);
  for (let i = -L - 2; i <= L + 2; i++) pset(x + i, suelo + 1, b_mezcla(R.pget(x + i, suelo + 1), BC.k, 0.45));
  rect(x - L, suelo - H - 1, x + L, suelo - 2, BC.k); rect(x - L + 1, suelo - H, x + L - 1, suelo - 3, c); rect(x - L + 1, suelo - 4, x + L - 1, suelo - 3, cS); rect(x - L + 1, suelo - H, x + L - 1, suelo - H, cL);
  const t0 = x - dir * Math.round(L * 0.55), t1 = x + dir * Math.round(L * 0.35), hT = Math.round(6 * s);
  R.poligono([[Math.min(t0, t1) - 2, suelo - H], [Math.min(t0, t1) + 3, suelo - H - hT], [Math.max(t0, t1) - 3, suelo - H - hT], [Math.max(t0, t1) + 2, suelo - H]], BC.k);
  R.poligono([[Math.min(t0, t1) - 1, suelo - H], [Math.min(t0, t1) + 3, suelo - H - hT + 1], [Math.max(t0, t1) - 3, suelo - H - hT + 1], [Math.max(t0, t1) + 1, suelo - H]], hex('#9ac4dc'));
  rect(x - 1, suelo - H - hT + 1, x, suelo - H, cS); for (let j = 1; j < hT - 1; j++) pset(Math.min(t0, t1) + 4 + j, suelo - H - j, BC.blanco);
  rect(x + dir * (L - 1), suelo - H + 1, x + dir * (L - 1), suelo - H + 2, hex('#fff2b0')); rect(x - dir * (L - 1), suelo - H + 1, x - dir * (L - 1), suelo - H + 2, BC.rojo);
  rect(x - 2, suelo - H + 2, x + 2, suelo - H + 2, cS);
  for (const dx of [-L + 6, L - 6]) { const wx = x + Math.round(dx * s / s); disco(wx, suelo - 1, 3.4 * s, BC.k); disco(wx, suelo - 1, 1.8 * s, BC.gris); const a = t * 14 * dir; pset(Math.round(wx + Math.cos(a) * 1.5), Math.round(suelo - 1 + Math.sin(a) * 1.5), BC.grisS); }
}

// una figurita de fondo de 7 px (pescador, paseante): cabeza, camiseta y piernas; caña: lanza el sedal con t
function b_figurita(ps, x, suelo, t, k, o = {}) {
  x = Math.round(x); const cam = [BC.rojo, BC.azul, BC.amarillo, hex('#e87a9a'), BC.blanco, hex('#4aa8a0')][k % 6], piel = [hex('#e8b088'), hex('#a86a48'), hex('#f0c8a0'), hex('#6a4a34')][k % 4];
  const paso = o.anda ? Math.floor(t * 4 + k) % 2 : 0;
  ps(x, suelo - 6, piel); ps(x + 1, suelo - 6, piel); ps(x, suelo - 7, o.gorra ? BC.blanco : hex('#3a2a1a')); ps(x + 1, suelo - 7, o.gorra ? BC.blanco : hex('#3a2a1a'));
  for (let j = -5; j <= -3; j++) { ps(x, suelo + j, cam); ps(x + 1, suelo + j, cam); }
  ps(x - paso, suelo - 2, hex('#3a4a6a')); ps(x - paso, suelo - 1, hex('#3a4a6a')); ps(x + 1 + paso, suelo - 2, hex('#3a4a6a')); ps(x + 1 + paso, suelo - 1, hex('#3a4a6a'));
  if (o.cana) { const u = (t * 0.25 + k * 0.37) % 1, ang = u < 0.08 ? -2.2 + u / 0.08 * 1.6 : -0.6, d = o.dir ?? 1;
    for (let i = 1; i <= 7; i++) ps(Math.round(x + 1 + d * Math.cos(ang) * i), Math.round(suelo - 4 + Math.sin(ang) * i), hex('#3a3026'));
    const ex = x + 1 + d * Math.cos(ang) * 7, ey = suelo - 4 + Math.sin(ang) * 7; if (o.agua) for (let yy = Math.round(ey) + 1; yy < o.agua; yy += 2) ps(Math.round(ex + d * (yy - ey) * 0.1), yy, hex('#d8d8d0')); }
  if (o.brazos) { const a = Math.sin(t * 6 + k) > 0; ps(x - 1, suelo - (a ? 6 : 5), cam); ps(x + 2, suelo - (a ? 5 : 6), cam); }
}

// dónde va una nube en el instante t (la misma cuenta que b_nubes), para su sombra en el agua
const b_nubeX = (x0, v, w, t) => { const span = 320 + w * 2; return ((x0 + t * v) % span + span) % span - w; };

// un cayo de manglar (de x0 a x1, con su orilla en yA): la copa con bultos y luz arriba, las raíces oscuras en arco abajo,
// una playa si o.playa = [xa, xb]; alrededor, el bajío claro en el agua; la orilla moja (espuma). tn tiñe
function b_isla(R, L, x0, x1, yA, alto, sem, tn = (c) => c, o = {}) {
  const lejos = !!o.lejos, mk = lejos ? 2 : 0;
  for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const u = (x - x0) / (x1 - x0), env = Math.pow(Math.max(0, Math.sin(Math.PI * u)), 0.45), top = Math.round(yA - alto * env * (0.62 + 0.5 * b_vn(x * 0.13, 0, sem)));
    const playa = o.playa && x >= o.playa[0] && x <= o.playa[1];
    for (let y = top; y <= yA; y++) {
      let c; const d = y - top, q = h(x, y, sem);
      if (lejos) c = d === 0 ? BC.lejos : (q < 0.2 ? BC.lejosS : BC.lejos);
      else if (playa && y >= yA - 1) c = y === yA ? BC.arenaS : BC.arena;
      else if (y >= yA - 1) c = ((x + (y === yA ? 1 : 0)) % 3 === 0) ? BC.k : BC.mangleS;
      else if (d === 0) c = BC.mangleLL;
      else if (d === 1) c = q < 0.5 ? BC.mangleL : BC.mangleLL;
      else if (d < 4) c = q < 0.35 ? BC.mangleL : q < 0.85 ? BC.mangle : BC.mangleS;
      else c = q < 0.15 ? BC.mangleL : q < 0.6 ? BC.mangle : BC.mangleS;
      b_ps(R, L, x, y, tn(c), 0, lejos ? 2 : y === yA ? 1 : 0);
    }
  }
  // el bajío alrededor (agua clara): baja la profundidad cerca de la orilla
  const ry = Math.max(3, alto * (lejos ? 0.4 : 0.9)), rx = (x1 - x0) / 2 + ry * 2.5, cx = (x0 + x1) / 2;
  for (let y = yA + 1; y <= Math.min(179, yA + ry); y++) for (let x = Math.max(0, Math.round(cx - rx)); x <= Math.min(319, Math.round(cx + rx)); x++) { const i = y * 320 + x; if (L.tipo[i] < 2) continue;
    const e = Math.hypot((x - cx) / rx, (y - yA) / ry); if (e < 1) L.prof[i] = Math.min(L.prof[i], e * e * 0.7 + (h(x, y, 5) - 0.5) * 0.08); }
}

function b_puenteFijo(R, L, hor, tarde) {
  const tn = tarde ? (c) => b_mezcla(c, hex('#ff9a6a'), 0.18) : (c) => c, yD = 90, yV = 104;
  b_cieloFijo(R, L, 0, hor - 1, tarde ? [[0, hex('#3a3a8a')], [0.5, hex('#a85a9a')], [0.8, hex('#f08a7a')], [1, hex('#ffc890')]] : [[0, BC.cielo0], [0.45, BC.cielo1], [0.8, BC.cielo2], [1, BC.cielo3]], [228, 28, 7], [hex('#fff6d0'), hex('#ffe090'), BC.blanco]);
  b_aguaFija(R, L, hor, 179, 11, [3.2, 0.9]);
  // el horizonte: la hilera de cayos lejanos, con un depósito de agua, la antena y otro puente con cochecitos
  for (const [a, b, al, s] of [[-6, 44, 3, 1], [52, 120, 4, 2], [150, 208, 3, 3], [230, 262, 2, 4], [270, 330, 3, 5]]) b_isla(R, L, a, b, hor + 1, al, 300 + s, tn, { lejos: true });
  for (const [a, b] of [[118, 152], [206, 232]]) for (let x = a; x <= b; x++) { b_ps(R, L, x, hor + 1, tn(BC.gris), 0, 2); b_ps(R, L, x, hor + 2, tn(BC.lejosS), 0, 2); if (x % 4 === 0) b_ps(R, L, x, hor + 3, tn(BC.lejosS), 0, 2); }
  for (let j = 2; j <= 6; j++) { b_ps(R, L, 82, hor - j, tn(BC.lejosS), 0, 2); b_ps(R, L, 86, hor - j, tn(BC.lejosS), 0, 2); }
  for (let j = -2; j <= 2; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j * 2 < 10) b_ps(R, L, 84 + i, hor - 9 + j, tn(j < 0 ? BC.hormigonL : BC.hormigon), 0, 2);
  for (let j = 1; j <= 16; j++) { b_ps(R, L, 34, hor - j, tn(BC.grisS), 0, 2); if (j % 4 === 0) { b_ps(R, L, 33, hor - j, tn(BC.grisS), 0, 2); b_ps(R, L, 35, hor - j, tn(BC.grisS), 0, 2); } }
  for (const x of [60, 66, 104, 168, 176, 296]) { b_ps(R, L, x, hor - 4, tn(BC.lejosS), 0, 2); b_ps(R, L, x, hor - 5, tn(BC.lejosS), 0, 2); for (const d of [-2, -1, 1, 2]) b_ps(R, L, x + d, hor - 6 + (Math.abs(d) > 1 ? 1 : 0), tn(BC.lejosS), 0, 2); }
  // los cayos del término medio: el de la izquierda y el grande de la derecha (playa, casa sobre pilotes, muelle)
  b_isla(R, L, -20, 58, 80, 8, 41, tn, { playa: [30, 52] });
  b_isla(R, L, 226, 340, 88, 15, 42, tn, { playa: [228, 250] });
  { const x0 = 262, x1 = 282; for (let y = 70; y <= 79; y++) for (let x = x0; x <= x1; x++) b_ps(R, L, x, y, tn(x > x1 - 4 ? BC.hormigonS : (y % 2 ? BC.blanco : hex('#e8e8e0')))); 
    for (let j = 0; j < 6; j++) for (let x = x0 - 2 + j; x <= x1 + 2 - j; x++) b_ps(R, L, x, 69 - j, tn(j === 0 ? BC.grisS : (x % 3 === 0 ? BC.grisS : BC.gris)));
    b_rectL(R, L, x0 + 3, 72, x0 + 6, 75, tn(hex('#5a8aa8'))); b_rectL(R, L, x0 + 11, 72, x0 + 14, 75, tn(hex('#5a8aa8'))); b_rectL(R, L, x0 + 8, 73, x0 + 9, 79, tn(hex('#4a7a9a')));
    for (const x of [x0, x0 + 7, x0 + 14, x1]) for (let y = 80; y <= 88; y++) b_ps(R, L, x, y, tn(BC.troncoS), 0, y === 88 ? 1 : -1);
    for (let i = 0; i < 6; i++) b_ps(R, L, x0 - 1 - i, 80 + i, tn(BC.tronco)); }
  for (let x = 236; x <= 256; x++) { b_ps(R, L, x, 89, tn(BC.tablonL)); b_ps(R, L, x, 90, tn(BC.tablonS)); if (x % 5 === 1) for (let y = 91; y <= 93; y++) b_ps(R, L, x, y, tn(BC.tablonD), 0, y === 93 ? 1 : -1); }
  // el puente viejo de Flagler: viga de acero oxidada sobre arcos de hormigón, la celosía «camelback» y el vano que falta
  const hue = (x) => x >= 192 && x <= 206;
  for (let x = 0; x <= 238; x++) { if (hue(x)) continue;
    b_ps(R, L, x, yD - 2, tn(x % 3 ? BC.gris : BC.grisS)); b_ps(R, L, x, yD - 1, tn(x % 3 === 0 ? BC.grisS : BC.hormigonD));
    for (let y = yD; y <= yD + 4; y++) { const q = h(x, y, 61); b_ps(R, L, x, y, tn(y === yD ? BC.aceroL : y === yD + 4 ? BC.aceroS : x % 4 === 0 ? BC.aceroS : q < 0.18 ? BC.oxido : q > 0.9 ? BC.aceroL : BC.acero)); }
    const k = Math.floor(x / 22), dx = x - k * 22;
    for (let y = yD + 5; y <= yV; y++) { const pila = dx < 4, arco = yD + 6 + Math.round(5 * Math.pow(Math.abs(dx - 13) / 9, 2));
      if (pila || y < arco) b_ps(R, L, x, y, tn(pila ? (dx === 3 ? BC.hormigonS : dx === 0 ? BC.hormigonL : BC.hormigon) : y === arco - 1 ? BC.hormigonS : h(x, y, 62) < 0.15 ? BC.hormigonS : BC.hormigon), 0, pila && y === yV ? 1 : -1);
      else L.tipo[y * 320 + x] = 3; } }
  for (const [x, d] of [[191, -1], [207, 1]]) for (let i = 0; i < 4; i++) b_ps(R, L, x + d * i, yD + 1 + (i & 1), BC.aceroS);
  { const tc = (x) => x < 124 ? yD - 1 - (x - 112) : x > 160 ? yD - 1 - (172 - x) : yD - 13;
    for (let x = 112; x <= 172; x++) { b_ps(R, L, x, tc(x), tn(BC.aceroL)); b_ps(R, L, x, tc(x) + 1, tn(BC.aceroS)); }
    for (let x = 118; x <= 166; x += 6) { for (let y = tc(x); y < yD; y++) b_ps(R, L, x, y, tn(BC.acero)); if (x < 166) R.linea(x, tc(x) + 1, x + 6, yD - 1, (xx, yy) => { b_ps(R, L, xx, yy, tn(BC.aceroS)); return null; }); } }
  // el puente nuevo, delante: el pretil del fondo, la calzada, el bordillo, la viga del canto y las pilas en el agua
  for (let x = 0; x < 320; x++) {
    const q = h(x, 9, 63), junta = x % 40 === 0;
    b_ps(R, L, x, 128, tn(BC.hormigonL)); b_ps(R, L, x, 129, tn(junta ? BC.hormigonS : BC.hormigonL));
    for (let y = 130; y <= 133; y++) b_ps(R, L, x, y, tn(junta ? BC.hormigonD : x % 40 === 1 ? BC.hormigonL : h(x, y, 64) < 0.1 ? BC.hormigonS : BC.hormigon));
    b_ps(R, L, x, 134, tn((x + 20) % 40 < 3 ? BC.k : BC.hormigonS)); b_ps(R, L, x, 135, tn(BC.asfaltoS));
    for (let y = 136; y <= 149; y++) { const r = h(x, y, 65); let c = r < 0.12 ? BC.asfaltoS : r > 0.92 ? BC.asfaltoL : BC.asfalto;
      if ((y === 139 || y === 140 || y === 146 || y === 147) && h(x >> 3, y, 66) < 0.7) c = b_mezcla(c, BC.k, 0.15);
      if (y === 137 || y === 148) c = BC.lineaB; if (y === 142 || y === 144) c = BC.lineaA;
      b_ps(R, L, x, y, tn(c)); }
    b_ps(R, L, x, 150, tn(BC.hormigonL)); b_ps(R, L, x, 151, tn(BC.hormigonS));
    for (let y = 152; y <= 157; y++) { const ch = h(x, 1, 67) < 0.12 && y >= 153 && y < 155 + h(x, 2, 67) * 4; b_ps(R, L, x, y, tn((x - 26) % 64 === 0 ? BC.hormigonD : ch ? BC.oxido : y === 152 ? BC.hormigonL : q < 0.3 && y > 155 ? BC.verdin : BC.hormigon)); }
    b_ps(R, L, x, 158, tn(BC.hormigonD)); b_ps(R, L, x, 159, BC.k);
    for (let y = 160; y <= 170; y++) L.tipo[y * 320 + x] = 3;
  }
  for (const [a, b] of [[60, 76], [196, 222]]) for (let x = a; x <= b; x++) for (let y = 145; y <= 147; y++) b_ps(R, L, x, y, tn(h(x, y, 69) < 0.5 ? BC.asfaltoS : b_mezcla(BC.asfalto, BC.k, 0.2)));
  for (let k = 0; k < 5; k++) { const c = 26 + k * 64;
    for (let y = 160; y <= 163; y++) for (let x = c - 9; x <= c + 9; x++) b_ps(R, L, x, y, tn(y === 160 ? BC.hormigonD : x > c + 6 ? BC.hormigonL : BC.hormigonS));
    for (let y = 164; y <= 175; y++) for (let x = c - 6; x <= c + 6; x++) b_ps(R, L, x, y, tn(x === c - 6 ? BC.hormigonD : x > c + 3 ? BC.hormigonL : y > 171 ? (h(x, y, 70) < 0.5 ? BC.verdin : BC.hormigonD) : BC.hormigon), 0, y === 175 ? 1 : -1); }
}

function b_puente(R, t, o) {
  const tarde = !!o.tarde, hor = 60, ol = Math.max(0, Math.min(1, o.oleaje ?? 0)), yD = 90;
  const L = b_capa(R, 'puente' + (tarde ? 'T' : 'D'), (L) => b_puenteFijo(R, L, hor, tarde)), psF = b_psF(R, L);
  const N = [[40, 43, 40, 2.4, 1], [200, 41, 34, 1.7, 2], [130, 50, 24, 1.0, 3], [300, 54, 16, 0.6, 4], [80, 56, 12, 0.4, 5], [250, 38, 30, 3.0, 6]];
  const sombras = N.filter((n) => n[2] > 30).map(([x0, , w, v], k) => [b_nubeX(x0, v, w, t) + 30, hor + 34 + k * 22, w * 0.9, 4 + k * 2]);
  b_agua(R, t, L, { hor, rampas: tarde ? B_AGUA_TARDE : B_AGUA_DIA, brillo: [hex('#fffbe0'), BC.blanco], sombras, sol: [228, 26], oleaje: ol });
  b_nubes(R, t, L, N, tarde ? [hex('#8a4a7a'), hex('#e08a90'), hex('#ffd0a8')] : [hex('#a8bcd8'), hex('#e0eaf6'), BC.blanco]);
  // lo lejano: la luz roja de la antena, los cochecitos del puente del horizonte, la rompiente del arrecife y un velero
  if (Math.sin(t * 3.2) > 0.2) { R.pset(34, hor - 17, BC.rojo); R.pset(34, hor - 18, hex('#ff8a7a')); }
  for (let k = 0; k < 5; k++) { const sp = 120, x = 116 + ((k * 31 + t * (k % 2 ? 6 : -5)) % sp + sp) % sp; const xx = Math.round(x < 152 ? x : x + 54); if (xx >= 206 && xx <= 232 || xx <= 152) { R.pset(xx, hor, [BC.rojo, BC.blanco, BC.azul, BC.amarillo, BC.blanco][k]); R.pset(xx + 1, hor, BC.grisS); } }
  if (ol > 0.05) for (let x = 0; x < 320; x++) { const s = Math.sin(x * 0.21 - t * 2.6) + Math.sin(x * 0.07 + t * 0.9); if (s > 1.5 - ol * 1.1 && b_fondo(L, x, hor + 3)) { R.pset(x, hor + 3, BC.blanco); if (s > 1.9 - ol * 0.6) R.pset(x, hor + 2, hex('#e0f0f4')); } }
  b_velero(psF, ((40 + t * 2.2) % 360) - 20, hor + 7, t, 0.6);
  b_velero(psF, ((250 - t * 1.3) % 360 + 360) % 360 - 20, hor + 13, t, 0.75, hex('#f4e0c8'));
  // la barca fondeada junto al cayo de la derecha, con su pescador
  { const bx = 298, by = 99 + Math.round(Math.sin(t * 1.6) * (0.5 + ol)); b_lancha(psF, bx, by, t, -1, BC.rojo, 0.6, ol); b_figurita(psF, bx - 2, by - 4, t, 2, { cana: true, dir: -1, agua: by + 6, gorra: true }); }
  // la lancha que cruza por delante del puente viejo, con su estela
  { const x = Math.round(((t * 24 + 60) % 440) - 60), y = 118 + Math.round(ol * Math.sin(t * 3) * 1.5); b_estela(psF, x, y, t, 1, 46, BC.blanco, hex('#bfe8ec')); b_lancha(psF, x, y, t, 1, BC.azul, 1, ol); }
  // los golpes de mar en las pilas del puente viejo
  if (ol > 0.05) for (let k = 0; k < 11; k++) { const x = k * 22 + 2, u = (t * 0.8 + k * 0.37) % 1.4; if (x >= 192 && x <= 206 || u > 0.5) continue; const hh = Math.round(Math.sin(u / 0.5 * Math.PI) * (3 + ol * 6));
    for (let j = 0; j < hh; j++) for (const d of [-1, 0, 1, 2, 3, 4]) if (h(d, j, Math.floor(t * 9) + k) < 0.55) R.pset(x + d + Math.round((j * (d - 1.5)) * 0.4), 104 - j, j < 2 ? BC.blanco : hex('#d8eef4')); }
  // los pescadores del puente viejo
  for (const [x, k, d] of [[30, 0, 1], [58, 3, -1], [96, 1, 1], [226, 4, -1]]) b_figurita(R.pset, x, yD - 2, t, k, { cana: true, dir: d, agua: 104, gorra: k % 2 === 0 });
  // las aves: la fila de pelícanos que planea, el que se tira en picado y las gaviotas sobre el puente viejo
  for (let k = 0; k < 3; k++) { const x = 380 - ((t * 20) % 520) + k * 22, y = 68 + k * 4 + Math.round(Math.sin(t * 0.8 + k) * 1.5); b_pelicano(R, x, y, t, { vuela: true, dir: -1, aleteo: k === 0 && (t % 4) < 1 }); }
  { const u = (t % 9) / 9, px = 66;
    if (u < 0.5) b_pelicano(R, px + Math.round(Math.cos(u * 12) * 18), 70 + Math.round(Math.sin(u * 12) * 4), t, { vuela: true, dir: Math.sin(u * 12) > 0 ? -1 : 1 });
    else if (u < 0.62) { const f = (u - 0.5) / 0.12, y = Math.round(70 + f * 46); for (let j = 0; j < 7; j++) R.pset(px, y - j, j < 2 ? BC.pelBill : j < 3 ? BC.pelHead : BC.pelBody); R.pset(px - 1, y - 5, BC.pelD); R.pset(px + 1, y - 5, BC.pelD); R.pset(px - 2, y - 6, BC.pelD); R.pset(px + 2, y - 6, BC.pelD); }
    else { const f = (u - 0.62) / 0.38; if (f < 0.35) for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI, r = 2 + f * 18; R.pset(Math.round(px + Math.cos(a) * r), Math.round(116 - Math.sin(a) * r * 0.6 * (1 - f * 2)), BC.blanco); }
      if (f > 0.25) { const P = { b: BC.pelBody, w: BC.pelHead, p: BC.pelBill, B: BC.pelD }; b_sprite(psF, [[['...ww.', '...wpp', 'bbbw..', 'Bbbb..']]], P, px, 117, -1, 2, 4, BC.k); } } }
  for (let k = 0; k < 4; k++) b_gaviota(R.pset, 150 + Math.cos(t * 0.5 + k * 1.6) * 50, 72 + Math.sin(t * 0.9 + k) * 6 + k * 2, t, k, tarde);
  // los coches del carril del fondo (de derecha a izquierda), cada 6 s
  if (o.coches !== false) { const n = Math.floor(t / 6), u = (t - n * 6) / 3.4; if (u < 1) b_coche(R, Math.round(360 - u * 400), 141, t, ['#d84a3a', '#f4f0e8', '#3a6ab0', '#f0c040', '#5a5a64'][n % 5], -1); }
  return { encuadre: 'puente', camara: 'general', suelo: 150, libre: [40, 280], calzada: [0, 320, 138, 150], carril: 141, horizonte: hor, puenteViejo: [0, 240, 76, 104], sol: [228, 28] };
}

// la barandilla baja del canto del tablero (por delante de los actores): postes cada 32 px y dos tubos galvanizados
function b_puenteDelante(R, t, o) {
  const { rect, pset } = R, c = hex('#b8c0c8'), cL = hex('#eef2f4'), cS = hex('#7a828c');
  for (let x = 0; x < 320; x++) { pset(x, 141, cL); pset(x, 142, c); pset(x, 143, cS); pset(x, 146, cL); pset(x, 147, cS); }
  for (let x = 8; x < 320; x += 32) { rect(x, 140, x, 151, c); rect(x + 1, 140, x + 1, 151, cS); pset(x, 140, cL); rect(x - 1, 151, x + 2, 151, BC.hormigonD); }
}

const B_POSTES = [10, 54, 98, 142, 186, 230, 274, 318];

function b_barandillaFijo(R, L, hor) {
  b_cieloFijo(R, L, 0, hor - 1, [[0, BC.cielo0], [0.4, BC.cielo1], [0.78, BC.cielo2], [1, BC.cielo3]], [70, 36, 7], [hex('#fff6d0'), hex('#ffe090'), BC.blanco]);
  b_aguaFija(R, L, hor, 179, 23, [1.25, 0.25]);
  for (const [a, b, al, s] of [[-6, 52, 2, 1], [96, 152, 3, 2], [240, 330, 2, 3]]) b_isla(R, L, a, b, hor + 1, al, 320 + s, (c) => c, { lejos: true });
  for (let x = 128; x <= 160; x++) { b_ps(R, L, x, hor - 4, BC.lejosS, 0, 2); if (x % 6 === 0) for (let j = 0; j < 4; j++) b_ps(R, L, x, hor - 4 - j, BC.lejosS, 0, 2); }
  // el puente viejo a lo lejos, de arcos, y un cayo de manglar con playa
  for (let x = 0; x <= 178; x++) { b_ps(R, L, x, 100, BC.aceroL, 0, 2); b_ps(R, L, x, 101, x % 3 ? BC.acero : BC.aceroS, 0, 2); const dx = x % 10;
    for (let y = 102; y <= 105; y++) { if (dx < 2 || y < 102 + Math.round(Math.abs(dx - 6) * 0.5)) b_ps(R, L, x, y, dx === 1 ? BC.hormigonS : BC.hormigon, 0, 2); } }
  b_isla(R, L, 186, 266, 113, 9, 51, (c) => c, { playa: [236, 262] });
  // el pretil de hormigón de los años 30: postes con su sombrerete, viga de arriba, huecos con arco y viga de abajo
  const con = (x, y, base) => { const q = h(x, y, 71); return q < 0.07 ? BC.hormigonS : q > 0.96 ? BC.hormigonL : base; };
  for (let x = 0; x < 320; x++) {
    let pc = null; for (const c of B_POSTES) if (Math.abs(x - c) <= 5) pc = c;
    for (let y = 132; y <= 153; y++) {
      let c = null;
      if (pc != null && Math.abs(x - pc) <= 4 && y >= 134) c = x - pc === -4 ? BC.hormigonL : x - pc >= 3 ? BC.hormigonS : con(x, y, BC.hormigon);
      else if (pc != null && y <= 134) c = y === 132 ? BC.hormigonL : y === 134 ? BC.hormigonD : con(x, y, BC.hormigon);
      else if (y >= 135 && y <= 139) c = y === 135 ? BC.hormigonL : y === 139 ? BC.hormigonS : con(x, y, BC.hormigon);
      else if (y >= 148) c = y === 148 ? BC.hormigonL : y === 153 ? BC.hormigonD : con(x, y, y > 150 && h(x, y, 72) < 0.4 ? BC.verdin : BC.hormigon);
      else if (y >= 140 && y <= 147) { const m = ((x - 2) % 7 + 7) % 7; if (m === 0) c = con(x, y, BC.hormigon); else if (y === 140 && (m < 2 || m > 5)) c = BC.hormigonS; else if (m === 1) c = BC.hormigonS; }
      if (c == null) continue;
      if (pc != null && y > 135 && y < 150 && Math.abs(x - pc) <= 3 && h(x, 0, 73) < 0.35 && h(x, y, 74) < 0.6) c = b_mezcla(c, BC.oxido, 0.5);
      b_ps(R, L, x, y, c);
    }
  }
  for (const [x, y] of [[226, 134], [229, 136], [233, 135], [231, 140], [227, 143]]) b_ps(R, L, x, y, BC.blanco);
  // el bordillo, el arcén con la bici pintada, la línea del borde con sus captafaros y el carril
  for (let x = 0; x < 320; x++) {
    b_ps(R, L, x, 154, BC.hormigonL); b_ps(R, L, x, 155, BC.hormigon); b_ps(R, L, x, 156, BC.hormigonS); b_ps(R, L, x, 157, BC.asfaltoS);
    for (let y = 158; y <= 179; y++) { const r = h(x, y, 75); let c = r < 0.12 ? BC.asfaltoS : r > 0.93 ? BC.asfaltoL : BC.asfalto;
      if (y >= 158 && y <= 160 && (x % 44 > 30 || (x + 6) % 44 < 3)) c = b_mezcla(c, BC.k, 0.3);
      if (y === 166 || y === 167) c = BC.lineaB; if ((y === 172 || y === 177) && h(x >> 4, y, 76) < 0.6) c = b_mezcla(c, BC.k, 0.12);
      b_ps(R, L, x, y, c); }
  }
  for (let x = 20; x < 320; x += 40) { b_ps(R, L, x, 166, BC.amarillo); b_ps(R, L, x + 1, 166, BC.amarillo); b_ps(R, L, x, 167, hex('#a88a2a')); b_ps(R, L, x + 1, 167, hex('#a88a2a')); }
  for (const [i, j] of [[0, 3], [1, 2], [1, 4], [2, 3], [3, 1], [4, 1], [5, 2], [6, 3], [7, 2], [7, 4], [8, 3], [4, 2], [3, 3], [5, 3], [2, 1]]) b_ps(R, L, 100 + i, 158 + j, BC.lineaB);
  // el poste del kilómetro: un cartel verde con su número
  for (let y = 128; y <= 157; y++) { b_ps(R, L, 12, y, BC.verde); b_ps(R, L, 13, y, BC.k); }
  b_rectL(R, L, 4, 115, 21, 129, BC.k); b_rectL(R, L, 5, 116, 20, 128, BC.verde); for (let x = 6; x <= 19; x++) { b_ps(R, L, x, 117, BC.blanco); b_ps(R, L, x, 127, BC.blanco); } for (let y = 117; y <= 127; y++) { b_ps(R, L, 6, y, BC.blanco); b_ps(R, L, 19, y, BC.blanco); }
  { const prev = R.usar(L.buf); b_cifras(R, '47', 9, 120, BC.blanco); R.usar(prev); }
}

function b_barandilla(R, t, o) {
  const hor = 96, ol = Math.max(0, Math.min(1, o.oleaje ?? 0));
  const L = b_capa(R, 'barandilla', (L) => b_barandillaFijo(R, L, hor)), psF = b_psF(R, L);
  const N = [[20, 46, 48, 2.6, 11], [190, 52, 40, 1.8, 12], [110, 66, 28, 1.1, 13], [260, 76, 20, 0.7, 14], [60, 84, 14, 0.4, 15], [300, 89, 10, 0.3, 16]];
  const sombras = N.filter((n) => n[2] > 27).map(([x0, , w, v], k) => [b_nubeX(x0, v, w, t) + 20, hor + 14 + k * 10, w * 0.8, 3 + k]);
  b_agua(R, t, L, { hor, rampas: B_AGUA_DIA, brillo: [hex('#fffbe0'), BC.blanco], sombras, sol: [70, 34], oleaje: ol });
  b_nubes(R, t, L, N, [hex('#a8bcd8'), hex('#e0eaf6'), BC.blanco]);
  b_velero(psF, ((300 - t * 2.5) % 360 + 360) % 360 - 20, hor + 4, t, 0.7);
  for (const [x, k] of [[200, 0], [214, 1], [250, 2]]) b_palmera(R, x, 112, 13 + k * 3, t, k + 20);
  // la lancha que cruza de derecha a izquierda
  { const x = Math.round(380 - ((t * 30) % 480)), y = 122; b_estela(psF, x, y, t, -1, 54, BC.blanco, hex('#c4ecee')); b_lancha(psF, x, y, t, -1, BC.rojo, 1.15, ol); }
  // un sábalo que salta cada 6 s, con su chapoteo
  { const u = (t % 6) / 6, fx = 128; if (u < 0.16) { const f = u / 0.16, x = fx + f * 16, y = 128 - Math.sin(f * Math.PI) * 12; for (let i = -3; i <= 3; i++) psF(Math.round(x + i), Math.round(y + i * (f - 0.5) * 0.8), i === 3 ? BC.grisS : i > 0 ? BC.gris : hex('#e8eef4')); psF(Math.round(x - 4), Math.round(y - 1), BC.grisS); psF(Math.round(x - 4), Math.round(y + 1), BC.grisS); }
    else if (u < 0.3) { const f = (u - 0.16) / 0.14; for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, r = 2 + f * 9; psF(Math.round(fx + 16 + Math.cos(a) * r), Math.round(129 + Math.sin(a) * r * 0.3), BC.blanco); } } }
  for (let k = 0; k < 3; k++) b_gaviota(R.pset, ((k * 120 + t * (12 + k * 3)) % 380) - 30, 70 + k * 9 + Math.sin(t * 1.3 + k) * 4, t, k);
  for (let k = 0; k < 2; k++) { const x = 360 - ((t * 16 + 160) % 520) + k * 24, y = 62 + k * 5; b_pelicano(R, x, y, t, { vuela: true, dir: -1, aleteo: k === 1 && (t % 3) < 1 }); }
  if (o.pelicano !== false) b_pelicano(R, 230, 132, t, { dir: -1 });
  return { encuadre: 'puente', camara: 'barandilla', suelo: 160, libre: [20, 300], poste: [230, 132], horizonte: hor, carril: [0, 320, 166, 180] };
}

// el coche que pasa por el carril de delante, por delante de los actores (o.coche: cada 9 s; 0–1 fija el paso; false no)
function b_barandillaDelante(R, t, o) {
  if (o.coche === false) return;
  let u, n = 0; if (typeof o.coche === 'number') u = o.coche; else { n = Math.floor(t / 9); u = (t - n * 9) / 2.4; }
  if (u < 0 || u > 1) return;
  b_coche(R, Math.round(-50 + u * 420), 178, t, ['#3a6ab0', '#e8e4dc', '#d84a3a', '#2a8a7a'][n % 4], 1, 1.25);
}

const B_CIELO_TARDE = () => [[0, hex('#2e2e70')], [0.3, hex('#5a3c8a')], [0.55, hex('#a85a9a')], [0.75, hex('#e8788a')], [0.9, hex('#ff9c6a')], [1, hex('#ffcc80')]];

// la luz del ocaso: tiñe de naranja rosado (lo que da al sol) o de morado (la sombra)
const b_luzT = (c) => b_mezcla(c, hex('#ff9a7a'), 0.2), b_sombraT = (c) => b_mezcla(c, hex('#3a2a5a'), 0.32);

// una casa de madera de Cayo Hueso de dos plantas (x0–x1, el suelo en yS): zócalo de celosía, tablas de chilla con su
// sombra, doble porche con columnas, barandillas de balaústres y calado bajo el alero, puerta, ventanas con
// contraventanas de lamas abiertas y el tejado de chapa con sus juntas. Devuelve las ventanas [x0, y0, x1, y1]
function b_casaConcha(R, L, x0, x1, yS, col, colS, pers) {
  const ps = (x, y, c) => b_ps(R, L, x, y, c), ventanas = [], yP1 = yS - 12, yE = yS - 27, yP2 = yE - 12, yT = yE - 26;
  for (let y = yT; y < yS; y++) for (let x = x0; x <= x1; x++) {
    let c; const fila = (y - yT) % 3;
    if (y >= yS - 3) c = (x + y) % 3 === 0 ? b_sombraT(BC.blanco) : hex('#3a2a3a');
    else c = fila === 0 ? b_luzT(b_mezcla(col, BC.blanco, 0.25)) : fila === 2 ? b_sombraT(colS) : b_luzT(col);
    if (x > x1 - 3) c = b_sombraT(c);
    ps(x, y, c);
  }
  // el tejado de chapa (a cuatro aguas, de frente) con sus juntas y el destello del ocaso a la derecha
  for (let j = 0; j < 12; j++) { const a = x0 - 3 + j * 2, b = x1 + 3 - j * 2, y = yT - 1 - j;
    for (let x = a; x <= b; x++) ps(x, y, j === 0 ? hex('#4a3a4a') : (x - x0) % 4 === 0 ? b_sombraT(BC.grisS) : x > b - 6 ? b_luzT(hex('#f4d8c8')) : b_luzT(BC.gris)); }
  for (let x = x0 - 3; x <= x1 + 3; x++) ps(x, yT, b_sombraT(BC.grisS));
  // las ventanas de las dos plantas con sus contraventanas de lamas, y la puerta de abajo
  const ventana = (cx, y0, alto) => { const a = cx - 4, b = cx + 4; for (let y = y0; y <= y0 + alto; y++) for (let x = a; x <= b; x++) ps(x, y, x === a || x === b || y === y0 || y === y0 + alto ? BC.blanco : x === cx ? BC.blanco : hex('#3a3050'));
    for (let y = y0 - 3; y <= y0 + 3; y++) for (let x = a - 1; x <= b + 1; x++) if (y < y0 || x === a - 1 || x === b + 1) ps(x, y, (y & 1) ? pers : b_sombraT(pers)); ventanas.push([a + 1, y0 + 1, b - 1, y0 + alto - 1]); };
  const w = x1 - x0, nv = Math.max(2, Math.round(w / 22));
  for (let i = 0; i < nv; i++) { const cx = Math.round(x0 + (i + 0.5) * w / nv); ventana(cx, yE - 20, 9); if (Math.abs(cx - (x0 + w / 2)) > 6) ventana(cx, yS - 22, 9); }
  { const cx = Math.round(x0 + w / 2); for (let y = yS - 23; y < yS - 3; y++) for (let x = cx - 4; x <= cx + 4; x++) ps(x, y, x === cx - 4 || x === cx + 4 || y === yS - 23 ? BC.blanco : y === yS - 14 ? b_sombraT(pers) : pers); ps(cx + 2, yS - 13, BC.amarillo); }
  // los dos porches: aleros con calado, columnas y barandillas de balaústres
  for (const [yA, yB] of [[yE, yP1], [yT, yP2]]) {
    for (let x = x0 - 2; x <= x1 + 2; x++) { ps(x, yA, BC.blanco); ps(x, yA + 1, hex('#9ad0e0')); if (yA === yT) { ps(x, yA + 2, (x % 4 === 0) ? BC.blanco : b_sombraT(col)); if (x % 4 === 1 || x % 4 === 3) ps(x, yA + 2, BC.blanco); } }
    for (let x = x0 - 2; x <= x1 + 2; x++) { ps(x, yB, BC.blanco); ps(x, yB + 8, BC.blanco); ps(x, yB + 9, b_sombraT(BC.grisS)); if (x % 2 === 0) for (let y = yB + 1; y < yB + 8; y++) ps(x, y, (x % 4 === 0) ? BC.blanco : b_sombraT(BC.blanco)); }
    for (let x = x0; x <= x1 + 1; x += Math.round(w / 4)) for (let y = yA + 2; y <= yB + 9; y++) { ps(x, y, BC.blanco); ps(x + 1, y, b_sombraT(BC.gris)); }
  }
  return ventanas;
}

// un gallo de Cayo Hueso (cresta roja, cola de cobre y verde) que camina y picotea; pollitos detrás
function b_gallo(R, x, y, t, dir, pica) {
  const P = { r: BC.rojo, o: hex('#e8902a'), c: hex('#b85a2a'), C: hex('#8a3a1e'), v: hex('#2a6a4a'), V: hex('#1a3a2e'), a: BC.amarillo, n: hex('#f4e0b0'), k: BC.k };
  const cab = ['.......rr...', '......rnno..', '......nkn...', '......nnr...', '......cn....'];
  const cu = ['v....ccc....', 'Vv..cccC....', 'VvvccooC....', 'VvvcccooC...', '.vVccccoo...', '..cCccccc...', '...cccc.....', '....a.a.....', '....a.a.....'];
  b_sprite(R.pset, [[cab, pica ? 2 : 0, pica ? 6 : 0], [[...Array(4).fill('............'), ...cu], 0, 0]], P, x, y, dir, 5, 13, BC.k);
}

function b_pollito(R, x, y, t, k) { const pica = Math.sin(t * 5 + k * 2) > 0.6, c = hex('#f8d870'), cS = hex('#d8a840'); R.rect(x - 1, y - 3, x + 1, y - 1, c); R.pset(x + 1, y - 3, cS); R.pset(x + 2, y - (pica ? 1 : 3), hex('#e8902a')); R.pset(x + 1, y - 4, c); R.pset(x + 1, y - 3, BC.k); R.pset(x - 1, y, cS); R.pset(x, y, cS); }

function b_cayoFijo(R, L, hor) {
  b_cieloFijo(R, L, 0, hor - 1, B_CIELO_TARDE(), [246, 94, 10], [hex('#fff0b0'), hex('#ffb050'), hex('#fffbe0')]);
  for (let k = 0; k < 6; k++) { const y = 62 + k * 6, x0 = 180 + h(k, 1, 80) * 60, w = 30 + h(k, 2, 80) * 60; for (let x = Math.round(x0); x < x0 + w && x < 320; x++) if (h(x >> 2, k, 81) < 0.8 && L.tipo[y * 320 + x] === 1) L.buf[y * 320 + x] = b_mezcla(L.buf[y * 320 + x], hex('#ffd8a0'), 0.55); }
  b_aguaFija(R, L, hor, 140, 31, [2.0, 0.4]);
  const tlej = (c) => b_mezcla(c, hex('#5a2e5a'), 0.6);
  b_isla(R, L, 186, 228, hor + 1, 4, 330, tlej, { lejos: true }); b_isla(R, L, 290, 340, hor + 1, 2, 331, tlej, { lejos: true });
  for (const x of [196, 206, 218]) for (let j = 0; j < 6; j++) { b_ps(R, L, x + (j > 3 ? 1 : 0), hor - 2 - j, tlej(BC.palmaS), 0, 2); if (j === 5) for (const d of [-2, -1, 1, 2, 3]) b_ps(R, L, x + d + 1, hor - 7 + (Math.abs(d) > 1 ? 1 : 0), tlej(BC.palmaS), 0, 2); }
  // el muelle de la puesta de sol, a lo lejos
  for (let x = 266; x <= 320; x++) { b_ps(R, L, x, 117, b_luzT(BC.tablonL)); b_ps(R, L, x, 118, b_sombraT(BC.tablon)); b_ps(R, L, x, 119, BC.tablonD); if (x % 6 === 0) for (let y = 120; y <= 123; y++) b_ps(R, L, x, y, BC.tablonD, 0, y === 123 ? 1 : 0); }
  // el arbolado tropical por detrás de las casas, en sombra
  for (let x = 0; x <= 182; x++) { const top = Math.round(92 + b_fbm(x * 0.08, 0, 82) * 22 - (x > 160 ? (x - 160) * -0.6 : 0));
    for (let y = top; y <= 146; y++) { const q = h(x, y, 83); b_ps(R, L, x, y, y === top ? b_luzT(BC.mangleL) : q < 0.3 ? b_sombraT(BC.mangleS) : q < 0.8 ? b_sombraT(BC.mangle) : b_luzT(BC.mangle)); } }
  // las dos casas de madera
  L.ventanas = [...b_casaConcha(R, L, -6, 50, 144, hex('#9ae0c8'), hex('#6ab0a0'), hex('#2a7a8a')), ...b_casaConcha(R, L, 98, 168, 144, hex('#f4a8c0'), hex('#c47890'), hex('#3a8a6a'))];
  // la buganvilla de la casa rosa
  for (let k = 0; k < 140; k++) { const a = h(k, 1, 84), x = Math.round(160 + a * 14 - h(k, 3, 84) * 6), y = Math.round(84 + h(k, 2, 84) * 50 * a); b_ps(R, L, x, y, h(k, 4, 84) < 0.55 ? hex('#d83a9a') : h(k, 4, 84) < 0.8 ? hex('#a82a7a') : b_sombraT(BC.palma)); }
  // el faro: la torre blanca que se estrecha, ventanucos, puerta, la galería negra, la linterna y la cúpula
  for (let y = 46; y <= 145; y++) { const u = (y - 46) / 99, hw = Math.round(5 + u * 3);
    for (let x = 70 - hw; x <= 70 + hw; x++) { const d = (x - 70) / hw; b_ps(R, L, x, y, d < -0.6 ? b_sombraT(hex('#d8d4dc')) : d > 0.5 ? b_luzT(hex('#fff4ea')) : d > 0.1 ? b_luzT(BC.blanco) : b_mezcla(BC.blanco, hex('#c8b8d0'), 0.3)); } }
  for (const y of [70, 96, 120]) b_rectL(R, L, 69, y, 71, y + 4, hex('#2a2238'));
  b_rectL(R, L, 66, 133, 74, 145, BC.blanco); b_rectL(R, L, 67, 135, 73, 145, hex('#3a2a3a')); b_ps(R, L, 67, 135, BC.blanco); b_ps(R, L, 73, 135, BC.blanco);
  b_rectL(R, L, 61, 43, 79, 45, BC.k); for (let x = 61; x <= 79; x += 2) for (let y = 39; y <= 42; y++) b_ps(R, L, x, y, BC.k); b_rectL(R, L, 61, 39, 79, 39, BC.k);
  b_rectL(R, L, 64, 31, 76, 42, BC.k);
  for (let j = 0; j < 6; j++) b_rectL(R, L, 64 + j, 30 - j, 76 - j, 30 - j, BC.k); b_rectL(R, L, 69, 22, 71, 24, BC.k); b_ps(R, L, 70, 21, BC.k);
  // la valla blanca de estacas, los hibiscos y el portón del faro
  for (let x = 0; x <= 178; x++) { if (x >= 64 && x <= 76) continue; const e = x % 5;
    for (let y = 131; y <= 146; y++) { if (e < 3 && (y > 132 || e === 1)) b_ps(R, L, x, y, e === 2 ? b_sombraT(BC.blanco) : b_luzT(BC.blanco)); else if (y === 136 || y === 142) b_ps(R, L, x, y, b_sombraT(BC.blanco)); } }
  for (const [a, b] of [[2, 30], [120, 150]]) for (let x = a; x <= b; x++) { const top = 126 + Math.round(Math.abs(x - (a + b) / 2) / ((b - a) / 2) * 5 + h(x, 0, 85) * 2);
    for (let y = top; y <= 133; y++) { const q = h(x, y, 86); b_ps(R, L, x, y, q < 0.12 ? BC.rojo : q < 0.16 ? hex('#ffd0d8') : q < 0.5 ? b_sombraT(BC.palma) : b_luzT(BC.palmaL)); } }
  // la acera de losas con sus juntas y grietas, el bordillo y la calle con un parche y una tapa
  for (let x = 0; x < 320; x++) {
    for (let y = 146; y <= 158; y++) { const q = h(x, y, 87); let c = q < 0.1 ? hex('#a89aa8') : q > 0.94 ? hex('#f4e4d8') : hex('#d8c8c8');
      if (x % 26 === 0 || y === 146) c = hex('#8a7a8a'); if (x >= 182) c = ((x + (y >> 1) * 2) % 8 < 1 || (y % 4 === 0)) ? hex('#9a5a4a') : (q < 0.4 ? hex('#c8785a') : hex('#d88a68'));
      b_ps(R, L, x, y, b_luzT(c)); }
    b_ps(R, L, x, 159, b_luzT(hex('#ece0dc'))); b_ps(R, L, x, 160, hex('#7a6a7a'));
    for (let y = 161; y <= 179; y++) { const q = h(x, y, 88); b_ps(R, L, x, y, b_sombraT(q < 0.12 ? BC.asfaltoS : q > 0.93 ? BC.asfaltoL : BC.asfalto)); }
  }
  for (let x = 30; x < 80; x++) b_ps(R, L, x + Math.round(Math.sin(x * 0.4) * 1), 150 + Math.round((x - 30) * 0.08), hex('#8a7a8a'));
  for (let j = -3; j <= 3; j++) for (let i = -9; i <= 9; i++) if ((i / 9.5) ** 2 + (j / 3.5) ** 2 < 1) b_ps(R, L, 120 + i, 171 + j, (i / 9.5) ** 2 + (j / 3.5) ** 2 > 0.6 ? hex('#3a3440') : ((i + j) & 1 ? hex('#5a5260') : hex('#4a4450')));
  for (let x = 4; x < 320; x++) if (x % 24 < 12) { b_ps(R, L, x, 175, b_sombraT(BC.lineaA)); b_ps(R, L, x, 176, b_sombraT(b_mezcla(BC.lineaA, BC.k, 0.3))); }
  for (let i = 0; i < 18; i++) { b_ps(R, L, 60 + i, 166 - Math.round(i * 0.2), b_sombraT(BC.troncoS)); if (i % 2) { b_ps(R, L, 60 + i, 167 - Math.round(i * 0.2), b_sombraT(BC.palma)); b_ps(R, L, 61 + i, 165 - Math.round(i * 0.2), b_sombraT(BC.palmaS)); } }
  for (let x = 200; x < 238; x++) for (let y = 165; y <= 169; y++) b_ps(R, L, x, y, b_sombraT(b_mezcla(BC.asfalto, BC.k, 0.2)));
  // el paseo del puerto: postes de madera con su cabo colgante
  for (let x = 182; x < 320; x++) { const k = Math.floor((x - 182) / 20), dx = (x - 182) % 20;
    if (dx < 3) for (let y = 126; y <= 145; y++) b_ps(R, L, x, y, dx === 0 ? b_luzT(BC.tablonL) : dx === 2 ? BC.tablonD : b_luzT(BC.tablon));
    else { const yy = 130 + Math.round(Math.sin((dx - 3) / 17 * Math.PI) * 4); b_ps(R, L, x, yy, b_luzT(BC.cabo)); b_ps(R, L, x, yy + 1, BC.caboS); }
    if (dx < 3) b_ps(R, L, x, 125, BC.tablonD); }
  // la sombra larga de la palmera en la acera
  for (let i = 0; i < 70; i++) { const x = 88 - i, y = 152 + Math.round(i * 0.05); for (let d = 0; d < 2; d++) { const q = (y + d) * 320 + x; if (x >= 0) L.buf[q] = b_mezcla(L.buf[q], hex('#3a2a5a'), 0.3); } }
  // la bici playera apoyada en la valla
  { const c = hex('#3aa8a0'), bx = 150; for (const dx of [-7, 7]) { for (let a = 0; a < 24; a++) b_ps(R, L, Math.round(bx + dx + Math.cos(a / 24 * 6.283) * 4), Math.round(142 + Math.sin(a / 24 * 6.283) * 4), BC.k); b_ps(R, L, bx + dx, 142, BC.gris); }
    R.linea(bx - 7, 142, bx, 142, (x, y) => { b_ps(R, L, x, y, c); return null; }); R.linea(bx, 142, bx - 3, 136, (x, y) => { b_ps(R, L, x, y, c); return null; }); R.linea(bx - 3, 136, bx + 5, 136, (x, y) => { b_ps(R, L, x, y, c); return null; }); R.linea(bx + 5, 136, bx + 7, 142, (x, y) => { b_ps(R, L, x, y, c); return null; });
    b_rectL(R, L, bx - 5, 134, bx - 2, 134, BC.k); b_rectL(R, L, bx + 4, 132, bx + 8, 135, hex('#c8a060')); b_ps(R, L, bx + 6, 133, hex('#8a6a3a')); }
  // la farola (la cabeza la enciende cada fotograma)
  for (let y = 108; y <= 150; y++) { b_ps(R, L, 178, y, BC.k); b_ps(R, L, 179, y, hex('#3a3a4a')); } b_rectL(R, L, 175, 148, 182, 150, BC.k); b_rectL(R, L, 174, 102, 183, 103, BC.k); b_rectL(R, L, 175, 104, 182, 107, BC.k);
}

function b_cayoHueso(R, t, o) {
  const hor = 100, L = b_capa(R, 'cayo', (L) => b_cayoFijo(R, L, hor)), psF = b_psF(R, L);
  const N = [[30, 44, 44, 1.6, 21], [170, 40, 36, 1.1, 22], [240, 62, 28, 0.7, 23], [100, 70, 20, 0.5, 24], [300, 80, 14, 0.3, 25]];
  b_agua(R, t, L, { hor, rampas: B_AGUA_TARDE, brillo: [hex('#fff0b0'), hex('#ffe8d0')], sombras: [], sol: [246, 12], oleaje: Math.max(0, Math.min(1, o.oleaje ?? 0)) });
  b_nubes(R, t, L, N, [hex('#7a4a7a'), hex('#d8788a'), hex('#ffc49a')]);
  // la goleta de dos palos que cruza ante el sol, a contraluz
  { const x = Math.round(340 - ((t * 5) % 220)), y = 114 + Math.round(Math.sin(t * 1.2) * 0.6), cs = hex('#2a1e34'), vl = hex('#f8d0a8'), vS = hex('#d89a88');
    for (let i = -14; i <= 14; i++) { for (let j = 0; j <= 3 - (Math.abs(i) > 11 ? 1 : 0); j++) psF(x + i, y - j, cs); psF(x + i, y + 1, b_mezcla(cs, hex('#ff9a7a'), 0.2)); }
    for (const [mx, al] of [[-5, 26], [6, 22]]) { for (let j = 3; j < al; j++) psF(x + mx, y - j, cs); for (let j = 5; j < al - 2; j++) { const wv = Math.round((j - 5) * 0.35) + 3; for (let i = 1; i <= wv; i++) psF(x + mx + i, y - j, i === wv ? vS : vl); for (let i = 1; i <= Math.round(wv * 0.7); i++) psF(x + mx - i, y - j, vS); } }
    R.linea(x - 14, y - 2, x - 22, y - 6, (xx, yy) => { psF(xx, yy, cs); return null; }); R.linea(x - 22, y - 6, x - 5, y - 25, (xx, yy) => { psF(xx, yy, cs); return null; }); }
  // la gente del muelle de la puesta de sol: aplauden cuando el sol toca el agua
  for (let k = 0; k < 7; k++) b_figurita(psF, 272 + k * 6 + (k > 3 ? 2 : 0), 116, t, k + 1, { brazos: Math.sin(t * 0.7 + k) > 0.3 });
  // la linterna del faro: el cristal ámbar que late y el destello que gira cada 6 s
  { const lz = 0.6 + 0.4 * Math.sin(t * 2.5); for (let y = 32; y <= 38; y++) for (let x = 65; x <= 75; x++) if ((x - 65) % 4 !== 0) R.pset(x, y, b_mezcla(hex('#c87a2a'), hex('#fff0a0'), lz * (1 - Math.abs(x - 70) / 8)));
    const u = (t % 6) / 6; if (u < 0.25) { const f = Math.sin(u / 0.25 * Math.PI), dir = u < 0.125 ? -1 : 1; for (let i = 6; i < 40 * f; i++) for (let j = -Math.round(i * 0.12); j <= Math.round(i * 0.12); j++) { const x = 70 + dir * i, y = 35 + j; if ((x + y) & 1 && x < 260) R.pset(x, y, b_mezcla(R.pget(x, y), hex('#fff4c0'), 0.55 * f * (1 - i / 42))); } } }
  // las ventanas que se encienden (una con la luz azul de una tele)
  L.ventanas.forEach(([a, b, c, d], k) => { if (h(k, 1, 89) < 0.45) return; const tv = k === 3, l = tv ? 0.5 + 0.5 * Math.sin(t * 7 + Math.sin(t * 2.3) * 3) : 0.85 + 0.15 * Math.sin(t * 0.9 + k);
    for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) if (R.pget(x, y) !== BC.blanco) R.pset(x, y, b_mezcla(hex('#3a3050'), tv ? hex('#8ab0f0') : hex('#ffc860'), l * (y === b ? 1 : 0.8))); });
  // la farola encendida
  { const l = 0.85 + 0.15 * Math.sin(t * 13) * (Math.sin(t * 0.7) > 0.8 ? 1 : 0); R.rect(176, 104, 181, 107, b_mezcla(hex('#c87a2a'), hex('#fff0b0'), l)); R.halo(178, 106, 12, [hex('#ffd890'), hex('#ffb870')], 0.5); }
  // el gato negro en el tejado de la casa rosa, que mueve la cola
  { const gx = 140, gy = 80, c = hex('#3a2e2e'); R.rect(gx, gy - 3, gx + 5, gy - 1, c); R.rect(gx + 4, gy - 6, gx + 6, gy - 3, c); R.pset(gx + 4, gy - 7, c); R.pset(gx + 6, gy - 7, c); R.pset(gx + 5, gy - 5, BC.amarillo); const a = Math.sin(t * 2.2); R.linea(gx, gy - 2, gx - 3, gy - 2 + Math.round(a * 3), c); }
  // las palmeras
  for (const [x, b, al, k] of [[88, 147, 60, 31], [198, 147, 70, 32], [222, 147, 50, 33]]) b_palmera(R, x, b, al, t, k, b_luzT);
  // gaviotas
  for (let k = 0; k < 3; k++) b_gaviota(R.pset, ((k * 110 + t * (10 + k * 4)) % 380) - 30, 50 + k * 12 + Math.sin(t + k) * 5, t, k, true);
  // el gallo y sus pollitos, por la calle
  const gu = (t * 0.08) % 2, gx = Math.round(gu < 1 ? 258 + gu * 46 : 304 - (gu - 1) * 46), gd = gu < 1 ? 1 : -1, pica = Math.sin(t * 3) > 0.4;
  b_gallo(R, gx, 170, t, gd, pica); b_pollito(R, gx - gd * 10, 172, t, 0); b_pollito(R, gx - gd * 15, 170, t, 1);
  return { encuadre: 'cayo', camara: 'general', suelo: 158, libre: [20, 250], horizonte: hor, sol: [246, 90], faro: [70, 30], bici: [150, 146], gallo: [gx, 170] };
}

// las hojas del hibisco de la esquina de abajo a la izquierda, por delante de los actores
function b_cayoDelante(R, t, o) {
  const m = Math.round(Math.sin(t * 1.4) * 1);
  for (let k = 0; k < 9; k++) { const cx = 4 + h(k, 1, 90) * 12 + m, cy = 160 + h(k, 2, 90) * 20; for (let j = -2; j <= 2; j++) for (let i = -4; i <= 4; i++) if ((i / 4.5) ** 2 + (j / 2.5) ** 2 < 1) R.pset(Math.round(cx + i + j), Math.round(cy + j), j < 0 ? b_luzT(BC.palmaL) : b_sombraT(BC.palma)); }
  for (const [x, y] of [[8 + m, 164], [15 + m, 174]]) { R.disco(x, y, 3, BC.rojo); R.pset(x, y, BC.amarillo); R.pset(x - 1, y - 1, hex('#ff8a8a')); }
}

const B_PILOTES = [26, 118, 210, 300];

function b_muelleFijo(R, L, hor) {
  b_cieloFijo(R, L, 0, hor - 1, B_CIELO_TARDE(), [72, 86, 9], [hex('#fff0b0'), hex('#ffb050'), hex('#fffbe0')]);
  b_aguaFija(R, L, hor, 141, 41, [1.6, 0.35]);
  const tlej = (c) => b_mezcla(c, hex('#5a2e5a'), 0.6);
  b_isla(R, L, 218, 300, hor + 1, 4, 340, tlej, { lejos: true }); b_isla(R, L, -10, 34, hor + 1, 2, 341, tlej, { lejos: true });
  // el larguero del fondo del muelle y la red tendida sobre él
  for (let x = 0; x < 320; x++) { b_ps(R, L, x, 138, b_luzT(BC.tablonL)); b_ps(R, L, x, 139, BC.tablon); b_ps(R, L, x, 140, BC.tablonS); b_ps(R, L, x, 141, BC.tablonD); }
  // los tablones en perspectiva: juntas, vetas, nudos, los clavos sobre las vigas que fugan y manchas de agua
  let y = 142, f = 0;
  while (y < 180) { const alto = Math.round(3 + (y - 142) * 0.12), base = h(f, 0, 91) < 0.3 ? BC.tablonS : h(f, 0, 91) > 0.8 ? BC.tablonL : BC.tablon;
    for (let j = 0; j < alto && y + j < 180; j++) for (let x = 0; x < 320; x++) { const yy = y + j, q = h(x >> 2, yy, 92 + f); let c = j === 0 ? BC.tablonL : j === alto - 1 ? BC.tablonD : base;
      if (j > 0 && j < alto - 1 && q < 0.18) c = BC.tablonS; if (j > 0 && j < alto - 1 && q > 0.93) c = BC.tablonL;
      if ((x + f * 37) % 97 === 0) c = BC.tablonD;
      const wet = b_fbm(x * 0.03, yy * 0.08, 93); if (wet > 0.66) c = b_mezcla(c, BC.tablonD, 0.35);
      b_ps(R, L, x, yy, b_luzT(c)); }
    for (const xb of [-120, -20, 80, 180, 280, 380, 480]) { const xn = Math.round(160 + (xb - 160) * (y + alto / 2 - 60) / 120); b_ps(R, L, xn, y + 1, hex('#3a2a2a')); b_ps(R, L, xn + 2, y + 1, hex('#3a2a2a')); }
    y += alto; f++; }
  // el charco que refleja el ocaso
  for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) if ((i / 14.5) ** 2 + (j / 3.5) ** 2 < 1) b_ps(R, L, 196 + i, 170 + j, j < 0 ? hex('#e8889a') : hex('#ffb880'));
  // los pilotes del fondo: redondos, con anillos, percebes, su cabo y la sombra larga en las tablas
  for (const px of B_PILOTES) {
    for (let i = 0; i < 46; i++) { const sx = px + 4 + i, sy = 142 + Math.round(i * 0.12); for (let d = 0; d < 3; d++) { const q = (sy + d) * 320 + sx; if (sx < 320) L.buf[q] = b_mezcla(L.buf[q], hex('#2a1a3a'), 0.35 * (1 - i / 50)); } }
    for (let y = 104; y <= 141; y++) for (let x = px - 4; x <= px + 4; x++) { const d = (x - px) / 4.5; let c = d < -0.5 ? b_luzT(BC.tablonL) : d > 0.5 ? BC.tablonD : (y % 7 === 0 ? BC.tablonS : b_luzT(BC.tablon));
      if (y > 133 && h(x, y, 94) < 0.5) c = h(x, y, 95) < 0.5 ? hex('#e0d8c8') : hex('#8a8a7a'); b_ps(R, L, x, y, c); }
    for (let x = px - 4; x <= px + 4; x++) { b_ps(R, L, x, 103, b_luzT(BC.tablonL)); b_ps(R, L, x, 102, x > px - 3 && x < px + 3 ? b_luzT(hex('#d8b088')) : BC.tablonD); }
    for (let y = 118; y <= 121; y++) for (let x = px - 5; x <= px + 5; x++) b_ps(R, L, x, y, (x + y) % 3 === 0 ? BC.caboS : b_luzT(BC.cabo));
  }
  // la cornamusa, el cubo con las cañas, la caja de pescado, la nevera y el rollo de cabo
  b_rectL(R, L, 154, 141, 166, 142, hex('#3a3a44')); b_rectL(R, L, 158, 139, 162, 140, hex('#5a5a64'));
  for (let y = 136; y <= 146; y++) for (let x = 39; x <= 49; x++) b_ps(R, L, x, y, y === 136 ? BC.gris : x < 42 ? BC.blanco : x > 46 ? BC.grisS : b_luzT(BC.gris));
  for (const [x1, y1] of [[32, 104], [56, 100]]) { R.linea(44, 140, x1, y1, (x, y) => { b_ps(R, L, x, y, hex('#2a2a2a')); return null; }); b_ps(R, L, x1, y1 + 1, BC.blanco); }
  b_rectL(R, L, 2, 147, 30, 162, BC.tablonD); for (let y = 148; y <= 161; y++) for (let x = 3; x <= 29; x++) b_ps(R, L, x, y, (y - 148) % 5 === 4 ? BC.tablonD : x < 6 ? b_luzT(BC.tablonL) : b_luzT(BC.tablon));
  for (let k = 0; k < 9; k++) { const fx = 6 + (k % 5) * 5 + (k > 4 ? 2 : 0), fy = 146 - (k > 4 ? 2 : 0); for (let i = -2; i <= 2; i++) { b_ps(R, L, fx + i, fy, i === -2 ? BC.grisS : hex('#d8e0e8')); b_ps(R, L, fx + i, fy + 1, BC.grisS); } b_ps(R, L, fx + 2, fy, BC.k); b_ps(R, L, fx - 3, fy - 1, BC.grisS); b_ps(R, L, fx - 3, fy + 1, BC.grisS); }
  b_rectL(R, L, 276, 146, 298, 161, BC.k); b_rectL(R, L, 277, 150, 297, 160, BC.blanco); b_rectL(R, L, 293, 150, 297, 160, BC.gris); b_rectL(R, L, 277, 147, 297, 149, BC.azul); b_rectL(R, L, 277, 147, 297, 147, hex('#6a9ad8')); b_rectL(R, L, 284, 144, 290, 145, BC.k);
  for (let r = 7; r >= 1; r--) for (let a = 0; a < 40; a++) { const x = Math.round(306 + Math.cos(a / 40 * 6.283) * r * 1.6), y = Math.round(171 + Math.sin(a / 40 * 6.283) * r * 0.6); b_ps(R, L, x, y, r % 2 ? b_luzT(BC.cabo) : BC.caboS); }
}

function b_muelle(R, t, o) {
  const hor = 92, L = b_capa(R, 'muelle', (L) => b_muelleFijo(R, L, hor)), psF = b_psF(R, L);
  const N = [[60, 46, 42, 1.4, 31], [200, 40, 36, 1.0, 32], [130, 62, 24, 0.6, 33], [270, 70, 16, 0.4, 34]];
  b_agua(R, t, L, { hor, rampas: B_AGUA_TARDE, brillo: [hex('#fff0b0'), hex('#ffe8d0')], sombras: [], sol: [72, 14], oleaje: Math.max(0, Math.min(1, o.oleaje ?? 0)) });
  b_nubes(R, t, L, N, [hex('#7a4a7a'), hex('#d8788a'), hex('#ffc49a')]);
  b_velero(psF, ((t * 3 + 20) % 360) - 20, hor + 6, t, 0.9, hex('#f8d0a8'), hex('#2a1e34'));
  // el barco de pesca amarrado, que cabecea: casco con franja, cabina, puente y los tangones
  { const by = 134 + Math.round(Math.sin(t * 1.3) * 1.2), bx = 256, cS = hex('#2a1e34');
    for (let i = -34; i <= 34; i++) { const proa = i > 26 ? (i - 26) : 0; for (let j = -10 + Math.round(proa * 0.6); j <= 0; j++) psF(bx + i, by + j, j < -8 ? BC.blanco : j > -3 ? hex('#a82a2a') : i > 20 ? b_luzT(BC.blanco) : b_sombraT(BC.blanco)); }
    for (let y = by - 24; y <= by - 11; y++) for (let x = bx - 14; x <= bx + 12; x++) psF(x, y, y === by - 24 ? BC.gris : (y > by - 21 && y < by - 15 && (x - bx + 14) % 7 > 1) ? hex('#3a3050') : b_luzT(BC.blanco));
    for (let x = bx - 16; x <= bx + 4; x++) { psF(x, by - 30, BC.k); if (x % 4 === 0) for (let y = by - 29; y <= by - 25; y++) psF(x, y, BC.k); }
    R.linea(bx - 10, by - 25, bx - 50, by - 74, (x, y) => { psF(x, y, cS); return null; }); R.linea(bx + 6, by - 25, bx + 22, by - 78, (x, y) => { psF(x, y, cS); return null; });
    for (let j = 31; j < 44; j++) psF(bx - 4, by - j, cS);
    R.linea(212, 120, bx - 30, by - 8, (x, y) => { psF(x, y + Math.round(Math.sin((x - 212) / (bx - 242) * Math.PI) * 2), BC.caboS); return null; }); }
  // el sábalo que salta cada 7 s
  { const u = (t % 7) / 7, fx = 150; if (u < 0.14) { const f = u / 0.14, x = fx + f * 18, y = 132 - Math.sin(f * Math.PI) * 16; for (let i = -4; i <= 4; i++) psF(Math.round(x + i), Math.round(y + i * (f - 0.5) * 0.9), i > 2 ? BC.grisS : hex('#f4ece0')); }
    else if (u < 0.28) { const f = (u - 0.14) / 0.14; for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283, r = 2 + f * 10; psF(Math.round(fx + 18 + Math.cos(a) * r), Math.round(133 + Math.sin(a) * r * 0.3), hex('#ffe8d0')); } } }
  // el pelícano en el pilote de x 118 y la gaviota en el de x 210
  if (o.pelicano !== false) b_pelicano(R, 118, 101, t, { dir: 1 });
  b_sprite(R.pset, [[['...ww.', '..wkwa', 'ggwww.', '.gww..', '..a...']]], { w: hex('#f4e8e0'), g: hex('#8a7a8a'), k: BC.k, a: BC.amarillo }, 210, 101, Math.sin(t * 0.5) > 0 ? 1 : -1, 2, 5, BC.k);
  // la gaviota ladrona de la caja de pescado: picotea y cada 8 s se va volando con un pez
  { const u = (t % 8) / 8; if (u < 0.6) { const pk = Math.sin(t * 6) > 0.3; b_sprite(R.pset, [[[pk ? '......' : '...ww.', pk ? '...ww.' : '..wkwa', pk ? '..wkwa' : 'ggwww.', 'ggwww.', '..a...']]], { w: hex('#f4e8e0'), g: hex('#8a7a8a'), k: BC.k, a: BC.amarillo }, 24, 145, -1, 2, 5, BC.k); }
    else { const f = (u - 0.6) / 0.4, x = 24 + f * 120, y = 140 - f * 60; b_gaviota(R.pset, x, y, t, 9, true); R.pset(Math.round(x + 4), Math.round(y + 1), hex('#d8e0e8')); R.pset(Math.round(x + 5), Math.round(y + 1), BC.grisS); } }
  for (let k = 0; k < 3; k++) b_gaviota(R.pset, ((k * 130 + t * (9 + k * 3)) % 380) - 30, 56 + k * 10 + Math.sin(t * 0.8 + k) * 4, t, k, true);
  return { encuadre: 'cayo', camara: 'muelle', suelo: 162, libre: [30, 270], horizonte: hor, sol: [72, 84], caja: [16, 160], nevera: [287, 160], pilotes: B_PILOTES.slice() };
}

// los dos pilotes del borde de delante, por delante de los actores (con su cabo)
function b_muelleDelante(R, t, o) {
  for (const [x0, x1] of [[-2, 9], [310, 321]]) for (let y = 112; y <= 179; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const d = (x - (x0 + x1) / 2) / 6; R.pset(x, y, d < -0.4 ? b_luzT(BC.tablonL) : d > 0.4 ? BC.tablonD : (y % 9 === 0 ? BC.tablonS : b_luzT(BC.tablon))); }
  for (const [x0, x1] of [[-2, 10], [309, 321]]) { for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { R.pset(x, 111, b_luzT(BC.tablonL)); for (let y = 128; y <= 132; y++) R.pset(x, y, (x + y) % 3 === 0 ? BC.caboS : b_luzT(BC.cabo)); } }
}

// la vista que piden las opciones: un encuadre que no existe cae en 'redaccion'; una cámara que no es la suya, en 'general'
function e_vista(o) {
  const enc = V_REDACCION[o.encuadre] ? o.encuadre : 'redaccion', e = V_REDACCION[enc], cam = o.camara === e.cam ? e.cam : 'general';
  return { enc, cam, geo: e[cam] };
}

// la paleta propia de la redacción y el archivo
const e_P = Object.fromEntries(Object.entries({
  techo: '#d6d2c8', techoS: '#cdc9bf', techoJ: '#c0bcb2', luz: '#fbfaf2', luzS: '#e6e4da', soffit: '#b8b4aa', soffitS: '#8e8a82',
  c0: '#4f95d6', c1: '#5fa3de', c2: '#73b2e6', c3: '#8bc2ec', c4: '#a6d2f0', c5: '#c2e2f4',
  nubeS: '#b6cce2', nube: '#dfeaf6', nubeL: '#fbfdff', gaviota: '#f4f6f8', gaviotaS: '#5a6270',
  lejos: '#9fb4cb', lejosL: '#b6c7da', lejosV: '#8ca2bb', vidrio: '#5a86b0', vidrioL: '#9cc4e2', vidrioS: '#3e6890',
  bahia: '#2f86ac', bahiaL: '#5aaad0', bahiaS: '#246e92', orilla: '#3e6e4c', orillaL: '#5a8a5a',
  alu: '#a4acb8', aluL: '#d4dae2', aluS: '#6e7682', marco: '#3e4450', estor: '#ece6d6', estorS: '#cfc8b6',
  pared: '#d4cab6', paredS: '#c8bea9', paredL: '#e0d8c6', paredJ: '#bdb39e',
  corcho: '#b8895a', corchoS: '#9c7048', corchoL: '#cc9e6e',
  tabique: '#5a6a88', tabiqueS: '#4c5a76', tabiqueL: '#6c7c9a', tope: '#c8ced8', topeS: '#8e96a4',
  moqueta: '#5c6476', moquetaS: '#525a6b', moquetaL: '#687083', moquetaJ: '#4a5262', sol: '#767e90',
  imp: '#dcdad2', impL: '#f2f0e8', impS: '#b6b4ac', impD: '#8a8882', ranura: '#24242a', lcd: '#8adab6', lcdS: '#22463a',
  metal: '#8c929e', metalS: '#6a707c', metalL: '#b6bcc6', metalD: '#4e545e',
  madera: '#a8744a', maderaS: '#7c5232', maderaL: '#c8946a', maderaV: '#93613a', maderaD: '#5a3a22',
  papel: '#f8f6ee', papelS: '#cec9ba', papelD: '#9a9486', tinta: '#1c1c24', texto: '#8e8e9a',
  fotoC: '#bfe0ee', fotoA: '#4a90a8', fotoAL: '#6ab0c8', caiman: '#3a4a2a', caimanL: '#5c703a', ojo: '#f8d838',
  pantalla: '#1e2a40', pantallaL: '#8ab8e0', tele: '#14161c', rojo: '#d83a3a', rojoS: '#9a2424', verde: '#4ac86a', verdeS: '#2a6a3a',
  hoja: '#3e8a3e', hojaL: '#62ae4e', hojaS: '#2a5e2e', maceta: '#b8603a', macetaS: '#8a4428', piel: '#f0c8a0',
  // el archivo
  verdeP: '#b2c3a2', verdePL: '#c2d1b2', verdePS: '#a2b392', zocalo: '#6e4628', zocaloS: '#55351e', zocaloL: '#86583a',
  laton: '#c8a040', latonL: '#f2d878', latonS: '#8a6a22', placa: '#4a2e1c', placaL: '#6a4630',
  terrazo: '#dad2be', terrazoS: '#c8bfaa', terrazoL: '#ece6d6', archi: '#7e8878', archiS: '#646c5e', archiL: '#9ea896', archiD: '#4a5046',
  caja: '#d8c49a', cajaS: '#b8a47a', led: '#ff4a32', ledS: '#3e1410', cordon: '#a82a3a',
}).map(([k, v]) => [k, hex(v)]));

// los tonos del cielo, de arriba abajo, y el conjunto de colores «cielo» (las nubes y las gaviotas solo pintan encima)
const e_CIELO = [e_P.c0, e_P.c1, e_P.c2, e_P.c3, e_P.c4, e_P.c5];

const e_ESCIELO = new Set(e_CIELO);

// el fondo fijo de una vista: se pinta una vez por lienzo en un búfer de R.nuevo() y se copia entero en cada fotograma
const e_CACHE = new WeakMap();

function e_fijo(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function e_mezcla(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// degradado vertical tramado (Bayer 4×4) entre los colores de cols, de arriba abajo
const e_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

function e_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = (u - i) * 16;
    for (let x = x0; x <= x1; x++) R.pset(x, y, f > e_BAYER[(y & 3) * 4 + (x & 3)] + 0.5 ? cols[i + 1] : cols[i]); }
}

// textura de ruido: rellena un rectángulo con c y salpica cS (oscuro) y cL (claro) con la probabilidad p
function e_textura(R, x0, y0, x1, y1, c, cS, cL, k, p = 0.12, grano = 1) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = h(Math.floor(x / grano), Math.floor(y / grano), k); R.pset(x, y, v < p ? cS : v > 1 - p * 0.7 ? cL : c); }
}

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba) que solo se pinta sobre el cielo (pasa por detrás de todo)
function e_nube(R, cx, cy, w, k) {
  const B = [[0, 0, 0.3], [-0.3, 0.1, 0.22], [0.3, 0.08, 0.24], [-0.08, -0.15, 0.25], [0.17, -0.09, 0.2], [-0.45, 0.16, 0.12]];
  const x0 = Math.floor(cx - w * 0.62), x1 = Math.ceil(cx + w * 0.55), y0 = Math.floor(cy - w * 0.42), y1 = Math.ceil(cy + w * 0.2);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let d = 9; for (const [dx, dy, r] of B) { const v = Math.hypot((x - cx - dx * w) / (r * w), (y - cy - dy * w) / (r * w * 0.78)); if (v < d) d = v; }
    if (d > 1 || y > cy + w * 0.17 || !e_ESCIELO.has(R.pget(x, y))) continue;
    const yy = (y - cy) / w, n = h(x, y, k) * 0.08;
    R.pset(x, y, yy + n > 0.06 ? e_P.nubeS : yy - n < -0.13 && d < 0.92 ? e_P.nubeL : e_P.nube);
  }
}

// una gaviota que planea y aletea de vez en cuando (solo sobre el cielo)
function e_gaviota(R, x, y, t, k) {
  const al = Math.sin(t * 7 + k * 3) > 0.3 ? -1 : 0, P = [[-3, al], [-2, -1 + (al ? 0 : 0)], [-1, 0], [0, 0], [1, 0], [2, -1], [3, al]];
  for (const [dx, dy] of P) { const X = Math.round(x + dx), Y = Math.round(y + dy); if (e_ESCIELO.has(R.pget(X, Y))) R.pset(X, Y, dx === 0 ? e_P.gaviotaS : e_P.gaviota); }
}

// la foto de un caimán (cielo, agua y el caimán de hocico ancho con el ojo amarillo) en el rectángulo x, y, w × hh
function e_fotoCaiman(R, x, y, w, hh, k = 0) {
  for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) { const u = (i + 0.5) / w, v = (j + 0.5) / hh; R.pset(x + i, y + j, e_texFoto(u, v, k)); }
}

// el color de la foto del caimán en (u, v) ∈ [0, 1)²
function e_texFoto(u, v, k = 0) {
  const d = ((u - 0.46) / 0.4) ** 2 + ((v - 0.6) / 0.15) ** 2, hoc = u > 0.7 && u < 0.95 && v > 0.53 && v < 0.67;
  if (u > 0.58 && u < 0.66 && v > 0.42 && v < 0.54) return e_P.ojo;
  if (d < 1 || hoc) return v < 0.56 && u < 0.6 ? e_P.caimanL : e_P.caiman;
  if (v < 0.38) return k % 2 ? e_P.fotoC : e_P.c4;
  return (Math.floor(v * 9) % 3 === 0 && u > 0.1) ? e_P.fotoAL : e_P.fotoA;
}

// el color de una hoja impresa con titular en (u, v): margen, dos barras negras de titular, la foto del caimán a la
// izquierda, renglones grises a la derecha y debajo; k cambia el largo de las barras
function e_texHoja(u, v, k) {
  if (u < 0.09 || u > 0.91 || v < 0.06 || v > 0.94) return e_P.papel;
  if (v < 0.2) return u < 0.88 ? e_P.tinta : e_P.papel;
  if (v > 0.24 && v < 0.33) return u < 0.45 + 0.35 * h(k, 1, 701) ? e_P.tinta : e_P.papel;
  if (v > 0.39 && v < 0.69 && u < 0.52) return e_texFoto((u - 0.09) / 0.43, (v - 0.39) / 0.3, k);
  if (v > 0.39 && u > 0.58) return Math.floor((v - 0.39) * 26) % 2 === 0 && u < 0.91 - 0.2 * h(k, Math.floor(v * 20), 702) ? e_P.texto : e_P.papel;
  if (v > 0.74) return Math.floor((v - 0.74) * 26) % 2 === 0 && u < 0.91 - 0.3 * h(k, Math.floor(v * 20), 703) ? e_P.texto : e_P.papel;
  return e_P.papel;
}

// una hoja de titulares centrada en (cx, cy), de w × hh px, girada ang y aplastada en vertical sq (1 = de frente; 0,35 =
// tumbada en el suelo; negativo = se ve el dorso); el canto, en gris para que se lea sobre el suelo
function e_hoja(R, cx, cy, w, hh, ang, sq, k, tenue = 0) {
  const s = Math.abs(sq); if (s < 0.08) { R.linea(Math.round(cx - w / 2), Math.round(cy), Math.round(cx + w / 2), Math.round(cy), e_P.papelS); return; }
  const ca = Math.cos(ang), sa = Math.sin(ang), dorso = sq < 0;
  const rx = Math.ceil(Math.abs(ca) * w / 2 + Math.abs(sa) * hh / 2) + 1, ry = Math.ceil((Math.abs(sa) * w / 2 + Math.abs(ca) * hh / 2) * s) + 1;
  for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) {
    const yy = y / s, u = (x * ca + yy * sa) / w + 0.5, v = (-x * sa + yy * ca) / hh + 0.5;
    if (u < 0 || u >= 1 || v < 0 || v >= 1) continue;
    const borde = u * w < 1 || (1 - u) * w < 1 || v * hh < 1 * s || (1 - v) * hh < 1.2;
    const c = borde ? e_P.papelD : dorso ? (e_texHoja(1 - u, v, k) === e_P.papel ? e_P.papelS : e_P.papelD) : e_texHoja(u, v, k);
    R.pset(Math.round(cx + x), Math.round(cy + y), tenue ? e_mezcla(c, e_P.papelS, tenue) : c);
  }
}

// cifras pequeñas de 3 × 5 (solo números)
const e_DIG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['##.', '..#', '.#.', '#..', '###'], 3: ['##.', '..#', '.#.', '..#', '##.'], 4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '##.', '..#', '##.'], 6: ['.##', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '##.'] };

function e_cifras(R, s, x, y, c, esc = 1) {
  let cx = x; for (const ch of String(s)) { const g = e_DIG[ch]; if (g) g.forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') for (let a = 0; a < esc; a++) for (let b = 0; b < esc; b++) R.pset(cx + i * esc + a, y + j * esc + b, c); }); cx += 4 * esc; }
  return cx - x;
}

// las cifras grandes de latón (5 × 7 celdas de s px) con su luz arriba y a la izquierda, su sombra y la sombra en la pared
const e_GRANDE = { 1: ['..#..', '.##..', '#.#..', '..#..', '..#..', '..#..', '#####'], 9: ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'] };

function e_cifraGrande(R, ch, x, y, s, sombra) {
  const g = e_GRANDE[ch], en = (i, j) => j >= 0 && j < 7 && i >= 0 && i < 5 && g[j][i] === '#';
  for (let j = 0; j < 7; j++) for (let i = 0; i < 5; i++) if (en(i, j)) R.rect(x + i * s + 2, y + j * s + 2, x + i * s + s + 1, y + j * s + s + 1, sombra);
  for (let j = 0; j < 7; j++) for (let i = 0; i < 5; i++) if (en(i, j)) {
    const X = x + i * s, Y = y + j * s; R.rect(X, Y, X + s - 1, Y + s - 1, e_P.laton);
    if (!en(i, j - 1)) R.rect(X, Y, X + s - 1, Y, e_P.latonL); if (!en(i - 1, j)) R.rect(X, Y, X, Y + s - 1, e_P.latonL);
    if (!en(i, j + 1)) R.rect(X, Y + s - 1, X + s - 1, Y + s - 1, e_P.latonS); if (!en(i + 1, j)) R.rect(X + s - 1, Y, X + s - 1, Y + s - 1, e_P.latonS);
    if ((i + j) % 3 === 0) R.pset(X + 1, Y + 1, e_P.latonL);
  }
}

// gente pequeña de fondo (unos 12 px): de pie, andando (o.anda) o asomando por encima de un tabique (se recorta con
// R.recorte); k elige la ropa, el pelo y la piel; dir: hacia dónde mira
const e_GENTE = {
  quieto: ['..kkk..', '.kHHHk.', '.kHSSk.', '.kSSSk.', '..kSk..', '.kCCCk.', 'kCCCCCk', 'kSCCCSk', '.kCCCk.', '.kPPPk.', '.kPkPk.', '.kk.kk.'],
  paso: ['..kkk..', '.kHHHk.', '.kHSSk.', '.kSSSk.', '..kSk..', '.kCCCk.', 'kCCCCCk', 'kSCCCSk', '.kCCCk.', '.kPPPk.', 'kPk.kPk', 'kk...kk'],
  brazos: ['k.kkk.k', 'SkHHHkS', 'SkHSSkS', 'SkSSSkS', 'kCkSkCk', '.kCCCk.', '.kCCCk.', '.kCCCk.', '.kCCCk.', '.kPPPk.', '.kPkPk.', '.kk.kk.'],
};

const e_ROPA = ['#c85a5a', '#5a8ac8', '#e8c85a', '#6aa86a', '#a86ac8', '#e88a4a', '#4ab0b0', '#f0f0e8'], e_PELO = ['#3a2418', '#1a1418', '#8a5a2a', '#c8c8c8', '#e8c070', '#5a2a1a'], e_TEZ = ['#f0c8a0', '#c88a5a', '#8a5a3a', '#e8b48a'];

function e_gente(R, x, suelo, t, k, o = {}) {
  const pal = { k: C.k, H: hex(e_PELO[k % 6]), S: hex(e_TEZ[(k * 3 + 1) % 4]), C: hex(e_ROPA[(k * 5 + 2) % 8]), P: hex(['#3a3e58', '#2a2a30', '#5a4a3a', '#4a5a7a'][k % 4]) };
  const f = o.anda ? (Math.floor(t * 6 + k) % 2 ? e_GENTE.paso : e_GENTE.quieto) : o.brazos ? e_GENTE.brazos : e_GENTE.quieto;
  const by = o.anda ? (Math.floor(t * 6 + k) % 2) : 0;
  R.dibujo(f, Math.round(x - 3), Math.round(suelo - 12 + by * 0), o.dir ?? 1, pal);
  if (o.dir < 0) R.pset(Math.round(x - 2), Math.round(suelo - 10), C.k); else R.pset(Math.round(x + 2), Math.round(suelo - 10), C.k);
  if (o.taza) { const tx = Math.round(x + (o.dir < 0 ? -4 : 4)); R.rect(tx - 1, suelo - 6, tx + 1, suelo - 4, C.blanco); R.pset(tx, suelo - 6, hex('#6a3a1a')); }
}

// una palmera vista de cerca: tronco con anillos y la copa que se mece (x, y: el pie del tronco; alto; s: la escala)
function e_palmera(R, x, y, alto, t, k = 0, s = 1) {
  const m = Math.sin(t * 1.1 + k) * 1.6 * s;
  for (let j = 0; j <= alto; j++) { const u = j / alto, px = Math.round(x + Math.sin(u * 1.4) * 4 * s + m * u * u); R.pset(px, y - j, j % 3 ? hex('#9a7a52') : hex('#6e5434')); R.pset(px + 1, y - j, hex('#7a5e3c')); if (s > 1) R.pset(px - 1, y - j, hex('#b08c60')); }
  const tx = Math.round(x + Math.sin(1.4) * 4 * s + m), ty = y - alto;
  for (let f = 0; f < 8; f++) { const a = -Math.PI + f * Math.PI / 7 + Math.sin(t * 1.7 + f + k) * 0.08; const L = (9 + (f % 2) * 3) * s;
    for (let d = 1; d < L; d++) { const px = Math.round(tx + Math.cos(a) * d), py = Math.round(ty + Math.sin(a) * d * 0.55 + d * d / (20 * s)); R.pset(px, py, d > L * 0.7 ? e_P.hojaS : e_P.hoja); if (d % 2 && d > 2) R.pset(px, py + 1, d > L * 0.6 ? e_P.hojaS : e_P.hojaL); } }
  R.disco(tx, ty, 1.5 * s, hex('#6e5434'));
}

// un reloj de pared con la aguja de los segundos (cx, cy, r)
function e_reloj(R, cx, cy, r, t, aro = C.k) {
  R.disco(cx, cy, r + 1, aro); R.disco(cx, cy, r, C.blanco); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(a) * (r - 1.2)), Math.round(cy + Math.sin(a) * (r - 1.2)), k % 3 ? hex('#a8a8b0') : C.k); }
  const hA = (0.31 + t / 43200) * Math.PI * 2 - Math.PI / 2, mA = (0.62 + t / 3600) * Math.PI * 2 - Math.PI / 2, sA = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2;
  R.linea(cx, cy, Math.round(cx + Math.cos(hA) * r * 0.5), Math.round(cy + Math.sin(hA) * r * 0.5), C.k); R.linea(cx, cy, Math.round(cx + Math.cos(mA) * r * 0.8), Math.round(cy + Math.sin(mA) * r * 0.8), C.k);
  R.linea(cx, cy, Math.round(cx + Math.cos(sA) * r * 0.85), Math.round(cy + Math.sin(sA) * r * 0.85), e_P.rojo);
}

// un ficus en maceta (x: el centro; y: el pie de la maceta; alto)
function e_ficus(R, x, y, alto, t, k = 0) {
  R.poligono([[x - 9, y - 14], [x + 9, y - 14], [x + 7, y], [x - 7, y]], C.k); R.poligono([[x - 8, y - 13], [x + 8, y - 13], [x + 6, y - 1], [x - 6, y - 1]], e_P.maceta);
  R.rect(x - 8, y - 13, x + 8, y - 12, e_P.macetaS); R.rect(x + 3, y - 11, x + 5, y - 2, e_P.macetaS); R.rect(x - 6, y - 11, x - 5, y - 3, hex('#d07a50'));
  R.linea(x, y - 13, x - 1, y - alto + 6, e_P.maderaS); R.linea(x + 1, y - 13, x + 3, y - alto + 10, e_P.maderaS);
  for (let i = 0; i < 26; i++) { const lx = x + Math.round((h(i, 1, 720 + k) - 0.5) * 22 + Math.sin(t * 0.8 + i) * 0.8), ly = y - 14 - Math.round(h(i, 2, 720 + k) * (alto - 16)) - 2;
    R.disco(lx, ly, 2.6, C.k); R.disco(lx, ly, 2.1, i % 3 ? e_P.hoja : e_P.hojaS); R.pset(lx - 1, ly - 1, e_P.hojaL); }
}

// las palmeras de la orilla (x del pie), detrás del cristal: se recortan a cada paño
const e_PALMAS = [[26, 80, 26, 0], [116, 80, 20, 1], [182, 80, 24, 2], [252, 80, 18, 3]];

const e_PANOS = [[2, 19, 66, 78], [70, 19, 134, 78], [138, 19, 202, 78], [206, 19, 269, 78]];

function e_redGeneralFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P;
  // el techo de placas (tranquilo bajo el año) con sus juntas, los plafones y los rociadores
  e_textura(R, 0, 0, 319, 11, P.techo, P.techoS, P.techoS, 501, 0.1);
  for (let x = 8; x < 320; x += 26) rect(x, 0, x, 11, P.techoJ); rect(0, 5, 319, 5, P.techoJ);
  for (const [a, b] of [[184, 228], [236, 270]]) { rect(a, 1, b, 4, P.techoJ); rect(a + 1, 1, b - 1, 3, P.luz); for (let x = a + 4; x < b; x += 4) pset(x, 2, P.luzS); }
  for (const x of [200, 250]) { pset(x, 9, P.metalS); pset(x, 10, P.metalL); }
  rect(0, 12, 319, 16, P.soffit); rect(0, 12, 319, 12, P.techoJ); rect(0, 16, 319, 16, P.soffitS);
  // los ventanales: el cielo tramado, los rascacielos lejanos, las torres pastel y de cristal, la orilla y la bahía
  e_degradado(R, 0, 17, 271, 68, e_CIELO);
  for (let k = 0; k < 34; k++) { const x = k * 8 - 4 + Math.round(h(k, 1, 502) * 4), w = 5 + Math.round(h(k, 2, 502) * 4), top = 64 - Math.round(8 + h(k, 3, 502) * (k > 10 && k < 22 ? 24 : 14));
    rect(x, top, x + w, 66, P.lejos); rect(x, top, x, 66, P.lejosL); for (let y = top + 2; y < 65; y += 3) for (let i = 2; i < w; i += 2) if (h(x + i, y, 503) < 0.35) pset(x + i, y, P.lejosV);
    if (h(k, 4, 502) < 0.25) rect(x + (w >> 1), top - 4, x + (w >> 1), top - 1, P.lejosV); }
  const PASTEL = [C.pastelRosa, C.pastelMenta, C.pastelAmar, C.pastelAzul, hex('#ece2d2'), C.pastelRosa, C.pastelMenta];
  const TORRES = [[6, 22, 40, 0], [34, 16, 46, 'v'], [54, 20, 36, 1], [80, 14, 30, 'v'], [98, 24, 44, 2], [128, 18, 34, 3], [150, 13, 26, 'v'], [166, 22, 42, 4], [194, 16, 48, 'v'], [214, 20, 38, 5], [240, 26, 44, 6]];
  for (const [x, w, top, tipo] of TORRES) {
    if (tipo === 'v') { // torre de cristal: azul con reflejos en diagonal y la azotea con su antena
      rect(x, top, x + w, 67, P.vidrioS); rect(x + 1, top + 1, x + w - 2, 67, P.vidrio);
      for (let y = top + 2; y < 67; y += 2) rect(x + 1, y, x + w - 2, y, P.vidrioS);
      for (let i = 0; i < w; i++) for (let y = top + 1; y < 67; y++) if (((i + y) % 13) < 2) pset(x + i, y, P.vidrioL);
      rect(x + 2, top - 3, x + w - 2, top - 1, P.vidrioS); rect(x + (w >> 1), top - 8, x + (w >> 1), top - 4, P.vidrioS);
      continue; }
    const c = PASTEL[tipo], cS = e_mezcla(c, hex('#5a4a6a'), 0.25), cL = e_mezcla(c, C.blanco, 0.45);
    // el cuerpo con su escalonado art déco, la aleta central clara, la cara en sombra y las ventanas con balcones
    rect(x, top + 6, x + w, 67, c); rect(x + 3, top + 2, x + w - 3, top + 6, c); rect(x + (w >> 1) - 2, top - 3, x + (w >> 1) + 2, top + 2, c);
    rect(x + w - 2, top + 6, x + w, 67, cS); rect(x + w - 5, top + 2, x + w - 3, top + 6, cS); rect(x, top + 6, x + w, top + 6, cL); rect(x + 3, top + 2, x + w - 3, top + 2, cL);
    rect(x + (w >> 1), top - 6, x + (w >> 1), top - 4, cS);
    for (let y = top + 9; y < 66; y += 4) { for (let i = 2; i < w - 3; i += 3) { rect(x + i, y, x + i + 1, y + 1, h(x + i, y, 504) < 0.25 ? P.vidrioL : P.vidrio); } if (tipo % 2) rect(x + 1, y + 2, x + w - 3, y + 2, cL); }
    rect(x + (w >> 1) - 1, top + 7, x + (w >> 1), 66, cL);
  }
  // la orilla de enfrente: los árboles, el muelle y el agua de la bahía con sus ondas
  for (let x = 0; x < 272; x++) { const ht = 1 + Math.round(h(x >> 1, 1, 505) * 2); rect(x, 67 - ht, x, 68, h(x, 2, 505) < 0.5 ? P.orilla : P.orillaL); }
  for (let y = 69; y <= 78; y++) for (let x = 0; x < 272; x++) { const v = h(x >> 2, y, 506); pset(x, y, v < 0.18 ? P.bahiaS : v > 0.86 ? P.bahiaL : P.bahia); }
  // el crucero atracado a la derecha: casco blanco, franja azul, cubiertas con ventanitas y la chimenea
  rect(212, 60, 262, 67, C.k); rect(213, 61, 261, 66, C.blanco); rect(213, 64, 261, 64, hex('#3a6ac0')); for (let x = 215; x < 260; x += 2) pset(x, 62, hex('#7a9ac0'));
  rect(220, 56, 252, 60, C.k); rect(221, 57, 251, 59, C.blanco); for (let x = 222; x < 251; x += 3) pset(x, 58, hex('#7a9ac0')); rect(240, 51, 245, 56, C.k); rect(241, 52, 244, 56, hex('#d84a4a')); rect(241, 52, 244, 52, hex('#f0a0a0'));
  // los montantes, el estor bajado en el segundo paño, los reflejos del cristal y el alféizar
  rect(0, 17, 272, 18, P.marco); rect(0, 18, 272, 18, P.alu);
  for (const x of [0, 67, 135, 203, 270]) { rect(x, 17, x + 2, 79, P.marco); rect(x + 1, 18, x + 1, 78, P.aluL); }
  rect(70, 19, 134, 34, P.estor); for (let y = 21; y < 34; y += 2) rect(70, y, 134, y, P.estorS); rect(70, 34, 134, 35, P.estorS); rect(70, 36, 134, 36, C.k); linea(130, 36, 130, 44, P.aluS); rect(129, 45, 131, 46, P.aluS);
  for (const x0 of [8, 214]) for (let i = 0; i < 18; i++) for (const d of [0, 5]) { const x = x0 + d + i, y = 74 - i * 3; pset(x, y, e_mezcla(R.pget(x, y), C.blanco, 0.45)); pset(x, y - 1, e_mezcla(R.pget(x, y - 1), C.blanco, 0.3)); }
  rect(0, 79, 272, 82, C.k); rect(0, 79, 272, 80, P.aluL); rect(0, 81, 272, 81, P.alu);
  // el sofito, más hondo, deja tranquila la franja del año (y 12–20) y es el canto de arriba del ventanal
  rect(0, 12, 272, 20, P.soffit); rect(0, 12, 272, 12, P.techoJ); rect(0, 19, 272, 19, P.soffitS); rect(0, 20, 272, 21, P.marco);
  // a la derecha del ventanal, la pared tranquila (bajo Atom) con el reloj
  e_textura(R, 273, 17, 319, 82, P.pared, P.paredS, P.paredL, 507, 0.05);
  // en el alféizar: macetitas, una radio y una pila de carpetas
  for (const [x, c] of [[10, e_P.hoja], [150, e_P.hojaL], [176, e_P.hoja]]) { rect(x, 75, x + 5, 78, C.k); rect(x + 1, 76, x + 4, 78, P.maceta); disco(x + 2.5, 73, 2.5, C.k); disco(x + 2.5, 73, 2, c); pset(x + 2, 72, P.hojaL); }
  rect(40, 72, 56, 78, C.k); rect(41, 73, 55, 78, hex('#3a3a42')); disco(45, 75, 2, hex('#6a6a72')); for (let x = 49; x < 55; x += 2) rect(x, 74, x, 77, hex('#5a5a62')); linea(54, 72, 58, 66, P.metalS);
  for (let j = 0; j < 3; j++) { rect(222 + j, 75 - j * 2, 240 + j, 78 - j * 2, C.k); rect(223 + j, 76 - j * 2, 239 + j, 77 - j * 2, [hex('#c84a4a'), hex('#4a7ac8'), hex('#e8c84a')][j]); }

  // la pared del fondo con sus juntas y su ruido; el zócalo de sombra bajo el alféizar
  e_textura(R, 0, 83, 319, 112, P.pared, P.paredS, P.paredL, 508, 0.07);
  for (let x = 40; x < 320; x += 48) rect(x, 83, x, 112, P.paredJ); rect(0, 83, 319, 84, P.paredJ);
  // el tablón de corcho con las hojas de titulares, las chinchetas y el hilo rojo
  rect(12, 85, 64, 99, P.maderaD); rect(13, 86, 63, 98, P.madera); rect(14, 87, 62, 97, P.corcho);
  for (let k = 0; k < 60; k++) pset(14 + Math.floor(h(k, 1, 509) * 48), 87 + Math.floor(h(k, 2, 509) * 10), k % 3 ? P.corchoS : P.corchoL);
  const NOTAS = [[20, 92, -0.08], [31, 92, 0.06], [42, 91, -0.04], [54, 92, 0.1]];
  NOTAS.forEach(([x, y, a], k) => e_hoja(R, x, y, 9, 10, a, 1, k + 3));
  for (let i = 0; i + 1 < 4; i++) linea(NOTAS[i][0], NOTAS[i][1] - 5, NOTAS[i + 1][0], NOTAS[i + 1][1] - 5, P.rojo);
  for (const [x, y] of NOTAS) { pset(x, y - 6, P.rojoS); pset(x, y - 5, P.rojo); }
  // dos portadas enmarcadas (los premios de la casa)
  for (const [x0, y0, w, hh, k] of [[72, 85, 15, 15, 1], [91, 86, 12, 12, 2]]) { rect(x0, y0, x0 + w, y0 + hh, C.k); rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, P.laton); e_hoja(R, x0 + w / 2 + 0.5, y0 + hh / 2 + 0.5, w - 3, hh - 3, 0, 1, k); pset(x0 + 1, y0 + 1, P.latonL); }
  // el soporte de la tele, la puerta del jefe con su estor y el pomo
    rect(194, 84, 220, 112, P.maderaD); rect(196, 85, 218, 112, P.madera); for (let y = 86; y < 112; y += 3) for (let x = 197; x < 218; x++) if (h(x, y, 510) < 0.35) pset(x, y, P.maderaV);
  rect(199, 88, 215, 101, C.k); rect(200, 89, 214, 100, hex('#c8d8e4')); for (let y = 90; y < 100; y += 2) rect(200, y, 214, y, P.estorS); rect(214, 104, 216, 106, P.laton); pset(214, 104, P.latonL);
  // la fuente de agua: el cuerpo, el grifo azul y rojo y el vaso de cono
  rect(226, 98, 240, 112, C.k); rect(227, 99, 239, 112, hex('#e8e8e2')); rect(237, 99, 239, 112, hex('#c8c8c2')); rect(229, 101, 231, 103, hex('#3a6ac8')); rect(234, 101, 236, 103, P.rojo); rect(228, 105, 238, 106, hex('#9a9a96'));
  rect(242, 100, 246, 106, hex('#9a9a96')); poligono([[242, 100], [246, 100], [244, 104]], C.blanco);
  // el calendario de pared con su rejilla de días y el día marcado en rojo
  rect(250, 85, 266, 99, C.k); rect(251, 86, 265, 98, C.blanco); rect(251, 86, 265, 91, P.rojo); e_cifras(R, 7, 256, 86, C.blanco);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) rect(252 + i * 3, 92 + j * 2, 253 + i * 3, 92 + j * 2, (i === 3 && j === 1) ? P.rojo : hex('#b8b8c0'));
  // la estantería de archivadores de la derecha (por debajo de Atom)
  rect(276, 84, 319, 127, P.maderaD); for (const y of [97, 112]) rect(277, y, 319, y + 1, P.madera);
  for (const [y0, y1] of [[86, 96], [99, 111], [114, 126]]) { let x = 278; let k = y0; while (x < 318) { const w = 2 + Math.floor(h(x, k, 511) * 3), c = hex(['#c84a4a', '#4a7ac8', '#e8c84a', '#5aa86a', '#e8e2d2', '#8a5ac8'][Math.floor(h(x, k, 512) * 6)]);
    const top = y0 + Math.floor(h(x, k, 513) * 3); rect(x, top, x + w, y1, C.k); rect(x + 1, top + 1, x + w - 1, y1, c); pset(x + 1, top + 3, C.blanco); x += w + 1; } }
  // los tabiques de las mesas: tela tramada, las juntas con sus postes y el canto metálico
  for (let y = 110; y <= 127; y++) for (let x = 0; x < 276; x++) { const v = h(x, y, 514); pset(x, y, v < 0.18 ? P.tabiqueS : v > 0.9 ? P.tabiqueL : ((x + y) % 4 === 0 ? P.tabiqueS : P.tabique)); }
  rect(0, 109, 275, 111, P.tope); rect(0, 111, 275, 111, P.topeS); for (let x = 0; x < 276; x += 46) { rect(x, 109, x + 1, 127, P.topeS); rect(x, 109, x, 127, P.tope); }
  rect(0, 126, 275, 127, P.tabiqueS);
  // las notas clavadas en la tela de los tabiques, con su chincheta de color
  for (const [x, y, k] of [[8, 114, 0], [60, 116, 1], [88, 113, 2], [150, 115, 3], [178, 113, 4], [226, 116, 5], [252, 114, 6]]) { const c = k % 3 === 1 ? hex('#f0e090') : k % 3 === 2 ? hex('#a8d0f0') : P.papel;
    rect(x, y, x + 7, y + 8, c); for (let j = y + 2; j < y + 8; j += 2) rect(x + 1, j, x + 5 - (j % 4 ? 1 : 0), j, P.texto); pset(x + 3, y, hex(['#d83a3a', '#3a6ac8', '#e8c84a', '#4ac86a'][k % 4])); }
  // la moqueta en losetas: juntas en perspectiva (hacia el fondo), el ruido, las manchas de sol y la sombra de los tabiques
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 515); pset(x, y, v < 0.14 ? P.moquetaS : v > 0.92 ? P.moquetaL : P.moqueta); }
  for (const y of [131, 136, 142, 150, 160, 172]) rect(0, y, 319, y, P.moquetaJ);
  for (let k = -10; k < 18; k++) linea(160 + k * 14, 128, 160 + k * 44, 180, P.moquetaJ);
  rect(0, 128, 319, 129, hex('#444b5a'));
  for (const [x0, w] of [[20, 40], [100, 46], [190, 40]]) for (let y = 131; y < 150; y++) for (let x = x0 + (y - 131); x < x0 + w + (y - 131) * 1.6; x++) if ((x + y) % 2 === 0) pset(x, y, e_mezcla(R.pget(x, y), P.sol, 0.6));
  // sobre los tabiques: carpetas, una planta, la bandeja de papeles y un flexo
  for (let j = 0; j < 4; j++) { rect(50 + j * 3, 100, 52 + j * 3, 109, C.k); rect(51 + j * 3, 101, 51 + j * 3, 108, hex(['#c84a4a', '#4a7ac8', '#e8c84a', '#5aa86a'][j])); }
  rect(184, 104, 190, 109, C.k); rect(185, 105, 189, 108, P.maceta); for (const [dx, dy] of [[0, -2], [-2, -4], [2, -5], [0, -7], [3, -2]]) { disco(187 + dx, 104 + dy, 2, C.k); disco(187 + dx, 104 + dy, 1.4, e_P.hoja); }
  rect(212, 105, 226, 109, C.k); rect(213, 106, 225, 108, hex('#3a3e48')); for (let j = 0; j < 3; j++) rect(214 + j, 104 - j, 224 - j, 104 - j, P.papel);
  linea(166, 109, 168, 100, C.k); linea(168, 100, 163, 97, C.k); rect(160, 96, 164, 98, hex('#3a8a6a'));
  // hojas sueltas por el suelo, lejos del montón (detrás de quien pase)
  for (const [x, y, a, k] of [[214, 171, 0.5, 21], [262, 176, -0.7, 22], [186, 168, 1.2, 23]]) e_hoja(R, x, y, 10, 13, a, 0.36, k);
  // la caja de enchufes del suelo
  rect(232, 165, 242, 168, C.k); rect(233, 165, 241, 167, P.metal); rect(233, 165, 241, 165, P.metalL); pset(236, 166, C.k); pset(238, 166, C.k);
  // la silla vacía junto a la mesa
  rect(192, 133, 204, 146, C.k); rect(193, 134, 203, 145, hex('#2a2e3a')); for (let y = 135; y < 145; y += 2) for (let x = 194 + (y % 4 ? 1 : 0); x < 203; x += 2) pset(x, y, hex('#454a5a'));
  rect(190, 146, 206, 149, C.k); rect(191, 147, 205, 148, hex('#3a3e4a')); rect(197, 150, 199, 156, C.k); rect(190, 156, 206, 157, C.k); for (const dx of [190, 198, 206]) { pset(dx, 158, C.k); pset(dx, 159, P.metalS); }
  // la impresora sobre su mueble: el mueble con sus puertas, el cuerpo, la bandeja, el panel, la rejilla y el cajón
  rect(49, 147, 95, 160, C.k); rect(50, 148, 94, 159, P.metal); rect(50, 148, 94, 148, P.metalL); rect(72, 149, 72, 158, P.metalS);
  for (const x of [68, 76]) rect(x, 152, x + 1, 155, P.metalD); rect(50, 158, 94, 159, P.metalD); rect(46, 160, 98, 161, hex('#3c4250'));
  rect(48, 133, 96, 147, C.k); rect(49, 134, 95, 146, P.imp); rect(49, 134, 95, 135, P.impL); rect(93, 136, 95, 146, P.impS); rect(49, 146, 95, 146, P.impD);
  rect(55, 136, 85, 139, P.ranura); rect(56, 136, 84, 136, P.impD); rect(55, 140, 85, 140, P.impS);
  rect(86, 135, 94, 141, P.impD); rect(87, 136, 93, 139, P.lcdS);
  for (let y = 142; y < 146; y += 2) for (let x = 51; x < 60; x += 2) pset(x, y, P.impD);
  rect(62, 143, 92, 145, P.impS); rect(70, 144, 84, 144, P.impD); rect(88, 143, 90, 143, P.impD);
  for (let x = 51; x < 93; x += 7) pset(x, 134, C.blanco);
  // una resma de papel sobre el mueble, junto a la impresora
  rect(98, 152, 112, 160, C.k); rect(99, 153, 111, 159, P.papel); rect(99, 156, 111, 157, hex('#5a8ac8')); for (let y = 153; y < 156; y++) pset(100 + y % 3, y, P.papelS);
}

function e_redGeneral(R, t, o) {
  const { rect, pset, linea, disco } = R, P = e_P;
  e_fijo(R, 'e-red-g', () => e_redGeneralFijo(R));
  // las nubes a tres velocidades y las gaviotas (solo sobre el cielo); el humo del crucero
  [[30, 28, 30, 2.2], [150, 24, 24, 3.2], [260, 33, 20, 4.4], [90, 40, 16, 6], [210, 44, 14, 7.5]].forEach(([x0, y, w, v], k) => e_nube(R, ((x0 + t * v) % 360 + 360) % 360 - 40, y, w, 520 + k));
  for (let k = 0; k < 3; k++) { const x = ((40 + k * 90 - t * (9 + k * 3)) % 300 + 300) % 300 - 10, y = 30 + k * 7 + Math.sin(t * 0.7 + k) * 3; e_gaviota(R, x, y, t, k); }
  for (let p = 0; p < 5; p++) { const u = (t * 0.25 + p / 5) % 1; const x = 243 + u * 14 + Math.sin(t + p) * 1.5, y = 50 - u * 13; R.recorte([206, 19, 269, 78]); disco(x, y, 1 + u * 2.2, e_mezcla(P.nube, P.nubeS, u)); R.recorte(null); }
  // los brillos de la bahía y el velero que cruza (recortados a los paños)
  for (let k = 0; k < 26; k++) { const x = Math.floor(h(k, 1, 530) * 270), y = 69 + Math.floor(h(k, 2, 530) * 9); if (Math.sin(t * 3 + k * 1.7) > 0.6 && x % 68 > 3) { pset(x, y, P.bahiaL); pset(x + 1, y, C.blanco); } }
  { const vx = ((t * 6) % 340) - 30; for (const pano of e_PANOS) { R.recorte(pano); linea(Math.round(vx), 75, Math.round(vx + 9), 75, C.blanco); linea(Math.round(vx + 1), 76, Math.round(vx + 8), 76, hex('#c8c8d0'));
    R.poligono([[vx + 4, 74], [vx + 4, 65], [vx + 9, 74]], C.blanco); R.poligono([[vx + 3, 74], [vx + 3, 67], [vx, 74]], hex('#e8e0d0')); linea(Math.round(vx + 4), 64, Math.round(vx + 4), 74, C.k);
    for (let i = 1; i < 6; i++) if ((i + Math.floor(t * 4)) % 2) pset(Math.round(vx - i * 2), 77, P.bahiaL); } R.recorte(null); }
  // las palmeras de la orilla, que se mecen, recortadas al cristal
  for (const pano of e_PANOS) { R.recorte(pano); for (const [x, y, a, k] of e_PALMAS) e_palmera(R, x, y, a, t, k); } R.recorte(null);
  // el plafón que parpadea de vez en cuando
  if ((t % 9) > 8.2 && Math.floor(t * 14) % 2) rect(237, 1, 269, 3, P.luzS);
  // la tele: el radar del tiempo con el remolino que gira y, a ratos, el telediario con un caimán y la cinta que corre
  rect(140, 84, 180, 100, C.k); rect(141, 85, 179, 99, P.tele);
  if (Math.floor(t / 5) % 2 === 0) {
    for (let y = 86; y <= 98; y++) for (let x = 142; x <= 178; x++) pset(x, y, h(x >> 1, y >> 1, 540) < 0.5 ? hex('#1e4a7a') : hex('#24548a'));
    R.poligono([[150, 87], [160, 89], [165, 94], [170, 98], [164, 98], [158, 93], [151, 92]], hex('#4a8a4a'));   // la península
    const a0 = t * 2.4; for (let k = 0; k < 3; k++) for (let r = 1; r < 6; r += 0.4) { const a = a0 + k * 2.09 + r * 0.7, x = Math.round(172 + Math.cos(a) * r), y = Math.round(91 + Math.sin(a) * r * 0.8); pset(x, y, r < 3 ? C.blanco : hex('#d8e4f0')); }
    pset(172, 91, P.rojo); e_cifras(R, 3, 144, 87, C.blanco);
  } else {
    rect(142, 86, 178, 98, hex('#2a4a8a')); rect(142, 86, 178, 88, hex('#1e3870'));
    e_fotoCaiman(R, 159, 88, 17, 7, Math.floor(t)); rect(144, 89, 155, 98, hex('#3a5a9a')); disco(149, 91.5, 2.2, P.piel); rect(147, 89, 151, 89, hex('#3a2418')); rect(145, 94, 153, 97, hex('#c83a5a'));
    rect(142, 96, 178, 98, P.rojo); R.recorte([143, 97, 177, 97]); for (let k = 0; k < 6; k++) { const x = Math.round(((k * 9 - t * 14) % 54 + 54) % 54) + 136; linea(x, 97, x + 5, 97, C.blanco); } R.recorte(null);
    if (Math.floor(t * 2) % 2) pset(176, 87, P.rojo);
  }
  rect(141, 85, 152, 85, hex('#3a3e4a')); rect(158, 101, 162, 101, C.k);
  // el compañero que pasa por el pasillo de detrás con un café (por detrás de los monitores y de los tabiques)
  { const u = (t % 18) / 18, x = u < 0.5 ? 70 + u * 2 * 150 : 220 - (u - 0.5) * 2 * 150, dir = u < 0.5 ? 1 : -1; R.recorte([0, 84, 275, 108]); e_gente(R, x, 112, t, 5, { anda: true, dir, taza: true }); R.recorte(null); }
  // la fuente de agua: el garrafón con su nivel y la burbuja que sube cada pocos segundos
  rect(228, 87, 238, 98, C.k); rect(229, 88, 237, 97, hex('#9ad0ec')); rect(229, 88, 237, 90, hex('#c8e8f8')); rect(230, 91, 230, 96, C.blanco);
  { const u = (t % 4) / 1.2; if (u < 1) disco(233 + Math.sin(u * 9), 96 - u * 7, 1.2, C.blanco); }
  e_reloj(R, 298, 64, 7, t, P.maderaD);
  // los redactores pequeños detrás de los tabiques (asoman la cabeza y los hombros) y sus monitores, que cambian
  const monitor = (x, k) => { rect(x, 100, x + 15, 109, C.k); rect(x + 1, 101, x + 14, 108, P.pantalla);
    if (k % 3 === 2) e_fotoCaiman(R, x + 2, 102, 7, 5, k); for (let j = 0; j < 3; j++) { const yy = 102 + j * 2; rect(x + (k % 3 === 2 ? 10 : 2), yy, x + (k % 3 === 2 ? 10 : 2) + 2 + Math.floor(h(j, Math.floor(t * 0.8 + k), 541) * (k % 3 === 2 ? 3 : 10)), yy, j === 0 ? C.blanco : P.pantallaL); } };
  const asoma = (x, k, dy, o2 = {}) => { R.recorte([0, 0, 319, 109]); e_gente(R, x, 114 + dy, t, k, o2); R.recorte(null); };
  // A teclea (se balancea), B habla por teléfono, C se levanta a estirarse, D mira la pantalla y bebe
  asoma(22, 1, Math.floor(t * 5) % 2); monitor(28, 0); 
  { const x = 96, bob = Math.floor(t * 0.9) % 2; asoma(x, 2, bob); rect(x + 3, 103 + bob, x + 4, 107 + bob, C.k); monitor(104, 2); }
  { const u = (t % 12), sube = u > 7 && u < 10 ? Math.min(1, (u - 7) * 3, (10 - u) * 3) : 0; asoma(132, 3, -Math.round(sube * 6), { brazos: sube > 0.8 }); monitor(112 + 26, 4); }
  { asoma(268, 6, Math.sin(t * 0.5) > 0.7 ? 1 : 0, { dir: -1 }); monitor(248, 5); }
  // el ventilador de mesa que gira sobre el tabique
  { const x = 72; rect(x - 1, 102, x + 1, 108, C.k); disco(x, 101, 4, C.k); disco(x, 101, 3, P.metalL); for (let k = 0; k < 3; k++) { const a = t * 14 + k * 2.09; linea(x, 101, Math.round(x + Math.cos(a) * 3), Math.round(101 + Math.sin(a) * 3), P.metalS); } pset(x, 101, C.k); }
  // la impresora: la pantallita cuenta las hojas, la luz verde parpadea y la hoja que asoma por la bandeja
  { const n = 100 + Math.floor(t * 1.8); R.recorte([87, 136, 93, 139]); e_cifras(R, n % 100, 87, 136 - 1, P.lcd); R.recorte(null); pset(91, 142, Math.floor(t * 4) % 2 ? P.verde : P.verdeS); pset(88, 142, P.rojoS); }
  if ((o.imprime ?? 1) > 0) { const u = (t % 0.55) / 0.55; rect(58, 135 - Math.round(u * 2), 82, 136, P.papel); rect(60, 135 - Math.round(u * 2), 76, 135 - Math.round(u * 2), P.tinta); }
}

// la mesa del periodista, el montón de hojas del suelo, las hojas que caen y el ficus de delante
function e_redGeneralDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P, pp = Math.max(0, Math.min(1, o.papeles ?? 0));
  e_montonHojas(R, 66, 172, 76, 11, 3 + 26 * pp, Math.round(4 + pp * 80), 84, 10, 13, 0.4, 600);
  // las hojas que salen de la bandeja, suben, se dan la vuelta y caen hacia la izquierda sobre el montón
  if ((o.imprime ?? 1) > 0) for (let i = 0; i < 4; i++) {
    const per = 0.55, n = Math.floor(t / per) - i, u = (t - n * per) / 2.0; if (u < 0 || u > 1) continue;
    const lx = 30 + h(n, 1, 610) * 50, ly = 166 - pp * 18 + h(n, 2, 610) * 6;
    const x = lerp(70, lx, u) + Math.sin(u * 9 + n) * 5 * u, y = u < 0.25 ? 134 - u * 40 : lerp(124, ly, (u - 0.25) / 0.75) + Math.sin(u * 12) * 2;
    e_hoja(R, x, y, 10, 13, Math.sin(u * 10 + n) * 0.6, Math.cos(u * 8 + n) * (1 - u * 0.5), n);
  }
  // la mesa: el tablero con su canto, el faldón de madera con vetas, las patas; encima, el monitor de lado con el
  // titular y la foto del caimán, el teclado, el teléfono que parpadea, la taza con vapor, los periódicos y el flexo
  rect(122, 149, 187, 153, C.k); rect(123, 150, 186, 152, P.maderaL); rect(123, 150, 186, 150, hex('#e0b48a')); rect(123, 152, 186, 152, P.madera);
  rect(125, 153, 184, 162, C.k); rect(126, 154, 183, 162, P.madera); for (let y = 155; y < 162; y++) for (let x = 126; x < 184; x++) if (h(x >> 2, y, 620) < 0.3) pset(x, y, P.maderaV);
  rect(126, 154, 183, 154, P.maderaS); rect(124, 153, 126, 165, C.k); rect(183, 153, 185, 165, C.k); rect(125, 154, 125, 164, P.metalL); rect(184, 154, 184, 164, P.metalL);
  rect(122, 165, 188, 166, hex('#3c4250'));
  // el monitor (de lado, a la derecha, para que quien está detrás de la mesa no quede tapado)
  rect(164, 129, 186, 146, C.k); rect(165, 130, 185, 145, P.pantalla); rect(166, 131, 184, 144, hex('#e8eef6')); rect(167, 132, 183, 134, P.tinta); rect(167, 136, 178, 136, P.tinta);
  e_fotoCaiman(R, 167, 138, 8, 5, Math.floor(t / 2)); for (let j = 0; j < 3; j++) rect(177, 138 + j * 2, 177 + 3 + ((j + Math.floor(t)) % 4), 138 + j * 2, P.texto);
  rect(173, 146, 177, 149, C.k); rect(170, 148, 180, 149, C.k);
  // el teclado y el ratón, el teléfono con su luz, la taza con vapor, los periódicos y el flexo
  rect(142, 147, 160, 149, C.k); rect(143, 147, 159, 148, hex('#4a4e58')); for (let x = 144; x < 159; x += 2) pset(x, 147, hex('#7a7e88'));
  rect(127, 144, 139, 149, C.k); rect(128, 145, 138, 148, hex('#2a2430')); rect(127, 143, 139, 144, C.k); rect(128, 143, 138, 143, hex('#4a4450')); pset(136, 146, Math.floor(t * 2.5) % 2 ? P.rojo : P.rojoS); for (let i = 0; i < 3; i++) pset(130 + i * 2, 147, hex('#8a8494'));
  rect(160, 143, 164, 149, C.k); rect(161, 144, 163, 148, C.blanco); rect(161, 144, 163, 144, hex('#6a3a1a')); pset(164, 145, C.k);
  for (let p = 0; p < 3; p++) { const u = (t * 0.6 + p / 3) % 1; pset(Math.round(162 + Math.sin(u * 7 + p) * 1.5), Math.round(141 - u * 9), e_mezcla(C.blanco, P.paredS, u)); }
  // el flexo de la mesa, con su luz cálida sobre el tablero
  linea(186, 148, 190, 136, C.k); linea(187, 148, 191, 136, P.metalS); linea(190, 136, 182, 130, C.k); poligono([[178, 128], [185, 127], [184, 133], [179, 133]], C.k); poligono([[179, 129], [184, 128], [183, 132], [180, 132]], hex('#3a8a6a'));
  for (let x = 172; x < 186; x += 2) pset(x, 150, hex('#f8e0b0'));
  // el ficus en primer término, a la derecha
  e_ficus(R, 302, 180, 66, t);
}

// un montón de hojas tumbadas en el suelo: centro (cx, cy), radios máximos rx × ry, altura máxima del montículo alto;
// se ven n de las nMax hojas (w × hh px, aplastadas sq). Cada hoja tiene su sitio fijo en una espiral desde el centro, así
// que si n y alto crecen con o.papeles, las de antes no se mueven: solo aparecen hojas por fuera y el montículo sube
function e_montonHojas(R, cx, cy, rx, ry, alto, n, nMax, w, hh, sq, k0) {
  const L = [], nn = Math.min(n, nMax);
  for (let k = 0; k < nn; k++) { const a = k * 2.39996 + h(k, 1, k0) * 0.6, r = Math.sqrt((k + 0.5) / nMax) * (0.92 + 0.08 * h(k, 2, k0)), dx = Math.cos(a) * r * rx, dy = Math.sin(a) * r * ry;
    const lift = alto * (1 - r * r) ** 2 * (0.75 + 0.25 * h(k, 3, k0)); L.push([cx + dx, Math.min(179, cy + dy) - lift, cy + dy, (h(k, 4, k0) - 0.5) * 2.4, k]); }
  L.sort((a, b) => a[1] - b[1] || a[4] - b[4]);
  // la sombra del montón en el suelo
  const sr = Math.sqrt(nn / nMax), sx = rx * sr + 4, sy = ry * sr + 2;
  for (let y = Math.round(cy - sy); y <= Math.min(179, cy + sy); y++) for (let x = Math.round(cx - sx); x <= cx + sx; x++) { const d = ((x - cx) / sx) ** 2 + ((y - cy - 1) / sy) ** 2; if (d < 1 && (x + y) % 2 === 0) R.pset(x, y, e_mezcla(R.pget(x, y), hex('#20242c'), 0.35)); }
  const yMin = cy - ry - alto, yMax = cy + ry;
  for (const [x, y, , a, k] of L) e_hoja(R, x, y, w, hh, a, sq * (0.8 + 0.4 * h(k, 5, k0)), k, 0.45 - 0.35 * Math.max(0, Math.min(1, (y - yMin) / Math.max(1, yMax - yMin))));
}

function e_redImpresoraFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P;
  // la pared clara con su ruido, la moldura y el zócalo de paneles
  e_textura(R, 0, 0, 319, 104, P.pared, P.paredS, P.paredL, 550, 0.06);
  rect(0, 104, 319, 107, P.maderaS); rect(0, 104, 319, 104, P.maderaL); rect(0, 106, 319, 106, P.madera);
  e_textura(R, 0, 108, 319, 146, hex('#c4b8a0'), hex('#b6aa92'), hex('#cec4ae'), 551, 0.06);
  for (let x = 6; x < 320; x += 34) { rect(x, 111, x + 28, 143, hex('#b6aa92')); rect(x + 1, 112, x + 27, 142, hex('#c8bca6')); rect(x + 1, 112, x + 27, 112, hex('#d6ccb8')); }
  rect(0, 144, 319, 146, P.maderaD);
  // la ventana: el cielo, el hotel art déco menta de enfrente con balcones y su torreta, el marco blanco y el estor
  e_degradado(R, 190, 18, 266, 84, e_CIELO);
  { const c = C.pastelMenta, cS = e_mezcla(c, hex('#3a5a5a'), 0.3), cL = e_mezcla(c, C.blanco, 0.5);
    rect(196, 44, 266, 84, c); rect(212, 34, 236, 44, c); rect(220, 26, 228, 34, c); rect(223, 21, 225, 26, cS); rect(196, 44, 266, 44, cL); rect(212, 34, 236, 34, cL); rect(220, 26, 228, 26, cL);
    rect(230, 34, 236, 44, cS); for (let x = 205; x < 266; x += 15) rect(x, 46, x + 1, 84, cL);
    for (let y = 50; y < 84; y += 8) { for (let x = 199; x < 264; x += 15) { rect(x, y, x + 4, y + 4, P.vidrio); rect(x, y, x + 4, y, P.vidrioS); pset(x + 1, y + 1, P.vidrioL); } rect(197, y + 6, 265, y + 6, cS); rect(197, y + 5, 265, y + 5, C.blanco); for (let x = 198; x < 266; x += 2) pset(x, y + 6, cL); }
    rect(214, 37, 234, 38, hex('#f0a0c0')); for (let x = 214; x < 235; x += 4) pset(x, 41, cS); }
  rect(186, 14, 270, 17, C.k); rect(187, 15, 269, 16, C.blanco); rect(186, 85, 270, 89, C.k); rect(187, 85, 269, 87, C.blanco); rect(187, 88, 269, 88, hex('#c8c4bc'));
  for (const x of [186, 227, 267]) { rect(x, 15, x + 3, 86, C.k); rect(x + 1, 16, x + 2, 85, C.blanco); }
  rect(190, 18, 266, 30, P.estor); for (let y = 20; y < 30; y += 2) rect(190, y, 266, y, P.estorS); rect(190, 30, 266, 31, C.k); linea(262, 31, 262, 38, P.aluS);
  for (let i = 0; i < 14; i++) { const x = 196 + i, y = 80 - i * 3; pset(x, y, e_mezcla(R.pget(x, y), C.blanco, 0.4)); pset(x + 4, y, e_mezcla(R.pget(x + 4, y), C.blanco, 0.3)); }
  // el aire acondicionado de pared bajo la ventana, con su rejilla y su piloto
  rect(196, 91, 260, 103, C.k); rect(197, 92, 259, 102, hex('#e8e6de')); rect(197, 92, 259, 92, C.blanco); for (let x = 200; x < 256; x += 3) rect(x, 95, x, 101, hex('#b8b6ae')); rect(197, 102, 259, 102, hex('#a8a69e'));
  // la portada enmarcada con el caimán, la balda del tóner con sus cajas numeradas y las resmas
  rect(36, 24, 84, 62, C.k); rect(37, 25, 83, 61, P.laton); rect(38, 26, 82, 60, P.latonS); rect(39, 27, 81, 59, P.papel);
  rect(42, 29, 78, 33, P.tinta); rect(42, 35, 66, 37, P.tinta); e_fotoCaiman(R, 42, 40, 22, 15, 2); for (let y = 40; y < 56; y += 2) rect(66, y, 66 + 6 + Math.floor(h(y, 1, 552) * 6), y, P.texto); pset(37, 25, P.latonL);
  rect(98, 56, 172, 58, P.maderaD); rect(98, 56, 172, 56, P.maderaL); for (const x of [104, 166]) rect(x, 59, x + 1, 62, P.maderaD);
  for (const [x, n] of [[100, 1], [114, 2], [128, 3]]) { rect(x, 44, x + 12, 55, C.k); rect(x + 1, 45, x + 11, 55, hex('#2a5ab8')); rect(x + 1, 45, x + 11, 46, hex('#4a7ad8')); rect(x + 3, 48, x + 9, 53, C.blanco); e_cifras(R, n, x + 5, 48, hex('#2a5ab8')); }
  for (let j = 0; j < 4; j++) { rect(144, 51 - j * 3, 168, 53 - j * 3, C.k); rect(145, 51 - j * 3, 167, 52 - j * 3, P.papel); rect(145, 52 - j * 3, 167, 52 - j * 3, hex('#5a8ac8')); }
  // el tablón de la derecha con hojas de titulares (por debajo de Atom)
  rect(280, 52, 316, 92, P.maderaD); rect(281, 53, 315, 91, P.corcho); for (let k = 0; k < 50; k++) pset(281 + Math.floor(h(k, 1, 553) * 34), 53 + Math.floor(h(k, 2, 553) * 38), k % 3 ? P.corchoS : P.corchoL);
  [[290, 64, -0.06], [306, 66, 0.08], [298, 82, 0.04]].forEach(([x, y, a], k) => { e_hoja(R, x, y, 11, 14, a, 1, k + 7); pset(x, y - 7, P.rojo); });
  // la moqueta con sus juntas en perspectiva y la sombra de la pared
  for (let y = 147; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 554); pset(x, y, v < 0.14 ? P.moquetaS : v > 0.92 ? P.moquetaL : P.moqueta); }
  for (const y of [150, 155, 162, 171]) rect(0, y, 319, y, P.moquetaJ); for (let k = -12; k < 14; k++) linea(240 + k * 16, 147, 240 + k * 46, 180, P.moquetaJ);
  rect(0, 147, 319, 148, hex('#444b5a'));
  // el archivador bajo con su planta encima y la papelera que rebosa de titulares
  rect(282, 118, 318, 152, C.k); rect(283, 119, 317, 151, P.metal); rect(283, 119, 317, 119, P.metalL); rect(283, 135, 317, 135, P.metalS);
  for (const y of [126, 142]) { rect(294, y, 306, y + 2, P.metalD); rect(295, y, 305, y, P.metalL); rect(297, y - 5, 303, y - 3, P.laton); }
  rect(188, 134, 204, 152, C.k); rect(189, 135, 203, 151, hex('#3a6a9a')); for (let x = 191; x < 203; x += 3) rect(x, 137, x, 150, hex('#5a8aba'));
  [[192, 132, -0.4], [199, 131, 0.5], [195, 128, 0.1]].forEach(([x, y, a], k) => e_hoja(R, x, y, 9, 11, a, 0.8, k + 11));
  // la impresora grande: el lateral en sombra, el cuerpo, el alimentador con originales y la tapa
  poligono([[172, 74], [180, 78], [180, 176], [172, 178]], C.k); poligono([[173, 76], [179, 79], [179, 175], [173, 176]], P.impS);
  rect(22, 80, 172, 178, C.k); rect(23, 81, 171, 177, P.imp); rect(23, 81, 26, 177, P.impS); rect(168, 81, 171, 177, P.impL);
  rect(28, 70, 150, 81, C.k); rect(29, 71, 149, 80, P.impL); rect(29, 78, 149, 80, P.impS); rect(30, 72, 148, 72, C.blanco);
  for (let j = 0; j < 4; j++) { rect(40 + j, 66 - j, 104 + j, 70 - j, C.k); rect(41 + j, 67 - j, 103 + j, 69 - j, j % 2 ? P.papel : hex('#ecebe2')); }
  rect(36, 64, 38, 71, P.impD); rect(108, 61, 110, 71, P.impD);
  // el panel de mandos: la pantalla (las cifras las pinta cada fotograma), las luces, el teclado y el botón verde
  poligono([[128, 73], [174, 73], [176, 94], [126, 94]], C.k); poligono([[129, 74], [173, 74], [175, 93], [127, 93]], hex('#4a4c56')); rect(129, 74, 173, 74, hex('#6a6c76'));
  rect(134, 77, 158, 87, C.k); rect(135, 78, 157, 86, P.lcdS);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { rect(161 + i * 4, 79 + j * 4, 163 + i * 4, 81 + j * 4, hex('#2a2c34')); pset(161 + i * 4, 79 + j * 4, hex('#9a9ca6')); }
  disco(146, 90, 2.5, C.k); disco(146, 90, 2, P.verde); pset(145, 89, hex('#a8f0b8'));
  // la rejilla de ventilación, la franja de color de la casa (sin letras), la pegatina de aviso y la nota con un caimán
  for (let y = 88; y < 106; y += 2) { rect(34, y, 84, y, P.impD); rect(34, y + 1, 84, y + 1, P.impL); }
  rect(94, 98, 150, 99, hex('#2aa0a0')); rect(94, 100, 150, 100, hex('#e8a03a'));
  poligono([[154, 108], [160, 98], [166, 108]], C.k); poligono([[156, 107], [160, 100], [164, 107]], hex('#f0d040')); rect(160, 102, 160, 104, C.k); pset(160, 106, C.k);
  rect(40, 110, 52, 121, hex('#e8c840')); rect(40, 110, 52, 111, hex('#f8e070')); for (let i = 0; i < 9; i++) pset(42 + i, 117 - (i % 3 === 1 ? 1 : 0), P.caiman); pset(48, 115, P.caiman); pset(49, 115, P.ojo); rect(43, 119, 50, 119, hex('#b89a30'));
  // la ranura de salida con su labio (los rodillos los pinta cada fotograma)
  rect(92, 109, 150, 117, C.k); rect(94, 110, 148, 115, P.ranura); rect(90, 117, 152, 119, P.impD); rect(90, 117, 152, 117, P.impL);
  // las tres bandejas de papel: la junta, el tirador hundido, el número y el indicador de nivel
  [[122, 1], [140, 2], [158, 3]].forEach(([y, n]) => { rect(26, y, 168, y, P.impD); rect(26, y + 1, 168, y + 1, P.impL);
    rect(80, y + 6, 116, y + 10, C.k); rect(81, y + 7, 115, y + 9, P.ranura); rect(81, y + 7, 115, y + 7, hex('#4a4a52'));
    rect(32, y + 4, 40, y + 12, C.k); rect(33, y + 5, 39, y + 11, C.blanco); e_cifras(R, n, 35, y + 6, C.k);
    for (let i = 0; i < 4; i++) rect(150 + i * 4, y + 6, 152 + i * 4, y + 12, i < 4 - n + 1 ? hex('#5aa86a') : P.impS); });
  rect(24, 172, 170, 177, hex('#4a4a50')); for (const x of [34, 160]) { disco(x, 178, 2.5, C.k); disco(x, 178, 1.5, P.metalS); }
  // la sombra de la impresora en la moqueta
  for (let y = 176; y < 180; y++) for (let x = 182; x < 196 - (y - 176) * 2; x++) if ((x + y) % 2 === 0) pset(x, y, e_mezcla(R.pget(x, y), hex('#20242c'), 0.4));
  // la taza encima de la tapa
  rect(112, 62, 120, 71, C.k); rect(113, 63, 119, 70, P.rojo); rect(113, 63, 119, 63, hex('#6a3a1a')); rect(114, 64, 114, 69, hex('#f07070')); rect(120, 65, 122, 68, C.k); pset(121, 66, P.rojo);
}

function e_redImpresora(R, t, o) {
  const { rect, pset, linea, disco } = R, P = e_P;
  e_fijo(R, 'e-red-i', () => e_redImpresoraFijo(R));
  // fuera: nubes a dos velocidades y una gaviota; la palmera que se mece delante del hotel; el neón rosa que late
  [[200, 24, 22, 2.4], [250, 30, 16, 4.2]].forEach(([x0, y, w, v], k) => e_nube(R, ((x0 + t * v - 186) % 120 + 120) % 120 + 168, y, w, 560 + k));
  e_gaviota(R, ((300 - t * 11) % 110 + 110) % 110 + 180, 36 + Math.sin(t) * 2, t, 4);
  R.recorte([190, 18, 266, 84]); if (Math.sin(t * 2.2) > -0.3) for (let i = 0; i < 18; i++) pset(214 + i, 39 + Math.round(Math.sin(i * 0.7) * 1.5), hex('#ff6ab8'));
  e_palmera(R, 252, 92, 50, t, 5, 1.4); R.recorte(null);
  rect(186, 85, 270, 87, C.k); rect(187, 85, 269, 86, C.blanco);
  for (const x of [227]) { rect(x, 15, x + 3, 86, C.k); rect(x + 1, 16, x + 2, 85, C.blanco); }
  // las cintas del aire acondicionado, que ondean
  for (let k = 0; k < 4; k++) { const x0 = 206 + k * 14; for (let j = 0; j < 9; j++) { const x = Math.round(x0 + Math.sin(t * 7 + j * 0.8 + k) * (j / 3)); pset(x, 104 + j, k % 2 ? hex('#4ac8e8') : hex('#e85aa8')); } }
  pset(256, 94, Math.floor(t * 1.5) % 2 ? P.verde : P.verdeS);
  // el reloj de la pared
  e_reloj(R, 92, 32, 8, t, P.maderaD);
  // la planta del archivador
  e_ficus(R, 300, 118, 26, t, 3);
  // la pantalla del panel: las hojas que lleva (cifras que suben) y las luces
  { const n = 1980 + Math.floor(t * 1.8); e_cifras(R, n, 137, 79, P.lcd); rect(137, 85, 137 + Math.floor((t * 1.8 % 1) * 18), 85, P.lcd); }
  pset(166, 76, Math.floor(t * 3) % 2 ? hex('#5af07a') : P.verdeS); pset(170, 76, Math.floor(t * 0.7) % 2 ? hex('#f0a030') : hex('#6a4a1a'));
  // el calor de la rejilla, que tiembla
  for (let k = 0; k < 10; k++) { const x = 38 + k * 5, u = (t * 0.9 + h(k, 1, 561)) % 1; const y = 86 - u * 16; if (y > 72 || x > 104) pset(Math.round(x + Math.sin(t * 5 + k) * 1.2), Math.round(y), e_mezcla(R.pget(x, y), C.blanco, 0.35)); }
  // los rodillos de la ranura, que giran mientras imprime
  if ((o.imprime ?? 1) > 0) for (let x = 95; x < 148; x += 3) { const f = (x + Math.floor(t * 12)) % 3; pset(x, 112, f ? hex('#5a5a62') : hex('#9a9aa2')); pset(x + 1, 113, f ? hex('#3a3a42') : hex('#7a7a82')); }
  // el vapor de la taza
  for (let p = 0; p < 4; p++) { const u = (t * 0.5 + p / 4) % 1; pset(Math.round(116 + Math.sin(u * 7 + p) * 2), Math.round(60 - u * 14), e_mezcla(C.blanco, P.pared, u)); }
}

function e_redImpresoraDelante(R, t, o) {
  const pp = Math.max(0, Math.min(1, o.papeles ?? 0));
  // el montón (de unas hojas a un montículo que tapa las dos bandejas de abajo)
  e_montonHojas(R, 104, 174, 84, 7, 4 + 36 * pp, Math.round(5 + pp * 64), 69, 20, 26, 0.34, 640);
  if ((o.imprime ?? 1) <= 0) return;
  // la hoja que sale colgando de la ranura y, al soltarse, cae revoloteando al montón
  const per = 1.1;
  for (let i = 0; i < 3; i++) {
    const n = Math.floor(t / per) - i, u = (t - n * per) / per;
    if (i === 0) { const L = Math.round(Math.min(1, u * 1.6) * 26); if (L > 1) { R.recorte([0, 117, 319, 179]); e_hoja(R, 120, 117 - 13 + L, 22, 26, 0, 1, n); R.recorte(null); } continue; }
    const v = (t - (n + 1) * per) / 1.6; if (v < 0 || v > 1) continue;
    const lx = 70 + h(n, 1, 650) * 80, ly = 172 - pp * 30 + h(n, 2, 650) * 4;
    const x = lerp(120, lx, v) + Math.sin(v * 7 + n) * 10 * (1 - v), y = lerp(130, ly, v * v * 0.6 + v * 0.4);
    e_hoja(R, x, y, 22, 26, Math.sin(v * 6 + n) * 0.5, Math.cos(v * 7) * (1 - v * 0.62), n);
  }
}

function e_archGeneralFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P;
  // el techo de placas (tranquilo bajo el año) y la moldura
  e_textura(R, 0, 0, 319, 13, P.techo, P.techoS, P.techoS, 570, 0.1); for (let x = 14; x < 320; x += 30) rect(x, 0, x, 12, P.techoJ); rect(0, 6, 319, 6, P.techoJ);
  rect(0, 13, 319, 15, P.paredJ); rect(0, 13, 319, 13, P.techoJ);
  // la pared verde oficina, con su pintura moteada, y el zócalo de madera con vetas y molduras
  e_textura(R, 0, 16, 319, 95, P.verdeP, P.verdePS, P.verdePL, 571, 0.08, 2);
  rect(0, 95, 319, 97, P.zocaloL); rect(0, 95, 319, 95, hex('#a87a54')); rect(0, 97, 319, 97, P.zocaloS);
  for (let y = 98; y <= 128; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y * 3, 572); pset(x, y, x % 22 === 0 ? P.zocaloS : v < 0.25 ? P.zocaloS : v > 0.85 ? P.zocaloL : P.zocalo); }
  for (let x = 2; x < 320; x += 22) { rect(x + 2, 101, x + 18, 125, P.zocaloS); rect(x + 3, 102, x + 18, 102, P.zocaloL); rect(x + 3, 102, x + 3, 125, P.zocaloL); }
  rect(0, 126, 319, 128, P.maderaD);
  // la ventana alta con la persiana: el cielo y una palmera detrás, las lamas medio abiertas y el marco
  rect(4, 24, 40, 92, C.k); e_degradado(R, 6, 26, 38, 90, e_CIELO); rect(6, 74, 38, 90, hex('#7ab06a'));
  rect(4, 90, 42, 93, hex('#e8e4da')); rect(4, 93, 42, 93, hex('#a8a49a'));
  // el letrero de turno (cifras rojas; las pinta cada fotograma) y el reloj
  rect(234, 22, 272, 38, C.k); rect(235, 23, 271, 37, hex('#2a2a30')); rect(236, 24, 270, 36, hex('#14141a'));
  // la placa de madera con el «119» de latón, sus tornillos y su sombra
  rect(150, 26, 226, 64, hex('#2a1a10')); rect(148, 24, 224, 62, P.placa); rect(149, 25, 223, 61, P.placaL); rect(150, 26, 222, 60, P.placa);
  for (let y = 27; y < 60; y += 2) for (let x = 151; x < 222; x++) if (h(x >> 3, y, 573) < 0.3) pset(x, y, hex('#3e2616'));
  for (const [x, y] of [[152, 28], [220, 28], [152, 58], [220, 58]]) { pset(x, y, P.latonL); pset(x + 1, y + 1, P.latonS); }
  e_cifraGrande(R, 1, 157, 29, 4, hex('#24140a')); e_cifraGrande(R, 1, 179, 29, 4, hex('#24140a')); e_cifraGrande(R, 9, 201, 29, 4, hex('#24140a'));
  // el tablón de avisos (barras, sin letras) y la foto antigua de un caimán en su marco
  rect(54, 30, 96, 58, P.maderaD); rect(55, 31, 95, 57, P.corcho); for (let k = 0; k < 40; k++) pset(55 + Math.floor(h(k, 1, 574) * 40), 31 + Math.floor(h(k, 2, 574) * 26), P.corchoS);
  for (const [x, y, w, hh, c] of [[58, 34, 12, 14, '#f4f2ea'], [73, 33, 10, 12, '#f0e090'], [86, 35, 7, 10, '#a8d0f0'], [60, 49, 14, 6, '#f4f2ea'], [78, 47, 12, 9, '#f8c8d0']]) {
    rect(x, y, x + w, y + hh, hex(c)); for (let j = y + 2; j < y + hh - 1; j += 2) rect(x + 1, j, x + w - 2 - ((j * 7) % 4), j, hex('#9a9aa2')); pset(x + (w >> 1), y, P.rojo); }
  rect(104, 60, 128, 78, C.k); rect(105, 61, 127, 77, hex('#7a5a3a')); for (let j = 0; j < 14; j++) for (let i = 0; i < 20; i++) { const c = e_texFoto((i + 0.5) / 20, (j + 0.5) / 14, 1); pset(106 + i, 62 + j, e_mezcla(c, hex('#c8a46a'), 0.55)); }
  // la ventanilla de cristal del fondo, con su marco, el rótulo de rayas y la repisa
  rect(56, 64, 96, 102, P.zocaloS); rect(58, 66, 94, 98, hex('#9ab8b0')); rect(58, 66, 94, 69, hex('#3a3e48')); for (let x = 62; x < 92; x += 6) rect(x, 67, x + 3, 67, hex('#c8ccd4'));
  rect(56, 98, 96, 101, P.zocaloL); rect(56, 98, 96, 98, hex('#a87a54')); rect(70, 94, 82, 98, hex('#2a3a3a'));
  // la fuente de agua de pared
  rect(134, 104, 148, 114, C.k); rect(135, 105, 147, 113, hex('#c8ccd0')); rect(136, 105, 146, 106, hex('#e8ecf0')); rect(140, 114, 142, 126, hex('#8a8e94')); pset(141, 107, hex('#3a6ac8'));
  // detrás del mostrador: los archivadores metálicos con sus cajones, tiradores y etiquetas, y la estantería de cajas
  for (let c = 0; c < 2; c++) { const x0 = 234 + c * 22; rect(x0, 62, x0 + 20, 128, C.k); rect(x0 + 1, 63, x0 + 19, 127, P.archi); rect(x0 + 1, 63, x0 + 19, 63, P.archiL); rect(x0 + 19, 63, x0 + 19, 127, P.archiS);
    for (let d = 0; d < 4; d++) { const y = 65 + d * 16; rect(x0 + 2, y, x0 + 18, y + 14, P.archiS); rect(x0 + 3, y + 1, x0 + 17, y + 13, P.archi); rect(x0 + 3, y + 1, x0 + 17, y + 1, P.archiL);
      rect(x0 + 7, y + 4, x0 + 13, y + 6, P.laton); rect(x0 + 8, y + 5, x0 + 12, y + 5, C.blanco); rect(x0 + 7, y + 9, x0 + 13, y + 10, P.archiD); rect(x0 + 8, y + 9, x0 + 12, y + 9, P.metalL); } }
  rect(278, 48, 319, 128, P.maderaD); for (const y of [48, 68, 88, 108]) rect(279, y, 319, y + 1, P.madera);
  for (const [y0, y1] of [[50, 67], [70, 87], [90, 107], [110, 127]]) for (let x = 280; x < 318; x += 13) { rect(x, y0 + 4, x + 11, y1, C.k); rect(x + 1, y0 + 5, x + 10, y1, P.caja); rect(x + 1, y0 + 5, x + 10, y0 + 6, hex('#e8d8b0')); rect(x + 10, y0 + 5, x + 10, y1, P.cajaS);
    rect(x + 3, y0 + 9, x + 8, y0 + 13, C.blanco); e_cifras(R, Math.floor(h(x, y0, 578) * 10), x + 4, y0 + 9, C.k); rect(x + 4, y1 - 3, x + 7, y1 - 2, P.cajaS); }
  // el suelo de terrazo: la masa clara con sus chinas de colores, las juntas de latón en perspectiva y el brillo
  const CH = [hex('#a8a090'), hex('#7a8a7a'), hex('#c89a7a'), hex('#8a9ab0'), hex('#f4f0e6')];
  for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 575); pset(x, y, v < 0.16 ? CH[Math.floor(h(x, y, 576) * 5)] : v > 0.95 ? P.terrazoL : P.terrazo); }
  for (const y of [133, 139, 147, 157, 170]) rect(0, y, 319, y, P.latonS); for (let k = -10; k < 14; k++) linea(160 + k * 16, 129, 160 + k * 50, 180, P.latonS);
  rect(0, 129, 319, 130, hex('#a89e88'));
  // el reflejo del mostrador y de la ventana en el terrazo pulido
  for (let y = 158; y < 176; y++) for (let x = 140; x < 232; x++) if ((x + y) % 3 === 0 && h(x, y, 577) < 0.6) pset(x, y, e_mezcla(R.pget(x, y), P.zocalo, 0.25));
  // los postes de la fila con su cordón
  for (const x of [22, 60, 98]) { rect(x - 1, 112, x + 1, 128, C.k); rect(x, 113, x, 127, P.latonL); disco(x, 111, 2, P.laton); rect(x - 3, 128, x + 3, 129, P.latonS); }
  for (const [a, b] of [[22, 60], [60, 98]]) for (let x = a + 1; x < b; x++) { const u = (x - a) / (b - a), y = Math.round(114 + Math.sin(u * Math.PI) * 4); pset(x, y, P.cordon); pset(x, y + 1, hex('#6a1a24')); }
  // el cartel plegable de suelo mojado (un pictograma: la persona que resbala, sin letras)
  { const X = 108, Y = 146; R.poligono([[X - 4, Y], [X, Y - 18], [X + 4, Y - 18], [X + 8, Y]], C.k); R.poligono([[X - 3, Y - 1], [X + 0.5, Y - 17], [X + 3.5, Y - 17], [X + 7, Y - 1]], hex('#f0c830'));
    rect(X + 1, Y - 15, X + 2, Y - 14, C.k); linea(X + 2, Y - 13, X, Y - 8, C.k); linea(X, Y - 8, X + 4, Y - 5, C.k); linea(X + 1, Y - 11, X + 4, Y - 12, C.k); linea(X, Y - 8, X - 2, Y - 5, C.k); rect(X - 3, Y - 3, X + 7, Y - 3, hex('#c89a20')); }
  // la alfombra de la entrada, granate con su cenefa, que lleva al mostrador
  for (let y = 165; y <= 179; y++) for (let x = 0; x < 128 - (179 - y); x++) { const borde = y === 165 || y === 179 || x === 0 || x === 127 - (179 - y) || y === 167 || y === 177; pset(x, y, borde ? (y === 165 || y === 179 ? hex('#5a1a22') : hex('#c8a040')) : h(x, y, 579) < 0.15 ? hex('#7a2430') : (x + y * 2) % 9 === 0 ? hex('#a83a48') : hex('#8e2a36')); }

  // la palmera en maceta junto al mostrador
  rect(124, 140, 138, 156, C.k); rect(125, 141, 137, 155, hex('#c8b89a')); rect(125, 141, 137, 142, hex('#e8dcc0')); rect(134, 143, 136, 154, hex('#a8987a'));
}

function e_archGeneral(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P;
  e_fijo(R, 'e-arch-g', () => e_archGeneralFijo(R));
  // fuera de la ventana: una nube y la palmera que se mece; luego las lamas de la persiana, medio abiertas
  R.recorte([6, 26, 38, 89]); e_nube(R, ((t * 2.5) % 70) - 10, 36, 16, 580); e_palmera(R, 26, 92, 46, t, 7, 1.2); R.recorte(null);
  for (let y = 27; y < 90; y += 4) { rect(6, y, 38, y + 1, hex('#f0ece0')); rect(6, y + 1, 38, y + 1, hex('#c8c4b8')); } rect(5, 25, 39, 26, hex('#d8d4c8')); linea(36, 26, 36, 70, hex('#a8a49a'));
  // los rayos de luz que entran por la persiana hasta el suelo, con motas de polvo que flotan
  const rayo = (y) => [42 + (y - 92) * 0.95, 58 + (y - 92) * 1.6];
  for (let y = 92; y < 178; y++) { const [a, b] = rayo(y); for (let x = Math.round(a); x < b; x++) if ((x + y) % 2 === 0 && ((y - Math.round(x * 0.3)) % 6) < 4) pset(x, y, e_mezcla(R.pget(x, y), hex('#fff4d0'), y > 129 ? 0.35 : 0.2)); }
  for (let k = 0; k < 12; k++) { const u = (t * 0.05 + h(k, 1, 581)) % 1, y = 96 + u * 70, [a, b] = rayo(y), x = a + (b - a) * h(k, 2, 581) + Math.sin(t * 0.8 + k) * 2; if (Math.sin(t * 2 + k) > -0.2) pset(Math.round(x), Math.round(y), hex('#fffaf0')); }
  // el ventilador del techo, que gira
  { const cx = 240, cy = 11; rect(cx, 0, cx, 7, C.k); rect(cx - 3, 7, cx + 3, 10, C.k); rect(cx - 2, 8, cx + 2, 9, P.latonS);
    for (let k = 0; k < 4; k++) { const a = t * 5 + k * Math.PI / 2, ca = Math.cos(a); const x1 = cx + ca * 20; poligono([[cx, cy - 1], [x1, cy - 1 + Math.sin(a) * 2], [x1, cy + 1 + Math.sin(a) * 2], [cx, cy + 1]], Math.abs(ca) > 0.6 ? hex('#6a4428') : hex('#8a5a36')); }
    disco(cx, cy, 2.5, C.k); disco(cx, cy, 1.6, P.laton); }
  // el letrero de turno: el número que se atiende avanza cada 5 s (o.turno lo fija), con su punto que parpadea
  { const n = o.turno ?? (40 + Math.floor(t / 5) % 60); e_cifras(R, 88, 241, 26, P.ledS, 2); e_cifras(R, String(n).padStart(2, '0'), 241, 26, P.led, 2); if (Math.floor(t * 2) % 2) pset(266, 34, P.led); rect(237, 25, 239, 26, P.led); }
  e_reloj(R, 122, 36, 8, t, P.maderaD);
  // la salamanquesa que cruza la pared, se para y sigue
  { const u = (t % 14) / 14, x = 20 + u * 100 + (Math.sin(t * 1.5) > 0.6 ? 0 : 0), y = 70 + Math.sin(u * 6) * 6, f = Math.floor(t * 8) % 2;
    pset(Math.round(x), Math.round(y), hex('#8a9a6a')); pset(Math.round(x + 1), Math.round(y), hex('#8a9a6a')); pset(Math.round(x + 2), Math.round(y), hex('#a8b888')); pset(Math.round(x - 1), Math.round(y + (f ? 1 : 0)), hex('#6a7a4a'));
    pset(Math.round(x - 2), Math.round(y + 1), hex('#6a7a4a')); pset(Math.round(x), Math.round(y - 1 + f), hex('#6a7a4a')); pset(Math.round(x + 2), Math.round(y + 1 - f), hex('#6a7a4a')); pset(Math.round(x + 3), Math.round(y), C.k); }
  // el funcionario de la ventanilla del fondo (detrás del cristal) y la fila que espera tras el cordón
  { R.recorte([58, 70, 94, 97]); e_gente(R, 76 + Math.round(Math.sin(t * 0.6) * 3), 104, t, 7, { dir: -1 }); R.recorte(null); rect(58, 70, 94, 70, hex('#c8dcd8')); for (let i = 0; i < 10; i++) pset(84 + i, 92 - i * 2, hex('#c8e0dc')); }
  [[30, 1], [38, 4], [46, 2], [53, 3]].forEach(([x, k], i) => { const paso = (t % 10) > 8 + i * 0.3 ? 1 : 0;
    e_gente(R, x + paso, 129, t, k, { dir: 1, anda: paso > 0 });
    if (i === 1 && Math.sin(t * 9) > 0) { pset(x + 3, 120, C.blanco); pset(x + 4, 119, C.blanco); pset(x + 4, 120, C.blanco); } });
  // el empleado de detrás, que va de un archivador a otro y abre un cajón
  { const u = (t % 10) / 10, x = u < 0.4 ? 236 + u / 0.4 * 30 : u < 0.6 ? 266 : 266 - (u - 0.6) / 0.4 * 30, para = u >= 0.4 && u < 0.6;
    if (para) { rect(257, 98, 275, 110, C.k); rect(258, 99, 274, 109, P.archi); rect(258, 99, 274, 99, P.archiL); rect(263, 103, 269, 104, P.archiD); for (let i = 0; i < 4; i++) rect(259 + i * 4, 96, 261 + i * 4, 98, i % 2 ? hex('#f0e6c8') : C.blanco); }
    e_gente(R, x, 128, t, 4, { anda: !para, dir: para ? 1 : u < 0.4 ? 1 : -1 }); }
  // la palmera de la maceta, que mueve el ventilador
  for (let f = 0; f < 9; f++) { const a = -Math.PI * 0.9 + f * Math.PI * 0.8 / 8 + Math.sin(t * 3 + f) * 0.06; for (let d = 1; d < 16; d++) { const x = Math.round(131 + Math.cos(a) * d), y = Math.round(140 + Math.sin(a) * d * 0.9 + d * d / 30); pset(x, y, d > 11 ? P.hojaS : P.hoja); if (d % 3 === 0) pset(x + 1, y + 1, P.hojaL); } }
}

// el mostrador de madera, su mampara baja de cristal, la campanilla, la bandeja, el bolígrafo y el dispensador de números
function e_archGeneralDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P;
  // la mampara: los postes, la barra de arriba y unos reflejos que no tapan la cara de quien atiende
  for (const x of [143, 227]) { rect(x - 1, 117, x + 1, 141, C.k); rect(x, 118, x, 140, P.metalL); }
  rect(142, 116, 228, 118, C.k); rect(143, 117, 227, 117, P.metalL);
  for (let i = 0; i < 9; i++) { pset(146 + i, 138 - i * 2, hex('#e8f4f8')); pset(220 + (i >> 1), 138 - i * 2, hex('#e8f4f8')); }
  // el tablero con su canto, el frente de paneles con vetas y el rodapié
  rect(138, 140, 232, 145, C.k); rect(139, 141, 231, 144, P.maderaL); rect(139, 141, 231, 141, hex('#e8bc90')); rect(139, 144, 231, 144, P.madera);
  rect(140, 145, 230, 157, C.k); rect(141, 146, 229, 156, P.madera);
  for (let y = 146; y < 156; y++) for (let x = 141; x < 230; x++) if (h(x >> 2, y, 590) < 0.28) pset(x, y, P.maderaV);
  for (let x = 143; x < 228; x += 22) { rect(x, 147, x + 18, 153, P.maderaS); rect(x + 1, 148, x + 17, 152, P.madera); rect(x + 1, 148, x + 17, 148, P.maderaL); rect(x + 1, 148, x + 1, 152, P.maderaL); }
  rect(140, 154, 230, 157, P.maderaD); rect(138, 157, 232, 158, hex('#4a3a2a'));
  // la ranura de pasar papeles bajo la mampara y la bandeja de impresos
  rect(170, 139, 200, 140, C.k);
  rect(150, 136, 166, 140, C.k); rect(151, 137, 165, 139, hex('#3a3a42')); for (let j = 0; j < 3; j++) { rect(152 + j, 135 - j, 164 - j, 136 - j, C.k); rect(153 + j, 135 - j, 163 - j, 135 - j, j % 2 ? hex('#f0e6c8') : P.papel); }
  // el bolígrafo con su cadena
  rect(204, 138, 212, 139, C.k); pset(205, 138, hex('#3a6ac8')); for (let i = 0; i < 6; i++) pset(212 + i, 139 + (i % 2), P.metalS);
  // la campanilla de latón, que brilla
  disco(222, 137, 3.5, C.k); poligono([[218, 139], [226, 139], [225, 136], [219, 136]], P.laton); disco(222, 136, 2.5, P.laton); pset(221, 135, P.latonL); rect(222, 132, 222, 133, C.k); rect(217, 139, 227, 140, C.k);
  if (Math.floor(t * 0.5) % 3 === 0) pset(220, 134, C.blanco);
  // el dispensador de números rojo en su poste, con el tique que cuelga
  rect(131, 128, 133, 162, C.k); rect(132, 129, 132, 161, P.metalL); rect(127, 162, 137, 163, C.k);
  rect(126, 118, 138, 130, C.k); rect(127, 119, 137, 129, P.rojo); rect(127, 119, 137, 120, hex('#f07070')); rect(129, 122, 135, 125, hex('#f0e6c8'));
  { const sw = Math.round(Math.sin(t * 2.4) * 1); rect(131 + sw, 130, 133 + sw, 134, C.blanco); pset(132 + sw, 132, P.rojoS); }
}

const e_CAJ = [[0, 24, 104], [106, 24, 212], [214, 50, 319]];

function e_archCajonesFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = e_P;
  // la pared de arriba (tranquila bajo el año y bajo Atom), con la sombra de los archivadores
  e_textura(R, 0, 0, 319, 179, P.verdeP, P.verdePS, P.verdePL, 600, 0.06, 2);
  // los tres archivadores: el cuerpo con abolladuras y arañazos, los cajones con bisel, tirador, cerradura y etiqueta
  for (const [x0, top, x1] of e_CAJ) {
    rect(x0, top, x1, 179, C.k); for (let y = top + 1; y < 180; y++) for (let x = x0 + 1; x < x1; x++) { const v = h(x, y, 601); pset(x, y, v < 0.08 ? P.archiS : v > 0.97 ? P.archiL : P.archi); }
    rect(x0 + 1, top + 1, x1 - 1, top + 3, P.archiL); rect(x1 - 2, top + 1, x1 - 1, 179, P.archiS); rect(x0 + 1, top + 1, x0 + 1, 179, P.archiL);
    disco((x0 + x1) / 2, top + 7, 2.5, C.k); disco((x0 + x1) / 2, top + 7, 1.7, P.latonS); pset((x0 + x1) / 2, top + 7, C.k);
    const n = Math.floor((180 - top - 12) / 40);
    for (let d = 0; d < n; d++) { const y = top + 12 + d * 40, xa = x0 + 6, xb = x1 - 6, mx = (xa + xb) >> 1;
      rect(xa - 1, y - 1, xb + 1, y + 37, C.k); rect(xa, y, xb, y + 36, P.archi); rect(xa, y, xb, y + 1, P.archiL); rect(xa, y, xa, y + 36, P.archiL); rect(xa, y + 35, xb, y + 36, P.archiS); rect(xb, y, xb, y + 36, P.archiS);
      rect(mx - 14, y + 18, mx + 14, y + 26, C.k); rect(mx - 13, y + 19, mx + 13, y + 25, P.archiD); rect(mx - 11, y + 21, mx + 11, y + 23, P.metal); rect(mx - 11, y + 21, mx + 11, y + 21, P.metalL); rect(mx - 11, y + 23, mx + 11, y + 23, P.metalS);
      rect(mx - 12, y + 5, mx + 12, y + 14, P.latonS); rect(mx - 11, y + 6, mx + 11, y + 13, P.laton); rect(mx - 10, y + 7, mx + 10, y + 12, hex('#f2ecd8')); rect(mx - 11, y + 6, mx + 11, y + 6, P.latonL);
      const num = [1987, 1999, 2004, 2009, 2013, 2016, 2019, 2021, 2023, 2024, 2025, 2026][(x0 >> 4) % 4 * 3 + d];
      e_cifras(R, num, mx - 8, y + 8, hex('#3a3a6a'));
      // abolladuras y arañazos
      for (let k = 0; k < 3; k++) { const ax = xa + 4 + Math.floor(h(d, k, 602 + x0) * (xb - xa - 10)), ay = y + 28 + Math.floor(h(k, d, 603 + x0) * 6); linea(ax, ay, ax + 4, ay - 1, P.archiL); pset(ax + 1, ay + 1, P.archiS); }
    }
  }
  // la nota amarilla con un caimán dibujado, pegada en el archivador de la izquierda
  rect(14, 62, 26, 73, hex('#e8c840')); rect(14, 62, 26, 63, hex('#f8e070')); for (let i = 0; i < 9; i++) pset(16 + i, 69 - (i % 3 === 1 ? 1 : 0), P.caiman); pset(22, 67, P.caiman); pset(23, 67, P.ojo);
  // el hueco del cajón abierto: el fondo oscuro y los raíles
  rect(112, 92, 206, 100, hex('#1a1c18')); rect(112, 100, 206, 101, P.archiD);
  // el interior del cajón abierto: los laterales en perspectiva, el fondo y la varilla de las fichas
  poligono([[112, 92], [206, 92], [222, 128], [98, 128]], hex('#2a2e28'));
  poligono([[112, 92], [118, 92], [106, 128], [98, 128]], P.archiS); poligono([[200, 92], [206, 92], [222, 128], [214, 128]], P.archiS);
  linea(112, 92, 98, 128, P.archiL); linea(206, 92, 222, 128, P.archiD);
}

// las fichas del cajón, de atrás adelante: cada una asoma su canto y algunas su pestaña de color con cifras
function e_fichas(R, t, saca) {
  const { rect, pset } = R, P = e_P, N = 15;
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1), y = Math.round(95 + u * 30), x0 = Math.round(118 - u * 12), x1 = Math.round(200 + u * 12), sw = Math.round(Math.sin(t * 1.3 + i * 0.5) * 0.6);
    const roja = i === 7;
    if (roja && saca > 0) { // la ficha roja sube y sale: renglones, el sello y un caimán pequeño; las de delante la tapan abajo
      const yy = Math.round(y - saca * 36); rect(x0, yy, x1, yy + 30, C.k); rect(x0 + 1, yy + 1, x1 - 1, yy + 30, P.papel); rect(x0 + 1, yy + 1, x1 - 1, yy + 2, C.blanco);
      rect(152, yy - 4, 168, yy, C.k); rect(153, yy - 3, 167, yy, P.rojo); e_cifras(R, 119, 155, yy - 3, C.blanco);
      for (let j = 0; j < 6; j++) rect(x0 + 6, yy + 6 + j * 3, x0 + 40 + Math.floor(h(j, 1, 611) * 26), yy + 6 + j * 3, P.texto);
      R.anillo(x1 - 16, yy + 16, 6, hex('#3a5ab8')); R.anillo(x1 - 16, yy + 16, 4.5, hex('#3a5ab8')); e_fotoCaiman(R, x0 + 6, yy + 24, 14, 5, 1);
      continue; }
    rect(x0, y + sw, x1, y + 3 + sw, C.k); rect(x0 + 1, y + 1 + sw, x1 - 1, y + 3 + sw, i % 4 === 1 ? hex('#f0e6c8') : P.papel); rect(x0 + 1, y + 3 + sw, x1 - 1, y + 3 + sw, P.papelS);
    if (i % 2 === 0 || roja) { const tx = roja ? 152 : x0 + 8 + Math.floor(h(i, 1, 610) * (x1 - x0 - 30)), c = roja ? P.rojo : hex(['#5a8ac8', '#e8c84a', '#6ab06a', '#e88a4a'][i % 4]);
      rect(tx, y - 4 + sw, tx + 16, y + sw, C.k); rect(tx + 1, y - 3 + sw, tx + 15, y + sw, c); e_cifras(R, roja ? 119 : (10 + i * 7), tx + 3, y - 3 + sw, roja ? C.blanco : C.k); }
  }
}

function e_archCajones(R, t, o) {
  const { rect, pset, linea } = R, P = e_P, saca = Math.max(0, Math.min(1, o.saca ?? 0));
  e_fijo(R, 'e-arch-c', () => e_archCajonesFijo(R));
  e_fichas(R, t, saca);
  // los rayos de la persiana que cruzan despacio los archivadores, con sus motas de polvo
  const dx = (t * 3) % 60;
  for (let y = 26; y < 180; y++) for (let s = -1; s < 6; s++) { const xa = Math.round(s * 60 + dx - (y - 26) * 0.55); for (let x = Math.max(0, xa); x < Math.min(320, xa + 14); x++) if ((x + y) % 2 === 0 && !(x > 276 && y < 46)) pset(x, y, e_mezcla(R.pget(x, y), hex('#fff2cc'), 0.22)); }
  for (let k = 0; k < 16; k++) { const u = (t * 0.04 + h(k, 1, 612)) % 1, x = 20 + h(k, 2, 612) * 250 + Math.sin(t * 0.7 + k) * 3, y = 60 + u * 110; if (Math.sin(t * 1.7 + k) > -0.3) pset(Math.round(x), Math.round(y), hex('#fffaf0')); }
  // la salamanquesa que sube por el lateral del archivador de la derecha, se para y sigue
  { const u = (t % 12) / 12, y = 170 - u * 110, x = 216 + Math.sin(u * 8) * 2, f = Math.floor(t * 8) % 2, sube = Math.sin(t * 2) > -0.4;
    const Y = Math.round(sube ? y : y), X = Math.round(x);
    rect(X, Y - 2, X + 1, Y + 3, hex('#8a9a6a')); pset(X, Y - 3, hex('#a8b888')); pset(X + 1, Y - 2, C.k); rect(X, Y + 4, X, Y + 6, hex('#6a7a4a')); pset(X + 1, Y + 7, hex('#6a7a4a'));
    pset(X - 1, Y - 1 + f, hex('#6a7a4a')); pset(X + 2, Y - f, hex('#6a7a4a')); pset(X - 1, Y + 3 - f, hex('#6a7a4a')); pset(X + 2, Y + 2 + f, hex('#6a7a4a')); }
}

// el frente del cajón abierto, más cerca: el bisel, el tirador y la etiqueta «119»
function e_archCajonesDelante(R, t, o) {
  const { rect } = R, P = e_P;
  rect(95, 127, 225, 167, C.k); rect(96, 128, 224, 166, P.archi); rect(96, 128, 224, 130, P.archiL); rect(96, 128, 97, 166, P.archiL); rect(222, 128, 224, 166, P.archiS); rect(96, 164, 224, 166, P.archiS);
  for (let y = 131; y < 164; y++) for (let x = 98; x < 222; x++) if (h(x, y, 620) < 0.06) R.pset(x, y, P.archiS);
  rect(142, 150, 178, 160, C.k); rect(143, 151, 177, 159, P.archiD); rect(145, 153, 175, 156, P.metal); rect(145, 153, 175, 153, P.metalL); rect(145, 156, 175, 156, P.metalS);
  rect(144, 132, 176, 148, P.latonS); rect(145, 133, 175, 147, P.laton); rect(146, 134, 174, 146, hex('#f2ecd8')); rect(145, 133, 175, 133, P.latonL);
  e_cifras(R, 119, 149, 135, hex('#3a3a6a'), 2);
  rect(95, 167, 225, 170, hex('#2a2e28'));
}

// la pantalla, el cuerpo y sus radios; el estado: las capas fijas, el búfer de paso del feed y el fotograma guardado
const MV_S = [116, 14, 204, 170], MV_C = [110, 8, 210, 176], MV_RS = 6, MV_RC = 11;

const f_mv = { capas: new Map(), vb: null, stash: null, stashT: NaN, stashB: null, cielo: null, torres: [] };

// mezcla dos colores: a = 0 deja c1, a = 1 da c2
const f_mvMez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };

// la trama ordenada de 4 × 4
const MV_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// una capa fija: se pinta una vez en un búfer propio y se guarda con su clave
function f_mvCapa(R, clave, dibuja) {
  let b = f_mv.capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(b); R.usar(prev); f_mv.capas.set(clave, b); }
  return b;
}

// ¿(x, y) dentro del rectángulo redondeado?
function f_mvDentro(x, y, x0, y0, x1, y1, r) {
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const dx = Math.min(x - x0, x1 - x), dy = Math.min(y - y0, y1 - y);
  if (dx >= r || dy >= r) return true;
  return Math.hypot(r - dx - 0.5, r - dy - 0.5) <= r;
}

// cuánto se mete (x, y) en el rectángulo redondeado (−1 fuera)
function f_mvHondo(x, y, x0, y0, x1, y1, r) {
  if (x < x0 || x > x1 || y < y0 || y > y1) return -1;
  const dx = Math.min(x - x0, x1 - x), dy = Math.min(y - y0, y1 - y);
  if (dx >= r || dy >= r) return Math.min(dx, dy);
  const d = r - Math.hypot(r - dx - 0.5, r - dy - 0.5); return d < 0 ? -1 : d;
}

// un rectángulo recortado a la pantalla (R.rect no respeta R.recorte)
const f_mvRc = (R, x0, y0, x1, y1, c) => R.rect(Math.max(Math.round(x0), MV_S[0]), Math.max(Math.round(y0), MV_S[1]), Math.min(Math.round(x1), MV_S[2]), Math.min(Math.round(y1), MV_S[3]), c);

// copia la pantalla de un búfer a otro, corrida yo filas (para el deslizamiento del feed)
function f_mvCopia(D, S, yo) {
  const [x0, y0, x1, y1] = MV_S;
  for (let y = y0; y <= y1; y++) { const sy = y - yo; if (sy < y0 || sy > y1) continue; D.set(S.subarray(sy * 320 + x0, sy * 320 + x1 + 1), y * 320 + x0); }
}

// la posición del feed (0–3, con decimales mientras desliza)
function f_mvPos(t, o) {
  if (o.desliza != null) return Math.max(0, Math.min(1, o.desliza)) * 3;
  if (o.video != null) return o.video;
  const P = 1.6, n = Math.floor(t / P), u = Math.max(0, Math.min(1, (t - n * P - 1.15) / 0.45));
  return n + u * u * (3 - 2 * u);
}

// un degradado tramado entre paradas [[y, '#hex'], …] (cuatro pasos de mezcla entre cada dos, con trama ordenada)
function f_mvDeg(R, x0, x1, y0, y1, paradas, px) {
  const P = paradas.map(([y, c]) => [y, hex(c)]);
  for (let y = y0; y <= y1; y++) {
    let k = 0; while (k < P.length - 2 && y > P[k + 1][0]) k++;
    const [ya, ca] = P[k], [yb, cb] = P[k + 1], f = Math.max(0, Math.min(1, (y - ya) / Math.max(1, yb - ya))) * 4, i = Math.floor(f), r = f - i;
    const c0 = f_mvMez(ca, cb, Math.min(4, i) / 4), c1 = f_mvMez(ca, cb, Math.min(4, i + 1) / 4);
    for (let x = x0; x <= x1; x++) (px || R.pset)(x, y, r * 16 > MV_BAYER[(y & 3) * 4 + (x & 3)] ? c1 : c0);
  }
}

// EL FONDO BORROSO: la pantalla se resume en una rejilla de 11 × 18 colores, que se amplía a todo el plano con mezcla
// bilineal, oscurecida, con viñeta, el resplandor del móvil y su sombra, y tramada en pocos tonos (paso 20); en el feed,
// a los lados, dos móviles fantasma desenfocados con sus vídeos de colores que se deslizan
const MV_FANT = [[44, 34, 92, 146], [228, 34, 276, 146]];

const MV_GV = [['#4aa0e8', '#3ac8d0', '#f0dca0', '#f4a8c0'], ['#2a1a4a', '#ff4fa8', '#1a1a3a', '#40e8f8'], ['#e8e8e0', '#d84a4a', '#a8a8a0', '#3a4a2a'],
  ['#a8a050', '#4a5a40', '#6a6a30', '#f8e098'], ['#ff8a4a', '#d8607a', '#3a2a5a', '#ffd070'], ['#bfe8ff', '#3ac8d8', '#f0e0c8', '#f4a8c0']].map((v) => v.map(hex));

function f_mvFondo(R, B, t, feed, p) {
  const N = 11, M = 18, Gr = new Float32Array(N * M), Gg = new Float32Array(N * M), Gb = new Float32Array(N * M);
  for (let cy = 0; cy < M; cy++) for (let cx = 0; cx < N; cx++) {
    let r = 0, g = 0, b = 0;
    for (let j = 0; j < 8; j += 2) for (let i = 0; i < 8; i += 2) { const c = B[(22 + cy * 8 + j) * 320 + 116 + cx * 8 + i]; r += c & 255; g += (c >>> 8) & 255; b += (c >>> 16) & 255; }
    const k = cy * N + cx; Gr[k] = r / 16; Gg[k] = g / 16; Gb[k] = b / 16;
  }
  const [cx0, cy0, cx1, cy1] = MV_C, ST = 20;
  for (let y = 0; y < 180; y++) {
    const gy = 1 + y / 179 * 14 + Math.sin(t * 0.4 + y * 0.02) * 0.3, j0 = Math.floor(gy), fy = gy - j0;
    for (let x = 0; x < 320; x++) {
      if (x >= MV_S[0] && x <= MV_S[2] && y >= MV_S[1] && y <= MV_S[3]) continue;
      let r, g, b;
      const gx = x / 319 * (N - 1), i0 = Math.min(N - 2, Math.floor(gx)), fx = gx - i0, a = j0 * N + i0;
      r = (Gr[a] * (1 - fx) + Gr[a + 1] * fx) * (1 - fy) + (Gr[a + N] * (1 - fx) + Gr[a + N + 1] * fx) * fy;
      g = (Gg[a] * (1 - fx) + Gg[a + 1] * fx) * (1 - fy) + (Gg[a + N] * (1 - fx) + Gg[a + N + 1] * fx) * fy;
      b = (Gb[a] * (1 - fx) + Gb[a + 1] * fx) * (1 - fy) + (Gb[a + N] * (1 - fx) + Gb[a + N + 1] * fx) * fy;
      const dx = (x - 160) / 170, dy = (y - 92) / 110;
      let k = 0.5 * (1 - 0.55 * (dx * dx + dy * dy));
      // el resplandor de la pantalla alrededor del móvil
      const ex = Math.max(cx0 - x, 0, x - cx1), ey = Math.max(cy0 - y, 0, y - cy1), dd = Math.hypot(ex, ey);
      k += 0.22 * Math.max(0, 1 - dd / 34);
      // la esquina de Atom y la barra del año, tranquilas
      { const da = Math.hypot(x - 298, y - 24); if (da < 46) k *= 1 - 0.2 * (1 - da / 46); }
      if (feed) for (let q = 0; q < 2; q++) {
        const [fx0, fy0, fx1, fy1] = MV_FANT[q], hd = f_mvHondo(x, y, fx0, fy0, fx1, fy1, 7);
        if (hd < 0) continue;
        if (hd < 3) { r = r * 0.35 + 6; g = g * 0.35 + 6; b = b * 0.35 + 10; break; }
        // el vídeo del fantasma: bandas de color, una mancha y la junta, que se deslizan con el feed
        const v = (y - fy0) / (fy1 - fy0) + p * 1 + q * 1.37 + 0.25, n = Math.floor(v), fv = v - n, vid = MV_GV[(n + q * 2) % 6];
        const bi = fv * 2.2, bk = Math.min(1, Math.floor(bi)), bf = Math.min(1, bi - bk), c0 = vid[bk], c1 = vid[bk + 1];
        r = (c0 & 255) * (1 - bf) + (c1 & 255) * bf; g = ((c0 >>> 8) & 255) * (1 - bf) + ((c1 >>> 8) & 255) * bf; b = ((c0 >>> 16) & 255) * (1 - bf) + ((c1 >>> 16) & 255) * bf;
        const u = (x - fx0) / (fx1 - fx0), m = Math.hypot(u - 0.45, (fv - 0.62) * 2.2);
        if (m < 0.22) { const c = vid[3], w = 1 - m / 0.22; r += ((c & 255) - r) * w; g += (((c >>> 8) & 255) - g) * w; b += (((c >>> 16) & 255) - b) * w; }
        const m2 = Math.hypot(u - 0.72 + q * 0.4, (fv - 0.22) * 2.2);
        if (m2 < 0.13) { const w = (1 - m2 / 0.13) * 0.8; r += (255 - r) * w * 0.6; g += (230 - g) * w * 0.6; b += (190 - b) * w * 0.6; }
        if (fv > 0.47 && fv < 0.5) { r += 30; g += 30; b += 30; }
        if (u > 0.1 && u < 0.55 - (fv > 0.9 ? 0.15 : 0) && ((fv > 0.86 && fv < 0.88) || (fv > 0.9 && fv < 0.92))) { r += 70; g += 70; b += 70; }
        if (fv < 0.02 || fv > 0.985) { r *= 0.3; g *= 0.3; b *= 0.3; }
        if (u > 0.8 && u < 0.92 && fv > 0.45 && fv < 0.85 && ((fv * 9) % 1) < 0.35) { r += 60; g += 60; b += 60; }
        k = 0.42 * (1 - 0.3 * (dx * dx + dy * dy)); break;
      }
      // la sombra del móvil, abajo a la derecha
      if (x > cx0 + 4 && x <= cx1 + 6 && y > cy0 + 5 && y <= cy1 + 7 && f_mvDentro(x - 6, y - 7, cx0, cy0, cx1, cy1, MV_RC)) k *= 0.45;
      const d = MV_BAYER[(y & 3) * 4 + (x & 3)] / 16;
      r = Math.min(255, Math.floor(r * k / ST + d) * ST); g = Math.min(255, Math.floor(g * k / ST + d) * ST); b = Math.min(255, Math.floor((b * k + 10) / ST + d) * ST);
      B[y * 320 + x] = (0xff000000 | (b << 16) | (g << 8) | r) >>> 0;
    }
  }
}

// los círculos de luz desenfocados que flotan (con el borde algo más claro, como el bokeh de verdad)
function f_mvBokeh(R, t, feed) {
  const TIN = [hex('#ff9a6a'), hex('#ff6aa8'), hex('#6ad8f0'), hex('#ffd890'), hex('#b07af0')];
  for (let k = 0; k < 15; k++) {
    const r = 3 + Math.floor(h(k, 3, 42) * 7), x = Math.round(((h(k, 1, 42) * 380 + t * (2 + k % 4) * (k % 2 ? 1 : -1)) % 380 + 380) % 380 - 30);
    const y = Math.round(((h(k, 2, 42) * 220 - t * (1.5 + (k % 3))) % 220 + 220) % 220 - 20);
    let a = 0.16 + 0.12 * Math.sin(t * 0.9 + k * 1.7);
    if (x > 250 && y < 60) a *= 0.25; else if (y < 26 && x < 180) a *= 0.4;
    if (feed && k % 3 === 0) continue;
    const c = TIN[k % 5];
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
      const dd = Math.hypot(i, j); if (dd > r) continue;
      const px = x + i, py = y + j; if (px < 0 || px > 319 || py < 0 || py > 179) continue;
      if (px >= MV_C[0] && px <= MV_C[2] && py >= MV_C[1] && py <= MV_C[3]) continue;
      const ab = dd > r - 1 ? a * 1.5 : a * (0.7 + 0.3 * dd / r);
      R.pset(px, py, f_mvMez(R.pget(px, py), c, ab));
    }
  }
}

// corazones y estrellas desenfocados que suben por los lados (el directo de las redes)
const MV_CORA = ['.#.#.', '#####', '#####', '.###.', '..#..'], MV_ESTR = ['..#..', '.###.', '#####', '.#.#.'];

function f_mvReacciones(R, t) {
  const TIN = [hex('#ff4f78'), hex('#ff8ac0'), hex('#ffb04a'), hex('#ffe070')];
  for (let k = 0; k < 14; k++) {
    const lado = k % 2, per = 6 + h(k, 5, 43) * 3, u = ((t + h(k, 6, 43) * per) % per) / per;
    const x = Math.round((lado ? 226 : 18) + h(k, 7, 43) * 70 + Math.sin(t * 1.6 + k) * 5), y = Math.round(186 - u * 170);
    if (y < 30 || (x > 262 && y < 60)) continue;
    const pat = k % 4 === 3 ? MV_ESTR : MV_CORA, c = TIN[k % 4], a = Math.min(1, (1 - u) * 1.6) * 0.55, s = 1 + (k % 3 === 0 ? 1 : 0);
    pat.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') for (let a2 = 0; a2 < s; a2++) for (let b2 = 0; b2 < s; b2++) {
      const px = x + i * s + a2, py = y + j * s + b2; R.pset(px, py, f_mvMez(R.pget(px, py), c, a)); } });
  }
}

// EL MÓVIL: el contorno, el marco metálico con su luz arriba a la izquierda y su sombra abajo a la derecha, el bisel
// negro, los botones del lado, la isla negra de arriba y las esquinas redondeadas de la pantalla
function f_mvMarco(R) {
  const [x0, y0, x1, y1] = MV_C, [s0, t0, s1, t1] = MV_S;
  const K = hex('#06060a'), ML = hex('#b8b8c8'), M = hex('#7a7a8a'), MS = hex('#3a3a48'), BZ = hex('#0c0c12'), BZ2 = hex('#16161e');
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    if (x >= s0 && x <= s1 && y >= t0 && y <= t1 && f_mvDentro(x, y, s0, t0, s1, t1, MV_RS)) continue;
    const d = f_mvHondo(x, y, x0, y0, x1, y1, MV_RC); if (d < 0) continue;
    let c;
    if (d < 1) c = K;
    else if (d < 3) { const luz = (x - x0) + (y - y0) * 0.6 < (x1 - x) + (y1 - y) * 0.6; c = d < 2 ? (luz ? ML : MS) : M; if (!luz && d >= 2) c = hex('#5a5a68'); }
    else if (d < 3.6) c = K;
    else c = (x + y) % 7 === 0 ? BZ2 : BZ;
    R.pset(x, y, c);
  }
  // un brillo largo en el canto de la izquierda y arriba
  for (let y = y0 + 14; y < y0 + 70; y++) R.pset(x0 + 1, y, hex('#e8e8f4'));
  for (let x = x0 + 66; x < x0 + 88; x++) R.pset(x, y0 + 1, hex('#c8c8d8'));
  // los botones: volumen a la izquierda, encendido a la derecha
  for (const [ya, yb] of [[36, 48], [52, 64]]) { R.rect(x0 - 1, ya, x0 - 1, yb, hex('#8a8a9a')); R.pset(x0 - 1, ya, hex('#c8c8d8')); }
  R.rect(x1 + 1, 46, x1 + 1, 66, hex('#5a5a68')); R.pset(x1 + 1, 46, hex('#9a9aaa'));
  // la isla negra (sin cámara ni marca: una pastilla y un puntito)
  for (let x = 150; x <= 170; x++) for (let y = 16; y <= 20; y++) if (f_mvDentro(x, y, 150, 16, 170, 20, 2)) R.pset(x, y, K);
  R.pset(166, 18, hex('#1e2a44'));
}

// el reflejo del cristal: dos rayas diagonales muy suaves arriba a la izquierda
function f_mvBrillo(R) {
  for (let y = MV_S[1] + 1; y < 64; y++) for (let x = MV_S[0]; x < 160; x++) {
    const s = (x - MV_S[0]) + (y - MV_S[1]) * 0.7;
    if ((s > 22 && s < 30) || (s > 34 && s < 36)) { if (!f_mvDentro(x, y, MV_S[0], MV_S[1], MV_S[2], MV_S[3], MV_RS)) continue; R.pset(x, y, f_mvMez(R.pget(x, y), hex('#ffffff'), s < 30 ? 0.09 : 0.14)); }
  }
}

// cifras de 3 × 5 (los contadores de la red)
const MV_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

function f_mvCifras(R, s, x, y, c, sombra = hex('#000000')) {
  s = String(s); const w = s.length * 4 - 1; x = Math.round(x - w / 2);
  for (const capa of [1, 0]) for (let k = 0; k < s.length; k++) { const g = MV_DIG[+s[k]]; if (!g) continue;
    for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + k * 4 + i + capa, y + j + capa, capa ? sombra : c); }
}

// un dibujo de filas '#' con su sombra de 1 px
function f_mvPicto(R, filas, x, y, c, sombra = hex('#000000'), s = 1) {
  for (const capa of [1, 0]) filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) R.pset(x + i * s + a + capa, y + j * s + b + capa, capa ? sombra : (typeof c === 'function' ? c(i, j) : c)); });
}

// el corazón grande del doble toque (13 × 11)
const MV_CORG = ['..###...###..', '.#####.#####.', '#############', '#############', '#############', '.###########.', '..#########..', '...#######...', '....#####....', '.....###.....', '......#......'];

const MV_ICO = {
  corazon: ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'],
  bocadillo: ['.#####.', '#######', '#######', '#######', '.#####.', '.#.....'],
  marcador: ['#####', '#####', '#####', '#####', '#####', '##.##', '#...#'],
  compartir: ['....#..', '....##.', '.######', '#######', '##..##.', '#...#..'],
  lupa: ['.###.', '#...#', '#...#', '#...#', '.###.', '....##', '.....#'],
  nota: ['.####', '.#..#', '.#..#', '##.##', '##.##'],
  arroba: ['.###.', '#...#', '#.###', '#.#.#', '#.##.', '.....'],
  almohadilla: ['.#.#.', '#####', '.#.#.', '#####', '.#.#.'],
};

// LA INTERFAZ DE LA RED (sin letras ni logos), dentro de la pantalla; k: el vídeo que se ve (cambia los números)
function f_mvUI(R, t, o, k) {
  const W = hex('#f4f4f8'), Wd = hex('#a8a8b8'), K = hex('#000000'), ROJO = hex('#ff3a5a');
  // arriba: la cobertura y la batería (a la derecha, lejos del año), las pestañas y la lupa
  for (let i = 0; i < 4; i++) R.rect(178 + i * 2, 20 - i, 178 + i * 2, 20, W);
  R.rect(188, 17, 198, 21, W); R.rect(189, 18, 197, 20, K); R.rect(189, 18, 189 + Math.round(6 - 2 * Math.sin(t * 0.05)), 20, hex('#7af08a')); R.rect(199, 18, 199, 20, W);
  R.rect(144, 27, 155, 28, Wd); R.rect(161, 27, 175, 28, W); R.rect(164, 31, 172, 31, W);
  f_mvPicto(R, MV_ICO.lupa, 192, 25, W, K);
  // la columna de la derecha: avatar, corazón, bocadillo, marcador y compartir, con sus números que suben
  const cx = 197, likeT = o.like ?? Infinity, rojo = t >= likeT;
  const AV = [hex('#f4a8c0'), hex('#9ae0c8'), hex('#9ac8f0'), hex('#f8e098')][k];
  for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, j); if (d <= 5.2) R.pset(cx + i, 72 + j, d > 4.2 ? W : j > 1 && Math.abs(i) < 3 + (j > 3 ? 1 : 0) ? hex('#3a3a5a') : Math.hypot(i, j + 1) < 2 ? hex('#3a3a5a') : AV); }
  R.disco(cx, 78, 2, ROJO); R.rect(cx - 1, 78, cx + 1, 78, W); R.pset(cx, 77, W); R.pset(cx, 79, W);
  const base = [[4812, 233, 951, 640], [7126, 410, 1287, 902], [3405, 188, 622, 377], [9620, 815, 2471, 1934]][k];
  const sube = Math.floor(Math.max(0, t) * 3.3);
  const lat = rojo && t - likeT < 0.3 ? 1 : 0;
  f_mvPicto(R, MV_ICO.corazon, cx - 3 - lat, 86 - lat, rojo ? (i, j) => (i === 1 && j === 1 ? hex('#ffb0c0') : ROJO) : W, K, 1);
  f_mvCifras(R, (base[0] + sube + (rojo ? 1 : 0)) % 10000, cx, 94, W);
  f_mvPicto(R, MV_ICO.bocadillo, cx - 3, 102, W, K);
  for (const dx of [-2, 0, 2]) R.pset(cx + dx, 104, hex('#3a3a5a'));
  f_mvCifras(R, base[1] + Math.floor(sube / 7), cx, 110, W);
  f_mvPicto(R, MV_ICO.marcador, cx - 2, 118, W, K);
  f_mvCifras(R, base[2] + Math.floor(sube / 3), cx, 127, W);
  f_mvPicto(R, MV_ICO.compartir, cx - 3, 135, W, K);
  f_mvCifras(R, base[3] + Math.floor(sube / 4), cx, 143, W);
  // el disco que gira
  const an = t * 3;
  for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, j); if (d > 5.2) continue;
    const a = Math.atan2(j, i) - an, raya = d > 2.5 && Math.cos(a * 2) > 0.85;
    R.pset(cx + i, 160 + j, d < 2.2 ? AV : d > 4.4 ? hex('#3a3a44') : raya ? hex('#6a6a7a') : hex('#16161e')); }
  R.pset(cx, 160, K);
  // abajo a la izquierda: el nombre con su @, dos rayas de texto con #, la nota con la raya que corre
  f_mvPicto(R, MV_ICO.arroba, 119, 151, W, K);
  R.rect(126, 153, 126 + [26, 30, 22, 34][k], 154, W); R.rect(127, 155, 127 + [26, 30, 22, 34][k], 155, K);
  f_mvPicto(R, MV_ICO.almohadilla, 120, 157, W, K); R.rect(127, 159, 127 + [22, 18, 28, 24][k], 159, Wd); R.rect(127, 160, 127 + [22, 18, 28, 24][k], 160, hex('#202028'));
  f_mvPicto(R, MV_ICO.almohadilla, 153, 157, W, K); R.rect(160, 159, 160 + [12, 16, 10, 14][k], 159, Wd); R.rect(160, 160, 160 + [12, 16, 10, 14][k], 160, hex('#202028'));
  f_mvPicto(R, MV_ICO.nota, 119, 162, W, K);
  for (let i = 0; i < 6; i++) { const x = 127 + ((i * 11 - Math.floor(t * 10)) % 66 + 66) % 66; for (let q = 0; q < 7 - (i % 3); q++) if (x + q < 182) { R.pset(x + q, 165, Wd); R.pset(x + q, 166, hex('#202028')); } }
  // la barra de progreso
  const dur = 9 + k * 2, u = ((t % dur) + dur) % dur / dur, xf = Math.round(117 + u * 86);
  for (let x = 117; x <= 203; x++) { R.pset(x, 168, x <= xf ? W : hex('#6a6a78')); R.pset(x, 169, hex('#202028')); }
  R.disco(xf, 168, 1, W);
  // los corazones que suben desde el corazón de la columna
  if (o.corazones !== false) {
    const TIN = [ROJO, hex('#ff8ac0'), hex('#ffb04a'), hex('#c87af0'), hex('#ff5a8a')];
    for (let q = 0; q < 7; q++) {
      const per = 2.4, u2 = ((t + q * 0.41) % per) / per, x = Math.round(cx - 4 - u2 * 18 + Math.sin(u2 * 7 + q * 2) * 4), y = Math.round(84 - u2 * 54);
      if (u2 > 0.88) continue;
      f_mvPicto(R, MV_CORA, x, y, TIN[q % 5], hex('#2a0a1a'));
    }
  }
  // el doble toque: un corazón grande late en el centro
  if (t >= likeT && t < likeT + 0.9) {
    const v = (t - likeT) / 0.9, s = v < 0.25 ? 2 + Math.round(v * 12) : 5, x = 160 - Math.round(3.5 * s), y = 80 - Math.round(3 * s) - Math.round(v > 0.6 ? (v - 0.6) * 30 : 0);
    const G = MV_CORG, ss = v < 0.2 ? 1 + Math.round(v * 10) : 3, gx = 160 - Math.round(6.5 * ss), gy = 84 - Math.round(5.5 * ss) - Math.round(v > 0.55 ? (v - 0.55) * 40 : 0);
    if (v < 0.8 || Math.floor(t * 20) % 2) f_mvPicto(R, G, gx, gy, (i, j) => (j < 3 && i > 1 && i < 5 && !(j === 0 && i === 4) ? hex('#ffb8c8') : i + j > 13 || j > 7 ? hex('#c81a3a') : ROJO), hex('#5a0a1a'), ss);
  }
}

// EL COCHE DEL VÍDEO (exportado: lo pinta la escena dentro del móvil, con la bailarina en el techo): una berlina vista de
// lado, de unos 38 × 16 px, con chapa sombreada, cristales con el reflejo del ocaso, faros, piloto, tirador, ruedas con
// llanta que gira y su sombra. (x, suelo): el centro y donde pisan las ruedas; o.dir 1 (hacia la derecha) o −1;
// o.color (por omisión, blanco perla); o.rueda (las ruedas giran; 0 = paradas). Devuelve { techo: [x, y] } (donde se
// plantan los pies de quien se suba: R.actor(EL.bailarinaLF, techo[0], techo[1], t, …)), y ancho 38.
export function f_cocheMovil(R, x, suelo, t, o = {}) {
  x = Math.round(x); suelo = Math.round(suelo);
  const d = o.dir ?? 1, X = (i) => x + i * d, col = hex(o.color ?? '#ecebef'), cS = f_mvMez(col, hex('#3a2a4a'), 0.35), cSS = f_mvMez(col, hex('#2a1a3a'), 0.6), cL = f_mvMez(col, hex('#fff4e0'), 0.6);
  const K = hex('#1a1424'), CR = hex('#2a3a5a'), CRL = hex('#e88a7a'), y = suelo;
  // la sombra en el asfalto
  for (let i = -20; i <= 20; i++) { R.pset(x + i, y, f_mvMez(R.pget(x + i, y), hex('#000000'), 0.5)); if (Math.abs(i) < 16) R.pset(x + i, y + 1, f_mvMez(R.pget(x + i, y + 1), hex('#000000'), 0.3)); }
  // la carrocería de abajo
  const perfil = (i) => (i < -17 ? -7 : i > 16 ? -6 : -9);
  for (let i = -19; i <= 18; i++) { const top = y - 3 + perfil(i); for (let j = top; j <= y - 3; j++) R.pset(X(i), j, j === top ? K : j === top + 1 ? cL : j > y - 5 ? cSS : j > y - 7 ? cS : col); R.pset(X(i), y - 2, K); }
  R.linea(X(-19), y - 10, X(-19), y - 3, K); R.linea(X(18), y - 9, X(18), y - 3, K);
  // la cabina y el techo plano
  const cab = [[-12, -10], [-10, -12], [-8, -13], [-7, -14], [-6, -15], [7, -15], [9, -14], [11, -12], [13, -10]];
  for (let i = -12; i <= 13; i++) {
    const tp = i < -6 ? cab.find(([a]) => a >= i)?.[1] ?? -15 : i > 7 ? [...cab].reverse().find(([a]) => a <= i)?.[1] ?? -15 : -15;
    for (let j = y + tp; j <= y - 11; j++) R.pset(X(i), j, j === y + tp ? K : j === y + tp + 1 ? cL : col);
  }
  // los cristales con el reflejo del ocaso, y el pilar
  for (let i = -10; i <= 11; i++) for (let j = y - 13; j <= y - 11; j++) { const fuera = (i < -8 && j < y - 12) || (i > 9 && j < y - 12); if (fuera || i === 0 || i === 1) continue; R.pset(X(i), j, (i + (j - y)) % 6 === 0 || (i + (j - y)) % 6 === 1 ? CRL : CR); }
  // la puerta, el tirador, el faro y el piloto
  R.linea(X(0), y - 10, X(0), y - 4, cSS); R.linea(X(-12), y - 9, X(-12), y - 4, cS); R.rect(Math.min(X(3), X(5)), y - 9, Math.max(X(3), X(5)), y - 9, cSS);
  R.rect(Math.min(X(16), X(17)), y - 9, Math.max(X(16), X(17)), y - 8, hex('#fff2b0')); R.pset(X(18) + d, y - 9, f_mvMez(R.pget(X(18) + d, y - 9), hex('#fff2b0'), 0.6));
  R.rect(Math.min(X(-18), X(-17)), y - 9, Math.max(X(-18), X(-17)), y - 8, hex('#e83a3a'));
  R.linea(X(-18), y - 5, X(17), y - 5, cS);
  // las ruedas con su llanta que gira
  const giro = (o.rueda ?? 1) * t * 9 * d;
  for (const wx of [-12, 11]) { const cx = X(wx), cy = y - 3;
    R.disco(cx, cy, 4, K); R.disco(cx, cy, 2, hex('#a8a8b8')); R.pset(cx, cy, hex('#4a4a5a'));
    R.pset(Math.round(cx + Math.cos(giro) * 2), Math.round(cy + Math.sin(giro) * 2), hex('#5a5a6a')); R.pset(Math.round(cx - Math.cos(giro) * 2), Math.round(cy - Math.sin(giro) * 2), hex('#5a5a6a')); }
  return { techo: [x, y - 16], ancho: 38 };
}

// EL PUENTE (el vídeo del Causeway, y el último del feed). El panorama lejano (cielo, skyline, bahía con el crucero y el
// velero) es una capa fija de 320 px de ancho que se repite y corre despacio; lo de cerca se pinta en cada fotograma
const MV_CIELO = [[14, '#2a2058'], [34, '#43296a'], [52, '#7a3576'], [68, '#c4557a'], [84, '#f08660'], [100, '#ffc070']];

function f_mvPano(R) {
  return f_mvCapa(R, 'pano', (b) => {
    const px = (x, y, c) => { b[y * 320 + (((x % 320) + 320) % 320)] = c; };
    const cielo = f_mv.cielo = new Uint8Array(320 * 180);
    f_mvDeg(R, 0, 319, 14, 100, MV_CIELO, (x, y, c) => { b[y * 320 + x] = c; cielo[y * 320 + x] = 1; });
    // la bahía: degradado del reflejo del cielo a azul noche, con rayas de olas
    f_mvDeg(R, 0, 319, 101, 134, [[101, '#e0788a'], [105, '#8a4a88'], [116, '#4a3a7a'], [134, '#2a2c62']], (x, y, c) => {
      const n = h(x >> 2, y, 7); b[y * 320 + x] = n > 0.9 ? f_mvMez(c, hex('#c88ab0'), 0.5) : n < 0.08 ? f_mvMez(c, hex('#1a1a40'), 0.4) : c; });
    // el skyline de Miami Beach: torres con su cara al sol, ventanas encendidas y balizas
    f_mv.torres = [];
    let x = 0, k = 0;
    while (x < 320) {
      const w = 4 + Math.floor(h(k, 1, 50) * 8), alto = (x > 60 && x < 200 ? 10 : 4) + Math.floor(h(k, 2, 50) * (x > 60 && x < 200 ? 20 : 12)), gap = Math.floor(h(k, 3, 50) * 3);
      const pastel = alto < 9, base = pastel ? hex(['#b07a9a', '#7aa0a0', '#c89a8a'][k % 3]) : hex('#3a2858'), cara = pastel ? f_mvMez(base, hex('#ffc0a0'), 0.3) : hex('#5e3a6c');
      for (let i = 0; i < w; i++) for (let j = 0; j < alto; j++) {
        const yy = 100 - j, xx = x + i; let c = i >= w - 2 ? cara : base;
        if (j === alto - 1) c = hex('#c8607a');
        else if (!pastel && i > 0 && i < w - 1 && j % 3 === 1 && i % 2 === 0) c = h(xx, yy, 51) > 0.62 ? hex('#ffd88a') : hex('#7a4a78');
        else if (pastel && j % 3 === 1 && i % 2 === 1) c = hex('#ffe0b0');
        px(xx, yy, c); cielo[yy * 320 + (((xx % 320) + 320) % 320)] = 0;
      }
      if (alto > 22) { f_mv.torres.push([x + (w >> 1), 100 - alto - 1]); px(x + (w >> 1), 100 - alto, hex('#3a2858')); cielo[(100 - alto) * 320 + ((x + (w >> 1)) % 320)] = 0; }
      x += w + gap; k++;
    }
    // palmeras chicas en la orilla de enfrente
    for (const pxx of [20, 52, 210, 236, 300]) { for (let j = 0; j < 6; j++) px(pxx, 100 - j, hex('#2a1838')); for (const [a, bb] of [[-2, -6], [-1, -7], [1, -7], [2, -6], [-3, -5], [3, -5]]) px(pxx + a, 100 + bb, hex('#2a1838')); }
    // el crucero blanco al fondo, con su fila de ventanas y la chimenea
    for (let i = 0; i < 40; i++) for (let j = 0; j < 7; j++) { const xx = 26 + i, yy = 103 + j - (i < 4 ? 0 : 0); if (j > 5 && (i < 2 || i > 37)) continue; px(xx, yy, j === 4 ? hex('#3a3a6a') : i > 30 ? hex('#ffe0d0') : hex('#e8d8e8')); }
    for (let i = 4; i < 34; i++) for (let j = 0; j < 4; j++) { if (i < 4 + j || i > 33 - j * 2) continue; px(26 + i, 99 + j, j === 2 && i % 2 ? hex('#ffd890') : hex('#f0e4f0')); cielo[(99 + j) * 320 + 26 + i] = 0; }
    for (let j = 0; j < 4; j++) { px(46, 95 + j, hex('#3a6ab0')); px(47, 95 + j, hex('#2a4a90')); cielo[(95 + j) * 320 + 46] = 0; cielo[(95 + j) * 320 + 47] = 0; }
    // el velero
    for (let j = 0; j < 9; j++) for (let i = 0; i <= j * 0.6; i++) { px(150 + i, 95 + j, hex('#f8e8e0')); cielo[(95 + j) * 320 + 150 + Math.floor(i)] = 0; }
    for (let i = -3; i < 6; i++) px(150 + i, 105, hex('#3a2a4a'));
  });
}

// las nubes del ocaso: racimos de elipses con tres tonos (la panza encendida en naranja, el medio rosa, la cima morada)
const MV_NUB = [hex('#7a3f7a'), hex('#d4708a'), hex('#ffb088')];

function f_mvNube(R, cx, cy, w, hh, k, mascara, off) {
  for (let j = -hh; j <= hh; j++) for (let i = -w; i <= w; i++) {
    const e = (i * i) / (w * w) + (j * j) / (hh * hh) - 0.35 * h(i >> 1, j, k) - 0.25 * Math.max(0, Math.sin(i * 0.5 + k)) * (j < 0 ? 1 : 0);
    if (e > 1) continue;
    const x = cx + i, y = cy + j; if (x < MV_S[0] || x > MV_S[2] || y < 26) continue;
    if (mascara && !mascara[y * 320 + (((x + off) % 320) + 320) % 320]) continue;
    R.pset(x, y, j > hh * 0.35 ? MV_NUB[2] : j > -hh * 0.3 ? MV_NUB[1] : MV_NUB[0]);
  }
}

function f_mvPuente(R, t, o) {
  const P = f_mvPano(R), B = R.buf, vel = o.vel ?? 36, msk = f_mv.cielo;
  const o1 = Math.floor(t * vel * 0.05), o2 = Math.floor(t * vel * 0.18), s = t * vel;
  const [x0, , x1] = MV_S;
  for (let y = 14; y <= 134; y++) { const of = y <= 100 ? o1 : o2; for (let x = x0; x <= x1; x++) B[y * 320 + x] = P[y * 320 + (x + of) % 320]; }
  const cielo = (x, y) => msk[y * 320 + ((x + o1) % 320)] === 1;
  // el sol que se pone, con su halo (solo sobre el cielo: se esconde tras las torres)
  const SX = 176, SY = 86;
  for (let j = -18; j <= 14; j++) for (let i = -18; i <= 18; i++) {
    const x = SX + i, y = SY + j; if (x < x0 || x > x1 || y > 100 || !cielo(x, y)) continue;
    const d = Math.hypot(i, j);
    if (d <= 7) R.pset(x, y, d < 4.5 ? hex('#fff6d0') : hex('#ffe08a'));
    else if (d < 18) R.pset(x, y, f_mvMez(R.pget(x, y), hex('#ffcf90'), 0.42 * (1 - (d - 7) / 11) * (MV_BAYER[(y & 3) * 4 + (x & 3)] < 11 ? 1 : 0.6)));
  }
  // nubes a tres velocidades
  const wrap = (v, a, b) => a + ((((v - a) % (b - a)) + (b - a)) % (b - a));
  [[30, 10, 3, 1.2, 2], [44, 15, 4, 2.6, 3], [60, 20, 5, 4.4, 2]].forEach(([cy, w, hh, v, n], capa) => {
    for (let q = 0; q < n; q++) { const cx = Math.round(wrap(130 + q * 70 + capa * 31 - t * v - o1 * 0.5, 90, 240)); f_mvNube(R, cx, cy + (q % 2) * 4, w - q * 2, hh, capa * 5 + q, msk, o1); }
  });
  // gaviotas y un avión con su luz
  for (let q = 0; q < 3; q++) { const gx = Math.round(wrap(200 - t * (9 + q * 3) + q * 40, 100, 220)), gy = 40 + q * 7 + Math.round(Math.sin(t * 2 + q) * 2), al = Math.sin(t * 9 + q * 2) > 0;
    R.pset(gx, gy, hex('#2a1a3a')); R.pset(gx - 1, gy - (al ? 1 : 0), hex('#2a1a3a')); R.pset(gx + 1, gy - (al ? 1 : 0), hex('#2a1a3a')); R.pset(gx - 2, gy - (al ? 2 : 0), hex('#2a1a3a')); R.pset(gx + 2, gy - (al ? 2 : 0), hex('#2a1a3a')); }
  { const ax = Math.round(wrap(120 + t * 6, 110, 220)), ay = 30; R.linea(ax - 2, ay, ax + 2, ay, hex('#4a3a6a')); R.pset(ax, ay - 1, hex('#4a3a6a')); if (Math.floor(t * 2) % 2) R.pset(ax - 2, ay, hex('#ff4a4a')); for (let i = 3; i < 16; i++) if (i % 3) R.pset(ax - 2 - i, ay, f_mvMez(R.pget(ax - 2 - i, ay), hex('#ffe0d0'), 0.35)); }
  // las balizas rojas de las torres
  for (const [tx, ty] of f_mv.torres) { const x = ((tx - o1) % 320 + 320) % 320; if (x >= x0 && x <= x1 && Math.sin(t * 3 + tx) > 0) R.pset(x, ty, hex('#ff3a3a')); }
  // la columna de reflejos del sol en el agua
  for (let y = 101; y <= 127; y++) { const w = 3 + (y - 101) * 0.45;
    for (let q = 0; q < 2; q++) { const r = h(y, Math.floor(t * 5 + q * 3 + y * 0.3), 8 + q); if (r > 0.75) continue; const xa = Math.round(SX + (r - 0.37) * 2 * w), l = 1 + Math.floor(h(y, q, 9) * 3);
      for (let i = 0; i < l; i++) R.pset(xa + i, y, q ? hex('#ffd890') : hex('#ff9a6a')); } }
  // el pretil de enfrente: canto encendido, cara con estrías que corren y su sombra
  for (let y = 128; y <= 135; y++) for (let x = x0; x <= x1; x++) {
    const sx = Math.floor(x + s * 0.85), g = ((sx % 6) + 6) % 6;
    R.pset(x, y, y === 128 ? hex('#f4c8a8') : y === 135 ? hex('#4a2e50') : y === 134 ? hex('#7a5272') : g === 0 ? hex('#8a5a78') : g === 1 ? hex('#d8a8a8') : (h(sx >> 1, y, 12) > 0.85 ? hex('#a87890') : hex('#bc8c98')));
  }
  // las farolas encendidas del pretil
  for (let q = 0; q < 4; q++) { const fx = Math.round(wrap(q * 44 - s * 0.85, 96, 272));
    if (fx < x0 - 8 || fx > x1 + 8) continue;
    for (let y = 104; y <= 127; y++) { R.pset(fx, y, hex('#3a2a48')); R.pset(fx + 1, y, hex('#6a4a68')); }
    R.linea(fx - 4, 103, fx, 103, hex('#3a2a48')); R.linea(fx - 4, 104, fx - 2, 104, hex('#3a2a48'));
    for (let j = -4; j <= 4; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j * 1.4); if (d < 6) { const x = fx - 4 + i, y = 106 + j; R.pset(x, y, f_mvMez(R.pget(x, y), hex('#ffe0a0'), 0.3 * (1 - d / 6))); } }
    R.rect(fx - 6, 105, fx - 3, 105, hex('#fff4c8')); R.pset(fx - 5, 106, hex('#ffd890'));
  }
  // el carril de enfrente: asfalto con manchas y los coches que vienen
  for (let y = 136; y <= 141; y++) for (let x = x0; x <= x1; x++) { const sx = Math.floor(x + s); R.pset(x, y, y === 136 ? hex('#2a2032') : h(sx >> 1, y, 13) > 0.88 ? hex('#5a4c62') : h(sx, y >> 1, 14) > 0.93 ? hex('#2e2638') : hex('#433a50')); }
  const COL = ['#e84a4a', '#4a8ae8', '#f0d050', '#e8e8f0', '#3a3a48', '#7ad0a0'];
  for (let q = 0; q < 3; q++) { const cx = Math.round(wrap(q * 71 - t * (vel + 52), 90, 300)); if (cx < x0 - 10 || cx > x1 + 10) continue;
    const c = hex(COL[(q + Math.floor((t * (vel + 52) + q * 71) / 210) * 2) % 6]), cs = f_mvMez(c, hex('#1a1028'), 0.4);
    for (let i = -7; i <= 7; i++) for (let j = 136; j <= 140; j++) { const x = cx + i; if (j < 138 && (i < -4 || i > 4)) continue; R.pset(x, j, j === 136 || (j < 138 && Math.abs(i) === 4) ? hex('#1a1424') : j === 137 && Math.abs(i) < 4 ? hex('#3a4a6a') : j === 140 ? cs : c); }
    R.pset(cx - 7, 138, hex('#fff2b0')); R.pset(cx + 7, 138, hex('#ff3a3a')); R.pset(cx - 4, 141, hex('#1a1424')); R.pset(cx + 4, 141, hex('#1a1424')); }
  // la mediana con su bordillo
  for (let x = x0; x <= x1; x++) { R.pset(x, 142, (Math.floor(x + s) % 9) < 1 ? hex('#a88a90') : hex('#e8c4b0')); R.pset(x, 143, hex('#5a3a52')); }
  // las palmeras de la mediana, que se mecen
  for (let q = 0; q < 3; q++) { const px = Math.round(wrap(q * 64 + 20 - s, 80, 272)); if (px < x0 - 16 || px > x1 + 16) continue; f_mvPalmera(R, px, 142, t, q); }
  // el carril de delante: asfalto, la raya discontinua que corre y la línea del borde
  for (let y = 144; y <= 150; y++) for (let x = x0; x <= x1; x++) { const sx = Math.floor(x + s);
    let c = h(sx >> 1, y, 15) > 0.9 ? hex('#4c4258') : h(sx, y, 16) > 0.95 ? hex('#262030') : hex('#3a3246');
    if (y === 146 && ((sx % 14) + 14) % 14 < 6) c = hex('#f0e0d0'); if (y === 147 && ((sx % 14) + 14) % 14 < 6) c = hex('#a89098');
    if (y === 150) c = hex('#d8c0b8');
    if (y === 144) c = f_mvMez(c, hex('#ff9a6a'), 0.15);
    R.pset(x, y, c); }
  // el canto del tablero: labio encendido, cara de hormigón con juntas y manchas, y su sombra
  for (let y = 151; y <= 157; y++) for (let x = x0; x <= x1; x++) { const sx = Math.floor(x + s), g = ((sx % 30) + 30) % 30;
    R.pset(x, y, y === 151 ? hex('#ffd0b0') : y === 157 ? hex('#2a1e3a') : y === 156 ? hex('#5a3e5c') : g === 0 ? hex('#6a4a66') : g === 1 ? hex('#e0b0a8') : h(sx >> 1, y, 17) > 0.82 ? hex('#9a7088') : hex('#b88c96')); }
  // debajo: el agua oscura con los reflejos naranjas que se mueven y los pilares
  for (let y = 158; y <= 170; y++) for (let x = x0; x <= x1; x++) { const sx = Math.floor(x + s * 0.95), r = h(sx >> 2, y, Math.floor(t * 3 + sx * 0.05));
    R.pset(x, y, y < 160 ? hex('#141230') : r > 0.93 ? hex('#e07a6a') : r > 0.86 ? hex('#5a4a8a') : y % 2 ? hex('#22224e') : hex('#1c1c46')); }
  for (let q = 0; q < 3; q++) { const px = Math.round(wrap(q * 56 - s, 96, 264)); if (px < x0 - 10 || px > x1 + 10) continue;
    for (let y = 158; y <= 170; y++) for (let i = 0; i < 9; i++) { const x = px + i + (y > 164 ? Math.round(Math.sin(y + t * 4)) : 0); R.pset(x, y, y > 164 ? (i < 2 ? hex('#4a3a5a') : hex('#2e2446')) : i < 2 ? hex('#a07a8a') : i > 6 ? hex('#3a2a4a') : hex('#6a4e6a')); } }
}

// una palmera de la mediana, a contraluz, con el tronco anillado, los cocos y las hojas que se mecen
function f_mvPalmera(R, x, suelo, t, k) {
  const alto = 26 + (k % 2) * 4, curva = (j) => Math.round(Math.sin(j / alto * 1.6) * 3);
  for (let j = 0; j < alto; j++) { const xx = x + curva(j), y = suelo - j; R.pset(xx, y, j % 3 === 0 ? hex('#4a2e38') : hex('#6a4a48')); R.pset(xx + 1, y, j % 3 === 0 ? hex('#6a4a48') : hex('#b07a60')); }
  const cx = x + curva(alto), cy = suelo - alto, sw = Math.sin(t * 1.8 + k * 1.3) * 0.18;
  R.pset(cx, cy + 1, hex('#5a3a2a')); R.pset(cx + 2, cy + 1, hex('#5a3a2a'));
  for (let f = 0; f < 7; f++) { const a0 = -Math.PI / 2 + (f - 3) * 0.55 + sw, L = 9 + (f % 2) * 3;
    for (let i = 1; i <= L; i++) { const a = a0 + (a0 > -Math.PI / 2 ? 1 : -1) * i * 0.07 + (Math.abs(f - 3) > 1 ? (f < 3 ? -1 : 1) * i * 0.04 : 0), x2 = Math.round(cx + Math.cos(a) * i), y2 = Math.round(cy + Math.sin(a) * i * 0.75 + i * i * 0.03);
      R.pset(x2, y2, i % 2 ? hex('#1e3a30') : hex('#2e5a40')); if (i > 2 && i < L - 1) R.pset(x2, y2 + 1, hex('#14281e')); }
  }
}

// LOS VÍDEOS DEL FEED (cada uno pinta la pantalla entera en su sitio)
function f_mvVideo(R, t, k, o) { [f_mvTienda, f_mvPiscina, f_mvPlaya, f_mvPuente][k](R, t, o); }

// copia la capa fija de un vídeo a la pantalla
function f_mvFijo(R, b) { const B = R.buf, [x0, y0, x1, y1] = MV_S; for (let y = y0; y <= y1; y++) B.set(b.subarray(y * 320 + x0, y * 320 + x1 + 1), y * 320 + x0); }

// los productos de un estante, de colores, con su luz y su etiqueta
function f_mvProductos(R, x0, x1, y, k) {
  const PC = ['#e84a4a', '#f0c040', '#4a8ae8', '#5ac07a', '#f08a3a', '#9a6ad8', '#f0f0f0', '#3ac8d0'];
  let x = x0, q = 0;
  while (x < x1) { const w = 2 + Math.floor(h(q, k, 60) * 3), al = 5 + Math.floor(h(q, k + 1, 60) * 6), c = hex(PC[Math.floor(h(q, k + 2, 60) * 8)]);
    for (let i = 0; i < w && x + i <= x1; i++) for (let j = 0; j < al; j++) R.pset(x + i, y - 1 - j, i === 0 ? f_mvMez(c, hex('#ffffff'), 0.4) : i === w - 1 ? f_mvMez(c, hex('#000000'), 0.35) : j === Math.floor(al / 2) ? hex('#f8f8f0') : c);
    x += w + (h(q, k + 3, 60) > 0.8 ? 1 : 0); q++; }
}

// el caimán canónico en pequeño (verde oliva casi negro, lomo con bultos, hocico ancho en U, ojos amarillos): anda
// moviendo las patas y la cola
function f_mvCaiman(R, x, y, t, dir = 1) {
  x = Math.round(x); const X = (i) => x + i * dir, CA = hex('#3a4a2a'), CS = hex('#1e2a16'), CL = hex('#5a6e3a'), VI = hex('#7a8a5a'), OJ = hex('#f0d040');
  for (let i = -16; i <= -6; i++) { const g = Math.max(0, Math.round((i + 16) / 4)), yy = y - 2 + Math.round(Math.sin(t * 5 + i * 0.4) * (i + 16 < 4 ? 1 : 0)); for (let j = -g; j <= 0; j++) R.pset(X(i), yy + j, j === -g ? CL : CA); R.pset(X(i), yy + 1, CS); }
  for (let i = -6; i <= 8; i++) for (let j = -4; j <= 0; j++) { R.pset(X(i), y - 1 + j, j === -4 ? (i % 2 ? CL : CS) : j === 0 ? VI : (i + j) % 3 === 0 ? CS : CA); }
  for (let i = 9; i <= 15; i++) for (let j = -2; j <= 0; j++) R.pset(X(i), y - 1 + j, j === -2 && i < 13 ? CL : j === 0 ? VI : CA);
  R.pset(X(16), y - 2, CA); R.pset(X(16), y - 1, CA); R.pset(X(15), y - 2, CS);
  R.pset(X(9), y - 5, OJ); R.pset(X(10), y - 5, CS); R.pset(X(9), y - 4, CA); R.pset(X(14), y - 3, CS);
  const pa = Math.sin(t * 6) > 0 ? 1 : 0;
  for (const [i, f] of [[-4, pa], [-2, 1 - pa], [5, 1 - pa], [7, pa]]) { R.pset(X(i + f), y, CS); R.pset(X(i + f + 1), y, CA); R.pset(X(i + f), y + 1, CS); }
}

// 0 · UN CAIMÁN EN UNA TIENDA de carretera
function f_mvTienda(R, t, o) {
  f_mvFijo(R, f_mvCapa(R, 'tienda', () => {
    // el techo de placas con dos fluorescentes
    for (let y = 14; y <= 33; y++) for (let x = 116; x <= 204; x++) R.pset(x, y, (y - 14) % 6 === 0 || (x - 116) % 15 === 0 ? hex('#b8b8b0') : h(x, y, 61) > 0.9 ? hex('#d8d8d0') : hex('#e4e4dc'));
    for (const [a, b] of [[124, 148], [168, 194]]) { R.rect(a - 1, 20, b + 1, 24, hex('#9aa09a')); R.rect(a, 21, b, 23, hex('#f8fff8')); }
    // la franja de colores de la tienda (sin letras) y la pared
    R.rect(116, 34, 204, 35, hex('#f08a3a')); R.rect(116, 36, 204, 37, hex('#d84a4a')); R.rect(116, 38, 204, 38, hex('#8a2a2a'));
    for (let y = 39; y <= 108; y++) for (let x = 116; x <= 204; x++) R.pset(x, y, h(x >> 1, y >> 1, 62) > 0.9 ? hex('#d8e4dc') : hex('#e8f0e8'));
    // la góndola con cuatro baldas de productos y sus etiquetas
    R.rect(116, 40, 168, 108, hex('#9aa4ac')); R.rect(117, 41, 167, 106, hex('#d0d8dc'));
    for (const y of [54, 70, 86, 102]) { f_mvProductos(R, 118, 166, y, y); R.rect(117, y, 167, y + 1, hex('#c8ccd0')); R.rect(117, y + 2, 167, y + 2, hex('#7a8088'));
      for (let x = 121; x < 166; x += 11) { R.rect(x, y, x + 3, y + 1, hex('#f8e060')); R.pset(x + 1, y, hex('#3a3a3a')); } }
    // la nevera de bebidas: dos puertas de cristal con su luz fría y las botellas
    R.rect(171, 40, 204, 108, hex('#7a8088')); R.rect(172, 41, 204, 42, hex('#f0fcff'));
    for (const [a, b] of [[173, 187], [189, 204]]) {
      for (let y = 43; y <= 106; y++) for (let x = a; x <= b; x++) R.pset(x, y, f_mvMez(hex('#d8f0ff'), hex('#8ac8e8'), (y - 43) / 70));
      for (const y of [58, 74, 90, 106]) { R.rect(a, y, b, y, hex('#a8c0d0')); for (let x = a + 1; x < b; x += 3) { const c = hex(['#e84a4a', '#40e8f8', '#f0d040', '#5ac07a', '#ff4fa8'][(x + y) % 5]); R.rect(x, y - 8, x + 1, y - 1, c); R.pset(x, y - 8, hex('#f8f8f8')); R.pset(x, y - 9, hex('#3a3a3a')); R.pset(x + 1, y - 4, f_mvMez(c, hex('#000000'), 0.4)); } }
      R.rect(a, 43, a, 106, hex('#f8ffff')); R.rect(b - 2, 66, b - 2, 82, hex('#4a5058'));
    }
    R.rect(116, 107, 204, 110, hex('#5a6068'));
    // el suelo de baldosas, con el brillo de los fluorescentes y de la nevera
    for (let y = 111; y <= 170; y++) { const fila = Math.floor(Math.sqrt(y - 110) * 2.2), w = 10 + fila;
      for (let x = 116; x <= 204; x++) { const col = Math.floor((x - 160) / w + 20), junta = (Math.floor(Math.sqrt(y - 109) * 2.2) !== fila) || ((x - 160) % w === 0);
        let c = (col + fila) % 2 ? hex('#ece6d6') : hex('#c8c2b2'); if (junta) c = hex('#a8a292');
        if ((x > 128 && x < 144) || (x > 172 && x < 190)) c = f_mvMez(c, hex('#ffffff'), 0.3 * Math.max(0, 1 - (y - 111) / 45));
        if (x > 175 && x < 202 && y < 130) c = f_mvMez(c, hex('#a8e0ff'), 0.25);
        R.pset(x, y, c); } }
    // el mostrador de la izquierda con la caja registradora
    R.rect(116, 112, 140, 142, hex('#2a3a5a')); R.rect(116, 110, 142, 113, hex('#e8e0d0')); R.rect(116, 114, 142, 114, hex('#a89880'));
    for (let y = 118; y < 140; y += 7) R.rect(118, y, 138, y, hex('#3a4c70'));
    R.rect(117, 101, 129, 109, hex('#2a2a32')); R.rect(119, 102, 127, 107, hex('#5af08a')); R.rect(116, 108, 130, 109, hex('#4a4a52'));
    for (let y = 143; y <= 145; y++) for (let x = 116; x <= 144; x++) R.pset(x, y, f_mvMez(R.pget(x, y), hex('#000000'), 0.35));
  }));
  // un fluorescente que parpadea
  if (Math.sin(t * 13) > 0.6 && Math.sin(t * 2.1) > 0) R.rect(168, 21, 194, 23, hex('#c8d0c8'));
  R.recorte(MV_S);
  f_mvCifras(R, '99', 123, 102, hex('#1a3a1a'), hex('#3ac86a'));
  // el dependiente asoma por detrás del mostrador, con un «!»
  const asoma = Math.round(2 + Math.sin(t * 3) * 1.5), dx = 136, dy = 110 - asoma;
  for (let j = -6; j <= 0; j++) for (let i = -3; i <= 3; i++) if (Math.hypot(i, j + 3) < 3.6) R.pset(dx + i, dy + j, j < -4 ? hex('#3a2a1a') : hex('#e8b088'));
  R.pset(dx - 1, dy - 3, hex('#1a1424')); R.pset(dx + 1, dy - 3, hex('#1a1424')); R.pset(dx, dy - 1, hex('#8a3a3a'));
  for (let i = -3; i <= 3; i++) R.pset(dx + i, dy + 1, hex('#d84a4a'));
  if (Math.floor(t * 3) % 2) f_mvPicto(R, ['#', '#', '#', '.', '#'], dx + 6, dy - 12, hex('#ffe060'), hex('#3a2a00'));
  // el caimán que pasea por el pasillo, y la lata que rueda delante
  const ida = (t * 0.11) % 2, vuelve = ida > 1, cx = vuelve ? 128 + (ida - 1) * 64 : 192 - ida * 64, dir = vuelve ? 1 : -1;
  f_mvCaiman(R, cx, 138, t, dir);
  const lx = Math.round(cx + dir * (24 + ((t * 9) % 4))), ang = t * 9 * dir;
  for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (Math.hypot(i, j) <= 2.3) R.pset(lx + i, 136 + j, Math.round(Math.cos(ang) * 2) === i ? hex('#f8f8f8') : hex('#e84a4a'));
  // brillos que corren por el suelo
  for (let q = 0; q < 4; q++) { const x = Math.round(118 + ((q * 23 + t * 14) % 86)), y = 120 + q * 11; R.pset(x, y, f_mvMez(R.pget(x, y), hex('#ffffff'), 0.5)); }
  R.recorte(null);
}

// 1 · UNA PISCINA con su jaula de mosquitera, rota por donde entró el caimán
function f_mvPiscina(R, t, o) {
  f_mvFijo(R, f_mvCapa(R, 'piscina', () => {
    f_mvDeg(R, 116, 204, 14, 66, [[14, '#3a8ae0'], [40, '#6ab8f0'], [66, '#c8ecff']]);
    // los tejados y las palmeras de los vecinos
    for (let x = 116; x <= 204; x++) { const tj = 60 + Math.round(Math.abs(((x - 116) % 34) - 17) * 0.4); for (let y = tj; y <= 72; y++) R.pset(x, y, y === tj ? hex('#8a3a2a') : (x + y) % 4 === 0 ? hex('#a84a32') : hex('#c8664a')); }
    for (let y = 72; y <= 82; y++) for (let x = 116; x <= 204; x++) R.pset(x, y, (x % 9) === 0 ? hex('#c8b8a0') : hex('#f0e4d0'));
    // la casa: pared de estuco y la puerta corredera de cristal
    for (let y = 40; y <= 120; y++) for (let x = 116; x <= 142; x++) R.pset(x, y, h(x, y, 63) > 0.85 ? hex('#e0cca8') : hex('#f2e2c4'));
    R.rect(116, 38, 144, 40, hex('#7a5a4a')); R.rect(119, 74, 140, 120, hex('#6a6a6a'));
    for (let y = 75; y <= 119; y++) for (let x = 120; x <= 139; x++) R.pset(x, y, x === 129 || x === 130 ? hex('#8a8a8a') : (x - y) % 9 === 0 || (x - y) % 9 === 1 ? hex('#c8e8f0') : f_mvMez(hex('#5a8aa0'), hex('#2a4a60'), (y - 75) / 44));
    // el seto y la valla blanca del fondo del jardín
    for (let y = 83; y <= 95; y++) for (let x = 143; x <= 204; x++) { const n = h(x >> 1, y >> 1, 68);
      R.pset(x, y, y > 89 ? ((x - 143) % 5 === 0 ? hex('#b8b0a0') : y === 90 ? hex('#ffffff') : hex('#ece8dc')) : n > 0.7 ? hex('#5aa04a') : n < 0.25 ? hex('#1e4a28') : hex('#2e6a34')); }
    for (let x = 143; x <= 204; x += 9) R.pset(x + 3, 84 + (x % 3), hex('#f4a8c0'));
    // el borde de la piscina, el agua y su escalera
    for (let y = 96; y <= 111; y++) for (let x = 143; x <= 204; x++) R.pset(x, y, (x - 143) % 10 === 0 || (y - 96) % 6 === 0 ? hex('#c8b896') : hex('#ecdcb8'));
    for (let y = 112; y <= 151; y++) for (let x = 116; x <= 204; x++) R.pset(x, y, y < 114 || y > 149 ? hex('#f4f4ec') : y < 117 ? ((x >> 2) % 2 ? hex('#2a6ab0') : hex('#4a8ad0')) : f_mvMez(hex('#4ad8e0'), hex('#1a88b0'), (y - 117) / 33));
    for (let y = 106; y <= 128; y++) { R.pset(190, y, hex('#d8e0e8')); R.pset(196, y, hex('#d8e0e8')); if (y % 6 === 0) R.rect(190, y, 196, y, hex('#a8b0b8')); }
    // la terraza de abajo, con la tumbona y la toalla de rayas
    for (let y = 152; y <= 170; y++) for (let x = 116; x <= 204; x++) R.pset(x, y, (x - 116) % 12 === 0 || (y - 152) % 7 === 0 ? hex('#c8b896') : h(x, y, 64) > 0.9 ? hex('#dccaa4') : hex('#ecdcb8'));
    for (let x = 124; x <= 150; x++) { R.pset(x, 156 + Math.round((x < 132 ? (132 - x) * -0.6 : 0)), hex('#8a8a92')); if (x % 3) for (let y = 157; y <= 158; y++) R.pset(x, y + Math.round((x < 132 ? (132 - x) * -0.6 : 0)), hex('#f8f8f8')); }
    R.linea(126, 159, 126, 164, hex('#8a8a92')); R.linea(148, 159, 148, 164, hex('#8a8a92'));
    for (let x = 136; x <= 148; x++) for (let y = 154; y <= 157; y++) R.pset(x, y, (x >> 1) % 2 ? hex('#ff4fa8') : hex('#f8e098'));
    // la jaula de mosquitera: la malla agrisada, los perfiles de aluminio y el agujero roto
    for (let y = 14; y <= 111; y++) for (let x = 143; x <= 204; x++) {
      const hueco = Math.hypot((x - 184) / 9, (y - 98) / 11) < 1 + 0.15 * Math.sin(Math.atan2(y - 98, x - 184) * 7);
      if (hueco) continue;
      const c = R.pget(x, y); R.pset(x, y, (x + y) % 2 ? f_mvMez(c, hex('#5a6a70'), 0.22) : f_mvMez(c, hex('#5a6a70'), 0.12));
    }
    for (let x = 143; x <= 204; x += 15) for (let y = 14; y <= 111; y++) { R.pset(x, y, hex('#f0f4f8')); R.pset(x + 1, y, hex('#a8b0b8')); }
    for (const y of [34, 64, 92]) for (let x = 143; x <= 204; x++) { R.pset(x, y, hex('#f0f4f8')); R.pset(x, y + 1, hex('#a8b0b8')); }
    for (let a = 0; a < 6.28; a += 0.12) { const k = 1 + 0.15 * Math.sin(a * 7), x = Math.round(184 + Math.cos(a) * 9.5 * k), y = Math.round(98 + Math.sin(a) * 11 * k); R.pset(x, y, hex('#2a3438')); R.pset(x + (Math.cos(a) > 0 ? 1 : -1), y, hex('#6a7a80')); }
    for (const [a, l] of [[0.6, 4], [2.2, 3], [3.6, 5], [5.1, 3]]) for (let i = 0; i < l; i++) R.pset(Math.round(184 + Math.cos(a) * (10 - i)), Math.round(98 + Math.sin(a) * (12 - i) + i), hex('#4a5a60'));
  }));
  R.recorte(MV_S);
  // nubes y la palmera del vecino que se mece
  for (let q = 0; q < 2; q++) { const cx = Math.round(((150 + q * 50 - t * (2 + q)) % 140 + 140) % 140 + 100), cy = 24 + q * 10;
    for (let j = -4; j <= 4; j++) for (let i = -12; i <= 12; i++) if ((i * i) / 144 + (j * j) / 16 < 1 - 0.3 * h(i >> 1, j, q)) { const x = cx + i, y = cy + j; if (x > 142 && y > 60) continue; R.pset(x, y, j < -1 ? hex('#ffffff') : j < 2 ? hex('#e4f0fa') : hex('#b8d0e8')); } }
  { const sw = Math.sin(t * 1.5) * 0.2; for (let f = 0; f < 6; f++) { const a0 = -Math.PI / 2 + (f - 2.5) * 0.6 + sw; for (let i = 1; i < 12; i++) R.pset(Math.round(160 + Math.cos(a0) * i), Math.round(52 + Math.sin(a0) * i * 0.7 + i * i * 0.04), i % 2 ? hex('#2a6a3a') : hex('#3a8a4a')); }
    for (let y = 53; y <= 64; y++) R.pset(160, y, hex('#8a6a4a')); }
  // los cáusticos del agua
  for (let y = 117; y <= 149; y++) for (let x = 116; x <= 204; x++) { const v = Math.sin(x * 0.45 + t * 2 + Math.sin(y * 0.6 + t * 1.3) * 2) + Math.sin(y * 0.5 - t * 1.6 + x * 0.12); if (v > 1.45) R.pset(x, y, hex('#a8f0f4')); else if (v > 1.2) R.pset(x, y, f_mvMez(R.pget(x, y), hex('#a8f0f4'), 0.4)); }
  // el flotador de flamenco que se mece
  { const fx = 140 + Math.round(Math.sin(t * 0.7) * 4), fy = 130 + Math.round(Math.sin(t * 2) * 1);
    for (let j = -4; j <= 4; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i / 9, j / 4); if (d < 1 && d > 0.45) R.pset(fx + i, fy + j, j < -1 ? hex('#ffb0d0') : hex('#ff6aa8')); }
    for (let j = 1; j <= 12; j++) R.pset(fx + 7 + Math.round(Math.sin(j * 0.35) * 2), fy - j, hex('#ff6aa8'));
    R.rect(fx + 7, fy - 15, fx + 10, fy - 12, hex('#ff6aa8')); R.pset(fx + 11, fy - 13, hex('#2a2a2a')); R.pset(fx + 8, fy - 14, hex('#2a2a2a'));
    for (let i = -10; i <= 10; i++) R.pset(fx + i, fy + 5, f_mvMez(R.pget(fx + i, fy + 5), hex('#ffffff'), 0.35)); }
  // el caimán que asoma los ojos y el lomo, con su estela
  { const gx = Math.round(200 - ((t * 6) % 70)), gy = 140;
    for (let q = 1; q < 5; q++) { R.pset(gx + 10 + q * 3, gy - q, hex('#c8f8fc')); R.pset(gx + 10 + q * 3, gy + q, hex('#c8f8fc')); }
    for (let i = -6; i <= 10; i++) R.pset(gx + i, gy, i % 3 === 0 ? hex('#1e2a16') : hex('#3a4a2a'));
    for (let i = -8; i <= -6; i++) R.pset(gx + i, gy, hex('#3a4a2a')); R.pset(gx - 9, gy + 1, hex('#3a4a2a'));
    R.rect(gx - 2, gy - 1, gx - 1, gy - 1, hex('#3a4a2a')); R.pset(gx - 2, gy - 2, hex('#f0d040')); R.pset(gx + 2, gy - 1, hex('#3a4a2a')); R.pset(gx + 3, gy - 1, hex('#1e2a16'));
    for (let i = -10; i <= 12; i++) R.pset(gx + i, gy + 1, f_mvMez(R.pget(gx + i, gy + 1), hex('#ffffff'), 0.3)); }
  R.recorte(null);
}

// 2 · UNA PLAYA de Miami: olas que rompen, la caseta del socorrista, la sombrilla y gaviotas
function f_mvPlaya(R, t, o) {
  f_mvFijo(R, f_mvCapa(R, 'playa', () => {
    f_mvDeg(R, 116, 204, 14, 72, [[14, '#3a88e0'], [44, '#6ab8f0'], [72, '#cdeeff']]);
    // la punta con los hoteles lejanos de colores pastel
    for (let x = 116; x <= 140; x++) { const al = 4 + Math.floor(h(x >> 2, 1, 65) * 8) - Math.floor((x - 116) / 4); for (let j = 0; j < al; j++) R.pset(x, 72 - j, (x >> 2) % 2 ? hex('#f4a8c0') : hex('#9ae0c8')); }
    for (let y = 73; y <= 112; y++) for (let x = 116; x <= 204; x++) { const n = h(x >> 2, y, 66); R.pset(x, y, n > 0.9 ? hex('#8ae0e8') : f_mvMez(hex('#1a7ac0'), hex('#3ac8d0'), (y - 73) / 40)); }
    for (let y = 113; y <= 170; y++) for (let x = 116; x <= 204; x++) { const n = h(x, y, 67); R.pset(x, y, n > 0.93 ? hex('#fff4c8') : n < 0.07 ? hex('#d8c080') : y < 118 ? hex('#d8c48a') : hex('#f0dca0')); }
    // huellas y conchas
    for (let q = 0; q < 9; q++) { const x = 150 + q * 5 + (q % 2) * 2, y = 128 + q * 4; R.rect(x, y, x + 1, y + 1, hex('#c8b070')); }
    for (const [x, y] of [[124, 160], [168, 150], [198, 164]]) { R.pset(x, y, hex('#f4c8c0')); R.pset(x + 1, y, hex('#e8a8a0')); }
    // la caseta del socorrista: patas, rampa, la cabina rosa con franjas menta y el tejado
    for (const lx of [176, 196]) for (let y = 128; y <= 148; y++) { R.pset(lx, y, hex('#e8e0d0')); R.pset(lx + 1, y, hex('#a89880')); }
    R.linea(170, 148, 180, 128, hex('#c8b898'));
    for (let y = 108; y <= 128; y++) for (let x = 172; x <= 202; x++) R.pset(x, y, y === 128 ? hex('#a87888') : (y - 108) % 5 < 2 ? hex('#9ae0c8') : x > 196 ? hex('#d88aa0') : hex('#f4a8c0'));
    R.rect(178, 112, 194, 120, hex('#3a5a7a')); R.rect(179, 113, 193, 119, hex('#6a9ac0')); R.linea(180, 119, 186, 113, hex('#c8e8ff'));
    for (let x = 169; x <= 205; x++) { R.pset(x, 106, hex('#f8e098')); R.pset(x, 107, hex('#c8a858')); }
    R.linea(187, 94, 187, 105, hex('#6a6a6a'));
    // la sombrilla de rayas, la toalla y la nevera
    R.linea(132, 124, 132, 152, hex('#8a7a6a'));
    for (let j = 0; j <= 7; j++) for (let i = -16 + j; i <= 16 - j; i++) R.pset(132 + i, 125 - 7 + j, ((i + 40) >> 2) % 2 ? hex('#ff8a4a') : hex('#f8f0e0'));
    for (let y = 150; y <= 158; y++) for (let x = 120; x <= 144; x++) R.pset(x, y, ((y >> 1) % 2) ? hex('#40a8f0') : hex('#f8e098'));
    R.rect(146, 150, 154, 157, hex('#e84a4a')); R.rect(146, 150, 154, 151, hex('#f8f8f8'));
  }));
  R.recorte(MV_S);
  // nubes a dos velocidades y gaviotas
  for (let q = 0; q < 3; q++) { const cx = Math.round(((130 + q * 45 - t * (1.5 + q)) % 150 + 150) % 150 + 96), cy = 24 + q * 8, w = 12 - q * 2;
    for (let j = -4; j <= 4; j++) for (let i = -w; i <= w; i++) if ((i * i) / (w * w) + (j * j) / 16 < 1 - 0.3 * h(i >> 1, j, q + 3)) R.pset(cx + i, cy + j, j < -1 ? hex('#ffffff') : j < 2 ? hex('#e4f0fa') : hex('#b8d0e8')); }
  for (let q = 0; q < 3; q++) { const gx = Math.round(((t * (8 + q * 3) + q * 30) % 100) + 110), gy = 48 + q * 9 + Math.round(Math.sin(t * 2 + q) * 2), al = Math.sin(t * 8 + q) > 0;
    R.pset(gx, gy, hex('#f8f8f8')); for (const s of [-1, 1]) { R.pset(gx + s, gy - (al ? 1 : 0), hex('#5a6a7a')); R.pset(gx + 2 * s, gy - (al ? 2 : 0), hex('#5a6a7a')); } }
  // el velero que cruza
  { const vx = Math.round(((t * 3) % 120) + 100); for (let j = 0; j < 8; j++) for (let i = 0; i <= j * 0.6; i++) R.pset(vx + i, 74 + j, hex('#ffffff')); R.rect(vx - 2, 82, vx + 6, 83, hex('#e84a4a')); }
  // las olas: rayas de espuma que avanzan hacia la orilla, y el agua que sube y baja en la arena
  for (let q = 0; q < 4; q++) { const u = ((t * 0.35 + q / 4) % 1), y = Math.round(84 + u * 26);
    for (let x = 116; x <= 204; x++) { const on = Math.sin(x * 0.3 + q * 2 + t) > -0.3; if (on) R.pset(x, y + Math.round(Math.sin(x * 0.15 + q) * 1), u > 0.8 ? hex('#ffffff') : hex('#c8f4f8')); } }
  { const sube = Math.round(3 + Math.sin(t * 1.2) * 3); for (let x = 116; x <= 204; x++) { const y0 = 113 + Math.round(Math.sin(x * 0.2 + t) * 1); for (let y = y0; y < y0 + sube; y++) R.pset(x, y, y === y0 + sube - 1 ? hex('#ffffff') : f_mvMez(R.pget(x, y), hex('#8ae0e8'), 0.6)); } }
  // la bandera de la caseta, que ondea
  for (let i = 0; i < 7; i++) for (let j = 0; j < 4; j++) R.pset(188 + i, 94 + j + Math.round(Math.sin(t * 6 - i * 0.8) * (i / 6)), j < 2 ? hex('#e84a4a') : hex('#f8e098'));
  // un paseante pequeño por la orilla
  { const px = Math.round(((t * 7) % 110) + 100), py = 124, pie = Math.floor(t * 6) % 2;
    R.rect(px - 1, py - 9, px + 1, py - 7, hex('#e8b088')); R.rect(px - 1, py - 6, px + 1, py - 3, hex('#40a8f0')); R.pset(px - 1 + pie * 2, py - 2, hex('#e8b088')); R.pset(px + 1 - pie * 2, py - 1, hex('#e8b088')); R.pset(px, py - 10, hex('#4a2a1a')); }
  R.recorte(null);
}

// umbral del tramado ordenado 4 × 4 (transiciones tramadas limpias) y mezcla de dos colores del lienzo (0xAABBGGRR)
const g_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const g_um = (x, y) => g_BAYER[((y & 3) << 2) | (x & 3)];

function g_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// los fondos fijos: se pintan una vez en un búfer de R.nuevo() (lo que queda en VACIO es el cielo, que se pinta en cada
// fotograma) y se copian encima del cielo animado
const g_VACIO = 0x01020304, g_bufs = new Map();

function g_capa(R, clave, dibuja) {
  let b = g_bufs.get(clave);
  if (!b) { b = R.nuevo(); b.fill(g_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); g_bufs.set(clave, b); }
  return b;
}

function g_poner(R, b) { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c !== g_VACIO) B[i] = c; } }

// la paleta del interior: la caña, la tierra de marga, el dique de hierba, el hormigón y la chapa de la refinería, el
// vapor, el tren de la caña, las garzas, los postes; el resto de los encuadres añaden la suya abajo
const g_P = pal({
  k: '#1c1426', cana: '#6aa83e', canaS: '#447a2c', canaD: '#2c5426', canaL: '#9ccc5c', canaH: '#c8e488', tallo: '#b4a45a', talloS: '#8a7a40',
  rastrojo: '#c8b070', rastrojoS: '#9a8450', rastrojoL: '#e4d090', tierra: '#a8865a', tierraS: '#7a5e3c', tierraL: '#cbb084', tierraD: '#54402a',
  marga: '#d8c8a0', margaS: '#b4a07a', margaL: '#ece0c0', charco: '#8ab0d0', charcoL: '#c8e0f0',
  dique: '#6e9e4a', diqueS: '#4e7438', diqueL: '#96c266', diqueF: '#88a8a0', diqueFS: '#6a8a84', lagoF: '#6a9ac0', lagoFL: '#a8cce4',
  horm: '#cfcabc', hormS: '#a29e92', hormL: '#ebe7dc', hormD: '#6e6a62', oxido: '#a85a38', oxidoS: '#743c26', oxidoL: '#cc7a50',
  chapa: '#b6bcc2', chapaS: '#848a92', chapaL: '#dde2e6', chapaD: '#5a6068', azulT: '#4a7aa8', azulTS: '#30567a', ventana: '#34404e', ventanaL: '#f2d27a',
  vapor: '#f6f8fa', vaporS: '#d2d8e0', vaporD: '#a8b0bc', humo: '#8a8e96',
  loco: '#e8b42c', locoS: '#a87e1c', locoL: '#f8d870', vagon: '#5c626c', vagonS: '#3c4048', vagonL: '#8a909a', riel: '#c8ccd4', traviesa: '#5a4434', balasto: '#8a8078', balastoS: '#625a54',
  cosech: '#3e8a3a', cosechS: '#2a5e2a', cosechL: '#6cbc54', tractor: '#c83a2a', tractorS: '#8a2620', rueda: '#2a2a30',
  garza: '#fbfbf6', garzaS: '#c8ccd4', pico: '#f0b82a', pata: '#2a2a2a',
  poste: '#7c5c3c', posteS: '#4e3a26', posteL: '#a07e58', cable: '#3a3640', bruma: '#b4c8d0', brumaS: '#94aab0', arbolF: '#5a7a6a', arbolFS: '#46645a',
  rojoL: '#ff4a3a', rojo: '#c8302a', amarillo: '#f8d040', blanco: '#ffffff',
});

// los cielos ricos (como el del 11): [fracción de la altura hasta el horizonte, color] y los tres tonos de sus nubes
const g_CIELOS = Object.fromEntries(Object.entries({
  dia: [[0, '#3a8ade'], [0.2, '#4aa6ea'], [0.42, '#74bef2'], [0.64, '#90caf2'], [0.82, '#a8daf4'], [0.94, '#d0e8ee']],
  calor: [[0, '#4a92d8'], [0.24, '#68aee6'], [0.48, '#8cc4ec'], [0.7, '#b0d6ee'], [0.86, '#d2e6ea'], [0.95, '#ece8d8']],
  tarde: [[0, '#24225a'], [0.14, '#3a3a7a'], [0.3, '#5e3e82'], [0.45, '#a0507a'], [0.58, '#cc626a'], [0.7, '#e88a5a'], [0.83, '#f8c070'], [0.94, '#fde4a4']],
  noche: [[0, '#0c1030'], [0.3, '#141a3e'], [0.6, '#1e2650'], [0.84, '#2c3466'], [0.95, '#3a4274']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

const g_NUBES = Object.fromEntries(Object.entries({ dia: ['#a8d6f2', '#d2ecfc', '#ffffff'], calor: ['#b8d4e6', '#e2eef4', '#ffffff'], tarde: ['#7a4476', '#de8478', '#ffd4a4'], noche: ['#1a2048', '#262e58', '#343e6c'] }).map(([k, v]) => [k, v.map(hex)]));

const g_CC = pal({ estrella: '#8a94c0', estela: '#f4f8fc', estelaS: '#cfe4f4', estelaT: '#ffd8b4', estelaTS: '#f0a888', luna: '#f4ecd0', lunaS: '#c8c0a8', halo: '#fff8dc', haloT: '#ffe6a0', sol: '#fff2a8', solL: '#fffae0', solB: '#ffd890', ave: '#2a2436' });

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = [sombra, cuerpo, luz]
function g_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// el cielo rico (copiado del 11, d_cieloD): bandas con transición tramada, el sol con su halo tramado, la estela de un
// avión que se deshace, cirros lentos y cúmulos de tres tonos a varias velocidades (los cercanos, grandes y rápidos); de
// noche, estrellas que titilan y la luna. o.hor; o.modo 'dia' | 'calor' | 'tarde' | 'noche'; o.sol [x, y, r] (null:
// sin sol); o.luna; o.estela [y, pendiente] (null: sin avión); o.cumulos (5); o.sentido (1: las nubes van a la derecha)
function g_cielo(R, t, o = {}) {
  const { pset } = R, hor = o.hor ?? 96, modo = o.modo ?? 'dia', B = R.buf, P = g_CIELOS[modo], tr = 3, lim = P.map(([f]) => Math.round(f * hor)), sen = o.sentido ?? 1;
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = g_um(x, y) < p ? b : a;
  }
  const atom = (x, y) => x > 272 && y < 48;
  if (modo === 'noche') {
    for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 301) * 319), y = Math.round(h(k, 2, 301) ** 1.25 * (hor - 6)); if (atom(x, y)) continue; const tw = Math.sin(t * (1.4 + h(k, 3, 301) * 2.2) + k * 1.7);
      if (tw > -0.5) B[y * 320 + x] = tw > 0.45 ? g_P.blanco : g_CC.estrella; }
    if (o.luna !== null) { const [lx, ly, lr] = o.luna ?? [212, 26, 6];
      for (let y = ly - lr - 4; y <= ly + lr + 4; y++) for (let x = lx - lr - 4; x <= lx + lr + 4; x++) { if (y < 0 || y >= hor || x < 0 || x > 319) continue; const d = Math.hypot(x - lx, y - ly), d2 = Math.hypot(x - lx - lr * 0.55, y - ly + lr * 0.2);
        if (d <= lr && d2 > lr * 0.85) B[y * 320 + x] = d > lr - 1 || (x + y) % 5 === 0 ? g_CC.lunaS : g_CC.luna; else if (d > lr && d < lr + 4 && g_um(x, y) < (lr + 4 - d) / 8) B[y * 320 + x] = g_mezcla(B[y * 320 + x], g_CC.luna, 0.25); } }
  } else {
    const sol = o.sol === undefined ? (modo === 'tarde' ? [214, hor - 14, 12] : [226, 22, 8]) : o.sol;
    if (sol) {
      const [sx, sy, sr] = sol, gl = modo === 'tarde' ? g_CC.haloT : g_CC.halo, R2 = sr + (modo === 'tarde' ? 18 : modo === 'calor' ? 16 : 10);
      for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
        const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (g_um(x, y) < q * q) B[y * 320 + x] = g_mezcla(B[y * 320 + x], gl, 0.42); }
      if (modo === 'tarde') g_disco(R, sol, 'tarde');
    }
  }
  if (o.estela !== null && modo !== 'noche') {
    const [e0, pe] = o.estela ?? [hor * 0.45, 0.04], u = ((t + (o.fase ?? 3)) % 44) * 10 - 40, ax = Math.round(u), ay = Math.round(e0 + u * pe);
    const ce = modo === 'tarde' ? g_CC.estelaT : g_CC.estela, ce2 = modo === 'tarde' ? g_CC.estelaTS : g_CC.estelaS;
    for (let i = 3; i < 190; i++) { const x = ax - i, y = Math.round(ay - i * pe + (i > 60 ? Math.sin(i * 0.15 + t * 0.2) * 0.8 : 0)); if (x < 0 || x > 319 || y < 1 || y >= hor - 1 || atom(x, y)) continue; const d = i < 40 ? 1 : i < 120 ? 0.95 - (i - 40) / 130 : 0.33 - (i - 120) / 240;
      if (g_um(x, y) < d) B[y * 320 + x] = ce; if (i > 18 && g_um(x, y + 1) < d * 0.75) B[(y + 1) * 320 + x] = ce2; }
    if (ax >= 0 && ax < 320 && !atom(ax, ay)) { R.rect(ax - 2, ay, ax + 1, ay, g_P.blanco); if (Math.floor(t * 2.5) % 2) pset(ax + 1, ay, g_P.rojo); }
  }
  const cn = g_NUBES[modo];
  if (o.nubes !== false) {
    for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 302) * 46), x0 = sen > 0 ? ((h(k, 6, 302) * 440 + t * (0.7 + k * 0.25)) % 470) - 80 : 390 - ((h(k, 6, 302) * 440 + t * (0.7 + k * 0.25)) % 470), y = Math.max(18, Math.round(hor * (0.16 + k * 0.1)));
      for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 303) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
        pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4 && !atom(x + 3, y - 1)) pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) pset(x - 4, y + 1, cn[0]); } }
    const n = o.cumulos ?? 5;
    for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(32, hor * 0.3) + k * hor * 0.14 : Math.max(28, hor * (0.45 + (k - 2) * 0.1)));
      let x = ((h(k, 7, 302) * 470 + t * v) % 500) - 90; if (sen < 0) x = 320 - x;
      if (x + w / 2 > 270 && y - w * 0.4 < 48) continue;   // la esquina de Atom queda tranquila
      const so = o.sol === undefined ? null : o.sol; if (so && modo !== 'noche' && Math.abs(x - so[0]) < w / 2 + so[2] + 4 && Math.abs(y - so[1]) < so[2] + w * 0.35 + 3) continue;   // y el sol, despejado
      g_nube(R, Math.round(x), y, w, k, cn); }
  }
  if (modo !== 'tarde' && modo !== 'noche' && o.sol !== null) g_disco(R, o.sol ?? [226, 22, 8], 'dia');
}

// el disco del sol, con su borde y su brillo
function g_disco(R, [sx, sy, sr], modo) { R.disco(sx, sy, sr + 1, modo === 'tarde' ? g_CC.solB : g_CC.solL); R.disco(sx, sy, sr, g_CC.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec')); }

// un pájaro lejano en V que aletea (c: color)
function g_pajaro(R, x, y, t, c, k = 0) { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 9 + k * 1.7) > 0 ? -1 : 0; R.pset(x, y, c); R.pset(x - 1, y + a, c); R.pset(x + 1, y + a, c); R.pset(x - 2, y + a * 2 - (a ? 0 : -0), c); R.pset(x + 2, y + a * 2, c); }

// una garza blanca (la garceta de los campos de caña), de pie (picotea con t) o volando (aletea); dir ±1
function g_garza(R, x, y, t, k = 0, dir = 1, vuela = false) {
  const { pset } = R, P = g_P, X = (i) => Math.round(x + i * dir); y = Math.round(y);
  if (vuela) { const a = Math.sin(t * 6 + k * 2.1); for (let i = -2; i <= 2; i++) pset(X(i), y, P.garza); pset(X(3), y - 1, P.garza); pset(X(4), y - 1, P.pico); pset(X(-3), y, P.pata); pset(X(-4), y, P.pata);
    const ay = a > 0.3 ? -1 : a < -0.3 ? 1 : 0; for (let i = 0; i < 4; i++) pset(X(-i * 0.5), y - 1 - i * (ay < 0 ? 1 : 0) + i * (ay > 0 ? 1 : 0), i > 2 ? P.garzaS : P.garza); pset(X(1), y + 1, P.garzaS); return; }
  const pica = Math.sin(t * 1.3 + k * 2.7) > 0.7;
  pset(X(0), y - 2, P.garza); pset(X(1), y - 2, P.garza); pset(X(-1), y - 2, P.garzaS); pset(X(0), y - 3, P.garza); pset(X(1), y - 3, P.garza); pset(X(-1), y - 3, P.garza);
  pset(X(0), y - 1, P.pata); pset(X(1), y, P.pata); pset(X(0), y, P.pata);
  if (pica) { pset(X(2), y - 3, P.garza); pset(X(3), y - 2, P.garza); pset(X(4), y - 1, P.pico); }
  else { pset(X(2), y - 4, P.garza); pset(X(2), y - 5, P.garza); pset(X(3), y - 6, P.garza); pset(X(4), y - 6, P.pico); pset(X(5), y - 6, P.pico); }
}

// un poste de la luz de madera con su cruceta y los aisladores; devuelve el punto de donde cuelgan los cables
function g_poste(R, x, base, top) {
  const P = g_P; R.rect(x - 1, top, x + 1, base, P.poste); R.rect(x + 1, top, x + 1, base, P.posteS); R.rect(x - 1, top, x - 1, base, P.posteL);
  for (let y = top + 6; y < base; y += 7) R.pset(x, y, P.posteS);
  R.rect(x - 7, top + 3, x + 7, top + 4, P.poste); R.rect(x - 7, top + 4, x + 7, top + 4, P.posteS); for (const i of [-6, -2, 3, 6]) { R.pset(x + i, top + 2, P.horm); R.pset(x + i, top + 1, P.hormS); }
  R.linea(x - 5, top + 5, x - 1, top + 9, P.posteS); R.linea(x + 5, top + 5, x + 1, top + 9, P.posteS);
  return [x - 6, top + 1];
}

// un cable que cuelga entre dos puntos (la catenaria con su flecha)
function g_cable(R, x0, y0, x1, y1, flecha, c) { for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) { const u = (x - x0) / (x1 - x0); R.pset(x, Math.round(y0 + (y1 - y0) * u + flecha * 4 * u * (1 - u)), c); } }

// una persona pequeña de fondo (unos 10 px): k elige ropa y sombrero; anda o trabaja (brazo que sube y baja)
function g_figura(R, x, suelo, t, k = 0, dir = 1, anda = false) {
  const { pset, rect } = R, X = (i) => Math.round(x + i * dir), y = Math.round(suelo) - 10, paso = anda ? Math.floor(t * 5 + k) % 2 : 0;
  const ropa = [['#e8e0c8', '#b8ae94'], ['#4a7ab0', '#30567e'], ['#d86a4a', '#a04a32'], ['#f0c040', '#b88a20'], ['#6a9a5a', '#4a6e40'], ['#f4f4f4', '#c4c8cc']][k % 6].map(hex);
  const piel = [hex('#f2c094'), hex('#c88a5a'), hex('#8a5a3a')][k % 3], pan = hex(['#3a4a6a', '#5a4a3a', '#2a2a34'][k % 3]), som = [hex('#f0e0b0'), hex('#c83a2a'), hex('#2a4a8a'), hex('#f4f4f4')][k % 4];
  rect(Math.min(X(0), X(1)), y + 7, Math.max(X(0), X(1)), y + 9 - (paso ? 1 : 0), pan); pset(X(paso ? -1 : 2), y + 9, pan); pset(X(paso ? 2 : -1), y + 9, pan);
  pset(X(0), y + 10, g_P.k); pset(X(1), y + 10, g_P.k);
  rect(Math.min(X(-1), X(2)), y + 3, Math.max(X(-1), X(2)), y + 6, ropa[0]); pset(X(-1), y + 6, ropa[1]); pset(X(2), y + 5, ropa[1]);
  const br = anda ? 0 : Math.round(Math.sin(t * 3 + k) * 1.5); pset(X(3), y + 4 + br, piel); pset(X(-2), y + 5, piel);
  rect(Math.min(X(0), X(1)), y + 1, Math.max(X(0), X(1)), y + 2, piel); pset(X(2), y + 2, piel);
  rect(Math.min(X(-1), X(2)), y, Math.max(X(-1), X(2)), y, som); rect(Math.min(X(0), X(1)), y - 1, Math.max(X(0), X(1)), y - 1, som);
}

// a la derecha (x 140–320, y 108–148) con la cosechadora; la pared de caña a la izquierda; el camino de tierra (y 148–180)
const g_CANA = { hor: 96, suelo: 158 };

function g_canaFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, P = g_P, B = R.buf, HOR = 96;
  // la arboleda lejana del horizonte (las islas de cipreses y robles), azulada por la calima
  for (let x = 0; x < 320; x++) { const m = Math.sin(x * 0.07) + Math.sin(x * 0.19 + 2) * 0.6 + h(x >> 2, 1, 401) * 0.8, top = HOR - 2 - Math.max(0, Math.round(m * 2.2 + 1));
    for (let y = top; y < HOR; y++) pset(x, y, y === top ? P.arbolF : g_um(x, y) < 0.3 ? P.arbolFS : P.bruma); }
  // el dique del lago Okeechobee: una loma larga de hierba segada (franjas de la segadora), con la coronación de grava y
  // la esclusa de hormigón por la que se ve el agua del lago
  poligono([[-1, 79], [96, 79], [138, 96], [-1, 96]], (x, y) => { const f = ((x + y * 2) >> 3) & 1, top = y < 81; return top ? (y === 79 ? P.margaL : P.marga) : g_um(x, y) < (y - 81) / 20 ? P.diqueFS : f ? P.diqueF : g_mezcla(P.diqueF, P.diqueL, 0.3); });
  for (let x = 0; x < 96; x += 9) { pset(x, 78, P.hormS); pset(x, 77, P.hormS); }   // los hitos de la coronación
  { const x0 = 38, x1 = 58; rect(x0 - 2, 78, x1 + 2, 96, P.hormD); rect(x0 - 1, 79, x1 + 1, 96, P.horm); rect(x0, 85, x1, 96, P.lagoF);
    for (let y = 86; y < 96; y++) for (let x = x0; x <= x1; x++) if ((x + y * 3) % 7 === 0) pset(x, y, P.lagoFL);
    for (const gx of [x0 + 3, x0 + 10, x0 + 17]) { rect(gx, 79, gx + 3, 88, P.azulT); rect(gx + 3, 79, gx + 3, 88, P.azulTS); rect(gx, 79, gx + 3, 79, P.chapaL); }
    rect(x0 - 2, 76, x1 + 2, 77, P.hormS); for (let x = x0 - 2; x <= x1 + 2; x += 3) pset(x, 75, P.hormD); rect(x0 - 2, 75, x1 + 2, 75, P.chapaS); }
  // la refinería: el almacén de azúcar crudo con su tejado a dos aguas, la sala de calderas con tres chimeneas, el
  // molino con la cinta que sube la caña, los depósitos de melaza, el patio de caña con su grúa
  { // el almacén
    poligono([[130, 82], [154, 70], [178, 82]], (x, y) => ((x - 130) % 3 === 0 ? P.chapaS : y < 74 ? P.chapaL : P.chapa));
    rect(132, 82, 176, 96, P.chapa); for (let x = 132; x <= 176; x++) if (x % 3 === 0) linea(x, 82, x, 96, P.chapaS); for (let x = 134; x < 176; x += 11) { linea(x, 83, x + 1, 95, P.oxidoS); pset(x + 1, 84, P.oxido); }
    rect(146, 88, 158, 96, P.chapaD); for (let y = 88; y < 96; y += 2) rect(146, y, 158, y, P.vagonS); rect(132, 82, 176, 82, P.chapaD); }
  { // la sala de calderas: hormigón con hileras de ventanas
    rect(176, 56, 214, 96, P.k); rect(177, 57, 213, 96, P.horm); rect(210, 57, 213, 96, P.hormS); rect(177, 57, 179, 96, P.hormL);
    for (let y = 60; y < 96; y += 6) { rect(177, y - 1, 213, y - 1, P.hormS); for (let x = 181; x < 207; x += 6) { rect(x, y + 1, x + 3, y + 3, P.ventana); pset(x, y + 1, P.chapaS); } }
    for (let y = 58; y < 96; y++) for (let x = 177; x < 213; x++) if (h(x, y, 402) > 0.93) pset(x, y, P.hormS);
    rect(175, 55, 215, 56, P.hormD); rect(192, 88, 200, 96, P.chapaD); rect(193, 89, 199, 96, P.ventana); }
  for (const [cx, top, w] of [[190, 28, 3], [201, 34, 3], [209, 42, 2]]) {   // las chimeneas, con sus anillos y la escalera
    for (let y = top; y <= 56; y++) for (let i = -w; i <= w; i++) pset(cx + i, y, i === -w ? P.hormL : i >= w - 1 ? P.hormS : (y - top) % 9 === 0 ? P.hormD : (y - top) % 9 === 1 ? P.oxido : P.horm);
    pset(cx - w - 1, top, P.k); pset(cx + w + 1, top, P.k); rect(cx - w - 1, top - 1, cx + w + 1, top, P.hormD); for (let y = top + 2; y < 56; y += 2) pset(cx + w + 1, y, P.chapaD); }
  { // el molino y la cinta inclinada que sube la caña desde el patio
    rect(214, 66, 246, 96, P.k); rect(215, 67, 245, 96, P.azulT); rect(240, 67, 245, 96, P.azulTS); for (let x = 216; x < 245; x += 3) linea(x, 67, x, 96, x % 2 ? P.azulTS : P.azulT);
    rect(215, 67, 245, 68, P.chapaL); for (let x = 220; x < 240; x += 7) { rect(x, 72, x + 3, 75, P.ventana); rect(x, 82, x + 3, 85, P.ventana); }
    for (let i = 0; i <= 34; i++) { const x = 270 - i, y = Math.round(94 - i * 0.68); pset(x, y, P.chapaD); pset(x, y + 1, P.chapaS); pset(x, y - 1, P.k); if (i % 5 === 0) linea(x, y + 2, x, 96, P.chapaD); } }
  for (const [x0, x1] of [[248, 260], [262, 274]]) {   // los depósitos de melaza
    rect(x0, 80, x1, 96, P.horm); rect(x0, 80, x0 + 1, 96, P.hormL); rect(x1 - 2, 80, x1, 96, P.hormS); poligono([[x0, 80], [(x0 + x1) / 2, 76], [x1 + 1, 80]], P.hormS); linea(x0, 80, (x0 + x1) / 2, 76, P.hormL);
    for (let y = 84; y < 96; y += 4) rect(x0, y, x1, y, P.hormS); for (let y = 82; y < 96; y++) if (h(x0, y, 403) > 0.5) pset(x1 - 3, y, P.oxidoS); }
  // el patio: montones de caña cortada
  for (let x = 274; x < 312; x++) { const top = 96 - Math.round(Math.max(0, Math.sin((x - 274) / 38 * Math.PI)) * 8 + h(x, 1, 404) * 1.5);
    for (let y = top; y < 96; y++) pset(x, y, h(x, y, 405) > 0.6 ? P.tallo : h(x, y, 406) > 0.5 ? P.talloS : y === top ? P.canaL : P.rastrojoS); }
  // los campos lejanos: hileras que convergen hacia el horizonte (de verde azulado a verde)
  for (let y = HOR; y < 104; y++) for (let x = 0; x < 320; x++) { const d = y - HOR + 1, u = Math.floor((x - 200) / d * 1.4); B[y * 320 + x] = (u & 1) ? (g_um(x, y) < 0.5 ? P.canaS : P.diqueS) : (y < 99 ? g_mezcla(P.cana, P.bruma, 0.45) : P.cana); }
  // la vía del tren de la caña: el balasto, las traviesas y el carril
  for (let x = 0; x < 320; x++) { pset(x, 104, P.riel); pset(x, 105, x % 4 === 0 ? P.traviesa : P.balastoS); pset(x, 106, h(x, 1, 407) > 0.5 ? P.balasto : P.balastoS); pset(x, 107, P.balastoS); }
  // el campo segado de la derecha: el rastrojo en hileras que convergen, con restos de hoja, surcos oscuros y charcos
  for (let y = 108; y < 149; y++) for (let x = 0; x < 320; x++) { const d = y - 100, u = (x - 214) / d * 3.4, f = u - Math.floor(u);
    let c = f < 0.18 ? P.tierraS : f < 0.3 ? P.tierra : h(x, y, 408) > 0.82 ? P.rastrojoL : h(x >> 1, y, 409) > 0.6 ? P.rastrojo : P.rastrojoS;
    if (h(x, y, 410) > 0.985) c = P.canaS; B[y * 320 + x] = c; }
  for (const [cx, cy, w] of [[200, 122, 9], [262, 138, 12], [168, 114, 6]]) for (let i = -w; i <= w; i++) { const e = 1 - (i / w) ** 2; for (let j = 0; j <= Math.round(e * 1.5); j++) pset(cx + i, cy + j, (i + j) % 5 === 0 ? P.charcoL : P.charco); }
  // la pared de caña de la izquierda: el hueco oscuro de dentro y, delante, mata a mata (de atrás adelante), los tallos con
  // sus nudos y las hojas largas que se arquean; arriba les da el sol y abajo quedan en sombra
  const borde = (y) => 128 + Math.max(0, (y - 119) * 0.62), techo = (x) => 104 + x * 0.12;
  for (let y = 100; y < 150; y++) for (let x = 0; x < 150; x++) if (y >= techo(x) + 3 && x <= borde(y)) B[y * 320 + x] = g_um(x, y) < (y - techo(x)) / 50 ? P.canaD : P.canaS;
  for (let base = 122; base <= 150; base += 2) for (let x = -2; x < 150; x += 3) { const xx = x + Math.round(h(x, base, 431) * 3); if (xx > borde(base) - 2) continue;
    const top = Math.round(techo(xx) + (h(xx, base, 432) - 0.5) * 6), fr = (base - 122) / 28;
    g_matacana(R, xx, base, base - top, 0, [P.canaD, P.canaS, P.cana, P.canaL, P.canaH], 0, 0.35 + fr * 0.4, xx * 13 + base); }
  for (let y = 119; y < 150; y++) { const x = Math.round(borde(y)); pset(x, y, P.canaD); pset(x + 1, y, g_um(x, y) < 0.5 ? P.canaD : P.canaS); }
  // el camino de tierra: marga clara con dos rodadas, piedrecillas, un charco con el cielo y la hierba de la cuneta
  for (let y = 148; y < 180; y++) for (let x = 0; x < 320; x++) { const r1 = Math.abs(y - 161 - Math.sin(x * 0.03) * 1.5), r2 = Math.abs(y - 172 - Math.sin(x * 0.025 + 1) * 1.5);
    let c = y < 151 ? (h(x, y, 412) > 0.5 ? P.diqueS : P.dique) : r1 < 2 || r2 < 2.5 ? (h(x, y, 413) > 0.7 ? P.tierraS : P.tierra) : h(x, y, 414) > 0.93 ? P.margaS : h(x >> 1, y >> 1, 415) > 0.7 ? P.margaL : P.marga;
    if (y >= 151 && (r1 < 0.6 || r2 < 0.6) && (x & 3) === 0) c = P.tierraD;
    B[y * 320 + x] = c; }
  for (let x = 0; x < 320; x += 2) { const hh = 1 + Math.round(h(x, 2, 416) * 3); for (let j = 0; j < hh; j++) pset(x + (j > 1 ? 1 : 0), 150 - j, j === hh - 1 ? P.diqueL : P.dique); }
  // la hierba del lomo entre las rodadas, las huellas del dibujo de los neumáticos y los trozos de caña que se caen de
  // los camiones
  for (let x = 0; x < 320; x++) { const y = Math.round(166 + Math.sin(x * 0.028 + 0.5) * 1.5); if (h(x, 3, 433) > 0.45) { pset(x, y, P.dique); if (h(x, 4, 433) > 0.6) pset(x, y - 1, P.diqueL); if (h(x, 5, 433) > 0.8) pset(x, y + 1, P.diqueS); } }
  for (let x = 0; x < 320; x += 3) { const y1 = Math.round(161 + Math.sin(x * 0.03) * 1.5), y2 = Math.round(172 + Math.sin(x * 0.025 + 1) * 1.5); pset(x, y1 - 1, P.tierraD); pset(x + 1, y1 + 1, P.tierraD); pset(x, y2 - 1, P.tierraD); pset(x + 1, y2 + 1, P.tierraD); }
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 6, 434) * 300) + 8, y = 153 + Math.round(h(k, 7, 434) * 24), l = 3 + (k % 3), d = k % 2 ? 1 : -1;
    for (let i = 0; i < l; i++) { pset(x + i, y + Math.round(i * 0.3 * d), i === 0 || i === l - 1 ? P.talloS : P.tallo); pset(x + i, y + 1 + Math.round(i * 0.3 * d), P.tierraS); } pset(x + l, y + Math.round(l * 0.3 * d) - 1, P.canaS); }
  // un buzón rural en su poste y un mojón de riego (el tubo y la rueda de la compuerta) a la derecha, junto a la cuneta
  { const x = 274; rect(x, 134, x + 1, 151, P.poste); rect(x + 1, 134, x + 1, 151, P.posteS); rect(x - 4, 129, x + 6, 134, P.k); rect(x - 3, 130, x + 5, 133, P.chapa); rect(x - 3, 130, x + 5, 130, P.chapaL); rect(x + 5, 130, x + 5, 133, P.chapaS); rect(x + 6, 127, x + 6, 131, P.rojo); pset(x + 7, 127, P.rojo); pset(x + 7, 128, P.rojo); }
  { const x = 290; rect(x - 6, 146, x + 6, 151, P.hormS); rect(x - 6, 146, x + 6, 146, P.hormL); disco(x, 147, 2.4, P.k); disco(x, 147, 1.6, P.hormD); rect(x - 1, 137, x + 1, 146, P.azulT); rect(x + 1, 137, x + 1, 146, P.azulTS); R.anillo(x + 0.5, 136.5, 4, P.rojo); R.linea(x - 3, 136, x + 3, 136, P.rojo); R.linea(x, 133, x, 139, P.rojo); }
  // los postes de la luz junto al camino, con los cables
  const a = g_poste(R, 112, 150, 64), b = g_poste(R, 306, 150, 74);
  g_cable(R, a[0], a[1], b[0], b[1], 6, P.cable); g_cable(R, a[0] + 12, a[1], b[0] + 12, b[1], 6, P.cable); g_cable(R, -1, 70, a[0], a[1], 3, P.cable); g_cable(R, -1, 70, a[0] + 12, a[1], 3, P.cable);
}

function g_cana(R, t, o) {
  const { rect, pset, linea, disco } = R, P = g_P;
  g_cielo(R, t, { hor: 96, modo: 'calor', sol: [252, 38, 9], estela: [40, 0.05], cumulos: 5, sentido: -1 });
  for (let k = 0; k < 3; k++) { const x = 300 - ((t * 7 + k * 60) % 380), y = 56 + k * 5 + Math.sin(t + k) * 2; if (x < 270 || y > 48) g_pajaro(R, x, y, t, P.arbolFS, k); }
  g_poner(R, g_capa(R, 'interior|cana', () => g_canaFijo(R)));
  // el vapor de las chimeneas: bocanadas que suben, crecen y se deshacen hacia la derecha (lejos de la barra del año)
  for (const [cx, top, sem] of [[190, 28, 0], [201, 34, 1], [209, 42, 2]]) for (let k = 0; k < 8; k++) { const u = ((t * 0.16 + k / 8 + sem * 0.37) % 1), y = top - 3 - u * 17, x = cx + u * 20 + u * u * 10, r = 2.5 + u * (sem === 2 ? 4 : 6.5); const c = u > 0.75 ? P.vaporD : u > 0.45 ? P.vaporS : P.vapor;
    disco(Math.round(x), Math.round(y + 1), r, u > 0.5 ? P.vaporD : P.vaporS); disco(Math.round(x - 0.5), Math.round(y), r * 0.8, c); }
  if (Math.floor(t * 1.5) % 2) { pset(190, 27, P.rojoL); pset(201, 33, P.rojoL); }   // las balizas rojas
  // la grúa del patio que coge caña: el mástil, la pluma que gira y la garra que sube y baja
  { const ang = Math.sin(t * 0.5) * 0.5, bx = 296, by = 64, px = Math.round(bx - Math.cos(ang) * 24), py = Math.round(by + 4 + Math.sin(ang) * 3);
    rect(bx - 1, by, bx + 1, 96, P.loco); rect(bx + 1, by, bx + 1, 96, P.locoS); for (let y = by + 2; y < 96; y += 3) pset(bx, y, P.locoS); rect(bx - 3, 92, bx + 4, 96, P.locoS);
    linea(bx, by, px, py, P.loco); linea(bx, by + 1, px, py + 1, P.locoS); const g = Math.round(84 + Math.sin(t * 1.1) * 4); linea(px, py, px, g, P.cable);
    rect(px - 2, g, px + 2, g + 2, P.chapaD); pset(px - 2, g + 3, P.chapaD); pset(px + 2, g + 3, P.chapaD); if (Math.sin(t * 1.1) > 0) { pset(px - 1, g + 3, P.tallo); pset(px + 1, g + 3, P.canaL); } }
  // dos operarios pequeños junto al almacén
  g_figura(R, 166 + Math.sin(t * 0.4) * 6, 96, t, 3, Math.cos(t * 0.4) > 0 ? 1 : -1, true); g_figura(R, 222, 96, t, 5, -1, false);
  // el tren de la caña: la locomotora amarilla y los vagones de rejilla cargados, que cruzan despacio
  { const x0 = ((t * 9 + 330) % 600) - 280, rueda = Math.floor(t * 6) % 2;
    for (let v = 0; v < 9; v++) { const x = Math.round(x0 - v * 25); if (x > 330 || x < -30) continue;
      rect(x, 97, x + 22, 102, P.vagon); rect(x, 102, x + 22, 102, P.vagonS); for (let i = 1; i < 22; i += 3) linea(x + i, 97, x + i, 101, P.vagonL); rect(x, 97, x + 22, 97, P.vagonL);
      for (let i = 0; i <= 22; i++) { const top = 93 - Math.round(h(i, v, 418) * 2.5); for (let y = top; y < 97; y++) pset(x + i, y, (i + y + v) % 4 === 0 ? P.talloS : h(i, y + v, 419) > 0.55 ? P.tallo : P.canaS); if (h(i, v, 420) > 0.7) pset(x + i, top - 1, P.canaL); }
      for (const wx of [x + 3, x + 18]) { disco(wx, 103, 1.6, P.rueda); pset(wx + (rueda ? 1 : 0), 103, P.chapaS); } }
    const lx = Math.round(x0 + 25); if (lx < 330) { rect(lx, 94, lx + 24, 102, P.k); rect(lx + 1, 95, lx + 23, 101, P.loco); rect(lx + 1, 95, lx + 23, 96, P.locoL); rect(lx + 1, 100, lx + 23, 101, P.locoS);
      rect(lx + 14, 88, lx + 22, 95, P.k); rect(lx + 15, 89, lx + 21, 95, P.loco); rect(lx + 16, 90, lx + 20, 92, P.ventana); pset(lx + 16, 90, P.charcoL);
      for (let i = 2; i < 13; i += 4) linea(lx + i, 96, lx + i + 2, 99, P.locoS); rect(lx + 23, 97, lx + 24, 98, Math.floor(t * 3) % 2 ? P.amarillo : P.blanco);
      for (const wx of [lx + 4, lx + 11, lx + 19]) { disco(wx, 103, 1.6, P.rueda); pset(wx + (rueda ? 1 : 0), 103, P.chapaS); }
      for (let k = 0; k < 4; k++) { const u = (t * 1.5 + k / 4) % 1; disco(Math.round(lx + 6 - u * 10), Math.round(92 - u * 7), 1 + u * 2, u > 0.6 ? P.humo : P.vaporD); } } }
  // la cosechadora que avanza por el campo segado escupiendo trozos de caña al remolque del tractor, y su polvo
  { const cx = Math.round(290 - ((t * 5 + 70) % 170)), cy = 132;
    for (let k = 0; k < 10; k++) { const u = (t * 0.8 + k / 10) % 1, dx = cx + 18 + u * 26, dy = cy - 2 - Math.sin(u * 3) * 3 - u * 5; if (dx < 320) disco(Math.round(dx), Math.round(dy), 1 + u * 3, u > 0.6 ? g_mezcla(P.marga, P.bruma, 0.4) : P.margaS); }
    rect(cx, cy - 10, cx + 18, cy - 2, P.k); rect(cx + 1, cy - 9, cx + 17, cy - 3, P.cosech); rect(cx + 1, cy - 9, cx + 17, cy - 8, P.cosechL); rect(cx + 1, cy - 4, cx + 17, cy - 3, P.cosechS);
    rect(cx + 10, cy - 16, cx + 16, cy - 10, P.k); rect(cx + 11, cy - 15, cx + 15, cy - 11, P.ventana); pset(cx + 11, cy - 15, P.charcoL); pset(cx + 13, cy - 17, Math.floor(t * 4) % 2 ? P.amarillo : P.locoS);
    for (let i = 0; i < 4; i++) pset(cx - 1 - i, cy - 6 + i, P.cosechS); rect(cx - 5, cy - 3, cx - 1, cy - 1, P.chapaD); // las cuchillas delante
    linea(cx + 4, cy - 10, cx - 4, cy - 20, P.cosechS); linea(cx + 5, cy - 10, cx - 3, cy - 20, P.cosech); rect(cx - 6, cy - 22, cx - 2, cy - 20, P.cosechS);   // el elevador
    rect(cx + 1, cy - 2, cx + 17, cy, P.rueda); for (let i = 2; i < 17; i += 2) pset(cx + i + (Math.floor(t * 8) % 2), cy - 1, P.chapaS);
    const tx = cx - 8; rect(tx - 16, cy + 1, tx + 2, cy + 7, P.k); rect(tx - 15, cy + 2, tx + 1, cy + 6, P.vagonL); for (let i = -14; i < 1; i += 2) for (let j = 2; j < 5; j++) pset(tx + i, cy + j, h(i, j + Math.floor(t), 421) > 0.5 ? P.tallo : P.canaS);
    rect(tx + 3, cy + 1, tx + 10, cy + 6, P.tractor); rect(tx + 3, cy + 1, tx + 10, cy + 1, P.rojoL); rect(tx + 6, cy - 4, tx + 9, cy + 1, P.k); rect(tx + 7, cy - 3, tx + 8, cy, P.ventana);
    disco(tx + 9, cy + 7, 2.2, P.rueda); disco(tx + 4, cy + 8, 1.4, P.rueda); disco(tx - 12, cy + 8, 1.4, P.rueda); disco(tx - 3, cy + 8, 1.4, P.rueda);
    for (let k = 0; k < 6; k++) { const gx = cx + 26 + k * 9 + Math.round(h(k, 3, 422) * 5), vuela = Math.sin(t * 0.7 + k * 1.9) > 0.85; if (gx > 318) continue; g_garza(R, gx, vuela ? cy - 9 - k % 3 * 2 : cy + 2 + (k % 3) * 3, t, k, k % 2 ? 1 : -1, vuela); } }
  // garzas que cruzan volando sobre la caña
  for (let k = 0; k < 2; k++) { const x = ((t * (11 + k * 3) + k * 170) % 420) - 50, y = 78 + k * 8 + Math.sin(t * 0.8 + k) * 2; g_garza(R, x, y, t, k + 7, 1, true); }
  // las puntas de la pared de caña, que se mecen con el viento (hojas que se arquean, con la luz arriba)
  for (let x = 0; x < 128; x += 3) { const top = Math.round(104 + x * 0.12) + 2, s = Math.sin(t * 1.7 + x * 0.21) * 1.6 + Math.sin(t * 0.6 + x * 0.05), d = (x % 2) ? 1 : -1, l = 5 + (x * 7) % 4;
    for (let i = 0; i <= l; i++) { const f = i / l; pset(Math.round(x + d * i * 0.8 + s * f), Math.round(top - Math.sin(f * 2.2) * 4 + f * f * 3), f > 0.75 ? P.canaS : i % 2 ? P.canaL : P.canaH); } }
  return { suelo: 158, libre: [20, 260], horizonte: 96, sol: [252, 38], refineria: [130, 26, 300, 96], dique: [0, 79, 138, 96], tren: 104, camino: [0, 320, 150, 180] };
}

// las cañas del primer término (delante de los actores), unas matas a los dos lados que se mecen, sin entrar en libre
// (sus hojas llegan como mucho a x 18 y desde x 294); xs: los tramos de x
function g_canaDelante(R, t, xs = [[-14, 2], [310, 334]], base = 182, alto = 86) {
  const P = g_P, T5 = [P.canaD, P.canaS, P.cana, P.canaL, P.canaH];
  for (const [x0, x1] of xs) for (let x = x0, k = 0; x <= x1; x += 5, k++) g_matacana(R, x + Math.round(h(x, 1, 430) * 3), base, alto - Math.round(h(x, 2, 430) * 26), t, T5, 1, 1.6, x * 7 + 3);
}

// una mata de caña de azúcar: el tallo con sus nudos (rayas oscuras) que se cimbrea con t, y las hojas largas que salen
// arriba y se arquean hacia fuera y hacia abajo, en cinco tonos c = [D, S, M, L, H]; viento 0–1; escala (largo de las
// hojas); sem cambia la mata
function g_matacana(R, x, base, alto, t, c, viento = 1, esc = 1, sem = 0) {
  const { pset } = R, s = (Math.sin(t * 1.3 + sem * 0.7) * 2 + Math.sin(t * 2.9 + sem) * 0.6) * viento, top = base - alto, X = (y) => Math.round(x + s * ((base - y) / alto) ** 2);
  const grueso = esc > 1.2;
  for (let y = base; y >= top; y--) { const xx = X(y), nudo = (y - top + sem) % Math.max(4, Math.round(alto / 7)) === 0; pset(xx, y, nudo ? g_P.talloS : g_P.tallo); if (grueso) { pset(xx + 1, y, nudo ? g_P.k : g_P.talloS); pset(xx - 1, y, nudo ? g_P.talloS : c[3]); } }
  const n = grueso ? 7 : 5;
  for (let k = 0; k < n; k++) { const y0 = top + Math.round(alto * (0.04 + k * 0.09)), d = (k + sem) % 2 ? 1 : -1, l = Math.round((6 + ((k * 5 + sem) % 5)) * esc), x0 = X(y0), cae = 0.5 + h(k, sem, 435) * 0.6;
    for (let i = 0; i <= l; i++) { const f = i / l, xx = Math.round(x0 + d * i * (1 - f * 0.25) + s * f * 0.6), yy = Math.round(y0 - Math.sin(f * 2.4) * l * 0.35 + f * f * l * cae * 0.6 + Math.sin(t * 2.2 + sem + k) * f * viento);
      pset(xx, yy, f > 0.8 ? c[1] : i % 3 === 0 ? c[4] : c[3]); if (f < 0.75) pset(xx, yy + 1, f > 0.5 ? c[1] : c[2]); if (grueso && f < 0.55) pset(xx, yy + 2, c[1]); } }
  pset(X(top), top - 1, c[4]); pset(X(top), top - 2, c[3]);
}

// y se aleja curvándose hacia la derecha (el punto de fuga fuera, en x 320, y 92); detrás y a la izquierda, el lago inmenso
// hasta el horizonte (y 84); abajo a la derecha, el talud del lado de tierra, el canal y la caña
const g_dqT = (x) => 138 - 46 * Math.pow(Math.max(0, x) / 320, 1.8), g_dqB = (x) => 182 - 88 * Math.pow(Math.max(0, x) / 320, 2.6);

function g_diqueFijo(R) {
  const { rect, pset, linea, disco } = R, P = g_P, B = R.buf;
  // a la derecha, más allá del dique, la tierra: la caña lejana, una arboleda y una chimenea de la refinería que humea
  for (let x = 200; x < 320; x++) { const top = 86 + Math.round(h(x >> 2, 1, 440) * 2); for (let y = top; y < 100; y++) if (y > g_dqT(x) - 4 || x > 296) B[y * 320 + x] = y === top ? P.arbolF : y < 89 ? P.bruma : (x + (y >> 1)) % 3 ? g_mezcla(P.cana, P.bruma, 0.35) : P.canaS; }
  // el talud del lado del lago: escollera de piedras grises justo bajo el borde de la coronación
  for (let x = 0; x < 300; x++) { const yt = Math.round(g_dqT(x)), alto = Math.max(2, Math.round(6 * (yt - 84) / 56));
    for (let j = 1; j <= alto; j++) { const y = yt - j, q = h(x >> 1, y >> 1, 441); pset(x, y, q > 0.7 ? P.hormL : q > 0.35 ? P.hormS : P.hormD); }
    if (h(x, 2, 442) > 0.6) pset(x, yt - alto - 1, P.hormD); }
  // la coronación: grava clara con dos rodadas que fugan hacia la curva, piedrecillas y bordes de hierba
  for (let y = 86; y < 180; y++) for (let x = 0; x < 320; x++) { const yt = g_dqT(x), yb = g_dqB(x); if (y < yt || y > yb) continue;
    const u = (y - yt) / Math.max(1, yb - yt), r = Math.abs(u - 0.32) < 0.06 || Math.abs(u - 0.72) < 0.07, esc = 1 + (y - 86) / 30;
    let c = u < 0.06 || u > 0.94 ? (h(x, y, 443) > 0.5 ? P.dique : P.diqueL) : r ? (h(x, y, 444) > 0.6 ? P.tierraS : P.tierra) : h(x >> (esc > 3 ? 1 : 0), y, 445) > 0.88 ? P.margaS : h(x, y, 446) > 0.8 ? P.margaL : P.marga;
    if (u > 0.06 && u < 0.94 && h(x, y, 447) > 0.985) c = P.hormS; B[y * 320 + x] = c; }
  for (let x = 0; x < 300; x += 2) { const yt = Math.round(g_dqT(x)); pset(x, yt, P.diqueL); if (h(x, 3, 448) > 0.5) pset(x, yt - 1, P.dique); }
  // el talud del lado de tierra (hierba segada a franjas), el canal de borde con su agua quieta y, abajo, la caña
  for (let x = 0; x < 320; x++) { const yb = g_dqB(x); for (let y = Math.floor(yb) + 1; y < 180; y++) { const d = y - yb, an = 2 + (y - 90) * 0.07;
    const ca = an + 3 + (y - 90) * 0.05, w = 2.2 + (y - 90) * 0.09, q = (d - ca) / w, fr = q - Math.floor(q), hj = h(x >> 1, y, 449);
    let c; if (d < an) c = ((x + y * 2) >> 2) & 1 ? P.dique : P.diqueS; else if (d < ca) c = d < an + 1 ? P.diqueS : (x + y) % 9 === 0 ? P.charcoL : P.lagoF;
    else c = fr < 0.22 ? (hj > 0.4 ? P.canaL : P.canaH) : fr < 0.5 ? (hj > 0.7 ? P.canaL : P.cana) : fr < 0.8 ? (hj > 0.8 ? P.cana : P.canaS) : P.canaD;
    B[y * 320 + x] = c; } }
  for (let base = 150; base < 186; base += 4) for (let x = 200; x < 326; x += 5) { const xx = x + Math.round(h(x, base, 449) * 4), yb = g_dqB(xx), an = 2 + (base - 90) * 0.07;
    if (base < yb + an + 8 + (base - 90) * 0.05) continue; const e = (base - 90) / 90; g_matacana(R, xx, base, Math.round(12 + e * 22), 0, [P.canaD, P.canaS, P.cana, P.canaL, P.canaH], 0, 0.5 + e * 0.6, xx + base * 7); }
  // un poste de kilómetro blanco con su número en el borde, y un banco de madera de cara al lago
  { const x = 238, y = Math.round(g_dqT(x)) + 4; rect(x, y - 9, x + 3, y, P.k); rect(x + 1, y - 8, x + 2, y, P.blanco); pset(x + 2, y - 8, P.hormS); rect(x + 1, y - 7, x + 2, y - 6, P.azulT); }
  { const x = 16, y = 142; rect(x, y - 6, x + 22, y - 5, P.poste); rect(x, y - 6, x + 22, y - 6, P.posteL); rect(x, y - 10, x + 22, y - 9, P.poste); rect(x, y - 10, x + 22, y - 10, P.posteL); for (const lx of [x + 2, x + 19]) { rect(lx, y - 5, lx + 1, y, P.posteS); rect(lx, y - 9, lx, y - 6, P.posteS); } }
}

function g_dique(R, t, o) {
  const { pset, linea, disco, rect } = R, P = g_P, B = R.buf;
  g_cielo(R, t, { hor: 84, modo: 'dia', sol: [56, 36, 8], estela: [30, 0.03], cumulos: 5 });
  // el lago: del azul brumoso del horizonte al azul hondo de cerca, olas en perspectiva (más juntas lejos) que se mueven,
  // el reflejo de las nubes y el cabrilleo del sol en una columna bajo él
  const L = [hex('#a8cce0'), hex('#86b4d4'), hex('#6aa0c8'), hex('#5290bc'), hex('#3e7cae'), hex('#326aa0')], nL = L.length - 1;
  for (let y = 84; y < 141; y++) { const d = (y - 84) / 56, f = y * 320, fase = t * (1 + d * 1.5);
    for (let x = 0; x < 320; x++) { const v = Math.sin((x + Math.sin(y * 1.7 + t * 0.6) * (1 + d * 4)) * (0.5 / (0.25 + d * 1.5)) + y * 2.3 - fase * 2) + Math.sin(x * 0.03 + y * 0.9 + t * 0.4) * 0.4;
      let c = L[Math.max(0, Math.min(nL, Math.floor(d * nL * 1.15 + (g_um(x, y) - 0.5) * 0.9)))]; if (v > 1.15) c = d < 0.25 ? L[0] : L[1]; else if (v < -1.2) c = L[Math.min(nL, Math.floor(d * nL) + 1)];
      if (v > 0.5 && Math.abs(x - 56) < 3 + d * 16 && h(x, y, Math.floor(t * 4)) > 0.8) c = h(x, y, 9) > 0.5 ? P.blanco : hex('#fff4c0');
      B[f + x] = c; } }
  // lejos: un velero y la isla baja del horizonte; una garcilla en un poste de canal
  { const vx = Math.round(((t * 1.6 + 40) % 360) - 20); rect(vx - 3, 84, vx + 3, 84, P.blanco); linea(vx, 83, vx, 76, P.chapaD); for (let j = 0; j < 7; j++) rect(vx + 1, 77 + j, vx + 1 + Math.round(j * 0.6), 77 + j, P.blanco); }
  for (let x = 120; x < 166; x++) { const top = 83 - Math.round(Math.max(0, Math.sin((x - 120) / 46 * Math.PI)) * 2.5 + h(x >> 1, 4, 450)); for (let y = top; y <= 83; y++) pset(x, y, y === top ? P.arbolF : P.bruma); }
  { const x = 186, y = 108; rect(x, y - 14, x + 1, y + 2, P.poste); rect(x - 3, y - 18, x + 4, y - 13, P.k); rect(x - 2, y - 17, x + 3, y - 14, P.rojo); R.numero('7', x + 1, y - 13, { color: P.blanco, centro: true, sombra: false, fina: true });
    for (let i = -3; i <= 4; i++) if (Math.sin(t * 2 + i) > 0) pset(x + i, y + 3, L[0]); }
  // la lancha de pesca que cruza despacio con su estela
  { const bx = Math.round(320 - ((t * 7 + 90) % 380)), by = 100; for (let i = 0; i < 26; i++) { const xx = bx + 10 + i, a = 1 - i / 26; if (h(i, Math.floor(t * 4), 451) < a) { pset(xx, by + 1 + (i >> 3), P.blanco); pset(xx, by - (i >> 4), L[0]); } }
    rect(bx - 6, by - 2, bx + 8, by, P.blanco); rect(bx - 5, by + 1, bx + 7, by + 1, P.azulTS); pset(bx - 7, by - 2, P.blanco); rect(bx + 2, by - 6, bx + 4, by - 3, P.k); rect(bx + 2, by - 6, bx + 4, by - 6, P.rojo); rect(bx + 9, by - 3, bx + 9, by, P.chapaD); }
  // los pelícanos en fila que planean, y gaviotas
  for (let k = 0; k < 4; k++) { const x = ((t * 9 + k * 9) % 400) - 40, y = 62 + k * 2 + Math.sin(t * 0.7 + k) * 1.2, a = Math.sin(t * 3 + k) > 0.5 ? -1 : 0;
    rect(Math.round(x) - 3, Math.round(y) + a, Math.round(x) + 3, Math.round(y) + a, P.hormS); rect(Math.round(x) - 1, Math.round(y), Math.round(x) + 1, Math.round(y), P.hormD); pset(Math.round(x) + 2, Math.round(y) - 1, P.hormD); pset(Math.round(x) + 3, Math.round(y), P.pico); }
  g_poner(R, g_capa(R, 'interior|dique', () => g_diqueFijo(R)));
  // los pescadores sentados en sus cubos al borde, con la caña, el sedal y el corcho que sube y baja
  for (const [x, k, l] of [[64, 1, 16], [132, 4, 12], [196, 2, 7]]) { const y = Math.round(g_dqT(x)) + 2, e = (y - 84) / 56, sc = 0.6 + e * 0.4;
    rect(x - 2, y - 3, x + 2, y, P.chapaS); rect(x - 2, y - 3, x + 2, y - 3, P.chapaL); g_figura(R, x, y - 3 + Math.round(3 * (1 - sc)), t, k, -1, false);
    const tx = x - Math.round(l * 0.9), ty = y - Math.round(l * 0.7); linea(x - 2, y - 7, tx, ty, P.posteS); const cy = Math.round(g_dqT(tx) - 7 - l * 0.4 + Math.sin(t * 2 + x) * 0.8);
    linea(tx, ty, tx - 2, cy, P.chapaL); pset(tx - 2, cy, P.rojoL); pset(tx - 2, cy + 1, P.blanco); }
  // la hierba de los bordes, que se mece
  for (let x = 0; x < 300; x += 3) { const yt = Math.round(g_dqT(x)), s = Math.round(Math.sin(t * 2 + x * 0.3)); pset(x + s, yt - 1, P.diqueL); pset(x, yt - 2 + (x % 2), P.dique); }
  for (let x = 150; x < 320; x += 3) { const yb = Math.round(g_dqB(x)), s = Math.round(Math.sin(t * 2 + x * 0.3)); pset(x + s, yb + 1, P.diqueL); }
  // una garceta en el canal de borde
  g_garza(R, 296, 112 + Math.round(Math.sin(t * 0.3)), t, 3, -1, false);
  return { suelo: 154, libre: [30, 195], horizonte: 84, sol: [56, 36], lago: [0, 84, 300, 140], camino: [0, 320, 140, 180], banco: [27, 142], pescadores: [[64, 138], [132, 133]] };
}

// la hierba alta del borde del camino en el primer término (delante de los actores), abajo a la izquierda
function g_diqueDelante(R, t) {
  const P = g_P; for (let x = -2; x < 26; x += 2) { const l = 8 + Math.round(h(x, 1, 452) * 10), s = Math.sin(t * 1.8 + x * 0.4) * 2;
    for (let j = 0; j < l; j++) { const f = j / l; R.pset(Math.round(x + s * f * f + (x % 4 ? f * 2 : -f * 2)), 180 - j, f > 0.8 ? P.diqueL : j % 3 ? P.dique : P.diqueS); } }
}

// en su poste (x 146), la playa y el mar al fondo (horizonte y 96) con el muelle, la gasolinera a la derecha (marquesina
// x 196–300, surtidores en x 214 y 246, la tienda x 262–320) y el aparcamiento de asfalto agrietado (y 150–180)
const g_Q = pal({
  motel: '#8ccfc2', motelS: '#5e9e94', motelL: '#b6e2d8', motelP: '#dcebe2', puerta: '#e88a6a', puertaS: '#b05a44', moldura: '#f2ead8', molduraS: '#c8bea8',
  asfalto: '#6c6c72', asfaltoS: '#525258', asfaltoL: '#8a8a90', raya: '#e4dcbc', arena: '#f2e6c4', arenaS: '#d4c49a', arenaL: '#fff8e2',
  mar: '#3ab8c8', marS: '#1e8a9e', marL: '#7ad8e0', espuma: '#f4fcff', marq: '#d84a3a', marqS: '#9a2e26', marqL: '#f07a5a',
  neonR: '#ff4fa8', neonRL: '#ffc0e0', neonC: '#40e8f8', neonCL: '#c8fcff', neonOff: '#5a4a58', caja: '#2a2234', cajaS: '#1a1424',
  pickup: '#b85a3a', pickupS: '#7e3a26', pickupL: '#dc8a64', cromo: '#d8dce0', cristal: '#4a6a8a', cristalL: '#a8d0e8',
  sabal: '#4a8a3a', sabalS: '#2e6228', sabalL: '#7ab45a', tronco: '#8a7a64', troncoS: '#5e5244', perro: '#c89058', perroS: '#94643a',
});

// una palmera sabal (la palmera del estado): el tronco con las bases de las hojas cruzadas y la copa redonda de abanicos
// que se mecen; s: escala
function g_sabal(R, x, base, alto, t, s = 1, sem = 0) {
  const { pset } = R, Q = g_Q, m = Math.sin(t * 1.1 + sem) * 1.2, top = base - alto, X = (y) => Math.round(x + ((base - y) / alto) * (1.5 + m) * s);
  for (let y = base; y >= top; y--) { const xx = X(y), w = Math.max(1, Math.round(2 * s)); for (let i = -w; i <= w; i++) pset(xx + i, y, i === -w ? Q.troncoS : i === w ? Q.troncoS : ((y + i * 2 + sem) % 4 === 0 ? Q.troncoS : Q.tronco)); }
  const cx = X(top), cy = top, n = 16;
  for (let capa = 0; capa < 2; capa++) for (let k = 0; k < n; k++) { const a = -Math.PI * (k + 0.5 * capa) / (n - 1) + Math.PI * 0.1 * (capa ? 1 : -1) + Math.sin(t * 1.7 + k + sem) * 0.05, l = (9 + (k * 7 + sem) % 4) * s * (capa ? 0.85 : 1);
    const c = capa ? Q.sabalL : Q.sabal, cS = capa ? Q.sabal : Q.sabalS;
    for (let d = 2; d <= l; d++) { const f = d / l, xx = Math.round(cx + Math.cos(a) * d), yy = Math.round(cy + Math.sin(a) * d * 0.8 + f * f * 4 * s); pset(xx, yy, f > 0.7 ? cS : c);
      if (f > 0.55) { pset(xx + (Math.cos(a) > 0 ? 1 : -1), yy + 1, cS); pset(xx, yy + 1, c); } } }
  for (let k = 0; k < 6; k++) { const a = Math.PI * (0.15 + k * 0.14), l = 6 * s; for (let d = 2; d < l; d++) pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), d > l - 2 ? Q.troncoS : Q.sabalS); }
  R.disco(cx, cy, 2 * s, Q.sabalS);
}

// una camioneta pick-up vieja de lado (x: el centro; dir: hacia dónde mira), con la pintura gastada y algo en la caja
function g_pickup(R, x, suelo, dir = 1, Q = g_Q) {
  const { rect, pset, disco } = R, X = (i) => Math.round(x + i * dir), r = (a, y0, b, y1, c) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c);
  r(-20, suelo - 12, 21, suelo - 4, g_P.k); r(-19, suelo - 11, 20, suelo - 5, Q.pickup); r(-19, suelo - 11, 20, suelo - 10, Q.pickupL); r(-19, suelo - 6, 20, suelo - 5, Q.pickupS);
  r(2, suelo - 20, 14, suelo - 11, g_P.k); r(3, suelo - 19, 13, suelo - 11, Q.pickup); r(5, suelo - 18, 12, suelo - 13, Q.cristal); pset(X(6), suelo - 17, Q.cristalL); pset(X(7), suelo - 16, Q.cristalL);
  r(3, suelo - 19, 13, suelo - 19, Q.pickupL); r(20, suelo - 9, 22, suelo - 6, Q.cromo); r(-21, suelo - 9, -20, suelo - 6, Q.cromo); pset(X(21), suelo - 10, g_P.amarillo); pset(X(-20), suelo - 10, g_P.rojo);
  for (let i = -18; i < 2; i += 3) pset(X(i), suelo - 11, Q.pickupS); for (let k = 0; k < 7; k++) if (h(k, x, 460) > 0.5) pset(X(-16 + k * 2), suelo - 7 + (k % 2), Q.pickupS);   // las manchas de óxido
  r(-15, suelo - 15, -6, suelo - 12, g_P.chapaS); r(-14, suelo - 14, -7, suelo - 13, g_P.chapa);   // una nevera portátil en la caja
  for (const wx of [X(-12), X(13)]) { disco(wx, suelo - 3, 3.4, g_P.k); disco(wx, suelo - 3, 2.4, g_P.rueda); disco(wx, suelo - 3, 1.2, Q.cromo); }
}

function g_puebloFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, P = g_P, Q = g_Q, B = R.buf;
  // la playa del fondo: las dunas con las avenas de mar y la pasarela de madera que las cruza; el muelle de pesca
  for (let y = 104; y < 150; y++) for (let x = 120; x < 320; x++) { const dn = 106 + Math.round(Math.sin(x * 0.06) * 3 + Math.sin(x * 0.17) * 1.5); if (y < dn) continue;
    B[y * 320 + x] = y === dn ? Q.arenaL : h(x, y, 461) > 0.85 ? Q.arenaS : g_um(x, y) < (y - dn) / 30 ? Q.arenaS : y > 128 && h(x >> 1, y, 459) > 0.7 ? P.dique : Q.arena; }
  for (let k = 0; k < 40; k++) { const x = 122 + Math.round(h(k, 1, 462) * 196), y = 106 + Math.round(Math.sin(x * 0.06) * 3 + Math.sin(x * 0.17) * 1.5) + 1; for (let j = 0; j < 4 + k % 3; j++) pset(x + (j > 2 ? (k % 2 ? 1 : -1) : 0), y - j, j > 2 ? P.rastrojoL : P.rastrojo); }
  { for (let x = 168; x < 196; x++) { pset(x, 104, P.posteL); pset(x, 105, P.poste); if (x % 4 === 0) linea(x, 106, x, 112, P.posteS); } for (let x = 168; x < 196; x += 3) pset(x, 103, P.posteS); }
  { for (let x = 210; x < 300; x++) { pset(x, 96, P.posteL); pset(x, 97, P.poste); if (x % 6 === 0) linea(x, 98, x, 102, P.posteS); } for (let x = 212; x < 300; x += 10) linea(x, 93, x, 95, P.posteS); rect(296, 92, 302, 95, P.hormS); }
  // la torre del agua del pueblo, con su pictograma de un pez
  { const cx = 92; for (const lx of [cx - 9, cx + 9]) linea(lx, 74, lx + (lx < cx ? 3 : -3), 50, P.chapaS); linea(cx - 9, 66, cx + 9, 58, P.chapaD); linea(cx + 9, 66, cx - 9, 58, P.chapaD);
    rect(cx - 13, 34, cx + 13, 50, P.k); rect(cx - 12, 35, cx + 12, 49, P.chapaL); rect(cx + 6, 35, cx + 12, 49, P.chapa); rect(cx - 12, 35, cx - 10, 49, P.blanco); poligono([[cx - 13, 35], [cx, 28], [cx + 14, 35]], P.chapaS); linea(cx - 13, 35, cx, 28, P.chapaL);
    rect(cx - 13, 47, cx + 13, 47, P.chapaS); for (let x = cx - 12; x <= cx + 12; x += 3) pset(x, 48, P.chapaD);
    const pez = ['..##...', '.####.#', '#######', '.####.#', '..##...']; pez.forEach((f, j) => [...f].forEach((ch, i) => { if (ch === '#') pset(cx - 4 + i, 39 + j, Q.mar); })); pset(cx - 2, 40, P.k); }
  // el motel: dos pisos de estuco turquesa desconchado, la galería de arriba con su barandilla, las puertas numeradas,
  // las ventanas con aparatos de aire, la escalera de fuera, la máquina de hielo y la de refrescos
  rect(0, 80, 130, 150, P.k); rect(0, 81, 128, 150, Q.motel);
  for (let y = 81; y < 150; y++) for (let x = 0; x < 128; x++) { const q = h(x >> 2, y >> 2, 463); if (q > 0.9) pset(x, y, Q.motelP); else if (q < 0.06) pset(x, y, Q.motelS); else if ((y - 81) % 8 === 0 && h(x, y, 464) > 0.3) pset(x, y, Q.motelL); }
  rect(0, 80, 129, 83, Q.moldura); rect(0, 84, 129, 84, Q.molduraS); for (let x = 2; x < 128; x += 6) pset(x, 82, Q.molduraS);
  rect(0, 112, 129, 115, Q.moldura); rect(0, 116, 129, 117, Q.motelS);   // la losa de la galería
  for (let p = 0; p < 2; p++) { const y0 = p ? 118 : 88, num = p ? 1 : 7;
    for (let k = 0; k < 5; k++) { const x0 = 6 + k * 24;
      rect(x0, y0 + 4, x0 + 9, y0 + 23, P.k); rect(x0 + 1, y0 + 5, x0 + 8, y0 + 23, Q.puerta); rect(x0 + 7, y0 + 5, x0 + 8, y0 + 23, Q.puertaS); pset(x0 + 2, y0 + 15, P.amarillo); rect(x0 + 1, y0 + 5, x0 + 8, y0 + 5, Q.moldura);
      R.numero(String(num + k), x0 + 5, y0 + 11, { color: Q.moldura, centro: true, sombra: false, fina: true });
      rect(x0 + 12, y0 + 6, x0 + 20, y0 + 15, P.k); rect(x0 + 13, y0 + 7, x0 + 19, y0 + 14, (k + p) % 3 ? Q.cristal : P.ventanaL); for (let j = y0 + 8; j < y0 + 14; j += 2) rect(x0 + 13, j, x0 + 19, j, (k + p) % 3 ? hex('#3a5470') : hex('#e8c060'));
      rect(x0 + 13, y0 + 16, x0 + 19, y0 + 20, P.chapaS); rect(x0 + 13, y0 + 16, x0 + 19, y0 + 16, P.chapaL); for (let i = x0 + 14; i < x0 + 19; i += 2) linea(i, y0 + 17, i, y0 + 19, P.chapaD);
      for (let j = 0; j < 3; j++) pset(x0 + 14 + j * 2, y0 + 21 + j, Q.motelS); } }
  for (let x = 0; x < 128; x++) { pset(x, 103, Q.moldura); if (x % 4 === 0) linea(x, 104, x, 111, Q.moldura); pset(x, 104, Q.molduraS); }   // la barandilla de arriba
  for (let x = 0; x < 128; x++) pset(x, 118, Q.motelS); for (const px of [2, 50, 98, 126]) { rect(px, 117, px + 1, 150, Q.moldura); pset(px + 1, 120, Q.molduraS); }
  for (let i = 0; i < 30; i++) { const x = 129 + Math.round(i * 0.3), y = 117 + i; if (i % 3 === 0) rect(x - 2, y, x + 4, y, Q.molduraS); pset(x + 4, y - 4, Q.moldura); }   // la escalera de fuera
  linea(129, 113, 138, 146, Q.moldura); linea(131, 113, 140, 146, Q.molduraS);
  { rect(112, 128, 124, 150, P.k); rect(113, 129, 123, 150, P.chapaL); rect(113, 129, 123, 134, hex('#4a8ad8')); for (let i = -2; i <= 2; i++) { pset(118 + i, 131, P.blanco); pset(118, 131 + i, P.blanco); } pset(116, 129, P.blanco); pset(120, 133, P.blanco); pset(120, 129, P.blanco); pset(116, 133, P.blanco); rect(116, 138, 120, 139, P.chapaD); }   // la máquina de hielo
  // el aparcamiento: asfalto gastado con grietas que ramifican, rayas desvaídas, arena que ha volado de la playa,
  // manchas de aceite y hierbajos en las grietas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 465); B[y * 320 + x] = q > 0.86 ? Q.asfaltoL : q < 0.12 ? Q.asfaltoS : g_um(x, y) < 0.15 ? Q.asfaltoS : Q.asfalto; }
  for (let k = 0; k < 7; k++) { let x = 10 + k * 45 + Math.round(h(k, 1, 466) * 20), y = 152 + Math.round(h(k, 2, 466) * 6); for (let i = 0; i < 26; i++) { pset(x, y, P.k); if (h(k, i, 467) > 0.75) pset(x + 1, y, P.diqueS);
    x += h(k, i, 468) > 0.5 ? 1 : -1; y += 1; if (y > 179) break; if (i === 10) { let x2 = x, y2 = y; for (let j = 0; j < 8; j++) { x2 += 1; y2 += h(j, k, 469) > 0.5 ? 1 : 0; pset(x2, y2, P.k); } } } }
  for (let k = 0; k < 6; k++) { const x0 = 4 + k * 20; linea(x0, 151, x0 + 8, 179, h(k, 3, 470) > 0.3 ? Q.raya : Q.asfaltoL, 4); }
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const a = Math.sin(x * 0.05 + y * 0.2) * 0.5 + (180 - y) / 30 + (x > 150 && x < 200 ? 0.8 : 0) - 0.6; if (a > 0.3 && g_um(x, y) < a - 0.3 && h(x, y, 471) > 0.3) B[y * 320 + x] = h(x, y, 472) > 0.6 ? Q.arenaS : Q.arena; }
  for (const [cx, cy, rx] of [[70, 168, 9], [228, 156, 7], [280, 172, 6]]) for (let i = -rx; i <= rx; i++) for (let j = -2; j <= 2; j++) if ((i / rx) ** 2 + (j / 2.4) ** 2 < 1) pset(cx + i, cy + j, (i + j) % 4 === 0 ? hex('#5a4e6a') : hex('#3e3c46'));
  rect(4, 150, 30, 152, P.horm); rect(4, 150, 30, 150, P.hormL); rect(40, 150, 66, 152, P.horm); rect(40, 150, 66, 150, P.hormL);   // los topes de hormigón
  // la gasolinera: la tienda (escaparate con estanterías), la marquesina roja y blanca sobre dos postes, los surtidores
  { rect(260, 92, 320, 150, P.k); rect(261, 93, 320, 150, Q.moldura); for (let y = 95; y < 150; y += 3) rect(261, y, 320, y, Q.molduraS); rect(261, 93, 320, 95, Q.marq);
    rect(266, 104, 300, 136, P.k); rect(267, 105, 299, 135, hex('#2c3a4a')); for (let j = 0; j < 3; j++) { rect(268, 112 + j * 8, 298, 112 + j * 8, P.chapaS); for (let i = 268; i < 298; i += 3) rect(i, 108 + j * 8, i + 1, 111 + j * 8, [P.rojo, P.amarillo, Q.neonC, P.cana, Q.puerta][(i + j * 7) % 5]); }
    linea(270, 105, 280, 135, hex('#4a5a6a')); rect(304, 106, 316, 150, P.k); rect(305, 107, 315, 150, hex('#3a4a5a')); rect(307, 109, 313, 128, hex('#5a7a8a')); pset(306, 130, P.amarillo); }
  for (const px of [206, 300]) { rect(px - 2, 82, px + 2, 150, P.k); rect(px - 1, 83, px + 1, 150, P.blanco); rect(px + 1, 83, px + 1, 150, P.chapa); for (let y = 120; y < 150; y += 6) rect(px - 1, y, px + 1, y + 2, Q.marq); }
  rect(194, 70, 312, 82, P.k); rect(195, 71, 311, 81, P.blanco); rect(195, 74, 311, 78, Q.marq); rect(195, 78, 311, 78, Q.marqS); rect(195, 71, 311, 71, P.chapaL); rect(195, 81, 311, 81, P.chapaS);
  for (let x = 196; x < 311; x++) if (h(x, 1, 473) > 0.92) { pset(x, 75, Q.marqL); pset(x, 76, Q.marqS); }
  for (let x = 200; x < 308; x += 14) { rect(x, 82, x + 7, 83, P.chapaL); }   // los fluorescentes de debajo
  { const cx = 252; disco(cx, 63, 7, P.k); disco(cx, 63, 6, P.blanco); disco(cx, 63, 4.5, Q.marq); poligono([[cx, 58], [cx + 3, 64], [cx, 67], [cx - 3, 64]], P.blanco); rect(cx - 1, 70, cx + 1, 70, P.chapaD); }
  for (const px of [214, 246]) { rect(px - 9, 148, px + 9, 152, P.horm); rect(px - 9, 148, px + 9, 148, P.hormL); rect(px - 9, 152, px + 9, 152, P.hormS); rect(px - 6, 120, px + 6, 148, P.k); rect(px - 5, 121, px + 5, 148, P.blanco); rect(px + 3, 121, px + 5, 148, P.chapa);
    rect(px - 5, 121, px + 5, 124, Q.marq); rect(px - 4, 127, px + 3, 133, hex('#1a2a1a')); rect(px - 4, 136, px + 3, 138, P.chapaL); linea(px + 6, 130, px + 8, 140, P.k); linea(px + 8, 140, px + 8, 146, P.k); rect(px + 6, 128, px + 7, 132, P.k); }
}

function g_pueblo(R, t, o) {
  const { rect, pset, linea, disco } = R, P = g_P, Q = g_Q, B = R.buf;
  g_cielo(R, t, { hor: 96, modo: 'calor', sol: [196, 34, 8], estela: [26, 0.03], cumulos: 4, sentido: 1 });
  // el mar del golfo entre las dunas: franjas de turquesa que se mueven y la espuma que rompe en la orilla
  for (let y = 96; y < 112; y++) { const d = Math.min(1, (y - 96) / 12); for (let x = 0; x < 320; x++) { const v = Math.sin(x * (0.3 - d * 0.15) + y * 2.1 + t * 1.6) + Math.sin(x * 0.05 - t * 0.5) * 0.5;
    B[y * 320 + x] = v > 1.1 ? Q.marL : y < 98 ? g_mezcla(Q.mar, P.bruma, 0.4) : g_um(x, y) < d ? Q.mar : Q.marS; } }
  for (let x = 0; x < 320; x++) { const y = 106 + Math.round(Math.sin(x * 0.06) * 3 + Math.sin(x * 0.17) * 1.5) - 1 - Math.round((Math.sin(t * 0.9 + x * 0.02) + 1) * 1.2); if (y >= 100 && h(x, Math.floor(t * 2), 474) > 0.25) { pset(x, y, Q.espuma); if (h(x, 7, 475) > 0.5) pset(x, y - 1, Q.marL); } }
  g_poner(R, g_capa(R, 'interior|pueblo', () => g_puebloFijo(R)));
  // las gaviotas y un pescador pequeño en el muelle con su caña; un paseante en la pasarela
  for (let k = 0; k < 4; k++) { const x = ((t * (8 + k * 2) + k * 90) % 380) - 30, y = 50 + k * 9 + Math.sin(t * 0.9 + k) * 3; if (!(x > 268 && y < 48)) g_pajaro(R, x, y, t, k % 2 ? P.blanco : P.garzaS, k); }
  g_figura(R, 232, 96, t, 2, 1, false); linea(235, 90, 246, 84, P.posteS); linea(246, 84, 248, 99 + Math.round(Math.sin(t * 2)), P.chapaL);
  g_figura(R, 170 + ((t * 3) % 26), 104, t, 4, 1, true);
  // las palmeras sabal entre el motel y la gasolinera
  g_sabal(R, 178, 150, 64, t, 1.1, 1); g_sabal(R, 188, 150, 44, t, 0.9, 3);
  // el letrero de neón en su poste: una palmera y una ola de tubos rosas y cian, con una flecha de bombillas que corren;
  // la mitad de los tubos están fundidos y uno parpadea
  { const x = 146; rect(x - 1, 70, x + 1, 150, P.k); rect(x, 70, x, 150, P.chapaS); rect(x - 3, 146, x + 3, 150, P.hormS);
    rect(126, 40, 166, 72, P.k); rect(127, 41, 165, 71, Q.caja); rect(127, 41, 165, 42, Q.cajaS); for (let y = 44; y < 71; y += 5) rect(128, y, 164, y, Q.cajaS);
    const parp = Math.sin(t * 13) + Math.sin(t * 7.3) > 0.4, viva = (c, cL, on) => on ? c : Q.neonOff;
    // la palmera (rosa, viva) con su tronco curvo y cinco hojas
    for (let i = 0; i < 14; i++) pset(140 + Math.round(Math.sin(i * 0.15) * 3), 68 - i, viva(Q.neonR, Q.neonRL, true));
    for (const [dx, dy] of [[-7, 2], [-5, -2], [0, -4], [5, -2], [7, 3]]) linea(143, 54, 143 + dx, 54 + dy, Q.neonR);
    pset(143, 54, Q.neonRL);
    // la ola (cian): la mitad fundida, la otra parpadea
    for (let i = 0; i < 18; i++) { const xx = 147 + i, yy = 62 + Math.round(Math.sin(i * 0.5) * 3); pset(xx, yy, i < 9 ? viva(Q.neonC, Q.neonCL, parp) : Q.neonOff); }
    // el sol (fundido) arriba a la derecha y la flecha de bombillas que corren
    R.anillo(158.5, 49.5, 3.5, Q.neonOff);
    for (let i = 0; i < 9; i++) { const on = (Math.floor(t * 6) - i) % 3 === 0 && i !== 4; pset(130 + i * 4, 76, on ? P.amarillo : Q.neonOff); }
    if (parp) for (let i = 0; i < 9; i++) { const xx = 147 + i, yy = 62 + Math.round(Math.sin(i * 0.5) * 3); if (g_um(xx, yy - 1) < 0.5) pset(xx, yy - 1, g_mezcla(Q.caja, Q.neonC, 0.4)); } }
  // los aparatos de aire que gotean y el perro que duerme junto a la máquina de hielo moviendo el rabo
  for (let k = 0; k < 10; k++) { const p = k >> 1, x0 = 6 + (k % 5) * 24 + 16, y0 = (k < 5 ? 88 : 118) + 21, u = (t * 0.9 + k * 0.37) % 1; pset(x0, y0 + Math.round(u * 6), Q.marL); }
  { const x = 100, y = 150; rect(x - 6, y - 4, x + 4, y - 1, Q.perro); rect(x - 6, y - 1, x + 4, y - 1, Q.perroS); rect(x + 3, y - 6, x + 6, y - 3, Q.perro); pset(x + 6, y - 4, P.k); pset(x + 3, y - 7, Q.perroS); pset(x + 5, y - 3, Q.perroS);
    const r = Math.round(Math.sin(t * 6) * 1.5); linea(x - 6, y - 3, x - 9, y - 5 + r, Q.perroS); for (let k = 0; k < 3; k++) { const z = (t * 0.5 + k / 3) % 1; if (z < 0.8) R.anillo(x + 8 + z * 5, y - 7 - z * 9, 0.6 + z * 1.4, P.blanco); } }
  // un huésped en la galería de arriba, apoyado en la barandilla
  g_figura(R, 34, 112, t, 1, 1, false);
  // la pick-up vieja aparcada delante del motel
  g_pickup(R, 48, 156, -1);
  // los mosquitos y polillas de la marquesina (de día, pocos), la bandera de la marquesina y el calor que tiembla en el asfalto
  for (let y = 154; y < 162; y += 2) for (let x = 0; x < 320; x += 4) if (h(x, y, Math.floor(t * 3)) > 0.9) pset(x + Math.round(Math.sin(t * 5 + y) * 1), y, Q.asfaltoL);
  return { suelo: 160, libre: [20, 270], horizonte: 96, sol: [196, 34], motel: [0, 80, 130, 150], letrero: [126, 40, 166, 72], surtidores: [[214, 150], [246, 150]], tienda: [260, 92, 320, 150], pickup: [48, 156], puertasMotel: [[11, 141], [35, 141], [59, 141], [83, 141], [107, 141]] };
}

// el poste del letrero y un cubo de arena con su escoba en el primer término (delante de los actores), abajo a la derecha
function g_puebloDelante(R, t) {
  const P = g_P, Q = g_Q, { rect, pset } = R;
  for (let x = 296; x < 320; x += 2) { const l = 6 + Math.round(h(x, 1, 476) * 8), s = Math.sin(t * 1.6 + x) * 1.5; for (let j = 0; j < l; j++) pset(Math.round(x + s * j / l), 180 - j, j > l - 2 ? P.diqueL : j % 2 ? P.dique : P.diqueS); }
  rect(300, 168, 312, 180, P.k); rect(301, 169, 311, 180, Q.marq); rect(301, 169, 311, 170, Q.marqL); rect(309, 169, 311, 180, Q.marqS); rect(302, 171, 310, 172, Q.arena);
}

// fluorescentes y las polillas, la pared de la tienda con su escaparate (x 52–184, y 46–126), los dos surtidores en su isla
// (x 74 y 160, la isla y 150–158), la nevera de bebidas energéticas que brilla (x 200–240), la nevera del hielo, la
// jaula del gas y, a la derecha (x 268–320), la noche de fuera con la carretera y un coche que pasa
const g_N = pal({
  techo: '#c8ccd2', techoS: '#9ca2aa', techoD: '#6e747e', tubo: '#f4fff8', tuboG: '#d8f0e8', pared: '#d8cfba', paredS: '#ada48e', paredD: '#7a7262', paredL: '#ece4d0',
  suelo: '#a4a29c', sueloS: '#82807c', sueloL: '#c4c2bc', junta: '#5e5c5a', mancha: '#4c4a4e', interior: '#efe8c8', interiorS: '#c8bea0',
  nevera: '#1e2a3a', neveraL: '#d8f0ff', neveraG: '#9ad8f8', lata1: '#3af0a0', lata2: '#f03a8a', lata3: '#f8e040', lata4: '#40a8ff', lata5: '#ff7a30',
  noche: '#141a3a', nocheS: '#0a0e24', silueta: '#0c1020', farol: '#ffd27a', polilla: '#f8f0d8',
});

function g_gasolineraFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, P = g_P, Q = g_Q, N = g_N, B = R.buf;
  // la pared de la tienda: bloques de hormigón pintados (juntas, desconchones, la luz de los fluorescentes que baja)
  for (let y = 26; y < 150; y++) for (let x = 0; x < 268; x++) { const fila = (y - 26) >> 3, jx = (x + (fila & 1) * 8) % 16, jy = (y - 26) % 8, luz = 1 - Math.abs(x - 214) / 260 - (y - 26) / 400;
    let c = jx === 0 || jy === 0 ? N.paredS : g_um(x, y) < luz - 0.35 ? N.paredL : g_um(x, y) < 0.9 - luz ? N.paredS : N.pared; if (h(x >> 1, y >> 1, 480) > 0.97) c = N.paredD; B[y * 320 + x] = c; }
  rect(0, 26, 268, 31, Q.marq); rect(0, 26, 268, 26, Q.marqL); rect(0, 31, 268, 31, Q.marqS); rect(0, 28, 268, 28, P.blanco);
  // el escaparate: las estanterías con bolsas y cajas de colores, el mostrador con el dependiente, un bote de café
  rect(50, 44, 186, 128, P.k); rect(52, 46, 184, 126, N.interior);
  for (let j = 0; j < 4; j++) { const y = 58 + j * 16; rect(54, y, 120, y + 1, N.interiorS); rect(54, y + 2, 120, y + 2, P.chapaS);
    for (let x = 55; x < 120; x += 4) { const hh = 6 + Math.round(h(x, j, 481) * 6), c = [Q.marq, P.amarillo, N.lata4, P.cana, Q.puerta, N.lata1, P.blanco][(x * 3 + j) % 7]; rect(x, y - hh, x + 2, y - 1, c); pset(x, y - hh, g_mezcla(c, P.blanco, 0.4)); pset(x + 2, y - 2, g_mezcla(c, P.k, 0.3)); } }
  rect(124, 96, 182, 126, P.poste); rect(124, 96, 182, 98, P.posteL); for (let x = 128; x < 180; x += 6) linea(x, 100, x, 125, P.posteS);   // el mostrador
  rect(150, 86, 164, 96, P.k); rect(151, 87, 163, 95, hex('#2a3a2a')); pset(152, 88, hex('#5ae08a'));   // la caja registradora
  for (let x = 126; x < 182; x += 3) for (let j = 0; j < 3; j++) rect(x, 50 + j * 7, x + 1, 54 + j * 7, [Q.marq, P.chapaL, P.amarillo, N.lata4][(x + j) % 4]);   // la vitrina de detrás
  rect(52, 46, 184, 47, P.blanco); linea(56, 48, 74, 124, g_mezcla(N.interior, P.blanco, 0.5)); linea(60, 48, 78, 124, g_mezcla(N.interior, P.blanco, 0.5)); linea(130, 48, 140, 90, g_mezcla(N.interior, P.blanco, 0.4));   // los reflejos del cristal
  rect(50, 126, 186, 130, P.horm); rect(50, 126, 186, 126, P.hormL);
  // los carteles del escaparate (sin letras): una taza de café humeante y una cifra de precio
  rect(60, 104, 82, 122, P.blanco); rect(66, 110, 74, 118, Q.puertaS); rect(75, 112, 77, 115, Q.puertaS); rect(67, 111, 73, 112, P.poste); R.numero('99', 71, 121, { color: P.rojo, centro: true, sombra: false, fina: true });
  // la puerta de cristal
  rect(188, 52, 198, 150, P.k); rect(189, 53, 197, 150, hex('#3a4a5a')); rect(190, 55, 196, 145, N.interior); rect(190, 98, 196, 100, P.chapa); linea(191, 56, 195, 90, P.blanco);
  // la nevera del hielo (blanca con su copo) y la jaula de las bombonas de gas
  { rect(6, 120, 42, 150, P.k); rect(7, 121, 41, 150, P.blanco); rect(7, 121, 41, 124, hex('#4a8ad8')); rect(36, 121, 41, 150, P.chapa); rect(9, 131, 39, 131, P.chapaS); rect(9, 141, 39, 141, P.chapaS);
    for (let i = -4; i <= 4; i++) { pset(24 + i, 136, hex('#4a8ad8')); pset(24, 136 + i, hex('#4a8ad8')); if (Math.abs(i) < 4) { pset(24 + i, 136 + i, hex('#4a8ad8')); pset(24 + i, 136 - i, hex('#4a8ad8')); } } }
  { rect(244, 112, 266, 150, P.k); for (let x = 245; x < 266; x += 3) linea(x, 113, x, 150, P.chapaS); for (let y = 113; y < 150; y += 3) rect(245, y, 265, y, P.chapaS);
    for (const bx of [249, 256, 262]) { rect(bx - 2, 130, bx + 2, 149, P.chapaL); rect(bx - 1, 127, bx + 1, 129, P.chapaS); rect(bx + 1, 130, bx + 2, 149, P.chapa); } }
  // la noche de fuera, a la derecha: la carretera y la acera; el poste de la luz con su farol
  for (let y = 132; y < 150; y++) for (let x = 268; x < 320; x++) B[y * 320 + x] = y < 136 ? P.hormD : y === 140 && x % 8 < 4 ? hex('#a8a070') : g_um(x, y) < 0.3 ? N.nocheS : hex('#26283a');
  rect(268, 26, 271, 150, P.k); rect(269, 26, 270, 150, P.chapaS);
  // el suelo de hormigón: losas con juntas en perspectiva, manchas de aceite, el reflejo de la luz y una rejilla
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x - 160) / (y - 120) * 30, ju = Math.abs(u - Math.round(u / 50) * 50) < 0.9 || (y - 150) % 11 === 0, luz = 1 - Math.abs(x - 140) / 200;
    let c = ju ? N.junta : g_um(x, y) < luz * 0.5 ? N.sueloL : h(x >> 1, y, 482) > 0.9 ? N.sueloS : N.suelo; if (x > 268 && y < 156) c = g_mezcla(c, N.noche, 0.5); B[y * 320 + x] = c; }
  for (const [cx, cy, rx] of [[118, 168, 10], [226, 172, 8], [40, 164, 6]]) for (let i = -rx; i <= rx; i++) for (let j = -3; j <= 3; j++) if ((i / rx) ** 2 + (j / 3) ** 2 < 1) pset(cx + i, cy + j, (i * 3 + j) % 7 === 0 ? hex('#6a5a8a') : N.mancha);
  { rect(290, 166, 310, 172, P.k); for (let x = 291; x < 310; x += 2) rect(x, 167, x, 171, P.hormD); }
  // la isla de los surtidores: el bordillo amarillo y negro y los bolardos
  rect(40, 150, 196, 158, P.k); rect(41, 151, 195, 157, P.horm); rect(41, 151, 195, 152, P.hormL); for (let x = 41; x < 195; x += 8) rect(x, 154, x + 3, 157, P.amarillo); rect(41, 157, 195, 157, P.hormD);
  for (const bx of [46, 190]) { rect(bx - 2, 132, bx + 2, 151, P.k); rect(bx - 1, 133, bx + 1, 151, P.amarillo); rect(bx + 1, 133, bx + 1, 151, P.locoS); for (let y = 136; y < 151; y += 5) rect(bx - 1, y, bx + 1, y + 1, P.k); }
  // los dos surtidores de cerca: la carcasa con su luz y su sombra, la pantalla con las cifras, los precios, las tres
  // teclas de octanaje, la manguera y la pistola en su soporte
  for (const px of [74, 160]) { rect(px - 15, 88, px + 15, 151, P.k); rect(px - 14, 89, px + 14, 150, P.blanco); rect(px + 9, 89, px + 14, 150, P.chapa); rect(px - 14, 89, px - 12, 150, P.chapaL);
    rect(px - 14, 89, px + 14, 96, Q.marq); rect(px - 14, 96, px + 14, 96, Q.marqS); pset(px, 90, P.blanco); rect(px - 1, 91, px + 1, 92, P.blanco); rect(px - 2, 93, px + 2, 94, P.blanco); rect(px - 1, 95, px + 1, 95, P.blanco); pset(px - 1, 93, Q.marqL);
    rect(px - 11, 99, px + 7, 113, P.k); rect(px - 10, 100, px + 6, 112, hex('#16221a'));
    for (let j = 0; j < 3; j++) { rect(px - 11, 117 + j * 6, px - 3, 121 + j * 6, P.k); rect(px - 10, 118 + j * 6, px - 4, 120 + j * 6, [P.amarillo, P.cana, P.rojo][j]); R.numero(['3', '3', '4'][j], px + 2, 122 + j * 6, { color: P.k, centro: true, sombra: false, fina: true }); }
    rect(px - 12, 138, px + 8, 148, P.chapaS); rect(px - 12, 138, px + 8, 138, P.chapaL); for (let y = 140; y < 148; y += 2) rect(px - 11, y, px + 7, y, P.chapaD);
    rect(px + 15, 104, px + 19, 120, P.k); rect(px + 16, 105, px + 18, 108, P.chapaD); rect(px + 16, 106, px + 22, 108, P.k); rect(px + 18, 108, px + 19, 116, P.chapaD); }
}

function g_gasolinera(R, t, o) {
  const { rect, pset, linea, disco } = R, P = g_P, Q = g_Q, N = g_N, B = R.buf;
  g_cielo(R, t, { hor: 132, modo: 'noche', luna: [296, 70, 5], estela: null, nubes: false });
  // fuera: la silueta de una palmera y un coche que pasa con los faros por la carretera
  { const cx = ((t * 40) % 260) + 250; if (cx < 340) { rect(cx - 12, 138, cx + 10, 143, P.k); rect(cx - 7, 134, cx + 4, 138, P.k); for (let i = 0; i < 20; i++) if (g_um(cx + 10 + i, 140) < 1 - i / 20) { pset(cx + 10 + i, 140, N.farol); pset(cx + 10 + i, 141, N.farol); } pset(cx + 10, 139, P.blanco); pset(cx - 12, 140, P.rojoL); } }
  g_poner(R, g_capa(R, 'interior|gasolinera', () => g_gasolineraFijo(R)));
  for (let k = 0; k < 2; k++) { const x = 286 + k * 18, base = 132, top = 82 + k * 14; for (let y = base; y >= top; y--) pset(x + Math.round((base - y) * 0.08), y, N.silueta);
    for (let j = 0; j < 9; j++) { const a = -Math.PI * j / 8 + Math.sin(t + j) * 0.06; for (let d = 1; d < 12; d++) pset(Math.round(x + (base - top) * 0.08 + Math.cos(a) * d), Math.round(top + Math.sin(a) * d * 0.7 + d * d * 0.04), N.silueta); } }
  // la marquesina por dentro: paneles con su rejilla, los fluorescentes que zumban (uno parpadea) y su luz
  for (let y = 0; y < 26; y++) for (let x = 0; x < 268; x++) { const pan = (x % 40 === 0) || (y % 13 === 0), d = Math.abs(x - 214) / 140 + Math.abs(y - 12) / 40;
    B[y * 320 + x] = pan ? N.techoD : g_um(x, y) < 0.9 - d ? N.techo : N.techoS; }
  for (const [lx, ly, par] of [[200, 9, false], [236, 9, true], [-14, 9, false]]) { const on = !par || Math.sin(t * 17) + Math.sin(t * 5.3) > -0.6;
    rect(lx - 1, ly - 2, lx + 25, ly + 4, N.techoD); rect(lx, ly - 1, lx + 24, ly + 3, on ? N.tubo : N.techoS); rect(lx, ly + 3, lx + 24, ly + 3, on ? N.tuboG : N.techoD);
    if (on) for (let y = ly + 5; y < ly + 13; y++) for (let x = lx - 6; x < lx + 31; x++) if (g_um(x, y) < 0.35 - (y - ly) * 0.03) pset(x, y, g_mezcla(B[y * 320 + x], N.tubo, 0.5)); }
  rect(0, 22, 268, 25, Q.marqS); rect(0, 22, 268, 22, Q.marq);
  // las polillas y los mosquitos que dan vueltas a los fluorescentes
  for (let k = 0; k < 14; k++) { const lx = k < 9 ? 212 : 248, a = t * (2 + h(k, 1, 483) * 3) * (k % 2 ? 1 : -1) + k, r = 4 + h(k, 2, 483) * 10, x = Math.round(lx + Math.cos(a) * r * 1.6), y = Math.round(14 + Math.sin(a) * r * 0.6);
    if (x < 268 && y > 0) { pset(x, y, k % 3 ? P.k : N.polilla); if (k % 4 === 0 && Math.sin(t * 30 + k) > 0) { pset(x - 1, y, N.polilla); pset(x + 1, y, N.polilla); } } }
  // la nevera de las bebidas energéticas: puertas de cristal con la luz fría dentro, filas de latas de colores chillones
  // (sin marcas), el zumbido del brillo y el vaho que sube al abrir; o.nevera 0–1 abre la puerta de la izquierda
  { const x0 = 200, x1 = 240, y0 = 82, y1 = 150, ab = Math.max(0, Math.min(1, o.nevera ?? 0));
    rect(x0 - 2, y0 - 6, x1 + 2, y1, P.k); rect(x0 - 1, y0 - 5, x1 + 1, y0 - 1, N.nevera); for (let x = x0 + 2; x < x1; x += 4) rect(x, y0 - 4, x + 2, y0 - 2, [N.lata1, N.lata2, N.lata3][(x >> 2) % 3]);
    rect(x0, y0, x1, y1 - 2, N.neveraL);
    for (let j = 0; j < 5; j++) { const y = y0 + 4 + j * 13; rect(x0 + 1, y + 9, x1 - 1, y + 9, P.chapaS);
      for (let x = x0 + 2; x < x1 - 1; x += 3) { const c = [N.lata1, N.lata2, N.lata3, N.lata4, N.lata5][(j * 2 + Math.floor((x - x0) / 9)) % 5]; rect(x, y + 2, x + 1, y + 8, c); pset(x, y + 2, P.blanco); pset(x + 1, y + 8, g_mezcla(c, P.k, 0.4)); } }
    const g = 0.15 + 0.08 * Math.sin(t * 3); for (let y = y0; y < y1 - 2; y++) for (let x = x0; x < x1; x++) if (g_um(x, y) < g) pset(x, y, N.neveraG);
    rect(x0 + 20, y0, x0 + 20, y1 - 2, P.chapaD); rect(x0, y1 - 2, x1, y1, P.chapaD);
    const w = Math.round(20 * (1 - ab)); rect(x0, y0, x0, y1 - 2, P.chapa); if (ab > 0) { rect(x0 - Math.round(ab * 10), y0, x0, y1 - 2, P.chapaS); for (let k = 0; k < 6; k++) { const u = (t * 0.8 + k / 6) % 1; disco(x0 + 6 + k * 2, y0 + 30 - u * 30, 1 + u * 2, g_mezcla(N.neveraL, P.blanco, 0.5)); } }
    linea(x0 + 3, y0 + 2, x0 + 3 + w * 0.3, y1 - 6, P.blanco); rect(x0 + 17, y0 + 30, x0 + 18, y0 + 44, P.chapaL); rect(x0 + 22, y0 + 30, x0 + 23, y0 + 44, P.chapaL);
    for (let y = y1 + 1; y < y1 + 9; y++) for (let x = x0 - 6; x < x1 + 6; x++) if (g_um(x, y) < 0.35 - (y - y1) * 0.04) pset(x, y, g_mezcla(B[y * 320 + x], N.neveraG, 0.5)); }
  // las pantallas de los surtidores: las cifras del de la izquierda corren (está echando gasolina) y el precio fijo
  { const g = Math.floor(t * 3.3) % 100, d = Math.floor((t * 3.3 * 3.49)) % 1000;
    R.numero(String(d).padStart(3, '0'), 69, 106, { color: hex('#5ae08a'), centro: true, sombra: false, fina: true }); R.numero(String(g).padStart(2, '0'), 69, 112, { color: hex('#e8c040'), centro: true, sombra: false, fina: true });
    R.numero('000', 155, 106, { color: hex('#3a8a5a'), centro: true, sombra: false, fina: true }); R.numero('00', 155, 112, { color: hex('#8a7a30'), centro: true, sombra: false, fina: true }); }
  // el dependiente que se mueve detrás del mostrador
  g_figura(R, 134 + Math.round(Math.sin(t * 0.5) * 6), 97, t, 1, Math.cos(t * 0.5) > 0 ? 1 : -1, false); rect(124, 96, 144, 98, P.poste); rect(124, 96, 144, 96, P.posteL);
  return { suelo: 162, libre: [46, 260], surtidores: [[74, 150], [160, 150]], pistolas: [[95, 107], [181, 107]], nevera: [200, 82, 240, 150], escaparate: [52, 46, 184, 126], puerta: [188, 52, 198, 150], hielo: [6, 120, 42, 150] };
}

// la papelera con el cubo del limpiaparabrisas en el primer término (delante de los actores), abajo a la izquierda
function g_gasolineraDelante(R, t) {
  const P = g_P, { rect, pset, linea } = R;
  rect(2, 146, 26, 180, P.k); rect(3, 147, 25, 180, hex('#3a5a8a')); rect(3, 147, 25, 150, hex('#5a7aaa')); rect(20, 151, 25, 180, hex('#2a4068')); for (let y = 156; y < 180; y += 6) rect(3, y, 25, y, hex('#2a4068'));
  rect(26, 154, 36, 168, P.k); rect(27, 155, 35, 168, P.chapaL); rect(27, 156, 35, 158, hex('#4a8ad8')); linea(31, 138, 33, 156, P.posteS); rect(29, 136, 35, 138, P.k); rect(30, 139, 34, 141, P.chapaS);
}

// agujas); el montículo de la cumbre, casi nada, de x 110 a 230 con la cima en (170, 150); el monolito de granito con su
// placa del 345 en x 200–220 (la placa, y 136–150); la mesa de merendero a la izquierda (x 52–92), el aparcamiento de
// grava con un coche (x 0–44) y el poste de la senda (x 252)
const g_B = pal({
  pinoT: '#9a5a36', pinoTS: '#6a3a24', pinoTL: '#c47a4a', pinoTD: '#4a2a1c', agujas: '#3e7a3a', agujasS: '#28562a', agujasL: '#6aa84a', agujasF: '#5a8a7a', agujasFS: '#46706a', troncoF: '#7a6a6a',
  pinocha: '#b0703e', pinochaS: '#86522e', pinochaL: '#d09060', hierba: '#9aa848', hierbaS: '#6e7a34', hierbaL: '#c4c870', palmito: '#5a8a5a', palmitoS: '#3a6040', palmitoL: '#8ab478',
  granito: '#a8a4a8', granitoS: '#7a767c', granitoL: '#d0ccd0', granitoD: '#56525a', bronce: '#b8863a', bronceS: '#7a5424', bronceL: '#e8c070', grava: '#c4b8a4', gravaS: '#9a8e7c',
  luz: '#f6e6a0', tortuga: '#8a7a58', tortugaS: '#5e5238', tortugaL: '#b4a078', ardilla: '#9a8a7a', pajaroC: '#2a2a2a', rojoP: '#d83a2a',
});

// un pino de hoja larga: el tronco recto con placas de corteza (luz a la izquierda, sombra a la derecha), ramas cortas
// arriba y penachos de agujas en tres tonos que se mecen; s escala; f 0–1 lo aleja (más pálido y azulado)
function g_pino(R, x, base, alto, t, s = 1, f = 0, sem = 0) {
  const { pset } = R, Bp = g_B, top = base - alto, w = Math.max(1, Math.round(2.2 * s)), m = (y) => Math.round(Math.sin(t * 0.8 + sem) * (base - y) / alto * 1.2 * s);
  const T = f > 0.5 ? [Bp.troncoF, g_mezcla(Bp.troncoF, g_P.bruma, 0.3), g_mezcla(Bp.troncoF, g_P.k, 0.2)] : [Bp.pinoT, Bp.pinoTL, Bp.pinoTS];
  for (let y = base; y >= top + 6 * s; y--) { const xx = x + m(y); for (let i = -w; i <= w; i++) { const pl = h((xx + i) >> 1, (y + (i > 0 ? 1 : 0)) >> 1, 490 + sem) > 0.8; pset(xx + i, y, i === -w ? T[1] : i >= w - (w > 1 ? 1 : 0) ? T[2] : pl ? T[2] : (y + sem) % 5 === 0 ? T[2] : T[0]); } }
  const A = f > 0.5 ? [Bp.agujasFS, Bp.agujasF, g_mezcla(Bp.agujasF, g_P.blanco, 0.2)] : [Bp.agujasS, Bp.agujas, Bp.agujasL];
  const n = 5 + Math.round(s * 2);
  for (let k = 0; k < n; k++) { const yy = top + Math.round((k / n) * 22 * s), d = k % 2 ? 1 : -1, l = Math.round((4 + (k * 7 + sem) % 6) * s), x0 = x + m(yy);
    for (let i = 0; i < l; i++) pset(x0 + d * i, yy - Math.round(i * 0.3), T[2]);
    const cx = x0 + d * l, cy = yy - Math.round(l * 0.3), r = Math.max(2, Math.round((3 + (k + sem) % 3) * s)), sw = Math.sin(t * 1.4 + k + sem) * 0.8;
    for (let j = -r; j <= r; j++) for (let i = -r - 1; i <= r + 1; i++) { const e = (i / (r + 1)) ** 2 + (j / r) ** 2; if (e > 1 || h(cx + i, cy + j, 491) > 0.85) continue; const xx = Math.round(cx + i + sw * (j < 0 ? 1 : 0)); pset(xx, cy + j, j < -r * 0.3 ? A[2] : j > r * 0.3 ? A[0] : A[1]); }
    for (let i = -r - 1; i <= r + 1; i += 2) pset(Math.round(cx + i + sw), cy - r - 1, A[1]); }
  { const r = Math.max(2, Math.round(3 * s)), cx = x + m(top), cy = top; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) pset(cx + i, cy + j - 1, j < 0 ? A[2] : A[1]); }
}

// una mata de palmito (saw palmetto): abanicos de hojas en punta, en tres tonos, que se mecen
function g_palmito(R, x, base, s, t, sem = 0) {
  const Bp = g_B; for (let k = 0; k < 7; k++) { const a = -Math.PI * (0.12 + k * 0.126) + Math.sin(t * 1.5 + k + sem) * 0.05, l = (7 + (k * 5 + sem) % 4) * s, ex = x + Math.cos(a) * l, ey = base + Math.sin(a) * l * 0.8;
    R.linea(x, base, Math.round(ex), Math.round(ey), Bp.palmitoS); for (let j = -3; j <= 3; j++) { const b = a + j * 0.12; R.linea(Math.round(ex), Math.round(ey), Math.round(ex + Math.cos(b) * 4 * s), Math.round(ey + Math.sin(b) * 3 * s), j < 0 ? Bp.palmitoL : j > 1 ? Bp.palmitoS : Bp.palmito); } }
}

const g_mont = (x) => 160 - 10 * Math.exp(-(((x - 170) / 38) ** 2));   // el perfil del montículo (cima en 170, 150)

function g_brittonFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, P = g_P, Bp = g_B, B = R.buf;
  // el pinar del fondo: troncos lejanos, azulados, y un sotobosque bajo y verde
  for (let y = 98; y < 140; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 2, y >> 2, 502), v = Math.sin(x * 0.21 + Math.sin(y * 0.3) * 2) + Math.sin(y * 0.45 + x * 0.05);
    B[y * 320 + x] = g_um(x, y) < (y - 98) / 60 ? Bp.agujasFS : q > 0.75 ? g_mezcla(Bp.agujasF, g_P.bruma, 0.55) : v > 1.1 ? g_mezcla(Bp.agujasF, g_P.blanco, 0.15) : v < -1 ? Bp.agujasFS : g_mezcla(Bp.agujasF, g_P.bruma, 0.3); }
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 5, 492) * 320), y = 100 + Math.round(h(k, 6, 492) * 30), r = 3 + Math.round(h(k, 7, 492) * 4); for (let j = -r; j <= r; j++) for (let i = -r - 2; i <= r + 2; i++) if ((i / (r + 2)) ** 2 + (j / r) ** 2 < 1 && h(x + i, y + j, 503) > 0.25) pset(x + i, y + j, j < -1 ? g_mezcla(Bp.agujasF, g_P.blanco, 0.2) : j > 1 ? Bp.agujasFS : Bp.agujasF); }
  for (let k = 0; k < 34; k++) { const x = Math.round(h(k, 1, 492) * 330) - 5; g_pino(R, x, 136, 66 + Math.round(h(k, 2, 492) * 22), 0, 0.55, 1, k); }
  for (let y = 124; y < 146; y++) for (let x = 0; x < 320; x++) { const top = 128 + Math.round(Math.sin(x * 0.09) * 2 + h(x >> 1, 1, 493) * 3); if (y >= top) B[y * 320 + x] = h(x, y, 494) > 0.6 ? Bp.palmitoS : g_um(x, y) < 0.5 ? Bp.palmito : Bp.agujasS; }
  for (let k = 0; k < 9; k++) { const x = Math.round(k * 36 + h(k, 3, 492) * 24); g_pino(R, x, 144 + (k % 3), Math.min(x > 258 ? 84 : 999, 70 + Math.round(h(k, 4, 492) * 40)), 0, 0.7 + (k % 3) * 0.1, 0.3, k + 40); }
  // el claro: la alfombra de agujas de pino (pinocha) con piñas, ramitas y matas de hierba de alambre
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const ym = g_mont(x); if (y < Math.min(146, ym - 2) && y < 146) continue;
    const q = h(x, y, 495), v = Math.sin(x * 0.7 + y * 2.3) > 0.6; let c = q > 0.9 ? Bp.pinochaL : q < 0.1 ? Bp.pinochaS : v ? Bp.pinochaS : Bp.pinocha;
    if (y < 150 && g_um(x, y) < (150 - y) / 10) c = Bp.hierbaS; B[y * 320 + x] = c; }
  // el montículo: un lomo de hierba muy suave, más claro arriba donde le da el sol, con un caminito de tierra que sube
  for (let x = 100; x < 241; x++) { const ym = g_mont(x); for (let y = Math.round(ym); y < 161; y++) { const u = (y - ym) / Math.max(1, 160 - ym + 0.1); let c = u < 0.25 ? Bp.hierbaL : g_um(x, y) < u ? Bp.hierbaS : Bp.hierba;
    if (Math.abs(x - 150 - (y - 150) * 2.2) < 2) c = Bp.pinochaL; B[y * 320 + x] = c; } pset(x, Math.round(ym) - 1, h(x, 1, 496) > 0.5 ? Bp.hierbaL : Bp.hierba); }
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 497) * 319), y = 150 + Math.round(h(k, 2, 497) * 29); if (y < g_mont(x)) continue; pset(x, y, Bp.pinoTD); pset(x + 1, y, Bp.pinoTS); if (k % 3 === 0) { pset(x, y - 1, Bp.pinoTS); pset(x + 1, y - 1, Bp.pinochaS); } }   // las piñas
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 3, 497) * 319), y = 152 + Math.round(h(k, 4, 497) * 27); if (y < g_mont(x) + 2) continue; for (let j = 0; j < 5; j++) { pset(x - 2 + j, y - Math.abs(2 - j) - 2, Bp.hierbaL); pset(x - 2 + j, y - 1, Bp.hierba); } }
  // el aparcamiento de grava con un coche y sus topes
  for (let y = 150; y < 180; y++) for (let x = 0; x < 44 - (y - 150) * 0.3; x++) B[y * 320 + x] = h(x, y, 498) > 0.7 ? Bp.gravaS : h(x, y, 499) > 0.85 ? g_P.blanco : Bp.grava;
  { const x = 14, y = 156; rect(x - 18, y - 11, x + 16, y - 3, P.k); rect(x - 17, y - 10, x + 15, y - 4, hex('#4a6ab0')); rect(x - 17, y - 10, x + 15, y - 9, hex('#7a9ad0')); rect(x - 10, y - 17, x + 8, y - 10, P.k); rect(x - 9, y - 16, x + 7, y - 11, hex('#a8d0e8')); rect(x - 1, y - 16, x, y - 11, P.k);
    for (const wx of [x - 10, x + 9]) { disco(wx, y - 2, 3, P.k); disco(wx, y - 2, 1.4, P.chapa); } rect(x + 15, y - 8, x + 16, y - 6, P.amarillo); }
  rect(0, 160, 40, 162, P.horm); rect(0, 160, 40, 160, P.hormL);
  // la mesa de merendero de madera, con su banco y su sombra
  { const x0 = 52, x1 = 92; for (let y = 159; y < 163; y++) for (let x = x0 - 2; x < x1 + 6; x++) if (g_um(x, y) < 0.6) pset(x, y, Bp.pinochaS);
    rect(x0, 140, x1, 143, P.poste); rect(x0, 140, x1, 140, P.posteL); for (let x = x0; x < x1; x += 7) pset(x, 141, P.posteS); rect(x0 - 3, 149, x1 + 3, 151, P.poste); rect(x0 - 3, 149, x1 + 3, 149, P.posteL);
    for (const [a, b] of [[x0 + 4, x0 + 10], [x1 - 4, x1 - 10]]) { linea(a, 144, b, 160, P.posteS); linea(b, 144, a, 160, P.poste); } }
  // el poste de la senda: una tabla con el pictograma del excursionista y una flecha hacia la cima
  { const x = 252; rect(x - 1, 126, x + 1, 160, P.posteS); rect(x - 1, 126, x - 1, 160, P.poste); rect(x - 9, 128, x + 9, 140, P.k); rect(x - 8, 129, x + 8, 139, hex('#6a4a2a'));
    const ic = ['..#..', '.###.', '#.#.#', '..#..', '.#.#.', '.#..#']; ic.forEach((f, j) => [...f].forEach((ch, i) => { if (ch === '#') pset(x - 6 + i, 131 + j, hex('#f0e0b0')); }));
    for (let i = 0; i < 5; i++) pset(x + 1 + i, 134, hex('#f0e0b0')); pset(x + 1, 133, hex('#f0e0b0')); pset(x + 1, 135, hex('#f0e0b0')); }
  // el monolito de granito con la placa de bronce: el 345 y una montañita (el gag: es la cima del estado)
  { const x0 = 200, x1 = 220, y0 = 128, y1 = 158;
    for (let y = y1 + 1; y < y1 + 4; y++) for (let x = x0 - 3; x < x1 + 10; x++) if (g_um(x, y) < 0.6) pset(x, y, Bp.pinochaS);
    rect(x0 - 3, y1 - 2, x1 + 3, y1 + 1, P.k); rect(x0 - 2, y1 - 1, x1 + 2, y1, Bp.granitoS);
    rect(x0 - 1, y0 - 1, x1 + 1, y1 - 2, P.k); for (let y = y0; y < y1 - 2; y++) for (let x = x0; x <= x1; x++) { const q = h(x, y, 500); pset(x, y, x > x1 - 3 ? Bp.granitoS : x < x0 + 2 ? Bp.granitoL : q > 0.85 ? Bp.granitoD : q > 0.6 ? Bp.granitoL : Bp.granito); }
    poligono([[x0 - 1, y0], [x0 + 2, y0 - 3], [x1 - 2, y0 - 3], [x1 + 2, y0]], Bp.granitoL); linea(x0 + 2, y0 - 3, x1 - 2, y0 - 3, P.k);
    rect(x0 + 1, 135, x1 - 1, 152, P.k); rect(x0 + 2, 136, x1 - 2, 151, Bp.bronceS); rect(x0 + 2, 136, x1 - 2, 136, Bp.bronce); rect(x0 + 2, 151, x1 - 2, 151, hex('#5a3a18'));
    poligono([[x0 + 6, 142], [x0 + 10, 138], [x0 + 14, 142]], Bp.bronceL); pset(x0 + 10, 138, P.blanco);
    R.numero('345', 210, 150, { color: hex('#ffe6a0'), centro: true, sombra: false, fina: true }); }
}

function g_britton(R, t, o) {
  const { rect, pset, linea, disco } = R, P = g_P, Bp = g_B, B = R.buf;
  g_cielo(R, t, { hor: 110, modo: 'dia', sol: [232, 30, 8], estela: [36, 0.04], cumulos: 5 });
  for (let k = 0; k < 3; k++) { const x = ((t * (6 + k) + k * 120) % 380) - 30, y = 54 + k * 6 + Math.sin(t + k) * 2; if (!(x > 268 && y < 48)) g_pajaro(R, x, y, t, Bp.pajaroC, k); }
  g_poner(R, g_capa(R, 'interior|britton', () => g_brittonFijo(R)));
  // los manchones de sol entre los pinos que se mueven despacio sobre la pinocha
  for (let k = 0; k < 5; k++) { const cx = ((h(k, 1, 501) * 320 + Math.sin(t * 0.3 + k) * 8) | 0), cy = 164 + (k % 3) * 5, rx = 8 + k % 3 * 3;
    for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 2.5) ** 2 < 1 && g_um(cx + i, cy + j) < 0.45) { const y = cy + j; if (y > g_mont(cx + i) + 1) pset(cx + i, y, g_mezcla(B[y * 320 + cx + i] || 0, Bp.luz, 0.35)); } }
  // los pinos cercanos de los lados (el de la derecha queda fuera de la esquina de Atom), con la ardilla que sube y baja
  // por el tronco y el pájaro carpintero de cresta roja que pica
  g_pino(R, 8, 166, 128, t, 1.6, 0, 7); g_pino(R, 266, 158, 104, t, 1.4, 0, 9); g_pino(R, 118, 156, 116, t, 1.1, 0, 11);
  { const u = (Math.sin(t * 0.7) + 1) / 2, y = Math.round(160 - u * 70), x = 12; rect(x, y, x + 1, y + 4, Bp.ardilla); pset(x + 1, y - 1, Bp.ardilla); pset(x + 2, y - 1, P.k); linea(x - 1, y + 4, x - 3, y + 1 + Math.round(Math.sin(t * 8)), Bp.ardilla); pset(x - 3, y, g_mezcla(Bp.ardilla, P.blanco, 0.4)); }
  { const x = 115, y = 96, p = Math.sin(t * 14) > 0 && Math.sin(t * 1.3) > 0; rect(x - 1, y, x, y + 4, P.k); pset(x, y + 1, P.blanco); pset(x - 1, y - 1, Bp.rojoP); pset(x - 2 + (p ? 1 : 0), y, P.k); pset(x - 3 + (p ? 1 : 0), y, P.chapaD); }
  // la tortuga de tierra que cruza despacio el claro (el gag del pinar)
  { const x = Math.round(((t * 2.2) % 120) + 96), y = 168; rect(x - 4, y - 3, x + 3, y - 1, Bp.tortugaS); rect(x - 3, y - 4, x + 2, y - 3, Bp.tortuga); pset(x - 2, y - 4, Bp.tortugaL); pset(x, y - 3, Bp.tortugaL); pset(x - 3, y - 2, Bp.tortuga); pset(x + 1, y - 2, Bp.tortuga);
    rect(x + 4, y - 3, x + 5, y - 2, Bp.tortugaL); pset(x + 5, y - 3, P.k); const p = Math.floor(t * 3) % 2; pset(x - 3 + p, y, Bp.tortugaS); pset(x + 2 - p, y, Bp.tortugaS); }
  // mariposas y agujas que caen
  for (let k = 0; k < 3; k++) { const x = Math.round(60 + k * 80 + Math.sin(t * 0.9 + k * 2) * 20), y = Math.round(128 + Math.sin(t * 1.7 + k) * 8), a = Math.sin(t * 16 + k) > 0; pset(x, y, P.k); pset(x - 1, y - (a ? 1 : 0), [P.amarillo, P.blanco, hex('#f08a30')][k]); pset(x + 1, y - (a ? 1 : 0), [P.amarillo, P.blanco, hex('#f08a30')][k]); }
  for (let k = 0; k < 5; k++) { const u = (t * 0.15 + k / 5) % 1, x = Math.round(30 + k * 60 + Math.sin(t + k) * 5 + u * 10), y = Math.round(60 + u * 100); pset(x, y, Bp.pinochaL); pset(x + 1, y + 1, Bp.pinocha); }
  // la bandera en la cima: el mástil se clava y la banderola (una montaña blanca sobre naranja) ondea
  const bd = Math.max(0, Math.min(1, o.bandera ?? 0));
  if (bd > 0) { const x = 180, y0 = Math.round(g_mont(180)), alto = Math.round(26 * Math.min(1, bd * 1.6)); rect(x, y0 - alto, x, y0, P.chapaD); pset(x + 1, y0 - alto, P.chapaL); disco(x, y0 - alto - 1, 1, P.amarillo);
    if (bd > 0.5) { const w = Math.round(14 * Math.min(1, (bd - 0.5) * 2)); for (let i = 1; i <= w; i++) { const o2 = Math.round(Math.sin(t * 7 - i * 0.6) * (i / w) * 1.6), hh = Math.round(4 * (1 - i / (w + 6))); for (let j = -hh; j <= hh + 1; j++) pset(x + i, y0 - alto + 4 + j + o2, j === hh + 1 ? hex('#b8501a') : hex('#f07a2a')); }
      if (w > 9) { pset(x + 5, y0 - alto + 3, P.blanco); pset(x + 4, y0 - alto + 4, P.blanco); pset(x + 6, y0 - alto + 4, P.blanco); rect(x + 3, y0 - alto + 5, x + 7, y0 - alto + 5, P.blanco); } } }
  return { suelo: 160, libre: [20, 270], cima: [170, 150], mastil: [180, Math.round(g_mont(180))], placa: [210, 144], monolito: [200, 125, 220, 158], mesa: [52, 140, 92, 160], coche: [14, 156], poste: [252, 160] };
}

// las matas de palmito del primer término (delante de los actores), en las dos esquinas de abajo
function g_brittonDelante(R, t) { g_palmito(R, 6, 182, 2.2, t, 1); g_palmito(R, 312, 182, 2.4, t, 4); g_palmito(R, 296, 184, 1.6, t, 6); }

// plana (superficie en y 100, de x 24 a 228) con sus capas de conchas y fósiles, el acuífero con agua en una cueva, el
// borde de la plataforma que cae al golfo a la izquierda y, a la derecha (x 228–320), los montes de Georgia y las
// Carolinas, de otra roca (plegada y gris). El nivel del mar (o.mar 0–1) baja de y 76 a y 114: la línea azul punteada
// va de x 20 a 300 y el agua llena todo lo que queda por debajo, con peces; lo que sale al aire se cubre de verde
const g_K = pal({
  cal0: '#ecdcb8', cal1: '#e0cca0', cal2: '#d4bc8e', cal3: '#c8ac7c', calS: '#a88c62', calL: '#f8ecd0', concha: '#fff6e4', conchaS: '#c8a882', coral: '#e89a7a',
  roca0: '#8a8494', roca1: '#6e6a7c', roca2: '#9a8a8a', rocaL: '#b4aebc', rocaD: '#4a4658', base: '#5a4a46', baseS: '#3e3230',
  agua: '#3a8ad0', aguaL: '#7ac0f0', aguaS: '#1e5aa0', linea: '#1a4aa0', acuif: '#4aa0e0', pez: '#f0a040', monteF: '#8aa0c0', monteFS: '#7088ac',
  verde: '#6aa84a', verdeS: '#4a7a34', verdeL: '#9ad06a',
});

const g_sup = (x) => x < 24 ? 140 - (x / 24) ** 0.7 * 40 : x <= 228 ? 100 + Math.round(Math.sin(x * 0.13) * 0.6) - (Math.abs(x - 70) < 4 ? 1 : 0) : Math.max(52, 100 - (x - 228) * 0.25 - Math.max(0, x - 250) * 0.5 - Math.sin((x - 250) * 0.12) * Math.max(0, x - 250) * 0.1);   // los montes no suben de y 52 (la esquina de Atom)

function g_capasFijo(R) {
  const { rect, pset, linea, disco } = R, P = g_P, K = g_K, B = R.buf;
  // los montes lejanos (azulados) detrás de los de la derecha: lejos del rincón de Atom
  for (let x = 196; x < 320; x++) { const top = Math.round(Math.max(52, 70 - (x - 196) * 0.22 - Math.sin(x * 0.08) * 5 - Math.sin(x * 0.21) * 2)); for (let y = top; y < 100; y++) B[y * 320 + x] = y === top ? g_mezcla(K.monteF, P.blanco, 0.3) : g_um(x, y) < (y - top) / 40 ? K.monteFS : K.monteF; }
  const C4 = [K.cal0, K.cal1, K.cal2, K.cal3];
  for (let y = 40; y < 180; y++) for (let x = 0; x < 320; x++) { const s = g_sup(x); if (y < s) continue;
    const roca = x > 236 + (y - 100) * 0.5, prof = y - s;
    let c;
    if (y > 168) c = g_um(x, y) < (y - 168) / 10 ? K.baseS : K.base;
    else if (roca) { const pl = y + Math.sin(x * 0.09 + y * 0.02) * 6 + Math.sin(x * 0.03) * 4, k = Math.floor(pl / 6) & 3; c = [K.roca0, K.roca1, K.roca2, K.roca1][k]; if (Math.abs(pl % 6) < 0.8) c = K.rocaD; if (h(x, y, 510) > 0.94) c = K.rocaL; }
    else { const cap = y + (x - 160) * 0.03, k = Math.floor((cap - 100) / 10), f = (cap - 100) - k * 10; c = C4[((k % 4) + 4) % 4]; if (f < 1) c = K.calS; else if (f > 9 && g_um(x, y) < 0.5) c = K.calS;
      const q = h(x >> 1, y >> 1, 511 + k); if (q > 0.93) c = K.calL; else if (q < 0.04) c = K.calS; }
    if (prof < 2 && !roca) c = prof < 1 ? K.calS : K.cal0;
    B[y * 320 + x] = c; }
  // los fósiles: conchas en espiral, vieiras con sus rayas, galletas de mar con su estrella y ramitas de coral
  for (let k = 0; k < 70; k++) { const x = Math.round(28 + h(k, 1, 512) * 200), y = Math.round(106 + h(k, 2, 512) * 60), tipo = k % 4; if (y > 166 || (x > 112 && x < 168 && y > 132 && y < 152)) continue;
    if (tipo === 0) { R.anillo(x + 0.5, y + 0.5, 2.5, K.conchaS); pset(x, y, K.concha); pset(x + 1, y - 1, K.concha); pset(x - 1, y + 1, K.conchaS); }
    else if (tipo === 1) { for (let i = -3; i <= 3; i++) linea(x, y + 2, x + i, y - 1, i % 2 ? K.concha : K.conchaS); rect(x - 1, y + 2, x + 1, y + 2, K.conchaS); }
    else if (tipo === 2) { R.disco(x, y, 2.5, K.concha); pset(x, y - 1, K.conchaS); pset(x - 1, y, K.conchaS); pset(x + 1, y, K.conchaS); pset(x, y + 1, K.conchaS); }
    else { linea(x, y + 3, x, y - 1, K.coral); linea(x, y, x - 2, y - 2, K.coral); linea(x, y + 1, x + 2, y - 1, K.coral); } }
  // el acuífero: una cueva en la caliza llena de agua dulce, con su borde oscuro
  for (let y = 132; y < 152; y++) for (let x = 112; x < 170; x++) { const e = ((x - 140) / 28) ** 2 + ((y - 142) / 9) ** 2 + Math.sin(x * 0.4) * 0.08; if (e < 1) B[y * 320 + x] = e > 0.82 ? K.calS : K.acuif; }
  // el borde del corte: una línea oscura que lo enmarca
  for (let x = 0; x < 320; x++) { const s = Math.round(g_sup(x)); if (s >= 40) pset(x, s, x > 236 ? K.rocaD : K.calS); }
  // la loma minúscula de Britton Hill en la superficie (x 70) con su banderita
  rect(70, 92, 70, 98, P.chapaD); pset(71, 92, P.rojo); pset(72, 93, P.rojo); pset(71, 93, P.rojo);
}

function g_capas(R, t, o) {
  const { rect, pset, linea, disco } = R, P = g_P, K = g_K, B = R.buf, mar = Math.max(0, Math.min(1, o.mar ?? 0)), ym = Math.round(lerp(76, 114, mar));
  g_cielo(R, t, { hor: 140, modo: 'dia', sol: [228, 26, 8], estela: [30, 0.03], cumulos: 4 });
  for (let k = 0; k < 4; k++) { const x = ((t * (9 + k) + k * 50) % 380) - 30, y = 48 + k * 4 + Math.sin(t * 0.8 + k) * 2; if (!(x > 268 && y < 48)) g_pajaro(R, x, y, t, k % 2 ? P.blanco : P.hormD, k); }
  g_poner(R, g_capa(R, 'interior|capas', () => g_capasFijo(R)));
  // el agua: todo lo que queda por debajo del nivel del mar y por encima del suelo, con su superficie que ondula, los
  // brillos y los peces (más azul en lo hondo)
  for (let x = 0; x < 320; x++) { const s = Math.round(g_sup(x)); for (let y = ym; y < s; y++) { const d = (y - ym) / 40, i = y * 320 + x; const c = g_um(x, y) < d ? K.aguaS : K.agua; B[i] = g_mezcla(B[i], c, 0.82);
    if (y === ym || (y === ym + 1 && Math.sin(x * 0.4 + t * 3) > 0.3)) B[i] = Math.sin(x * 0.3 - t * 2) > 0.2 ? K.aguaL : P.blanco; } }
  for (let k = 0; k < 6; k++) { const x = Math.round(((t * (6 + k * 2) + k * 70) % 260) + 20), y = Math.round(ym + 6 + (k * 5) % 16 + Math.sin(t * 2 + k) * 1.5); if (y >= g_sup(x) - 2 || y < ym + 3) continue;
    rect(x - 2, y, x + 1, y + 1, K.pez); pset(x - 3, y - 1, K.pez); pset(x - 3, y + 2, K.pez); pset(x + 1, y, P.k); }
  // lo que queda al aire: hierba, palmitos y pinitos que asoman en la superficie de caliza
  for (let x = 24; x < 236; x += 2) { const s = Math.round(g_sup(x)); if (s > ym - 1) continue; const e = Math.min(1, (ym - s) / 8);
    pset(x, s - 1, K.verde); if (h(x, 1, 513) < e) pset(x, s - 2, Math.sin(t * 2 + x) > 0 ? K.verdeL : K.verde); if (x % 22 === 0 && e > 0.8) { const hh = 4 + (x % 3); linea(x, s - 1, x, s - hh, P.poste); disco(x, s - hh - 1, 2, K.verdeS); pset(x - 1, s - hh - 2, K.verdeL); } }
  // el acuífero que rebrilla
  for (let k = 0; k < 8; k++) { const x = 118 + k * 6, y = 140 + Math.round(Math.sin(t * 1.5 + k) * 2); pset(x, y, K.aguaL); }
  // la línea del nivel del mar: punteada, gruesa, con sus flechitas a los lados (sin letras)
  for (let x = 20; x <= 300; x++) if ((x >> 2) % 2 === 0) { pset(x, ym - 1, K.linea); pset(x, ym - 2, K.linea); }
  for (const [x, d] of [[16, 1], [304, -1]]) { for (let j = 0; j < 4; j++) { pset(x - d * j, ym - 2 - j, K.linea); pset(x - d * j, ym - 1 + j, K.linea); } rect(Math.min(x, x + d * 3), ym - 2, Math.max(x, x + d * 3), ym - 1, K.linea); }
  return { suelo: 170, libre: [0, 0], mar: [20, 300], nivelMar: ym, superficie: 100, montes: [236, 52, 320, 100], acuifero: [112, 132, 170, 152], brittonHill: [70, 98] };
}

// y 112–160) con tres hilos lisos arriba, la puerta corredera en x 160–210 (y 120–162) que se abre hacia la derecha
// (o.abre 0–1), la garita con el vigilante (x 124–150), el mástil con la bandera, dentro los pabellones bajos, la torre
// del agua y las farolas; a la izquierda la carretera recta que se va al horizonte (y 104, fuga en x 40); delante, el
// aparcamiento con coches y una palmera
const g_C = pal({
  pab: '#e2d6bc', pabS: '#b8aa8e', pabL: '#f4ecd8', pabD: '#8a7e68', techoP: '#9aa0a6', malla: '#9aa4ac', mallaS: '#6a747e', mallaL: '#d0d8de', tubo: '#b4bcc4', tuboS: '#7a828c',
  cesped: '#8ab84a', cespedS: '#5e8a34', cespedL: '#b4d870', pasto: '#c4c070', pastoS: '#98944a', carretera: '#5a5a62', carreteraL: '#7a7a82', raya: '#f0d040',
  coche1: '#c84a3a', coche2: '#3a6ab0', coche3: '#e8e4dc', coche4: '#4a8a5a', azulB: '#2a3a8a', rojoB: '#c8302a',
});

// un coche aparcado de lado (unos 30 px): carrocería con brillo y sombra, cristales con reflejo, tapacubos
function g_coche(R, x, suelo, c, dir = 1) {
  const { rect, pset, disco } = R, P = g_P, cS = g_mezcla(c, P.k, 0.35), cL = g_mezcla(c, P.blanco, 0.4), X = (i) => Math.round(x + i * dir), r = (a, y0, b, y1, col) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, col);
  r(-15, suelo - 9, 15, suelo - 3, P.k); r(-14, suelo - 8, 14, suelo - 4, c); r(-14, suelo - 8, 14, suelo - 8, cL); r(-14, suelo - 4, 14, suelo - 4, cS);
  r(-8, suelo - 14, 7, suelo - 9, P.k); r(-7, suelo - 13, 6, suelo - 9, c); r(-6, suelo - 12, -1, suelo - 9, hex('#9ac8e8')); r(1, suelo - 12, 5, suelo - 9, hex('#9ac8e8')); pset(X(-5), suelo - 12, P.blanco); pset(X(2), suelo - 12, P.blanco);
  pset(X(14), suelo - 7, P.amarillo); pset(X(-14), suelo - 7, P.rojo); rect(Math.min(X(-1), X(0)), suelo - 7, Math.max(X(-1), X(0)), suelo - 7, cS);
  for (const wx of [X(-9), X(9)]) { disco(wx, suelo - 2, 2.8, P.k); disco(wx, suelo - 2, 1.4, P.chapa); }
}

function g_carcelFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, P = g_P, Cc = g_C, B = R.buf;
  // el campo lejano a la izquierda: pasto con hileras de matojos, una arboleda en el horizonte y la carretera que fuga
  for (let y = 104; y < 160; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y, 520); B[y * 320 + x] = y < 106 ? (h(x >> 2, 1, 521) > 0.4 ? P.arbolF : P.bruma) : q > 0.88 ? Cc.pastoS : g_um(x, y) < (y - 104) / 60 ? Cc.pastoS : Cc.pasto; }
  for (let x = 0; x < 120; x++) { const top = 103 - Math.round(Math.max(0, Math.sin(x * 0.11) * 2 + h(x >> 1, 2, 522) * 2)); for (let y = top; y < 106; y++) pset(x, y, y === top ? P.arbolFS : P.arbolF); }
  poligono([[38, 104], [43, 104], [96, 180], [-60, 180]], (x, y) => { const u = (y - 104) / 76, c = (x - 40.5 - (y - 104) * 0.03) / (u * 78 + 0.5); return Math.abs(c) < 0.03 && ((y * 7 / (1 + u * 4)) | 0) % 2 === 0 ? Cc.raya : Math.abs(Math.abs(c) - 0.92) < 0.04 ? P.blanco : h(x, y, 523) > 0.9 ? Cc.carreteraL : Cc.carretera; });
  for (const [px, top] of [[64, 116], [50, 108], [44, 105]]) { const s = (top - 100) / 16; linea(px, top, px, top + Math.round(16 * s), P.poste); rect(px - Math.round(3 * s), top + 1, px + Math.round(3 * s), top + 1, P.poste); }
  // dentro: los pabellones bajos de hormigón con ventanas estrechas, la torre del agua y las farolas altas
  for (const [x0, x1, top] of [[110, 196, 92], [220, 300, 86], [296, 320, 96]]) { rect(x0, top, x1, 112, P.k); rect(x0 + 1, top + 1, x1 - 1, 112, Cc.pab); rect(x0 + 1, top + 1, x1 - 1, top + 3, Cc.techoP); rect(x1 - 4, top + 4, x1 - 1, 112, Cc.pabS);
    for (let y = top + 4; y < 112; y++) for (let x = x0 + 1; x < x1 - 4; x++) if (h(x, y, 524) > 0.95) pset(x, y, Cc.pabS);
    for (let x = x0 + 5; x < x1 - 6; x += 7) { rect(x, top + 7, x + 1, top + 14, P.ventana); pset(x, top + 7, Cc.pabD); } }
  { const cx = 262; for (const lx of [cx - 8, cx + 8]) linea(lx, 86, lx + (lx < cx ? 3 : -3), 66, P.chapaS); rect(cx - 12, 50, cx + 12, 66, P.k); rect(cx - 11, 51, cx + 11, 65, P.chapaL); rect(cx + 5, 51, cx + 11, 65, P.chapa); disco(cx, 50, 6, P.chapaS); rect(cx - 12, 64, cx + 12, 64, P.chapaS); for (let x = cx - 10; x < cx + 11; x += 4) pset(x, 66, P.chapaD); }
  for (const lx of [124, 232]) { rect(lx, 58, lx + 1, 112, P.chapaS); rect(lx - 4, 56, lx + 5, 58, P.k); rect(lx - 3, 57, lx + 4, 57, P.chapaL); }
  // el césped de dentro, cortado a franjas, y el camino de hormigón de la puerta a los pabellones
  for (let y = 112; y < 160; y++) for (let x = 96; x < 320; x++) { const f = ((x >> 3) + (y >> 4)) & 1; B[y * 320 + x] = f ? Cc.cesped : g_mezcla(Cc.cesped, Cc.cespedL, 0.35); if (g_um(x, y) < (y - 112) / 120) B[y * 320 + x] = Cc.cespedS; }
  poligono([[176, 112], [194, 112], [212, 160], [158, 160]], (x, y) => ((y - 112) % 8 === 0 ? P.hormS : h(x, y, 525) > 0.9 ? P.hormS : P.horm));
  rect(160, 160, 270, 162, P.hormD);   // el carril de la corredera
  // la garita del vigilante: caseta con ventanas a tres lados, tejadillo que vuela, el aire acondicionado
  { rect(122, 126, 152, 160, P.k); rect(123, 127, 151, 160, Cc.pab); rect(146, 127, 151, 160, Cc.pabS); rect(119, 121, 155, 126, P.k); rect(120, 122, 154, 125, Cc.techoP); rect(120, 125, 154, 125, P.chapaD);
    rect(126, 131, 148, 143, P.k); rect(127, 132, 147, 142, hex('#4a6a8a')); linea(128, 132, 134, 142, hex('#8ab0d0')); rect(124, 150, 150, 152, Cc.pabD); rect(152, 140, 156, 148, P.chapaS); rect(152, 140, 156, 140, P.chapaL); }
  // el aparcamiento: asfalto con rayas, los topes y una isleta con una palmera
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y, 526); B[y * 320 + x] = q > 0.9 ? Cc.carreteraL : q < 0.08 ? hex('#4a4a52') : g_um(x, y) < 0.2 ? hex('#4a4a52') : Cc.carretera; }
  for (let x = 96; x < 320; x++) { pset(x, 160, P.hormL); pset(x, 161, P.hormS); }
  for (let k = 0; k < 7; k++) { const x0 = 226 + k * 14; if (x0 > 318) break; linea(x0, 164, x0 - 4, 179, Cc.raya, 0); }
  for (let k = 0; k < 5; k++) { const x = 20 + k * 30; linea(x, 166, x + 6, 179, P.blanco); }
  for (const [cx, cy] of [[74, 172], [252, 175]]) for (let i = -7; i <= 7; i++) for (let j = -2; j <= 2; j++) if ((i / 7) ** 2 + (j / 2.2) ** 2 < 1) pset(cx + i, cy + j, hex('#3e3c46'));
}

// la valla de la cárcel (se pinta en cada fotograma, después de la vida de dentro y antes de la garita, que va
// delante): postes, la malla en rombos que deja ver lo de detrás, el tubo de arriba y los tres hilos lisos
function g_valla(R) {
  const { rect, pset } = R, P = g_P, Cc = g_C, garita = (x, y) => x >= 119 && x <= 156 && y >= 121;
  for (let y = 112; y < 160; y++) for (let x = 96; x < 320; x++) { if ((x >= 160 && x <= 210) || garita(x, y)) continue; const a = (x + y) % 6 === 0, b = (x - y + 600) % 6 === 0; if (a || b) pset(x, y, (a && b) ? Cc.mallaL : y > 150 ? Cc.mallaS : Cc.malla); }
  for (let x = 96; x < 320; x += 22) { if ((x > 156 && x < 214) || (x >= 119 && x <= 156)) continue; rect(x, 104, x + 1, 160, Cc.tuboS); for (let y = 104; y < 160; y++) pset(x, y, Cc.tubo); }
  rect(96, 112, 320, 113, Cc.tubo); rect(96, 113, 320, 113, Cc.tuboS);
  for (const y of [105, 108, 111]) for (let x = 96; x < 320; x++) { pset(x, y, Cc.tuboS); if (x % 9 === 0) { pset(x, y - 1, Cc.tuboS); pset(x + 1, y + 1, Cc.tuboS); } }
  for (const x of [158, 211]) { rect(x - 1, 102, x + 2, 162, P.k); rect(x, 103, x + 1, 162, Cc.tubo); }
}

function g_carcel(R, t, o) {
  const { rect, pset, linea, disco } = R, P = g_P, Cc = g_C, B = R.buf, ab = Math.max(0, Math.min(1, o.abre ?? 0));
  g_cielo(R, t, { hor: 104, modo: 'calor', sol: [92, 42, 9], estela: [28, 0.03], cumulos: 4 });
  for (let k = 0; k < 3; k++) { const x = ((t * (7 + k)) + k * 110) % 380 - 30, y = 56 + k * 7; if (!(x > 268 && y < 48)) g_pajaro(R, x, y, t, P.arbolFS, k); }
  g_poner(R, g_capa(R, 'interior|carcel', () => g_carcelFijo(R)));
  // el calor que tiembla sobre la carretera lejana
  for (let y = 104; y < 112; y++) for (let x = 30; x < 52; x++) if (h(x, y, Math.floor(t * 6)) > 0.8) pset(x + Math.round(Math.sin(t * 9 + y) * 1), y, g_mezcla(B[y * 320 + x], P.bruma, 0.6));
  // las vacas del rancho de al lado, que pastan en el campo de la izquierda (cabeceos y colas)
  for (const [vx, vy, k] of [[70, 118, 0], [86, 124, 1], [60, 130, 2]]) { const d = k % 2 ? -1 : 1, X = (i) => vx + i * d, c = k === 1 ? hex('#3a2a22') : hex('#8a5a3a'), cl = k === 1 ? hex('#5a4a3a') : hex('#b07a50'), baja = Math.sin(t * 0.7 + k * 2) > 0;
    rect(Math.min(X(-4), X(3)), vy - 4, Math.max(X(-4), X(3)), vy - 1, c); rect(Math.min(X(-4), X(3)), vy - 4, Math.max(X(-4), X(3)), vy - 4, cl); if (k !== 1) { pset(X(-1), vy - 3, P.blanco); pset(X(0), vy - 2, P.blanco); }
    for (const lx of [-3, -2, 1, 2]) pset(X(lx), vy, P.k); rect(Math.min(X(4), X(5)), vy - (baja ? 2 : 5), Math.max(X(4), X(5)), vy - (baja ? 0 : 3), c); pset(X(5), vy - (baja ? 2 : 6), cl);
    pset(X(-5), vy - 3 + Math.round(Math.sin(t * 3 + k)), c); pset(X(-5), vy - 2, c); }
  // un coche que se aleja por la carretera hacia el horizonte (cada 9 s)
  { const u = (t % 9) / 9, y = Math.round(178 - u * 72), s = 1 - u * 0.85, x = Math.round(lerp(28, 41, u)); if (s > 0.2) { const w = Math.max(2, Math.round(10 * s)), hh = Math.max(1, Math.round(6 * s)); rect(x - w, y - hh, x + w, y, P.k); rect(x - w + 1, y - hh + 1, x + w - 1, y - 1, Cc.coche2); if (w > 3) { pset(x - w + 1, y - 2, P.rojoL); pset(x + w - 1, y - 2, P.rojoL); } } }
  // el carrito eléctrico de mantenimiento que pasa por dentro
  { const x = Math.round(312 - ((t * 9) % 96)); if (x > 220) { rect(x - 6, 130, x + 6, 134, P.blanco); rect(x - 6, 126, x + 6, 126, Cc.techoP); linea(x - 5, 126, x - 5, 130, P.chapaS); linea(x + 5, 126, x + 5, 130, P.chapaS); disco(x - 4, 135, 1.2, P.k); disco(x + 4, 135, 1.2, P.k); g_figura(R, x - 1, 131, t, 3, -1, false); } }
  // los aspersores del césped de dentro
  for (const [sx, sy] of [[248, 140], [292, 150]]) { const a = Math.sin(t * 1.4 + sx) * 1.2; for (let k = 0; k < 8; k++) { const d = k * 2.2; pset(Math.round(sx + Math.cos(-1.2 + a) * d), Math.round(sy - Math.sin(1.2) * d * 0.6 + k * k * 0.12), g_mezcla(Cc.cesped, P.charcoL, 0.7)); } }
  g_valla(R);
  // la garita va delante de la valla: se vuelve a poner desde la capa fija
  { const b = g_capa(R, 'interior|carcel', () => g_carcelFijo(R)); for (let y = 121; y < 161; y++) for (let x = 119; x <= 156; x++) { const c = b[y * 320 + x]; if (c !== g_VACIO) B[y * 320 + x] = c; } }
  // la puerta corredera: un bastidor de tubo con su malla que se desliza a la derecha, por delante de la valla
  { const dx = Math.round(ab * 54), x0 = 160 + dx, x1 = 210 + dx;
    for (let y = 120; y < 160; y++) for (let x = x0; x <= x1; x++) { const a = (x - dx + y) % 6 === 0, b = (x - dx - y + 600) % 6 === 0; if (a || b) pset(x, y, (a && b) ? Cc.mallaL : Cc.malla); }
    rect(x0, 118, x1, 120, P.k); rect(x0, 118, x1, 119, Cc.tubo); rect(x0, 158, x1, 160, Cc.tuboS); rect(x0, 118, x0 + 1, 160, Cc.tubo); rect(x1 - 1, 118, x1, 160, Cc.tuboS); linea(x0 + 1, 120, x1 - 1, 158, Cc.tuboS); rect(Math.round((x0 + x1) / 2), 118, Math.round((x0 + x1) / 2), 160, Cc.tubo);
    for (const wx of [x0 + 5, x1 - 5]) { disco(wx, 161, 1.6, P.k); pset(wx + (Math.floor(t * 8) % 2 && ab > 0 && ab < 1 ? 1 : 0), 161, P.chapa); }
    if (ab > 0 && ab < 1 && Math.floor(t * 3) % 2) { disco(158, 100, 1.6, P.amarillo); pset(158, 99, P.blanco); } else { disco(158, 100, 1.6, P.locoS); } }
  // el vigilante en la garita, que saluda con la mano cuando la puerta se abre
  { const x = 138, y = 143; rect(x - 2, y - 7, x + 2, y - 1, hex('#3a5a8a')); rect(x - 1, y - 10, x + 1, y - 8, hex('#c88a5a')); rect(x - 2, y - 11, x + 2, y - 11, hex('#2a3a5a')); if (ab > 0.2) pset(x + 3, y - 9 - (Math.floor(t * 4) % 2), hex('#c88a5a')); }
  // el mástil con la bandera que ondea con la brisa
  { const x = 108; rect(x, 70, x, 126, P.chapaL); pset(x + 1, 70, P.chapaS); disco(x, 69, 1, P.amarillo);
    for (let i = 1; i <= 16; i++) { const o2 = Math.round(Math.sin(t * 4 - i * 0.5) * i / 16 * 2); for (let j = 0; j < 9; j++) { const azul = i <= 7 && j < 5; pset(x + i, 72 + j + o2, azul ? ((i + j) % 2 ? Cc.azulB : P.blanco) : j % 2 ? P.blanco : Cc.rojoB); } } }
  // los coches aparcados y la palmera de la isleta
  g_coche(R, 238, 176, Cc.coche1, 1); g_coche(R, 270, 176, Cc.coche3, -1); g_coche(R, 300, 176, Cc.coche4, 1);
  rect(76, 155, 96, 158, P.horm); rect(76, 155, 96, 155, P.hormL); for (let x = 77; x < 96; x++) pset(x, 156, h(x, 1, 527) > 0.5 ? Cc.cespedS : Cc.cesped); g_sabal(R, 86, 156, 50, t, 1, 2);
  return { suelo: 162, libre: [30, 280], puerta: [160, 120, 210, 162], hueco: [160, 160 + Math.round(ab * 54)], garita: [122, 126, 152, 160], horizonte: 104, sol: [92, 42], carretera: [40, 104], mastil: [108, 70] };
}

// pone el sol; a los lados, arcenes de hierba (los actores, en y 160: x 30–85 y 235–290, o en el asfalto) y, más allá, el
// pantano con el cielo reflejado, cipreses y palmeras; los postes de la luz que se alejan; un coche que se va
const g_cuneta = (y) => (y - 100) / 80;

function g_carreteraFijo(R) {
  const { rect, pset, linea, disco } = R, P = g_P, Cc = g_C, B = R.buf;
  // las islas de cipreses y palmeras del horizonte (siluetas moradas a contraluz)
  for (let x = 0; x < 320; x++) { if (Math.abs(x - 160) < 14) continue; const top = 100 - Math.round(Math.max(0, Math.sin(x * 0.05) * 4 + Math.sin(x * 0.13 + 1) * 2 + h(x >> 1, 3, 530) * 2)); for (let y = top; y < 100; y++) pset(x, y, hex('#4a2a5a')); }
  for (let k = 0; k < 7; k++) { const x = Math.round(h(k, 1, 531) * 120) + (k % 2 ? 190 : 0), base = 100, alto = 10 + (k % 3) * 4;
    linea(x, base, x + 1, base - alto, hex('#3a1e4a')); for (let j = 0; j < 7; j++) { const a = -Math.PI * j / 6; for (let d = 1; d < 5; d++) pset(Math.round(x + 1 + Math.cos(a) * d), Math.round(base - alto + Math.sin(a) * d * 0.6 + d * 0.3), hex('#3a1e4a')); } }
  // el asfalto, los arcenes de hierba y el pantano a los lados
  for (let y = 100; y < 180; y++) { const u = g_cuneta(y), half = u * 100, sh = half + u * 70;
    for (let x = 0; x < 320; x++) { const d = Math.abs(x - 160), i = y * 320 + x;
      if (d <= half) { const c = d / Math.max(0.5, half); let col = h(x, y, 532) > 0.9 ? Cc.carreteraL : g_um(x, y) < 0.25 ? hex('#4a4652') : Cc.carretera;
        if (Math.abs(c - 0.93) < 0.035) col = P.blanco; if (d < Math.max(0.6, u * 2) && Math.floor(Math.pow(u, 0.5) * 30) % 2 === 0) col = Cc.raya;
        col = g_mezcla(col, hex('#e88a5a'), 0.18 * (1 - u)); B[i] = col; }
      else if (d <= sh) { const q = h(x, y, 533); B[i] = d < half + 1.5 ? hex('#8a7a5a') : q > 0.85 ? hex('#a8a050') : q < 0.2 ? hex('#4a5a2a') : g_um(x, y) < 0.5 ? hex('#6a7a34') : hex('#7a8a3a'); } } }
  // los postes de la luz que se alejan a la derecha, con el cable
  let prev = null; for (let k = 0; k < 8; k++) { const u = Math.pow(0.72, k), y = 100 + u * 80, x = Math.round(160 + u * 100 + u * 70 * 0.6), top = Math.round(y - u * 70);
    if (x > 330) continue; rect(x, top, x + Math.max(0, Math.round(u * 2)), Math.round(y), hex('#2a1a2a')); rect(x - Math.round(u * 8), top + 1, x + Math.round(u * 8), top + 1 + Math.round(u), hex('#2a1a2a'));
    if (prev) linea(prev[0], prev[1], x - Math.round(u * 7), top + 1, hex('#2a1a2a')); prev = [x - Math.round(u * 7), top + 1]; }
}

function g_carretera(R, t, o) {
  const { rect, pset, linea, disco } = R, P = g_P, Cc = g_C, B = R.buf;
  g_cielo(R, t, { hor: 100, modo: 'tarde', sol: [160, 92, 13], estela: [40, 0.02], cumulos: 5, sentido: 1 });
  for (let k = 0; k < 5; k++) { const x = ((t * 10 + k * 14) % 400) - 40, y = 50 + Math.sin(k) * 4 + k * 2; if (!(x > 268 && y < 48)) g_pajaro(R, x, y, t, hex('#2a1a3a'), k); }
  // el pantano: el cielo del ocaso reflejado en el agua quieta, con rayas de brillo que tiemblan, nenúfares y juncos
  for (let y = 100; y < 180; y++) { const ry = 200 - y, f = y * 320; for (let x = 0; x < 320; x++) { const yy = Math.max(0, Math.min(99, ry + Math.round(Math.sin(y * 0.8 + t * 2 + x * 0.05) * (y - 100) * 0.03))); let c = B[yy * 320 + x];
    c = g_mezcla(c, hex('#3a2a5a'), 0.28 + (y - 100) / 300); if (Math.sin(x * 0.2 + y * 1.3 - t * 1.5) > 0.96 && Math.abs(x - 160) < 60 + (y - 100)) c = hex('#ffc890'); B[f + x] = c; } }
  g_poner(R, g_capa(R, 'interior|carretera', () => g_carreteraFijo(R)));
  // juncos y palmeras sabal en las orillas (las de cerca, grandes, a los lados), que se mecen
  for (let k = 0; k < 14; k++) { const lado = k % 2 ? 1 : -1, y = 108 + (k >> 1) * 10, u = g_cuneta(y), x = Math.round(160 + lado * (u * 170 + 4 + (k * 7) % 10));
    for (let j = 0; j < 3; j++) { const l = Math.round(3 + u * 8 + j), s = Math.sin(t * 1.6 + k + j) * u * 2; linea(x + j * 2, y, Math.round(x + j * 2 + s + lado), y - l, j === 1 ? hex('#5a6a2a') : hex('#3a4a1e')); } }
  g_sabal(R, 22, 150, 70, t, 1.3, 1); g_sabal(R, 300, 152, 62, t, 1.2, 5); g_sabal(R, 52, 128, 30, t, 0.7, 2); g_sabal(R, 262, 126, 26, t, 0.6, 4);
  // una garza que vuela bajo sobre el pantano
  g_garza(R, ((t * 12) % 380) - 30, 118 + Math.sin(t) * 3, t, 2, 1, true);
  // el coche que se aleja (o.coche 0–1: dónde va; sin él, cada 8 s): un descapotable visto por detrás, con sus pilotos rojos
  { const u = o.coche != null ? Math.max(0, Math.min(1, o.coche)) : (t % 8) / 8, z = 1 - u, y = Math.round(100 + 76 * z * z + 2), s = z * z;
    if (s > 0.02) { const w = Math.max(1, Math.round(22 * s)), hh = Math.max(1, Math.round(10 * s)), x = 160 + Math.round(18 * s);
      rect(x - w, y - hh, x + w, y, P.k); rect(x - w + 1, y - hh + 1, x + w - 1, y - 1, hex('#d84a6a')); if (w > 4) { rect(x - w + 1, y - hh + 1, x + w - 1, y - hh + Math.max(1, Math.round(hh * 0.3)), hex('#f07a9a')); rect(x - w + 2, y - Math.round(hh * 0.5), x - w + 1 + Math.round(w * 0.25), y - Math.round(hh * 0.3), P.rojoL); rect(x + w - 1 - Math.round(w * 0.25), y - Math.round(hh * 0.5), x + w - 2, y - Math.round(hh * 0.3), P.rojoL); }
      if (w > 8) { disco(x - Math.round(w * 0.3), y - hh - 1, Math.max(1, s * 3), hex('#2a1a14')); disco(x + Math.round(w * 0.3), y - hh - 1, Math.max(1, s * 3), hex('#4a2a1a')); }
      if (w > 2) { rect(x - w, y + 1, x - w + Math.round(w * 0.3), y + Math.max(1, Math.round(hh * 0.25)), P.k); rect(x + w - Math.round(w * 0.3), y + 1, x + w, y + Math.max(1, Math.round(hh * 0.25)), P.k); } } }
  return { suelo: 160, libre: [20, 280], horizonte: 100, sol: [160, 92], fuga: [160, 100], arcenes: [[30, 85], [235, 290]] };
}

// las palmeras y la hierba del primer término (delante de los actores), en las dos esquinas de abajo
function g_carreteraDelante(R, t) { const P = g_P; for (const [x0, x1] of [[-4, 18], [302, 324]]) for (let x = x0; x < x1; x += 2) { const l = 10 + Math.round(h(x, 1, 534) * 14), s = Math.sin(t * 1.5 + x * 0.3) * 2; for (let j = 0; j < l; j++) R.pset(Math.round(x + s * (j / l) ** 2), 180 - j, j > l - 3 ? hex('#a8a050') : j % 2 ? hex('#5a6a2a') : hex('#3a4a1e')); } }

const g_VISTAS = {
  cana: { cam: 'dique', general: g_cana, dique: g_dique },
  pueblo: { cam: 'gasolinera', general: g_pueblo, gasolinera: g_gasolinera },
  britton: { cam: 'capas', general: g_britton, capas: g_capas },
  carcel: { cam: 'carretera', general: g_carcel, carretera: g_carretera },
};

const g_DELANTE = {
  'cana|general': (R, t) => g_canaDelante(R, t),
  'cana|dique': (R, t) => g_diqueDelante(R, t),
  'pueblo|general': (R, t) => g_puebloDelante(R, t),
  'pueblo|gasolinera': (R, t) => g_gasolineraDelante(R, t),
  'britton|general': (R, t) => g_brittonDelante(R, t),
  'carcel|carretera': (R, t) => g_carreteraDelante(R, t),
};
