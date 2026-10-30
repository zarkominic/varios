// Fontanería y decorados del episodio 17 (los tesoros perdidos: el oro de los templarios, el Santo Grial, Rennes-le-Château,
// el rollo de cobre y el cofre de Fenn, 1120–2020) en el estilo canónico pixel chibi, al nivel de episodios/ESTANDAR.md.
// Ocho decorados (guion.md): A el Temple de París en 1307, B Ultramar, C el puerto, D la logia, E el Grial,
// F Rennes-le-Château, G el desierto y el taller, H hoy; más las piezas de los gags (el detector de metales del buscador,
// el cofre, el rollo de cobre, las copas, la carta sellada). Sin letras: pergaminos y carteles con trazos y pictogramas.
// Leyenda y hecho separados; los masones con respeto; nada de violencia en la imagen.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite.
//
//   import * as T from '/atomo/plato/escenas/te-comun.js';
//   const { E, R, M } = await T.preparar('te-gancho');
//   T.rodar(E, R, [[0, (t) => T.temple(R, t, { encuadre: 'calle', luz: 'alba' })]], { año: 1307 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la piedra medieval de París y de Ultramar, el blanco y la cruz roja templarios, el azul y el oro del rey de Francia
    piedra: '#a8a090', piedraS: '#787060', piedraL: '#ccc4b0', arenisca: '#d8b880', areniscaS: '#a88a58', areniscaL: '#f0d8a8',
    mantoT: '#f2eee2', cruzT: '#c8303a', azulRey: '#2a4a9a', oroRey: '#e8b830',
    // la logia (madera oscura, suelo ajedrezado, velas), el pergamino y la cera
    nogal: '#4a2e1c', nogalL: '#6e4630', ajedrezB: '#e8e0cc', ajedrezN: '#2a2430', vela: '#f8e8a0', pergamino: '#e8d8a8', pergaminoS: '#c0a878', cera: '#a8303a',
    // el cobre oxidado del rollo, el desierto de Qumrán, el mar Muerto
    cobre: '#c87a3a', cobreS: '#8a4a24', cardenillo: '#5aa890', desierto: '#d8b078', desiertoS: '#a8804c', marMuerto: '#5a9ab0',
    // las Rocosas de hoy: pinos, granito, río
    pino: '#2a5a3a', pinoL: '#4a8a5a', granito: '#8a8a94', granitoL: '#b0b0b8',
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
  const E = await escena(id, 'ep17');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: la cruz templaria (1120–1314), el pergamino (1315–1899) y la pala (1900–2026)
  Object.assign(R.ICONOS, {
    cruz: ['..###..', '..###..', '#######', '#######', '#######', '..###..', '..###..'],
    pergamino: ['.#####.', '#.....#', '.#####.', '.#...#.', '.#####.', '#.....#', '.#####.'],
    pala: ['..###..', '..###..', '...#...', '...#...', '...#...', '..###..', '.#####.'],
  });
  R.tramosTiempo([[1120, 1314, R.PALA.ROJO, 'cruz'], [1315, 1899, R.PALA.ORO, 'pergamino'], [1900, 2026, R.PALA.AZUL, 'pala']]);
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

// ── A · El Temple de París, 1307 ────────────────────────────────────────────────────────────────────────────────────
// El recinto del Temple de París en 1307 y el París de alrededor. o.encuadre:
//   'calle': una calle de París al amanecer con niebla, casas de entramado de madera con voladizos, antorchas, el barro,
//     la puerta de una casa del Temple (portón de madera con herrajes y la cruz roja pintada encima) donde llaman los
//     soldados del rey; o.luz 'alba' (por omisión), 'noche'. o.camara 'general' o 'patio' (el patio del recinto de cerca:
//     el pozo, el abrevadero, los establos, caballeros detenidos en fila; sitio para 4–6 personajes).
//   'torre': la gran torre del Temple de París por dentro: muros de sillería, saeteras con luz, escalera de caracol,
//     arcones y cofres (casi vacíos), estanterías de documentos y el escritorio de las cuentas; o.camara 'general' o
//     'cofres' (los cofres de cerca, con o.abre 0–1 para abrir las tapas).
//   'palacio': el salón del rey: tapices azules con lises (sin letras), trono, ventanal; o.camara 'general' o 'mesa' (la
//     mesa del libro de cuentas de cerca, con el libro abierto: o.paginas (0–1) pasa páginas sin fin).
//   'sena': París al anochecer visto de lejos desde la orilla, la isla del Sena con Notre-Dame a contraluz, el río con
//     barcas; o.humo (0–1): una columna de humo lejana, sin fuego ni personas (la hoguera de 1314, sin violencia);
//     o.camara 'general' o 'orilla' (gente pequeña en la orilla mirando de espaldas).
// Devuelve { suelo, pies:[x…], puerta, … } según el encuadre.
export function temple(R, t, o = {}) {
  provisional(R, t, C.piedraS, C.piedra);
  return { suelo: 160 };
}

// ── B · Ultramar ────────────────────────────────────────────────────────────────────────────────────────────────────
// Jerusalén y los caminos de Tierra Santa hacia 1120–1300. o.encuadre:
//   'jerusalen': las murallas doradas al sol con sus torres, la gran cúpula y la explanada del Templo (la mezquita de
//     al-Aqsa, que los cruzados llamaban el Templo de Salomón, con su cúpula y sus arcos), palmeras, el cielo blanco de
//     calor; o.camara 'general' o 'explanada' (las cuadras bajo los arcos, con caballos y caballeros que se instalan).
//   'camino': el camino de los peregrinos entre colinas pedregosas, olivos, un pozo, polvo, una caravana lejana; o.camara
//     'general' o 'emboscada' (una curva con rocas grandes detrás de las que se esconde el ladrón).
//   'casa': una casa del Temple que es castillo y banco: el patio con carros de sacos, rebaños, y dentro el mostrador de
//     madera con balanzas, monedas en montones, cofres y un escribano; o.camara 'general' o 'mostrador' (el mostrador de
//     cerca, donde se entregan la bolsa y la carta sellada).
//   'sello': el sello de cera de cerca, sobre pergamino: dos caballeros en un solo caballo (dibujado, sin letras), con
//     o.luz; o.camara 'general' (el sello sobre la mesa con lacre y vela) o 'cerca' (el sello llena el plano).
export function ultramar(R, t, o = {}) {
  provisional(R, t, C.arenisca, C.areniscaS);
  return { suelo: 160 };
}

// ── C · El puerto ────────────────────────────────────────────────────────────────────────────────────────────────────
// Un puerto atlántico de 1307 y la leyenda de la flota. o.encuadre:
//   'puerto': el puerto de noche con niebla, torres de piedra a la entrada, galeras amarradas con velas recogidas,
//     faroles, el agua con reflejos; o.flota (0–1): las galeras con velas de cruz roja salen al mar y se pierden en la
//     niebla, casi fantasmas; o.camara 'general' o 'muelle' (el muelle de cerca con barriles, cuerdas y gente que habla).
//   'tribunal': una sala de 1308 con un tribunal de inquisidores (tres sillas altas, una mesa con pergaminos y velas) y
//     el banco del declarante; o.camara 'general' o 'banco' (el declarante y su bocadillo de cerca).
//   'mapa': un mapa de papel de Europa y el Atlántico con brújula y sello (sin letras), sobre una mesa con velas;
//     o.rutas (0–1): líneas punteadas que salen de Francia hacia Escocia, Portugal y América; o.camara 'general' o
//     'oeste' (el Atlántico y Nueva Escocia de cerca, con una chincheta y un pozo dibujado).
export function puerto(R, t, o = {}) {
  provisional(R, t, C.marNoche ?? hex('#1e3a5a'), hex('#3a6a8a'));
  return { suelo: 160 };
}

// ── D · La logia ─────────────────────────────────────────────────────────────────────────────────────────────────────
// Los masones del siglo XVIII, con respeto y solo con historia. o.encuadre:
//   'taberna': una taberna de Londres en 1717: vigas, chimenea encendida, jarras, mesas largas con caballeros de peluca
//     que brindan, un letrero colgante con un ganso y una parrilla (pictograma, sin letras), ventanas a la calle;
//     o.camara 'general' o 'mesa' (la mesa de cerca, con jarras, pipas y un pergamino de reglas).
//   'catedral': canteros medievales en el andamio de una catedral a medio construir, con escuadra, compás, poleas y
//     piedras; o.camara 'general' o 'cerca' (un cantero que talla una piedra con su marca).
//   'salon': el salón de una logia del siglo XVIII: suelo ajedrezado, dos columnas, velas en candelabros altos, bancos,
//     una escuadra y un compás dibujados en un cuadro, ventanales; o.lugar 'paris' (1736, más dorado) o 'alemania'
//     (hacia 1755, a la luz de las velas, más oscuro); o.camara 'general' o 'atril' (el atril del orador de cerca).
//   'desfile': una calle de hoy con un desfile de una orden masónica (mantos, sombreros de pluma, sin letras ni escudos
//     reales) y público; o.camara 'general' o 'cerca'.
export function logia(R, t, o = {}) {
  provisional(R, t, C.nogal, C.ajedrezN);
  return { suelo: 160 };
}

// ── E · El Grial ─────────────────────────────────────────────────────────────────────────────────────────────────────
// Los poemas del Grial (1190–1210) y el cáliz de Valencia. o.encuadre:
//   'scriptorium': un scriptorium medieval: atriles, libros, tinteros, la vela, la ventana con lluvia, gatos; un
//     bocadillo de imaginación (o.vision 0–1) donde un joven caballero ve pasar un objeto que brilla; o.camara 'general'
//     o 'hoja' (la hoja del libro de cerca, a medio escribir, con la pluma y las líneas de trazos sin letras).
//   'castillo': el castillo del Grial de los poemas, de noche, con la sala de las antorchas, una procesión con velas y en
//     el altar una piedra luminosa (Wolfram) o una copa (o.objeto 'piedra' o 'copa'); o.camara 'general' o 'altar'.
//   'mostrador': un mostrador largo de feria con una fila de copas distintas (madera, oro, barro, cristal, plata) que
//     dicen ser el Grial; o.copas (cuántas), o.nueva (0–1: aparece otra al final de la fila); o.camara 'general' o
//     'cerca'.
//   'valencia': la capilla del Santo Cáliz de la catedral de Valencia: arcos góticos, retablo de alabastro, la vitrina
//     con la copa de ágata roja con asas de oro y perlas; o.camara 'general' o 'caliz' (la copa de cerca, con la luz que
//     la atraviesa).
export function grial(R, t, o = {}) {
  provisional(R, t, hex('#3a2a4a'), hex('#c8a040'));
  return { suelo: 160 };
}

// ── F · Rennes-le-Château ───────────────────────────────────────────────────────────────────────────────────────────
// El pueblecito en su colina del sur de Francia (Aude), 1885–hoy. o.encuadre:
//   'colina': el pueblo en lo alto de la colina con la iglesia, las casas de piedra, el camino que sube, las montañas
//     del fondo (los Pirineos) y el cielo del sur; o.anyo 1885 (pobre, sin la villa) o 1905 (con la villa, el jardín y
//     la torre de piedra); o.agujeros (0–1: el pueblo lleno de agujeros como un queso, con montones de tierra, palas y
//     el cartel de «prohibido cavar» en pictograma de pala tachada); o.camara 'general' o 'iglesia' (la puerta de la
//     iglesia y la plaza de cerca).
//   'villa': la villa del cura con su jardín, la terraza y la torre de piedra neogótica de la biblioteca; o.camara
//     'general' o 'torre'; o.hotel (1950s: mesas de terraza, un autobús de turistas, sombrillas).
//   'despacho': el despacho del cura con montañas de sobres, la mesa, el crucifijo, la ventana; o.camara 'general' o
//     'mesa' (la mesa con los sobres y pergaminos de cerca: o.pergaminos con trazos y manchas de té).
//   'libreria': una librería de 1982–2003 con montañas de libros (cubiertas sin letras) y colas de gente, y la marquesina
//     de un cine; o.camara 'general' o 'cine'.
export function rennes(R, t, o = {}) {
  provisional(R, t, hex('#c8b090'), hex('#7a9a5a'));
  return { suelo: 160 };
}

// ── G · El desierto y el taller ─────────────────────────────────────────────────────────────────────────────────────
// El rollo de cobre (1952–hoy). o.encuadre:
//   'qumran': los acantilados de Qumrán sobre el mar Muerto al atardecer, con las bocas de las cuevas, las ruinas abajo,
//     el mar azul turquesa y las montañas de Moab al fondo; arqueólogos pequeños con lámparas; o.camara 'general' o
//     'cueva' (dentro de la cueva 3: la boca con luz, piedras caídas y el rollo verdoso partido en dos en el suelo).
//   'taller': un taller de ingeniería de Manchester en 1955–1956: máquinas, la sierra circular muy fina en su banco,
//     lámparas, ventanas de fábrica con lluvia; o.cortes (0–23: tiras ya cortadas en fila); o.camara 'general' o
//     'sierra' (la sierra cortando de cerca, con chispas finas y la lupa).
//   'tiras': las veintitrés tiras de cobre en orden sobre un tapete, con renglones de trazos (sin letras), lingotes y
//     monedas dibujados al margen y letras griegas sueltas como símbolos dorados (o.griegas 0–1); o.camara 'general' o
//     'lupa'; o.monton (0–1): una montaña de lingotes y vasijas que crece hasta llenar el plano.
//   'museo': el museo de Amán: la sala en penumbra con la vitrina iluminada de las tiras, otras vitrinas, visitantes;
//     o.camara 'general' o 'vitrina'.
//   'escalones': un paisaje de desierto con ruinas por todas partes: escalones de piedra en todas direcciones (el gag de
//     «bajo los escalones que van hacia el este»); o.camara 'general' o 'cerca'.
export function desierto(R, t, o = {}) {
  provisional(R, t, C.desierto, C.desiertoS);
  return { suelo: 160 };
}

// ── H · Hoy ──────────────────────────────────────────────────────────────────────────────────────────────────────────
// Los buscadores de hoy. o.encuadre:
//   'campo': un campo junto a un castillo en ruinas (Francia de hoy), hierba alta, piedras, el buscador con su detector;
//     o.camara 'general' o 'suelo' (el suelo de cerca, donde se cava: tierra, raíces, una lata).
//   'mesa': la mesa del buscador con mapas, lupas, una brújula, fotos clavadas, una taza y la lámpara; o.camara 'general'
//     o 'mapa' (un mapa de cerca con tres marcas: una cruz templaria, una copa y un rollo; pictogramas).
//   'rocosas': las montañas Rocosas: pinos, granito, un río frío y una fuente termal que humea, el sendero; o.camara
//     'general' o 'rocas' (las rocas de cerca, donde está el cofre de bronce); o.luz 'dia' o 'atardecer'.
//   'escalon': un atardecer con un escalón de piedra viejo, el buscador sentado; o.camara 'general' o 'cerca'.
//   'tienda': una tienda de hoy donde se paga con tarjeta (el datáfono, sin marcas); o.camara 'general' o 'cerca'.
export function hoy(R, t, o = {}) {
  provisional(R, t, hex('#5a8ac8'), hex('#4a7a3a'));
  return { suelo: 160 };
}

// ── Piezas de los gags (se pintan encima del decorado) ──────────────────────────────────────────────────────────────
// El detector de metales del buscador, en sus manos o en el suelo: el palo, la caja con la luz y el disco; o.pita (0–1):
// ondas que salen del disco y la luz que parpadea; o.dir. Devuelve { disco: [x, y] }.
export function detector(R, x, y, t, o = {}) {
  R.rect(x, y - 2, x + 16, y, hex('#3a3a4a'));
  return { disco: [x + 16, y] };
}
// Un cofre de tesoro (de madera con herrajes, o de bronce con o.bronce): o.abre (0–1), o.brillo (monedas y joyas que
// brillan dentro), o.vacio (casi vacío, unas pocas monedas y telarañas), o.s (escala). Devuelve { x, y, tapa }.
export function cofre(R, x, y, t, o = {}) {
  R.rect(x - 8, y - 10, x + 8, y, hex('#7a4a24'));
  return { x, y };
}
// El rollo de cobre: o.estado 'enrollado' (dos trozos verdosos y quebradizos), 'tira' (una tira plana con renglones de
// trazos); o.s. Y una carta sellada (o.carta: pergamino doblado con el sello rojo de lacre).
export function rollo(R, x, y, t, o = {}) {
  R.rect(x - 6, y - 4, x + 6, y, C.cobre);
  return { x, y };
}
// Una copa: o.tipo 'agata' (la de Valencia: ágata roja con asas de oro), 'oro', 'madera', 'barro', 'cristal', 'plata';
// o.brillo (0–1), o.s.
export function copa(R, x, y, t, o = {}) {
  R.rect(x - 3, y - 8, x + 3, y, C.oroRey);
  return { x, y };
}
