// Fontanería y decorados del episodio 48 (El tesoro de Beale: una fortuna escondida en tres páginas de números), con el
// canon del 43 (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris azulado), al nivel de
// episodios/ESTANDAR.md: el detalle de siempre. Reutiliza F el estudio de las pausas del 43 (hm-comun.js: estudio) y
// añade: A Lynchburg 1820–1885 (lynchburg), B el oeste 1817–1821 (oeste), C el condado de Bedford (bedford), D el cuarto
// del amigo y la imprenta 1862–1885 (cuarto), E los buscadores 1898–1983 (buscadores), y las piezas (pausa y d_*).
// SIN LETRAS en pantalla (solo números y símbolos), con UNA excepción: las letras sueltas de la tira de Gillogly
// (d_tira). Las hojas de Beale son COLUMNAS DE NÚMEROS (la primera empieza 71, 194, 38, 1701…). La Declaración de
// Independencia se ve como un pergamino con renglones de rayitas, nunca legible. NADA MORBOSO: el cementerio de 1983 se ve
// de lejos (la iglesia blanca, la valla, un seto y la excavadora; ninguna tumba ni lápida a la vista); la dinamita, un
// resplandor y tierra que salta, lejos y sin nadie cerca. Personas reales, con respeto y sin parecidos inventados.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. La barra del tiempo (x 20–170, y 0–14) se deja libre.
//
//   import * as T from '/atomo/plato/escenas/bl-comun.js';
//   const { E, R, M } = await T.preparar('bl-gancho');
//   T.rodar(E, R, [[0, (t) => T.bedford(R, t, { encuadre: 'bosque', noche: true })]], { año: 1885 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 48 por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores)
export { ELENCO_BL as BL } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';
import * as AT from '/atomo/plato/escenas/atom-personaje.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras, AT };
// F · el estudio de las pausas (del 43): se usa tal cual
export { estudio, estudioDelante } from '/atomo/plato/escenas/hm-comun.js';

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // Lynchburg: ladrillo, tabaco curado, el río James, la madera de la posada, el hierro de la caja
    ladrillo: '#8a4a36', ladrilloS: '#5a2e22', tabaco: '#a8743a', tabacoS: '#6e4a24', rio: '#4a6a72', rioL: '#8aaab0',
    roble: '#6a4a2a', robleS: '#4a3220', hierro: '#3a3a42', hierroL: '#6a6a74', oxido: '#8a4a2a',
    // el oeste: la pradera, el polvo, el atardecer del barranco, el oro
    pradera: '#b0a058', polvo: '#c8a878', roca: '#9a6a4a', rocaS: '#6a4430', ocaso: '#e8885a', oro: '#f0c040', oroL: '#fff0a0', oroS: '#a87820',
    // Bedford: el bosque de robles y nogales, los picos de Otter, la noche con luna, el farol
    bosque: '#2e4a32', bosqueL: '#4a6a3e', picos: '#5a6a8a', noche: '#1a2236', luna: '#e8ecd8', farol: '#ffd890', farolS: '#e8a040',
    // el papel de las hojas y del folleto, la tinta, la vela
    papel: '#ece2c8', papelV: '#d8c890', tinta: '#1c1a2a', vela: '#ffd890',
    // los buscadores: el verde de las máquinas de 1930, el beige del UNIVAC, el ámbar de los terminales de 1980
    maquina: '#4a5a4a', univac: '#c8c0a8', ambar: '#f0a030', amarillo: '#e8c030',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep48');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: la llave (1817–1885, la caja, la clave y el folleto) y la pala (1886–hoy, los que cavan)
  Object.assign(R.ICONOS, {
    llave: ['.##....', '#..#...', '#..####', '.##..#.', '.....#.', '.......', '.......'],
    pala: ['......#', '.....#.', '....#..', '...#...', '.##....', '###....', '.#.....'],
  });
  R.tramosTiempo([[1817, 1886, R.PALA.ORO, 'llave'], [1886, 2027, R.PALA.ROJO, 'pala']]);
  R.companero = () => {};   // canon del 43: Atom no vive en la esquina, actúa en la escena (T.AT)
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };




// ── A · Lynchburg, 1820–1885 ─────────────────────────────────────────────────────────────────────────────────────────
// Un pueblo de tabaco de Virginia junto al río James, de ladrillo y madera. Cada encuadre pinta los 320 × 180 en cada
// fotograma: lo fijo va en un búfer (uno por encuadre y variante) y encima la vida (nubes de tres tonos a tres
// velocidades, cuervos, nieve, humo, fuego, velas, gente pequeña de fondo, barcas en el río, carretas, perros, gatos…).
// o.encuadre:
//   'calle' (por omisión), o.camara 'general': LA CALLE PRINCIPAL en invierno (1820), de frente. A la izquierda dos
//     almacenes de tabaco de ladrillo (x 0–62, con frontón, el portón en arco x 14–48 y la polea que mece una barrica
//     colgada; x 62–120, con el letrero pintado de una hoja de tabaco y una barrica, sin letras, y barricas apiladas
//     delante en x 98–120). Entre los almacenes y la posada (x 120–194) el callejón baja al río James: el muelle, una
//     barca larga de tabaco (bateau) con dos bogadores que cruza, el puente cubierto sobre pilas de piedra con gente que
//     pasa, y detrás las colinas nevadas con casas, árboles y una iglesia blanca. A la derecha LA POSADA (x 194–320):
//     dos alturas de ladrillo, tejado de pizarra con dos chimeneas que humean, tres ventanas altas (x 204–222, 240–262 y
//     284–302, y 64–86), el porche de columnas blancas (x 194–280, columnas en x 201, 239 y 275) con la puerta (x
//     210–232, y 108–142, montante encendido) y las ventanas bajas encendidas (x 245–265 y 285–305; en la primera pasan las sombras de los
//     huéspedes); el letrero colgante con una JARRA (x 170–192, y 96–114) se mece. Acera de ladrillo en espiga (y
//     142–153), bordillo y la calle de barro con rodadas, charcos helados y nieve; un perro cruza la calle. Nieva.
//     o.soldados true (1862): primavera, sin nieve; banderines rojos y blancos en el porche, farolas de gas, una columna
//     de soldados pequeños de gris baja por el callejón y cruza el puente, y una carreta de suministros con toldo pasa
//     por el muelle; sin armas. o.noche true (1885): de noche, con luna y estrellas, farolas de gas encendidas (x 16, 188
//     y 306), la calle vacía y SOLO LA VENTANA ALTA x 240–262, y 64–86 encendida, con la silueta de un hombre que escribe
//     (devuelve .ventana [251, 75]); la luna se refleja en el río; un gato en las barricas. o.nieve fuerza la nevada.
//     Suelo y 150 (los pies en la acera), libre x 30–196; puerta de la posada en x 221 (escalones x 204–238, y 146–150).
//   'calle', o.camara 'puerta': EL PORCHE DE LA POSADA más cerca, a la escala de los personajes: arriba el piso alto de
//     ladrillo con dos ventanas y la balaustrada; el alero blanco y el techo de tablas azul pálido; columnas blancas en x
//     33–45 y 284–296; a la izquierda (x 0–33) la calle nevada con el almacén de enfrente, un vecino que pasa y la
//     barandilla. LA PUERTA ABIERTA (hueco x 129–157, y 103–146; montante en abanico y una guirnalda) con el zaguán
//     encendido (escalera, aplique con vela, cuadro, perchero, alguien que cruza al fondo) y su luz sobre el felpudo; el
//     farol de pared (x 116) y el farol colgado del techo (x 222) que se mece; el letrero de la jarra colgado (x 74–94, y
//     58–80); la ventana en penumbra (x 62–92) y la encendida (x 180–210, y 98–128) con contraventanas; el banco (asiento y
//     138, x 174–216) con un gato dormido; EL BUZÓN DE MADERA a la altura del pecho (x 230–246, y 116–132; o.buzon 0–1
//     abre su tapa: devuelve .buzon [238, 124] y .ranura [238, 120]); un barril con un cubo y una pala, la escoba, el
//     limpiabarros, una mecedora (x 256–282) y un ventisquero con pisadas. Suelo y 150 (tablas del porche), libre x
//     48–228. Nieva fuera (o.nieve false la quita).
//   'posada', o.camara 'general': EL COMEDOR DE LA POSADA de noche: techo de vigas con manojos de tabaco colgados y una
//     lámpara de rueda con cuatro velas que se mecen; paredes encaladas ahumadas con friso de tablas (moldura y 117–120);
//     LA CHIMENEA de piedra (x 14–96; boca x 30–82, y 104–140) con fuego, caldero colgado de su grúa que echa vapor,
//     morillos, velas y platos de peltre en la repisa (y 82), leña, y su resplandor; dos ventanas (x 112–138 y 150–176, y
//     50–104) con la nieve cayendo fuera y una luz lejana; la mesa larga del fondo (x 100–196, tablero y 126) con cuatro
//     huéspedes sentados que comen y charlan (uno bebe de su jarra), velas, jarra, platos y pan; un cuadro; detrás del
//     mostrador, baldas con botellas y jarras (x 204–276), un barrilito, el tablero de llaves numeradas que se mecen (x
//     279–307, y 66–104) y la puerta del zaguán (x 308–319). Un perro duerme junto al fuego. EL MOSTRADOR (x 196–306,
//     tablero y 128–134, frente hasta y 150) lo pinta lynchburgDelante con el libro de registro, la campanilla, una
//     jarra, el tintero y la vela, para que quien está detrás (suelo y 134, x 214–290) asome cabeza y hombros. Suelo y 150,
//     libre x 96–196.
//   'posada', o.camara 'mostrador': EL MOSTRADOR DE CERCA (inserto, sin personajes): el tablero de roble con el libro de
//     registro abierto (x 92–228, y 104–148; en cada renglón, a la izquierda, un año en cifras y luego una firma de
//     rayitas; a la derecha, el número de cuarto), la campanilla de latón, la vela (y su luz que tiembla), el tintero con
//     la pluma, un llavero y monedas; detrás, las baldas con botellas (y 50 y 84) y el tablero de llaves con sus números
//     que se mecen. o.registro true: el renglón de 1820 (y 133–139) está vacío y resaltado, latiendo (devuelve .hueco
//     [122, 134], donde iría la firma). Devuelve .pluma [70, 124] (el tintero) para una mano canónica (T.brazo) que escribe.
//   'despacho', o.camara 'general': EL DESPACHO DE MORRISS: papel pintado de rayas (tranquilo arriba a la derecha), friso
//     de cuarterones (moldura y 121–124) y suelo de pino con alfombra; la ventana alta (x 12–52, y 40–118) con el río, las
//     colinas nevadas, nubes, cuervos y una barca, cortinas con galería y la luz que entra en el suelo con motas; el reloj de
//     pie (x 58–82, y 54–146) con su péndulo y sus agujas; la chimenea (x 88–136, repisa y 102, boca y 116–146) con fuego,
//     velas y un jarrón; encima, un mapa de Virginia enmarcado sin letras (x 92–132, y 46–84; Lynchburg con un punto rojo
//     en el James); dos apliques y un cuadro de un barco; el calendario (x 142–176, y 58–94) con el año en cifras grandes
//     (o.anyo, por omisión 1822; o.hojas 0–1 arranca las hojas hasta o.anyoFin, por omisión 1832: vuelan y quedan por la
//     alfombra); una silla Windsor (x 132–150, asiento y 137); EL ESCRITORIO DE TAPA (x 146–236, tablero y 130) con los
//     casilleros llenos de cartas, papeles, tintero y LA LÁMPARA DE ACEITE (x 218, llama y 118); EL ARMARIO de roble (x
//     240–302, y 70–148, con una sombrerera y un baúl encima): o.puertas 0–1 abre sus dos puertas y deja ver dos baldas
//     (y 96 y 120) con ropa, libros y un atado de cartas; la percha con abrigo a la derecha. LA CAJA DE HIERRO (o.caja
//     'armario' | 'mesa' | false; por omisión 'armario', que solo se ve con las puertas abiertas): en la balda del armario
//     (base y 120, x 263) o sobre el escritorio (base y 130, x 192). o.noche true: fuera es de noche, con luna, y todo
//     queda en penumbra. Suelo y 150, libre x 30–150 (y delante del escritorio hasta x 232).
//   'despacho', o.camara 'caja': LA CAJA DE CERCA (inserto) sobre el escritorio a la luz de la lámpara (x 40, con una
//     polilla que revolotea y motas en la luz): hierro remachado con flejes, óxido, asas de aro y la tapa con vuelo; un
//     candado grande colgado del pasador (ojo de la llave en x 164, y 125). o.abierta 0–1 levanta la tapa (se ve su cara de
//     dentro) y deja ver DOS CARTAS dobladas con su lacre y TRES HOJAS DE NÚMEROS que asoman y suben (la primera empieza
//     71, 194, 38, 1701…; se leen a 320 × 180); o.roto true: el candado partido sobre el secante (x 242, y 152), con el
//     arco roto y esquirlas. Detrás, los casilleros del escritorio con cartas; delante, el secante de piel verde, papeles,
//     tintero con pluma y el llavero. Devuelve .cerradura [164, 125], .hojas (centro de cada hoja), .tapa (y del borde de
//     la tapa), .caja [x0, y0, x1, y1] y .candado. Sin personajes: Atom y las manos van encima.
// Devuelve { suelo, libre, … } con la geometría útil de cada encuadre. Llama a lynchburgDelante (mismas opciones)
// después de los actores: en 'calle' una barrica de tabaco y un poste en la esquina de abajo a la izquierda (y copos
// cercanos si nieva); en 'puerta' copos cercanos; en 'posada' EL MOSTRADOR entero y el respaldo alto de un banco junto a
// la chimenea (x 0–30); en 'despacho' el canto de una mesita con su candelero (x 0–44, y 150–180).
export function lynchburg(R, t, o = {}) {
  const enc = ['posada', 'despacho'].includes(o.encuadre) ? o.encuadre : 'calle', cam = o.camara ?? 'general';
  if (enc === 'calle') return cam === 'puerta' ? a_lyPuerta(R, t, o) : a_lyCalle(R, t, o);
  if (enc === 'posada') return cam === 'mostrador' ? a_lyMostrador(R, t, o) : a_lyComedor(R, t, o);
  return cam === 'caja' ? a_lyCaja(R, t, o) : a_lyDespacho(R, t, o);
}
export function lynchburgDelante(R, t, o = {}) {
  const enc = ['posada', 'despacho'].includes(o.encuadre) ? o.encuadre : 'calle', cam = o.camara ?? 'general';
  const K = C.k, L = a_L;
  if (enc === 'calle' && cam !== 'puerta') {
    // un poste de atar caballos con su anilla y una barrica de tabaco grande, en primer término
    R.rect(34, 150, 39, 180, K); R.rect(35, 151, 38, 180, L.mS); R.rect(35, 151, 35, 180, L.mL); R.rect(33, 147, 40, 151, K); R.rect(34, 148, 39, 150, L.m);
    R.disco(41, 158, 2.5, K); R.disco(41, 158, 1.5, C.hierroL); R.pset(41, 158, K);
    a_barrica(R, 14, 186, 2.1);
    if (!o.noche && !o.soldados && o.nieve !== false) R.rect(2, 152, 26, 153, L.nv);
    if (o.nieve ?? (!o.noche && !o.soldados)) a_copos(R, t, 7, true);
    return { barrica: [14, 160] };
  }
  if (enc === 'calle') { if (o.nieve !== false) a_copos(R, t, 6, true, [0, 0, 60, 179]); return {}; }
  if (enc === 'posada' && cam !== 'mostrador') return a_mostradorDelante(R, t);
  if (enc === 'despacho' && cam !== 'caja') {
    // el canto de una mesita de nogal con su candelero y un libro, en la esquina de abajo a la izquierda
    R.rect(0, 156, 44, 160, K); R.rect(0, 157, 43, 158, L.mL); R.rect(0, 159, 43, 159, L.m);
    R.rect(0, 160, 40, 180, K); R.rect(0, 161, 39, 180, L.mS); for (let y = 164; y < 180; y += 5) R.rect(2, y, 37, y, L.mD);
    R.rect(4, 150, 18, 156, K); R.rect(5, 151, 17, 153, a_L.alfR); R.rect(5, 154, 17, 155, C.papel);
    R.rect(28, 152, 34, 156, K); R.rect(29, 153, 33, 155, L.laton); R.rect(30, 138, 32, 152, K); R.rect(31, 139, 31, 151, C.papel);
    a_llama(R, 31, 137, t, 1);
    return {};
  }
  return {};
}
// ── B · El oeste, 1817–1821 ──────────────────────────────────────────────────────────────────────────────────────────
// Cada encuadre pinta los 320 × 180 en cada fotograma: lo fijo (cielo tramado, montes, rocas con estratos, suelo, tiendas)
// va en un búfer por encuadre y luz, y encima la vida (nubes de tres tonos a tres velocidades, hierba que ondula, búfalos
// que pastan y andan, jinetes, perritos de las praderas, hoguera, humo, caballos que mueven la cola, estrellas, agua…).
// o.encuadre:
//   'llanura' (por omisión): LAS GRANDES LLANURAS en primavera, por la tarde. Cielo tramado con cirros, cúmulos de tres
//     tonos a tres velocidades, un halcón y golondrinas; al fondo mesas azuladas (horizonte en y 94), una fila de álamos
//     a lo largo de un arroyo que baja por la izquierda (x 0–75, y 95–125) con brillos en el agua; la pradera en tres
//     términos (rayas lejanas, hierba media, hierba con tallos y flores delante) y rachas de viento que la ondulan; la
//     MANADA DE BÚFALOS en tres términos: ~26 lejanos (y 98–106) que derivan, 11 medios (y 112–130) que pastan y andan, y
//     tres grandes delante en los lados (x 4–34 y 266–318, pies y 150–158); TRES JINETES pequeños con una mula de carga
//     que cruzan a lo lejos (y ~103) con su polvo; perritos de las praderas que asoman de sus montículos (x 96, 206, 228;
//     y 166–172). Suelo: pies en y 150 (de 146 a 156 se lee bien); libre x 40–260.
//     o.camara 'manada': de cerca dentro de la manada, cámara baja: horizonte en y 74 con una loma por la que asoma más
//     manada, búfalos grandes (24–34 px) que pastan a los lados y detrás, un ternero, tordos sobre los lomos, polvo que
//     se levanta. Suelo y 152, libre x 96–224.
//   'barranco': UN BARRANCO AL NORTE DE SANTA FE AL ATARDECER (la imagen clave del acto 2): cielo del violeta al naranja
//     con nubes alargadas de tres tonos iluminadas por debajo y las primeras estrellas que titilan; paredes de roca rojiza
//     con estratos, cornisas, grietas y pinos piñoneros (la izquierda hasta x ~104, la derecha desde x ~188); por el hueco
//     del centro, mesas lejanas a contraluz y el arroyo que viene del fondo y corre al pie de la pared derecha (y 128–136);
//     EL CAMPAMENTO: dos tiendas de lona (x 20–58 y 62–94, base y 138–140) iluminadas por la hoguera, un bastidor con una
//     piel de búfalo (x 2–18), leña, mantas, sillas de montar (x 154–178, y 146), la HOGUERA (x 120–140, base y 142) con
//     llamas, chispas, humo y la olla colgada del trípode con vapor (o.fuego false la apaga: brasas y un hilo de humo), su
//     luz que tiembla sobre el suelo; dos caballos atados a una cuerda (x ~242–304, pies y 146) que pastan y mueven la
//     cola; murciélagos y golondrinas. LA GRIETA de la pared derecha (x 224–238, y 98–122) con una veta oscura: o.brillo
//     0–1 la enciende (0: apagada; 0,1–0,3 un destello pequeño que titila; 1 una veta de oro que reluce, halo cálido de
//     ~18 px, estrella de cuatro puntas de ~12 px y chispas); devuelve .brillo [231, 110].
//     o.mina true: el mismo barranco año y medio después, A PLENO DÍA: la grieta es ya una bocamina con marco de madera
//     (x 216–244, y 96–124) y una rampa de escombro hasta el suelo, mineros pequeños que pican en la boca y bajan sacos,
//     un torno (x ~200, y 128), picos y palas apoyados, una criba (artesa de lavar) en el arroyo con un minero que la
//     mece (x ~168), montones de roca, sacos atados (x 100–124, y 140–150) que brillan, mulas con albarda en lugar de los
//     caballos y la hoguera apagada. o.brillo sigue funcionando en la bocamina.
//     Suelo y 150 (pies entre 144 y 160), libre x 30–200.
//     o.camara 'roca': de cerca la pared con la grieta: estratos grandes, líquenes, una cornisa con matas y un nopal,
//     una veta de cuarzo blanco en la grieta con pepitas de oro; o.brillo 0–1 las enciende igual (halo, estrella y
//     chispas); la luz de la hoguera tiembla desde abajo a la izquierda, una lagartija cruza y cae arenilla. Devuelve
//     .brillo [176, 90] (el centro de la veta) y .toque [150, 106] (donde la escena pone la mano canónica, T.mano, que
//     entra desde abajo a la izquierda).
//   'camino': EL CAMINO DE VUELTA EN OTOÑO (1821): montes boscosos en tres términos (las crestas azules del fondo, la
//     ladera de robles rojos y amarillos con una cabaña que echa humo), un camino de herradura en la ladera (de (0, 116) a
//     (320, 102)), un río con un vado de piedras y rápidos que se mueven (y 118–132), la pradera de hierba seca y EL CAMINO
//     de tierra en primer término (y 140–162) con huellas de cascos y piedras; un roble grande a la izquierda (x 0–40) y un
//     pino a la derecha (x 296–320); nubes, gansos en uve, hojas que caen y un ciervo que pasta en el linde del bosque.
//     o.recua true: por el camino de la ladera pasa la recua pequeña (siete mulas cargadas con alforjas pesadas y tres
//     jinetes) hacia el este (a la derecha). Suelo y 150, libre x 20–300. Para la recua de primer término la escena usa
//     b_mula (exportada).
// Devuelve { suelo, libre, … } con la geometría útil de cada encuadre. Llama a oesteDelante después de los actores (matas
// de hierba alta en 'llanura', una roca y una mata de salvia en 'barranco', una rama de roble y helechos en 'camino').
export function oeste(R, t, o = {}) {
  const enc = o.encuadre === 'barranco' ? 'barranco' : o.encuadre === 'camino' ? 'camino' : 'llanura';
  if (enc === 'barranco') return o.camara === 'roca' ? b_roca(R, t, o) : b_barranco(R, t, o);
  if (enc === 'camino') return b_camino(R, t, o);
  return b_llanura(R, t, o);
}
// lo que va por delante de los personajes, con el mismo o que oeste(): en 'llanura' matas de hierba alta que se mecen en
// las esquinas de abajo (x 0–40 y 280–320, y ≥ 160) y unos tallos sueltos en el borde (y ≥ 172); en 'barranco' una roca
// con su sombra abajo a la derecha (x 272–320, y ≥ 156) y una mata de salvia abajo a la izquierda (x 0–30, y ≥ 162); en
// 'camino' una rama de roble con hojas rojas que cuelga de la izquierda (x 0–52, y 18–74) y helechos en las esquinas de
// abajo (y ≥ 164). En la cámara 'roca' no pinta nada.
export function oesteDelante(R, t, o = {}) {
  const enc = o.encuadre === 'barranco' ? 'barranco' : o.encuadre === 'camino' ? 'camino' : 'llanura';
  if (enc === 'barranco') { if (o.camara === 'roca') return {}; b_rocaDelante(R, t, !!o.mina); return {}; }
  if (enc === 'camino') { b_ramaDelante(R, t); return {}; }
  b_hierbaDelante(R, t, o.camara === 'manada'); return {};
}
// ── C · El condado de Bedford ────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'bosque' (por omisión): EL BOSQUE DE BEDFORD con LOS PICOS DE OTTER al fondo (Sharp Top, la punta, x ~112, y 56;
//     Flat Top, la loma ancha, x ~186, y 66), con cárcavas y bosque en la falda; lomas y bosque lejano con bruma que se
//     arrastra; un arroyo (y ~121–129) con piedras y destellos que corren; un muro de piedra seca medio caído (x 50–150,
//     y 132–145) con piedras sueltas; un tronco caído con musgo (x 206–250, y 134); un roble a la izquierda (copa x 4–80)
//     y pinos a la derecha (x 232, 254); delante, un tronco grande en el borde izquierdo y un abeto oscuro a la derecha
//     (x 270–320, y 52–160); suelo de hojarasca con ramitas, setas, matas y piedrecitas; nubes en tres capas.
//     De día (sin o.noche): cúmulos, una bandada que cruza, una ardilla que corre por el muro, hojas que caen.
//     o.noche true: bajo la LUNA (x 226, y 30) con halo, estrellas que titilan, jirones de nube con el canto de plata,
//     bruma, luciérnagas, un búho en la rama del roble (x 64, y 72) que parpadea, un murciélago, el reflejo de la luna en
//     el arroyo. o.hoja true (mejor de noche): la hoja vieja de papel con cuatro filas de números en el suelo (x 148–192,
//     y 149–177) con un haz de luna que baja hasta ella, motas en el haz y la esquina que se levanta con la brisa (devuelve
//     .hoja [170, 163]). o.hoy true (de día): un sendero de tierra que se pierde al fondo, marcas blancas de pintura en los
//     troncos (sin letras) y un excursionista diminuto que sube a lo lejos. Suelo y 150, libre x 30–260.
//   'claro': EL CLARO DE GOOSE CREEK de noche: la luna a la izquierda (x 74, y 30), una línea de árboles con pinos sueltos
//     y Sharp Top lejos, bruma, el arroyo que cruza detrás (y ~118–128) con una cascadita y piedras; hierba alta y un
//     círculo de tierra pisada; UN ROBLE GRANDE (tronco x 216–238, base y 148; copa x 156–276, y 16–72) con las raíces a
//     la vista, una pala y un pico apoyados, un farol colgado de la rama (x 166, y 76) y, con o.faroles (por omisión sí;
//     false los quita), dos faroles en el suelo (x 150, y 152; x 276, y 156) con su luz cálida que tiembla; luciérnagas y
//     polillas. o.hoyo 0–1: el hoyo al pie del roble (centro x 196, y 154; hasta 32 × 11 px) con una raíz cortada, su
//     montón de tierra a la izquierda (x ~160–185) y, desde 0,5, una pala clavada. o.estallido 0–1 (animarlo de 0 a 1 en
//     ~3 s): junto al roble (x ~200, y 152), un resplandor, tierra y piedras en parábola, una columna de humo y un pájaro
//     que huye; sin nadie cerca. Suelo y 150, libre x 30–176.
//   'taberna': LA TABERNA DE BUFORD hacia 1820, de día: casa de troncos con barro (x 176–300) y piso alto de tablas con
//     dos ventanas y contraventanas, buhardilla, tejado de tablillas, chimenea de piedra (x 296–308) con humo que se va a
//     la izquierda; porche (x 168–306, tejadillo y 104, suelo y 141) con postes, barandilla, barril, sacos, un cartel sin
//     letras (jarra y herradura), la puerta abierta (x 228–246) donde barre el tabernero y un perro que mueve la cola;
//     poste de atar (x 40–126, travesaño y 131) con tres caballos (R.caballo, x 50, 86, 106, suelo 146); una diligencia
//     roja (x 2–36); gallinas que picotean (x ~150–175, y 160–166); detrás, prados con cerca en zigzag y los picos.
//     Suelo y 150, libre x 30–220 (los caballos van detrás de los actores, en y 146).
//   'iglesia': UNA IGLESIA BLANCA DE MADERA EN EL CAMPO (1983), DE DÍA Y DE LEJOS: la iglesia (x 198–262, base y 124) con
//     campanario y aguja (punta x 230, y 42), un seto alto (x 104–320, y 110–132) que no deja ver nada del cementerio y una
//     valla blanca de estacas (y 123–137) con la cancela (x 222–238); árboles; lomas con prados, una granja con silo, un
//     tractor diminuto, los picos lejos, sombras de nubes; un poste de teléfono (x 30); el camino de tierra (y 140–160).
//     o.excavadora > 0: la excavadora amarilla (x 148–196, suelo y 146) cava con el brazo y suelta tierra (con 0 o sin la
//     opción, parada con el cazo en el suelo), con un montón de tierra junto a la valla (x 150–184); devuelve .cazo [x, y].
//     o.sheriff true: el coche del sheriff de los ochenta (x 26–78, suelo y 147), sin letras ni escudo, con una estrella
//     en la puerta y la barra de luces roja y azul que gira. Suelo y 150, libre x 30–150.
//     Cámara 'valla': de cerca la valla de estacas grande (y 98–144) y el seto tupido detrás (y 66–118); asoman la aguja
//     (punta x 212, y 16) y las copas; un pájaro en la valla (x 82); la excavadora grande parada con el cazo en tierra
//     removida (x 204–300, suelo y 160). Suelo y 150, libre x 30–190.
// Llama a bedfordDelante(R, t, o) con las mismas opciones después de los actores: helechos en las dos esquinas de abajo
// ('bosque'), matas de hierba alta en las esquinas ('claro'), el abrevadero de troncos y un cubo (x 236–310, y 160–176,
// 'taberna'), la cuneta con agua (y 172–175) y flores silvestres (y 168–180) ('iglesia'; en 'valla', solo las flores).
export function bedford(R, t, o = {}) {
  const e0 = o.camara ?? o.encuadre, enc = ['claro', 'taberna', 'iglesia', 'valla'].includes(e0) ? e0 : 'bosque';   // 'claro' y 'valla' valen como o.encuadre o como o.camara
  if (enc === 'claro') return c_claro(R, t, o);
  if (enc === 'taberna') return c_taberna(R, t, o);
  if (enc === 'iglesia' || enc === 'valla') return c_iglesia(R, t, o, enc === 'valla');
  return c_bosque(R, t, o);
}
// lo que va por delante de los actores, según el encuadre (llámala con las mismas opciones que bedford)
export function bedfordDelante(R, t, o = {}) {
  const e0 = o.camara ?? o.encuadre, enc = ['claro', 'taberna', 'iglesia', 'valla'].includes(e0) ? e0 : 'bosque';   // 'claro' y 'valla' valen como o.encuadre o como o.camara
  if (enc === 'bosque') return c_helechos(R, t, !!o.noche, o);
  if (enc === 'claro') return c_claroDelante(R, t, o);
  if (enc === 'taberna') return c_abrevadero(R, t, o);
  return c_cuneta(R, t, enc === 'valla', o);
}
// ── D · El cuarto del amigo y la imprenta, 1862–1885 ─────────────────────────────────────────────────────────────────
// o.encuadre:
//   'cuarto' (por omisión): EL CUARTO DEL AMIGO DE NOCHE (1862), a la luz de una vela y de las brasas: techo de tablas
//     con viga, papel pintado de rayas y ramitos con manchas, friso de tablas, suelo de pino en perspectiva con nudos; la
//     PUERTA x 12–44 (y 60–120), la ESTANTERÍA x 54–104 (y 40–120) llena de libros, la VENTANA x 118–172 (cristal 122–168
//     × 26–70) con la noche (cielo tramado, estrellas, luna, nubes de tres tonos a tres velocidades, los tejados de
//     Lynchburg con ventanas que se encienden, chimeneas que humean, campanario, murciélago) y cortinas que se mecen; el
//     RELOJ de pared x 188–204 con su péndulo; el abrigo y el sombrero de copa en el perchero x 206–230; la CHIMENEA de
//     piedra x 228–290 (boca 242–276 × 80–120) con brasas, llamitas y chispas, la repisa con candeleros y el cuadro de
//     los picos de Otter; un gato dormido en la losa del hogar (x ~260–276, y 118); la cama estrecha x 289–319; la
//     alfombra trenzada; un ratón que sale de su agujero (x 49, y 118) a por una miga. LA MESA x 104–232 (tablero de y
//     117 a 129, patas hasta y 158) con los papeles de cuentas, un libro abierto (o el pergamino), LAS TRES HOJAS DE
//     NÚMEROS en fila (x 144–181, y 120), el tintero con la pluma, LA VELA en x 200 (o.vela 0–1: de entera a casi
//     gastada; su resplandor tiembla en la pared y el tablero) y los libros ya probados apilados (x 208–230).
//     o.pergamino (true o 0–1): el pergamino de la Declaración se desenrolla a la izquierda del tablero (x 108–144),
//     renglones de rayitas, nunca legible. o.brillo: la hoja del medio se ilumina.
//     o.vacio true (1885): el mismo cuarto años después y de día gris: sin estantería, reloj, cuadro, cama ni alfombra
//     (quedan sus huellas claras en el papel), hojas con cifras clavadas por la pared, cajas de embalar, el suelo lleno
//     de papeles (que levanta la corriente), la chimenea apagada con ceniza y telaraña, un rayo de luz con motas; la
//     mesa con torres de papeles y un cabo de vela apagado. o.familia true: la puerta abierta, con el pasillo iluminado
//     (barandilla y quinqué) y la luz que entra al suelo; la familia se planta en el umbral con los pies en y 121.
//     Suelo y 150, libre x 30–104. El amigo SENTADO a la mesa va detrás de ella con los pies en .asiento (150, 122):
//     cuartoDelante la vuelve a pintar por delante y asoman cabeza y hombros. Devuelve { suelo, libre, mesa, asiento,
//     puerta, ventana, estanteria, chimenea, vela: [x, y] de la llama }.
//     Cámara 'mesa': LA MESA DE CERCA: la pared (ventana de noche x 12–86 × 23–68 con cortinas, estante de libros x
//     224–318 en y 64, friso desde y 70), el tablero desde y 98; EL AMIGO detrás en .amigo (92, 104) con su sombra que
//     baila en la pared; el pergamino grande x 8–98 (o.pergamino 0–1 lo desenrolla; sin él, un libro abierto), las tres
//     hojas (d_hoja) en .hojas (x 132, 172, 212; y ~141), un papel con cifras de verdad (71, 194, 38, 1701…), las gafas,
//     el tintero con la pluma (x 238), los libros a la derecha y LA VELA GRANDE en x 270 (base y 152; o.vela 0–1 la
//     consume de 44 a 6 px). o.letras 0–1: de la segunda hoja sube un chorro de cuadraditos de luz que dibuja en el
//     aire, en trazos dorados, el bosque (0–0,45), la cámara de piedra con la cota «6» de seis pies (0,42–0,66) y las
//     tres ollas de hierro con su brillo (0,66–1); devuelve .vision [176, 56] y .vela.
//   'imprenta': LA IMPRENTA DE LYNCHBURG EN 1885 (de día): techo de vigas, ladrillo encalado que se pela, postes de
//     madera, suelo de tablas con manchas de tinta, recortes y tipos caídos; el chibalete de tipos con sus cajetines x
//     8–78 y la balda de latas de tinta; la PUERTA DE ATRÁS entornada x 100–126 (y 62–124); un cartel de pared con barras
//     y el almanaque «1885»; el reloj; LOS FOLLETOS AMARILLOS colgados a secar de dos cuerdas (y 22–50), que se mecen; la
//     mesa de entintar x 108–136; LA PRENSA DE MANO de hierro en el centro (x 134–238, remate y 82, base y 148) con su
//     carro, el tímpano levantado con un folleto, la manivela y la barra que aprieta sola cada 3 s (o.imprime false la
//     para; o.prensa 0–1 la fija); la VENTANA a la calle x 248–304 (y 50–103) con nubes, la fachada de enfrente con
//     toldo, gente pequeña que pasa y un carro de caballo, y el cartel con «50 ¢» en el cristal; el mostrador x 240–316
//     (tablero y 114); el rayo de sol con motas. o.humo 0–1: un resplandor naranja que tiembla en la rendija de la
//     puerta de atrás y en el suelo, bocanadas de humo que suben y, desde 0,4, un velo de humo bajo el techo (el
//     incendio que contó Ward; sin llamas grandes ni nadie en peligro). Suelo y 150, libre x 40–236; el impresor en
//     .puesto (222, 148) agarra la barra en .palanca [x, y]. Devuelve también .prensa, .puerta, .ventana, .cartel,
//     .mostrador y .tinta.
//     Cámara 'periodico': UN PERIÓDICO DE 1885 sobre una mesa (x 50–252, y 18–172): cabecera de manchas negras (sin
//     letras), «1885», cinco columnas de rayitas con titulares, dos grabados (un tren, un edificio) y EL HUECO vacío
//     (x 139–171, y 61–105) donde no está la noticia (o.hueco 0–1: un recuadro naranja de trazos que corre y una «?»);
//     la lupa que se desliza, las gafas, la taza que humea (x 286, y 118) y un lápiz. Devuelve { hueco, diario, lupa }.
// Llama a cuartoDelante después de los actores: la mesa con lo de encima en 'cuarto'; el tablero, las hojas, la vela y
// las formas luminosas en 'mesa'; las resmas con un gato (x 0–36, y 128–180) y la pila de folletos atados (x 290–320,
// y 152–180) en 'imprenta'; nada en 'periodico'.
export function cuarto(R, t, o = {}) {
  const enc = o.encuadre ?? 'cuarto', cam = o.camara ?? 'general';
  if (enc === 'imprenta') return cam === 'periodico' ? d_periodicoD(R, t, o) : d_imprentaD(R, t, o);
  return cam === 'mesa' ? d_mesaCercaD(R, t, o, false) : d_cuartoGeneralD(R, t, o, false);
}
// Lo que va por delante de los personajes (se llama después de los actores, una vez por fotograma): en 'cuarto' la mesa
// entera con lo que hay encima (quien se sienta detrás, con los pies en y 126, asoma cabeza y hombros); en la cámara
// 'mesa', el tablero de cerca con las hojas, el pergamino, la vela y las formas luminosas; en 'imprenta', las resmas con
// el gato (abajo a la izquierda) y la pila de folletos (abajo a la derecha). En 'periodico' no hay nada delante.
export function cuartoDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'cuarto', cam = o.camara ?? 'general';
  if (enc === 'imprenta') return cam === 'periodico' ? {} : d_imprentaDelanteD(R, t, o);
  return cam === 'mesa' ? d_mesaCercaD(R, t, o, true) : d_cuartoGeneralD(R, t, o, true);
}
// ── E · Los buscadores, 1898–1983 ────────────────────────────────────────────────────────────────────────────────────
export function buscadores(R, t, o = {}) {
  const en = o.encuadre ?? 'sesion', cam = o.camara ?? 'general';
  if (en === 'sis') return cam === 'mesa' ? e_sisMesa(R, t, o) : e_sis(R, t, o);
  if (en === 'univac') return e_univac(R, t, o);
  if (en === 'rand') return cam === 'pantalla' ? e_randPantalla(R, t, o) : e_rand(R, t, o);
  if (en === 'estudio82') return e_estudio(R, t, o);
  return e_sesion(R, t, o);
}
// lo que va por delante de los personajes en cada encuadre (la mesa del médium, los pupitres, el carro de cintas, la mesa
// del terminal, el escritorio de 1982); en las cámaras de cerca no pinta nada. Devuelve lo mismo que buscadores (con
// .bola [x, y] en 'sesion' y .pantalla en 'rand').
export function buscadoresDelante(R, t, o = {}) {
  const en = o.encuadre ?? 'sesion', cam = o.camara ?? 'general';
  if (cam !== 'general' && cam != null) return {};
  if (en === 'sis') return e_sisDelante(R, t, o);
  if (en === 'univac') return e_univacDelante(R, t, o);
  if (en === 'rand') return e_randDelante(R, t, o);
  if (en === 'estudio82') return e_estudioDelante(R, t, o);
  return e_sesionDelante(R, t, o);
}
// ── Piezas ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// Todas aceptan o.t (el tiempo, para su vida animada) y llevan su sombra tramada. Las de papel y hierro se dibujan
// píxel a píxel (no a escala gruesa), así que a escala 2–4 ganan detalle de verdad.
// d_hoja(R, x, y, o): UNA HOJA DE BEALE (x, y: su CENTRO). Papel envejecido de 22 × 30 px a escala 1 (o.escala 2, 3, 4…;
//   o.escala 0.5: hojita de 12 × 16 para llevarla en la mano), con el canto mellado y gastado, manchas, los dobleces en
//   tres y la esquina doblada que se levanta con el aire (t). Arriba, el número de la hoja subrayado; debajo, los NÚMEROS
//   DE VERDAD de cada hoja (la 1 empieza 71, 194, 38, 1701…; la 2, 115, 73, 24, 807…; la 3, 317, 8, 92, 73…) escritos a
//   mano en cifras de 3 × 5 (a escala 1, renglones de rayitas de tinta). o.n 1–3 elige la hoja; o.brillo 0–1 la ilumina
//   (halo dorado y destellos); o.ver 0–1 cuántos números se ven (se va escribiendo); o.descifrada 0–1 cambia las filas,
//   de arriba abajo, por dibujitos de lingotes, monedas, joyas y ollas (la hoja 2 descifrada); o.oscura 0–1 la apaga
//   en azul noche; o.dobleces false, sin dobleces; o.sombra false, sin sombra.
//   Devuelve { caja: [x0, y0, x1, y1], arriba: [x, y0], primera: [x, y] (el primer número) }.
// d_folleto(R, x, y, o): EL FOLLETO DE 1885 (x, y: su CENTRO cerrado; 20 × 28 px a escala 1, o.escala 2…; 0.5 para la mano).
//   Cubierta amarilla gastada con puntadas en el lomo, doble filete, el título en tres renglones de barras (sin letras),
//   el grabado de la caja con sus rayos y el «1885» abajo (a escala ≥ 2); un brillo la recorre de vez en cuando.
//   o.abierto 0–1: la tapa gira sobre el lomo y el folleto queda abierto CENTRADO en x (40 × 28 a escala 1): a la
//   izquierda el prólogo (renglones de rayitas) y a la derecha la primera hoja de números, con la esquina que se levanta.
//   o.brillo 0–1. Devuelve { pagina: [x0, y0, x1, y1] (la página de números, para sacar de ahí números que vuelan),
//   izquierda, arriba, lomo }.
// d_caja(R, x, y, o): LA CAJA DE HIERRO de tres cuartos (x, y: el CENTRO DE LA BASE; 24 × 9 de frente + la tapa, unos
//   28 × 14 px a escala 1; o.escala 2–4 para la mesa y los insertos). Chapa con picaduras, dos flejes, remaches, la junta de
//   la tapa, chorretones de óxido, el asa de anilla en el costado y un candado de latón en su aldaba; un destello corre por
//   el canto. o.abierta 0–1: la tapa gira sobre la bisagra de atrás (por dentro, madera) y asoman TRES HOJAS DE NÚMEROS en
//   abanico y DOS CARTAS dobladas con su lacre, con motas de polvo que suben (y flotan en la luz cuando está abierta);
//   o.roto true: el candado partido, tirado en el suelo a la derecha (x + 16·escala). Devuelve { arriba, candado,
//   dentro: [x0, y0, x1, y1] (la boca), tapa, asas: [[x, y], [x, y]] (donde la cogen las manos) }.
// d_tira(R, x, y, letras, o): LA TIRA DE GILLOGLY (x, y: su esquina de ARRIBA A LA IZQUIERDA): papel continuo de impresora
//   de 1980 con los agujeros de arrastre, el troquel, la banda verde del papel pijama y los cantos rasgados; las letras
//   (por omisión «abfdefghiijklmmnohpp») en matriz de puntos de 5 × 7 (ES LA ÚNICA EXCEPCIÓN A «SIN LETRAS»). Mide
//   (14 + 7·n) × 17 px a escala 1 (unos 154 × 17) y el doble a escala 2 (o.escala; 308 × 34: cabe en x 6–314).
//   o.n cuántas letras se ven (con decimales, la última aparece punto a punto; mientras faltan, el cabezal de la impresora
//   vibra delante de la siguiente); o.marca true: la «f» (3.ª) y la «h» (18.ª) en rojo, con un brillo y subrayadas
//   (o.malas cambia sus índices); o.foco i: la letra i salta y se pinta en ámbar (para cantarla). Devuelve { caja, ancho,
//   alto, letras: [[x, y]…] (el centro de cada letra) }.
// pausa(R, x, y, t, o): los objetos de las pausas (los saca Atom a color en el mundo congelado; pixel art limpio a escala 2
//   —o.s—, con contorno, luz y sombra, y su sombra en el suelo). x, y: el CENTRO DE LA BASE. o.cual:
//   'balanza' (~100 × 84 px): pie de madera, columna de latón con fiel y aguja; en el plato izquierdo lingotes y dos ollas
//     de hierro llenas de oro que destellan; en el derecho un coche rojo de juguete; o.peso 0–1 la equilibra (con un leve
//     vaivén) y con peso ≥ 0,95 sale el «2921» encima (y − 100). Devuelve también platos;
//   'pergamino' (~150 × 110): el pergamino de pie con sus dos rollos, la cabecera en barra y las palabras como bloques
//     numerados 1–25; a la izquierda una hojita de Beale con «3, 7, 12»; o.paso 0–1 (por omisión avanza con t) recorre los
//     tres números: una flecha punteada va de la cifra a su bloque, el bloque se enciende y su primera letra sube como un
//     cuadradito de luz a la fila de arriba, donde se quedan. Devuelve hoja y bloques [[n, x, y]…];
//   'tragaperras' (~120 × 90): la máquina roja de juguete con bombillas que corren, tres rodillos y la palanca; o.giro 0–1
//     (por omisión avanza con t): baja la palanca, ruedan y se paran cereza, cereza… y la tercera cereza se pasa por arriba
//     (asoma en el borde); con giro ≥ 0,9 el cerebro de al lado se enciende con rayos y sale el «2009». Devuelve cerebro;
//   'bombo' (~120 × 96): el bombo de alambre en su tijera de madera, que gira (o.vel) con fichas de garabatos dentro (no
//     son letras legibles), las que caen por la boca y se quedan en el suelo; a la derecha un pergamino pequeño y la mano
//     canónica (T.mano) que va señalando sus renglones; encima, en un papelito, «1 / 100 000 000 000 000» (o.numero false
//     lo quita). Devuelve mano y pergamino;
//   'torre' (~60 × 90): bloques de madera pintados con 1014, 6, 4… que caen uno a uno (o.alto 0–1) y destellan quietos;
//     o.tiembla 0–1 la hace bambolearse desde arriba con rayitas rojas y saca el «1983» a la derecha (x + 68, y − 80);
//   'teatrillo' (~120 × 110): la caseta de madera con frontón y estrella, la base de rombos, el decorado de noche con luna,
//     el telón rojo con flecos que se abre (o.telon 0–1, por omisión abierto) y tres títeres que se mecen por turnos: la
//     caja de hierro, el posadero (delantal y bigote) y el amigo sin cara con su sombrero; candilejas que tiemblan.
//     Devuelve escenario [x0, y0, x1, y1].
//   o.numero: sin poner, el número sale en su momento; true, siempre; false, nunca. Todas devuelven { arriba: [x, y] }.
export function d_hoja(R, x, y, o = {}) {
  const P = p_P, mini = (o.escala ?? 1) < 1, s = mini ? 1 : Math.max(1, Math.round(o.escala ?? 1)), n = Math.min(3, Math.max(1, o.n ?? 1)), t = o.t ?? 0;
  const W = mini ? 12 : 22 * s, H = mini ? 16 : 30 * s, x0 = Math.round(x - W / 2), y0 = Math.round(y - H / 2), x1 = x0 + W - 1, y1 = y0 + H - 1;
  const br = p_cl(o.brillo ?? 0), osc = p_cl(o.oscura ?? 0), ver = p_cl(o.ver ?? 1), des = p_cl(o.descifrada ?? 0), k = 300 + n * 17;
  const col = (c) => { if (br) c = p_mez(c, P.oroL, br * 0.28); if (osc) c = p_mez(c, P.noche, osc * 0.62); return c; };
  // el halo dorado de detrás cuando se ilumina
  if (br > 0) R.halo(x, y, Math.round(Math.max(W, H) * 0.78), [P.oroS, P.oro, P.oroL], 0.9 * br + 0.3);
  // su sombra sobre lo de debajo
  const so = Math.max(1, s);
  if (o.sombra !== false) for (let j = y0 + so; j <= y1 + so; j++) for (let i = x0 + so; i <= x1 + so; i++) if (i > x1 || j > y1) p_tine(R, i, j, C.k, 0.32);
  // la esquina doblada (de arriba a la derecha), que se levanta y baja un poco con el aire
  const de = mini ? 2 : Math.max(2, Math.round((2.6 + Math.sin(t * 1.7 + n * 2) * 0.6) * s));
  const M = p_textoHoja(n, s, W, H), pxs = M.px;
  const vis = Math.floor(ver * M.cuenta + 1e-6), fd = des * M.filas;
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const e = Math.min(i, j, W - 1 - i, H - 1 - j), u = W - 1 - i;
    if (u + j < de) continue;                                    // el pico doblado deja ver lo de detrás
    if (e === 0 && h(i, j, k + 1) < 0.16) continue;              // las mellas del canto
    let c = P.papel;
    const gr = h(i, j, k + 3), man = h(Math.floor(i / (3 * s)), Math.floor(j / (3 * s)), k + 2);
    if (man > 0.8 && h(i, j, k + 4) < (man - 0.8) * 4) c = P.mancha;          // manchas de humedad y de dedos
    else if (gr > 0.94) c = P.papelS; else if (gr < 0.05) c = P.papelL;
    if (i + j < (W + H) * 0.22 && h(i, j, k + 5) < 0.45) c = P.papelL;           // la luz de arriba a la izquierda
    if (i + j > (W + H) * 0.8 && h(i, j, k + 6) < 0.4) c = P.papelS;            // y la sombra de abajo a la derecha
    if (o.dobleces !== false && s >= 1) {
      const f1 = Math.round(H / 3), f2 = Math.round(2 * H / 3), fv = Math.round(W / 2);
      if (j === f1 || j === f2 || i === fv) c = p_mez(c, P.papelD, 0.45); else if (j === f1 - 1 || j === f2 - 1 || i === fv - 1) c = p_mez(c, P.papelL, 0.5);
    }
    if (e < Math.max(1, s) && h(i, j, k + 7) < 0.6) c = P.papelS;               // el canto gastado
    if (e === 0) c = P.borde;
    if (u < de && j < de) { c = (u + j === de) ? P.borde : (u + j === de + 1 ? P.papelD : P.dorso); }   // la solapa del pico
    else {
      const m = M.tok[j * W + i];
      if (m >= 0) {
        const fila = M.fila[j * W + i];
        if (fila < fd) c = c;                                     // esa fila ya se ha descifrado: la tinta se va
        else if (m < vis) c = M.densa[j * W + i] ? P.tinta : P.tintaL;
      }
    }
    R.pset(x0 + i, y0 + j, col(c));
  }
  // las filas descifradas: dibujitos en vez de números (lingotes, monedas, joyas, ollas)
  if (des > 0) {
    for (let f = 0; f < M.filas; f++) {
      if (f >= fd) break;
      const yy = y0 + M.filaY[f], q = Math.max(1, pxs);
      let xx = x0 + 2 * s;
      for (let c = 0; xx + 6 * q <= x1 - 2 * s; c++) { p_dibujito(R, xx, yy, q, (c + f * 2) % 4); xx += 7 * q; }
      if (f === Math.floor(fd)) for (let i = x0 + 2; i < x1 - 1; i++) if (h(i, Math.floor(t * 8), 9) < 0.5) p_tine(R, i, yy + 5 * q + 1, P.oroL, 0.7);
    }
  }
  // los destellos cuando brilla
  if (br > 0.2) for (let q = 0; q < 4; q++) { const f = Math.sin(t * 4 + q * 1.9); if (f < 0.2) continue; const sx = q % 2 ? x1 + 2 : x0 - 2, sy = Math.round(y0 + H * (0.2 + 0.25 * q)), L = f > 0.7 ? 2 : 1;
    R.pset(sx, sy, P.blanco); for (let d = 1; d <= L; d++) { R.pset(sx - d, sy, P.oroL); R.pset(sx + d, sy, P.oroL); R.pset(sx, sy - d, P.oroL); R.pset(sx, sy + d, P.oroL); } }
  return { caja: [x0, y0, x1, y1], arriba: [Math.round(x), y0], primera: [x0 + M.x0, y0 + M.y0] };
}
// d_folleto · el folleto de 1885: la cubierta amarilla, el interior y la página de números
export function d_folleto(R, x, y, o = {}) {
  const P = p_P, s = (o.escala ?? 1) < 1 ? 0.5 : Math.max(1, Math.round(o.escala ?? 1)), t = o.t ?? 0, u = p_cl(o.abierto ?? 0), e = u * u * (3 - 2 * u), br = p_cl(o.brillo ?? 0);
  const W = Math.round(20 * s), H = Math.round(28 * s), y0 = Math.round(y - H / 2), y1 = y0 + H - 1;
  const lomo = Math.round(x - W / 2 + e * W / 2), cA = Math.cos(Math.PI * e);
  const col = (c) => (br ? p_mez(c, P.oroL, br * 0.25) : c);
  if (br > 0) R.halo(lomo + (u > 0.5 ? 0 : W / 2), y, Math.round(H * 0.85), [P.oroS, P.oro, P.oroL], 0.9 * br + 0.3);
  // la sombra sobre la mesa
  const izq = cA < 0 ? lomo - Math.round(W * -cA) : lomo, der = lomo + W - 1, so = Math.max(1, s);
  if (o.sombra !== false) for (let j = y0 + so; j <= y1 + so + 1; j++) for (let i = izq + so; i <= der + so + 1; i++) if (i > der || j > y1) p_tine(R, i, j, C.k, 0.3);
  // el grueso de las hojas (abajo y a la derecha)
  R.rect(lomo + 1, y1 + 1, der + 1, y1 + 1, P.paginaS); R.rect(der + 1, y0 + 1, der + 1, y1 + 1, P.paginaS); R.pset(der + 1, y1 + 1, P.amarD);
  // la página de la derecha (los números de la hoja 1) cuando se abre
  const M = p_textoHoja(1, s, W, H, p_BEALE[0].slice(0, 120)), pag = [lomo, y0, der, y1];
  const dp = Math.max(2, Math.round((2.2 + Math.sin(t * 1.9) * 0.9) * Math.max(1, s)));   // la esquina de la página, que se levanta con el aire
  if (u > 0) for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const uq = W - 1 - i;
    if (u > 0.9 && uq + j < dp) continue;
    if (u > 0.9 && uq < dp && j < dp) { R.pset(lomo + i, y0 + j, uq + j === dp ? P.amarD : P.paginaS); continue; }
    let c = h(i, j, 61) > 0.93 ? P.paginaS : P.pagina;
    const mg = Math.max(1, Math.round(2 * s)); if (i < mg) c = p_mez(c, P.amarD, (mg - i) / mg * 0.5);     // la sombra del lomo
    if (i === W - 1 || j === 0 || j === H - 1) c = P.amarD;
    const m = M.tok[j * W + i]; if (m > 0 && i > s) c = M.densa[j * W + i] ? P.tinta : P.tintaL;
    R.pset(lomo + i, y0 + j, col(c));
  }
  // la tapa que gira sobre el lomo: de frente la cubierta; pasada la mitad, su dorso (la página de la izquierda)
  const wa = Math.round(W * Math.abs(cA));
  if (wa > 0) {
    const frente = cA > 0, osc = (1 - Math.abs(cA)) * 0.45;
    for (let i = 0; i < wa; i++) { const si = Math.min(W - 1, Math.floor(i * W / wa)), X = frente ? lomo + i : lomo - 1 - i;
      for (let j = 0; j < H; j++) { const c = frente ? p_tapa(si, j, s, W, H) : p_pagIzq(si, j, s, W, H); if (c == null) continue; R.pset(X, y0 + j, col(osc ? p_mez(c, P.amarD, osc) : c)); } }
  }
  // el brillo que recorre la cubierta de vez en cuando
  { const g = ((t * 0.5) % 2) * (W + H) - H, xi = u === 0 ? lomo : u >= 1 ? lomo - W : -999; if (xi > -999) for (let j = 0; j < H; j++) { const i = Math.round(g - j * 0.6); if (i > 0 && i < (u >= 1 ? 2 * W : W) - 1 && h(i, j, 62) < 0.7) p_tine(R, xi + i, y0 + j, P.blanco, 0.3); } }
  return { pagina: pag, izquierda: [lomo - W, y0, lomo - 1, y1], arriba: [Math.round(x), y0], lomo };
}
// d_caja · la caja de hierro (vista de tres cuartos, de frente y desde arriba; la luz de arriba a la izquierda)
export function d_caja(R, x, y, o = {}) {
  const P = p_P, s = Math.max(1, Math.round(o.escala ?? 1)), t = o.t ?? 0, u = p_cl(o.abierta ?? 0), roto = !!o.roto;
  const X = (a) => Math.round(x + a * s), Y = (b) => Math.round(y + b * s);
  const th = u * u * (3 - 2 * u) * 1.95;                  // el ángulo de la tapa (hasta ~112°)
  // una cara: de P0 con los lados U y V (en unidades lógicas), coloreada por fn(uu, vv) (0–1 en cada lado)
  const cara = (p0, U, V, fn) => { const lu = Math.hypot(U[0], U[1]) * s * 2 + 2, lv = Math.hypot(V[0], V[1]) * s * 2 + 2;
    for (let q = 0; q <= lv; q++) for (let p = 0; p <= lu; p++) { const uu = p / lu, vv = q / lv, c = fn(uu, vv); if (c == null) continue; R.pset(X(p0[0] + U[0] * uu + V[0] * vv), Y(p0[1] + U[1] * uu + V[1] * vv), c); } };
  const ruido = (a, b, k) => h(Math.round(a * s), Math.round(b * s), k);
  // el hierro: chapa con picaduras, flejes remachados y chorretones de óxido bajo los remaches
  const hierro = (a, b, base, k, ancho) => {
    const r = ruido(a, b, k); let c = r > 0.9 ? P.hieS : r < 0.07 ? P.hieL : base;
    const fl = Math.abs(a - ancho * 0.24) < 0.9 || Math.abs(a - ancho * 0.76) < 0.9;
    if (fl) c = base === P.hieL ? P.hie : P.hieS;
    if (h(Math.floor(a * 0.8), Math.floor(b * 0.35), k + 3) > 0.9 && ruido(a, b, k + 4) < 0.55) c = r < 0.5 ? P.oxido : P.oxidoS;
    return c;
  };
  // la sombra en el suelo
  for (let j = 0; j <= 2 * s; j++) for (let i = -14 * s; i <= 16 * s; i++) if ((i / (15 * s)) ** 2 + (j / (2 * s + 0.5)) ** 2 <= 1 && ((i + j) & 1) === 0) p_tine(R, x + i + s, y + j - Math.floor(s / 2), C.k, 0.45);
  // el lado derecho del cuerpo (en sombra) con su asa de anilla
  cara([12, -9], [2, -4], [0, 9], (uu, vv) => (uu > 0.97 || vv > 0.96 ? C.k : Math.abs(vv * 9 - 2.2) < 0.3 ? P.hieD : hierro(uu * 4, vv * 9, P.hieS, 410, 4)));
  { const ax = 13, ay = -4; for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2; R.pset(X(ax + Math.cos(an) * 1.2), Y(ay + 1.4 + Math.sin(an) * 1.6), k < 6 ? P.hieL : P.hieD); } }
  // abierta: el hueco de dentro (el fondo oscuro, la pared de atrás) y lo que guarda: dos cartas y tres hojas de números
  const abierta = th > 0.05;
  const tapa = () => {
    const ct = Math.cos(th), st = Math.sin(th), HL = [-10, -13], U = [24, 0];
    const F = [-2 * ct, 4 * ct - 4 * st], L = [1.2 * st * -0.5, 1.2 * (ct + st)];
    const fuera = th < Math.PI / 4;
    // la cara grande (por fuera, la chapa con los flejes y los remaches; por dentro, madera forrada)
    cara(HL, U, F, (uu, vv) => {
      if (uu < 0.012 || uu > 0.988 || vv > 0.93 || vv < 0.04) return C.k;
      const a = uu * 24, b = vv * 4;
      if (!fuera) { const r = ruido(a, b, 430); return vv > 0.75 ? P.madD : r > 0.85 ? P.madS : (Math.round(a * s) % (3 * s) === 0 ? P.madS : P.mad); }
      if ((Math.abs(a - 5.5) < 0.5 || Math.abs(a - 17.5) < 0.5) && Math.abs(b - 2) < 0.6) return P.hieLL;            // remaches
      return hierro(a, b, P.hieL, 420, 24);
    });
    // el canto de la tapa (el labio de delante)
    cara([HL[0] + F[0], HL[1] + F[1]], U, L, (uu, vv) => {
      if (uu < 0.012 || uu > 0.988 || vv > 0.8) return C.k;
      const a = uu * 24; if (vv < 0.35) return fuera ? P.hieLL : P.hie;
      return hierro(a, vv, P.hie, 440, 24);
    });
    // la aldaba del candado
    if (fuera) { const ax = HL[0] + F[0] + 12, ay = HL[1] + F[1]; cara([ax - 1, ay + 0.8], [2, 0], [0, 3], (uu, vv) => (uu < 0.1 || uu > 0.9 ? C.k : vv > 0.7 ? P.hieD : P.hieS)); }
  };
  if (abierta) {
    // la tapa abierta queda detrás
    if (th >= Math.PI / 4) tapa();
    cara([-10, -13], [24, 0], [-2, 4], (uu, vv) => (uu < 0.012 || uu > 0.988 ? C.k : vv < 0.25 ? P.madS : ruido(uu * 24, vv * 4, 450) > 0.8 ? P.madD : P.oxidoS));
    // las tres hojas de pie, en abanico, que asoman al abrirse, y las dos cartas dobladas con su lacre
    const sube = Math.min(1, th / 1.6) * 3;
    for (let q = 0; q < 3; q++) { const a0 = -7 + q * 6, b0 = -10.5 - sube - (q === 1 ? 0.6 : 0), inc = (q - 1) * 0.6;
      cara([a0, b0], [5, inc], [0, 3.5], (uu, vv) => { if (uu < 0.05 || uu > 0.95 || vv < 0.08) return P.borde; const i = Math.round(uu * 5 * s), j = Math.round(vv * 3.5 * s); return j % 2 === 1 && i > 0 && h(i, j, 460 + q) > 0.3 ? P.tinta : P.papel; }); }
    cara([-9.5, -10.4], [6, 0], [0, 1.4], (uu, vv) => (uu < 0.04 || uu > 0.96 || vv < 0.1 ? P.borde : Math.abs(uu - 0.5) < 0.09 ? P.cera : P.papelL));
    cara([4.5, -10.2], [6, 0.4], [0, 1.3], (uu, vv) => (uu < 0.04 || uu > 0.96 || vv < 0.1 ? P.borde : Math.abs(uu - 0.5) < 0.09 ? P.cera : P.papel));
  }
  // el frente del cuerpo
  cara([-12, -9], [24, 0], [0, 9], (uu, vv) => {
    if (uu < 0.01 || uu > 0.99 || vv > 0.96 || vv < 0.02) return C.k;
    const a = uu * 24, b = vv * 9;
    if ((Math.abs(b - 3.4) < 0.4 || Math.abs(b - 8) < 0.4) && Math.abs(a - Math.round(a / 3) * 3) < 0.35) return P.hieLL;   // remaches
    if (Math.abs(b - 2.2) < 0.3) return P.hieD;                                                                          // la junta de la tapa
    if (b < 2) return hierro(a, b, P.hieL, 475, 24);                                                                      // el borde de la tapa, a la luz
    const c = hierro(a, b, P.hie, 470, 24);
    // chorretones de óxido que bajan de los remaches
    if (h(Math.round(a / 3), 3, 471) > 0.7 && Math.abs(a - Math.round(a / 3) * 3 - 0.4) < 0.3 && b > 3.7 && b < 3.7 + h(Math.round(a / 3), 4, 472) * 3.5) return P.oxidoL;
    return c;
  });
  if (!abierta) tapa(); else if (th < Math.PI / 4) tapa();
  // el candado (cerrado, colgado de la aldaba) o roto sobre la mesa
  const candado = (cx, cy, abierto, ladeado) => {
    const g = ladeado ? 1 : 0;
    // el arco
    for (let k = 0; k <= 10; k++) { const an = Math.PI + k / 10 * Math.PI, ax = cx + Math.cos(an) * 1.4 + (abierto ? (k > 5 ? 0.8 : 0) : 0), ay = cy - 2.6 + Math.sin(an) * 1.8 - (abierto && k > 5 ? 0.9 : 0);
      R.pset(X(ax), Y(ay), C.k); R.pset(X(ax) + 1, Y(ay), k < 4 ? P.hieLL : P.hieL); }
    cara([cx - 2.2, cy - 2.4 + g * 0.3], [4.4, -g * 0.8], [0, 3.6], (uu, vv) => { if (uu < 0.06 || uu > 0.94 || vv < 0.06 || vv > 0.94) return C.k;
      if (Math.abs(uu - 0.5) < 0.09 && vv > 0.35 && vv < 0.75) return C.k; return uu < 0.3 ? P.latonL : uu > 0.75 ? P.latonS : P.laton; });
  };
  if (roto) { candado(16.5, -0.6, true, true); for (const [a, b] of [[19.5, -0.3], [20.2, -0.5]]) R.pset(X(a), Y(b), P.hieLL); }
  else if (!abierta) candado(0, -3.6, false, false);
  // un destello que recorre el canto de la tapa, y el polvo que salta al abrirla
  const g = ((t * 0.45) % 1.6) * 34 - 6;
  { const gb = abierta ? -8.6 : -9.5; for (let k = -1; k <= 1; k++) { const a = g + k * 0.6; if (a > -11 && a < 11) { R.pset(X(a), Y(gb), P.blanco); if (k === 0) { R.pset(X(a), Y(gb) - 1, P.hieLL); R.pset(X(a), Y(gb) + 1, P.hieLL); } } } }
  // abierta del todo: motas de polvo que flotan despacio en la luz sobre las hojas
  if (u >= 0.95) for (let k = 0; k < 7; k++) { const f = (t * 0.12 + h(k, 3, 481)) % 1, a = -9 + h(k, 4, 481) * 20 + Math.sin(t * 0.9 + k * 2) * 2, b = -11 - f * 10; p_tine(R, X(a), Y(b), P.papelL, 0.7 * Math.sin(f * Math.PI)); }
  if (u > 0.05 && u < 0.95) for (let k = 0; k < 10; k++) { const f = (u * 2.2 + h(k, 1, 480)) % 1, a = -10 + h(k, 2, 480) * 22 + Math.sin(t * 3 + k) * 1.5, b = -12 - f * 9; if (f < 0.9) p_tine(R, X(a), Y(b), P.papelL, 0.6 * (1 - f)); }
  return { arriba: [Math.round(x), Y(abierta ? -18 : -13)], candado: [X(roto ? 16.5 : 0), Y(roto ? -1 : -3)], dentro: [X(-10), Y(-13), X(13), Y(-9)], tapa: [X(-1), Y(-9)], asas: [[X(-12), Y(-4)], [X(13), Y(-4)]] };
}
export function d_tira(R, x, y, letras, o = {}) {
  const P = p_P, s = Math.max(1, Math.round(o.escala ?? 1)), t = o.t ?? 0;
  const L = String(letras || 'abfdefghiijklmmnohpp').replace(/[^a-p]/g, '').split(''), N = L.length;
  const n = Math.max(0, Math.min(N, o.n ?? N)), marca = !!o.marca, malas = o.malas ?? [2, 17], foco = o.foco ?? -1;
  const cel = 7 * s, ml = 7 * s, W = ml * 2 + N * cel - 2 * s, Hh = 17 * s, x0 = Math.round(x), y0 = Math.round(y), x1 = x0 + W - 1, y1 = y0 + Hh - 1;
  // la sombra
  for (let j = y0 + s + 1; j <= y1 + s + 1; j++) for (let i = x0 + s + 1; i <= x1 + s + 1; i++) if (i > x1 || j > y1) p_tine(R, i, j, C.k, 0.35);
  // el papel: blanco verdoso, la banda verde pálida del papel pijama, la línea troquelada, los agujeros y los cantos rasgados
  const ag = 3 * s, banda = [y0 + ag + s, y1 - ag - s];
  for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) {
    const rasgo = Math.round(h(j - y0, 0, 501) * 2 * s), rasgo2 = Math.round(h(j - y0, 1, 501) * 2 * s);
    if (i - x0 < rasgo || x1 - i < rasgo2) continue;
    let c = h(i, j, 502) > 0.95 ? P.tiraS : P.tiraP;
    if (j > banda[0] && j < banda[1] && Math.floor((i - x0) / (cel * 4)) % 2 === 0) c = h(i, j, 503) > 0.9 ? P.tiraS : P.tiraV;
    if (j === y0 || j === y1) c = P.tiraS;
    if ((j === y0 + ag + Math.floor(s / 2) || j === y1 - ag - Math.floor(s / 2)) && (i % 3) === 0) c = P.tiraS;        // el troquel
    for (const cy of [y0 + Math.ceil(ag / 2), y1 - Math.floor(ag / 2)]) { const px = (i - x0) % (5 * s), dx = px - 2.5 * s + 0.5, dy = j - cy; if (dx * dx + dy * dy <= (s * 0.9) ** 2 + 0.5) c = dx + dy < 0 ? P.tiraS : p_mez(c, C.k, 0.55); }
    if (i - x0 === rasgo || x1 - i === rasgo2) c = P.tiraS;
    R.pset(i, j, c);
  }
  // las letras de matriz de puntos (cada píxel de la letra, un puntito con su sombra) que salen de una en una
  const cen = [], ly = y0 + 5 * s;
  for (let q = 0; q < N; q++) {
    const lx = x0 + ml + q * cel; cen.push([lx + Math.round(2.5 * s), ly + Math.round(3.5 * s)]);
    if (q >= Math.ceil(n)) continue;
    const ap = q === Math.ceil(n) - 1 ? p_cl(n - q) : 1;
    if (ap <= 0) continue;
    const mala = marca && malas.includes(q), fo = q === foco, sal = fo ? -Math.round(Math.abs(Math.sin(t * 7)) * 2 * s) - s : 0;
    if (mala) for (let j = -s; j <= 7 * s; j++) for (let i = -s; i <= 6 * s - 1; i++) { const X = lx + i, Y = ly + j + sal; if (Math.abs(i - 2.5 * s) + Math.abs(j - 3.5 * s) * 0.8 < 5.5 * s && h(X, Y, 505) < 0.7) p_tine(R, X, Y, P.rojoL, 0.35 + 0.15 * Math.sin(t * 5)); }
    const g = p_LETRAS[L[q]], ci = mala ? P.rojo : fo ? P.amarD : P.tinta, cs = mala ? P.rojoS : P.tintaL;
    for (let j = 0; j < 7; j++) for (let i = 0; i < 5; i++) { if (g[j][i] !== '#') continue; if (ap < 1 && h(i, j, q + 506) > ap) continue;
      const X = lx + i * s, Y = ly + j * s + sal;
      if (s === 1) R.pset(X, Y, ci); else { R.rect(X, Y, X + s - 1, Y + s - 1, ci); R.pset(X + s - 1, Y + s - 1, cs); if (s > 2) R.pset(X, Y, p_mez(ci, P.blanco, 0.25)); } }
    if (mala && n >= N) { R.rect(lx - s, ly + 8 * s + sal, lx + 6 * s - 1, ly + 8 * s + sal + Math.max(0, s - 2), P.rojo); }
  }
  // el cabezal de la impresora que va dejando las letras: un taquito que vibra delante de la siguiente
  if (n < N) { const q = Math.ceil(n), lx = x0 + ml + Math.min(N - 1, q) * cel, v = Math.floor(t * 20) % 2;
    R.rect(lx - s, ly - s + v, lx + 5 * s, ly + 8 * s + v, C.k); R.rect(lx, ly + v, lx + 4 * s, ly + 7 * s + v, P.hie); R.rect(lx, ly + v, lx + 4 * s, ly + v, P.hieL); R.pset(lx + 2 * s, ly + 3 * s + v, P.rojoL); }
  return { caja: [x0, y0, x1, y1], ancho: W, alto: Hh, letras: cen };
}
// pausa · los seis objetos de las pausas
export function pausa(R, x, y, t, o = {}) {
  const s = o.s ?? 2, G = p_grilla(R, Math.round(x), Math.round(y), s), cual = o.cual || 'balanza';
  if (cual === 'pergamino') return p_pergamino(R, G, t, o, x, y, s);
  if (cual === 'tragaperras') return p_tragaperras(R, G, t, o, x, y, s);
  if (cual === 'bombo') return p_bombo(R, G, t, o, x, y, s);
  if (cual === 'torre') return p_torre(R, G, t, o, x, y, s);
  if (cual === 'teatrillo') return p_teatrillo(R, G, t, o, x, y, s);
  return p_balanza(R, G, t, o, x, y, s);
}
// la paleta propia de Lynchburg (cielos de invierno y de primavera, nieve, pizarra, yeso, piedra, latón, luz de vela…)
const a_L = pal({
  c0: '#6c7ea2', c1: '#8292b4', c2: '#9aa8c4', c3: '#b4bed4', c4: '#ccd3e2',
  nL: '#f4f6fa', nM: '#d2d8e4', nS: '#a0aac2', nD: '#7e88a4',
  v0: '#6e9ad0', v1: '#8cb0de', v2: '#acc6e8', v3: '#cadcf0',
  col0: '#8e98b0', col1: '#76809a', col2: '#5e6682', colV: '#6e8a5e', colVS: '#526a48', colVL: '#88a272',
  rioS: '#2e4650', rioD: '#22363e',
  ladL: '#a6604a', mort: '#a49684', mortS: '#7a6c5e',
  pz: '#4c5062', pzS: '#363a4a', pzL: '#6a7088',
  nv: '#eef2f8', nvS: '#c6d0e0', nvD: '#96a2ba',
  bl: '#ece6da', blS: '#bab2a4', blL: '#ffffff', blD: '#8e887c',
  m: '#7a5232', mS: '#553820', mL: '#9a6c44', mD: '#38261a',
  caoba: '#5e2e20', caobaS: '#401e16', caobaL: '#7e4430',
  barro: '#6e5a48', barroS: '#544438', barroL: '#8a7462', hielo: '#aebccf', paja: '#c8a85a',
  luz: '#ffd890', luzL: '#fff2c4', luzS: '#e8a040', luzD: '#a8602a',
  vid: '#2c3446', vidL: '#55658a', vidR: '#8c9cba',
  yeso: '#d6caae', yesoS: '#b4a68c', yesoL: '#e6ddc6', yesoD: '#8c7e68',
  pd: '#8a8478', pdS: '#625e56', pdL: '#aaa498', pdD: '#45423e',
  laton: '#c8a048', latonS: '#8a6a28', latonL: '#f0d888',
  verde: '#3e5a44', verdeS: '#2a4030', verdeL: '#587a5e',
  gris: '#8a8e98', grisS: '#5e626e',
  noche0: '#0e1428', noche1: '#162040', noche2: '#202c54', noche3: '#2e3a66',
  papelS: '#c2b28c', oxL: '#b8703c', fuego: '#ff9a30', fuegoL: '#ffe080', fuegoS: '#c84a1a',
  alfR: '#8a2e2a', alfRS: '#5e1e1c', alfA: '#2e4a6a', alfO: '#c89a4a',
  tapiz: '#6a7656', tapizS: '#5a6648', tapizL: '#808c68',
  azulP: '#aebcc4', azulPS: '#8e9ea8', piel: '#e8b088', pielS: '#b87a58',
});

const a_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral de la trama de Bayer 4 × 4 en (x, y): 0–1
const a_bay = (x, y) => a_B4[(y & 3) * 4 + (x & 3)] / 16;

// mezcla dos colores (k = 0: a; 1: b)
const a_mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };

// tiñe el píxel (x, y) hacia col en la proporción a
const a_tin = (R, x, y, col, a) => { const c = R.pget(x, y); if (c) R.pset(x, y, a_mez(c, col, a)); };

// la caché de los fondos fijos: pinta(mascara) una vez en un búfer de R.nuevo() y luego lo copia en cada fotograma;
// la máscara (320 × 180) marca con 1 el cielo, para pasar nubes y pájaros solo por detrás de los tejados
const a_cache = new Map();

function a_fondo(R, clave, pinta) {
  let e = a_cache.get(clave);
  if (!e) { const b = R.nuevo(), m = new Uint8Array(320 * 180), prev = R.usar(b); pinta(m); R.usar(prev); e = { b, m }; a_cache.set(clave, e); }
  R.copiar(e.b); return e.m;
}

// degradado tramado (Bayer) entre bandas de color, de y0 a y1 y de x0 a x1; marca la máscara si se da
function a_degradado(R, x0, y0, x1, y1, cols, m = null) {
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) { R.pset(x, y, a_bay(x, y) < f ? cols[i + 1] : cols[i]); if (m) m[y * 320 + x] = 1; } }
}

// un disco que solo pinta donde la máscara vale 1 (lo que pasa por detrás de tejados y colinas)
function a_discoM(R, cx, cy, r, c, m) {
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
    if (x < 0 || x > 319 || y < 0 || y > 179 || (m && !m[y * 320 + x])) continue; const dx = x + 0.5 - cx, dy = y + 0.5 - cy; if (dx * dx + dy * dy <= r * r) R.pset(x, y, c); }
}

// las nubes de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana, a tres velocidades; lista [x0, y, w, v]
function a_nubes(R, t, m, lista, tonos) {
  const [cL, cM, cS] = tonos;
  for (const [x0, y, w, v, k] of lista) { const cx = ((x0 + t * v) % (360 + w)) - w * 0.6, n = 3 + Math.round(w / 14), B = [];
    for (let i = 0; i < n; i++) { const u = i / (n - 1) - 0.5, r = w * (0.2 + 0.16 * (1 - Math.abs(u) * 1.6)) * (0.8 + h(i, k, 30) * 0.4); B.push([cx + u * w, y - r * 0.35 + h(i, k, 31) * 2, r]); }
    const base = y + 3, mb = (x, yy) => !m || (m[yy * 320 + x] && yy <= base);
    const disc = (bx, by, r, c) => { for (let yy = Math.floor(by - r); yy <= Math.min(base, by + r); yy++) for (let xx = Math.floor(bx - r); xx <= bx + r; xx++) { if (xx < 0 || xx > 319 || yy < 0 || yy > 179 || !mb(xx, yy)) continue; const dx = xx + 0.5 - bx, dy = yy + 0.5 - by; if (dx * dx + dy * dy <= r * r) { if (xx > 272 && yy < 48) a_tin(R, xx, yy, c, 0.4); else R.pset(xx, yy, c); } } };
    for (const [bx, by, r] of B) disc(bx, by + 1, r, cS);
    for (const [bx, by, r] of B) disc(bx - 0.5, by - 0.5, r * 0.86, cM);
    for (const [bx, by, r] of B) disc(bx - r * 0.25, by - r * 0.3, r * 0.5, cL);
    for (let xx = Math.round(cx - w * 0.45); xx < cx + w * 0.45; xx++) if (((xx + Math.round(t)) & 3) === 0 && mb(xx, base)) R.pset(xx, base, cS); }
}

// cuervos que cruzan aleteando (y0: altura; m: máscara del cielo)
function a_cuervos(R, t, y0, m, n = 3, col = C.k) {
  for (let k = 0; k < n; k++) { const x = Math.round(((h(k, 1, 40) * 400 + t * (9 + k * 3)) % 400) - 40), y = Math.round(y0 + h(k, 2, 40) * 16 + Math.sin(t * 0.8 + k) * 3), a = Math.sin(t * 8 + k * 2) > 0;
    const p = (xx, yy) => { if (xx >= 0 && xx < 320 && yy >= 0 && yy < 180 && (!m || m[yy * 320 + xx])) R.pset(xx, yy, col); };
    p(x, y); p(x + 1, y); if (a) { p(x - 1, y - 1); p(x - 2, y - 2); p(x + 2, y - 1); p(x + 3, y - 2); } else { p(x - 1, y + 1); p(x - 2, y + 1); p(x + 2, y + 1); p(x + 3, y + 1); } }
}

// la nevada: copos que caen y se mecen, en el recorte rc [x0, y0, x1, y1]; cerca: copos más grandes y rápidos
function a_copos(R, t, n, cerca = false, rc = [0, 0, 319, 179]) {
  const [x0, y0, x1, y1] = rc, W = x1 - x0 + 1, H = y1 - y0 + 1;
  for (let k = 0; k < n; k++) { const v = cerca ? 26 + (k % 3) * 8 : 7 + (k % 4) * 3, y = y0 + ((h(k, 3, 50) * H + t * v) % H), x = x0 + ((h(k, 4, 50) * W + Math.sin(t * 0.9 + k) * 4 + t * 3) % W + W) % W;
    const xx = Math.round(x), yy = Math.round(y);
    if (cerca) { R.rect(xx, yy, xx + 1, yy + 1, a_L.nv); R.pset(xx + 1, yy + 1, a_L.nvS); } else { R.pset(xx, yy, k % 3 ? a_L.nv : a_L.nvS); } }
}

// humo que sube de una chimenea en volutas que crecen, se tuercen con el viento hacia la izquierda y se deshacen
function a_humo(R, x, y, t, c = a_L.nM, cS = a_L.nS, alto = 30, m = null) {
  for (let k = 0; k < 6; k++) { const u = ((t * 0.22 + k / 6) % 1), r = 1 + u * 3.2, xx = x - u * u * 26 + Math.sin(u * 6 + k) * 2, yy = y - u * alto;
    if (u > 0.85 && (k & 1)) continue; a_discoM(R, xx + 0.6, yy + 0.6, r, cS, m); a_discoM(R, xx, yy, r * 0.8, c, m); }
}

// muro de ladrillo (hiladas de 3 px, ladrillos de 6) entre (x0, y0) y (x1, y1); dentro(x, y) recorta la forma;
// pal = [ladrillo, sombra, luz, mortero, morteroS]; k cambia el sorteo de tonos
function a_ladrillos(R, x0, y0, x1, y1, k = 0, dentro = null, pal = null) {
  const [c, cS, cL, mo, moS] = pal ?? [C.ladrillo, C.ladrilloS, a_L.ladL, a_L.mort, a_L.mortS];
  for (let y = y0; y <= y1; y++) { const fila = Math.floor(y / 3), r = y - fila * 3, off = (fila & 1) * 3;
    for (let x = x0; x <= x1; x++) { if (dentro && !dentro(x, y)) continue;
      const col = Math.floor((x + off) / 6);
      if (r === 2 || (x + off) % 6 === 5) { R.pset(x, y, h(col, fila, 90 + k) < 0.3 ? moS : mo); continue; }
      const v = h(col, fila, 80 + k); let cc = v < 0.2 ? cS : v > 0.86 ? cL : c;
      if (r === 0 && v > 0.45 && (x + off) % 6 < 2) cc = cL;
      if (h(x, y, 85 + k) < 0.05) cc = cS;
      R.pset(x, y, cc); } }
}

// piedra de sillarejo: hiladas de 7 px con piedras de 8–15 px, junta oscura, canto de luz arriba y sombra abajo
function a_piedras(R, x0, y0, x1, y1, k = 0, pal = null) {
  const [c, cS, cL, cJ] = pal ?? [a_L.pd, a_L.pdS, a_L.pdL, a_L.pdD];
  R.rect(x0, y0, x1, y1, cJ);
  for (let f = 0, y = y0; y <= y1; f++, y += 7) { let x = x0 - Math.round(h(f, 0, 60 + k) * 8);
    while (x <= x1) { const w = 8 + Math.round(h(x, f, 61 + k) * 7), a = Math.max(x0, x + 1), b = Math.min(x1, x + w - 1), yb = Math.min(y1, y + 5);
      if (b >= a) { const v = h(x, f, 62 + k), cc = v < 0.25 ? cS : v > 0.8 ? cL : c; R.rect(a, y + 1, b, yb, cc); R.rect(a, y + 1, b, y + 1, v > 0.8 ? a_L.blS : cL); if (yb === y + 5) R.rect(a + 1, yb, b, yb, cS);
        if (h(x, f, 63 + k) < 0.5) R.pset(a + 2 + Math.round(h(x, f, 64 + k) * Math.max(0, b - a - 4)), y + 3, cS); }
      x += w; } }
}

// tablas verticales de anchura w con sus juntas, vetas y el canto de luz; pal = [c, sombra, luz, junta]
function a_tablasV(R, x0, y0, x1, y1, w, pal, k = 0) {
  const [c, cS, cL, cD] = pal;
  for (let x = x0; x <= x1; x++) { const b = Math.floor((x - x0) / w), i = (x - x0) % w, base = h(b, 0, 70 + k) < 0.3 ? cS : c;
    for (let y = y0; y <= y1; y++) { let cc = i === w - 1 ? cD : i === 0 ? cL : base; if (i > 0 && i < w - 1 && h(x, Math.floor(y / (4 + (b % 3) * 2)), 71 + k) < 0.16) cc = cc === cS ? cD : cS; R.pset(x, y, cc); } }
}

// tablero de madera de frente (tablas horizontales): juntas, vetas claras y oscuras, algún nudo y el canto de luz
function a_madera(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, tabla = 10) {
  R.rect(x0, y0, x1, y1, c);
  for (let y = y0 + 3, f = 0; y < y1; y += tabla, f++) {
    if (y + tabla - 1 < y1) R.rect(x0, y + tabla - 1, x1, y + tabla - 1, cD);
    for (let g = 0; g < 4; g++) { const gy = y + 1 + Math.round(h(f, g, 310 + k) * (tabla - 4)); let x = x0 - Math.round(h(f, g, 311 + k) * 24);
      while (x < x1) { const L = 8 + Math.round(h(x, gy, 312 + k) * 34); if (h(x, g, 313 + k) < 0.7 && gy < y1) R.rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 3 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 314 + k) * 12); } }
    if (h(f, 9, 315 + k) < 0.55 && y + 6 < y1) { const nx = x0 + 10 + Math.round(h(f, 7, 316 + k) * (x1 - x0 - 20)), ny = y + Math.round(tabla / 2) - 1; R.rect(nx - 3, ny, nx + 3, ny, cS); R.rect(nx - 1, ny - 1, nx + 1, ny + 1, cS); R.pset(nx, ny, cD); }
  }
  R.rect(x0, y0, x1, y0, cL);
}

// un cuarterón (panel en relieve): marco, el bisel con luz arriba e izquierda y sombra abajo y derecha
function a_cuarteron(R, x0, y0, x1, y1, c, cS, cL) {
  R.rect(x0, y0, x1, y1, cS); R.rect(x0, y0, x1, y0, cL); R.rect(x0, y0, x0, y1, cL);
  R.rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, c); R.rect(x0 + 2, y1 - 2, x1 - 2, y1 - 2, cS); R.rect(x1 - 2, y0 + 2, x1 - 2, y1 - 2, cS); R.rect(x0 + 2, y0 + 2, x1 - 3, y0 + 2, cL);
}

// las cifras pequeñas (3 × 5 por cifra, escala s) para las hojas de Beale, el registro y el calendario; la coma, un punto
// y su rabito. Devuelve el ancho
const a_DIG = { 0: [7, 5, 5, 5, 7], 1: [2, 6, 2, 2, 7], 2: [7, 1, 7, 4, 7], 3: [7, 1, 3, 1, 7], 4: [5, 5, 7, 1, 1], 5: [7, 4, 7, 1, 7], 6: [7, 4, 7, 5, 7], 7: [7, 1, 2, 2, 2], 8: [7, 5, 7, 5, 7], 9: [7, 5, 7, 1, 7] };

function a_dig(R, x, y, txt, c, s = 1) {
  let cx = x;
  for (const ch of String(txt)) {
    if (ch === ',') { R.rect(cx, y + 4 * s, cx + s - 1, y + 6 * s - 1, c); cx += 2 * s; continue; }
    if (ch === ' ') { cx += 2 * s; continue; }
    const f = a_DIG[ch]; if (!f) continue;
    f.forEach((bits, j) => { for (let i = 0; i < 3; i++) if (bits & (4 >> i)) R.rect(cx + i * s, y + j * s, cx + i * s + s - 1, y + j * s + s - 1, c); });
    cx += 4 * s;
  }
  return cx - x;
}

// las tres hojas de Beale (las primeras cifras de cada una, como en el folleto de 1885)
const a_SERIES = [
  [71, 194, 38, 1701, 89, 76, 11, 83, 1629, 48, 94, 63, 132, 16, 111, 95, 84, 341, 975, 14, 40, 64, 27, 81, 139, 213, 63, 90, 1120, 8, 15, 3, 126, 2018, 40, 74, 758, 485, 604, 230, 436, 664, 582, 150, 251, 284, 308, 231, 124, 211],
  [115, 73, 24, 807, 37, 52, 49, 17, 31, 62, 647, 22, 7, 15, 140, 47, 29, 107, 79, 84, 56, 239, 10, 26, 811, 5, 196, 308, 85, 52, 160, 136, 59, 211, 36, 9, 46, 316, 554, 122, 106, 95, 53, 58, 2, 42, 7, 35, 122, 53],
  [317, 8, 92, 73, 112, 89, 67, 318, 28, 96, 107, 41, 631, 78, 146, 397, 118, 98, 114, 246, 348, 116, 74, 88, 12, 65, 32, 14, 81, 19, 76, 121, 216, 85, 33, 66, 15, 108, 68, 77, 43, 24, 122, 96, 117, 36, 211, 301, 15, 44],
];

// una hoja de números de Beale entre (x0, y0) y (x1, y1): papel envejecido con su borde, manchas y una esquina doblada,
// y renglones de cifras separadas por comas (n: la hoja 0, 1 o 2; s: escala de las cifras)
function a_hojaNum(R, x0, y0, x1, y1, n = 0, s = 1) {
  const K = C.k, L = a_L;
  R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, C.papel);
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) { const v = h(x >> 1, y >> 1, 200 + n); if (v < 0.1 || x === x0 + 1 || y === y1 - 1) R.pset(x, y, C.papelV); else if (v > 0.97) R.pset(x, y, L.papelS); }
  R.poligono([[x1 - 4, y0 + 1], [x1, y0 + 1], [x1, y0 + 5]], K); R.poligono([[x1 - 4, y0 + 1], [x1 - 1, y0 + 4], [x1 - 4, y0 + 4]], L.papelS);
  const S = a_SERIES[n % 3]; let i = 0;
  for (let y = y0 + 3; y + 5 * s < y1 - 1; y += 7 * s) { let x = x0 + 3;
    for (;;) { const tok = S[i % S.length] + ','; const w = tok.length * 4 * s; if (x + w - 2 * s > x1 - 2) break; x += a_dig(R, x, y, tok, C.tinta, s) + s; i++; } }
}

// un rectángulo que respeta R.recorte (R.rect no lo hace): para las piezas pequeñas que pasan por ventanas y huecos
const a_r = (R, x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); };

// una barrica de tabaco (hogshead) de pie: duelas con su luz y su sombra, tres aros de hierro y la tapa
function a_barrica(R, cx, suelo, s = 1) {
  const W = 6 * s, H = Math.round(16 * s), L = a_L, K = C.k;
  for (let j = 0; j < H; j++) { const e = (j - H / 2) / (H / 2), hw = Math.round(W - s * 1.6 * e * e), y = suelo - H + j;
    a_r(R, cx - hw - 1, y, cx + hw + 1, y, K);
    for (let x = cx - hw; x <= cx + hw; x++) { const u = (x - cx) / hw; let c = u < -0.55 ? L.mL : u > 0.5 ? L.mS : L.m; if (Math.round((x - cx) / (2.2 * s)) * 2.2 * s === x - cx && Math.abs(u) < 0.9) c = u > 0.3 ? L.mD : L.mS; R.pset(x, y, c); } }
  for (const f of [0.14, 0.5, 0.86]) { const y = Math.round(suelo - H + f * H), e = f * 2 - 1, hw = Math.round(W - s * 1.6 * e * e); a_r(R, cx - hw, y, cx + hw, y + Math.max(0, Math.round(s) - 1), C.hierro); a_r(R, cx - hw, y, cx - Math.round(hw * 0.4), y, C.hierroL); }
  a_r(R, cx - W + 1, suelo - H - 1, cx + W - 1, suelo - H, K); a_r(R, cx - W + 2, suelo - H, cx + W - 2, suelo - H, L.mL);
}

// gente pequeña de fondo (11 px): abrigo, sombrero de copa o de ala, cara y piernas que andan; o.dir, o.anda, o.abrigo,
// o.gorra (quepis de soldado), o.carga (un fardo al hombro)
function a_gente(R, x, suelo, t, o = {}) {
  const L = a_L, K = C.k, dir = o.dir ?? 1, f = o.anda ? Math.floor(t * 6 + x * 0.3) % 2 : 0, ab = o.abrigo ?? L.pzS, b = o.anda ? f : 0;
  x = Math.round(x); suelo = Math.round(suelo);
  a_r(R, x - 1 - (f ? dir : 0), suelo - 3, x - 1 - (f ? dir : 0), suelo - 1, K); a_r(R, x + 1 + (f ? dir : 0), suelo - 3, x + 1 + (f ? dir : 0), suelo - 1, K);
  a_r(R, x - 2, suelo - 8 - b, x + 2, suelo - 3, ab); a_r(R, x + 1 * dir, suelo - 8 - b, x + 2 * dir, suelo - 3, a_mez(ab, K, 0.35)); R.pset(x - 2 * dir, suelo - 4 + (f ? -1 : 0), a_mez(ab, C.blanco, 0.2));
  a_r(R, x - 1, suelo - 11 - b, x + 1, suelo - 9 - b, o.piel ?? L.piel); R.pset(x + dir, suelo - 10 - b, K);
  if (o.gorra) { a_r(R, x - 1, suelo - 12 - b, x + 1, suelo - 12 - b, o.gorra); R.pset(x + 2 * dir, suelo - 11 - b, K); }
  else { a_r(R, x - 2, suelo - 12 - b, x + 2, suelo - 12 - b, K); a_r(R, x - 1, suelo - 14 - b, x + 1, suelo - 13 - b, K); }
  if (o.carga) { a_r(R, x - 3 * dir, suelo - 12 - b, x - 1 * dir, suelo - 9 - b, L.paja); }
}

// una carreta de bueyes pequeña, de fondo (x: la rueda; dir: hacia dónde va): el buey que anda, la lanza, la caja con
// dos barricas (o.toldo: el toldo blanco de una carreta de suministros) y el boyero que camina al lado
function a_carreta(R, x, suelo, t, dir = 1, o = {}) {
  const L = a_L, K = C.k, p = Math.floor(t * 4 + x) % 2, bx = x + dir * 16;
  // el buey
  a_r(R, bx - 6, suelo - 9, bx + 6, suelo - 4, K); a_r(R, bx - 5, suelo - 8, bx + 5, suelo - 5, hex('#7a5a3a')); a_r(R, bx - 5, suelo - 8, bx + 5, suelo - 8, hex('#9a7a52'));
  a_r(R, bx + dir * 6, suelo - 10, bx + dir * 9, suelo - 6, K); a_r(R, bx + dir * 7, suelo - 9, bx + dir * 8, suelo - 7, hex('#7a5a3a')); R.pset(bx + dir * 7, suelo - 11, L.bl); R.pset(bx + dir * 9, suelo - 11, L.bl);
  for (const [lx, q] of [[-4, 0], [-2, 1], [3, 0], [5, 1]]) a_r(R, bx + lx, suelo - 4, bx + lx, suelo - 1 - ((q ^ p) ? 1 : 0), K);
  R.pset(bx - dir * 7, suelo - 7 + p, K);
  // la lanza, la caja y la carga
  R.linea(x + dir * 4, suelo - 6, bx - dir * 5, suelo - 7, K);
  a_r(R, x - 9, suelo - 10, x + 9, suelo - 5, K); a_r(R, x - 8, suelo - 9, x + 8, suelo - 6, L.m); a_r(R, x - 8, suelo - 9, x + 8, suelo - 9, L.mL);
  if (o.toldo) { R.poligono([[x - 9, suelo - 10], [x - 8, suelo - 19], [x + 8, suelo - 19], [x + 9, suelo - 10]], K); R.poligono([[x - 8, suelo - 10], [x - 7, suelo - 18], [x + 7, suelo - 18], [x + 8, suelo - 10]], L.bl); for (const a of [-4, 0, 4]) a_r(R, x + a, suelo - 18, x + a, suelo - 10, L.blS); }
  else { a_barrica(R, x - 4, suelo - 9, 0.55); a_barrica(R, x + 4, suelo - 9, 0.55); }
  // la rueda de radios que gira
  R.disco(x, suelo - 4, 4.5, K); R.disco(x, suelo - 4, 3.5, L.mS); R.disco(x, suelo - 4, 2.5, K);
  for (let k = 0; k < 3; k++) { const a = t * 3 * dir + k * Math.PI / 3; R.linea(Math.round(x - Math.cos(a) * 3), Math.round(suelo - 4 - Math.sin(a) * 3), Math.round(x + Math.cos(a) * 3), Math.round(suelo - 4 + Math.sin(a) * 3), L.mL); }
  R.pset(x, suelo - 4, L.mD);
  a_gente(R, x - dir * 12, suelo, t, { dir, anda: true, abrigo: o.toldo ? L.gris : L.mS, gorra: o.toldo ? L.grisS : null });
}

// una barca larga de tabaco (bateau) con tres barricas y dos bogadores que empujan con la pértiga
function a_bateau(R, x, y, t, dir = 1) {
  const L = a_L, K = C.k; x = Math.round(x);
  R.poligono([[x - 20, y - 3], [x + 20, y - 3], [x + 17, y + 1], [x - 17, y + 1]], K); R.poligono([[x - 19, y - 2], [x + 19, y - 2], [x + 16, y], [x - 16, y]], L.m); a_r(R, x - 18, y - 2, x + 18, y - 2, L.mL);
  for (let k = -1; k <= 1; k++) a_barrica(R, x + k * 7, y - 2, 0.42);
  for (const [px, ph] of [[-16, 0], [15, 1.7]]) { const e = Math.sin(t * 1.4 + ph), xx = x + px; a_gente(R, xx, y - 2, t, { dir: -dir, abrigo: L.mS });
    R.linea(xx + Math.round(e * 2), y - 12, xx - dir * 4 + Math.round(e * 5), y + 4, L.mD); }
  for (let k = 0; k < 6; k++) { const wx = x - 22 - dir * (k * 3 + (t * 6) % 3); R.pset(Math.round(wx), y + 1 + (k & 1), L.nM); }
}

// un perro que trota (o se tumba: o.duerme) de perfil, de 12 px
function a_perro(R, x, suelo, t, dir = 1, o = {}) {
  const K = C.k, c = o.c ?? hex('#8a6a46'), cS = hex('#5e4630'), cL = hex('#b08a5e'); x = Math.round(x);
  if (o.duerme) { const r = Math.sin(t * 2) > 0 ? 1 : 0; a_r(R, x - 6, suelo - 4 - r, x + 5, suelo, K); a_r(R, x - 5, suelo - 3 - r, x + 4, suelo - 1, c); a_r(R, x - 5, suelo - 3 - r, x + 4, suelo - 3 - r, cL);
    a_r(R, x + 3 * dir, suelo - 5, x + 7 * dir, suelo - 1, K); a_r(R, x + 4 * dir, suelo - 4, x + 6 * dir, suelo - 2, c); R.pset(x + 7 * dir, suelo - 2, K); R.pset(x + 4 * dir, suelo - 5, cS);
    a_r(R, x - 8 * dir, suelo - 1, x - 6 * dir, suelo - 1, c); return; }
  const p = Math.floor(t * 8) % 2;
  a_r(R, x - 5, suelo - 7, x + 4, suelo - 3, K); a_r(R, x - 4, suelo - 6, x + 3, suelo - 4, c); a_r(R, x - 4, suelo - 6, x + 3, suelo - 6, cL);
  a_r(R, x + 4 * dir, suelo - 9, x + 7 * dir, suelo - 5, K); a_r(R, x + 5 * dir, suelo - 8, x + 6 * dir, suelo - 6, c); R.pset(x + 8 * dir, suelo - 6, K); R.pset(x + 4 * dir, suelo - 10, cS);
  for (const [lx, q] of [[-4, 0], [-2, 1], [2, 0], [3, 1]]) a_r(R, x + lx, suelo - 3, x + lx, suelo - ((q ^ p) ? 1 : 0), K);
  R.linea(x - 5 * dir, suelo - 6, x - 8 * dir, suelo - 9 + p, K);
}

// un gato tumbado que mueve la cola (y la oreja)
function a_gato(R, x, suelo, t, dir = 1, c = hex('#c8823a')) {
  const K = C.k, cS = a_mez(c, K, 0.35), cL = a_mez(c, C.blanco, 0.3), r = Math.sin(t * 1.8) > 0.2 ? 1 : 0;
  a_r(R, x - 5, suelo - 4, x + 4, suelo, K); a_r(R, x - 4, suelo - 3, x + 3, suelo - 1, c); a_r(R, x - 4, suelo - 3, x + 3, suelo - 3, cL); a_r(R, x - 2, suelo - 1, x + 1, suelo - 1, cS);
  a_r(R, x + 3 * dir, suelo - 6, x + 6 * dir, suelo - 2, K); a_r(R, x + 4 * dir, suelo - 5, x + 5 * dir, suelo - 3, c); R.pset(x + 4 * dir, suelo - 7, K); R.pset(x + 6 * dir, suelo - 7 + r, K); R.pset(x + 5 * dir, suelo - 4, K);
  const cl = Math.sin(t * 2.4); R.linea(x - 5 * dir, suelo - 1, x - 8 * dir, Math.round(suelo - 2 - cl * 2), K); R.pset(x - 8 * dir, Math.round(suelo - 3 - cl * 2), c);
}

// una llama de vela o de lámpara que tiembla (s: tamaño)
function a_llama(R, x, y, t, s = 1) {
  const f = Math.sin(t * 13 + x) * 0.5 + Math.sin(t * 7.3 + y) * 0.5, L = a_L, hgt = Math.round(3 * s + (f > 0.3 ? 1 : 0));
  for (let j = 0; j <= hgt; j++) { const w = Math.max(0, Math.round((j < hgt * 0.4 ? j / (hgt * 0.4) : (hgt - j) / (hgt * 0.6)) * s)), xx = x + (j > hgt * 0.6 && f > 0 ? 1 : 0);
    R.rect(xx - w, y - j, xx + w, y - j, j < 2 ? L.luzS : j > hgt - 2 ? L.luzL : L.luz); }
  R.pset(x, y - Math.round(hgt * 0.35), L.blL);
}

// el resplandor de una luz: tiñe hacia col los píxeles de alrededor con trama, más fuerte en el centro (r tiembla con t)
function a_resplandor(R, cx, cy, r, col, a, t = 0, rc = null) {
  r = r * (1 + Math.sin(t * 9 + cx) * 0.03 + Math.sin(t * 5.1) * 0.03);
  const [x0, y0, x1, y1] = rc ?? [0, 0, 319, 179];
  for (let y = Math.max(y0, Math.floor(cy - r)); y <= Math.min(y1, cy + r); y++) for (let x = Math.max(x0, Math.floor(cx - r)); x <= Math.min(x1, cx + r); x++) {
    const g = 1 - Math.hypot(x - cx, (y - cy) * 1.1) / r; if (g <= 0) continue; const k = g * g * a; if (k > a_bay(x, y) * 0.5) a_tin(R, x, y, col, Math.min(0.7, k)); }
}

// el fuego de una chimenea entre x0 y x1 con la base en y: lenguas de tres colores que suben y chispas
function a_fuego(R, x0, x1, y, t, alto = 16) {
  const L = a_L;
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), env = Math.sin(u * Math.PI), hh = alto * env * (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 9 + x * 0.9) * Math.sin(t * 5.3 + x * 0.37)));
    for (let j = 0; j < hh; j++) { const v = j / hh; R.pset(x, y - j, v < 0.35 ? L.fuegoL : v < 0.7 ? L.fuego : L.fuegoS); } }
  for (let k = 0; k < 5; k++) { const u = (t * 0.9 + k / 5) % 1, xx = x0 + (x1 - x0) * h(k, Math.floor(t * 0.9 + k / 5), 99) + Math.sin(u * 7) * 3; if (u < 0.8) R.pset(Math.round(xx), Math.round(y - alto - u * 20), u < 0.4 ? L.fuegoL : L.fuego); }
}

// la ventana de fuera (de guillotina, 6 sobre 6): dintel de piedra, alféizar, marco blanco, cristales que reflejan el
// cielo (o.luz: encendida, cálida, con visillo) y contraventanas verdes de lamas (o.contra)
function a_ventana(R, x0, y0, x1, y1, o = {}) {
  const L = a_L, K = C.k, cols = o.cols ?? 3, mx = (x0 + x1) >> 1;
  R.rect(x0 - 3, y0 - 5, x1 + 3, y0 - 1, K); R.rect(x0 - 2, y0 - 4, x1 + 2, y0 - 2, L.pdL); R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, L.pd); R.rect(mx - 2, y0 - 5, mx + 2, y0 - 1, L.bl); R.rect(mx - 2, y0 - 5, mx + 2, y0 - 5, K);
  if (o.contra) for (const [a, b] of [[x0 - 9, x0 - 2], [x1 + 2, x1 + 9]]) { R.rect(a, y0, b, y1, K); R.rect(a + 1, y0 + 1, b - 1, y1 - 1, L.verde); for (let y = y0 + 3; y < y1 - 1; y += 3) { R.rect(a + 1, y, b - 1, y, L.verdeS); R.rect(a + 1, y - 1, b - 1, y - 1, L.verdeL); } R.rect(a + 1, y0 + 1, b - 1, y0 + 1, L.verdeL); }
  R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, L.bl);
  const gx0 = x0 + 2, gx1 = x1 - 2, gy0 = y0 + 2, gy1 = y1 - 2;
  for (let y = gy0; y <= gy1; y++) for (let x = gx0; x <= gx1; x++) {
    let c;
    if (o.luz) { const d = Math.abs(x - mx) / ((gx1 - gx0) / 2); c = d > 0.62 ? (h(x, y >> 1, 77) < 0.5 ? L.luzS : L.luzD) : y < gy0 + 3 ? L.luzL : L.luz; }
    else { const r = (x - gx0) + (y - gy0) * 0.8; c = (r % 14) < 2.5 && y < gy1 - 2 ? L.vidR : y < gy0 + (gy1 - gy0) * 0.3 ? L.vidL : L.vid; if (o.cortina && Math.abs(x - mx) > (gx1 - gx0) * 0.3 && (x + y) % 2) c = L.blS; }
    R.pset(x, y, c);
  }
  const ym = (gy0 + gy1) >> 1; R.rect(gx0, ym, gx1, ym + 1, L.bl); R.rect(gx0, ym + 2, gx1, ym + 2, L.blS);
  for (let i = 1; i < cols; i++) { const x = Math.round(gx0 + (gx1 - gx0 + 1) * i / cols); R.rect(x, gy0, x, gy1, L.bl); }
  for (const yy of [Math.round((gy0 + ym) / 2), Math.round((ym + 2 + gy1) / 2)]) R.rect(gx0, yy, gx1, yy, L.bl);
  R.rect(x0 - 2, y1 + 1, x1 + 2, y1 + 2, K); R.rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, L.pdL);
}

// el letrero colgante de la posada con el dibujo de una jarra (sin letras): dos cadenas, la tabla con su marco y la jarra
// de barro con el asa, su brillo y la espuma; se mece con el viento
function a_letrero(R, cx, top, t, s = 1, viento = 1) {
  const L = a_L, K = C.k, d = Math.round(Math.sin(t * 1.3) * 1.5 * viento), w = Math.round(10 * s), hg = Math.round(14 * s), y0 = top + Math.round(4 * s);
  R.linea(cx - w + 2, top, cx - w + 2 + d, y0, C.hierro); R.linea(cx + w - 2, top, cx + w - 2 + d, y0, C.hierro);
  const x0 = cx - w + d, x1 = cx + w + d, y1 = y0 + hg;
  R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, L.m); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, L.mL);
  R.rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, L.mD); R.rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, hex('#e8dcb8'));
  const jx = cx + d - Math.round(1 * s), jy = y0 + Math.round(hg * 0.62), r = 3.6 * s;
  R.disco(jx + 0.5, jy, r + 1, K); R.disco(jx + 0.5, jy, r, hex('#8a5a36')); R.disco(jx - r * 0.3, jy - r * 0.3, r * 0.4, hex('#b07a4a'));
  R.rect(jx - Math.round(1.4 * s), jy - Math.round(r + 2 * s), jx + Math.round(2 * s), jy - Math.round(r - 1), K); R.rect(jx - Math.round(0.6 * s), jy - Math.round(r + 1.4 * s), jx + Math.round(1.2 * s), jy - Math.round(r), hex('#8a5a36'));
  R.rect(jx - Math.round(2 * s), jy - Math.round(r + 3 * s), jx + Math.round(2.6 * s), jy - Math.round(r + 2 * s), L.bl);
  for (let a = -1.2; a <= 1.2; a += 0.2) R.pset(Math.round(jx + r + 1.5 * s + Math.cos(a) * 2 * s), Math.round(jy - 0.5 * s + Math.sin(a) * 2.4 * s), K);
}

// la farola de gas: poste de hierro, el farol de cristal y su luz (en la calle de 1862 y de 1885)
function a_farola(R, x, suelo, t, enc = true) {
  const L = a_L, K = C.k;
  R.rect(x - 1, suelo - 40, x + 1, suelo, K); R.pset(x, suelo - 39, C.hierroL); R.rect(x - 3, suelo - 3, x + 3, suelo, K); R.rect(x - 2, suelo - 22, x + 2, suelo - 21, K);
  R.rect(x - 4, suelo - 50, x + 4, suelo - 41, K); R.rect(x - 3, suelo - 49, x + 3, suelo - 42, enc ? (Math.sin(t * 11 + x) > 0.85 ? L.luzS : L.luz) : L.vidL); R.rect(x, suelo - 49, x, suelo - 42, K);
  R.poligono([[x - 6, suelo - 50], [x + 6, suelo - 50], [x, suelo - 55]], K); R.pset(x, suelo - 56, K);
}

function a_lyCalle(R, t, o) {
  const noche = !!o.noche, sold = !!o.soldados && !noche, nieve = o.nieve ?? (!noche && !sold), L = a_L, K = C.k;
  const m = a_fondo(R, `calle|${noche}|${sold}|${nieve}`, (mk) => a_calleFondo(R, { noche, sold, nieve }, mk));
  // el cielo: nubes de tres tonos a tres velocidades y cuervos (de noche, estrellas que titilan y nubes oscuras)
  if (noche) {
    for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 7) * 320), y = Math.round(h(k, 2, 7) * 60); if (m[y * 320 + x] && Math.sin(t * 2.3 + k * 1.7) > 0.6) { R.pset(x, y, L.blL); if (k % 4 === 0) { R.pset(x - 1, y, L.c2); R.pset(x + 1, y, L.c2); } } }
    a_nubes(R, t, m, [[30, 40, 40, 2.2, 1], [220, 30, 30, 1.1, 2]], [L.noche3, hex('#283462'), L.noche1]);
  } else {
    const tonos = sold ? [L.nL, hex('#dfe8f4'), hex('#b4c4dc')] : [L.nL, L.nM, L.nS];
    a_nubes(R, t, m, [[10, 20, 46, 1.3, 1], [150, 30, 36, 2.1, 2], [260, 16, 54, 0.8, 3], [90, 46, 26, 3.0, 4], [330, 40, 30, 2.6, 5]], tonos);
    a_cuervos(R, t, 24, m, sold ? 2 : 3);
  }
  // el humo de las chimeneas (la posada, el almacén y las casas de la colina)
  const hc = noche ? [hex('#3a4466'), hex('#2a3454')] : [L.nM, L.nS];
  a_humo(R, 208, 28, t, hc[0], hc[1], 30); a_humo(R, 266, 28, t + 1.7, hc[0], hc[1], 26); a_humo(R, 106, 52, t + 0.8, hc[0], hc[1], 22, m);
  for (const [x, y] of [[150, 70], [176, 66], [86, 60]]) a_humo(R, x, y, t + x, hc[0], hc[1], 10, m);
  // el río: brillos que corren, la barca de tabaco que cruza y (de noche) el reflejo de la luna
  R.recorte([120, 86, 193, 99]);
  for (let k = 0; k < 14; k++) { const y = 87 + Math.floor(h(k, 1, 9) * 12), x = 120 + ((h(k, 2, 9) * 74 + t * (3 + (k % 3))) % 74); R.linea(Math.round(x), y, Math.round(x) + 2 + (k % 3), y, noche ? L.noche3 : L.c3); }
  if (noche) for (let y = 87; y < 99; y++) { const w = 2 + ((y * 3 + Math.floor(t * 4)) % 4); if ((y + Math.floor(t * 3)) % 2) R.linea(186 - w, y, 186 + w - 3, y, y % 3 ? L.luz : L.luzL); }
  if (!noche) a_bateau(R, 100 + ((t * 5) % 130), 96, t, 1);
  R.recorte(null);
  // el puente cubierto: gente (o soldados) que pasa
  R.recorte([120, 70, 193, 84]);
  if (sold) for (let k = 0; k < 7; k++) a_gente(R, 110 + ((t * 6 + k * 7) % 100), 84, t, { dir: 1, anda: true, abrigo: L.gris, gorra: L.grisS });
  else if (!noche) { a_gente(R, 194 - ((t * 4) % 90), 84, t, { dir: -1, anda: true, abrigo: L.mS }); a_gente(R, 120 + ((t * 3 + 40) % 90), 84, t, { dir: 1, anda: true, abrigo: hex('#5a3a4a'), carga: true }); }
  R.recorte(null);
  // el muelle y el callejón: una carreta de bueyes cargada (o la de suministros) y gente que sube y baja
  R.recorte([120, 90, 193, 145]);
  if (sold) { a_carreta(R, 106 + ((t * 7) % 110), 105, t, 1, { toldo: true }); for (let k = 0; k < 6; k++) { const u = ((t * 0.09 + k * 0.1) % 1); a_gente(R, 136 + u * 22, 140 - u * 34, t, { dir: 1, anda: true, abrigo: L.gris, gorra: L.grisS }); } }
  else if (!noche) { a_carreta(R, 210 - ((t * 5) % 120), 105, t, -1); const u = (t * 0.06) % 1; a_gente(R, 170 - u * 14, 108 + u * 32, t, { dir: -1, anda: true, abrigo: hex('#4a3a5a') }); }
  R.recorte(null);
  // la barrica que cuelga de la polea del almacén y se mece
  { const a = Math.sin(t * 1.1) * 0.12, px = 31, py = 54, len = 36, bx = Math.round(px + Math.sin(a) * len), by = Math.round(py + Math.cos(a) * len);
    R.linea(px, py, bx, by - 13, L.mD); a_barrica(R, bx, by, 0.8); if (nieve) R.rect(bx - 3, by - 13, bx + 3, by - 13, L.nv); }
  // el letrero de la jarra
  a_letrero(R, 181, 94, t, 1, sold ? 0.6 : 1);
  if (sold) { // banderines rojos y blancos colgados del porche, que ondean
    for (let k = 0; k < 13; k++) { const x = 198 + k * 6, y = 103 + Math.round(Math.sin(k / 12 * Math.PI) * 4), fl = Math.round(Math.sin(t * 5 + k) * 1);
      R.poligono([[x, y], [x + 5, y], [x + 2 + fl, y + 5]], k % 2 ? L.bl : C.rojo); R.pset(x + 2 + fl, y + 5, K); }
  }
  // las ventanas bajas de la posada: sombras de huéspedes que pasan por dentro
  if (!noche) { R.recorte([247, 112, 263, 132]); for (let k = 0; k < 2; k++) { const x = 236 + ((t * (6 + k * 3) + k * 20) % 44); R.disco(x, 118, 2.5, L.luzD); R.rect(x - 4, 121, x + 4, 132, L.luzD); } R.recorte(null); }
  // de noche: la ventana alta encendida con el hombre que escribe, y el halo de las farolas
  let ventana = null;
  if (noche) {
    ventana = [251, 75];
    R.recorte([242, 66, 260, 84]); a_degradado(R, 242, 66, 260, 84, [L.luzL, L.luz, L.luzS]);
    const e = Math.sin(t * 3) * 0.5 + 0.5, b = Math.round(Math.sin(t * 0.7)); R.disco(247, 72 + b, 3, L.luzD); R.rect(243, 75 + b, 251, 84, L.luzD); R.rect(250, 78, 260, 79, L.luzD);
    R.linea(250, 77 + b, 253 + Math.round(e * 3), 78, L.luzD); R.linea(253 + Math.round(e * 3), 78, 255 + Math.round(e * 3), 74, L.luzD); R.disco(258, 76, 1.5, L.luzD);
    R.rect(251, 65, 252, 84, L.bl); R.rect(242, 75, 260, 75, L.bl); R.recorte(null);
    a_resplandor(R, 251, 75, 26, L.luz, 0.35, t);
    for (const fx of [16, 188, 306]) { a_resplandor(R, fx, 104, 30, L.luz, 0.4, t); a_resplandor(R, fx, 151, 22, L.luz, 0.3, t, [0, 143, 319, 179]); a_llama(R, fx, 104, t, 1); }
    a_gato(R, 111, 121, t, -1, hex('#3a3a46'));
  }
  // un perro trota por la calle de vez en cuando
  if (!noche) { const u = (t % 14) / 14; a_perro(R, -20 + u * 380, 168, t, 1); }
  else { const u = (t % 20) / 20; if (u > 0.5) a_gato(R, 300 - (u - 0.5) * 2 * 100, 166, t, -1, hex('#2a2a34')); }
  // la nieve que cae
  if (nieve) a_copos(R, t, 70);
  return { suelo: 150, libre: [30, 196], puerta: [221, 146], escalones: [204, 238], porche: [196, 278], ventana, ventanaRect: [240, 64, 262, 86], rio: [120, 86, 193, 99], callejon: [120, 194], letrero: [181, 104] };
}

// el fondo fijo de la calle (v.noche, v.sold, v.nieve), en el búfer
function a_calleFondo(R, v, mk) {
  const L = a_L, K = C.k, nv = v.nieve, prim = v.sold;
  // el cielo tramado (marca la máscara)
  a_degradado(R, 0, 0, 319, 90, prim ? [L.v0, L.v1, L.v2, L.v3] : [L.c0, L.c1, L.c2, L.c3, L.c4], mk);
  // las colinas de la otra orilla: dos lomas, nieve o hierba, árboles, casas y la iglesia
  const r1 = (x) => Math.round(60 + 5 * Math.sin(x * 0.021 + 0.7) + 3 * Math.sin(x * 0.063 + 2) + 1.5 * Math.sin(x * 0.17));
  const r2 = (x) => Math.round(74 + 3 * Math.sin(x * 0.04 + 3) + 2 * Math.sin(x * 0.11));
  for (let x = 0; x < 320; x++) {
    for (let y = r1(x); y <= 86; y++) { mk[y * 320 + x] = 0; const u = (y - r1(x)) / 26; let c = a_bay(x, y) < u ? L.col1 : L.col0;
      if (nv && h(x >> 1, y >> 1, 5) < 0.55 - u * 0.5) c = a_bay(x, y) < 0.5 ? L.nvS : L.nv; if (prim) c = a_bay(x, y) < u ? L.colVS : L.colV; R.pset(x, y, c); }
    for (let y = r2(x); y <= 86; y++) { R.pset(x, y, prim ? (a_bay(x, y) < 0.5 ? L.colVS : hex('#46603e')) : nv ? (h(x >> 1, y, 6) < 0.4 ? L.nvS : L.col2) : L.col2); }
    R.pset(x, r1(x), prim ? L.colVL : nv ? L.nv : L.c3);
  }
  for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 3) * 320), y = r1(x) + 2 + Math.round(h(k, 2, 3) * 20); if (y > 84) continue; const pino = h(k, 3, 3) < 0.4;
    if (pino) { R.rect(x, y - 3, x, y, L.col2); R.rect(x - 1, y - 1, x + 1, y - 1, prim ? L.colVS : hex('#4a5a5e')); R.pset(x, y - 3, prim ? L.colVS : hex('#4a5a5e')); }
    else { R.rect(x, y - 3, x, y, L.col2); R.pset(x - 1, y - 3, L.col2); R.pset(x + 1, y - 2, L.col2); if (prim) R.disco(x, y - 3, 1.6, L.colVL); } }
  for (const [x, ladr] of [[72, 0], [92, 1], [128, 0], [146, 1], [176, 0], [186, 1], [240, 0], [300, 1]]) { const y = r1(x) + 8;
    R.rect(x - 3, y - 3, x + 3, y, K); R.rect(x - 2, y - 2, x + 2, y, ladr ? C.ladrillo : L.bl); R.rect(x - 4, y - 5, x + 4, y - 3, K); R.rect(x - 3, y - 5, x + 3, y - 4, nv ? L.nv : L.pz); R.pset(x + 1, y - 1, L.luz); R.rect(x + 2, y - 7, x + 2, y - 5, K); }
  { const x = 160, y = r1(x) + 10; R.rect(x - 5, y - 7, x + 5, y, K); R.rect(x - 4, y - 6, x + 4, y, L.bl); R.rect(x + 2, y - 6, x + 4, y, L.blS); R.rect(x - 1, y - 4, x, y - 2, L.vid);
    R.rect(x - 2, y - 14, x + 2, y - 7, K); R.rect(x - 1, y - 13, x + 1, y - 7, L.bl); R.poligono([[x - 3, y - 14], [x + 3, y - 14], [x, y - 23]], K); R.poligono([[x - 2, y - 14], [x + 2, y - 14], [x, y - 21]], L.blS); R.pset(x, y - 24, L.laton); R.poligono([[x - 6, y - 7], [x + 6, y - 7], [x, y - 11]], K); R.poligono([[x - 5, y - 7], [x + 5, y - 7], [x, y - 10]], nv ? L.nv : L.pz); }
  // el río
  for (let y = 86; y <= 99; y++) for (let x = 100; x < 210; x++) { mk[y * 320 + x] = 0; const u = (y - 86) / 13; let c = a_bay(x, y) < u ? C.rio : L.rioS; if (y < 88) c = L.rioD; if (h(x >> 2, y, 11) < 0.08) c = C.rioL; R.pset(x, y, c); }
  if (nv) for (let k = 0; k < 10; k++) { const x = 118 + Math.round(h(k, 1, 12) * 76), y = k % 2 ? 88 : 97, w = 2 + Math.round(h(k, 2, 12) * 5); R.rect(x, y, x + w, y, L.nv); R.rect(x + 1, y + 1, x + w - 1, y + 1, L.nvS); }
  // el puente cubierto sobre pilas de piedra
  for (const px of [130, 158, 186]) { R.rect(px - 3, 84, px + 3, 99, K); a_piedras(R, px - 2, 85, px + 2, 99, px, [L.pd, L.pdS, L.pdL, L.pdD]); R.rect(px - 3, 98, px + 3, 99, L.nM); }
  R.rect(96, 74, 224, 78, K); R.rect(97, 75, 223, 77, L.pz); R.rect(97, 75, 223, 75, nv ? L.nv : L.pzL);
  R.rect(98, 78, 222, 85, K); a_tablasV(R, 99, 79, 221, 84, 2, [L.m, L.mS, L.mL, L.mD], 4); for (let x = 104; x < 220; x += 11) R.rect(x, 80, x + 3, 82, L.mD); R.rect(98, 85, 222, 85, L.mD);
  // la orilla de acá: el muelle de piedra, el camino, un cobertizo y barricas esperando la barca
  R.rect(110, 99, 210, 101, K); for (let x = 110; x < 210; x += 5) R.rect(x, 100, x + 3, 100, L.pdL);
  for (let y = 102; y <= 107; y++) for (let x = 110; x < 210; x++) R.pset(x, y, nv && h(x >> 1, y, 13) < 0.6 ? (a_bay(x, y) < 0.3 ? L.nvS : L.nv) : a_bay(x, y) < 0.5 ? L.barro : L.barroS);
  R.rect(122, 92, 146, 102, K); a_tablasV(R, 123, 94, 145, 102, 3, [L.mS, L.mD, L.m, L.mD], 9); R.poligono([[120, 94], [148, 94], [143, 88], [125, 88]], K); R.poligono([[121, 93], [147, 93], [142, 89], [126, 89]], nv ? L.nv : L.pz); R.rect(131, 96, 136, 102, L.mD);
  for (const [x, y] of [[170, 106], [176, 106], [182, 106], [173, 99], [179, 99]]) a_barrica(R, x, y, 0.45);
  // el callejón que baja al río: barro con rodadas que se juntan en la distancia, nieve a los lados y pisadas
  for (let y = 107; y <= 142; y++) { const u = (y - 107) / 35; for (let x = 118; x <= 196; x++) { let c = a_bay(x, y) < u ? L.barro : L.barroS;
    const dl = Math.abs(x - (157 - 4 - u * 14)), dr = Math.abs(x - (157 + 4 + u * 14)); if (dl < 0.6 + u || dr < 0.6 + u) c = L.barroS;
    if (nv) { const rut = Math.min(dl, dr), pis = Math.abs(x - 157) < 2 + u * 7; c = a_bay(x, y) < 0.2 + (x < 126 || x > 188 ? 0.3 : 0) ? L.nvS : L.nv;
      if (pis) c = a_bay(x, y) < 0.45 ? L.nvS : L.nvD; if (rut < 0.6 + u) c = L.barroS; else if (rut < 1.4 + u * 1.5) c = a_bay(x, y) < 0.5 ? L.barro : L.nvD; if (h(x, y, 14) < 0.02) c = L.nvD; }
    if (!nv && h(x, y, 15) < 0.04) c = L.paja; R.pset(x, y, c); } }
  for (let k = 0; k < 14; k++) { const y = 112 + k * 2, x = 150 + (k % 2) * 4 + Math.round(Math.sin(k) * 2); R.pset(x, y, nv ? L.nvD : L.barroS); }
  // ── el almacén 1 (x 0–62), con frontón ──
  const enFr = (x, y) => y >= 62 || (y >= 46 && Math.abs(x - 31) <= (y - 46) * 2);
  R.poligono([[-2, 63], [31, 44], [64, 63]], K);
  a_ladrillos(R, 0, 46, 62, 142, 1, enFr);
  for (let i = 0; i <= 31; i++) { const y = 46 + Math.floor(i / 2); R.rect(31 - i - 1, y, 31 - i, y + 1, L.bl); R.rect(31 + i, y, 31 + i + 1, y + 1, L.bl); if (nv) { R.pset(31 - i, y - 1, L.nv); R.pset(31 + i, y - 1, L.nv); } }
  R.rect(0, 62, 62, 64, K); R.rect(0, 62, 62, 63, L.bl); R.rect(0, 64, 62, 64, L.blS);
  for (let x = 2; x < 62; x += 5) { R.rect(x, 65, x, 66 + (x % 3), L.nvS); }
  // la viga de la polea y la puerta del sobrado
  R.rect(28, 50, 34, 54, K); R.rect(29, 51, 33, 53, L.mS); R.disco(31, 54, 2, K); R.pset(31, 54, C.hierroL);
  R.rect(23, 66, 39, 88, K); a_tablasV(R, 24, 67, 38, 87, 3, [L.m, L.mS, L.mL, L.mD], 2); R.rect(24, 76, 38, 77, L.mD); R.rect(22, 88, 40, 89, L.pdL);
  // las ventanitas con postigos
  for (const wx of [4, 47]) { a_ventana(R, wx, 72, wx + 10, 86, { cols: 2 }); }
  // el portón en arco: dovelas, las dos hojas (una abierta) y dentro, en penumbra, barricas
  for (let y = 98; y <= 142; y++) for (let x = 12; x <= 50; x++) { const d = Math.hypot(x - 31, (y - 117) * 1.0); if (y < 117 && d > 19) continue; if (y < 117 && d > 16) { R.pset(x, y, (Math.round(Math.atan2(y - 117, x - 31) * 9) & 1) ? C.ladrilloS : L.ladL); continue; } R.pset(x, y, L.mD); }
  for (let y = 101; y <= 142; y++) for (let x = 15; x <= 47; x++) { const d = Math.hypot(x - 31, y - 117); if (y < 117 && d > 16) continue; if (x < 31) R.pset(x, y, ((x - 15) % 4 === 3) ? L.mD : (h(x, y >> 2, 16) < 0.15 ? L.mS : L.m)); }
  for (const y of [110, 134]) { R.rect(16, y, 30, y + 1, K); R.rect(17, y, 28, y, C.hierroL); }
  R.rect(31, 101, 31, 142, K); for (const [x, y] of [[38, 134], [44, 136]]) a_barrica(R, x, y + 6, 0.7);
  R.rect(12, 142, 50, 143, L.pd);
  // el zócalo de piedra
  R.rect(0, 136, 62, 142, K); a_piedras(R, 0, 137, 11, 142, 3); a_piedras(R, 51, 137, 62, 142, 4);
  // ── el almacén 2 (x 62–120): tejado de pizarra, cornisa, el letrero pintado y el portón de tablas ──
  R.rect(62, 62, 122, 75, K);
  for (let y = 63; y <= 74; y++) for (let x = 63; x <= 121; x++) { const f = Math.floor((y - 63) / 3), off = (f & 1) * 3; let c = (x + off) % 6 === 0 || (y - 63) % 3 === 2 ? L.pzS : h((x + off) / 6 | 0, f, 17) < 0.3 ? L.pzL : L.pz; if (nv && y < 69 - (h(x >> 2, 0, 18) * 3 | 0)) c = (y === 63 || a_bay(x, y) > 0.2) ? L.nv : L.nvS; R.pset(x, y, c); }
  R.rect(100, 50, 110, 64, K); a_ladrillos(R, 101, 52, 109, 64, 5); R.rect(99, 49, 111, 51, K); R.rect(100, 50, 110, 50, nv ? L.nv : L.pdL);
  a_ladrillos(R, 62, 75, 121, 142, 6);
  R.rect(62, 75, 121, 78, K); R.rect(62, 75, 121, 76, L.bl); for (let x = 63; x < 121; x += 3) R.pset(x, 77, L.blS); if (nv) for (let x = 64; x < 120; x += 4) R.rect(x, 79, x, 80 + (x % 3), L.nvS);
  // el letrero pintado en el muro: una hoja de tabaco y una barrica, desvaídos (sin letras)
  R.rect(66, 82, 100, 100, hex('#c8b896')); for (let y = 82; y <= 100; y++) for (let x = 66; x <= 100; x++) if (h(x >> 1, y >> 1, 19) < 0.18) R.pset(x, y, hex('#a89678'));
  R.rect(66, 82, 100, 82, L.blS); R.rect(66, 100, 100, 100, hex('#8a7a62'));
  R.poligono([[70, 92], [76, 85], [84, 84], [89, 88], [84, 95], [76, 97]], hex('#6a7a3a')); R.linea(70, 92, 88, 88, hex('#4a5a2a')); for (let k = 0; k < 4; k++) R.linea(74 + k * 4, 91 - k, 76 + k * 4, 87 - k, hex('#4a5a2a'));
  a_barrica(R, 94, 98, 0.65);
  R.rect(102, 84, 116, 100, K); a_ventana(R, 104, 86, 114, 99, { cols: 2 });
  R.rect(68, 104, 98, 142, K); a_tablasV(R, 69, 105, 97, 141, 4, [L.m, L.mS, L.mL, L.mD], 3); R.linea(70, 140, 96, 106, L.mS); R.linea(70, 139, 96, 105, L.mL); R.rect(69, 122, 97, 123, L.mD);
  for (const y of [110, 134]) { R.rect(70, y, 82, y + 1, K); R.disco(82, y, 1.3, C.hierroL); } R.rect(83, 120, 85, 125, C.hierro);
  R.rect(62, 136, 121, 142, K); a_piedras(R, 62, 137, 67, 142, 5); a_piedras(R, 99, 137, 121, 142, 6);
  // las barricas apiladas delante del almacén 2
  a_barrica(R, 106, 146, 0.75); a_barrica(R, 117, 146, 0.75); a_barrica(R, 111, 133, 0.72);
  if (nv) { R.rect(102, 133, 110, 134, L.nv); R.rect(113, 133, 121, 134, L.nv); R.rect(107, 120, 115, 121, L.nv); }
  // ── la posada (x 194–320) ──
  R.rect(190, 41, 319, 56, K);
  for (let y = 42; y <= 55; y++) for (let x = 191; x <= 319; x++) { const f = Math.floor((y - 42) / 3), off = (f & 1) * 3; let c = (x + off) % 6 === 0 || (y - 42) % 3 === 2 ? L.pzS : h((x + off) / 6 | 0, f, 20) < 0.3 ? L.pzL : L.pz; if (nv && y < 47 - (h(x >> 2, 1, 21) * 3 | 0)) c = (y === 42 || a_bay(x, y) > 0.25) ? L.nv : L.nvS; R.pset(x, y, x > 276 ? a_mez(c, L.c3, 0.35) : c); }
  for (const cx of [208, 266]) { R.rect(cx - 5, 26, cx + 5, 43, K); a_ladrillos(R, cx - 4, 28, cx + 4, 43, cx); R.rect(cx - 6, 25, cx + 6, 28, K); R.rect(cx - 5, 26, cx + 5, 27, nv ? L.nv : L.pdL); R.rect(cx - 2, 24, cx - 1, 25, L.pdS); R.rect(cx + 1, 24, cx + 2, 25, L.pdS); }
  R.rect(192, 56, 319, 59, K); R.rect(192, 56, 319, 57, L.bl); for (let x = 193; x < 320; x += 3) R.pset(x, 58, L.blS);
  a_ladrillos(R, 194, 60, 319, 146, 7);
  R.rect(194, 60, 195, 146, C.ladrilloS);
  for (const [a, b] of [[204, 222], [240, 262], [284, 302]]) { a_ventana(R, a, 64, b, 86, { contra: true, cortina: a === 284 }); if (nv) R.rect(a - 2, 87, b + 2, 87, L.nv); }
  // el porche: la cornisa con su balaustrada, las columnas blancas, el suelo de tablas y los escalones
  R.rect(194, 102, 280, 110, a_mez(C.ladrillo, K, 0.35));
  R.rect(194, 92, 280, 102, K); R.rect(195, 96, 279, 101, L.bl); R.rect(195, 96, 279, 96, L.blL); R.rect(195, 100, 279, 101, L.blS); for (let x = 196; x < 279; x += 3) R.pset(x, 99, L.blS);
  R.rect(195, 89, 279, 90, L.bl); R.rect(195, 91, 279, 91, L.blS); for (let x = 197; x < 279; x += 5) R.rect(x, 91, x + 1, 95, L.bl); if (nv) R.rect(195, 88, 279, 88, L.nv);
  R.rect(209, 106, 233, 142, K); R.rect(210, 108, 232, 142, a_mez(L.caoba, K, 0.15));
  R.rect(210, 103, 232, 107, L.bl); R.rect(211, 104, 231, 106, L.luz); for (let k = -2; k <= 2; k++) R.linea(221, 106, 221 + k * 5, 104, L.bl);
  for (const [a, b, c2] of [[212, 220, 110], [222, 230, 110], [212, 220, 122], [222, 230, 122], [212, 220, 132], [222, 230, 132]]) a_cuarteron(R, a, c2, b, c2 + 8, L.caoba, L.caobaS, L.caobaL);
  R.disco(229, 127, 1.3, L.laton); R.pset(229, 126, L.latonL);
  R.rect(205, 112, 207, 120, K); R.rect(205, 113, 207, 119, L.luz); R.rect(204, 111, 208, 111, K);
  a_ventana(R, 245, 112, 265, 134, { luz: true });
  a_ventana(R, 285, 112, 305, 134, { luz: true, contra: true });
  for (const cx of [201, 239, 275]) { R.rect(cx - 3, 102, cx + 3, 142, K); R.rect(cx - 2, 104, cx - 2, 141, L.blL); R.rect(cx - 1, 104, cx + 1, 141, L.bl); R.rect(cx + 1, 104, cx + 2, 141, L.blS); R.rect(cx - 4, 102, cx + 4, 104, K); R.rect(cx - 3, 102, cx + 3, 103, L.bl); R.rect(cx - 4, 139, cx + 4, 142, K); R.rect(cx - 3, 140, cx + 3, 141, L.blS); }
  R.rect(194, 142, 282, 146, K); a_madera(R, 195, 143, 281, 145, L.m, L.mS, L.mL, L.mD, 3, 3);
  R.rect(204, 146, 238, 148, K); R.rect(205, 146, 237, 147, L.pdL); R.rect(202, 148, 240, 150, K); R.rect(203, 148, 239, 149, L.pd);
  R.rect(282, 140, 319, 146, K); a_piedras(R, 282, 141, 319, 146, 8); for (const gx of [292, 310]) { R.rect(gx, 141, gx + 6, 145, K); for (let x = gx + 1; x < gx + 6; x += 2) R.rect(x, 142, x, 144, C.hierro); }
  // el banco del porche y el ménsula del letrero
  R.rect(244, 136, 270, 138, K); R.rect(245, 136, 269, 137, L.mL); R.rect(246, 138, 247, 142, K); R.rect(267, 138, 268, 142, K);
  R.rect(171, 93, 194, 94, K); R.linea(178, 94, 194, 101, K); R.pset(171, 92, K);
  // la acera de ladrillo en espiga, el bordillo y la calle de barro con rodadas, charcos helados, paja y nieve
  for (let y = 143; y <= 152; y++) for (let x = 0; x < 320; x++) { if (y < 147 && x > 193 && x < 283) continue; if (x >= 118 && x <= 196 && y < 145) continue;
    const a = ((x + y) % 8 + 8) % 8, b = ((x - y) % 8 + 8) % 8, u = Math.floor((x + y) / 8) + Math.floor((x - y) / 8); let c = (u & 1) ? (a === 0 ? L.mortS : C.ladrilloS) : (b === 0 ? L.mortS : C.ladrillo);
    if (h(x >> 2, y >> 1, 22) < 0.08) c = L.ladL; if (nv && (h(x, y, 23) < 0.3 || (y > 150 && a_bay(x, y) < 0.6))) c = (y & 1) ? L.nv : L.nvS; R.pset(x, y, c); }
  R.rect(0, 153, 319, 155, K); R.rect(0, 153, 319, 153, L.pdL); R.rect(0, 154, 319, 154, L.pd); for (let x = 9; x < 320; x += 17) R.pset(x, 154, L.pdD);
  for (let y = 156; y <= 179; y++) { const u = (y - 156) / 24; for (let x = 0; x < 320; x++) {
    const d = Math.min(Math.abs(y - 162 - Math.sin(x * 0.03) * 0.8), Math.abs(y - 172.5 - Math.sin(x * 0.025 + 1) * 1.2) * 0.8);
    let c = a_bay(x, y) < u * 0.6 ? L.barroL : L.barro; if (d < 1.3) c = L.barroS; if (h(x, y >> 1, 24) < 0.07) c = L.barroS; if (!nv && h(x, y, 25) < 0.03) c = L.paja;
    if (nv) { c = a_bay(x, y) < 0.18 + (y < 158 ? 0 : 0.1) ? L.nvS : L.nv; if (d < 1.1) c = L.barroS; else if (d < 2.4) c = a_bay(x, y) < 0.5 ? L.barro : L.nvD; else if (d < 3.4 && a_bay(x, y) < 0.4) c = L.nvS;
      if (h(x >> 1, y >> 1, 26) < 0.025) c = L.nvD; }
    R.pset(x, y, c); } }
  for (const [x, w] of [[60, 14], [176, 18], [262, 12]]) { R.rect(x, 172, x + w, 174, L.barroS); R.rect(x + 1, 172, x + w - 1, 173, nv ? L.hielo : C.rioL); R.rect(x + 3, 172, x + 6, 172, L.nv); }
  // las farolas (1862 y 1885)
  if (v.sold || v.noche) for (const fx of [16, 188, 306]) a_farola(R, fx, 152, 0, false);
  // la noche (1885): todo menos el cielo se oscurece hacia el azul; el cielo, liso de noche, con estrellas y luna
  if (v.noche) {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (mk[y * 320 + x]) continue; const c = R.pget(x, y); R.pset(x, y, a_mez(a_mez(c, K, 0.55), L.noche2, 0.3)); }
    for (let y = 0; y <= 90; y++) for (let x = 0; x < 320; x++) if (mk[y * 320 + x]) { const u = y / 90; R.pset(x, y, a_bay(x, y) < u * 2 % 1 ? (u < 0.5 ? L.noche1 : L.noche3) : (u < 0.5 ? L.noche0 : L.noche2)); }
    for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 5, 8) * 320), y = Math.round(h(k, 6, 8) * 64); if (mk[y * 320 + x] && !(x > 276 && y < 46)) R.pset(x, y, k % 3 ? L.c3 : L.blL); }
    R.disco(186, 26, 9, L.noche3); R.disco(186, 26, 7, hex('#f0eedc')); R.disco(184, 24, 2, hex('#d8d6c4')); R.disco(189, 29, 1.5, hex('#d8d6c4')); R.pset(183, 21, L.blL);
    for (const fx of [16, 188, 306]) a_farola(R, fx, 152, 0, true);
    for (const [a, b] of [[204, 222], [284, 302]]) for (let y = 66; y <= 84; y++) for (let x = a + 2; x <= b - 2; x++) R.pset(x, y, (x + y) % 9 === 0 ? L.noche3 : L.noche0);
  }
}

function a_lyPuerta(R, t, o) {
  const L = a_L, K = C.k, nieve = o.nieve !== false;
  const m = a_fondo(R, `puerta|${nieve}`, (mk) => a_puertaFondo(R, nieve, mk));
  // fuera, a la izquierda: nubes, nieve que cae y un vecino que pasa con un fardo
  a_nubes(R, t, m, [[0, 14, 26, 1.2, 7]], [L.nL, L.nM, L.nS]);
  R.recorte([0, 0, 33, 145]); const u = (t % 16) / 16; a_gente(R, -10 + u * 56, 130, t, { dir: 1, anda: true, abrigo: hex('#4a3a5a'), carga: true }); if (nieve) a_copos(R, t, 16, false, [0, 0, 33, 145]); R.recorte(null);
  // dentro: la vela del aplique, su luz, y alguien que cruza el fondo del zaguán de vez en cuando
  R.recorte([129, 103, 157, 145]); const w = (t % 11) / 11; if (w < 0.35) { const x = 162 - w / 0.35 * 38; R.disco(x, 116, 2.5, L.luzD); R.rect(x - 3, 119, x + 3, 132, L.luzD); }
  a_llama(R, 150, 113, t, 1); a_resplandor(R, 150, 113, 16, L.luzL, 0.3, t, [129, 103, 157, 145]); R.recorte(null);
  // el farol de la pared, junto a la puerta, y el farol colgado del techo que se mece
  a_llama(R, 116, 111, t, 1); a_resplandor(R, 116, 110, 18, L.luz, 0.22, t);
  { const a = Math.sin(t * 1.2) * 0.12, fx = Math.round(222 + Math.sin(a) * 12), fy = 72; R.linea(222, 58, fx, fy - 7, K);
    R.rect(fx - 3, fy - 7, fx + 3, fy + 3, K); R.rect(fx - 2, fy - 5, fx + 2, fy + 2, L.luz); R.rect(fx, fy - 5, fx, fy + 2, K); R.poligono([[fx - 5, fy - 7], [fx + 5, fy - 7], [fx, fy - 11]], K); R.rect(fx - 4, fy + 3, fx + 4, fy + 4, K); a_llama(R, fx, fy + 1, t, 0.8); a_resplandor(R, fx, fy, 24, L.luz, 0.2, t); }
  // el letrero de la jarra, colgado del techo del porche
  a_letrero(R, 84, 58, t, 1.1, 0.6);
  // el buzón: la tapa se abre con o.buzon
  const b = Math.max(0, Math.min(1, o.buzon ?? 0)), bx0 = 230, bx1 = 246, by = 116;
  R.rect(bx0, by, bx1, by + 16, K); a_tablasV(R, bx0 + 1, by + 1, bx1 - 1, by + 15, 4, [L.m, L.mS, L.mL, L.mD], 30); R.rect(bx0 + 1, by + 11, bx1 - 1, by + 11, L.mD); R.rect(237, by + 13, 239, by + 14, L.laton);
  R.rect(bx0 + 3, by + 4, bx1 - 3, by + 5, K);
  const lh = b < 0.05 ? 0 : Math.round(3 + b * 8);
  if (!lh) { R.rect(bx0 - 1, by - 2, bx1 + 1, by + 2, K); R.rect(bx0, by - 1, bx1, by, L.mL); R.rect(bx0, by + 1, bx1, by + 1, L.mS); R.rect(236, by - 1, 240, by - 1, L.laton); }
  else { R.poligono([[bx0 - 1, by + 1], [bx1 + 1, by + 1], [bx1 + 1, by + 1 - lh], [bx0 - 1, by + 1 - lh]], K); R.poligono([[bx0, by], [bx1, by], [bx1, by + 2 - lh], [bx0, by + 2 - lh]], a_mez(L.m, K, 0.25)); R.rect(236, by + 1 - lh, 240, by + 2 - lh, L.laton); R.rect(bx0 + 1, by + 1, bx1 - 1, by + 3, hex('#1e140e')); }
  // el gato dormido en el banco
  a_gato(R, 186, 137, t, 1, hex('#8a8a92'));
  return { suelo: 150, libre: [48, 228], puerta: [143, 146], hueco: [129, 103, 157, 146], buzon: [238, 124], ranura: [238, by + 4], banco: [176, 214, 138], ventana: [180, 98, 210, 128], farol: [222, 72] };
}

function a_puertaFondo(R, nieve, mk) {
  const L = a_L, K = C.k;
  // fuera, a la izquierda: el cielo, el almacén de enfrente, la calle nevada y la barandilla del porche
  a_degradado(R, 0, 0, 33, 44, [L.c0, L.c1, L.c2, L.c3], mk);
  R.rect(0, 44, 33, 44, K); a_ladrillos(R, 0, 45, 33, 122, 31); R.rect(4, 58, 18, 80, K); a_ventana(R, 5, 59, 17, 79, { cols: 2 }); R.rect(22, 92, 33, 122, K); a_tablasV(R, 23, 93, 33, 122, 4, [L.m, L.mS, L.mL, L.mD], 31);
  for (let y = 44; y <= 50; y++) for (let x = 0; x <= 33; x++) if (nieve && y === 44) R.pset(x, y - 1, L.nv);
  for (let y = 123; y <= 145; y++) for (let x = 0; x <= 33; x++) R.pset(x, y, nieve ? (a_bay(x, y) < 0.2 ? L.nvS : L.nv) : (a_bay(x, y) < 0.5 ? L.barro : L.barroS));
  for (let y = 45; y <= 145; y++) for (let x = 0; x <= 33; x++) a_tin(R, x, y, L.c3, 0.18);
  R.rect(0, 128, 34, 131, K); R.rect(0, 128, 34, 129, L.bl); for (let x = 2; x < 34; x += 5) { R.rect(x, 131, x + 2, 146, K); R.rect(x + 1, 131, x + 1, 146, L.bl); } R.rect(0, 142, 34, 145, K); R.rect(0, 143, 34, 143, L.blS);
  if (nieve) R.rect(0, 127, 34, 127, L.nv);
  // el piso de arriba: ladrillo con dos ventanas y la balaustrada del balcón sobre el porche (tranquilo arriba a la derecha)
  a_ladrillos(R, 34, 0, 319, 37, 34);
  for (let y = 0; y <= 46; y++) for (let x = 268; x < 320; x++) a_tin(R, x, y, a_mez(C.ladrillo, L.c2, 0.2), 0.45);
  for (const [a, b2] of [[182, 204], [236, 258]]) { a_ventana(R, a, 6, b2, 30, { contra: true, cortina: a === 236 }); if (nieve) R.rect(a - 2, 31, b2 + 2, 31, L.nv); }
  R.rect(34, 30, 319, 31, K); R.rect(34, 30, 319, 30, L.bl); for (let x = 36; x < 320; x += 5) { R.rect(x, 32, x + 1, 37, L.bl); R.pset(x + 1, 37, L.blS); } if (nieve) R.rect(34, 29, 319, 29, L.nv);
  // el alero del porche: la cornisa blanca con dentículos y el techo de tablas azul pálido
  R.rect(28, 38, 319, 48, K); R.rect(29, 39, 319, 42, L.bl); R.rect(29, 39, 319, 39, L.blL); for (let x = 30; x < 320; x += 4) R.rect(x, 44, x + 1, 46, L.bl); R.rect(29, 47, 319, 47, L.blS);
  for (let y = 49; y <= 57; y++) for (let x = 34; x < 320; x++) R.pset(x, y, (y % 3 === 1) ? L.azulPS : L.azulP);
  // el muro de la fachada bajo el porche, en sombra
  a_ladrillos(R, 34, 58, 319, 146, 33); for (let y = 58; y <= 70; y++) for (let x = 34; x < 320; x++) if ((x + y) % 2 === 0) a_tin(R, x, y, K, 0.25 - (y - 58) * 0.018);
  // las ventanas de abajo: la de la izquierda en penumbra, la de la derecha encendida; el banco
  a_ventana(R, 62, 98, 92, 128, { contra: true, cortina: true });
  a_ventana(R, 180, 98, 210, 128, { luz: true, contra: true });
  R.rect(174, 136, 216, 139, K); a_madera(R, 175, 137, 215, 138, L.m, L.mS, L.mL, L.mD, 5, 2); R.rect(176, 128, 214, 130, K); R.rect(177, 129, 213, 129, L.mL);
  for (const x of [176, 194, 213]) { R.rect(x, 130, x + 1, 136, K); R.rect(x, 139, x + 1, 148, K); }
  // la puerta abierta: el marco con el montante en abanico y el zaguán (pared cálida, escalera, cuadro, perchero)
  R.rect(122, 90, 164, 147, K); R.rect(123, 91, 163, 147, L.bl); R.rect(123, 91, 124, 147, L.blL); R.rect(162, 91, 163, 147, L.blS);
  R.rect(127, 92, 159, 101, K); for (let y = 93; y <= 100; y++) for (let x = 128; x <= 158; x++) if (Math.hypot(x - 143, (y - 101) * 2) < 16) R.pset(x, y, L.luz); for (let k = -3; k <= 3; k++) R.linea(143, 101, 143 + k * 5, 93, L.bl); R.rect(127, 101, 159, 102, L.bl);
  a_degradado(R, 129, 103, 157, 132, [L.luzL, L.luz, L.luzS]);
  for (let k = 0; k < 5; k++) { const sx = 146 + k * 3, sy = 130 - k * 6; R.rect(sx, sy, 157, sy + 1, K); R.rect(sx + 1, sy, 157, sy, L.mL); R.rect(sx, sy + 2, sx, sy + 6, L.mS); }
  R.linea(146, 126, 157, 104, L.mD);
  R.rect(132, 108, 140, 115, K); R.rect(133, 109, 139, 114, L.laton); R.rect(134, 110, 138, 113, hex('#7a9aa8')); R.rect(134, 112, 138, 113, hex('#6a8a4a'));
  R.rect(148, 115, 152, 116, L.laton); R.rect(149, 112, 151, 114, C.papel);
  R.rect(130, 118, 131, 119, L.mD); R.rect(130, 120, 134, 130, hex('#3a3046'));
  for (let y = 133; y <= 146; y++) for (let x = 129; x <= 157; x++) R.pset(x, y, a_bay(x, y) < (y - 133) / 14 ? L.m : L.mL);
  R.poligono([[137, 133], [149, 133], [154, 146], [132, 146]], L.alfR); for (let y = 135; y < 146; y += 3) R.linea(137 - (y - 133) * 0.38, y, 149 + (y - 133) * 0.38, y, L.alfO);
  R.poligono([[129, 103], [134, 106], [134, 143], [129, 146]], K); R.poligono([[130, 105], [133, 107], [133, 142], [130, 144]], L.caobaS); R.pset(132, 125, L.laton);
  R.rect(127, 85, 159, 89, a_mez(L.verdeS, K, 0.2)); for (let x = 128; x < 159; x += 2) R.pset(x, 86 + (x % 4 === 0 ? 1 : 0), L.verdeL); R.disco(143, 87, 2, C.rojo);
  // el farol de pared junto a la puerta
  R.rect(115, 102, 117, 104, K); R.rect(112, 105, 120, 115, K); R.rect(113, 106, 119, 114, L.luz); R.rect(116, 106, 116, 114, K); R.poligono([[111, 105], [121, 105], [116, 101]], K);
  // el limpiabarros y la escoba
  R.rect(104, 142, 112, 147, K); R.rect(105, 142, 111, 142, C.hierroL); R.rect(106, 143, 106, 146, C.hierro); R.rect(110, 143, 110, 146, C.hierro);
  R.linea(258, 147, 266, 112, K); R.linea(259, 147, 267, 112, L.mL); R.poligono([[252, 149], [266, 149], [264, 138], [256, 138]], K); R.poligono([[253, 148], [265, 148], [263, 139], [257, 139]], L.paja); for (let x = 255; x < 264; x += 2) R.rect(x, 141, x, 148, hex('#a8843a'));
  // las columnas blancas, en los dos extremos del porche
  for (const [a, b2] of [[33, 45], [284, 296]]) { R.rect(a, 48, b2, 147, K); R.rect(a + 1, 50, a + 3, 146, L.blL); R.rect(a + 4, 50, b2 - 4, 146, L.bl); R.rect(b2 - 3, 50, b2 - 2, 146, L.blS); R.rect(b2 - 1, 50, b2 - 1, 146, L.blD);
    for (const y of [48, 141]) { R.rect(a - 2, y, b2 + 2, y + 5, K); R.rect(a - 1, y + 1, b2 + 1, y + 3, L.bl); R.rect(a - 1, y + 4, b2 + 1, y + 4, L.blS); } }
  R.rect(297, 58, 319, 146, K); a_ladrillos(R, 297, 59, 319, 146, 35); for (let y = 59; y <= 146; y++) for (let x = 297; x < 320; x++) if ((x + y) & 1) a_tin(R, x, y, L.c2, 0.2);
  // el suelo del porche: tablas que corren hacia nosotros, con su junta y vetas; la luz del zaguán; un ventisquero
  for (let y = 147; y <= 179; y++) for (let x = 0; x < 320; x++) { const s = (x - 160) / ((y - 70) / 77); const bi = Math.floor((s + 2000) / 15), fr = ((s + 2000) % 15);
    let c = fr < 1.2 ? L.mD : h(bi, Math.floor(y / 6), 35) < 0.18 ? L.mS : (h(bi, 0, 36) < 0.3 ? L.mL : L.m); if (c !== L.mD && h(x, y, 37) < 0.05) c = L.mS; R.pset(x, y, c); }
  R.rect(0, 146, 319, 147, K);
  for (let y = 147; y <= 179; y++) { const e = (y - 147) * 0.7; for (let x = Math.round(129 - e); x <= 157 + e; x++) if ((x + y) % 2 === 0 || y < 151) a_tin(R, x, y, L.luz, 0.22); }
  if (nieve) for (let x = 0; x < 64; x++) for (let y = 148; y < 180; y++) { const e = y - (150 + x * 0.42 + Math.sin(x * 0.4) * 1.5); if (e > 1.5 || (e > 0 && a_bay(x, y) < 0.5)) R.pset(x, y, e < 3 ? L.nvS : a_bay(x, y) < 0.15 ? L.nvS : L.nv); }
  // el felpudo trenzado delante de la puerta y las pisadas mojadas que llegan desde la calle
  for (let j = -4; j <= 4; j++) for (let i = -17; i <= 17; i++) { const d = (i / 17) ** 2 + (j / 4.5) ** 2; if (d > 1) continue; const r = Math.floor(d * 4); R.pset(143 + i, 154 + j, d > 0.86 ? K : [L.alfR, L.paja, L.alfA, L.alfO][(r + ((i + j * 2) & 1)) % 4]); }
  if (nieve) for (let k = 0; k < 9; k++) { const x = 40 + k * 10, y = 170 - k * 1.6 + (k & 1) * 3; R.rect(Math.round(x), Math.round(y), Math.round(x) + 2, Math.round(y) + 1, a_mez(L.m, L.mD, 0.6)); R.pset(Math.round(x) + 1, Math.round(y), L.nvS); }
  // una mecedora junto a la columna de la derecha, y un barril con un cubo y una pala de nieve
  R.linea(256, 151, 282, 151, K); R.linea(256, 150, 282, 150, L.mS); for (let x = 256; x <= 282; x++) R.pset(x, 151 - Math.round(Math.sin((x - 256) / 26 * Math.PI) * 2), K);
  R.rect(262, 138, 278, 140, K); R.rect(263, 138, 277, 139, L.mL); for (const x of [263, 276]) R.rect(x, 140, x, 149, K); R.rect(276, 116, 278, 140, K); R.rect(277, 117, 277, 139, L.m); for (let y = 120; y < 138; y += 4) R.rect(270, y, 277, y + 1, L.mS); R.rect(262, 130, 264, 138, K); R.rect(262, 128, 270, 130, K);
  a_barrica(R, 60, 150, 0.85); R.rect(54, 130, 66, 133, K); R.rect(55, 131, 65, 132, C.hierroL); R.rect(56, 124, 64, 131, K); R.rect(57, 125, 63, 130, C.hierro); R.linea(56, 124, 60, 120, K); R.linea(64, 124, 60, 120, K);
  R.linea(72, 150, 80, 118, K); R.linea(73, 150, 81, 118, L.mL); R.rect(66, 147, 76, 151, K); R.rect(67, 148, 75, 150, C.hierroL);
}

function a_lyComedor(R, t, o) {
  const L = a_L, K = C.k;
  a_fondo(R, 'comedor', () => a_comedorFondo(R));
  // fuera de las ventanas nieva
  for (const x0 of [116, 154]) a_copos(R, t, 10, false, [x0, 54, x0 + 18, 100]);
  // el fuego, el caldero colgado y su vapor, las velas de la repisa y el resplandor en el suelo y las paredes
  a_fuego(R, 40, 72, 138, t, 14);
  R.linea(56, 111, 56, 117, C.hierro); R.disco(56, 124, 7, K); R.disco(56, 124, 6, hex('#2a2a30')); R.rect(49, 118, 63, 120, K); R.rect(50, 118, 62, 119, C.hierroL); R.disco(53, 122, 1.6, hex('#4a4a56'));
  for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1; R.disco(54 + Math.sin(u * 6 + k) * 3 - u * 4, 115 - u * 18, 1 + u * 2, u < 0.5 ? L.nM : L.nS); }
  a_resplandor(R, 56, 134, 64, L.fuego, 0.32, t, [0, 22, 140, 179]);
  for (const x of [22, 88]) a_llama(R, x, 71, t, 1);
  // la mesa del fondo: los huéspedes sentados que charlan, uno que bebe de su jarra; las velas de la mesa
  const G = [['rizos', tela('#4a5a3a', '#36442a', { H: '#3a2418', h: '#5a3a24' })], ['calvo', tela('#6a3a2a', '#4e2a1e', { W: '#b8bccc' })], ['mujer', tela('#3a4a6a', '#2a3650', { V: '#6a3a1a', H: '#8a5428' })], ['rizos', tela('#7a6a4a', '#5e5036', { H: '#1c1424', h: '#3a3046' })]];
  [106, 126, 150, 170].forEach((x, i) => { const yb = 114 + (i === 1 && Math.sin(t * 2.2) > 0.6 ? -1 : 0); R.busto(G[i][0], G[i][1], x, yb, t + i * 1.3, { rie: i === 2 && Math.sin(t * 1.7) > 0.4 }); });
  { const b = Math.max(0, Math.sin(t * 0.9)); const mx = 181, my = Math.round(125 - b * 6); R.rect(mx - 2, my - 4, mx + 2, my, K); R.rect(mx - 1, my - 3, mx + 1, my - 1, hex('#9aa0aa')); R.pset(mx + 3, my - 2, K); }
  R.rect(98, 126, 198, 129, K); a_madera(R, 99, 126, 197, 128, L.mL, L.m, L.bl, L.mS, 7, 3); R.rect(100, 130, 196, 131, K); R.rect(101, 130, 195, 130, L.mS);
  for (const x of [103, 148, 193]) { R.rect(x - 2, 131, x + 2, 140, K); R.rect(x - 1, 131, x + 1, 139, L.m); R.rect(x - 1, 131, x - 1, 139, L.mL); R.rect(x - 2, 135, x + 2, 135, L.mL); }
  for (let x = 100; x <= 196; x++) if ((x & 1) === 0) { R.pset(x, 140, L.mD); R.pset(x + 1, 141, L.mD); }
  for (const [x, tipo] of [[110, 'plato'], [120, 'vela'], [133, 'jarra'], [143, 'pan'], [158, 'plato'], [166, 'vela'], [190, 'plato']]) {
    if (tipo === 'plato') { R.rect(x - 4, 125, x + 4, 125, K); R.rect(x - 3, 124, x + 3, 124, hex('#a8acb4')); R.rect(x - 2, 123, x + 1, 123, hex('#7a5a3a')); }
    if (tipo === 'vela') { R.rect(x - 2, 124, x + 2, 125, L.laton); R.rect(x - 1, 117, x, 123, C.papel); a_llama(R, x, 116, t, 1); a_resplandor(R, x, 116, 16, L.luz, 0.3, t); }
    if (tipo === 'jarra') { R.rect(x - 3, 117, x + 3, 125, K); R.rect(x - 2, 118, x + 2, 124, hex('#8a5a36')); R.rect(x - 2, 118, x - 1, 124, hex('#b07a4a')); R.pset(x + 4, 120, K); R.pset(x + 4, 122, K); }
    if (tipo === 'pan') { R.disco(x, 123, 3.5, K); R.disco(x, 123, 2.5, hex('#c89a5a')); R.pset(x - 1, 122, hex('#e8c080')); }
  }
  // las llaves del tablero se mecen (falta una: alguien acaba de cogerla)
  for (let k = 0; k < 8; k++) { if (k === 5) continue; const x = 283 + (k % 4) * 6, y = 72 + Math.floor(k / 4) * 16, a = k === 2 ? Math.sin(t * 3) * 2 : 0; R.linea(x, y, Math.round(x + a), y + 6, C.hierro); R.disco(Math.round(x + a), y + 8, 1.5, L.laton); R.pset(Math.round(x + a), y + 8, K); }
  a_perro(R, 104, 147, t, -1, { duerme: true });
  for (const [x, k] of [[110, 0], [186, 1], [214, 2], [240, 3], [266, 4]]) { const d = Math.round(Math.sin(t * 0.9 + k) * 0.8); R.linea(x, 22, x, 26, L.mD);
    for (let i = -2; i <= 2; i++) { R.linea(x, 26, x + i * 2 + d, 38 + Math.abs(i), K); R.linea(x + (i > 0 ? 1 : 0), 27, x + i * 2 + d + (i > 0 ? 1 : 0), 37 + Math.abs(i), i % 2 ? L.tabaco ?? C.tabaco : C.tabacoS); } R.rect(x - 1, 26, x + 1, 27, L.paja); }
  { const a = Math.sin(t * 0.7) * 0.6, cx = 150 + Math.round(a), cy = 40; R.linea(150, 22, cx, cy - 2, K); R.linea(cx - 14, cy, cx, cy - 2, K); R.linea(cx + 14, cy, cx, cy - 2, K);
    R.rect(cx - 15, cy, cx + 15, cy + 2, K); R.rect(cx - 14, cy, cx + 14, cy + 1, L.m); R.rect(cx - 14, cy, cx + 14, cy, L.mL);
    for (const dx of [-12, -4, 4, 12]) { R.rect(cx + dx - 1, cy - 5, cx + dx, cy - 1, C.papel); a_llama(R, cx + dx, cy - 6, t, 0.8); } a_resplandor(R, cx, cy - 4, 30, L.luz, 0.2, t); }
  return { suelo: 150, libre: [96, 196], mostrador: [196, 306, 128], detras: [214, 290, 134], chimenea: [14, 96], fuego: [56, 132], mesa: [100, 196, 126], ventanas: [[112, 50, 138, 104], [150, 50, 176, 104]], libro: [250, 125], campanilla: [222, 123] };
}

function a_comedorFondo(R) {
  const L = a_L, K = C.k;
  // el techo: tablas ahumadas entre las cabezas de las vigas, y la gran viga maestra
  for (let y = 0; y <= 15; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 26 < 5) ? (x % 26 === 4 ? L.mD : hex('#3a2a20')) : (y % 5 === 4 ? hex('#4a3a2e') : (a_bay(x, y) < 0.3 ? hex('#5a4838') : hex('#524232'))));
  R.rect(0, 15, 319, 22, K); a_madera(R, 0, 16, 319, 21, L.mS, L.mD, L.m, K, 40, 6);
  // las paredes encaladas: manchas, grietas y el humo que las oscurece arriba
  for (let y = 23; y <= 117; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 2, y >> 2, 41), u = (y - 23) / 94; let c = v < 0.2 ? L.yesoS : v > 0.88 ? L.yesoL : L.yeso; if (a_bay(x, y) > u + 0.35) c = a_mez(c, L.yesoD, 0.5); if (x > 270 && y < 50) c = a_mez(L.yeso, L.yesoD, 0.25); R.pset(x, y, c); }
  for (const [x, y, n] of [[140, 34, 8], [196, 84, 6], [240, 110, 5]]) for (let k = 0; k < n; k++) R.pset(x + k + (k % 2), y + k, L.yesoD);
  // la moldura y el friso de tablas (a la altura del pecho de los personajes)
  R.rect(0, 117, 319, 120, K); R.rect(0, 118, 319, 118, L.mL); R.rect(0, 119, 319, 119, L.m);
  a_tablasV(R, 0, 121, 319, 139, 7, [L.m, L.mS, L.mL, L.mD], 42); R.rect(0, 137, 319, 139, L.mD);
  // la chimenea de piedra: el pecho, la repisa con velas, platos y jarra, la boca con su dintel y el hogar
  a_piedras(R, 14, 23, 96, 139, 43);
  R.rect(8, 82, 102, 88, K); a_madera(R, 9, 83, 101, 87, L.m, L.mS, L.mL, L.mD, 44, 3); R.rect(8, 88, 102, 89, L.mD);
  for (const x of [22, 88]) { R.rect(x - 2, 79, x + 2, 81, K); R.rect(x - 1, 79, x + 1, 80, L.laton); R.rect(x - 1, 72, x, 78, C.papel); }
  for (const x of [38, 72]) { R.disco(x, 75, 6, K); R.disco(x, 75, 5, hex('#9aa0aa')); R.disco(x, 75, 3, hex('#b8bcc4')); R.pset(x - 2, 72, L.blL); }
  R.rect(52, 72, 58, 81, K); R.rect(53, 73, 57, 80, hex('#8a5a36')); R.rect(53, 73, 54, 80, hex('#b07a4a')); R.pset(59, 75, K); R.pset(59, 77, K);
  R.rect(26, 98, 86, 104, K); R.rect(27, 99, 85, 103, L.pdL); R.rect(27, 103, 85, 103, L.pdS); for (const x of [47, 66]) R.rect(x, 99, x, 103, L.pdS);
  for (let y = 105; y <= 139; y++) for (let x = 30; x <= 82; x++) { const f = Math.floor(y / 3), c = (y % 3 === 2 || (x + (f & 1) * 3) % 6 === 5) ? hex('#1a1210') : hex('#3a2420'); R.pset(x, y, y > 126 ? a_mez(c, L.fuegoS, 0.25) : c); }
  for (let y = 105; y <= 139; y++) { R.rect(30, y, 32, y, hex('#2a1a16')); R.rect(80, y, 82, y, hex('#2a1a16')); }
  R.rect(32, 110, 58, 111, C.hierro); R.rect(32, 108, 33, 113, K);
  R.rect(38, 134, 76, 137, K); R.rect(39, 134, 75, 135, hex('#6a4028')); R.rect(42, 131, 70, 133, K); R.rect(43, 131, 69, 132, hex('#5a3420'));
  for (const x of [38, 76]) { R.rect(x - 1, 130, x + 1, 139, K); R.disco(x, 129, 2, C.hierroL); }
  R.rect(18, 139, 92, 143, K); a_piedras(R, 19, 140, 91, 143, 45);
  R.linea(94, 141, 98, 112, K); R.linea(96, 141, 100, 114, C.hierro); R.disco(99, 112, 1.5, L.laton);
  // la leña apilada junto a la chimenea
  for (let k = 0; k < 6; k++) { const x = 6 + (k % 3) * 4, y = 136 - Math.floor(k / 3) * 4; R.disco(x, y, 2.2, K); R.disco(x, y, 1.5, hex('#b08a5a')); R.pset(x, y, L.mS); }
  // las dos ventanas: hondas, con la noche y una luz lejana fuera, cortinas recogidas y nieve en el alféizar
  for (const x0 of [112, 150]) { const x1 = x0 + 26;
    R.rect(x0 - 3, 47, x1 + 3, 107, K); R.rect(x0 - 2, 48, x1 + 2, 106, L.yesoS); R.rect(x0 - 2, 48, x1 + 2, 49, L.yesoD);
    R.rect(x0, 50, x1, 104, L.bl); R.rect(x0, 50, x0, 104, L.blL);
    a_degradado(R, x0 + 2, 52, x1 - 2, 102, [L.noche0, L.noche1, L.noche2]);
    R.rect(x0 + 2, 90, x1 - 2, 102, hex('#3a4258')); R.rect(x0 + 2, 90, x1 - 2, 90, L.nvS); R.rect(x0 + 6, 82, x0 + 12, 89, hex('#2a3044')); R.poligono([[x0 + 5, 82], [x0 + 13, 82], [x0 + 9, 78]], hex('#2a3044')); R.rect(x0 + 8, 85, x0 + 9, 87, L.luz);
    R.rect(x0 + 2, 76, x1 - 2, 77, L.bl); R.rect(x0 + 10, 52, x0 + 10, 102, L.bl); R.rect(x0 + 18, 52, x0 + 18, 102, L.bl); R.rect(x0 + 2, 64, x1 - 2, 64, L.bl); R.rect(x0 + 2, 89, x1 - 2, 89, L.bl);
    R.rect(x0 - 3, 104, x1 + 3, 107, K); R.rect(x0 - 2, 104, x1 + 2, 105, L.mL); R.rect(x0 + 2, 102, x1 - 2, 103, L.nv);
    for (const [a, dir] of [[x0 - 5, 1], [x1 + 1, -1]]) { R.poligono([[a, 46], [a + 5, 46], [a + 5 + dir, 86], [a + 2, 112], [a - 1, 112], [a + 1 - dir, 86]], K); for (let y = 47; y < 111; y++) for (let x = a; x <= a + 4; x++) if (R.pget(x, y) === K && (x > a || y > 48)) R.pset(x, y, (x + Math.floor(y / 3)) % 3 ? L.alfR : L.alfRS); }
  }
  // un cuadro de un caballo entre la ventana y las baldas (sin letras)
  R.rect(182, 58, 200, 72, K); R.rect(183, 59, 199, 71, L.laton); R.rect(184, 60, 198, 70, hex('#7a8a6a')); R.rect(184, 66, 198, 70, hex('#5a6a3a')); R.rect(188, 63, 194, 66, hex('#5a3a24')); R.rect(193, 61, 195, 64, hex('#5a3a24')); for (const x of [188, 190, 192, 194]) R.rect(x, 67, x, 69, hex('#3a2418'));
  // detrás del mostrador: baldas con botellas, jarras y un barrilito; el tablero de llaves y la puerta del zaguán
  for (const y of [72, 92, 112]) { R.rect(204, y, 276, y + 2, K); R.rect(205, y, 275, y, L.mL); R.rect(205, y + 1, 275, y + 1, L.m);
    for (let x = 208; x < 272; x += 7) { const k = h(x, y, 46), c = k < 0.33 ? hex('#3a6a3a') : k < 0.66 ? hex('#6a3a1a') : hex('#8a9aa8'), hb = 9 + Math.round(k * 4);
      if (k > 0.85) { R.rect(x - 2, y - 7, x + 3, y - 1, K); R.rect(x - 1, y - 6, x + 2, y - 1, hex('#9aa0aa')); R.pset(x + 4, y - 4, K); continue; }
      R.rect(x - 2, y - hb + 4, x + 2, y - 1, K); R.rect(x - 1, y - hb + 5, x + 1, y - 1, c); R.rect(x, y - hb, x, y - hb + 4, K); R.pset(x - 1, y - hb + 6, L.blL); R.rect(x - 1, y - 5, x + 1, y - 3, C.papel); } }
  R.rect(244, 54, 262, 69, K); R.disco(253, 62, 7, K); R.disco(253, 62, 6, L.m); for (const y of [58, 66]) R.rect(247, y, 259, y, C.hierro); R.disco(253, 62, 2, L.mS); R.rect(252, 68, 254, 70, C.hierro);
  R.rect(279, 66, 307, 104, K); a_tablasV(R, 280, 67, 306, 103, 9, [L.m, L.mS, L.mL, L.mD], 47);
  for (let k = 0; k < 8; k++) { const x = 283 + (k % 4) * 6, y = 72 + Math.floor(k / 4) * 16; R.pset(x, y, L.laton); R.pset(x, y - 1, K); a_dig(R, x - 1, y + 11, String(k + 1), C.papel); }
  R.rect(308, 54, 319, 140, K); R.rect(309, 55, 319, 139, hex('#2a1e18')); for (let k = 0; k < 6; k++) R.rect(309, 132 - k * 13, 319, 133 - k * 13, L.mS);
  // el suelo de tablas anchas, en perspectiva, con el camino gastado más claro
  for (let y = 140; y <= 179; y++) for (let x = 0; x < 320; x++) { const s = (x - 160) / ((y - 60) / 120), bi = Math.floor((s + 3000) / 22), fr = (s + 3000) % 22;
    let c = fr < 1.4 ? L.mD : h(bi, Math.floor(y / 5), 48) < 0.15 ? L.mS : h(bi, 1, 49) < 0.3 ? L.mL : L.m; if (c !== L.mD && Math.abs(x - 150) < 40 && a_bay(x, y) < 0.3) c = L.mL; R.pset(x, y, c); }
  R.rect(0, 140, 319, 140, K);
}

// el mostrador de la posada (va delante de quien está detrás, que asoma cabeza y hombros): tablero con su canto de luz
// (y 128–134), frente de cuarterones y zócalo; encima el libro de registro abierto, la campanilla, una jarra, el tintero
// con la pluma y la vela; y el respaldo alto de un banco junto a la chimenea, en primer término
function a_mostradorDelante(R, t) {
  const L = a_L, K = C.k;
  R.rect(196, 128, 306, 134, K); a_madera(R, 197, 129, 305, 133, L.mL, L.m, L.bl, L.mS, 50, 3);
  R.rect(198, 134, 304, 150, K); R.rect(199, 135, 303, 149, L.m);
  for (let k = 0; k < 5; k++) a_cuarteron(R, 202 + k * 20, 137, 218 + k * 20, 146, L.m, L.mS, L.mL);
  R.rect(199, 135, 303, 135, L.mS); R.rect(198, 148, 304, 150, L.mD);
  R.poligono([[238, 128], [262, 128], [264, 124], [240, 124]], K); R.poligono([[239, 127], [249, 127], [250, 125], [241, 125]], C.papel); R.poligono([[251, 127], [261, 127], [262, 125], [252, 125]], C.papel);
  R.rect(242, 126, 248, 126, C.tinta); R.rect(253, 126, 260, 126, C.tinta); R.rect(250, 124, 250, 127, L.papelS);
  R.rect(218, 125, 226, 128, K); R.rect(219, 126, 225, 127, L.latonS); R.disco(222, 123, 3, K); R.disco(222, 123, 2, L.laton); R.pset(221, 122, L.latonL); R.pset(222, 119, K);
  R.rect(205, 121, 211, 128, K); R.rect(206, 122, 210, 127, hex('#9aa0aa')); R.pset(212, 124, K); R.pset(212, 126, K);
  R.rect(268, 123, 274, 128, K); R.rect(269, 124, 273, 127, hex('#2a2a3a')); R.linea(272, 123, 278, 114, C.blanco); R.linea(273, 123, 279, 115, L.nM);
  R.rect(283, 126, 291, 128, K); R.rect(284, 126, 290, 127, L.laton); R.rect(286, 117, 288, 125, C.papel); a_llama(R, 287, 116, t, 1); a_resplandor(R, 287, 115, 20, L.luz, 0.25, t);
  R.poligono([[0, 104], [22, 108], [30, 116], [30, 180], [0, 180]], K); R.poligono([[0, 106], [21, 110], [28, 117], [28, 180], [0, 180]], L.mS);
  a_tablasV(R, 0, 118, 26, 179, 7, [L.mS, L.mD, L.m, K], 51); R.rect(0, 110, 20, 111, L.m); R.rect(26, 118, 28, 179, L.m);
  return { libro: [250, 126], campanilla: [222, 123], vela: [287, 116] };
}

function a_lyMostrador(R, t, o) {
  const L = a_L, K = C.k;
  a_fondo(R, `mostrador|${!!o.registro}`, () => a_mostradorFondo(R, !!o.registro));
  // la vela y su luz que tiembla
  a_llama(R, 48, 93, t, 1.5); a_resplandor(R, 48, 92, 60, L.luz, 0.28, t);
  // las llaves que se mecen
  for (let k = 0; k < 9; k++) { if (k === 4) continue; const x = 196 + (k % 3) * 22, y = 26 + Math.floor(k / 3) * 22, a = k === 7 ? Math.sin(t * 2.6) * 2 : Math.sin(t * 0.7 + k) * 0.4; const kx = Math.round(x + a);
    R.linea(x, y, kx, y + 7, C.hierro); R.disco(kx, y + 10, 3, K); R.disco(kx, y + 10, 2, L.laton); R.pset(kx, y + 10, K); R.rect(kx, y + 13, kx, y + 18, L.latonS); R.rect(kx + 1, y + 16, kx + 2, y + 16, L.latonS); R.rect(kx + 1, y + 18, kx + 2, y + 18, L.latonS); }
  // el renglón vacío de 1820, resaltado (late)
  let hueco = null;
  if (o.registro) { hueco = [122, 134]; const a = 0.25 + 0.15 * Math.sin(t * 4); for (let y = 132; y <= 139; y++) for (let x = 98; x <= 156; x++) if ((x + y) % 2 === 0) a_tin(R, x, y, hex('#fff08a'), a + 0.2); a_dig(R, 100, 133, '1820', C.tinta); R.rect(98, 131, 156, 131, L.luzS); R.rect(98, 140, 156, 140, L.luzS); }
  return { suelo: 180, libro: [92, 104, 228, 148], hueco, pluma: [70, 124], campanilla: [254, 122], vela: [48, 92] };
}

function a_mostradorFondo(R, registro) {
  const L = a_L, K = C.k;
  // la pared de detrás, encalada, con las baldas de botellas y el tablero de llaves numeradas
  for (let y = 0; y <= 100; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 2, y >> 2, 52); let c = v < 0.2 ? L.yesoS : v > 0.9 ? L.yesoL : L.yeso; if (a_bay(x, y) < 0.5 - y / 200) c = a_mez(c, L.yesoD, 0.4); if (x > 270 && y < 50) c = a_mez(L.yeso, L.yesoD, 0.3); R.pset(x, y, c); }
  for (const y of [50, 84]) { R.rect(0, y, 150, y + 3, K); R.rect(0, y, 150, y + 1, L.mL); R.rect(0, y + 2, 150, y + 2, L.m);
    for (let x = 6; x < 146; x += 11) { const k = h(x, y, 53), c = k < 0.33 ? hex('#3a6a3a') : k < 0.66 ? hex('#6a3a1a') : hex('#8a9aa8'), hb = 15 + Math.round(k * 5);
      if (k > 0.82) { R.rect(x - 4, y - 11, x + 4, y - 1, K); R.rect(x - 3, y - 10, x + 3, y - 1, hex('#9aa0aa')); R.rect(x - 3, y - 10, x - 2, y - 1, hex('#c8ccd4')); R.rect(x + 5, y - 8, x + 6, y - 4, K); continue; }
      R.rect(x - 3, y - hb + 6, x + 3, y - 1, K); R.rect(x - 2, y - hb + 7, x + 2, y - 1, c); R.rect(x - 1, y - hb, x + 1, y - hb + 6, K); R.rect(x - 2, y - hb + 8, x - 2, y - 3, L.blL); R.rect(x - 2, y - 8, x + 2, y - 4, C.papel); R.rect(x - 1, y - 7, x + 1, y - 7, C.tinta); } }
  R.rect(184, 14, 260, 96, K); a_tablasV(R, 185, 15, 259, 95, 12, [L.m, L.mS, L.mL, L.mD], 54);
  for (let k = 0; k < 9; k++) { const x = 196 + (k % 3) * 22, y = 26 + Math.floor(k / 3) * 22; R.rect(x - 1, y - 1, x + 1, y, L.laton); R.rect(x + 5, y + 3, x + 13, y + 10, K); R.rect(x + 6, y + 4, x + 12, y + 9, C.papel); a_dig(R, x + 8, y + 5, String(k + 1), C.tinta); }
  R.rect(272, 52, 296, 96, K); R.rect(273, 53, 295, 96, hex('#2a1e18')); R.rect(276, 56, 292, 74, hex('#3a3030'));
  // el tablero del mostrador visto desde arriba, con vetas y la luz, y el canto y el frente
  for (let y = 100; y <= 150; y++) for (let x = 0; x < 320; x++) { const g = h(Math.floor(x / 30), Math.floor((y - 100) / 2) + Math.round(Math.sin(x * 0.05 + y) * 0.6), 55); let c = g < 0.2 ? L.m : g > 0.85 ? L.bl : L.mL; if (a_bay(x, y) < (y - 100) / 120) c = a_mez(c, L.m, 0.4); R.pset(x, y, c); }
  R.rect(0, 100, 319, 100, L.mS);
  R.rect(0, 150, 319, 156, K); R.rect(0, 151, 319, 152, L.bl); R.rect(0, 153, 319, 154, L.mL); R.rect(0, 155, 319, 155, L.m);
  a_tablasV(R, 0, 157, 319, 179, 16, [L.m, L.mS, L.mL, L.mD], 56);
  // el libro de registro abierto: tapas de piel roja, dos páginas, el lomo, los renglones con su año y su firma
  R.rect(88, 101, 232, 151, K); R.rect(89, 102, 231, 150, L.alfR); R.rect(89, 150, 231, 150, L.alfRS);
  R.rect(92, 104, 158, 148, C.papel); R.rect(162, 104, 228, 148, C.papel); R.rect(158, 104, 162, 148, L.papelS); R.rect(160, 103, 160, 149, L.mD);
  for (let y = 104; y <= 148; y++) { R.pset(157, y, L.papelS); R.pset(163, y, L.papelS); if (h(1, y, 57) < 0.5) R.pset(93, y, C.papelV); }
  const anyos = [1818, 1819, 1819, 1820, 1820];
  for (let i = 0; i < 5; i++) { const y = 109 + i * 8; R.rect(96, y + 6, 156, y + 6, hex('#c8c0a8')); R.rect(164, y + 6, 226, y + 6, hex('#c8c0a8'));
    if (registro && i === 3) continue;
    a_dig(R, 98, y, String(anyos[i]), C.tinta);
    let x = 116; while (x < 152) { const w = 4 + Math.round(h(x, i, 58) * 6); for (let k = 0; k < w; k++) R.pset(x + k, y + 3 + Math.round(Math.sin((x + k) * 1.3 + i) * 1.5), C.tinta); x += w + 2; }
    x = 166; while (x < 210) { const w = 3 + Math.round(h(x, i, 59) * 5); for (let k = 0; k < w; k++) R.pset(x + k, y + 3 + Math.round(Math.sin((x + k) * 1.1 + i * 2) * 1.5), C.tinta); x += w + 2; }
    a_dig(R, 214, y, String(1 + (i * 3) % 8), C.tinta); }
  R.rect(158, 148, 162, 162, L.alfRS); R.rect(159, 148, 161, 160, C.rojo); R.poligono([[159, 160], [161, 160], [160, 163]], C.rojo);
  // la vela, el tintero con la pluma, la campanilla, el llavero y unas monedas
  R.rect(38, 116, 58, 122, K); R.rect(39, 117, 57, 121, L.laton); R.rect(39, 117, 57, 117, L.latonL); R.rect(44, 94, 52, 117, K); R.rect(45, 95, 51, 116, C.papel); R.rect(45, 95, 46, 116, L.blL); R.rect(50, 95, 51, 116, L.papelS); R.rect(48, 93, 48, 94, K);
  R.rect(62, 120, 78, 132, K); R.rect(63, 121, 77, 131, hex('#2a2a3a')); R.rect(64, 122, 66, 129, hex('#5a5a74')); R.rect(66, 118, 74, 120, K);
  R.linea(70, 119, 88, 88, K); R.linea(71, 119, 89, 89, L.blL); for (let k = 0; k < 14; k++) { R.pset(76 + k, 108 - k * 1.6 | 0, L.bl); R.pset(77 + k, 109 - k * 1.6 | 0, L.nM); }
  R.rect(244, 128, 266, 132, K); R.rect(245, 129, 265, 131, L.latonS); for (let j = 0; j < 10; j++) { const w = Math.round(Math.sqrt(1 - (j / 10) ** 2) * 9); R.rect(255 - w - 1, 127 - j, 255 + w + 1, 127 - j, K); R.rect(255 - w, 127 - j, 255 + w, 127 - j, j > 6 ? L.latonL : L.laton); R.pset(255 - w + 1, 127 - j, L.latonL); }
  R.rect(254, 115, 256, 117, K); R.pset(255, 116, L.latonL); R.rect(258, 120, 262, 126, L.latonS);
  R.disco(282, 140, 5, K); R.disco(282, 140, 4, C.hierroL); R.disco(282, 140, 3, K); R.linea(286, 142, 298, 146, K); R.linea(286, 141, 298, 145, C.hierroL); R.rect(296, 145, 298, 148, C.hierroL);
  for (const [x, y] of [[198, 140], [204, 142], [201, 136]]) { R.disco(x, y, 2.5, K); R.disco(x, y, 1.6, L.laton); R.pset(x - 1, y - 1, L.latonL); }
}

function a_lyDespacho(R, t, o) {
  const L = a_L, K = C.k, noche = !!o.noche;
  const m = a_fondo(R, `despacho|${noche}`, (mk) => a_despachoFondo(R, noche, mk));
  // la ventana: nubes que pasan (o estrellas), una barca en el río y las motas en la luz
  R.recorte([15, 43, 49, 115]);
  if (!noche) { a_nubes(R, t, m, [[0, 56, 20, 1.6, 1], [40, 66, 14, 2.4, 2]], [L.nL, L.nM, L.nS]); a_bateau(R, ((t * 3) % 80) - 14, 103, t, 1); a_cuervos(R, t, 50, m, 2); }
  else for (let k = 0; k < 8; k++) { const x = 16 + Math.round(h(k, 1, 61) * 32), y = 44 + Math.round(h(k, 2, 61) * 30); if (Math.sin(t * 2 + k) > 0.3) R.pset(x, y, L.blL); }
  R.recorte(null);
  if (!noche) for (let k = 0; k < 12; k++) { const u = (h(k, 3, 62) + t * 0.03 * (1 + k % 3)) % 1, x = Math.round(40 + u * 50 + Math.sin(t + k) * 3), y = Math.round(112 + u * 36 + h(k, 4, 62) * 6); if (Math.sin(t * 1.3 + k) > -0.3) R.pset(x, y, L.luzL); }
  // el reloj de pie: las agujas y el péndulo que va y viene
  { const cx = 70, cy = 76, a1 = t * 0.05, a2 = t * 0.6; R.linea(cx, cy, Math.round(cx + Math.sin(a1) * 3), Math.round(cy - Math.cos(a1) * 3), K); R.linea(cx, cy, Math.round(cx + Math.sin(a2) * 5), Math.round(cy - Math.cos(a2) * 5), K);
    const p = Math.sin(t * Math.PI) * 0.3, px = Math.round(cx + Math.sin(p) * 20), py = Math.round(90 + Math.cos(p) * 20); R.recorte([65, 90, 75, 117]); R.linea(cx, 90, px, py, L.laton); R.disco(px, py, 3, K); R.disco(px, py, 2.2, L.laton); R.pset(px - 1, py - 1, L.latonL); R.recorte(null); }
  // la chimenea: el fuego pequeño y su luz; las velas de la repisa
  a_fuego(R, 102, 122, 141, t, 11); a_resplandor(R, 112, 136, 40, L.fuego, 0.25, t, [60, 70, 160, 179]);
  for (const x of [94, 130]) a_llama(R, x, 93, t, 1);
  // la lámpara de aceite del escritorio
  a_llama(R, 218, 118, t, 1.1); a_resplandor(R, 218, 118, 44, L.luz, 0.28, t);
  // el calendario: el año, y o.hojas arranca hojas que salen volando hasta o.anyoFin
  const a0 = o.anyo ?? 1822, a1 = o.anyoFin ?? 1832, hj = Math.max(0, Math.min(1, o.hojas ?? 0)), n = a1 - a0, pos = hj * n, idx = Math.min(n, Math.floor(pos)), fr = pos - idx;
  a_calendario(R, 159, 58, a0 + idx);
  if (hj > 0 && idx < n) { const u = fr, x = 159 + u * 70 + Math.sin(u * 9) * 6, y = 62 + u * 80 - Math.sin(u * 3) * 20, w = Math.max(2, Math.round(16 * Math.abs(Math.cos(u * 8))));
    R.rect(Math.round(x - w), Math.round(y - 10), Math.round(x + w), Math.round(y + 10), K); R.rect(Math.round(x - w + 1), Math.round(y - 9), Math.round(x + w - 1), Math.round(y + 9), C.papel); if (w > 8) a_dig(R, Math.round(x - 7), Math.round(y - 5), String(a0 + idx), C.tinta); }
  if (hj > 0) for (let k = 0; k < Math.min(6, idx); k++) { const x = 170 + h(k, 1, 63) * 60, y = 168 + h(k, 2, 63) * 8; R.poligono([[x - 6, y], [x + 5, y - 2], [x + 6, y + 4], [x - 5, y + 5]], K); R.poligono([[x - 5, y + 1], [x + 4, y - 1], [x + 5, y + 3], [x - 4, y + 4]], k % 2 ? C.papel : C.papelV); }
  // el armario: las puertas que se abren y, dentro, las baldas (y la caja si se guarda ahí)
  const pu = Math.max(0, Math.min(1, o.puertas ?? 0)), caja = o.caja === undefined ? 'armario' : o.caja;
  a_armario(R, pu, caja === 'armario');
  if (caja === 'mesa') a_cajaPeq(R, 192, 130);
  return { suelo: 150, libre: [30, 150], escritorio: [150, 232, 130], lampara: [218, 118], armario: [240, 70, 302, 148], estante: [265, 120], caja: caja === 'mesa' ? [192, 123] : caja === 'armario' ? [265, 113] : null, calendario: [159, 76], reloj: [70, 76], ventana: [12, 40, 52, 118], chimenea: [88, 136], anyo: a0 + idx };
}

// el calendario de pared: el clavo, la hoja con la franja roja, el año en cifras grandes y la rejilla de los días
function a_calendario(R, cx, y, anyo) {
  const L = a_L, K = C.k;
  R.rect(cx - 17, y, cx + 17, y + 36, K); R.rect(cx - 16, y + 1, cx + 16, y + 35, C.papel); R.rect(cx - 16, y + 1, cx + 16, y + 6, C.rojo); R.rect(cx - 16, y + 6, cx + 16, y + 6, C.rojoS);
  R.disco(cx, y - 1, 1.5, L.laton); R.rect(cx - 16, y + 35, cx + 16, y + 35, L.papelS); R.rect(cx + 16, y + 1, cx + 16, y + 35, L.papelS);
  a_dig(R, cx - 15, y + 9, String(anyo), C.tinta, 2);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 7; i++) R.rect(cx - 14 + i * 4, y + 23 + j * 4, cx - 13 + i * 4, y + 24 + j * 4, (i === 6) ? C.rojo : L.papelS);
}

// el armario de roble (x 240–302, y 70–148): dos puertas de cuarterones (pu 0–1 las abre) y, dentro, dos baldas (y 96 y
// 120) con ropa doblada, libros de cuentas, un atado de cartas y la caja de hierro (conCaja, en la balda de y 120)
function a_armario(R, pu, conCaja) {
  const L = a_L, K = C.k;
  if (pu > 0) {
    R.rect(244, 78, 298, 139, hex('#24180f')); for (let y = 78; y <= 139; y++) for (let x = 244; x <= 298; x++) if (h(x >> 1, y >> 2, 64) < 0.15) R.pset(x, y, hex('#2e2014'));
    for (const y of [96, 120]) { R.rect(244, y, 298, y + 2, K); R.rect(244, y, 298, y, L.mL); R.rect(244, y + 1, 298, y + 1, L.m); }
    for (let k = 0; k < 3; k++) { const y = 95 - k * 4; R.rect(248, y - 3, 266, y, K); R.rect(249, y - 2, 265, y, k % 2 ? L.bl : hex('#c8c0d8')); R.rect(249, y - 2, 265, y - 2, L.blL); }
    for (let k = 0; k < 5; k++) { const x = 274 + k * 4; R.rect(x, 83, x + 3, 95, K); R.rect(x + 1, 84, x + 2, 95, [L.alfR, L.verde, L.alfA, L.m, L.alfR][k]); R.rect(x + 1, 87, x + 2, 87, L.laton); }
    for (let k = 0; k < 2; k++) { const y = 138 - k * 5; R.rect(250, y - 4, 278, y, K); R.rect(251, y - 3, 277, y - 1, k % 2 ? L.m : L.alfRS); }
    R.rect(282, 110, 296, 119, K); R.rect(283, 111, 295, 119, C.papel); R.linea(283, 111, 289, 115, L.papelS); R.linea(295, 111, 289, 115, L.papelS); R.rect(288, 111, 289, 119, C.rojo);
    if (conCaja) a_cajaPeq(R, 263, 120);
    const w = Math.round(27 * (1 - pu * 0.82));
    R.rect(244, 76, 244 + w, 140, K); R.rect(245, 77, 243 + w, 139, pu > 0.5 ? L.mS : L.m); if (w > 12) { a_cuarteron(R, 247, 82, 241 + w, 106, L.mS, L.mD, L.m); a_cuarteron(R, 247, 112, 241 + w, 134, L.mS, L.mD, L.m); }
    R.rect(298 - w, 76, 298, 140, K); R.rect(299 - w, 77, 297, 139, pu > 0.5 ? L.mS : L.m); if (w > 12) { a_cuarteron(R, 301 - w, 82, 295, 106, L.mS, L.mD, L.m); a_cuarteron(R, 301 - w, 112, 295, 134, L.mS, L.mD, L.m); }
  } else {
    R.rect(270, 76, 272, 140, K); R.rect(271, 77, 271, 139, L.mD);
    for (const [a, b] of [[246, 268], [274, 296]]) { a_cuarteron(R, a, 82, b, 106, L.m, L.mS, L.mL); a_cuarteron(R, a, 112, b, 134, L.m, L.mS, L.mL); }
    for (const x of [266, 276]) { R.rect(x, 106, x + 2, 111, K); R.rect(x + 1, 107, x + 1, 109, L.laton); R.pset(x + 1, 110, K); }
  }
}

// la caja de hierro pequeña (a la escala de los personajes): base en (x, suelo), 26 × 14 con flejes, remaches, óxido y
// el candado
function a_cajaPeq(R, x, suelo) {
  const L = a_L, K = C.k;
  R.rect(x - 13, suelo - 13, x + 13, suelo, K); R.rect(x - 12, suelo - 12, x + 12, suelo - 1, C.hierro); R.rect(x - 12, suelo - 12, x + 12, suelo - 10, C.hierroL); R.rect(x - 12, suelo - 9, x + 12, suelo - 9, K);
  R.rect(x - 12, suelo - 8, x - 11, suelo - 1, C.hierroL); for (const dx of [-7, 7]) { R.rect(x + dx - 1, suelo - 12, x + dx, suelo - 1, hex('#4a4a54')); R.pset(x + dx, suelo - 6, C.hierroL); R.pset(x + dx, suelo - 3, C.hierroL); }
  R.pset(x - 9, suelo - 3, C.oxido); R.pset(x + 10, suelo - 5, C.oxido); R.pset(x + 4, suelo - 2, L.oxL); R.rect(x - 12, suelo - 1, x + 12, suelo - 1, C.oxido);
  R.rect(x - 2, suelo - 8, x + 2, suelo - 3, K); R.rect(x - 1, suelo - 7, x + 1, suelo - 4, L.laton); R.pset(x, suelo - 6, K); R.rect(x - 1, suelo - 10, x + 1, suelo - 9, L.latonS);
}

function a_despachoFondo(R, noche, mk) {
  const L = a_L, K = C.k;
  // la cornisa y el papel pintado de rayas con su florón (muy suave arriba a la derecha)
  R.rect(0, 0, 319, 5, L.bl); R.rect(0, 4, 319, 4, L.blS); R.rect(0, 6, 319, 6, K); for (let x = 1; x < 320; x += 4) R.pset(x, 2, L.blS);
  for (let y = 7; y <= 121; y++) for (let x = 0; x < 320; x++) { const tranq = x > 266 && y < 50; let c = (x % 12 < 6) ? L.tapiz : L.tapizS;
    if (!tranq && x % 12 === 9 && (y % 10 === 3 || y % 10 === 5)) c = L.tapizL; if (!tranq && x % 12 === 8 + (y % 10 === 4 ? 0 : 1) && y % 10 === 4) c = L.tapizL;
    if (tranq) c = a_mez(L.tapiz, L.tapizS, 0.4); if (a_bay(x, y) < 0.25 - (y - 7) / 400) c = a_mez(c, K, 0.2); R.pset(x, y, c); }
  // la moldura del techo con un friso de luz, la moldura de la pared y el friso de cuarterones; el rodapié
  R.rect(0, 7, 319, 9, L.blS); R.rect(0, 10, 319, 10, a_mez(L.tapizS, K, 0.3));
  R.rect(0, 121, 319, 124, K); R.rect(0, 122, 319, 122, L.mL); R.rect(0, 123, 319, 123, L.m);
  R.rect(0, 125, 319, 139, L.m); for (let x = 2; x < 318; x += 26) a_cuarteron(R, x, 126, x + 22, 136, L.m, L.mS, L.mL); R.rect(0, 137, 319, 140, L.mD); R.rect(0, 137, 319, 137, L.mS);
  // la ventana alta: cielo de invierno, colinas, el río; cortinas con su galería y el alféizar; la luz en el suelo
  R.rect(12, 40, 52, 118, K); R.rect(13, 41, 51, 117, L.bl); R.rect(13, 41, 14, 117, L.blL);
  a_degradado(R, 15, 43, 49, 86, noche ? [L.noche0, L.noche1, L.noche2] : [L.c0, L.c1, L.c2, L.c3], mk);
  for (let x = 15; x <= 49; x++) { const r = Math.round(82 + 3 * Math.sin(x * 0.2)); for (let y = r; y <= 96; y++) { mk[y * 320 + x] = 0; R.pset(x, y, noche ? (a_bay(x, y) < 0.5 ? L.noche2 : L.noche1) : y === r ? L.nv : (h(x >> 1, y >> 1, 65) < 0.35 ? L.nvS : a_bay(x, y) < (y - r) / 14 ? L.col2 : L.col1)); } }
  if (!noche) for (let k = 0; k < 9; k++) { const x = 16 + Math.round(h(k, 1, 72) * 32), y = 86 + Math.round(h(k, 2, 72) * 6); R.rect(x, y - 3, x, y, L.col2); R.pset(x - 1, y - 2, L.col2); R.pset(x + 1, y - 3, L.col2); }
  for (let y = 97; y <= 104; y++) for (let x = 15; x <= 49; x++) R.pset(x, y, noche ? L.noche1 : (a_bay(x, y) < 0.5 ? C.rio : L.rioS));
  for (let y = 105; y <= 115; y++) for (let x = 15; x <= 49; x++) R.pset(x, y, noche ? L.noche0 : (a_bay(x, y) < (y - 105) / 12 ? L.nvS : L.nv));
  if (!noche) { for (let x = 16; x < 49; x += 4) R.rect(x, 108, x, 114, L.mS); R.rect(15, 109, 49, 109, L.mS); R.rect(15, 112, 49, 112, L.mS); }
  if (noche) { R.disco(40, 52, 4, hex('#f0eedc')); R.pset(39, 51, L.blL); }
  for (let y = 43; y <= 115; y++) for (let x = 15; x <= 49; x++) if (x === 26 || x === 38 || y === 60 || y === 77 || y === 78 || y === 96) R.pset(x, y, L.bl);
  R.rect(15, 79, 49, 79, L.blS);
  R.rect(8, 118, 56, 122, K); R.rect(9, 118, 55, 120, L.bl); R.rect(9, 121, 55, 121, L.blS);
  R.rect(28, 112, 34, 118, K); R.rect(29, 113, 33, 117, hex('#a8583a')); R.disco(31, 109, 3, hex('#4a7a3a')); R.pset(30, 107, hex('#6a9a4a'));
  for (const [a, dir] of [[4, 1], [48, -1]]) { R.poligono([[a, 32], [a + 10, 32], [a + 10 - dir * 2, 76], [a + 6, 126], [a - 1, 126], [a + dir * 2, 76]], K);
    for (let y = 33; y < 125; y++) for (let x = a; x <= a + 9; x++) if (R.pget(x, y) === K && (x > a || y > 34)) R.pset(x, y, (x + Math.floor(y / 4)) % 4 === 0 ? L.alfRS : (x + Math.floor(y / 4)) % 4 === 1 ? hex('#a84a3a') : L.alfR); }
  R.rect(0, 28, 62, 34, K); R.rect(1, 29, 61, 33, L.alfR); for (let x = 2; x < 61; x += 6) R.poligono([[x, 33], [x + 6, 33], [x + 3, 37]], L.alfRS); R.rect(1, 29, 61, 29, L.alfO);
  // el suelo de pino en perspectiva y la alfombra de dibujo
  for (let y = 141; y <= 179; y++) for (let x = 0; x < 320; x++) { const s = (x - 160) / ((y - 60) / 120), bi = Math.floor((s + 3000) / 18), fr = (s + 3000) % 18;
    let c = fr < 1.2 ? L.mD : h(bi, Math.floor(y / 6), 67) < 0.15 ? L.mS : h(bi, 2, 68) < 0.35 ? hex('#a87a4a') : hex('#94683e'); R.pset(x, y, c); }
  R.rect(0, 140, 319, 140, K);
  if (!noche) for (let y = 141; y <= 170; y++) { const d = (y - 141) * 1.2; for (let x = Math.round(30 + d); x <= 70 + d; x++) if ((x + y) % 2 === 0) a_tin(R, x, y, L.luzL, 0.28); }
  { R.poligono([[60, 152], [236, 152], [252, 178], [44, 178]], K); R.poligono([[62, 153], [234, 153], [249, 177], [47, 177]], L.alfR);
    for (let y = 153; y <= 177; y++) { const u = (y - 153) / 24, xa = Math.round(62 - u * 15), xb = Math.round(234 + u * 15); for (let x = xa; x <= xb; x++) { const bx = Math.min(x - xa, xb - x), by = Math.min(y - 153, 177 - y);
      if (bx < 5 || by < 3) R.pset(x, y, (x + y) % 4 < 2 ? L.alfA : L.alfO); else if (((x >> 2) + (y >> 1)) % 5 === 0 && ((x + y) & 1)) R.pset(x, y, L.alfO); else if (Math.abs(x - 148) / 50 + Math.abs(y - 165) / 8 < 1 && (x + y) % 3 === 0) R.pset(x, y, L.alfA); } } }
  // el reloj de pie (x 58–82, del suelo hasta y 56): capitel en arco, la esfera blanca, la ventanilla del péndulo y la peana
  R.rect(58, 62, 82, 146, K); R.rect(59, 63, 81, 145, L.caoba); R.rect(59, 63, 60, 145, L.caobaL); R.rect(79, 63, 81, 145, L.caobaS);
  R.rect(56, 60, 84, 64, K); R.rect(57, 61, 83, 62, L.caobaL); R.poligono([[58, 60], [82, 60], [76, 54], [64, 54]], K); R.poligono([[60, 59], [80, 59], [75, 55], [65, 55]], L.caoba); R.pset(70, 53, L.laton);
  R.disco(70, 76, 9, K); R.disco(70, 76, 8, L.laton); R.disco(70, 76, 7, L.bl); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(70 + Math.sin(a) * 6), Math.round(76 - Math.cos(a) * 6), K); }
  R.rect(63, 89, 77, 118, K); R.rect(64, 90, 76, 117, hex('#1e140e')); R.rect(64, 90, 64, 117, hex('#4a3a2e'));
  R.rect(61, 122, 79, 140, K); a_cuarteron(R, 62, 123, 78, 139, L.caoba, L.caobaS, L.caobaL); R.rect(56, 142, 84, 147, K); R.rect(57, 143, 83, 146, L.caobaS);
  // la chimenea (boca y 116–146): pilastras, friso, repisa a y 102, la reja y el hogar; candeleros y un jarrón
  R.rect(84, 100, 140, 105, K); R.rect(85, 101, 139, 103, L.bl); R.rect(85, 104, 139, 104, L.blS);
  R.rect(88, 105, 136, 146, K); R.rect(89, 106, 135, 145, L.bl); R.rect(89, 106, 95, 145, L.blS); R.rect(129, 106, 135, 145, L.blS); R.rect(90, 107, 91, 144, L.blL); R.rect(130, 107, 131, 144, L.blL);
  R.rect(96, 107, 128, 114, L.blS); R.rect(97, 108, 127, 113, L.bl); R.disco(112, 110, 2, L.blS);
  R.rect(97, 116, 127, 146, K); for (let y = 117; y <= 145; y++) for (let x = 98; x <= 126; x++) R.pset(x, y, y > 136 ? hex('#3a2420') : (x + y) % 5 === 0 ? hex('#2a1a16') : hex('#1a1210'));
  R.rect(100, 138, 124, 140, K); for (let x = 101; x < 124; x += 3) R.rect(x, 134, x, 140, C.hierro); R.rect(100, 144, 124, 145, C.hierro);
  R.rect(84, 146, 140, 150, K); R.rect(85, 147, 139, 149, L.pd); R.rect(85, 147, 139, 147, L.pdL);
  for (const x of [94, 130]) { R.rect(x - 2, 98, x + 2, 100, K); R.rect(x - 1, 98, x + 1, 99, L.laton); R.rect(x - 1, 94, x, 97, C.papel); }
  R.rect(108, 90, 116, 100, K); R.rect(109, 91, 115, 99, L.alfA); R.rect(109, 91, 110, 99, hex('#4a6a8a')); R.disco(112, 88, 3, hex('#c84a4a')); R.disco(110, 87, 2, hex('#e8c040'));
  // el mapa de Virginia enmarcado, sin letras: la bahía y la costa a la derecha, los ríos, las montañas al oeste y un
  // punto rojo en Lynchburg, sobre el James
  { const oy = 26; R.rect(92, 20 + oy, 132, 58 + oy, K); R.rect(93, 21 + oy, 131, 57 + oy, L.laton); R.rect(93, 21 + oy, 131, 21 + oy, L.latonL); R.rect(95, 23 + oy, 129, 55 + oy, K);
    for (let y = 24 + oy; y <= 54 + oy; y++) for (let x = 96; x <= 128; x++) R.pset(x, y, h(x >> 1, y >> 1, 69) < 0.15 ? C.papelV : C.papel);
    const P = (pts) => pts.map(([x, y]) => [x, y + oy]);
    R.poligono(P([[120, 24], [128, 24], [128, 54], [118, 54], [121, 46], [117, 40], [122, 34], [119, 29]]), hex('#8aaab8'));
    for (const [a, b] of [[[120, 24], [119, 29]], [[119, 29], [122, 34]], [[122, 34], [117, 40]], [[117, 40], [121, 46]]]) R.linea(a[0], a[1] + oy, b[0], b[1] + oy, hex('#5a7a8a'));
    R.linea(96, 50 + oy, 108, 44 + oy, hex('#a8a08a')); for (const [x, y] of [[98, 34], [101, 31], [104, 29], [99, 39], [102, 36]]) { R.pset(x, y + oy, L.mS); R.pset(x - 1, y + 1 + oy, L.mS); R.pset(x + 1, y + 1 + oy, L.mS); }
    R.linea(100, 44 + oy, 109, 41 + oy, hex('#4a7a9a')); R.linea(109, 41 + oy, 117, 40 + oy, hex('#4a7a9a')); R.linea(104, 33 + oy, 112, 34 + oy, hex('#4a7a9a')); R.linea(112, 34 + oy, 119, 31 + oy, hex('#4a7a9a'));
    R.disco(106, 42 + oy, 1.5, C.rojo); R.pset(106, 42 + oy, C.rojoS); }
  // dos apliques de pared con su vela apagada y un cuadro pequeño de un barco, para que la pared no quede vacía
  for (const x of [146, 226]) { R.rect(x - 1, 28, x + 1, 36, K); R.rect(x, 29, x, 35, L.laton); R.rect(x - 3, 36, x + 3, 38, K); R.rect(x - 2, 36, x + 2, 37, L.laton); R.rect(x - 1, 30, x, 35, C.papel); }
  R.rect(176, 22, 204, 42, K); R.rect(177, 23, 203, 41, L.laton); R.rect(179, 25, 201, 39, hex('#8aa8c0')); R.rect(179, 34, 201, 39, hex('#4a6a8a')); R.poligono([[184, 34], [198, 34], [196, 37], [186, 37]], L.mS); R.rect(190, 26, 190, 34, L.mD); R.poligono([[191, 27], [197, 33], [191, 33]], L.bl); R.poligono([[189, 28], [189, 33], [184, 33]], L.blS);
  // el escritorio de tapa (tablero y 130): el remate, la persiana recogida, los casilleros con cartas, los cajones
  R.rect(148, 100, 234, 130, K); R.rect(149, 101, 233, 129, L.caoba);
  R.rect(146, 98, 236, 102, K); R.rect(147, 99, 235, 100, L.caobaL);
  for (let y = 103; y <= 107; y++) R.rect(151, y, 231, y, y % 2 ? L.caobaS : L.caoba);
  for (let j = 0; j < 2; j++) for (let i = 0; i < 9; i++) { const x = 152 + i * 9, y = 109 + j * 10; R.rect(x, y, x + 8, y + 9, K); R.rect(x + 1, y + 1, x + 7, y + 9, hex('#24140e'));
    const k = h(i, j, 70); if (k < 0.35) { R.rect(x + 1, y + 4, x + 7, y + 9, C.papel); R.rect(x + 1, y + 4, x + 7, y + 4, C.papelV); R.rect(x + 2, y + 6, x + 6, y + 6, L.papelS); }
    else if (k < 0.6) { R.rect(x + 2, y + 3, x + 3, y + 9, C.papelV); R.rect(x + 4, y + 5, x + 6, y + 9, C.papel); R.rect(x + 2, y + 7, x + 6, y + 7, C.rojo); }
    else if (k < 0.8) { R.disco(x + 4, y + 7, 2, C.papel); R.disco(x + 4, y + 7, 1, L.papelS); } }
  R.rect(149, 128, 233, 129, L.caobaS);
  R.rect(146, 129, 236, 134, K); R.rect(147, 130, 235, 132, L.caobaL); R.rect(147, 133, 235, 133, L.caoba);
  for (const [a, b] of [[150, 174], [208, 232]]) { R.rect(a, 134, b, 146, K); R.rect(a + 1, 135, b - 1, 145, L.caoba); for (let k = 0; k < 2; k++) { const y = 136 + k * 5; a_cuarteron(R, a + 2, y, b - 2, y + 4, L.caoba, L.caobaS, L.caobaL); R.rect(((a + b) >> 1) - 1, y + 2, ((a + b) >> 1) + 1, y + 2, L.laton); } R.rect(a, 146, a + 2, 148, K); R.rect(b - 2, 146, b, 148, K); }
  R.rect(175, 134, 207, 144, hex('#1e120c')); R.rect(175, 134, 207, 135, L.caobaS);
  // lo de encima del tablero: papeles, el tintero con la pluma y la lámpara de aceite
  R.poligono([[156, 129], [176, 129], [178, 126], [158, 126]], K); R.poligono([[157, 128], [175, 128], [177, 127], [159, 127]], C.papel); R.rect(162, 127, 172, 127, C.tinta);
  R.rect(206, 125, 211, 129, K); R.rect(207, 126, 210, 128, hex('#2a2a3a')); R.linea(209, 125, 214, 116, L.bl); R.linea(210, 125, 215, 117, L.nM);
  R.rect(212, 128, 224, 129, K); R.rect(213, 128, 223, 128, L.laton); R.rect(216, 123, 220, 127, K); R.rect(217, 124, 219, 126, L.latonL); R.disco(218, 122, 3, K); R.disco(218, 122, 2, hex('#c8a870'));
  for (let y = 110; y <= 120; y++) { const w = y < 114 ? 2 : 3; R.pset(218 - w, y, hex('#d8d0c0')); R.pset(218 + w, y, hex('#d8d0c0')); for (let x = 219 - w; x < 218 + w; x++) a_tin(R, x, y, hex('#fff2d0'), 0.4); }
  // la silla Windsor junto al escritorio
  R.rect(132, 136, 150, 139, K); R.rect(133, 137, 149, 138, L.mL); for (const x of [134, 148]) R.rect(x, 139, x, 148, K); R.linea(133, 148, 135, 139, L.mS); R.linea(149, 148, 147, 139, L.mS);
  R.rect(132, 116, 150, 118, K); R.rect(133, 116, 149, 116, L.mL); for (let x = 134; x <= 148; x += 3) R.rect(x, 118, x, 136, L.mS);
  // la percha con un sombrero y un abrigo, a la derecha
  R.rect(305, 82, 319, 84, K); R.rect(306, 82, 319, 82, L.mL); R.poligono([[306, 84], [319, 84], [319, 128], [304, 124]], K); R.poligono([[307, 85], [319, 85], [319, 126], [306, 123]], hex('#3a3046')); R.rect(306, 77, 319, 81, K); R.rect(308, 74, 317, 77, K);
  // el armario de roble (x 240–302, y 70–148): cornisa con dentículos, costados, peana (las puertas: a_armario)
  R.rect(236, 70, 306, 76, K); R.rect(237, 71, 305, 73, L.mL); for (let x = 238; x < 305; x += 3) R.pset(x, 74, L.mS);
  R.rect(240, 76, 302, 148, K); R.rect(241, 77, 301, 140, L.m); a_tablasV(R, 244, 77, 298, 139, 27, [L.m, L.mS, L.mL, L.mD], 71); R.rect(241, 77, 243, 140, L.mL); R.rect(299, 77, 301, 140, L.mS);
  R.rect(240, 140, 302, 144, K); R.rect(241, 141, 301, 143, L.mS); R.rect(242, 144, 246, 149, K); R.rect(296, 144, 300, 149, K);
  // encima del armario, una sombrerera y un baúl pequeño
  R.rect(246, 58, 268, 70, K); R.rect(247, 59, 267, 69, hex('#8a6a8a')); R.rect(247, 59, 267, 60, hex('#a888a8')); R.rect(247, 64, 267, 64, hex('#6a4a6a'));
  R.rect(274, 62, 296, 70, K); R.rect(275, 63, 295, 69, L.mS); R.rect(275, 63, 295, 63, L.m); R.rect(284, 65, 286, 67, L.laton);
  if (noche) for (let y = 7; y <= 179; y++) for (let x = 0; x < 320; x++) { if (mk[y * 320 + x]) continue; a_tin(R, x, y, L.noche1, 0.35); }
}

function a_lyCaja(R, t, o) {
  const L = a_L, K = C.k, ab = Math.max(0, Math.min(1, o.abierta ?? 0)), roto = !!o.roto;
  a_fondo(R, 'caja', () => a_cajaFondo(R));
  // la lámpara: la llama y la luz cálida que tiembla sobre todo
  a_llama(R, 40, 104, t, 1.6); a_resplandor(R, 40, 100, 120, L.luz, 0.22, t);
  // una polilla que revolotea alrededor del tubo de la lámpara, y motas de polvo en la luz
  { const a = t * 2.1, mx = Math.round(40 + Math.cos(a) * 14 + Math.sin(t * 5.3) * 2), my = Math.round(92 + Math.sin(a * 1.3) * 10), f = Math.sin(t * 30) > 0;
    R.pset(mx, my, hex('#6a5a4a')); R.pset(mx + 1, my, hex('#6a5a4a')); R.pset(mx - 1, my + (f ? -1 : 1), hex('#b8a890')); R.pset(mx + 2, my + (f ? -1 : 1), hex('#b8a890')); }
  for (let k = 0; k < 10; k++) { const u = (h(k, 1, 87) + t * 0.025 * (1 + k % 3)) % 1, x = Math.round(20 + h(k, 2, 87) * 120 + Math.sin(t * 0.7 + k) * 4), y = Math.round(30 + u * 80); if (Math.sin(t + k * 1.9) > -0.2) a_tin(R, x, y, L.luzL, 0.6); }
  // la caja: base 152, cuerpo x 112–216
  const x0 = 112, x1 = 216, cx = 164, yb = 152, yt = 104, e = ab * ab * (3 - 2 * ab);
  // la sombra en la mesa, hacia la derecha (la luz viene de la izquierda)
  for (let y = 150; y <= 162; y++) for (let x = x0 + 10 + (y - 150) * 2; x <= x1 + 26 + (y - 150) * 2; x++) if ((x + y) % 2 === 0) a_tin(R, x, y, K, 0.45);
  // la tapa abierta (su cara de dentro, de pie detrás de la boca) o cerrada
  let tapa = 92;
  if (e > 0.02) {
    const ytop = Math.round(92 - e * 50);
    if (e > 0.35) { R.rect(x0, ytop, x1, 93, K); for (let y = ytop + 1; y <= 92; y++) for (let x = x0 + 1; x <= x1 - 1; x++) R.pset(x, y, (h(x >> 1, y >> 1, 80) < 0.04) ? C.oxido : x < x0 + 4 ? C.hierroL : (y - ytop) % 9 === 0 ? hex('#3a3a42') : hex('#2a2a30')); for (let x = x0 + 6; x < x1; x += 8) { R.pset(x, ytop + 3, C.hierroL); R.pset(x, 89, C.hierroL); } R.rect(x0 + 1, ytop + 1, x1 - 1, ytop + 1, C.hierroL); }
    else { R.rect(x0, ytop, x1, 93, K); R.rect(x0 + 1, ytop + 1, x1 - 1, 92, C.hierro); R.rect(x0 + 1, ytop + 1, x1 - 1, ytop + 2, C.hierroL); }
    tapa = ytop;
    // la boca abierta: el fondo oscuro, las dos cartas y las tres hojas que suben
    R.rect(x0, 93, x1, yt, K); R.rect(x0 + 2, 94, x1 - 2, yt, hex('#16161a'));
    const s = Math.max(0, Math.min(1, (e - 0.45) / 0.55)), hojas = [];
    [[138, -1], [164, 0], [190, 1]].forEach(([hx, k], i) => { const ytop2 = Math.round(yt - 4 - s * (36 + (i === 1 ? 6 : 0))); a_hojaNum(R, hx - 13, ytop2, hx + 13, ytop2 + 40, i, 1); hojas.push([hx, ytop2 + 14]); });
    for (const [lx, ly, d] of [[122, 98, -1], [206, 98, 1]]) { R.poligono([[lx - 8, ly + 6], [lx + 6, ly + 6], [lx + 8 * d, ly - 2], [lx - 6 * d, ly - 2]], K); R.poligono([[lx - 7, ly + 5], [lx + 5, ly + 5], [lx + 7 * d - d, ly - 1], [lx - 5 * d, ly - 1]], C.papelV); R.disco(lx, ly + 2, 2, C.rojo); R.pset(lx - 1, ly + 1, hex('#e86a6a')); }
    a_cajaCuerpo(R, x0, x1, yt, yb, true, roto);
    if (roto || ab > 0) a_candado(R, 242, 152, true, t);
    return { cerradura: [cx, 125], hojas, tapa, caja: [x0, tapa, x1, yb], candado: [242, 152] };
  }
  // cerrada: la tapa abombada con su canto, y el cuerpo con el candado colgado del pasador
  R.rect(x0 - 4, 88, x1 + 4, yt + 1, K); for (let y = 89; y < yt; y++) for (let x = x0 - 3; x <= x1 + 3; x++) { const u = (x - x0) / (x1 - x0); let c = y < 92 ? (u < 0.4 ? C.hierroL : C.hierro) : (u < 0.15 ? C.hierroL : u > 0.85 ? hex('#26262c') : C.hierro); if (h(x >> 1, y, 81) < 0.08) c = C.oxido; R.pset(x, y, c); }
  R.rect(x0 - 3, 89, x1 + 3, 89, hex('#8a8a96')); R.rect(x0 - 3, yt - 1, x1 + 3, yt - 1, hex('#26262c')); for (let x = x0 + 4; x < x1; x += 7) { R.pset(x, 101, C.hierroL); R.pset(x + 1, 102, K); }
  a_cajaCuerpo(R, x0, x1, yt, yb, false, roto);
  if (roto) a_candado(R, 242, 152, true, t); else a_candado(R, cx, 112, false, t);
  return { cerradura: [cx, 125], hojas: null, tapa: 88, caja: [x0, 88, x1, yb], candado: roto ? [242, 152] : [cx, 124] };
}

// el cuerpo de la caja de hierro: el frente con su textura y su óxido, los flejes con remaches, las asas de aro, el
// pasador del candado (abierto o cerrado)
function a_cajaCuerpo(R, x0, x1, yt, yb, abierta, roto) {
  const L = a_L, K = C.k, cx = (x0 + x1) >> 1;
  R.rect(x0 - 2, yt, x1 + 2, yb, K);
  for (let y = yt + 1; y < yb; y++) for (let x = x0 - 1; x <= x1 + 1; x++) { const u = (x - x0) / (x1 - x0), v = h(x >> 1, y >> 1, 82), w = h(x >> 3, y >> 3, 83);
    let c = u < 0.12 ? C.hierroL : u > 0.86 ? hex('#28282e') : C.hierro; if (v < 0.1) c = hex('#2e2e36'); if (v > 0.93) c = hex('#56565e');
    if (w < 0.12 && v < 0.4) c = C.oxido; if (w < 0.07 && v < 0.2) c = L.oxL; if (y > yb - 6 && v < 0.3) c = C.oxido; R.pset(x, y, c); }
  // los flejes verticales y horizontales con sus remaches
  for (const fx of [x0 + 12, x1 - 12]) { R.rect(fx - 4, yt + 1, fx + 4, yb - 1, K); R.rect(fx - 3, yt + 1, fx + 3, yb - 1, hex('#4a4a54')); R.rect(fx - 3, yt + 1, fx - 2, yb - 1, hex('#7a7a86')); for (let y = yt + 5; y < yb - 2; y += 7) { R.rect(fx - 1, y, fx, y + 1, hex('#9a9aa6')); R.pset(fx + 1, y + 1, K); } }
  for (const fy of [yt + 2, yb - 4]) { R.rect(x0 - 1, fy - 1, x1 + 1, fy + 2, K); R.rect(x0 - 1, fy, x1 + 1, fy + 1, hex('#4a4a54')); R.rect(x0 - 1, fy, x1 + 1, fy, hex('#7a7a86')); for (let x = x0 + 3; x < x1; x += 8) { R.pset(x, fy, hex('#a8a8b4')); } }
  // las asas de aro de los costados
  for (const [ax, d] of [[x0 - 2, -1], [x1 + 2, 1]]) { R.rect(ax, 118, ax + d * 2, 122, K); for (let a = 0; a <= Math.PI; a += 0.15) R.pset(Math.round(ax + d * (2 + Math.sin(a) * 5)), Math.round(120 + Math.cos(a) * 6), a < 1 ? C.hierroL : K); }
  // el pasador: la placa que baja de la tapa con su argolla
  if (!abierta) { R.rect(cx - 7, yt - 10, cx + 7, yt + 8, K); R.rect(cx - 6, yt - 9, cx + 6, yt + 7, hex('#4a4a54')); R.rect(cx - 6, yt - 9, cx - 5, yt + 7, hex('#7a7a86')); R.pset(cx - 4, yt - 7, hex('#a8a8b4')); R.pset(cx + 4, yt - 7, hex('#a8a8b4')); R.rect(cx - 2, yt + 2, cx + 2, yt + 9, K); R.rect(cx - 1, yt + 3, cx + 1, yt + 8, C.hierroL); R.rect(cx - 1, yt + 5, cx + 1, yt + 6, K); }
  else { R.rect(cx - 7, yt + 1, cx + 7, yt + 16, K); R.rect(cx - 6, yt + 2, cx + 6, yt + 15, hex('#4a4a54')); R.rect(cx - 6, yt + 2, cx - 5, yt + 15, hex('#7a7a86')); R.rect(cx - 2, yt + 12, cx + 2, yt + 13, C.hierroL); }
  // el ojo de la cerradura de la propia caja, debajo del pasador
  R.rect(cx - 5, 132, cx + 5, 142, K); R.rect(cx - 4, 133, cx + 4, 141, L.latonS); R.rect(cx - 4, 133, cx + 4, 133, L.laton); R.disco(cx, 136, 1.5, K); R.rect(cx, 137, cx, 140, K);
}

// el candado grande: cuerpo de hierro con la placa de latón y el ojo, el arco que pasa por la argolla; roto: tirado en
// la mesa con el arco partido y unas esquirlas
function a_candado(R, x, y, roto, t) {
  const L = a_L, K = C.k;
  if (!roto) {
    for (let a = Math.PI; a <= Math.PI * 2; a += 0.06) for (const r of [8, 9, 10]) R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.9), r === 10 ? K : r === 8 ? K : C.hierroL);
    for (const sx of [x - 9, x + 9]) R.rect(sx - 1, y, sx + 1, y + 4, K), R.pset(sx, y + 1, C.hierroL);
    R.rect(x - 12, y + 3, x + 12, y + 24, K); for (let j = 0; j < 4; j++) R.rect(x - 11 + j, y + 24 + j, x + 11 - j, y + 24 + j, K);
    for (let yy = y + 4; yy <= y + 26; yy++) for (let xx = x - 11; xx <= x + 11; xx++) { if (yy > y + 23 && Math.abs(xx - x) > 11 - (yy - y - 23)) continue; const u = (xx - x + 11) / 22; R.pset(xx, yy, u < 0.2 ? hex('#7a7a86') : u > 0.8 ? hex('#26262c') : C.hierro); }
    R.rect(x - 7, y + 8, x + 7, y + 20, K); R.rect(x - 6, y + 9, x + 6, y + 19, L.laton); R.rect(x - 6, y + 9, x + 6, y + 9, L.latonL); R.rect(x - 6, y + 19, x + 6, y + 19, L.latonS);
    R.disco(x, y + 13, 2.2, K); R.rect(x - 1, y + 14, x + 1, y + 18, K);
    if (Math.sin(t * 1.7) > 0.92) { R.pset(x - 9, y + 5, L.blL); R.pset(x - 10, y + 5, L.latonL); R.pset(x - 9, y + 4, L.latonL); }
    for (let k = 0; k < 4; k++) R.pset(x - 9 + k * 6, y + 22, C.oxido);
    return;
  }
  // roto: el cuerpo tirado en la mesa con el arco partido (un muñón sigue en el cuerpo y el otro trozo está suelto) y esquirlas
  R.rect(x - 12, y - 10, x + 12, y + 10, K); for (let j = 0; j < 3; j++) R.rect(x - 11 + j, y + 10 + j, x + 11 - j, y + 10 + j, K);
  for (let yy = y - 9; yy <= y + 12; yy++) for (let xx = x - 11; xx <= x + 11; xx++) { if (yy > y + 9 && Math.abs(xx - x) > 11 - (yy - y - 9)) continue; const u = (xx - x + 11) / 22; R.pset(xx, yy, u < 0.2 ? hex('#7a7a86') : u > 0.8 ? hex('#26262c') : C.hierro); }
  R.rect(x - 7, y - 6, x + 7, y + 6, K); R.rect(x - 6, y - 5, x + 6, y + 5, L.laton); R.rect(x - 6, y - 5, x + 6, y - 5, L.latonL); R.disco(x, y - 1, 2.2, K); R.rect(x - 1, y, x + 1, y + 4, K);
  for (const r of [7, 8, 9]) for (let a = Math.PI; a <= Math.PI * 1.45; a += 0.05) R.pset(Math.round(x + Math.cos(a) * r), Math.round(y - 10 + Math.sin(a) * r), r === 8 ? C.hierroL : K);
  R.rect(x - 9, y - 12, x - 7, y - 10, K);
  for (const r of [6, 7, 8]) for (let a = -0.3; a <= 1.5; a += 0.05) R.pset(Math.round(x + 24 + Math.cos(a + 2.2) * r), Math.round(y + 6 + Math.sin(a + 2.2) * r * 0.8), r === 7 ? C.hierroL : K);
  for (const [dx, dy] of [[-17, 9], [16, 11], [21, -2], [-15, -4], [4, -16]]) { R.pset(x + dx, y + dy, C.hierroL); R.pset(x + dx + 1, y + dy, K); }
}

function a_cajaFondo(R) {
  const L = a_L, K = C.k;
  // el papel pintado en penumbra (arriba a la derecha, tranquilo) y los casilleros del escritorio, grandes y cerca
  for (let y = 0; y <= 60; y++) for (let x = 0; x < 320; x++) { let c = (x % 16 < 8) ? L.tapizS : hex('#4e5a40'); if (x > 262) c = hex('#4e5a40'); R.pset(x, y, a_mez(c, K, 0.35 + (x > 262 ? 0.1 : 0))); }
  R.rect(14, 22, 266, 112, K); R.rect(15, 23, 265, 111, L.caoba); R.rect(12, 20, 268, 24, K); R.rect(13, 21, 267, 22, L.caobaL);
  for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) { const x = 20 + i * 41, y = 28 + j * 40; R.rect(x, y, x + 37, y + 36, K); R.rect(x + 1, y + 1, x + 36, y + 36, hex('#1e120c')); R.rect(x + 1, y + 1, x + 36, y + 3, hex('#140c08'));
    const k = h(i, j, 84);
    if (k < 0.4) { for (let n = 0; n < 4; n++) { const yy = y + 14 + n * 5; R.rect(x + 3, yy, x + 33, yy + 4, K); R.rect(x + 4, yy + 1, x + 32, yy + 3, n % 2 ? C.papel : C.papelV); } R.rect(x + 16, y + 12, x + 18, y + 36, C.rojo); }
    else if (k < 0.7) { R.rect(x + 4, y + 8, x + 14, y + 36, K); R.rect(x + 5, y + 9, x + 13, y + 36, C.papelV); R.rect(x + 18, y + 16, x + 32, y + 36, K); R.rect(x + 19, y + 17, x + 31, y + 36, C.papel); R.rect(x + 21, y + 20, x + 29, y + 20, L.papelS); R.rect(x + 21, y + 23, x + 27, y + 23, L.papelS); }
    else { for (let n = 0; n < 3; n++) { R.disco(x + 8 + n * 10, y + 30, 4, K); R.disco(x + 8 + n * 10, y + 30, 3, C.papel); R.disco(x + 8 + n * 10, y + 30, 1, L.papelS); } R.rect(x + 3, y + 22, x + 33, y + 25, L.alfR); } }
  R.rect(15, 106, 265, 111, L.caobaS);
  for (let y = 22; y <= 112; y++) for (let x = 268; x < 320; x++) R.pset(x, y, a_mez(hex('#4e5a40'), K, 0.45));
  // el tablero del escritorio: vetas, el secante de piel verde con su filete dorado, papeles y la pluma
  for (let y = 112; y <= 179; y++) for (let x = 0; x < 320; x++) { const g = h(Math.floor(x / 26), Math.floor((y - 112) / 2) + Math.round(Math.sin(x * 0.04 + y * 0.2)), 85); let c = g < 0.25 ? L.caobaS : g > 0.86 ? L.caobaL : L.caoba; R.pset(x, y, c); }
  R.rect(0, 112, 319, 113, K);
  R.rect(56, 130, 278, 176, K); R.rect(57, 131, 277, 175, L.verde); for (let y = 131; y <= 175; y++) for (let x = 57; x <= 277; x++) if (h(x >> 1, y >> 1, 86) < 0.12) R.pset(x, y, L.verdeS);
  R.rect(60, 134, 274, 134, L.laton); R.rect(60, 172, 274, 172, L.laton); R.rect(60, 134, 60, 172, L.laton); R.rect(274, 134, 274, 172, L.laton);
  R.poligono([[232, 150], [276, 146], [282, 170], [238, 176]], K); R.poligono([[233, 151], [275, 147], [280, 169], [239, 175]], C.papel); for (let k = 0; k < 4; k++) R.linea(240, 156 + k * 5, 272, 152 + k * 5, L.papelS);
  R.rect(282, 128, 300, 142, K); R.rect(283, 129, 299, 141, hex('#2a2a3a')); R.rect(285, 131, 288, 139, hex('#5a5a74')); R.rect(287, 126, 295, 128, K);
  R.linea(292, 127, 312, 92, K); R.linea(293, 127, 313, 93, L.blL); for (let k = 0; k < 16; k++) { R.pset(300 + k, 113 - Math.round(k * 1.7), L.bl); R.pset(301 + k, 114 - Math.round(k * 1.7), L.nM); }
  R.disco(84, 160, 6, K); R.disco(84, 160, 5, C.hierroL); R.disco(84, 160, 4, K); R.linea(88, 163, 104, 168, K); R.linea(88, 162, 104, 167, C.hierroL); R.rect(102, 167, 104, 171, C.hierroL); R.linea(80, 165, 74, 176, K); R.linea(81, 165, 75, 176, L.laton); R.rect(73, 175, 76, 178, L.laton);
  // la lámpara de aceite: el pie de latón, el depósito de cristal, la galería y el tubo
  R.rect(26, 158, 54, 164, K); R.rect(27, 159, 53, 163, L.laton); R.rect(27, 159, 53, 159, L.latonL); R.rect(36, 146, 44, 158, K); R.rect(37, 147, 43, 157, L.laton); R.rect(37, 147, 38, 157, L.latonL);
  R.disco(40, 134, 12, K); R.disco(40, 134, 11, hex('#c8a870')); R.disco(36, 130, 4, hex('#f0e0b0')); R.rect(30, 140, 50, 146, hex('#a8885a'));
  R.rect(32, 118, 48, 123, K); R.rect(33, 119, 47, 122, L.laton);
  for (let y = 80; y <= 118; y++) { const w = y < 96 ? 5 : y < 104 ? 5 + (y - 96) * 0.5 : y < 112 ? 9 : 9 - (y - 112); for (let x = Math.round(40 - w); x <= 40 + w; x++) { const b = x === Math.round(40 - w) || x === Math.round(40 + w); if (b) R.pset(x, y, hex('#d8d0c0')); else a_tin(R, x, y, hex('#fff2d0'), 0.38); } R.pset(Math.round(42 - w * 0.5), y, L.blL); }
}

// la trama de Bayer 4 × 4 (umbral 0–1) y su uso para elegir tono en una rampa sin franjas lisas
const b_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_um = (x, y) => b_BAY[((y & 3) << 2) | (x & 3)];

const b_lim = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);

// mezcla dos colores (formato del lienzo: 0xAABBGGRR)
function b_mez(a, b, f) {
  const r = (a & 255) + (((b & 255) - (a & 255)) * f), g = ((a >> 8) & 255) + ((((b >> 8) & 255) - ((a >> 8) & 255)) * f), bl = ((a >> 16) & 255) + ((((b >> 16) & 255) - ((a >> 16) & 255)) * f);
  return (0xff000000 | ((bl & 255) << 16) | ((g & 255) << 8) | (r & 255)) >>> 0;
}

// el tono de una rampa P para l 0–1, tramado
function b_tono(P, l, x, y) { const n = P.length - 1; const i = Math.floor(l * n + b_um(x, y)); return P[i < 0 ? 0 : i > n ? n : i]; }

const b_hx = (l) => l.map(hex);

// los búferes de lo fijo, uno por clave (encuadre y luz)
const b_CAPAS = new Map();

function b_capa(R, clave, dibuja) { let b = b_CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); b_CAPAS.set(clave, b); } return b; }

// interpola una polilínea [[x, y], …] ordenada por x
function b_interp(P, x) { if (x <= P[0][0]) return P[0][1]; for (let i = 1; i < P.length; i++) if (x <= P[i][0]) { const [x0, y0] = P[i - 1], [x1, y1] = P[i]; return y0 + (y1 - y0) * (x - x0) / (x1 - x0); } return P[P.length - 1][1]; }

// una elipse rellena; col puede ser función (x, y, u, v) con u, v de −1 a 1
function b_elipse(R, cx, cy, rx, ry, col) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) { const v = (y + 0.5 - cy) / ry; if (v * v >= 1) continue; const w = rx * Math.sqrt(1 - v * v);
    for (let x = Math.ceil(cx - w - 0.5); x <= Math.floor(cx + w - 0.5); x++) { const c = typeof col === 'function' ? col(x, y, (x + 0.5 - cx) / rx, v) : col; if (c != null) R.pset(x, y, c); } }
}

const b_PAL = {
  // la pradera y su cielo de primavera
  cieloLl: b_hx(['#4a78bc', '#5684c4', '#6492cc', '#76a2d4', '#8ab2da', '#a2c2e0', '#bcd2e4', '#d4e0e2', '#e6e8d8']),
  cumulo: b_hx(['#8e9cba', '#b4c0d4', '#dce2ec', '#f6f8fa']),
  cirro: b_hx(['#a8c0dc', '#cadaea', '#eef2f4']),
  mesaLej: b_hx(['#8a90b0', '#9aa0bc', '#aeb2c8', '#c4c4d0']),
  pradera: b_hx(['#3e5a24', '#4e6c2a', '#5e7e32', '#70903a', '#86a046', '#9cac58', '#b0b46c', '#c2bc80']),
  alamo: b_hx(['#2e4a26', '#3e6030', '#56783a', '#72944a', '#94b060']),
  agua: b_hx(['#4a6a84', '#7a9cb8', '#a8c6dc', '#d8e8f0']),
  bufalo: b_hx(['#1e130c', '#33200f', '#4a2e18', '#64402a', '#7e5634', '#9a6e44']),
  flores: b_hx(['#f0d040', '#b07ad0', '#f4f0e0', '#e06a50', '#f0a040']),
  // el barranco al atardecer
  cieloTa: b_hx(['#221e4a', '#2c2456', '#3a2c62', '#4e346c', '#683c74', '#8a4876', '#b05a78', '#d06e70', '#e48864', '#f0a660', '#f6c470', '#fadc90']),
  cieloDi: b_hx(['#3e70bc', '#4a7cc4', '#5a8acc', '#6c9ad2', '#82acda', '#9cbee0', '#b8d0e4', '#d4e0e4', '#e8e6dc']),
  rocaTa: b_hx(['#2a1a2c', '#3a2232', '#4c2a36', '#603238', '#783e3a', '#92503e', '#ac6444', '#c47a4c', '#da9458', '#eeb070']),
  rocaDi: b_hx(['#4a2a22', '#62342a', '#7c4030', '#964e36', '#ae5e3e', '#c27048', '#d48656', '#e2a068', '#eebc84', '#f6d4a2']),
  arenaTa: b_hx(['#36222a', '#462c30', '#583836', '#6c463c', '#825644', '#9a6a50', '#b48060']),
  arenaDi: b_hx(['#7a5a44', '#94704e', '#ac8458', '#c09a68', '#d2b07a', '#e2c690']),
  pino: b_hx(['#1a2620', '#24362a', '#324a32', '#46603a', '#5e7644']),
  lona: b_hx(['#5a4a48', '#7a6658', '#9a8468', '#bca47e', '#dcc494', '#f0dca8']),
  oro: b_hx(['#6a4a1a', '#a87820', '#d8a02a', '#f0c040', '#ffe070', '#fff6c8']),
  fuego: b_hx(['#a02a10', '#d8501a', '#f08a24', '#ffc040', '#fff0a0']),
  // el camino en otoño
  cieloOt: b_hx(['#5284c4', '#5e90ca', '#6e9cd0', '#82aad6', '#98badc', '#b0cae0', '#c8d8e2', '#dee4e0', '#eee8d6']),
  cresta: b_hx(['#6e82a4', '#7c90b0', '#8c9ebc', '#a0b0c8', '#b8c4d4']),
  otono: b_hx(['#6a2a1c', '#a8442a', '#c8683a', '#e09040', '#ecb85a', '#8a8a3a', '#5a6a32', '#34503a']),
  seca: b_hx(['#5a4a2c', '#6e5c34', '#84703e', '#9a844a', '#b09858', '#c4ac6a', '#d6c080']),
  tierra: b_hx(['#4a3424', '#5e4430', '#74563c', '#8a6a4a', '#a0805a', '#b49670']),
};

// largo; o.pasta (cabeza baja), o.anda (patas que se mueven), k (semilla: fase de la cola y de la cabeza)
function b_bufalo(R, x, suelo, s, dir, t, k, o = {}) {
  const P = b_PAL.bufalo, X = (i) => x + dir * i * s, Y = (j) => suelo - j * s;
  if (s < 0.6) {   // lejos: una mancha de 4–6 px con la joroba y la cabeza
    const xi = Math.round(x), yi = Math.round(suelo), d = dir;
    R.rect(xi - 2, yi - 2, xi + 2, yi - 1, P[1]); R.pset(xi + d, yi - 3, P[2]); R.pset(xi, yi - 3, P[2]); R.pset(xi + 3 * d, yi - (o.pasta ? 0 : 1), P[0]);
    R.pset(xi - 2, yi - 2, P[3]); R.pset(xi - 1, yi - 2, P[3]); R.pset(xi - 2, yi, P[0]); R.pset(xi + 1, yi, P[0]); return;
  }
  const pasta = o.pasta ? 1 : 0, paso = o.anda ? Math.sin(t * 5 + k) : 0, sw = Math.sin(t * 2.2 + k * 1.7);
  // las patas: las del otro lado más oscuras, las de este lado con la pezuña
  const pata = (dx, fase, c) => { const x0 = X(dx), x1 = X(dx + fase * 0.9); R.linea(Math.round(x0), Math.round(Y(3.6)), Math.round(x1), Math.round(Y(0.4)), c); if (s >= 1.5) R.linea(Math.round(x0) + 1, Math.round(Y(3.6)), Math.round(x1) + 1, Math.round(Y(0.4)), c); R.pset(Math.round(x1), Math.round(suelo), P[0]); };
  pata(3.1, -paso, P[0]); pata(-3.6, paso, P[0]); pata(4.2, paso, P[1]); pata(-2.6, -paso, P[1]);
  // la cola, que se mece
  const cx0 = X(-6.2), cy0 = Y(7); R.linea(Math.round(cx0), Math.round(cy0), Math.round(cx0 - dir * s * (0.6 + 0.5 * sw)), Math.round(cy0 + 3.4 * s), P[0]);
  // el contorno y luego el cuerpo de atrás (pelo corto, más claro) y la joroba de lana (oscura, con la luz arriba)
  const ry = 2.9 * s, hx = X(1.6), hy = Y(6.9) + pasta * 0.4 * s;
  b_elipse(R, X(-2.4), Y(6.1), 4.6 * s + 0.8, ry + 0.8, P[0]); b_elipse(R, hx, hy, 4.4 * s + 0.8, 4.1 * s + 0.8, P[0]);
  b_elipse(R, X(-2.4), Y(6.1), 4.6 * s, ry, (px, py, u, v) => b_tono(P, 0.62 - v * 0.32 - u * dir * 0.04 + (((px * 7 + py * 3) & 3) === 0 ? 0.1 : 0), px, py));
  b_elipse(R, hx, hy, 4.4 * s, 4.1 * s, (px, py, u, v) => { const lana = Math.sin(px * 1.7 + py * 2.3) * 0.08 + (((px + py * 2) % 3) === 0 ? -0.08 : 0); return b_tono(P, 0.38 - v * 0.36 + lana + (v < -0.6 ? 0.18 : 0), px, py); });
  // la cabeza baja, la barba, el cuerno y el ojo
  const cab = X(5.6), cyc = Y(4.6 - pasta * 2.6) + (o.pasta ? 0 : Math.sin(t * 1.3 + k) * 0.3 * s);
  b_elipse(R, cab, cyc, 2.2 * s + 0.6, 2.4 * s + 0.6, P[0]); b_elipse(R, cab, cyc, 2.2 * s, 2.4 * s, (px, py, u, v) => b_tono(P, 0.28 - v * 0.2 + u * dir * 0.06, px, py));
  R.linea(Math.round(cab - dir * s), Math.round(cyc + 2.2 * s), Math.round(cab + dir * 0.4 * s), Math.round(cyc + 3.2 * s), P[0]);
  R.pset(Math.round(cab + dir * 0.6 * s), Math.round(cyc - 2.4 * s), hex('#d8ccb0')); if (s >= 1.3) R.pset(Math.round(cab + dir * 0.6 * s), Math.round(cyc - 2.4 * s) - 1, hex('#f0e8d0'));
  R.pset(Math.round(cab + dir * 1.1 * s), Math.round(cyc - 0.6 * s), hex('#0e0806'));
}

// suelo = los cascos. o.dir (1 mira a la derecha), o.mula (orejas largas y hocico claro), o.carga (albarda con dos alforjas
// abultadas y un fardo atado encima), o.anda (paso), o.come (cabeza baja, pastando), o.color 'bayo' | 'tordo' | 'pinto'
// | 'pardo'; la cola se mece siempre. EXPORTADA: la escena la usa para la recua de mulas de primer término.
export function b_mula(R, x, suelo, t, o = {}) { b_equino(R, x, suelo, t, { mula: true, carga: true, color: 'pardo', ...o }); return {}; }

const b_EQUI = {
  bayo: b_hx(['#1e120c', '#4a2a16', '#6a3e20', '#8a5430', '#a86c40', '#c08a58']),
  tordo: b_hx(['#2a2a30', '#6a6a72', '#8e8e94', '#b0aeac', '#cecac4', '#e8e4dc']),
  pinto: b_hx(['#1e120c', '#5a3218', '#7a4a26', '#9a6236', '#e2dccc', '#f6f2e6']),
  pardo: b_hx(['#1e1614', '#4a3a32', '#62504a', '#7c6a60', '#988474', '#b4a090']),
};

function b_equino(R, x, suelo, t, o = {}) {
  const P = b_EQUI[o.color] ?? b_EQUI.bayo, d = o.dir ?? 1, X = (i) => Math.round(x + d * i), k = (o.k ?? 0) + x * 0.13;
  const paso = o.anda ? Math.sin(t * 6 + k) : 0, come = o.come ? 1 : 0, crin = P[0];
  const pinto = o.color === 'pinto';
  const tonoC = (px, py, l) => (pinto && Math.sin(px * 0.5) + Math.sin(py * 0.7 + px * 0.2) > 0.6 ? b_tono(P, 0.75 + l * 0.25, px, py) : b_tono(P.slice(1, 5), l, px, py));
  // las patas (las del otro lado, más oscuras) con su rodilla y el casco
  const pata = (dx, f, c) => { const x0 = X(dx), x1 = X(dx + f * 1.6); R.linea(x0, suelo - 9, Math.round((x0 + x1) / 2), suelo - 4, c); R.linea(Math.round((x0 + x1) / 2), suelo - 4, x1, suelo - 1, c); R.pset(x1, suelo, P[0]); };
  pata(6, -paso, P[1]); pata(-6, paso, P[1]); pata(8, paso, P[2]); pata(-8, -paso, P[2]); pata(8 + 0.01, paso, P[2]);
  // la cola, que se mece
  const sw = Math.sin(t * 2.6 + k) * 1.6;
  for (let j = 0; j < 10; j++) { const xx = X(-10.5 - j * 0.18) - Math.round(d * sw * (j / 10) * (j / 10) * 1.5), yy = suelo - 15 + j; R.pset(xx, yy, crin); if (j > 2 && j < 8) R.pset(xx - d, yy, P[1]); }
  // el cuerpo, con contorno y luz por arriba
  b_elipse(R, x, suelo - 12.5, 11.2, 5.3, P[0]); b_elipse(R, x, suelo - 12.5, 10.4, 4.5, (px, py, u, v) => tonoC(px, py, 0.72 - v * 0.42 - (v > 0.55 ? 0.2 : 0)));
  // el cuello y la cabeza (alta, o baja pastando)
  const hx = x + d * (come ? 16 : 13.5), hy = suelo - (come ? 5 : 21);
  const n = 7; for (let i = 0; i <= n; i++) { const u = i / n, cx = x + d * (7 + u * (hx - d * 2.2 - x - d * 7) * d), cy = suelo - 14 + u * (hy + 1 - (suelo - 14)), r = 3.2 - u * 0.9; R.disco(cx, cy, r + 0.8, P[0]); }
  for (let i = 0; i <= n; i++) { const u = i / n, cx = x + d * (7 + u * (hx - d * 2.2 - x - d * 7) * d), cy = suelo - 14 + u * (hy + 1 - (suelo - 14)), r = 3.2 - u * 0.9; R.disco(cx, cy, r, (px, py) => tonoC(px, py, 0.6 - (py - cy) / r * 0.25)); }
  const hrx = come ? 2.6 : 4, hry = come ? 3.8 : 2.6; b_elipse(R, hx + d * 1, hy, hrx, hry, P[0]); b_elipse(R, hx + d * 1, hy, hrx - 0.7, hry - 0.7, (px, py, u, v) => ((come ? v > 0.5 : u * d > 0.55) && o.mula ? P[5] : tonoC(px, py, 0.62 - v * 0.3)));
  if (come) { R.pset(Math.round(hx + d * 1.5), Math.round(hy - 1), hex('#0e0806')); R.pset(Math.round(hx + d * 1), Math.round(hy + 3), P[0]); } else { R.pset(Math.round(hx + d * 0.4), Math.round(hy - 1), hex('#0e0806')); R.pset(Math.round(hx + d * 3.6), Math.round(hy + 0.5), P[0]); }
  // las orejas (largas en la mula) y la crin
  const ox = Math.round(hx - d * (come ? 0.6 : 1.6)), oy = Math.round(hy - (come ? 3 : 2)), lo = o.mula ? 4 : 2, tw = Math.sin(t * 1.7 + k) > 0.8 ? 1 : 0;
  for (let j = 1; j <= lo; j++) { R.pset(ox - d * (j > 2 ? tw : 0), oy - j, j === lo ? P[0] : P[2]); R.pset(ox - d * 2 - d * (j > 2 ? 1 : 0), oy - j + 1, P[1]); }
  if (!o.mula) for (let i = 0; i <= 6; i++) { const u = i / 6, cx = Math.round(x + d * (6 + u * (Math.abs(hx - x) - 8))), cy = Math.round(suelo - 17 + u * (hy - (suelo - 17)) - 1); R.pset(cx - d, cy, crin); R.pset(cx - d, cy + 1, crin); }
  else for (let i = 0; i <= 6; i++) { const u = i / 6, cx = Math.round(x + d * (6 + u * (Math.abs(hx - x) - 8))), cy = Math.round(suelo - 17 + u * (hy - (suelo - 17)) - 1); R.pset(cx - d, cy, P[1]); }
  // la albarda con las alforjas abultadas, las cuerdas y un fardo encima (la carga pesada)
  if (o.carga) {
    const L = b_PAL.lona, cu = hex('#6a4a2a');
    R.linea(X(-3), suelo - 20, X(1), suelo - 16, hex('#5a3a1e')); R.linea(X(1), suelo - 20, X(-3), suelo - 16, hex('#5a3a1e'));   // el aspa de madera
    b_elipse(R, X(-1), suelo - 19, 5.5, 2.4, L[0]); b_elipse(R, X(-1), suelo - 19, 4.8, 1.8, (px, py, u, v) => b_tono(L, 0.5 - v * 0.3, px, py));   // el fardo
    R.rect(Math.min(X(-6), X(4)), suelo - 16, Math.max(X(-6), X(4)), suelo - 7, L[0]);
    for (let yy = suelo - 15; yy <= suelo - 8; yy++) for (let i = -5; i <= 3; i++) { const xx = X(i), v = (yy - (suelo - 15)) / 7, u = (i + 1) / 4.5; R.pset(xx, yy, b_tono(L, 0.85 - v * 0.55 - u * u * 0.15 - (i === -5 || i === 3 ? 0.2 : 0), xx, yy)); }
    R.linea(X(-5), suelo - 12, X(3), suelo - 12, cu); R.linea(X(-1), suelo - 16, X(-1), suelo - 7, cu); R.pset(X(-1), suelo - 12, hex('#3a2a16'));
    R.linea(X(-7), suelo - 9, X(5), suelo - 9, hex('#4a3020'));   // la cincha
  }
}

// una figurita de fondo (8–10 px): sombrero, cara, camisa, pantalón. o.accion 'anda' | 'pico' | 'saco' | 'criba' | null
function b_mini(R, x, suelo, t, o = {}) {
  const d = o.dir ?? 1, X = (i) => Math.round(x + d * i), cam = o.camisa ?? hex('#a8443a'), pan = hex('#3a3a52'), piel = hex('#d8a078'), som = o.sombrero ?? hex('#4a3424');
  const f = o.accion === 'anda' || o.accion === 'saco' ? Math.floor(t * 6 + x) % 2 : 0, y = Math.round(suelo);
  R.pset(X(-1 + f), y, pan); R.pset(X(1 - f), y, pan); R.pset(X(-1 + f), y - 1, pan); R.pset(X(1 - f), y - 1, pan); R.rect(Math.min(X(-1), X(1)), y - 3, Math.max(X(-1), X(1)), y - 2, pan);
  R.rect(Math.min(X(-1), X(1)), y - 6, Math.max(X(-1), X(1)), y - 4, cam); R.pset(X(0), y - 7, piel); R.pset(X(1), y - 7, piel);
  R.rect(Math.min(X(-2), X(2)), y - 8, Math.max(X(-2), X(2)), y - 8, som); R.pset(X(0), y - 9, som); R.pset(X(1), y - 9, som);
  if (o.accion === 'pico') { const a = Math.sin(t * 5 + x) > 0; if (a) { R.linea(X(1), y - 6, X(3), y - 10, hex('#8a6a40')); R.linea(X(2), y - 11, X(4), y - 9, hex('#9aa0a8')); } else { R.linea(X(1), y - 5, X(4), y - 3, hex('#8a6a40')); R.linea(X(4), y - 5, X(5), y - 1, hex('#9aa0a8')); } }
  else if (o.accion === 'saco') { R.rect(Math.min(X(-2), X(0)), y - 9, Math.max(X(-2), X(0)), y - 7, hex('#c8b48a')); R.pset(X(-1), y - 10, hex('#a8946a')); }
  else if (o.accion === 'criba') { const m = Math.round(Math.sin(t * 6) * 1); R.linea(X(1), y - 5, X(3 + m), y - 4, piel); }
}

// un cúmulo de tres tonos con la base plana (cx, base, ancho), iluminado desde arriba a la izquierda; dentro(x, y) recorta
function b_cumulo(R, cx, base, w, sem, P, dentro = null) {
  const n = 2 + Math.floor(w / 9), D = [];
  for (let i = 0; i < n; i++) { const u = n === 1 ? 0.5 : i / (n - 1), r = w * (0.15 + 0.13 * Math.sin(Math.PI * u)) * (0.8 + h(i, sem, 31) * 0.4); D.push([cx + (u - 0.5) * w * 0.78 + (h(i, sem, 32) - 0.5) * 3, base - r * 0.55, r]); }
  let top = base; for (const [, cy, r] of D) top = Math.min(top, cy - r); const H = base - top;
  for (let y = Math.floor(top); y <= base; y++) for (let x = Math.floor(cx - w * 0.62); x <= Math.ceil(cx + w * 0.62); x++) {
    let dd = -1, l = 0; for (const [dx, dy, r] of D) { const q = ((x - dx) ** 2 + (y - dy) ** 2) / (r * r); if (q < 1 && (dd < 0 || dy - r < dd)) { dd = dy - r; l = 0.95 - (y - (dy - r)) / (2 * r) * 0.8 - (x - dx) / r * 0.15 + (q > 0.8 ? -0.12 : 0); } }
    if (dd < 0) continue; if (dentro && !dentro(x, y)) continue;
    if (y >= base - 1) l -= 0.35; l += (1 - (y - top) / H) * 0.2;
    R.pset(x, y, b_tono(P, b_lim(l), x, y));
  }
}

const b_HORLL = { general: 94, manada: 74 };

// el arroyo de la llanura: centro y ancho por fila
const b_arroyo = (y) => { const u = (y - 95) / 32; return [72 - u * 60 + Math.sin(u * 7) * 9, 0.8 + u * 5]; };

function b_llanuraFijo(R, cam) {
  const HOR = b_HORLL[cam], B = R.buf, P = b_PAL, man = cam === 'manada';
  // el cielo tramado (sin franjas: la rampa se tuerce con un ruido suave)
  for (let y = 0; y < HOR; y++) for (let x = 0; x < 320; x++) { const l = y / HOR + Math.sin(x * 0.02 + y * 0.05) * 0.015 + (h(x >> 3, y >> 2, 3) - 0.5) * 0.03; B[y * 320 + x] = b_tono(P.cieloLl, l, x, y); }
  if (!man) {
    // las mesas del fondo, azuladas por la distancia, con su cara en sombra y estratos tenues
    for (const [x0, x1, top, k] of [[146, 214, 80, 1], [222, 262, 85, 2], [12, 58, 84, 3], [92, 116, 88, 4], [268, 300, 88, 5]]) {
      for (let x = x0 - 6; x <= x1 + 6; x++) { const tal = x < x0 ? (x0 - x) * 1.6 : x > x1 ? (x - x1) * 1.6 : 0, yt = Math.round(top + tal + (h(x, k, 5) < 0.2 ? 1 : 0));
        for (let y = yt; y < HOR; y++) { const lado = x > x1 - 4 ? 0.1 : x < x0 + 3 ? 0.55 : 0.35, est = (y - top) % 4 === 0 ? -0.12 : 0; B[y * 320 + x] = b_tono(P.mesaLej, lado + est + (y - top) / 40 + (y === yt ? 0.4 : 0), x, y); } } }
  } else {
    // la loma por la que asoma la manada
    for (let x = 0; x < 320; x++) { const yt = Math.round(HOR - 6 + Math.sin(x * 0.018 + 1) * 4 + Math.sin(x * 0.05) * 1.5); for (let y = yt; y < HOR; y++) B[y * 320 + x] = b_tono(P.pradera, 0.86 - (y - yt) * 0.03, x, y); }
  }
  // la pradera en tres términos: lejos rayas pálidas, en medio hierba y matas, delante tallos con luz
  for (let y = HOR; y < 180; y++) { const d = (y - HOR) / (180 - HOR);
    for (let x = 0; x < 320; x++) {
      const raya = h(Math.floor(x / (10 - d * 8)), y, 7) - 0.5, mancha = Math.sin(x * 0.03 + y * 0.11) * 0.06 + Math.sin(x * 0.011 - y * 0.05 + 2) * 0.08;
      let l = 0.95 - d * 0.62 + raya * (0.1 + d * 0.1) + mancha;
      if (d > 0.35) { const tallo = h(x, Math.floor(y / 3), 8); if (tallo > 0.86) l += 0.16; else if (tallo < 0.12) l -= 0.14; }
      B[y * 320 + x] = b_tono(P.pradera, l, x, y);
    } }
  if (!man) {
    // el arroyo con sus orillas y bancos de arena, y los álamos que lo siguen
    for (let y = 95; y < 128; y++) { const [cx, w] = b_arroyo(y);
      for (let x = Math.floor(cx - w - 2); x <= Math.ceil(cx + w + 2); x++) { if (x < 0 || x > 319) continue; const q = Math.abs(x - cx) / w;
        B[y * 320 + x] = q > 1.25 ? b_tono(P.pradera, 0.12, x, y) : q > 1 ? hex('#a89a6a') : b_tono(P.agua, 0.75 - q * 0.5 + (y - 95) / 70, x, y); } }
    for (const [x, y, r] of [[78, 95, 4], [64, 96, 5], [52, 98, 6], [86, 97, 3], [40, 103, 7], [26, 108, 8], [66, 103, 5], [10, 113, 9], [100, 96, 3], [244, 93, 3], [252, 94, 2], [236, 94, 2]]) {
      R.disco(x + 2, y + 1, r * 0.9, b_tono(P.pradera, 0.05, x, y));   // la sombra en la hierba
      R.linea(x, y, x, y - r * 0.6, hex('#5a4a3a'));
      for (let j = 0; j < 4; j++) { const bx = x + (h(j, x, 9) - 0.5) * r, by = y - r * 1.1 + (h(j, y, 9) - 0.5) * r * 0.7, br = r * (0.5 + h(j, r, 9) * 0.3);
        R.disco(bx, by, br, (px, py) => b_tono(P.alamo, 0.8 - ((py - by) / br) * 0.35 - ((px - bx) / br) * 0.2 - 0.25 + (h(px, py, 10) - 0.5) * 0.25, px, py)); } }
    // un revolcadero de búfalos (tierra pelada) y piedras
    b_elipse(R, 176, 126, 16, 3, (px, py, u, v) => b_tono(b_PAL.tierra, 0.6 - v * 0.2 + (h(px, py, 11) - 0.5) * 0.3, px, py));
    // los montículos de los perritos de las praderas
    for (const [mx, my] of [[96, 172], [206, 166], [228, 171]]) { b_elipse(R, mx, my, 6, 2.6, (px, py, u, v) => b_tono(b_PAL.tierra, 0.75 - v * 0.4, px, py)); R.rect(mx - 1, my - 1, mx + 1, my - 1, hex('#2a1a10')); }
  }
  // flores de primavera, más grandes cuanto más cerca
  for (let k = 0; k < (man ? 160 : 260); k++) { const y = Math.round(HOR + 6 + Math.pow(h(k, 1, 12), 0.7) * (180 - HOR - 6)), x = Math.floor(h(k, 2, 12) * 320), c = P.flores[Math.floor(h(k, 3, 12) * 5)];
    R.pset(x, y, c); if (y > 140) { R.pset(x + 1, y, c); R.pset(x, y + 1, b_PAL.pradera[0]); } if (y > 160) { R.pset(x, y - 1, c); R.pset(x + 1, y - 1, b_mez(c, hex('#ffffff'), 0.4)); } }
  for (let k = 0; k < 18; k++) { const x = Math.floor(h(k, 4, 13) * 320), y = Math.round(HOR + 30 + h(k, 5, 13) * (150 - HOR - 30)); b_elipse(R, x, y, 1.5 + h(k, 6, 13) * 2, 1, (px, py, u, v) => (v < 0 ? hex('#c8c0a8') : hex('#8a8270'))); }
}

function b_llanura(R, t, o) {
  const cam = o.camara === 'manada' ? 'manada' : 'general', HOR = b_HORLL[cam], P = b_PAL, man = cam === 'manada';
  R.copiar(b_capa(R, 'll|' + cam, () => b_llanuraFijo(R, cam)));
  const B = R.buf;
  // cirros altos (lentos, tenues bajo la barra del año y en la esquina de Atom)
  for (let k = 0; k < 3; k++) { const y0 = 20 + k * 7, xc = ((h(k, 1, 20) * 300 + t * (0.6 + k * 0.2)) % 380) - 40;
    for (let x = Math.max(0, Math.round(xc - 34)); x <= Math.min(319, Math.round(xc + 34)); x++) { const e = 1 - Math.abs(x - xc) / 34, yy = Math.round(y0 + (x - xc) * 0.08 + Math.sin(x * 0.2 + k) * 0.8);
      if (b_um(x + Math.floor(t), yy) < e * 0.8 && !(x > 270 && yy < 46)) B[yy * 320 + x] = b_mez(B[yy * 320 + x], P.cirro[e > 0.6 ? 2 : 1], 0.6); } }
  // cúmulos medios y bajos a dos velocidades (los bajos, pequeños, pálidos y más deprisa)
  const capas = man ? [[46, 4, 1.4, 36, 0], [60, 5, 2.6, 22, 1]] : [[58, 4, 1.3, 38, 0], [74, 5, 2.4, 22, 1], [86, 4, 3.6, 14, 2]];
  for (const [yb, n, v, w, c] of capas) for (let k = 0; k < n; k++) { const ww = w * (0.7 + h(k, c, 21) * 0.6), x = ((h(k, c, 22) * 420 + t * v) % 440) - 60;
    b_cumulo(R, x, yb + Math.round(h(k, c, 23) * 4), ww, k + c * 10, c === 2 ? [P.cumulo[1], P.cumulo[1], P.cumulo[2], P.cumulo[2]] : P.cumulo, (px, py) => py < HOR - 1 && !(px > 272 && py < 46)); }
  // un halcón que planea y golondrinas
  halcon(R, t, 150, 34, 30); bandada(R, t, { n: 3, y: 50, cada: 12, semilla: 2 });
  // el viento que ondula la hierba: rachas más claras que corren sobre la pradera
  const viento = (y0) => { const cl = hex('#d8d890'); for (let y = y0; y < 180; y++) { const d = (y - HOR) / (180 - HOR);
    for (let x = 0; x < 320; x++) { const w = Math.sin(x * 0.04 - t * 1.7 + y * 0.09 + Math.sin(y * 0.07 + x * 0.008) * 2); if (w < 0.62) continue; if (b_um(x, y) < (w - 0.62) * 2.2 * (0.4 + d)) B[y * 320 + x] = b_mez(B[y * 320 + x], cl, 0.22 + d * 0.12); } } };
  viento(HOR + 3);
  const ret = { suelo: man ? 152 : 150, libre: man ? [96, 224] : [40, 260], horizonte: HOR };
  if (!man) {
    // brillos que corren por el arroyo y hojas de álamo que titilan
    for (let k = 0; k < 9; k++) { const y = 97 + ((k * 7 + Math.floor(t * 3)) % 28), [cx, w] = b_arroyo(y), x = Math.round(cx + (h(k, y, 24) - 0.5) * w); if (Math.sin(t * 4 + k * 2) > 0.2) R.pset(x, y, P.agua[3]); }
    for (let k = 0; k < 14; k++) { const x = Math.round(8 + h(k, 1, 25) * 80), y = Math.round(90 + h(k, 2, 25) * 16); if (Math.sin(t * 5 + k * 1.3) > 0.6 && B[y * 320 + x] !== P.cieloLl[7]) R.pset(x, y, P.alamo[4]); }
    // la manada lejana, que deriva despacio
    for (let k = 0; k < 26; k++) { const x = ((h(k, 1, 26) * 150 + 92 - t * (0.4 + h(k, 2, 26) * 0.5)) % 170 + 170) % 170 + 84, y = 98 + Math.round(h(k, 3, 26) * 8); b_bufalo(R, x, y, 0.45, k % 3 ? -1 : 1, t, k, { pasta: Math.sin(t * 0.7 + k) > 0 }); }
    // los jinetes lejanos con su mula de carga y el polvo
    const jx = 330 - ((t * 5 + 40) % 400);
    for (let k = 0; k < 4; k++) { const x = Math.round(jx + k * 9), y = 103 + (k % 2), f = Math.floor(t * 6 + k) % 2;
      R.rect(x - 2, y - 3, x + 2, y - 2, k === 3 ? hex('#6a5a50') : hex('#5a3a22')); R.pset(x - 3, y - 4, hex('#5a3a22')); R.pset(x - 3, y - 5, k === 3 ? hex('#4a3a30') : hex('#5a3a22')); R.pset(x - 2 + f, y - 1, hex('#2a1a10')); R.pset(x + 2 - f, y - 1, hex('#2a1a10')); R.pset(x + 3, y - 3, hex('#2a1a10'));
      if (k < 3) { R.pset(x, y - 4, [hex('#a8443a'), hex('#3a5a8a'), hex('#8a7a4a')][k]); R.pset(x, y - 5, hex('#d8a078')); R.pset(x, y - 6, hex('#3a2a1a')); R.pset(x - 1, y - 6, hex('#3a2a1a')); R.pset(x + 1, y - 6, hex('#3a2a1a')); }
      else { R.rect(x - 1, y - 5, x + 1, y - 4, hex('#c8b48a')); }
      for (let j = 0; j < 3; j++) { const px = x + 5 + j * 2, py = y - 1 - (j & 1); if (b_um(px + Math.floor(t * 8), py) < 0.5 - j * 0.12) B[py * 320 + px] = b_mez(B[py * 320 + px], hex('#d8c8a0'), 0.6); } }
    // la manada media: pastan, levantan la cabeza, algunos andan
    const MED = [];
    for (let k = 0; k < 11; k++) { const anda = k % 4 === 1, x0 = 60 + h(k, 1, 27) * 250, x = anda ? ((x0 - t * 2.2 - 40) % 280 + 280) % 280 + 40 : x0 + Math.sin(t * 0.2 + k) * 2; MED.push([x, 112 + Math.round(h(k, 2, 27) * 18), k, anda]); }
    MED.sort((a, b) => a[1] - b[1]);
    for (const [x, y, k, anda] of MED) b_bufalo(R, x, y, 0.82 + (y - 112) / 18 * 0.3, anda ? -1 : (k % 2 ? 1 : -1), t, k, { anda, pasta: !anda && Math.sin(t * 0.5 + k * 2.1) > -0.3 });
    // los grandes de delante, a los lados; un ternero junto a su madre
    b_bufalo(R, 20, 154, 1.55, 1, t, 3, { pasta: Math.sin(t * 0.4) > -0.5 });
    b_bufalo(R, 296, 156, 1.7, -1, t, 5, { pasta: Math.sin(t * 0.45 + 2) > -0.4 });
    b_bufalo(R, 270, 150, 0.95, -1, t, 8, { pasta: Math.sin(t * 0.8 + 1) > 0 });
    // los perritos de las praderas que asoman, miran y se esconden
    for (const [mx, my, k] of [[96, 172, 0], [206, 166, 1], [228, 171, 2]]) { const u = (t * 0.4 + k * 0.37) % 1, alto = u < 0.15 ? u / 0.15 * 5 : u < 0.65 ? 5 : u < 0.75 ? (0.75 - u) / 0.1 * 5 : 0; if (alto < 1) continue;
      const a = Math.round(alto), cp = hex('#b08a5a'), cs = hex('#7a5a3a'); R.rect(mx - 1, my - 1 - a, mx + 1, my - 2, cp); R.pset(mx - 1, my - 1 - a, cs); R.pset(mx + 1, my - 1 - a, hex('#1e140e')); R.pset(mx, my - a, hex('#d8b88a')); if (a >= 4 && Math.sin(t * 6 + k) > 0) R.pset(mx + 2, my - a + 2, cs); }
    // mariposas blancas sobre las flores
    for (let k = 0; k < 3; k++) { const x = Math.round(60 + k * 80 + Math.sin(t * 0.9 + k) * 20), y = Math.round(160 + Math.sin(t * 1.7 + k * 2) * 6), a = Math.sin(t * 14 + k) > 0; R.pset(x, y, hex('#f8f4e0')); R.pset(x + (a ? 1 : 0), y - (a ? 1 : 0), hex('#f8f4e0')); R.pset(x - 1, y - (a ? 1 : 0), hex('#e8e0c0')); }
    ret.arroyo = [0, 125, 75, 95]; ret.manada = [84, 98, 254, 130];
  } else {
    // la manada que asoma por la loma (siluetas pequeñas que andan) y el polvo que levanta
    for (let k = 0; k < 14; k++) { const x = ((h(k, 1, 28) * 340 - t * (1.2 + h(k, 2, 28))) % 340 + 340) % 340 - 10, yt = Math.round(HOR - 6 + Math.sin(x * 0.018 + 1) * 4 + Math.sin(x * 0.05) * 1.5) + 1; b_bufalo(R, x, yt, 0.5, -1, t, k, { pasta: k % 3 === 0 }); }
    for (let k = 0; k < 7; k++) { const x = ((k * 53 - t * 6) % 360 + 360) % 360 - 20, y = HOR - 4 - ((t * 3 + k * 5) % 14), r = 3 + ((t * 3 + k * 5) % 14) * 0.5;
      for (let j = -Math.round(r); j <= r; j++) for (let i = -Math.round(r * 1.6); i <= r * 1.6; i++) { const px = Math.round(x + i), py = Math.round(y + j); if (px < 0 || px > 319 || py < 0 || (px > 272 && py < 46)) continue; if (i * i / 2.56 + j * j < r * r && b_um(px, py) < 0.35 * (1 - ((t * 3 + k * 5) % 14) / 14)) B[py * 320 + px] = b_mez(B[py * 320 + px], hex('#d8c8a0'), 0.5); } }
    // los grandes: detrás en medio, a los lados delante; un ternero; tordos en los lomos
    const G = [[60, 118, 1.5, 1, 1], [258, 116, 1.45, -1, 2], [160, 112, 1.25, -1, 3], [208, 124, 1.7, -1, 4], [112, 122, 1.6, 1, 6], [36, 158, 2.4, 1, 7], [292, 162, 2.5, -1, 9]];
    for (const [x, y, s, d, k] of G) b_bufalo(R, x + (k === 3 ? Math.sin(t * 0.3) * 3 : 0), y, s, d, t, k, { pasta: Math.sin(t * 0.5 + k * 1.9) > -0.4, anda: k === 3 });
    b_bufalo(R, 72, 160, 1.15, 1, t, 11, { pasta: Math.sin(t * 0.9) > 0.2 });
    for (const [x, y, s, d, k] of [[36, 158, 2.4, 1, 7], [208, 124, 1.7, -1, 4]]) { const bx = Math.round(x + d * (Math.sin(t * 0.7 + k) * 2 - 2 * s)), by = Math.round(y - 11 * s - (Math.floor(t * 3 + k) % 5 === 0 ? 1 : 0)); R.rect(bx - 1, by - 1, bx + 1, by, hex('#1a1614')); R.pset(bx + d * 2, by - 1, hex('#5a4a3a')); }
  }
  return ret;
}

// matas de hierba alta que se mecen delante (esquinas de abajo y unos tallos sueltos en el borde)
function b_hierbaDelante(R, t, man) {
  const P = b_PAL.pradera;
  const mata = (x0, y0, n, alto, k) => { for (let i = 0; i < n; i++) { const x = x0 + i * 2 + (h(i, k, 40) - 0.5) * 3, a = alto * (0.6 + h(i, k, 41) * 0.5), sw = Math.sin(t * 1.8 + x * 0.05 + i * 0.4) * (2 + a * 0.08);
    for (let j = 0; j < a; j++) { const u = j / a, px = Math.round(x + sw * u * u), py = Math.round(y0 - j); R.pset(px, py, u > 0.8 ? P[6] : b_tono(P, 0.15 + u * 0.6, px, py)); }
    if (h(i, k, 42) > 0.7) { const px = Math.round(x + sw), py = Math.round(y0 - a); R.pset(px, py - 1, hex('#d8c070')); R.pset(px + 1, py, hex('#c8b060')); } } };
  mata(-2, 181, 20, 22, 1); mata(282, 181, 20, 24, 2);
  for (let k = 0; k < 9; k++) mata(52 + k * 26, 181, 2, 8 + (k % 3) * 2, 10 + k);
  if (man) { mata(-2, 181, 8, 30, 3); mata(300, 181, 10, 30, 4); }
}

// los bordes de las paredes: la izquierda (de x 0 a 104) y la derecha (de x 188 a 320); el suelo empieza en y 132
const b_BIZ = [[0, 24], [16, 22], [30, 30], [42, 34], [50, 46], [62, 54], [72, 70], [84, 82], [94, 96], [100, 112], [104, 132]];

const b_BDE = [[188, 134], [192, 118], [198, 104], [208, 90], [220, 78], [232, 66], [246, 58], [262, 60], [278, 52], [300, 50], [320, 48]];

const b_paredIz = (x, y) => x <= 104 && y >= b_interp(b_BIZ, x) && y < 136;

const b_paredDe = (x, y) => x >= 188 && y >= b_interp(b_BDE, x) && y < 136;

// el arroyo del barranco: baja del fondo del hueco serpenteando y corre al pie de la pared derecha
const b_arroyoBa = (x) => (x < 196 ? 108 + (x - 146) * 0.42 + Math.sin(x * 0.16) * 2.2 : 129 + Math.sin(x * 0.07) * 1.5);

const b_esCielo = (x, y) => y < 108 && !b_paredIz(x, y) && !b_paredDe(x, y) && !(y >= 92 && x > 96 && x < 196 && y >= b_lejos(x));

// la silueta de las mesas lejanas por el hueco del barranco
const b_lejos = (x) => Math.round(x < 120 ? 96 + (120 - x) * 0.3 : x < 150 ? 96 + Math.sin(x * 0.4) * 0.6 : x < 158 ? 96 + (x - 150) * 1.2 : x < 176 ? 104 : x < 182 ? 104 - (x - 176) * 1.4 : 96);

// un pino piñonero (x, pie, tamaño): copa redonda irregular con la luz arriba
function b_pinon(R, x, y, s, luz) {
  const P = b_PAL.pino, rim = luz === 'dia' ? hex('#7a8a48') : hex('#a86a48');
  R.linea(x, y, x, y - s * 0.6, hex('#3a2a20')); R.pset(x + 1, y - 1, hex('#3a2a20'));
  for (let j = 0; j < 5; j++) { const bx = x + (h(j, x, 50) - 0.5) * s * 1.2, by = y - s * 0.9 - h(j, y, 50) * s * 0.6, br = s * (0.38 + h(j, s, 50) * 0.2);
    R.disco(bx, by, br, (px, py) => { const l = 0.55 - (py - by) / br * 0.3 + (h(px, py, 51) - 0.5) * 0.35; return (py - by) / br < -0.55 && h(px, py, 52) > 0.4 ? rim : b_tono(P, l, px, py); }); }
}

function b_barrancoFijo(R, luz, mina) {
  const B = R.buf, P = b_PAL, ta = luz === 'tarde', CI = ta ? P.cieloTa : P.cieloDi, RO = ta ? P.rocaTa : P.rocaDi, AR = ta ? P.arenaTa : P.arenaDi;
  // el cielo: del violeta (arriba) al naranja y el amarillo sobre el horizonte del hueco
  for (let y = 0; y < 110; y++) for (let x = 0; x < 320; x++) { const l = (y / 108) * (ta ? 1 : 0.95) + (ta ? Math.max(0, 1 - Math.hypot((x - 150) / 70, (y - 104) / 40)) * 0.15 : 0) + (h(x >> 3, y >> 2, 53) - 0.5) * 0.03; B[y * 320 + x] = b_tono(CI, l, x, y); }
  // el resplandor del sol que se acaba de poner, detrás de las mesas
  if (ta) for (let y = 80; y < 108; y++) for (let x = 96; x < 200; x++) { const d = Math.hypot((x - 150) / 34, (y - 100) / 12); if (d < 1 && b_um(x, y) < (1 - d) * 0.9) B[y * 320 + x] = d < 0.4 ? hex('#fff0b8') : hex('#fadc90'); }
  // las mesas lejanas a contraluz (o con bruma de día) y el fondo del barranco con el arroyo
  for (let x = 96; x < 196; x++) { const yt = b_lejos(x); for (let y = yt; y < 136; y++) {
    const fondo = y > 108, l = fondo ? 0.3 + (y - 108) / 28 * 0.3 : 0.18 + (y === yt ? 0.3 : 0) + (y - yt) * 0.01;
    B[y * 320 + x] = fondo ? b_tono(AR, l + (h(x >> 1, y, 54) - 0.5) * 0.2, x, y) : b_tono(ta ? b_hx(['#3a2442', '#4e2c4a', '#6a3a52', '#c06a6a']) : b_hx(['#9a7a7a', '#aa8a86', '#bc9c94', '#d4b8a8']), l, x, y); } }
  // las paredes: estratos inclinados, grano, cornisas con luz y sombra, grietas verticales; la luz alta del ocaso
  const ilum = (x, y, top, iz) => { const bajo = y - top; let l = ta ? 0.34 + Math.max(0, 1 - bajo / 10) * 0.42 + (iz ? -0.06 : 0.04) - Math.max(0, y - 96) / 40 * 0.14 : (iz ? 0.42 : 0.62) + Math.max(0, 1 - bajo / 6) * 0.2 - Math.max(0, y - 110) / 30 * 0.12; return l; };
  for (let y = 20; y < 136; y++) for (let x = 0; x < 320; x++) { const iz = b_paredIz(x, y), de = !iz && b_paredDe(x, y); if (!iz && !de) continue;
    const top = iz ? b_interp(b_BIZ, x) : b_interp(b_BDE, x), s = y + x * (iz ? -0.06 : 0.07) + Math.sin(x * 0.05) * 2 + Math.sin(x * 0.013 + 1) * 4, banda = Math.floor(s / 6), fb = s - banda * 6;
    let l = ilum(x, y, top, iz) + (h(banda, iz ? 1 : 2, 55) - 0.5) * 0.18 + (h(x >> 1, y, 56) - 0.5) * 0.1 + (h(x, y, 57) > 0.92 ? 0.08 : 0);
    if (fb < 1) l += 0.12; else if (fb > 5) l -= 0.16;   // el canto de cada estrato con luz y la sombra de debajo
    const gk = Math.floor((x + Math.round(Math.sin(y * 0.3) * 1.2)) / 9), gr = h(gk, banda >> 1, 58);
    if (gr < 0.22 && (x + Math.round(Math.sin(y * 0.3) * 1.2)) % 9 === 4) l = 0.02; else if (gr < 0.22 && (x + Math.round(Math.sin(y * 0.3) * 1.2)) % 9 === 5) l -= 0.1;
    if (y - top < 1) l = ta ? 0.95 : 0.9;
    B[y * 320 + x] = b_tono(RO, l, x, y); }
  // el suelo del campamento: arena y grava, más oscura delante, guijarros con su luz y matas de salvia
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 136 && (b_paredIz(x, y) || b_paredDe(x, y) || (x > 96 && x < 196))) continue;
    const l = 0.72 - (y - 132) / 48 * 0.42 + (h(x >> 1, y, 59) - 0.5) * 0.14 + Math.sin(x * 0.05 + y * 0.2) * 0.04 + (h(x, y, 60) > 0.93 ? 0.14 : 0); B[y * 320 + x] = b_tono(AR, l, x, y); }
  for (let k = 0; k < 60; k++) { const x = Math.floor(h(k, 1, 61) * 320), y = 138 + Math.floor(h(k, 2, 61) * 40), r = 0.8 + h(k, 3, 61) * (y > 160 ? 2 : 1.2); b_elipse(R, x, y, r * 1.4, r, (px, py, u, v) => b_tono(RO, 0.55 - v * 0.35 - u * 0.1, px, py)); }
  // el arroyo: del fondo del hueco al pie de la pared derecha, con el cielo reflejado
  const AG = ta ? b_hx(['#2e2440', '#4a3a5e', '#7a5a7a', '#b8788a', '#f0b080']) : b_hx(['#3a5a74', '#5a7c98', '#86a8c4', '#b4d0e2', '#e0eef4']);
  for (let x = 146; x < 320; x++) { const yc = b_arroyoBa(x), w = x < 196 ? 0.6 + (x - 146) * 0.03 : 2.2 + Math.sin(x * 0.11) * 0.4;
    for (let y = Math.floor(yc - w - 1); y <= Math.ceil(yc + w + 1); y++) { const q = Math.abs(y - yc) / w; B[y * 320 + x] = q > 1 ? b_tono(AR, y < yc ? 0.15 : 0.45, x, y) : b_tono(AG, 0.7 - q * 0.45 + (h(x >> 2, y, 67) - 0.5) * 0.3, x, y); } }
  // los derrubios al pie de las paredes
  for (let k = 0; k < 26; k++) { const iz = k < 12, x = iz ? 4 + h(k, 1, 62) * 100 : 192 + h(k, 1, 62) * 126, y = (iz ? 134 : 135) + h(k, 2, 62) * 4, r = 1.5 + h(k, 3, 62) * 3;
    b_elipse(R, x, y, r * 1.3, r, (px, py, u, v) => b_tono(RO, 0.62 - v * 0.38 - u * 0.12 + (ta ? -0.1 : 0), px, py)); }
  // los pinos piñoneros en los bordes y en las cornisas (lejos de la barra del año y de Atom)
  for (const [x, y, s] of [[56, 51, 6], [78, 76, 5], [92, 94, 4], [238, 62, 6], [256, 60, 7], [212, 84, 5], [200, 100, 4], [14, 135, 6], [306, 137, 8]]) b_pinon(R, x, y, s, luz);
  // los enebros del fondo, pequeños
  for (const x of [112, 124, 168, 182]) { const y = 112 + Math.abs(x - 150) * 0.1; R.disco(x, y - 1, 1.6, P.pino[2]); R.pset(x, y - 2, P.pino[3]); }
  // la grieta de la pared derecha con la veta (apagada: un ocre oscuro)
  const GR = [[228, 98], [230, 103], [229, 108], [232, 112], [231, 117], [234, 122]];
  for (let i = 1; i < GR.length; i++) { R.linea(GR[i - 1][0], GR[i - 1][1], GR[i][0], GR[i][1], RO[0]); R.linea(GR[i - 1][0] + 1, GR[i - 1][1], GR[i][0] + 1, GR[i][1], RO[1]); R.linea(GR[i - 1][0] - 1, GR[i - 1][1], GR[i][0] - 1, GR[i][1], RO[ta ? 2 : 3]); }
  for (const [x, y] of [[230, 106], [231, 109], [232, 113], [230, 104]]) R.pset(x, y, P.oro[0]);
  // el bastidor con la piel de búfalo curtida (cuero claro, sin nada morboso)
  { const M = hex('#5a3a22'); R.linea(3, 142, 5, 108, M); R.linea(18, 142, 16, 108, M); R.linea(2, 110, 19, 110, M); R.linea(3, 138, 18, 138, M);
    const PI = b_hx(['#4a3020', '#6a4a30', '#8a6440', '#a88050', '#c49c68']);
    for (let y = 112; y <= 136; y++) { const v = (y - 124) / 12, w = 5.5 + Math.cos(v * 3) * 1.2 - Math.abs(v) * 1.5; for (let x = Math.round(10.5 - w); x <= Math.round(10.5 + w); x++) R.pset(x, y, b_tono(PI, 0.7 - (x - 10.5) / w * 0.25 - v * 0.1 + (h(x, y, 63) - 0.5) * 0.3, x, y)); }
    for (const [x0, y0, x1, y1] of [[5, 112, 4, 111], [16, 112, 17, 111], [5, 136, 4, 137], [16, 136, 17, 137]]) R.linea(x0, y0, x1, y1, PI[4]);
    for (const yy of [114, 124, 134]) { R.pset(4, yy, hex('#c8b48a')); R.pset(17, yy, hex('#c8b48a')); } }
  // las dos tiendas de lona (la cara de la derecha, iluminada por la hoguera), con su puerta, palos, vientos y estacas
  const tienda = (x0, x1, base, ap) => { const cx = (x0 + x1) / 2, L = P.lona;
    for (let y = ap; y <= base; y++) { const u = (y - ap) / (base - ap), xl = Math.round(cx - (cx - x0) * u), xr = Math.round(cx + (x1 - cx) * u);
      for (let x = xl; x <= xr; x++) { const der = x > cx, l = (der ? (ta ? 0.78 : 0.82) : (ta ? 0.38 : 0.6)) - u * 0.15 + ((x - xl) % 5 === 0 ? -0.08 : 0) + (h(x, y, 64) - 0.5) * 0.06; B[y * 320 + x] = b_tono(L, l, x, y); }
      B[y * 320 + xl] = L[0]; B[y * 320 + xr] = L[1]; }
    for (let y = ap + 8; y <= base; y++) { const u = (y - ap - 8) / (base - ap - 8), w = Math.round(u * 4); for (let x = Math.round(cx) - w; x <= Math.round(cx) + Math.round(w * 0.4); x++) B[y * 320 + x] = ta ? hex('#1e1416') : hex('#3a2a22'); }
    R.linea(Math.round(cx), ap - 3, Math.round(cx), ap, hex('#5a3a22')); R.linea(Math.round(cx), ap, x0 - 6, base + 1, hex('#8a7a60')); R.linea(Math.round(cx), ap, x1 + 6, base + 1, hex('#8a7a60')); R.pset(x0 - 6, base + 1, hex('#3a2a1a')); R.pset(x1 + 6, base + 1, hex('#3a2a1a'));
    for (let x = x0; x <= x1; x++) if (b_um(x, base + 1) < 0.6) B[(base + 1) * 320 + x] = AR[0]; };
  tienda(22, 58, 140, 112); tienda(64, 94, 137, 115);
  // la leña, las mantas enrolladas, dos sillas de montar con su manta y una cafetera de hojalata
  for (let i = 0; i < 4; i++) R.linea(98 + i, 148 - i, 112 + i, 146 - i, [hex('#4a3020'), hex('#6a4a2a'), hex('#5a3a22'), hex('#8a6038')][i]);
  b_elipse(R, 78, 148, 7, 2.6, (px, py, u, v) => (Math.abs(u) > 0.8 ? hex('#5a2a2a') : b_tono(b_hx(['#5a2a2a', '#8a3a32', '#b04a3a', '#c8704a']), 0.6 - v * 0.4, px, py)));
  const silla = (x, y) => { b_elipse(R, x, y - 1, 8, 2.2, hex('#7a3a2a')); R.rect(x - 8, y - 2, x + 8, y - 2, hex('#b0603a')); R.pset(x - 6, y - 1, hex('#e0c080')); R.pset(x + 6, y - 1, hex('#e0c080')); b_elipse(R, x, y - 4, 6, 3.4, (px, py, u, v) => b_tono(b_hx(['#3a2214', '#5a361c', '#7a4c28', '#9a6434']), 0.62 - v * 0.45, px, py)); R.rect(x + 4, y - 8, x + 5, y - 6, hex('#5a361c')); R.pset(x + 5, y - 9, hex('#7a4c28')); R.linea(x - 2, y - 1, x - 2, y + 2, hex('#2a1a10')); };
  silla(158, 148); silla(176, 147);
  if (!mina) { R.rect(144, 144, 147, 147, hex('#8a9098')); R.pset(144, 144, hex('#c8ccd0')); R.rect(148, 145, 148, 146, hex('#6a7078')); R.rect(145, 143, 146, 143, hex('#3a3a42'));
    for (const [px, py] of [[110, 152], [150, 153]]) { b_elipse(R, px, py, 2.8, 1, hex('#a8acb0')); R.pset(px - 1, py, hex('#e0e4e8')); } }
  // el anillo de piedras de la hoguera y los troncos
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2, x = 130 + Math.cos(a) * 9, y = 143 + Math.sin(a) * 3; b_elipse(R, x, y, 1.8, 1.3, (px, py, u, v) => b_tono(b_hx(['#2a2026', '#4a3a3a', '#7a6660', '#a89088']), 0.6 - v * 0.5, px, py)); }
  R.linea(123, 143, 137, 141, hex('#3a2418')); R.linea(124, 141, 136, 144, hex('#2a1a12')); R.linea(126, 142, 134, 142, hex('#5a3a22'));
  if (mina) {
    // la bocamina: marco de madera, la boca negra, la rampa de escombro y raíles de tablas
    for (let y = 96; y <= 124; y++) for (let x = 218; x <= 242; x++) { const d = Math.hypot((x - 230) / 11, (y - 112) / 15); if (d < 1) B[y * 320 + x] = b_tono(b_hx(['#0e0a0c', '#1e1418', '#2e2024']), d * 0.9, x, y); }
    const MA = b_hx(['#3a2414', '#5e3e22', '#8a5e34', '#b08048']);
    for (const xx of [216, 243]) for (let y = 98; y <= 126; y++) { R.pset(xx, y, MA[1]); R.pset(xx + 1, y, MA[2]); R.pset(xx + 2, y, MA[1]); }
    for (let x = 214; x <= 247; x++) { R.pset(x, 96, MA[3]); R.pset(x, 97, MA[2]); R.pset(x, 98, MA[0]); }
    for (let y = 124; y <= 146; y++) { const u = (y - 124) / 22, x0 = Math.round(218 - u * 22), x1 = Math.round(244 + u * 18); for (let x = x0; x <= x1; x++) { const l = 0.6 - u * 0.2 + (h(x, y, 65) - 0.5) * 0.5; B[y * 320 + x] = b_tono(b_hx(['#5a5450', '#7a726a', '#9a9088', '#bcb2a8', '#d8d0c4']), l, x, y); } }
    for (let i = 0; i < 9; i++) { const y = 126 + i * 2.4, x = 230 - i * 1.2; R.linea(Math.round(x - 4), Math.round(y), Math.round(x + 4), Math.round(y), MA[1]); }
    // los montones de roca y los sacos atados
    for (const [mx, my, w] of [[262, 146, 12], [286, 148, 9]]) for (let k = 0; k < w * 2; k++) { const x = mx + (h(k, mx, 66) - 0.5) * w * 1.6, y = my - h(k, my, 66) * (w * 0.7) * (1 - Math.abs(x - mx) / w); b_elipse(R, x, y, 1.8, 1.4, (px, py, u, v) => b_tono(RO, 0.65 - v * 0.4 - u * 0.1, px, py)); }
    for (const [x, y] of [[104, 148], [112, 148], [120, 148], [108, 143], [116, 143]]) { b_elipse(R, x, y - 2, 3.6, 3.4, (px, py, u, v) => b_tono(P.lona, 0.7 - v * 0.35 - u * 0.15, px, py)); R.rect(x - 1, y - 6, x + 1, y - 6, hex('#6a4a2a')); R.pset(x, y - 7, hex('#8a6a3a')); }
    // picos y palas apoyados en la pared, el torno sobre su pozo y la artesa de lavar en el arroyo
    for (const [x, pal] of [[192, 1], [197, 0], [201, 1], [206, 0]]) { R.linea(x, 146, x + 3, 126, hex('#8a6a40')); if (pal) { R.rect(x - 1, 144, x + 1, 148, hex('#8a9098')); R.pset(x - 1, 144, hex('#c0c6cc')); } else { R.linea(x + 1, 125, x + 6, 127, hex('#9aa0a8')); R.linea(x + 3, 126, x, 124, hex('#9aa0a8')); } }
    R.rect(190, 136, 214, 137, MA[2]); R.linea(192, 136, 194, 128, MA[1]); R.linea(212, 136, 210, 128, MA[1]); R.rect(193, 127, 211, 128, MA[3]); b_elipse(R, 202, 128, 3, 2, MA[1]); R.linea(202, 129, 202, 135, hex('#c8b48a'));
    b_elipse(R, 202, 138, 7, 1.6, hex('#0e0a0c'));
    R.rect(160, 130, 176, 134, MA[2]); R.rect(160, 130, 176, 130, MA[3]); R.linea(160, 134, 158, 137, MA[1]); R.linea(176, 134, 178, 137, MA[1]);
  }
}

function b_barranco(R, t, o) {
  const mina = !!o.mina, luz = mina ? 'dia' : 'tarde', ta = luz === 'tarde', P = b_PAL;
  R.copiar(b_capa(R, 'ba|' + luz + (mina ? '|m' : ''), () => b_barrancoFijo(R, luz, mina)));
  const B = R.buf;
  if (ta) {
    // las primeras estrellas que titilan (fuera de la barra del año y de la esquina de Atom)
    for (let k = 0; k < 34; k++) { const x = Math.floor(h(k, 1, 70) * 320), y = 16 + Math.floor(h(k, 2, 70) * 46); if ((x > 270 && y < 48) || (x < 172 && y < 22) || !b_esCielo(x, y)) continue;
      const b = Math.sin(t * (1.5 + h(k, 3, 70) * 2) + k) * 0.5 + 0.5 - y / 120; if (b > 0.25) R.pset(x, y, b > 0.6 ? hex('#fff8e0') : hex('#c8b8d8')); if (b > 0.75 && k % 5 === 0) { R.pset(x + 1, y, hex('#8a7aa8')); R.pset(x - 1, y, hex('#8a7aa8')); } }
    // nubes alargadas del ocaso a tres tonos (violeta arriba, rosa, el filo de abajo encendido), a tres velocidades
    const NT = b_hx(['#5a3a6a', '#9a5478', '#d47a80', '#f8b878']);
    for (let k = 0; k < 6; k++) { const y0 = 34 + k * 9 + Math.round(h(k, 1, 71) * 4), lar = 40 + h(k, 2, 71) * 50, v = 0.6 + (k % 3) * 0.7, xc = ((h(k, 3, 71) * 400 + t * v) % 440) - 60, g = 1.6 + (k % 2) * 1.2;
      for (let x = Math.max(0, Math.round(xc - lar / 2)); x <= Math.min(319, Math.round(xc + lar / 2)); x++) { const e = 1 - Math.abs(2 * (x - xc) / lar), gg = g * Math.sqrt(Math.max(0, e)) + 0.5, yc = y0 + Math.sin((x + k * 17) * 0.07) * 1.4;
        for (let y = Math.floor(yc - gg); y <= Math.ceil(yc + gg); y++) { if (y < 0 || !b_esCielo(x, y) || (x > 270 && y < 48)) continue; const dd = (y - yc) / gg; if (Math.abs(dd) > 1.05 || b_um(x, y) > e * 1.8 + 0.1) continue;
          B[y * 320 + x] = NT[Math.max(0, Math.min(3, Math.round((dd + 1) * 1.5 + (y / 110) * 1.2 - 0.6)))]; } } }
  } else {
    for (const [yb, n, v, w, c] of [[40, 3, 1.2, 34, 0], [62, 4, 2.4, 20, 1]]) for (let k = 0; k < n; k++) { const x = ((h(k, c, 72) * 420 + t * v) % 440) - 60; b_cumulo(R, x, yb + Math.round(h(k, c, 73) * 5), w * (0.7 + h(k, c, 74) * 0.6), k + c * 7, P.cumulo, (px, py) => b_esCielo(px, py) && !(px > 270 && py < 46)); }
    halcon(R, t, 150, 30, 26);
  }
  // golondrinas (y de noche murciélagos que revolotean junto a las paredes)
  bandada(R, t, { n: 3, y: 64, cada: 10, semilla: 4 });
  if (ta) for (let k = 0; k < 3; k++) { const x = Math.round(190 + Math.sin(t * 1.3 + k * 2) * 40 + Math.sin(t * 3.1 + k) * 8), y = Math.round(70 + Math.cos(t * 1.7 + k) * 12), a = Math.sin(t * 16 + k) > 0; R.pset(x, y, hex('#1a1020')); R.pset(x - 1, y - (a ? 1 : 0), hex('#1a1020')); R.pset(x + 1, y - (a ? 1 : 0), hex('#1a1020')); }
  // el arroyo: brillos que corren
  for (let k = 0; k < 10; k++) { const x = 160 + ((k * 31 + Math.floor(t * 6)) % 160), yc = b_arroyoBa(x); if (Math.sin(t * 5 + k * 1.9) > 0.3) R.pset(x, Math.round(yc + (k % 3 === 0 ? 1 : 0)), ta ? hex('#fff0c0') : hex('#f0f8ff')); }
  const fuego = !mina && o.fuego !== false;
  if (fuego) {
    // la luz de la hoguera que tiembla sobre el suelo, las tiendas y la pared baja
    const fl = 0.85 + Math.sin(t * 11) * 0.08 + Math.sin(t * 17.3) * 0.06, cal = hex('#ffb060');
    for (let y = 108; y < 180; y++) for (let x = 60; x < 204; x++) { const d = Math.hypot((x - 130) / 70, (y - 140) / 34); if (d >= 1) continue; const f = (1 - d) * (1 - d) * 0.75 * fl; if (b_um(x, y) < f) B[y * 320 + x] = b_mez(B[y * 320 + x], cal, 0.32); }
  }
  // la olla en su trípode, con vapor (o las brasas)
  R.linea(121, 143, 130, 122, hex('#4a3020')); R.linea(139, 143, 130, 122, hex('#4a3020')); R.linea(130, 122, 131, 143, hex('#3a2418')); R.linea(130, 122, 130, 129, hex('#2a2a30'));
  b_elipse(R, 130, 132.5, 4.4, 3.2, (px, py, u, v) => b_tono(b_hx(['#14141a', '#2a2a32', '#4a4a56', '#7a7a88']), 0.5 - v * 0.2 - u * 0.25 + (fuego && u > 0.3 && v > 0.2 ? 0.3 : 0), px, py)); R.rect(126, 129, 134, 129, hex('#5a5a66'));
  if (fuego) {
    for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1, x = Math.round(129 + k % 2 * 2 + Math.sin(t * 2 + k) * 2 + u * 4), y = Math.round(127 - u * 14); if (b_um(x, y) < 0.7 - u * 0.6) R.pset(x, y, hex('#e8e0e8')); }
    // las llamas: lenguas que suben y se mueven, con el corazón claro
    for (let i = -6; i <= 6; i++) { const a = 1 - Math.abs(i) / 7, hh = Math.round((5 + 9 * a) * (0.7 + 0.3 * Math.sin(t * 9 + i * 1.7)) + h(i, Math.floor(t * 12), 75) * 3);
      for (let j = 0; j < hh; j++) { const u = j / hh, x = 130 + i + Math.round(Math.sin(t * 7 + j * 0.5 + i) * u * 1.4), y = 141 - j; R.pset(x, y, b_tono(P.fuego, (1 - u) * (0.5 + a * 0.5) + 0.1, x, y)); } }
    // las chispas que suben
    for (let k = 0; k < 7; k++) { const u = (t * 0.7 + k * 0.143) % 1, x = Math.round(130 + Math.sin(k * 2.3 + t) * 4 + u * 8 * Math.sin(k)), y = Math.round(138 - u * 34); if (u < 0.85) R.pset(x, y, u < 0.4 ? P.fuego[4] : P.fuego[2]); }
  } else { for (let i = -4; i <= 4; i++) if (Math.sin(t * 3 + i * 2) > 0) R.pset(130 + i, 141 + (i & 1), hex('#d8501a')); }
  // el humo que sube y se va a la derecha
  for (let k = 0; k < 6; k++) { const u = (t * 0.12 + k / 6) % 1, x = 130 + u * 26 + Math.sin(u * 6 + k) * 3, y = 118 - u * 70, r = 2 + u * 7, a = (fuego ? 0.5 : 0.3) * (1 - u);
    for (let j = -Math.ceil(r); j <= r; j++) for (let i = -Math.ceil(r); i <= r; i++) { const px = Math.round(x + i), py = Math.round(y + j); if (py < 20 || i * i + j * j > r * r) continue; if (b_um(px + k, py) < a) B[py * 320 + px] = b_mez(B[py * 320 + px], ta ? hex('#8a7a8a') : hex('#d0ccc8'), 0.45); } }
  // la cuerda de los caballos con sus estacas y los animales (caballos por la tarde; mulas con albarda en la mina)
  R.linea(240, 136, 316, 138, hex('#8a7a5a')); for (const x of [240, 316]) R.linea(x, 132, x, 141, hex('#5a3a22'));
  if (!mina) { b_equino(R, 262, 146, t, { dir: -1, color: 'bayo', come: Math.sin(t * 0.5) > -0.3, k: 1 }); b_equino(R, 296, 147, t, { dir: -1, color: 'pinto', come: Math.sin(t * 0.4 + 2) > 0.2, k: 2 }); }
  else { b_equino(R, 266, 146, t, { dir: -1, mula: true, carga: true, color: 'pardo', come: Math.sin(t * 0.5) > -0.3, k: 3 }); b_equino(R, 300, 147, t, { dir: -1, mula: true, color: 'tordo', come: true, k: 4 });
    // los mineros pequeños: uno pica en la boca, otro baja un saco por la rampa, otro mece la criba
    b_mini(R, 226, 125, t, { accion: 'pico', camisa: hex('#a8443a') }); b_mini(R, 236, 124, t + 0.4, { accion: 'pico', dir: -1, camisa: hex('#4a6a8a') });
    const u = (t * 0.12) % 1; b_mini(R, Math.round(230 - u * 18), Math.round(126 + u * 18), t, { accion: 'saco', dir: -1, camisa: hex('#8a7a4a') });
    b_mini(R, 170, 132, t, { accion: 'criba', camisa: hex('#5a7a4a') }); R.rect(166 + Math.round(Math.sin(t * 6)), 128, 174 + Math.round(Math.sin(t * 6)), 129, hex('#b08048'));
    for (let k = 0; k < 3; k++) if (Math.sin(t * 8 + k) > 0) R.pset(164 + k * 5, 133, hex('#e8f4ff'));
    // el torno que gira
    const a = t * 2; R.linea(202, 128, Math.round(202 + Math.cos(a) * 3), Math.round(128 + Math.sin(a) * 3), hex('#3a2414'));
    // brillos en los sacos de oro
    for (let k = 0; k < 2; k++) { const f = (t * 0.7 + k * 0.5) % 1; if (f < 0.15) { const x = 108 + k * 8, y = 141 + k * 2; R.pset(x, y, P.oro[5]); R.pset(x - 1, y, P.oro[3]); R.pset(x + 1, y, P.oro[3]); R.pset(x, y - 1, P.oro[3]); R.pset(x, y + 1, P.oro[3]); } }
  }
  const br = b_lim(o.brillo ?? 0); b_destello(R, t, mina ? 230 : 231, mina ? 112 : 110, br, mina ? null : [[229, 104], [230, 106], [231, 109], [232, 112], [231, 114], [233, 118]]);
  return { suelo: 150, libre: [30, 200], brillo: [mina ? 230 : 231, mina ? 112 : 110], fuego: [130, 142], olla: [130, 132], tiendas: [[22, 58], [64, 94]], caballos: [[248, 306], 146], sillas: [158, 176], bocamina: mina ? [216, 96, 244, 124] : null, sacos: mina ? [100, 140, 124, 150] : null };
}

// el brillo del oro (b 0–1) en (x, y): la veta que se enciende (pixeles de V), un halo cálido, una estrella de cuatro puntas
// que palpita y gira un poco, y chispas que suben; con b pequeño, un destello que titila
function b_destello(R, t, x, y, b, V, esc = 1) {
  if (b <= 0.02) return;
  const B = R.buf, O = b_PAL.oro, pul = 0.75 + 0.25 * Math.sin(t * 6), rh = (5 + 15 * b) * esc;
  for (let j = -Math.ceil(rh); j <= rh; j++) for (let i = -Math.ceil(rh); i <= rh; i++) { const px = x + i, py = y + j; if (px < 0 || px > 319 || py < 0 || py > 179) continue; const d = Math.hypot(i, j) / rh; if (d >= 1) continue;
    if (b_um(px, py) < (1 - d) * (0.35 + 0.55 * b) * pul) B[py * 320 + px] = b_mez(B[py * 320 + px], d < 0.35 ? O[5] : O[4], 0.35 + 0.35 * (1 - d)); }
  if (V) for (const [vx, vy] of V) { R.pset(vx, vy, b > 0.5 ? O[4] : O[3]); if (b > 0.4) R.pset(vx + 1, vy, O[3]); }
  const L = Math.round((2 + 11 * b) * pul * esc), tw = b < 0.35 ? (Math.sin(t * 9) > 0 ? 1 : 0.5) : 1, Ld = Math.round(L * tw);
  for (let k = 1; k <= Ld; k++) { const c = k < Ld * 0.4 ? O[5] : k < Ld * 0.75 ? O[4] : O[3]; R.pset(x + k, y, c); R.pset(x - k, y, c); R.pset(x, y + k, c); R.pset(x, y - k, c); }
  if (b > 0.45) for (let k = 1; k <= Math.round(Ld * 0.45); k++) { const c = k < 2 ? O[5] : O[3]; R.pset(x + k, y + k, c); R.pset(x - k, y - k, c); R.pset(x + k, y - k, c); R.pset(x - k, y + k, c); }
  R.pset(x, y, hex('#ffffff')); if (b > 0.3) { R.pset(x + 1, y, hex('#ffffff')); R.pset(x - 1, y, hex('#ffffff')); R.pset(x, y + 1, hex('#ffffff')); R.pset(x, y - 1, hex('#ffffff')); }
  for (let k = 0; k < Math.round(10 * b); k++) { const u = (t * 0.8 + k * 0.137) % 1, a = k * 2.4 + t * 0.5, r = 3 + u * rh * 0.9, px = Math.round(x + Math.cos(a) * r), py = Math.round(y + Math.sin(a) * r * 0.7 - u * 6); if (u < 0.8 && Math.sin(t * 12 + k * 3) > -0.2) R.pset(px, py, u < 0.4 ? O[5] : O[3]); }
}

// la roca de delante (abajo a la derecha) y una mata de salvia (abajo a la izquierda)
function b_rocaDelante(R, t, mina) {
  const RO = mina ? b_PAL.rocaDi : b_PAL.rocaTa;
  b_elipse(R, 298, 174, 28, 18, (px, py, u, v) => { const s = py + px * 0.1, fb = ((s % 5) + 5) % 5; return b_tono(RO, 0.5 - v * 0.35 - u * 0.15 + (fb < 1 ? 0.1 : 0) + (h(px >> 1, py, 80) - 0.5) * 0.14 - (mina ? 0 : 0.1), px, py); });
  for (let x = 274; x < 320; x++) { const y = Math.round(174 - 18 * Math.sqrt(Math.max(0, 1 - ((x - 298) / 28) ** 2))); R.pset(x, y, RO[mina ? 8 : 7]); }
  const S = b_hx(['#3a4a3a', '#5a6a52', '#7a8a6a', '#9aa888']);
  for (let k = 0; k < 26; k++) { const a = k / 26 * Math.PI, r = 10 + h(k, 1, 81) * 8, sw = Math.sin(t * 1.6 + k * 0.3) * 1.2; const x = Math.round(10 + Math.cos(a) * r * 1.4 + sw), y = Math.round(182 - Math.sin(a) * r);
    R.linea(Math.round(10 + Math.cos(a) * 3), 180, x, y, S[k % 2]); R.pset(x, y, S[3]); R.pset(x + 1, y + 1, S[2]); }
}

// la veta de cuarzo de la grieta (en diagonal) y sus pepitas
const b_VETA = (y) => 170.2 + (y - 90) * 0.55 + Math.sin(y * 0.09) * 6;

const b_PEPITAS = [[72, -1], [78, 1], [84, 0], [88, -1], [91, 1], [95, 0], [99, -1], [104, 1], [110, 0], [66, 1], [117, -1]].map(([y, d]) => [Math.round(b_VETA(y)) + d, y]);

function b_rocaFijo(R) {
  const B = R.buf, RO = b_PAL.rocaTa, Q = b_hx(['#5a4e5a', '#7e7280', '#a49aa4', '#c8c0c0', '#e6e0da']);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const s = y * 1 + x * 0.12 + Math.sin(x * 0.03) * 6 + Math.sin(x * 0.011 + 2) * 10, banda = Math.floor(s / 14), fb = s - banda * 14;
    let l = 0.42 + (h(banda, 0, 90) - 0.5) * 0.24 + (h(x >> 1, y >> 1, 91) - 0.5) * 0.12 + (h(x, y, 92) > 0.9 ? 0.1 : h(x, y, 92) < 0.08 ? -0.1 : 0) - y / 180 * 0.12 + x / 320 * 0.06;
    if (fb < 1.5) l += 0.2; else if (fb > 12) l -= 0.2;
    // la grieta: el labio de la izquierda con luz, el fondo oscuro y la veta de cuarzo en el centro
    const xc = b_VETA(y), dx = x - xc, ancho = 6.5 + Math.sin(y * 0.13) * 1.5, roto = h(y >> 2, 0, 89) < 0.22 && h(x, y, 88) < 0.7;
    if (Math.abs(dx) < ancho) { const q = Math.abs(dx) / ancho; if (q < 0.36 && !roto) { B[y * 320 + x] = b_tono(Q, 0.62 - q * 1.1 + (h(x, y, 93) - 0.5) * 0.5 - (dx > 0 ? 0.22 : 0) - y / 180 * 0.15, x, y); continue; } l = dx < 0 ? 0.04 + (1 - q) * 0.05 : 0.08 + (q - 0.42) * 0.3; }
    else if (dx > -ancho - 2 && dx < 0) l += 0.3;
    // grietas pequeñas
    if (h(Math.floor((x + Math.sin(y * 0.2) * 2) / 23), banda, 94) < 0.18 && Math.round(x + Math.sin(y * 0.2) * 2) % 23 === 11) l = 0.05;
    B[y * 320 + x] = b_tono(RO, l, x, y);
  }
  // líquenes verdes y naranjas
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 95) * 320), y = Math.floor(h(k, 2, 95) * 170), c = k % 3 ? hex('#a8b06a') : hex('#d88a3a'); if (Math.abs(x - b_VETA(y)) < 14 || (x > 270 && y < 48)) continue; for (let j = 0; j < 5; j++) R.pset(x + Math.round((h(j, k, 96) - 0.5) * 5), y + Math.round((h(j, k, 97) - 0.5) * 3), j ? c : b_mez(c, hex('#ffffff'), 0.3)); }
  // una cornisa abajo con tierra, matas y un nopal
  for (let x = 0; x < 320; x++) { const yt = Math.round(160 + Math.sin(x * 0.04) * 3 + (x > 200 ? (x - 200) * 0.05 : 0)); for (let y = yt; y < 180; y++) B[y * 320 + x] = b_tono(b_PAL.arenaTa, 0.62 - (y - yt) * 0.03 + (h(x, y, 98) - 0.5) * 0.3, x, y); R.pset(x, yt, b_PAL.arenaTa[6]); }
  for (const [x, y] of [[40, 168], [74, 171], [262, 172]]) for (let k = 0; k < 9; k++) R.linea(x, y, x + Math.round((k - 4) * 1.2), y - 4 - (k % 3) * 2, k % 2 ? hex('#6a7a52') : hex('#8a9a6a'));
  const NO = b_hx(['#2a4a2a', '#3e6a3a', '#5a8a4a', '#80aa62']);
  for (const [x, y, rx, ry] of [[296, 166, 7, 5], [288, 157, 5, 4], [303, 154, 4, 5]]) { b_elipse(R, x, y, rx + 0.8, ry + 0.8, NO[0]); b_elipse(R, x, y, rx, ry, (px, py, u, v) => b_tono(NO, 0.6 - v * 0.3 - u * 0.25, px, py)); for (let k = 0; k < 4; k++) R.pset(Math.round(x + (h(k, x, 99) - 0.5) * rx * 1.4), Math.round(y + (h(k, y, 99) - 0.5) * ry * 1.4), hex('#e8e0b0')); }
  // las pepitas (apagadas)
  for (const [x, y] of b_PEPITAS) { R.pset(x, y, b_PAL.oro[1]); R.pset(x + 1, y, b_PAL.oro[0]); }
}

function b_roca(R, t, o) {
  R.copiar(b_capa(R, 'roca', () => b_rocaFijo(R)));
  const B = R.buf, br = b_lim(o.brillo ?? 0), O = b_PAL.oro;
  // la luz de la hoguera desde abajo a la izquierda, que tiembla
  const fl = 0.8 + Math.sin(t * 11) * 0.1 + Math.sin(t * 17.3) * 0.08, cal = hex('#ffa050');
  for (let y = 60; y < 180; y++) for (let x = 0; x < 200; x++) { const d = Math.hypot(x / 200, (180 - y) / 120); if (d >= 1) continue; if (b_um(x, y) < (1 - d) * 0.7 * fl) B[y * 320 + x] = b_mez(B[y * 320 + x], cal, 0.25); }
  // las pepitas que se encienden con el brillo, cada una con su destello
  for (let k = 0; k < b_PEPITAS.length; k++) { const [x, y] = b_PEPITAS[k], e = b_lim(br * 1.6 - k * 0.06); if (e <= 0) continue; R.pset(x, y, O[3 + Math.round(e * 2)]); R.pset(x + 1, y, O[3]); R.pset(x, y + 1, O[2]);
    if (Math.sin(t * 5 + k * 2.1) > 0.6 - e * 0.4) { R.pset(x - 1, y, O[4]); R.pset(x + 2, y, O[4]); R.pset(x, y - 1, O[4]); R.pset(x, y - 2, O[3]); } }
  b_destello(R, t, Math.round(b_VETA(90)), 90, br, null, 1.35);
  // la arenilla que cae por la grieta y la lagartija que cruza la pared
  for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1, y = Math.round(40 + u * 120), x = Math.round(b_VETA(y) - 6 + k); if (b_um(x, y) < 0.7) R.pset(x, y, b_PAL.arenaTa[5]); }
  { const u = (t * 0.07) % 1, x = Math.round(-20 + u * 360), y = Math.round(130 - u * 30 + Math.sin(u * 20) * 3), f = Math.floor(t * 8) % 2, L = hex('#5a6a4a'), Ls = hex('#3a4a32');
    if (x > -10 && x < 330) { R.rect(x - 3, y, x + 3, y + 1, L); R.rect(x - 3, y, x + 3, y, hex('#7a8a5a')); R.rect(x + 4, y, x + 5, y + 1, L); R.pset(x + 5, y, hex('#1a1a14')); R.linea(x - 4, y + 1, x - 9, y + 2, Ls);
      R.pset(x - 2, y + 2 + f, Ls); R.pset(x + 2, y + 2 + (1 - f), Ls); R.pset(x - 2, y - 1 - (1 - f), Ls); R.pset(x + 2, y - 1 - f, Ls); } }
  return { suelo: 172, brillo: [Math.round(b_VETA(90)), 90], toque: [166, 92], veta: [[Math.round(b_VETA(0)), 0], [Math.round(b_VETA(160)), 160]] };
}

// las crestas: el alto de cada capa
const b_cresta = (x, k) => [74 + Math.sin(x * 0.021 + 1) * 8 + Math.sin(x * 0.057) * 3, 86 + Math.sin(x * 0.017 + 4) * 6 + Math.sin(x * 0.043 + 1) * 3, 98 + Math.sin(x * 0.013 + 2) * 5 + Math.sin(x * 0.051 + 3) * 2][k];

const b_rio = (x) => 124 + Math.sin(x * 0.02 + 1) * 3;

const b_senda = (x) => 116 - x * 0.044 + Math.sin(x * 0.05) * 1.5;

function b_caminoFijo(R) {
  const B = R.buf, P = b_PAL;
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const l = y / 104 + Math.sin(x * 0.02 + y * 0.04) * 0.015 + (h(x >> 3, y >> 2, 100) - 0.5) * 0.03; B[y * 320 + x] = b_tono(P.cieloOt, l, x, y); }
  // el sol de la mañana con su halo tramado
  for (let y = 18; y < 54; y++) for (let x = 92; x < 132; x++) { const d = Math.hypot(x - 112, y - 36); if (d < 7) B[y * 320 + x] = d < 5.5 ? hex('#fffbe8') : hex('#fff0c0'); else if (d < 18 && b_um(x, y) < (18 - d) / 14) B[y * 320 + x] = b_mez(B[y * 320 + x], hex('#fff4d0'), 0.5); }
  // tres capas de montes: crestas azules, ladera azul verdosa con bosque, ladera de otoño
  for (let x = 0; x < 320; x++) {
    const y0 = Math.round(b_cresta(x, 0)), p0 = (b_cresta(x + 2, 0) - b_cresta(x - 2, 0)) * 0.12;
    for (let y = y0; y < 120; y++) { const barr = Math.sin(x * 0.21 + (y - y0) * 0.35 + Math.sin(x * 0.05) * 3) > 0.7 ? -0.1 : 0; B[y * 320 + x] = b_tono(P.cresta, 0.8 - p0 - (y - y0) * 0.012 + barr + (h(x >> 1, y >> 1, 101) - 0.5) * 0.14 + (y === y0 ? 0.15 : 0), x, y); }
    const y1 = Math.round(b_cresta(x, 1) - (h(x >> 1, 0, 117) > 0.5 ? 1 : 0)), p1 = (b_cresta(x + 2, 1) - b_cresta(x - 2, 1)) * 0.1;
    for (let y = y1; y < 120; y++) { const arb = h(x >> 1, y >> 1, 102); B[y * 320 + x] = b_tono(P.cresta, 0.38 - p1 - (y - y1) * 0.012 + (arb > 0.6 ? 0.14 : arb < 0.25 ? -0.16 : 0) + (y === y1 ? 0.12 : 0), x, y); } }
  // la ladera del otoño: copas redondas de robles rojos, arces amarillos, pinos oscuros, con la luz arriba a la izquierda
  for (let x = 0; x < 320; x++) { const y2 = Math.round(b_cresta(x, 2)); for (let y = y2; y < 122; y++) B[y * 320 + x] = P.otono[7]; }
  for (let k = 0; k < 420; k++) { const x = h(k, 1, 103) * 330 - 5, yt = b_cresta(Math.max(0, Math.min(319, x)), 2), y = yt + 1 + h(k, 2, 103) * (124 - yt), r = 2 + h(k, 3, 103) * 2.6, tipo = Math.floor(h(k, 4, 103) * 6);
    const base = [0.15, 0.3, 0.45, 0.6, 0.75, 0.95][tipo];
    R.disco(x, y, r, (px, py) => { const l = base + (-(py - y) / r * 0.06 - (px - x) / r * 0.04) + (h(px, py, 104) - 0.5) * 0.08; const i = Math.round(l * 7 + (b_um(px, py) - 0.5) * 0.9); return P.otono[Math.max(0, Math.min(7, i))]; }); }
  // la cabaña de troncos en la ladera
  { const x0 = 246, y0 = 106; R.rect(x0, y0, x0 + 12, y0 + 6, hex('#6a4a2a')); for (let y = y0; y <= y0 + 6; y += 2) R.linea(x0, y, x0 + 12, y, hex('#4a3020')); R.rect(x0 + 5, y0 + 2, x0 + 7, y0 + 6, hex('#1e1410')); R.pset(x0 + 2, y0 + 2, hex('#f0c060'));
    for (let i = 0; i <= 8; i++) R.linea(x0 - 2 + i, y0, x0 + 6, y0 - 5, hex('#5a4a3a')); for (let i = 0; i <= 8; i++) R.linea(x0 + 6, y0 - 5, x0 + 6 + i, y0, hex('#7a6248')); R.rect(x0 + 9, y0 - 7, x0 + 10, y0 - 2, hex('#7a6a60')); }
  // el camino de herradura de la ladera
  for (let x = 0; x < 320; x++) { if (h(x >> 3, 2, 105) < 0.2) continue; const y = Math.round(b_senda(x) + Math.sin(x * 0.13) * 0.8); R.pset(x, y, P.tierra[4]); R.pset(x, y + 1, P.tierra[1]); }
  // unas copas por delante del camino de la ladera (lo tapan a ratos)
  for (let k = 0; k < 40; k++) { const x = h(k, 7, 103) * 320, y = b_senda(x) + 3 + h(k, 8, 103) * 3, r = 2 + h(k, 9, 103) * 1.5, base = [0.15, 0.3, 0.45, 0.6, 0.95][k % 5];
    R.disco(x, y, r, (px, py) => P.otono[Math.max(0, Math.min(7, Math.round((base - (py - y) / r * 0.06 + (h(px, py, 104) - 0.5) * 0.08) * 7 + (b_um(px, py) - 0.5) * 0.9)))]); }
  // el río con sus orillas, el vado de piedras y la pradera seca
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const yr = b_rio(x); if (y < yr - 6) continue;
    if (y < yr - 4) { B[y * 320 + x] = b_tono(P.tierra, 0.4 + (h(x, y, 106) - 0.5) * 0.4, x, y); continue; }
    if (y < yr + 5) { const q = Math.abs(y - yr) / 4.5; B[y * 320 + x] = b_tono(b_hx(['#3a5a6a', '#5a8098', '#86aac0', '#b8d4e0', '#e8f2f4']), 0.8 - q * 0.5 + Math.sin(x * 0.3 + y) * 0.05, x, y); continue; }
    if (y < yr + 7) { B[y * 320 + x] = b_tono(P.tierra, 0.3, x, y); continue; }
    const d = (y - yr) / 50; B[y * 320 + x] = b_tono(P.seca, 0.85 - d * 0.5 + (h(x >> 1, y, 107) - 0.5) * 0.25 + (h(x, y >> 1, 108) > 0.85 ? 0.15 : 0), x, y); }
  for (let k = 0; k < 9; k++) { const x = 156 + k * 5 + (k % 2), y = Math.round(b_rio(x) + (k % 3) - 1); b_elipse(R, x, y, 2, 1.3, (px, py, u, v) => (v < 0 ? hex('#a8a098') : hex('#6a645e'))); }
  // el camino de tierra de primer término: rodadas de cascos, piedras, bordes con hierba
  for (let x = 0; x < 320; x++) { const yc = 151 + Math.sin(x * 0.015) * 2, w = 9;
    for (let y = Math.round(yc - w - 2); y <= Math.round(yc + w + 2); y++) { const q = (y - yc) / w; if (Math.abs(q) > 1.2) continue; if (Math.abs(q) > 1 && h(x, y, 109) > 0.5) continue;
      B[y * 320 + x] = b_tono(P.tierra, 0.7 - q * 0.25 + (h(x >> 1, y, 110) - 0.5) * 0.2 + (Math.abs(q) > 0.9 ? -0.2 : 0), x, y); } }
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 111) * 320), y = Math.round(151 + Math.sin(x * 0.015) * 2 + (h(k, 2, 111) - 0.5) * 14); R.rect(x, y, x + 1, y, P.tierra[1]); R.pset(x, y + 1, P.tierra[5]); }
  for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 3, 111) * 320), y = Math.round(150 + (h(k, 4, 111) - 0.5) * 16); b_elipse(R, x, y, 2, 1.4, (px, py, u, v) => (v < -0.2 ? hex('#b0a898') : hex('#7a7068'))); }
  // hojas caídas y matas en la pradera
  for (let k = 0; k < 200; k++) { const x = Math.floor(h(k, 5, 112) * 320), y = 132 + Math.floor(h(k, 6, 112) * 48); if (Math.abs(y - 151) < 9) continue; R.pset(x, y, P.otono[1 + (k % 4)]); }
  for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 1, 119) * 320), y = 136 + Math.floor(h(k, 2, 119) * 44); if (Math.abs(y - 151) < 11) continue; const a = 2 + (y - 130) * 0.08;
    for (let i = -2; i <= 2; i++) R.linea(x, y, x + i * 1.2, Math.round(y - a + Math.abs(i) * 0.6), i === 0 ? P.seca[6] : P.seca[i & 1 ? 2 : 4]); }
  for (let k = 0; k < 10; k++) { const x = Math.floor(h(k, 3, 119) * 300) + 10, y = 168 + Math.floor(h(k, 4, 119) * 10); b_elipse(R, x, y, 3.5, 2.2, (px, py, u, v) => b_tono(b_hx(['#4a4440', '#6a625a', '#8e857a', '#b4aa9c']), 0.6 - v * 0.4 - u * 0.15, px, py)); }
  // el roble grande de la izquierda (tronco con corteza; la copa la pinta la rama de delante y aquí la de detrás)
  for (let y = 40; y < 160; y++) { const w = 8 + Math.max(0, y - 140) * 0.4; for (let x = 0; x < w; x++) B[y * 320 + x] = b_tono(b_hx(['#2a1e16', '#3e2c20', '#5a4030', '#7a5a42']), 0.3 + x / w * 0.5 + ((y + x * 3) % 7 === 0 ? -0.2 : 0) + (h(x, y >> 2, 113) - 0.5) * 0.2, x, y); }
  for (let k = 0; k < 18; k++) { const bx = 6 + h(k, 1, 114) * 40, by = 36 + h(k, 2, 114) * 40, br = 5 + h(k, 3, 114) * 5; R.disco(bx, by, br, (px, py) => b_tono(P.otono.slice(0, 5), 0.6 - (py - by) / br * 0.25 - (px - bx) / br * 0.15 + (h(px, py, 115) - 0.5) * 0.3, px, py)); }
  // el pino de la derecha
  for (let y = 52; y < 158; y++) { const pi = (y - 52) % 12, w = Math.round((y - 52) * 0.16 + pi * 1.1) + 2;
    for (let x = 319 - w; x < 320; x++) { const borde = x - (319 - w); if (borde < 2 && h(x, y, 118) < 0.5) continue; B[y * 320 + x] = b_tono(b_PAL.pino, 0.62 - pi / 12 * 0.45 - (x > 316 ? 0.15 : 0) + (borde < 3 ? 0.12 : 0) + (h(x, y, 116) - 0.5) * 0.3, x, y); } }
  R.rect(312, 150, 319, 160, hex('#4a3424'));
}

function b_camino(R, t, o) {
  R.copiar(b_capa(R, 'camino', () => b_caminoFijo(R)));
  const B = R.buf, P = b_PAL;
  // nubes a tres velocidades (no tocan el sol ni la esquina de Atom)
  for (const [yb, n, v, w, c] of [[48, 3, 1.1, 40, 0], [62, 4, 2.2, 24, 1], [72, 3, 3.4, 14, 2]]) for (let k = 0; k < n; k++) { const x = ((h(k, c, 120) * 420 + t * v) % 440) - 60;
    b_cumulo(R, x, yb + Math.round(h(k, c, 121) * 4), w * (0.7 + h(k, c, 122) * 0.6), k + c * 5, c === 2 ? [P.cumulo[1], P.cumulo[1], P.cumulo[2], P.cumulo[2]] : P.cumulo, (px, py) => py < b_cresta(Math.max(0, Math.min(319, px)), 0) && !(px > 272 && py < 46) && Math.hypot(px - 112, py - 36) > 9); }
  // gansos en uve hacia el sur
  { const u = (t % 14) / 14, x0 = 340 - u * 400; for (let k = 0; k < 7; k++) { const lado = k % 2 ? 1 : -1, n = Math.ceil(k / 2), x = Math.round(x0 + n * 6), y = Math.round(56 + lado * n * 3), a = Math.sin(t * 8 + k) > 0;
    R.rect(x - 1, y, x + 1, y, hex('#3a3a3a')); R.pset(x - 2, y, hex('#1a1a1a')); R.pset(x, y + (a ? -1 : 1), hex('#5a5a5a')); R.pset(x + 1, y + (a ? -2 : 2), hex('#5a5a5a')); } }
  // el humo de la cabaña
  for (let k = 0; k < 5; k++) { const u = (t * 0.2 + k / 5) % 1, x = Math.round(256 + u * 10 + Math.sin(u * 5 + t) * 2), y = Math.round(97 - u * 26), r = 1 + u * 3; for (let j = -1; j <= 1; j++) for (let i = -Math.round(r); i <= r; i++) if (b_um(x + i, y + j) < 0.6 * (1 - u)) R.pset(x + i, y + j, hex('#d8d8e0')); }
  // el ciervo que pasta en el linde del bosque y levanta la cabeza
  { const x = 196, y = 121, alza = Math.sin(t * 0.6) > 0.4, D = hex('#8a5a32'), Dl = hex('#b07a48');
    R.rect(x - 4, y - 5, x + 3, y - 3, D); R.rect(x - 4, y - 5, x + 3, y - 5, Dl); R.pset(x - 5, y - 5, hex('#f0e8d8')); for (const lx of [-4, -2, 1, 3]) R.linea(x + lx, y - 2, x + lx, y, hex('#5a3a22'));
    if (alza) { R.linea(x + 3, y - 5, x + 5, y - 9, D); R.rect(x + 5, y - 10, x + 7, y - 9, D); R.pset(x + 4, y - 11, hex('#5a3a22')); R.pset(x + 6, y - 11, hex('#5a3a22')); } else { R.linea(x + 3, y - 4, x + 6, y - 1, D); R.pset(x + 7, y - 1, D); } }
  // el río: rizos y brillos que corren, y la espuma de los rápidos en el vado
  for (let k = 0; k < 40; k++) { const x = (k * 37 + Math.floor(t * 14)) % 320, y = Math.round(b_rio(x) + ((k * 5) % 7) - 3); if (Math.sin(t * 4 + k) > 0) R.pset(x, y, hex('#e8f4f8')); R.pset(x + 1, y, hex('#a8c8d8')); }
  for (let k = 0; k < 12; k++) { const x = 154 + k * 4 + Math.round(Math.sin(t * 6 + k) * 1.2), y = Math.round(b_rio(x) + 1 + (k % 2)); R.pset(x, y, hex('#ffffff')); if (Math.sin(t * 9 + k * 2) > 0) R.pset(x + 1, y + 1, hex('#d8e8f0')); }
  // la recua pequeña por el camino de la ladera (siete mulas cargadas y tres jinetes) hacia el este
  if (o.recua) { const x0 = ((t * 4) % 420) - 100;
    for (let k = 0; k < 10; k++) { const x = Math.round(x0 - k * 10), y = Math.round(b_senda(Math.max(0, Math.min(319, x)))), f = Math.floor(t * 5 + k) % 2, jin = k === 0 || k === 4 || k === 9;
      if (x < -6 || x > 326) continue;
      const c = jin ? hex('#5a3a22') : hex('#6a5a50'); R.rect(x - 3, y - 4, x + 2, y - 2, c); R.pset(x + 3, y - 5, c); R.pset(x + 3, y - 4, c); R.pset(x + 4, y - 4, c); R.pset(x + 3, y - 6, c);
      R.pset(x - 3 + f, y - 1, hex('#2a1a10')); R.pset(x + 2 - f, y - 1, hex('#2a1a10')); R.pset(x - 4, y - 3, hex('#2a1a10'));
      if (jin) { R.pset(x, y - 5, hex('#a8443a')); R.pset(x, y - 6, hex('#d8a078')); R.rect(x - 1, y - 7, x + 1, y - 7, hex('#3a2a1a')); }
      else { R.rect(x - 2, y - 6, x + 1, y - 5, hex('#c8b48a')); R.pset(x - 2, y - 4, hex('#a8946a')); R.pset(x + 1, y - 4, hex('#a8946a')); } } }
  // las hojas que caen y se mecen
  for (let k = 0; k < 14; k++) { const v = 9 + (k % 4) * 3, y = 20 + ((k * 41 + t * v) % 150), x = Math.round(((k * 67 + t * 6) % 330) - 5 + Math.sin(t * 2 + k) * 5), f = Math.floor(t * 4 + k) % 2, c = P.otono[1 + (k % 4)];
    const yy = Math.round(y); if (x > 270 && yy < 46) continue; R.pset(x, yy, c); R.pset(x + (f ? 1 : -1), yy, c); }
  // la hierba seca del borde del camino, que se mece
  for (let k = 0; k < 60; k++) { const x = Math.floor(h(k, 1, 123) * 320), y0 = k % 2 ? 140 : 166, a = 3 + h(k, 2, 123) * 4, sw = Math.sin(t * 1.6 + x * 0.06); for (let j = 0; j < a; j++) R.pset(Math.round(x + sw * (j / a) * 1.5), y0 - j, j > a - 2 ? P.seca[6] : P.seca[3]); }
  return { suelo: 150, libre: [20, 300], rio: [118, 132], vado: [154, 200], senda: [[0, 116], [320, 102]], cabana: [246, 100], camino: [141, 161] };
}

// la rama de roble que cuelga por delante a la izquierda y helechos en las esquinas de abajo
function b_ramaDelante(R, t) {
  const P = b_PAL.otono, sw = Math.sin(t * 1.2) * 1.5;
  R.linea(0, 22, 30, 40 + Math.round(sw * 0.5), hex('#3e2c20')); R.linea(0, 23, 30, 41 + Math.round(sw * 0.5), hex('#2a1e16')); R.linea(18, 33, 44, 56 + Math.round(sw), hex('#3e2c20'));
  for (let k = 0; k < 22; k++) { const u = h(k, 1, 130), x = Math.round(4 + u * 44 + sw * u), y = Math.round(34 + u * 24 + (h(k, 2, 130) - 0.5) * 12 + sw * u * 0.6), c = P[1 + (k % 4)];
    R.rect(x - 1, y, x + 1, y + 1, c); R.pset(x, y + 2, c); R.pset(x - 1, y, b_mez(c, hex('#ffffff'), 0.25)); R.pset(x + 1, y + 1, P[0]); }
  const helecho = (x0, k) => { for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.35, L = 12 + h(i, k, 131) * 6, s2 = Math.sin(t * 1.5 + i + k) * 0.06;
    for (let j = 0; j < L; j++) { const x = Math.round(x0 + Math.cos(a + s2) * j + Math.sin(j * 0.2) * (i - 2.5) * 0.3), y = Math.round(181 + Math.sin(a + s2) * j + j * j * 0.012); R.pset(x, y, b_PAL.seca[2]); if (j % 2 === 0) { R.pset(x - 1, y, b_PAL.seca[4]); R.pset(x + 1, y + 1, b_PAL.seca[1]); } } } };
  helecho(10, 1); helecho(306, 2);
}

// tramado de Bayer 4×4 (umbral 0–1 por píxel), el límite 0–1 y la mezcla de dos colores del lienzo (0xAABBGGRR)
const c_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const c_um = (x, y) => c_BAYER[((y & 3) << 2) | (x & 3)];

const c_lim = (u) => Math.max(0, Math.min(1, u));

function c_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// un tono de una rampa (oscuro → claro) con v 0–1, tramado entre escalones
const c_tono = (ramp, v, x, y) => ramp[Math.max(0, Math.min(ramp.length - 1, Math.floor(v * (ramp.length - 1) + c_um(x, y))))];

const c_hx = (a) => a.map(hex);

// las capas fijas: se pintan una vez en un búfer de R.nuevo() (vacío = transparente) y se guardan por clave
const c_CACHE = new Map();

function c_capa(R, clave, dibuja) {
  let e = c_CACHE.get(clave);
  if (!e) { const b = R.nuevo(), prev = R.usar(b); const extra = dibuja(b) || {}; R.usar(prev); e = { b, ...extra }; c_CACHE.set(clave, e); }
  return e;
}

// pega una capa con huecos (los píxeles a 0 dejan ver lo de debajo): un recorrido de la pantalla
function c_pegar(R, b) { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c) B[i] = c; } }

// pset que solo pinta donde la máscara m (Uint8Array 320×180) vale 1 (el cielo, lo lejano)
const c_psM = (B, m, x, y, c) => { x |= 0; y |= 0; if (x >= 0 && x < 320 && y >= 0 && y < 180 && m[y * 320 + x]) B[y * 320 + x] = c; };

function c_discoM(B, m, cx, cy, r, c) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, Math.ceil(cy + r)), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, Math.ceil(cx + r)), r2 = r * r;
  for (let y = y0; y <= y1; y++) { const dy = y + 0.5 - cy, f = y * 320; for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx; if (dx * dx + dy * dy <= r2 && m[f + x]) B[f + x] = c; } }
}

// cúmulo de tres tonos con la base plana (c = [sombra, cuerpo, luz]), solo dentro de la máscara; ap < 1 lo aplasta
function c_nube(B, m, cx, cy, w, sem, c, ap = 1) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06 * ap, r]); }
  for (const [x, y, r] of bolas) c_discoM(B, m, x, y + 1, r, c[0]);
  for (const [x, y, r] of bolas) c_discoM(B, m, x, y, r, c[1]);
  for (const [x, y, r] of bolas) c_discoM(B, m, x - (c.length > 3 ? -1 : 1), y - 2, r * 0.68, c[2]);
  const y0 = Math.round(cy + w * 0.08 * ap); for (let x = Math.round(cx - w * 0.47); x <= Math.round(cx + w * 0.47); x++) { c_psM(B, m, x, y0, c[0]); c_psM(B, m, x, y0 + 1, c[0]); }
}

// cifras de 3×5 (las de los papeles de números)
const c_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function c_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { if (ch === ',') { R.pset(x, y + 5, c); x += 2; continue; } const g = c_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } return x; }

// las paletas del condado: de noche bajo la luna (fría, azulada) y de día (otoño temprano en Virginia)
const c_PAL = {
  noche: {
    cielo: c_hx(['#060a1a', '#0a1024', '#0e162e', '#131c38', '#192442', '#202c4c', '#283656', '#324260']),
    nube: c_hx(['#161e36', '#26304e', '#56648a', '#9aa8c4']),
    picos: c_hx(['#111830', '#182038', '#1f2944', '#283452', '#334062', '#465476', '#62728e']),
    cresta: c_hx(['#0f1628', '#141c32', '#1a243c', '#223048']),
    lejos: c_hx(['#0a1020', '#0e1628', '#141e32', '#1c283e', '#26344c']),
    copa: c_hx(['#070d18', '#0b1420', '#101c2a', '#172636', '#203446', '#2e4658', '#46607a']),
    pino: c_hx(['#060c14', '#0a121c', '#0e1a26', '#142432', '#1c3040', '#2a4254']),
    tronco: c_hx(['#08090f', '#0f1119', '#171a24', '#212634', '#2e3546', '#46506a']),
    suelo: c_hx(['#0a0b12', '#10131c', '#171b26', '#1f2532', '#2a3240', '#384252', '#4c586a']),
    hoja: c_hx(['#2a2230', '#3a2c38', '#4a3a40', '#2e3440', '#5a4648']),
    agua: c_hx(['#0c1428', '#142038', '#1e2c4a', '#34466a', '#6a7ea4', '#c8d4ec']),
    piedra: c_hx(['#11141e', '#1a1e2a', '#262c3a', '#363e50', '#4e586e', '#6e7a92']),
    muro: c_hx(['#161a26', '#262c3a', '#3a4256', '#525c74', '#727e98', '#9aa6be']),
    musgo: c_hx(['#14201e', '#1c2c26', '#283a30']),
    helecho: c_hx(['#060c10', '#0c1818', '#142420', '#1e3228', '#2e4636']),
    bruma: hex('#5a6886'),
  },
  dia: {
    cielo: c_hx(['#3e7cc4', '#4886ca', '#5290d0', '#5e9ad4', '#6aa4d8', '#7aaedc', '#8cbae0', '#a2c8e4']),
    nube: c_hx(['#8aa0c0', '#bccce0', '#e8eef4', '#ffffff']),
    picos: c_hx(['#3c5a6c', '#466676', '#507282', '#5a7e8c', '#668a96', '#7898a2', '#8eaab0']),
    cresta: c_hx(['#3a5a5a', '#446864', '#4e746c', '#5a8072']),
    lejos: c_hx(['#2c4a36', '#365640', '#40624a', '#4e7052', '#5e7e5c']),
    copa: c_hx(['#1a2c1a', '#223a20', '#2e4a26', '#3c5c2c', '#4e7034', '#66863e', '#84a04c']),
    pino: c_hx(['#122218', '#18301e', '#203e26', '#2a4e2e', '#365e36', '#466e3e']),
    tronco: c_hx(['#1e140e', '#2c1e14', '#3c2a1c', '#4e3826', '#644a32', '#7e6244']),
    suelo: c_hx(['#2a1e12', '#382818', '#46341e', '#564026', '#684e2e', '#7c5e38', '#927046']),
    hoja: c_hx(['#8a4a1e', '#a8662a', '#c4843a', '#6a7230', '#9a3a1e']),
    agua: c_hx(['#244a5a', '#2e5a6a', '#3a6c7c', '#4e8292', '#7eaab6', '#e6f2f4']),
    piedra: c_hx(['#3a3834', '#4c4a44', '#605e56', '#76746a', '#8e8c80', '#aaa89a']),
    muro: c_hx(['#3a3834', '#4c4a44', '#605e56', '#76746a', '#8e8c80', '#aaa89a']),
    musgo: c_hx(['#3a5222', '#4a642a', '#5e7a32']),
    helecho: c_hx(['#14281a', '#1e3a20', '#2a4e28', '#3a6630', '#528040']),
    bruma: hex('#c8d8e0'),
  },
};

// jirón de nube (elipse de borde deshilachado), solo en la máscara: cuerpo, sombra abajo y el canto de arriba claro
function c_jiron(B, m, cx, cy, rx, ry, sem, c0, c1, c2) {
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, Math.ceil(cy + ry)); y++) { const f = y * 320, dy = (y - cy) / ry;
    for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, Math.ceil(cx + rx)); x++) { if (!m[f + x]) continue; const e = ((x - cx) / rx) ** 2 + dy * dy + (h((x - cx) >> 2, y >> 1, sem) - 0.5) * 0.6;
      if (e < 1) B[f + x] = e > 0.7 ? (dy < 0 ? c2 : c0) : dy > 0.3 ? c0 : c1; } }
}

// copa de roble o nogal: racimos de hojas en bolas, con la luz que llega de (lx, ly) y el borde deshilachado; pasa
// por debajo una función opcional deja(x, y) que devuelve false donde no se debe pintar
function c_copa(R, cx, cy, rx, ry, ramp, sem, lx = 0.6, ly = -0.8, deja = null) {
  const bolas = [], n = 8 + Math.round(rx / 5), m = Math.min(rx, ry);
  for (let i = 0; i < n; i++) { const a = h(i, sem, 1) * Math.PI * 2, d = Math.sqrt(h(i, sem, 2)) * 0.7; bolas.push([cx + Math.cos(a) * d * rx, cy + Math.sin(a) * d * ry, (0.3 + h(i, sem, 3) * 0.22) * m * 1.3]); }
  bolas.push([cx, cy, m * 0.62]);
  bolas.sort((a, b) => a[1] - b[1]);
  for (let y = Math.max(0, Math.floor(cy - ry * 1.25)); y <= Math.min(179, cy + ry * 1.25); y++) for (let x = Math.max(0, Math.floor(cx - rx * 1.25)); x <= Math.min(319, cx + rx * 1.25); x++) {
    if (deja && !deja(x, y)) continue;
    let v = null;
    // la bola de más abajo que contiene el píxel manda (las de delante tapan a las de detrás)
    for (const [bx, by, r] of bolas) { const dx = x + 0.5 - bx, dy = y + 0.5 - by, d = Math.sqrt(dx * dx + dy * dy) / r + (h(x >> 1, y >> 1, sem) - 0.5) * 0.42 + (h(x, y, sem + 9) - 0.5) * 0.16;
      if (d < 1) v = 0.42 + (dx * lx + dy * ly) / r * 0.42 + (1 - d) * 0.12 - (y - cy) / ry * 0.12; }
    if (v === null) continue;
    const q = h(x, y, sem + 4);
    R.pset(x, y, c_tono(ramp, c_lim(v + (q < 0.1 ? -0.22 : q > 0.95 ? 0.18 : 0)), x, y));
  }
}

// pino o abeto (Tsuga): pisos que cuelgan, con el lado de la luz más claro y agujas sueltas en el borde
function c_pino(R, cx, tip, base, ancho, ramp, sem, luz = 1, deja = null) {
  const alto = base - tip, pisos = Math.max(4, Math.round(alto / 9));
  for (let y = Math.max(0, tip); y <= Math.min(179, base); y++) {
    const u = (y - tip) / alto, p = u * pisos, fr = p - Math.floor(p), hw = (0.5 + u * 0.5) * ancho / 2 * (0.45 + 0.55 * fr) * Math.min(1, u * 4 + 0.15);
    for (let x = Math.floor(cx - hw - 2); x <= cx + hw + 2; x++) {
      if (deja && !deja(x, y)) continue;
      const s = (x - cx) / Math.max(1, hw), borde = Math.abs(s) + (h(x, y, sem) - 0.5) * 0.5;
      if (borde > 1) continue;
      const v = 0.38 + s * 0.3 * luz + (fr > 0.75 ? -0.15 : fr < 0.2 ? 0.12 : 0) + (h(x >> 1, y, sem + 3) - 0.5) * 0.25;
      R.pset(x, y, c_tono(ramp, c_lim(v), x, y));
    }
  }
}

// tronco con corteza en surcos verticales, el canto de la luz a un lado (luz 1 = derecha)
function c_tronco(R, x0, x1, y0, y1, ramp, sem, luz = 1, deja = null) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const ens = y > y1 - 6 ? (y - (y1 - 6)) * 0.6 : 0;
    for (let x = Math.floor(x0 - ens); x <= Math.ceil(x1 + ens); x++) { if (deja && !deja(x, y)) continue;
      const s = ((x - x0) / Math.max(1, x1 - x0) - 0.5) * 2 * luz, surco = h(x, (y + Math.floor(h(x, 0, sem) * 9)) >> 2, sem) < 0.3;
      R.pset(x, y, c_tono(ramp, c_lim(0.35 + s * 0.3 + (surco ? -0.25 : 0) + (h(x, y >> 1, sem + 1) - 0.5) * 0.15), x, y)); } }
}

// rama: una línea gruesa que adelgaza, con el lomo claro
function c_rama(R, x0, y0, x1, y1, g0, g1, ramp) {
  const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0));
  for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u, g = g0 + (g1 - g0) * u;
    for (let j = -g / 2; j <= g / 2; j += 0.5) R.pset(x, y + j, j < -g / 2 + 1 ? ramp[4] : j > g / 2 - 1 ? ramp[0] : ramp[2]); }
}

// una piedra redondeada con la luz arriba a la derecha y su sombra
function c_piedra(R, cx, cy, rx, ry, ramp, sem, musgo = null) {
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
    const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry, d = dx * dx + dy * dy + (h(x, y, sem) - 0.5) * 0.25; if (d > 1) continue;
    let v = 0.45 + dx * 0.25 - dy * 0.35 - d * 0.15 + (h(x >> 1, y, sem + 2) - 0.5) * 0.2;
    if (musgo && dy < -0.3 && h(x, y >> 1, sem + 3) < 0.55) { R.pset(x, y, c_tono(musgo, c_lim(0.4 + dx * 0.4), x, y)); continue; }
    R.pset(x, y, c_tono(ramp, c_lim(v), x, y));
  }
}

// el perfil de los picos: Sharp Top (la punta, x 112) y Flat Top (la loma ancha, x 186), y las lomas de delante
const c_picoY = (x) => { const s = 56 + Math.pow(Math.abs(x - 112), 1.15) * 0.62, f = Math.abs(x - 186) < 80 ? 66 + ((x - 186) / 44) ** 2 * 22 : 999, r = 93 + 3 * Math.sin(x * 0.05); return Math.min(s, f, r) + (h(x >> 1, 7, 480) - 0.5) * 1.6; };

const c_picoLiso = (x) => { const s = 56 + Math.pow(Math.abs(x - 112), 1.15) * 0.62, f = Math.abs(x - 186) < 80 ? 66 + ((x - 186) / 44) ** 2 * 22 : 999, r = 93 + 3 * Math.sin(x * 0.05); return Math.min(s, f, r); };

const c_crestaY = (x) => 99 + 3 * Math.sin(x * 0.04 + 1) + 2 * Math.sin(x * 0.11) - (h(x >> 2, 3, 481) > 0.6 ? 1 : 0) - (h(x >> 1, 4, 481) > 0.7 ? 1 : 0);

const c_lejosY = (x) => { const k = Math.floor(x / 6), u = (x % 6) / 6 - 0.5; return 107 + h(k, 1, 482) * 3 - Math.round(Math.sqrt(Math.max(0, 0.25 - u * u)) * (5 + h(k, 2, 482) * 5)); };

// el arroyo del bosque: centro y medio ancho
const c_arroyoY = (x) => 121 + 4 * Math.sin(x * 0.02 + 0.6) + x * 0.022;

const c_arroyoW = (x) => 1.3 + x * 0.012;

// el fondo lejano (cielo, luna o sol velado, picos, lomas y bosque lejano), con sus máscaras de cielo y de lejos
function c_fondoMontes(R, P, noche, luna, hor = 120) {
  const cielo = new Uint8Array(57600), lejos = new Uint8Array(57600);
  for (let x = 0; x < 320; x++) {
    const yp = c_picoY(x), yc = c_crestaY(x), yl = c_lejosY(x), dp = c_picoLiso(x + 3) - c_picoLiso(x - 3);
    for (let y = 0; y < hor + 8 && y < 180; y++) {
      let c;
      if (y < yp && y < yc && y < yl) { c = c_tono(P.cielo, Math.pow(y / (hor - 10), 1.2), x, y); cielo[y * 320 + x] = 1; }
      else if (y < yc && y < yl) {
        // la roca y el bosque de los picos: la cara de la luna más clara, vetas de roca arriba, motas de árbol abajo
        const pr = y - yp, ld = Math.max(-1, Math.min(1, dp / 4)), lado = noche ? ld * 0.24 : -ld * 0.16;
        // las cárcavas que bajan en diagonal por la ladera, el lomo iluminado y el bosque que cubre la falda
        const sg = Math.sign(dp) || 1, gx = Math.floor((x - sg * pr * 0.9) / 4), carc = h(gx, 0, 488) > 0.62;
        let v = 0.34 + lado + (pr < 2 ? 0.22 : pr < 4 ? 0.1 : 0) - pr * 0.004 + (h(x >> 1, y >> 1, 483) - 0.5) * 0.12 + (carc ? -0.16 : 0);
        if (pr > 9 && h(x >> 1, y >> 1, 484) > 0.5) v -= 0.12;
        if (pr > 9 && h(x >> 1, (y - 1) >> 1, 484) > 0.5 && h(x >> 1, y >> 1, 484) <= 0.5) v += 0.1;
        if (pr < 14 && h((x + y) >> 1, x >> 2, 485) > 0.8) v += 0.1;
        c = c_tono(P.picos, c_lim(v + (y - 60) * 0.004), x, y); lejos[y * 320 + x] = 1;
      } else if (y < yl) {
        // las lomas de delante: bosque continuo, con copas que asoman claras en el lomo
        const pr = y - yc, cop = h(x >> 1, (y + (x >> 2)) >> 1, 486);
        c = c_tono(P.cresta, c_lim(0.5 - pr * 0.05 + (cop > 0.6 ? 0.25 : cop < 0.25 ? -0.2 : 0) + (pr < 2 ? 0.2 : 0)), x, y); lejos[y * 320 + x] = 1;
      } else {
        // el bosque lejano: copas redondas con la luz arriba
        const k = Math.floor(x / 6), u = (x % 6) / 6, pr = y - yl;
        c = c_tono(P.lejos, c_lim(0.55 - pr * 0.05 + (u - 0.5) * (noche ? 0.4 : -0.3) + (h(x, y >> 1, 487) - 0.5) * 0.3 + (pr < 2 ? 0.2 : 0)), x, y); lejos[y * 320 + x] = 1;
        if (k < 0) c = 0;
      }
      R.pset(x, y, c);
    }
  }
  // la luna (de noche) con su halo tramado y sus mares; de día, el brillo del sol que no se ve, arriba a la derecha
  if (noche) {
    const [mx, my] = luna, HAL = hex('#8494bc');
    for (let y = my - 30; y <= my + 30; y++) for (let x = mx - 30; x <= mx + 30; x++) { if (x < 0 || x > 319 || y < 0 || !cielo[y * 320 + x]) continue; const d = Math.hypot(x - mx, y - my); if (d < 9 || d > 30) continue;
      const a = 0.42 * (1 - (d - 9) / 21) ** 1.6; if (a > 0.02) R.pset(x, y, c_mezcla(R.pget(x, y), HAL, a * (0.7 + c_um(x, y) * 0.6))); }
    R.disco(mx, my, 8.5, hex('#c8ccbc'));
    R.disco(mx, my, 8, (x, y, d) => c_tono(c_hx(['#a8ac9c', '#ccd0bc', '#e8ecd8', '#f8faf0']), c_lim(0.85 - d * 0.35 + (x - mx) * 0.03 - (y - my) * 0.02), x, y));
    for (const [dx, dy, r] of [[-3, -2, 2.2], [2, 2, 1.8], [-1, 3, 1.2], [3, -3, 1]]) R.disco(mx + dx, my + dy, r, hex('#b4b8a6'));
    R.pset(mx + 4, my - 4, hex('#ffffff')); R.pset(mx + 5, my - 3, hex('#ffffff'));
  }
  return { cielo, lejos };
}

// el suelo del bosque: la tierra con charcos de sombra bajo las copas y claros de luz alargados, y encima, sueltas, hojas
// caídas (más grandes cuanto más cerca), ramitas, piedrecitas, matas de hierba y alguna seta
function c_sueloBosque(R, P, noche, y0, sem = 0, deja = null) {
  const luzEn = (x, y) => Math.sin(x * 0.045 + y * 0.12 + sem) + Math.sin(x * 0.021 - y * 0.08 + 2 + sem) * 0.8 + Math.sin(x * 0.09 + 1) * 0.3;
  for (let y = y0; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (deja && !deja(x, y)) continue;
    const prof = (y - y0) / (180 - y0), l = luzEn(x, y);
    const v = 0.22 + prof * 0.26 + (l > 0.9 ? 0.2 : l > 0.6 ? 0.1 : l < -1 ? -0.1 : 0) + (h(x >> 2, y >> 1, 491 + sem) - 0.5) * 0.12;
    R.pset(x, y, c_tono(P.suelo, c_lim(v), x, y));
  }
  const ok = (x, y) => x >= 0 && x < 320 && y >= y0 && y < 180 && (!deja || deja(Math.round(x), Math.round(y)));
  const LZ = hex(noche ? '#8a9ab8' : '#ffe8b0');
  for (let k = 0; k < 1500; k++) {
    const y = Math.floor(y0 + Math.pow(h(k, 1, 493 + sem), 0.8) * (180 - y0)), x = Math.floor(h(k, 2, 493 + sem) * 320); if (!ok(x, y)) continue;
    const prof = (y - y0) / (180 - y0), lit = luzEn(x, y) > 0.6, c0 = P.hoja[Math.floor(h(k, 3, 493) * P.hoja.length)], c = lit ? c_mezcla(c0, LZ, 0.25) : c_mezcla(c0, P.suelo[1], 0.25), cs = c_mezcla(c, P.suelo[0], 0.5), cl = c_mezcla(c, LZ, 0.35);
    const r = h(k, 4, 493);
    if (r < 0.04) { const L = 3 + prof * 5, a = h(k, 5, 493) * 0.8 - 0.4; for (let i = 0; i < L; i++) if (ok(x + i, y + i * a)) R.pset(x + i, y + i * a, P.tronco[3]); continue; }   // ramita
    if (r < 0.07) { R.pset(x, y, P.piedra[4]); if (ok(x + 1, y)) R.pset(x + 1, y, P.piedra[3]); if (ok(x, y + 1)) R.pset(x, y + 1, P.piedra[1]); continue; }   // piedrecita
    if (r < 0.1 && prof > 0.2) { for (let j = 0; j < 3 + prof * 3; j++) { const xx = x + (j % 3) - 1, yy = y - Math.floor(j / 2); if (ok(xx, yy)) R.pset(xx, yy, P.musgo[j % 3]); } continue; }   // mata
    if (r < 0.112 && prof > 0.35) { R.pset(x, y, hex('#e8dcc0')); R.pset(x - 1, y - 1, hex(noche ? '#8a5a4a' : '#c0402a')); R.pset(x, y - 1, hex(noche ? '#9a6a5a' : '#d8502e')); R.pset(x + 1, y - 1, hex(noche ? '#8a5a4a' : '#c0402a')); continue; }   // seta
    // la hoja: un rombo de 2–5 px con su nervio y su sombra
    const s = Math.round(prof * 2 * h(k, 6, 493));
    if (ok(x + 1, y + 1)) R.pset(x + 1, y + 1, cs);
    for (let j = -s; j <= s; j++) for (let i = -s - 1; i <= s + 1; i++) if (Math.abs(i) / (s + 1.5) + Math.abs(j) / (s + 0.5) <= 1 && ok(x + i, y + j)) R.pset(x + i, y + j, j < 0 ? cl : c);
    if (s > 1) R.pset(x, y, cs);
  }
}

// la capa de cerca del bosque (suelo, arroyo, muro de piedra, árboles del medio y de delante); hoy: marcas de pintura
function c_cercaBosque(R, P, noche, hoy) {
  const L = noche ? 1 : -0.6;
  const gy = (x) => 112 + Math.round(h(x >> 3, 1, 494) * 2);
  c_sueloBosque(R, P, noche, 111, 0, (x, y) => y >= gy(x));
  // el sendero (de día: tierra pisada que se pierde hacia el fondo)
  if (!noche) for (let y = 116; y < 180; y++) { const u = (y - 116) / 64, cx = 196 - u * 50 + Math.sin(u * 5) * 14, w = 3 + u * 22;
    for (let x = Math.floor(cx - w); x <= cx + w; x++) { const e = Math.abs(x - cx) / w + (h(x, y, 495) - 0.5) * 0.3; if (e > 1) continue; R.pset(x, y, h(x >> 1, y, 496) > 0.88 ? P.hoja[1] : c_tono(P.suelo, c_lim(0.62 + u * 0.25 - e * 0.25 + (h(x, y, 497) - 0.5) * 0.2), x, y)); } }
  // el arroyo: orillas húmedas, el agua con su corriente y piedras con musgo
  for (let x = 0; x < 320; x++) { const yc = c_arroyoY(x), w = c_arroyoW(x);
    for (let y = Math.floor(yc - w - 1.5); y <= yc + w + 1.5; y++) { const d = (y + 0.5 - yc) / w;
      if (Math.abs(d) > 1) { R.pset(x, y, d < 0 ? P.suelo[0] : P.suelo[1]); continue; }
      R.pset(x, y, c_tono(P.agua, c_lim(0.32 + (d < -0.5 ? -0.12 : 0) + Math.sin(x * 0.4 + y * 1.3) * 0.08 + (x > 190 && x < 260 && noche ? 0.12 : 0)), x, y)); } }
  for (let k = 0; k < 16; k++) { const x = 8 + k * 20 + h(k, 1, 498) * 10, yc = c_arroyoY(x), w = c_arroyoW(x); c_piedra(R, x, yc + (h(k, 2, 498) - 0.5) * w * 2.2, 1.6 + w * 0.5, 1 + w * 0.28, P.piedra, 500 + k, h(k, 3, 498) < 0.5 ? P.musgo : null); }
  // el tronco caído con musgo, detrás de la acción (x 206–250)
  for (let x = 206; x <= 250; x++) { const yy = 134 + (x - 206) * 0.05; for (let j = -3; j <= 3; j++) { const v = 0.4 - j * 0.12 + (h(x >> 1, j, 499) - 0.5) * 0.2;
    R.pset(x, yy + j, j <= -2 && h(x, j, 501) < 0.6 ? c_tono(P.musgo, 0.5, x, j) : c_tono(P.tronco, c_lim(v + (h(x, 0, 502) < 0.15 ? -0.3 : 0)), x, yy + j)); } }
  R.disco(206, 134, 3, P.tronco[2]); R.disco(206, 134, 2, P.tronco[4]); R.pset(206, 134, P.tronco[1]);
  for (const [x, y] of [[214, 137], [231, 138], [246, 139]]) { R.pset(x, y, hex(noche ? '#8a8a9a' : '#e8d8b8')); R.pset(x + 1, y, hex(noche ? '#6a6a7a' : '#c84a2a')); R.pset(x, y + 1, P.tronco[4]); }
  // árboles del medio: un pino a la izquierda de Sharp Top, el roble de la izquierda y dos pinos a la derecha
  c_pino(R, 86, 70, 124, 24, P.pino, 510, L);
  c_tronco(R, 85, 87, 118, 125, P.tronco, 511, L);
  c_pino(R, 232, 78, 120, 20, P.pino, 512, L);
  c_tronco(R, 231, 233, 114, 121, P.tronco, 513, L);
  c_pino(R, 254, 58, 128, 32, P.pino, 514, L);
  c_tronco(R, 252, 256, 120, 130, P.tronco, 515, L);
  c_tronco(R, 36, 46, 66, 134, P.tronco, 516, L);
  c_rama(R, 44, 84, 76, 74, 4, 1.5, P.tronco); c_rama(R, 38, 78, 14, 62, 4, 1.5, P.tronco);
  c_copa(R, 42, 58, 38, 26, P.copa, 517, noche ? 0.6 : -0.5, -0.8, (x, y) => !(x >= 20 && y < 22));
  // el muro de piedra seca medio caído (x 50–150, base y 142): hiladas de piedras, un tramo hundido y piedras sueltas
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 14; k++) {
    const x = 52 + k * 7.4 + (fila % 2) * 3.5 + h(k, fila, 520) * 2, caido = x > 92 && x < 118;
    if (caido && fila > 0) continue; if (x > 150) continue;
    c_piedra(R, x, 140 - fila * 4.2 + (caido ? 2 : 0), 3.6 + h(k, fila, 521) * 0.8, 2.2, P.muro, 530 + k * 3 + fila, fila === 2 || (caido && fila === 0) ? P.musgo : null);
  }
  for (const [x, y, r] of [[100, 147, 2.6], [108, 149, 2.2], [119, 146, 2], [95, 150, 1.8]]) c_piedra(R, x, y, r + 1, r * 0.7, P.piedra, 560 + x, P.musgo);
  // de delante: el tronco grande de la izquierda (con sus raíces y una rama alta) y el abeto oscuro de la derecha
  c_tronco(R, -2, 13, 0, 166, P.tronco, 570, L * 0.7);
  for (const [x1, y1] of [[24, 168], [18, 172], [30, 163]]) c_rama(R, 8, 160, x1, y1, 5, 2, P.tronco);
  c_rama(R, 10, 34, 50, 26, 5, 2, P.tronco); c_rama(R, 30, 30, 44, 38, 2, 1, P.tronco);
  c_copa(R, 30, 30, 22, 10, P.copa, 571, noche ? 0.6 : -0.5, -0.8, (x, y) => !(x >= 20 && y < 23));
  c_pino(R, 298, 52, 156, 58, P.pino, 572, L * 0.6);
  c_tronco(R, 294, 302, 146, 160, P.tronco, 573, L);
  // hoy: las marcas de pintura del sendero en los troncos (rectángulos blancos, sin letras)
  if (hoy) for (const [x, y] of [[4, 96], [40, 104], [252, 121], [86, 119]]) { R.rect(x, y, x + 2, y + 4, hex('#f4f2ea')); R.rect(x + 2, y, x + 2, y + 4, hex('#c8c6ba')); R.pset(x, y + 4, hex('#d8d6ca')); }
}

// el bosque: fondo fijo + nubes y estrellas + bruma + capa de cerca + la vida
function c_bosque(R, t, o) {
  const noche = !!o.noche, hoy = !noche && !!o.hoy, P = noche ? c_PAL.noche : c_PAL.dia, LUNA = [226, 30];
  const F = c_capa(R, 'bosque|fondo|' + noche, () => c_fondoMontes(R, P, noche, LUNA));
  const N = c_capa(R, 'bosque|cerca|' + noche + '|' + hoy, () => { c_cercaBosque(R, P, noche, hoy); });
  R.copiar(F.b);
  const B = R.buf, m = F.cielo;
  // las estrellas que titilan (de noche) y las nubes en tres alturas a tres velocidades
  if (noche) for (let k = 0; k < 150; k++) { const x = Math.round(h(k, 1, 620) * 319), y = Math.round(h(k, 2, 620) ** 1.4 * 92); if ((x > 272 && y < 48) || (x > 18 && x < 172 && y < 16) || Math.hypot(x - LUNA[0], y - LUNA[1]) < 16) continue;
    const tw = Math.sin(t * (1.3 + h(k, 3, 620) * 2.2) + k * 1.7); if (tw > -0.5) c_psM(B, m, x, y, tw > 0.55 ? hex('#f4f6ff') : hex('#7a86b4')); if (k % 11 === 0 && tw > 0.75) { c_psM(B, m, x + 1, y, hex('#7a86b4')); c_psM(B, m, x - 1, y, hex('#7a86b4')); c_psM(B, m, x, y - 1, hex('#7a86b4')); c_psM(B, m, x, y + 1, hex('#7a86b4')); } }
  const NB = P.nube;
  for (let k = 5; k >= 0; k--) { const capa = k % 3, w = [52, 30, 18][capa] + h(k, 4, 621) * 12, y = [38, 58, 76][capa] + h(k, 5, 621) * 8, vel = [2.2, 1.3, 0.6][capa], x = ((h(k, 6, 621) * 460 + t * vel) % 480) - 80;
    const cols = noche ? (Math.abs(x - LUNA[0]) < 46 ? [NB[0], NB[1], NB[3]] : [NB[0], NB[0], NB[2]]) : capa === 2 ? [NB[0], NB[1], NB[2]] : [NB[1], NB[2], NB[3]];
    if (noche) c_jiron(B, m, x, y, w * 0.75, 6 - capa, 30 + k, cols[0], cols[1], Math.abs(x - LUNA[0]) < 50 ? NB[3] : NB[2]);
    else c_nube(B, m, x, y, w * (capa === 0 ? 0.8 : 1), 30 + k, cols, capa === 0 ? 0.85 : 0.7); }
  // la bruma baja que se arrastra por las lomas y el bosque lejano (de noche más espesa)
  const BR = P.bruma, fz = noche ? 0.55 : 0.3;
  for (let y = 92; y < 124; y++) { const fy = Math.sin((y - 92) / 32 * Math.PI); for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!F.lejos[i]) continue;
    const a = fz * fy * (0.55 + 0.45 * Math.sin(x * 0.025 + t * 0.35 + y * 0.18) * Math.sin(x * 0.011 - t * 0.2 + 1)); if (a > 0.04) B[i] = c_mezcla(B[i], BR, a * 0.55); } }
  // las aves: de día una bandada en V que cruza lejos; de noche, un murciélago que revolotea
  if (!noche) for (let k = 0; k < 4; k++) { const x = ((t * 9 + k * 7) % 380) - 30 + k * 6, y = 50 + Math.sin(t * 0.7) * 3 + Math.abs(k - 1.5) * 3, a = Math.sin(t * 8 + k) > 0;
    if (x > 272 && y < 48) continue; const cc = hex('#2a3040'); R.pset(x, y, cc); R.pset(x - 1, y - (a ? 1 : 0), cc); R.pset(x + 1, y - (a ? 1 : 0), cc); R.pset(x - 2, y - (a ? 2 : -1), cc); R.pset(x + 2, y - (a ? 2 : -1), cc); }
  else { const u = (t * 0.14) % 1, x = 40 + u * 220, y = 60 + Math.sin(u * 19) * 8 + Math.sin(t * 3) * 2, a = Math.sin(t * 16) > 0, cc = hex('#04060c');
    R.pset(x, y, cc); R.pset(x, y - 1, cc); R.linea(x - 3, y - (a ? 2 : -1), x - 1, y, cc); R.linea(x + 1, y, x + 3, y - (a ? 2 : -1), cc); }
  c_pegar(R, N.b);
  const B2 = R.buf;
  // el arroyo que corre: destellos que se mueven aguas abajo, y el reflejo de la luna temblando
  for (let k = 0; k < 46; k++) { const x0 = (h(k, 1, 630) * 320 + t * (6 + h(k, 2, 630) * 6)) % 320, yc = c_arroyoY(x0), w = c_arroyoW(x0), y = yc + (h(k, 3, 630) - 0.5) * w * 1.4, f = Math.sin(t * 3 + k * 1.3);
    if (f < 0.1 || B2[Math.round(y) * 320 + Math.round(x0)] === 0) continue; R.pset(x0, y, P.agua[f > 0.7 ? 5 : 4]); if (f > 0.6) R.pset(x0 + 1, y, P.agua[4]); }
  if (noche) for (let j = 0; j < 3; j++) { const x = 228 + Math.sin(t * 2.2 + j * 2) * 2, y = c_arroyoY(228) - 1 + j; R.linea(x - 3 + j, y, x + 3 - j + Math.round(Math.sin(t * 3 + j)), y, j === 1 ? P.agua[5] : P.agua[4]); }
  // el búho en la rama del roble del medio (de noche): parpadea y gira la cabeza
  if (noche) { const bx = 64, by = 72, gira = Math.sin(t * 0.6) > 0.6 ? 1 : 0, ojo = (t % 3.7) < 0.15 ? P.tronco[2] : hex('#e8c040');
    R.rect(bx - 2, by - 6, bx + 2, by, hex('#2a2a36')); R.rect(bx - 2, by - 8, bx + 2, by - 6, hex('#363644')); R.pset(bx - 2, by - 9, hex('#363644')); R.pset(bx + 2, by - 9, hex('#363644'));
    R.pset(bx - 1 + gira, by - 7, ojo); R.pset(bx + 1 + gira, by - 7, ojo); R.pset(bx + gira, by - 6, hex('#8a7040')); R.pset(bx - 1, by - 3, hex('#4a4a5a')); R.pset(bx + 1, by - 2, hex('#4a4a5a')); R.pset(bx - 1, by + 1, hex('#8a7040')); R.pset(bx + 1, by + 1, hex('#8a7040')); }
  // de día: una ardilla que corre por el muro, se para y mueve la cola
  if (!noche) { const u = (t * 0.09) % 1, cor = u < 0.45, x = Math.round(cor ? 54 + u / 0.45 * 34 : u < 0.7 ? 88 : 88 + (u - 0.7) / 0.3 * 60), y = (x > 92 && x < 118 ? 140 : 133) - (cor && Math.floor(t * 10) % 2 ? 1 : 0), c = hex('#8a5a34'), cs = hex('#5a3a22');
    R.rect(x, y - 2, x + 3, y, c); R.pset(x + 4, y - 2, c); R.pset(x + 4, y - 3, cs); R.pset(x + 5, y - 2, hex('#1a1210')); const cola = cor ? 0 : Math.round(Math.sin(t * 9)); R.pset(x - 1, y - 2 + cola, c); R.pset(x - 2, y - 3, c); R.pset(x - 2, y - 4, c); R.pset(x - 1, y - 5 + cola, cs); R.pset(x + 1, y + 1, cs); R.pset(x + 3, y + 1, cs);
    // hoy: un excursionista diminuto que sube por el sendero, lejos
    if (hoy) { const v = (t * 0.03) % 1, px = 176 - v * 20, py = 117 + v * 3, paso = Math.floor(t * 4) % 2; R.rect(px, py - 6, px + 1, py - 3, hex('#c84a2a')); R.pset(px, py - 7, hex('#d8a880')); R.pset(px + 1, py - 7, hex('#3a2a1a')); R.pset(px - 1, py - 5, hex('#3a5a7a')); R.pset(px - 1, py - 4, hex('#3a5a7a')); R.pset(px + paso, py - 2, hex('#2a2a3a')); R.pset(px + 1 - paso, py - 1, hex('#2a2a3a')); } }
  // las luciérnagas (de noche) o las motas de polen y las hojas que caen (de día)
  if (noche) for (let k = 0; k < 18; k++) { const x = 20 + h(k, 1, 640) * 280 + Math.sin(t * 0.5 + k) * 10, y = 104 + h(k, 2, 640) * 60 + Math.sin(t * 0.7 + k * 2) * 6, b = Math.sin(t * (1.5 + h(k, 3, 640)) + k * 2.1);
    if (b < 0.2) continue; R.pset(x, y, b > 0.7 ? hex('#f4ff9a') : hex('#b8d050')); if (b > 0.75) { const g = hex('#5a7030'); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + dx, y + dy, c_mezcla(R.pget(x + dx, y + dy), g, 0.6)); } }
  for (let k = 0; k < 7; k++) { const per = 7 + h(k, 1, 650) * 4, u = ((t + h(k, 2, 650) * per) % per) / per, x = [30, 50, 60, 250, 260, 290, 40][k] + u * 30 + Math.sin(u * 14 + k) * 6, y = [40, 60, 72, 80, 90, 100, 34][k] + u * 110;
    if (y > 178) continue; const c = P.hoja[k % P.hoja.length], g = Math.sin(u * 14 + k) > 0; R.pset(x, y, c); R.pset(x + (g ? 1 : -1), y, c_mezcla(c, hex('#000000'), 0.3)); }
  // la hoja de números en el suelo, con su esquina que se levanta con la brisa y la luz de la luna encima
  let hoja = null;
  if (o.hoja) { hoja = [170, 163]; c_hojaSuelo(R, t, hoja[0], hoja[1], noche, LUNA); }
  return { suelo: 150, libre: [30, 260], hoja, luna: noche ? LUNA : null, horizonte: 112, arroyo: [c_arroyoY(160), 120], muro: [50, 150, 134], tronco: [206, 250, 134] };
}

// la hoja vieja de papel con números, tirada entre las hojas (cx, cy: su centro); de noche, un haz de luna la alumbra
function c_hojaSuelo(R, t, cx, cy, noche, luna) {
  const PAP = c_hx(['#6a5e48', '#9a8a68', '#c0b08a', '#dccca4', '#ece2c8']), TIN = hex('#2a2418');
  if (noche) { // el haz: un trapecio de luz tramada que baja de la luna hasta la hoja, con motas que flotan dentro
    const [lx, ly] = luna, HZ = hex('#8a9ac0');
    for (let y = ly + 14; y < cy + 8; y++) { const u = (y - ly) / (cy - ly), xc = lx + (cx - lx) * u, w = 3 + u * 20, a = 0.08 + u * 0.16;
      for (let x = Math.floor(xc - w); x <= xc + w; x++) { if (x < 0 || x > 319) continue; const e = Math.abs(x - xc) / w; if (e < 1) R.pset(x, y, c_mezcla(R.pget(x, y), HZ, a * (1 - e * e) * 0.9)); } }
    for (let k = 0; k < 10; k++) { const u = ((h(k, 1, 660) + t * 0.04) % 1), xc = lx + (cx - lx) * u + Math.sin(t + k) * (2 + u * 10), y = ly + (cy - ly) * u; if (y > ly + 16 && Math.sin(t * 2 + k) > 0) R.pset(xc, y, hex('#c8d4ec')); }
    // el resplandor sobre la hojarasca alrededor
    for (let y = cy - 16; y < cy + 18; y++) for (let x = cx - 34; x < cx + 34; x++) { const d = Math.hypot((x - cx) / 34, (y - cy) / 16); if (d < 1 && c_um(x, y) < (1 - d) * 0.6) R.pset(x, y, c_mezcla(R.pget(x, y), hex('#7a88a8'), 0.3)); }
  }
  // la hoja (44 × 28), un poco girada: la sombra, el papel con manchas, el doblez, la esquina que aletea
  const x0 = cx - 22, y0 = cy - 14, ang = -0.06, X = (i, j) => x0 + i + j * ang, Y = (i, j) => y0 + j - i * ang * 0.5;
  R.poligono([[X(0, 0) + 2, Y(0, 0) + 2], [X(44, 0) + 2, Y(44, 0) + 2], [X(44, 28) + 2, Y(44, 28) + 2], [X(0, 28) + 2, Y(0, 28) + 2]], hex(noche ? '#05070c' : '#2a1e12'));
  R.poligono([[X(0, 0), Y(0, 0)], [X(44, 0), Y(44, 0)], [X(44, 28), Y(44, 28)], [X(0, 28), Y(0, 28)]], (x, y) => {
    const i = x - x0, j = y - y0, man = h(x >> 2, y >> 2, 661) > 0.82 ? -0.18 : 0, borde = i < 1.5 || i > 42.5 || j < 1.5 || j > 26.5 ? -0.15 : 0;
    return c_tono(PAP, c_lim((noche ? 0.7 : 0.78) + man + borde + (Math.abs(i - 22) < 0.8 ? -0.2 : 0) + (h(x, y, 662) - 0.5) * 0.1), x, y); });
  const filas = ['71,194,38', '1701,89,76', '464,62,807', '486,22,10'];
  filas.forEach((f, j) => { R.recorte([Math.floor(X(2, 0)), 0, Math.ceil(X(42, 0)), 179]); c_cifras(R, f, Math.round(X(4, 3 + j * 6)), Math.round(Y(4, 3 + j * 6)), TIN); R.recorte(null); });
  // una hoja de roble encima de una esquina, y la esquina de arriba que se levanta con la brisa
  const b = Math.max(0, Math.sin(t * 1.3)) * 3, ex = Math.round(X(44, 0)), ey = Math.round(Y(44, 0));
  R.poligono([[ex - 7, ey], [ex, ey], [ex, ey + 7]], PAP[noche ? 1 : 2]);
  R.poligono([[ex - 7, ey - b * 0.6], [ex - 1, ey - b], [ex, ey + 7 - b * 0.4]], PAP[noche ? 3 : 4]);
  const hx0 = Math.round(X(-4, 26)), hy0 = Math.round(Y(-4, 26));
  R.poligono([[hx0 - 4, hy0 + 2], [hx0 + 2, hy0 - 2], [hx0 + 7, hy0 + 1], [hx0 + 2, hy0 + 5]], hex(noche ? '#4a3a3a' : '#a8662a')); R.linea(hx0 - 4, hy0 + 2, hx0 + 6, hy0 + 1, hex(noche ? '#2a2026' : '#6a3a1a'));
}

// por delante en el bosque: helechos en las dos esquinas de abajo, que se mecen con la brisa
function c_helechos(R, t, noche, o = {}) {
  const P = noche ? c_PAL.noche : c_PAL.dia, HL = P.helecho;
  const fronda = (x0, y0, ang, lar, k) => {
    const sw = Math.sin(t * 1.4 + k * 1.7) * 0.06;
    for (let i = 0; i < lar; i++) { const u = i / lar, a = ang + sw * u + u * u * 0.9 * Math.sign(Math.cos(ang)), x = x0 + Math.cos(ang) * i * 0.9 + Math.cos(a) * i * 0.1, y = y0 + Math.sin(ang) * i * 0.9 + u * u * lar * 0.35;
      R.pset(x, y, HL[1]); const fol = (1 - u) * 4 + 1;
      if (i % 2 === 0) for (let j = 1; j <= fol; j++) { R.pset(x + j * 0.6, y - j * 0.7 + j * 0.2, c_tono(HL, c_lim(0.75 - j / fol * 0.4), x + j, y)); R.pset(x - j * 0.6, y + j * 0.5, c_tono(HL, c_lim(0.4 - j / fol * 0.3), x - j, y)); } }
  };
  for (let k = 0; k < 6; k++) fronda(6 + k * 2, 182, -Math.PI / 2 + 0.25 + k * 0.22, 18 + (k % 3) * 5, k);
  for (let k = 0; k < 6; k++) fronda(312 - k * 2, 182, -Math.PI / 2 - 0.25 - k * 0.22, 18 + (k % 3) * 5, k + 7);
  return {};
}

const c_CLARO = {
  pasto: c_hx(['#0a1416', '#0f1c1c', '#152620', '#1d3226', '#28402e', '#3a5638', '#567046']),
  muro: c_hx(['#060b14', '#0a121c', '#0f1a26', '#162432', '#203244', '#2e4458']),
  roble: c_hx(['#0a0c14', '#141822', '#1e2430', '#2a3242', '#3c4658', '#566278']),
  tierra: c_hx(['#120e0e', '#1e1816', '#2c241e', '#3c3226', '#52442e', '#6a5838']),
};

// la línea de árboles que rodea el claro (copas redondas y puntas de pino, con el canto de la luna arriba)
const c_lineaClaroY = (x) => { const k = Math.floor(x / 11), u = (x % 11) / 11 - 0.5, pino = h(k, 3, 700) < 0.35, alto = 58 + h(k, 1, 700) * 22 + Math.sin(x * 0.02) * 6;
  return pino ? alto - 14 + Math.abs(u) * 34 : alto - Math.sqrt(Math.max(0, 0.3 - u * u)) * 18 + (h(x >> 1, 0, 701) - 0.5) * 2; };

// el arroyo del claro, que cruza por detrás en diagonal suave
const c_goseY = (x) => 118 + Math.sin(x * 0.025) * 3 + x * 0.03;

const c_goseW = (x) => 2 + x * 0.008;

// el roble grande: tronco x 216–238, base y 148, copa encima (x 160–276, y 22–86)
const c_ROBLE = { x0: 216, x1: 238, base: 148, cx: 222, cy: 50 };

// el hoyo: centro y medio ancho, al pie del roble entre las raíces
const c_HOYO = [196, 154];

function c_claro(R, t, o) {
  const P = c_PAL.noche, LUNA = [74, 30];
  const F = c_capa(R, 'claro|fondo', () => {
    const cielo = new Uint8Array(57600), lejos = new Uint8Array(57600);
    for (let x = 0; x < 320; x++) { const yl = c_lineaClaroY(x), yp = 70 + Math.abs(x - 140) * 0.55;   // Sharp Top, pequeño, asoma lejos
      for (let y = 0; y < 128; y++) {
        let c;
        if (y < yl && y < yp) { c = c_tono(P.cielo, Math.pow(y / 110, 1.1), x, y); cielo[y * 320 + x] = 1; }
        else if (y < yl) { c = c_tono(P.picos, c_lim(0.3 + (x > 140 ? 0.18 : -0.05) + (y - yp < 2 ? 0.2 : 0) + (h(x >> 1, y >> 1, 702) - 0.5) * 0.15), x, y); lejos[y * 320 + x] = 1; }
        else { const pr = y - yl, k = Math.floor(x / 11), u = (x % 11) / 11 - 0.5;
          c = c_tono(c_CLARO.muro, c_lim(0.45 - pr * 0.012 + (pr < 2 ? 0.35 : pr < 5 ? 0.12 : 0) + (u + 0.2) * (x < LUNA[0] + 60 ? -0.25 : 0.25) * (pr < 14 ? 1 : 0.3) + (h(x >> 1, y >> 1, 703) - 0.5) * 0.25 + (h(k, 3, 700) < 0.35 && (y - yl) % 6 < 2 ? -0.12 : 0)), x, y); lejos[y * 320 + x] = 1; }
        R.pset(x, y, c);
      } }
    // pinos sueltos, más altos que la línea, en silueta con el canto de la luna
    for (const [x, tip, w] of [[22, 44, 20], [128, 52, 16], [304, 58, 22], [176, 62, 14]]) c_pino(R, x, tip, 112, w, c_CLARO.muro, 722 + x, -1);
    // la luna, a la izquierda, con su halo
    const [mx, my] = LUNA, HAL = hex('#8494bc');
    for (let y = my - 28; y <= my + 28; y++) for (let x = mx - 28; x <= mx + 28; x++) { if (y < 0 || !cielo[y * 320 + x]) continue; const d = Math.hypot(x - mx, y - my); if (d < 8 || d > 28) continue; R.pset(x, y, c_mezcla(R.pget(x, y), HAL, 0.4 * (1 - (d - 8) / 20) ** 1.6)); }
    R.disco(mx, my, 7.5, (x, y, d) => c_tono(c_hx(['#a8ac9c', '#ccd0bc', '#e8ecd8', '#f8faf0']), c_lim(0.85 - d * 0.35 - (x - mx) * 0.03 - (y - my) * 0.02), x, y));
    for (const [dx, dy, r] of [[2, -2, 2], [-2, 2, 1.6], [1, 3, 1]]) R.disco(mx + dx, my + dy, r, hex('#b4b8a6'));
    return { cielo, lejos };
  });
  const N = c_capa(R, 'claro|cerca', () => {
    // el claro: hierba alta con briznas, más clara donde da la luna, y la tierra pisada del centro
    for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < c_lineaClaroY(x) + 40 && y < 112) continue;
      const prof = (y - 104) / 76, l = Math.sin(x * 0.03 + y * 0.09) + Math.sin(x * 0.07 - y * 0.05 + 1) * 0.6, pis = Math.hypot((x - 150) / 110, (y - 158) / 18) < 1;
      R.pset(x, y, pis && h(x >> 1, y, 710) < 0.7 ? c_tono(c_CLARO.tierra, c_lim(0.35 + prof * 0.3 + (h(x, y, 711) - 0.5) * 0.3), x, y) : c_tono(c_CLARO.pasto, c_lim(0.2 + prof * 0.3 + (l > 0.8 ? 0.15 : 0) + (h(x, y >> 1, 712) - 0.5) * 0.18), x, y)); }
    for (let k = 0; k < 900; k++) { const y = 108 + Math.floor(Math.pow(h(k, 1, 713), 0.7) * 72), x = Math.floor(h(k, 2, 713) * 320), prof = (y - 104) / 76;
      if (Math.hypot((x - 150) / 110, (y - 158) / 18) < 0.9) continue; const L = 2 + Math.round(prof * 5 * h(k, 3, 713)), inc = h(k, 4, 713) - 0.5;
      for (let i = 0; i < L; i++) R.pset(x + inc * i, y - i, c_CLARO.pasto[Math.min(6, 2 + Math.round(i / L * 3 + prof * 1.5))]); }
    // Goose Creek: el agua entre piedras, con una cascadita a la derecha
    for (let x = 0; x < 320; x++) { const yc = c_goseY(x), w = c_goseW(x);
      for (let y = Math.floor(yc - w - 1); y <= yc + w + 1; y++) { const d = (y + 0.5 - yc) / w; if (Math.abs(d) > 1) { R.pset(x, y, P.suelo[d < 0 ? 0 : 2]); continue; }
        R.pset(x, y, c_tono(P.agua, c_lim(0.35 + (d < -0.4 ? -0.15 : 0) + Math.sin(x * 0.5 + y) * 0.08 + (x > 50 && x < 100 ? 0.15 : 0)), x, y)); } }
    for (let k = 0; k < 18; k++) { const x = 6 + k * 18 + h(k, 1, 714) * 8, w = c_goseW(x); c_piedra(R, x, c_goseY(x) + (h(k, 2, 714) - 0.5) * w * 2.4, 2 + w * 0.6, 1.3 + w * 0.3, P.muro, 715 + k, h(k, 3, 714) < 0.5 ? P.musgo : null); }
    // las raíces que se extienden por el suelo y se hunden, con el canto de la luna
    const RO = c_ROBLE;
    for (const [x1, y1, g] of [[176, 158, 5], [190, 152, 4], [262, 160, 6], [254, 152, 4], [206, 162, 4], [278, 152, 3], [160, 152, 3]]) { const x0 = x1 < 227 ? RO.x0 + 3 : RO.x1 - 3;
      const n = Math.ceil(Math.hypot(x1 - x0, y1 - 144)); for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + (x1 - x0) * u, y = 144 + (y1 - 144) * u - Math.sin(u * Math.PI) * 3, gg = g * (1 - u * 0.75);
        for (let j = -gg / 2; j <= gg / 2; j += 0.5) R.pset(x, y + j, j < -gg / 2 + 1 ? P.tronco[5] : j > gg / 2 - 1 ? P.tronco[0] : c_tono(P.tronco, c_lim(0.45 + (h(Math.round(x), Math.round(y + j), 716) - 0.5) * 0.3), x, y + j)); } }
    // el tronco del roble, ancho y nudoso, y sus ramas grandes
    c_tronco(R, RO.x0, RO.x1, 60, RO.base, c_CLARO.roble, 717, -1);
    for (let y = 70; y < RO.base; y++) if (h(0, y >> 2, 721) > 0.25) R.pset(RO.x0 + (y > RO.base - 6 ? -1 : 0), y, c_CLARO.roble[5]);
    R.disco(224, 112, 2, P.tronco[0]); R.disco(224, 112, 1, P.tronco[1]);
    c_rama(R, 220, 78, 176, 58, 7, 2, P.tronco); c_rama(R, 234, 74, 268, 52, 6, 2, P.tronco); c_rama(R, 226, 66, 222, 30, 6, 2, P.tronco); c_rama(R, 180, 60, 150, 66, 3, 1, P.tronco);
    c_copa(R, 200, 44, 44, 22, P.copa, 718, -0.6, -0.8);
    c_copa(R, 246, 50, 30, 18, P.copa, 719, -0.6, -0.8, (x, y) => !(x > 274 && y < 46));
    c_copa(R, 222, 30, 30, 14, P.copa, 720, -0.6, -0.8, (x, y) => !(x > 274 && y < 46));
    // un farol colgado de la rama de la izquierda (la cuerda y el farol; la luz se pinta en cada fotograma)
    R.linea(166, 62, 166, 74, hex('#3a3026'));
    // una pala y un pico apoyados en el tronco
    R.linea(242, 146, 252, 112, hex('#6a4a2a')); R.linea(243, 146, 253, 112, hex('#4a3220')); R.poligono([[238, 146], [246, 146], [245, 152], [239, 152]], P.piedra[4]); R.linea(238, 152, 245, 152, P.piedra[2]);
    R.linea(212, 146, 206, 116, hex('#6a4a2a')); R.poligono([[200, 118], [212, 113], [214, 115], [202, 120]], P.piedra[3]);
  });
  R.copiar(F.b);
  const B = R.buf, m = F.cielo;
  for (let k = 0; k < 130; k++) { const x = Math.round(h(k, 1, 720) * 319), y = Math.round(h(k, 2, 720) ** 1.3 * 70); if ((x > 272 && y < 48) || (x > 18 && x < 172 && y < 16) || Math.hypot(x - LUNA[0], y - LUNA[1]) < 14) continue;
    const tw = Math.sin(t * (1.2 + h(k, 3, 720) * 2) + k); if (tw > -0.4) c_psM(B, m, x, y, tw > 0.6 ? hex('#f4f6ff') : hex('#6a76a4')); }
  for (let k = 0; k < 4; k++) { const x = ((h(k, 6, 721) * 400 + t * (1 + k * 0.6)) % 440) - 60, y = 22 + k * 9; c_jiron(B, m, x, y, 26 + k * 6, 4, 40 + k, P.nube[0], P.nube[1], Math.abs(x - LUNA[0]) < 40 ? P.nube[3] : P.nube[2]); }
  // la bruma que sale del arroyo y se arrastra por el pie de los árboles
  for (let y = 88; y < 124; y++) { const fy = Math.sin((y - 88) / 36 * Math.PI); for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!F.lejos[i]) continue;
    const a = 0.5 * fy * (0.5 + 0.5 * Math.sin(x * 0.03 + t * 0.4 + y * 0.2) * Math.sin(x * 0.013 - t * 0.25)); if (a > 0.04) B[i] = c_mezcla(B[i], P.bruma, a * 0.5); } }
  c_pegar(R, N.b);
  // el agua que corre y la espuma de la cascadita
  for (let k = 0; k < 40; k++) { const x = (h(k, 1, 730) * 320 + t * (8 + h(k, 2, 730) * 6)) % 320, w = c_goseW(x), y = c_goseY(x) + (h(k, 3, 730) - 0.5) * w * 1.4, f = Math.sin(t * 3 + k * 1.3); if (f > 0.2) R.pset(x, y, P.agua[f > 0.7 ? 5 : 4]); }
  for (let k = 0; k < 8; k++) { const x = 72 + k * 2 + Math.sin(t * 6 + k) , y = c_goseY(72) - 1 + ((t * 6 + k * 0.7) % 3); R.pset(x, y, P.agua[5]); }
  // el hoyo (o.hoyo 0–1): crece con su montón de tierra al lado y una pala clavada
  const hoyo = c_lim(o.hoyo ?? 0);
  if (hoyo > 0) { const [hx, hy] = c_HOYO, rx = 4 + hoyo * 12, ry = 1.5 + hoyo * 4, TI = c_CLARO.tierra;
    // el montón: a la izquierda del hoyo
    const mx = hx - rx - 10, mr = 3 + hoyo * 9;
    R.poligono([[mx - mr * 1.3, hy + 3], [mx - mr * 0.5, hy + 3 - mr * 0.7], [mx + mr * 0.3, hy + 3 - mr * 0.85], [mx + mr * 1.2, hy + 3]], (x, y) => c_tono(TI, c_lim(0.4 + (x - mx) / mr * -0.2 - (y - hy) * 0.03 + (h(x, y, 731) - 0.5) * 0.4), x, y));
    for (let k = 0; k < 6 * hoyo; k++) c_piedra(R, mx - mr + h(k, 1, 732) * mr * 2, hy + 1 - h(k, 2, 732) * mr * 0.5, 1.4, 1, P.piedra, 733 + k);
    R.disco(hx, hy, 0, TI[0]);
    for (let y = Math.floor(hy - ry); y <= hy + ry; y++) for (let x = Math.floor(hx - rx); x <= hx + rx; x++) { const d = ((x - hx) / rx) ** 2 + ((y - hy) / ry) ** 2; if (d > 1) continue;
      R.pset(x, y, d > 0.75 && y < hy ? TI[3] : c_tono(TI, c_lim(0.05 + (y - hy + ry) / (ry * 2) * 0.25 + (h(x, y, 734) - 0.5) * 0.15), x, y)); }
    R.linea(hx - rx, hy, hx + rx, hy, TI[4]);
    // una raíz cortada que cruza el hoyo
    R.linea(hx - rx * 0.6, hy - ry * 0.2, hx + rx * 0.4, hy + ry * 0.3, P.tronco[4]);
    if (hoyo > 0.5) { const px = mx + 2, py = hy - mr * 0.5; R.linea(px, py, px - 4, py - 16, hex('#7a5a34')); R.linea(px + 1, py, px - 3, py - 16, hex('#4a3220')); R.linea(px - 6, py - 16, px - 2, py - 17, hex('#7a5a34')); R.poligono([[px - 2, py], [px + 3, py], [px + 3, py + 4], [px - 2, py + 4]], P.piedra[4]); }
  }
  // los faroles: en el suelo (o.faroles, por omisión dos) y el que cuelga de la rama; luz cálida que tiembla
  const FAR = [[166, 76, true], ...(o.faroles === false ? [] : [[150, 152, false], [276, 156, false]])];
  for (const [fx, fy, cuelga] of FAR) { const tb = 0.85 + Math.sin(t * 7 + fx) * 0.08 + Math.sin(t * 13 + fx) * 0.05, r = (cuelga ? 26 : 30) * tb, cal = hex('#ffb860');
    for (let y = Math.floor(fy - r * 0.8); y <= fy + r * 0.5; y++) for (let x = Math.floor(fx - r); x <= fx + r; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue; const d = Math.hypot((x - fx) / r, (y - fy + 3) / (r * 0.75)); if (d < 1) R.pset(x, y, c_mezcla(R.pget(x, y), cal, (1 - d) ** 1.6 * 0.42)); }
    const sw = cuelga ? Math.round(Math.sin(t * 1.3) * 1) : 0, x = fx + sw, y = fy;
    R.rect(x - 2, y - 6, x + 2, y - 6, hex('#2a2420')); R.pset(x, y - 7, hex('#2a2420'));
    R.rect(x - 2, y - 5, x + 2, y - 1, hex('#ffe8a0')); R.rect(x - 1, y - 4, x + 1, y - 2, hex(Math.sin(t * 9 + fx) > 0 ? '#fff8d8' : '#ffd880'));
    R.linea(x - 2, y - 5, x - 2, y - 1, hex('#3a3026')); R.linea(x + 2, y - 5, x + 2, y - 1, hex('#3a3026')); R.rect(x - 2, y, x + 2, y, hex('#2a2420'));
    if (cuelga) R.linea(166, 74, x, y - 7, hex('#3a3026')); }
  // luciérnagas y polillas junto a los faroles
  for (let k = 0; k < 14; k++) { const x = 20 + h(k, 1, 740) * 280 + Math.sin(t * 0.5 + k) * 10, y = 100 + h(k, 2, 740) * 50 + Math.sin(t * 0.8 + k * 2) * 5, b = Math.sin(t * (1.6 + h(k, 3, 740)) + k * 2.1); if (b > 0.3) R.pset(x, y, b > 0.75 ? hex('#f4ff9a') : hex('#a8c050')); }
  for (let k = 0; k < 3; k++) { const a = t * (5 + k) + k * 2, x = 166 + Math.cos(a) * (5 + k * 2), y = 72 + Math.sin(a * 1.3) * 4; R.pset(x, y, hex('#e8dcc0')); }
  // o.estallido 0–1: lejos, al pie del roble, un resplandor, tierra y piedras que saltan y una columna de humo (nadie cerca)
  const es = c_lim(o.estallido ?? 0);
  if (es > 0) { const [ex, ey] = [c_HOYO[0] + 4, c_HOYO[1] - 2];
    const fl = es < 0.25 ? 1 - es / 0.25 : 0;
    if (fl > 0) { const r = 20 + fl * 40; for (let y = Math.max(0, Math.floor(ey - r)); y <= Math.min(179, ey + r * 0.5); y++) for (let x = Math.max(0, Math.floor(ex - r)); x <= Math.min(319, ex + r); x++) { const d = Math.hypot(x - ex, (y - ey) * 1.3) / r; if (d < 1) R.pset(x, y, c_mezcla(R.pget(x, y), hex('#ffe0a0'), (1 - d) * fl * 0.85)); }
      R.disco(ex, ey - 2, 4 + fl * 5, hex('#fff4d0')); }
    // el humo: bolas que suben, se ensanchan y se aclaran
    for (let k = 0; k < 9; k++) { const u = c_lim((es - 0.05 - k * 0.04) / 0.6); if (u <= 0) continue; const x = ex + (h(k, 1, 750) - 0.5) * 14 + u * 10, y = ey - 4 - u * 46 - k * 2, r = 3 + u * 8;
      R.disco(x, y, r, c_mezcla(hex('#4a4a52'), hex('#8a8a94'), u)); R.disco(x - r * 0.3, y - r * 0.3, r * 0.6, c_mezcla(hex('#5a5a64'), hex('#a0a0aa'), u)); }
    // la tierra y las piedras: parábolas que caen
    for (let k = 0; k < 26; k++) { const u = c_lim((es - 0.02) / 0.7); if (u <= 0 || u >= 1) continue; const vx = (h(k, 1, 751) - 0.5) * 90, vy = 50 + h(k, 2, 751) * 60, x = ex + vx * u, y = ey - vy * u + 130 * u * u;
      if (y > ey + 8) continue; const c = k % 3 === 0 ? P.piedra[4] : c_CLARO.tierra[2 + (k % 3)]; R.pset(x, y, c); if (k % 4 === 0) { R.pset(x + 1, y, c); R.pset(x, y + 1, c_CLARO.tierra[1]); } }
    // un pájaro que sale volando asustado de la copa
    { const u = c_lim((es - 0.05) / 0.6); if (u > 0 && u < 1) { const x = 210 - u * 160, y = 40 - u * 20 + Math.sin(u * 20) * 2, a = Math.sin(t * 16) > 0, c = hex('#06080e'); R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : -1), c); R.pset(x + 1, y - (a ? 1 : -1), c); R.pset(x - 2, y - (a ? 2 : -1), c); R.pset(x + 2, y - (a ? 2 : -1), c); } }
  }
  return { suelo: 150, libre: [30, 176], roble: [c_ROBLE.x0, c_ROBLE.x1, c_ROBLE.base], hoyo: c_HOYO, faroles: FAR.map(([x, y]) => [x, y]), luna: LUNA, arroyo: 118 };
}

// por delante en el claro: matas de hierba alta en las esquinas de abajo que se mecen
function c_claroDelante(R, t, o) {
  const PA = c_CLARO.pasto;
  for (let k = 0; k < 40; k++) { const lado = k < 20, x0 = lado ? 2 + (k % 20) * 2.2 : 318 - (k % 20) * 2.2, alto = 8 + h(k, 1, 760) * 14 * (1 - (k % 20) / 26), sw = Math.sin(t * 1.5 + k * 0.6) * 2;
    for (let i = 0; i < alto; i++) { const u = i / alto; R.pset(x0 + sw * u * u + (lado ? 1 : -1) * u * 3, 180 - i, PA[Math.min(6, 1 + Math.round(u * 4))]); } }
  return {};
}

const c_TAB = {
  tronco: c_hx(['#2a1a10', '#3e2818', '#543822', '#6c4a2e', '#86603c', '#a07a4e']),
  barro: c_hx(['#8a7a62', '#a8987a', '#c0b090', '#d6c8a8']),
  piedra: c_hx(['#4a4440', '#625a52', '#7a7066', '#948a7c', '#b0a696']),
  teja: c_hx(['#2e2620', '#3e342a', '#544636', '#6a5a46', '#82705a']),
  camino: c_hx(['#6a5236', '#7e6242', '#927450', '#a8885e', '#bc9c70']),
  hierba: c_hx(['#3a5222', '#4a6428', '#5a7630', '#6e8a3a', '#86a04a']),
  vent: c_hx(['#1a1a22', '#2a3040', '#4a5a6a', '#9ab0b8']),
};

// la casa: troncos abajo (x 176–300), piso de arriba de tablas, tejado a dos aguas y la chimenea de piedra a la derecha
const c_CASA = { x0: 176, x1: 300, suelo: 146, piso: 108, alero: 76, cumbre: 56, porche: [168, 306, 104] };

function c_taberna(R, t, o) {
  const P = c_PAL.dia;
  const F = c_capa(R, 'taberna|fondo', () => {
    const r = c_fondoMontes(R, P, false, null, 124);
    // por delante de los montes: un prado con una cerca de troncos en zigzag y unos árboles sueltos
    for (let y = 108; y < 132; y++) for (let x = 0; x < 320; x++) { if (y < c_lejosY(x) + 4) continue; R.pset(x, y, c_tono(c_TAB.hierba, c_lim(0.45 + (y - 108) * 0.015 + Math.sin(x * 0.05 + y * 0.4) * 0.08 + (h(x >> 1, y, 800) - 0.5) * 0.25), x, y)); r.lejos[y * 320 + x] = 0; }
    for (let x = 0; x < 170; x++) { const y = 120 + Math.abs(((x % 14) - 7)) * 0.4; R.pset(x, y, c_TAB.tronco[4]); R.pset(x, y + 1, c_TAB.tronco[2]); if (x % 14 === 0) R.linea(x, y - 3, x, y + 3, c_TAB.tronco[3]); }
    for (const [x, b, w] of [[30, 118, 12], [140, 116, 10]]) { c_tronco(R, x - 1, x + 1, b - 8, b, P.tronco, 801 + x, -1); c_copa(R, x, b - 14, w, w * 0.7, P.copa, 802 + x, -0.6, -0.8); }
    return r;
  });
  const N = c_capa(R, 'taberna|cerca', () => {
    const C2 = c_CASA, T = c_TAB;
    // el camino de tierra con roderas, huellas y piedras, y la hierba de los bordes
    for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const prof = (y - 128) / 52, rod = Math.abs(((y - 128) % 13) - 6) < 1 && x < 300, borde = y < 132 + Math.sin(x * 0.1) * 2;
      R.pset(x, y, borde ? c_tono(T.hierba, c_lim(0.5 + (h(x, y, 803) - 0.5) * 0.5), x, y) : c_tono(T.camino, c_lim(0.45 + prof * 0.2 + (rod ? -0.18 : 0) + Math.sin(x * 0.02 + y * 0.3) * 0.05 + (h(x >> 1, y, 804) - 0.5) * 0.22), x, y)); }
    for (let k = 0; k < 160; k++) { const x = h(k, 1, 805) * 320, y = 134 + h(k, 2, 805) * 46, r = h(k, 3, 805); if (r < 0.5) { R.pset(x, y, T.camino[4]); R.pset(x + 1, y + 1, T.camino[0]); } else if (r < 0.65) { R.pset(x, y, T.camino[0]); R.pset(x + 2, y, T.camino[0]); R.pset(x + 1, y + 1, T.camino[1]); } else if (r < 0.75) { for (let i = 0; i < 3; i++) R.pset(x + i - 1, y - (i === 1 ? 2 : 1), T.hierba[2 + i % 2]); } }
    // la casa: muro de troncos con su barro entre ellos y las esquinas cruzadas
    for (let y = C2.piso; y <= C2.suelo; y++) { const fila = Math.floor((y - C2.piso) / 4), f = (y - C2.piso) % 4;
      for (let x = C2.x0; x <= C2.x1; x++) { const v = f === 3 ? -1 : 0.3 + (f === 0 ? 0.25 : f === 2 ? -0.12 : 0.08) + (h(x >> 2, fila, 806) - 0.5) * 0.2 + (h(x, fila, 807) < 0.05 ? -0.25 : 0);
        R.pset(x, y, v < 0 ? c_tono(T.barro, c_lim(0.4 + (h(x, y, 808) - 0.5) * 0.5), x, y) : c_tono(T.tronco, c_lim(v), x, y)); }
      for (const xe of [C2.x0 - 3, C2.x1 + 1]) for (let i = 0; i < 3; i++) R.pset(xe + i, y, f === 3 ? T.tronco[0] : T.tronco[f === 0 ? 4 : 2]); }
    // el piso de arriba: tablas verticales con el alero en sombra, dos ventanas con cristales y contraventanas
    for (let y = C2.alero; y < C2.piso; y++) for (let x = C2.x0 - 2; x <= C2.x1 + 2; x++) { const tb = (x - C2.x0) % 5; R.pset(x, y, c_tono(T.tronco, c_lim((tb === 0 ? 0.15 : tb === 1 ? 0.6 : 0.45) - (y - C2.alero < 4 ? 0.2 : 0) + (h(x, y >> 2, 809) - 0.5) * 0.15), x, y)); }
    // el tejado a dos aguas de tablillas, con su sombra
    R.poligono([[C2.x0 - 10, C2.alero + 1], [(C2.x0 + C2.x1) / 2, C2.cumbre], [C2.x1 + 10, C2.alero + 1]], (x, y) => { const f = (y - C2.cumbre) % 3; return c_tono(T.teja, c_lim(0.45 + (x < (C2.x0 + C2.x1) / 2 ? 0.12 : -0.08) + (f === 0 ? -0.25 : 0) + (h(x >> 1, y, 810) - 0.5) * 0.25 + (((x + (Math.floor((y - C2.cumbre) / 3) % 2) * 2) % 4) === 0 && f !== 0 ? -0.15 : 0)), x, y); });
    R.linea(C2.x0 - 10, C2.alero + 1, (C2.x0 + C2.x1) / 2, C2.cumbre, T.teja[4]); R.linea((C2.x0 + C2.x1) / 2, C2.cumbre, C2.x1 + 10, C2.alero + 1, T.teja[1]);
    R.rect(C2.x0 - 10, C2.alero + 2, C2.x1 + 10, C2.alero + 3, T.teja[0]);
    // la buhardilla con su ventanita en el tejado
    R.poligono([[228, 70], [238, 62], [248, 70]], T.teja[3]); R.rect(232, 66, 244, 74, T.tronco[3]); R.rect(235, 67, 241, 72, T.vent[1]); R.pset(236, 68, T.vent[3]); R.rect(238, 67, 238, 72, T.tronco[1]);
    for (const vx of [190, 268]) { R.rect(vx - 1, 83, vx + 13, 100, T.tronco[1]); R.rect(vx, 84, vx + 12, 99, T.vent[1]); R.rect(vx + 6, 84, vx + 6, 99, T.tronco[2]); R.rect(vx, 91, vx + 12, 91, T.tronco[2]);
      R.linea(vx + 1, 85, vx + 4, 85, T.vent[3]); R.pset(vx + 1, 86, T.vent[2]); R.rect(vx - 5, 84, vx - 2, 99, hex('#3a5a4a')); R.rect(vx + 15, 84, vx + 18, 99, hex('#3a5a4a')); R.linea(vx - 4, 86, vx - 4, 97, hex('#2a4234')); R.linea(vx + 16, 86, vx + 16, 97, hex('#2a4234')); R.rect(vx - 1, 101, vx + 13, 102, T.tronco[4]);
      R.pset(vx + 3, 98, hex('#c84a3a')); R.pset(vx + 4, 97, hex('#4a7a3a')); }
    // la chimenea de piedra en el costado derecho (asoma por encima del tejado)
    for (let y = 50; y <= C2.suelo; y++) for (let x = 296; x <= 308; x++) { if (y < 64 && (x < 298 || x > 306)) continue; const fila = Math.floor(y / 3), off = (fila % 2) * 3, junta = (y % 3 === 2) || ((x + off) % 6 === 0);
      R.pset(x, y, junta ? T.piedra[0] : c_tono(T.piedra, c_lim(0.45 + (x - 302) * -0.04 + (h((x + off) / 6 | 0, fila, 811) - 0.5) * 0.5), x, y)); }
    R.rect(297, 49, 307, 50, T.piedra[4]);
    // el porche: el tejadillo, los postes, la barandilla, el suelo de tablas y la puerta con su luz dentro
    const [p0, p1, pt] = C2.porche;
    for (let y = pt - 4; y <= pt; y++) for (let x = p0; x <= p1; x++) R.pset(x, y, c_tono(T.teja, c_lim(0.5 - (y - pt + 4) * 0.08 + (x % 3 === 0 ? -0.15 : 0)), x, y));
    R.rect(p0, pt + 1, p1, pt + 3, T.tronco[0]);
    for (let y = C2.suelo - 4; y <= C2.suelo; y++) for (let x = p0; x <= p1; x++) R.pset(x, y, c_tono(T.tronco, c_lim(0.55 - (y - C2.suelo + 4) * 0.06 + (x % 9 === 0 ? -0.3 : 0)), x, y));
    R.rect(p0, C2.suelo + 1, p1, C2.suelo + 2, T.tronco[0]);
    // la puerta abierta: dentro, la penumbra con la luz del fuego
    R.rect(228, 112, 246, C2.suelo - 5, T.tronco[1]); R.rect(230, 114, 244, C2.suelo - 5, hex('#2a1810'));
    for (let y = 114; y < C2.suelo - 5; y++) for (let x = 230; x <= 244; x++) if (c_um(x, y) < (y - 114) / 40) R.pset(x, y, hex('#5a3418'));
    R.rect(244, 114, 247, C2.suelo - 5, T.tronco[3]); R.rect(230, 128, 232, 132, hex('#8a6a3a'));
    // un cartel colgado sin letras: una jarra y unas herraduras pintadas
    R.rect(200, 110, 222, 120, T.tronco[4]); R.rect(201, 111, 221, 119, T.tronco[2]); R.rect(205, 113, 209, 118, hex('#d8c8a0')); R.rect(209, 114, 210, 116, hex('#d8c8a0')); R.pset(206, 112, hex('#f4f0e0'));
    R.anillo(215, 115, 2.5, hex('#a8a8b0')); R.pset(213, 117, T.tronco[2]); R.pset(217, 117, T.tronco[2]);
    for (const px of [p0 + 2, 210, 264, p1 - 2]) { R.rect(px - 1, pt + 1, px + 1, C2.suelo - 5, T.tronco[3]); R.rect(px + 1, pt + 1, px + 1, C2.suelo - 5, T.tronco[1]); }
    R.rect(p0, 132, 210, 133, T.tronco[4]); R.rect(264, 132, p1, 133, T.tronco[4]);
    for (let x = p0; x <= 210; x += 5) R.rect(x, 134, x, C2.suelo - 5, T.tronco[2]); for (let x = 266; x <= p1; x += 5) R.rect(x, 134, x, C2.suelo - 5, T.tronco[2]);
    // en el porche: un barril, sacos y una mecedora
    R.disco(282, 136, 5, (x, y, d) => c_tono(T.tronco, c_lim(0.6 - d * 0.4 + ((y % 4) === 0 ? -0.2 : 0)), x, y)); R.rect(277, 136, 287, C2.suelo - 5, T.tronco[3]); R.rect(277, 134, 287, 134, T.piedra[1]); R.rect(277, 139, 287, 139, T.piedra[1]);
    R.disco(194, 137, 4, hex('#c8b488')); R.disco(198, 138, 3.5, hex('#b09c72')); R.pset(193, 134, hex('#e0d0a8'));
    // el poste de atar los caballos con su travesaño (x 40–126, y 134)
    R.rect(40, 130, 42, 146, T.tronco[2]); R.rect(124, 130, 126, 146, T.tronco[2]); R.rect(38, 130, 128, 132, T.tronco[4]); R.rect(38, 133, 128, 133, T.tronco[1]);
    // la diligencia aparcada a la izquierda (sin letras)
    const D0 = 2;
    R.rect(D0, 100, D0 + 32, 126, hex('#6a2a22')); R.rect(D0, 100, D0 + 32, 102, hex('#3a1a14')); R.rect(D0 + 1, 96, D0 + 31, 99, hex('#2a1e18')); R.rect(D0 + 6, 104, D0 + 16, 114, T.vent[1]); R.pset(D0 + 7, 105, T.vent[3]); R.rect(D0 + 20, 104, D0 + 29, 120, hex('#5a221c')); R.rect(D0 + 22, 106, D0 + 27, 112, hex('#7a3a2a'));
    R.rect(D0 + 3, 116, D0 + 17, 117, hex('#c8a040')); R.rect(D0 + 6, 90, D0 + 26, 95, hex('#8a7a5a')); R.rect(D0 + 8, 88, D0 + 22, 89, hex('#a89870'));
    for (const [wx, r] of [[D0 + 6, 9], [D0 + 30, 7]]) { R.anillo(wx, 136 - r, r, hex('#3a2a1a')); R.anillo(wx, 136 - r, r - 1, hex('#5a4026')); for (let a = 0; a < 8; a++) R.linea(wx, 136 - r, wx + Math.cos(a * 0.785) * (r - 1), 136 - r + Math.sin(a * 0.785) * (r - 1), hex('#5a4026')); R.disco(wx, 136 - r, 1.5, hex('#2a1a10')); }
    R.linea(D0 + 33, 120, D0 + 50, 128, hex('#4a3220'));
  });
  R.copiar(F.b);
  const B = R.buf, m = F.cielo, NB = P.nube;
  for (let k = 5; k >= 0; k--) { const capa = k % 3, w = [52, 34, 20][capa] + h(k, 4, 820) * 12, y = [30, 46, 62][capa] + h(k, 5, 820) * 6, vel = [2.4, 1.4, 0.7][capa], x = ((h(k, 6, 820) * 460 + t * vel) % 480) - 80;
    c_nube(B, m, x, y, w, 60 + k, capa === 2 ? [NB[0], NB[1], NB[2]] : [NB[1], NB[2], NB[3]], capa === 0 ? 0.85 : 0.7); }
  for (let k = 0; k < 3; k++) { const x = ((t * 7 + k * 9) % 360) - 20, y = 40 + Math.sin(t * 0.6 + k) * 2 + k * 3, a = Math.sin(t * 8 + k) > 0, c = hex('#2a3040'); if (x > 270 && y < 48) continue; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : -1), c); R.pset(x + 2, y - (a ? 2 : -1), c); }
  c_pegar(R, N.b);
  // el humo de la chimenea: bolas que suben, crecen y se van a la izquierda (fuera de la esquina de Atom)
  for (let k = 0; k < 8; k++) { const u = ((t * 0.22 + k / 8) % 1), x = 302 - u * u * 70 - u * 10, y = 48 - u * 30, r = 1.5 + u * 5; if (x > 276 && y < 46 && u > 0.2) continue;
    const a = (1 - u) * 0.9; R.disco(x, y, r, (xx, yy, d) => { const c = R.pget(xx, yy); return c_um(xx, yy) < a * (1.2 - d) ? c_mezcla(c, d < 0.5 && yy < y ? hex('#e8ecf0') : hex('#b8bcc4'), 0.7) : c; }); }
  // los caballos atados al poste (miran a la casa; mueven la cola y la cabeza)
  for (const [x, col, k] of [[50, hex('#7a4a28'), 0], [86, hex('#3a2a22'), 1], [106, hex('#b08a5a'), 2]]) {
    R.caballo(x, 146, t, { dir: 1, color: col, sombra: c_mezcla(col, hex('#000000'), 0.35) });
    const cola = Math.sin(t * 2 + k * 2) > 0.7 ? 1 : 0; R.pset(x - 1, 133 + cola, hex('#1a120c')); R.pset(x - 1, 134 + cola, hex('#1a120c')); R.pset(x - 2, 135, hex('#1a120c')); }
  // las gallinas que picotean en el camino
  for (let k = 0; k < 3; k++) { const x = 150 + k * 9 + Math.sin(t * 0.4 + k) * 6, y = 160 + k * 3, pic = Math.sin(t * 5 + k * 2) > 0.5, c = k === 1 ? hex('#a0582a') : hex('#f0ece0');
    R.rect(x, y - 3, x + 3, y - 1, c); R.pset(x + 4, y - (pic ? 1 : 4), c); R.pset(x + 4, y - (pic ? 2 : 5), hex('#d83a2a')); R.pset(x + 5, y - (pic ? 0 : 4), hex('#e8a030')); R.pset(x - 1, y - 3, c); R.pset(x - 1, y - 4, c); R.pset(x + 1, y, hex('#e8a030')); R.pset(x + 2, y, hex('#e8a030')); }
  // el perro tumbado en el porche que mueve la cola
  { const x = 252, y = c_CASA.suelo - 5, c = hex('#8a6a4a'); R.rect(x, y - 3, x + 8, y - 1, c); R.rect(x + 8, y - 4, x + 11, y - 1, c); R.pset(x + 11, y - 5, hex('#5a4030')); R.pset(x + 12, y - 2, hex('#1a1210')); R.pset(x + 10, y - 3, hex('#1a1210')); R.pset(x - 1, y - 2 - (Math.sin(t * 8) > 0 ? 1 : 0), c); R.pset(x - 2, y - 3 - (Math.sin(t * 8) > 0 ? 1 : 0), c); R.rect(x + 1, y, x + 9, y, hex('#3a2a1a')); }
  // el tabernero, pequeño, que barre la puerta (de fondo)
  { const x = 236 + Math.sin(t * 0.8) * 3, y = c_CASA.suelo - 5, esc = Math.sin(t * 5); R.rect(x, y - 9, x + 3, y - 3, hex('#f0ece0')); R.rect(x, y - 3, x + 3, y - 1, hex('#3a3040')); R.rect(x, y - 12, x + 3, y - 10, hex('#e0b090')); R.rect(x, y - 13, x + 3, y - 13, hex('#6a5a4a')); R.linea(x + 3, y - 6, x + 7 + esc * 2, y, hex('#a08050')); R.rect(x + 6 + esc * 2, y - 1, x + 9 + esc * 2, y, hex('#c8a860')); }
  return { suelo: 150, libre: [30, 220], casa: [c_CASA.x0, c_CASA.x1, c_CASA.suelo], puerta: [228, 246, c_CASA.suelo - 5], porche: c_CASA.porche, poste: [40, 126, 131], caballos: [50, 86, 106], diligencia: [2, 36] };
}

// por delante en la taberna: el abrevadero de troncos con su agua que brilla, y un cubo
function c_abrevadero(R, t, o) {
  const T = c_TAB, x0 = 238, x1 = 292, y0 = 162, y1 = 174;
  R.rect(x0 + 2, y1 + 1, x1 + 3, y1 + 2, hex('#4a3a26'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = (y - y0) % 4; R.pset(x, y, c_tono(T.tronco, c_lim(0.5 + (f === 0 ? 0.25 : f === 3 ? -0.3 : 0) + (h(x >> 2, y >> 2, 830) - 0.5) * 0.2), x, y)); }
  for (let x = x0 + 2; x <= x1 - 2; x++) { const w = Math.sin(x * 0.6 + t * 3) > 0.6; R.pset(x, y0 + 1, w ? hex('#c8e0e8') : hex('#4a7a8a')); R.pset(x, y0 + 2, hex('#2e5a6a')); }
  R.rect(x0 - 2, y0 - 2, x0 + 1, y1 + 2, T.tronco[1]); R.rect(x1 - 1, y0 - 2, x1 + 2, y1 + 2, T.tronco[1]);
  R.rect(298, 164, 308, 176, hex('#6a6a70')); R.rect(299, 164, 300, 176, hex('#8a8a92')); R.rect(298, 167, 308, 167, hex('#3a3a40')); R.rect(298, 172, 308, 172, hex('#3a3a40')); R.anillo(303, 162, 4, hex('#3a3a40'));
  return {};
}

const c_IGL = {
  blanco: c_hx(['#8a8e96', '#aeb2b8', '#ccd0d2', '#e4e6e4', '#f6f6f0']),
  gris: c_hx(['#3a3e48', '#4c525c', '#60666e', '#767c82']),
  seto: c_hx(['#14281a', '#1c3420', '#264426', '#32542c', '#426834', '#56803e']),
  campo: c_hx(['#5a7a34', '#6a8a3a', '#7e9a44', '#94aa52', '#b0b864', '#c8c070']),
  amarillo: c_hx(['#6a4a10', '#a87a14', '#d8a820', '#f0c838', '#fff07a']),
  camino: c_hx(['#6a5a44', '#7e6c52', '#94805e', '#aa966e', '#c0ac80']),
};

// la excavadora amarilla de los ochenta: orugas, cabina, brazo de dos tramos y cazo (bx: izquierda de las orugas,
// by: suelo; s: escala; a 0–1: el ciclo del brazo, parada si quieto; dir 1: el brazo hacia la derecha)
function c_excavadora(R, bx, by, s, a, quieto, dir = 1) {
  const Y = c_IGL.amarillo, K = hex('#1e1e22'), KL = hex('#46464e'), X = (i) => bx + (dir > 0 ? i : 40 - i) * s, YY = (j) => by - j * s;
  // las orugas: la cadena con sus tacos y las ruedas
  R.poligono([[X(0), YY(6)], [X(30), YY(6)], [X(32), YY(3)], [X(30), YY(0)], [X(0), YY(0)], [X(-2), YY(3)]], K);
  for (let i = 0; i <= 30; i += 3) R.rect(Math.min(X(i), X(i + 1)), YY(1), Math.max(X(i), X(i + 1)), YY(0), KL);
  for (const i of [3, 10, 17, 24, 29]) R.disco(X(i), YY(3), 1.8 * s, KL);
  // la plataforma, el contrapeso y la cabina con su cristal
  R.poligono([[X(-2), YY(13)], [X(28), YY(13)], [X(28), YY(7)], [X(-2), YY(7)]], (x, y) => c_tono(Y, c_lim(0.62 - (y - YY(13)) / (6 * s) * 0.35), x, y));
  R.poligono([[X(-4), YY(12)], [X(6), YY(12)], [X(6), YY(7)], [X(-4), YY(7)]], Y[1]);
  R.poligono([[X(8), YY(26)], [X(22), YY(26)], [X(24), YY(13)], [X(8), YY(13)]], (x, y) => c_tono(Y, c_lim(0.7 - (x - X(8)) * 0.01 * dir), x, y));
  R.poligono([[X(10), YY(24)], [X(20), YY(24)], [X(21), YY(17)], [X(10), YY(17)]], hex('#2a3a4a'));
  R.linea(X(11), YY(23), X(14), YY(23), hex('#9ab8c8')); R.linea(X(11), YY(22), X(12), YY(22), hex('#6a8aa0'));
  R.rect(Math.min(X(8), X(22)), YY(27), Math.max(X(8), X(22)), YY(26), Y[0]);
  R.rect(Math.min(X(2), X(3)), YY(18), Math.max(X(2), X(3)), YY(13), K);   // el tubo de escape
  // el brazo: pluma que sube y balancín que baja, con el cazo que muerde
  const fase = quieto ? -1 : Math.sin(a * Math.PI * 2), ang1 = -0.75 + fase * 0.25, ang2 = 1.25 + fase * 0.35;
  const p0 = [X(24), YY(14)], L1 = 20 * s, L2 = 15 * s;
  const p1 = quieto ? [X(38), YY(16)] : [p0[0] + Math.cos(ang1) * L1 * dir, p0[1] + Math.sin(ang1) * L1];
  const p2 = quieto ? [X(44), by] : [p1[0] + Math.cos(ang2) * L2 * dir, p1[1] + Math.sin(ang2) * L2];
  const viga = (a0, a1, g) => { for (let j = -g; j <= g; j++) R.linea(a0[0], a0[1] + j, a1[0], a1[1] + j, j === -g ? Y[4] : j === g ? Y[0] : Y[2]); };
  viga(p0, p1, Math.max(1, Math.round(1.5 * s))); viga(p1, p2, Math.max(1, Math.round(1.2 * s)));
  R.linea(p0[0], p0[1] + 2 * s, (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 + 2 * s, hex('#b8b8c0'));   // el pistón
  R.disco(p1[0], p1[1], 1.2 * s, K);
  R.poligono([[p2[0] - 3 * s * dir, p2[1] - 4 * s], [p2[0] + 3 * s * dir, p2[1] - 3 * s], [p2[0] + 2 * s * dir, p2[1]], [p2[0] - 2 * s * dir, p2[1] + 0.5]], K);
  R.linea(p2[0] - 2 * s * dir, p2[1] + 0.5, p2[0] + 2 * s * dir, p2[1], KL);
  return p2;
}

// el coche del sheriff de los ochenta: berlina alargada, blanca y marrón, con la estrella en la puerta y la luz que gira
function c_cocheSheriff(R, x, by, t, dir = 1) {
  const W = c_IGL.blanco, M = hex('#6a4a2a'), K = hex('#18181c'), X = (i) => x + (dir > 0 ? i : 52 - i);
  R.rect(x + 2, by - 1, x + 50, by, hex('#4a3e2c'));
  R.poligono([[X(0), by - 4], [X(0), by - 11], [X(10), by - 12], [X(16), by - 19], [X(36), by - 19], [X(42), by - 12], [X(52), by - 11], [X(52), by - 4]], (xx, yy) => c_tono(W, c_lim(0.85 - (yy - by + 19) * 0.03), xx, yy));
  R.poligono([[X(17), by - 18], [X(26), by - 18], [X(26), by - 12], [X(13), by - 12]], hex('#3a4a5a')); R.poligono([[X(28), by - 18], [X(35), by - 18], [X(40), by - 12], [X(28), by - 12]], hex('#3a4a5a'));
  R.linea(X(18), by - 17, X(21), by - 17, hex('#a8c0d0'));
  R.rect(Math.min(X(0), X(52)), by - 9, Math.max(X(0), X(52)), by - 7, M);
  // la estrella dibujada en la puerta (sin letras ni escudo)
  const sx = X(27), sy = by - 9; R.pset(sx, sy - 3, hex('#e8c040')); R.rect(sx - 2, sy - 2, sx + 2, sy - 2, hex('#e8c040')); R.rect(sx - 1, sy - 1, sx + 1, sy, hex('#e8c040')); R.pset(sx - 2, sy + 1, hex('#e8c040')); R.pset(sx + 2, sy + 1, hex('#e8c040')); R.pset(sx, sy - 1, hex('#fff07a'));
  R.rect(Math.min(X(0), X(1)), by - 10, Math.max(X(0), X(1)), by - 9, hex('#f0e8a0')); R.rect(Math.min(X(51), X(52)), by - 10, Math.max(X(51), X(52)), by - 9, hex('#c83a2a'));
  for (const i of [11, 41]) { R.disco(X(i), by - 3, 3.5, K); R.disco(X(i), by - 3, 1.6, hex('#9a9aa2')); }
  // la barra de luces del techo: gira, roja y azul, con su destello
  const g = Math.floor(t * 6) % 2, lr = g ? hex('#ff3a2a') : hex('#6a1a14'), la = g ? hex('#2a3a6a') : hex('#3a7aff');
  R.rect(Math.min(X(20), X(26)), by - 21, Math.max(X(20), X(26)), by - 20, lr); R.rect(Math.min(X(27), X(33)), by - 21, Math.max(X(27), X(33)), by - 20, la);
  const fx = g ? X(23) : X(30), fc = g ? hex('#ff8a7a') : hex('#8ab0ff');
  for (let i = 1; i < 5; i++) { R.pset(fx - i, by - 21, fc); R.pset(fx + i, by - 21, fc); }
  R.pset(fx, by - 23, fc); R.pset(fx, by - 22, fc);
}

// las lomas del campo: prados en franjas, setos, una granja lejana y los picos de Otter, muy lejos
function c_fondoCampo(R, P, hor) {
  const cielo = new Uint8Array(57600), lejos = new Uint8Array(57600), I = c_IGL;
  const pk = (x) => 74 + Math.min(Math.pow(Math.abs(x - 70), 1.1) * 0.45, Math.abs(x - 118) < 50 ? 4 + ((x - 118) / 30) ** 2 * 10 : 99);
  const loma1 = (x) => 88 + Math.sin(x * 0.018 + 1) * 5 + Math.sin(x * 0.05) * 2, loma2 = (x) => 100 + Math.sin(x * 0.012 + 3) * 6;
  for (let x = 0; x < 320; x++) { const yp = Math.min(pk(x), 92), y1 = loma1(x), y2 = loma2(x);
    for (let y = 0; y < hor; y++) { let c;
      if (y < yp && y < y1) { c = c_tono(P.cielo, Math.pow(y / (hor - 6), 1.2), x, y); cielo[y * 320 + x] = 1; }
      else if (y < y1) { c = c_tono(P.picos, c_lim(0.55 + (x < 70 ? 0.1 : -0.05) + (y - yp < 2 ? 0.15 : 0) + (h(x >> 1, y >> 1, 840) - 0.5) * 0.12), x, y); lejos[y * 320 + x] = 1; }
      else if (y < y2) { const fr = Math.floor((x + y * 3) / 37); c = c_tono(I.campo, c_lim(0.35 + (h(fr, 0, 841) - 0.5) * 0.5 + (y - y1 < 1 ? 0.15 : 0) + ((y * 2 + x) % 7 === 0 ? -0.1 : 0)), x, y); if (h(x >> 2, y >> 1, 842) > 0.86) c = I.seto[2 + (y & 1)]; lejos[y * 320 + x] = 1; }
      else { const fr = Math.floor((x - y * 2) / 45); c = c_tono(I.campo, c_lim(0.45 + (h(fr, 1, 843) - 0.5) * 0.55 + ((x + y * 4) % 9 === 0 ? -0.12 : 0) + (h(x, y, 844) - 0.5) * 0.12), x, y); lejos[y * 320 + x] = 1; }
      R.pset(x, y, c); } }
  // los setos entre prados y unos árboles redondos sueltos; una granja roja con su silo
  for (const [x, y, w] of [[20, 101, 8], [64, 104, 6], [120, 99, 7], [300, 104, 8], [168, 103, 5]]) c_copa(R, x, y, w, w * 0.6, P.copa, 845 + x, -0.6, -0.8);
  R.rect(136, 94, 150, 101, hex('#9a3a2a')); R.poligono([[134, 94], [143, 88], [152, 94]], hex('#5a4a44')); R.rect(141, 97, 144, 101, hex('#5a1a14')); R.rect(153, 86, 157, 101, hex('#b8b4a8')); R.disco(155, 86, 2, hex('#8a8a90'));
  return { cielo, lejos };
}

function c_iglesia(R, t, o, valla) {
  const P = c_PAL.dia, I = c_IGL;
  if (valla) return c_valla(R, t, o);
  const F = c_capa(R, 'iglesia|fondo', () => c_fondoCampo(R, P, 116));
  const N = c_capa(R, 'iglesia|cerca', () => {
    // la iglesia: x 198–262, base y 124; tejado y campanario con su aguja (punta x 230, y 50)
    for (let y = 98; y <= 124; y++) for (let x = 198; x <= 262; x++) R.pset(x, y, c_tono(I.blanco, c_lim(0.82 - (y % 3 === 0 ? 0.18 : 0) - (x > 248 ? 0.25 : 0) + (h(x >> 2, y, 850) - 0.5) * 0.08), x, y));
    R.poligono([[194, 99], [230, 80], [266, 99]], (x, y) => c_tono(I.gris, c_lim(0.5 + (x < 230 ? 0.15 : -0.1) + ((y % 2) ? -0.1 : 0)), x, y));
    R.linea(194, 99, 230, 80, I.gris[3]);
    for (let y = 62; y <= 92; y++) for (let x = 224; x <= 236; x++) R.pset(x, y, c_tono(I.blanco, c_lim(0.85 - (x > 232 ? 0.3 : 0) - (y % 3 === 0 ? 0.12 : 0)), x, y));
    R.rect(226, 66, 234, 74, I.gris[0]); for (let y = 67; y <= 73; y += 2) R.rect(227, y, 233, y, I.gris[2]);   // las lamas del campanario
    R.rect(223, 61, 237, 62, I.blanco[1]);
    R.poligono([[223, 61], [230, 46], [237, 61]], (x, y) => c_tono(I.gris, c_lim(x < 230 ? 0.65 : 0.25), x, y)); R.rect(230, 42, 230, 46, I.gris[0]); R.rect(228, 44, 232, 44, I.gris[0]);
    // la puerta roja con su escalón y dos ventanas altas en arco a cada lado (con su reflejo)
    R.rect(225, 108, 235, 124, I.blanco[0]); R.rect(226, 109, 234, 124, hex('#8a2a22')); R.rect(230, 109, 230, 124, hex('#5a1a14')); R.pset(228, 116, hex('#e8c040')); R.rect(222, 124, 238, 125, I.blanco[1]);
    R.disco(230, 92, 3, hex('#3a4a5a')); R.disco(230, 92, 1, hex('#9ab0c8'));
    for (const vx of [206, 214, 244, 252]) { R.rect(vx, 104, vx + 3, 116, hex('#2a3644')); R.rect(vx + 1, 103, vx + 2, 103, hex('#2a3644')); R.pset(vx + 1, 105, hex('#a8c0d4')); R.rect(vx, 110, vx + 3, 110, I.blanco[4]); }
    // los árboles grandes a los lados de la iglesia (un roble a la izquierda, dos arces a la derecha)
    c_tronco(R, 180, 184, 94, 126, P.tronco, 851, -1); c_copa(R, 182, 82, 20, 16, P.copa, 852, -0.6, -0.8);
    c_tronco(R, 279, 283, 96, 126, P.tronco, 853, -1); c_copa(R, 282, 82, 18, 16, P.copa, 854, -0.6, -0.8, (x, y) => y >= 47);
    c_copa(R, 306, 90, 16, 14, c_hx(['#3a2410', '#5a3414', '#7a4a1a', '#9a6420', '#b88030', '#d0a040', '#e8c060']), 855, -0.6, -0.8, (x, y) => y >= 47);
    // el seto alto, que no deja ver nada de dentro del cementerio (x 104–320, y 110–132)
    for (let x = 104; x < 320; x++) { const top = 110 + Math.sin(x * 0.3) * 1.2 + h(x >> 2, 0, 856) * 2;
      for (let y = Math.floor(top); y <= 132; y++) { const cop = h(x >> 1, y >> 1, 857); R.pset(x, y, c_tono(I.seto, c_lim(0.55 - (y - top) * 0.02 + (y - top < 2 ? 0.25 : 0) + (cop > 0.6 ? 0.15 : cop < 0.25 ? -0.2 : 0) + (h(x, y, 858) - 0.5) * 0.2), x, y)); } }
    // la valla blanca de estacas delante del seto (y 122–136), con sus dos travesaños y la cancela abierta
    for (let x = 104; x < 320; x += 4) { if (x > 222 && x < 238) continue; R.rect(x, 124, x + 1, 136, I.blanco[4]); R.rect(x + 1, 124, x + 1, 136, I.blanco[2]); R.pset(x, 123, I.blanco[3]); R.rect(x + 2, 128, x + 2, 137, I.seto[0]); }
    R.rect(104, 127, 222, 127, I.blanco[3]); R.rect(104, 133, 222, 133, I.blanco[3]); R.rect(238, 127, 319, 127, I.blanco[3]); R.rect(238, 133, 319, 133, I.blanco[3]);
    R.rect(222, 120, 223, 137, I.blanco[4]); R.rect(237, 120, 238, 137, I.blanco[4]);
    // el camino de la iglesia (tierra) hasta la cancela, el camino de grava que cruza y la hierba
    for (let y = 116; y < 180; y++) for (let x = 0; x < 320; x++) {
      if (y < 137 && !(x < 104 && y >= 116)) continue;
      const enCam = y >= 140 && y <= 160 + (x - 160) * 0.02, prof = (y - 116) / 64;
      if (enCam) { const rod = Math.abs(((y - 140) % 10) - 5) < 1; R.pset(x, y, c_tono(I.camino, c_lim(0.5 + (rod ? -0.2 : 0) + (h(x, y, 859) - 0.5) * 0.35), x, y)); }
      else R.pset(x, y, c_tono(I.campo, c_lim(0.3 + prof * 0.4 + Math.sin(x * 0.08 + y * 0.4) * 0.06 + (h(x >> 1, y, 860) - 0.5) * 0.3), x, y));
    }
    for (let k = 0; k < 260; k++) { const x = h(k, 1, 861) * 320, y = 118 + h(k, 2, 861) * 62; if ((y < 137 && x > 104) || (y >= 140 && y <= 160)) continue; const a = (y - 116) / 64 * 4 + 1;
      for (let i = 0; i < a; i++) R.pset(x + (h(k, 3, 861) - 0.5) * i, y - i, I.campo[Math.min(5, 1 + Math.round(i / a * 3))]); if (k % 9 === 0) R.pset(x, y - a, k % 2 ? hex('#f0e8f0') : hex('#e8c838')); }
    for (let k = 0; k < 60; k++) { const x = h(k, 1, 862) * 320, y = 141 + h(k, 2, 862) * 19; R.pset(x, y, I.camino[4]); R.pset(x + 1, y + 1, I.camino[0]); }
    // el poste de teléfono con sus cables (los ochenta), a la izquierda
    R.rect(30, 84, 32, 140, hex('#5a4030')); R.rect(33, 84, 33, 140, hex('#3a2a1e')); R.rect(24, 88, 40, 89, hex('#5a4030')); R.pset(25, 87, hex('#c8d0d8')); R.pset(39, 87, hex('#c8d0d8'));
    // los cables, que se van por la izquierda hacia el poste siguiente (no cruzan el plano)
    for (const [x1, d] of [[25, 4], [39, 6]]) for (let x = 0; x <= x1; x++) { const u = x / x1; R.pset(x, 88 + Math.sin(u * Math.PI) * d + (1 - u) * 3, hex('#3a3a42')); }
    // el montón de tierra de la excavadora, junto a la valla
    R.poligono([[150, 140], [160, 130], [172, 128], [184, 140]], (x, y) => c_tono(I.camino, c_lim(0.3 + (x - 160) * -0.02 + (h(x, y, 863) - 0.5) * 0.5), x, y));
  });
  R.copiar(F.b);
  const B = R.buf, m = F.cielo, NB = P.nube;
  for (let k = 5; k >= 0; k--) { const capa = k % 3, w = [48, 32, 20][capa] + h(k, 4, 870) * 12, y = [28, 46, 64][capa] + h(k, 5, 870) * 6, vel = [2.6, 1.5, 0.7][capa], x = ((h(k, 6, 870) * 460 + t * vel) % 480) - 80;
    c_nube(B, m, x, y, w, 80 + k, capa === 2 ? [NB[0], NB[1], NB[2]] : [NB[1], NB[2], NB[3]], capa === 0 ? 0.85 : 0.7); }
  // las sombras de las nubes que pasan por los prados
  for (let k = 0; k < 2; k++) { const cx = ((t * 3 + k * 170) % 400) - 40; for (let y = 90; y < 116; y++) for (let x = Math.max(0, Math.floor(cx - 30)); x <= Math.min(319, cx + 30); x++) { const i = y * 320 + x; if (F.lejos[i] && Math.hypot((x - cx) / 30, (y - 103) / 9) < 1 && c_um(x, y) < 0.5) B[i] = c_mezcla(B[i], hex('#2a4a3a'), 0.3); } }
  // las aves, un tractor diminuto en el prado lejano
  for (let k = 0; k < 3; k++) { const x = ((t * 8 + k * 8) % 360) - 20, y = 44 + k * 3 + Math.sin(t + k) * 2, a = Math.sin(t * 9 + k) > 0, c = hex('#2a3040'); if (x > 270 && y < 48) continue; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : -1), c); R.pset(x + 2, y - (a ? 2 : -1), c); }
  { const x = 60 + ((t * 2) % 60), y = 99; R.rect(x, y - 2, x + 3, y, hex('#3a7a3a')); R.pset(x + 1, y - 3, hex('#2a2a2a')); R.pset(x, y + 1, K0); R.pset(x + 3, y + 1, K0); R.pset(x - 2 - Math.floor(t * 4) % 2, y - 1, hex('#c0b8a8')); }
  c_pegar(R, N.b);
  // la excavadora (o.excavadora 0–1: de 0 a 1 el brazo cava; 0, parada) y la tierra que suelta
  const ex = o.excavadora ?? 0, cava = ex > 0;
  const p = c_excavadora(R, 150, 146, 1, (t * 0.35) % 1, !cava, 1);
  if (cava) for (let k = 0; k < 6; k++) { const u = ((t * 0.35 * 4 + k / 6) % 1); if (Math.sin((t * 0.35 % 1) * Math.PI * 2) < 0) R.pset(p[0] + (h(k, 1, 871) - 0.5) * 6, p[1] + u * 8, I.camino[k % 3]); }
  // el coche del sheriff, parado en el camino con la luz que gira
  if (o.sheriff) c_cocheSheriff(R, 26, 147, t, 1);
  return { suelo: 150, libre: [30, 150], iglesia: [198, 262, 124], aguja: [230, 42], valla: [104, 320, 124, 137], seto: [104, 320, 110, 132], excavadora: [148, 196, 146], cazo: p, coche: o.sheriff ? [26, 78, 147] : null, camino: [140, 160] };
}

const K0 = hex('#1a1a1a');

// la cámara 'valla': de cerca la valla y el seto alto; por encima asoman la aguja y las copas; la excavadora parada
function c_valla(R, t, o) {
  const P = c_PAL.dia, I = c_IGL;
  const F = c_capa(R, 'valla|fondo', () => {
    const cielo = new Uint8Array(57600);
    for (let y = 0; y < 80; y++) for (let x = 0; x < 320; x++) { R.pset(x, y, c_tono(P.cielo, Math.pow(y / 80, 1.2), x, y)); cielo[y * 320 + x] = 1; }
    return { cielo };
  });
  const N = c_capa(R, 'valla|cerca', () => {
    // la aguja del campanario que asoma por encima del seto (x 200–224) y las copas de los árboles del cementerio
    for (let y = 50; y <= 76; y++) for (let x = 204; x <= 220; x++) R.pset(x, y, c_tono(I.blanco, c_lim(0.85 - (x > 215 ? 0.3 : 0) - (y % 3 === 0 ? 0.12 : 0)), x, y));
    R.rect(206, 56, 218, 68, I.gris[0]); for (let y = 57; y <= 67; y += 2) R.rect(207, y, 217, y, I.gris[2]);
    R.rect(202, 48, 222, 50, I.blanco[1]); R.poligono([[202, 48], [212, 22], [222, 48]], (x, y) => c_tono(I.gris, c_lim(x < 212 ? 0.65 : 0.25), x, y)); R.rect(212, 16, 212, 22, I.gris[0]); R.rect(209, 18, 215, 18, I.gris[0]);
    c_tronco(R, 60, 66, 60, 90, P.tronco, 880, -1); c_copa(R, 64, 48, 30, 24, P.copa, 881, -0.6, -0.8, (x, y) => !(x >= 20 && y < 22));
    c_copa(R, 132, 62, 24, 18, P.copa, 882, -0.6, -0.8);
    c_copa(R, 262, 60, 20, 18, c_hx(['#3a2410', '#5a3414', '#7a4a1a', '#9a6420', '#b88030', '#d0a040', '#e8c060']), 883, -0.6, -0.8, (x, y) => y >= 47);
    // el seto alto y tupido (y 64–118): hojas menudas en racimos, con la luz arriba y sombra abajo
    for (let x = 0; x < 320; x++) { const top = 66 + Math.sin(x * 0.12) * 2 + h(x >> 3, 0, 884) * 3;
      for (let y = Math.floor(top); y <= 118; y++) { const cop = h(x >> 1, y >> 1, 885), cl = Math.sin(x * 0.21 + y * 0.13) + Math.sin(x * 0.07 - y * 0.3);
        R.pset(x, y, c_tono(I.seto, c_lim(0.62 - (y - top) * 0.008 + (y - top < 3 ? 0.25 : 0) + (cl > 1 ? 0.12 : cl < -1 ? -0.15 : 0) + (cop > 0.65 ? 0.15 : cop < 0.25 ? -0.22 : 0) + (h(x, y, 886) - 0.5) * 0.18), x, y)); } }
    // la valla de estacas, grande: puntas, sombra de cada estaca, travesaños con sus clavos y la pintura gastada
    for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) if (y > 118) R.pset(x, y, c_tono(I.campo, c_lim(0.35 + (y - 118) * 0.006 + Math.sin(x * 0.1 + y * 0.5) * 0.06 + (h(x >> 1, y, 887) - 0.5) * 0.3), x, y));
    for (let x = 2; x < 320; x += 10) { for (let y = 98; y <= 142; y++) for (let i = 0; i < 6; i++) { if (y < 101 && Math.abs(i - 2.5) > (y - 97) * 0.9) continue; const v = 0.85 - (i > 3 ? 0.35 : 0) - (i === 0 ? 0.1 : 0) - (h(x + i, y >> 2, 888) < 0.06 ? 0.4 : 0);
        R.pset(x + i, y, c_tono(I.blanco, c_lim(v), x + i, y)); }
      R.rect(x + 6, 104, x + 8, 144, I.seto[0]); }
    for (const ry of [108, 130]) { R.rect(0, ry, 319, ry + 3, I.blanco[3]); R.rect(0, ry + 3, 319, ry + 3, I.blanco[1]); R.rect(0, ry, 319, ry, I.blanco[4]); for (let x = 4; x < 320; x += 10) { R.pset(x, ry + 1, I.gris[0]); R.pset(x + 2, ry + 1, I.gris[0]); } }
    // el borde de tierra removida y la hierba alta al pie de la valla
    for (let k = 0; k < 500; k++) { const x = h(k, 1, 889) * 320, y = 140 + h(k, 2, 889) * 40, a = 2 + (y - 140) * 0.12; for (let i = 0; i < a; i++) R.pset(x + (h(k, 3, 889) - 0.5) * i, y - i, I.campo[Math.min(5, 1 + Math.round(i / a * 3))]); }
    for (let y = 150; y < 168; y++) for (let x = 196; x < 300; x++) { const d = Math.hypot((x - 250) / 54, (y - 158) / 9); if (d < 1) R.pset(x, y, c_tono(I.camino, c_lim(0.35 + (h(x, y, 890) - 0.5) * 0.5 - d * 0.2), x, y)); }
    for (let k = 0; k < 12; k++) c_piedra(R, 205 + h(k, 1, 891) * 90, 153 + h(k, 2, 891) * 10, 1.6, 1.1, P.piedra, 892 + k);
  });
  R.copiar(F.b);
  const B = R.buf, m = F.cielo, NB = P.nube;
  for (let k = 5; k >= 0; k--) { const capa = k % 3, w = [56, 36, 22][capa] + h(k, 4, 893) * 12, y = [22, 38, 52][capa] + h(k, 5, 893) * 6, vel = [2.6, 1.5, 0.7][capa], x = ((h(k, 6, 893) * 460 + t * vel) % 480) - 80;
    c_nube(B, m, x, y, w, 90 + k, capa === 2 ? [NB[0], NB[1], NB[2]] : [NB[1], NB[2], NB[3]], capa === 0 ? 0.85 : 0.7); }
  for (let k = 0; k < 3; k++) { const x = ((t * 8 + k * 8) % 360) - 20, y = 30 + k * 3 + Math.sin(t + k) * 2, a = Math.sin(t * 9 + k) > 0, c = hex('#2a3040'); if (x > 270 && y < 48) continue; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : -1), c); R.pset(x + 2, y - (a ? 2 : -1), c); }
  c_pegar(R, N.b);
  // el seto que se mueve con el viento: hojas sueltas que brillan arriba, y un pájaro posado en la valla
  for (let k = 0; k < 30; k++) { const x = h(k, 1, 894) * 320, y = 66 + h(k, 2, 894) * 10 + Math.sin(x * 0.12) * 2, s = Math.sin(t * 2 + k); if (s > 0.5) R.pset(x + Math.round(s), y, I.seto[5]); }
  { const x = 82, y = 97, pic = Math.sin(t * 3) > 0.6; R.rect(x, y - 3, x + 3, y - 1, hex('#3a3a48')); R.pset(x + 4, y - (pic ? 2 : 4), hex('#3a3a48')); R.pset(x + 5, y - (pic ? 2 : 4), hex('#e8a030')); R.pset(x - 1, y - 2, hex('#3a3a48')); R.pset(x + 1, y - 2, hex('#c84a2a')); }
  // la excavadora amarilla, grande, parada con el cazo en el suelo
  c_excavadora(R, 206, 160, 2, 0, true, 1);
  return { suelo: 150, libre: [30, 190], valla: [0, 320, 98, 144], seto: [0, 320, 66, 118], aguja: [212, 16], excavadora: [204, 300, 160] };
}

// por delante en la iglesia: la cuneta con agua y flores silvestres al borde de abajo (en 'valla', solo flores y hierba)
function c_cuneta(R, t, valla, o) {
  const I = c_IGL;
  if (!valla) for (let x = 0; x < 320; x++) { const y = 172 + Math.round(Math.sin(x * 0.05) * 1.5); R.pset(x, y, I.camino[0]); R.pset(x, y + 1, Math.sin(x * 0.3 + t * 2) > 0.8 ? hex('#c8e0e8') : hex('#4a6a6a')); R.pset(x, y + 2, hex('#3a5a5a')); }
  for (let k = 0; k < 46; k++) { const x = h(k, 1, 895) * 320, base = 180, alto = 4 + h(k, 2, 895) * 8, sw = Math.sin(t * 1.6 + k) * 1.5, cf = [hex('#f0e8f0'), hex('#e8c838'), hex('#b86ad8'), hex('#f08a3a')][k % 4];
    if (x > 100 && x < 220 && h(k, 3, 895) < 0.6) continue;
    for (let i = 0; i < alto; i++) R.pset(x + sw * i / alto, base - i, I.campo[Math.min(5, 1 + Math.round(i / alto * 3))]);
    if (k % 2 === 0) { const fx = x + sw, fy = base - alto; R.pset(fx, fy, cf); R.pset(fx - 1, fy, cf); R.pset(fx + 1, fy, cf); R.pset(fx, fy - 1, cf); R.pset(fx, fy + 1, hex('#e8c040')); } }
  return {};
}

// una capa fija que se pinta una vez en su búfer y se reutiliza (nunca R.usar() a secas: rompería los fundidos)
const d_capasD = new Map();

function d_capaD(R, clave, dibuja) {
  let b = d_capasD.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); d_capasD.set(clave, b); }
  return b;
}

// copia de una capa solo los píxeles pintados (los de valor 0 son transparentes) dentro de [x0, y0, x1, y1]
function d_calcaD(R, capa, x0, y0, x1, y1) { const B = R.buf; for (let y = y0; y <= y1; y++) for (let x = x0, i = y * 320 + x0; x <= x1; x++, i++) { const c = capa[i]; if (c) B[i] = c; } }

// umbral del tramado ordenado 4 × 4 (transiciones limpias, sin ruido) y la mezcla de dos colores del lienzo (0xAABBGGRR)
const d_BAYD = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_umD = (x, y) => d_BAYD[((y & 3) << 2) | (x & 3)];

function d_mezD(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// la luz de un cuarto: oscurece hacia «oscuro» según v (0 sombra, 5 luz plena) en seis escalones tramados y entibia lo
// más iluminado; se aplica UNA vez a la capa fija (así todo lo de la habitación queda bajo la misma luz). Devuelve el
// mapa de luz para alumbrar igual lo que se mueve (d_alD).
function d_alumbraD(R, fv, oscuro, tinte) {
  const B = R.buf, mapa = new Float32Array(320 * 180);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, v = fv(x, y); mapa[i] = v; const c = B[i]; if (!c) continue; B[i] = d_luzPixD(c, v, x, y, oscuro, tinte); }
  return mapa;
}

function d_luzPixD(c, v, x, y, oscuro, tinte) {
  const k = Math.min(0.88, Math.max(0, Math.floor((0.98 - v * 0.19) * 6 + d_umD(x, y)) / 6));
  let r = d_mezD(c, oscuro, k); if (v > 3.6 && tinte) r = d_mezD(r, tinte, Math.min(0.22, (v - 3.6) * 0.14)); return r;
}

// un color alumbrado como la capa fija en el píxel (x, y) (para lo que se mueve: péndulo, cortinas, gato, ratón…)
const d_alD = (L, c, x, y) => (L ? d_luzPixD(c, L.mapa[(y | 0) * 320 + (x | 0)] ?? 2, x, y, L.oscuro, L.tinte) : c);

// pset y rectángulos que respetan R.recorte (R.rect no lo hace)
function d_rD(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); }

// cifras diminutas de 3 × 5 (números en papeles, relojes y carteles): solo dígitos
const d_DIGD = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function d_cifrasD(R, txt, x, y, c) { for (const ch of txt) { const g = d_DIGD[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// el símbolo del centavo (¢) de 3 × 7
function d_centavoD(R, x, y, c) { for (const [i, j] of [[1, 0], [1, 1], [0, 2], [1, 2], [2, 2], [0, 3], [0, 4], [1, 4], [2, 4], [1, 5], [1, 6]]) R.pset(x + i, y + j, c); }

const d_colD = { ...C, ...pal({
  // el cuarto: papel pintado de rayas con ramitos, el friso de tablas, el suelo de pino, la piedra del hogar
  papel: '#a8825e', papelR: '#94704e', papelF: '#c49c6c', papelH: '#7e7a4c', mancha: '#8e7050', friso: '#6e4a2a', frisoS: '#4a3018', frisoL: '#8a6038',
  suelo: '#7a5434', sueloS: '#5e3e24', sueloL: '#946a40', junta: '#2e1e12', techo: '#4a3424', techoS: '#33241a',
  piedra: '#8a7e74', piedraS: '#6e645c', piedraL: '#a89a8c', argamasa: '#5a504a', hollin: '#1a1416', ladrilloF: '#7a3a2a',
  noche: '#120c16', nocheV: '#1a1e2c', calido: '#ffc070', frio: '#c8d4e4', brasa: '#ff7a2a', brasaL: '#ffd060', brasaS: '#a02a14',
  mesa: '#8a5a32', mesaS: '#5e3a1e', mesaL: '#a8703e', cera: '#f4ecd4', ceraS: '#cfc2a0', llama: '#fff4c0', llamaN: '#ffb040', laton: '#d8a840', latonS: '#8a6420',
  colcha1: '#8a2e2e', colcha2: '#2e4a6e', colcha3: '#c8a050', colcha4: '#3e6a3e', colcha5: '#e8dcc0',
  libro1: '#7a2a22', libro2: '#2a4a3a', libro3: '#5a3a22', libro4: '#2e3456', libro5: '#8a6a2e', libro6: '#4a2a3a', dorado: '#d8b050',
  // la ventana de noche: el cielo tramado, sus nubes de tres tonos, los tejados de Lynchburg
  n0: '#0c1030', n1: '#141a3e', n2: '#1e2650', n3: '#2c3466', nube0: '#1a2048', nube1: '#262e58', nube2: '#3a4470', estrella: '#a8b0d8', luna: '#f0ecd0', lunaS: '#c8c4a8',
  tejado: '#0e1020', tejadoL: '#1a1c30', ventanaL: '#f0c060', ventanaA: '#262a44', dia0: '#8aa4c4', dia1: '#a8bcd4', dia2: '#c4d2e0', nubeD0: '#9aaac0', nubeD1: '#c8d2de', nubeD2: '#eef2f6',
  // la imprenta: ladrillo encalado, hierro de la prensa, los folletos amarillos, el humo
  ladr: '#9a4a36', ladrS: '#6e3224', ladrL: '#b8644a', cal: '#d8ccb4', calS: '#b4a890', hierroP: '#2a2e3a', hierroPL: '#5a6274', hierroPS: '#16181f',
  amar: '#e8c858', amarS: '#b8963a', amarL: '#f8e490', humo0: '#6a646a', humo1: '#8a8288', humo2: '#aaa2a4', naranjaH: '#e8782a', resma: '#e8e2d0', resmaS: '#b8b2a0',
  tipo: '#8a8e98', tipoS: '#5a5e68', diario: '#e6dcc2', diarioS: '#bcb094', rayita: '#6a6458', rayitaO: '#2a2622',
}) };

// geometría: pared y 12–119, suelo desde y 120; puerta x 12–44; estantería x 54–104 (y 40–120); ventana x 118–172
// (cristal 122–168 × 26–70); reloj x 188–204; perchero x 208–224; chimenea x 228–290 (boca 242–276 × 80–120); cama x
// 294–319; mesa x 104–232 (tablero de y 118 a 129, patas hasta y 158); la vela en x 200.
const d_VELA_XD = 200;

function d_luzCuartoD(vacio) {
  return vacio
    ? (x, y) => { const dw = Math.hypot((x - 145) * 0.8, (y - 60) * 1.2); return 1.7 + 2.5 * Math.exp(-dw / 95) - (x < 10 || x > 310 ? 0.5 : 0) - (y < 12 ? 0.6 : 0); }
    : (x, y) => { const dc = Math.hypot((x - d_VELA_XD) * 0.85, (y - 106) * 1.05), df = Math.hypot((x - 259) * 0.9, y - 108); return 1.15 + 3.7 * Math.exp(-dc / 72) + 1.9 * Math.exp(-df / 34) - (x < 8 || y < 10 ? 0.4 : 0); };
}

// la capa fija del cuarto (sin la mesa encima) y la de la mesa sola; devuelve { b, mesa, L }
function d_cuartoCapasD(R, o) {
  const vacio = !!o.vacio, familia = !!o.familia, clave = 'cuarto|' + vacio + '|' + familia;
  let L = d_capasD.get(clave + '|L');
  const b = d_capaD(R, clave, () => {
    d_cuartoFijoD(R, vacio, familia);
    // la mesa se pinta en su propia capa transparente y se calca en el cuarto antes de la luz
    const m = R.nuevo(), prev = R.usar(m); d_mesaFijaD(R, vacio); R.usar(prev); d_capasD.set(clave + '|mesaSinLuz', m);
    d_calcaD(R, m, 96, 112, 240, 162);
    const oscuro = vacio ? d_colD.nocheV : d_colD.noche, tinte = vacio ? d_colD.frio : d_colD.calido;
    L = { mapa: d_alumbraD(R, d_luzCuartoD(vacio), oscuro, tinte), oscuro, tinte }; d_capasD.set(clave + '|L', L);
    // la mesa ya alumbrada, para calcarla por delante de los personajes
    const B = R.buf; for (let i = 0; i < m.length; i++) if (m[i]) m[i] = B[i];
  });
  return { b, mesa: d_capasD.get(clave + '|mesaSinLuz'), L: d_capasD.get(clave + '|L') };
}

// el cuarto sin lo que se mueve: techo, papel pintado, friso, suelo, puerta, estantería, marco de la ventana, reloj,
// perchero, chimenea con el cuadro y la repisa, la cama y la alfombra; vacío (1885): sin muebles, con sus huellas claras
// en el papel, hojas clavadas en la pared, cajas y papeles por el suelo
function d_cuartoFijoD(R, vacio, familia) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, K = d_colD;
  // el techo de tablas y la viga
  for (let y = 0; y < 9; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (x % 22) === 0 ? K.techoS : h(x >> 1, y, 401) < 0.15 ? K.techoS : K.techo;
  rect(0, 8, 319, 11, K.frisoS); rect(0, 8, 319, 8, K.friso); for (let x = 6; x < 320; x += 40) rect(x, 9, x + 1, 10, K.techoS);
  // el papel pintado: rayas finas, ramitos alternos, manchas de humedad y el borde superior con su cenefa
  for (let y = 12; y < 86; y++) for (let x = 0; x < 320; x++) {
    let c = (x % 9) === 0 ? K.papelR : (x % 9) === 1 ? K.papelF : K.papel;
    const fx = x % 18, fy = (y + (Math.floor(x / 18) % 2) * 7) % 14;
    if (fx >= 4 && fx <= 6 && fy >= 5 && fy <= 7 && (fx - 5) ** 2 + (fy - 6) ** 2 <= 1) c = (fx === 5 && fy === 6) ? K.colcha1 : K.papelF;
    if ((fx === 3 || fx === 7) && fy === 8) c = K.papelH;
    const m = h(x >> 3, y >> 3, 402) * 0.6 + h(x >> 4, y >> 4, 403) * 0.4; if (m > 0.78 && d_umD(x, y) < (m - 0.78) * 6) c = K.mancha;
    B[y * 320 + x] = c;
  }
  rect(0, 12, 319, 15, K.frisoS); for (let x = 0; x < 320; x += 6) { rect(x + 1, 13, x + 3, 14, K.mancha); pset(x + 2, 13, K.papelF); }
  // el friso de tablas, la moldura de la silla y el rodapié
  rect(0, 85, 319, 88, K.frisoL); rect(0, 85, 319, 85, K.papelF); rect(0, 88, 319, 88, K.frisoS);
  for (let y = 89; y < 115; y++) for (let x = 0; x < 320; x++) { const r = x % 7; B[y * 320 + x] = r === 0 ? K.frisoS : r === 1 ? K.frisoL : h(x, y >> 2, 404) < 0.12 ? K.frisoS : K.friso; }
  rect(0, 114, 319, 119, K.frisoS); rect(0, 114, 319, 114, K.frisoL); rect(0, 119, 319, 119, K.junta);
  // el suelo de tablas en perspectiva (fugan hacia arriba), con juntas, cabezas de tabla, vetas y nudos
  for (let y = 120; y < 180; y++) { const f = (y + 70) / 250; for (let x = 0; x < 320; x++) {
    const u = (x - 160) / f + 160, tabla = Math.floor(u / 20), fr = u / 20 - tabla, corte = Math.floor((y - 120) / (10 + h(tabla, 0, 405) * 12) + h(tabla, 1, 405) * 3);
    let c = h(tabla, 2, 406) < 0.3 ? K.sueloS : K.suelo; if (h(Math.floor(u / 3), y >> 1, 407) < 0.18) c = K.sueloS; if (h(Math.floor(u / 2), y >> 2, 408) > 0.9) c = K.sueloL;
    if (fr * 20 * f < 1) c = K.junta; else if (fr * 20 * f < 2) c = K.sueloL;
    if (h(tabla, corte, 409) < 0.25 && Math.abs((y - 120) - ((corte + 0.5) * (10 + h(tabla, 0, 405) * 12))) < 0.5) c = K.junta;
    B[y * 320 + x] = c; } }
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 410) * 300 + 10), y = 124 + Math.round(h(k, 2, 410) * 52); disco(x, y, 1, K.sueloS); pset(x, y, K.junta); }   // nudos
  // la sombra de la mesa en el suelo
  for (let y = 136; y < 166; y++) for (let x = 100; x < 238; x++) { const d = ((x - 168) / 74) ** 2 + ((y - 152) / 14) ** 2; if (d < 1 && d_umD(x, y) < (1 - d) * 1.4) B[y * 320 + x] = d_mezD(B[y * 320 + x], K.junta, 0.45); }
  // ── la puerta (x 12–44): marco, cuatro cuarterones, pomo y bocallave; abierta (o.familia) deja ver el pasillo con luz
  rect(9, 56, 47, 119, K.k); rect(10, 57, 46, 119, K.frisoL); rect(13, 60, 43, 119, K.k); rect(10, 57, 46, 57, K.papelF);
  if (familia) {
    // el pasillo: pared clara, la barandilla de la escalera, el quinqué en su mesita; la hoja, abierta hacia dentro
    for (let y = 61; y < 120; y++) for (let x = 14; x < 43; x++) B[y * 320 + x] = y > 108 ? (x % 6 === 0 ? K.frisoL : K.mesaL) : (x % 5 === 0 ? K.papelF : hex('#e8c890'));
    rect(14, 104, 42, 108, K.mesaL); for (let x = 16; x < 42; x += 4) rect(x, 92, x, 104, K.mesaS); rect(14, 90, 42, 92, K.mesa);
    rect(31, 98, 39, 99, K.mesaS); rect(34, 90, 36, 97, K.laton); disco(35, 87, 2, K.llama); rect(34, 82, 36, 85, hex('#f8f0e0'));
    poligono([[13, 60], [21, 64], [21, 119], [13, 119]], K.k); poligono([[14, 61], [20, 65], [20, 118], [14, 118]], K.frisoL); rect(14, 61, 15, 118, K.papelF);
    for (let y = 120; y < 150; y++) for (let x = 14 - (y - 120) * 0.4; x < 43 + (y - 120) * 0.6; x++) if (d_umD(Math.round(x), y) < 0.55 - (y - 120) / 70) B[y * 320 + Math.round(x)] = d_mezD(B[y * 320 + Math.round(x)], hex('#e8c890'), 0.45);   // la luz que entra
  } else {
    rect(14, 61, 42, 119, K.friso); rect(14, 61, 42, 61, K.frisoL);
    for (const [y0, y1] of [[64, 86], [91, 115]]) for (const x0 of [16, 30]) { rect(x0, y0, x0 + 10, y1, K.frisoS); rect(x0 + 1, y0 + 1, x0 + 9, y1 - 1, K.frisoL); rect(x0 + 2, y0 + 2, x0 + 8, y1 - 2, K.friso); for (let y = y0 + 3; y < y1 - 2; y += 3) pset(x0 + 4 + (y % 2), y, K.frisoS); }
    disco(39, 90, 2, K.k); disco(39, 90, 1, K.laton); pset(38, 89, K.llama); rect(39, 94, 39, 96, K.k);
  }
  // ── la estantería (x 54–104) o, en 1885, su huella clara y la pared llena de hojas clavadas
  if (!vacio) {
    rect(52, 38, 106, 120, K.k); rect(53, 40, 105, 119, K.mesaS); rect(52, 37, 106, 41, K.mesa); rect(52, 37, 106, 37, K.mesaL); rect(53, 41, 105, 42, K.frisoS);
    const cols = [K.libro1, K.libro2, K.libro3, K.libro4, K.libro5, K.libro6];
    for (const [s, yb] of [[0, 56], [1, 71], [2, 86], [3, 101], [4, 116]]) {
      rect(56, yb - 13, 102, yb, hex('#1c120c')); rect(55, yb + 1, 103, yb + 2, K.mesa); rect(55, yb + 1, 103, yb + 1, K.mesaL);
      let x = 57; for (let k = 0; x < 100; k++) { const w = 2 + Math.round(h(k, s, 411) * 3), hh = 8 + Math.round(h(k, s, 412) * 4), c = cols[Math.floor(h(k, s, 413) * 6)];
        if (s === 2 && k === 3) { for (let i = 0; i < 3; i++) { rect(x, yb - 2 - i * 3, x + 10, yb - i * 3, K.k); rect(x + 1, yb - 1 - i * 3, x + 9, yb - i * 3, cols[(i + 2) % 6]); pset(x + 2, yb - 1 - i * 3, K.dorado); } x += 12; continue; }
        if (s === 4 && k === 2) { rect(x, yb - 7, x + 9, yb, K.k); rect(x + 1, yb - 6, x + 8, yb, K.frisoL); rect(x + 1, yb - 6, x + 8, yb - 6, K.papelF); pset(x + 4, yb - 4, K.laton); x += 11; continue; }   // una cajita
        if (h(k, s, 414) < 0.1 && x < 94) { linea(x, yb, x + 4, yb - hh + 1, K.k); linea(x + 1, yb, x + 5, yb - hh + 1, c); x += 6; continue; }   // uno inclinado
        rect(x, yb - hh, x + w, yb, K.k); rect(x + 1, yb - hh + 1, x + w - (w > 2 ? 1 : 0), yb, c); pset(x + 1, yb - hh + 3, K.dorado); pset(x + 1, yb - 3, K.dorado); if (w > 3) pset(x + 2, yb - hh + 3, K.dorado); x += w + 1; } }
    // arriba: papeles enrollados y un globo pequeño
    for (let k = 0; k < 3; k++) { rect(58 + k * 4, 32 - k, 70 + k * 4, 35 - k, K.k); rect(59 + k * 4, 33 - k, 69 + k * 4, 34 - k, K.cera); pset(69 + k * 4, 33 - k, K.ceraS); }
    disco(94, 31, 5, K.k); disco(94, 31, 4, hex('#4a6a7a')); rect(92, 29, 95, 32, hex('#6a7a4a')); rect(92, 36, 96, 37, K.laton);
  } else {
    rect(53, 38, 105, 119, d_mezD(K.papel, K.papelF, 0.5)); for (let y = 40; y < 118; y += 9) for (let x = 55; x < 104; x += 9) pset(x + (y % 2), y, K.papelF);
    // hojas clavadas en la pared, con columnas de cifras: «papeles por todas partes»
    for (let k = 0; k < 22; k++) { const x = 52 + Math.round(h(k, 1, 415) * 132), y = 20 + Math.round(h(k, 2, 415) * 58), w = 9 + Math.round(h(k, 3, 415) * 3); if (x > 112 && x < 178 && y < 76) continue;
      rect(x, y, x + w, y + 12, K.ceraS); rect(x, y, x + w - 1, y + 11, K.cera); for (let j = 0; j < 4; j++) for (let i = 0; i < w - 3; i += 2) if (h(k * 9 + i, j, 416) < 0.75) pset(x + 2 + i, y + 2 + j * 2, K.rayitaO); pset(x + Math.round(w / 2), y, K.colcha1); }
    // cajas de embalar, una con papeles
    for (const [x0, y0, w, hh] of [[58, 104, 26, 16], [86, 110, 18, 10], [62, 92, 18, 12]]) { rect(x0, y0, x0 + w, y0 + hh, K.k); rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, K.frisoL); for (let y = y0 + 4; y < y0 + hh; y += 4) rect(x0 + 1, y, x0 + w - 1, y, K.friso); rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 1, K.papelF); }
    for (let k = 0; k < 5; k++) poligono([[63 + k * 3, 92], [66 + k * 3, 86 - (k % 2) * 2], [70 + k * 3, 87], [68 + k * 3, 92]], k % 2 ? K.cera : K.ceraS);
  }
  // ── la ventana (cristal x 122–168, y 26–70): el marco, el parteluz y el alféizar (el cielo lo pinta cada fotograma)
  rect(116, 20, 174, 74, K.k); rect(117, 21, 173, 73, K.cera); rect(117, 21, 173, 22, hex('#fff8e8')); rect(119, 23, 171, 72, K.ceraS);
  rect(114, 73, 176, 78, K.k); rect(115, 73, 175, 76, K.cera); rect(115, 73, 175, 73, hex('#fff8e8')); rect(115, 77, 175, 78, K.frisoS);
  if (!vacio) { rect(122, 69, 128, 73, K.k); rect(123, 70, 127, 72, hex('#5a7a8a')); rect(124, 66, 126, 69, hex('#3a6a3a')); pset(125, 65, hex('#c84a4a')); }   // un tarro con una flor
  // ── el reloj de pared (x 188–204): caja de nogal, esfera y la puerta de cristal del péndulo (lo pinta cada fotograma)
  if (!vacio) {
    rect(187, 22, 205, 76, K.k); rect(188, 23, 204, 75, K.mesa); rect(188, 23, 204, 24, K.mesaL); poligono([[186, 22], [196, 15], [206, 22]], K.k); poligono([[188, 21], [196, 16], [204, 21]], K.mesaS);
    disco(196, 33, 7, K.k); disco(196, 33, 6, K.cera); for (let k = 0; k < 12; k++) pset(Math.round(196 + Math.cos(k / 12 * 6.283) * 5), Math.round(33 + Math.sin(k / 12 * 6.283) * 5), K.k);
    rect(190, 43, 202, 70, K.k); rect(191, 44, 201, 69, hex('#2a1c14')); rect(194, 76, 198, 79, K.mesaS);
  } else { rect(187, 18, 205, 76, d_mezD(K.papel, K.papelF, 0.5)); pset(196, 19, K.k); pset(196, 20, K.junta); }
  // ── el perchero con el abrigo y el sombrero (en 1885, solo el perchero)
  rect(207, 56, 226, 58, K.mesaS); rect(207, 56, 226, 56, K.mesaL); for (const px of [211, 221]) { rect(px, 58, px + 1, 61, K.k); pset(px, 58, K.laton); }
  if (!vacio) {
    // el abrigo largo: hombros, cuello vuelto, las dos mangas caídas, botones y el bajo con su pliegue
    poligono([[211, 60], [222, 60], [226, 66], [228, 104], [205, 104], [207, 66]], K.k); poligono([[211, 61], [222, 61], [225, 67], [227, 103], [206, 103], [208, 67]], hex('#3a3e4a'));
    poligono([[212, 61], [216, 70], [221, 61]], hex('#2a2c36')); for (const y of [74, 82, 90]) pset(216, y, K.laton); linea(216, 70, 216, 103, hex('#2a2c36'));
    linea(208, 68, 207, 96, hex('#4e5464')); linea(225, 68, 226, 96, hex('#2a2c36')); rect(206, 96, 209, 99, hex('#2a2c36')); rect(224, 96, 227, 99, hex('#2a2c36'));
    rect(206, 103, 227, 103, K.k); linea(212, 92, 213, 103, hex('#2a2c36'));
    // el sombrero de copa en la percha de al lado
    rect(214, 54, 230, 55, K.k); rect(217, 45, 227, 54, K.k); rect(218, 46, 226, 53, hex('#2a2a30')); rect(215, 54, 229, 54, hex('#2a2a30')); rect(218, 51, 226, 52, K.colcha1); rect(218, 46, 219, 50, hex('#4a4a54'));
  }
  // ── la chimenea: el pecho de piedra (x 228–290), la repisa, el cuadro y la boca (x 242–276, y 80–120)
  for (let y = 12; y < 120; y++) for (let x = 228; x <= 290; x++) { const fila = Math.floor(y / 7), off = (fila % 2) * 6, col = Math.floor((x + off) / 12), jy = y % 7 === 0, jx = (x + off) % 12 === 0;
    const suave = y < 46 && x > 272; let c = jx || jy ? (suave ? K.piedraS : K.argamasa) : h(col, fila, 417) < 0.3 ? K.piedraS : h(col, fila, 418) > 0.8 ? K.piedraL : K.piedra; if (!suave && !jx && !jy && h(x, y, 419) < 0.06) c = K.argamasa; B[y * 320 + x] = c; }
  rect(227, 12, 227, 119, K.k); rect(291, 12, 291, 119, K.k);
  rect(222, 60, 296, 65, K.k); rect(223, 61, 295, 63, K.mesa); rect(223, 61, 295, 61, K.mesaL); rect(223, 64, 295, 64, K.mesaS); for (const cx of [226, 292]) { rect(cx - 2, 65, cx + 2, 70, K.k); rect(cx - 1, 65, cx + 1, 69, K.mesaS); }
  // la boca del hogar, con su arco, el hollín, los ladrillos refractarios y la losa delante
  rect(240, 78, 278, 120, K.k); rect(242, 80, 276, 119, K.hollin); for (let x = 242; x <= 276; x++) { const a = Math.round(83 - Math.sqrt(Math.max(0, 289 - (x - 259) ** 2)) * 0.22); rect(x, 80, x, a, K.piedra); }
  for (let y = 88; y < 118; y += 4) for (let x = 244 + ((y >> 2) % 2) * 3; x < 274; x += 7) rect(x, y, x + 5, y + 2, d_mezD(K.ladrilloF, K.hollin, 0.5));
  rect(234, 119, 284, 125, K.k); rect(235, 120, 283, 124, K.piedraL); rect(235, 120, 283, 120, hex('#c8bcae')); for (let x = 247; x < 283; x += 12) rect(x, 121, x, 124, K.argamasa);
  if (vacio) { for (let k = 0; k < 30; k++) pset(248 + Math.round(h(k, 1, 420) * 22), 114 + Math.round(h(k, 2, 420) * 5), h(k, 3, 420) < 0.5 ? K.piedraS : K.argamasa); linea(244, 82, 252, 90, K.piedraL); linea(244, 86, 250, 82, K.piedraL); }   // ceniza fría y una telaraña
  else { rect(246, 112, 272, 113, K.k); rect(248, 106, 250, 118, K.k); rect(268, 106, 270, 118, K.k); disco(249, 105, 1, K.laton); disco(269, 105, 1, K.laton); }   // los morillos
  // el atizador y la pala apoyados
  linea(281, 118, 285, 96, K.k); linea(282, 118, 286, 96, K.hierroL); disco(286, 95, 1, K.laton); linea(286, 118, 289, 100, K.k); rect(285, 115, 288, 118, K.hierro);
  // el cuadro de los picos de Otter (sin firma), que en 1885 ya no está
  if (!vacio) {
    rect(238, 26, 274, 54, K.k); rect(239, 27, 273, 53, K.laton); rect(239, 27, 273, 27, hex('#f0d070')); rect(241, 29, 271, 51, hex('#c8d4d8'));
    for (let x = 241; x <= 271; x++) { const yp = Math.round(42 - 8 * Math.exp(-(((x - 252) / 6) ** 2)) - 6 * Math.exp(-(((x - 263) / 5) ** 2))); rect(x, yp, x, 51, hex('#6a7a9a')); rect(x, Math.max(yp, 46), x, 51, hex('#4a6a3e')); }
    rect(241, 49, 271, 51, hex('#3a5a32')); for (let x = 243; x < 270; x += 5) pset(x, 47, hex('#2e4a2a')); disco(246, 32, 1, hex('#f8f0d0'));
  } else { rect(238, 26, 274, 54, d_mezD(K.piedra, K.piedraL, 0.5)); pset(256, 24, K.k); }
  // en la repisa: dos candeleros de latón apagados, una caja de lata, una pipa y un bote de astillas
  if (!vacio) {
    for (const cx of [232, 286]) { rect(cx - 2, 58, cx + 2, 60, K.k); rect(cx - 1, 50, cx + 1, 58, K.laton); rect(cx - 1, 44, cx + 1, 49, K.cera); pset(cx, 43, K.k); }
    rect(244, 54, 254, 60, K.k); rect(245, 55, 253, 60, hex('#6a2a2a')); rect(245, 55, 253, 55, hex('#9a4a3a')); pset(249, 57, K.laton);
    linea(258, 59, 266, 58, K.k); rect(265, 56, 267, 58, K.mesaS); rect(272, 52, 277, 60, K.k); rect(273, 53, 276, 60, K.frisoL); for (let k = 0; k < 4; k++) linea(273 + k, 52, 272 + k * 2, 46, K.cera);
  }
  // ── la cama estrecha (x 294–319): el cabecero, el colchón con la colcha de retales y la almohada; en 1885, nada
  if (!vacio) {
    // el cabecero alto contra la pared de la derecha y los pies, de madera torneada
    rect(312, 74, 319, 140, K.k); rect(313, 75, 319, 139, K.mesa); rect(313, 75, 314, 139, K.mesaL); disco(315, 73, 3, K.k); disco(315, 73, 2, K.mesaL);
    // el colchón con la sábana vuelta, la almohada y la colcha de retales que cae por el lado
    poligono([[296, 100], [312, 96], [312, 104], [296, 106]], K.k); poligono([[297, 101], [311, 97], [311, 103], [297, 105]], K.cera); rect(304, 95, 311, 100, K.k); rect(305, 96, 311, 99, hex('#fff8e8'));
    for (let y = 105; y < 128; y++) for (let x = 293; x < 312; x++) { const q = ((x - 293) / 6 | 0) + ((y - 105) / 6 | 0) * 2; let c = [K.colcha1, K.colcha5, K.colcha2, K.colcha3, K.colcha4][q % 5]; c = d_mezD(c, K.mesaS, 0.35); if ((x - 293) % 6 === 0 || (y - 105) % 6 === 0) c = d_mezD(c, K.k, 0.3); if (y > 124) c = d_mezD(c, K.k, 0.25); B[y * 320 + x] = c; }
    rect(292, 105, 312, 106, K.colcha5); rect(292, 105, 292, 128, K.k); for (let x = 293; x < 312; x += 3) pset(x, 128, K.k);
    // los pies de la cama y lo de debajo: las botas y la sombra
    rect(289, 92, 294, 140, K.k); rect(290, 93, 293, 139, K.mesa); rect(290, 93, 290, 139, K.mesaL); disco(291, 91, 2, K.k); disco(291, 91, 1, K.mesaL); for (const y of [110, 130]) rect(289, y, 294, y + 1, K.mesaL);
    rect(295, 129, 311, 140, hex('#1a120c')); rect(298, 133, 304, 139, K.k); rect(299, 134, 303, 138, hex('#3a2a1c')); rect(300, 130, 303, 133, K.k); rect(305, 134, 310, 139, K.k); rect(306, 135, 309, 138, hex('#3a2a1c'));
  } else { for (let k = 0; k < 4; k++) disco(296 + k * 6, 124 + (k % 2) * 3, 1, K.sueloS); }
  // ── la alfombra de trapo trenzado bajo la mesa (en 1885 ya no está: papeles por el suelo)
  if (!vacio) {
    const anillos = [K.colcha1, K.colcha3, K.colcha2, K.colcha5, K.colcha4, K.colcha1, K.colcha3];
    for (let y = 150; y < 180; y++) for (let x = 84; x < 256; x++) { const d = Math.hypot((x - 170) / 84, (y - 166) / 14); if (d >= 1) continue; const a = Math.floor(d * 7), tr = ((x >> 1) + (y >> 0) + a) % 3 === 0;
      B[y * 320 + x] = d > 0.95 ? K.junta : tr ? d_mezD(anillos[a], K.k, 0.3) : anillos[a]; }
  } else {
    for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 421) * 300 + 6), y = Math.round(124 + h(k, 2, 421) * 52), s = 1 + (y - 120) / 40, w = Math.round(7 * s), hh = Math.round(3 * s), sk = Math.round((h(k, 3, 421) - 0.5) * 4);
      if (x > 228 && x < 290 && y < 128) continue;
      poligono([[x, y], [x + w, y + sk], [x + w + 1, y + hh + sk], [x + 1, y + hh]], K.ceraS); poligono([[x, y - 1], [x + w, y - 1 + sk], [x + w, y + hh - 1 + sk], [x, y + hh - 1]], h(k, 4, 421) < 0.3 ? K.papel : K.cera);
      for (let i = 2; i < w - 1; i += 2) pset(x + i, y + 1 + Math.round(sk * i / w), K.rayita); }
    for (let k = 0; k < 6; k++) { const x = 30 + Math.round(h(k, 5, 421) * 250), y = 140 + Math.round(h(k, 6, 421) * 34); disco(x, y, 2, K.ceraS); pset(x - 1, y - 1, K.cera); pset(x + 1, y, K.cera); }   // bolas de papel arrugado
  }
  // la ratonera en el rodapié, entre la puerta y la estantería
  rect(47, 115, 51, 119, K.k); pset(47, 115, K.frisoS); pset(51, 115, K.frisoS);
}

// la mesa (x 104–232): tablero con veta, canto claro, faldón con cajón y tirador, y cuatro patas torneadas
function d_mesaFijaD(R, vacio) {
  const { rect, pset, poligono, disco } = R, K = d_colD;
  // las patas de atrás (más cortas y oscuras), y las de delante, torneadas
  for (const x of [114, 218]) { rect(x, 136, x + 3, 146, K.k); rect(x + 1, 136, x + 2, 145, K.mesaS); }
  for (const x of [106, 225]) { rect(x - 1, 136, x + 6, 159, K.k); rect(x, 137, x + 5, 158, K.mesa); rect(x, 137, x + 1, 158, K.mesaL); for (const y of [142, 150]) { rect(x - 1, y, x + 6, y + 2, K.k); rect(x, y, x + 5, y + 1, K.mesaL); } rect(x + 4, 137, x + 5, 158, K.mesaS); }
  // el tablero (trapecio: atrás 108–228 en y 118, delante 104–232 en y 129)
  poligono([[107, 117], [229, 117], [233, 129], [103, 129]], K.k);
  for (let y = 118; y <= 128; y++) { const a = Math.round(108 - (y - 118) * 0.36), b = Math.round(228 + (y - 118) * 0.36); for (let x = a; x <= b; x++) { let c = K.mesa; if (h(Math.floor(x / 9), y, 422) < 0.3) c = K.mesaS; if (h(x >> 2, y, 423) > 0.86) c = K.mesaL; R.pset(x, y, c); } }
  rect(104, 129, 232, 132, K.k); rect(104, 129, 232, 130, K.mesaL); rect(104, 131, 232, 131, K.mesa);
  rect(106, 132, 230, 137, K.k); rect(107, 132, 229, 136, K.mesaS); rect(150, 133, 186, 136, K.k); rect(151, 133, 185, 135, K.mesa); rect(151, 133, 185, 133, K.mesaL); disco(168, 134, 1, K.laton);
}

// lo que hay encima de la mesa grande (cada fotograma: la vela se consume y su llama tiembla). Devuelve la llama [x, y].
function d_cosasMesaD(R, t, o, vacio) {
  const { rect, pset, poligono, linea, disco } = R, K = d_colD, vela = Math.max(0, Math.min(1, o.vela ?? 0)), B = R.buf;
  // papeles con cuentas, debajo de todo
  for (const [x, y, s] of [[118, 124, 1], [136, 126, 2], [186, 125, 3]]) { poligono([[x, y], [x + 12, y - 1], [x + 13, y + 3], [x + 1, y + 4]], K.ceraS); poligono([[x, y - 1], [x + 12, y - 2], [x + 12, y + 2], [x, y + 3]], K.cera); for (let i = 0; i < 9; i += 2) if (h(i, s, 424) < 0.7) { pset(x + 2 + i, y, K.rayitaO); pset(x + 2 + i, y + 2, K.rayita); } }
  // el pergamino de la Declaración (o.pergamino 0–1 lo desenrolla), con sus renglones de rayitas: nunca legible
  const pg = o.pergamino === true ? 1 : Math.max(0, Math.min(1, +o.pergamino || 0));
  if (pg > 0) { const w = Math.round(6 + pg * 30), x0 = 108, y0 = 119;
    poligono([[x0, y0], [x0 + w, y0], [x0 + w + 2, y0 + 8], [x0 - 2, y0 + 8]], hex('#b89a64')); poligono([[x0, y0], [x0 + w, y0], [x0 + w + 1, y0 + 7], [x0 - 1, y0 + 7]], hex('#e8d4a0'));
    for (let j = 0; j < 3; j++) for (let i = 4; i < w - 2; i++) if (((i + j * 3) % 7) !== 0 && h(i, j, 425) < 0.85) pset(x0 + i, y0 + 2 + j * 2, hex('#7a5a3a'));
    rect(x0 + 2, y0 + 1, x0 + Math.min(w - 2, 12), y0 + 1, hex('#5a3a22'));   // el encabezamiento, más grueso
    for (const xr of [x0 - 2, x0 + w]) { rect(xr, y0 - 1, xr + 3, y0 + 8, K.k); rect(xr + 1, y0, xr + 2, y0 + 7, hex('#d8c08a')); pset(xr + 1, y0, hex('#f4e8c0')); } }
  else { // un libro abierto que está probando
    poligono([[110, 121], [122, 119], [134, 121], [134, 127], [122, 125], [110, 127]], K.k); poligono([[111, 121], [121, 120], [121, 125], [111, 126]], K.cera); poligono([[123, 120], [133, 121], [133, 126], [123, 125]], K.ceraS);
    for (let j = 0; j < 3; j++) { linea(113, 122 + j, 119, 121 + j, K.rayita); linea(125, 121 + j, 131, 122 + j, K.rayita); } }
  // LAS TRES HOJAS DE NÚMEROS, en fila delante de él: papel claro con columnas de cifras diminutas
  for (let n = 0; n < 3; n++) { const x = 144 + n * 13, y = 120 + (n === 1 ? -1 : 0);
    poligono([[x, y], [x + 11, y], [x + 12, y + 7], [x - 1, y + 7]], K.k); poligono([[x, y + 1], [x + 11, y + 1], [x + 11, y + 6], [x, y + 6]], n === 1 && o.brillo ? K.llama : K.cera);
    for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { pset(x + 1 + i * 3, y + 2 + j * 2, K.rayitaO); if (h(i, j + n * 5, 426) < 0.6) pset(x + 2 + i * 3, y + 2 + j * 2, K.rayitaO); } }
  // el tintero y la pluma
  rect(186, 120, 192, 125, K.k); rect(187, 121, 191, 124, hex('#1a1a2a')); pset(187, 121, hex('#6a6a8a')); linea(190, 120, 196, 110, K.cera); linea(191, 120, 197, 111, K.ceraS); pset(196, 109, K.cera);
  // los libros que ya ha probado, apilados, uno con una tira de papel de marcapáginas
  for (const [y, w, c, d] of [[124, 22, K.libro1, 0], [120, 20, K.libro4, 1], [116, 21, K.libro2, -1], [112, 18, K.libro3, 1]]) { const x = 208 + d; rect(x, y, x + w, y + 4, K.k); rect(x + 1, y + 1, x + w - 1, y + 3, c); rect(x + w - 3, y + 1, x + w - 1, y + 3, K.cera); pset(x + 3, y + 2, K.dorado); pset(x + 6, y + 2, K.dorado); }
  rect(214, 108, 215, 113, K.cera);
  if (vacio) { // en 1885: torres de papeles y un cabo de vela apagado
    for (let k = 0; k < 7; k++) { const x = 112 + k * 3, y = 124 - k * 2; rect(x, y, x + 14, y + 2, K.ceraS); rect(x, y, x + 13, y + 1, K.cera); }
    rect(196, 122, 205, 124, K.k); rect(197, 122, 204, 123, K.laton); rect(199, 118, 202, 121, K.cera); pset(200, 117, K.k); return null; }
  // LA VELA: el platillo de latón con su asa, la vela que se consume (de 15 a 2 px), los goterones y la llama que tiembla
  const X = d_VELA_XD, base = 122, alto = Math.round(15 - vela * 13), top = base - alto;
  rect(X - 6, base, X + 6, base + 3, K.k); rect(X - 5, base + 1, X + 5, base + 2, K.laton); rect(X - 5, base + 1, X + 5, base + 1, hex('#f8e080')); rect(X + 6, base, X + 8, base + 2, K.k); pset(X + 7, base + 1, K.latonS);
  rect(X - 2, top, X + 2, base, K.k); rect(X - 1, top + 1, X + 1, base, K.cera); rect(X + 1, top + 1, X + 1, base, K.ceraS);
  for (const [dx, l] of [[-2, 3 + Math.round(vela * 2)], [2, 2]]) if (alto > 3) rect(X + dx, top + 1, X + dx, Math.min(base, top + l), K.cera);
  pset(X, top, K.k);
  const fl = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3 + 1) * 0.5, ox = Math.round(Math.sin(t * 3.1) * 0.6), fy = top - 1, fh = 5 + (fl > 0.4 ? 1 : 0);
  for (let j = 0; j < fh; j++) { const w = j < 1 ? 0 : j < fh - 2 ? 1 : 0; const yy = fy - j, xx = X + (j > 2 ? ox : 0); rect(xx - w, yy, xx + w, yy, j < 2 ? K.llamaN : K.llama); }
  pset(X, fy, hex('#5a6ab8'));
  // el resplandor sobre el tablero alrededor del platillo
  for (let y = 117; y <= 129; y++) for (let x = X - 26; x <= X + 26; x++) { const d = Math.hypot((x - X) / 26, (y - base) / 7); if (d < 1 && d_umD(x, y) < (1 - d) * (0.55 + fl * 0.08) && B[y * 320 + x] !== K.k) pset(x, y, d_mezD(B[y * 320 + x], K.llama, 0.22)); }
  return [X, fy - 3];
}

// LA CÁMARA GENERAL DEL CUARTO, de noche (o en 1885, vacío y de día gris). delante: solo lo que va por delante
function d_cuartoGeneralD(R, t, o, delante) {
  const vacio = !!o.vacio, K = d_colD, { pset, rect, linea, disco, poligono } = R;
  const { b, mesa, L } = d_cuartoCapasD(R, o);
  const geo = { suelo: 150, libre: [30, 104], mesa: [104, 232, 118], asiento: [150, 122], puerta: [12, 44, 120], ventana: [122, 168, 26, 70], estanteria: [54, 104, 40, 120], chimenea: [242, 276, 80, 120], vela: [d_VELA_XD, 106] };
  if (delante) { d_calcaD(R, mesa, 100, 112, 236, 162); const v = d_cosasMesaD(R, t, o, vacio); if (v) geo.vela = v; return geo; }
  R.copiar(b);
  // ── la ventana: de noche, el cielo tramado con estrellas, luna y nubes, y Lynchburg en sus colinas; de día gris en 1885
  d_ventanaD(R, t, 122, 26, 168, 70, vacio ? 'gris' : 'noche');
  rect(144, 26, 146, 70, K.k); rect(145, 26, 145, 70, K.cera); rect(122, 47, 168, 49, K.k); rect(122, 48, 168, 48, K.cera); for (const x of [133, 157]) rect(x, 26, x, 70, d_alD(L, K.ceraS, x, 40)); for (const y of [37, 59]) rect(122, y, 168, y, d_alD(L, K.ceraS, 140, y));
  for (let k = 0; k < 2; k++) for (let i = 0; i < 8; i++) if ((i + k) % 2) pset(126 + k * 24 + i, 44 - i, vacio ? K.dia2 : hex('#3a4068'));   // reflejos en el cristal
  // las cortinas, que mueve el aire que entra por la rendija
  rect(108, 17, 182, 18, d_alD(L, K.latonS, 140, 17)); disco(108, 17, 1, K.laton); disco(182, 17, 1, K.laton);
  const cort = vacio ? hex('#6a7480') : hex('#7a2e2e'), cortS = d_mezD(cort, K.k, 0.35), cortL = d_mezD(cort, K.cera, 0.25);
  for (let y = 19; y < 84; y++) { const w = 7 + Math.round(Math.sin(t * 0.8 + y * 0.08) * 1.2 + (y - 19) * 0.035), w2 = 6 + Math.round(Math.sin(t * 0.8 + 2 + y * 0.08) * 0.8);
    for (let x = 109; x <= 109 + w; x++) pset(x, y, d_alD(L, (x - 109) % 4 === 1 ? cortL : (x - 109) % 4 === 3 ? cortS : cort, x, y)); pset(109 + w, y, K.k);
    for (let x = 181 - w2; x <= 181; x++) pset(x, y, d_alD(L, x % 4 === 1 ? cortL : x % 4 === 3 ? cortS : cort, x, y)); pset(181 - w2, y, K.k); }
  if (!vacio) {
    // el reloj: las agujas y el péndulo que oscila
    const mi = t * 0.5, ho = t * 0.04 + 2.4; linea(196, 33, Math.round(196 + Math.sin(mi) * 4), Math.round(33 - Math.cos(mi) * 4), K.k); linea(196, 33, Math.round(196 + Math.sin(ho) * 3), Math.round(33 - Math.cos(ho) * 3), K.k);
    const pa = Math.sin(t * Math.PI) * 0.32, px = 196 + Math.sin(pa) * 18, py = 44 + Math.cos(pa) * 18; linea(196, 45, Math.round(px), Math.round(py), d_alD(L, K.latonS, 196, 55)); disco(Math.round(px), Math.round(py), 2, d_alD(L, K.laton, 196, 62)); pset(Math.round(px) - 1, Math.round(py) - 1, d_alD(L, hex('#f8e080'), 196, 62));
    for (let i = 0; i < 6; i++) pset(192 + i, 50 + i, d_alD(L, hex('#5a4030'), 196, 52));
    // el hogar: brasas que respiran, llamitas bajas, chispas que suben y el resplandor en la losa
    for (let k = 0; k < 2; k++) { const y = 113 - k * 3; rect(248, y, 270, y + 3, K.k); for (let x = 249; x < 270; x++) { const g = Math.sin(t * 3 + x * 0.7 + k * 2) + Math.sin(t * 5.3 + x * 0.3); pset(x, y + 1, g > 0.9 ? K.brasaL : g > -0.3 ? K.brasa : K.brasaS); pset(x, y + 2, g > 0.5 ? K.brasa : K.brasaS); } }
    for (let k = 0; k < 7; k++) { const x = 250 + k * 3, hh = 2 + Math.round((Math.sin(t * 9 + k * 1.7) + 1) * 2 * (1 - Math.abs(k - 3) / 5)); for (let j = 0; j < hh; j++) pset(x + (j > 1 ? Math.round(Math.sin(t * 6 + k)) : 0), 109 - j, j < hh - 1 ? K.brasa : K.brasaL); }
    for (let k = 0; k < 4; k++) { const ph = (t * 0.7 + k * 0.27) % 1, x = Math.round(252 + k * 5 + Math.sin(ph * 8 + k) * 2), y = Math.round(106 - ph * 26); if (y > 82) pset(x, y, ph < 0.5 ? K.brasaL : K.brasa); }
    for (let y = 120; y < 132; y++) for (let x = 236; x < 284; x++) { const d = Math.hypot((x - 259) / 26, (y - 120) / 10); if (d < 1 && d_umD(x, y) < (1 - d) * (0.6 + 0.15 * Math.sin(t * 4))) pset(x, y, d_mezD(R.pget(x, y), K.brasa, 0.25)); }
    // el gato dormido en la losa del hogar: respira y mueve la punta de la cola
    { const gx = 266, gy = 118, r = Math.sin(t * 1.6) > 0.3 ? 1 : 0, gc = d_alD(L, hex('#c8782a'), gx, gy), gs = d_alD(L, hex('#8a4a1a'), gx, gy);
      disco(gx, gy, 6, K.k); disco(gx + 1, gy - r, 5, K.k); for (let j = -5; j <= 5; j++) for (let i = -6; i <= 7; i++) if ((i / 6.5) ** 2 + (j / (5 - r * 0.5)) ** 2 < 1 && gy + j < 120) pset(gx + i, gy + j, ((i + j * 2) % 5 === 0) ? gs : gc);
      rect(gx - 7, gy + 1, gx + 8, gy + 1, K.k); disco(gx - 5, gy - 1, 3, K.k); disco(gx - 5, gy - 1, 2, gc); pset(gx - 7, gy - 4, K.k); pset(gx - 4, gy - 4, K.k); pset(gx - 6, gy - 1, K.k);
      const cola = Math.sin(t * 2.2) > 0.2 ? -1 : 0; rect(gx + 4, gy + 1, gx + 10, gy + 1, gs); pset(gx + 11, gy + cola, gs); pset(gx + 10, gy + cola, gc); }
    // motas de polvo en la luz de la vela
    for (let k = 0; k < 9; k++) { const x = Math.round(178 + h(k, 1, 427) * 44 + Math.sin(t * 0.5 + k) * 3), y = Math.round(80 + ((h(k, 2, 427) * 34 + t * (1.2 + h(k, 3, 427))) % 34)); if (Math.sin(t * 1.3 + k * 2) > -0.2) pset(x, 114 - (y - 80), hex('#f8dca0')); }
    // el resplandor de la vela sobre la pared y el reloj, que tiembla con la llama
    const vela = Math.max(0, Math.min(1, o.vela ?? 0)), fy = 122 - Math.round(15 - vela * 13) - 4, fl = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3 + 1) * 0.5;
    for (let y = Math.max(20, fy - 44); y < 117; y++) for (let x = d_VELA_XD - 50; x <= d_VELA_XD + 50; x++) { const d = Math.hypot(x - d_VELA_XD, (y - fy) * 1.15) / (44 + fl * 3); if (d < 1 && d_umD(x, y) < (1 - d) * 0.5) pset(x, y, d_mezD(R.pget(x, y), K.calido, 0.12 + 0.04 * fl)); }
  } else {
    // 1885: un rayo de luz gris de la ventana con motas, y los papeles del suelo que levanta la corriente
    for (let y = 80; y < 178; y++) { const a = 118 + (y - 80) * 0.5, b2 = 170 + (y - 80) * 0.75; for (let x = Math.round(a); x <= Math.round(b2); x++) if (d_umD(x, y) < 0.16 + 0.04 * Math.sin(t * 0.5) && (y > 120 || x > 0)) pset(x, y, d_mezD(R.pget(x, y), K.frio, 0.3)); }
    for (let k = 0; k < 14; k++) { const x = Math.round(130 + h(k, 1, 428) * 70 + (k % 2 ? 1 : -1) * Math.sin(t * 0.4 + k) * 5 + (h(k, 4, 428) - 0.5) * 20), y = Math.round(84 + ((h(k, 2, 428) * 60 + t * (1 + h(k, 3, 428))) % 60)); if (Math.sin(t + k) > -0.3) pset(x, y + 30, hex('#e8eef4')); }
    for (let k = 0; k < 3; k++) { const ph = (t * 0.18 + k / 3) % 1, x = Math.round(40 + ph * 190 + k * 20), y = Math.round(172 - Math.sin(ph * Math.PI) * 26 - k * 6), sk = Math.round(Math.sin(t * 6 + k) * 2);
      if (x > 236 && x < 288 && y < 128) continue; poligono([[x, y], [x + 7, y + sk], [x + 7, y + 3 + sk], [x, y + 3]], K.cera); pset(x + 2, y + 1, K.rayita); pset(x + 4, y + 1 + Math.round(sk / 2), K.rayita); }
  }
  // el ratón: asoma por su agujero, sale hasta una miga, vuelve corriendo
  { const ph = (t % 11) / 11; let mx = -1; if (ph > 0.15 && ph < 0.22) mx = 49; else if (ph >= 0.22 && ph < 0.45) mx = Math.round(49 + (ph - 0.22) / 0.23 * 16); else if (ph >= 0.45 && ph < 0.6) mx = 65; else if (ph >= 0.6 && ph < 0.68) mx = Math.round(65 - (ph - 0.6) / 0.08 * 16);
    if (!vacio) { pset(66, 122, K.cera); pset(67, 122, K.ceraS); }
    if (mx > 0) { const dir = ph >= 0.6 ? -1 : 1, my = mx === 49 ? 118 : 121, gris = d_alD(L, hex('#7a7480'), mx, my); rect(mx - 2, my - 1, mx + 2, my + 1, K.k); rect(mx - 1, my - 1, mx + 1, my, gris); pset(mx + dir * 3, my, K.k); pset(mx + dir * 2, my - 2, K.k); pset(mx + dir * 2, my - 1, hex('#e8a0a0'));
      if (mx > 50) linea(mx - dir * 3, my, mx - dir * 6, my - 1 + Math.round(Math.sin(t * 8)), K.k); } }
  // la mesa y lo que hay encima (las escenas la repiten por delante con cuartoDelante)
  d_calcaD(R, mesa, 100, 112, 236, 162); const v = d_cosasMesaD(R, t, o, vacio); if (v) geo.vela = v;
  return geo;
}

// lo que se ve por una ventana del cuarto, recortado a su hueco: 'noche' (cielo tramado, estrellas, luna, nubes de tres
// tonos a tres velocidades, las colinas de Lynchburg con tejados, chimeneas que humean, ventanas que se encienden y se
// apagan, un campanario y un murciélago) o 'gris' (tarde nublada de 1885, nubes que pasan y pájaros)
function d_ventanaD(R, t, x0, y0, x1, y1, modo) {
  const { pset, disco, linea, poligono } = R, K = d_colD; R.recorte([x0, y0, x1, y1]);
  const noche = modo === 'noche', hh = y1 - y0;
  for (let y = y0; y <= y1; y++) { const p = (y - y0) / hh; for (let x = x0; x <= x1; x++) { const u = d_umD(x, y);
    pset(x, y, noche ? (p < 0.3 ? K.n0 : p < 0.55 ? (u < (p - 0.3) * 4 ? K.n1 : K.n0) : u < (p - 0.55) * 2.4 ? K.n2 : K.n1) : (p < 0.35 ? K.dia0 : p < 0.65 ? (u < (p - 0.35) * 3.3 ? K.dia1 : K.dia0) : u < (p - 0.65) * 2.8 ? K.dia2 : K.dia1)); } }
  if (noche) {
    for (let k = 0; k < 22; k++) { const x = x0 + Math.round(h(k, 1, 430) * (x1 - x0)), y = y0 + 1 + Math.round(h(k, 2, 430) * hh * 0.5); const tw = Math.sin(t * (1.3 + h(k, 3, 430) * 2) + k * 2.1); if (tw > -0.4) pset(x, y, tw > 0.6 ? K.blanco : K.estrella); }
    const lx = x0 + 34, ly = y0 + 9; for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, j), d2 = Math.hypot(i - 2.4, j + 1); if (d <= 4.5 && d2 > 3.9) pset(lx + i, ly + j, d > 3.6 ? K.lunaS : K.luna); }
    for (let i = -8; i <= 8; i++) for (let j = -8; j <= 8; j++) { const d = Math.hypot(i, j); if (d > 5 && d < 8 && d_umD(lx + i, ly + j) < (8 - d) / 12) pset(lx + i, ly + j, K.n2); }
  } else { for (let k = 0; k < 2; k++) { const ph = (t * 0.07 + k * 0.5) % 1, bx = Math.round(x1 + 4 - ph * (x1 - x0 + 10)), by = y0 + 10 + k * 7 + Math.round(Math.sin(t * 2 + k) * 1), a = Math.sin(t * 9 + k) > 0; pset(bx, by, K.k); pset(bx - 1, by - (a ? 1 : 0), K.k); pset(bx + 1, by - (a ? 1 : 0), K.k); } }
  // las nubes, en tres capas a tres velocidades, cada una con sus tres tonos
  const NB = noche ? [K.nube0, K.nube1, K.nube2] : [K.nubeD0, K.nubeD1, K.nubeD2];
  for (let k = 0; k < 5; k++) { const v = [1.2, 2.1, 3.3][k % 3], w = 10 + (k % 3) * 4, span = x1 - x0 + w * 2 + 20, cx = Math.round(x0 - w + ((h(k, 1, 431) * span + t * v) % span)), cy = y0 + 6 + Math.round(h(k, 2, 431) * hh * 0.4);
    for (const [dx, dy, r] of [[-w * 0.4, 1, w * 0.3], [0, -1, w * 0.4], [w * 0.4, 1, w * 0.3]]) disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(r), NB[0]);
    for (const [dx, dy, r] of [[-w * 0.3, 0, w * 0.22], [w * 0.05, -2, w * 0.3]]) disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(r), NB[1]);
    disco(Math.round(cx), Math.round(cy - 3), Math.max(1, Math.round(w * 0.16)), NB[2]); linea(Math.round(cx - w * 0.6), cy + 3, Math.round(cx + w * 0.6), cy + 3, NB[0]); }
  // las colinas de Lynchburg: tejados a dos aguas con chimeneas que humean y ventanas; el campanario
  const tej = noche ? K.tejado : hex('#5a6270'), tejL = noche ? K.tejadoL : hex('#6e7684');
  for (let x = x0; x <= x1; x++) { const y = Math.round(y1 - 14 - 4 * Math.sin(x * 0.07) - 2 * Math.sin(x * 0.19 + 1)); for (let yy = y; yy <= y1; yy++) pset(x, yy, tej); }
  for (let k = 0; k < 6; k++) { const cx = x0 + 2 + k * 8, w = 6 + (k % 2) * 2, by = y1 - 8 - (k % 3) * 3; poligono([[cx - 1, by], [cx + w / 2, by - 4], [cx + w + 1, by]], tejL); for (let yy = by; yy <= y1; yy++) for (let xx = cx; xx <= cx + w; xx++) pset(xx, yy, tej);
    const on = h(k, Math.floor(t / 4 + k * 0.4), 432) < (noche ? 0.6 : 0.2); pset(cx + 2, by + 3, on ? K.ventanaL : K.ventanaA); pset(cx + 3, by + 3, on ? K.ventanaL : K.ventanaA); if (k % 2 === 0) { pset(cx + w - 1, by - 3, tej); pset(cx + w - 1, by - 4, tej);
      for (let j = 0; j < 3; j++) { const ph = (t * 0.35 + j / 3 + k * 0.2) % 1; pset(Math.round(cx + w - 1 + ph * 4 + Math.sin(ph * 6) * 0.8), Math.round(by - 5 - ph * 9), noche ? K.nube1 : K.nubeD1); } } }
  { const sx = x0 + 37, sy = y1 - 26; for (let yy = sy; yy <= y1; yy++) { pset(sx, yy, tej); pset(sx + 1, yy, tej); pset(sx + 2, yy, tej); } pset(sx + 1, sy - 1, tej); pset(sx + 1, sy - 2, tej); pset(sx + 1, sy - 3, tejL); pset(sx + 1, sy + 4, noche ? K.ventanaL : K.ventanaA); }
  if (noche) { const ph = (t * 0.11) % 1; if (ph < 0.5) { const bx = Math.round(x0 + ph * 2 * (x1 - x0)), by = y0 + 16 + Math.round(Math.sin(t * 5) * 2), a = Math.sin(t * 16) > 0; pset(bx, by, K.k); pset(bx - 1, by + (a ? -1 : 1), K.k); pset(bx + 1, by + (a ? -1 : 1), K.k); } }
  R.recorte(null);
}

// geometría: pared y 0–97 (ventana x 12–86 × 23–68, estante de libros x 226–316 en y 64), tablero de y 98 a 180; el
// amigo detrás de la mesa en x 92 con los pies en y 104 (asoman cabeza y hombros); el pergamino x 8–98, las tres hojas
// en x 132, 172 y 212 (y 142), el tintero en x 238, la vela en x 270 (base y 152), las formas luminosas centradas en
// (176, 56).
const d_VCX = 270, d_VCY = 152;

function d_mesaCercaCapaD(R, vacio) {
  return d_capaD(R, 'mesaCerca|' + vacio, () => {
    const { rect, pset, disco, poligono, linea } = R, B = R.buf, K = d_colD;
    // la pared: papel pintado (rayas y ramitos, más grandes porque estamos más cerca), moldura y friso
    for (let y = 0; y < 72; y++) for (let x = 0; x < 320; x++) { let c = (x % 12) === 0 ? K.papelR : (x % 12) === 1 ? K.papelF : K.papel; const fx = x % 24, fy = (y + (Math.floor(x / 24) % 2) * 9) % 18;
      if (fx >= 5 && fx <= 9 && fy >= 6 && fy <= 10 && (fx - 7) ** 2 + (fy - 8) ** 2 <= 3) c = (fx === 7 && fy === 8) ? K.colcha1 : K.papelF; if ((fx === 4 || fx === 10) && (fy === 11 || fy === 12)) c = K.papelH;
      const m = h(x >> 3, y >> 3, 440) * 0.6 + h(x >> 4, y >> 4, 441) * 0.4; if (m > 0.8 && d_umD(x, y) < (m - 0.8) * 6) c = K.mancha; B[y * 320 + x] = c; }
    rect(0, 70, 319, 74, K.frisoL); rect(0, 70, 319, 70, K.papelF); rect(0, 74, 319, 74, K.frisoS);
    for (let y = 75; y < 98; y++) for (let x = 0; x < 320; x++) { const r = x % 9; B[y * 320 + x] = r === 0 ? K.frisoS : r === 1 ? K.frisoL : h(x, y >> 2, 442) < 0.12 ? K.frisoS : K.friso; }
    // la ventana con su marco claro, el alféizar y el parteluz (el cielo, cada fotograma)
    rect(12, 23, 86, 68, K.k); rect(13, 24, 85, 67, K.cera); rect(13, 24, 85, 24, hex('#fff8e8')); rect(15, 26, 83, 66, K.ceraS); rect(8, 67, 90, 72, K.k); rect(9, 67, 89, 70, K.cera); rect(9, 67, 89, 67, hex('#fff8e8'));
    // el estante con libros de pie, una figurita de porcelana y un tarro (lejos de la esquina de Atom: empieza en y 50)
    rect(224, 64, 318, 68, K.k); rect(225, 64, 317, 66, K.mesa); rect(225, 64, 317, 64, K.mesaL); for (const x of [234, 308]) { rect(x, 68, x + 3, 74, K.k); rect(x + 1, 68, x + 2, 73, K.mesaS); }
    { const cols = [K.libro1, K.libro2, K.libro3, K.libro4, K.libro5, K.libro6]; let x = 228; for (let k = 0; x < 290; k++) { const w = 3 + Math.round(h(k, 1, 443) * 3), hh = 11 + Math.round(h(k, 2, 443) * 4), c = cols[k % 6];
      rect(x, 64 - hh, x + w, 63, K.k); rect(x + 1, 65 - hh, x + w - 1, 63, c); pset(x + 1, 67 - hh, K.dorado); rect(x + 1, 60 - Math.round(hh / 3), x + w - 1, 60 - Math.round(hh / 3), K.dorado); x += w + 1; } }
    rect(296, 54, 304, 63, K.k); rect(297, 55, 303, 63, hex('#5a7a8a')); rect(297, 55, 303, 56, hex('#8aaab8')); rect(296, 53, 304, 54, K.k);
    disco(312, 59, 3, K.k); disco(312, 59, 2, K.cera); disco(312, 55, 2, K.k); pset(312, 55, K.cera);
    // el tablero de cerca: tablas anchas, vetas, nudos, una mancha de tinta y una quemadura de vela
    for (let y = 98; y < 180; y++) { const f = 1 + (y - 98) / 60; for (let x = 0; x < 320; x++) { const u = (x - 160) / f + 160, tabla = Math.floor((y - 98) / (8 + (y - 98) * 0.25)); let c = h(tabla, 0, 444) < 0.35 ? K.mesaS : K.mesa;
      const veta = Math.sin(u * 0.05 + tabla * 3 + Math.sin(u * 0.013 + tabla) * 3 + y * 0.6); if (veta > 0.82) c = K.mesaS; else if (veta < -0.9) c = K.mesaL; if (h(Math.floor(u / 3), y, 445) > 0.93) c = K.mesaL;
      B[y * 320 + x] = c; } }
    for (let y = 98, k = 0; y < 180; k++) { const hh = Math.round(8 + (y - 98) * 0.25); rect(0, y, 319, y, K.junta); y += hh + 1; }
    rect(0, 98, 319, 99, K.k); rect(0, 100, 319, 100, K.mesaL);
    for (let k = 0; k < 4; k++) { const x = Math.round(30 + h(k, 1, 446) * 260), y = Math.round(110 + h(k, 2, 446) * 60); for (let j = -2; j <= 2; j++) for (let i = -4; i <= 4; i++) if ((i / 4) ** 2 + (j / 2) ** 2 < 1) pset(x + i, y + j, (i + j) % 2 ? K.mesaS : K.junta); }
    for (let j = -4; j <= 4; j++) for (let i = -8; i <= 8; i++) { const d = (i / 8) ** 2 + (j / 4) ** 2; if (d < 1 && d_umD(i + 100, j) < 1 - d) pset(112 + i, 168 + j, hex('#1a1a2a')); }   // la mancha de tinta
    rect(0, 176, 319, 179, K.mesaL); rect(0, 176, 319, 176, hex('#c08a50'));
    // la luz de la vela
    d_alumbraD(R, (x, y) => { const d = Math.hypot((x - d_VCX) * 0.8, (y - 120) * 1.1); return 1.3 + 3.9 * Math.exp(-d / 110) - (y < 6 ? 0.4 : 0); }, vacio ? d_colD.nocheV : d_colD.noche, d_colD.calido);
  });
}

// las formas luminosas que salen de la segunda hoja (o.letras 0–1): un chorro de cuadraditos de luz que dibujan en el
// aire el bosque, la cámara de piedra a seis pies bajo tierra y las tres ollas de hierro. Trazos de color fijo (se puede
// pintar dos veces sin que brille el doble).
function d_trazoD(R, pts, u, c, halo) {
  let total = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); total += l; }
  let quedan = total * Math.max(0, Math.min(1, u));
  for (let i = 1; i < pts.length && quedan > 0; i++) { const l = seg[i - 1], f = Math.min(1, quedan / l), [x0, y0] = pts[i - 1], x1 = x0 + (pts[i][0] - x0) * f, y1 = y0 + (pts[i][1] - y0) * f, n = Math.max(1, Math.ceil(l * f));
    for (let s = 0; s <= n; s++) { const x = Math.round(x0 + (x1 - x0) * s / n), y = Math.round(y0 + (y1 - y0) * s / n); if (halo) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (d_umD(x + dx, y + dy) < 0.5) R.pset(x + dx, y + dy, halo); }
    for (let s = 0; s <= n; s++) R.pset(Math.round(x0 + (x1 - x0) * s / n), Math.round(y0 + (y1 - y0) * s / n), c); quedan -= l; }
}

function d_visionD(R, t, u) {
  if (u <= 0) return; const L = d_colD.oroL, H = hex('#b88a2a'), O = hex('#ffd860'), tr = (a, b) => Math.max(0, Math.min(1, (u - a) / (b - a)));
  // el chorro: cuadraditos de luz que suben de la segunda hoja hasta el dibujo
  if (u < 0.97) for (let k = 0; k < 16; k++) { const ph = (t * 0.6 + k / 16) % 1, x = Math.round(172 + Math.sin(ph * 5 + k) * (6 + ph * 18) + (h(k, 1, 450) - 0.5) * 10), y = Math.round(136 - ph * 82); R.pset(x, y, ph < 0.7 ? L : O); if (ph < 0.6) { R.pset(x + 1, y, L); R.pset(x, y + 1, O); R.pset(x + 1, y + 1, H); } }
  // el suelo del bosque
  d_trazoD(R, [[124, 50], [228, 50]], tr(0.02, 0.14), L, H);
  // cinco árboles: tres robles redondos y dos pinos
  const arboles = [[132, 'p', 18], [150, 'r', 16], [196, 'r', 19], [214, 'p', 15], [230, 'r', 12]];
  arboles.forEach(([x, tipo, al], k) => { const v = tr(0.12 + k * 0.06, 0.24 + k * 0.06); if (v <= 0) return;
    d_trazoD(R, [[x, 50], [x, 50 - al * 0.45]], v * 2, L, H);
    if (tipo === 'p') d_trazoD(R, [[x - 7, 50 - al * 0.35], [x, 50 - al], [x + 7, 50 - al * 0.35], [x - 7, 50 - al * 0.35]], v * 1.4 - 0.4, L, H);
    else { const pts = []; for (let a = 0; a <= 24; a++) { const an = a / 24 * 6.283 + 1.57; pts.push([x + Math.cos(an) * 7.5, 50 - al * 0.6 + Math.sin(an) * 6.5]); } d_trazoD(R, pts, v * 1.4 - 0.4, L, H); } });
  // la cámara de piedra: un rectángulo de sillares, y la cota «6» (seis pies) con sus dos topes
  const vb = tr(0.42, 0.66); if (vb > 0) { d_trazoD(R, [[158, 64], [200, 64], [200, 90], [158, 90], [158, 64]], vb, L, H);
    if (vb > 0.6) { for (const y of [71, 78, 85]) d_trazoD(R, [[158, y], [200, y]], (vb - 0.6) / 0.4, O); for (let k = 0; k < 4; k++) for (const y of [64, 71, 78, 85]) R.pset(166 + k * 10 + ((y / 7) % 2 ? 5 : 0), y + 3, O); } }
  const vc = tr(0.5, 0.62); if (vc > 0) { d_trazoD(R, [[150, 51], [150, 64]], vc, O); if (vc >= 1) { R.linea(148, 51, 152, 51, O); R.linea(148, 64, 152, 64, O); d_cifrasD(R, '6', 142, 55, L); } }
  // las tres ollas de hierro, con su asa y su tapa, y el brillo del oro que asoma
  for (let k = 0; k < 3; k++) { const v = tr(0.66 + k * 0.08, 0.8 + k * 0.08); if (v <= 0) continue; const cx = 167 + k * 12, cy = 84, pts = [];
    for (let a = 0; a <= 20; a++) { const an = Math.PI + a / 20 * Math.PI; pts.push([cx + Math.cos(an) * -5, cy - 1 - Math.sin(an) * -4]); } pts.push([cx - 5, cy - 1]);
    d_trazoD(R, [[cx - 5, cy - 3], [cx + 5, cy - 3]], v * 3, L); d_trazoD(R, pts, v * 1.5 - 0.2, L, H);
    if (v >= 1) { const b = Math.sin(t * 5 + k * 2) > 0.3; R.pset(cx, cy - 4, b ? d_colD.blanco : O); if (b) { R.pset(cx - 1, cy - 4, O); R.pset(cx + 1, cy - 4, O); R.pset(cx, cy - 5, O); } } }
  // destellos sueltos alrededor del dibujo
  for (let k = 0; k < 10; k++) { const s = Math.sin(t * 3 + k * 1.9); if (s < 0.6) continue; const x = Math.round(124 + h(k, 1, 451) * 110), y = Math.round(26 + h(k, 2, 451) * 66); R.pset(x, y, L); if (s > 0.85) { R.pset(x - 1, y, H); R.pset(x + 1, y, H); R.pset(x, y - 1, H); R.pset(x, y + 1, H); } }
}

// lo de encima de la mesa de cerca: el pergamino grande, las tres hojas (d_hoja), papeles con cifras, las gafas, el
// tintero con la pluma, los libros y la vela grande con su llama y su resplandor
function d_mesaCercaCosasD(R, t, o) {
  const { rect, pset, poligono, linea, disco } = R, K = d_colD, vela = Math.max(0, Math.min(1, o.vela ?? 0)), B = R.buf, pg = o.pergamino === true ? 1 : Math.max(0, Math.min(1, +o.pergamino || 0));
  // un papel con cifras de verdad (las cuentas del amigo), abajo
  poligono([[96, 158], [138, 154], [142, 178], [100, 180]], K.ceraS); poligono([[96, 157], [137, 153], [141, 176], [99, 178]], K.cera);
  ['71', '194', '38', '1701', '89', '922'].forEach((s, j) => d_cifrasD(R, s, 102 + (j % 2) * 18, 160 + Math.floor(j / 2) * 6 - (j % 2), K.rayitaO));
  // el pergamino (la Declaración), con sus rodillos y sus renglones de rayitas; o un libro abierto si aún no ha llegado
  if (pg > 0) { const y0 = 108, y1 = Math.round(112 + pg * 44), x0 = 10, x1 = 96;
    poligono([[x0, y0], [x1, y0 + 2], [x1 + 2, y1 + 2], [x0 - 2, y1]], hex('#b89a64')); poligono([[x0, y0], [x1, y0 + 2], [x1, y1 + 1], [x0, y1 - 1]], hex('#ecdaa8'));
    for (let y = y0 + 4; y < y1 - 2; y++) for (let x = x0 + 2; x < x1 - 2; x++) if (d_umD(x, y) < 0.07 + h(x >> 3, y >> 3, 452) * 0.12) pset(x, y + Math.round((x - x0) / 43), hex('#d8c08a'));
    if (y1 - y0 > 14) rect(x0 + 18, y0 + 5, x1 - 18, y0 + 7, hex('#4a2e1a'));
    for (let y = y0 + 11, j = 0; y < y1 - 3; y += 3, j++) { let x = x0 + 4; while (x < x1 - 6) { const w = 2 + Math.floor(h(x, j, 453) * 5); for (let i = 0; i < w && x + i < x1 - 4; i++) pset(x + i, y + Math.round((x + i - x0) / 43), hex('#6a4a2e')); x += w + 2; } }
    if (pg > 0.95) for (let k = 0; k < 7; k++) linea(x0 + 10 + k * 11, y1 - 6, x0 + 16 + k * 11, y1 - 8 + (k % 2) * 2, hex('#4a2e1a'));   // las firmas, como garabatos
    for (const yr of [y0 - 2, y1 - 1]) { rect(x0 - 4, yr, x1 + 4, yr + 4, K.k); rect(x0 - 3, yr + 1, x1 + 3, yr + 3, hex('#d8c08a')); rect(x0 - 3, yr + 1, x1 + 3, yr + 1, hex('#f8ecc8')); disco(x0 - 4, yr + 2, 2, K.mesaS); disco(x1 + 4, yr + 2, 2, K.mesaS); } }
  else { poligono([[14, 118], [52, 112], [90, 118], [90, 146], [52, 142], [14, 146]], K.k); poligono([[15, 118], [51, 113], [51, 141], [15, 145]], K.cera); poligono([[53, 113], [89, 118], [89, 145], [53, 141]], K.ceraS);
    for (let j = 0; j < 9; j++) { linea(19, 121 + j * 3, 47, 117 + j * 3, K.rayita); linea(57, 117 + j * 3, 85, 121 + j * 3, K.rayita); } }
  // las tres hojas de Beale; la segunda se ilumina cuando salen las formas
  const le = Math.max(0, Math.min(1, o.letras ?? 0));
  [[132, 142, 1], [172, 140, 2], [212, 142, 3]].forEach(([x, y, n]) => { rect(x - 10, y + 15, x + 12, y + 17, d_mezD(K.mesaS, K.k, 0.5)); d_hoja(R, x, y, { n, brillo: n === 2 ? Math.min(1, le * 3) : 0 }); });
  // las gafas sobre la mesa
  for (const cx of [150, 162]) { disco(cx, 168, 4, K.k); disco(cx, 168, 3, d_mezD(K.mesa, K.frio, 0.3)); pset(cx - 1, 166, K.blanco); } linea(154, 167, 158, 167, K.k); linea(146, 167, 140, 164, K.k); linea(166, 167, 172, 164, K.k);
  // el tintero de cristal y la pluma de ave
  rect(230, 124, 246, 138, K.k); rect(231, 125, 245, 137, hex('#2a3a4a')); rect(231, 125, 245, 126, hex('#5a7a8a')); rect(236, 121, 240, 124, K.k); pset(233, 128, K.blanco); rect(232, 132, 244, 136, hex('#141428'));
  linea(239, 122, 254, 98, K.k); linea(240, 122, 255, 98, K.ceraS); for (let k = 0; k < 9; k++) { linea(252 - k * 1.5, 101 + k * 2.4, 256 - k * 1.5 + 3, 99 + k * 2.4, k % 2 ? K.cera : K.ceraS); }
  // los libros, apilados a la derecha (uno abierto boca abajo)
  for (const [y, w, c, d] of [[140, 34, K.libro2, 0], [133, 32, K.libro1, 2], [126, 33, K.libro4, -1]]) { const x = 286 + d; rect(x, y, x + w, y + 7, K.k); rect(x + 1, y + 1, x + w - 1, y + 6, c); rect(x + w - 5, y + 1, x + w - 1, y + 6, K.cera); for (let i = x + w - 5; i < x + w; i += 2) pset(i, y + 3, K.ceraS); pset(x + 4, y + 3, K.dorado); pset(x + 9, y + 3, K.dorado); }
  poligono([[284, 126], [300, 116], [318, 126]], K.k); poligono([[286, 125], [300, 118], [300, 125]], K.libro6); poligono([[300, 118], [316, 125], [300, 125]], d_mezD(K.libro6, K.k, 0.3));
  // LA VELA GRANDE: el platillo con su asa, la vela que se consume (de 44 a 6 px), los goterones, la llama y su luz
  const X = d_VCX, base = d_VCY, alto = Math.round(44 - vela * 38), top = base - alto;
  for (let j = -4; j <= 4; j++) for (let i = -26; i <= 26; i++) { const d = (i / 26) ** 2 + (j / 5) ** 2; if (d < 1 && d_umD(X + i, base + 8 + j) < (1 - d) * 0.7) pset(X + i, base + 8 + j, d_mezD(R.pget(X + i, base + 8 + j), K.k, 0.35)); }
  poligono([[X - 16, base + 2], [X + 16, base + 2], [X + 14, base + 7], [X - 14, base + 7]], K.k); poligono([[X - 15, base + 2], [X + 15, base + 2], [X + 13, base + 6], [X - 13, base + 6]], K.laton); rect(X - 14, base + 2, X + 14, base + 2, hex('#f8e080')); rect(X - 12, base + 5, X + 12, base + 6, K.latonS);
  disco(X + 19, base + 3, 4, K.k); disco(X + 19, base + 3, 2, R.pget(X + 25, base + 3)); rect(X - 5, base - 2, X + 5, base + 2, K.k); rect(X - 4, base - 1, X + 4, base + 1, K.laton); pset(X - 3, base - 1, hex('#f8e080'));
  rect(X - 4, top, X + 4, base - 2, K.k); rect(X - 3, top + 1, X + 3, base - 2, K.cera); rect(X + 2, top + 1, X + 3, base - 2, K.ceraS); rect(X - 3, top + 1, X - 2, base - 2, hex('#fffaf0'));
  if (alto > 8) { for (const [dx, l] of [[-4, 5 + Math.round(vela * 8)], [3, 9], [-1, 3]]) { rect(X + dx, top, X + dx + 1, Math.min(base - 2, top + l), K.cera); pset(X + dx, Math.min(base - 2, top + l) + 1, K.ceraS); } }
  if (vela > 0.6) { disco(X - 6, base, 2, K.cera); disco(X + 6, base + 1, 2, K.ceraS); }   // la cera derramada en el platillo
  rect(X - 3, top - 1, X + 3, top, K.ceraS); pset(X, top - 1, K.k); pset(X, top - 2, K.k);
  const fl = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3 + 1) * 0.5, ox = Math.round(Math.sin(t * 3.1) * 1), fy = top - 3, fh = 11 + Math.round(fl * 1.5);
  for (let j = 0; j < fh; j++) { const p = j / fh, w = p < 0.15 ? 1 : p < 0.55 ? 2 : p < 0.8 ? 1 : 0, xx = X + Math.round(ox * p * 1.5); rect(xx - w - 1, fy - j, xx + w + 1, fy - j, K.k); }
  for (let j = 0; j < fh - 1; j++) { const p = j / fh, w = p < 0.15 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 1 : 0, xx = X + Math.round(ox * p * 1.5); rect(xx - w, fy - j, xx + w, fy - j, p < 0.2 ? K.llamaN : p < 0.7 ? K.llama : K.blanco); }
  pset(X, fy, hex('#5a6ab8')); pset(X, fy - 1, hex('#8a8ad8'));
  // el resplandor alrededor de la llama (sobre la pared y el tablero), que tiembla
  const r0 = 30 + fl * 2, cy = fy - 5;
  for (let y = Math.round(cy - r0); y <= Math.round(cy + r0); y++) for (let x = Math.round(X - r0); x <= Math.round(X + r0); x++) { const d = Math.hypot(x - X, y - cy) / r0; if (d < 1 && d > 0.12 && d_umD(x, y) < (1 - d) * 0.42) { const c = R.pget(x, y); if (c !== K.k && c !== K.llama) pset(x, y, d_mezD(c, K.calido, 0.2)); } }
  return [X, fy - 6];
}

function d_mesaCercaD(R, t, o, delante) {
  const vacio = !!o.vacio, b = d_mesaCercaCapaD(R, vacio), le = Math.max(0, Math.min(1, o.letras ?? 0));
  const geo = { suelo: 104, amigo: [92, 104], hojas: [[132, 142], [172, 140], [212, 142]], tintero: [238, 124], vision: [176, 56], ventana: [16, 82, 27, 65] };
  if (delante) { R.buf.set(b.subarray(98 * 320), 98 * 320); geo.vela = d_mesaCercaCosasD(R, t, o); d_visionD(R, t, le); return geo; }
  R.copiar(b);
  d_ventanaD(R, t, 16, 27, 82, 65, vacio ? 'gris' : 'noche');
  const K = d_colD; R.rect(48, 27, 50, 65, K.k); R.rect(49, 27, 49, 65, K.cera); R.rect(16, 45, 82, 47, K.k); R.rect(16, 46, 82, 46, K.cera);
  for (let k = 0; k < 2; k++) for (let i = 0; i < 9; i++) if ((i + k) % 2) R.pset(22 + k * 34 + i, 43 - i, hex('#3a4068'));
  // las cortinas que se mecen
  const cort = vacio ? hex('#4a5260') : hex('#5a2226'), cortS = d_mezD(cort, K.k, 0.4), cortL = d_mezD(cort, K.cera, 0.2);
  R.rect(2, 21, 96, 22, K.latonS); for (let y = 23; y < 76; y++) { const w = 9 + Math.round(Math.sin(t * 0.8 + y * 0.07) * 1.3 + (y - 23) * 0.04), w2 = 8 + Math.round(Math.sin(t * 0.8 + 2 + y * 0.07));
    for (let x = 4; x <= 4 + w; x++) R.pset(x, y, (x - 4) % 5 === 1 ? cortL : (x - 4) % 5 === 3 ? cortS : cort); R.pset(4 + w, y, K.k); for (let x = 94 - w2; x <= 94; x++) R.pset(x, y, x % 5 === 1 ? cortL : x % 5 === 3 ? cortS : cort); R.pset(94 - w2, y, K.k); }
  // la sombra del amigo en la pared, que baila con la llama
  { const fl = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3 + 1) * 0.5, sx = 60 + Math.round(fl * 2); for (let y = 62; y < 98; y++) for (let x = sx - 14; x <= sx + 14; x++) { const d = y < 80 ? Math.hypot(x - sx, (y - 72) * 1.1) / 11 : Math.abs(x - sx) / (12 + (y - 80) * 0.4); if (d < 1 && d_umD(x, y) < 0.55) { const c = R.pget(x, y); R.pset(x, y, d_mezD(c, K.noche, 0.35)); } } }
  geo.vela = d_mesaCercaCosasD(R, t, o); d_visionD(R, t, le);
  return geo;
}

// geometría: pared de ladrillo encalado y 16–123, suelo desde y 124; el chibalete de tipos x 8–76; la puerta de atrás x
// 100–126 (y 62–124), por donde sale el humo; la prensa de mano en el centro (x 136–236, base y 148; la barra acaba en
// .palanca); la ventana a la calle x 248–304 (y 50–104) con el cartel del 50 ¢; el mostrador con los folletos x
// 240–316 (tablero y 114). Los folletos se secan colgados de dos cuerdas (y 26–48).
function d_imprentaCapaD(R) {
  return d_capaD(R, 'imprenta', () => {
    const { rect, pset, disco, poligono, linea } = R, B = R.buf, K = d_colD;
    // el techo con sus vigas
    for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (x % 40) < 7 ? (y > 12 ? K.frisoS : K.mesaS) : (x % 40 === 7 ? K.k : h(x >> 2, y >> 1, 460) < 0.2 ? K.techoS : K.techo);
    rect(0, 14, 319, 16, K.frisoS); rect(0, 14, 319, 14, K.mesaS);
    // el ladrillo encalado, con la cal que se cae a trozos
    for (let y = 17; y < 124; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 17) / 5), off = (fila % 2) * 5, jy = (y - 17) % 5 === 4, jx = (x + off) % 10 === 9, lad = Math.floor((x + off) / 10);
      const cal = 0.42 + 0.22 * Math.sin(x * 0.045 + Math.sin(y * 0.07) * 2) * Math.sin(y * 0.06 + x * 0.013) + 0.16 * Math.sin(x * 0.11 + y * 0.05 + 1) + h(x >> 1, y >> 1, 461) * 0.12 - (y > 100 ? 0.2 : 0); let c;
      if (cal > 0.52) c = jy || jx ? K.calS : (h(x, y, 463) < 0.06 ? K.calS : K.cal); else c = jy || jx ? K.ladrS : h(lad, fila, 464) < 0.25 ? K.ladrS : h(lad, fila, 465) > 0.8 ? K.ladrL : K.ladr;
      if (cal > 0.5 && cal <= 0.52) c = K.calS; B[y * 320 + x] = c; }
    rect(0, 118, 319, 123, K.frisoS); rect(0, 118, 319, 118, K.frisoL);
    // los postes de madera
    for (const x of [86, 236]) { rect(x, 16, x + 6, 123, K.k); rect(x + 1, 16, x + 5, 123, K.mesaS); rect(x + 1, 16, x + 2, 123, K.mesa); }
    // el suelo de tablas, con manchas de tinta, recortes y algún tipo caído
    for (let y = 124; y < 180; y++) { const f = (y + 70) / 250; for (let x = 0; x < 320; x++) { const u = (x - 160) / f + 160, tabla = Math.floor(u / 18), fr = u / 18 - tabla;
      let c = h(tabla, 2, 466) < 0.3 ? K.sueloS : K.suelo; if (h(Math.floor(u / 3), y >> 1, 467) < 0.18) c = K.sueloS; if (fr * 18 * f < 1) c = K.junta; B[y * 320 + x] = c; } }
    rect(0, 124, 319, 124, K.junta);
    for (let k = 0; k < 9; k++) { const x = Math.round(20 + h(k, 1, 468) * 280), y = Math.round(130 + h(k, 2, 468) * 46), r = 2 + Math.round(h(k, 3, 468) * 3); for (let j = -r; j <= r; j++) for (let i = -r * 2; i <= r * 2; i++) { const d = (i / (r * 2)) ** 2 + (j / r) ** 2; if (d < 1 && (d < 0.6 || d_umD(x + i, y + j) < 0.5)) pset(x + i, y + j, d < 0.6 ? hex('#1c1a22') : hex('#3a2a22')); } }
    for (let k = 0; k < 14; k++) { const x = Math.round(10 + h(k, 4, 468) * 300), y = Math.round(128 + h(k, 5, 468) * 50); rect(x, y, x + 3, y + 1, k % 3 ? K.resma : K.amar); }
    for (let k = 0; k < 8; k++) pset(Math.round(130 + h(k, 6, 468) * 110), Math.round(150 + h(k, 7, 468) * 26), K.tipo);
    // ── el chibalete: las cajas de tipos inclinadas con sus cajetines y la cajonera
    rect(6, 88, 78, 123, K.k); rect(7, 89, 77, 123, K.mesaS); for (let y = 92; y < 122; y += 6) { rect(9, y, 75, y + 4, K.mesa); rect(9, y, 75, y, K.mesaL); for (const x of [22, 42, 62]) { rect(x - 2, y + 2, x + 2, y + 2, K.k); pset(x, y + 1, K.laton); } }
    poligono([[4, 88], [80, 88], [76, 70], [8, 70]], K.k); poligono([[5, 87], [79, 87], [75, 71], [9, 71]], K.mesa);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 14; i++) { const y = 72 + j * 4, x = 10 + i * 5 - Math.round((3 - j) * 0.3); rect(x, y, x + 3, y + 2, hex('#2a1c12')); if (h(i, j, 469) < 0.85) { pset(x + 1, y + 1, K.tipo); pset(x + 2, y + 2, K.tipoS); if (h(i, j, 470) < 0.5) pset(x + 2, y + 1, K.tipo); } }
    rect(4, 86, 80, 88, K.mesaL);
    linea(14, 69, 30, 67, K.k); rect(14, 66, 30, 68, K.hierroL); rect(16, 66, 26, 67, K.tipo);   // el componedor con tipos
    // la balda con latas de tinta y un tarro
    rect(6, 52, 80, 55, K.k); rect(7, 52, 79, 53, K.mesa); for (const x of [14, 70]) { linea(x, 55, x + 6, 60, K.k); }
    for (const [x, c] of [[10, hex('#1c1c24')], [22, hex('#8a2a2a')], [34, hex('#1c1c24')], [46, hex('#2a4a7a')]]) { rect(x, 42, x + 9, 52, K.k); rect(x + 1, 43, x + 8, 51, K.hierroL); rect(x + 1, 46, x + 8, 49, c); rect(x + 1, 43, x + 8, 43, K.blanco); }
    rect(60, 44, 70, 52, K.k); rect(61, 45, 69, 51, hex('#6a8a7a')); rect(61, 45, 62, 51, hex('#9ab8a8')); rect(60, 42, 70, 44, K.k);
    // ── la puerta de atrás, entornada
    rect(98, 60, 128, 124, K.k); rect(100, 62, 126, 123, hex('#120c0c')); rect(101, 62, 122, 123, K.friso); for (let x = 101; x < 122; x += 5) rect(x, 62, x, 123, K.frisoS);
    for (const y of [72, 108]) { rect(101, y, 122, y + 3, K.frisoL); rect(101, y + 3, 122, y + 3, K.frisoS); } linea(101, 104, 122, 76, K.frisoL); disco(119, 92, 1, K.laton);
    // el cartel de pared (sin letras: barras y un dibujo de una prensa) y el almanaque con el año
    rect(140, 52, 172, 84, K.k); rect(141, 53, 171, 83, K.resma); rect(143, 55, 169, 59, hex('#2a2a3a')); for (let y = 62; y < 70; y += 3) rect(144, y, 168 - ((y >> 1) % 3) * 4, y, K.rayita);
    rect(150, 71, 162, 80, K.k); rect(152, 72, 160, 75, hex('#4a4a5a')); rect(151, 78, 161, 79, hex('#4a4a5a')); rect(155, 70, 157, 72, hex('#4a4a5a'));
    rect(178, 54, 198, 78, K.k); rect(179, 55, 197, 77, K.blanco); rect(179, 55, 197, 59, hex('#a83a2a')); d_cifrasD(R, '1885', 180, 61, K.rayitaO); for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) pset(181 + i * 3, 69 + j * 3, (i + j) % 5 === 2 ? hex('#a83a2a') : K.rayita);
    // el reloj
    disco(222, 70, 7, K.k); disco(222, 70, 6, K.mesa); disco(222, 70, 5, K.cera); for (let k = 0; k < 12; k++) pset(Math.round(222 + Math.cos(k / 12 * 6.283) * 4), Math.round(70 + Math.sin(k / 12 * 6.283) * 4), K.k);
    // ── la ventana a la calle (el hueco y 52–102 lo pinta cada fotograma) con el mostrador debajo
    rect(244, 46, 308, 108, K.k); rect(245, 47, 307, 107, hex('#3a5a4a')); rect(245, 47, 307, 48, hex('#5a7a6a')); rect(247, 49, 305, 105, K.k);
    rect(240, 104, 312, 108, K.k); rect(241, 104, 311, 106, hex('#4a6a5a')); rect(241, 104, 311, 104, hex('#6a8a7a'));
    rect(238, 112, 316, 140, K.k); rect(239, 113, 315, 116, K.mesaL); rect(239, 117, 315, 139, K.mesa); for (let x = 244; x < 314; x += 18) { rect(x, 120, x + 14, 136, K.mesaS); rect(x + 1, 121, x + 13, 135, K.mesa); rect(x + 1, 121, x + 13, 121, K.mesaL); }
    rect(239, 113, 315, 113, hex('#d8a060'));
    // la tinta: la mesa de entintar con la losa, el rodillo y la tinta brillante
    rect(108, 116, 136, 120, K.k); rect(109, 116, 135, 118, hex('#5a5a62')); rect(109, 116, 135, 116, hex('#8a8a94')); for (const x of [110, 132]) rect(x, 120, x + 2, 140, K.k);
    for (let i = 0; i < 14; i++) pset(112 + i, 117, i % 3 ? hex('#1a1a22') : hex('#4a4a5a'));
    rect(118, 111, 130, 114, K.k); rect(119, 112, 129, 113, hex('#2a2a32')); linea(124, 111, 124, 106, K.k); rect(122, 104, 126, 106, K.mesa);
    // la sombra de la prensa en el suelo
    for (let y = 140; y < 156; y++) for (let x = 130; x < 244; x++) { const d = ((x - 186) / 56) ** 2 + ((y - 148) / 7) ** 2; if (d < 1 && d_umD(x, y) < (1 - d) * 1.3) pset(x, y, d_mezD(R.pget(x, y), K.junta, 0.5)); }
    // la luz del día por la ventana
    d_alumbraD(R, (x, y) => { const d = Math.hypot((x - 276) * 0.8, (y - 90) * 1.1); return 1.9 + 3 * Math.exp(-d / 120) - (y < 16 ? 0.6 : 0) - (x < 6 ? 0.3 : 0); }, hex('#1e1612'), hex('#fff0c8'));
  });
}

// la prensa de mano de hierro (de tipo Washington): patas, carriles, las dos columnas, la corona con su remate, el husillo,
// la platina, el carro con la forma de tipos, el tímpano levantado con un folleto, la manivela y la barra (u: 0 en
// reposo, 1 apretada). Devuelve la empuñadura [x, y].
function d_prensaD(R, t, u) {
  const { rect, pset, disco, poligono, linea } = R, K = d_colD, F = K.hierroP, FL = K.hierroPL, FS = K.hierroPS;
  // patas y carriles
  for (const x of [140, 230]) { rect(x - 2, 132, x + 3, 148, K.k); rect(x - 1, 132, x + 2, 147, F); rect(x - 1, 132, x - 1, 147, FL); rect(x - 3, 146, x + 4, 148, K.k); }
  rect(134, 130, 238, 135, K.k); rect(135, 131, 237, 133, F); rect(135, 131, 237, 131, FL);
  // el carro con la forma de tipos (y el folleto entintado encima, cuando la prensa aprieta)
  rect(150, 125, 222, 130, K.k); rect(151, 126, 221, 129, hex('#3a3e4a')); for (let x = 154; x < 196; x += 2) pset(x, 127, K.tipo);
  // las columnas y la corona arqueada con su remate
  for (const x of [166, 202]) { rect(x - 3, 96, x + 3, 130, K.k); rect(x - 2, 97, x + 2, 129, F); rect(x - 2, 97, x - 1, 129, FL); rect(x + 2, 97, x + 2, 129, FS); for (const y of [104, 120]) { rect(x - 4, y, x + 4, y + 2, K.k); rect(x - 3, y, x + 3, y + 1, FL); } }
  poligono([[160, 98], [208, 98], [204, 90], [196, 86], [172, 86], [164, 90]], K.k); poligono([[162, 97], [206, 97], [203, 91], [195, 87], [173, 87], [165, 91]], F); linea(165, 91, 173, 87, FL); linea(173, 87, 195, 87, FL);
  disco(184, 84, 3, K.k); disco(184, 84, 2, K.laton); pset(183, 83, K.oroL); disco(184, 92, 2, K.laton);
  // el husillo con la rodillera, y la platina que baja al apretar
  const baja = Math.round(u * 4); rect(182, 98, 186, 104 + baja, K.k); rect(183, 98, 185, 104 + baja, FL);
  rect(170, 104 + baja, 198, 109 + baja, K.k); rect(171, 105 + baja, 197, 108 + baja, F); rect(171, 105 + baja, 197, 105 + baja, FL);
  // el tímpano levantado, a la izquierda, con un folleto amarillo sujeto
  poligono([[150, 126], [146, 104], [156, 100], [160, 124]], K.k); poligono([[151, 124], [148, 105], [155, 102], [158, 123]], hex('#c8c0a8')); poligono([[151, 120], [149, 108], [154, 106], [156, 118]], K.amar); linea(150, 112, 154, 110, K.amarS);
  // la manivela delantera
  disco(228, 128, 4, K.k); disco(228, 128, 3, FL); disco(228, 128, 1, K.k); const ma = t * 0.5; linea(228, 128, Math.round(228 + Math.cos(ma) * 5), Math.round(128 + Math.sin(ma) * 5), K.mesa);
  // la barra: sale de la columna derecha y acaba en la empuñadura de madera
  const gx = Math.round(226 - u * 4), gy = Math.round(110 + u * 10); linea(203, 106, gx, gy, K.k); linea(203, 107, gx, gy + 1, K.k); linea(204, 106, gx - 1, gy, FL); rect(gx - 1, gy - 2, gx + 3, gy + 2, K.k); rect(gx, gy - 1, gx + 2, gy + 1, K.mesaL);
  return [gx + 1, gy];
}

// los folletos colgados a secar de dos cuerdas, que se mecen (lejos del año y de la esquina de Atom)
function d_cuerdasD(R, t, L) {
  const { pset, rect, linea } = R, K = d_colD;
  for (const [xa, ya, xb, yb, sag, n, k0] of [[20, 24, 270, 22, 7, 12, 0], [96, 38, 232, 40, 5, 7, 20]]) {
    const yAt = (x) => ya + (yb - ya) * (x - xa) / (xb - xa) + sag * Math.sin(Math.PI * (x - xa) / (xb - xa));
    for (let x = xa; x <= xb; x++) pset(x, Math.round(yAt(x)), d_alD(L, hex('#d8ccb0'), x, Math.round(yAt(x))));
    for (const x of [xa, xb]) { rect(x - 1, Math.round(yAt(x)) - 1, x + 1, Math.round(yAt(x)) + 1, K.k); }
    for (let k = 0; k < n; k++) { const x = Math.round(xa + 10 + k * (xb - xa - 20) / (n - 1)), y = Math.round(yAt(x)), sw = Math.round(Math.sin(t * 1.4 + k * 0.9 + k0) * 1.2), w = 7, hh = 9;
      for (let j = 0; j <= hh; j++) { const dx = Math.round(sw * j / hh); for (let i = 0; i <= w; i++) { const c = i === 0 || i === w || j === hh ? K.k : j === 0 ? K.amarL : (i === 1 ? K.amarL : (j === 3 || j === 5 || j === 7) && i > 1 && i < w - 1 && h(i, j + k, 471) < 0.75 ? K.amarS : K.amar); pset(x - 3 + i + dx, y + 1 + j, d_alD(L, c, x, y + 4)); } }
      pset(x, y, K.k); pset(x, y - 1, d_alD(L, hex('#9a8a6a'), x, y)); }   // la pinza
  }
}

// lo que se ve por la ventana de la imprenta, recortado al hueco: el cielo de 1885 con nubes, la fachada de enfrente,
// la acera de tablas, gente pequeña que pasa y un carro de caballo; delante, en el cristal, el cartel del 50 ¢
function d_calleImprentaD(R, t) {
  const { pset, disco } = R, K = d_colD, x0 = 248, y0 = 50, x1 = 304, y1 = 103; R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const p = (y - y0) / 14; pset(x, y, p < 0.5 ? hex('#7ab4e4') : d_umD(x, y) < p - 0.5 ? hex('#a8d0f0') : hex('#7ab4e4')); }
  for (let k = 0; k < 3; k++) { const v = [2, 3.4, 5][k], span = 90, cx = Math.round(x0 - 15 + ((h(k, 1, 472) * span + t * v) % span)), cy = y0 + 3 + k * 3;
    disco(cx, cy + 1, 4, hex('#c8e0f4')); disco(cx + 4, cy, 4, hex('#e8f4fc')); disco(cx + 2, cy - 1, 2, hex('#ffffff')); }
  // la fachada de enfrente: ladrillo con ventanas y un toldo a rayas
  for (let y = y0 + 12; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y % 4 === 0 || (x + (y >> 2) * 3) % 8 === 0) ? hex('#7a4a3a') : hex('#a86a52'));
  for (const wx of [252, 270, 288]) { for (let y = y0 + 16; y < y0 + 28; y++) for (let x = wx; x < wx + 9; x++) pset(x, y, y === y0 + 16 || x === wx ? hex('#e8dcc4') : (x === wx + 4 || y === y0 + 22) ? hex('#e8dcc4') : hex('#3a4a5a')); }
  for (let x = x0; x <= x1; x++) for (let y = y0 + 31; y < y0 + 35; y++) pset(x, y, ((x >> 2) % 2) ? hex('#c83a3a') : hex('#f0e8d8'));
  for (let y = y0 + 44; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y < y0 + 47 ? hex('#a8946a') : (x + y) % 7 === 0 ? hex('#7a6a4a') : hex('#8a7a5a'));
  // gente pequeña que pasa por la acera
  for (let k = 0; k < 3; k++) { const v = 6 + k * 2.5, dir = k % 2 ? -1 : 1, span = 90, ph = (t * v + k * 37) % span, px = Math.round(dir > 0 ? x0 - 15 + ph : x1 + 15 - ph), py = y0 + 46, paso = Math.floor(t * 5 + k) % 2, ropa = [hex('#3a3a4a'), hex('#6a3a5a'), hex('#4a5a3a')][k];
    for (let j = -10; j <= 0; j++) for (let i = 0; i < 3; i++) pset(px + i, py + j, j < -7 ? (j < -9 ? hex('#2a2a2a') : hex('#e8b890')) : ropa); pset(px - 1, py - 10, hex('#2a2a2a')); pset(px + 3, py - 10, hex('#2a2a2a')); pset(px + (paso ? 0 : 2), py + 1, hex('#1a1a1a')); }
  // el carro de caballo que pasa de vez en cuando
  { const ph = (t * 9) % 160, cx = Math.round(x1 + 30 - ph); if (cx > x0 - 30 && cx < x1 + 30) { const py = y0 + 50, pa = Math.floor(t * 6) % 2;
    for (let j = -8; j <= -3; j++) for (let i = 0; i < 10; i++) pset(cx + i, py + j, j === -8 ? hex('#4a2a1a') : hex('#7a4a2a')); for (let i = -2; i < 3; i++) pset(cx + i - 3, py - 7 + Math.abs(i), hex('#5a3a2a'));
    for (const wx of [cx + 12, cx + 20]) { disco(wx, py - 2, 3, hex('#2a1a12')); pset(wx, py - 2, hex('#a87a4a')); }
    for (let j = -10; j <= -1; j++) for (let i = 10; i < 24; i++) pset(cx + i, py + j, j < -7 ? hex('#3a2a1a') : hex('#8a6a3a')); } }
  R.recorte(null);
  // los parteluces y el cartel apoyado en el cristal: «50 ¢» en cifras grandes
  R.rect(275, 50, 277, 103, K.k); R.rect(248, 76, 304, 77, K.k); R.rect(276, 50, 276, 103, hex('#4a6a5a'));
  for (let i = 0; i < 6; i++) pset(252 + i, 70 - i, hex('#d8ecf8')); for (let i = 0; i < 4; i++) pset(284 + i, 66 - i, hex('#d8ecf8'));
  R.rect(256, 82, 290, 103, K.k); R.rect(257, 83, 289, 102, K.blanco); R.rect(257, 83, 289, 84, hex('#c83a3a'));
  const g = (s, x, y) => { for (const ch of s) { const m = d_DIGD[ch.charCodeAt(0) - 48]; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (m[j * 3 + i] === '1') R.rect(x + i * 2, y + j * 2, x + i * 2 + 1, y + j * 2 + 1, hex('#1c1a2a')); x += 8; } };
  g('50', 261, 88); for (const [i, j] of [[1, 0], [1, 1], [0, 2], [1, 2], [2, 2], [0, 3], [0, 4], [1, 4], [2, 4], [1, 5], [1, 6]]) R.rect(279 + i * 2, 86 + j * 2, 280 + i * 2, 87 + j * 2, hex('#c83a3a'));
}

function d_imprentaD(R, t, o) {
  const K = d_colD, { pset, rect, disco, linea } = R, b = d_imprentaCapaD(R), humo = Math.max(0, Math.min(1, o.humo ?? 0));
  R.copiar(b);
  d_calleImprentaD(R, t);
  // el rayo de sol de la ventana sobre el suelo, con motas
  for (let y = 108; y < 180; y++) { const a = 246 - (y - 108) * 1.1, b2 = 306 - (y - 108) * 0.7; for (let x = Math.max(0, Math.round(a)); x <= Math.min(319, Math.round(b2)); x++) if ((y > 124 || x < 238) && d_umD(x, y) < 0.22) pset(x, y, d_mezD(R.pget(x, y), hex('#fff0c0'), 0.28)); }
  for (let k = 0; k < 12; k++) { const x = Math.round(200 + h(k, 1, 473) * 90 + Math.sin(t * 0.5 + k) * 4), y = Math.round(100 + ((h(k, 2, 473) * 60 + t * (1.5 + h(k, 3, 473))) % 60)); if (Math.sin(t * 1.3 + k * 2) > -0.2) pset(x - Math.round((y - 100) * 0.9), y, hex('#fff4d8')); }
  // el reloj: la aguja de los minutos que avanza
  linea(222, 70, Math.round(222 + Math.sin(t * 0.3) * 4), Math.round(70 - Math.cos(t * 0.3) * 4), K.k); pset(222, 69, K.k);
  // el folleto del tímpano y los que se secan
  const L = null;
  d_cuerdasD(R, t, L);
  // la prensa: si o.imprime (por omisión sí), la barra aprieta cada 3 s; o.prensa 0–1 la fija
  const u = o.prensa ?? (o.imprime === false ? 0 : Math.max(0, Math.sin((t % 3) / 3 * Math.PI * 2 - 1.2)) ** 0.6);
  const palanca = d_prensaD(R, t, u);
  // EL HUMO (o.humo 0–1): el resplandor naranja en la rendija de la puerta de atrás, en el suelo y bocanadas que suben
  if (humo > 0) {
    const fl = 0.6 + 0.4 * Math.sin(t * 9) * Math.sin(t * 5.3 + 1);
    for (let y = 63; y < 123; y++) for (let x = 122; x <= 125; x++) if (d_umD(x, y) < humo * fl * (x === 123 || x === 124 ? 1 : 0.5)) pset(x, y, y % 7 === 0 ? K.brasaL : K.naranjaH);
    for (let y = 124; y < 150; y++) for (let x = 96; x < 150; x++) { const d = Math.hypot((x - 123) / 26, (y - 124) / 22); if (d < 1 && d_umD(x, y) < (1 - d) * humo * 0.5 * fl) pset(x, y, d_mezD(R.pget(x, y), K.naranjaH, 0.3)); }
    const n = Math.round(4 + humo * 14);
    for (let k = 0; k < n; k++) { const ph = (t * (0.11 + 0.03 * (k % 3)) + k / n) % 1, x0 = k % 3 === 0 ? 124 : 112 + (k % 4) * 4, y0 = k % 3 === 0 ? 66 + (k % 5) * 10 : 62,
      x = x0 - ph * (40 + (k % 5) * 14) + Math.sin(ph * 6 + k) * 6, y = y0 - ph * (y0 - 20), r = 4 + ph * (8 + humo * 8); if (y < 18) continue;
      for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r, px = Math.round(x + i), py = Math.round(y + j); if (d < 1 && py >= 17 && !(px < 48 && py < 23) && !(px > 270 && py < 46) && d_umD(px, py) < Math.min(0.95, (1.3 - d) * (1 - ph * 0.45) * (0.45 + humo * 0.7))) pset(px, py, d < 0.4 ? K.humo2 : d < 0.75 ? K.humo1 : K.humo0); } }
    if (humo > 0.4) for (let y = 17; y < 40; y++) for (let x = (y < 23 ? 50 : 20); x < 270; x++) { const a = (humo - 0.4) / 0.6 * (1 - (y - 17) / 23) * (0.6 + 0.4 * Math.sin(x * 0.05 + t * 0.8 + y * 0.2)); if (d_umD(x, y) < a * 1.1) pset(x, y, (x + y) % 3 ? K.humo1 : K.humo0); }
    // una pavesa que sale volando
    for (let k = 0; k < 3; k++) { const ph = (t * 0.4 + k / 3) % 1; pset(Math.round(124 - ph * 20 + Math.sin(ph * 9) * 3), Math.round(80 - ph * 50), ph < 0.5 ? K.brasaL : K.brasa); }
  }
  return { suelo: 150, libre: [40, 236], palanca, puesto: [222, 148], prensa: [136, 236, 84, 148], puerta: [100, 126, 62, 124], ventana: [248, 304, 50, 103], cartel: [273, 92], mostrador: [240, 316, 114], tinta: [108, 136, 116] };
}

// por delante de la imprenta: las resmas envueltas con el gato que duerme encima (abajo a la izquierda) y la pila de
// folletos atados con cordel (abajo a la derecha)
function d_imprentaDelanteD(R, t, o) {
  const { rect, pset, disco, linea } = R, K = d_colD;
  for (let k = 0; k < 4; k++) { const y = 176 - k * 9, x0 = -2 + (k % 2) * 2, x1 = 34 - (k % 2) * 3; rect(x0, y - 9, x1, y, K.k); rect(x0 + 1, y - 8, x1 - 1, y - 1, k % 2 ? hex('#a8845a') : K.resma); rect(x0 + 1, y - 8, x1 - 1, y - 8, k % 2 ? hex('#c8a47a') : K.blanco); if (k % 2 === 0) for (let x = x0 + 2; x < x1 - 1; x += 2) pset(x, y - 3, K.resmaS); else { rect(x0 + 14, y - 8, x0 + 16, y - 1, hex('#7a5a3a')); } }
  // el gato negro, enroscado, que levanta la cabeza de vez en cuando y mueve la cola
  { const gx = 16, gy = 136, mira = Math.sin(t * 0.7) > 0.7, r = Math.sin(t * 1.6) > 0.3 ? 1 : 0, c = hex('#8a8a96'), cl = hex('#5a5a66');
    for (let j = -7; j <= 1; j++) for (let i = -10; i <= 10; i++) if ((i / 10) ** 2 + (j / (7 + r)) ** 2 < 1) pset(gx + i, gy + j, K.k); for (let j = -6; j <= 0; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + (j / (6 + r)) ** 2 < 1) pset(gx + i, gy + j, (i + j) % 5 === 0 ? cl : c);
    rect(gx - 10, gy + 1, gx + 10, gy + 1, K.k); const hx = gx - 7, hy = mira ? gy - 7 : gy - 3; disco(hx, hy, 3, K.k); disco(hx, hy, 2, c); pset(hx - 2, hy - 3, K.k); pset(hx + 1, hy - 3, K.k); pset(hx - 2, hy - 2, c); pset(hx + 1, hy - 2, c); pset(hx, hy + 1, K.blanco); pset(hx - 1, hy + 1, K.blanco);
    if (mira) { pset(hx - 1, hy, hex('#7ab83a')); pset(hx + 1, hy, hex('#7ab83a')); } else { pset(hx - 1, hy, K.k); pset(hx + 1, hy, K.k); } const cola = Math.round(Math.sin(t * 2.4) * 2); linea(gx + 8, gy, gx + 13, gy + 3 + cola, c); pset(gx + 13, gy + 3 + cola, cl); }
  // los folletos atados
  for (let k = 0; k < 6; k++) { const y = 178 - k * 4, x0 = 290 + (k % 2), x1 = 320; rect(x0, y - 4, x1, y, K.k); rect(x0 + 1, y - 3, x1, y - 1, K.amar); rect(x0 + 1, y - 3, x1, y - 3, K.amarL); }
  rect(304, 154, 305, 179, hex('#8a6a3a')); rect(292, 164, 320, 164, hex('#8a6a3a')); pset(303, 153, hex('#8a6a3a')); pset(306, 153, hex('#8a6a3a'));
  return {};
}

// un periódico abierto sobre una mesa (x 50–252, y 18–172): la cabecera como manchas negras (sin letras), el año en
// cifras, columnas de rayitas con sus titulares, dos grabados (un tren y un edificio) y EL HUECO vacío donde no está la
// noticia del incendio (x 138–172, y 62–104; o.hueco 0–1 lo marca con un recuadro de trazos que late y una «?»). Alrededor:
// la lupa, las gafas, la taza que humea, un lápiz y migas de tabaco, con la luz de un quinqué que no se ve. Devuelve { hueco: [x, y], diario }.
function d_periodicoCapaD(R) {
  return d_capaD(R, 'periodico', () => {
    const { rect, pset, disco, poligono, linea } = R, B = R.buf, K = d_colD;
    // la mesa de cerca: tablas anchas con vetas
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 30); let c = h(tabla, 0, 480) < 0.4 ? K.mesaS : K.mesa; const v = Math.sin(x * 0.04 + tabla * 2 + Math.sin(x * 0.011 + tabla * 5) * 4 + y * 0.5); if (v > 0.85) c = K.mesaS; else if (v < -0.92) c = K.mesaL; if (y % 30 === 0) c = K.junta; B[y * 320 + x] = c; }
    // la sombra del papel y el papel, con su doblez
    for (let y = 22; y < 176; y++) for (let x = 54; x < 257; x++) if (d_umD(x, y) < 0.7) pset(x, y, d_mezD(R.pget(x, y), K.k, 0.5));
    rect(50, 18, 252, 172, K.diarioS); rect(50, 18, 251, 171, K.diario); for (let k = 0; k < 220; k++) pset(52 + Math.round(h(k, 1, 481) * 196), 20 + Math.round(h(k, 2, 481) * 150), K.diarioS);
    for (let x = 50; x < 252; x++) { pset(x, 98, K.diarioS); pset(x, 99, hex('#f2ead6')); }
    // la cabecera: manchas negras con remates (se lee «un nombre», nunca letras) y dos filetes
    let x = 72; for (let k = 0; x < 230; k++) { const w = 4 + Math.round(h(k, 1, 482) * 4), top = 26 + (h(k, 2, 482) < 0.25 ? -2 : 0); if (h(k, 3, 482) < 0.15) { x += 5; continue; }
      rect(x, top, x + w, 37, K.rayitaO); if (h(k, 4, 482) < 0.4) rect(x + 2, top + 3, x + w - 2, top + 4, K.diarioS); pset(x + Math.round(w / 2), 36, K.diario); pset(x - 1, 37, K.rayitaO); pset(x + w + 1, top, K.rayitaO); x += w + 2; }
    rect(56, 41, 246, 41, K.rayitaO); rect(56, 43, 246, 43, K.rayitaO); d_cifrasD(R, '1885', 58, 46, K.rayitaO); for (let i = 76; i < 236; i += 3) if (h(i, 0, 483) < 0.7) pset(i, 48, K.rayita); rect(56, 53, 246, 53, K.rayitaO);
    // cinco columnas con sus filetes, titulares y rayitas
    const cols = [[56, 90], [94, 130], [136, 174], [178, 212], [216, 246]];
    cols.forEach(([a, b], ci) => { if (ci) rect(a - 3, 56, a - 3, 168, K.diarioS);
      for (let y = 57; y < 168; y += 2) { if (ci === 2 && y >= 60 && y <= 106) continue; if (ci === 0 && y >= 102 && y <= 124) continue; if (ci === 3 && y >= 56 && y <= 78) continue; const ti = h(ci, Math.floor(y / 24), 484) < 0.5 && y % 24 < 4;
        if (ti) { rect(a + 2, y, b - 2 - Math.round(h(ci, y, 485) * 10), y + 1, K.rayitaO); y += 2; continue; } const l = b - Math.round(h(ci, y, 486) < 0.15 ? 12 : 0); for (let i = a; i < l; i++) if (h(i >> 2, y, 487) < 0.85) pset(i, y, K.rayita); } });
    // los grabados: un tren (columna 1) y un edificio con columnas (columna 4)
    rect(57, 102, 89, 124, K.rayita); rect(58, 103, 88, 123, K.diario); rect(60, 112, 78, 118, K.rayitaO); rect(70, 106, 78, 112, K.rayitaO); rect(62, 108, 64, 112, K.rayitaO); rect(80, 114, 86, 118, K.rayita); for (const wx of [63, 70, 76, 83]) disco(wx, 120, 2, K.rayitaO); for (let k = 0; k < 3; k++) disco(60 - k, 104 - k, 1 + (k > 0 ? 1 : 0), K.rayita);
    rect(179, 57, 211, 78, K.rayita); rect(180, 58, 210, 77, K.diario); poligono([[182, 64], [195, 59], [208, 64]], K.rayitaO); rect(183, 64, 207, 65, K.rayitaO); for (let x = 185; x < 207; x += 4) rect(x, 66, x + 1, 74, K.rayitaO); rect(182, 75, 208, 76, K.rayitaO);
    // la luz del quinqué, que entra por arriba a la izquierda
    d_alumbraD(R, (x, y) => { const d = Math.hypot((x - 110) * 0.7, (y - 40) * 0.9); return 2.4 + 2.6 * Math.exp(-d / 150) - (x > 290 ? 0.4 : 0); }, hex('#1a120e'), hex('#fff0c8'));
  });
}

function d_periodicoD(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = d_colD, b = d_periodicoCapaD(R), hu = Math.max(0, Math.min(1, o.hueco ?? 0));
  R.copiar(b);
  // EL HUECO: papel en blanco; con o.hueco, un recuadro de trazos que corre y late, y una «?»
  if (hu > 0) { const per = [], x0 = 139, y0 = 61, x1 = 171, y1 = 105; for (let x = x0; x <= x1; x++) per.push([x, y0]); for (let y = y0; y <= y1; y++) per.push([x1, y]); for (let x = x1; x >= x0; x--) per.push([x, y1]); for (let y = y1; y >= y0; y--) per.push([x0, y]);
    const n = Math.round(per.length * Math.min(1, hu * 2)), fase = Math.floor(t * 8); for (let i = 0; i < n; i++) if ((i + fase) % 6 < 3) { pset(per[i][0], per[i][1], hex('#e87a2a')); }
    if (hu > 0.5 && Math.sin(t * 4) > -0.5) R.icono('?', 151, 78, hex('#e87a2a'), K.k, 2); }
  // la lupa sobre el papel, que se desliza un poco, con las rayitas aumentadas dentro
  { const lx = Math.round(222 + Math.sin(t * 0.6) * 3), ly = Math.round(132 + Math.cos(t * 0.5) * 2), r = 13;
    for (let k = 0; k < 16; k++) { R.rect(lx + 10 + k, ly + 10 + k, lx + 12 + k, ly + 12 + k, K.k); pset(lx + 11 + k, ly + 11 + k, K.mesaL); }
    disco(lx, ly, r + 2, K.k); disco(lx, ly, r + 1, K.laton); R.recorte([lx - r, ly - r, lx + r, ly + r]);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) { const sx = Math.round(lx + i * 0.5), sy = Math.round(ly + j * 0.5), c = b[sy * 320 + sx]; pset(lx + i, ly + j, d_mezD(c, hex('#fff8e8'), 0.12)); }
    R.recorte(null); for (let i = 0; i < 5; i++) pset(lx - 8 + i, ly - 4 - i, K.blanco); }
  // las gafas
  for (const cx of [278, 294]) { disco(cx, 56, 6, K.k); disco(cx, 56, 5, d_mezD(K.mesa, K.frio, 0.35)); pset(cx - 2, 53, K.blanco); pset(cx - 1, 53, K.blanco); } linea(283, 55, 289, 55, K.k); linea(272, 54, 262, 48, K.k); linea(300, 54, 312, 50, K.k);
  // la taza de café que humea, con su plato
  { const cx = 286, cy = 118; disco(cx, cy + 9, 14, K.k); disco(cx, cy + 9, 13, K.blanco); disco(cx, cy + 9, 10, hex('#d8d2c4')); disco(cx, cy + 4, 9, K.k); disco(cx, cy + 4, 8, K.blanco); disco(cx, cy + 4, 6, hex('#3a2416')); pset(cx - 2, cy + 2, hex('#7a5a3a')); rect(cx + 9, cy + 2, cx + 13, cy + 6, K.k); rect(cx + 10, cy + 3, cx + 12, cy + 5, K.blanco);
    for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3) % 1; for (let i = 0; i < 5; i++) { const y = Math.round(cy - 2 - ph * 22 - i * 2); if (y > 46) pset(Math.round(cx + Math.sin(ph * 6 + k * 2 + i * 0.8) * 2.5), y, ph < 0.6 ? hex('#e8e4dc') : hex('#b8b4ac')); } } }
  // el lápiz y unas migas de tabaco
  linea(30, 150, 62, 138, K.k); linea(30, 151, 62, 139, K.amarillo); linea(31, 152, 61, 141, K.k); pset(29, 151, hex('#f6c290')); pset(28, 151, K.k); rect(62, 137, 64, 139, hex('#e8a0a8'));
  for (let k = 0; k < 6; k++) pset(20 + Math.round(h(k, 1, 488) * 20), 160 + Math.round(h(k, 2, 488) * 10), hex('#5a3a1a'));
  return { hueco: [155, 83], diario: [50, 18, 252, 172], lupa: [222, 132] };
}

// Cinco épocas de buscadores, cada una reconocible por sus objetos. Cada encuadre pinta los 320 × 180 en cada fotograma:
// lo fijo va en un búfer (e_capa) y encima la vida animada. Suelo de los pies y 150 en todos los encuadres generales.
// o.encuadre:
//   'sesion' (por omisión): UNA SESIÓN CON UN MÉDIUM EN 1898: un saloncito a oscuras con papel pintado de damasco
//     granate, zócalo de caoba con cuarterones, una chimenea con brasas que laten y un paisaje a la luz de la luna encima,
//     dos retratos en óvalo dorado, una ventana con cortinas de terciopelo casi cerradas (por la rendija, la luna, nubes
//     que pasan y una rama que se mece), un sillón orejero con un GATO NEGRO que mueve la cola y parpadea, un gramófono, un
//     reloj de caja alta con su péndulo, alfombra persa y tarima. La mesa redonda con mantel, LA BOLA DE CRISTAL (x 148,
//     y 132, r 8; o.empanada 0–1: se empaña de vaho con gotas), el candelabro de tres velas, cartas y una campanilla van
//     en buscadoresDelante (tablero y 139–153, x 109–221; faldón hasta y 172). La luz de las velas tiembla en la pared y
//     sube su humo. o.velas false: velas apagadas (sin halo). Suelo y 150; DETRÁS de la mesa los pies van en y 146, x 165–210 (asoman
//     cabeza y hombros; la bola tapa x 140–156); a los lados, libre x 40–105 y 225–260 (pies en y 150–158).
//   'sis': LA OFICINA DEL SERVICIO DE DESCIFRADO DEL EJÉRCITO, AÑOS TREINTA: pared de yeso verde pálido con zócalo de
//     roble, dos ventanas de guillotina con su estor (por la izquierda, la cúpula del Capitolio; por la derecha, el obelisco
//     y una paloma que pasea por el alféizar), una PIZARRA con columnas de NÚMEROS en tiza, una tabla de frecuencias y
//     polvo de tiza, un reloj de pared, la bandera de 48 estrellas en su mástil, archivadores verdes, un perchero con
//     sombrero y gabardina, y al fondo dos oficinistas pequeños en sus mesas (una MÁQUINA DE ROTORES que teclea, otro que
//     fuma en pipa y pasa hojas). Luz de las ventanas en el suelo y motas. En buscadoresDelante, dos pupitres de roble
//     (x 26–112 y 206–292, tablero y 140) con una máquina de cifrar de rotores, papeles, tintero, un teléfono de candelero y
//     un flexo. Suelo y 150; libre x 118–200 delante de la pizarra; detrás de los pupitres, alumnos con los pies en y 146 en x 68–84
//     y 258–278 (huecos sin objetos encima).
//     Cámara 'mesa': EL ESCRITORIO DEL JEFE de cerca: cartapacio de cuero verde, las TRES HOJAS DE BEALE con sus números
//     (devuelve .hojas: los centros), una lupa sobre la de en medio que agranda los números, papeles cuadriculados con
//     cifras, la taza con vapor, la pipa que humea en su cenicero, un lápiz y una máquina de rotores en la esquina.
//   'univac': LA SALA DE UN ORDENADOR GIGANTE DE 1970: techo de placas con fluorescentes (uno parpadea), cinco ARMARIOS DE
//     CINTAS con sus bobinas que giran a saltos y los bucles de cinta que suben y bajan en las columnas de vacío, una
//     CONSOLA con una matriz de luces que parpadean, interruptores y un osciloscopio, suelo técnico de placas con una
//     levantada y los cables a la vista, un operador pequeño que cambia una cinta y otro que cruza con una caja de fichas
//     perforadas. Delante a la derecha, LA IMPRESORA DE LÍNEAS (x 252–308, de pie en y 150) que va soltando una TIRA DE
//     PAPEL continuo con sus agujeros y filas de números (o.tira 0–1: cuánto ha salido; devuelve .tira [x, y], el extremo,
//     para que Hammer la coja con sostiene). Suelo y 150, libre x 60–240. buscadoresDelante: un carro de cintas en la
//     esquina de abajo a la izquierda.
//   'rand': UN DESPACHO DE 1980: pared beige con textura, una pizarra blanca con números en rotulador rojo y azul, un
//     corcho con listados y un calendario, una ventana con PERSIANAS por cuyas lamas se ve California (palmeras que se
//     mecen, colinas, el mar que brilla, nubes y una gaviota) y que tiende rayas de luz en el suelo, un ficus, un
//     archivador con un ventilador que oscila, moqueta, y la IMPRESORA MATRICIAL cuyo PAPEL CONTINUO PLEGADO cae al
//     suelo. En buscadoresDelante, la mesa (x 150–272, tablero y 140) con el TERMINAL de pantalla ámbar (o.verde: verde),
//     el teclado, la taza y los listados. o.pantalla(R, [x0, y0, x1, y1], t): lo que pinta la escena en la pantalla (si no,
//     filas de números que corren y el cursor); devuelve .pantalla, el hueco. Suelo y 150, libre x 40–140; detrás de la
//     mesa, pies en y 146, x 180–206. Cámara 'pantalla': el terminal de cerca (pantalla x 64–256, y 32–126) con su marco beige, el
//     teclado y la persiana detrás; la escena escribe la tira (d_tira) dentro de .pantalla; o.pantalla igual que arriba.
//   'estudio82': EL ESTUDIO DE UN INVESTIGADOR EN 1982, al anochecer: una pared entera de estanterías con libros, un
//     corcho con copias de cartas viejas, fichas y un mapa unidos con hilo rojo, una ventana al anochecer (tejados con
//     luces, la farola que se enciende, coches que pasan con los faros), un diploma, tarima y alfombra trenzada. En
//     buscadoresDelante, el escritorio (x 118–304, tablero y 140) con la LÁMPARA VERDE de banquero, la MÁQUINA DE ESCRIBIR
//     (su carro avanza), el DICCIONARIO GRANDE abierto en su atril, la lupa, las cartas, el fichero y una taza; una polilla
//     da vueltas a la lámpara. Suelo y 150; libre x 30–110; detrás del escritorio, pies en y 146, x 170–192.
// Todas devuelven { suelo, libre, ... }. Llama a buscadoresDelante(R, t, o) después de los actores, con las mismas o.
const EP = pal({
  // 1898: el damasco granate, la caoba, el terciopelo verde, el mantel, el oro viejo
  dam0: '#2a1018', dam1: '#3c1822', dam2: '#4e2030', dam3: '#6a3040', caoba: '#5a2e1e', caobaL: '#7e4630', caobaS: '#3a1c14', caobaD: '#22100a',
  terc: '#2a4a34', tercL: '#44704a', tercS: '#16281c', mantel: '#5e1a28', mantelL: '#86303e', mantelS: '#3a0e18', viejo: '#b8903a', viejoL: '#ecd488', viejoS: '#6e4e1c',
  alf1: '#6a1a22', alf2: '#22305a', alf3: '#b8883a', alf4: '#d8c8a0', tarima: '#3e2416', tarimaL: '#56341e', tarimaS: '#2a160c', nocheV: '#18203e', nocheL: '#2c3a66',
  // 1930: el yeso verde pálido, el roble, la pizarra, el verde de los archivadores, el latón, el mármol de Washington
  yeso: '#a4b090', yesoL: '#bac4a6', yesoS: '#86947a', roble: '#7a5232', robleL: '#9a6a40', robleS: '#563820', robleD: '#3a2414',
  piz: '#2a3c34', pizL: '#3a5046', pizS: '#1c2a24', tiza: '#e6ece0', tizaS: '#9aa8a0', arch: '#4e6a52', archL: '#6e8c6a', archS: '#34483a', laton: '#c8a858', latonS: '#8a6e30',
  marmol: '#ece6d8', marmolS: '#b8b0a0', hierba30: '#5a7a46', estor: '#d8ccaa', estorS: '#b0a280', suelo30: '#6a4a30', suelo30L: '#80603e', suelo30S: '#4e3420',
  // 1970: los paneles beige y gris, el suelo técnico, el azul y el naranja de las máquinas, la cinta
  pan: '#c8c2ae', panL: '#e2dccb', panS: '#9c9684', panD: '#6e6a5e', st: '#9a9ca2', stL: '#b8bac0', stS: '#6c6e76', stD: '#4a4c54', az: '#3a5a8a', azL: '#5a7cb0', azS: '#26385a',
  nar: '#e8742a', cinta: '#3a2c22', techo: '#d6d8d4', techoS: '#b4b6b4', fluor: '#f4fbff', papelC: '#eef0e4', papelCS: '#c4c8b8', verdeBand: '#b8dcb8',
  // 1980: el beige, la moqueta, el ámbar del fósforo, la persiana, California
  be: '#d4c4a0', beL: '#e6dabc', beS: '#b4a27e', beD: '#8a7a5a', moq: '#7e5232', moqL: '#946440', moqS: '#5e3a22', amb: '#ffb030', ambL: '#ffe0a0', ambS: '#7a4a10', fos: '#1a1206',
  pers: '#ece2c8', persS: '#bcae8c', calif: '#78c0ec', califL: '#b8e0f6', colina: '#a89a5a', colinaS: '#7e7a44', mar80: '#3a88c0', palma: '#3a7a3a', palmaS: '#24542a', ficus: '#2e6a32', ficusL: '#4a8c44',
  // 1982: la pared, las estanterías, la lámpara verde, el anochecer
  pared82: '#4a5448', pared82L: '#5c6858', pared82S: '#363e36', est: '#5a3a22', estL: '#7a5232', estS: '#3a2414', verLam: '#2a7a4a', verLamL: '#5ab47a', verLamS: '#1a4a2e',
  ocaso1: '#2a2a5a', ocaso2: '#6a3a6a', ocaso3: '#d0705a', ocaso4: '#f0b070', corcho: '#b88a5a', corchoS: '#8e6440', corchoL: '#d0a470', hilo: '#d02a2a',
});

// las cifras de la hoja 1 de Beale (para pizarras, papeles e impresoras)
const e_BEALE = [71, 194, 38, 1701, 89, 76, 11, 83, 1629, 48, 94, 63, 132, 16, 111, 95, 84, 341, 975, 14, 40, 64, 27, 81, 139, 213, 63, 90, 1120, 8, 15, 3, 126, 2018, 40, 74, 758, 485, 604, 230, 436, 664, 582, 150, 251, 284, 308, 231, 124, 211, 486, 225, 401, 370, 11, 101, 305, 139, 189, 17, 33, 88, 208, 193, 145, 1, 94, 73, 416, 918, 263, 28, 500, 538, 356, 117, 136, 219, 27, 176, 130, 10, 460, 25, 485, 18, 436, 65, 84, 200, 283, 118, 320, 138, 36, 416, 280, 15, 71, 224, 961, 44, 16, 401, 39, 88, 61, 304, 12, 21, 24, 283, 134, 92, 63, 246, 486, 682, 7, 219, 184, 360, 780, 18, 64, 463, 474, 131, 160, 79, 73, 440, 95, 18, 64, 581, 34, 69, 128, 367, 460, 17, 81, 12, 103, 820, 62, 116, 97, 103, 862, 70, 60, 1317, 471, 540, 208, 121, 890, 346, 36, 150, 59, 568, 614, 13, 120, 63, 219, 812, 2160, 1780, 99, 35, 18, 21, 136, 872, 15, 28, 170, 88, 4, 30, 44, 112, 18, 147, 436, 195, 320, 37, 122, 113, 6, 140, 8, 120, 305, 42, 58, 461, 44, 106, 301, 13, 408, 680, 93, 86, 116, 530, 82, 568, 9, 102, 38, 416, 89, 71, 216, 728, 965, 818, 2, 38, 121, 195, 14, 326, 148, 234, 18, 55, 131, 234, 361, 824, 5, 81, 623, 48, 961, 19, 26, 33, 10, 1101, 365, 92, 88, 181, 275, 346, 201, 206];

// mezcla dos colores: a = 0 deja c, a = 1 da d
const e_mez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// recorta un valor a 0–1
const e_lim = (u) => Math.max(0, Math.min(1, u));

// el búfer de un fondo fijo: se pinta una vez por lienzo y clave y luego se copia (nunca R.usar() a secas)
const e_CAPAS = new WeakMap();

// (el búfer del fondo fijo, por lienzo y clave)
function e_capa(R, clave, dibuja) {
  let m = e_CAPAS.get(R); if (!m) e_CAPAS.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// acerca un píxel a un color (luz de vela, sol, sombra)
function e_tinta(R, x, y, col, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, e_mez(R.pget(x, y), col, a)); }

// un halo de luz tramado (vela, lámpara): aclara hacia col en un círculo (ry: alto) con fuerza a en el centro
function e_halo(R, cx, cy, r, col, a, ry = r) {
  for (let y = Math.max(0, Math.round(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.round(cx - r)); x <= Math.min(319, cx + r); x++) {
    const d = Math.hypot((x - cx) / r, (y - cy) / ry); if (d >= 1) continue; const g = (1 - d) * (1 - d) * a; if (g > 0.02 + h(x, y, 900) * 0.04) e_tinta(R, x, y, col, Math.min(0.85, g)); }
}

// la sombra blanda de un objeto en el suelo (f: cuánto queda de la luz)
function e_sombra(R, cx, cy, rx, ry, f = 0.7) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) e_tinta(R, x, cy + j, C.k, 1 - f); }
}

// cifras diminutas de 3 × 5 (para pizarras, papeles y listados lejanos): solo números y comas
const e_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001011001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

// (esc: tamaño de cada píxel; devuelve la x donde acaba)
function e_cifras(R, s, x, y, c, esc = 1) {
  let cx = x;
  for (const ch of String(s)) {
    if (ch === ',') { for (let b = 0; b < esc; b++) for (let a = 0; a < esc; a++) R.pset(cx + a, y + 5 * esc + b, c); cx += 2 * esc; continue; }
    if (ch === ' ') { cx += 2 * esc; continue; }
    const d = e_DIG[+ch]; if (!d) continue;
    for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (d[j * 3 + i] === '1') { for (let b = 0; b < esc; b++) for (let a = 0; a < esc; a++) R.pset(cx + i * esc + a, y + j * esc + b, c); }
    cx += 4 * esc;
  }
  return cx;
}

// un papel con filas de cifras de Beale (desde la cifra k) dentro de [x0, y0, x1, y1]; si es muy pequeño, renglones
function e_papelCifras(R, x0, y0, x1, y1, k, c, fila = 7) {
  let i = k;
  for (let y = y0; y + 5 <= y1; y += fila) { let x = x0;
    while (true) { const s = e_BEALE[i % e_BEALE.length] + ','; if (x + s.length * 4 - 2 > x1) break; x = e_cifras(R, s, x, y, c) + 1; i++; } }
}

// renglones de garabatos (letras que no se leen): rayitas de largo variable
function e_renglones(R, x0, y0, x1, y1, c, paso = 3, k = 0) {
  for (let y = y0, f = 0; y <= y1; y += paso, f++) { let x = x0 + (f === 0 ? 3 : 0); const fin = x1 - (h(f, 1, 700 + k) < 0.3 ? Math.round(h(f, 2, 700 + k) * (x1 - x0) * 0.5) : 0);
    while (x < fin) { const L = 2 + Math.round(h(x, f, 701 + k) * 5); R.linea(x, y, Math.min(fin, x + L), y, c); x += L + 2; } }
}

// tablero de madera visto de frente (tablas horizontales): juntas, vetas claras y oscuras, algún nudo y el canto de luz
function e_madera(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, tabla = 12) {
  const { rect } = R; rect(x0, y0, x1, y1, c);
  for (let y = y0 + 3, f = 0; y < y1; y += tabla, f++) {
    if (y + tabla - 1 < y1) rect(x0, y + tabla - 1, x1, y + tabla - 1, cD);
    for (let g = 0; g < 4; g++) { const gy = y + 1 + Math.round(h(f, g, 310 + k) * (tabla - 4)); let x = x0 - Math.round(h(f, g, 311 + k) * 24);
      while (x < x1) { const L = 8 + Math.round(h(x, gy, 312 + k) * 34); if (h(x, g, 313 + k) < 0.7 && gy < y1) rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 3 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 314 + k) * 12); } }
    if (h(f, 9, 315 + k) < 0.55 && y + 6 < y1) { const nx = x0 + 10 + Math.round(h(f, 7, 316 + k) * Math.max(1, x1 - x0 - 20)), ny = y + Math.round(tabla / 2) - 1; rect(nx - 3, ny, nx + 3, ny, cS); rect(nx - 1, ny - 1, nx + 1, ny + 1, cS); rect(nx, ny, nx, ny, cD); }
  }
  rect(x0, y0, x1, y0, cL); rect(x0, y0 + 1, x1, y0 + 1, cS);
}

// un cuarterón de madera en relieve: bisel con luz arriba y a la izquierda, sombra abajo y a la derecha, y dos vetas
function e_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 120) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 121 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.09 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}

// tarima en perspectiva (punto de fuga vx, vy) entre y0 e y1: tablas con su color, juntas, vetas y testas a matajunta
function e_tarima(R, y0, y1, vx, vy, n, cols, k = 0) {
  const [c, cS, cL, cD] = cols;
  for (let y = y0; y <= y1; y++) { const p = (y - vy), fila = Math.floor(Math.log(p) * 9);
    for (let x = 0; x < 320; x++) { const u = (x - vx) / p * n, tb = Math.floor(u), f = u - tb, testa = (fila + tb * 3) % 7 === 0 && (Math.log(p) * 9) % 1 < 0.12;
      let col = h(tb, 3, 40 + k) < 0.33 ? cS : c; if (f < 0.06 || testa) col = cD; else if (h(Math.floor(u * 7), Math.floor(y / 2), 41 + k) < 0.12) col = col === c ? cS : cL; else if (f > 0.9 && y > y0 + 6) col = cL;
      R.pset(x, y, col); } }
}

// un reloj de pared redondo: aro, esfera con marcas, agujas (h0: la hora) y el segundero que avanza a saltos
function e_reloj(R, cx, cy, r, t, h0, aro, aroL) {
  const { disco, pset, linea } = R, K = C.k;
  disco(cx, cy, r + 1, K); disco(cx, cy, r, aro); disco(cx - 1, cy - 1, r - 1, (x, y, d) => (d > 0.8 ? aroL : aro)); disco(cx, cy, r - 1, aro);
  disco(cx, cy, r - 2, K); disco(cx, cy, r - 3, (x, y) => (x + y < cx + cy - r * 0.6 ? hex('#f6f0e0') : hex('#e0d6c0')));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, q = r - 4.5; pset(Math.round(cx + Math.cos(a) * q - 0.5), Math.round(cy + Math.sin(a) * q - 0.5), k % 3 ? C.grisS : K); }
  const hora = h0 + t / 3600, am = (hora % 1) * Math.PI * 2 - Math.PI / 2, ah = (hora % 12) / 12 * Math.PI * 2 - Math.PI / 2, as = Math.floor(t) * Math.PI / 30 - Math.PI / 2;
  linea(cx, cy, Math.round(cx + Math.cos(ah) * (r * 0.42)), Math.round(cy + Math.sin(ah) * (r * 0.42)), K);
  linea(cx, cy, Math.round(cx + Math.cos(am) * (r - 4)), Math.round(cy + Math.sin(am) * (r - 4)), K);
  linea(cx, cy, Math.round(cx + Math.cos(as) * (r - 3)), Math.round(cy + Math.sin(as) * (r - 3)), C.rojo);
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba) recortada al hueco actual
function e_nube(R, cx, cy, w, cols) {
  const [c1, c2, c3] = cols, r = Math.max(2, w * 0.3), B = [[-w * 0.42, 1, r * 0.75], [0, -1, r], [w * 0.38, 0.5, r * 0.8], [w * 0.15, 1.5, r * 0.7]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1, rr, c3);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.95, c2);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1, rr * 0.55, c1);
}

// un cielo tramado dentro de una ventana [x0, y0, x1, y1] (rampa de arriba abajo), con nubes de tres tonos a tres
// velocidades, que se recorta a su hueco
function e_cielo(R, rc, t, rampa, nubes, k = 0) {
  const [x0, y0, x1, y1] = rc, n = rampa.length;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / Math.max(1, y1 - y0) * (n - 1) + (h(x, y, 800 + k) - 0.5) * 0.9; R.pset(x, y, rampa[Math.max(0, Math.min(n - 1, Math.round(v)))]); }
  if (!nubes) return;
  R.recorte(rc);
  for (let i = 0; i < 3; i++) { const vel = [1.2, 2.1, 3.4][i], w = [16, 11, 8][i], sp = x1 - x0 + 50, x = x0 - 25 + ((h(i, 1, 801 + k) * sp + t * vel) % sp), y = y0 + 4 + i * ((y1 - y0) * 0.18) + h(i, 2, 801 + k) * 4;
    e_nube(R, x, y, w, nubes); }
  R.recorte(null);
}

// un pájaro lejano (una «v» que aletea)
function e_pajaro(R, x, y, t, c) { const a = Math.sin(t * 9 + x) > 0; x = Math.round(x); y = Math.round(y); R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 1 : -1) * 1, c); R.pset(x + 2, y - (a ? 1 : -1) * 1, c); }

// una fila de libros en un estante (lomos de colores, alturas distintas, alguno tumbado, bandas doradas)
const e_LOMOS = ['#7a2a2a', '#2a4a6a', '#3a5a3a', '#6a4a2a', '#8a6a3a', '#4a2a4a', '#2a2a3a', '#a8885a', '#5a6a7a', '#8a3a2a'].map(hex);

// (de x0 a x1, apoyados en yb, de unos «alto» píxeles)
function e_libros(R, x0, x1, yb, alto, k = 0) {
  let x = x0;
  while (x < x1 - 2) {
    const r = h(x, yb, 500 + k);
    if (r < 0.06 && x < x1 - 14) { const L = 10 + Math.round(h(x, 1, 501 + k) * 4), c = e_LOMOS[Math.floor(h(x, 2, 502 + k) * 10)]; for (let j = 0; j < 2; j++) { R.rect(x, yb - 3 - j * 3, x + L - j * 2, yb - 1 - j * 3, C.k); R.rect(x + 1, yb - 2 - j * 3, x + L - 1 - j * 2, yb - 2 - j * 3, e_mez(c, C.blanco, 0.2)); } x += L + 2; continue; }
    if (r < 0.1) { x += 3; continue; }
    const w = 2 + Math.floor(h(x, 3, 503 + k) * 3), a = alto - Math.floor(h(x, 4, 504 + k) * 5), c = e_LOMOS[Math.floor(h(x, 5, 505 + k) * 10)];
    R.rect(x, yb - a, x + w, yb, C.k); R.rect(x + 1, yb - a + 1, x + w - 1, yb - 1, c); R.rect(x + 1, yb - a + 1, x + 1, yb - 1, e_mez(c, C.blanco, 0.25));
    if (w > 2) R.rect(x + w - 1, yb - a + 1, x + w - 1, yb - 1, e_mez(c, C.k, 0.3));
    if (h(x, 6, 506 + k) < 0.6) { R.rect(x + 1, yb - a + 3, x + w - 1, yb - a + 3, EP.viejo); if (a > 9) R.rect(x + 1, yb - 4, x + w - 1, yb - 4, EP.viejoS); }
    x += w + 1;
  }
}

// una persona pequeña de fondo (9–12 px): cabeza, pelo, cuerpo con su luz y sombra, piernas; pose 'pie' o 'anda'; brazos
// 'arriba' (cambia una cinta) o 'lleva' (una caja delante); vista de frente o de lado (dir)
function e_figurita(R, x, suelo, t, cols, o = {}) {
  const [ropa, pelo, piel = hex('#e8b48a')] = cols, ropaS = e_mez(ropa, C.k, 0.35), ropaL = e_mez(ropa, C.blanco, 0.25), anda = o.anda, dir = o.dir ?? 1;
  x = Math.round(x); const paso = anda ? Math.floor(t * 6) % 2 : 0, bob = anda && paso ? 1 : 0, y = suelo - 11 + bob;
  R.rect(x - 2, y + 7, x - 1, suelo - (anda && paso ? 1 : 0), C.k); R.rect(x + 1, y + 7, x + 2, suelo - (anda && !paso ? 1 : 0), C.k);
  R.rect(x - 2, y + 3, x + 2, y + 7, ropa); R.rect(x - 2, y + 3, x - 2, y + 7, ropaL); R.rect(x + 2, y + 3, x + 2, y + 7, ropaS);
  R.rect(x - 2, y - 1, x + 2, y + 2, piel); R.rect(x - 2, y - 2, x + 2, y - 1, pelo); R.pset(x + (dir > 0 ? 2 : -2), y, pelo);
  if (o.brazos === 'arriba') { R.linea(x - 3, y + 3, x - 4, y - 2, ropa); R.linea(x + 3, y + 3, x + 4, y - 2, ropa); R.pset(x - 4, y - 3, piel); R.pset(x + 4, y - 3, piel); }
  else if (o.brazos === 'lleva') { R.rect(x - 4 + dir, y + 2, x + 4 + dir, y + 6, hex('#b08a5a')); R.rect(x - 4 + dir, y + 2, x + 4 + dir, y + 2, hex('#d0aa7a')); R.rect(x - 3 + dir, y + 3, x + 3 + dir, y + 3, hex('#7a5a3a')); }
  else { R.pset(x - 3, y + 4 + (anda && paso ? 0 : 1), ropaS); R.pset(x + 3, y + 4 + (anda && !paso ? 0 : 1), ropaS); }
}

function e_sesion(R, t, o) {
  const velas = o.velas !== false;
  e_capa(R, 'bl_sesion', () => e_sesionFijo(R));
  // por la rendija de las cortinas: la noche, la luna con nubes que pasan, estrellas que titilan y una rama que se mece
  const rc = [34, 32, 45, 96];
  e_cielo(R, rc, t, [EP.nocheV, EP.nocheV, EP.nocheL], [hex('#8a94b8'), hex('#5a6488'), hex('#3a4268')], 1);
  R.recorte(rc);
  R.disco(41, 46, 5, hex('#e8ecd8')); R.disco(40, 45, 3, hex('#fffbe8')); R.pset(42, 48, hex('#c8ccb8')); R.pset(39, 47, hex('#c8ccb8'));
  { const nx = 30 + ((t * 2.2) % 34); e_nube(R, nx, 49, 9, [hex('#9aa4c8'), hex('#6a7498'), hex('#454e74')]); }
  for (let i = 0; i < 6; i++) if (Math.sin(t * 3 + i * 2.3) > -0.3) R.pset(35 + Math.floor(h(i, 1, 30) * 10), 60 + Math.floor(h(i, 2, 30) * 20), hex('#e8ecf8'));
  const mec = Math.sin(t * 0.9) * 2;
  for (let i = 0; i < 14; i++) { const x = 46 - i, y = Math.round(72 + i * 0.6 + mec * (i / 14)); R.pset(x, y, hex('#0c0e18')); R.pset(x, y + 1, hex('#0c0e18')); if (i % 4 === 2) { R.disco(x, y - 2 + mec * 0.3, 1.6, hex('#10141e')); } }
  R.recorte(null);
  // el péndulo del reloj de caja alta, que oscila tras su cristal, y la esfera
  const ang = Math.sin(t * Math.PI) * 0.22, px = 274 + Math.sin(ang) * 22, py = 76 + Math.cos(ang) * 22;
  R.linea(274, 76, Math.round(px), Math.round(py), EP.viejoS); R.disco(px, py, 2.6, EP.viejo); R.pset(Math.round(px) - 1, Math.round(py) - 1, EP.viejoL);
  e_reloj(R, 274, 62, 7, t, 11.6, EP.viejo, EP.viejoL);
  // las brasas de la chimenea, que laten, y una voluta que sube por el tiro
  for (let i = 0; i < 22; i++) { const x = 150 + Math.floor(h(i, 1, 33) * 30), y = 110 + Math.floor(h(i, 2, 33) * 5), v = Math.sin(t * (2 + h(i, 3, 33) * 3) + i); R.pset(x, y, v > 0.5 ? hex('#ffb040') : v > -0.2 ? hex('#d0501e') : hex('#6a1e10')); }
  e_halo(R, 165, 112, 26, hex('#ff8a3a'), 0.22 + Math.sin(t * 2.3) * 0.04, 12);
  // el gato negro del sillón: la cola que se mece, las orejas y los ojos que parpadean
  { const cola = Math.sin(t * 1.7); for (let i = 0; i < 8; i++) R.pset(Math.round(48 + i * 0.6 + cola * (i / 8) * 3), 106 - Math.round(i * 0.9 * (cola > 0 ? 1 : 0.6)), hex('#121018'));
    const parp = (t % 4.3) < 0.15; R.pset(30, 101, parp ? hex('#121018') : hex('#d8e040')); R.pset(33, 101, parp ? hex('#121018') : hex('#d8e040')); if (Math.sin(t * 0.7) > 0.9) R.pset(29, 97, hex('#2a2430')); }
  // la luz de las velas que tiembla en la pared y el humo que sube
  if (velas) {
    const fl = 0.34 + Math.sin(t * 7.3) * 0.03 + Math.sin(t * 13.1) * 0.025;
    e_halo(R, 168, 108, 96, hex('#ffc070'), fl, 62);
    e_halo(R, 40, 104, 22, hex('#ffc070'), fl * 0.7, 18);
    for (const [vx, vy] of [[196, 112], [206, 108], [216, 112]]) for (let i = 0; i < 9; i++) { const u = ((t * 0.5 + i / 9 + vx * 0.01) % 1), y = vy - 6 - u * 40, x = vx + Math.sin(u * 9 + t * 1.3 + vx) * u * 5; if (u < 0.9) e_tinta(R, Math.round(x), Math.round(y), hex('#a89aa0'), 0.35 * (1 - u)); }
  }
  return { suelo: 150, libre: [40, 260], mesa: [109, 139, 221, 172], bola: [148, 132], ventana: [22, 28, 58, 100], reloj: [274, 62] };
}

// lo fijo del saloncito de 1898 (va en su búfer)
function e_sesionFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // la pared de damasco: rayas finas, el motivo de la flor de lis y un brillo en cada adorno
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) {
    const i = x % 14, j = (y + (Math.floor(x / 14) % 2) * 9) % 18, d = Math.abs(i - 7) + Math.abs(j - 9) * 0.7;
    let c = EP.dam1; if (i === 0) c = EP.dam0; else if (Math.abs(d - 4.5) < 0.6) c = EP.dam2; else if (d < 1.4) c = EP.dam2; else if (Math.abs(d - 4.5) < 1.2 && j < 9 && i < 7) c = EP.dam3;
    if (h(x, y, 21) < 0.06) c = EP.dam0; pset(x, y, c); }
  // la moldura de arriba y el riel de los cuadros
  rect(0, 0, 319, 3, EP.caobaD); rect(0, 4, 319, 4, EP.caobaS); rect(0, 5, 319, 5, EP.viejoS);
  rect(0, 22, 319, 22, EP.caobaS); rect(0, 23, 319, 23, EP.caobaL);
  // el zócalo de caoba con cuarterones
  rect(0, 96, 319, 118, EP.caobaD); rect(0, 96, 319, 97, EP.caobaL); rect(0, 98, 319, 98, EP.caobaS);
  for (let x = 2; x < 318; x += 26) e_cuarteron(R, x, 100, x + 22, 114, EP.caoba, EP.caobaL, EP.caobaD, EP.caobaS, x);
  rect(0, 115, 319, 117, EP.caobaS); rect(0, 118, 319, 118, EP.caobaD);
  // la tarima y la alfombra persa
  e_tarima(R, 119, 179, 165, 40, 1.6, [EP.tarima, EP.tarimaS, EP.tarimaL, EP.caobaD], 1);
  { const cx = 165, cy = 160, rx = 132, ry = 19;
    for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 1) continue;
      let c = d > 0.93 ? EP.alf3 : d > 0.86 ? EP.alf2 : d > 0.8 ? ((x + y) % 4 < 2 ? EP.alf4 : EP.alf2) : EP.alf1;
      if (d <= 0.8) { const m = Math.abs(((x - cx) / 6) % 2) < 1 !== Math.abs(((y - cy) / 3) % 2) < 1; if (m && h(x >> 1, y, 22) < 0.5) c = e_mez(EP.alf1, EP.alf2, 0.35); if (d < 0.3 && (Math.abs(x - cx) + Math.abs(y - cy) * 5) % 10 < 2) c = EP.alf3; }
      if (h(x, y, 23) < 0.12) c = e_mez(c, C.k, 0.25); pset(x, y, c); }
    for (let x = cx - rx + 8; x < cx + rx - 8; x += 2) { const y = cy + Math.round(ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2))); pset(x, y + 1, EP.alf4); } }
  // la ventana con sus cortinas de terciopelo, el galón y la borla, y el alféizar
  rect(20, 26, 60, 100, EP.caobaD); rect(33, 31, 46, 97, C.k);
  for (const [xa, xb] of [[18, 37], [43, 62]]) for (let x = xa; x <= xb; x++) for (let y = 30; y <= 102; y++) {
    const f = Math.sin((x - xa) * 1.1 + (y > 70 ? (y - 70) * 0.05 * (xa < 30 ? 1 : -1) : 0)), c = f > 0.55 ? EP.tercL : f < -0.45 ? EP.tercS : EP.terc;
    pset(x, y, h(x, y, 24) < 0.05 ? EP.tercS : c); }
  for (const x of [28, 52]) { rect(x - 5, 74, x + 5, 76, EP.viejo); rect(x - 5, 74, x + 5, 74, EP.viejoL); }
  rect(16, 24, 64, 31, EP.caoba); rect(16, 24, 64, 24, EP.caobaL); for (let x = 16; x <= 64; x += 2) { pset(x, 32, EP.viejo); pset(x, 33, EP.viejoS); }
  rect(14, 27, 66, 28, EP.viejoS);
  // el sillón orejero de terciopelo, con el gato negro hecho un ovillo
  rect(18, 96, 52, 124, C.k); rect(19, 97, 51, 112, EP.terc); for (let x = 22; x < 50; x += 5) { linea(x, 98, x, 111, EP.tercS); pset(x + 2, 104, EP.viejo); }
  rect(15, 104, 22, 124, C.k); rect(16, 105, 21, 123, EP.tercL); rect(48, 104, 55, 124, C.k); rect(49, 105, 54, 123, EP.terc);
  rect(20, 112, 50, 118, EP.tercL); rect(20, 118, 50, 120, EP.tercS); rect(18, 124, 20, 127, EP.caobaD); rect(50, 124, 52, 127, EP.caobaD);
  disco(37, 108, 7, hex('#121018')); disco(31, 104, 4, hex('#121018')); pset(29, 99, hex('#121018')); pset(29, 100, hex('#121018')); pset(33, 99, hex('#121018')); pset(33, 100, hex('#121018'));
  disco(36, 106, 3, hex('#1e1a26'));
  // la chimenea de mármol oscuro con su repisa, la boca negra y la rejilla
  rect(134, 74, 196, 118, C.k); rect(136, 76, 194, 118, hex('#3a3236'));
  for (let y = 76; y < 118; y++) for (let x = 136; x <= 194; x++) if (h(x >> 1, y, 25) < 0.18) pset(x, y, hex('#4a4046')); else if (h(x, y >> 2, 26) < 0.05) pset(x, y, hex('#5a5058'));
  rect(130, 72, 200, 76, EP.caobaD); rect(130, 72, 200, 72, EP.caobaL); rect(131, 73, 199, 73, EP.caoba);
  rect(146, 86, 184, 118, C.k); poligono([[146, 86], [165, 80], [184, 86]], C.k);
  for (let x = 148; x <= 182; x += 3) linea(x, 108, x, 116, hex('#2a2a30')); rect(147, 108, 183, 108, hex('#4a4a52'));
  // sobre la repisa: dos candeleros apagados, un reloj de bronce pequeño y un jarrón
  for (const x of [138, 192]) { rect(x - 1, 64, x + 1, 71, EP.viejoS); rect(x - 2, 70, x + 2, 71, EP.viejo); rect(x - 1, 60, x + 1, 63, hex('#e8dcc0')); }
  rect(160, 63, 170, 71, EP.viejoS); disco(165, 66, 3, hex('#e8dcc0')); pset(165, 66, C.k); rect(159, 70, 171, 71, EP.viejo);
  rect(176, 64, 180, 71, hex('#3a4a6a')); rect(177, 62, 179, 63, hex('#3a4a6a')); pset(177, 65, hex('#6a7aa0'));
  // el cuadro de encima: un lago a la luz de la luna, en su marco dorado
  rect(138, 30, 192, 56, EP.viejoS); rect(139, 31, 191, 55, EP.viejo); rect(140, 32, 190, 54, EP.viejoS);
  for (let y = 33; y <= 53; y++) for (let x = 141; x <= 189; x++) { let c = y < 44 ? (h(x, y, 27) < 0.5 ? hex('#1e2a4a') : hex('#24325a')) : (h(x, y, 28) < 0.3 ? hex('#2a3a5a') : hex('#18223a')); if (y >= 40 && y < 44 && Math.abs(x - 165 + (y - 40) * 2) < 18) c = hex('#141c2a'); if (y > 44 && Math.abs(x - 172) < 2 + (y - 44) * 0.3 && (x + y) % 2) c = hex('#c8c8b0'); pset(x, y, c); }
  disco(172, 37, 2.5, hex('#e8e8d0'));
  // dos retratos en óvalo dorado (siluetas en sepia)
  for (const cx of [102, 226]) { const cy = 50;
    disco(cx, cy, 13, EP.viejoS); for (let y = cy - 15; y <= cy + 15; y++) for (let x = cx - 11; x <= cx + 11; x++) { const d = Math.hypot((x - cx) / 11, (y - cy) / 15); if (d <= 1) pset(x, y, d > 0.86 ? (x + y < cx + cy ? EP.viejoL : EP.viejo) : d > 0.78 ? EP.viejoS : hex('#4a3a2a')); }
    for (let y = cy - 12; y <= cy + 12; y++) for (let x = cx - 9; x <= cx + 9; x++) { const d = Math.hypot((x - cx) / 9, (y - cy) / 12.5); if (d > 0.76) continue; const cab = Math.hypot((x - cx) / 3.8, (y - cy + 3) / 4.6) < 1, hom = y > cy + 3 && Math.abs(x - cx) < 7 - Math.max(0, cy + 8 - y) * 0.5;
      pset(x, y, cab ? hex('#8a6a4a') : hom ? hex('#2a1e18') : h(x, y, 29) < 0.5 ? hex('#5a4632') : hex('#62503a')); }
    pset(cx, cy - 15, EP.viejoL); linea(cx, cy - 22, cx, cy - 16, EP.viejoS); }
  // el gramófono sobre su mesita, con la bocina de latón
  rect(232, 102, 256, 104, EP.caoba); rect(232, 102, 256, 102, EP.caobaL); rect(234, 105, 235, 124, EP.caobaD); rect(253, 105, 254, 124, EP.caobaD); rect(234, 116, 254, 117, EP.caobaS);
  rect(236, 92, 252, 101, EP.caoba); rect(236, 92, 252, 92, EP.caobaL); rect(236, 101, 252, 101, EP.caobaD); rect(238, 95, 250, 98, EP.caobaS);
  rect(238, 90, 250, 91, hex('#1a1a1e')); rect(248, 84, 249, 91, EP.viejoS);
  poligono([[247, 86], [254, 70], [263, 64], [266, 74], [256, 80], [250, 88]], EP.viejo);
  poligono([[255, 70], [263, 64], [266, 74], [262, 72]], EP.viejoL); linea(247, 86, 254, 70, EP.viejoS); for (let i = 0; i < 4; i++) linea(250 + i * 3, 80 - i * 3, 253 + i * 3, 86 - i * 4, EP.viejoS);
  disco(262, 69, 3, EP.viejoS); disco(262, 69, 1.5, C.k);
  // el reloj de caja alta (la esfera y el péndulo los pinta cada fotograma)
  rect(264, 50, 284, 124, C.k); rect(265, 51, 283, 123, EP.caoba); poligono([[263, 52], [274, 46], [285, 52]], EP.caobaS); rect(263, 52, 285, 53, EP.caobaL);
  rect(267, 55, 281, 69, EP.caobaD); rect(268, 74, 280, 104, hex('#1a1210')); rect(268, 74, 280, 74, EP.caobaD); for (let y = 76; y < 104; y += 5) pset(269, y, hex('#3a2e2a'));
  rect(266, 72, 266, 106, EP.caobaL); rect(282, 72, 282, 106, EP.caobaS); rect(264, 108, 284, 112, EP.caobaL); rect(265, 113, 283, 123, EP.caoba); e_cuarteron(R, 268, 114, 280, 121, EP.caoba, EP.caobaL, EP.caobaD, EP.caobaS, 9);
  // la penumbra: todo se apaga hacia los bordes y hacia arriba (la esquina de Atom queda tranquila y oscura)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 168) / 190, (y - 120) / 125); let a = Math.max(0, Math.min(0.72, (d - 0.32) * 1.05)); if (x > 270 && y < 48) a = Math.max(a, 0.7); if (a > 0.02) pset(x, y, e_mez(R.pget(x, y), hex('#0a0610'), a)); }
}

// la mesa redonda del médium (delante de los personajes): el faldón del mantel con sus pliegues y flecos, el tablero, la
// bola de cristal en su peana de latón (o.empanada 0–1), el candelabro de tres velas que tiemblan, cartas y una campanilla
function e_sesionDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, cx = 165, cy = 146, rx = 56, ry = 7, velas = o.velas !== false;
  e_sombra(R, cx, 173, 62, 5, 0.55);
  // el faldón, que cae en pliegues hasta casi el suelo, con su fleco dorado
  for (let x = cx - rx; x <= cx + rx; x++) { const u = (x - cx) / rx, y0 = Math.round(cy + ry * Math.sqrt(Math.max(0, 1 - u * u))), y1 = 170 + Math.round(Math.sin(x * 0.7) * 1.2), f = Math.sin(x * 0.55 + Math.sin(x * 0.13) * 2);
    for (let y = y0 - 2; y <= y1; y++) { let c = f > 0.5 ? EP.mantelL : f < -0.4 ? EP.mantelS : EP.mantel; if (u < -0.75 || u > 0.8) c = e_mez(c, C.k, 0.3); if (y < y0 + 2) c = EP.mantelL; pset(x, y, c); }
    pset(x, y1 + 1, x % 2 ? EP.viejo : EP.viejoS); if (x % 2) pset(x, y1 + 2, EP.viejoS); }
  // el tablero (el mantel por encima) con el bordado y la luz de las velas
  for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 1) continue;
    let c = d > 0.9 ? EP.viejoS : d > 0.82 ? EP.mantelL : EP.mantel; if (d < 0.8 && Math.hypot((x - 200) / 40, (y - cy) / 6) < 1 && (x + y) % 2) c = EP.mantelL; if (Math.abs(d - 0.7) < 0.05 && x % 3 === 0) c = EP.viejo; pset(x, y, c); }
  // cartas boca abajo y una campanilla
  for (let i = 0; i < 3; i++) { const x = 168 + i * 7, y = 147 + (i % 2); rect(x, y, x + 5, y + 2, C.k); rect(x + 1, y, x + 4, y + 1, hex('#2a3a6a')); pset(x + 2, y, EP.viejo); }
  rect(124, 145, 127, 147, EP.viejoS); rect(124, 144, 127, 144, EP.viejo); pset(125, 142, EP.viejo); pset(125, 143, EP.viejoS); pset(126, 145, EP.viejoL);
  // la bola de cristal en su peana: niebla que gira dentro, el reflejo de las velas y el vaho que la empaña
  const bx = 148, by = 132, r = 8, emp = e_lim(o.empanada ?? 0);
  rect(bx - 5, by + 7, bx + 5, by + 10, C.k); rect(bx - 4, by + 7, bx + 4, by + 9, EP.viejo); rect(bx - 4, by + 7, bx + 4, by + 7, EP.viejoL); rect(bx - 6, by + 10, bx + 6, by + 11, EP.viejoS);
  disco(bx, by, r + 1, C.k);
  disco(bx, by, r, (x, y, d) => { const a = Math.atan2(y - by, x - bx) + t * 0.8, rem = Math.sin(a * 3 + d * 6 - t * 1.5); let c = d > 0.85 ? hex('#3a3a7a') : rem > 0.4 && d < 0.75 ? hex('#a8b4f0') : rem > -0.2 ? hex('#6a74c0') : hex('#4a4e98'); if (d < 0.25 && Math.sin(t * 3) > 0) c = hex('#d8e0ff'); return c; });
  disco(bx - 3, by - 3, 2, hex('#e8f0ff')); pset(bx - 4, by - 4, C.blanco); pset(bx + 4, by + 3, hex('#ffd890')); pset(bx + 5, by + 2, hex('#ffc070'));
  if (emp > 0) { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (Math.hypot(i + 0.5, j + 0.5) > r) continue; const x = bx + i, y = by + j, v = h(x, y, 31) * 0.5 + (1 - (j + r) / (2 * r)) * 0.25 + 0.25; if (v < emp) e_tinta(R, x, y, hex('#c8ccd8'), 0.55 + emp * 0.3); }
    for (let k = 0; k < Math.round(emp * 5); k++) { const gx = bx - 5 + Math.floor(h(k, 1, 32) * 10), gy = by - 2 + Math.floor(h(k, 2, 32) * 6) + Math.floor(((t * 0.7 + h(k, 3, 32)) % 1) * 3); pset(gx, gy, hex('#e8ecf4')); pset(gx, gy + 1, hex('#9aa0b8')); } }
  if (velas) e_halo(R, bx, by, 13, hex('#a8b0ff'), 0.12 + Math.sin(t * 2) * 0.05);
  // el candelabro de tres brazos con sus velas
  const k0 = 206; rect(k0 - 4, 145, k0 + 4, 147, EP.viejoS); rect(k0 - 3, 144, k0 + 3, 144, EP.viejo); rect(k0, 126, k0 + 1, 144, EP.viejo); pset(k0, 130, EP.viejoL);
  linea(k0 - 10, 122, k0, 132, EP.viejoS); linea(k0 + 10, 122, k0 + 1, 132, EP.viejoS); linea(k0 - 10, 121, k0 - 1, 131, EP.viejo); linea(k0 + 11, 121, k0 + 2, 131, EP.viejo);
  for (const [vx, vy, al] of [[k0 - 10, 121, 8], [k0, 125, 10], [k0 + 10, 121, 7]]) { rect(vx - 2, vy - 1, vx + 2, vy, EP.viejo);
    rect(vx - 1, vy - al, vx + 1, vy - 1, hex('#f0e6cc')); pset(vx - 1, vy - al, hex('#fff8e0')); pset(vx + 1, vy - al + 2, hex('#e0d0b0')); pset(vx + 1, vy - al + 3, hex('#e0d0b0'));
    if (velas) { const tw = Math.sin(t * 11 + vx) > 0 ? 1 : 0, ly = vy - al - 1; pset(vx, ly, hex('#2a2020')); pset(vx, ly - 1, hex('#ffd860')); pset(vx, ly - 2, hex('#ffd860')); pset(vx + tw - (tw ? 0 : 0), ly - 3, hex('#fff4b0')); pset(vx - 1 + tw, ly - 2, hex('#ffa030')); if (Math.sin(t * 6 + vx) > 0.3) pset(vx, ly - 4, hex('#ffe890')); }
    else pset(vx, vy - al - 1, hex('#2a2020')); }
  return { suelo: 150, libre: [40, 260], bola: [bx, by], mesa: [cx - rx, cy - ry, cx + rx, 172] };
}

function e_sis(R, t, o) {
  e_capa(R, 'bl_sis', () => e_sisFijo(R));
  // por las ventanas: el cielo de Washington con nubes, pájaros, el Capitolio y el obelisco (fijos debajo del estor)
  for (const [rc, k] of [[[24, 36, 62, 78], 0], [[220, 36, 258, 78], 1]]) {
    e_cielo(R, rc, t, [hex('#7ab8e8'), hex('#94c8ee'), hex('#b4daf2'), hex('#d0e8f4')], [C.blanco, hex('#e2ecf6'), hex('#b8cce2')], 10 + k);
    R.recorte(rc);
    if (k === 0) { // la cúpula del Capitolio, lejos, sobre los árboles
      R.rect(30, 66, 56, 78, hex('#b8c4cc'));
      for (let y = 58; y <= 78; y++) for (let x = 24; x <= 62; x++) { const d = Math.hypot((x - 43) / 8, (y - 62) / 6); if (y < 62 && d < 1) R.pset(x, y, x < 41 ? EP.marmol : EP.marmolS); }
      R.rect(36, 62, 50, 67, EP.marmolS); for (let x = 37; x <= 49; x += 2) R.linea(x, 62, x, 67, EP.marmol); R.rect(42, 51, 44, 55, EP.marmol); R.pset(43, 50, EP.marmolS);
      R.rect(28, 67, 58, 70, EP.marmol); for (let x = 29; x < 58; x += 3) R.pset(x, 69, EP.marmolS);
    } else { // el obelisco con su sombra
      R.poligono([[236, 78], [237, 46], [239, 43], [241, 46], [242, 78]], EP.marmol); R.poligono([[239, 43], [241, 46], [242, 78], [239, 78]], EP.marmolS);
    }
    for (let x = rc[0]; x <= rc[2]; x++) { const a = 70 + Math.round(h(x >> 1, k, 60) * 4 + Math.sin(x * 0.4 + k) * 1.5 + Math.sin(t * 1.3 + x * 0.3) * 0.6); for (let y = a; y <= 78; y++) R.pset(x, y, h(x, y, 61) < 0.4 ? EP.palmaS : hex('#4a7a3e')); }
    for (let i = 0; i < 2; i++) { const bx = rc[0] + ((t * (5 + i * 2) + i * 17 + k * 9) % 50) - 6, by = rc[1] + 10 + i * 6 + Math.sin(t * 2 + i) * 2; e_pajaro(R, bx, by, t + i, hex('#3a4050')); }
    R.recorte(null);
  }
  // los marcos de las ventanas (por encima del paisaje): guillotina, travesaños y el estor a medio bajar
  for (const x0 of [22, 218]) e_sisVentanaMarco(R, x0, t);
  // la paloma que pasea por el alféizar de fuera de la derecha (se recorta al cristal de abajo)
  { R.recorte([220, 58, 258, 78]); const u = (t * 0.25) % 2, px = Math.round(226 + (u < 1 ? u : 2 - u) * 26), dirP = u < 1 ? 1 : -1, pic = Math.sin(t * 5) > 0.6 ? 1 : 0;
    R.disco(px, 74, 2.6, hex('#8a8e9a')); R.disco(px + dirP * 3, 71 + pic, 1.6, hex('#6a6e7a')); R.pset(px + dirP * 4, 71 + pic, hex('#e0a040')); R.pset(px - dirP * 3, 73, hex('#5a5e6a')); R.pset(px + dirP * 3, 70 + pic, hex('#6aa080')); R.pset(px, 77, hex('#d06a5a')); R.pset(px + 1, 77, hex('#d06a5a')); R.recorte(null); }
  // las bandas de sol que entran por las ventanas y las motas que flotan
  for (const [x0, x1] of [[26, 60], [222, 256]]) for (let y = 116; y < 180; y += 1) { const d = (y - 116) * 0.55; for (let x = Math.round(x0 + d); x <= x1 + d + (y - 116) * 0.3; x++) if ((x + y) % 2 === 0) e_tinta(R, x, y, hex('#fff0c0'), 0.16); }
  for (let k = 0; k < 14; k++) { const w = k % 2 ? 236 : 42, y = Math.round(140 - ((h(k, 2, 62) * 60 + t * (1.5 + h(k, 3, 62) * 2)) % 60)), x = Math.round(w + (y - 80) * 0.5 + h(k, 1, 62) * 26 + Math.sin(t * 0.4 + k) * 3); if (Math.sin(t * 1.6 + k * 1.7) > 0.1) e_tinta(R, x, y, hex('#fff4d0'), 0.6); }
  // el reloj de pared
  e_reloj(R, 207, 40, 7, t, 3.4, EP.roble, EP.robleL);
  // la bandera, que se mece un poco con la corriente de la ventana
  e_bandera48(R, 79, 34, t);
  // al fondo, los dos oficinistas: el de la izquierda teclea en la máquina de rotores (los rotores avanzan a saltos y se
  // encienden las lamparitas), el de la derecha pasa hojas con la pipa humeando
  { const tec = Math.floor(t * 7) % 3; e_figuritaSentada(R, 44, 98, t, [hex('#5a6a4a'), hex('#3a2a1a')], tec === 0 ? 1 : 0);
    for (let i = 0; i < 4; i++) { const n = (Math.floor(t * 3.5 / (i + 1)) + i * 7) % 6; R.rect(36 + i * 4, 97, 38 + i * 4, 98, C.k); R.pset(37 + i * 4, 97 + (n % 2), EP.laton); }
    for (let i = 0; i < 6; i++) R.pset(35 + i * 3, 100, (Math.floor(t * 5) + i * 2) % 7 === 0 ? hex('#ffe080') : hex('#5a4a2a')); }
  { const pasa = (t % 3.2) < 0.4; e_figuritaSentada(R, 240, 98, t, [hex('#6a5a4a'), hex('#5a4a3a')], 0);
    if (pasa) { R.poligono([[236, 99], [240, 94], [242, 99]], C.blanco); } R.pset(244, 95, EP.robleS); R.pset(245, 95, EP.robleS); R.pset(246, 94, hex('#3a2a1a'));
    for (let i = 0; i < 6; i++) { const u = ((t * 0.4 + i / 6) % 1), y = 92 - u * 26, x = 246 + Math.sin(u * 8 + t) * u * 5; e_tinta(R, Math.round(x), Math.round(y), hex('#d8dcd8'), 0.4 * (1 - u)); } }
  // el polvo de tiza que cae de la pizarra
  for (let k = 0; k < 6; k++) { const u = ((t * 0.3 + k / 6) % 1); e_tinta(R, 110 + Math.floor(h(k, 1, 63) * 80), 80 + Math.round(u * 18), EP.tiza, 0.5 * (1 - u)); }
  return { suelo: 150, libre: [118, 200], pizarra: [100, 26, 196, 78], ventanas: [[22, 26, 64, 82], [218, 26, 260, 82]], pupitres: [[26, 140, 112, 172], [206, 140, 292, 172]] };
}

// el marco de una ventana de guillotina de x0 a x0 + 42 (y 26–82): marco, dos hojas con travesaños, el estor y su anilla
function e_sisVentanaMarco(R, x0, t) {
  const { rect, pset } = R, x1 = x0 + 42;
  rect(x0, 26, x1, 29, EP.roble); rect(x0, 26, x1, 26, EP.robleL); rect(x0, 26, x0 + 1, 80, EP.roble); rect(x1 - 1, 26, x1, 80, EP.robleS); rect(x0, 56, x1, 58, EP.roble); rect(x0, 56, x1, 56, EP.robleL); rect(x0 + 1, 59, x1 - 1, 59, EP.robleS);
  for (const x of [x0 + 14, x0 + 28]) { rect(x, 29, x, 78, EP.robleS); pset(x - 1, 40, EP.robleL); }
  rect(x0, 43, x1, 43, EP.robleS);
  // el estor bajado hasta y 38 con su anilla, que se mece
  for (let y = 30; y <= 38; y++) for (let x = x0 + 2; x <= x1 - 2; x++) pset(x, y, (y + (x >> 2)) % 5 === 0 ? EP.estorS : h(x, y, 64) < 0.1 ? EP.estorS : EP.estor);
  rect(x0 + 2, 39, x1 - 2, 39, EP.robleS); const sw = Math.round(Math.sin(t * 1.1 + x0) * 1); pset(x0 + 21 + sw, 40, EP.laton); pset(x0 + 21 + sw, 41, EP.latonS); pset(x0 + 20 + sw, 41, EP.laton); pset(x0 + 22 + sw, 41, EP.laton);
  rect(x0 - 2, 79, x1 + 2, 82, EP.robleL); rect(x0 - 2, 82, x1 + 2, 83, EP.robleS);
  for (let i = 0; i < 3; i++) pset(x0 + 6 + i * 13, 31, C.blanco);
}

// un oficinista pequeño sentado a su mesa del fondo, visto de frente (solo asoma de la mesa para arriba)
function e_figuritaSentada(R, x, ymesa, t, [ropa, pelo], baja = 0) {
  const y = ymesa - 9 + baja, piel = hex('#e8b48a');
  R.rect(x - 3, y + 4, x + 3, ymesa - 1, ropa); R.rect(x - 3, y + 4, x - 3, ymesa - 1, e_mez(ropa, C.blanco, 0.25)); R.pset(x, y + 5, C.blanco); R.pset(x, y + 6, hex('#8a2a2a'));
  R.rect(x - 2, y, x + 2, y + 3, piel); R.rect(x - 2, y - 1, x + 2, y, pelo); R.pset(x - 1, y + 2, hex('#5a3a2a')); R.pset(x + 1, y + 2, hex('#5a3a2a'));
  R.rect(x - 4, ymesa - 2, x - 3, ymesa - 1, piel); R.rect(x + 3, ymesa - 2, x + 4, ymesa - 1, piel);
}

// la bandera de 48 estrellas colgada de su mástil, que cae en pliegues y se mece un poco
function e_bandera48(R, x0, y0, t) {
  const W = 16, H = 22;
  for (let i = 0; i < W; i++) { const f = Math.sin(i * 0.9 + Math.sin(t * 0.8) * 1.1), luz = f > 0.4 ? 0.22 : f < -0.4 ? -0.3 : 0, x = x0 + i, ya = y0 + Math.round(i * 0.25), alto = H + Math.round(f * 1.2) - Math.round(i * 0.2);
    for (let j = 0; j < alto; j++) { let c = i < 7 && j < 12 ? ((i % 2 === 1 && j % 2 === 1) ? hex('#f0f0f0') : hex('#2a3a7a')) : Math.floor(j / 2) % 2 ? hex('#f0ece4') : hex('#b82a30');
      R.pset(x, ya + j, luz > 0 ? e_mez(c, C.blanco, luz) : e_mez(c, C.k, -luz)); }
    R.pset(x, ya + alto, i % 2 ? EP.laton : EP.latonS); }
  R.rect(x0 - 2, y0 - 6, x0 - 1, 114, EP.laton); R.rect(x0 - 2, y0 - 6, x0 - 2, 114, hex('#e8d088')); R.disco(x0 - 1.5, y0 - 8, 1.8, EP.laton); R.rect(x0 - 5, 112, x0 + 2, 115, EP.latonS);
}

// lo fijo de la oficina de los años treinta (va en su búfer)
function e_sisFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el yeso verde pálido con su textura moteada y las manchas del tiempo; la cornisa de arriba
  for (let y = 0; y < 84; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 65) + h(x >> 3, y >> 3, 66) * 0.6; pset(x, y, v > 1.32 ? EP.yesoL : v < 0.32 ? EP.yesoS : EP.yeso); }
  rect(0, 0, 319, 5, EP.yesoS); rect(0, 6, 319, 6, EP.yesoL); rect(0, 7, 319, 7, EP.yesoS);
  // el zócalo de roble con cuarterones y la moldura
  rect(0, 84, 319, 114, EP.robleD); rect(0, 84, 319, 85, EP.robleL); rect(0, 86, 319, 86, EP.robleS);
  for (let x = 2; x < 318; x += 22) e_cuarteron(R, x, 88, x + 18, 110, EP.roble, EP.robleL, EP.robleD, EP.robleS, x + 50);
  rect(0, 111, 319, 113, EP.robleS); rect(0, 114, 319, 114, C.k);
  // el suelo de tablas enceradas
  e_tarima(R, 115, 179, 160, 40, 2.2, [EP.suelo30, EP.suelo30S, EP.suelo30L, EP.robleD], 2);
  // la pizarra con su marco de roble, las columnas de cifras en tiza, la tabla de frecuencias y la bandeja
  rect(98, 24, 198, 80, EP.robleD); rect(99, 25, 197, 79, EP.roble); rect(99, 25, 197, 25, EP.robleL);
  for (let y = 27; y <= 77; y++) for (let x = 101; x <= 195; x++) { const v = h(x >> 2, y >> 1, 67); pset(x, y, v < 0.1 ? EP.pizL : v > 0.93 ? EP.pizS : EP.piz); }
  for (let y = 28; y < 76; y++) for (let x = 102; x < 194; x++) if (h(x >> 3, y >> 2, 68) < 0.12 && h(x, y, 69) < 0.3) pset(x, y, EP.pizL);   // borrones
  for (let c = 0; c < 3; c++) for (let f = 0; f < 7; f++) e_cifras(R, e_BEALE[c * 7 + f], 104 + c * 18, 29 + f * 7, h(c, f, 70) < 0.15 ? hex('#f0d890') : EP.tiza);
  linea(156, 28, 156, 76, EP.tizaS);
  for (let i = 0; i < 9; i++) { const a = Math.round(4 + h(i, 1, 71) * 22); rect(160 + i * 4, 72 - a, 162 + i * 4, 72, h(i, 2, 71) < 0.2 ? hex('#f0b0a0') : EP.tiza); }
  linea(159, 73, 196, 73, EP.tiza); linea(159, 40, 159, 73, EP.tiza);
  e_cifras(R, '1701', 168, 30, hex('#f0d890')); linea(166, 36, 186, 36, hex('#f0d890')); R.icono('?', 188, 28, EP.tiza, EP.pizS);
  rect(98, 80, 198, 82, EP.robleL); rect(98, 83, 198, 83, EP.robleS); rect(110, 79, 114, 80, C.blanco); rect(120, 79, 122, 80, hex('#f0d890')); rect(176, 78, 186, 80, hex('#5a4a3a')); rect(176, 78, 186, 78, hex('#8a7a6a'));
  // los archivadores verdes de cuatro cajones, con tiradores de latón y portaetiquetas; encima, cajas de expedientes
  for (const x0 of [266, 288]) { rect(x0, 58, x0 + 20, 114, C.k); rect(x0 + 1, 59, x0 + 19, 113, EP.arch); rect(x0 + 1, 59, x0 + 1, 113, EP.archL); rect(x0 + 19, 59, x0 + 19, 113, EP.archS);
    for (let d = 0; d < 4; d++) { const y = 61 + d * 13; rect(x0 + 2, y, x0 + 18, y + 11, EP.archS); rect(x0 + 3, y + 1, x0 + 17, y + 10, EP.arch); rect(x0 + 3, y + 1, x0 + 17, y + 1, EP.archL);
      rect(x0 + 7, y + 3, x0 + 13, y + 5, EP.latonS); rect(x0 + 8, y + 3, x0 + 12, y + 4, hex('#f0ead8')); rect(x0 + 8, y + 7, x0 + 12, y + 8, EP.laton); pset(x0 + 8, y + 7, hex('#f0e0a0')); } }
  rect(270, 50, 302, 57, hex('#b8a070')); rect(270, 50, 302, 50, hex('#d8c090')); for (let x = 274; x < 302; x += 8) linea(x, 51, x, 57, hex('#8a7448')); rect(276, 46, 296, 49, hex('#a88a5a')); rect(276, 46, 296, 46, hex('#c8a87a'));
  // el perchero con sombrero y gabardina
  rect(8, 46, 9, 114, EP.robleS); rect(8, 46, 8, 114, EP.robleL); rect(4, 112, 13, 114, EP.robleD); linea(5, 50, 12, 50, EP.robleS);
  poligono([[3, 52], [14, 52], [16, 96], [1, 96]], hex('#a89a6a')); for (let y = 54; y < 96; y += 3) pset(6 + (y % 2), y, hex('#8a7c50')); linea(8, 53, 8, 95, hex('#8a7c50')); rect(2, 70, 15, 71, hex('#8a7c50'));
  rect(3, 44, 14, 46, hex('#4a3a30')); rect(5, 40, 12, 44, hex('#4a3a30')); rect(5, 43, 12, 43, hex('#2a1e18')); pset(6, 41, hex('#6a5a4a'));
  // las mesas del fondo, bajo las ventanas, con su máquina de rotores y sus papeles
  for (const [a, b] of [[22, 66], [218, 262]]) { rect(a, 98, b, 102, C.k); rect(a + 1, 98, b - 1, 100, EP.robleL); rect(a + 1, 101, b - 1, 101, EP.robleS); rect(a + 2, 102, a + 4, 117, EP.robleD); rect(b - 4, 102, b - 2, 117, EP.robleD); rect(a + 2, 103, a + 14, 112, EP.roble); rect(a + 2, 103, a + 14, 103, EP.robleL); pset(a + 8, 107, EP.laton); }
  rect(32, 92, 52, 97, C.k); rect(33, 93, 51, 96, hex('#3a3a3a')); rect(33, 93, 51, 93, hex('#5a5a5a'));
  rect(226, 95, 234, 97, C.blanco); rect(227, 95, 233, 95, hex('#d8d0c0')); rect(244, 96, 250, 97, hex('#d8d0c0'));
  rect(254, 92, 258, 97, hex('#3a3a3a')); rect(255, 91, 257, 92, hex('#3a3a3a')); rect(256, 86, 256, 91, hex('#1a1a1a'));   // el teléfono de candelero del fondo
}

// los dos pupitres de roble de delante (por delante de los alumnos): tablero, cajones con tirador, patas; encima, la
// máquina de cifrar de rotores (rotores que avanzan, lamparitas), papeles con cifras, el tintero, el teléfono y el flexo
function e_sisDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  for (const [a, b, k] of [[26, 112, 0], [206, 292, 1]]) {
    e_sombra(R, (a + b) >> 1, 174, (b - a) >> 1, 4, 0.6);
    rect(a, 140, b, 146, C.k); rect(a + 1, 140, b - 1, 144, EP.robleL); rect(a + 1, 140, b - 1, 140, hex('#b88a5a')); rect(a + 1, 145, b - 1, 146, EP.robleS);
    for (let x = a + 3; x < b - 2; x += 1) if (h(x >> 3, k, 72) < 0.6 && h(x, k, 73) < 0.4) pset(x, 142, EP.roble);
    rect(a + 2, 147, b - 2, 166, EP.roble); rect(a + 2, 147, b - 2, 147, EP.robleS);
    e_cuarteron(R, a + 4, 149, a + 30, 162, EP.roble, EP.robleL, EP.robleD, EP.robleS, a); e_cuarteron(R, b - 30, 149, b - 4, 162, EP.roble, EP.robleL, EP.robleD, EP.robleS, b);
    rect(a + 15, 155, a + 19, 156, EP.laton); rect(b - 19, 155, b - 15, 156, EP.laton);
    rect(a + 33, 149, b - 33, 162, EP.robleD); rect(a + 34, 150, b - 34, 161, hex('#2e1c10'));
    rect(a + 2, 166, a + 6, 179, EP.robleS); rect(a + 2, 166, a + 2, 179, EP.robleL); rect(b - 6, 166, b - 2, 179, EP.robleS); rect(b - 6, 166, b - 6, 179, EP.robleL); rect(a + 2, 167, b - 2, 168, EP.robleD);
  }
  // pupitre izquierdo: la máquina de rotores (caja de madera, tapa con cuatro rotores, teclado y panel de lámparas)
  { const x0 = 30, y0 = 128; rect(x0, y0, x0 + 30, y0 + 12, C.k); rect(x0 + 1, y0 + 1, x0 + 29, y0 + 11, hex('#6a4a2a')); rect(x0 + 1, y0 + 1, x0 + 29, y0 + 1, hex('#8a6a3a'));
    rect(x0 + 3, y0 + 2, x0 + 27, y0 + 5, hex('#2a2a2a'));
    for (let i = 0; i < 6; i++) pset(x0 + 5 + i * 4, y0 + 3, (Math.floor(t * 4) + i * 3) % 6 === 0 ? hex('#ffe070') : hex('#4a4a3a'));
    for (let f = 0; f < 2; f++) for (let i = 0; i < 7; i++) { const x = x0 + 4 + i * 3 + f, y = y0 + 7 + f * 2, pulsa = Math.floor(t * 6) % 14 === i + f * 7; pset(x, y + (pulsa ? 1 : 0), hex('#e8e0c8')); }
    for (let i = 0; i < 4; i++) { const rx = x0 + 8 + i * 5, n = (Math.floor(t * 2.2 * (i === 0 ? 1 : 1 / (i * 2))) + i * 5) % 4; rect(rx - 1, y0 - 4, rx + 2, y0, C.k); rect(rx, y0 - 4, rx + 1, y0 - 1, EP.laton); pset(rx, y0 - 4 + n, EP.latonS); pset(rx + 1, y0 - 3, hex('#f0e0a0')); }
  }
  rect(88, 134, 104, 139, C.blanco); rect(89, 135, 103, 135, hex('#c8c0b0')); e_papelCifras(R, 89, 134, 103, 139, 30, hex('#3a3a5a'), 6);
  rect(62, 134, 67, 139, C.k); rect(63, 135, 66, 139, hex('#2a2a6a')); pset(63, 135, hex('#6a6aa8')); rect(63, 133, 66, 134, EP.laton); linea(105, 132, 109, 138, hex('#e8e0d0'));
  // pupitre derecho: papeles cuadriculados, el teléfono de candelero y el flexo con su cono de luz
  rect(228, 133, 254, 139, hex('#f0ead8')); for (let x = 230; x < 254; x += 3) linea(x, 133, x, 139, hex('#c8d0e0')); for (let y = 134; y < 139; y += 2) linea(228, y, 254, y, hex('#c8d0e0')); e_cifras(R, '194', 232, 134, hex('#2a2a4a'));
  rect(282, 136, 288, 139, C.k); rect(284, 124, 286, 136, C.k); rect(283, 120, 287, 124, C.k); pset(284, 121, hex('#5a5a5a')); rect(288, 127, 291, 130, C.k); linea(288, 128, 282, 131, C.k); pset(289, 128, hex('#5a5a5a'));
  { const fx = 212; rect(fx - 4, 137, fx + 4, 139, C.k); rect(fx - 3, 137, fx + 3, 138, hex('#2a4a3a')); linea(fx, 137, fx + 6, 124, hex('#2a3a2a')); linea(fx + 6, 124, fx + 14, 119, hex('#2a3a2a')); disco(fx + 6, 124, 1, hex('#4a6a5a'));
    poligono([[fx + 12, 117], [fx + 21, 117], [fx + 24, 123], [fx + 9, 123]], hex('#2a4a3a')); rect(fx + 12, 117, fx + 21, 117, hex('#4a7a5a')); rect(fx + 10, 124, fx + 23, 124, hex('#fff0b0'));
    for (let y = 125; y < 140; y++) for (let x = fx + 8 - (y - 125) * 0.4; x <= fx + 26 + (y - 125) * 0.5; x++) if ((Math.round(x) + y) % 2 === 0) e_tinta(R, Math.round(x), y, hex('#fff0c0'), 0.22); }
  return { suelo: 150, libre: [118, 200], pupitres: [[26, 140, 112, 172], [206, 140, 292, 172]] };
}

// la mesa del jefe de cerca: cartapacio, las tres hojas de Beale, la lupa que agranda, papeles cuadriculados, la taza con
// vapor, la pipa que humea, el lápiz y la máquina de rotores en la esquina; la luz cálida del flexo
function e_sisMesa(R, t, o) {
  e_capa(R, 'bl_sisMesa', () => {
    const { rect, pset, linea, disco, poligono } = R;
    // la pared del fondo: yeso y zócalo, y el canto de la mesa
    for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 74) > 0.85 ? EP.yesoL : EP.yeso);
    rect(0, 22, 319, 40, EP.robleD); for (let x = 4; x < 316; x += 40) e_cuarteron(R, x, 25, x + 34, 38, EP.roble, EP.robleL, EP.robleD, EP.robleS, x);
    // el tablero de roble en perspectiva suave, con vetas
    e_madera(R, 0, 41, 319, 179, EP.roble, EP.robleS, EP.robleL, EP.robleD, 7, 14);
    rect(0, 41, 319, 42, EP.robleL);
    // el cartapacio de cuero verde con esquinas de cuero oscuro
    rect(54, 56, 268, 160, C.k); rect(55, 57, 267, 159, hex('#2e5a3e')); for (let y = 57; y < 160; y++) for (let x = 55; x < 268; x++) if (h(x, y, 75) < 0.12) pset(x, y, hex('#3a6a4a')); else if (h(x, y, 76) < 0.05) pset(x, y, hex('#244a32'));
    for (const [cx, cy, sx, sy] of [[55, 57, 1, 1], [267, 57, -1, 1], [55, 159, 1, -1], [267, 159, -1, -1]]) poligono([[cx, cy], [cx + sx * 16, cy], [cx, cy + sy * 16]], hex('#4a2a1a'));
    // los papeles cuadriculados de la izquierda, con cifras en sus casillas
    for (const [x0, y0, k] of [[10, 96, 0], [18, 104, 1]]) { rect(x0, y0, x0 + 40, y0 + 52, hex('#c8c0a8')); rect(x0, y0, x0 + 39, y0 + 51, hex('#f2ecd8'));
      for (let x = x0 + 2; x < x0 + 39; x += 6) linea(x, y0 + 2, x, y0 + 50, hex('#bcc8dc')); for (let y = y0 + 2; y < y0 + 51; y += 7) linea(x0 + 1, y, x0 + 38, y, hex('#bcc8dc'));
      if (k) for (let f = 0; f < 6; f++) for (let c = 0; c < 5; c++) if (h(f, c, 77) < 0.7) e_cifras(R, (f * 5 + c * 3) % 10, x0 + 3 + c * 7, y0 + 4 + f * 7, h(f, c, 78) < 0.2 ? hex('#b02a2a') : hex('#2a2a5a')); }
    // el lápiz y la goma
    linea(70, 166, 110, 152, hex('#e8b830')); linea(70, 167, 110, 153, hex('#c89820')); pset(69, 167, hex('#3a3a3a')); rect(110, 151, 112, 153, hex('#d87a8a'));
    // el cenicero con la pipa
    disco(30, 66, 10, C.k); disco(30, 66, 9, hex('#8a8a92')); disco(30, 66, 6, hex('#5a5a62')); disco(29, 65, 5, hex('#4a4a52')); pset(25, 61, hex('#c8c8d0'));
    rect(22, 64, 36, 66, hex('#3a2416')); rect(22, 64, 36, 64, hex('#5a3a22')); disco(38, 62, 4, hex('#4a2a18')); disco(38, 61, 2.5, hex('#2a1810')); pset(37, 59, hex('#6a4a30'));
    // la taza y su plato
    disco(284, 120, 15, C.k); disco(284, 120, 14, hex('#f0ece4')); disco(284, 121, 11, hex('#d8d0c4'));
    disco(284, 112, 9, C.k); disco(284, 112, 8, hex('#f6f2ea')); disco(284, 112, 6, hex('#4a2a18')); disco(283, 111, 3, hex('#6a3e22')); rect(293, 110, 298, 116, C.k); rect(294, 111, 297, 115, hex('#f6f2ea')); rect(295, 112, 296, 114, C.k);
    // la máquina de rotores en la esquina de arriba a la derecha: caja de madera, rotores de latón y teclas
    rect(222, 16, 319, 54, C.k); rect(223, 17, 319, 53, hex('#6a4a2a')); rect(223, 17, 319, 18, hex('#8a6a3a'));
    rect(228, 22, 300, 32, hex('#2a2a2a')); for (let i = 0; i < 4; i++) { const rx = 236 + i * 16; rect(rx - 4, 20, rx + 4, 34, C.k); rect(rx - 3, 21, rx + 3, 33, EP.laton); for (let y = 22; y < 33; y += 2) linea(rx - 3, y, rx + 3, y, EP.latonS); rect(rx - 3, 21, rx - 3, 33, hex('#f0e0a0')); }
    for (let f = 0; f < 2; f++) for (let i = 0; i < 9; i++) { const x = 230 + i * 9 + f * 4, y = 38 + f * 7; disco(x, y, 2.6, C.k); disco(x, y, 1.8, hex('#e8e0c8')); pset(x - 1, y - 1, C.blanco); }
  });
  const { rect, pset, linea, disco } = R;
  // las tres hojas de Beale, con la segunda (la descifrada) un poco más clara
  const hojas = [[112, 98], [162, 92], [214, 100]];
  hojas.forEach(([cx, cy], i) => { const x0 = cx - 22, y0 = cy - 32, x1 = cx + 22, y1 = cy + 32;
    rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, hex('#1e3a28')); rect(x0, y0, x1, y1, i === 1 ? hex('#f0e6c8') : hex('#e4d6b0'));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (h(x, y, 79 + i) < 0.06) pset(x, y, hex('#cdb88a'));
    rect(x0, y0, x1, y0, hex('#fff6dc')); rect(x1, y0, x1, y1, hex('#c8b890')); e_esquina(R, x1, y0);
    e_papelCifras(R, x0 + 3, y0 + 13, x1 - 2, y1 - 3, i * 40, hex('#3a2a40'), 7);
    R.disco(x0 + 7, y0 + 6, 4.5, hex('#7a2a2a')); e_cifras(R, i + 1, x0 + 6, y0 + 4, hex('#f6eed4')); linea(x0 + 14, y0 + 6, x1 - 8, y0 + 6, hex('#9a8a6a')); });
  // la lupa sobre la hoja de en medio, que se mece un poco y agranda los números
  { const lx = Math.round(170 + Math.sin(t * 0.7) * 6), ly = Math.round(96 + Math.cos(t * 0.55) * 4), r = 13;
    for (let k = 0; k < 16; k++) { rect(lx + 9 + k, ly + 9 + k, lx + 11 + k, ly + 11 + k, C.k); } for (let k = 0; k < 14; k++) rect(lx + 10 + k, ly + 10 + k, lx + 11 + k, ly + 10 + k, hex('#5a3a22'));
    disco(lx, ly, r + 2, C.k); disco(lx, ly, r + 1, EP.laton); disco(lx, ly, r, hex('#f6eed4'));
    R.recorte([lx - 9, ly - 9, lx + 9, ly + 9]); const seq = '1701,89,'; e_cifras(R, seq, lx - 15 - Math.round(Math.sin(t * 0.7) * 6), ly - 8, hex('#3a2a40'), 2); e_cifras(R, '76,11', lx - 11 - Math.round(Math.sin(t * 0.7) * 6), ly + 4, hex('#3a2a40'), 2); R.recorte(null);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d > 0.86 && d <= 1) e_tinta(R, lx + i, ly + j, C.k, 0.25); } pset(lx - 6, ly - 7, C.blanco); pset(lx - 5, ly - 8, C.blanco); pset(lx - 7, ly - 6, hex('#ffffff')); }
  // el vapor de la taza y el humo de la pipa
  for (let i = 0; i < 10; i++) { const u = ((t * 0.45 + i / 10) % 1), y = 104 - u * 40, x = 284 + Math.sin(u * 7 + t * 1.2 + i) * (2 + u * 5); e_tinta(R, Math.round(x), Math.round(y), C.blanco, 0.5 * (1 - u)); }
  for (let i = 0; i < 10; i++) { const u = ((t * 0.3 + i / 10) % 1), y = 58 - u * 46, x = 38 + Math.sin(u * 6 + t * 0.9 + i * 0.5) * (1 + u * 7); e_tinta(R, Math.round(x), Math.round(y), hex('#d8dce0'), 0.45 * (1 - u)); }
  if (Math.sin(t * 2.3) > 0.2) pset(38, 61, hex('#e85a20'));
  // la luz del flexo (fuera de cuadro, a la izquierda), que tiembla apenas
  e_halo(R, 140, 92, 150, hex('#ffe8b0'), 0.18 + Math.sin(t * 3) * 0.01, 80);
  return { suelo: 180, libre: [60, 260], hojas };
}

// la esquina doblada de una hoja (arriba a la derecha)
function e_esquina(R, x1, y0) { R.poligono([[x1 - 5, y0], [x1 + 1, y0], [x1 + 1, y0 + 6]], hex('#2e5a3e')); R.poligono([[x1 - 5, y0], [x1, y0 + 5], [x1 - 5, y0 + 5]], hex('#d8c89c')); R.linea(x1 - 5, y0, x1, y0 + 5, hex('#b8a478')); }

function e_univac(R, t, o) {
  e_capa(R, 'bl_univac', () => e_univacFijo(R));
  const { rect, pset, linea, disco } = R;
  // los fluorescentes: uno parpadea
  for (const [a, b, y, p] of [[56, 104, 17, 0], [186, 236, 6, 1], [242, 270, 6, 0]]) { const fallo = p && ((t % 3.7) < 0.12 || ((t % 3.7) > 0.2 && (t % 3.7) < 0.26)); rect(a, y, b, y + 2, fallo ? hex('#9aa0a4') : EP.fluor); if (!fallo) rect(a + 2, y + 3, b - 2, y + 3, hex('#e8f0f0')); }
  // las bobinas de los cinco armarios de cintas, que giran a saltos, y los bucles de las columnas de vacío
  for (let k = 0; k < 5; k++) { const x0 = 8 + k * 34, ciclo = (t * 0.6 + k * 0.37) % 4, mueve = ciclo < 2.6, fase = mueve ? t * (k % 2 ? 4 : -5) + k : Math.floor(t) * 0.4 + k;
    for (const [dx, sgn] of [[9, 1], [23, -1]]) { const cx = x0 + dx, cy = 50, carga = sgn > 0 ? 6 : 4;
      e_bobina(R, cx, cy, fase * sgn, carga); }
    for (const dx of [8, 22]) { const L = 10 + Math.round(Math.sin(t * (mueve ? 3 : 0.3) + k * 1.3 + dx) * 6); rect(x0 + dx - 2, 64, x0 + dx + 2, 92, hex('#1e2028')); rect(x0 + dx - 1, 64, x0 + dx + 1, 64 + L, EP.cinta); rect(x0 + dx - 1, 64 + L, x0 + dx + 1, 64 + L, hex('#5a4a3a')); }
    pset(x0 + 5, 98, mueve ? hex('#40e060') : hex('#2a4a2a')); pset(x0 + 9, 98, !mueve ? hex('#f0b030') : hex('#4a3a1a')); }
  // la matriz de luces de la consola, que parpadea por filas
  for (let f = 0; f < 8; f++) for (let c = 0; c < 16; c++) { const on = h(c, f, Math.floor(t * (3 + f * 0.7)) + f * 13) < 0.45; const col = f < 2 ? (on ? hex('#ff5a3a') : hex('#4a1a14')) : f < 5 ? (on ? hex('#ffe070') : hex('#4a3a14')) : (on ? hex('#e8f0ff') : hex('#3a3e48'));
    rect(192 + c * 4, 50 + f * 4, 193 + c * 4, 51 + f * 4, col); }
  e_reloj(R, 292, 56, 7, t, 2.75, EP.pan, EP.panL);
  // el osciloscopio de la consola
  { const cx = 200, cy = 109; disco(cx, cy, 6, hex('#0a1a10')); for (let i = -5; i <= 5; i++) pset(cx + i, Math.round(cy + Math.sin(i * 0.9 + t * 6) * 3), hex('#7affa0')); pset(cx - 2, cy - 4, hex('#3a5a4a')); }
  // los dos operadores pequeños: uno cambia una cinta con los brazos arriba, otro cruza con una caja de fichas
  e_figurita(R, 76 + 16, 120, t, [hex('#e8e8e0'), hex('#5a3a22')], { brazos: Math.floor(t * 0.8) % 2 ? 'arriba' : null });
  { const u = (t * 0.07) % 1, x = 30 + u * 150, dirF = 1; if (x < 182) e_figurita(R, x, 121, t, [hex('#3a5a8a'), hex('#2a1e16')], { anda: true, brazos: 'lleva', dir: dirF }); }
  // la impresora de líneas: la tira de papel sale por arriba, se arquea hacia delante y cae (o.tira 0–1)
  const u = e_lim(o.tira ?? 0.6);
  e_impresoraLineas(R, t, u);
  if (u > 0.02) { const n = 40; let px = 270, py = 100;
    for (let i = 1; i <= n; i++) { const s = i / n * u, x = Math.round(270 - s * 30 + Math.sin(s * 9 + t * 1.3) * 1.2 * s), y = Math.round(100 - Math.sin(Math.min(1, s * 2.2) * Math.PI) * 9 + Math.max(0, s - 0.45) * 70);
      for (let w = -5; w <= 5; w++) { const c = Math.abs(w) === 5 ? EP.papelCS : Math.abs(w) === 4 ? (i % 2 ? hex('#8a8c80') : EP.papelC) : (i % 2 === 0 && w > -3 && w < 3 && h(i, w, 80) < 0.6) ? hex('#3a3c4a') : i % 4 === 1 ? EP.verdeBand : EP.papelC; pset(x + w, y, c); pset(px + w, Math.round((y + py) / 2), c); }
      px = x; py = y; }
    rect(px - 5, py, px + 5, py, EP.papelCS); }
  return { suelo: 150, libre: [60, 240], tira: [Math.round(270 - u * 30), Math.round(100 - Math.sin(Math.min(1, u * 2.2) * Math.PI) * 9 + Math.max(0, u - 0.45) * 70)], impresora: [252, 100, 308, 150], consola: [184, 40, 266, 118], cintas: [8, 34, 178, 118] };
}

// una bobina de cinta magnética de r 7,5 que gira (giro: el ángulo): la brida de plástico azulado con sus tres ventanas
// (por ellas se ve el rollo de cinta, de radio carga), el canto con luz y el buje blanco con sus muescas
function e_bobina(R, cx, cy, giro, carga) {
  for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i + 0.5, j + 0.5); if (d > 7.6) continue;
    const a = (((Math.atan2(j + 0.5, i + 0.5) - giro) % 2.0944) + 2.0944) % 2.0944; let c;
    if (d > 6.9) c = i + j < -2 ? hex('#c8d4e4') : hex('#5a6678');
    else if (d < 2.6) c = a < 0.45 ? hex('#3a3e48') : (i + j < 0 ? C.blanco : hex('#c8ccd4'));
    else if (a < 1.25 && d > 3.3 && d < 6.4) c = d < carga ? (h(i, j, 940) < 0.3 ? hex('#4a3a2e') : EP.cinta) : hex('#16181e');
    else c = d < carga ? hex('#5a4a3e') : (i + j < -4 ? hex('#a8b4c8') : hex('#8a96aa'));
    R.pset(cx + i, cy + j, c); }
}

// la impresora de líneas (de pie en el suelo, y 150): el cuerpo de dos tonos con su tapa de cristal ahumado, el rodillo, el
// martilleo que se ve por la ventanilla, la pila de papel plegado del cesto de atrás (crece con u) y los pilotos
function e_impresoraLineas(R, t, u) {
  const { rect, pset, linea } = R, x0 = 252, x1 = 308;
  rect(x0, 100, x1, 150, C.k); rect(x0 + 1, 101, x1 - 1, 149, EP.pan); rect(x0 + 1, 101, x0 + 1, 149, EP.panL); rect(x1 - 1, 101, x1 - 1, 149, EP.panS);
  rect(x0 + 1, 101, x1 - 1, 108, EP.az); rect(x0 + 1, 101, x1 - 1, 101, EP.azL); rect(x0 + 1, 108, x1 - 1, 108, EP.azS);
  rect(x0 + 6, 111, x1 - 6, 124, hex('#2a3038')); rect(x0 + 7, 112, x1 - 7, 112, hex('#4a5460'));
  { const hx = x0 + 8 + Math.round(((t * 40) % 40)); rect(x0 + 7, 118, x1 - 7, 120, EP.papelC); for (let x = x0 + 8; x < hx; x += 2) pset(x, 119, hex('#3a3c4a')); rect(hx, 116, hx + 2, 121, EP.panS); }
  rect(x0 + 4, 128, x1 - 4, 146, EP.panS); rect(x0 + 5, 129, x1 - 5, 145, EP.pan); linea(x0 + 5, 137, x1 - 5, 137, EP.panS); rect((x0 + x1) / 2 - 3, 135, (x0 + x1) / 2 + 3, 136, EP.panD);
  for (let i = 0; i < 4; i++) pset(x0 + 8 + i * 4, 105, i === 0 ? (Math.sin(t * 6) > 0 ? hex('#40e060') : hex('#1a4a2a')) : [hex('#ffe070'), hex('#ff5a3a'), hex('#e8f0ff')][i - 1]);
  rect(x0 + 30, 104, x0 + 36, 105, EP.nar);
  // la boca de salida del papel, arriba
  rect(264, 99, 276, 101, hex('#1a1c22'));
  // el cesto de atrás con el papel plegado que se apila
  const alto = Math.round(4 + u * 10); for (let i = 0; i < alto; i++) { const y = 99 - i; rect(282, y, 304, y, i % 2 ? EP.papelC : EP.papelCS); pset(282 + (i % 2 ? 0 : 22), y, EP.verdeBand); }
}

// lo fijo de la sala del ordenador de 1970 (va en su búfer)
function e_univacFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo de placas acústicas perforadas
  for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) { const j = x % 24 === 0 || y % 11 === 0; pset(x, y, j ? EP.techoS : ((x * 3 + y * 5) % 7 === 0 ? hex('#c8cac6') : EP.techo)); }
  for (const [a, b, y] of [[54, 106, 16], [184, 238, 5], [240, 272, 5]]) { rect(a, y - 1, b, y + 4, hex('#a8aaa8')); rect(a + 1, y, b - 1, y + 3, hex('#c8d0d0')); }
  rect(0, 22, 319, 23, EP.panD);
  // la pared de paneles beige con juntas y remaches
  for (let y = 24; y < 120; y++) for (let x = 0; x < 320; x++) { const j = x % 32 === 0 || (y - 24) % 48 === 0; pset(x, y, j ? EP.panS : h(x >> 2, y >> 2, 81) < 0.08 ? EP.panS : EP.panL); }
  for (let x = 0; x < 320; x += 32) for (const y of [27, 69, 117]) pset(x + 2, y, EP.panD);
  rect(0, 118, 319, 120, EP.panD);
  // el reloj de pared y un letrero de «prohibido fumar» con su pictograma
  // los cinco armarios de cintas (las bobinas y los bucles se pintan cada fotograma)
  for (let k = 0; k < 5; k++) { const x0 = 8 + k * 34;
    rect(x0 - 1, 32, x0 + 32, 119, C.k); rect(x0, 33, x0 + 31, 118, EP.pan); rect(x0, 33, x0, 118, EP.panL); rect(x0 + 31, 33, x0 + 31, 118, EP.panS);
    rect(x0, 33, x0 + 31, 38, EP.az); rect(x0, 33, x0 + 31, 33, EP.azL); for (let i = 0; i < 4; i++) pset(x0 + 4 + i * 3, 35, hex('#e8f0ff'));
    rect(x0 + 1, 40, x0 + 30, 61, hex('#1e2028')); rect(x0 + 1, 40, x0 + 30, 40, hex('#5a6070')); linea(x0 + 2, 41, x0 + 8, 60, hex('#3a4050'));
    rect(x0 + 1, 62, x0 + 30, 94, EP.panS); rect(x0 + 2, 63, x0 + 29, 93, hex('#2a2c34'));
    rect(x0 + 2, 96, x0 + 29, 100, EP.panD); for (let i = 0; i < 5; i++) rect(x0 + 13 + i * 3, 97, x0 + 14 + i * 3, 99, i === 2 ? EP.nar : hex('#e8e8e0'));
    rect(x0 + 2, 104, x0 + 29, 116, EP.pan); rect(x0 + 2, 104, x0 + 29, 104, EP.panS); for (let y = 107; y < 116; y += 2) linea(x0 + 6, y, x0 + 25, y, EP.panS); }
  // la consola de luces: el armario, el panel negro, la fila de interruptores y el pupitre
  rect(183, 40, 267, 119, C.k); rect(184, 41, 266, 118, EP.pan); rect(184, 41, 266, 44, EP.az); rect(184, 41, 266, 41, EP.azL);
  rect(188, 47, 258, 84, hex('#1a1c22')); rect(188, 47, 258, 47, hex('#3a3e48'));
  for (let i = 0; i < 16; i++) { const x = 192 + i * 4; rect(x, 88, x + 1, 92, hex('#2a2c32')); rect(x, 88 + (i * 7) % 3, x + 1, 88 + (i * 7) % 3 + 1, i % 4 === 0 ? EP.nar : hex('#e8e8e0')); }
  rect(186, 98, 264, 102, EP.panS); rect(186, 98, 264, 98, EP.panL); rect(188, 104, 262, 116, EP.pan); for (let x = 192; x < 260; x += 10) rect(x, 106, x + 6, 114, EP.panS);
  disco(200, 109, 8, hex('#3a3e48')); disco(200, 109, 7, hex('#0a1a10'));
  // el suelo técnico de placas en perspectiva, con algunas perforadas
  for (let y = 121; y < 180; y++) { const p = y - 30, fila = Math.floor(Math.log(p) * 6.5), fr = (Math.log(p) * 6.5) % 1;
    for (let x = 0; x < 320; x++) { const u = (x - 160) / p * 3.4, cu = Math.floor(u), f = u - cu; let c = (cu + fila) % 2 ? EP.st : EP.stL;
      if (f < 0.05 || fr < 0.07) c = EP.stD; else if (f > 0.95 || fr > 0.94) c = EP.stS; else if ((cu * 3 + fila) % 5 === 0 && (x + y) % 3 === 0 && fr > 0.2 && fr < 0.8 && f > 0.2 && f < 0.8) c = EP.stS;
      pset(x, y, h(x, y, 82) < 0.03 ? EP.stS : c); } }
  // una placa levantada y apoyada, con los cables a la vista (rojo, azul, gris)
  poligono([[16, 166], [52, 166], [56, 178], [12, 178]], hex('#1a1a20'));
  for (let i = 0; i < 4; i++) { const c = [hex('#c83a3a'), hex('#3a5a9a'), hex('#8a8a92'), hex('#e8c040')][i]; for (let x = 14; x < 55; x++) pset(x, Math.round(171 + i * 1.6 + Math.sin(x * 0.3 + i) * 1.2), c); }
  poligono([[50, 158], [74, 156], [78, 170], [56, 172]], EP.stL); linea(50, 158, 74, 156, C.blanco); linea(56, 172, 78, 170, EP.stD); linea(74, 156, 78, 170, EP.stS);
  for (let i = 0; i < 5; i++) pset(58 + i * 3, 164 + (i % 2), EP.stS);
  // el cartel de un diagrama de flujo (cajas, rombos y flechas, sin letras) en la pared de la derecha
  rect(276, 66, 314, 98, EP.panD); rect(277, 67, 313, 97, hex('#f4f2ea'));
  for (const [x, y, w] of [[290, 70, 10], [288, 80, 14], [280, 89, 10], [300, 89, 10]]) { rect(x, y, x + w, y + 5, hex('#2a4a8a')); rect(x + 1, y + 1, x + w - 1, y + 4, hex('#d8e4f4')); }
  linea(295, 76, 295, 79, hex('#2a4a8a')); linea(290, 86, 285, 88, hex('#2a4a8a')); linea(300, 86, 305, 88, hex('#2a4a8a')); pset(279, 72, hex('#c83a3a')); pset(310, 72, hex('#c83a3a'));
  // la sombra de las máquinas en el suelo y el reflejo de los fluorescentes en las placas
  for (let y = 121; y < 127; y++) for (let x = 0; x < 320; x++) if ((x < 180 || (x > 182 && x < 268)) && (x + y) % 2 === 0) e_tinta(R, x, y, C.k, 0.3 - (y - 121) * 0.05);
  for (const [cx, w] of [[80, 26], [210, 30]]) for (let y = 128; y < 178; y += 2) { const ww = w * (1 + (y - 128) * 0.02), xc = Math.round(cx + (cx - 160) * (y - 128) * 0.012); for (let x = Math.round(xc - ww); x <= xc + ww; x++) if ((x + (y >> 1)) % 3 === 0) e_tinta(R, x, y, C.blanco, 0.16); }
  // el extintor rojo junto a la consola
  rect(270, 96, 276, 118, C.k); rect(271, 98, 275, 117, hex('#c8302a')); rect(271, 98, 271, 117, hex('#e85a4a')); rect(272, 93, 274, 97, C.k); linea(275, 95, 279, 99, C.k);
}

// lo que va por delante en la sala de 1970: un carro de cintas en la esquina de abajo a la izquierda
function e_univacDelante(R, t, o) {
  const { rect, pset, disco } = R;
  e_sombra(R, 22, 177, 22, 3, 0.6);
  rect(2, 156, 40, 158, C.k); rect(3, 156, 39, 157, EP.stL); rect(3, 170, 39, 172, C.k); rect(4, 158, 5, 172, EP.stD); rect(36, 158, 37, 172, EP.stD);
  for (let i = 0; i < 3; i++) { const x = 10 + i * 11; disco(x, 151, 5, C.k); disco(x, 151, 4, EP.cinta); disco(x, 151, 1.5, hex('#c8ccd4')); pset(x - 2, 148, hex('#6a5a4a')); rect(x - 5, 156, x + 5, 156, i === 1 ? EP.nar : EP.az); }
  for (const x of [6, 34]) { disco(x, 175, 2.5, C.k); pset(x, 175, EP.stS); }
  return { suelo: 150, libre: [60, 240] };
}

function e_rand(R, t, o) {
  e_capa(R, 'bl_rand', () => e_randFijo(R));
  const { rect, pset, linea, disco } = R;
  // la ventana: California por las lamas (cielo, nubes, colinas, el mar que brilla, palmeras que se mecen, una gaviota)
  const rc = [198, 26, 264, 94];
  e_cielo(R, rc, t, [hex('#5aa8e0'), hex('#78bce8'), EP.calif, EP.califL], [C.blanco, hex('#e2ecf6'), hex('#b8cce2')], 20);
  R.recorte(rc);
  for (let x = rc[0]; x <= rc[2]; x++) { const a = 66 + Math.round(Math.sin(x * 0.07) * 4 + Math.sin(x * 0.23) * 1.5); for (let y = a; y <= 76; y++) pset(x, y, h(x, y, 83) < 0.3 ? EP.colinaS : EP.colina); }
  for (let y = 76; y <= 82; y++) for (let x = rc[0]; x <= rc[2]; x++) pset(x, y, Math.sin(x * 0.8 + y * 2 + t * 3) > 0.85 ? C.blanco : (y === 76 ? hex('#5aa0d0') : EP.mar80));
  for (let y = 83; y <= 94; y++) for (let x = rc[0]; x <= rc[2]; x++) pset(x, y, h(x >> 1, y, 84) < 0.4 ? hex('#c8b888') : hex('#d8c898'));
  for (const [px, alto, k] of [[212, 40, 0], [252, 34, 1], [236, 22, 2]]) { const base = 92, top = base - alto, mec = Math.sin(t * 1.1 + k) * 2;
    for (let y = top; y <= base; y++) { const x = Math.round(px + (y - base) * 0.08 + mec * (base - y) / alto * 0.6); pset(x, y, hex('#7a5a3a')); pset(x + 1, y, (y % 3) ? hex('#6a4a2a') : hex('#8a6a4a')); }
    const tx = Math.round(px + (top - base) * 0.08 + mec * 0.6);
    for (let f = 0; f < 7; f++) { const a = f / 7 * Math.PI * 2 + Math.sin(t * 1.4 + f + k) * 0.15; for (let i = 1; i < 11; i++) { const x = Math.round(tx + Math.cos(a) * i), y = Math.round(top + Math.sin(a) * i * 0.6 + i * i * 0.05); pset(x, y, i < 4 ? EP.palmaS : EP.palma); if (i % 2) pset(x, y + 1, EP.palmaS); } } }
  { const gx = rc[0] + ((t * 7) % 80) - 6, gy = 40 + Math.sin(t * 0.8) * 4; e_pajaro(R, gx, gy, t, hex('#f0f0f0')); pset(Math.round(gx), Math.round(gy) + 1, hex('#8a8a8a')); }
  R.recorte(null);
  // las lamas de la persiana por encima (dejan ver entre ellas) y el cordón que se mece
  for (let y = rc[1]; y <= rc[3]; y += 5) { rect(rc[0], y, rc[2], y + 1, EP.pers); rect(rc[0], y + 2, rc[2], y + 2, EP.persS); }
  for (const x of [214, 248]) linea(x, rc[1], x, rc[3], EP.persS);
  { const sw = Math.sin(t * 1.2) * 2; linea(262, 26, Math.round(262 + sw), 106, hex('#d8ccb0')); rect(Math.round(261 + sw), 106, Math.round(263 + sw), 109, EP.persS); }
  // las rayas de luz de la persiana en la moqueta y en el archivador
  for (let y = 120; y < 180; y++) { if (Math.floor((y - 120) / 3) % 2) continue; for (let x = Math.round(150 + (y - 120) * -0.9); x < 250 + (y - 120) * -0.4; x++) if ((x + y) % 2 === 0) e_tinta(R, x, y, hex('#fff0c8'), 0.2); }
  // el ventilador que oscila sobre el archivador (las aspas giran, la cabeza va y viene) y los papeles que se mueven
  { const fx = 162, fy = 70, giro = Math.sin(t * 0.8) * 4; disco(fx + giro * 0.3, fy, 7, hex('#6a6a70')); disco(fx + giro * 0.3, fy, 6, hex('#b8bcc4'));
    for (let a = 0; a < 3; a++) { const an = t * 18 + a * 2.09; linea(Math.round(fx + giro * 0.3), fy, Math.round(fx + giro * 0.3 + Math.cos(an) * 5 * (0.6 + Math.abs(Math.cos(t * 0.8)) * 0.4)), Math.round(fy + Math.sin(an) * 5), hex('#8a8e98')); }
    disco(fx + giro * 0.3, fy, 1.5, hex('#4a4a50')); for (let r = 0; r < 7; r += 2) R.anillo(fx + giro * 0.3 + 0.5, fy + 0.5, r + 1, hex('#5a5a62'), 2);
    rect(fx - 1, 77, fx + 1, 82, hex('#6a6a70')); rect(fx - 6, 82, fx + 6, 84, hex('#5a5a62'));
    const ondea = Math.round(Math.sin(t * 5) * 1.5); R.poligono([[134, 52], [146, 52], [146 + ondea, 64], [134 + ondea, 64]], C.blanco); linea(136, 56, 143 + ondea, 56, hex('#aab0c0')); linea(136, 59, 142 + ondea, 59, hex('#aab0c0')); }
  e_reloj(R, 176, 30, 7, t, 4.2, hex('#3a3a42'), hex('#6a6a74'));
  // la impresora matricial: el cabezal que va y viene y el papel que sale y cae plegado al suelo
  { const hx = 112 + Math.round(Math.abs(((t * 1.6) % 2) - 1) * 22); rect(108, 108, 138, 110, hex('#2a2a2e')); rect(hx, 106, hx + 3, 109, hex('#5a5a62')); rect(hx + 1, 106, hx + 2, 106, hex('#8a8a92'));
    const sube = (t * 2) % 4; for (let i = 0; i < 4; i++) { const y = Math.round(104 - i * 3 - sube); if (y > 92) { rect(111, y, 135, y, i % 2 ? EP.papelC : EP.papelCS); pset(111, y, EP.verdeBand); pset(135, y, EP.verdeBand); } } }
  return { suelo: 150, libre: [40, 140], pizarra: [24, 30, 104, 84], ventana: [196, 24, 266, 96], impresora: [104, 100, 142, 150], pantalla: [227, 113, 249, 129] };
}

// lo fijo del despacho de 1980 (va en su búfer)
function e_randFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // la pared beige de gotelé, el techo de placas con su perfil y el rodapié
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 85); pset(x, y, y < 8 ? ((x % 30 === 0 || y === 7) ? EP.beS : EP.beL) : v < 0.1 ? EP.beS : v > 0.94 ? EP.beL : EP.be); }
  rect(0, 8, 319, 8, EP.beD); rect(0, 114, 319, 117, hex('#6a5038')); rect(0, 114, 319, 114, hex('#8a6a4a'));
  // la moqueta, apretada y con su textura
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 86) + h(x >> 2, y >> 1, 87) * 0.5; pset(x, y, v > 1.2 ? EP.moqL : v < 0.35 ? EP.moqS : EP.moq); }
  for (let y = 118; y < 124; y++) for (let x = 0; x < 320; x++) e_tinta(R, x, y, C.k, 0.25 - (y - 118) * 0.04);
  // la pizarra blanca con su marco de aluminio, las cifras en rotulador, flechas, círculos y la bandeja con rotuladores
  rect(22, 28, 106, 86, hex('#8a8e96')); rect(23, 29, 105, 85, hex('#c8ccd4')); rect(25, 31, 103, 83, hex('#f6f6f2'));
  for (let y = 31; y < 84; y++) for (let x = 25; x < 104; x++) if (h(x >> 2, y >> 1, 88) < 0.08) pset(x, y, hex('#e4e6ec'));
  for (let f = 0; f < 6; f++) e_cifras(R, e_BEALE.slice(f * 4, f * 4 + 4).join(','), 28, 34 + f * 8, f % 2 ? hex('#2a4ab0') : hex('#1a1a2a'));
  R.anillo(84, 40, 5, hex('#c82a2a')); e_cifras(R, '71', 81, 38, hex('#c82a2a')); linea(84, 46, 84, 60, hex('#c82a2a')); linea(81, 57, 84, 60, hex('#c82a2a')); linea(87, 57, 84, 60, hex('#c82a2a'));
  e_cifras(R, '1', 82, 64, hex('#c82a2a'), 2); for (let i = 0; i < 3; i++) R.rect(30 + i * 20, 80, 44 + i * 20, 80, hex('#2a4ab0'));
  rect(30, 87, 98, 88, hex('#8a8e96')); rect(40, 86, 46, 86, hex('#c82a2a')); rect(50, 86, 56, 86, hex('#2a4ab0')); rect(60, 86, 66, 86, hex('#1a1a2a'));
  // el corcho con listados de papel continuo, una foto y un calendario de números
  rect(112, 34, 152, 76, hex('#5a3a22')); for (let y = 35; y < 76; y++) for (let x = 113; x < 152; x++) pset(x, y, h(x, y, 89) < 0.3 ? EP.corchoS : h(x, y, 90) < 0.1 ? EP.corchoL : EP.corcho);
  rect(116, 38, 128, 66, EP.papelC); for (let y = 40; y < 66; y += 4) linea(116, y, 128, y, EP.verdeBand); for (let y = 39; y < 66; y += 2) linea(118, y, 118 + Math.round(h(y, 1, 91) * 8), y, hex('#5a5a6a')); pset(122, 37, hex('#c82a2a'));
  rect(132, 40, 148, 56, C.blanco); rect(132, 40, 148, 43, hex('#c82a2a')); for (let f = 0; f < 3; f++) for (let c = 0; c < 4; c++) e_cifras(R, (f * 4 + c + 1) % 10, 133 + c * 4, 45 + f * 4 - (f ? 1 : 0), hex('#3a3a4a'));
  rect(132, 60, 146, 72, hex('#e8e0d0')); rect(133, 61, 145, 69, hex('#78b0d8')); rect(133, 66, 145, 69, hex('#c8a868')); pset(139, 60, hex('#2a6ac8'));
  // el archivador beige (el ventilador va encima, cada fotograma)
  rect(150, 84, 176, 117, C.k); rect(151, 85, 175, 116, EP.be); rect(151, 85, 151, 116, EP.beL); rect(175, 85, 175, 116, EP.beS);
  for (let d = 0; d < 3; d++) { const y = 87 + d * 10; rect(152, y, 174, y + 8, EP.beS); rect(153, y + 1, 173, y + 7, EP.be); rect(160, y + 3, 166, y + 4, hex('#8a8a92')); }
  // el marco de la ventana y el alféizar
  rect(195, 23, 267, 25, hex('#d8d0bc')); rect(195, 95, 267, 98, hex('#d8d0bc')); rect(195, 98, 267, 99, EP.beS); rect(195, 23, 197, 97, hex('#d8d0bc')); rect(265, 23, 267, 97, EP.beS);
  // la sombra de la luz en la pared bajo la ventana
  // el ficus en su maceta
  rect(280, 102, 300, 118, C.k); rect(281, 103, 299, 117, hex('#a85a3a')); rect(281, 103, 299, 105, hex('#c87a4a')); rect(282, 106, 284, 117, hex('#c87a4a'));
  linea(290, 102, 288, 60, hex('#6a4a2a')); linea(290, 90, 300, 72, hex('#6a4a2a')); linea(289, 80, 278, 66, hex('#6a4a2a'));
  for (let i = 0; i < 26; i++) { const lx = 276 + Math.floor(h(i, 1, 92) * 30), ly = 52 + Math.floor(h(i, 2, 92) * 46); R.poligono([[lx, ly], [lx + 3, ly - 2], [lx + 6, ly], [lx + 3, ly + 2]], h(i, 3, 92) < 0.4 ? EP.ficusL : EP.ficus); pset(lx + 2, ly - 1, hex('#6aa860')); }
  // el pie de la impresora matricial y su cuerpo
  rect(104, 112, 142, 116, hex('#3a3a3e')); rect(106, 116, 108, 150, hex('#3a3a3e')); rect(138, 116, 140, 150, hex('#3a3a3e')); rect(106, 140, 140, 141, hex('#3a3a3e'));
  rect(104, 104, 142, 112, C.k); rect(105, 105, 141, 111, EP.beL); rect(105, 105, 141, 105, C.blanco); rect(130, 108, 138, 110, EP.beS); pset(132, 107, hex('#40e060'));
  // el papel continuo plegado que cae al suelo en zigzag
  for (let i = 0; i < 9; i++) { const y = 141 + i * 2, x = 102 + (i % 2) * 4; rect(x, y, x + 34, y + 1, i % 2 ? EP.papelC : EP.papelCS); pset(x, y, EP.verdeBand); pset(x + 34, y, EP.verdeBand); if (i % 2 === 0) linea(x + 4, y, x + 4 + Math.round(h(i, 1, 93) * 20), y, hex('#9a9c90')); }
  for (let i = 0; i < 6; i++) { const y = 113 + i * 5; linea(112 - (i % 2) * 2, y, 112 - ((i + 1) % 2) * 2, y + 5, EP.papelCS); linea(134 + (i % 2) * 2, y, 134 + ((i + 1) % 2) * 2, y + 5, EP.papelCS); }
}

// la mesa del terminal de 1980 (delante de los personajes): tablero de formica imitación madera, el faldón, el TERMINAL de
// tres cuartos con su pantalla (o.pantalla o filas de números ámbar que corren, o verdes con o.verde), el teclado, la
// taza, los listados y el bote de bolígrafos
function e_randDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  e_sombra(R, 212, 176, 64, 3, 0.6);
  rect(150, 140, 272, 145, C.k); rect(151, 140, 271, 143, hex('#a87a4a')); rect(151, 140, 271, 140, hex('#c8986a')); for (let x = 152; x < 271; x++) if (h(x >> 2, 1, 94) < 0.5 && h(x, 2, 94) < 0.3) pset(x, 142, hex('#8a6038'));
  rect(152, 145, 270, 172, hex('#7a5232')); rect(152, 145, 270, 146, hex('#5a3a22')); rect(155, 148, 205, 170, hex('#8a6038')); rect(155, 148, 205, 148, hex('#a87a4a')); rect(178, 157, 184, 158, hex('#c8c8d0'));
  rect(210, 148, 267, 170, hex('#5a3a22')); rect(152, 171, 156, 179, hex('#5a3a22')); rect(266, 171, 270, 179, hex('#5a3a22'));
  // el terminal: caja beige en tres cuartos, el tubo y la pantalla
  rect(220, 106, 258, 136, C.k); rect(221, 107, 257, 135, EP.beL); rect(221, 107, 257, 108, C.blanco); rect(252, 109, 256, 135, EP.be); rect(221, 133, 257, 135, EP.beS);
  poligono([[228, 106], [252, 106], [248, 98], [232, 98]], EP.be); linea(232, 98, 248, 98, EP.beL);
  const sc = [227, 113, 249, 129], verde = o.verde, fos = verde ? hex('#0a1a0e') : EP.fos, tinta = verde ? hex('#6aff8a') : EP.amb, tintaL = verde ? hex('#c8ffd0') : EP.ambL;
  rect(sc[0] - 2, sc[1] - 2, sc[2] + 2, sc[3] + 2, hex('#3a3830')); rect(sc[0], sc[1], sc[2], sc[3], fos);
  if (o.pantalla) { R.recorte(sc); o.pantalla(R, sc, t); R.recorte(null); }
  else { const avance = Math.floor(t * 2.5); for (let f = 0; f < 4; f++) { const s = e_BEALE.slice((avance + f) % 200, (avance + f) % 200 + 3).join(','); R.recorte(sc); e_cifras(R, s, sc[0] + 1, sc[1] + 1 + f * 4 - 0, f === 3 ? tintaL : tinta); R.recorte(null); }
    if (Math.floor(t * 2) % 2) rect(sc[0] + 18, sc[3] - 2, sc[0] + 20, sc[3] - 1, tintaL); }
  for (let y = sc[1]; y <= sc[3]; y += 2) for (let x = sc[0]; x <= sc[2]; x++) e_tinta(R, x, y, C.k, 0.18);
  pset(sc[0], sc[1], hex('#3a3830')); pset(sc[2], sc[1], hex('#3a3830')); pset(sc[0], sc[3], hex('#3a3830')); pset(sc[2], sc[3], hex('#3a3830')); pset(sc[0] + 2, sc[1] + 1, e_mez(tintaL, C.blanco, 0.5));
  e_halo(R, 238, 121, 22, verde ? hex('#6aff8a') : EP.amb, 0.12);
  // el teclado
  poligono([[214, 136], [250, 136], [254, 141], [210, 141]], C.k); poligono([[215, 137], [249, 137], [252, 140], [212, 140]], EP.be);
  for (let f = 0; f < 2; f++) for (let i = 0; i < 9; i++) pset(216 + i * 4 - f, 138 + f, (Math.floor(t * 5) % 17) === i + f * 9 ? EP.beD : EP.beL);
  // los listados, la taza con el vapor y el bote de bolígrafos
  rect(162, 136, 178, 139, EP.papelC); rect(163, 133, 177, 136, EP.papelCS); rect(164, 130, 176, 133, EP.papelC); for (let y = 131; y < 139; y += 2) linea(165, y, 165 + Math.round(h(y, 3, 95) * 10), y, hex('#7a7c70')); pset(164, 131, EP.verdeBand);
  rect(152, 130, 159, 139, C.k); rect(153, 131, 158, 138, hex('#c83a2a')); rect(153, 131, 158, 131, hex('#e86a5a')); rect(159, 133, 161, 136, C.k); rect(153, 131, 158, 132, hex('#3a2416'));
  for (let i = 0; i < 6; i++) { const u = ((t * 0.5 + i / 6) % 1); e_tinta(R, Math.round(155 + Math.sin(u * 7 + t) * 2 * u), Math.round(129 - u * 16), C.blanco, 0.5 * (1 - u)); }
  rect(262, 130, 268, 139, C.k); rect(263, 131, 267, 138, hex('#4a6a8a')); for (const [x, c] of [[263, '#c82a2a'], [265, '#2a4ab0'], [267, '#1a1a1a']]) linea(x, 124, x + (x - 265) * 0.5, 130, hex(c));
  return { suelo: 150, libre: [40, 140], pantalla: sc, mesa: [150, 140, 272, 172] };
}

// el terminal de cerca: el marco beige con su curva, la pantalla con las rayas de barrido y el brillo del fósforo (o la
// escena dentro, o.pantalla), el teclado abajo y la persiana detrás con su luz
function e_randPantalla(R, t, o) {
  e_capa(R, 'bl_randPantalla', () => {
    const { rect, pset, linea, disco, poligono } = R;
    // la pared con la persiana detrás (rayas de luz), y el tablero
    for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const l = (y % 6) < 3 && x > 180; pset(x, y, l ? (h(x, y, 96) < 0.2 ? EP.beL : hex('#f0e6cc')) : h(x, y, 97) < 0.1 ? EP.beS : EP.be); }
    for (let y = 0; y < 150; y += 6) linea(181, y + 3, 319, y + 3, EP.beS);
    rect(0, 150, 319, 179, hex('#a87a4a')); for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 98) < 0.25) pset(x, y, hex('#8a6038')); rect(0, 150, 319, 150, hex('#c8986a'));
    // la caja del monitor y su bisel con la curva del tubo
    rect(48, 18, 272, 146, C.k); rect(49, 19, 271, 145, EP.beL); rect(49, 19, 271, 21, C.blanco); rect(266, 22, 271, 145, EP.be); rect(49, 140, 271, 145, EP.beS);
    rect(58, 26, 262, 132, EP.beS); rect(60, 28, 260, 130, hex('#2a2820')); rect(60, 28, 260, 28, hex('#1a1810'));
    for (let i = 0; i < 4; i++) rect(230 + i * 6, 136, 233 + i * 6, 137, EP.beD); pset(70, 136, hex('#40e060')); rect(74, 136, 82, 137, EP.beS);
    for (let x = 60; x < 260; x += 3) pset(x, 143, EP.beD);
    // el teclado
    poligono([[40, 158], [280, 158], [292, 180], [28, 180]], C.k); poligono([[42, 159], [278, 159], [289, 180], [31, 180]], EP.be);
    for (let f = 0; f < 4; f++) for (let i = 0; i < 18; i++) { const x = 46 + i * 13 - f * 3 + Math.round(f * 0.5), y = 161 + f * 5; rect(x, y, x + 10, y + 3, EP.beD); rect(x, y, x + 9, y + 2, EP.beL); rect(x + 1, y + 1, x + 8, y + 1, C.blanco); }
  });
  const sc = [64, 32, 256, 126], verde = o.verde, fos = verde ? hex('#06140a') : EP.fos, tinta = verde ? hex('#6aff8a') : EP.amb, tintaL = verde ? hex('#c8ffd0') : EP.ambL, { rect, pset } = R;
  R.disco(160, 79, 0, fos); rect(sc[0], sc[1], sc[2], sc[3], fos);
  // las esquinas redondeadas del tubo
  for (const [cx, cy, sx, sy] of [[sc[0], sc[1], 1, 1], [sc[2], sc[1], -1, 1], [sc[0], sc[3], 1, -1], [sc[2], sc[3], -1, -1]]) for (let j = 0; j < 5; j++) for (let i = 0; i < 5; i++) if (Math.hypot(5 - i, 5 - j) > 5) pset(cx + i * sx, cy + j * sy, hex('#2a2820'));
  if (o.pantalla) { R.recorte(sc); o.pantalla(R, sc, t); R.recorte(null); }
  else { R.recorte(sc); const avance = Math.floor(t * 3); for (let f = 0; f < 12; f++) { const k = (avance + f) % 220; e_cifras(R, e_BEALE.slice(k, k + 7).join(','), sc[0] + 6, sc[1] + 4 + f * 7, f === 11 ? tintaL : tinta); }
    if (Math.floor(t * 2) % 2) rect(sc[0] + 6, sc[3] - 7, sc[0] + 9, sc[3] - 3, tintaL); R.recorte(null); }
  // el resplandor del fósforo, las rayas de barrido, una banda que baja y el reflejo de la ventana en el cristal
  const banda = sc[1] + Math.round((t * 22) % (sc[3] - sc[1] + 20)) - 10;
  for (let y = sc[1]; y <= sc[3]; y++) { const scan = y % 2 === 0, b = Math.abs(y - banda) < 3; for (let x = sc[0]; x <= sc[2]; x++) { if (scan) e_tinta(R, x, y, C.k, 0.22); else if (b) e_tinta(R, x, y, tinta, 0.08); } }
  for (let i = 0; i < 30; i++) { const x = sc[2] - 40 + i, y = sc[1] + 6 + Math.round(i * 0.4); if (i % 3 !== 2) e_tinta(R, x, y, C.blanco, 0.12); }
  return { suelo: 180, libre: [64, 256], pantalla: sc };
}

function e_estudio(R, t, o) {
  e_capa(R, 'bl_estudio', () => e_estudioFijo(R));
  const { rect, pset, linea, disco } = R;
  // la ventana al anochecer: cielo con nubes, tejados con ventanas que se encienden, la farola y los coches que pasan
  const rc = [216, 32, 260, 90];
  e_cielo(R, rc, t, [EP.ocaso1, EP.ocaso1, EP.ocaso2, EP.ocaso3, EP.ocaso4], [hex('#f0a08a'), hex('#b0607a'), hex('#6a3a6a')], 30);
  R.recorte(rc);
  for (let x = rc[0]; x <= rc[2]; x++) { const a = 68 + (Math.floor(x / 9) % 3) * 3 + (x % 9 < 4 ? -2 : 0); for (let y = a; y <= 82; y++) pset(x, y, hex('#1e1a2e')); }
  for (let i = 0; i < 7; i++) { const wx = 219 + i * 6, wy = 72 + (i % 2) * 4, on = Math.sin(t * 0.3 + i * 1.7) > -0.4; rect(wx, wy, wx + 1, wy + 1, on ? hex('#ffd880') : hex('#2e2a40')); }
  rect(rc[0], 83, rc[2], 90, hex('#2a2a36')); for (let x = rc[0]; x <= rc[2]; x += 4) pset(x, 86, hex('#6a6a5a'));
  { const fa = Math.sin(t * 0.5) > -0.8; linea(250, 60, 250, 84, hex('#1a1a22')); rect(247, 59, 251, 60, hex('#1a1a22')); pset(247, 61, fa ? hex('#fff0a0') : hex('#4a4a3a')); if (fa) e_halo(R, 247, 64, 7, hex('#ffe0a0'), 0.4); }
  for (let k = 0; k < 2; k++) { const u = ((t * (0.18 + k * 0.07) + k * 0.5) % 1.4), x = Math.round(k ? rc[2] + 10 - u * 80 : rc[0] - 10 + u * 80); if (u > 1.2) continue;
    rect(x - 5, 84, x + 5, 87, k ? hex('#6a2a2a') : hex('#3a4a6a')); rect(x - 3, 82, x + 2, 84, k ? hex('#5a2222') : hex('#2e3a54')); pset(x + (k ? -6 : 6), 85, hex('#fff6c0')); e_tinta(R, x + (k ? -8 : 8), 85, hex('#fff6c0'), 0.5); pset(x - 4, 88, C.k); pset(x + 4, 88, C.k); }
  R.recorte(null);
  // el marco de la ventana por encima, con la cruz
  rect(214, 30, 262, 31, hex('#d8ccb0')); rect(214, 30, 215, 92, hex('#d8ccb0')); rect(261, 30, 262, 92, hex('#b8ac90')); rect(237, 31, 238, 90, hex('#c8bca0')); rect(215, 60, 261, 61, hex('#c8bca0')); rect(212, 91, 264, 94, hex('#e0d4b8')); rect(212, 94, 264, 95, hex('#9a8e74'));
  // el hilo rojo del corcho que se mueve con la corriente; una ficha que aletea
  { const al = Math.round(Math.sin(t * 2.4) * 1.5); R.poligono([[182, 70], [192, 70], [192 + al, 78], [182 + al, 78]], hex('#f6f0dc')); linea(184 + al, 74, 190 + al, 74, hex('#8a8a9a')); pset(187, 70, hex('#2a6ac8')); }
  // la luz de la lámpara verde en la pared y la polilla que le da vueltas
  e_halo(R, 134, 120, 70, hex('#ffe8a0'), 0.24 + Math.sin(t * 9) * 0.008, 44);
  { const a = t * 3.1, mx = Math.round(134 + Math.cos(a) * 10 + Math.sin(t * 7) * 2), my = Math.round(112 + Math.sin(a * 1.3) * 6), al = Math.sin(t * 30) > 0; pset(mx, my, hex('#e8dcc0')); pset(mx - 1, my - (al ? 1 : 0), hex('#c8bca0')); pset(mx + 1, my - (al ? 1 : 0), hex('#c8bca0')); }
  return { suelo: 150, libre: [30, 110], ventana: [214, 30, 262, 94], corcho: [112, 30, 200, 88], estanteria: [0, 18, 98, 118] };
}

// lo fijo del estudio de 1982 (va en su búfer)
function e_estudioFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // la pared verde gris con su textura de pintura
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y, 99) + h(x >> 3, y >> 3, 100) * 0.4; pset(x, y, v > 1.25 ? EP.pared82L : v < 0.2 ? EP.pared82S : EP.pared82); }
  rect(0, 0, 319, 4, EP.pared82S); rect(0, 5, 319, 5, EP.pared82L);
  rect(0, 112, 319, 117, hex('#3a2a1e')); rect(0, 112, 319, 112, hex('#5a4030'));
  // la tarima y la alfombra trenzada ovalada
  e_tarima(R, 118, 179, 160, 50, 2.4, [hex('#6a4a2e'), hex('#523822'), hex('#80603a'), hex('#3a2616')], 3);
  { const cx = 90, cy = 162, rx = 72, ry = 13; for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 1) continue; const anillo = Math.floor(d * 9), tr = (x + anillo) % 3 === 0;
    const c = [hex('#7a3a2a'), hex('#4a5a3a'), hex('#a8884a'), hex('#5a3a2a'), hex('#3a4a5a')][anillo % 5]; pset(x, y, tr ? e_mez(c, C.k, 0.3) : c); } }
  // la estantería de pared llena de libros, con un globo terráqueo y un busto pequeño
  rect(0, 16, 98, 118, EP.estS); rect(0, 16, 98, 19, EP.est); rect(0, 16, 98, 16, EP.estL);
  for (const yb of [38, 58, 78, 98]) { e_libros(R, 4, 94, yb, 17, yb); rect(0, yb + 1, 98, yb + 2, EP.estL); rect(0, yb + 3, 98, yb + 3, EP.estS); }
  e_libros(R, 4, 94, 113, 12, 7);
  for (const x of [0, 96]) { rect(x, 16, x + 2, 118, EP.est); rect(x, 16, x, 118, EP.estL); }
  disco(80, 51, 5, hex('#3a6a9a')); disco(80, 51, 4, hex('#4a7aaa')); pset(78, 49, hex('#6a9a4a')); pset(81, 52, hex('#6a9a4a')); pset(79, 50, hex('#6a9a4a')); rect(80, 56, 80, 57, EP.viejoS); rect(77, 57, 83, 58, EP.viejo);
  rect(16, 70, 24, 78, hex('#d8d4cc')); disco(20, 70, 3, hex('#e8e4dc')); pset(19, 69, hex('#b8b4ac'));
  // el corcho con copias de cartas viejas, fichas, un mapa de Virginia y el hilo rojo
  rect(110, 28, 202, 90, hex('#4a3020')); for (let y = 30; y < 89; y++) for (let x = 112; x < 201; x++) pset(x, y, h(x, y, 101) < 0.3 ? EP.corchoS : h(x, y, 102) < 0.08 ? EP.corchoL : EP.corcho);
  const notas = [[116, 34, 18, 24, '#e8dcb8'], [140, 38, 16, 20, '#ece2c8'], [162, 33, 20, 16, '#e4d6b0'], [118, 64, 14, 10, '#f6f0dc'], [146, 66, 22, 16, '#d8e8c8'], [176, 54, 14, 10, '#f6f0dc']];
  notas.forEach(([x, y, w, a, c], i) => { rect(x + 1, y + 1, x + w + 1, y + a + 1, EP.corchoS); rect(x, y, x + w, y + a, hex(c)); if (i === 4) { R.poligono([[x + 4, y + 4], [x + 16, y + 3], [x + 19, y + 9], [x + 12, y + 14], [x + 3, y + 12]], hex('#7a9a5a')); pset(x + 10, y + 8, hex('#c82a2a')); }
    else if (a > 14) e_renglones(R, x + 2, y + 3, x + w - 2, y + a - 2, hex('#5a4a5a'), 3, i); else e_cifras(R, 1822 + i * 4, x + 1, y + 2, hex('#3a3a5a')); pset(x + (w >> 1), y + 1, [hex('#c82a2a'), hex('#2a6ac8'), hex('#e8c030')][i % 3]); });
  for (const [a, b, c, d] of [[125, 35, 148, 39], [148, 39, 172, 34], [125, 35, 125, 65], [148, 39, 157, 67], [172, 34, 183, 55]]) linea(a, b, c, d, EP.hilo);
  // el diploma enmarcado (un sello y renglones, sin letras)
  rect(270, 52, 302, 76, hex('#2a1e16')); rect(272, 54, 300, 74, hex('#f2ead6')); for (let y = 58; y < 70; y += 3) linea(276, y, 296, y, hex('#a8a090')); disco(294, 70, 3, hex('#c83a2a')); pset(293, 69, hex('#e86a5a'));
  // un perchero de pie con la gabardina, a la derecha
  rect(306, 40, 307, 116, hex('#3a2a1e')); poligono([[301, 46], [312, 46], [314, 90], [299, 90]], hex('#8a7a5a')); linea(306, 47, 306, 89, hex('#6a5a40'));
  // una pila de libros en el suelo
  for (let i = 0; i < 4; i++) { const y = 140 - i * 4, c = e_LOMOS[i * 2]; rect(108 - i, y, 128 + (i % 2), y + 3, C.k); rect(109 - i, y + 1, 127 + (i % 2), y + 2, c); rect(109 - i, y + 1, 127 + (i % 2), y + 1, e_mez(c, C.blanco, 0.25)); rect(126 + (i % 2), y + 1, 126 + (i % 2), y + 2, hex('#f0e8d0')); }
}

// el escritorio de 1982 (delante del investigador): tablero de nogal con su canto, el faldón con cajones y tiradores, la
// LÁMPARA VERDE de banquero con su luz, la MÁQUINA DE ESCRIBIR con el papel y el carro que avanza, el DICCIONARIO grande
// abierto en su atril, la lupa, las cartas, el fichero y la taza
function e_estudioDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  e_sombra(R, 211, 176, 94, 4, 0.6);
  rect(118, 140, 304, 146, C.k); rect(119, 140, 303, 144, hex('#6a4024')); rect(119, 140, 303, 140, hex('#8a5a34'));
  for (let x = 120; x < 303; x++) if (h(x >> 3, 5, 103) < 0.6 && h(x, 6, 103) < 0.35) pset(x, 142, hex('#4a2a16'));
  rect(120, 146, 302, 172, hex('#4a2a16')); rect(120, 146, 302, 147, hex('#2e1a0c'));
  for (const [a, b] of [[124, 170], [252, 298]]) for (let d = 0; d < 3; d++) { const y = 149 + d * 8; e_cuarteron(R, a, y, b, y + 6, hex('#5a3420'), hex('#7a4a2a'), hex('#2e1a0c'), hex('#4a2a16'), a + d); rect(((a + b) >> 1) - 3, y + 3, ((a + b) >> 1) + 3, y + 3, EP.viejo); }
  rect(120, 172, 302, 174, hex('#2e1a0c')); rect(120, 174, 126, 179, hex('#4a2a16')); rect(296, 174, 302, 179, hex('#4a2a16'));
  // la lámpara de banquero: pie de latón, la pantalla verde de cristal con su brillo y la luz que cae
  { const lx = 134; rect(lx - 6, 137, lx + 6, 139, EP.viejoS); rect(lx - 5, 136, lx + 5, 136, EP.viejo); rect(lx, 126, lx + 1, 136, EP.viejo); linea(lx + 3, 128, lx + 3, 134, EP.viejoS); pset(lx + 3, 134, EP.viejoL);
    poligono([[lx - 11, 127], [lx - 8, 119], [lx + 9, 119], [lx + 12, 127]], EP.verLam); linea(lx - 8, 119, lx + 9, 119, EP.verLamL); linea(lx - 9, 121, lx - 4, 121, EP.verLamL); rect(lx - 11, 127, lx + 12, 128, EP.verLamS); rect(lx - 9, 129, lx + 10, 129, hex('#fff6c8'));
    for (let y = 130; y < 140; y++) for (let x = lx - 14 - (y - 130); x <= lx + 15 + (y - 130); x++) if ((x + y) % 2 === 0) e_tinta(R, x, y, hex('#fff0b0'), 0.3); }
  // las cartas viejas y la lupa sobre una de ellas
  rect(146, 134, 164, 139, hex('#e8dcb8')); rect(150, 131, 166, 136, hex('#f0e6c8')); e_renglones(R, 152, 132, 164, 136, hex('#6a5a5a'), 2, 3);
  disco(160, 134, 4, C.k); disco(160, 134, 3, hex('#d8e8f0')); pset(159, 133, C.blanco); linea(163, 137, 167, 139, hex('#3a2416'));
  // la máquina de escribir: el cuerpo negro, las teclas, el papel y el carro que avanza (y vuelve con su campanilla)
  { const cx = 218, carro = Math.round(((t * 3) % 12) - 6); rect(cx - 16, 130, cx + 16, 140, C.k); rect(cx - 15, 131, cx + 15, 139, hex('#2a2a30')); rect(cx - 15, 131, cx + 15, 131, hex('#5a5a62'));
    for (let f = 0; f < 3; f++) for (let i = 0; i < 9; i++) { const x = cx - 13 + i * 3 + f, y = 134 + f * 2, pulsa = Math.floor(t * 8) % 27 === i + f * 9; pset(x, y + (pulsa ? 1 : 0), hex('#e8e4dc')); }
    rect(cx - 20 + carro, 126, cx + 20 + carro, 129, hex('#3a3a42')); rect(cx - 20 + carro, 126, cx + 20 + carro, 126, hex('#7a7a84')); rect(cx - 22 + carro, 127, cx - 20 + carro, 128, hex('#c8c8d0'));
    rect(cx - 9 + carro, 114, cx + 9 + carro, 126, hex('#f6f2e8')); e_renglones(R, cx - 7 + carro, 116, cx + 7 + carro, 124, hex('#5a5a6a'), 2, 5); }
  // el fichero de madera con sus fichas
  rect(236, 132, 248, 140, C.k); rect(237, 133, 247, 139, hex('#7a5232')); for (let i = 0; i < 5; i++) rect(238 + i * 2, 129 + (i % 2), 238 + i * 2, 133, i % 2 ? hex('#f6f0dc') : hex('#e8dcb8'));
  // el diccionario grande abierto en su atril
  { const dx = 278; rect(dx - 2, 126, dx + 2, 140, hex('#3a2416')); rect(dx - 8, 138, dx + 8, 140, hex('#3a2416'));
    poligono([[dx - 20, 126], [dx, 128], [dx + 20, 126], [dx + 20, 117], [dx, 119], [dx - 20, 117]], hex('#5a2a1a'));
    poligono([[dx - 18, 124], [dx, 126], [dx, 119], [dx - 18, 116]], hex('#f0e6cc')); poligono([[dx + 18, 124], [dx, 126], [dx, 119], [dx + 18, 116]], hex('#e4d8bc'));
    for (let i = 0; i < 4; i++) { linea(dx - 16, 118 + i * 2, dx - 3, 120 + i * 2, hex('#8a7a6a'), 2); linea(dx + 3, 120 + i * 2, dx + 16, 118 + i * 2, hex('#8a7a6a'), 2); }
    linea(dx, 119, dx, 126, hex('#b8a888')); const pag = Math.sin(t * 0.9) > 0.92; if (pag) poligono([[dx, 119], [dx + 8, 113], [dx + 9, 120], [dx, 126]], hex('#fffaf0')); }
  // la taza con vapor
  rect(292, 132, 299, 139, C.k); rect(293, 133, 298, 138, hex('#e8e0d0')); rect(293, 133, 298, 133, hex('#4a2a18')); rect(299, 134, 301, 137, C.k);
  for (let i = 0; i < 6; i++) { const u = ((t * 0.45 + i / 6) % 1); e_tinta(R, Math.round(295 + Math.sin(u * 7 + t) * 2 * u), Math.round(130 - u * 16), C.blanco, 0.45 * (1 - u)); }
  return { suelo: 150, libre: [30, 110], escritorio: [118, 140, 304, 172], lampara: [134, 122], maquina: [218, 128], diccionario: [278, 120] };
}

// la paleta de las piezas del 48 (papel, tinta, hierro, oro, madera, el teatrillo…)
const p_P = pal({
  papel: '#ece0c0', papelL: '#f8f0d8', papelS: '#d2c094', papelD: '#a48c62', mancha: '#d8c08a', borde: '#6a5434', dorso: '#c8b484',
  tinta: '#2a2234', tintaL: '#4e4258', tintaM: '#5a3a1a', noche: '#1a2236',
  amar: '#e6c45a', amarL: '#f6e094', amarS: '#c49a38', amarD: '#7e5e1e', pagina: '#f2e4ae', paginaS: '#d8c482',
  hie: '#4c4c58', hieL: '#767684', hieLL: '#a0a0ae', hieS: '#33333c', hieD: '#1c1c22', oxido: '#8a4a2a', oxidoL: '#b8683a', oxidoS: '#5a2e1c',
  laton: '#c8a040', latonL: '#f0d478', latonS: '#8a6a24',
  oro: '#f0c040', oroL: '#fff0a0', oroS: '#a87820', oroD: '#6e4e14',
  mad: '#9a6a3a', madL: '#c48c52', madS: '#6a4424', madD: '#3e2814',
  rojo: '#c83a32', rojoL: '#f06a50', rojoS: '#8a2420', rojoD: '#58141a',
  verde: '#4a9a4a', verdeL: '#8ad06a', verdeS: '#2e6a34', azul: '#3a6ab0', azulL: '#7aa8e0', azulS: '#24467a', azulD: '#18284a',
  rosa: '#ee9ab0', rosaL: '#ffc8d4', rosaS: '#b8607a', plata: '#c8ccd8', plataL: '#f4f6fa', plataS: '#868a98',
  perg: '#e6d09a', pergL: '#f6e8c0', pergS: '#bea064', pergD: '#8a6c3c', bloque: '#c8aa72', bloqueS: '#a4864e',
  piel: '#f0c090', pielS: '#c88a5a', blanco: '#fffaf0', gris: '#8a8a96', cera: '#b0242a', cielo: '#1e2a52', cieloL: '#34447a',
  verdeT: '#3a7a5a', tiraP: '#eef2e2', tiraV: '#d4e8cc', tiraS: '#b8c4ac',
});

const p_cl = (v) => Math.max(0, Math.min(1, v));

// mezcla dos colores (a = 0, el primero; a = 1, el segundo)
const p_mez = (c, d, a) => { a = p_cl(a); const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// tiñe un píxel ya pintado
const p_tine = (R, x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, p_mez(R.pget(x, y), c, a)); };

// las cifras de 3 × 5 de las hojas y los rótulos pequeños (la coma y la barra, para «1 / 100 000…»)
const p_DIG = {
  0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['##.', '..#', '.#.', '#..', '###'], 3: ['##.', '..#', '.#.', '..#', '##.'],
  4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '##.', '..#', '##.'], 6: ['.##', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'],
  8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '##.'], ',': ['.', '.', '.', '#', '#'], '/': ['..#', '..#', '.#.', '#..', '#..'],
};

// el ancho de un rótulo de cifras de 3 × 5 a px por píxel
const p_anchoCifras = (txt, px = 1) => { let w = 0; for (const ch of String(txt)) w += ch === ' ' ? 2 : (p_DIG[ch] ? p_DIG[ch][0].length + 1 : 0); return Math.max(0, w - 1) * px; };

// escribe cifras de 3 × 5 (px: el tamaño de cada píxel; o.sombra: un píxel oscuro debajo); respeta R.recorte
function p_cifras(R, txt, x, y, px, c, o = {}) {
  let cx = Math.round(x); y = Math.round(y);
  for (const ch of String(txt)) {
    if (ch === ' ') { cx += 2 * px; continue; }
    const g = p_DIG[ch]; if (!g) continue;
    for (let j = 0; j < 5; j++) for (let i = 0; i < g[0].length; i++) if (g[j][i] === '#') for (let a = 0; a < px; a++) for (let b = 0; b < px; b++) {
      if (o.sombra) R.pset(cx + i * px + a + (o.sombra === 2 ? 1 : 0), y + j * px + b + 1, o.cs ?? C.k);
      R.pset(cx + i * px + a, y + j * px + b, c); }
    cx += (g[0].length + 1) * px;
  }
  return cx - Math.round(x) - px;
}

// los números de las tres hojas de Beale (el comienzo de cada una, tal como se publicaron en 1885)
const p_BEALE = [
  [71, 194, 38, 1701, 89, 76, 11, 83, 1629, 48, 94, 63, 132, 16, 111, 95, 84, 341, 975, 14, 40, 64, 27, 81, 139, 213, 63, 90, 1120, 8, 15, 3, 126, 2018, 40, 74, 758, 485, 604, 230, 436, 664, 582, 150, 251, 284, 308, 231, 124, 211, 486, 225, 401, 370, 11, 101, 305, 139, 189, 17, 33, 88, 208, 193, 145, 1, 94, 73, 416, 918, 263, 28, 500, 538, 356, 117, 136, 219, 27, 176, 130, 10, 460, 25, 485, 18, 436, 65, 84, 200, 283, 118, 320, 138, 36, 416, 280, 15, 71, 224, 961, 44, 16, 401, 39, 88, 61, 304, 12, 21, 24, 283, 134, 92, 63, 246, 486, 682, 7, 219, 184, 360, 780, 18, 64, 463, 474, 131, 160, 79, 73, 440, 95, 18, 64, 581, 34, 69, 128, 367, 460, 17, 81, 12, 103, 820, 62, 116, 97, 103, 862, 70, 60, 1317, 471, 540, 208, 121, 890, 346, 36, 150, 59, 568, 614, 13, 120, 63, 219, 812, 2160, 1780, 99, 35, 18, 21, 136, 872, 15, 28, 170, 88, 4, 30, 44, 112, 18, 147, 436, 195, 320, 37, 122, 113, 6, 140, 8, 120, 305, 42, 58, 461, 44, 106, 301, 13, 408, 680, 93, 86, 116, 530, 82, 568, 9, 102, 38, 416, 89, 71, 216, 728, 965, 818, 2, 38, 121, 195, 14, 326, 148, 234, 18, 55, 131, 234, 361, 824, 5, 81, 623, 48, 961, 19, 26, 33, 10, 1101, 365, 92, 88, 181, 275, 346, 201, 206],
  [115, 73, 24, 807, 37, 52, 49, 17, 31, 62, 647, 22, 7, 15, 140, 47, 29, 107, 79, 84, 56, 239, 10, 26, 811, 5, 196, 308, 85, 52, 160, 136, 59, 211, 36, 9, 46, 316, 554, 122, 106, 95, 53, 58, 2, 42, 7, 35, 122, 53, 31, 82, 77, 250, 196, 56, 96, 118, 71, 140, 287, 28, 353, 37, 1005, 65, 147, 807, 24, 3, 8, 12, 47, 43, 59, 807, 45, 316, 101, 41, 78, 154, 1005, 122, 138, 191, 16, 77, 49, 102, 57, 72, 34, 73, 85, 35, 371, 59, 196, 81, 92, 191, 106, 273, 60, 394, 620, 270, 220, 106, 388, 287, 63, 3, 6, 191, 122, 43, 234, 400, 106, 290, 314, 47, 48, 81, 96, 26, 115, 92, 158, 191, 110, 77, 85, 197, 46, 10, 113, 140, 353, 48, 120, 106, 2, 607, 61, 420, 811, 29, 125, 14, 20, 37, 105, 28, 248, 16, 159, 7, 35, 19, 301, 125, 110, 486, 287, 98, 117, 511, 62, 51, 220, 37, 113, 140, 807, 138, 540, 8, 44, 287, 388, 117, 18, 79, 344, 34, 20, 59, 511, 548, 107, 603, 220, 7, 66, 154, 41, 20, 50, 6, 575, 122, 154, 248, 110, 61, 52, 33, 30, 5, 38, 8, 14, 84, 57, 540, 217, 115, 71, 29, 84, 63, 43, 131, 29, 138, 47, 73, 239, 540, 52, 53, 79, 118, 51, 44, 63, 196, 12, 239, 112, 3, 49, 79, 353, 105, 56, 371, 557, 211, 505],
  [317, 8, 92, 73, 112, 89, 67, 318, 28, 96, 107, 41, 631, 78, 146, 397, 118, 98, 114, 246, 348, 116, 74, 88, 12, 65, 32, 14, 81, 19, 76, 121, 216, 85, 33, 66, 15, 108, 68, 77, 43, 24, 122, 96, 117, 36, 211, 301, 15, 44, 11, 46, 89, 18, 136, 68, 317, 28, 90, 82, 304, 71, 43, 221, 198, 176, 310, 319, 81, 99, 264, 380, 56, 37, 319, 2, 44, 53, 28, 44, 75, 98, 102, 37, 85, 107, 117, 64, 88, 136, 48, 151, 99, 175, 89, 315, 326, 78, 96, 214, 218, 311, 43, 89, 51, 90, 75, 128, 96, 33, 28, 103, 84, 65, 26, 41, 246, 84, 270, 98, 116, 32, 59, 74, 66, 69, 240, 15, 8, 121, 20, 77, 80, 31, 11, 106, 81, 191, 224, 328, 18, 75, 52, 82, 117, 201, 39, 23, 217, 27, 21, 84, 35, 54, 109, 128, 49, 77, 88, 1, 81, 217, 64, 55, 83, 116, 251, 269, 311, 96, 54, 32, 120, 18, 132, 102, 219, 211, 84, 150, 219, 275, 312, 64, 10, 106, 87, 75, 47, 21, 29, 37, 81, 44, 18, 126, 115, 132, 160, 181, 203, 76, 81, 299, 314, 337, 351, 96, 11, 28, 97, 318, 238, 106, 24, 93, 3, 19, 17, 26, 60, 73, 88, 14, 126, 138, 234, 286, 297, 321, 365, 264, 19, 22, 84, 56, 107, 98, 123, 111, 214, 136, 7, 33, 45, 40, 13, 28, 46, 42, 107, 196, 227, 344, 198, 203, 247, 116, 19, 8, 212, 230, 31, 6, 328, 65, 48, 52, 59, 41, 122],
];

// el texto de una hoja maquetado una vez (por hoja, escala y tamaño): por cada píxel, a qué número pertenece (tok), en qué
// fila está (fila) y si la tinta es densa; a escala 1 los números son rayitas de tinta (se leen como renglones de cifras)
const p_HOJAS = new Map();

function p_textoHoja(n, s, W, H, lista) {
  const clave = n + '|' + s + '|' + W + '|' + H + '|' + (lista ? 'f' : '');
  if (p_HOJAS.has(clave)) return p_HOJAS.get(clave);
  const L = lista ?? p_BEALE[n - 1], tok = new Int16Array(W * H).fill(-1), fila = new Int8Array(W * H), densa = new Uint8Array(W * H), filaY = [];
  const px = s >= 2 ? Math.max(1, Math.floor(s / 2)) : 0, ok = (i, j) => i >= 0 && i < W && j >= 0 && j < H;
  let cuenta = 0, nf = 0;
  const x0 = s >= 2 ? 2 * s : W < 16 ? 2 : 3, y0 = s >= 2 ? 2 * s + 9 * px : H < 20 ? 4 : 5;
  if (px) {
    // la cabecera: el número de la hoja subrayado
    const w = p_anchoCifras(String(n), px), hx = Math.round(W / 2 - w / 2), hy = 2 * s;
    let cx = hx; for (const ch of String(n)) { const g = p_DIG[ch]; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') for (let a = 0; a < px; a++) for (let b = 0; b < px; b++) if (ok(cx + i * px + a, hy + j * px + b)) { tok[(hy + j * px + b) * W + cx + i * px + a] = 0; densa[(hy + j * px + b) * W + cx + i * px + a] = 1; } cx += 4 * px; }
    for (let i = hx - 2 * px; i <= hx + w + 2 * px; i++) if (ok(i, hy + 6 * px)) { tok[(hy + 6 * px) * W + i] = 0; densa[(hy + 6 * px) * W + i] = 0; fila[(hy + 6 * px) * W + i] = -1; }
    const lh = 7 * px, xb = W - 2 * s; let cx2 = x0, cy = y0;
    filaY.push(cy);
    for (let q = 0; q < L.length; q++) {
      const str = L[q] + ',', w2 = p_anchoCifras(str, px);
      if (cx2 + w2 > xb) { cx2 = x0; cy += lh; nf++; if (cy + 5 * px > H - 2 * s) break; filaY.push(cy); }
      const dy = h(q, n, 5) < 0.22 ? px : 0, dx = h(q, n, 6) < 0.15 ? 1 : 0;   // el temblor de la mano que escribe
      let xx = cx2 + dx;
      for (const ch of str) { const g = p_DIG[ch]; for (let j = 0; j < 5; j++) for (let i = 0; i < g[0].length; i++) if (g[j][i] === '#') for (let a = 0; a < px; a++) for (let b = 0; b < px; b++) {
        const X = xx + i * px + a, Y = cy + dy + j * px + b; if (!ok(X, Y)) continue; tok[Y * W + X] = q + 1; fila[Y * W + X] = nf; densa[Y * W + X] = h(X, Y, n + 40) < 0.85 ? 1 : 0; }
        xx += (g[0].length + 1) * px; }
      cx2 += w2 + 2 * px; cuenta = q + 2;
    }
  } else {
    // a escala 1: renglones de rayitas (cada cifra, un píxel; la coma, un hueco)
    for (let i = Math.round(W / 2) - 2; i <= Math.round(W / 2) + 1; i++) { tok[(H < 20 ? 1 : 2) * W + i] = 0; densa[(H < 20 ? 1 : 2) * W + i] = 1; }
    let cx2 = x0, cy = y0, q = 0; filaY.push(cy);
    for (; q < L.length; q++) {
      const d = String(L[q]).length;
      if (cx2 + d > W - (W < 16 ? 2 : 3)) { cx2 = x0; cy += 3; nf++; if (cy > H - 3) break; filaY.push(cy); }
      for (let c = 0; c < d; c++) { const X = cx2 + c; tok[cy * W + X] = q + 1; fila[cy * W + X] = nf; densa[cy * W + X] = 1; if (h(X, cy, n + 50) < 0.45 && cy + 1 < H - 2) { tok[(cy + 1) * W + X] = q + 1; fila[(cy + 1) * W + X] = nf; densa[(cy + 1) * W + X] = 0; } }
      cx2 += d + 2; cuenta = q + 2;
    }
  }
  const r = { tok, fila, densa, cuenta, filas: filaY.length, filaY, px, x0, y0 };
  p_HOJAS.set(clave, r);
  return r;
}

// un dibujito de 6 × 5 (a q píxeles por píxel) de la hoja descifrada: 0 lingote, 1 moneda, 2 joya, 3 olla de hierro
function p_dibujito(R, x, y, q, cual) {
  const P = p_P, F = [
    ['......', '.####.', '#oooo#', '#OOOO#', '######'],
    ['.###..', '#ooo#.', '#oOo#.', '#ooo#.', '.###..'],
    ['..#...', '.#v#..', '#vVv#.', '.#v#..', '..#...'],
    ['.oOo..', '#oOo#.', '#ddd#.', '#ddd#.', '.###..'],
  ][cual];
  const D = { '#': C.k, o: cual === 1 ? P.plata : P.oro, O: cual === 1 ? P.plataL : P.oroL, v: P.rojo, V: P.rojoL, d: P.hie };
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) { const c = D[F[j][i]]; if (c != null) for (let a = 0; a < q; a++) for (let b = 0; b < q; b++) R.pset(x + i * q + a, y + j * q + b, c); }
}

// la cubierta del folleto en (i, j): el papel amarillo gastado, el doble filete, el título en barras, el grabado de la caja
// y el «1885»
const p_MASC = new Map();

function p_mascara(txt, px) {
  const k = txt + '|' + px; if (p_MASC.has(k)) return p_MASC.get(k);
  const w = p_anchoCifras(txt, px), m = new Uint8Array(Math.max(1, w) * 5 * px);
  let cx = 0; for (const ch of txt) { if (ch === ' ') { cx += 2 * px; continue; } const g = p_DIG[ch]; for (let j = 0; j < 5; j++) for (let i = 0; i < g[0].length; i++) if (g[j][i] === '#') for (let a = 0; a < px; a++) for (let b = 0; b < px; b++) m[(j * px + b) * w + cx + i * px + a] = 1; cx += (g[0].length + 1) * px; }
  const r = { w, h: 5 * px, m }; p_MASC.set(k, r); return r;
}

function p_tapa(i, j, s, W, H) {
  const P = p_P, e = Math.min(i, j, W - 1 - i, H - 1 - j);
  if (e === 0) return (i + j) % 7 === 0 && h(i, j, 63) < 0.5 ? P.amarS : P.amarD;
  let c = h(i, j, 64) > 0.92 ? P.amarS : h(i, j, 65) < 0.06 ? P.amarL : P.amar;
  if (h(Math.floor(i / (3 * s)), Math.floor(j / (3 * s)), 66) > 0.82 && h(i, j, 67) < 0.5) c = P.amarS;          // manchas
  if (e < Math.max(1, s) + 1 && h(i, j, 68) < 0.55) c = P.amarS;                                                              // el canto gastado
  if (s >= 1 && i < s + 1 && j % (6 * s) === 3 * s) c = P.amarD;                                                            // las puntadas del lomo
  const f = Math.max(1, Math.round(2 * s));
  if (e === f || (s >= 2 && e === f + 2)) return P.tintaM;                                                       // el doble filete
  if (e === f + 1) c = P.amarL;
  if (e < f) return c;
  // el título: tres renglones de barras (palabras sin letras)
  const fil = [[5, 2, 4], [8.5, 1, 5], [10.5, 1, 6.5]];
  for (const [jj, al, mx] of fil) { const a = Math.round(jj * s), b = a + Math.max(1, Math.round(al * s)) - 1;
    if (j >= a && j <= b && i >= Math.round(mx * s) && i <= W - 1 - Math.round(mx * s)) return h(Math.floor(i / (2 * s + 1)), jj, 69) < 0.16 ? c : P.tinta; }
  // el grabado: la caja de hierro con rayos alrededor, a trazo y con su trama
  const gx = W / 2, gy = 17 * s, bw = 4 * s, bh = 2.5 * s;
  const di = i - gx + 0.5, dj = j - gy;
  if (Math.abs(di) <= bw && Math.abs(dj) <= bh) { if (Math.abs(di) > bw - 1 || Math.abs(dj) > bh - 1 || Math.round(dj) === -Math.round(bh / 3)) return P.tintaM; return (i + j) % 3 === 0 ? P.tintaM : c; }
  const r = Math.hypot(di, dj * 1.3);
  if (r > bw + 1 && r < bw + 3 * s) { const an = Math.atan2(dj, di); if (Math.abs(Math.sin(an * 6)) > 0.93) return P.tintaM; }
  // el año, abajo
  const px = s >= 2 ? Math.max(1, Math.floor(s / 2)) : 0;
  if (px) { const mk = p_mascara('1885', px), mx0 = Math.round(W / 2 - mk.w / 2), my0 = Math.round(23 * s); const a = i - mx0, b = j - my0; if (a >= 0 && a < mk.w && b >= 0 && b < mk.h && mk.m[b * mk.w + a]) return P.tinta; }
  else if (j === Math.round(23 * s) && i >= Math.round(7 * s) && i <= Math.round(12 * s)) return P.tinta;
  return c;
}

// el dorso de la tapa (la página de la izquierda): el prólogo en renglones de rayitas
function p_pagIzq(i, j, s, W, H) {
  const P = p_P;
  if (i === 0 || j === 0 || j === H - 1) return P.amarD;
  let c = h(i, j, 70) > 0.93 ? P.paginaS : P.pagina;
  const m = Math.max(1, Math.round(2 * s)), m3 = Math.max(2, Math.round(3 * s));
  if (i > W - 1 - m) c = p_mez(c, P.amarD, (i - (W - 1 - m)) / m * 0.5);
  const lh = Math.max(3, m3), r = Math.floor((j - m3) / lh), dentro = (j - m3) % lh;
  if (j > m3 && j < H - m3 && dentro === 0 && i > m && i < W - m - (r % 4 === 3 ? Math.round(5 * s) : 0) && h(Math.floor(i / (2 + s)), r, 71) > 0.14) return P.tintaL;
  return c;
}

// d_tira · la tira de Gillogly: papel continuo de impresora (de 1980) con sus agujeros de arrastre, los cantos rasgados y las
// letras de matriz de puntos que salen de una en una
const p_LETRAS = {
  a: ['.....', '.....', '.###.', '....#', '.####', '#...#', '.####'], b: ['#....', '#....', '####.', '#...#', '#...#', '#...#', '####.'],
  c: ['.....', '.....', '.###.', '#....', '#....', '#....', '.###.'], d: ['....#', '....#', '.####', '#...#', '#...#', '#...#', '.####'],
  e: ['.....', '.....', '.###.', '#...#', '#####', '#....', '.###.'], f: ['..##.', '.#...', '####.', '.#...', '.#...', '.#...', '.#...'],
  g: ['.....', '.....', '.####', '#...#', '.####', '....#', '.###.'], h: ['#....', '#....', '####.', '#...#', '#...#', '#...#', '#...#'],
  i: ['..#..', '.....', '.##..', '..#..', '..#..', '..#..', '.###.'], j: ['...#.', '.....', '..##.', '...#.', '...#.', '#..#.', '.##..'],
  k: ['#....', '#....', '#..#.', '#.#..', '##...', '#.#..', '#..#.'], l: ['.##..', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  m: ['.....', '.....', '##.#.', '#.#.#', '#.#.#', '#.#.#', '#...#'], n: ['.....', '.....', '####.', '#...#', '#...#', '#...#', '#...#'],
  o: ['.....', '.....', '.###.', '#...#', '#...#', '#...#', '.###.'], p: ['.....', '.....', '####.', '#...#', '####.', '#....', '#....'],
};

// una rejilla de píxeles lógicos a escala s con origen en (x0, y0): P un píxel, r un rectángulo, d un disco, l una línea
// (b negativo hacia arriba) y sombra la sombra tramada en el suelo (como la de las pausas del 47)
function p_grilla(R, x0, y0, s) {
  const P = (a, b, c) => R.rect(x0 + Math.round(a) * s, y0 + Math.round(b) * s, x0 + Math.round(a) * s + s - 1, y0 + Math.round(b) * s + s - 1, c);
  const r = (a0, b0, a1, b1, c) => R.rect(x0 + Math.round(Math.min(a0, a1)) * s, y0 + Math.round(Math.min(b0, b1)) * s, x0 + Math.round(Math.max(a0, a1)) * s + s - 1, y0 + Math.round(Math.max(b0, b1)) * s + s - 1, c);
  const d = (cx, cy, rr, c) => { for (let j = Math.floor(-rr); j <= rr; j++) for (let i = Math.floor(-rr); i <= rr; i++) if (i * i + j * j <= rr * rr + rr * 0.6) P(Math.round(cx) + i, Math.round(cy) + j, c); };
  const l = (a0, b0, a1, b1, c) => { a0 = Math.round(a0); b0 = Math.round(b0); a1 = Math.round(a1); b1 = Math.round(b1); const dx = Math.abs(a1 - a0), dy = -Math.abs(b1 - b0), sx = a0 < a1 ? 1 : -1, sy = b0 < b1 ? 1 : -1; let e = dx + dy; for (;;) { P(a0, b0, c); if (a0 === a1 && b0 === b1) break; const e2 = 2 * e; if (e2 >= dy) { e += dy; a0 += sx; } if (e2 <= dx) { e += dx; b0 += sy; } } };
  const sombra = (cx, w, hh = 2) => { for (let j = 0; j <= hh; j++) for (let i = -w; i <= w; i++) if ((i / w) ** 2 + (j / (hh + 0.5)) ** 2 <= 1) for (let q = 0; q < s * s; q++) { const px = x0 + (cx + i) * s + (q % s), py = y0 + j * s + Math.floor(q / s) - s; if (((px + py) & 1) === 0) R.pset(px, py, p_mez(R.pget(px, py), C.k, 0.45)); } };
  const X = (a) => x0 + a * s, Y = (b) => y0 + b * s;
  return { P, r, d, l, sombra, s, x0, y0, X, Y };
}

// un número grande que aparece encima de una pieza (o.numero: sin poner, al llegar su momento; true siempre; false nunca)
const p_numero = (R, o, auto, txt, x, y) => { if (o.numero === false || (o.numero !== true && !auto)) return; R.numero(txt, Math.round(x), Math.round(y), { centro: true, tam: 16 }); };

// un destello de cuatro puntas que parpadea
const p_destello = (G, a, b, t, k, c, cL) => { const f = Math.sin(t * 5 + k * 2.3); if (f < 0) return; G.P(a, b, cL); if (f > 0.5) { G.P(a - 1, b, c); G.P(a + 1, b, c); G.P(a, b - 1, c); G.P(a, b + 1, c); } };

// BALANZA · los lingotes y las ollas de oro contra un coche de juguete
function p_balanza(R, G, t, o, x, y, s) {
  const P = p_P, peso = p_cl(o.peso ?? 0), th = (1 - peso) * 0.3 + Math.sin(t * 2.1) * 0.012 * (0.4 + peso);
  G.sombra(0, 30, 2);
  // el pie de madera con su moldura y la columna de latón con sus anillos
  G.r(-11, -4, 11, 0, C.k); G.r(-10, -3, 10, -1, P.mad); G.r(-10, -3, 10, -3, P.madL); G.r(-10, -1, 10, -1, P.madS); for (let a = -8; a < 10; a += 5) G.P(a, -2, P.madS);
  G.r(-8, -6, 8, -4, C.k); G.r(-7, -5, 7, -5, P.madL);
  G.r(-2, -34, 2, -6, C.k); G.r(-1, -33, 1, -6, P.laton); G.r(-1, -33, -1, -6, P.latonL); G.r(1, -33, 1, -6, P.latonS);
  for (const b of [-30, -18, -9]) { G.r(-3, b - 1, 3, b, C.k); G.r(-2, b - 1, 2, b - 1, P.latonL); G.r(-2, b, 2, b, P.latonS); }
  // la escala del fiel (un arco con rayitas) y la aguja
  for (let k = -4; k <= 4; k++) { const an = -Math.PI / 2 + k * 0.16; G.P(Math.round(Math.cos(an) * 7), Math.round(-34 + Math.sin(an) * 7), k === 0 ? P.rojo : P.latonS); }
  G.l(0, -35, Math.round(Math.sin(-th) * 6), Math.round(-35 - Math.cos(th) * 6), C.k);
  // la cruz: el astil que se inclina y sus extremos
  const ex = 25;
  const [Lx, Ly] = [-ex * Math.cos(th), -35 + ex * Math.sin(th)], [Rx, Ry] = [ex * Math.cos(th), -35 - ex * Math.sin(th)];
  G.l(Lx, Ly - 1, Rx, Ry - 1, C.k); G.l(Lx, Ly + 1, Rx, Ry + 1, C.k); G.l(Lx, Ly, Rx, Ry, P.latonL);
  G.d(0, -35, 2, C.k); G.d(0, -35, 1, P.laton); G.P(0, -36, P.latonL); G.d(0, -38, 1, P.laton);
  // un plato colgado de tres cadenas en (ax, ay): devuelve la base del plato
  const plato = (ax, ay) => { const py = ay + 15;
    for (const dx of [-8, 0, 8]) for (let k = 0; k <= 14; k++) { const a = ax + dx * k / 14, b = ay + k * 15 / 14 - 1; if (k % 2 === 0) G.P(a, b, P.latonS); else G.P(a, b, P.laton); }
    G.r(ax - 10, py, ax + 10, py + 1, C.k); G.r(ax - 9, py, ax + 9, py, P.latonL); G.r(ax - 8, py + 1, ax + 8, py + 2, C.k); G.r(ax - 7, py + 1, ax + 7, py + 1, P.latonS);
    G.d(ax, ay - 1, 1, P.latonS); return py; };
  const pl = plato(Lx, Ly), pr = plato(Rx, Ry);
  // en el plato izquierdo: lingotes apilados y dos ollas de hierro llenas de oro (con brillos que parpadean)
  const lx = Math.round(Lx), lb = Math.round(pl) - 1;
  const lingote = (a, b) => { G.r(a - 3, b - 2, a + 3, b, C.k); G.r(a - 2, b - 1, a + 2, b, P.oro); G.r(a - 2, b - 1, a + 2, b - 1, P.oroL); G.P(a + 2, b, P.oroS); };
  lingote(lx - 5, lb); lingote(lx + 1, lb); lingote(lx - 2, lb - 3);
  const olla = (a, b) => { G.r(a - 3, b - 4, a + 3, b, C.k); G.r(a - 2, b - 3, a + 2, b - 1, P.hie); G.r(a - 2, b - 3, a - 2, b - 1, P.hieL); G.P(a - 4, b - 3, C.k); G.P(a + 4, b - 3, C.k);
    G.r(a - 3, b - 5, a + 3, b - 5, C.k); G.d(a, b - 6, 2, P.oro); G.P(a - 1, b - 7, P.oroL); G.P(a + 1, b - 6, P.oroS); };
  olla(lx + 6, lb); olla(lx - 7, lb - 3);
  p_destello(G, lx - 2, lb - 9, t, 1, P.oro, P.blanco); p_destello(G, lx + 6, lb - 10, t, 2, P.oro, P.blanco);
  // en el derecho: el coche de juguete rojo con sus ventanillas y las ruedas
  const cx = Math.round(Rx), cb = Math.round(pr) - 1;
  G.r(cx - 7, cb - 5, cx + 7, cb - 1, C.k); G.r(cx - 6, cb - 4, cx + 6, cb - 2, P.rojo); G.r(cx - 6, cb - 4, cx + 6, cb - 4, P.rojoL); G.r(cx - 6, cb - 2, cx + 6, cb - 2, P.rojoS);
  G.r(cx - 4, cb - 8, cx + 3, cb - 5, C.k); G.r(cx - 3, cb - 7, cx + 2, cb - 5, P.azulL); G.P(cx - 1, cb - 7, P.rojo); G.P(cx - 1, cb - 6, P.rojo); G.P(cx - 3, cb - 7, P.blanco);
  for (const a of [cx - 4, cx + 4]) { G.d(a, cb - 1, 1.3, C.k); G.P(a, cb - 1, P.plata); }
  G.P(cx + 6, cb - 3, P.amarL);
  p_numero(R, o, peso >= 0.95, '2921', x, y - 50 * s);
  return { arriba: [x, y - 40 * s], platos: [[G.X(lx), G.Y(lb)], [G.X(cx), G.Y(cb)]] };
}

// PERGAMINO · la Declaración en bloques numerados; de la hoja sale una flecha a un bloque y su primera letra (un cuadradito
// de luz) sube a la fila de arriba
function p_pergamino(R, G, t, o, x, y, s) {
  const P = p_P, paso = p_cl(o.paso ?? ((t * 0.18) % 1));
  G.sombra(5, 32, 2);
  // el pergamino de pie: los dos rollos y la hoja entre ellos, con la luz de la izquierda y el borde quemado por los años
  const a0 = -14, a1 = 34, b0 = -46, b1 = -4;
  for (let b = b0 + 2; b <= b1 - 2; b++) for (let a = a0 + 1; a <= a1 - 1; a++) { const r = h(a, b, 520); let c = r > 0.9 ? P.pergS : r < 0.06 ? P.pergL : P.perg; if (a < a0 + 4) c = P.pergL; if (a > a1 - 4) c = P.pergS; G.P(a, b, c); }
  for (let b = b0 + 2; b <= b1 - 2; b++) { G.P(a0, b, C.k); G.P(a1, b, C.k); }
  const rollo = (b) => { G.r(a0 - 2, b - 2, a1 + 2, b + 1, C.k); G.r(a0 - 1, b - 1, a1 + 1, b, P.pergS); G.r(a0 - 1, b - 1, a1 + 1, b - 1, P.pergL); G.r(a0 - 3, b - 1, a0 - 2, b, P.madS); G.r(a1 + 2, b - 1, a1 + 3, b, P.madS); };
  rollo(b0 + 1); rollo(b1);
  // el encabezado: una barra gruesa en curva (la gran cabecera de 1776, sin letras)
  for (let a = a0 + 6; a <= a1 - 6; a++) { const b = b0 + 5 + Math.round(Math.sin((a - a0) / (a1 - a0) * Math.PI) * -1.2); if (h(Math.floor(a / 4), 1, 521) > 0.12) { G.P(a, b, P.tintaM); G.P(a, b + 1, P.tintaM); } }
  // los bloques de palabras, numerados 1, 2, 3…
  const B = []; let k = 1;
  for (let f = 0; f < 5; f++) { let a = a0 + 3; const b = b0 + 10 + f * 7;
    while (true) { const w = 4 + Math.floor(h(k, f, 522) * 5); if (a + w > a1 - 3) break; B.push([a, b, w, k]); a += w + 2; k++; } }
  for (const [a, b, w, num] of B) { G.r(a, b, a + w - 1, b + 3, P.bloqueS); G.r(a, b, a + w - 1, b + 2, P.bloque); G.r(a, b, a + w - 1, b, P.pergL);
    p_cifras(R, String(num), G.X(a) + 2, G.Y(b) + 1, 1, P.tinta); }
  // la hoja de Beale pequeña, a la izquierda, con tres números (cada uno apunta a un bloque)
  const objetivo = [3, 7, 12], hx = -30, hb = -34;
  G.r(hx - 7, hb - 1, hx + 7, hb + 22, C.k); G.r(hx - 6, hb, hx + 6, hb + 21, P.papel); G.r(hx - 6, hb, hx + 6, hb, P.papelL); G.r(hx + 6, hb, hx + 6, hb + 21, P.papelS);
  const paso3 = paso * 3, cur = Math.min(2, Math.floor(paso3)), f = paso3 - cur;
  objetivo.forEach((num, i) => { const by = G.Y(hb + 2 + i * 6) + 1, c = i === cur ? P.rojo : P.tinta; p_cifras(R, num + ',', G.X(hx - 4) + 1, by, 2, c); if (i === cur) for (let q = 0; q < 12 * s; q++) if (q % 2 === 0) R.pset(G.X(hx - 5) + q, by + 11, P.rojoL); });
  // la flecha punteada de la cifra a su bloque y el cuadradito de luz que sube a la fila de las letras
  const blq = B.find((q) => q[3] === objetivo[cur]);
  if (blq) {
    const sx = G.X(hx + 6) + 2, sy = G.Y(hb + 2 + cur * 6) + 5, tx = G.X(blq[0] + blq[2] / 2), ty = G.Y(blq[1]) - 1;
    const fl = p_cl(f / 0.45);
    for (let q = 0; q <= 40 * fl; q++) { const v = q / 40, px = sx + (tx - sx) * v, py = sy + (ty - sy) * v - Math.sin(v * Math.PI) * 18; if ((q + Math.floor(t * 12)) % 3) R.pset(Math.round(px), Math.round(py), P.rojo); }
    if (fl >= 1) { const ax = tx, ay = ty; R.pset(ax, ay, P.rojoD); R.pset(ax - 1, ay - 1, P.rojo); R.pset(ax + 1, ay - 1, P.rojo); R.pset(ax - 2, ay - 2, P.rojo); R.pset(ax + 2, ay - 2, P.rojo); }
    // el bloque elegido se enciende
    if (f > 0.45) { G.r(blq[0], blq[1], blq[0] + blq[2] - 1, blq[1] + 2, P.oroL); p_cifras(R, String(blq[3]), G.X(blq[0]) + 2, G.Y(blq[1]) + 1, 1, P.rojoS); }
    // su primera letra sube como un cuadradito de luz hasta la fila de arriba
    if (f > 0.55) { const v = p_cl((f - 0.55) / 0.4), lx = G.X(blq[0]) + 2 + (G.X(a0 + 4 + cur * 5) - G.X(blq[0]) - 2) * v, ly = G.Y(blq[1]) + (G.Y(b0 - 8) - G.Y(blq[1])) * v;
      R.halo(Math.round(lx + 3), Math.round(ly + 3), 9, [P.oro, P.oroL], 1.1); R.rect(Math.round(lx), Math.round(ly), Math.round(lx) + 5, Math.round(ly) + 5, C.k); R.rect(Math.round(lx) + 1, Math.round(ly) + 1, Math.round(lx) + 4, Math.round(ly) + 4, P.oroL); R.pset(Math.round(lx) + 1, Math.round(ly) + 1, P.blanco); }
  }
  // la fila de arriba: los cuadraditos de las letras ya sacadas
  for (let i = 0; i < cur; i++) { const lx = G.X(a0 + 4 + i * 5), ly = G.Y(b0 - 8); R.rect(lx, ly, lx + 5, ly + 5, C.k); R.rect(lx + 1, ly + 1, lx + 4, ly + 4, P.oro); R.rect(lx + 1, ly + 1, lx + 4, ly + 1, P.oroL); }
  return { arriba: [x, G.Y(b0 - 9)], hoja: [G.X(hx), G.Y(hb + 10)], bloques: B.map(([a, b, w, num]) => [num, G.X(a + w / 2), G.Y(b)]) };
}

// TRAGAPERRAS · la máquina de juguete con tres rodillos que se paran a una de ganar, y el cerebro que se enciende
function p_tragaperras(R, G, t, o, x, y, s) {
  const P = p_P, giro = p_cl(o.giro ?? ((t * 0.2) % 1));
  G.sombra(-4, 22, 2); G.sombra(26, 9, 1);
  // la caja: roja con el remate redondo, el canto cromado y las bombillas que corren
  const a0 = -18, a1 = 10;
  G.r(a0, -36, a1, -1, C.k); G.r(a0 + 1, -35, a1 - 1, -2, P.rojo); G.r(a0 + 1, -35, a0 + 2, -2, P.rojoL); G.r(a1 - 2, -35, a1 - 1, -2, P.rojoS);
  for (let a = a0 + 2; a <= a1 - 2; a++) { const b = -36 - Math.round(Math.sqrt(Math.max(0, 1 - ((a - (a0 + a1) / 2) / ((a1 - a0) / 2 - 1)) ** 2)) * 6); G.r(a, b, a, -36, P.rojo); G.P(a, b - 1, C.k); if ((a + Math.floor(t * 8)) % 3 === 0) G.P(a, b + 1, P.amarL); else G.P(a, b + 1, P.amarS); }
  G.r(a0, -2, a1, -1, P.plataS); G.r(a0 + 1, -24, a1 - 1, -24, P.plata);
  // la ventana de los tres rodillos
  const sym = (cual, a, b, rec) => {   // 0 cereza, 1 limón, 2 campana, 3 barra
    const px = (i, j, c) => { if (rec && (j < rec[0] || j > rec[1])) return; G.P(a + i, b + j, c); };
    if (cual === 0) { px(-1, 1, P.rojo); px(-2, 2, P.rojo); px(-1, 2, P.rojoL); px(1, 1, P.rojo); px(2, 2, P.rojo); px(1, 2, P.rojoL); px(0, -1, P.verdeS); px(-1, 0, P.verdeS); px(1, 0, P.verdeS); px(1, -2, P.verde); }
    else if (cual === 1) { for (let i = -2; i <= 2; i++) for (let j = -1; j <= 1; j++) if (Math.abs(i) + Math.abs(j) < 3) px(i, j, j < 0 ? P.amarL : P.amar); }
    else if (cual === 2) { px(0, -2, P.oroS); for (let i = -1; i <= 1; i++) px(i, -1, P.oro); for (let i = -2; i <= 2; i++) { px(i, 0, P.oro); px(i, 1, P.oroS); } px(0, 2, P.oroD); px(-1, -1, P.oroL); }
    else { for (let i = -2; i <= 2; i++) { px(i, -1, C.k); px(i, 1, C.k); px(i, 0, P.blanco); } }
  };
  const para = [0.4, 0.62, 0.9], fin = [[2, 0], [2, 0], [1, 0]];   // rodillos: cereza, cereza… y el tercero se pasa por uno
  for (let q = 0; q < 3; q++) {
    const ra = a0 + 5 + q * 8, rb0 = -21, rb1 = -11;
    G.r(ra - 4, rb0 - 1, ra + 4, rb1 + 1, C.k);
    for (let b = rb0; b <= rb1; b++) for (let a = ra - 3; a <= ra + 3; a++) G.P(a, b, Math.abs(b - (rb0 + rb1) / 2) > 3.5 ? P.plataS : P.blanco);
    const parado = giro >= para[q];
    if (!parado && giro > 0.04) { const off = (t * 30 + q * 7) % 6; for (let k = 0; k < 4; k++) { const b = rb0 + ((k * 6 + off) % 12) - 1; for (let a = ra - 2; a <= ra + 2; a++) if (b >= rb0 && b <= rb1) G.P(a, b, [P.rojo, P.amar, P.oro, C.k][k]); if (b + 1 >= rb0 && b + 1 <= rb1) G.P(ra, b + 1, P.plataS); } }
    else { const mid = (rb0 + rb1) / 2; if (q < 2) { sym(0, ra, Math.round(mid), null); sym(1, ra, rb0 + 1, [-1, 2]); sym(3, ra, rb1, [-2, 0]); }
      else { sym(0, ra, rb0, [0, 2]); sym(2, ra, Math.round(mid) + 2, null); }   // el tercero: la cereza se ha pasado por arriba
    }
    for (let a = ra - 3; a <= ra + 3; a++) { if (!(parado && q === 2)) G.P(a, rb0, P.plataS); G.P(a, rb1, P.plataS); }
  }
  // la línea de premio y el cajón de las monedas
  G.r(a0 + 1, -16, a0 + 1, -16, P.rojoL); G.r(a1 - 1, -16, a1 - 1, -16, P.rojoL);
  G.r(a0 + 5, -8, a1 - 5, -4, C.k); G.r(a0 + 6, -7, a1 - 6, -5, P.hieD); G.r(a0 + 7, -6, a0 + 9, -5, P.oro); G.P(a0 + 8, -6, P.oroL);
  G.r(a0 + 3, -30, a1 - 3, -27, C.k); G.r(a0 + 4, -29, a1 - 4, -28, P.amar); for (let a = a0 + 5; a < a1 - 4; a += 3) G.P(a, -29, P.rojo);
  // la palanca de la derecha: baja al tirar
  const tira = giro > 0 && giro < 0.15 ? Math.sin(giro / 0.15 * Math.PI) : 0, pb = -28 + Math.round(tira * 14);
  G.r(a1 + 1, -18, a1 + 3, -14, C.k); G.r(a1 + 1, -17, a1 + 2, -15, P.plata);
  G.l(a1 + 3, -16, a1 + 4, pb, C.k); G.l(a1 + 2, -16, a1 + 3, pb, P.plataL); G.d(a1 + 4, pb - 1, 2, C.k); G.d(a1 + 4, pb - 1, 1.4, P.rojo); G.P(a1 + 3, pb - 2, P.rojoL);
  // el cerebro de dibujo, que se enciende como con un premio cuando casi se gana
  const casi = giro >= 0.9, luz = casi ? 0.6 + 0.4 * Math.sin(t * 9) : 0, cx = 27, cy = -24 + Math.round(Math.sin(t * 1.8));
  if (casi) { R.halo(G.X(cx), G.Y(cy), 18 * s, [P.oroS, P.oro, P.oroL], 0.6 + luz * 0.6); for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2 + t * 0.5, r0 = 10, r1 = 12 + luz * 3; G.l(cx + Math.cos(an) * r0, cy + Math.sin(an) * r0 * 0.85, cx + Math.cos(an) * r1, cy + Math.sin(an) * r1 * 0.85, P.oroL); } }
  for (let j = -7; j <= 6; j++) for (let i = -9; i <= 9; i++) { const e = (i / 9) ** 2 + (j / 7) ** 2; if (e > 1) continue; const borde = e > 0.8;
    const surco = Math.sin(i * 1.3 + Math.cos(j * 0.9) * 2) > 0.75 || Math.sin(j * 1.6 + i * 0.4) > 0.86 || i === 0;
    G.P(cx + i, cy + j, borde ? P.rosaS : surco ? P.rosaS : casi ? (h(i, j, 530) < luz ? P.rosaL : P.rosa) : (i < -2 && j < -2 ? P.rosaL : P.rosa)); }
  for (let j = -8; j <= 7; j++) for (let i = -10; i <= 10; i++) { const e = (i / 9.6) ** 2 + (j / 7.6) ** 2, e2 = (i / 9) ** 2 + (j / 7) ** 2; if (e <= 1 && e2 > 1) G.P(cx + i, cy + j, C.k); }
  G.r(cx - 2, cy + 7, cx + 2, cy + 9, P.rosaS); G.r(cx - 2, cy + 9, cx + 2, cy + 9, C.k);
  p_numero(R, o, casi, '2009', G.X(cx), G.Y(cy - 13));
  return { arriba: [G.X(-4), G.Y(-44)], cerebro: [G.X(cx), G.Y(cy)], palanca: [G.X(a1 + 4), G.Y(pb)] };
}

// BOMBO · el bombo de lotería que suelta letras revueltas (fichas con garabatos, sin letras), y la mano que elige números
// mirando el pergamino; encima, «1 / 100 000 000 000 000» en pequeño
function p_bombo(R, G, t, o, x, y, s) {
  const P = p_P, cx = -12, cy = -22, rr = 14, gira = t * (o.vel ?? 1.4);
  G.sombra(-8, 22, 2); G.sombra(24, 10, 1);
  // el soporte de madera en tijera y la base
  G.r(-30, -3, 6, 0, C.k); G.r(-29, -2, 5, -1, P.mad); G.r(-29, -2, 5, -2, P.madL);
  for (const sg of [-1, 1]) { G.l(cx + sg * 12, -3, cx, cy, C.k); G.l(cx + sg * 11, -3, cx, cy + 1, P.madS); G.l(cx + sg * 12, -4, cx + sg * 1, cy, P.mad); }
  // el aire de dentro de la jaula, un poco más oscuro (para que la jaula se lea sobre cualquier fondo)
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) if (i * i + j * j < rr * rr) for (let q = 0; q < s * s; q++) { const px = G.X(cx + i) + (q % s), py = G.Y(cy + j) + Math.floor(q / s); if (((px + py) & 1) === 0) p_tine(R, px, py, P.azulD, 0.45); }
  // dentro de la jaula: las fichas que dan vueltas
  for (let k = 0; k < 11; k++) { const an = gira * 1.6 + k * 0.9 + Math.sin(gira + k) * 0.4, r = 4 + (k % 4) * 2.2, a = Math.round(cx + Math.cos(an) * r), b = Math.round(cy + 3 + Math.sin(an) * r * 0.8);
    G.r(a - 1, b - 1, a + 1, b + 1, P.papelD); G.P(a, b, k % 3 ? P.tinta : P.tintaL); G.P(a - 1, b - 1, P.papelL); }
  // la jaula de alambre: el aro, los radios que giran y la malla
  for (let k = 0; k < 64; k++) { const an = k / 64 * Math.PI * 2; G.P(Math.round(cx + Math.cos(an) * rr), Math.round(cy + Math.sin(an) * rr), k < 32 ? P.latonS : P.laton); }
  for (let k = 0; k < 6; k++) { const an = gira + k * Math.PI / 3; for (let q = 3; q < rr; q += 2) G.P(Math.round(cx + Math.cos(an) * q), Math.round(cy + Math.sin(an) * q), P.plataS); }
  for (let k = 0; k < 64; k++) { const an = k / 64 * Math.PI * 2; G.P(Math.round(cx + Math.cos(an) * (rr - 5)), Math.round(cy + Math.sin(an) * (rr - 5)), (k + Math.floor(gira * 6)) % 4 === 0 ? P.plataL : P.plataS); }
  G.d(cx, cy, 2, C.k); G.d(cx, cy, 1, P.laton);
  // la manivela que gira
  const ma = gira * 2, mx = cx + Math.round(Math.cos(ma) * 5), my = cy + Math.round(Math.sin(ma) * 5);
  G.l(cx, cy, mx, my, C.k); G.d(mx, my, 1.5, C.k); G.P(mx, my, P.rojo);
  // la boca de salida y las fichas que caen y se quedan desordenadas en el suelo
  G.r(cx + 10, cy + 9, cx + 15, cy + 12, C.k); G.r(cx + 11, cy + 10, cx + 14, cy + 11, P.latonS);
  for (let k = 0; k < 4; k++) { const f = (t * 0.6 + k / 4) % 1, a = cx + 14 + f * 6, b = cy + 12 + f * f * 16; if (b < -1) { G.r(a - 1, b - 1, a + 1, b + 1, P.papelD); G.P(a, b, P.tinta); } }
  for (const [a, sg] of [[5, 1], [8, -1], [11, 1], [3, -1]]) { G.r(a - 1, -3, a + 1, -1, C.k); G.r(a - 1, -3, a + 1, -1, P.papelD); G.P(a, -2, P.tinta); G.P(a + sg, -3, P.papelL); }
  // a la derecha: el pergamino pequeño y la mano canónica que señala un número
  const pa = 24, pb = -26;
  G.r(pa - 8, pb - 1, pa + 8, pb + 18, C.k); G.r(pa - 7, pb, pa + 7, pb + 17, P.perg); G.r(pa - 9, pb - 2, pa + 9, pb, P.pergS); G.r(pa - 9, pb + 17, pa + 9, pb + 19, P.pergS);
  for (let f = 0; f < 5; f++) for (let a = pa - 6; a <= pa + 6; a++) if (h(Math.floor(a / 3), f, 540) > 0.2) G.P(a, pb + 3 + f * 3, P.bloque);
  const elige = Math.floor(t * 0.7) % 5, mb = pb + 3 + elige * 3, ox = G.X(pa + 9), oy = G.Y(mb) + Math.round(Math.sin(t * 3) * 1);
  for (let a = pa - 6; a <= pa + 6; a++) if (h(Math.floor(a / 3), elige, 540) > 0.2) G.P(a, mb, P.oro);
  mano(R, ox + 2, oy + 1, -1, '#3a4a6a', { sinManga: true });
  // la cuenta en pequeño
  const txt = '1 / 100 000 000 000 000', w = p_anchoCifras(txt, 1);
  if (o.numero !== false) { const bx = Math.round(x - w / 2), by = G.Y(-46); R.rect(bx - 3, by - 3, bx + w + 2, by + 7, C.k); R.rect(bx - 2, by - 2, bx + w + 1, by + 6, P.papelL); p_cifras(R, txt, bx, by, 1, P.tinta); }
  return { arriba: [x, G.Y(-48)], mano: [ox, oy], pergamino: [G.X(pa), G.Y(pb + 8)], boca: [G.X(cx + 15), G.Y(cy + 11)] };
}

// TORRE · la torre de bloques con números que crece, parece firme y de pronto se tambalea; «1983»
function p_torre(R, G, t, o, x, y, s) {
  const P = p_P, alto = p_cl(o.alto ?? 1), tiembla = p_cl(o.tiembla ?? 0);
  const B = [[26, 7, '1014', P.mad], [20, 6, '6', P.azul], [17, 6, '4', P.rojo], [14, 6, '1014', P.verde], [11, 5, '6', P.amar], [9, 5, '4', P.azul], [6, 4, '', P.rojo]];
  const nb = alto * B.length;
  G.sombra(0, 18, 2);
  let b = 0;
  for (let i = 0; i < B.length; i++) {
    if (i >= Math.ceil(nb)) break;
    const [w, hh, num, c] = B[i], cae = i === Math.ceil(nb) - 1 ? 1 - p_cl(nb - i) : 0;
    const lean = tiembla * Math.sin(t * 7 + i * 0.3) * i * 0.6 + tiembla * i * i * 0.08, a = Math.round(-w / 2 + lean), bb = b - hh - Math.round(cae * 18);
    const cL = p_mez(c, P.blanco, 0.35), cS = p_mez(c, C.k, 0.35);
    G.r(a, bb, a + w, bb + hh, C.k); G.r(a + 1, bb + 1, a + w - 1, bb + hh - 1, c); G.r(a + 1, bb + 1, a + w - 1, bb + 1, cL); G.r(a + 1, bb + 1, a + 1, bb + hh - 1, cL); G.r(a + w - 1, bb + 2, a + w - 1, bb + hh - 1, cS); G.r(a + 2, bb + hh - 1, a + w - 1, bb + hh - 1, cS);
    // la veta de la madera pintada y el número
    for (let q = 0; q < w; q += 3) if (h(q, i, 550) > 0.6) G.P(a + 2 + q, bb + 2 + (q % 2), p_mez(c, C.k, 0.15));
    if (num) { const tw = p_anchoCifras(num, s >= 2 ? 1 : 1) + 4; const px = G.X(a + w / 2) - Math.round(tw / 2) + 2, py = G.Y(bb + hh / 2) - 2;
      R.rect(px - 2, py - 2, px + tw - 3, py + 6, P.papelL); p_cifras(R, num, px, py, 1, C.k); }
    else { G.d(a + w / 2, bb - 2, 1, C.k); G.P(Math.round(a + w / 2), bb - 2, P.oroL); }   // la bolita del remate
    // los destellos de «firme» con la torre entera y quieta
    if (alto >= 1 && tiembla === 0 && i % 2 === 0) p_destello(G, a + w - 1, bb + 1, t, i, P.oroL, P.blanco);
    b = bb;
    if (cae > 0) break;
  }
  // con el temblor: rayitas de vibración a los lados
  if (tiembla > 0.1) for (let k = 0; k < 3; k++) { const by2 = -10 - k * 12, f = Math.sin(t * 14 + k) > 0; if (f) { G.l(-16 - k, by2, -18 - k, by2 - 2, P.rojoL); G.l(16 + k, by2, 18 + k, by2 - 2, P.rojoL); } }
  p_numero(R, o, tiembla > 0.05, '1983', x + 34 * s, y - 40 * s);
  return { arriba: [x, G.Y(b - 2)] };
}

// TEATRILLO · el teatrillo de títeres de madera con su telón rojo: la caja, el posadero y el amigo sin cara
function p_teatrillo(R, G, t, o, x, y, s) {
  const P = p_P, telon = p_cl(o.telon ?? 1);
  G.sombra(0, 32, 2);
  const a0 = -28, a1 = 28, top = -54;
  // la caseta: el armazón de madera, la base pintada de rombos y el frontón con su estrella
  G.r(a0, top + 6, a1, 0, C.k); G.r(a0 + 1, top + 7, a1 - 1, -1, P.mad); G.r(a0 + 1, top + 7, a0 + 2, -1, P.madL); G.r(a1 - 2, top + 7, a1 - 1, -1, P.madS);
  for (let b = -15; b <= -2; b++) for (let a = a0 + 3; a <= a1 - 3; a++) { const d = (Math.abs(((a + 30) % 8) - 4) + Math.abs(((b + 30) % 8) - 4)); G.P(a, b, d < 3 ? P.azul : d === 3 ? P.azulS : P.amar); }
  G.r(a0 + 1, -16, a1 - 1, -16, P.madD); G.r(a0 + 1, -17, a1 - 1, -17, P.madL);
  for (let a = a0 - 2; a <= a1 + 2; a++) { const b = top + 6 - Math.round(Math.max(0, 6 - Math.abs(a) * 0.3)); G.r(a, b, a, top + 7, a < 0 ? P.madL : P.mad); G.P(a, b - 1, C.k); }
  G.r(a0 - 2, top + 7, a1 + 2, top + 8, C.k); G.d(0, top + 3, 2, P.oro); G.P(0, top + 1, P.oroL); G.P(-2, top + 3, P.oroL); G.P(2, top + 3, P.oroS);
  // la boca del escenario: el decorado pintado de noche con la luna y estrellas, y el suelo del tablado
  const s0 = a0 + 6, s1 = a1 - 6, sb0 = top + 12, sb1 = -18;
  for (let b = sb0; b <= sb1; b++) for (let a = s0; a <= s1; a++) G.P(a, b, b > sb1 - 6 ? P.verdeS : (b - sb0) > (sb1 - sb0) * 0.5 ? P.cieloL : P.cielo);
  for (let a = s0; a <= s1; a++) { const b = sb1 - 6 - Math.round(2 + Math.sin(a * 0.4) * 2); G.r(a, b, a, sb1 - 6, P.verdeT); }
  G.d(s1 - 6, sb0 + 5, 2, P.papelL); for (let k = 0; k < 6; k++) if (Math.sin(t * 3 + k * 2) > -0.2) G.P(s0 + 3 + k * 6, sb0 + 2 + (k * 5) % 7, P.blanco);
  // los tres títeres (de guante, asoman de cintura arriba sobre el borde) que se mecen por turnos
  const tit = (a, k) => { const sal = Math.round(Math.max(0, Math.sin(t * 2.4 + k * 2.1)) * 2), bb = sb1 - sal;
    if (k === 0) { G.r(a - 5, bb - 9, a + 5, bb, C.k); G.r(a - 4, bb - 8, a + 4, bb - 1, P.hie); G.r(a - 4, bb - 8, a + 4, bb - 7, P.hieL); G.r(a - 1, bb - 5, a + 1, bb - 3, P.laton); G.P(a - 2, bb - 6, P.blanco); G.P(a + 2, bb - 6, P.blanco); }
    else { const ropa = k === 1 ? P.rojoS : P.verdeS; G.r(a - 4, bb - 6, a + 4, bb, C.k); G.r(a - 3, bb - 5, a + 3, bb, ropa); G.d(a, bb - 9, 3, C.k); G.d(a, bb - 9, 2.4, k === 2 ? P.papelS : P.piel);
      if (k === 1) { G.r(a - 3, bb - 4, a + 3, bb, P.blanco); G.P(a - 1, bb - 9, C.k); G.P(a + 1, bb - 9, C.k); G.r(a - 1, bb - 7, a + 1, bb - 7, P.madD); G.r(a - 3, bb - 12, a + 3, bb - 12, P.madD); }
      else { G.r(a - 4, bb - 12, a + 4, bb - 12, C.k); G.r(a - 3, bb - 15, a + 3, bb - 12, C.k); G.r(a - 2, bb - 14, a + 2, bb - 13, P.hieS); } } };
  tit(-11, 0); tit(0, 1); tit(11, 2);
  // el borde del tablado tapa la mano del titiritero
  G.r(s0 - 1, sb1 + 1, s1 + 1, sb1 + 2, C.k); G.r(s0, sb1 + 1, s1, sb1 + 1, P.madL);
  // el telón rojo: dos paños con pliegues que se abren hacia los lados, el bambalinón de arriba y los flecos de oro
  const ab = telon * telon * (3 - 2 * telon), mitad = (s1 - s0 + 2) / 2, ancho = Math.max(3, Math.round(mitad * (1 - ab * 0.82)));
  for (const lado of [-1, 1]) for (let q = 0; q < ancho; q++) { const a = lado < 0 ? s0 - 1 + q : s1 + 1 - q, pl = Math.sin((q + (lado < 0 ? 0 : 2)) * 1.3 + t * 1.2 * (1 - ab) * 0.3);
    for (let b = sb0; b <= sb1 + 1; b++) { const recogido = ab > 0.3 && b > sb1 - 8 && q > ancho - 3; G.P(a, b, recogido ? P.oro : pl > 0.5 ? P.rojoL : pl < -0.5 ? P.rojoS : P.rojo); }
    G.P(a, sb1 + 2, q % 2 ? P.oro : P.oroS); }
  G.r(s0 - 2, sb0 - 2, s1 + 2, sb0 + 2, C.k); for (let a = s0 - 1; a <= s1 + 1; a++) { const b = sb0 + 2 + (a % 4 === 0 ? 1 : 0); G.r(a, sb0 - 1, a, b, a % 4 < 2 ? P.rojo : P.rojoS); G.P(a, b + 1, P.oro); }
  // las candilejas: velitas a lo largo del borde, con su llama que tiembla
  for (let k = 0; k < 5; k++) { const a = -16 + k * 8, f = Math.sin(t * 11 + k * 3) > 0.3 ? 1 : 0; G.P(a, -16, P.papelL); G.P(a, -17 - f, P.oroL); G.P(a, -18 - f, P.oro); R.halo(G.X(a), G.Y(-18), 5 * s, [P.oroS, P.oro], 0.35); }
  return { arriba: [x, G.Y(top)], escenario: [G.X(s0), G.Y(sb0), G.X(s1), G.Y(sb1)] };
}
