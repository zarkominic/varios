// Fontanería y decorados del episodio 31 (GTA: el juego de Escocia que casi se cancela) en el estilo canónico pixel chibi,
// al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Dundee 1987–1997 (la ciudad junto al Tay y la oficina de DMA),
// B Londres 1997 (la Cámara de los Lores, la redacción sensacionalista, el quiosco), C Nueva York 1998–2013 (el loft de
// Rockstar, la tienda a medianoche, los tribunales), D la ciudad de juguete (vista desde arriba en 1997 y en 3D en 2001) y
// E hoy (el estudio de Atom, la sala de récords, la tienda que espera).
// DERECHOS: NADA del juego real: ni logo, ni portadas, ni personajes, ni interfaz (ni mapa, ni marcador, ni radar en una
// esquina), ni capturas, ni el estilo de sus portadas. La ciudad de juguete es INVENTADA, a nuestra manera, con coches de
// juguete de colores. Los bichitos no copian el diseño de Lemmings. Sin letras. La violencia del juego no se enseña.
// Los personajes son los de ELENCO_GT y PIEZAS_GT (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, bancos, mostradores) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/gt-comun.js';
//   const { E, R, M } = await T.preparar('gt-gancho');
//   T.rodar(E, R, [[0, (t) => T.hoy(R, t, { encuadre: 'estudio' })]], { año: 2026 });
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
// las piezas del episodio (PIEZAS_GT: el coche de policía de juguete, los bichitos, el botón rojo, las cajas de juego sin marca…), las crea el reparto
export const PIEZAS_GT = KIT.PIEZAS_GT || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la piedra gris y la lluvia de Dundee, el beige de los ordenadores de los noventa, el rojo de los bancos de los Lores,
    // el ladrillo de Nueva York, el neón de los ochenta y la ciudad de juguete
    piedraDundee: '#8a8c90', piedraDundeeS: '#5e6064', lluvia: '#9ab0c8', beige: '#d8ccb0', beigeS: '#a89c80',
    rojoLores: '#a8302e', rojoLoresS: '#6e1e1c', ladrillo: '#a8543a', ladrilloS: '#6e3424', neonRosa: '#ff5ab0',
    neonCian: '#4af0f0', asfalto: '#4a4c54', asfaltoS: '#34363c', policiaAzul: '#3a6aff', policiaRojo: '#ff3a3a',
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
  const E = await escena(id, 'ep31');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1987–1997 (Dundee y el primer juego), 1997–2001 (el escándalo y Rockstar), 2001–2013 (el salto a
  // 3D y las polémicas), 2013–2026 (los récords y la espera)
  Object.assign(R.ICONOS, {
    bichito: ['..###..', '.#####.', '#.#.#.#', '#######', '.#####.', '.#...#.', '.......'],
    coche: ['.......', '..###..', '.#####.', '#######', '#######', '.#...#.', '.......'],
    edificio: ['.##.##.', '.##.##.', '.#####.', '.#.#.#.', '.#####.', '.#.#.#.', '#######'],
    trofeo: ['#######', '#.###.#', '.#####.', '..###..', '...#...', '..###..', '.#####.'],
  });
  R.tramosTiempo([[1987, 1997, R.PALA.ORO, 'bichito'], [1997, 2001, R.PALA.ROJO, 'coche'], [2001, 2013, R.PALA.AZUL ?? R.PALA.ROJO, 'edificio'], [2013, 2027, R.PALA.VERDE ?? R.PALA.ORO, 'trofeo']]);
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



// ── A · Dundee, 1987–1997 ─────────────────────────────────────────────────────────────────────────────────
// Lo fijo de cada encuadre se pinta una vez en un búfer de R.nuevo() (uno por encuadre, cámara y variante) y se pega en
// cada fotograma sobre el cielo, que se mueve; encima va la vida. Devuelve la geometría del encuadre (suelo, objetos).
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'ciudad' (por omisión): Dundee junto al estuario del Tay, desde el paseo del muelle. Cielo escocés gris azulado tramado,
//     con claros de azul que se abren, nubes de tres tonos en tres capas (a 1,5, 4 y 8 px/s), cortinas de lluvia lejanas y
//     gaviotas. A la izquierda la ciudad de piedra gris que sube por la colina del Law (con su torre arriba): tres hileras de
//     casas, una aguja de iglesia y, delante, bloques de pisos de piedra con tejados de pizarra, chimeneas que echan humo y
//     tiendas abajo; el muelle con paseantes pequeños (con paraguas si llueve), un velero antiguo de tres palos amarrado
//     (banderola al viento) y una grúa de puerto con el gancho que sube y baja. Al fondo el puente largo del ferrocarril, de
//     hierro rojizo sobre muchos pilares, con su tramo alto de celosía y un tren que lo cruza cada 16 s; detrás, las
//     colinas de Fife con campos y un pueblo. El agua se riza y brilla. Delante, el paseo: barandilla de hierro, pretil de
//     piedra, banco, farolas victorianas encendidas, un buzón rojo (sin letras), losas mojadas con charcos que reflejan
//     el cielo y la calzada con la doble línea amarilla. Pies de los personajes en y 156.
//     o.lluvia 0–1 (0,5): oscurece el cielo, cierra los claros, pinta las cortinas y los anillos en los charcos (las
//     gotas que caen van en dundeeDelante). o.año (1990): 1990, cabina de teléfono roja y coches cuadrados; 2026, dos
//     molinos de viento en Fife, farolas de luz blanca y coches de hoy. o.estatuas (por omisión, si o.año ≥ 2008): la
//     columna de piedra con siete bichitos de bronce trepando (nuestros, no los del monumento real).
//     Cámara 'calle': una calle del centro, a ras de acera. Fachada de bloques de piedra arenisca con hollín, cornisas y
//     ventanas de guillotina (cortinas, una planta, un gato que mira); abajo la tienda de pescado frito: rótulo verde con
//     un pez dorado (sin letras), escaparate con los azulejos, el mostrador de cristal con el pescado rebozado, la freidora
//     que echa vapor, el dependiente pequeño que va y viene y un pez de neón que parpadea; la puerta de la tienda y, a su
//     lado, el portal verde de la escalera (con el número 7). Encima, la ventana de la primera oficina con luz: monitores
//     que parpadean, un flexo, un póster y alguien que pasa por dentro. A la derecha, un pub más bajo con el cielo encima,
//     una farola y un canalón que gotea. Acera de losas mojadas con el reflejo cálido del escaparate. Pies en y 164.
//     o.lluvia (0,5) y o.año como arriba (los coches que pasan van en dundeeDelante).
//   'oficina': la oficina de DMA en un polígono, en los noventa. Techo de placas con fluorescentes (uno parpadea); pared de
//     bloque pintado con juntas; ventana de aluminio con la persiana a medio subir y, fuera, la lluvia sobre las naves del
//     polígono (un coche, una furgoneta, una farola y alguien con paraguas que cruza, recortado al hueco) y gotas que
//     resbalan por el cristal; una pizarra blanca con una ciudad vista desde arriba dibujada a rotulador (manzanas, calles,
//     flechas y un coche); un corcho con bocetos de bichitos y cochecitos; dos carteles de cine sin letras (una ciudad
//     de noche con luna y un coche; una persecución vista desde arriba); una balda con cajas de juegos y archivadores; un
//     archivador metálico con una caja de cartón encima; el radiador; la papelera llena bajo la mesa del fondo. Al fondo una mesa larga con tres monitores de tubo
//     (PIEZAS_GT.monitorTubo) cuyas pantallas cambian solas (ciudad, bichitos, código), torres beis, un ventilador que
//     gira, taza con vapor, disquetes, flexo y cables que cuelgan. En medio, la mesa principal de haya con el monitor
//     grande del plano (o.pantalla 'bichitos' por omisión | 'ciudad' | 'codigo' | 'apagada'), teclado, ratón, una caja de
//     pizza abierta, una lata, la torre en el suelo con su luz y la silla. Moqueta de losetas en perspectiva con cables
//     encintados. Pies en y 150. o.noche: todo en penumbra azul con los flexos, el brillo de las pantallas y las farolas de
//     sodio fuera. o.vista: 'poligono' (por omisión) | 'calle' (la ventana da a la calle del centro, vista desde el primer
//     piso: la fachada de enfrente, su acera con gente con paraguas, la calzada con coches y, abajo del todo, el rótulo
//     del pez de la tienda de pescado frito). o.lluvia (0,6): la lluvia de la ventana. La mesa principal está en dundee()
//     (los personajes se ponen a su lado, no detrás); en dundeeDelante solo van los trastos de las esquinas.
//     Cámara 'reunion': la sala de reuniones. Pared de yeso con zócalo de madera de nogal en cuarterones, una pantalla de
//     proyección con la diapositiva que cambia cada 3 s (la ciudad vista desde arriba, unas barras que bajan con su flecha
//     roja, un bichito con una interrogación) y el haz del proyector con motas de polvo, una ventana con lluvia y persiana,
//     un reloj que anda, un calendario de pared con la foto del Tay, un cuadro con un bichito, un ficus que se mece, la
//     puerta, un maletín en el suelo y, junto a la puerta, la papelera de rejilla con papeles arrugados (y uno en el suelo). La mesa larga, el proyector y el teléfono van en dundeeDelante. Pies en y 150.
// Llama a dundeeDelante(R, t, o) después de los actores, con las mismas opciones.
export function dundee(R, t, o = {}) {
  const enc = o.encuadre ?? 'ciudad', cam = o.camara ?? 'general';
  if (enc === 'oficina') return cam === 'reunion' ? a_reunion(R, t, o) : a_oficina(R, t, o);
  return cam === 'calle' ? a_calleDun(R, t, o) : a_ciudadDun(R, t, o);
}
// lo de delante de los personajes en cada encuadre de dundee(); se llama después de los actores, con las mismas opciones:
//   'ciudad': los coches que pasan por la calzada (y 166–180, cada ~7 s, de la época de o.año, con su reflejo en el
//     asfalto mojado) y la lluvia que cae en diagonal con sus salpicaduras (o.lluvia, 0,5 por omisión; o.coches false: sin
//     coches). 'calle': lo mismo en la calzada de abajo (y 172–180) y el agua que chorrea del canalón.
//   'oficina': en las esquinas de abajo, el respaldo de una silla giratoria y una pila de cajas de pizza (izquierda) y la
//     esquina de otra mesa con un teclado, una taza con vapor y un disquete (derecha); el centro (x 40–262) queda libre.
//     Cámara 'reunion': la mesa larga de nogal (x 28–252, el tablero en y 144–150, brillo que corre) con el proyector de
//     transparencias encendido (x 124–146, hasta y 116) que lanza el haz, el teléfono de los noventa
//     (PIEZAS_GT.telefonoNoventa en x 216, base 145; o.suena: suena y bota), el documento de diseño en una carpeta roja,
//     papeles, tazas, una jarra de agua (x 238–248) y dos sillas en la punta izquierda; el cable del proyector baja al
//     suelo. Quien está detrás (pies en y 150) asoma la cabeza y los hombros por encima de y 144; no pongas caras detrás
//     del proyector, del teléfono ni de la jarra.
export function dundeeDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'ciudad', cam = o.camara ?? 'general';
  if (enc === 'oficina') return cam === 'reunion' ? a_reunionDelante(R, t, o) : a_oficinaDelante(R, t, o);
  const calle = cam === 'calle', ll = o.lluvia ?? 0.5, año = o.año ?? 1990;
  if (o.coches !== false) a_trafico(R, t, calle ? 180 : 178, año, calle ? 0.7 : 1);
  if (calle) a_canalon(R, t, ll);
  a_lluvia(R, t, ll, calle ? 164 : 156);
  return {};
}
// ── B · Londres, 1997 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve { suelo, … } con las cotas de cada
// encuadre (ver cada auxiliar). Lo de delante de los personajes va en londresDelante (llámala después de los actores, con
// las mismas opciones).
//   'lores': una cámara parlamentaria genérica vista desde la barra: techo de casetones de roble con bosas doradas, cinco
//     vidrieras ojivales de rombos y rosetones (sin escudos ni figuras) por las que pasa un destello y entra la luz en
//     rayos con motas, paneles de roble de pliegues, la galería tallada con público diminuto que se mueve, dos arañas de
//     latón con velas que titilan, al fondo el trono dorado genérico (sin armas) bajo su dosel con dos candelabros, el
//     cojín rojo delante, las tres gradas de bancos rojos a cada lado con lores pequeños (pelucas, togas, trajes) que
//     parpadean, uno que cabecea dormido, uno que agita su orden del día y otro que se pone la mano en la oreja; en medio
//     la mesa de los secretarios (dos con peluca escriben con pluma) con libros, cajas de despachos y la maza dorada, que
//     brilla; alfombra roja con su dibujo y la luz de las vidrieras. Suelo 152: libres x 12–96 (izquierda) y 222–300
//     (derecha; x es el borde izquierdo del chibi, ~15 × 27); la mesa x 116–204 (tablero y 116). Los bancos de primer término en londresDelante.
//     Cámara 'banco': más cerca, contra un lado: cuatro gradas de bancos rojos que suben, llenas de lores (uno duerme,
//     uno dice «hear, hear» agitando el papel, otro se lleva la mano a la oreja), dos vidrieras altas con su luz, apliques
//     de latón; el hueco de la grada de abajo (x 112–200) es para el lord que se levanta; la escalera del pasillo en x 226–250. Suelo 156. El respaldo del banco
//     de delante, con papeles y unas gafas, en londresDelante.
//   'redaccion': la redacción de un periódico sensacionalista en 1997: techo de placas con tubos fluorescentes (uno
//     parpadea), la ventana con la persiana a medias y Londres bajo la lluvia (cúpula, grúa, tejados, gotas que resbalan
//     y un autobús rojo de dos pisos que pasa por la calle, recortado al hueco), la pared de primeras planas clavadas
//     (cabecera roja, titulares de barras negras, un coche y un rayo; sin letras), el reloj, el perchero, la tele en su
//     brazo con el telediario que cambia; al fondo, las mesas con monitores de tubo beige, redactores pequeños que
//     teclean, el teletipo que escupe papel, el fax que parpadea, montones de periódicos y tazas que humean; moqueta de
//     losetas con manchas y un cable con cinta. Suelo 160 (libre x 10–190). o.pizarra: una pizarra blanca con ruedas
//     (x 150–216, superficie libre x 153–213, y 99–131) para que la escena dibuje las flechas (gt-clifford). o.trafico:
//     segundos que se adelanta el reloj del tráfico (el autobús de la ventana pasa cuando (t + trafico + 3) mod 16 < 7). La mesa de
//     delante (x 196–319, tablero y 150) en londresDelante: quien va detrás pisa en y 158 (mesaSuelo).
//     Cámara 'quiosco': una calle de Londres con lluvia (o.lluvia 0–1, por omisión 1): cielo encapotado tramado con nubes
//     de tres tonos a tres velocidades y palomas, casas de ladrillo y de estuco con ventanas de guillotina que se
//     encienden, chimeneas que humean, una aguja de iglesia, la acera de enfrente con gente pequeña con paraguas, la
//     calzada mojada con reflejos por la que pasan un autobús rojo de dos pisos y un taxi negro (por detrás del quiosco,
//     que los tapa); el quiosco verde con su toldo oscuro, la ventanilla con luz y dos filas de periódicos colgados que
//     humean de indignación (o.humo 0–1; gag 5), un caballete con una plana; el buzón rojo y la farola; la acera de losas
//     con charcos en los que caen las gotas. Suelo 156 (libre x 56–170; el caballete en x 34–50; hueco para
//     PIEZAS_GT.periodico en x 140–170, y 112–152). o.trafico: segundos que se adelanta el tráfico (el taxi, por el carril
//     de enfrente hacia la derecha, pasa cuando (t + trafico + 1) mod 11 < 5,5; el autobús, por este carril hacia la
//     izquierda, cuando (t + trafico + 6) mod 18 < 9). La lluvia de delante en londresDelante.
export function londres(R, t, o = {}) {
  const enc = o.encuadre ?? 'lores', cam = o.camara ?? 'general';
  let g;
  if (enc === 'redaccion') g = cam === 'quiosco' ? b_quiosco(R, t, o) : b_redaccion(R, t, o);
  else g = cam === 'banco' ? b_loresBanco(R, t, o) : b_lores(R, t, o);
  R.recorte(null);
  return g;
}
// lo de delante de los personajes en cada encuadre de londres(); se llama después de los actores, con las mismas opciones:
// 'lores' los dos bancos rojos de primer término (x 0–104 y 216–319, desde y 158); 'banco' el respaldo del banco de
// delante (desde y 162) con el orden del día, unas gafas y un papel que se mueve; 'redaccion' la mesa del redactor (x
// 196–319, tablero y 150) con la máquina de escribir, el teléfono que suena (o.suena), la taza que humea, el monitor de
// tubo y papeles (el hueco x 226–264 queda bajo, para que se vea la cara del de detrás); 'quiosco' la lluvia de delante
// (o.lluvia), las salpicaduras en la acera y un bolardo
export function londresDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'lores', cam = o.camara ?? 'general';
  if (enc === 'redaccion') { if (cam === 'quiosco') b_quioscoDelante(R, t, o); else b_redaccionDelante(R, t, o); }
  else if (cam === 'banco') b_bancoDelante(R, t, o); else b_loresDelante(R, t, o);
  R.recorte(null);
  return {};
}
// ── C · Nueva York, 1998–2013 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Todos devuelven la geometría para la escena
// ({ suelo, … }: ver cada encuadre). Lo que va por delante de los personajes, en nuevayorkDelante (mismas opciones).
//   'loft' (por omisión): el loft de Rockstar a finales de los noventa. Techo de vigas con el conducto plateado y la tubería
//     roja de los rociadores; pared de ladrillo visto con juntas, ladrillos de tres tonos, hollín arriba y la luz de los
//     ventanales; dos ventanales de fábrica con arco de ladrillo y montantes de acero (x 114–174 y 190–250, y 28–98) con el
//     skyline de Nueva York (cielo tramado, nubes de tres tonos a tres velocidades, pájaros, un avión, tres capas de
//     edificios con depósitos de agua y antenas; o.noche: estrellas, luna, ventanas que se encienden) y una paloma en el
//     alféizar; a la izquierda tres guitarras colgadas, dos discos de oro enmarcados con su brillo y dos carteles de cine
//     sin letras; el sofá Chesterfield con un gato que se despereza; la caja de vinilos con el tocadiscos que gira; bajo los
//     ventanales, el mueble con el equipo de música (los altavoces laten) y una tele de tubo que cambia de imagen; la
//     puerta metálica con la estrella dorada (x 270–306, y 58–128) y una planta; tres lámparas colgantes que se mecen
//     (de noche, encendidas con su halo); suelo de tablones con vetas, la luz de los ventanales (de día) y una alfombra persa
//     (medallón azul, greca, cenefa dorada, pelo gastado y flecos).
//     nuevayorkDelante: las dos mesas de trabajo de las esquinas (tablero y 148, x 0–76 y 244–319) con monitores de tubo
//     (PIEZAS_GT.monitorTubo, 'ciudad'), teclado, caja de pizza, discos, la taza que humea y el flexo.
//     Cámara 'despacho': un despacho alto de 1998 con la pared de cristal a Manhattan de día (helicóptero, nubes, pájaros),
//     estantería con libros y un cuadro a la izquierda, una planta y un archivador a la derecha, un ficus y un globo
//     terráqueo contra el cristal, moqueta azul en losetas con su trama y manchas, la alfombra granate y cuatro sillas de cuero tras la mesa. nuevayorkDelante: la mesa de reuniones (tablero y 144–150, x 70–250) con carpetas, el
//     contrato con la pluma, la jarra, vasos y el teléfono; el centro de la mesa (x 130–190) queda libre para el apretón.
//   'tienda': una tienda de videojuegos a medianoche (o.año: 2001 | 2008 | 2013, por omisión 2008: la tele de tubo o la
//     plana, la ropa de la cola, los móviles de 2013). Techo de placas con fluorescentes (uno parpadea) y banderolas con
//     pictogramas que se mecen, colgadas del falso techo de yeso (tranquilo bajo el año y junto a Atom); sobre el
//     mostrador y la puerta (x 174–273), la franja de la marca con bombillas en carrusel (sin letras: mando, estrella, coche); tres baldas de cajas de juego
//     de lomo y de frente (genéricas, de colores) con sus etiquetas; el reloj de pared a punto de dar las doce; la tele con
//     la persecución de cochecitos de juguete; un cartel sin letras; la pirámide de PIEZAS_GT.cajaJuego en su mesa; el
//     escaparate y la puerta de cristal a la derecha (x 204–318, y 42–122) con la calle nevada de noche por detrás: la cola
//     de gente con abrigos y gorros que se mece y echa vaho, un taxi que pasa, la acera de enfrente; un neón con un mando
//     que parpadea; suelo de baldosas en damero con el reflejo de los fluorescentes, la alfombrilla con nieve y el cartel
//     de suelo mojado (pictograma). o.fiesta 0–1: guirnaldas en el techo (y confeti por delante, en nuevayorkDelante).
//     nuevayorkDelante: el mostrador (tablero y 151–155, x 166–264, frente hasta el suelo) con la vitrina, la caja registradora
//     (PIEZAS_GT.cajaRegistradora en x 250, y 152; o.humo 0–1, gag 7), una pila de cajas planas (x 170–192) y una caja
//     de juego de pie (x 218–238); el dependiente va detrás, en x 194–214; el confeti de o.fiesta.
//     Cámara 'calle': la cola en la calle nevada de noche: la fachada de ladrillo con ventanas (alguien pasa, una tele) y
//     la escalera de incendios, el toldo nevado, el escaparate encendido de la tienda (x 8–124, y 86–124) y su puerta
//     (x 132–160, y 84–128), la persiana bajada del vecino; a la derecha la calle que se aleja con la cola que sigue hasta
//     perderse (figuras de 12 a 4 px que se mecen y echan vaho) y un semáforo; la acera con nieve, huellas y una boca de
//     incendios, la farola con su halo; la calzada con rodadas, charcos con el reflejo
//     del escaparate y de la farola que tiembla, la tapa de alcantarilla y su vapor. nuevayorkDelante:
//     la farola de la esquina (x 185–187), los taxis amarillos que pasan por la calzada (y 152–178) y la nieve que cae
//     por delante de todos.
//   'tribunal': una sala de tribunal estadounidense: techo con casetones (o.florida: ventiladores que giran), pared de
//     escayola con pilastras y friso de madera con cuarterones; dos ventanales con estor (x 12–56 y 228–268, y 20–84):
//     por ellos, con o.florida, palmeras que se mecen, cielo azul y nubes; sin ella, Nueva York gris con edificios; la luz
//     del ventanal en la moqueta con motas de polvo; detrás del estrado, el panel de nogal con la placa dorada (estrella y
//     balanza, sin letras), las dos banderas que se mecen (la de EE. UU. y la del estado: con o.florida, blanca con el aspa
//     roja; si no, azul), el sillón alto del juez; la mesa del secretario con su monitor, la tribuna del jurado con diez
//     bustos (uno da cabezadas, otra toma notas), el reloj; moqueta con dibujo. nuevayorkDelante: el estrado (tablero
//     y 94–98, x 104–216; con el mazo PIEZAS_GT.mazo, la lámpara, el micrófono y carpetas), el banco de los testigos
//     (x 62–100, y 100–126), las mesas de las partes en las esquinas (x 0–56 y 264–319, tablero y 152) y la barandilla
//     de la sala (y 170–179).
//     Cámara 'tele': un plató de noticias de los 2000: la parrilla de focos, el videowall de seis pantallas que cambia
//     (un globo que gira, una caja de juego genérica con una «?», una gráfica que sube, un mazo, ondas), las torres de
//     luz que laten a los lados, el suelo negro brillante con el reflejo azul y las marcas de cinta, las sillas tras la
//     mesa. nuevayorkDelante: la mesa curva del presentador (tablero y 145–149, x 84–236) con la franja de luz, un globo
//     dibujado, monitores, tazas y papeles, y las dos cámaras de estudio en sus pedestales (x 0–58 y 262–319).
export function nuevayork(R, t, o = {}) {
  const e = o.encuadre ?? 'loft', cam = o.camara ?? 'general';
  if (e === 'tienda') return cam === 'calle' ? c_calle(R, t, o) : c_tienda(R, t, o);
  if (e === 'tribunal') return cam === 'tele' ? c_tele(R, t, o) : c_tribunal(R, t, o);
  return cam === 'despacho' ? c_despacho(R, t, o) : c_loft(R, t, o);
}
// lo de delante de los personajes en cada encuadre de nuevayork(); se llama después de los actores, con las mismas opciones
export function nuevayorkDelante(R, t, o = {}) {
  const e = o.encuadre ?? 'loft', cam = o.camara ?? 'general';
  if (e === 'tienda') return cam === 'calle' ? c_calleDelante(R, t, o) : c_tiendaDelante(R, t, o);
  if (e === 'tribunal') return cam === 'tele' ? c_teleDelante(R, t, o) : c_tribunalDelante(R, t, o);
  return cam === 'despacho' ? c_despachoDelante(R, t, o) : c_loftDelante(R, t, o);
}
// ── D · La ciudad de juguete ─────────────────────────────────────────────────────────────────────────────────
// SIEMPRE INVENTADA, a nuestra manera, NUNCA como el juego real: sin mapa ni marcador ni radar ni interfaz ni flechas.
// Colores de juguete, bloques, maqueta. o.encuadre (y o.camara):
//   'arriba' (1995–1997): la ciudad de juguete vista desde arriba, de borde a borde (vista de maqueta: se ven los tejados y
//     la fachada sur de cada bloque, con su sombra). Dos calles horizontales y dos verticales con pasos de cebra, un río
//     con dos puentes y un remolcador, un parque central con estanque y patos, una plaza con fuente y palomas, un
//     aparcamiento, un estadio con jugadores diminutos, un muelle con contenedores y una carretilla, una grúa que gira,
//     sombras de nubes y gaviotas; el asfalto con manchas de aceite, parches, grietas y marcas de frenazo. Los coches de juguete (vistos desde arriba, nuestros) circulan por la derecha, ceden en
//     los cruces y se paran unos detrás de otros; la gente pasea por las aceras (sin cruzar la calzada).
//     o.persecucion 0–1 (gag 4; mejor un valor fijo por plano: 0, 0,5, 1): los coches normales se apartan al bordillo y por
//     el centro de la calzada da vueltas a la manzana del parque un coche rojo perseguido por coches de policía con las
//     luces (1 desde 0, 2 desde 0,3, 3 desde 0,55), que hacen eses y trompos; desde 0,6 el camión de los helados también
//     da vueltas, y desde 0,7 otro policía lo persigue; desde 0,4 un helicóptero de juguete sigue al rojo; desde 0,85 un
//     policía hace trompos en el césped del parque y los patos salen volando. o.cambio 0–1 (en el aparcamiento): un
//     muñequito sale de un coche azul, cruza y se sube a uno amarillo, que sale marcha atrás hacia la salida.
//     Sin línea de suelo: es un plano de ciudad entera y NO lleva personajes chibi (se leen como gigantes); la reacción
//     de los personajes va en la cámara 'boton', con la ciudad en el monitor. Cámara 'boton': la mesa de pruebas de DMA (1996): la pared con la pizarra de la ciudad, la
//     ventana con lluvia, la rejilla del aire con tiras de papel que ondean, el detector de humo con su piloto, el monitor de tubo con la ciudad (PIEZAS_GT.monitorTubo) y el botón rojo gigante
//     (PIEZAS_GT.botonRojo, o.pulsado 0–1; gag 3); la mesa va en ciudadDelante.
//   'tresde' (2001): la ciudad de juguete en 3D a pie de calle: una avenida en perspectiva entre edificios de bloques, la
//     calle de delante con coches de juguete (PIEZAS_GT.cocheJuguete) que llevan la radio (notas que salen), gente pequeña
//     que charla en la acera, semáforos que cambian en la esquina de la avenida, palomas (gaviotas en 'ochenta' y 'tres') que
//     picotean en la acera de delante, un avión lejano, cirros en el cielo; el suelo con rodadas, parches, grietas, manchas de
//     aceite, sumideros y una trampilla de sótano; o.levanta 0–1: la ciudad plana (sus huellas pintadas en el suelo) se levanta en 3D, de cerca
//     a lejos. o.estilo: 'nueva' (gris, invierno, nieve sucia en los bordillos, vapor, torres de agua, puente colgante lejano: una Nueva York
//     inventada) | 'ochenta' (sol bajo sobre el mar al fondo, palmeras, fachadas pastel art déco, franjas de neón rosa y cian que
//     parpadean y rótulos de bandera con pictogramas de neón: palmera, copa, estrella) | 'tres'
//     (tres ciudades en el horizonte: bahía con puente, desierto con mesetas y colinas verdes, al atardecer). Cámara
//     'puente': de noche, desde el paseo del río: un puente colgante con los coches (faros y pilotos) que lo cruzan, la
//     ciudad iluminada detrás y el agua con los reflejos.
// Devuelve { suelo, … } con la geometría de cada encuadre (ver ciudadDelante para lo que va delante de los personajes).
export function ciudad(R, t, o = {}) {
  const enc = o.encuadre ?? 'arriba', cam = o.camara ?? 'general';
  if (enc === 'tresde') return cam === 'puente' ? d_puente(R, t, o) : d_tresde(R, t, o);
  return cam === 'boton' ? d_boton(R, t, o) : d_arriba(R, t, o);
}
// lo de delante de los personajes en cada encuadre de ciudad(); se llama después de los actores, con las mismas opciones:
// en 'boton', la mesa de pruebas con el monitor, el botón rojo (o.pulsado) y el teléfono, y una silla en primer término;
// en 'tresde', la farola y la boca de riego de la acera (y en 'ochenta', una palmera en maceta); en 'puente', la farola
// del paseo y el banco; en 'arriba', nada (los árboles ya van sobre los coches)
export function ciudadDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'arriba', cam = o.camara ?? 'general';
  if (enc === 'arriba' && cam === 'boton') return d_botonDelante(R, t, o);
  if (enc === 'tresde' && cam === 'puente') return d_puenteDelante(R, t, o);
  if (enc === 'tresde') return d_tresdeDelante(R, t, o);
  return {};
}
// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve { suelo, … } con la geometría.
//   'estudio' (cámaras 'general' y 'mesa'): el estudio de Atom de día. En 'general': techo con moldura, papel pintado
//     verde salvia con rayas y rombos, zócalo de cuarterones de madera, la ventana con cortinas (cielo vivo con nubes de tres
//     tonos a tres velocidades, tejados lejanos con chimeneas que humean, pájaros) y su haz de luz con motas sobre el suelo,
//     un póster sin letras (un coche a contraluz bajo un atardecer), un reloj que anda, la estantería de juegos (lomos de
//     colores sin letras, una consola sin marca con su piloto, un mando, un trofeo pequeño, figuritas), una lámpara de pie
//     con su halo y una planta grande; el suelo de tarima y una alfombra con dibujo; la mesa de madera a la altura de la
//     cintura de un chibi, con un flexo encendido, un bichito de juguete que se balancea, una pila de cajas de juego, una
//     taza que humea, un mando sin marca y el coche de policía de juguete en miniatura (o.coche: 'para' quieto y apagado |
//     'persigue' da vueltas con las luces | 'atom' huye más rápido, para el gag 8: la escena pone a Atom detrás con
//     ruta(t − retraso)). En 'mesa': la mesa de cerca, con una alfombrilla de carreras (una pista ovalada con su línea
//     discontinua y bordillos rojos y blancos, una isla con casitas de madera, árboles de juguete, farolas y conos) por la
//     que corre PIEZAS_GT.cochePolicia (o.coche igual), el flexo con su cono de luz, la taza humeante, cajas de juego
//     (PIEZAS_GT.cajaJuego), el bichito (PIEZAS_GT.bichito) que anda en el sitio, un móvil que se enciende y unos dados;
//     detrás, la pared, la ventana y la estantería de cerca. o.vueltas: velocidad del coche (vueltas por segundo ×2π).
//   'records': la sala de récords: un techo de cristal con el cielo y sus nubes, la viga con focos que barren, la pared
//     azul con pilastras doradas, el contador gigante de visitas con bombillas que corren (o.contador: número que muestra,
//     con las cifras que ruedan como un cuentakilómetros; sin él, gira solo), dos gráficas que suben, el trofeo
//     (PIEZAS_GT.trofeo) en su pedestal con su foco y su destello, el cordón de terciopelo, el suelo de mármol que refleja,
//     la alfombra roja, confeti que cae y la montaña de cajas de juego (o.montana 0–1: de un montoncito a tocar el techo de
//     cristal) con cajas que resbalan y una carretilla elevadora diminuta que trae más. Cámara 'filtracion' (2022): de
//     noche, una oficina con una mampara de cristal y la sala de servidores detrás (armarios con pilotos que parpadean, un
//     técnico pequeño que pasa), la mesa con el ordenador en alarma (triángulo rojo que late y carpetas que se van en la
//     pantalla), la sirena que gira y barre la sala de rojo, un portátil, teclado, taza, cables por el suelo, la silla, y
//     la carpeta que se escapa volando (o.carpeta 0–1: 0 sobre la mesa, 1 fuera por la izquierda; sin ella, en bucle) con
//     sus hojas que revolotean; o.alarma false la apaga.
//   'espera': la calle al anochecer de 2026: cielo tramado de malva a naranja con nubes y un avión que parpadea, edificios
//     vecinos de ladrillo (escalera de incendios, ventanas encendidas con siluetas, aire acondicionado que gotea), la tienda
//     con el cartel de neón (dos palmeras y un sol a rayas, sin letras ni logo, que parpadea), las persianas metálicas
//     medio bajadas (o.persiana 0–1, 0.5 por omisión) con la luz de dentro, cajas de juego en las estanterías, el
//     calendario del escaparate con el 19 rodeado en rojo (solo números), la acera con sus losas, una farola que se
//     enciende, palomas que picotean, vapor de una alcantarilla y coches que pasan por la calzada de delante (o.coches).
//     Cámara 'disco' (2005): una sala de estar de noche (papel pintado, la ventana con la luna y la ciudad, la tele de tubo
//     con su resplandor, la consola, juegos en la estantería, un póster y una lámpara) y, en hoyDelante, la mesita baja con
//     el disco brillante (PIEZAS_GT.disco, a escala 2), la lupa que pasa por encima (o.lupa 0–1: dónde está; false la
//     quita) y la caja cerrada con candado y «18+» (o.caja 0–1: sale del disco y se posa a su lado; 1 por omisión). El salón
//     lleva además la cornisa, cortinas de terciopelo, el radiador, el sofá verde con cojines y un gato que duerme y respira
//     en el brazo, la alfombra persa bajo la mesita, juegos apilados, el mando con su cable, la luz de la tele que cambia
//     de color sobre la alfombra y dos polillas en la lámpara.
//   o.cifras (en 'records'): 8 cifras en el contador por omisión, o 9 (fichas más estrechas en el mismo marco [3,37,137,69]).
//   En 'filtracion' hay también la bandeja de cables y los tubos de luz de la sala, la cinta amarilla y negra, la franja
//     esmerilada del cristal y un brillo que resbala por él, la pared de bloques con el cartel de salida (flecha y puerta),
//     la fuente de agua con su burbuja, la cámara de seguridad que gira, la papelera, pósits y bolígrafos, y el
//     resplandor rojo del monitor sobre la mesa y la moqueta mientras suena la alarma.
//   En 'estudio' el coche de juguete (15 × 9) es blanco con franja azul y barra de luces en coche.y − 9; con las luces
//     lleva su resplandor rojo y azul y su reflejo en el tablero, y siempre su sombra.
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'records') return cam === 'filtracion' ? e_filtracion(R, t, o) : e_records(R, t, o);
  if (enc === 'espera') return cam === 'disco' ? e_disco(R, t, o) : e_espera(R, t, o);
  return cam === 'mesa' ? e_mesa(R, t, o) : e_estudio(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones:
// 'estudio' el baúl de juguetes (abajo a la izquierda) y las hojas de la planta (abajo a la derecha); 'mesa' el borde de la
// mesa con el mando; 'records' confeti grande que cae por delante; 'filtracion' la caja de cables de la esquina; 'espera' la
// papelera y la boca de riego; 'disco' la mesita baja con el disco, la lupa y la caja con candado.
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'records') return cam === 'filtracion' ? e_filtracionDelante(R, t, o) : e_recordsDelante(R, t, o);
  if (enc === 'espera') return cam === 'disco' ? e_discoDelante(R, t, o) : e_esperaDelante(R, t, o);
  return cam === 'mesa' ? e_mesaDelante(R, t, o) : e_estudioDelante(R, t, o);
}
// la paleta propia de Dundee: el cielo gris azulado y las nubes en tres tonos, la piedra, la arenisca y la pizarra, el
// Tay, el hierro rojizo del puente, el bronce de las estatuas, la oficina de los noventa (bloque pintado, moqueta, haya)
// y la tienda de pescado frito
const AD = pal({
  k: '#17151d', blanco: '#f4f4ee',
  cielo0: '#7c8da4', cielo1: '#90a0b4', cielo2: '#a6b3c2', cielo3: '#bec7d0', claro0: '#6e98c4', claro1: '#8eb0d4',
  nubeL: '#e4e8ec', nubeM: '#c0c7d0', nubeS: '#99a3b0', nubeD: '#727c8c', nubeN: '#5c6474',
  piedra: '#9c9a94', piedraL: '#b8b4ac', piedraS: '#787670', piedraD: '#56544f',
  arenisca: '#b0a28a', areniscaL: '#c8baa0', areniscaS: '#8c806c', areniscaD: '#665c4e', hollin: '#7a7468',
  pizarra: '#505868', pizarraL: '#6c7586', pizarraS: '#383f4c',
  agua: '#6f8498', aguaL: '#97aabb', aguaS: '#5a6e82', aguaD: '#46586a', espuma: '#d4dee6',
  lejos0: '#98a6b4', lejos1: '#8898a8', lejos2: '#7a8b9c', campo0: '#8c9c8e', campo1: '#9aa690', campo2: '#7c8e80',
  ley: '#6c8a60', leyS: '#506a48', leyL: '#88a476',
  hierro: '#6a4038', hierroS: '#462a26', hierroL: '#905a4c',
  farola: '#2c4a3c', farolaL: '#48685a', luz: '#ffe2a0', luzL: '#fff6d8', luzB: '#e8f4ff', ambar: '#f0a040',
  losa: '#8c8c90', losaS: '#6c6c72', losaL: '#a6a6ac', losaD: '#5a5a62',
  asfalto: '#45474e', asfaltoS: '#35373c', asfaltoL: '#5c5e66', amarilla: '#e8c040',
  bronce: '#8c5c2c', bronceS: '#5c3c1c', bronceL: '#c48e4c', verdin: '#5a8a74',
  rojoB: '#c8302a', rojoBS: '#8a1e1a', rojoBL: '#e8584a',
  bloque: '#cfcab4', bloqueS: '#b6b09a', bloqueL: '#dedac6', bloqueJ: '#a8a28c',
  moqueta: '#5c6880', moquetaS: '#4a5468', moquetaL: '#6e7a92',
  haya: '#d0a872', hayaS: '#a6804e', hayaL: '#e4c290', hayaD: '#7a5a34',
  gris: '#8a8c90', grisS: '#5e6064', grisL: '#b4b6ba', grisD: '#3e4044', alu: '#c4c8cc', aluS: '#9094a0',
  techo: '#e2dece', techoS: '#c4c0b0', tubo: '#f4fbff',
  tienda: '#2a5c58', tiendaS: '#1a3c3a', tiendaL: '#4a7c76', oro: '#e4b444', oroS: '#a87a20', oroL: '#f8dc8a',
  azulejo: '#eef0ea', azulejoS: '#c8ccc4', pescado: '#e2a444', pescadoS: '#b0702a', acero: '#c8ccd2', aceroS: '#8a909a',
  neonA: '#62f0ff', neonR: '#ff6ab4', puerta: '#2e5a3e', puertaS: '#1e3e2a', puertaL: '#4a7a58',
  noche0: '#161e30', noche1: '#202a42', sodio: '#ffb050', pantalla: '#9ad0ff',
  yeso: '#bfc3c0', yesoS: '#a7aba8', yesoL: '#d2d4d0', nogal: '#7a4e2e', nogalS: '#583820', nogalL: '#9c6a40', nogalD: '#40281a',
  papel: '#f2efe4', papelS: '#d0ccc0', pizza: '#e8b860', pizzaS: '#c87a3a', salsa: '#c8402a', caja: '#d8c8a4', cajaS: '#b0a07c',
  rojoC: '#b8282a', azulC: '#2a4ab0', verdeC: '#3a8a3a', naranjaC: '#e07a20',
});

// una cifra de 3 × 5 a rotulador o en latón (solo números: '0'–'9'), esquina de arriba a la izquierda en (x, y)
const a_CIFRAS = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001111' };

function a_digito(R, d, x, y, c) { const f = a_CIFRAS[d]; if (!f) return; for (let i = 0; i < 15; i++) if (f[i] === '1') R.pset(x + (i % 3), y + Math.floor(i / 3), c); }

// trama de Bayer 4×4: el umbral de cada píxel, para los degradados tramados
const a_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const a_um = (x, y) => (a_BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla de dos colores (k = 0, el primero; 1, el segundo)
const a_mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };

// las capas fijas de Dundee: cada una se pinta una vez en un búfer de R.nuevo() que empieza «vacío» (a_VACIO) y se pega
// en cada fotograma dejando ver lo que hay debajo (el cielo que se mueve) donde quedó vacía
const a_VACIO = 0x01020304, a_capasDun = new Map();

function a_capaDun(R, clave, dibuja) {
  let b = a_capasDun.get(clave);
  if (!b) { b = R.nuevo(); b.fill(a_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); a_capasDun.set(clave, b); }
  return b;
}

// pega una capa fija sobre el fotograma (un recorrido de la pantalla)
function a_pegar(R, b) { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c !== a_VACIO) B[i] = c; } }

// un rectángulo recortado a mano al hueco cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function a_rectR(R, cl, x0, y0, x1, y1, c) { const X0 = Math.max(Math.round(x0), cl[0]), Y0 = Math.max(Math.round(y0), cl[1]), X1 = Math.min(Math.round(x1), cl[2]), Y1 = Math.min(Math.round(y1), cl[3]); if (X0 <= X1 && Y0 <= Y1) R.rect(X0, Y0, X1, Y1, c); }

// oscurece una capa entera hacia el azul de la noche (una sola vez, al pintarla): deja las luces que se le pasan
function a_nocheCapa(b, deja = new Set()) {
  for (let i = 0; i < 57600; i++) { const c = b[i]; if (c === a_VACIO || deja.has(c)) continue; const r = c & 255, g = (c >>> 8) & 255, bl = (c >>> 16) & 255;
    b[i] = (0xff000000 | (Math.min(255, Math.round(bl * 0.46 + 30)) << 16) | (Math.min(255, Math.round(g * 0.34 + 18)) << 8) | Math.min(255, Math.round(r * 0.3 + 16))) >>> 0; }
}

// un halo de luz que tiñe lo que hay (tramado, sin bordes): centro (cx, cy), radios rx, ry, color y fuerza
function a_halo(R, cx, cy, rx, ry, col, f = 0.4, cl = null) {
  const B = R.buf, x0 = Math.max(cl ? cl[0] : 0, Math.round(cx - rx)), x1 = Math.min(cl ? cl[2] : 319, Math.round(cx + rx)), y0 = Math.max(cl ? cl[1] : 0, Math.round(cy - ry)), y1 = Math.min(cl ? cl[3] : 179, Math.round(cy + ry));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d >= 1) continue; const q = f * (1 - d); if (q > a_um(x, y) * 0.5) B[y * 320 + x] = a_mez(B[y * 320 + x], col, Math.min(0.85, q * 1.2)); }
}

// el cielo escocés de las filas 0..hor-1 (x0..x1): gris azulado tramado en cuatro bandas, dos claros de azul que se abren
// y se cierran despacio (menos cuanto más llueve), nubes de tres tonos en tres capas (lejanas casi del color del cielo a
// 1,5 px/s, medias a 4 y bajas a 8) y, con lluvia, cortinas grises bajo las nubes medias
function a_cieloDun(R, t, hor, o = {}) {
  const B = R.buf, ll = Math.max(0, Math.min(1, o.lluvia ?? 0)), x0 = o.x0 ?? 0, x1 = o.x1 ?? 319;
  const bandas = [AD.cielo0, AD.cielo1, AD.cielo2, AD.cielo3];
  const abre = Math.max(0, 1 - ll * 1.3) * (0.75 + 0.25 * Math.sin(t * 0.25));
  const claros = abre > 0.05 ? [[((60 + t * 1.5) % 420) - 50, hor * 0.42, 46 * abre, 9 * abre], [((250 + t * 1.5) % 420) - 50, hor * 0.62, 34 * abre, 6 * abre]] : [];
  for (let y = 0; y < hor; y++) { const f = y / hor * 3.4 - ll * 0.7, fila = y * 320;
    for (let x = x0; x <= x1; x++) { let i = Math.floor(f + a_um(x, y) - 0.2); i = i < 0 ? 0 : i > 3 ? 3 : i; let c = bandas[i];
      for (const [cx, cy, rx, ry] of claros) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d < 1) c = d < 0.45 + a_um(x, y) * 0.2 ? AD.claro0 : d < 0.8 + a_um(x, y) * 0.2 ? AD.claro1 : c; }
      B[fila + x] = c; } }
  const tono = (c, k) => ll > 0.4 ? a_mez(c, AD.nubeN, (ll - 0.4) * 0.6 * k) : c;
  const capas = [
    { v: 1.5, n: 4, yb: [hor * 0.3, hor * 0.42], w: [30, 46], col: [AD.cielo1, AD.cielo2, a_mez(AD.cielo2, AD.cielo3, 0.5)], sem: 0 },
    { v: 4, n: 3, yb: [hor * 0.56, hor * 0.7], w: [56, 84], col: [tono(AD.nubeD, 1), tono(AD.nubeS, 1), tono(AD.nubeM, 0.6)], sem: 1 },
    { v: 8, n: 3, yb: [hor * 0.8, hor * 0.95], w: [70, 110], col: [tono(AD.nubeS, 1), tono(AD.nubeM, 0.8), tono(AD.nubeL, 0.5)], sem: 2 },
  ];
  for (const c of capas) for (let k = 0; k < c.n; k++) {
    const w = c.w[0] + h(k, c.sem, 901) * (c.w[1] - c.w[0]), per = 320 + w + 60, x = ((h(k, c.sem, 902) * per + k * per / c.n + t * c.v) % per) - w / 2 - 30, yb = Math.round(c.yb[0] + h(k, c.sem, 903) * (c.yb[1] - c.yb[0]));
    a_nubeDun(R, x, yb, w, k + c.sem * 7, c.col, x0, x1, hor);
    // las cortinas de lluvia bajo las nubes medias
    if (c.sem === 1 && ll > 0.25) for (let xx = Math.round(x - w * 0.35); xx < x + w * 0.35; xx++) { if (xx < x0 || xx > x1) continue; for (let y = yb + 1; y < hor; y++) { const s = (xx + Math.floor(y * 0.4)) % 3 === 0 && a_um(xx, y) < (ll - 0.2) * 0.7 * (1 - (y - yb) / (hor - yb + 1)); if (s) B[y * 320 + xx] = a_mez(B[y * 320 + xx], AD.nubeD, 0.5); } }
  }
}

// una nube de base plana en tres tonos (sombra abajo, medio, luz arriba a la izquierda): centro x, base yb, ancho w
function a_nubeDun(R, cx, yb, w, k, [cs, cm, cl], x0 = 0, x1 = 319, hor = 180) {
  const n = Math.max(3, Math.round(w / 10)), B = R.buf, bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, r = (0.4 + 0.6 * Math.sin(u * Math.PI)) * w * 0.2 + h(i, k, 904) * 3; bolas.push([cx - w / 2 + u * w, yb - r * 0.5 - h(i, k, 905) * 2, r]); }
  // en la esquina de Atom (x ≥ 270, y ≤ 48) la nube se funde con el cielo: queda tranquila
  const capa = (dx, dy, fr, c, base) => { const cA = a_mez(c, AD.cielo1, 0.72); for (const [bx, by, r0] of bolas) { const r = Math.max(1, r0 * fr), R2 = r * r, ri = Math.ceil(r);
    for (let j = -ri; j <= ri; j++) { const yy = Math.round(by + dy + j); if (yy > base || yy < 0 || yy >= hor) continue; for (let i = -ri; i <= ri; i++) { if (i * i + j * j > R2) continue; const xx = Math.round(bx + dx + i); if (xx < x0 || xx > x1) continue; B[yy * 320 + xx] = xx >= 270 && yy <= 48 ? cA : c; } } } };
  capa(0, 0, 1, cs, yb); capa(-1, -2, 0.86, cm, yb - 2); capa(-3, -4, 0.5, cl, yb - 5);
}

// gaviotas que planean y aletean (blancas, con la punta de las alas gris); no entran en la esquina de Atom
function a_gaviotas(R, t, n, y0, y1, sem = 0, cl = null) {
  for (let k = 0; k < n; k++) {
    const v = 7 + h(k, sem, 911) * 10, d = h(k, sem, 912) < 0.5 ? 1 : -1, per = 380, u = (h(k, sem, 913) * per + t * v) % per, x = Math.round(d > 0 ? u - 30 : 350 - u), y = Math.round(y0 + h(k, sem, 914) * (y1 - y0) + Math.sin(t * 0.9 + k) * 4);
    if (x > 272 && y < 48) continue;
    if (cl && (x < cl[0] + 3 || x > cl[2] - 3 || y < cl[1] + 2 || y > cl[3] - 2)) continue;
    const ala = Math.sin(t * 6 + k * 2.1), s = ala > 0.3 ? -1 : ala < -0.3 ? 1 : 0;
    R.pset(x, y, AD.blanco); R.pset(x + d, y, AD.blanco); R.pset(x - 1, y + s, AD.blanco); R.pset(x + 1 + d, y + s, AD.blanco); R.pset(x - 2, y + s * 2 - (s === 0 ? 1 : 0), AD.grisS); R.pset(x + 2 + d, y + s * 2 - (s === 0 ? 1 : 0), AD.grisS); R.pset(x + d * 2, y, AD.ambar);
  }
}

// gente pequeña de fondo (8–10 px) que pasea por una línea de suelo, con paraguas si llueve: n figuras entre x0 y x1
function a_paseantes(R, t, n, x0, x1, suelo, ll, sem = 0, cl = null) {
  const { rect, pset } = R, ropa = [AD.rojoC, AD.azulC, hex('#4a4a52'), hex('#7a5a3a'), AD.verdeC, hex('#6a3a6a')];
  for (let k = 0; k < n; k++) {
    const v = 4 + h(k, sem, 921) * 5, d = h(k, sem, 922) < 0.5 ? 1 : -1, L = x1 - x0 + 20, u = (h(k, sem, 923) * L + t * v) % L, x = Math.round(d > 0 ? x0 - 10 + u : x1 + 10 - u), pie = Math.floor(t * 4 + k) % 2, c = ropa[(k + sem) % ropa.length];
    const r = (a, b, cc, dd, col) => cl ? a_rectR(R, cl, a, b, cc, dd, col) : rect(a, b, cc, dd, col);
    r(x - 1, suelo - 7, x + 1, suelo - 3, c); r(x - 1 + pie, suelo - 2, x - 1 + pie, suelo, AD.k); r(x + 1 - pie, suelo - 2, x + 1 - pie, suelo, AD.k); r(x - 1, suelo - 9, x + 1, suelo - 8, hex('#e0b090')); r(x - 1, suelo - 10, x + 1, suelo - 10, hex('#4a3020'));
    if (ll > 0.2 && k % 3 !== 2) { const pc = [AD.k, AD.rojoC, AD.azulC][k % 3]; r(x - 4, suelo - 13, x + 4, suelo - 12, pc); r(x - 3, suelo - 14, x + 3, suelo - 14, pc); r(x + d, suelo - 11, x + d, suelo - 8, AD.grisD); }
  }
}

function a_ciudadDun(R, t, o = {}) {
  const { rect, pset, linea, disco } = R, ll = o.lluvia ?? 0.5, año = o.año ?? 1990, nuevo = año >= 2000, est = o.estatuas ?? año >= 2008, hor = 84;
  a_cieloDun(R, t, hor, { lluvia: ll });
  a_gaviotas(R, t, 5, 20, 64, 0);
  a_pegar(R, a_capaDun(R, 'ciudad|' + (nuevo ? 1 : 0) + '|' + (est ? 1 : 0), () => a_ciudadFija(R, nuevo, est)));
  // los molinos de viento de hoy en las colinas de Fife
  if (nuevo) for (const [mx, my] of [[232, 64], [258, 66]]) { rect(mx, my, mx, my + 9, AD.blanco); const a = t * 2.4 + mx; for (let p = 0; p < 3; p++) { const an = a + p * 2.094; linea(mx, my, Math.round(mx + Math.cos(an) * 5), Math.round(my + Math.sin(an) * 5), AD.blanco); } pset(mx, my, AD.grisL); }
  // el agua: brillos que corren hacia la derecha con la corriente y se encienden y apagan
  for (let k = 0; k < 70; k++) { const y = 88 + Math.floor(h(k, 1, 931) * 46), v = 2 + (y - 84) * 0.12, x = Math.round((h(k, 2, 931) * 340 + t * v) % 340) - 10, on = Math.sin(t * 2.2 + k * 1.7) > 0.1;
    if (!on || x < 0 || x > 319) continue; if (y < 120 && x < 128) continue; const L = 1 + Math.floor((y - 84) / 14); rect(x, y, x + L, y, y < 100 ? AD.espuma : AD.aguaL); }
  // el tren que cruza el puente de sur a norte cada 16 s (y el humo de la vía mojada no: es un tren diésel)
  { const u = (t % 16) / 16; if (u < 0.75) { const xf = Math.round(330 - u / 0.75 * 260); for (let c = 0; c < 5; c++) { const x = xf + c * 9; if (x < 112 || x > 322) continue; const y = a_cubierta(x) - 1;
      rect(x - 4, y - 4, x + 3, y, AD.k); rect(x - 3, y - 3, x + 2, y - 1, c === 0 ? hex('#3a5aa8') : hex('#d8d8dc')); pset(x - 2, y - 3, c === 0 ? hex('#f0d040') : hex('#4a6aa8')); pset(x, y - 3, hex('#4a6aa8')); } } }
  // el humo de las chimeneas, que se va hacia la derecha con el viento
  for (const [cx, cy] of [[14, 74], [44, 70], [76, 72], [104, 75], [30, 62], [62, 58]]) for (let i = 0; i < 4; i++) { const u = (t * 0.3 + i / 4 + cx * 0.01) % 1, sx = Math.round(cx + u * 12 + Math.sin(t + i) * 1.2), sy = Math.round(cy - u * 12); if (u < 0.35) pset(sx, sy, AD.nubeM); else disco(sx, sy, u > 0.7 ? 2 : 1, u > 0.7 ? AD.cielo2 : AD.nubeM); }
  // los paseantes del muelle
  a_paseantes(R, t, 5, 0, 120, 110, ll, 3);
  // la grúa del puerto (delante del puente) con el gancho que baja y sube una caja
  a_grua(R, t, 196, 112);
  // el velero antiguo de tres palos amarrado al muelle (delante del tren y del puente), con su banderola
  a_velero(R, t, 156, 127);
  // los anillos de la lluvia en los charcos del paseo
  if (ll > 0.1) for (const [px, py, rx] of [[66, 160, 13], [206, 150, 9], [300, 158, 8]]) for (let k = 0; k < 3; k++) { const u = (t * 1.3 + k * 0.33 + px * 0.01) % 1, cx = px + Math.round((h(k, Math.floor(t * 1.3 + k * 0.33 + px * 0.01), 932) - 0.5) * rx), r = 1 + u * 3; if (u > 0.8) continue;
    for (let a = 0; a < 6.28; a += 0.5) pset(Math.round(cx + Math.cos(a) * r), Math.round(py + Math.sin(a) * r * 0.35), AD.cielo3); }
  // la luz de las farolas, que tiembla un poco
  for (const fx of [34, 186]) { const q = 0.25 + Math.sin(t * 3 + fx) * 0.03; a_halo(R, fx, 100, 9, 6, nuevo ? AD.luzB : AD.luz, q); }
  return { suelo: 156, horizonte: 84, libre: [[0, 236], [268, 320]], banco: [96, 122, 146], buzon: [150, 150], farolas: [34, 186], columna: est ? [253, 78, 146] : null, cabina: !nuevo && !est ? [253, 148] : null, puente: [[112, a_cubierta(112)], [320, a_cubierta(320)]], muelle: 110, velero: [156, 127], calzada: [166, 180] };
}

// la altura de la cubierta del puente en x (sube un poco hacia la derecha: se aleja)
const a_cubierta = (x) => Math.round(100 - (x - 112) * 12 / 208);

// lo fijo de la ciudad: colinas de Fife, el agua, el puente, la ciudad que sube al Law, el muelle y el paseo
function a_ciudadFija(R, nuevo, est) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // las colinas de Fife al otro lado del estuario, con campos, setos, bosquecillos y un pueblo
  for (let x = 0; x < 320; x++) { const top = Math.round(70 + 3 * Math.sin(x * 0.021 + 0.5) + 2 * Math.sin(x * 0.063 + 2)); for (let y = top; y < 86; y++) {
      let c = (y - top) < 2 ? AD.lejos0 : h(x >> 3, (y - top) >> 1, 941) < 0.35 ? AD.campo1 : h(x >> 4, y >> 2, 942) < 0.3 ? AD.campo0 : AD.lejos1;
      if ((y - top) % 4 === 3 && h(x >> 2, y, 943) < 0.6) c = AD.campo2; if (h(x, y, 944) < 0.04) c = AD.lejos2; B[y * 320 + x] = c; } }
  for (let k = 0; k < 14; k++) { const x = 140 + Math.round(h(k, 0, 945) * 170), y = 78 + Math.round(h(k, 1, 945) * 5); pset(x, y, AD.blanco); pset(x + 1, y, AD.lejos0); pset(x, y - 1, AD.pizarraL); }
  for (let k = 0; k < 9; k++) { const x = 130 + Math.round(h(k, 2, 945) * 180), y = 74 + Math.round(h(k, 3, 945) * 6); disco(x, y, 1, AD.campo2); pset(x - 1, y - 1, AD.lejos1); }
  // el estuario: bandas tramadas, vetas de corriente, los reflejos oscuros del puente y de la ciudad
  for (let y = 84; y < 136; y++) { const p = (y - 84) / 52; for (let x = 0; x < 320; x++) {
      let c = p + a_um(x, y) * 0.25 < 0.2 ? AD.aguaL : p + a_um(x, y) * 0.25 < 0.62 ? AD.agua : AD.aguaS; const q = h((x + y * 5) >> 4, y, 946);
      if (q < 0.1) c = y < 96 ? AD.espuma : AD.aguaL; else if (q > 0.9) c = AD.aguaD; if (x < 125 && y > 118 && (x + y) % 2 === 0) c = AD.aguaD; B[y * 320 + x] = c; } }
  // el puente largo del ferrocarril: pilares de hierro rojizo cada vez más juntos, la cubierta, el tramo alto de celosía
  // y los reflejos en el agua
  for (let x = 112, paso = 12; x < 322; x += paso, paso = Math.max(5, paso - 0.35)) { const xi = Math.round(x), y = a_cubierta(xi), al = Math.round(13 - (xi - 112) / 30);
    for (const dx of [0, 3]) { rect(xi + dx, y + 2, xi + dx + 1, y + al, AD.hierro); pset(xi + dx, y + 2, AD.hierroL); }
    rect(xi, y + Math.round(al * 0.5), xi + 4, y + Math.round(al * 0.5), AD.hierroS); rect(xi - 1, y + al, xi + 5, y + al, AD.espuma);
    for (let j = 1; j < 6; j++) if (j % 2) rect(xi, y + al + j, xi + 4, y + al + j, AD.aguaD); }
  for (let x = 112; x < 320; x++) { const y = a_cubierta(x); pset(x, y, AD.hierroS); pset(x, y + 1, AD.hierro); pset(x, y - 1, (x % 4 === 0) ? AD.hierroS : B[(y - 1) * 320 + x]); }
  for (let x = 190; x < 262; x++) { const y = a_cubierta(x); pset(x, y - 7, AD.hierro); pset(x, y - 6, AD.hierroS); const m = (x - 190) % 8; pset(x, y - 6 + (m < 4 ? m : 8 - m) + 1, AD.hierro); if (m === 0) for (let j = 1; j < 7; j++) pset(x, y - j, AD.hierroS); }
  // la colina del Law con su torre, sus muros de piedra y sus árboles
  poligono([[0, 84], [0, 58], [20, 46], [40, 38], [52, 37], [70, 44], [96, 56], [132, 76], [132, 84]], AD.ley);
  for (let y = 36; y < 84; y++) for (let x = 0; x < 132; x++) { const i = y * 320 + x; if (B[i] !== AD.ley) continue; const q = h(x >> 1, y, 947); if (q < 0.18) B[i] = AD.leyS; else if (q > 0.86) B[i] = AD.leyL; if ((x + y * 2) % 23 === 0 && y > 46) B[i] = AD.piedraS; }
  rect(43, 28, 48, 38, AD.k); rect(44, 29, 47, 38, AD.piedraL); rect(47, 29, 47, 38, AD.piedraS); rect(43, 27, 48, 27, AD.piedraS); pset(45, 31, AD.k); pset(45, 35, AD.k);
  for (const [tx, ty] of [[18, 52], [26, 50], [72, 50], [84, 56], [100, 62], [10, 58]]) { disco(tx, ty, 2, AD.leyS); pset(tx - 1, ty - 1, AD.leyL); }
  // tres hileras de casas que suben por la colina, cada vez más claras (más lejos)
  for (const [base, alt, x1, k, f] of [[70, 9, 118, 0, 0.55], [80, 11, 124, 1, 0.38], [92, 13, 128, 2, 0.2]]) for (let x = -4; x < x1;) { const w = 7 + Math.round(h(x, k, 948) * 8), al = alt + Math.round(h(x, k, 949) * 6), c = a_mez([AD.piedra, AD.arenisca, AD.piedraS][(x + k) % 3], AD.lejos0, f), tj = a_mez(AD.pizarra, AD.lejos0, f);
      rect(x, base - al, x + w - 1, base + 10, c); rect(x, base - al - 2, x + w - 1, base - al, tj); pset(x + 1, base - al - 3, tj);
      for (let yy = base - al + 2; yy < base + 8; yy += 3) for (let xx = x + 1; xx < x + w - 1; xx += 2) pset(xx, yy, a_mez(AD.k, AD.lejos0, f + 0.2)); x += w + (h(x, k, 950) < 0.2 ? 1 : 0); }
  // la aguja de la iglesia
  rect(86, 58, 93, 104, AD.k); rect(87, 59, 92, 104, AD.piedra); rect(92, 59, 92, 104, AD.piedraS); for (let y = 62; y < 104; y += 5) rect(87, y, 92, y, AD.piedraS);
  poligono([[86, 59], [89, 30], [90, 30], [93, 59]], AD.k); poligono([[87, 58], [89, 32], [90, 32], [92, 58]], AD.pizarraL); linea(90, 34, 92, 57, AD.pizarraS); pset(89, 28, AD.oro); pset(89, 29, AD.oro); rect(88, 66, 91, 71, AD.k); pset(89, 67, AD.piedraL);
  // los bloques de pisos de delante: piedra con hiladas, ventanas en cuatro alturas (algunas con luz), tiendas abajo,
  // tejados de pizarra con buhardillas y chimeneas con sus cañones
  const BL = [[-2, 34, AD.piedra, AD.piedraS, AD.piedraL], [32, 30, AD.arenisca, AD.areniscaS, AD.areniscaL], [62, 30, AD.piedraS, AD.piedraD, AD.piedra], [92, 34, AD.arenisca, AD.areniscaS, AD.areniscaL]];
  BL.forEach(([x0, w, c, cs, cl], k) => { const top = 76 + (k % 2) * 3, x1 = x0 + w - 1;
    rect(x0, top, x1, 110, AD.k); rect(x0 + 1, top + 1, x1 - 1, 110, c);
    for (let y = top + 3; y < 110; y += 3) for (let x = x0 + 1; x < x1; x++) { if (h(x, y, 951) < 0.5) pset(x, y, cs); if ((x + (y % 6 ? 0 : 3)) % 6 === 0) pset(x, y - 1, cs); }
    for (let x = x0 + 1; x < x1; x++) if (h(x, 0, 952) < 0.35) for (let y = top + 1; y < top + 6 + h(x, 1, 952) * 12; y++) pset(x, y, AD.hollin);
    rect(x0, top - 6, x1, top, AD.pizarraS); for (let y = top - 5; y < top; y++) for (let x = x0 + 1; x < x1; x++) pset(x, y, (x + y) % 3 === 0 ? AD.pizarraL : AD.pizarra);
    rect(x0, top, x1, top, AD.piedraL);
    for (const cx of [x0 + 4, x1 - 6]) { rect(cx, top - 12, cx + 4, top - 5, AD.k); rect(cx + 1, top - 11, cx + 3, top - 5, cs); rect(cx, top - 12, cx + 4, top - 12, cl); pset(cx + 1, top - 13, hex('#b05a3a')); pset(cx + 3, top - 13, hex('#b05a3a')); }
    rect(x0 + Math.round(w / 2) - 3, top - 8, x0 + Math.round(w / 2) + 3, top - 1, AD.k); rect(x0 + Math.round(w / 2) - 2, top - 7, x0 + Math.round(w / 2) + 2, top - 1, cl); pset(x0 + Math.round(w / 2), top - 5, AD.k);
    for (let fila = 0; fila < 4; fila++) for (let x = x0 + 3; x < x1 - 3; x += 6) { const y = top + 4 + fila * 7, luz = h(x, fila, 953) < 0.22;
      rect(x - 1, y - 1, x + 3, y + 4, cl); rect(x, y, x + 2, y + 3, luz ? AD.luz : AD.aguaD); pset(x + 1, y, luz ? AD.luzL : AD.agua); pset(x, y + 2, luz ? AD.ambar : AD.k); rect(x - 1, y + 4, x + 3, y + 4, AD.piedraL); }
    const tc = [AD.rojoC, AD.tienda, AD.azulC, hex('#7a3a5a')][k]; rect(x0 + 2, 102, x1 - 2, 110, AD.k); rect(x0 + 3, 103, x1 - 3, 104, tc); rect(x0 + 3, 105, x1 - 3, 109, AD.luz); for (let x = x0 + 5; x < x1 - 3; x += 5) rect(x, 105, x, 109, tc); });
  // el muelle de piedra con los bolardos y las argollas
  rect(0, 110, 200, 112, AD.piedraL); rect(0, 113, 200, 120, AD.piedraS); for (let y = 114; y < 120; y += 3) for (let x = (y % 6 ? 0 : 5); x < 200; x += 10) pset(x, y, AD.piedraD);
  for (let x = 0; x < 200; x++) if (h(x, 3, 954) < 0.3) pset(x, 119, AD.verdin); rect(200, 110, 201, 120, AD.piedraD);
  for (const bx of [24, 70, 120, 178]) { rect(bx, 107, bx + 2, 110, AD.k); pset(bx + 1, 107, AD.grisL); }
  // el paseo: la barandilla de hierro, el pretil de piedra, las losas mojadas con sus charcos y la calzada
  for (let x = 0; x < 320; x++) { pset(x, 127, AD.k); pset(x, 131, AD.farola); }
  for (let x = 2; x < 320; x += 7) { rect(x, 126, x, 136, AD.k); pset(x, 125, AD.farolaL); }
  for (let y = 136; y < 143; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y === 136 ? AD.piedraL : y === 137 ? AD.piedra : ((x + (y > 139 ? 6 : 0)) % 12 === 0 || y === 140) ? AD.piedraD : h(x, y, 955) < 0.2 ? AD.piedraS : AD.piedra;
  for (let y = 143; y < 165; y++) { const fila = Math.floor((y - 143) / 7); for (let x = 0; x < 320; x++) { const j = (y - 143) % 7 === 0 || (x + fila * 13) % 26 === 0; let c = j ? AD.losaS : h(x >> 1, y, 956) < 0.15 ? AD.losaL : h(x, y, 957) < 0.06 ? AD.losaD : AD.losa;
      if (!j && (x + y * 3) % 31 < 2 && y > 150) c = AD.losaL; B[y * 320 + x] = c; } }
  for (const [px, py, rx] of [[66, 160, 13], [206, 150, 9], [300, 158, 8]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / 2.4) ** 2; if (e < 1) pset(px + i, py + j, e > 0.7 ? AD.losaD : j < 0 ? AD.cielo2 : AD.cielo1); }
  rect(0, 165, 319, 165, AD.grisL); rect(0, 166, 319, 166, AD.grisS);
  for (let y = 167; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 958); B[y * 320 + x] = q < 0.06 ? AD.asfaltoS : q > 0.95 ? AD.asfaltoL : (x * 3 + y * 7) % 41 === 0 ? AD.cielo0 : AD.asfalto; }
  rect(0, 168, 319, 168, AD.amarilla); rect(0, 170, 319, 170, AD.amarilla);
  for (let x = 0; x < 320; x += 30) rect(x, 177, x + 14, 177, AD.grisL);
  // el banco de listones contra la barandilla
  rect(96, 137, 122, 138, AD.k); rect(96, 136, 122, 136, AD.hayaD); rect(96, 133, 122, 134, AD.hayaS); rect(96, 133, 122, 133, AD.haya); rect(96, 139, 122, 140, AD.haya); rect(96, 141, 122, 141, AD.hayaS);
  for (const lx of [98, 119]) { rect(lx, 135, lx + 1, 147, AD.k); rect(lx - 1, 146, lx + 2, 147, AD.k); }
  // las farolas victorianas (verdes, con dos faroles)
  for (const fx of [34, 186]) { rect(fx - 2, 140, fx + 2, 147, AD.k); rect(fx - 1, 141, fx + 1, 147, AD.farola); rect(fx - 1, 100, fx + 1, 140, AD.k); rect(fx, 100, fx, 140, AD.farolaL); rect(fx - 6, 101, fx + 6, 101, AD.k);
    for (const lx of [fx - 6, fx + 6]) { rect(lx - 2, 95, lx + 2, 101, AD.k); rect(lx - 1, 96, lx + 1, 100, nuevo ? AD.luzB : AD.luz); pset(lx, 97, AD.luzL); rect(lx - 1, 94, lx + 1, 94, AD.k); }
    rect(fx - 1, 92, fx + 1, 99, AD.k); pset(fx, 91, AD.oro); }
  // el buzón rojo (sin letras: solo la ranura y la placa)
  rect(146, 133, 154, 150, AD.k); rect(147, 135, 153, 150, AD.rojoB); rect(152, 135, 153, 150, AD.rojoBS); rect(147, 135, 148, 150, AD.rojoBL); rect(145, 132, 155, 134, AD.k); rect(146, 132, 154, 133, AD.rojoBS);
  rect(148, 138, 152, 138, AD.k); rect(148, 142, 152, 145, AD.papelS); rect(146, 149, 154, 150, AD.rojoBS);
  // la columna de los bichitos de bronce (hoy) o, en 1990, la cabina roja de teléfono
  if (est) a_columnaBichitos(R, 253, 146);
  else if (!nuevo) { const x0 = 245, y0 = 112; rect(x0, y0, x0 + 16, 148, AD.k); rect(x0 + 1, y0 + 3, x0 + 15, 147, AD.rojoB); rect(x0 + 13, y0 + 3, x0 + 15, 147, AD.rojoBS); poligono([[x0, y0 + 3], [x0 + 8, y0 - 1], [x0 + 16, y0 + 3]], AD.rojoBS); rect(x0 + 2, y0 + 4, x0 + 14, y0 + 6, AD.k);
    for (let j = 0; j < 6; j++) for (let i = 0; i < 3; i++) { rect(x0 + 3 + i * 4, y0 + 9 + j * 5, x0 + 5 + i * 4, y0 + 12 + j * 5, AD.cielo2); pset(x0 + 3 + i * 4, y0 + 9 + j * 5, AD.blanco); } rect(x0 + 1, 146, x0 + 15, 147, AD.rojoBS); }
  else { for (const bx of [250, 260]) { linea(bx - 3, 148, bx - 3, 142, AD.grisS); linea(bx + 3, 148, bx + 3, 142, AD.grisS); for (let a = 0; a < 7; a++) pset(Math.round(bx + Math.cos(a * 0.52 + 3.14) * 3), Math.round(142 + Math.sin(a * 0.52 + 3.14) * 3), AD.grisL); } }
  // la papelera junto a la farola
  rect(176, 140, 182, 150, AD.k); rect(177, 141, 181, 150, AD.farola); rect(177, 141, 181, 141, AD.farolaL); pset(179, 139, AD.papel);
}

// la columna de piedra en el parque con siete bichitos de bronce trepando (nuestra criatura: redonda, con la mata de pelo
// de tres puntas), sobre su basa; x = eje de la columna, suelo = pie de la basa
function a_columnaBichitos(R, x, suelo) {
  const { rect, pset } = R, top = 78;
  rect(x - 12, suelo - 8, x + 12, suelo, AD.k); rect(x - 11, suelo - 7, x + 11, suelo, AD.piedra); rect(x - 11, suelo - 7, x + 11, suelo - 6, AD.piedraL); rect(x + 7, suelo - 5, x + 11, suelo, AD.piedraS);
  rect(x - 7, top, x + 7, suelo - 8, AD.k); rect(x - 6, top + 1, x + 6, suelo - 8, AD.piedra); rect(x - 6, top + 1, x - 4, suelo - 8, AD.piedraL); rect(x + 3, top + 1, x + 6, suelo - 8, AD.piedraS); rect(x + 5, top + 1, x + 6, suelo - 8, AD.piedraD);
  for (let y = top + 8; y < suelo - 8; y += 9) { rect(x - 6, y, x + 6, y, AD.piedraD); pset(x - 5, y + 1, AD.piedraL); }
  rect(x - 9, top - 3, x + 9, top, AD.k); rect(x - 8, top - 2, x + 8, top - 1, AD.piedraL);
  for (const [dx, y, d, sube] of [[-8, 132, 1, 1], [7, 122, -1, 1], [-8, 110, 1, 0], [7, 100, -1, 1], [-7, 90, 1, 1], [0, 74, 1, 2], [12, 136, -1, 0]]) a_bichoBronce(R, x + dx, y, d, sube);
}

// un bichito de bronce (8 × 11) agarrado a la columna: d = hacia dónde mira; sube = 1, los brazos arriba; 2, de pie y saludando
function a_bichoBronce(R, x, y, d, sube) {
  const { rect, pset } = R;
  rect(x - 3, y - 6, x + 3, y, AD.k); rect(x - 2, y - 5, x + 2, y - 1, AD.bronce); pset(x - 1 * d, y - 4, AD.bronceL); pset(x - 2 * d, y - 3, AD.bronceL); pset(x + 2 * d, y - 2, AD.bronceS);
  rect(x - 2, y - 9, x + 2, y - 7, AD.k); rect(x - 1, y - 9, x + 1, y - 7, AD.bronce); pset(x + d, y - 8, AD.k); pset(x - d, y - 9, AD.bronceL);
  for (const [i, j] of [[-2, -11], [0, -12], [2, -11]]) { pset(x + i, y + j, AD.verdin); pset(x + i, y + j + 1, AD.bronceS); }
  if (sube === 1) { rect(x + 2 * d, y - 10, x + 2 * d, y - 5, AD.bronceS); rect(x - 2 * d, y - 9, x - 2 * d, y - 6, AD.bronceS); }
  else if (sube === 2) { rect(x + 3 * d, y - 9, x + 3 * d, y - 5, AD.bronceS); pset(x + 4 * d, y - 10, AD.bronceL); }
  pset(x - 1, y + 1, AD.bronceS); pset(x + 1, y + 1, AD.bronceS);
}

// la grúa de puerto de celosía (x = torre, suelo = muelle) con la pluma a la izquierda y el gancho que sube y baja una caja
function a_grua(R, t, x, suelo) {
  const { rect, pset, linea } = R, top = 50;
  for (let y = top; y < suelo; y++) { pset(x, y, AD.k); pset(x + 4, y, AD.k); if ((y - top) % 6 < 3) pset(x + 1 + (y - top) % 6, y, AD.ambar); else pset(x + 3 - ((y - top) % 6 - 3), y, AD.ambar); }
  rect(x - 2, suelo - 3, x + 6, suelo, AD.k); rect(x - 1, top - 5, x + 6, top, AD.k); rect(x, top - 4, x + 5, top - 1, AD.ambar); pset(x + 4, top - 3, AD.cielo3);
  linea(x - 38, top - 2, x + 12, top - 2, AD.k); linea(x - 38, top - 1, x + 12, top - 1, AD.ambar); for (let i = x - 36; i < x; i += 4) pset(i, top - 3, AD.k);
  rect(x + 9, top - 4, x + 13, top + 2, AD.grisS); linea(x + 2, top - 10, x - 38, top - 2, AD.k); linea(x + 2, top - 10, x + 12, top - 2, AD.k); pset(x + 2, top - 11, AD.rojoB);
  const u = (Math.sin(t * 0.5) + 1) / 2, hy = Math.round(top + 12 + u * 30), hx = x - 30 + Math.round(Math.sin(t * 0.8) * 1);
  linea(x - 30, top, hx, hy, AD.grisD); rect(hx - 1, hy, hx + 1, hy + 1, AD.k); rect(hx - 5, hy + 2, hx + 5, hy + 8, AD.k); rect(hx - 4, hy + 3, hx + 4, hy + 7, hex('#3a6a9a')); rect(hx - 4, hy + 3, hx + 4, hy + 3, hex('#5a8aba')); for (let i = hx - 3; i < hx + 4; i += 2) rect(i, hy + 4, i, hy + 7, hex('#2a4a7a'));
}

// el velero antiguo de tres palos (casco negro con la franja ocre, vergas, jarcias y banderola al viento): x = proa a la
// izquierda, y = línea de flotación
function a_velero(R, t, x, y) {
  const { rect, pset, linea, poligono } = R;
  poligono([[x - 34, y - 12], [x + 30, y - 12], [x + 26, y], [x - 30, y]], AD.k); rect(x - 32, y - 11, x + 28, y - 9, hex('#c89a4a')); rect(x - 31, y - 8, x + 27, y - 1, hex('#2a2a30')); for (let i = x - 28; i < x + 26; i += 6) pset(i, y - 10, AD.k);
  rect(x - 26, y - 14, x + 24, y - 12, hex('#6a4a2a')); linea(x - 34, y - 12, x - 48, y - 22, AD.k);
  for (const [mx, top] of [[x - 18, y - 62], [x + 2, y - 66], [x + 20, y - 54]]) { rect(mx, top, mx + 1, y - 13, hex('#4a3020')); pset(mx, top, AD.k);
    for (const [dy, w] of [[8, 9], [18, 11], [28, 12]]) if (top + dy < y - 16) rect(mx - w, top + dy, mx + w + 1, top + dy, hex('#3a2818')); linea(mx, top, x - 34, y - 13, AD.grisD); linea(mx + 1, top, x + 28, y - 13, AD.grisD); }
  for (let i = 0; i < 9; i++) { const f = Math.round(Math.sin(t * 6 - i * 0.7) * (i / 4)); pset(x + 3 + i, y - 66 + f, i < 5 ? AD.rojoB : AD.blanco); pset(x + 3 + i, y - 65 + f, i < 4 ? AD.rojoB : AD.blanco); }
  for (let j = 0; j < 4; j++) for (let i = x - 28; i < x + 26; i += 3) pset(i + (j % 2), y + 1 + j * 2, AD.aguaD);
}

function a_calleDun(R, t, o = {}) {
  const { rect, pset, linea, disco } = R, ll = o.lluvia ?? 0.5, nuevo = (o.año ?? 1990) >= 2000;
  // el cielo solo asoma a la derecha, sobre el pub
  a_cieloDun(R, t, 60, { lluvia: ll, x0: 240, x1: 319 });
  a_gaviotas(R, t, 2, 46, 56, 4, [242, 0, 319, 58]);
  a_pegar(R, a_capaDun(R, 'calle|' + (nuevo ? 1 : 0), () => a_calleFija(R, nuevo)));
  // dentro de la tienda: el dependiente que va y viene tras el mostrador y el vapor de la freidora
  R.recorte([30, 120, 116, 146]);
  { const u = (Math.sin(t * 0.7) + 1) / 2, dx = Math.round(48 + u * 40); a_rectR(R, [30, 120, 116, 146], dx - 3, 128, dx + 3, 136, AD.blanco); a_rectR(R, [30, 120, 116, 146], dx - 2, 122, dx + 2, 127, hex('#e8b898')); a_rectR(R, [30, 120, 116, 146], dx - 3, 120, dx + 3, 121, AD.blanco); pset(dx - 1 + (u > 0.5 ? 1 : 0), 124, AD.k); a_rectR(R, [30, 120, 116, 146], dx - 3, 130, dx + 3, 130, AD.azulC); }
  for (let i = 0; i < 6; i++) { const u = (t * 0.6 + i / 6) % 1, sx = Math.round(98 + Math.sin(t * 1.5 + i) * 2 + u * 4), sy = Math.round(132 - u * 14); disco(sx, sy, u > 0.5 ? 2 : 1, u > 0.7 ? AD.azulejoS : AD.blanco); }
  R.recorte(null);
  // el mostrador de cristal (delante del dependiente)
  rect(32, 136, 114, 146, AD.k); rect(33, 137, 113, 140, hex('#d8e8ee')); for (let i = 0; i < 9; i++) { rect(36 + i * 8, 138, 41 + i * 8, 140, AD.pescado); pset(37 + i * 8, 138, AD.oroL); rect(36 + i * 8, 140, 41 + i * 8, 140, AD.pescadoS); }
  rect(33, 141, 113, 146, AD.acero); rect(33, 141, 113, 141, AD.blanco); rect(33, 145, 113, 146, AD.aceroS); rect(86, 132, 112, 136, AD.aceroS); rect(87, 132, 111, 133, AD.acero);
  // el pez de neón del escaparate, que parpadea (y a veces se le apaga la cola)
  { const on = Math.sin(t * 9) > -0.85, cola = Math.floor(t * 1.3) % 5 !== 0, c = on ? AD.neonA : hex('#3a6a74'), cc = on && cola ? AD.neonR : hex('#6a3a54');
    for (let a = 0; a < 6.28; a += 0.18) pset(Math.round(68 + Math.cos(a) * 9), Math.round(126 + Math.sin(a) * 4), c); linea(77, 126, 83, 121, cc); linea(77, 126, 83, 131, cc); linea(83, 121, 83, 131, cc); pset(63, 125, on ? AD.blanco : c); linea(66, 123, 70, 129, c);
    if (on) a_halo(R, 70, 126, 18, 9, AD.neonA, 0.18, [30, 118, 116, 146]); }
  // la ventana de la oficina de arriba: las pantallas parpadean, alguien pasa por dentro y el flexo
  for (const cl of [[65, 70, 96, 90], [103, 70, 134, 90]]) { R.recorte(cl);
    { const u = (t % 9) / 9; if (u > 0.2 && u < 0.8) { const px = Math.round(60 + (u - 0.2) / 0.6 * 84); a_rectR(R, cl, px - 3, 76, px + 3, 90, hex('#3a3a50')); disco(px, 73, 3, hex('#2e2e40')); } }
    for (const [mx, k] of [[80, 0], [118, 1]]) { const c = Math.sin(t * 7 + k * 2) > 0.6 ? hex('#c8ecff') : AD.pantalla; a_halo(R, mx, 84, 12, 6, c, 0.45, cl); } }
  R.recorte(null); for (const x0 of [64, 102]) rect(x0, 77, x0 + 33, 77, AD.blanco);
  // el canalón y la luz de la farola
  a_halo(R, 238, 92, 10, 6, nuevo ? AD.luzB : AD.luz, 0.3);
  // el reflejo del escaparate en la acera mojada, que tiembla
  for (let y = 154; y < 170; y++) for (let x = 30; x < 160; x += 1) { if ((x + y + Math.floor(t * 6)) % 5 !== 0 || h(x, y, 961) < 0.5) continue; const q = 1 - (y - 154) / 16; if (q > a_um(x, y) * 0.9) pset(x + Math.round(Math.sin(t * 3 + y) * 1), y, a_mez(AD.losa, AD.luz, 0.5 * q)); }
  return { suelo: 164, tienda: { escaparate: [28, 118, 118, 148], puerta: [124, 116, 152, 156], rotulo: [22, 102, 160, 116], pez: [91, 109] }, portal: [170, 112, 194, 156], ventanaOficina: [[64, 62, 98, 92], [102, 62, 136, 92]], farola: [238, 164], pub: [252, 60, 320, 156], libre: [[0, 232], [246, 320]], calzada: [170, 180] };
}

// lo fijo de la calle: la fachada de arenisca, la tienda, el portal, el pub, la acera y la calzada
function a_calleFija(R, nuevo) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // la fachada: sillares de arenisca de 12 × 5 con sus juntas, tono que varía, hollín que chorrea de las cornisas
  for (let y = 0; y < 156; y++) { const fila = Math.floor(y / 5); for (let x = 0; x < 246; x++) { const j = y % 5 === 4 || (x + (fila % 2) * 6) % 12 === 11; const q = h((x + (fila % 2) * 6) / 12 | 0, fila, 962);
      let c = j ? AD.areniscaS : q < 0.25 ? AD.areniscaL : q > 0.85 ? AD.hollin : AD.arenisca; if (!j && h(x, y, 963) < 0.07) c = AD.areniscaS; B[y * 320 + x] = c; } }
  for (const [y0, y1] of [[0, 3], [57, 60], [98, 102]]) for (let x = 0; x < 246; x++) { rect(x, y0, x, y1, AD.areniscaL); pset(x, y1 + 1, AD.areniscaD); if (x % 4 === 0) pset(x, y0, AD.areniscaS); if (h(x, y1, 964) < 0.4) for (let y = y1 + 2; y < y1 + 3 + h(x, 1, 964) * 10; y++) if (B[y * 320 + x] !== AD.areniscaS) pset(x, y, AD.hollin); }
  rect(244, 0, 247, 156, AD.areniscaD); rect(244, 0, 244, 156, AD.areniscaL);
  // las ventanas de guillotina: marco claro, dos hojas, cortinas, reflejo del cielo; un gato, una planta
  const ventana = (x0, y0, w, al, tipo) => { rect(x0 - 2, y0 - 3, x0 + w + 1, y0 - 1, AD.areniscaL); rect(x0 - 1, y0, x0 + w, y0 + al, AD.blanco); rect(x0, y0 + 1, x0 + w - 1, y0 + al - 1, AD.k);
    for (let y = y0 + 1; y < y0 + al; y++) for (let x = x0 + 1; x < x0 + w - 1; x++) { const p = (y - y0) / al; B[y * 320 + x] = p < 0.3 ? AD.cielo2 : (x - x0 + y) % 9 < 2 ? AD.cielo3 : p < 0.6 ? AD.aguaS : AD.aguaD; }
    rect(x0, y0 + Math.round(al / 2), x0 + w - 1, y0 + Math.round(al / 2), AD.blanco); rect(x0 + Math.round(w / 2), y0 + 1, x0 + Math.round(w / 2), y0 + al - 1, AD.blanco);
    if (tipo !== 'oficina') { const cc = tipo === 'gato' ? hex('#c87a8a') : hex('#c8b070'); rect(x0 + 1, y0 + 1, x0 + 3, y0 + al - 2, cc); rect(x0 + w - 4, y0 + 1, x0 + w - 2, y0 + al - 2, cc); pset(x0 + 3, y0 + Math.round(al / 2) + 2, AD.k); }
    rect(x0 - 2, y0 + al + 1, x0 + w + 1, y0 + al + 2, AD.areniscaL); rect(x0 - 2, y0 + al + 3, x0 + w + 1, y0 + al + 3, AD.areniscaD);
    if (tipo === 'planta') { for (const [i, j, r] of [[w / 2 - 2, -4, 3], [w / 2 + 2, -5, 3], [w / 2, -7, 3]]) disco(Math.round(x0 + i), Math.round(y0 + al + j), r, AD.leyS); rect(x0 + w / 2 - 3, y0 + al - 3, x0 + w / 2 + 3, y0 + al, hex('#b0603a')); }
    if (tipo === 'gato') { const cx = x0 + Math.round(w / 2) + 3, cy = y0 + al; rect(cx - 3, cy - 6, cx + 3, cy, hex('#3a3a40')); rect(cx - 2, cy - 9, cx + 2, cy - 6, hex('#3a3a40')); pset(cx - 2, cy - 10, hex('#3a3a40')); pset(cx + 2, cy - 10, hex('#3a3a40')); pset(cx - 1, cy - 8, AD.amarilla); pset(cx + 1, cy - 8, AD.amarilla); } };
  for (const [x, tipo] of [[18, 'cortina'], [66, 'gato'], [114, 'cortina'], [168, 'planta'], [208, 'cortina']]) ventana(x, 24, 24, 26, tipo);
  // la planta de la oficina: dos ventanas juntas con luz cálida, persianas a medio bajar, un póster, monitores y flexo
  for (const x0 of [64, 102]) { rect(x0 - 2, 59, x0 + 35, 61, AD.areniscaL); rect(x0 - 1, 62, x0 + 34, 92, AD.blanco); rect(x0, 63, x0 + 33, 91, AD.k);
    for (let y = 64; y < 91; y++) for (let x = x0 + 1; x < x0 + 33; x++) B[y * 320 + x] = y < 70 ? (y % 2 ? AD.grisL : AD.alu) : (y - 64 + x) % 17 === 0 ? AD.luzL : y < 78 ? hex('#f0d090') : hex('#e2b870');
    rect(x0, 77, x0 + 33, 77, AD.blanco); rect(x0 - 2, 93, x0 + 35, 94, AD.areniscaL); rect(x0 - 2, 95, x0 + 35, 95, AD.areniscaD); }
  rect(70, 72, 80, 82, hex('#2a3a6a')); rect(71, 73, 79, 76, hex('#e05a3a')); rect(71, 77, 79, 81, hex('#1a1a2a')); disco(75, 75, 1, AD.oroL);
  for (const mx of [80, 118]) { rect(mx - 7, 80, mx + 7, 90, hex('#d8ccb0')); rect(mx - 6, 81, mx + 6, 88, AD.k); rect(mx - 5, 82, mx + 5, 87, AD.pantalla); rect(mx - 5, 82, mx - 2, 83, AD.blanco); rect(mx - 7, 90, mx + 7, 90, hex('#a89c80')); }
  linea(126, 80, 130, 74, AD.k); linea(130, 74, 134, 78, AD.k); rect(124, 80, 128, 82, AD.k); pset(126, 81, AD.luzL);
  for (const x0 of [16, 160, 206]) { rect(x0 - 2, 59, x0 + 29, 61, AD.areniscaL); ventana(x0, 64, 28, 28, x0 === 160 ? 'planta' : 'cortina'); }
  // la tienda de pescado frito: pilastras, el rótulo verde con el pez dorado (sin letras) y sus remates
  rect(20, 102, 160, 117, AD.k); rect(22, 104, 158, 115, AD.tienda); rect(22, 104, 158, 104, AD.tiendaL); rect(22, 115, 158, 115, AD.tiendaS); rect(24, 106, 156, 106, AD.oroS); rect(24, 113, 156, 113, AD.oroS);
  { const fx = 90, fy = 110; for (let j = -3; j <= 3; j++) for (let i = -9; i <= 9; i++) if ((i / 9.5) ** 2 + (j / 3.6) ** 2 < 1) pset(fx + i, fy + j, j < 0 ? AD.oroL : j > 1 ? AD.oroS : AD.oro);
    poligono([[fx + 8, fy], [fx + 14, fy - 4], [fx + 14, fy + 4]], AD.oro); pset(fx - 6, fy - 1, AD.k); pset(fx - 9, fy + 1, AD.oroS); for (let i = -3; i < 7; i += 3) pset(fx + i, fy + 1, AD.oroS); linea(fx - 2, fy - 3, fx + 2, fy - 5, AD.oro); }
  for (const dx of [-1, 1]) for (let i = 0; i < 4; i++) { disco(90 + dx * (30 + i * 10), 110, 1, AD.oro); pset(90 + dx * (30 + i * 10), 109, AD.oroL); }
  for (const px of [20, 154]) { rect(px, 102, px + 6, 156, AD.k); rect(px + 1, 103, px + 5, 156, AD.tienda); rect(px + 1, 103, px + 1, 156, AD.tiendaL); rect(px + 5, 103, px + 5, 156, AD.tiendaS); rect(px, 101, px + 6, 102, AD.oroS); }
  // el escaparate: dentro, la pared de azulejos, la carta de precios con barras y cifras, la freidora de acero
  rect(26, 117, 120, 148, AD.k);
  for (let y = 118; y < 147; y++) for (let x = 28; x < 118; x++) B[y * 320 + x] = (y % 5 === 0 || x % 6 === 0) ? AD.azulejoS : AD.azulejo;
  rect(30, 119, 54, 129, AD.k); rect(31, 120, 53, 128, AD.tiendaS); for (let j = 0; j < 3; j++) { rect(33, 121 + j * 3, 43, 121 + j * 3, AD.blanco); rect(47, 121 + j * 3, 51, 121 + j * 3, AD.oro); }
  rect(86, 124, 112, 132, AD.aceroS); rect(87, 125, 111, 131, AD.acero); rect(88, 126, 98, 130, AD.k); rect(100, 126, 110, 130, AD.k); rect(89, 127, 97, 127, hex('#d8a040')); rect(101, 127, 109, 127, hex('#d8a040'));
  rect(26, 147, 120, 148, AD.tiendaS); rect(28, 118, 117, 118, AD.blanco);
  // la puerta de la tienda (cristal arriba, tirador) y el portal verde de la escalera, con su número
  rect(122, 116, 152, 156, AD.k); rect(124, 118, 150, 155, AD.tienda); rect(126, 120, 148, 140, hex('#e8d8a8')); for (let y = 121; y < 140; y += 4) rect(127, y, 147, y, hex('#f4e8c0')); rect(137, 120, 137, 140, AD.tienda);
  rect(126, 143, 148, 153, AD.tiendaS); rect(144, 136, 146, 146, AD.oro); rect(122, 155, 152, 156, AD.piedraL);
  rect(168, 108, 196, 156, AD.areniscaD); rect(170, 110, 194, 156, AD.k); rect(171, 111, 193, 120, hex('#3a4a5a')); for (let i = 0; i < 5; i++) linea(182, 120, 172 + i * 5, 111, AD.areniscaL);
  rect(172, 122, 192, 155, AD.puerta); for (const [a, b, c, d] of [[174, 124, 181, 138], [183, 124, 190, 138], [174, 141, 181, 153], [183, 141, 190, 153]]) { rect(a, b, c, d, AD.puertaS); rect(a + 1, b + 1, c, d, AD.puerta); rect(a, b, c, b, AD.puertaL); }
  pset(189, 140, AD.oro); rect(180, 139, 184, 140, AD.oroS); a_digito(R, '7', 181, 104, AD.oro);
  rect(168, 155, 196, 156, AD.piedraL);
  // el portal de al lado: una pared con un tubo de bajada, un cartel de barras y un timbre
  rect(214, 104, 236, 128, AD.k); rect(215, 105, 235, 127, AD.papel); rect(217, 107, 233, 112, AD.rojoC); for (let j = 0; j < 4; j++) rect(217, 115 + j * 3, 217 + 10 + (j % 2) * 6, 115 + j * 3, AD.grisS); rect(228, 120, 233, 125, AD.azulC);
  // el pub de la derecha: más bajo, encalado (harled) con su tejado de pizarra, chimenea, ventana esmerilada con luz y
  // un cesto de flores
  for (let y = 60; y < 156; y++) for (let x = 248; x < 320; x++) { const q = h(x, y, 965); B[y * 320 + x] = q < 0.2 ? AD.piedraL : q > 0.85 ? AD.piedraS : y < 64 ? AD.piedraS : AD.yeso; }
  for (let y = 50; y < 60; y++) for (let x = 248; x < 320; x++) B[y * 320 + x] = (x + y) % 3 === 0 ? AD.pizarraL : y === 59 ? AD.pizarraS : AD.pizarra;
  rect(296, 44, 304, 50, AD.k); rect(297, 45, 303, 50, AD.piedraS); pset(298, 44, hex('#b05a3a')); pset(302, 44, hex('#b05a3a'));
  rect(246, 60, 320, 61, AD.grisD);
  rect(262, 74, 310, 112, AD.k); rect(264, 76, 308, 110, hex('#e8c888')); for (let y = 77; y < 110; y++) for (let x = 265; x < 308; x++) if ((x + y) % 4 === 0) pset(x, y, hex('#d8b070')); rect(285, 76, 286, 110, AD.nogal); rect(264, 92, 308, 93, AD.nogal);
  rect(262, 112, 310, 114, AD.nogal); rect(260, 66, 312, 72, AD.k); rect(261, 67, 311, 71, AD.nogalS); rect(262, 68, 310, 68, AD.nogalL);
  rect(268, 120, 300, 156, AD.k); rect(270, 122, 298, 156, AD.nogal); rect(271, 124, 283, 138, AD.nogalS); rect(285, 124, 297, 138, AD.nogalS); rect(271, 141, 283, 154, AD.nogalS); rect(285, 141, 297, 154, AD.nogalS); pset(282, 140, AD.oro);
  { const cx = 254, cy = 82; linea(cx, 74, cx, cy - 3, AD.k); for (const [i, j, c] of [[-3, 0, AD.leyS], [3, 0, AD.leyS], [0, 1, AD.ley], [-2, -1, AD.rojoC], [2, 1, hex('#e070a0')], [0, -2, AD.amarilla], [-4, 2, AD.blanco]]) disco(cx + i, cy + j, 2, c); rect(cx - 5, cy + 2, cx + 5, cy + 5, AD.nogalS); }
  // el canalón de la fachada
  rect(156, 20, 162, 24, AD.k); rect(157, 21, 161, 23, AD.grisS); rect(158, 24, 160, 98, AD.grisD); rect(158, 24, 158, 98, AD.grisS); for (let y = 32; y < 98; y += 22) rect(157, y, 161, y + 1, AD.k);
  rect(240, 0, 242, 152, AD.grisD); rect(240, 0, 240, 152, AD.grisS); rect(238, 152, 244, 155, AD.grisD);
  // la farola de la acera
  rect(236, 94, 240, 160, AD.k); rect(237, 94, 238, 160, nuevo ? AD.grisS : AD.farola); rect(235, 158, 241, 162, AD.k); rect(232, 84, 244, 94, AD.k); rect(233, 86, 243, 92, nuevo ? AD.luzB : AD.luz); rect(234, 87, 236, 88, AD.luzL); rect(231, 83, 245, 84, AD.k); pset(238, 82, AD.oro);
  // la acera de losas mojadas, el bordillo y la calzada
  for (let y = 156; y < 171; y++) { const fila = Math.floor((y - 156) / 6); for (let x = 0; x < 320; x++) { const j = (y - 156) % 6 === 5 || (x + fila * 11) % 22 === 0; B[y * 320 + x] = j ? AD.losaS : h(x >> 1, y, 966) < 0.14 ? AD.losaL : (x + y * 2) % 29 < 2 ? AD.cielo1 : AD.losa; } }
  for (const [px, py, rx] of [[204, 165, 12], [300, 160, 7]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / 2.2) ** 2; if (e < 1) pset(px + i, py + j, e > 0.7 ? AD.losaD : j < 0 ? AD.cielo2 : AD.cielo1); }
  rect(0, 171, 319, 171, AD.grisL); rect(0, 172, 319, 172, AD.grisS);
  for (let y = 173; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 967); B[y * 320 + x] = q < 0.08 ? AD.asfaltoS : q > 0.94 ? AD.asfaltoL : AD.asfalto; }
  rect(0, 174, 319, 174, AD.amarilla); rect(0, 176, 319, 176, AD.amarilla);
  // la papelera y un bolardo
  rect(4, 148, 12, 164, AD.k); rect(5, 149, 11, 164, AD.farola); rect(5, 149, 11, 150, AD.farolaL); for (let y = 152; y < 164; y += 3) rect(5, y, 11, y, AD.k); pset(7, 147, AD.papel); pset(9, 146, AD.rojoC);
  rect(162, 156, 165, 166, AD.k); rect(163, 157, 164, 166, AD.grisS); pset(163, 157, AD.grisL);
}

// el agua que chorrea del canalón de la calle y salpica en la acera (delante de los personajes)
function a_canalon(R, t, ll) {
  if (ll < 0.1) return; const { pset } = R;
  for (let k = 0; k < 5; k++) { const y = 152 + ((t * 60 + k * 3) % 12); pset(241 + (k % 2), Math.round(y), AD.cielo3); }
  for (let k = 0; k < 3; k++) { const u = (t * 3 + k / 3) % 1; pset(Math.round(241 - u * 4 - k), Math.round(164 - Math.sin(u * 3.14) * 3), AD.cielo3); pset(Math.round(242 + u * 4 + k), Math.round(164 - Math.sin(u * 3.14) * 3), AD.cielo3); }
}

// la lluvia que cae en diagonal por delante de todo, con gotas gordas y salpicaduras en el suelo (desde suelo - 6)
function a_lluvia(R, t, ll, suelo) {
  if (ll <= 0.02) return; const { pset } = R, n = Math.round(150 * ll), c1 = AD.cielo3, c2 = AD.nubeL;
  for (let k = 0; k < n; k++) { const v = 200 + h(k, 0, 971) * 80, y = ((h(k, 1, 971) * 200 + t * v) % 200) - 10, x = ((h(k, 2, 971) * 340 + t * v * 0.25) % 340) - 10, L = 3 + (k % 3);
    for (let i = 0; i < L; i++) { const xx = Math.round(x + i * 0.25), yy = Math.round(y + i); if (xx > 276 && yy < 46) continue; if (yy >= 0 && yy < 180 && xx >= 0 && xx < 320) pset(xx, yy, k % 4 === 0 ? c2 : c1); } }
  for (let k = 0; k < Math.round(20 * ll); k++) { const f = Math.floor(t * 8 + h(k, 3, 971) * 8), x = Math.round(h(k, f, 972) * 320), y = Math.round(suelo - 4 + h(k, f, 973) * (180 - suelo + 4)), u = (t * 8 + h(k, 3, 971) * 8) % 1;
    if (u < 0.5) { pset(x, y, c2); pset(x - 1, y - 1, c1); pset(x + 1, y - 1, c1); } else { pset(x - 2, y, c1); pset(x + 2, y, c1); } }
}

// los coches que pasan por la calzada (de la época), cada uno en su carril y a su velocidad, con el reflejo en el asfalto
// mojado; suelo = donde apoyan las ruedas; f: cuántos (0–1)
function a_trafico(R, t, suelo, año, f = 1) {
  const cols = año >= 2000 ? [hex('#2a3a5a'), hex('#c8ccd2'), hex('#8a1e2a'), hex('#3a3a40')] : [hex('#a83a2a'), hex('#e0d8b0'), hex('#3a5a8a'), hex('#5a7a4a')];
  for (let k = 0; k < 3; k++) { if (k / 3 >= f) continue; const v = 60 + k * 18, d = k % 2 ? -1 : 1, per = 420 + k * 120, u = (t * v + k * 170) % per, x = d > 0 ? u - 50 : 370 - u; if (x < -40 || x > 360) continue;
    a_coche(R, Math.round(x), suelo - (k % 2 ? 0 : 2), d, cols[k % 4], año); }
}

// un coche de lado (44 × 16): 1990, de líneas rectas con faros cuadrados; 2026, redondeado y con luces de tira
function a_coche(R, x, suelo, d, c, año) {
  const { rect, pset, disco, poligono } = R, cs = a_mez(c, AD.k, 0.35), cl = a_mez(c, AD.blanco, 0.35), nuevo = año >= 2000;
  for (let j = 0; j < 3; j++) rect(x - 20, suelo + 1 + j, x + 20, suelo + 1 + j, a_mez(c, AD.asfalto, 0.6 + j * 0.12));
  rect(x - 22, suelo - 10, x + 22, suelo - 3, AD.k); rect(x - 21, suelo - 9, x + 21, suelo - 4, c); rect(x - 21, suelo - 9, x + 21, suelo - 9, cl); rect(x - 21, suelo - 5, x + 21, suelo - 4, cs);
  if (nuevo) poligono([[x - 13, suelo - 10], [x - 7, suelo - 17], [x + 8, suelo - 17], [x + 15, suelo - 10]], AD.k); else rect(x - 12, suelo - 17, x + 10, suelo - 10, AD.k);
  if (nuevo) poligono([[x - 11, suelo - 10], [x - 6, suelo - 16], [x + 7, suelo - 16], [x + 13, suelo - 10]], c); else rect(x - 11, suelo - 16, x + 9, suelo - 10, c);
  rect(x - 9, suelo - 15, x - 1, suelo - 11, AD.cielo1); rect(x + 1, suelo - 15, x + 7, suelo - 11, AD.cielo1); pset(x - 8, suelo - 15, AD.blanco); pset(x + 2, suelo - 15, AD.blanco);
  const fr = x + d * 21, tr = x - d * 21; if (nuevo) { rect(Math.min(fr, fr - d * 3), suelo - 8, Math.max(fr, fr - d * 3), suelo - 8, AD.luzB); rect(Math.min(tr, tr + d * 3), suelo - 8, Math.max(tr, tr + d * 3), suelo - 8, AD.rojoB); }
  else { rect(fr - (d > 0 ? 1 : 0), suelo - 9, fr + (d > 0 ? 0 : 1), suelo - 7, AD.luz); rect(tr - (d > 0 ? 0 : 1), suelo - 9, tr + (d > 0 ? 1 : 0), suelo - 7, AD.rojoB); rect(x - 22, suelo - 4, x + 22, suelo - 4, AD.grisS); }
  for (const dx of [-13, 13]) { disco(x + dx, suelo - 2, 4, AD.k); disco(x + dx, suelo - 2, 2, nuevo ? AD.grisL : AD.gris); pset(x + dx, suelo - 2, AD.k); }
  // el reflejo de los faros en el asfalto mojado
  for (let i = 0; i < 10; i++) if ((i + Math.floor(x)) % 2 === 0) pset(fr + d * i, suelo + 2 + (i % 2), nuevo ? AD.luzB : AD.luz);
}

function a_oficina(R, t, o = {}) {
  const { rect, pset, linea, disco } = R, noche = !!o.noche, vista = o.vista === 'calle' ? 'calle' : 'poligono', ll = o.lluvia ?? 0.6, PG = PIEZAS_GT;
  a_pegar(R, a_capaDun(R, 'oficina|' + (noche ? 1 : 0) + '|' + vista, () => a_oficinaFija(R, noche, vista)));
  // la ventana: la lluvia de fuera, el paseante con paraguas (recortado al hueco) y las gotas que resbalan por el cristal
  // tres huecos de cristal: a los lados del parteluz (x 43), bajo la persiana (y 42) y por encima de la planta del alféizar
  const V = [10, 25, 76, 85], HUECOS = [[10, 42, 42, 85], [44, 42, 63, 85], [64, 42, 76, 66]];
  for (const cl of HUECOS) { R.recorte(cl);
    if (vista === 'calle') { a_paseantes(R, t, 3, 8, 78, 65, Math.max(ll, 0.3), 5, cl); const u = (t * 30) % 140; for (const [cx, c] of [[u - 30, hex('#a83a2a')], [100 - u * 0.7, hex('#3a5a8a')]]) { const x = Math.round(cx); a_rectR(R, cl, x - 8, 70, x + 8, 74, c); a_rectR(R, cl, x - 4, 67, x + 4, 70, c); a_rectR(R, cl, x - 3, 68, x + 3, 69, AD.cielo1); a_rectR(R, cl, x - 6, 75, x - 4, 75, AD.k); a_rectR(R, cl, x + 4, 75, x + 6, 75, AD.k); } }
    else { const u = (t % 14) / 14; a_paseantes(R, t, 1, 6, 80, 72, 1, 2, cl); if (u > 0.3 && u < 0.5) a_rectR(R, cl, 18, 74, 22, 76, AD.luzL); }
    for (let k = 0; k < 40; k++) { const y = Math.round((h(k, 1, 981) * 70 + t * 90) % 70) + 22, x = Math.round(h(k, 2, 981) * 72 + 8 + (y - 22) * 0.2); linea(x, y, x, y + 2, noche ? hex('#4a5a7a') : AD.cielo3); }
    for (let k = 0; k < 7; k++) { const x = 13 + Math.round(h(k, 3, 981) * 60), u = ((t * (0.1 + h(k, 4, 981) * 0.1) + h(k, 5, 981)) % 1), y = Math.round(44 + u * 40); pset(x, y, AD.blanco); pset(x, y + 1, noche ? hex('#6a7a9a') : AD.cielo2); for (let j = 2; j < 6; j++) if (y - j > 42) pset(x, y - j, noche ? hex('#3a4a6a') : a_mez(AD.cielo2, AD.blanco, 0.3)); } }
  R.recorte(null);
  // el fluorescente que parpadea
  { const on = !(t % 5 > 3.2 && t % 5 < 3.6 && Math.sin(t * 40) > 0); rect(176, 4, 216, 8, on ? (noche ? hex('#8a90a0') : AD.tubo) : AD.techoS); rect(177, 5, 215, 5, on ? AD.blanco : AD.grisL); }
  // los tres monitores del fondo: las pantallas cambian solas (ciudad, bichitos, código)
  const PANT = ['ciudad', 'bichitos', 'codigo'];
  for (const [mx, k] of [[118, 0], [170, 1], [240, 2]]) { const p = PANT[(Math.floor((t + k * 2.7) / 5) + k) % 3]; a_monitor(R, mx, 95, p, t + k, noche); }
  // el ventilador de mesa que gira y la taza con vapor; la luz de la torre
  { const fx = 206, fy = 84; disco(fx, fy, 6, AD.k); disco(fx, fy, 5, AD.grisL); for (let p = 0; p < 3; p++) { const a = t * 14 + p * 2.094; linea(fx, fy, Math.round(fx + Math.cos(a) * 4), Math.round(fy + Math.sin(a) * 4), AD.gris); } for (let i = -5; i <= 5; i += 2) pset(fx + i, fy - 5 + Math.abs(i) / 3, AD.grisS); pset(fx, fy, AD.k);
    rect(fx - 1, fy + 6, fx + 1, 94, AD.grisS); rect(fx - 4, 93, fx + 4, 95, AD.grisD); }
  for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1; pset(Math.round(140 + Math.sin(t * 2 + i) * 1.5), Math.round(88 - u * 9), u > 0.6 ? AD.bloqueS : AD.blanco); }
  pset(147, 104, Math.sin(t * 7) > 0 ? hex('#5aff6a') : hex('#2a6a3a')); pset(147, 106, Math.sin(t * 11 + 1) > 0.3 ? AD.ambar : hex('#6a4a1a'));
  // la mesa principal: el monitor del plano, el teclado con el cursor, la pizza que humea, la torre del suelo
  a_monitor(R, 214, 132, o.pantalla ?? 'bichitos', t, noche);
  for (let i = 0; i < 3; i++) { const u = (t * 0.4 + i / 3) % 1; pset(Math.round(252 + Math.sin(t * 1.7 + i) * 2), Math.round(124 - u * 10), u > 0.6 ? AD.bloqueS : AD.blanco); }
  pset(262, 143, Math.sin(t * 6) > -0.2 ? hex('#5aff6a') : hex('#2a6a3a')); pset(262, 147, Math.sin(t * 13) > 0.4 ? AD.ambar : hex('#6a4a1a'));
  if (noche) { a_halo(R, 214, 120, 30, 20, AD.pantalla, 0.22 + Math.sin(t * 5) * 0.03); a_halo(R, 174, 94, 22, 12, AD.pantalla, 0.16); }
  return { suelo: 150, mesa: { x: [178, 270], tablero: 132, fondo: 127, borde: 136, esquinaIzq: [180, 132], pizza: [244, 130] }, monitor: { x: 214, base: 132, pantalla: [202, 109, 225, 122] }, mesaFondo: { x: [88, 274], tablero: 95 }, ventana: V, pizarra: [92, 20, 160, 66], libre: [[10, 176], [272, 314]], silla: [245, 150] };
}
// un monitor de tubo con su pantalla: las piezas 'ciudad' y 'bichitos' del reparto; 'codigo', líneas de código que suben
// con el cursor que parpadea (pintadas sobre la pieza apagada); 'apagada'. x = centro, y = base; de noche, con un brillo
function a_monitor(R, x, y, p, t, noche) {
  const PG = PIEZAS_GT;
  if (p === 'ciudad' || p === 'bichitos') { if (PG.monitorTubo) PG.monitorTubo(R, x, y, { pantalla: p, t }); }
  else { if (PG.monitorTubo) PG.monitorTubo(R, x, y, {}); if (p === 'codigo') { const x0 = x - 16 + 4, y0 = y - 27 + 4, s = Math.floor(t * 3);
    for (let j = 0; j < 7; j++) { const k = s + j, w = 4 + Math.round(h(k, 0, 991) * 14), ind = Math.round(h(k, 1, 991) * 3) * 2; R.rect(x0 + 1 + ind, y0 + 1 + j * 2, Math.min(x0 + 22, x0 + 1 + ind + w), y0 + 1 + j * 2, h(k, 2, 991) < 0.25 ? hex('#f0e060') : hex('#6aff8a')); }
    if (Math.sin(t * 8) > 0) R.rect(x0 + 2, y0 + 13, x0 + 3, y0 + 13, AD.blanco); } }
  if (noche && p !== 'apagada') a_halo(R, x, y - 14, 20, 14, AD.pantalla, 0.2);
}

// lo fijo de la oficina: techo, pared de bloque, ventana con persiana y lo de fuera, pizarra, corcho, carteles, balda,
// archivador con reloj, radiador, mesa del fondo con sus cosas, mesa principal y moqueta
function a_oficinaFija(R, noche, vista) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // el techo de placas con sus perfiles y los fluorescentes
  for (let y = 0; y < 13; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (x % 32 === 0 || y === 6) ? AD.techoS : h(x, y, 1001) < 0.08 ? AD.techoS : AD.techo;
  for (const x0 of [176, 226]) { rect(x0, 3, x0 + 40, 9, AD.grisS); rect(x0, 4, x0 + 40, 8, AD.tubo); rect(x0 + 1, 5, x0 + 39, 5, AD.blanco); for (let x = x0 + 2; x < x0 + 40; x += 3) pset(x, 7, AD.grisL); }
  rect(0, 12, 319, 13, AD.techoS); rect(0, 14, 319, 14, AD.bloqueJ);
  // la pared de bloque pintado: juntas, brillo que viene de la ventana y alguna mancha
  for (let y = 15; y < 112; y++) { const fila = Math.floor((y - 15) / 7); for (let x = 0; x < 320; x++) { const j = (y - 15) % 7 === 6 || (x + (fila % 2) * 9) % 18 === 17; let c = j ? AD.bloqueJ : h(x, y, 1002) < 0.1 ? AD.bloqueS : AD.bloque;
      if (!j && x < 110 && a_um(x, y) < (110 - x) / 400) c = AD.bloqueL; B[y * 320 + x] = c; } }
  rect(0, 108, 319, 112, AD.grisS); rect(0, 108, 319, 108, AD.grisL);
  // la ventana de aluminio con lo de fuera
  const V = [10, 25, 76, 85]; rect(6, 21, 80, 89, AD.aluS); rect(7, 22, 79, 88, AD.alu); rect(9, 24, 77, 86, AD.k);
  for (let y = V[1]; y <= V[3]; y++) for (let x = V[0]; x <= V[2]; x++) B[y * 320 + x] = noche ? (y < 50 ? AD.noche0 : AD.noche1) : y < 46 ? (a_um(x, y) < (y - 25) / 21 ? AD.cielo1 : AD.cielo0) : AD.cielo2;
  if (vista === 'calle') {
    // la fachada de enfrente (arenisca con ventanas), la acera, la calzada y, abajo, el rótulo del pez de la tienda
    // (de arriba abajo: la fachada de enfrente, su acera, la calzada con los coches, nuestra acera y el rótulo de abajo)
    for (let y = 25; y < 59; y++) for (let x = 10; x <= 76; x++) B[y * 320 + x] = (y % 5 === 4 || (x + (Math.floor(y / 5) % 2) * 5) % 10 === 9) ? AD.areniscaS : AD.arenisca;
    for (const wx of [14, 34, 54]) for (const wy of [28, 43]) { rect(wx, wy, wx + 12, wy + 11, AD.blanco); rect(wx + 1, wy + 1, wx + 11, wy + 10, noche ? AD.luz : AD.aguaS); rect(wx + 6, wy + 1, wx + 6, wy + 10, AD.blanco); }
    rect(10, 59, 76, 65, AD.losa); for (let x = 10; x <= 76; x += 8) rect(x, 59, x, 65, AD.losaS); rect(10, 66, 76, 76, AD.asfalto); rect(10, 66, 76, 66, AD.grisL); rect(10, 71, 76, 71, AD.amarilla); rect(10, 77, 76, 79, AD.losa); rect(10, 77, 76, 77, AD.grisL);
    rect(26, 80, 60, 85, AD.k); rect(27, 81, 59, 85, AD.tienda); for (let j = -2; j <= 2; j++) for (let i = -6; i <= 6; i++) if ((i / 6.5) ** 2 + (j / 2.6) ** 2 < 1) pset(43 + i, 83 + j, j < 0 ? AD.oroL : AD.oro); poligono([[48, 83], [52, 80], [52, 85]], AD.oro); pset(39, 82, AD.k);
  } else {
    // el polígono: las colinas, las naves de chapa ondulada con sus portones, una farola, la furgoneta y un coche
    for (let x = V[0]; x <= V[2]; x++) { const top = Math.round(46 + Math.sin(x * 0.08) * 2); for (let y = top; y < 52; y++) B[y * 320 + x] = noche ? AD.noche1 : AD.lejos1; }
    for (const [x0, x1, top, c, cs] of [[10, 44, 50, AD.gris, AD.grisS], [40, 76, 54, hex('#7a8ca0'), hex('#5a6a7e')]]) { for (let y = top; y < 74; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = (x % 3 === 0) ? cs : c; rect(x0, top - 2, x1, top, AD.grisD); rect(x0 + 6, 62, x0 + 18, 74, AD.grisD); for (let y = 63; y < 74; y += 2) rect(x0 + 6, y, x0 + 18, y, AD.grisS); }
    rect(10, 74, 76, 85, AD.asfalto); for (let x = 12; x < 76; x += 10) rect(x, 79, x + 4, 79, AD.blanco);
    rect(52, 64, 70, 76, AD.k); rect(53, 65, 69, 74, AD.blanco); rect(63, 66, 68, 69, AD.cielo1); disco(56, 76, 2, AD.k); disco(66, 76, 2, AD.k);
    rect(16, 72, 34, 78, AD.k); rect(17, 73, 33, 76, hex('#a83a2a')); rect(21, 70, 29, 73, hex('#a83a2a')); rect(22, 71, 28, 72, AD.cielo1); disco(20, 78, 1, AD.k); disco(30, 78, 1, AD.k);
    rect(46, 40, 46, 74, AD.grisD); rect(44, 39, 50, 40, AD.grisD); pset(49, 41, noche ? AD.sodio : AD.grisL); if (noche) for (let j = 0; j < 10; j++) for (let i = -j; i <= j; i++) if ((i + j) % 2 === 0) pset(49 + i, 42 + j * 3, a_mez(AD.noche1, AD.sodio, 0.35));
  }
  // la persiana veneciana subida a medias, con sus cordones, el alféizar con una planta y disquetes, y el radiador
  for (let y = 25; y < 40; y += 2) { rect(9, y, 77, y, AD.blanco); rect(9, y + 1, 77, y + 1, AD.grisL); } rect(8, 40, 78, 41, AD.aluS); linea(14, 25, 14, 56, AD.grisS); pset(14, 57, AD.blanco); rect(43, 25, 43, 85, AD.alu);
  rect(4, 89, 82, 91, AD.blanco); rect(4, 92, 82, 92, AD.bloqueJ);
  rect(66, 81, 74, 89, AD.k); rect(67, 82, 73, 89, hex('#b0603a')); for (const [i, j, r] of [[-2, -4, 3], [2, -5, 3], [0, -8, 3], [-3, -9, 2], [3, -10, 2]]) disco(70 + i, 81 + j, r, AD.leyS); for (const [i, j] of [[-1, -6], [1, -9], [3, -6]]) pset(70 + i, 81 + j, AD.leyL);
  rect(12, 94, 74, 106, AD.k); for (let x = 13; x < 74; x += 4) { rect(x, 95, x + 2, 105, AD.blanco); rect(x + 2, 95, x + 2, 105, AD.grisL); } rect(12, 94, 74, 94, AD.grisL); rect(72, 104, 76, 108, AD.grisS);
  // la pizarra blanca con la ciudad vista desde arriba dibujada a rotulador: manzanas, calles, flechas, un coche y cifras
  rect(90, 18, 162, 68, AD.aluS); rect(91, 19, 161, 67, AD.alu); rect(93, 21, 159, 65, AD.blanco);
  for (let y = 22; y < 65; y++) for (let x = 94; x < 159; x++) if (h(x >> 2, y >> 1, 1003) < 0.06) pset(x, y, AD.papelS);
  for (const [x0, y0, x1, y1] of [[97, 24, 113, 34], [119, 24, 133, 34], [139, 24, 155, 30], [97, 40, 109, 52], [115, 40, 133, 52], [139, 36, 155, 52], [97, 56, 121, 62], [127, 56, 155, 62]]) { linea(x0, y0, x1, y0, AD.k); linea(x1, y0, x1, y1, AD.k); linea(x1, y1, x0, y1, AD.k); linea(x0, y1, x0, y0, AD.k); }
  linea(115, 46, 125, 46, AD.verdeC); disco(124, 46, 1, AD.verdeC); for (let x = 98; x < 156; x += 4) pset(x, 37, AD.grisS); for (let y = 25; y < 63; y += 4) pset(136, y, AD.grisS);
  linea(100, 37, 134, 37, AD.rojoC); linea(134, 37, 136, 54, AD.rojoC); linea(136, 54, 154, 54, AD.rojoC); pset(152, 53, AD.rojoC); pset(152, 55, AD.rojoC); pset(153, 53, AD.rojoC); pset(153, 55, AD.rojoC);
  rect(107, 36, 111, 38, AD.azulC); pset(108, 35, AD.azulC); pset(110, 35, AD.azulC); rect(143, 43, 147, 47, AD.k); linea(143, 43, 147, 47, AD.rojoC); linea(147, 43, 143, 47, AD.rojoC);
  a_digito(R, '1', 101, 26, AD.azulC); a_digito(R, '2', 144, 25, AD.azulC);
  rect(100, 66, 154, 68, AD.aluS); for (const [mx, c] of [[106, AD.rojoC], [112, AD.azulC], [118, AD.k], [124, AD.verdeC]]) { rect(mx, 65, mx + 4, 66, c); pset(mx + 4, 65, AD.blanco); } rect(140, 64, 148, 66, AD.grisD);
  // el corcho con bocetos de bichitos y cochecitos, una hoja cuadriculada y una foto, con chinchetas
  rect(166, 22, 206, 64, AD.nogalS); rect(167, 23, 205, 63, hex('#c49a62')); for (let y = 24; y < 63; y++) for (let x = 168; x < 205; x++) if (h(x, y, 1004) < 0.18) pset(x, y, hex('#a87a46'));
  const hoja = (x0, y0, w, al, dib) => { rect(x0, y0, x0 + w, y0 + al, AD.papelS); rect(x0, y0, x0 + w - 1, y0 + al - 1, AD.papel); dib(x0, y0); pset(x0 + Math.round(w / 2), y0, AD.rojoC); };
  hoja(170, 26, 15, 16, (x, y) => { for (const [i, j] of [[4, 8], [10, 8]]) { disco(x + i, y + j, 2, AD.naranjaC); pset(x + i - 1, y + j - 3, AD.verdeC); pset(x + i, y + j - 4, AD.verdeC); pset(x + i + 1, y + j - 3, AD.verdeC); pset(x + i, y + j, AD.k); } linea(x + 2, y + 13, x + 13, y + 13, AD.grisS); });
  hoja(188, 25, 15, 14, (x, y) => { for (let i = 1; i < 15; i += 3) linea(x + i, y + 1, x + i, y + 12, AD.cielo2); for (let j = 1; j < 13; j += 3) linea(x + 1, y + j, x + 13, y + j, AD.cielo2); rect(x + 4, y + 4, x + 7, y + 8, AD.azulC); rect(x + 9, y + 5, x + 11, y + 9, AD.rojoC); });
  hoja(171, 45, 14, 15, (x, y) => { rect(x + 3, y + 5, x + 10, y + 9, AD.rojoC); rect(x + 5, y + 3, x + 8, y + 5, AD.rojoC); disco(x + 4, y + 10, 1, AD.k); disco(x + 9, y + 10, 1, AD.k); linea(x + 1, y + 12, x + 12, y + 12, AD.grisS); });
  rect(189, 43, 203, 56, AD.blanco); rect(190, 44, 202, 52, AD.cielo1); rect(190, 50, 202, 52, AD.leyS); disco(196, 48, 2, hex('#e0b090')); pset(196, 46, AD.k); pset(196, 55, AD.rojoC);
  // los dos carteles de cine (sin letras): la ciudad de noche con la luna y un coche; la persecución vista desde arriba
  rect(212, 20, 238, 60, AD.k); for (let y = 21; y < 60; y++) for (let x = 213; x < 238; x++) B[y * 320 + x] = y < 40 ? (a_um(x, y) < (y - 21) / 19 ? hex('#3a2a5a') : hex('#1a1a3a')) : hex('#e0602a');
  disco(230, 28, 3, AD.oroL); for (const [bx, bh] of [[214, 12], [219, 18], [224, 9], [229, 15], [234, 11]]) { rect(bx, 48 - bh, bx + 4, 48, AD.k); for (let y = 50 - bh; y < 47; y += 3) pset(bx + 2, y, AD.amarilla); }
  rect(216, 50, 234, 54, AD.k); rect(219, 48, 230, 50, AD.k); pset(234, 52, AD.amarilla); rect(214, 56, 236, 57, AD.oro);
  rect(244, 28, 270, 64, AD.k); rect(245, 29, 269, 63, hex('#3a8a5a')); for (let y = 30; y < 63; y += 8) rect(245, y, 269, y + 2, hex('#2a2a32')); for (let x = 250; x < 269; x += 9) rect(x, 29, x + 2, 63, hex('#2a2a32'));
  rect(251, 39, 255, 41, AD.azulC); rect(260, 39, 264, 41, AD.rojoC); rect(262, 47, 264, 51, AD.blanco);
  // la balda con cajas de juegos, archivadores y una maqueta de coche
  rect(208, 70, 274, 71, AD.hayaD); rect(208, 72, 274, 72, AD.bloqueJ); rect(210, 72, 212, 75, AD.grisS); rect(270, 72, 272, 75, AD.grisS);
  for (let i = 0; i < 8; i++) { const x = 210 + i * 5, c = [AD.rojoC, AD.azulC, AD.naranjaC, AD.verdeC, hex('#6a3a8a'), AD.amarilla, AD.k, hex('#2a8aa0')][i], al = 10 + (i % 3) * 2; rect(x, 70 - al, x + 4, 69, AD.k); rect(x + 1, 71 - al, x + 3, 69, c); pset(x + 2, 72 - al + 2, AD.blanco); rect(x + 1, 66, x + 3, 66, AD.blanco); }
  for (let i = 0; i < 3; i++) { rect(252 + i * 6, 56, 257 + i * 6, 69, AD.k); rect(253 + i * 6, 57, 256 + i * 6, 69, [hex('#3a5a8a'), hex('#8a3a3a'), hex('#3a6a4a')][i]); rect(254 + i * 6, 62, 255 + i * 6, 64, AD.papel); }
  // el archivador metálico con el reloj encima (fuera de la esquina de Atom), un abrigo colgado
  rect(282, 58, 314, 112, AD.k); rect(283, 59, 313, 111, AD.grisL); rect(310, 59, 313, 111, AD.gris); for (let j = 0; j < 4; j++) { const y = 61 + j * 12; rect(285, y, 308, y + 10, AD.gris); rect(285, y, 308, y, AD.blanco); rect(293, y + 4, 300, y + 5, AD.grisD); rect(295, y + 2, 298, y + 2, AD.papel); }
  rect(286, 50, 306, 58, AD.cajaS); rect(287, 51, 305, 57, AD.caja); rect(287, 54, 305, 54, AD.cajaS);
  // la mesa larga del fondo con sus cosas: torres beis, teclados, disquetes, la taza, el flexo y los cables que cuelgan
  rect(86, 94, 276, 96, AD.hayaD); rect(86, 93, 276, 93, AD.hayaL); rect(86, 94, 276, 94, AD.haya); rect(88, 97, 90, 112, AD.hayaD); rect(272, 97, 274, 112, AD.hayaD); rect(90, 97, 272, 99, AD.hayaS);
  for (let k = 0; k < 6; k++) { const x0 = 96 + k * 30; for (let y = 99; y < 110; y++) pset(x0 + Math.round(Math.sin((y - 99) * 0.5 + k) * 2), y, AD.grisD); linea(x0 + 4, 99, x0 + 10, 111, AD.k); }
  for (const tx of [140, 190, 262]) { rect(tx, 74, tx + 9, 93, AD.k); rect(tx + 1, 75, tx + 8, 93, hex('#d8ccb0')); rect(tx + 7, 75, tx + 8, 93, hex('#a89c80')); rect(tx + 2, 78, tx + 6, 79, AD.grisD); rect(tx + 2, 82, tx + 6, 82, AD.grisS); }
  for (const kx of [110, 164, 232]) { rect(kx, 91, kx + 17, 93, AD.k); rect(kx + 1, 91, kx + 16, 92, hex('#e0d4b8')); for (let x = kx + 2; x < kx + 16; x += 2) pset(x, 91, hex('#b8ac90')); }
  rect(136, 88, 142, 93, AD.k); rect(137, 89, 141, 93, AD.rojoC); pset(142, 90, AD.k);
  for (let i = 0; i < 5; i++) { rect(98 + i * 2, 89 - i, 105 + i * 2, 92 - i, AD.k); rect(99 + i * 2, 90 - i, 104 + i * 2, 91 - i, [AD.azulC, AD.k, AD.rojoC, AD.grisD, AD.azulC][i]); }
  linea(254, 93, 250, 80, AD.k); linea(250, 80, 258, 74, AD.k); rect(256, 72, 262, 76, AD.k); rect(257, 76, 261, 76, AD.luz); rect(250, 92, 256, 93, AD.k);
  // la moqueta de losetas en perspectiva, con manchas, y los cables encintados que cruzan hasta la mesa
  for (let y = 113; y < 180; y++) { const p = (y - 113) / 67; for (let x = 0; x < 320; x++) { const xs = 160 + (x - 160) / (0.55 + p * 0.45), cel = Math.floor(xs / 28) + Math.floor((y - 113) / (6 + p * 8)); let c = (Math.abs(xs % 28) < 1.1 || (y - 113) % Math.round(6 + p * 8) === 0) ? AD.moquetaS : cel % 2 ? AD.moqueta : AD.moquetaL;
      if (h(x, y, 1006) < 0.08) c = AD.moquetaS; B[y * 320 + x] = c; } }
  for (const [x0, y0, x1, y1] of [[96, 112, 186, 150], [258, 150, 240, 180]]) { linea(x0, y0, x1, y1, AD.grisD); linea(x0 + 1, y0, x1 + 1, y1, AD.k); for (let u = 0.2; u < 1; u += 0.3) { const x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u); rect(x - 3, y - 1, x + 3, y + 1, hex('#c8b030')); } }
  // las sombras bajo las mesas y lo que hay por el suelo: una regleta con enchufes, un disquete, una lata y un papel
  for (let y = 112; y < 120; y++) for (let x = 86; x < 278; x++) if (a_um(x, y) < 0.5 - (y - 112) * 0.06) B[y * 320 + x] = AD.moquetaS;
  for (let y = 150; y < 156; y++) for (let x = 176; x < 272; x++) if (a_um(x, y) < 0.55 - (y - 150) * 0.09) B[y * 320 + x] = AD.moquetaS;
  rect(100, 120, 120, 123, AD.k); rect(101, 121, 119, 122, AD.blanco); for (let x = 103; x < 118; x += 4) { rect(x, 121, x + 1, 122, AD.k); } pset(118, 121, AD.rojoC);
  rect(70, 166, 76, 171, AD.k); rect(71, 167, 75, 170, AD.azulC); rect(72, 167, 74, 168, AD.grisL);
  rect(132, 160, 137, 163, AD.k); rect(133, 161, 136, 162, AD.rojoC); pset(132, 161, AD.grisL);
  disco(110, 174, 2, AD.papel); pset(109, 173, AD.papelS); pset(111, 175, AD.papelS);
  // la mesa principal de haya (x 178–270): el tablero en perspectiva (borde de atrás en y 127, delante en y 133) con
  // vetas, brillos y el canto; la pata izquierda, el faldón del fondo, la cajonera con tiradores y la sombra de debajo;
  // encima, el teclado, el ratón con su cable, la lata y la caja de pizza abierta; en el suelo, la torre
  for (let y = 145; y < 150; y++) for (let x = 185; x < 236; x++) if (a_um(x, y) < 0.75 - (y - 145) * 0.1) B[y * 320 + x] = AD.moquetaS;
  rect(178, 126, 270, 137, AD.k);
  for (let y = 127; y <= 133; y++) for (let x = 179; x <= 269; x++) { const v = (x + Math.round(Math.sin(x * 0.05 + y * 0.9) * 3 + y * 2)) % 13; let c = v === 0 ? AD.hayaS : v === 6 && h(x, y, 1007) < 0.6 ? AD.hayaL : AD.haya;
    if (y === 127) c = AD.hayaL; else if (h(x, y, 1008) < 0.04) c = AD.hayaS; if (x > 186 && x < 212 && y > 128 && (x - y * 2) % 9 < 2) c = AD.hayaL; B[y * 320 + x] = c; }
  rect(179, 134, 269, 134, AD.hayaL); rect(179, 135, 269, 136, AD.hayaS); for (let x = 182; x < 268; x += 11) pset(x, 136, AD.hayaD);
  rect(180, 137, 184, 150, AD.k); rect(181, 137, 183, 150, AD.hayaS); pset(181, 137, AD.haya); rect(179, 150, 185, 150, AD.k);
  rect(185, 137, 235, 145, AD.k); rect(186, 137, 235, 144, AD.hayaD); for (let x = 189; x < 235; x += 7) rect(x, 137, x, 144, AD.hayaS); rect(186, 137, 235, 137, AD.k);
  rect(236, 137, 268, 150, AD.k); rect(237, 137, 267, 149, AD.haya); rect(237, 137, 238, 149, AD.hayaL); rect(266, 137, 267, 149, AD.hayaS);
  for (const y of [138, 144]) { rect(239, y, 265, y + 4, AD.hayaS); rect(240, y + 1, 264, y + 3, AD.haya); rect(240, y + 1, 264, y + 1, AD.hayaL); rect(249, y + 2, 255, y + 2, AD.grisD); pset(250, y + 2, AD.grisL); }
  rect(195, 129, 225, 132, AD.k); rect(196, 129, 224, 131, hex('#e0d4b8')); for (let x = 197; x < 224; x += 2) { pset(x, 129, hex('#b8ac90')); pset(x + 1, 130, hex('#b8ac90')); } rect(218, 130, 223, 131, hex('#c8bca0'));
  rect(229, 129, 233, 132, AD.k); rect(230, 129, 232, 131, hex('#d8ccb0')); pset(230, 129, AD.blanco); linea(231, 128, 226, 127, AD.grisD);
  rect(234, 122, 238, 130, AD.k); rect(235, 123, 237, 130, AD.rojoC); rect(235, 123, 237, 123, AD.grisL); pset(237, 126, AD.blanco);
  rect(240, 124, 266, 131, AD.k); rect(241, 125, 265, 130, AD.caja); rect(241, 128, 265, 130, AD.cajaS); for (let j = -3; j <= 3; j++) for (let i = -10; i <= 10; i++) if ((i / 10.5) ** 2 + (j / 3.4) ** 2 < 1) pset(253 + i, 127 + j, (i + j) % 7 === 0 ? AD.salsa : j < -1 ? AD.pizza : AD.pizzaS); for (const [i, j] of [[-5, 0], [3, -1], [7, 1], [-1, 1]]) pset(253 + i, 127 + j, AD.salsa);
  linea(240, 124, 236, 112, AD.k); linea(266, 124, 262, 112, AD.k); linea(236, 112, 262, 112, AD.k); for (let y = 113; y < 124; y++) { const a = 236 + (y - 112) * 4 / 12, b = 262 + (y - 112) * 4 / 12; rect(Math.round(a) + 1, y, Math.round(b) - 1, y, AD.caja); } rect(240, 118, 260, 118, AD.cajaS);
  rect(256, 138, 266, 150, AD.k); rect(257, 139, 265, 150, hex('#d8ccb0')); rect(264, 139, 265, 150, hex('#a89c80')); rect(258, 141, 263, 142, AD.grisD); rect(258, 145, 263, 145, AD.grisS); linea(260, 138, 252, 133, AD.k);
  for (let y = 150; y < 153; y++) for (let x = 180; x < 270; x++) if (a_um(x, y) < 0.7 - (y - 150) * 0.2) B[y * 320 + x] = AD.moquetaS;
  // la funda de un ordenador apoyada en la pared
  rect(78, 101, 84, 110, AD.k); rect(79, 102, 83, 110, hex('#3a3a50')); rect(79, 102, 83, 102, hex('#5a5a72'));
  // la silla giratoria de la mesa principal, vacía y de espaldas, delante de la cajonera: respaldo acolchado con su
  // costura, el pie con el pistón y las cinco ruedas con su sombra
  for (let x = 236; x < 255; x++) if (a_um(x, 150) < 0.6) pset(x, 150, AD.moquetaS);
  rect(239, 129, 251, 142, AD.k); rect(240, 130, 250, 141, hex('#3a3a50')); rect(240, 130, 250, 131, hex('#5a5a72')); rect(240, 130, 241, 141, hex('#4a4a62')); rect(249, 132, 250, 141, hex('#2a2a3a')); for (let y = 133; y < 140; y += 3) pset(245, y, hex('#2a2a3a'));
  rect(244, 142, 246, 146, AD.grisD); pset(244, 143, AD.grisL); for (const dx of [-6, -3, 0, 3, 6]) { linea(245, 146, 245 + dx, 148 + (Math.abs(dx) === 3 ? 0 : 1), AD.grisD); pset(245 + dx, 149 + (Math.abs(dx) === 3 ? -1 : 0), AD.k); }
  // la papelera de la oficina, llena de papeles, contra la pared bajo la mesa del fondo
  rect(92, 101, 102, 112, AD.k); rect(93, 102, 101, 112, AD.gris); for (let x = 94; x < 101; x += 2) rect(x, 103, x, 111, AD.grisS); disco(95, 100, 2, AD.papel); disco(99, 100, 1, AD.papelS);
  // de noche: todo en penumbra, con la luz del flexo y los fluorescentes apagados
  if (noche) { a_nocheCapa(B, new Set([AD.luz, AD.sodio, hex('#6aff8a'), hex('#5aff6a')]));
    a_halo(R, 258, 92, 26, 12, AD.luz, 0.5); for (let y = 77; y < 94; y++) { const w = (y - 77) * 0.9; for (let x = Math.round(259 - w); x <= Math.round(259 + w); x++) if (a_um(x, y) < 0.35) B[y * 320 + x] = a_mez(B[y * 320 + x], AD.luz, 0.35); }
    rect(257, 76, 261, 76, AD.luzL); a_halo(R, 44, 55, 40, 34, AD.sodio, 0.12); }
}
// lo de delante de la oficina: la silla y las cajas de pizza a la izquierda, la esquina de otra mesa a la derecha
function a_oficinaDelante(R, t, o = {}) {
  const { rect, pset, disco } = R, noche = !!o.noche, osc = (c) => noche ? a_mez(c, AD.noche0, 0.55) : c;
  // las cajas de pizza apiladas en el suelo (la de arriba entreabierta) y el respaldo de la silla giratoria
  for (let i = 0; i < 4; i++) { const y = 176 - i * 5, x = 6 + (i % 2) * 2; rect(x, y - 4, x + 30, y, AD.k); rect(x + 1, y - 3, x + 29, y - 1, osc(AD.caja)); rect(x + 1, y - 1, x + 29, y - 1, osc(AD.cajaS)); disco(x + 15, y - 2, 1, osc(AD.rojoC)); }
  rect(9, 152, 35, 156, AD.k); rect(10, 153, 34, 155, osc(AD.caja)); pset(20, 154, osc(AD.salsa));
  rect(30, 160, 46, 180, AD.k); rect(31, 161, 45, 180, osc(hex('#3a3a50'))); rect(31, 161, 45, 162, osc(hex('#5a5a72'))); rect(43, 163, 45, 180, osc(hex('#2a2a3a')));
  // la esquina de otra mesa: tablero, teclado, la taza con vapor y un disquete
  rect(262, 160, 320, 166, AD.k); rect(263, 160, 320, 163, osc(AD.haya)); rect(263, 160, 320, 160, osc(AD.hayaL)); rect(263, 164, 320, 165, osc(AD.hayaS)); rect(264, 166, 268, 180, AD.k); rect(265, 166, 267, 180, osc(AD.hayaS));
  rect(278, 157, 306, 160, AD.k); rect(279, 157, 305, 159, osc(hex('#e0d4b8'))); for (let x = 280; x < 305; x += 2) pset(x, 157, osc(hex('#b8ac90')));
  rect(310, 152, 317, 160, AD.k); rect(311, 153, 316, 160, osc(AD.blanco)); rect(311, 155, 316, 156, osc(AD.azulC)); pset(317, 156, AD.k);
  for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1; pset(Math.round(313 + Math.sin(t * 2 + i) * 1.5), Math.round(150 - u * 10), u > 0.6 ? AD.bloqueS : AD.blanco); }
  rect(268, 156, 275, 160, AD.k); rect(269, 157, 274, 159, osc(AD.azulC)); rect(270, 157, 272, 157, osc(AD.grisL));
  return {};
}

function a_reunion(R, t, o = {}) {
  const { rect, pset, linea } = R, ll = o.lluvia ?? 0.6;
  a_pegar(R, a_capaDun(R, 'reunion', () => a_reunionFija(R)));
  // la diapositiva cambia cada 3 s: la ciudad desde arriba, las barras que bajan, un bichito con una interrogación
  const S = [28, 27, 108, 71], d = Math.floor(t / 3) % 3; R.recorte(S);
  for (let y = S[1]; y <= S[3]; y++) for (let x = S[0]; x <= S[2]; x++) { const q = 1 - (Math.abs(x - 68) / 60) ** 2 * 0.3; pset(x, y, q > 0.9 || a_um(x, y) < (q - 0.7) * 3 ? hex('#f8f6ea') : hex('#e8e4d4')); }
  if (d === 0) { for (let y = 30; y < 70; y += 10) linea(32, y, 104, y, AD.grisS); for (let x = 32; x < 106; x += 14) linea(x, 28, x, 70, AD.grisS); for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) if (h(i, j, 1011) < 0.75) a_rectR(R, S, 34 + i * 14, 32 + j * 10, 43 + i * 14, 37 + j * 10, h(i, j, 1012) < 0.2 ? AD.verdeC : AD.grisL);
    const u = (t % 3) / 3, cx = Math.round(32 + u * 72); a_rectR(R, S, cx - 2, 39, cx + 2, 41, AD.rojoC); }
  else if (d === 1) { linea(34, 68, 104, 68, AD.k); linea(34, 30, 34, 68, AD.k); for (let i = 0; i < 5; i++) { const al = Math.round((34 - i * 6) * Math.min(1, (t % 3) * 1.5)); a_rectR(R, S, 40 + i * 13, 68 - al, 48 + i * 13, 67, i > 2 ? AD.rojoC : AD.azulC); }
    linea(44, 34, 98, 56, AD.rojoC); linea(98, 56, 92, 56, AD.rojoC); linea(98, 56, 96, 50, AD.rojoC); }
  else { const bx = 58, by = 62; R.disco(bx, by - 8, 8, AD.naranjaC); R.disco(bx, by - 18, 6, hex('#f0c8a0')); for (const [i, j] of [[-4, -25], [0, -27], [4, -25]]) { R.disco(bx + i, by + j, 2, AD.verdeC); } pset(bx - 2, by - 18, AD.k); pset(bx + 2, by - 18, AD.k);
    R.icono('?', 80, 36, AD.rojoC, AD.k, 3); }
  R.recorte(null);
  // el haz del proyector, con las motas de polvo que flotan
  const P = [134, 122]; for (let y = 27; y < 122; y++) { const u = (y - 27) / 95, a = Math.round(28 + (P[0] - 28) * u), b = Math.round(108 + (P[0] + 2 - 108) * u); for (let x = a; x <= b; x++) { if (y <= 72 && x >= 27 && x <= 109) continue; if (a_um(x, y) < 0.16) pset(x, y, a_mez(R.pget(x, y), AD.luzL, 0.35)); } }
  for (let k = 0; k < 16; k++) { const u = (h(k, 0, 1013) + t * 0.03 * (1 + k % 3)) % 1, s = h(k, 1, 1013), y = Math.round(74 + u * 46), x = Math.round(28 + (P[0] - 28) * ((y - 27) / 95) + s * (80 * (1 - (y - 27) / 95) + 2) + Math.sin(t + k) * 2); if (Math.sin(t * 2 + k) > -0.3) pset(x, y, AD.luzL); }
  // la lluvia en la ventana y las gotas que resbalan
  const V = [154, 24, 212, 68];
  for (const cl of [[154, 40, 182, 68], [184, 40, 212, 68]]) { R.recorte(cl);
  for (let k = 0; k < Math.round(30 * Math.max(0.3, ll)); k++) { const y = Math.round((h(k, 1, 1014) * 50 + t * 90) % 50) + 22, x = Math.round(h(k, 2, 1014) * 60 + 152 + (y - 22) * 0.2); linea(x, y, x, y + 2, AD.cielo3); }
  for (let k = 0; k < 5; k++) { const x = 158 + Math.round(h(k, 3, 1014) * 50), u = ((t * (0.1 + h(k, 4, 1014) * 0.1) + h(k, 5, 1014)) % 1), y = Math.round(44 + u * 24); if (x === 183) continue; pset(x, y, AD.blanco); pset(x, y - 1, AD.cielo3); pset(x, y - 2, AD.cielo2); }
  a_gaviotas(R, t, 2, 46, 54, 7, cl); }
  R.recorte(null);
  // el reloj de pared que anda (la aguja larga da una vuelta cada minuto de vídeo)
  { const cx = 236, cy = 34, a = t * Math.PI * 2 / 60 - Math.PI / 2, b = t * Math.PI * 2 / 720 + 1.2; linea(cx, cy, Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), AD.k); linea(cx, cy, Math.round(cx + Math.cos(b) * 3), Math.round(cy + Math.sin(b) * 3), AD.k); const s = t * Math.PI * 2 - Math.PI / 2; pset(Math.round(cx + Math.cos(s) * 5), Math.round(cy + Math.sin(s) * 5), AD.rojoC); }
  // el ficus que se mueve con el aire del radiador
  { const m = Math.sin(t * 1.4); for (const [i, j] of [[-4, 76], [4, 80], [-2, 84], [3, 88], [-5, 92]]) pset(262 + i + Math.round(m * (j < 85 ? 1 : 0)), j - 1, AD.leyL); }
  return { suelo: 150, mesa: { x: [28, 252], tablero: 144 }, detrasMesa: [36, 236], sinCabezas: [[124, 146], [202, 230], [238, 248]], papelera: [294, 152], junto: [256, 282], puerta: [276, 46, 308, 112], pantalla: S, ventana: V, proyector: [134, 121], telefono: [216, 145] };
}

// lo fijo de la sala de reuniones: techo, pared de yeso y zócalo de nogal, pantalla de proyección, ventana con lo de
// fuera, reloj, cuadro, ficus, puerta, papelera con papeles y moqueta
function a_reunionFija(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  for (let y = 0; y < 10; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (x % 30 === 0 || y === 5) ? AD.techoS : h(x, y, 1021) < 0.08 ? AD.techoS : AD.techo;
  rect(180, 2, 216, 7, AD.grisS); rect(180, 3, 216, 6, AD.tubo); rect(181, 4, 215, 4, AD.blanco); rect(0, 10, 319, 11, AD.techoS);
  for (let y = 12; y < 76; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 1022); B[y * 320 + x] = q < 0.12 ? AD.yesoS : q > 0.93 ? AD.yesoL : AD.yeso; }
  rect(0, 12, 319, 12, AD.yesoL);
  // el zócalo de nogal en cuarterones, con su moldura
  rect(0, 75, 319, 77, AD.nogalD); rect(0, 76, 319, 76, AD.nogalL);
  for (let y = 78; y < 112; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = h(x >> 2, y, 1023) < 0.3 ? AD.nogalS : (y + Math.floor(x / 40) * 3) % 9 === 0 ? AD.nogalS : AD.nogal;
  for (let x = 4; x < 316; x += 38) { rect(x, 81, x + 32, 106, AD.nogalD); rect(x + 1, 82, x + 31, 105, AD.nogal); rect(x + 1, 82, x + 31, 82, AD.nogalL); rect(x + 1, 82, x + 1, 105, AD.nogalL); for (let y = 84; y < 104; y += 3) pset(x + 4 + (y % 5), y, AD.nogalS); }
  rect(0, 108, 319, 112, AD.nogalD); rect(0, 108, 319, 108, AD.nogalL);
  // la pantalla de proyección colgada, con su caja y el tirador
  rect(22, 20, 114, 24, AD.k); rect(23, 21, 113, 23, AD.grisL); rect(23, 23, 113, 23, AD.gris); rect(26, 25, 110, 73, AD.k); rect(27, 26, 109, 72, hex('#e8e4d4')); rect(27, 72, 109, 73, AD.grisS); rect(66, 73, 70, 74, AD.k);
  // la ventana con persiana y lo de fuera: nubes bajas, las naves y una colina
  const V = [154, 24, 212, 68]; rect(150, 20, 216, 72, AD.nogalS); rect(151, 21, 215, 71, AD.blanco); rect(153, 23, 213, 69, AD.k);
  for (let y = V[1]; y <= V[3]; y++) for (let x = V[0]; x <= V[2]; x++) B[y * 320 + x] = y < 44 ? (a_um(x, y) < (y - 24) / 20 ? AD.cielo2 : AD.cielo1) : y < 54 ? (y < 50 - Math.sin(x * 0.1) * 3 ? AD.cielo2 : AD.lejos1) : AD.cielo2;
  for (const [x0, x1, top, c] of [[154, 186, 54, AD.gris], [182, 212, 57, hex('#7a8ca0')]]) for (let y = top; y <= 68; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = x % 3 === 0 ? AD.grisS : y === top ? AD.grisD : c;
  rect(154, 66, 212, 68, AD.asfalto);
  for (let y = 24; y < 38; y += 2) { rect(153, y, 213, y, AD.blanco); rect(153, y + 1, 213, y + 1, AD.grisL); } rect(152, 38, 214, 39, AD.aluS); rect(183, 24, 183, 69, AD.blanco); linea(158, 24, 158, 54, AD.grisS); rect(150, 72, 216, 74, AD.blanco);
  // el radiador bajo la ventana
  rect(160, 82, 206, 100, AD.k); for (let x = 161; x < 206; x += 3) { rect(x, 83, x + 1, 99, AD.blanco); pset(x + 1, 83, AD.grisL); }
  // el reloj de pared (las agujas, en el fotograma) y el cuadro con un bichito
  disco(236, 34, 7, AD.k); disco(236, 34, 6, AD.blanco); for (let a = 0; a < 12; a++) pset(Math.round(236 + Math.cos(a * 0.5236) * 5), Math.round(34 + Math.sin(a * 0.5236) * 5), AD.grisS); pset(236, 34, AD.k);
  rect(226, 46, 258, 70, AD.oroS); rect(227, 47, 257, 69, AD.oro); rect(229, 49, 255, 67, hex('#2a4a8a')); for (let i = 0; i < 5; i++) pset(232 + i * 5, 52 + (i % 2) * 2, AD.blanco); rect(229, 62, 255, 67, hex('#4a3a2a')); disco(242, 58, 3, AD.naranjaC); disco(242, 53, 2, hex('#f0c8a0')); for (const i of [-2, 0, 2]) pset(242 + i, 50, AD.verdeC); rect(242 - 7, 50, 242 - 7, 54, AD.rojoC); rect(236, 49, 238, 49, AD.rojoC);
  // el ficus en su maceta
  rect(255, 98, 269, 110, AD.k); rect(256, 99, 268, 110, hex('#a8583a')); rect(256, 99, 268, 100, hex('#c87a52')); rect(261, 70, 262, 98, AD.nogalS);
  for (const [i, j, r] of [[-5, 74, 4], [5, 78, 4], [-4, 84, 4], [4, 88, 4], [-6, 92, 3], [6, 94, 3], [0, 70, 3]]) { disco(262 + i, j, r, AD.leyS); disco(262 + i - 1, j - 1, r - 1, AD.ley); }
  // la puerta con su ventanuco, el picaporte y el interruptor
  rect(274, 46, 310, 112, AD.nogalD); rect(276, 48, 308, 112, AD.nogal); for (const [a, b, c, d] of [[279, 51, 305, 72], [279, 76, 305, 108]]) { rect(a, b, c, d, AD.nogalS); rect(a + 1, b + 1, c, d, AD.nogal); rect(a, b, c, b, AD.nogalL); }
  rect(288, 54, 296, 70, AD.k); rect(289, 55, 295, 69, AD.cielo2); pset(290, 56, AD.blanco); rect(300, 80, 304, 82, AD.oro); rect(268, 66, 271, 71, AD.blanco); pset(269, 68, AD.grisS);
  // la moqueta azul verdosa con dibujo de rombos
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const p = (y - 112) / 68, xs = 160 + (x - 160) / (0.6 + p * 0.4), r = (Math.abs(Math.round(xs) % 16 - 8) + (y - 112) % 8) % 8 === 0; B[y * 320 + x] = r ? hex('#3e5a5e') : h(x, y, 1024) < 0.1 ? hex('#3a5256') : hex('#4a6a6e'); }
  rect(0, 112, 319, 113, hex('#2e4448'));
  // el calendario de pared de los noventa: la foto de arriba (un paisaje con el Tay y el puente) y la rejilla de días
  rect(118, 22, 144, 58, AD.k); rect(119, 23, 143, 57, AD.papel); rect(120, 24, 142, 36, AD.cielo2); rect(120, 31, 142, 36, AD.ley); rect(120, 34, 142, 36, AD.agua); for (let x = 121; x < 142; x += 3) { pset(x, 33, AD.hierro); pset(x + 1, 33, AD.hierro); } rect(120, 32, 142, 32, AD.hierroS);
  rect(130, 20, 132, 22, AD.grisD); for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) { const x = 121 + i * 3, y = 39 + j * 3; pset(x, y, (j * 7 + i) % 9 === 4 ? AD.rojoC : AD.grisS); pset(x + 1, y, AD.grisL); } rect(121, 54, 141, 55, AD.papelS);
  // la sombra de la mesa en la moqueta, el cable del proyector hasta el enchufe y el maletín del de la editorial
  for (let y = 158; y < 180; y++) for (let x = 30; x < 254; x++) if (a_um(x, y) < 0.45) B[y * 320 + x] = hex('#344c50');
  rect(160, 172, 168, 176, AD.k); rect(161, 173, 167, 175, AD.blanco); pset(163, 174, AD.k); pset(165, 174, AD.k);
  rect(256, 140, 274, 152, AD.k); rect(257, 141, 273, 151, hex('#4a2e1e')); rect(257, 141, 273, 142, hex('#6a442c')); rect(262, 137, 268, 140, AD.k); rect(263, 138, 267, 138, hex('#6a442c')); rect(258, 145, 272, 145, hex('#3a2416')); pset(260, 143, AD.oro); pset(270, 143, AD.oro);
  // la papelera de rejilla con papeles arrugados (y uno que no entró)
  { const x = 294, s = 152; rect(x - 7, s - 16, x + 7, s, AD.k); rect(x - 6, s - 15, x + 6, s - 1, AD.grisS); for (let y = s - 14; y < s - 1; y += 2) for (let i = x - 6; i <= x + 6; i += 2) pset(i + (y % 4 ? 1 : 0), y, AD.grisL); rect(x - 7, s - 16, x + 7, s - 15, AD.grisL);
    for (const [i, j, c] of [[-3, -18, AD.papel], [2, -19, AD.papelS], [5, -17, AD.papel], [-1, -21, AD.papel]]) { disco(x + i, s + j, 2, c); pset(x + i - 1, s + j, AD.papelS); } disco(x - 14, s - 1, 2, AD.papel); pset(x - 15, s - 1, AD.papelS); for (let i = -8; i <= 8; i++) pset(x + i, s + 1, hex('#34484c')); }
}

// lo de delante de la sala de reuniones: la mesa larga de nogal con el proyector, el teléfono, la carpeta del documento
// de diseño, papeles, tazas, la jarra de agua y dos sillas en la punta
function a_reunionDelante(R, t, o = {}) {
  const { rect, pset, linea, disco } = R, PG = PIEZAS_GT;
  // las dos sillas de la punta izquierda, de lado
  for (const x of [8, 20]) { rect(x, 132, x + 2, 160, AD.k); rect(x, 148, x + 10, 151, AD.k); rect(x + 1, 149, x + 9, 150, hex('#3a3a50')); rect(x + 9, 151, x + 10, 165, AD.k); rect(x, 151, x + 1, 165, AD.k); rect(x + 1, 133, x + 1, 147, hex('#5a5a72')); }
  // el tablero con su brillo que corre, el faldón y las patas
  rect(28, 143, 252, 151, AD.k); rect(29, 144, 251, 148, AD.nogal); rect(29, 144, 251, 144, AD.nogalL); rect(29, 149, 251, 150, AD.nogalS); for (let x = 30; x < 251; x++) if (h(x >> 3, 1, 1031) < 0.35) pset(x, 146, AD.nogalS);
  { const bx = Math.round(30 + ((t * 20) % 260)); for (let i = 0; i < 12; i++) if (bx + i < 251 && bx + i > 29) pset(bx + i, 145, AD.nogalL); }
  rect(32, 151, 248, 158, AD.k); rect(33, 151, 247, 157, AD.nogalS); for (let x = 40; x < 245; x += 30) rect(x, 152, x, 157, AD.nogalD);
  for (const x of [36, 236]) { rect(x, 158, x + 8, 176, AD.k); rect(x + 1, 158, x + 7, 176, AD.nogalS); rect(x + 1, 158, x + 2, 176, AD.nogal); rect(x - 2, 174, x + 10, 177, AD.k); }
  for (let x = 30; x < 252; x++) if (x % 2) pset(x, 177, hex('#34484c'));
  // la carpeta roja del documento de diseño, abierta con sus hojas (baja: no tapa caras)
  rect(56, 139, 92, 145, AD.k); rect(57, 140, 74, 144, AD.rojoC); rect(74, 140, 91, 144, AD.papel); rect(77, 141, 88, 141, AD.grisS); rect(77, 143, 86, 143, AD.grisS); rect(59, 141, 72, 142, AD.papel); rect(73, 139, 75, 145, AD.rojoBS);
  // papeles sueltos, dos tazas y la jarra con vasos
  rect(98, 141, 110, 144, AD.papelS); rect(99, 141, 110, 143, AD.papel); rect(101, 142, 107, 142, AD.grisS);
  for (const [x, c] of [[112, AD.blanco], [184, AD.azulC]]) { rect(x, 138, x + 5, 144, AD.k); rect(x + 1, 139, x + 4, 144, c); pset(x + 6, 140, AD.k); rect(x + 1, 139, x + 4, 139, AD.nogalD); }
  rect(238, 133, 246, 144, AD.k); rect(239, 134, 245, 144, hex('#c8e0ec')); rect(239, 138, 245, 144, hex('#9ac0d8')); pset(240, 135, AD.blanco); rect(247, 136, 248, 141, AD.k);
  for (const x of [168, 174]) { rect(x, 139, x + 3, 144, hex('#9ab0c0')); pset(x, 139, AD.blanco); }
  // el proyector de transparencias, encendido: la caja beis, el brazo con el espejo y la lente, el ventilador y su cable
  rect(124, 134, 146, 144, AD.k); rect(125, 135, 145, 143, hex('#d8ccb0')); rect(125, 135, 145, 135, AD.papel); rect(127, 136, 143, 138, AD.luzL); rect(140, 140, 144, 142, AD.grisD); for (let x = 128; x < 138; x += 2) pset(x, 141, AD.grisS);
  rect(144, 120, 146, 135, AD.k); rect(130, 116, 146, 122, AD.k); rect(131, 117, 145, 121, AD.grisD); disco(134, 121, 2, AD.luzL); pset(134, 121, AD.blanco);
  linea(146, 143, 150, 151, AD.k); linea(150, 151, 150, 160, AD.k); linea(150, 160, 162, 178, AD.k);
  // el teléfono de los noventa (suena con o.suena)
  if (PG.telefonoNoventa) PG.telefonoNoventa(R, 216, 145, { suena: !!o.suena, t });
  return {};
}

// los colores propios de Londres: el roble oscuro tallado, las vidrieras, el latón, la alfombra, la redacción y la calle
const b_P = pal({
  madO: '#55331f', madOS: '#3a2214', madOL: '#7a4c2c', madOD: '#22140b', madV: '#462817', techo: '#2c1c12', techoL: '#3c281a',
  piedraV: '#a69a82', piedraVS: '#706650', plomo: '#1c1618',
  vAzul: '#2c5cc4', vAzulL: '#6a9aee', vRojo: '#b8302c', vRojoL: '#ee6a5e', vOro: '#d8a838', vOroL: '#fae08a',
  vVerde: '#2e8a52', vVerdeL: '#66c486', vMorado: '#6c3aaa', vBlanco: '#dcdcc4', vBlancoS: '#b4c0b0',
  rojoL: '#d0524a', rojoD: '#4c1412', alfombra: '#5e2220', alfombraS: '#46181a', alfombraL: '#7a3428', alfombraO: '#a2763a',
  laton: '#c8a048', latonS: '#866424', latonL: '#f2d68a', llama: '#ffc860', llamaL: '#fff4c4',
  verdeMesa: '#2e5a40', verdeMesaL: '#4c7a58', peluca: '#e6e2d6', toga: '#b83a34', togaS: '#7e2420',
  // la redacción
  techoR: '#cfc8b4', techoRS: '#aaa290', paredR: '#cdc49e', paredRS: '#b0a682', paredRL: '#ddd6b6', zocalo: '#7a7262',
  moq: '#5a6478', moqS: '#4a5266', moqL: '#6c7690', beigeL: '#ece2c8', mesaR: '#8a8e96', mesaRS: '#62666e', mesaRL: '#b4b8c0',
  pantalla: '#1c2e3a', pantallaL: '#7ae0a8', tubo: '#f4f8f0', papelP: '#f2ecd8', cabecera: '#d42a26',
  // la calle
  cieloL1: '#9aa6b4', cieloL2: '#8894a4', cieloL3: '#76829a', nubeL1: '#c4ccd6', nubeL2: '#a6b0be', nubeL3: '#8a94a6',
  ladrilloL: '#8e4e36', ladrilloLS: '#6a3626', ladrilloLL: '#a86244', estuco: '#d8d2c2', estucoS: '#aea896', estucoL: '#eeeae0',
  pizarraT: '#4a5260', pizarraTS: '#363c48', ventanaL: '#f4d488', ventanaO: '#3a4250', calzada: '#3c4048', calzadaL: '#545a64',
  losa: '#7c7c78', losaS: '#62625e', losaL: '#9a9a94', charco: '#5a6474', bus: '#c8221e', busS: '#8a1612', busL: '#ee5a4a',
  taxi: '#1e2024', taxiL: '#4a4e58', kiosco: '#1e4a34', kioscoS: '#123224', kioscoL: '#2e6a4c', toldo: '#18302a', toldoL: '#c8bc8a',
  gota: '#c8d6e6', paraguas: '#24262c',
});

const b_VENT_L = [[14, 42], [54, 82], [92, 118], [202, 228], [240, 266]];

const b_GRADAS = [92, 104, 116];       // las tres gradas de cada lado (y del respaldo)

// los lores de las gradas: [lado (−1 izquierda, 1 derecha), grada, x, tipo, ropa]
const b_LORES = (() => { const L = [];
  for (let g = 0; g < 3; g++) for (const lado of [-1, 1]) for (let i = 0; i < 7; i++) {
    const x = lado < 0 ? 4 + i * 14 + (g % 2) * 5 : 214 + i * 14 + (g % 2) * 4, fin = lado < 0 ? 100 + g * 5 : 210 - g * 5;
    if ((lado < 0 && x + 9 > fin) || (lado > 0 && x < fin) || x > 308) continue;
    if (h(g, i * 3 + lado, 501) < 0.2) continue;
    const r = h(g, i + lado * 7, 502); L.push([lado, g, x, r < 0.18 ? 'peluca' : r < 0.78 ? 'calvo' : 'mujer', r]); }
  return L; })();

function b_lores(R, t, o) {
  const { rect, pset, disco, linea } = R, P = b_P, K = C.k;
  const capa = b_capa(R, 'lores', () => {
    // el techo de casetones de roble con las bosas doradas, apagadas (fondo tranquilo bajo la barra del año)
    rect(0, 0, 319, 13, P.techo);
    for (let x = 0; x < 320; x += 32) { rect(x, 0, x + 2, 13, P.madOD); pset(x + 1, 6, P.latonS); }
    for (let x = 0; x < 320; x += 32) for (let y = 2; y < 12; y += 3) rect(x + 5, y, x + 29, y, P.techoL);
    rect(0, 12, 319, 13, P.madOD);
    // la cornisa tallada con sus dentículos
    rect(0, 14, 319, 16, P.madOS); for (let x = 1; x < 320; x += 3) pset(x, 15, P.madOL); rect(0, 17, 319, 17, P.madOD);
    // la pared de roble con paneles de pliegues
    rect(0, 18, 319, 90, P.madO);
    for (let c = 0; c < 20; c++) { const x0 = c * 16; b_pliegues(R, x0 + 2, 20, x0 + 14, 50, c); b_pliegues(R, x0 + 2, 54, x0 + 14, 70, c + 30); }
    rect(0, 51, 319, 52, P.madOS); rect(0, 71, 319, 72, P.madOS);
    // las vidrieras
    b_mascara.lores = []; for (const [a, b] of b_VENT_L) b_vidriera(R, a, 20, b, 66, a, b_mascara.lores);
    // el trono, genérico: el dosel dorado con pináculos y arquerías, el paño de oro, el sillón con su terciopelo, los
    // escalones con alfombra y la baranda de latón
    rect(126, 18, 194, 92, P.madOD);
    for (let i = 0; i < 9; i++) { const x = 130 + i * 8; rect(x, 22, x + 1, 30, C.oroS); pset(x, 20, C.oro); pset(x + 1, 21, C.oro); pset(x, 21, C.oroL); }
    rect(128, 30, 192, 44, K); rect(129, 31, 191, 43, C.oro);
    for (let i = 0; i < 8; i++) { const x = 131 + i * 8; for (let y = 33; y < 42; y++) { const w = y < 37 ? (y - 33) * 0.8 : 3; pset(Math.round(x + 3 - w), y, C.oroS); pset(Math.round(x + 3 + w), y, C.oroS); } pset(x + 3, 32, C.oroL); }
    rect(129, 31, 191, 31, C.oroL); rect(129, 43, 191, 43, C.oroS);
    for (let y = 44; y < 84; y++) for (let x = 132; x < 189; x++) pset(x, y, ((x >> 1) + (y >> 1)) % 4 === 0 ? C.oroS : h(x, y, 503) < 0.15 ? hex('#9a7a3a') : hex('#7a5a2a'));
    rect(130, 44, 132, 84, C.oro); rect(188, 44, 190, 84, C.oro); rect(130, 44, 130, 84, C.oroL);
    rect(147, 46, 173, 84, K); rect(148, 47, 172, 84, C.oro); rect(148, 47, 172, 47, C.oroL);
    for (let i = 0; i < 4; i++) { pset(150 + i * 7, 45, C.oro); pset(150 + i * 7, 44, C.oroL); }
    rect(152, 51, 168, 76, P.rojoD); rect(153, 52, 167, 76, C.rojoLores);
    for (let y = 53; y < 76; y += 4) for (let x = 154 + ((y >> 2) % 2) * 2; x < 167; x += 4) { pset(x, y, P.rojoL); pset(x + 1, y + 1, C.rojoLoresS); }
    disco(160, 49, 4, K); disco(160, 49, 3, C.oro); pset(159, 48, C.oroL); pset(160, 49, C.rojoLores);
    rect(150, 76, 170, 84, C.oroS); rect(151, 77, 169, 80, C.rojoLores); rect(151, 77, 169, 77, P.rojoL);
    for (let s = 0; s < 3; s++) { const y = 84 + s * 3, a = 136 - s * 6, b = 184 + s * 6; rect(a, y, b, y + 2, C.rojoLores); rect(a, y, b, y, C.oro); rect(a, y + 2, b, y + 2, C.rojoLoresS); }
    rect(122, 88, 198, 88, P.latonS); rect(122, 87, 198, 87, P.laton); for (let x = 124; x < 198; x += 12) rect(x, 87, x + 1, 93, P.latonS);
    // los candelabros altos a los lados del trono
    for (const cx of [120, 200]) { rect(cx - 1, 60, cx + 1, 94, P.latonS); rect(cx, 60, cx, 94, P.laton); rect(cx - 4, 92, cx + 4, 94, P.latonS); rect(cx - 3, 58, cx + 3, 60, P.laton); rect(cx - 1, 54, cx + 1, 57, C.blanco); }
    // la galería: el frente tallado con arquillos, las cabezas del público van encima en cada fotograma
    rect(0, 74, 125, 89, P.madOS); rect(195, 74, 319, 89, P.madOS);
    for (const [a, b] of [[0, 125], [195, 319]]) { rect(a, 74, b, 75, P.madOL); rect(a, 76, b, 76, C.oroS); rect(a, 88, b, 89, P.madOD);
      for (let x = a + 2; x < b - 4; x += 7) for (let y = 78; y < 87; y++) { const w = y < 81 ? (y - 78) * 0.7 : 2; pset(Math.round(x + 2 - w), y, P.madOD); pset(Math.round(x + 2 + w), y, P.madOL); } }
    // el cojín rojo delante del trono
    rect(140, 95, 180, 107, K); rect(141, 96, 179, 106, C.rojoLores); rect(141, 96, 179, 97, P.rojoL); rect(141, 105, 179, 106, C.rojoLoresS);
    for (let x = 145; x < 178; x += 6) { pset(x, 101, C.rojoLoresS); pset(x, 100, P.rojoL); }
    // la alfombra roja con su dibujo de rombos dorados, más separados cuanto más cerca
    rect(0, 90, 319, 179, P.alfombra);
    for (let r = 0; r < 12; r++) { const y = 108 + Math.round(r * 5 + r * r * 0.35); if (y > 177) break; const paso = 10 + r * 2, off = (r % 2) * (paso >> 1);
      for (let x = off; x < 320; x += paso) { pset(x, y, P.alfombraO); pset(x - 1, y + 1, P.alfombraL); pset(x + 1, y + 1, P.alfombraL); pset(x, y + 2, P.alfombraO); } }
    for (let y = 92; y < 180; y += 3) for (let x = (y % 2) * 2; x < 320; x += 5) if (h(x, y, 504) < 0.3) pset(x, y, P.alfombraS);
    // las gradas: el frente de madera de cada una y el canto tallado de su extremo
    for (let g = 0; g < 3; g++) { const y = b_GRADAS[g], yb = g < 2 ? b_GRADAS[g + 1] - 1 : 128;
      for (const lado of [-1, 1]) { const a = lado < 0 ? 0 : 210 - g * 5, b = lado < 0 ? 100 + g * 5 : 319;
        rect(a, y + 6, b, yb, P.madO); rect(a, y + 6, b, y + 6, P.madOS); rect(a, y + 8, b, y + 8, P.madOL);
        for (let x = a + 3; x < b - 2; x += 9) rect(x, y + 9, x, yb - 1, P.madV);
        const xe = lado < 0 ? b : a; rect(xe - 2, y - 4, xe + 2, yb, K); rect(xe - 1, y - 3, xe + 1, yb, P.madOL); pset(xe, y - 5, P.madOL); pset(xe, y - 6, C.oroS); } }
    rect(0, 128, 125, 130, P.alfombraS); rect(195, 128, 319, 130, P.alfombraS);
    // la mesa de los secretarios: el tablero con el cuero verde, el frente de cuarterones, el zócalo y su sombra
    b_sombra(R, 160, 146, 50, 3, 0.75);
    rect(114, 114, 206, 122, K); rect(115, 115, 205, 121, P.madOL); rect(118, 116, 202, 119, P.verdeMesa); rect(118, 116, 202, 116, P.verdeMesaL); rect(115, 120, 205, 121, P.madOS);
    rect(116, 122, 204, 144, K); rect(117, 123, 203, 143, P.madO);
    for (let k = 0; k < 6; k++) b_cuarteron(R, 120 + k * 14, 126, 131 + k * 14, 140, P.madO, P.madOL, P.madOD, P.madV, k);
    rect(117, 141, 203, 143, P.madOS);
    // los libros, el tintero y las cajas de despachos
    for (let i = 0; i < 5; i++) { const x = 119 + i * 3, c = [P.rojoD, P.verdeMesa, C.maderaS, P.vAzul, P.rojoD][i]; rect(x, 107 - (i % 2), x + 2, 115, K); rect(x, 108 - (i % 2), x + 1, 115, c); pset(x, 110, C.oroS); }
    rect(136, 112, 140, 115, K); rect(137, 112, 139, 114, P.laton); pset(138, 111, K); linea(139, 111, 142, 106, C.blanco);
    for (const x of [188, 196]) { rect(x - 4, 108, x + 4, 115, K); rect(x - 3, 109, x + 3, 114, x === 188 ? P.rojoD : P.vAzul); rect(x - 3, 109, x + 3, 109, P.laton); pset(x, 112, P.latonL); }
    // la maza dorada, tumbada sobre su cojín
    rect(144, 114, 182, 115, C.rojoLoresS);
    rect(146, 111, 178, 113, K); rect(147, 112, 177, 112, C.oro); for (let x = 150; x < 177; x += 6) pset(x, 112, C.oroS);
    disco(181, 111, 4, K); disco(181, 111, 3, C.oro); pset(180, 110, C.oroL); rect(184, 110, 186, 112, K); pset(185, 111, C.oro);
    disco(146, 112, 2, K); pset(146, 112, C.oroS);
    // la luz de las vidrieras de la izquierda, en rayos que bajan a la derecha
    for (const [a, b] of b_VENT_L.slice(0, 3)) b_luz(R, a + 4, 72, b - 4, 150, 0.45, 0.1, hex('#ffe8b0'));
    for (const [a, b] of b_VENT_L.slice(3)) b_luz(R, a + 4, 72, b - 4, 120, -0.25, 0.08, hex('#ffe8b0'));
    // la esquina de Atom, apagada
    b_calma(R, 272, 0, 319, 50, P.madO, 0.55);
  });
  R.copiar(capa);
  // el destello que pasa por las vidrieras (una nube se aparta)
  b_destello(R, b_mascara.lores, t, 26);
  // las arañas de latón con sus velas
  for (const cx of [86, 236]) b_arana(R, cx, 38, t);
  // las velas de los candelabros del trono
  for (const cx of [120, 200]) b_llama(R, cx, 53, t, cx);
  // el público diminuto de la galería
  for (let i = 0; i < 16; i++) { const x = i < 8 ? 6 + i * 15 : 200 + (i - 8) * 13, lado = h(i, 1, 505); if (x > 270) continue;
    const y = 69 + Math.round(Math.sin(t * 0.7 + i * 1.7) * 0.6), dx = Math.round(Math.sin(t * 0.4 + i) * (lado < 0.3 ? 1 : 0));
    const ropa = [hex('#3a3e52'), hex('#5a3a2a'), hex('#2e4a3a'), hex('#6a5a4a')][i % 4]; rect(x - 3 + dx, y + 3, x + 3 + dx, 74, ropa); rect(x - 3 + dx, y + 3, x + 3 + dx, y + 3, b_mezcla(ropa, C.blanco, 0.2));
    disco(x + dx, y, 2.4, K); disco(x + dx, y, 1.8, [hex('#f0c8a0'), hex('#c89068'), hex('#8a5a3a')][i % 3]); rect(x - 2 + dx, y - 2, x + 2 + dx, y - 2, [hex('#3a2418'), hex('#c8c0b0'), hex('#5a3a1a')][i % 3]); }
  // los lores de las gradas, sentados detrás de su respaldo rojo (uno cabecea, uno agita el papel, otro se lleva la mano a
  // la oreja)
  b_gradasLores(R, t, b_LORES, b_GRADAS, (lado, g) => lado < 0 ? [0, 100 + g * 5] : [210 - g * 5, 319]);
  // los secretarios con peluca, que escriben con pluma detrás de la mesa
  for (const [x, k] of [[124, 0], [190, 1]]) { R.busto('peluca', tela('#2a2a34', '#1a1a22', { H: '#e6e2d6', Y: '#f4f4f0', O: '#2a2a34' }), x - 4, 101, t + k * 1.3);
    rect(x - 5, 113, x + 5, 115, P.madOL); const px = x + 2 + Math.round(Math.sin(t * 5 + k * 2) * 2); linea(px, 113, px + 2, 108, C.blanco); pset(px, 113, K); }
  // el brillo que corre por la maza
  { const g = (t % 4) / 1.2; if (g < 1) { const x = Math.round(lerp(148, 182, g)); pset(x, 112, C.blanco); pset(x + 1, 111, C.oroL); } }
  // motas de polvo en los rayos de luz
  b_motas(R, t, 18, 30, 72, 120, 70, 0.45);
  return { suelo: 152, mesa: [116, 116, 204], maza: [146, 112, 186], trono: [160, 60], izquierda: [12, 96], derecha: [222, 300] };
}

// los bancos rojos de primer término de los Lores: respaldo de cuero con botones, el remate dorado, la madera tallada
function b_loresDelante(R, t) {
  const { rect, pset } = R, P = b_P, K = C.k;
  for (const [a, b] of [[-2, 104], [216, 322]]) {
    rect(a, 158, b, 179, K); rect(a + 1, 162, b - 1, 170, C.rojoLores); rect(a + 1, 162, b - 1, 162, P.rojoL); rect(a + 1, 170, b - 1, 170, C.rojoLoresS);
    for (let y = 164; y < 170; y += 3) for (let x = a + 3 + ((y / 3) % 2) * 3; x < b - 2; x += 6) { pset(x, y, C.rojoLoresS); pset(x - 1, y - 1, P.rojoL); }
    rect(a + 1, 159, b - 1, 161, P.madOL); rect(a + 1, 159, b - 1, 159, C.oroS); for (let x = a + 2; x < b; x += 4) pset(x, 160, C.oro);
    rect(a + 1, 171, b - 1, 179, P.madO); for (let x = a + 4; x < b - 3; x += 12) b_cuarteron(R, x, 173, x + 9, 179, P.madO, P.madOL, P.madOD, P.madV, x);
    const xe = a < 0 ? b : a; rect(xe - 3, 152, xe + 3, 179, K); rect(xe - 2, 153, xe + 2, 179, P.madOL); rect(xe - 1, 150, xe + 1, 152, K); pset(xe, 150, C.oroS);
  }
  // el reflejo que corre por el remate dorado
  const g = ((t * 22) % 400) - 40; for (const x of [g, g + 1]) if ((x > 0 && x < 103) || (x > 217 && x < 320)) pset(Math.round(x), 159, C.oroL);
}

const b_GRADAS_B = [64, 86, 108, 128];

const b_LORES_B = (() => { const L = [];
  for (let g = 0; g < 4; g++) for (let i = 0; i < 19; i++) { const x = 3 + i * 17 + (g % 2) * 8 + Math.round(h(g, i, 508) * 3); if (x > 310) continue;
    if (g === 3 && x > 104 && x < 200) continue; if (g === 0 && x > 268) continue; if (x > 224 && x < 252) continue; if (h(g, i, 506) < 0.3) continue;
    const r = h(g, i, 507); L.push([1, g, x, r < 0.15 ? 'peluca' : r < 0.75 ? 'calvo' : 'mujer', r]); }
  return L; })();

function b_loresBanco(R, t, o) {
  const { rect, pset } = R, P = b_P, K = C.k;
  const capa = b_capa(R, 'loresBanco', () => {
    rect(0, 0, 319, 7, P.techo); for (let x = 6; x < 320; x += 26) rect(x, 0, x + 2, 7, P.madOD); rect(0, 7, 319, 8, P.madOD);
    rect(0, 9, 319, 60, P.madO);
    for (let c = 0; c < 22; c++) { const x0 = c * 15; b_pliegues(R, x0 + 2, 11, x0 + 13, 34, c + 60); b_pliegues(R, x0 + 2, 38, x0 + 13, 58, c + 90); }
    rect(0, 35, 319, 36, P.madOS); rect(0, 59, 319, 60, P.madOS);
    b_mascara.banco = []; b_vidriera(R, 18, 20, 56, 60, 7, b_mascara.banco); b_vidriera(R, 208, 20, 246, 60, 9, b_mascara.banco);
    // las arquerías talladas con dorados entre las vidrieras
    rect(70, 18, 194, 36, P.madOS); for (let x = 72; x < 192; x += 10) { for (let y = 21; y < 35; y++) { const w = y < 25 ? (y - 21) * 1.1 : 4; pset(Math.round(x + 4 - w), y, C.oroS); pset(Math.round(x + 4 + w), y, P.madOD); } pset(x + 4, 19, C.oro); }
    rect(70, 36, 194, 37, C.oroS);
    // las gradas: cada una con su frente de madera tallada y la alfombra del pasillo
    rect(0, 60, 319, 179, P.alfombra);
    for (let g = 0; g < 4; g++) { const y = b_GRADAS_B[g], yb = g < 3 ? b_GRADAS_B[g + 1] - 1 : 148;
      rect(0, y + 6, 319, yb, P.madO); rect(0, y + 6, 319, y + 8, C.rojoLoresS); rect(0, y + 6, 319, y + 6, P.rojoL); rect(0, y + 9, 319, y + 9, P.madOD); rect(0, y + 10, 319, y + 10, P.madOL);
      for (let x = (g % 2) * 8 + 2; x < 320; x += 16) b_cuarteron(R, x, y + 12, x + 12, yb - 2, P.madO, P.madOL, P.madOD, P.madV, x + g * 40); }
    // el suelo delante de la grada de abajo: alfombra con su dibujo y la sombra del banco
    rect(0, 149, 319, 179, P.alfombra); rect(0, 149, 319, 151, P.alfombraS);
    for (let r = 0; r < 5; r++) { const y = 153 + r * 6; for (let x = (r % 2) * 7; x < 320; x += 14) { pset(x, y, P.alfombraO); pset(x - 1, y + 1, P.alfombraL); pset(x + 1, y + 1, P.alfombraL); pset(x, y + 2, P.alfombraO); } }
    b_luz(R, 20, 61, 54, 150, 0.4, 0.09, hex('#ffe8b0')); b_luz(R, 210, 61, 244, 150, 0.4, 0.09, hex('#ffe8b0'));
    b_calma(R, 266, 0, 319, 50, P.madO, 0.55);
  });
  R.copiar(capa);
  b_destello(R, b_mascara.banco, t, 30);
  // los apliques de latón
  for (const cx of [98, 166]) { rect(cx - 1, 40, cx + 1, 50, P.latonS); rect(cx - 5, 46, cx + 5, 47, P.laton); for (const dx of [-5, 0, 5]) { rect(cx + dx, 42, cx + dx, 45, C.blanco); b_llama(R, cx + dx, 41, t, cx + dx); } }
  b_gradasLores(R, t, b_LORES_B, b_GRADAS_B, () => [0, 319]);
  // los sitios vacíos: un sombrero, papeles, un bolso
  for (let g = 0; g < 4; g++) for (let i = 0; i < 4; i++) { const x = 12 + ((g * 83 + i * 71) % 290), y = b_GRADAS_B[g] - 3; if ((x > 220 && x < 254) || (g === 3 && x > 100 && x < 204)) continue;
    if (b_LORES_B.some(([, gg, xx]) => gg === g && Math.abs(xx + 4 - x) < 10)) continue;
    const k = (g + i) % 3; if (k === 0) { rect(x - 4, y + 1, x + 4, y + 2, K); rect(x - 2, y - 2, x + 2, y + 1, K); rect(x - 3, y + 1, x + 3, y + 1, hex('#2a2a2e')); } else if (k === 1) { rect(x - 3, y, x + 3, y + 2, K); rect(x - 2, y, x + 2, y + 1, C.papel); } else { rect(x - 3, y - 1, x + 2, y + 2, K); rect(x - 2, y, x + 1, y + 2, hex('#6a3a2a')); pset(x - 1, y - 2, K); pset(x, y - 2, K); } }
  // la escalera del pasillo entre las gradas, con su pasamanos de latón
  for (let g = 0; g < 4; g++) { const y = b_GRADAS_B[g]; rect(226, y, 250, y + 6, P.alfombraL); rect(226, y, 250, y, P.alfombraO); rect(226, y + 6, 250, y + 6, P.alfombraS); }
  R.linea(252, 58, 252, 148, P.latonS); for (const y of [64, 86, 108, 128]) { rect(251, y - 4, 253, y - 3, P.laton); }
  b_motas(R, t, 22, 26, 62, 140, 40, 0.4);
  return { suelo: 156, hueco: [112, 200], escalera: [226, 250], vidrieras: [[18, 56], [208, 246]] };
}

// el respaldo del banco de delante, de cerca: el remate dorado, el cuero con botones, el orden del día, unas gafas
function b_bancoDelante(R, t) {
  const { rect, pset, linea } = R, P = b_P, K = C.k;
  rect(0, 162, 319, 179, K); rect(0, 166, 319, 179, C.rojoLores); rect(0, 166, 319, 166, P.rojoL);
  for (let y = 169; y < 180; y += 4) for (let x = ((y / 4) % 2) * 4 + 2; x < 320; x += 8) { pset(x, y, C.rojoLoresS); pset(x - 1, y - 1, P.rojoL); }
  rect(0, 163, 319, 165, P.madOL); rect(0, 163, 319, 163, C.oroS); for (let x = 1; x < 320; x += 4) pset(x, 164, C.oro);
  // los papeles del orden del día (uno se levanta con la corriente) y las gafas
  for (const [x, w] of [[30, 20], [250, 18]]) { rect(x, 159, x + w, 162, K); rect(x + 1, 159, x + w - 1, 161, C.papel); for (let i = x + 3; i < x + w - 2; i += 4) pset(i, 160, C.grisL); }
  { const a = Math.round(Math.max(0, Math.sin(t * 1.6)) * 3); linea(270, 162, 284, 162 - a, K); linea(270, 161, 284, 161 - a, C.papel); }
  rect(78, 160, 81, 162, K); rect(84, 160, 87, 162, K); pset(79, 161, hex('#a8c8e8')); pset(85, 161, hex('#a8c8e8')); pset(82, 160, K); pset(83, 160, K);
  const g = ((t * 26) % 420) - 50; for (const x of [g, g + 1]) if (x > 0 && x < 320) pset(Math.round(x), 163, C.oroL);
}

const b_VENTANA_R = [12, 22, 104, 84];   // el hueco de la ventana (x0, y0, x1, y1)

function b_redaccion(R, t, o) {
  const { rect, pset, disco, linea } = R, P = b_P, K = C.k, [vx0, vy0, vx1, vy1] = b_VENTANA_R;
  const capa = b_capa(R, 'redaccion', () => {
    // el techo de placas con manchas de humedad
    rect(0, 0, 319, 11, P.techoR); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 11, P.techoRS); rect(0, 5, 319, 5, P.techoRS);
    for (let k = 0; k < 40; k++) pset(Math.floor(h(k, 1, 520) * 320), Math.floor(h(k, 2, 520) * 11), P.techoRS);
    for (const x0 of [48, 128, 208]) { rect(x0, 1, x0 + 36, 4, P.techoRS); }
    rect(0, 11, 319, 12, P.zocalo);
    // la pared, pintada y gastada, con el zócalo
    rect(0, 13, 319, 112, P.paredR);
    for (let y = 13; y < 112; y++) for (let x = (y % 3); x < 320; x += 3) { const v = h(x, y, 521); if (v < 0.12) pset(x, y, P.paredRS); else if (v > 0.93) pset(x, y, P.paredRL); }
    rect(0, 94, 319, 95, P.paredRL); rect(0, 96, 319, 96, P.zocalo); rect(0, 97, 319, 112, P.paredRS);
    for (let x = 0; x < 320; x += 24) rect(x, 97, x, 112, b_mezcla(P.paredRS, K, 0.15));
    // Londres por la ventana, bajo la lluvia: cielo tramado gris, la cúpula, la grúa, las torres y los tejados
    b_mascara.ventana = new Uint8Array(320 * 180);
    for (let y = vy0; y <= vy1; y++) for (let x = vx0; x <= vx1; x++) { const u = (y - vy0) / (vy1 - vy0), c = u + (h(x, y, 522) - 0.5) * 0.18; pset(x, y, c < 0.33 ? P.cieloL3 : c < 0.66 ? P.cieloL2 : P.cieloL1); b_mascara.ventana[y * 320 + x] = 1; }
    R.recorte([vx0, vy0, vx1, vy1]);
    const lejos = hex('#7e8898'), medio = hex('#646e80');
    for (let k = 0; k < 12; k++) { const x = vx0 + k * 8, hh = 10 + Math.round(h(k, 3, 523) * 14); R.poligono([[x, vy1], [x, vy1 - hh], [x + 7, vy1 - hh], [x + 7, vy1]], lejos); }
    R.disco(46, 56, 9, lejos); R.poligono([[37, 58], [55, 58], [55, 70], [37, 70]], lejos); R.linea(46, 44, 46, 47, lejos); R.disco(46, 47, 1.5, lejos);
    for (let k = 0; k < 4; k++) R.linea(39 + k * 5, 58, 39 + k * 5, 70, hex('#6e788a'));
    R.linea(86, 34, 86, 70, medio); R.linea(70, 36, 100, 36, medio); R.linea(86, 34, 72, 36, medio); R.linea(86, 34, 98, 36, medio); for (let y = 38; y < 70; y += 3) R.pset(85, y, medio);
    for (let k = 0; k < 7; k++) { const x = vx0 + k * 14, top = 62 + Math.round(h(k, 4, 524) * 6); R.poligono([[x, vy1], [x, top], [x + 6, top - 3], [x + 13, top], [x + 13, vy1]], k % 2 ? hex('#5a6272') : hex('#4e5666'));
      for (let j = top + 2; j < 76; j += 4) for (let i = x + 2; i < x + 12; i += 4) R.pset(i, j, h(i, j, 525) < 0.4 ? hex('#e8d090') : hex('#3a404c')); R.linea(x + 9, top - 4, x + 9, top - 1, hex('#3a404c')); }
    // la calle de abajo, mojada
    R.poligono([[vx0, 77], [vx1, 77], [vx1, vy1], [vx0, vy1]], hex('#3e4450')); for (let x = vx0; x <= vx1; x += 3) R.pset(x, 80, hex('#5a6270'));
    R.recorte(null);
    // la persiana veneciana medio bajada, el marco y el alféizar
    for (let y = vy0; y < vy0 + 18; y += 2) { rect(vx0, y, vx1, y, hex('#e6e2d4')); rect(vx0, y + 1, vx1, y + 1, hex('#b8b4a4')); }
    rect(vx0, vy0 + 18, vx1, vy0 + 19, hex('#9a968a'));
    rect(vx0 - 3, vy0 - 3, vx1 + 3, vy0 - 1, hex('#e8e6de')); rect(vx0 - 3, vy0 - 3, vx0 - 1, vy1 + 2, hex('#e8e6de')); rect(vx1 + 1, vy0 - 3, vx1 + 3, vy1 + 2, hex('#c8c6be'));
    rect(vx0 - 5, vy1 + 1, vx1 + 5, vy1 + 4, hex('#f0eee6')); rect(vx0 - 5, vy1 + 4, vx1 + 5, vy1 + 4, P.paredRS);
    // el radiador bajo la ventana
    rect(20, 90, 96, 106, K); rect(21, 91, 95, 105, hex('#e4e0d4')); for (let x = 23; x < 95; x += 4) rect(x, 92, x + 1, 104, hex('#bcb8aa'));
    // la pared de primeras planas clavadas: cabecera roja, titulares de barras, el coche y el rayo
    for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) { const x = 116 + i * 25 + (j % 2) * 3, y = 18 + j * 34 + Math.round(h(i, j, 526) * 3), k = j * 6 + i;
      b_portada(R, x, y, k); }
    // el reloj de pared y el perchero con el abrigo y el paraguas
    disco(298, 64, 8, K); disco(298, 64, 7, hex('#f4f2ea')); disco(298, 64, 7, (x, y, d) => (d > 0.85 ? hex('#3a3a46') : hex('#f4f2ea')));
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(298 + Math.cos(a) * 5), Math.round(64 + Math.sin(a) * 5), k % 3 ? C.grisL : K); }
    rect(286, 74, 287, 110, hex('#3a3a3e')); rect(282, 110, 291, 111, hex('#3a3a3e')); rect(283, 75, 290, 75, hex('#3a3a3e'));
    R.poligono([[280, 77], [292, 77], [294, 100], [278, 100]], K); R.poligono([[281, 78], [291, 78], [293, 99], [279, 99]], hex('#5a4a3a')); rect(285, 78, 287, 96, hex('#4a3a2a'));
    linea(299, 80, 301, 108, K); linea(300, 80, 302, 108, P.paraguas); pset(298, 79, K); pset(297, 80, K);
    // la tele en su brazo, arriba entre la pared de planas y el reloj
    rect(268, 82, 276, 84, hex('#3a3a3e')); rect(250, 78, 272, 96, K); rect(251, 79, 271, 95, hex('#2e2e34'));
    // la moqueta de losetas con manchas, el cable con cinta y la sombra de las mesas
    rect(0, 113, 319, 179, P.moq);
    for (let y = 113; y < 180; y += 10) for (let x = (Math.floor(y / 10) % 2) * 8; x < 320; x += 16) { if (h(x, y, 527) < 0.5) rect(x, y, x + 15, Math.min(179, y + 9), P.moqS); }
    for (let y = 113; y < 180; y += 2) for (let x = (y % 4) / 2; x < 320; x += 4) if (h(x, y, 528) < 0.25) pset(x, y, P.moqL);
    for (const [x, y, r] of [[60, 150, 5], [172, 168, 4], [130, 140, 3]]) R.disco(x, y, r, (xx, yy, d) => (d > 0.7 ? hex('#4e5060') : hex('#545462')));
    linea(0, 138, 140, 132, K); for (let x = 30; x < 130; x += 34) { const y = 138 - Math.round(x * 6 / 140); rect(x, y - 1, x + 5, y + 1, hex('#8a8a7a')); rect(x, y - 1, x + 5, y - 1, hex('#a8a898')); }
    rect(0, 113, 319, 116, P.moqS);
    // las mesas del fondo, con el canto y la sombra
    for (const [a, b] of [[4, 108], [148, 246], [254, 319]]) { rect(a, 106, b, 110, K); rect(a + 1, 107, b - 1, 108, P.mesaRL); rect(a + 1, 109, b - 1, 109, P.mesaR); rect(a + 2, 111, b - 2, 120, P.mesaRS); rect(a + 2, 111, b - 2, 111, K); rect(a + 2, 121, b - 2, 123, P.moqS); }
    // el teletipo, la máquina grande de la derecha de la ventana
    rect(112, 96, 140, 120, K); rect(113, 97, 139, 119, hex('#8a8a7a')); rect(113, 97, 139, 98, hex('#aaa898')); rect(116, 101, 136, 106, hex('#3a3a36')); rect(117, 109, 135, 117, hex('#6e6e60'));
    for (let x = 119; x < 134; x += 3) pset(x, 112, hex('#c8c8b8'));
  });
  R.copiar(capa);
  // las nubes que pasan, la lluvia y las gotas que resbalan por el cristal; el autobús rojo de dos pisos por la calle
  R.recorte([vx0, vy0 + 20, vx1, vy1]);
  for (let k = 0; k < 3; k++) b_nubeMascara(R, b_mascara.ventana, ((t * (2 + k * 1.5) + k * 50) % 140) + vx0 - 20, 46 + k * 5, 14 - k * 2, k);
  { const tt = t + (o.trafico ?? 0), u = b_mod(tt + 3, 16) / 7; if (u < 1) b_autobus(R, Math.round(lerp(vx1 + 6, vx0 - 76, u)), 84, 0.42, [vx0, vy0 + 20, vx1, vy1], tt); }
  R.recorte(null);
  b_lluviaVentana(R, t, vx0, vy0 + 20, vx1, vy1);
  // la tele: el telediario (la presentadora y un gráfico que cambia; sin letras)
  { const g = Math.floor(t / 2.5) % 3; rect(252, 80, 270, 94, g === 2 ? hex('#a82a26') : hex('#1e3a6a')); R.recorte([252, 80, 270, 94]);
    if (g === 0) { disco(258, 86, 2.5, hex('#f0c8a0')); rect(255, 89, 261, 94, hex('#3a4a8a')); rect(255, 83, 261, 84, hex('#5a3418')); rect(263, 84, 269, 89, C.blanco); pset(266, 86, C.rojo); }
    else if (g === 1) for (let i = 0; i < 4; i++) { const hb = 3 + Math.round((0.5 + 0.5 * Math.sin(t * 2 + i)) * 6); rect(254 + i * 4, 92 - hb, 256 + i * 4, 92, i === 3 ? C.rojo : C.azulL); }
    else { b_cochito(R, 256, 85, C.blanco); b_rayo(R, 266, 82, C.amarillo); }
    R.recorte(null); rect(252, 92, 270, 93, hex('#c8c8c8')); pset(269, 81, Math.floor(t * 2) % 2 ? C.rojo : hex('#5a1a1a')); }
  // las agujas del reloj
  { const a = (t / 60) * Math.PI * 2 - Math.PI / 2; linea(298, 64, 298 + Math.round(Math.cos(1.2) * 4), 64 + Math.round(Math.sin(1.2) * 4), K); linea(298, 64, 298 + Math.round(Math.cos(a) * 5), 64 + Math.round(Math.sin(a) * 5), C.rojo); }
  // los tubos fluorescentes (el del medio parpadea)
  for (const x0 of [48, 128, 208]) { const on = x0 !== 208 || !b_parpadeo(t, 5.3); rect(x0 + 1, 2, x0 + 35, 3, on ? P.tubo : hex('#c8c8b8')); if (on) for (let x = x0 + 2; x < x0 + 35; x += 2) pset(x, 4, hex('#fffbe8')); }
  // el teletipo escupe papel, que se enrolla en el suelo
  { const L = 6 + Math.floor((t * 4) % 12); rect(120, 96 - 0, 132, 96, C.k); for (let i = 0; i < L; i++) { const y = 95 - i; rect(121, y, 131, y, i % 2 ? P.papelP : hex('#e2dcc4')); if (i % 3 === 1) rect(123, y, 123 + ((i * 5) % 7), y, C.grisL); }
    rect(121, 95 - L, 131, 95 - L, C.grisL); pset(118, 101, Math.floor(t * 6) % 2 ? C.rojo : hex('#5a1a1a'));
    for (let i = 0; i < 4; i++) disco(126 + i * 3, 121 + (i % 2), 2, i % 2 ? P.papelP : hex('#e2dcc4')); }
  // los redactores del fondo, que teclean entre sus monitores de tubo; el fax y los montones
  b_monitorTubo(R, 18, 90, t, 0); b_monitorTubo(R, 74, 90, t, 1); b_monitorTubo(R, 160, 90, t, 2); b_monitorTubo(R, 222, 90, t, 3);
  for (const [x, tipo, ropa, k] of [[40, 'rizos', tela('#5a7aa8', '#3e5a88', { H: '#3a2418', h: '#5a3a28' }), 0], [180, 'calvo', tela('#c8c0a8', '#a09880', { W: '#c8c8cc' }), 1], [244, 'mujer', tela('#8a3a5a', '#6a2a44', { H: '#c8a058', V: '#c8a058' }), 2]]) {
    const ty = Math.floor(t * 5 + k) % 4 === 0 ? 1 : 0; R.busto(tipo, ropa, x, 95 + ty, t + k); rect(x + 1, 107, x + 7, 108, hex('#4a4e58')); pset(x + 2 + (Math.floor(t * 8 + k) % 2), 106, hex('#f0c8a0')); pset(x + 6 - (Math.floor(t * 8 + k) % 2), 106, hex('#f0c8a0')); }
  // el fax con su luz, los montones de periódicos y las tazas que humean
  rect(196, 100, 212, 106, K); rect(197, 101, 211, 105, hex('#d8d4c4')); rect(199, 99, 209, 100, P.papelP); pset(209, 102, Math.floor(t * 3) % 2 ? C.verdeL : hex('#2a4a2a'));
  for (const x0 of [60, 136, 300]) for (let j = 0; j < 5; j++) { rect(x0 - 6 + (j % 2), 105 - j * 2, x0 + 6 + (j % 2), 106 - j * 2, K); rect(x0 - 5 + (j % 2), 105 - j * 2, x0 + 5 + (j % 2), 105 - j * 2, j % 2 ? P.papelP : hex('#e4dcc4')); pset(x0 - 4 + (j % 2), 105 - j * 2, P.cabecera); }
  for (const [x, k] of [[96, 0], [214, 1]]) { rect(x, 102, x + 3, 106, K); rect(x + 1, 103, x + 2, 105, C.blanco); b_vapor(R, x + 2, 101, t, k); }
  // la pizarra blanca con ruedas (para Clifford)
  if (o.pizarra) b_pizarra(R, t);
  return { suelo: 160, mesaSuelo: 158, mesa: [196, 150, 319], ventana: b_VENTANA_R, planas: [116, 18, 270, 80], pizarra: o.pizarra ? [153, 99, 213, 131] : null, tele: [250, 78, 272, 96] };
}

// la mesa del redactor de primer término: tablero gris con canto, cajonera, la máquina de escribir, el teléfono, la taza,
// el monitor de tubo y los papeles; el hueco x 226–264 queda bajo para que se vea la cara de quien está detrás
function b_redaccionDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, P = b_P, K = C.k;
  rect(196, 150, 322, 154, K); rect(197, 151, 322, 152, P.mesaRL); rect(197, 153, 322, 153, P.mesaR);
  rect(198, 155, 322, 179, K); rect(199, 155, 322, 179, P.mesaRS); rect(199, 155, 322, 156, b_mezcla(P.mesaRS, K, 0.3));
  for (const y of [158, 166, 174]) { rect(280, y, 316, y + 6, K); rect(281, y + 1, 315, y + 5, P.mesaR); rect(281, y + 1, 315, y + 1, P.mesaRL); rect(293, y + 3, 303, y + 3, C.metalD); }
  for (let x = 204; x < 276; x += 6) pset(x, 160 + (x % 4), P.mesaR);
  // la máquina de escribir, con el carro que avanza y el papel
  { const c = Math.round((t * 3) % 8); rect(200, 140, 224, 150, K); rect(201, 141, 223, 149, hex('#3a4a3e')); rect(202, 146, 222, 148, hex('#2a2a2a')); for (let x = 203; x < 222; x += 2) pset(x, 147, hex('#d8d8c8'));
    const yp = o.pizarra ? 135 : 130; rect(198 + c, 139, 222 + c, 140, K); rect(205 + c, yp, 217 + c, 139, P.papelP); for (let y = yp + 2; y < 138; y += 2) rect(207 + c, y, 213 + c + (y % 3), y, C.grisL); }
  // los papeles bajos en el hueco y la taza que humea
  rect(228, 148, 246, 150, K); rect(229, 148, 245, 149, P.papelP); rect(232, 146, 244, 147, K); rect(233, 146, 243, 146, hex('#f8f0d8'));
  rect(254, 145, 259, 150, K); rect(255, 146, 258, 149, C.rojo); pset(260, 147, K); b_vapor(R, 257, 144, t, 3);
  // el monitor de tubo beige con su pantalla
  rect(268, 124, 302, 150, K); rect(269, 125, 301, 149, P.beigeL); rect(269, 125, 301, 125, C.blanco); rect(272, 128, 298, 144, K); rect(273, 129, 297, 143, P.pantalla);
  for (let j = 0; j < 5; j++) rect(275, 131 + j * 2, 275 + 4 + ((j * 7 + Math.floor(t * 2)) % 18), 131 + j * 2, P.pantallaL);
  if (Math.floor(t * 3) % 2) rect(276 + ((Math.floor(t * 2) * 7) % 18), 141, 278 + ((Math.floor(t * 2) * 7) % 18), 141, P.pantallaL);
  rect(294, 146, 297, 147, K); pset(295, 146, C.verdeL); for (let y = 126; y < 148; y += 3) pset(269, y, hex('#d4caa8'));
  // el teléfono (o.suena: tiembla y da timbrazos)
  { const v = o.suena ? Math.round(Math.sin(t * 50)) : 0, X = 304 + v; rect(X, 143, X + 14, 150, K); rect(X + 1, 144, X + 13, 149, hex('#2a2a30')); rect(X - 1, 141, X + 15, 143, K); rect(X, 142, X + 14, 142, hex('#4a4a52'));
    if (o.suena && Math.floor(t * 4) % 2) { linea(300, 138, 297, 134, K); linea(302, 136, 300, 132, K); } }
}

function b_quiosco(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = b_P, K = C.k, ll = o.lluvia ?? 1;
  const capa = b_capa(R, 'quiosco', () => {
    // el cielo encapotado, tramado (y la máscara de lo que es cielo, para que las nubes no pisen las casas)
    b_mascara.cielo = new Uint8Array(320 * 180); b_mascara.ventanasQ = [];
    for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) { const c = y / 70 + (h(x >> 1, y, 530) - 0.5) * 0.22; pset(x, y, c < 0.3 ? P.cieloL3 : c < 0.62 ? P.cieloL2 : P.cieloL1); }
    // al fondo, la aguja de la iglesia y los tejados lejanos
    const lej = hex('#8a92a0'); poligono([[226, 50], [232, 16], [238, 50]], lej); rect(222, 50, 242, 70, lej); rect(231, 12, 232, 16, lej); pset(231, 11, lej);
    for (let k = 0; k < 22; k++) { const x = k * 15, hh = 6 + Math.round(h(k, 1, 531) * 10); rect(x, 60 - hh, x + 13, 70, lej); }
    // la terraza de ladrillo de la izquierda: cornisa, ventanas de guillotina, chimeneas
    b_casaLadrillo(R, 0, 120, 34);
    // la casa de estuco blanco con columnas en medio
    b_casaEstuco(R, 120, 222, 42);
    // la de la derecha, más baja (la esquina de Atom queda de cielo)
    b_casaLadrillo(R, 222, 319, 54);
    for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y); if (c === P.cieloL1 || c === P.cieloL2 || c === P.cieloL3) b_mascara.cielo[y * 320 + x] = 1; }
    // la acera de enfrente y la calzada mojada, con los reflejos de las luces
    rect(0, 98, 319, 103, P.losa); rect(0, 98, 319, 98, P.losaL); for (let x = 4; x < 320; x += 11) pset(x, 100, P.losaS); rect(0, 103, 319, 104, P.losaS);
    rect(0, 105, 319, 129, P.calzada);
    for (let y = 106; y < 129; y++) for (let x = (y % 2); x < 320; x += 2) { const v = h(x, y, 532); if (v < 0.1) pset(x, y, P.calzadaL); else if (v > 0.94) pset(x, y, hex('#2c3038')); }
    for (let x = 6; x < 320; x += 30) rect(x, 117, x + 14, 117, hex('#d8d4c4'));
    for (const [x, c] of [[40, P.ventanaL], [150, P.ventanaL], [270, P.ventanaL]]) for (let y = 106; y < 128; y += 2) if (h(x, y, 533) < 0.7) rect(x - 1 + Math.round(h(y, x, 534) * 2), y, x + 1, y, b_mezcla(P.calzada, c, 0.35));
    // el bordillo y la acera de losas de delante, mojada, con sus juntas y los charcos
    rect(0, 129, 319, 132, P.losaL); rect(0, 132, 319, 133, P.losaS);
    rect(0, 134, 319, 179, P.losa);
    for (let r = 0; r < 6; r++) { const y = 134 + Math.round(r * 7 + r * r * 0.5); if (y > 179) break; rect(0, y, 319, y, P.losaS); const paso = 26 + r * 6; for (let x = (r % 2) * (paso >> 1); x < 320; x += paso) rect(x, y, x, Math.min(179, y + 7 + r), P.losaS); }
    for (let y = 135; y < 180; y++) for (let x = (y % 2); x < 320; x += 2) { const v = h(x, y, 535); if (v < 0.08) pset(x, y, P.losaL); else if (v > 0.95) pset(x, y, P.losaS); }
    for (const [cx, cy, rx, ry] of b_CHARCOS) for (let y = -ry; y <= ry; y++) { const w = Math.round(rx * Math.sqrt(1 - (y / (ry + 0.5)) ** 2)); rect(cx - w, cy + y, cx + w, cy + y, P.charco); if (y === -ry) rect(cx - w, cy + y, cx + w, cy + y, hex('#8a96a8')); }
    // la farola y el buzón rojo
    rect(14, 120, 26, 152, K); rect(15, 121, 25, 151, C.rojo); rect(15, 121, 17, 151, hex('#ee5a4a')); rect(13, 117, 27, 121, K); rect(14, 118, 26, 120, C.rojo); rect(14, 118, 26, 118, hex('#ee5a4a')); rect(17, 128, 23, 129, K); rect(13, 150, 27, 153, K);
    rect(290, 60, 292, 152, K); rect(291, 60, 291, 151, hex('#3a3e48')); rect(286, 150, 296, 153, K); rect(285, 54, 297, 60, K); rect(286, 55, 296, 59, hex('#fff0b0'));
    // el quiosco: tejado, toldo oscuro rayado, el interior con la ventanilla, el mostrador y los paneles verdes
    poligono([[170, 66], [176, 58], [272, 58], [278, 66]], K); poligono([[172, 65], [177, 59], [271, 59], [276, 65]], P.kioscoS); rect(177, 59, 271, 59, P.kioscoL);
    rect(170, 66, 278, 72, K); rect(171, 67, 277, 71, P.kiosco); for (let x = 174; x < 276; x += 8) rect(x, 68, x + 4, 70, P.kioscoL);
    rect(172, 72, 276, 80, P.toldo); for (let x = 172; x < 277; x += 8) rect(x, 72, x + 3, 80, hex('#2a4438')); for (let x = 172; x < 277; x += 4) pset(x + 1, 81, P.toldo);
    rect(176, 82, 272, 152, K); rect(177, 82, 271, 151, P.kioscoS);
    rect(178, 82, 270, 117, hex('#14261c'));
    rect(224, 84, 266, 112, hex('#5a4a2a')); rect(225, 85, 265, 111, hex('#e8c878')); for (let y = 86; y < 111; y += 5) rect(226, y, 264, y + 1, hex('#c8a858'));
    for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { const x = 227 + i * 6, y = 87 + j * 6; rect(x, y, x + 4, y + 4, [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040'), hex('#2e8a52'), C.blanco, hex('#a85ac8')][(i + j * 2) % 6]); pset(x + 1, y + 1, C.blanco); }
    rect(176, 116, 272, 120, K); rect(177, 117, 271, 118, P.kioscoL); rect(177, 119, 271, 119, P.kiosco);
    rect(178, 121, 270, 150, P.kiosco); for (let x = 180; x < 268; x += 22) b_cuarteron(R, x, 124, x + 18, 147, P.kiosco, P.kioscoL, P.kioscoS, hex('#24563e'), x);
    rect(176, 150, 272, 152, K); b_sombra(R, 224, 153, 52, 2, 0.75);
    // los montones del mostrador, atados
    for (const x0 of [182, 202]) for (let j = 0; j < 4; j++) { rect(x0 - (j % 2), 115 - j * 2, x0 + 14 - (j % 2), 116 - j * 2, K); rect(x0 + 1 - (j % 2), 115 - j * 2, x0 + 13 - (j % 2), 115 - j * 2, j % 2 ? P.papelP : hex('#e4dcc4')); pset(x0 + 2, 115 - j * 2, P.cabecera); }
    // el caballete con una plana de cabecera roja
    { const X = 34; poligono([[X + 1, 152], [X + 5, 118], [X + 7, 118], [X + 5, 152]], K); poligono([[X + 15, 152], [X + 11, 118], [X + 9, 118], [X + 13, 152]], K);
      rect(X, 118, X + 16, 140, K); rect(X + 1, 119, X + 15, 139, P.papelP); rect(X + 2, 120, X + 14, 123, P.cabecera); rect(X + 2, 126, X + 14, 128, K); rect(X + 2, 130, X + 10, 131, K); b_cochito(R, X + 3, 134, K); b_rayo(R, X + 11, 132, P.cabecera); }
  });
  R.copiar(capa);
  // las nubes de tres tonos a tres velocidades y las palomas
  for (let k = 0; k < 6; k++) { const v = [1.2, 2.2, 3.4][k % 3], w = [26, 20, 16][k % 3]; b_nubeMascara(R, b_mascara.cielo, ((t * v + k * 61) % 380) - 30, 12 + (k % 3) * 9 + (k > 2 ? 4 : 0), w, k); }
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * (9 + k) + k * 90) % 300) - 10), y = 30 + k * 6 + Math.round(Math.sin(t * 2 + k) * 2); if (x > 266 && y < 46) continue; const a = Math.floor(t * 6 + k) % 2; pset(x, y, hex('#4a4e58')); pset(x - 1, y - a, hex('#4a4e58')); pset(x + 1, y - a, hex('#4a4e58')); }
  // el humo de las chimeneas
  for (const [x, y] of [[30, 26], [96, 26], [250, 46]]) b_vapor(R, x, y, t, x, hex('#9aa2ae'));
  // las ventanas que se encienden y se apagan
  { const V = b_mascara.ventanasQ; for (let k = 0; k < 7; k++) { const [x0, y0, x1, y1, by, bx, luz] = V[(k * 7 + 3) % V.length]; if (Math.floor(t / 3 + k * 1.7) % 4) continue;
    rect(x0, y0, x1, y1, luz ? P.ventanaO : P.ventanaL); rect(x0, by, x1, by, C.blanco); rect(bx, y0, bx, y1, C.blanco); } }
  // la gente de la acera de enfrente, con paraguas
  for (let k = 0; k < 5; k++) { const dir = k % 2 ? 1 : -1, v = 7 + k * 1.3, x = Math.round(dir > 0 ? ((t * v + k * 70) % 360) - 20 : 340 - ((t * v + k * 70) % 360)); b_paseante(R, x, 102, t, k, dir); }
  // el autobús rojo de dos pisos y el taxi negro, por detrás del quiosco (el quiosco se repinta encima)
  // (en Londres se circula por la izquierda: el carril de enfrente va a la derecha y el de este lado, a la izquierda)
  const tt = t + (o.trafico ?? 0);
  { const u = b_mod(tt + 1, 11) / 5.5; if (u < 1) b_taxi(R, Math.round(lerp(-50, 340, u)), 116, tt); }
  { const u = b_mod(tt + 6, 18) / 9; if (u < 1) b_autobus(R, Math.round(lerp(330, -90, u)), 127, 1, null, tt); }
  b_repinta(R, capa, 170, 58, 278, 81); b_repinta(R, capa, 176, 82, 272, 153);
  b_repinta(R, capa, 285, 54, 297, 153); b_repinta(R, capa, 34, 118, 50, 152); b_repinta(R, capa, 13, 117, 27, 153);
  // la luz de la ventanilla, que titila, y los periódicos colgados que humean
  if (Math.floor(t * 7) % 23 === 0) rect(225, 85, 265, 86, hex('#f8e8a8'));
  b_planasColgadas(R, t, o.humo ?? 0);
  // las gotas que caen del toldo, la lluvia del fondo y las ondas en los charcos
  for (let i = 0; i < 9; i++) { const x = 174 + i * 12, u = ((t * 1.4 + h(i, 1, 536)) % 1); pset(x, 82 + Math.round(u * 70), P.gota); }
  if (ll > 0) b_lluvia(R, t, ll * 70, 0, 0, 319, 179, 540, hex('#b4c0d0'), 4);
  for (const [cx, cy, rx] of b_CHARCOS) for (let k = 0; k < 2; k++) { const u = (t * 0.9 + k * 0.5 + cx * 0.01) % 1, r = 1 + u * (rx - 2), x = cx + Math.round((h(Math.floor(t * 0.9 + k * 0.5 + cx * 0.01), k, cx) - 0.5) * rx); if (ll <= 0) break;
    for (let a = 0; a < 6.28; a += 0.5) { const px = Math.round(x + Math.cos(a) * r), py = Math.round(cy + Math.sin(a) * r * 0.35); if (Math.abs(px - cx) < rx - 1) pset(px, py, u < 0.6 ? hex('#a8b4c4') : hex('#7a8698')); } }
  return { suelo: 156, quiosco: [176, 58, 272, 152], planas: [180, 84, 220, 116], ventanilla: [224, 84, 266, 112], hueco: [140, 112, 170, 152], libre: [56, 170], caballete: [34, 50], buzon: [14, 152], farola: [291, 152] };
}

const b_CHARCOS = [[70, 162, 16, 3], [214, 170, 22, 4], [120, 143, 10, 2], [268, 140, 12, 2]];

// la lluvia de primer término del quiosco (por delante de los personajes), las salpicaduras y el bolardo
function b_quioscoDelante(R, t, o) {
  const { rect, pset } = R, ll = o.lluvia ?? 1;
  rect(304, 140, 312, 179, C.k); rect(305, 141, 311, 179, hex('#2a2c32')); rect(305, 141, 306, 179, hex('#4a4e58')); rect(303, 146, 313, 148, C.k); rect(304, 147, 312, 147, hex('#c8a048'));
  if (ll <= 0) return;
  b_lluvia(R, t, ll * 22, 0, 0, 319, 179, 541, hex('#dce6f0'), 7);
  for (let k = 0; k < 10 * ll; k++) { const u = (t * 2.2 + h(k, 1, 542)) % 1, x = Math.round(h(k, Math.floor(t * 2.2 + h(k, 1, 542)), 543) * 300 + 6), y = 150 + Math.round(h(k, 3, 544) * 26); if (u < 0.25) { pset(x - 1, y - 1, hex('#c8d4e2')); pset(x + 1, y - 1, hex('#c8d4e2')); pset(x, y - 2, hex('#e8eef4')); } }
}

// la capa fija de cada encuadre: se pinta una sola vez por lienzo en un búfer de R.nuevo() y en cada fotograma se copia
// entero (una sola pasada); devuelve el búfer
const b_CAPAS = new WeakMap();

const b_mascara = {};

function b_capa(R, clave, dibuja) {
  let m = b_CAPAS.get(R); if (!m) b_CAPAS.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.recorte(null); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// vuelve a copiar de la capa fija un rectángulo (lo que tapa lo que pasa por detrás: el quiosco, la farola), respetando
// el recorte que haya
function b_repinta(R, capa, x0, y0, x1, y1) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, capa[y * 320 + x]);
}

// apaga una zona (la esquina de Atom): acerca cada píxel al color c en la medida k, para que quede tranquila
function b_calma(R, x0, y0, x1, y1, c, k) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, b_mezcla(R.pget(x, y), c, k)); }

// el resto siempre positivo (para los relojes del tráfico con o.trafico negativo)
const b_mod = (a, m) => ((a % m) + m) % m;

// mezcla dos colores: k = 0 deja a, k = 1 da b
function b_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// aclara un píxel hacia un color (m: cuánto)
function b_aclara(R, x, y, m, col = C.blanco) { if (x < 0 || x > 319 || y < 0 || y > 179) return; const c = R.pget(x, y); if (c) R.pset(x, y, b_mezcla(c, col, m)); }

// el tubo fluorescente que falla: se apaga dos instantes seguidos, una vez por periodo (p, en segundos)
const b_parpadeo = (t, p) => { const u = t % p; return u < 0.08 || (u > 0.16 && u < 0.22); };

// una sombra suave en elipse: oscurece lo que ya hay
function b_sombra(R, cx, cy, rx, ry, f = 0.82) {
  cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) { const c = R.pget(x, cy + j); if (c) R.pset(x, cy + j, b_mezcla(c, C.k, 1 - f)); } }
}

// la luz que entra por una ventana: un paralelogramo tramado más claro (inclin: cuánto se tuerce por fila)
function b_luz(R, x0, y0, x1, y1, inclin, a = 0.3, col = C.blanco) {
  for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * inclin); for (let x = x0 + d; x <= x1 + d; x++) if (((x + y) & 1) === 0 && x >= 0 && x < 320) { const c = R.pget(x, y); if (c) R.pset(x, y, b_mezcla(c, col, a)); } }
}

// un cuarterón de madera en relieve: bisel con luz arriba y a la izquierda, sombra abajo y a la derecha, y dos vetas
function b_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 120) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 121 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.06 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}

// un panel de roble «de pliegues» (linenfold): el bisel y los pliegues verticales con su remate ondulado arriba y abajo
function b_pliegues(R, x0, y0, x1, y1, k) {
  const P = b_P; R.rect(x0, y0, x1, y1, P.madOD); R.rect(x0, y0, x1 - 1, y1 - 1, P.madOL); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, P.madO);
  for (let x = x0 + 2; x < x1 - 1; x++) { const f = (x - x0) % 3, c = f === 0 ? P.madOL : f === 1 ? P.madO : P.madOS;
    for (let y = y0 + 3 + (f === 1 ? 1 : 0); y < y1 - 2 - (f === 1 ? 1 : 0); y++) R.pset(x, y, h(x, y, 509 + k) < 0.06 ? P.madV : c); }
}

// una vidriera ojival: el marco de piedra, el parteluz, el plomo en rombos, la cenefa de colores, los medallones y el
// rosetón de la cabeza (sin escudos ni figuras), más clara arriba; apunta en mask los píxeles de vidrio [x, y, …]
function b_vidriera(R, x0, y0, x1, y1, k, mask) {
  const P = b_P, cx = (x0 + x1) / 2, hw = (x1 - x0) / 2, arco = 1.732 * hw, s = 2 * hw;
  const ancho = (y) => { const d = y - y0; if (d >= arco) return hw; const yy = arco - d; return Math.max(0, Math.sqrt(s * s - yy * yy) - hw); };
  for (let y = y0 - 2; y <= y1 + 2; y++) { const w = ancho(Math.max(y0, y)) + 2; R.rect(Math.round(cx - w), y, Math.round(cx + w), y, y < y0 ? P.piedraVS : P.piedraV); }
  R.rect(Math.round(cx - hw - 3), y1 + 2, Math.round(cx + hw + 3), y1 + 4, P.piedraVS); R.rect(Math.round(cx - hw - 3), y1 + 2, Math.round(cx + hw + 3), y1 + 2, P.piedraV);
  const ry = y0 + arco * 0.55, rr = hw * 0.5;
  for (let y = y0; y <= y1; y++) { const w = ancho(y); for (let x = Math.round(cx - w + 0.5); x <= Math.round(cx + w - 0.5); x++) {
    const ex = Math.min(x - (cx - w), cx + w - x), u = (y - y0) / (y1 - y0), lado = x < cx ? -1 : 1, lx = cx + lado * hw * 0.5;
    let c; const dr = Math.hypot(x - cx, (y - ry) * 1.05);
    if (Math.abs(x - cx) < 1 && y > ry + rr) c = P.piedraV;
    else if (dr < rr) { const an = Math.atan2(y - ry, x - cx), p = Math.floor((an + Math.PI) / (Math.PI / 4)); c = dr < rr * 0.3 ? P.vOroL : dr > rr - 1.2 ? P.plomo : [P.vRojo, P.vAzul, P.vOro, P.vVerde][p % 4]; if (dr > rr * 0.3 && dr < rr * 0.38) c = P.plomo; }
    else if (ex < 1.5) c = P.plomo;
    else if (ex < 3.5 && y > ry + rr) c = ((y >> 2) + k) % 2 ? P.vRojo : P.vAzul;
    else if (y > ry + rr + 2) { const my = ((y - y0 - arco) % 14 + 14) % 14, dm = Math.hypot(x - lx, my - 7);
      if (dm < 4.5) c = dm > 3.6 ? P.plomo : dm > 2.6 ? P.vOro : [P.vAzul, P.vVerde, P.vMorado, P.vRojo][(Math.floor((y - y0) / 14) + (lado > 0 ? 1 : 0) + k) % 4];
      else c = ((x - y + 400) % 5 === 0 || (x + y) % 5 === 0) ? P.plomo : h(x, y, 508 + k) < 0.25 ? P.vBlancoS : P.vBlanco; }
    else c = ((x - y + 400) % 5 === 0 || (x + y) % 5 === 0) ? P.plomo : P.vBlanco;
    if (c !== P.plomo && c !== P.piedraV) { c = b_mezcla(c, C.blanco, Math.max(0, 0.22 - u * 0.25)); if (h(x, y, 510) < 0.08) c = b_mezcla(c, C.k, 0.2); mask.push(x, y); }
    R.pset(x, y, c); } }
  R.rect(Math.round(cx - hw), y1 - 1, Math.round(cx + hw), y1, P.plomo);
}

// el destello que pasa por las vidrieras: una banda inclinada que aclara el vidrio (p: segundos entre pasadas)
function b_destello(R, mask, t, p) {
  if (!mask) return; const g = ((t % p) / p) * 520 - 60;
  for (let i = 0; i < mask.length; i += 2) { const x = mask[i], y = mask[i + 1], d = Math.abs(x + y * 0.6 - g); if (d < 10) b_aclara(R, x, y, (1 - d / 10) * 0.35, hex('#fff8dc')); }
}

// una llama de vela que titila, con su halo
function b_llama(R, x, y, t, k) {
  const P = b_P, f = Math.sin(t * 13 + k) + Math.sin(t * 7.3 + k * 2), dx = f > 1.2 ? 1 : f < -1.2 ? -1 : 0;
  for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if ((i + j) & 1 && i * i + j * j < 10) b_aclara(R, x + i, y + j, 0.18, P.llama);
  R.pset(x, y + 1, P.llama); R.pset(x + dx, y, P.llamaL); R.pset(x, y - 1 + (f > 0 ? 0 : 1), P.llama);
}

// una araña de latón colgada del techo: la cadena, el aro con sus brazos y seis velas que titilan
function b_arana(R, cx, y, t) {
  const { rect, pset } = R, P = b_P, K = C.k;
  for (let j = 0; j < y - 4; j += 2) { pset(cx, j, P.latonS); pset(cx, j + 1, b_mezcla(P.latonS, K, 0.4)); }
  rect(cx - 1, y - 6, cx + 1, y + 6, P.latonS); R.disco(cx, y + 7, 2, P.laton);
  rect(cx - 12, y, cx + 12, y + 1, K); rect(cx - 11, y, cx + 11, y, P.laton);
  for (const dx of [-11, -7, -3, 3, 7, 11]) { rect(cx + dx, y - 3, cx + dx, y - 1, C.blanco); pset(cx + dx, y - 1, P.latonL); b_llama(R, cx + dx, y - 5, t, cx + dx); }
  for (const dx of [-11, 11]) { R.linea(cx, y + 4, cx + dx, y + 1, P.latonS); }
}

// las gradas de lores: cada lord sentado detrás de su respaldo rojo, que se repinta encima; en cada grada uno cabecea
// dormido, uno agita su papel («hear, hear») y otro se lleva la mano a la oreja
function b_gradasLores(R, t, lores, gradas, tramo) {
  const { rect, pset } = R, P = b_P, K = C.k;
  lores.forEach(([lado, g, x, tipo, r], n) => {
    const pelo = ['#d8d8dc', '#5a4a3a', '#2a2420', '#9a9aa2', '#c8b8a0'][Math.floor(r * 50) % 5], toga = Math.floor(r * 70) % 3 === 0, traje = ['#3a3e4e', '#2e2a2a', '#4a4a3a', '#3a2e3e'][Math.floor(r * 30) % 4];
    const y = gradas[g] - 9 - (Math.floor(r * 90) % 4 === 0 ? 1 : 0), ropa = tipo === 'peluca' ? tela('#b83a34', '#7e2420', { H: '#c8c4bc', Y: '#f4f2ec', O: '#1a1a1a' }) : tipo === 'calvo' ? (toga ? tela('#b83a34', '#7e2420', { W: pelo }) : tela(traje, '#1e1e26', { W: pelo })) : tela(toga ? '#b83a34' : '#5a4a7a', toga ? '#7e2420' : '#3e3256', { H: pelo, V: pelo });
    const duerme = n % 9 === 4 && (t % 9) > 4, papel = n % 11 === 6, oreja = n % 13 === 9;
    R.busto(tipo, ropa, x, y + (duerme && (t % 9) > 4.6 ? 1 : 0), duerme ? 260.05 - x * 0.07 : t + n * 0.7);
    if (papel) { const a = Math.round(Math.abs(Math.sin(t * 6 + n)) * 3); rect(x + 9, y + 1 - a, x + 12, y + 6 - a, K); rect(x + 10, y + 2 - a, x + 11, y + 5 - a, C.papel); pset(x + 9, y + 7 - a, hex('#f0c8a0')); }
    if (oreja) { pset(x - 1, y + 4, hex('#f0c8a0')); pset(x - 1, y + 5, hex('#f0c8a0')); pset(x - 2, y + 5, K); }
    if (duerme && (t % 9) > 5.2) { const zz = ((t % 9) - 5.2) * 3; pset(x + 10, y - Math.round(zz), C.blanco); }
  });
  // los respaldos rojos con botones y su remate de madera, por delante de los lores
  gradas.forEach((y, g) => { for (const lado of [-1, 1]) { const [a, b] = tramo(lado, g); if (lado > 0 && a === 0) continue;
    rect(a, y, b, y + 5, C.rojoLores); rect(a, y, b, y, P.madOL); rect(a, y + 1, b, y + 1, P.rojoL); rect(a, y + 5, b, y + 5, C.rojoLoresS);
    for (let x = a + 2 + (g % 2) * 3; x < b; x += 6) pset(x, y + 3, C.rojoLoresS); } });
}

// motas de polvo que flotan en los rayos de luz
function b_motas(R, t, n, x0, y0, y1, ancho, inclin) {
  for (let k = 0; k < n; k++) { const fy = (h(k, 3, 511) * (y1 - y0) + t * (2 + h(k, 4, 511) * 3)) % (y1 - y0), x = Math.round(x0 + fy * inclin + h(k, 5, 511) * ancho + Math.sin(t * 0.6 + k) * 2), y = Math.round(y0 + fy);
    if (Math.sin(t * 1.4 + k * 2) > -0.2) R.pset(x, y, hex('#fff4d8')); }
}

// una primera plana sensacionalista clavada (sin letras): papel amarillento, la cabecera roja, dos titulares de barras
// gruesas, el recuadro de foto con un coche o un rayo y las columnas grises; la chincheta
function b_portada(R, x, y, k) {
  const { rect, pset } = R, P = b_P, K = C.k;
  rect(x + 1, y + 1, x + 21, y + 29, b_mezcla(P.paredRS, K, 0.25));
  rect(x, y, x + 20, y + 28, K); rect(x + 1, y + 1, x + 19, y + 27, h(k, 1, 512) < 0.3 ? hex('#ece2c4') : P.papelP);
  rect(x + 2, y + 2, x + 18, y + 6, P.cabecera); rect(x + 3, y + 3, x + 9, y + 5, C.blanco); rect(x + 11, y + 3, x + 17, y + 3, hex('#f6a0a0'));
  rect(x + 2, y + 8, x + 18, y + 10, K); rect(x + 2, y + 12, x + 13 + (k % 3) * 2, y + 14, K);
  rect(x + 2, y + 16, x + 11, y + 25, hex('#c8c0a8')); if (k % 2) b_cochito(R, x + 3, y + 19, k % 4 === 1 ? P.cabecera : K); else b_rayo(R, x + 5, y + 17, hex('#e8a020'));
  for (let j = y + 17; j < y + 26; j += 2) rect(x + 13, j, x + 18, j, C.grisL);
  pset(x + 10, y, C.rojo); pset(x + 10, y - 1, hex('#ee6a6a'));
}

// un coche de perfil de 8 × 5 (el pictograma de los titulares)
function b_cochito(R, x, y, c) { R.rect(x + 2, y, x + 5, y + 1, c); R.rect(x, y + 2, x + 7, y + 3, c); R.pset(x + 1, y + 4, c); R.pset(x + 6, y + 4, c); R.pset(x + 3, y + 1, C.blanco); }

// un rayo de 5 × 8
function b_rayo(R, x, y, c) { for (const [i, j] of [[3, 0], [2, 1], [3, 1], [1, 2], [2, 2], [0, 3], [1, 3], [2, 3], [3, 3], [2, 4], [1, 5], [2, 5], [1, 6], [0, 7]]) R.pset(x + i, y + j, c); }

// un monitor de tubo beige de los noventa, de espaldas a medias, con la pantalla que cambia (k: cuál)
function b_monitorTubo(R, x, y, t, k) {
  const { rect, pset } = R, P = b_P, K = C.k;
  rect(x, y, x + 16, y + 15, K); rect(x + 1, y + 1, x + 15, y + 14, C.beige); rect(x + 1, y + 1, x + 15, y + 1, P.beigeL); rect(x + 3, y + 3, x + 13, y + 11, K); rect(x + 4, y + 4, x + 12, y + 10, P.pantalla);
  for (let j = 0; j < 3; j++) { const yy = y + 5 + ((j * 2 + Math.floor(t * 1.5 + k)) % 6); rect(x + 5, yy, x + 5 + 2 + Math.floor(h(j + Math.floor(t * 1.5 + k), k, 513) * 5), yy, k % 2 ? P.pantallaL : hex('#c8d8f0')); }
  rect(x + 5, y + 15, x + 11, y + 16, K); rect(x + 3, y + 16, x + 13, y + 16, C.beigeS); pset(x + 13, y + 12, C.verdeL);
}

// el vapor que sube de una taza o una chimenea
function b_vapor(R, x, y, t, k, c = hex('#f4f4f0')) {
  for (let p = 0; p < 4; p++) { const u = (t * 0.45 + p / 4 + k * 0.13) % 1; R.disco(x + Math.sin(t * 1.3 + p + k) * 1.5 + u * 2, y - u * 9, 0.6 + u * 1.4, u < 0.6 ? c : b_mezcla(c, hex('#9aa2ae'), 0.5)); }
}

// la pizarra blanca con ruedas: el marco de aluminio, la superficie con restos mal borrados, la bandeja con rotuladores,
// las patas y las ruedas; la superficie x 153–213, y 99–131 queda libre para las flechas de la escena
function b_pizarra(R, t) {
  const { rect, pset, linea } = R, K = C.k;
  rect(150, 96, 216, 134, K); rect(151, 97, 215, 133, C.metalL); rect(153, 99, 213, 131, hex('#f6f8f8'));
  for (let k = 0; k < 9; k++) { const x = 156 + Math.floor(h(k, 1, 514) * 52), y = 101 + Math.floor(h(k, 2, 514) * 28); rect(x, y, x + 2 + Math.floor(h(k, 3, 514) * 6), y, hex('#dce4ec')); }
  rect(160, 134, 206, 136, K); rect(161, 134, 205, 135, C.metal);
  for (const [x, c] of [[166, C.rojo], [172, C.azul], [178, K]]) { rect(x, 133, x + 4, 134, c); pset(x + 4, 133, C.blanco); }
  linea(156, 134, 152, 156, K); linea(210, 134, 214, 156, K); linea(157, 134, 153, 156, C.metalS); linea(209, 134, 213, 156, C.metalS); rect(150, 150, 216, 151, C.metalS);
  for (const x of [151, 214]) { R.disco(x, 158, 2, K); pset(x, 158, C.metalL); }
  // el reflejo de los fluorescentes en la superficie
  for (let i = 0; i < 6; i++) pset(190 + i, 100 + i, hex('#ffffff'));
}

// un autobús rojo de dos pisos (sin letras: el letrero de destino es una barra clara); x: el frente izquierdo; suelo: y de
// las ruedas; s: escala (1 en la calle, menos por la ventana); clip: hueco al que se recorta
function b_autobus(R, x, suelo, s, clip, t) {
  const P = b_P, K = C.k, W = Math.round(76 * s), H = Math.round(42 * s), y0 = suelo - H;
  const r = (a, b, c, d, col) => b_rectc(R, clip, x + a * s, y0 + b * s, x + c * s, y0 + d * s, col);
  r(0, 0, 76, 38, K); r(1, 1, 75, 37, P.bus); r(1, 1, 75, 3, P.busL); r(1, 33, 75, 37, P.busS);
  r(3, 6, 73, 14, K); r(3, 22, 63, 30, K);
  for (let i = 0; i < 7; i++) { r(4 + i * 10, 7, 11 + i * 10, 13, hex('#a8c0d8')); r(4 + i * 10, 7, 6 + i * 10, 13, hex('#d8e8f4')); }
  for (let i = 0; i < 6; i++) { r(4 + i * 10, 23, 11 + i * 10, 29, hex('#a8c0d8')); r(4 + i * 10, 23, 6 + i * 10, 29, hex('#d8e8f4')); }
  r(1, 17, 75, 18, hex('#f0e0c0')); r(3, 2, 20, 4, K); r(4, 3, 19, 3, hex('#f8f0c8')); r(65, 22, 73, 33, hex('#3a3a3e'));
  if (Math.floor(t * 4) % 2) r(0, 32, 1, 33, hex('#ffd060'));
  for (const wx of [12, 60]) { const cx = x + wx * s, cy = suelo - 1 * s, rr = 5 * s; if (!clip || (cx > clip[0] - rr && cx < clip[2] + rr)) { R.disco(cx, cy, rr, K); R.disco(cx, cy, rr * 0.45, hex('#8a8a90')); } }
  if (!clip) { const u = (t * 6) % 1; for (let i = 0; i < 6; i++) R.pset(x + 72 + Math.round(u * 6) + i, suelo - 1 - (i % 3), hex('#a8b4c4')); }
}

// un rectángulo recortado a un hueco (R.rect no respeta R.recorte)
function b_rectc(R, cl, x0, y0, x1, y1, c) {
  x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
  if (cl) { x0 = Math.max(x0, cl[0]); y0 = Math.max(y0, cl[1]); x1 = Math.min(x1, cl[2]); y1 = Math.min(y1, cl[3]); } else { x0 = Math.max(0, x0); x1 = Math.min(319, x1); }
  if (x1 >= x0 && y1 >= y0) R.rect(x0, y0, x1, y1, c);
}

// el taxi negro de Londres, de perfil (sin letras: la luz de «libre» es un cuadradito ámbar), que va a la derecha
function b_taxi(R, x, suelo, t) {
  const P = b_P, K = C.k, r = (a, b, c, d, col) => b_rectc(R, null, x + a, suelo + b, x + c, suelo + d, col);
  r(0, -14, 40, -3, K); r(1, -13, 39, -4, P.taxi); r(8, -22, 30, -13, K); r(9, -21, 29, -14, P.taxi); r(1, -13, 39, -12, P.taxiL); r(9, -21, 29, -21, P.taxiL);
  r(11, -20, 18, -15, hex('#7a8a9a')); r(20, -20, 27, -15, hex('#7a8a9a')); r(11, -20, 12, -15, hex('#a8b8c8')); r(18, -24, 21, -22, K); r(19, -23, 20, -23, hex('#f8b030'));
  r(38, -11, 40, -9, hex('#fff0a0')); r(0, -10, 1, -8, C.rojo); r(2, -7, 38, -7, P.taxiL);
  for (const wx of [8, 32]) { R.disco(x + wx, suelo - 2, 4, K); R.disco(x + wx, suelo - 2, 1.8, hex('#8a8a90')); }
  const u = (t * 7) % 1; for (let i = 0; i < 5; i++) R.pset(x - 2 - Math.round(u * 5) - i, suelo - 2 - (i % 2), hex('#a8b4c4'));
}

// una casa adosada de ladrillo con su cornisa, las ventanas de guillotina con sus dinteles, las chimeneas y la puerta
function b_casaLadrillo(R, x0, x1, top) {
  const { rect, pset } = R, P = b_P, K = C.k;
  rect(x0, top, x1, 98, P.ladrilloL);
  for (let y = top + 2; y < 98; y += 3) { rect(x0, y, x1, y, P.ladrilloLS); for (let x = x0 + ((y / 3) % 2) * 3; x < x1; x += 6) { pset(x, y + 1, P.ladrilloLS); if (h(x, y, 515) < 0.15) rect(x + 1, y + 1, x + 4, y + 2, P.ladrilloLL); } }
  rect(x0, top - 3, x1, top, P.estuco); rect(x0, top, x1, top, P.estucoS);
  for (let cx = x0 + 22; cx < x1 - 6; cx += 54) { if (cx > 276) continue; rect(cx, top - 12, cx + 10, top - 3, P.ladrilloLS); rect(cx - 1, top - 13, cx + 11, top - 12, P.estucoS); for (let i = 0; i < 3; i++) rect(cx + 1 + i * 3, top - 16, cx + 2 + i * 3, top - 13, hex('#b86a4a')); }
  for (let y = top + 8; y < 90; y += 18) for (let x = x0 + 6; x < x1 - 8; x += 16) {
    const luz = h(x, y, 516) < 0.35; if (b_mascara.ventanasQ && x + 8 < 278) b_mascara.ventanasQ.push([x + 1, y + 1, x + 7, y + 11, y + 6, x + 4, luz]);
    rect(x - 1, y - 2, x + 9, y - 1, P.estuco); rect(x, y, x + 8, y + 12, K); rect(x + 1, y + 1, x + 7, y + 11, luz ? P.ventanaL : P.ventanaO);
    rect(x + 1, y + 6, x + 7, y + 6, C.blanco); rect(x + 4, y + 1, x + 4, y + 11, C.blanco); rect(x - 1, y + 13, x + 9, y + 13, P.estuco); }
}

// una casa de estuco blanco con pórtico de columnas, cornisa y ventanas altas
function b_casaEstuco(R, x0, x1, top) {
  const { rect, pset } = R, P = b_P, K = C.k;
  rect(x0, top, x1, 98, P.estuco); for (let y = top + 4; y < 98; y += 5) rect(x0, y, x1, y, P.estucoS);
  for (let y = top; y < 98; y++) for (let x = x0 + (y % 2); x < x1; x += 2) if (h(x, y, 517) < 0.12) pset(x, y, hex('#c8c2b0'));
  rect(x0, top - 4, x1, top - 1, P.estucoL); rect(x0, top, x1, top + 1, P.estucoS); for (let x = x0; x < x1; x += 3) pset(x, top - 1, P.estucoS);
  for (let y = top + 6; y < 80; y += 18) for (let x = x0 + 8; x < x1 - 8; x += 14) { const luz = h(x, y, 518) < 0.3; if (b_mascara.ventanasQ) b_mascara.ventanasQ.push([x + 1, y + 1, x + 6, y + 12, y + 7, -1, luz]); rect(x, y, x + 7, y + 13, K); rect(x + 1, y + 1, x + 6, y + 12, luz ? P.ventanaL : P.ventanaO); rect(x + 1, y + 7, x + 6, y + 7, C.blanco); rect(x - 1, y - 2, x + 8, y - 1, P.estucoL); rect(x - 1, y + 14, x + 8, y + 14, P.estucoS); }
  const m = (x0 + x1) >> 1; rect(m - 16, 80, m + 16, 82, P.estucoL); for (const dx of [-14, -6, 6, 14]) { rect(m + dx - 1, 83, m + dx + 1, 98, P.estucoL); pset(m + dx + 1, 90, P.estucoS); }
  rect(m - 4, 86, m + 4, 98, K); rect(m - 3, 87, m + 3, 98, hex('#1e2a3a')); pset(m + 2, 92, C.oro);
}

// una nube de tres tonos que solo se pinta donde la máscara dice que hay cielo (w: ancho; k: forma)
function b_nubeMascara(R, mask, cx, cy, w, k) {
  const P = b_P, B = [[-0.34, 0.1, 0.24], [0, -0.08, 0.32], [0.32, 0.06, 0.25], [0.12, -0.2, 0.2]];
  const r0 = Math.ceil(w * 0.6), x0 = Math.round(cx) - r0, y0 = Math.round(cy) - r0;
  for (let y = y0; y <= y0 + 2 * r0; y++) { if (y < 0 || y > 179) continue; for (let x = x0; x <= x0 + 2 * r0; x++) { if (x < 0 || x > 319 || !mask[y * 320 + x]) continue;
    let dentro = 0, alto = 0; for (const [dx, dy, f] of B) { const d = Math.hypot(x - cx - dx * w, (y - cy - dy * w) * 1.3) / (f * w); if (d < 1) { dentro = 1; alto = Math.max(alto, (cy + dy * w) - y + (1 - d) * 2); } }
    if (!dentro) continue; const sh = y > cy + w * 0.08 ? 2 : alto > w * 0.18 ? 0 : 1; if (sh === 1 && ((x + y) & 1) && h(x, y, 519 + k) < 0.3) continue;
    R.pset(x, y, [P.nubeL1, P.nubeL2, P.nubeL3][sh]); } }
}

// la lluvia: n trazos inclinados que caen, dentro de (x0, y0)–(x1, y1); L: largo de cada trazo
function b_lluvia(R, t, n, x0, y0, x1, y1, k, c, L) {
  const H = y1 - y0 + L;
  for (let i = 0; i < n; i++) { const v = 140 + h(i, 1, k) * 60, y = y0 - L + ((h(i, 2, k) * H + t * v) % H), x = x0 + ((h(i, 3, k) * (x1 - x0 + 40) + (y - y0) * 0.25) % (x1 - x0 + 40)) - 20;
    for (let j = 0; j < L; j++) { const px = Math.round(x + j * 0.25), py = Math.round(y + j); if (px >= x0 && px <= x1 && py >= y0 && py <= y1 && !(px >= 278 && py <= 44)) R.pset(px, py, c); } }
}

// la lluvia por la ventana de la redacción: trazos finos fuera y gotas que resbalan por el cristal
function b_lluviaVentana(R, t, x0, y0, x1, y1) {
  b_lluvia(R, t, 26, x0, y0, x1, y1, 545, hex('#b8c4d4'), 4);
  for (let k = 0; k < 7; k++) { const x = x0 + 4 + Math.round(h(k, 1, 546) * (x1 - x0 - 8)), u = ((t * (0.15 + h(k, 2, 546) * 0.2) + h(k, 3, 546)) % 1), y = Math.round(y0 + u * (y1 - y0));
    for (let j = 1; j < 5; j++) if (y - j > y0) R.pset(x, y - j, hex('#9aa8ba')); R.pset(x, y, hex('#e8f0f8')); R.pset(x + 1, y, hex('#7a889a')); }
}

// un paseante pequeño con paraguas (~10 px) en la acera de enfrente, que camina en dir
function b_paseante(R, x, suelo, t, k, dir) {
  const { rect, pset } = R, K = C.k, paso = Math.floor(t * 4 + k) % 2, abrigo = [hex('#3a3e4a'), hex('#5a4030'), hex('#2a3a2e'), hex('#6a2a2a'), hex('#4a4a52')][k % 5];
  if (x < -8 || x > 328) return;
  rect(x - 2, suelo - 8, x + 2, suelo - 2, abrigo); pset(x - 1 + paso, suelo - 1, K); pset(x + 1 - paso, suelo - 1, K); R.disco(x, suelo - 10, 1.6, hex('#e8b890'));
  const pc = k === 3 ? hex('#c83a3a') : k === 1 ? hex('#2a4a8a') : C.k; rect(x - 6, suelo - 14, x + 6, suelo - 13, pc); rect(x - 4, suelo - 15, x + 4, suelo - 15, pc); pset(x - 6, suelo - 12, pc); pset(x + 6, suelo - 12, pc); rect(x, suelo - 12, x, suelo - 10, K);
  pset(x + dir * 2, suelo - 6, b_mezcla(abrigo, C.blanco, 0.3));
}

// los periódicos colgados del quiosco con sus pinzas, en dos filas sobre el interior oscuro: cabecera roja, titulares de
// barras, el coche o el rayo; con humo (0–1), humean de indignación: bocanadas que suben y se mecen sobre el toldo
function b_planasColgadas(R, t, humo) {
  const { rect, pset, disco } = R, P = b_P, K = C.k;
  for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) { const x = 180 + i * 14, y = 84 + j * 16, bal = Math.round(Math.sin(t * 1.5 + i + j * 2) * 0.6);
    rect(x + bal, y, x + 11 + bal, y + 14, K); rect(x + 1 + bal, y + 1, x + 10 + bal, y + 13, P.papelP); rect(x + 2 + bal, y + 2, x + 9 + bal, y + 4, P.cabecera);
    rect(x + 2 + bal, y + 6, x + 9 + bal, y + 7, K); rect(x + 2 + bal, y + 9, x + 6 + bal, y + 12, hex('#c8c0a8')); if ((i + j) % 2) b_rayo(R, x + 2 + bal, y + 6, hex('#e8a020')); else pset(x + 4 + bal, y + 10, C.rojo);
    rect(x + 4, y - 1, x + 7, y, hex('#c8a048'));
    if (humo > 0) { const n = Math.round(humo * 4); for (let q = 0; q < n; q++) { const u = (t * 0.6 + q / 4 + i * 0.3 + j * 0.17) % 1, r = 0.8 + u * (1.5 + humo * 2), cx = x + 6 + Math.sin(t * 2 + q + i) * 2 + u * 2, cy = y - 1 - u * (10 + humo * 8);
      disco(cx + 0.5, cy + 0.5, r + 0.6, hex('#3a404a')); disco(cx, cy, r, u < 0.5 ? hex('#f4f4f6') : hex('#c4cad2')); if (r > 1.6) R.pset(Math.round(cx - r * 0.4), Math.round(cy - r * 0.4), C.blanco); }
      if (humo > 0.6 && Math.floor(t * 8 + i + j) % 3 === 0) { pset(x + 5 + bal, y + 3, C.amarillo); } } }
}

// los búferes de los fondos fijos, por R y por clave (cada clave lleva todas las opciones que cambian el dibujo fijo)
const c_CACHE = new WeakMap();

// un fondo fijo: se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma; devuelve lo que devolvió dibuja()
function c_fijo(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); const info = dibuja(); R.usar(prev); m[clave] = { b, info }; }
  R.copiar(m[clave].b); return m[clave].info;
}

// la trama de Bayer 4 × 4 (0–1) para los degradados y las luces tramadas
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_b4 = (x, y) => (c_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// un color (0xAABBGGRR) en '#rrggbb', para tela()
const c_str = (c) => '#' + [c & 255, (c >> 8) & 255, (c >> 16) & 255].map((v) => v.toString(16).padStart(2, '0')).join('');

// la mezcla de dos colores (k = 0: a; k = 1: b)
function c_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// aclara (o tiñe) un píxel ya pintado hacia el color [r, g, b] en la proporción m
function c_aclara(R, x, y, m, [cr, cg, cb] = [255, 244, 214]) {
  if (x < 0 || x > 319 || y < 0 || y > 179) return; const c = R.pget(x, y), r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  R.pset(x, y, (0xff000000 | (Math.round(b + (cb - b) * m) << 16) | (Math.round(g + (cg - g) * m) << 8) | Math.round(r + (cr - r) * m)) >>> 0);
}

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function c_rr(R, cl, x0, y0, x1, y1, c) { const a = Math.max(Math.round(x0), cl[0]), b = Math.max(Math.round(y0), cl[1]), d = Math.min(Math.round(x1), cl[2]), f = Math.min(Math.round(y1), cl[3]); if (a <= d && b <= f) R.rect(a, b, d, f, c); }

// un degradado vertical tramado entre los colores cols (de arriba abajo); respeta R.recorte
function c_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), fr = f - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, fr > c_b4(x, y) ? cols[i + 1] : cols[i]); }
}

// un cuarterón de madera en relieve: bisel con luz arriba y a la izquierda y sombra abajo y a la derecha, el campo y dos vetas
function c_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 120) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 121 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.06 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}

// la paleta del grupo C
const c_P = Object.fromEntries(Object.entries({
  junta: '#5e4a40', lad1: '#a4543c', lad2: '#94482f', lad3: '#b8664a', ladO: '#6e3424', ladL: '#c87a5a', grano: '#7e3c28',
  viga: '#4a3426', vigaL: '#6a4a34', vigaS: '#33231a', acero: '#3e4a4e', aceroL: '#6a7a7e', aceroS: '#262e32',
  tabla1: '#9a6a42', tabla2: '#8a5c38', tabla3: '#a8784c', tablaS: '#5e3e24', tablaV: '#7a5232',
  cuero: '#6a3a24', cueroL: '#8a5434', cueroS: '#4a2616', alfombra: '#7a2a2e', alfombraL: '#a8463e', alfombraS: '#4e1a1e', oroAlf: '#c8984a',
  taxi: '#f2c418', taxiS: '#c49410', taxiL: '#fff07a', nieve: '#eef4fa', nieveS: '#bccadc', nieveD: '#8a9ab4',
  nogal: '#5a3620', nogalL: '#7a4e30', nogalS: '#3c2414', nogalV: '#4a2c18', roble: '#a8784a', robleL: '#c8965e', robleS: '#7e5634', robleV: '#946640',
}).map(([k, v]) => [k, hex(v)]));

// un muro de ladrillo visto (hiladas de 3 px y juntas de 1 px; ladrillos de tres tonos, alguno quemado o claro, y grano)
function c_ladrillo(R, x0, y0, x1, y1, k = 0, P = c_P) {
  R.rect(x0, y0, x1, y1, P.junta);
  for (let y = y0, f = 0; y <= y1; y += 4, f++) { const off = (f % 2) * 5;
    for (let x = x0 - off; x <= x1; x += 10) { const v = h(x, y, k), a = Math.max(x0, x), b = Math.min(x1, x + 8), yb = Math.min(y1, y + 2); if (b < a) continue;
      R.rect(a, y, b, yb, v < 0.1 ? P.ladO : v > 0.92 ? P.ladL : v > 0.6 ? P.lad3 : v > 0.3 ? P.lad1 : P.lad2);
      if (v > 0.2 && b - a > 3) R.pset(a + 1 + Math.floor(h(x, y, k + 1) * (b - a - 1)), y + (v > 0.55 ? 1 : 2), P.grano);
      if (v > 0.45 && v < 0.6 && b - a > 4) R.rect(a, y, a + 2, y, P.ladL); } }
}

// una nube de tres tonos (la sombra abajo, el cuerpo y la luz arriba); respeta R.recorte
function c_nube(R, cx, cy, w, [cS, c, cL]) {
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), cS);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), c);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.7), cL);
  R.linea(Math.round(cx - w * 0.5), Math.round(cy + w * 0.24), Math.round(cx + w * 0.5), Math.round(cy + w * 0.24), cS);
}

// los colores del cielo y de los edificios de Nueva York, de día y de noche
const c_CIELO = { dia: ['#5e9ee0', '#78b2e8', '#94c4ee', '#b2d6f2', '#d4e8f6'].map(hex), noche: ['#0a0e26', '#10163a', '#1a1e4a', '#282a5a', '#463a6a'].map(hex) };

// pasa a colores (hex) los valores de un objeto de paletas (cadenas o listas de cadenas)
const c_hexes = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : hex(v)]));

const c_EDIF = {
  dia: c_hexes({ lejos: ['#a4b8d0', '#9cb0c8'], medio: ['#8494ae', '#94a0b4', '#9a8c84'], cerca: ['#8a5a4a', '#b0a088', '#6a7284', '#4e6a8a', '#7a6a5a'], vent: '#3a4a64', ventL: '#c8e0f0' }),
  noche: c_hexes({ lejos: ['#2a2a5a', '#30305e'], medio: ['#20224a', '#262850', '#2a2448'], cerca: ['#181a36', '#1e1c38', '#16182e', '#1c2040', '#20203a'], vent: '#14162c', ventL: '#f0c870' }),
};

// el skyline de Nueva York dentro del hueco cl = [x0, y0, x1, y1] (fijo: va en el búfer): el cielo tramado, tres capas de
// edificios con retranqueos, una torre con aguja, depósitos de agua y antenas, y las ventanas. Devuelve la máscara del
// cielo (para pintar nubes solo donde no hay edificios) y la lista de ventanas que se encienden de noche
function c_skylineFijo(R, cl, noche, k = 0) {
  const [x0, y0, x1, y1] = cl, P = noche ? c_EDIF.noche : c_EDIF.dia, alto = y1 - y0, ventanas = [];
  R.recorte(cl); c_degradado(R, x0, y0, x1, y1, noche ? c_CIELO.noche : c_CIELO.dia);
  if (noche) for (let y = y1 - Math.round(alto * 0.25); y <= y1; y++) for (let x = x0; x <= x1; x++) if (c_b4(x, y) < (y - (y1 - alto * 0.25)) / (alto * 0.25) * 0.5) R.pset(x, y, hex('#5a3a6a'));
  const capas = [[P.lejos, 0.1, 0.42, 7, 12], [P.medio, 0.28, 0.58, 8, 14], [P.cerca, 0.48, 0.8, 10, 20]];
  capas.forEach(([cols, a, b, wMin, wVar], capa) => {
    for (let x = x0 - 4, n = 0; x <= x1; n++) { const w = wMin + Math.floor(h(n, capa, 200 + k) * wVar), c = cols[n % cols.length]; let top = Math.round(y0 + alto * (a + h(n, capa + 5, 201 + k) * (b - a))); if (x + w > 268) top = Math.max(top, 50);   // la esquina de Atom, tranquila
      const cS = c_mezcla(c, hex('#000000'), 0.18), cL = c_mezcla(c, hex(noche ? '#6a6aa0' : '#ffffff'), 0.22);
      c_rr(R, cl, x, top, x + w - 1, y1, c); c_rr(R, cl, x + w - 2, top, x + w - 1, y1, cS); c_rr(R, cl, x, top, x + w - 1, top, cL);
      // retranqueo y remate: una torre escalonada con aguja (una sola, en la capa del medio), un depósito de agua o una antena
      const r = x + w > 262 ? 0.5 : h(n, capa, 202 + k);
      if (capa === 1 && n === 3) { const cx = x + (w >> 1); c_rr(R, cl, cx - 4, top - 10, cx + 4, top, c); c_rr(R, cl, cx - 2, top - 18, cx + 2, top - 10, c); c_rr(R, cl, cx - 1, top - 22, cx + 1, top - 18, cL); R.linea(cx, top - 32, cx, top - 22, cL); c_rr(R, cl, cx - 4, top - 10, cx - 4, top, cL); }
      else if (capa === 2 && r < 0.35) { const cx = x + 3 + Math.floor(h(n, 9, k) * Math.max(1, w - 8)), M = noche ? hex('#2a1e1e') : hex('#6a4a34'), ML = noche ? hex('#3a2a28') : hex('#8a6448');
        R.linea(cx - 2, top - 1, cx - 3, top - 5, M); R.linea(cx + 3, top - 1, cx + 4, top - 5, M); c_rr(R, cl, cx - 3, top - 11, cx + 4, top - 5, M); c_rr(R, cl, cx - 3, top - 11, cx - 2, top - 5, ML); R.poligono([[cx - 4, top - 11], [cx + 5, top - 11], [cx + 0.5, top - 15]], noche ? hex('#1e1616') : hex('#4a3428')); for (let yy = top - 10; yy < top - 5; yy += 2) c_rr(R, cl, cx - 3, yy, cx + 4, yy, M); }
      else if (r > 0.82) R.linea(x + (w >> 1), top - 8, x + (w >> 1), top, cL);
      else if (r > 0.6 && w > 12) { c_rr(R, cl, x + 2, top - 4, x + w - 3, top, c); c_rr(R, cl, x + 2, top - 4, x + w - 3, top - 4, cL); }
      // las ventanas: columnas de 1 × 2 cada 3 px y filas cada 4 (de día, oscuras con algún reflejo; de noche, una parte encendidas)
      if (capa === 0) { for (let wx = x + 2; wx < x + w - 2; wx += 3) c_rr(R, cl, wx, top + 3, wx, y1, c_mezcla(c, P.vent, 0.18)); x += w; continue; }
      for (let wy = top + 3; wy < y1 - 1; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 3) { const v = h(wx, wy, 203 + k);
        if (noche) { if (v < (capa === 2 ? 0.32 : 0.2)) { const col = h(wx, wy, 204) < 0.75 ? P.ventL : hex('#a8d8f0'); R.pset(wx, wy, col); R.pset(wx, wy + 1, col); if (wx >= x0 && wx <= x1 && wy >= y0) ventanas.push([wx, wy, col, c]); } else { R.pset(wx, wy, c_mezcla(c, P.vent, 0.5)); R.pset(wx, wy + 1, c_mezcla(c, P.vent, 0.5)); } }
        else { const cv = v < 0.05 ? P.ventL : c_mezcla(c, P.vent, capa === 1 ? 0.35 : 0.5); R.pset(wx, wy, cv); R.pset(wx, wy + 1, v < 0.05 ? c_mezcla(P.ventL, c, 0.4) : cv); } }
      x += w; } });
  // la máscara del cielo: lo que aún tiene el color del degradado
  const cielo = new Set(noche ? c_CIELO.noche.concat([hex('#5a3a6a')]) : c_CIELO.dia), mask = new Uint8Array(320 * 180);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (cielo.has(R.pget(x, y))) mask[y * 320 + x] = 1;
  R.recorte(null);
  return { mask, ventanas, cl, noche };
}

// vuelve a calcular la máscara del cielo y las ventanas que cambian después de pintar encima (montantes, muebles)
function c_refiltra(R, S) {
  const [x0, y0, x1, y1] = S.cl, prev = new Uint8Array(S.mask), cielo = new Set(S.noche ? c_CIELO.noche.concat([hex('#5a3a6a')]) : c_CIELO.dia);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = y * 320 + x; if (prev[i] && !cielo.has(R.pget(x, y))) S.mask[i] = 0; }
  S.ventanas = S.ventanas.filter(([x, y, c]) => R.pget(x, y) === c);
}

// la vida del skyline (cada fotograma): nubes de tres tonos a tres velocidades solo sobre el cielo, pájaros y un avión
// (de día); estrellas que titilan, la luna, el avión con su luz y ventanas que se encienden y se apagan (de noche)
function c_skylineVida(R, S, t, k = 0, o = {}) {
  const [x0, y0, x1, y1] = S.cl, W = x1 - x0, A = y1 - y0, en = (x, y) => x >= x0 && x <= x1 && y >= y0 && y <= y1 && S.mask[y * 320 + x];
  const ps = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (en(x, y) && !(x > 268 && y < 48)) R.pset(x, y, c); };
  if (!S.noche) {
    const NUB = [[hex('#c4d6ea'), hex('#e6f0f8'), hex('#ffffff')], [hex('#b0c4dc'), hex('#d6e4f2'), hex('#f2f8fc')], [hex('#a0b4cc'), hex('#c8d8ea'), hex('#e8f0f8')]];
    for (let n = 0; n < 6; n++) { const capa = n % 3, v = [1.6, 3.2, 5.5][capa], w = [9, 12, 16][capa] * (o.esc ?? 1), span = W + w * 2 + 20;
      const cx = x0 - w + ((h(n, 1, 210 + k) * span + t * v) % span), cy = y0 + 3 + A * (0.08 + h(n, 2, 210 + k) * 0.28);
      // la nube, píxel a píxel dentro de la máscara (para que no tape los edificios)
      const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], [cS, c, cL] = NUB[capa];
      for (const [col, dyy, f2] of [[cS, 1, 1], [c, 0, 1], [cL, -1, 0.7]]) for (const [dx, dy, f] of B) { const r = Math.max(1, Math.round(f * w * f2)), bx = Math.round(cx + dx * w + (dyy < 0 ? -1 : 0)), by = Math.round(cy + dy * w + dyy);
        for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) ps(bx + i, by + j, col); } }
    for (let b = 0; b < 3; b++) { const u = ((t * (6 + b * 2) / W + h(b, 3, 211 + k)) % 1.4), bx = x0 + u * W, by = y0 + A * (0.2 + h(b, 4, 211 + k) * 0.25) + Math.sin(t * 2 + b) * 2, ala = Math.sin(t * 12 + b * 2) > 0;
      ps(bx, by, hex('#2a3446')); ps(bx - 1, by + (ala ? -1 : 0), hex('#2a3446')); ps(bx + 1, by + (ala ? -1 : 0), hex('#2a3446')); }
    { const u = ((t / 30 + h(k, 5, 212)) % 1.3), ax = x1 - u * (W + 20), ay = y0 + A * 0.1 + u * 4; if (ax > x0) { ps(ax, ay, hex('#e8eef4')); ps(ax + 1, ay, hex('#8894a8')); for (let i = 2; i < 12; i++) if (h(i, Math.floor(ax), 3) > 0.3) ps(ax + i, ay, hex('#f4f8fc')); } }
  } else {
    for (let s = 0; s < 30; s++) { const x = x0 + Math.floor(h(s, 1, 213 + k) * W), y = y0 + Math.floor(h(s, 2, 213 + k) * A * 0.5), b = Math.sin(t * (1.3 + s % 3) + s * 1.7); if (b > -0.3) ps(x, y, b > 0.6 ? hex('#f0f0ff') : hex('#7a7ab8')); }
    { const u = ((t / 26 + h(k, 6, 214)) % 1.3), ax = x0 + u * (W + 20), ay = y0 + A * 0.18 - u * 3; if (ax < x1) { ps(ax, ay, hex('#5a5a7a')); ps(ax + 1, ay, hex('#5a5a7a')); if (Math.floor(t * 2) % 2) ps(ax - 1, ay, hex('#ff5a5a')); if (Math.sin(t * 9) > 0.7) ps(ax + 2, ay, hex('#ffffff')); } }
    // ventanas que cambian: una de cada cinco se apaga o se enciende a su ritmo
    S.ventanas.forEach(([x, y, c, base], i) => { if (i % 5) return; const on = h(i, Math.floor(t / 3 + h(i, 0, 215) * 7), 216) < 0.6; R.pset(x, y, on ? c : base); });
  }
}

// una figura pequeña de fondo (de 5 a 16 px de alto) con abrigo, gorro y bufanda: se mece, da pataditas de frío y, de vez
// en cuando, echa vaho; k la hace distinta (colores, gorro); o.movil: la cara iluminada por el móvil (2013)
function c_figurilla(R, x, suelo, alto, t, k, o = {}) {
  const AB = ['#c83a3a', '#3a5aa8', '#2a2a36', '#5a7a3a', '#a86a2a', '#6a3a7a', '#3a7a8a', '#8a8a96', '#e8a83a'].map(hex), GO = ['#e8e0d0', '#c83a3a', '#2a2a36', '#e8c040', '#3a6ac8'].map(hex);
  const PI = ['#f6c290', '#d49a6a', '#a8704a', '#7e4e30'].map(hex), ab = o.ropa ? hex(o.ropa[k % o.ropa.length]) : AB[k % AB.length], go = GO[(k * 3) % GO.length], piel = PI[(k * 7) % 4];
  const s = alto / 16, mece = Math.round(Math.sin(t * 1.3 + k * 1.9) * 0.6 * s), salta = (t * 0.7 + k * 0.37) % 4 < 0.15 ? 1 : 0, X = Math.round(x) + mece, Y = Math.round(suelo) - salta;
  const cab = Math.max(1, Math.round(2.6 * s)), cuerpo = Math.max(2, Math.round(7 * s)), piernas = Math.max(1, Math.round(4 * s)), ancho = Math.max(1, Math.round(3 * s));
  const yC = Y - piernas - cuerpo, yH = yC - cab;
  R.rect(X - ancho + 1, Y - piernas, X - 1, Y, hex('#1e1e2a')); R.rect(X + 1, Y - piernas, X + ancho - 1 + (ancho < 2 ? 1 : 0), Y, hex('#1e1e2a'));
  R.rect(X - ancho, yC, X + ancho, Y - piernas, ab); R.rect(X + ancho, yC + 1, X + ancho, Y - piernas, c_mezcla(ab, hex('#000000'), 0.35));
  if (alto >= 9) { R.rect(X - ancho, yC, X + ancho, yC + Math.max(0, Math.round(s)), (k % 2) ? hex('#e8e0d0') : hex('#c83a3a')); }
  R.disco(X, yH + cab - 1, cab, piel); R.rect(X - cab, yH - 1, X + cab, yH + Math.max(0, Math.round(cab * 0.4)), go); if (alto >= 10) R.pset(X, yH - 2, go);
  if (o.movil && alto >= 8 && (k % 3 === 0)) { R.pset(X + ancho, yC + 2, hex('#a8e8ff')); c_aclara(R, X, yH + cab, 0.35, [168, 232, 255]); }
  const vaho = (t * 0.6 + k * 0.53) % 3; if (alto >= 7 && vaho < 0.9) { const u = vaho / 0.9; for (let i = 0; i < 3; i++) if (h(k, i, 230) < 0.8 - u * 0.5) R.pset(X + Math.round((1.5 + u * 4 + i) * s * (k % 2 ? 1 : -1)), yH + cab - Math.round(u * 3 * s) - i, c_mezcla(hex('#e8eef6'), hex('#8a94b0'), u)); }
}

// un taxi amarillo de Nueva York visto de lado (x: el centro, suelo: donde pisan las ruedas, dir 1 → derecha): carrocería
// con luz y sombra, la franja de cuadros, las ventanillas con reflejo, el cartelito del techo (sin letras), ruedas que
// giran, los faros con su haz por delante, la luz roja de atrás y nieve en el techo
function c_taxi(R, x, suelo, dir, t, o = {}) {
  const cl = o.cl ?? [0, 0, 319, 179], X = (u) => Math.round(x + u * dir), r = (a, b, y0, y1, c) => c_rr(R, cl, Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c), K = C.k, P = c_P;
  if (o.cl) R.recorte(o.cl);
  if (o.haz !== false) for (let y = suelo - 9; y <= suelo - 1; y++) for (let u = 22; u < 46; u++) if (c_b4(X(u), y) < 0.45 - (u - 22) * 0.017 - Math.abs(y - suelo + 6) * 0.03) c_aclara(R, X(u), y, 0.35, [255, 240, 190]);
  r(-21, 21, suelo - 12, suelo - 3, K); r(-20, 20, suelo - 11, suelo - 4, P.taxi); r(-20, 20, suelo - 11, suelo - 11, P.taxiL); r(-20, 20, suelo - 5, suelo - 4, P.taxiS);
  R.poligono([[X(-12), suelo - 12], [X(10), suelo - 12], [X(6), suelo - 19], [X(-9), suelo - 19]], K);
  R.poligono([[X(-11), suelo - 12], [X(9), suelo - 12], [X(5), suelo - 18], [X(-8), suelo - 18]], P.taxi);
  r(-9, -2, suelo - 17, suelo - 13, hex('#2a3a5a')); r(0, 6, suelo - 17, suelo - 13, hex('#2a3a5a')); r(-1, -1, suelo - 17, suelo - 12, K); R.pset(X(-8), suelo - 17, hex('#a8c8e8')); R.pset(X(1), suelo - 17, hex('#a8c8e8'));
  r(-5, 2, suelo - 22, suelo - 19, K); r(-4, 1, suelo - 21, suelo - 20, hex('#fff4c0')); if (o.nieve !== false) { r(-8, 6, suelo - 20, suelo - 20, P.nieve); r(-4, 1, suelo - 23, suelo - 23, P.nieve); }
  for (let u = -18; u < 18; u += 2) R.pset(X(u), suelo - 8, (u >> 1) & 1 ? K : hex('#f0f0f0'));
  r(-1, -1, suelo - 11, suelo - 4, P.taxiS); R.pset(X(3), suelo - 9, K);
  r(19, 20, suelo - 10, suelo - 8, hex('#fff8d0')); r(-20, -19, suelo - 10, suelo - 8, hex('#e83030'));
  for (const u of [-12, 12]) { R.disco(X(u), suelo - 2, 4, K); R.disco(X(u), suelo - 2, 2, hex('#8a8e9a')); const a = t * 10 * dir; R.pset(Math.round(X(u) + Math.cos(a) * 2), Math.round(suelo - 2 + Math.sin(a) * 2), K); }
  if (o.cl) R.recorte(null);
}

// las tres guitarras colgadas (una eléctrica roja, una acústica y un bajo azul), con su soporte, cuerdas y brillo
function c_guitarra(R, x, y, tipo) {
  const K = C.k, col = [hex('#c83a3a'), hex('#d8a060'), hex('#3a6ac8')][tipo], colS = c_mezcla(col, hex('#000000'), 0.35), colL = c_mezcla(col, hex('#ffffff'), 0.35);
  R.rect(x - 3, y - 2, x + 3, y, hex('#3a3a42')); R.pset(x, y - 3, hex('#8a8a96'));
  R.rect(x - 2, y + 1, x + 2, y + 5, K); R.rect(x - 1, y + 2, x + 1, y + 4, hex('#2a2018')); for (const j of [2, 4]) { R.pset(x - 2, y + j, hex('#c8c8d0')); R.pset(x + 2, y + j, hex('#c8c8d0')); }
  R.rect(x - 1, y + 6, x + 1, y + 22, K); R.rect(x, y + 6, x, y + 22, hex('#6a4a2a')); for (let j = 9; j < 22; j += 3) R.pset(x, y + j, hex('#c8c8a0'));
  if (tipo === 1) { R.disco(x, y + 26, 6, K); R.disco(x, y + 33, 8, K); R.disco(x, y + 26, 5, col); R.disco(x, y + 33, 7, col); R.disco(x + 1, y + 34, 5, colS); R.disco(x, y + 33, 6, col); R.disco(x - 2, y + 30, 2, colL); R.disco(x, y + 27, 2, K); R.rect(x - 3, y + 37, x + 3, y + 37, hex('#3a2418')); }
  else { R.poligono([[x - 6, y + 22], [x + 6, y + 24], [x + 9, y + 34], [x + 2, y + 40], [x - 8, y + 38], [x - 7, y + 30]], K); R.poligono([[x - 5, y + 23], [x + 5, y + 25], [x + 8, y + 34], [x + 2, y + 39], [x - 7, y + 37], [x - 6, y + 30]], col);
    R.poligono([[x + 4, y + 28], [x + 8, y + 34], [x + 2, y + 39], [x - 3, y + 38]], colS); R.linea(x - 5, y + 24, x - 6, y + 31, colL); R.rect(x - 3, y + 28, x + 3, y + 29, hex('#e8e8f0')); R.rect(x - 2, y + 33, x + 2, y + 34, hex('#2a2a2a')); for (const dx of [-1, 1]) R.pset(x + dx, y + 36, hex('#d8d8e0')); }
  R.linea(x, y + 6, x, y + 36, hex('#d8d8c8'));
}

// un disco de oro enmarcado (marco negro, paspartú, el disco con sus surcos y una placa lisa); el brillo lo pone la vida
function c_discoOro(R, x, y) {
  R.rect(x, y, x + 20, y + 24, C.k); R.rect(x + 1, y + 1, x + 19, y + 23, hex('#e8e0d0')); R.disco(x + 10, y + 10, 7, hex('#a07818')); R.disco(x + 10, y + 10, 6, C.oro);
  for (const r of [5, 3]) for (let a = 0; a < 6.28; a += 0.5) R.pset(Math.round(x + 10 + Math.cos(a) * r), Math.round(y + 10 + Math.sin(a) * r), C.oroS);
  R.disco(x + 10, y + 10, 1, C.k); R.pset(x + 7, y + 6, C.oroL); R.pset(x + 6, y + 7, C.oroL); R.rect(x + 5, y + 19, x + 15, y + 21, hex('#2a2a2a')); R.rect(x + 6, y + 20, x + 14, y + 20, C.oro);
}

// un cartel de cine sin letras: el cielo de la ciudad, la silueta de alguien con sombrero, un coche y rayas en vez de títulos
function c_cartel(R, x0, y0, w, alto, k = 0) {
  const x1 = x0 + w, y1 = y0 + alto, A = [hex('#2a1a3a'), hex('#c8402a'), hex('#e8a040')], B = [hex('#14202e'), hex('#2a6a8a'), hex('#e8e0c0')], P2 = k ? B : A;
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k); c_degradado(R, x0, y0, x1, y1, [P2[0], P2[1], P2[2]]);
  R.disco(x0 + (w >> 1), y0 + Math.round(alto * 0.62), Math.round(w * 0.28), c_mezcla(P2[2], hex('#ffffff'), 0.4));
  for (let i = 0; i < w; i += 3) { const hh = 4 + Math.floor(h(i, k, 220) * 10); R.rect(x0 + i, y1 - 6 - hh, x0 + i + 2, y1 - 6, P2[0]); }
  const cx = x0 + (w >> 1); R.rect(cx - 3, y0 + Math.round(alto * 0.3), cx + 3, y1 - 6, C.k); R.disco(cx, y0 + Math.round(alto * 0.25), 3, C.k); R.rect(cx - 5, y0 + Math.round(alto * 0.25) - 3, cx + 5, y0 + Math.round(alto * 0.25) - 2, C.k); R.rect(cx - 2, y0 + Math.round(alto * 0.25) - 6, cx + 2, y0 + Math.round(alto * 0.25) - 3, C.k);
  R.rect(x0 + 2, y1 - 6, x1 - 2, y1 - 1, C.k); R.rect(x0 + 4, y1 - 4, x1 - 4, y1 - 4, P2[2]); R.rect(x0 + 3, y0 + 2, x1 - 3, y0 + 3, P2[2]); R.rect(x0 + 6, y0 + 5, x1 - 6, y0 + 5, c_mezcla(P2[2], P2[1], 0.5));
}

// el loft de Rockstar (encuadre 'loft', cámara general): ver la cabecera de nuevayork()
function c_loft(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = c_P, noche = !!o.noche;
  const W1 = [114, 28, 174, 98], W2 = [190, 28, 250, 98];
  const S = c_fijo(R, 'loft|' + noche, () => {
    // la pared de ladrillo con hollín arriba y, de día, la luz de los ventanales
    c_ladrillo(R, 0, 0, 319, 127, 31);
    for (let y = 0; y < 40; y++) for (let x = 0; x < 320; x++) if (c_b4(x, y) < (40 - y) / 40 * 0.55) c_aclara(R, x, y, 0.28, [40, 24, 20]);
    for (let y = 100; y < 128; y++) for (let x = 0; x < 320; x++) if (c_b4(x, y) < (y - 100) / 28 * 0.5) c_aclara(R, x, y, 0.22, [50, 30, 24]);
    if (noche) for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) if (c_b4(x, y) < 0.75) c_aclara(R, x, y, 0.42, [24, 22, 52]);
    // la pared de la esquina de Atom, tranquila: el ladrillo pintado de un tono apagado
    for (let y = 0; y < 50; y++) for (let x = 272; x < 320; x++) c_aclara(R, x, y, 0.3, noche ? [40, 36, 60] : [140, 96, 84]);
    // el techo: vigas, el conducto plateado con sus juntas y remaches y la tubería roja de los rociadores con sus abrazaderas
    rect(0, 0, 319, 5, P.vigaS); for (let x = 6; x < 320; x += 20) { rect(x, 0, x + 5, 5, P.viga); rect(x, 0, x + 5, 0, P.vigaL); }
    rect(0, 6, 319, 9, P.viga); rect(0, 6, 319, 6, P.vigaL); rect(0, 9, 319, 9, P.vigaS);
    rect(0, 15, 262, 22, K); rect(0, 16, 261, 21, hex('#8a949e')); rect(0, 16, 261, 17, hex('#b8c2ca')); rect(0, 21, 261, 21, hex('#5e6872'));
    for (let x = 18; x < 262; x += 30) { rect(x, 15, x + 1, 22, hex('#5e6872')); pset(x - 2, 18, hex('#d8e0e8')); pset(x + 3, 18, hex('#d8e0e8')); }
    rect(258, 15, 266, 30, K); rect(259, 16, 265, 29, hex('#8a949e')); rect(259, 16, 260, 29, hex('#b8c2ca')); rect(257, 30, 267, 33, K); rect(258, 31, 266, 32, hex('#5e6872'));
    for (let x = 4; x < 256; x += 36) { rect(x, 10, x, 13, hex('#3a3a3a')); } rect(0, 13, 255, 14, hex('#a83a2a')); rect(0, 13, 255, 13, hex('#c85a4a')); for (let x = 10; x < 256; x += 36) { rect(x, 12, x + 2, 14, K); pset(x + 1, 15, hex('#c8c8c8')); }
    // los dos ventanales: arco rebajado de ladrillos a sardinel, el marco de acero y el alféizar de piedra
    for (const [a, y0, b, y1] of [W1, W2]) {
      for (let x = a - 4; x <= b + 4; x += 3) { const d = (x - (a + b) / 2) / ((b - a) / 2 + 4), yy = Math.round(y0 - 3 - (1 - d * d) * 4); rect(x, yy - 4, x + 1, yy, h(x, 1, 33) > 0.5 ? P.lad3 : P.lad2); rect(x + 2, yy - 4, x + 2, yy, P.junta); }
      rect(a - 3, y0 - 3, b + 3, y1 + 2, K); rect(a - 2, y0 - 2, b + 2, y1 + 1, P.acero); rect(a - 2, y0 - 2, b + 2, y0 - 2, P.aceroL);
      rect(a - 6, y1 + 2, b + 6, y1 + 5, K); rect(a - 5, y1 + 2, b + 5, y1 + 3, hex('#c8c0b0')); rect(a - 5, y1 + 4, b + 5, y1 + 4, hex('#8a8478')); for (let x = a - 4; x < b + 5; x += 5) pset(x, y1 + 3, hex('#a8a090'));
    }
    const info = { a: c_skylineFijo(R, W1, noche, 1), b: c_skylineFijo(R, W2, noche, 2) };
    // los montantes de acero de los ventanales y el reflejo en los cristales
    for (const [a, y0, b, y1] of [W1, W2]) { for (let x = a + 15; x < b; x += 15) { rect(x, y0, x + 1, y1, P.aceroS); rect(x, y0, x, y1, P.acero); } for (let y = y0 + 17; y < y1; y += 18) { rect(a, y, b, y + 1, P.aceroS); rect(a, y, b, y, P.acero); }
      if (!noche) for (const [gx, gy] of [[a + 4, y0 + 30], [a + 34, y0 + 48]]) for (let i = 0; i < 2; i++) for (let j = 0; j < 9; j++) { const px = gx + i * 3 + Math.round(j * 0.5), py = gy - j; R.pset(px, py, c_mezcla(R.pget(px, py), hex('#ffffff'), 0.45)); } }
    // la pared de la izquierda: las tres guitarras, los dos discos de oro y, debajo, dos carteles de cine sin letras
    c_guitarra(R, 16, 32, 0); c_guitarra(R, 38, 30, 1); c_guitarra(R, 60, 32, 2);
    c_discoOro(R, 78, 30); c_discoOro(R, 78, 60); c_cartel(R, 8, 78, 24, 22, 0); c_cartel(R, 42, 78, 24, 22, 1);
    // el sofá Chesterfield de cuero con sus capitonés, los brazos enrollados y la manta
    rect(6, 104, 82, 134, K); rect(7, 105, 81, 120, P.cuero); rect(7, 105, 81, 106, P.cueroL);
    for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) { const bx = 10 + i * 6 + (j % 2) * 3, by = 108 + j * 4; if (bx < 79) { pset(bx, by, P.cueroS); pset(bx - 1, by - 1, P.cueroL); } }
    rect(7, 120, 81, 126, P.cueroL); rect(7, 121, 81, 126, P.cuero); rect(7, 126, 81, 127, P.cueroS); for (const x of [32, 56]) rect(x, 121, x, 126, P.cueroS);
    for (const x of [3, 77]) { rect(x, 110, x + 8, 130, K); rect(x + 1, 111, x + 7, 130, P.cuero); disco(x + 4, 112, 4, K); disco(x + 4, 112, 3, P.cueroL); pset(x + 4, 112, P.cueroS); rect(x + 1, 128, x + 7, 130, P.cueroS); }
    rect(7, 127, 81, 131, P.cueroS); for (const x of [12, 76]) rect(x, 131, x + 2, 134, hex('#2a1a10'));
    poligono([[50, 106], [66, 106], [70, 124], [54, 126]], hex('#3a6a8a')); for (let y = 108; y < 125; y += 3) linea(51 + (y - 106) * 0.2, y, 67 + (y - 106) * 0.2, y, hex('#e8c040'));
    // la caja de vinilos (lomos de colores) y, encima, el tocadiscos (el plato lo hace girar la vida)
    rect(86, 112, 108, 134, K); rect(87, 113, 107, 133, hex('#8a6440')); rect(87, 113, 107, 114, hex('#a8804e'));
    for (let i = 0; i < 9; i++) rect(89 + i * 2, 116 - (i % 3), 89 + i * 2, 130, [hex('#c83a3a'), hex('#2a2a36'), hex('#e8c040'), hex('#3a6ac8'), hex('#e8e0d0'), hex('#5aa86a')][i % 6]);
    rect(84, 104, 110, 111, K); rect(85, 105, 109, 110, hex('#3a3434')); rect(85, 105, 109, 105, hex('#5a5454')); pset(106, 109, hex('#5aff5a'));
    // bajo los ventanales: el mueble del equipo, con los altavoces, el amplificador, la tele de tubo y los CD
    rect(114, 100 + 4, 252, 134, K); rect(115, 105, 251, 133, hex('#3a2e28')); rect(115, 105, 251, 106, hex('#5a4a40')); for (let x = 115; x < 251; x += 34) { rect(x, 107, x, 133, hex('#2a201c')); rect(x + 14, 118, x + 18, 118, hex('#8a7a60')); }
    for (const x of [118, 230]) { rect(x, 84, x + 18, 104, K); rect(x + 1, 85, x + 17, 103, hex('#2a2a2e')); rect(x + 1, 85, x + 17, 85, hex('#4a4a52')); }
    rect(140, 96, 168, 104, K); rect(141, 97, 167, 103, hex('#c8c8cc')); rect(141, 97, 167, 97, hex('#e8e8ec')); for (let i = 0; i < 4; i++) disco(146 + i * 6, 100, 1, hex('#5a5a62')); rect(162, 99, 165, 100, hex('#3a8a3a'));
    rect(172, 72, 212, 104, K); rect(173, 73, 211, 103, hex('#3a3a3e')); rect(173, 73, 211, 74, hex('#5a5a62')); rect(176, 76, 204, 98, K); rect(206, 78, 209, 80, hex('#5a5a62')); rect(206, 84, 209, 85, hex('#5a5a62')); rect(206, 90, 209, 100, hex('#2a2a2e'));
    for (let i = 0; i < 6; i++) rect(214 + i * 2, 94 - (i % 2), 215 + i * 2, 104, [hex('#e8e8f0'), hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040'), hex('#2a2a36'), hex('#8a5ac8')][i]);
    // la puerta metálica con la estrella dorada, sus remaches y el tirador; la planta junto a ella
    rect(268, 56, 308, 128, K); rect(270, 58, 306, 128, hex('#4a5a5a')); rect(270, 58, 306, 59, hex('#6a7a7a')); rect(305, 60, 306, 128, hex('#34403f'));
    for (let y = 62; y < 128; y += 10) for (const x of [272, 304]) pset(x, y, hex('#8a9a9a'));
    rect(272, 92, 304, 93, hex('#34403f')); rect(298, 94, 302, 96, K); rect(299, 95, 301, 95, hex('#c8c8c8'));
    { const sx = 288, sy = 74, pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 4.2 : 10; pts.push([sx + Math.cos(a) * r, sy + Math.sin(a) * r]); }
      poligono(pts.map(([x, y]) => [x + 1, y + 1]), hex('#2a3434')); poligono(pts, C.oro); poligono(pts.map(([x, y]) => [sx + (x - sx) * 0.6, sy + (y - sy) * 0.6 - 1]), C.oroL); pset(sx, sy, C.oroS); }
    rect(254, 116, 266, 128, K); rect(255, 117, 265, 127, hex('#b8683a')); rect(255, 117, 265, 118, hex('#d8885a'));
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.32, L = 14 + (k % 3) * 4; linea(260, 116, Math.round(260 + Math.cos(a) * L * 0.6), Math.round(116 + Math.sin(a) * L), k % 2 ? hex('#3a7a3a') : hex('#5aa84a')); }
    // el suelo de tablones en perspectiva (vetas, juntas y testas) y el zócalo
    rect(0, 126, 319, 128, hex('#2a1e18')); rect(0, 126, 319, 126, hex('#4a3a30'));
    for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x - 160) * 260 / (y + 130) + 160, tabla = Math.floor(u / 14), f = u / 14 - tabla, v = h(tabla, 0, 34);
      const testa = Math.floor((y * 3 + h(tabla, 1, 34) * 90) / 45); let c = v < 0.33 ? P.tabla1 : v < 0.66 ? P.tabla2 : P.tabla3;
      if (f < 0.07) c = P.tablaS; else if (h(tabla, testa, 35) < 0.12 && ((y * 3 + Math.floor(h(tabla, 1, 34) * 90)) % 45) < 2) c = P.tablaS; else if (h(Math.floor(u * 0.7), Math.floor(y / 2), 36) < 0.08) c = P.tablaV;
      pset(x, y, c); }
    for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) if (c_b4(x, y) < (180 - y) / 51 * 0.35) c_aclara(R, x, y, 0.25, [30, 18, 12]);
    // la alfombra persa en perspectiva: el campo con su trama, la greca de la orilla, la cenefa dorada, el medallón azul
    // del centro con sus puntas, los cuartos de medallón de las esquinas, el pelo gastado por donde se pisa y los flecos
    const ap = (x, y) => Math.round(165 + (x - 165) * (1 + (y - 140) / 90));
    poligono([[96, 140], [234, 140], [262, 172], [68, 172]], P.alfombraS); poligono([[98, 141], [232, 141], [258, 170], [72, 170]], P.alfombra);
    for (let y = 141; y < 171; y++) for (let x = 68; x < 262; x++) if (R.pget(x, y) === P.alfombra && c_b4(x, y) < 0.12 + h(x >> 1, y, 37) * 0.1) pset(x, y, P.alfombraS);
    poligono([[104, 144], [226, 144], [248, 166], [82, 166]], P.oroAlf); poligono([[106, 145], [224, 145], [245, 165], [85, 165]], P.alfombra);
    for (let x = 100; x < 232; x += 4) { pset(ap(x, 142), 142, P.oroAlf); pset(ap(x + 2, 168), 168, P.alfombraL); pset(ap(x, 168), 168, P.oroAlf); }
    for (let y = 143; y < 168; y += 3) { pset(Math.round(101 - (y - 141) * 0.93), y, P.oroAlf); pset(Math.round(229 + (y - 141) * 0.93), y, P.oroAlf); }
    for (let y = 147; y < 164; y += 4) for (let x = 100; x < 232; x += 8) { const xx = ap(x, y); if (Math.abs(xx - 165) < 34 && Math.abs(y - 155) < 8) continue; pset(xx, y, P.alfombraL); pset(xx - 1, y + 1, P.alfombraL); pset(xx + 1, y + 1, P.alfombraL); pset(xx, y + 2, P.alfombraL); }
    { const az = hex('#2a3a6a'), azL = hex('#4a5a9a');
      poligono([[165, 146], [200, 155], [165, 164], [130, 155]], P.oroAlf); poligono([[165, 147], [197, 155], [165, 163], [133, 155]], az);
      poligono([[165, 150], [186, 155], [165, 160], [144, 155]], P.alfombraL); poligono([[165, 151], [182, 155], [165, 159], [148, 155]], P.alfombra);
      disco(165, 155, 2, P.oroAlf); pset(165, 155, az); for (const [dx, dy] of [[-26, 0], [26, 0], [-12, -5], [12, -5], [-12, 5], [12, 5]]) pset(165 + dx, 155 + dy, azL);
      pset(203, 155, P.oroAlf); pset(127, 155, P.oroAlf); pset(165, 145, P.oroAlf); pset(165, 165, P.oroAlf);
      for (const [cx, cy, sx, sy] of [[ap(107, 146), 146, 1, 1], [ap(223, 146), 146, -1, 1], [ap(107, 164), 164, 1, -1], [ap(223, 164), 164, -1, -1]]) {
        poligono([[cx, cy], [cx + sx * 12, cy], [cx, cy + sy * 5]], az); pset(cx + sx * 2, cy + sy, P.oroAlf); pset(cx + sx * 5, cy + sy, azL); } }
    for (let y = 148; y < 166; y++) for (let x = 120; x < 214; x++) if (c_b4(x, y) < 0.1 && h(x >> 3, y >> 2, 38) < 0.5) c_aclara(R, x, y, 0.18, [220, 180, 150]);
    for (let x = 98; x < 233; x += 2) { const xx = x; pset(xx, 139, hex('#e8d8b0')); }
    for (let x = 70; x < 262; x += 3) pset(x, 171, hex('#e8d8b0'));
    // la luz del día (o el resplandor azul de la noche) que entra por los ventanales y cae sobre el suelo
    for (const [a, , b] of [W1, W2]) for (let y = 130; y < 179; y++) { const d = (y - 128) * 0.9, xa = Math.round(a - 20 + d), xb = Math.round(b - 20 + d);
      for (let x = xa; x <= xb; x++) { const m = (x - xa) % 15; if (m === 0 || (y - 130) % 18 === 0) continue; if (c_b4(x, y) < (noche ? 0.25 : 0.55)) c_aclara(R, x, y, noche ? 0.15 : 0.18, noche ? [120, 140, 220] : [255, 236, 190]); } }
    c_refiltra(R, info.a); c_refiltra(R, info.b);
    return info;
  });
  // la vida: el skyline (nubes, pájaros, avión; de noche estrellas y ventanas) y la paloma del alféizar
  c_skylineVida(R, S.a, t, 1); c_skylineVida(R, S.b, t, 2);
  { const u = (t % 14) / 14, px = Math.round(216 + (u < 0.5 ? u : 1 - u) * 60), pp = Math.floor(t * 3) % 2 && (u % 0.5) < 0.4; R.recorte([W2[0], W2[1], W2[2], W2[3]]);
    disco(px, 94, 2, hex('#7a7e8e')); disco(px + 3 * (u < 0.5 ? 1 : -1), 92 - (pp ? 1 : 0), 1, hex('#5a5e6e')); pset(px + 4 * (u < 0.5 ? 1 : -1), 92 - (pp ? 1 : 0), hex('#e8a040')); pset(px, 96, hex('#e8a040')); R.recorte(null); }
  // los discos de oro brillan por turnos; la estrella de la puerta destella
  for (const [dx, dy, f] of [[88, 40, 0], [88, 70, 2.2]]) { const g = ((t + f) % 4.4) / 0.6; if (g < 1) { const a = g * Math.PI * 2; pset(Math.round(dx + Math.cos(a) * 6), Math.round(dy + Math.sin(a) * 6), C.blanco); } }
  { const g = (t % 5) / 0.5; if (g < 1) { const c = c_mezcla(C.oroL, C.blanco, 1 - Math.abs(g - 0.5) * 2); pset(284, 70, C.blanco); linea(281, 70, 287, 70, c); linea(284, 67, 284, 73, c); } }
  // el tocadiscos: el plato gira con su brillo y el brazo
  disco(97, 106, 4, K); disco(97, 106, 3, hex('#1e1e22')); { const a = t * 3.5; pset(Math.round(97 + Math.cos(a) * 2), Math.round(106 + Math.sin(a) * 2), hex('#6a6a7a')); } pset(97, 106, hex('#c83a3a')); linea(104, 104, 100, 107, hex('#c8c8c8'));
  // los altavoces laten con la música y la tele de tubo cambia de imagen (un coche que cruza una calle, unas notas)
  for (const x of [118, 230]) { const p = Math.abs(Math.sin(t * 7.5 + x)) > 0.6 ? 1 : 0; disco(x + 9, 92, 5 + p, K); disco(x + 9, 92, 4 + p, hex('#3a3a40')); disco(x + 9, 92, 1, hex('#5a5a62')); disco(x + 9, 100, 2, hex('#3a3a40')); }
  { const cl = [177, 77, 203, 97], fase = Math.floor(t / 2.6) % 3; R.recorte(cl);
    if (fase === 0) { c_rr(R, cl, 177, 77, 203, 97, hex('#2a3a6a')); c_rr(R, cl, 177, 90, 203, 97, hex('#3a3a46')); for (let i = 0; i < 5; i++) c_rr(R, cl, 178 + i * 6, 81 + (i % 2) * 3, 181 + i * 6, 90, hex('#1a2244')); const cx = 170 + ((t * 18) % 44); c_rr(R, cl, cx, 91, cx + 6, 93, hex('#e8c040')); c_rr(R, cl, cx + 1, 89, cx + 4, 90, hex('#e8c040')); }
    else if (fase === 1) { c_rr(R, cl, 177, 77, 203, 97, hex('#3a2a5a')); for (let i = 0; i < 3; i++) { const nx = 182 + i * 8, ny = 92 - Math.round(((t * 10 + i * 5) % 14)); c_rr(R, cl, nx, ny, nx + 1, ny + 1, hex('#ff8ac8')); c_rr(R, cl, nx + 1, ny - 4, nx + 1, ny, hex('#ff8ac8')); } }
    else { c_rr(R, cl, 177, 77, 203, 97, hex('#1a1a1a')); for (let k = 0; k < 40; k++) R.pset(177 + Math.floor(h(k, Math.floor(t * 12), 37) * 27), 77 + Math.floor(h(k, 1, Math.floor(t * 12)) * 21), hex('#8a8a8a')); }
    R.recorte(null); pset(178, 78, hex('#ffffff')); }
  // el gato del sofá, que se despereza de vez en cuando
  gato(R, 26, 120, t, { dir: 1 });
  // las lámparas colgantes, que se mecen; de noche encendidas con su halo
  for (const [x, f] of [[144, 0], [220, 1.3], [262, 2.1]]) { const s = Math.round(Math.sin(t * 0.9 + f) * 1.5), bx = x + s, by = 40;
    if (noche) R.halo(bx, by + 4, 16, [hex('#4a3a3a'), hex('#7a5a40'), hex('#a8804a')], 0.9);
    linea(x, 10, bx, by - 6, hex('#1a1a1a')); poligono([[bx - 7, by + 2], [bx + 7, by + 2], [bx + 3, by - 6], [bx - 3, by - 6]], K); poligono([[bx - 6, by + 1], [bx + 6, by + 1], [bx + 2, by - 5], [bx - 2, by - 5]], hex('#2a4a3a')); linea(bx - 2, by - 5, bx - 5, by, hex('#4a7a5a'));
    rect(bx - 2, by + 2, bx + 2, by + 3, noche ? hex('#fff4c0') : hex('#d8d0b0')); }
  // motas de polvo en la luz de los ventanales
  if (!noche) for (let k = 0; k < 14; k++) { const fy = (h(k, 3, 38) * 70 + t * (2 + h(k, 4, 38) * 3)) % 70, x = Math.round(110 + h(k, 5, 38) * 150 + fy * 0.5 + Math.sin(t * 0.6 + k) * 2), y = Math.round(100 + fy); if (Math.sin(t * 1.4 + k * 2) > -0.2) pset(x, y, hex('#fff4d8')); }
  return { suelo: 156, ventanas: [W1, W2], puerta: [270, 58, 306, 128], estrella: [288, 74], sofa: [6, 104, 82, 134], tocadiscos: [97, 106], tele: [176, 76, 204, 98], mesas: { izq: [0, 76, 148], der: [244, 319, 148] }, detrasMesa: 152, libre: [80, 240] };
}
// delante en el loft: las mesas de trabajo de las esquinas (tablero en y 148) con monitores, teclados, pizza, discos y taza
function c_loftDelante(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, K = C.k, MA = hex('#b8b0a0'), MAL = hex('#d8d0c0'), MAS = hex('#7a7468');
  for (const [a, b] of [[-2, 76], [244, 322]]) { rect(a, 148, b, 153, K); rect(a + 1, 149, b - 1, 150, MAL); rect(a + 1, 151, b - 1, 152, MA); rect(a + 3, 154, b - 3, 179, K); rect(a + 4, 154, b - 4, 179, MAS);
    for (let y = 158; y < 179; y += 8) { rect(a + 8, y, b - 8, y + 5, K); rect(a + 9, y + 1, b - 9, y + 4, MA); rect(a + 9, y + 1, b - 9, y + 1, MAL); rect(((a + b) >> 1) - 3, y + 2, ((a + b) >> 1) + 3, y + 3, hex('#5a5a62')); } }
  // la mesa de la izquierda: el monitor de tubo con la ciudad, el teclado, la caja de pizza abierta y los disquetes
  PIEZAS_GT.monitorTubo?.(R, 52, 149, { pantalla: 'ciudad', t });
  rect(4, 144, 34, 148, K); rect(5, 145, 33, 147, hex('#d8ccb0')); for (let i = 6; i < 33; i += 2) pset(i, 146 - (i % 4 === 0 ? 1 : 0), hex('#a89c80'));
  rect(70, 142, 78, 148, K); rect(71, 143, 77, 147, hex('#2a2a36')); rect(71, 143, 77, 143, hex('#4a4a5a'));
  // la mesa de la derecha: otro monitor, la caja de pizza, una pila de CD (uno gira de lado), la taza que humea y el flexo
  PIEZAS_GT.monitorTubo?.(R, 296, 149, { pantalla: 'ciudad', t: t + 1.7 });
  rect(248, 143, 270, 148, K); rect(249, 144, 269, 147, hex('#e8d8b0')); rect(249, 144, 269, 144, hex('#f8ecd0')); disco(259, 146, 1, hex('#c83a3a')); pset(255, 145, hex('#c83a3a'));
  for (let k = 0; k < 4; k++) { rect(272, 146 - k * 2, 280, 147 - k * 2, K); rect(273, 146 - k * 2, 279, 146 - k * 2, [hex('#c8ccd8'), hex('#e8c040'), hex('#c8ccd8'), hex('#3a6ac8')][k]); }
  rect(312, 140, 317, 148, K); rect(313, 141, 316, 147, hex('#e8e0d0')); rect(317, 142, 319, 145, K); for (let k = 0; k < 3; k++) { const u = ((t * 0.8 + k * 0.33) % 1), y = Math.round(138 - u * 10), x = Math.round(314 + Math.sin(t * 2 + k * 2 + u * 4) * 1.5); if (u < 0.85) pset(x, y, c_mezcla(hex('#ffffff'), hex('#8a8a96'), u)); }
  // el flexo de la izquierda con su cono de luz sobre el teclado
  linea(8, 148, 8, 132, K); linea(9, 148, 9, 132, hex('#4a4a52')); linea(8, 132, 18, 124, K); rect(16, 122, 24, 126, K); rect(17, 123, 23, 125, hex('#c83a3a'));
  for (let y = 127; y < 146; y++) for (let x = 14; x < 30; x++) if (c_b4(x, y) < 0.25 - Math.abs(x - 21 - (y - 127) * 0.1) * 0.03) c_aclara(R, x, y, 0.25, [255, 240, 190]);
  return { tablero: 148 };
}

// el despacho alto de 1998 (cámara 'despacho' del loft)
function c_despacho(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = c_P, VID = [40, 12, 296, 118];
  const S = c_fijo(R, 'despacho', () => {
    rect(0, 0, 319, 179, hex('#c8c0b4'));
    // el techo de placas con las luces empotradas
    rect(0, 0, 319, 11, hex('#e0dcd4')); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 11, hex('#c8c4bc')); rect(0, 5, 319, 5, hex('#c8c4bc')); rect(0, 11, 319, 11, hex('#8a847a'));
    for (const x of [60, 140, 220]) { rect(x - 8, 2, x + 8, 4, hex('#f8f8f0')); }
    // la pared de cristal: el skyline de Manhattan de día, con la máscara del cielo para las nubes
    const sk = c_skylineFijo(R, VID, false, 7);
    // las columnas y los montantes del muro cortina, con sus reflejos
    for (const x of [38, 102, 166, 230, 294]) { rect(x - 2, 12, x + 3, 118, K); rect(x - 1, 12, x + 2, 118, hex('#5a5e66')); rect(x - 1, 12, x - 1, 118, hex('#8a8e96')); }
    rect(38, 62, 296, 63, hex('#4a4e56')); rect(38, 116, 296, 119, K); rect(38, 117, 296, 118, hex('#6a6e76'));
    for (let k = 0; k < 4; k++) { const x0 = 44 + k * 64; for (let i = 0; i < 3; i++) linea(x0 + i * 4, 60, x0 + 12 + i * 4, 14, c_mezcla(hex('#ffffff'), hex('#a4c4e4'), 0.55)); }
    // la pared de la izquierda: la estantería con libros, un cuadro abstracto y la lámpara de pie
    rect(0, 12, 36, 120, hex('#d8d0c0')); rect(0, 12, 36, 13, hex('#e8e0d0')); rect(35, 12, 36, 120, hex('#b0a898'));
    rect(2, 54, 34, 120, K); rect(3, 55, 33, 120, P.nogal); for (const y of [70, 86, 102, 118]) { rect(3, y, 33, y + 1, P.nogalL); rect(3, y + 2, 33, y + 2, P.nogalS); }
    for (const y0 of [56, 72, 88, 104]) for (let x = 5, i = 0; x < 31; i++) { const w = 2 + (h(x, y0, 40) > 0.6 ? 1 : 0), hh = 9 + Math.floor(h(x, y0, 41) * 5); rect(x, y0 + 14 - hh, x + w - 1, y0 + 13, [hex('#8a2a2a'), hex('#2a4a6a'), hex('#c8a040'), hex('#3a5a3a'), hex('#e8e0d0'), hex('#5a3a6a')][Math.floor(h(x, y0, 42) * 6)]); pset(x, y0 + 15 - hh, hex('#f0e8d8')); x += w + (i % 5 === 4 ? 3 : 0); }
    rect(4, 18, 32, 46, K); rect(5, 19, 31, 45, hex('#f0e8d8')); rect(8, 22, 28, 42, hex('#2a4a7a')); disco(14, 30, 5, hex('#e8c040')); rect(20, 26, 27, 40, hex('#c83a3a')); poligono([[9, 41], [18, 33], [27, 41]], hex('#e8e0d0'));
    // la pared de la derecha: el archivador, la planta y el cuadro (pared tranquila arriba, junto a Atom)
    rect(298, 12, 319, 120, hex('#d8d0c0')); rect(298, 12, 299, 120, hex('#b0a898'));
    rect(300, 82, 318, 120, K); rect(301, 83, 317, 120, hex('#8a8e96')); for (const y of [84, 96, 108]) { rect(301, y, 317, y + 10, hex('#9aa0a8')); rect(301, y, 317, y, hex('#c0c4cc')); rect(306, y + 4, 312, y + 5, hex('#4a4e56')); }
    rect(302, 70, 314, 82, K); rect(303, 71, 313, 81, hex('#a8583a')); for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.4; linea(308, 70, Math.round(308 + Math.cos(a) * 8), Math.round(70 + Math.sin(a) * 14), k % 2 ? hex('#3a7a3a') : hex('#5aa84a')); }
    // la moqueta azul con su dibujo en perspectiva y el rodapié
    rect(0, 119, 319, 121, hex('#3a3e4e')); rect(0, 122, 319, 179, hex('#3a4a6a'));
    for (let r = 0; r < 12; r++) { const y = 124 + Math.round(r * 3 + r * r * 0.25); if (y > 178) break; const paso = 10 + r * 2, off = (r % 2) * (paso >> 1); for (let x = off; x < 320; x += paso) { pset(x, y, hex('#4a5a7a')); pset(x + 1, y, hex('#2e3a54')); } }
    for (let y = 122; y < 180; y++) { const z = 300 / (y - 96); for (let x = 0; x < 320; x++) { const u = (x - 160) / (y - 96) * 14, fu = u - Math.floor(u), fv = z - Math.floor(z);
      if (fu < 0.05 || fv < 0.06) pset(x, y, hex('#2e3a56')); else if (c_b4(x, y) < 0.14 + h(Math.floor(u), Math.floor(z), 39) * 0.08) pset(x, y, (Math.floor(u) + Math.floor(z)) & 1 ? hex('#34425e') : hex('#44547a')); } }
    for (let y = 122; y < 180; y++) for (let x = 40; x < 296; x++) if (c_b4(x, y) < 0.36 - (y - 122) * 0.004 && (x - 40 - (y - 122) * 0.6) % 64 > 6) c_aclara(R, x, y, 0.14, [220, 236, 255]);
    for (const [mx, my] of [[18, 136], [300, 150], [14, 168]]) for (let j = -2; j <= 2; j++) for (let i = -6; i <= 6; i++) if ((i / 6) ** 2 + (j / 2) ** 2 < 1 && c_b4(mx + i, my + j) < 0.5) pset(mx + i, my + j, hex('#334060'));
    // la alfombra granate bajo la mesa, en perspectiva, con su cenefa dorada y el dibujo
    poligono([[66, 128], [254, 128], [282, 176], [38, 176]], hex('#4a1820')); poligono([[68, 129], [252, 129], [279, 175], [41, 175]], hex('#7a2a30'));
    poligono([[76, 133], [244, 133], [266, 170], [54, 170]], hex('#c8984a')); poligono([[78, 134], [242, 134], [263, 169], [57, 169]], hex('#7a2a30'));
    for (let y = 137; y < 168; y += 5) for (let x = 70; x < 252; x += 10) { const xx = Math.round(160 + (x - 160) * (1 + (y - 128) / 110)); pset(xx, y, hex('#a8463e')); pset(xx - 1, y + 1, hex('#a8463e')); pset(xx + 1, y + 1, hex('#a8463e')); pset(xx, y + 2, hex('#a8463e')); pset(xx, y + 1, hex('#c8984a')); }
    for (let x = 40; x < 282; x += 3) pset(x, 176, hex('#e8d8b0'));
    // el ficus en su macetón (izquierda) y el globo terráqueo en su pie de madera (derecha), contra el cristal
    rect(44, 108, 62, 122, K); rect(45, 109, 61, 122, hex('#c8c0b0')); rect(45, 109, 61, 110, hex('#e8e0d0')); rect(59, 111, 61, 122, hex('#a8a090'));
    linea(53, 108, 52, 84, hex('#5a3a24')); linea(54, 108, 55, 88, hex('#6a4a2a'));
    for (let k = 0; k < 26; k++) { const a = h(k, 1, 57) * Math.PI * 2, r = 4 + h(k, 2, 57) * 11, x = Math.round(53 + Math.cos(a) * r), y = Math.round(86 + Math.sin(a) * r * 0.9); disco(x, y, 2, k % 3 ? hex('#2a6a3a') : hex('#3a8a4a')); pset(x - 1, y - 1, hex('#5aa85a')); }
    rect(262, 112, 274, 122, K); rect(263, 113, 273, 122, P.nogal); rect(266, 104, 270, 112, P.nogalL); disco(268, 94, 10, K); disco(268, 94, 9, hex('#3a6ac8'));
    for (let y = -9; y <= 9; y++) for (let x = -9; x <= 9; x++) if (x * x + y * y <= 81 && h(Math.floor((x + 9) / 3), Math.floor((y + 9) / 3), 58) < 0.4) pset(268 + x, 94 + y, hex('#5aa85a'));
    for (let a = -1.9; a < 1.9; a += 0.1) pset(Math.round(268 + Math.sin(a) * 11), Math.round(94 - Math.cos(a) * 11), C.oro); pset(264, 90, hex('#a8d8ff'));
    // los reflejos de las luces del techo en lo alto del cristal
    for (const x of [60, 140, 220]) for (let i = -6; i <= 6; i += 2) pset(x + i, 16, c_mezcla(R.pget(x + i, 16), hex('#ffffff'), 0.5));
    // las sillas de cuero de respaldo alto detrás de la mesa
    for (const x of [92, 124, 196, 228]) { rect(x - 8, 118, x + 8, 142, K); rect(x - 7, 119, x + 7, 142, hex('#2a2a32')); rect(x - 7, 119, x + 7, 120, hex('#4a4a56')); for (let y = 123; y < 140; y += 5) rect(x - 6, y, x + 6, y, hex('#1e1e26')); }
    c_refiltra(R, sk);
    return sk;
  });
  c_skylineVida(R, S, t, 7, { esc: 1.4 });
  // un helicóptero que cruza despacio entre los edificios (el rotor gira)
  { const u = (t / 22) % 1.2, hx = Math.round(266 - u * 250), hy = Math.round(40 + Math.sin(t * 0.8) * 3), ps = (x, y, c) => { if (x >= 0 && x < 320 && y >= 0 && y < 180 && S.mask[y * 320 + x]) pset(x, y, c); }, cu = hex('#3a3e4a'), sp = Math.round(Math.sin(t * 30) * 2);
    for (const [dx, dy] of [[-1, -1], [0, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [3, 0], [4, 0], [5, 0], [6, 0], [6, -1]]) ps(hx + dx, hy + dy, cu);
    for (let i = -5 + sp; i <= 5 - sp; i++) ps(hx + i, hy - 3, hex('#6a6e7a')); if (Math.floor(t * 2) % 2) ps(hx, hy + 2, hex('#ff4a4a')); }
  return { suelo: 152, mesa: [70, 144, 250, 150], centroLibre: [130, 190], ventanal: VID };
}
// delante en el despacho: la mesa de reuniones de madera pulida con sus cosas (el centro, x 130–190, libre)
function c_despachoDelante(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = c_P;
  poligono([[70, 144], [250, 144], [262, 152], [58, 152]], K); poligono([[71, 145], [249, 145], [259, 151], [61, 151]], P.nogalL);
  for (let x = 74; x < 250; x += 9) pset(x + (x % 3), 147 + (x % 2), P.nogal); rect(62, 149, 258, 149, P.nogal); { const g = ((t * 0.25) % 1.6) * 180; if (g < 175) rect(72 + Math.round(g), 146, 78 + Math.round(g), 146, hex('#d8a878')); }
  rect(58, 152, 262, 160, K); rect(59, 153, 261, 159, P.nogal); rect(59, 153, 261, 153, P.nogalL);
  for (const x of [72, 248]) { rect(x - 3, 160, x + 3, 179, K); rect(x - 2, 160, x + 2, 179, P.nogalS); rect(x - 2, 160, x - 2, 179, P.nogal); }
  // las carpetas, el contrato con la pluma, la jarra con los vasos y el teléfono
  rect(82, 141, 104, 146, K); rect(83, 142, 103, 143, hex('#2a3a6a')); rect(83, 144, 103, 145, hex('#e8e0d0'));
  poligono([[196, 147], [214, 147], [216, 143], [198, 143]], C.k); poligono([[197, 146], [213, 146], [215, 144], [199, 144]], C.blanco); linea(201, 145, 210, 145, hex('#8a8a96')); linea(206, 146, 212, 142, hex('#2a2a36')); pset(212, 142, C.oro);
  rect(110, 136, 116, 146, K); rect(111, 137, 115, 145, hex('#c8e4f4')); rect(111, 141, 115, 145, hex('#8ac0e0')); pset(111, 137, C.blanco); rect(117, 139, 117, 142, K);
  for (const x of [120, 222]) { rect(x, 141, x + 3, 146, K); rect(x + 1, 142, x + 2, 145, hex('#c8e4f4')); }
  PIEZAS_GT.telefonoNoventa?.(R, 236, 147, { t });
  return { tablero: 144 };
}

// la ropa de la cola según el año: plumíferos de colores (2001), sudaderas oscuras (2008), abrigos y móviles (2013)
const c_ROPA = (año) => año < 2005 ? ['#e83a3a', '#3a8ae8', '#e8c040', '#5ac85a', '#c85ac8'] : año < 2010 ? ['#2a2a36', '#4a4a5a', '#5a3a2a', '#2a3a5a', '#8a2a2a'] : ['#3a3a4a', '#6a8aa8', '#c8a040', '#3a5a3a', '#a83a3a'];

// los lomos y las caras de las cajas de juego genéricas en una balda (y0: arriba del hueco, y1: la balda), sin letras
function c_balda(R, x0, x1, y0, y1, k) {
  const COLS = ['#c83a3a', '#2a4a8a', '#e8c040', '#2a2a36', '#3a8a5a', '#e87a2a', '#8a3a8a', '#e8e8f0', '#3a8ac8', '#a83a5a'].map(hex);
  for (let x = x0, i = 0; x < x1 - 2; i++) { const v = h(i, k, 50);
    if (v < 0.16 && x + 13 < x1) { // una caja de frente: la ilustración nocturna con edificios, el coche y la franja
      const c = COLS[Math.floor(h(i, k, 51) * 10)], top = y1 - 18; R.rect(x, top, x + 12, y1 - 1, C.k); R.rect(x + 1, top + 1, x + 11, y1 - 1, c);
      R.rect(x + 2, top + 2, x + 10, top + 10, hex('#1a2244')); R.rect(x + 3, top + 5, x + 4, top + 10, hex('#3a3a6a')); R.rect(x + 6, top + 4, x + 8, top + 10, hex('#4a4a7a')); R.pset(x + 7, top + 6, hex('#f0c870'));
      R.rect(x + 4, top + 9, x + 7, top + 10, hex('#e83a3a')); R.rect(x + 2, top + 12, x + 7, top + 14, C.blanco); R.rect(x + 3, top + 13, x + 3, top + 13, C.k); R.rect(x + 5, top + 13, x + 6, top + 13, C.k); R.rect(x + 9, top + 12, x + 10, top + 14, c_mezcla(c, hex('#000000'), 0.3));
      x += 14; continue; }
    const w = 3 + (v > 0.8 ? 1 : 0), hh = 15 + Math.floor(h(i, k, 52) * 4), c = COLS[Math.floor(h(i, k, 53) * 10)];
    R.rect(x, y1 - hh, x + w - 1, y1 - 1, c); R.rect(x + w - 1, y1 - hh, x + w - 1, y1 - 1, c_mezcla(c, hex('#000000'), 0.3)); R.pset(x, y1 - hh, c_mezcla(c, hex('#ffffff'), 0.4));
    R.rect(x, y1 - hh + 2, x + w - 2, y1 - hh + 3, c_mezcla(c, hex('#ffffff'), 0.5)); R.pset(x + 1, y1 - 5, (i % 3) ? C.blanco : hex('#e8c040'));
    x += w + (h(i, k, 54) < 0.08 ? 3 : 0); }
}

// el pictograma de un mando (de neón o pintado), w = 13 px
function c_mando(R, x, y, c) { R.rect(x + 2, y, x + 10, y + 4, c); R.rect(x, y + 1, x + 2, y + 6, c); R.rect(x + 10, y + 1, x + 12, y + 6, c); R.pset(x + 3, y + 2, C.k); R.pset(x + 4, y + 1, C.k); R.pset(x + 4, y + 3, C.k); R.pset(x + 5, y + 2, C.k); R.pset(x + 8, y + 1, C.k); R.pset(x + 9, y + 3, C.k); }

// la tienda de videojuegos a medianoche (encuadre 'tienda', cámara general): ver la cabecera de nuevayork()
function c_tienda(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, año = o.año ?? 2008, VIT = [204, 42, 318, 122];
  const ropa = c_ROPA(año);
  const S = c_fijo(R, 'tienda|' + año, () => {
    // el techo de placas y los fluorescentes
    rect(0, 0, 319, 13, hex('#c8ccd4')); for (let x = 0; x < 320; x += 16) rect(x, 0, x, 13, hex('#aab0bc')); rect(0, 6, 319, 6, hex('#aab0bc')); rect(0, 13, 319, 13, hex('#7a808c'));
    for (const x of [30, 100, 170, 236]) { rect(x - 16, 2, x + 16, 5, hex('#b0b6c2')); rect(x - 15, 3, x + 15, 4, x < 200 ? hex('#e4e8ee') : hex('#f4fbff')); }
    // el falso techo de yeso sobre la pared, con su moldura y la rejilla del aire (tranquilo bajo el año y junto a Atom)
    rect(0, 14, 319, 23, hex('#ddd5c8')); for (let y = 15; y < 21; y++) for (let x = 0; x < 320; x++) if (c_b4(x, y) < 0.08 + h(x >> 2, y >> 1, 65) * 0.14) pset(x, y, hex('#d0c8ba'));
    rect(0, 14, 319, 14, hex('#eee8de')); rect(0, 21, 319, 21, hex('#eee8de')); rect(0, 22, 319, 22, hex('#b4ac9e')); rect(0, 23, 319, 23, hex('#8a8478'));
    rect(2, 16, 14, 19, hex('#9a968e')); for (let x = 3; x < 14; x += 2) rect(x, 16, x, 19, hex('#6a665e'));
    // la franja de la marca, solo sobre el mostrador y la puerta (x 174–273), con su marco y los pictogramas (mando, estrella, coche)
    rect(174, 13, 273, 24, K); rect(175, 14, 272, 23, hex('#c8282a')); rect(175, 14, 272, 15, hex('#e84a3a')); rect(175, 22, 272, 23, hex('#8a1a1c'));
    for (const x of [184, 218, 252]) { const k = (x - 184) / 34; if (k % 3 === 0) c_mando(R, x, 16, hex('#f8e040')); else if (k % 3 === 1) { poligono([[x + 6, 15], [x + 8, 19], [x + 12, 19], [x + 9, 21], [x + 10, 23], [x + 6, 21], [x + 2, 23], [x + 3, 21], [x, 19], [x + 4, 19]], hex('#f8e040')); } else { rect(x, 18, x + 12, 20, hex('#f8e040')); rect(x + 3, 16, x + 9, 18, hex('#f8e040')); pset(x + 3, 21, K); pset(x + 9, 21, K); } }
    // la pared: gris cálido con el rodapié; las estanterías de las cajas (x 0–132), con sus baldas, montantes y etiquetas
    rect(0, 24, 203, 121, hex('#e0d8cc')); for (let y = 24; y < 122; y++) for (let x = 0; x < 204; x++) if (c_b4(x, y) < 0.12 + h(x >> 3, y >> 3, 55) * 0.1) pset(x, y, hex('#d4ccbe'));
    rect(0, 40, 132, 121, K); rect(1, 41, 131, 120, hex('#3a3a46'));
    for (const [y0, y1] of [[42, 66], [68, 92], [94, 118]]) { c_balda(R, 3, 130, y0, y1, y0); rect(1, y1, 131, y1 + 1, hex('#8a8a96')); rect(1, y1, 131, y1, hex('#c8c8d0')); for (let x = 8; x < 128; x += 22) { rect(x, y1, x + 6, y1 + 1, (x / 22) % 2 ? hex('#f8e040') : hex('#ff6a4a')); } }
    for (const x of [44, 88]) rect(x, 41, x + 1, 120, hex('#5a5a66'));
    rect(0, 118, 132, 121, hex('#2a2a32'));
    // la pared del medio: el reloj (lo pinta la vida), el soporte de la tele y el cartel sin letras
    { const x0 = 144, y0 = 72, x1 = 184, y1 = 114; rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, K); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#e8c040'));
      c_degradado(R, x0, y0, x1, y1, [hex('#3a1e5a'), hex('#a83a6a'), hex('#f08a4a'), hex('#f8c860')]); disco(164, 96, 7, hex('#fff0a0'));
      for (let i = 0; i < 41; i += 4) { const hh = 6 + Math.floor(h(i, 3, 56) * 12); rect(x0 + i, y1 - 10 - hh, x0 + i + 3, y1 - 10, hex('#2a1838')); if (hh > 10) pset(x0 + i + 1, y1 - 8 - hh, hex('#f8c860')); }
      rect(x0, y1 - 10, x1, y1, hex('#2a1838')); rect(x0 + 8, y1 - 9, x1 - 6, y1 - 6, hex('#c8282a')); rect(x0 + 14, y1 - 12, x1 - 14, y1 - 9, hex('#c8282a')); rect(x0 + 15, y1 - 11, x1 - 15, y1 - 10, hex('#8ac8e8'));
      disco(x0 + 13, y1 - 5, 2, K); disco(x1 - 10, y1 - 5, 2, K); rect(x0 + 4, y0 + 3, x1 - 4, y0 + 5, hex('#f8f0d0')); rect(x0 + 10, y0 + 8, x1 - 10, y0 + 8, hex('#f8c860')); }
    // el escaparate y la puerta: el marco de aluminio; por arriba, la pared con el neón del mando (tranquila junto a Atom)
    rect(204, 24, 319, 41, hex('#d8d0c4')); rect(204, 41, 319, 41, hex('#8a8478'));
    rect(202, 40, 319, 124, K); rect(203, 41, 319, 123, hex('#9aa0aa'));
    // el suelo de baldosas en damero, en perspectiva, con el brillo de los fluorescentes
    rect(0, 122, 319, 124, hex('#5a5a66'));
    for (let y = 125; y < 180; y++) { const z = 260 / (y - 92), fila = Math.floor(z * 3); for (let x = 0; x < 320; x++) { const u = (x - 160) / (y - 92) * 18, col = Math.floor(u); pset(x, y, (col + fila) & 1 ? hex('#e4e0d8') : hex('#8a8c9c')); if (u - col < 0.04 || z * 3 - fila < 0.05) pset(x, y, hex('#b0b0bc')); } }
    for (const fx of [30, 100, 170, 236]) for (let y = 128; y < 150; y++) for (let x = fx - 20; x <= fx + 20; x++) if (c_b4(x, y) < 0.4 - Math.abs(x - fx) * 0.015 - (y - 128) * 0.012) c_aclara(R, x, y, 0.35, [255, 255, 255]);
    // la alfombrilla de la puerta con nieve y huellas mojadas hacia dentro
    poligono([[250, 125], [300, 125], [306, 134], [244, 134]], hex('#2a2a2e')); for (let x = 248; x < 304; x += 3) pset(x, 129, hex('#4a4a52'));
    for (let k = 0; k < 12; k++) { const x = Math.round(270 - k * 9 + (k % 2) * 4), y = 134 + k * 3; if (y < 178) { rect(x, y, x + 2, y + 1, hex('#9aa0aa')); pset(x + 1, y, hex('#c8d0dc')); } }
    // la mesa baja con la pirámide de cajas de lanzamiento (PIEZAS_GT.cajaJuego) y su cartelito con una estrella
    rect(6, 136, 64, 152, K); rect(7, 137, 63, 151, hex('#c8282a')); rect(7, 137, 63, 138, hex('#e84a3a')); rect(7, 150, 63, 151, hex('#8a1a1c'));
    for (const [x, y] of [[18, 136], [38, 136], [58 - 2, 136], [28, 108], [48, 108]]) PIEZAS_GT.cajaJuego?.(R, x, y, { color: ['#e0a030', '#3a6ac8', '#c83a3a', '#3a9a5a', '#8a3ac8'][(x + y) % 5] });
    // el cartel de suelo mojado (pictograma: una persona que resbala) junto a la puerta
    poligono([[76, 150], [88, 150], [84, 128], [80, 128]], K); poligono([[77, 149], [87, 149], [83, 130], [81, 130]], hex('#f8d020')); disco(82, 137, 1, K); linea(82, 138, 80, 143, K); linea(81, 140, 84, 141, K); linea(80, 143, 83, 146, K); linea(80, 143, 78, 146, K);
    return null;
  });
  // la calle por el escaparate: la acera de enfrente, la nieve, el taxi que pasa y la cola que espera fuera
  R.recorte(VIT);
  c_degradado(R, 204, 42, 318, 70, [hex('#0e1230'), hex('#1a1e44'), hex('#2a2650')]);
  for (let x = 204, k = 0; x < 320; k++) { const w = 18 + Math.floor(h(k, 1, 60) * 14), top = 46 + Math.floor(h(k, 2, 60) * 12); c_rr(R, VIT, x, top, x + w - 1, 96, [hex('#2a2440'), hex('#3a2a34'), hex('#262a40')][k % 3]);
    for (let wy = top + 3; wy < 82; wy += 5) for (let wx = x + 2; wx < x + w - 3; wx += 5) { const on = h(wx, wy + Math.floor(t / 5 + k), 61) < 0.4; c_rr(R, VIT, wx, wy, wx + 2, wy + 2, on ? hex('#f0c870') : hex('#14162c')); }
    c_rr(R, VIT, x, 84, x + w - 1, 96, hex('#1e1a28')); c_rr(R, VIT, x + 2, 86, x + w - 3, 95, k % 2 ? hex('#5a4a3a') : hex('#e8a860')); x += w; }
  c_rr(R, VIT, 204, 96, 318, 104, hex('#3a3a4a')); for (let x = 204; x < 319; x += 7) c_rr(R, VIT, x, 99, x + 3, 99, hex('#c8c040'));
  { const u = ((t / 6) % 1.6), tx = Math.round(180 + u * 180); c_taxi(R, tx, 104, 1, t, { haz: false, cl: VIT, nieve: true }); }
  c_rr(R, VIT, 204, 104, 318, 123, hex('#7a7e8e')); c_rr(R, VIT, 204, 104, 318, 105, hex('#e8eef6')); for (let x = 204; x < 319; x += 2) if (h(x, 1, 62) < 0.5) R.pset(x, 106, hex('#c8d0dc'));
  // la cola: bustos con abrigos y gorros, de lado, mirando hacia la puerta; se mecen y echan vaho (2013: con el móvil)
  for (let k = 0; k < 8; k++) { const x = 206 + k * 14 + (k % 2), y = 98 + (k % 3), mece = Math.round(Math.sin(t * 1.2 + k * 1.7) * 0.6), cs = ropa[k % ropa.length], c = hex(cs);
    R.busto(['rizos', 'calvo', 'mujer'][k % 3], tela(cs, c_str(c_mezcla(c, hex('#000000'), 0.3)), { H: ['#3a2418', '#c8a060', '#1c1424'][k % 3], W: '#8c8ca0' }), x + mece, y, t + k * 0.7);
    rect(x + mece + 1, y - 2, x + mece + 7, y + 1, [hex('#e8e0d0'), hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040')][k % 4]); pset(x + mece + 4, y - 3, hex('#f8f8f8'));
    c_rr(R, VIT, x + mece, y + 12, x + mece + 8, y + 24, c); rect(x + mece + 1, y + 9, x + mece + 7, y + 10, k % 2 ? hex('#c83a3a') : hex('#e8e0d0'));
    if (año >= 2013 && k % 2 === 0) { pset(x + mece + 7, y + 8, hex('#c8f0ff')); c_aclara(R, x + mece + 5, y + 6, 0.4, [168, 232, 255]); }
    const v = (t * 0.6 + k * 0.53) % 3; if (v < 1) for (let i = 0; i < 3; i++) R.pset(x + mece + 10 + Math.round(v * 4) + i, y + 6 - Math.round(v * 3) - i, c_mezcla(hex('#e8eef6'), hex('#5a6080'), v)); }
  for (let k = 0; k < 40; k++) { const sx = 204 + ((h(k, 1, 63) * 114 + Math.sin(t + k) * 4 + 400) % 114), sy = 42 + ((h(k, 2, 63) * 80 + t * (10 + (k % 3) * 4)) % 80); R.pset(Math.round(sx), Math.round(sy), k % 3 ? hex('#e8eef6') : hex('#a8b0c8')); }
  R.recorte(null);
  // el marco del escaparate y de la puerta (con su barra), y el reflejo en el cristal
  rect(258, 41, 261, 123, K); rect(259, 41, 260, 123, hex('#9aa0aa')); rect(268, 41, 271, 123, hex('#9aa0aa')); rect(268, 41, 268, 123, K); rect(300, 41, 303, 123, hex('#9aa0aa')); rect(303, 41, 303, 123, K);
  rect(272, 88, 298, 90, hex('#c8ccd4')); rect(272, 90, 298, 90, hex('#6a6e7a'));
  for (const [gx, gy] of [[210, 70], [228, 112], [276, 64], [306, 100]]) for (let i = 0; i < 2; i++) for (let j = 0; j < 8; j++) { const px = gx + i * 3 + (j >> 1), py = gy - j; pset(px, py, c_mezcla(R.pget(px, py), hex('#ffffff'), 0.4)); }
  // el neón del mando sobre el escaparate, que parpadea de vez en cuando
  { const on = !((t % 6.3) < 0.3 && Math.floor(t * 16) % 2), c = on ? hex('#4af0f0') : hex('#2a5a6a'); if (on) R.halo(236, 31, 12, [hex('#c8dcd8'), hex('#a8e8e8')], 0.7); c_mando(R, 230, 28, c); }
  // las bombillas del marco de la franja de la marca, que se encienden en carrusel
  for (let x = 177, i = 0; x < 272; x += 5, i++) { const on = (i + Math.floor(t * 5)) % 3 === 0; pset(x, 13, on ? hex('#fff07a') : hex('#6a5a2a')); pset(x + 2, 24, on ? hex('#6a5a2a') : hex('#fff07a')); }
  // los fluorescentes: uno parpadea; las banderolas con pictogramas que se mecen con el aire de la puerta
  if ((t % 7.1) < 0.25 && Math.floor(t * 20) % 2) { rect(221, 3, 251, 4, hex('#8a9098')); }
  for (const [x, f, c] of [[62, 0, '#3a6ac8'], [122, 1.2, '#e8c040'], [186, 2.4, '#3a9a5a']]) { const s = Math.round(Math.sin(t * 1.4 + f) * 1.5); linea(x - 6, 24, x - 6 + s, 30, hex('#5a5a66')); linea(x + 6, 24, x + 6 + s, 30, hex('#5a5a66'));
    poligono([[x - 8 + s, 24], [x + 8 + s, 24], [x + 8 + s, 36], [x + s, 40], [x - 8 + s, 36]], K); poligono([[x - 7 + s, 25], [x + 7 + s, 25], [x + 7 + s, 35], [x + s, 39], [x - 7 + s, 35]], hex(c));
    if (f === 0) c_mando(R, x - 6 + s, 28, C.blanco); else if (f > 2) { rect(x - 5 + s, 31, x + 5 + s, 33, C.blanco); rect(x - 3 + s, 29, x + 3 + s, 31, C.blanco); } else R.icono('!', x - 2 + s, 27, C.blanco, K, 1); }
  // las guirnaldas de la fiesta
  if (o.fiesta) for (let g = 0; g < 2; g++) for (let x = 0; x < 320; x += 2) { const y = Math.round(25 + g * 5 + Math.abs(Math.sin((x + g * 30) * Math.PI / 64)) * 7 + Math.sin(t * 2 + x * 0.05) * 1); if (x > 274 && y < 46) continue; pset(x, y, [hex('#ff5ab0'), hex('#4af0f0'), hex('#f8e040')][((x >> 3) + g) % 3]); }
  // el reloj de pared, a punto de dar las doce (el segundero avanza)
  { const cx = 162, cy = 34, r = 7; disco(cx, cy, r + 1, K); disco(cx, cy, r, hex('#f4f0e8')); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(cx + Math.sin(a) * (r - 1)), Math.round(cy - Math.cos(a) * (r - 1)), k % 3 ? hex('#a8a8b0') : K); }
    const m = (59 + (t % 60) / 60) / 60 * Math.PI * 2, s = Math.floor(t % 60) / 60 * Math.PI * 2; linea(cx, cy, cx, cy - 4, K); linea(cx, cy, Math.round(cx + Math.sin(m) * 6), Math.round(cy - Math.cos(m) * 6), K); linea(cx, cy, Math.round(cx + Math.sin(s) * 6), Math.round(cy - Math.cos(s) * 6), C.rojo); }
  // la tele: de tubo en 2001, plana en 2008 y grande en 2013; en la pantalla, cochecitos de juguete que se persiguen
  { const [x0, y0, x1, y1] = año < 2005 ? [140, 44, 184, 66] : año < 2010 ? [136, 46, 190, 66] : [134, 44, 194, 68];
    rect(158, 42, 166, 44, hex('#5a5a66')); if (año < 2005) { rect(x0 - 3, y0 - 3, x1 + 3, y1 + 6, K); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 5, hex('#3a3a42')); rect(x0 - 2, y1 + 3, x1 + 2, y1 + 5, hex('#2a2a32')); pset(x1, y1 + 4, hex('#5aff5a')); }
    else { rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, K); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#1e1e24')); pset(x1, y1 + 1, hex('#5a8aff')); }
    const cl = [x0, y0, x1, y1]; R.recorte(cl); c_rr(R, cl, x0, y0, x1, y1, hex('#4a8a4a'));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { const bx = x0 + 3 + i * 13 - Math.floor((t * 8) % 13), by = y0 + 2 + j * 12; c_rr(R, cl, bx, by, bx + 8, by + 6, [hex('#c87a4a'), hex('#8aa8c8'), hex('#e8c040'), hex('#c8a8d8')][(i + j) % 4]); c_rr(R, cl, bx, by + 6, bx + 8, by + 7, hex('#3a5a3a')); }
    c_rr(R, cl, x0, y0 + 9, x1, y0 + 12, hex('#5a5a66')); const cx = Math.round((x0 + x1) / 2 + Math.sin(t * 1.3) * 10); c_rr(R, cl, cx, y0 + 10, cx + 4, y0 + 11, hex('#e83a3a')); c_rr(R, cl, cx - 9, y0 + 10, cx - 5, y0 + 11, hex('#2a4aff')); if (Math.floor(t * 4) % 2) R.pset(cx - 7, y0 + 9, hex('#ff3a3a')); else R.pset(cx - 7, y0 + 9, hex('#3a6aff'));
    R.recorte(null); linea(x0 + 1, y1 - 1, x0 + 8, y0 + 1, hex('#8ab8a8')); }
  const tv = año < 2005 ? [140, 44, 184, 66] : año < 2010 ? [136, 46, 190, 66] : [134, 44, 194, 68];
  return { suelo: 168, tras: 160, trasX: [194, 214], mostrador: [166, 151, 264, 179], caja: [250, 152], cajas: [[170, 192], [218, 238]], puerta: [272, 41, 300, 123], escaparate: VIT, piramide: [6, 108, 64, 152], tele: tv, estantes: [[1, 42, 131, 66], [1, 68, 131, 92], [1, 94, 131, 118]], reloj: [162, 34], libre: [70, 164] };
}
// delante en la tienda: el mostrador con la vitrina, la caja registradora (o.humo) y una pila de cajas; y el confeti
function c_tiendaDelante(R, t, o = {}) {
  const { rect, pset, linea } = R, K = C.k;
  // el mostrador: el tablero (y 151–155) y el frente rojo hasta el suelo
  rect(166, 151, 264, 156, K); rect(167, 152, 263, 153, hex('#e8e4dc')); rect(167, 154, 263, 155, hex('#b8b4ac'));
  rect(168, 156, 262, 179, K); rect(169, 157, 261, 179, hex('#c8282a')); rect(169, 157, 261, 158, hex('#e84a3a'));
  // la vitrina del frente: el cristal con mandos y cajas dentro, su reflejo
  rect(176, 160, 254, 175, K); rect(177, 161, 253, 174, hex('#2a3446')); rect(177, 168, 253, 168, hex('#5a6476'));
  for (let i = 0; i < 6; i++) { const x = 181 + i * 12; if (i % 2) c_mando(R, x - 2, 162, [hex('#2a2a36'), hex('#e8e8f0'), hex('#3a3a46')][i % 3]); else { rect(x, 161, x + 6, 167, [hex('#c83a3a'), hex('#e8c040'), hex('#3a6ac8')][i % 3]); rect(x + 1, 162, x + 5, 164, hex('#1a2244')); } }
  for (let i = 0; i < 7; i++) rect(180 + i * 10, 170, 186 + i * 10, 173, [hex('#3a8a5a'), hex('#e87a2a'), hex('#8a3a8a'), hex('#e8e8f0')][i % 4]);
  linea(184, 174, 196, 161, hex('#8a9ab0')); linea(226, 174, 238, 161, hex('#8a9ab0'));
  rect(168, 177, 262, 179, hex('#5a1418'));
  // la pila de cajas planas, una caja de juego de pie y la caja registradora, que humea de tanto vender (gag 7)
  PIEZAS_GT.cajaJuego?.(R, 228, 152, { color: '#3a6ac8' });
  for (let k = 0; k < 3; k++) { rect(170 + k, 147 - k * 4, 190 + k, 150 - k * 4, K); rect(171 + k, 148 - k * 4, 189 + k, 149 - k * 4, [hex('#e0a030'), hex('#c83a3a'), hex('#3a9a5a')][k]); rect(171 + k, 148 - k * 4, 189 + k, 148 - k * 4, hex('#f8f0d8')); }
  PIEZAS_GT.cajaRegistradora?.(R, 250, 152, { humo: o.humo ?? 0, t });
  // el confeti de la fiesta, que cae por delante de todos
  if (o.fiesta) { const COL = ['#ff5ab0', '#4af0f0', '#f8e040', '#5aff8a', '#ffffff'].map(hex), n = Math.round(60 * o.fiesta);
    for (let k = 0; k < n; k++) { const y = Math.round((h(k, 2, 64) * 200 + t * (22 + (k % 5) * 6)) % 200) - 10, x = Math.round((h(k, 1, 64) * 320 + Math.sin(t * 2 + k) * 6) % 320); if (x > 276 && y < 46) continue; if (x > 18 && x < 172 && y < 15) continue; pset(x, y, COL[k % 5]); if ((Math.floor(t * 6) + k) % 2) pset(x + 1, y, COL[k % 5]); } }
  return { tablero: 151 };
}

// la cola en la calle nevada, de noche (cámara 'calle' de la tienda)
function c_calle(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = c_P, año = o.año ?? 2008, VP = [292, 100];
  const ropa = c_ROPA(año);
  const fachadaY = (x) => Math.round(0 + (x - 196) / (VP[0] - 196) * 62), baseY = (x) => Math.round(128 - (x - 196) / (VP[0] - 196) * 26);
  const S = c_fijo(R, 'calle', () => {
    // el cielo de la noche con el resplandor de la ciudad y los edificios lejanos al fondo de la calle
    c_degradado(R, 196, 0, 319, 104, [hex('#0a0c22'), hex('#121638'), hex('#1e1e48'), hex('#3a2c5a'), hex('#5a3a62')]);
    for (let x = 250, k = 0; x < 320; k++) { const w = 6 + Math.floor(h(k, 1, 70) * 9), top = 60 + Math.floor(h(k, 2, 70) * 24); rect(x, top, x + w - 1, 104, hex('#241e40')); for (let wy = top + 2; wy < 100; wy += 3) for (let wx = x + 1; wx < x + w - 1; wx += 2) if (h(wx, wy, 71) < 0.22) pset(wx, wy, hex('#c8a070')); x += w; }
    // la calle que se aleja: la fachada en perspectiva (ladrillo oscuro con ventanas y escaparates) y su acera
    for (let x = 196; x < VP[0]; x++) { const a = fachadaY(x), b = baseY(x), u = (x - 196) / (VP[0] - 196);
      for (let y = a; y < b; y++) { const fila = Math.floor((y - a) / (b - a) * 30), lit = (fila % 5 === 2 || fila % 5 === 3) && Math.floor(u * 22) % 3 === 1 && fila < 22;
        pset(x, y, fila >= 24 ? (Math.floor(u * 9) % 2 ? hex('#e8b870') : hex('#2a2030')) : lit ? (h(Math.floor(u * 22), fila >> 1, 72) < 0.5 ? hex('#f0c870') : hex('#1e1830')) : ((fila + Math.floor(u * 40)) & 1 ? hex('#3a2228') : hex('#44282c'))); }
      if (x % 3 === 0) pset(x, a, hex('#5a3a3a')); }
    for (let x = 196; x < VP[0] + 6; x++) { const b = baseY(Math.min(x, VP[0])), w = Math.max(1, Math.round((VP[0] - x) / (VP[0] - 196) * 22)); for (let y = b; y < b + w && y < 180; y++) { const n = h(Math.floor((x - 196) / 6), Math.floor((y - b) / Math.max(1, w) * 3), 68); pset(x, y, y - b < 2 ? P.nieve : n < 0.55 ? P.nieveS : n < 0.8 ? hex('#a8b0c4') : hex('#8a8ea0')); } }
    // la bocacalle: el asfalto de la calle que cruza, con nieve sucia y el paso de cebra
    for (let x = 196; x < 320; x++) { const xx = Math.min(x, VP[0] + 5), b = baseY(Math.min(xx, VP[0])) + Math.max(1, Math.round((VP[0] - xx) / (VP[0] - 196) * 22));
      for (let y = b; y < 150; y++) { const n = h(x >> 3, y >> 1, 69); pset(x, y, n < 0.12 ? hex('#5a5e70') : n < 0.3 ? hex('#34343f') : hex('#2a2a36')); }
      for (let y = Math.max(b, 141); y < 149; y++) if (((x - 196) % 9) < 5) pset(x, y, (x + y) % 4 ? hex('#d8dce6') : hex('#a8acbc')); }
    // la fachada de la tienda, de frente: ladrillo con ventanas en dos pisos y la cornisa
    c_ladrillo(R, 0, 0, 196, 74, 73); for (let y = 0; y < 75; y++) for (let x = 0; x < 197; x++) if (c_b4(x, y) < 0.8) c_aclara(R, x, y, 0.5, [26, 22, 48]);
    rect(0, 72, 196, 76, K); rect(0, 73, 196, 74, hex('#6a5a5a')); for (let x = 2; x < 196; x += 4) pset(x, 75, hex('#4a3a3a'));
    rect(196, 0, 198, 128, hex('#2a1e22'));
    // la acera de delante (losas, nieve en los bordes) y el bordillo nevado
    rect(0, 128, 196, 150, hex('#7a7e8e')); for (let x = 0; x < 197; x += 24) rect(x, 128, x, 149, hex('#62667a')); rect(0, 139, 196, 139, hex('#6a6e80'));
    for (let y = 128; y < 150; y++) for (let x = 0; x < 320; x++) { if (x > 196 && y < baseY(Math.min(x, VP[0])) + 1) continue; const n = h(x >> 4, y >> 2, 74) * 0.7 + h(x >> 1, y, 75) * 0.3; if (x <= 196 && (n < 0.3 || y > 146)) pset(x, y, n < 0.15 || y > 147 ? P.nieve : P.nieveS); }
    for (let k = 0; k < 16; k++) { const x = 10 + k * 11, y = 132 + (k % 3) * 5; rect(x, y, x + 2, y + 1, hex('#5a5e70')); }
    rect(0, 150, 319, 152, hex('#cfd8e6')); rect(0, 152, 319, 153, hex('#5a5e70')); for (let x = 0; x < 320; x += 3) pset(x, 149 + Math.round(h(x, 1, 75) * 1.5), P.nieve);
    // la calzada: asfalto mojado con nieve sucia, las rodadas, la raya y la tapa de alcantarilla
    rect(0, 154, 319, 179, hex('#2a2a36')); for (let k = 0; k < 140; k++) pset(Math.floor(h(k, 1, 76) * 320), 154 + Math.floor(h(k, 2, 76) * 26), h(k, 3, 76) < 0.5 ? hex('#4a4a5a') : hex('#8a8ea0'));
    for (const y of [158, 163, 171, 176]) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 77) < 0.7) pset(x, y, hex('#3a3a48'));
    for (let x = 0; x < 320; x += 30) rect(x, 166, x + 14, 167, hex('#a89a50'));
    for (const [cx, cy, rx, ry] of c_CHARCOS) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d >= 1) continue;
      pset(cx + i, cy + j, j === -ry || (j < 0 && d > 0.75) ? hex('#1a1a26') : d > 0.8 && j > 0 ? hex('#6a7090') : c_b4(cx + i, cy + j) < 0.3 ? hex('#3e4462') : hex('#30344c')); }
    for (let j = -2; j <= 2; j++) for (let i = -10; i <= 10; i++) if ((i / 10) ** 2 + (j / 2.5) ** 2 < 1) pset(250 + i, 174 + j, (i + j) & 1 ? hex('#3a3848') : hex('#5a5868'));
    // el escaparate encendido: el toldo (lo nieva la vida), las baldas con cajas, carteles y la luz que sale a la acera
    rect(4, 84, 128, 126, K); rect(6, 86, 126, 124, hex('#f0c27a'));
    for (const y1 of [105, 120]) { c_balda(R, 8, 92, y1 - 18, y1, y1 + 3); rect(6, y1, 94, y1 + 1, hex('#8a6a4a')); }
    rect(6, 121, 126, 124, hex('#d8a860')); c_cartel(R, 99, 90, 22, 28, 0);
    for (let y = 126; y < 150; y++) for (let x = 0; x < 140; x++) { const d = (y - 126); if (x > 4 - d * 0.6 && x < 128 + d * 0.4 && c_b4(x, y) < 0.5 - d * 0.02) c_aclara(R, x, y, 0.3, [255, 210, 140]); }
    // la puerta de cristal de la tienda, con su luz, y el pilar; la persiana bajada del vecino
    rect(130, 82, 162, 128, K); rect(132, 84, 160, 128, hex('#f8d890')); rect(132, 84, 160, 86, hex('#fff0c0')); rect(145, 84, 147, 128, K); rect(134, 104, 143, 105, hex('#c8c8d0')); rect(149, 104, 158, 105, hex('#c8c8d0'));
    rect(164, 80, 196, 128, K); rect(165, 81, 195, 128, hex('#5a5e6a')); for (let y = 83; y < 128; y += 3) { rect(165, y, 195, y, hex('#3e424e')); rect(165, y + 1, 195, y + 1, hex('#6e7280')); } rect(178, 124, 182, 126, hex('#2a2a32'));
    // la escalera de incendios: las plataformas, la barandilla y la escalera en zigzag
    for (const y of [34, 64]) { rect(30, y, 120, y + 2, K); rect(30, y - 10, 120, y - 10, K); for (let x = 30; x <= 120; x += 4) rect(x, y - 10, x, y, hex('#1a1a22')); }
    linea(40, 62, 70, 36, K); linea(41, 62, 71, 36, K); for (let k = 0; k < 8; k++) rect(42 + k * 4, 59 - k * 3, 45 + k * 4, 59 - k * 3, K);
    linea(110, 32, 120, 0, K); linea(111, 32, 121, 0, K);
    for (const y of [32, 62]) rect(30, y, 120, y, P.nieve);
    return null;
  });
  // las ventanas de los pisos: luz, una tele que parpadea, alguien que pasa; la que queda detrás de la escalera, tapada por ella
  for (const [wx, wy, k] of [[12, 15, 0], [52, 15, 1], [92, 15, 2], [132, 15, 3], [170, 15, 4], [12, 44, 5], [52, 44, 6], [92, 44, 7], [132, 44, 8], [170, 44, 9]]) {
    rect(wx, wy, wx + 16, wy + 18, K); rect(wx - 1, wy + 19, wx + 17, wy + 20, hex('#6a5a5a')); rect(wx - 1, wy + 18, wx + 17, wy + 18, P.nieve);
    const on = h(k, Math.floor(t / 7 + k * 0.3), 78) < 0.65, c = on ? (k % 3 ? hex('#f2c878') : hex('#f8e0a8')) : hex('#1e2040');
    rect(wx + 1, wy + 1, wx + 15, wy + 17, c);
    if (k === 2) rect(wx + 1, wy + 1, wx + 15, wy + 17, Math.sin(t * 7) > 0.3 ? hex('#6a8ad8') : hex('#4a5ab0'));
    if (k === 7 && on) { const p = (t % 10) / 10; if (p < 0.5) { const px = wx + 1 + Math.round(p / 0.5 * 13); rect(px, wy + 6, px + 2, wy + 17, hex('#4a2a2a')); disco(px + 1, wy + 5, 1, hex('#4a2a2a')); } }
    rect(wx + 8, wy + 1, wx + 8, wy + 17, K); rect(wx + 1, wy + 9, wx + 15, wy + 9, K); if (on && k % 2) { rect(wx + 1, wy + 1, wx + 3, wy + 17, hex('#a83a3a')); rect(wx + 13, wy + 1, wx + 15, wy + 17, hex('#a83a3a')); } }
  // vuelve a pasar la escalera de incendios por delante de las ventanas
  for (const y of [34, 64]) { rect(30, y, 120, y + 2, K); rect(30, y - 10, 120, y - 10, K); for (let x = 30; x <= 120; x += 4) rect(x, y - 10, x, y, hex('#1a1a22')); rect(30, y, 120, y, P.nieve); }
  linea(40, 62, 70, 36, K); linea(41, 62, 71, 36, K); for (let k = 0; k < 8; k++) rect(42 + k * 4, 59 - k * 3, 45 + k * 4, 59 - k * 3, K);
  // el toldo a rayas con la nieve encima y su borde ondulado, que se mueve un poco con el viento
  for (let x = 0; x < 164; x++) { const c = (x >> 3) & 1 ? hex('#e8e0d0') : hex('#2a6a4a'); rect(x, 77, x, 84, c); if ((x & 7) < 5) pset(x, 85 + (Math.sin(t * 3 + x * 0.3) > 0.6 ? 1 : 0), c); }
  rect(0, 76, 163, 76, P.nieve); for (let x = 0; x < 164; x += 2) pset(x, 75 - (h(x, 1, 79) < 0.3 ? 1 : 0), P.nieve); rect(0, 77, 163, 77, P.nieveS);
  // la cola que sigue por la calle y se pierde (figuras cada vez más pequeñas, con abrigos y gorros, que echan vaho)
  for (let k = 13; k >= 0; k--) { const u = 1 - Math.pow(1 - k / 14, 1.15), x = 202 + u * (VP[0] - 206), b = baseY(Math.round(x)), alto = Math.max(4, Math.round(12 * (1 - u * 0.66))); c_figurilla(R, x, b + Math.max(1, Math.round(alto * 0.35)), alto, t, k + 3, { ropa, movil: año >= 2013 }); }
  // el semáforo de la esquina del fondo, que cambia
  { const fase = Math.floor(t / 3) % 3; rect(262, 74, 263, 96, K); rect(259, 66, 266, 76, K); for (let i = 0; i < 3; i++) disco(262, 68 + i * 3, 1, i === fase ? [hex('#ff3a3a'), hex('#f8c040'), hex('#3aff6a')][i] : hex('#2a2a32')); }
  // la farola de la esquina con su halo, la nieve en la cabeza y la boca de incendios
  R.halo(186, 46, 16, [hex('#3a3654'), hex('#6a5a6a'), hex('#a8907a')], 1.3);
  for (let y = 132; y < 150; y++) for (let x = 168; x < 204; x++) if (((x - 186) / 18) ** 2 + ((y - 141) / 6) ** 2 < 1 && c_b4(x, y) < 0.5) c_aclara(R, x, y, 0.2, [255, 230, 170]);
  rect(16, 138, 22, 148, K); rect(17, 139, 21, 148, hex('#c8282a')); rect(15, 141, 23, 143, K); rect(16, 142, 22, 142, hex('#e84a3a')); rect(17, 137, 21, 138, P.nieve); disco(19, 137, 2, hex('#c8282a')); rect(17, 135, 21, 136, P.nieve);
  // los reflejos en los charcos: el escaparate (cálido), la farola y las ventanas, temblando con el viento
  for (const [cx, cy, rx, ry, refl] of c_CHARCOS) for (let j = -ry + 1; j < ry; j++) { const w = Math.floor(rx * Math.sqrt(1 - (j / ry) ** 2)) - 1, d = Math.round(Math.sin(t * 2.6 + j * 2.1 + cx * 0.3) * 1.3);
    for (const [rx0, rw, col] of refl) { if ((j + Math.floor(t * 4 + rx0)) % 4 === 0) continue; for (let i = 0; i < rw; i++) { const x = rx0 + i + d; if (Math.abs(x - cx) <= w) pset(x, cy + j, hex(col)); } } }
  // el vapor de la alcantarilla, que sube y se deshace
  for (let k = 0; k < 18; k++) { const u = ((t * 0.35 + k / 18) % 1), y = Math.round(172 - u * 40), x = Math.round(250 + Math.sin(u * 6 + k) * (2 + u * 8) + u * 6), r = Math.max(1, Math.round(1 + u * 4)); if (y > 134 || x > 200) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && c_b4(x + i, y + j) < 0.55 - u * 0.5) c_aclara(R, x + i, y + j, 0.5, [200, 204, 220]); }
  return { suelo: 146, puertaTienda: [132, 84, 160, 128], escaparate: [6, 86, 126, 124], acera: [128, 150], calzada: [154, 179], cola: [202, VP[0]], farola: 186, libre: [24, 178] };
}
// delante en la calle: los taxis que pasan por la calzada (uno en cada sentido) y la nieve que cae por delante de todos
function c_calleDelante(R, t, o = {}) {
  // la farola de la esquina (x 185–187), al borde de la acera
  const { rect } = R, K = C.k; rect(185, 50, 187, 150, K); rect(186, 50, 186, 150, hex('#4a4a5e')); rect(182, 146, 190, 150, K); rect(180, 40, 192, 44, K); rect(181, 44, 191, 49, hex('#fff2c0')); rect(180, 39, 192, 39, c_P.nieve);
  const u1 = (t / 5.2) % 1.6, u2 = ((t + 2.6) / 6.1) % 1.6;
  c_taxi(R, Math.round(-40 + u1 * 260), 165, 1, t); c_taxi(R, Math.round(360 - u2 * 260), 177, -1, t);
  for (let k = 0; k < 90; k++) { const v = 10 + (k % 4) * 5, y = Math.round((h(k, 2, 80) * 200 + t * v) % 200) - 10, x = Math.round((h(k, 1, 80) * 340 + Math.sin(t * 0.9 + k) * 5 + t * 3) % 340) - 10;
    if (x > 276 && y < 46) continue; if (x > 18 && x < 172 && y < 15) continue; R.pset(x, y, k % 4 ? c_P.nieve : c_P.nieveS); if (k % 6 === 0) R.pset(x + 1, y, c_P.nieve); }
  return {};
}

// una bandera colgada de su mástil que se mece (tipo 'eeuu' | 'florida' | 'nuevayork'), x: el mástil
function c_bandera(R, x, y, dir, t, tipo) {
  const K = C.k; R.rect(x, y - 4, x + 1, y + 66, hex('#8a6a2a')); R.rect(x, y - 4, x, y + 66, hex('#c8a040')); R.disco(x, y - 6, 2, C.oro); R.pset(x - 1, y - 7, C.oroL); R.rect(x - 4, y + 64, x + 5, y + 66, K);
  for (let i = 0; i < 18; i++) { const xx = x + 2 * (dir > 0 ? 1 : -1) + i * (dir > 0 ? 1 : -1), caida = Math.round(Math.sin(t * 1.6 - i * 0.35) * (i / 18) * 2), largo = 30 - Math.round(i * 0.4);
    for (let j = 0; j < largo; j++) { const yy = y + j + caida + Math.round(i * i * 0.01); let c;
      if (tipo === 'eeuu') c = (i < 9 && j < 13) ? ((i + j) % 3 === 0 && i > 0 && j > 0 ? C.blanco : hex('#2a3a7a')) : (Math.floor(j / 2.3) % 2 ? C.blanco : hex('#c83a3a'));
      else if (tipo === 'florida') c = Math.abs(j / largo - i / 18) < 0.09 || Math.abs(j / largo - (1 - i / 18)) < 0.09 ? hex('#c83a3a') : (Math.abs(i - 9) < 2 && Math.abs(j - largo / 2) < 2 ? C.oro : C.blanco);
      else c = Math.abs(i - 9) < 3 && Math.abs(j - largo / 2) < 4 ? hex('#c8a040') : hex('#2a3a7a');
      const sombra = Math.sin(t * 1.6 - i * 0.35) > 0.5; R.pset(xx, yy, sombra ? c_mezcla(c, hex('#000000'), 0.2) : c); }
    R.pset(xx, y + largo + caida + Math.round(i * i * 0.01), C.oro); }
}

// una palmera (de las de Florida) que se mece, dentro del recorte del ventanal
function c_palmera(R, x, suelo, alto, t, k = 0) {
  const s = Math.sin(t * 1.1 + k) * 2;
  for (let j = 0; j < alto; j++) { const xx = Math.round(x + Math.sin(j / alto * 1.4) * 4 + s * j / alto); R.pset(xx, suelo - j, hex('#8a6a4a')); R.pset(xx + 1, suelo - j, j % 3 ? hex('#6a4a34') : hex('#a8845a')); }
  const cx = Math.round(x + Math.sin(1.4) * 4 + s), cy = suelo - alto;
  for (let f = 0; f < 7; f++) { const a = -Math.PI + f * Math.PI / 6 + Math.sin(t * 1.7 + f + k) * 0.08, L = 9 + (f % 2) * 3;
    for (let i = 0; i < L; i++) { const xx = Math.round(cx + Math.cos(a) * i), yy = Math.round(cy + Math.sin(a) * i * 0.7 + (i * i) * 0.05); R.pset(xx, yy, f % 2 ? hex('#3a8a3a') : hex('#2a6a2a')); if (i % 2) R.pset(xx, yy + 1, hex('#5aa84a')); } }
  R.disco(cx, cy + 1, 1, hex('#6a4a2a'));
}

// la sala del tribunal (encuadre 'tribunal', cámara general): ver la cabecera de nuevayork()
function c_tribunal(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = c_P, fl = !!o.florida, V1 = [12, 20, 56, 84], V2 = [228, 20, 268, 62];
  const S = c_fijo(R, 'tribunal|' + fl, () => {
    // el techo de casetones con la moldura y la pared de escayola (verde agua en Florida, crema en Nueva York) con pilastras
    const pared = fl ? hex('#cfe0d4') : hex('#e4d8c0'), paredS = fl ? hex('#b4c8ba') : hex('#c8baa0'), paredL = fl ? hex('#e2f0e6') : hex('#f2e8d4');
    rect(0, 0, 319, 11, hex('#e8e4d8')); for (let x = 0; x < 320; x += 26) { rect(x + 2, 1, x + 23, 8, hex('#d4d0c4')); rect(x + 3, 2, x + 22, 7, hex('#ece8dc')); }
    rect(0, 9, 319, 11, hex('#b8b0a0')); rect(0, 9, 319, 9, hex('#f8f4ea')); for (let x = 1; x < 320; x += 4) pset(x, 11, hex('#8a8476'));
    rect(0, 12, 319, 62, pared); for (let y = 12; y < 63; y++) for (let x = 0; x < 320; x++) if (c_b4(x, y) < 0.1 + h(x >> 3, y >> 3, 81) * 0.12) pset(x, y, paredS);
    for (const x of [6, 64, 92, 222, 272]) { rect(x, 12, x + 5, 62, paredL); rect(x + 4, 12, x + 5, 62, paredS); rect(x - 1, 12, x + 6, 15, paredS); rect(x - 1, 12, x + 6, 12, paredL); }
    // el friso de roble con dos alturas de cuarterones, la moldura y el zócalo
    rect(0, 62, 319, 64, P.robleS); rect(0, 62, 319, 62, P.robleL);
    for (let c = 0; c < 14; c++) { const x0 = c * 23, x1 = x0 + 21; c_cuarteron(R, x0 + 2, 66, x1, 98, P.roble, P.robleL, P.robleS, P.robleV, c + 3); c_cuarteron(R, x0 + 2, 101, x1, 116, P.roble, P.robleL, P.robleS, P.robleV, c + 40); }
    rect(0, 99, 319, 100, P.robleS); rect(0, 117, 319, 121, P.nogal); rect(0, 117, 319, 117, P.nogalL);
    // los ventanales: el marco blanco, el alféizar y el estor a medio bajar (la vista la pinta la vida)
    for (const [a, y0, b, y1] of [V1, V2]) { rect(a - 3, y0 - 3, b + 3, y1 + 4, hex('#f4f0e8')); rect(a - 3, y0 - 3, b + 3, y0 - 3, C.blanco); rect(b + 2, y0 - 2, b + 3, y1 + 4, hex('#c8c0b0')); rect(a - 5, y1 + 3, b + 5, y1 + 6, hex('#e8e0d0')); rect(a - 5, y1 + 6, b + 5, y1 + 6, hex('#a8a090')); }
    // el panel de nogal detrás del estrado con las pilastras, la placa dorada (estrella y balanza) y la luz cálida
    rect(100, 12, 220, 100, K); rect(101, 12, 219, 100, P.nogal); c_cuarteron(R, 110, 18, 210, 96, P.nogal, P.nogalL, P.nogalS, P.nogalV, 82);
    for (const px of [101, 212]) { rect(px, 12, px + 7, 100, P.nogalL); rect(px + 1, 16, px + 6, 100, P.nogal); for (let i = 0; i < 3; i++) rect(px + 2 + i * 2, 18, px + 2 + i * 2, 98, P.nogalS); }
    for (let y = 14; y < 70; y++) for (let x = 124; x < 197; x++) if ((x + y) % 2 === 0 && ((x - 160) / 36) ** 2 + ((y - 14) / 50) ** 2 < 1) c_aclara(R, x, y, 0.1, [255, 214, 140]);
    { const sx = 160, sy = 28; disco(sx, sy, 15, K); disco(sx, sy, 14, (x, y) => (x + y < sx + sy - 6 ? C.oroL : x + y > sx + sy + 8 ? C.oroS : C.oro)); for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; pset(Math.round(sx + Math.cos(a) * 12), Math.round(sy + Math.sin(a) * 12), C.oroS); }
      disco(sx, sy, 10, K); disco(sx, sy, 9, fl ? hex('#2a6a5a') : hex('#26387a')); R.icono('balanza', sx - 3, sy - 2, C.oroL, K, 1);
      for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.5; pset(Math.round(sx + Math.cos(a) * 7), Math.round(sy + Math.sin(a) * 7), C.blanco); } }
    // el sillón alto del juez, de cuero con botones
    rect(142, 62, 178, 100, K); rect(143, 63, 177, 100, P.cueroS); disco(160, 63, 17, K); disco(160, 64, 16, P.cuero); rect(143, 64, 177, 70, P.cuero); rect(143, 70, 177, 100, P.cuero); rect(175, 66, 177, 100, P.cueroS);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) { const bx = 147 + i * 6 + (j % 2) * 3, by = 54 + j * 7; if (bx < 176) { pset(bx, by, P.cueroS); pset(bx - 1, by - 1, P.cueroL); } }
    // la mesa del secretario con el monitor (la pantalla la pinta la vida) y la tribuna del jurado con sus sillones
    rect(222, 98, 256, 122, K); rect(223, 99, 255, 122, P.nogal); rect(223, 99, 255, 100, P.nogalL); c_cuarteron(R, 227, 104, 251, 120, P.nogal, P.nogalL, P.nogalS, P.nogalV, 83);
    rect(230, 84, 248, 98, K); rect(231, 85, 247, 95, hex('#1a2a44')); rect(237, 96, 241, 98, hex('#5a5a66'));
    rect(258, 66, 319, 124, K); rect(259, 67, 319, 123, P.nogalS);
    // la moqueta: verde (Florida) o burdeos, con su dibujo de rombos en perspectiva, y el borde de madera
    const mo = fl ? [hex('#2a5a4a'), hex('#3a7a62'), hex('#1e4236')] : [hex('#6a2430'), hex('#8a3a40'), hex('#4a1820')];
    rect(0, 122, 319, 179, mo[0]); rect(0, 122, 319, 123, mo[2]);
    for (let r = 0; r < 12; r++) { const y = 126 + Math.round(r * 3.4 + r * r * 0.3); if (y > 176) break; const paso = 12 + r * 2, off = (r % 2) * (paso >> 1);
      for (let x = off; x < 320; x += paso) { pset(x, y, mo[1]); pset(x - 1, y + 1, mo[1]); pset(x + 1, y + 1, mo[1]); pset(x, y + 2, mo[1]); pset(x, y + 1, mo[2]); } }
    // la luz de los ventanales en la moqueta, con la sombra de la cruz del marco
    for (const [a, , b, y1] of [V1, V2]) for (let y = 124; y < 160; y++) { const d = (y - 124) * 0.9, xa = Math.round(a + 4 + d), xb = Math.round(b + 4 + d), xm = (xa + xb) >> 1;
      if (b > 200 && y > 146) continue; for (let x = xa; x <= xb; x++) { if (Math.abs(x - xm) < 1.5 || Math.abs(y - 140) < 1.5) continue; if (c_b4(x, y) < 0.55) c_aclara(R, x, y, 0.18, [255, 236, 190]); } }
    return null;
  });
  // las vistas por los ventanales: Florida (cielo azul, nubes, palmeras que se mecen, el mar al fondo) o Nueva York (gris)
  for (const [cl, k] of [[V1, 0], [V2, 1]]) { const [a, y0, b, y1] = cl; R.recorte(cl);
    if (fl) { c_degradado(R, a, y0, b, y1, [hex('#4a9ae8'), hex('#7ab8f0'), hex('#b8dcf4')]);
      for (let n = 0; n < 2; n++) { const w = 10 + n * 4, span = b - a + w * 2, cx = a - w + ((h(n, k, 84) * span + t * (2 + n * 2)) % span); c_nube(R, cx, y0 + 8 + n * 8, w, [hex('#c8dcec'), hex('#eef6fc'), C.blanco]); }
      for (let y = y1 - 16; y <= y1 - 12; y++) R.linea(a, y, b, y, y % 2 ? hex('#3a8ac8') : hex('#5aa8d8')); for (let i = 0; i < 4; i++) { const x = Math.round(a + ((h(i, k, 85) * 50 + t * 3) % (b - a))); R.pset(x, y1 - 14, C.blanco); }
      for (let y = y1 - 11; y <= y1; y++) R.linea(a, y, b, y, y % 3 ? hex('#4a8a3a') : hex('#3a7a2a'));
      c_palmera(R, a + 12, y1, k ? 30 : 40, t, k); c_palmera(R, a + 32, y1 + 2, k ? 22 : 30, t, k + 3);
      for (let i = 0; i < 2; i++) { const bx = Math.round(a + ((t * 7 + i * 30 + k * 13) % (b - a + 10)) - 5), by = y0 + 10 + i * 6 + Math.round(Math.sin(t * 3 + i) * 1), ala = Math.sin(t * 11 + i) > 0; R.pset(bx, by, hex('#2a2a3a')); R.pset(bx - 1, by - (ala ? 1 : 0), hex('#2a2a3a')); R.pset(bx + 1, by - (ala ? 1 : 0), hex('#2a2a3a')); } }
    else { c_degradado(R, a, y0, b, y1, [hex('#8a98aa'), hex('#a8b4c2'), hex('#c4ccd6')]);
      for (let n = 0; n < 2; n++) { const w = 12 + n * 4, span = b - a + w * 2, cx = a - w + ((h(n, k, 86) * span + t * (1.5 + n)) % span); c_nube(R, cx, y0 + 7 + n * 7, w, [hex('#8a94a4'), hex('#aab4c2'), hex('#c4ccd8')]); }
      for (let x = a, i = 0; x <= b; i++) { const w = 8 + Math.floor(h(i, k, 87) * 8), top = y0 + 14 + Math.floor(h(i, k, 88) * 20); c_rr(R, cl, x, top, x + w - 1, y1, [hex('#6a6070'), hex('#7a7280'), hex('#5a5462')][i % 3]); for (let wy = top + 2; wy < y1; wy += 3) for (let wx = x + 1; wx < x + w - 1; wx += 2) if (h(wx, wy, 89) < 0.4) R.pset(wx, wy, hex('#c8ccd8')); x += w; }
      for (let i = 0; i < 18; i++) { const x = a + ((h(i, k, 90) * 50 + Math.sin(t + i) * 2) % (b - a)), y = y0 + ((h(i, k, 91) * 70 + t * 8) % (y1 - y0)); R.pset(Math.round(x), Math.round(y), hex('#f0f4f8')); } }
    R.recorte(null);
    // el estor a medio bajar, con sus lamas, que se mece con el aire; la cruz del marco encima
    const baja = y0 + Math.round((y1 - y0) * 0.28), s = Math.round(Math.sin(t * 0.8 + k) * 1); rect(a, y0, b, baja, hex('#f0e8d4')); for (let y = y0 + 2; y < baja; y += 3) rect(a, y, b, y, hex('#d8ccb0')); rect(a, baja, b, baja + 1, hex('#a89870')); linea((a + b) >> 1, baja + 1, ((a + b) >> 1) + s, baja + 5, hex('#8a7a5a')); disco(((a + b) >> 1) + s, baja + 6, 1, hex('#c8a040'));
    rect(((a + b) >> 1) - 1, baja + 1, ((a + b) >> 1), y1, hex('#f4f0e8')); rect(a, Math.round((baja + y1) / 2), b, Math.round((baja + y1) / 2) + 1, hex('#f4f0e8')); }
  // los ventiladores del techo (Florida), que giran
  if (fl) for (const fx of [196, 250]) { rect(fx, 11, fx, 16, K); rect(fx - 2, 16, fx + 2, 18, hex('#5a4a3a')); for (let p = 0; p < 4; p++) { const a = t * 6 + p * Math.PI / 2, ex = Math.round(fx + Math.cos(a) * 14), ey = Math.round(17 + Math.sin(a) * 2); linea(fx, 17, ex, ey, hex('#6a4a2a')); linea(fx, 18, ex, ey + 1, hex('#8a6a4a')); } }
  // las dos banderas que se mecen
  c_bandera(R, 114, 26, 1, t, 'eeuu'); c_bandera(R, 206, 26, -1, t, fl ? 'florida' : 'nuevayork');
  // la placa dorada destella; el monitor del secretario escribe; el reloj de la pared
  { const g = (t % 5.5) / 1.1; if (g < 1) { const a = -2.4 + g * Math.PI * 2; pset(Math.round(160 + Math.cos(a) * 14), Math.round(28 + Math.sin(a) * 14), C.blanco); } }
  for (let k = 0; k < 3; k++) { const yy = 86 + ((k * 3 + Math.floor(t * 2)) % 9); rect(232, yy, 232 + 4 + (k * 3 + Math.floor(t * 2)) % 9, yy, hex('#7ac8e8')); }
  { const cx = 78, cy = 34, r = 7; disco(cx, cy, r + 1, P.nogalS); disco(cx, cy, r, C.blanco); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(cx + Math.sin(a) * (r - 1)), Math.round(cy - Math.cos(a) * (r - 1)), k % 3 ? hex('#a8a8b0') : K); }
    const m = ((t / 60) % 1 + 0.25) * Math.PI * 2, s = (Math.floor(t) % 60) / 60 * Math.PI * 2; linea(cx, cy, cx + 3, cy - 2, K); linea(cx, cy, Math.round(cx + Math.sin(m) * 5), Math.round(cy - Math.cos(m) * 5), K); linea(cx, cy, Math.round(cx + Math.sin(s) * 6), Math.round(cy - Math.cos(s) * 6), C.rojo); }
  // la tribuna del jurado: diez bustos en dos filas; uno da cabezadas y otra toma notas
  const JU = [['rizos', '#4a6aa8'], ['calvo', '#a84a4a'], ['mujer', '#5a8a5a'], ['rizos', '#8a6a4a'], ['mujer', '#6a4a8a'], ['calvo', '#3a5a6a'], ['mujer', '#a86a3a'], ['rizos', '#5a5a6a'], ['calvo', '#7a5a8a'], ['mujer', '#3a7a7a']];
  for (let k = 0; k < 10; k++) { const x = 262 + (k % 5) * 12, y = 72 + Math.floor(k / 5) * 22, [tipo, c] = JU[k];
    if (k === 5) { rect(258, 88, 319, 93, K); rect(259, 89, 319, 92, P.nogal); rect(259, 89, 319, 89, P.nogalL); }
    rect(x - 1, y - 2, x + 9, y + 11, K); rect(x, y - 1, x + 8, y + 11, P.cuero);
    const fase = t % 11, duerme = k === 7 && fase > 7 && fase < 9.6; R.busto(tipo, tela(c, c_str(c_mezcla(hex(c), hex('#000000'), 0.3))), x, y + (duerme && fase > 7.5 ? 1 : 0), duerme ? 3.05 : t + k * 0.9);
    if (k === 3) { rect(x + 1, y + 9, x + 7, y + 11, K); rect(x + 2, y + 10, x + 6, y + 11, C.blanco); const px = x + 4 + Math.round(Math.sin(t * 6) * 2); pset(px, y + 9, C.amarillo); pset(px + 1, y + 8, C.amarillo); } }
  rect(258, 108, 319, 124, K); rect(259, 109, 319, 124, P.nogal); rect(259, 109, 319, 110, P.nogalL); for (let k = 0; k < 3; k++) c_cuarteron(R, 262 + k * 19, 112, 277 + k * 19, 122, P.nogal, P.nogalL, P.nogalS, P.nogalV, 84 + k);
  // motas de polvo en la luz del ventanal de la izquierda
  for (let k = 0; k < 12; k++) { const fy = (h(k, 3, 92) * 70 + t * (2 + h(k, 4, 92) * 3)) % 70, x = Math.round(16 + fy * 0.6 + h(k, 5, 92) * 40 + Math.sin(t * 0.6 + k) * 2), y = Math.round(84 + fy); if (Math.sin(t * 1.4 + k * 2) > -0.2) pset(x, y, hex('#fff4d8')); }
  return { suelo: 158, estrado: 100, testigo: 106, estradoCaja: [104, 94, 216, 126], testigoCaja: [62, 100, 100, 126], ventanas: [V1, V2], jurado: [258, 66, 319, 124], secretario: [222, 84, 256, 122], placa: [160, 28], mesas: { izq: [0, 56, 152], der: [264, 319, 152] }, libre: [60, 260] };
}

// delante en el tribunal: el estrado con el mazo, el banco de los testigos, las mesas de las partes y la barandilla
function c_tribunalDelante(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k, P = c_P;
  // el estrado: la tapa con su vuelo, el friso, cinco cuarterones con el medallón y el zócalo
  rect(104, 92, 216, 96, K); rect(105, 93, 215, 94, P.nogalL); rect(105, 95, 215, 95, P.nogal);
  rect(108, 96, 212, 126, K); rect(109, 97, 211, 126, P.nogal); rect(109, 97, 211, 98, P.nogalS);
  for (let k = 0; k < 5; k++) { const x = 113 + k * 20; c_cuarteron(R, x, 101, x + 15, 121, P.nogal, P.nogalL, P.nogalS, P.nogalV, k + 90); }
  disco(160, 111, 4, K); disco(160, 111, 3, C.oro); pset(159, 110, C.oroL); rect(109, 122, 211, 126, P.nogalS); rect(109, 122, 211, 122, P.nogalL);
  // lo de encima del estrado: carpetas, la lámpara de banquero con su luz, el micrófono con su piloto y el mazo
  rect(110, 86, 128, 92, K); rect(111, 87, 127, 88, C.papel); rect(111, 89, 127, 90, hex('#4a6aa8')); rect(111, 91, 127, 91, C.ocre);
  rect(132, 90, 140, 92, K); rect(135, 84, 136, 90, C.oroS); poligono([[129, 85], [143, 85], [140, 80], [132, 80]], K); poligono([[130, 84], [142, 84], [139, 81], [133, 81]], C.verde); rect(133, 81, 139, 81, C.verdeL);
  for (let y = 85; y < 92; y++) for (let x = 128; x < 146; x++) if (c_b4(x, y) < 0.3) c_aclara(R, x, y, 0.2, [255, 240, 190]);
  linea(176, 92, 176, 86, K); linea(176, 86, 172, 84, K); rect(170, 83, 172, 84, hex('#3a3a46')); pset(176, 92, Math.floor(t * 1.5) % 2 ? C.rojo : C.rojoS);
  PIEZAS_GT.mazo?.(R, 196, 92, {});
  // el banco de los testigos: la baranda, dos cuarterones, el vaso y el micrófono
  rect(60, 98, 102, 102, K); rect(61, 99, 101, 100, P.nogalL); rect(62, 102, 100, 126, K); rect(63, 103, 99, 126, P.nogal);
  c_cuarteron(R, 66, 106, 79, 122, P.nogal, P.nogalL, P.nogalS, P.nogalV, 95); c_cuarteron(R, 83, 106, 96, 122, P.nogal, P.nogalL, P.nogalS, P.nogalV, 96);
  rect(64, 92, 67, 98, K); rect(65, 93, 66, 97, hex('#c8e4f4')); linea(96, 98, 96, 93, K); linea(96, 93, 93, 91, K); pset(92, 91, hex('#3a3a46'));
  // las mesas de las partes, en las esquinas, con carpetas y un vaso
  for (const [a, b] of [[-2, 56], [264, 322]]) { rect(a, 152, b, 156, K); rect(a + 1, 153, b - 1, 154, C.maderaL); rect(a + 1, 155, b - 1, 155, C.madera); rect(a + 3, 156, b - 3, 179, K); rect(a + 4, 157, b - 4, 179, C.madera); for (let x = a + 8; x + 14 < b - 4; x += 20) c_cuarteron(R, x, 160, x + 14, 176, C.madera, C.maderaL, C.maderaS, hex('#8a5a34'), x); }
  rect(8, 146, 26, 152, K); rect(9, 147, 25, 148, hex('#2a3a6a')); rect(9, 149, 25, 151, C.papel); rect(40, 145, 44, 152, K); rect(41, 146, 43, 151, hex('#c8e4f4'));
  rect(276, 146, 298, 152, K); rect(277, 147, 297, 148, C.ocre); rect(277, 149, 297, 151, hex('#6a2a2a')); rect(304, 145, 308, 152, K); rect(305, 146, 307, 151, hex('#c8e4f4'));
  // la barandilla de la sala, en primer término, con el portillo del centro
  rect(0, 172, 319, 179, K); rect(0, 173, 319, 179, C.maderaS); rect(0, 173, 319, 173, C.madera);
  for (let x = 60; x < 262; x += 10) { if (x > 140 && x < 176) continue; rect(x, 166, x + 2, 172, K); rect(x + 1, 166, x + 1, 172, C.madera); rect(x - 1, 168, x + 3, 170, K); rect(x, 168, x + 2, 169, C.maderaL); }
  rect(146, 166, 170, 172, K); rect(147, 167, 169, 171, C.madera); rect(147, 167, 169, 167, C.maderaL);
  rect(56, 164, 264, 166, K); rect(56, 165, 264, 165, C.maderaL);
  return { tablero: 94 };
}

// el plató de noticias de los 2000 (cámara 'tele' del tribunal)
function c_tele(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  const S = c_fijo(R, 'tele', () => {
    c_degradado(R, 0, 0, 319, 122, [hex('#0a1030'), hex('#121a46'), hex('#1a2660'), hex('#22307a'), hex('#1a2660')]);
    // la parrilla de focos (lejos de la esquina de Atom) y las torres de luz de los lados
    rect(0, 2, 268, 4, hex('#3a3e52')); for (let x = 4; x < 268; x += 8) linea(x, 2, x + 4, 4, hex('#2a2e40'));
    for (const x of [30, 90, 150, 210, 256]) { rect(x - 1, 5, x + 1, 7, hex('#3a3e52')); rect(x - 5, 7, x + 5, 13, K); rect(x - 4, 8, x + 4, 12, hex('#2e3244')); rect(x - 3, 13, x + 3, 14, x < 176 ? hex('#8a8470') : hex('#fff0b0')); }
    for (const [x0, x1] of [[0, 34], [286, 319]]) { rect(x0, 30, x1, 122, hex('#141a36')); for (let y = 34; y < 122; y += 10) rect(x0, y, x1, y, hex('#0e1430')); }
    // el marco del videowall: seis pantallas con su bisel
    rect(56, 18, 264, 98, K); for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) { const x0 = 58 + i * 69, y0 = 20 + j * 39; rect(x0, y0, x0 + 66, y0 + 36, hex('#1a1e2a')); }
    // el suelo negro brillante con el reflejo azul del videowall y las marcas de cinta
    rect(0, 122, 319, 179, hex('#0e1020')); rect(0, 122, 319, 122, hex('#3a4a8a'));
    for (let y = 123; y < 160; y++) for (let x = 56; x < 265; x++) if (c_b4(x, y) < 0.45 - (y - 123) * 0.012) pset(x, y, hex('#1e2a5a'));
    for (let y = 124; y < 180; y += 3) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 93) < 0.1) pset(x, y, hex('#1a1c30'));
    for (const [x, y] of [[100, 170], [220, 170], [160, 176]]) { linea(x - 3, y, x + 3, y, hex('#c8a040')); linea(x, y - 2, x, y + 2, hex('#c8a040')); }
    // las sillas tras la mesa
    for (const x of [126, 194]) { rect(x - 8, 114, x + 8, 140, K); rect(x - 7, 115, x + 7, 140, hex('#2a2a36')); rect(x - 7, 115, x + 7, 116, hex('#4a4a5a')); rect(x - 6, 120, x + 6, 120, hex('#1e1e28')); }
    return null;
  });
  // el videowall: las seis pantallas cambian de contenido (globo, caja genérica con «?», gráfica, mazo, ondas, mapa de barras)
  for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) { const x0 = 59 + i * 69, y0 = 21 + j * 39, cl = [x0, y0, x0 + 64, y0 + 34], q = (i + j * 3 + Math.floor(t / 3.2)) % 6; R.recorte(cl);
    c_degradado(R, cl[0], cl[1], cl[2], cl[3], q % 2 ? [hex('#1a3a8a'), hex('#2a5ac8')] : [hex('#0a2a5a'), hex('#1a4a9a')]);
    const cx = x0 + 32, cy = y0 + 17;
    if (q === 0) { disco(cx, cy, 13, hex('#2a6ac8')); for (let y = -13; y <= 13; y++) for (let x = -13; x <= 13; x++) if (x * x + y * y <= 169) { const lon = Math.floor((x / 13 * 1.4 + t * 0.4) * 3), lat = Math.floor(y / 5); if (h(lon, lat, 94) < 0.4) R.pset(cx + x, cy + y, hex('#4aa85a')); } R.disco(cx - 4, cy - 5, 2, hex('#8ac8ff')); }
    else if (q === 1) { PIEZAS_GT.cajaJuego?.(R, cx - 8, y0 + 31, { color: '#c83a3a' }); R.icono('?', cx + 10, y0 + 8, C.blanco, K, 2); }
    else if (q === 2) { for (let b = 0; b < 6; b++) { const hh = Math.round(4 + b * 4 * Math.min(1, (t % 3.2) / 1.5)); c_rr(R, cl, x0 + 6 + b * 9, y0 + 30 - hh, x0 + 11 + b * 9, y0 + 30, b === 5 ? hex('#e83a3a') : hex('#e8c040')); } c_rr(R, cl, x0 + 4, y0 + 31, x0 + 60, y0 + 31, C.blanco); }
    else if (q === 3) { PIEZAS_GT.mazo?.(R, cx, cy + 4, { s: 2 }); }
    else if (q === 4) { for (let k = 0; k < 3; k++) { const r = ((t * 12 + k * 8) % 24); for (let a = 0; a < 6.28; a += 0.12) R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.7), hex('#8ac8ff')); } R.disco(cx, cy, 3, C.blanco); }
    else { for (let k = 0; k < 4; k++) c_rr(R, cl, x0 + 6, y0 + 6 + k * 7, x0 + 6 + 20 + Math.floor(h(k, Math.floor(t / 3.2), 95) * 30), y0 + 9 + k * 7, k === 0 ? hex('#e83a3a') : hex('#c8d8f0')); }
    for (let y = cl[1]; y <= cl[3]; y += 2) for (let x = cl[0]; x <= cl[2]; x += 5) if (((y >> 1) + Math.floor(t * 10)) % 9 === 0) R.pset(x, y, hex('#8ab0ff'));
    R.recorte(null); }
  // la franja de rótulo de abajo (sin letras: rayas que corren) y las tiras de luz de las torres, que laten
  rect(56, 100, 264, 108, K); rect(57, 101, 263, 107, hex('#c8282a')); rect(57, 101, 80, 107, hex('#f8f8f8')); disco(68, 104, 2, hex('#c8282a'));
  for (let k = 0; k < 8; k++) { const x = 84 + ((k * 26 - Math.floor(t * 20)) % 180 + 180) % 180; rect(x, 103, Math.min(262, x + 14), 104, C.blanco); }
  for (const x0 of [6, 18, 292, 304]) for (let y = x0 > 200 ? 50 : 34; y < 120; y++) { const v = (y + Math.floor(t * 14) + x0) % 26; pset(x0, y, v < 3 ? hex('#c8f4ff') : Math.sin(t * 2 + x0) > 0 ? hex('#3a8ac8') : hex('#2a5a9a')); pset(x0 + 8, y, v > 20 ? hex('#c8f4ff') : hex('#2a5a9a')); }
  // un piloto rojo de «en directo» sobre el videowall que late
  disco(214, 13, 2, Math.floor(t * 1.5) % 2 ? hex('#ff3a3a') : hex('#6a1a1a'));
  return { suelo: 156, mesa: [84, 145, 236, 172], videowall: [56, 18, 264, 98], libre: [96, 224] };
}

// delante en el plató: la mesa curva del presentador y las dos cámaras de estudio en sus pedestales
function c_teleDelante(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  poligono([[84, 145], [236, 145], [244, 172], [76, 172]], K); poligono([[85, 146], [235, 146], [242, 171], [78, 171]], hex('#2a3448'));
  rect(84, 145, 236, 149, K); rect(85, 146, 235, 147, hex('#e8eef6')); rect(85, 148, 235, 148, hex('#a8b4c8'));
  for (let x = 80; x < 241; x++) pset(x, 158, ((x >> 1) + Math.floor(t * 8)) % 14 === 0 ? hex('#c8f4ff') : hex('#3a8ac8'));
  disco(160, 163, 6, K); disco(160, 163, 5, hex('#2a6ac8')); for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) if (x * x + y * y <= 25 && (Math.abs(x) === 3 || y === 0)) pset(160 + x, 163 + y, hex('#8ac8ff'));
  rect(92, 139, 106, 145, K); rect(93, 140, 105, 144, hex('#3a3e4a')); rect(214, 139, 228, 145, K); rect(215, 140, 227, 144, hex('#3a3e4a'));
  rect(110, 141, 116, 145, K); rect(111, 142, 115, 144, hex('#c83a3a')); rect(204, 143, 212, 145, C.blanco); rect(205, 142, 211, 142, hex('#d8d8e0'));
  for (const [x, d] of [[30, 1], [290, -1]]) { const X = (u) => x + u * d, r = (a, b, y0, y1, c) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c);
    linea(X(0), 164, X(-16), 176, K); linea(X(0), 164, X(16), 176, K); linea(X(0), 164, X(2), 178, K); for (const u of [-16, 16]) { disco(X(u), 177, 2, K); }
    r(-3, 3, 140, 166, K); r(-2, 2, 140, 166, hex('#5a5e6a')); r(-1, -1, 140, 166, hex('#8a8e9a'));
    r(-18, 16, 118, 140, K); r(-17, 15, 119, 139, hex('#3a3e48')); r(-17, 15, 119, 119, hex('#5e626e')); for (let y = 124; y < 136; y += 2) r(-14, -4, y, y, hex('#2a2e36'));
    r(16, 28, 122, 136, K); r(17, 27, 123, 135, hex('#2a2c34')); for (const u of [19, 22, 25]) r(u, u, 123, 135, hex('#4a4e5a'));
    r(-18, -6, 108, 118, K); r(-17, -7, 109, 117, hex('#c8e0f0')); pset(X(-12), 112, hex('#3a3e4a'));
    r(4, 8, 114, 117, K); pset(X(6), 115, Math.floor(t * 2) % 2 ? C.rojo : C.rojoS);
    linea(X(-14), 130, X(-30), 140, K); linea(X(-14), 131, X(-30), 141, hex('#5a5e6a'));
    for (let i = 0; i < 40; i++) pset(X(-i), 176 + Math.round(Math.sin(i * 0.3) * 2), hex('#2a2e40')); }
  return { tablero: 145 };
}

// la paleta de la ciudad de juguete (colores de juguete: limpios y alegres)
const d_C = pal({
  k: '#17131f', blanco: '#fbf9f2', asf: '#5a5d6c', asfS: '#4a4c5a', asfL: '#6c7080', asfR: '#424452', linea: '#f6f0e0',
  amarilla: '#f4c640', acera: '#cfc8bc', aceraS: '#aea69a', aceraL: '#e4dfd4', bordillo: '#8c8478', suelo: '#d8cdb4', sueloS: '#bfb296',
  cesped: '#74c25e', cespedS: '#5aa64a', cespedL: '#98da78', cespedM: '#6ab656', copa: '#3e9a4a', copaS: '#2a7038', copaL: '#86d264', flor: '#f48ab0',
  agua: '#4a9ee0', aguaS: '#3a84c8', aguaL: '#a6dcf6', aguaP: '#2e6eb0', piedra: '#a8a4a0', piedraS: '#7e7a78', tierra: '#b8946a', tierraS: '#96744e',
  vidrio: '#a4d4f2', vidrioS: '#6a9cc8', vidrioL: '#e4f4fc', metal: '#a8b0bc', metalS: '#727a88', madera: '#b8834e', maderaS: '#8a5c34',
  rojo: '#e4483e', rojoS: '#a8302a', policiaR: '#ff3a3a', policiaA: '#3a7aff', rosa: '#f490b8', rosaS: '#d4628e', crema: '#fff2d6',
  sombra: '#2a2638',
});

// los tejados de juguete: [tejado, sombra, luz]
const d_TEJADOS = Object.fromEntries(Object.entries({
  rojo: ['#e2604e', '#b8443a', '#f4927a'], azul: ['#5a8ee0', '#3e6ab8', '#90b8f4'], amarillo: ['#f2c444', '#cc9a2a', '#fae08a'],
  verde: ['#62b672', '#428a52', '#94d8a0'], naranja: ['#f08a3e', '#c8662a', '#f8b07a'], lila: ['#a47ad2', '#7a56a8', '#c8a8ec'],
  menta: ['#76d0c0', '#4aa898', '#a8ece0'], rosa: ['#f088a8', '#c86080', '#f8b4c8'], crema: ['#ece0c4', '#c8b898', '#f8f0dc'],
  gris: ['#a4a8b4', '#80848e', '#c4c8d2'], perla: ['#c8c4d0', '#a6a2b0', '#dcd8e4'],
}).map(([k, v]) => [k, v.map(hex)]));

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function d_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// la trama ordenada 4 × 4 para los degradados y las sombras tramadas
const d_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_umbral = (x, y) => d_BAYER[((y & 3) << 2) | (x & 3)];

// un fondo fijo por R y por clave: se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma
const d_CACHE = new WeakMap();

function d_fijo(R, clave, dibuja) {
  let m = d_CACHE.get(R); if (!m) d_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]); return m[clave];
}

// oscurece (o tiñe) un píxel del lienzo en la proporción a, si está dentro
function d_tinte(R, x, y, c, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; const i = y * 320 + x; R.buf[i] = d_mezcla(R.buf[i], c, a); }

const d_atom = (x, y) => x > 272 && y < 48;   // la esquina de Atom, siempre tranquila

const d_suave = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };

// ════ 'arriba': la ciudad de juguete vista desde arriba ════
// las calles (asfalto) y las aceras; los carriles (centros) por la derecha; el lazo de la persecución por el centro
const d_H = [[50, 63], [118, 131]], d_V = [[72, 85], [184, 197]], d_RIO = [228, 252];

const d_LAZO = [[79, 57], [191, 57], [191, 125], [79, 125]];

const d_CARRILES = [
  { eje: 'h', c: 53, dir: -1, via: 0 }, { eje: 'h', c: 60, dir: 1, via: 0 }, { eje: 'h', c: 121, dir: -1, via: 1 }, { eje: 'h', c: 128, dir: 1, via: 1 },
  { eje: 'v', c: 75, dir: 1, via: 0 }, { eje: 'v', c: 82, dir: -1, via: 0 }, { eje: 'v', c: 187, dir: 1, via: 1 }, { eje: 'v', c: 194, dir: -1, via: 1 },
];

// los edificios de cada manzana: [x0, y0, x1, y1, alto (la fachada sur que se ve), tejado, detalle]
const d_EDIFICIOS = [
  [2, 2, 30, 42, 6, 'crema', 1], [33, 2, 65, 19, 4, 'perla', 2], [33, 23, 65, 43, 7, 'rojo', 3],
  [92, 2, 124, 21, 4, 'perla', 4], [127, 2, 177, 18, 4, 'crema', 5], [92, 25, 118, 43, 8, 'azul', 6], [121, 22, 150, 43, 10, 'amarillo', 7], [153, 22, 177, 43, 6, 'verde', 8],
  [203, 3, 224, 21, 7, 'lila', 9], [203, 25, 224, 43, 5, 'naranja', 10],
  [2, 70, 24, 111, 9, 'naranja', 11], [27, 70, 65, 90, 6, 'azul', 12], [27, 94, 45, 111, 5, 'rosa', 13], [48, 94, 65, 111, 7, 'menta', 14],
  [203, 70, 224, 91, 10, 'rojo', 15],
  [153, 138, 178, 177, 6, 'menta', 16],
  [203, 138, 224, 159, 8, 'amarillo', 17], [203, 163, 224, 179, 5, 'azul', 18],
  [257, 138, 286, 156, 6, 'gris', 19],
];

// los árboles: [x, y, radio, flores]
const d_ARBOLES = [
  [96, 74, 5], [108, 72, 4], [172, 74, 5], [160, 71, 4], [96, 108, 5], [172, 108, 5], [99, 89, 4, 1], [166, 92, 4], [152, 76, 3, 1],
  [6, 140, 4], [62, 140, 4, 1], [6, 175, 4, 1], [62, 175, 4],
  [69, 30, 3], [69, 100, 3], [69, 160, 3], [89, 34, 3], [89, 150, 3, 1], [181, 30, 3], [181, 100, 3], [200, 30, 3, 1], [200, 160, 3],
  [258, 8, 4], [266, 26, 5], [259, 40, 3], [227, 6, 2], [227, 160, 2],
  [12, 48, 3], [40, 48, 3], [120, 47, 3], [150, 47, 3], [30, 115, 3, 1], [140, 115, 3], [292, 47, 3], [306, 115, 3], [292, 133, 3],
];

// la base fija de 'arriba': el suelo de las manzanas, las calles con su textura, los pasos de cebra, las aceras, los
// edificios con sus tejados, el parque, la plaza, el aparcamiento, el estadio, el muelle y los puentes
function d_baseArriba(R) {
  const { rect, pset, disco, linea } = R, B = R.buf;
  // el suelo de las manzanas: losetas claras con su grano
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 501); B[y * 320 + x] = (x % 6 === 0 || y % 6 === 0) && q < 0.6 ? d_C.sueloS : q < 0.05 ? d_C.aceraS : d_C.suelo; }
  // las aceras (losas con juntas y el canto claro) alrededor de cada calle
  const acera = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue; const q = h(x, y, 502); B[y * 320 + x] = (x % 5 === 0 || y % 5 === 0) ? d_C.aceraS : q < 0.07 ? d_C.aceraL : d_C.acera; } };
  for (const [a, b] of d_H) { acera(0, a - 4, 319, a - 1); acera(0, b + 1, 319, b + 4); }
  for (const [a, b] of d_V) { acera(a - 4, 0, a - 1, 179); acera(b + 1, 0, b + 4, 179); }
  // el asfalto: grano, parches de alquitrán, el bordillo
  const asfalto = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const q = h(x, y, 503); B[y * 320 + x] = q < 0.07 ? d_C.asfS : q > 0.955 ? d_C.asfL : d_C.asf; } };
  for (const [a, b] of d_H) asfalto(0, a, 319, b);
  for (const [a, b] of d_V) asfalto(a, 0, b, 179);
  d_asfaltoArriba(R);
  for (const [a, b] of d_H) { rect(0, a, 319, a, d_C.asfR); rect(0, b, 319, b, d_C.asfS); }
  for (const [a, b] of d_V) { for (let y = 0; y < 180; y++) { if (d_H.some(([p, q]) => y >= p && y <= q)) continue; pset(a, y, d_C.asfR); pset(b, y, d_C.asfS); } }
  for (const [x0, y0] of [[30, 58], [140, 54], [290, 124], [76, 20], [190, 160], [40, 126], [192, 92]]) for (let i = 0; i < 7; i++) pset(x0 + i, y0 + Math.round(Math.sin(i + x0) * 1.2), d_C.asfR);
  // las líneas: discontinuas por el centro (fuera de los cruces), las de parada y los pasos de cebra
  const enCruceX = (x) => d_V.some(([a, b]) => x >= a - 5 && x <= b + 5), enCruceY = (y) => d_H.some(([a, b]) => y >= a - 5 && y <= b + 5);
  for (const [a, b] of d_H) { const c = (a + b) >> 1; for (let x = 0; x < 320; x++) if (!enCruceX(x) && x % 8 < 4) { pset(x, c, d_C.linea); pset(x, c + 1, d_C.linea); } }
  for (const [a, b] of d_V) { const c = (a + b) >> 1; for (let y = 0; y < 180; y++) if (!enCruceY(y) && y % 8 < 4) { pset(c, y, d_C.linea); pset(c + 1, y, d_C.linea); } }
  for (const [va, vb] of d_V) for (const [ha, hb] of d_H) {
    for (const x0 of [va - 4, vb + 1]) for (let y = ha + 1; y < hb; y++) if (((y - ha) >> 1) % 2 === 0) rect(x0, y, x0 + 3, y, d_C.linea);   // cebra que cruza la calle horizontal
    for (const y0 of [ha - 4, hb + 1]) for (let x = va + 1; x < vb; x++) if (((x - va) >> 1) % 2 === 0) rect(x, y0, x, y0 + 3, d_C.linea);   // cebra que cruza la vertical
  }
  // las alcantarillas y los sumideros
  for (const [x, y] of [[40, 61], [150, 52], [74, 150], [196, 20], [300, 129], [120, 129]]) { disco(x, y, 2, d_C.asfR); pset(x, y, d_C.asfL); pset(x - 1, y, d_C.asfS); }
  // el río: las orillas de piedra con sus juntas (el agua, que se mueve, va en cada fotograma)
  for (let y = 0; y < 180; y++) for (const x of [d_RIO[0] - 2, d_RIO[0] - 1, d_RIO[1] + 1, d_RIO[1] + 2]) B[y * 320 + x] = (y % 4 === 0) ? d_C.piedraS : (x === d_RIO[0] - 1 || x === d_RIO[1] + 1) ? d_C.piedraS : d_C.piedra;
  // las manzanas: la sombra de cada edificio (al este y al sur), y luego el edificio
  for (const e of d_EDIFICIOS) d_sombraEdificio(R, e);
  // la manzana del parque: el césped segado en franjas, los caminos, el estanque, el arenero con su tobogán, los bancos
  { const [x0, y0, x1, y1] = [90, 68, 179, 113];
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const q = h(x, y, 504), f = ((x + y) >> 3) % 2; B[y * 320 + x] = q < 0.06 ? d_C.cespedL : q > 0.96 ? d_C.cespedS : f ? d_C.cesped : d_C.cespedM; }
    rect(x0, y0, x1, y0, d_C.cespedS); rect(x0, y1, x1, y1, d_C.cespedS);
    const camino = (ax, ay, bx, by) => { for (let k = -2; k <= 2; k++) linea(ax, ay + k, bx, by + k, Math.abs(k) === 2 ? d_C.tierraS : d_C.tierra); };
    camino(x0, y0 + 4, 134, 90); camino(134, 90, x1, y1 - 4); camino(x0, y1 - 4, 134, 90); camino(134, 90, x1, y0 + 4);
    for (let a = 0; a < 6.3; a += 0.02) for (const r of [19, 20, 21]) pset(Math.round(134 + Math.cos(a) * r * 1.4), Math.round(90 + Math.sin(a) * r * 0.85), r === 21 ? d_C.tierraS : d_C.tierra);
    for (let j = -10; j <= 10; j++) for (let i = -19; i <= 19; i++) { const e = (i / 19) ** 2 + (j / 10) ** 2; if (e <= 1) pset(134 + i, 90 + j, e > 0.82 ? d_C.piedra : d_C.aguaS); }
    for (let i = -19; i <= 19; i++) { const j = Math.round(Math.sqrt(Math.max(0, 1 - (i / 19) ** 2)) * 10); pset(134 + i, 90 + j, d_C.piedraS); }
    // el arenero y el tobogán (con su sombra)
    rect(150, 99, 164, 109, d_C.maderaS); rect(151, 100, 163, 108, hex('#f0dca0')); for (let k = 0; k < 10; k++) pset(152 + Math.round(h(k, 1, 505) * 10), 101 + Math.round(h(k, 2, 505) * 6), hex('#d8c080'));
    rect(155, 101, 158, 107, d_C.sombra); rect(154, 100, 157, 106, d_C.rojo); rect(155, 100, 156, 106, hex('#ff7a6a')); rect(153, 99, 158, 100, hex('#5a8ee0'));
    // los bancos y las papeleras
    for (const [bx, by] of [[110, 79], [150, 79], [113, 102]]) { rect(bx, by + 1, bx + 6, by + 3, d_C.sombra); rect(bx, by, bx + 6, by + 2, d_C.madera); rect(bx, by, bx + 6, by, hex('#d8a46a')); }
    for (const [px, py] of [[124, 74], [146, 106]]) { disco(px + 1, py + 1, 1, d_C.sombra); disco(px, py, 1, d_C.metalS); pset(px, py, d_C.k); } }
  // la plaza: losas en damero de dos tonos, la fuente (la taza; el agua va en cada fotograma), bancos, el quiosco de
  // helados con su sombrilla de gajos, macetas
  { const [x0, y0, x1, y1] = [0, 136, 67, 179];
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = ((x >> 3) + (y >> 3)) % 2, q = h(x, y, 506); B[y * 320 + x] = (x % 8 === 0 || y % 8 === 0) ? hex('#b8a88e') : q < 0.05 ? hex('#efe2c8') : a ? hex('#e2d2b2') : hex('#d4bc96'); }
    for (let r = 0; r < 14; r++) for (let a = 0; a < 6.3; a += 0.05) if (r > 11) pset(Math.round(34 + Math.cos(a) * r), Math.round(157 + Math.sin(a) * r * 0.8), r === 13 ? hex('#a89474') : hex('#c8b49a'));
    for (let j = -10; j <= 10; j++) for (let i = -12; i <= 12; i++) { const e = (i / 11.5) ** 2 + (j / 9) ** 2; if (e <= 1) pset(34 + i, 157 + j, e > 0.78 ? d_C.piedra : d_C.aguaS); }
    for (let i = -11; i <= 11; i++) pset(34 + i, 157 + Math.round(Math.sqrt(Math.max(0, 1 - (i / 11.5) ** 2)) * 9), d_C.piedraS);
    disco(34, 157, 3, d_C.piedraS); disco(34, 156, 2, d_C.piedra);
    for (const [bx, by] of [[8, 146], [52, 146], [8, 168], [52, 168]]) { rect(bx, by + 1, bx + 7, by + 3, d_C.sombra); rect(bx, by, bx + 7, by + 2, d_C.madera); rect(bx, by, bx + 7, by, hex('#d8a46a')); }
    { const kx = 58, ky = 158; for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j <= 36) pset(kx + i + 2, ky + j + 2, d_mezcla(B[(ky + j + 2) * 320 + kx + i + 2], d_C.sombra, 0.45));
      for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = i * i + j * j; if (d > 36) continue; const g = Math.floor((Math.atan2(j, i) + Math.PI) / (Math.PI / 4)) % 2; pset(kx + i, ky + j, d > 30 ? d_C.rosaS : g ? d_C.rosa : d_C.crema); }
      disco(kx, ky, 1, d_C.rojo); }
    for (const [mx, my] of [[22, 140], [46, 140], [22, 176], [46, 176]]) { disco(mx + 1, my + 1, 2, d_C.sombra); disco(mx, my, 2, d_C.tierraS); disco(mx, my, 1, d_C.flor); } }
  // el aparcamiento: asfalto claro con las plazas pintadas y coches aparcados (los dos del cambio van en cada fotograma)
  { const [x0, y0, x1, y1] = [90, 136, 150, 179];
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const q = h(x, y, 507); B[y * 320 + x] = q < 0.06 ? hex('#7a7c88') : q > 0.96 ? hex('#a0a2ac') : hex('#8c8e9a'); }
    for (let x = 93; x <= 149; x += 8) { rect(x, 139, x, 152, d_C.linea); rect(x, 166, x, 179, d_C.linea); }
    rect(93, 139, 149, 139, d_C.linea); for (let x = 96; x < 148; x += 6) pset(x, 159, d_C.linea);
    const aparca = [[97, 145, 'rojo'], [129, 145, 'verde'], [137, 145, 'lila'], [97, 172, 'naranja'], [113, 172, 'perla'], [145, 172, 'azul']];
    for (const [cx, cy, col] of aparca) d_cocheArriba(R, cx, cy, -Math.PI / 2, 'coche', d_TEJADOS[col][0], 0); }
  // los edificios (el del supermercado y los de cada manzana)
  for (const e of d_EDIFICIOS) d_edificioArriba(R, e);
  // el estadio: las gradas de colores en anillos, el césped con las líneas y los focos
  { const cx = 288, cy = 91, rx = 29, ry = 21;
    for (let j = -ry - 3; j <= ry + 3; j++) for (let i = -rx - 3; i <= rx + 3; i++) { const e = (i / (rx + 1)) ** 2 + (j / (ry + 1)) ** 2; if (e <= 1.18 && e > 1) pset(cx + i + 2, cy + j + 2, d_C.sombra); }
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e > 1) continue;
      let c; if (e > 0.92) c = d_C.blanco; else if (e > 0.5) { const anillo = Math.floor((Math.sqrt(e) - 0.7) * 30), q = h(i, j, 508); c = q < 0.08 ? d_C.blanco : [hex('#e4483e'), hex('#f2c444'), hex('#5a8ee0'), hex('#c8c4d0')][((anillo % 4) + 4) % 4]; if ((i * 7 + j * 3) % 9 === 0) c = d_mezcla(c, d_C.k, 0.25); }
      else c = ((i + 40) >> 2) % 2 ? d_C.cesped : d_C.cespedM; pset(cx + i, cy + j, c); }
    for (let j = -9; j <= 9; j++) { pset(cx - 17, cy + j, d_C.blanco); pset(cx + 17, cy + j, d_C.blanco); pset(cx, cy + j, d_C.blanco); }
    for (let i = -17; i <= 17; i++) { pset(cx + i, cy - 9, d_C.blanco); pset(cx + i, cy + 9, d_C.blanco); }
    for (let a = 0; a < 6.3; a += 0.2) pset(Math.round(cx + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 4), d_C.blanco);
    for (const [s, u] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const fx = cx + s * (rx - 2), fy = cy + u * (ry - 2); rect(fx - 1, fy - 1, fx + 1, fy + 1, d_C.k); pset(fx, fy, d_C.amarilla); } }
  // la explanada del este, junto al estadio (aparcamiento de bicis, farolas) y el muelle con contenedores
  { for (let y = 136; y < 180; y++) for (let x = 255; x < 320; x++) { const q = h(x, y, 509); if (x > 256 && x < 287 && y > 137 && y < 157) continue; B[y * 320 + x] = (y % 7 === 0) ? hex('#9a948a') : q < 0.06 ? hex('#a8a296') : hex('#b8b2a6'); }
    const conts = [[290, 140, 'rojo'], [303, 140, 'azul'], [290, 150, 'verde'], [303, 150, 'amarillo'], [258, 166, 'naranja'], [271, 166, 'menta'], [258, 160, 'lila']];
    for (const [cx0, cy0, col] of conts) { const [c, cS, cL] = d_TEJADOS[col]; rect(cx0 + 2, cy0 + 2, cx0 + 13, cy0 + 8, d_C.sombra); rect(cx0, cy0, cx0 + 11, cy0 + 6, cS); rect(cx0, cy0, cx0 + 11, cy0 + 5, c); for (let x = cx0 + 1; x < cx0 + 11; x += 2) rect(x, cy0 + 1, x, cy0 + 4, cS); rect(cx0, cy0, cx0 + 11, cy0, cL); }
    for (let y = 160; y < 180; y++) for (let x = 296; x < 320; x++) B[y * 320 + x] = (x % 3 === 0) ? d_C.maderaS : (y % 9 === 0) ? hex('#6a4426') : d_C.madera;   // las tablas del muelle
    for (const bx of [298, 308, 318]) { disco(bx, 159, 1, d_C.k); } }
  // la orilla del este arriba: el césped tranquilo (la esquina de Atom) con un sendero suave
  { for (let y = 0; y <= 45; y++) for (let x = 255; x < 320; x++) { const q = h(x, y, 510), f = ((x - y) >> 4) % 2; B[y * 320 + x] = q < 0.03 ? d_C.cespedM : f ? d_C.cesped : d_C.cespedM; }
    for (let y = 0; y <= 45; y++) { const x = Math.round(262 + Math.sin(y * 0.09) * 3); rect(x, y, x + 2, y, d_C.tierra); }
    for (let y = 68; y <= 113; y++) for (let x = 255; x < 320; x++) { if ((((x - 288) / 31) ** 2 + ((y - 91) / 23) ** 2) <= 1) continue; const q = h(x, y, 511); B[y * 320 + x] = q < 0.05 ? d_C.cespedL : d_C.cesped; } }
  // la obra (al lado del edificio rojo): la zanja de tierra, el andamio y la grúa (el brazo gira en cada fotograma)
  { rect(203, 95, 224, 112, d_C.tierraS); for (let k = 0; k < 30; k++) pset(204 + Math.round(h(k, 3, 512) * 19), 96 + Math.round(h(k, 4, 512) * 15), d_C.tierra); rect(205, 97, 222, 99, d_C.metalS); for (let x = 205; x <= 222; x += 3) rect(x, 97, x, 110, d_C.metal);
    rect(203, 95, 224, 95, d_C.amarilla); for (let x = 203; x <= 224; x += 4) pset(x, 95, d_C.k); rect(209, 104, 216, 109, hex('#6a7aa8')); rect(209, 104, 216, 104, hex('#8a9ac8')); }
  // los puentes sobre el río: el tablero (la calzada ya está), las barandillas y los pilares
  for (const [a, b] of d_H) { for (let x = d_RIO[0] - 3; x <= d_RIO[1] + 3; x++) { pset(x, a - 5, d_C.k); pset(x, b + 5, d_C.k); if (x % 3 === 0) { pset(x, a - 4, d_C.metalS); pset(x, b + 4, d_C.metalS); } } }
}
// la sombra de un edificio de juguete en el suelo: al este (la mitad de su alto) y un poco al sur
function d_sombraEdificio(R, [x0, y0, x1, y1, alto]) {
  const s = Math.max(2, Math.round(alto * 0.5));
  for (let y = y0 + s; y <= y1 + 1; y++) for (let x = x1 + 1; x <= x1 + s; x++) d_tinte(R, x, y, d_C.sombra, 0.4);
  for (let y = y1 + 1; y <= y1 + 2; y++) for (let x = x0 + s; x <= x1 + s; x++) d_tinte(R, x, y, d_C.sombra, 0.32);
}

// un edificio de juguete visto desde arriba (vista de maqueta): el tejado con su pretil (luz arriba y a la izquierda,
// sombra abajo y a la derecha), cosas del tejado según el detalle (aire acondicionado, claraboya, depósito de agua, huerto,
// placas solares, caseta), y la fachada sur con sus ventanas, el bajo con un toldo de rayas y la puerta
function d_edificioArriba(R, [x0, y0, x1, y1, alto, col, k]) {
  const { rect, pset, disco } = R, [c, cS, cL] = d_TEJADOS[col], yf = y1 - alto + 1, B = R.buf;
  const calmo = x0 < 180 && y0 < 16;   // bajo la barra del año: tejado tranquilo
  for (let y = y0; y < yf; y++) for (let x = x0; x <= x1; x++) { const q = h(x, y, 520 + k); B[y * 320 + x] = q < (calmo ? 0.02 : 0.06) ? cS : q > (calmo ? 0.985 : 0.95) ? cL : c; }
  rect(x0, y0, x1, y0, cL); rect(x0, y0, x0, yf - 1, cL); rect(x1, y0, x1, yf - 1, cS); rect(x0 + 1, yf - 1, x1, yf - 1, cS);
  if (!calmo) { rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, d_mezcla(c, cL, 0.5)); }
  // la fachada: el muro (algo más oscuro), las ventanas en filas, el bajo con toldo y la puerta
  const f = d_mezcla(c, d_C.k, 0.22), fS = d_mezcla(c, d_C.k, 0.4);
  for (let y = yf; y <= y1; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = f;
  rect(x0, yf, x1, yf, fS);
  for (let y = yf + 1; y <= y1 - 3; y += 2) for (let x = x0 + 2; x < x1 - 1; x += 3) { const enc = h(x, y, 530 + k) < 0.25; pset(x, y, enc ? hex('#fff0b0') : d_C.vidrioS); pset(x + 1, y, enc ? hex('#ffe080') : d_C.vidrio); }
  if (alto >= 5) { const tol = [d_C.rojo, d_C.amarilla, hex('#3aa86a'), d_C.rosa][k % 4]; for (let x = x0 + 1; x < x1; x++) pset(x, y1 - 1, ((x - x0) >> 1) % 2 ? tol : d_C.blanco); const px = (x0 + x1) >> 1; rect(px - 1, y1 - 1, px + 1, y1, hex('#4a3020')); }
  rect(x0, y1, x1, y1, fS);
  if (calmo) { for (let x = x0 + 3; x < x1 - 3; x += 7) { rect(x, y0 + 4, x + 2, y0 + 5, cS); } return; }
  // las cosas del tejado
  const tipo = k % 6, mx = (x0 + x1) >> 1, my = (y0 + yf) >> 1;
  const caja = (bx, by, w, hh) => { rect(bx + 1, by + 1, bx + w, by + hh, d_mezcla(c, d_C.k, 0.35)); rect(bx, by, bx + w - 1, by + hh - 1, d_C.metal); rect(bx, by, bx + w - 1, by, hex('#d4dae2')); for (let i = 1; i < w - 1; i += 2) pset(bx + i, by + 1, d_C.metalS); };
  if (tipo === 0 || tipo === 3) { caja(x0 + 3, y0 + 3, 5, 3); caja(x1 - 8, y0 + 4, 4, 3); if (yf - y0 > 14) caja(mx - 2, my + 2, 6, 4); }
  if (tipo === 1) { rect(mx - 4, my - 3, mx + 4, my + 2, d_C.k); rect(mx - 3, my - 2, mx + 3, my + 1, d_C.vidrio); pset(mx - 2, my - 2, d_C.vidrioL); pset(mx - 1, my - 2, d_C.vidrioL); rect(mx, my - 2, mx, my + 1, d_C.vidrioS); caja(x0 + 3, yf - 6, 4, 3); }
  if (tipo === 2) { disco(mx + 6, my + 2, 4, d_mezcla(c, d_C.k, 0.35)); disco(mx + 5, my + 1, 4, d_C.maderaS); disco(mx + 5, my + 1, 3, d_C.madera); pset(mx + 4, my, hex('#d8a46a')); for (let a = 0; a < 6.3; a += 0.8) pset(Math.round(mx + 5 + Math.cos(a) * 3), Math.round(my + 1 + Math.sin(a) * 3), d_C.maderaS); caja(x0 + 3, y0 + 3, 4, 3); }
  if (tipo === 4) { for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) { const bx = x0 + 3 + i * 7, by = y0 + 3 + j * 6; if (bx + 5 > x1 - 2 || by + 4 > yf - 2) continue; rect(bx, by, bx + 5, by + 4, hex('#2a3a7a')); rect(bx, by, bx + 5, by, hex('#5a7ad8')); for (let xx = bx + 1; xx < bx + 5; xx += 2) rect(xx, by + 1, xx, by + 4, hex('#3a4e9a')); } }
  if (tipo === 5) { rect(x0 + 3, y0 + 3, x0 + 12, y0 + 9, d_C.tierraS); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) pset(x0 + 4 + i * 2, y0 + 4 + j * 2, h(i, j, k) < 0.5 ? d_C.copaL : d_C.copa); rect(x1 - 7, y0 + 3, x1 - 3, y0 + 7, fS); rect(x1 - 7, y0 + 3, x1 - 3, y0 + 4, d_mezcla(c, cL, 0.3)); }
}

// un coche de juguete visto desde arriba, girado (ang en radianes: 0 hacia la derecha, π/2 hacia abajo): el cuerpo de su
// color con el techo claro, el parabrisas, la luna de atrás, los faros, los pilotos y las ruedas que asoman; tipo 'coche'
// (10 × 5), 'policia' (blanco con el morro y la cola negros y el puente de luces roja y azul que se turnan con luz),
// 'helados' (el camión crema de rayas rosas con la bola de helado y la guinda en el techo, 15 × 7), 'bus' (16 × 6),
// 'taxi' (amarillo con el pilotito del techo); con su sombra al sureste
function d_cocheArriba(R, x, y, ang, tipo, col, luz = 0, esc = 1) {
  const L = tipo === 'helados' ? 15 : tipo === 'bus' ? 16 : 10, W = tipo === 'helados' ? 7 : tipo === 'bus' ? 6 : 5, ca = Math.cos(ang), sa = Math.sin(ang);
  const body = tipo === 'policia' ? d_C.blanco : tipo === 'taxi' ? hex('#f6c62e') : col, bodyS = d_mezcla(body, d_C.k, 0.3), bodyL = d_mezcla(body, d_C.blanco, 0.4);
  const color = (i, j) => {   // i: 0 (cola) … L−1 (morro); j: 0 … W−1 (de un lado a otro)
    const borde = j === 0 || j === W - 1;
    if (tipo === 'helados') {
      if (i >= 11) { if (i === 14) return j === 1 || j === 5 ? hex('#fff6b0') : d_C.rosaS; if (i === 12 && !borde) return d_C.vidrioS; if (borde && (i === 12 || i === 13)) return d_C.k; return d_C.rosa; }
      if (borde) return i === 2 || i === 3 || i === 8 || i === 9 ? d_C.k : d_C.rosaS;
      const d = Math.hypot(i - 5.5, j - 3); if (d < 1.2) return i === 5 && j === 2 ? d_C.rojo : d_C.blanco; if (d < 2.6) return d < 1.8 ? d_C.rosa : d_C.rosaS;
      return (i + j) % 4 === 0 ? d_C.rosa : d_C.crema;
    }
    if (borde) { if (i === 1 || i === 2 || i === L - 3 || i === L - 2) return d_C.k; if (i === 0 || i === L - 1) return null; return bodyS; }
    if (i === L - 1) return j === 1 || j === W - 2 ? hex('#fff6b0') : bodyS;
    if (i === 0) return j === 1 || j === W - 2 ? d_C.rojo : bodyS;
    if (tipo === 'policia') { if (i <= 1 || i >= L - 2) return d_C.k; if (i === 5) return j === 1 ? (luz ? d_C.policiaR : hex('#7a2020')) : j === W - 2 ? (!luz ? d_C.policiaA : hex('#20307a')) : d_C.k; }
    if (tipo === 'bus') { if (i === L - 2) return d_C.vidrioS; return (i % 3 === 0) ? bodyS : i % 3 === 1 ? bodyL : body; }
    if (i === L - 3) return d_C.vidrioS; if (i === 2) return hex('#3a5a7a');
    if (i >= 3 && i <= L - 4) { if (tipo === 'taxi' && i === 5 && j === 2) return hex('#ff9a3a'); return j === 1 ? bodyL : body; }
    return body;
  };
  const rr = Math.ceil(Math.hypot(L, W) * esc / 2) + 1;
  for (const sombra of [true, false]) for (let dy = -rr; dy <= rr; dy++) for (let dx = -rr; dx <= rr; dx++) {
    const u = (dx * ca + dy * sa) / esc, v = (-dx * sa + dy * ca) / esc, i = Math.floor(u + L / 2), j = Math.floor(v + W / 2);
    if (i < 0 || i >= L || j < 0 || j >= W) continue; const c = color(i, j); if (c == null) continue;
    if (sombra) d_tinte(R, Math.round(x + dx + 1), Math.round(y + dy + 1), d_C.sombra, 0.45); else R.pset(Math.round(x + dx), Math.round(y + dy), c);
  }
}

// el tráfico de 'arriba': una simulación sencilla y determinista (paso de 1/15 s desde t = 0, guardada por R) en la que
// cada coche sigue su carril por la derecha, se para detrás del de delante y en los cruces: los de las calles verticales
// ceden el paso a los de las horizontales, y nadie entra en un cruce ocupado
const d_SIM = new WeakMap();

const d_TIPOS = [['coche', 'rojo'], ['taxi', 'amarillo'], ['coche', 'azul'], ['coche', 'verde'], ['bus', 'naranja'], ['coche', 'lila'], ['policia', 'perla'], ['coche', 'menta'], ['coche', 'rosa'], ['coche', 'perla'], ['taxi', 'amarillo'], ['coche', 'naranja']];

function d_trafico(R, t) {
  let st = d_SIM.get(R);
  const nuevo = () => { const coches = []; let n = 0;
    d_CARRILES.forEach((ca, li) => { const max = ca.eje === 'h' ? 334 : 194, cuantos = ca.eje === 'h' ? 3 : 2;
      for (let k = 0; k < cuantos; k++) { const [tipo, col] = d_TIPOS[(n++ * 5 + li) % d_TIPOS.length], L = tipo === 'bus' ? 16 : 10;
        let pos = -14 + (k + 0.3 + h(li, k, 540) * 0.4) * (max + 14) / cuantos;
        const cruces = (ca.eje === 'h' ? d_V : d_H); for (const [a, b] of cruces) if (pos + L / 2 > a - 6 && pos - L / 2 < b + 6) pos = b + 7 + L / 2;
        coches.push({ li, pos, L, tipo, col: d_TEJADOS[col][0], v: (ca.eje === 'h' ? 24 : 19) + h(li, k, 541) * 5 }); } });
    return { t: 0, coches, ini: coches.map((c) => c.pos) }; };
  if (!st || t < st.t - 1e-6) { st = nuevo(); d_SIM.set(R, st); }
  const dt = 1 / 15, cs = st.coches;
  const ocupa = (c, a, b) => c.pos + c.L / 2 > a && c.pos - c.L / 2 < b;
  while (st.t + dt <= t + 1e-6) {
    for (const c of cs) {
      const ca = d_CARRILES[c.li], fr = c.pos + ca.dir * c.L / 2; let para = false;
      for (const o2 of cs) if (o2 !== c && o2.li === c.li) { const g = (o2.pos - c.pos) * ca.dir; if (g > 0 && g - (c.L + o2.L) / 2 < 4) { para = true; break; } }
      if (!para) { const cruces = ca.eje === 'h' ? d_V : d_H;
        cruces.forEach(([a, b], ci) => { if (para) return; const ent = ca.dir > 0 ? a - 1 : b + 1, d = (ent - fr) * ca.dir; if (d < 0 || d > 3) return;
          for (const o2 of cs) { const cb = d_CARRILES[o2.li]; if (cb.eje === ca.eje || cb.via !== ci) continue;
            const [ha, hb] = ca.eje === 'h' ? d_H[ca.via] : d_V[ca.via];   // la calle por la que voy, vista desde el que cruza
            if (ocupa(o2, ha - 1, hb + 1)) { para = true; break; }
            if (ca.eje === 'v') { const fr2 = o2.pos + cb.dir * o2.L / 2, e2 = cb.dir > 0 ? ha - 1 : hb + 1, d2 = (e2 - fr2) * cb.dir; if (d2 >= -2 && d2 < 18) { para = true; break; } } } }); }
      c.va = !para;
    }
    for (const c of cs) { if (!c.va) continue; const ca = d_CARRILES[c.li]; c.pos += ca.dir * c.v * dt; const max = ca.eje === 'h' ? 334 : 194; if (c.pos > max) c.pos = -14; if (c.pos < -14) c.pos = max; }
    st.t += dt;
  }
  return st;
}

// un punto del lazo de la persecución (s en px a lo largo del lazo, en el sentido de las agujas del reloj): [x, y, ángulo]
function d_lazo(s) {
  const segs = d_LAZO.map((p, i) => [p, d_LAZO[(i + 1) % 4]]), lens = segs.map(([a, b]) => Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])), tot = lens.reduce((a, b) => a + b);
  s = ((s % tot) + tot) % tot; let i = 0; while (s > lens[i]) { s -= lens[i]; i++; }
  const [a, b] = segs[i], u = s / lens[i], ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  let x = a[0] + (b[0] - a[0]) * u, y = a[1] + (b[1] - a[1]) * u, an = ang;
  const r = 7, resta = lens[i] - s;   // la curva: se recorta la esquina con un cuarto de vuelta
  if (resta < r) { const [b2] = [segs[(i + 1) % 4][1]], ang2 = Math.atan2(b2[1] - b[1], b2[0] - b[0]), w = (r - resta) / r; let da = ang2 - ang; if (da > Math.PI) da -= 2 * Math.PI; if (da < -Math.PI) da += 2 * Math.PI; an = ang + da * w * 0.5; x += Math.cos(ang2) * (r - resta) * 0.35 * w - Math.cos(ang) * 0; y += Math.sin(ang2) * (r - resta) * 0.35 * w; }
  if (s < r) { const a0 = segs[(i + 3) % 4][0], angP = Math.atan2(a[1] - a0[1], a[0] - a0[0]), w = (r - s) / r; let da = ang - angP; if (da > Math.PI) da -= 2 * Math.PI; if (da < -Math.PI) da += 2 * Math.PI; an = ang - da * w * 0.5; }
  return [x, y, an];
}

// una persona diminuta vista desde arriba (la cabeza con su pelo, los hombros con la ropa y el brazo que se balancea)
function d_peaton(R, x, y, t, k, ropa) {
  const pelo = [hex('#3a2418'), hex('#6a4a2a'), hex('#e0b860'), hex('#1c1820'), hex('#a85a2a')][k % 5], p = Math.floor(t * 4 + k) % 2;
  for (const [i, j] of [[0, 1], [1, 1], [2, 0], [2, 1]]) d_tinte(R, x + i, y + j, d_C.sombra, 0.4);
  R.pset(x - 1, y, ropa); R.pset(x, y, ropa); R.pset(x + 1, y, ropa); R.pset(x + (p ? -1 : 1), y + 1, d_mezcla(ropa, d_C.k, 0.35)); R.pset(x, y - 1, pelo);
}

// un árbol visto desde arriba: la sombra al sureste, la copa en tres tonos que se mece, y flores si las lleva
function d_arbolArriba(R, x, y, r, t, k, flores) {
  const m = Math.round(Math.sin(t * 1.3 + k * 1.7) * 0.8), B = R.buf;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) d_tinte(R, x + i + 2, y + j + 2, d_C.sombra, 0.35);
  R.disco(x + m, y, r, d_C.copaS); R.disco(x + m - 1, y - 1, Math.max(1, r - 1), d_C.copa); R.disco(x + m - 2, y - 2, Math.max(1, Math.round(r * 0.45)), d_C.copaL);
  for (let q = 0; q < r; q++) { const a = h(k, q, 545) * 6.28, d = h(k, q, 546) * (r - 1); R.pset(Math.round(x + m + Math.cos(a) * d), Math.round(y + Math.sin(a) * d), flores ? (q % 2 ? d_C.flor : d_C.blanco) : (q % 2 ? d_C.copaS : d_C.copaL)); }
}

function d_arriba(R, t, o) {
  const { pset, rect, disco, linea } = R, p = Math.max(0, Math.min(1, o.persecucion ?? 0)), B = R.buf;
  d_fijo(R, 'arriba', () => d_baseArriba(R));
  // el agua del río, que baja (brillos que se mueven), con la espuma de las orillas; bajo los puentes, la sombra
  for (let y = 0; y < 180; y++) { if (d_H.some(([a, b]) => y >= a - 5 && y <= b + 5)) continue; const bajo = d_H.some(([, b]) => y > b + 5 && y <= b + 8);
    for (let x = d_RIO[0]; x <= d_RIO[1]; x++) { const f = (x * 5 + (y - Math.floor(t * 9)) * 3) % 23, q = h(x, (y - Math.floor(t * 9)) >> 1, 550); let c = (x - d_RIO[0] + Math.round(Math.sin(y * 0.2 + t) * 1)) % 8 < 4 ? d_C.agua : d_C.aguaS;
      if (f === 0 && q < 0.6) c = d_C.aguaL; else if (q > 0.97) c = d_C.aguaP; if (x === d_RIO[0] || x === d_RIO[1]) c = (y + Math.floor(t * 6)) % 3 ? d_C.aguaL : d_C.blanco; if (bajo) c = d_mezcla(c, d_C.aguaP, 0.55); B[y * 320 + x] = c; } }
  // el remolcador que sube el río con su estela (pasa por debajo de los puentes)
  { const by = Math.round(200 - ((t * 8) % 240)), bx = 240;
    for (let i = 0; i < 14; i++) { const yy = by + 6 + i, sp = Math.round(i * 0.45); if (!d_H.some(([a, b]) => yy >= a - 5 && yy <= b + 5)) { pset(bx - sp, yy, d_C.aguaL); pset(bx + 1 + sp, yy, d_C.aguaL); if (i % 3 === 0) pset(bx, yy, d_C.blanco); } }
    for (let j = -5; j <= 5; j++) for (let i = -3; i <= 3; i++) { const yy = by + j; if (yy < 0 || yy > 179 || d_H.some(([a, b]) => yy >= a - 5 && yy <= b + 5)) continue; const borde = Math.abs(i) === 3 || j === 5 || (j === -5) || (j < -2 && Math.abs(i) > 5 + j + 2); if (j < -3 && Math.abs(i) > j + 6) continue;
      pset(bx + i, yy, borde ? d_C.k : j < -1 ? d_C.rojo : j < 3 ? (Math.abs(i) < 2 ? d_C.blanco : d_C.rojoS) : hex('#2a3a5a')); }
    const yc = by - 1; if (!d_H.some(([a, b]) => yc >= a - 7 && yc <= b + 7)) { rect(bx - 1, yc, bx + 1, yc + 2, d_C.amarilla); pset(bx, yc - 1, d_C.k); }
    for (let k = 0; k < 3; k++) { const u = ((t * 0.8 + k / 3) % 1), sx = bx + 1 + Math.round(u * 4), sy = by + 1 - Math.round(u * 6); if (!d_H.some(([a, b]) => sy >= a - 5 && sy <= b + 5)) disco(sx, sy, u < 0.5 ? 0 : 1, u > 0.6 ? d_C.aceraS : d_C.blanco); } }
  // el estanque del parque: brillos y los patos que nadan en círculo (o salen volando si un coche pisa el césped)
  for (let j = -8; j <= 8; j++) for (let i = -17; i <= 17; i++) { const e = (i / 18) ** 2 + (j / 9.3) ** 2; if (e > 0.78) continue; const f = (i + j * 2 + Math.floor(t * 5)) % 13; B[(90 + j) * 320 + 134 + i] = f === 0 ? d_C.aguaL : e < 0.3 ? d_C.agua : d_C.aguaS; }
  const vuelan = p >= 0.85;
  for (let k = 0; k < 4; k++) { if (!vuelan) { const a = t * 0.35 + k * 1.6, dx = Math.round(134 + Math.cos(a) * 11), dy = Math.round(90 + Math.sin(a) * 5); pset(dx + 1, dy + 1, d_C.aguaL); rect(dx, dy, dx + 1, dy, k ? d_C.blanco : hex('#8a6a3a')); pset(dx + (Math.cos(a + 1.6) > 0 ? 2 : -1), dy, k ? hex('#3a8a4a') : hex('#3a8a4a')); pset(dx + (Math.cos(a + 1.6) > 0 ? 3 : -2), dy, hex('#f0a020')); }
    else { const u = (t * 0.4 + k * 0.23) % 1, dx = Math.round(134 + k * 9 + u * 90), dy = Math.round(88 - u * 40 - k * 3), al = Math.floor(t * 10 + k) % 2; if (!d_atom(dx, dy)) { pset(dx, dy, d_C.blanco); pset(dx - 1, dy - al, d_C.blanco); pset(dx + 1, dy - al, d_C.blanco); pset(dx, dy + 1, hex('#f0a020')); } } }
  // la fuente de la plaza: los chorros que suben y caen y las ondas en la taza
  for (let k = 0; k < 12; k++) { const a = k / 12 * 6.28 + t * 0.4, u = ((t * 1.6 + k * 0.37) % 1), r = 1 + u * 6; pset(Math.round(34 + Math.cos(a) * r), Math.round(156 + Math.sin(a) * r * 0.8 - Math.sin(u * Math.PI) * 2), u > 0.7 ? d_C.aguaL : d_C.blanco); }
  for (let a = 0; a < 6.3; a += 0.25) { const r = 5 + ((t * 3) % 4); if (Math.sin(a * 3 + t * 2) > 0) pset(Math.round(34 + Math.cos(a) * r), Math.round(157 + Math.sin(a) * r * 0.8), d_C.aguaL); }
  pset(34, 154 - (Math.floor(t * 6) % 2), d_C.blanco); pset(34, 155, d_C.aguaL);
  // las palomas de la plaza, que picotean y a veces levantan el vuelo
  for (let k = 0; k < 6; k++) { const ciclo = (t + k * 1.3) % 9, vuela = ciclo > 7.5, bx = 12 + ((k * 23) % 44), by = 140 + ((k * 13) % 34) + (bx > 20 && bx < 48 ? 0 : 0);
    if (Math.abs(bx - 34) < 14 && Math.abs(by - 157) < 11) continue;
    if (!vuela) { const pic = Math.floor(t * 3 + k) % 3 === 0; pset(bx, by, hex('#8a8a98')); pset(bx + 1, by, hex('#a8a8b4')); pset(bx + (pic ? 2 : 1), by + (pic ? 1 : -1), hex('#5a5a68')); }
    else { const u = ciclo - 7.5, x = Math.round(bx + u * 30), y = Math.round(by - u * 20), al = Math.floor(t * 12 + k) % 2; pset(x, y, hex('#a8a8b4')); pset(x - 1, y - al, hex('#8a8a98')); pset(x + 1, y - al, hex('#8a8a98')); } }
  // el estadio: los jugadores diminutos de dos equipos y el balón que va y viene
  { const bx = 288 + Math.round(Math.sin(t * 0.9) * 13), by = 91 + Math.round(Math.sin(t * 1.7) * 6);
    for (let k = 0; k < 10; k++) { const eq = k % 2, hx = 288 + (eq ? 1 : -1) * (4 + (k >> 1) * 3), px = Math.round(hx + (bx - hx) * 0.35 + Math.sin(t * 1.5 + k) * 2), py = Math.round(83 + ((k * 7) % 17) + (by - 91) * 0.4 + Math.cos(t * 1.2 + k) * 1.5);
      pset(px, py, eq ? d_C.rojo : hex('#3a6ad8')); pset(px, py - 1, hex('#3a2418')); }
    pset(bx, by, d_C.blanco); pset(bx + 1, by + 1, d_C.cespedS);
    for (let k = 0; k < 8; k++) if (Math.sin(t * 5 + k * 2.1) > 0.85) pset(288 + Math.round(Math.cos(k * 0.8) * 25), 91 + Math.round(Math.sin(k * 0.8) * 17), d_C.blanco);   // flashes en la grada
  }
  // la carretilla del muelle, que lleva un contenedor pequeño de un lado a otro
  { const u = (Math.sin(t * 0.5) + 1) / 2, fx = Math.round(262 + u * 24), fy = 175; rect(fx - 3 + 1, fy - 2 + 1, fx + 3 + 1, fy + 2 + 1, d_C.sombra); rect(fx - 3, fy - 2, fx + 3, fy + 2, d_C.amarilla); rect(fx - 1, fy - 1, fx + 1, fy + 1, d_C.k); rect(fx + 4, fy - 2, fx + 5, fy - 2, d_C.metalS); rect(fx + 4, fy + 2, fx + 5, fy + 2, d_C.metalS); pset(fx - 1, fy - 1, Math.floor(t * 3) % 2 ? hex('#ff9a3a') : d_C.k); }
  // la gente por las aceras: van y vuelven entre dos esquinas (nunca cruzan la calzada)
  const ROPA = [d_C.rojo, hex('#3a6ad8'), d_C.amarilla, hex('#3aa86a'), d_C.rosa, hex('#a47ad2'), d_C.blanco, hex('#f08a3e')];
  const tramosH = [[2, 66], [92, 178], [204, 224], [258, 318]], tramosV = [[2, 46], [70, 114], [138, 178]];
  let k = 0;
  for (const [a, b] of d_H) for (const yy of [a - 2, b + 4]) for (const [x0, x1] of tramosH) { if (yy < 48 && x0 > 250) continue; const n = (x1 - x0) > 60 ? 2 : 1;
    for (let q = 0; q < n; q++, k++) { const L = x1 - x0, u = ((t * (5 + (k % 3)) / L + h(k, 1, 560)) % 2), x = Math.round(x0 + (u < 1 ? u : 2 - u) * L); d_peaton(R, x, yy - 1, t, k, ROPA[k % ROPA.length]); } }
  for (const [a, b] of d_V) for (const xx of [a - 3, b + 3]) for (const [y0, y1] of tramosV) { const L = y1 - y0, u = ((t * (4 + (k % 3)) / L + h(k, 2, 560)) % 2), y = Math.round(y0 + (u < 1 ? u : 2 - u) * L); d_peaton(R, xx, y, t, k, ROPA[k % ROPA.length]); k++; }
  for (let q = 0; q < 5; q++, k++) { const a = t * 0.12 * (q % 2 ? 1 : -1) + q * 1.25, px = Math.round(134 + Math.cos(a) * 28), py = Math.round(90 + Math.sin(a) * 17); if (p >= 0.85 && Math.hypot(px - 112, py - 99) < 17) continue; d_peaton(R, px, py, t, k, ROPA[k % ROPA.length]); }   // por el camino del estanque (y se apartan de los trompos)
  for (let q = 0; q < 4; q++, k++) { const a = t * 0.2 * (q % 2 ? 1 : -1) + q * 1.6; d_peaton(R, Math.round(34 + Math.cos(a) * 17), Math.round(158 + Math.sin(a) * 14), t, k, ROPA[k % ROPA.length]); }   // por la plaza
  // el tráfico: con la persecución, los coches normales se apartan al bordillo y esperan (desde su sitio de salida), y
  // los del lazo se han ido: la manzana del parque queda para la persecución
  const st = d_trafico(R, p > 0 ? 0 : t);
  for (let i = 0; i < st.coches.length; i++) { const c = st.coches[i], ca = d_CARRILES[c.li], pos = p > 0 ? st.ini[i] : c.pos, lat = p > 0 ? (ca.c < ((ca.eje === 'h' ? d_H : d_V)[ca.via][0] + (ca.eje === 'h' ? d_H : d_V)[ca.via][1]) / 2 ? -2 : 2) : 0;
    if (p > 0 && (ca.eje === 'h' ? pos > 64 && pos < 206 : pos > 42 && pos < 140)) continue;   // los del lazo se han ido por las bocacalles
    const ang = ca.eje === 'h' ? (ca.dir > 0 ? 0 : Math.PI) : (ca.dir > 0 ? Math.PI / 2 : -Math.PI / 2), x = ca.eje === 'h' ? pos : ca.c + lat, y = ca.eje === 'h' ? ca.c + lat : pos;
    d_cocheArriba(R, x, y, ang, c.tipo, c.col, Math.floor(t * 6) % 2 && p > 0 && c.tipo === 'policia' ? 1 : 0); }
  // el aparcamiento: el muñequito que cambia de coche (o.cambio) y el coche amarillo que sale marcha atrás
  { const u = Math.max(0, Math.min(1, o.cambio ?? 0));
    d_cocheArriba(R, 105, 145, -Math.PI / 2, 'coche', hex('#3a6ad8'), 0);
    let bx = 121, by = 145, ba = -Math.PI / 2;
    if (u > 0.78) { const v = (u - 0.78) / 0.22; if (v < 0.4) { by = 145 + v / 0.4 * 13; } else { const w = (v - 0.4) / 0.6; by = 158; ba = -Math.PI / 2 - d_suave(w * 2) * Math.PI / 2; bx = 121 - Math.max(0, w - 0.3) / 0.7 * 22; } }
    d_cocheArriba(R, bx, by, ba, 'coche', hex('#f2c444'), 0);
    if (u > 0.06 && u < 0.78) { const w = (u - 0.06) / 0.72, pts = [[109, 147], [109, 156], [117, 156], [117, 147]], seg = Math.min(2, Math.floor(w * 3)), f = w * 3 - seg, [ax, ay] = pts[seg], [cx2, cy2] = pts[seg + 1], fx = Math.round(ax + (cx2 - ax) * f), fy = Math.round(ay + (cy2 - ay) * f), sal = Math.floor(t * 8) % 2;
      const hy = fy - (Math.floor(t * 8) % 2);   // el saltito al andar
      for (let j = -2; j <= 3; j++) for (let i = -2; i <= 2; i++) d_tinte(R, fx + i + 2, fy + j + 2, d_C.sombra, 0.35);
      rect(fx - 3, hy - 3, fx + 3, hy + 3, d_C.blanco); rect(fx - 2, hy, fx + 2, hy + 2, d_C.rojo); rect(fx + 2, hy, fx + 2, hy + 2, d_C.rojoS); pset(fx - 3 + sal, hy + 3, d_C.k); pset(fx + 2 - sal, hy + 3, d_C.k);
      rect(fx - 1, hy - 2, fx + 1, hy - 1, hex('#f0c8a0')); rect(fx - 1, hy - 3, fx + 1, hy - 3, hex('#3a2418')); pset(fx - 1, hy - 2, hex('#3a2418')); }
    if (u > 0.04 && u < 0.2) pset(109, 143, d_C.blanco);   // la puerta del azul, abierta
    if (u > 0.7 && u < 0.8) pset(117, 143, d_C.blanco); }
  // la persecución por el centro de la calzada, alrededor del parque
  let rojo = null;
  if (p > 0) {
    const s = t * 62;
    // las marcas de los frenazos en las esquinas
    if (p > 0.25) for (const [cx, cy] of d_LAZO) for (let a = 0; a < 1.5; a += 0.08) { pset(Math.round(cx - 3 + Math.cos(a) * 6), Math.round(cy - 3 + Math.sin(a) * 5), d_C.asfR); pset(Math.round(cx + 2 + Math.cos(a) * 5), Math.round(cy - 1 + Math.sin(a) * 6), d_C.asfR); }
    const coche = (sk, tipo, col, k2, loco) => { const [x, y, an] = d_lazo(sk), w = loco * Math.sin(t * 7 + k2 * 2), gira = loco > 0.5 && k2 === 1 ? (d_suave(((t * 0.4 + 0.3) % 1 - 0.55) * 4) * 2 * Math.PI) : 0;
      const lx = -Math.sin(an) * w * 1.6, ly = Math.cos(an) * w * 1.6; d_cocheArriba(R, x + lx, y + ly, an + w * 0.28 + gira, tipo, col, Math.floor(t * 6 + k2) % 2, tipo === 'helados' ? 1.15 : 1.45); return [x + lx, y + ly, an]; };
    // las rayas de velocidad detrás del rojo
    { const [x, y, an] = d_lazo(s); for (let k2 = 0; k2 < 3; k2++) for (let i = 9; i < 17; i++) if ((i + Math.floor(t * 20)) % 3) pset(Math.round(x - Math.cos(an) * i - Math.sin(an) * (k2 - 1) * 2), Math.round(y - Math.sin(an) * i + Math.cos(an) * (k2 - 1) * 2), d_C.blanco); }
    if (p >= 0.6) { coche(s + 180, 'helados', null, 5, 0); if (p >= 0.7) coche(s + 180 - 19, 'policia', null, 3, p); }
    const umbrales = [0, 0.3, 0.55]; for (let k2 = 2; k2 >= 0; k2--) if (p > umbrales[k2]) coche(s - 17 - k2 * 15, 'policia', null, k2, p);
    rojo = coche(s, 'coche', d_C.rojo, 9, 0);
    // el policía que se ha subido al césped y hace trompos (las rodadas y los patos que se van)
    if (p >= 0.85) { const a = t * 3.2, cx = 112, cy = 99; for (let q = 0; q < 50; q++) { const b = q / 50 * 6.28; pset(Math.round(cx + Math.cos(b) * 8), Math.round(cy + Math.sin(b) * 5), d_C.tierraS); }
      for (let q = 0; q < 6; q++) { const b = a - q * 0.5; d_tinte(R, Math.round(cx + Math.cos(b) * 9), Math.round(cy + Math.sin(b) * 6), d_C.cespedL, 0.6); }
      d_cocheArriba(R, cx + Math.cos(a) * 8, cy + Math.sin(a) * 5, a + Math.PI / 2 + 0.6, 'policia', null, Math.floor(t * 6) % 2, 1.3); }
  }
  // los árboles por encima de los coches y de la gente (las copas tapan un poco la calzada)
  d_ARBOLES.forEach(([x, y, r, fl], i) => d_arbolArriba(R, x, y, r, t, i, fl));
  // la grúa de la obra: el brazo que gira despacio con su sombra, la carga colgada y la cabina
  { const cx = 213, cy = 102, a = t * 0.22 + 0.6, L = 30, Lc = 10, ca = Math.cos(a), sa = Math.sin(a);
    for (const [dx, dy, col, al] of [[5, 5, d_C.sombra, 0.4]]) { for (let i = -Lc; i <= L; i++) d_tinte(R, Math.round(cx + ca * i + dx), Math.round(cy + sa * i + dy), col, al); }
    for (let i = -Lc; i <= L; i++) { const x = cx + ca * i, y = cy + sa * i; for (const [d, c] of [[-1.5, d_C.k], [1.5, d_C.k], [-0.5, i % 3 === 0 ? hex('#a87a10') : d_C.amarilla], [0.5, (i % 3 === 1) ? d_C.k : hex('#c89a20')]]) pset(Math.round(x - sa * d), Math.round(y + ca * d), c); }   // el brazo de celosía
    linea(Math.round(cx + ca * 22), Math.round(cy + sa * 22), Math.round(cx + ca * 22), Math.round(cy + sa * 22) + 2, d_C.k);
    const cgx = Math.round(cx - ca * (Lc - 2)), cgy = Math.round(cy - sa * (Lc - 2)); rect(cgx - 2, cgy - 2, cgx + 2, cgy + 2, d_C.metalS); rect(cgx - 1, cgy - 1, cgx + 1, cgy + 1, d_C.metal);
    const lx = Math.round(cx + ca * 22), ly = Math.round(cy + sa * 22) + 2, bal = Math.round(Math.sin(t * 1.5) * 1); rect(lx - 2 + bal + 3, ly - 1 + 3, lx + 2 + bal + 3, ly + 2 + 3, d_mezcla(d_C.suelo, d_C.sombra, 0.4)); rect(lx - 2 + bal, ly - 1, lx + 2 + bal, ly + 2, d_C.maderaS); rect(lx - 2 + bal, ly - 1, lx + 2 + bal, ly - 1, d_C.madera);
    rect(cx - 2, cy - 2, cx + 2, cy + 2, d_C.k); rect(cx - 1, cy - 1, cx + 1, cy + 1, d_C.amarilla); pset(cx, cy, d_C.vidrioL); }
  // el helicóptero de juguete que sigue al rojo (desde 0,4), con su sombra en el suelo y las palas que giran
  if (rojo && p >= 0.4) { const [rx, ry] = rojo, hx = Math.round(rx - 4 + Math.sin(t * 1.1) * 3), hy = Math.round(ry - 24 + Math.cos(t * 1.4) * 2);
    for (let j = -2; j <= 2; j++) for (let i = -4; i <= 4; i++) if ((i / 4.5) ** 2 + (j / 2.5) ** 2 <= 1) d_tinte(R, rx - 2 + i, ry + 4 + j, d_C.sombra, 0.35);
    rect(hx - 3, hy - 2, hx + 3, hy + 2, d_C.k); rect(hx - 2, hy - 1, hx + 2, hy + 1, hex('#3a6ad8')); pset(hx + 2, hy, d_C.vidrioL); pset(hx + 1, hy - 1, d_C.vidrioL); rect(hx - 8, hy, hx - 3, hy, d_C.k); pset(hx - 8, hy - 1, d_C.k);
    const ar = t * 25; for (let i = -7; i <= 7; i++) { pset(Math.round(hx + Math.cos(ar) * i), Math.round(hy + Math.sin(ar) * i * 0.6), d_C.k); }
    pset(hx - 8 + (Math.floor(t * 20) % 2), hy - 2, d_C.k); if (Math.floor(t * 4) % 2) pset(hx, hy + 2, d_C.policiaR); }
  // las gaviotas que planean (con su sombra) y las sombras de dos nubes que cruzan despacio
  for (let q = 0; q < 3; q++) { const u = (t * (9 + q * 3) + q * 120) % 400 - 40, gx = Math.round(u), gy = Math.round(60 + q * 40 + Math.sin(t * 0.7 + q) * 8), al = Math.floor(t * 4 + q) % 3 === 0 ? 1 : 0;
    if (gx < -5 || gx > 325 || d_atom(gx, gy)) continue; d_tinte(R, gx + 8, gy + 10, d_C.sombra, 0.35); d_tinte(R, gx + 7, gy + 10, d_C.sombra, 0.35); d_tinte(R, gx + 9, gy + 10, d_C.sombra, 0.35);
    pset(gx, gy, d_C.blanco); pset(gx - 1, gy - al, d_C.blanco); pset(gx + 1, gy - al, d_C.blanco); pset(gx - 2, gy - al - (1 - al), hex('#c8ccd4')); pset(gx + 2, gy - al - (1 - al), hex('#c8ccd4')); }
  for (let q = 0; q < 2; q++) { const cx = ((t * (5 + q * 2) + q * 190) % 460) - 70, cy = 40 + q * 85, rx = 46 - q * 8, ry = 22;
    for (let y = Math.max(0, cy - ry); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.round(cx - rx)); x <= Math.min(319, Math.round(cx + rx)); x++) { if (d_atom(x, y)) continue; const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + 0.25 * Math.sin(x * 0.15 + q) * Math.cos(y * 0.2); if (e < 1 && d_umbral(x, y) < (e < 0.7 ? 0.9 : (1 - e) * 3)) B[y * 320 + x] = d_mezcla(B[y * 320 + x], d_C.sombra, 0.16); } }
  return { suelo: null, lazo: d_LAZO, rojo: rojo ? [Math.round(rojo[0]), Math.round(rojo[1])] : null, plaza: [4, 140, 64, 178], fuente: [34, 157], estanque: [134, 90], aparcamiento: [90, 136, 150, 179], estadio: [288, 91], grua: [213, 102], rio: d_RIO };
}

// ════ 'arriba', cámara 'boton': la mesa de pruebas de DMA (1996) ════
// la base fija: el techo de placas con el fluorescente, la pared beis con su gotelé y el zócalo, el marco de la ventana y
// su persiana, la pizarra con la ciudad dibujada a rotulador, el póster sin letras, el corcho, la estantería, la mesa del
// fondo con su ordenador y la moqueta de losetas
function d_baseBoton(R) {
  const { rect, pset, disco, linea } = R, B = R.buf, pared = hex('#ddd3bc'), paredS = hex('#c8bea6'), paredL = hex('#e8e0cc');
  // el techo de placas con sus perforaciones y la junta
  for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 600); B[y * 320 + x] = (x % 40 === 0 || y === 11) ? hex('#b8b4ac') : q < 0.08 ? hex('#c4c0b8') : hex('#d8d6d0'); }
  rect(0, 12, 319, 12, hex('#9a968e'));
  // la pared: gotelé con la luz del fluorescente arriba en el centro y más sombra en las esquinas
  for (let y = 13; y < 124; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 601), d = Math.abs(x - 210) / 200 + (y - 13) / 300, c = d_umbral(x, y) < d - 0.25 ? paredS : pared; B[y * 320 + x] = q < 0.07 ? paredS : q > 0.95 ? paredL : c; }
  rect(0, 116, 319, 123, hex('#8a7a62')); rect(0, 116, 319, 116, hex('#a8987c')); rect(0, 123, 319, 123, hex('#5e5040')); for (const ex of [150, 278]) { rect(ex, 118, ex + 5, 121, hex('#f0ece0')); pset(ex + 1, 119, d_C.k); pset(ex + 4, 119, d_C.k); }
  // la moqueta de losetas gris azulada (el pelo cambia de dirección en cada loseta), con manchas y la luz de la ventana
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const tx = x >> 4, ty = (y - 124) >> 3, al = (tx + ty) % 2, q = h(x, y, 602);
    let c = al ? hex('#6a7488') : hex('#626c80'); if ((al ? (x + y) : (x - y)) % 4 === 0) c = hex('#5a6276'); if (q < 0.05) c = hex('#7a849a'); if (x % 16 === 0 || (y - 124) % 8 === 0) c = hex('#565e70'); B[y * 320 + x] = c; }
  for (const [mx, my, r] of [[40, 170, 4], [300, 160, 3]]) for (let j = -r; j <= r; j++) for (let i = -r - 2; i <= r + 2; i++) if ((i / (r + 2)) ** 2 + (j / r) ** 2 < 1 && h(i, j, 603) < 0.7) d_tinte(R, mx + i, my + j, hex('#4a3a2a'), 0.25);
  for (let y = 124; y < 160; y++) { const x0 = 10 + (y - 124) * 0.9, x1 = 78 + (y - 124) * 1.3; for (let x = Math.round(x0); x < x1; x++) if (d_umbral(x, y) < 0.35) d_tinte(R, x, y, hex('#c8d4e4'), 0.18); }
  // la ventana: el marco de aluminio con su alféizar (el exterior con lluvia va en cada fotograma)
  rect(10, 24, 78, 92, hex('#8a8e96')); rect(11, 25, 77, 91, hex('#b8bcc4')); rect(13, 27, 75, 89, d_C.k); rect(43, 27, 45, 89, hex('#a8acb4')); rect(44, 27, 44, 89, hex('#d0d4dc'));
  rect(7, 92, 81, 95, hex('#c8c0b0')); rect(7, 92, 81, 92, hex('#e8e0d0')); rect(7, 95, 81, 96, hex('#8a8272'));
  for (let x = 16; x < 74; x += 7) { pset(x, 98, hex('#a8a090')); }   // el radiador bajo la ventana
  rect(14, 98, 74, 103, hex('#a8a090')); for (let x = 15; x < 74; x += 3) rect(x, 98, x + 1, 103, hex('#e8e4d8')); rect(14, 103, 74, 103, hex('#7a7466'));
  // la pizarra con la ciudad dibujada vista desde arriba (bloques en azul, calles dobles en negro, el lazo de puntos en
  // rojo y los cochecitos), los imanes con una hoja y la bandeja con los rotuladores
  rect(90, 18, 198, 82, hex('#8a8e96')); rect(91, 19, 197, 81, hex('#c8ccd4')); rect(93, 21, 195, 79, hex('#f8f8f4'));
  for (let k = 0; k < 60; k++) { const x = 94 + Math.round(h(k, 1, 604) * 100), y = 22 + Math.round(h(k, 2, 604) * 56); pset(x, y, hex('#e4e6ea')); pset(x + 1, y, hex('#eceef0')); }
  const azul = hex('#3a5ac8'), negro = hex('#2a2a36'), rojo = hex('#d83a3a'), verde = hex('#3a9a5a');
  for (const yy of [40, 62]) { linea(96, yy, 192, yy + 1, negro); linea(96, yy + 5, 192, yy + 6, negro); }
  for (const xx of [118, 162]) { linea(xx, 23, xx + 1, 77, negro); linea(xx + 6, 23, xx + 7, 77, negro); }
  for (const [x0, y0, x1, y1] of [[97, 24, 115, 37], [126, 24, 158, 37], [170, 24, 192, 37], [97, 48, 115, 59], [170, 48, 192, 59], [97, 70, 115, 77], [126, 70, 158, 77], [170, 70, 192, 77]]) { linea(x0, y0, x1, y0, azul); linea(x1, y0, x1, y1, azul); linea(x1, y1, x0, y1, azul); linea(x0, y1, x0, y0, azul); linea(x0 + 2, y0 + 2, x0 + 6, y0 + 6, azul); }
  for (let a = 0; a < 6.3; a += 0.1) pset(Math.round(142 + Math.cos(a) * 9), Math.round(53 + Math.sin(a) * 3), verde); for (let k = 0; k < 6; k++) disco(130 + k * 5, 50 + (k % 2) * 6, 1, verde);
  for (let i = 0; i < 160; i += 3) { const [x, y] = d_lazo(i * 2.25); pset(Math.round(121 + (x - 79) * 0.385), Math.round(43 + (y - 57) * 0.33), rojo); }
  for (const [cx, cy, c] of [[150, 43, rojo], [140, 43, negro], [133, 43, negro]]) { rect(cx - 2, cy - 1, cx + 2, cy + 1, c); }
  rect(176, 64, 190, 76, d_C.blanco); rect(176, 64, 190, 64, hex('#d0d0cc')); for (let y = 67; y < 75; y += 2) rect(178, y, 178 + 6 + ((y * 3) % 5), y, hex('#9aa0aa')); disco(183, 64, 1, d_C.rojo);
  for (const [mx, my, c] of [[100, 24, hex('#3a8ae0')], [190, 24, d_C.amarilla]]) { disco(mx, my, 1, c); pset(mx - 1, my - 1, d_C.blanco); }
  rect(100, 82, 188, 84, hex('#a8acb4')); rect(100, 82, 188, 82, hex('#d0d4dc'));
  for (const [x, c] of [[110, d_C.rojo], [118, hex('#3a5ac8')], [126, d_C.k]]) { rect(x, 80, x + 6, 81, c); rect(x + 5, 80, x + 6, 81, d_C.blanco); }
  rect(160, 79, 170, 81, hex('#3a3a46')); rect(160, 79, 170, 79, hex('#d8d8d0'));
  // el póster de cine sin letras: la ciudad de noche, un coche con los faros, un marco rojo
  rect(206, 20, 246, 76, d_C.k); rect(207, 21, 245, 75, hex('#c83a3a')); for (let y = 23; y < 74; y++) for (let x = 209; x < 244; x++) B[y * 320 + x] = y < 48 ? (d_umbral(x, y) < (y - 23) / 25 ? hex('#5a2a6a') : hex('#1e1a4a')) : y < 60 ? hex('#3a2a5a') : hex('#1a1424');
  for (const [x0, w, hh] of [[210, 6, 18], [217, 5, 26], [223, 7, 14], [231, 5, 22], [237, 6, 16]]) { rect(x0, 60 - hh, x0 + w, 60, hex('#14102a')); for (let y = 62 - hh; y < 58; y += 3) for (let x = x0 + 1; x < x0 + w; x += 2) if (h(x, y, 605) < 0.5) pset(x, y, hex('#f8d070')); }
  disco(236, 30, 3, hex('#f8e8b0')); rect(214, 64, 238, 66, hex('#2a2238')); rect(219, 62, 232, 63, d_C.rojo); rect(216, 64, 236, 66, d_C.rojo); disco(219, 67, 1, d_C.k); disco(233, 67, 1, d_C.k); pset(237, 65, hex('#fff6b0'));
  for (let i = 0; i < 9; i++) pset(238 + i, 65 + (i >> 2), hex('#f8e8b0'));
  rect(210, 69, 242, 70, hex('#f0d050')); rect(214, 72, 238, 72, hex('#c8a040'));
  // el corcho con hojas clavadas y una foto del equipo (siluetas), y la estantería con cajas de disquetes y un bichito
  rect(250, 52, 278, 92, hex('#7a5a3a')); rect(251, 53, 277, 91, hex('#c89a62')); for (let k = 0; k < 40; k++) pset(252 + Math.round(h(k, 1, 606) * 24), 54 + Math.round(h(k, 2, 606) * 36), hex('#a87a48'));
  for (const [x0, y0, c] of [[253, 56, d_C.blanco], [265, 58, hex('#fff6b0')], [254, 74, hex('#d8ecf8')], [266, 76, d_C.blanco]]) { rect(x0, y0, x0 + 9, y0 + 12, c); for (let y = y0 + 3; y < y0 + 11; y += 2) rect(x0 + 1, y, x0 + 3 + ((y * 7) % 5), y, hex('#8a909a')); disco(x0 + 4, y0 + 1, 1, d_C.rojo); }
  rect(282, 96, 318, 97, hex('#7a5a3a')); rect(282, 98, 318, 98, hex('#5a4028'));
  for (const [x0, c] of [[284, d_C.rojo], [290, hex('#3a6ad8')], [296, hex('#3aa86a')]]) { rect(x0, 88, x0 + 5, 95, c); rect(x0, 88, x0 + 5, 88, d_mezcla(c, d_C.blanco, 0.4)); rect(x0 + 1, 90, x0 + 4, 91, d_C.blanco); }
  // el reloj de pared
  { const cx = 296, cy = 66; disco(cx, cy, 8, d_C.k); disco(cx, cy, 7, hex('#f8f4ea')); for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * 0.5236) * 6), Math.round(cy + Math.sin(k * 0.5236) * 6), d_C.k); }
  // el fluorescente del techo (el tubo, que parpadea, va en cada fotograma)
  rect(186, 2, 246, 8, hex('#a8a8a4')); rect(187, 3, 245, 7, hex('#e8eef0'));
  d_techoBoton(R);
  // la papelera con papeles arrugados
  rect(84, 110, 94, 124, d_C.k); rect(85, 111, 93, 124, hex('#5a6a7a')); for (let y = 113; y < 124; y += 3) rect(85, y, 93, y, hex('#4a5a6a'));
  for (const [px, py] of [[86, 109], [90, 108], [92, 110]]) { disco(px, py, 2, d_C.blanco); pset(px, py, hex('#c8c8c4')); }
  disco(100, 127, 2, d_C.blanco); pset(100, 127, hex('#c8c8c4')); disco(108, 131, 1, d_C.blanco);
  // el ficus en su maceta, junto al corcho
  { const px = 244; rect(px - 6, 112, px + 6, 124, d_C.k); rect(px - 5, 113, px + 5, 124, hex('#b86a3a')); rect(px - 5, 113, px + 5, 114, hex('#d88a5a')); rect(px, 92, px, 112, hex('#6a4a2a'));
    for (let k = 0; k < 26; k++) { const a = h(k, 1, 607) * 6.28, r = 3 + h(k, 2, 607) * 9, lx = Math.round(px + Math.cos(a) * r), ly = Math.round(96 + Math.sin(a) * r * 0.8); disco(lx, ly, 2, k % 3 ? hex('#3a8a4a') : hex('#2a6a38')); pset(lx - 1, ly - 1, hex('#6ab85a')); } }
}
// la ventana con lluvia: el cielo encapotado con nubes que pasan, las naves del polígono, la farola, el charco que
// refleja, la furgoneta, alguien con paraguas que cruza y la lluvia; las gotas que bajan por el cristal (todo recortado)
function d_ventanaLluvia(R, t, x0, y0, x1, y1) {
  const { pset, linea, disco, poligono } = R, B = R.buf;
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / (y1 - y0); B[y * 320 + x] = d_umbral(x, y) < u * 1.6 - 0.2 ? hex('#a8b0bc') : hex('#8a92a0'); }
  for (let k = 0; k < 4; k++) { const cx = x0 + ((h(k, 1, 610) * 120 + t * (1.5 + k)) % 110) - 20, cy = y0 + 4 + k * 5, w = 18 + k * 4;
    for (let j = -4; j <= 4; j++) for (let i = -w / 2; i <= w / 2; i++) { const e = (i / (w / 2)) ** 2 + (j / 4) ** 2; if (e < 1) pset(Math.round(cx + i), cy + j, j > 1 ? hex('#6a7280') : j < -1 ? hex('#9aa2ae') : hex('#7a8290')); } }
  // las naves del polígono con su tejado de chapa ondulada y la chimenea con vapor
  const yb = y0 + 40;
  for (const [a, b, top, c] of [[x0 - 2, x0 + 30, yb - 16, hex('#7a8a9a')], [x0 + 32, x1 + 2, yb - 12, hex('#8a7a6a')]]) {
    for (let y = top; y <= yb; y++) for (let x = a; x <= b; x++) pset(x, y, y < top + 4 ? ((x % 3 === 0) ? d_mezcla(c, d_C.k, 0.3) : d_mezcla(c, d_C.blanco, 0.15)) : (x % 4 === 0 ? d_mezcla(c, d_C.k, 0.15) : c));
    for (let x = a + 4; x < b - 4; x += 9) { for (let y = top + 7; y < yb - 2; y++) pset(x, y, hex('#3a4250')); pset(x + 1, top + 7, hex('#5a6270')); } }
  for (let y = yb - 26; y < yb - 12; y++) { pset(x0 + 22, y, hex('#5a5a62')); pset(x0 + 23, y, hex('#6a6a72')); }
  for (let k = 0; k < 4; k++) { const u = ((t * 0.3 + k / 4) % 1); disco(Math.round(x0 + 23 + u * 8), Math.round(yb - 27 - u * 12), 1 + Math.round(u * 2), u > 0.6 ? hex('#9aa2ae') : hex('#c8ccd4')); }
  // el suelo mojado con charcos que reflejan, la farola encendida y la furgoneta
  for (let y = yb + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) { const ch = Math.abs(x - x0 - 40) < 14 - (y - yb) * 0.4 && y > yb + 6; pset(x, y, ch ? ((x + y + Math.floor(t * 4)) % 5 ? hex('#8a96a8') : hex('#b8c4d4')) : (h(x, y, 611) < 0.1 ? hex('#5a5e66') : hex('#4a4e56'))); }
  for (let y = yb - 22; y <= yb + 6; y++) pset(x0 + 50, y, hex('#3a3e48')); linea(x0 + 50, yb - 22, x0 + 55, yb - 23, hex('#3a3e48')); disco(x0 + 55, yb - 21, 1, hex('#fff0b0'));
  for (let j = 0; j < 12; j++) for (let i = -j * 0.4; i <= j * 0.4; i++) if (d_umbral(Math.round(x0 + 55 + i), yb - 20 + j) < 0.3) pset(Math.round(x0 + 55 + i), yb - 20 + j, hex('#c8c4a8'));
  { const vx = x0 + 6, vy = yb + 8; for (let y = vy - 7; y <= vy; y++) for (let x = vx; x <= vx + 18; x++) pset(x, y, y === vy - 7 ? hex('#e8e8e8') : x > vx + 13 && y < vy - 3 ? hex('#5a7a9a') : hex('#d0d0d4')); disco(vx + 4, vy + 1, 2, d_C.k); disco(vx + 14, vy + 1, 2, d_C.k); pset(vx + 18, vy - 2, hex('#ffb040')); }
  // alguien con paraguas que cruza
  { const u = (t * 0.07) % 1.3, px = Math.round(x0 - 6 + u * 76), py = yb + 10; pset(px, py, hex('#2a2a36')); pset(px, py - 1, hex('#2a2a36')); pset(px, py - 2, hex('#3a4a6a')); pset(px, py - 3, hex('#3a4a6a')); pset(px, py - 4, hex('#e0b090'));
    for (let i = -3; i <= 3; i++) pset(px + i, py - 6 + (Math.abs(i) > 2 ? 1 : 0), hex('#c83a3a')); pset(px, py - 7, hex('#c83a3a')); }
  // la lluvia que cae en diagonal y las gotas que bajan por el cristal
  for (let k = 0; k < 40; k++) { const x = x0 + ((k * 37 + Math.floor(t * 40) * 3) % (x1 - x0 + 10)) - 5, y = y0 + ((k * 23 + Math.floor(t * 90)) % (y1 - y0 + 6)); linea(x, y, x - 1, y + 3, hex('#c8d4e4')); }
  for (let k = 0; k < 7; k++) { const x = x0 + 3 + ((k * 13) % (x1 - x0 - 6)), u = ((t * (0.08 + (k % 3) * 0.04) + h(k, 1, 612)) % 1), y = Math.round(y0 + u * (y1 - y0)); pset(x, y, hex('#e8f0f8')); pset(x, y + 1, hex('#a8c0d8')); for (let j = 2; j < 6; j++) if (y - j > y0) pset(x, y - j, hex('#9aa8ba')); }
  R.recorte(null);
  // la persiana veneciana medio bajada, con sus lamas y el cordón
  for (let y = y0; y < y0 + 14; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = (y - y0) % 3 === 2 ? hex('#a8a49a') : (y - y0) % 3 === 0 ? hex('#f0ece2') : hex('#dcd8cc');
  R.rect(x1 - 4, y0 + 14, x1 - 4, y0 + 30 + Math.round(Math.sin(t * 0.8) * 1), hex('#8a8478')); R.rect(x1 - 5, y0 + 31 + Math.round(Math.sin(t * 0.8) * 1), x1 - 3, y0 + 33 + Math.round(Math.sin(t * 0.8) * 1), hex('#c8c0b0'));
}

function d_boton(R, t, o) {
  const { rect, pset, disco, linea } = R;
  d_fijo(R, 'boton', () => d_baseBoton(R));
  d_ventanaLluvia(R, t, 13, 27, 42, 89); d_ventanaLluvia(R, t + 3.1, 46, 27, 75, 89);
  // el fluorescente, que parpadea de vez en cuando
  { const parp = (t % 11) > 10.3 && Math.floor(t * 18) % 2; rect(188, 4, 244, 6, parp ? hex('#c8ccd0') : hex('#fbfdff')); rect(188, 5, 244, 5, parp ? hex('#b8bcc4') : hex('#f0f8ff')); }
  d_techoBotonVivo(R, t);
  // las agujas del reloj
  { const cx = 296, cy = 66, a = t * 0.1 - 1.2, b = t * 1.2; linea(cx, cy, Math.round(cx + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 4), d_C.k); linea(cx, cy, Math.round(cx + Math.cos(b) * 6), Math.round(cy + Math.sin(b) * 6), hex('#5a5a66')); pset(cx, cy, d_C.rojo); }
  // la mesa del fondo, a la derecha: el ordenador con los bichitos en pantalla, el ventilador que gira, la torre beis
  // con su luz, la lámpara y las cajas de pizza en el suelo
  { rect(258, 100, 319, 102, hex('#a88a62')); rect(258, 100, 319, 100, hex('#c8aa80')); rect(258, 103, 319, 104, hex('#7a6040')); rect(260, 104, 262, 134, hex('#5a5a62')); rect(316, 104, 318, 134, hex('#5a5a62')); rect(262, 104, 316, 112, hex('#8a6a48')); rect(262, 112, 316, 112, hex('#6a4e30'));
    PIEZAS_GT.monitorTubo?.(R, 282, 100, { pantalla: 'bichitos', t });
    { const fx = 308, fy = 90; rect(fx, fy + 4, fx + 1, 99, hex('#5a5a62')); rect(fx - 3, 98, fx + 4, 99, hex('#5a5a62')); disco(fx, fy, 5, hex('#3a3a46')); const a = t * 14; for (let k = 0; k < 3; k++) linea(fx, fy, Math.round(fx + Math.cos(a + k * 2.09) * 4), Math.round(fy + Math.sin(a + k * 2.09) * 4), hex('#c8ccd4')); disco(fx, fy, 1, hex('#8a8e96')); }
    rect(264, 114, 276, 134, d_C.k); rect(265, 115, 275, 134, hex('#d8ccb0')); rect(266, 117, 274, 118, hex('#a89c80')); rect(266, 120, 274, 121, hex('#a89c80')); pset(273, 131, Math.floor(t * 3) % 3 ? hex('#3aff6a') : hex('#1a6a2a'));
    { const sx = 296; rect(sx - 7, 116, sx + 5, 119, hex('#2a2a36')); rect(sx + 3, 104, sx + 6, 119, hex('#2a2a36')); rect(sx + 4, 105, sx + 5, 117, hex('#3a3a4a')); rect(sx - 1, 119, sx, 129, hex('#4a4e58')); rect(sx - 7, 130, sx + 6, 131, hex('#3a3e48')); for (const wx of [sx - 7, sx + 6]) pset(wx, 132, d_C.k); }
    for (let k = 0; k < 4; k++) { const by = 133 - k * 3; rect(280 + k, by, 302 + k, by + 2, k === 3 ? hex('#f4ecd8') : hex('#e8d8b4')); rect(280 + k, by + 2, 302 + k, by + 2, hex('#b8a47e')); } rect(292, 122, 296, 123, d_C.rojo); }
  return { suelo: 162, detras: 140, mesa: [128, 132, 252, 160], boton: [228, 132], monitor: [176, 132], telefono: [144, 132], ventana: [13, 27, 75, 89], pizarra: [93, 21, 195, 79], libre: [[62, 120], [256, 306]], detrasLibre: [196, 214], pulsa: [228, 112] };
}
// la mesa de pruebas, por delante de los personajes: el tablero de formica con su canto, el faldón con la cajonera, las
// patas de metal y su sombra; encima, el teléfono, el monitor de tubo con la ciudad (o.t), el teclado y el ratón, el
// botón rojo gigante (o.pulsado 0–1) y la taza que humea; los cables que cuelgan; y en primer término, a
// la izquierda, una caja de cartón con disquetes y un rollo de cable
function d_botonDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, mx0 = 128, mx1 = 252, top = 132;
  for (let x = mx0 - 2; x <= mx1 + 6; x++) for (let y = 158; y <= 163; y++) if (d_umbral(x, y) < 0.6) d_tinte(R, x, y, d_C.k, 0.3);
  rect(mx0 + 2, top + 5, mx0 + 4, 161, hex('#4a4e58')); rect(mx1 - 4, top + 5, mx1 - 2, 161, hex('#4a4e58')); rect(mx0 + 2, top + 5, mx0 + 2, 161, hex('#7a7e88')); rect(mx1 - 4, top + 5, mx1 - 4, 161, hex('#7a7e88'));
  rect(mx0 + 6, top + 5, mx1 - 6, 150, hex('#a89a80')); for (let y = top + 7; y < 150; y += 4) rect(mx0 + 6, y, mx1 - 6, y, hex('#9a8c72')); rect(mx0 + 6, 150, mx1 - 6, 150, hex('#7a6c56'));
  rect(mx0 + 8, top + 6, mx0 + 34, 158, d_C.k); rect(mx0 + 9, top + 7, mx0 + 33, 157, hex('#c8bca0')); for (const y of [top + 14, top + 22]) { rect(mx0 + 9, y, mx0 + 33, y, hex('#8a7e64')); rect(mx0 + 18, y - 4, mx0 + 24, y - 3, hex('#5a5a62')); } rect(mx0 + 18, 152, mx0 + 24, 153, hex('#5a5a62'));
  // los cables que bajan por detrás del faldón hasta la regleta
  linea(200, top + 5, 206, 160, d_C.k); linea(203, top + 5, 212, 161, hex('#3a3a46')); rect(204, 160, 222, 163, hex('#e8e4d8')); rect(204, 163, 222, 163, hex('#a8a498')); pset(208, 161, d_C.rojo); pset(214, 161, d_C.k); pset(218, 161, d_C.k);
  // el tablero
  rect(mx0, top, mx1, top + 2, hex('#e4dccc')); for (let x = mx0; x <= mx1; x++) if (h(x, 1, 620) < 0.12) pset(x, top + 1, hex('#d4ccb8')); rect(mx0, top, mx1, top, hex('#f4ecdc')); rect(mx0, top + 3, mx1, top + 4, hex('#8a7a62')); rect(mx0, top + 3, mx1, top + 3, hex('#a8987c'));
  // lo de encima: el teléfono, el monitor con la ciudad, el teclado, el ratón, el botón y la taza con su vapor
  PIEZAS_GT.telefonoNoventa?.(R, 144, top + 1, { t, suena: !!o.suena });
  PIEZAS_GT.monitorTubo?.(R, 178, top - 1, { pantalla: o.pantalla ?? 'ciudad', t, s: 1 });
  rect(164, top - 1, 192, top + 1, d_C.k); rect(165, top - 1, 191, top, hex('#d8ccb0')); for (let x = 166; x < 191; x += 2) pset(x, top - 1, hex('#a89c80'));
  linea(194, top, 197, top - 2, d_C.k); rect(197, top - 2, 200, top, hex('#d8ccb0')); pset(198, top - 2, hex('#f0e8d8'));
  rect(242, top - 6, 247, top, d_C.k); rect(243, top - 5, 246, top, hex('#3a7ad8')); rect(243, top - 5, 243, top, hex('#6a9ae8')); rect(248, top - 4, 249, top - 2, d_C.k);
  for (let k = 0; k < 3; k++) { const u = ((t * 0.5 + k / 3) % 1), sx = Math.round(244 + Math.sin(t * 2 + k * 2) * 1.5 + u * 2), sy = Math.round(top - 8 - u * 10); if (u < 0.85) pset(sx, sy, u > 0.5 ? hex('#c8c8c8') : d_C.blanco); }
  PIEZAS_GT.botonRojo?.(R, 228, top + 1, { pulsado: o.pulsado ?? 0 });
  if ((o.pulsado ?? 0) > 0.5) for (let k = 0; k < 6; k++) { const a = k / 6 * 6.28 + 0.3, r1 = 13, r2 = 17; linea(Math.round(228 + Math.cos(a) * r1), Math.round(top - 14 + Math.sin(a) * r1 * 0.7), Math.round(228 + Math.cos(a) * r2), Math.round(top - 14 + Math.sin(a) * r2 * 0.7), d_C.amarilla); }
  // en primer término, a la izquierda: la caja de cartón abierta llena de disquetes de colores y un rollo de cable
  { const x0 = 2, x1 = 40, y0 = 158; rect(x0, y0, x1, 179, d_C.k); rect(x0 + 1, y0 + 1, x1 - 1, 179, hex('#c8a06a')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 2, hex('#e0bc84')); rect(x1 - 6, y0 + 1, x1 - 1, 179, hex('#a8804e')); rect(x0 + 14, y0 + 6, x0 + 22, 179, hex('#d8c8a0'));
    R.poligono([[x0, y0], [x0 - 2, y0 - 6], [x0 + 12, y0 - 7], [x0 + 14, y0]], hex('#b8905a')); R.poligono([[x1, y0], [x1 + 3, y0 - 5], [x1 - 10, y0 - 7], [x1 - 12, y0]], hex('#a8804e'));
    for (let k = 0; k < 7; k++) { const dx = x0 + 4 + k * 5, dy = y0 - 4 - (k % 3) * 2, c = [hex('#3a3a46'), hex('#3a6ad8'), hex('#e4483e'), hex('#3a3a46'), hex('#f2c444'), hex('#3aa86a'), hex('#3a3a46')][k]; rect(dx, dy, dx + 5, dy + 5, d_C.k); rect(dx, dy, dx + 4, dy + 4, c); rect(dx + 1, dy, dx + 3, dy + 1, d_C.metal); rect(dx + 1, dy + 3, dx + 3, dy + 4, d_C.blanco); }
    for (let a = 0; a < 12.6; a += 0.15) { const r = 4 + a * 0.3; pset(Math.round(56 + Math.cos(a) * r), Math.round(174 + Math.sin(a) * r * 0.35), hex('#2a2a36')); } }
  return { mesa: [mx0, top, mx1, 160], boton: [228, top] };
}

// ════ 'tresde': la ciudad de juguete en 3D a pie de calle (2001) ════
// la proyección: el punto de fuga en (160, 86), la cámara a 6 unidades del suelo y f = 160 (x = 160 + X·f/Z,
// y = 86 + (6 − Y)·f/Z); la avenida va de X −8 a 8, las aceras hasta ±11 y los edificios desde ±11 hacia fuera; la calle
// de delante (que cruza) va de Z 15 a 28, y la acera de los personajes, de Z 10 a 15 (y 150–180)
const d_PF = [160, 86], d_F = 160, d_HC = 6;

const d_px = (X, Z) => d_PF[0] + X * d_F / Z, d_py = (Y, Z) => d_PF[1] + (d_HC - Y) * d_F / Z;

// los tres estilos: el cielo (de arriba abajo), las nubes, la bruma del fondo, el suelo y los edificios de cada lado:
// [lado, z0, z1, alto, fachada, tipo]
const d_EST = {
  nueva: { cielo: ['#6e7a92', '#7e8aa2', '#929cb2', '#a8b0c2', '#bec4d2', '#d2d6de'], nubes: ['#6a7488', '#8a94a8', '#b4bccb'], bruma: '#b8bfcc',
    asf: '#4c5058', asfL: '#5e626c', acera: '#a6a4a0', aceraS: '#86847e', solar: '#7a7c82', linea: '#e8e2cc', luz: 0,
    edif: [[1, 28, 60, 12, '#a8543a', 'ladrillo'], [1, 64, 96, 28, '#8a8c96', 'gris'], [1, 100, 140, 20, '#c8b48e', 'crema'], [1, 144, 200, 36, '#7a5a4a', 'ladrillo'], [1, 204, 290, 26, '#9aa0aa', 'gris'],
      [-1, 28, 56, 17, '#8a6a54', 'piedra'], [-1, 60, 92, 30, '#b85a40', 'ladrillo'], [-1, 96, 130, 22, '#a8aab2', 'gris'], [-1, 134, 190, 42, '#c8b48e', 'crema'], [-1, 194, 290, 30, '#7a4a3a', 'ladrillo']] },
  ochenta: { cielo: ['#3aa0e8', '#5ab4ee', '#7ac4f0', '#a8d0ea', '#ccc8d0', '#f0c0b8', '#ffd8a8'], nubes: ['#f0a8b0', '#ffd0d4', '#ffffff'], bruma: '#ffd0b8',
    asf: '#5a5a66', asfL: '#6e6e7c', acera: '#f0e2c8', aceraS: '#d8c4a0', solar: '#e8d4b0', linea: '#fff4d8', luz: 1,
    edif: [[1, 28, 58, 11, '#f4a0b8', 'deco'], [1, 62, 92, 15, '#90e0c8', 'deco'], [1, 96, 128, 10, '#f8c090', 'deco'], [1, 132, 180, 18, '#b8a0e0', 'deco'], [1, 184, 260, 12, '#f4f0e8', 'deco'],
      [-1, 28, 54, 13, '#9ad8f0', 'deco'], [-1, 58, 90, 9, '#f8e0a0', 'deco'], [-1, 94, 126, 16, '#f4a0b8', 'deco'], [-1, 130, 176, 11, '#90e0c8', 'deco'], [-1, 180, 260, 15, '#f8c090', 'deco']] },
  tres: { cielo: ['#2c2a64', '#4a3a82', '#8a4a82', '#ac5a76', '#cc6a6a', '#f09a62', '#fcd090'], nubes: ['#7a4476', '#de8478', '#ffd4a4'], bruma: '#f4b888',
    asf: '#5a565e', asfL: '#6e6870', acera: '#d8c4a8', aceraS: '#b8a080', solar: '#c8b090', linea: '#fff0d0', luz: 1,
    edif: [[1, 28, 52, 8, '#e8b088', 'estuco'], [1, 56, 80, 5, '#c8d8a8', 'estuco'], [1, 84, 110, 7, '#f0d0a0', 'estuco'],
      [-1, 28, 50, 9, '#a8c8d8', 'estuco'], [-1, 54, 78, 6, '#f0a890', 'estuco'], [-1, 82, 106, 7, '#e8d8b0', 'estuco']] },
};
// el color de un punto de una fachada de juguete (u: a lo largo de la pared, Y: altura, en unidades del mundo): plantas
// con ventanas (algunas encendidas), el bajo con escaparate y toldo, la cornisa; ladrillo con su grano, piedra con
// sillares, deco con franjas y ventanas corridas, estuco con persianas
function d_fachada(col, tipo, u, Y, Yh, k, x, y, noche) {
  const piso = 2.3, fy = Y / piso, fl = Math.floor(fy), fr = fy - fl, fu = u / 2.6, cu = Math.floor(fu), ru = fu - cu;
  if (Y > Yh - 0.45) return d_mezcla(col, d_C.blanco, 0.35);   // la cornisa
  if (Y > Yh - 0.7) return d_mezcla(col, d_C.k, 0.3);
  if (Y < 2.1) {   // el bajo: el escaparate con su luz, la puerta y el toldo de rayas
    if (Y > 1.75) return (Math.floor(u * 2.2) % 2) ? [hex('#e4483e'), hex('#3a7ad8'), hex('#3aa86a'), hex('#f2c444')][k % 4] : d_C.blanco;
    if (Y < 0.25) return d_mezcla(col, d_C.k, 0.45);
    const pu = (u * 0.5 + k) % 3; if (pu < 0.35) return hex('#4a3020');
    if (Y > 0.4 && Y < 1.6 && (u % 3.2) > 0.5) { const b = ((u * 1.3 + Y) % 2) < 0.25; return b ? hex('#f4fcff') : (noche ? hex('#ffe8a0') : hex('#9ad0ec')); }
    return d_mezcla(col, d_C.k, 0.15);
  }
  if (tipo === 'deco') { if (fr < 0.14) return d_mezcla(col, d_C.blanco, 0.45); if (fr > 0.4 && fr < 0.78) return ru > 0.1 ? ((h(cu, fl, k) < 0.15) ? hex('#fff0b0') : (ru < 0.3 ? hex('#c8f4ff') : hex('#5ac4d8'))) : d_mezcla(col, d_C.k, 0.2); return col; }
  const ven = fr > 0.3 && fr < 0.82 && ru > 0.22 && ru < 0.72;
  if (ven) { const enc = h(cu, fl, 700 + k) < (noche ? 0.55 : 0.18); if (fr < 0.38 || ru < 0.28) return d_mezcla(col, d_C.blanco, 0.5);
    if (tipo === 'estuco' && fr > 0.36 && fr < 0.5) return d_mezcla(col, d_C.k, 0.35);
    return enc ? (fr < 0.55 ? hex('#ffe8a0') : hex('#f8c860')) : (fr < 0.5 ? hex('#7a92b0') : hex('#3e4e6a')); }
  if (fr > 0.82 && fr < 0.9 && ru > 0.15 && ru < 0.78) return d_mezcla(col, d_C.blanco, 0.3);   // el alféizar
  if (tipo === 'ladrillo') return h(x, y, 710) < 0.18 ? d_mezcla(col, d_C.k, 0.18) : ((y + (Math.floor(Y * 3) % 2) * 2) % 4 === 0 && h(x, y, 711) < 0.5 ? d_mezcla(col, d_C.blanco, 0.12) : col);
  if (tipo === 'piedra') return (Math.floor(Y * 1.4) !== Math.floor((Y + 0.12) * 1.4)) ? d_mezcla(col, d_C.k, 0.25) : col;
  return h(x, y, 712) < 0.08 ? d_mezcla(col, d_C.k, 0.1) : col;
}

// un edificio de la avenida: la cara que da a la avenida (en perspectiva, más oscura si le da la sombra), la de delante
// (de frente) y, si es más bajo que la cámara, el tejado; con la bruma de la distancia; cosas del tejado según el estilo
function d_edificio3D(R, e, Yh, est, k, t, noche) {
  const [lado, z0, z1, , colH, tipo] = e, col = hex(colH), B = R.buf, X0 = 11 * lado, X1 = 40 * lado, E = d_EST[est], bruma = hex(E.bruma);
  if (Yh <= 0.3) {   // la ciudad aún plana: solo la huella del edificio pintada en el suelo, como en un plano
    const q = [[X0, z0], [X1, z0], [X1, z1], [X0, z1]].map(([X, Z]) => [d_px(X, Z), d_py(0, Z)]), niebla = Math.min(0.6, (z0 - 25) / 400);
    R.poligono(q, d_mezcla(d_mezcla(col, d_C.blanco, 0.15), bruma, niebla)); { const m = 0.18, qi = [[X0 + (X1 - X0) * m, z0 + (z1 - z0) * m], [X1 - (X1 - X0) * m, z0 + (z1 - z0) * m], [X1 - (X1 - X0) * m, z1 - (z1 - z0) * m], [X0 + (X1 - X0) * m, z1 - (z1 - z0) * m]].map(([X, Z]) => [d_px(X, Z), d_py(0, Z)]); R.poligono(qi, d_mezcla(col, bruma, niebla));
      for (let c2 = 0; c2 < 3; c2++) { const X = X0 + (X1 - X0) * (0.3 + c2 * 0.2), Z = z0 + (z1 - z0) * (0.35 + (c2 % 2) * 0.25), x = Math.round(d_px(X, Z)), y = Math.round(d_py(0, Z)), w = Math.max(1, Math.round(1.2 * d_F / Z)); R.rect(x - w, y - Math.max(1, w >> 1), x + w, y, d_mezcla(hex('#a8b0bc'), bruma, niebla)); } }
    for (let i = 0; i < 4; i++) R.linea(Math.round(q[i][0]), Math.round(q[i][1]), Math.round(q[(i + 1) % 4][0]), Math.round(q[(i + 1) % 4][1]), d_mezcla(d_mezcla(col, d_C.k, 0.35), bruma, niebla));
    return;
  }
  const sombraLado = E.luz ? (lado > 0 ? 0.0 : 0.28) : 0.16, sombraFrente = E.luz ? 0.06 : 0.08;
  // la cara de la avenida, columna a columna
  const xa = d_px(X0, z0), xb = d_px(X0, z1), xi = Math.round(Math.min(xa, xb)), xf = Math.round(Math.max(xa, xb));
  for (let x = Math.max(0, xi); x <= Math.min(319, xf); x++) { const dx = x - d_PF[0]; if (dx * lado <= 0) continue; const Z = X0 * d_F / dx; if (Z < z0 - 0.01 || Z > z1 + 0.01) continue;
    const yt = Math.max(0, Math.round(d_py(Yh, Z))), yb = Math.min(179, Math.round(d_py(0, Z))), niebla = Math.min(0.75, (Z - 25) / 330);
    for (let y = yt; y <= yb; y++) { const Y = d_HC - (y - d_PF[1]) * Z / d_F; let c = d_fachada(col, tipo, Z, Y, Yh, k, x, y, noche); if (sombraLado) c = d_mezcla(c, d_C.k, sombraLado); if (niebla > 0) c = d_mezcla(c, bruma, niebla); B[y * 320 + x] = c; }
    const ys = Math.round(d_py(Yh, Z)); if (ys >= 0 && ys < 180) B[ys * 320 + x] = d_mezcla(d_mezcla(col, d_C.blanco, 0.5), bruma, niebla); }
  // la cara de delante (de frente, a la distancia z0)
  const fa = d_px(X0, z0), fb = d_px(X1, z0), yt = Math.round(d_py(Yh, z0)), yb = Math.round(d_py(0, z0)), niebla = Math.min(0.75, (z0 - 25) / 330);
  for (let x = Math.max(0, Math.round(Math.min(fa, fb))); x <= Math.min(319, Math.round(Math.max(fa, fb))); x++) { const X = (x - d_PF[0]) * z0 / d_F, u = Math.abs(X - X0);
    for (let y = Math.max(0, yt); y <= Math.min(179, yb); y++) { const Y = d_HC - (y - d_PF[1]) * z0 / d_F; let c = d_fachada(col, tipo, u + 0.7, Y, Yh, k + 3, x, y, noche); if (sombraFrente) c = d_mezcla(c, d_C.k, sombraFrente); if (niebla > 0) c = d_mezcla(c, bruma, niebla); B[y * 320 + x] = c; } }
  { const x = Math.round(fa); for (let y = Math.max(0, yt); y <= Math.min(179, yb); y++) if (x >= 0 && x < 320) B[y * 320 + x] = d_mezcla(d_mezcla(col, d_C.blanco, 0.35), bruma, niebla); }   // la arista de la esquina, con luz
  // el tejado, si se ve desde la cámara (cuando la ciudad aún está plana o el edificio es bajo)
  if (Yh < d_HC) { const c = d_mezcla(d_mezcla(col, d_C.k, 0.08 + (d_HC - Yh) / d_HC * 0.0), bruma, niebla), q = [[X0, z0], [X1, z0], [X1, z1], [X0, z1]].map(([X, Z]) => [d_px(X, Z), d_py(Yh, Z)]);
    R.poligono(q, c); R.linea(Math.round(q[0][0]), Math.round(q[0][1]), Math.round(q[1][0]), Math.round(q[1][1]), d_mezcla(col, d_C.blanco, 0.4)); R.linea(Math.round(q[0][0]), Math.round(q[0][1]), Math.round(q[3][0]), Math.round(q[3][1]), d_mezcla(col, d_C.blanco, 0.25)); }
  // las cosas del tejado, sobre la cara de delante: depósitos de agua (nueva) y antenas con su luz que parpadea
  const s = d_F / z0, cx = d_px((X0 + X1) / 2 * 0.55 + X0 * 0.45, z0), top = d_py(Yh, z0);
  if (Yh > d_HC + 2) {
    const tranquila = (x, y) => (y < 18 && x < 178) || (x > 266 && y < 52);
    if (est === 'nueva' && k % 2 === 0 && !tranquila(Math.round(cx) - Math.round(1.6 * s), Math.round(top - 3.5 * s)) && !tranquila(Math.round(cx) + Math.round(1.6 * s), Math.round(top - 3.5 * s))) { const w = Math.max(3, Math.round(1.6 * s)), hh = Math.max(4, Math.round(2.0 * s)), bx = Math.round(cx), by = Math.round(top);
      for (const lx of [bx - w + 1, bx + w - 1]) R.rect(lx, by - Math.round(hh * 0.45), lx, by, hex('#3a3430'));
      R.rect(bx - w, by - hh, bx + w, by - Math.round(hh * 0.45), hex('#7a5a40')); for (let xx = bx - w; xx <= bx + w; xx += 2) R.rect(xx, by - hh, xx, by - Math.round(hh * 0.45), hex('#6a4a32')); R.rect(bx - w, by - hh, bx - w + 1, by - Math.round(hh * 0.45), hex('#9a7a58'));
      R.poligono([[bx - w - 1, by - hh], [bx + w + 1, by - hh], [bx, by - hh - Math.round(w * 0.9)]], hex('#4a4440')); }
    if (k % 3 === 1 && !tranquila(Math.round(cx + 2 * s), Math.round(top - 4 * s))) { const ax = Math.round(cx + 2 * s), ay = Math.round(top); R.rect(ax, ay - Math.round(3 * s), ax, ay, hex('#4a4a52')); if (Math.floor(t * 1.5 + k) % 2) R.pset(ax, ay - Math.round(3 * s) - 1, hex('#ff4040')); }
  }
  return { fa, fb, top: Math.round(top), yb };
}

// una palmera de juguete en perspectiva (x, suelo, alto en píxeles): el tronco curvo con sus anillos y la copa de palmas
// que se mece
function d_palmera(R, x, suelo, alto, t, k, bruma = null, nb = 0) {
  const { pset, linea } = R, m = Math.sin(t * 1.2 + k) * Math.max(1, alto * 0.03), top = suelo - alto, w = Math.max(1, Math.round(alto / 22));
  const col = (c) => bruma == null ? c : d_mezcla(c, bruma, nb);
  for (let y = suelo; y >= top; y--) { const u = (suelo - y) / alto, xx = Math.round(x + u * u * alto * 0.12 + m * u); for (let i = -w; i <= w; i++) pset(xx + i, y, col((y + k) % 3 === 0 ? hex('#8a6a48') : i < 0 ? hex('#c8a07a') : hex('#a8845e'))); }
  const cx = Math.round(x + alto * 0.12 + m), L = Math.max(4, alto * 0.42);
  for (let p = 0; p < 9; p++) { const a = -Math.PI + p * (Math.PI / 8) + Math.sin(t * 1.6 + p + k) * 0.06; for (let d = 1; d <= L; d++) { const f = d / L, xx = Math.round(cx + Math.cos(a) * d), yy = Math.round(top + Math.sin(a) * d * 0.5 + f * f * L * 0.45); pset(xx, yy, col(f > 0.75 ? hex('#3a8a3a') : p % 2 ? hex('#2e7a32') : hex('#4aa04a'))); if (d > 2 && d % 2 === 0) pset(xx, yy + 1, col(hex('#24602a'))); } }
  R.disco(cx, top + 1, Math.max(1, w), col(hex('#6a5a3a')));
}

// una persona pequeña de fondo, a la escala de su distancia (alto en px): piernas, cuerpo de color, cabeza con el pelo; si
// habla, se le mueve el brazo
function d_figura(R, x, suelo, alto, ropa, k, t, habla) {
  const { rect, disco, pset } = R, a = Math.max(5, alto), piernas = Math.round(a * 0.36), cuerpo = Math.round(a * 0.36), r = Math.max(1, Math.round(a * 0.14)), w = Math.max(1, Math.round(a * 0.14));
  rect(x - w, suelo - piernas, x - 1 + (w > 1 ? 0 : 1), suelo, hex('#2a2e44')); rect(x + 1 - (w > 1 ? 0 : 1), suelo - piernas, x + w, suelo, hex('#2a2e44'));
  rect(x - w - 1, suelo - piernas - cuerpo, x + w + 1, suelo - piernas, ropa); rect(x + w, suelo - piernas - cuerpo, x + w + 1, suelo - piernas, d_mezcla(ropa, d_C.k, 0.3));
  if (habla && Math.floor(t * 3 + k) % 2) pset(x + w + 2, suelo - piernas - cuerpo + 1, hex('#f0c8a0'));
  const hy = suelo - piernas - cuerpo - r; disco(x, hy, r, hex(['#f0c8a0', '#c8946a', '#8a5a3a', '#f4d4b0'][k % 4])); rect(x - r, hy - r, x + r, hy - r + Math.max(0, r - 1), hex(['#3a2418', '#e0b860', '#1c1820', '#a85a2a'][k % 4]));
  rect(x - w - 1, suelo + 1, x + w + 1, suelo + 1, d_mezcla(hex('#a6a4a0'), d_C.k, 0.4));
}

// una nota musical pequeña (la radio de un coche), de color c
function d_nota(R, x, y, c) { R.rect(x, y, x + 1, y + 1, c); R.rect(x + 1, y - 4, x + 1, y, c); R.pset(x + 2, y - 4, c); R.pset(x + 3, y - 3, c); }

function d_tresde(R, t, o) {
  const est = d_EST[o.estilo] ? o.estilo : 'nueva', E = d_EST[est], lev = Math.max(0, Math.min(1, o.levanta ?? 1)), { rect, pset, disco, linea } = R, B = R.buf, bruma = hex(E.bruma);
  const cielo = E.cielo.map(hex), nubes = E.nubes.map(hex);
  const alturas = E.edif.map((e) => e[3] * d_suave(lev * 1.9 - (e[1] - 28) / 260 * 0.9));
  // lo fijo, en dos búferes: el cielo, el fondo de cada estilo y el suelo (con la avenida, las aceras y la calle de
  // delante) siempre; los edificios, solo con la ciudad ya levantada (mientras se levanta, se pintan cada vez)
  const pintaSuelo = () => {
    const B = R.buf;
    for (let y = 0; y < 100; y++) { const u = Math.min(1, y / 86) * (cielo.length - 1), i = Math.floor(u), f = u - i, a = cielo[i], b = cielo[Math.min(cielo.length - 1, i + 1)], fl = y * 320; for (let x = 0; x < 320; x++) B[fl + x] = d_umbral(x, y) < f ? b : a; }
    d_cieloVetas(R, est);
    d_fondo3D(R, est);
    // el suelo: la avenida (con la línea y el paso de cebra), las aceras con sus losas, los solares (bajo los edificios),
    // la calle de delante con sus carriles, el bordillo y la acera de los personajes
    for (let y = 87; y < 180; y++) { const Z = d_HC * d_F / (y - d_PF[1]), fl = y * 320;
      for (let x = 0; x < 320; x++) { const X = (x - d_PF[0]) * Z / d_F, aX = Math.abs(X); let c;
        if (Z < 15) { const jz = Math.floor(Z * 1.2), jx = Math.floor((X + 100) / 2.6); c = (Math.floor((Z - 0.04) * 1.2) !== jz || Math.floor((X + 100.05) / 2.6) !== jx) ? hex(E.aceraS) : (h(jx, jz, 720) < 0.3 ? d_mezcla(hex(E.acera), d_C.blanco, 0.12) : hex(E.acera)); if (Z > 14.3) c = Z > 14.7 ? d_mezcla(hex(E.aceraS), d_C.k, 0.3) : d_mezcla(hex(E.acera), d_C.blanco, 0.3); }
        else if (Z < 28) { c = h(x, y, 721) < 0.06 ? hex(E.asfL) : hex(E.asf); if (Math.abs(Z - 20.5) < 0.18 && Math.floor((X + 200) / 3) % 2) c = hex(E.linea); if (aX < 8 && Z > 25 && Z < 27.6 && Math.floor((X + 20) / 1.1) % 2 === 0) c = hex(E.linea); if (Z > 27.6 && aX < 11) c = d_mezcla(hex(E.acera), d_C.k, 0.25); }
        else if (aX < 8) { c = h(x, y, 722) < 0.06 ? hex(E.asfL) : hex(E.asf); if (aX < 0.18 && Math.floor(Z / 4) % 2 === 0) c = hex(E.linea); if (Z > 28 && Z < 31.5 && Math.floor((X + 20) / 1.2) % 2 === 0) c = hex(E.linea); if (Z > 32 && Z < 32.6) c = hex(E.linea); c = d_mezcla(c, bruma, Math.min(0.6, (Z - 25) / 400)); }
        else if (aX < 11) { c = (Math.floor(Z / 2) !== Math.floor((Z - 0.12) / 2)) ? hex(E.aceraS) : hex(E.acera); if (aX < 8.25) c = d_mezcla(hex(E.aceraS), d_C.k, 0.25); c = d_mezcla(c, bruma, Math.min(0.6, (Z - 25) / 400)); }
        else c = d_mezcla(hex(E.solar), bruma, Math.min(0.6, (Z - 25) / 400));
        B[fl + x] = c; } }
    // la alcantarilla de la calle de delante y las rayas de los pasos
    for (let j = -2; j <= 2; j++) for (let i = -6; i <= 6; i++) if ((i / 6.5) ** 2 + (j / 2.5) ** 2 < 1) pset(212 + i, 133 + j, (i + j) % 2 ? hex('#3a3c44') : hex('#2a2c34'));
    d_sueloTresde(R, est);
  };
  const pinta = () => {
    d_fijo(R, 'tresdeSuelo|' + est, pintaSuelo);
    // los edificios, de lejos a cerca
    const orden = E.edif.map((e, i) => i).sort((a, b) => E.edif[b][1] - E.edif[a][1]);
    for (const i of orden) d_edificio3D(R, E.edif[i], alturas[i], est, i, 0, false);
  };
  if (lev >= 1) d_fijo(R, 'tresde|' + est, pinta); else pinta();
  // lo que vive: las nubes (solo sobre el cielo que queda a la vista), los pájaros, el polvo de los edificios que se
  // levantan, la gente, los coches, el vapor y la nieve
  const esCielo = (x, y) => { if (y >= 88) return false; const c = B[y * 320 + x]; return cielo.includes(c); };
  for (let k = 0; k < 5; k++) { const cerca = k < 2, w = cerca ? 40 + k * 10 : 18 + k * 4, v = cerca ? 3 + k : 1 + k * 0.3, cy = cerca ? 26 + k * 12 : 18 + k * 7, cx = ((h(k, 7, 730) * 470 + t * v) % 500) - 90;
    const n = 4 + Math.round(w / 14), bolas = []; for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, k, 731)); bolas.push([cx + u * w * 0.86, cy - r * 0.45, r]); }
    for (let pase = 0; pase < 3; pase++) for (const [bx, by, r] of bolas) { const rr = pase === 2 ? r * 0.7 : r, ox = pase === 2 ? -1 : 0, oy = pase === 0 ? 1 : pase === 2 ? -2 : 0;
      for (let y = Math.round(by + oy - rr); y <= Math.round(by + oy + rr); y++) for (let x = Math.round(bx + ox - rr); x <= Math.round(bx + ox + rr); x++) { if (x < 0 || x > 319 || y < 0 || y > 87 || (x - bx - ox) ** 2 + (y - by - oy) ** 2 > rr * rr || y > cy + w * 0.1) continue; if (pase === 0 ? esCielo(x, y) : (esCielo(x, y) || nubes.includes(B[y * 320 + x]))) B[y * 320 + x] = nubes[pase]; } } }
  for (let q = 0; q < 4; q++) { const u = (t * (14 + q * 3) + q * 90) % 420 - 50, gx = Math.round(u), gy = Math.round(30 + q * 9 + Math.sin(t * 0.8 + q) * 4), al = Math.floor(t * 4 + q) % 2; if (gx < 0 || gx > 319 || d_atom(gx, gy) || !esCielo(gx, gy)) continue; const c = est === 'ochenta' ? d_C.blanco : hex('#3a3440'); pset(gx, gy, c); pset(gx - 1, gy - al, c); pset(gx + 1, gy - al, c); pset(gx - 2, gy - al + 1, c); pset(gx + 2, gy - al + 1, c); }
  if (lev > 0 && lev < 1) E.edif.forEach((e, i) => { const a = alturas[i] / e[3]; if (a <= 0.02 || a >= 0.98) return; const [lado, z0] = e; for (let q = 0; q < 6; q++) { const X = (11 + q * 5) * lado, x = Math.round(d_px(X, z0) + Math.sin(t * 3 + q) * 2), y = Math.round(d_py(0, z0)), r = Math.round((1 + q % 3) * d_F / z0 * 0.4); disco(x, y - r + 1, r, q % 2 ? hex('#d8d4cc') : hex('#bcb8b0')); } });
  // el atrezo de las aceras de la avenida (farolas, árboles o palmeras) y la gente que charla, de lejos a cerca
  const ropa = [hex('#e4483e'), hex('#3a6ad8'), hex('#f2c444'), hex('#3aa86a'), hex('#f490b8'), hex('#a47ad2'), hex('#f08a3e')];
  const cosas = [];
  for (let Z = 34; Z < 200; Z += 18) for (const lado of [-1, 1]) cosas.push(['farola', lado, Z + (lado > 0 ? 9 : 0)]);
  for (const [lado, Z, k] of [[-1, 36, 0], [1, 46, 2], [-1, 64, 4], [1, 82, 1], [-1, 110, 3]]) cosas.push(['gente', lado, Z, k]);
  if (est !== 'nueva') for (let Z = 40; Z < 160; Z += 22) for (const lado of [-1, 1]) cosas.push(['palmera', lado, Z + (lado > 0 ? 11 : 0)]);
  else for (let Z = 44; Z < 160; Z += 26) for (const lado of [-1, 1]) cosas.push(['arbol', lado, Z + (lado > 0 ? 13 : 0)]);
  cosas.sort((a, b) => b[2] - a[2]);
  for (const [tipo, lado, Z, k] of cosas) { const nb = Math.min(0.6, (Z - 25) / 400), s = d_F / Z, yb = Math.round(d_py(0, Z));
    if (tipo === 'farola') { const x = Math.round(d_px(9.6 * lado, Z)), hh = Math.round(4.2 * s); rect(x, yb - hh, x, yb, d_mezcla(hex('#3a3e48'), bruma, nb)); rect(x - Math.round(lado * s * 0.8), yb - hh, x, yb - hh, d_mezcla(hex('#3a3e48'), bruma, nb)); pset(x - Math.round(lado * s * 0.8), yb - hh + 1, est === 'tres' ? hex('#fff0b0') : d_mezcla(hex('#f8f0d0'), bruma, nb)); }
    if (tipo === 'palmera') d_palmera(R, Math.round(d_px(9.4 * lado, Z)), yb, Math.round(6.5 * s), t, Z, bruma, nb);
    if (tipo === 'arbol') { const x = Math.round(d_px(9.4 * lado, Z)), hh = Math.round(3.2 * s), r = Math.max(2, Math.round(1.3 * s)); rect(x, yb - hh, x, yb, d_mezcla(hex('#4a3a2e'), bruma, nb)); for (let q = 0; q < 7; q++) { const a = q * 0.9 + Math.sin(t + Z) * 0.1; linea(x, yb - hh + r, Math.round(x + Math.cos(a) * r), Math.round(yb - hh + r - Math.abs(Math.sin(a)) * r), d_mezcla(hex('#4a3a2e'), bruma, nb)); } for (let q = 0; q < 5; q++) pset(x - r + Math.round(h(q, Z, 735) * 2 * r), yb - hh + Math.round(h(q, Z, 736) * r), d_mezcla(d_C.blanco, bruma, nb * 0.5)); }
    if (tipo === 'gente') { const x = Math.round(d_px(9.5 * lado, Z)), a = Math.round(1.75 * s), sep = Math.max(3, Math.round(0.9 * s)), habla = Math.floor(t / 1.6 + k) % 2;
      d_figura(R, x - sep, yb, a, ropa[k % 7], k, t, habla === 0); d_figura(R, x + sep, yb, a, ropa[(k + 3) % 7], k + 1, t, habla === 1);
      if (Math.floor(t * 0.6 + k) % 3 !== 2) { const bx = x + (habla ? sep : -sep), by = yb - a - 5; if (!d_atom(bx, by)) { rect(bx - 4, by - 2, bx + 4, by + 2, d_C.k); rect(bx - 3, by - 1, bx + 3, by + 1, d_C.blanco); for (let i = -2; i <= 2; i += 2) if (Math.floor(t * 4) % 3 >= (i + 2) / 2) pset(bx + i, by, d_C.k); pset(bx + (habla ? -2 : 2), by + 3, d_C.k); } } }
  }
  // los semáforos de la esquina de la avenida, el avión lejano y las palomas de la acera de delante
  for (const lado of [-1, 1]) d_semaforo(R, t, Math.round(d_px(9.4 * lado, 29)), Math.round(d_py(0, 29)), d_F / 29, 0.01, bruma);
  if (est !== 'ochenta') d_avion(R, t, esCielo);
  d_palomas(R, t, est);
  // los coches de la avenida, pequeños por la distancia: los que se van (pilotos) y los que vienen (faros)
  for (let q = 0; q < 6; q++) { const va = q % 2 === 0, u = ((t * (va ? 10 : 9) + q * 47) % 220) / 220, Z = va ? 31 + u * 200 : 231 - u * 200, X = va ? 4 : -4, s = d_F / Z;
    const cx = Math.round(d_px(X, Z)), yb = Math.round(d_py(0, Z)), w = Math.max(2, Math.round(1.0 * s)), hh = Math.max(2, Math.round(1.3 * s)), nb = Math.min(0.6, (Z - 25) / 400), col = d_mezcla([hex('#e4483e'), hex('#3a6ad8'), hex('#f2c444'), hex('#3aa86a'), hex('#f4f0e8'), hex('#f490b8')][q], bruma, nb);
    rect(cx - w - 1, yb, cx + w + 1, yb, d_mezcla(hex(E.asf), d_C.k, 0.4)); rect(cx - w, yb - hh, cx + w, yb - 1, col); rect(cx - w + 1, yb - hh - Math.max(1, Math.round(hh * 0.5)), cx + w - 1, yb - hh, col);
    rect(cx - w + 1, yb - hh - Math.max(1, Math.round(hh * 0.5)) + 1, cx + w - 1, yb - hh, d_mezcla(hex('#3a4a6a'), bruma, nb)); pset(cx - w, yb - 2, va ? hex('#ff3a3a') : hex('#fff6c0')); pset(cx + w, yb - 2, va ? hex('#ff3a3a') : hex('#fff6c0')); }
  // la calle de delante: los coches de juguete que cruzan con la radio puesta (notas que salen por la ventanilla)
  const cols = est === 'nueva' ? ['#f2c230', '#c8483e', '#f2c230', '#5a6a8a', '#e8e4d8'] : est === 'ochenta' ? ['#f490b8', '#4ac8d8', '#f8f0e8', '#f2c444', '#a47ad2'] : ['#e8a040', '#3a8ad8', '#c84a3a', '#5aa86a', '#f4f0e8'];
  for (let q = 0; q < 4; q++) { const lejos = q < 2, v = lejos ? 34 : 40, xx = lejos ? ((t * v + q * 210) % 440) - 60 : 380 - ((t * v + q * 230) % 440), yb = lejos ? 137 : 148, x = Math.round(xx);
    PIEZAS_GT.cocheJuguete?.(R, x, yb, { color: cols[(q * 2 + 1) % cols.length], dir: lejos ? 1 : -1 });
    if (q % 2 === 0 || est === 'ochenta') for (let n = 0; n < 3; n++) { const u = ((t * 0.7 + n / 3 + q * 0.2) % 1), nx = Math.round(x + (lejos ? -2 : 2) + Math.sin(t * 3 + n * 2) * 3 + u * 6 * (lejos ? -1 : 1)), ny = Math.round(yb - 14 - u * 22); if (u < 0.9 && !d_atom(nx, ny)) d_nota(R, nx, ny, [hex('#ff5ab0'), hex('#4af0f0'), hex('#fff060')][(n + q) % 3]); } }
  // el vapor de la alcantarilla (nueva), el rótulo de neón que parpadea (ochenta) y la nieve que cae (nueva)
  if (est === 'nueva') { for (let k = 0; k < 7; k++) { const u = ((t * 0.45 + k / 7) % 1), x = Math.round(212 + Math.sin(t * 1.3 + k) * 3 + u * 10), y = Math.round(131 - u * 34), r = 1 + Math.round(u * 4); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && d_umbral(x + i, y + j) < 0.85 - u * 0.7) pset(x + i, y + j, u > 0.5 ? hex('#c8ccd4') : hex('#eef0f4')); } }
  if (est === 'ochenta') E.edif.forEach((e, i) => { if (alturas[i] < 4 || e[1] > 100) return; const [lado, z0] = e, fa = Math.round(d_px(11 * lado, z0)), fb = Math.round(d_px(40 * lado, z0)), yt = Math.round(d_py(alturas[i], z0)), yb = Math.round(d_py(2.2, z0)), on = (Math.floor(t * 2 + i * 1.7) % 7) !== 0, c = i % 2 ? hex('#ff5ab0') : hex('#4af0f0'), cS = i % 2 ? hex('#a03a7a') : hex('#2a8a9a');
    const x0 = Math.max(0, Math.min(fa, fb) + 2), x1 = Math.min(319, Math.max(fa, fb) - 2); for (let x = x0; x <= x1; x++) { if (!d_atom(x, yt + 3)) pset(x, yt + 3, on ? c : cS); pset(x, yb - 1, (Math.floor(x / 3 + t * 6) % 4) ? (on ? c : cS) : d_C.blanco); }
    // el rótulo de bandera, sin letras: una caja oscura que sobresale de la esquina con un pictograma de neón
    const bx = Math.round(fa) + (lado > 0 ? 2 : -14), by = Math.round((yt + yb) / 2) - 6; if (bx < 0 || bx > 306 || d_atom(bx + 6, by)) return; R.rect(bx, by, bx + 12, by + 12, hex('#2a1e3a')); R.rect(bx, by, bx + 12, by, on ? c : cS); R.rect(bx, by + 12, bx + 12, by + 12, on ? c : cS);
    const sx = bx + 6, sy = by + 6, on2 = Math.floor(t * 1.3 + i) % 5 !== 0; if (d_atom(sx, sy)) return;
    const pal2 = on2 ? (i % 2 ? hex('#4af0f0') : hex('#ff5ab0')) : hex('#5a4a6a');
    if (i % 3 === 0) { linea(sx, sy + 4, sx, sy - 3, pal2); for (let a = -2; a <= 2; a++) linea(sx, sy - 3, sx + a * 2, sy - 1 - Math.abs(a), pal2); }   // una palmera de neón
    else if (i % 3 === 1) { linea(sx - 3, sy - 3, sx + 3, sy - 3, pal2); linea(sx - 3, sy - 3, sx, sy, pal2); linea(sx + 3, sy - 3, sx, sy, pal2); linea(sx, sy, sx, sy + 3, pal2); linea(sx - 2, sy + 3, sx + 2, sy + 3, pal2); }   // una copa
    else { for (let a = 0; a < 5; a++) { const an = a * 1.2566 - Math.PI / 2; linea(sx, sy, Math.round(sx + Math.cos(an) * 4), Math.round(sy + Math.sin(an) * 4), pal2); } } });   // una estrella
  if (est === 'nueva') for (let k = 0; k < 70; k++) { const x = Math.round(((h(k, 1, 740) * 340 + t * (6 + (k % 4) * 2) + Math.sin(t * 0.9 + k) * 4) % 340) - 10), y = Math.round(((h(k, 2, 740) * 190 + t * (12 + (k % 5) * 3)) % 190) - 5); if (x < 0 || x > 319 || y < 0 || y > 179 || d_atom(x, y)) continue; pset(x, y, d_C.blanco); if (k % 4 === 0) pset(x + 1, y, hex('#dce4ee')); }
  return { suelo: 168, acera: [0, 152, 319, 179], calle: [120, 150], avenida: { fuga: d_PF, ancho: [-8, 8] }, cruce: [[0, 130, 319, 138], [0, 141, 319, 149]], libre: [24, 296] };
}
// el fondo de cada estilo, detrás de los edificios: rascacielos lejanos con su bruma (nueva), el mar con el sol bajo y un
// velero (ochenta), o las tres ciudades del horizonte: la bahía con su puente, el desierto con sus mesetas y la ciudad de
// luces, y las colinas verdes con un pueblo (tres)
function d_fondo3D(R, est) {
  const { rect, pset, disco, linea, poligono } = R, B = R.buf, E = d_EST[est], bruma = hex(E.bruma);
  if (est === 'nueva') {
    d_lejanaNueva(R);
    for (const [x0, w, top, c] of [[120, 10, 34, '#9aa2b4'], [134, 8, 24, '#8a94a8'], [146, 12, 40, '#a4acbc'], [160, 15, 38, '#929cb0'], [177, 9, 46, '#a0a8b8'], [190, 8, 36, '#949eb2'], [104, 12, 48, '#a6aebe'], [200, 14, 52, '#a8b0c0']]) {
      const col = hex(c); rect(x0, top, x0 + w, 88, col); rect(x0 + w - 2, top, x0 + w, 88, d_mezcla(col, d_C.k, 0.1)); for (let y = top + 3; y < 86; y += 3) for (let x = x0 + 2; x < x0 + w - 2; x += 2) if (h(x, y, 750) < 0.3) pset(x, y, d_mezcla(col, d_C.blanco, 0.3));
      if (top < 30) { rect(x0 + 2, top - 6, x0 + w - 2, top, col); rect(x0 + 3, top - 10, x0 + w - 3, top - 6, col); rect(x0 + (w >> 1), top - 16, x0 + (w >> 1), top - 10, col); }   // el único alto, escalonado
      if (w >= 15) { rect(x0 + 2, top - 3, x0 + 5, top, col); rect(x0 + w - 6, top - 2, x0 + w - 3, top, col); } }
  } else if (est === 'ochenta') {
    for (let y = 78; y < 90; y++) for (let x = 120; x < 200; x++) B[y * 320 + x] = (x + y * 3) % 9 === 0 ? hex('#ffe8c0') : y < 80 ? hex('#4ab0d8') : hex('#3a90c8');
    for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const d = Math.hypot(i, j); if (d > 16 || 70 + j > 79) continue; const x = 160 + i, y = 70 + j; if (d < 12) B[y * 320 + x] = (j > 2 && (j % 3 === 0)) ? hex('#ff7a8a') : d < 9 ? hex('#fff4b0') : hex('#ffd070'); else if (d_umbral(x, y) < (16 - d) / 5) B[y * 320 + x] = d_mezcla(B[y * 320 + x], hex('#ffd890'), 0.5); }
    for (let i = 0; i < 26; i++) pset(148 + i, 81 + (i % 3), hex('#fff0b0'));
    poligono([[176, 77], [180, 70], [180, 77]], d_C.blanco); rect(176, 77, 182, 78, hex('#c84a3a'));
  } else {
    // la bahía con el agua, la ciudad de enfrente y el puente colgante (genérico, verde azulado)
    for (let y = 60; y < 88; y++) for (let x = 0; x < 110; x++) { const ag = y > 74; B[y * 320 + x] = ag ? ((x * 3 + y * 7) % 13 === 0 ? hex('#ffd8a0') : y < 80 ? hex('#7a6a98') : hex('#5a5a8a')) : B[y * 320 + x]; }
    for (let x = 0; x < 110; x++) { const yy = Math.round(70 + Math.sin(x * 0.07) * 3 + Math.sin(x * 0.19) * 1.5); for (let y = yy; y <= 74; y++) pset(x, y, hex('#8a6a9a')); }
    for (const [x0, w, top] of [[56, 4, 58], [62, 3, 62], [67, 5, 55], [74, 3, 63]]) { rect(x0, top, x0 + w, 74, hex('#9a7aa8')); for (let y = top + 2; y < 73; y += 2) if (h(x0, y, 751) < 0.6) pset(x0 + 1, y, hex('#ffe0a0')); }
    for (const tx of [18, 92]) { rect(tx, 46, tx + 2, 78, hex('#3a7a7a')); rect(tx, 46, tx, 78, hex('#5aa0a0')); rect(tx - 1, 52, tx + 3, 53, hex('#3a7a7a')); rect(tx - 1, 62, tx + 3, 63, hex('#3a7a7a')); }
    rect(0, 72, 109, 73, hex('#2e5e5e')); for (let x = 0; x < 110; x++) { const cy = x < 19 ? 46 + (19 - x) * 1.3 : x > 93 ? 46 + (x - 93) * 1.3 : 46 + 22 * (1 - ((x - 56) / 37) ** 2); pset(x, Math.round(Math.min(72, cy)), hex('#3a7a7a')); if (x % 4 === 0) for (let y = Math.round(Math.min(72, cy)) + 1; y < 72; y++) pset(x, y, hex('#5a8a8a')); }
    // el desierto con las mesetas, los cactus y la ciudad de luces
    for (let y = 66; y < 88; y++) for (let x = 110; x < 212; x++) B[y * 320 + x] = y > 77 ? (h(x, y, 752) < 0.08 ? hex('#d88a5a') : hex('#e8a46a')) : B[y * 320 + x];
    for (const [x0, x1, top] of [[114, 140, 62], [150, 166, 66], [184, 208, 60]]) { for (let y = top; y <= 78; y++) { const e = (y - top) * 0.4; rect(Math.round(x0 - e), y, Math.round(x1 + e), y, y < top + 2 ? hex('#e88a5a') : (y - top) % 4 === 0 ? hex('#b85a3a') : hex('#c86a44')); } rect(x1 - 4, top + 2, x1 + 2, 78, hex('#a8503a')); }
    for (const [x0, w, top] of [[168, 2, 66], [171, 3, 62], [175, 2, 68], [178, 3, 64]]) { rect(x0, top, x0 + w, 77, hex('#5a3a6a')); for (let y = top + 1; y < 76; y += 2) pset(x0 + 1, y, hex('#ffe060')); }
    for (const cx of [126, 196]) { rect(cx, 80, cx, 85, hex('#3a7a3a')); pset(cx - 1, 82, hex('#3a7a3a')); pset(cx + 1, 81, hex('#3a7a3a')); }
    // las colinas verdes con el pueblo de tejados rojos
    for (let x = 212; x < 320; x++) { const yy = Math.round(64 + Math.sin(x * 0.045) * 6 + Math.sin(x * 0.13) * 2); for (let y = Math.max(52, yy); y < 88; y++) B[y * 320 + x] = y - yy < 2 ? hex('#8ab86a') : (h(x, y, 753) < 0.1 ? hex('#5a8a4a') : hex('#6a9a5a')); }
    for (let x = 212; x < 320; x++) { const yy = Math.round(74 + Math.sin(x * 0.08 + 1) * 4); for (let y = yy; y < 88; y++) B[y * 320 + x] = h(x, y, 754) < 0.12 ? hex('#4a7a3a') : hex('#5a8a48'); }
    for (let k = 0; k < 9; k++) { const hx = 228 + k * 10 + Math.round(h(k, 1, 755) * 4), hy = 76 + Math.round(h(k, 2, 755) * 6); rect(hx, hy, hx + 4, hy + 3, hex('#f4e8d0')); poligono([[hx - 1, hy], [hx + 2, hy - 3], [hx + 5, hy]], hex('#c84a3a')); pset(hx + 2, hy + 2, hex('#ffe080')); }
    for (let k = 0; k < 12; k++) { const tx = 216 + Math.round(h(k, 3, 756) * 100), ty = 70 + Math.round(h(k, 4, 756) * 12); disco(tx, ty, 2, hex('#3a6a3a')); pset(tx - 1, ty - 1, hex('#6a9a5a')); }
  }
  // la bruma del horizonte
  for (let y = 80; y < 88; y++) for (let x = 0; x < 320; x++) if (d_umbral(x, y) < (y - 80) / 10) B[y * 320 + x] = d_mezcla(B[y * 320 + x], bruma, 0.35);
}
// por delante de los personajes en 'tresde': la farola de la acera (izquierda) con su cartel de tráfico sin letras, y la
// boca de riego (derecha); en 'ochenta', una palmera en su jardinera en vez de la boca de riego; en 'nueva', un montón de
// nieve junto al bordillo
function d_tresdeDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, est = d_EST[o.estilo] ? o.estilo : 'nueva';
  { const x = 14; rect(x - 3, 175, x + 3, 179, hex('#2a2e38')); rect(x - 1, 72, x + 1, 176, hex('#3a3e4a')); rect(x - 1, 72, x - 1, 176, hex('#5a5e6a')); linea(x + 1, 74, x + 12, 70, hex('#3a3e4a')); rect(x + 10, 68, x + 18, 71, hex('#2a2e38')); rect(x + 11, 71, x + 17, 72, est === 'tres' ? hex('#fff0b0') : hex('#e8ecf0'));
    rect(x - 7, 104, x + 7, 112, d_C.k); rect(x - 6, 105, x + 6, 111, hex('#3a8a4a')); rect(x - 4, 107, x + 4, 109, d_C.blanco); pset(x + 3, 106, d_C.blanco); pset(x + 3, 110, d_C.blanco); }
  if (est === 'ochenta') { const x = 302; rect(x - 9, 168, x + 9, 179, d_C.k); rect(x - 8, 169, x + 8, 179, hex('#f4a0b8')); rect(x - 8, 169, x + 8, 170, hex('#ffd0dc')); d_palmera(R, x, 168, 56, t, 3); }
  else { const x = 304; rect(x - 4, 160, x + 4, 176, d_C.k); rect(x - 3, 161, x + 3, 176, est === 'nueva' ? hex('#d83a2a') : hex('#e8b830')); rect(x - 6, 165, x + 6, 168, d_C.k); rect(x - 5, 166, x + 5, 167, est === 'nueva' ? hex('#a82a20') : hex('#b88a20')); disco(x, 160, 3, d_C.k); disco(x, 160, 2, est === 'nueva' ? hex('#d83a2a') : hex('#e8b830')); pset(x - 1, 162, d_C.blanco); rect(x - 5, 176, x + 5, 178, hex('#3a3a42'));
    if (est === 'nueva') { for (let i = -18; i <= 18; i++) { const hh = Math.round(4 * Math.cos(i / 18 * Math.PI / 2)); rect(270 + i, 179 - hh, 270 + i, 179, i < 0 ? d_C.blanco : hex('#dce4ee')); } } }
  return { farola: [14, 176], boca: [304, 176] };
}

// ════ 'tresde', cámara 'puente': el puente colgante de noche, desde el paseo del río ════
// la base fija: el cielo de noche tramado, la ciudad de enfrente con sus ventanas, el puente (las torres, los cables
// con su comba, los tirantes y el tablero), la barandilla del paseo y el suelo de losas del paseo
function d_basePuente(R) {
  const { rect, pset, disco, linea } = R, B = R.buf, cielo = ['#0c1030', '#121842', '#1a2250', '#24305e', '#33406c', '#4a4a78'].map(hex);
  for (let y = 0; y < 100; y++) { const u = y / 96 * (cielo.length - 1), i = Math.floor(u), f = u - i, a = cielo[Math.min(5, i)], b = cielo[Math.min(5, i + 1)]; for (let x = 0; x < 320; x++) B[y * 320 + x] = d_umbral(x, y) < f ? b : a; }
  // la ciudad de enfrente: rascacielos de bloques en dos términos, con las ventanas encendidas
  for (const [capa, n, hmin, hmax, c] of [[0, 22, 26, 56, '#1e2448'], [1, 30, 12, 34, '#151a36']]) for (let k = 0; k < n; k++) {
    const x0 = Math.round(h(k, capa, 760) * 330) - 10, w = 8 + Math.round(h(k, capa, 761) * 14), top = 92 - hmin - Math.round(h(k, capa, 762) * (hmax - hmin)), col = hex(c);
    if (x0 + w > 270 && top < 50) continue;
    rect(x0, top, x0 + w, 96, col); rect(x0 + w - 1, top, x0 + w, 96, d_mezcla(col, d_C.k, 0.3));
    for (let y = top + 3; y < 94; y += 3) for (let x = x0 + 2; x < x0 + w - 1; x += 2) if (h(x, y, 763 + capa) < (capa ? 0.45 : 0.3)) pset(x, y, h(x, y, 764) < 0.7 ? hex('#ffe08a') : hex('#a8d8ff'));
    if (capa === 0 && k % 4 === 0) { rect(x0 + (w >> 1), top - 6, x0 + (w >> 1), top, col); }
  }
  // el agua (lo que se mueve va en cada fotograma) y la orilla de enfrente
  rect(0, 96, 319, 97, hex('#0a0e22'));
  // el puente: las dos torres con sus travesaños y luces, los cables con su comba, los tirantes y el tablero
  const T1 = 84, T2 = 236, top = 34, deck = 92, cab = (x) => { if (x < T1) return top + (T1 - x) * 0.62; if (x > T2) return top + (x - T2) * 0.62; const u = (x - T1) / (T2 - T1); return top + 46 * 4 * u * (1 - u) * 0.95; };
  for (let x = 0; x < 320; x++) { const y = Math.round(cab(x)); if (y < deck) { pset(x, y, hex('#8a98c8')); pset(x, y + 1, hex('#4a5688')); if (x % 5 === 0) for (let yy = y + 2; yy < deck; yy++) pset(x, yy, hex('#3a4678')); } }
  for (const tx of [T1, T2]) { rect(tx - 4, top - 2, tx - 2, deck + 18, hex('#3a4678')); rect(tx + 2, top - 2, tx + 4, deck + 18, hex('#3a4678')); rect(tx - 4, top - 2, tx - 4, deck + 18, hex('#5a68a0')); rect(tx + 2, top - 2, tx + 2, deck + 18, hex('#5a68a0'));
    for (const yy of [top + 4, top + 22, top + 40]) rect(tx - 4, yy, tx + 4, yy + 2, hex('#2e386a')); rect(tx - 5, top - 4, tx + 5, top - 2, hex('#2e386a')); }
  rect(0, deck, 319, deck + 3, hex('#2a3260')); rect(0, deck, 319, deck, hex('#5a68a0')); for (let x = 0; x < 320; x += 4) rect(x, deck + 4, x + 1, deck + 5, hex('#1e2448'));
  for (let x = 0; x < 320; x++) pset(x, deck + 6, x % 8 < 5 ? hex('#1a2040') : hex('#2a3260'));
  // el paseo del río: la barandilla de hierro (por detrás de los personajes) y el suelo de losas con juntas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const jy = Math.floor((y - 150) / 6), jx = Math.floor((x + jy * 7) / 18), q = h(x, y, 765); B[y * 320 + x] = ((y - 150) % 6 === 0 || (x + jy * 7) % 18 === 0) ? hex('#2a2a3c') : q < 0.06 ? hex('#4a4a60') : (jx + jy) % 3 === 0 ? hex('#3e3e54') : hex('#38384c'); }
  rect(0, 147, 319, 149, hex('#5a5a72')); rect(0, 147, 319, 147, hex('#7a7a94'));
  rect(0, 134, 319, 135, hex('#2a2a3a')); rect(0, 134, 319, 134, hex('#6a6a86')); for (let x = 2; x < 320; x += 6) { rect(x, 136, x, 146, hex('#2a2a3a')); } for (let x = 0; x < 320; x += 30) { rect(x, 133, x + 2, 147, hex('#2a2a3a')); disco(x + 1, 132, 2, hex('#2a2a3a')); pset(x, 131, hex('#6a6a86')); }
}

function d_puente(R, t, o) {
  const { rect, pset, disco, linea } = R, B = R.buf;
  d_fijo(R, 'puente', () => d_basePuente(R));
  // las estrellas que titilan, la luna y un avión con su luz
  for (let k = 0; k < 50; k++) { const x = Math.round(h(k, 1, 770) * 319), y = Math.round(h(k, 2, 770) ** 1.3 * 60); if (d_atom(x, y) || (x > 20 && x < 170 && y < 15)) continue; const tw = Math.sin(t * (1.3 + h(k, 3, 770) * 2) + k); if (B[y * 320 + x] !== hex('#0c1030') && B[y * 320 + x] !== hex('#121842') && B[y * 320 + x] !== hex('#1a2250')) continue; if (tw > -0.4) pset(x, y, tw > 0.5 ? d_C.blanco : hex('#8a94c0')); }
  { const lx = 196, ly = 22; disco(lx, ly, 6, hex('#f4ecd0')); disco(lx + 3, ly - 1, 5, hex('#121842')); for (let a = 0; a < 6.3; a += 0.3) if (Math.sin(t + a * 3) > 0.4) pset(Math.round(lx + Math.cos(a) * 8), Math.round(ly + Math.sin(a) * 8), hex('#4a5080')); }
  { const u = (t * 12) % 420 - 50, ax = Math.round(u), ay = Math.round(18 + u * 0.03); if (ax > 0 && ax < 270) { pset(ax, ay, Math.floor(t * 2) % 2 ? hex('#ff4040') : d_C.blanco); pset(ax - 1, ay, hex('#5a6090')); } }
  // las luces rojas de lo alto de las torres y de los rascacielos, que parpadean
  for (const [x, y] of [[84, 31], [236, 31]]) if (Math.floor(t * 1.2) % 2) { pset(x, y, hex('#ff4040')); pset(x - 1, y, hex('#a02020')); pset(x + 1, y, hex('#a02020')); }
  // las farolas del tablero y los coches que cruzan: hacia la derecha con los faros, hacia la izquierda con los pilotos
  for (let x = 6; x < 320; x += 16) { pset(x, 89, hex('#3a4678')); pset(x, 88, hex('#3a4678')); pset(x + 1, 88, hex('#ffe8a0')); }
  for (let q = 0; q < 9; q++) { const der = q % 2 === 0, v = 26 + (q % 3) * 6, x = der ? ((t * v + q * 53) % 380) - 30 : 350 - ((t * v + q * 61) % 380), xx = Math.round(x), y = der ? 90 : 91, col = [hex('#e4483e'), hex('#3a6ad8'), hex('#f2c444'), hex('#e8e4d8'), hex('#3aa86a')][q % 5];
    rect(xx - 3, y - 2, xx + 3, y, d_mezcla(col, d_C.k, 0.45)); rect(xx - 2, y - 3, xx + 1, y - 3, d_mezcla(col, d_C.k, 0.6));
    if (der) { pset(xx + 4, y - 1, hex('#fff6c0')); for (let i = 5; i < 11; i++) if (d_umbral(xx + i, y - 1) < (11 - i) / 7) pset(xx + i, y - 1, hex('#c8c08a')); pset(xx - 4, y - 1, hex('#a02020')); }
    else { pset(xx - 4, y - 1, hex('#ff3a3a')); pset(xx - 5, y - 1, hex('#a02020')); pset(xx + 4, y - 1, hex('#fff6c0')); } }
  // el agua: franjas oscuras que se mueven, los reflejos alargados y temblorosos de las luces (las ventanas, las farolas
  // del puente, la luna) y un barquito con sus luces
  for (let y = 98; y < 133; y++) { const fl = y * 320; for (let x = 0; x < 320; x++) { const q = Math.sin(x * 0.11 + y * 0.9 + t * 1.6) + Math.sin(x * 0.033 - t * 0.7 + y * 0.3); B[fl + x] = q > 1.4 ? hex('#26306a') : q > 0.2 ? hex('#141a40') : hex('#0e1232'); } }
  for (let x = 0; x < 320; x += 1) { const ref = [hex('#ffe08a'), hex('#a8d8ff'), hex('#ffe8a0')].includes(B[80 * 320 + x]) || x % 16 === 7; if (!ref) continue;
    for (let y = 99; y < 132; y++) { const w = Math.round(Math.sin(y * 0.8 + t * 3 + x) * 1.2); if (d_umbral(x, y) < 0.55 - (y - 99) / 70 && Math.sin(y * 1.3 + t * 2 + x * 0.3) > -0.2) pset(x + w, y, (y + x) % 3 ? hex('#c8a860') : hex('#ffe8a0')); } }
  for (let y = 99; y < 132; y++) { const w = Math.round(Math.sin(y * 0.7 + t * 2.4) * 2.5 * (y - 98) / 30); if (Math.sin(y * 1.1 + t * 3) > -0.3) { pset(196 + w, y, hex('#d8d0b0')); if (y % 2) pset(197 + w, y, hex('#a8a080')); } }
  { const u = (t * 7) % 400 - 40, bx = Math.round(320 - u), by = 118; if (bx > -12 && bx < 332) { rect(bx - 8, by - 1, bx + 8, by + 1, hex('#1a1a2a')); rect(bx - 6, by - 4, bx + 3, by - 2, hex('#2a2a40')); for (let i = -5; i <= 2; i += 2) pset(i + bx, by - 3, hex('#ffe08a')); pset(bx - 8, by - 5, hex('#ff4040')); pset(bx + 8, by - 2, hex('#40ff60')); for (let i = 9; i < 24; i++) if ((i + Math.floor(t * 6)) % 3) pset(bx + i, by + 1 + (i % 2), hex('#3a4a8a')); } }
  // la luz de las farolas del paseo sobre las losas
  for (const lx of [40, 252]) for (let y = 150; y < 180; y++) { const w = (y - 140) * 1.1; for (let x = Math.round(lx - w); x <= Math.round(lx + w); x++) if (x >= 0 && x < 320 && d_umbral(x, y) < 0.35 * (1 - Math.abs(x - lx) / w)) B[y * 320 + x] = d_mezcla(B[y * 320 + x], hex('#ffd890'), 0.25); }
  return { suelo: 166, paseo: [0, 150, 319, 179], barandilla: [131, 149], puente: { torres: [84, 236], tablero: 92 }, luna: [196, 22], libre: [50, 244] };
}

// por delante de los personajes en 'puente': las dos farolas del paseo con su halo (x 40 y x 252) y un banco de madera
// en la esquina de la derecha (x 276–318)
function d_puenteDelante(R, t, o) {
  const { rect, pset, disco } = R;
  for (const lx of [40, 252]) { rect(lx - 2, 176, lx + 2, 179, hex('#1a1a28')); rect(lx, 112, lx + 1, 176, hex('#2a2a3a')); rect(lx, 112, lx, 176, hex('#4a4a60')); rect(lx - 3, 106, lx + 4, 112, hex('#1a1a28')); rect(lx - 2, 107, lx + 3, 111, hex('#ffe8a0')); rect(lx - 2, 107, lx + 3, 107, hex('#fff8d8'));
    for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j); if (d > 4 && d < 10 && d_umbral(lx + i, 109 + j) < (10 - d) / 14) d_tinte(R, lx + i, 109 + j, hex('#ffd890'), 0.35); } }
  { const bx = 296; rect(bx - 20, 166, bx + 22, 168, hex('#6a4a2a')); rect(bx - 20, 166, bx + 22, 166, hex('#9a7048')); rect(bx - 20, 160, bx + 22, 162, hex('#6a4a2a')); rect(bx - 20, 160, bx + 22, 160, hex('#9a7048')); for (const lx of [bx - 17, bx + 18]) rect(lx, 160, lx + 2, 176, hex('#1a1a28')); }
  return { farolas: [40, 252], banco: [276, 318] };
}

// trama de Bayer 4 × 4 (0–1) para los degradados y las luces tramadas
const E_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_b4 = (x, y) => E_BAYER[((y & 3) << 2) | (x & 3)] / 16;

// mezcla de dos colores (k = 0 el primero, 1 el segundo)
function e_mez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// un fondo fijo: se pinta una vez en un búfer propio y se copia en cada fotograma (sin romper los fundidos)
const e_CACHE = new WeakMap();

function e_fijo(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// un degradado tramado entre varios colores (f da 0–1 en cada punto; por omisión, de arriba abajo)
function e_degradado(R, x0, y0, x1, y1, cols, f) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = f ? f(x, y) : (y - y0) / Math.max(1, y1 - y0); R.pset(x, y, cols[Math.max(0, Math.min(cols.length - 1, Math.floor(u * (cols.length - 1) + e_b4(x, y))))]); }
}

// mancha de luz tramada sobre lo ya pintado (k: fuerza 0–1; forma: función que dice si (x, y) está dentro, con su fuerza)
function e_luz(R, x0, y0, x1, y1, col, f) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const k = f(x, y); if (k > 0) R.pset(x, y, e_mez(R.pget(x, y), col, Math.min(0.85, k))); }
}

// una nube de tres tonos (sombra, cuerpo y luz)
function e_nube(R, cx, cy, w, [cs, cm, cl]) {
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), cs);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f * 0.92), cm);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.62), cl);
  R.linea(Math.round(cx - w * 0.45), Math.round(cy + w * 0.24), Math.round(cx + w * 0.45), Math.round(cy + w * 0.24), cs);
}

const E_CIELO_DIA = pal({ a: '#4a8ad8', b: '#6aa6e8', c: '#8ec0f2', d: '#b8daf8' });

const E_NUBE_DIA = [hex('#b4c8e0'), hex('#e2eef8'), hex('#ffffff')];

// el cielo que se ve por una ventana [x0, y0, x1, y1]: degradado tramado, nubes de tres tonos a tres velocidades, tejados
// lejanos con chimeneas que humean (o.horizonte) y pájaros; todo recortado al hueco
function e_cieloVentana(R, t, x0, y0, x1, y1, o = {}) {
  e_degradado(R, x0, y0, x1, y1, o.cols ?? [E_CIELO_DIA.a, E_CIELO_DIA.b, E_CIELO_DIA.c, E_CIELO_DIA.d]);
  R.recorte([x0, y0, x1, y1]);
  const W = x1 - x0 + 70, alto = y1 - y0, nc = o.nubeCols ?? E_NUBE_DIA;
  for (const [k, fy, w, v] of [[0, 0.16, 15, 1.1], [1, 0.38, 24, 1.9], [2, 0.6, 12, 3.2]]) { const cx = x0 - 35 + ((h(k, 3, 50) * W + t * v * (o.vel ?? 1)) % W); e_nube(R, cx, y0 + fy * alto, w * (o.escNube ?? 1), nc); }
  if (o.horizonte != null) {
    const hz = o.horizonte, cT = o.tejado ?? hex('#7c8cac'), cL = o.tejadoL ?? hex('#a2b2cc'), cW = o.ventanita ?? hex('#c8d4e4');
    for (let x = x0; x <= x1; x++) { const b = Math.floor((x + 400) / 9), hh = 3 + Math.floor(h(b, 1, 51) * 9), pico = (x + 400) % 9;
      const top = hz - hh - (h(b, 2, 51) > 0.6 ? Math.max(0, 2 - Math.abs(pico - 4)) : 0);
      for (let y = top; y <= y1; y++) R.pset(x, y, y === top ? cL : cT);
      if (pico % 3 === 1 && h(b, 3, 51) > 0.3) R.pset(x, top + 3, cW); }
    for (let b = -50; b < 50; b++) { const xc = b * 9 - 400 + 6; if (xc < x0 - 2 || xc > x1 || h(b, 4, 51) < 0.55) continue; const hh = 3 + Math.floor(h(b, 1, 51) * 9), top = hz - hh;
      R.linea(xc, top - 3, xc, top - 1, hex('#8a5a4a')); R.linea(xc + 1, top - 3, xc + 1, top - 1, hex('#6a4a3a'));
      for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k * 0.25 + h(b, 5, 51)) % 1); const px = xc + Math.round(u * 5 + Math.sin(u * 6 + b) * 1), py = top - 4 - Math.round(u * 9); if (e_b4(px, py) < 0.7 - u * 0.5) R.pset(px, py, hex('#e4ecf4')); } }
    // los árboles de delante, que se mecen
    for (let x = x0; x <= x1; x++) { const hh = 3 + Math.round(2.4 * Math.sin(x * 0.5 + Math.sin(t * 1.3 + x * 0.1) * 0.6) + 1.6 * Math.sin(x * 0.17)); for (let y = y1 - hh; y <= y1; y++) R.pset(x, y, y === y1 - hh ? hex('#7ab05a') : (x + y) % 3 ? hex('#4a8a4a') : hex('#3a7040')); }
  }
  const ink = o.pajaro ?? hex('#3a3a4a');
  for (let k = 0; k < 3; k++) { const u = ((t / 8 + k * 0.37) % 1), bx = x0 - 10 + Math.round(u * (x1 - x0 + 20)), by = y0 + 6 + k * 5 + Math.round(Math.sin(t * 1.7 + k) * 2), a = Math.sin(t * 9 + k * 2) > 0;
    R.pset(bx, by, ink); R.pset(bx - 1, by - (a ? 1 : 0), ink); R.pset(bx + 1, by - (a ? 1 : 0), ink); R.pset(bx - 2, by - (a ? 2 : -1), ink); R.pset(bx + 2, by - (a ? 2 : -1), ink); }
  R.recorte(null);
}

// tarima de madera en perspectiva: filas que se ensanchan hacia nosotros, juntas al tresbolillo, vetas y nudos
function e_tarima(R, x0, y0, x1, y1, P, k = 0) {
  let y = y0, alto = 4, fila = 0;
  while (y <= y1) {
    const ya = Math.min(y1, Math.round(y + alto) - 1), largo = 40 + Math.round(alto * 6), off = Math.floor(h(fila, 1, 60 + k) * largo);
    for (let yy = y; yy <= ya; yy++) for (let x = x0; x <= x1; x++) {
      const tabla = Math.floor((x + off) / largo), enT = (x + off) % largo;
      let c = h(tabla, fila, 61 + k) > 0.5 ? P.b : e_mez(P.b, P.v, 0.35);
      if (yy === y) c = P.j; else if (yy === y + 1) c = P.l;
      else if (h(Math.floor((x + off) / 7), yy * 3 + fila, 62 + k) > 0.84) c = P.v;
      if (enT === 0) c = P.j; else if (enT === 1 && yy !== y) c = P.s;
      if (yy > y + 1 && h(tabla, fila, 63 + k) > 0.8 && Math.abs(enT - largo * 0.5) < 2 && yy === Math.round((y + ya) / 2)) c = P.j;   // un nudo
      R.pset(x, yy, c);
    }
    y = ya + 1; alto += 0.7; fila++;
  }
}

// una caja de juego pequeña (frente): borde, color, franja clara arriba, un dibujo simple (sin letras) y la sombra del lomo
const E_CAJAS = ['#e04a3a', '#3a7ae0', '#f0b030', '#4ab86a', '#9a5ad8', '#f07a30', '#30b0c0', '#e8e0d0'].map(hex);

function e_cajita(R, x, y, w, hh, c, k = 0) {
  const { rect, pset } = R;
  rect(x, y, x + w - 1, y + hh - 1, C.k); rect(x + 1, y + 1, x + w - 2, y + hh - 2, c);
  rect(x + 1, y + 1, x + w - 2, y + 2, e_mez(c, hex('#ffffff'), 0.45)); rect(x + w - 2, y + 1, x + w - 2, y + hh - 2, e_mez(c, C.k, 0.35));
  const d = k % 3, cx = x + (w >> 1), cy = y + (hh >> 1) + 1;
  if (w >= 7) { if (d === 0) { pset(cx, cy, hex('#ffffff')); pset(cx - 1, cy, hex('#ffffff')); pset(cx, cy - 1, hex('#ffffff')); }
    else if (d === 1) rect(cx - 1, cy - 1, cx + 1, cy, e_mez(c, C.k, 0.5)); else { pset(cx - 1, cy, hex('#fff2a0')); pset(cx + 1, cy, hex('#fff2a0')); pset(cx, cy - 1, hex('#fff2a0')); } }
  if (hh >= 9) rect(x + 2, y + hh - 3, x + 3, y + hh - 2, hex('#1c1c24'));
}

// cifras de 5 × 7 (para el contador gigante y los relojes digitales)
const E_DIG = [
  ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'], ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'], ['#####', '...#.', '..#..', '...#.', '....#', '#...#', '.###.'],
  ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'], ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
  ['..##.', '.#...', '#....', '####.', '#...#', '#...#', '.###.'], ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'], ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'],
];

// una cifra a escala s, desplazada dy píxeles (para que ruede) y recortada a la franja [ya, yb]
function e_cifra(R, d, x, y, s, c, cL, ya, yb) {
  const f = E_DIG[((d % 10) + 10) % 10];
  for (let j = 0; j < 7; j++) for (let i = 0; i < 5; i++) if (f[j][i] === '#') for (let b = 0; b < s; b++) for (let a = 0; a < s; a++) { const yy = y + j * s + b; if (yy < ya || yy > yb) continue; R.pset(x + i * s + a, yy, j < 3 ? cL : c); }
}

// el coche de policía de juguete en miniatura (15 × 9), para la mesa vista de lejos: carrocería blanca con la franja azul,
// la cabina con sus cristales, faro y piloto, y la barra de luces (o.luces: se alternan rojo y azul con su destello)
function e_cochecito(R, x, yb, dir, t, luces) {
  const { rect, pset } = R, x0 = Math.round(x - 7), y = Math.round(yb), fr = dir > 0 ? x0 + 13 : x0 + 1, tr = dir > 0 ? x0 + 1 : x0 + 13;
  rect(x0 + 1, y - 6, x0 + 13, y - 2, C.k); rect(x0 + 2, y - 5, x0 + 12, y - 3, hex('#f8f8fc')); rect(x0 + 2, y - 3, x0 + 12, y - 3, hex('#c8ccd8'));
  rect(x0 + 2, y - 4, x0 + 12, y - 4, hex('#2a4ab8')); pset(x0 + 7, y - 4, hex('#f8f8fc')); pset(x0 + 7, y - 5, C.k);
  rect(x0 + 4, y - 8, x0 + 10, y - 6, C.k); rect(x0 + 5, y - 7, x0 + 9, y - 6, hex('#8ac0e0')); pset(x0 + 7, y - 7, hex('#f8f8fc')); pset(x0 + 7, y - 6, hex('#f8f8fc')); pset(dir > 0 ? x0 + 9 : x0 + 5, y - 7, hex('#ffffff'));
  pset(fr, y - 4, hex('#fff2a0')); pset(fr, y - 5, hex('#fff2a0')); pset(tr, y - 4, hex('#e83a3a'));
  const on = luces ? Math.floor(t * 6) % 2 : -1;
  rect(x0 + 5, y - 9, x0 + 6, y - 9, on === 0 ? hex('#ff5a4a') : hex('#8a2a2a')); rect(x0 + 8, y - 9, x0 + 9, y - 9, on === 1 ? hex('#5a9aff') : hex('#2a3a8a')); pset(x0 + 7, y - 9, C.k);
  // el destello de la luz encendida: una estrellita de cuatro puntas que late
  if (on >= 0) { const bx = on ? x0 + 9 : x0 + 5, cL = on ? hex('#c8dcff') : hex('#ffc8c0'), l = 1 + (Math.floor(t * 12) % 2);
    pset(bx, y - 9, hex('#ffffff')); for (let k = 1; k <= l; k++) { pset(bx, y - 9 - k, cL); pset(bx - k, y - 9, cL); pset(bx + k, y - 9, cL); } }
  for (const dx of [3, 11]) { rect(x0 + dx - 1, y - 2, x0 + dx + 1, y, C.k); pset(x0 + dx, y - 1, hex('#8a8a96')); }
}
// una lupa: aro, cristal con su brillo y el mango en diagonal
function e_lupa(R, x, y, r, dir = 1) {
  const { disco, linea, pset } = R;
  for (let k = 0; k < r + 4; k++) { linea(x + dir * (r + k), y + r + k, x + dir * (r + k), y + r + k + 2, C.k); pset(x + dir * (r + k), y + r + k + 1, hex('#7a4a2a')); }
  for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) { const d = Math.hypot(i, j); if (d > r + 2) continue;
    if (d > r + 1) pset(x + i, y + j, C.k); else if (d > r - 0.5) pset(x + i, y + j, j < 0 ? hex('#e8e4f0') : hex('#9a96a8'));
    else if ((i + j + 64) % 2 === 0 && e_b4(x + i, y + j) < 0.35) pset(x + i, y + j, e_mez(R.pget(x + i, y + j), hex('#dff4ff'), 0.5)); }
  disco(x - Math.round(r * 0.4), y - Math.round(r * 0.4), Math.max(1, Math.round(r * 0.18)), hex('#ffffff'));
}

const E_ES = pal({
  techo: '#efe4cc', techoS: '#ddd0b2', moldura: '#fbf3e2', molduraS: '#bba984',
  papel: '#a9bf9c', papelR: '#a0b794', papelM: '#93ab88', papelL: '#b8ccaa', papelS: '#8ea582',
  zocalo: '#8a5634', zocaloL: '#b07a4e', zocaloS: '#5e3820', zocaloV: '#7a4a2c',
  marco: '#f2ead8', marcoS: '#b8ac94', cortina: '#d87a4a', cortinaS: '#a8522e', cortinaL: '#f0a070',
  mueble: '#7a4a2a', muebleS: '#4e2e1a', muebleL: '#a06a3e', fondoMueble: '#3a2416',
  mesa: '#c08a56', mesaL: '#e0b07a', mesaS: '#8a5a32', mesaV: '#a87444',
  alfombra: '#a8443e', alfombraS: '#7a2c2a', alfombraL: '#e0a850', alfombraB: '#efe0b8',
});

const E_TARIMA = pal({ b: '#b88552', l: '#d4a06a', s: '#946840', j: '#6e4428', v: '#a67644' });

// papel pintado: rayas finas y rombos pequeños, más oscuro arriba (s = escala)
function e_papel(R, x0, y0, x1, y1, s = 1) {
  const P = E_ES;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const px = x % (12 * s), py = (y + (Math.floor(x / (12 * s)) % 2) * 7 * s) % (14 * s);
    let c = P.papel;
    if (px < s) c = P.papelR; else if (px === s) c = P.papelL;
    else if (Math.abs(px - 6 * s) + Math.abs(py - 7 * s) <= 2 * s) c = Math.abs(px - 6 * s) + Math.abs(py - 7 * s) <= s ? P.papelL : P.papelM;
    if ((y - y0) < 10 * s && e_b4(x, y) > (y - y0) / (10 * s)) c = e_mez(c, P.papelS, 0.6);
    R.pset(x, y, c);
  }
}

// zócalo de cuarterones de madera, con luz arriba a la izquierda y sombra abajo a la derecha
function e_cuarterones(R, x0, y0, x1, y1, ancho, P = E_ES) {
  const { rect, pset } = R;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, h(x >> 2, y, 64) > 0.86 ? P.zocaloV : P.zocalo);
  rect(x0, y0, x1, y0 + 1, P.zocaloL); rect(x0, y0 + 2, x1, y0 + 2, P.zocaloS);
  for (let x = x0 + 3; x + ancho - 4 <= x1; x += ancho) { const a = x, b = x + ancho - 6, c0 = y0 + 5, c1 = y1 - 4;
    rect(a, c0, b, c0, P.zocaloS); rect(a, c0, a, c1, P.zocaloS); rect(a + 1, c1, b, c1, P.zocaloL); rect(b, c0 + 1, b, c1, P.zocaloL);
    for (let y = c0 + 2; y < c1 - 1; y++) if (h(a, y, 65) > 0.7) pset(a + 2 + Math.floor(h(a, y, 66) * (b - a - 4)), y, P.zocaloV); }
  rect(x0, y1 - 2, x1, y1, P.zocaloS);
}

// la estantería de juegos (x0–x1, y0 arriba, y1 en el suelo): lomos sin letras, la consola, figuritas y un trofeo
function e_estanteria(R, x0, y0, x1, y1, k = 0, s = 1) {
  const { rect, pset, disco } = R, P = E_ES;
  rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1, P.mueble); rect(x0 + 1, y0 + 1, x0 + 1, y1, P.muebleL); rect(x1 - 2, y0 + 1, x1 - 1, y1, P.muebleS);
  rect(x0 - 2, y0 - 2, x1 + 2, y0, C.k); rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, P.muebleL);
  const lx0 = x0 + 4, lx1 = x1 - 4, alto = Math.round(18 * s);
  for (let yb = y0 + 3 + alto, n = 0; yb < y1 - 3; yb += alto + 3, n++) {
    rect(lx0, yb - alto, lx1, yb, P.fondoMueble); for (let y = yb - alto; y < yb; y += 3) for (let x = lx0; x <= lx1; x++) if (h(x >> 3, y, 67) > 0.92) pset(x, y, P.muebleS);
    let x = lx0 + 1; const tipo = (n + k) % 3;
    while (x < lx1 - 2) {
      const r = h(x, n, 68 + k);
      if (tipo === 1 && x > lx0 + 8 && x < lx0 + 12) {   // la consola sin marca, con su ranura y su piloto
        const w = Math.round(24 * s), hh = Math.round(7 * s); rect(x, yb - hh, x + w, yb - 1, C.k); rect(x + 1, yb - hh + 1, x + w - 1, yb - 1, hex('#d8d8e0')); rect(x + 1, yb - hh + 1, x + w - 1, yb - hh + 1, hex('#f4f4f8'));
        rect(x + 3, yb - 4, x + w - 8, yb - 4, hex('#6a6a7a')); rect(x + w - 5, yb - 4, x + w - 4, yb - 3, hex('#4ae06a'));
        const mx = x + w + 3; rect(mx, yb - 4, mx + 9, yb - 1, C.k); rect(mx + 1, yb - 3, mx + 8, yb - 2, hex('#4a4a5a')); pset(mx + 2, yb - 3, hex('#e04a4a')); pset(mx + 7, yb - 3, hex('#4a8ae0')); x = mx + 12; continue; }
      if (tipo === 2 && r < 0.12) {   // un trofeo pequeño
        rect(x + 1, yb - 3, x + 5, yb - 1, hex('#8a6a2a')); rect(x + 2, yb - 9, x + 4, yb - 4, hex('#f0c040')); pset(x + 1, yb - 9, hex('#f0c040')); pset(x + 5, yb - 9, hex('#f0c040')); pset(x + 2, yb - 8, hex('#fff2a0')); x += 8; continue; }
      if (r < 0.2 && x < lx1 - 10) {   // una pila de cajas tumbadas
        for (let j = 0; j < 3; j++) { const c = E_CAJAS[Math.floor(h(x, j, 69) * 8)]; rect(x, yb - 3 * (j + 1), x + 8, yb - 3 * j - 1, C.k); rect(x + 1, yb - 3 * (j + 1) + 1, x + 7, yb - 3 * j - 2, c); }
        x += 11; continue; }
      if (r > 0.93 && x < lx1 - 6) {   // un bichito de juguete
        disco(x + 3, yb - 4, 3, hex('#3aa84a')); rect(x + 1, yb - 9, x + 5, yb - 7, hex('#2a7a3a')); pset(x + 2, yb - 5, hex('#ffffff')); pset(x + 4, yb - 5, hex('#ffffff')); x += 8; continue; }
      const w = 3 + Math.floor(h(x, n, 70) * 2), hh = alto - 3 - Math.floor(h(x, n, 71) * 4), c = E_CAJAS[Math.floor(h(x, n, 72 + k) * 8)];
      rect(x, yb - hh, x + w, yb - 1, C.k); rect(x + 1, yb - hh + 1, x + w - 1, yb - 1, c); rect(x + 1, yb - hh + 3, x + w - 1, yb - hh + 3, e_mez(c, hex('#ffffff'), 0.5));
      rect(x + 1, yb - 4, x + w - 1, yb - 3, e_mez(c, C.k, 0.4)); pset(x + 1, yb - hh + 1, e_mez(c, hex('#ffffff'), 0.6));
      x += w + 1;
    }
    rect(lx0 - 1, yb, lx1 + 1, yb + 2, P.mueble); rect(lx0 - 1, yb, lx1 + 1, yb, P.muebleL); rect(lx0 - 1, yb + 2, lx1 + 1, yb + 2, P.muebleS);
  }
}

// el fondo fijo del estudio (general)
function e_estudioFondo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = E_ES;
  // el techo y la moldura
  for (let y = 0; y <= 13; y++) for (let x = 0; x < 320; x++) pset(x, y, e_b4(x, y) < y / 14 * 0.5 ? P.techoS : P.techo);
  rect(0, 14, 319, 14, P.molduraS); rect(0, 15, 319, 16, P.moldura); rect(0, 17, 319, 17, P.molduraS); for (let x = 2; x < 320; x += 6) pset(x, 16, P.molduraS);
  e_papel(R, 0, 18, 319, 83);
  rect(0, 84, 319, 85, P.zocaloL); e_cuarterones(R, 0, 86, 319, 117, 30);
  e_tarima(R, 0, 118, 319, 179, E_TARIMA);
  // el haz de sol de la ventana sobre el suelo y la pared
  e_luz(R, 0, 118, 200, 179, hex('#fff4d0'), (x, y) => { const u = (y - 118) / 61, a = 22 + u * 64, b = 88 + u * 92; return x > a && x < b && e_b4(x, y) < 0.55 ? 0.28 : 0; });
  // la alfombra con dibujo bajo la mesa
  for (let y = 146; y <= 176; y++) for (let x = 40; x <= 290; x++) {
    const u = (x - 165) / 125, v = (y - 161) / 15, d = u * u + v * v; if (d > 1) continue;
    let c = P.alfombra; if (d > 0.84) c = P.alfombraS; else if (d > 0.72) c = (Math.floor(x / 3) + y) % 2 ? P.alfombraL : P.alfombra; else if (d > 0.62) c = P.alfombraB;
    else if (Math.abs(((x * 0.5 + y) % 12) - 6) < 1 && Math.abs(((x * 0.5 - y + 400) % 12) - 6) < 1) c = P.alfombraL;
    else if (h(x, y, 73) > 0.9) c = P.alfombraS;
    pset(x, y, c); }
  // la ventana: marco, alféizar y cortinas con pliegues
  rect(16, 24, 84, 80, P.marcoS); rect(17, 25, 83, 79, P.marco); rect(14, 80, 86, 83, C.k); rect(15, 80, 85, 81, P.marco); rect(15, 82, 85, 82, P.marcoS);
  rect(6, 20, 94, 21, hex('#6a4a3a')); disco(6, 20, 2, hex('#c8a040')); disco(94, 20, 2, hex('#c8a040'));
  for (const [a, b] of [[6, 22], [78, 94]]) for (let y = 22; y <= 100; y++) { const ens = y > 70 ? Math.round((y - 70) * 0.12) : 0; for (let x = a - (a < 50 ? 0 : ens); x <= b + (a < 50 ? ens : 0); x++) { const f = Math.sin((x - a) * 0.9); pset(x, y, f > 0.55 ? P.cortinaL : f < -0.45 ? P.cortinaS : P.cortina); } }
  for (const x of [12, 86]) { rect(x - 3, 64, x + 3, 65, hex('#c8a040')); }
  // una maceta pequeña en el alféizar
  rect(26, 74, 33, 79, C.k); rect(27, 75, 32, 79, hex('#c86a3a')); rect(27, 75, 32, 75, hex('#e88a5a')); for (const [dx, dy] of [[-2, -4], [0, -6], [2, -5], [4, -3], [-3, -2]]) linea(29, 74, 29 + dx, 74 + dy, hex('#4a9a4a'));
  // el póster sin letras: un coche a contraluz bajo un atardecer a rayas
  { const x0 = 104, y0 = 28, x1 = 134, y1 = 72; rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k);
    e_degradado(R, x0, y0, x1, y0 + 26, [hex('#2a2a6a'), hex('#8a3a8a'), hex('#e85a6a'), hex('#f8a04a')]);
    disco(119, y0 + 24, 7, hex('#ffd060')); for (let y = y0 + 19; y < y0 + 26; y += 2) rect(112, y, 126, y, hex('#f87a5a'));
    rect(x0, y0 + 27, x1, y1 - 9, hex('#2a1e3a')); for (let x = x0; x <= x1; x++) if ((x - x0) % 6 < 3) pset(x, y0 + 32, hex('#f0c040'));
    rect(108, y0 + 22, 128, y0 + 26, hex('#1c1424')); rect(112, y0 + 19, 123, y0 + 22, hex('#1c1424')); disco(112, y0 + 27, 2, hex('#1c1424')); disco(124, y0 + 27, 2, hex('#1c1424'));
    for (const [sx, sy] of [[107, 31], [130, 33], [116, 30], [125, 36]]) pset(sx, sy, hex('#ffffff'));
    rect(x0, y1 - 8, x1, y1, hex('#f2ead8')); rect(x0 + 3, y1 - 6, x1 - 8, y1 - 5, hex('#2a1e3a')); rect(x0 + 3, y1 - 3, x1 - 14, y1 - 3, hex('#8a7a8a'));
    for (const [cx, cy] of [[x0 + 1, y0 + 1], [x1 - 1, y0 + 1]]) { disco(cx, cy, 1, hex('#e04a4a')); } }
  // la estantería de juegos
  e_estanteria(R, 194, 26, 266, 117, 0);
  // una planta en lo alto de la estantería y una maqueta de coche
  rect(200, 18, 207, 24, C.k); rect(201, 19, 206, 24, hex('#4a7ae0')); for (const [dx, dy] of [[-4, -5], [-1, -8], [2, -7], [5, -4], [7, -1], [-5, -1]]) { linea(203, 18, 203 + dx, 18 + dy, hex('#3a8a4a')); pset(203 + dx, 18 + dy, hex('#6ac06a')); }
  rect(226, 19, 244, 23, C.k); rect(227, 20, 243, 22, hex('#d83a3a')); rect(231, 16, 239, 19, C.k); rect(232, 17, 238, 19, hex('#8ac0e0')); disco(230, 24, 2, C.k); disco(240, 24, 2, C.k); rect(227, 20, 243, 20, hex('#f07a6a'));
  // la lámpara de pie (la pantalla con su luz va en cada fotograma) y la planta grande
  rect(287, 60, 288, 116, hex('#3a3a44')); rect(282, 115, 293, 117, C.k); rect(283, 115, 292, 115, hex('#6a6a7a'));
  rect(298, 100, 314, 117, C.k); rect(299, 101, 313, 117, hex('#d8784a')); rect(299, 101, 313, 102, hex('#f09a6a')); rect(311, 103, 313, 117, hex('#a8522e'));
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.32, l = 14 + (k % 3) * 5, ex = 306 + Math.cos(a) * l, ey = 100 + Math.sin(a) * l; linea(306, 100, ex, ey, hex('#2e6a3a')); disco(ex, ey, 2, k % 2 ? hex('#4a9a4a') : hex('#3a8040')); pset(ex - 1, ey - 1, hex('#8ad07a')); }
  // la mesa: tablero en perspectiva, canto, patas y su sombra en la alfombra
  for (let y = 152; y <= 158; y++) for (let x = 92; x <= 244; x++) if (e_b4(x, y) < 0.5) pset(x, y, e_mez(R.pget(x, y), C.k, 0.3));
  for (const [x, y0] of [[100, 140], [228, 140]]) { rect(x - 1, y0, x + 2, 150, C.k); rect(x, y0, x + 1, 150, P.mesaS); }
  poligono([[96, 128], [232, 128], [240, 140], [88, 140]], (x, y) => (h(x >> 3, y, 74) > 0.8 ? P.mesaV : y < 130 ? P.mesaS : (x + y * 3) % 23 === 0 ? P.mesaV : P.mesa));
  linea(96, 128, 232, 128, C.k); linea(96, 129, 232, 129, P.mesaL); linea(88, 140, 96, 128, C.k); linea(240, 140, 232, 128, C.k);
  rect(87, 141, 241, 145, C.k); rect(88, 141, 240, 144, P.mesaS); rect(88, 141, 240, 141, P.mesaL); for (let x = 96; x < 238; x += 34) rect(x, 142, x, 144, hex('#6a4024'));
  for (const x of [90, 236]) { rect(x - 1, 145, x + 3, 159, C.k); rect(x, 145, x + 2, 158, P.mesaS); rect(x, 145, x, 158, P.mesaL); }
  // lo de encima de la mesa (fijo): la pila de cajas, el mando y la base del flexo
  e_cajita(R, 216, 120, 9, 11, E_CAJAS[0], 0); e_cajita(R, 222, 122, 9, 11, E_CAJAS[1], 1);
  rect(150, 137, 160, 140, C.k); rect(151, 138, 159, 139, hex('#4a4a5a')); pset(152, 138, hex('#e04a4a')); pset(157, 138, hex('#4ae06a')); rect(149, 139, 150, 140, C.k); rect(160, 139, 161, 140, C.k);
  rect(102, 129, 110, 131, C.k); rect(103, 129, 109, 130, hex('#3a6ac8'));
  linea(106, 129, 101, 116, C.k); linea(107, 129, 102, 116, hex('#5a8ae8')); linea(101, 116, 110, 109, C.k); linea(102, 116, 111, 109, hex('#5a8ae8'));
}

function e_estudio(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, P = E_ES;
  e_fijo(R, 'gtE-estudio', () => e_estudioFondo(R));
  // la ventana: el cielo vivo y el parteluz encima
  e_cieloVentana(R, t, 18, 26, 82, 78, { horizonte: 70 });
  rect(49, 26, 51, 78, P.marco); rect(51, 26, 51, 78, P.marcoS); rect(18, 51, 82, 53, P.marco); rect(18, 53, 82, 53, P.marcoS);
  for (let k = 0; k < 6; k++) pset(20 + k, 33 - k, hex('#ffffff')); for (let k = 0; k < 4; k++) pset(56 + k, 60 - k, hex('#ffffff'));
  // las motas de polvo en el haz de luz
  for (let k = 0; k < 14; k++) { const u = (h(k, 1, 75) + t * 0.03 * (1 + k % 3)) % 1, y = 90 + Math.round(u * 60), x = Math.round(30 + (y - 90) * 0.9 + h(k, 2, 75) * 50 + Math.sin(t + k) * 3); if (Math.sin(t * 2 + k * 1.7) > -0.3) pset(x, y, hex('#fff8e0')); }
  // el reloj de pared, que anda
  { const cx = 158, cy = 42; disco(cx, cy, 10, C.k); disco(cx, cy, 9, hex('#c8a040')); disco(cx, cy, 8, hex('#fbf6ea')); disco(cx + 1, cy + 1, 6, hex('#f0e8d4'));
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(cx + Math.cos(a) * 6.6), Math.round(cy + Math.sin(a) * 6.6), k % 3 ? hex('#a89c80') : C.k); }
    const am = t * 0.1 - 1.2, ah = t * 0.008 + 0.9, as = t * 2 * Math.PI / 6;
    linea(cx, cy, Math.round(cx + Math.cos(ah) * 3.5), Math.round(cy + Math.sin(ah) * 3.5), C.k); linea(cx, cy, Math.round(cx + Math.cos(am) * 5.5), Math.round(cy + Math.sin(am) * 5.5), C.k);
    linea(cx, cy, Math.round(cx + Math.cos(as) * 6), Math.round(cy + Math.sin(as) * 6), hex('#d83a3a')); pset(cx, cy, hex('#c8a040')); }
  // el piloto de la consola de la estantería, que respira
  if (Math.sin(t * 2.5) > -0.2) { pset(242, 62, hex('#8aff9a')); }
  // la lámpara de pie: su pantalla y su halo cálido
  e_luz(R, 270, 54, 306, 90, hex('#fff2cc'), (x, y) => { const d = Math.hypot((x - 288) / 18, (y - 62) / 26); return d < 1 && e_b4(x, y) < 1 - d ? 0.3 : 0; });
  for (let y = 50; y <= 61; y++) { const w = 4 + Math.round((y - 50) * 0.5); rect(288 - w, y, 288 + w, y, y === 50 || y === 61 ? C.k : (y < 53 ? hex('#fff0c0') : hex('#f4d890'))); pset(288 - w, y, C.k); pset(288 + w, y, C.k); }
  // el flexo de la mesa: la pantalla y su luz sobre el tablero
  e_luz(R, 96, 112, 140, 140, hex('#fff4d4'), (x, y) => { const d = Math.hypot((x - 116) / 22, (y - 131) / 9); return d < 1 && y > 111 && e_b4(x, y) < 1.1 - d ? 0.32 : 0; });
  rect(108, 107, 117, 110, C.k); rect(109, 108, 116, 109, hex('#3a6ac8')); rect(110, 110, 115, 111, hex('#fff6c0'));
  // la taza que humea y el bichito de juguete que se balancea
  rect(204, 131, 208, 135, C.k); rect(205, 132, 207, 135, hex('#f4f4f8')); pset(209, 133, C.k);
  for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; const sx = 206 + Math.round(Math.sin(u * 6 + k) * 1.4), sy = 130 - Math.round(u * 9); if (e_b4(sx, sy) < 0.8 - u * 0.6) pset(sx, sy, hex('#f8f8ff')); }
  { const b = Math.round(Math.sin(t * 3) * 1), bx = 192 + b, by = 134; disco(bx, by - 3, 3, hex('#3aa84a')); rect(bx - 2, by - 8, bx + 2, by - 6, hex('#2a7a3a')); pset(bx - 1, by - 4, hex('#ffffff')); pset(bx + 1, by - 4, hex('#ffffff')); pset(bx - 1, by - 3, C.k); pset(bx + 1, by - 3, C.k); pset(bx - 2, by, C.k); pset(bx + 2, by, C.k); }
  // el coche de policía de juguete por el tablero
  const vel = o.vueltas ?? (o.coche === 'atom' ? 2.1 : 1.5);
  const ruta = (tt) => { const a = tt * vel; return { x: Math.round(164 + Math.cos(a) * 46), y: Math.round(136 + Math.sin(a) * 3), dir: -Math.sin(a) >= 0 ? 1 : -1 }; };
  const c = o.coche === 'para' || o.coche == null ? { x: 132, y: 138, dir: 1 } : ruta(t);
  // el coche se lee de lejos: su sombra en el tablero y, con las luces, el resplandor rojo y azul que se refleja en el barniz
  { const luces = o.coche != null && o.coche !== 'para';
    for (let i = -7; i <= 7; i++) for (let j = 0; j <= 1; j++) if (Math.abs(i) < 7 - j * 2 && c.y + 1 + j <= 140) pset(c.x + i, c.y + 1 + j, e_mez(R.pget(c.x + i, c.y + 1 + j), C.k, 0.45 - j * 0.15));
    if (luces) { const col = Math.floor(t * 6) % 2 ? hex('#5a8aff') : hex('#ff4a3a');
      e_luz(R, c.x - 22, c.y - 22, c.x + 22, Math.min(140, c.y + 3), col, (x, y) => { const d = Math.hypot((x - c.x) / 22, (y - c.y + 4) / (y < 129 ? 18 : 7)); return d < 1 && e_b4(x, y) < 1.05 - d ? (y < 129 ? 0.22 : 0.45) : 0; });
      // el reflejo en la mesa: la silueta del coche al revés y sus luces estiradas en el barniz
      for (let i = -5; i <= 5; i++) if (c.y + 2 <= 140 && e_b4(c.x + i, c.y + 2) < 0.6) pset(c.x + i, c.y + 2, e_mez(R.pget(c.x + i, c.y + 2), hex('#e8ecf4'), 0.35));
      for (let k = 0; k < 3; k++) if (c.y + 2 + k <= 140) pset(c.x + (Math.floor(t * 6) % 2 ? 2 : -2), c.y + 2 + k, e_mez(R.pget(c.x, c.y + 2 + k), col, 0.7 - k * 0.2)); } }
  e_cochecito(R, c.x, c.y, c.dir, t, o.coche != null && o.coche !== 'para');
  return { suelo: 162, mesa: { x0: 88, x1: 240, y: 136, yAtras: 129, yDelante: 140 }, coche: c, ruta, ventana: [18, 26, 82, 78], reloj: [158, 42], estanteria: [194, 26, 266, 117] };
}
// lo de delante en el estudio: el baúl de juguetes (abajo a la izquierda) y las hojas de una planta (abajo a la derecha)
function e_estudioDelante(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, P = E_ES;
  rect(0, 154, 30, 179, C.k); rect(0, 155, 29, 179, P.mueble); rect(0, 155, 29, 156, P.muebleL); rect(0, 166, 29, 167, P.muebleS); rect(27, 157, 29, 179, P.muebleS);
  rect(12, 160, 17, 163, hex('#c8a040')); pset(14, 161, C.k);
  disco(8, 152, 4, hex('#e04a4a')); disco(7, 151, 2, hex('#f8a0a0')); rect(18, 148, 26, 154, C.k); rect(19, 149, 25, 153, hex('#f0b030')); rect(19, 149, 25, 149, hex('#fff2a0'));
  for (let k = 0; k < 6; k++) { const a = -2.2 + k * 0.28 + Math.sin(t * 1.2 + k) * 0.05, l = 18 + (k % 3) * 6, ex = 318 + Math.cos(a) * l, ey = 182 + Math.sin(a) * l; linea(318, 182, ex, ey, hex('#245a2e')); disco(ex, ey, 3, k % 2 ? hex('#3a8040') : hex('#2e6a36')); pset(ex - 1, ey - 2, hex('#7ac06a')); }
  return {};
}

const E_MESA = pal({ b: '#c48c58', l: '#e4b47e', s: '#94643a', j: '#6e4428', v: '#ac7848' });

function e_mesaFondo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = E_ES;
  for (let y = 0; y <= 8; y++) for (let x = 0; x < 320; x++) pset(x, y, e_b4(x, y) < 0.3 ? P.techoS : P.techo);
  rect(0, 9, 319, 9, P.molduraS); rect(0, 10, 319, 12, P.moldura); rect(0, 13, 319, 13, P.molduraS);
  e_papel(R, 0, 14, 319, 63, 2);
  rect(0, 64, 319, 66, P.zocaloL); e_cuarterones(R, 0, 67, 319, 95, 52);
  // la ventana de cerca (el cielo va en cada fotograma) con su cortina
  rect(4, 16, 74, 60, P.marcoS); rect(5, 17, 73, 59, P.marco); rect(2, 60, 76, 64, C.k); rect(3, 60, 75, 62, P.marco);
  for (let y = 14; y <= 66; y++) for (let x = 76; x <= 90; x++) { const f = Math.sin((x - 76) * 0.8); pset(x, y, f > 0.55 ? P.cortinaL : f < -0.45 ? P.cortinaS : P.cortina); }
  // la estantería de cerca (solo dos baldas asoman)
  e_estanteria(R, 172, 24, 262, 95, 1, 1.25);
  // el tablero: tarima de mesa con vetas, más ancha hacia nosotros
  e_tarima(R, 0, 96, 319, 179, E_MESA, 9);
  rect(0, 94, 319, 95, C.k); rect(0, 96, 319, 96, hex('#f0c48e'));
  // la alfombrilla de carreras: fieltro verde con borde cosido
  const cx = 160, cy = 140;
  for (let y = 104; y <= 176; y++) { const u = (y - 104) / 72, a = Math.round(36 - u * 22), b = Math.round(284 + u * 22);
    for (let x = a; x <= b; x++) { let c = (h(x >> 1, y >> 1, 76) > 0.85) ? hex('#4a9a52') : hex('#5aac5e'); if (y === 104 || y === 176 || x === a || x === b) c = hex('#2e6a36'); else if ((y === 106 || y === 174 || x === a + 2 || x === b - 2) && (x + y) % 3 === 0) c = hex('#f4e8c0'); pset(x, y, c); } }
  for (let x = 36; x <= 306; x++) if (e_b4(x, 177) < 0.6) pset(x, 177, e_mez(R.pget(x, 177), C.k, 0.4));
  // la pista ovalada: asfalto de juguete, bordillos rojos y blancos y la línea discontinua
  for (let y = 108; y <= 172; y++) for (let x = 30; x <= 290; x++) {
    const d = Math.hypot((x - cx) / 118, (y - cy) / 30), di = Math.hypot((x - cx) / 92, (y - cy) / 16);
    if (d <= 1 && di >= 1) { const dm = Math.hypot((x - cx) / 105, (y - cy) / 23);
      let c = (x * 7 + y * 13) % 11 === 0 ? hex('#5a5c66') : hex('#6a6c76');
      if (d > 0.96) c = Math.floor(Math.atan2(y - cy, x - cx) * 18) % 2 ? hex('#e04a4a') : hex('#f4f4f4');
      else if (di < 1.05) c = Math.floor(Math.atan2(y - cy, x - cx) * 14) % 2 ? hex('#e04a4a') : hex('#f4f4f4');
      else if (Math.abs(dm - 1) < 0.03 && Math.floor(Math.atan2(y - cy, x - cx) * 9) % 2) c = hex('#f8e070');
      pset(x, y, c); } }
  // la isla: hierba con caminitos y un estanque
  for (let y = 126; y <= 154; y++) for (let x = 70; x <= 250; x++) { const di = Math.hypot((x - cx) / 92, (y - cy) / 16); if (di >= 0.95) continue; if (h(x >> 1, y, 77) > 0.9) pset(x, y, hex('#7ac06a')); }
  for (let y = 136; y <= 144; y++) for (let x = 186; x <= 214; x++) if (Math.hypot((x - 200) / 14, (y - 140) / 4.5) < 1) pset(x, y, (x + y) % 5 ? hex('#4a8ad8') : hex('#8ac0f0'));
  linea(96, 140, 186, 140, hex('#d8c08a'));
}

// los juguetes de la isla, por orden de profundidad: [x, base y, tipo, color]
const E_ISLA = [[100, 134, 'casa', 0], [124, 132, 'arbol', 0], [146, 133, 'casa', 1], [172, 131, 'farola', 0], [228, 134, 'arbol', 1], [116, 147, 'arbol', 2], [138, 150, 'casa', 2], [168, 149, 'cono', 0], [222, 148, 'casa', 3], [244, 144, 'cono', 1], [192, 152, 'farola', 1]];

function e_juguete(R, x, yb, tipo, k, t) {
  const { rect, pset, disco, poligono } = R;
  if (tipo === 'casa') { const c = E_CAJAS[[0, 1, 5, 2][k]], w = 14;
    rect(x - 7, yb - 10, x + 7, yb, C.k); rect(x - 6, yb - 9, x + 6, yb - 1, hex('#f0dcb0')); rect(x + 4, yb - 9, x + 6, yb - 1, hex('#d0b88a'));
    poligono([[x - 9, yb - 9], [x + 9, yb - 9], [x, yb - 17]], C.k); poligono([[x - 7, yb - 10], [x + 7, yb - 10], [x, yb - 16]], c); poligono([[x, yb - 16], [x + 7, yb - 10], [x, yb - 10]], e_mez(c, C.k, 0.3));
    rect(x - 4, yb - 7, x - 2, yb - 5, hex('#8ac0e0')); rect(x + 1, yb - 6, x + 3, yb - 1, hex('#8a5a3a')); if (w) pset(x - 3, yb - 7, hex('#ffffff')); }
  else if (tipo === 'arbol') { const s = Math.sin(t * 1.5 + k) * 0.6; rect(x - 1, yb - 6, x + 1, yb, hex('#6a4024')); disco(x + s, yb - 10, 6, C.k); disco(x + s, yb - 10, 5, hex('#3a9a4a')); disco(x - 1 + s, yb - 12, 3, hex('#6ac06a')); pset(x - 2 + s, yb - 13, hex('#aae09a')); }
  else if (tipo === 'farola') { rect(x, yb - 14, x, yb, hex('#3a3a44')); rect(x, yb - 14, x + 3, yb - 14, hex('#3a3a44')); pset(x + 3, yb - 13, Math.sin(t * 2 + k) > -0.6 ? hex('#fff2a0') : hex('#c8a040')); rect(x - 1, yb, x + 1, yb, C.k); }
  else { poligono([[x - 4, yb], [x + 4, yb], [x, yb - 9]], C.k); poligono([[x - 3, yb - 1], [x + 3, yb - 1], [x, yb - 8]], hex('#f07a30')); rect(x - 2, yb - 5, x + 2, yb - 5, hex('#ffffff')); }
}

function e_mesa(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R;
  e_fijo(R, 'gtE-mesa', () => e_mesaFondo(R));
  e_cieloVentana(R, t, 6, 18, 72, 58, { horizonte: 54, escNube: 1.2 });
  rect(38, 18, 40, 58, E_ES.marco); rect(40, 18, 40, 58, E_ES.marcoS); for (let k = 0; k < 7; k++) pset(10 + k, 30 - k, hex('#ffffff'));
  // el flexo: brazo, pantalla y su cono de luz sobre la alfombrilla
  e_luz(R, 6, 98, 120, 160, hex('#fff2c8'), (x, y) => { const d = Math.hypot((x - 46) / 64, (y - 116) / 30); return d < 1 && e_b4(x, y) < 0.7 - d * 0.5 ? 0.35 : 0; });
  rect(14, 104, 30, 108, C.k); rect(15, 104, 29, 106, hex('#3a6ac8')); rect(15, 104, 29, 104, hex('#7aa6f0'));
  linea(22, 104, 14, 72, C.k); linea(23, 104, 15, 72, hex('#5a8ae8')); disco(15, 72, 2, C.k); linea(15, 72, 36, 58, C.k); linea(16, 72, 37, 58, hex('#5a8ae8'));
  poligono([[32, 54], [46, 60], [42, 68], [28, 62]], C.k); poligono([[33, 56], [45, 61], [42, 66], [30, 61]], hex('#3a6ac8')); linea(30, 62, 41, 67, hex('#fff6c0'));
  // la taza que humea
  rect(64, 92, 78, 108, C.k); rect(65, 93, 77, 107, hex('#f4f4f8')); rect(74, 93, 77, 107, hex('#c8ccd8')); rect(65, 93, 77, 94, hex('#6a3a1a')); rect(78, 96, 81, 104, C.k); rect(78, 98, 79, 102, hex('#f4f4f8'));
  rect(67, 99, 72, 101, hex('#e04a4a'));
  for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1, sx = 71 + Math.round(Math.sin(u * 7 + k) * 2.5), sy = 90 - Math.round(u * 26); if (e_b4(sx, sy) < 0.85 - u * 0.7) { pset(sx, sy, hex('#ffffff')); pset(sx + 1, sy, hex('#eef2fa')); } }
  // las cajas de juego y el bichito que anda en el sitio
  PIEZAS_GT.cajaJuego?.(R, 238, 110, { color: '#3a7ae0' }); PIEZAS_GT.cajaJuego?.(R, 258, 108, { color: '#e04a3a' });
  PIEZAS_GT.bichito?.(R, 292, 112, { anda: true, t });
  // el móvil sobre la mesa, que se enciende de vez en cuando
  { const on = (t % 6) < 1.6; rect(286, 156, 312, 170, C.k); rect(287, 157, 311, 169, on ? hex('#4a8ae0') : hex('#1c1c2a')); if (on) { rect(290, 160, 300, 161, hex('#ffffff')); rect(290, 164, 306, 164, hex('#c8e0ff')); disco(307, 160, 1, hex('#4ae06a')); } pset(288, 158, hex('#8a8aa0')); }
  // los juguetes de la isla y el coche (por profundidad)
  const vel = o.vueltas ?? (o.coche === 'atom' ? 1.4 : 1.0);
  const ruta = (tt) => { const a = tt * vel; return { x: Math.round(160 + Math.cos(a) * 105), y: Math.round(140 + Math.sin(a) * 23 + 6), dir: -Math.sin(a) >= 0 ? 1 : -1 }; };
  const c = o.coche === 'para' || o.coche == null ? { x: 112, y: 168, dir: 1 } : ruta(t);
  const luces = o.coche != null && o.coche !== 'para';
  let hecho = false;
  for (const [x, yb, tipo, k] of E_ISLA) { if (!hecho && yb > c.y) { PIEZAS_GT.cochePolicia?.(R, c.x, c.y, { dir: c.dir, t: luces ? t : null }); hecho = true; } e_juguete(R, x, yb, tipo, k, t); }
  if (!hecho) PIEZAS_GT.cochePolicia?.(R, c.x, c.y, { dir: c.dir, t: luces ? t : null });
  // los conos de fuera de la pista y los dados
  e_juguete(R, 40, 118, 'cono', 2, t); e_juguete(R, 284, 124, 'cono', 3, t);
  return { suelo: 146, mesa: { y: 96 }, pista: { cx: 160, cy: 146, rx: 105, ry: 23 }, coche: c, ruta, ventana: [6, 18, 72, 58] };
}

// lo de delante en la mesa de cerca: el mando sin marca y los dados en el borde del tablero
function e_mesaDelante(R, t, o = {}) {
  const { rect, pset, disco } = R;
  for (let y = 162; y <= 180; y++) for (let x = 20; x <= 76; x++) { const u = (x - 48) / 28, v = (y - 172) / 9; const d = Math.min(Math.hypot((x - 32) / 13, v), Math.hypot((x - 64) / 13, v), Math.abs(u) < 0.6 && Math.abs(v) < 0.8 ? 0 : 9); if (d > 1) continue; pset(x, y, d > 0.86 ? C.k : y < 167 ? hex('#5a5a6c') : hex('#3e3e4c')); }
  rect(28, 169, 36, 171, hex('#22222c')); rect(31, 166, 33, 174, hex('#22222c'));
  for (const [x, y, c] of [[60, 168, '#e04a4a'], [66, 171, '#4a8ae0'], [60, 174, '#4ae06a'], [54, 171, '#f0c040']]) { disco(x, y, 2, C.k); pset(x, y, hex(c)); pset(x - 1, y - 1, hex(c)); }
  rect(44, 166, 46, 167, hex('#8a8aa0')); rect(50, 166, 52, 167, hex('#8a8aa0'));
  for (const [x, y, n] of [[262, 166, 5], [274, 170, 3]]) { rect(x, y, x + 9, y + 9, C.k); rect(x + 1, y + 1, x + 8, y + 8, hex('#f8f4ec')); rect(x + 7, y + 1, x + 8, y + 8, hex('#d8d0c0'));
    const p = n === 5 ? [[2, 2], [6, 2], [4, 4], [2, 6], [6, 6]] : [[2, 2], [4, 4], [6, 6]]; for (const [i, j] of p) pset(x + i, y + j, hex('#c83a3a')); }
  return {};
}

const E_RE = pal({ pared: '#2a3e74', paredL: '#34488a', paredS: '#1e2c58', oro: '#e8b840', oroL: '#fff0a0', oroS: '#9a7020',
  marmol: '#e4e0ea', marmolS: '#c4c0d0', marmolV: '#b0aac4', marmolO: '#3a3a5a', marmolOL: '#4e4e70', viga: '#4a4e5e', vigaL: '#7a7e90', vigaS: '#2e3040', alfombra: '#c8303a', alfombraS: '#8a1e26' });

function e_recordsFondo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = E_RE;
  // la pared con pilastras doradas y un friso de rombos
  for (let y = 34; y <= 131; y++) for (let x = 0; x < 320; x++) { let c = (x % 40) < 2 ? P.paredS : (x % 40) < 4 ? P.paredL : P.pared; if (((x + (y >> 1)) % 8 === 0 || (x - (y >> 1) + 800) % 8 === 0) && y < 126 && h(x >> 3, y >> 3, 80) > 0.2) c = e_mez(c, P.paredL, 0.5); pset(x, y, c); }
  for (const x of [0, 138, 296]) { rect(x, 34, x + 12, 131, P.paredS); rect(x + 1, 34, x + 11, 131, hex('#3a4e94')); rect(x + 1, 34, x + 2, 131, hex('#5a70b8')); rect(x + 9, 34, x + 11, 131, P.paredS); rect(x - 1, 34, x + 13, 37, P.oro); rect(x - 1, 34, x + 13, 34, P.oroL); rect(x - 1, 124, x + 13, 131, P.oroS); rect(x - 1, 124, x + 13, 124, P.oro); }
  rect(0, 120, 319, 122, P.oroS); rect(0, 120, 319, 120, P.oro); rect(0, 126, 319, 131, hex('#1a2448')); rect(0, 126, 319, 126, hex('#4a5a9a'));
  // el suelo de mármol en damero, en perspectiva, con vetas y el reflejo de la pared
  for (let y = 132; y <= 179; y++) { const u = (y - 132) / 47, fila = Math.floor(Math.log(1 + u * 6) * 4.2);
    for (let x = 0; x < 320; x++) { const col = Math.floor(((x - 160) / (14 + u * 26)) + 100), osc = (col + fila) % 2 === 1;
      let c = osc ? P.marmolO : P.marmol; if (h(x >> 1, y, 81) > 0.93) c = osc ? P.marmolOL : P.marmolV; if (y < 140 && e_b4(x, y) < (140 - y) / 10) c = e_mez(c, P.pared, 0.4); pset(x, y, c); } }
  // la alfombra roja hacia el trofeo, con su ribete dorado
  poligono([[110, 132], [146, 132], [176, 179], [64, 179]], (x, y) => ((x * 3 + y * 5) % 17 === 0 ? P.alfombraS : P.alfombra)); linea(110, 132, 64, 179, P.oro); linea(146, 132, 176, 179, P.oro);
  // las dos gráficas que suben (los marcos; las barras y la línea van en cada fotograma)
  for (const [x0, x1] of [[16, 66], [74, 128]]) { rect(x0 - 2, 72, x1 + 2, 116, P.oroS); rect(x0 - 1, 73, x1 + 1, 115, P.oro); rect(x0 - 1, 73, x1 + 1, 73, P.oroL); rect(x0, 74, x1, 114, hex('#f4f0e4')); for (let y = 78; y < 112; y += 6) for (let x = x0 + 2; x < x1 - 1; x += 2) pset(x, y, hex('#d8d0bc')); rect(x0 + 3, 76, x0 + 3, 111, hex('#4a4a5a')); rect(x0 + 3, 111, x1 - 2, 111, hex('#4a4a5a')); }
  // el cordón de terciopelo con sus postes dorados
  for (const x of [8, 40, 72, 100]) { rect(x - 1, 112, x + 1, 130, P.oroS); rect(x, 112, x, 130, P.oro); disco(x, 111, 2, P.oro); pset(x - 1, 110, P.oroL); rect(x - 3, 130, x + 3, 131, P.oroS); }
  for (const [a, b] of [[8, 40], [40, 72], [72, 100]]) for (let x = a + 1; x < b; x++) { const y = 114 + Math.round(Math.sin((x - a) / (b - a) * Math.PI) * 5); pset(x, y, hex('#a01e2a')); pset(x, y + 1, hex('#6a1018')); }
  // el pedestal del trofeo
  rect(116, 112, 140, 133, C.k); rect(117, 113, 139, 133, P.marmol); rect(117, 113, 139, 114, hex('#ffffff')); rect(135, 115, 139, 133, P.marmolS); rect(117, 120, 139, 122, P.oro); rect(117, 120, 139, 120, P.oroL); for (let y = 124; y < 132; y += 2) pset(120 + (y % 5), y, P.marmolV);
  rect(113, 109, 143, 112, C.k); rect(114, 109, 142, 111, P.marmolS); rect(114, 109, 142, 109, hex('#ffffff'));
  // el contador gigante: la caja negra con su moldura dorada (las cifras y las bombillas van en cada fotograma)
  rect(3, 37, 137, 69, P.oroS); rect(4, 38, 136, 68, P.oro); rect(4, 38, 136, 38, P.oroL); rect(7, 41, 133, 65, hex('#14141e'));
}

// la montaña de cajas de juego: m 0–1 (de un montoncito a tocar el techo); centro x, base yb
function e_montana(R, t, m, cx = 210, yb = 150) {
  const { rect } = R, H = Math.round(14 + 136 * m), hw0 = 18 + 46 * m, filas = Math.ceil(H / 8);
  for (let f = 0; f < filas; f++) { const y = yb - 8 * (f + 1), u = f / filas, hw = Math.max(6, hw0 * (1 - u) + 6 * u), n = Math.max(1, Math.floor(hw * 2 / 11)), x0 = Math.round(cx - n * 11 / 2 + (f % 2 ? 3 : -2) + Math.sin(f * 1.7) * 2);
    for (let i = 0; i < n; i++) { const k = Math.floor(h(f, i, 82) * 8), lade = h(i, f, 83) > 0.85 ? 1 : 0; e_cajita(R, x0 + i * 11, y + lade, 11, 9, E_CAJAS[k], f + i); } }
  const top = yb - 8 * filas;
  // las cajas que resbalan por las laderas
  for (let k = 0; k < 2; k++) { const u = ((t * 0.35 + k * 0.5) % 1), lado = k ? 1 : -1, y = Math.round(top + 6 + u * (H - 14)), x = Math.round(cx + lado * (6 + (hw0 - 4) * (y - top) / H)) - 5;
    e_cajita(R, x, y - 9 + (Math.floor(t * 8 + k) % 2), 10, 8, E_CAJAS[(k * 3 + 2) % 8], k); }
  return top;
}

function e_records(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, P = E_RE;
  e_fijo(R, 'gtE-records-pared', () => e_recordsFondo(R));
  // el techo de cristal (encima del búfer): el cielo con sus nubes y la estructura de acero
  e_cieloVentana(R, t, 0, 0, 319, 27, { cols: [hex('#7ab4ec'), hex('#9ccaf2'), hex('#c4e0f8')], escNube: 1.6, vel: 2 });
  for (let x = 0; x < 320; x += 40) { rect(x, 0, x + 1, 27, P.viga); linea(x + 2, 27, x + 20, 1, P.viga); linea(x + 38, 27, x + 20, 1, P.viga); }
  rect(0, 13, 319, 13, P.viga);
  // la viga con remaches y los focos colgados que barren
  rect(0, 28, 319, 33, P.vigaS); rect(0, 28, 319, 29, P.vigaL); for (let x = 3; x < 320; x += 8) pset(x, 31, P.vigaL);
  for (const [fx, k] of [[60, 0], [128, 1], [210, 2]]) { const a = Math.sin(t * 0.7 + k * 2) * 0.35 + (k === 1 ? 0 : 0);
    const tx = fx + Math.round(Math.sin(a) * 90), ty = k === 1 ? 108 : 150;
    if (k !== 1) e_luz(R, Math.min(fx, tx) - 30, 36, Math.max(fx, tx) + 30, ty, hex('#fff6d0'), (x, y) => { const u = (y - 36) / (ty - 36); if (u < 0 || u > 1) return 0; const cxl = fx + (tx - fx) * u, w = 3 + u * 22; return Math.abs(x - cxl) < w && e_b4(x, y) < 0.35 ? 0.22 : 0; });
    rect(fx - 4, 34, fx + 4, 40, C.k); rect(fx - 3, 35, fx + 3, 39, hex('#3a3a4a')); rect(fx - 3, 39, fx + 3, 40, hex('#fff6c0')); }
  // el foco fijo sobre el trofeo
  e_luz(R, 96, 40, 160, 112, hex('#fff6d0'), (x, y) => { const u = (y - 40) / 72, w = 3 + u * 14; return Math.abs(x - 128) < w && e_b4(x, y) < 0.45 ? 0.3 : 0; });
  // el contador gigante: las cifras ruedan como un cuentakilómetros; las bombillas corren alrededor
  // o.cifras: 8 por omisión (como antes) o 9 (para 235,000,000): con 9, las fichas son más estrechas y caben en el mismo marco
  const nc = o.cifras === 9 ? 9 : 8, paso = nc === 9 ? 13 : 15, ancho = nc === 9 ? 11 : 13, x0c = nc === 9 ? 10 : 9, hueco = nc === 9 ? 2 : 3;
  const n = Math.max(0, Math.min(10 ** nc - 0.01, o.contador ?? (89000000 + t * 137131) % 1e8));
  const fichaX = (i) => x0c + i * paso + (i >= nc - 6 ? hueco : 0) + (i >= nc - 3 ? hueco : 0);
  for (let i = 0; i < nc; i++) { const p = 10 ** (nc - 1 - i), v = n / p, d = Math.floor(v) % 10, fr = v - Math.floor(v), rodando = Math.max(0, (fr - 0.8) / 0.2), dy = Math.round(rodando * 18);
    const x = fichaX(i), ya = 44, yb = 62, gx = nc === 9 ? 1 : 2;
    rect(x - 1, ya - 1, x + ancho + 1, yb + 1, hex('#0a0a10')); rect(x, ya, x + ancho, yb, hex('#f4f0e4')); rect(x, ya, x + ancho, ya, hex('#c8c0b0')); rect(x, yb, x + ancho, yb, hex('#c8c0b0')); rect(x + ancho - 1, ya, x + ancho, yb, hex('#dcd4c4'));
    // el canto de la ficha: una línea de sombra en medio, como la de un cuentakilómetros
    rect(x, 53, x + ancho - 2, 53, hex('#e4dccc'));
    e_cifra(R, d, x + gx, ya + 3 - dy, 2, hex('#1c1c2a'), hex('#34344a'), ya + 1, yb - 1); e_cifra(R, d + 1, x + gx, ya + 21 - dy, 2, hex('#1c1c2a'), hex('#34344a'), ya + 1, yb - 1);
    }
  // las comas de los millares, en los huecos entre grupos de tres
  for (const i of [nc - 6, nc - 3]) { const x = fichaX(i) - hueco; rect(x, 59, x + (nc === 9 ? 0 : 1), 61, hex('#f4f0e4')); pset(x, 62, hex('#f4f0e4')); }
  for (let k = 0; k < 30; k++) { const per = 2 * (130 + 28), s = (k * per / 30 + t * 30) % per; let bx, by; if (s < 130) { bx = 5 + s; by = 39; } else if (s < 158) { bx = 135; by = 39 + (s - 130); } else if (s < 288) { bx = 135 - (s - 158); by = 67; } else { bx = 5; by = 67 - (s - 288); }
    const on = (k + Math.floor(t * 6)) % 3 !== 0; pset(Math.round(bx), Math.round(by), on ? hex('#fff6c0') : P.oroS); }
  // las gráficas: barras que crecen y una línea que sube con su punto
  for (let i = 0; i < 6; i++) { const hh = Math.round((6 + i * 5.5) * (0.85 + 0.15 * Math.sin(t * 1.5 + i))); const x = 21 + i * 7; rect(x, 110 - hh, x + 4, 110, C.k); rect(x + 1, 111 - hh, x + 3, 110, i === 5 ? hex('#e04a4a') : hex('#4a8ae0')); rect(x + 1, 111 - hh, x + 1, 110, hex('#9ac4ff')); }
  { let px = 79, py = 106; const fin = Math.min(1, (t % 6) / 4); for (let i = 1; i <= 10; i++) { const x = 79 + i * 4.6, y = 106 - i * 2.8 - Math.sin(i * 1.9) * 3; if (i / 10 > fin) break; linea(px, py, x, y, hex('#3aa84a')); linea(px, py + 1, x, y + 1, hex('#2a7a3a')); px = x; py = y; } disco(px, py, 2, hex('#e04a4a')); pset(px - 1, py - 1, hex('#ffb0b0')); }
  // el trofeo con su destello
  PIEZAS_GT.trofeo?.(R, 128, 109);
  { const b = (t % 2.4) < 0.5; if (b) { const s = Math.round(3 - Math.abs((t % 2.4) - 0.25) * 8); for (let k = -s; k <= s; k++) { pset(133 + k, 90, hex('#ffffff')); pset(133, 90 + k, hex('#ffffff')); } } }
  // la montaña de cajas y la carretilla que trae más
  const m = Math.max(0, Math.min(1, o.montana ?? 0.6)), cima = e_montana(R, t, m);
  { const u = (t / 7) % 1, ida = u < 0.5, x = Math.round(ida ? 158 + u * 2 * 40 : 198 - (u - 0.5) * 2 * 40), y = 152;
    rect(x - 6, y - 6, x + 4, y - 2, C.k); rect(x - 5, y - 5, x + 3, y - 3, hex('#f0c040')); rect(x - 3, y - 10, x + 1, y - 6, C.k); rect(x - 2, y - 9, x, y - 7, hex('#8ac0e0')); rect(x + 5, y - 12, x + 5, y - 2, hex('#3a3a44'));
    disco(x - 4, y - 1, 1.5, C.k); disco(x + 2, y - 1, 1.5, C.k); if (ida) e_cajita(R, x + 6, y - 9, 8, 7, E_CAJAS[3], 2); pset(x - 1, y - 11, hex('#e04a4a')); }
  // el confeti que cae (fuera de la esquina de Atom y de la barra del año)
  for (let k = 0; k < 40; k++) { const x = Math.round((h(k, 1, 84) * 340 + Math.sin(t * 2 + k) * 6) % 330) - 5, y = Math.round((h(k, 2, 84) * 200 + t * (14 + (k % 5) * 4)) % 190) - 5;
    if ((x > 274 && y < 48) || (y < 16 && x < 176)) continue; const c = E_CAJAS[k % 6], g = Math.floor(t * 6 + k) % 3; pset(x, y, c); if (g === 0) pset(x + 1, y, c); else if (g === 1) pset(x, y + 1, c); }
  return { suelo: 160, trofeo: { x: 128, y: 109 }, pedestal: [113, 109, 143, 133], contador: [3, 37, 137, 69], montana: { x: 210, base: 150, cima }, graficas: [[14, 72, 68, 116], [72, 72, 130, 116]], cordon: [6, 110, 102, 131] };
}
// lo de delante en la sala de récords: confeti grande que cae por delante de los personajes
function e_recordsDelante(R, t, o = {}) {
  const { rect } = R;
  if (o.confeti === false) return {};
  for (let k = 0; k < 10; k++) { const x = Math.round((h(k, 5, 85) * 330 + Math.sin(t * 1.6 + k) * 10) % 330) - 5, y = Math.round((h(k, 6, 85) * 200 + t * (22 + (k % 3) * 6)) % 200) - 10;
    if ((x > 270 && y < 50) || (y < 18 && x < 176)) continue; const c = E_CAJAS[(k + 2) % 6], g = Math.floor(t * 5 + k) % 4; if (g < 2) rect(x, y, x + 2, y + 1, c); else rect(x, y, x + 1, y + 2, c); R.pset(x, y, e_mez(c, hex('#ffffff'), 0.5)); }
  return {};
}

const E_FI = pal({ pared: '#2a3448', paredL: '#3a465e', paredS: '#1c2232', cristal: '#1a2a3e', marco: '#4a5468', marcoL: '#7a86a0', suelo: '#3a4256', sueloL: '#48526a', sueloS: '#2c3244',
  mesa: '#8a6a4a', mesaL: '#b08a62', mesaS: '#5a4230', rack: '#16181e', rackL: '#2e323c' });

function e_filtracionFondo(R) {
  const { rect, pset, disco, linea } = R, P = E_FI;
  // el techo con sus pantallas de luz
  for (let y = 0; y <= 17; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 32 === 0 || y % 9 === 0) ? hex('#3a4256') : (h(x >> 2, y >> 2, 86) > 0.85 ? hex('#4a5268') : hex('#424a60')));
  for (const x of [40, 120, 200]) { rect(x, 4, x + 30, 8, C.k); rect(x + 1, 5, x + 29, 7, hex('#c8d8e8')); for (let i = x + 3; i < x + 29; i += 3) pset(i, 6, hex('#e8f0f8')); }
  rect(0, 18, 319, 19, P.marco);
  // detrás del cristal: la sala de servidores, en perspectiva (fijo: armarios, bandejas de cables y el pasillo)
  for (let y = 20; y <= 118; y++) for (let x = 0; x <= 266; x++) pset(x, y, y > 100 ? ((x + y) % 4 ? hex('#1a2230') : hex('#222c3c')) : hex('#121a28'));
  for (let x = 0; x <= 266; x += 3) pset(x, 26, hex('#2a3a50'));
  for (const [a, b, y0, y1] of [[6, 58, 32, 104], [64, 112, 36, 102], [150, 198, 36, 102], [204, 258, 32, 104]]) {
    rect(a, y0, b, y1, P.rack); for (let x = a + 4; x < b; x += 12) { rect(x, y0 + 2, x + 9, y1 - 2, P.rackL); for (let y = y0 + 4; y < y1 - 3; y += 4) rect(x + 1, y, x + 8, y + 2, hex('#22262e')); }
    rect(a, y0, b, y0, hex('#3a4256')); }
  for (let x = 0; x <= 266; x++) { if (x > 116 && x < 146) continue; pset(x, 28, hex('#3a4a60')); }
  // el pasillo del fondo con su luz azul
  for (let y = 40; y <= 104; y++) for (let x = 118; x <= 146; x++) { const u = (y - 40) / 64; pset(x, y, e_b4(x, y) < 0.3 + u * 0.4 ? hex('#2a4a6a') : hex('#1a3050')); }
  rect(126, 44, 138, 92, hex('#1e3a5a')); rect(128, 46, 136, 90, hex('#3a6a9a'));
  // el reflejo del cristal y la mampara (marcos)
  for (let k = 0; k < 4; k++) linea(20 + k * 70, 118, 50 + k * 70, 20, hex('#2a3c56'));
  for (const x of [0, 88, 176, 264]) { rect(x, 20, x + 3, 118, P.marco); rect(x, 20, x, 118, P.marcoL); }
  rect(0, 112, 266, 118, P.marco); rect(0, 112, 266, 112, P.marcoL);
  // dentro de la sala: la bandeja de cables del techo con los cables que cuelgan, los tubos de luz y la cinta del suelo
  for (let x = 0; x <= 266; x++) { if (x % 88 < 4) continue; pset(x, 29, hex('#5a6a84')); pset(x, 30, x % 6 === 2 ? hex('#5a6a84') : hex('#3a4a60')); pset(x, 31, hex('#2a3448')); }
  for (let k = 0; k < 9; k++) { const x0 = 10 + k * 29, c = [hex('#2a6ad8'), hex('#e0b030'), hex('#3ac86a'), hex('#d84a4a')][k % 4], l = 4 + (k % 3) * 2; for (let i = 0; i <= 8; i++) pset(x0 + i, 32 + Math.round(Math.sin(i / 8 * Math.PI) * l * 0.5), c); }
  for (const x of [20, 100, 184, 236]) { rect(x, 22, x + 16, 23, hex('#c8d8e8')); for (let y = 24; y < 34; y++) for (let i = -2 - (y - 24); i <= 18 + (y - 24); i++) if (e_b4(x + i, y) < 0.18 - (y - 24) * 0.015) pset(x + i, y, hex('#4a5a74')); }
  for (let x = 0; x <= 266; x++) { if (x > 116 && x < 146) continue; pset(x, 106, ((x >> 2) & 1) ? hex('#e0b030') : hex('#1a1a20')); pset(x, 107, ((x >> 2) & 1) ? hex('#a07a20') : hex('#121216')); }
  // la franja esmerilada del cristal (puntos, sin letras), a la altura de los ojos
  for (let x = 4; x < 264; x++) { if (x % 88 < 4) continue; for (let y = 66; y <= 69; y++) if ((x + y) % 2 === 0 || y === 66 || y === 69) pset(x, y, e_mez(R.pget(x, y), hex('#8a9ab4'), 0.45)); if (x % 6 === 0) pset(x, 67, hex('#c8d4e4')); }
  // la pared de bloques pintados de la derecha (tranquila bajo Atom), con la rejilla del aire, el extintor y la fuente de agua
  for (let y = 20; y <= 118; y++) for (let x = 267; x < 320; x++) { const fila = Math.floor((y - 20) / 7), junta = y >= 48 && ((y - 20) % 7 === 6 || (x + (fila % 2) * 8) % 16 === 0);
    pset(x, y, junta ? (y < 48 ? P.paredL : P.paredS) : h(x >> 1, y >> 1, 87) > 0.9 ? P.paredL : P.pared); }
  // el cartel de salida: una flecha y una puerta entreabierta, en blanco sobre verde (sin letras)
  rect(270, 48, 292, 58, C.k); rect(271, 49, 291, 57, hex('#2aa84a')); rect(271, 49, 291, 49, hex('#5ad07a'));
  linea(273, 53, 280, 53, hex('#f0fff0')); linea(273, 54, 280, 54, hex('#f0fff0')); for (let k = 1; k <= 3; k++) { pset(280 - k, 53 - k, hex('#f0fff0')); pset(280 - k, 54 + k, hex('#f0fff0')); }
  rect(283, 50, 289, 57, hex('#f0fff0')); rect(284, 51, 288, 57, hex('#1a6a32')); R.poligono([[284, 51], [287, 52], [287, 57], [284, 57]], hex('#c8f0d0')); pset(286, 54, hex('#1a6a32'));
  // la fuente de agua: garrafa azul, el cuerpo blanco y el grifo
  rect(272, 86, 288, 118, C.k); rect(273, 96, 287, 117, hex('#d8dce4')); rect(273, 96, 274, 117, hex('#f0f2f6')); rect(285, 97, 287, 117, hex('#a8aebc')); rect(276, 104, 279, 106, hex('#4a8ae0')); rect(281, 104, 284, 106, hex('#e04a4a'));
  disco(280, 90, 6, C.k); disco(280, 90, 5, hex('#4a7ab8')); rect(275, 88, 285, 94, hex('#5a8ac8')); rect(276, 87, 277, 93, hex('#9ac4f0')); rect(278, 95, 282, 96, C.k); rect(275, 110, 285, 111, hex('#8a909c'));
  // el interruptor de la luz
  rect(270, 76, 273, 81, C.k); rect(271, 77, 272, 80, hex('#e8e8ec')); pset(271, 78, hex('#8a8a96'));
  rect(267, 20, 268, 118, P.paredS);
  rect(284, 62, 312, 74, C.k); rect(285, 63, 311, 73, hex('#8a92a4')); for (let y = 64; y < 73; y += 2) rect(286, y, 310, y, hex('#5a6274'));
  rect(296, 92, 302, 110, C.k); rect(297, 93, 301, 109, hex('#d83a3a')); rect(297, 93, 298, 109, hex('#f07070')); rect(297, 89, 300, 92, C.k); linea(301, 92, 304, 100, C.k);
  rect(267, 114, 319, 118, P.paredS);
  // la moqueta de losetas con su dibujo
  for (let y = 119; y <= 179; y++) for (let x = 0; x < 320; x++) { const u = (y - 119) / 60, lx = Math.floor((x - 160) / (22 + u * 30) + 100), ly = Math.floor(Math.log(1 + u * 5) * 5);
    let c = (lx + ly) % 2 ? P.suelo : P.sueloS; if (h(x, y, 88) > 0.88) c = P.sueloL; pset(x, y, c); }
  rect(0, 119, 319, 120, hex('#1a1e2a'));
  // los cables por el suelo, de la mesa a la caja de conexiones de la pared
  for (const [k, c] of [[0, '#1c1c24'], [1, '#2a4a8a'], [2, '#c8a030']]) { let px = 210 + k * 3, py = 152; for (let x = px; x >= 40; x -= 2) { const y = 150 + k * 2 + Math.round(Math.sin(x * 0.05 + k) * 4 + (210 - x) * 0.06); linea(px, py, x, y, hex(c)); px = x; py = y; } }
  rect(30, 140, 46, 150, C.k); rect(31, 141, 45, 149, hex('#5a6274')); for (let i = 0; i < 3; i++) pset(34 + i * 4, 145, hex('#4ae06a'));
  // la papelera de rejilla con bolas de papel alrededor
  rect(126, 140, 140, 156, C.k); for (let y = 141; y < 156; y++) for (let x = 127; x < 140; x++) pset(x, y, (x + y) % 3 === 0 ? hex('#5a6274') : hex('#2a3040')); rect(126, 140, 140, 141, hex('#8a92a4'));
  for (const [x, y] of [[130, 138], [135, 137], [144, 154], [120, 155]]) { disco(x, y, 2, hex('#e8e8e0')); pset(x - 1, y - 1, hex('#ffffff')); pset(x + 1, y, hex('#a8a8b0')); }
  // pósits en el marco del monitor y el bote de bolígrafos
  for (const [x, y, c] of [[179, 79, '#f8e070'], [229, 88, '#f8a0c0'], [229, 94, '#a0e0f8']]) { rect(x, y, x + 3, y + 3, hex(c)); pset(x + 1, y + 1, hex('#8a8a7a')); }
  rect(173, 111, 177, 117, C.k); rect(174, 112, 176, 117, hex('#4a5a7a')); pset(174, 109, hex('#e04a4a')); pset(174, 110, hex('#e04a4a')); pset(176, 108, hex('#2a6ad8')); pset(176, 109, hex('#2a6ad8')); pset(176, 110, hex('#2a6ad8'));
}
function e_filtracion(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, P = E_FI;
  e_fijo(R, 'gtE-filtracion', () => e_filtracionFondo(R));
  // los pilotos de los armarios que parpadean y el técnico que pasa por el pasillo de servidores
  R.recorte([0, 20, 266, 111]);
  for (const [a, b, y0, y1, k] of [[6, 58, 32, 104, 0], [64, 112, 36, 102, 1], [150, 198, 36, 102, 2], [204, 258, 32, 104, 3]])
    for (let x = a + 4; x < b; x += 12) for (let y = y0 + 4; y < y1 - 3; y += 4) { const s = h(x, y, 89 + k), on = Math.sin(t * (2 + s * 9) + s * 20) > 0.1; pset(x + 2, y + 1, on ? (s > 0.8 ? hex('#ffb040') : s > 0.3 ? hex('#4ae06a') : hex('#4aa8ff')) : hex('#1a3a2a')); if (s > 0.6) pset(x + 4, y + 1, Math.sin(t * 7 + s * 9) > 0 ? hex('#4aa8ff') : hex('#16243a')); }
  { const u = (t / 9) % 1, x = Math.round(-10 + u * 290), y = 104, p = Math.floor(t * 5) % 2; rect(x - 2, y - 13, x + 2, y - 6, hex('#6a8ab8')); disco(x, y - 16, 2.5, hex('#e0b090')); rect(x - 2, y - 19, x + 2, y - 18, hex('#3a2a1a')); rect(x - 2, y - 5, x - 1, y - (p ? 1 : 0), hex('#2a2a3a')); rect(x + 1, y - 5, x + 2, y - (p ? 0 : 1), hex('#2a2a3a')); }
  R.recorte(null);
  // el brillo que resbala por el cristal (lento) y el resplandor rojo del monitor que late sobre la mesa y la moqueta
  R.recorte([0, 20, 266, 111]); { const bx = Math.round(((t * 40 + 60) % 400) - 60); for (let y = 20; y <= 111; y++) for (let i = 0; i < 7; i++) { const x = bx + i + Math.round((111 - y) * 0.45); if (e_b4(x, y) < (i < 2 || i > 4 ? 0.12 : 0.25)) pset(x, y, hex('#4a5e7c')); } } R.recorte(null);
  // la burbuja que sube en la garrafa de la fuente
  { const u = (t / 3.2) % 1; if (u < 0.5) { const by = Math.round(93 - u * 12); pset(280 + Math.round(Math.sin(t * 6)), by, hex('#c8e4ff')); } }
  // la cámara de seguridad del techo, que gira despacio, con su piloto rojo
  { const g = Math.round(Math.sin(t * 0.5) * 2); rect(246, 14, 248, 18, C.k); rect(242 + g, 18, 252 + g, 22, C.k); rect(243 + g, 19, 251 + g, 21, hex('#d8dce4')); rect(243 + g, 21, 251 + g, 21, hex('#a8aebc')); pset(g > 0 ? 252 + g : 242 + g, 20, hex('#1a2a4a'));
    if (Math.floor(t * 1.5) % 2) pset(250 + g, 19, hex('#ff3a3a')); }
  // la sirena que gira: barre la sala de rojo
  const alarma = o.alarma !== false, sx = 206, sy = 74, ang = t * 4.2;
  if (alarma) { const k = 0.18 + 0.1 * Math.sin(t * 8); e_luz(R, 140, 112, 280, 172, hex('#ff3a3a'), (x, y) => { const d = Math.hypot((x - 206) / 70, (y - 124) / 40); return d < 1 && e_b4(x, y) < 0.9 - d ? k : 0; }); }
  if (alarma) {
    e_luz(R, 0, 20, 319, 179, hex('#ff2a2a'), (x, y) => { const a = Math.atan2(y - sy, x - sx); const d1 = Math.abs(((a - ang) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI), d2 = Math.abs(((a - ang - Math.PI) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI); const d = Math.min(d1, d2); if (x > 270 && y < 50) return 0; return d < 0.22 && e_b4(x, y) < 0.5 ? 0.35 : 0; });
  }
  // la silla con ruedas
  rect(234, 120, 252, 140, C.k); rect(235, 121, 251, 139, hex('#2a2a36')); rect(235, 121, 251, 122, hex('#4a4a5a')); rect(242, 140, 244, 150, hex('#4a4a5a')); for (const dx of [-8, 0, 8]) { rect(243 + dx - 1, 152, 243 + dx + 1, 154, C.k); } linea(235, 151, 251, 151, hex('#4a4a5a'));
  // la mesa: tablero, canto y faldón
  rect(148, 118, 266, 123, C.k); rect(149, 118, 265, 121, P.mesa); rect(149, 118, 265, 118, P.mesaL); rect(149, 122, 265, 123, P.mesaS);
  rect(152, 124, 156, 156, C.k); rect(153, 124, 155, 156, P.mesaS); rect(258, 124, 262, 156, C.k); rect(259, 124, 261, 156, P.mesaS); rect(156, 124, 258, 134, hex('#3e3024')); rect(156, 124, 258, 124, hex('#5a4634'));
  // el portátil, el teclado, la taza y unos papeles
  rect(240, 104, 262, 117, C.k); rect(241, 105, 261, 116, hex('#1a2a3a')); for (let y = 107; y < 115; y += 2) rect(243, y, 243 + Math.round(6 + h(y, Math.floor(t * 3), 90) * 12), y, hex('#4ae06a')); poligono([[236, 117], [264, 117], [268, 120], [234, 120]], hex('#9aa0ac'));
  rect(182, 116, 230, 118, C.k); for (let x = 184; x < 229; x += 3) pset(x, 117, hex('#c8ccd8'));
  rect(166, 111, 172, 117, C.k); rect(167, 112, 171, 117, hex('#e04a4a')); pset(173, 113, C.k); pset(173, 115, C.k);
  // el monitor en alarma: el triángulo que late y las carpetas que se van por la pantalla
  rect(178, 78, 234, 112, C.k); rect(180, 80, 232, 110, hex('#1a1a26')); rect(202, 112, 210, 116, hex('#3a3a46')); rect(196, 115, 216, 116, hex('#3a3a46'));
  { const late = alarma && Math.sin(t * 8) > 0; rect(181, 81, 231, 109, late ? hex('#5a0e14') : hex('#2a0a10'));
    for (let y = 81; y <= 109; y += 2) for (let x = 181; x <= 231; x++) if ((x + y) % 3 === 0) pset(x, y, late ? hex('#6a161c') : hex('#34101a'));
    const tx = 206, ty = 84; for (let j = 0; j < 16; j++) { const w = Math.round(j * 0.62); rect(tx - w, ty + j, tx + w, ty + j, j === 15 || Math.abs(w) < 1 ? hex('#ff4a4a') : (late ? hex('#ff4a4a') : hex('#c8303a'))); }
    for (let j = 2; j < 15; j++) { const w = Math.round(j * 0.62) - 2; if (w > 0) rect(tx - w, ty + j, tx + w, ty + j, late ? hex('#ffe070') : hex('#f0b030')); }
    rect(tx, ty + 5, tx, ty + 10, C.k); rect(tx - 1, ty + 6, tx + 1, ty + 9, C.k); pset(tx, ty + 13, C.k);
    for (let k = 0; k < 3; k++) { const u = ((t * 0.5 + k / 3) % 1), fx = Math.round(184 + u * 40), fy = 104; if (fx > 226) continue; rect(fx, fy - 3, fx + 5, fy, hex('#f0c040')); rect(fx, fy - 4, fx + 2, fy - 4, hex('#f0c040')); }
    rect(184, 106, 228, 107, hex('#3a1a1a')); rect(184, 106, 184 + Math.round(((t * 0.3) % 1) * 44), 107, hex('#ff6a4a')); }
  // la sirena encima del monitor
  rect(201, 76, 211, 78, C.k); rect(202, 77, 210, 77, hex('#5a5a66'));
  for (let j = 0; j < 7; j++) { const w = 4 - Math.floor(j / 3); rect(sx - w, sy - j + 1, sx + w, sy - j + 1, alarma && (Math.floor(t * 8) % 2) ? hex('#ff5a4a') : hex('#b02a2a')); }
  pset(sx - 2, sy - 4, hex('#ffd0c8')); if (alarma) R.halo(sx, sy - 3, 9, [hex('#c83a3a'), hex('#ff6a5a')], 0.7);
  // la carpeta que se escapa volando con sus hojas
  const cf = Math.max(0, Math.min(1, o.carpeta ?? ((t * 0.22) % 1.3)));
  const fx = Math.round(160 - cf * 190 + Math.sin(cf * 9) * 6), fy = Math.round(114 - Math.sin(Math.min(1, cf * 1.6) * Math.PI / 2) * 80 + Math.max(0, cf - 0.6) * 20 + Math.sin(t * 6) * (cf > 0 ? 2 : 0));
  if (cf <= 0.001) { rect(156, 113, 172, 117, C.k); rect(157, 113, 171, 116, hex('#e8b84a')); rect(157, 113, 171, 113, hex('#ffe08a')); rect(159, 112, 165, 112, hex('#e8b84a')); }
  else { const al = Math.sin(t * 14) * 5;
    for (let k = 0; k < 3; k++) { const v = Math.max(0, cf - 0.08 * (k + 1)); if (v <= 0) continue; const hx = Math.round(160 - v * 190 + Math.sin(v * 9 + k) * 10), hy = Math.round(114 - Math.sin(Math.min(1, v * 1.6) * Math.PI / 2) * 80 + k * 6 + Math.sin(t * 5 + k) * 3);
      const g = Math.floor(t * 6 + k) % 2; rect(hx, hy, hx + (g ? 5 : 3), hy + (g ? 3 : 5), hex('#f8f8f0')); pset(hx + 1, hy + 1, hex('#8a8a9a')); pset(hx + 2, hy + 2, hex('#8a8a9a')); }
    poligono([[fx, fy], [fx - 9, fy - 2 - al], [fx - 9, fy + 6 - al], [fx, fy + 8]], hex('#d8a83a')); poligono([[fx, fy], [fx + 9, fy - 2 - al], [fx + 9, fy + 6 - al], [fx, fy + 8]], hex('#f0c050'));
    linea(fx, fy, fx, fy + 8, hex('#8a6a20')); linea(fx, fy, fx + 9, fy - 2 - al, hex('#ffe08a')); rect(fx - 1, fy + 1, fx + 1, fy + 5, hex('#ffffff')); }
  return { suelo: 158, mesa: { x0: 148, x1: 266, y: 118 }, monitor: [178, 78, 234, 112], sirena: [sx, sy], carpeta: { x: fx, y: fy, f: cf }, libre: [20, 140], cristal: [0, 20, 266, 118] };
}
// lo de delante en la filtración: la caja de cables de la esquina de abajo a la izquierda y un rollo de cable
function e_filtracionDelante(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  rect(0, 158, 28, 179, C.k); rect(0, 159, 27, 179, hex('#b08a5a')); rect(0, 159, 27, 160, hex('#d0aa7a')); rect(24, 161, 27, 179, hex('#8a6a40')); rect(0, 168, 27, 169, hex('#c8a070'));
  for (let k = 0; k < 4; k++) linea(4 + k * 5, 159, 2 + k * 6, 150 - k * 2, [hex('#1c1c24'), hex('#2a4a8a'), hex('#c8a030'), hex('#3a8a4a')][k]);
  for (let r = 4; r <= 8; r += 2) R.anillo?.(306, 174, r, hex('#1c1c24'));
  return {};
}

const E_ESP = pal({ ladrillo: '#8a4a3a', ladrilloL: '#a8604a', ladrilloS: '#6a3428', junta: '#5a3a34', acera: '#8a8a9a', aceraL: '#a4a4b4', aceraS: '#6a6a7a', calzada: '#3a3c48', calzadaL: '#4a4c5a',
  fachada: '#2a2a3a', fachadaL: '#3e3e54', persiana: '#9aa0b0', persianaL: '#c8ccd8', persianaS: '#6a7080', dentro: '#f4dca0', dentroS: '#d8b878' });

function e_esperaFondo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = E_ESP;
  // el cielo del anochecer, de malva a naranja, tramado
  e_degradado(R, 0, 0, 319, 100, [hex('#3a3a7a'), hex('#5a4a8a'), hex('#8a5a9a'), hex('#c8708a'), hex('#f09a7a'), hex('#f8c08a')]);
  // la ciudad lejana a contraluz con ventanitas
  for (let x = 0; x < 320; x++) { const b = Math.floor(x / 11), hh = 14 + Math.floor(h(b, 1, 91) * 26); for (let y = 100 - hh; y <= 100; y++) pset(x, y, hex('#4a3a6a')); if (x % 11 === 0) for (let y = 100 - hh; y <= 100; y++) pset(x, y, hex('#3a2e5a')); }
  for (let b = 0; b < 30; b++) for (let k = 0; k < 6; k++) { const x = b * 11 + 2 + (k % 3) * 3, y = 100 - 10 - Math.floor(k / 3) * 6; if (h(b, k, 92) > 0.55) pset(x, y, hex('#f8d88a')); }
  // el edificio de la izquierda: ladrillo, ventanas y escalera de incendios
  const lad = (x0, y0, x1, y1, k) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - y0) / 4), jx = (x + (fila % 2) * 4) % 8; let c = (y - y0) % 4 === 3 || jx === 0 ? P.junta : h(Math.floor((x + (fila % 2) * 4) / 8), fila, 93 + k) > 0.7 ? P.ladrilloL : h(Math.floor((x + (fila % 2) * 4) / 8), fila, 94 + k) > 0.8 ? P.ladrilloS : P.ladrillo; pset(x, y, c); } };
  lad(0, 30, 62, 150, 0); rect(0, 26, 64, 30, hex('#5a3a34')); rect(0, 26, 64, 26, hex('#c88a6a'));
  for (const wy of [40, 70, 100]) for (const wx of [8, 36]) { rect(wx - 1, wy - 1, wx + 17, wy + 18, hex('#c8a890')); rect(wx, wy, wx + 16, wy + 17, hex('#2a2440')); rect(wx + 8, wy, wx + 8, wy + 17, hex('#c8a890')); rect(wx, wy + 8, wx + 16, wy + 8, hex('#c8a890')); }
  for (const fy of [60, 90]) { rect(2, fy, 60, fy + 1, hex('#1c1c24')); for (let x = 2; x <= 60; x += 3) pset(x, fy - 4, hex('#1c1c24')); rect(2, fy - 5, 60, fy - 5, hex('#1c1c24')); }
  for (let k = 0; k < 8; k++) linea(52 - k * 0, 61 + k * 3.6, 52, 61 + k * 3.6, hex('#1c1c24')); linea(48, 62, 58, 90, hex('#1c1c24')); linea(49, 62, 59, 90, hex('#2a2a34'));
  // el edificio de la derecha (bajo, para dejar tranquila la esquina de Atom)
  lad(258, 52, 319, 150, 1); rect(256, 48, 319, 52, hex('#5a3a34')); rect(256, 48, 319, 48, hex('#c88a6a'));
  for (const wx of [266, 292]) { rect(wx - 1, 61, wx + 19, 88, hex('#c8a890')); rect(wx, 62, wx + 18, 87, hex('#2a2440')); }
  rect(268, 92, 288, 100, C.k); rect(269, 93, 287, 99, hex('#c8ccd8')); for (let x = 270; x < 287; x += 2) rect(x, 94, x, 98, hex('#8a8ea0'));
  // la tienda: fachada oscura con remate, el cartel (el neón va en cada fotograma), los escaparates y la puerta
  rect(62, 34, 258, 150, P.fachada); for (let y = 34; y < 150; y += 3) for (let x = 62; x <= 258; x++) if (h(x >> 2, y, 95) > 0.85) pset(x, y, P.fachadaL);
  rect(60, 32, 260, 36, hex('#1a1a26')); rect(60, 32, 260, 32, hex('#6a6a8a')); for (let x = 62; x < 260; x += 6) rect(x, 36, x + 2, 38, hex('#1a1a26'));
  rect(70, 42, 250, 68, hex('#10101a')); rect(70, 42, 250, 42, hex('#3a3a5a'));
  for (const [a, b] of [[70, 140], [180, 250]]) { rect(a, 76, b, 148, hex('#4a4a5e')); rect(a + 2, 78, b - 2, 146, P.dentro); }
  rect(146, 76, 174, 150, hex('#4a4a5e')); rect(148, 78, 172, 150, P.dentro);
  // lo de dentro: estanterías con cajas de juego, un expositor y la luz cálida
  for (const [a, b] of [[72, 138], [182, 248], [150, 170]]) { for (const yb of [104, 120, 136]) { rect(a, yb, b, yb + 1, P.dentroS); for (let x = a + 2; x < b - 8; x += 10) e_cajita(R, x, yb - 12, 8, 12, E_CAJAS[Math.floor(h(x, yb, 96) * 8)], x + yb); }
    for (let y = 80; y < 148; y++) for (let x = a; x <= b; x++) if (e_b4(x, y) < (y - 80) / 140) pset(x, y, e_mez(R.pget(x, y), P.dentroS, 0.3)); }
  // la acera con sus losas y el bordillo
  for (let y = 150; y <= 163; y++) for (let x = 0; x < 320; x++) { let c = P.acera; if ((x + (y > 156 ? 10 : 0)) % 20 === 0 || y === 156 || y === 150) c = P.aceraS; else if (h(x >> 1, y, 97) > 0.92) c = P.aceraL; pset(x, y, c); }
  rect(0, 163, 319, 165, P.aceraL); rect(0, 165, 319, 165, P.aceraS);
  // la calzada con sus marcas y su brillo
  for (let y = 166; y <= 179; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 98) > 0.9 ? P.calzadaL : P.calzada);
  for (let x = 0; x < 320; x += 24) rect(x, 175, x + 11, 175, hex('#e8c040'));
  // la alcantarilla y la farola (su luz va en cada fotograma)
  rect(242, 170, 256, 172, hex('#22242c')); for (let x = 243; x < 256; x += 2) pset(x, 171, hex('#5a5c66'));
  rect(276, 100, 277, 160, hex('#2a2a34')); rect(274, 160, 279, 162, C.k); rect(277, 100, 284, 101, hex('#2a2a34')); rect(280, 102, 286, 104, C.k);
}

function e_espera(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, P = E_ESP;
  e_fijo(R, 'gtE-espera', () => e_esperaFondo(R));
  // nubes del anochecer a tres velocidades y un avión que parpadea (fuera de la esquina de Atom)
  for (let k = 0; k < 22; k++) { const x = Math.floor(h(k, 1, 107) * 320), y = Math.floor(h(k, 2, 107) * 22) + 2; if ((x > 272 && y < 48) || (x < 176 && y < 16)) continue; if (Math.sin(t * (1 + k % 3) + k * 4) > 0.1) pset(x, y, k % 4 ? hex('#c8c0f0') : hex('#ffffff')); }
  R.recorte([0, 0, 319, 31]);
  for (const [k, y, w, v] of [[0, 18, 26, 1.2], [1, 8, 18, 2], [2, 26, 14, 3], [3, 22, 20, 1.6], [4, 12, 12, 2.6]]) { const cx = ((h(k, 1, 99) * 400 + t * v) % 400) - 40; e_nube(R, cx, y, w, [hex('#6a4a7a'), hex('#a86a8a'), hex('#f0a08a')]); }
  R.recorte(null);
  { const u = (t / 20) % 1, x = Math.round(20 + u * 240), y = 22 - Math.round(u * 4); pset(x, y, hex('#e8e8f0')); pset(x - 1, y, hex('#b8b8c8')); if (Math.floor(t * 2) % 2) pset(x + 1, y, hex('#ff4a4a')); }
  // las ventanas del edificio con luz y siluetas que se mueven
  for (const [wx, wy, k] of [[8, 40, 0], [36, 70, 1], [8, 100, 2], [292, 62, 3]]) { const on = h(k, Math.floor((t + k * 3) / 7), 100) > 0.3; if (!on) continue; const w = k === 3 ? 18 : 16, hh = k === 3 ? 25 : 17;
    R.recorte([wx, wy, wx + w, wy + hh]); e_degradado(R, wx, wy, wx + w, wy + hh, [hex('#f8d88a'), hex('#e8b060')]); const sx = wx + 4 + Math.round(Math.sin(t * 0.5 + k) * 5); disco(sx, wy + hh - 6, 2.5, hex('#5a3a2a')); rect(sx - 3, wy + hh - 3, sx + 3, wy + hh, hex('#5a3a2a')); R.recorte(null);
    if (k < 3) { rect(wx + 8, wy, wx + 8, wy + 17, hex('#c8a890')); rect(wx, wy + 8, wx + 16, wy + 8, hex('#c8a890')); } }
  // el aire acondicionado que gotea
  { const u = (t * 0.8) % 1; pset(278, 101 + Math.round(u * 48), hex('#8ac0f0')); }
  // el cartel de neón: un sol a rayas y dos palmeras (sin letras), con su parpadeo
  { const fallo = (t % 5.3) < 0.18 || ((t % 5.3) > 0.3 && (t % 5.3) < 0.38), rosa = fallo ? hex('#6a2a4a') : hex('#ff5ab0'), cian = hex('#4af0f0'), sol = hex('#ffb04a');
    R.halo(160, 55, 34, [hex('#2a1a3a'), hex('#3a1e4a')], 0.6);
    for (let j = 0; j <= 10; j++) { const w = Math.round(Math.sqrt(Math.max(0, 121 - (j - 11) ** 2 * 1)) ); if ((j % 3) === 2) continue; rect(160 - w, 50 + j - 11 + 11, 160 + w, 50 + j - 11 + 11, sol); }
    for (let x = 140; x <= 180; x++) pset(x, 62, rosa); for (let x = 132; x <= 188; x += 2) pset(x, 64, rosa);
    const palmera = (px, dir) => { let tx = px, ty = 62; for (let k = 0; k < 15; k++) { tx = px + Math.round((k / 15) ** 2 * 5 * dir); ty = 62 - k; pset(tx, ty, cian); if (k % 3 === 0) pset(tx + 1, ty, hex('#2ab0b0')); }
      for (const [a, l] of [[-2.9, 11], [-2.3, 9], [-1.75, 6], [-1.3, 8], [-0.75, 10], [-0.2, 11]]) for (let s = 1; s <= l; s++) { const ax = tx + Math.round(Math.cos(a) * s), ay = ty + Math.round(Math.sin(a) * s * 0.55 + (s / l) ** 2 * 6); pset(ax, ay, cian); if (s === l) pset(ax, ay + 1, cian); }
      pset(tx - 1, ty + 2, hex('#a86a3a')); pset(tx + 1, ty + 2, hex('#a86a3a')); };
    palmera(122, 1); palmera(198, -1);
    for (const [y0, k] of [[64, 0], [66, 1]]) for (let x = 104; x <= 216; x++) pset(x, y0 + Math.round(Math.sin(x * 0.35 + t * 3 + k * 2)), k ? hex('#2ab0d0') : cian);
    for (let x = 74; x <= 246; x++) { if ((x >> 1) % 2 && fallo) continue; pset(x, 46, rosa); pset(x, 67, rosa); } for (let y = 46; y <= 67; y++) { pset(74, y, rosa); pset(246, y, rosa); }
    for (const x of [86, 96, 224, 234]) { const on = Math.floor(t * 3 + x) % 2; disco(x, 55, 2, on ? hex('#ffe070') : hex('#6a5a2a')); }
    for (let x = 72; x <= 248; x += 4) { const on = (Math.floor(t * 8) + x / 4) % 4 !== 0; pset(x, 44, on ? hex('#ffe8a0') : hex('#5a4a2a')); pset(x, 66, on ? hex('#ffe8a0') : hex('#5a4a2a')); } }
  // las persianas metálicas medio bajadas (la luz de dentro sale por debajo)
  const ps = Math.max(0, Math.min(1, o.persiana ?? 0.5));
  for (const [a, b, y1] of [[72, 138, 146], [182, 248, 146], [148, 172, 150]]) { const yb = Math.round(78 + (y1 - 78) * ps);
    for (let y = 78; y <= yb; y++) { const c = (y - 78) % 4 === 0 ? P.persianaS : (y - 78) % 4 === 1 ? P.persianaL : P.persiana; rect(a, y, b, y, c); }
    rect(a, yb, b, yb + 1, hex('#3a3a46')); rect(Math.round((a + b) / 2) - 3, yb - 1, Math.round((a + b) / 2) + 3, yb - 1, hex('#2a2a34'));
    for (let x = a; x <= b; x++) if (e_b4(x, y1 + 2) < 0.4) pset(x, y1 + 2 + (x % 3 === 0 ? 1 : 0), hex('#f8e0a0')); }
  // el calendario del escaparate (por debajo de la persiana): el 19 rodeado en rojo
  { const x0 = 216, y0 = 112; rect(x0 - 1, y0 - 1, x0 + 27, y0 + 30, C.k); rect(x0, y0, x0 + 26, y0 + 29, hex('#fbf8f0')); rect(x0, y0, x0 + 26, y0 + 5, hex('#d8303a')); rect(x0 + 6, y0 - 2, x0 + 7, y0 + 1, hex('#8a8a96')); rect(x0 + 19, y0 - 2, x0 + 20, y0 + 1, hex('#8a8a96'));
    for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) { const cx = x0 + 2 + i * 3.4, cy = y0 + 18 + j * 3; if (j === 2 && i === 3) continue; pset(Math.round(cx), cy, j === 1 && i < 4 ? hex('#b0a8a0') : hex('#5a5a6a')); }
    R.numero('19', x0 + 13, y0 + 15, { color: hex('#1c1c2a'), centro: true, sombra: false });
    const lat = 0.5 + 0.5 * Math.sin(t * 4); for (let a = 0; a < 6.28; a += 0.18) pset(Math.round(x0 + 13 + Math.cos(a) * (10 + lat)), Math.round(y0 + 11 + Math.sin(a) * (6 + lat * 0.5)), hex('#e83a3a'));
    pset(x0 + 13, y0 + 24, hex('#e83a3a')); pset(x0 + 12, y0 + 24, hex('#e83a3a')); }
  // la farola, que se enciende al caer la noche
  { const on = t > 0.6 && !((t % 7.1) > 3 && (t % 7.1) < 3.12); if (on) { R.halo(283, 108, 18, [hex('#8a6a7a'), hex('#c89a7a'), hex('#f8d8a0')], 0.8); rect(281, 104, 285, 105, hex('#fff6c0')); } }
  // el vapor de la alcantarilla
  for (let k = 0; k < 10; k++) { const u = (t * 0.35 + k / 10) % 1, x = 249 + Math.round(Math.sin(u * 5 + k) * (3 + u * 6)), y = 168 - Math.round(u * 34); if (e_b4(x, y) < 0.75 - u * 0.65) { pset(x, y, hex('#d8d0e0')); pset(x + 1, y, hex('#c0b8d0')); } }
  // las palomas que picotean en la acera
  for (const [px, k] of [[96, 0], [104, 1], [236, 2]]) { const pic = Math.sin(t * 5 + k * 2) > 0.6, x = px + Math.round(Math.sin(t * 0.4 + k) * 4), y = 161; rect(x - 2, y - 3, x + 2, y - 1, hex('#7a7a8a')); pset(x + 2, y - (pic ? 2 : 4), hex('#5a5a6a')); pset(x + 3, y - (pic ? 1 : 4), hex('#e0a040')); pset(x - 3, y - 3, hex('#5a5a6a')); pset(x, y, hex('#e07a5a')); pset(x + 1, y - 3, hex('#9a9aaa')); }
  // los coches que pasan por la calzada de delante
  if (o.coches !== false) for (const [k, v, c] of [[0, 55, '#3a6ad8'], [1, -40, '#e8e0d0'], [2, 70, '#d83a3a']]) { const per = 520, s = ((h(k, 1, 101) * per + t * Math.abs(v)) % per), x = Math.round(v > 0 ? s - 100 : 420 - s), y = v > 0 ? 179 : 174, dir = v > 0 ? 1 : -1;
    if (x < -40 || x > 360) continue; rect(x - 18, y - 7, x + 18, y - 2, C.k); rect(x - 17, y - 6, x + 17, y - 3, hex(c)); rect(x - 17, y - 6, x + 17, y - 6, e_mez(hex(c), hex('#ffffff'), 0.4)); rect(x - 10, y - 12, x + 8, y - 7, C.k); rect(x - 9, y - 11, x + 7, y - 7, hex('#3a4a6a')); rect(x - 7, y - 11, x - 3, y - 9, hex('#8ab0d8'));
    for (const dx of [-11, 11]) { disco(x + dx, y - 1, 3, C.k); pset(x + dx, y - 1, hex('#8a8a96')); } pset(x + dir * 18, y - 5, hex('#fff2a0')); pset(x - dir * 18, y - 5, hex('#ff3a3a'));
    e_luz(R, x + dir * 18, y - 8, x + dir * 50, y, hex('#fff2c0'), (xx, yy) => { const d = Math.abs(xx - (x + dir * 18)); return d > 0 && Math.abs(yy - (y - 5)) < 1 + d * 0.12 && e_b4(xx, yy) < 0.4 ? 0.3 : 0; }); }
  return { suelo: 158, puerta: [146, 76, 174, 150], escaparates: [[70, 76, 140, 148], [180, 76, 250, 148]], calendario: [215, 111, 243, 142], cartel: [70, 42, 250, 68], acera: [150, 163], calzada: [166, 179], persiana: ps, farola: [283, 104] };
}

// lo de delante en la calle: la papelera y la boca de riego (en la acera, a los lados)
function e_esperaDelante(R, t, o = {}) {
  const { rect, pset, disco } = R;
  rect(4, 140, 18, 162, C.k); rect(5, 141, 17, 161, hex('#2e5a3a')); for (let x = 7; x < 17; x += 3) rect(x, 143, x, 160, hex('#244a2e')); rect(3, 138, 19, 141, C.k); rect(4, 139, 18, 140, hex('#3a7048')); pset(9, 137, hex('#e8e0d0')); pset(12, 136, hex('#d83a3a'));
  rect(302, 150, 310, 162, C.k); rect(303, 151, 309, 161, hex('#d8a030')); rect(303, 151, 304, 161, hex('#f8c860')); disco(306, 149, 4, C.k); disco(306, 149, 3, hex('#d8a030')); rect(300, 154, 312, 156, C.k); rect(301, 155, 311, 155, hex('#e8b040'));
  return {};
}

const E_DI = pal({ papel: '#4a3a5e', papelR: '#42344f', papelM: '#5a4870', moqueta: '#6a5a4a', moquetaL: '#7a6a58', moquetaS: '#5a4a3c', madera: '#7a4a2a', maderaL: '#a06a3e', maderaS: '#4e2e1a' });

function e_discoFondo(R) {
  const { rect, pset, disco, linea } = R, P = E_DI;
  // el papel pintado de noche con rayas y florecitas
  for (let y = 0; y <= 125; y++) for (let x = 0; x < 320; x++) { const px = x % 14, py = (y + (Math.floor(x / 14) % 2) * 8) % 16; let c = px < 1 ? P.papelR : P.papel; if (Math.abs(px - 7) + Math.abs(py - 8) <= 1) c = P.papelM; pset(x, y, c); }
  rect(0, 122, 319, 125, P.maderaS); rect(0, 122, 319, 122, P.maderaL);
  // la moqueta con su pelo
  for (let y = 126; y <= 179; y++) for (let x = 0; x < 320; x++) { const r = h(x, y, 102); pset(x, y, r > 0.8 ? P.moquetaL : r < 0.2 ? P.moquetaS : P.moqueta); }
  // la cornisa del techo y la penumbra de arriba (la luz viene de la tele y de la lámpara, abajo)
  rect(0, 0, 319, 3, hex('#2a2038')); rect(0, 4, 319, 4, hex('#6a5a80')); rect(0, 5, 319, 6, hex('#3a2e4a')); for (let x = 2; x < 320; x += 6) { rect(x, 1, x + 2, 2, hex('#3a2e4a')); pset(x, 1, hex('#4a3e5e')); }
  for (let y = 7; y < 34; y++) for (let x = 0; x < 320; x++) if (e_b4(x, y) < (34 - y) / 44) pset(x, y, e_mez(R.pget(x, y), hex('#1a1424'), 0.3));
  // el zócalo de madera con sus vetas, más alto
  rect(0, 114, 319, 125, P.madera); rect(0, 114, 319, 114, C.k); rect(0, 115, 319, 115, P.maderaL); rect(0, 121, 319, 121, P.maderaS); rect(0, 122, 319, 125, P.maderaS); rect(0, 122, 319, 122, P.maderaL);
  for (let x = 0; x < 320; x++) for (let y = 116; y < 121; y++) if (h(x >> 3, y, 109) > 0.82) pset(x, y, P.maderaS);
  // la alfombra persa bajo la mesita, en perspectiva: cenefa dorada, campo granate con rombos y flecos
  for (let y = 130; y <= 176; y++) { const u = (y - 130) / 46, xl = Math.round(56 - 26 * u), xr = Math.round(268 + 26 * u);
    for (let x = xl; x <= xr; x++) { const bx = Math.min(x - xl, xr - x), by = Math.min(y - 130, 176 - y); let c;
      if (bx === 0 || by === 0) c = C.k; else if (bx < 4 || by < 3) c = (bx + by + x) % 3 ? hex('#c8a040') : hex('#8a6a20'); else if (bx < 6 || by < 5) c = hex('#5a1a1e');
      else { const lx = (x - 162) / (1 + u * 0.25), ly = y - 153, dm = (Math.abs(((lx % 22) + 33) % 22 - 11) + Math.abs(ly) * 0.9) ; c = dm < 4 ? hex('#e0a050') : dm < 6 ? hex('#3a5a7a') : (x + y) % 5 === 0 ? hex('#7a2a2a') : hex('#9a3a3a'); if (h(x, y, 110) > 0.9) c = hex('#b04a42'); }
      pset(x, y, c); } }
  for (let x = 30; x <= 294; x += 2) { pset(x, 177, hex('#e8dcc0')); if (x % 4 === 0) pset(x, 178, hex('#c8bca0')); }
  // las cortinas de terciopelo a los lados de la ventana, con su barra y sus pliegues
  rect(4, 21, 88, 21, hex('#8a6a2a')); pset(4, 20, hex('#8a6a2a')); pset(88, 20, hex('#8a6a2a'));
  for (const [a, b] of [[5, 17], [73, 87]]) for (let y = 22; y <= 96; y++) for (let x = a; x <= b; x++) { const f = Math.sin((x - a) * 1.1 + (y > 80 ? (y - 80) * 0.08 : 0)); pset(x, y, x === a || x === b ? hex('#3a1420') : f > 0.5 ? hex('#a03a4a') : f > -0.3 ? hex('#7a2a3a') : hex('#5a1e2c')); }
  for (const x of [11, 80]) { rect(x - 3, 66, x + 3, 67, hex('#c8a040')); }
  // el radiador bajo la ventana, con sus aletas y la llave
  rect(20, 92, 70, 113, C.k); for (let x = 21; x < 70; x += 4) { rect(x, 93, x + 2, 112, hex('#d8d0c0')); pset(x, 93, hex('#f4f0e4')); rect(x + 2, 94, x + 2, 112, hex('#a8a090')); rect(x + 3, 94, x + 3, 112, hex('#4a3e4e')); }
  rect(20, 110, 70, 110, hex('#a8a090')); rect(14, 108, 20, 110, C.k); rect(14, 109, 19, 109, hex('#c8c0b0')); rect(12, 106, 15, 108, hex('#c83a3a'));
  // el sofá de pana detrás de la mesita: respaldo con tres cojines capitoné, brazos, el asiento y un cojín naranja
  { const S = hex('#3e6a4e'), SL = hex('#5a8a62'), SS = hex('#2a4a36'), SD = hex('#1e3628');
    rect(86, 98, 182, 133, C.k); rect(87, 99, 181, 132, S);
    for (const [a, b] of [[96, 120], [122, 146], [148, 172]]) { rect(a, 100, b, 117, SS); rect(a + 1, 101, b - 1, 116, S); rect(a + 1, 101, b - 1, 102, SL); rect(b - 2, 103, b - 1, 116, SS);
      for (let x = a + 4; x < b - 2; x += 6) for (let y = 104; y < 116; y += 5) { pset(x, y, SD); pset(x + 1, y + 1, SL); }
      for (let x = a + 1; x < b; x++) for (let y = 103; y < 116; y++) if (h(x, y, 111) > 0.9) pset(x, y, SL); }
    for (const [a, b] of [[84, 95], [173, 184]]) { rect(a, 106, b, 133, C.k); rect(a + 1, 107, b - 1, 132, S); rect(a + 1, 107, b - 1, 108, SL); rect(a + 1, 109, a + 2, 132, SL); rect(b - 2, 109, b - 1, 132, SS); for (let y = 112; y < 132; y += 3) pset(a + 5, y, SS); }
    rect(95, 117, 173, 126, C.k); rect(96, 118, 172, 125, SL); rect(96, 118, 172, 118, hex('#7aa47e')); for (const x of [121, 147]) rect(x, 118, x, 125, SS); rect(96, 124, 172, 125, S);
    rect(95, 127, 173, 133, SD); for (let x = 96; x < 173; x += 3) pset(x, 128, SS);
    R.poligono([[100, 106], [112, 104], [114, 117], [101, 118]], hex('#e07a30')); R.poligono([[101, 107], [111, 105], [112, 109], [102, 110]], hex('#f8a050')); pset(107, 111, hex('#a04a1a')); }
  // juegos apilados en el suelo, junto a la pared de la izquierda
  for (const [y, c, w] of [[152, 1, 14], [146, 4, 13], [140, 2, 14]]) { rect(2, y - 6, 2 + w, y, C.k); rect(3, y - 5, 1 + w, y - 1, E_CAJAS[c]); rect(3, y - 5, 1 + w, y - 5, e_mez(E_CAJAS[c], hex('#ffffff'), 0.4)); rect(3, y - 3, 6, y - 1, hex('#f4f0e4')); }
  // el mando con su cable que va de la consola a la alfombra
  { let px = 214, py = 124; for (let k = 1; k <= 14; k++) { const x = 214 + k * 2, y = 124 + Math.round(Math.sin(k * 0.5) * 2 + k * 3.2); linea(px, py, x, y, hex('#1c1c24')); px = x; py = y; } rect(px - 4, py, px + 4, py + 3, C.k); rect(px - 3, py + 1, px + 3, py + 2, hex('#4a4a5a')); pset(px + 2, py + 1, hex('#e04a4a')); pset(px - 2, py + 1, hex('#8a8a96')); }
  // la ventana de noche (el cielo y la luna van en cada fotograma)
  rect(14, 24, 76, 84, hex('#c8bca8')); rect(15, 25, 75, 83, hex('#e8dcc8')); rect(12, 84, 78, 87, hex('#c8bca8'));
  // el póster sin letras (un coche a rayas) y la estantería de juegos
  rect(96, 24, 128, 66, C.k); e_degradado(R, 97, 25, 127, 65, [hex('#1a3a6a'), hex('#3a6a9a'), hex('#e87a3a')]); rect(102, 48, 122, 54, hex('#1c1424')); rect(106, 44, 118, 48, hex('#1c1424')); disco(106, 55, 2, hex('#1c1424')); disco(118, 55, 2, hex('#1c1424')); for (let y = 58; y < 64; y += 2) rect(100, y, 124, y, hex('#f8c040'));
  rect(180, 44, 264, 47, P.madera); rect(180, 44, 264, 44, P.maderaL); rect(180, 47, 264, 47, P.maderaS);
  for (let x = 183; x < 260; x += 4) { const c = E_CAJAS[Math.floor(h(x, 1, 103) * 8)]; const hh = 11 + Math.floor(h(x, 2, 103) * 4); rect(x, 44 - hh, x + 3, 43, C.k); rect(x + 1, 45 - hh, x + 2, 43, c); pset(x + 1, 47 - hh, hex('#ffffff')); }
  // el mueble de la tele, la consola con su piloto y la tele de tubo (la pantalla va en cada fotograma)
  rect(186, 100, 262, 124, C.k); rect(187, 101, 261, 124, P.madera); rect(187, 101, 261, 102, P.maderaL); rect(222, 104, 224, 122, P.maderaS); rect(190, 106, 218, 120, P.maderaS); rect(228, 106, 258, 120, P.maderaS);
  rect(192, 110, 216, 116, C.k); rect(193, 111, 215, 115, hex('#2a2a34')); rect(193, 111, 215, 111, hex('#4a4a5a')); rect(196, 113, 206, 113, hex('#14141c'));
  for (let x = 230; x < 256; x += 5) { rect(x, 108, x + 3, 119, C.k); rect(x + 1, 109, x + 2, 118, E_CAJAS[(x >> 2) % 8]); }
  rect(194, 62, 254, 100, C.k); rect(195, 63, 253, 99, hex('#3a3a44')); rect(195, 63, 253, 64, hex('#5a5a66')); rect(248, 70, 251, 72, hex('#8a8a96')); rect(248, 76, 251, 78, hex('#8a8a96'));
  linea(214, 62, 204, 50, hex('#8a8a96')); linea(234, 62, 246, 52, hex('#8a8a96'));
  // el corcho con notas (rayas, sin letras), una foto y entradas de cine, y un banderín a rayas
  rect(140, 68, 178, 98, C.k); rect(141, 69, 177, 97, hex('#b08a5a')); for (let y = 70; y < 97; y++) for (let x = 142; x < 177; x++) if (h(x, y, 108) > 0.8) pset(x, y, hex('#8a6a40'));
  for (const [x, y, c] of [[144, 72, '#f8f0a0'], [160, 74, '#a0e0f8'], [146, 86, '#f8b0c0']]) { rect(x, y, x + 10, y + 9, hex(c)); for (let k = 0; k < 3; k++) rect(x + 2, y + 3 + k * 2, x + 8 - k * 2, y + 3 + k * 2, hex('#6a6a7a')); pset(x + 5, y, hex('#e04a4a')); }
  rect(161, 85, 174, 95, hex('#ffffff')); rect(162, 86, 173, 92, hex('#6a9ad8')); disco(166, 89, 2, hex('#f0c040')); rect(162, 91, 173, 92, hex('#4a9a4a')); pset(167, 85, hex('#4a8ae0'));
  // (el banderín va encima de la estantería, fuera de la barra del año)
  for (let k = 0; k < 12; k++) { const x0 = 186 + k * 6, yk = 17 + Math.round(Math.sin(k / 11 * Math.PI) * 2); R.poligono([[x0, yk + 1], [x0 + 6, yk + 1], [x0 + 3, yk + 7]], k % 2 ? hex('#e04a4a') : hex('#f0c040')); } for (let x = 184; x <= 260; x++) pset(x, 17 + Math.round(Math.sin((x - 186) / 66 * Math.PI) * 2), hex('#2a2a34'));
  // la lámpara de mesa (su luz va en cada fotograma)
  rect(276, 100, 300, 124, C.k); rect(277, 101, 299, 124, P.madera); rect(277, 101, 299, 101, P.maderaL); rect(286, 84, 288, 100, hex('#c8a040'));
  // la sombra de la mesita baja sobre la moqueta
  for (let y = 158; y <= 168; y++) for (let x = 64; x <= 260; x++) if (e_b4(x, y) < 0.5) pset(x, y, e_mez(R.pget(x, y), C.k, 0.35));
}
function e_disco(R, t, o = {}) {
  const { rect, pset, disco } = R;
  e_fijo(R, 'gtE-disco', () => e_discoFondo(R));
  // la ventana de noche: cielo tramado, estrellas, la luna, nubes y la ciudad con luces
  e_cieloVentana(R, t, 16, 26, 74, 82, { cols: [hex('#141a3e'), hex('#1e2650'), hex('#2c3466'), hex('#3a3e74')], nubeCols: [hex('#2a2e5a'), hex('#3a3e6e'), hex('#565a8a')], horizonte: 78, tejado: hex('#14142a'), tejadoL: hex('#2a2a4a'), ventanita: hex('#f8d88a'), pajaro: hex('#0e1028'), vel: 0.6 });
  R.recorte([16, 26, 74, 82]); disco(60, 36, 5, hex('#f8f0d0')); disco(62, 35, 4, hex('#141a3e')); for (let k = 0; k < 8; k++) if (Math.sin(t * 2 + k * 3) > -0.3) pset(20 + Math.floor(h(k, 1, 104) * 50), 30 + Math.floor(h(k, 2, 104) * 22), hex('#e8e8ff')); R.recorte(null);
  rect(44, 25, 46, 83, hex('#e8dcc8')); rect(15, 53, 75, 55, hex('#e8dcc8'));
  // la tele de tubo con su resplandor que cambia (formas de colores, nada del juego)
  { const f = Math.floor(t * 1.5) % 4, cols = [[hex('#3a6ad8'), hex('#8ac0f0')], [hex('#d8603a'), hex('#f8c08a')], [hex('#3aa84a'), hex('#aae09a')], [hex('#8a5ad8'), hex('#c8a8f0')]][f];
    R.halo(224, 81, 40, [hex('#3a3060'), hex('#4a3e72')], 0.5);
    rect(200, 67, 244, 95, hex('#0a0a12')); for (let y = 68; y <= 94; y++) for (let x = 201; x <= 243; x++) { const u = ((x - 222) / 22.5) ** 4 + ((y - 81) / 14.5) ** 4; if (u > 1) continue; pset(x, y, y % 2 ? cols[0] : e_mez(cols[0], cols[1], 0.4 + 0.4 * Math.sin(x * 0.2 + t * 3))); }
    for (let k = 0; k < 5; k++) { const x = 206 + Math.round(h(k, f, 105) * 30), y = 72 + Math.round(h(k, f + 9, 105) * 18); rect(x, y, x + 4, y + 2, cols[1]); }
    rect(203, 70, 206, 70, hex('#ffffff')); pset(203, 71, hex('#ffffff')); }
  if (Math.sin(t * 2.2) > -0.2) pset(212, 113, hex('#4ae06a'));
  // la luz de la tele, que cambia de color, sobre la alfombra y el brazo del sofá
  { const f = Math.floor(t * 1.5) % 4, c = [hex('#6a9af0'), hex('#f0a060'), hex('#7ad07a'), hex('#b08af0')][f];
    e_luz(R, 160, 112, 290, 140, c, (x, y) => { const d = Math.hypot((x - 224) / 66, (y - 126) / 16); return d < 1 && e_b4(x, y) < 0.8 - d * 0.8 ? 0.22 : 0; }); }
  // el gato que duerme en el brazo del sofá: respira y mueve la punta de la cola
  { const r = Math.sin(t * 1.6) > 0.6 ? 1 : 0, cx = 178, cy = 104 - r, cola = Math.round(Math.sin(t * 1.1) * 2);
    R.poligono([[171, 106], [185, 106], [184, 102 - r], [180, cy - 2], [174, cy - 1], [171, 103]], C.k); R.poligono([[172, 105], [184, 105], [183, 102 - r], [180, cy - 1], [174, cy], [172, 103]], hex('#e09a4a'));
    rect(174, cy, 178, cy, hex('#f0b870')); for (const x of [176, 180]) pset(x, 104, hex('#b06a2a'));
    disco(172, 103 - r, 3, C.k); disco(172, 103 - r, 2, hex('#e09a4a')); pset(170, 100 - r, C.k); pset(174, 100 - r, C.k); pset(170, 101 - r, hex('#e09a4a')); pset(174, 101 - r, hex('#e09a4a'));
    pset(171, 103 - r, C.k); pset(173, 103 - r, C.k); pset(172, 104 - r, hex('#f8a0a0'));
    for (let k = 0; k < 7; k++) pset(185 + (k > 4 ? cola * (k - 4) / 2 : 0) | 0, 106 + k, k > 5 ? hex('#f0b870') : hex('#e09a4a'));
    if (Math.sin(t * 1.6) > 0.95) pset(166, 96 - Math.round((t * 4) % 3), hex('#c8c8e0')); }
  // dos polillas que dan vueltas a la lámpara
  for (let k = 0; k < 2; k++) { const a = t * (3 + k) + k * 2.4, mx = Math.round(287 + Math.cos(a) * (12 + k * 3)), my = Math.round(80 + Math.sin(a * 1.3) * 7); pset(mx, my, hex('#e8dcc0')); if (Math.sin(t * 30 + k) > 0) pset(mx + 1, my, hex('#b8ac90')); }
  // la lámpara de mesa con su halo
  R.halo(287, 78, 22, [hex('#5a4a5a'), hex('#8a6a5a'), hex('#c8a070')], 0.8);
  for (let y = 70; y <= 84; y++) { const w = 6 + Math.round((y - 70) * 0.5); rect(287 - w, y, 287 + w, y, y === 70 || y === 84 ? C.k : hex('#f4d890')); pset(287 - w, y, C.k); pset(287 + w, y, C.k); }
  return { suelo: 158, lados: [[20, 58], [264, 306]], mesa: { x0: 65, x1: 259, y: 136, frente: 153 }, disco: { x: 134, y: 145 }, caja: { x: 206, y: 145 }, tele: [194, 62, 254, 100], ventana: [16, 26, 74, 82] };
}
// lo de delante en el salón de 2005: la mesita baja con el disco que brilla, la lupa que pasa y la caja con candado y 18+
function e_discoDelante(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, P = E_DI;
  // la mesita: tablero en perspectiva con vetas, canto y patas
  poligono([[74, 136], [250, 136], [258, 146], [66, 146]], (x, y) => (h(x >> 3, y, 106) > 0.8 ? P.maderaS : y < 138 ? hex('#8a5a32') : (x + y * 3) % 19 === 0 ? hex('#8a5a32') : P.maderaL));
  linea(74, 136, 250, 136, C.k); linea(66, 146, 74, 136, C.k); linea(258, 146, 250, 136, C.k); linea(75, 137, 249, 137, hex('#c8905a'));
  rect(65, 147, 259, 153, C.k); rect(66, 147, 258, 152, P.madera); rect(66, 147, 258, 147, P.maderaL); rect(140, 149, 184, 151, P.maderaS); rect(160, 150, 164, 150, hex('#c8a040'));
  for (const x of [70, 252]) { rect(x - 2, 153, x + 3, 164, C.k); rect(x - 1, 153, x + 2, 163, P.madera); rect(x - 1, 153, x - 1, 163, P.maderaL); }
  // el disco que brilla, con sus destellos
  const dx = 134, dy = 145;
  R.halo(dx, dy - 16, 26, [hex('#5a4a6a'), hex('#8a7aa0'), hex('#c8c0e0')], 0.7);
  PIEZAS_GT.disco?.(R, dx, dy, { t, s: 2 });
  for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1, a = k * 2.1 + t * 0.3, r = 18 + u * 6, sx = Math.round(dx + Math.cos(a) * r), sy = Math.round(dy - 16 + Math.sin(a) * r * 0.8), s = u < 0.5 ? 1 : 0; pset(sx, sy, hex('#ffffff')); if (s) { pset(sx - 1, sy, hex('#e0e0ff')); pset(sx + 1, sy, hex('#e0e0ff')); pset(sx, sy - 1, hex('#e0e0ff')); pset(sx, sy + 1, hex('#e0e0ff')); } }
  // la caja cerrada con candado y 18+ (o.caja: sale del disco y se posa a su lado)
  const cj = Math.max(0, Math.min(1, o.caja ?? 1)), bx = Math.round(dx + (206 - dx) * cj), by = Math.round(dy - 14 + 14 * cj);
  if (cj > 0) { const dib = (x, y, c) => { if (cj >= 1 || e_b4(x, y) < cj) pset(x, y, c); };
    const x0 = bx - 18, y0 = by - 26, x1 = bx + 18, y1 = by;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const borde = x === x0 || x === x1 || y === y0 || y === y1; dib(x, y, borde ? C.k : y < y0 + 8 ? hex('#7a4a2a') : x > x1 - 4 ? hex('#5a3420') : hex('#8e5a34')); }
    for (let x = x0 + 1; x < x1; x++) { dib(x, y0 + 8, C.k); dib(x, y0 + 1, hex('#b07a4a')); } for (let y = y0 + 1; y < y1; y++) { dib(x0 + 6, y, hex('#c8a040')); dib(x1 - 6, y, hex('#c8a040')); }
    if (cj >= 1) { R.numero('18+', bx + 1, y1 - 4, { color: hex('#ffffff'), centro: true, sombra: false }); }
    // el candado con su arco
    const lx = bx, ly = y0 + 8, sw = Math.round(Math.sin(t * 2) * 1);
    for (let a = Math.PI; a <= 2 * Math.PI; a += 0.15) dib(Math.round(lx + Math.cos(a) * 4), Math.round(ly - 3 + Math.sin(a) * 4), hex('#c8ccd8'));
    for (let y = ly - 3; y <= ly + 4; y++) for (let x = lx - 5 + sw; x <= lx + 5 + sw; x++) dib(x, y, x === lx - 5 + sw || x === lx + 5 + sw || y === ly - 3 || y === ly + 4 ? C.k : y < ly ? hex('#ffe070') : hex('#e0b030'));
    dib(lx + sw, ly, C.k); dib(lx + sw, ly + 1, C.k); dib(lx - 3 + sw, ly - 2, hex('#fff6c0')); }
  // la lupa que pasa por encima del disco
  if (o.lupa !== false) { const u = o.lupa ?? (0.5 + 0.5 * Math.sin(t * 0.9)), lx = Math.round(100 + u * 64), ly = Math.round(126 + Math.sin(t * 1.7) * 3); e_lupa(R, lx, ly, 10, 1); }
  return { lupa: o.lupa === false ? null : true };
}

// los charcos de la calzada de la calle nevada: [x, y, radio x, radio y, reflejos [[x, ancho, color]]] (el escaparate,
// la farola y las ventanas de enfrente se reflejan como columnas de luz rotas por las ondas)
const c_CHARCOS = [
  [64, 161, 26, 3, [[40, 4, '#f0c27a'], [50, 3, '#e8b060'], [62, 5, '#f0c27a'], [74, 2, '#c8985a'], [84, 2, '#f2c878']]],
  [186, 171, 16, 3, [[184, 4, '#fff2c0'], [176, 1, '#8a7a6a'], [195, 1, '#8a7a6a']]],
  [116, 175, 18, 2, [[104, 3, '#f0c27a'], [114, 2, '#e8b060'], [124, 3, '#f8d890']]],
];

// ════ provisionales del resto (se sustituyen abajo) ════
// una grieta del suelo que avanza a saltos desde (x, y): la raya oscura y, debajo, el canto con luz; sem la hace única
function d_grieta(R, x, y, n, c, cL, sem, x0 = 0, y0 = 0, x1 = 319, y1 = 179) {
  for (let i = 0; i < n; i++) { const dx = 1 + Math.floor(h(i, sem, 790) * 3) * (h(i, sem, 791) < 0.15 ? -1 : 1), dy = h(i, sem, 792) < 0.3 ? -1 : h(i, sem, 792) > 0.7 ? 1 : 0;
    for (let s = 0; s < Math.abs(dx); s++) { x += Math.sign(dx); if (x < x0 || x > x1 || y < y0 || y > y1) return; R.pset(x, y, c); if (y + 1 <= y1 && h(x, y, 793) < 0.6) R.pset(x, y + 1, cL); }
    y += dy; if (h(i, sem, 794) < 0.12) d_grieta(R, x, y, Math.max(2, n - i - 3), c, cL, sem + 31, x0, y0, x1, y1); }
}

// las vetas del cielo de 'tresde' (en el búfer fijo): cirros finos, alargados, del tono de la franja siguiente del propio
// degradado (así las nubes, que se pintan solo sobre el cielo, pasan por delante); nunca en la esquina de Atom ni en la
// barra del año
function d_cieloVetas(R, est) {
  const B = R.buf, cielo = d_EST[est].cielo.map(hex), n = cielo.length;
  for (let k = 0; k < 46; k++) { const y = 16 + Math.round(h(k, 1, 795) * 62), x0 = Math.round(h(k, 2, 795) * 330) - 10, len = 12 + Math.round(h(k, 3, 795) * 34), u = Math.min(1, y / 86) * (n - 1), i = Math.min(n - 1, Math.floor(u) + 1);
    for (let j = 0; j < 2; j++) for (let x = x0 + j * 4; x < x0 + len - j * 6; x++) { const yy = y + j + Math.round(Math.sin(x * 0.05 + k) * 0.6); if (x < 0 || x > 319 || yy > 86 || (x > 266 && yy < 52) || (x < 176 && yy < 17)) continue; const p = yy * 320 + x; if (cielo.includes(B[p]) && d_umbral(x, yy) < 0.75 - Math.abs((x - x0) / len - 0.5)) B[p] = cielo[i]; } }
}

// el horizonte lejano de la Nueva York inventada (detrás de los rascacielos del centro): una fila de edificios bajos casi
// del color de la bruma de punta a punta, con ventanas, depósitos de agua de madera en los tejados y, a la izquierda, un
// puente colgante lejano con su comba y sus tirantes; todo por debajo de y 56, lejos de la esquina de Atom
function d_lejanaNueva(R) {
  const { rect, pset, linea, poligono } = R, base = [hex('#aeb5c4'), hex('#a6aebe'), hex('#b2b8c6')], vent = hex('#c8d0dc'), dep = hex('#949cae');
  let x = -4, k = 0;
  while (x < 320) { const w = 6 + Math.round(h(k, 1, 796) * 9), top = 64 + Math.round(h(k, 2, 796) * 14) - (x > 96 && x < 230 ? 6 : 0), c = base[k % 3];
    if (!(x < 100 && top < 70)) { rect(x, top, x + w, 88, c); rect(x + w, top, x + w, 88, d_mezcla(c, d_C.k, 0.08)); rect(x, top, x + w, top, d_mezcla(c, d_C.blanco, 0.2));
      for (let yy = top + 2; yy < 86; yy += 3) for (let xx = x + 1; xx < x + w; xx += 2) if (h(xx, yy, 797) < 0.22) pset(xx, yy, vent);
      if (h(k, 3, 796) < 0.4 && w > 7) { const dx = x + 2 + Math.round(h(k, 4, 796) * (w - 6)); rect(dx, top - 3, dx + 3, top - 1, dep); poligono([[dx - 1, top - 3], [dx + 4, top - 3], [dx + 1.5, top - 5]], dep); pset(dx, top - 1, c); pset(dx + 3, top - 1, c); } }
    x += w + 1; k++; }
  // el puente colgante lejano (x 8–96): dos torres, la comba de los cables, los tirantes y el tablero
  const T1 = 22, T2 = 80, top = 60, deck = 80, pc = hex('#8e98ac'), pcL = hex('#a4acbe');
  for (let xx = 0; xx <= 102; xx++) { const cy = xx < T1 ? top + (T1 - xx) * 0.8 : xx > T2 ? top + (xx - T2) * 0.8 : top + 14 * 4 * ((xx - T1) / (T2 - T1)) * (1 - (xx - T1) / (T2 - T1)); const y = Math.round(Math.min(deck, cy)); pset(xx, y, pc); if (xx % 3 === 0) for (let yy = y + 1; yy < deck; yy++) pset(xx, yy, pcL); }
  for (const tx of [T1, T2]) { rect(tx - 1, top - 2, tx + 1, 86, pc); pset(tx - 1, top - 2, pcL); rect(tx - 1, top + 6, tx + 1, top + 6, pcL); }
  rect(0, deck, 102, deck + 1, pc); rect(0, deck, 102, deck, pcL);
}

// el detalle del suelo de 'tresde' (en el búfer fijo, encima del suelo liso): en la calle de delante, las rodadas de los
// carriles, parches de asfalto con su junta, grietas, manchas de aceite, dos sumideros junto al bordillo y otra tapa de
// registro; en la acera de los personajes, juntas rotas, chicles, una mancha de humedad y una trampilla de sótano de chapa
// estriada; en los solares, la trama suave del plano (sin tapar las huellas de la ciudad plana); y según el estilo, la
// nieve sucia junto a los bordillos (nueva), la arena que se cuela (ochenta) o las hojas secas (tres)
function d_sueloTresde(R, est) {
  const { rect, pset, poligono, linea } = R, B = R.buf, E = d_EST[est], asf = hex(E.asf), acera = hex(E.acera), aceraS = hex(E.aceraS);
  const P = (X, Z) => [d_px(X, Z), d_py(0, Z)], Zy = (y) => d_HC * d_F / (y - d_PF[1]);
  // las rodadas: a cada lado del centro de los dos carriles, una banda algo gastada
  for (let y = 121; y < 150; y++) { const Z = Zy(y); for (const zc of [17.6, 23.8]) { const d = Math.abs(Z - zc); if (d < 0.45 || d > 1.25) continue; for (let x = 0; x < 320; x++) if (d_umbral(x, y) < 0.5) d_tinte(R, x, y, d_C.k, 0.08); } }
  // los parches de asfalto nuevo (más oscuros, con la junta)
  for (const [X0, X1, Z0, Z1] of [[-13, -6, 15.8, 18.6], [9.5, 17, 22.6, 26.6], [2, 6, 16.2, 17.6], [-25, -15, 21.2, 24.8], [22, 30, 16.4, 19.2]]) {
    const q = [P(X0, Z0), P(X1, Z0), P(X1, Z1), P(X0, Z1)], c = d_mezcla(asf, d_C.k, 0.14); poligono(q, c);
    for (let i = 0; i < 4; i++) linea(Math.round(q[i][0]), Math.round(q[i][1]), Math.round(q[(i + 1) % 4][0]), Math.round(q[(i + 1) % 4][1]), i === 0 ? d_mezcla(asf, d_C.blanco, 0.14) : d_mezcla(asf, d_C.k, 0.32));
    const [ax, ay] = q[3], [bx, by] = q[1]; for (let n = 0; n < 30; n++) { const x = Math.round(ax + h(n, X0, 798) * (bx - ax)), y = Math.round(ay + h(n, Z0, 798) * (by - ay)); if (B[y * 320 + x] === c) pset(x, y, d_mezcla(c, d_C.blanco, 0.1)); } }
  // las grietas y las manchas de aceite de los carriles
  const gC = d_mezcla(asf, d_C.k, 0.42), gL = d_mezcla(asf, d_C.blanco, 0.1);
  for (const [x, y, n, s] of [[30, 140, 16, 1], [118, 127, 10, 2], [236, 144, 14, 3], [276, 124, 9, 4], [180, 147, 8, 5], [62, 129, 8, 6]]) d_grieta(R, x, y, n, gC, gL, s, 0, 121, 319, 149);
  for (const [X, zc, r] of [[-3, 17.6, 1.3], [12, 17.6, 0.9], [-19, 23.8, 1.4], [4, 23.8, 1.0], [27, 23.8, 1.1]]) { const [cx, cy] = P(X, zc), rx = r * d_F / zc, ry = rx * 0.32;
    for (let j = -Math.ceil(ry); j <= Math.ceil(ry); j++) for (let i = -Math.ceil(rx); i <= Math.ceil(rx); i++) { const e = (i / rx) ** 2 + (j / ry) ** 2, x = Math.round(cx + i), y = Math.round(cy + j); if (e < 1 && d_umbral(x, y) < 1.1 - e) d_tinte(R, x, y, hex('#1e1c26'), e < 0.3 ? 0.4 : 0.22); }
    pset(Math.round(cx - rx * 0.3), Math.round(cy - ry * 0.4), hex('#7a6a9a')); pset(Math.round(cx + rx * 0.2), Math.round(cy), hex('#5a8a8a')); }
  // los sumideros junto al bordillo de delante y otra tapa de registro en el carril de lejos
  for (const sx of [72, 262]) { rect(sx, 145, sx + 16, 149, hex('#24242c')); rect(sx, 145, sx + 16, 145, hex('#4a4a54')); for (let x = sx + 2; x < sx + 16; x += 2) rect(x, 146, x, 148, hex('#6a6a74')); rect(sx, 149, sx + 16, 149, d_mezcla(asf, d_C.k, 0.3)); }
  { const [cx, cy] = P(-10, 25.5); for (let j = -2; j <= 2; j++) for (let i = -6; i <= 6; i++) if ((i / 6.2) ** 2 + (j / 2) ** 2 < 1) pset(Math.round(cx) + i, Math.round(cy) + j, (i + j) % 2 ? hex('#3a3c44') : hex('#2a2c34')); pset(Math.round(cx) - 3, Math.round(cy) - 1, hex('#6a6c74')); }
  // la acera: juntas rotas, chicles, una mancha de humedad y la trampilla del sótano
  const aC = d_mezcla(aceraS, d_C.k, 0.25), aL = d_mezcla(acera, d_C.blanco, 0.25);
  for (const [x, y, n, s] of [[40, 160, 12, 11], [176, 171, 10, 12], [296, 158, 9, 13], [96, 176, 8, 14], [210, 156, 7, 15]]) d_grieta(R, x, y, n, aC, aL, s, 0, 154, 319, 179);
  for (let n = 0; n < 46; n++) { const x = Math.round(h(n, 1, 799) * 319), y = 155 + Math.round(h(n, 2, 799) * 24); pset(x, y, d_mezcla(acera, d_C.k, 0.35)); if (n % 3 === 0) pset(x + 1, y, d_mezcla(acera, d_C.k, 0.2)); }
  for (let j = -4; j <= 4; j++) for (let i = -16; i <= 16; i++) { const e = (i / 16) ** 2 + (j / 4) ** 2, x = 120 + i + Math.round(Math.sin(j) * 2), y = 164 + j; if (e < 1 && d_umbral(x, y) < 0.8 - e * 0.6) d_tinte(R, x, y, aceraS, 0.35); }
  { const q = [P(5.4, 12.9), P(9.2, 12.9), P(9.6, 11.4), P(5.6, 11.4)], ch = hex('#6e7280'); poligono(q, ch); const [x0, y0] = q[0], [x1, y1] = q[2];
    for (let y = Math.round(y0) + 1; y < y1; y++) for (let x = Math.round(Math.min(x0, q[3][0])); x <= Math.round(Math.max(x1, q[1][0])); x++) if (B[y * 320 + x] === ch && (x + y * 2) % 4 === 0) pset(x, y, hex('#9aa0ae'));
    for (let i = 0; i < 4; i++) linea(Math.round(q[i][0]), Math.round(q[i][1]), Math.round(q[(i + 1) % 4][0]), Math.round(q[(i + 1) % 4][1]), i === 2 ? hex('#a8aebc') : hex('#3a3c48'));
    linea(Math.round((q[0][0] + q[1][0]) / 2), Math.round(q[0][1]), Math.round((q[2][0] + q[3][0]) / 2), Math.round(q[2][1]), hex('#3a3c48'));
    for (const f of [0.3, 0.7]) { const hx = Math.round(q[3][0] + (q[2][0] - q[3][0]) * f); rect(hx - 1, Math.round(q[2][1]) - 2, hx + 1, Math.round(q[2][1]) - 1, hex('#4a4c58')); } }
  // los solares: la trama del plano, muy suave
  for (let y = 87; y < 121; y++) { const Z = Zy(y); if (Z < 28) continue; for (let x = 0; x < 320; x++) { const X = Math.abs((x - d_PF[0]) * Z / d_F); if (X < 11.2) continue;
    const linea2 = Math.floor(X / 6) !== Math.floor((X - 0.35 * Z / 40) / 6) || Math.floor(Z / 14) !== Math.floor((Z - 0.12 * Z / 30) / 14);
    if (linea2) d_tinte(R, x, y, d_C.blanco, 0.12); else if (h(x, y, 800) < 0.1) d_tinte(R, x, y, d_C.k, 0.08); } }
  // el estilo: la nieve sucia (nueva), la arena (ochenta) o las hojas secas (tres)
  if (est === 'nueva') {
    for (let x = 0; x < 320; x++) { const a = 0.5 + 0.5 * Math.sin(x * 0.07) * Math.sin(x * 0.021 + 1); for (let y = 145; y < 150; y++) if (d_umbral(x, y) < a * (y - 144) / 6) d_tinte(R, x, y, hex('#c8ccd4'), 0.55);
      for (let y = 154; y < 158; y++) if (d_umbral(x, y) < a * (158 - y) / 4) pset(x, y, y === 154 ? hex('#f4f6fa') : hex('#dce2ea'));
      for (let y = 121; y < 124; y++) if (d_umbral(x, y) < a * 0.6) d_tinte(R, x, y, hex('#d8dde6'), 0.5); }
    for (let y = 87; y < 121; y++) for (let x = 0; x < 320; x++) if (h(x >> 2, y >> 1, 801) < 0.25 && d_umbral(x, y) < 0.5) d_tinte(R, x, y, d_C.blanco, 0.45);
  } else if (est === 'ochenta') {
    for (let x = 0; x < 320; x++) { const a = 0.5 + 0.5 * Math.sin(x * 0.05 + 2); for (let y = 145; y < 150; y++) if (d_umbral(x, y) < a * (y - 144) / 7) d_tinte(R, x, y, hex('#f4e0b0'), 0.5); for (let y = 154; y < 157; y++) if (d_umbral(x, y) < a * (157 - y) / 4) d_tinte(R, x, y, hex('#f8e8c0'), 0.6); }
  } else {
    for (let n = 0; n < 90; n++) { const x = Math.round(h(n, 3, 802) * 319), y = n < 50 ? 145 + Math.round(h(n, 4, 802) * 4) : 154 + Math.round(h(n, 4, 802) * 25), c = [hex('#d8782e'), hex('#c84a2a'), hex('#e8b040'), hex('#a8582a')][n % 4]; pset(x, y, c); if (n % 2) pset(x + 1, y, c); if (n % 3 === 0) pset(x, y - 1, d_mezcla(c, d_C.blanco, 0.3)); }
  }
}

// el semáforo de la esquina de la avenida (x, suelo, escala s): el poste con su base, la caja con las tres luces que
// cambian con t (verde, ámbar, rojo; el mismo ciclo para los dos) y la luz de la que está encendida; con la bruma nb
function d_semaforo(R, t, x, yb, s, nb, bruma) {
  const { rect, pset } = R, c = (k) => d_mezcla(k, bruma, nb), alto = Math.round(4.6 * s), w = Math.max(2, Math.round(0.42 * s)), hh = Math.round(1.5 * s), top = yb - alto;
  rect(x, top, x, yb, c(hex('#2e323c'))); rect(x - 1, yb - 1, x + 1, yb, c(hex('#2e323c')));
  rect(x - w, top - hh, x + w, top, c(hex('#262a32'))); rect(x - w, top - hh, x - w, top, c(hex('#4a4e5a')));
  const f = (t % 7) / 7, on = f < 0.45 ? 2 : f < 0.56 ? 1 : 0, cols = [hex('#ff4a3a'), hex('#ffb030'), hex('#4aff8a')], off = [hex('#5a2a2a'), hex('#5a4a2a'), hex('#2a4a34')];
  for (let i = 0; i < 3; i++) { const ly = top - hh + 1 + Math.round(i * (hh - 2) / 2); pset(x, ly, i === on ? cols[i] : c(off[i])); if (i === on && w > 1) { pset(x - 1, ly, d_mezcla(cols[i], d_C.blanco, 0.3)); pset(x + 1, ly, d_mezcla(cols[i], hex('#262a32'), 0.4)); } }
}

// las palomas del fondo de la acera de delante (x 40–72, y 158–163, detrás de la línea de suelo de los personajes; gaviotas
// en 'ochenta' y 'tres'): picotean,
// dan saltitos y de vez en cuando una se va volando y vuelve
function d_palomas(R, t, est) {
  const { pset, rect } = R, gav = est !== 'nueva', cu = gav ? hex('#f4f2ec') : hex('#7a7e8c'), cuS = gav ? hex('#b8bcc4') : hex('#5a5e6a'), ca = gav ? hex('#f4f2ec') : hex('#9aa0ae');
  for (const [x0, y0, k] of [[44, 161, 0], [56, 159, 1], [68, 162, 2]]) {
    const ciclo = (t + k * 2.3) % 9, vuela = ciclo > 7.2, u = vuela ? (ciclo - 7.2) / 1.8 : 0, x = Math.round(x0 + Math.sin(t * 0.4 + k) * 3 + (vuela ? Math.sin(u * Math.PI) * 8 : 0)), y = Math.round(y0 - (vuela ? Math.sin(u * Math.PI) * 14 : 0)), d = Math.sin(t * 0.4 + k) > 0 ? 1 : -1;
    if (!vuela) { rect(x - 1, y + 1, x + 2, y + 1, d_mezcla(hex('#2a2a32'), cu, 0.5)); }
    rect(x - 2, y - 2, x + 1, y, cu); pset(x - 2 * d, y - 2, cuS); rect(x - 1, y, x + 1, y, cuS);
    const pica = !vuela && Math.floor(t * 3 + k) % 3 === 0, hx = x + 2 * d, hy = y - (pica ? 1 : 3); pset(hx, hy, ca); pset(hx + d, hy + (pica ? 1 : 0), gav ? hex('#f0b030') : hex('#d8a040')); if (!gav) pset(x + d, y - 2, hex('#6aa08a'));
    if (vuela) { const a = Math.floor(t * 12) % 2; pset(x - 3, y - 3 - a, cu); pset(x + 2, y - 3 - a, cu); pset(x - 4, y - 2 - a * 2, cuS); pset(x + 3, y - 2 - a * 2, cuS); }
    else { pset(x - 1, y + 1, hex('#d87a5a')); pset(x + 1, y + 1, hex('#d87a5a')); } }
}

// un avión lejano que cruza el cielo con la luz que parpadea y su estela (solo sobre el cielo, nunca por la esquina de
// Atom ni por la barra del año)
function d_avion(R, t, esCielo) {
  const u = (t * 9) % 520 - 60, x = Math.round(u), y = Math.round(22 + u * 0.02);
  for (let i = 1; i < 40; i++) { const xx = x - i - 3; if (xx < 0 || xx > 319 || !esCielo(xx, y) || d_atom(xx, y) || (xx < 176 && y < 17)) continue; if (d_umbral(xx, y) < 0.7 - i / 60) d_tinte(R, xx, y, d_C.blanco, 0.5); }
  for (const [dx, dy, c] of [[0, 0, hex('#e8ecf2')], [-1, 0, hex('#c8ccd4')], [-2, 0, hex('#c8ccd4')], [1, 0, hex('#c8ccd4')], [-1, -1, hex('#a8b0bc')], [-1, 1, hex('#a8b0bc')], [-3, -1, hex('#a8b0bc')]]) {
    const xx = x + dx, yy = y + dy; if (xx < 0 || xx > 319 || d_atom(xx, yy) || (xx < 176 && yy < 17) || !esCielo(xx, yy)) continue; R.pset(xx, yy, c); }
  if (x > 0 && x < 268 && Math.floor(t * 2.2) % 2 && esCielo(x - 1, y + 1)) R.pset(x - 1, y + 1, hex('#ff4040'));
}

// el techo de la sala de pruebas (en el búfer fijo), fuera de la barra del año y de la esquina de Atom: la rejilla del aire
// acondicionado (x 250–274) y el detector de humo (x 176)
function d_techoBoton(R) {
  const { rect, pset, disco } = R;
  rect(250, 2, 274, 10, hex('#9a968e')); rect(251, 3, 273, 9, hex('#e8e6e0')); for (let y = 4; y < 9; y += 2) rect(252, y, 272, y, hex('#a8a49c')); rect(251, 9, 273, 9, hex('#c4c0b8')); for (const x of [252, 272]) pset(x, 3, hex('#7a766e'));
  disco(176, 6, 3, hex('#b8b4ac')); disco(176, 6, 2, hex('#f4f2ec')); pset(175, 5, d_C.blanco);
}

// lo que se mueve en el techo de la sala de pruebas: las tiras de papel atadas a la rejilla del aire, que ondean, y el
// piloto del detector de humo
function d_techoBotonVivo(R, t) {
  for (let k = 0; k < 3; k++) { const x0 = 254 + k * 7; for (let j = 0; j < 5; j++) { const x = Math.round(x0 + Math.sin(t * 6 + k * 1.7 + j * 0.8) * j * 0.35 + j * 0.5); R.pset(x, 11 + j, k % 2 ? hex('#e4483e') : hex('#f4f2ec')); } }
  R.pset(177, 7, Math.floor(t * 1.1) % 3 === 0 ? hex('#ff3a3a') : hex('#7a2a2a'));
}

// el detalle del asfalto de la ciudad desde arriba (en el búfer fijo, antes de las líneas): manchas de aceite en el centro
// de los carriles, parches de asfalto nuevo con su junta, grietas y las marcas de frenazo junto a los cruces
function d_asfaltoArriba(R) {
  const { rect, pset } = R;
  const mancha = (cx, cy, rx, ry) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2, x = cx + i, y = cy + j; if (e < 1 && d_umbral(x, y) < 1.1 - e) d_tinte(R, x, y, hex('#1e1c26'), e < 0.35 ? 0.4 : 0.22); } };
  for (const [a, b] of d_H) for (const cy of [a + 3, b - 3]) for (let n = 0; n < 7; n++) { const cx = Math.round(h(n, cy, 803) * 300) + 10; if (d_V.some(([p, q]) => cx > p - 6 && cx < q + 6) || (cx > d_RIO[0] - 6 && cx < d_RIO[1] + 6)) continue; mancha(cx, cy, 2 + (n % 2), 1); }
  for (const [a, b] of d_V) for (const cx of [a + 3, b - 3]) for (let n = 0; n < 6; n++) { const cy = Math.round(h(n, cx, 804) * 170) + 5; if (d_H.some(([p, q]) => cy > p - 6 && cy < q + 6)) continue; mancha(cx, cy, 1, 2 + (n % 2)); }
  for (const [x0, y0, x1, y1] of [[20, 51, 34, 56], [120, 125, 138, 130], [254, 119, 266, 124], [73, 20, 78, 34], [186, 140, 191, 156], [290, 57, 304, 62]]) { rect(x0, y0, x1, y1, d_C.asfS); rect(x0, y0, x1, y0, d_C.asfR); rect(x0, y0, x0, y1, d_C.asfR); rect(x0 + 1, y1, x1, y1, d_C.asfL); rect(x1, y0 + 1, x1, y1, d_C.asfL); for (let n = 0; n < 6; n++) pset(x0 + 1 + Math.round(h(n, x0, 805) * (x1 - x0 - 2)), y0 + 1 + Math.round(h(n, y0, 805) * (y1 - y0 - 2)), d_C.asf); }
  for (const [x, y, n, s, lim] of [[2, 61, 14, 21, d_H[0]], [140, 120, 12, 22, d_H[1]], [262, 128, 10, 23, d_H[1]], [200, 52, 9, 24, d_H[0]]]) d_grieta(R, x, y, n, d_C.asfR, d_C.asfL, s, 0, lim[0] + 1, 319, lim[1] - 1);
  // las marcas de frenazo: dos curvas paralelas que acaban en el paso de cebra
  for (const [x0, y0, d] of [[96, 59, 1], [214, 122, -1]]) for (const o of [0, 3]) for (let i = 0; i < 18; i++) { const x = x0 + i * d, y = y0 + o - Math.round((i / 18) ** 2 * 3); if (d_umbral(x, y) < 0.8 - i / 30) pset(x, y, d_C.asfR); }
}
