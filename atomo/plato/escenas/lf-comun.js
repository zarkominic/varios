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
export function vicecity(R, t, o = {}) { return vista(R, t, o, V_VICECITY); }
export function vicecityDelante(R, t, o = {}) {}

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
export function everglades(R, t, o = {}) { return vista(R, t, o, V_EVERGLADES); }
export function evergladesDelante(R, t, o = {}) {}

// ── D · La tienda, el autoservicio y la piscina ───────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara), o.cctv 0–1 (el canon de la cámara de seguridad), o.hora (los números del reloj de la cctv).
// LLAMA A tiendaDelante DESPUÉS DE LOS ACTORES (el mostrador, el borde de la ventanilla, la barandilla de la piscina).
//   'tienda' (general): UNA TIENDA DE GASOLINERA DE MADRUGADA, vista desde arriba y desde una esquina (como la cámara del
//     techo): neveras de puertas de cristal con botellas de colores y su luz fría, estanterías con bolsas de patatas, un
//     expositor de donuts, el mostrador con caja y lotería (sin letras), las puertas automáticas de cristal a la izquierda
//     que se abren (o.puerta 0–1) y la noche fuera con los surtidores iluminados. Devuelve suelo 166, libre [30, 250],
//     puerta: [40, 150], pasillo: [100, 220, 150, 166], patatas: [180, 140], mostrador: [240, 150].
//     Cámara 'pasillo': UN PASILLO A RAS DE SUELO, entre estanterías de patatas y refrescos, con el suelo de baldosas que
//     brilla. Devuelve suelo 168, libre [40, 280], patatas: [160, 150].
//   'autoservicio': EL AUTOSERVICIO DE COMIDA RÁPIDA DE NOCHE visto desde fuera: el carril con flechas pintadas, la
//     ventanilla iluminada con su toldo de color, el panel del menú con fotos de hamburguesas (sin letras), un coche
//     parado, farolas y palmeras. Devuelve suelo 162, libre [30, 280], ventanilla: [190, 118, 230, 140].
//     Cámara 'ventanilla': DESDE DENTRO: la ventanilla abierta, la freidora, el mostrador con bolsas, la noche y el coche
//     fuera. Devuelve suelo 164, libre [40, 200], ventanilla: [210, 90, 290, 140].
//   'piscina': UN PORCHE CON MOSQUITERA Y PISCINA en una casa de Florida: la jaula de mosquitera con su estructura de
//     aluminio, la piscina turquesa con reflejos que se mueven, tumbonas, macetas, un flotador de flamenco, la casa
//     detrás con su puerta corredera, un estanque y palmeras fuera. o.roto 0–1 (un panel de la mosquitera rasgado).
//     Devuelve suelo 160, libre [20, 280], agua: [110, 250, 138, 160], mosquitera: [30, 100]. Cámara 'agua': EL AGUA DE
//     CERCA, a ras: el borde de baldosas, el flotador, la luz del fondo de la piscina. Devuelve suelo 170, libre [0, 0],
//     agua: [0, 320, 110, 180].
const V_TIENDA = {
  tienda: { cam: 'pasillo', general: {"col": ["#d8f0ff", "#5a6a74"], "geo": {"suelo": 166, "libre": [30, 250], "puerta": [40, 150], "pasillo": [100, 220, 150, 166], "patatas": [180, 140], "mostrador": [240, 150]}}, pasillo: {"col": ["#d8f0ff", "#8a8a84"], "geo": {"suelo": 168, "libre": [40, 280], "patatas": [160, 150]}} },
  autoservicio: { cam: 'ventanilla', general: {"col": ["#1a1a3a", "#5a5a56"], "geo": {"suelo": 162, "libre": [30, 280], "ventanilla": [190, 118, 230, 140]}}, ventanilla: {"col": ["#f0fff0", "#8a5a34"], "geo": {"suelo": 164, "libre": [40, 200], "ventanilla": [210, 90, 290, 140]}} },
  piscina: { cam: 'agua', general: {"col": ["#3ac8d0", "#c8c0b0"], "geo": {"suelo": 160, "libre": [20, 280], "agua": [110, 250, 138, 160], "mosquitera": [30, 100]}}, agua: {"col": ["#3ac8d0", "#1a8a9a"], "geo": {"suelo": 170, "libre": [0, 0], "agua": [0, 320, 110, 180]}} },
};
export function tienda(R, t, o = {}) { return vista(R, t, o, V_TIENDA); }
export function tiendaDelante(R, t, o = {}) {}

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
// o.encuadre (y o.camara), o.descarga 0–100 (la barra de descarga de la tele, con su número), o.noche 0–1. Exporta las
// piezas canónicas a_caja y a_mapaLeonida (ver el canon de la cabecera del archivo). LLAMA A salonDelante DESPUÉS DE LOS
// ACTORES (la mesita baja y el sofá).
//   'salon' (general): EL SALÓN DE ATOM DE NOCHE: un sofá, una mesita baja con la caja del juego, un mando, un bol de
//     palomitas; la tele grande con la barra de descarga (o.descarga) y, cuando llega, un 99 enorme (o.nota 0–1); la
//     consola con su luz; en la pared, un mapa de Florida con chinchetas (a_mapaLeonida con florida 1), un calendario
//     (o.calendario 0–1: diciembre de 2023, 2025 y mayo de 2026 tachados, el 19 de noviembre con un círculo, solo
//     números), una mochila con una guía y un sombrero de explorador colgados; una ventana con la noche y palmeras.
//     Devuelve suelo 162, libre [30, 250], tele: [150, 50, 250, 120], mesa: [110, 140], mapa: [30, 40, 110, 100].
//     Cámara 'mesa': LA MESITA DE CERCA: la caja (a_caja), el mando, las palomitas, una foto en sepia (o.foto 0–1: una
//     pareja de los años treinta junto a un coche antiguo, sin caras con detalle) y un candado sobre un libro (o.candado).
//     Devuelve suelo 170, libre [0, 0], caja: [140, 120], foto: [220, 110].
//   'mapa': LA PARED DEL MAPA: el mapa de Leonida grande (a_mapaLeonida, o.encendidas 0–6) con chinchetas, hilos y notas
//     de colores; una mesa delante con papeles, rotuladores y mapas dibujados a mano (los fans). Devuelve suelo 164,
//     libre [20, 280], mapa: [60, 20, 260, 120], mesa: [80, 140, 240, 164]. Cámara 'contador': LA PANTALLA DEL ORDENADOR de
//     cerca: un contador de visitas que sube (o.visitas 0–90, en millones, con número) y una gráfica de reservas (o.reservas
//     0–1) con una etiqueta de «estimación» como icono de interrogante. Devuelve suelo 170, libre [0, 0].
const V_SALON = {
  salon: { cam: 'mesa', general: {"col": ["#2a1a4a", "#5a3a24"], "geo": {"suelo": 162, "libre": [30, 250], "tele": [150, 50, 250, 120], "mesa": [110, 140], "mapa": [30, 40, 110, 100]}}, mesa: {"col": ["#5a3a24", "#2a1a4a"], "geo": {"suelo": 170, "libre": [0, 0], "caja": [140, 120], "foto": [220, 110]}} },
  mapa: { cam: 'contador', general: {"col": ["#c8b898", "#5a3a24"], "geo": {"suelo": 164, "libre": [20, 280], "mapa": [60, 20, 260, 120], "mesa": [80, 140, 240, 164]}}, contador: {"col": ["#1a1a3a", "#2a1a4a"], "geo": {"suelo": 170, "libre": [0, 0]}} },
};
export function salon(R, t, o = {}) { return vista(R, t, o, V_SALON); }
export function salonDelante(R, t, o = {}) {}

// ── Piezas canónicas (esqueletos: las completa su grupo) ─────────────────────────────────────────────────────────────
// a_caiman (grupo C): el caimán o el cocodrilo canónicos, ver la cabecera del archivo. Devuelve { hocico: [x, y], cola: [x, y] }.
export function a_caiman(R, x, y, t, o = {}) { const s = o.s ?? 1, c = hex(o.especie === 'cocodrilo' ? '#7a8a5a' : '#3a4a2a');
  for (let j = 0; j < 4 * s; j++) for (let i = 0; i < 26 * s; i++) R.pset(x - 13 * s + i, y - 4 * s + j, c); return { hocico: [x + 13 * s, y - 2 * s], cola: [x - 13 * s, y - 2 * s] }; }
// a_caja (grupo H): la caja de la edición física, ver la cabecera del archivo.
export function a_caja(R, x, y, t, o = {}) { for (let j = 0; j < 22; j++) for (let i = 0; i < 16; i++) R.pset(x + i, y + j, hex('#1a2a5a')); }
// a_mapaLeonida (grupo H): el mapa de Leonida, ver la cabecera del archivo.
export function a_mapaLeonida(R, x, y, w, t, o = {}) { for (let j = 0; j < w * 0.6; j++) for (let i = 0; i < w; i++) if ((i > w * 0.55) || j < w * 0.15) R.pset(x + i, y + j, hex('#7ab04a')); }
