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
export function cayos(R, t, o = {}) { return vista(R, t, o, V_CAYOS); }
export function cayosDelante(R, t, o = {}) {}

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
// o.encuadre (y o.camara). LLAMA A redaccionDelante DESPUÉS DE LOS ACTORES (las mesas y el mostrador).
//   'redaccion' (general): UNA REDACCIÓN DE PERIÓDICO: mesas con ordenadores y pantallas con titulares (barras, sin
//     letras) y fotos pequeñas de caimanes, teléfonos, montones de papeles, un tablón con recortes, ventanales con la
//     ciudad de día, una tele en la pared y, en primer término, LA IMPRESORA que escupe hojas (o.papeles 0–1: las hojas
//     que van llenando el suelo). Devuelve suelo 160, libre [20, 260], impresora: [70, 140], mesa: [150, 140].
//     Cámara 'impresora': LA IMPRESORA DE CERCA, con las hojas que salen una tras otra (barras de titular y una foto
//     pequeña) y caen en un montón. Devuelve suelo 170, libre [180, 300], bandeja: [120, 120].
//   'archivo': UN ARCHIVO PÚBLICO: un mostrador de madera con su campanilla, filas de archivadores metálicos y cajones,
//     estanterías con carpetas y cajas numeradas, un número grande «119» en la pared (solo cifras), una ventanilla de
//     cristal, un ventilador de techo, una fila de gente pequeña que espera. Devuelve suelo 162, libre [20, 250],
//     mostrador: [140, 140, 230, 162]. Cámara 'cajones': LOS CAJONES DE CERCA: un cajón abierto con fichas que se
//     sacan, etiquetas con números. Devuelve suelo 170, libre [0, 0], cajon: [160, 110].
const V_REDACCION = {
  redaccion: { cam: 'impresora', general: {"col": ["#d8d4c8", "#5a5a66"], "geo": {"suelo": 160, "libre": [20, 260], "impresora": [70, 140], "mesa": [150, 140]}}, impresora: {"col": ["#f2ecd8", "#5a5a66"], "geo": {"suelo": 170, "libre": [180, 300], "bandeja": [120, 120]}} },
  archivo: { cam: 'cajones', general: {"col": ["#c8b898", "#8a5a34"], "geo": {"suelo": 162, "libre": [20, 250], "mostrador": [140, 140, 230, 162]}}, cajones: {"col": ["#8a8e96", "#5a5e66"], "geo": {"suelo": 170, "libre": [0, 0], "cajon": [160, 110]}} },
};
export function redaccion(R, t, o = {}) { return vista(R, t, o, V_REDACCION); }
export function redaccionDelante(R, t, o = {}) {}

// ── F · El móvil vertical ─────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Todo el plano es UN MÓVIL EN VERTICAL en el centro (unos 96×170 px, x 112–208) sobre un fondo
// borroso y oscuro de colores (como el fondo de las redes), con su marco, su muesca, la barra de corazones y comentarios
// (iconos, sin letras) a la derecha del vídeo. LLAMA A movilDelante DESPUÉS DE LOS ACTORES (el marco del móvil y los
// iconos, por encima de lo que la escena pinte dentro). Devuelve la ventana del vídeo pantalla: [x0, y0, x1, y1].
//   'causeway' (general): DENTRO DEL MÓVIL, EL PUENTE MACARTHUR CAUSEWAY al atardecer: la calzada que cruza la bahía,
//     el mar, los rascacielos de Miami Beach al fondo, palmeras en la mediana, coches que pasan (la escena pinta el coche
//     con la bailarina encima, pequeña). Devuelve suelo 150 (dentro del móvil), libre [116, 204], pantalla: [116, 14, 204,
//     170], calzada: [116, 204, 136, 150]. Cámara 'feed': EL FEED: el móvil desliza vídeos verticales uno tras otro
//     (o.desliza 0–1: un caimán en una tienda, una piscina, una playa, un puente), con corazones que suben.
//     Devuelve suelo 160, libre [116, 204], pantalla: [116, 14, 204, 170].
const V_MOVIL = {
  causeway: { cam: 'feed', general: {"col": ["#ff8a4a", "#1a1a3a"], "geo": {"suelo": 150, "libre": [116, 204], "pantalla": [116, 14, 204, 170], "calzada": [116, 204, 136, 150]}}, feed: {"col": ["#2a1a4a", "#1a1a3a"], "geo": {"suelo": 160, "libre": [116, 204], "pantalla": [116, 14, 204, 170]}} },
};
export function movil(R, t, o = {}) { return vista(R, t, o, V_MOVIL); }
export function movilDelante(R, t, o = {}) {}

// ── G · El interior de Florida ────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A interiorDelante DESPUÉS DE LOS ACTORES (las cañas, la valla, la placa).
//   'cana' (general): CAMPOS DE CAÑA DE AZÚCAR hasta el horizonte, con una REFINERÍA de chimeneas que humea, un tren de
//     vagones de caña, el DIQUE de hierba del lago Okeechobee a un lado con el agua detrás, garzas, el sol fuerte.
//     Devuelve suelo 158, libre [20, 260]. Cámara 'dique': EN LO ALTO DEL DIQUE: el camino de grava, el lago inmenso
//     de un lado y la caña del otro, pescadores pequeños. Devuelve suelo 154, libre [30, 280].
//   'pueblo': UN PUEBLO DE PLAYA DEL NORTE, algo olvidado: un motel de dos pisos con la pintura gastada, una gasolinera con
//     su tienda, un letrero de neón medio apagado (sin letras), la playa blanca detrás, una camioneta. Devuelve suelo 160,
//     libre [20, 270]. Cámara 'gasolinera': LOS SURTIDORES DE CERCA, la nevera de bebidas energéticas, insectos en la
//     luz. Devuelve suelo 162, libre [40, 260].
//   'britton': BRITTON HILL: un claro en un bosque de pinos con un caminito, una pequeña elevación (casi nada), un
//     MONOLITO-PLACA de piedra con el número 345 (solo cifras), un banco y un aparcamiento pequeño; el gag es que es un
//     montículo. o.bandera 0–1 (una bandera clavada en la cima). Devuelve suelo 160, libre [20, 270], cima: [170, 150],
//     placa: [210, 150]. Cámara 'capas': EL CORTE DE FLORIDA: un corte geológico de capas de caliza crema con conchas y
//     fósiles, el nivel del mar como una línea azul que baja (o.mar 0–1: arriba = 0, abajo = 1) y la península que
//     queda al aire; a la derecha, como contraste, unas montañas lejanas (Georgia y las Carolinas). Devuelve suelo 170,
//     libre [0, 0], mar: [20, 300].
//   'carcel': LA PUERTA DE LA CÁRCEL DE LEONIDA bajo el sol: una valla alta con su alambre (sin pinchos dramáticos), una
//     garita, un aparcamiento, palmeras, la carretera recta que se va al horizonte; o.abre 0–1 (la puerta corredera se
//     abre). Devuelve suelo 162, libre [30, 280], puerta: [160, 120, 210, 162]. Cámara 'carretera': LA CARRETERA RECTA
//     entre pantanos y palmeras con un coche que se aleja (para el final de Jason y Lucia). Devuelve suelo 160,
//     libre [20, 280].
const V_INTERIOR = {
  cana: { cam: 'dique', general: {"col": ["#7ab04a", "#c8b070"], "geo": {"suelo": 158, "libre": [20, 260]}}, dique: {"col": ["#3ac8d0", "#7ab04a"], "geo": {"suelo": 154, "libre": [30, 280]}} },
  pueblo: { cam: 'gasolinera', general: {"col": ["#f0dca0", "#8a8a84"], "geo": {"suelo": 160, "libre": [20, 270]}}, gasolinera: {"col": ["#1a1a3a", "#8a8a84"], "geo": {"suelo": 162, "libre": [40, 260]}} },
  britton: { cam: 'capas', general: {"col": ["#2a5a34", "#8a7a54"], "geo": {"suelo": 160, "libre": [20, 270], "cima": [170, 150], "placa": [210, 150]}}, capas: {"col": ["#e8dcc0", "#c8b898"], "geo": {"suelo": 170, "libre": [0, 0], "mar": [20, 300]}} },
  carcel: { cam: 'carretera', general: {"col": ["#f0dca0", "#8a8e96"], "geo": {"suelo": 162, "libre": [30, 280], "puerta": [160, 120, 210, 162]}}, carretera: {"col": ["#ff8a4a", "#5a5a56"], "geo": {"suelo": 160, "libre": [20, 280]}} },
};
export function interior(R, t, o = {}) { return vista(R, t, o, V_INTERIOR); }
export function interiorDelante(R, t, o = {}) {}

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
